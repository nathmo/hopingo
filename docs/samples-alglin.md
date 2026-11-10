# Exemples de questions — Algèbre linéaire

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Matrice augmentée et opérations élémentaires (`l-sys-augmented`, BA1)

_Un système en matrice ; échanger, multiplier, ajouter._

### Niveau 1

```
Le système x_1 + 4x_2 + 2x_3 = 9 ; −4x_1 − 2x_3 = −10 ; x_1 + 4x_2 = 11 s'écrit avec une matrice augmentée. Complète-la, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[1,4,2|9],[-4,0,-2|-10],[1,4,0|11]]   (cases à remplir : (3,2) (3,3))   ← Recopie les coefficients : une ligne par équation
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,4,2|9],[-4,0,-2|-10],[1,4,0|11]]
    = L2 ← L2 + 4L1 : [[1,4,2|9],[0,16,6|26],[1,4,0|11]]   (cases à remplir : (2,2) (2,4))   ← Annuler sous le pivot : L₂ ← L₂ + 4L₁
    = L3 ← L3 - L1 : [[1,4,2|9],[0,16,6|26],[0,0,-2|2]]   (cases à remplir : (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ + 4L₁. | L₂ ← L₂ + 4L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 + 4L1 : [[1,4,2|9],[0,16,6|26],[1,4,0|11]]

Le système −x_1 − 4x_2 + 4x_3 = 11 ; 3x_2 − 2x_3 = −8 ; −x_1 − 5x_2 − 5x_3 = 4 s'écrit avec une matrice augmentée. Complète-la, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[-1,-4,4|11],[0,3,-2|-8],[-1,-5,-5|4]]   (cases à remplir : (2,2) (3,1))   ← Recopie les coefficients : une ligne par équation
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-4,4|11],[0,3,-2|-8],[-1,-5,-5|4]]
    = L3 ← L3 - L1 : [[-1,-4,4|11],[0,3,-2|-8],[0,-1,-9|-7]]   (cases à remplir : (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₃ ← L₃ − L₁. | L₃ ← L₃ − L₁ : la ligne 3 devient [0, □, □ | □]. | L3 ← L3 - L1 : [[-1,-4,4|11],[0,3,-2|-8],[0,-1,-9|-7]]

Le système −x − 2y + 2z = −4 ; −4x + 4z = −4 ; −4x + 5y + z = 4 s'écrit avec une matrice augmentée. Complète-la, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[-1,-2,2|-4],[-4,0,4|-4],[-4,5,1|4]]   (cases à remplir : (2,1) (3,3))   ← Recopie les coefficients : une ligne par équation
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-2,2|-4],[-4,0,4|-4],[-4,5,1|4]]
    = L2 ← L2 - 4L1 : [[-1,-2,2|-4],[0,8,-4|12],[-4,5,1|4]]   (cases à remplir : (2,1) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
    = L3 ← L3 - 4L1 : [[-1,-2,2|-4],[0,8,-4|12],[0,13,-7|20]]   (cases à remplir : (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − 4L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 4L₁. | L₂ ← L₂ − 4L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 4L1 : [[-1,-2,2|-4],[0,8,-4|12],[-4,5,1|4]]

```

### Niveau 2

```
Écris la matrice augmentée du système x_1 − 4x_2 = 5 ; 4x_1 + 5x_3 = −6 ; −4x_1 + 2x_2 + 2x_3 = −10, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[1,-4,0|5],[4,0,5|-6],[-4,2,2|-10]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,-4,0|5],[4,0,5|-6],[-4,2,2|-10]]
    ? Quelle opération annule la case (2, 1) ? ✔ L₂ ← L₂ − 4L₁ / · L₂ ← L₂ + L₃ / · L₂ ← L₂ + 4L₁
    = L2 ← L2 - 4L1 : [[1,-4,0|5],[0,16,5|-26],[-4,2,2|-10]]   (cases à remplir : (2,1) (2,3) (2,4))   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
    = L3 ← L3 + 4L1 : [[1,-4,0|5],[0,16,5|-26],[0,-14,2|10]]   (cases à remplir : (3,2) (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ + 4L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 4L₁. | L₂ ← L₂ − 4L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 4L1 : [[1,-4,0|5],[0,16,5|-26],[-4,2,2|-10]]
  pièges : l_rowop_sign

Écris la matrice augmentée du système −x_1 + 4x_2 + 4x_3 = −19 ; −3x_1 = 3 ; −3x_1 − 5x_2 + 2x_3 = 14, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[-1,4,4|-19],[-3,0,0|3],[-3,-5,2|14]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,4,4|-19],[-3,0,0|3],[-3,-5,2|14]]
    ? Quelle opération annule la case (2, 1) ? ✔ L₂ ← L₂ − 3L₁ / · L₂ ← L₂ + 3L₁ / · L₂ ← L₂ + L₃
    = L2 ← L2 - 3L1 : [[-1,4,4|-19],[0,-12,-12|60],[-3,-5,2|14]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − 3L₁
    = L3 ← L3 - 3L1 : [[-1,4,4|-19],[0,-12,-12|60],[0,-17,-10|71]]   (cases à remplir : (3,1) (3,2) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − 3L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 3L₁. | L₂ ← L₂ − 3L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 3L1 : [[-1,4,4|-19],[0,-12,-12|60],[-3,-5,2|14]]
  pièges : l_rowop_sign

Écris la matrice augmentée du système x_1 − x_2 − 2x_3 = 2 ; 4x_1 = −4 ; x_1 + x_2 + x_3 = −2, puis annule la première colonne sous le pivot.
  [guided]  Matrice
    = [[1,-1,-2|2],[4,0,0|-4],[1,1,1|-2]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,-1,-2|2],[4,0,0|-4],[1,1,1|-2]]
    ? Quelle opération annule la case (2, 1) ? · L₂ ← L₂ + L₃ / · L₂ ← L₂ + 4L₁ / ✔ L₂ ← L₂ − 4L₁
    = L2 ← L2 - 4L1 : [[1,-1,-2|2],[0,4,8|-12],[1,1,1|-2]]   (cases à remplir : (2,1) (2,3) (2,4))   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
    = L3 ← L3 - L1 : [[1,-1,-2|2],[0,4,8|-12],[0,2,3|-4]]   (cases à remplir : (3,2) (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 4L₁. | L₂ ← L₂ − 4L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 4L1 : [[1,-1,-2|2],[0,4,8|-12],[1,1,1|-2]]
  pièges : l_rowop_sign

```

### Niveau 3

```
Écris la matrice augmentée du système −x − 5y − 4z = −3 ; 2y + 3z = −1 ; 5x + 3y + z = 12, puis annule la première colonne sous le pivot : choisis d'abord l'opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[-1,-5,-4|-3],[0,2,3|-1],[5,3,1|12]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-5,-4|-3],[0,2,3|-1],[5,3,1|12]]
    = L3 ← L3 + 5L1 : [[-1,-5,-4|-3],[0,2,3|-1],[0,-22,-19|-3]]   ← Annuler sous le pivot : L₃ ← L₃ + 5L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₃ ← L₃ + 5L₁. | L₃ ← L₃ + 5L₁ : la ligne 3 devient [0, □, □ | □]. | L3 ← L3 + 5L1 : [[-1,-5,-4|-3],[0,2,3|-1],[0,-22,-19|-3]]

Écris la matrice augmentée du système −x_1 − 2x_2 − 4x_3 = 0 ; −5x_1 − 2x_2 = 0 ; x_1 + 2x_2 + 3x_3 = 0, puis annule la première colonne sous le pivot : choisis d'abord l'opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[-1,-2,-4|0],[-5,-2,0|0],[1,2,3|0]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-2,-4|0],[-5,-2,0|0],[1,2,3|0]]
    = L2 ← L2 - 5L1 : [[-1,-2,-4|0],[0,8,20|0],[1,2,3|0]]   ← Annuler sous le pivot : L₂ ← L₂ − 5L₁
    = L3 ← L3 + L1 : [[-1,-2,-4|0],[0,8,20|0],[0,0,-1|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 5L₁. | L₂ ← L₂ − 5L₁ : la ligne 2 devient [0, □, □ | 0]. | L2 ← L2 - 5L1 : [[-1,-2,-4|0],[0,8,20|0],[1,2,3|0]]

Écris la matrice augmentée du système −x_1 = 0 ; −2x_1 + x_2 + 3x_3 = −11 ; −x_1 + x_3 = −3, puis annule la première colonne sous le pivot : choisis d'abord l'opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[-1,0,0|0],[-2,1,3|-11],[-1,0,1|-3]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,0,0|0],[-2,1,3|-11],[-1,0,1|-3]]
    = L2 ← L2 - 2L1 : [[-1,0,0|0],[0,1,3|-11],[-1,0,1|-3]]   ← Annuler sous le pivot : L₂ ← L₂ − 2L₁
    = L3 ← L3 - L1 : [[-1,0,0|0],[0,1,3|-11],[0,0,1|-3]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 2L₁. | L₂ ← L₂ − 2L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 2L1 : [[-1,0,0|0],[0,1,3|-11],[-1,0,1|-3]]

```

### Niveau 4

```
Écris la matrice augmentée du système x_1 − x_2 − 2x_3 = −3 ; x_1 + x_2 + 2x_3 = −3 ; −2x_2 − 3x_3 = 1, puis annule la première colonne sous le pivot.
  [free, suivre l'erreur]  Matrice
    = [[1,-1,-2|-3],[1,1,2|-3],[0,-2,-3|1]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,-1,-2|-3],[1,1,2|-3],[0,-2,-3|1]]
    = L2 ← L2 - L1 : [[1,-1,-2|-3],[0,2,4|0],[0,-2,-3|1]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − L₁. | L₂ ← L₂ − L₁ : la ligne 2 devient [0, □, □ | 0]. | L2 ← L2 - L1 : [[1,-1,-2|-3],[0,2,4|0],[0,-2,-3|1]]

Écris la matrice augmentée du système −x_1 + 4x_2 − 2x_3 = −2 ; −4x_1 + x_2 − 3x_3 = −3 ; −2x_2 − 3x_3 = −3, puis annule la première colonne sous le pivot.
  [free, suivre l'erreur]  Matrice
    = [[-1,4,-2|-2],[-4,1,-3|-3],[0,-2,-3|-3]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,4,-2|-2],[-4,1,-3|-3],[0,-2,-3|-3]]
    = L2 ← L2 - 4L1 : [[-1,4,-2|-2],[0,-15,5|5],[0,-2,-3|-3]]   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 4L₁. | L₂ ← L₂ − 4L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 4L1 : [[-1,4,-2|-2],[0,-15,5|5],[0,-2,-3|-3]]

Écris la matrice augmentée du système −x − 4y − 5z = 12 ; −5x − 2y − 3z = 12 ; −3x + 5y + z = 5, puis annule la première colonne sous le pivot.
  [free, suivre l'erreur]  Matrice
    = [[-1,-4,-5|12],[-5,-2,-3|12],[-3,5,1|5]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-4,-5|12],[-5,-2,-3|12],[-3,5,1|5]]
    = L2 ← L2 - 5L1 : [[-1,-4,-5|12],[0,18,22|-48],[-3,5,1|5]]   ← Annuler sous le pivot : L₂ ← L₂ − 5L₁
    = L3 ← L3 - 3L1 : [[-1,-4,-5|12],[0,18,22|-48],[0,17,16|-31]]   ← Annuler sous le pivot : L₃ ← L₃ − 3L₁
  aides : Choisis k pour que la case sous le pivot devienne 0 : k = a₂₁/a₁₁. Ici, L₂ ← L₂ − 5L₁. | L₂ ← L₂ − 5L₁ : la ligne 2 devient [0, □, □ | □]. | L2 ← L2 - 5L1 : [[-1,-4,-5|12],[0,18,22|-48],[-3,5,1|5]]

```

### Niveau 5

```
Résous le début du système −x − y − z = 4 ; y = −2 ; −x + 2y + 2z = −2 : sa matrice augmentée, puis la première colonne nettoyée sous le pivot.
  [free, sans aide]  Matrice
    = [[-1,-1,-1|4],[0,1,0|-2],[-1,2,2|-2]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[-1,-1,-1|4],[0,1,0|-2],[-1,2,2|-2]]
    = L3 ← L3 - L1 : [[-1,-1,-1|4],[0,1,0|-2],[0,3,3|-6]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁

Résous le début du système x_1 − 4x_2 + 2x_3 = 8 ; x_1 + x_2 − 3x_3 = −2 ; 5x_1 = −10 : sa matrice augmentée, puis la première colonne nettoyée sous le pivot.
  [free, sans aide]  Matrice
    = [[1,-4,2|8],[1,1,-3|-2],[5,0,0|-10]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,-4,2|8],[1,1,-3|-2],[5,0,0|-10]]
    = L2 ← L2 - L1 : [[1,-4,2|8],[0,5,-5|-10],[5,0,0|-10]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 - 5L1 : [[1,-4,2|8],[0,5,-5|-10],[0,20,-10|-50]]   ← Annuler sous le pivot : L₃ ← L₃ − 5L₁

Résous le début du système x + 4y = −5 ; −3x + 2y = −13 ; −3x + 4y − 5z = −17 : sa matrice augmentée, puis la première colonne nettoyée sous le pivot.
  [free, sans aide]  Matrice
    = [[1,4,0|-5],[-3,2,0|-13],[-3,4,-5|-17]]   ← Une ligne par équation, b après la barre
  — Annule la première colonne sous le pivot.  [juge rowops]  départ : [[1,4,0|-5],[-3,2,0|-13],[-3,4,-5|-17]]
    = L2 ← L2 + 3L1 : [[1,4,0|-5],[0,14,0|-28],[-3,4,-5|-17]]   ← Annuler sous le pivot : L₂ ← L₂ + 3L₁
    = L3 ← L3 + 3L1 : [[1,4,0|-5],[0,14,0|-28],[0,16,-5|-32]]   ← Annuler sous le pivot : L₃ ← L₃ + 3L₁

```

## Forme échelonnée, pivots (`l-sys-echelon`, BA1)

_Un pivot, des zéros dessous, colonne par colonne._

### Niveau 1

```
Échelonne la matrice [[-1,-1,0,1],[0,0,1,0],[3,3,-2,-2]], puis compte les pivots.
  [guided]  [[-1,-1,0,1],[0,0,1,0],[3,3,-2,-2]]
    = L3 ← L3 + 3L1 : [[-1,-1,0,1],[0,0,1,0],[0,0,-2,1]]   (cases à remplir : (3,2) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ + 3L₁
    = L3 ← L3 + 2L2 : [[-1,-1,0,1],[0,0,1,0],[0,0,0,1]]   (cases à remplir : (3,1) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ + 2L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 3, 4
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₃ ← L₃ + 3L₁ : la ligne 3 devient [0, 0, □, □]. | L3 ← L3 + 3L1 : [[-1,-1,0,1],[0,0,1,0],[0,0,-2,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne la matrice [[1,3,0,1],[0,0,1,1],[1,3,-1,0]], puis compte les pivots.
  [guided]  [[1,3,0,1],[0,0,1,1],[1,3,-1,0]]
    = L3 ← L3 - L1 : [[1,3,0,1],[0,0,1,1],[0,0,-1,-1]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 + L2 : [[1,3,0,1],[0,0,1,1],[0,0,0,0]]   (cases à remplir : (3,2) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 2   ← Pivots en colonnes 1, 3
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₃ ← L₃ − L₁ : la ligne 3 devient [0, 0, □, □]. | L3 ← L3 - L1 : [[1,3,0,1],[0,0,1,1],[0,0,-1,-1]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Échelonne la matrice [[1,0,0],[2,1,-1],[-1,0,1]], puis compte les pivots.
  [guided]  [[1,0,0],[2,1,-1],[-1,0,1]]
    = L2 ← L2 - 2L1 : [[1,0,0],[0,1,-1],[-1,0,1]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − 2L₁
    = L3 ← L3 + L1 : [[1,0,0],[0,1,-1],[0,0,1]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 2, 3
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ − 2L₁ : la ligne 2 devient [0, □, □]. | L2 ← L2 - 2L1 : [[1,0,0],[0,1,-1],[-1,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
Échelonne la matrice [[1,-1,0,-1],[1,-1,0,-1],[0,1,1,0]], puis compte les pivots.
  [guided]  [[1,-1,0,-1],[1,-1,0,-1],[0,1,1,0]]
    = L2 ← L2 - L1 : [[1,-1,0,-1],[0,0,0,0],[0,1,1,0]]   (cases à remplir : (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    ? Le pivot de la colonne suivante est nul. Que fais-tu ? ✔ Échanger : L₂ ↔ L₃ / · Diviser la ligne par ce pivot
    = L2 ↔ L3 : [[1,-1,0,-1],[0,1,1,0],[0,0,0,0]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 2   ← Pivots en colonnes 1, 2
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ − L₁ : la ligne 2 devient [0, 0, 0, 0]. | L2 ← L2 - L1 : [[1,-1,0,-1],[0,0,0,0],[0,1,1,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Échelonne la matrice [[-1,0,3],[-1,0,3],[0,1,1]], puis compte les pivots.
  [guided]  [[-1,0,3],[-1,0,3],[0,1,1]]
    = L2 ← L2 - L1 : [[-1,0,3],[0,0,0],[0,1,1]]   (cases à remplir : (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    ? Le pivot de la colonne suivante est nul. Que fais-tu ? ✔ Échanger : L₂ ↔ L₃ / · Diviser la ligne par ce pivot
    = L2 ↔ L3 : [[-1,0,3],[0,1,1],[0,0,0]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 2   ← Pivots en colonnes 1, 2
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ − L₁ : la ligne 2 devient [0, 0, 0]. | L2 ← L2 - L1 : [[-1,0,3],[0,0,0],[0,1,1]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Échelonne la matrice [[1,0,-2],[-1,0,3],[0,1,0]], puis compte les pivots.
  [guided]  [[1,0,-2],[-1,0,3],[0,1,0]]
    = L2 ← L2 + L1 : [[1,0,-2],[0,0,1],[0,1,0]]   (cases à remplir : (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    ? Le pivot de la colonne suivante est nul. Que fais-tu ? ✔ Échanger : L₂ ↔ L₃ / · Diviser la ligne par ce pivot
    = L2 ↔ L3 : [[1,0,-2],[0,1,0],[0,0,1]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 2, 3
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, 0, □]. | L2 ← L2 + L1 : [[1,0,-2],[0,0,1],[0,1,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 3

```
Échelonne la matrice [[1,2,-1,1],[0,0,0,1],[-2,-4,2,0]] : choisis chaque opération, puis écris la matrice, puis compte les pivots.
  [tap, suivre l'erreur, menu rowops]  [[1,2,-1,1],[0,0,0,1],[-2,-4,2,0]]
    = L3 ← L3 + 2L1 : [[1,2,-1,1],[0,0,0,1],[0,0,0,2]]   ← Annuler sous le pivot : L₃ ← L₃ + 2L₁
    = L3 ← L3 - 2L2 : [[1,2,-1,1],[0,0,0,1],[0,0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 2   ← Pivots en colonnes 1, 4
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₃ ← L₃ + 2L₁ : la ligne 3 devient [0, 0, 0, □]. | L3 ← L3 + 2L1 : [[1,2,-1,1],[0,0,0,1],[0,0,0,2]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne la matrice [[1,0,2,0],[-2,1,-4,0],[0,-1,0,1]] : choisis chaque opération, puis écris la matrice, puis compte les pivots.
  [tap, suivre l'erreur, menu rowops]  [[1,0,2,0],[-2,1,-4,0],[0,-1,0,1]]
    = L2 ← L2 + 2L1 : [[1,0,2,0],[0,1,0,0],[0,-1,0,1]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 + L2 : [[1,0,2,0],[0,1,0,0],[0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 2, 4
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □, 0, 0]. | L2 ← L2 + 2L1 : [[1,0,2,0],[0,1,0,0],[0,-1,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne la matrice [[1,0,0],[-1,1,0],[1,-3,1]] : choisis chaque opération, puis écris la matrice, puis compte les pivots.
  [tap, suivre l'erreur, menu rowops]  [[1,0,0],[-1,1,0],[1,-3,1]]
    = L2 ← L2 + L1 : [[1,0,0],[0,1,0],[1,-3,1]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 - L1 : [[1,0,0],[0,1,0],[0,-3,1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 + 3L2 : [[1,0,0],[0,1,0],[0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + 3L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 2, 3
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, □, 0]. | L2 ← L2 + L1 : [[1,0,0],[0,1,0],[1,-3,1]]
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
Échelonne la matrice [[1,0,0,0],[-2,1,0,0],[-1,0,1,0],[3,0,0,1]] (plusieurs opérations par ligne permises), puis compte les pivots.
  [free, suivre l'erreur]  [[1,0,0,0],[-2,1,0,0],[-1,0,1,0],[3,0,0,1]]
    = L2 ← L2 + 2L1 : [[1,0,0,0],[0,1,0,0],[-1,0,1,0],[3,0,0,1]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 + L1 : [[1,0,0,0],[0,1,0,0],[0,0,1,0],[3,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L4 ← L4 - 3L1 : [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   ← Annuler sous le pivot : L₄ ← L₄ − 3L₁
  — Combien de pivots ?  [juge value]  départ : r
    = 4   ← Pivots en colonnes 1, 2, 3, 4
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □, 0, 0]. | L2 ← L2 + 2L1 : [[1,0,0,0],[0,1,0,0],[-1,0,1,0],[3,0,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne la matrice [[1,-3,2,3,0],[0,0,1,1,0],[1,-3,3,4,1]] (plusieurs opérations par ligne permises), puis compte les pivots.
  [free, suivre l'erreur]  [[1,-3,2,3,0],[0,0,1,1,0],[1,-3,3,4,1]]
    = L3 ← L3 - L1 : [[1,-3,2,3,0],[0,0,1,1,0],[0,0,1,1,1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,-3,2,3,0],[0,0,1,1,0],[0,0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 3, 5
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₃ ← L₃ − L₁ : la ligne 3 devient [0, 0, 1, □, □]. | L3 ← L3 - L1 : [[1,-3,2,3,0],[0,0,1,1,0],[0,0,1,1,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne la matrice [[1,-3,0,0],[-1,3,1,0],[3,-9,-2,1]] (plusieurs opérations par ligne permises), puis compte les pivots.
  [free, suivre l'erreur]  [[1,-3,0,0],[-1,3,1,0],[3,-9,-2,1]]
    = L2 ← L2 + L1 : [[1,-3,0,0],[0,0,1,0],[3,-9,-2,1]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 - 3L1 : [[1,-3,0,0],[0,0,1,0],[0,0,-2,1]]   ← Annuler sous le pivot : L₃ ← L₃ − 3L₁
    = L3 ← L3 + 2L2 : [[1,-3,0,0],[0,0,1,0],[0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + 2L₂
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 3, 4
  aides : Traite une colonne à la fois ; ne touche plus aux lignes au-dessus du pivot courant. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, 0, □, 0]. | L2 ← L2 + L1 : [[1,-3,0,0],[0,0,1,0],[3,-9,-2,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
Échelonne [[-1,1,-1,0,-1],[2,-2,2,0,1],[0,0,0,1,-2]], puis donne le nombre de pivots et les colonnes pivots.
  [free, sans aide]  [[-1,1,-1,0,-1],[2,-2,2,0,1],[0,0,0,1,-2]]
    = L2 ← L2 + 2L1 : [[-1,1,-1,0,-1],[0,0,0,0,-1],[0,0,0,1,-2]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L2 ↔ L3 : [[-1,1,-1,0,-1],[0,0,0,1,-2],[0,0,0,0,-1]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 4, 5
  — Quelles colonnes ont un pivot ? Écris leurs numéros : (1 ; 2 ; 4).  [juge mat]  départ : colonnes
    = (1 ; 4 ; 5)
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne [[-1,-2,1,-1,0],[0,0,0,0,1],[-2,-4,1,-1,0]], puis donne le nombre de pivots et les colonnes pivots.
  [free, sans aide]  [[-1,-2,1,-1,0],[0,0,0,0,1],[-2,-4,1,-1,0]]
    = L3 ← L3 - 2L1 : [[-1,-2,1,-1,0],[0,0,0,0,1],[0,0,-1,1,0]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
    = L2 ↔ L3 : [[-1,-2,1,-1,0],[0,0,-1,1,0],[0,0,0,0,1]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 3   ← Pivots en colonnes 1, 3, 5
  — Quelles colonnes ont un pivot ? Écris leurs numéros : (1 ; 2 ; 4).  [juge mat]  départ : colonnes
    = (1 ; 3 ; 5)
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Échelonne [[1,-2,2,2,0],[1,-2,2,2,0],[-1,2,-2,-2,1]], puis donne le nombre de pivots et les colonnes pivots.
  [free, sans aide]  [[1,-2,2,2,0],[1,-2,2,2,0],[-1,2,-2,-2,1]]
    = L2 ← L2 - L1 : [[1,-2,2,2,0],[0,0,0,0,0],[-1,2,-2,-2,1]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,-2,2,2,0],[0,0,0,0,0],[0,0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L2 ↔ L3 : [[1,-2,2,2,0],[0,0,0,0,1],[0,0,0,0,0]]   ← Pivot nul : échanger avec une ligne plus bas
  — Combien de pivots ?  [juge value]  départ : r
    = 2   ← Pivots en colonnes 1, 5
  — Quelles colonnes ont un pivot ? Écris leurs numéros : (1 ; 2 ; 4).  [juge mat]  départ : colonnes
    = (1 ; 5)
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Variantes d'examen

```
Quel est le rang de la matrice [[1,-2,2,-2],[0,0,-1,2],[0,0,-2,4],[2,-4,0,4]] ?
  · 4   ✔ 2   · 1   · 3
  [examen mcq]

Vrai ou faux ?
  « La forme échelonnée d'une matrice est unique. » → FAUX
    contre-exemple (matOne) : A = [[1,2],[2,3]], E1 = [[1,2],[0,-1]], E2 = [[2,4],[0,-1]]
  [examen tf]

```

## Forme échelonnée réduite (`l-sys-rref`, BA1)

_Des pivots à 1, des zéros au-dessus et au-dessous._

### Niveau 1

```
Une forme échelonnée de A = [[0,1,3,1],[2,1,-1,0],[1,2,4,1]] est [[2,1,-1,0],[0,1,3,1],[0,0,0,-1/2]]. Remonte jusqu'à la forme réduite R, puis lis r₁₃.
  [guided]  [[2,1,-1,0],[0,1,3,1],[0,0,0,-1/2]]
    = L3 ← -2L3 : [[2,1,-1,0],[0,1,3,1],[0,0,0,1]]   (cases à remplir : (3,3) (3,4))   ← Pivot à 1
    = L2 ← L2 - L3 : [[2,1,-1,0],[0,1,3,0],[0,0,0,1]]   (cases à remplir : (2,1) (2,3))   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 - L2 : [[2,0,-4,0],[0,1,3,0],[0,0,0,1]]   (cases à remplir : (1,3) (1,4))   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← (1/2)L1 : [[1,0,-2,0],[0,1,3,0],[0,0,0,1]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = −2   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₃ ← −2L₃ : la ligne 3 devient [0, 0, 0, □]. | L3 ← -2L3 : [[2,1,-1,0],[0,1,3,1],[0,0,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Une forme échelonnée de A = [[0,-1,-3,-2],[-1,1,0,-2],[1,-1,0,2]] est [[-1,1,0,-2],[0,-1,-3,-2],[0,0,0,0]]. Remonte jusqu'à la forme réduite R, puis lis r₂₄.
  [guided]  [[-1,1,0,-2],[0,-1,-3,-2],[0,0,0,0]]
    = L2 ← -L2 : [[-1,1,0,-2],[0,1,3,2],[0,0,0,0]]   (cases à remplir : (2,2) (2,4))   ← Pivot à 1
    = L1 ← L1 - L2 : [[-1,0,-3,-4],[0,1,3,2],[0,0,0,0]]   (cases à remplir : (1,1) (1,4))   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0,3,4],[0,1,3,2],[0,0,0,0]]   (cases à remplir : (1,1) (1,4))   ← Pivot à 1
  — Que vaut r₂₄ ?  [juge value]  départ : r_24
    = 2   ← Ligne 2, colonne 4 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₂ ← −L₂ : la ligne 2 devient [0, 1, □, □]. | L2 ← -L2 : [[-1,1,0,-2],[0,1,3,2],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Une forme échelonnée de A = [[1,-2,-9,1],[0,1,3,0],[-1,0,3,-1]] est [[1,-2,-9,1],[0,1,3,0],[0,0,0,0]]. Remonte jusqu'à la forme réduite R, puis lis r₁₃.
  [guided]  [[1,-2,-9,1],[0,1,3,0],[0,0,0,0]]
    = L1 ← L1 + 2L2 : [[1,0,-3,1],[0,1,3,0],[0,0,0,0]]   (cases à remplir : (1,3) (1,4))   ← Remonter : L₁ ← L₁ + 2L₂
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = −3   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ + 2L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 + 2L2 : [[1,0,-3,1],[0,1,3,0],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
Une forme échelonnée de A = [[1,-1,0,-3],[0,1,4,2],[0,2,8,4]] est [[1,-1,0,-3],[0,1,4,2],[0,0,0,0]]. Remonte jusqu'à la forme réduite R, puis lis r₁₃.
  [guided]  [[1,-1,0,-3],[0,1,4,2],[0,0,0,0]]
    ? Dans quel ordre remonter ? ✔ Du dernier pivot vers le premier / ✔ Du premier pivot vers le dernier
    = L1 ← L1 + L2 : [[1,0,4,-1],[0,1,4,2],[0,0,0,0]]   (cases à remplir : (1,2) (1,3) (1,4))   ← Remonter : L₁ ← L₁ + L₂
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = 4   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ + L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 + L2 : [[1,0,4,-1],[0,1,4,2],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Une forme échelonnée de A = [[-1,1,4,-2],[0,1,2,-3],[1,-1,-4,2]] est [[-1,1,4,-2],[0,1,2,-3],[0,0,0,0]]. Remonte jusqu'à la forme réduite R, puis lis r₁₃.
  [guided]  [[-1,1,4,-2],[0,1,2,-3],[0,0,0,0]]
    ? Dans quel ordre remonter ? ✔ Du dernier pivot vers le premier / ✔ Du premier pivot vers le dernier
    = L1 ← L1 - L2 : [[-1,0,2,1],[0,1,2,-3],[0,0,0,0]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0,-2,-1],[0,1,2,-3],[0,0,0,0]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Pivot à 1
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = −2   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ − L₂ : la ligne 1 devient [−1, 0, □, □]. | L1 ← L1 - L2 : [[-1,0,2,1],[0,1,2,-3],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Une forme échelonnée de A = [[2,-1,-3,0],[-1,1,0,0],[2,-2,0,1]] est [[2,-1,-3,0],[0,1/2,-3/2,0],[0,0,0,1]]. Remonte jusqu'à la forme réduite R, puis lis r₂₃.
  [guided]  [[2,-1,-3,0],[0,1/2,-3/2,0],[0,0,0,1]]
    ? Dans quel ordre remonter ? ✔ Du dernier pivot vers le premier / ✔ Du premier pivot vers le dernier
    = L2 ← 2L2 : [[2,-1,-3,0],[0,1,-3,0],[0,0,0,1]]   (cases à remplir : (2,1) (2,2) (2,4))   ← Pivot à 1
    = L1 ← L1 + L2 : [[2,0,-6,0],[0,1,-3,0],[0,0,0,1]]   (cases à remplir : (1,1) (1,2) (1,4))   ← Remonter : L₁ ← L₁ + L₂
    = L1 ← (1/2)L1 : [[1,0,-3,0],[0,1,-3,0],[0,0,0,1]]   (cases à remplir : (1,1) (1,2) (1,4))   ← Pivot à 1
  — Que vaut r₂₃ ?  [juge value]  départ : r_23
    = −3   ← Ligne 2, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₂ ← 2L₂ : la ligne 2 devient [0, □, □, 0]. | L2 ← 2L2 : [[2,-1,-3,0],[0,1,-3,0],[0,0,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 3

```
Réduis A = [[1,1,5,0],[2,3,14,2],[-1,-1,-5,0]] jusqu'à sa forme échelonnée réduite R : choisis chaque opération, puis écris la matrice, puis lis r₁₄.
  [tap, suivre l'erreur, menu rowops]  [[1,1,5,0],[2,3,14,2],[-1,-1,-5,0]]
    = L2 ← L2 - 2L1 : [[1,1,5,0],[0,1,4,2],[-1,-1,-5,0]]   ← Descendre : L₂ ← L₂ − 2L₁
    = L3 ← L3 + L1 : [[1,1,5,0],[0,1,4,2],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + L₁
    = L1 ← L1 - L2 : [[1,0,1,-2],[0,1,4,2],[0,0,0,0]]   ← Remonter : L₁ ← L₁ − L₂
  — Que vaut r₁₄ ?  [juge value]  départ : r_14
    = −2   ← Ligne 1, colonne 4 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ − L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 - L2 : [[1,0,1,-2],[0,1,4,2],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Réduis A = [[1,2,-2,-9],[0,1,-3,-4],[0,2,-6,-8]] jusqu'à sa forme échelonnée réduite R : choisis chaque opération, puis écris la matrice, puis lis r₁₃.
  [tap, suivre l'erreur, menu rowops]  [[1,2,-2,-9],[0,1,-3,-4],[0,2,-6,-8]]
    = L3 ← L3 - 2L2 : [[1,2,-2,-9],[0,1,-3,-4],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − 2L₂
    = L1 ← L1 - 2L2 : [[1,0,4,-1],[0,1,-3,-4],[0,0,0,0]]   ← Remonter : L₁ ← L₁ − 2L₂
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = 4   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ − 2L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 - 2L2 : [[1,0,4,-1],[0,1,-3,-4],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Réduis A = [[2,4,1,0],[1,2,0,0],[0,0,2,1]] jusqu'à sa forme échelonnée réduite R : choisis chaque opération, puis écris la matrice, puis lis r₁₂.
  [tap, suivre l'erreur, menu rowops]  [[2,4,1,0],[1,2,0,0],[0,0,2,1]]
    = L2 ← L2 - (1/2)L1 : [[2,4,1,0],[0,0,-1/2,0],[0,0,2,1]]   ← Descendre : L₂ ← L₂ − (1/2)L₁
    = L3 ← L3 + 4L2 : [[2,4,1,0],[0,0,-1/2,0],[0,0,0,1]]   ← Descendre : L₃ ← L₃ + 4L₂
    = L2 ← -2L2 : [[2,4,1,0],[0,0,1,0],[0,0,0,1]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[2,4,0,0],[0,0,1,0],[0,0,0,1]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← (1/2)L1 : [[1,2,0,0],[0,0,1,0],[0,0,0,1]]   ← Pivot à 1
  — Que vaut r₁₂ ?  [juge value]  départ : r_12
    = 2   ← Ligne 1, colonne 2 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₂ ← −2L₂ : la ligne 2 devient [0, 0, □, 0]. | L2 ← -2L2 : [[2,4,1,0],[0,0,1,0],[0,0,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Réduis A = [[1,1,5,0],[0,1,4,4],[0,1,4,4]] jusqu'à sa forme échelonnée réduite R, puis lis r₁₄.
  [free, suivre l'erreur]  [[1,1,5,0],[0,1,4,4],[0,1,4,4]]
    = L3 ← L3 - L2 : [[1,1,5,0],[0,1,4,4],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − L₂
    = L1 ← L1 - L2 : [[1,0,1,-4],[0,1,4,4],[0,0,0,0]]   ← Remonter : L₁ ← L₁ − L₂
  — Que vaut r₁₄ ?  [juge value]  départ : r_14
    = −4   ← Ligne 1, colonne 4 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ − L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 - L2 : [[1,0,1,-4],[0,1,4,4],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Réduis A = [[-2,1,3,1],[1,0,-2,-1],[0,0,0,1]] jusqu'à sa forme échelonnée réduite R, puis lis r₁₃.
  [free, suivre l'erreur]  [[-2,1,3,1],[1,0,-2,-1],[0,0,0,1]]
    = L2 ← L2 + (1/2)L1 : [[-2,1,3,1],[0,1/2,-1/2,-1/2],[0,0,0,1]]   ← Descendre : L₂ ← L₂ + (1/2)L₁
    = L2 ← L2 + (1/2)L3 : [[-2,1,3,1],[0,1/2,-1/2,0],[0,0,0,1]]   ← Remonter : L₂ ← L₂ + (1/2)L₃
    = L1 ← L1 - L3 : [[-2,1,3,0],[0,1/2,-1/2,0],[0,0,0,1]]   ← Remonter : L₁ ← L₁ − L₃
    = L2 ← 2L2 : [[-2,1,3,0],[0,1,-1,0],[0,0,0,1]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[-2,0,4,0],[0,1,-1,0],[0,0,0,1]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -(1/2)L1 : [[1,0,-2,0],[0,1,-1,0],[0,0,0,1]]   ← Pivot à 1
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = −2   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₂ ← L₂ + (1/2)L₃ : la ligne 2 devient [0, □, □, 0]. | L2 ← L2 + (1/2)L3 : [[-2,1,3,1],[0,1/2,-1/2,0],[0,0,0,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Réduis A = [[1,-3,-8,-11],[0,1,2,4],[-1,0,2,-1]] jusqu'à sa forme échelonnée réduite R, puis lis r₁₃.
  [free, suivre l'erreur]  [[1,-3,-8,-11],[0,1,2,4],[-1,0,2,-1]]
    = L3 ← L3 + L1 : [[1,-3,-8,-11],[0,1,2,4],[0,-3,-6,-12]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 + 3L2 : [[1,-3,-8,-11],[0,1,2,4],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + 3L₂
    = L1 ← L1 + 3L2 : [[1,0,-2,1],[0,1,2,4],[0,0,0,0]]   ← Remonter : L₁ ← L₁ + 3L₂
  — Que vaut r₁₃ ?  [juge value]  départ : r_13
    = −2   ← Ligne 1, colonne 3 de R
  aides : Rends chaque pivot égal à 1, puis remonte en partant du dernier pivot. | L₁ ← L₁ + 3L₂ : la ligne 1 devient [1, 0, □, □]. | L1 ← L1 + 3L2 : [[1,0,-2,1],[0,1,2,4],[0,0,0,0]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
Soit A = [[1,-1,-5,3],[0,1,1,-4],[-2,2,10,-6]] et R sa forme échelonnée réduite. Que vaut r₁₃ ?
  [free, sans aide]  r_13
    = −4
  pièges : l_rref_not_reduced, l_coef_index_swap

Soit A = [[0,0,0,1],[-2,1,6,0],[1,0,-3,-2]] et R sa forme échelonnée réduite. Que vaut r₁₃ ?
  [free, sans aide]  r_13
    = −3
  pièges : l_rref_not_reduced, l_coef_index_swap

Soit A = [[-1,0,-2,-2],[0,1,0,0],[1,0,2,1]] et R sa forme échelonnée réduite. Que vaut r₁₃ ?
  [free, sans aide]  r_13
    = 2
  pièges : l_rref_not_reduced, l_coef_index_swap

```

### Variantes d'examen

```
Soit A = [[1,-2,5,-4],[0,1,-1,2],[1,0,3,0]] et R sa forme échelonnée réduite. Que vaut r₁₃ ?
  [free, sans aide, examen coef]  r_13
    = 3
  pièges : l_rref_not_reduced, l_coef_index_swap

Soit A = [[-1,1,3,-4],[1,1,-3,4],[0,1,0,0]] et R sa forme échelonnée réduite. Que vaut r₁₃ ?
  · 3 [l_rref_not_reduced]   · −2   · 0 [l_coef_index_swap]   ✔ −3
  [examen mcq]
  pièges : l_rref_not_reduced, l_coef_index_swap

Vrai ou faux ?
  « Deux matrices équivalentes par lignes ont la même forme échelonnée réduite. » → VRAI
  [examen tf]

```

## Variables libres, solution paramétrique (`l-sys-solution`, BA1)

_Une colonne sans pivot, une variable libre._

### Niveau 1

```
La forme échelonnée réduite de la matrice augmentée d'un système est [[1,-3,0|1],[0,0,1|1],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,-3,0|1],[0,0,1|1],[0,0,0|0]]
    (Pas de pivot dans la colonne de x₂ : x₂ = t.)
    = x = (1+3t ; t ; 1)   (cases à remplir : (1,1) (3,1))   ← x₂ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 0 ; 1) + t(3 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₂ = t. | x₁ = 1 + □t, x₃ = 1 | x=(101)+t(310)
  pièges : l_free_var_zero

La forme échelonnée réduite de la matrice augmentée d'un système est [[1,1,0|1],[0,0,1|0],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,1,0|1],[0,0,1|0],[0,0,0|0]]
    (Pas de pivot dans la colonne de x₂ : x₂ = t.)
    = x = (1-t ; t ; 0)   (cases à remplir : (1,1) (3,1))   ← x₂ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 0 ; 0) + t(-1 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₂ = t. | x₁ = 1 + □t, x₃ = 0 | x=(100)+t(−110)
  pièges : l_free_var_zero

La forme échelonnée réduite de la matrice augmentée d'un système est [[1,0,3|-1],[0,1,3|2],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,0,3|-1],[0,1,3|2],[0,0,0|0]]
    (Pas de pivot dans la colonne de x₃ : x₃ = t.)
    = x = (-1-3t ; 2-3t ; t)   (cases à remplir : (1,1) (2,1))   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-1 ; 2 ; 0) + t(-3 ; -3 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = −1 + □t, x₂ = 2 + □t | x=(−120)+t(−3−31)
  pièges : l_free_var_zero

```

### Niveau 2

```
La forme échelonnée réduite de la matrice augmentée d'un système est [[1,0,-3|3],[0,1,2|-1],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,0,-3|3],[0,1,2|-1],[0,0,0|0]]
    ? Quelles variables sont libres ? · Aucune : il y a une solution unique / ✔ x₃ : sa colonne n'a pas de pivot / · x₁ : la première variable
    = x = (3+3t ; -1-2t ; t)   (cases à remplir : (1,1) (2,1))   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (3 ; -1 ; 0) + t(3 ; -2 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = 3 + □t, x₂ = −1 + □t | x=(3−10)+t(3−21)
  pièges : l_free_var_zero

La forme échelonnée réduite de la matrice augmentée d'un système est [[1,0,-1|1],[0,1,3|2],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,0,-1|1],[0,1,3|2],[0,0,0|0]]
    ? Quelles variables sont libres ? · Aucune : il y a une solution unique / · x₁ : la première variable / ✔ x₃ : sa colonne n'a pas de pivot
    = x = (1+t ; 2-3t ; t)   (cases à remplir : (1,1) (2,1))   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 2 ; 0) + t(1 ; -3 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = 1 + □t, x₂ = 2 + □t | x=(120)+t(1−31)
  pièges : l_free_var_zero

La forme échelonnée réduite de la matrice augmentée d'un système est [[1,0,-2|-1],[0,1,2|-1],[0,0,0|0]]. Exprime les variables pivots en fonction de la variable libre, puis écris la solution sous forme vectorielle.
  [guided]  [[1,0,-2|-1],[0,1,2|-1],[0,0,0|0]]
    ? Quelles variables sont libres ? · Aucune : il y a une solution unique / · x₁ : la première variable / ✔ x₃ : sa colonne n'a pas de pivot
    = x = (-1+2t ; -1-2t ; t)   (cases à remplir : (1,1) (2,1))   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-1 ; -1 ; 0) + t(2 ; -2 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = −1 + □t, x₂ = −1 + □t | x=(−1−10)+t(2−21)
  pièges : l_free_var_zero

```

### Niveau 3

```
Résous le système de matrice augmentée [[0,0,1|1],[1,-3,0|-2],[-3,9,-1|5]] : réduis-la (choisis chaque opération), puis écris la solution x = p + t·v.
  [tap, suivre l'erreur, menu rowops]  [[0,0,1|1],[1,-3,0|-2],[-3,9,-1|5]]
    = L1 ↔ L2 : [[1,-3,0|-2],[0,0,1|1],[-3,9,-1|5]]   ← Échanger deux lignes
    = L3 ← L3 + 3L1 : [[1,-3,0|-2],[0,0,1|1],[0,0,-1|-1]]   ← Descendre : L₃ ← L₃ + 3L₁
    = L3 ← L3 + L2 : [[1,-3,0|-2],[0,0,1|1],[0,0,0|0]]   ← Descendre : L₃ ← L₃ + L₂
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (-2+3t ; t ; 1)   ← x₂ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-2 ; 0 ; 1) + t(3 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₂ = t. | x₁ = −2 + □t, x₃ = 1 | x=(−201)+t(310)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Résous le système de matrice augmentée [[2,-4,0|2],[0,0,1|3],[-1,2,-1|-4]] : réduis-la (choisis chaque opération), puis écris la solution x = p + t·v.
  [tap, suivre l'erreur, menu rowops]  [[2,-4,0|2],[0,0,1|3],[-1,2,-1|-4]]
    = L3 ← L3 + (1/2)L1 : [[2,-4,0|2],[0,0,1|3],[0,0,-1|-3]]   ← Descendre : L₃ ← L₃ + (1/2)L₁
    = L3 ← L3 + L2 : [[2,-4,0|2],[0,0,1|3],[0,0,0|0]]   ← Descendre : L₃ ← L₃ + L₂
    = L1 ← (1/2)L1 : [[1,-2,0|1],[0,0,1|3],[0,0,0|0]]   ← Pivot à 1
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (1+2t ; t ; 3)   ← x₂ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 0 ; 3) + t(2 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₂ = t. | x₁ = 1 + □t, x₃ = 3 | x=(103)+t(210)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Résous le système de matrice augmentée [[1,2,4|-1],[0,1,1|0],[1,0,2|-1]] : réduis-la (choisis chaque opération), puis écris la solution x = p + t·v.
  [tap, suivre l'erreur, menu rowops]  [[1,2,4|-1],[0,1,1|0],[1,0,2|-1]]
    = L3 ← L3 - L1 : [[1,2,4|-1],[0,1,1|0],[0,-2,-2|0]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 + 2L2 : [[1,2,4|-1],[0,1,1|0],[0,0,0|0]]   ← Descendre : L₃ ← L₃ + 2L₂
    = L1 ← L1 - 2L2 : [[1,0,2|-1],[0,1,1|0],[0,0,0|0]]   ← Remonter : L₁ ← L₁ − 2L₂
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (-1-2t ; -t ; t)   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-1 ; 0 ; 0) + t(-2 ; -1 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = −1 + □t, x₂ = 0 + □t | x=(−100)+t(−2−11)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Résous le système x_1 − x_2 − 2x_3 = 3 ; x_2 + x_3 + x_4 = 0 ; x_4 = 0 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, suivre l'erreur]  Matrice
    = [[1,-1,-2,0|3],[0,1,1,1|0],[0,0,0,1|0]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[1,-1,-2,0|3],[0,1,1,1|0],[0,0,0,1|0]]
    = L2 ← L2 - L3 : [[1,-1,-2,0|3],[0,1,1,0|0],[0,0,0,1|0]]   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 + L2 : [[1,0,-1,0|3],[0,1,1,0|0],[0,0,0,1|0]]   ← Remonter : L₁ ← L₁ + L₂
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (3+t ; -t ; t ; 0)   ← x₃ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (3 ; 0 ; 0 ; 0) + t(1 ; -1 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₃ = t. | x₁ = 3 + □t, x₂ = 0 + □t, x₄ = 0 | x=(3000)+t(1−110)

Résous le système 2x_1 − 2x_2 + x_3 = 4 ; x_1 − x_2 + x_3 = 3 ; x_1 − x_2 + x_4 = 0 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, suivre l'erreur]  Matrice
    = [[2,-2,1,0|4],[1,-1,1,0|3],[1,-1,0,1|0]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[2,-2,1,0|4],[1,-1,1,0|3],[1,-1,0,1|0]]
    = L2 ← L2 - (1/2)L1 : [[2,-2,1,0|4],[0,0,1/2,0|1],[1,-1,0,1|0]]   ← Descendre : L₂ ← L₂ − (1/2)L₁
    = L3 ← L3 - (1/2)L1 : [[2,-2,1,0|4],[0,0,1/2,0|1],[0,0,-1/2,1|-2]]   ← Descendre : L₃ ← L₃ − (1/2)L₁
    = L3 ← L3 + L2 : [[2,-2,1,0|4],[0,0,1/2,0|1],[0,0,0,1|-1]]   ← Descendre : L₃ ← L₃ + L₂
    = L2 ← 2L2 : [[2,-2,1,0|4],[0,0,1,0|2],[0,0,0,1|-1]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[2,-2,0,0|2],[0,0,1,0|2],[0,0,0,1|-1]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← (1/2)L1 : [[1,-1,0,0|1],[0,0,1,0|2],[0,0,0,1|-1]]   ← Pivot à 1
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (1+t ; t ; 2 ; -1)   ← x₂ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 0 ; 2 ; -1) + t(1 ; 1 ; 0 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₂ = t. | x₁ = 1 + □t, x₃ = 2, x₄ = −1 | x=(102−1)+t(1100)

Résous le système x_1 − x_3 = 4 ; x_3 = −2 ; x_2 − 3x_4 = 1 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, suivre l'erreur]  Matrice
    = [[1,0,-1,0|4],[0,0,1,0|-2],[0,1,0,-3|1]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[1,0,-1,0|4],[0,0,1,0|-2],[0,1,0,-3|1]]
    = L2 ↔ L3 : [[1,0,-1,0|4],[0,1,0,-3|1],[0,0,1,0|-2]]   ← Échanger deux lignes
    = L1 ← L1 + L3 : [[1,0,0,0|2],[0,1,0,-3|1],[0,0,1,0|-2]]   ← Remonter : L₁ ← L₁ + L₃
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (2 ; 1+3t ; -2 ; t)   ← x₄ = t : les variables pivots s'expriment avec t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (2 ; 1 ; -2 ; 0) + t(0 ; 3 ; 0 ; 1)   ← Un point, plus les combinaisons des vecteurs directeurs
  aides : Les variables sans pivot sont libres : pose x₄ = t. | x₁ = 2, x₂ = 1 + □t, x₃ = −2 | x=(21−20)+t(0301)

```

### Niveau 5

```
Résous le système x_1 + 2x_2 − 2x_3 − x_4 = −4 ; x_4 = 1 ; x_1 + 2x_2 − 2x_3 = −3 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, sans aide]  Matrice
    = [[1,2,-2,-1|-4],[0,0,0,1|1],[1,2,-2,0|-3]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[1,2,-2,-1|-4],[0,0,0,1|1],[1,2,-2,0|-3]]
    = L3 ← L3 - L1 : [[1,2,-2,-1|-4],[0,0,0,1|1],[0,0,0,1|1]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,2,-2,-1|-4],[0,0,0,1|1],[0,0,0,0|0]]   ← Descendre : L₃ ← L₃ − L₂
    = L1 ← L1 + L2 : [[1,2,-2,0|-3],[0,0,0,1|1],[0,0,0,0|0]]   ← Remonter : L₁ ← L₁ + L₂
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (-3-2s+2t ; s ; t ; 1)   ← x₂ = s, x₃ = t : les variables pivots s'expriment avec s et t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-3 ; 0 ; 0 ; 1) + s(-2 ; 1 ; 0 ; 0) + t(2 ; 0 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs

Résous le système −2x_4 = −2 ; −x_1 − 3x_2 − x_3 + x_4 = 2 ; x_1 + 3x_2 + x_3 = −1 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, sans aide]  Matrice
    = [[0,0,0,-2|-2],[-1,-3,-1,1|2],[1,3,1,0|-1]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[0,0,0,-2|-2],[-1,-3,-1,1|2],[1,3,1,0|-1]]
    = L1 ↔ L2 : [[-1,-3,-1,1|2],[0,0,0,-2|-2],[1,3,1,0|-1]]   ← Échanger deux lignes
    = L3 ← L3 + L1 : [[-1,-3,-1,1|2],[0,0,0,-2|-2],[0,0,0,1|1]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 + (1/2)L2 : [[-1,-3,-1,1|2],[0,0,0,-2|-2],[0,0,0,0|0]]   ← Descendre : L₃ ← L₃ + (1/2)L₂
    = L2 ← -(1/2)L2 : [[-1,-3,-1,1|2],[0,0,0,1|1],[0,0,0,0|0]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[-1,-3,-1,0|1],[0,0,0,1|1],[0,0,0,0|0]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,3,1,0|-1],[0,0,0,1|1],[0,0,0,0|0]]   ← Pivot à 1
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (-1-3s-t ; s ; t ; 1)   ← x₂ = s, x₃ = t : les variables pivots s'expriment avec s et t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (-1 ; 0 ; 0 ; 1) + s(-3 ; 1 ; 0 ; 0) + t(-1 ; 0 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs

Résous le système −x_1 + x_2 + 2x_3 − x_4 = 2 ; 2x_1 − 2x_2 − 4x_3 + x_4 = −1 ; x_1 − x_2 − 2x_3 = 1 : matrice augmentée, forme réduite, puis solution sous forme vectorielle.
  [free, sans aide]  Matrice
    = [[-1,1,2,-1|2],[2,-2,-4,1|-1],[1,-1,-2,0|1]]   ← Une ligne par équation, b après la barre
  — Réduis la matrice augmentée.  [juge rowops]  départ : [[-1,1,2,-1|2],[2,-2,-4,1|-1],[1,-1,-2,0|1]]
    = L2 ← L2 + 2L1 : [[-1,1,2,-1|2],[0,0,0,-1|3],[1,-1,-2,0|1]]   ← Descendre : L₂ ← L₂ + 2L₁
    = L3 ← L3 + L1 : [[-1,1,2,-1|2],[0,0,0,-1|3],[0,0,0,-1|3]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 - L2 : [[-1,1,2,-1|2],[0,0,0,-1|3],[0,0,0,0|0]]   ← Descendre : L₃ ← L₃ − L₂
    = L2 ← -L2 : [[-1,1,2,-1|2],[0,0,0,1|-3],[0,0,0,0|0]]   ← Pivot à 1
    = L1 ← L1 + L2 : [[-1,1,2,0|-1],[0,0,0,1|-3],[0,0,0,0|0]]   ← Remonter : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,-1,-2,0|1],[0,0,0,1|-3],[0,0,0,0|0]]   ← Pivot à 1
  — Exprime les variables pivots en fonction des variables libres.  [juge mat]  départ : x
    = x = (1+s+2t ; s ; t ; -3)   ← x₂ = s, x₃ = t : les variables pivots s'expriment avec s et t
  — Écris la solution sous forme vectorielle.  [juge span]  départ : x
    = x = (1 ; 0 ; 0 ; -3) + s(1 ; 1 ; 0 ; 0) + t(2 ; 0 ; 1 ; 0)   ← Un point, plus les combinaisons des vecteurs directeurs

```

### Variantes d'examen

```
La solution générale du système −x_2 + 2x_3 = 3 ; x_1 + 3x_2 − 4x_3 = −7 ; −x_1 − 2x_2 + 2x_3 = 4 est :
  · x=t(−221) [l_rhs_forgotten]   ✔ x=(2−30)+t(−221)   · x=(2−30) [l_free_var_zero]   · x=(2−30)+t(2−21) [l_ker_sign]
  [examen mcq]
  pièges : l_free_var_zero, l_ker_sign, l_rhs_forgotten

Vrai ou faux ?
  « Si Ax = b a deux solutions distinctes, il en a une infinité. » → VRAI
  [examen tf]

```

## Système à paramètre : aucune, une ou une infinité de solutions (`l-sys-param`, BA1)

_Échelonner sans diviser par zéro, puis discuter._

### Niveau 1

```
Discute selon le paramètre réel a les solutions du système x + 2y + (1 − a)z = 0 ; −x − y − z = −1 ; (−a − 1)x + (−2a − 1)y + z = 1 − a Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,2,1-a|0],[-1,-1,-1|-1],[-a-1,-2a-1,1|1-a]]
    = L2 ← L2 + L1 : [[1,2,1-a|0],[0,1,-a|-1],[-a-1,-2a-1,1|1-a]]   (cases à remplir : (2,1) (2,2))   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 + (a+1)L1 : [[1,2,1-a|0],[0,1,-a|-1],[0,1,-a^2+2|1-a]]   (cases à remplir : (3,1) (3,2))   ← Descendre sans diviser : L₃ ← L₃ + (a+1)L₁
    = L3 ← L3 - L2 : [[1,2,1-a|0],[0,1,-a|-1],[0,0,-a^2+a+2|2-a]]   (cases à remplir : (3,2) (3,4))   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est −a² + a + 2. Factorise-le.  [juge poly]  départ : −a² + a + 2
    = −(a − 2)(a + 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {2 ; −1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 2   ← Pour a = 2, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −1   ← Pour a = −1, la dernière ligne devient 0 = 3
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −(a−2)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −(a − 2)(a + 1) ; une infinité pour a = 2 ; aucune pour a = −1 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + y + az = 2 ; −x − 2y + (−a − 1)z = −4 ; (a − 1)x + ay + (−6a − 5)z = −4 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,1,a|2],[-1,-2,-a-1|-4],[a-1,a,-6a-5|-4]]
    = L2 ← L2 + L1 : [[1,1,a|2],[0,-1,-1|-2],[a-1,a,-6a-5|-4]]   (cases à remplir : (2,1) (2,4))   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 + (1-a)L1 : [[1,1,a|2],[0,-1,-1|-2],[0,1,-a^2-5a-5|-2a-2]]   (cases à remplir : (3,1) (3,3))   ← Descendre sans diviser : L₃ ← L₃ + (1−a)L₁
    = L3 ← L3 + L2 : [[1,1,a|2],[0,-1,-1|-2],[0,0,-a^2-5a-6|-2a-4]]   (cases à remplir : (3,1) (3,4))   ← Descendre sans diviser : L₃ ← L₃ + L₂
  — Le dernier pivot est −a² − 5a − 6. Factorise-le.  [juge poly]  départ : −a² − 5a − 6
    = −(a + 2)(a + 3)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {−2 ; −3}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = −2   ← Pour a = −2, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −3   ← Pour a = −3, la dernière ligne devient 0 = 2
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −(a+2)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −(a + 2)(a + 3) ; une infinité pour a = −2 ; aucune pour a = −3 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + (a + 1)z = −1 ; −x + y + (−a − 2)z = 0 ; (−a − 1)x + y + (−4a − 5)z = 3 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,0,a+1|-1],[-1,1,-a-2|0],[-a-1,1,-4a-5|3]]
    = L2 ← L2 + L1 : [[1,0,a+1|-1],[0,1,-1|-1],[-a-1,1,-4a-5|3]]   (cases à remplir : (2,1) (2,4))   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 + (a+1)L1 : [[1,0,a+1|-1],[0,1,-1|-1],[0,1,a^2-2a-4|2-a]]   (cases à remplir : (3,1) (3,3))   ← Descendre sans diviser : L₃ ← L₃ + (a+1)L₁
    = L3 ← L3 - L2 : [[1,0,a+1|-1],[0,1,-1|-1],[0,0,a^2-2a-3|3-a]]   (cases à remplir : (3,2) (3,4))   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est a² − 2a − 3. Factorise-le.  [juge poly]  départ : a² − 2a − 3
    = (a − 3)(a + 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {3 ; −1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 3   ← Pour a = 3, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −1   ← Pour a = −1, la dernière ligne devient 0 = 4
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = (a−3)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = (a − 3)(a + 1) ; une infinité pour a = 3 ; aucune pour a = −1 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

```

### Niveau 2

```
Discute selon le paramètre réel a les solutions du système x + y + (−a − 1)z = 1 ; x + 2y − z = 0 ; −ax + (1 − a)y + (a + 2)z = −2a Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,1,-a-1|1],[1,2,-1|0],[-a,1-a,a+2|-2a]]
    = L2 ← L2 - L1 : [[1,1,-a-1|1],[0,1,a|-1],[-a,1-a,a+2|-2a]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Descendre sans diviser : L₂ ← L₂ − L₁
    = L3 ← L3 + aL1 : [[1,1,-a-1|1],[0,1,a|-1],[0,1,-a^2+2|-a]]   (cases à remplir : (3,1) (3,3) (3,4))   ← Descendre sans diviser : L₃ ← L₃ + aL₁
    = L3 ← L3 - L2 : [[1,1,-a-1|1],[0,1,a|-1],[0,0,-a^2-a+2|1-a]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est −a² − a + 2. Factorise-le.  [juge poly]  départ : −a² − a + 2
    ? La dernière ligne est [0, 0, −a² − a + 2 | 1 − a]. Que fais-tu ? ✔ Factoriser le pivot et traiter à part les valeurs qui l'annulent / · Diviser la ligne par le pivot pour avoir un 1
    = −(a − 1)(a + 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {1 ; −2}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −2   ← Pour a = −2, la dernière ligne devient 0 = 3
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −(a−1)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −(a − 1)(a + 2) ; une infinité pour a = 1 ; aucune pour a = −2 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_divide_zero, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x − az = 2 ; −x − y + (2a + 1)z = 0 ; −ax + y + (−3a − 1)z = 2 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,0,-a|2],[-1,-1,2a+1|0],[-a,1,-3a-1|2]]
    = L2 ← L2 + L1 : [[1,0,-a|2],[0,-1,a+1|2],[-a,1,-3a-1|2]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 + aL1 : [[1,0,-a|2],[0,-1,a+1|2],[0,1,-a^2-3a-1|2a+2]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Descendre sans diviser : L₃ ← L₃ + aL₁
    = L3 ← L3 + L2 : [[1,0,-a|2],[0,-1,a+1|2],[0,0,-a^2-2a|2a+4]]   (cases à remplir : (3,1) (3,3) (3,4))   ← Descendre sans diviser : L₃ ← L₃ + L₂
  — Le dernier pivot est −a² − 2a. Factorise-le.  [juge poly]  départ : −a² − 2a
    ? La dernière ligne est [0, 0, −a² − 2a | 2a + 4]. Que fais-tu ? ✔ Factoriser le pivot et traiter à part les valeurs qui l'annulent / · Diviser la ligne par le pivot pour avoir un 1
    = −a(a + 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {−2 ; 0}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = −2   ← Pour a = −2, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 0   ← Pour a = 0, la dernière ligne devient 0 = 4
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −a(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −a(a + 2) ; une infinité pour a = −2 ; aucune pour a = 0 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_divide_zero, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x − y + (a + 1)z = 2 ; x + (a − 3)y + (a + 2)z = 0 ; (a − 1)x − y + (5a − 6)z = 0 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [guided]  [[1,-1,a+1|2],[1,a-3,a+2|0],[a-1,-1,5a-6|0]]
    = L2 ← L2 - L1 : [[1,-1,a+1|2],[0,a-2,1|-2],[a-1,-1,5a-6|0]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Descendre sans diviser : L₂ ← L₂ − L₁
    = L3 ← L3 + (1-a)L1 : [[1,-1,a+1|2],[0,a-2,1|-2],[0,a-2,-a^2+5a-5|2-2a]]   (cases à remplir : (3,1) (3,2) (3,4))   ← Descendre sans diviser : L₃ ← L₃ + (1−a)L₁
    = L3 ← L3 - L2 : [[1,-1,a+1|2],[0,a-2,1|-2],[0,0,-a^2+5a-6|4-2a]]   (cases à remplir : (3,1) (3,3) (3,4))   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est −a² + 5a − 6. Factorise-le.  [juge poly]  départ : −a² + 5a − 6
    ? La dernière ligne est [0, 0, −a² + 5a − 6 | 4 − 2a]. Que fais-tu ? · Diviser la ligne par le pivot pour avoir un 1 / ✔ Factoriser le pivot et traiter à part les valeurs qui l'annulent
    = −(a − 2)(a − 3)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {2 ; 3}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 2   ← Pour a = 2, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 3   ← Pour a = 3, la dernière ligne devient 0 = −2
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −(a−2)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −(a − 2)(a − 3) ; une infinité pour a = 2 ; aucune pour a = 3 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_divide_zero, l_param_none_vs_inf

```

### Niveau 3

```
Discute selon le paramètre réel a les solutions du système x + y + (−a − 1)z = 1 ; −x + (a − 1)z = 1 ; ax + (a + 2)y + (−3a − 4)z = 6 Choisis chaque opération de sa matrice augmentée, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [tap, suivre l'erreur, menu rowops]  [[1,1,-a-1|1],[-1,0,a-1|1],[a,a+2,-3a-4|6]]
    = L2 ← L2 + L1 : [[1,1,-a-1|1],[0,1,-2|2],[a,a+2,-3a-4|6]]   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 - aL1 : [[1,1,-a-1|1],[0,1,-2|2],[0,2,a^2-2a-4|6-a]]   ← Descendre sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 - 2L2 : [[1,1,-a-1|1],[0,1,-2|2],[0,0,a^2-2a|2-a]]   ← Descendre sans diviser : L₃ ← L₃ − 2L₂
  — Le dernier pivot est a² − 2a. Factorise-le.  [juge poly]  départ : a² − 2a
    = a(a − 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {2 ; 0}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 2   ← Pour a = 2, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 0   ← Pour a = 0, la dernière ligne devient 0 = 2
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = a(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = a(a − 2) ; une infinité pour a = 2 ; aucune pour a = 0 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + 2y + (a + 1)z = 1 ; −y + 2z = −1 ; −ax + (2 − 2a)y + (−5a − 1)z = a − 4 Choisis chaque opération de sa matrice augmentée, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [tap, suivre l'erreur, menu rowops]  [[1,2,a+1|1],[0,-1,2|-1],[-a,2-2a,-5a-1|a-4]]
    = L3 ← L3 + aL1 : [[1,2,a+1|1],[0,-1,2|-1],[0,2,a^2-4a-1|2a-4]]   ← Descendre sans diviser : L₃ ← L₃ + aL₁
    = L3 ← L3 + 2L2 : [[1,2,a+1|1],[0,-1,2|-1],[0,0,a^2-4a+3|2a-6]]   ← Descendre sans diviser : L₃ ← L₃ + 2L₂
  — Le dernier pivot est a² − 4a + 3. Factorise-le.  [juge poly]  départ : a² − 4a + 3
    = (a − 3)(a − 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {3 ; 1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 3   ← Pour a = 3, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = −4
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = (a−3)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = (a − 3)(a − 1) ; une infinité pour a = 3 ; aucune pour a = 1 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + (1 − a)z = −2 ; x + y + (−a − 1)z = −1 ; ax − 2y + (6 − 2a)z = −4 Choisis chaque opération de sa matrice augmentée, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [tap, suivre l'erreur, menu rowops]  [[1,0,1-a|-2],[1,1,-a-1|-1],[a,-2,6-2a|-4]]
    = L2 ← L2 - L1 : [[1,0,1-a|-2],[0,1,-2|1],[a,-2,6-2a|-4]]   ← Descendre sans diviser : L₂ ← L₂ − L₁
    = L3 ← L3 - aL1 : [[1,0,1-a|-2],[0,1,-2|1],[0,-2,a^2-3a+6|2a-4]]   ← Descendre sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 + 2L2 : [[1,0,1-a|-2],[0,1,-2|1],[0,0,a^2-3a+2|2a-2]]   ← Descendre sans diviser : L₃ ← L₃ + 2L₂
  — Le dernier pivot est a² − 3a + 2. Factorise-le.  [juge poly]  départ : a² − 3a + 2
    = (a − 1)(a − 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {1 ; 2}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 2   ← Pour a = 2, la dernière ligne devient 0 = 2
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = (a−1)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = (a − 1)(a − 2) ; une infinité pour a = 1 ; aucune pour a = 2 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

```

### Niveau 4

```
Discute selon le paramètre réel a les solutions du système x − az = 2 ; x − y + (−a − 2)z = 4 ; ax + 2y + (2a + 1)z = 4a + 2 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, suivre l'erreur]  [[1,0,-a|2],[1,-1,-a-2|4],[a,2,2a+1|4a+2]]
    = L2 ← L2 - L1 : [[1,0,-a|2],[0,-1,-2|2],[a,2,2a+1|4a+2]]   ← Descendre sans diviser : L₂ ← L₂ − L₁
    = L3 ← L3 - aL1 : [[1,0,-a|2],[0,-1,-2|2],[0,2,a^2+2a+1|2a+2]]   ← Descendre sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 + 2L2 : [[1,0,-a|2],[0,-1,-2|2],[0,0,a^2+2a-3|2a+6]]   ← Descendre sans diviser : L₃ ← L₃ + 2L₂
  — Le dernier pivot est a² + 2a − 3. Factorise-le.  [juge poly]  départ : a² + 2a − 3
    = (a + 3)(a − 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {−3 ; 1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = −3   ← Pour a = −3, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 8
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = (a+3)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = (a + 3)(a − 1) ; une infinité pour a = −3 ; aucune pour a = 1 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + (1 − a)z = −2 ; −y − 2z = −1 ; ax − y + (2a − 4)z = −3 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, suivre l'erreur]  [[1,0,1-a|-2],[0,-1,-2|-1],[a,-1,2a-4|-3]]
    = L3 ← L3 - aL1 : [[1,0,1-a|-2],[0,-1,-2|-1],[0,-1,a^2+a-4|2a-3]]   ← Descendre sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 - L2 : [[1,0,1-a|-2],[0,-1,-2|-1],[0,0,a^2+a-2|2a-2]]   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est a² + a − 2. Factorise-le.  [juge poly]  départ : a² + a − 2
    = (a − 1)(a + 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {1 ; −2}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −2   ← Pour a = −2, la dernière ligne devient 0 = −6
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = (a−1)(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = (a − 1)(a + 2) ; une infinité pour a = 1 ; aucune pour a = −2 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + 2y + az = −1 ; x + 3y + (a − 2)z = 1 ; ax + (2a + 1)y + (−a − 2)z = 2 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, suivre l'erreur]  [[1,2,a|-1],[1,3,a-2|1],[a,2a+1,-a-2|2]]
    = L2 ← L2 - L1 : [[1,2,a|-1],[0,1,-2|2],[a,2a+1,-a-2|2]]   ← Descendre sans diviser : L₂ ← L₂ − L₁
    = L3 ← L3 - aL1 : [[1,2,a|-1],[0,1,-2|2],[0,1,-a^2-a-2|a+2]]   ← Descendre sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 - L2 : [[1,2,a|-1],[0,1,-2|2],[0,0,-a^2-a|a]]   ← Descendre sans diviser : L₃ ← L₃ − L₂
  — Le dernier pivot est −a² − a. Factorise-le.  [juge poly]  départ : −a² − a
    = −a(a + 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {0 ; −1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 0   ← Pour a = 0, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −1   ← Pour a = −1, la dernière ligne devient 0 = −1
  aides : Échelonne sans diviser par une expression en a, puis regarde la dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité. | f(a) = −a(□) ; une infinité pour a = □ ; aucune pour a = □. | f(a) = −a(a + 1) ; une infinité pour a = 0 ; aucune pour a = −1 ; une solution unique sinon.
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

```

### Niveau 5

```
Discute selon le paramètre réel a les solutions du système x − 2y + 2z = 1 ; −x + 3y + z = 1 ; x − 3y + (a² + 4a + 2)z = a + 2 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, sans aide]  [[1,-2,2|1],[-1,3,1|1],[1,-3,a^2+4a+2|a+2]]
    = L2 ← L2 + L1 : [[1,-2,2|1],[0,1,3|2],[1,-3,a^2+4a+2|a+2]]   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 - L1 : [[1,-2,2|1],[0,1,3|2],[0,-1,a^2+4a|a+1]]   ← Descendre sans diviser : L₃ ← L₃ − L₁
    = L3 ← L3 + L2 : [[1,-2,2|1],[0,1,3|2],[0,0,a^2+4a+3|a+3]]   ← Descendre sans diviser : L₃ ← L₃ + L₂
  — Le dernier pivot est a² + 4a + 3. Factorise-le.  [juge poly]  départ : a² + 4a + 3
    = (a + 3)(a + 1)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {−3 ; −1}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = −3   ← Pour a = −3, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −1   ← Pour a = −1, la dernière ligne devient 0 = 2
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x − 2y − z = 1 ; −x + y + 4z = −2 ; x + (−a² − a − 5)z = 5 − 2a Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, sans aide]  [[1,-2,-1|1],[-1,1,4|-2],[1,0,-a^2-a-5|5-2a]]
    = L2 ← L2 + L1 : [[1,-2,-1|1],[0,-1,3|-1],[1,0,-a^2-a-5|5-2a]]   ← Descendre sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 - L1 : [[1,-2,-1|1],[0,-1,3|-1],[0,2,-a^2-a-4|4-2a]]   ← Descendre sans diviser : L₃ ← L₃ − L₁
    = L3 ← L3 + 2L2 : [[1,-2,-1|1],[0,-1,3|-1],[0,0,-a^2-a+2|2-2a]]   ← Descendre sans diviser : L₃ ← L₃ + 2L₂
  — Le dernier pivot est −a² − a + 2. Factorise-le.  [juge poly]  départ : −a² − a + 2
    = −(a − 1)(a + 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {1 ; −2}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = −2   ← Pour a = −2, la dernière ligne devient 0 = 6
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

Discute selon le paramètre réel a les solutions du système x + 2y = 2 ; 2x + 3y = 4 ; 2y + (−a² + 3a − 2)z = a − 1 Échelonne sa matrice augmentée sans diviser par une expression de a, factorise le dernier pivot, puis trouve les valeurs de a qui donnent une infinité de solutions, et celles qui n'en donnent aucune.
  [free, sans aide]  [[1,2,0|2],[2,3,0|4],[0,2,-a^2+3a-2|a-1]]
    = L2 ← L2 - 2L1 : [[1,2,0|2],[0,-1,0|0],[0,2,-a^2+3a-2|a-1]]   ← Descendre sans diviser : L₂ ← L₂ − 2L₁
    = L3 ← L3 + 2L2 : [[1,2,0|2],[0,-1,0|0],[0,0,-a^2+3a-2|a-1]]   ← Descendre sans diviser : L₃ ← L₃ + 2L₂
  — Le dernier pivot est −a² + 3a − 2. Factorise-le.  [juge poly]  départ : −a² + 3a − 2
    = −(a − 1)(a − 2)   ← Ses zéros sont les valeurs de a à traiter à part
  — Pour quelles valeurs de a le système a-t-il une infinité de solutions ?  [juge solset]  départ : S
    (Si a ∉ {1 ; 2}, le dernier pivot n'est pas nul : une solution unique. Restent ces deux valeurs.)
    = a = 1   ← Pour a = 1, la dernière ligne devient 0 = 0
  — Pour quelles valeurs de a le système n'a-t-il aucune solution ?  [juge solset]  départ : S
    = a = 2   ← Pour a = 2, la dernière ligne devient 0 = 1
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_rowop_partial, l_param_none_vs_inf

```

### Variantes d'examen

```
Soit a un paramètre réel et le système x + y + az = 2 ; y + (a − 1)z = 2 ; (1 − a)x − ay = 1 − 3a Une seule affirmation est vraie :
  · Le système a une solution unique si et seulement si a ≠ 1. [l_param_divide_zero]   ✔ Le système n'a aucune solution si et seulement si a = −1.   · Le système a au moins une solution si et seulement si a ≠ 1. [l_param_none_vs_inf]   · Le système a au moins une solution si et seulement si a ∉ {−1 ; 1}.
  [examen mcq]
  pièges : l_param_none_vs_inf, l_param_divide_zero

Soit le système x + az = −1 ; −x + y + (1 − a)z = 3 ; (1 − a)x + y + (2a − 1)z = 2 Pour a = −4, il a une solution unique. Que vaut x ?
  [free, sans aide, examen coef]  x
    = 1
  pièges : l_rowop_sign

Vrai ou faux ?
  « Le système x + 2y + z = 2 ; x + y + 3z = 2 ; 2x + 3y + (a² + a − 2)z = 6 − a a une solution unique pour tout a ≠ 2. » → FAUX
    contre-exemple (refute) : a = -3
  [examen tf]
  pièges : l_param_divide_zero

```

## Combinaisons linéaires, Span, Ax comme combinaison des colonnes (`l-vec-span`, BA1)

_b ∈ Span{v₁, …} ⇔ [v₁ … | b] compatible._

### Niveau 1

```
Soit v₁ = (-1 ; 0 ; 1), v₂ = (2 ; 1 ; 2) et b = (1 ; 2 ; 7). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    = [[-1,2|1],[0,1|2],[1,2|7]]   (cases à remplir : (3,1) (3,3))   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[-1,2|1],[0,1|2],[1,2|7]]
    = L3 ← L3 + L1 : [[-1,2|1],[0,1|2],[0,4|8]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 - 4L2 : [[-1,2|1],[0,1|2],[0,0|0]]   (cases à remplir : (3,1) (3,2))   ← Annuler sous le pivot : L₃ ← L₃ − 4L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (3 ; 2)   ← b = 3v₁ + 2v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₃ ← L₃ + L₁ : la ligne 3 devient [0, □ | □]. | [[-1,2|1],[0,1|2],[1,2|7]] ; b = 3v₁ + 2v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; -1 ; 1), v₂ = (2 ; -1 ; 2) et b = (0 ; 1 ; 0). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    = [[1,2|0],[-1,-1|1],[1,2|0]]   (cases à remplir : (1,3) (3,2))   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,2|0],[-1,-1|1],[1,2|0]]
    = L2 ← L2 + L1 : [[1,2|0],[0,1|1],[1,2|0]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 - L1 : [[1,2|0],[0,1|1],[0,0|0]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; 1)   ← b = −2v₁ + v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, □ | □]. | [[1,2|0],[-1,-1|1],[1,2|0]] ; b = −2v₁ + v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; 1 ; 1), v₂ = (1 ; 0 ; 0) et b = (1 ; -2 ; -2). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    = [[1,1|1],[1,0|-2],[1,0|-2]]   (cases à remplir : (1,1) (2,1))   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,1|1],[1,0|-2],[1,0|-2]]
    = L2 ← L2 - L1 : [[1,1|1],[0,-1|-3],[1,0|-2]]   (cases à remplir : (2,1) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 - L1 : [[1,1|1],[0,-1|-3],[0,-1|-3]]   (cases à remplir : (3,1) (3,2))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,1|1],[0,-1|-3],[0,0|0]]   (cases à remplir : (3,1) (3,2))   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; 3)   ← b = −2v₁ + 3v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ − L₁ : la ligne 2 devient [0, □ | □]. | [[1,1|1],[1,0|-2],[1,0|-2]] ; b = −2v₁ + 3v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

```

### Niveau 2

```
Soit v₁ = (1 ; -2 ; 2), v₂ = (0 ; 2 ; -1) et b = (-1 ; 4 ; -3). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    ? Comment ranger les données dans la matrice ? ✔ Chaque vecteur en colonne, b en dernière colonne / · Chaque vecteur en ligne, b en dernière ligne
    = [[1,0|-1],[-2,2|4],[2,-1|-3]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|-1],[-2,2|4],[2,-1|-3]]
    = L2 ← L2 + 2L1 : [[1,0|-1],[0,2|2],[2,-1|-3]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 - 2L1 : [[1,0|-1],[0,2|2],[0,-1|-1]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
    = L3 ← L3 + (1/2)L2 : [[1,0|-1],[0,2|2],[0,0|0]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + (1/2)L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; 1)   ← b = −v₁ + v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|-1],[-2,2|4],[2,-1|-3]] ; b = −v₁ + v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; 0 ; -2), v₂ = (-1 ; 1 ; -2) et b = (-1 ; 3 ; -10). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    ? Comment ranger les données dans la matrice ? ✔ Chaque vecteur en colonne, b en dernière colonne / · Chaque vecteur en ligne, b en dernière ligne
    = [[1,-1|-1],[0,1|3],[-2,-2|-10]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,-1|-1],[0,1|3],[-2,-2|-10]]
    = L3 ← L3 + 2L1 : [[1,-1|-1],[0,1|3],[0,-4|-12]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + 2L₁
    = L3 ← L3 + 4L2 : [[1,-1|-1],[0,1|3],[0,0|0]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + 4L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (2 ; 3)   ← b = 2v₁ + 3v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₃ ← L₃ + 2L₁ : la ligne 3 devient [0, □ | □]. | [[1,-1|-1],[0,1|3],[-2,-2|-10]] ; b = 2v₁ + 3v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; -2 ; 1), v₂ = (0 ; 1 ; 1) et b = (2 ; -6 ; 0). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [guided]  Matrice
    ? Comment ranger les données dans la matrice ? · Chaque vecteur en ligne, b en dernière ligne / ✔ Chaque vecteur en colonne, b en dernière colonne
    = [[1,0|2],[-2,1|-6],[1,1|0]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|2],[-2,1|-6],[1,1|0]]
    = L2 ← L2 + 2L1 : [[1,0|2],[0,1|-2],[1,1|0]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 - L1 : [[1,0|2],[0,1|-2],[0,1|-2]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,0|2],[0,1|-2],[0,0|0]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (2 ; -2)   ← b = 2v₁ − 2v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|2],[-2,1|-6],[1,1|0]] ; b = 2v₁ − 2v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

```

### Niveau 3

```
Soit v₁ = (1 ; 0 ; -1), v₂ = (-2 ; 1 ; 1) et b = (2 ; -2 ; 0). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,-2|2],[0,1|-2],[-1,1|0]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,-2|2],[0,1|-2],[-1,1|0]]
    = L3 ← L3 + L1 : [[1,-2|2],[0,1|-2],[0,-1|2]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 + L2 : [[1,-2|2],[0,1|-2],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; -2)   ← b = −2v₁ − 2v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₃ ← L₃ + L₁ : la ligne 3 devient [0, □ | □]. | [[1,-2|2],[0,1|-2],[-1,1|0]] ; b = −2v₁ − 2v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; -1 ; -1), v₂ = (0 ; 1 ; 0) et b = (-3 ; 6 ; 3). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,0|-3],[-1,1|6],[-1,0|3]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|-3],[-1,1|6],[-1,0|3]]
    = L2 ← L2 + L1 : [[1,0|-3],[0,1|3],[-1,0|3]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,0|-3],[0,1|3],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-3 ; 3)   ← b = −3v₁ + 3v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|-3],[-1,1|6],[-1,0|3]] ; b = −3v₁ + 3v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; -2 ; -1), v₂ = (0 ; 1 ; 0) et b = (-1 ; -1 ; 1). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,0|-1],[-2,1|-1],[-1,0|1]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|-1],[-2,1|-1],[-1,0|1]]
    = L2 ← L2 + 2L1 : [[1,0|-1],[0,1|-3],[-1,0|1]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 + L1 : [[1,0|-1],[0,1|-3],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; -3)   ← b = −v₁ − 3v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|-1],[-2,1|-1],[-1,0|1]] ; b = −v₁ − 3v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

```

### Niveau 4

```
Soit v₁ = (1 ; -1 ; -1), v₂ = (0 ; 1 ; 0) et b = (1 ; 2 ; -1). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, suivre l'erreur]  Matrice
    = [[1,0|1],[-1,1|2],[-1,0|-1]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|1],[-1,1|2],[-1,0|-1]]
    = L2 ← L2 + L1 : [[1,0|1],[0,1|3],[-1,0|-1]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,0|1],[0,1|3],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (1 ; 3)   ← b = v₁ + 3v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|1],[-1,1|2],[-1,0|-1]] ; b = v₁ + 3v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (-2 ; 1 ; 2), v₂ = (-1 ; 1 ; 0) et b = (5 ; -3 ; -4). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, suivre l'erreur]  Matrice
    = [[-2,-1|5],[1,1|-3],[2,0|-4]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[-2,-1|5],[1,1|-3],[2,0|-4]]
    = L2 ← L2 + (1/2)L1 : [[-2,-1|5],[0,1/2|-1/2],[2,0|-4]]   ← Annuler sous le pivot : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 + L1 : [[-2,-1|5],[0,1/2|-1/2],[0,-1|1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 + 2L2 : [[-2,-1|5],[0,1/2|-1/2],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + 2L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; -1)   ← b = −2v₁ − v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ + (1/2)L₁ : la ligne 2 devient [0, □ | □]. | [[-2,-1|5],[1,1|-3],[2,0|-4]] ; b = −2v₁ − v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; 1 ; -1), v₂ = (0 ; -1 ; 1) et b = (-1 ; 1 ; -1). b appartient-il à Span{v₁, v₂} ? Si oui, avec quels poids ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, suivre l'erreur]  Matrice
    = [[1,0|-1],[1,-1|1],[-1,1|-1]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0|-1],[1,-1|1],[-1,1|-1]]
    = L2 ← L2 - L1 : [[1,0|-1],[0,-1|2],[-1,1|-1]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,0|-1],[0,-1|2],[0,1|-2]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 + L2 : [[1,0|-1],[0,-1|2],[0,0|0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Lis les poids : b = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; -2)   ← b = −v₁ − 2v₂ : b est dans le Span
  aides : Mets les vecteurs en colonnes, et b en dernière colonne : b est dans le Span si et seulement si ce système est compatible. | L₂ ← L₂ − L₁ : la ligne 2 devient [0, □ | □]. | [[1,0|-1],[1,-1|1],[-1,1|-1]] ; b = −v₁ − 2v₂ : b est dans le Span.
  pièges : l_matrix_rows_cols

```

### Niveau 5

```
Soit p₁ = −1 + t², p₂ = 1 + t et q = h + t + 3t². Pour quelle valeur de h le polynôme q appartient-il à Span{p₁, p₂} ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, sans aide]  Matrice
    = [[-1,1|h],[0,1|1],[1,0|3]]   ← Les coefficients de chaque polynôme en colonnes, q après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[-1,1|h],[0,1|1],[1,0|3]]
    = L3 ← L3 + L1 : [[-1,1|h],[0,1|1],[0,1|h+3]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 - L2 : [[-1,1|h],[0,1|1],[0,0|h+2]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Pour quelle valeur de h le polynôme q est-il dans Span{p₁, p₂} ?  [juge value]  départ : h
    = −2   ← La ligne [0 0 | h+2] doit se lire 0 = 0
  pièges : l_matrix_rows_cols

Soit v₁ = (-2 ; -1 ; 1), v₂ = (1 ; 0 ; 0) et b = (-3 ; -3 ; h). Pour quelle valeur de h le vecteur b appartient-il à Span{v₁, v₂} ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, sans aide]  Matrice
    = [[-2,1|-3],[-1,0|-3],[1,0|h]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[-2,1|-3],[-1,0|-3],[1,0|h]]
    = L2 ← L2 - (1/2)L1 : [[-2,1|-3],[0,-1/2|-3/2],[1,0|h]]   ← Annuler sous le pivot : L₂ ← L₂ − (1/2)L₁
    = L3 ← L3 + (1/2)L1 : [[-2,1|-3],[0,-1/2|-3/2],[0,1/2|h-3/2]]   ← Annuler sous le pivot : L₃ ← L₃ + (1/2)L₁
    = L3 ← L3 + L2 : [[-2,1|-3],[0,-1/2|-3/2],[0,0|h-3]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Pour quelle valeur de h le vecteur b est-il dans Span{v₁, v₂} ?  [juge value]  départ : h
    = 3   ← La ligne [0 0 | h−3] doit se lire 0 = 0
  pièges : l_matrix_rows_cols

Soit v₁ = (1 ; 0 ; 1), v₂ = (2 ; 1 ; -2) et b = (3 ; 3 ; h). Pour quelle valeur de h le vecteur b appartient-il à Span{v₁, v₂} ? Écris la matrice du système, échelonne-la, puis conclus.
  [free, sans aide]  Matrice
    = [[1,2|3],[0,1|3],[1,-2|h]]   ← Les vecteurs en colonnes, b après la barre
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,2|3],[0,1|3],[1,-2|h]]
    = L3 ← L3 - L1 : [[1,2|3],[0,1|3],[0,-4|h-3]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 + 4L2 : [[1,2|3],[0,1|3],[0,0|h+9]]   ← Annuler sous le pivot : L₃ ← L₃ + 4L₂
  — Pour quelle valeur de h le vecteur b est-il dans Span{v₁, v₂} ?  [juge value]  départ : h
    = −9   ← La ligne [0 0 | h+9] doit se lire 0 = 0
  pièges : l_matrix_rows_cols

```

### Variantes d'examen

```
Soit p₁ = 1 + 2t + 2t², p₂ = 2t + t² et q = h − 6t − 4t². q appartient à Span{p₁, p₂} lorsque h =
  · 1   · −3   ✔ −1   · 0
  [examen mcq]

Vrai ou faux ?
  « Pour deux vecteurs u et v de ℝ³, Span{u, v} est toujours un plan. » → FAUX
    contre-exemple (vecFamily) : F = (1 ; 0 ; 0), (2 ; 0 ; 0)
  [examen tf]

```

## Indépendance linéaire (`l-vec-indep`, BA1)

_Libre ⇔ un pivot dans chaque colonne._

### Niveau 1

```
La famille v₁ = (1 ; 0 ; -2), v₂ = (2 ; 1 ; -1), v₃ = (0 ; 0 ; 1) est-elle libre ? Échelonne la matrice de ses vecteurs, puis conclus.
  [guided]  [[1,2,0],[0,1,0],[-2,-1,1]]
    = L3 ← L3 + 2L1 : [[1,2,0],[0,1,0],[0,3,1]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + 2L₁
    = L3 ← L3 - 3L2 : [[1,2,0],[0,1,0],[0,0,1]]   (cases à remplir : (3,1) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − 3L₂
  — Combien de pivots ?  [juge value]  départ : r
    (Un pivot dans chaque colonne : la famille est libre.)
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₃ ← L₃ + 2L₁ : la ligne 3 devient [0, □, □]. | Forme échelonnée [[1,2,0],[0,1,0],[0,0,1]] : trois pivots, la famille est libre.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

La famille v₁ = (1 ; 1 ; -1), v₂ = (1 ; 2 ; -1), v₃ = (0 ; -1 ; 1) est-elle libre ? Échelonne la matrice de ses vecteurs, puis conclus.
  [guided]  [[1,1,0],[1,2,-1],[-1,-1,1]]
    = L2 ← L2 - L1 : [[1,1,0],[0,1,-1],[-1,-1,1]]   (cases à remplir : (2,1) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,1,0],[0,1,-1],[0,0,1]]   (cases à remplir : (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + L₁
  — Combien de pivots ?  [juge value]  départ : r
    (Un pivot dans chaque colonne : la famille est libre.)
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ − L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[1,1,0],[0,1,-1],[0,0,1]] : trois pivots, la famille est libre.
  pièges : l_rowop_sign, l_rowop_wrong_row

La famille v₁ = (-2 ; 1 ; 0), v₂ = (0 ; 1 ; 1), v₃ = (-2 ; 3 ; 2) est-elle libre ? Échelonne la matrice de ses vecteurs, puis conclus.
  [guided]  [[-2,0,-2],[1,1,3],[0,1,2]]
    = L2 ← L2 + (1/2)L1 : [[-2,0,-2],[0,1,2],[0,1,2]]   (cases à remplir : (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 - L2 : [[-2,0,-2],[0,1,2],[0,0,0]]   (cases à remplir : (3,1) (3,2))   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Donne une relation c₁v₁ + c₂v₂ + c₃v₃ = 0, avec des cᵢ non tous nuls.  [juge span]  départ : c
    (La 3e colonne n'a pas de pivot : la famille est liée.)
    = (1 ; 2 ; -1)   ← v₁ + 2v₂ − v₃ = 0
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ + (1/2)L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[-2,0,-2],[0,1,2],[0,0,0]] : la 3e colonne n'a pas de pivot ; v₁ + 2v₂ − v₃ = 0.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
La famille p₁ = −2 + t − t², p₂ = t, p₃ = 2 + t + t² est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [guided]  Matrice
    ? Quelle méthode ? · Vérifier que les vecteurs sont deux à deux non colinéaires / ✔ Calculer le déterminant de cette matrice / ✔ Échelonner la matrice des vecteurs (en colonnes)
    = [[-2,0,2],[1,1,1],[-1,0,1]]   ← Les coefficients (1, t, t²…) en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[-2,0,2],[1,1,1],[-1,0,1]]
    = L2 ← L2 + (1/2)L1 : [[-2,0,2],[0,1,2],[-1,0,1]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 - (1/2)L1 : [[-2,0,2],[0,1,2],[0,0,0]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − (1/2)L₁
  — Donne une relation c₁p₁ + c₂p₂ + c₃p₃ = 0, avec des cᵢ non tous nuls.  [juge span]  départ : c
    ? La famille est-elle libre ? · Libre : un pivot dans chaque colonne / ✔ Liée : une colonne sans pivot
    = (1 ; -2 ; 1)   ← p₁ − 2p₂ + p₃ = 0
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ + (1/2)L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[-2,0,2],[0,1,2],[0,0,0]] : la 3e colonne n'a pas de pivot ; p₁ − 2p₂ + p₃ = 0.
  pièges : l_matrix_rows_cols

La famille v₁ = (1 ; 2 ; 2), v₂ = (1 ; 3 ; 2), v₃ = (0 ; 0 ; 1) est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [guided]  Matrice
    ? Quelle méthode ? ✔ Calculer le déterminant de cette matrice / · Vérifier que les vecteurs sont deux à deux non colinéaires / ✔ Échelonner la matrice des vecteurs (en colonnes)
    = [[1,1,0],[2,3,0],[2,2,1]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,1,0],[2,3,0],[2,2,1]]
    = L2 ← L2 - 2L1 : [[1,1,0],[0,1,0],[2,2,1]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ − 2L₁
    = L3 ← L3 - 2L1 : [[1,1,0],[0,1,0],[0,0,1]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
  — Combien de pivots ?  [juge value]  départ : r
    ? La famille est-elle libre ? ✔ Libre : un pivot dans chaque colonne / · Liée : une colonne sans pivot
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ − 2L₁ : la ligne 2 devient [0, □, 0]. | Forme échelonnée [[1,1,0],[0,1,0],[0,0,1]] : trois pivots, la famille est libre.
  pièges : l_matrix_rows_cols

La famille v₁ = (1 ; 0 ; 2), v₂ = (0 ; 1 ; 2), v₃ = (0 ; -1 ; -1) est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [guided]  Matrice
    ? Quelle méthode ? ✔ Calculer le déterminant de cette matrice / ✔ Échelonner la matrice des vecteurs (en colonnes) / · Vérifier que les vecteurs sont deux à deux non colinéaires
    = [[1,0,0],[0,1,-1],[2,2,-1]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0,0],[0,1,-1],[2,2,-1]]
    = L3 ← L3 - 2L1 : [[1,0,0],[0,1,-1],[0,2,-1]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
    = L3 ← L3 - 2L2 : [[1,0,0],[0,1,-1],[0,0,1]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Combien de pivots ?  [juge value]  départ : r
    ? La famille est-elle libre ? ✔ Libre : un pivot dans chaque colonne / · Liée : une colonne sans pivot
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₃ ← L₃ − 2L₁ : la ligne 3 devient [0, □, □]. | Forme échelonnée [[1,0,0],[0,1,-1],[0,0,1]] : trois pivots, la famille est libre.
  pièges : l_matrix_rows_cols

```

### Niveau 3

```
La famille v₁ = (1 ; 0 ; 2), v₂ = (0 ; 1 ; 2), v₃ = (1 ; 2 ; 6) est-elle libre ? Si elle est liée, donne une relation entre ses éléments. Choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,0,1],[0,1,2],[2,2,6]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0,1],[0,1,2],[2,2,6]]
    = L3 ← L3 - 2L1 : [[1,0,1],[0,1,2],[0,2,4]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
    = L3 ← L3 - 2L2 : [[1,0,1],[0,1,2],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Donne une relation c₁v₁ + c₂v₂ + c₃v₃ = 0, avec des cᵢ non tous nuls.  [juge span]  départ : c
    ? La famille est-elle libre ? · Libre : un pivot dans chaque colonne / ✔ Liée : une colonne sans pivot
    = (1 ; 2 ; -1)   ← v₁ + 2v₂ − v₃ = 0
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₃ ← L₃ − 2L₁ : la ligne 3 devient [0, □, □]. | Forme échelonnée [[1,0,1],[0,1,2],[0,0,0]] : la 3e colonne n'a pas de pivot ; v₁ + 2v₂ − v₃ = 0.
  pièges : l_matrix_rows_cols

La famille v₁ = (1 ; 0 ; -3), v₂ = (-2 ; 1 ; 2), v₃ = (0 ; 0 ; 1) est-elle libre ? Si elle est liée, donne une relation entre ses éléments. Choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,-2,0],[0,1,0],[-3,2,1]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,-2,0],[0,1,0],[-3,2,1]]
    = L3 ← L3 + 3L1 : [[1,-2,0],[0,1,0],[0,-4,1]]   ← Annuler sous le pivot : L₃ ← L₃ + 3L₁
    = L3 ← L3 + 4L2 : [[1,-2,0],[0,1,0],[0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + 4L₂
  — Combien de pivots ?  [juge value]  départ : r
    ? La famille est-elle libre ? ✔ Libre : un pivot dans chaque colonne / · Liée : une colonne sans pivot
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₃ ← L₃ + 3L₁ : la ligne 3 devient [0, □, □]. | Forme échelonnée [[1,-2,0],[0,1,0],[0,0,1]] : trois pivots, la famille est libre.
  pièges : l_matrix_rows_cols

La famille v₁ = (1 ; 1 ; 0), v₂ = (0 ; 2 ; 1), v₃ = (-1 ; -3 ; -1) est-elle libre ? Si elle est liée, donne une relation entre ses éléments. Choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Matrice
    = [[1,0,-1],[1,2,-3],[0,1,-1]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0,-1],[1,2,-3],[0,1,-1]]
    = L2 ← L2 - L1 : [[1,0,-1],[0,2,-2],[0,1,-1]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 - (1/2)L2 : [[1,0,-1],[0,2,-2],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − (1/2)L₂
  — Donne une relation c₁v₁ + c₂v₂ + c₃v₃ = 0, avec des cᵢ non tous nuls.  [juge span]  départ : c
    ? La famille est-elle libre ? · Libre : un pivot dans chaque colonne / ✔ Liée : une colonne sans pivot
    = (1 ; 1 ; 1)   ← v₁ + v₂ + v₃ = 0
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ − L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[1,0,-1],[0,2,-2],[0,0,0]] : la 3e colonne n'a pas de pivot ; v₁ + v₂ + v₃ = 0.
  pièges : l_matrix_rows_cols

```

### Niveau 4

```
La famille v₁ = (1 ; -2 ; -2), v₂ = (0 ; -1 ; -3), v₃ = (0 ; 1 ; 2) est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [free, suivre l'erreur]  Matrice
    = [[1,0,0],[-2,-1,1],[-2,-3,2]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[1,0,0],[-2,-1,1],[-2,-3,2]]
    = L2 ← L2 + 2L1 : [[1,0,0],[0,-1,1],[-2,-3,2]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 + 2L1 : [[1,0,0],[0,-1,1],[0,-3,2]]   ← Annuler sous le pivot : L₃ ← L₃ + 2L₁
    = L3 ← L3 - 3L2 : [[1,0,0],[0,-1,1],[0,0,-1]]   ← Annuler sous le pivot : L₃ ← L₃ − 3L₂
  — Combien de pivots ?  [juge value]  départ : r
    ? La famille est-elle libre ? ✔ Libre : un pivot dans chaque colonne / · Liée : une colonne sans pivot
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ + 2L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[1,0,0],[0,-1,1],[0,0,-1]] : trois pivots, la famille est libre.
  pièges : l_matrix_rows_cols

La famille v₁ = (-1 ; 1 ; 1), v₂ = (1 ; 0 ; 0), v₃ = (0 ; 1 ; 0) est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [free, suivre l'erreur]  Matrice
    = [[-1,1,0],[1,0,1],[1,0,0]]   ← Les vecteurs en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[-1,1,0],[1,0,1],[1,0,0]]
    = L2 ← L2 + L1 : [[-1,1,0],[0,1,1],[1,0,0]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[-1,1,0],[0,1,1],[0,1,0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 - L2 : [[-1,1,0],[0,1,1],[0,0,-1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Combien de pivots ?  [juge value]  départ : r
    ? La famille est-elle libre ? ✔ Libre : un pivot dans chaque colonne / · Liée : une colonne sans pivot
    = 3   ← Un pivot dans chaque colonne : libre
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₂ ← L₂ + L₁ : la ligne 2 devient [0, □, □]. | Forme échelonnée [[-1,1,0],[0,1,1],[0,0,-1]] : trois pivots, la famille est libre.
  pièges : l_matrix_rows_cols

La famille p₁ = −1 − t², p₂ = t − t³, p₃ = 2 + t + 2t² − t³ est-elle libre ? Si elle est liée, donne une relation entre ses éléments.
  [free, suivre l'erreur]  Matrice
    = [[-1,0,2],[0,1,1],[-1,0,2],[0,-1,-1]]   ← Les coefficients (1, t, t²…) en colonnes
  — Échelonne cette matrice.  [juge rowops]  départ : [[-1,0,2],[0,1,1],[-1,0,2],[0,-1,-1]]
    = L3 ← L3 - L1 : [[-1,0,2],[0,1,1],[0,0,0],[0,-1,-1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L4 ← L4 + L2 : [[-1,0,2],[0,1,1],[0,0,0],[0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ + L₂
  — Donne une relation c₁p₁ + c₂p₂ + c₃p₃ = 0, avec des cᵢ non tous nuls.  [juge span]  départ : c
    ? La famille est-elle libre ? · Libre : un pivot dans chaque colonne / ✔ Liée : une colonne sans pivot
    = (2 ; -1 ; 1)   ← 2p₁ − p₂ + p₃ = 0
  aides : Libre ⇔ un pivot dans chaque colonne de la matrice des vecteurs (en colonnes). | L₃ ← L₃ − L₁ : la ligne 3 devient [0, 0, 0]. | Forme échelonnée [[-1,0,2],[0,1,1],[0,0,0],[0,0,0]] : la 3e colonne n'a pas de pivot ; 2p₁ − p₂ + p₃ = 0.
  pièges : l_matrix_rows_cols

```

### Niveau 5

```
Pour quelles valeurs du paramètre a la famille v₁ = (1 ; 2 ; a+1), v₂ = (2 ; a+7 ; 3a+5), v₃ = (0 ; -3 ; -a) est-elle liée ?
  [free, sans aide]  Matrice
    = [[1,2,0],[2,a+7,-3],[a+1,3a+5,-a]]   ← Les vecteurs en colonnes
  — Échelonne sans diviser par une expression de a.  [juge rowops]  départ : [[1,2,0],[2,a+7,-3],[a+1,3a+5,-a]]
    = L2 ← L2 - 2L1 : [[1,2,0],[0,a+3,-3],[a+1,3a+5,-a]]   ← Échelonner sans diviser : L₂ ← L₂ − 2L₁
    = L3 ← L3 - (a+1)L1 : [[1,2,0],[0,a+3,-3],[0,a+3,-a]]   ← Échelonner sans diviser : L₃ ← L₃ − (a+1)L₁
    = L3 ← L3 - L2 : [[1,2,0],[0,a+3,-3],[0,0,3-a]]   ← Échelonner sans diviser : L₃ ← L₃ − L₂
  — Pour quelles valeurs de a la famille est-elle liée ?  [juge solset]  départ : S
    = a = −3 ou a = 3   ← Les pivots a + 3 et 3 − a s'annulent
  pièges : l_matrix_rows_cols

Pour quelles valeurs du paramètre a la famille v₁ = (1 ; -1 ; a+1), v₂ = (1 ; -a-1 ; 3a+1), v₃ = (0 ; -2 ; a+5) est-elle liée ?
  [free, sans aide]  Matrice
    = [[1,1,0],[-1,-a-1,-2],[a+1,3a+1,a+5]]   ← Les vecteurs en colonnes
  — Échelonne sans diviser par une expression de a.  [juge rowops]  départ : [[1,1,0],[-1,-a-1,-2],[a+1,3a+1,a+5]]
    = L2 ← L2 + L1 : [[1,1,0],[0,-a,-2],[a+1,3a+1,a+5]]   ← Échelonner sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 - (a+1)L1 : [[1,1,0],[0,-a,-2],[0,2a,a+5]]   ← Échelonner sans diviser : L₃ ← L₃ − (a+1)L₁
    = L3 ← L3 + 2L2 : [[1,1,0],[0,-a,-2],[0,0,a+1]]   ← Échelonner sans diviser : L₃ ← L₃ + 2L₂
  — Pour quelles valeurs de a la famille est-elle liée ?  [juge solset]  départ : S
    = a = −1 ou a = 0   ← Les pivots −a et a + 1 s'annulent
  pièges : l_matrix_rows_cols

Pour quelles valeurs du paramètre a la famille v₁ = (1 ; -1 ; a), v₂ = (2 ; -a-4 ; -4), v₃ = (-1 ; 1 ; -2) est-elle liée ?
  [free, sans aide]  Matrice
    = [[1,2,-1],[-1,-a-4,1],[a,-4,-2]]   ← Les vecteurs en colonnes
  — Échelonne sans diviser par une expression de a.  [juge rowops]  départ : [[1,2,-1],[-1,-a-4,1],[a,-4,-2]]
    = L2 ← L2 + L1 : [[1,2,-1],[0,-a-2,0],[a,-4,-2]]   ← Échelonner sans diviser : L₂ ← L₂ + L₁
    = L3 ← L3 - aL1 : [[1,2,-1],[0,-a-2,0],[0,-2a-4,a-2]]   ← Échelonner sans diviser : L₃ ← L₃ − aL₁
    = L3 ← L3 - 2L2 : [[1,2,-1],[0,-a-2,0],[0,0,a-2]]   ← Échelonner sans diviser : L₃ ← L₃ − 2L₂
  — Pour quelles valeurs de a la famille est-elle liée ?  [juge solset]  départ : S
    = a = −2 ou a = 2   ← Les pivots −a − 2 et a − 2 s'annulent
  pièges : l_matrix_rows_cols

```

### Variantes d'examen

```
Les vecteurs v₁ = (1 ; 0 ; -a-1), v₂ = (-2 ; 3-a ; 4a-4), v₃ = (2 ; -2 ; -a) sont linéairement dépendants si et seulement si
  · a ∈ {2} [l_param_divide_zero]   · a ∈ {−3 ; −2}   · a ∈ {3}   ✔ a ∈ {2 ; 3}
  [examen mcq]
  pièges : l_param_divide_zero

Vrai ou faux ?
  « Si v₁, …, v_k sont linéairement indépendants et α₁, …, α_k sont des réels, alors α₁v₁, …, α_kv_k sont linéairement indépendants. » → FAUX
    contre-exemple (vecFamily) : F = (1 ; 0), (0 ; 1), alpha = 0 ; 1
  [examen tf]
  pièges : l_indep_scaled

```

## Existence et unicité lues sur les pivots (`l-sys-pivots-theory`, BA1)

_Pivot par ligne : pour tout b. Pivot par colonne : unique._

### Niveau 1

```
A est de taille 4 × 2, et [[1,-2],[0,0],[0,0],[0,0]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne. Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   · Ax = b a une solution pour tout b, mais pas unique : une infinité.   · Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique.   ✔ Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.

A est de taille 2 × 4, et [[2,0,-1,3],[0,0,2,1]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne. Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   ✔ Ax = b a une solution pour tout b, mais pas unique : une infinité.   · Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique. [l_inj_rows]   · Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.
  pièges : l_inj_rows

A est de taille 4 × 2, et [[2,-2],[0,2],[0,0],[0,0]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne. Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   · Ax = b a une solution pour tout b, mais pas unique : une infinité. [l_inj_rows]   ✔ Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique.   · Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.
  pièges : l_inj_rows

```

### Niveau 2

```
A est de taille 3 × 4 et de rang 3 (3 pivots). Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   ✔ Ax = b a une solution pour tout b, mais pas unique : une infinité.   · Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique. [l_inj_rows]   · Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.
  pièges : l_inj_rows

A est de taille 4 × 2 et de rang 2 (2 pivots). Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   · Ax = b a une solution pour tout b, mais pas unique : une infinité. [l_inj_rows]   ✔ Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique.   · Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.
  pièges : l_inj_rows

A est de taille 2 × 4 et de rang 1 (1 pivot). Que peut-on dire de l'équation Ax = b ?
  · Ax = b a une solution pour tout b, et elle est unique.   · Ax = b a une solution pour tout b, mais pas unique : une infinité.   · Ax = b n'a pas de solution pour certains b ; quand il en a une, elle est unique.   ✔ Ax = b n'a pas de solution pour certains b ; quand il en a, il en a une infinité.

```

### Niveau 3

```
Vrai ou faux, et pourquoi ? « Si A a plus de lignes que de colonnes, Ax = b a au plus une solution. »
  · Vrai : tout dépend des pivots dans les colonnes.   · Vrai : tout dépend des pivots dans les lignes.   · Faux : les tailles suffisent à conclure.   ✔ Faux : tout dépend des pivots dans les colonnes.

Vrai ou faux, et pourquoi ? « Soit A de taille 3 × 5. Alors Ax = 0 a une infinité de solutions. »
  ✔ Vrai : les tailles suffisent à conclure.   · Faux : tout dépend des pivots dans les colonnes.   · Faux : les tailles suffisent à conclure.   · Vrai : tout dépend des pivots dans les lignes.

Vrai ou faux, et pourquoi ? « Si A a plus de lignes que de colonnes, Ax = b a au plus une solution. »
  · Faux : tout dépend des pivots dans les lignes. [l_inj_rows]   · Vrai : les tailles suffisent à conclure.   · Vrai : tout dépend des pivots dans les colonnes.   ✔ Faux : tout dépend des pivots dans les colonnes.
  pièges : l_inj_rows

```

### Niveau 4

```
Vrai ou faux ?
  « Si Ax = 0 n'a que la solution triviale, alors Ax = b a une solution pour tout b. » → FAUX
    contre-exemple (matOne) : A = [[1,0],[0,1],[0,0]]
  aides : Existence pour tout b : un pivot dans chaque ligne. Unicité : un pivot dans chaque colonne. Il y a au plus min(m, n) pivots. | Combien de pivots au plus ? □ ; combien de lignes ? □ ; de colonnes ? □. Si c'est faux, cherche une petite matrice qui le montre. | Faux : Un pivot dans chaque colonne ne donne pas un pivot dans chaque ligne : A = [[1, 0], [0, 1], [0, 0]] et b = (0 ; 0 ; 1).
  pièges : l_inj_rows

Donne une matrice A de taille 3 × 2 telle que Ax = 0 n'ait que la solution triviale, mais que Ax = b n'ait pas de solution pour un certain b.
  [exemple matOne pivots] → A = [[1,0],[0,1],[1,1]]

Donne une matrice A de taille 3 × 2 telle que Ax = 0 n'ait que la solution triviale, mais que Ax = b n'ait pas de solution pour un certain b.
  [exemple matOne pivots] → A = [[1,0],[0,1],[1,1]]

```

### Niveau 5

```
Vrai ou faux ?
  « Si les colonnes de A engendrent ℝᵐ, alors Ax = 0 n'a que la solution triviale. » → FAUX
    contre-exemple (matOne) : A = [[1,0,0],[0,1,0]]
  pièges : l_inj_rows

Vrai ou faux ?
  « Si les colonnes de A engendrent ℝᵐ, alors Ax = 0 n'a que la solution triviale. » → FAUX
    contre-exemple (matOne) : A = [[1,0,0],[0,1,0]]
  pièges : l_inj_rows

Vrai ou faux ?
  « Si Ax = b a une solution unique pour tout b, alors A est carrée. » → VRAI

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si Ax = 0 n'a que la solution triviale, alors Ax = b a une solution pour tout b. » → FAUX
    contre-exemple (matOne) : A = [[1,0],[0,1],[0,0]]
  [examen tf]
  pièges : l_inj_rows

A est une matrice de taille 3 × 5. La plus petite valeur possible de dim Ker A (le nombre de variables libres de Ax = 0) est :
  · 5 [l_rank_dim_confusion]   ✔ 2   · 0 [l_rank_dim_confusion]   · 3 [l_rank_dim_confusion]
  [examen mcq]
  pièges : l_rank_dim_confusion

```

## Matrice canonique à partir d'images données (`l-map-std-matrix`, BA1)

_Les colonnes sont T(e₁), …, T(eₙ)._

### Niveau 1

```
T : ℝ³ → ℝ³ est linéaire, avec T(e₁ + e₃) = (2 ; 10 ; -1), T(e₃) = (-3 ; 4 ; 1), T(3e₂) = (12 ; 18 ; -3). Trouve T(e₂) et T(e₁), puis la matrice canonique de T.
  [guided]  T(e_2)
    = T(e_2) = (4 ; 6 ; -1)   (cases à remplir : (2,1) (3,1))   ← Linéarité : T(e₂) = ⅓·T(3e₂)
  — Trouve T(e₁).  [juge mat]  départ : T(e_1)
    = T(e_1) = (5 ; 6 ; -2)   (cases à remplir : (1,1) (2,1))   ← Linéarité : T(e₁) = T(e₁ + e₃) − T(e₃)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[5,4,-3],[6,6,4],[-2,-1,1]]   (cases à remplir : (1,1) (1,2) (2,1))   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₂) = ⅓·T(3e₂) = □ | A = [[5,4,-3],[6,6,4],[-2,-1,1]]

T : ℝ³ → ℝ³ est linéaire, avec T(e₃) = (4 ; 0 ; 4), T(e₁ + e₂) = (5 ; -8 ; -8), T(2e₁) = (4 ; -6 ; -12). Trouve T(e₁) et T(e₂), puis la matrice canonique de T.
  [guided]  T(e_1)
    = T(e_1) = (2 ; -3 ; -6)   (cases à remplir : (2,1) (3,1))   ← Linéarité : T(e₁) = ½·T(2e₁)
  — Trouve T(e₂).  [juge mat]  départ : T(e_2)
    = T(e_2) = (3 ; -5 ; -2)   (cases à remplir : (1,1) (2,1))   ← Linéarité : T(e₂) = T(e₁ + e₂) − T(e₁)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[2,3,4],[-3,-5,0],[-6,-2,4]]   (cases à remplir : (1,2) (3,1) (3,2))   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₁) = ½·T(2e₁) = □ | A = [[2,3,4],[-3,-5,0],[-6,-2,4]]

T : ℝ³ → ℝ³ est linéaire, avec T(2e₃) = (2 ; 10 ; 2), T(e₁ + e₃) = (6 ; -1 ; -5), T(e₂) = (3 ; -5 ; -6). Trouve T(e₃) et T(e₁), puis la matrice canonique de T.
  [guided]  T(e_3)
    = T(e_3) = (1 ; 5 ; 1)   (cases à remplir : (2,1) (3,1))   ← Linéarité : T(e₃) = ½·T(2e₃)
  — Trouve T(e₁).  [juge mat]  départ : T(e_1)
    = T(e_1) = (5 ; -6 ; -6)   (cases à remplir : (1,1) (3,1))   ← Linéarité : T(e₁) = T(e₁ + e₃) − T(e₃)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[5,3,1],[-6,-5,5],[-6,-6,1]]   (cases à remplir : (1,1) (2,1) (2,3))   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₃) = ½·T(2e₃) = □ | A = [[5,3,1],[-6,-5,5],[-6,-6,1]]

```

### Niveau 2

```
T : ℝ³ → ℝ³ est linéaire, avec T(e₁ + e₃) = (-5 ; -8 ; -2), T(e₃) = (-1 ; -2 ; -4), T(3e₂) = (-9 ; 18 ; 0). Trouve T(e₂) et T(e₁), puis la matrice canonique de T.
  [guided]  T(e_2)
    = T(e_2) = (-3 ; 6 ; 0)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₂) = ⅓·T(3e₂)
  — Trouve T(e₁).  [juge mat]  départ : T(e_1)
    = T(e_1) = (-4 ; -6 ; 2)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₁) = T(e₁ + e₃) − T(e₃)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    ? Comment ranger les images dans la matrice ? · T(e₁), T(e₂), T(e₃) en lignes / ✔ T(e₁), T(e₂), T(e₃) en colonnes
    = [[-4,-3,-1],[-6,6,-2],[2,0,-4]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₂) = ⅓·T(3e₂) = □ | A = [[-4,-3,-1],[-6,6,-2],[2,0,-4]]
  pièges : l_matrix_rows_cols

T : ℝ³ → ℝ³ est linéaire, avec T(e₃) = (4 ; 3 ; -2), T(e₁ + e₂) = (5 ; -4 ; 3), T(2e₁) = (6 ; -6 ; -4). Trouve T(e₁) et T(e₂), puis la matrice canonique de T.
  [guided]  T(e_1)
    = T(e_1) = (3 ; -3 ; -2)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₁) = ½·T(2e₁)
  — Trouve T(e₂).  [juge mat]  départ : T(e_2)
    = T(e_2) = (2 ; -1 ; 5)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₂) = T(e₁ + e₂) − T(e₁)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    ? Comment ranger les images dans la matrice ? ✔ T(e₁), T(e₂), T(e₃) en colonnes / · T(e₁), T(e₂), T(e₃) en lignes
    = [[3,2,4],[-3,-1,3],[-2,5,-2]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₁) = ½·T(2e₁) = □ | A = [[3,2,4],[-3,-1,3],[-2,5,-2]]
  pièges : l_matrix_rows_cols

T : ℝ³ → ℝ³ est linéaire, avec T(e₁) = (-2 ; 2 ; -5), T(2e₂) = (10 ; 8 ; 4), T(e₂ + e₃) = (1 ; -1 ; 5). Trouve T(e₂) et T(e₃), puis la matrice canonique de T.
  [guided]  T(e_2)
    = T(e_2) = (5 ; 4 ; 2)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₂) = ½·T(2e₂)
  — Trouve T(e₃).  [juge mat]  départ : T(e_3)
    = T(e_3) = (-4 ; -5 ; 3)   (cases à remplir : (1,1) (2,1) (3,1))   ← Linéarité : T(e₃) = T(e₂ + e₃) − T(e₂)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    ? Comment ranger les images dans la matrice ? · T(e₁), T(e₂), T(e₃) en lignes / ✔ T(e₁), T(e₂), T(e₃) en colonnes
    = [[-2,5,-4],[2,4,-5],[-5,2,3]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₂) = ½·T(2e₂) = □ | A = [[-2,5,-4],[2,4,-5],[-5,2,3]]
  pièges : l_matrix_rows_cols

```

### Niveau 3

```
T : ℝ³ → ℝ³ est linéaire, avec T(e₁ + e₃) = (4 ; -8 ; -4), T(2e₃) = (12 ; -6 ; 2), T(e₂) = (3 ; 5 ; -3). Trouve T(e₃) et T(e₁), puis la matrice canonique de T. Choisis à chaque fois la bonne règle.
  [tap, suivre l'erreur, menu menu]  T(e_3)
    = T(e_3) = (6 ; -3 ; 1)   ← Linéarité : T(e₃) = ½·T(2e₃)
  — Trouve T(e₁).  [juge mat]  départ : T(e_1)
    = T(e_1) = (-2 ; -5 ; -5)   ← Linéarité : T(e₁) = T(e₁ + e₃) − T(e₃)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[-2,3,6],[-5,5,-3],[-5,-3,1]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₃) = ½·T(2e₃) = □ | A = [[-2,3,6],[-5,5,-3],[-5,-3,1]]

T : ℝ³ → ℝ³ est linéaire, avec T(e₁ + e₃) = (10 ; -10 ; 7), T(2e₁) = (8 ; -10 ; 4), T(e₂) = (-2 ; -3 ; -4). Trouve T(e₁) et T(e₃), puis la matrice canonique de T. Choisis à chaque fois la bonne règle.
  [tap, suivre l'erreur, menu menu]  T(e_1)
    = T(e_1) = (4 ; -5 ; 2)   ← Linéarité : T(e₁) = ½·T(2e₁)
  — Trouve T(e₃).  [juge mat]  départ : T(e_3)
    = T(e_3) = (6 ; -5 ; 5)   ← Linéarité : T(e₃) = T(e₁ + e₃) − T(e₁)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[4,-2,6],[-5,-3,-5],[2,-4,5]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₁) = ½·T(2e₁) = □ | A = [[4,-2,6],[-5,-3,-5],[2,-4,5]]

T : ℝ³ → ℝ³ est linéaire, avec T(e₃) = (6 ; 2 ; 5), T(2e₂) = (-12 ; 4 ; -6), T(e₁ + e₂) = (-8 ; -1 ; -5). Trouve T(e₂) et T(e₁), puis la matrice canonique de T. Choisis à chaque fois la bonne règle.
  [tap, suivre l'erreur, menu menu]  T(e_2)
    = T(e_2) = (-6 ; 2 ; -3)   ← Linéarité : T(e₂) = ½·T(2e₂)
  — Trouve T(e₁).  [juge mat]  départ : T(e_1)
    = T(e_1) = (-2 ; -3 ; -2)   ← Linéarité : T(e₁) = T(e₁ + e₂) − T(e₂)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[-2,-6,6],[-3,2,2],[-2,-3,5]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₂) = ½·T(2e₂) = □ | A = [[-2,-6,6],[-3,2,2],[-2,-3,5]]

```

### Niveau 4

```
T : ℝ³ → ℝ³ est linéaire, avec T(e₁) = (1 ; 3 ; 6), T(e₁ − e₂) = (6 ; 7 ; 9), T(2e₁ + e₃) = (5 ; 11 ; 10). Trouve T(e₂) et T(e₃), puis la matrice canonique de T.
  [free, suivre l'erreur]  T(e_2)
    = T(e_2) = (-5 ; -4 ; -3)   ← Linéarité : T(e₂) = −(T(e₁ − e₂) − T(e₁))
  — Trouve T(e₃).  [juge mat]  départ : T(e_3)
    = T(e_3) = (3 ; 5 ; -2)   ← Linéarité : T(e₃) = T(2e₁ + e₃) − 2T(e₁)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[1,-5,3],[3,-4,5],[6,-3,-2]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₂) = −(T(e₁ − e₂) − T(e₁)) = □ | A = [[1,-5,3],[3,-4,5],[6,-3,-2]]

T : ℝ³ → ℝ³ est linéaire, avec T(e₃) = (1 ; -2 ; 1), T(e₁ − e₃) = (-3 ; 2 ; 4), T(3e₂) = (0 ; 9 ; 3). Trouve T(e₁) et T(e₂), puis la matrice canonique de T.
  [free, suivre l'erreur]  T(e_1)
    = T(e_1) = (-2 ; 0 ; 5)   ← Linéarité : T(e₁) = T(e₁ − e₃) + T(e₃)
  — Trouve T(e₂).  [juge mat]  départ : T(e_2)
    = T(e_2) = (0 ; 3 ; 1)   ← Linéarité : T(e₂) = ⅓·T(3e₂)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[-2,0,1],[0,3,-2],[5,1,1]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₁) = T(e₁ − e₃) + T(e₃) = □ | A = [[-2,0,1],[0,3,-2],[5,1,1]]

T : ℝ³ → ℝ³ est linéaire, avec T(e₃) = (5 ; -6 ; 5), T(e₁ + e₂ + e₃) = (1 ; 1 ; 1), T(e₁ + e₃) = (2 ; -2 ; 3). Trouve T(e₁) et T(e₂), puis la matrice canonique de T.
  [free, suivre l'erreur]  T(e_1)
    = T(e_1) = (-3 ; 4 ; -2)   ← Linéarité : T(e₁) = T(e₁ + e₃) − T(e₃)
  — Trouve T(e₂).  [juge mat]  départ : T(e_2)
    = T(e_2) = (-1 ; 3 ; -2)   ← Linéarité : T(e₂) = T(e₁ + e₂ + e₃) − T(e₁) − T(e₃)
  — Écris la matrice canonique de T.  [juge mat]  départ : A
    = [[-3,-1,5],[4,3,-6],[-2,-2,5]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  aides : Retrouve d'abord chaque T(eⱼ) par linéarité (T(cu) = cT(u), T(u + v) = T(u) + T(v)), puis mets les images en colonnes. | T(e₁) = T(e₁ + e₃) − T(e₃) = □ | A = [[-3,-1,5],[4,3,-6],[-2,-2,5]]

```

### Niveau 5

```
Soit T : ℝ³ → ℝ³ définie par T(x₁, x₂, x₃) = (-3x_1+4x_2-x_3 ; -4x_1+4x_2 ; -3x_1-x_2-4x_3). Est-elle linéaire ? Donne sa matrice canonique.
  [free, sans aide]  A
    ? T est-elle linéaire ? ✔ Oui : chaque composante est une combinaison des xᵢ, sans constante / · Non : on ne peut pas savoir sans tester T(u + v)
    = [[-3,4,-1],[-4,4,0],[-3,-1,-4]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  pièges : l_matrix_rows_cols, l_map_scaled_image

Soit T : ℝ³ → ℝ³ définie par T(x₁, x₂, x₃) = (-3x_1+4x_3 ; -4x_1+2x_2-4x_3 ; 3x_2-4x_3). Est-elle linéaire ? Donne sa matrice canonique.
  [free, sans aide]  A
    ? T est-elle linéaire ? ✔ Oui : chaque composante est une combinaison des xᵢ, sans constante / · Non : on ne peut pas savoir sans tester T(u + v)
    = [[-3,0,4],[-4,2,-4],[0,3,-4]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  pièges : l_matrix_rows_cols, l_map_scaled_image

Soit T : ℝ³ → ℝ³ définie par T(x₁, x₂, x₃) = (-3x_1+4x_2+x_3 ; -3x_2+6x_3 ; 4x_1+x_2-5x_3). Est-elle linéaire ? Donne sa matrice canonique.
  [free, sans aide]  A
    ? T est-elle linéaire ? ✔ Oui : chaque composante est une combinaison des xᵢ, sans constante / · Non : on ne peut pas savoir sans tester T(u + v)
    = [[-3,4,1],[0,-3,6],[4,1,-5]]   ← Les images T(e₁), T(e₂), T(e₃) en colonnes
  pièges : l_matrix_rows_cols, l_map_scaled_image

```

### Variantes d'examen

```
T : ℝ³ → ℝ³ est linéaire, avec T(2e₁) = (4 ; 0 ; -2), T(e₂) = (-5 ; -1 ; -6), T(e₁ + e₃) = (8 ; 5 ; -5). Sa matrice canonique est :
  · [[4,-5,8],[0,-1,5],[-2,-6,-5]] [l_map_scaled_image]   ✔ [[2,-5,6],[0,-1,5],[-1,-6,-4]]   · [[4,0,-2],[-5,-1,-6],[8,5,-5]] [l_matrix_rows_cols]   · [[2,0,-1],[-5,-1,-6],[6,5,-4]] [l_matrix_rows_cols]
  [examen mcq]
  pièges : l_map_scaled_image, l_matrix_rows_cols

T : ℝ³ → ℝ³ est linéaire, avec T(e₁ + e₂) = (-1 ; 5 ; -10), T(e₁ + e₂ + e₃) = (5 ; 10 ; -5), T(e₁) = (4 ; 6 ; -4). Soit A la matrice canonique de T. Que vaut a₁₂ ?
  [free, sans aide, examen coef]  a_12
    = −5
  pièges : l_map_scaled_image, l_matrix_rows_cols

Vrai ou faux ?
  « L'application T : ℝ² → ℝ² définie par T(x₁, x₂) = (x₁x₂ ; x₁) est linéaire. » → FAUX
    contre-exemple (vecFamily) : u = (1 ; 1), c = 2
  [examen tf]

```

## Injective ou surjective, lu sur les pivots (`l-map-inj-surj`, BA1)

_Injective : pivot par colonne. Surjective : pivot par ligne._

### Niveau 1

```
T : ℝ⁴ → ℝ⁴, T(x) = Ax, et [[1,0,1,0],[0,1,1,0],[0,0,1,0],[0,0,0,1]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne : T est-elle injective ? surjective ?
  [guided]  r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 4. | Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.

T : ℝ⁴ → ℝ⁴, T(x) = Ax, et [[1,-1,0,0],[0,1,0,-1],[0,0,1,2],[0,0,0,1]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne : T est-elle injective ? surjective ?
  [guided]  r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 4. | Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.

T : ℝ³ → ℝ⁴, T(x) = Ax, et [[1,0,0],[0,1,0],[0,0,1],[0,0,0]] est une forme échelonnée de A. Compte les pivots par ligne et par colonne : T est-elle injective ? surjective ?
  [guided]  r
    ? T est-elle injective ? surjective ? · Injective et surjective / ✔ Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 3 ; lignes : 4. | Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_inj_rows

```

### Niveau 2

```
Soit T : ℝ³ → ℝ⁴, T(x) = Ax avec A = [[1,1,0],[0,1,0],[0,0,1],[1,0,0]]. T est-elle injective ? surjective ?
  [guided]  [[1,1,0],[0,1,0],[0,0,1],[1,0,0]]
    = L4 ← L4 - L1 : [[1,1,0],[0,1,0],[0,0,1],[0,-1,0]]   (cases à remplir : (4,1) (4,3))   ← Annuler sous le pivot : L₄ ← L₄ − L₁
    = L4 ← L4 + L2 : [[1,1,0],[0,1,0],[0,0,1],[0,0,0]]   (cases à remplir : (4,1) (4,2))   ← Annuler sous le pivot : L₄ ← L₄ + L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / ✔ Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 3 ; lignes : 4. | Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_rowop_sign, l_rowop_wrong_row, l_inj_rows

Soit T : ℝ⁴ → ℝ³, T(x) = Ax avec A = [[1,-2,1,-6],[0,1,0,2],[1,0,0,1]]. T est-elle injective ? surjective ?
  [guided]  [[1,-2,1,-6],[0,1,0,2],[1,0,0,1]]
    = L3 ← L3 - L1 : [[1,-2,1,-6],[0,1,0,2],[0,2,-1,7]]   (cases à remplir : (3,1) (3,2))   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - 2L2 : [[1,-2,1,-6],[0,1,0,2],[0,0,-1,3]]   (cases à remplir : (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / · Injective, pas surjective / ✔ Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : 1 colonne sans pivot, pas injective ; un pivot dans chacune des 3 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 3. | Rang 3 : 1 colonne sans pivot, pas injective ; un pivot dans chacune des 3 lignes, surjective.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_inj_rows

Soit T : ℝ⁴ → ℝ³, T(x) = Ax avec A = [[1,-1,0,0],[-2,2,1,0],[2,-2,-1,1]]. T est-elle injective ? surjective ?
  [guided]  [[1,-1,0,0],[-2,2,1,0],[2,-2,-1,1]]
    = L2 ← L2 + 2L1 : [[1,-1,0,0],[0,0,1,0],[2,-2,-1,1]]   (cases à remplir : (2,1) (2,3))   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L3 ← L3 - 2L1 : [[1,-1,0,0],[0,0,1,0],[0,0,-1,1]]   (cases à remplir : (3,2) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − 2L₁
    = L3 ← L3 + L2 : [[1,-1,0,0],[0,0,1,0],[0,0,0,1]]   (cases à remplir : (3,2) (3,3))   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / · Injective, pas surjective / ✔ Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : 1 colonne sans pivot, pas injective ; un pivot dans chacune des 3 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 3. | Rang 3 : 1 colonne sans pivot, pas injective ; un pivot dans chacune des 3 lignes, surjective.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_inj_rows

```

### Niveau 3

```
Soit T : ℝ³ → ℝ³, T(x) = Ax avec A = [[1,0,-2],[-1,1,-1],[0,-1,3]]. T est-elle injective ? surjective ? Commence par regarder les tailles, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,0,-2],[-1,1,-1],[0,-1,3]]
    ? Avant de calculer : les tailles suffisent-elles à conclure ? · Oui : 3 colonnes et au plus 3 pivots, donc pas injective / · Oui : 3 lignes et au plus 3 pivots, donc pas surjective / ✔ Il faut calculer le rang
    = L2 ← L2 + L1 : [[1,0,-2],[0,1,-3],[0,-1,3]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L2 : [[1,0,-2],[0,1,-3],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / ✔ Ni injective, ni surjective
    = 2   ← Rang 2 : 1 colonne sans pivot, pas injective ; 1 ligne sans pivot, pas surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 3 ; lignes : 3. | Rang 2 : 1 colonne sans pivot, pas injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_rowop_sign, l_rowop_wrong_row

Soit T : ℝ⁴ → ℝ⁴, T(x) = Ax avec A = [[1,0,0,0],[0,1,0,0],[-1,1,1,1],[-2,0,0,1]]. T est-elle injective ? surjective ? Commence par regarder les tailles, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,0,0,0],[0,1,0,0],[-1,1,1,1],[-2,0,0,1]]
    ? Avant de calculer : les tailles suffisent-elles à conclure ? · Oui : 4 colonnes et au plus 4 pivots, donc pas injective / · Oui : 4 lignes et au plus 4 pivots, donc pas surjective / ✔ Il faut calculer le rang
    = L3 ← L3 + L1 : [[1,0,0,0],[0,1,0,0],[0,1,1,1],[-2,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L4 ← L4 + 2L1 : [[1,0,0,0],[0,1,0,0],[0,1,1,1],[0,0,0,1]]   ← Annuler sous le pivot : L₄ ← L₄ + 2L₁
    = L3 ← L3 - L2 : [[1,0,0,0],[0,1,0,0],[0,0,1,1],[0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 4. | Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit T : ℝ⁴ → ℝ⁴, T(x) = Ax avec A = [[1,0,0,0],[0,1,0,0],[1,2,1,2],[0,0,0,1]]. T est-elle injective ? surjective ? Commence par regarder les tailles, puis choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,0,0,0],[0,1,0,0],[1,2,1,2],[0,0,0,1]]
    ? Avant de calculer : les tailles suffisent-elles à conclure ? · Oui : 4 colonnes et au plus 4 pivots, donc pas injective / · Oui : 4 lignes et au plus 4 pivots, donc pas surjective / ✔ Il faut calculer le rang
    = L3 ← L3 - L1 : [[1,0,0,0],[0,1,0,0],[0,2,1,2],[0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - 2L2 : [[1,0,0,0],[0,1,0,0],[0,0,1,2],[0,0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 4. | Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Soit T : ℝ³ → ℝ³ définie par T(x₁, x₂, x₃) = (x_1 ; -x_1+x_2+x_3 ; x_2). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, suivre l'erreur]  A
    = [[1,0,0],[-1,1,1],[0,1,0]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[1,0,0],[-1,1,1],[0,1,0]]
    = L2 ← L2 + L1 : [[1,0,0],[0,1,1],[0,1,0]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 - L2 : [[1,0,0],[0,1,1],[0,0,-1]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : un pivot dans chacune des 3 colonnes, injective ; un pivot dans chacune des 3 lignes, surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 3 ; lignes : 3. | Rang 3 : un pivot dans chacune des 3 colonnes, injective ; un pivot dans chacune des 3 lignes, surjective.
  pièges : l_matrix_rows_cols

T : ℝ⁴ → ℝ³ est linéaire, avec T(e₁) = (1 ; 0 ; -1), T(e₂) = (-1 ; 0 ; 1), T(e₃) = (-2 ; 0 ; 2), T(e₄) = (2 ; 1 ; 0). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, suivre l'erreur]  A
    = [[1,-1,-2,2],[0,0,0,1],[-1,1,2,0]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[1,-1,-2,2],[0,0,0,1],[-1,1,2,0]]
    = L3 ← L3 + L1 : [[1,-1,-2,2],[0,0,0,1],[0,0,0,2]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 - 2L2 : [[1,-1,-2,2],[0,0,0,1],[0,0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / ✔ Ni injective, ni surjective
    = 2   ← Rang 2 : 2 colonnes sans pivot, pas injective ; 1 ligne sans pivot, pas surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 4 ; lignes : 3. | Rang 2 : 2 colonnes sans pivot, pas injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_matrix_rows_cols

Soit T : ℝ³ → ℝ⁴ définie par T(x₁, x₂, x₃) = (-x_1 ; x_2 ; x_3 ; x_1+x_2). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, suivre l'erreur]  A
    = [[-1,0,0],[0,1,0],[0,0,1],[1,1,0]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[-1,0,0],[0,1,0],[0,0,1],[1,1,0]]
    = L4 ← L4 + L1 : [[-1,0,0],[0,1,0],[0,0,1],[0,1,0]]   ← Annuler sous le pivot : L₄ ← L₄ + L₁
    = L4 ← L4 - L2 : [[-1,0,0],[0,1,0],[0,0,1],[0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ − L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / ✔ Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 3   ← Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  aides : Injective : un pivot dans chaque colonne. Surjective : un pivot dans chaque ligne. | rang = □ ; colonnes : 3 ; lignes : 4. | Rang 3 : un pivot dans chacune des 3 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_matrix_rows_cols, l_inj_rows

```

### Niveau 5

```
Soit T : ℝ⁴ → ℝ⁴ définie par T(x₁, x₂, x₃, x₄) = (x_1+x_2 ; 2x_1+3x_2 ; -x_2+x_3 ; x_1+x_3+x_4). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, sans aide]  A
    = [[1,1,0,0],[2,3,0,0],[0,-1,1,0],[1,0,1,1]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[1,1,0,0],[2,3,0,0],[0,-1,1,0],[1,0,1,1]]
    = L2 ← L2 - 2L1 : [[1,1,0,0],[0,1,0,0],[0,-1,1,0],[1,0,1,1]]   ← Annuler sous le pivot : L₂ ← L₂ − 2L₁
    = L4 ← L4 - L1 : [[1,1,0,0],[0,1,0,0],[0,-1,1,0],[0,-1,1,1]]   ← Annuler sous le pivot : L₄ ← L₄ − L₁
    = L3 ← L3 + L2 : [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,-1,1,1]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
    = L4 ← L4 + L2 : [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,1,1]]   ← Annuler sous le pivot : L₄ ← L₄ + L₂
    = L4 ← L4 - L3 : [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   ← Annuler sous le pivot : L₄ ← L₄ − L₃
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  pièges : l_matrix_rows_cols

Soit T : ℝ⁴ → ℝ⁴ définie par T(x₁, x₂, x₃, x₄) = (x_1+x_4 ; -2x_1+x_2-2x_4 ; x_3 ; -x_3+x_4). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, sans aide]  A
    = [[1,0,0,1],[-2,1,0,-2],[0,0,1,0],[0,0,-1,1]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[1,0,0,1],[-2,1,0,-2],[0,0,1,0],[0,0,-1,1]]
    = L2 ← L2 + 2L1 : [[1,0,0,1],[0,1,0,0],[0,0,1,0],[0,0,-1,1]]   ← Annuler sous le pivot : L₂ ← L₂ + 2L₁
    = L4 ← L4 + L3 : [[1,0,0,1],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   ← Annuler sous le pivot : L₄ ← L₄ + L₃
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? ✔ Injective et surjective / · Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 4   ← Rang 4 : un pivot dans chacune des 4 colonnes, injective ; un pivot dans chacune des 4 lignes, surjective.
  pièges : l_matrix_rows_cols

Soit T : ℝ² → ℝ³ définie par T(x₁, x₂) = (-x_1-2x_2 ; x_1+x_2 ; x_1). T est-elle injective ? surjective ? Écris sa matrice A, échelonne-la, puis conclus.
  [free, sans aide]  A
    = [[-1,-2],[1,1],[1,0]]   ← Les images T(eⱼ) en colonnes
  — Échelonne A.  [juge rowops]  départ : [[-1,-2],[1,1],[1,0]]
    = L2 ← L2 + L1 : [[-1,-2],[0,-1],[1,0]]   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[-1,-2],[0,-1],[0,-2]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L3 ← L3 - 2L2 : [[-1,-2],[0,-1],[0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − 2L₂
  — Conclus, et justifie par le rang.  [juge value]  départ : r
    ? T est-elle injective ? surjective ? · Injective et surjective / ✔ Injective, pas surjective / · Surjective, pas injective / · Ni injective, ni surjective
    = 2   ← Rang 2 : un pivot dans chacune des 2 colonnes, injective ; 1 ligne sans pivot, pas surjective.
  pièges : l_matrix_rows_cols, l_inj_rows

```

### Variantes d'examen

```
Soit T : ℝ² → ℝ³, T(x) = Ax avec A = [[1,1],[2,3],[-1,0]]. Alors :
  · T est injective et surjective.   ✔ T est injective, mais pas surjective.   · T est surjective, mais pas injective. [l_inj_rows]   · T n'est ni injective, ni surjective.
  [examen mcq]
  pièges : l_inj_rows

Vrai ou faux ?
  « Si n > m, une application linéaire T : ℝⁿ → ℝᵐ n'est pas injective. » → VRAI
  [examen tf]

```

## Produit, transposée, règles de calcul (`l-mat-product`, BA1)

_Case (i, j) : ligne i de A fois colonne j de B._

### Niveau 1

```
Soit A = [[3,2],[2,-1]] et B = [[-2,-4],[0,2]]. AB est 2 × 2. Complète le produit AB.
  [guided]  AB
    = [[-6,-8],[-4,-10]]   (cases à remplir : (1,1) (2,1))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = 2·□ + (−1)·□ | (AB)₂₁ = 2·(−2) + (−1)·0 = −4
  pièges : l_ab_commute, l_product_entrywise

Soit A = [[-1,-2,0],[-3,0,2]] et B = [[-2,3],[-2,-1],[2,-3]]. AB est 2 × 2. Complète le produit AB.
  [guided]  AB
    = [[6,-1],[10,-15]]   (cases à remplir : (1,1) (1,2))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = (−3)·□ + 0·□ + 2·□ | (AB)₂₁ = (−3)·(−2) + 0·(−2) + 2·2 = 10
  pièges : l_ab_commute

Soit A = [[-2,3],[0,4]] et B = [[1,-3,2],[-2,-4,-3]]. AB est 2 × 3. Complète le produit AB.
  [guided]  AB
    = [[-8,-6,-13],[-8,-16,-12]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₁₂ = (−2)·□ + 3·□ | (AB)₁₂ = (−2)·(−3) + 3·(−4) = −6

```

### Niveau 2

```
Soit A = [[2,-3,1],[1,-2,1],[-1,1,0]] et B = [[-2,3],[0,-1],[-1,-3]]. Complète le produit AB.
  [guided]  AB
    ? Quelle est la taille de AB ? · 2 × 3 / · 3 × 3 / ✔ 3 × 2 / · Impossible
    = [[-5,6],[-3,2],[2,-4]]   (cases à remplir : (1,1) (2,1) (2,2) (3,1) (3,2))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = 1·□ + (−2)·□ + 1·□ | (AB)₂₁ = 1·(−2) + (−2)·0 + 1·(−1) = −3

Soit A = [[-2,-3,-2],[1,0,-3]] et B = [[0,2],[-3,1],[3,2]]. Complète le produit AB.
  [guided]  AB
    ? Quelle est la taille de AB ? · 3 × 3 / ✔ 2 × 2 / · Impossible
    = [[3,-11],[-9,-4]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = 1·□ + 0·□ + (−3)·□ | (AB)₂₁ = 1·0 + 0·(−3) + (−3)·3 = −9
  pièges : l_ab_commute

Soit A = [[0,4],[-4,1]] et B = [[-2,3],[-3,3]]. Complète le produit AB.
  [guided]  AB
    ? Quelle est la taille de AB ? · Impossible / ✔ 2 × 2
    = [[-12,12],[5,-9]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Case (i, j) : ligne i de A · colonne j de B
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = (−4)·□ + 1·□ | (AB)₂₁ = (−4)·(−2) + 1·(−3) = 5
  pièges : l_ab_commute, l_product_entrywise

```

### Niveau 3

```
Soit A = [[3,-2,-2],[1,0,1],[0,-1,0]] et B = [[2,3,3],[3,3,-1],[-3,3,3]]. Calcule d'abord le coefficient c₃₂ de C = AB : choisis la ligne et la colonne à multiplier. Puis calcule AB.
  [tap, suivre l'erreur, menu menu]  c_32
    = (AB)_32 = 0·3+(-1)·3+0·3   ← Ligne 3 de A, colonne 2 de B : 0·3 + (−1)·3 + 0·3
    = −3
  — Calcule tout le produit AB.  [juge mat]  départ : AB
    = [[6,-3,5],[-1,6,6],[-3,-3,1]]   ← AB est 3 × 3
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₃₂ = 0·□ + (−1)·□ + 0·□ | (AB)₃₂ = 0·3 + (−1)·3 + 0·3 = −3
  pièges : l_ab_commute, l_product_entrywise, l_coef_index_swap

Soit A = [[-3,-3,-3],[-1,3,1],[-3,2,0]] et B = [[-3,3,-1],[0,1,-1],[-2,-2,1]]. Calcule d'abord le coefficient c₃₂ de C = AB : choisis la ligne et la colonne à multiplier. Puis calcule AB.
  [tap, suivre l'erreur, menu menu]  c_32
    = (AB)_32 = (-3)·3+2·1+0·(-2)   ← Ligne 3 de A, colonne 2 de B : (−3)·3 + 2·1 + 0·(−2)
    = −7
  — Calcule tout le produit AB.  [juge mat]  départ : AB
    = [[15,-6,3],[1,-2,-1],[9,-7,1]]   ← AB est 3 × 3
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₃₂ = (−3)·□ + 2·□ + 0·□ | (AB)₃₂ = (−3)·3 + 2·1 + 0·(−2) = −7
  pièges : l_ab_commute, l_product_entrywise, l_coef_index_swap

Soit A = [[3,3,1],[-1,-1,1]] et B = [[-2,2,3],[2,3,-2],[-3,-3,-1]]. Calcule d'abord le coefficient c₂₁ de C = AB : choisis la ligne et la colonne à multiplier. Puis calcule AB.
  [tap, suivre l'erreur, menu menu]  c_21
    = (AB)_21 = (-1)·(-2)+(-1)·2+1·(-3)   ← Ligne 2 de A, colonne 1 de B : (−1)·(−2) + (−1)·2 + 1·(−3)
    = −3
  — Calcule tout le produit AB.  [juge mat]  départ : AB
    = [[-3,12,2],[-3,-8,-2]]   ← AB est 2 × 3
  aides : Case (i, j) de AB : la ligne i de A fois la colonne j de B, terme à terme, puis la somme. | (AB)₂₁ = (−1)·□ + (−1)·□ + 1·□ | (AB)₂₁ = (−1)·(−2) + (−1)·2 + 1·(−3) = −3
  pièges : l_coef_index_swap

```

### Niveau 4

```
Soit A = [[0,3,0],[3,3,2]] et B = [[-1,3,-2,3],[1,0,-2,-3],[-3,1,2,1]]. Calcule AB, puis (AB)ᵀ.
  [free, suivre l'erreur]  AB
    = [[3,0,-6,-9],[-6,11,-8,2]]   ← AB est 2 × 4 : ligne fois colonne
  — Calcule (AB)ᵀ en passant par BᵀAᵀ.  [juge mat]  départ : (AB)^T
    = [[-1,1,-3],[3,0,1],[-2,-2,2],[3,-3,1]]·[[0,3],[3,3],[0,2]]   ← (AB)ᵀ = BᵀAᵀ : l'ordre s'inverse
    = [[3,-6],[0,11],[-6,-8],[-9,2]]
  aides : Case (i, j) de AB : ligne i de A fois colonne j de B. Puis (AB)ᵀ = BᵀAᵀ : la transposée renverse l'ordre. | (AB)₂₁ = 3·□ + 3·□ + 2·□ | AB = [[3,0,-6,-9],[-6,11,-8,2]]

Soit A = [[1,-4],[-4,0],[2,-3]] et B = [[-1,4,4],[0,-1,4]]. Calcule AB, puis (AB)ᵀ.
  [free, suivre l'erreur]  AB
    = [[-1,8,-12],[4,-16,-16],[-2,11,-4]]   ← AB est 3 × 3 : ligne fois colonne
  — Calcule (AB)ᵀ en passant par BᵀAᵀ.  [juge mat]  départ : (AB)^T
    = [[-1,0],[4,-1],[4,4]]·[[1,-4,2],[-4,0,-3]]   ← (AB)ᵀ = BᵀAᵀ : l'ordre s'inverse
    = [[-1,4,-2],[8,-16,11],[-12,-16,-4]]
  aides : Case (i, j) de AB : ligne i de A fois colonne j de B. Puis (AB)ᵀ = BᵀAᵀ : la transposée renverse l'ordre. | (AB)₁₂ = 1·□ + (−4)·□ | AB = [[-1,8,-12],[4,-16,-16],[-2,11,-4]]
  pièges : l_ab_commute

Soit A = [[1,-2,-1],[-2,0,-2]] et B = [[-2,-2],[2,-1],[3,0]]. Calcule AB, puis (AB)ᵀ.
  [free, suivre l'erreur]  AB
    = [[-9,0],[-2,4]]   ← AB est 2 × 2 : ligne fois colonne
  — Calcule (AB)ᵀ en passant par BᵀAᵀ.  [juge mat]  départ : (AB)^T
    = [[-2,2,3],[-2,-1,0]]·[[1,-2],[-2,0],[-1,-2]]   ← (AB)ᵀ = BᵀAᵀ : l'ordre s'inverse
    = [[-9,-2],[0,4]]
  aides : Case (i, j) de AB : ligne i de A fois colonne j de B. Puis (AB)ᵀ = BᵀAᵀ : la transposée renverse l'ordre. | (AB)₂₁ = (−2)·□ + 0·□ + (−2)·□ | AB = [[-9,0],[-2,4]]
  pièges : l_ab_commute

```

### Niveau 5

```
Soit A = [[-1,-2,2],[0,0,-2],[0,-1,2]]. Calcule A² − 2A + I.
  [free, sans aide]  A² − 2A + I
    = [[1,0,6],[0,2,-4],[0,-2,6]]-[[-2,-4,4],[0,0,-4],[0,-2,4]]+I   ← A², puis 2A, puis + I
    = [[4,4,2],[0,3,0],[0,0,3]]

Soit A = [[-1,-2,-2],[0,1,-2],[0,1,1]] et B = [[1,2,-2],[-2,1,1],[-1,-1,-2]]. Calcule AᵀB.
  [free, sans aide]  A^T·B
    = [[-1,0,0],[-2,1,1],[-2,-2,1]]·[[1,2,-2],[-2,1,1],[-1,-1,-2]]   ← Transposer A, puis multiplier
    = [[-1,-2,2],[-5,-4,3],[1,-7,0]]
  pièges : l_ab_commute, l_product_entrywise

Soit A = [[0,-1,0],[-2,0,0],[0,-1,2]] et B = [[2,1,0],[-1,-2,-2],[0,0,2]]. Calcule (A + B)².
  [free, sans aide]  (A + B)²
    = [[2,0,0],[-3,-2,-2],[0,-1,4]]^2   ← (A + B)² = (A + B)(A + B), sans développer
    = [[4,0,0],[0,6,-4],[3,-2,18]]
  pièges : l_ab_commute, l_product_entrywise

```

### Variantes d'examen

```
Soit A = [[2,-1,0],[2,-2,-3]] et B = [[-1,-2],[2,-2],[-2,-2]]. Soit C = AB. Que vaut c₁₂ ?
  [free, sans aide, examen coef]  c_12
    = −2
  pièges : l_coef_index_swap, l_product_entrywise, l_ab_commute

Soit A = [[-1,0,-1],[-1,-2,3],[1,2,-1]] et B = [[1,-3,3],[0,-2,-2],[-3,-2,0]]. Soit C = AB. Que vaut c₃₁ ?
  · −3 [l_coef_index_swap]   · 5 [l_ab_commute]   ✔ 4   · −4
  [examen mcq]
  pièges : l_ab_commute, l_coef_index_swap

Vrai ou faux ?
  « Pour toutes matrices carrées A et B de même taille, (AB)ᵀ = AᵀBᵀ. » → FAUX
    contre-exemple (matPair) : A = [[0,1],[0,0]], B = [[0,0],[1,0]]
  [examen tf]
  pièges : l_transpose_product

```

## Inverse par [A | I] (`l-mat-inverse`, BA1)

_Réduire [A | I] jusqu'à [I | A⁻¹]._

### Niveau 1

```
Inverse A = [[1,1,0],[1,-2,-2],[-1,1,1]] en réduisant [A | I].
  [guided]  [[1,1,0|1,0,0],[1,-2,-2|0,1,0],[-1,1,1|0,0,1]]
    = L2 ← L2 - L1 : [[1,1,0|1,0,0],[0,-3,-2|-1,1,0],[-1,1,1|0,0,1]]   (cases à remplir : (2,2) (2,4))   ← Descendre : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,1,0|1,0,0],[0,-3,-2|-1,1,0],[0,2,1|1,0,1]]   (cases à remplir : (3,3) (3,5))   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 + (2/3)L2 : [[1,1,0|1,0,0],[0,-3,-2|-1,1,0],[0,0,-1/3|1/3,2/3,1]]   (cases à remplir : (3,3) (3,4))   ← Descendre : L₃ ← L₃ + (2/3)L₂
    = L3 ← -3L3 : [[1,1,0|1,0,0],[0,-3,-2|-1,1,0],[0,0,1|-1,-2,-3]]   (cases à remplir : (3,2) (3,6))   ← Pivot à 1 : L₃ ← −3L₃
    = L2 ← L2 + 2L3 : [[1,1,0|1,0,0],[0,-3,0|-3,-3,-6],[0,0,1|-1,-2,-3]]   (cases à remplir : (2,1) (2,4))   ← Remonter : L₂ ← L₂ + 2L₃
    = L2 ← -(1/3)L2 : [[1,1,0|1,0,0],[0,1,0|1,1,2],[0,0,1|-1,-2,-3]]   (cases à remplir : (2,2) (2,6))   ← Pivot à 1 : L₂ ← −(1/3)L₂
    = L1 ← L1 - L2 : [[1,0,0|0,-1,-2],[0,1,0|1,1,2],[0,0,1|-1,-2,-3]]   (cases à remplir : (1,3) (1,6))   ← Remonter : L₁ ← L₁ − L₂
  — Lis A⁻¹ dans la partie droite.  [juge mat]  départ : A^(−1)
    = [[0,-1,-2],[1,1,2],[-1,-2,-3]]   (cases à remplir : (2,1) (2,2) (3,1))   ← La partie droite de [I | A⁻¹]
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ + 2L₃ : la ligne 2 devient [0, −3, 0 | □, □, □]. | L2 ← L2 - L1 : [[1,1,0|1,0,0],[0,-3,-2|-1,1,0],[-1,1,1|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Inverse A = [[1,2,0],[-1,-1,0],[-1,-2,1]] en réduisant [A | I].
  [guided]  [[1,2,0|1,0,0],[-1,-1,0|0,1,0],[-1,-2,1|0,0,1]]
    = L2 ← L2 + L1 : [[1,2,0|1,0,0],[0,1,0|1,1,0],[-1,-2,1|0,0,1]]   (cases à remplir : (2,3) (2,5))   ← Descendre : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,2,0|1,0,0],[0,1,0|1,1,0],[0,0,1|1,0,1]]   (cases à remplir : (3,2) (3,6))   ← Descendre : L₃ ← L₃ + L₁
    = L1 ← L1 - 2L2 : [[1,0,0|-1,-2,0],[0,1,0|1,1,0],[0,0,1|1,0,1]]   (cases à remplir : (1,3) (1,4))   ← Remonter : L₁ ← L₁ − 2L₂
  — Lis A⁻¹ dans la partie droite.  [juge mat]  départ : A^(−1)
    = [[-1,-2,0],[1,1,0],[1,0,1]]   (cases à remplir : (1,2) (1,3) (2,1))   ← La partie droite de [I | A⁻¹]
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₁ ← L₁ − 2L₂ : la ligne 1 devient [□, 0, 0 | □, □, 0]. | L2 ← L2 + L1 : [[1,2,0|1,0,0],[0,1,0|1,1,0],[-1,-2,1|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Inverse A = [[1,1,-2],[1,0,-2],[-1,0,3]] en réduisant [A | I].
  [guided]  [[1,1,-2|1,0,0],[1,0,-2|0,1,0],[-1,0,3|0,0,1]]
    = L2 ← L2 - L1 : [[1,1,-2|1,0,0],[0,-1,0|-1,1,0],[-1,0,3|0,0,1]]   (cases à remplir : (2,3) (2,6))   ← Descendre : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,1,-2|1,0,0],[0,-1,0|-1,1,0],[0,1,1|1,0,1]]   (cases à remplir : (3,1) (3,4))   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 + L2 : [[1,1,-2|1,0,0],[0,-1,0|-1,1,0],[0,0,1|0,1,1]]   (cases à remplir : (3,2) (3,4))   ← Descendre : L₃ ← L₃ + L₂
    = L1 ← L1 + 2L3 : [[1,1,0|1,2,2],[0,-1,0|-1,1,0],[0,0,1|0,1,1]]   (cases à remplir : (1,1) (1,6))   ← Remonter : L₁ ← L₁ + 2L₃
    = L2 ← -L2 : [[1,1,0|1,2,2],[0,1,0|1,-1,0],[0,0,1|0,1,1]]   (cases à remplir : (2,2) (2,5))   ← Pivot à 1 : L₂ ← −L₂
    = L1 ← L1 - L2 : [[1,0,0|0,3,2],[0,1,0|1,-1,0],[0,0,1|0,1,1]]   (cases à remplir : (1,1) (1,4))   ← Remonter : L₁ ← L₁ − L₂
  — Lis A⁻¹ dans la partie droite.  [juge mat]  départ : A^(−1)
    = [[0,3,2],[1,-1,0],[0,1,1]]   (cases à remplir : (1,2) (3,1) (3,3))   ← La partie droite de [I | A⁻¹]
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₁ ← L₁ + 2L₃ : la ligne 1 devient [1, 1, 0 | □, □, □]. | L2 ← L2 - L1 : [[1,1,-2|1,0,0],[0,-1,0|-1,1,0],[-1,0,3|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 2

```
Inverse A = [[-1,0,-1],[-1,1,1],[2,0,1]] en réduisant [A | I], puis lis b₂₃.
  [guided]  [[-1,0,-1|1,0,0],[-1,1,1|0,1,0],[2,0,1|0,0,1]]
    ? Quelle opération annule la case (2, 1) ? · L₂ ← L₂ + L₃ / · L₂ ← L₂ + L₁ / ✔ L₂ ← L₂ − L₁
    = L2 ← L2 - L1 : [[-1,0,-1|1,0,0],[0,1,2|-1,1,0],[2,0,1|0,0,1]]   (cases à remplir : (2,1) (2,5) (2,6))   ← Descendre : L₂ ← L₂ − L₁
    = L3 ← L3 + 2L1 : [[-1,0,-1|1,0,0],[0,1,2|-1,1,0],[0,0,-1|2,0,1]]   (cases à remplir : (3,3) (3,4) (3,6))   ← Descendre : L₃ ← L₃ + 2L₁
    = L3 ← -L3 : [[-1,0,-1|1,0,0],[0,1,2|-1,1,0],[0,0,1|-2,0,-1]]   (cases à remplir : (3,2) (3,4) (3,6))   ← Pivot à 1 : L₃ ← −L₃
    = L2 ← L2 - 2L3 : [[-1,0,-1|1,0,0],[0,1,0|3,1,2],[0,0,1|-2,0,-1]]   (cases à remplir : (2,2) (2,4) (2,5))   ← Remonter : L₂ ← L₂ − 2L₃
    = L1 ← L1 + L3 : [[-1,0,0|-1,0,-1],[0,1,0|3,1,2],[0,0,1|-2,0,-1]]   (cases à remplir : (1,3) (1,4) (1,5))   ← Remonter : L₁ ← L₁ + L₃
    = L1 ← -L1 : [[1,0,0|1,0,1],[0,1,0|3,1,2],[0,0,1|-2,0,-1]]   (cases à remplir : (1,2) (1,5) (1,6))   ← Pivot à 1 : L₁ ← −L₁
  — Que vaut b₂₃, le coefficient (2, 3) de A⁻¹ ?  [juge mat]  départ : b_23
    = 2   ← Ligne 2, colonne 3 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ − 2L₃ : la ligne 2 devient [0, 1, 0 | □, □, □]. | L2 ← L2 - L1 : [[-1,0,-1|1,0,0],[0,1,2|-1,1,0],[2,0,1|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Inverse A = [[-1,-1,0],[2,1,0],[3,1,1]] en réduisant [A | I], puis lis b₃₁.
  [guided]  [[-1,-1,0|1,0,0],[2,1,0|0,1,0],[3,1,1|0,0,1]]
    ? Quelle opération annule la case (2, 1) ? · L₂ ← L₂ + L₃ / · L₂ ← L₂ − 2L₁ / ✔ L₂ ← L₂ + 2L₁
    = L2 ← L2 + 2L1 : [[-1,-1,0|1,0,0],[0,-1,0|2,1,0],[3,1,1|0,0,1]]   (cases à remplir : (2,2) (2,4) (2,5))   ← Descendre : L₂ ← L₂ + 2L₁
    = L3 ← L3 + 3L1 : [[-1,-1,0|1,0,0],[0,-1,0|2,1,0],[0,-2,1|3,0,1]]   (cases à remplir : (3,2) (3,4) (3,6))   ← Descendre : L₃ ← L₃ + 3L₁
    = L3 ← L3 - 2L2 : [[-1,-1,0|1,0,0],[0,-1,0|2,1,0],[0,0,1|-1,-2,1]]   (cases à remplir : (3,2) (3,4) (3,5))   ← Descendre : L₃ ← L₃ − 2L₂
    = L2 ← -L2 : [[-1,-1,0|1,0,0],[0,1,0|-2,-1,0],[0,0,1|-1,-2,1]]   (cases à remplir : (2,3) (2,4) (2,6))   ← Pivot à 1 : L₂ ← −L₂
    = L1 ← L1 + L2 : [[-1,0,0|-1,-1,0],[0,1,0|-2,-1,0],[0,0,1|-1,-2,1]]   (cases à remplir : (1,2) (1,5) (1,6))   ← Remonter : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,0,0|1,1,0],[0,1,0|-2,-1,0],[0,0,1|-1,-2,1]]   (cases à remplir : (1,2) (1,4) (1,6))   ← Pivot à 1 : L₁ ← −L₁
  — Que vaut b₃₁, le coefficient (3, 1) de A⁻¹ ?  [juge mat]  départ : b_31
    = −1   ← Ligne 3, colonne 1 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₁ ← L₁ + L₂ : la ligne 1 devient [□, 0, 0 | □, □, 0]. | L2 ← L2 + 2L1 : [[-1,-1,0|1,0,0],[0,-1,0|2,1,0],[3,1,1|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Inverse A = [[1,1,0],[0,1,-2],[-1,-1,1]] en réduisant [A | I], puis lis b₂₁.
  [guided]  [[1,1,0|1,0,0],[0,1,-2|0,1,0],[-1,-1,1|0,0,1]]
    ? Quelle opération annule la case (3, 1) ? · L₃ ← L₃ − L₁ / · L₃ ← L₃ + L₂ / ✔ L₃ ← L₃ + L₁
    = L3 ← L3 + L1 : [[1,1,0|1,0,0],[0,1,-2|0,1,0],[0,0,1|1,0,1]]   (cases à remplir : (3,1) (3,5) (3,6))   ← Descendre : L₃ ← L₃ + L₁
    = L2 ← L2 + 2L3 : [[1,1,0|1,0,0],[0,1,0|2,1,2],[0,0,1|1,0,1]]   (cases à remplir : (2,1) (2,4) (2,6))   ← Remonter : L₂ ← L₂ + 2L₃
    = L1 ← L1 - L2 : [[1,0,0|-1,-1,-2],[0,1,0|2,1,2],[0,0,1|1,0,1]]   (cases à remplir : (1,2) (1,4) (1,5))   ← Remonter : L₁ ← L₁ − L₂
  — Que vaut b₂₁, le coefficient (2, 1) de A⁻¹ ?  [juge mat]  départ : b_21
    = 2   ← Ligne 2, colonne 1 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ + 2L₃ : la ligne 2 devient [0, 1, 0 | □, □, □]. | L3 ← L3 + L1 : [[1,1,0|1,0,0],[0,1,-2|0,1,0],[0,0,1|1,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 3

```
Réduis [A | I] avec A = [[1,1,0],[0,1,-1],[-2,-2,1]] : choisis chaque opération, puis écris la matrice. Puis donne b₂₃.
  [tap, suivre l'erreur, menu rowops]  [[1,1,0|1,0,0],[0,1,-1|0,1,0],[-2,-2,1|0,0,1]]
    = L3 ← L3 + 2L1 : [[1,1,0|1,0,0],[0,1,-1|0,1,0],[0,0,1|2,0,1]]   ← Descendre : L₃ ← L₃ + 2L₁
    = L2 ← L2 + L3 : [[1,1,0|1,0,0],[0,1,0|2,1,1],[0,0,1|2,0,1]]   ← Remonter : L₂ ← L₂ + L₃
    = L1 ← L1 - L2 : [[1,0,0|-1,-1,-1],[0,1,0|2,1,1],[0,0,1|2,0,1]]   ← Remonter : L₁ ← L₁ − L₂
  — Que vaut b₂₃, le coefficient (2, 3) de A⁻¹ ?  [juge mat]  départ : b_23
    = 1   ← Ligne 2, colonne 3 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ + L₃ : la ligne 2 devient [0, 1, 0 | □, □, □]. | L3 ← L3 + 2L1 : [[1,1,0|1,0,0],[0,1,-1|0,1,0],[0,0,1|2,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Réduis [A | I] avec A = [[1,0,2],[-2,1,-2],[-1,0,-1]] : choisis chaque opération, puis écris la matrice. Puis donne b₂₃.
  [tap, suivre l'erreur, menu rowops]  [[1,0,2|1,0,0],[-2,1,-2|0,1,0],[-1,0,-1|0,0,1]]
    = L2 ← L2 + 2L1 : [[1,0,2|1,0,0],[0,1,2|2,1,0],[-1,0,-1|0,0,1]]   ← Descendre : L₂ ← L₂ + 2L₁
    = L3 ← L3 + L1 : [[1,0,2|1,0,0],[0,1,2|2,1,0],[0,0,1|1,0,1]]   ← Descendre : L₃ ← L₃ + L₁
    = L2 ← L2 - 2L3 : [[1,0,2|1,0,0],[0,1,0|0,1,-2],[0,0,1|1,0,1]]   ← Remonter : L₂ ← L₂ − 2L₃
    = L1 ← L1 - 2L3 : [[1,0,0|-1,0,-2],[0,1,0|0,1,-2],[0,0,1|1,0,1]]   ← Remonter : L₁ ← L₁ − 2L₃
  — Que vaut b₂₃, le coefficient (2, 3) de A⁻¹ ?  [juge mat]  départ : b_23
    = −2   ← Ligne 2, colonne 3 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ − 2L₃ : la ligne 2 devient [0, □, 0 | 0, □, □]. | L2 ← L2 + 2L1 : [[1,0,2|1,0,0],[0,1,2|2,1,0],[-1,0,-1|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Réduis [A | I] avec A = [[1,0,-2],[-1,1,3],[-1,0,3]] : choisis chaque opération, puis écris la matrice. Puis donne b₁₃.
  [tap, suivre l'erreur, menu rowops]  [[1,0,-2|1,0,0],[-1,1,3|0,1,0],[-1,0,3|0,0,1]]
    = L2 ← L2 + L1 : [[1,0,-2|1,0,0],[0,1,1|1,1,0],[-1,0,3|0,0,1]]   ← Descendre : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,0,-2|1,0,0],[0,1,1|1,1,0],[0,0,1|1,0,1]]   ← Descendre : L₃ ← L₃ + L₁
    = L2 ← L2 - L3 : [[1,0,-2|1,0,0],[0,1,0|0,1,-1],[0,0,1|1,0,1]]   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 + 2L3 : [[1,0,0|3,0,2],[0,1,0|0,1,-1],[0,0,1|1,0,1]]   ← Remonter : L₁ ← L₁ + 2L₃
  — Que vaut b₁₃, le coefficient (1, 3) de A⁻¹ ?  [juge mat]  départ : b_13
    = 2   ← Ligne 1, colonne 3 de A⁻¹
  aides : Réduis [A | I] jusqu'à [I | A⁻¹] : chaque opération porte sur les 6 colonnes. | L₂ ← L₂ − L₃ : la ligne 2 devient [0, □, 0 | 0, □, □]. | L2 ← L2 + L1 : [[1,0,-2|1,0,0],[0,1,1|1,1,0],[-1,0,3|0,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
Calcule l'inverse de A = [[4,-3],[4,-2]] par la formule des matrices 2 × 2.
  [free, suivre l'erreur]  A^(−1)
    = (1/4)·[[-2,3],[-4,4]]   ← ad − bc = 4 ; échanger a et d, changer le signe de b et c
    = [[-1/2,3/4],[-1,1]]
  aides : Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]]. | ad − bc = 4·(−2) − (−3)·4 = □ | A⁻¹ = (1/4)·[[-2,3],[-4,4]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

Calcule l'inverse de A = [[-2,-2],[-5,-4]] par la formule des matrices 2 × 2.
  [free, suivre l'erreur]  A^(−1)
    = (-1/2)·[[-4,2],[5,-2]]   ← ad − bc = −2 ; échanger a et d, changer le signe de b et c
    = [[2,-1],[-5/2,1]]
  aides : Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]]. | ad − bc = (−2)·(−4) − (−2)·(−5) = □ | A⁻¹ = (1/(−2))·[[-4,2],[5,-2]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

Calcule l'inverse de A = [[-2,3],[-1,4]] par la formule des matrices 2 × 2.
  [free, suivre l'erreur]  A^(−1)
    = (-1/5)·[[4,-3],[1,-2]]   ← ad − bc = −5 ; échanger a et d, changer le signe de b et c
    = [[-4/5,3/5],[-1/5,2/5]]
  aides : Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]]. | ad − bc = (−2)·4 − 3·(−1) = □ | A⁻¹ = (1/(−5))·[[4,-3],[1,-2]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

```

### Niveau 5

```
Soit A = [[1,2,0],[-2,-1,-2],[2,2,2]] et B = A⁻¹. Que vaut b₃₁ ?
  [free, sans aide]  b_31
    = −1
  pièges : l_coef_index_swap, l_inv_entrywise, l_rhs_forgotten

Soit A = [[1,0,2,2],[0,1,2,2],[0,0,1,1],[-1,0,-1,0]] et B une matrice telle que AB = I₄. Que vaut la trace de B ?
  [free, sans aide]  tr(B)
    = 5
  pièges : l_inv_entrywise, l_coef_index_swap

Soit A = [[1,0,-1],[0,1,1],[-1,-1,1]] et B = A⁻¹. Que vaut b₃₂ ?
  [free, sans aide]  b_32
    = 1
  pièges : l_coef_index_swap, l_inv_entrywise, l_rhs_forgotten

```

### Variantes d'examen

```
Soit A = [[-1,-1,0],[2,1,2],[1,0,1]] et B = A⁻¹. Que vaut b₃₂ ?
  [free, sans aide, examen coef]  b_32
    = 1
  pièges : l_coef_index_swap, l_inv_entrywise, l_rhs_forgotten

Soit A = [[1,1,-3],[0,1,-1],[1,1,-2]] et B = A⁻¹. Que vaut b₃₁ ?
  · 1 [l_inv_entrywise]   · 2 [l_coef_index_swap]   · 0 [l_rhs_forgotten]   ✔ −1
  [examen mcq]
  pièges : l_coef_index_swap, l_inv_entrywise, l_rhs_forgotten

Vrai ou faux ?
  « Si A et B sont des matrices n × n inversibles, alors (AB)⁻¹ = B⁻¹A⁻¹. » → VRAI
  [examen tf]
  pièges : l_inv_product_order

```

## Géométrie dans ℝ² : rotation, projection, symétrie, affinité (`l-map-geom`, BA1)

_Les images de deux vecteurs bien choisis._

### Niveau 1

```
Écris la matrice M de l'affinité d'axe x + y = 0, de direction x + 2y = 0 et de rapport −1/2. On prend a = (−1 ; 1) sur l'axe, u = (−2 ; 1) dans la direction et P = [a | u].
  [guided]  P
    = [[-1,-2],[1,1]]   (cases à remplir : (2,1) (2,2))   ← a et u en colonnes
  — Inverse P.  [juge mat]  départ : P^(−1)
    = [[1,2],[-1,-1]]   (cases à remplir : (1,2) (2,2))
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[-1,-2],[1,1]]·diag(1,-1/2)·[[1,2],[-1,-1]]   ← M = P·diag(1, −1/2)·P⁻¹
    = [[-2,-3],[3/2,5/2]]   (cases à remplir : (1,2) (2,2))   ← Contrôle : M·a = a et M·u = (−1/2)·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[-1,-2],[1,1]]·diag(1, □)·P⁻¹ | M = [[-2,-3],[3/2,5/2]]

Écris la matrice M de l'affinité d'axe 3x + y = 0, de direction 3x + 2y = 0 et de rapport 2. On prend a = (−1 ; 3) sur l'axe, u = (2 ; −3) dans la direction et P = [a | u].
  [guided]  P
    = [[-1,2],[3,-3]]   (cases à remplir : (1,1) (1,2))   ← a et u en colonnes
  — Inverse P.  [juge mat]  départ : P^(−1)
    = (-1/3)·[[-3,-2],[-3,-1]]   ← det P = −3
    = [[1,2/3],[1,1/3]]   (cases à remplir : (1,2) (2,1))
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[-1,2],[3,-3]]·diag(1,2)·[[1,2/3],[1,1/3]]   ← M = P·diag(1, 2)·P⁻¹
    = [[3,2/3],[-3,0]]   (cases à remplir : (1,1) (2,1))   ← Contrôle : M·a = a et M·u = 2·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[-1,2],[3,-3]]·diag(1, □)·P⁻¹ | M = [[3,2/3],[-3,0]]

Écris la matrice M de l'affinité d'axe x + y = 0, de direction 3x − 2y = 0 et de rapport −1/2. On prend a = (−1 ; 1) sur l'axe, u = (−2 ; −3) dans la direction et P = [a | u].
  [guided]  P
    = [[-1,-2],[1,-3]]   (cases à remplir : (1,1) (2,1))   ← a et u en colonnes
  — Inverse P.  [juge mat]  départ : P^(−1)
    = (1/5)·[[-3,2],[-1,-1]]   ← det P = 5
    = [[-3/5,2/5],[-1/5,-1/5]]   (cases à remplir : (1,2) (2,1))
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[-1,-2],[1,-3]]·diag(1,-1/2)·[[-3/5,2/5],[-1/5,-1/5]]   ← M = P·diag(1, −1/2)·P⁻¹
    = [[2/5,-3/5],[-9/10,1/10]]   (cases à remplir : (1,1) (2,2))   ← Contrôle : M·a = a et M·u = (−1/2)·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[-1,-2],[1,-3]]·diag(1, □)·P⁻¹ | M = [[2/5,-3/5],[-9/10,1/10]]

```

### Niveau 2

```
Écris la matrice M de l'affinité d'axe x − 2y = 0, de direction 3x − y = 0 et de rapport −1/2. On prend a = (−2 ; −1) sur l'axe, u = (−1 ; −3) dans la direction et P = [a | u].
  [guided]  P
    = [[-2,-1],[-1,-3]]   (cases à remplir : (1,1) (2,1) (2,2))   ← a et u en colonnes
  — Inverse P.  [juge mat]  départ : P^(−1)
    = (1/5)·[[-3,1],[1,-2]]   ← det P = 5
    = [[-3/5,1/5],[1/5,-2/5]]   (cases à remplir : (1,1) (2,1) (2,2))
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    ? Comment écrire M ? · M = P·diag(k, 1)·P⁻¹ / ✔ M = P·diag(1, k)·P⁻¹ / · M = P⁻¹·diag(1, k)·P
    = [[-2,-1],[-1,-3]]·diag(1,-1/2)·[[-3/5,1/5],[1/5,-2/5]]   ← M = P·diag(1, −1/2)·P⁻¹
    = [[13/10,-3/5],[9/10,-4/5]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Contrôle : M·a = a et M·u = (−1/2)·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[-2,-1],[-1,-3]]·diag(1, □)·P⁻¹ | M = [[13/10,-3/5],[9/10,-4/5]]
  pièges : l_pdp_inverse_side

Écris la matrice M de l'affinité d'axe 2x + 3y = 0, de direction 3x + 2y = 0 et de rapport 1/2. On prend a = (3 ; −2) sur l'axe, u = (−2 ; 3) dans la direction et P = [a | u].
  [guided]  P
    = [[3,-2],[-2,3]]   (cases à remplir : (1,1) (1,2) (2,2))   ← a et u en colonnes
  — Inverse P.  [juge mat]  départ : P^(−1)
    = (1/5)·[[3,2],[2,3]]   ← det P = 5
    = [[3/5,2/5],[2/5,3/5]]   (cases à remplir : (1,1) (1,2) (2,1))
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    ? Comment écrire M ? · M = P·diag(k, 1)·P⁻¹ / ✔ M = P·diag(1, k)·P⁻¹ / · M = P⁻¹·diag(1, k)·P
    = [[3,-2],[-2,3]]·diag(1,1/2)·[[3/5,2/5],[2/5,3/5]]   ← M = P·diag(1, 1/2)·P⁻¹
    = [[7/5,3/5],[-3/5,1/10]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Contrôle : M·a = a et M·u = 1/2·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[3,-2],[-2,3]]·diag(1, □)·P⁻¹ | M = [[7/5,3/5],[-3/5,1/10]]
  pièges : l_pdp_inverse_side

Soit R la rotation d'angle −π/2 (de centre O) et S la symétrie d'axe y = x. Écris la matrice M de l'application qui fait d'abord S, puis R.
  [guided]  R
    = [[0,1],[-1,0]]   (cases à remplir : (1,1) (2,1) (2,2))   ← Rotation d'angle −π/2
  — La matrice S de l'autre application.  [juge mat]  départ : S
    = [[0,1],[1,0]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Les images de e₁ et e₂ en colonnes
  — La matrice M de la composée (d'abord S, puis R).  [juge mat]  départ : M
    ? On applique d'abord S, puis R. Quelle est la matrice de la composée ? · S·R / ✔ R·S
    = [[0,1],[-1,0]]·[[0,1],[1,0]]   ← R·S
    = [[1,0],[0,-1]]   (cases à remplir : (1,1) (1,2) (2,1))
  aides : On applique d'abord S à x, puis R au résultat : R(S(x)) = (RS)x. La matrice appliquée en premier est à droite. | M = □·□ : écris R et S, puis leur produit dans le bon ordre. | M = [[1,0],[0,-1]]
  pièges : l_rot_transpose, l_compose_order

```

### Niveau 3

```
Écris la matrice de la rotation d'angle −π/2 (de centre O) dans ℝ², en passant par les images de e₁ et e₂.
  [tap, suivre l'erreur, menu menu]  cos(−π/2)
    = 0   ← cos θ, abscisse du point d'angle −π/2 du cercle
  — sin θ.  [juge mat]  départ : sin(−π/2)
    = −1   ← sin θ, ordonnée du même point
  — La matrice R de la rotation.  [juge mat]  départ : R
    = [[0,1],[-1,0]]   ← Colonnes : R·e₁ et R·e₂
  aides : Les colonnes de R sont les images de e₁ et e₂ : e₁ tourné de θ donne (cos θ ; sin θ), e₂ tourné donne (−sin θ ; cos θ). | R = [[cos(−π/2), □], [□, cos(−π/2)]] | R = [[0,1],[-1,0]]

Écris la matrice de la rotation d'angle π/4 (de centre O) dans ℝ², en passant par les images de e₁ et e₂.
  [tap, suivre l'erreur, menu menu]  cos(π/4)
    = √2/2   ← cos θ, abscisse du point d'angle π/4 du cercle
  — sin θ.  [juge mat]  départ : sin(π/4)
    = √2/2   ← sin θ, ordonnée du même point
  — La matrice R de la rotation.  [juge mat]  départ : R
    = [[√2/2,-√2/2],[√2/2,√2/2]]   ← Colonnes : R·e₁ et R·e₂
  aides : Les colonnes de R sont les images de e₁ et e₂ : e₁ tourné de θ donne (cos θ ; sin θ), e₂ tourné donne (−sin θ ; cos θ). | R = [[cos(π/4), □], [□, cos(π/4)]] | R = [[√2/2,-√2/2],[√2/2,√2/2]]

Soit R la rotation d'angle −π/2 (de centre O) et S la projection orthogonale sur la droite 2x + y = 0. Écris la matrice M de l'application qui fait d'abord R, puis S.
  [tap, suivre l'erreur, menu menu]  R
    = [[0,1],[-1,0]]   ← Rotation d'angle −π/2
  — La matrice S de l'autre application.  [juge mat]  départ : S
    = [[1/5,-2/5],[-2/5,4/5]]   ← Les images de e₁ et e₂ en colonnes
  — La matrice M de la composée (d'abord R, puis S).  [juge mat]  départ : M
    = [[1/5,-2/5],[-2/5,4/5]]·[[0,1],[-1,0]]   ← S·R
    = [[2/5,1/5],[-4/5,-2/5]]
  aides : On applique d'abord R à x, puis S au résultat : S(R(x)) = (SR)x. La matrice appliquée en premier est à droite. | M = □·□ : écris R et S, puis leur produit dans le bon ordre. | M = [[2/5,1/5],[-4/5,-2/5]]
  pièges : l_rot_transpose

```

### Niveau 4

```
Écris la matrice M de l'affinité d'axe x − y = 0, de direction 2x + 3y = 0 et de rapport −1/2. Cherche un vecteur a de l'axe et un vecteur u de la direction.
  [free, suivre l'erreur]  a
    = (-1 ; -1)   ← Sur l'axe x − y = 0 : M·a = a
  — Un vecteur u de la direction.  [juge span]  départ : u
    = (-3 ; 2)   ← Sur la droite 2x + 3y = 0 : M·u = k·u
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[-1,-3],[-1,2]]·diag(1,-1/2)·[[-2/5,-3/5],[-1/5,1/5]]   ← M = P·diag(1, −1/2)·P⁻¹
    = [[1/10,9/10],[3/5,2/5]]   ← Contrôle : M·a = a et M·u = (−1/2)·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[-1,-3],[-1,2]]·diag(1, □)·P⁻¹ | M = [[1/10,9/10],[3/5,2/5]]

Écris la matrice de la projection orthogonale sur la droite d : 3x − 2y = 0. Commence par un vecteur directeur u de d.
  [free, suivre l'erreur]  u
    = (2 ; 3)   ← Un vecteur directeur de 3x − 2y = 0
  — La matrice P de la projection orthogonale sur la droite.  [juge mat]  départ : P
    = (1/13)·[[4,6],[6,9]]   ← uuᵀ divisé par uᵀu = 13
    = [[4/13,6/13],[6/13,9/13]]
  aides : Un vecteur directeur u de d, puis P = uuᵀ/(uᵀu). | u = (2 ; 3), P = (1/□)·[[4,6],[6,9]] | P = [[4/13,6/13],[6/13,9/13]]

Écris la matrice M de l'affinité d'axe x − y = 0, de direction y = 0 et de rapport 1/2. Cherche un vecteur a de l'axe et un vecteur u de la direction.
  [free, suivre l'erreur]  a
    = (1 ; 1)   ← Sur l'axe x − y = 0 : M·a = a
  — Un vecteur u de la direction.  [juge span]  départ : u
    = (1 ; 0)   ← Sur la droite y = 0 : M·u = k·u
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[1,1],[1,0]]·diag(1,1/2)·[[0,1],[1,-1]]   ← M = P·diag(1, 1/2)·P⁻¹
    = [[1/2,1/2],[0,1]]   ← Contrôle : M·a = a et M·u = 1/2·u
  aides : Cherche deux vecteurs dont tu connais l'image : a sur l'axe (M·a = a), u dans la direction (M·u = k·u). Puis M = P·diag(1, k)·P⁻¹ avec P = [a | u]. | M = [[1,1],[1,0]]·diag(1, □)·P⁻¹ | M = [[1/2,1/2],[0,1]]

```

### Niveau 5

```
Soit R la rotation d'angle 2π/3 (de centre O) et S la symétrie d'axe Oy. Écris la matrice M de l'application qui fait d'abord S, puis R.
  [free, sans aide]  S
    = [[-1,0],[0,1]]   ← Les images de e₁ et e₂ en colonnes
  — La matrice R de la rotation.  [juge mat]  départ : R
    = [[-1/2,-√3/2],[√3/2,-1/2]]   ← Rotation d'angle 2π/3
  — La matrice M de la composée (d'abord S, puis R).  [juge mat]  départ : M
    = [[-1/2,-√3/2],[√3/2,-1/2]]·[[-1,0],[0,1]]   ← R·S
    = [[1/2,-√3/2],[-√3/2,-1/2]]

Soit R la rotation d'angle π (de centre O) et S la symétrie d'axe Ox. Écris la matrice M de l'application qui fait d'abord S, puis R.
  [free, sans aide]  R
    = [[-1,0],[0,-1]]   ← Rotation d'angle π
  — La matrice S de l'autre application.  [juge mat]  départ : S
    = [[1,0],[0,-1]]   ← Les images de e₁ et e₂ en colonnes
  — La matrice M de la composée (d'abord S, puis R).  [juge mat]  départ : M
    = [[-1,0],[0,-1]]·[[1,0],[0,-1]]   ← R·S
    = [[-1,0],[0,1]]

Écris la matrice M de l'affinité d'axe 2x − 3y = 0, de direction x − 3y = 0 et de rapport 3. Cherche un vecteur a de l'axe et un vecteur u de la direction.
  [free, sans aide]  a
    = (-3 ; -2)   ← Sur l'axe 2x − 3y = 0 : M·a = a
  — Un vecteur u de la direction.  [juge span]  départ : u
    = (-3 ; -1)   ← Sur la droite x − 3y = 0 : M·u = k·u
  — Recompose M = P·diag(1, k)·P⁻¹.  [juge mat]  départ : M
    = [[-3,-3],[-2,-1]]·diag(1,3)·[[1/3,-1],[-2/3,1]]   ← M = P·diag(1, 3)·P⁻¹
    = [[5,-6],[4/3,-1]]   ← Contrôle : M·a = a et M·u = 3·u

```

### Variantes d'examen

```
Quelle est la matrice de la projection orthogonale sur la droite x − 2y = 0 ?
  ✔ [[4/5,2/5],[2/5,1/5]]   · [[4,2],[2,1]]   · (1/√5)·[[4,2],[2,1]] [g4_proj_no_square]   · [[1/5,-2/5],[-2/5,4/5]]
  [examen mcq]
  pièges : g4_proj_no_square

Vrai ou faux ?
  « Une projection orthogonale de ℝ² sur une droite est injective. » → FAUX
    contre-exemple (mapWitness) : x = (-1 ; 3), y = (0 ; 0)
  [examen tf]

```

## Théorème de la matrice inversible (`l-mat-imt`, BA1)

_Pour A carrée, une douzaine d'énoncés équivalents._

### Niveau 1

```
A est une matrice carrée n × n. Lequel de ces énoncés est équivalent à « A est inversible » ?
  · A est symétrique   · Ax = b a une solution pour un certain b   ✔ 0 n'est pas valeur propre de A   · La diagonale de A n'a pas de 0

A est une matrice carrée n × n. Lequel de ces énoncés est équivalent à « A est inversible » ?
  · A n'a aucun coefficient nul   · A ≠ 0   · A est symétrique   ✔ A a n pivots

A est une matrice carrée n × n. Lequel de ces énoncés est équivalent à « A est inversible » ?
  ✔ Les colonnes de A sont libres   · det A = 1   · A est symétrique   · A est diagonale

```

### Niveau 2

```
Vrai ou faux ?
  « Si A et B sont des matrices n × n inversibles, alors A + B est inversible. » → FAUX
    contre-exemple (matPair) : A = [[2,1],[1,1]], B = [[-2,-1],[-1,-1]]
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | essaie B = □A | Faux : A = [[2,1],[1,1]] et B = −A sont inversibles, mais A + B = 0 ne l'est pas.

Vrai ou faux ?
  « Si A est n × n et que ses colonnes sont libres, alors Ax = b a une solution pour tout b ∈ ℝⁿ. » → VRAI
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | nombre de pivots = □ sur n colonnes et n lignes | Vrai : colonnes libres, c'est n pivots. A est carrée, donc il y a aussi un pivot dans chaque ligne : Ax = b a une solution (unique) pour tout b.

Vrai ou faux ?
  « Si A est n × n et qu'aucune colonne de A n'est nulle, alors A est inversible. » → FAUX
    contre-exemple (matOne) : A = [[1,2],[2,4]]
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | des colonnes non nulles peuvent être □ | Faux : [[1,2],[2,4]] a des colonnes non nulles mais liées : un seul pivot.

```

### Niveau 3

```
Vrai ou faux ?
  « Si A est m × n et que Ax = b a une solution pour tout b ∈ ℝᵐ, alors Ax = 0 n'a que la solution nulle. » → FAUX
    contre-exemple (dims) : m = 2, n = 3, r = 2
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | nombre de pivots ≤ min(m, n) ; ici, il faudrait r = m et n > m | Faux si A n'est pas carrée. Un pivot par ligne, c'est m pivots ; avec n > m colonnes, il reste des variables libres. Par exemple A = [[1,0,0],[0,1,0]], de taille 2 × 3 et de rang 2.
  pièges : l_imt_nonsquare

Vrai ou faux ?
  « Une matrice 4 × 3 n'est jamais inversible. » → VRAI
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | nombre de pivots ≤ min(4, 3) = 3 | Vrai : seule une matrice carrée peut avoir un inverse des deux côtés.

Vrai ou faux ?
  « Si A est m × n et que ses colonnes sont libres, alors A est inversible. » → FAUX
    contre-exemple (dims) : m = 4, n = 2, r = 2
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | nombre de pivots ≤ min(m, n) ; ici, il faudrait r = n et m > n | Faux si A n'est pas carrée. Seule une matrice carrée peut être inversible. Par exemple A = [[1,0],[0,1],[0,0],[0,0]], de taille 4 × 2 et de rang 2.
  pièges : l_imt_nonsquare

```

### Niveau 4

```
Vrai ou faux ?
  « Si les colonnes d'une matrice A de taille m × n engendrent ℝᵐ, alors elles sont libres. » → FAUX
    contre-exemple (dims) : m = 2, n = 3, r = 2
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | nombre de pivots ≤ min(m, n) ; ici, il faudrait r = m et n > m | Faux si A n'est pas carrée. Engendrer ℝᵐ : m pivots ; libres demande n pivots. Par exemple A = [[1,0,0],[0,1,0]], de taille 2 × 3 et de rang 2.
  pièges : l_imt_nonsquare

Vrai ou faux ?
  « Si S et T sont des applications linéaires inversibles de ℝⁿ dans ℝⁿ, de matrices canoniques A et B, alors B⁻¹A⁻¹ est la matrice canonique de (T ∘ S)⁻¹. » → FAUX
    contre-exemple (matPair) : A = [[0,1],[1,0]], B = [[1,1],[0,1]]
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | la matrice de T ∘ S est □ | Faux : T ∘ S a pour matrice BA (S d'abord, donc A à droite), et (BA)⁻¹ = A⁻¹B⁻¹, qui diffère de B⁻¹A⁻¹ si A et B ne commutent pas : A = [[0,1],[1,0]], B = [[1,1],[0,1]].
  pièges : l_inv_product_order

Vrai ou faux ?
  « Si S et T sont des applications linéaires inversibles de ℝⁿ dans ℝⁿ, de matrices canoniques A et B, alors B⁻¹A⁻¹ est la matrice canonique de (T ∘ S)⁻¹. » → FAUX
    contre-exemple (matPair) : A = [[1,2],[0,1]], B = [[1,0],[0,2]]
  aides : La matrice est-elle carrée ? Sinon, le théorème de la matrice inversible ne s'applique pas : compte les pivots par ligne et par colonne. | la matrice de T ∘ S est □ | Faux : T ∘ S a pour matrice BA (S d'abord, donc A à droite), et (BA)⁻¹ = A⁻¹B⁻¹, qui diffère de B⁻¹A⁻¹ si A et B ne commutent pas : A = [[1,2],[0,1]], B = [[1,0],[0,2]].
  pièges : l_inv_product_order

```

### Niveau 5

```
Vrai ou faux ?
  « Si A est 3 × 4, alors Ax = 0 a une infinité de solutions. » → VRAI

Vrai ou faux ?
  « Si A est 4 × 3, alors x ↦ Ax n'est pas surjective. » → VRAI

Vrai ou faux ?
  « Si A est 5 × 3, alors x ↦ Ax n'est pas surjective. » → VRAI

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si A est 3 × 3 et que Ax = 0 a une infinité de solutions, alors les colonnes de A n'engendrent pas ℝ³. » → VRAI
  [examen tf]

A est une matrice carrée n × n. Lequel de ces énoncés n'est pas équivalent à « A est inversible » ?
  · 0 n'est pas valeur propre de A   · A a n pivots   · Les colonnes de A engendrent ℝⁿ   ✔ A² = A
  [examen mcq]

```

## Matrices élémentaires (`l-mat-elementary`, BA1)

_E = I après une seule opération ; EA fait l'opération._

### Niveau 1

```
E est la matrice élémentaire 3 × 3 de l'opération L₁ ← L₁ + 3L₂. Écris E, puis E⁻¹.
  [guided]  E
    = [[1,3,0],[0,1,0],[0,0,1]]   (cases à remplir : (1,1) (1,2))   ← I₃ après L₁ ← L₁ + 3L₂
  — Écris E⁻¹.  [juge mat]  départ : E^(−1)
    = [[1,-3,0],[0,1,0],[0,0,1]]   (cases à remplir : (1,1) (1,3))   ← E⁻¹ fait l'opération contraire : L₁ ← L₁ − 3L₂
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₁ ← L₁ − 3L₂ : [□, □, 0] en ligne 1 | E⁻¹ = [[1,-3,0],[0,1,0],[0,0,1]]

E est la matrice élémentaire 3 × 3 de l'opération L₂ ← L₂ + 2L₃. Écris E, puis E⁻¹.
  [guided]  E
    = [[1,0,0],[0,1,2],[0,0,1]]   (cases à remplir : (2,2) (2,3))   ← I₃ après L₂ ← L₂ + 2L₃
  — Écris E⁻¹.  [juge mat]  départ : E^(−1)
    = [[1,0,0],[0,1,-2],[0,0,1]]   (cases à remplir : (2,1) (2,2))   ← E⁻¹ fait l'opération contraire : L₂ ← L₂ − 2L₃
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₂ ← L₂ − 2L₃ : [0, □, □] en ligne 2 | E⁻¹ = [[1,0,0],[0,1,-2],[0,0,1]]

E est la matrice élémentaire 3 × 3 de l'opération L₃ ← L₃ + L₂. Écris E, puis E⁻¹.
  [guided]  E
    = [[1,0,0],[0,1,0],[0,1,1]]   (cases à remplir : (3,1) (3,3))   ← I₃ après L₃ ← L₃ + L₂
  — Écris E⁻¹.  [juge mat]  départ : E^(−1)
    = [[1,0,0],[0,1,0],[0,-1,1]]   (cases à remplir : (3,1) (3,3))   ← E⁻¹ fait l'opération contraire : L₃ ← L₃ − L₂
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₃ ← L₃ − L₂ : [0, □, □] en ligne 3 | E⁻¹ = [[1,0,0],[0,1,0],[0,-1,1]]

```

### Niveau 2

```
E = [[1,0,0],[0,1,0],[1,0,1]] est une matrice élémentaire. Quelle opération fait-elle ? Écris ensuite E⁻¹.
  [guided]  E^(−1)
    ? Quelle opération E fait-elle sur les lignes ? · L₃ ← L₃ − L₁ / ✔ L₃ ← L₃ + L₁ / · L₁ ← L₁ + L₃
    = [[1,0,0],[0,1,0],[-1,0,1]]   (cases à remplir : (3,1) (3,2) (3,3))   ← E⁻¹ fait l'opération contraire : L₃ ← L₃ − L₁
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₃ ← L₃ − L₁ : [□, 0, □] en ligne 3 | E⁻¹ = [[1,0,0],[0,1,0],[-1,0,1]]
  pièges : l_elementary_inverse

E = [[0,1,0],[1,0,0],[0,0,1]] est une matrice élémentaire. Quelle opération fait-elle ? Écris ensuite E⁻¹.
  [guided]  E^(−1)
    ? Quelle opération E fait-elle sur les lignes ? · L₃ ↔ L₂ / ✔ L₁ ↔ L₂
    = [[0,1,0],[1,0,0],[0,0,1]]   (cases à remplir : (1,1) (1,3) (2,3))   ← E⁻¹ fait l'opération contraire : L₁ ↔ L₂
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₁ ↔ L₂ : [0, □, 0] en ligne 1 | E⁻¹ = [[0,1,0],[1,0,0],[0,0,1]]
  pièges : l_elementary_inverse

E = [[2,0,0],[0,1,0],[0,0,1]] est une matrice élémentaire. Quelle opération fait-elle ? Écris ensuite E⁻¹.
  [guided]  E^(−1)
    ? Quelle opération E fait-elle sur les lignes ? · L₁ ← (1/2)L₁ / · L₂ ← 2L₂ / ✔ L₁ ← 2L₁
    = [[1/2,0,0],[0,1,0],[0,0,1]]   (cases à remplir : (1,1) (1,2) (1,3))   ← E⁻¹ fait l'opération contraire : L₁ ← (1/2)L₁
  aides : Fais l'opération sur I pour obtenir E ; E⁻¹ fait l'opération contraire. | E⁻¹ fait L₁ ← (1/2)L₁ : [□, 0, 0] en ligne 1 | E⁻¹ = [[1/2,0,0],[0,1,0],[0,0,1]]
  pièges : l_elementary_inverse

```

### Niveau 3

```
Réduis A = [[1,2],[3,4]] à I sans échange, en 3 opérations : choisis chaque opération et écris sa matrice élémentaire E₁, E₂, E₃. Puis écris A⁻¹ et A comme produits de matrices élémentaires.
  [tap, suivre l'erreur, menu menu]  E_1
    = [[1,0],[-3,1]]   ← L₂ ← L₂ − 3L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,0],[0,-1/2]]   ← L₂ ← −(1/2)L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[1,-2],[0,1]]   ← L₁ ← L₁ − 2L₂ appliquée à I
  — A⁻¹ = E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = [[1,-2],[0,1]]·[[1,0],[0,-1/2]]·[[1,0],[-3,1]]   ← E₃E₂E₁·A = I
    = [[-2,1],[3/2,-1/2]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹.  [juge mat]  départ : A
    = [[1,0],[3,1]]·[[1,0],[0,-2]]·[[1,2],[0,1]]   ← (E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹
    = [[1,2],[3,4]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₃E₂E₁·A = I, alors A⁻¹ = E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[-2,1],[3/2,-1/2]]

Réduis A = [[1,-1],[1,-3]] à I sans échange, en 3 opérations : choisis chaque opération et écris sa matrice élémentaire E₁, E₂, E₃. Puis écris A⁻¹ et A comme produits de matrices élémentaires.
  [tap, suivre l'erreur, menu menu]  E_1
    = [[1,0],[-1,1]]   ← L₂ ← L₂ − L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,0],[0,-1/2]]   ← L₂ ← −(1/2)L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[1,1],[0,1]]   ← L₁ ← L₁ + L₂ appliquée à I
  — A⁻¹ = E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = [[1,1],[0,1]]·[[1,0],[0,-1/2]]·[[1,0],[-1,1]]   ← E₃E₂E₁·A = I
    = [[3/2,-1/2],[1/2,-1/2]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹.  [juge mat]  départ : A
    = [[1,0],[1,1]]·[[1,0],[0,-2]]·[[1,-1],[0,1]]   ← (E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹
    = [[1,-1],[1,-3]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₃E₂E₁·A = I, alors A⁻¹ = E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[3/2,-1/2],[1/2,-1/2]]

Réduis A = [[-1,-4],[1,2]] à I sans échange, en 4 opérations : choisis chaque opération et écris sa matrice élémentaire E₁, E₂, E₃, E₄. Puis écris A⁻¹ et A comme produits de matrices élémentaires.
  [tap, suivre l'erreur, menu menu]  E_1
    = [[1,0],[1,1]]   ← L₂ ← L₂ + L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,0],[0,-1/2]]   ← L₂ ← −(1/2)L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[1,4],[0,1]]   ← L₁ ← L₁ + 4L₂ appliquée à I
  — E₄ : la matrice de l'opération 4.  [juge mat]  départ : E_4
    = [[-1,0],[0,1]]   ← L₁ ← −L₁ appliquée à I
  — A⁻¹ = E₄E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = [[-1,0],[0,1]]·[[1,4],[0,1]]·[[1,0],[0,-1/2]]·[[1,0],[1,1]]   ← E₄E₃E₂E₁·A = I
    = [[1,2],[-1/2,-1/2]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹.  [juge mat]  départ : A
    = [[1,0],[-1,1]]·[[1,0],[0,-2]]·[[1,-4],[0,1]]·[[-1,0],[0,1]]   ← (E₄E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹
    = [[-1,-4],[1,2]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₄E₃E₂E₁·A = I, alors A⁻¹ = E₄E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[1,2],[-1/2,-1/2]]

```

### Niveau 4

```
On réduit A = [[-1,2],[-1,3]] à I par E₁ : L₂ ← L₂ − L₁, E₂ : L₁ ← L₁ − 2L₂, E₃ : L₁ ← −L₁. Écris E₁, E₂, E₃, puis A⁻¹ et A comme produits de matrices élémentaires.
  [free, suivre l'erreur]  E_1
    = [[1,0],[-1,1]]   ← L₂ ← L₂ − L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,-2],[0,1]]   ← L₁ ← L₁ − 2L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[-1,0],[0,1]]   ← L₁ ← −L₁ appliquée à I
  — A⁻¹ = E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = E_3·E_2·E_1   ← E₃E₂E₁·A = I
    = [[-3,2],[-1,1]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹.  [juge mat]  départ : A
    = E_1^(−1)·E_2^(−1)·E_3^(−1)   ← (E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹
    = [[-1,2],[-1,3]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₃E₂E₁·A = I, alors A⁻¹ = E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[-3,2],[-1,1]]

On réduit A = [[-1,-2],[-1,-1]] à I par E₁ : L₂ ← L₂ − L₁, E₂ : L₁ ← L₁ + 2L₂, E₃ : L₁ ← −L₁. Écris E₁, E₂, E₃, puis A⁻¹ et A comme produits de matrices élémentaires.
  [free, suivre l'erreur]  E_1
    = [[1,0],[-1,1]]   ← L₂ ← L₂ − L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,2],[0,1]]   ← L₁ ← L₁ + 2L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[-1,0],[0,1]]   ← L₁ ← −L₁ appliquée à I
  — A⁻¹ = E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = E_3·E_2·E_1   ← E₃E₂E₁·A = I
    = [[1,-2],[-1,1]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹.  [juge mat]  départ : A
    = E_1^(−1)·E_2^(−1)·E_3^(−1)   ← (E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹
    = [[-1,-2],[-1,-1]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₃E₂E₁·A = I, alors A⁻¹ = E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[1,-2],[-1,1]]

On réduit A = [[-1,1],[2,-4]] à I par E₁ : L₂ ← L₂ + 2L₁, E₂ : L₂ ← −(1/2)L₂, E₃ : L₁ ← L₁ − L₂, E₄ : L₁ ← −L₁. Écris E₁, E₂, E₃, E₄, puis A⁻¹ et A comme produits de matrices élémentaires.
  [free, suivre l'erreur]  E_1
    = [[1,0],[2,1]]   ← L₂ ← L₂ + 2L₁ appliquée à I
  — E₂ : la matrice de l'opération 2.  [juge mat]  départ : E_2
    = [[1,0],[0,-1/2]]   ← L₂ ← −(1/2)L₂ appliquée à I
  — E₃ : la matrice de l'opération 3.  [juge mat]  départ : E_3
    = [[1,-1],[0,1]]   ← L₁ ← L₁ − L₂ appliquée à I
  — E₄ : la matrice de l'opération 4.  [juge mat]  départ : E_4
    = [[-1,0],[0,1]]   ← L₁ ← −L₁ appliquée à I
  — A⁻¹ = E₄E₃E₂E₁.  [juge mat]  départ : A^(−1)
    = E_4·E_3·E_2·E_1   ← E₄E₃E₂E₁·A = I
    = [[-2,-1/2],[-1,-1/2]]
  — A = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹.  [juge mat]  départ : A
    = E_1^(−1)·E_2^(−1)·E_3^(−1)·E_4^(−1)   ← (E₄E₃E₂E₁)⁻¹ = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹
    = [[-1,1],[2,-4]]
  aides : Fais chaque opération sur I pour obtenir Eₖ. Si E₄E₃E₂E₁·A = I, alors A⁻¹ = E₄E₃E₂E₁ et A = E₁⁻¹E₂⁻¹E₃⁻¹E₄⁻¹. | E₁⁻¹ = [□, □] en ligne 2 | A⁻¹ = [[-2,-1/2],[-1,-1/2]]

```

### Niveau 5

```
Vrai ou faux ?
  « Le produit de deux matrices élémentaires de même taille est une matrice élémentaire. » → FAUX
    contre-exemple (matPair) : A = [[1,1],[0,1]], B = [[1,0],[1,1]]

Vrai ou faux ?
  « Si E est une matrice élémentaire, les colonnes de EA sont reliées par les mêmes relations de dépendance que les colonnes de A. » → VRAI

Vrai ou faux ?
  « Toute matrice élémentaire est inversible, et son inverse est une matrice élémentaire. » → VRAI

```

### Variantes d'examen

```
E = [[1,-3,0],[0,1,0],[0,0,1]] est la matrice élémentaire de L₁ ← L₁ − 3L₂. Que vaut E⁻¹ ?
  · [[1,0,0],[-3,1,0],[0,0,1]]   ✔ [[1,3,0],[0,1,0],[0,0,1]]   · [[1,0,0],[3,1,0],[0,0,1]]   · [[1,-3,0],[0,1,0],[0,0,1]] [l_elementary_inverse]
  [examen mcq]
  pièges : l_elementary_inverse

Vrai ou faux ?
  « Si E est une matrice élémentaire, les colonnes de EA sont reliées par les mêmes relations de dépendance que les colonnes de A. » → VRAI
  [examen tf]

```

## Factorisation LU (`l-mat-lu`, BA1)

_U échelonnée sans échange ; L garde les multiplicateurs._

### Niveau 1

```
Factorise A = [[3,-3,0],[6,-4,4],[0,-4,-5]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[3,-3,0],[6,-4,4],[0,-4,-5]]
    = L2 ← L2 - 2L1 : [[3,-3,0],[0,2,4],[0,-4,-5]]   (cases à remplir : (2,1) (2,3))   ← L₂ ← L₂ − 2L₁ : ℓ₂₁ = 2
    = L3 ← L3 + 2L2 : [[3,-3,0],[0,2,4],[0,0,3]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ + 2L₂ : ℓ₃₂ = −2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[2,1,0],[0,-2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[3,-3,0],[0,2,4],[0,0,3]]   (cases à remplir : (1,2) (1,3))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - 2L1 : [[3,-3,0],[0,2,4],[0,-4,-5]] ; ℓ₂₁ = 2
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[-2,0,1],[2,3,0],[0,6,3]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[-2,0,1],[2,3,0],[0,6,3]]
    = L2 ← L2 + L1 : [[-2,0,1],[0,3,1],[0,6,3]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ + L₁ : ℓ₂₁ = −1
    = L3 ← L3 - 2L2 : [[-2,0,1],[0,3,1],[0,0,1]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ − 2L₂ : ℓ₃₂ = 2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-1,1,0],[0,2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[-2,0,1],[0,3,1],[0,0,1]]   (cases à remplir : (1,1))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 + L1 : [[-2,0,1],[0,3,1],[0,6,3]] ; ℓ₂₁ = −1
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[-1,0,0],[-1,-1,2],[-3,2,-5]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[-1,0,0],[-1,-1,2],[-3,2,-5]]
    = L2 ← L2 - L1 : [[-1,0,0],[0,-1,2],[-3,2,-5]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ − L₁ : ℓ₂₁ = 1
    = L3 ← L3 - 3L1 : [[-1,0,0],[0,-1,2],[0,2,-5]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ − 3L₁ : ℓ₃₁ = 3
    = L3 ← L3 + 2L2 : [[-1,0,0],[0,-1,2],[0,0,-1]]   (cases à remplir : (3,2) (3,3))   ← L₃ ← L₃ + 2L₂ : ℓ₃₂ = −2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[1,1,0],[3,-2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[-1,0,0],[0,-1,2],[0,0,-1]]   (cases à remplir : (2,2) (2,3))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - L1 : [[-1,0,0],[0,-1,2],[-3,2,-5]] ; ℓ₂₁ = 1
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
Factorise A = [[2,-3,-2],[4,-3,-5],[-4,3,8]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[2,-3,-2],[4,-3,-5],[-4,3,8]]
    = L2 ← L2 - 2L1 : [[2,-3,-2],[0,3,-1],[-4,3,8]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ − 2L₁ : ℓ₂₁ = 2
    = L3 ← L3 + 2L1 : [[2,-3,-2],[0,3,-1],[0,-3,4]]   (cases à remplir : (3,2) (3,3))   ← L₃ ← L₃ + 2L₁ : ℓ₃₁ = −2
    = L3 ← L3 + L2 : [[2,-3,-2],[0,3,-1],[0,0,3]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ + L₂ : ℓ₃₂ = −1
  — Écris L et U.  [juge factor]  départ : LU
    ? On a fait L₂ ← L₂ − 2L₁. Que vaut ℓ₂₁ ? ✔ 2 / · −2 / · 1/2
    = L = [[1,0,0],[2,1,0],[-2,-1,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[2,-3,-2],[0,3,-1],[0,0,3]]   (cases à remplir : (1,3) (2,2))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - 2L1 : [[2,-3,-2],[0,3,-1],[-4,3,8]] ; ℓ₂₁ = 2
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_lu_sign

Factorise A = [[2,-1,4],[2,-2,7],[0,-2,5]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[2,-1,4],[2,-2,7],[0,-2,5]]
    = L2 ← L2 - L1 : [[2,-1,4],[0,-1,3],[0,-2,5]]   (cases à remplir : (2,1) (2,2))   ← L₂ ← L₂ − L₁ : ℓ₂₁ = 1
    = L3 ← L3 - 2L2 : [[2,-1,4],[0,-1,3],[0,0,-1]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ − 2L₂ : ℓ₃₂ = 2
  — Écris L et U.  [juge factor]  départ : LU
    ? On a fait L₃ ← L₃ − 2L₂. Que vaut ℓ₃₂ ? · −2 / ✔ 2 / · 1/2
    = L = [[1,0,0],[1,1,0],[0,2,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[2,-1,4],[0,-1,3],[0,0,-1]]   (cases à remplir : (1,1) (2,2))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - L1 : [[2,-1,4],[0,-1,3],[0,-2,5]] ; ℓ₂₁ = 1
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_lu_sign

Factorise A = [[2,4,4],[-4,-6,-6],[2,6,4]] en A = LU : échelonne sans échange, en notant chaque multiplicateur ℓᵢⱼ.
  [guided]  [[2,4,4],[-4,-6,-6],[2,6,4]]
    = L2 ← L2 + 2L1 : [[2,4,4],[0,2,2],[2,6,4]]   (cases à remplir : (2,2) (2,3))   ← L₂ ← L₂ + 2L₁ : ℓ₂₁ = −2
    = L3 ← L3 - L1 : [[2,4,4],[0,2,2],[0,2,0]]   (cases à remplir : (3,1) (3,3))   ← L₃ ← L₃ − L₁ : ℓ₃₁ = 1
    = L3 ← L3 - L2 : [[2,4,4],[0,2,2],[0,0,-2]]   (cases à remplir : (3,1) (3,2))   ← L₃ ← L₃ − L₂ : ℓ₃₂ = 1
  — Écris L et U.  [juge factor]  départ : LU
    ? On a fait L₃ ← L₃ − L₂. Que vaut ℓ₃₂ ? ✔ 1 / · −1
    = L = [[1,0,0],[-2,1,0],[1,1,1]]   (cases à remplir : (2,1) (3,1) (3,2))   ← Sous la diagonale, les multiplicateurs ℓᵢⱼ
    = U = [[2,4,4],[0,2,2],[0,0,-2]]   (cases à remplir : (1,1) (2,3))   ← La forme échelonnée obtenue
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 + 2L1 : [[2,4,4],[0,2,2],[2,6,4]] ; ℓ₂₁ = −2
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_lu_sign

```

### Niveau 3

```
Factorise A = [[1,1,-3],[-3,-2,9],[-1,1,1]] en A = LU : choisis chaque opération Lᵢ ← Lᵢ − kLⱼ (j < i), puis écris la matrice. Écris ensuite L et U.
  [tap, suivre l'erreur, menu rowops]  [[1,1,-3],[-3,-2,9],[-1,1,1]]
    = L2 ← L2 + 3L1 : [[1,1,-3],[0,1,0],[-1,1,1]]   ← L₂ ← L₂ + 3L₁ : ℓ₂₁ = −3
    = L3 ← L3 + L1 : [[1,1,-3],[0,1,0],[0,2,-2]]   ← L₃ ← L₃ + L₁ : ℓ₃₁ = −1
    = L3 ← L3 - 2L2 : [[1,1,-3],[0,1,0],[0,0,-2]]   ← L₃ ← L₃ − 2L₂ : ℓ₃₂ = 2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-3,1,0],[-1,2,1]] ; U = [[1,1,-3],[0,1,0],[0,0,-2]]   ← L : les multiplicateurs ; U : la forme échelonnée
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 + 3L1 : [[1,1,-3],[0,1,0],[-1,1,1]] ; ℓ₂₁ = −3
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[-2,0,1],[-6,1,2],[-2,-3,5]] en A = LU : choisis chaque opération Lᵢ ← Lᵢ − kLⱼ (j < i), puis écris la matrice. Écris ensuite L et U.
  [tap, suivre l'erreur, menu rowops]  [[-2,0,1],[-6,1,2],[-2,-3,5]]
    = L2 ← L2 - 3L1 : [[-2,0,1],[0,1,-1],[-2,-3,5]]   ← L₂ ← L₂ − 3L₁ : ℓ₂₁ = 3
    = L3 ← L3 - L1 : [[-2,0,1],[0,1,-1],[0,-3,4]]   ← L₃ ← L₃ − L₁ : ℓ₃₁ = 1
    = L3 ← L3 + 3L2 : [[-2,0,1],[0,1,-1],[0,0,1]]   ← L₃ ← L₃ + 3L₂ : ℓ₃₂ = −3
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[3,1,0],[1,-3,1]] ; U = [[-2,0,1],[0,1,-1],[0,0,1]]   ← L : les multiplicateurs ; U : la forme échelonnée
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - 3L1 : [[-2,0,1],[0,1,-1],[-2,-3,5]] ; ℓ₂₁ = 3
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[1,3,-1],[2,9,1],[2,0,-9]] en A = LU : choisis chaque opération Lᵢ ← Lᵢ − kLⱼ (j < i), puis écris la matrice. Écris ensuite L et U.
  [tap, suivre l'erreur, menu rowops]  [[1,3,-1],[2,9,1],[2,0,-9]]
    = L2 ← L2 - 2L1 : [[1,3,-1],[0,3,3],[2,0,-9]]   ← L₂ ← L₂ − 2L₁ : ℓ₂₁ = 2
    = L3 ← L3 - 2L1 : [[1,3,-1],[0,3,3],[0,-6,-7]]   ← L₃ ← L₃ − 2L₁ : ℓ₃₁ = 2
    = L3 ← L3 + 2L2 : [[1,3,-1],[0,3,3],[0,0,-1]]   ← L₃ ← L₃ + 2L₂ : ℓ₃₂ = −2
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[2,1,0],[2,-2,1]] ; U = [[1,3,-1],[0,3,3],[0,0,-1]]   ← L : les multiplicateurs ; U : la forme échelonnée
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - 2L1 : [[1,3,-1],[0,3,3],[2,0,-9]] ; ℓ₂₁ = 2
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Factorise A = [[3,-2,-1],[0,-2,-2],[-9,8,4]] en A = LU. Écris ensuite L et U.
  [free, suivre l'erreur]  [[3,-2,-1],[0,-2,-2],[-9,8,4]]
    = L3 ← L3 + 3L1 : [[3,-2,-1],[0,-2,-2],[0,2,1]]   ← L₃ ← L₃ + 3L₁ : ℓ₃₁ = −3
    = L3 ← L3 + L2 : [[3,-2,-1],[0,-2,-2],[0,0,-1]]   ← L₃ ← L₃ + L₂ : ℓ₃₂ = −1
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[0,1,0],[-3,-1,1]] ; U = [[3,-2,-1],[0,-2,-2],[0,0,-1]]   ← L : les multiplicateurs ; U : la forme échelonnée
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₃ ← L₃ − □L₁, ℓ₃₁ = □ | L3 ← L3 + 3L1 : [[3,-2,-1],[0,-2,-2],[0,2,1]] ; ℓ₃₁ = −3
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[-2,-2,-3],[-4,-5,-2],[-2,1,-12]] en A = LU, puis résous Ax = b avec b = (−7 ; −3 ; −31) par Ly = b et Ux = y.
  [free, suivre l'erreur]  [[-2,-2,-3],[-4,-5,-2],[-2,1,-12]]
    = L2 ← L2 - 2L1 : [[-2,-2,-3],[0,-1,4],[-2,1,-12]]   ← L₂ ← L₂ − 2L₁ : ℓ₂₁ = 2
    = L3 ← L3 - L1 : [[-2,-2,-3],[0,-1,4],[0,3,-9]]   ← L₃ ← L₃ − L₁ : ℓ₃₁ = 1
    = L3 ← L3 + 3L2 : [[-2,-2,-3],[0,-1,4],[0,0,3]]   ← L₃ ← L₃ + 3L₂ : ℓ₃₂ = −3
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[2,1,0],[1,-3,1]] ; U = [[-2,-2,-3],[0,-1,4],[0,0,3]]   ← L : les multiplicateurs ; U : la forme échelonnée
  — Résous Ax = b avec b = (−7 ; −3 ; −31) : d'abord Ly = b.  [juge mat]  départ : y
    = (-7 ; 11 ; 9)   ← Ly = b, de haut en bas
  — Puis Ux = y.  [juge mat]  départ : x
    = (-2 ; 1 ; 3)   ← Ux = y, de bas en haut
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 - 2L1 : [[-2,-2,-3],[0,-1,4],[-2,1,-12]] ; ℓ₂₁ = 2
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Factorise A = [[1,1,-2],[-3,-5,3],[1,-1,-4]] en A = LU, puis résous Ax = b avec b = (1 ; −2 ; 1) par Ly = b et Ux = y.
  [free, suivre l'erreur]  [[1,1,-2],[-3,-5,3],[1,-1,-4]]
    = L2 ← L2 + 3L1 : [[1,1,-2],[0,-2,-3],[1,-1,-4]]   ← L₂ ← L₂ + 3L₁ : ℓ₂₁ = −3
    = L3 ← L3 - L1 : [[1,1,-2],[0,-2,-3],[0,-2,-2]]   ← L₃ ← L₃ − L₁ : ℓ₃₁ = 1
    = L3 ← L3 - L2 : [[1,1,-2],[0,-2,-3],[0,0,1]]   ← L₃ ← L₃ − L₂ : ℓ₃₂ = 1
  — Écris L et U.  [juge factor]  départ : LU
    = L = [[1,0,0],[-3,1,0],[1,1,1]] ; U = [[1,1,-2],[0,-2,-3],[0,0,1]]   ← L : les multiplicateurs ; U : la forme échelonnée
  — Résous Ax = b avec b = (1 ; −2 ; 1) : d'abord Ly = b.  [juge mat]  départ : y
    = (1 ; 1 ; -1)   ← Ly = b, de haut en bas
  — Puis Ux = y.  [juge mat]  départ : x
    = (-2 ; 1 ; -1)   ← Ux = y, de bas en haut
  aides : ℓᵢⱼ est le nombre k de Lᵢ ← Lᵢ − kLⱼ, avec son signe : on le range en ligne i, colonne j de L. | L₂ ← L₂ − □L₁, ℓ₂₁ = □ | L2 ← L2 + 3L1 : [[1,1,-2],[0,-2,-3],[1,-1,-4]] ; ℓ₂₁ = −3
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
On factorise A = [[-1,0,-1,0],[2,-2,3,-1],[2,-2,5,-3],[-3,6,-9,8]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₄₃ ?
  [free, sans aide]  l_43
    = −3/2
  pièges : l_lu_sign, l_lu_inverse, l_coef_index_swap

On factorise A = [[2,1,3,-2],[-6,-4,-10,8],[4,5,11,-12],[-4,1,-6,-1]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₄₃ ?
  [free, sans aide]  l_43
    = −3/2
  pièges : l_lu_sign, l_lu_inverse, l_coef_index_swap

On factorise A = [[-2,1,3,-2],[-4,4,4,-6],[-4,6,4,-6],[4,-8,-3,6]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₄₃ ?
  [free, sans aide]  l_43
    = −3/2
  pièges : l_lu_sign, l_lu_inverse, l_coef_index_swap

```

### Variantes d'examen

```
On factorise A = [[-2,-1,2,2],[-2,1,-2,2],[-2,5,-9,2],[4,5,-11,-3]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₄₂ ?
  [free, sans aide, examen coef]  l_42
    = 3/2
  pièges : l_lu_sign, l_lu_inverse, l_coef_index_swap

On factorise A = [[2,1,3,0],[-4,0,-6,-2],[0,-4,-2,2],[-2,0,3,4]] en A = LU sans échange (L unitriangulaire inférieure). Que vaut ℓ₄₂ ?
  · 11/2 [l_lu_inverse]   ✔ 1/2   · −11/2 [l_lu_inverse]   · −1/2 [l_lu_sign]
  [examen mcq]
  pièges : l_lu_sign, l_lu_inverse

Vrai ou faux ?
  « Dans A = LU sans échange, si l'élimination fait Lᵢ ← Lᵢ − kLⱼ, alors ℓᵢⱼ = k. » → VRAI
  [examen tf]
  pièges : l_lu_sign

```

## Produit par blocs, inverse d'une matrice triangulaire par blocs (`l-mat-blocks`, BA1)

_Les blocs se multiplient comme des nombres, sans commuter._

### Niveau 1

```
M = [[A, B], [0, D]] = [[1,1,1,3],[0,-1,-3,-3],[0,0,-1,-3],[0,0,1,2]], avec A = [[1,1],[0,-1]], B = [[1,3],[-3,-3]] et D = [[-1,-3],[1,2]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = (-1)·[[-1,-1],[0,1]]   ← det = −1
    = [[1,1],[0,-1]]   (cases à remplir : (1,1) (2,1))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = [[2,3],[-1,-1]]   (cases à remplir : (2,1) (2,2))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[4,6],[-3,-6]]   (cases à remplir : (1,1) (2,1))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[1,1,4,6],[0,-1,-3,-6],[0,0,2,3],[0,0,-1,-1]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[4,6],[-3,-6]]
  pièges : l_inv_2x2_swap

M = [[A, B], [0, D]] = [[0,1,1,0],[1,-3,1,3],[0,0,-3,3],[0,0,3,-2]], avec A = [[0,1],[1,-3]], B = [[1,0],[1,3]] et D = [[-3,3],[3,-2]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = (-1)·[[-3,-1],[-1,0]]   ← det = −1
    = [[3,1],[1,0]]   (cases à remplir : (1,2) (2,2))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (-1/3)·[[-2,-3],[-3,-3]]   ← det = −3
    = [[2/3,1],[1,1]]   (cases à remplir : (1,2) (2,2))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-17/3,-7],[-2/3,-1]]   (cases à remplir : (1,1) (2,2))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[3,1,-17/3,-7],[1,0,-2/3,-1],[0,0,2/3,1],[0,0,1,1]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-17/3,-7],[-2/3,-1]]
  pièges : l_inv_2x2_swap

M = [[A, B], [0, D]] = [[-3,1,-3,-3],[1,0,3,1],[0,0,2,-1],[0,0,-3,0]], avec A = [[-3,1],[1,0]], B = [[-3,-3],[3,1]] et D = [[2,-1],[-3,0]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = (-1)·[[0,-1],[-1,-3]]   ← det = −1
    = [[0,1],[1,3]]   (cases à remplir : (1,1) (1,2))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (-1/3)·[[0,1],[3,2]]   ← det = −3
    = [[0,-1/3],[-1,-2/3]]   (cases à remplir : (1,1) (2,1))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[1,5/3],[0,2]]   (cases à remplir : (1,2) (2,2))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[0,1,1,5/3],[1,3,0,2],[0,0,0,-1/3],[0,0,-1,-2/3]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[1,5/3],[0,2]]
  pièges : l_inv_2x2_swap

```

### Niveau 2

```
M = [[A, B], [0, D]] = [[2,3,1,-3],[1,1,-1,2],[0,0,0,-3],[0,0,-1,2]], avec A = [[2,3],[1,1]], B = [[1,-3],[-1,2]] et D = [[0,-3],[-1,2]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = (-1)·[[1,-3],[-1,2]]   ← det = −1
    = [[-1,3],[1,-2]]   (cases à remplir : (1,1) (1,2) (2,2))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (-1/3)·[[2,3],[1,0]]   ← det = −3
    = [[-2/3,-1],[-1/3,0]]   (cases à remplir : (1,1) (1,2) (2,1))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    ? Quel est le bloc X₁₂ de M⁻¹ ? · −D⁻¹BA⁻¹ / · B⁻¹ / ✔ −A⁻¹BD⁻¹
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[1/3,-4],[-1/3,3]]   (cases à remplir : (1,1) (1,2) (2,1))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[-1,3,1/3,-4],[1,-2,-1/3,3],[0,0,-2/3,-1],[0,0,-1/3,0]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[1/3,-4],[-1/3,3]]
  pièges : l_inv_entrywise, l_inv_2x2_swap, l_blocks_order, l_blocks_inverse_each

M = [[A, B], [0, D]] = [[1,-1,3,2],[-1,0,0,3],[0,0,-1,2],[0,0,0,3]], avec A = [[1,-1],[-1,0]], B = [[3,2],[0,3]] et D = [[-1,2],[0,3]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = (-1)·[[0,1],[1,1]]   ← det = −1
    = [[0,-1],[-1,-1]]   (cases à remplir : (1,1) (2,1) (2,2))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (-1/3)·[[3,-2],[0,-1]]   ← det = −3
    = [[-1,2/3],[0,1/3]]   (cases à remplir : (1,1) (1,2) (2,1))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    ? Quel est le bloc X₁₂ de M⁻¹ ? · −D⁻¹BA⁻¹ / · B⁻¹ / ✔ −A⁻¹BD⁻¹
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[0,1],[-3,11/3]]   (cases à remplir : (1,1) (1,2) (2,2))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[0,-1,0,1],[-1,-1,-3,11/3],[0,0,-1,2/3],[0,0,0,1/3]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[0,1],[-3,11/3]]
  pièges : l_inv_2x2_swap, l_blocks_order, l_blocks_inverse_each

M = [[A, B], [0, D]] = [[-3,2,-3,-2],[-2,1,1,3],[0,0,-2,-3],[0,0,3,3]], avec A = [[-3,2],[-2,1]], B = [[-3,-2],[1,3]] et D = [[-2,-3],[3,3]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [guided]  X_11
    = [[1,-2],[2,-3]]   (cases à remplir : (1,2) (2,1) (2,2))   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (1/3)·[[3,3],[-3,-2]]   ← det = 3
    = [[1,1],[-1,-2/3]]   (cases à remplir : (1,2) (2,1) (2,2))   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    ? Quel est le bloc X₁₂ de M⁻¹ ? · −D⁻¹BA⁻¹ / ✔ −A⁻¹BD⁻¹ / · B⁻¹
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-3,-1/3],[-4,1/3]]   (cases à remplir : (1,1) (1,2) (2,2))
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[1,-2,-3,-1/3],[2,-3,-4,1/3],[0,0,1,1],[0,0,-1,-2/3]]   (cases à remplir : (1,3) (1,4) (2,3) (2,4))   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-3,-1/3],[-4,1/3]]
  pièges : l_inv_entrywise, l_inv_2x2_swap, l_blocks_order, l_blocks_inverse_each

```

### Niveau 3

```
M = [[A, B], [0, D]] = [[1,-1,-3,-3],[1,-2,-1,-2],[0,0,3,-1],[0,0,3,0]], avec A = [[1,-1],[1,-2]], B = [[-3,-3],[-1,-2]] et D = [[3,-1],[3,0]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [tap, suivre l'erreur, menu menu]  X_11
    = (-1)·[[-2,1],[-1,1]]   ← det = −1
    = [[2,-1],[1,-1]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (1/3)·[[0,1],[-3,3]]   ← det = 3
    = [[0,1/3],[-1,1]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-4,17/3],[-1,5/3]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[2,-1,-4,17/3],[1,-1,-1,5/3],[0,0,0,1/3],[0,0,-1,1]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-4,17/3],[-1,5/3]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

M = [[A, B], [0, D]] = [[-2,-1,3,3],[-1,0,-1,-1],[0,0,1,3],[0,0,1,0]], avec A = [[-2,-1],[-1,0]], B = [[3,3],[-1,-1]] et D = [[1,3],[1,0]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [tap, suivre l'erreur, menu menu]  X_11
    = (-1)·[[0,1],[1,-2]]   ← det = −1
    = [[0,-1],[-1,2]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (-1/3)·[[0,-3],[-1,1]]   ← det = −3
    = [[0,1],[1/3,-1/3]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-1/3,-2/3],[5/3,10/3]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[0,-1,-1/3,-2/3],[-1,2,5/3,10/3],[0,0,0,1],[0,0,1/3,-1/3]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-1/3,-2/3],[5/3,10/3]]
  pièges : l_inv_2x2_swap

M = [[A, B], [0, D]] = [[-1,0,-3,1],[-2,-1,-3,2],[0,0,-2,1],[0,0,3,-2]], avec A = [[-1,0],[-2,-1]], B = [[-3,1],[-3,2]] et D = [[-2,1],[3,-2]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [tap, suivre l'erreur, menu menu]  X_11
    = [[-1,0],[2,-1]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = [[-2,-1],[-3,-2]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[3,1],[-6,-3]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[-1,0,3,1],[2,-1,-6,-3],[0,0,-2,-1],[0,0,-3,-2]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[3,1],[-6,-3]]
  pièges : l_inv_2x2_swap

```

### Niveau 4

```
M = [[A, B], [0, D]] = [[-1,-2,1,1],[2,3,-3,-2],[0,0,-1,0],[0,0,-2,-3]], avec A = [[-1,-2],[2,3]], B = [[1,1],[-3,-2]] et D = [[-1,0],[-2,-3]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [free, suivre l'erreur]  X_11
    = [[3,2],[-2,-1]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (1/3)·[[-3,0],[2,-1]]   ← det = 3
    = [[-1,0],[2/3,-1/3]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-7/3,-1/3],[1,0]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[3,2,-7/3,-1/3],[-2,-1,1,0],[0,0,-1,0],[0,0,2/3,-1/3]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-7/3,-1/3],[1,0]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

M = [[A, B], [0, D]] = [[0,-1,3,2],[-1,-2,3,0],[0,0,1,1],[0,0,0,3]], avec A = [[0,-1],[-1,-2]], B = [[3,2],[3,0]] et D = [[1,1],[0,3]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [free, suivre l'erreur]  X_11
    = (-1)·[[-2,1],[1,0]]   ← det = −1
    = [[2,-1],[-1,0]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (1/3)·[[3,-1],[0,1]]   ← det = 3
    = [[1,-1/3],[0,1/3]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[-3,-1/3],[3,-1/3]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[2,-1,-3,-1/3],[-1,0,3,-1/3],[0,0,1,-1/3],[0,0,0,1/3]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[-3,-1/3],[3,-1/3]]
  pièges : l_inv_2x2_swap

M = [[A, B], [0, D]] = [[3,-2,3,-2],[-2,1,2,0],[0,0,1,1],[0,0,-2,1]], avec A = [[3,-2],[-2,1]], B = [[3,-2],[2,0]] et D = [[1,1],[-2,1]]. Calcule M⁻¹ = [[X₁₁, X₁₂], [0, X₂₂]] par blocs.
  [free, suivre l'erreur]  X_11
    = (-1)·[[1,2],[2,3]]   ← det = −1
    = [[-1,-2],[-2,-3]]   ← X₁₁ = A⁻¹
  — Le bloc X₂₂ = D⁻¹.  [juge mat]  départ : X_22
    = (1/3)·[[1,-1],[2,1]]   ← det = 3
    = [[1/3,-1/3],[2/3,1/3]]   ← X₂₂ = D⁻¹
  — Le bloc X₁₂ (en haut à droite).  [juge mat]  départ : X_12
    = −A^(−1)·B·D^(−1)   ← A·X₁₂ + B·D⁻¹ = 0
    = [[1,-3],[4/3,-16/3]]
  — Assemble M⁻¹.  [juge mat]  départ : M^(−1)
    = [[-1,-2,1,-3],[-2,-3,4/3,-16/3],[0,0,1/3,-1/3],[0,0,2/3,1/3]]   ← Contrôle : M·M⁻¹ = I₄
  aides : Écris M·M⁻¹ = I bloc par bloc et résous pour chaque bloc : A·X₁₁ = I, D·X₂₂ = I, A·X₁₂ + B·X₂₂ = 0. | X₁₂ = −A⁻¹·B·□ | X₁₂ = [[1,-3],[4/3,-16/3]]
  pièges : l_inv_entrywise, l_inv_2x2_swap

```

### Niveau 5

```
Soit M = [[I, X], [0, I]] = [[1,0,-1,1],[0,1,-2,2],[0,0,1,0],[0,0,0,1]] (blocs 2 × 2). Calcule M⁴ par blocs.
  [free, sans aide]  M⁴
    = [[1,0,-4,4],[0,1,-8,8],[0,0,1,0],[0,0,0,1]]   ← [[I, X], [0, I]]ᵏ = [[I, kX], [0, I]] : ici k = 4

Soit N = [[I, 0], [X, I]] = [[1,0,0,0],[0,1,0,0],[1,1,1,0],[-2,0,0,1]] et M = [[A, B], [0, D]] = [[1,-1,1,1],[-1,0,1,-2],[0,0,0,-1],[0,0,1,2]] (blocs 2 × 2). Calcule NM par blocs.
  [free, sans aide]  NM
    = [[1,-1,1,1],[-1,0,1,-2],[0,-1,2,-2],[-2,2,-1,0]]   ← NM = [[A, B], [XA, XB + D]]

Soit M = [[I, X], [0, I]] = [[1,0,-1,1],[0,1,-1,-1],[0,0,1,0],[0,0,0,1]] (blocs 2 × 2). Calcule M² par blocs.
  [free, sans aide]  M²
    = [[1,0,-2,2],[0,1,-2,-2],[0,0,1,0],[0,0,0,1]]   ← [[I, X], [0, I]]ᵏ = [[I, kX], [0, I]] : ici k = 2

```

### Variantes d'examen

```
M = [[A, B], [0, D]] avec A = [[-1,0],[-1,1]], B = [[-1,-2],[1,-2]] et D = [[2,-1],[-3,0]]. Quel est le bloc (1, 2) de M⁻¹ ?
  · [[1/3,-2/3],[11/3,-10/3]] [l_blocks_order]   · [[-1/2,1/2],[-1/4,-1/4]] [l_blocks_inverse_each]   ✔ [[2,5/3],[0,2/3]]   · [[-2,-5/3],[0,-2/3]]
  [examen mcq]
  pièges : l_blocks_order, l_blocks_inverse_each

Vrai ou faux ?
  « Pour des blocs A, B, C, D de taille 2 × 2, det [[A, B], [C, D]] = det A · det D − det B · det C. » → FAUX
    contre-exemple (matOne) : A = [[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]]
  [examen tf]

```

## Déterminant par cofacteurs (`l-det-cofactor`, BA1)

_Développer selon la ligne la plus creuse._

### Niveau 1

```
Calcule det A par cofacteurs, pour A = [[3,8,1,0],[-3,-5,0,9],[3,-2,0,4],[0,0,0,2]].
  [guided]  det[[3,8,1,0],[-3,-5,0,9],[3,-2,0,4],[0,0,0,2]]
    = (-1)^(1+3)·1·det[[-3,-5,9],[3,-2,4],[0,0,2]]   (cases à remplir : (2,2) (3,3))   ← Développer selon la colonne 3 : signe +, un seul terme
    = (-1)^(3+3)·2·det[[-3,-5],[3,-2]]   (cases à remplir : (1,2) (2,1))   ← Développer selon la ligne 3 : signe +, un seul terme
    = 2·((−□)·(□) − (−5)·3)   (trous : 2·((−3)·(−2) − (−5)·3))   ← Un 2 × 2 : diagonale moins antidiagonale
    = 42   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 3 : det A = □·1·det A₁₃, où □ = (−1)^(1+3) et A₁₃ est A sans la ligne 1 ni la colonne 3. | (-1)^(1+3)·1·det[[-3,-5,9],[3,-2,4],[0,0,2]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[-5,7,0,1],[0,0,-3,-1],[0,-1,0,0],[-4,6,0,-2]].
  [guided]  det[[-5,7,0,1],[0,0,-3,-1],[0,-1,0,0],[-4,6,0,-2]]
    = (-1)^(3+2)·(-1)·det[[-5,0,1],[0,-3,-1],[-4,0,-2]]   (cases à remplir : (1,2) (3,2))   ← Développer selon la ligne 3 : signe −, un seul terme
    = (-1)^(2+2)·(-3)·det[[-5,1],[-4,-2]]   (cases à remplir : (1,2) (2,2))   ← Développer selon la colonne 2 : signe +, un seul terme
    = −3·((−5)·(□) − 1·(□))   (trous : −3·((−5)·(−2) − 1·(−4)))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −42   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 3 : det A = □·(−1)·det A₃₂, où □ = (−1)^(3+2) et A₃₂ est A sans la ligne 3 ni la colonne 2. | (-1)^(3+2)·(-1)·det[[-5,0,1],[0,-3,-1],[-4,0,-2]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[0,0,0,-1],[0,-3,-1,-5],[-1,8,-3,8],[0,7,-4,0]].
  [guided]  det[[0,0,0,-1],[0,-3,-1,-5],[-1,8,-3,8],[0,7,-4,0]]
    = (-1)^(3+1)·(-1)·det[[0,0,-1],[-3,-1,-5],[7,-4,0]]   (cases à remplir : (1,3) (2,2))   ← Développer selon la colonne 1 : signe +, un seul terme
    = -(-1)^(1+3)·(-1)·det[[-3,-1],[7,-4]]   (cases à remplir : (1,1) (1,2))   ← Développer selon la ligne 1 : signe +, un seul terme
    = ((−3)·(□) − (−1)·□)   (trous : ((−3)·(−4) − (−1)·7))   ← Un 2 × 2 : diagonale moins antidiagonale
    = 19   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 1 : det A = □·(−1)·det A₃₁, où □ = (−1)^(3+1) et A₃₁ est A sans la ligne 3 ni la colonne 1. | (-1)^(3+1)·(-1)·det[[0,0,-1],[-3,-1,-5],[7,-4,0]]
  pièges : l_cofactor_sign, l_minor_wrong

```

### Niveau 2

```
Calcule det A par cofacteurs, pour A = [[0,-4,0,3],[0,8,0,-5],[0,1,8,6],[4,4,-5,-4]].
  [guided]  det[[0,-4,0,3],[0,8,0,-5],[0,1,8,6],[4,4,-5,-4]]
    ? Selon quelle ligne ou quelle colonne développer ? ✔ Selon la colonne 1 : un seul coefficient non nul / ✔ Selon la colonne 2 : 4 coefficients non nuls
    ? Quel signe porte la case (4, 1) ? ✔ (−1)^(4+1) = −1 / · (−1)^(4+1) = +1
    = -4·det[[-4,0,3],[8,0,-5],[1,8,6]]   (cases à remplir : (1,1) (1,3) (3,2))   ← Développer selon la colonne 1 : signe −, un seul terme
    ? Quel signe porte la case (3, 2) ? ✔ (−1)^(3+2) = −1 / · (−1)^(3+2) = +1
    = 32·det[[-4,3],[8,-5]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Développer selon la colonne 2 : signe −, un seul terme
    = 32·((□)·(□) − □·□)   (trous : 32·((−4)·(−5) − 3·8))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −128   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 1 : det A = □·4·det A₄₁, où □ = (−1)^(4+1) et A₄₁ est A sans la ligne 4 ni la colonne 1. | (-1)^(4+1)·4·det[[-4,0,3],[8,0,-5],[1,8,6]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[-5,0,9,0],[0,0,0,2],[0,-3,0,0],[5,3,-9,0]].
  [guided]  det[[-5,0,9,0],[0,0,0,2],[0,-3,0,0],[5,3,-9,0]]
    ? Selon quelle ligne ou quelle colonne développer ? ✔ Selon la ligne 4 : 3 coefficients non nuls / ✔ Selon la ligne 2 : un seul coefficient non nul
    ? Quel signe porte la case (2, 4) ? ✔ (−1)^(2+4) = +1 / · (−1)^(2+4) = −1
    = 2·det[[-5,0,9],[0,-3,0],[5,3,-9]]   (cases à remplir : (1,3) (3,2) (3,3))   ← Développer selon la ligne 2 : signe +, un seul terme
    ? Quel signe porte la case (2, 2) ? ✔ (−1)^(2+2) = +1 / · (−1)^(2+2) = −1
    = -6·det[[-5,9],[5,-9]]   (cases à remplir : (1,1) (2,1) (2,2))   ← Développer selon la ligne 2 : signe +, un seul terme
    = −6·((□)·(□) − 9·5)   (trous : −6·((−5)·(−9) − 9·5))   ← Un 2 × 2 : diagonale moins antidiagonale
    = 0   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 2 : det A = □·2·det A₂₄, où □ = (−1)^(2+4) et A₂₄ est A sans la ligne 2 ni la colonne 4. | (-1)^(2+4)·2·det[[-5,0,9],[0,-3,0],[5,3,-9]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[4,0,-4],[2,0,9],[4,7,-1]].
  [guided]  det[[4,0,-4],[2,0,9],[4,7,-1]]
    ? Selon quelle ligne ou quelle colonne développer ? ✔ Selon la colonne 1 : 3 coefficients non nuls / ✔ Selon la colonne 2 : un seul coefficient non nul
    ? Quel signe porte la case (3, 2) ? · (−1)^(3+2) = +1 / ✔ (−1)^(3+2) = −1
    = -7·det[[4,-4],[2,9]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Développer selon la colonne 2 : signe −, un seul terme
    = −7·(□·□ − (□)·□)   (trous : −7·(4·9 − (−4)·2))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −308   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 2 : det A = □·7·det A₃₂, où □ = (−1)^(3+2) et A₃₂ est A sans la ligne 3 ni la colonne 2. | (-1)^(3+2)·7·det[[4,-4],[2,9]]
  pièges : l_cofactor_sign, l_minor_wrong

```

### Niveau 3

```
Calcule det A par cofacteurs, pour A = [[0,0,-3],[-4,0,0],[-4,-3,-1]] : choisis d'abord le développement.
  [tap, suivre l'erreur, menu cofactor]  det[[0,0,-3],[-4,0,0],[-4,-3,-1]]
    = -3·det[[-4,0],[-4,-3]]   ← Développer selon la ligne 1 : signe +, un seul terme
    = −3·((−4)·(−3) − 0·(−4))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −36   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 1 : det A = □·(−3)·det A₁₃, où □ = (−1)^(1+3) et A₁₃ est A sans la ligne 1 ni la colonne 3. | (-1)^(1+3)·(-3)·det[[-4,0],[-4,-3]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[0,-1,-3,-5],[1,0,0,7],[0,-3,0,-4],[0,0,2,0]] : choisis d'abord le développement.
  [tap, suivre l'erreur, menu cofactor]  det[[0,-1,-3,-5],[1,0,0,7],[0,-3,0,-4],[0,0,2,0]]
    = -det[[-1,-3,-5],[-3,0,-4],[0,2,0]]   ← Développer selon la colonne 1 : signe −, un seul terme
    = 2·det[[-1,-5],[-3,-4]]   ← Développer selon la ligne 3 : signe −, un seul terme
    = 2·((−1)·(−4) − (−5)·(−3))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −22   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 1 : det A = □·1·det A₂₁, où □ = (−1)^(2+1) et A₂₁ est A sans la ligne 2 ni la colonne 1. | (-1)^(2+1)·1·det[[-1,-3,-5],[-3,0,-4],[0,2,0]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[4,-2,-4,-4],[6,0,0,0],[0,7,0,1],[2,6,0,2]] : choisis d'abord le développement.
  [tap, suivre l'erreur, menu cofactor]  det[[4,-2,-4,-4],[6,0,0,0],[0,7,0,1],[2,6,0,2]]
    = -6·det[[-2,-4,-4],[7,0,1],[6,0,2]]   ← Développer selon la ligne 2 : signe −, un seul terme
    = -24·det[[7,1],[6,2]]   ← Développer selon la colonne 2 : signe −, un seul terme
    = −24·(7·2 − 1·6)   ← Un 2 × 2 : diagonale moins antidiagonale
    = −192   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 2 : det A = □·6·det A₂₁, où □ = (−1)^(2+1) et A₂₁ est A sans la ligne 2 ni la colonne 1. | (-1)^(2+1)·6·det[[-2,-4,-4],[7,0,1],[6,0,2]]
  pièges : l_cofactor_sign, l_minor_wrong

```

### Niveau 4

```
Soit A = [[9,-3,1],[0,-1,x],[0,-1,2]]. Calcule det A en fonction de x, puis trouve x pour que det A = 0.
  [free, suivre l'erreur]  det[[9,-3,1],[0,-1,x],[0,-1,2]]
    = 9·det[[-1,x],[-1,2]]   ← Développer selon la colonne 1 : signe +, un seul terme
    = 9·((−1)·2 − x·(−1))   ← Un 2 × 2 : diagonale moins antidiagonale
  — Pour quelle valeur de x la matrice A n'est-elle pas inversible (det A = 0) ?  [juge value]  départ : x
    = 2   ← Le facteur de degré 1 s'annule
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la colonne 1 : det A = □·9·det A₁₁, où □ = (−1)^(1+1) et A₁₁ est A sans la ligne 1 ni la colonne 1. | (-1)^(1+1)·9·det[[-1,x],[-1,2]]
  pièges : l_cofactor_sign, l_minor_wrong

Soit A = [[0,3,0,0],[3,-2,4,-2],[-5,4,0,6],[5,0,0,x]]. Calcule det A en fonction de x, puis trouve x pour que det A = 0.
  [free, suivre l'erreur]  det[[0,3,0,0],[3,-2,4,-2],[-5,4,0,6],[5,0,0,x]]
    = -3·det[[3,4,-2],[-5,0,6],[5,0,x]]   ← Développer selon la ligne 1 : signe −, un seul terme
    = 12·det[[-5,6],[5,x]]   ← Développer selon la colonne 2 : signe −, un seul terme
    = 12·((−5)·x − 6·5)   ← Un 2 × 2 : diagonale moins antidiagonale
  — Pour quelle valeur de x la matrice A n'est-elle pas inversible (det A = 0) ?  [juge value]  départ : x
    = −6   ← Le facteur de degré 1 s'annule
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 1 : det A = □·3·det A₁₂, où □ = (−1)^(1+2) et A₁₂ est A sans la ligne 1 ni la colonne 2. | (-1)^(1+2)·3·det[[3,4,-2],[-5,0,6],[5,0,x]]
  pièges : l_cofactor_sign, l_minor_wrong

Calcule det A par cofacteurs, pour A = [[0,0,8,0],[-4,7,0,0],[4,-7,0,0],[2,5,0,-3]].
  [free, suivre l'erreur]  det[[0,0,8,0],[-4,7,0,0],[4,-7,0,0],[2,5,0,-3]]
    = 8·det[[-4,7,0],[4,-7,0],[2,5,-3]]   ← Développer selon la ligne 1 : signe +, un seul terme
    = -24·det[[-4,7],[4,-7]]   ← Développer selon la colonne 3 : signe +, un seul terme
    = −24·((−4)·(−7) − 7·4)   ← Un 2 × 2 : diagonale moins antidiagonale
    = 0   ← Calculer
  aides : Développe selon la ligne ou la colonne la plus creuse ; n'oublie pas le signe du damier (−1)^(i+j). | Selon la ligne 1 : det A = □·8·det A₁₃, où □ = (−1)^(1+3) et A₁₃ est A sans la ligne 1 ni la colonne 3. | (-1)^(1+3)·8·det[[-4,7,0],[4,-7,0],[2,5,-3]]
  pièges : l_cofactor_sign, l_minor_wrong

```

### Niveau 5

```
Calcule le déterminant de A = [[0,8,0,-2,7],[9,-2,-2,-2,0],[-4,-4,-3,-3,0],[0,0,-3,0,0],[-1,0,6,0,0]].
  [free, sans aide]  det[[0,8,0,-2,7],[9,-2,-2,-2,0],[-4,-4,-3,-3,0],[0,0,-3,0,0],[-1,0,6,0,0]]
    = 3·det[[0,8,-2,7],[9,-2,-2,0],[-4,-4,-3,0],[-1,0,0,0]]   ← Développer selon la ligne 4 : signe −, un seul terme
    = 3·det[[8,-2,7],[-2,-2,0],[-4,-3,0]]   ← Développer selon la ligne 4 : signe −, un seul terme
    = 21·det[[-2,-2],[-4,-3]]   ← Développer selon la colonne 3 : signe +, un seul terme
    = 21·((−2)·(−3) − (−2)·(−4))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −42   ← Calculer
  pièges : l_cofactor_sign, l_minor_wrong

Calcule le déterminant de A = [[0,-3,0,8,-1],[-1,0,-2,0,7],[4,0,0,0,0],[9,0,0,0,6],[2,-2,0,6,6]].
  [free, sans aide]  det[[0,-3,0,8,-1],[-1,0,-2,0,7],[4,0,0,0,0],[9,0,0,0,6],[2,-2,0,6,6]]
    = 4·det[[-3,0,8,-1],[0,-2,0,7],[0,0,0,6],[-2,0,6,6]]   ← Développer selon la ligne 3 : signe +, un seul terme
    = -24·det[[-3,0,8],[0,-2,0],[-2,0,6]]   ← Développer selon la ligne 3 : signe −, un seul terme
    = 48·det[[-3,8],[-2,6]]   ← Développer selon la ligne 2 : signe +, un seul terme
    = 48·((−3)·6 − 8·(−2))   ← Un 2 × 2 : diagonale moins antidiagonale
    = −96   ← Calculer
  pièges : l_cofactor_sign, l_minor_wrong

Calcule le déterminant de A = [[4,4,0,-2,0],[0,-1,0,0,4],[3,0,0,0,0],[5,0,1,0,0],[-5,-4,0,4,0]].
  [free, sans aide]  det[[4,4,0,-2,0],[0,-1,0,0,4],[3,0,0,0,0],[5,0,1,0,0],[-5,-4,0,4,0]]
    = 3·det[[4,0,-2,0],[-1,0,0,4],[0,1,0,0],[-4,0,4,0]]   ← Développer selon la ligne 3 : signe +, un seul terme
    = 12·det[[4,0,-2],[0,1,0],[-4,0,4]]   ← Développer selon la colonne 4 : signe +, un seul terme
    = 12·det[[4,-2],[-4,4]]   ← Développer selon la colonne 2 : signe +, un seul terme
    = 12·(4·4 − (−2)·(−4))   ← Un 2 × 2 : diagonale moins antidiagonale
    = 96   ← Calculer
  pièges : l_cofactor_sign, l_minor_wrong

```

### Variantes d'examen

```
Que vaut le déterminant de A = [[-4,-3,0],[6,0,2],[7,9,0]] ?
  · −30 [l_cofactor_sign]   ✔ 30   · 0   · −36 [l_minor_wrong]
  [examen mcq]
  pièges : l_cofactor_sign, l_minor_wrong

Vrai ou faux ?
  « Si deux lignes d'une matrice carrée sont égales, son déterminant est nul. » → VRAI
  [examen tf]

```

## Déterminant par opérations sur les lignes (`l-det-rowops`, BA1)

_Échelonner en suivant le facteur, puis la diagonale._

### Niveau 1

```
Calcule det A par opérations sur les lignes, pour A = [[-2,3,1],[-4,6,1],[-4,8,1]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[-2,3,1],[-4,6,1],[-4,8,1]]
    ? On fait L₂ ← L₂ − 2L₁. Que devient det ? ✔ Il ne change pas / · Il est multiplié par −2
    = L2 ← L2 - 2L1 : det[[-2,3,1],[0,0,-1],[-4,8,1]]   (cases à remplir : (2,2) (2,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L1 : det[[-2,3,1],[0,0,-1],[0,2,-1]]   (cases à remplir : (3,1) (3,2))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    ? Le pivot de la colonne 2 est nul : on fait L₂ ↔ L₃. Que devient le facteur devant det ? ✔ Il change de signe / · Il ne change pas
    = L2 ↔ L3 : -det[[-2,3,1],[0,2,-1],[0,0,-1]]   (cases à remplir : (3,2) (3,3))   ← Un échange : det change de signe
    = −4   ← Facteur fois produit de la diagonale : (−1)·(−2)·2·(−1) = −4
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[-2,3,1],[0,2,-1],[0,0,-1]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 - 2L1 : det[[-2,3,1],[0,0,-1],[-4,8,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_det_swap_sign

Calcule det A par opérations sur les lignes, pour A = [[3,-1,2],[-6,1,-4],[3,1,3]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[3,-1,2],[-6,1,-4],[3,1,3]]
    ? On fait L₂ ← L₂ + 2L₁. Que devient det ? ✔ Il ne change pas / · Il est multiplié par 2
    = L2 ← L2 + 2L1 : det[[3,-1,2],[0,-1,0],[3,1,3]]   (cases à remplir : (2,2) (2,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - L1 : det[[3,-1,2],[0,-1,0],[0,2,1]]   (cases à remplir : (3,1) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L2 : det[[3,-1,2],[0,-1,0],[0,0,1]]   (cases à remplir : (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −3   ← Produit de la diagonale : 3·(−1)·1 = −3
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[3,-1,2],[0,-1,0],[0,0,1]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 + 2L1 : det[[3,-1,2],[0,-1,0],[3,1,3]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Calcule det A par opérations sur les lignes, pour A = [[3,-1,1],[3,1,-1],[6,-6,7]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[3,-1,1],[3,1,-1],[6,-6,7]]
    ? On fait L₂ ← L₂ − L₁. Que devient det ? ✔ Il ne change pas / · Il change de signe
    = L2 ← L2 - L1 : det[[3,-1,1],[0,2,-2],[6,-6,7]]   (cases à remplir : (2,1) (2,2))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L1 : det[[3,-1,1],[0,2,-2],[0,-4,5]]   (cases à remplir : (3,1) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L2 : det[[3,-1,1],[0,2,-2],[0,0,1]]   (cases à remplir : (3,1) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = 6   ← Produit de la diagonale : 3·2·1 = 6
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[3,-1,1],[0,2,-2],[0,0,1]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 - L1 : det[[3,-1,1],[0,2,-2],[6,-6,7]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
Calcule det A par opérations sur les lignes, pour A = [[-2,-6,-4],[1,1,4],[0,2,-4]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[-2,-6,-4],[1,1,4],[0,2,-4]]
    ? Le pivot vaut −2 et toute la ligne 1 est paire. Comment continuer ? ✔ L₂ ← 2L₂ + L₁ pour garder des entiers / ✔ Sortir le facteur 2 de la ligne 1 : L₁ ← (1/2)L₁, et det A = 2·det(…) / · L₁ ↔ L₂ pour avoir un pivot ±1, det inchangé
    = L1 ← (1/2)L1 : 2·det[[-1,-3,-2],[1,1,4],[0,2,-4]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Sortir le facteur 2 de la ligne 1
    = L2 ← L2 + L1 : 2·det[[-1,-3,-2],[0,-2,2],[0,2,-4]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + L2 : 2·det[[-1,-3,-2],[0,-2,2],[0,0,-2]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −8   ← Facteur fois produit de la diagonale : 2·(−1)·(−2)·(−2) = −8
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[-1,-3,-2],[0,-2,2],[0,0,-2]] ; □ tient compte des échanges et des facteurs sortis. | L1 ← (1/2)L1 : 2·det[[-1,-3,-2],[1,1,4],[0,2,-4]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_det_swap_sign

Calcule det A par opérations sur les lignes, pour A = [[-2,2,-6],[1,1,2],[1,3,3]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[-2,2,-6],[1,1,2],[1,3,3]]
    ? Le pivot vaut −2 et toute la ligne 1 est paire. Comment continuer ? ✔ Sortir le facteur 2 de la ligne 1 : L₁ ← (1/2)L₁, et det A = 2·det(…) / ✔ L₂ ← 2L₂ + L₁ pour garder des entiers / · L₁ ↔ L₂ pour avoir un pivot ±1, det inchangé
    = L1 ← (1/2)L1 : 2·det[[-1,1,-3],[1,1,2],[1,3,3]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Sortir le facteur 2 de la ligne 1
    = L2 ← L2 + L1 : 2·det[[-1,1,-3],[0,2,-1],[1,3,3]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + L1 : 2·det[[-1,1,-3],[0,2,-1],[0,4,0]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L2 : 2·det[[-1,1,-3],[0,2,-1],[0,0,2]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −8   ← Facteur fois produit de la diagonale : 2·(−1)·2·2 = −8
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[-1,1,-3],[0,2,-1],[0,0,2]] ; □ tient compte des échanges et des facteurs sortis. | L1 ← (1/2)L1 : 2·det[[-1,1,-3],[1,1,2],[1,3,3]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_det_swap_sign

Calcule det A par opérations sur les lignes, pour A = [[-2,-6,2],[1,6,-3],[-2,-9,6]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [guided]  det[[-2,-6,2],[1,6,-3],[-2,-9,6]]
    ? Le pivot vaut −2 et toute la ligne 1 est paire. Comment continuer ? ✔ Sortir le facteur 2 de la ligne 1 : L₁ ← (1/2)L₁, et det A = 2·det(…) / ✔ L₂ ← 2L₂ + L₁ pour garder des entiers / · L₁ ↔ L₂ pour avoir un pivot ±1, det inchangé
    = L1 ← (1/2)L1 : 2·det[[-1,-3,1],[1,6,-3],[-2,-9,6]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Sortir le facteur 2 de la ligne 1
    = L2 ← L2 + L1 : 2·det[[-1,-3,1],[0,3,-2],[-2,-9,6]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L1 : 2·det[[-1,-3,1],[0,3,-2],[0,-3,4]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + L2 : 2·det[[-1,-3,1],[0,3,-2],[0,0,2]]   (cases à remplir : (3,1) (3,2) (3,3))   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −12   ← Facteur fois produit de la diagonale : 2·(−1)·3·2 = −12
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[-1,-3,1],[0,3,-2],[0,0,2]] ; □ tient compte des échanges et des facteurs sortis. | L1 ← (1/2)L1 : 2·det[[-1,-3,1],[1,6,-3],[-2,-9,6]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_det_swap_sign

```

### Niveau 3

```
Calcule det A par opérations sur les lignes, pour A = [[3,2,-2],[6,3,-4],[6,4,-1]] : choisis chaque opération, puis écris le facteur et la matrice. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [tap, suivre l'erreur, menu rowops]  det[[3,2,-2],[6,3,-4],[6,4,-1]]
    = L2 ← L2 - 2L1 : det[[3,2,-2],[0,-1,0],[6,4,-1]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L1 : det[[3,2,-2],[0,-1,0],[0,0,3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −9   ← Produit de la diagonale : 3·(−1)·3 = −9
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[3,2,-2],[0,-1,0],[0,0,3]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 - 2L1 : det[[3,2,-2],[0,-1,0],[6,4,-1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Calcule det A par opérations sur les lignes, pour A = [[0,1,-2],[2,1,-2],[-4,0,-1]] : choisis chaque opération, puis écris le facteur et la matrice. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [tap, suivre l'erreur, menu rowops]  det[[0,1,-2],[2,1,-2],[-4,0,-1]]
    = L1 ↔ L2 : -det[[2,1,-2],[0,1,-2],[-4,0,-1]]   ← Un échange : det change de signe
    = L3 ← L3 + 2L1 : -det[[2,1,-2],[0,1,-2],[0,2,-5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L2 : -det[[2,1,-2],[0,1,-2],[0,0,-1]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = 2   ← Facteur fois produit de la diagonale : (−1)·2·1·(−1) = 2
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[2,1,-2],[0,1,-2],[0,0,-1]] ; □ tient compte des échanges et des facteurs sortis. | L1 ↔ L2 : -det[[2,1,-2],[0,1,-2],[-4,0,-1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Calcule det A par opérations sur les lignes, pour A = [[3,0,0],[0,-2,2],[3,4,-6]] : choisis chaque opération, puis écris le facteur et la matrice. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [tap, suivre l'erreur, menu rowops]  det[[3,0,0],[0,-2,2],[3,4,-6]]
    = L3 ← L3 - L1 : det[[3,0,0],[0,-2,2],[0,4,-6]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L2 : det[[3,0,0],[0,-2,2],[0,0,-2]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = 12   ← Produit de la diagonale : 3·(−2)·(−2) = 12
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[3,0,0],[0,-2,2],[0,0,-2]] ; □ tient compte des échanges et des facteurs sortis. | L3 ← L3 - L1 : det[[3,0,0],[0,-2,2],[0,4,-6]]
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
Calcule det A par opérations sur les lignes, pour A = [[1,a,a^2],[1,-2,4],[1,-1,1]], et donne-le factorisé. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [free, suivre l'erreur]  det[[1,a,a^2],[1,-2,4],[1,-1,1]]
    = L2 ← L2 - L1 ; L3 ← L3 - L1 : det[[1,a,a^2],[0,-a-2,-a^2+4],[0,-a-1,-a^2+1]]   ← Lᵢ ← Lᵢ − L₁ : det inchangé
    = L2 ← (1/(-2-a))L2 : (-2-a)·det[[1,a,a^2],[0,1,a-2],[0,-a-1,-a^2+1]]   ← Sortir le facteur  − 2 − a de la ligne 2
    = L3 ← (1/(-1-a))L3 : ((-2-a)(-1-a))·det[[1,a,a^2],[0,1,a-2],[0,1,a-1]]   ← Sortir le facteur  − 1 − a de la ligne 3
    = L3 ← L3 - L2 : ((-2-a)(-1-a))·det[[1,a,a^2],[0,1,a-2],[0,0,1]]   ← Échelonnée
    = (−2 − a)(−1 − a)   ← Produit de la diagonale, déjà factorisé
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[1,a,a^2],[0,1,a-2],[0,0,1]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 - L1 ; L3 ← L3 - L1 : det[[1,a,a^2],[0,-a-2,-a^2+4],[0,-a-1,-a^2+1]]
  pièges : l_rowop_sign, l_rowop_wrong_row

Calcule det A par opérations sur les lignes, pour A = [[0,2,3,3],[1,-3,-3,1],[-2,2,3,-6],[-2,4,9,1]]. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [free, suivre l'erreur]  det[[0,2,3,3],[1,-3,-3,1],[-2,2,3,-6],[-2,4,9,1]]
    = L1 ↔ L2 : -det[[1,-3,-3,1],[0,2,3,3],[-2,2,3,-6],[-2,4,9,1]]   ← Un échange : det change de signe
    = L3 ← L3 + 2L1 : -det[[1,-3,-3,1],[0,2,3,3],[0,-4,-3,-4],[-2,4,9,1]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 + 2L1 : -det[[1,-3,-3,1],[0,2,3,3],[0,-4,-3,-4],[0,-2,3,3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L2 : -det[[1,-3,-3,1],[0,2,3,3],[0,0,3,2],[0,-2,3,3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 + L2 : -det[[1,-3,-3,1],[0,2,3,3],[0,0,3,2],[0,0,6,6]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 - 2L3 : -det[[1,-3,-3,1],[0,2,3,3],[0,0,3,2],[0,0,0,2]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −12   ← Facteur fois produit de la diagonale : (−1)·1·2·3·2 = −12
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[1,-3,-3,1],[0,2,3,3],[0,0,3,2],[0,0,0,2]] ; □ tient compte des échanges et des facteurs sortis. | L1 ↔ L2 : -det[[1,-3,-3,1],[0,2,3,3],[-2,2,3,-6],[-2,4,9,1]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Calcule det A par opérations sur les lignes, pour A = [[1,0,0],[2,a+2,-1],[-2,-a-2,2]], et donne-le factorisé. Chaque ligne s'écrit « opération : facteur·det[[…]] ».
  [free, suivre l'erreur]  det[[1,0,0],[2,a+2,-1],[-2,-a-2,2]]
    = L2 ← L2 - 2L1 : det[[1,0,0],[0,a+2,-1],[-2,-a-2,2]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L1 : det[[1,0,0],[0,a+2,-1],[0,-a-2,2]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + L2 : det[[1,0,0],[0,a+2,-1],[0,0,1]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = (a + 2)   ← Produit de la diagonale, factorisé
  aides : Seuls les échanges (det change de signe) et les multiplications de ligne (det multiplié par k) changent det ; Lᵢ ← Lᵢ + kLⱼ le garde. Échelonne, puis multiplie la diagonale. | À la fin : det A = □·det(triangulaire), avec det[[1,0,0],[0,a+2,-1],[0,0,1]] ; □ tient compte des échanges et des facteurs sortis. | L2 ← L2 - 2L1 : det[[1,0,0],[0,a+2,-1],[-2,-a-2,2]]
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
Soit A = [[λ-1,0,2,-1],[-2λ+2,2,-2,0],[2λ-2,2,7,-3],[λ-1,-4,-4,λ+3]]. Calcule det A par opérations sur les lignes (factorisé), puis trouve les valeurs de λ pour lesquelles A n'est pas inversible.
  [free, sans aide]  det[[λ-1,0,2,-1],[-2λ+2,2,-2,0],[2λ-2,2,7,-3],[λ-1,-4,-4,λ+3]]
    = L2 ← L2 + 2L1 : det[[λ-1,0,2,-1],[0,2,2,-2],[2λ-2,2,7,-3],[λ-1,-4,-4,λ+3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - 2L1 : det[[λ-1,0,2,-1],[0,2,2,-2],[0,2,3,-1],[λ-1,-4,-4,λ+3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 - L1 : det[[λ-1,0,2,-1],[0,2,2,-2],[0,2,3,-1],[0,-4,-6,λ+4]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - L2 : det[[λ-1,0,2,-1],[0,2,2,-2],[0,0,1,1],[0,-4,-6,λ+4]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 + 2L2 : det[[λ-1,0,2,-1],[0,2,2,-2],[0,0,1,1],[0,0,-2,λ]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 + 2L3 : det[[λ-1,0,2,-1],[0,2,2,-2],[0,0,1,1],[0,0,0,λ+2]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = 2(λ + 2)(λ − 1)   ← Produit de la diagonale, factorisé
  — A n'est pas inversible exactement quand det A = 0. Pour quelles valeurs de λ ?  [juge solset]  départ : 2(λ + 2)(λ − 1) = 0
    = λ = −2 ou λ = 1   ← A est inversible si et seulement si λ ∉ {-2 ; 1}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[1,0,0,1],[1,2,0,2],[1,2,-λ+3,1],[0,0,-2λ+6,λ-5]]. Calcule det A par opérations sur les lignes (factorisé), puis trouve les valeurs de λ pour lesquelles A n'est pas inversible.
  [free, sans aide]  det[[1,0,0,1],[1,2,0,2],[1,2,-λ+3,1],[0,0,-2λ+6,λ-5]]
    = L2 ← L2 - L1 : det[[1,0,0,1],[0,2,0,1],[1,2,-λ+3,1],[0,0,-2λ+6,λ-5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - L1 : det[[1,0,0,1],[0,2,0,1],[0,2,-λ+3,0],[0,0,-2λ+6,λ-5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 - L2 : det[[1,0,0,1],[0,2,0,1],[0,0,-λ+3,-1],[0,0,-2λ+6,λ-5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 - 2L3 : det[[1,0,0,1],[0,2,0,1],[0,0,-λ+3,-1],[0,0,0,λ-3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −2(λ − 3)²   ← Produit de la diagonale, factorisé
  — A n'est pas inversible exactement quand det A = 0. Pour quelles valeurs de λ ?  [juge solset]  départ : −2(λ − 3)² = 0
    = λ = 3   ← A est inversible si et seulement si λ ∉ {3}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[1,-1,1,0],[-2,λ-1,-1,-2],[0,-2λ+6,-λ+2,5],[1,-λ+2,-2λ+8,5]]. Calcule det A par opérations sur les lignes (factorisé), puis trouve les valeurs de λ pour lesquelles A n'est pas inversible.
  [free, sans aide]  det[[1,-1,1,0],[-2,λ-1,-1,-2],[0,-2λ+6,-λ+2,5],[1,-λ+2,-2λ+8,5]]
    = L2 ← L2 + 2L1 : det[[1,-1,1,0],[0,λ-3,1,-2],[0,-2λ+6,-λ+2,5],[1,-λ+2,-2λ+8,5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 - L1 : det[[1,-1,1,0],[0,λ-3,1,-2],[0,-2λ+6,-λ+2,5],[0,-λ+3,-2λ+7,5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L3 ← L3 + 2L2 : det[[1,-1,1,0],[0,λ-3,1,-2],[0,0,-λ+4,1],[0,-λ+3,-2λ+7,5]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 + L2 : det[[1,-1,1,0],[0,λ-3,1,-2],[0,0,-λ+4,1],[0,0,-2λ+8,3]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = L4 ← L4 - 2L3 : det[[1,-1,1,0],[0,λ-3,1,-2],[0,0,-λ+4,1],[0,0,0,1]]   ← Lᵢ ← Lᵢ + kLⱼ : det inchangé
    = −(λ − 3)(λ − 4)   ← Produit de la diagonale, factorisé
  — A n'est pas inversible exactement quand det A = 0. Pour quelles valeurs de λ ?  [juge solset]  départ : −(λ − 3)(λ − 4) = 0
    = λ = 3 ou λ = 4   ← A est inversible si et seulement si λ ∉ {3 ; 4}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Variantes d'examen

```
Que vaut le déterminant de A = [[0,-2,0,4],[-1,-3,0,1],[2,7,-2,-3],[1,4,-4,1]] ?
  · 4 [l_det_scale_row]   ✔ 8   · 16 [l_det_rowop_combo]   · −8 [l_det_swap_sign]
  [examen mcq]
  pièges : l_det_swap_sign, l_det_scale_row, l_det_rowop_combo

Vrai ou faux ?
  « Échanger deux lignes de A ne change pas det A. » → FAUX
    contre-exemple (matOne) : A = [[1,2],[0,3]]
  [examen tf]
  pièges : l_det_swap_sign

```

## Propriétés : det(AB), det(kA), det(Aᵀ), det(A⁻¹) (`l-det-props`, BA1)

_det(AB) = det A·det B ; det(kA) = kⁿ det A._

### Niveau 1

```
A est de taille 2 × 2, det A = 3. Calcule D = det(A + A). Règle : det(kM) = kⁿ·det M.
  [guided]  D
    = □²·3   (trous : 2²·3)   ← det(kM) = kⁿ·det M
    = 12   ← Calculer
  aides : La règle : det(kM) = kⁿ·det M. Un scalaire sort avec la puissance n. | D = □^2·3 | 2²·3
  pièges : l_det_sum, l_det_scalar

A est de taille 4 × 4, det A = 1. Calcule D = det((1/2)A). Règle : det(kM) = kⁿ·det M.
  [guided]  D
    = (1/2)^□·1   (trous : (1/2)⁴·1)   ← det(kM) = kⁿ·det M
    = 1/16   ← Calculer
  aides : La règle : det(kM) = kⁿ·det M. Un scalaire sort avec la puissance n. | D = (1/2)^□·1 | (1/2)⁴·1
  pièges : l_det_scalar

A est de taille 2 × 2, det A = 2. Calcule D = det(A + A). Règle : det(kM) = kⁿ·det M.
  [guided]  D
    = □²·2   (trous : 2²·2)   ← det(kM) = kⁿ·det M
    = 8   ← Calculer
  aides : La règle : det(kM) = kⁿ·det M. Un scalaire sort avec la puissance n. | D = □^2·2 | 2²·2
  pièges : l_det_sum, l_det_scalar

```

### Niveau 2

```
A est de taille 4 × 4, det A = 1. Calcule D = det((1/2)A).
  [guided]  D
    ? Quelle règle sert à calculer det((1/2)A) ? · det(Mᵀ) = −det M / · det(kM) = k·det M / · det(M + N) = det M + det N / ✔ det(kM) = kⁿ·det M
    = (□/2)^□·1   (trous : (1/2)⁴·1)   ← det(kM) = kⁿ·det M
    = 1/16   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = (□/2)^□·1 | (1/2)⁴·1
  pièges : l_det_scalar, l_det_transpose_sign, l_det_sum

A est de taille 3 × 3, det A = 2. Calcule D = det(A + A).
  [guided]  D
    ? Quelle règle sert à calculer det(A + A) ? · det(kM) = k·det M / · det(M + N) = det M + det N / ✔ det(kM) = kⁿ·det M / · det(Mᵀ) = −det M
    = □^□·2   (trous : 2³·2)   ← det(kM) = kⁿ·det M
    = 16   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = □^□·2 | 2³·2
  pièges : l_det_sum, l_det_scalar, l_det_transpose_sign

A est de taille 4 × 4, det A = −1. Calcule D = det((2A)⁻¹).
  [guided]  D
    ? Quelle règle sert à calculer det((2A)⁻¹) ? ✔ det(M⁻¹) = 1/det M / · det(kM) = k·det M / · det(Mᵀ) = −det M / · det(M⁻¹) = −det M
    = 1/(2^□·(□))   (trous : 1/(2⁴·(−1)))   ← det(M⁻¹) = 1/det M ; det(kM) = kⁿ·det M
    = −1/16   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = 1/(2^□·(□)) | 1/(2⁴·(−1))
  pièges : l_det_scalar, l_det_transpose_sign

```

### Niveau 3

```
A et B sont de taille 3 × 3, det A = −1 et det B = 1. Calcule D = det(3AᵀB⁻¹).
  [tap, suivre l'erreur, menu menu]  D
    = 3³·(−1)·(1/1)   ← det(kM) = kⁿ·det M ; det(MN) = det M·det N ; det(Mᵀ) = det M ; det(M⁻¹) = 1/det M
    = −27   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = □^3·(□)·(1/1) | 3³·(−1)·(1/1)
  pièges : l_det_scalar, l_det_transpose_sign

A et B sont de taille 2 × 2, det A = 3 et det B = −2. Calcule D = det(A²Bᵀ).
  [tap, suivre l'erreur, menu menu]  D
    = 3²·(−2)   ← det(Mᵐ) = (det M)ᵐ ; det(MN) = det M·det N ; det(Mᵀ) = det M
    = −18   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = □^□·(−2) | 3²·(−2)
  pièges : l_det_transpose_sign

A et B sont de taille 4 × 4, det A = 1/2 et det B = −3. Calcule D = det(2AᵀB⁻¹).
  [tap, suivre l'erreur, menu menu]  D
    = 2⁴·(1/2)·(1/(−3))   ← det(kM) = kⁿ·det M ; det(MN) = det M·det N ; det(Mᵀ) = det M ; det(M⁻¹) = 1/det M
    = −8/3   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = 2^□·(□)·(1/(−3)) | 2⁴·(1/2)·(1/(−3))
  pièges : l_det_scalar, l_det_transpose_sign

```

### Niveau 4

```
A est de taille 4 × 4, det A = −1. Calcule D = det((2A)⁻¹).
  [free, suivre l'erreur]  D
    = 1/(2⁴·(−1))   ← det(M⁻¹) = 1/det M ; det(kM) = kⁿ·det M
    = −1/16   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = 1/(2^□·(□)) | 1/(2⁴·(−1))
  pièges : l_det_scalar

A est de taille 2 × 2, det A = −1. Calcule D = det(2A) / det(Aᵀ).
  [free, suivre l'erreur]  D
    = 2²·(−1)/(−1)   ← det(kM) = kⁿ·det M ; det(Mᵀ) = det M
    = 4   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = □^2·(□)/(−1) | 2²·(−1)/(−1)
  pièges : l_det_scalar, l_det_transpose_sign

A et B sont de taille 2 × 2, det A = −2 et det B = 2. Calcule D = det(2AᵀB⁻¹).
  [free, suivre l'erreur]  D
    = 2²·(−2)·(1/2)   ← det(kM) = kⁿ·det M ; det(MN) = det M·det N ; det(Mᵀ) = det M ; det(M⁻¹) = 1/det M
    = −4   ← Calculer
  aides : Un scalaire sort avec la puissance n : det(kA) = kⁿ·det A. Puis det(AB) = det A·det B, det(Aᵀ) = det A, det(A⁻¹) = 1/det A. | D = □^2·(□)·(1/2) | 2²·(−2)·(1/2)
  pièges : l_det_scalar, l_det_transpose_sign

```

### Niveau 5

```
A et B sont de taille 3 × 3, det A = 3 et det B = −2. Calcule D = det(2AᵀB⁻¹).
  [free, sans aide]  D
    = 2³·3·(1/(−2))   ← det(kM) = kⁿ·det M ; det(MN) = det M·det N ; det(Mᵀ) = det M ; det(M⁻¹) = 1/det M
    = −12   ← Calculer
  pièges : l_det_scalar, l_det_transpose_sign

A est de taille 4 × 4, det A = 3. Calcule D = det(−2A) / det(Aᵀ).
  [free, sans aide]  D
    = (−2)⁴·3/3   ← det(kM) = kⁿ·det M ; det(Mᵀ) = det M
    = 16   ← Calculer
  pièges : l_det_scalar, l_det_transpose_sign

A et B sont de taille 4 × 4, det A = −1 et det B = 1. Calcule D = det(2AᵀB⁻¹).
  [free, sans aide]  D
    = 2⁴·(−1)·(1/1)   ← det(kM) = kⁿ·det M ; det(MN) = det M·det N ; det(Mᵀ) = det M ; det(M⁻¹) = 1/det M
    = −16   ← Calculer
  pièges : l_det_scalar, l_det_transpose_sign

```

### Variantes d'examen

```
A est de taille 3 × 3, det A = −3. Que vaut det(2A) / det(Aᵀ) ?
  · −8 [l_det_transpose_sign]   · 2 [l_det_scalar]   ✔ 8   · 16
  [examen mcq]
  pièges : l_det_scalar, l_det_transpose_sign

Vrai ou faux ?
  « Si A est inversible, det(A⁻¹) = 1/det A. » → VRAI
  [examen tf]

```

## Aire et volume (`l-det-area`, BA1)

_|det| : aire du parallélogramme, volume du parallélépipède._

### Niveau 1

```
Calcule l'aire S du triangle de sommets P = (−3 ; 2), Q = (4 ; −4) et R = (3 ; −2). Les côtés issus de P sont u = (7 ; −6) et v = (6 ; −4).
  [guided]  S
    = (1/2)·|7·(□) − 6·(−6)|   (trous : (1/2)·|7·(−4) − 6·(−6)|)   ← u = Q − P = (7 ; −6), v = R − P = (6 ; −4) ; aire = ½·|det[u v]|
    = 4   ← det[u v] = 8 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[7,6],[-6,-4]]| avec u = Q − P et v = R − P en colonnes : S = ½·|7·□ − □·(−6)|. | (1/2)·|7·(−4) − 6·(−6)|
  pièges : l_area_half_abs

Calcule l'aire S du triangle de sommets P = (4 ; 0), Q = (−2 ; 4) et R = (−4 ; −3). Les côtés issus de P sont u = (−6 ; 4) et v = (−8 ; −3).
  [guided]  S
    = (1/2)·|(−6)·(□) − (−8)·4|   (trous : (1/2)·|(−6)·(−3) − (−8)·4|)   ← u = Q − P = (−6 ; 4), v = R − P = (−8 ; −3) ; aire = ½·|det[u v]|
    = 25   ← det[u v] = 50 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[-6,-8],[4,-3]]| avec u = Q − P et v = R − P en colonnes : S = ½·|(−6)·□ − □·4|. | (1/2)·|(−6)·(−3) − (−8)·4|
  pièges : l_area_half_abs

Calcule l'aire S du triangle de sommets P = (0 ; 3), Q = (4 ; 4) et R = (4 ; 3). Les côtés issus de P sont u = (4 ; 1) et v = (4 ; 0).
  [guided]  S
    = (1/2)·|4·□ − 4·1|   (trous : (1/2)·|4·0 − 4·1|)   ← u = Q − P = (4 ; 1), v = R − P = (4 ; 0) ; aire = ½·|det[u v]|
    = 2   ← det[u v] = −4 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[4,4],[1,0]]| avec u = Q − P et v = R − P en colonnes : S = ½·|4·□ − □·1|. | (1/2)·|4·0 − 4·1|
  pièges : l_area_half_abs

```

### Niveau 2

```
Calcule l'aire S du triangle de sommets P = (4 ; −1), Q = (2 ; 0) et R = (−1 ; 1).
  [guided]  S
    ? Quels vecteurs mettre dans le déterminant ? · u = P et v = Q : les sommets eux-mêmes / ✔ u = Q − P et v = R − P : deux côtés issus de P / ✔ u = Q − P et v = R − Q : deux côtés qui se suivent
    = (1/□)·|(−2)·2 − (□)·1|   (trous : (1/2)·|(−2)·2 − (−5)·1|)   ← u = Q − P = (−2 ; 1), v = R − P = (−5 ; 2) ; aire = ½·|det[u v]|
    = 1/2   ← det[u v] = 1 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[-2,-5],[1,2]]| avec u = Q − P et v = R − P en colonnes : S = ½·|(−2)·□ − □·1|. | (1/2)·|(−2)·2 − (−5)·1|
  pièges : l_area_half_abs

Calcule l'aire S du triangle de sommets P = (−3 ; −4), Q = (2 ; 4) et R = (−3 ; −5).
  [guided]  S
    ? Quels vecteurs mettre dans le déterminant ? · u = P et v = Q : les sommets eux-mêmes / ✔ u = Q − P et v = R − P : deux côtés issus de P / ✔ u = Q − P et v = R − Q : deux côtés qui se suivent
    = (1/2)·|5·(□) − □·8|   (trous : (1/2)·|5·(−1) − 0·8|)   ← u = Q − P = (5 ; 8), v = R − P = (0 ; −1) ; aire = ½·|det[u v]|
    = 5/2   ← det[u v] = −5 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[5,0],[8,-1]]| avec u = Q − P et v = R − P en colonnes : S = ½·|5·□ − □·8|. | (1/2)·|5·(−1) − 0·8|
  pièges : l_area_half_abs

Calcule l'aire S du triangle de sommets P = (0 ; 1), Q = (−4 ; 3) et R = (5 ; −4).
  [guided]  S
    ? Quels vecteurs mettre dans le déterminant ? · u = P et v = Q : les sommets eux-mêmes / ✔ u = Q − P et v = R − P : deux côtés issus de P / ✔ u = Q − P et v = R − Q : deux côtés qui se suivent
    = (1/2)·|(−4)·(□) − 5·2|   (trous : (1/2)·|(−4)·(−5) − 5·2|)   ← u = Q − P = (−4 ; 2), v = R − P = (5 ; −5) ; aire = ½·|det[u v]|
    = 5   ← det[u v] = 10 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[-4,5],[2,-5]]| avec u = Q − P et v = R − P en colonnes : S = ½·|(−4)·□ − □·2|. | (1/2)·|(−4)·(−5) − 5·2|
  pièges : l_area_half_abs

```

### Niveau 3

```
L'application x ↦ Ax, avec A = [[4,-1],[4,1]], transforme la région du carré unité [0 ; 1]². Calcule l'aire S de son image.
  [tap, suivre l'erreur, menu menu]  S
    = |4·1 − (−1)·4|   ← aire de l'image = |det A|·aire de départ ; det A = 8
    = 8
  aides : x ↦ Ax multiplie les aires par |det A|. | S = |det A|·(1), avec det A = 4·□ − □·4. | |4·1 − (−1)·4|

L'application x ↦ Ax, avec A = [[4,-1],[0,3]], transforme la région du carré unité [0 ; 1]². Calcule l'aire S de son image.
  [tap, suivre l'erreur, menu menu]  S
    = |4·3 − (−1)·0|   ← aire de l'image = |det A|·aire de départ ; det A = 12
    = 12
  aides : x ↦ Ax multiplie les aires par |det A|. | S = |det A|·(1), avec det A = 4·□ − □·0. | |4·3 − (−1)·0|

L'application x ↦ Ax, avec A = [[-3,1],[-3,-3]], transforme la région du carré unité [0 ; 1]². Calcule l'aire S de son image.
  [tap, suivre l'erreur, menu menu]  S
    = |(−3)·(−3) − 1·(−3)|   ← aire de l'image = |det A|·aire de départ ; det A = 12
    = 12
  aides : x ↦ Ax multiplie les aires par |det A|. | S = |det A|·(1), avec det A = (−3)·□ − □·(−3). | |(−3)·(−3) − 1·(−3)|

```

### Niveau 4

```
Calcule l'aire S du triangle de sommets P = (3 ; −2), Q = (1 ; 2) et R = (2 ; 5).
  [free, suivre l'erreur]  S
    = (1/2)·|(−2)·7 − (−1)·4|   ← u = Q − P = (−2 ; 4), v = R − P = (−1 ; 7) ; aire = ½·|det[u v]|
    = 5   ← det[u v] = −10 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[-2,-1],[4,7]]| avec u = Q − P et v = R − P en colonnes : S = ½·|(−2)·□ − □·4|. | (1/2)·|(−2)·7 − (−1)·4|
  pièges : l_area_half_abs

Calcule le volume V du parallélépipède construit sur u = (−3 ; 2 ; 0), v = (0 ; 1 ; 3) et w = (2 ; −3 ; 3).
  [free, suivre l'erreur]  det[[-3,0,2],[2,1,-3],[0,3,3]]
    = -3·det[[1,-3],[3,3]]+2·det[[2,1],[0,3]]   ← Développer selon la ligne 1
    = −24   ← Les arêtes en colonnes
  — Le déterminant vaut −24. Le volume ?  [juge value]  départ : V
    = |−24|   ← Valeur absolue
    = 24
  aides : Les trois arêtes issues d'un même sommet en colonnes, puis |det| (et 1/6 pour un tétraèdre). | Les arêtes issues du premier sommet, en colonnes : V = |det[[-3,0,2],[2,1,-3],[0,3,3]]|. | |−24|
  pièges : l_cofactor_sign, l_minor_wrong

Calcule l'aire S du triangle de sommets P = (5 ; 5), Q = (−3 ; −5) et R = (3 ; −5).
  [free, suivre l'erreur]  S
    = (1/2)·|(−8)·(−10) − (−2)·(−10)|   ← u = Q − P = (−8 ; −10), v = R − P = (−2 ; −10) ; aire = ½·|det[u v]|
    = 30   ← det[u v] = 60 : la moitié, en valeur absolue
  aides : Deux côtés issus du même sommet, puis |det| (et ½ pour un triangle). | S = ½·|det[[-8,-2],[-10,-10]]| avec u = Q − P et v = R − P en colonnes : S = ½·|(−8)·□ − □·(−10)|. | (1/2)·|(−8)·(−10) − (−2)·(−10)|
  pièges : l_area_half_abs

```

### Niveau 5

```
L'application x ↦ Ax, avec A = [[-1,4],[2,-2]], transforme la région de l'ellipse x²/1 + y²/1 ≤ 1 (d'aire π·1·1). Calcule l'aire S de son image.
  [free, sans aide]  S
    = |(−1)·(−2) − 4·2|·π·1·1   ← aire de l'image = |det A|·aire de départ ; det A = −6
    = 6π
  pièges : l_area_half_abs

L'application x ↦ Ax, avec A = [[3,-1],[4,1]], transforme la région du triangle de sommets (−1 ; 2), (−2 ; −5) et (1 ; 4). Calcule l'aire S de son image.
  [free, sans aide]  S
    = |3·1 − (−1)·4|·(1/2)·|(−1)·2 − 2·(−7)|   ← aire de l'image = |det A|·aire de départ ; det A = 7
    = 42

L'application x ↦ Ax, avec A = [[4,4],[2,0]], transforme la région du triangle de sommets (−2 ; 2), (−4 ; −1) et (−2 ; 3). Calcule l'aire S de son image.
  [free, sans aide]  S
    = |4·0 − 4·2|·(1/2)·|(−2)·1 − 0·(−3)|   ← aire de l'image = |det A|·aire de départ ; det A = −8
    = 8
  pièges : l_area_half_abs

```

### Variantes d'examen

```
Quelle est l'aire du triangle de sommets (5 ; −2), (−1 ; −2) et (−5 ; 3) ?
  · −15 [l_area_half_abs]   · 30 [l_area_half_abs]   ✔ 15   · −30 [l_area_half_abs]
  [examen mcq]
  pièges : l_area_half_abs

Vrai ou faux ?
  « Si det A = 0, l'image du carré unité par x ↦ Ax est d'aire nulle. » → VRAI
  [examen tf]

```

## Règle de Cramer (`l-det-cramer`, BA1)

_xᵢ = det Aᵢ(b) / det A._

### Niveau 1

```
Résous par la règle de Cramer le système x_1 − x_2 = −7 ; x_1 + 4x_2 = 18, de matrice A = [[1,-1],[1,4]] : calcule det A, puis x₁.
  [guided]  det[[1,-1],[1,4]]
    = 1·4 − (−1)·1   ← Diagonale moins antidiagonale
    = 5
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[-7,-1],[18,4]]/5   (cases à remplir : (1,1) (2,1))   ← Colonne 1 remplacée par b ; det A₁(b) = −10
    = −2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, −1], [□, 4]] / 5 | det[[-7,-1],[18,4]]/5
  pièges : l_cofactor_sign

Résous par la règle de Cramer le système x_1 + x_2 = 1 ; −3x_1 + 2x_2 = 12, de matrice A = [[1,1],[-3,2]] : calcule det A, puis x₁.
  [guided]  det[[1,1],[-3,2]]
    = 1·2 − 1·(−3)   ← Diagonale moins antidiagonale
    = 5
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[1,1],[12,2]]/5   (cases à remplir : (1,1) (2,1))   ← Colonne 1 remplacée par b ; det A₁(b) = −10
    = −2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, 1], [□, 2]] / 5 | det[[1,1],[12,2]]/5
  pièges : l_cofactor_sign

Résous par la règle de Cramer le système 6x_1 − x_2 = 14 ; 4x_1 − x_2 = 10, de matrice A = [[6,-1],[4,-1]] : calcule det A, puis x₂.
  [guided]  det[[6,-1],[4,-1]]
    = 6·(−1) − (−1)·4   ← Diagonale moins antidiagonale
    = −2
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    = det[[6,14],[4,10]]/(-2)   (cases à remplir : (1,2) (2,2))   ← Colonne 2 remplacée par b ; det A₂(b) = 4
    = −2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₂ = det[[6, □], [4, □]] / −2 | det[[6,14],[4,10]]/(-2)
  pièges : l_cofactor_sign

```

### Niveau 2

```
Résous par la règle de Cramer le système −x_1 + x_2 = −1 ; 5x_1 − 4x_2 = 8, de matrice A = [[-1,1],[5,-4]] : calcule det A, puis x₂.
  [guided]  det[[-1,1],[5,-4]]
    = (−1)·(−4) − 1·5   ← Diagonale moins antidiagonale
    = −1
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    ? Que remplacer par b pour calculer x₂ ? · La colonne 1 de A / · La ligne 2 de A / ✔ La colonne 2 de A
    = det[[-1,-1],[5,8]]/(-1)   (cases à remplir : (1,2) (2,2))   ← Colonne 2 remplacée par b ; det A₂(b) = −3
    = 3
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₂ = det[[−1, □], [5, □]] / −1 | det[[-1,-1],[5,8]]/(-1)
  pièges : l_cofactor_sign, l_cramer_row

Résous par la règle de Cramer le système 3x_1 + 4x_2 = 6 ; −x_1 − x_2 = −2, de matrice A = [[3,4],[-1,-1]] : calcule det A, puis x₂.
  [guided]  det[[3,4],[-1,-1]]
    = 3·(−1) − 4·(−1)   ← Diagonale moins antidiagonale
    = 1
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    ? Que remplacer par b pour calculer x₂ ? ✔ La colonne 2 de A / · La ligne 2 de A / · La colonne 1 de A
    = det[[3,6],[-1,-2]]/1   (cases à remplir : (1,2) (2,2))   ← Colonne 2 remplacée par b ; det A₂(b) = 0
    = 0
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₂ = det[[3, □], [−1, □]] / 1 | det[[3,6],[-1,-2]]/1
  pièges : l_cofactor_sign, l_cramer_row

Résous par la règle de Cramer le système −3x_1 + 4x_2 = 21 ; −4x_1 + 5x_2 = 27, de matrice A = [[-3,4],[-4,5]] : calcule det A, puis x₁.
  [guided]  det[[-3,4],[-4,5]]
    = (−3)·5 − 4·(−4)   ← Diagonale moins antidiagonale
    = 1
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    ? Que remplacer par b pour calculer x₁ ? · La colonne 2 de A / · La ligne 1 de A / ✔ La colonne 1 de A
    = det[[21,4],[27,5]]/1   (cases à remplir : (1,1) (2,1))   ← Colonne 1 remplacée par b ; det A₁(b) = −3
    = −3
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, 4], [□, 5]] / 1 | det[[21,4],[27,5]]/1
  pièges : l_cofactor_sign, l_cramer_row

```

### Niveau 3

```
Résous par la règle de Cramer le système 5x_1 + x_2 = −22 ; 5x_1 + 2x_2 = −24, de matrice A = [[5,1],[5,2]] : calcule det A, puis x₁ et x₂.
  [tap, suivre l'erreur, menu menu]  det[[5,1],[5,2]]
    = 5·2 − 1·5   ← Diagonale moins antidiagonale
    = 5
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[-22,1],[-24,2]]/5   ← Colonne 1 remplacée par b ; det A₁(b) = −20
    = −4
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    = det[[5,-22],[5,-24]]/5   ← Colonne 2 remplacée par b ; det A₂(b) = −10
    = −2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, 1], [□, 2]] / 5 | det[[-22,1],[-24,2]]/5
  pièges : l_cofactor_sign

Résous par la règle de Cramer le système −2x_1 − x_2 = −11 ; x_1 + 3x_2 = 18, de matrice A = [[-2,-1],[1,3]] : calcule det A, puis x₁ et x₂.
  [tap, suivre l'erreur, menu menu]  det[[-2,-1],[1,3]]
    = (−2)·3 − (−1)·1   ← Diagonale moins antidiagonale
    = −5
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[-11,-1],[18,3]]/(-5)   ← Colonne 1 remplacée par b ; det A₁(b) = −15
    = 3
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    = det[[-2,-11],[1,18]]/(-5)   ← Colonne 2 remplacée par b ; det A₂(b) = −25
    = 5
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, −1], [□, 3]] / −5 | det[[-11,-1],[18,3]]/(-5)
  pièges : l_cofactor_sign

Résous par la règle de Cramer le système 2x_1 + 2x_2 = 10 ; −2x_1 + 3x_2 = −5, de matrice A = [[2,2],[-2,3]] : calcule det A, puis x₁ et x₂.
  [tap, suivre l'erreur, menu menu]  det[[2,2],[-2,3]]
    = 2·3 − 2·(−2)   ← Diagonale moins antidiagonale
    = 10
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[10,2],[-5,3]]/10   ← Colonne 1 remplacée par b ; det A₁(b) = 40
    = 4
  — x₂ = det A₂(b) / det A, où A₂(b) est A avec la colonne 2 remplacée par b.  [juge mat]  départ : x_2
    = det[[2,10],[-2,-5]]/10   ← Colonne 2 remplacée par b ; det A₂(b) = 10
    = 1
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, 2], [□, 3]] / 10 | det[[10,2],[-5,3]]/10
  pièges : l_cofactor_sign

```

### Niveau 4

```
Résous par la règle de Cramer le système 4x_1 − 3x_2 = 5 ; x_1 − x_2 + x_3 = 4 ; −x_1 + x_2 − 3x_3 = −10, de matrice A = [[4,-3,0],[1,-1,1],[-1,1,-3]] : calcule det A, puis x₁.
  [free, suivre l'erreur]  det[[4,-3,0],[1,-1,1],[-1,1,-3]]
    = 4·det[[-1,1],[1,-3]]+3·det[[1,1],[-1,-3]]   ← Développer selon la ligne 1
    = 2
  — x₁ = det A₁(b) / det A, où A₁(b) est A avec la colonne 1 remplacée par b.  [juge mat]  départ : x_1
    = det[[5,-3,0],[4,-1,1],[-10,1,-3]]/2   ← Colonne 1 remplacée par b ; det A₁(b) = 4
    = 2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₁ = det[[□, −3, 0], [□, −1, 1], [□, 1, −3]] / 2 | det[[5,-3,0],[4,-1,1],[-10,1,-3]]/2
  pièges : l_cofactor_sign, l_minor_wrong

Résous par la règle de Cramer le système −3x_1 + 2x_2 − 2x_3 = 10 ; 2x_1 + 2x_2 = −6 ; −2x_1 − 2x_2 − x_3 = 4, de matrice A = [[-3,2,-2],[2,2,0],[-2,-2,-1]] : calcule det A, puis x₃.
  [free, suivre l'erreur]  det[[-3,2,-2],[2,2,0],[-2,-2,-1]]
    = -3·det[[2,0],[-2,-1]]-2·det[[2,0],[-2,-1]]-2·det[[2,2],[-2,-2]]   ← Développer selon la ligne 1
    = 10
  — x₃ = det A₃(b) / det A, où A₃(b) est A avec la colonne 3 remplacée par b.  [juge mat]  départ : x_3
    = det[[-3,2,10],[2,2,-6],[-2,-2,4]]/10   ← Colonne 3 remplacée par b ; det A₃(b) = 20
    = 2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₃ = det[[−3, 2, □], [2, 2, □], [−2, −2, □]] / 10 | det[[-3,2,10],[2,2,-6],[-2,-2,4]]/10
  pièges : l_cofactor_sign, l_minor_wrong

Résous par la règle de Cramer le système −x_1 − x_2 − 2x_3 = 4 ; 4x_1 − 2x_2 + 3x_3 = −24 ; −x_1 − x_3 = 5, de matrice A = [[-1,-1,-2],[4,-2,3],[-1,0,-1]] : calcule det A, puis x₃.
  [free, suivre l'erreur]  det[[-1,-1,-2],[4,-2,3],[-1,0,-1]]
    = -det[[-2,3],[0,-1]]+det[[4,3],[-1,-1]]-2·det[[4,-2],[-1,0]]   ← Développer selon la ligne 1
    = 1
  — x₃ = det A₃(b) / det A, où A₃(b) est A avec la colonne 3 remplacée par b.  [juge mat]  départ : x_3
    = det[[-1,-1,4],[4,-2,-24],[-1,0,5]]/1   ← Colonne 3 remplacée par b ; det A₃(b) = −2
    = −2
  aides : D'abord det A ; puis remplace la colonne de l'inconnue par b : xᵢ = det Aᵢ(b) / det A. | x₃ = det[[−1, −1, □], [4, −2, □], [−1, 0, □]] / 1 | det[[-1,-1,4],[4,-2,-24],[-1,0,5]]/1
  pièges : l_cofactor_sign, l_minor_wrong

```

### Niveau 5

```
Soit le système a·x_1 − 3x_2 = 1 ; 4x_1 − 2x_2 = 3, de matrice A = [[a,-3],[4,-2]]. Calcule det A, puis x₂ en fonction de a.
  [free, sans aide]  det[[a,-3],[4,-2]]
    = a·(−2) − (−3)·4   ← Diagonale moins antidiagonale
  — Pour a ≠ 6, det A ≠ 0 : x₂ = det A₂(b) / det A.  [juge mat]  départ : x_2
    = det[[a,1],[4,3]]/(-2a+12)   ← Colonne 2 remplacée par b
    = (3a − 4)/(−2a + 12)

Soit le système a·x_1 + 3x_2 = −4 ; 3x_1 + 2x_2 = 1, de matrice A = [[a,3],[3,2]]. Calcule det A, puis x₂ en fonction de a.
  [free, sans aide]  det[[a,3],[3,2]]
    = a·2 − 3·3   ← Diagonale moins antidiagonale
  — Pour a ≠ 9/2, det A ≠ 0 : x₂ = det A₂(b) / det A.  [juge mat]  départ : x_2
    = det[[a,-4],[3,1]]/(2a-9)   ← Colonne 2 remplacée par b
    = (a + 12)/(2a − 9)

Soit le système a·x_1 − 2x_2 = 0 ; 2x_1 + 4x_2 = 3, de matrice A = [[a,-2],[2,4]]. Calcule det A, puis x₂ en fonction de a.
  [free, sans aide]  det[[a,-2],[2,4]]
    = a·4 − (−2)·2   ← Diagonale moins antidiagonale
  — Pour a ≠ −1, det A ≠ 0 : x₂ = det A₂(b) / det A.  [juge mat]  départ : x_2
    = det[[a,0],[2,3]]/(4a+4)   ← Colonne 2 remplacée par b
    = (3a)/(4a + 4)

```

### Variantes d'examen

```
Soit le système 4x_1 − 2x_2 = 14 ; −x_1 + 3x_2 = 4. Par la règle de Cramer, que vaut x₂ ?
  · 30   ✔ 3   · 5   · 22/5 [l_cramer_row]
  [examen mcq]
  pièges : l_cramer_row

```

## Est-ce un sous-espace ? Dans ℝⁿ, Pₙ et M_{m×n} (`l-vs-subspace`, BA1)

_0 dedans, stable par somme et par multiple._

### Niveau 1

```
H = {p = a + bt + ct² ∈ P₂ : p(−1) = 0}. H est un sous-espace : écris un élément de H pour chaque coordonnée libre, puis H comme un Span (coordonnées dans (1, t, t²)).
  [guided]  v_1
    (Élément de H avec b = 1, c = 0)
    = (1 ; 1 ; 0)   (cases à remplir : (1,1))   ← b = 1, c = 0
  — Élément de H avec b = 0, c = 1  [juge mat]  départ : v_2
    = (-1 ; 0 ; 1)   (cases à remplir : (1,1))   ← b = 0, c = 1
  — H comme un Span (coordonnées dans (1, t, t²))  [juge span]  départ : H
    = H = Span{(1 ; 1 ; 0), (-1 ; 0 ; 1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec b = 1 et les autres coordonnées libres à 0 : v₁ = (□ ; 1 ; 0). | H = Span{(1 ; 1 ; 0), (-1 ; 0 ; 1)}

H = {p = a + bt + ct² ∈ P₂ : p(−1) = 0}. H est un sous-espace : écris un élément de H pour chaque coordonnée libre, puis H comme un Span (coordonnées dans (1, t, t²)).
  [guided]  v_1
    (Élément de H avec b = 1, c = 0)
    = (1 ; 1 ; 0)   (cases à remplir : (1,1))   ← b = 1, c = 0
  — Élément de H avec b = 0, c = 1  [juge mat]  départ : v_2
    = (-1 ; 0 ; 1)   (cases à remplir : (1,1))   ← b = 0, c = 1
  — H comme un Span (coordonnées dans (1, t, t²))  [juge span]  départ : H
    = H = Span{(1 ; 1 ; 0), (-1 ; 0 ; 1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec b = 1 et les autres coordonnées libres à 0 : v₁ = (□ ; 1 ; 0). | H = Span{(1 ; 1 ; 0), (-1 ; 0 ; 1)}

H = {p = a + bt + ct² ∈ P₂ : a = −2b + 2c}. H est un sous-espace : écris un élément de H pour chaque coordonnée libre, puis H comme un Span (coordonnées dans (1, t, t²)).
  [guided]  v_1
    (Élément de H avec b = 1, c = 0)
    = (-2 ; 1 ; 0)   (cases à remplir : (1,1))   ← b = 1, c = 0
  — Élément de H avec b = 0, c = 1  [juge mat]  départ : v_2
    = (2 ; 0 ; 1)   (cases à remplir : (1,1))   ← b = 0, c = 1
  — H comme un Span (coordonnées dans (1, t, t²))  [juge span]  départ : H
    = H = Span{(-2 ; 1 ; 0), (2 ; 0 ; 1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec b = 1 et les autres coordonnées libres à 0 : v₁ = (□ ; 1 ; 0). | H = Span{(-2 ; 1 ; 0), (2 ; 0 ; 1)}

```

### Niveau 2

```
H = {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₁x₂ = x₃²}. On donne x = (1 ; 4 ; -2) et y = (1 ; 1 ; 1), deux éléments de H. H est-il un sous-espace de ℝ³ ? Justifie : un Span, ou un contre-exemple.
  [guided]  x + y
    (x + y)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. · Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / ✔ Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (2 ; 5 ; -1)
  — x₁x₂ − x₃² pour x + y  [juge value]  départ : r
    = (2)·(5) − (−1)²
    = 9   ← ≠ 0 : x + y ∉ H
  aides : Une condition non homogène exclut 0 ; une condition non linéaire n'est pas stable par somme ; une inégalité n'est pas stable par −1. | Calcule x + y coefficient par coefficient. | (1 ; 4 ; -2) et (1 ; 1 ; 1) sont dans H, mais pas leur somme (2 ; 5 ; -1) (x₁x₂ − x₃² = 9).
  pièges : l_subspace_nonlinear

H = {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₁x₂ = x₃²}. On donne x = (1 ; 1 ; 1) et y = (1 ; 1 ; -1), deux éléments de H. H est-il un sous-espace de ℝ³ ? Justifie : un Span, ou un contre-exemple.
  [guided]  x + y
    (x + y)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. · Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / ✔ Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (2 ; 2 ; 0)
  — x₁x₂ − x₃² pour x + y  [juge value]  départ : r
    = (2)·(2) − (0)²
    = 4   ← ≠ 0 : x + y ∉ H
  aides : Une condition non homogène exclut 0 ; une condition non linéaire n'est pas stable par somme ; une inégalité n'est pas stable par −1. | Calcule x + y coefficient par coefficient. | (1 ; 1 ; 1) et (1 ; 1 ; -1) sont dans H, mais pas leur somme (2 ; 2 ; 0) (x₁x₂ − x₃² = 4).
  pièges : l_subspace_nonlinear

H = {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₃ = −3x₁ − x₂}. H est-il un sous-espace de ℝ³ ? Justifie : un Span, ou un contre-exemple.
  [guided]  v_1
    (Élément de H avec x₁ = 1, x₂ = 0)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. ✔ Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (1 ; 0 ; -3)   (cases à remplir : (3,1) (1,1))   ← x₁ = 1, x₂ = 0
  — Élément de H avec x₁ = 0, x₂ = 1  [juge mat]  départ : v_2
    = (0 ; 1 ; -1)   (cases à remplir : (3,1) (2,1))   ← x₁ = 0, x₂ = 1
  — H comme un Span (vecteurs)  [juge span]  départ : H
    = H = Span{(1 ; 0 ; -3), (0 ; 1 ; -1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec x₁ = 1 et les autres coordonnées libres à 0 : v₁ = (1 ; 0 ; □). | H = Span{(1 ; 0 ; -3), (0 ; 1 ; -1)}

```

### Niveau 3

```
H = {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₂ = −3x₃}. H est-il un sous-espace de ℝ³ ? Justifie : un Span, ou un contre-exemple.
  [tap, suivre l'erreur, menu menu]  v_1
    (Élément de H avec x₁ = 1, x₃ = 0)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. ✔ Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (1 ; 0 ; 0)   ← x₁ = 1, x₃ = 0
  — Élément de H avec x₁ = 0, x₃ = 1  [juge mat]  départ : v_2
    = (0 ; -3 ; 1)   ← x₁ = 0, x₃ = 1
  — H comme un Span (vecteurs)  [juge span]  départ : H
    = H = Span{(1 ; 0 ; 0), (0 ; -3 ; 1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec x₁ = 1 et les autres coordonnées libres à 0 : v₁ = (1 ; □ ; 0). | H = Span{(1 ; 0 ; 0), (0 ; -3 ; 1)}

H = {p = a + bt + ct² ∈ P₂ : p(1) = 0}. H est-il un sous-espace de P₂ ? Justifie : un Span, ou un contre-exemple.
  [tap, suivre l'erreur, menu menu]  v_1
    (Élément de H avec b = 1, c = 0)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. ✔ Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (-1 ; 1 ; 0)   ← b = 1, c = 0
  — Élément de H avec b = 0, c = 1  [juge mat]  départ : v_2
    = (-1 ; 0 ; 1)   ← b = 0, c = 1
  — H comme un Span (coordonnées dans (1, t, t²))  [juge span]  départ : H
    = H = Span{(-1 ; 1 ; 0), (-1 ; 0 ; 1)}   ← dim H = 2
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec b = 1 et les autres coordonnées libres à 0 : v₁ = (□ ; 1 ; 0). | H = Span{(-1 ; 1 ; 0), (-1 ; 0 ; 1)}

H = {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₃ = −3x₁ − 3x₂ + 2}. H est-il un sous-espace de ℝ³ ? Justifie : un Span, ou un contre-exemple.
  [tap, suivre l'erreur, menu menu]  r
    (Remplace chaque coordonnée par 0 : la condition devient 0 = ?)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. · Oui : la condition est linéaire et homogène, H est un Span / ✔ Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = 2   ← 2 ≠ 0 : 0 ∉ H
  aides : Une condition non homogène exclut 0 ; une condition non linéaire n'est pas stable par somme ; une inégalité n'est pas stable par −1. | Remplace chaque coordonnée par 0 dans la condition. | 0 n'est pas dans H : pour l'élément nul, la condition devient 0 = 2.
  pièges : l_subspace_zero

```

### Niveau 4

```
H = {p = a + bt + ct² ∈ P₂ : p(0)·p(1) = 0}. On donne x = t + t² et y = 1 − t², deux éléments de H. H est-il un sous-espace de P₂ ? Justifie : un Span, ou un contre-exemple.
  [free, suivre l'erreur]  x + y
    (Coordonnées de x + y dans (1, t, t²))
    ? H est-il un sous-espace ? Choisis la justification la plus courte. · Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / ✔ Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (1 ; 1 ; 0)   ← Coefficient par coefficient
  — p(0)·p(1) pour x + y  [juge value]  départ : r
    = 2   ← ≠ 0 : x + y ∉ H
  aides : Une condition non homogène exclut 0 ; une condition non linéaire n'est pas stable par somme ; une inégalité n'est pas stable par −1. | Calcule x + y coefficient par coefficient. | t + t² et 1 − t² sont dans H, mais pas leur somme 1 + t (p(0)·p(1) = 2).
  pièges : l_subspace_nonlinear

H = {p = a + bt + ct² ∈ P₂ : p(0) ≥ 0}. On donne x = 2 − t + t², un élément de H. H est-il un sous-espace de P₂ ? Justifie : un Span, ou un contre-exemple.
  [free, suivre l'erreur]  (−1)·x
    (Coordonnées de (−1)·x dans (1, t, t²))
    ? H est-il un sous-espace ? Choisis la justification la plus courte. · Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / ✔ Non : H n'est pas stable par multiplication par un scalaire
    = (-2 ; 1 ; -1)   ← Coefficient par coefficient
  — Sa valeur en 0  [juge value]  départ : r
    = −2   ← < 0 : (−1)·x ∉ H
  aides : Une condition non homogène exclut 0 ; une condition non linéaire n'est pas stable par somme ; une inégalité n'est pas stable par −1. | Calcule (−1)·x coefficient par coefficient. | 2 − t + t² est dans H, mais pas (−1)·2 − t + t² = −2 + t − t².

H = {p = a + bt + ct² + dt³ ∈ P₃ : a = −2b − 3d}. H est-il un sous-espace de P₃ ? Justifie : un Span, ou un contre-exemple.
  [free, suivre l'erreur]  v_1
    (Élément de H avec b = 1, c = 0, d = 0)
    ? H est-il un sous-espace ? Choisis la justification la plus courte. ✔ Oui : la condition est linéaire et homogène, H est un Span / · Non : 0 n'est pas dans H / · Non : H n'est pas stable par somme / · Non : H n'est pas stable par multiplication par un scalaire
    = (-2 ; 1 ; 0 ; 0)   ← b = 1, c = 0, d = 0
  — Élément de H avec b = 0, c = 1, d = 0  [juge mat]  départ : v_2
    = (0 ; 0 ; 1 ; 0)   ← b = 0, c = 1, d = 0
  — Élément de H avec b = 0, c = 0, d = 1  [juge mat]  départ : v_3
    = (-3 ; 0 ; 0 ; 1)   ← b = 0, c = 0, d = 1
  — H comme un Span (coordonnées dans (1, t, t², t³))  [juge span]  départ : H
    = H = Span{(-2 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 0), (-3 ; 0 ; 0 ; 1)}   ← dim H = 3
  aides : Exprime un élément de H avec des paramètres libres : si c'est une combinaison fixe de vecteurs, H est un Span. | Avec b = 1 et les autres coordonnées libres à 0 : v₁ = (□ ; 1 ; 0 ; 0). | H = Span{(-2 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 0), (-3 ; 0 ; 0 ; 1)}

```

### Niveau 5

```
Combien de ces ensembles sont des sous-espaces vectoriels ? (1) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a + d = −1} (2) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a ≥ 0} (3) {p = a + bt + ct² ∈ P₂ : a = −2b + c} (4) {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₁x₂ = x₃²}
  · 0   ✔ 1   · 2 [l_subspace_zero]   · 3
  pièges : l_subspace_zero

Combien de ces ensembles sont des sous-espaces vectoriels ? (1) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a + d = −1} (2) {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₁x₂ = x₃²} (3) {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₃ = −3x₁ − 2x₂} (4) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a ≥ 0}
  · 2 [l_subspace_zero]   · 3   ✔ 1   · 0
  pièges : l_subspace_zero

Combien de ces ensembles sont des sous-espaces vectoriels ? (1) {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₁² = x₂²} (2) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a = −2b − c − 3d} (3) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a = 3b − 3c − 3d + 5} (4) {(x₁ ; x₂ ; x₃) ∈ ℝ³ : x₃ = −3x₂}
  · 3 [l_subspace_zero]   · 1   · 0   ✔ 2
  pièges : l_subspace_zero

```

### Variantes d'examen

```
Combien de ces ensembles sont des sous-espaces vectoriels ? (1) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : det A = 0} (2) {p = a + bt + ct² ∈ P₂ : a = 3b − 3c − 1} (3) {p = a + bt + ct² ∈ P₂ : a² = b²} (4) {A = [[a,b],[c,d]] ∈ M₂ₓ₂ : a + d = 0}
  ✔ 1   · 0   · 2 [l_subspace_zero]   · 3 [l_subspace_nonlinear]
  [examen mcq]
  pièges : l_subspace_zero, l_subspace_nonlinear

Vrai ou faux ?
  « {A ∈ M₂ₓ₂ : det A = 0} est un sous-espace de M₂ₓ₂. » → FAUX
    contre-exemple (setWitness) : x = [[0,1],[0,0]], y = [[0,0],[1,0]]
  [examen tf]
  pièges : l_subspace_nonlinear

```

## Noyau : base de Ker A (`l-vs-kernel`, BA1)

_Une variable libre, un vecteur de base._

### Niveau 1

```
A = [[1,-1,-2,2],[0,1,0,-1],[2,-2,-3,2]] a pour forme réduite R = [[1,0,0,-3],[0,1,0,-1],[0,0,1,-2]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₄)
    = (3 ; 1 ; 2 ; 1)   (cases à remplir : (1,1) (2,1) (3,1))   ← x₄ = 1
  — Une base de Ker A  [juge span]  départ : [[1,0,0,-3],[0,1,0,-1],[0,0,1,-2]]
    = Ker A = Span{(3 ; 1 ; 2 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 1
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = 3x₄ ; x₂ = x₄ ; x₃ = 2x₄. | Ker A = Span{(3 ; 1 ; 2 ; 1)}

A = [[1,1,-1,0],[0,0,0,1],[-2,-2,2,0]] a pour forme réduite R = [[1,1,-1,0],[0,0,0,1],[0,0,0,0]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₂)
    = (-1 ; 1 ; 0 ; 0)   (cases à remplir : (1,1) (4,1))   ← x₂ = 1, x₃ = 0
  — Vecteur de x₃  [juge mat]  départ : v_2
    = (1 ; 0 ; 1 ; 0)   (cases à remplir : (1,1) (4,1))   ← x₂ = 0, x₃ = 1
  — Une base de Ker A  [juge span]  départ : [[1,1,-1,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(-1 ; 1 ; 0 ; 0), (1 ; 0 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −x₂ + x₃ ; x₄ = 0. | Ker A = Span{(-1 ; 1 ; 0 ; 0), (1 ; 0 ; 1 ; 0)}

A = [[1,-3,-2,0],[3,-9,-6,1],[1,-3,-2,0]] a pour forme réduite R = [[1,-3,-2,0],[0,0,0,1],[0,0,0,0]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₂)
    = (3 ; 1 ; 0 ; 0)   (cases à remplir : (1,1) (4,1))   ← x₂ = 1, x₃ = 0
  — Vecteur de x₃  [juge mat]  départ : v_2
    = (2 ; 0 ; 1 ; 0)   (cases à remplir : (1,1) (4,1))   ← x₂ = 0, x₃ = 1
  — Une base de Ker A  [juge span]  départ : [[1,-3,-2,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(3 ; 1 ; 0 ; 0), (2 ; 0 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = 3x₂ + 2x₃ ; x₄ = 0. | Ker A = Span{(3 ; 1 ; 0 ; 0), (2 ; 0 ; 1 ; 0)}

```

### Niveau 2

```
A = [[1,1,2,0],[0,0,0,1],[2,2,4,3]] a pour forme réduite R = [[1,1,2,0],[0,0,0,1],[0,0,0,0]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₂)
    ? Quelles variables sont libres ? · x₄ / ✔ x₂ et x₃ / · x₁ et x₄
    = (-1 ; 1 ; 0 ; 0)   (cases à remplir : (1,1) (2,1) (3,1) (4,1))   ← x₂ = 1, x₃ = 0
  — Vecteur de x₃  [juge mat]  départ : v_2
    = (-2 ; 0 ; 1 ; 0)   (cases à remplir : (1,1) (2,1) (3,1) (4,1))   ← x₂ = 0, x₃ = 1
  — Une base de Ker A  [juge span]  départ : [[1,1,2,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(-1 ; 1 ; 0 ; 0), (-2 ; 0 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −x₂ − 2x₃ ; x₄ = 0. | Ker A = Span{(-1 ; 1 ; 0 ; 0), (-2 ; 0 ; 1 ; 0)}

A = [[-1,1,0,5],[1,0,0,-3],[0,0,1,0]] a pour forme réduite R = [[1,0,0,-3],[0,1,0,2],[0,0,1,0]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₄)
    ? Quelles variables sont libres ? ✔ x₄ / · x₁, x₂ et x₃
    = (3 ; -2 ; 0 ; 1)   (cases à remplir : (1,1) (2,1) (3,1) (4,1))   ← x₄ = 1
  — Une base de Ker A  [juge span]  départ : [[1,0,0,-3],[0,1,0,2],[0,0,1,0]]
    = Ker A = Span{(3 ; -2 ; 0 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 1
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = 3x₄ ; x₂ = −2x₄ ; x₃ = 0. | Ker A = Span{(3 ; -2 ; 0 ; 1)}

A = [[1,0,1,2],[2,-2,8,8],[0,1,-3,-2]] a pour forme réduite R = [[1,0,1,2],[0,1,-3,-2],[0,0,0,0]]. Écris le vecteur de chaque variable libre, puis une base de Ker A.
  [guided]  v_1
    (Vecteur de x₃)
    ? Quelles variables sont libres ? ✔ x₃ et x₄ / · x₄ / · x₁ et x₂
    = (-1 ; 3 ; 1 ; 0)   (cases à remplir : (1,1) (2,1) (3,1) (4,1))   ← x₃ = 1, x₄ = 0
  — Vecteur de x₄  [juge mat]  départ : v_2
    = (-2 ; 2 ; 0 ; 1)   (cases à remplir : (1,1) (2,1) (3,1) (4,1))   ← x₃ = 0, x₄ = 1
  — Une base de Ker A  [juge span]  départ : [[1,0,1,2],[0,1,-3,-2],[0,0,0,0]]
    = Ker A = Span{(-1 ; 3 ; 1 ; 0), (-2 ; 2 ; 0 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −x₃ − 2x₄ ; x₂ = 3x₃ + 2x₄. | Ker A = Span{(-1 ; 3 ; 1 ; 0), (-2 ; 2 ; 0 ; 1)}

```

### Niveau 3

```
Donne une base de Ker A, pour A = [[1,2,-2,3],[0,0,0,1],[-1,-2,2,1]] : choisis chaque opération, puis écris la base.
  [tap, suivre l'erreur, menu rowops]  [[1,2,-2,3],[0,0,0,1],[-1,-2,2,1]]
    = L3 ← L3 + L1 : [[1,2,-2,3],[0,0,0,1],[0,0,0,4]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 - 4L2 : [[1,2,-2,3],[0,0,0,1],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − 4L₂
    = L1 ← L1 - 3L2 : [[1,2,-2,0],[0,0,0,1],[0,0,0,0]]   ← Remonter : L₁ ← L₁ − 3L₂
  — Une base de Ker A  [juge span]  départ : [[1,2,-2,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(-2 ; 1 ; 0 ; 0), (2 ; 0 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −2x₂ + 2x₃ ; x₄ = 0. | Ker A = Span{(-2 ; 1 ; 0 ; 0), (2 ; 0 ; 1 ; 0)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Donne une base de Ker A, pour A = [[1,-3,0,-3],[-1,3,1,0],[-1,3,0,3]] : choisis chaque opération, puis écris la base.
  [tap, suivre l'erreur, menu rowops]  [[1,-3,0,-3],[-1,3,1,0],[-1,3,0,3]]
    = L2 ← L2 + L1 : [[1,-3,0,-3],[0,0,1,-3],[-1,3,0,3]]   ← Descendre : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,-3,0,-3],[0,0,1,-3],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + L₁
  — Une base de Ker A  [juge span]  départ : [[1,-3,0,-3],[0,0,1,-3],[0,0,0,0]]
    = Ker A = Span{(3 ; 1 ; 0 ; 0), (3 ; 0 ; 3 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = 3x₂ + 3x₄ ; x₃ = 3x₄. | Ker A = Span{(3 ; 1 ; 0 ; 0), (3 ; 0 ; 3 ; 1)}
  pièges : l_rowop_sign, l_rowop_wrong_row

Donne une base de Ker A, pour A = [[1,0,-1,-1],[0,1,-3,-6],[0,0,1,2]] : choisis chaque opération, puis écris la base.
  [tap, suivre l'erreur, menu rowops]  [[1,0,-1,-1],[0,1,-3,-6],[0,0,1,2]]
    = L2 ← L2 + 3L3 : [[1,0,-1,-1],[0,1,0,0],[0,0,1,2]]   ← Remonter : L₂ ← L₂ + 3L₃
    = L1 ← L1 + L3 : [[1,0,0,1],[0,1,0,0],[0,0,1,2]]   ← Remonter : L₁ ← L₁ + L₃
  — Une base de Ker A  [juge span]  départ : [[1,0,0,1],[0,1,0,0],[0,0,1,2]]
    = Ker A = Span{(-1 ; 0 ; -2 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 1
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −x₄ ; x₂ = 0 ; x₃ = −2x₄. | Ker A = Span{(-1 ; 0 ; -2 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Donne une base de Ker A, pour A = [[-2,-2,2,-6],[1,2,0,3],[1,1,-1,3]].
  [free, suivre l'erreur]  [[-2,-2,2,-6],[1,2,0,3],[1,1,-1,3]]
    = L2 ← L2 + (1/2)L1 : [[-2,-2,2,-6],[0,1,1,0],[1,1,-1,3]]   ← Descendre : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 + (1/2)L1 : [[-2,-2,2,-6],[0,1,1,0],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + (1/2)L₁
    = L1 ← L1 + 2L2 : [[-2,0,4,-6],[0,1,1,0],[0,0,0,0]]   ← Remonter : L₁ ← L₁ + 2L₂
    = L1 ← -(1/2)L1 : [[1,0,-2,3],[0,1,1,0],[0,0,0,0]]   ← Pivot à 1
  — Une base de Ker A  [juge span]  départ : [[1,0,-2,3],[0,1,1,0],[0,0,0,0]]
    = Ker A = Span{(2 ; -1 ; 1 ; 0), (-3 ; 0 ; 0 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = 2x₃ − 3x₄ ; x₂ = −x₃. | Ker A = Span{(2 ; -1 ; 1 ; 0), (-3 ; 0 ; 0 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Donne une base de Ker A, pour A = [[1,0,-1,0,0],[0,1,2,0,3],[0,-2,-4,1,-6]].
  [free, suivre l'erreur]  [[1,0,-1,0,0],[0,1,2,0,3],[0,-2,-4,1,-6]]
    = L3 ← L3 + 2L2 : [[1,0,-1,0,0],[0,1,2,0,3],[0,0,0,1,0]]   ← Descendre : L₃ ← L₃ + 2L₂
  — Une base de Ker A  [juge span]  départ : [[1,0,-1,0,0],[0,1,2,0,3],[0,0,0,1,0]]
    = Ker A = Span{(1 ; -2 ; 1 ; 0 ; 0), (0 ; -3 ; 0 ; 0 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = x₃ ; x₂ = −2x₃ − 3x₅ ; x₄ = 0. | Ker A = Span{(1 ; -2 ; 1 ; 0 ; 0), (0 ; -3 ; 0 ; 0 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Donne une base de Ker A, pour A = [[-1,-3,1,3],[0,0,-1,-1],[1,3,2,0]].
  [free, suivre l'erreur]  [[-1,-3,1,3],[0,0,-1,-1],[1,3,2,0]]
    = L3 ← L3 + L1 : [[-1,-3,1,3],[0,0,-1,-1],[0,0,3,3]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 + 3L2 : [[-1,-3,1,3],[0,0,-1,-1],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + 3L₂
    = L2 ← -L2 : [[-1,-3,1,3],[0,0,1,1],[0,0,0,0]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[-1,-3,0,2],[0,0,1,1],[0,0,0,0]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,3,0,-2],[0,0,1,1],[0,0,0,0]]   ← Pivot à 1
  — Une base de Ker A  [juge span]  départ : [[1,3,0,-2],[0,0,1,1],[0,0,0,0]]
    = Ker A = Span{(-3 ; 1 ; 0 ; 0), (2 ; 0 ; -1 ; 1)}   ← Une variable libre, un vecteur : dim Ker A = 2
  aides : Une variable libre = un vecteur de base : mets-la à 1, les autres libres à 0, et lis les variables pivots sur R (avec le signe changé). | Solution générale : x₁ = −3x₂ + 2x₄ ; x₃ = −x₄. | Ker A = Span{(-3 ; 1 ; 0 ; 0), (2 ; 0 ; -1 ; 1)}
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 5

```
Soit T(x₁, x₂, x₃, x₄) = (x₁ + x₃ − 5x₄ ; x₁ + x₂ − x₃ − 2x₄ ; x₁ − 2x₄). Donne une base de Ker T : réduis sa matrice, puis écris Ker T = Span{…}.
  [free, sans aide]  [[1,0,1,-5],[1,1,-1,-2],[1,0,0,-2]]
    = L2 ← L2 - L1 : [[1,0,1,-5],[0,1,-2,3],[1,0,0,-2]]   ← Descendre : L₂ ← L₂ − L₁
    = L3 ← L3 - L1 : [[1,0,1,-5],[0,1,-2,3],[0,0,-1,3]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← -L3 : [[1,0,1,-5],[0,1,-2,3],[0,0,1,-3]]   ← Pivot à 1
    = L2 ← L2 + 2L3 : [[1,0,1,-5],[0,1,0,-3],[0,0,1,-3]]   ← Remonter : L₂ ← L₂ + 2L₃
    = L1 ← L1 - L3 : [[1,0,0,-2],[0,1,0,-3],[0,0,1,-3]]   ← Remonter : L₁ ← L₁ − L₃
  — Une base de Ker T  [juge span]  départ : [[1,0,0,-2],[0,1,0,-3],[0,0,1,-3]]
    = Ker T = Span{(2 ; 3 ; 3 ; 1)}   ← Une variable libre, un vecteur : dim Ker T = 1
  pièges : l_rowop_sign, l_rowop_wrong_row

Soit T(x₁, x₂, x₃, x₄) = (x₁ + 2x₂ + 3x₃ ; x₂ + x₃ ; −2x₂ − 2x₃ + x₄). Donne une base de Ker T : réduis sa matrice, puis écris Ker T = Span{…}.
  [free, sans aide]  [[1,2,3,0],[0,1,1,0],[0,-2,-2,1]]
    = L3 ← L3 + 2L2 : [[1,2,3,0],[0,1,1,0],[0,0,0,1]]   ← Descendre : L₃ ← L₃ + 2L₂
    = L1 ← L1 - 2L2 : [[1,0,1,0],[0,1,1,0],[0,0,0,1]]   ← Remonter : L₁ ← L₁ − 2L₂
  — Une base de Ker T  [juge span]  départ : [[1,0,1,0],[0,1,1,0],[0,0,0,1]]
    = Ker T = Span{(-1 ; -1 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker T = 1
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit T(x₁, x₂, x₃, x₄, x₅) = (x₁ − x₂ + x₃ − 2x₄ − x₅ ; x₅ ; −x₁ + x₂ − x₃ + 2x₄ + 2x₅). Donne une base de Ker T : réduis sa matrice, puis écris Ker T = Span{…}.
  [free, sans aide]  [[1,-1,1,-2,-1],[0,0,0,0,1],[-1,1,-1,2,2]]
    = L3 ← L3 + L1 : [[1,-1,1,-2,-1],[0,0,0,0,1],[0,0,0,0,1]]   ← Descendre : L₃ ← L₃ + L₁
    = L3 ← L3 - L2 : [[1,-1,1,-2,-1],[0,0,0,0,1],[0,0,0,0,0]]   ← Descendre : L₃ ← L₃ − L₂
    = L1 ← L1 + L2 : [[1,-1,1,-2,0],[0,0,0,0,1],[0,0,0,0,0]]   ← Remonter : L₁ ← L₁ + L₂
  — Une base de Ker T  [juge span]  départ : [[1,-1,1,-2,0],[0,0,0,0,1],[0,0,0,0,0]]
    = Ker T = Span{(1 ; 1 ; 0 ; 0 ; 0), (-1 ; 0 ; 1 ; 0 ; 0), (2 ; 0 ; 0 ; 1 ; 0)}   ← Une variable libre, un vecteur : dim Ker T = 3
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Variantes d'examen

```
Soit A = [[1,3,0,0],[-2,-6,1,-1],[3,9,0,0]]. Laquelle de ces familles est une base de Ker A ?
  · Span{(-3 ; 1 ; 0 ; 0)}   · Span{(3 ; 1 ; 0 ; 0), (0 ; 0 ; -1 ; 1)} [l_ker_sign]   · Span{(1 ; 3 ; 0 ; 0), (0 ; 0 ; 1 ; -1)} [l_ker_from_rows]   ✔ Span{(-3 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 1)}
  [examen mcq]
  pièges : l_ker_sign, l_ker_from_rows

Vrai ou faux ?
  « Soit A = [[1,3,0,0],[-1,-3,-1,1],[0,0,1,-1]], de forme réduite R = [[1,3,0,0],[0,0,1,-1],[0,0,0,0]]. Les vecteurs (3 ; 1 ; 0 ; 0), (0 ; 0 ; -1 ; 1) forment une base de Ker A. » → FAUX
    contre-exemple (vecFamily) : v = (3 ; 1 ; 0 ; 0)
  [examen tf]
  pièges : l_ker_sign

```

## Image (Col A) et espace des lignes (Lgn A) (`l-vs-col-row`, BA1)

_Colonnes pivots de A ; lignes non nulles de R._

### Niveau 1

```
A = [[1,-2,3,0],[0,0,0,1],[0,0,0,1]] a pour forme réduite R = [[1,-2,3,0],[0,0,0,1],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 4)   (cases à remplir : (1,1) (2,1))   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,-2,3,0],[0,0,0,1],[0,0,0,1]]
    = Col A = Span{(1 ; 0 ; 0), (0 ; 1 ; 1)}   ← Colonnes 1 et 4 de A
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; 0), (0 ; 1 ; 1)}

A = [[1,-3,2,3],[0,0,2,6],[0,0,1,3]] a pour forme réduite R = [[1,-3,0,-3],[0,0,1,3],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 3)   (cases à remplir : (1,1) (2,1))   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,-3,2,3],[0,0,2,6],[0,0,1,3]]
    = Col A = Span{(1 ; 0 ; 0), (2 ; 2 ; 1)}   ← Colonnes 1 et 3 de A
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₃}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; 0), (2 ; 2 ; 1)}

A = [[1,2,2,5],[0,0,1,1],[-1,-2,-1,-4]] a pour forme réduite R = [[1,2,0,3],[0,0,1,1],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 3)   (cases à remplir : (1,1) (2,1))   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,2,2,5],[0,0,1,1],[-1,-2,-1,-4]]
    = Col A = Span{(1 ; 0 ; -1), (2 ; 1 ; -1)}   ← Colonnes 1 et 3 de A
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₃}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; -1), (2 ; 1 ; -1)}

```

### Niveau 2

```
A = [[1,1,-2,1],[0,0,0,1],[1,1,-2,2]] a pour forme réduite R = [[1,1,-2,0],[0,0,0,1],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A et Lgn A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 4)   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,1,-2,1],[0,0,0,1],[1,1,-2,2]]
    ? Où prendre les vecteurs de Col A ? ✔ Les colonnes pivots de A / · Les colonnes pivots de R
    = Col A = Span{(1 ; 0 ; 1), (1 ; 1 ; 2)}   ← Colonnes 1 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,1,-2,0],[0,0,0,1],[0,0,0,0]]
    ? Où prendre les vecteurs de Lgn A ? ✔ Les lignes non nulles de R / · Les lignes de A aux positions des lignes pivots de R
    = Lgn A = Span{(1 ; 1 ; -2 ; 0), (0 ; 0 ; 0 ; 1)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; 1), (1 ; 1 ; 2)}
  pièges : l_col_from_rref, l_row_from_A

A = [[1,-3,-2,0],[0,0,0,1],[-2,6,4,0]] a pour forme réduite R = [[1,-3,-2,0],[0,0,0,1],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A et Lgn A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 4)   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,-3,-2,0],[0,0,0,1],[-2,6,4,0]]
    ? Où prendre les vecteurs de Col A ? ✔ Les colonnes pivots de A / · Les colonnes pivots de R
    = Col A = Span{(1 ; 0 ; -2), (0 ; 1 ; 0)}   ← Colonnes 1 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,-3,-2,0],[0,0,0,1],[0,0,0,0]]
    ? Où prendre les vecteurs de Lgn A ? ✔ Les lignes non nulles de R / · Les lignes de A aux positions des lignes pivots de R
    = Lgn A = Span{(1 ; -3 ; -2 ; 0), (0 ; 0 ; 0 ; 1)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; -2), (0 ; 1 ; 0)}
  pièges : l_col_from_rref, l_row_from_A

A = [[1,2,0,-2],[0,0,1,-1],[1,2,0,-2]] a pour forme réduite R = [[1,2,0,-2],[0,0,1,-1],[0,0,0,0]]. Donne les colonnes pivots, puis une base de Col A et Lgn A.
  [guided]  colonnes
    (Les numéros des colonnes pivots, lus sur R, sous la forme (1 ; 3))
    = (1 ; 3)   ← Lues sur R
  — Une base de Col A  [juge span]  départ : [[1,2,0,-2],[0,0,1,-1],[1,2,0,-2]]
    ? Où prendre les vecteurs de Col A ? ✔ Les colonnes pivots de A / · Les colonnes pivots de R
    = Col A = Span{(1 ; 0 ; 1), (0 ; 1 ; 0)}   ← Colonnes 1 et 3 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,2,0,-2],[0,0,1,-1],[0,0,0,0]]
    ? Où prendre les vecteurs de Lgn A ? ✔ Les lignes non nulles de R / · Les lignes de A aux positions des lignes pivots de R
    = Lgn A = Span{(1 ; 2 ; 0 ; -2), (0 ; 0 ; 1 ; -1)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₃}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; 1), (0 ; 1 ; 0)}
  pièges : l_col_from_rref, l_row_from_A

```

### Niveau 3

```
Soit A = [[1,-2,0,1],[2,-4,1,0],[1,-2,0,1]]. Réduis A, puis donne une base de Col A, Lgn A et Ker A : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,-2,0,1],[2,-4,1,0],[1,-2,0,1]]
    = L2 ← L2 - 2L1 : [[1,-2,0,1],[0,0,1,-2],[1,-2,0,1]]   ← Descendre : L₂ ← L₂ − 2L₁
    = L3 ← L3 - L1 : [[1,-2,0,1],[0,0,1,-2],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − L₁
  — Une base de Col A  [juge span]  départ : [[1,-2,0,1],[2,-4,1,0],[1,-2,0,1]]
    = Col A = Span{(1 ; 2 ; 1), (0 ; 1 ; 0)}   ← Colonnes 1 et 3 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,-2,0,1],[0,0,1,-2],[0,0,0,0]]
    = Lgn A = Span{(1 ; -2 ; 0 ; 1), (0 ; 0 ; 1 ; -2)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,-2,0,1],[0,0,1,-2],[0,0,0,0]]
    = Ker A = Span{(2 ; 1 ; 0 ; 0), (-1 ; 0 ; 2 ; 1)}   ← rang A + dim Ker A = 2 + 2 = 4
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₃}, avec les colonnes de A. | Col A = Span{(1 ; 2 ; 1), (0 ; 1 ; 0)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[-2,-4,2,0],[1,2,-1,-1],[0,0,0,1]]. Réduis A, puis donne une base de Col A, Lgn A et Ker A : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[-2,-4,2,0],[1,2,-1,-1],[0,0,0,1]]
    = L2 ← L2 + (1/2)L1 : [[-2,-4,2,0],[0,0,0,-1],[0,0,0,1]]   ← Descendre : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 + L2 : [[-2,-4,2,0],[0,0,0,-1],[0,0,0,0]]   ← Descendre : L₃ ← L₃ + L₂
    = L2 ← -L2 : [[-2,-4,2,0],[0,0,0,1],[0,0,0,0]]   ← Pivot à 1
    = L1 ← -(1/2)L1 : [[1,2,-1,0],[0,0,0,1],[0,0,0,0]]   ← Pivot à 1
  — Une base de Col A  [juge span]  départ : [[-2,-4,2,0],[1,2,-1,-1],[0,0,0,1]]
    = Col A = Span{(-2 ; 1 ; 0), (0 ; -1 ; 1)}   ← Colonnes 1 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,2,-1,0],[0,0,0,1],[0,0,0,0]]
    = Lgn A = Span{(1 ; 2 ; -1 ; 0), (0 ; 0 ; 0 ; 1)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,2,-1,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(-2 ; 1 ; 0 ; 0), (1 ; 0 ; 1 ; 0)}   ← rang A + dim Ker A = 2 + 2 = 4
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(-2 ; 1 ; 0), (0 ; -1 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[1,-2,-1,-1],[0,0,1,1],[2,-4,-2,-2]]. Réduis A, puis donne une base de Col A, Lgn A et Ker A : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,-2,-1,-1],[0,0,1,1],[2,-4,-2,-2]]
    = L3 ← L3 - 2L1 : [[1,-2,-1,-1],[0,0,1,1],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − 2L₁
    = L1 ← L1 + L2 : [[1,-2,0,0],[0,0,1,1],[0,0,0,0]]   ← Remonter : L₁ ← L₁ + L₂
  — Une base de Col A  [juge span]  départ : [[1,-2,-1,-1],[0,0,1,1],[2,-4,-2,-2]]
    = Col A = Span{(1 ; 0 ; 2), (-1 ; 1 ; -2)}   ← Colonnes 1 et 3 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,-2,0,0],[0,0,1,1],[0,0,0,0]]
    = Lgn A = Span{(1 ; -2 ; 0 ; 0), (0 ; 0 ; 1 ; 1)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,-2,0,0],[0,0,1,1],[0,0,0,0]]
    = Ker A = Span{(2 ; 1 ; 0 ; 0), (0 ; 0 ; -1 ; 1)}   ← rang A + dim Ker A = 2 + 2 = 4
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₃}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; 2), (-1 ; 1 ; -2)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 4

```
Soit A = [[1,-1,1,-1,-4],[2,-2,2,-1,-7],[0,0,0,-2,-2]]. Réduis A, puis donne une base de Col A et Lgn A.
  [free, suivre l'erreur]  [[1,-1,1,-1,-4],[2,-2,2,-1,-7],[0,0,0,-2,-2]]
    = L2 ← L2 - 2L1 : [[1,-1,1,-1,-4],[0,0,0,1,1],[0,0,0,-2,-2]]   ← Descendre : L₂ ← L₂ − 2L₁
    = L3 ← L3 + 2L2 : [[1,-1,1,-1,-4],[0,0,0,1,1],[0,0,0,0,0]]   ← Descendre : L₃ ← L₃ + 2L₂
    = L1 ← L1 + L2 : [[1,-1,1,0,-3],[0,0,0,1,1],[0,0,0,0,0]]   ← Remonter : L₁ ← L₁ + L₂
  — Une base de Col A  [juge span]  départ : [[1,-1,1,-1,-4],[2,-2,2,-1,-7],[0,0,0,-2,-2]]
    = Col A = Span{(1 ; 2 ; 0), (-1 ; -1 ; -2)}   ← Colonnes 1 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,-1,1,0,-3],[0,0,0,1,1],[0,0,0,0,0]]
    = Lgn A = Span{(1 ; -1 ; 1 ; 0 ; -3), (0 ; 0 ; 0 ; 1 ; 1)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(1 ; 2 ; 0), (-1 ; -1 ; -2)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[1,0,1,0,1],[0,1,3,3,2],[-1,0,-1,0,-1]]. Réduis A, puis donne une base de Col A et Lgn A.
  [free, suivre l'erreur]  [[1,0,1,0,1],[0,1,3,3,2],[-1,0,-1,0,-1]]
    = L3 ← L3 + L1 : [[1,0,1,0,1],[0,1,3,3,2],[0,0,0,0,0]]   ← Descendre : L₃ ← L₃ + L₁
  — Une base de Col A  [juge span]  départ : [[1,0,1,0,1],[0,1,3,3,2],[-1,0,-1,0,-1]]
    = Col A = Span{(1 ; 0 ; -1), (0 ; 1 ; 0)}   ← Colonnes 1 et 2 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,0,1,0,1],[0,1,3,3,2],[0,0,0,0,0]]
    = Lgn A = Span{(1 ; 0 ; 1 ; 0 ; 1), (0 ; 1 ; 3 ; 3 ; 2)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₂}, avec les colonnes de A. | Col A = Span{(1 ; 0 ; -1), (0 ; 1 ; 0)}
  pièges : l_rowop_sign, l_rowop_wrong_row

Soit A = [[2,2,4,1,-1],[1,1,2,0,-1],[2,2,4,0,-2]]. Réduis A, puis donne une base de Col A et Lgn A.
  [free, suivre l'erreur]  [[2,2,4,1,-1],[1,1,2,0,-1],[2,2,4,0,-2]]
    = L2 ← L2 - (1/2)L1 : [[2,2,4,1,-1],[0,0,0,-1/2,-1/2],[2,2,4,0,-2]]   ← Descendre : L₂ ← L₂ − (1/2)L₁
    = L3 ← L3 - L1 : [[2,2,4,1,-1],[0,0,0,-1/2,-1/2],[0,0,0,-1,-1]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 - 2L2 : [[2,2,4,1,-1],[0,0,0,-1/2,-1/2],[0,0,0,0,0]]   ← Descendre : L₃ ← L₃ − 2L₂
    = L2 ← -2L2 : [[2,2,4,1,-1],[0,0,0,1,1],[0,0,0,0,0]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[2,2,4,0,-2],[0,0,0,1,1],[0,0,0,0,0]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← (1/2)L1 : [[1,1,2,0,-1],[0,0,0,1,1],[0,0,0,0,0]]   ← Pivot à 1
  — Une base de Col A  [juge span]  départ : [[2,2,4,1,-1],[1,1,2,0,-1],[2,2,4,0,-2]]
    = Col A = Span{(2 ; 1 ; 2), (1 ; 0 ; 0)}   ← Colonnes 1 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,1,2,0,-1],[0,0,0,1,1],[0,0,0,0,0]]
    = Lgn A = Span{(1 ; 1 ; 2 ; 0 ; -1), (0 ; 0 ; 0 ; 1 ; 1)}   ← Lignes non nulles de R
  aides : Les pivots se lisent sur R, mais les vecteurs de Col A se prennent dans A. Lgn A : les lignes non nulles de R. | Col A = Span{a₁, a₄}, avec les colonnes de A. | Col A = Span{(2 ; 1 ; 2), (1 ; 0 ; 0)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
Soit A = [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[2,0,1,0]]. Réduis A, puis donne une base de Col A, Lgn A et Ker A.
  [free, sans aide]  [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[2,0,1,0]]
    = L4 ← L4 - 2L1 : [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[0,0,1,2]]   ← Descendre : L₄ ← L₄ − 2L₁
    = L4 ← L4 - L3 : [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[0,0,0,0]]   ← Descendre : L₄ ← L₄ − L₃
  — Une base de Col A  [juge span]  départ : [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[2,0,1,0]]
    = Col A = Span{(1 ; 0 ; 0 ; 2), (0 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 1)}   ← Colonnes 1, 2 et 3 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[0,0,0,0]]
    = Lgn A = Span{(1 ; 0 ; 0 ; -1), (0 ; 1 ; 0 ; -3), (0 ; 0 ; 1 ; 2)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,0,0,-1],[0,1,0,-3],[0,0,1,2],[0,0,0,0]]
    = Ker A = Span{(1 ; 3 ; -2 ; 1)}   ← rang A + dim Ker A = 3 + 1 = 4
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit T : ℝ⁴ → ℝ³ telle que T(e₁) = (1 ; 0 ; 2), T(e₂) = (-3 ; 0 ; -6), T(e₃) = (-1 ; 1 ; -2), T(e₄) = (1 ; -2 ; 2), et A sa matrice canonique (Col A = Im T). Réduis A, puis donne une base de Col A, Lgn A et Ker A.
  [free, sans aide]  [[1,-3,-1,1],[0,0,1,-2],[2,-6,-2,2]]
    = L3 ← L3 - 2L1 : [[1,-3,-1,1],[0,0,1,-2],[0,0,0,0]]   ← Descendre : L₃ ← L₃ − 2L₁
    = L1 ← L1 + L2 : [[1,-3,0,-1],[0,0,1,-2],[0,0,0,0]]   ← Remonter : L₁ ← L₁ + L₂
  — Une base de Col A  [juge span]  départ : [[1,-3,-1,1],[0,0,1,-2],[2,-6,-2,2]]
    = Col A = Span{(1 ; 0 ; 2), (-1 ; 1 ; -2)}   ← Colonnes 1 et 3 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,-3,0,-1],[0,0,1,-2],[0,0,0,0]]
    = Lgn A = Span{(1 ; -3 ; 0 ; -1), (0 ; 0 ; 1 ; -2)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,-3,0,-1],[0,0,1,-2],[0,0,0,0]]
    = Ker A = Span{(3 ; 1 ; 0 ; 0), (1 ; 0 ; 2 ; 1)}   ← rang A + dim Ker A = 2 + 2 = 4
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[1,0,1,0],[0,1,2,0],[0,0,0,1],[-1,0,-1,0]]. Réduis A, puis donne une base de Col A, Lgn A et Ker A.
  [free, sans aide]  [[1,0,1,0],[0,1,2,0],[0,0,0,1],[-1,0,-1,0]]
    = L4 ← L4 + L1 : [[1,0,1,0],[0,1,2,0],[0,0,0,1],[0,0,0,0]]   ← Descendre : L₄ ← L₄ + L₁
  — Une base de Col A  [juge span]  départ : [[1,0,1,0],[0,1,2,0],[0,0,0,1],[-1,0,-1,0]]
    = Col A = Span{(1 ; 0 ; 0 ; -1), (0 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 0)}   ← Colonnes 1, 2 et 4 de A
  — Une base de Lgn A (lignes écrites en colonnes)  [juge span]  départ : [[1,0,1,0],[0,1,2,0],[0,0,0,1],[0,0,0,0]]
    = Lgn A = Span{(1 ; 0 ; 1 ; 0), (0 ; 1 ; 2 ; 0), (0 ; 0 ; 0 ; 1)}   ← Lignes non nulles de R
  — Une base de Ker A  [juge span]  départ : [[1,0,1,0],[0,1,2,0],[0,0,0,1],[0,0,0,0]]
    = Ker A = Span{(-1 ; -2 ; 1 ; 0)}   ← rang A + dim Ker A = 3 + 1 = 4
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Variantes d'examen

```
Soit T(x) = Ax avec A = [[1,0,-2,2],[0,2,4,-2],[0,1,2,-1]], de forme réduite R = [[1,0,-2,2],[0,1,2,-1],[0,0,0,0]]. Laquelle de ces familles est une base de Im T ?
  · Span{(1 ; 0 ; 0), (1 ; 1 ; 0)}   ✔ Span{(1 ; 0 ; 0), (0 ; 2 ; 1)}   · Span{(1 ; 0 ; 0), (0 ; 1 ; 0)} [l_col_from_rref]   · Span{(1 ; 0 ; 0)}
  [examen mcq]
  pièges : l_col_from_rref

Vrai ou faux ?
  « Si R est la forme échelonnée réduite de A, les colonnes pivots de R forment une base de Col A. » → FAUX
    contre-exemple (matOne) : A = [[1,2],[2,4]]
  [examen tf]
  pièges : l_col_from_rref

```

## Base et dimension : extraire, compléter, reconnaître (`l-vs-basis`, BA1)

_Coordonnées en colonnes, puis pivots._

### Niveau 1

```
Les vecteurs [[-1,0],[0,1]], [[1,0],[0,0]], [[1,1],[1,-2]], [[-1,1],[1,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[-1,1,1,-1],[0,0,1,1],[0,0,1,1],[1,0,-2,0]]   (cases à remplir : (2,2) (2,4) (3,1) (4,1))   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[-1,1,1,-1],[0,0,1,1],[0,0,1,1],[1,0,-2,0]]
    = L4 ← L4 + L1 : [[-1,1,1,-1],[0,0,1,1],[0,0,1,1],[0,1,-1,-1]]   (cases à remplir : (4,3) (4,4))   ← Annuler sous le pivot : L₄ ← L₄ + L₁
    = L2 ↔ L4 : [[-1,1,1,-1],[0,1,-1,-1],[0,0,1,1],[0,0,1,1]]   ← Échanger
    = L4 ← L4 - L3 : [[-1,1,1,-1],[0,1,-1,-1],[0,0,1,1],[0,0,0,0]]   (cases à remplir : (4,2) (4,3))   ← Annuler sous le pivot : L₄ ← L₄ − L₃
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[-1,1,1,-1],[0,0,1,1],[0,0,1,1],[1,0,-2,0]]
    = Span{(-1 ; 0 ; 0 ; 1), (1 ; 0 ; 0 ; 0), (1 ; 1 ; 1 ; -2)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3

Les vecteurs [[0,0],[0,1]], [[-2,0],[1,0]], [[-3,-1],[2,0]], [[1,-1],[0,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,-2,-3,1],[0,0,-1,-1],[0,1,2,0],[1,0,0,0]]   (cases à remplir : (1,3) (2,2) (3,4) (4,3))   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,-2,-3,1],[0,0,-1,-1],[0,1,2,0],[1,0,0,0]]
    = L1 ↔ L4 : [[1,0,0,0],[0,0,-1,-1],[0,1,2,0],[0,-2,-3,1]]   ← Échanger
    = L2 ↔ L3 : [[1,0,0,0],[0,1,2,0],[0,0,-1,-1],[0,-2,-3,1]]   ← Échanger
    = L4 ← L4 + 2L2 : [[1,0,0,0],[0,1,2,0],[0,0,-1,-1],[0,0,1,1]]   (cases à remplir : (4,1) (4,2))   ← Annuler sous le pivot : L₄ ← L₄ + 2L₂
    = L4 ← L4 + L3 : [[1,0,0,0],[0,1,2,0],[0,0,-1,-1],[0,0,0,0]]   (cases à remplir : (4,2) (4,4))   ← Annuler sous le pivot : L₄ ← L₄ + L₃
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,-2,-3,1],[0,0,-1,-1],[0,1,2,0],[1,0,0,0]]
    = Span{(0 ; 0 ; 0 ; 1), (-2 ; 0 ; 1 ; 0), (-3 ; -1 ; 2 ; 0)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3

Les vecteurs −1 + t + t², t², t³, 1 − t² forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[-1,0,0,1],[1,0,0,0],[1,1,0,-1],[0,0,1,0]]   (cases à remplir : (3,3) (3,4) (4,1) (4,3))   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[-1,0,0,1],[1,0,0,0],[1,1,0,-1],[0,0,1,0]]
    = L2 ← L2 + L1 : [[-1,0,0,1],[0,0,0,1],[1,1,0,-1],[0,0,1,0]]   (cases à remplir : (2,1) (2,4))   ← Annuler sous le pivot : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[-1,0,0,1],[0,0,0,1],[0,1,0,0],[0,0,1,0]]   (cases à remplir : (3,2) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L2 ↔ L3 : [[-1,0,0,1],[0,1,0,0],[0,0,0,1],[0,0,1,0]]   ← Échanger
    = L3 ↔ L4 : [[-1,0,0,1],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   ← Échanger
  — Le rang de la famille  [juge value]  départ : r
    = 4   ← 4 pivots : une base de P₃
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 4 : une base

```

### Niveau 2

```
Les vecteurs 1 + t, t + t³, 1, −1 + 3t + 2t³ forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang, puis une base du Span de la famille.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    ? Quel critère décide si ces 4 vecteurs forment une base de P₃ (de dimension 4) ? ✔ Ils sont libres : la matrice des coordonnées a 4 pivots / · Il y en a 4 et dim P₃ = 4 : c'est toujours une base / · Aucun n'est nul
    = [[1,0,1,-1],[1,1,0,3],[0,0,0,0],[0,1,0,2]]   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[1,0,1,-1],[1,1,0,3],[0,0,0,0],[0,1,0,2]]
    = L2 ← L2 - L1 : [[1,0,1,-1],[0,1,-1,4],[0,0,0,0],[0,1,0,2]]   (cases à remplir : (2,2) (2,4))   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L4 ← L4 - L2 : [[1,0,1,-1],[0,1,-1,4],[0,0,0,0],[0,0,1,-2]]   (cases à remplir : (4,3) (4,4))   ← Annuler sous le pivot : L₄ ← L₄ − L₂
    = L3 ↔ L4 : [[1,0,1,-1],[0,1,-1,4],[0,0,1,-2],[0,0,0,0]]   ← Échanger
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de P₃
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[1,0,1,-1],[1,1,0,3],[0,0,0,0],[0,1,0,2]]
    = Span{(1 ; 1 ; 0 ; 0), (0 ; 1 ; 0 ; 1), (1 ; 0 ; 0 ; 0)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3
  pièges : l_span_count

Les vecteurs [[0,0],[0,1]], [[0,-1],[-1,1]], [[0,0],[1,-1]], [[0,1],[0,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    ? Quel critère décide si ces 4 vecteurs forment une base de M₂ₓ₂ (de dimension 4) ? ✔ Ils sont libres : la matrice des coordonnées a 4 pivots / · Il y en a 4 et dim M₂ₓ₂ = 4 : c'est toujours une base / · Aucun n'est nul
    = [[0,0,0,0],[0,-1,0,1],[0,-1,1,0],[1,1,-1,0]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,0,0,0],[0,-1,0,1],[0,-1,1,0],[1,1,-1,0]]
    = L1 ↔ L4 : [[1,1,-1,0],[0,-1,0,1],[0,-1,1,0],[0,0,0,0]]   ← Échanger
    = L3 ← L3 - L2 : [[1,1,-1,0],[0,-1,0,1],[0,0,1,-1],[0,0,0,0]]   (cases à remplir : (3,3) (3,4))   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,0,0,0],[0,-1,0,1],[0,-1,1,0],[1,1,-1,0]]
    = Span{(0 ; 0 ; 0 ; 1), (0 ; -1 ; -1 ; 1), (0 ; 0 ; 1 ; -1)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3
  pièges : l_span_count

Les vecteurs [[0,0],[1,0]], [[0,1],[0,1]], [[1,0],[1,0]], [[0,0],[0,1]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang.
  [guided]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    ? Quel critère décide si ces 4 vecteurs forment une base de M₂ₓ₂ (de dimension 4) ? ✔ Ils sont libres : la matrice des coordonnées a 4 pivots / · Il y en a 4 et dim M₂ₓ₂ = 4 : c'est toujours une base / · Aucun n'est nul
    = [[0,0,1,0],[0,1,0,0],[1,0,1,0],[0,1,0,1]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,0,1,0],[0,1,0,0],[1,0,1,0],[0,1,0,1]]
    = L1 ↔ L3 : [[1,0,1,0],[0,1,0,0],[0,0,1,0],[0,1,0,1]]   ← Échanger
    = L4 ← L4 - L2 : [[1,0,1,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   (cases à remplir : (4,1) (4,2))   ← Annuler sous le pivot : L₄ ← L₄ − L₂
  — Le rang de la famille  [juge value]  départ : r
    = 4   ← 4 pivots : une base de M₂ₓ₂
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 4 : une base
  pièges : l_span_count

```

### Niveau 3

```
Les vecteurs [[0,-1],[0,1]], [[2,1],[0,-1]], [[1,0],[0,0]], [[2,0],[1,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,2,1,2],[-1,1,0,0],[0,0,0,1],[1,-1,0,0]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,2,1,2],[-1,1,0,0],[0,0,0,1],[1,-1,0,0]]
    = L1 ↔ L2 : [[-1,1,0,0],[0,2,1,2],[0,0,0,1],[1,-1,0,0]]   ← Échanger
    = L4 ← L4 + L1 : [[-1,1,0,0],[0,2,1,2],[0,0,0,1],[0,0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ + L₁
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,2,1,2],[-1,1,0,0],[0,0,0,1],[1,-1,0,0]]
    = Span{(0 ; -1 ; 0 ; 1), (2 ; 1 ; 0 ; -1), (2 ; 0 ; 1 ; 0)}   ← Les vecteurs 1, 2 et 4 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 4

Les vecteurs [[0,0],[1,0]], [[0,1],[0,0]], [[0,0],[0,1]], [[1,1],[2,1]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,0,0,1],[0,1,0,1],[1,0,0,2],[0,0,1,1]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,0,0,1],[0,1,0,1],[1,0,0,2],[0,0,1,1]]
    = L1 ↔ L3 : [[1,0,0,2],[0,1,0,1],[0,0,0,1],[0,0,1,1]]   ← Échanger
    = L3 ↔ L4 : [[1,0,0,2],[0,1,0,1],[0,0,1,1],[0,0,0,1]]   ← Échanger
  — Le rang de la famille  [juge value]  départ : r
    = 4   ← 4 pivots : une base de M₂ₓ₂
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 4 : une base

Les vecteurs [[0,1],[0,0]], [[0,0],[1,1]], [[-1,-2],[0,0]], [[1,0],[0,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille : choisis chaque opération.
  [tap, suivre l'erreur, menu rowops]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,0,-1,1],[1,0,-2,0],[0,1,0,0],[0,1,0,0]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,0,-1,1],[1,0,-2,0],[0,1,0,0],[0,1,0,0]]
    = L1 ↔ L2 : [[1,0,-2,0],[0,0,-1,1],[0,1,0,0],[0,1,0,0]]   ← Échanger
    = L2 ↔ L3 : [[1,0,-2,0],[0,1,0,0],[0,0,-1,1],[0,1,0,0]]   ← Échanger
    = L4 ← L4 - L2 : [[1,0,-2,0],[0,1,0,0],[0,0,-1,1],[0,0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ − L₂
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,0,-1,1],[1,0,-2,0],[0,1,0,0],[0,1,0,0]]
    = Span{(0 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 1), (-1 ; -2 ; 0 ; 0)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3

```

### Niveau 4

```
Les vecteurs t² + t³, 1 − t² − 2t³, −1 + t + t² + 2t³, t² forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang.
  [free, suivre l'erreur]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,1,-1,0],[0,0,1,0],[1,-1,1,1],[1,-2,2,0]]   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,1,-1,0],[0,0,1,0],[1,-1,1,1],[1,-2,2,0]]
    = L1 ↔ L3 : [[1,-1,1,1],[0,0,1,0],[0,1,-1,0],[1,-2,2,0]]   ← Échanger
    = L4 ← L4 - L1 : [[1,-1,1,1],[0,0,1,0],[0,1,-1,0],[0,-1,1,-1]]   ← Annuler sous le pivot : L₄ ← L₄ − L₁
    = L2 ↔ L3 : [[1,-1,1,1],[0,1,-1,0],[0,0,1,0],[0,-1,1,-1]]   ← Échanger
    = L4 ← L4 + L2 : [[1,-1,1,1],[0,1,-1,0],[0,0,1,0],[0,0,0,-1]]   ← Annuler sous le pivot : L₄ ← L₄ + L₂
  — Le rang de la famille  [juge value]  départ : r
    = 4   ← 4 pivots : une base de P₃
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 4 : une base

Les vecteurs t², −2 + 2t − 2t² + 2t³, 1 − 2t − t³, t forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang, puis une base du Span de la famille.
  [free, suivre l'erreur]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,-2,1,0],[0,2,-2,1],[1,-2,0,0],[0,2,-1,0]]   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,-2,1,0],[0,2,-2,1],[1,-2,0,0],[0,2,-1,0]]
    = L1 ↔ L3 : [[1,-2,0,0],[0,2,-2,1],[0,-2,1,0],[0,2,-1,0]]   ← Échanger
    = L3 ← L3 + L2 : [[1,-2,0,0],[0,2,-2,1],[0,0,-1,1],[0,2,-1,0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₂
    = L4 ← L4 - L2 : [[1,-2,0,0],[0,2,-2,1],[0,0,-1,1],[0,0,1,-1]]   ← Annuler sous le pivot : L₄ ← L₄ − L₂
    = L4 ← L4 + L3 : [[1,-2,0,0],[0,2,-2,1],[0,0,-1,1],[0,0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ + L₃
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de P₃
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,-2,1,0],[0,2,-2,1],[1,-2,0,0],[0,2,-1,0]]
    = Span{(0 ; 0 ; 1 ; 0), (-2 ; 2 ; -2 ; 2), (1 ; -2 ; 0 ; -1)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3

Les vecteurs 1 + t + t² + t³, t, −t + t², 2t − t² forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang, puis une base du Span de la famille.
  [free, suivre l'erreur]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[1,0,0,0],[1,1,-1,2],[1,0,1,-1],[1,0,0,0]]   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[1,0,0,0],[1,1,-1,2],[1,0,1,-1],[1,0,0,0]]
    = L2 ← L2 - L1 : [[1,0,0,0],[0,1,-1,2],[1,0,1,-1],[1,0,0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 - L1 : [[1,0,0,0],[0,1,-1,2],[0,0,1,-1],[1,0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L4 ← L4 - L1 : [[1,0,0,0],[0,1,-1,2],[0,0,1,-1],[0,0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ − L₁
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de P₃
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[1,0,0,0],[1,1,-1,2],[1,0,1,-1],[1,0,0,0]]
    = Span{(1 ; 1 ; 1 ; 1), (0 ; 1 ; 0 ; 0), (0 ; -1 ; 1 ; 0)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3
  aides : Coordonnées en colonnes, puis pivots : 4 pivots ⇔ base. Sinon, les colonnes pivots donnent une base du Span. | rang = □ : compte les pivots de la forme échelonnée. | rang 3 : pas une base ; base du Span : les vecteurs 1, 2 et 3

```

### Niveau 5

```
Les vecteurs [[0,1],[-1,-2]], [[-2,1],[-1,-2]], [[1,0],[-1,0]], [[0,0],[1,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille.
  [free, sans aide]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,-2,1,0],[1,1,0,0],[-1,-1,-1,1],[-2,-2,0,0]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,-2,1,0],[1,1,0,0],[-1,-1,-1,1],[-2,-2,0,0]]
    = L1 ↔ L2 : [[1,1,0,0],[0,-2,1,0],[-1,-1,-1,1],[-2,-2,0,0]]   ← Échanger
    = L3 ← L3 + L1 : [[1,1,0,0],[0,-2,1,0],[0,0,-1,1],[-2,-2,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ + L₁
    = L4 ← L4 + 2L1 : [[1,1,0,0],[0,-2,1,0],[0,0,-1,1],[0,0,0,0]]   ← Annuler sous le pivot : L₄ ← L₄ + 2L₁
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,-2,1,0],[1,1,0,0],[-1,-1,-1,1],[-2,-2,0,0]]
    = Span{(0 ; 1 ; -1 ; -2), (-2 ; 1 ; -1 ; -2), (1 ; 0 ; -1 ; 0)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3

Les vecteurs 1 + t, t³, −1 + 2t + t², t forment-ils une base de P₃ ? Écris leurs coordonnées en colonnes (coordonnées dans (1, t, t², t³)), échelonne, donne le rang.
  [free, sans aide]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[1,0,-1,0],[1,0,2,1],[0,0,1,0],[0,1,0,0]]   ← Coordonnées en colonnes (coordonnées dans (1, t, t², t³))
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[1,0,-1,0],[1,0,2,1],[0,0,1,0],[0,1,0,0]]
    = L2 ← L2 - L1 : [[1,0,-1,0],[0,0,3,1],[0,0,1,0],[0,1,0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L2 ↔ L4 : [[1,0,-1,0],[0,1,0,0],[0,0,1,0],[0,0,3,1]]   ← Échanger
    = L4 ← L4 - 3L3 : [[1,0,-1,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]   ← Annuler sous le pivot : L₄ ← L₄ − 3L₃
  — Le rang de la famille  [juge value]  départ : r
    = 4   ← 4 pivots : une base de P₃

Les vecteurs [[0,1],[0,0]], [[0,0],[0,1]], [[1,0],[0,-1]], [[2,2],[0,0]] forment-ils une base de M₂ₓ₂ ? Écris leurs coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne), échelonne, donne le rang, puis une base du Span de la famille.
  [free, sans aide]  Coordonnées
    (La matrice des coordonnées, un vecteur par colonne)
    = [[0,0,1,2],[1,0,0,2],[0,0,0,0],[0,1,-1,0]]   ← Coordonnées en colonnes (coordonnées (a ; b ; c ; d), ligne par ligne)
  — Échelonne la matrice des coordonnées  [juge rowops]  départ : [[0,0,1,2],[1,0,0,2],[0,0,0,0],[0,1,-1,0]]
    = L1 ↔ L2 : [[1,0,0,2],[0,0,1,2],[0,0,0,0],[0,1,-1,0]]   ← Échanger
    = L2 ↔ L4 : [[1,0,0,2],[0,1,-1,0],[0,0,0,0],[0,0,1,2]]   ← Échanger
    = L3 ↔ L4 : [[1,0,0,2],[0,1,-1,0],[0,0,1,2],[0,0,0,0]]   ← Échanger
  — Le rang de la famille  [juge value]  départ : r
    = 3   ← 3 pivots pour 4 vecteurs : pas une base de M₂ₓ₂
  — Une base du Span de la famille (en coordonnées)  [juge span]  départ : [[0,0,1,2],[1,0,0,2],[0,0,0,0],[0,1,-1,0]]
    = Span{(0 ; 1 ; 0 ; 0), (0 ; 0 ; 0 ; 1), (1 ; 0 ; 0 ; -1)}   ← Les vecteurs 1, 2 et 3 (colonnes pivots) : dimension 3

```

### Variantes d'examen

```
Quelle est la dimension du sous-espace de M₂ₓ₂ engendré par [[0,0],[0,1]], [[-3,1],[2,-1]], [[-2,0],[1,0]], [[1,1],[0,0]] ?
  · 2   ✔ 3   · 1   · 4 [l_span_count]
  [examen mcq]
  pièges : l_span_count

Vrai ou faux ?
  « Si dim V = 4 et si S est une famille libre de V, alors S est une base de V. » → FAUX
    contre-exemple (vecFamily) : F = (1 ; 0 ; 0 ; 0)
  [examen tf]

```

## Rang et théorème du rang (`l-vs-rank`, BA1)

_rang A + dim Ker A = n._

### Niveau 1

```
A est une matrice 8 × 2 de rang 1. Avec rang A + dim Ker A = n (n = nombre de colonnes), donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    = □ − 1   (trous : 2 − 1)
    = 1   ← n − r, avec n = 2 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − 1   (trous : 8 − 1)
    = 7   ← m − r : Aᵀ a 8 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 1   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 1 | dim Ker A = 1
  pièges : l_rank_dim_confusion

A est une matrice 7 × 9 de rang 3. Avec rang A + dim Ker A = n (n = nombre de colonnes), donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    = □ − 3   (trous : 9 − 3)
    = 6   ← n − r, avec n = 9 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − 3   (trous : 7 − 3)
    = 4   ← m − r : Aᵀ a 7 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 3   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 3 | dim Ker A = 6
  pièges : l_rank_dim_confusion

A est une matrice 6 × 8 de rang 2. Avec rang A + dim Ker A = n (n = nombre de colonnes), donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    = □ − 2   (trous : 8 − 2)
    = 6   ← n − r, avec n = 8 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − 2   (trous : 6 − 2)
    = 4   ← m − r : Aᵀ a 6 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 2   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 2 | dim Ker A = 6
  pièges : l_rank_dim_confusion

```

### Niveau 2

```
A est une matrice 8 × 4 de rang 2. Donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    ? Quelle formule donne dim Ker A ? ✔ n − r = 4 − 2 / · m − r = 8 − 2 / · r = 2
    = □ − □   (trous : 4 − 2)
    = 2   ← n − r, avec n = 4 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − □   (trous : 8 − 2)
    = 6   ← m − r : Aᵀ a 8 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 2   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 2 | dim Ker A = 2
  pièges : l_rank_dim_confusion

A est une matrice 4 × 2 de rang 1. Donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    ? Quelle formule donne dim Ker A ? ✔ n − r = 2 − 1 / · m − r = 4 − 1 / · r = 1
    = □ − □   (trous : 2 − 1)
    = 1   ← n − r, avec n = 2 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − □   (trous : 4 − 1)
    = 3   ← m − r : Aᵀ a 4 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 1   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 1 | dim Ker A = 1
  pièges : l_rank_dim_confusion

A est une matrice 8 × 6 de rang 5. Donne dim Ker A, dim Ker Aᵀ et dim Lgn A.
  [guided]  k
    (dim Ker A)
    ? Quelle formule donne dim Ker A ? ✔ n − r = 6 − 5 / · m − r = 8 − 5 / · r = 5
    = □ − □   (trous : 6 − 5)
    = 1   ← n − r, avec n = 6 colonnes
  — dim Ker Aᵀ  [juge value]  départ : k
    = □ − □   (trous : 8 − 5)
    = 3   ← m − r : Aᵀ a 8 colonnes
  — dim Lgn A  [juge value]  départ : k
    = 5   ← dim Lgn A = dim Col A = rang A
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | dim Ker A = □ − 5 | dim Ker A = 1
  pièges : l_rank_dim_confusion

```

### Niveau 3

```
A est une matrice 4 × 3, et dim Ker A = 1. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [tap, suivre l'erreur, menu menu]  k
    (Le rang)
    = 2   ← n − dim Ker A = 3 − 1
  — dim Ker Aᵀ  [juge value]  départ : k
    = 2   ← m − rang A = 4 − 2
  — dim Lgn A  [juge value]  départ : k
    = 2   ← rang des lignes = rang des colonnes
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | rang A = 3 − □ | rang A = 2
  pièges : l_rank_dim_confusion

A est une matrice 8 × 6, et dim Ker A = 1. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [tap, suivre l'erreur, menu menu]  k
    (Le rang)
    = 5   ← n − dim Ker A = 6 − 1
  — dim Ker Aᵀ  [juge value]  départ : k
    = 3   ← m − rang A = 8 − 5
  — dim Lgn A  [juge value]  départ : k
    = 5   ← rang des lignes = rang des colonnes
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | rang A = 6 − □ | rang A = 5
  pièges : l_rank_dim_confusion

A est une matrice 6 × 7, et dim Ker A = 3. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [tap, suivre l'erreur, menu menu]  k
    (Le rang)
    = 4   ← n − dim Ker A = 7 − 3
  — dim Ker Aᵀ  [juge value]  départ : k
    = 2   ← m − rang A = 6 − 4
  — dim Lgn A  [juge value]  départ : k
    = 4   ← rang des lignes = rang des colonnes
  aides : n est le nombre de colonnes, la dimension de départ : rang A + dim Ker A = n. Pour Aᵀ (n × m) : rang + dim Ker Aᵀ = m. | rang A = 7 − □ | rang A = 4
  pièges : l_rank_dim_confusion

```

### Niveau 4

```
T : M₃ₓ₂ → ℝ⁴ est linéaire et dim Im T = 1. Donne dim M₃ₓ₂, puis dim Ker T.
  [free, suivre l'erreur]  k
    (La dimension de M₃ₓ₂)
    = 6   ← Une coordonnée par case
  — dim Ker T  [juge value]  départ : k
    = 5   ← dim V − dim Im T = 6 − 1
  aides : dim Im T + dim Ker T = dim V, la dimension de l'espace de départ. | dim Ker T = 6 − □ | dim Ker T = 5

T : M₃ₓ₂ → ℝ³ est linéaire et dim Im T = 2. Donne dim M₃ₓ₂, puis dim Ker T.
  [free, suivre l'erreur]  k
    (La dimension de M₃ₓ₂)
    = 6   ← Une coordonnée par case
  — dim Ker T  [juge value]  départ : k
    = 4   ← dim V − dim Im T = 6 − 2
  aides : dim Im T + dim Ker T = dim V, la dimension de l'espace de départ. | dim Ker T = 6 − □ | dim Ker T = 4

T : P₄ → ℝ⁴ est linéaire et dim Im T = 4. Donne dim P₄, puis dim Ker T.
  [free, suivre l'erreur]  k
    (La dimension de P₄)
    = 5   ← Base 1, t, …, t⁴ : 5 vecteurs
  — dim Ker T  [juge value]  départ : k
    = 1   ← dim V − dim Im T = 5 − 4
  aides : dim Im T + dim Ker T = dim V, la dimension de l'espace de départ. | dim Ker T = 5 − □ | dim Ker T = 1

```

### Niveau 5

```
A est une matrice 9 × 4, et dim Ker A = 1. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [free, sans aide]  k
    (Le rang)
    = 3   ← n − dim Ker A = 4 − 1
  — dim Ker Aᵀ  [juge value]  départ : k
    = 6   ← m − rang A = 9 − 3
  — dim Lgn A  [juge value]  départ : k
    = 3   ← rang des lignes = rang des colonnes
  pièges : l_rank_dim_confusion

A est une matrice 4 × 9, et dim Ker A = 7. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [free, sans aide]  k
    (Le rang)
    = 2   ← n − dim Ker A = 9 − 7
  — dim Ker Aᵀ  [juge value]  départ : k
    = 2   ← m − rang A = 4 − 2
  — dim Lgn A  [juge value]  départ : k
    = 2   ← rang des lignes = rang des colonnes
  pièges : l_rank_dim_confusion

A est une matrice 3 × 8, et dim Ker A = 7. Donne le rang de A, dim Ker Aᵀ et dim Lgn A.
  [free, sans aide]  k
    (Le rang)
    = 1   ← n − dim Ker A = 8 − 7
  — dim Ker Aᵀ  [juge value]  départ : k
    = 2   ← m − rang A = 3 − 1
  — dim Lgn A  [juge value]  départ : k
    = 1   ← rang des lignes = rang des colonnes
  pièges : l_rank_dim_confusion

```

### Variantes d'examen

```
A est une matrice 7 × 6 et dim Col A = 1. Que vaut dim Ker Aᵀ ?
  · 5 [l_rank_dim_confusion]   · 1   ✔ 6   · 7
  [examen mcq]
  pièges : l_rank_dim_confusion

Vrai ou faux ?
  « Pour toute matrice A de taille m × n et de rang r, dim Ker A = m − r. » → FAUX
    contre-exemple (dims) : m = 2, n = 3, r = 1
  [examen tf]
  pièges : l_rank_dim_confusion

```

## Coordonnées dans une base (`l-vs-coords`, BA1)

_x = c₁b₁ + … + cₙbₙ : [x]_B = (c₁ ; … ; cₙ)._

### Niveau 1

```
B = (t − t², t, 1 − t + t²) est une base de P₂. Trouve les coordonnées de p = 5 − 6t + 4t² dans B : réduis [b₁ b₂ b₃ | p] (coefficients dans 1, t, t²).
  [guided]  [[0,0,1|5],[1,1,-1|-6],[-1,0,1|4]]
    = L1 ↔ L2 : [[1,1,-1|-6],[0,0,1|5],[-1,0,1|4]]   ← Échanger
    = L3 ← L3 + L1 : [[1,1,-1|-6],[0,0,1|5],[0,1,0|-2]]   (cases à remplir : (3,1) (3,4))   ← Descendre : L₃ ← L₃ + L₁
    = L2 ↔ L3 : [[1,1,-1|-6],[0,1,0|-2],[0,0,1|5]]   ← Échanger
    = L1 ← L1 + L3 : [[1,1,0|-1],[0,1,0|-2],[0,0,1|5]]   (cases à remplir : (1,1) (1,3))   ← Remonter : L₁ ← L₁ + L₃
    = L1 ← L1 - L2 : [[1,0,0|1],[0,1,0|-2],[0,0,1|5]]   (cases à remplir : (1,1) (1,4))   ← Remonter : L₁ ← L₁ − L₂
  — Les coordonnées de p dans B  [juge mat]  départ : [p]_B = ?
    = (1 ; -2 ; 5)   (cases à remplir : (1,1) (2,1) (3,1))   ← p = b₁ − 2b₂ + 5b₃
  aides : Écris p comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | p], coefficient par coefficient de 1, t, t². | [p]_B = (□ ; □ ; 5) | [p]_B = (1 ; -2 ; 5)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

B = ((0 ; 0 ; 1), (1 ; -1 ; 0), (0 ; 1 ; 0)) est une base de ℝ³. Trouve les coordonnées de x = (1 ; 2 ; 1) dans B : réduis [b₁ b₂ b₃ | x].
  [guided]  [[0,1,0|1],[0,-1,1|2],[1,0,0|1]]
    = L1 ↔ L3 : [[1,0,0|1],[0,-1,1|2],[0,1,0|1]]   ← Échanger
    = L3 ← L3 + L2 : [[1,0,0|1],[0,-1,1|2],[0,0,1|3]]   (cases à remplir : (3,2) (3,4))   ← Descendre : L₃ ← L₃ + L₂
    = L2 ← L2 - L3 : [[1,0,0|1],[0,-1,0|-1],[0,0,1|3]]   (cases à remplir : (2,1) (2,4))   ← Remonter : L₂ ← L₂ − L₃
    = L2 ← -L2 : [[1,0,0|1],[0,1,0|1],[0,0,1|3]]   (cases à remplir : (2,3) (2,4))   ← Pivot à 1
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (1 ; 1 ; 3)   (cases à remplir : (1,1) (2,1) (3,1))   ← x = b₁ + b₂ + 3b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; 3) | [x]_B = (1 ; 1 ; 3)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

B = ((1 ; 0 ; 1), (2 ; 1 ; 0), (0 ; 0 ; 1)) est une base de ℝ³. Trouve les coordonnées de x = (-5 ; -2 ; 2) dans B : réduis [b₁ b₂ b₃ | x].
  [guided]  [[1,2,0|-5],[0,1,0|-2],[1,0,1|2]]
    = L3 ← L3 - L1 : [[1,2,0|-5],[0,1,0|-2],[0,-2,1|7]]   (cases à remplir : (3,1) (3,3))   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 + 2L2 : [[1,2,0|-5],[0,1,0|-2],[0,0,1|3]]   (cases à remplir : (3,1) (3,2))   ← Descendre : L₃ ← L₃ + 2L₂
    = L1 ← L1 - 2L2 : [[1,0,0|-1],[0,1,0|-2],[0,0,1|3]]   (cases à remplir : (1,1) (1,4))   ← Remonter : L₁ ← L₁ − 2L₂
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (-1 ; -2 ; 3)   (cases à remplir : (1,1) (2,1) (3,1))   ← x = −b₁ − 2b₂ + 3b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; 3) | [x]_B = (-1 ; -2 ; 3)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 2

```
B = ((1 ; 0 ; 1), (2 ; 1 ; 2), (1 ; 1 ; 2)) est une base de ℝ³. Trouve les coordonnées de x = (0 ; 1 ; -4) dans B : réduis [b₁ b₂ b₃ | x].
  [guided]  [[1,2,1|0],[0,1,1|1],[1,2,2|-4]]
    ? Comment obtenir [x]_B ? ✔ Écrire x = c₁b₁ + c₂b₂ + c₃b₃ : réduire [b₁ b₂ b₃ | x] / · Lire les coefficients de x
    = L3 ← L3 - L1 : [[1,2,1|0],[0,1,1|1],[0,0,1|-4]]   (cases à remplir : (3,2) (3,3) (3,4))   ← Descendre : L₃ ← L₃ − L₁
    = L2 ← L2 - L3 : [[1,2,1|0],[0,1,0|5],[0,0,1|-4]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 - L3 : [[1,2,0|4],[0,1,0|5],[0,0,1|-4]]   (cases à remplir : (1,1) (1,2) (1,4))   ← Remonter : L₁ ← L₁ − L₃
    = L1 ← L1 - 2L2 : [[1,0,0|-6],[0,1,0|5],[0,0,1|-4]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Remonter : L₁ ← L₁ − 2L₂
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (-6 ; 5 ; -4)   ← x = −6b₁ + 5b₂ − 4b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; −4) | [x]_B = (-6 ; 5 ; -4)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_coords_canonical

B = ((1 ; 1 ; 0), (1 ; 0 ; 0), (-1 ; 0 ; 1)) est une base de ℝ³. Trouve les coordonnées de x = (-3 ; 3 ; 1) dans B : réduis [b₁ b₂ b₃ | x].
  [guided]  [[1,1,-1|-3],[1,0,0|3],[0,0,1|1]]
    ? Comment obtenir [x]_B ? ✔ Écrire x = c₁b₁ + c₂b₂ + c₃b₃ : réduire [b₁ b₂ b₃ | x] / · Lire les coefficients de x
    = L2 ← L2 - L1 : [[1,1,-1|-3],[0,-1,1|6],[0,0,1|1]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Descendre : L₂ ← L₂ − L₁
    = L2 ← L2 - L3 : [[1,1,-1|-3],[0,-1,0|5],[0,0,1|1]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 + L3 : [[1,1,0|-2],[0,-1,0|5],[0,0,1|1]]   (cases à remplir : (1,2) (1,3) (1,4))   ← Remonter : L₁ ← L₁ + L₃
    = L2 ← -L2 : [[1,1,0|-2],[0,1,0|-5],[0,0,1|1]]   (cases à remplir : (2,1) (2,3) (2,4))   ← Pivot à 1
    = L1 ← L1 - L2 : [[1,0,0|3],[0,1,0|-5],[0,0,1|1]]   (cases à remplir : (1,1) (1,3) (1,4))   ← Remonter : L₁ ← L₁ − L₂
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (3 ; -5 ; 1)   ← x = 3b₁ − 5b₂ + b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; 1) | [x]_B = (3 ; -5 ; 1)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_coords_canonical

B = ((0 ; -1 ; 1), (1 ; 0 ; 0), (0 ; 1 ; 0)) est une base de ℝ³. Trouve les coordonnées de x = (4 ; -2 ; -4) dans B : réduis [b₁ b₂ b₃ | x].
  [guided]  [[0,1,0|4],[-1,0,1|-2],[1,0,0|-4]]
    ? Comment obtenir [x]_B ? ✔ Écrire x = c₁b₁ + c₂b₂ + c₃b₃ : réduire [b₁ b₂ b₃ | x] / · Lire les coefficients de x
    = L1 ↔ L2 : [[-1,0,1|-2],[0,1,0|4],[1,0,0|-4]]   ← Échanger
    = L3 ← L3 + L1 : [[-1,0,1|-2],[0,1,0|4],[0,0,1|-6]]   (cases à remplir : (3,1) (3,3) (3,4))   ← Descendre : L₃ ← L₃ + L₁
    = L1 ← L1 - L3 : [[-1,0,0|4],[0,1,0|4],[0,0,1|-6]]   (cases à remplir : (1,1) (1,2) (1,4))   ← Remonter : L₁ ← L₁ − L₃
    = L1 ← -L1 : [[1,0,0|-4],[0,1,0|4],[0,0,1|-6]]   (cases à remplir : (1,2) (1,3) (1,4))   ← Pivot à 1
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (-4 ; 4 ; -6)   ← x = −4b₁ + 4b₂ − 6b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; −6) | [x]_B = (-4 ; 4 ; -6)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_coords_canonical

```

### Niveau 3

```
B = ((1 ; 0 ; 0), (1 ; 0 ; 1), (1 ; -1 ; 1)) est une base de ℝ³. Trouve les coordonnées de x = (2 ; 4 ; 1) dans B : réduis [b₁ b₂ b₃ | x], en choisissant chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[1,1,1|2],[0,0,-1|4],[0,1,1|1]]
    = L2 ↔ L3 : [[1,1,1|2],[0,1,1|1],[0,0,-1|4]]   ← Échanger
    = L3 ← -L3 : [[1,1,1|2],[0,1,1|1],[0,0,1|-4]]   ← Pivot à 1
    = L2 ← L2 - L3 : [[1,1,1|2],[0,1,0|5],[0,0,1|-4]]   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 - L3 : [[1,1,0|6],[0,1,0|5],[0,0,1|-4]]   ← Remonter : L₁ ← L₁ − L₃
    = L1 ← L1 - L2 : [[1,0,0|1],[0,1,0|5],[0,0,1|-4]]   ← Remonter : L₁ ← L₁ − L₂
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (1 ; 5 ; -4)   ← x = b₁ + 5b₂ − 4b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; −4) | [x]_B = (1 ; 5 ; -4)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

B = (−1 − t², 1 + t + t², t + t²) est une base de P₂. Trouve les coordonnées de p = 7 − 3t + 3t² dans B : réduis [b₁ b₂ b₃ | p] (coefficients dans 1, t, t²), en choisissant chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[-1,1,0|7],[0,1,1|-3],[-1,1,1|3]]
    = L3 ← L3 - L1 : [[-1,1,0|7],[0,1,1|-3],[0,0,1|-4]]   ← Descendre : L₃ ← L₃ − L₁
    = L2 ← L2 - L3 : [[-1,1,0|7],[0,1,0|1],[0,0,1|-4]]   ← Remonter : L₂ ← L₂ − L₃
    = L1 ← L1 - L2 : [[-1,0,0|6],[0,1,0|1],[0,0,1|-4]]   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0,0|-6],[0,1,0|1],[0,0,1|-4]]   ← Pivot à 1
  — Les coordonnées de p dans B  [juge mat]  départ : [p]_B = ?
    = (-6 ; 1 ; -4)   ← p = −6b₁ + b₂ − 4b₃
  aides : Écris p comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | p], coefficient par coefficient de 1, t, t². | [p]_B = (□ ; □ ; −4) | [p]_B = (-6 ; 1 ; -4)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

B = (t + t², −1 + t, −1 + t + t²) est une base de P₂. Trouve les coordonnées de p = 11 − 5t + t² dans B : réduis [b₁ b₂ b₃ | p] (coefficients dans 1, t, t²), en choisissant chaque opération.
  [tap, suivre l'erreur, menu rowops]  [[0,-1,-1|11],[1,1,1|-5],[1,0,1|1]]
    = L1 ↔ L2 : [[1,1,1|-5],[0,-1,-1|11],[1,0,1|1]]   ← Échanger
    = L3 ← L3 - L1 : [[1,1,1|-5],[0,-1,-1|11],[0,-1,0|6]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,1,1|-5],[0,-1,-1|11],[0,0,1|-5]]   ← Descendre : L₃ ← L₃ − L₂
    = L2 ← L2 + L3 : [[1,1,1|-5],[0,-1,0|6],[0,0,1|-5]]   ← Remonter : L₂ ← L₂ + L₃
    = L1 ← L1 - L3 : [[1,1,0|0],[0,-1,0|6],[0,0,1|-5]]   ← Remonter : L₁ ← L₁ − L₃
    = L2 ← -L2 : [[1,1,0|0],[0,1,0|-6],[0,0,1|-5]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[1,0,0|6],[0,1,0|-6],[0,0,1|-5]]   ← Remonter : L₁ ← L₁ − L₂
  — Les coordonnées de p dans B  [juge mat]  départ : [p]_B = ?
    = (6 ; -6 ; -5)   ← p = 6b₁ − 6b₂ − 5b₃
  aides : Écris p comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | p], coefficient par coefficient de 1, t, t². | [p]_B = (□ ; □ ; −5) | [p]_B = (6 ; -6 ; -5)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
B = (1 + 2t², t², t) est une base de P₂. Trouve les coordonnées de p = 1 + 2t − t² dans B : réduis [b₁ b₂ b₃ | p] (coefficients dans 1, t, t²).
  [free, suivre l'erreur]  [[1,0,0|1],[0,0,1|2],[2,1,0|-1]]
    = L3 ← L3 - 2L1 : [[1,0,0|1],[0,0,1|2],[0,1,0|-3]]   ← Descendre : L₃ ← L₃ − 2L₁
    = L2 ↔ L3 : [[1,0,0|1],[0,1,0|-3],[0,0,1|2]]   ← Échanger
  — Les coordonnées de p dans B  [juge mat]  départ : [p]_B = ?
    = (1 ; -3 ; 2)   ← p = b₁ − 3b₂ + 2b₃
  aides : Écris p comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | p], coefficient par coefficient de 1, t, t². | [p]_B = (□ ; □ ; 2) | [p]_B = (1 ; -3 ; 2)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

B = ((1 ; 0 ; 0), (0 ; 0 ; 1), (-2 ; 1 ; 0)) est une base de ℝ³. Trouve les coordonnées de x = (5 ; -4 ; -1) dans B : réduis [b₁ b₂ b₃ | x].
  [free, suivre l'erreur]  [[1,0,-2|5],[0,0,1|-4],[0,1,0|-1]]
    = L2 ↔ L3 : [[1,0,-2|5],[0,1,0|-1],[0,0,1|-4]]   ← Échanger
    = L1 ← L1 + 2L3 : [[1,0,0|-3],[0,1,0|-1],[0,0,1|-4]]   ← Remonter : L₁ ← L₁ + 2L₃
  — Les coordonnées de x dans B  [juge mat]  départ : [x]_B = ?
    = (-3 ; -1 ; -4)   ← x = −3b₁ − b₂ − 4b₃
  aides : Écris x comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | x]. | [x]_B = (□ ; □ ; −4) | [x]_B = (-3 ; -1 ; -4)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

B = (t + t², 1 + t², 1) est une base de P₂. Trouve les coordonnées de p = 1 + 3t + 2t² dans B : réduis [b₁ b₂ b₃ | p] (coefficients dans 1, t, t²).
  [free, suivre l'erreur]  [[0,1,1|1],[1,0,0|3],[1,1,0|2]]
    = L1 ↔ L2 : [[1,0,0|3],[0,1,1|1],[1,1,0|2]]   ← Échanger
    = L3 ← L3 - L1 : [[1,0,0|3],[0,1,1|1],[0,1,0|-1]]   ← Descendre : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[1,0,0|3],[0,1,1|1],[0,0,-1|-2]]   ← Descendre : L₃ ← L₃ − L₂
    = L3 ← -L3 : [[1,0,0|3],[0,1,1|1],[0,0,1|2]]   ← Pivot à 1
    = L2 ← L2 - L3 : [[1,0,0|3],[0,1,0|-1],[0,0,1|2]]   ← Remonter : L₂ ← L₂ − L₃
  — Les coordonnées de p dans B  [juge mat]  départ : [p]_B = ?
    = (3 ; -1 ; 2)   ← p = 3b₁ − b₂ + 2b₃
  aides : Écris p comme combinaison des vecteurs de B : c'est le système de matrice augmentée [b₁ b₂ b₃ | p], coefficient par coefficient de 1, t, t². | [p]_B = (□ ; □ ; 2) | [p]_B = (3 ; -1 ; 2)
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 5

```
B = (t, t², 1 + 2t²) est une base de P₂, et [p]_B = (3 ; 5 ; -1). Trouve p (ses coefficients dans 1, t, t²).
  [free, sans aide]  p = ?
    = 3·(0 ; 1 ; 0)+5·(0 ; 0 ; 1)-1·(1 ; 0 ; 2)   ← p = c₁b₁ + c₂b₂ + c₃b₃
    = (-1 ; 3 ; 3)   ← p = −1 + 3t + 3t²

B = (−1 − t, 2 + t, 1 + t + t²) est une base de P₂, et [p]_B = (-6 ; -5 ; 4). Trouve p (ses coefficients dans 1, t, t²).
  [free, sans aide]  p = ?
    = -6·(-1 ; -1 ; 0)-5·(2 ; 1 ; 0)+4·(1 ; 1 ; 1)   ← p = c₁b₁ + c₂b₂ + c₃b₃
    = (0 ; 5 ; 4)   ← p = 5t + 4t²

B = ((1 ; 0 ; 0), (-1 ; 1 ; 0), (-2 ; 1 ; 1)) est une base de ℝ³, et [x]_B = (-1 ; -6 ; -2). Trouve x.
  [free, sans aide]  x = ?
    = -1·(1 ; 0 ; 0)-6·(-1 ; 1 ; 0)-2·(-2 ; 1 ; 1)   ← x = c₁b₁ + c₂b₂ + c₃b₃
    = (9 ; -8 ; -2)

```

### Variantes d'examen

```
B = ((1 ; -2 ; -1), (1 ; -1 ; -1), (0 ; 2 ; 1)) est une base de ℝ³ et x = (7 ; 1 ; -2). Que vaut [x]_B ?
  · (-2 ; 5 ; 5)   · (7 ; 1 ; -2) [l_coords_canonical]   ✔ (2 ; 5 ; 5)   · (8 ; -19 ; -10) [l_change_basis_direction]
  [examen mcq]
  pièges : l_coords_canonical, l_change_basis_direction

Vrai ou faux ?
  « B = ((0 ; 1 ; 0), (0 ; 0 ; 1), (1 ; -2 ; 0)) est une base de ℝ³ et x = (-5 ; 7 ; 2). La 3e coordonnée de x dans B vaut 2. » → FAUX
    contre-exemple (vecFamily) : c = (-3 ; 2 ; -5)
  [examen tf]
  pièges : l_coords_canonical

B = (t, −2t + t², 1 − t²) est une base de P₂ et p = −1 + 3t + 2t². Que vaut la 1re coordonnée c₁ de p dans B ?
  [free, sans aide, examen coef]  c_1
    = 5
  pièges : l_coords_canonical

```

## Matrice d'une application entre Pₙ, M_{m×n} et ℝⁿ (`l-vs-map-matrix`, BA1)

_Colonne j : coordonnées de T(bⱼ) dans la base d'arrivée._

### Niveau 1

```
T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−2a − 2c ; −2a + 2c ; −a). Soit B = (−1 − t, 1 + 2t, t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(−1 − t))
    = (2 ; 2 ; 1)   (cases à remplir : (1,1) (3,1))   ← T(−1 − t)
  — T(b₂) = T(1 + 2t)  [juge mat]  départ : T(b_2) = ?
    = (-2 ; -2 ; -1)   (cases à remplir : (1,1) (3,1))   ← T(1 + 2t)
  — T(b₃) = T(t²)  [juge mat]  départ : T(b_3) = ?
    = (-2 ; 2 ; 0)   (cases à remplir : (1,1) (3,1))   ← T(t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[2,-2,-2],[2,-2,2],[1,-1,0]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 + 2t) = (□ ; □ ; □) | [T] = [[2,-2,-2],[2,-2,2],[1,-1,0]]

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (2a − 2b + 2c ; −2b − 2c ; 2a + 2b + 2c). Soit B = (−1 − 2t + t², 1 + t − t², 2 + 2t − t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(−1 − 2t + t²))
    = (4 ; 2 ; -4)   (cases à remplir : (1,1) (3,1))   ← T(−1 − 2t + t²)
  — T(b₂) = T(1 + t − t²)  [juge mat]  départ : T(b_2) = ?
    = (-2 ; 0 ; 2)   (cases à remplir : (1,1) (3,1))   ← T(1 + t − t²)
  — T(b₃) = T(2 + 2t − t²)  [juge mat]  départ : T(b_3) = ?
    = (-2 ; -2 ; 6)   (cases à remplir : (1,1) (3,1))   ← T(2 + 2t − t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[4,-2,-2],[2,0,-2],[-4,2,6]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 + t − t²) = (□ ; □ ; □) | [T] = [[4,-2,-2],[2,0,-2],[-4,2,6]]

T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (2a + b − c) + (b + c)t + (−b + 2c)t². Soit B = (t + 2t², 1 + t + 2t², t²) au départ, et la base canonique à l'arrivée (coordonnées dans 1, t, t²). Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(t + 2t²) (coordonnées dans 1, t, t²))
    = (-1 ; 3 ; 3)   (cases à remplir : (1,1) (3,1))   ← T(t + 2t²) = −1 + 3t + 3t²
  — T(b₂) = T(1 + t + 2t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_2) = ?
    = (1 ; 3 ; 3)   (cases à remplir : (1,1) (3,1))   ← T(1 + t + 2t²) = 1 + 3t + 3t²
  — T(b₃) = T(t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_3) = ?
    = (-1 ; 1 ; 2)   (cases à remplir : (1,1) (3,1))   ← T(t²) = −1 + t + 2t²
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[-1,1,-1],[3,3,1],[3,3,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 + t + 2t²) = (□ ; □ ; □) | [T] = [[-1,1,-1],[3,3,1],[3,3,2]]

```

### Niveau 2

```
T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (2b + c) + (2a + 2b + 2c)t + (a − b − 2c)t². Soit B = (1, 1 + t, 1 + t + t²) au départ, et la base canonique à l'arrivée (coordonnées dans 1, t, t²). Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(1) (coordonnées dans 1, t, t²))
    = (0 ; 2 ; 1)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(1) = 2t + t²
  — T(b₂) = T(1 + t) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_2) = ?
    = (2 ; 4 ; 0)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(1 + t) = 2 + 4t
  — T(b₃) = T(1 + t + t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_3) = ?
    = (3 ; 6 ; -2)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(1 + t + t²) = 3 + 6t − 2t²
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    ? Où placer les coordonnées de T(bⱼ) ? ✔ Dans la colonne j / · Dans la ligne j
    = [[0,2,3],[2,4,6],[1,0,-2]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 + t) = (□ ; □ ; □) | [T] = [[0,2,3],[2,4,6],[1,0,-2]]
  pièges : l_matrix_rows_cols

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (a − b + 2c ; −a − 2b − c ; −2a + b − 2c). Soit B = (1 − t², t + t², t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(1 − t²))
    = (-1 ; 0 ; 0)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(1 − t²)
  — T(b₂) = T(t + t²)  [juge mat]  départ : T(b_2) = ?
    = (1 ; -3 ; -1)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(t + t²)
  — T(b₃) = T(t²)  [juge mat]  départ : T(b_3) = ?
    = (2 ; -1 ; -2)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    ? Où placer les coordonnées de T(bⱼ) ? ✔ Dans la colonne j / · Dans la ligne j
    = [[-1,1,2],[0,-3,-1],[0,-1,-2]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(t + t²) = (□ ; □ ; □) | [T] = [[-1,1,2],[0,-3,-1],[0,-1,-2]]
  pièges : l_matrix_rows_cols

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−a − b − 2c ; −2b + c ; −a − b + 2c). Soit B = (t, 1 + t², −2t + t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [guided]  T(b_1) = ?
    (T(b₁) = T(t))
    = (-1 ; -2 ; -1)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(t)
  — T(b₂) = T(1 + t²)  [juge mat]  départ : T(b_2) = ?
    = (-3 ; 1 ; 1)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(1 + t²)
  — T(b₃) = T(−2t + t²)  [juge mat]  départ : T(b_3) = ?
    = (0 ; 5 ; 4)   (cases à remplir : (1,1) (2,1) (3,1))   ← T(−2t + t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    ? Où placer les coordonnées de T(bⱼ) ? ✔ Dans la colonne j / · Dans la ligne j
    = [[-1,-3,0],[-2,1,5],[-1,1,4]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 + t²) = (□ ; □ ; □) | [T] = [[-1,-3,0],[-2,1,5],[-1,1,4]]
  pièges : l_matrix_rows_cols

```

### Niveau 3

```
T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−a − b + 2c ; −2a + b + c ; −2a − 2b + c). Soit B = (t², 1, t + t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [tap, suivre l'erreur, menu menu]  T(b_1) = ?
    (T(b₁) = T(t²))
    = (2 ; 1 ; 1)   ← T(t²)
  — T(b₂) = T(1)  [juge mat]  départ : T(b_2) = ?
    = (-1 ; -2 ; -2)   ← T(1)
  — T(b₃) = T(t + t²)  [juge mat]  départ : T(b_3) = ?
    = (1 ; 2 ; -1)   ← T(t + t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[2,-1,1],[1,-2,2],[1,-2,-1]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1) = (□ ; □ ; □) | [T] = [[2,-1,1],[1,-2,2],[1,-2,-1]]

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (a − 2b + 2c ; −a − b ; a − 2b − 2c). Soit B = (1 − 2t², −2 + t + 2t², t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [tap, suivre l'erreur, menu menu]  T(b_1) = ?
    (T(b₁) = T(1 − 2t²))
    = (-3 ; -1 ; 5)   ← T(1 − 2t²)
  — T(b₂) = T(−2 + t + 2t²)  [juge mat]  départ : T(b_2) = ?
    = (0 ; 1 ; -8)   ← T(−2 + t + 2t²)
  — T(b₃) = T(t²)  [juge mat]  départ : T(b_3) = ?
    = (2 ; 0 ; -2)   ← T(t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[-3,0,2],[-1,1,0],[5,-8,-2]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(−2 + t + 2t²) = (□ ; □ ; □) | [T] = [[-3,0,2],[-1,1,0],[5,-8,-2]]

T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (a + c) + (−a − 2b)t + (2a + 2b − 2c)t². Soit B = (t + t², 1 − t − t², t²) au départ, et la base canonique à l'arrivée (coordonnées dans 1, t, t²). Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [tap, suivre l'erreur, menu menu]  T(b_1) = ?
    (T(b₁) = T(t + t²) (coordonnées dans 1, t, t²))
    = (1 ; -2 ; 0)   ← T(t + t²) = 1 − 2t
  — T(b₂) = T(1 − t − t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_2) = ?
    = (0 ; 1 ; 2)   ← T(1 − t − t²) = t + 2t²
  — T(b₃) = T(t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_3) = ?
    = (1 ; 0 ; -2)   ← T(t²) = 1 − 2t²
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[1,0,1],[-2,1,0],[0,2,-2]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(1 − t − t²) = (□ ; □ ; □) | [T] = [[1,0,1],[-2,1,0],[0,2,-2]]

```

### Niveau 4

```
T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (a − b − 2c ; −a − 2b − 2c ; −2a − 2b + c). Soit B = (1, t − t², 1 − t + 2t²) au départ, et la base canonique à l'arrivée. Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [free, suivre l'erreur]  T(b_1) = ?
    (T(b₁) = T(1))
    = (1 ; -1 ; -2)   ← T(1)
  — T(b₂) = T(t − t²)  [juge mat]  départ : T(b_2) = ?
    = (1 ; 0 ; -3)   ← T(t − t²)
  — T(b₃) = T(1 − t + 2t²)  [juge mat]  départ : T(b_3) = ?
    = (-2 ; -3 ; 2)   ← T(1 − t + 2t²)
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[1,1,-2],[-1,0,-3],[-2,-3,2]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(t − t²) = (□ ; □ ; □) | [T] = [[1,1,-2],[-1,0,-3],[-2,-3,2]]

T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (a − b − 2c) + (2a + 2b − 2c)t + (−2a − 2b − c)t². Soit B = (1 − t², −2 + t + t², t²) au départ, et la base canonique à l'arrivée (coordonnées dans 1, t, t²). Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [free, suivre l'erreur]  T(b_1) = ?
    (T(b₁) = T(1 − t²) (coordonnées dans 1, t, t²))
    = (3 ; 4 ; -1)   ← T(1 − t²) = 3 + 4t − t²
  — T(b₂) = T(−2 + t + t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_2) = ?
    = (-5 ; -4 ; 1)   ← T(−2 + t + t²) = −5 − 4t + t²
  — T(b₃) = T(t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_3) = ?
    = (-2 ; -2 ; -1)   ← T(t²) = −2 − 2t − t²
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[3,-5,-2],[4,-4,-2],[-1,1,-1]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(−2 + t + t²) = (□ ; □ ; □) | [T] = [[3,-5,-2],[4,-4,-2],[-1,1,-1]]

T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (−2b + 2c) + (−2a + b)t + (a − 2b)t². Soit B = (1 − 2t + 2t², t, −t²) au départ, et la base canonique à l'arrivée (coordonnées dans 1, t, t²). Calcule T(b₁), T(b₂), T(b₃), puis la matrice de T par rapport à ces bases.
  [free, suivre l'erreur]  T(b_1) = ?
    (T(b₁) = T(1 − 2t + 2t²) (coordonnées dans 1, t, t²))
    = (8 ; -4 ; 5)   ← T(1 − 2t + 2t²) = 8 − 4t + 5t²
  — T(b₂) = T(t) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_2) = ?
    = (-2 ; 1 ; -2)   ← T(t) = −2 + t − 2t²
  — T(b₃) = T(−t²) (coordonnées dans 1, t, t²)  [juge mat]  départ : T(b_3) = ?
    = (-2 ; 0 ; 0)   ← T(−t²) = −2
  — La matrice de T dans les bases B et canonique  [juge mat]  départ : [T] = ?
    = [[8,-2,-2],[-4,1,0],[5,-2,0]]   ← Colonne j : coordonnées de T(bⱼ)
  aides : Colonne j = coordonnées de T(bⱼ) dans la base d'arrivée (ici canonique) : applique la formule aux coefficients de bⱼ. | T(b₂) = T(t) = (□ ; □ ; □) | [T] = [[8,-2,-2],[-4,1,0],[5,-2,0]]

```

### Niveau 5

```
T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (a ; −a + b − c ; 2a − 2c). Soit [T] sa matrice par rapport à B = (1 + t², −t + t², −1 + t − t²) au départ et à la base canonique à l'arrivée. Que vaut a₂₁ ?
  [free, sans aide]  a_21
    = −2
  pièges : l_map_basis_ignored, l_coef_index_swap

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−a + 2b ; −2a − 2b − c ; 2a − 2b − 2c). Soit [T] sa matrice par rapport à B = (t, −1 + t², −1 + t) au départ et à la base canonique à l'arrivée. Que vaut a₃₂ ?
  [free, sans aide]  a_32
    = −4
  pièges : l_map_basis_ignored, l_coef_index_swap

T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−a + b + c ; −a − 2b + 2c ; a − 2b + c). Soit [T] sa matrice par rapport à B = (t + t², 1 − 2t², 1 + t − 2t²) au départ et à la base canonique à l'arrivée. Que vaut a₁₃ ?
  [free, sans aide]  a_13
    = −2
  pièges : l_map_basis_ignored, l_coef_index_swap

```

### Variantes d'examen

```
T : P₂ → ℝ³ est linéaire, T(a + bt + ct²) = (−a + b + 2c ; a − 2b − 2c ; −a + 2b + 2c). Soit [T] sa matrice par rapport à B = (1 + t − t², 1 + 2t, t²) au départ et à la base canonique à l'arrivée. Que vaut a₃₂ ?
  [free, sans aide, examen coef]  a_32
    = 3
  pièges : l_map_basis_ignored, l_coef_index_swap

T : P₂ → P₂ est linéaire, T(a + bt + ct²) = (−2a − 2c) + (b + c)t + (a − 2b + c)t². Quelle est sa matrice par rapport à B = (−1 + 2t − 2t², t, 1 + t²) au départ et à la base canonique à l'arrivée ?
  · [[6,0,-7],[0,1,-2],[-4,1,2]] [l_matrix_rows_cols]   ✔ [[6,0,-4],[0,1,1],[-7,-2,2]]   · [[-2,0,-2],[0,1,1],[1,-2,1]] [l_map_basis_ignored]   · [[0,6,-4],[1,0,1],[-2,-7,2]]
  [examen mcq]
  pièges : l_map_basis_ignored, l_matrix_rows_cols

```

## Matrice de passage P_{C←B} (`l-vs-change-basis`, BA1)

_Réduire [C | B] et lire à droite._

### Niveau 1

```
Dans ℝ², B = {(-1 ; -2), (2 ; 3)} et C = {(0 ; 1), (1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[0,1|-1,2],[1,1|-2,3]]
    = L1 ↔ L2 : [[1,1|-2,3],[0,1|-1,2]]   ← Échanger
    = L1 ← L1 - L2 : [[1,0|-1,1],[0,1|-1,2]]   (cases à remplir : (1,2) (1,4))   ← Remonter : L₁ ← L₁ − L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[-1,1],[-1,2]]   (cases à remplir : (1,2) (2,2))   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[-1,1],[-1,2]]

Dans ℝ², B = {(1 ; -2), (-1 ; 1)} et C = {(-1 ; 0), (-1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[-1,-1|1,-1],[0,1|-2,1]]
    = L1 ← L1 + L2 : [[-1,0|-1,0],[0,1|-2,1]]   (cases à remplir : (1,2) (1,3))   ← Remonter : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,0|1,0],[0,1|-2,1]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,0],[-2,1]]   (cases à remplir : (1,2) (2,2))   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,0],[-2,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Dans ℝ², B = {(2 ; 1), (-1 ; 0)} et C = {(0 ; 1), (1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[0,1|2,-1],[1,1|1,0]]
    = L1 ↔ L2 : [[1,1|1,0],[0,1|2,-1]]   ← Échanger
    = L1 ← L1 - L2 : [[1,0|-1,1],[0,1|2,-1]]   (cases à remplir : (1,1) (1,3))   ← Remonter : L₁ ← L₁ − L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[-1,1],[2,-1]]   (cases à remplir : (1,1) (2,1))   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[-1,1],[2,-1]]

```

### Niveau 2

```
Dans ℝ², B = {(2 ; 1), (-1 ; 0)} et C = {(1 ; 1), (-1 ; 0)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[1,-1|2,-1],[1,0|1,0]]
    ? Quelle matrice réduire ? ✔ [C | B] : on lit P_{C←B} à droite / · [B | C]
    = L2 ← L2 - L1 : [[1,-1|2,-1],[0,1|-1,1]]   (cases à remplir : (2,1) (2,3) (2,4))   ← Descendre : L₂ ← L₂ − L₁
    = L1 ← L1 + L2 : [[1,0|1,0],[0,1|-1,1]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Remonter : L₁ ← L₁ + L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,0],[-1,1]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,0],[-1,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row, l_change_basis_direction

Dans ℝ², B = {(-2 ; -1), (1 ; 0)} et C = {(0 ; -1), (1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[0,1|-2,1],[-1,1|-1,0]]
    ? Quelle matrice réduire ? ✔ [C | B] : on lit P_{C←B} à droite / · [B | C]
    = L1 ↔ L2 : [[-1,1|-1,0],[0,1|-2,1]]   ← Échanger
    = L1 ← L1 - L2 : [[-1,0|1,-1],[0,1|-2,1]]   (cases à remplir : (1,1) (1,3) (1,4))   ← Remonter : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0|-1,1],[0,1|-2,1]]   (cases à remplir : (1,2) (1,3) (1,4))   ← Pivot à 1
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[-1,1],[-2,1]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[-1,1],[-2,1]]
  pièges : l_change_basis_direction

Dans ℝ², B = {(0 ; 1), (-1 ; 3)} et C = {(-1 ; 2), (-1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [guided]  [[-1,-1|0,-1],[2,1|1,3]]
    ? Quelle matrice réduire ? ✔ [C | B] : on lit P_{C←B} à droite / · [B | C]
    = L2 ← L2 + 2L1 : [[-1,-1|0,-1],[0,-1|1,1]]   (cases à remplir : (2,1) (2,2) (2,4))   ← Descendre : L₂ ← L₂ + 2L₁
    = L2 ← -L2 : [[-1,-1|0,-1],[0,1|-1,-1]]   (cases à remplir : (2,2) (2,3) (2,4))   ← Pivot à 1
    = L1 ← L1 + L2 : [[-1,0|-1,-2],[0,1|-1,-1]]   (cases à remplir : (1,1) (1,2) (1,3))   ← Remonter : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,0|1,2],[0,1|-1,-1]]   (cases à remplir : (1,1) (1,2) (1,4))   ← Pivot à 1
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,2],[-1,-1]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,2],[-1,-1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row, l_change_basis_direction

```

### Niveau 3

```
Dans ℝ², B = {(0 ; 1), (-1 ; -3)} et C = {(1 ; 2), (-1 ; -1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B], puis contrôle sa 1re colonne.
  [tap, suivre l'erreur, menu rowops]  [[1,-1|0,-1],[2,-1|1,-3]]
    = L2 ← L2 - 2L1 : [[1,-1|0,-1],[0,1|1,-1]]   ← Descendre : L₂ ← L₂ − 2L₁
    = L1 ← L1 + L2 : [[1,0|1,-2],[0,1|1,-1]]   ← Remonter : L₁ ← L₁ + L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,-2],[1,-1]]   ← Lue à droite de la barre
  — Contrôle : la 1re colonne de P donne b₁ dans la base C  [juge mat]  départ : p₁₁c₁ + p₂₁c₂ = ?
    = 1·(1 ; 2)+1·(-1 ; -1)
    = (0 ; 1)   ← = b₁ : juste
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,-2],[1,-1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Dans ℝ², B = {(0 ; -1), (-1 ; -3)} et C = {(1 ; 1), (1 ; 2)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B], puis contrôle sa 1re colonne.
  [tap, suivre l'erreur, menu rowops]  [[1,1|0,-1],[1,2|-1,-3]]
    = L2 ← L2 - L1 : [[1,1|0,-1],[0,1|-1,-2]]   ← Descendre : L₂ ← L₂ − L₁
    = L1 ← L1 - L2 : [[1,0|1,1],[0,1|-1,-2]]   ← Remonter : L₁ ← L₁ − L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,1],[-1,-2]]   ← Lue à droite de la barre
  — Contrôle : la 1re colonne de P donne b₁ dans la base C  [juge mat]  départ : p₁₁c₁ + p₂₁c₂ = ?
    = 1·(1 ; 1)-1·(1 ; 2)
    = (0 ; -1)   ← = b₁ : juste
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,1],[-1,-2]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Dans ℝ², B = {(0 ; 1), (1 ; 3)} et C = {(0 ; 1), (1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B], puis contrôle sa 1re colonne.
  [tap, suivre l'erreur, menu rowops]  [[0,1|0,1],[1,1|1,3]]
    = L1 ↔ L2 : [[1,1|1,3],[0,1|0,1]]   ← Échanger
    = L1 ← L1 - L2 : [[1,0|1,2],[0,1|0,1]]   ← Remonter : L₁ ← L₁ − L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,2],[0,1]]   ← Lue à droite de la barre
  — Contrôle : la 1re colonne de P donne b₁ dans la base C  [juge mat]  départ : p₁₁c₁ + p₂₁c₂ = ?
    = 1·(0 ; 1)+0·(1 ; 1)
    = (0 ; 1)   ← = b₁ : juste
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[1,2],[0,1]]

```

### Niveau 4

```
Dans ℝ², B = {(1 ; -2), (1 ; -3)} et C = {(1 ; -1), (1 ; -2)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [free, suivre l'erreur]  [[1,1|1,1],[-1,-2|-2,-3]]
    = L2 ← L2 + L1 : [[1,1|1,1],[0,-1|-1,-2]]   ← Descendre : L₂ ← L₂ + L₁
    = L2 ← -L2 : [[1,1|1,1],[0,1|1,2]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[1,0|0,-1],[0,1|1,2]]   ← Remonter : L₁ ← L₁ − L₂
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[0,-1],[1,2]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0 | □, □]. | P_{C←B} = [[0,-1],[1,2]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Dans ℝ³, B = {(1 ; -2 ; 1), (0 ; 3 ; -2), (0 ; 2 ; -1)} et C = {(1 ; 1 ; -1), (0 ; 1 ; 0), (0 ; -1 ; 1)}. Trouve la matrice de passage P_{C←B} en réduisant [C | B].
  [free, suivre l'erreur]  [[1,0,0|1,0,0],[1,1,-1|-2,3,2],[-1,0,1|1,-2,-1]]
    = L2 ← L2 - L1 : [[1,0,0|1,0,0],[0,1,-1|-3,3,2],[-1,0,1|1,-2,-1]]   ← Descendre : L₂ ← L₂ − L₁
    = L3 ← L3 + L1 : [[1,0,0|1,0,0],[0,1,-1|-3,3,2],[0,0,1|2,-2,-1]]   ← Descendre : L₃ ← L₃ + L₁
    = L2 ← L2 + L3 : [[1,0,0|1,0,0],[0,1,0|-1,1,1],[0,0,1|2,-2,-1]]   ← Remonter : L₂ ← L₂ + L₃
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[1,0,0],[-1,1,1],[2,-2,-1]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B]. | [I | P] : la 1re ligne finale est [1, 0, 0 | □, □, □]. | P_{C←B} = [[1,0,0],[-1,1,1],[2,-2,-1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

Dans P₂, B = {4 − 3t − 3t², 1 − t, 4 − 3t − 2t²} et C = {1 − t − t², t², 2 − t − 2t²}. Trouve la matrice de passage P_{C←B} en réduisant [C | B] (coordonnées dans 1, t, t²).
  [free, suivre l'erreur]  [[1,0,2|4,1,4],[-1,0,-1|-3,-1,-3],[-1,1,-2|-3,0,-2]]
    = L2 ← L2 + L1 : [[1,0,2|4,1,4],[0,0,1|1,0,1],[-1,1,-2|-3,0,-2]]   ← Descendre : L₂ ← L₂ + L₁
    = L3 ← L3 + L1 : [[1,0,2|4,1,4],[0,0,1|1,0,1],[0,1,0|1,1,2]]   ← Descendre : L₃ ← L₃ + L₁
    = L2 ↔ L3 : [[1,0,2|4,1,4],[0,1,0|1,1,2],[0,0,1|1,0,1]]   ← Échanger
    = L1 ← L1 - 2L3 : [[1,0,0|2,1,2],[0,1,0|1,1,2],[0,0,1|1,0,1]]   ← Remonter : L₁ ← L₁ − 2L₃
  — P_{C←B}, lue à droite  [juge mat]  départ : P_{C←B} = ?
    = [[2,1,2],[1,1,2],[1,0,1]]   ← Lue à droite de la barre
  aides : Les colonnes de P_{C←B} sont les coordonnées des vecteurs de B dans la base C : réduis [C | B] (coordonnées dans 1, t, t²). | [I | P] : la 1re ligne finale est [1, 0, 0 | □, □, □]. | P_{C←B} = [[2,1,2],[1,1,2],[1,0,1]]
  pièges : l_rhs_forgotten, l_rowop_sign, l_rowop_wrong_row

```

### Niveau 5

```
Dans ℝ³, B = {(1 ; 1 ; -2), (3 ; 2 ; -4), (2 ; 2 ; -3)} et C = {(1 ; 1 ; -2), (1 ; 0 ; -1), (1 ; 0 ; 0)}. Que vaut le coefficient p₁₂ de P_{C←B} ?
  [free, sans aide]  p_12
    = 2
  pièges : l_change_basis_direction, l_coef_index_swap

Dans ℝ³, B = {(2 ; 0 ; 1), (1 ; 0 ; 0), (-2 ; 1 ; -2)} et C = {(0 ; 0 ; 1), (1 ; 0 ; 0), (-1 ; 1 ; -1)}. Que vaut le coefficient p₂₁ de P_{C←B} ?
  [free, sans aide]  p_21
    = 2
  pièges : l_change_basis_direction, l_coef_index_swap

Dans ℝ³, B = {(1 ; 0 ; 0), (-2 ; 1 ; 4), (-1 ; 0 ; 1)} et C = {(-1 ; 0 ; 2), (0 ; 1 ; 0), (-1 ; 0 ; 1)}. Que vaut le coefficient p₁₂ de P_{C←B} ?
  [free, sans aide]  p_12
    = 2
  pièges : l_change_basis_direction, l_coef_index_swap

```

### Variantes d'examen

```
Dans ℝ², B = {(-1 ; 3), (0 ; 1)} et C = {(-1 ; 1), (0 ; 1)}. Quelle est la matrice de passage P_{C←B} ?
  · [[1,2],[0,1]] [l_matrix_rows_cols]   · [[-1,0],[1,1]] [l_change_basis_product]   · [[1,0],[-2,1]] [l_change_basis_direction]   ✔ [[1,0],[2,1]]
  [examen mcq]
  pièges : l_change_basis_direction, l_matrix_rows_cols, l_change_basis_product

Dans ℝ², B = {(2 ; -1), (-1 ; 1)} et C = {(1 ; -1), (2 ; -1)}. Que vaut le coefficient p₂₁ de P_{C←B} ?
  [free, sans aide, examen coef]  p_21
    = 1
  pièges : l_change_basis_direction, l_coef_index_swap

Vrai ou faux ?
  « Si B et C sont deux bases de ℝ² (vecteurs en colonnes), P_{C←B} = B⁻¹C. » → FAUX
    contre-exemple (matPair) : A = [[1,1],[0,1]], B = [[1,0],[0,1]]
  [examen tf]
  pièges : l_change_basis_direction

```

## Matrice de T dans une base B ; matrices semblables (`l-vs-similar`, BA1)

_[T]_B = P⁻¹AP._

### Niveau 1

```
B = {(0 ; -1), (1 ; 1)} est une base de ℝ², P = [[0,1],[-1,1]], et la matrice de T dans B est [T]_B = [[2,0],[-2,-3]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,-1],[1,0]]   (cases à remplir : (1,2) (2,1))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[-2,-3],[-4,-3]]   (cases à remplir : (1,1) (2,2))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[-5,2],[-7,4]]   (cases à remplir : (1,2) (2,2))   ← T(x) = (−5x₁ + 2x₂ ; −7x₁ + 4x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[-5,2],[-7,4]]

B = {(0 ; 1), (-1 ; 1)} est une base de ℝ², P = [[0,-1],[1,1]], et la matrice de T dans B est [T]_B = [[0,-1],[-1,-3]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,1],[-1,0]]   (cases à remplir : (1,1) (1,2))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[1,3],[-1,-4]]   (cases à remplir : (1,1) (1,2))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[-2,1],[3,-1]]   (cases à remplir : (2,1) (2,2))   ← T(x) = (−2x₁ + x₂ ; 3x₁ − x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[-2,1],[3,-1]]

B = {(-1 ; -1), (1 ; 0)} est une base de ℝ², P = [[-1,1],[-1,0]], et la matrice de T dans B est [T]_B = [[0,-2],[3,2]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[0,-1],[1,-1]]   (cases à remplir : (1,1) (2,2))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[3,4],[0,2]]   (cases à remplir : (2,1) (2,2))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[4,-7],[2,-2]]   (cases à remplir : (1,1) (2,2))   ← T(x) = (4x₁ − 7x₂ ; 2x₁ − 2x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[4,-7],[2,-2]]

```

### Niveau 2

```
B = {(1 ; 1), (0 ; 1)} est une base de ℝ², P = [[1,0],[1,1]], et la matrice de T dans B est [T]_B = [[-3,2],[2,-3]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,0],[-1,1]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[-3,2],[-1,-1]]   (cases à remplir : (1,1) (1,2) (2,1))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    ? Quelle formule donne A ? ✔ A = P·[T]_B·P⁻¹ / · A = P⁻¹·[T]_B·P
    = [[-5,2],[0,-1]]   (cases à remplir : (1,2) (2,1) (2,2))   ← T(x) = (−5x₁ + 2x₂ ; −x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[-5,2],[0,-1]]
  pièges : l_similar_order

B = {(1 ; -1), (0 ; 1)} est une base de ℝ², P = [[1,0],[-1,1]], et la matrice de T dans B est [T]_B = [[2,-3],[1,-1]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,0],[1,1]]   (cases à remplir : (1,1) (1,2) (2,2))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[2,-3],[-1,2]]   (cases à remplir : (1,1) (2,1) (2,2))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    ? Quelle formule donne A ? ✔ A = P·[T]_B·P⁻¹ / · A = P⁻¹·[T]_B·P
    = [[-1,-3],[1,2]]   (cases à remplir : (1,2) (2,1) (2,2))   ← T(x) = (−x₁ − 3x₂ ; x₁ + 2x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[-1,-3],[1,2]]
  pièges : l_similar_order

B = {(0 ; 1), (-1 ; 1)} est une base de ℝ², P = [[0,-1],[1,1]], et la matrice de T dans B est [T]_B = [[-1,-3],[-2,-1]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [guided]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,1],[-1,0]]   (cases à remplir : (1,1) (1,2) (2,1))   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[2,1],[-3,-4]]   (cases à remplir : (1,2) (2,1) (2,2))
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    ? Quelle formule donne A ? ✔ A = P·[T]_B·P⁻¹ / · A = P⁻¹·[T]_B·P
    = [[1,2],[1,-3]]   (cases à remplir : (1,1) (1,2) (2,2))   ← T(x) = (x₁ + 2x₂ ; x₁ − 3x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[1,2],[1,-3]]
  pièges : l_similar_order

```

### Niveau 3

```
T : ℝ² → ℝ² a pour matrice canonique A = [[1,5],[-1,4]]. Soit B = {(1 ; 0), (1 ; 1)}, et P = [[1,1],[0,1]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [tap, suivre l'erreur, menu menu]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,-1],[0,1]]   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[1,6],[-1,3]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[2,3],[-1,3]]   ← Contrôle : T(b₁) = A·b₁ = 2b₁ − b₂
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | [T]_B = P⁻¹·(A·P) = P⁻¹·□ | [T]_B = [[2,3],[-1,3]]

T : ℝ² → ℝ² a pour matrice canonique A = [[-4,-3],[3,4]]. Soit B = {(1 ; -1), (0 ; 1)}, et P = [[1,0],[-1,1]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [tap, suivre l'erreur, menu menu]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,0],[1,1]]   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[-1,-3],[-1,4]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[-1,-3],[-2,1]]   ← Contrôle : T(b₁) = A·b₁ = −b₁ − 2b₂
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | [T]_B = P⁻¹·(A·P) = P⁻¹·□ | [T]_B = [[-1,-3],[-2,1]]

B = {(-1 ; 0), (-2 ; -1)} est une base de ℝ², P = [[-1,-2],[0,-1]], et la matrice de T dans B est [T]_B = [[-1,-2],[2,-1]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [tap, suivre l'erreur, menu menu]  P⁻¹ = ?
    (L’inverse de P)
    = [[-1,2],[0,-1]]   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[-3,4],[-2,1]]
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[3,-10],[2,-5]]   ← T(x) = (3x₁ − 10x₂ ; 2x₁ − 5x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[3,-10],[2,-5]]

```

### Niveau 4

```
B = {(0 ; 1), (-1 ; -2)} est une base de ℝ², P = [[0,-1],[1,-2]], et la matrice de T dans B est [T]_B = [[0,2],[3,-1]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [free, suivre l'erreur]  P⁻¹ = ?
    (L’inverse de P)
    = [[-2,1],[-1,0]]   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[-3,1],[-6,4]]
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[5,-3],[8,-6]]   ← T(x) = (5x₁ − 3x₂ ; 8x₁ − 6x₂)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[5,-3],[8,-6]]

B = {(1 ; 0 ; 0), (1 ; 1 ; -1), (-1 ; -1 ; 2)} est une base de ℝ³, P = [[1,1,-1],[0,1,-1],[0,-1,2]], et la matrice de T dans B est [T]_B = [[3,2,-2],[0,-2,1],[-2,-3,0]]. Calcule P⁻¹, P·[T]_B, puis la matrice canonique A de T.
  [free, suivre l'erreur]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,-1,0],[0,2,1],[0,1,1]]   ← Réduire [P | I]
  — Le produit P·[T]_B  [juge mat]  départ : P·[T]_B = ?
    = [[5,3,-1],[2,1,1],[-4,-4,-1]]
  — A = P·[T]_B·P⁻¹  [juge mat]  départ : A = (P·[T]_B)·P⁻¹ = ?
    = [[5,0,2],[2,1,2],[-4,-5,-5]]   ← T(x) = (5x₁ + 2x₃ ; 2x₁ + x₂ + 2x₃ ; −4x₁ − 5x₂ − 5x₃)
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | A = (P·[T]_B)·□ | A = [[5,0,2],[2,1,2],[-4,-5,-5]]

T : ℝ² → ℝ² a pour matrice canonique A = [[-1,2],[-2,-4]]. Soit B = {(1 ; -1), (1 ; 0)}, et P = [[1,1],[-1,0]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [free, suivre l'erreur]  P⁻¹ = ?
    (L’inverse de P)
    = [[0,-1],[1,1]]   ← Échanger la diagonale, opposer le reste, diviser par det P
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[-3,-1],[2,-2]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[-2,2],[-1,-3]]   ← Contrôle : T(b₁) = A·b₁ = −2b₁ − b₂
  aides : [T]_B = P⁻¹AP, avec les vecteurs de B en colonnes dans P ; donc A = P·[T]_B·P⁻¹. | [T]_B = P⁻¹·(A·P) = P⁻¹·□ | [T]_B = [[-2,2],[-1,-3]]

```

### Niveau 5

```
T : ℝ³ → ℝ³ a pour matrice canonique A = [[-2,-6,10],[5,-7,4],[1,-3,2]]. Soit B = {(1 ; 0 ; 0), (0 ; 1 ; 0), (1 ; 2 ; 1)}, et P = [[1,0,1],[0,1,2],[0,0,1]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [free, sans aide]  P⁻¹ = ?
    (L’inverse de P)
    = [[1,0,-1],[0,1,-2],[0,0,1]]   ← Réduire [P | I]
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[-2,-6,-4],[5,-7,-5],[1,-3,-3]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[-3,-3,-1],[3,-1,1],[1,-3,-3]]   ← Contrôle : T(b₁) = A·b₁ = −3b₁ + 3b₂ + b₃

T : ℝ³ → ℝ³ a pour matrice canonique A = [[0,3,1],[-3,1,2],[1,2,1]]. Soit B = {(-1 ; 0 ; -1), (0 ; 1 ; 0), (1 ; 0 ; 0)}, et P = [[-1,0,1],[0,1,0],[-1,0,0]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [free, sans aide]  P⁻¹ = ?
    (L’inverse de P)
    = [[0,0,-1],[0,1,0],[1,0,-1]]   ← Réduire [P | I]
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[-1,3,0],[1,1,-3],[-2,2,1]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[2,-2,-1],[1,1,-3],[1,1,-1]]   ← Contrôle : T(b₁) = A·b₁ = 2b₁ + b₂ + b₃

T : ℝ³ → ℝ³ a pour matrice canonique A = [[0,0,1],[0,-2,0],[-1,3,3]]. Soit B = {(0 ; 0 ; -1), (0 ; 1 ; 0), (1 ; 0 ; 2)}, et P = [[0,0,1],[0,1,0],[-1,0,2]] (les vecteurs de B en colonnes). Calcule P⁻¹, A·P, puis [T]_B.
  [free, sans aide]  P⁻¹ = ?
    (L’inverse de P)
    = [[2,0,-1],[0,1,0],[1,0,0]]   ← Réduire [P | I]
  — Le produit A·P  [juge mat]  départ : A·P = ?
    = [[-1,0,2],[0,-2,0],[-3,3,5]]
  — [T]_B = P⁻¹AP  [juge mat]  départ : [T]_B = P⁻¹·(AP) = ?
    = [[1,-3,-1],[0,-2,0],[-1,0,2]]   ← Contrôle : T(b₁) = A·b₁ = b₁ − b₃

```

### Variantes d'examen

```
B = {(1 ; 1), (1 ; 2)} est une base de ℝ², et la matrice de T dans B est [T]_B = [[-2,3],[-1,-2]]. Que vaut T(x) ?
  · T(x) = (5x₁ + 13x₂ ; −4x₁ − 9x₂) [l_similar_order]   ✔ T(x) = (−7x₁ + 4x₂ ; −7x₁ + 3x₂)   · T(x) = (−7x₁ − 7x₂ ; 4x₁ + 3x₂) [l_matrix_rows_cols]   · T(x) = (−2x₁ + 3x₂ ; −x₁ − 2x₂)
  [examen mcq]
  pièges : l_similar_order, l_matrix_rows_cols

Vrai ou faux ?
  « Deux matrices semblables ont les mêmes valeurs propres. » → VRAI
  [examen tf]

```

## Vérifier un vecteur propre ou une valeur propre (`l-eig-check`, BA1)

_Calculer Av ; échelonner A − λI._

### Niveau 1

```
Soit A = [[8,-6],[3,-1]]. Le vecteur (2 ; 2) est-il un vecteur propre de A ? Et 6 est-elle une valeur propre de A ?
  [guided]  A·(2 ; 2)
    (Calcule A·(2 ; 2).)
    = (4 ; 4)   (cases à remplir : (1,1) (2,1))   ← = 2·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ((2 ; 2) est-il un vecteur propre de A ? Oui.)
    = 2   ← v est un vecteur propre, de valeur propre 2
  — Est-ce que 6 est une valeur propre de A ? Écris d'abord A − 6I.  [juge mat]  départ : A − 6I
    = [[2,-6],[3,-7]]   (cases à remplir : (1,1) (2,2))   ← 6 retranché sur la diagonale
  — Échelonne A − 6I.  [juge rowops]  départ : [[2,-6],[3,-7]]
    = L2 ← L2 - (3/2)L1 : [[2,-6],[0,2]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − (3/2)L₁
  — Combien de variables libres a (A − 6I)x = 0 ? (6 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    (6 est-elle une valeur propre de A ? Non.)
    = 0   ← Seule la solution nulle : 6 n'est pas valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − 6I = [[□, −6], [3, □]] à échelonner. | Av = (4 ; 4). 6 n'est pas valeur propre.

Soit A = [[-6,4],[-8,6]]. Le vecteur (2 ; 3) est-il un vecteur propre de A ? Et −2 est-elle une valeur propre de A ?
  [guided]  A·(2 ; 3)
    (Calcule A·(2 ; 3).)
    = (0 ; 2)   (cases à remplir : (1,1) (2,1))   ← Pas un multiple de v
  — Est-ce que −2 est une valeur propre de A ? Écris d'abord A + 2I.  [juge mat]  départ : A + 2I
    ((2 ; 3) est-il un vecteur propre de A ? Non.)
    = [[-4,4],[-8,8]]   (cases à remplir : (1,1) (2,2))   ← −2 retranché sur la diagonale
  — Échelonne A + 2I.  [juge rowops]  départ : [[-4,4],[-8,8]]
    = L2 ← L2 - 2L1 : [[-4,4],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − 2L₁
  — Combien de variables libres a (A + 2I)x = 0 ? (−2 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    (−2 est-elle une valeur propre de A ? Oui.)
    = 1   ← Une solution non nulle : −2 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A + 2I = [[□, 4], [−8, □]] à échelonner. | Av = (0 ; 2). −2 est valeur propre.

Soit A = [[5,2],[-4,-1]]. Le vecteur (2 ; −3) est-il un vecteur propre de A ? Et 6 est-elle une valeur propre de A ?
  [guided]  A·(2 ; -3)
    (Calcule A·(2 ; −3).)
    = (4 ; -5)   (cases à remplir : (1,1) (2,1))   ← Pas un multiple de v
  — Est-ce que 6 est une valeur propre de A ? Écris d'abord A − 6I.  [juge mat]  départ : A − 6I
    ((2 ; −3) est-il un vecteur propre de A ? Non.)
    = [[-1,2],[-4,-7]]   (cases à remplir : (1,1) (2,2))   ← 6 retranché sur la diagonale
  — Échelonne A − 6I.  [juge rowops]  départ : [[-1,2],[-4,-7]]
    = L2 ← L2 - 4L1 : [[-1,2],[0,-15]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
  — Combien de variables libres a (A − 6I)x = 0 ? (6 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    (6 est-elle une valeur propre de A ? Non.)
    = 0   ← Seule la solution nulle : 6 n'est pas valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − 6I = [[□, 2], [−4, □]] à échelonner. | Av = (4 ; −5). 6 n'est pas valeur propre.

```

### Niveau 2

```
Soit A = [[3,-1],[2,6]]. Le vecteur (−1 ; 1) est-il un vecteur propre de A ? Et −1 est-elle une valeur propre de A ?
  [guided]  A·(-1 ; 1)
    (Calcule A·(−1 ; 1).)
    ? Pour savoir si (−1 ; 1) est un vecteur propre, que fais-tu ? ✔ Je calcule Av et je compare à v / · J'échelonne A − λI
    = (-4 ; 4)   (cases à remplir : (1,1) (2,1))   ← = 4·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (−1 ; 1) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 4   ← v est un vecteur propre, de valeur propre 4
  — Est-ce que −1 est une valeur propre de A ? Écris d'abord A + I.  [juge mat]  départ : A + I
    = [[4,-1],[2,7]]   (cases à remplir : (1,1) (2,2))   ← −1 retranché sur la diagonale
  — Échelonne A + I.  [juge rowops]  départ : [[4,-1],[2,7]]
    = L2 ← L2 - (1/2)L1 : [[4,-1],[0,15/2]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − (1/2)L₁
  — Combien de variables libres a (A + I)x = 0 ? (−1 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? −1 est-elle une valeur propre de A ? · Oui / ✔ Non
    = 0   ← Seule la solution nulle : −1 n'est pas valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A + I = [[□, −1], [2, □]] à échelonner. | Av = (−4 ; 4). −1 n'est pas valeur propre.

Soit A = [[-7,-4],[8,5]]. Le vecteur (2 ; −3) est-il un vecteur propre de A ? Et 1 est-elle une valeur propre de A ?
  [guided]  A·(2 ; -3)
    (Calcule A·(2 ; −3).)
    ? Pour savoir si (2 ; −3) est un vecteur propre, que fais-tu ? ✔ Je calcule Av et je compare à v / · J'échelonne A − λI
    = (-2 ; 1)   (cases à remplir : (1,1) (2,1))   ← Pas un multiple de v
  — Est-ce que 1 est une valeur propre de A ? Écris d'abord A − I.  [juge mat]  départ : A − I
    ? (2 ; −3) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[-8,-4],[8,4]]   (cases à remplir : (1,1) (2,2))   ← 1 retranché sur la diagonale
  — Échelonne A − I.  [juge rowops]  départ : [[-8,-4],[8,4]]
    = L2 ← L2 + L1 : [[-8,-4],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ + L₁
  — Combien de variables libres a (A − I)x = 0 ? (1 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 1 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 1 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − I = [[□, −4], [8, □]] à échelonner. | Av = (−2 ; 1). 1 est valeur propre.

Soit A = [[5,-3],[6,-4]]. Le vecteur (1 ; 1) est-il un vecteur propre de A ? Et 3 est-elle une valeur propre de A ?
  [guided]  A·(1 ; 1)
    (Calcule A·(1 ; 1).)
    ? Pour savoir si (1 ; 1) est un vecteur propre, que fais-tu ? ✔ Je calcule Av et je compare à v / · J'échelonne A − λI
    = (2 ; 2)   (cases à remplir : (1,1) (2,1))   ← = 2·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (1 ; 1) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 2   ← v est un vecteur propre, de valeur propre 2
  — Est-ce que 3 est une valeur propre de A ? Écris d'abord A − 3I.  [juge mat]  départ : A − 3I
    = [[2,-3],[6,-7]]   (cases à remplir : (1,1) (2,2))   ← 3 retranché sur la diagonale
  — Échelonne A − 3I.  [juge rowops]  départ : [[2,-3],[6,-7]]
    = L2 ← L2 - 3L1 : [[2,-3],[0,2]]   (cases à remplir : (2,1) (2,2))   ← Annuler sous le pivot : L₂ ← L₂ − 3L₁
  — Combien de variables libres a (A − 3I)x = 0 ? (3 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 3 est-elle une valeur propre de A ? · Oui / ✔ Non
    = 0   ← Seule la solution nulle : 3 n'est pas valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − 3I = [[□, −3], [6, □]] à échelonner. | Av = (2 ; 2). 3 n'est pas valeur propre.

```

### Niveau 3

```
Soit A = [[6,-1],[2,3]]. Le vecteur (2 ; 2) est-il un vecteur propre de A ? Et 4 est-elle une valeur propre de A ?
  [tap, suivre l'erreur, menu menu]  A·(2 ; 2)
    (Calcule A·(2 ; 2).)
    = (10 ; 10)   ← = 5·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (2 ; 2) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 5   ← v est un vecteur propre, de valeur propre 5
  — Est-ce que 4 est une valeur propre de A ? Écris d'abord A − 4I.  [juge mat]  départ : A − 4I
    = [[2,-1],[2,-1]]   ← 4 retranché sur la diagonale
  — Échelonne A − 4I.  [juge rowops]  départ : [[2,-1],[2,-1]]
    = L2 ← L2 - L1 : [[2,-1],[0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
  — Combien de variables libres a (A − 4I)x = 0 ? (4 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 4 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 4 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − 4I = [[□, −1], [2, □]] à échelonner. | Av = (10 ; 10). 4 est valeur propre.

Soit A = [[-5,-8],[4,7]]. Le vecteur (3 ; −2) est-il un vecteur propre de A ? Et 3 est-elle une valeur propre de A ?
  [tap, suivre l'erreur, menu menu]  A·(3 ; -2)
    (Calcule A·(3 ; −2).)
    = (1 ; -2)   ← Pas un multiple de v
  — Est-ce que 3 est une valeur propre de A ? Écris d'abord A − 3I.  [juge mat]  départ : A − 3I
    ? (3 ; −2) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[-8,-8],[4,4]]   ← 3 retranché sur la diagonale
  — Échelonne A − 3I.  [juge rowops]  départ : [[-8,-8],[4,4]]
    = L2 ← L2 + (1/2)L1 : [[-8,-8],[0,0]]   ← Annuler sous le pivot : L₂ ← L₂ + (1/2)L₁
  — Combien de variables libres a (A − 3I)x = 0 ? (3 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 3 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 3 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A − 3I = [[□, −8], [4, □]] à échelonner. | Av = (1 ; −2). 3 est valeur propre.

Soit A = [[-5,4],[-2,1]]. Le vecteur (4 ; 2) est-il un vecteur propre de A ? Et −1 est-elle une valeur propre de A ?
  [tap, suivre l'erreur, menu menu]  A·(4 ; 2)
    (Calcule A·(4 ; 2).)
    = (-12 ; -6)   ← = −3·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (4 ; 2) est-il un vecteur propre de A ? ✔ Oui / · Non
    = −3   ← v est un vecteur propre, de valeur propre −3
  — Est-ce que −1 est une valeur propre de A ? Écris d'abord A + I.  [juge mat]  départ : A + I
    = [[-4,4],[-2,2]]   ← −1 retranché sur la diagonale
  — Échelonne A + I.  [juge rowops]  départ : [[-4,4],[-2,2]]
    = L2 ← L2 - (1/2)L1 : [[-4,4],[0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − (1/2)L₁
  — Combien de variables libres a (A + I)x = 0 ? (−1 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? −1 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : −1 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □) = □·v ? Puis A + I = [[□, 4], [−2, □]] à échelonner. | Av = (−12 ; −6). −1 est valeur propre.

```

### Niveau 4

```
Soit A = [[1,2,0],[0,2,0],[0,-1,3]]. Le vecteur (1 ; 0 ; 1) est-il un vecteur propre de A ? Et 1 est-elle une valeur propre de A ?
  [free, suivre l'erreur]  A·(1 ; 0 ; 1)
    (Calcule A·(1 ; 0 ; 1).)
    = (1 ; 0 ; 3)   ← Pas un multiple de v
  — Est-ce que 1 est une valeur propre de A ? Écris d'abord A − I.  [juge mat]  départ : A − I
    ? (1 ; 0 ; 1) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[0,2,0],[0,1,0],[0,-1,2]]   ← 1 retranché sur la diagonale
  — Échelonne A − I.  [juge rowops]  départ : [[0,2,0],[0,1,0],[0,-1,2]]
    = L2 ← L2 - (1/2)L1 : [[0,2,0],[0,0,0],[0,-1,2]]   ← Annuler sous le pivot : L₂ ← L₂ − (1/2)L₁
    = L3 ← L3 + (1/2)L1 : [[0,2,0],[0,0,0],[0,0,2]]   ← Annuler sous le pivot : L₃ ← L₃ + (1/2)L₁
    = L2 ↔ L3 : [[0,2,0],[0,0,2],[0,0,0]]   ← Échanger
  — Combien de variables libres a (A − I)x = 0 ? (1 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 1 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 1 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □ ; □) = □·v ? Puis A − I = [[□, 2, 0], [0, □, 0], [0, −1, □]] à échelonner. | Av = (1 ; 0 ; 3). 1 est valeur propre.

Soit A = [[-1,0,0],[-6,1,-2],[8,0,3]]. Le vecteur (0 ; −1 ; 1) est-il un vecteur propre de A ? Et 3 est-elle une valeur propre de A ?
  [free, suivre l'erreur]  A·(0 ; -1 ; 1)
    (Calcule A·(0 ; −1 ; 1).)
    = (0 ; -3 ; 3)   ← = 3·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (0 ; −1 ; 1) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 3   ← v est un vecteur propre, de valeur propre 3
  — Est-ce que 3 est une valeur propre de A ? Écris d'abord A − 3I.  [juge mat]  départ : A − 3I
    = [[-4,0,0],[-6,-2,-2],[8,0,0]]   ← 3 retranché sur la diagonale
  — Échelonne A − 3I.  [juge rowops]  départ : [[-4,0,0],[-6,-2,-2],[8,0,0]]
    = L2 ← L2 - (3/2)L1 : [[-4,0,0],[0,-2,-2],[8,0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − (3/2)L₁
    = L3 ← L3 + 2L1 : [[-4,0,0],[0,-2,-2],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ + 2L₁
  — Combien de variables libres a (A − 3I)x = 0 ? (3 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 3 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 3 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □ ; □) = □·v ? Puis A − 3I = [[□, 0, 0], [−6, □, −2], [8, 0, □]] à échelonner. | Av = (0 ; −3 ; 3). 3 est valeur propre.

Soit A = [[3,-2,0],[4,-3,-3],[0,0,2]]. Le vecteur (1 ; 1 ; 0) est-il un vecteur propre de A ? Et 2 est-elle une valeur propre de A ?
  [free, suivre l'erreur]  A·(1 ; 1 ; 0)
    (Calcule A·(1 ; 1 ; 0).)
    = (1 ; 1 ; 0)   ← = 1·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (1 ; 1 ; 0) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 1   ← v est un vecteur propre, de valeur propre 1
  — Est-ce que 2 est une valeur propre de A ? Écris d'abord A − 2I.  [juge mat]  départ : A − 2I
    = [[1,-2,0],[4,-5,-3],[0,0,0]]   ← 2 retranché sur la diagonale
  — Échelonne A − 2I.  [juge rowops]  départ : [[1,-2,0],[4,-5,-3],[0,0,0]]
    = L2 ← L2 - 4L1 : [[1,-2,0],[0,3,-3],[0,0,0]]   ← Annuler sous le pivot : L₂ ← L₂ − 4L₁
  — Combien de variables libres a (A − 2I)x = 0 ? (2 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 2 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 2 est valeur propre
  aides : Calcule Av et compare à v : v est propre si Av = λv pour un nombre λ (et v ≠ 0). Pour une valeur μ, échelonne A − μI et cherche une variable libre. | Av = (□ ; □ ; □) = □·v ? Puis A − 2I = [[□, −2, 0], [4, □, −3], [0, 0, □]] à échelonner. | Av = (1 ; 1 ; 0). 2 est valeur propre.

```

### Niveau 5

```
Soit A = [[-2,-4,4],[2,7,-8],[2,5,-6]]. Les vecteurs (2 ; −4 ; −2) et (2 ; −4 ; −3) sont-ils des vecteurs propres de A ? Et −2 est-elle une valeur propre de A ?
  [free, sans aide]  A·(2 ; -4 ; -2)
    (Calcule A·(2 ; −4 ; −2).)
    = (4 ; -8 ; -4)   ← = 2·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (2 ; −4 ; −2) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 2   ← v est un vecteur propre, de valeur propre 2
  — Calcule A·(2 ; −4 ; −3).  [juge mat]  départ : A·(2 ; -4 ; -3)
    = (0 ; 0 ; 2)   ← Pas un multiple de v
  — Est-ce que −2 est une valeur propre de A ? Écris d'abord A + 2I.  [juge mat]  départ : A + 2I
    ? (2 ; −4 ; −3) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[0,-4,4],[2,9,-8],[2,5,-4]]   ← −2 retranché sur la diagonale
  — Échelonne A + 2I.  [juge rowops]  départ : [[0,-4,4],[2,9,-8],[2,5,-4]]
    = L1 ↔ L2 : [[2,9,-8],[0,-4,4],[2,5,-4]]   ← Échanger
    = L3 ← L3 - L1 : [[2,9,-8],[0,-4,4],[0,-4,4]]   ← Annuler sous le pivot : L₃ ← L₃ − L₁
    = L3 ← L3 - L2 : [[2,9,-8],[0,-4,4],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ − L₂
  — Combien de variables libres a (A + 2I)x = 0 ? (−2 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? −2 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : −2 est valeur propre

Soit A = [[-2,3,7],[0,1,-1],[0,0,2]]. Les vecteurs (−1 ; 0 ; 0) et (2 ; −1 ; 1) sont-ils des vecteurs propres de A ? Et −2 est-elle une valeur propre de A ?
  [free, sans aide]  A·(-1 ; 0 ; 0)
    (Calcule A·(−1 ; 0 ; 0).)
    = (2 ; 0 ; 0)   ← = −2·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (−1 ; 0 ; 0) est-il un vecteur propre de A ? ✔ Oui / · Non
    = −2   ← v est un vecteur propre, de valeur propre −2
  — Calcule A·(2 ; −1 ; 1).  [juge mat]  départ : A·(2 ; -1 ; 1)
    = (0 ; -2 ; 2)   ← Pas un multiple de v
  — Est-ce que −2 est une valeur propre de A ? Écris d'abord A + 2I.  [juge mat]  départ : A + 2I
    ? (2 ; −1 ; 1) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[0,3,7],[0,3,-1],[0,0,4]]   ← −2 retranché sur la diagonale
  — Échelonne A + 2I.  [juge rowops]  départ : [[0,3,7],[0,3,-1],[0,0,4]]
    = L2 ← L2 - L1 : [[0,3,7],[0,0,-8],[0,0,4]]   ← Annuler sous le pivot : L₂ ← L₂ − L₁
    = L3 ← L3 + (1/2)L2 : [[0,3,7],[0,0,-8],[0,0,0]]   ← Annuler sous le pivot : L₃ ← L₃ + (1/2)L₂
  — Combien de variables libres a (A + 2I)x = 0 ? (−2 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? −2 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : −2 est valeur propre

Soit A = [[2,-2,0],[0,4,0],[6,6,5]]. Les vecteurs (−1 ; 1 ; 0) et (1 ; −1 ; 1) sont-ils des vecteurs propres de A ? Et 4 est-elle une valeur propre de A ?
  [free, sans aide]  A·(-1 ; 1 ; 0)
    (Calcule A·(−1 ; 1 ; 0).)
    = (-4 ; 4 ; 0)   ← = 4·v
  — Av = λv : que vaut λ ?  [juge value]  départ : λ
    ? (−1 ; 1 ; 0) est-il un vecteur propre de A ? ✔ Oui / · Non
    = 4   ← v est un vecteur propre, de valeur propre 4
  — Calcule A·(1 ; −1 ; 1).  [juge mat]  départ : A·(1 ; -1 ; 1)
    = (4 ; -4 ; 5)   ← Pas un multiple de v
  — Est-ce que 4 est une valeur propre de A ? Écris d'abord A − 4I.  [juge mat]  départ : A − 4I
    ? (1 ; −1 ; 1) est-il un vecteur propre de A ? · Oui / ✔ Non
    = [[-2,-2,0],[0,0,0],[6,6,1]]   ← 4 retranché sur la diagonale
  — Échelonne A − 4I.  [juge rowops]  départ : [[-2,-2,0],[0,0,0],[6,6,1]]
    = L3 ← L3 + 3L1 : [[-2,-2,0],[0,0,0],[0,0,1]]   ← Annuler sous le pivot : L₃ ← L₃ + 3L₁
    = L2 ↔ L3 : [[-2,-2,0],[0,0,1],[0,0,0]]   ← Échanger
  — Combien de variables libres a (A − 4I)x = 0 ? (4 est valeur propre si et seulement s'il y en a au moins une.)  [juge value]  départ : n
    ? 4 est-elle une valeur propre de A ? ✔ Oui / · Non
    = 1   ← Une solution non nulle : 4 est valeur propre

```

### Variantes d'examen

```
Soit A = [[-1,0,0],[0,2,0],[-8,1,3]]. Lequel de ces vecteurs est un vecteur propre de A ?
  ✔ (0 ; 2 ; -2)   · (0 ; 1 ; 0)   · (0 ; 0 ; 0) [l_eigvec_zero]   · (-3 ; 0 ; 0) [l_eigvec_row]
  [examen mcq]
  pièges : l_eigvec_zero, l_eigvec_row

Vrai ou faux ?
  « Si v est un vecteur propre de A, alors 2v en est aussi un. » → VRAI
  [examen tf]

```

## Polynôme caractéristique et valeurs propres (`l-eig-charpoly`, BA1)

_p(λ) = det(A − λI), puis ses racines._

### Niveau 1

```
Calcule le polynôme caractéristique de A = [[-2,3],[-6,7]], factorise-le, puis donne les valeurs propres de A.
  [guided]  A − λI
    (Écris A − λI.)
    = [[-2-λ,3],[-6,7-λ]]   (cases à remplir : (1,1) (2,2))   ← λ sur toute la diagonale
  — Développe det(A − λI).  [juge det]  départ : det[[-2-λ,3],[-6,7-λ]]
    = (−2 − λ)(7 − λ) + □   (trous : (−2 − λ)(7 − λ) + 18)   ← Diagonale moins antidiagonale
    = λ² − □λ + □   (trous : λ² − 5λ + 4)   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 4)   ← Factoriser le trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ − 1)(λ − 4) = 0
    = λ = 1 ou λ = 4   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe : diagonale moins antidiagonale. | (−2−λ)(7−λ) − □ | det(A − λI) = (λ − 1)(λ − 4) : valeurs propres 1, 4.
  pièges : l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[6,6],[-3,-3]], factorise-le, puis donne les valeurs propres de A.
  [guided]  A − λI
    (Écris A − λI.)
    = [[6-λ,6],[-3,-3-λ]]   (cases à remplir : (1,1) (2,2))   ← λ sur toute la diagonale
  — Développe det(A − λI).  [juge det]  départ : det[[6-λ,6],[-3,-3-λ]]
    = (□ − λ)(−3 − λ) + 18   (trous : (6 − λ)(−3 − λ) + 18)   ← Diagonale moins antidiagonale
    = λ² − □λ   (trous : λ² − 3λ)   ← λ² − (tr A)λ + det A
    = λ(λ − 3)   ← Factoriser le trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : λ(λ − 3) = 0
    = λ = 0 ou λ = 3   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe : diagonale moins antidiagonale. | (6−λ)(−3−λ) − □ | det(A − λI) = λ(λ − 3) : valeurs propres 0, 3.
  pièges : l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[4,2],[-4,-2]], factorise-le, puis donne les valeurs propres de A.
  [guided]  A − λI
    (Écris A − λI.)
    = [[4-λ,2],[-4,-2-λ]]   (cases à remplir : (1,1) (2,2))   ← λ sur toute la diagonale
  — Développe det(A − λI).  [juge det]  départ : det[[4-λ,2],[-4,-2-λ]]
    = (4 − λ)(−2 − λ) + □   (trous : (4 − λ)(−2 − λ) + 8)   ← Diagonale moins antidiagonale
    = λ² − □λ   (trous : λ² − 2λ)   ← λ² − (tr A)λ + det A
    = λ(λ − 2)   ← Factoriser le trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : λ(λ − 2) = 0
    = λ = 0 ou λ = 2   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe : diagonale moins antidiagonale. | (4−λ)(−2−λ) − □ | det(A − λI) = λ(λ − 2) : valeurs propres 0, 2.
  pièges : l_lambda_one_entry

```

### Niveau 2

```
Calcule le polynôme caractéristique de A = [[1,-3,-4],[0,2,0],[2,-9,-5]], factorise-le, puis donne les valeurs propres de A.
  [guided]  det(A − λI)
    ? Selon quelle ligne développer det(A − λI) ? ✔ La ligne 3 / ✔ La ligne 2
    = (2-λ)·det[[1-λ,-4],[2,-5-λ]]   ← Développer selon la ligne 2
    = (2 − λ)((1 − λ)(−5 − λ) + 8)   ← Mineur 2 × 2
    = (2 − λ)(λ² + 4λ + 3)   ← Développer le mineur
    = −(λ + 3)(λ + 1)(λ − 2)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 3)(λ + 1)(λ − 2) = 0
    = λ = −3 ou λ = −1 ou λ = 2   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (2−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ + 3)(λ + 1)(λ − 2) : valeurs propres −3, −1, 2.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[6,-4,-4],[0,6,0],[2,-4,0]], factorise-le, puis donne les valeurs propres de A.
  [guided]  det(A − λI)
    ? Selon quelle ligne développer det(A − λI) ? ✔ La ligne 2 / ✔ La ligne 3
    = (6-λ)·det[[6-λ,-4],[2,-λ]]   ← Développer selon la ligne 2
    = (6 − λ)((6 − λ)(−λ) + 8)   ← Mineur 2 × 2
    = (6 − λ)(λ² − 6λ + 8)   ← Développer le mineur
    = −(λ − 2)(λ − 4)(λ − 6)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ − 2)(λ − 4)(λ − 6) = 0
    = λ = 2 ou λ = 4 ou λ = 6   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (6−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ − 2)(λ − 4)(λ − 6) : valeurs propres 2, 4, 6.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[0,0,1],[0,1,0],[-2,-6,-3]], factorise-le, puis donne les valeurs propres de A.
  [guided]  det(A − λI)
    ? Selon quelle ligne développer det(A − λI) ? ✔ La ligne 3 / ✔ La ligne 2
    = (1-λ)·det[[-λ,1],[-2,-3-λ]]   ← Développer selon la ligne 2
    = (1 − λ)((−λ)(−3 − λ) + 2)   ← Mineur 2 × 2
    = (1 − λ)(λ² + 3λ + 2)   ← Développer le mineur
    = −(λ + 2)(λ + 1)(λ − 1)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 2)(λ + 1)(λ − 1) = 0
    = λ = −2 ou λ = −1 ou λ = 1   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (1−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ + 2)(λ + 1)(λ − 1) : valeurs propres −2, −1, 1.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Niveau 3

```
Calcule le polynôme caractéristique de A = [[-6,-2],[4,0]], factorise-le, puis donne les valeurs propres de A : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = det[[-6-λ,-2],[4,-λ]]   ← λ soustrait sur toute la diagonale
    = (−6 − λ)(−λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 6λ + 8   ← λ² − (tr A)λ + det A
    = (λ + 4)(λ + 2)   ← Factoriser le trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 4)(λ + 2) = 0
    = λ = −4 ou λ = −2   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe : diagonale moins antidiagonale. | (−6−λ)(−λ) − □ | det(A − λI) = (λ + 4)(λ + 2) : valeurs propres −4, −2.
  pièges : l_charpoly_sign, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[2,-4,3],[2,8,-9],[0,0,1]], factorise-le, puis donne les valeurs propres de A : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = (1-λ)·det[[2-λ,-4],[2,8-λ]]   ← Développer selon la ligne 3
    = (1 − λ)((2 − λ)(8 − λ) + 8)   ← Mineur 2 × 2
    = (1 − λ)(λ² − 10λ + 24)   ← Développer le mineur
    = −(λ − 1)(λ − 4)(λ − 6)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ − 1)(λ − 4)(λ − 6) = 0
    = λ = 1 ou λ = 4 ou λ = 6   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (1−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ − 1)(λ − 4)(λ − 6) : valeurs propres 1, 4, 6.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[1,4],[-2,-5]], factorise-le, puis donne les valeurs propres de A : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = det[[1-λ,4],[-2,-5-λ]]   ← λ soustrait sur toute la diagonale
    = (1 − λ)(−5 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 4λ + 3   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ + 1)   ← Factoriser le trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 3)(λ + 1) = 0
    = λ = −3 ou λ = −1   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe : diagonale moins antidiagonale. | (1−λ)(−5−λ) − □ | det(A − λI) = (λ + 3)(λ + 1) : valeurs propres −3, −1.
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 4

```
Calcule le polynôme caractéristique de A = [[-1,-5,1],[0,3,0],[-2,5,-4]], factorise-le, puis donne les valeurs propres de A.
  [free, suivre l'erreur]  det(A − λI)
    = (3-λ)·det[[-1-λ,1],[-2,-4-λ]]   ← Développer selon la ligne 2
    = (3 − λ)((−1 − λ)(−4 − λ) + 2)   ← Mineur 2 × 2
    = (3 − λ)(λ² + 5λ + 6)   ← Développer le mineur
    = −(λ + 3)(λ + 2)(λ − 3)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 3)(λ + 2)(λ − 3) = 0
    = λ = −3 ou λ = −2 ou λ = 3   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (3−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ + 3)(λ + 2)(λ − 3) : valeurs propres −3, −2, 3.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[0,2,8],[-1,3,4],[0,0,-3]], factorise-le, puis donne les valeurs propres de A.
  [free, suivre l'erreur]  det(A − λI)
    = (-3-λ)·det[[-λ,2],[-1,3-λ]]   ← Développer selon la ligne 3
    = (−3 − λ)((−λ)(3 − λ) + 2)   ← Mineur 2 × 2
    = (−3 − λ)(λ² − 3λ + 2)   ← Développer le mineur
    = −(λ + 3)(λ − 1)(λ − 2)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 3)(λ − 1)(λ − 2) = 0
    = λ = −3 ou λ = 1 ou λ = 2   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (−3−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ + 3)(λ − 1)(λ − 2) : valeurs propres −3, 1, 2.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[-1,4,-8],[-2,5,-4],[0,0,-3]], factorise-le, puis donne les valeurs propres de A.
  [free, suivre l'erreur]  det(A − λI)
    = (-3-λ)·det[[-1-λ,4],[-2,5-λ]]   ← Développer selon la ligne 3
    = (−3 − λ)((−1 − λ)(5 − λ) + 8)   ← Mineur 2 × 2
    = (−3 − λ)(λ² − 4λ + 3)   ← Développer le mineur
    = −(λ + 3)(λ − 1)(λ − 3)   ← Factoriser
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 3)(λ − 1)(λ − 3) = 0
    = λ = −3 ou λ = 1 ou λ = 3   ← Lire les racines
  aides : Soustrais λ sur toute la diagonale, puis développe selon la ligne la plus creuse. | (−3−λ)·((□ − λ)(□ − λ) − □) | det(A − λI) = −(λ + 3)(λ − 1)(λ − 3) : valeurs propres −3, 1, 3.
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Niveau 5

```
Calcule le polynôme caractéristique de A = [[6,-2,0,0],[4,0,0,0],[1,0,0,-1],[0,0,2,-3]], factorise-le, puis donne les valeurs propres de A.
  [free, sans aide]  det(A − λI)
    = det[[6-λ,-2],[4,-λ]]·det[[-λ,-1],[2,-3-λ]]   ← Triangulaire par blocs : produit des blocs diagonaux
    = (λ² − 6λ + 8)(λ² + 3λ + 2)   ← Deux déterminants 2 × 2
    = (λ + 2)(λ + 1)(λ − 2)(λ − 4)   ← Factoriser chaque trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ + 2)(λ + 1)(λ − 2)(λ − 4) = 0
    = λ = −2 ou λ = −1 ou λ = 2 ou λ = 4   ← Lire les racines
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[3,-2,0,0],[1,6,0,0],[-1,0,0,1],[0,2,-2,3]], factorise-le, puis donne les valeurs propres de A.
  [free, sans aide]  det(A − λI)
    = det[[3-λ,-2],[1,6-λ]]·det[[-λ,1],[-2,3-λ]]   ← Triangulaire par blocs : produit des blocs diagonaux
    = (λ² − 9λ + 20)(λ² − 3λ + 2)   ← Deux déterminants 2 × 2
    = (λ − 1)(λ − 2)(λ − 4)(λ − 5)   ← Factoriser chaque trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ − 1)(λ − 2)(λ − 4)(λ − 5) = 0
    = λ = 1 ou λ = 2 ou λ = 4 ou λ = 5   ← Lire les racines
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Calcule le polynôme caractéristique de A = [[0,-1,0,0],[2,3,0,0],[1,-2,3,1],[-1,2,-2,6]], factorise-le, puis donne les valeurs propres de A.
  [free, sans aide]  det(A − λI)
    = det[[-λ,-1],[2,3-λ]]·det[[3-λ,1],[-2,6-λ]]   ← Triangulaire par blocs : produit des blocs diagonaux
    = (λ² − 3λ + 2)(λ² − 9λ + 20)   ← Deux déterminants 2 × 2
    = (λ − 1)(λ − 2)(λ − 4)(λ − 5)   ← Factoriser chaque trinôme
  — Les valeurs propres sont les racines.  [juge solset]  départ : (λ − 1)(λ − 2)(λ − 4)(λ − 5) = 0
    = λ = 1 ou λ = 2 ou λ = 4 ou λ = 5   ← Lire les racines
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Variantes d'examen

```
Quelles sont les valeurs propres de A = [[9,8],[-4,-3]] ?
  · {5/9 ; 9} [l_eigen_rref]   · {−5/3} [l_lambda_one_entry]   ✔ {1 ; 5}   · {(6 − √272)/2 ; (6 + √272)/2} [l_charpoly_sign]
  [examen mcq]
  pièges : l_charpoly_sign, l_lambda_one_entry, l_eigen_rref

Vrai ou faux ?
  « Une matrice carrée A et une forme échelonnée de A ont les mêmes valeurs propres. » → FAUX
    contre-exemple (matOne) : A = [[1,1],[1,2]], E = [[1,1],[0,1]]
  [examen tf]
  pièges : l_eigen_rref

```

## Espaces propres : base de E_λ (`l-eig-space`, BA1)

_E_λ = Ker(A − λI)._

### Niveau 1

```
Les valeurs propres de A = [[1,-1],[2,4]] sont {2 ; 3}. Donne une base de l'espace propre de chacune des valeurs 2 et 3.
  [guided]  A − 2I
    (λ = 2 : écris A − 2I.)
    = [[-1,-1],[2,2]]   (cases à remplir : (1,1) (2,2))   ← 2 retranché sur la diagonale
  — Réduis A − 2I.  [juge rowops]  départ : [[-1,-1],[2,2]]
    = L2 ← L2 + 2L1 : [[-1,-1],[0,0]]   (cases à remplir : (2,2))   ← Annuler : L₂ ← L₂ + 2L₁
    = L1 ← -L1 : [[1,1],[0,0]]   (cases à remplir : (1,2))   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    = (1 ; -1)   (cases à remplir : (1,1))   ← Variable libre = 1
  — λ = 3 : écris A − 3I.  [juge mat]  départ : A − 3I
    = [[-2,-1],[2,1]]   (cases à remplir : (1,1) (2,2))   ← 3 retranché sur la diagonale
  — Réduis A − 3I.  [juge rowops]  départ : [[-2,-1],[2,1]]
    = L2 ← L2 + L1 : [[-2,-1],[0,0]]   (cases à remplir : (2,2))   ← Annuler : L₂ ← L₂ + L₁
    = L1 ← -(1/2)L1 : [[1,1/2],[0,0]]   (cases à remplir : (1,1))   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (1 ; -2)   (cases à remplir : (2,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(1 ; □)} | E₂ = Span{(1 ; −1)} ; E₃ = Span{(1 ; −2)}

Les valeurs propres de A = [[3,-2],[1,0]] sont {1 ; 2}. Donne une base de l'espace propre de chacune des valeurs 1 et 2.
  [guided]  A − I
    (λ = 1 : écris A − I.)
    = [[2,-2],[1,-1]]   (cases à remplir : (1,1) (2,2))   ← 1 retranché sur la diagonale
  — Réduis A − I.  [juge rowops]  départ : [[2,-2],[1,-1]]
    = L2 ← L2 - (1/2)L1 : [[2,-2],[0,0]]   (cases à remplir : (2,1))   ← Annuler : L₂ ← L₂ − (1/2)L₁
    = L1 ← (1/2)L1 : [[1,-1],[0,0]]   (cases à remplir : (1,1))   ← Pivot à 1
  — Donne une base de E₁ = Ker(A − I).  [juge eigvec]  départ : E_1
    = (1 ; 1)   (cases à remplir : (2,1))   ← Variable libre = 1
  — λ = 2 : écris A − 2I.  [juge mat]  départ : A − 2I
    = [[1,-2],[1,-2]]   (cases à remplir : (1,1) (2,2))   ← 2 retranché sur la diagonale
  — Réduis A − 2I.  [juge rowops]  départ : [[1,-2],[1,-2]]
    = L2 ← L2 - L1 : [[1,-2],[0,0]]   (cases à remplir : (2,1))   ← Annuler : L₂ ← L₂ − L₁
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    = (2 ; 1)   (cases à remplir : (1,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₁ = Span{(1 ; □)} | E₁ = Span{(1 ; 1)} ; E₂ = Span{(2 ; 1)}

Les valeurs propres de A = [[3,2],[-1,6]] sont {4 ; 5}. Donne une base de l'espace propre de chacune des valeurs 4 et 5.
  [guided]  A − 4I
    (λ = 4 : écris A − 4I.)
    = [[-1,2],[-1,2]]   (cases à remplir : (1,1) (2,2))   ← 4 retranché sur la diagonale
  — Réduis A − 4I.  [juge rowops]  départ : [[-1,2],[-1,2]]
    = L2 ← L2 - L1 : [[-1,2],[0,0]]   (cases à remplir : (2,2))   ← Annuler : L₂ ← L₂ − L₁
    = L1 ← -L1 : [[1,-2],[0,0]]   (cases à remplir : (1,1))   ← Pivot à 1
  — Donne une base de E₄ = Ker(A − 4I).  [juge eigvec]  départ : E_4
    = (2 ; 1)   (cases à remplir : (2,1))   ← Variable libre = 1
  — λ = 5 : écris A − 5I.  [juge mat]  départ : A − 5I
    = [[-2,2],[-1,1]]   (cases à remplir : (1,1) (2,2))   ← 5 retranché sur la diagonale
  — Réduis A − 5I.  [juge rowops]  départ : [[-2,2],[-1,1]]
    = L2 ← L2 - (1/2)L1 : [[-2,2],[0,0]]   (cases à remplir : (2,1))   ← Annuler : L₂ ← L₂ − (1/2)L₁
    = L1 ← -(1/2)L1 : [[1,-1],[0,0]]   (cases à remplir : (1,1))   ← Pivot à 1
  — Donne une base de E₅ = Ker(A − 5I).  [juge eigvec]  départ : E_5
    = (1 ; 1)   (cases à remplir : (1,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₄ = Span{(2 ; □)} | E₄ = Span{(2 ; 1)} ; E₅ = Span{(1 ; 1)}

```

### Niveau 2

```
Les valeurs propres de A = [[6,-1],[2,3]] sont {4 ; 5}. Donne une base de l'espace propre de chacune des valeurs 4 et 5.
  [guided]  A − 4I
    (λ = 4 : écris A − 4I.)
    = [[2,-1],[2,-1]]   (cases à remplir : (1,1) (2,2))   ← 4 retranché sur la diagonale
  — Réduis A − 4I.  [juge rowops]  départ : [[2,-1],[2,-1]]
    = L2 ← L2 - L1 : [[2,-1],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ − L₁
    = L1 ← (1/2)L1 : [[1,-1/2],[0,0]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — Donne une base de E₄ = Ker(A − 4I).  [juge eigvec]  départ : E_4
    ? Quelle variable est libre ? ✔ x₂ (colonne sans pivot) / · x₁ (colonne du pivot)
    = (1 ; 2)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  — λ = 5 : écris A − 5I.  [juge mat]  départ : A − 5I
    = [[1,-1],[2,-2]]   (cases à remplir : (1,1) (2,2))   ← 5 retranché sur la diagonale
  — Réduis A − 5I.  [juge rowops]  départ : [[1,-1],[2,-2]]
    = L2 ← L2 - 2L1 : [[1,-1],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ − 2L₁
  — Donne une base de E₅ = Ker(A − 5I).  [juge eigvec]  départ : E_5
    = (1 ; 1)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₄ = Span{(1 ; □)} | E₄ = Span{(1 ; 2)} ; E₅ = Span{(1 ; 1)}

Les valeurs propres de A = [[1,2],[-1,4]] sont {2 ; 3}. Donne une base de l'espace propre de chacune des valeurs 2 et 3.
  [guided]  A − 2I
    (λ = 2 : écris A − 2I.)
    = [[-1,2],[-1,2]]   (cases à remplir : (1,1) (2,2))   ← 2 retranché sur la diagonale
  — Réduis A − 2I.  [juge rowops]  départ : [[-1,2],[-1,2]]
    = L2 ← L2 - L1 : [[-1,2],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ − L₁
    = L1 ← -L1 : [[1,-2],[0,0]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    ? Quelle variable est libre ? ✔ x₂ (colonne sans pivot) / · x₁ (colonne du pivot)
    = (2 ; 1)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  — λ = 3 : écris A − 3I.  [juge mat]  départ : A − 3I
    = [[-2,2],[-1,1]]   (cases à remplir : (1,1) (2,2))   ← 3 retranché sur la diagonale
  — Réduis A − 3I.  [juge rowops]  départ : [[-2,2],[-1,1]]
    = L2 ← L2 - (1/2)L1 : [[-2,2],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ − (1/2)L₁
    = L1 ← -(1/2)L1 : [[1,-1],[0,0]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (1 ; 1)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(2 ; □)} | E₂ = Span{(2 ; 1)} ; E₃ = Span{(1 ; 1)}

Les valeurs propres de A = [[4,2],[-1,1]] sont {2 ; 3}. Donne une base de l'espace propre de chacune des valeurs 2 et 3.
  [guided]  A − 2I
    (λ = 2 : écris A − 2I.)
    = [[2,2],[-1,-1]]   (cases à remplir : (1,1) (2,2))   ← 2 retranché sur la diagonale
  — Réduis A − 2I.  [juge rowops]  départ : [[2,2],[-1,-1]]
    = L2 ← L2 + (1/2)L1 : [[2,2],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ + (1/2)L₁
    = L1 ← (1/2)L1 : [[1,1],[0,0]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    ? Quelle variable est libre ? ✔ x₂ (colonne sans pivot) / · x₁ (colonne du pivot)
    = (1 ; -1)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  — λ = 3 : écris A − 3I.  [juge mat]  départ : A − 3I
    = [[1,2],[-1,-2]]   (cases à remplir : (1,1) (2,2))   ← 3 retranché sur la diagonale
  — Réduis A − 3I.  [juge rowops]  départ : [[1,2],[-1,-2]]
    = L2 ← L2 + L1 : [[1,2],[0,0]]   (cases à remplir : (2,1) (2,2))   ← Annuler : L₂ ← L₂ + L₁
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (2 ; -1)   (cases à remplir : (1,1) (2,1))   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(1 ; □)} | E₂ = Span{(1 ; −1)} ; E₃ = Span{(2 ; −1)}

```

### Niveau 3

```
Les valeurs propres de A = [[3,1,-1],[0,3,0],[2,-1,0]] sont {1 ; 2 ; 3}. Donne une base de l'espace propre de chacune des valeurs 2 et 3 : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  A − 2I
    (Réduis A − 2I.)
    = L3 ← L3 - 2L1 : [[1,1,-1],[0,1,0],[0,-3,0]]   ← Annuler : L₃ ← L₃ − 2L₁
    = L3 ← L3 + 3L2 : [[1,1,-1],[0,1,0],[0,0,0]]   ← Annuler : L₃ ← L₃ + 3L₂
    = L1 ← L1 - L2 : [[1,0,-1],[0,1,0],[0,0,0]]   ← Annuler : L₁ ← L₁ − L₂
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    = (1 ; 0 ; 1)   ← Variable libre = 1
  — Réduis A − 3I.  [juge rowops]  départ : A − 3I
    = L1 ↔ L3 : [[2,-1,-3],[0,0,0],[0,1,-1]]   ← Échanger
    = L2 ↔ L3 : [[2,-1,-3],[0,1,-1],[0,0,0]]   ← Échanger
    = L1 ← L1 + L2 : [[2,0,-4],[0,1,-1],[0,0,0]]   ← Annuler : L₁ ← L₁ + L₂
    = L1 ← (1/2)L1 : [[1,0,-2],[0,1,-1],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (2 ; 1 ; 1)   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(1 ; 0 ; □)} | E₂ = Span{(1 ; 0 ; 1)} ; E₃ = Span{(2 ; 1 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Les valeurs propres de A = [[4,-2,-2],[1,1,-4],[0,0,4]] sont {2 ; 3 ; 4}. Donne une base de l'espace propre de chacune des valeurs 3 et 4 : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  A − 3I
    (Réduis A − 3I.)
    = L2 ← L2 - L1 : [[1,-2,-2],[0,0,-2],[0,0,1]]   ← Annuler : L₂ ← L₂ − L₁
    = L3 ← L3 + (1/2)L2 : [[1,-2,-2],[0,0,-2],[0,0,0]]   ← Annuler : L₃ ← L₃ + (1/2)L₂
    = L2 ← -(1/2)L2 : [[1,-2,-2],[0,0,1],[0,0,0]]   ← Pivot à 1
    = L1 ← L1 + 2L2 : [[1,-2,0],[0,0,1],[0,0,0]]   ← Annuler : L₁ ← L₁ + 2L₂
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (2 ; 1 ; 0)   ← Variable libre = 1
  — Réduis A − 4I.  [juge rowops]  départ : A − 4I
    = L1 ↔ L2 : [[1,-3,-4],[0,-2,-2],[0,0,0]]   ← Échanger
    = L2 ← -(1/2)L2 : [[1,-3,-4],[0,1,1],[0,0,0]]   ← Pivot à 1
    = L1 ← L1 + 3L2 : [[1,0,-1],[0,1,1],[0,0,0]]   ← Annuler : L₁ ← L₁ + 3L₂
  — Donne une base de E₄ = Ker(A − 4I).  [juge eigvec]  départ : E_4
    = (1 ; -1 ; 1)   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₃ = Span{(2 ; □ ; 0)} | E₃ = Span{(2 ; 1 ; 0)} ; E₄ = Span{(1 ; −1 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Les valeurs propres de A = [[5,-2,-1],[0,5,0],[2,-2,2]] sont {3 ; 4 ; 5}. Donne une base de l'espace propre de chacune des valeurs 3 et 5 : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  A − 3I
    (Réduis A − 3I.)
    = L3 ← L3 - L1 : [[2,-2,-1],[0,2,0],[0,0,0]]   ← Annuler : L₃ ← L₃ − L₁
    = L2 ← (1/2)L2 : [[2,-2,-1],[0,1,0],[0,0,0]]   ← Pivot à 1
    = L1 ← L1 + 2L2 : [[2,0,-1],[0,1,0],[0,0,0]]   ← Annuler : L₁ ← L₁ + 2L₂
    = L1 ← (1/2)L1 : [[1,0,-1/2],[0,1,0],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (1 ; 0 ; 2)   ← Variable libre = 1
  — Réduis A − 5I.  [juge rowops]  départ : A − 5I
    = L1 ↔ L3 : [[2,-2,-3],[0,0,0],[0,-2,-1]]   ← Échanger
    = L2 ↔ L3 : [[2,-2,-3],[0,-2,-1],[0,0,0]]   ← Échanger
    = L2 ← -(1/2)L2 : [[2,-2,-3],[0,1,1/2],[0,0,0]]   ← Pivot à 1
    = L1 ← L1 + 2L2 : [[2,0,-2],[0,1,1/2],[0,0,0]]   ← Annuler : L₁ ← L₁ + 2L₂
    = L1 ← (1/2)L1 : [[1,0,-1],[0,1,1/2],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₅ = Ker(A − 5I).  [juge eigvec]  départ : E_5
    = (2 ; -1 ; 2)   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₃ = Span{(1 ; 0 ; □)} | E₃ = Span{(1 ; 0 ; 2)} ; E₅ = Span{(2 ; −1 ; 2)}
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
Les valeurs propres de A = [[2,0,0],[-2,4,0],[0,0,4]] sont {2 ; 4}. Donne une base de l'espace propre de chacune des valeurs 2 et 4.
  [free, suivre l'erreur]  A − 2I
    (Réduis A − 2I.)
    = L1 ↔ L2 : [[-2,2,0],[0,0,0],[0,0,2]]   ← Échanger
    = L2 ↔ L3 : [[-2,2,0],[0,0,2],[0,0,0]]   ← Échanger
    = L2 ← (1/2)L2 : [[-2,2,0],[0,0,1],[0,0,0]]   ← Pivot à 1
    = L1 ← -(1/2)L1 : [[1,-1,0],[0,0,1],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge eigvec]  départ : E_2
    = (1 ; 1 ; 0)   ← Variable libre = 1
  — Réduis A − 4I.  [juge rowops]  départ : A − 4I
    = L2 ← L2 - L1 : [[-2,0,0],[0,0,0],[0,0,0]]   ← Annuler : L₂ ← L₂ − L₁
    = L1 ← -(1/2)L1 : [[1,0,0],[0,0,0],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₄ = Ker(A − 4I).  [juge span]  départ : E_4
    = (0 ; 1 ; 0), (0 ; 0 ; 1)   ← Une variable libre à 1, les autres à 0
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(1 ; □ ; 0)} | E₂ = Span{(1 ; 1 ; 0)} ; E₄ = Span{(0 ; 1 ; 0), (0 ; 0 ; 1)}

Les valeurs propres de A = [[2,-1,-1],[0,4,2],[0,-1,1]] sont {2 ; 3}. Donne une base de l'espace propre de chacune des valeurs 2 et 3.
  [free, suivre l'erreur]  A − 2I
    (Réduis A − 2I.)
    = L2 ← L2 + 2L1 : [[0,-1,-1],[0,0,0],[0,-1,-1]]   ← Annuler : L₂ ← L₂ + 2L₁
    = L3 ← L3 - L1 : [[0,-1,-1],[0,0,0],[0,0,0]]   ← Annuler : L₃ ← L₃ − L₁
    = L1 ← -L1 : [[0,1,1],[0,0,0],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge span]  départ : E_2
    = (1 ; 0 ; 0), (0 ; 1 ; -1)   ← Une variable libre à 1, les autres à 0
  — Réduis A − 3I.  [juge rowops]  départ : A − 3I
    = L3 ← L3 + L2 : [[-1,-1,-1],[0,1,2],[0,0,0]]   ← Annuler : L₃ ← L₃ + L₂
    = L1 ← L1 + L2 : [[-1,0,1],[0,1,2],[0,0,0]]   ← Annuler : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,0,-1],[0,1,2],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge eigvec]  départ : E_3
    = (1 ; -2 ; 1)   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₂ = Span{(□ ; 0 ; 0), (0 ; 1 ; □)} | E₂ = Span{(1 ; 0 ; 0), (0 ; 1 ; −1)} ; E₃ = Span{(1 ; −2 ; 1)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Les valeurs propres de A = [[6,6,-3],[-1,1,1],[0,0,3]] sont {3 ; 4}. Donne une base de l'espace propre de chacune des valeurs 3 et 4.
  [free, suivre l'erreur]  A − 3I
    (Réduis A − 3I.)
    = L2 ← L2 + (1/3)L1 : [[3,6,-3],[0,0,0],[0,0,0]]   ← Annuler : L₂ ← L₂ + (1/3)L₁
    = L1 ← (1/3)L1 : [[1,2,-1],[0,0,0],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₃ = Ker(A − 3I).  [juge span]  départ : E_3
    = (2 ; -1 ; 0), (1 ; 0 ; 1)   ← Une variable libre à 1, les autres à 0
  — Réduis A − 4I.  [juge rowops]  départ : A − 4I
    = L2 ← L2 + (1/2)L1 : [[2,6,-3],[0,0,-1/2],[0,0,-1]]   ← Annuler : L₂ ← L₂ + (1/2)L₁
    = L3 ← L3 - 2L2 : [[2,6,-3],[0,0,-1/2],[0,0,0]]   ← Annuler : L₃ ← L₃ − 2L₂
    = L2 ← -2L2 : [[2,6,-3],[0,0,1],[0,0,0]]   ← Pivot à 1
    = L1 ← L1 + 3L2 : [[2,6,0],[0,0,1],[0,0,0]]   ← Annuler : L₁ ← L₁ + 3L₂
    = L1 ← (1/2)L1 : [[1,3,0],[0,0,1],[0,0,0]]   ← Pivot à 1
  — Donne une base de E₄ = Ker(A − 4I).  [juge eigvec]  départ : E_4
    = (3 ; -1 ; 0)   ← Variable libre = 1
  aides : E_λ = Ker(A − λI) : même méthode que pour un noyau. Réduis A − λI, puis donne la valeur 1 à une variable libre et 0 aux autres. | E₃ = Span{(2 ; □ ; 0), (1 ; 0 ; □)} | E₃ = Span{(2 ; −1 ; 0), (1 ; 0 ; 1)} ; E₄ = Span{(3 ; −1 ; 0)}
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

```

### Niveau 5

```
Soit A = [[2,0,0,0],[0,2,0,0],[-1,-1,3,-1],[2,2,0,4]]. Donne une base de {x : Ax = 2x}.
  [free, sans aide]  A − 2I
    (Réduis A − 2I.)
    = L1 ↔ L3 : [[-1,-1,1,-1],[0,0,0,0],[0,0,0,0],[2,2,0,2]]   ← Échanger
    = L4 ← L4 + 2L1 : [[-1,-1,1,-1],[0,0,0,0],[0,0,0,0],[0,0,2,0]]   ← Annuler : L₄ ← L₄ + 2L₁
    = L2 ↔ L4 : [[-1,-1,1,-1],[0,0,2,0],[0,0,0,0],[0,0,0,0]]   ← Échanger
    = L2 ← (1/2)L2 : [[-1,-1,1,-1],[0,0,1,0],[0,0,0,0],[0,0,0,0]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[-1,-1,0,-1],[0,0,1,0],[0,0,0,0],[0,0,0,0]]   ← Annuler : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,1,0,1],[0,0,1,0],[0,0,0,0],[0,0,0,0]]   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge span]  départ : E_2
    = (1 ; -1 ; 0 ; 0), (1 ; 0 ; 0 ; -1)   ← Une variable libre à 1, les autres à 0
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[4,0,0,0],[0,4,0,0],[-2,0,2,2],[-1,0,0,3]]. Donne une base de {x : Ax = 4x}.
  [free, sans aide]  A − 4I
    (Réduis A − 4I.)
    = L1 ↔ L3 : [[-2,0,-2,2],[0,0,0,0],[0,0,0,0],[-1,0,0,-1]]   ← Échanger
    = L4 ← L4 - (1/2)L1 : [[-2,0,-2,2],[0,0,0,0],[0,0,0,0],[0,0,1,-2]]   ← Annuler : L₄ ← L₄ − (1/2)L₁
    = L2 ↔ L4 : [[-2,0,-2,2],[0,0,1,-2],[0,0,0,0],[0,0,0,0]]   ← Échanger
    = L1 ← L1 + 2L2 : [[-2,0,0,-2],[0,0,1,-2],[0,0,0,0],[0,0,0,0]]   ← Annuler : L₁ ← L₁ + 2L₂
    = L1 ← -(1/2)L1 : [[1,0,0,1],[0,0,1,-2],[0,0,0,0],[0,0,0,0]]   ← Pivot à 1
  — Donne une base de E₄ = Ker(A − 4I).  [juge span]  départ : E_4
    = (0 ; 1 ; 0 ; 0), (1 ; 0 ; -2 ; -1)   ← Une variable libre à 1, les autres à 0
  pièges : l_rowop_sign, l_rowop_partial, l_rowop_wrong_row

Soit A = [[2,0,0,1],[0,2,0,0],[0,0,4,0],[0,0,0,3]]. Donne une base de {x : Ax = 2x}.
  [free, sans aide]  A − 2I
    (Réduis A − 2I.)
    = L1 ↔ L3 : [[0,0,2,0],[0,0,0,0],[0,0,0,1],[0,0,0,1]]   ← Échanger
    = L2 ↔ L3 : [[0,0,2,0],[0,0,0,1],[0,0,0,0],[0,0,0,1]]   ← Échanger
    = L4 ← L4 - L2 : [[0,0,2,0],[0,0,0,1],[0,0,0,0],[0,0,0,0]]   ← Annuler : L₄ ← L₄ − L₂
    = L1 ← (1/2)L1 : [[0,0,1,0],[0,0,0,1],[0,0,0,0],[0,0,0,0]]   ← Pivot à 1
  — Donne une base de E₂ = Ker(A − 2I).  [juge span]  départ : E_2
    = (1 ; 0 ; 0 ; 0), (0 ; 1 ; 0 ; 0)   ← Une variable libre à 1, les autres à 0
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Variantes d'examen

```
Soit A = [[1,-2,2],[0,4,0],[-1,0,4]], qui a la valeur propre 4. Quel est l'espace propre E₄ ?
  · Span{(0 ; 1 ; −1)} [l_ker_sign]   · Span{(1 ; 0 ; 0), (0 ; 1 ; −1)} [l_eigvec_row]   ✔ Span{(0 ; 1 ; 1)}   · {0} [l_eigvec_zero]
  [examen mcq]
  pièges : l_eigvec_row, l_ker_sign, l_eigvec_zero

Vrai ou faux ?
  « Pour toute valeur propre λ de A, 1 ≤ dim E_λ ≤ multiplicité de λ. » → VRAI
  [examen tf]

```

## Valeurs propres de cA, Aᵏ, A⁻¹, Aᵀ, A + cI, BAB⁻¹ (`l-eig-related`, BA1)

_La même opération sur chaque valeur propre._

### Niveau 1

```
A est une matrice 3 × 3 de valeurs propres {−4 ; −1 ; 4}. Donne les valeurs propres de A³.
  [guided]  μ
    (λ = −4 : valeur propre correspondante de A³.)
    = (−4)³   ← f(λ) = λ³
    = −64
  — λ = −1 : valeur propre correspondante de A³.  [juge value]  départ : μ
    = (−1)³   ← f(λ) = λ³
    = −1
  — λ = 4 : valeur propre correspondante de A³.  [juge value]  départ : μ
    = 4³   ← f(λ) = λ³
    = 64
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de A³ : {−64 ; −1 ; 64}.

A est une matrice 3 × 3 de valeurs propres {−1 ; 2 ; 4}. Donne les valeurs propres de A + 3I.
  [guided]  μ
    (λ = −1 : valeur propre correspondante de A + 3I.)
    = (−1) + 3   ← f(λ) = λ + 3
    = 2
  — λ = 2 : valeur propre correspondante de A + 3I.  [juge value]  départ : μ
    = 2 + 3   ← f(λ) = λ + 3
    = 5
  — λ = 4 : valeur propre correspondante de A + 3I.  [juge value]  départ : μ
    = 4 + 3   ← f(λ) = λ + 3
    = 7
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −1 : μ = f(−1) = □, où f est la règle de l'expression demandée. | Valeurs propres de A + 3I : {2 ; 5 ; 7}.
  pièges : l_eig_shift_scale

A est une matrice 3 × 3 de valeurs propres {−3 ; −1 ; 4}. Donne les valeurs propres de A − I.
  [guided]  μ
    (λ = −3 : valeur propre correspondante de A − I.)
    = (−3) − 1   ← f(λ) = λ − 1
    = −4
  — λ = −1 : valeur propre correspondante de A − I.  [juge value]  départ : μ
    = (−1) − 1   ← f(λ) = λ − 1
    = −2
  — λ = 4 : valeur propre correspondante de A − I.  [juge value]  départ : μ
    = 4 − 1   ← f(λ) = λ − 1
    = 3
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −3 : μ = f(−3) = □, où f est la règle de l'expression demandée. | Valeurs propres de A − I : {−4 ; −2 ; 3}.
  pièges : l_eig_shift_scale

```

### Niveau 2

```
A est une matrice 3 × 3 de valeurs propres {2 ; 3 ; 4}. Donne les valeurs propres de A².
  [guided]  μ
    (λ = 2 : valeur propre correspondante de A².)
    ? Quelle règle donne les valeurs propres de A² ? · 2λ / ✔ λ² / · λ
    = 2²   ← f(λ) = λ²
    = 4
  — λ = 3 : valeur propre correspondante de A².  [juge value]  départ : μ
    = 3²   ← f(λ) = λ²
    = 9
  — λ = 4 : valeur propre correspondante de A².  [juge value]  départ : μ
    = 4²   ← f(λ) = λ²
    = 16
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = 2 : μ = f(2) = □, où f est la règle de l'expression demandée. | Valeurs propres de A² : {4 ; 9 ; 16}.

A est une matrice 3 × 3 de valeurs propres {−4 ; 2 ; 3}. Donne les valeurs propres de −2A.
  [guided]  μ
    (λ = −4 : valeur propre correspondante de −2A.)
    ? Quelle règle donne les valeurs propres de −2A ? · λ / · λ − 2 / ✔ −2λ
    = −2·(−4)   ← f(λ) = −2λ
    = 8
  — λ = 2 : valeur propre correspondante de −2A.  [juge value]  départ : μ
    = −2·2   ← f(λ) = −2λ
    = −4
  — λ = 3 : valeur propre correspondante de −2A.  [juge value]  départ : μ
    = −2·3   ← f(λ) = −2λ
    = −6
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de −2A : {8 ; −4 ; −6}.
  pièges : l_eig_shift_scale

A est une matrice 3 × 3 de valeurs propres {−3 ; 3 ; 4}. Donne les valeurs propres de 2A.
  [guided]  μ
    (λ = −3 : valeur propre correspondante de 2A.)
    ? Quelle règle donne les valeurs propres de 2A ? · λ / · λ + 2 / ✔ 2λ
    = 2·(−3)   ← f(λ) = 2λ
    = −6
  — λ = 3 : valeur propre correspondante de 2A.  [juge value]  départ : μ
    = 2·3   ← f(λ) = 2λ
    = 6
  — λ = 4 : valeur propre correspondante de 2A.  [juge value]  départ : μ
    = 2·4   ← f(λ) = 2λ
    = 8
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −3 : μ = f(−3) = □, où f est la règle de l'expression demandée. | Valeurs propres de 2A : {−6 ; 6 ; 8}.
  pièges : l_eig_shift_scale

```

### Niveau 3

```
A est une matrice 3 × 3 de valeurs propres {−4 ; 1 ; 3}. Donne les valeurs propres de A² − A : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  μ
    (λ = −4 : valeur propre correspondante de A² − A.)
    = (−4)² − (−4)   ← f(λ) = λ² − λ
    = 20
  — λ = 1 : valeur propre correspondante de A² − A.  [juge value]  départ : μ
    = 1² − 1   ← f(λ) = λ² − λ
    = 0
  — λ = 3 : valeur propre correspondante de A² − A.  [juge value]  départ : μ
    = 3² − 3   ← f(λ) = λ² − λ
    = 6
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de A² − A : {20 ; 0 ; 6}.

A est une matrice 3 × 3 de valeurs propres {−3 ; −1 ; 4}. Donne les valeurs propres de A² + A : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  μ
    (λ = −3 : valeur propre correspondante de A² + A.)
    = (−3)² + (−3)   ← f(λ) = λ² + λ
    = 6
  — λ = −1 : valeur propre correspondante de A² + A.  [juge value]  départ : μ
    = (−1)² + (−1)   ← f(λ) = λ² + λ
    = 0
  — λ = 4 : valeur propre correspondante de A² + A.  [juge value]  départ : μ
    = 4² + 4   ← f(λ) = λ² + λ
    = 20
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −3 : μ = f(−3) = □, où f est la règle de l'expression demandée. | Valeurs propres de A² + A : {6 ; 0 ; 20}.

A est une matrice 3 × 3 de valeurs propres {−4 ; −1 ; 1}. Donne les valeurs propres de −2A⁻¹ + 2I : choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  μ
    (λ = −4 : valeur propre correspondante de −2A⁻¹ + 2I.)
    = −2/(−4) + 2   ← f(λ) = −2/λ + 2
    = 5/2
  — λ = −1 : valeur propre correspondante de −2A⁻¹ + 2I.  [juge value]  départ : μ
    = −2/(−1) + 2   ← f(λ) = −2/λ + 2
    = 4
  — λ = 1 : valeur propre correspondante de −2A⁻¹ + 2I.  [juge value]  départ : μ
    = −2/1 + 2   ← f(λ) = −2/λ + 2
    = 0
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de −2A⁻¹ + 2I : {5/2 ; 4 ; 0}.

```

### Niveau 4

```
A est une matrice 3 × 3 de valeurs propres {−4 ; 1 ; 4}. Calcule det A et tr A, puis les valeurs propres de A − 4I et son déterminant.
  [free, suivre l'erreur]  det(A)
    (det A = produit des valeurs propres.)
    = (−4)·(1)·(4)   ← Produit
    = −16
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = 1   ← Somme
  — λ = −4 : valeur propre correspondante de A − 4I.  [juge value]  départ : μ
    = −8
  — λ = 1 : valeur propre correspondante de A − 4I.  [juge value]  départ : μ
    = −3
  — λ = 4 : valeur propre correspondante de A − 4I.  [juge value]  départ : μ
    = 0
  — det(A − 4I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? A − 4I est-elle inversible ? · Oui / ✔ Non
    = 0   ← Une valeur propre nulle : pas inversible
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de A − 4I : {−8 ; −3 ; 0}.

A est une matrice 3 × 3 de valeurs propres {−4 ; −1 ; 2}. Calcule det A et tr A, puis les valeurs propres de A − 2I et son déterminant.
  [free, suivre l'erreur]  det(A)
    (det A = produit des valeurs propres.)
    = (−4)·(−1)·(2)   ← Produit
    = 8
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = −3   ← Somme
  — λ = −4 : valeur propre correspondante de A − 2I.  [juge value]  départ : μ
    = −6
  — λ = −1 : valeur propre correspondante de A − 2I.  [juge value]  départ : μ
    = −3
  — λ = 2 : valeur propre correspondante de A − 2I.  [juge value]  départ : μ
    = 0
  — det(A − 2I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? A − 2I est-elle inversible ? · Oui / ✔ Non
    = 0   ← Une valeur propre nulle : pas inversible
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de A − 2I : {−6 ; −3 ; 0}.

A est une matrice 3 × 3 de valeurs propres {−4 ; −2 ; 2}. Calcule det A et tr A, puis les valeurs propres de A + 4I et son déterminant.
  [free, suivre l'erreur]  det(A)
    (det A = produit des valeurs propres.)
    = (−4)·(−2)·(2)   ← Produit
    = 16
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = −4   ← Somme
  — λ = −4 : valeur propre correspondante de A + 4I.  [juge value]  départ : μ
    = 0
  — λ = −2 : valeur propre correspondante de A + 4I.  [juge value]  départ : μ
    = 2
  — λ = 2 : valeur propre correspondante de A + 4I.  [juge value]  départ : μ
    = 6
  — det(A + 4I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? A + 4I est-elle inversible ? · Oui / ✔ Non
    = 0   ← Une valeur propre nulle : pas inversible
  aides : Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Applique la même opération à chaque valeur propre. det A = produit, tr A = somme. | λ = −4 : μ = f(−4) = □, où f est la règle de l'expression demandée. | Valeurs propres de A + 4I : {0 ; 2 ; 6}.

```

### Niveau 5

```
A est une matrice 3 × 3 de valeurs propres {1 ; 2 ; 4}. Calcule det A et tr A, puis les valeurs propres de 3A⁻¹ + I et son déterminant.
  [free, sans aide]  det(A)
    (det A = produit des valeurs propres.)
    = (1)·(2)·(4)   ← Produit
    = 8
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = 7   ← Somme
  — λ = 1 : valeur propre correspondante de 3A⁻¹ + I.  [juge value]  départ : μ
    = 3/1 + 1   ← f(λ) = 3/λ + 1
    = 4
  — λ = 2 : valeur propre correspondante de 3A⁻¹ + I.  [juge value]  départ : μ
    = 3/2 + 1   ← f(λ) = 3/λ + 1
    = 5/2
  — λ = 4 : valeur propre correspondante de 3A⁻¹ + I.  [juge value]  départ : μ
    = 3/4 + 1   ← f(λ) = 3/λ + 1
    = 7/4
  — det(3A⁻¹ + I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? 3A⁻¹ + I est-elle inversible ? ✔ Oui / · Non
    = 35/2   ← Aucune valeur propre nulle : inversible

A est une matrice 3 × 3 de valeurs propres {−3 ; 2 ; 3}. Calcule det A et tr A, puis les valeurs propres de A + 3I et son déterminant.
  [free, sans aide]  det(A)
    (det A = produit des valeurs propres.)
    = (−3)·(2)·(3)   ← Produit
    = −18
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = 2   ← Somme
  — λ = −3 : valeur propre correspondante de A + 3I.  [juge value]  départ : μ
    = 0
  — λ = 2 : valeur propre correspondante de A + 3I.  [juge value]  départ : μ
    = 5
  — λ = 3 : valeur propre correspondante de A + 3I.  [juge value]  départ : μ
    = 6
  — det(A + 3I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? A + 3I est-elle inversible ? · Oui / ✔ Non
    = 0   ← Une valeur propre nulle : pas inversible

A est une matrice 3 × 3 de valeurs propres {−3 ; −1 ; 1}. Calcule det A et tr A, puis les valeurs propres de 3A⁻¹ − I et son déterminant.
  [free, sans aide]  det(A)
    (det A = produit des valeurs propres.)
    = (−3)·(−1)·(1)   ← Produit
    = 3
  — tr A = somme des valeurs propres.  [juge value]  départ : tr(A)
    = −3   ← Somme
  — λ = −3 : valeur propre correspondante de 3A⁻¹ − I.  [juge value]  départ : μ
    = 3/(−3) − 1   ← f(λ) = 3/λ − 1
    = −2
  — λ = −1 : valeur propre correspondante de 3A⁻¹ − I.  [juge value]  départ : μ
    = 3/(−1) − 1   ← f(λ) = 3/λ − 1
    = −4
  — λ = 1 : valeur propre correspondante de 3A⁻¹ − I.  [juge value]  départ : μ
    = 3/1 − 1   ← f(λ) = 3/λ − 1
    = 2
  — det(3A⁻¹ − I) = produit de ses valeurs propres.  [juge value]  départ : det
    ? 3A⁻¹ − I est-elle inversible ? ✔ Oui / · Non
    = 16   ← Aucune valeur propre nulle : inversible

```

### Variantes d'examen

```
A est une matrice 3 × 3 de valeurs propres {−4 ; 3 ; 4}. Quelles sont les valeurs propres de A + 3I ?
  · {−3 ; 4 ; 5}   ✔ {−1 ; 6 ; 7}   · {−4 ; 3 ; 4}   · {−12 ; 9 ; 12} [l_eig_shift_scale]
  [examen mcq]
  pièges : l_eig_shift_scale

Vrai ou faux ?
  « Une matrice carrée A et sa transposée Aᵀ ont les mêmes vecteurs propres. » → FAUX
    contre-exemple (matOne) : A = [[1,1],[0,2]], v = (1 ; 0)
  [examen tf]
  pièges : l_eig_transpose_vec

```

## Diagonaliser : A = PDP⁻¹ (`l-eig-diag`, BA1)

_n vecteurs propres libres, dans l'ordre de D._

### Niveau 1

```
Les valeurs propres de A = [[6,2],[-4,0]] sont {2 ; 4}. Trouve un vecteur propre pour chacune, puis P et D telles que A = PDP⁻¹.
  [guided]  v_1
    (λ = 2 : un vecteur propre v₁ (noyau de A − 2I = [[4,2],[-4,-2]]).)
    = (1 ; -2)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — λ = 4 : un vecteur propre v₂ (noyau de A − 4I = [[2,2],[-4,-4]]).  [juge eigvec]  départ : v_2
    = (1 ; -1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[-2,-1]] ; D = diag(2,4)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 1], [□, □]], D = diag(2, 4) | P = [[1,1],[-2,-1]], D = diag(2, 4)
  pièges : l_eigvec_row

Les valeurs propres de A = [[-6,8],[-4,6]] sont {−2 ; 2}. Trouve un vecteur propre pour chacune, puis P et D telles que A = PDP⁻¹.
  [guided]  v_1
    (λ = −2 : un vecteur propre v₁ (noyau de A + 2I = [[-4,8],[-4,8]]).)
    = (2 ; 1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — λ = 2 : un vecteur propre v₂ (noyau de A − 2I = [[-8,8],[-4,4]]).  [juge eigvec]  départ : v_2
    = (1 ; 1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[2,1],[1,1]] ; D = diag(-2,2)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[2, 1], [□, □]], D = diag(−2, 2) | P = [[2,1],[1,1]], D = diag(−2, 2)
  pièges : l_eigvec_row

Les valeurs propres de A = [[-3,-1],[2,0]] sont {−2 ; −1}. Trouve un vecteur propre pour chacune, puis P et D telles que A = PDP⁻¹.
  [guided]  v_1
    (λ = −2 : un vecteur propre v₁ (noyau de A + 2I = [[-1,-1],[2,2]]).)
    = (1 ; -1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — λ = −1 : un vecteur propre v₂ (noyau de A + I = [[-2,-1],[2,1]]).  [juge eigvec]  départ : v_2
    = (1 ; -2)   (cases à remplir : (2,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[-1,-2]] ; D = diag(-2,-1)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 1], [□, □]], D = diag(−2, −1) | P = [[1,1],[-1,-2]], D = diag(−2, −1)
  pièges : l_eigvec_row

```

### Niveau 2

```
Diagonalise A = [[6,-2],[4,0]] : trouve P inversible et D diagonale telles que A = PDP⁻¹.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[6-λ,-2],[4,-λ]]   ← λ soustrait sur toute la diagonale
    = (6 − λ)(−λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 6λ + 8   ← λ² − (tr A)λ + det A
    = (λ − 2)(λ − 4)   ← Factoriser le trinôme
  — λ = 2 : un vecteur propre v₁ (noyau de A − 2I = [[4,-2],[4,-2]]).  [juge eigvec]  départ : v_1
    = (1 ; 2)   (cases à remplir : (2,1))   ← Ker(A − λI)
  — λ = 4 : un vecteur propre v₂ (noyau de A − 4I = [[2,-2],[4,-4]]).  [juge eigvec]  départ : v_2
    = (1 ; 1)   (cases à remplir : (2,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment ranger P et D ? ✔ P = [v₁ v₂], D = diag(2, 4) / · P = [v₂ v₁], D = diag(2, 4)
    = P = [[1,1],[2,1]] ; D = diag(2,4)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 1], [□, □]], D = diag(2, 4) | P = [[1,1],[2,1]], D = diag(2, 4)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_pd_order

Diagonalise A = [[6,8],[-4,-6]] : trouve P inversible et D diagonale telles que A = PDP⁻¹.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[6-λ,8],[-4,-6-λ]]   ← λ soustrait sur toute la diagonale
    = (6 − λ)(−6 − λ) + 32   ← Diagonale moins antidiagonale
    = λ² − 4   ← λ² − (tr A)λ + det A
    = (λ + 2)(λ − 2)   ← Factoriser le trinôme
  — λ = −2 : un vecteur propre v₁ (noyau de A + 2I = [[8,8],[-4,-4]]).  [juge eigvec]  départ : v_1
    = (1 ; -1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — λ = 2 : un vecteur propre v₂ (noyau de A − 2I = [[4,8],[-4,-8]]).  [juge eigvec]  départ : v_2
    = (2 ; -1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment ranger P et D ? · P = [v₂ v₁], D = diag(−2, 2) / ✔ P = [v₁ v₂], D = diag(−2, 2)
    = P = [[1,2],[-1,-1]] ; D = diag(-2,2)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 2], [□, □]], D = diag(−2, 2) | P = [[1,2],[-1,-1]], D = diag(−2, 2)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_pd_order

Diagonalise A = [[0,2],[-1,3]] : trouve P inversible et D diagonale telles que A = PDP⁻¹.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-λ,2],[-1,3-λ]]   ← λ soustrait sur toute la diagonale
    = (−λ)(3 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 3λ + 2   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 2)   ← Factoriser le trinôme
  — λ = 1 : un vecteur propre v₁ (noyau de A − I = [[-1,2],[-1,2]]).  [juge eigvec]  départ : v_1
    = (2 ; 1)   (cases à remplir : (2,1))   ← Ker(A − λI)
  — λ = 2 : un vecteur propre v₂ (noyau de A − 2I = [[-2,2],[-1,1]]).  [juge eigvec]  départ : v_2
    = (1 ; 1)   (cases à remplir : (1,1))   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment ranger P et D ? ✔ P = [v₁ v₂], D = diag(1, 2) / · P = [v₂ v₁], D = diag(1, 2)
    = P = [[2,1],[1,1]] ; D = diag(1,2)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[2, 1], [□, □]], D = diag(1, 2) | P = [[2,1],[1,1]], D = diag(1, 2)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_pd_order

```

### Niveau 3

```
Diagonalise A = [[3,1],[-2,6]] : trouve P inversible et D diagonale telles que A = PDP⁻¹ (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[3-λ,1],[-2,6-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(6 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 9λ + 20   ← λ² − (tr A)λ + det A
    = (λ − 4)(λ − 5)   ← Factoriser le trinôme
  — λ = 4 : un vecteur propre v₁ (noyau de A − 4I = [[-1,1],[-2,2]]).  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← Ker(A − λI)
  — λ = 5 : un vecteur propre v₂ (noyau de A − 5I = [[-2,1],[-2,1]]).  [juge eigvec]  départ : v_2
    = (1 ; 2)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[1,2]] ; D = diag(4,5)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 1], [□, □]], D = diag(4, 5) | P = [[1,1],[1,2]], D = diag(4, 5)
  pièges : l_charpoly_sign, l_lambda_one_entry

Diagonalise A = [[1,-4],[2,-5]] : trouve P inversible et D diagonale telles que A = PDP⁻¹ (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[1-λ,-4],[2,-5-λ]]   ← λ soustrait sur toute la diagonale
    = (1 − λ)(−5 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 4λ + 3   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ + 1)   ← Factoriser le trinôme
  — λ = −3 : un vecteur propre v₁ (noyau de A + 3I = [[4,-4],[2,-2]]).  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← Ker(A − λI)
  — λ = −1 : un vecteur propre v₂ (noyau de A + I = [[2,-4],[2,-4]]).  [juge eigvec]  départ : v_2
    = (2 ; 1)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,2],[1,1]] ; D = diag(-3,-1)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 2], [□, □]], D = diag(−3, −1) | P = [[1,2],[1,1]], D = diag(−3, −1)
  pièges : l_charpoly_sign, l_lambda_one_entry

Diagonalise A = [[0,2],[-4,6]] : trouve P inversible et D diagonale telles que A = PDP⁻¹ (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-λ,2],[-4,6-λ]]   ← λ soustrait sur toute la diagonale
    = (−λ)(6 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 6λ + 8   ← λ² − (tr A)λ + det A
    = (λ − 2)(λ − 4)   ← Factoriser le trinôme
  — λ = 2 : un vecteur propre v₁ (noyau de A − 2I = [[-2,2],[-4,4]]).  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← Ker(A − λI)
  — λ = 4 : un vecteur propre v₂ (noyau de A − 4I = [[-4,2],[-4,2]]).  [juge eigvec]  départ : v_2
    = (1 ; 2)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[1,2]] ; D = diag(2,4)   ← Colonne k de P ↔ case k de D
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[1, 1], [□, □]], D = diag(2, 4) | P = [[1,1],[1,2]], D = diag(2, 4)
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 4

```
Diagonalise A = [[0,4,4],[-2,6,4],[0,0,2]] : trouve P inversible et D diagonale telles que A = PDP⁻¹, puis calcule P⁻¹.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = (2-λ)·det[[-λ,4],[-2,6-λ]]   ← Développer selon la ligne 3
    = (2 − λ)((−λ)(6 − λ) + 8)   ← Mineur 2 × 2
    = (2 − λ)(λ² − 6λ + 8)   ← Développer le mineur
    = −(λ − 2)²(λ − 4)   ← Factoriser
  — λ = 2 : une base de E₂ (noyau de A − 2I = [[-2,4,4],[-2,4,4],[0,0,0]]).  [juge span]  départ : E_2
    = (2 ; 1 ; 0), (2 ; 0 ; 1)   ← Deux variables libres
  — λ = 4 : un vecteur propre v₂ (noyau de A − 4I = [[-4,4,4],[-2,2,4],[0,0,-2]]).  [juge eigvec]  départ : v_2
    = (1 ; 1 ; 0)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[2,2,1],[1,0,1],[0,1,0]] ; D = diag(2,2,4)   ← Colonne k de P ↔ case k de D
  — Calcule P⁻¹.  [juge mat]  départ : P^(−1)
    = [[1,-1,-2],[0,0,1],[-1,2,2]]   ← [P | I] réduite
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[2, 2, 1], [1, 0, 1], [□, □, □]], D = diag(2, 2, 4) | P = [[2,2,1],[1,0,1],[0,1,0]], D = diag(2, 2, 4)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Diagonalise A = [[3,0,0],[1,5,-1],[1,2,2]] : trouve P inversible et D diagonale telles que A = PDP⁻¹, puis calcule P⁻¹.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = (3-λ)·det[[5-λ,-1],[2,2-λ]]   ← Développer selon la ligne 1
    = (3 − λ)((5 − λ)(2 − λ) + 2)   ← Mineur 2 × 2
    = (3 − λ)(λ² − 7λ + 12)   ← Développer le mineur
    = −(λ − 3)²(λ − 4)   ← Factoriser
  — λ = 3 : une base de E₃ (noyau de A − 3I = [[0,0,0],[1,2,-1],[1,2,-1]]).  [juge span]  départ : E_3
    = (2 ; -1 ; 0), (1 ; 0 ; 1)   ← Deux variables libres
  — λ = 4 : un vecteur propre v₂ (noyau de A − 4I = [[-1,0,0],[1,1,-1],[1,2,-2]]).  [juge eigvec]  départ : v_2
    = (0 ; 1 ; 1)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[2,1,0],[-1,0,1],[0,1,1]] ; D = diag(3,3,4)   ← Colonne k de P ↔ case k de D
  — Calcule P⁻¹.  [juge mat]  départ : P^(−1)
    = [[1,1,-1],[-1,-2,2],[1,2,-1]]   ← [P | I] réduite
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[2, 1, 0], [−1, 0, 1], [□, □, □]], D = diag(3, 3, 4) | P = [[2,1,0],[-1,0,1],[0,1,1]], D = diag(3, 3, 4)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Diagonalise A = [[-3,-4,-6],[2,3,6],[0,0,-1]] : trouve P inversible et D diagonale telles que A = PDP⁻¹, puis calcule P⁻¹.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = (-1-λ)·det[[-3-λ,-4],[2,3-λ]]   ← Développer selon la ligne 3
    = (−1 − λ)((−3 − λ)(3 − λ) + 8)   ← Mineur 2 × 2
    = (−1 − λ)(λ² − 1)   ← Développer le mineur
    = −(λ + 1)²(λ − 1)   ← Factoriser
  — λ = −1 : une base de E₋₁ (noyau de A + I = [[-2,-4,-6],[2,4,6],[0,0,0]]).  [juge span]  départ : E_(−1)
    = (2 ; -1 ; 0), (3 ; 0 ; -1)   ← Deux variables libres
  — λ = 1 : un vecteur propre v₂ (noyau de A − I = [[-4,-4,-6],[2,2,6],[0,0,-2]]).  [juge eigvec]  départ : v_2
    = (1 ; -1 ; 0)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[2,3,1],[-1,0,-1],[0,-1,0]] ; D = diag(-1,-1,1)   ← Colonne k de P ↔ case k de D
  — Calcule P⁻¹.  [juge mat]  départ : P^(−1)
    = [[1,1,3],[0,0,-1],[-1,-2,-3]]   ← [P | I] réduite
  aides : Valeurs propres (racines de det(A − λI)), puis un vecteur propre par variable libre de chaque A − λI. Une colonne de P par vecteur propre, dans l'ordre de D. | P = [[2, 3, 1], [−1, 0, −1], [□, □, □]], D = diag(−1, −1, 1) | P = [[2,3,1],[-1,0,-1],[0,-1,0]], D = diag(−1, −1, 1)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Niveau 5

```
A = [[7,-1,4],[0,-1,0],[-8,0,-5]] est-elle diagonalisable ? Si oui, donne P et D telles que A = PDP⁻¹.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = (-1-λ)·det[[7-λ,4],[-8,-5-λ]]   ← Développer selon la ligne 2
    = (−1 − λ)((7 − λ)(−5 − λ) + 32)   ← Mineur 2 × 2
    = (−1 − λ)(λ² − 2λ − 3)   ← Développer le mineur
    = −(λ + 1)²(λ − 3)   ← Factoriser
  — λ = −1 : un vecteur propre v₁ (noyau de A + I = [[8,-1,4],[0,0,0],[-8,0,-4]]).  [juge eigvec]  départ : v_1
    = (1 ; 0 ; -2)   ← Ker(A − λI)
  — λ = 3 : un vecteur propre v₂ (noyau de A − 3I = [[4,-1,4],[0,-4,0],[-8,0,-8]]).  [juge eigvec]  départ : v_2
    = (1 ; 0 ; -1)   ← Ker(A − λI)
  — Additionne les dimensions des espaces propres (A est diagonalisable si et seulement si la somme vaut 3).  [juge value]  départ : Σ
    ? A est-elle diagonalisable ? · Oui / ✔ Non
    = 2   ← 2 &lt; 3 : pas assez de vecteurs propres libres, A n'est pas diagonalisable
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

A = [[-1,0,0],[1,1,-1],[-5,2,4]] est-elle diagonalisable ? Si oui, donne P et D telles que A = PDP⁻¹.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = (-1-λ)·det[[1-λ,-1],[2,4-λ]]   ← Développer selon la ligne 1
    = (−1 − λ)((1 − λ)(4 − λ) + 2)   ← Mineur 2 × 2
    = (−1 − λ)(λ² − 5λ + 6)   ← Développer le mineur
    = −(λ + 1)(λ − 2)(λ − 3)   ← Factoriser
  — λ = −1 : un vecteur propre v₁ (noyau de A + I = [[0,0,0],[1,2,-1],[-5,2,5]]).  [juge eigvec]  départ : v_1
    = (1 ; 0 ; 1)   ← Ker(A − λI)
  — λ = 2 : un vecteur propre v₂ (noyau de A − 2I = [[-3,0,0],[1,-1,-1],[-5,2,2]]).  [juge eigvec]  départ : v_2
    = (0 ; 1 ; -1)   ← Ker(A − λI)
  — λ = 3 : un vecteur propre v₃ (noyau de A − 3I = [[-4,0,0],[1,-2,-1],[-5,2,1]]).  [juge eigvec]  départ : v_3
    = (0 ; 1 ; -2)   ← Ker(A − λI)
  — Assemble P et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? A est-elle diagonalisable ? ✔ Oui / · Non
    = P = [[1,0,0],[0,1,1],[1,-1,-2]] ; D = diag(-1,2,3)   ← Colonne k de P ↔ case k de D
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

A = [[-3,2,2],[-1,0,-2],[0,0,-2]] est-elle diagonalisable ? Si oui, donne P et D telles que A = PDP⁻¹.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = (-2-λ)·det[[-3-λ,2],[-1,-λ]]   ← Développer selon la ligne 3
    = (−2 − λ)((−3 − λ)(−λ) + 2)   ← Mineur 2 × 2
    = (−2 − λ)(λ² + 3λ + 2)   ← Développer le mineur
    = −(λ + 2)²(λ + 1)   ← Factoriser
  — λ = −2 : un vecteur propre v₁ (noyau de A + 2I = [[-1,2,2],[-1,2,-2],[0,0,0]]).  [juge eigvec]  départ : v_1
    = (2 ; 1 ; 0)   ← Ker(A − λI)
  — λ = −1 : un vecteur propre v₂ (noyau de A + I = [[-2,2,2],[-1,1,-2],[0,0,-1]]).  [juge eigvec]  départ : v_2
    = (1 ; 1 ; 0)   ← Ker(A − λI)
  — Additionne les dimensions des espaces propres (A est diagonalisable si et seulement si la somme vaut 3).  [juge value]  départ : Σ
    ? A est-elle diagonalisable ? · Oui / ✔ Non
    = 2   ← 2 &lt; 3 : pas assez de vecteurs propres libres, A n'est pas diagonalisable
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Variantes d'examen

```
Soit A = [[6,-4],[2,0]]. On écrit A = PDP⁻¹ avec D = diag(2, 4) (λ₁ < λ₂) et des colonnes de P de norme 1, de première composante non nulle positive. Que vaut p₁₁ ?
  [free, sans aide, examen coef]  p_11
    = √2/2
  pièges : l_pd_order

Soit A = [[-1,-6],[3,8]]. Quelle paire (P, D) vérifie A = PDP⁻¹ ?
  · P = [[1,2],[-1,-1]], D = diag(2, 5) [l_pd_order]   ✔ P = [[2,1],[-1,-1]], D = diag(2, 5)   · P = [[-3,-6],[-6,-6]], D = diag(2, 5) [l_eigvec_row]   · P = [[1,1],[-1,-2]], D = diag(2, 5) [l_pdp_inverse_side]
  [examen mcq]
  pièges : l_pd_order, l_pdp_inverse_side, l_eigvec_row

Vrai ou faux ?
  « Si A = PDP⁻¹ avec D diagonale, les colonnes de P sont des vecteurs propres de A. » → VRAI
  [examen tf]

```

## Diagonalisable selon un paramètre ; multiplicités (`l-eig-diag-param`, BA1)

_dim E_λ = multiplicité, pour chaque λ._

### Niveau 1

```
Soit A = [[2,-1,-1],[0,a+1,0],[0,0,1]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 1 = 2 ou a + 1 = 1
    (Les valeurs propres sont 2, a + 1 et 1 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 0 ou a = 1   ← Valeurs critiques
  — a = 0 : 1 est valeur propre double. Écris A − I.  [juge mat]  départ : A − I
    = [[1,-1,-1],[0,0,0],[0,0,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 0
  — dim E₁ = 3 − rang(A − I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A − I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 1 : 2 est valeur propre double. Écris A − 2I.  [juge mat]  départ : A − 2I
    (Pour a = 0, A est-elle diagonalisable ? Oui.)
    = [[0,-1,-1],[0,0,0],[0,0,-1]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 1
  — dim E₂ = 3 − rang(A − 2I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 2I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    (Pour a = 1, A est-elle diagonalisable ? Non.)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← a ≠ 1
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 0 : rang(A − I) = □, dim E₁ = □ | A est diagonalisable si et seulement si a ≠ 1.
  pièges : g2_xx_lost_one

Soit A = [[-1,0,1],[0,a+1,3],[0,0,4]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 1 = −1 ou a + 1 = 4
    (Les valeurs propres sont −1, a + 1 et 4 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = −2 ou a = 3   ← Valeurs critiques
  — a = −2 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    = [[0,0,1],[0,0,3],[0,0,5]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −2
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A + I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 3 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    (Pour a = −2, A est-elle diagonalisable ? Oui.)
    = [[-5,0,1],[0,0,3],[0,0,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 3
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 4I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    (Pour a = 3, A est-elle diagonalisable ? Non.)
    = ]−∞ ; 3[ ∪ ]3 ; +∞[   ← a ≠ 3
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = −2 : rang(A + I) = □, dim E₋₁ = □ | A est diagonalisable si et seulement si a ≠ 3.

Soit A = [[-1,0,3],[0,a+1,1],[0,0,-2]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 1 = −1 ou a + 1 = −2
    (Les valeurs propres sont −1, a + 1 et −2 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = −3 ou a = −2   ← Valeurs critiques
  — a = −3 : −2 est valeur propre double. Écris A + 2I.  [juge mat]  départ : A + 2I
    = [[1,0,3],[0,0,1],[0,0,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −3
  — dim E₋₂ = 3 − rang(A + 2I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A + 2I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — a = −2 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    (Pour a = −3, A est-elle diagonalisable ? Non.)
    = [[0,0,3],[0,0,1],[0,0,-1]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −2
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A + I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    (Pour a = −2, A est-elle diagonalisable ? Oui.)
    = ]−∞ ; −3[ ∪ ]−3 ; +∞[   ← a ≠ −3
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = −3 : rang(A + 2I) = □, dim E₋₂ = □ | A est diagonalisable si et seulement si a ≠ −3.

```

### Niveau 2

```
Soit A = [[-1,0,0],[1,a+2,0],[3,0,-2]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 2 = −1 ou a + 2 = −2
    (Les valeurs propres sont −1, a + 2 et −2 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    ? Quelles valeurs de a faut-il examiner ? · Celles où det A = 0 / · Toutes : chercher le rang de A − λI pour chaque a / ✔ Celles où deux valeurs propres sont égales
    = a = −4 ou a = −3   ← Valeurs critiques
  — a = −4 : −2 est valeur propre double. Écris A + 2I.  [juge mat]  départ : A + 2I
    = [[1,0,0],[1,0,0],[3,0,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −4
  — dim E₋₂ = 3 − rang(A + 2I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A + 2I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = −3 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    ? Pour a = −4, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[0,0,0],[1,0,0],[3,0,-1]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −3
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A + I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = −3, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; −3[ ∪ ]−3 ; +∞[   ← a ≠ −3
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = −4 : rang(A + 2I) = □, dim E₋₂ = □ | A est diagonalisable si et seulement si a ≠ −3.
  pièges : l_diag_distinct

Soit A = [[1,0,3],[0,a+2,3],[0,0,3]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 2 = 1 ou a + 2 = 3
    (Les valeurs propres sont 1, a + 2 et 3 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    ? Quelles valeurs de a faut-il examiner ? · Celles où det A = 0 / ✔ Celles où deux valeurs propres sont égales / · Toutes : chercher le rang de A − λI pour chaque a
    = a = −1 ou a = 1   ← Valeurs critiques
  — a = −1 : 1 est valeur propre double. Écris A − I.  [juge mat]  départ : A − I
    = [[0,0,3],[0,0,3],[0,0,2]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = −1
  — dim E₁ = 3 − rang(A − I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A − I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 1 : 3 est valeur propre double. Écris A − 3I.  [juge mat]  départ : A − 3I
    ? Pour a = −1, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[-2,0,3],[0,0,3],[0,0,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 1
  — dim E₃ = 3 − rang(A − 3I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 3I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 1, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← a ≠ 1
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = −1 : rang(A − I) = □, dim E₁ = □ | A est diagonalisable si et seulement si a ≠ 1.
  pièges : g2_xx_lost_one, l_diag_distinct

Soit A = [[4,0,0],[-2,a+3,0],[2,2,3]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [guided]  a + 3 = 4 ou a + 3 = 3
    (Les valeurs propres sont 4, a + 3 et 3 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    ? Quelles valeurs de a faut-il examiner ? · Celles où det A = 0 / · Toutes : chercher le rang de A − λI pour chaque a / ✔ Celles où deux valeurs propres sont égales
    = a = 0 ou a = 1   ← Valeurs critiques
  — a = 0 : 3 est valeur propre double. Écris A − 3I.  [juge mat]  départ : A − 3I
    = [[1,0,0],[-2,0,0],[2,2,0]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 0
  — dim E₃ = 3 − rang(A − 3I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 3I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — a = 1 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    ? Pour a = 0, A est-elle diagonalisable ? · Oui / ✔ Non
    = [[0,0,0],[-2,0,0],[2,2,-1]]   (cases à remplir : (1,1) (2,2) (3,3))   ← a = 1
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 4I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 1, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 0[ ∪ ]0 ; 1[ ∪ ]1 ; +∞[   ← a ∉ {0 ; 1}
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 0 : rang(A − 3I) = □, dim E₃ = □ | A est diagonalisable si et seulement si a ∉ {0 ; 1}.

```

### Niveau 3

```
Soit A = [[3,-1,1],[0,a-2,0],[0,0,-2]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ? Choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  a − 2 = 3 ou a − 2 = −2
    (Les valeurs propres sont 3, a − 2 et −2 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 0 ou a = 5   ← Valeurs critiques
  — a = 0 : −2 est valeur propre double. Écris A + 2I.  [juge mat]  départ : A + 2I
    = [[5,-1,1],[0,0,0],[0,0,0]]   ← a = 0
  — dim E₋₂ = 3 − rang(A + 2I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A + 2I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 5 : 3 est valeur propre double. Écris A − 3I.  [juge mat]  départ : A − 3I
    ? Pour a = 0, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[0,-1,1],[0,0,0],[0,0,-5]]   ← a = 5
  — dim E₃ = 3 − rang(A − 3I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 3I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 5, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 5[ ∪ ]5 ; +∞[   ← a ≠ 5
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 0 : rang(A + 2I) = □, dim E₋₂ = □ | A est diagonalisable si et seulement si a ≠ 5.
  pièges : l_diag_distinct

Soit A = [[4,-2,-1],[0,a+2,0],[0,0,3]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ? Choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  a + 2 = 4 ou a + 2 = 3
    (Les valeurs propres sont 4, a + 2 et 3 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 1 ou a = 2   ← Valeurs critiques
  — a = 1 : 3 est valeur propre double. Écris A − 3I.  [juge mat]  départ : A − 3I
    = [[1,-2,-1],[0,0,0],[0,0,0]]   ← a = 1
  — dim E₃ = 3 − rang(A − 3I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A − 3I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 2 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    ? Pour a = 1, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[0,-2,-1],[0,0,0],[0,0,-1]]   ← a = 2
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 4I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 2, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 2[ ∪ ]2 ; +∞[   ← a ≠ 2
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 1 : rang(A − 3I) = □, dim E₃ = □ | A est diagonalisable si et seulement si a ≠ 2.
  pièges : l_diag_distinct

Soit A = [[2,2,-2],[0,a+2,0],[0,0,4]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ? Choisis d'abord l'action.
  [tap, suivre l'erreur, menu menu]  a + 2 = 2 ou a + 2 = 4
    (Les valeurs propres sont 2, a + 2 et 4 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 0 ou a = 2   ← Valeurs critiques
  — a = 0 : 2 est valeur propre double. Écris A − 2I.  [juge mat]  départ : A − 2I
    = [[0,2,-2],[0,0,0],[0,0,2]]   ← a = 0
  — dim E₂ = 3 − rang(A − 2I).  [juge value]  départ : dim
    = 3 − 2   ← rang(A − 2I) = 2
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — a = 2 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    ? Pour a = 0, A est-elle diagonalisable ? · Oui / ✔ Non
    = [[-2,2,-2],[0,0,0],[0,0,0]]   ← a = 2
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 3 − 1   ← rang(A − 4I) = 1
    = 2   ← dim 2 = multiplicité : diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 2, A est-elle diagonalisable ? ✔ Oui / · Non
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← a ≠ 0
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 0 : rang(A − 2I) = □, dim E₂ = □ | A est diagonalisable si et seulement si a ≠ 0.
  pièges : l_diag_distinct

```

### Niveau 4

```
Soit A = [[-2,0,2],[0,a-2,2],[0,0,2]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, suivre l'erreur]  a − 2 = −2 ou a − 2 = 2
    (Les valeurs propres sont −2, a − 2 et 2 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 0 ou a = 4   ← Valeurs critiques
  — a = 0 : −2 est valeur propre double. Écris A + 2I.  [juge mat]  départ : A + 2I
    = [[0,0,2],[0,0,2],[0,0,4]]   ← a = 0
  — dim E₋₂ = 3 − rang(A + 2I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 4 : 2 est valeur propre double. Écris A − 2I.  [juge mat]  départ : A − 2I
    ? Pour a = 0, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[-4,0,2],[0,0,2],[0,0,0]]   ← a = 4
  — dim E₂ = 3 − rang(A − 2I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 4, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 4[ ∪ ]4 ; +∞[   ← a ≠ 4
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 0 : rang(A + 2I) = □, dim E₋₂ = □ | A est diagonalisable si et seulement si a ≠ 4.
  pièges : l_diag_distinct

Soit A = [[-1,0,0],[0,a+2,0],[2,-1,2]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, suivre l'erreur]  a + 2 = −1 ou a + 2 = 2
    (Les valeurs propres sont −1, a + 2 et 2 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = −3 ou a = 0   ← Valeurs critiques
  — a = −3 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    = [[0,0,0],[0,0,0],[2,-1,3]]   ← a = −3
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 0 : 2 est valeur propre double. Écris A − 2I.  [juge mat]  départ : A − 2I
    ? Pour a = −3, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[-3,0,0],[0,0,0],[2,-1,0]]   ← a = 0
  — dim E₂ = 3 − rang(A − 2I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 0, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← a ≠ 0
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = −3 : rang(A + I) = □, dim E₋₁ = □ | A est diagonalisable si et seulement si a ≠ 0.
  pièges : l_diag_distinct

Soit A = [[2,3,3],[0,a-2,0],[0,0,-1]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, suivre l'erreur]  a − 2 = 2 ou a − 2 = −1
    (Les valeurs propres sont 2, a − 2 et −1 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 1 ou a = 4   ← Valeurs critiques
  — a = 1 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    = [[3,3,3],[0,0,0],[0,0,0]]   ← a = 1
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 4 : 2 est valeur propre double. Écris A − 2I.  [juge mat]  départ : A − 2I
    ? Pour a = 1, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[0,3,3],[0,0,0],[0,0,-3]]   ← a = 4
  — dim E₂ = 3 − rang(A − 2I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 4, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 4[ ∪ ]4 ; +∞[   ← a ≠ 4
  aides : Seules les valeurs de a où deux valeurs propres se confondent posent problème. Là, compare dim E_λ = 3 − rang(A − λI) à la multiplicité 2. | a = 1 : rang(A + I) = □, dim E₋₁ = □ | A est diagonalisable si et seulement si a ≠ 4.
  pièges : l_diag_distinct

```

### Niveau 5

```
Soit A = [[4,0,0],[0,a+2,-2],[0,0,1]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, sans aide]  a + 2 = 4 ou a + 2 = 1
    (Les valeurs propres sont 4, a + 2 et 1 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = −1 ou a = 2   ← Valeurs critiques
  — a = −1 : 1 est valeur propre double. Écris A − I.  [juge mat]  départ : A − I
    = [[3,0,0],[0,0,-2],[0,0,0]]   ← a = −1
  — dim E₁ = 3 − rang(A − I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — a = 2 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    ? Pour a = −1, A est-elle diagonalisable ? · Oui / ✔ Non
    = [[0,0,0],[0,0,-2],[0,0,-3]]   ← a = 2
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 2, A est-elle diagonalisable ? ✔ Oui / · Non
    = ]−∞ ; −1[ ∪ ]−1 ; +∞[   ← a ≠ −1
  pièges : g2_xx_lost_one, l_diag_distinct

Soit A = [[-2,0,0],[0,a-1,0],[-2,-2,-1]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, sans aide]  a − 1 = −2 ou a − 1 = −1
    (Les valeurs propres sont −2, a − 1 et −1 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = −1 ou a = 0   ← Valeurs critiques
  — a = −1 : −2 est valeur propre double. Écris A + 2I.  [juge mat]  départ : A + 2I
    = [[0,0,0],[0,0,0],[-2,-2,1]]   ← a = −1
  — dim E₋₂ = 3 − rang(A + 2I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 0 : −1 est valeur propre double. Écris A + I.  [juge mat]  départ : A + I
    ? Pour a = −1, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[-1,0,0],[0,0,0],[-2,-2,0]]   ← a = 0
  — dim E₋₁ = 3 − rang(A + I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 0, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← a ≠ 0
  pièges : l_diag_distinct

Soit A = [[3,0,1],[0,a+3,3],[0,0,4]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  [free, sans aide]  a + 3 = 3 ou a + 3 = 4
    (Les valeurs propres sont 3, a + 3 et 4 (matrice triangulaire). Pour quelles valeurs de a deux d'entre elles sont-elles égales ?)
    = a = 0 ou a = 1   ← Valeurs critiques
  — a = 0 : 3 est valeur propre double. Écris A − 3I.  [juge mat]  départ : A − 3I
    = [[0,0,1],[0,0,3],[0,0,1]]   ← a = 0
  — dim E₃ = 3 − rang(A − 3I).  [juge value]  départ : dim
    = 2   ← dim 2 = multiplicité : diagonalisable
  — a = 1 : 4 est valeur propre double. Écris A − 4I.  [juge mat]  départ : A − 4I
    ? Pour a = 0, A est-elle diagonalisable ? ✔ Oui / · Non
    = [[-1,0,1],[0,0,3],[0,0,0]]   ← a = 1
  — dim E₄ = 3 − rang(A − 4I).  [juge value]  départ : dim
    = 1   ← dim 1 &lt; 2 : pas diagonalisable
  — Pour quelles valeurs de a la matrice A est-elle diagonalisable ? (S = cet ensemble)  [juge solset]  départ : S
    ? Pour a = 1, A est-elle diagonalisable ? · Oui / ✔ Non
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← a ≠ 1
  pièges : l_diag_distinct

```

### Variantes d'examen

```
Soit A = [[4,0,3],[0,a+3,-1],[0,0,3]]. Pour quelles valeurs de a la matrice A est-elle diagonalisable ?
  · Si et seulement si a ∉ {0 ; 1} [l_diag_distinct]   ✔ Si et seulement si a ≠ 0   · Si et seulement si a ≠ 1   · Pour tout a
  [examen mcq]
  pièges : l_diag_distinct

Vrai ou faux ?
  « Si une valeur propre λ de A vérifie dim E_λ < multiplicité de λ, alors A n'est pas diagonalisable. » → VRAI
  [examen tf]

```

## Puissances Aᵏ et récurrences linéaires (`l-eig-powers`, BA1)

_Aᵏ = PDᵏP⁻¹ ; chaque mode est géométrique._

### Niveau 1

```
A = [[-1,-1],[2,-4]] s'écrit A = PDP⁻¹ avec P = [[1,1],[2,1]], D = diag(−3, −2) et P⁻¹ = [[-1,1],[2,-1]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    = [[1,1],[2,1]]·diag((-3)^k,(-2)^k)·[[-1,1],[2,-1]]   ← Aᵏ = PDᵏP⁻¹
    = [[(-3)^k,(-2)^k],[2·(-3)^k,(-2)^k]]·[[-1,1],[2,-1]]   ← P·Dᵏ d'abord
    = [[-(-3)^k+2·(-2)^k,(-3)^k-(-2)^k],[-2·(-3)^k+2·(-2)^k,2·(-3)^k-(-2)^k]]   (cases à remplir : (1,2) (2,1))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[(−3)^k,(−2)^k],[2·(−3)^k,(−2)^k]]·[[-1,1],[2,-1]] = [[□, □], [□, □]] | Aᵏ = [[-(-3)^k+2×(-2)^k,(-3)^k-(-2)^k],[-2×(-3)^k+2×(-2)^k,2×(-3)^k-(-2)^k]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

A = [[-5,4],[-8,7]] s'écrit A = PDP⁻¹ avec P = [[1,1],[1,2]], D = diag(−1, 3) et P⁻¹ = [[2,-1],[-1,1]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    = [[1,1],[1,2]]·diag((-1)^k,3^k)·[[2,-1],[-1,1]]   ← Aᵏ = PDᵏP⁻¹
    = [[(-1)^k,3^k],[(-1)^k,2·3^k]]·[[2,-1],[-1,1]]   ← P·Dᵏ d'abord
    = [[2·(-1)^k-3^k,-(-1)^k+3^k],[2·(-1)^k-2·3^k,-(-1)^k+2·3^k]]   (cases à remplir : (1,1) (1,2))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[(−1)^k,3^k],[(−1)^k,2·3^k]]·[[2,-1],[-1,1]] = [[□, □], [□, □]] | Aᵏ = [[2×(-1)^k-3^k,-(-1)^k+3^k],[2×(-1)^k-2×3^k,-(-1)^k+2×3^k]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

A = [[-5,-4],[2,1]] s'écrit A = PDP⁻¹ avec P = [[2,1],[-1,-1]], D = diag(−3, −1) et P⁻¹ = [[1,1],[-1,-2]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    = [[2,1],[-1,-1]]·diag((-3)^k,(-1)^k)·[[1,1],[-1,-2]]   ← Aᵏ = PDᵏP⁻¹
    = [[2·(-3)^k,(-1)^k],[-(-3)^k,-(-1)^k]]·[[1,1],[-1,-2]]   ← P·Dᵏ d'abord
    = [[2·(-3)^k-(-1)^k,2·(-3)^k-2·(-1)^k],[-(-3)^k+(-1)^k,-(-3)^k+2·(-1)^k]]   (cases à remplir : (1,1) (2,1))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[2·(−3)^k,(−1)^k],[−(−3)^k,−(−1)^k]]·[[1,1],[-1,-2]] = [[□, □], [□, □]] | Aᵏ = [[2×(-3)^k-(-1)^k,2×(-3)^k-2×(-1)^k],[-(-3)^k+(-1)^k,-(-3)^k+2×(-1)^k]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

```

### Niveau 2

```
A = [[5,6],[-3,-4]] s'écrit A = PDP⁻¹ avec P = [[1,2],[-1,-1]], D = diag(−1, 2) et P⁻¹ = [[-1,-2],[1,1]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    ? Comment calculer Aᵏ ? · Aᵏ = P⁻¹DᵏP / · Élever chaque case de A à la puissance k / ✔ Aᵏ = PDᵏP⁻¹
    = [[1,2],[-1,-1]]·diag((-1)^k,2^k)·[[-1,-2],[1,1]]   ← Aᵏ = PDᵏP⁻¹
    = [[(-1)^k,2·2^k],[-(-1)^k,-2^k]]·[[-1,-2],[1,1]]   ← P·Dᵏ d'abord
    = [[-(-1)^k+2·2^k,-2·(-1)^k+2·2^k],[(-1)^k-2^k,2·(-1)^k-2^k]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[(−1)^k,2·2^k],[−(−1)^k,−2^k]]·[[-1,-2],[1,1]] = [[□, □], [□, □]] | Aᵏ = [[-(-1)^k+2×2^k,-2×(-1)^k+2×2^k],[(-1)^k-2^k,2×(-1)^k-2^k]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

A = [[-1,-2],[4,5]] s'écrit A = PDP⁻¹ avec P = [[1,1],[-1,-2]], D = diag(1, 3) et P⁻¹ = [[2,1],[-1,-1]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    ? Comment calculer Aᵏ ? · Élever chaque case de A à la puissance k / · Aᵏ = P⁻¹DᵏP / ✔ Aᵏ = PDᵏP⁻¹
    = [[1,1],[-1,-2]]·diag(1,3^k)·[[2,1],[-1,-1]]   ← Aᵏ = PDᵏP⁻¹
    = [[1,3^k],[-1,-2·3^k]]·[[2,1],[-1,-1]]   ← P·Dᵏ d'abord
    = [[2-3^k,1-3^k],[2·3^k-2,2·3^k-1]]   (cases à remplir : (1,1) (2,1) (2,2))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[1,3^k],[−1,−2·3^k]]·[[2,1],[-1,-1]] = [[□, □], [□, □]] | Aᵏ = [[2-3^k,1-3^k],[2×3^k-2,2×3^k-1]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

A = [[5,-4],[8,-7]] s'écrit A = PDP⁻¹ avec P = [[1,1],[2,1]], D = diag(−3, 1) et P⁻¹ = [[-1,1],[2,-1]]. Calcule Aᵏ.
  [guided]  A^k
    (Calcule Aᵏ.)
    ? Comment calculer Aᵏ ? · Élever chaque case de A à la puissance k / · Aᵏ = P⁻¹DᵏP / ✔ Aᵏ = PDᵏP⁻¹
    = [[1,1],[2,1]]·diag((-3)^k,1)·[[-1,1],[2,-1]]   ← Aᵏ = PDᵏP⁻¹
    = [[(-3)^k,1],[2·(-3)^k,1]]·[[-1,1],[2,-1]]   ← P·Dᵏ d'abord
    = [[2-(-3)^k,(-3)^k-1],[2-2·(-3)^k,2·(-3)^k-1]]   (cases à remplir : (1,1) (1,2) (2,1))   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[(−3)^k,1],[2·(−3)^k,1]]·[[-1,1],[2,-1]] = [[□, □], [□, □]] | Aᵏ = [[2-(-3)^k,(-3)^k-1],[2-2×(-3)^k,2×(-3)^k-1]]
  pièges : l_pdp_inverse_side, l_powers_entrywise

```

### Niveau 3

```
Soit la suite définie par u₀ = −1, u₁ = −9 et uk+2 = 3uk+1 + 4uk. Trouve uk en fonction de k (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[3,4],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[3-λ,4],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(−λ) − 4   ← Diagonale moins antidiagonale
    = λ² − 3λ − 4   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 4)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 4.  [juge eigvec]  départ : v_1
    = (4 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = −1.  [juge eigvec]  départ : v_2
    = (-1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (−9 ; −1) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; 1)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = −2·4^k + (−1)^k   ← Contrôle : u₂ = −31
  aides : Avec x_k = (u_{k+1} ; u_k), M = [[a, b], [1, 0]]. Ses valeurs propres sont les racines de λ² − aλ − b ; un vecteur propre est (λ ; 1). Décompose x₀, puis u_k = c₁λ₁ᵏ + c₂λ₂ᵏ. | λ² − 3λ − 4 = (λ − □)(λ − □) | uk = −2·4ᵏ+(−1)ᵏ

Soit la suite définie par u₀ = −3, u₁ = −8 et uk+2 = 5uk+1 − 6uk. Trouve uk en fonction de k (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[5,-6],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[5-λ,-6],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (5 − λ)(−λ) + 6   ← Diagonale moins antidiagonale
    = λ² − 5λ + 6   ← λ² − (tr A)λ + det A
    = (λ − 2)(λ − 3)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 3.  [juge eigvec]  départ : v_1
    = (3 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = 2.  [juge eigvec]  départ : v_2
    = (2 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (−8 ; −3) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-2 ; -1)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = −2·3^k − 2^k   ← Contrôle : u₂ = −22
  aides : Avec x_k = (u_{k+1} ; u_k), M = [[a, b], [1, 0]]. Ses valeurs propres sont les racines de λ² − aλ − b ; un vecteur propre est (λ ; 1). Décompose x₀, puis u_k = c₁λ₁ᵏ + c₂λ₂ᵏ. | λ² − 5λ + 6 = (λ − □)(λ − □) | uk = −2·3ᵏ−2ᵏ

Soit la suite définie par u₀ = 2, u₁ = 2 et uk+2 = 2uk+1 + 8uk. Trouve uk en fonction de k (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[2,8],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[2-λ,8],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (2 − λ)(−λ) − 8   ← Diagonale moins antidiagonale
    = λ² − 2λ − 8   ← λ² − (tr A)λ + det A
    = (λ + 2)(λ − 4)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 4.  [juge eigvec]  départ : v_1
    = (4 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = −2.  [juge eigvec]  départ : v_2
    = (-2 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (2 ; 2) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (1 ; 1)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = 4^k + (−2)^k   ← Contrôle : u₂ = 20
  aides : Avec x_k = (u_{k+1} ; u_k), M = [[a, b], [1, 0]]. Ses valeurs propres sont les racines de λ² − aλ − b ; un vecteur propre est (λ ; 1). Décompose x₀, puis u_k = c₁λ₁ᵏ + c₂λ₂ᵏ. | λ² − 2λ − 8 = (λ − □)(λ − □) | uk = 4ᵏ+(−2)ᵏ

```

### Niveau 4

```
Diagonalise A = [[7,3],[-6,-2]], puis calcule Aᵏ pour tout entier k ≥ 0.
  [free, suivre l'erreur]  det(A − λI)
    (Valeurs propres.)
    = det[[7-λ,3],[-6,-2-λ]]   ← λ soustrait sur toute la diagonale
    = (7 − λ)(−2 − λ) + 18   ← Diagonale moins antidiagonale
    = λ² − 5λ + 4   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 4)   ← Factoriser le trinôme
  — Diagonalise A.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[-2,-1]] ; D = diag(1,4)   ← Vecteurs propres en colonnes
  — Calcule Aᵏ.  [juge mat]  départ : A^k
    = [[1,4^k],[-2,-4^k]]·[[-1,-1],[2,1]]   ← P·Dᵏ d'abord
    = [[2·4^k-1,4^k-1],[2-2·4^k,2-4^k]]   ← Puis (PDᵏ)·P⁻¹
  aides : Aᵏ = PDᵏP⁻¹ ; seule D est élevée à la puissance k : Dᵏ = diag(λ₁ᵏ, λ₂ᵏ). | [[1,4^k],[−2,−4^k]]·[[-1,-1],[2,1]] = [[□, □], [□, □]] | Aᵏ = [[2×4^k-1,4^k-1],[2-2×4^k,2-4^k]]
  pièges : l_charpoly_sign, l_lambda_one_entry

Soit la suite définie par u₀ = 1, u₁ = −10 et uk+2 = uk+1 + 12uk. Trouve uk en fonction de k.
  [free, suivre l'erreur]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[1,12],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[1-λ,12],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (1 − λ)(−λ) − 12   ← Diagonale moins antidiagonale
    = λ² − λ − 12   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ − 4)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 4.  [juge eigvec]  départ : v_1
    = (4 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = −3.  [juge eigvec]  départ : v_2
    = (-3 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (−10 ; 1) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; 2)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = −4^k + 2·(−3)^k   ← Contrôle : u₂ = 2
  aides : Avec x_k = (u_{k+1} ; u_k), M = [[a, b], [1, 0]]. Ses valeurs propres sont les racines de λ² − aλ − b ; un vecteur propre est (λ ; 1). Décompose x₀, puis u_k = c₁λ₁ᵏ + c₂λ₂ᵏ. | λ² − λ − 12 = (λ − □)(λ − □) | uk = −4ᵏ+2·(−3)ᵏ

Soit la suite définie par u₀ = 0, u₁ = −4 et uk+2 = 2uk+1 + 3uk. Trouve uk en fonction de k.
  [free, suivre l'erreur]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[2,3],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[2-λ,3],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (2 − λ)(−λ) − 3   ← Diagonale moins antidiagonale
    = λ² − 2λ − 3   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 3)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 3.  [juge eigvec]  départ : v_1
    = (3 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = −1.  [juge eigvec]  départ : v_2
    = (-1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (−4 ; 0) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; 1)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = −3^k + (−1)^k   ← Contrôle : u₂ = −8
  aides : Avec x_k = (u_{k+1} ; u_k), M = [[a, b], [1, 0]]. Ses valeurs propres sont les racines de λ² − aλ − b ; un vecteur propre est (λ ; 1). Décompose x₀, puis u_k = c₁λ₁ᵏ + c₂λ₂ᵏ. | λ² − 2λ − 3 = (λ − □)(λ − □) | uk = −3ᵏ+(−1)ᵏ

```

### Niveau 5

```
Soit la suite définie par u₀ = 4, u₁ = 10 et uk+2 = 5uk+1 − 4uk. Trouve uk en fonction de k, puis la limite de uk/4ᵏ.
  [free, sans aide]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[5,-4],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[5-λ,-4],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (5 − λ)(−λ) + 4   ← Diagonale moins antidiagonale
    = λ² − 5λ + 4   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 4)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 4.  [juge eigvec]  départ : v_1
    = (4 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = 1.  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (10 ; 4) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (2 ; 2)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = 2·4^k + 2   ← Contrôle : u₂ = 34
  — Que vaut la limite de uk/4ᵏ quand k → ∞ ?  [juge value]  départ : L
    = 2   ← u<sub>k</sub>/4ᵏ = 2 + 2·(1/4)ᵏ → 2, car |1/4| &lt; 1

Soit la suite définie par u₀ = −3, u₁ = −4 et uk+2 = 3uk+1 − 2uk. Trouve uk en fonction de k, puis la limite de uk/2ᵏ.
  [free, sans aide]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[3,-2],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[3-λ,-2],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(−λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 3λ + 2   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 2)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 2.  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = 1.  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (−4 ; −3) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (-1 ; -2)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = −2^k − 2   ← Contrôle : u₂ = −6
  — Que vaut la limite de uk/2ᵏ quand k → ∞ ?  [juge value]  départ : L
    = −1   ← u<sub>k</sub>/2ᵏ = −1 − 2·(1/2)ᵏ → −1, car |1/2| &lt; 1

Soit la suite définie par u₀ = 4, u₁ = 7 et uk+2 = 3uk+1 − 2uk. Trouve uk en fonction de k, puis la limite de uk/2ᵏ.
  [free, sans aide]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[3,-2],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[3-λ,-2],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(−λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 3λ + 2   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 2)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 2.  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = 1.  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (7 ; 4) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (3 ; 1)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = 3·2^k + 1   ← Contrôle : u₂ = 13
  — Que vaut la limite de uk/2ᵏ quand k → ∞ ?  [juge value]  départ : L
    = 3   ← u<sub>k</sub>/2ᵏ = 3 + (1/2)ᵏ → 3, car |1/2| &lt; 1

```

### Variantes d'examen

```
Soit A = [[-1,2],[-4,5]] = PDP⁻¹ avec P = [[1,1],[1,2]] et D = diag(1, 3). Quel est le coefficient (2, 1) de Aᵏ ?
  · 2·3^k − 2 [l_pd_order]   · (−4)^k [l_powers_entrywise]   ✔ 2 − 2·3^k   · 3^k − 1 [l_pdp_inverse_side]
  [examen mcq]
  pièges : l_powers_entrywise, l_pdp_inverse_side, l_pd_order

Soit la suite définie par u₀ = 5, u₁ = 7 et uk+2 = 2uk+1 + 3uk. Trouve uk en fonction de k, puis la limite de uk/3ᵏ.
  [free, sans aide, examen open]  M
    (xk = (uk+1 ; uk) vérifie xk+1 = Mxk. Écris M.)
    = [[2,3],[1,0]]   ← Ligne 1 : la récurrence ; ligne 2 : u<sub>k+1</sub> = u<sub>k+1</sub>
  — Valeurs propres de M.  [juge det]  départ : det(M − λI)
    = det[[2-λ,3],[1,-λ]]   ← λ soustrait sur toute la diagonale
    = (2 − λ)(−λ) − 3   ← Diagonale moins antidiagonale
    = λ² − 2λ − 3   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 3)   ← Factoriser le trinôme
  — Un vecteur propre v₁ de M pour λ = 3.  [juge eigvec]  départ : v_1
    = (3 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Un vecteur propre v₂ de M pour λ = −1.  [juge eigvec]  départ : v_2
    = (-1 ; 1)   ← De la ligne 2 : x₁ = λx₂
  — Décompose x₀ = (u₁ ; u₀) = (7 ; 5) = c₁v₁ + c₂v₂.  [juge mat]  départ : c
    = (3 ; 2)   ← Résoudre le système 2 × 2
  — xk = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂ : donne uk (la 2e composante).  [juge mat]  départ : u_k
    = 3·3^k + 2·(−1)^k   ← Contrôle : u₂ = 29
  — Que vaut la limite de uk/3ᵏ quand k → ∞ ?  [juge value]  départ : L
    = 3   ← u<sub>k</sub>/3ᵏ = 3 + 2·(−1/3)ᵏ → 3, car |−1/3| &lt; 1

Vrai ou faux ?
  « Pour toute matrice carrée A, A² est la matrice des carrés des coefficients de A. » → FAUX
    contre-exemple (matOne) : A = [[1,1],[0,1]]
  [examen tf]
  pièges : l_powers_entrywise

```

## Chaînes de Markov à 2 états, état stationnaire (`l-eig-markov`, BA1)

_Mq = q, avec q de somme 1._

### Niveau 1

```
Après un jour de soleil, il fait beau le lendemain avec une probabilité de 80 % ; après un jour de pluie, avec une probabilité de 70 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[4/5,7/10],[1/5,3/10]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (7 ; 2)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (7/9 ; 2/9)   (cases à remplir : (1,1) (2,1))   ← Diviser par 9
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/9 | M = [[4/5,7/10],[1/5,3/10]], q = (7/9 ; 2/9)
  pièges : l_markov_rows

Chaque jour, 80 % des cyclistes reprennent le vélo le lendemain, et 70 % des usagers du métro passent au vélo. On note xk = (part « vélo » ; part « métro ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : vélo ; état 2 : métro. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[4/5,7/10],[1/5,3/10]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (7 ; 2)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (7/9 ; 2/9)   (cases à remplir : (1,1) (2,1))   ← Diviser par 9
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/9 | M = [[4/5,7/10],[1/5,3/10]], q = (7/9 ; 2/9)
  pièges : l_markov_rows

Chaque matin, 70 % des buveurs de café en reprennent le lendemain, et 50 % de ceux qui n'en ont pas bu s'y mettent. On note xk = (part « café » ; part « pas de café ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : café ; état 2 : pas de café. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[7/10,1/2],[3/10,1/2]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (5 ; 3)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (5/8 ; 3/8)   (cases à remplir : (1,1) (2,1))   ← Diviser par 8
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/8 | M = [[7/10,1/2],[3/10,1/2]], q = (5/8 ; 3/8)
  pièges : l_markov_rows

```

### Niveau 2

```
Chaque jour, 90 % des cyclistes reprennent le vélo le lendemain, et 60 % des usagers du métro passent au vélo. On note xk = (part « vélo » ; part « métro ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : vélo ; état 2 : métro. La colonne j dit ce que deviennent ceux de l'état j.)
    ? Où ranger les probabilités « de l'état j vers l'état i » ? ✔ Dans la colonne j (chaque colonne somme à 1) / · Dans la ligne j (chaque ligne somme à 1)
    = [[9/10,3/5],[1/10,2/5]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (6 ; 1)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (6/7 ; 1/7)   (cases à remplir : (1,1) (2,1))   ← Diviser par 7
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/7 | M = [[9/10,3/5],[1/10,2/5]], q = (6/7 ; 1/7)
  pièges : l_markov_rows

Après un jour de soleil, il fait beau le lendemain avec une probabilité de 90 % ; après un jour de pluie, avec une probabilité de 80 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    ? Où ranger les probabilités « de l'état j vers l'état i » ? ✔ Dans la colonne j (chaque colonne somme à 1) / · Dans la ligne j (chaque ligne somme à 1)
    = [[9/10,4/5],[1/10,1/5]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (8 ; 1)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (8/9 ; 1/9)   (cases à remplir : (1,1) (2,1))   ← Diviser par 9
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/9 | M = [[9/10,4/5],[1/10,1/5]], q = (8/9 ; 1/9)
  pièges : l_markov_rows

Chaque matin, 60 % des buveurs de café en reprennent le lendemain, et 30 % de ceux qui n'en ont pas bu s'y mettent. On note xk = (part « café » ; part « pas de café ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [guided]  M
    (État 1 : café ; état 2 : pas de café. La colonne j dit ce que deviennent ceux de l'état j.)
    ? Où ranger les probabilités « de l'état j vers l'état i » ? · Dans la ligne j (chaque ligne somme à 1) / ✔ Dans la colonne j (chaque colonne somme à 1)
    = [[3/5,3/10],[2/5,7/10]]   (cases à remplir : (2,1) (1,2))   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (3 ; 4)   (cases à remplir : (2,1))   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (3/7 ; 4/7)   (cases à remplir : (1,1) (2,1))   ← Diviser par 7
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/7 | M = [[3/5,3/10],[2/5,7/10]], q = (3/7 ; 4/7)
  pièges : l_markov_rows

```

### Niveau 3

```
Chaque matin, 90 % des buveurs de café en reprennent le lendemain, et 60 % de ceux qui n'en ont pas bu s'y mettent. On note xk = (part « café » ; part « pas de café ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [tap, suivre l'erreur, menu menu]  M
    (État 1 : café ; état 2 : pas de café. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[9/10,3/5],[1/10,2/5]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (6 ; 1)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (6/7 ; 1/7)   ← Diviser par 7
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/7 | M = [[9/10,3/5],[1/10,2/5]], q = (6/7 ; 1/7)
  pièges : l_markov_rows

Chaque matin, 50 % des buveurs de café en reprennent le lendemain, et 80 % de ceux qui n'en ont pas bu s'y mettent. On note xk = (part « café » ; part « pas de café ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [tap, suivre l'erreur, menu menu]  M
    (État 1 : café ; état 2 : pas de café. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[1/2,4/5],[1/2,1/5]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (8 ; 5)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (8/13 ; 5/13)   ← Diviser par 13
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/13 | M = [[1/2,4/5],[1/2,1/5]], q = (8/13 ; 5/13)
  pièges : l_markov_rows

Chaque jour, 60 % des cyclistes reprennent le vélo le lendemain, et 30 % des usagers du métro passent au vélo. On note xk = (part « vélo » ; part « métro ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire.
  [tap, suivre l'erreur, menu menu]  M
    (État 1 : vélo ; état 2 : métro. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[3/5,3/10],[2/5,7/10]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (3 ; 4)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (3/7 ; 4/7)   ← Diviser par 7
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/7 | M = [[3/5,3/10],[2/5,7/10]], q = (3/7 ; 4/7)
  pièges : l_markov_rows

```

### Niveau 4

```
Après un jour de soleil, il fait beau le lendemain avec une probabilité de 70 % ; après un jour de pluie, avec une probabilité de 20 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk.
  [free, suivre l'erreur]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[7/10,1/5],[3/10,4/5]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (2 ; 3)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (2/5 ; 3/5)   ← Diviser par 5
  — Au départ, x₀ = (0 ; 1). L'autre valeur propre est μ = tr M − 1 = 1/2, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (2/5-2/5·(1/2)^k ; 3/5+2/5·(1/2)^k)   ← x₀ = q + (−2/5)·(1 ; −1)
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/5 | M = [[7/10,1/5],[3/10,4/5]], q = (2/5 ; 3/5)
  pièges : l_markov_rows

Après un jour de soleil, il fait beau le lendemain avec une probabilité de 60 % ; après un jour de pluie, avec une probabilité de 70 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk.
  [free, suivre l'erreur]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[3/5,7/10],[2/5,3/10]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (7 ; 4)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (7/11 ; 4/11)   ← Diviser par 11
  — Au départ, x₀ = (1/2 ; 1/2). L'autre valeur propre est μ = tr M − 1 = −1/10, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (7/11-3/22·(-1/10)^k ; 4/11+3/22·(-1/10)^k)   ← x₀ = q + (−3/22)·(1 ; −1)
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/11 | M = [[3/5,7/10],[2/5,3/10]], q = (7/11 ; 4/11)
  pièges : l_markov_rows

Après un jour de soleil, il fait beau le lendemain avec une probabilité de 80 % ; après un jour de pluie, avec une probabilité de 30 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk.
  [free, suivre l'erreur]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[4/5,3/10],[1/5,7/10]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (3 ; 2)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (3/5 ; 2/5)   ← Diviser par 5
  — Au départ, x₀ = (0 ; 1). L'autre valeur propre est μ = tr M − 1 = 1/2, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (3/5-3/5·(1/2)^k ; 2/5+3/5·(1/2)^k)   ← x₀ = q + (−3/5)·(1 ; −1)
  aides : Colonne j : ce que deviennent ceux qui sont dans l'état j (elle somme à 1). Puis (M − I)q = 0 et q₁ + q₂ = 1. | q = (□ ; □)/5 | M = [[4/5,3/10],[1/5,7/10]], q = (3/5 ; 2/5)
  pièges : l_markov_rows

```

### Niveau 5

```
Après un jour de soleil, il fait beau le lendemain avec une probabilité de 50 % ; après un jour de pluie, avec une probabilité de 30 %. On note xk = (part « soleil » ; part « pluie ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk, et la part limite.
  [free, sans aide]  M
    (État 1 : soleil ; état 2 : pluie. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[1/2,3/10],[1/2,7/10]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (3 ; 5)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (3/8 ; 5/8)   ← Diviser par 8
  — Au départ, x₀ = (1 ; 0). L'autre valeur propre est μ = tr M − 1 = 1/5, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (3/8+5/8·(1/5)^k ; 5/8-5/8·(1/5)^k)   ← x₀ = q + (5/8)·(1 ; −1)
  — À la longue, quelle proportion des jours est dans l'état « soleil » ?  [juge value]  départ : L
    ? Cette limite dépend-elle de x₀ ? ✔ Non / · Oui
    = 3/8   ← ≈ 38 %
  pièges : l_markov_rows

Chaque matin, 70 % des buveurs de café en reprennent le lendemain, et 20 % de ceux qui n'en ont pas bu s'y mettent. On note xk = (part « café » ; part « pas de café ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk, et la part limite.
  [free, sans aide]  M
    (État 1 : café ; état 2 : pas de café. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[7/10,1/5],[3/10,4/5]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (2 ; 3)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (2/5 ; 3/5)   ← Diviser par 5
  — Au départ, x₀ = (0 ; 1). L'autre valeur propre est μ = tr M − 1 = 1/2, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (2/5-2/5·(1/2)^k ; 3/5+2/5·(1/2)^k)   ← x₀ = q + (−2/5)·(1 ; −1)
  — À la longue, quelle part de la population est dans l'état « café » ?  [juge value]  départ : L
    ? Cette limite dépend-elle de x₀ ? ✔ Non / · Oui
    = 2/5   ← ≈ 40 %
  pièges : l_markov_rows

Chaque jour, 80 % des cyclistes reprennent le vélo le lendemain, et 30 % des usagers du métro passent au vélo. On note xk = (part « vélo » ; part « métro ») le jour k, et xk+1 = Mxk. Écris M, puis l'état stationnaire et xk, et la part limite.
  [free, sans aide]  M
    (État 1 : vélo ; état 2 : métro. La colonne j dit ce que deviennent ceux de l'état j.)
    = [[4/5,3/10],[1/5,7/10]]   ← Chaque colonne somme à 1
  — (M − I)q = 0 : un vecteur propre de M pour la valeur propre 1.  [juge eigvec]  départ : v
    = (3 ; 2)   ← Ker(M − I)
  — L'état stationnaire q : un vecteur propre de 1 dont les composantes somment à 1.  [juge mat]  départ : q
    = (3/5 ; 2/5)   ← Diviser par 5
  — Au départ, x₀ = (1/2 ; 1/2). L'autre valeur propre est μ = tr M − 1 = 1/2, de vecteur propre (1 ; −1). Donne xk.  [juge mat]  départ : x_k
    = (3/5-1/10·(1/2)^k ; 2/5+1/10·(1/2)^k)   ← x₀ = q + (−1/10)·(1 ; −1)
  — À la longue, quelle part des trajets est dans l'état « vélo » ?  [juge value]  départ : L
    ? Cette limite dépend-elle de x₀ ? ✔ Non / · Oui
    = 3/5   ← ≈ 60 %
  pièges : l_markov_rows

```

### Variantes d'examen

```
Chaque matin, 70 % des buveurs de café en reprennent le lendemain, et 60 % de ceux qui n'en ont pas bu s'y mettent. À la longue, quelle part de la population est dans l'état « café » ?
  · 1/2 [l_markov_rows]   ✔ 2/3   · 1/3   · 2 [l_markov_normalize]
  [examen mcq]
  pièges : l_markov_rows, l_markov_normalize

Vrai ou faux ?
  « Si chaque colonne d'une matrice carrée M somme à 1, alors 1 est valeur propre de M. » → VRAI
  [examen tf]

```

## Valeurs propres complexes, rotation et dilatation (`l-eig-complex`, BA1)

_Δ < 0 : deux valeurs propres conjuguées._

### Niveau 1

```
Trouve les valeurs propres complexes de A = [[-3,-2],[2,-3]] et un vecteur propre pour chacune.
  [guided]  Δ
    (Le polynôme caractéristique est λ² + 6λ + 13. Calcule son discriminant.)
    = −16   ← Δ &lt; 0 : deux racines complexes conjuguées
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 6λ + 13
    = (λ − (−3 + 2i))(λ − (−3 − 2i))   ← Valeurs propres −3 + 2i et −3 − 2i
  — Un vecteur propre v pour λ = −3 + 2i.  [juge eigvec]  départ : v
    = (2i ; 2)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −3 − 2i.  [juge eigvec]  départ : w
    = (-2i ; 2)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2) | λ = −3 + 2i, v = (2i ; 2) ; λ̄ = −3 − 2i, v̄ = (−2i ; 2)

Trouve les valeurs propres complexes de A = [[0,-4],[2,-4]] et un vecteur propre pour chacune.
  [guided]  Δ
    (Le polynôme caractéristique est λ² + 4λ + 8. Calcule son discriminant.)
    = −16   ← Δ &lt; 0 : deux racines complexes conjuguées
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 4λ + 8
    = (λ − (−2 + 2i))(λ − (−2 − 2i))   ← Valeurs propres −2 + 2i et −2 − 2i
  — Un vecteur propre v pour λ = −2 + 2i.  [juge eigvec]  départ : v
    = (2+2i ; 2)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −2 − 2i.  [juge eigvec]  départ : w
    = (2-2i ; 2)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2) | λ = −2 + 2i, v = (2 + 2i ; 2) ; λ̄ = −2 − 2i, v̄ = (2 − 2i ; 2)

Trouve les valeurs propres complexes de A = [[4,5],[-1,0]] et un vecteur propre pour chacune.
  [guided]  Δ
    (Le polynôme caractéristique est λ² − 4λ + 5. Calcule son discriminant.)
    = −4   ← Δ &lt; 0 : deux racines complexes conjuguées
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 4λ + 5
    = (λ − (2 + i))(λ − (2 − i))   ← Valeurs propres 2 + i et 2 − i
  — Un vecteur propre v pour λ = 2 + i.  [juge eigvec]  départ : v
    = (-2-i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = 2 − i.  [juge eigvec]  départ : w
    = (-2+i ; 1)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 1) | λ = 2 + i, v = (−2 − i ; 1) ; λ̄ = 2 − i, v̄ = (−2 + i ; 1)

```

### Niveau 2

```
Trouve les valeurs propres complexes de A = [[4,-2],[4,0]] et un vecteur propre pour chacune.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[4-λ,-2],[4,-λ]]   ← λ soustrait sur toute la diagonale
    = (4 − λ)(−λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 4λ + 8   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 4λ + 8
    = (λ − (2 + 2i))(λ − (2 − 2i))   ← Valeurs propres 2 + 2i et 2 − 2i
  — Un vecteur propre v pour λ = 2 + 2i.  [juge eigvec]  départ : v
    ? Quelle ligne de A − λI utiliser pour trouver v ? ✔ La ligne 1 / ✔ La ligne 2
    = (2 ; 2-2i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = 2 − 2i.  [juge eigvec]  départ : w
    = (2 ; 2+2i)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2 − 2i) | λ = 2 + 2i, v = (2 ; 2 − 2i) ; λ̄ = 2 − 2i, v̄ = (2 ; 2 + 2i)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[-3,1],[-1,-3]] et un vecteur propre pour chacune.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-3-λ,1],[-1,-3-λ]]   ← λ soustrait sur toute la diagonale
    = (−3 − λ)(−3 − λ) + 1   ← Diagonale moins antidiagonale
    = λ² + 6λ + 10   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 6λ + 10
    = (λ − (−3 + i))(λ − (−3 − i))   ← Valeurs propres −3 + i et −3 − i
  — Un vecteur propre v pour λ = −3 + i.  [juge eigvec]  départ : v
    ? Quelle ligne de A − λI utiliser pour trouver v ? ✔ La ligne 1 / ✔ La ligne 2
    = (-i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −3 − i.  [juge eigvec]  départ : w
    = (i ; 1)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 1) | λ = −3 + i, v = (−i ; 1) ; λ̄ = −3 − i, v̄ = (i ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[2,-2],[4,-2]] et un vecteur propre pour chacune.
  [guided]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[2-λ,-2],[4,-2-λ]]   ← λ soustrait sur toute la diagonale
    = (2 − λ)(−2 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 4   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 4
    = (λ − (2i))(λ − (−2i))   ← Valeurs propres 2i et −2i
  — Un vecteur propre v pour λ = 2i.  [juge eigvec]  départ : v
    ? Quelle ligne de A − λI utiliser pour trouver v ? ✔ La ligne 1 / ✔ La ligne 2
    = (2 ; 2-2i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = −2i.  [juge eigvec]  départ : w
    = (2 ; 2+2i)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2 − 2i) | λ = 2i, v = (2 ; 2 − 2i) ; λ̄ = −2i, v̄ = (2 ; 2 + 2i)
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 3

```
Trouve les valeurs propres complexes de A = [[6,-5],[2,0]] et un vecteur propre pour chacune (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[6-λ,-5],[2,-λ]]   ← λ soustrait sur toute la diagonale
    = (6 − λ)(−λ) + 10   ← Diagonale moins antidiagonale
    = λ² − 6λ + 10   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 6λ + 10
    = (λ − (3 + i))(λ − (3 − i))   ← Valeurs propres 3 + i et 3 − i
  — Un vecteur propre v pour λ = 3 + i.  [juge eigvec]  départ : v
    = (3+i ; 2)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = 3 − i.  [juge eigvec]  départ : w
    = (3-i ; 2)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2) | λ = 3 + i, v = (3 + i ; 2) ; λ̄ = 3 − i, v̄ = (3 − i ; 2)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[-2,1],[-1,-2]] et un vecteur propre pour chacune (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-2-λ,1],[-1,-2-λ]]   ← λ soustrait sur toute la diagonale
    = (−2 − λ)(−2 − λ) + 1   ← Diagonale moins antidiagonale
    = λ² + 4λ + 5   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 4λ + 5
    = (λ − (−2 + i))(λ − (−2 − i))   ← Valeurs propres −2 + i et −2 − i
  — Un vecteur propre v pour λ = −2 + i.  [juge eigvec]  départ : v
    = (-i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −2 − i.  [juge eigvec]  départ : w
    = (i ; 1)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 1) | λ = −2 + i, v = (−i ; 1) ; λ̄ = −2 − i, v̄ = (i ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[1,-1],[5,-3]] et un vecteur propre pour chacune (choisis d'abord l'action).
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[1-λ,-1],[5,-3-λ]]   ← λ soustrait sur toute la diagonale
    = (1 − λ)(−3 − λ) + 5   ← Diagonale moins antidiagonale
    = λ² + 2λ + 2   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 2λ + 2
    = (λ − (−1 + i))(λ − (−1 − i))   ← Valeurs propres −1 + i et −1 − i
  — Un vecteur propre v pour λ = −1 + i.  [juge eigvec]  départ : v
    = (1 ; 2-i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = −1 − i.  [juge eigvec]  départ : w
    = (1 ; 2+i)   ← Le conjugué de v
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2 − i) | λ = −1 + i, v = (1 ; 2 − i) ; λ̄ = −1 − i, v̄ = (1 ; 2 + i)
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 4

```
Trouve les valeurs propres complexes de A = [[-1,-2],[4,-5]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-1-λ,-2],[4,-5-λ]]   ← λ soustrait sur toute la diagonale
    = (−1 − λ)(−5 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 6λ + 13   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 6λ + 13
    = (λ − (−3 + 2i))(λ − (−3 − 2i))   ← Valeurs propres −3 + 2i et −3 − 2i
  — Un vecteur propre v pour λ = −3 + 2i.  [juge eigvec]  départ : v
    = (2 ; 2-2i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = −3 − 2i.  [juge eigvec]  départ : w
    = (2 ; 2+2i)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = √13   ← √(−3² + 2²)
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 2 − 2i) | λ = −3 + 2i, v = (2 ; 2 − 2i) ; λ̄ = −3 − 2i, v̄ = (2 ; 2 + 2i)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[-2,-2],[1,-4]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-2-λ,-2],[1,-4-λ]]   ← λ soustrait sur toute la diagonale
    = (−2 − λ)(−4 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² + 6λ + 10   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 6λ + 10
    = (λ − (−3 + i))(λ − (−3 − i))   ← Valeurs propres −3 + i et −3 − i
  — Un vecteur propre v pour λ = −3 + i.  [juge eigvec]  départ : v
    = (1+i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −3 − i.  [juge eigvec]  départ : w
    = (1-i ; 1)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = √10   ← √(−3² + 1²)
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 1) | λ = −3 + i, v = (1 + i ; 1) ; λ̄ = −3 − i, v̄ = (1 − i ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[3,-5],[1,-1]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, suivre l'erreur]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[3-λ,-5],[1,-1-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(−1 − λ) + 5   ← Diagonale moins antidiagonale
    = λ² − 2λ + 2   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 2λ + 2
    = (λ − (1 + i))(λ − (1 − i))   ← Valeurs propres 1 + i et 1 − i
  — Un vecteur propre v pour λ = 1 + i.  [juge eigvec]  départ : v
    = (2+i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = 1 − i.  [juge eigvec]  départ : w
    = (2-i ; 1)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = √2   ← √(1² + 1²)
  — Et l'angle de la rotation, arg(1 + i) ?  [juge value]  départ : θ
    = π/4   ← Argument de λ
  aides : Δ < 0 : λ = a ± bi. Pour v, prends une ligne de A − λI, par exemple (p, q) : v = (−q ; p) (ou (q ; −p)). Pour λ̄, conjugue v. | v = (□ ; 1) | λ = 1 + i, v = (2 + i ; 1) ; λ̄ = 1 − i, v̄ = (2 − i ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 5

```
Trouve les valeurs propres complexes de A = [[3,1],[-5,-1]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[3-λ,1],[-5,-1-λ]]   ← λ soustrait sur toute la diagonale
    = (3 − λ)(−1 − λ) + 5   ← Diagonale moins antidiagonale
    = λ² − 2λ + 2   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 2λ + 2
    = (λ − (1 + i))(λ − (1 − i))   ← Valeurs propres 1 + i et 1 − i
  — Un vecteur propre v pour λ = 1 + i.  [juge eigvec]  départ : v
    = (1 ; -2+i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = 1 − i.  [juge eigvec]  départ : w
    = (1 ; -2-i)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = √2   ← √(1² + 1²)
  — Et l'angle de la rotation, arg(1 + i) ?  [juge value]  départ : θ
    = π/4   ← Argument de λ
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[5,-1],[5,1]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[5-λ,-1],[5,1-λ]]   ← λ soustrait sur toute la diagonale
    = (5 − λ)(1 − λ) + 5   ← Diagonale moins antidiagonale
    = λ² − 6λ + 10   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² − 6λ + 10
    = (λ − (3 + i))(λ − (3 − i))   ← Valeurs propres 3 + i et 3 − i
  — Un vecteur propre v pour λ = 3 + i.  [juge eigvec]  départ : v
    = (1 ; 2-i)   ← Ligne 1 de A − λI
  — Un vecteur propre pour λ̄ = 3 − i.  [juge eigvec]  départ : w
    = (1 ; 2+i)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = √10   ← √(3² + 1²)
  pièges : l_charpoly_sign, l_lambda_one_entry

Trouve les valeurs propres complexes de A = [[-1,-2],[1,1]] et un vecteur propre pour chacune, puis le rapport de la rotation-dilatation.
  [free, sans aide]  det(A − λI)
    (Polynôme caractéristique.)
    = det[[-1-λ,-2],[1,1-λ]]   ← λ soustrait sur toute la diagonale
    = (−1 − λ)(1 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² + 1   ← λ² − (tr A)λ + det A
  — Factorise-le dans ℂ : λ = (−b ± i√(−Δ))/2a.  [juge poly]  départ : λ² + 1
    = (λ − (i))(λ − (−i))   ← Valeurs propres i et −i
  — Un vecteur propre v pour λ = i.  [juge eigvec]  départ : v
    = (-1+i ; 1)   ← Ligne 2 de A − λI
  — Un vecteur propre pour λ̄ = −i.  [juge eigvec]  départ : w
    = (-1-i ; 1)   ← Le conjugué de v
  — A agit comme une rotation composée d'une dilatation : quel est le rapport |λ| ?  [juge value]  départ : r
    = 1   ← √(0² + 1²)
  — Et l'angle de la rotation, arg(i) ?  [juge value]  départ : θ
    = π/2   ← Argument de λ
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Variantes d'examen

```
Soit A = [[0,1,0],[0,0,1],[1,0,0]]. L'ensemble des valeurs propres réelles de A est…
  · {0}   ✔ {1}   · {0 ; 1} [l_eigen_rref]   · {−1 ; 0}
  [examen mcq]
  pièges : l_eigen_rref

Vrai ou faux ?
  « Si A est réelle et Av = λv, alors Av̄ = λ̄v̄. » → VRAI
  [examen tf]
  pièges : l_complex_conj_vec

```

## Produit scalaire, norme, distance, angle (`l-orth-dot`, BA1)

_u · v = uᵀv ; ‖u‖ = √(u · u)._

### Niveau 1

```
Soit u = (2 ; −2 ; −4 ; 5) et v = (−4 ; −1 ; 2 ; 2). Calcule u · v, ‖u‖, ‖v‖, puis cos θ.
  [guided]  u·v
    = −8 + 2 − 8 + □   (trous : −8 + 2 − 8 + 10)   ← Produits terme à terme
    = −4   ← La somme : un nombre
  — Norme ‖u‖  [juge value]  départ : √(u·u)
    = √(4 + □ + 16 + 25)   (trous : √(4 + 4 + 16 + 25))   ← Somme des carrés
    = 7   ← Racine
  — Norme ‖v‖  [juge value]  départ : √(v·v)
    = √(16 + 1 + 4 + □)   (trous : √(16 + 1 + 4 + 4))   ← Somme des carrés
    = 5   ← Racine
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −4/(□·□)   (trous : −4/(7·5))   ← u · v / (‖u‖‖v‖)
    = −4/35
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = −8 + 2 − 8 + □ | u · v = −4, ‖u‖ = 7, ‖v‖ = 5

Soit u = (−1 ; −1 ; −1 ; 1) et v = (−6 ; 3 ; 0 ; 2). Calcule u · v, ‖u‖, ‖v‖, puis cos θ.
  [guided]  u·v
    = 6 − 3 + 0 + □   (trous : 6 − 3 + 0 + 2)   ← Produits terme à terme
    = 5   ← La somme : un nombre
  — Norme ‖u‖  [juge value]  départ : √(u·u)
    = √(1 + □ + 1 + 1)   (trous : √(1 + 1 + 1 + 1))   ← Somme des carrés
    = 2   ← Racine
  — Norme ‖v‖  [juge value]  départ : √(v·v)
    = √(36 + 9 + 0 + □)   (trous : √(36 + 9 + 0 + 4))   ← Somme des carrés
    = 7   ← Racine
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = 5/(□·□)   (trous : 5/(2·7))   ← u · v / (‖u‖‖v‖)
    = 5/14
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = 6 − 3 + 0 + □ | u · v = 5, ‖u‖ = 2, ‖v‖ = 7

Soit u = (0 ; 3 ; 2 ; −6) et v = (0 ; −3 ; 6 ; 2). Calcule u · v, ‖u‖, ‖v‖, puis cos θ.
  [guided]  u·v
    = 0 − 9 + 12 − □   (trous : 0 − 9 + 12 − 12)   ← Produits terme à terme
    = −9   ← La somme : un nombre
  — Norme ‖u‖  [juge value]  départ : √(u·u)
    = √(0 + □ + 4 + 36)   (trous : √(0 + 9 + 4 + 36))   ← Somme des carrés
    = 7   ← Racine
  — Norme ‖v‖  [juge value]  départ : √(v·v)
    = √(0 + 9 + 36 + □)   (trous : √(0 + 9 + 36 + 4))   ← Somme des carrés
    = 7   ← Racine
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −9/(□·□)   (trous : −9/(7·7))   ← u · v / (‖u‖‖v‖)
    = −9/49
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = 0 − 9 + 12 − □ | u · v = −9, ‖u‖ = 7, ‖v‖ = 7

```

### Niveau 2

```
Soit u = (2 ; 1 ; 2) et v = (6 ; −6 ; −7). Calcule la distance de u à v.
  [guided]  u − v
    ? Quelle formule donne la distance de u à v ? ✔ dist(u, v) = ‖u − v‖ / · dist(u, v) = u · v / · dist(u, v) = ‖u‖ − ‖v‖
    = (-4 ; 7 ; 9)   (cases à remplir : (1,1) (3,1))   ← Composante par composante
  — Distance : dist(u, v) = ‖u − v‖  [juge value]  départ : √((u − v)·(u − v))
    = √(□ + 49 + □)   (trous : √(16 + 49 + 81))   ← Norme de u − v
    = √146
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = 12 − 6 − □ | u · v = −8, ‖u‖ = 3, ‖v‖ = 11

Soit u = (−4 ; −8 ; −1) et v = (−4 ; −3 ; 0). Calcule la distance de u à v.
  [guided]  u − v
    ? Quelle formule donne la distance de u à v ? ✔ dist(u, v) = ‖u − v‖ / · dist(u, v) = u · v / · dist(u, v) = ‖u‖ − ‖v‖
    = (0 ; -5 ; -1)   (cases à remplir : (1,1) (3,1))   ← Composante par composante
  — Distance : dist(u, v) = ‖u − v‖  [juge value]  départ : √((u − v)·(u − v))
    = √(□ + 25 + □)   (trous : √(0 + 25 + 1))   ← Norme de u − v
    = √26
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = 16 + 24 + □ | u · v = 40, ‖u‖ = 9, ‖v‖ = 5

Soit u = (−7 ; 6 ; 6) et v = (2 ; 2 ; 1). Calcule cos θ, où θ est l'angle entre u et v.
  [guided]  u·v
    ? Quelle formule donne l'angle θ entre u et v ? · cos θ = ‖u‖‖v‖ / (u · v) / · cos θ = u · v / ✔ cos θ = u · v / (‖u‖‖v‖)
    = −□ + 12 + □   (trous : −14 + 12 + 6)   ← Produits terme à terme
    = 4   ← La somme : un nombre
  — Norme ‖u‖  [juge value]  départ : √(u·u)
    = √(□ + □ + 36)   (trous : √(49 + 36 + 36))   ← Somme des carrés
    = 11   ← Racine
  — Norme ‖v‖  [juge value]  départ : √(v·v)
    = √(□ + 4 + □)   (trous : √(4 + 4 + 1))   ← Somme des carrés
    = 3   ← Racine
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = □/(□·□)   (trous : 4/(11·3))   ← u · v / (‖u‖‖v‖)
    = 4/33
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = −14 + 12 + □ | u · v = 4, ‖u‖ = 11, ‖v‖ = 3

```

### Niveau 3

```
Soit u = (4 ; −2 ; −2 ; 1) et v = (−1 ; 5 ; 3 ; −1), avec ‖v‖ = 6. Calcule ‖u‖, le vecteur unitaire u/‖u‖, puis cos θ, où θ est l'angle entre u et v.
  [tap, suivre l'erreur, menu menu]  √(u·u)
    = √(16 + 4 + 4 + 1)   ← Somme des carrés
    = 5   ← Racine
  — Vecteur unitaire de même direction que u  [juge mat]  départ : u/‖u‖
    = (1/5)·(4 ; -2 ; -2 ; 1)   ← Diviser par la norme
    = (4/5 ; -2/5 ; -2/5 ; 1/5)
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = −21   ← −4 − 10 − 6 − 1 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −21/(5·6)   ← u · v / (‖u‖‖v‖)
    = −7/10
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = −4 − 10 − 6 − □ | u · v = −21, ‖u‖ = 5, ‖v‖ = 6

Soit u = (−5 ; 1 ; 3 ; −1) et v = (−1 ; 2 ; −4 ; −2), avec ‖v‖ = 5. Calcule ‖u‖, le vecteur unitaire u/‖u‖, puis cos θ, où θ est l'angle entre u et v.
  [tap, suivre l'erreur, menu menu]  √(u·u)
    = √(25 + 1 + 9 + 1)   ← Somme des carrés
    = 6   ← Racine
  — Vecteur unitaire de même direction que u  [juge mat]  départ : u/‖u‖
    = (1/6)·(-5 ; 1 ; 3 ; -1)   ← Diviser par la norme
    = (-5/6 ; 1/6 ; 1/2 ; -1/6)
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = −3   ← 5 + 2 − 12 + 2 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −3/(6·5)   ← u · v / (‖u‖‖v‖)
    = −1/10
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = 5 + 2 − 12 + □ | u · v = −3, ‖u‖ = 6, ‖v‖ = 5

Soit u = (3 ; 0 ; −6 ; 2) et v = (−1 ; 5 ; −1 ; −3), avec ‖v‖ = 6. Calcule ‖u‖, le vecteur unitaire u/‖u‖, puis cos θ, où θ est l'angle entre u et v.
  [tap, suivre l'erreur, menu menu]  √(u·u)
    = √(9 + 0 + 36 + 4)   ← Somme des carrés
    = 7   ← Racine
  — Vecteur unitaire de même direction que u  [juge mat]  départ : u/‖u‖
    = (1/7)·(3 ; 0 ; -6 ; 2)   ← Diviser par la norme
    = (3/7 ; 0 ; -6/7 ; 2/7)
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = −3   ← −3 + 0 + 6 − 6 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −3/(7·6)   ← u · v / (‖u‖‖v‖)
    = −1/14
  aides : Multiplie terme à terme, puis additionne : u · v est un nombre. ‖u‖ = √(u · u). | u · v = −3 + 0 + 6 − □ | u · v = −3, ‖u‖ = 7, ‖v‖ = 6

```

### Niveau 4

```
Soit u = (2 ; a ; −2 ; −1) et v = (5 ; 1 ; 3 ; 1). Pour quelle valeur de a les vecteurs u et v sont-ils orthogonaux ? Calcule ensuite dist(u, v) pour cette valeur.
  [free, suivre l'erreur]  u·v
    = 10 + a − 6 − 1   ← Produits terme à terme
  — u ⊥ v ⇔ u · v = 0  [juge solset]  départ : a + 3 = 0
    = a = −3   ← Résoudre
  — Avec a = −3 : dist(u, v) = ‖u − v‖ (u ⊥ v : Pythagore)  [juge value]  départ : √((u − v)·(u − v))
    = √(18 + 36)   ← ‖u − v‖² = ‖u‖² + ‖v‖² car u ⊥ v
    = 3√6
  aides : u ⊥ v ⇔ u · v = 0 : écris u · v en fonction de a. | u · v = a + 3 | a = −3
  pièges : l_dot_no_sum

Soit u = (2 ; a ; 0 ; 1) et v = (−5 ; 2 ; −2 ; 4). Pour quelle valeur de a les vecteurs u et v sont-ils orthogonaux ? Calcule ensuite dist(u, v) pour cette valeur.
  [free, suivre l'erreur]  u·v
    = −10 + 2a + 0 + 4   ← Produits terme à terme
  — u ⊥ v ⇔ u · v = 0  [juge solset]  départ : 2a − 6 = 0
    = a = 3   ← Résoudre
  — Avec a = 3 : dist(u, v) = ‖u − v‖ (u ⊥ v : Pythagore)  [juge value]  départ : √((u − v)·(u − v))
    = √(14 + 49)   ← ‖u − v‖² = ‖u‖² + ‖v‖² car u ⊥ v
    = 3√7
  aides : u ⊥ v ⇔ u · v = 0 : écris u · v en fonction de a. | u · v = 2a − 6 | a = 3
  pièges : l_dot_no_sum

Soit u = (a ; 1 ; 1 ; −1) et v = (−1 ; 1 ; −1 ; 1). Pour quelle valeur de a les vecteurs u et v sont-ils orthogonaux ? Calcule ensuite dist(u, v) pour cette valeur.
  [free, suivre l'erreur]  u·v
    = −a + 1 − 1 − 1   ← Produits terme à terme
  — u ⊥ v ⇔ u · v = 0  [juge solset]  départ : −a − 1 = 0
    = a = −1   ← Résoudre
  — Avec a = −1 : dist(u, v) = ‖u − v‖ (u ⊥ v : Pythagore)  [juge value]  départ : √((u − v)·(u − v))
    = √(4 + 4)   ← ‖u − v‖² = ‖u‖² + ‖v‖² car u ⊥ v
    = 2√2
  aides : u ⊥ v ⇔ u · v = 0 : écris u · v en fonction de a. | u · v = −a − 1 | a = −1
  pièges : l_dot_no_sum

```

### Niveau 5

```
Soit u = (2 ; 4 ; 1 ; 2) et v = (2 ; 1 ; 4 ; 2). Calcule dist(u, v), puis cos θ, où θ est l'angle entre u et v.
  [free, sans aide]  u − v
    = (0 ; 3 ; -3 ; 0)   ← Composante par composante
  — Distance : dist(u, v) = ‖u − v‖  [juge value]  départ : √((u − v)·(u − v))
    = √(0 + 9 + 9 + 0)   ← Norme de u − v
    = 3√2
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = 16   ← 4 + 4 + 4 + 4 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = 16/(5·5)   ← u · v / (‖u‖‖v‖)
    = 16/25

Soit u = (−1 ; 1 ; −1 ; −1) et v = (−1 ; −1 ; 1 ; 1). Calcule dist(u, v), puis cos θ, où θ est l'angle entre u et v.
  [free, sans aide]  u − v
    = (0 ; 2 ; -2 ; -2)   ← Composante par composante
  — Distance : dist(u, v) = ‖u − v‖  [juge value]  départ : √((u − v)·(u − v))
    = √(0 + 4 + 4 + 4)   ← Norme de u − v
    = 2√3
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = −2   ← 1 − 1 − 1 − 1 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −2/(2·2)   ← u · v / (‖u‖‖v‖)
    = −1/2

Soit u = (0 ; 2 ; −2 ; −1) et v = (6 ; 0 ; 3 ; 2). Calcule dist(u, v), puis cos θ, où θ est l'angle entre u et v.
  [free, sans aide]  u − v
    = (-6 ; 2 ; -5 ; -3)   ← Composante par composante
  — Distance : dist(u, v) = ‖u − v‖  [juge value]  départ : √((u − v)·(u − v))
    = √(36 + 4 + 25 + 9)   ← Norme de u − v
    = √74
  — Produit scalaire u · v  [juge mat]  départ : u·v
    = −8   ← 0 + 0 − 6 − 2 : la somme, un nombre
  — Angle : cos θ  [juge value]  départ : cos(θ)
    = −8/(3·7)   ← u · v / (‖u‖‖v‖)
    = −8/21

```

### Variantes d'examen

```
Soit u = (−6 ; −2 ; 3) et v = (−9 ; 2 ; −6). Que vaut u · v ?
  · −32   · 76   · (54 ; −4 ; −18) [l_dot_no_sum]   ✔ 32
  [examen mcq]
  pièges : l_dot_no_sum

Vrai ou faux ?
  « Pour u, v ∈ ℝⁿ : si ‖u + v‖ = ‖u − v‖, alors u ⊥ v. » → VRAI
  [examen tf]

```

## Complément orthogonal W⊥ (`l-orth-complement`, BA1)

_W⊥ = Ker de la matrice des wᵢ en lignes._

### Niveau 1

```
Soit W = Span{(0 ; 0 ; 1 ; −1), (1 ; 3 ; 0 ; 3)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    = [[0,0,1,-1],[1,3,0,3]]   (cases à remplir : (1,4) (2,1))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[0,0,1,-1],[1,3,0,3]]
    = L1 ↔ L2 : [[1,3,0,3],[0,0,1,-1]]   (cases à remplir : (1,1) (1,3))   ← Réduire : L₁ ↔ L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(-3 ; 1 ; 0 ; 0), (-3 ; 0 ; 1 ; 1)}   (cases à remplir : (3,1) (4,1))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,3,0,3],[0,0,1,-1]] ; les variables sans pivot sont libres. | W⊥ = (-3 ; 1 ; 0 ; 0), (-3 ; 0 ; 1 ; 1)

Soit W = Span{(0 ; 0 ; −1 ; 2), (1 ; 1 ; 2 ; −3)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    = [[0,0,-1,2],[1,1,2,-3]]   (cases à remplir : (2,2) (2,4))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[0,0,-1,2],[1,1,2,-3]]
    = L1 ↔ L2 : [[1,1,2,-3],[0,0,-1,2]]   (cases à remplir : (1,2) (1,3))   ← Réduire : L₁ ↔ L₂
    = L2 ← -L2 : [[1,1,2,-3],[0,0,1,-2]]   (cases à remplir : (2,1) (2,4))   ← Pivot à 1
    = L1 ← L1 - 2L2 : [[1,1,0,1],[0,0,1,-2]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ − 2L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(-1 ; 1 ; 0 ; 0), (-1 ; 0 ; 2 ; 1)}   (cases à remplir : (4,1) (2,2))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,1,0,1],[0,0,1,-2]] ; les variables sans pivot sont libres. | W⊥ = (-1 ; 1 ; 0 ; 0), (-1 ; 0 ; 2 ; 1)

Soit W = Span{(1 ; −2 ; 1 ; 5), (0 ; 0 ; 1 ; 2)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    = [[1,-2,1,5],[0,0,1,2]]   (cases à remplir : (1,1) (2,1))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[1,-2,1,5],[0,0,1,2]]
    = L1 ← L1 - L2 : [[1,-2,0,3],[0,0,1,2]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ − L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(2 ; 1 ; 0 ; 0), (-3 ; 0 ; -2 ; 1)}   (cases à remplir : (2,1) (1,2))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,-2,0,3],[0,0,1,2]] ; les variables sans pivot sont libres. | W⊥ = (2 ; 1 ; 0 ; 0), (-3 ; 0 ; -2 ; 1)

```

### Niveau 2

```
Soit W = Span{(0 ; 1 ; 0 ; −2), (1 ; 0 ; 1 ; −2)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    ? Comment poser la matrice M dont W⊥ est le noyau ? ✔ w₁ et w₂ en lignes / · w₁ et w₂ en colonnes
    = [[0,1,0,-2],[1,0,1,-2]]   (cases à remplir : (1,3) (2,3))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[0,1,0,-2],[1,0,1,-2]]
    = L1 ↔ L2 : [[1,0,1,-2],[0,1,0,-2]]   (cases à remplir : (1,2) (1,3))   ← Réduire : L₁ ↔ L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(-1 ; 0 ; 1 ; 0), (2 ; 2 ; 0 ; 1)}   (cases à remplir : (2,2) (4,2))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,0,1,-2],[0,1,0,-2]] ; les variables sans pivot sont libres. | W⊥ = (-1 ; 0 ; 1 ; 0), (2 ; 2 ; 0 ; 1)
  pièges : l_matrix_rows_cols

Soit W = Span{(0 ; −1 ; −2 ; −1), (1 ; 2 ; 5 ; 1)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    ? Comment poser la matrice M dont W⊥ est le noyau ? ✔ w₁ et w₂ en lignes / · w₁ et w₂ en colonnes
    = [[0,-1,-2,-1],[1,2,5,1]]   (cases à remplir : (1,1) (1,2))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[0,-1,-2,-1],[1,2,5,1]]
    = L1 ↔ L2 : [[1,2,5,1],[0,-1,-2,-1]]   (cases à remplir : (1,1) (1,4))   ← Réduire : L₁ ↔ L₂
    = L2 ← -L2 : [[1,2,5,1],[0,1,2,1]]   (cases à remplir : (2,2) (2,4))   ← Pivot à 1
    = L1 ← L1 - 2L2 : [[1,0,1,-1],[0,1,2,1]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ − 2L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(-1 ; -2 ; 1 ; 0), (1 ; -1 ; 0 ; 1)}   (cases à remplir : (2,2) (4,2))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,0,1,-1],[0,1,2,1]] ; les variables sans pivot sont libres. | W⊥ = (-1 ; -2 ; 1 ; 0), (1 ; -1 ; 0 ; 1)
  pièges : l_matrix_rows_cols

Soit W = Span{(1 ; −1 ; −4 ; 1), (1 ; 0 ; −2 ; 1)} ⊂ ℝ⁴. Pose la matrice M, réduis-la, puis donne une base de W⊥.
  [guided]  M
    ? Comment poser la matrice M dont W⊥ est le noyau ? · w₁ et w₂ en colonnes / ✔ w₁ et w₂ en lignes
    = [[1,-1,-4,1],[1,0,-2,1]]   (cases à remplir : (1,1) (1,3))   ← w₁ et w₂ en lignes
  — Réduis M (W⊥ = Ker M).  [juge rowops]  départ : [[1,-1,-4,1],[1,0,-2,1]]
    = L2 ← L2 - L1 : [[1,-1,-4,1],[0,1,2,0]]   (cases à remplir : (2,2) (2,4))   ← Réduire : L₂ ← L₂ − L₁
    = L1 ← L1 + L2 : [[1,0,-2,1],[0,1,2,0]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ + L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = Span{(2 ; -2 ; 1 ; 0), (-1 ; 0 ; 0 ; 1)}   (cases à remplir : (2,2) (3,2))   ← Une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,0,-2,1],[0,1,2,0]] ; les variables sans pivot sont libres. | W⊥ = (2 ; -2 ; 1 ; 0), (-1 ; 0 ; 0 ; 1)
  pièges : l_matrix_rows_cols

```

### Niveau 3

```
Soit W = Span{(1 ; 1 ; −1 ; −2), (0 ; −1 ; 1 ; 1)} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = [[1,1,-1,-2],[0,-1,1,1]] (choisis chaque opération), puis paramètre son noyau.
  [tap, suivre l'erreur, menu rowops]  [[1,1,-1,-2],[0,-1,1,1]]
    = L2 ← -L2 : [[1,1,-1,-2],[0,1,-1,-1]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[1,0,0,-1],[0,1,-1,-1]]   ← Réduire : L₁ ← L₁ − L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = x = s(0 ; 1 ; 1 ; 0) + t(1 ; 1 ; 0 ; 1)   ← Paramétrer : une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,0,0,-1],[0,1,-1,-1]] ; les variables sans pivot sont libres. | W⊥ = (0 ; 1 ; 1 ; 0), (1 ; 1 ; 0 ; 1)
  pièges : l_rowop_sign, l_rowop_wrong_row

Soit W = Span{(0 ; 1 ; 2 ; −2), (1 ; −1 ; −3 ; 2)} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = [[0,1,2,-2],[1,-1,-3,2]] (choisis chaque opération), puis paramètre son noyau.
  [tap, suivre l'erreur, menu rowops]  [[0,1,2,-2],[1,-1,-3,2]]
    = L1 ↔ L2 : [[1,-1,-3,2],[0,1,2,-2]]   ← Réduire : L₁ ↔ L₂
    = L1 ← L1 + L2 : [[1,0,-1,0],[0,1,2,-2]]   ← Réduire : L₁ ← L₁ + L₂
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = x = s(1 ; -2 ; 1 ; 0) + t(0 ; 2 ; 0 ; 1)   ← Paramétrer : une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,0,-1,0],[0,1,2,-2]] ; les variables sans pivot sont libres. | W⊥ = (1 ; -2 ; 1 ; 0), (0 ; 2 ; 0 ; 1)

Soit W = Span{(−1 ; −2 ; −1 ; 1), (1 ; 2 ; 2 ; 1)} ⊂ ℝ⁴. Donne une base de W⊥ : réduis M = [[-1,-2,-1,1],[1,2,2,1]] (choisis chaque opération), puis paramètre son noyau.
  [tap, suivre l'erreur, menu rowops]  [[-1,-2,-1,1],[1,2,2,1]]
    = L2 ← L2 + L1 : [[-1,-2,-1,1],[0,0,1,2]]   ← Réduire : L₂ ← L₂ + L₁
    = L1 ← L1 + L2 : [[-1,-2,0,3],[0,0,1,2]]   ← Réduire : L₁ ← L₁ + L₂
    = L1 ← -L1 : [[1,2,0,-3],[0,0,1,2]]   ← Pivot à 1
  — Une base de W⊥ (= Ker M).  [juge span]  départ : W⊥
    = x = s(-2 ; 1 ; 0 ; 0) + t(3 ; 0 ; -2 ; 1)   ← Paramétrer : une variable libre par vecteur
  aides : x ∈ W⊥ ⇔ x · w₁ = 0 et x · w₂ = 0 : c'est le système homogène de matrice M = [w₁ᵀ ; w₂ᵀ] (vecteurs en lignes). | Forme réduite : [[1,2,0,-3],[0,0,1,2]] ; les variables sans pivot sont libres. | W⊥ = (-2 ; 1 ; 0 ; 0), (3 ; 0 ; -2 ; 1)
  pièges : l_rowop_sign, l_rowop_wrong_row

```

### Niveau 4

```
Soit A = [[0,-1],[1,1],[2,3],[-2,-3]]. Donne une base de (Col A)⊥.
  [free, suivre l'erreur]  A^T
    = [[0,1,2,-2],[-1,1,3,-3]]   ← Aᵀ : les colonnes de A en lignes
  — Réduis Aᵀ.  [juge rowops]  départ : [[0,1,2,-2],[-1,1,3,-3]]
    = L1 ↔ L2 : [[-1,1,3,-3],[0,1,2,-2]]   ← Réduire : L₁ ↔ L₂
    = L1 ← L1 - L2 : [[-1,0,1,-1],[0,1,2,-2]]   ← Réduire : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0,-1,1],[0,1,2,-2]]   ← Pivot à 1
  — Une base de (Col A)⊥ = Ker Aᵀ.  [juge span]  départ : W⊥
    = Span{(1 ; -2 ; 1 ; 0), (-1 ; 2 ; 0 ; 1)}   ← Une variable libre par vecteur
  aides : (Col A)⊥ = Ker Aᵀ : les colonnes de A deviennent les lignes de Aᵀ. | Aᵀ = [[0,1,2,-2],[-1,1,3,-3]] | (Col A)⊥ = (1 ; -2 ; 1 ; 0), (-1 ; 2 ; 0 ; 1)

Soit A = [[1,0],[2,1],[4,3],[-3,-2]]. Donne une base de (Col A)⊥.
  [free, suivre l'erreur]  A^T
    = [[1,2,4,-3],[0,1,3,-2]]   ← Aᵀ : les colonnes de A en lignes
  — Réduis Aᵀ.  [juge rowops]  départ : [[1,2,4,-3],[0,1,3,-2]]
    = L1 ← L1 - 2L2 : [[1,0,-2,1],[0,1,3,-2]]   ← Réduire : L₁ ← L₁ − 2L₂
  — Une base de (Col A)⊥ = Ker Aᵀ.  [juge span]  départ : W⊥
    = Span{(2 ; -3 ; 1 ; 0), (-1 ; 2 ; 0 ; 1)}   ← Une variable libre par vecteur
  aides : (Col A)⊥ = Ker Aᵀ : les colonnes de A deviennent les lignes de Aᵀ. | Aᵀ = [[1,2,4,-3],[0,1,3,-2]] | (Col A)⊥ = (2 ; -3 ; 1 ; 0), (-1 ; 2 ; 0 ; 1)

Soit W = {x ∈ ℝ⁴ : x₁ − 2x₂ − x₃ − 3x₄ = 0}. Donne une base de W⊥.
  [free, suivre l'erreur]  W⊥
    = Span{(1 ; -2 ; -1 ; -3)}   ← Le vecteur des coefficients de l'équation
  aides : L'équation dit a · x = 0 avec a le vecteur des coefficients : W est l'ensemble des vecteurs orthogonaux à a. | W est de dimension 3, donc W⊥ est de dimension 1. | W⊥ = (1 ; -2 ; -1 ; -3)

```

### Niveau 5

```
Soit W = {x ∈ ℝ⁴ : 2x₁ + x₂ − x₃ + x₄ = 0}. Donne une base de W⊥.
  [free, sans aide]  W⊥
    = Span{(2 ; 1 ; -1 ; 1)}   ← Le vecteur des coefficients de l'équation

Soit A = [[1,2],[1,1],[-2,-3],[1,0]]. Donne une base de (Col A)⊥.
  [free, sans aide]  A^T
    = [[1,1,-2,1],[2,1,-3,0]]   ← Aᵀ : les colonnes de A en lignes
  — Réduis Aᵀ.  [juge rowops]  départ : [[1,1,-2,1],[2,1,-3,0]]
    = L2 ← L2 - 2L1 : [[1,1,-2,1],[0,-1,1,-2]]   ← Réduire : L₂ ← L₂ − 2L₁
    = L2 ← -L2 : [[1,1,-2,1],[0,1,-1,2]]   ← Pivot à 1
    = L1 ← L1 - L2 : [[1,0,-1,-1],[0,1,-1,2]]   ← Réduire : L₁ ← L₁ − L₂
  — Une base de (Col A)⊥ = Ker Aᵀ.  [juge span]  départ : W⊥
    = Span{(1 ; 1 ; 1 ; 0), (1 ; -2 ; 0 ; 1)}   ← Une variable libre par vecteur

Soit A = [[-1,-1],[1,2],[-3,-3],[2,2]]. Donne une base de (Col A)⊥.
  [free, sans aide]  A^T
    = [[-1,1,-3,2],[-1,2,-3,2]]   ← Aᵀ : les colonnes de A en lignes
  — Réduis Aᵀ.  [juge rowops]  départ : [[-1,1,-3,2],[-1,2,-3,2]]
    = L2 ← L2 - L1 : [[-1,1,-3,2],[0,1,0,0]]   ← Réduire : L₂ ← L₂ − L₁
    = L1 ← L1 - L2 : [[-1,0,-3,2],[0,1,0,0]]   ← Réduire : L₁ ← L₁ − L₂
    = L1 ← -L1 : [[1,0,3,-2],[0,1,0,0]]   ← Pivot à 1
  — Une base de (Col A)⊥ = Ker Aᵀ.  [juge span]  départ : W⊥
    = Span{(-3 ; 0 ; 1 ; 0), (2 ; 0 ; 0 ; 1)}   ← Une variable libre par vecteur

```

### Variantes d'examen

```
Soit W = Span{(1 ; −2 ; 0 ; −3), (−1 ; 2 ; 1 ; 4)} ⊂ ℝ⁴. Laquelle de ces familles est une base de W⊥ ?
  · (1 ; −2 ; 0 ; −3), (−1 ; 2 ; 1 ; 4)   · (−2 ; 1 ; 0 ; 0), (−3 ; 0 ; 1 ; 1) [l_ker_sign]   · (2 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; 0), (3 ; 0 ; 0 ; 1) [l_perp_one_vector]   ✔ (2 ; 1 ; 0 ; 0), (3 ; 0 ; −1 ; 1)
  [examen mcq]
  pièges : l_ker_sign, l_perp_one_vector

Vrai ou faux ?
  « Pour toute matrice carrée A, (Col A)⊥ = Ker A. » → FAUX
    contre-exemple (matOne) : A = [[1,1],[0,0]]
  [examen tf]

```

## Projection orthogonale sur un sous-espace, distance (`l-orth-proj`, BA1)

_ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ, base orthogonale._

### Niveau 1

```
Soit W = Span{u₁, u₂}, u₁ = (−2 ; 0 ; 0 ; 1), u₂ = (−1 ; 0 ; −1 ; −2) et y = (−1 ; −1 ; 1 ; 3). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  u_1·u_2
    = □ + 0 + 0 − □   (trous : 2 + 0 + 0 − 2)   ← Produits terme à terme
    = 0   ← Base orthogonale : la formule s'applique
  — Coefficient de u₁ : y · u₁ / u₁ · u₁  [juge value]  départ : y·u_1/(u_1·u_1)
    = (□ + 0 + 0 + 3)/(4 + 0 + 0 + □)   (trous : (2 + 0 + 0 + 3)/(4 + 0 + 0 + 1))   ← Produits scalaires
    = 1
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (1 + □ − 1 − 6)/(1 + 0 + □ + 4)   (trous : (1 + 0 − 1 − 6)/(1 + 0 + 1 + 4))   ← Produits scalaires
    = −1
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = (-2 ; 0 ; 0 ; 1) - (-1 ; 0 ; -1 ; -2)   ← Combinaison des vecteurs de la base
    = (-1 ; 0 ; 1 ; 3)   (cases à remplir : (3,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (-1 ; -1 ; 1 ; 3) - (-1 ; 0 ; 1 ; 3)   ← z = y − ŷ
    = (0 ; -1 ; 0 ; 0)   (cases à remplir : (2,1) (3,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 1 + 0 + 0)   (trous : √(0 + 1 + 0 + 0))   ← Norme
    = 1
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = u₁ − u₂ = (−1 ; 0 ; 1 ; 3)

Soit W = Span{u₁, u₂}, u₁ = (1 ; −1 ; 0 ; 0), u₂ = (−1 ; −1 ; −2 ; 0) et y = (−4 ; −2 ; −3 ; 0). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  u_1·u_2
    = −□ + 1 + 0 + □   (trous : −1 + 1 + 0 + 0)   ← Produits terme à terme
    = 0   ← Base orthogonale : la formule s'applique
  — Coefficient de u₁ : y · u₁ / u₁ · u₁  [juge value]  départ : y·u_1/(u_1·u_1)
    = (−□ + 2 + 0 + 0)/(1 + 1 + 0 + □)   (trous : (−4 + 2 + 0 + 0)/(1 + 1 + 0 + 0))   ← Produits scalaires
    = −1
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (4 + □ + 6 + 0)/(1 + 1 + □ + 0)   (trous : (4 + 2 + 6 + 0)/(1 + 1 + 4 + 0))   ← Produits scalaires
    = 2
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = -(1 ; -1 ; 0 ; 0) + 2·(-1 ; -1 ; -2 ; 0)   ← Combinaison des vecteurs de la base
    = (-3 ; -1 ; -4 ; 0)   (cases à remplir : (1,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (-4 ; -2 ; -3 ; 0) - (-3 ; -1 ; -4 ; 0)   ← z = y − ŷ
    = (-1 ; -1 ; 1 ; 0)   (cases à remplir : (2,1) (4,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 1 + 1 + 0)   (trous : √(1 + 1 + 1 + 0))   ← Norme
    = √3
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = −u₁ + 2·u₂ = (−3 ; −1 ; −4 ; 0)

Soit W = Span{u₁, u₂}, u₁ = (1 ; 0 ; 0 ; −1), u₂ = (−1 ; −1 ; −1 ; −1) et y = (0 ; 0 ; −2 ; −2). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  u_1·u_2
    = −□ + 0 + 0 + □   (trous : −1 + 0 + 0 + 1)   ← Produits terme à terme
    = 0   ← Base orthogonale : la formule s'applique
  — Coefficient de u₁ : y · u₁ / u₁ · u₁  [juge value]  départ : y·u_1/(u_1·u_1)
    = (□ + 0 + 0 + 2)/(1 + 0 + 0 + □)   (trous : (0 + 0 + 0 + 2)/(1 + 0 + 0 + 1))   ← Produits scalaires
    = 1
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (0 + □ + 2 + 2)/(1 + 1 + □ + 1)   (trous : (0 + 0 + 2 + 2)/(1 + 1 + 1 + 1))   ← Produits scalaires
    = 1
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = (1 ; 0 ; 0 ; -1) + (-1 ; -1 ; -1 ; -1)   ← Combinaison des vecteurs de la base
    = (0 ; -1 ; -1 ; -2)   (cases à remplir : (3,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (0 ; 0 ; -2 ; -2) - (0 ; -1 ; -1 ; -2)   ← z = y − ŷ
    = (0 ; 1 ; -1 ; 0)   (cases à remplir : (3,1) (4,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 1 + 1 + 0)   (trous : √(0 + 1 + 1 + 0))   ← Norme
    = √2
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = u₁ + u₂ = (0 ; −1 ; −1 ; −2)

```

### Niveau 2

```
Soit W = Span{x₁, x₂}, x₁ = (0 ; −1 ; 1 ; 2), x₂ = (1 ; −1 ; −1 ; 3) et y = (0 ; 1 ; −1 ; 4). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  v_2
    ? Peut-on appliquer la formule ŷ = Σ (y · xᵢ / xᵢ · xᵢ) xᵢ ? · Oui, avec x₁ et x₂ tels quels / ✔ Non : x₁ · x₂ ≠ 0, il faut d'abord Gram-Schmidt
    = (1 ; -1 ; -1 ; 3) - (0 ; -1 ; 1 ; 2)   ← x₂ · v₁ / v₁ · v₁ = 6/6
    = (1 ; 0 ; -2 ; 1)   (cases à remplir : (1,1) (2,1))
  — Coefficient de v₁ : y · v₁ / v₁ · v₁  [juge value]  départ : y·v_1/(v_1·v_1)
    = (□ − □ − 1 + 8)/(0 + 1 + 1 + □)   (trous : (0 − 1 − 1 + 8)/(0 + 1 + 1 + 4))   ← Produits scalaires
    = 1
  — Coefficient de v₂ : y · v₂ / v₂ · v₂  [juge value]  départ : y·v_2/(v_2·v_2)
    = (□ + 0 + 2 + 4)/(1 + 0 + 4 + □)   (trous : (0 + 0 + 2 + 4)/(1 + 0 + 4 + 1))   ← Produits scalaires
    = 1
  — Projection ŷ = c₁v₁ + c₂v₂  [juge mat]  départ : ŷ
    = (0 ; -1 ; 1 ; 2) + (1 ; 0 ; -2 ; 1)   ← Combinaison des vecteurs de la base
    = (1 ; -1 ; -1 ; 3)   (cases à remplir : (1,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (0 ; 1 ; -1 ; 4) - (1 ; -1 ; -1 ; 3)   ← z = y − ŷ
    = (-1 ; 2 ; 0 ; 1)   (cases à remplir : (1,1) (4,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 4 + 0 + □)   (trous : √(1 + 4 + 0 + 1))   ← Norme
    = √6
  aides : La formule de projection ne marche qu'avec une base orthogonale : orthogonalise d'abord (Gram-Schmidt), puis projette sur v₁, v₂. | ŷ = □·v₁ + □·v₂ | ŷ = v₁ + v₂ = (1 ; −1 ; −1 ; 3)
  pièges : l_gs_sign, g4_proj_no_square, l_proj_nonorth

Soit W = Span{x₁, x₂}, x₁ = (0 ; 0 ; 1 ; −1), x₂ = (1 ; −1 ; −3 ; 1) et y = (1 ; −1 ; −1 ; −5). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  v_2
    ? Peut-on appliquer la formule ŷ = Σ (y · xᵢ / xᵢ · xᵢ) xᵢ ? ✔ Non : x₁ · x₂ ≠ 0, il faut d'abord Gram-Schmidt / · Oui, avec x₁ et x₂ tels quels
    = (1 ; -1 ; -3 ; 1) + 2·(0 ; 0 ; 1 ; -1)   ← x₂ · v₁ / v₁ · v₁ = −4/2
    = (1 ; -1 ; -1 ; -1)   (cases à remplir : (1,1) (4,1))
  — Coefficient de v₁ : y · v₁ / v₁ · v₁  [juge value]  départ : y·v_1/(v_1·v_1)
    = (□ + □ − 1 + 5)/(0 + 0 + 1 + □)   (trous : (0 + 0 − 1 + 5)/(0 + 0 + 1 + 1))   ← Produits scalaires
    = 2
  — Coefficient de v₂ : y · v₂ / v₂ · v₂  [juge value]  départ : y·v_2/(v_2·v_2)
    = (□ + 1 + 1 + 5)/(1 + 1 + 1 + □)   (trous : (1 + 1 + 1 + 5)/(1 + 1 + 1 + 1))   ← Produits scalaires
    = 2
  — Projection ŷ = c₁v₁ + c₂v₂  [juge mat]  départ : ŷ
    = 2·(0 ; 0 ; 1 ; -1) + 2·(1 ; -1 ; -1 ; -1)   ← Combinaison des vecteurs de la base
    = (2 ; -2 ; 0 ; -4)   (cases à remplir : (2,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (1 ; -1 ; -1 ; -5) - (2 ; -2 ; 0 ; -4)   ← z = y − ŷ
    = (-1 ; 1 ; -1 ; -1)   (cases à remplir : (1,1) (2,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 1 + 1 + □)   (trous : √(1 + 1 + 1 + 1))   ← Norme
    = 2
  aides : La formule de projection ne marche qu'avec une base orthogonale : orthogonalise d'abord (Gram-Schmidt), puis projette sur v₁, v₂. | ŷ = □·v₁ + □·v₂ | ŷ = 2·v₁ + 2·v₂ = (2 ; −2 ; 0 ; −4)
  pièges : l_gs_sign, g4_proj_no_square, l_proj_nonorth

Soit W = Span{x₁, x₂}, x₁ = (2 ; 0 ; 1 ; 0), x₂ = (3 ; 0 ; 4 ; 0) et y = (5 ; 1 ; 0 ; 1). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [guided]  v_2
    ? Peut-on appliquer la formule ŷ = Σ (y · xᵢ / xᵢ · xᵢ) xᵢ ? · Oui, avec x₁ et x₂ tels quels / ✔ Non : x₁ · x₂ ≠ 0, il faut d'abord Gram-Schmidt
    = (3 ; 0 ; 4 ; 0) - 2·(2 ; 0 ; 1 ; 0)   ← x₂ · v₁ / v₁ · v₁ = 10/5
    = (-1 ; 0 ; 2 ; 0)   (cases à remplir : (2,1) (4,1))
  — Coefficient de v₁ : y · v₁ / v₁ · v₁  [juge value]  départ : y·v_1/(v_1·v_1)
    = (□ + □ + 0 + 0)/(4 + 0 + 1 + □)   (trous : (10 + 0 + 0 + 0)/(4 + 0 + 1 + 0))   ← Produits scalaires
    = 2
  — Coefficient de v₂ : y · v₂ / v₂ · v₂  [juge value]  départ : y·v_2/(v_2·v_2)
    = (−□ + 0 + 0 + 0)/(1 + 0 + 4 + □)   (trous : (−5 + 0 + 0 + 0)/(1 + 0 + 4 + 0))   ← Produits scalaires
    = −1
  — Projection ŷ = c₁v₁ + c₂v₂  [juge mat]  départ : ŷ
    = 2·(2 ; 0 ; 1 ; 0) - (-1 ; 0 ; 2 ; 0)   ← Combinaison des vecteurs de la base
    = (5 ; 0 ; 0 ; 0)   (cases à remplir : (1,1) (4,1))
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (5 ; 1 ; 0 ; 1) - (5 ; 0 ; 0 ; 0)   ← z = y − ŷ
    = (0 ; 1 ; 0 ; 1)   (cases à remplir : (1,1) (4,1))   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(□ + 1 + 0 + □)   (trous : √(0 + 1 + 0 + 1))   ← Norme
    = √2
  aides : La formule de projection ne marche qu'avec une base orthogonale : orthogonalise d'abord (Gram-Schmidt), puis projette sur v₁, v₂. | ŷ = □·v₁ + □·v₂ | ŷ = 2·v₁ − v₂ = (5 ; 0 ; 0 ; 0)
  pièges : l_gs_sign, g4_proj_no_square, l_proj_nonorth

```

### Niveau 3

```
Soit W = Span{u₁, u₂}, u₁ = (−1 ; −1 ; 0 ; −2), u₂ = (0 ; 2 ; −1 ; −1) et y = (2 ; −4 ; 0 ; 4). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [tap, suivre l'erreur, menu menu]  y·u_1/(u_1·u_1)
    = (−2 + 4 + 0 − 8)/(1 + 1 + 0 + 4)   ← Produits scalaires
    = −1
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (0 − 8 + 0 − 4)/(0 + 4 + 1 + 1)   ← Produits scalaires
    = −2
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = -(-1 ; -1 ; 0 ; -2) - 2·(0 ; 2 ; -1 ; -1)   ← Combinaison des vecteurs de la base
    = (1 ; -3 ; 2 ; 4)
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (2 ; -4 ; 0 ; 4) - (1 ; -3 ; 2 ; 4)   ← z = y − ŷ
    = (1 ; -1 ; -2 ; 0)   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 4 + 0)   ← Norme
    = √6
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = −u₁ − 2·u₂ = (1 ; −3 ; 2 ; 4)
  pièges : g4_proj_no_square

Soit W = Span{u₁, u₂}, u₁ = (−1 ; 0 ; −1 ; 1), u₂ = (−1 ; −2 ; 1 ; 0) et y = (1 ; 1 ; −3 ; 1). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [tap, suivre l'erreur, menu menu]  y·u_1/(u_1·u_1)
    = (−1 + 0 + 3 + 1)/(1 + 0 + 1 + 1)   ← Produits scalaires
    = 1
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (−1 − 2 − 3 + 0)/(1 + 4 + 1 + 0)   ← Produits scalaires
    = −1
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = (-1 ; 0 ; -1 ; 1) - (-1 ; -2 ; 1 ; 0)   ← Combinaison des vecteurs de la base
    = (0 ; 2 ; -2 ; 1)
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (1 ; 1 ; -3 ; 1) - (0 ; 2 ; -2 ; 1)   ← z = y − ŷ
    = (1 ; -1 ; -1 ; 0)   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 1 + 0)   ← Norme
    = √3
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = u₁ − u₂ = (0 ; 2 ; −2 ; 1)
  pièges : g4_proj_no_square

Soit W = Span{u₁, u₂}, u₁ = (−1 ; −1 ; −1 ; −1), u₂ = (−1 ; 1 ; 1 ; −1) et y = (4 ; 0 ; 2 ; 2). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [tap, suivre l'erreur, menu menu]  y·u_1/(u_1·u_1)
    = (−4 + 0 − 2 − 2)/(1 + 1 + 1 + 1)   ← Produits scalaires
    = −2
  — Coefficient de u₂ : y · u₂ / u₂ · u₂  [juge value]  départ : y·u_2/(u_2·u_2)
    = (−4 + 0 + 2 − 2)/(1 + 1 + 1 + 1)   ← Produits scalaires
    = −1
  — Projection ŷ = c₁u₁ + c₂u₂  [juge mat]  départ : ŷ
    = -2·(-1 ; -1 ; -1 ; -1) - (-1 ; 1 ; 1 ; -1)   ← Combinaison des vecteurs de la base
    = (3 ; 1 ; 1 ; 3)
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (4 ; 0 ; 2 ; 2) - (3 ; 1 ; 1 ; 3)   ← z = y − ŷ
    = (1 ; -1 ; 1 ; -1)   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 1 + 1)   ← Norme
    = 2
  aides : La formule ne marche qu'avec une base orthogonale : ici u₁ · u₂ = 0. Puis ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ. | ŷ = □·u₁ + □·u₂ | ŷ = −2·u₁ − u₂ = (3 ; 1 ; 1 ; 3)
  pièges : g4_proj_no_square

```

### Niveau 4

```
Soit W = Span{x₁, x₂}, x₁ = (0 ; 0 ; −1 ; 2), x₂ = (1 ; −1 ; −2 ; 4) et y = (0 ; −2 ; −1 ; −3). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [free, suivre l'erreur]  v_2
    = (1 ; -1 ; -2 ; 4) - 2·(0 ; 0 ; -1 ; 2)   ← x₂ · v₁ / v₁ · v₁ = 10/5
    = (1 ; -1 ; 0 ; 0)
  — Projection ŷ = c₁v₁ + c₂v₂  [juge mat]  départ : ŷ
    = -(0 ; 0 ; -1 ; 2) + (1 ; -1 ; 0 ; 0)   ← Combinaison des vecteurs de la base
    = (1 ; -1 ; 1 ; -2)
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (0 ; -2 ; -1 ; -3) - (1 ; -1 ; 1 ; -2)   ← z = y − ŷ
    = (-1 ; -1 ; -2 ; -1)   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 4 + 1)   ← Norme
    = √7
  aides : La formule de projection ne marche qu'avec une base orthogonale : orthogonalise d'abord (Gram-Schmidt), puis projette sur v₁, v₂. | ŷ = □·v₁ + □·v₂ | ŷ = −v₁ + v₂ = (1 ; −1 ; 1 ; −2)
  pièges : l_gs_sign, g4_proj_no_square

Soit W = Span{x₁, x₂}, x₁ = (−1 ; 0 ; 2 ; −1), x₂ = (3 ; 0 ; −3 ; 3) et y = (−1 ; 1 ; 3 ; 1). Calcule la projection orthogonale ŷ de y sur W, la composante z = y − ŷ, puis la distance de y à W.
  [free, suivre l'erreur]  v_2
    = (3 ; 0 ; -3 ; 3) + 2·(-1 ; 0 ; 2 ; -1)   ← x₂ · v₁ / v₁ · v₁ = −12/6
    = (1 ; 0 ; 1 ; 1)
  — Projection ŷ = c₁v₁ + c₂v₂  [juge mat]  départ : ŷ
    = (-1 ; 0 ; 2 ; -1) + (1 ; 0 ; 1 ; 1)   ← Combinaison des vecteurs de la base
    = (0 ; 0 ; 3 ; 0)
  — Composante orthogonale z = y − ŷ (dans W⊥)  [juge mat]  départ : z
    = (-1 ; 1 ; 3 ; 1) - (0 ; 0 ; 3 ; 0)   ← z = y − ŷ
    = (-1 ; 1 ; 0 ; 1)   ← z est orthogonal à W
  — Distance de y à W : ‖z‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 0 + 1)   ← Norme
    = √3
  aides : La formule de projection ne marche qu'avec une base orthogonale : orthogonalise d'abord (Gram-Schmidt), puis projette sur v₁, v₂. | ŷ = □·v₁ + □·v₂ | ŷ = v₁ + v₂ = (0 ; 0 ; 3 ; 0)
  pièges : l_gs_sign, g4_proj_no_square

Soit W = {x ∈ ℝ⁴ : x₁ + x₂ + x₃ + 2x₄ = 0} et y = (3 ; 1 ; 1 ; 1). Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.
  [free, suivre l'erreur]  p
    = (7/7)·(1 ; 1 ; 1 ; 2)   ← (y · a / a · a) a
    = (1 ; 1 ; 1 ; 2)
  — Projection sur W : ŷ = y − proj_a y  [juge mat]  départ : ŷ
    = (3 ; 1 ; 1 ; 1) - (1 ; 1 ; 1 ; 2)   ← On retire la composante normale
    = (2 ; 0 ; 0 ; -1)
  — Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖  [juge value]  départ : √(z·z)
    = √(1 + 1 + 1 + 4)   ← Norme
    = √7
  aides : W est l'orthogonal de a = (1 ; 1 ; 1 ; 2) : projette y sur a, puis retire cette composante. | proj_a y = (□/7)·a | ŷ = (2 ; 0 ; 0 ; −1)
  pièges : g4_proj_no_square

```

### Niveau 5

```
Soit W = {x ∈ ℝ⁴ : x₁ − 2x₂ + 2x₃ = 0} et y = (3 ; −1 ; 2 ; −1). Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.
  [free, sans aide]  p
    = (9/9)·(1 ; -2 ; 2 ; 0)   ← (y · a / a · a) a
    = (1 ; -2 ; 2 ; 0)
  — Projection sur W : ŷ = y − proj_a y  [juge mat]  départ : ŷ
    = (3 ; -1 ; 2 ; -1) - (1 ; -2 ; 2 ; 0)   ← On retire la composante normale
    = (2 ; 1 ; 0 ; -1)
  — Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖  [juge value]  départ : √(z·z)
    = √(1 + 4 + 4 + 0)   ← Norme
    = 3
  pièges : g4_proj_no_square

Soit W = {x ∈ ℝ⁴ : −x₁ + x₃ − x₄ = 0} et y = (0 ; 1 ; −1 ; 2). Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.
  [free, sans aide]  p
    = (-3/3)·(-1 ; 0 ; 1 ; -1)   ← (y · a / a · a) a
    = (1 ; 0 ; -1 ; 1)
  — Projection sur W : ŷ = y − proj_a y  [juge mat]  départ : ŷ
    = (0 ; 1 ; -1 ; 2) - (1 ; 0 ; -1 ; 1)   ← On retire la composante normale
    = (-1 ; 1 ; 0 ; 1)
  — Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖  [juge value]  départ : √(z·z)
    = √(1 + 0 + 1 + 1)   ← Norme
    = √3
  pièges : g4_proj_no_square

Soit W = {x ∈ ℝ⁴ : 2x₁ + x₂ + x₃ − x₄ = 0} et y = (2 ; 3 ; 1 ; 1). Calcule la projection orthogonale ŷ de y sur W, puis la distance de y à W.
  [free, sans aide]  p
    = (7/7)·(2 ; 1 ; 1 ; -1)   ← (y · a / a · a) a
    = (2 ; 1 ; 1 ; -1)
  — Projection sur W : ŷ = y − proj_a y  [juge mat]  départ : ŷ
    = (2 ; 3 ; 1 ; 1) - (2 ; 1 ; 1 ; -1)   ← On retire la composante normale
    = (0 ; 2 ; 0 ; 2)
  — Distance de y à W : ‖y − ŷ‖ = ‖proj_a y‖  [juge value]  départ : √(z·z)
    = √(4 + 1 + 1 + 1)   ← Norme
    = √7
  pièges : g4_proj_no_square

```

### Variantes d'examen

```
Soit W = Span{(2 ; 0 ; 2 ; 1), (−2 ; 2 ; −1 ; −3)} et y = (3 ; 0 ; 3 ; −3). La projection orthogonale de y sur W est :
  · (1 ; −2 ; 0 ; −2)   · (2 ; 0 ; 2 ; 1) [l_proj_nonorth]   · (6 ; 6 ; 9 ; −3) [g4_proj_no_square]   ✔ (2 ; 2 ; 3 ; −1)
  [examen mcq]
  pièges : l_proj_nonorth, g4_proj_no_square

Vrai ou faux ?
  « Soit W = Span{(0 ; 1 ; −1), (−1 ; 1 ; 1)} ⊂ ℝ³. L'application x ↦ proj_W x est injective. » → FAUX
    contre-exemple (mapWitness) : x = (0 ; 0 ; 0), y = (2 ; 1 ; 1)
  [examen tf]

```

## Familles orthonormées et matrices orthogonales (`l-orth-matrices`, BA1)

_Colonnes orthonormées ; U⁻¹ = Uᵀ._

### Niveau 1

```
Soit U = 13·[2−121−2−2−2−21]. Vérifie que ses colonnes c₁, c₂, c₃ sont orthonormées (quelques produits scalaires), puis donne U⁻¹.
  [guided]  c_1·c_2
    = (−2 − □ + 4)/□   (trous : (−2 − 2 + 4)/9)   ← Produits des colonnes, sur 9
    = 0   ← Orthogonales
  — c₂ · c₃  [juge value]  départ : c_2·c_3
    = (−□ + 4 − 2)/□   (trous : (−2 + 4 − 2)/9)   ← Produits des colonnes, sur 9
    = 0   ← Orthogonales
  — ‖c₁‖² = c₁ · c₁  [juge value]  départ : c_1·c_1
    = (4 + □ + □)/9   (trous : (4 + 1 + 4)/9)   ← Produits des colonnes, sur 9
    = 1   ← Norme 1
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[2/3,1/3,-2/3],[-1/3,-2/3,-2/3],[2/3,-2/3,1/3]]   (cases à remplir : (1,2) (1,3) (2,2))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (−2 − 2 + □)/9 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

Soit U = 17·[−623−23−6362]. Vérifie que ses colonnes c₁, c₂, c₃ sont orthonormées (quelques produits scalaires), puis donne U⁻¹.
  [guided]  c_1·c_2
    = (−12 − □ + 18)/□   (trous : (−12 − 6 + 18)/49)   ← Produits des colonnes, sur 49
    = 0   ← Orthogonales
  — c₂ · c₃  [juge value]  départ : c_2·c_3
    = (□ − 18 + 12)/□   (trous : (6 − 18 + 12)/49)   ← Produits des colonnes, sur 49
    = 0   ← Orthogonales
  — ‖c₁‖² = c₁ · c₁  [juge value]  départ : c_1·c_1
    = (36 + □ + □)/49   (trous : (36 + 4 + 9)/49)   ← Produits des colonnes, sur 49
    = 1   ← Norme 1
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[-6/7,-2/7,3/7],[2/7,3/7,6/7],[3/7,-6/7,2/7]]   (cases à remplir : (2,1) (2,2) (2,3))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (−12 − 6 + □)/49 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

Soit U = 17·[2363−6262−3]. Vérifie que ses colonnes c₁, c₂, c₃ sont orthonormées (quelques produits scalaires), puis donne U⁻¹.
  [guided]  c_1·c_2
    = (6 − □ + 12)/□   (trous : (6 − 18 + 12)/49)   ← Produits des colonnes, sur 49
    = 0   ← Orthogonales
  — c₂ · c₃  [juge value]  départ : c_2·c_3
    = (□ − 12 − 6)/□   (trous : (18 − 12 − 6)/49)   ← Produits des colonnes, sur 49
    = 0   ← Orthogonales
  — ‖c₁‖² = c₁ · c₁  [juge value]  départ : c_1·c_1
    = (4 + □ + □)/49   (trous : (4 + 9 + 36)/49)   ← Produits des colonnes, sur 49
    = 1   ← Norme 1
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[2/7,3/7,6/7],[3/7,-6/7,2/7],[6/7,2/7,-3/7]]   (cases à remplir : (1,3) (2,1) (2,2))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (6 − 18 + □)/49 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

```

### Niveau 2

```
Soit U = 13·[12−22−2−1212]. Est-elle orthogonale ? Fais le test, puis donne U⁻¹.
  [guided]  UᵀU
    ? Comment savoir si U est orthogonale ? ✔ Vérifier UᵀU = I (colonnes orthogonales et de norme 1) / · Vérifier que les colonnes sont orthogonales deux à deux / · Vérifier que det U = 1
    = [[1,0,0],[0,1,0],[0,0,1]]   (cases à remplir : (2,1) (2,3))   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[1/3,2/3,2/3],[2/3,-2/3,1/3],[-2/3,-1/3,2/3]]   (cases à remplir : (1,1) (1,3) (2,1))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (2 − 4 + □)/9 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.
  pièges : l_orth_cols_only, l_orth_det_one

Soit U = 19·[1844−4781−4]. Est-elle orthogonale ? Fais le test, puis donne U⁻¹.
  [guided]  UᵀU
    ? Comment savoir si U est orthogonale ? · Vérifier que det U = 1 / · Vérifier que les colonnes sont orthogonales deux à deux / ✔ Vérifier UᵀU = I (colonnes orthogonales et de norme 1)
    = [[1,0,0],[0,1,0],[0,0,1]]   (cases à remplir : (2,1) (2,2))   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[1/9,4/9,8/9],[8/9,-4/9,1/9],[4/9,7/9,-4/9]]   (cases à remplir : (1,1) (2,1) (2,3))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (8 − 16 + □)/81 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.
  pièges : l_orth_det_one, l_orth_cols_only

Soit U = 19·[4−187−4−4−4−81]. Est-elle orthogonale ? Fais le test, puis donne U⁻¹.
  [guided]  UᵀU
    ? Comment savoir si U est orthogonale ? · Vérifier que det U = 1 / ✔ Vérifier UᵀU = I (colonnes orthogonales et de norme 1) / · Vérifier que les colonnes sont orthogonales deux à deux
    = [[1,0,0],[0,1,0],[0,0,1]]   (cases à remplir : (1,3) (2,3))   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[4/9,7/9,-4/9],[-1/9,-4/9,-8/9],[8/9,-4/9,1/9]]   (cases à remplir : (1,2) (1,3) (2,3))   ← Transposer
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (−4 − 28 + □)/81 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.
  pièges : l_orth_det_one, l_orth_cols_only

```

### Niveau 3

```
Soit U = 17·[−263−32−6−6−32]. Vérifie qu'elle est orthogonale, donne U⁻¹, puis résous Ux = (1 ; −3 ; 0).
  [tap, suivre l'erreur, menu menu]  UᵀU
    = [[1,0,0],[0,1,0],[0,0,1]]   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[-2/7,-3/7,-6/7],[6/7,2/7,-3/7],[3/7,-6/7,2/7]]   ← Transposer
  — Résoudre Ux = (1 ; −3 ; 0) sans Gauss : x = Uᵀb  [juge mat]  départ : x
    = U^T·(1 ; -3 ; 0)   ← x = U⁻¹b = Uᵀb
    = (1 ; 0 ; 3)
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (−12 − 6 + □)/49 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

Soit U = 17·[−236−3−62−62−3]. Vérifie qu'elle est orthogonale, donne U⁻¹, puis résous Ux = (0 ; −3 ; −2).
  [tap, suivre l'erreur, menu menu]  UᵀU
    = [[1,0,0],[0,1,0],[0,0,1]]   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[-2/7,-3/7,-6/7],[3/7,-6/7,2/7],[6/7,2/7,-3/7]]   ← Transposer
  — Résoudre Ux = (0 ; −3 ; −2) sans Gauss : x = Uᵀb  [juge mat]  départ : x
    = U^T·(0 ; -3 ; -2)   ← x = U⁻¹b = Uᵀb
    = (3 ; 2 ; 0)
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (−6 + 18 − □)/49 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

Soit U = 13·[−1−22−2−1−2−221]. Vérifie qu'elle est orthogonale, donne U⁻¹, puis résous Ux = (0 ; −1 ; 1).
  [tap, suivre l'erreur, menu menu]  UᵀU
    = [[1,0,0],[0,1,0],[0,0,1]]   ← Colonnes orthonormées
  — L'inverse : U⁻¹ = Uᵀ  [juge mat]  départ : U^(−1)
    = [[-1/3,-2/3,-2/3],[-2/3,-1/3,2/3],[2/3,-2/3,1/3]]   ← Transposer
  — Résoudre Ux = (0 ; −1 ; 1) sans Gauss : x = Uᵀb  [juge mat]  départ : x
    = U^T·(0 ; -1 ; 1)   ← x = U⁻¹b = Uᵀb
    = (0 ; 1 ; 1)
  aides : Teste UᵀU = I : les produits scalaires des colonnes (0 pour deux colonnes différentes, 1 pour une colonne avec elle-même). | c₁ · c₂ = (2 + 2 − □)/9 | UᵀU = I : U est orthogonale, et U⁻¹ = Uᵀ.

```

### Niveau 4

```
Les vecteurs (2/3 ; 1/3 ; −2/3), (2/3 ; −2/3 ; 1/3) forment une famille orthonormée de ℝ³. Complète-la en une base orthonormée de ℝ³ : trouve un vecteur orthogonal aux deux, puis normalise.
  [free, suivre l'erreur]  w
    = (-1 ; -2 ; -2)   ← Orthogonal à c₁ et c₂ : un système homogène
  — Normaliser  [juge span]  départ : c
    = (-1/3 ; -2/3 ; -2/3)   ← Diviser par la norme
  aides : Un vecteur w orthogonal à la famille vérifie cᵢ · w = 0 pour chaque cᵢ : résous ce système homogène, puis divise par la norme. | Par exemple w = (−1 ; −2 ; −□) | (−1/3 ; −2/3 ; −2/3)

Les vecteurs (8/9 ; −4/9 ; 1/9), (−1/9 ; −4/9 ; −8/9) forment une famille orthonormée de ℝ³. Complète-la en une base orthonormée de ℝ³ : trouve un vecteur orthogonal aux deux, puis normalise.
  [free, suivre l'erreur]  w
    = (4 ; 7 ; -4)   ← Orthogonal à c₁ et c₂ : un système homogène
  — Normaliser  [juge span]  départ : c
    = (4/9 ; 7/9 ; -4/9)   ← Diviser par la norme
  aides : Un vecteur w orthogonal à la famille vérifie cᵢ · w = 0 pour chaque cᵢ : résous ce système homogène, puis divise par la norme. | Par exemple w = (4 ; 7 ; −□) | (4/9 ; 7/9 ; −4/9)

Les vecteurs (−4/9 ; −7/9 ; 4/9), (8/9 ; −4/9 ; 1/9) forment une famille orthonormée de ℝ³. Complète-la en une base orthonormée de ℝ³ : trouve un vecteur orthogonal aux deux, puis normalise.
  [free, suivre l'erreur]  w
    = (-1 ; -4 ; -8)   ← Orthogonal à c₁ et c₂ : un système homogène
  — Normaliser  [juge span]  départ : c
    = (-1/9 ; -4/9 ; -8/9)   ← Diviser par la norme
  aides : Un vecteur w orthogonal à la famille vérifie cᵢ · w = 0 pour chaque cᵢ : résous ce système homogène, puis divise par la norme. | Par exemple w = (−1 ; −4 ; −□) | (−1/9 ; −4/9 ; −8/9)

```

### Niveau 5

```
Soit U une matrice n × n orthogonale. Laquelle de ces affirmations n'est pas forcément vraie ?
  · Les lignes de U sont orthonormées   ✔ det U = 1   · U⁻¹ = Uᵀ   · |det U| = 1

Soit U une matrice n × n orthogonale. Laquelle de ces affirmations est toujours vraie ?
  · U + Uᵀ = 2I   · det U = 1 [l_orth_det_one]   · U est symétrique   ✔ Les lignes de U sont orthonormées
  pièges : l_orth_det_one

Soit U une matrice n × n orthogonale. Laquelle de ces affirmations est toujours vraie ?
  · U est symétrique   ✔ (Ux) · (Uy) = x · y pour tous x, y   · det U = 1 [l_orth_det_one]   · U + Uᵀ = 2I
  pièges : l_orth_det_one

```

### Variantes d'examen

```
Soit U une matrice n × n orthogonale. Laquelle de ces affirmations n'est pas forcément vraie ?
  · Les lignes de U sont orthonormées   ✔ det U = 1   · UUᵀ = I   · |det U| = 1
  [examen mcq]

Vrai ou faux ?
  « Si les colonnes d'une matrice carrée A sont orthogonales deux à deux et non nulles, alors A⁻¹ = Aᵀ. » → FAUX
    contre-exemple (matOne) : A = [[2,0],[0,2]]
  [examen tf]
  pièges : l_orth_cols_only

```

## Gram-Schmidt (`l-orth-gs`, BA1)

_Retirer à xⱼ ses projections sur les vᵢ déjà obtenus._

### Niveau 1

```
Applique Gram-Schmidt à x₁ = (1 ; 0 ; −1 ; −1), x₂ = (−2 ; 0 ; 1 ; 3), x₃ = (0 ; 1 ; 2 ; 4) (sans normaliser). v₁ = x₁ ; v₁ · v₁ = 3.
  [guided]  x_2·v_1/(v_1·v_1)
    = (−□ + 0 − 1 − 3)/(1 + 0 + 1 + □)   (trous : (−2 + 0 − 1 − 3)/(1 + 0 + 1 + 1))   ← Produits scalaires
    = −2
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (-2 ; 0 ; 1 ; 3) + 2·(1 ; 0 ; -1 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 0 ; -1 ; 1)   (cases à remplir : (3,1) (4,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    = (□ + 0 − 2 − 4)/(1 + 0 + □ + 1)   (trous : (0 + 0 − 2 − 4)/(1 + 0 + 1 + 1))   ← Produits scalaires
    = −2
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (0 + □ − 2 + 4)/(0 + 0 + 1 + □)   (trous : (0 + 0 − 2 + 4)/(0 + 0 + 1 + 1))   ← Produits scalaires
    = 1
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (0 ; 1 ; 2 ; 4) + 2·(1 ; 0 ; -1 ; -1) - (0 ; 0 ; -1 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; 1 ; 1 ; 1)   (cases à remplir : (2,1) (3,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (1 ; 0 ; -1 ; -1), (0 ; 0 ; -1 ; 1), (2 ; 1 ; 1 ; 1)   (cases à remplir : (1,1) (2,1))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/3)v₁ − (□/2)v₂ | v₂ = (0 ; 0 ; −1 ; 1), v₃ = (2 ; 1 ; 1 ; 1)
  pièges : g4_proj_no_square

Applique Gram-Schmidt à x₁ = (0 ; 2 ; 1 ; 0), x₂ = (0 ; 5 ; 0 ; 0), x₃ = (−2 ; −3 ; −4 ; 2) (sans normaliser). v₁ = x₁ ; v₁ · v₁ = 5.
  [guided]  x_2·v_1/(v_1·v_1)
    = (□ + 10 + 0 + 0)/(0 + 4 + 1 + □)   (trous : (0 + 10 + 0 + 0)/(0 + 4 + 1 + 0))   ← Produits scalaires
    = 2
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (0 ; 5 ; 0 ; 0) - 2·(0 ; 2 ; 1 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 1 ; -2 ; 0)   (cases à remplir : (1,1) (3,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    = (□ − 6 − 4 + 0)/(0 + 4 + □ + 0)   (trous : (0 − 6 − 4 + 0)/(0 + 4 + 1 + 0))   ← Produits scalaires
    = −2
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (0 − □ + 8 + 0)/(0 + 1 + 4 + □)   (trous : (0 − 3 + 8 + 0)/(0 + 1 + 4 + 0))   ← Produits scalaires
    = 1
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-2 ; -3 ; -4 ; 2) + 2·(0 ; 2 ; 1 ; 0) - (0 ; 1 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-2 ; 0 ; 0 ; 2)   (cases à remplir : (1,1) (2,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (0 ; 2 ; 1 ; 0), (0 ; 1 ; -2 ; 0), (-2 ; 0 ; 0 ; 2)   (cases à remplir : (1,1) (4,3))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/5)v₁ − (□/5)v₂ | v₂ = (0 ; 1 ; −2 ; 0), v₃ = (−2 ; 0 ; 0 ; 2)
  pièges : g4_proj_no_square

Applique Gram-Schmidt à x₁ = (2 ; 1 ; 1 ; 1), x₂ = (2 ; 0 ; 0 ; 3), x₃ = (−2 ; 0 ; 2 ; −5) (sans normaliser). v₁ = x₁ ; v₁ · v₁ = 7.
  [guided]  x_2·v_1/(v_1·v_1)
    = (□ + 0 + 0 + 3)/(4 + 1 + 1 + □)   (trous : (4 + 0 + 0 + 3)/(4 + 1 + 1 + 1))   ← Produits scalaires
    = 1
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (2 ; 0 ; 0 ; 3) - (2 ; 1 ; 1 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -1 ; -1 ; 2)   (cases à remplir : (1,1) (3,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    = (−□ + 0 + 2 − 5)/(4 + 1 + □ + 1)   (trous : (−4 + 0 + 2 − 5)/(4 + 1 + 1 + 1))   ← Produits scalaires
    = −1
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (0 + □ − 2 − 10)/(0 + 1 + 1 + □)   (trous : (0 + 0 − 2 − 10)/(0 + 1 + 1 + 4))   ← Produits scalaires
    = −2
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-2 ; 0 ; 2 ; -5) + (2 ; 1 ; 1 ; 1) + 2·(0 ; -1 ; -1 ; 2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -1 ; 1 ; 0)   (cases à remplir : (2,1) (4,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (2 ; 1 ; 1 ; 1), (0 ; -1 ; -1 ; 2), (0 ; -1 ; 1 ; 0)   (cases à remplir : (1,2) (1,3))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/7)v₁ − (□/6)v₂ | v₂ = (0 ; −1 ; −1 ; 2), v₃ = (0 ; −1 ; 1 ; 0)
  pièges : g4_proj_no_square

```

### Niveau 2

```
Applique Gram-Schmidt à x₁ = (0 ; 1 ; −1 ; −2), x₂ = (0 ; 0 ; −2 ; −2), x₃ = (1 ; −1 ; −1 ; −3) (sans normaliser). v₁ = x₁.
  [guided]  x_2·v_1/(v_1·v_1)
    = (□ + □ + 2 + 4)/(0 + 1 + 1 + □)   (trous : (0 + 0 + 2 + 4)/(0 + 1 + 1 + 4))   ← Produits scalaires
    = 1
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (0 ; 0 ; -2 ; -2) - (0 ; 1 ; -1 ; -2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -1 ; -1 ; 0)   (cases à remplir : (3,1) (4,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    ? Pour obtenir v₃, sur quels vecteurs projette-t-on x₃ ? ✔ Sur v₁ et v₂, déjà orthogonaux / · Sur x₁ et x₂
    = (□ − □ + 1 + 6)/(0 + 1 + 1 + □)   (trous : (0 − 1 + 1 + 6)/(0 + 1 + 1 + 4))   ← Produits scalaires
    = 1
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (□ + □ + 1 + 0)/(0 + 1 + 1 + □)   (trous : (0 + 1 + 1 + 0)/(0 + 1 + 1 + 0))   ← Produits scalaires
    = 1
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (1 ; -1 ; -1 ; -3) - (0 ; 1 ; -1 ; -2) - (0 ; -1 ; -1 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; -1 ; 1 ; -1)   (cases à remplir : (2,1) (3,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (0 ; 1 ; -1 ; -2), (0 ; -1 ; -1 ; 0), (1 ; -1 ; 1 ; -1)   (cases à remplir : (2,1) (2,3))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/6)v₁ − (□/2)v₂ | v₂ = (0 ; −1 ; −1 ; 0), v₃ = (1 ; −1 ; 1 ; −1)
  pièges : g4_proj_no_square, l_gs_use_x

Applique Gram-Schmidt à x₁ = (−2 ; 0 ; −1 ; 1), x₂ = (3 ; 2 ; 0 ; 0), x₃ = (5 ; 2 ; 2 ; 0) (sans normaliser). v₁ = x₁.
  [guided]  x_2·v_1/(v_1·v_1)
    = (−□ + □ + 0 + 0)/(4 + 0 + 1 + □)   (trous : (−6 + 0 + 0 + 0)/(4 + 0 + 1 + 1))   ← Produits scalaires
    = −1
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (3 ; 2 ; 0 ; 0) + (-2 ; 0 ; -1 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 2 ; -1 ; 1)   (cases à remplir : (3,1) (4,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    ? Pour obtenir v₃, sur quels vecteurs projette-t-on x₃ ? · Sur x₁ et x₂ / ✔ Sur v₁ et v₂, déjà orthogonaux
    = (−□ + □ − 2 + 0)/(4 + 0 + 1 + □)   (trous : (−10 + 0 − 2 + 0)/(4 + 0 + 1 + 1))   ← Produits scalaires
    = −2
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (□ + □ − 2 + 0)/(1 + 4 + 1 + □)   (trous : (5 + 4 − 2 + 0)/(1 + 4 + 1 + 1))   ← Produits scalaires
    = 1
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (5 ; 2 ; 2 ; 0) + 2·(-2 ; 0 ; -1 ; 1) - (1 ; 2 ; -1 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 0 ; 1 ; 1)   (cases à remplir : (3,1) (4,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (-2 ; 0 ; -1 ; 1), (1 ; 2 ; -1 ; 1), (0 ; 0 ; 1 ; 1)   (cases à remplir : (4,2) (3,3))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/6)v₁ − (□/7)v₂ | v₂ = (1 ; 2 ; −1 ; 1), v₃ = (0 ; 0 ; 1 ; 1)
  pièges : g4_proj_no_square, l_gs_use_x

Applique Gram-Schmidt à x₁ = (0 ; −1 ; −1 ; 0), x₂ = (2 ; −2 ; −2 ; −1), x₃ = (−5 ; 0 ; −2 ; 0) (sans normaliser). v₁ = x₁.
  [guided]  x_2·v_1/(v_1·v_1)
    = (□ + □ + 2 + 0)/(0 + 1 + 1 + □)   (trous : (0 + 2 + 2 + 0)/(0 + 1 + 1 + 0))   ← Produits scalaires
    = 2
  — v₂ = x₂ − (x₂ · v₁ / v₁ · v₁) v₁  [juge mat]  départ : v_2
    = (2 ; -2 ; -2 ; -1) - 2·(0 ; -1 ; -1 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; 0 ; 0 ; -1)   (cases à remplir : (2,1) (3,1))
  — Coefficient x₃ · v₁ / v₁ · v₁  [juge value]  départ : x_3·v_1/(v_1·v_1)
    ? Pour obtenir v₃, sur quels vecteurs projette-t-on x₃ ? ✔ Sur v₁ et v₂, déjà orthogonaux / · Sur x₁ et x₂
    = (□ + □ + 2 + 0)/(0 + 1 + 1 + □)   (trous : (0 + 0 + 2 + 0)/(0 + 1 + 1 + 0))   ← Produits scalaires
    = 1
  — Coefficient x₃ · v₂ / v₂ · v₂  [juge value]  départ : x_3·v_2/(v_2·v_2)
    = (−□ + □ + 0 + 0)/(4 + 0 + 0 + □)   (trous : (−10 + 0 + 0 + 0)/(4 + 0 + 0 + 1))   ← Produits scalaires
    = −2
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-5 ; 0 ; -2 ; 0) - (0 ; -1 ; -1 ; 0) + 2·(2 ; 0 ; 0 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-1 ; 1 ; -1 ; -2)   (cases à remplir : (2,1) (4,1))
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (0 ; -1 ; -1 ; 0), (2 ; 0 ; 0 ; -1), (-1 ; 1 ; -1 ; -2)   (cases à remplir : (2,1) (3,2))   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/2)v₁ − (□/5)v₂ | v₂ = (2 ; 0 ; 0 ; −1), v₃ = (−1 ; 1 ; −1 ; −2)
  pièges : g4_proj_no_square, l_gs_use_x

```

### Niveau 3

```
Applique Gram-Schmidt à x₁ = (2 ; −1 ; 0 ; −1), x₂ = (−3 ; 4 ; 1 ; 2), x₃ = (3 ; −6 ; −3 ; 0) (sans normaliser). Choisis chaque étape.
  [tap, suivre l'erreur, menu menu]  v_2
    = (-3 ; 4 ; 1 ; 2) + 2·(2 ; -1 ; 0 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 2 ; 1 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (3 ; -6 ; -3 ; 0) - 2·(2 ; -1 ; 0 ; -1) + 2·(1 ; 2 ; 1 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 0 ; -1 ; 2)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (2 ; -1 ; 0 ; -1), (1 ; 2 ; 1 ; 0), (1 ; 0 ; -1 ; 2)   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/6)v₁ − (□/6)v₂ | v₂ = (1 ; 2 ; 1 ; 0), v₃ = (1 ; 0 ; −1 ; 2)
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (1 ; 2 ; 1 ; 1), x₂ = (3 ; 4 ; 3 ; 0), x₃ = (1 ; −4 ; −1 ; −6) (sans normaliser). Choisis chaque étape.
  [tap, suivre l'erreur, menu menu]  v_2
    = (3 ; 4 ; 3 ; 0) - 2·(1 ; 2 ; 1 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 0 ; 1 ; -2)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (1 ; -4 ; -1 ; -6) + 2·(1 ; 2 ; 1 ; 1) - 2·(1 ; 0 ; 1 ; -2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 0 ; -1 ; 0)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (1 ; 2 ; 1 ; 1), (1 ; 0 ; 1 ; -2), (1 ; 0 ; -1 ; 0)   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/7)v₁ − (□/6)v₂ | v₂ = (1 ; 0 ; 1 ; −2), v₃ = (1 ; 0 ; −1 ; 0)
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (1 ; −1 ; 2 ; 1), x₂ = (−2 ; 1 ; −1 ; −2), x₃ = (−4 ; 1 ; 0 ; −2) (sans normaliser). Choisis chaque étape.
  [tap, suivre l'erreur, menu menu]  v_2
    = (-2 ; 1 ; -1 ; -2) + (1 ; -1 ; 2 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-1 ; 0 ; 1 ; -1)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-4 ; 1 ; 0 ; -2) + (1 ; -1 ; 2 ; 1) - 2·(-1 ; 0 ; 1 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-1 ; 0 ; 0 ; 1)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (1 ; -1 ; 2 ; 1), (-1 ; 0 ; 1 ; -1), (-1 ; 0 ; 0 ; 1)   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/7)v₁ − (□/3)v₂ | v₂ = (−1 ; 0 ; 1 ; −1), v₃ = (−1 ; 0 ; 0 ; 1)
  pièges : l_gs_sign, g4_proj_no_square

```

### Niveau 4

```
Applique Gram-Schmidt à x₁ = (−1 ; 2 ; −2 ; 0), x₂ = (0 ; 3 ; −6 ; 0), x₃ = (3 ; −6 ; −3 ; 0), puis normalise.
  [free, suivre l'erreur]  v_2
    = (0 ; 3 ; -6 ; 0) - 2·(-1 ; 2 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; -1 ; -2 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (3 ; -6 ; -3 ; 0) + (-1 ; 2 ; -2 ; 0) - 2·(2 ; -1 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-2 ; -2 ; -1 ; 0)
  — La base orthonormée (u₁, u₂, u₃)  [juge span]  départ : B
    = (-1/3 ; 2/3 ; -2/3 ; 0), (2/3 ; -1/3 ; -2/3 ; 0), (-2/3 ; -2/3 ; -1/3 ; 0)   ← Chaque vᵢ divisé par sa norme
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/9)v₁ − (□/9)v₂ | v₂ = (2 ; −1 ; −2 ; 0), v₃ = (−2 ; −2 ; −1 ; 0)
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (−2 ; 0 ; 0 ; −1), x₂ = (−2 ; 2 ; −2 ; −1), x₃ = (−2 ; −3 ; 5 ; −1) (sans normaliser).
  [free, suivre l'erreur]  v_2
    = (-2 ; 2 ; -2 ; -1) - (-2 ; 0 ; 0 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 2 ; -2 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-2 ; -3 ; 5 ; -1) - (-2 ; 0 ; 0 ; -1) + 2·(0 ; 2 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 1 ; 1 ; 0)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (-2 ; 0 ; 0 ; -1), (0 ; 2 ; -2 ; 0), (0 ; 1 ; 1 ; 0)   ← Base orthogonale, dans l'ordre
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/5)v₁ − (□/8)v₂ | v₂ = (0 ; 2 ; −2 ; 0), v₃ = (0 ; 1 ; 1 ; 0)
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (2 ; 0 ; −1 ; −2), x₂ = (−4 ; −1 ; 1 ; 0), x₃ = (−6 ; −3 ; 0 ; 3), puis normalise.
  [free, suivre l'erreur]  v_2
    = (-4 ; -1 ; 1 ; 0) + (2 ; 0 ; -1 ; -2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-2 ; -1 ; 0 ; -2)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-6 ; -3 ; 0 ; 3) + 2·(2 ; 0 ; -1 ; -2) - (-2 ; -1 ; 0 ; -2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -2 ; -2 ; 1)
  — La base orthonormée (u₁, u₂, u₃)  [juge span]  départ : B
    = (2/3 ; 0 ; -1/3 ; -2/3), (-2/3 ; -1/3 ; 0 ; -2/3), (0 ; -2/3 ; -2/3 ; 1/3)   ← Chaque vᵢ divisé par sa norme
  aides : v₁ = x₁. Retire de x₂ sa projection sur v₁, puis de x₃ ses projections sur v₁ et sur v₂ (pas sur x₁, x₂). | v₃ = x₃ − (□/9)v₁ − (□/9)v₂ | v₂ = (−2 ; −1 ; 0 ; −2), v₃ = (0 ; −2 ; −2 ; 1)
  pièges : l_gs_sign, g4_proj_no_square

```

### Niveau 5

```
Applique Gram-Schmidt à x₁ = (0 ; 2 ; 0 ; 1), x₂ = (−2 ; 4 ; −1 ; 2), x₃ = (2 ; 1 ; 1 ; 3) (sans normaliser).
  [free, sans aide]  v_2
    = (-2 ; 4 ; -1 ; 2) - 2·(0 ; 2 ; 0 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-2 ; 0 ; -1 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (2 ; 1 ; 1 ; 3) - (0 ; 2 ; 0 ; 1) + (-2 ; 0 ; -1 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -1 ; 0 ; 2)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (0 ; 2 ; 0 ; 1), (-2 ; 0 ; -1 ; 0), (0 ; -1 ; 0 ; 2)   ← Base orthogonale, dans l'ordre
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (0 ; −2 ; −1 ; 2), x₂ = (2 ; 3 ; −1 ; −2), x₃ = (4 ; −3 ; −2 ; 5), puis normalise.
  [free, sans aide]  v_2
    = (2 ; 3 ; -1 ; -2) + (0 ; -2 ; -1 ; 2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; 1 ; -2 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (4 ; -3 ; -2 ; 5) - 2·(0 ; -2 ; -1 ; 2) - (2 ; 1 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; 0 ; 2 ; 1)
  — La base orthonormée (u₁, u₂, u₃)  [juge span]  départ : B
    = (0 ; -2/3 ; -1/3 ; 2/3), (2/3 ; 1/3 ; -2/3 ; 0), (2/3 ; 0 ; 2/3 ; 1/3)   ← Chaque vᵢ divisé par sa norme
  pièges : l_gs_sign, g4_proj_no_square

Applique Gram-Schmidt à x₁ = (−2 ; 0 ; −2 ; 0), x₂ = (−3 ; 1 ; −5 ; −1), x₃ = (1 ; −2 ; 3 ; 4) (sans normaliser).
  [free, sans aide]  v_2
    = (-3 ; 1 ; -5 ; -1) - 2·(-2 ; 0 ; -2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 1 ; -1 ; -1)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (1 ; -2 ; 3 ; 4) + (-2 ; 0 ; -2 ; 0) + 2·(1 ; 1 ; -1 ; -1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (1 ; 0 ; -1 ; 2)
  — La base orthogonale (v₁, v₂, v₃)  [juge span]  départ : B
    = (-2 ; 0 ; -2 ; 0), (1 ; 1 ; -1 ; -1), (1 ; 0 ; -1 ; 2)   ← Base orthogonale, dans l'ordre
  pièges : l_gs_sign, g4_proj_no_square

```

### Variantes d'examen

```
Gram-Schmidt sur x₁ = (0 ; −1 ; 2 ; −2), x₂ = (−2 ; 3 ; −1 ; 2), x₃ = (−1 ; 1 ; 5 ; 0) donne v₁ = x₁, v₂ = (−2 ; 2 ; 1 ; 0), puis v₃ = x₃ + a·v₁ + b·v₂ avec :
  · a = −3, b = −3 [g4_proj_no_square]   · a = −1, b = 0 [l_gs_use_x]   · a = 1, b = 1 [l_gs_sign]   ✔ a = −1, b = −1
  [examen mcq]
  pièges : l_gs_sign, g4_proj_no_square, l_gs_use_x

Vrai ou faux ?
  « Appliqué à une base {x₁, x₂} d'un plan W, Gram-Schmidt donne une base orthogonale de W. » → VRAI
  [examen tf]

```

## Factorisation QR (`l-orth-qr`, BA1)

_Q : Gram-Schmidt normalisé ; R = QᵀA._

### Niveau 1

```
Soit A = [[-1,3,3],[0,-2,-3],[-2,2,0],[2,-1,-3]]. Gram-Schmidt sur ses colonnes a donné v₁ = (−1 ; 0 ; −2 ; 2), v₂ = (2 ; −2 ; 0 ; 1), v₃ = (0 ; −1 ; −2 ; −2). Calcule les normes, r₂₃, puis écris A = QR.
  [guided]  √(v_1·v_1)
    = √(□ + 0 + 4 + □)   (trous : √(1 + 0 + 4 + 4))   ← Somme des carrés
    = 3
  — r₂₂ = ‖v₂‖  [juge value]  départ : √(v_2·v_2)
    = √(4 + □ + 0 + 1)   (trous : √(4 + 4 + 0 + 1))   ← Somme des carrés
    = 3
  — r₃₃ = ‖v₃‖  [juge value]  départ : √(v_3·v_3)
    = √(0 + 1 + 4 + □)   (trous : √(0 + 1 + 4 + 4))   ← Somme des carrés
    = 3
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ + 6 + 0 − 3)/□   (trous : (6 + 6 + 0 − 3)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-1/3,2/3,0],[0,-2/3,-1/3],[-2/3,0,-2/3],[2/3,1/3,-2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-3,-3],[0,3,3],[0,0,3]]   (cases à remplir : (1,2) (2,2))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-3,-3],[0,3,3],[0,0,3]]

Soit A = [[2,-2,3],[0,2,-4],[2,-1,1],[-1,3,-1]]. Gram-Schmidt sur ses colonnes a donné v₁ = (2 ; 0 ; 2 ; −1), v₂ = (0 ; 2 ; 1 ; 2), v₃ = (1 ; −2 ; 0 ; 2). Calcule les normes, r₂₃, puis écris A = QR.
  [guided]  √(v_1·v_1)
    = √(□ + 0 + 4 + □)   (trous : √(4 + 0 + 4 + 1))   ← Somme des carrés
    = 3
  — r₂₂ = ‖v₂‖  [juge value]  départ : √(v_2·v_2)
    = √(0 + □ + 1 + 4)   (trous : √(0 + 4 + 1 + 4))   ← Somme des carrés
    = 3
  — r₃₃ = ‖v₃‖  [juge value]  départ : √(v_3·v_3)
    = √(1 + 4 + 0 + □)   (trous : √(1 + 4 + 0 + 4))   ← Somme des carrés
    = 3
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ − 8 + 1 − 2)/□   (trous : (0 − 8 + 1 − 2)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = −3
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[2/3,0,1/3],[0,2/3,-2/3],[2/3,1/3,0],[-1/3,2/3,2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-3,3],[0,3,-3],[0,0,3]]   (cases à remplir : (2,2) (2,3))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-3,3],[0,3,-3],[0,0,3]]

Soit A = [[-1,3,1],[1,-1,1],[1,-3,1],[-1,1,-3]]. Gram-Schmidt sur ses colonnes a donné v₁ = (−1 ; 1 ; 1 ; −1), v₂ = (1 ; 1 ; −1 ; −1), v₃ = (1 ; −1 ; 1 ; −1). Calcule les normes, r₂₃, puis écris A = QR.
  [guided]  √(v_1·v_1)
    = √(□ + 1 + 1 + □)   (trous : √(1 + 1 + 1 + 1))   ← Somme des carrés
    = 2
  — r₂₂ = ‖v₂‖  [juge value]  départ : √(v_2·v_2)
    = √(1 + □ + 1 + 1)   (trous : √(1 + 1 + 1 + 1))   ← Somme des carrés
    = 2
  — r₃₃ = ‖v₃‖  [juge value]  départ : √(v_3·v_3)
    = √(1 + 1 + 1 + □)   (trous : √(1 + 1 + 1 + 1))   ← Somme des carrés
    = 2
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ + 1 − 1 + 3)/□   (trous : (1 + 1 − 1 + 3)/2)   ← qᵢ = vᵢ/‖vᵢ‖
    = 2
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-1/2,1/2,1/2],[1/2,1/2,-1/2],[1/2,-1/2,1/2],[-1/2,-1/2,-1/2]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[2,-4,2],[0,2,2],[0,0,2]]   (cases à remplir : (1,1) (1,2))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[2,-4,2],[0,2,2],[0,0,2]]

```

### Niveau 2

```
Soit A = [[-1,3,0],[-2,2,-6],[0,2,3],[2,-1,3]]. Gram-Schmidt sur ses colonnes a donné v₁ = (−1 ; −2 ; 0 ; 2), v₂ = (2 ; 0 ; 2 ; 1), v₃ = (0 ; −2 ; 1 ; −2), de normes 3, 3, 3. Calcule les rᵢⱼ, puis écris A = QR.
  [guided]  q_1·x_2
    ? Comment calculer rᵢⱼ (i < j) ? ✔ rᵢⱼ = qᵢ · xⱼ (avec qᵢ = vᵢ/‖vᵢ‖) / · rᵢⱼ = vᵢ · xⱼ / · rᵢⱼ = cᵢⱼ, le coefficient de Gram-Schmidt
    = (−□ − □ + 0 − 2)/□   (trous : (−3 − 4 + 0 − 2)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = −3
  — r₁₃ = q₁ · x₃ = v₁ · x₃ / ‖v₁‖  [juge value]  départ : q_1·x_3
    = (□ + □ + 0 + 6)/□   (trous : (0 + 12 + 0 + 6)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 6
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ + □ + 6 + 3)/□   (trous : (0 + 0 + 6 + 3)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-1/3,2/3,0],[-2/3,0,-2/3],[0,2/3,1/3],[2/3,1/3,-2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-3,6],[0,3,3],[0,0,3]]   (cases à remplir : (1,1) (1,2))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-3,6],[0,3,3],[0,0,3]]
  pièges : l_qr_r_from_gs

Soit A = [[2,5,1],[-2,-4,-4],[-1,0,1],[0,-2,-3]]. Gram-Schmidt sur ses colonnes a donné v₁ = (2 ; −2 ; −1 ; 0), v₂ = (1 ; 0 ; 2 ; −2), v₃ = (−2 ; −2 ; 0 ; −1), de normes 3, 3, 3. Calcule les rᵢⱼ, puis écris A = QR.
  [guided]  q_1·x_2
    ? Comment calculer rᵢⱼ (i < j) ? ✔ rᵢⱼ = qᵢ · xⱼ (avec qᵢ = vᵢ/‖vᵢ‖) / · rᵢⱼ = cᵢⱼ, le coefficient de Gram-Schmidt / · rᵢⱼ = vᵢ · xⱼ
    = (□ + □ + 0 + 0)/□   (trous : (10 + 8 + 0 + 0)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 6
  — r₁₃ = q₁ · x₃ = v₁ · x₃ / ‖v₁‖  [juge value]  départ : q_1·x_3
    = (□ + □ − 1 + 0)/□   (trous : (2 + 8 − 1 + 0)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ + □ + 2 + 6)/□   (trous : (1 + 0 + 2 + 6)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[2/3,1/3,-2/3],[-2/3,0,-2/3],[-1/3,2/3,0],[0,-2/3,-1/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,6,3],[0,3,3],[0,0,3]]   (cases à remplir : (2,2) (2,3))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,6,3],[0,3,3],[0,0,3]]
  pièges : l_qr_r_from_gs

Soit A = [[-2,0,0],[2,4,5],[0,-1,1],[-1,-1,1]]. Gram-Schmidt sur ses colonnes a donné v₁ = (−2 ; 2 ; 0 ; −1), v₂ = (2 ; 2 ; −1 ; 0), v₃ = (0 ; 1 ; 2 ; 2), de normes 3, 3, 3. Calcule les rᵢⱼ, puis écris A = QR.
  [guided]  q_1·x_2
    ? Comment calculer rᵢⱼ (i < j) ? ✔ rᵢⱼ = qᵢ · xⱼ (avec qᵢ = vᵢ/‖vᵢ‖) / · rᵢⱼ = cᵢⱼ, le coefficient de Gram-Schmidt / · rᵢⱼ = vᵢ · xⱼ
    = (□ + □ + 0 + 1)/□   (trous : (0 + 8 + 0 + 1)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — r₁₃ = q₁ · x₃ = v₁ · x₃ / ‖v₁‖  [juge value]  départ : q_1·x_3
    = (□ + □ + 0 − 1)/□   (trous : (0 + 10 + 0 − 1)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — r₂₃ = q₂ · x₃ = v₂ · x₃ / ‖v₂‖  [juge value]  départ : q_2·x_3
    = (□ + □ − 1 + 0)/□   (trous : (0 + 10 − 1 + 0)/3)   ← qᵢ = vᵢ/‖vᵢ‖
    = 3
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-2/3,2/3,0],[2/3,2/3,1/3],[0,-1/3,2/3],[-1/3,0,2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,3,3],[0,3,3],[0,0,3]]   (cases à remplir : (1,3) (2,2))   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,3,3],[0,3,3],[0,0,3]]
  pièges : l_qr_r_from_gs

```

### Niveau 3

```
Soit A = [[1,-4,0],[0,2,-1],[-2,4,2],[2,-3,-7]]. Fais Gram-Schmidt sur ses colonnes, normalise, puis écris A = QR.
  [tap, suivre l'erreur, menu menu]  v_2
    = (-4 ; 2 ; 4 ; -3) + 2·(1 ; 0 ; -2 ; 2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-2 ; 2 ; 0 ; 1)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (0 ; -1 ; 2 ; -7) + 2·(1 ; 0 ; -2 ; 2) + (-2 ; 2 ; 0 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 1 ; -2 ; -2)
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[1/3,-2/3,0],[0,2/3,1/3],[-2/3,0,-2/3],[2/3,1/3,-2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-6,-6],[0,3,-3],[0,0,3]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-6,-6],[0,3,-3],[0,0,3]]
  pièges : l_gs_sign, g4_proj_no_square

Soit A = [[1,4,-4],[2,3,-5],[0,2,-3],[2,4,-2]]. Fais Gram-Schmidt sur ses colonnes, normalise, puis écris A = QR.
  [tap, suivre l'erreur, menu menu]  v_2
    = (4 ; 3 ; 2 ; 4) - 2·(1 ; 2 ; 0 ; 2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (2 ; -1 ; 2 ; 0)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-4 ; -5 ; -3 ; -2) + 2·(1 ; 2 ; 0 ; 2) + (2 ; -1 ; 2 ; 0)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; -2 ; -1 ; 2)
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[1/3,2/3,0],[2/3,-1/3,-2/3],[0,2/3,-1/3],[2/3,0,2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,6,-6],[0,3,-3],[0,0,3]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,6,-6],[0,3,-3],[0,0,3]]
  pièges : l_gs_sign, g4_proj_no_square

Soit A = [[2,-2,-5],[2,-1,-6],[0,-2,2],[1,-3,4]]. Fais Gram-Schmidt sur ses colonnes, normalise, puis écris A = QR.
  [tap, suivre l'erreur, menu menu]  v_2
    = (-2 ; -1 ; -2 ; -3) + (2 ; 2 ; 0 ; 1)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (0 ; 1 ; -2 ; -2)
  — v₃ = x₃ − (x₃ · v₁ / v₁ · v₁) v₁ − (x₃ · v₂ / v₂ · v₂) v₂  [juge mat]  départ : v_3
    = (-5 ; -6 ; 2 ; 4) + 2·(2 ; 2 ; 0 ; 1) + 2·(0 ; 1 ; -2 ; -2)   ← Retirer les projections sur les vᵢ déjà obtenus
    = (-1 ; 0 ; -2 ; 2)
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[2/3,0,-1/3],[2/3,1/3,0],[0,-2/3,-2/3],[1/3,-2/3,2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-3,-6],[0,3,-6],[0,0,3]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-3,-6],[0,3,-6],[0,0,3]]
  pièges : l_gs_sign, g4_proj_no_square

```

### Niveau 4

```
Soit A = [[-1,3,-3],[-2,2,0],[2,-1,3],[0,2,-3]]. Calcule la factorisation A = QR (Gram-Schmidt sur les colonnes, puis R = QᵀA).
  [free, suivre l'erreur]  B
    = (-1 ; -2 ; 2 ; 0), (2 ; 0 ; 1 ; 2), (0 ; 2 ; 2 ; -1)   ← Base orthogonale, dans l'ordre
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-1/3,2/3,0],[-2/3,0,2/3],[2/3,1/3,2/3],[0,2/3,-1/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,-3,3],[0,3,-3],[0,0,3]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,-3,3],[0,3,-3],[0,0,3]]

Soit A = [[2,1,0],[2,2,3],[0,2,6],[1,3,3]]. Calcule la factorisation A = QR (Gram-Schmidt sur les colonnes, puis R = QᵀA).
  [free, suivre l'erreur]  B
    = (2 ; 2 ; 0 ; 1), (-1 ; 0 ; 2 ; 2), (0 ; 1 ; 2 ; -2)   ← Base orthogonale, dans l'ordre
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[2/3,-1/3,0],[2/3,0,1/3],[0,2/3,2/3],[1/3,2/3,-2/3]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[3,3,3],[0,3,6],[0,0,3]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[3,3,3],[0,3,6],[0,0,3]]

Soit A = [[-1,0,-2],[-1,-2,0],[1,0,4],[1,2,2]]. Calcule la factorisation A = QR (Gram-Schmidt sur les colonnes, puis R = QᵀA).
  [free, suivre l'erreur]  B
    = (-1 ; -1 ; 1 ; 1), (1 ; -1 ; -1 ; 1), (1 ; 1 ; 1 ; 1)   ← Base orthogonale, dans l'ordre
  — La factorisation A = QR  [juge factor]  départ : A
    = Q = [[-1/2,1/2,1/2],[-1/2,-1/2,1/2],[1/2,-1/2,1/2],[1/2,1/2,1/2]]   ← Colonnes vᵢ/‖vᵢ‖
    = R = [[2,2,4],[0,2,-2],[0,0,2]]   ← R = QᵀA, triangulaire supérieure
  aides : Q : les vecteurs de Gram-Schmidt divisés par leur norme. R = QᵀA : rᵢⱼ = qᵢ · xⱼ ; les cases diagonales sont les normes ‖vᵢ‖. | r₂₃ = q₂ · x₃ = □ | R = [[2,2,4],[0,2,-2],[0,0,2]]

```

### Niveau 5

```
Soit A = [[1,0,1],[2,-6,-7],[2,-3,2],[0,0,0]], et A = QR sa factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive). Que vaut r₁₂ ?
  [free, sans aide]  r_12
    = −6
  pièges : l_qr_r_from_gs

Soit A = [[0,-2,3],[2,-2,0],[-2,3,-6],[-1,-1,3]], et A = QR sa factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive). Que vaut r₃₃ ?
  [free, sans aide]  r_33
    = 3
  pièges : l_qr_r_from_gs

Soit A = [[2,1,-3],[0,2,0],[1,3,3],[-2,-2,3]], et A = QR sa factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive). Que vaut r₁₂ ?
  [free, sans aide]  r_12
    = 3
  pièges : l_qr_r_from_gs

```

### Variantes d'examen

```
Soit A = [[0,0,0],[1,-4,-2],[2,-5,5],[-2,2,-5]], et A = QR sa factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive). Que vaut r₂₃ ?
  [free, sans aide, examen coef]  r_23
    = 3
  pièges : l_qr_r_from_gs

Soit A = [[-2,0,-3],[0,-1,-3],[-1,-1,0],[-2,-4,-6]]. A possède une factorisation QR (Q à colonnes orthonormées, R triangulaire supérieure à diagonale positive) telle que :
  · r₃₃ = 1 [l_qr_r_from_gs]   · r₃₃ = 9   ✔ r₃₃ = 3   · r₃₃ = 3√6
  [examen mcq]
  pièges : l_qr_r_from_gs

Vrai ou faux ?
  « Si A = QR avec Q à colonnes orthonormées, alors R = QᵀA. » → VRAI
  [examen tf]

```

## Moindres carrés (`l-orth-lsq`, BA1)

_AᵀAx̂ = Aᵀb._

### Niveau 1

```
Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 5), (0 ; 1), (1 ; −1), (2 ; −1). Ici A = [[1,-1],[1,0],[1,1],[1,2]] (colonne de 1, colonne des x) et b = (5 ; 1 ; −1 ; −1). Calcule AᵀA et Aᵀb, puis résous les équations normales.
  [guided]  AᵀA
    = [[4,2],[2,6]]   (cases à remplir : (1,1) (2,2))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (4 ; -8)   (cases à remplir : (1,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,2|4],[2,6|-8]]
    = L2 ← L2 - (1/2)L1 : [[4,2|4],[0,5|-10]]   (cases à remplir : (2,1) (2,2))   ← Réduire : L₂ ← L₂ − (1/2)L₁
    = L2 ← (1/5)L2 : [[4,2|4],[0,1|-2]]   (cases à remplir : (2,1) (2,2))   ← Pivot à 1
    = L1 ← L1 - 2L2 : [[4,0|8],[0,1|-2]]   (cases à remplir : (1,1) (1,3))   ← Réduire : L₁ ← L₁ − 2L₂
    = L1 ← (1/4)L1 : [[1,0|2],[0,1|-2]]   (cases à remplir : (1,2) (1,3))   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (2 ; -2)   (cases à remplir : (1,1))   ← Droite y = 2 − 2x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,2|4],[2,6|-8]] ; x̂ = (2 ; −2)
  pièges : l_lsq_normal_aat

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (0 ; 1), (2 ; 1), (3 ; −1), (5 ; −9). Ici A = [[1,0],[1,2],[1,3],[1,5]] (colonne de 1, colonne des x) et b = (1 ; 1 ; −1 ; −9). Calcule AᵀA et Aᵀb, puis résous les équations normales.
  [guided]  AᵀA
    = [[4,10],[10,38]]   (cases à remplir : (1,1) (2,1))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-8 ; -46)   (cases à remplir : (1,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,10|-8],[10,38|-46]]
    = L2 ← L2 - (5/2)L1 : [[4,10|-8],[0,13|-26]]   (cases à remplir : (2,1) (2,3))   ← Réduire : L₂ ← L₂ − (5/2)L₁
    = L2 ← (1/13)L2 : [[4,10|-8],[0,1|-2]]   (cases à remplir : (2,1) (2,3))   ← Pivot à 1
    = L1 ← L1 - 10L2 : [[4,0|12],[0,1|-2]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ − 10L₂
    = L1 ← (1/4)L1 : [[1,0|3],[0,1|-2]]   (cases à remplir : (1,2) (1,3))   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (3 ; -2)   (cases à remplir : (1,1))   ← Droite y = 3 − 2x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,10|-8],[10,38|-46]] ; x̂ = (3 ; −2)
  pièges : l_lsq_normal_aat

Soit A = [[0,2],[-2,2],[-2,1],[0,-2]] et b = (−8 ; 2 ; 1 ; 5). Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂. Calcule AᵀA et Aᵀb, puis résous les équations normales.
  [guided]  AᵀA
    = [[8,-6],[-6,13]]   (cases à remplir : (1,2) (2,2))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-6 ; -21)   (cases à remplir : (1,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[8,-6|-6],[-6,13|-21]]
    = L2 ← L2 + (3/4)L1 : [[8,-6|-6],[0,17/2|-51/2]]   (cases à remplir : (2,1) (2,3))   ← Réduire : L₂ ← L₂ + (3/4)L₁
    = L2 ← (2/17)L2 : [[8,-6|-6],[0,1|-3]]   (cases à remplir : (2,2) (2,3))   ← Pivot à 1
    = L1 ← L1 + 6L2 : [[8,0|-24],[0,1|-3]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ + 6L₂
    = L1 ← (1/8)L1 : [[1,0|-3],[0,1|-3]]   (cases à remplir : (1,1) (1,2))   ← Pivot à 1
  — La solution aux moindres carrés x̂  [juge mat]  départ : x̂
    = (-3 ; -3)   (cases à remplir : (2,1))   ← Lue sur la forme réduite
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[8, □], …] | [AᵀA | Aᵀb] = [[8,-6|-6],[-6,13|-21]] ; x̂ = (−3 ; −3)
  pièges : l_lsq_normal_aat

```

### Niveau 2

```
Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (0 ; 0), (1 ; −4), (2 ; −6), (3 ; −6). Ici A = [[1,0],[1,1],[1,2],[1,3]] (colonne de 1, colonne des x) et b = (0 ; −4 ; −6 ; −6).
  [guided]  AᵀA
    ? Comment trouver x̂ ? ✔ Résoudre les équations normales AᵀAx = Aᵀb / · Résoudre AAᵀx = Ab / · Résoudre Ax = b
    = [[4,6],[6,14]]   (cases à remplir : (1,2) (2,1))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-16 ; -34)   (cases à remplir : (2,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,6|-16],[6,14|-34]]
    = L2 ← L2 - (3/2)L1 : [[4,6|-16],[0,5|-10]]   (cases à remplir : (2,2) (2,3))   ← Réduire : L₂ ← L₂ − (3/2)L₁
    = L2 ← (1/5)L2 : [[4,6|-16],[0,1|-2]]   (cases à remplir : (2,2) (2,3))   ← Pivot à 1
    = L1 ← L1 - 6L2 : [[4,0|-4],[0,1|-2]]   (cases à remplir : (1,2) (1,3))   ← Réduire : L₁ ← L₁ − 6L₂
    = L1 ← (1/4)L1 : [[1,0|-1],[0,1|-2]]   (cases à remplir : (1,2) (1,3))   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (-1 ; -2)   (cases à remplir : (2,1))   ← Droite y = −1 − 2x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,6|-16],[6,14|-34]] ; x̂ = (−1 ; −2)
  pièges : l_lsq_normal_aat

Soit A = [[2,-2],[-1,2],[0,-2],[-1,-2]] et b = (−3 ; 2 ; −3 ; −6). Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂.
  [guided]  AᵀA
    ? Comment trouver x̂ ? ✔ Résoudre les équations normales AᵀAx = Aᵀb / · Résoudre Ax = b / · Résoudre AAᵀx = Ab
    = [[6,-4],[-4,16]]   (cases à remplir : (1,1) (2,2))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-2 ; 28)   (cases à remplir : (2,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[6,-4|-2],[-4,16|28]]
    = L2 ← L2 + (2/3)L1 : [[6,-4|-2],[0,40/3|80/3]]   (cases à remplir : (2,2) (2,3))   ← Réduire : L₂ ← L₂ + (2/3)L₁
    = L2 ← (3/40)L2 : [[6,-4|-2],[0,1|2]]   (cases à remplir : (2,1) (2,2))   ← Pivot à 1
    = L1 ← L1 + 4L2 : [[6,0|6],[0,1|2]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ + 4L₂
    = L1 ← (1/6)L1 : [[1,0|1],[0,1|2]]   (cases à remplir : (1,2) (1,3))   ← Pivot à 1
  — La solution aux moindres carrés x̂  [juge mat]  départ : x̂
    = (1 ; 2)   (cases à remplir : (1,1))   ← Lue sur la forme réduite
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[6, □], …] | [AᵀA | Aᵀb] = [[6,-4|-2],[-4,16|28]] ; x̂ = (1 ; 2)
  pièges : l_lsq_normal_aat

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (0 ; 2), (1 ; 2), (2 ; −1), (3 ; −2), (4 ; −1). Ici A = [[1,0],[1,1],[1,2],[1,3],[1,4]] (colonne de 1, colonne des x) et b = (2 ; 2 ; −1 ; −2 ; −1).
  [guided]  AᵀA
    ? Comment trouver x̂ ? · Résoudre AAᵀx = Ab / · Résoudre Ax = b / ✔ Résoudre les équations normales AᵀAx = Aᵀb
    = [[5,10],[10,30]]   (cases à remplir : (2,1) (2,2))
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (0 ; -10)   (cases à remplir : (2,1))   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[5,10|0],[10,30|-10]]
    = L2 ← L2 - 2L1 : [[5,10|0],[0,10|-10]]   (cases à remplir : (2,2) (2,3))   ← Réduire : L₂ ← L₂ − 2L₁
    = L2 ← (1/10)L2 : [[5,10|0],[0,1|-1]]   (cases à remplir : (2,1) (2,3))   ← Pivot à 1
    = L1 ← L1 - 10L2 : [[5,0|10],[0,1|-1]]   (cases à remplir : (1,1) (1,2))   ← Réduire : L₁ ← L₁ − 10L₂
    = L1 ← (1/5)L1 : [[1,0|2],[0,1|-1]]   (cases à remplir : (1,1) (1,3))   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (2 ; -1)   (cases à remplir : (2,1))   ← Droite y = 2 − x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[5, □], …] | [AᵀA | Aᵀb] = [[5,10|0],[10,30|-10]] ; x̂ = (2 ; −1)
  pièges : l_lsq_normal_aat

```

### Niveau 3

```
Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (0 ; 2), (1 ; −4), (2 ; −4), (4 ; −11) : pose A et b, calcule AᵀA et Aᵀb, puis réduis (choisis chaque opération).
  [tap, suivre l'erreur, menu rowops]  A
    = [[1,0],[1,1],[1,2],[1,4]]   ← Une colonne de 1, une colonne des x
  — Le second membre  [juge mat]  départ : b
    = (2 ; -4 ; -4 ; -11)   ← Les y des points
  — Équations normales : AᵀA  [juge mat]  départ : AᵀA
    = [[4,7],[7,21]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-17 ; -56)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,7|-17],[7,21|-56]]
    = L2 ← L2 - (7/4)L1 : [[4,7|-17],[0,35/4|-105/4]]   ← Réduire : L₂ ← L₂ − (7/4)L₁
    = L2 ← (4/35)L2 : [[4,7|-17],[0,1|-3]]   ← Pivot à 1
    = L1 ← L1 - 7L2 : [[4,0|4],[0,1|-3]]   ← Réduire : L₁ ← L₁ − 7L₂
    = L1 ← (1/4)L1 : [[1,0|1],[0,1|-3]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (1 ; -3)   ← Droite y = 1 − 3x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,7|-17],[7,21|-56]] ; x̂ = (1 ; −3)

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (1 ; −4), (2 ; −3), (3 ; −4), (4 ; −7) : pose A et b, calcule AᵀA et Aᵀb, puis réduis (choisis chaque opération).
  [tap, suivre l'erreur, menu rowops]  A
    = [[1,1],[1,2],[1,3],[1,4]]   ← Une colonne de 1, une colonne des x
  — Le second membre  [juge mat]  départ : b
    = (-4 ; -3 ; -4 ; -7)   ← Les y des points
  — Équations normales : AᵀA  [juge mat]  départ : AᵀA
    = [[4,10],[10,30]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (-18 ; -50)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,10|-18],[10,30|-50]]
    = L2 ← L2 - (5/2)L1 : [[4,10|-18],[0,5|-5]]   ← Réduire : L₂ ← L₂ − (5/2)L₁
    = L2 ← (1/5)L2 : [[4,10|-18],[0,1|-1]]   ← Pivot à 1
    = L1 ← L1 - 10L2 : [[4,0|-8],[0,1|-1]]   ← Réduire : L₁ ← L₁ − 10L₂
    = L1 ← (1/4)L1 : [[1,0|-2],[0,1|-1]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (-2 ; -1)   ← Droite y = −2 − x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,10|-18],[10,30|-50]] ; x̂ = (−2 ; −1)

Soit A = [[-2,0],[0,-1],[0,-1],[-2,2]] et b = (−5 ; −6 ; −2 ; −1). Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂ : équations normales, puis réduction (choisis chaque opération).
  [tap, suivre l'erreur, menu rowops]  AᵀA
    = [[8,-4],[-4,6]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = (12 ; 6)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[8,-4|12],[-4,6|6]]
    = L2 ← L2 + (1/2)L1 : [[8,-4|12],[0,4|12]]   ← Réduire : L₂ ← L₂ + (1/2)L₁
    = L2 ← (1/4)L2 : [[8,-4|12],[0,1|3]]   ← Pivot à 1
    = L1 ← L1 + 4L2 : [[8,0|24],[0,1|3]]   ← Réduire : L₁ ← L₁ + 4L₂
    = L1 ← (1/8)L1 : [[1,0|3],[0,1|3]]   ← Pivot à 1
  — La solution aux moindres carrés x̂  [juge mat]  départ : x̂
    = (3 ; 3)   ← Lue sur la forme réduite
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[8, □], …] | [AᵀA | Aᵀb] = [[8,-4|12],[-4,6|6]] ; x̂ = (3 ; 3)
  pièges : l_lsq_normal_aat

```

### Niveau 4

```
Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 0), (0 ; −2), (2 ; 8), (3 ; 10).
  [free, suivre l'erreur]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[4,4],[4,14]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(0 ; -2 ; 8 ; 10)
    = (16 ; 46)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,4|16],[4,14|46]]
    = L2 ← L2 - L1 : [[4,4|16],[0,10|30]]   ← Réduire : L₂ ← L₂ − L₁
    = L2 ← (1/10)L2 : [[4,4|16],[0,1|3]]   ← Pivot à 1
    = L1 ← L1 - 4L2 : [[4,0|4],[0,1|3]]   ← Réduire : L₁ ← L₁ − 4L₂
    = L1 ← (1/4)L1 : [[1,0|1],[0,1|3]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (1 ; 3)   ← Droite y = 1 + 3x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,4|16],[4,14|46]] ; x̂ = (1 ; 3)
  pièges : l_lsq_normal_aat

Soit A = [[0,1,0],[1,0,2],[1,-1,0],[-1,2,2]] et b = (1 ; 6 ; 0 ; 0). Le système Ax = b est incompatible. Trouve la solution aux moindres carrés x̂, puis l'erreur ‖b − Ax̂‖.
  [free, suivre l'erreur]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[3,-3,0],[-3,6,4],[0,4,8]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(1 ; 6 ; 0 ; 0)
    = (6 ; 1 ; 12)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[3,-3,0|6],[-3,6,4|1],[0,4,8|12]]
    = L2 ← L2 + L1 : [[3,-3,0|6],[0,3,4|7],[0,4,8|12]]   ← Réduire : L₂ ← L₂ + L₁
    = L3 ← L3 - (4/3)L2 : [[3,-3,0|6],[0,3,4|7],[0,0,8/3|8/3]]   ← Réduire : L₃ ← L₃ − (4/3)L₂
    = L3 ← (3/8)L3 : [[3,-3,0|6],[0,3,4|7],[0,0,1|1]]   ← Pivot à 1
    = L2 ← L2 - 4L3 : [[3,-3,0|6],[0,3,0|3],[0,0,1|1]]   ← Réduire : L₂ ← L₂ − 4L₃
    = L2 ← (1/3)L2 : [[3,-3,0|6],[0,1,0|1],[0,0,1|1]]   ← Pivot à 1
    = L1 ← L1 + 3L2 : [[3,0,0|9],[0,1,0|1],[0,0,1|1]]   ← Réduire : L₁ ← L₁ + 3L₂
    = L1 ← (1/3)L1 : [[1,0,0|3],[0,1,0|1],[0,0,1|1]]   ← Pivot à 1
  — La solution aux moindres carrés x̂  [juge mat]  départ : x̂
    = (3 ; 1 ; 1)   ← Lue sur la forme réduite
  — Le résidu b − Ax̂ (orthogonal aux colonnes de A)  [juge mat]  départ : b - Ax̂
    = (1 ; 6 ; 0 ; 0) - A·(3 ; 1 ; 1)
    = (0 ; 1 ; -2 ; -1)   ← Aᵀ(b − Ax̂) = 0
  — L'erreur ‖b − Ax̂‖  [juge value]  départ : √(r·r)
    = √(0 + 1 + 4 + 1)
    = √6
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[3, □, 0], …] | [AᵀA | Aᵀb] = [[3,-3,0|6],[-3,6,4|1],[0,4,8|12]] ; x̂ = (3 ; 1 ; 1)
  pièges : l_lsq_normal_aat

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (1 ; 4), (2 ; 3), (3 ; 4), (4 ; 7).
  [free, suivre l'erreur]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[4,10],[10,30]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(4 ; 3 ; 4 ; 7)
    = (18 ; 50)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,10|18],[10,30|50]]
    = L2 ← L2 - (5/2)L1 : [[4,10|18],[0,5|5]]   ← Réduire : L₂ ← L₂ − (5/2)L₁
    = L2 ← (1/5)L2 : [[4,10|18],[0,1|1]]   ← Pivot à 1
    = L1 ← L1 - 10L2 : [[4,0|8],[0,1|1]]   ← Réduire : L₁ ← L₁ − 10L₂
    = L1 ← (1/4)L1 : [[1,0|2],[0,1|1]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (2 ; 1)   ← Droite y = 2 + x
  aides : Multiplie Ax = b à gauche par Aᵀ : les équations normales AᵀAx = Aᵀb ont une solution. | AᵀA = [[4, □], …] | [AᵀA | Aᵀb] = [[4,10|18],[10,30|50]] ; x̂ = (2 ; 1)
  pièges : l_lsq_normal_aat

```

### Niveau 5

```
Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 6), (0 ; 0), (1 ; 2), (2 ; 2).
  [free, sans aide]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[4,2],[2,6]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(6 ; 0 ; 2 ; 2)
    = (10 ; 0)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,2|10],[2,6|0]]
    = L2 ← L2 - (1/2)L1 : [[4,2|10],[0,5|-5]]   ← Réduire : L₂ ← L₂ − (1/2)L₁
    = L2 ← (1/5)L2 : [[4,2|10],[0,1|-1]]   ← Pivot à 1
    = L1 ← L1 - 2L2 : [[4,0|12],[0,1|-1]]   ← Réduire : L₁ ← L₁ − 2L₂
    = L1 ← (1/4)L1 : [[1,0|3],[0,1|-1]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (3 ; -1)   ← Droite y = 3 − x
  pièges : l_lsq_normal_aat

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (0 ; −2), (1 ; 3), (2 ; 2), (4 ; 7).
  [free, sans aide]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[4,7],[7,21]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(-2 ; 3 ; 2 ; 7)
    = (10 ; 35)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,7|10],[7,21|35]]
    = L2 ← L2 - (7/4)L1 : [[4,7|10],[0,35/4|35/2]]   ← Réduire : L₂ ← L₂ − (7/4)L₁
    = L2 ← (4/35)L2 : [[4,7|10],[0,1|2]]   ← Pivot à 1
    = L1 ← L1 - 7L2 : [[4,0|-4],[0,1|2]]   ← Réduire : L₁ ← L₁ − 7L₂
    = L1 ← (1/4)L1 : [[1,0|-1],[0,1|2]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (-1 ; 2)   ← Droite y = −1 + 2x
  pièges : l_lsq_normal_aat

Trouve la droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 1), (0 ; −2), (2 ; 6), (3 ; 7).
  [free, sans aide]  AᵀA
    = A^T·A   ← Aᵀ à gauche
    = [[4,4],[4,14]]   ← Produits des colonnes de A
  — Équations normales : Aᵀb  [juge mat]  départ : Aᵀb
    = A^T·(1 ; -2 ; 6 ; 7)
    = (12 ; 32)   ← Colonnes de A · b
  — Résoudre AᵀAx = Aᵀb : réduis [AᵀA | Aᵀb].  [juge rowops]  départ : [[4,4|12],[4,14|32]]
    = L2 ← L2 - L1 : [[4,4|12],[0,10|20]]   ← Réduire : L₂ ← L₂ − L₁
    = L2 ← (1/10)L2 : [[4,4|12],[0,1|2]]   ← Pivot à 1
    = L1 ← L1 - 4L2 : [[4,0|4],[0,1|2]]   ← Réduire : L₁ ← L₁ − 4L₂
    = L1 ← (1/4)L1 : [[1,0|1],[0,1|2]]   ← Pivot à 1
  — La solution x̂ = (β₀ ; β₁)  [juge mat]  départ : x̂
    = (1 ; 2)   ← Droite y = 1 + 2x
  pièges : l_lsq_normal_aat

```

### Variantes d'examen

```
On cherche la droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 3), (0 ; 0), (1 ; −1), (2 ; 0). Que vaut β₀ ?
  [free, sans aide, examen coef]  β_0
    = 1
  pièges : l_lsq_square_subsystem, l_lsq_line_swap

La droite des moindres carrés y = β₀ + β₁x pour les points (−1 ; 3), (0 ; 2), (1 ; −1), (2 ; −6), (3 ; −8) est :
  ✔ y = 1 − 3x   · y = −3 + x [l_lsq_line_swap]   · y = −1 − 3x   · y = 2 − x [l_lsq_square_subsystem]
  [examen mcq]
  pièges : l_lsq_line_swap, l_lsq_square_subsystem

Vrai ou faux ?
  « Pour toute matrice A, la matrice AᵀA est inversible. » → FAUX
    contre-exemple (matOne) : A = [[2,4],[1,2],[0,0]]
  [examen tf]

```

## Produits scalaires non standards (`l-orth-inner`, BA1)

_Symétrique, bilinéaire, défini positif._

### Niveau 1

```
Sur P₂, on pose ⟨p, q⟩ = p(0)q(0) + p(1)q(1) + p(2)q(2). Soit p = 2 − t + t² et q = −2 + t + t². Calcule ⟨p, q⟩, puis ‖p‖.
  [guided]  p·q
    = □·(−2) + 2·□ + 4·4   (trous : 2·(−2) + 2·0 + 4·4)   ← Valeurs aux points, multipliées
    = 12
  — ‖p‖ = √⟨p, p⟩  [juge value]  départ : √(p·p)
    = √(□² + □² + 4²)   (trous : √(2² + 2² + 4²))   ← Somme des carrés des valeurs
    = 2√6
  aides : Calcule les valeurs de p et de q aux points, multiplie-les deux à deux, puis additionne. | p : p(0) = 2, p(1) = 2, p(2) = 4 | ⟨p, q⟩ = 12

Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1). Soit p = 2t² et q = −2 − 2t − 2t². Calcule ⟨p, q⟩, puis ‖p‖.
  [guided]  p·q
    = □·(−2) + 0·(−□) + 2·(−6)   (trous : 2·(−2) + 0·(−2) + 2·(−6))   ← Valeurs aux points, multipliées
    = −16
  — ‖p‖ = √⟨p, p⟩  [juge value]  départ : √(p·p)
    = √(□² + □² + 2²)   (trous : √(2² + 0² + 2²))   ← Somme des carrés des valeurs
    = 2√2
  aides : Calcule les valeurs de p et de q aux points, multiplie-les deux à deux, puis additionne. | p : p(−1) = 2, p(0) = 0, p(1) = 2 | ⟨p, q⟩ = −16

Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(0)q(0) + p(2)q(2). Soit p = −1 − 2t et q = −1 + t + 2t². Calcule ⟨p, q⟩, puis ‖p‖.
  [guided]  p·q
    = □·5 + (−1)·(−□) + (−5)·9   (trous : 3·5 + (−1)·(−1) + (−5)·9)   ← Valeurs aux points, multipliées
    = −29
  — ‖p‖ = √⟨p, p⟩  [juge value]  départ : √(p·p)
    = √(□² + (−□)² + (−5)²)   (trous : √(3² + (−1)² + (−5)²))   ← Somme des carrés des valeurs
    = √35
  aides : Calcule les valeurs de p et de q aux points, multiplie-les deux à deux, puis additionne. | p : p(−2) = 3, p(0) = −1, p(2) = −5 | ⟨p, q⟩ = −29

```

### Niveau 2

```
Sur P₂, on pose ⟨p, q⟩ = p(0)q(0) + p(2)q(2). Est-ce un produit scalaire ? Teste p = −2t + t².
  [guided]  p·p
    ? Quel axiome tombe ? · La symétrie / · La linéarité / ✔ Défini positif : un polynôme non nul peut avoir ⟨p, p⟩ = 0
    = □·0 + 0·□   (trous : 0·0 + 0·0)   ← Valeurs aux points, multipliées
    = 0
  aides : Un produit scalaire vérifie ⟨p, p⟩ > 0 pour tout p ≠ 0. Cherche un polynôme non nul qui s'annule aux deux points. | p(0) = □, p(2) = □ | ⟨p, p⟩ = 0 alors que p ≠ 0

Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0). Est-ce un produit scalaire ? Teste p = t + t².
  [guided]  p·p
    ? Quel axiome tombe ? ✔ Défini positif : un polynôme non nul peut avoir ⟨p, p⟩ = 0 / · La linéarité / · La symétrie
    = □·0 + 0·□   (trous : 0·0 + 0·0)   ← Valeurs aux points, multipliées
    = 0
  aides : Un produit scalaire vérifie ⟨p, p⟩ > 0 pour tout p ≠ 0. Cherche un polynôme non nul qui s'annule aux deux points. | p(−1) = □, p(0) = □ | ⟨p, p⟩ = 0 alors que p ≠ 0

Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(2)q(2). Est-ce un produit scalaire ? Teste p = −2 − t + t².
  [guided]  p·p
    ? Quel axiome tombe ? · La symétrie / ✔ Défini positif : un polynôme non nul peut avoir ⟨p, p⟩ = 0 / · La linéarité
    = □·0 + 0·□   (trous : 0·0 + 0·0)   ← Valeurs aux points, multipliées
    = 0
  aides : Un produit scalaire vérifie ⟨p, p⟩ > 0 pour tout p ≠ 0. Cherche un polynôme non nul qui s'annule aux deux points. | p(−1) = □, p(2) = □ | ⟨p, p⟩ = 0 alors que p ≠ 0

```

### Niveau 3

```
Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(0)q(0) + p(2)q(2). Projette q = −1 − t + 2t² sur Span{1, t}.
  [tap, suivre l'erreur, menu menu]  1·t
    = 1·(−2) + 1·0 + 1·2
    = 0   ← Base orthogonale
  — Coefficient de 1 : ⟨q, 1⟩ / ⟨1, 1⟩  [juge value]  départ : q·1/(1·1)
    = (9·1 + (−1)·1 + 5·1)/(1·1 + 1·1 + 1·1)   ← Valeurs aux points
    = 13/3
  — Coefficient de t : ⟨q, t⟩ / ⟨t, t⟩  [juge value]  départ : q·t/(t·t)
    = (9·(−2) + (−1)·0 + 5·2)/((−2)·(−2) + 0·0 + 2·2)   ← Valeurs aux points
    = −1
  — La projection c₀·1 + c₁·t  [juge poly]  départ : (13/3) + (−8/8)·t
    = 13/3 − t
  aides : Vérifie que 1 et t sont orthogonaux pour ce produit, puis applique la formule de projection avec ⟨ , ⟩. | proj = (□/3)·1 + (□/8)·t | proj = 13/3 − t

Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(0)q(0) + p(2)q(2). Projette q = −2 + 2t² sur Span{1, t}.
  [tap, suivre l'erreur, menu menu]  1·t
    = 1·(−2) + 1·0 + 1·2
    = 0   ← Base orthogonale
  — Coefficient de 1 : ⟨q, 1⟩ / ⟨1, 1⟩  [juge value]  départ : q·1/(1·1)
    = (6·1 + (−2)·1 + 6·1)/(1·1 + 1·1 + 1·1)   ← Valeurs aux points
    = 10/3
  — Coefficient de t : ⟨q, t⟩ / ⟨t, t⟩  [juge value]  départ : q·t/(t·t)
    = (6·(−2) + (−2)·0 + 6·2)/((−2)·(−2) + 0·0 + 2·2)   ← Valeurs aux points
    = 0
  — La projection c₀·1 + c₁·t  [juge poly]  départ : (10/3) + (0/8)·t
    = 10/3
  aides : Vérifie que 1 et t sont orthogonaux pour ce produit, puis applique la formule de projection avec ⟨ , ⟩. | proj = (□/3)·1 + (□/8)·t | proj = 10/3

Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(0)q(0) + p(2)q(2). Projette q = 2 + 2t − 2t² sur Span{1, t}.
  [tap, suivre l'erreur, menu menu]  1·t
    = 1·(−2) + 1·0 + 1·2
    = 0   ← Base orthogonale
  — Coefficient de 1 : ⟨q, 1⟩ / ⟨1, 1⟩  [juge value]  départ : q·1/(1·1)
    = ((−10)·1 + 2·1 + (−2)·1)/(1·1 + 1·1 + 1·1)   ← Valeurs aux points
    = −10/3
  — Coefficient de t : ⟨q, t⟩ / ⟨t, t⟩  [juge value]  départ : q·t/(t·t)
    = ((−10)·(−2) + 2·0 + (−2)·2)/((−2)·(−2) + 0·0 + 2·2)   ← Valeurs aux points
    = 2
  — La projection c₀·1 + c₁·t  [juge poly]  départ : (−10/3) + (16/8)·t
    = −10/3 + 2t
  aides : Vérifie que 1 et t sont orthogonaux pour ce produit, puis applique la formule de projection avec ⟨ , ⟩. | proj = (□/3)·1 + (□/8)·t | proj = −10/3 + 2t

```

### Niveau 4

```
Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1). Applique Gram-Schmidt à (1, t, t²) : v₀ = 1, puis v₁, puis v₂.
  [free, suivre l'erreur]  t·1
    = (−1)·1 + 0·1 + 1·1
    = 0
  — v₁ = t − (⟨t, 1⟩/⟨1, 1⟩)·1  [juge poly]  départ : t − (0/3)
    = t
  — ⟨t², v₁⟩ (et ⟨t², 1⟩ = 2)  [juge value]  départ : q·v_1
    = 1·(−1) + 0·0 + 1·1
    = 0
  — ⟨v₁, v₁⟩  [juge value]  départ : v_1·v_1
    = (−1)·(−1) + 0·0 + 1·1
    = 2
  — v₂ = t² − (⟨t², 1⟩/⟨1, 1⟩)·1 − (⟨t², v₁⟩/⟨v₁, v₁⟩)·v₁  [juge poly]  départ : t² − (2/3) − ((0)/(2))·(t)
    = −2/3 + t²
  aides : Mêmes formules que dans ℝⁿ, avec ce produit scalaire : vⱼ = xⱼ − Σ (⟨xⱼ, vᵢ⟩/⟨vᵢ, vᵢ⟩)·vᵢ. | v₁ = t − (□/3)·1 | v₁ = t, v₂ = −2/3 + t²

Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(−1)q(−1) + p(1)q(1). Applique Gram-Schmidt à (1, t, t²) : v₀ = 1, puis v₁, puis v₂.
  [free, suivre l'erreur]  t·1
    = (−2)·1 + (−1)·1 + 1·1
    = −2
  — v₁ = t − (⟨t, 1⟩/⟨1, 1⟩)·1  [juge poly]  départ : t − (−2/3)
    = 2/3 + t
  — ⟨t², v₁⟩ (et ⟨t², 1⟩ = 6)  [juge value]  départ : q·v_1
    = 4·(−4/3) + 1·(−1/3) + 1·(5/3)
    = −4
  — ⟨v₁, v₁⟩  [juge value]  départ : v_1·v_1
    = (−4/3)·(−4/3) + (−1/3)·(−1/3) + (5/3)·(5/3)
    = 14/3
  — v₂ = t² − (⟨t², 1⟩/⟨1, 1⟩)·1 − (⟨t², v₁⟩/⟨v₁, v₁⟩)·v₁  [juge poly]  départ : t² − (6/3) − ((−4)/(14/3))·(2/3 + t)
    = −10/7 + (6/7)t + t²
  aides : Mêmes formules que dans ℝⁿ, avec ce produit scalaire : vⱼ = xⱼ − Σ (⟨xⱼ, vᵢ⟩/⟨vᵢ, vᵢ⟩)·vᵢ. | v₁ = t − (□/3)·1 | v₁ = 2/3 + t, v₂ = −10/7 + (6/7)t + t²

Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1). Applique Gram-Schmidt à (1, t, t²) : v₀ = 1, puis v₁, puis v₂.
  [free, suivre l'erreur]  t·1
    = (−1)·1 + 0·1 + 1·1
    = 0
  — v₁ = t − (⟨t, 1⟩/⟨1, 1⟩)·1  [juge poly]  départ : t − (0/3)
    = t
  — ⟨t², v₁⟩ (et ⟨t², 1⟩ = 2)  [juge value]  départ : q·v_1
    = 1·(−1) + 0·0 + 1·1
    = 0
  — ⟨v₁, v₁⟩  [juge value]  départ : v_1·v_1
    = (−1)·(−1) + 0·0 + 1·1
    = 2
  — v₂ = t² − (⟨t², 1⟩/⟨1, 1⟩)·1 − (⟨t², v₁⟩/⟨v₁, v₁⟩)·v₁  [juge poly]  départ : t² − (2/3) − ((0)/(2))·(t)
    = −2/3 + t²
  aides : Mêmes formules que dans ℝⁿ, avec ce produit scalaire : vⱼ = xⱼ − Σ (⟨xⱼ, vᵢ⟩/⟨vᵢ, vᵢ⟩)·vᵢ. | v₁ = t − (□/3)·1 | v₁ = t, v₂ = −2/3 + t²

```

### Niveau 5

```
Sur P₂, on pose ⟨p, q⟩ = p(−2)q(−2) + p(0)q(0) + p(2)q(2). Projette q = −1 − t² sur Span{1, t}.
  [free, sans aide]  1·t
    = 1·(−2) + 1·0 + 1·2
    = 0   ← Base orthogonale
  — Coefficient de 1 : ⟨q, 1⟩ / ⟨1, 1⟩  [juge value]  départ : q·1/(1·1)
    = ((−5)·1 + (−1)·1 + (−5)·1)/(1·1 + 1·1 + 1·1)   ← Valeurs aux points
    = −11/3
  — Coefficient de t : ⟨q, t⟩ / ⟨t, t⟩  [juge value]  départ : q·t/(t·t)
    = ((−5)·(−2) + (−1)·0 + (−5)·2)/((−2)·(−2) + 0·0 + 2·2)   ← Valeurs aux points
    = 0
  — La projection c₀·1 + c₁·t  [juge poly]  départ : (−11/3) + (0/8)·t
    = −11/3

Soit A = [[1,-1],[-2,2]] et ⟨u, v⟩ = uᵀAᵀAv sur ℝ². Est-ce un produit scalaire ? Si non, donne u ≠ 0 avec ⟨u, u⟩ = 0.
  [free, sans aide]  u
    ? ⟨u, v⟩ = uᵀAᵀAv est-il un produit scalaire sur ℝ² ? ✔ Non : A n'est pas inversible / · Oui : uᵀAᵀAu = ‖Au‖² ≥ 0
    = (1 ; 1)   ← Au = 0 : un vecteur du noyau
  — ⟨u, u⟩ = (Au) · (Au) = ‖Au‖²  [juge mat]  départ : ⟨u,u⟩
    = 0   ← Au = 0
  pièges : l_inner_positivity

Soit A = [[3,1],[-3,-1]] et ⟨u, v⟩ = uᵀAᵀAv sur ℝ². Est-ce un produit scalaire ? Si non, donne u ≠ 0 avec ⟨u, u⟩ = 0.
  [free, sans aide]  u
    ? ⟨u, v⟩ = uᵀAᵀAv est-il un produit scalaire sur ℝ² ? · Oui : uᵀAᵀAu = ‖Au‖² ≥ 0 / ✔ Non : A n'est pas inversible
    = (-1 ; 3)   ← Au = 0 : un vecteur du noyau
  — ⟨u, u⟩ = (Au) · (Au) = ‖Au‖²  [juge mat]  départ : ⟨u,u⟩
    = 0   ← Au = 0
  pièges : l_inner_positivity

```

### Variantes d'examen

```
Sur P₂, on pose ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1). Avec p = −2 − 2t² et q = 1 − t − 2t², ⟨p, q⟩ vaut :
  · −2   · 2   · −6   ✔ 6
  [examen mcq]

Vrai ou faux ?
  « ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1) est un produit scalaire sur P₂. » → VRAI
  [examen tf]

```

## Diagonalisation orthogonale A = QDQᵀ (`l-sym-orthodiag`, BA1)

_Symétrique ⇔ orthodiagonalisable._

### Niveau 1

```
A = [[6,-2],[-2,3]] a les valeurs propres λ₁ = 2 et λ₂ = 7. Trouve un vecteur propre pour chacune, normalise-les, puis écris A = QDQᵀ.
  [guided]  E_(2)
    (Un vecteur propre pour λ = 2.)
    = (1 ; 2)   (cases à remplir : (1,1))   ← (A − 2I)v = 0
  — Un vecteur propre pour λ = 7.  [juge eigvec]  départ : E_(7)
    = (2 ; -1)   (cases à remplir : (1,1))   ← (A − 7I)v = 0
  — La norme de (1 ; 2) (et de (2 ; −1)).  [juge value]  départ : √(1² + 2²)
    = □   (trous : √5)   ← La norme de v₂ est la même
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = (1/√5)·[[1,2],[2,-1]]   (cases à remplir : (1,1) (2,2))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(2,7)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | Q = [(1 ; 2)/□, (2 ; −1)/□] | Q=15·[122−1], D=diag(2,7)
  pièges : l_eigvec_row

A = [[6,-6],[-6,-3]] a les valeurs propres λ₁ = −6 et λ₂ = 9. Trouve un vecteur propre pour chacune, normalise-les, puis écris A = QDQᵀ.
  [guided]  E_(−6)
    (Un vecteur propre pour λ = −6.)
    = (1 ; 2)   (cases à remplir : (1,1))   ← (A + 6I)v = 0
  — Un vecteur propre pour λ = 9.  [juge eigvec]  départ : E_(9)
    = (2 ; -1)   (cases à remplir : (1,1))   ← (A − 9I)v = 0
  — La norme de (1 ; 2) (et de (2 ; −1)).  [juge value]  départ : √(1² + 2²)
    = □   (trous : √5)   ← La norme de v₂ est la même
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = (1/√5)·[[1,2],[2,-1]]   (cases à remplir : (1,1) (2,2))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(−6,9)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | Q = [(1 ; 2)/□, (2 ; −1)/□] | Q=15·[122−1], D=diag(−6,9)
  pièges : l_eigvec_row

A = [[7,-4],[-4,1]] a les valeurs propres λ₁ = −1 et λ₂ = 9. Trouve un vecteur propre pour chacune, normalise-les, puis écris A = QDQᵀ.
  [guided]  E_(−1)
    (Un vecteur propre pour λ = −1.)
    = (1 ; 2)   (cases à remplir : (1,1))   ← (A + I)v = 0
  — Un vecteur propre pour λ = 9.  [juge eigvec]  départ : E_(9)
    = (2 ; -1)   (cases à remplir : (1,1))   ← (A − 9I)v = 0
  — La norme de (1 ; 2) (et de (2 ; −1)).  [juge value]  départ : √(1² + 2²)
    = □   (trous : √5)   ← La norme de v₂ est la même
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = (1/√5)·[[1,2],[2,-1]]   (cases à remplir : (1,1) (2,2))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(−1,9)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | Q = [(1 ; 2)/□, (2 ; −1)/□] | Q=15·[122−1], D=diag(−1,9)
  pièges : l_eigvec_row

```

### Niveau 2

```
A = [[-1,1,1],[1,-1,1],[1,1,-1]] a les valeurs propres −2 (double) et 1. Orthodiagonalise A : A = QDQᵀ, valeurs propres dans l'ordre croissant.
  [guided]  E_(−2)
    (Une base de l'espace propre de λ = −2 (dimension 2).)
    = (1 ; -1 ; 0), (1 ; 0 ; -1)   ← Solutions de (A + 2I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 0 ; -1)
    ? La base de E₋₂ n'est pas orthogonale. Que fais-tu ? ✔ Gram-Schmidt dans cet espace propre, puis normaliser / · Seulement normaliser
    = (1 ; -1 ; 0), (1 ; 1 ; -2)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 1 ; -2)
    = (1/√2 ; -1/√2 ; 0), (1/√6 ; 1/√6 ; -2/√6)   ← Chaque vecteur divisé par sa norme
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : E_(1)
    = (1 ; 1 ; 1)   (cases à remplir : (1,1))   ← (A − I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√2,1/√6,1/√3],[-1/√2,1/√6,1/√3],[0,-2/√6,1/√3]]   (cases à remplir : (1,1) (3,3))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(-2,-2,1)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; 1 ; □)/√□ | Q=[121613−1216130−2613], D=diag(−2,−2,1)
  pièges : l_orthodiag_no_gs

A = [[3,2,-2],[2,3,-2],[-2,-2,3]] a les valeurs propres 1 (double) et 7. Orthodiagonalise A : A = QDQᵀ, valeurs propres dans l'ordre croissant.
  [guided]  E_(1)
    (Une base de l'espace propre de λ = 1 (dimension 2).)
    = (1 ; -1 ; 0), (1 ; 0 ; 1)   ← Solutions de (A − I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 0 ; 1)
    ? La base de E₁ n'est pas orthogonale. Que fais-tu ? ✔ Gram-Schmidt dans cet espace propre, puis normaliser / · Seulement normaliser
    = (1 ; -1 ; 0), (1 ; 1 ; 2)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 1 ; 2)
    = (1/√2 ; -1/√2 ; 0), (1/√6 ; 1/√6 ; 2/√6)   ← Chaque vecteur divisé par sa norme
  — Un vecteur propre pour λ = 7.  [juge eigvec]  départ : E_(7)
    = (1 ; 1 ; -1)   (cases à remplir : (1,1))   ← (A − 7I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√2,1/√6,1/√3],[-1/√2,1/√6,1/√3],[0,2/√6,-1/√3]]   (cases à remplir : (1,1) (3,3))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(1,1,7)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; 1 ; □)/√□ | Q=[121613−121613026−13], D=diag(1,1,7)
  pièges : l_orthodiag_no_gs

A = [[-3,2,-1],[2,-6,2],[-1,2,-3]] a les valeurs propres −8 et −2 (double). Orthodiagonalise A : A = QDQᵀ, valeurs propres dans l'ordre croissant.
  [guided]  E_(−8)
    (Un vecteur propre pour λ = −8.)
    = (1 ; -2 ; 1)   (cases à remplir : (1,1))   ← (A + 8I)v = 0
  — Une base de l'espace propre de λ = −2 (dimension 2).  [juge span]  départ : E_(−2)
    = (2 ; 1 ; 0), (1 ; 0 ; -1)   ← Solutions de (A + 2I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (2 ; 1 ; 0), (1 ; 0 ; -1)
    ? La base de E₋₂ n'est pas orthogonale. Que fais-tu ? ✔ Gram-Schmidt dans cet espace propre, puis normaliser / · Seulement normaliser
    = (2 ; 1 ; 0), (1 ; -2 ; -5)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (2 ; 1 ; 0), (1 ; -2 ; -5)
    = (2/√5 ; 1/√5 ; 0), (1/√30 ; -2/√30 ; -5/√30)   ← Chaque vecteur divisé par sa norme
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√6,2/√5,1/√30],[-2/√6,1/√5,-2/√30],[1/√6,0,-5/√30]]   (cases à remplir : (1,1) (3,3))   ← Colonnes : les vecteurs propres normalisés
    = D = diag(-8,-2,-2)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; −2 ; □)/√□ | Q=[1625130−2615−230160−530], D=diag(−8,−2,−2)
  pièges : l_eigvec_row, l_orthodiag_no_gs

```

### Niveau 3

```
Orthodiagonalise A = [[-1,-2,-2],[-2,0,-3],[-2,-3,0]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (−5 − λ)(1 − λ)(3 − λ)   ← Valeurs propres −5, 1 et 3
  — Un vecteur propre pour λ = −5.  [juge eigvec]  départ : E_(−5)
    = (1 ; 1 ; 1)   ← (A + 5I)v = 0
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : E_(1)
    = (2 ; -1 ; -1)   ← (A − I)v = 0
  — Un vecteur propre pour λ = 3.  [juge eigvec]  départ : E_(3)
    = (0 ; 1 ; -1)   ← (A − 3I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√3,2/√6,0],[1/√3,-1/√6,1/√2],[1/√3,-1/√6,-1/√2]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(-5,1,3)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | Q = [(1 ; 1 ; 1)/□, (2 ; −1 ; −1)/□, (0 ; 1 ; −1)/□] | Q=[1326013−161213−16−12], D=diag(−5,1,3)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Orthodiagonalise A = [[5,-4,2],[-4,11,-4],[2,-4,5]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (3 − λ)²(15 − λ)   ← Valeurs propres 3 et 15
  — Une base de l'espace propre de λ = 3 (dimension 2).  [juge span]  départ : E_(3)
    = (2 ; 1 ; 0), (1 ; 0 ; -1)   ← Solutions de (A − 3I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (2 ; 1 ; 0), (1 ; 0 ; -1)
    = (2 ; 1 ; 0), (1 ; -2 ; -5)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (2 ; 1 ; 0), (1 ; -2 ; -5)
    = (2/√5 ; 1/√5 ; 0), (1/√30 ; -2/√30 ; -5/√30)   ← Chaque vecteur divisé par sa norme
  — Un vecteur propre pour λ = 15.  [juge eigvec]  départ : E_(15)
    = (1 ; -2 ; 1)   ← (A − 15I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[2/√5,1/√30,1/√6],[1/√5,-2/√30,-2/√6],[0,-5/√30,1/√6]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(3,3,15)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; −2 ; □)/√□ | Q=[251301615−230−260−53016], D=diag(3,3,15)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Orthodiagonalise A = [[3,-1,-1],[-1,3,-1],[-1,-1,3]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (1 − λ)(4 − λ)²   ← Valeurs propres 1 et 4
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : E_(1)
    = (1 ; 1 ; 1)   ← (A − I)v = 0
  — Une base de l'espace propre de λ = 4 (dimension 2).  [juge span]  départ : E_(4)
    = (1 ; -1 ; 0), (1 ; 0 ; -1)   ← Solutions de (A − 4I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 0 ; -1)
    = (1 ; -1 ; 0), (1 ; 1 ; -2)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 1 ; -2)
    = (1/√2 ; -1/√2 ; 0), (1/√6 ; 1/√6 ; -2/√6)   ← Chaque vecteur divisé par sa norme
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√3,1/√2,1/√6],[1/√3,-1/√2,1/√6],[1/√3,0,-2/√6]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(1,4,4)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; 1 ; □)/√□ | Q=[13121613−1216130−26], D=diag(1,4,4)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Niveau 4

```
Orthodiagonalise A = [[3,-1,-1],[-1,3,1],[-1,1,3]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (2 − λ)²(5 − λ)   ← Valeurs propres 2 et 5
  — Une base de l'espace propre de λ = 2 (dimension 2).  [juge span]  départ : E_(2)
    = (1 ; 1 ; 0), (1 ; 0 ; 1)   ← Solutions de (A − 2I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; 1 ; 0), (1 ; 0 ; 1)
    = (1 ; 1 ; 0), (1 ; -1 ; 2)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; 1 ; 0), (1 ; -1 ; 2)
    = (1/√2 ; 1/√2 ; 0), (1/√6 ; -1/√6 ; 2/√6)   ← Chaque vecteur divisé par sa norme
  — Un vecteur propre pour λ = 5.  [juge eigvec]  départ : E_(5)
    = (1 ; -1 ; -1)   ← (A − 5I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√2,1/√6,1/√3],[1/√2,-1/√6,-1/√3],[0,2/√6,-1/√3]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(2,2,5)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; −1 ; □)/√□ | Q=[12161312−16−13026−13], D=diag(2,2,5)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Orthodiagonalise A = [[3,-1,1],[-1,3,1],[1,1,3]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (1 − λ)(4 − λ)²   ← Valeurs propres 1 et 4
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : E_(1)
    = (1 ; 1 ; -1)   ← (A − I)v = 0
  — Une base de l'espace propre de λ = 4 (dimension 2).  [juge span]  départ : E_(4)
    = (1 ; -1 ; 0), (1 ; 0 ; 1)   ← Solutions de (A − 4I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 0 ; 1)
    = (1 ; -1 ; 0), (1 ; 1 ; 2)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; -1 ; 0), (1 ; 1 ; 2)
    = (1/√2 ; -1/√2 ; 0), (1/√6 ; 1/√6 ; 2/√6)   ← Chaque vecteur divisé par sa norme
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√3,1/√2,1/√6],[1/√3,-1/√2,1/√6],[-1/√3,0,2/√6]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(1,4,4)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (1 ; 1 ; □)/√□ | Q=[13121613−1216−13026], D=diag(1,4,4)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Orthodiagonalise A = [[1,-2,-4],[-2,-2,2],[-4,2,1]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (−3 − λ)²(6 − λ)   ← Valeurs propres −3 et 6
  — Une base de l'espace propre de λ = −3 (dimension 2).  [juge span]  départ : E_(−3)
    = (1 ; 2 ; 0), (1 ; 0 ; 1)   ← Solutions de (A + 3I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; 2 ; 0), (1 ; 0 ; 1)
    = (1 ; 2 ; 0), (4 ; -2 ; 5)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; 2 ; 0), (4 ; -2 ; 5)
    = (1/√5 ; 2/√5 ; 0), (4/(3√5) ; -2/(3√5) ; 5/(3√5))   ← Chaque vecteur divisé par sa norme
  — Un vecteur propre pour λ = 6.  [juge eigvec]  départ : E_(6)
    = (2 ; -1 ; -2)   ← (A − 6I)v = 0
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/√5,4/(3√5),2/3],[2/√5,-2/(3√5),-1/3],[0,5/(3√5),-2/3]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(-3,-3,6)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  aides : Vecteurs propres de valeurs propres différentes : déjà orthogonaux. Dans un même espace propre de dimension ≥ 2 : Gram-Schmidt. Puis on divise chaque vecteur par sa norme. | (4 ; −2 ; □)/√□ | Q=[1543&#x2062;52325−23&#x2062;5−13053&#x2062;5−23], D=diag(−3,−3,6)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

```

### Niveau 5

```
Une matrice symétrique A a les vecteurs propres orthonormés u₁=(131313) (λ = −7), u₂=(26−16−16) (λ = −4), u₃=(012−12) (λ = 0). Retrouve A.
  [free, sans aide]  A
    = Q·D·Q^T   ← A = QDQᵀ avec Q = [u₁ … u₃] et D = diag(−7, −4, 0)
    = [[-5,-1,-1],[-1,-3,-3],[-1,-3,-3]]   ← Le produit, case par case

Orthodiagonalise A = [[2,-1,1,-1],[-1,2,1,-1],[1,1,2,1],[-1,-1,1,2]] : trouve Q orthogonale et D diagonale avec A = QDQᵀ (valeurs propres dans l'ordre croissant).
  [free, sans aide]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = (−1 − λ)(3 − λ)³   ← Valeurs propres −1 et 3
  — Un vecteur propre pour λ = −1.  [juge eigvec]  départ : E_(−1)
    = (1 ; 1 ; -1 ; 1)   ← (A + I)v = 0
  — Une base de l'espace propre de λ = 3 (dimension 3).  [juge span]  départ : E_(3)
    = (1 ; -1 ; 0 ; 0), (1 ; 0 ; 1 ; 0), (1 ; 0 ; 0 ; -1)   ← Solutions de (A − 3I)x = 0
  — Gram-Schmidt dans cet espace propre : une base orthogonale.  [juge span]  départ : (1 ; -1 ; 0 ; 0), (1 ; 0 ; 1 ; 0), (1 ; 0 ; 0 ; -1)
    = (1 ; -1 ; 0 ; 0), (1 ; 1 ; 2 ; 0), (1 ; 1 ; -1 ; -3)   ← On retire à chaque vecteur sa projection sur les précédents, puis on remet à l'échelle
  — La même base, normalisée.  [juge span]  départ : (1 ; -1 ; 0 ; 0), (1 ; 1 ; 2 ; 0), (1 ; 1 ; -1 ; -3)
    = (1/√2 ; -1/√2 ; 0 ; 0), (1/√6 ; 1/√6 ; 2/√6 ; 0), (1/(2√3) ; 1/(2√3) ; -1/(2√3) ; -3/(2√3))   ← Chaque vecteur divisé par sa norme
  — Assemble Q (orthogonale) et D, dans le même ordre.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/2,1/√2,1/√6,1/(2√3)],[1/2,-1/√2,1/√6,1/(2√3)],[-1/2,0,2/√6,-1/(2√3)],[1/2,0,0,-3/(2√3)]]   ← Colonnes : les vecteurs propres normalisés
    = D = diag(-1,3,3,3)   ← Les valeurs propres, dans l'ordre des colonnes de Q
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry

Une matrice symétrique A a les vecteurs propres orthonormés u₁=(12120) (λ = 1), u₂=(13−1313) (λ = 5), u₃=(16−16−26) (λ = 11). Retrouve A.
  [free, sans aide]  A
    = Q·D·Q^T   ← A = QDQᵀ avec Q = [u₁ … u₃] et D = diag(1, 5, 11)
    = [[4,-3,-2],[-3,4,2],[-2,2,9]]   ← Le produit, case par case

```

### Variantes d'examen

```
A = [[0,-2],[-2,-3]] = QDQᵀ avec D=diag(−4,1). Quelle matrice Q convient (orthogonale, colonnes dans l'ordre de D) ?
  · Q=[21−12]   · Q=15·[21−12] [l_pd_order]   ✔ Q=15·[122−1]   · Q=[122−1] [l_orthodiag_no_normalize]
  [examen mcq]
  pièges : l_orthodiag_no_normalize, l_pd_order

A = [[10,-12],[-12,3]] = QDQᵀ, avec Q orthogonale et D diagonale. Convention : valeurs propres dans l'ordre croissant sur la diagonale de D, et la première composante non nulle de chaque colonne de Q positive. Que vaut q₁₂ ?
  [free, sans aide, examen coef]  q_12
    = 4/5
  pièges : l_orthodiag_no_normalize, l_pd_order

Vrai ou faux ?
  « Une matrice symétrique réelle n × n a n valeurs propres réelles (comptées avec multiplicité). » → VRAI
  [examen tf]

W ⊂ ℝ⁴ est l'hyperplan x₁ + x₂ + x₃ + 3x₄ = 0, et A = [[-4,-1,-1,-3],[-1,-4,-1,-3],[-1,-1,-4,-3],[-3,-3,-3,-12]]. (a) Applique Gram-Schmidt à la base (1 ; −1 ; 0 ; 0), (1 ; 0 ; −1 ; 0), (3 ; 0 ; 0 ; −1) de W. (b) Calcule le polynôme caractéristique de A. (c) Donne des bases orthonormées des espaces propres. (d)–(e) Écris A = QDQᵀ.
  [free, sans aide, examen open]  (1 ; -1 ; 0 ; 0), (1 ; 0 ; -1 ; 0), (3 ; 0 ; 0 ; -1)
    = (1 ; -1 ; 0 ; 0), (1 ; 1 ; -2 ; 0), (1 ; 1 ; 1 ; -1)   ← Gram-Schmidt, vecteurs remis à l'échelle
  — (b) Le polynôme caractéristique de A, factorisé.  [juge det]  départ : det(A − λI)
    = (−15 − λ)(−3 − λ)³
  — (c) Une base orthonormée de E₋₃ (c'est W).  [juge span]  départ : E_(−3)
    = (1/√2 ; -1/√2 ; 0 ; 0), (1/√6 ; 1/√6 ; -2/√6 ; 0), (1/2 ; 1/2 ; 1/2 ; -1/2)
  — (c) Une base orthonormée de E₋₁₅.  [juge span]  départ : E_(−15)
    = (1/(2√3) ; 1/(2√3) ; 1/(2√3) ; 3/(2√3))
  — (d)–(e) Q orthogonale et D diagonale avec A = QDQᵀ.  [juge factor]  départ : A = QDQᵀ
    = Q = [[1/(2√3),1/√2,1/√6,1/2],[1/(2√3),-1/√2,1/√6,1/2],[1/(2√3),0,-2/√6,1/2],[3/(2√3),0,0,-1/2]]
    = D = diag(-15,-3,-3,-3)

```

## Formes quadratiques et axes principaux (`l-sym-quadform`, BA1)

_La moitié du terme croisé hors diagonale._

### Niveau 1

```
Q(x, y) = −3x² + 12xy + 13y². Écris sa matrice symétrique A. Puis, sachant que A a les vecteurs propres (3 ; −1) pour λ = −5 et (1 ; 3) pour λ = 15, écris Q dans le repère des axes principaux.
  [guided]  A
    = [[-3,6],[6,13]]   (cases à remplir : (1,2) (2,1))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −3x² + 12xy + 13y²
    ? Les valeurs propres sont −5 et 15. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −□X² + □Y²   (trous : −5X² + 15Y²)   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−3, □], [□, 13]] | −5X² + 15Y²
  pièges : l_quadform_offdiag

Q(x, y) = −3x² + 6xy + 5y². Écris sa matrice symétrique A. Puis, sachant que A a les vecteurs propres (3 ; −1) pour λ = −4 et (1 ; 3) pour λ = 6, écris Q dans le repère des axes principaux.
  [guided]  A
    = [[-3,3],[3,5]]   (cases à remplir : (1,2) (2,1))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −3x² + 6xy + 5y²
    ? Les valeurs propres sont −4 et 6. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −□X² + □Y²   (trous : −4X² + 6Y²)   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−3, □], [□, 5]] | −4X² + 6Y²
  pièges : l_quadform_offdiag

Q(x, y) = −6x² − 2xy − 6y². Écris sa matrice symétrique A. Puis, sachant que A a les vecteurs propres (1 ; 1) pour λ = −7 et (1 ; −1) pour λ = −5, écris Q dans le repère des axes principaux.
  [guided]  A
    = [[-6,-1],[-1,-6]]   (cases à remplir : (1,2) (2,1))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −6x² − 2xy − 6y²
    ? Les valeurs propres sont −7 et −5. Quelle est la nature de Q ? · définie positive / ✔ définie négative / · indéfinie / · semi-définie positive
    = −□X² − □Y²   (trous : −7X² − 5Y²)   ← Q = λ₁X² + λ₂Y² : définie négative
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−6, □], [□, −6]] | −7X² − 5Y²
  pièges : l_quadform_offdiag

```

### Niveau 2

```
Q(x, y) = 11x² + 12xy + 2y². Écris sa matrice A, trouve ses valeurs propres, puis écris Q sans terme croisé et donne sa nature.
  [guided]  A
    ? Le terme croisé est 12xy. Que vaut a₁₂ ? ✔ 6 (la moitié) / · 12 (le coefficient entier)
    = [[11,6],[6,2]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−1 − λ)(14 − λ)   ← Valeurs propres −1 et 14
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 11x² + 12xy + 2y²
    ? Les valeurs propres sont −1 et 14. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −X² + □Y²   (trous : −X² + 14Y²)   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[11, □], [□, 2]] | −X² + 14Y²
  pièges : l_quadform_offdiag, l_posdef_diag

Q(x, y) = −x² + 4xy + 2y². Écris sa matrice A, trouve ses valeurs propres, puis écris Q sans terme croisé et donne sa nature.
  [guided]  A
    ? Le terme croisé est 4xy. Que vaut a₁₂ ? ✔ 2 (la moitié) / · 4 (le coefficient entier)
    = [[-1,2],[2,2]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−2 − λ)(3 − λ)   ← Valeurs propres −2 et 3
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −x² + 4xy + 2y²
    ? Les valeurs propres sont −2 et 3. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −□X² + □Y²   (trous : −2X² + 3Y²)   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−1, □], [□, 2]] | −2X² + 3Y²
  pièges : l_quadform_offdiag

Q(x, y) = 6x² + 6xy − 2y². Écris sa matrice A, trouve ses valeurs propres, puis écris Q sans terme croisé et donne sa nature.
  [guided]  A
    ? Le terme croisé est 6xy. Que vaut a₁₂ ? ✔ 3 (la moitié) / · 6 (le coefficient entier)
    = [[6,3],[3,-2]]   (cases à remplir : (1,2) (2,1) (2,2))   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−3 − λ)(7 − λ)   ← Valeurs propres −3 et 7
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 6x² + 6xy − 2y²
    ? Les valeurs propres sont −3 et 7. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −□X² + □Y²   (trous : −3X² + 7Y²)   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[6, □], [□, −2]] | −3X² + 7Y²
  pièges : l_quadform_offdiag

```

### Niveau 3

```
Q(x, y) = 11x² − 24xy + 4y². Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A
    = [[11,-12],[-12,4]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−5 − λ)(20 − λ)   ← Valeurs propres −5 et 20
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/5)·[[3,4],[4,-3]] ; D = diag(-5,20)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 11x² − 24xy + 4y²
    ? Les valeurs propres sont −5 et 20. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −5X² + 20Y²   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[11, □], [□, 4]] | −5X² + 20Y²
  pièges : l_quadform_offdiag, l_posdef_diag

Q(x, y) = 6x² + 8xy. Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A
    = [[6,4],[4,0]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−2 − λ)(8 − λ)   ← Valeurs propres −2 et 8
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/√5)·[[1,2],[-2,1]] ; D = diag(-2,8)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 6x² + 8xy
    ? Les valeurs propres sont −2 et 8. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −2X² + 8Y²   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[6, □], [□, 0]] | −2X² + 8Y²
  pièges : l_quadform_offdiag

Q(x, y) = −11x² − 24xy − 4y². Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A
    = [[-11,-12],[-12,-4]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−20 − λ)(5 − λ)   ← Valeurs propres −20 et 5
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/5)·[[4,3],[3,-4]] ; D = diag(-20,5)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −11x² − 24xy − 4y²
    ? Les valeurs propres sont −20 et 5. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −20X² + 5Y²   ← Q = λ₁X² + λ₂Y² : indéfinie
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−11, □], [□, −4]] | −20X² + 5Y²
  pièges : l_quadform_offdiag

```

### Niveau 4

```
Q(x, y, z) = −4x² − 4y² − 4z² − 2xy + 2xz + 2yz. Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature.
  [free, suivre l'erreur]  A
    = [[-4,-1,1],[-1,-4,1],[1,1,-4]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−6 − λ)(−3 − λ)²   ← Valeurs propres −6 et −3
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = [[1/√3,1/√2,1/√6],[1/√3,-1/√2,1/√6],[-1/√3,0,2/√6]] ; D = diag(-6,-3,-3)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y ; Z), écris Q sans terme croisé, en X, Y et Z.  [juge equiv]  départ : −4x² − 4y² − 4z² − 2xy + 2xz + 2yz
    ? Les valeurs propres sont −6 et −3. Quelle est la nature de Q ? · définie positive / ✔ définie négative / · indéfinie / · semi-définie positive
    = −6X² − 3Y² − 3Z²   ← Q = λ₁X² + λ₂Y² + λ₃Z² : définie négative
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[−4, □], [□, −4], …] | −6X² − 3Y² − 3Z²
  pièges : l_quadform_offdiag

Q(x, y, z) = 9x² + 9y² + 6z² − 8xy + 4xz − 4yz. Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature.
  [free, suivre l'erreur]  A
    = [[9,-4,2],[-4,9,-2],[2,-2,6]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (5 − λ)²(14 − λ)   ← Valeurs propres 5 et 14
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = [[1/√2,1/(3√2),2/3],[1/√2,-1/(3√2),-2/3],[0,-4/(3√2),1/3]] ; D = diag(5,5,14)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y ; Z), écris Q sans terme croisé, en X, Y et Z.  [juge equiv]  départ : 9x² + 9y² + 6z² − 8xy + 4xz − 4yz
    ? Les valeurs propres sont 5 et 14. Quelle est la nature de Q ? ✔ définie positive / · définie négative / · indéfinie / · semi-définie positive
    = 5X² + 5Y² + 14Z²   ← Q = λ₁X² + λ₂Y² + λ₃Z² : définie positive
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[9, □], [□, 9], …] | 5X² + 5Y² + 14Z²
  pièges : l_quadform_offdiag

Q(x, y, z) = 6x² + 9y² + 6z² − 4xy + 2xz − 4yz. Écris sa matrice A, trouve ses axes principaux (A = PDPᵀ), puis écris Q sans terme croisé et donne sa nature.
  [free, suivre l'erreur]  A
    = [[6,-2,1],[-2,9,-2],[1,-2,6]]   ← Diagonale : coefficients des carrés ; hors de la diagonale : moitié des termes croisés
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (5 − λ)²(11 − λ)   ← Valeurs propres 5 et 11
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = [[2/√5,1/√30,1/√6],[1/√5,-2/√30,-2/√6],[0,-5/√30,1/√6]] ; D = diag(5,5,11)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y ; Z), écris Q sans terme croisé, en X, Y et Z.  [juge equiv]  départ : 6x² + 9y² + 6z² − 4xy + 2xz − 4yz
    ? Les valeurs propres sont 5 et 11. Quelle est la nature de Q ? ✔ définie positive / · définie négative / · indéfinie / · semi-définie positive
    = 5X² + 5Y² + 11Z²   ← Q = λ₁X² + λ₂Y² + λ₃Z² : définie positive
  aides : Le coefficient de x² va en a₁₁ ; la moitié du coefficient de xy va en a₁₂ et en a₂₁. Puis Q = λ₁X² + λ₂Y² avec les valeurs propres de A. | A = [[6, □], [□, 9], …] | 5X² + 5Y² + 11Z²
  pièges : l_quadform_offdiag

```

### Niveau 5

```
Q(x, y) = 4x² − 2xy + 4y². Trouve ses axes principaux et sa forme réduite, puis décris la courbe Q(x, y) = 15 (nature, longueurs des demi-axes).
  [free, sans aide]  A
    = [[4,-1],[-1,4]]
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (3 − λ)(5 − λ)   ← Valeurs propres 3 et 5
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/√2)·[[1,1],[1,-1]] ; D = diag(3,5)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 4x² − 2xy + 4y²
    ? Les valeurs propres sont 3 et 5. Quelle est la nature de Q ? ✔ définie positive / · définie négative / · indéfinie / · semi-définie positive
    = 3X² + 5Y²   ← Q = λ₁X² + λ₂Y² : définie positive
  — La courbe Q(x, y) = 15 : le demi-axe selon (1 ; 1) (l'axe des X).  [juge value]  départ : a
    ? Quelle est la courbe Q(x, y) = 15 ? ✔ Une ellipse / · Une hyperbole / · Deux droites
    = √5   ← X²/5 + Y²/3 = 1
  — Le demi-axe selon (1 ; −1) (l'axe des Y).  [juge value]  départ : b
    = √3
  pièges : l_quadform_offdiag

Q(x, y) = −12x² − 24xy − 5y². Trouve ses axes principaux et sa forme réduite, puis décris la courbe Q(x, y) = 84 (nature, distance des sommets à l'origine).
  [free, sans aide]  A
    = [[-12,-12],[-12,-5]]
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (−21 − λ)(4 − λ)   ← Valeurs propres −21 et 4
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/5)·[[4,3],[3,-4]] ; D = diag(-21,4)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : −12x² − 24xy − 5y²
    ? Les valeurs propres sont −21 et 4. Quelle est la nature de Q ? · définie positive / · définie négative / ✔ indéfinie / · semi-définie positive
    = −21X² + 4Y²   ← Q = λ₁X² + λ₂Y² : indéfinie
  — La courbe Q(x, y) = 84 : ses sommets sont sur l'axe dirigé par (3 ; −4). À quelle distance de l'origine ?  [juge value]  départ : a
    ? Quelle est la courbe Q(x, y) = 84 ? · Une ellipse / ✔ Une hyperbole / · Deux droites
    = √21   ← Y²/21 − X²/4 = 1
  pièges : l_quadform_offdiag

Q(x, y) = 10x² − 4xy + 10y². Trouve ses axes principaux et sa forme réduite, puis décris la courbe Q(x, y) = 96 (nature, longueurs des demi-axes).
  [free, sans aide]  A
    = [[10,-2],[-2,10]]
  — Les valeurs propres de A : le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = (8 − λ)(12 − λ)   ← Valeurs propres 8 et 12
  — Les axes principaux : P orthogonale et D diagonale avec A = PDPᵀ (valeurs propres dans l'ordre croissant).  [juge factor]  départ : A = PDPᵀ
    = P = (1/√2)·[[1,1],[1,-1]] ; D = diag(8,12)   ← Colonnes de P : vecteurs propres orthonormés
  — Avec x = P·(X ; Y), écris Q sans terme croisé, en X et Y.  [juge equiv]  départ : 10x² − 4xy + 10y²
    ? Les valeurs propres sont 8 et 12. Quelle est la nature de Q ? ✔ définie positive / · définie négative / · indéfinie / · semi-définie positive
    = 8X² + 12Y²   ← Q = λ₁X² + λ₂Y² : définie positive
  — La courbe Q(x, y) = 96 : le demi-axe selon (1 ; 1) (l'axe des X).  [juge value]  départ : a
    ? Quelle est la courbe Q(x, y) = 96 ? ✔ Une ellipse / · Une hyperbole / · Deux droites
    = 2√3   ← X²/12 + Y²/8 = 1
  — Le demi-axe selon (1 ; −1) (l'axe des Y).  [juge value]  départ : b
    = 2√2
  pièges : l_quadform_offdiag

```

### Variantes d'examen

```
Quelle est la nature de la forme quadratique 3x² + 6xy − 5y² ?
  ✔ indéfinie   · semi-définie positive   · définie positive   · définie négative
  [examen mcq]

Vrai ou faux ?
  « La forme Q(x, y, z) = 6xy + z² est définie positive : la surface Q = 1 est un ellipsoïde. » → FAUX
    contre-exemple (refute) : x = 1, y = -1, z = 0
  [examen tf]

```

## Décomposition en valeurs singulières à la main (`l-svd-compute`, BA1)

_V de AᵀA ; σᵢ = √λᵢ ; uᵢ = Avᵢ/σᵢ._

### Niveau 1

```
A = [[2,2,4],[-3,3,0]]. On a AᵀA = [[13,-5,8],[-5,13,8],[8,8,16]], de valeurs propres 24, 18 et 0. Trouve σ₁ et σ₂, puis la SVD A = UΣVᵀ.
  [guided]  σ_1
    (σ₁, la plus grande valeur singulière.)
    = □   (trous : 2√6)   ← √24
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : 3√2)   ← √18
  — v₁ : un vecteur propre de AᵀA pour λ = 24.  [juge eigvec]  départ : v_1
    = (1 ; 1 ; 2)   (cases à remplir : (1,1))   ← (AᵀA − 24I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 18.  [juge eigvec]  départ : v_2
    = (1 ; -1 ; 0)   (cases à remplir : (1,1))   ← (AᵀA − 18I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (1 ; 1 ; -1)   (cases à remplir : (1,1))   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[2√6,0,0],[0,3√2,0]]   ← Même taille que A
    = V = [[1/√6,1/√2,1/√3],[1/√6,-1/√2,1/√3],[2/√6,0,-1/√3]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = [[1,0],[0,-1]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (1 ; 0)/1
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; 1 ; 2)/(√6·□) | U=[100−1], Σ=[2&#x2062;60003&#x2062;20], V=[16121316−1213260−13]
  pièges : l_svd_sigma_is_eig

A = [[6,-1],[3,2]]. On a AᵀA = [[45,0],[0,5]], de valeurs propres 45 et 5. Trouve σ₁ et σ₂, puis la SVD A = UΣVᵀ.
  [guided]  σ_1
    (σ₁, la plus grande valeur singulière.)
    = □   (trous : 3√5)   ← √45
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : √5)   ← √5
  — v₁ : un vecteur propre de AᵀA pour λ = 45.  [juge eigvec]  départ : v_1
    = (-1 ; 0)   (cases à remplir : (1,1))   ← (AᵀA − 45I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 5.  [juge eigvec]  départ : v_2
    = (0 ; -1)   (cases à remplir : (2,1))   ← (AᵀA − 5I)v = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[3√5,0],[0,√5]]   ← Même taille que A
    = V = [[-1,0],[0,-1]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = (1/√5)·[[-2,1],[-1,-2]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (−2 ; −1)/√5
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(−1 ; 0)/(1·□) | U=15·[−21−1−2], Σ=[3&#x2062;5005], V=[−100−1]
  pièges : l_svd_sigma_is_eig

A = [[-1,3,-5],[-5,3,-1]]. On a AᵀA = [[26,-18,10],[-18,18,-18],[10,-18,26]], de valeurs propres 54, 16 et 0. Trouve σ₁ et σ₂, puis la SVD A = UΣVᵀ.
  [guided]  σ_1
    (σ₁, la plus grande valeur singulière.)
    = □   (trous : 3√6)   ← √54
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : 4)   ← √16
  — v₁ : un vecteur propre de AᵀA pour λ = 54.  [juge eigvec]  départ : v_1
    = (1 ; -1 ; 1)   (cases à remplir : (1,1))   ← (AᵀA − 54I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 16.  [juge eigvec]  départ : v_2
    = (-1 ; 0 ; 1)   (cases à remplir : (1,1))   ← (AᵀA − 16I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (1 ; 2 ; 1)   (cases à remplir : (1,1))   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[3√6,0,0],[0,4,0]]   ← Même taille que A
    = V = [[1/√3,-1/√2,1/√6],[-1/√3,0,2/√6],[1/√3,1/√2,1/√6]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = (1/√2)·[[-1,-1],[-1,1]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (−1 ; −1)/√2
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; −1 ; 1)/(√3·□) | U=12·[−1−1−11], Σ=[3&#x2062;600040], V=[13−1216−13026131216]
  pièges : l_svd_sigma_is_eig

```

### Niveau 2

```
A = [[-8,-2,-2],[6,-6,9]] et AᵀA = [[100,-20,70],[-20,40,-50],[70,-50,85]]. Trouve les valeurs singulières de A, puis sa SVD A = UΣVᵀ.
  [guided]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    ? Pour les valeurs propres non nulles, quelle matrice utilises-tu ? ✔ AAᵀ (2 × 2) / ✔ AᵀA (3 × 3)
    = (45 − λ)(180 − λ)   ← AAᵀ est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = □   (trous : 6√5)   ← √180
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : 3√5)   ← √45
  — v₁ : un vecteur propre de AᵀA pour λ = 180.  [juge eigvec]  départ : v_1
    = (2 ; -1 ; 2)   (cases à remplir : (1,1))   ← (AᵀA − 180I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 45.  [juge eigvec]  départ : v_2
    = (-2 ; -2 ; 1)   (cases à remplir : (1,1))   ← (AᵀA − 45I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (1 ; -2 ; -2)   (cases à remplir : (1,1))   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[6√5,0,0],[0,3√5,0]]   ← Même taille que A
    = V = (1/3)·[[2,-2,1],[-1,-2,-2],[2,1,-2]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = (1/√5)·[[-1,2],[2,1]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (−1 ; 2)/√5
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(2 ; −1 ; 2)/(3·□) | U=15·[−1221], Σ=[6&#x2062;50003&#x2062;50], V=13·[2−21−1−2−221−2]
  pièges : l_charpoly_sign, l_lambda_one_entry

A = [[-4,-4,-2],[-3,6,-6]] et AᵀA = [[25,-2,26],[-2,52,-28],[26,-28,40]]. Trouve les valeurs singulières de A, puis sa SVD A = UΣVᵀ.
  [guided]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    ? Pour les valeurs propres non nulles, quelle matrice utilises-tu ? ✔ AAᵀ (2 × 2) / ✔ AᵀA (3 × 3)
    = (36 − λ)(81 − λ)   ← AAᵀ est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = □   (trous : 9)   ← √81
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : 6)   ← √36
  — v₁ : un vecteur propre de AᵀA pour λ = 81.  [juge eigvec]  départ : v_1
    = (1 ; -2 ; 2)   (cases à remplir : (1,1))   ← (AᵀA − 81I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 36.  [juge eigvec]  départ : v_2
    = (2 ; 2 ; 1)   (cases à remplir : (1,1))   ← (AᵀA − 36I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (-2 ; 1 ; 2)   (cases à remplir : (1,1))   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[9,0,0],[0,6,0]]   ← Même taille que A
    = V = (1/3)·[[1,2,-2],[-2,2,1],[2,1,2]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = [[0,-1],[-1,0]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (0 ; −1)/1
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; −2 ; 2)/(3·□) | U=[0−1−10], Σ=[900060], V=13·[12−2−221212]
  pièges : l_charpoly_sign, l_lambda_one_entry

A = [[-1,-1],[-1,-1],[1,-2]] et AᵀA = [[3,0],[0,6]]. Trouve les valeurs singulières de A, puis sa SVD A = UΣVᵀ.
  [guided]  det(AᵀA-λI)
    (Les valeurs propres de AᵀA (polynôme caractéristique factorisé).)
    ? Pour les valeurs propres non nulles, quelle matrice utilises-tu ? ✔ AᵀA (2 × 2) / ✔ AAᵀ (3 × 3)
    = (3 − λ)(6 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = □   (trous : √6)   ← √6
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = □   (trous : √3)   ← √3
  — v₁ : un vecteur propre de AᵀA pour λ = 6.  [juge eigvec]  départ : v_1
    = (0 ; -1)   (cases à remplir : (2,1))   ← (AᵀA − 6I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 3.  [juge eigvec]  départ : v_2
    = (-1 ; 0)   (cases à remplir : (1,1))   ← (AᵀA − 3I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (1 ; -1 ; 0)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[√6,0],[0,√3],[0,0]]   ← Même taille que A
    = V = [[0,-1],[-1,0]]   (cases à remplir : (1,1))   ← Les vᵢ normalisés
    = U = [[1/√6,1/√3,1/√2],[1/√6,1/√3,-1/√2],[2/√6,-1/√3,0]]   (cases à remplir : (1,1) (2,2))   ← u₁ = Av₁/σ₁ = (1 ; 1 ; 2)/√6
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(0 ; −1)/(1·□) | U=[1613121613−1226−130], Σ=[600300], V=[0−1−10]
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 3

```
Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[4,2],[-2,-4],[6,6]] (3 × 2). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  AᵀA
    (Calcule AᵀA.)
    = [[56,52],[52,56]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (4 − λ)(108 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 6√3   ← √108
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2   ← √4
  — v₁ : un vecteur propre de AᵀA pour λ = 108.  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← (AᵀA − 108I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 4.  [juge eigvec]  départ : v_2
    = (-1 ; 1)   ← (AᵀA − 4I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (-1 ; 1 ; 1)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[6√3,0],[0,2],[0,0]]   ← Même taille que A
    = V = (1/√2)·[[1,-1],[1,1]]   ← Les vᵢ normalisés
    = U = [[1/√6,-1/√2,-1/√3],[-1/√6,-1/√2,1/√3],[2/√6,0,1/√3]]   ← u₁ = Av₁/σ₁ = (1 ; −1 ; 2)/√6
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; 1)/(√2·□) | U=[16−12−13−16−121326013], Σ=[6&#x2062;300200], V=12·[1−111]

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[-1,2],[1,2],[-2,0]] (3 × 2). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  AᵀA
    (Calcule AᵀA.)
    = [[6,0],[0,8]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (6 − λ)(8 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 2√2   ← √8
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = √6   ← √6
  — v₁ : un vecteur propre de AᵀA pour λ = 8.  [juge eigvec]  départ : v_1
    = (0 ; 1)   ← (AᵀA − 8I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 6.  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (AᵀA − 6I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (-1 ; 1 ; 1)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[2√2,0],[0,√6],[0,0]]   ← Même taille que A
    = V = [[0,1],[1,0]]   ← Les vᵢ normalisés
    = U = [[1/√2,-1/√6,-1/√3],[1/√2,1/√6,1/√3],[0,-2/√6,1/√3]]   ← u₁ = Av₁/σ₁ = (1 ; 1 ; 0)/√2
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(0 ; 1)/(1·□) | U=[12−16−131216130−2613], Σ=[2&#x2062;200600], V=[0110]

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[-2,-4],[4,2],[-6,-6]] (3 × 2). Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  AᵀA
    (Calcule AᵀA.)
    = [[56,52],[52,56]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (4 − λ)(108 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 6√3   ← √108
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2   ← √4
  — v₁ : un vecteur propre de AᵀA pour λ = 108.  [juge eigvec]  départ : v_1
    = (-1 ; -1)   ← (AᵀA − 108I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 4.  [juge eigvec]  départ : v_2
    = (1 ; -1)   ← (AᵀA − 4I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (1 ; -1 ; -1)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[6√3,0],[0,2],[0,0]]   ← Même taille que A
    = V = (1/√2)·[[-1,1],[-1,-1]]   ← Les vᵢ normalisés
    = U = [[1/√6,1/√2,1/√3],[-1/√6,1/√2,-1/√3],[2/√6,0,-1/√3]]   ← u₁ = Av₁/σ₁ = (1 ; −1 ; 2)/√6
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(−1 ; −1)/(√2·□) | U=[161213−1612−13260−13], Σ=[6&#x2062;300200], V=12·[−11−1−1]

```

### Niveau 4

```
Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[-3,-4,-2],[3,2,4]] (2 × 3).
  [free, suivre l'erreur]  AᵀA
    (Calcule AᵀA.)
    = [[18,18,18],[18,20,16],[18,16,20]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).  [juge det]  départ : det(AAᵀ-λI)
    = (4 − λ)(54 − λ)   ← AAᵀ est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 3√6   ← √54
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2   ← √4
  — v₁ : un vecteur propre de AᵀA pour λ = 54.  [juge eigvec]  départ : v_1
    = (1 ; 1 ; 1)   ← (AᵀA − 54I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 4.  [juge eigvec]  départ : v_2
    = (0 ; -1 ; 1)   ← (AᵀA − 4I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (-2 ; 1 ; 1)   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[3√6,0,0],[0,2,0]]   ← Même taille que A
    = V = [[1/√3,0,-2/√6],[1/√3,-1/√2,1/√6],[1/√3,1/√2,1/√6]]   ← Les vᵢ normalisés
    = U = (1/√2)·[[-1,1],[1,1]]   ← u₁ = Av₁/σ₁ = (−1 ; 1)/√2
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; 1 ; 1)/(√3·□) | U=12·[−1111], Σ=[3&#x2062;600020], V=[130−2613−1216131216]

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[2,2,-2],[-3,6,3]] (2 × 3).
  [free, suivre l'erreur]  AᵀA
    (Calcule AᵀA.)
    = [[13,-14,-13],[-14,40,14],[-13,14,13]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).  [juge det]  départ : det(AAᵀ-λI)
    = (12 − λ)(54 − λ)   ← AAᵀ est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 3√6   ← √54
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2√3   ← √12
  — v₁ : un vecteur propre de AᵀA pour λ = 54.  [juge eigvec]  départ : v_1
    = (1 ; -2 ; -1)   ← (AᵀA − 54I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 12.  [juge eigvec]  départ : v_2
    = (-1 ; -1 ; 1)   ← (AᵀA − 12I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (1 ; 0 ; 1)   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[3√6,0,0],[0,2√3,0]]   ← Même taille que A
    = V = [[1/√6,-1/√3,1/√2],[-2/√6,-1/√3,0],[-1/√6,1/√3,1/√2]]   ← Les vᵢ normalisés
    = U = [[0,-1],[-1,0]]   ← u₁ = Av₁/σ₁ = (0 ; −1)/1
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(1 ; −2 ; −1)/(√6·□) | U=[0−1−10], Σ=[3&#x2062;60002&#x2062;30], V=[16−1312−26−130−161312]

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[-6,6],[4,-2],[-2,4]] (3 × 2).
  [free, suivre l'erreur]  AᵀA
    (Calcule AᵀA.)
    = [[56,-52],[-52,56]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (4 − λ)(108 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 6√3   ← √108
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2   ← √4
  — v₁ : un vecteur propre de AᵀA pour λ = 108.  [juge eigvec]  départ : v_1
    = (-1 ; 1)   ← (AᵀA − 108I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 4.  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (AᵀA − 4I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (-1 ; -1 ; 1)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[6√3,0],[0,2],[0,0]]   ← Même taille que A
    = V = (1/√2)·[[-1,1],[1,1]]   ← Les vᵢ normalisés
    = U = [[2/√6,0,-1/√3],[-1/√6,1/√2,-1/√3],[1/√6,1/√2,1/√3]]   ← u₁ = Av₁/σ₁ = (2 ; −1 ; 1)/√6
  aides : V vient de AᵀA (ses vecteurs propres orthonormés) ; σᵢ = √λᵢ dans l'ordre décroissant ; U se calcule par uᵢ = Avᵢ/σᵢ. | u₁ = A·(−1 ; 1)/(√2·□) | U=[260−13−1612−13161213], Σ=[6&#x2062;300200], V=12·[−1111]

```

### Niveau 5

```
Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[1,-3],[-1,-3],[0,-3]] (3 × 2).
  [free, sans aide]  AᵀA
    (Calcule AᵀA.)
    = [[2,0],[0,27]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (2 − λ)(27 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 3√3   ← √27
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = √2   ← √2
  — v₁ : un vecteur propre de AᵀA pour λ = 27.  [juge eigvec]  départ : v_1
    = (0 ; 1)   ← (AᵀA − 27I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 2.  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (AᵀA − 2I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (-1 ; -1 ; 2)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[3√3,0],[0,√2],[0,0]]   ← Même taille que A
    = V = [[0,1],[1,0]]   ← Les vᵢ normalisés
    = U = [[-1/√3,1/√2,-1/√6],[-1/√3,-1/√2,-1/√6],[-1/√3,0,2/√6]]   ← u₁ = Av₁/σ₁ = (−1 ; −1 ; −1)/√3

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[-2,1,3],[-2,-3,-1]] (2 × 3).
  [free, sans aide]  AᵀA
    (Calcule AᵀA.)
    = [[8,4,-4],[4,10,6],[-4,6,10]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).  [juge det]  départ : det(AAᵀ-λI)
    = (12 − λ)(16 − λ)   ← AAᵀ est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 4   ← √16
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = 2√3   ← √12
  — v₁ : un vecteur propre de AᵀA pour λ = 16.  [juge eigvec]  départ : v_1
    = (0 ; -1 ; -1)   ← (AᵀA − 16I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 12.  [juge eigvec]  départ : v_2
    = (-2 ; -1 ; 1)   ← (AᵀA − 12I)v = 0
  — Complète V : un vecteur de Ker A (λ = 0).  [juge eigvec]  départ : v_3
    = (1 ; -1 ; 1)   ← Av = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[4,0,0],[0,2√3,0]]   ← Même taille que A
    = V = [[0,-2/√6,1/√3],[-1/√2,-1/√6,-1/√3],[-1/√2,1/√6,1/√3]]   ← Les vᵢ normalisés
    = U = (1/√2)·[[-1,1],[1,1]]   ← u₁ = Av₁/σ₁ = (−1 ; 1)/√2

Calcule une décomposition en valeurs singulières A = UΣVᵀ de A = [[1,-2],[1,2],[2,0]] (3 × 2).
  [free, sans aide]  AᵀA
    (Calcule AᵀA.)
    = [[6,0],[0,8]]   ← Produits scalaires des colonnes de A
  — Les valeurs propres de AᵀA (polynôme caractéristique factorisé).  [juge det]  départ : det(AᵀA-λI)
    = (6 − λ)(8 − λ)   ← AᵀA est 2×2
  — σ₁, la plus grande valeur singulière.  [juge value]  départ : σ_1
    = 2√2   ← √8
  — σ₂, la deuxième valeur singulière.  [juge value]  départ : σ_2
    = √6   ← √6
  — v₁ : un vecteur propre de AᵀA pour λ = 8.  [juge eigvec]  départ : v_1
    = (0 ; 1)   ← (AᵀA − 8I)v = 0
  — v₂ : un vecteur propre de AᵀA pour λ = 6.  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (AᵀA − 6I)v = 0
  — Complète U : un vecteur de Ker Aᵀ.  [juge eigvec]  départ : u_3
    = (-1 ; -1 ; 1)   ← Aᵀu = 0
  — Assemble A = UΣVᵀ : Σ, puis V (vecteurs normalisés), puis U (uᵢ = Avᵢ/σᵢ).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[2√2,0],[0,√6],[0,0]]   ← Même taille que A
    = V = [[0,1],[1,0]]   ← Les vᵢ normalisés
    = U = [[-1/√2,1/√6,-1/√3],[1/√2,1/√6,-1/√3],[0,2/√6,1/√3]]   ← u₁ = Av₁/σ₁ = (−1 ; 1 ; 0)/√2

```

### Variantes d'examen

```
A = [[-1,1,-1],[-2,2,4]] = UΣVᵀ avec Σ=[2&#x2062;600030] et V=[−16−131216131226−130]. Que vaut U ?
  ✔ U=[0110]   · U=[1001] [l_pd_order]   · U=[03120] [l_svd_no_sigma]
  [examen mcq]
  pièges : l_svd_no_sigma, l_pd_order

Vrai ou faux ?
  « Une matrice carrée a autant de valeurs singulières non nulles que de valeurs propres non nulles (comptées avec multiplicité). » → FAUX
    contre-exemple (matOne) : A = [[0,1],[0,0]]
  [examen tf]

Soit A = [[3,-3,1,1],[1,-1,3,3]] et W = Ker A ⊂ ℝ⁴. (a) Trouve une base de W, puis une base orthonormée de W. (b) Calcule B = AᵀA. (c) Son polynôme caractéristique. (d) Des vecteurs propres de B pour ses valeurs propres non nulles. (e) Écris A = UΣVᵀ.
  [free, sans aide, examen open]  KerA
    = (1 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; -1)   ← Réduction de A
  — (a) Une base orthonormée de W (Gram-Schmidt, puis normaliser).  [juge span]  départ : (1 ; 1 ; 0 ; 0), (0 ; 0 ; 1 ; -1)
    = (1/√2 ; 1/√2 ; 0 ; 0), (0 ; 0 ; 1/√2 ; -1/√2)
  — (b) B = AᵀA.  [juge mat]  départ : B
    = [[10,-10,6,6],[-10,10,-6,-6],[6,-6,10,10],[6,-6,10,10]]
  — (c) Le polynôme caractéristique de B, factorisé.  [juge det]  départ : det(B − λI)
    = λ²(8 − λ)(32 − λ)
  — (d) Un vecteur propre de B pour λ = 32.  [juge eigvec]  départ : v_1
    = (1 ; -1 ; 1 ; 1)
  — (d) Un vecteur propre de B pour λ = 8.  [juge eigvec]  départ : v_2
    = (1 ; -1 ; -1 ; -1)
  — (e) U, Σ et V avec A = UΣVᵀ (les deux dernières colonnes de V : la base de (a)).  [juge factor]  départ : A = UΣVᵀ
    = Σ = [[4√2,0,0,0],[0,2√2,0,0]]
    = V = [[1/2,1/2,1/√2,0],[-1/2,-1/2,1/√2,0],[1/2,-1/2,0,1/√2],[1/2,-1/2,0,-1/√2]]
    = U = (1/√2)·[[1,1],[1,-1]]

```

## Image de la sphère unité (`l-svd-sphere`, BA1)

_Une ellipse d'axes uᵢ et de demi-axes σᵢ._

### Niveau 1

```
A = [[-2,-2,0],[1,-1,-1]] (2 × 3) a la SVD A = UΣVᵀ avec U=[1001], Σ=[2&#x2062;200030], V=[−121316−12−13−160−1326]. Décris l'image de la sphère unité de ℝ³ par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Ici, l'image est une ellipse pleine (le bord et l'intérieur).)
    (Le grand demi-axe : σ₁.)
    = □   (trous : 2√2)   ← √8
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : √3)   ← √3
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 8.  [juge eigvec]  départ : u_1
    = (1 ; 0)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 3.  [juge eigvec]  départ : u_2
    = (0 ; 1)   (cases à remplir : (2,1))   ← Ellipse pleine, de demi-axes 2√2 selon (1 ; 0) et √3 selon (0 ; 1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 < 3 : l'image est □ | Ellipse pleine, de demi-axes 2√2 selon (1 ; 0) et √3 selon (0 ; 1)
  pièges : l_svd_sigma_is_eig

A = [[2,2],[4,-1]] (2 × 2) a la SVD A = UΣVᵀ avec U=15·[1−221], Σ=[2&#x2062;5005], V=[100−1]. Décris l'image de la sphère unité de ℝ² par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Ici, l'image est une ellipse (la courbe seulement).)
    (Le grand demi-axe : σ₁.)
    = □   (trous : 2√5)   ← √20
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : √5)   ← √5
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 20.  [juge eigvec]  départ : u_1
    = (1 ; 2)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 5.  [juge eigvec]  départ : u_2
    = (-2 ; 1)   (cases à remplir : (1,1))   ← Ellipse (la courbe seulement), de demi-axes 2√5 selon (1 ; 2) et √5 selon (−2 ; 1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement), de demi-axes 2√5 selon (1 ; 2) et √5 selon (−2 ; 1)
  pièges : l_svd_sigma_is_eig

A = [[-4,1,-2],[-2,-1,-4]] (2 × 3) a la SVD A = UΣVᵀ avec U=12·[111−1], Σ=[600060], V=[−12−131601326−1213−16]. Décris l'image de la sphère unité de ℝ³ par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Ici, l'image est une ellipse pleine (le bord et l'intérieur).)
    (Le grand demi-axe : σ₁.)
    = □   (trous : 6)   ← √36
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : √6)   ← √6
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 36.  [juge eigvec]  départ : u_1
    = (1 ; 1)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 6.  [juge eigvec]  départ : u_2
    = (1 ; -1)   (cases à remplir : (1,1))   ← Ellipse pleine, de demi-axes 6 selon (1 ; 1) et √6 selon (1 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 < 3 : l'image est □ | Ellipse pleine, de demi-axes 6 selon (1 ; 1) et √6 selon (1 ; −1)
  pièges : l_svd_sigma_is_eig

```

### Niveau 2

```
A = [[2,1],[2,-1],[-4,0]] (3 × 2) a la SVD A = UΣVᵀ avec U=[16121316−1213−26013], Σ=[2&#x2062;600200], V=[1001]. Décris l'image de la sphère unité de ℝ² par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Le grand demi-axe : σ₁.)
    = □   (trous : 2√6)   ← √24
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : √2)   ← √2
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 24.  [juge eigvec]  départ : u_1
    = (1 ; 1 ; -2)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 2.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; -1 ; 0)   (cases à remplir : (1,1))   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 2√6 selon (1 ; 1 ; −2) et √2 selon (1 ; −1 ; 0)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 2√6 selon (1 ; 1 ; −2) et √2 selon (1 ; −1 ; 0)
  pièges : l_svd_sigma_is_eig, l_svd_sphere_boundary

A = [[1,2],[-2,0],[-1,2]] (3 × 2) a la SVD A = UΣVᵀ avec U=[1216130−261312−16−13], Σ=[2&#x2062;200600], V=[0110]. Décris l'image de la sphère unité de ℝ² par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Le grand demi-axe : σ₁.)
    = □   (trous : 2√2)   ← √8
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : √6)   ← √6
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 8.  [juge eigvec]  départ : u_1
    = (1 ; 0 ; 1)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 6.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; -2 ; -1)   (cases à remplir : (1,1))   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 2√2 selon (1 ; 0 ; 1) et √6 selon (1 ; −2 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 2√2 selon (1 ; 0 ; 1) et √6 selon (1 ; −2 ; −1)
  pièges : l_svd_sigma_is_eig, l_svd_sphere_boundary

A = [[3,-3,3],[3,3,-3]] (2 × 3) a la SVD A = UΣVᵀ avec U=12·[−1111], Σ=[60003&#x2062;20], V=[01012012−12012]. Décris l'image de la sphère unité de ℝ³ par A : demi-axes et directions des axes.
  [guided]  σ_1
    (Le grand demi-axe : σ₁.)
    = □   (trous : 6)   ← √36
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = □   (trous : 3√2)   ← √18
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 36.  [juge eigvec]  départ : u_1
    = (-1 ; 1)   (cases à remplir : (1,1))
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 18.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ³ par A est… · une ellipse (la courbe seulement) / ✔ une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; 1)   (cases à remplir : (1,1))   ← Ellipse pleine, de demi-axes 6 selon (−1 ; 1) et 3√2 selon (1 ; 1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 < 3 : l'image est □ | Ellipse pleine, de demi-axes 6 selon (−1 ; 1) et 3√2 selon (1 ; 1)
  pièges : l_svd_sigma_is_eig, l_svd_sphere_boundary

```

### Niveau 3

```
Soit A = [[4,-3],[-2,-6]] (2 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (20 − λ)(45 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√5   ← √45
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√5   ← √20
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 45.  [juge eigvec]  départ : u_1
    = (1 ; 2)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 20.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (2 ; -1)   ← Ellipse (la courbe seulement), de demi-axes 3√5 selon (1 ; 2) et 2√5 selon (2 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement), de demi-axes 3√5 selon (1 ; 2) et 2√5 selon (2 ; −1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[-4,-3],[-2,6]] (2 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (20 − λ)(45 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√5   ← √45
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√5   ← √20
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 45.  [juge eigvec]  départ : u_1
    = (-1 ; 2)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 20.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (-2 ; -1)   ← Ellipse (la courbe seulement), de demi-axes 3√5 selon (−1 ; 2) et 2√5 selon (−2 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement), de demi-axes 3√5 selon (−1 ; 2) et 2√5 selon (−2 ; −1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[6,-3,-3],[0,2,-2]] (2 × 3). Décris l'image de la sphère unité de ℝ³ par A : longueurs et directions des demi-axes, et sa nature. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (8 − λ)(54 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√6   ← √54
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√2   ← √8
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 54.  [juge eigvec]  départ : u_1
    = (-1 ; 0)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 8.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ³ par A est… · une ellipse (la courbe seulement) / ✔ une ellipse pleine (le bord et l'intérieur) / · un segment
    = (0 ; 1)   ← Ellipse pleine, de demi-axes 3√6 selon (−1 ; 0) et 2√2 selon (0 ; 1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 < 3 : l'image est □ | Ellipse pleine, de demi-axes 3√6 selon (−1 ; 0) et 2√2 selon (0 ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

```

### Niveau 4

```
Soit A = [[-6,-3],[-2,4]] (2 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature.
  [free, suivre l'erreur]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (20 − λ)(45 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√5   ← √45
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√5   ← √20
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 45.  [juge eigvec]  départ : u_1
    = (-1 ; 0)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 20.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (0 ; 1)   ← Ellipse (la courbe seulement), de demi-axes 3√5 selon (−1 ; 0) et 2√5 selon (0 ; 1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement), de demi-axes 3√5 selon (−1 ; 0) et 2√5 selon (0 ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[-3,1,3],[-3,-1,3]] (2 × 3). Décris l'image de la sphère unité de ℝ³ par A : longueurs et directions des demi-axes, et sa nature.
  [free, suivre l'erreur]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (2 − λ)(36 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 6   ← √36
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = √2   ← √2
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 36.  [juge eigvec]  départ : u_1
    = (1 ; 1)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 2.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ³ par A est… · une ellipse (la courbe seulement) / ✔ une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; -1)   ← Ellipse pleine, de demi-axes 6 selon (1 ; 1) et √2 selon (1 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 < 3 : l'image est □ | Ellipse pleine, de demi-axes 6 selon (1 ; 1) et √2 selon (1 ; −1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[1,-5],[-5,1],[-2,-2]] (3 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature.
  [free, suivre l'erreur]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = −λ(24 − λ)(36 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 6   ← √36
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√6   ← √24
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 36.  [juge eigvec]  départ : u_1
    = (1 ; -1 ; 0)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 24.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (-1 ; -1 ; -1)   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 6 selon (1 ; −1 ; 0) et 2√6 selon (−1 ; −1 ; −1)
  aides : Axes = uᵢ (colonnes de U), demi-axes = σᵢ. Si le rang est plus petit que n, l'image est pleine. | rang 2 = 2 : l'image est □ | Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 6 selon (1 ; −1 ; 0) et 2√6 selon (−1 ; −1 ; −1)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry, l_svd_sphere_boundary

```

### Niveau 5

```
Soit A = [[-4,2],[-1,5],[-4,2]] (3 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature.
  [free, sans aide]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = −λ(12 − λ)(54 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√6   ← √54
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 2√3   ← √12
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 54.  [juge eigvec]  départ : u_1
    = (1 ; 1 ; 1)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 12.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; -2 ; 1)   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 3√6 selon (1 ; 1 ; 1) et 2√3 selon (1 ; −2 ; 1)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[1,5],[-8,-4],[5,7]] (3 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature.
  [free, sans aide]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = −λ(18 − λ)(162 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 9√2   ← √162
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 3√2   ← √18
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 162.  [juge eigvec]  départ : u_1
    = (1 ; -2 ; 2)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 18.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (2 ; 2 ; 1)   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 9√2 selon (1 ; −2 ; 2) et 3√2 selon (2 ; 2 ; 1)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry, l_svd_sphere_boundary

Soit A = [[1,-3],[-1,-3],[2,0]] (3 × 2). Décris l'image de la sphère unité de ℝ² par A : longueurs et directions des demi-axes, et sa nature.
  [free, sans aide]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = −λ(6 − λ)(18 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√2   ← √18
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = √6   ← √6
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 18.  [juge eigvec]  départ : u_1
    = (-1 ; -1 ; 0)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 6.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ² par A est… ✔ une ellipse (la courbe seulement) / · une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; -1 ; 2)   ← Ellipse (la courbe seulement) dans le plan Col A, de demi-axes 3√2 selon (−1 ; −1 ; 0) et √6 selon (1 ; −1 ; 2)
  pièges : l_cofactor_sign, l_minor_wrong, l_lambda_one_entry, l_svd_sphere_boundary

```

### Variantes d'examen

```
A = [[1,-5],[5,-1]] a les valeurs singulières 6 et 4, et U = [u₁ u₂] avec u₁ ∝ (−1 ; −1), u₂ ∝ (1 ; −1). Quelle est l'image de la sphère unité de ℝ² par A ?
  ✔ Ellipse (la courbe seulement), de demi-axes 6 selon (−1 ; −1) et 4 selon (1 ; −1)   · Ellipse (la courbe seulement), de demi-axes 6 selon (1 ; −1) et 4 selon (−1 ; −1)   · Ellipse pleine, de demi-axes 6 selon (−1 ; −1) et 4 selon (1 ; −1) [l_svd_sphere_boundary]   · Ellipse (la courbe seulement), de demi-axes 36 selon (−1 ; −1) et 16 selon (1 ; −1) [l_svd_sigma_is_eig]
  [examen mcq]
  pièges : l_svd_sphere_boundary, l_svd_sigma_is_eig

Soit A = [[5,1,5],[-1,7,-1]]. Décris l'image de la sphère unité de ℝ³ par A (valeurs singulières, axes, nature).
  [free, sans aide, examen open]  det(AAᵀ-λI)
    (Les valeurs propres de AAᵀ (polynôme caractéristique factorisé).)
    = (48 − λ)(54 − λ)
  — Le grand demi-axe : σ₁.  [juge value]  départ : σ_1
    = 3√6   ← √54
  — Le petit demi-axe : σ₂.  [juge value]  départ : σ_2
    = 4√3   ← √48
  — La direction du grand axe : u₁, vecteur propre de AAᵀ pour λ = 54.  [juge eigvec]  départ : u_1
    = (1 ; -1)
  — La direction du petit axe : u₂, vecteur propre de AAᵀ pour λ = 48.  [juge eigvec]  départ : u_2
    ? L'image de la sphère unité de ℝ³ par A est… · une ellipse (la courbe seulement) / ✔ une ellipse pleine (le bord et l'intérieur) / · un segment
    = (1 ; 1)   ← Ellipse pleine, de demi-axes 3√6 selon (1 ; −1) et 4√3 selon (1 ; 1)
  pièges : l_charpoly_sign, l_lambda_one_entry, l_svd_sphere_boundary

```

## Preuves courtes : inverses, noyaux, matrice canonique (`l-proof-matrices`, BA1)

_Des égalités justifiées, des hypothèses au but._

### Niveau 1

```
Montre que une application linéaire T est injective si et seulement si Ker T = {0}. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Alors T(x) = 0 = T(0), donc x = 0 par injectivité : Ker T = {0}.
    2. (⇐) Supposons Ker T = {0}, et soient x, y avec T(x) = T(y).
    3. Par linéarité, T(x − y) = T(x) − T(y) = 0, donc x − y ∈ Ker T.
    4. Donc x − y = 0, c'est-à-dire x = y : T est injective.

Montre que si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.
    2. A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.
    3. Pas de variable libre : Ax = 0 n'a que la solution x = 0, donc Ker T = {0}.
    4. Donc T est injective.

Montre que une application linéaire T est injective si et seulement si Ker T = {0}. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Alors T(x) = 0 = T(0), donc x = 0 par injectivité : Ker T = {0}.
    2. (⇐) Supposons Ker T = {0}, et soient x, y avec T(x) = T(y).
    3. Par linéarité, T(x − y) = T(x) − T(y) = 0, donc x − y ∈ Ker T.
    4. Donc x − y = 0, c'est-à-dire x = y : T est injective.

```

### Niveau 2

```
Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Supposons Ax = Bx pour tout x ∈ ℝⁿ.
    2. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    3. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    4. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
  pièges : l_proof_circular

Montre que si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit A la matrice canonique de T : elle est n × n.
    2. T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.
    3. A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.
    4. Pas de variable libre : Ax = 0 n'a que la solution x = 0, donc Ker T = {0}.
    5. Donc T est injective.
    ✗ T est injective, donc Ax = 0 n'a que la solution nulle. [l_proof_circular]
  pièges : l_proof_circular

Montre que si λ est valeur propre de A inversible, alors λ ≠ 0 et 1/λ est valeur propre de A⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit v ≠ 0 avec Av = λv.
    2. Si λ = 0, alors Av = 0 avec v ≠ 0, et A ne serait pas inversible. Donc λ ≠ 0.
    3. On multiplie Av = λv à gauche par A⁻¹ : v = λA⁻¹v.
    4. On divise par λ ≠ 0 : A⁻¹v = (1/λ)v, avec v ≠ 0.
    5. Donc 1/λ est valeur propre de A⁻¹, de vecteur propre v.
    ✗ Comme 1/λ est valeur propre de A⁻¹, A⁻¹v = (1/λ)v. [l_proof_circular]
  pièges : l_proof_circular

```

### Niveau 3

```
Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pourquoi Aeⱼ est-elle la j-ième colonne de A ? ✔ Définition du produit matrice-vecteur (combinaison des colonnes) / · A est inversible / · T est linéaire
    1. Supposons Ax = Bx pour tout x ∈ ℝⁿ.
    2. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    3. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    4. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
  pièges : l_proof_circular

Montre que si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pourquoi un pivot dans chaque ligne donne-t-il un pivot dans chaque colonne ? ✔ A est carrée (autant de lignes que de colonnes) / · C'est toujours vrai / · T est linéaire
    1. Soit A la matrice canonique de T : elle est n × n.
    2. T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.
    3. A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.
    4. Pas de variable libre : Ax = 0 n'a que la solution x = 0, donc Ker T = {0}.
    5. Donc T est injective.
    ✗ T est injective, donc Ax = 0 n'a que la solution nulle. [l_proof_circular]
  pièges : l_proof_circular, l_imt_nonsquare

Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pourquoi Aeⱼ est-elle la j-ième colonne de A ? ✔ Définition du produit matrice-vecteur (combinaison des colonnes) / · A est inversible / · T est linéaire
    1. Supposons Ax = Bx pour tout x ∈ ℝⁿ.
    2. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    3. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    4. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
  pièges : l_proof_circular

```

### Niveau 4

```
Montre que si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective. La première ligne est posée ; la dernière doit conclure : « Donc T est injective. » Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    1. T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.
    2. A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.
    3. Pas de variable libre : Ax = 0 n'a que la solution x = 0, donc Ker T = {0}.
    4. Donc T est injective.
    ✗ Pour n = 1, T(x) = 2x est surjective et injective. [g9_proof_by_example]
    ✗ T est injective, donc Ax = 0 n'a que la solution nulle. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). La première ligne est posée ; la dernière doit conclure : « A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B. » Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    1. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    2. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    3. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
    ✗ Pour x = 0, A·0 = B·0 = 0, donc A = B. [g9_proof_by_example]
  pièges : l_proof_circular, g9_proof_by_example

Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). La première ligne est posée ; la dernière doit conclure : « A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B. » Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    1. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    2. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    3. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Pour x = 0, A·0 = B·0 = 0, donc A = B. [g9_proof_by_example]
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

```

### Niveau 5

```
Montre que si Ax = Bx pour tout x ∈ ℝⁿ, alors A = B (la matrice canonique d'une application linéaire est unique). Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Supposons Ax = Bx pour tout x ∈ ℝⁿ.
    2. Prenons x = eⱼ, le j-ième vecteur de la base canonique : Aeⱼ = Beⱼ.
    3. Aeⱼ est la j-ième colonne de A, et Beⱼ la j-ième colonne de B.
    4. A et B ont donc les mêmes colonnes, pour j = 1, …, n : A = B.
    ✗ Pour x = 0, A·0 = B·0 = 0, donc A = B. [g9_proof_by_example]
    ✗ Comme A = B, on a bien Aeⱼ = Beⱼ pour tout j. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

Montre que une application linéaire T est injective si et seulement si Ker T = {0}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. (⇒) Supposons T injective, et soit x ∈ Ker T.
    2. Alors T(x) = 0 = T(0), donc x = 0 par injectivité : Ker T = {0}.
    3. (⇐) Supposons Ker T = {0}, et soient x, y avec T(x) = T(y).
    4. Par linéarité, T(x − y) = T(x) − T(y) = 0, donc x − y ∈ Ker T.
    5. Donc x − y = 0, c'est-à-dire x = y : T est injective.
    ✗ T(0) = 0, donc T est injective. [g9_proof_by_example]
    ✗ Comme T est injective, T(x) = T(y) donne x = y. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

Montre que si T : ℝⁿ → ℝⁿ linéaire est surjective, alors elle est injective. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Soit A la matrice canonique de T : elle est n × n.
    2. T est surjective : les colonnes de A engendrent ℝⁿ, donc A a un pivot dans chaque ligne.
    3. A est carrée : n pivots dans n colonnes, il y a aussi un pivot dans chaque colonne.
    4. Pas de variable libre : Ax = 0 n'a que la solution x = 0, donc Ker T = {0}.
    5. Donc T est injective.
    ✗ Pour n = 1, T(x) = 2x est surjective et injective. [g9_proof_by_example]
    ✗ T est injective, donc Ax = 0 n'a que la solution nulle. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

```

### Variantes d'examen

```
Montre que si A est symétrique et inversible, alors A⁻¹ est symétrique. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Hypothèses : Aᵀ = A et AA⁻¹ = I.
    2. On transpose AA⁻¹ = I : (A⁻¹)ᵀAᵀ = Iᵀ = I.
    3. Comme Aᵀ = A : (A⁻¹)ᵀA = I.
    4. Donc (A⁻¹)ᵀ est l'inverse de A : (A⁻¹)ᵀ = A⁻¹, et A⁻¹ est symétrique.
    ✗ A⁻¹ est symétrique, donc (A⁻¹)ᵀ = A⁻¹. [l_proof_circular]
    ✗ Avec A = [[2, 1], [1, 1]], A⁻¹ = [[1, −1], [−1, 2]] est symétrique. [g9_proof_by_example]
  [examen open]
  pièges : l_proof_circular, g9_proof_by_example

```

## Preuves courtes : symétriques, orthogonales, projecteurs (`l-proof-spectral`, BA1)

_Faire passer A d'un côté à l'autre du produit scalaire._

### Niveau 1

```
Montre que si A est symétrique, deux vecteurs propres v et w de valeurs propres λ ≠ μ sont orthogonaux. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. λ(v · w) = (λv) · w = (Av) · w.
    2. (Av) · w = (Av)ᵀw = vᵀAᵀw.
    3. vᵀAᵀw = vᵀAw = v · (μw) = μ(v · w), car Aᵀ = A.
    4. (λ − μ)(v · w) = 0 et λ ≠ μ, donc v · w = 0.

Montre que si A est symétrique, deux vecteurs propres v et w de valeurs propres λ ≠ μ sont orthogonaux. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. λ(v · w) = (λv) · w = (Av) · w.
    2. (Av) · w = (Av)ᵀw = vᵀAᵀw.
    3. vᵀAᵀw = vᵀAw = v · (μw) = μ(v · w), car Aᵀ = A.
    4. (λ − μ)(v · w) = 0 et λ ≠ μ, donc v · w = 0.

Montre que si U est orthogonale, ‖Ux‖ = ‖x‖ pour tout x. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit U orthogonale : UᵀU = I.
    2. ‖Ux‖² = (Ux) · (Ux) = (Ux)ᵀ(Ux).
    3. (Ux)ᵀ(Ux) = xᵀUᵀUx (transposée d'un produit).
    4. = xᵀIx = xᵀx = ‖x‖², donc ‖Ux‖ = ‖x‖ (deux normes positives).

```

### Niveau 2

```
Montre que si U est orthogonale et Ux = λx avec x ≠ 0 et λ réel, alors λ = ±1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soient UᵀU = I et Ux = λx, avec x ≠ 0.
    2. ‖Ux‖² = (Ux)ᵀ(Ux) = xᵀUᵀUx = xᵀx = ‖x‖².
    3. Mais ‖Ux‖² = ‖λx‖² = λ²‖x‖².
    4. Donc λ²‖x‖² = ‖x‖², et ‖x‖ ≠ 0 : λ² = 1, λ = ±1.
    ✗ U est orthogonale, donc Uᵀ = U et ses valeurs propres sont réelles. [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    1. Une matrice réelle A (n × n)
    2. est diagonalisable en base orthonormée,
    3. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    4. si et seulement si
    5. A est symétrique (Aᵀ = A).
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    1. Une matrice réelle A (n × n)
    2. est diagonalisable en base orthonormée,
    3. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    4. si et seulement si
    5. A est symétrique (Aᵀ = A).
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

```

### Niveau 3

```
Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    ? Le sens « A = QDQᵀ ⇒ A symétrique » vient de… ✔ Aᵀ = (QDQᵀ)ᵀ = QDᵀQᵀ = QDQᵀ = A / · QᵀQ = I, donc AᵀA = I / · D est inversible
    1. Une matrice réelle A (n × n)
    2. est diagonalisable en base orthonormée,
    3. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    4. si et seulement si
    5. A est symétrique (Aᵀ = A).
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

Montre que si U est orthogonale et Ux = λx avec x ≠ 0 et λ réel, alors λ = ±1. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pourquoi xᵀUᵀUx = xᵀx ? ✔ U est orthogonale : UᵀU = I / · U est symétrique : Uᵀ = U / · x est un vecteur propre
    1. Soient UᵀU = I et Ux = λx, avec x ≠ 0.
    2. ‖Ux‖² = (Ux)ᵀ(Ux) = xᵀUᵀUx = xᵀx = ‖x‖².
    3. Mais ‖Ux‖² = ‖λx‖² = λ²‖x‖².
    4. Donc λ²‖x‖² = ‖x‖², et ‖x‖ ≠ 0 : λ² = 1, λ = ±1.
    ✗ U est orthogonale, donc Uᵀ = U et ses valeurs propres sont réelles. [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    ? Le sens « A = QDQᵀ ⇒ A symétrique » vient de… ✔ Aᵀ = (QDQᵀ)ᵀ = QDᵀQᵀ = QDQᵀ = A / · QᵀQ = I, donc AᵀA = I / · D est inversible
    1. Une matrice réelle A (n × n)
    2. est diagonalisable en base orthonormée,
    3. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    4. si et seulement si
    5. A est symétrique (Aᵀ = A).
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
  pièges : l_sym_orth_confusion

```

### Niveau 4

```
Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    1. est diagonalisable en base orthonormée,
    2. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    3. si et seulement si
    4. A est symétrique (Aᵀ = A).
    ✗ A est diagonalisable (A = PDP⁻¹). [l_sym_needed]
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
  pièges : l_sym_needed, l_sym_orth_confusion

Construis l'énoncé de le théorème spectral : touche les morceaux dans l'ordre.
  [blocs define]
    1. est diagonalisable en base orthonormée,
    2. c'est-à-dire A = QDQᵀ avec Q orthogonale et D diagonale,
    3. si et seulement si
    4. A est symétrique (Aᵀ = A).
    ✗ A est orthogonale (AᵀA = I). [l_sym_orth_confusion]
    ✗ A est diagonalisable (A = PDP⁻¹). [l_sym_needed]
  pièges : l_sym_orth_confusion, l_sym_needed

Montre que si U est orthogonale et Ux = λx avec x ≠ 0 et λ réel, alors λ = ±1. La première ligne est posée ; la dernière doit conclure : « Donc λ²‖x‖² = ‖x‖², et ‖x‖ ≠ 0 : λ² = 1, λ = ±1. » Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    1. ‖Ux‖² = (Ux)ᵀ(Ux) = xᵀUᵀUx = xᵀx = ‖x‖².
    2. Mais ‖Ux‖² = ‖λx‖² = λ²‖x‖².
    3. Donc λ²‖x‖² = ‖x‖², et ‖x‖ ≠ 0 : λ² = 1, λ = ±1.
    ✗ λ = ±1, donc ‖Ux‖ = |λ|·‖x‖ = ‖x‖. [l_proof_circular]
    ✗ U est orthogonale, donc Uᵀ = U et ses valeurs propres sont réelles. [l_sym_orth_confusion]
  pièges : l_proof_circular, l_sym_orth_confusion

```

### Niveau 5

```
Montre que si U est orthogonale, ‖Ux‖ = ‖x‖ pour tout x. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Soit U orthogonale : UᵀU = I.
    2. ‖Ux‖² = (Ux) · (Ux) = (Ux)ᵀ(Ux).
    3. (Ux)ᵀ(Ux) = xᵀUᵀUx (transposée d'un produit).
    4. = xᵀIx = xᵀx = ‖x‖², donc ‖Ux‖ = ‖x‖ (deux normes positives).
    ✗ U est symétrique : Uᵀ = U, donc ‖Ux‖² = xᵀU²x. [l_sym_orth_confusion]
    ✗ ‖Ux‖ = ‖x‖ pour tout x, donc (Ux)ᵀ(Ux) = xᵀx. [l_proof_circular]
  pièges : l_sym_orth_confusion, l_proof_circular

Montre que si ‖u‖ = 1, la matrice A = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Au = u(uᵀu) = u‖u‖² = u : u est vecteur propre pour la valeur propre 1.
    2. Chaque colonne de uuᵀ est un multiple de u : rang A = 1 et Col A = Span{u}.
    3. Si x ⊥ u, Ax = u(uᵀx) = (u · x)u = 0 : u⊥ ⊂ Ker A, et dim Ker A = n − 1, donc Ker A = u⊥.
    4. Pour tout x, Ax = (u · x)u : c'est la projection orthogonale de x sur Span{u}, car ‖u‖ = 1.
    ✗ A est la projection sur Span{u}, donc Au = u. [l_proof_circular]
    ✗ A est symétrique, donc AᵀA = I : A conserve les longueurs. [l_sym_orth_confusion]
  pièges : l_proof_circular, l_sym_orth_confusion

Montre que si ‖u‖ = 1, la matrice A = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Au = u(uᵀu) = u‖u‖² = u : u est vecteur propre pour la valeur propre 1.
    2. Chaque colonne de uuᵀ est un multiple de u : rang A = 1 et Col A = Span{u}.
    3. Si x ⊥ u, Ax = u(uᵀx) = (u · x)u = 0 : u⊥ ⊂ Ker A, et dim Ker A = n − 1, donc Ker A = u⊥.
    4. Pour tout x, Ax = (u · x)u : c'est la projection orthogonale de x sur Span{u}, car ‖u‖ = 1.
    ✗ A est symétrique, donc AᵀA = I : A conserve les longueurs. [l_sym_orth_confusion]
    ✗ A est la projection sur Span{u}, donc Au = u. [l_proof_circular]
  pièges : l_sym_orth_confusion, l_proof_circular

```

### Variantes d'examen

```
Montre que si ‖u‖ = 1, la matrice A = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Au = u(uᵀu) = u‖u‖² = u : u est vecteur propre pour la valeur propre 1.
    2. Chaque colonne de uuᵀ est un multiple de u : rang A = 1 et Col A = Span{u}.
    3. Si x ⊥ u, Ax = u(uᵀx) = (u · x)u = 0 : u⊥ ⊂ Ker A, et dim Ker A = n − 1, donc Ker A = u⊥.
    4. Pour tout x, Ax = (u · x)u : c'est la projection orthogonale de x sur Span{u}, car ‖u‖ = 1.
    ✗ A est symétrique, donc AᵀA = I : A conserve les longueurs. [l_sym_orth_confusion]
    ✗ A est la projection sur Span{u}, donc Au = u. [l_proof_circular]
  [examen open]
  pièges : l_sym_orth_confusion, l_proof_circular

```

## Pièges de cette unité

- **Second membre oublié** (`l_rhs_forgotten`, E) : L2 ← L2 − 2L1 : [0, 1, 3 | 7] au lieu de [0, 1, 3 | 1]
- **Ajouter au lieu de retrancher** (`l_rowop_sign`, E) : L2 ← L2 − 2L1 fait comme L2 + 2L1 au lieu de 
- **Multiplicateur oublié hors du pivot** (`l_rowop_partial`, E) : [2, 5, 1] − 2·[1, 2, −1] = [0, 3, 2] au lieu de [0, 1, 3]
- **Résultat écrit dans la mauvaise ligne** (`l_rowop_wrong_row`, E) : résultat de L2 ← L2 − 2L1 écrit en ligne 1 au lieu de 
- **Échelonnée mais pas réduite** (`l_rref_not_reduced`, E) : r₁₃ = −1 (forme échelonnée) au lieu de −3 (réduite)
- **Variables libres mises à 0** (`l_free_var_zero`, E) : x = (2 ; −1 ; 0) au lieu de x = (2 ; −1 ; 0) + t(3 ; −1 ; 1)
- **Signe oublié en isolant les variables pivots** (`l_ker_sign`, E) : x₁ + 2x₂ = 0 au lieu de x₁ = 2x₂ (au lieu de −2x₂)
- **Lignes de R prises pour le noyau** (`l_ker_from_rows`, E) : Ker A = Span{lignes de R} au lieu de 
- **Injective et surjective échangées** (`l_inj_rows`, E) : « pivot dans chaque ligne, donc injective » au lieu de 
- **n et m confondus dans le théorème du rang** (`l_rank_dim_confusion`, E) : dim Ker A = m − r au lieu de n − r
- **Compter les vecteurs au lieu des pivots** (`l_span_count`, E) : « n vecteurs de ℝⁿ forment toujours une base » au lieu de 
- **Division par une expression qui peut s'annuler** (`l_param_divide_zero`, E) : « diviser L2 par a − 1 » sans traiter a = 1 au lieu de 
- **Aucune solution et une infinité échangées** (`l_param_none_vs_inf`, E) : [0 0 0 | 3] lu « infinité » au lieu de 
- **Images rangées en lignes** (`l_matrix_rows_cols`, E) : images en lignes au lieu de en colonnes
- **Multiples d'une famille libre** (`l_indep_scaled`, C) : « {αᵢvᵢ} reste libre » (2021 Q17) au lieu de 
- **Signe du damier oublié** (`l_cofactor_sign`, E) : det = +4·det A₂₃ au lieu de −4·det A₂₃
- **Mauvais mineur** (`l_minor_wrong`, E) : mineur sans la ligne 2 mais avec la colonne 3 au lieu de 
- **Images données placées telles quelles** (`l_map_scaled_image`, E) : colonne 2 = T(2e₂) au lieu de ½·T(2e₂)
- **Rotation transposée** (`l_rot_transpose`, E) : [[cos θ, sin θ], [−sin θ, cos θ]] au lieu de 
- **P⁻¹DP au lieu de PDP⁻¹** (`l_pdp_inverse_side`, E) : A = P⁻¹DP au lieu de PDP⁻¹
- **Composée dans l'ordre de l'énoncé** (`l_compose_order`, E) : « d'abord R, puis S » au lieu de S·R
- **BA à la place de AB** (`l_ab_commute`, R) : AB = BA au lieu de 
- **Produit case par case** (`l_product_entrywise`, E) : (AB)ᵢⱼ = aᵢⱼbᵢⱼ au lieu de 
- **Transposée d'un produit sans renverser l'ordre** (`l_transpose_product`, E) : (AB)ᵀ = AᵀBᵀ au lieu de BᵀAᵀ
- **Indices échangés** (`l_coef_index_swap`, E) : b₁₃ lu en ligne 3, colonne 1 au lieu de 
- **Inverse case par case** (`l_inv_entrywise`, E) : (A⁻¹)ᵢⱼ = 1/aᵢⱼ au lieu de 
- **Formule 2 × 2 mal appliquée** (`l_inv_2x2_swap`, E) : (1/det)[[a, −b], [−c, d]] au lieu de (1/det)[[d, −b], [−c, a]]
- **(AB)⁻¹ = A⁻¹B⁻¹** (`l_inv_product_order`, R) : (AB)⁻¹ = A⁻¹B⁻¹ au lieu de B⁻¹A⁻¹
- **Théorème de la matrice inversible pour une matrice non carrée** (`l_imt_nonsquare`, E) : « colonnes libres ⇒ inversible » pour une 4 × 3 au lieu de 
- **E⁻¹ = E** (`l_elementary_inverse`, E) : inverse de L3 ← L3 + 2L1 = même matrice au lieu de 
- **ℓᵢⱼ avec le mauvais signe** (`l_lu_sign`, E) : L2 ← L2 − 2L1 au lieu de ℓ₂₁ = −2 (au lieu de 2)
- **L prise égale au produit des Eᵢ** (`l_lu_inverse`, E) : L = E₃E₂E₁ (ℓ₃₁ = 7) au lieu de L = (E₃E₂E₁)⁻¹ (ℓ₃₁ = −1)
- **Ordre des blocs renversé** (`l_blocks_order`, E) : −D⁻¹BA⁻¹ au lieu de −A⁻¹BD⁻¹
- **Chaque bloc inversé séparément** (`l_blocks_inverse_each`, E) : [[A⁻¹, B⁻¹], [0, D⁻¹]] au lieu de 
- **Échange sans changer le signe** (`l_det_swap_sign`, E) : échange de lignes, det inchangé au lieu de 
- **Ligne multipliée sans corriger det** (`l_det_scale_row`, E) : L2 ← 2L2 sans corriger det au lieu de 
- **Lᵢ ← cLᵢ + kLⱼ compté sans effet** (`l_det_rowop_combo`, E) : L2 ← 2L2 − L1 compté comme sans effet au lieu de 
- **det additif** (`l_det_sum`, E) : det(A + B) = det A + det B au lieu de 
- **det(kA) = k·det A** (`l_det_scalar`, E) : det(2A) = 2·det A au lieu de 2ⁿ·det A
- **det(Aᵀ) = −det A** (`l_det_transpose_sign`, C) : det(Aᵀ) = −det A au lieu de 
- **Aire sans ½ ou sans valeur absolue** (`l_area_half_abs`, E) : aire du triangle = det au lieu de ½·|det|
- **Cramer : ligne remplacée** (`l_cramer_row`, E) : ligne i remplacée par b au lieu de 
- **Sous-espace sans le vecteur nul** (`l_subspace_zero`, E) : {p : p(0) = 1} « sous-espace » au lieu de 
- **Condition non linéaire prise pour un sous-espace** (`l_subspace_nonlinear`, E) : {uv = w²} « sous-espace » au lieu de 
- **Colonnes pivots prises dans R** (`l_col_from_rref`, C) : Col A = Span{colonnes pivots de R} au lieu de 
- **Lignes de A aux positions des pivots** (`l_row_from_A`, E) : Lgn A = lignes de A aux positions des pivots au lieu de 
- **Coordonnées lues dans la base canonique** (`l_coords_canonical`, E) : [p]_B = (2 ; 3 ; −1) au lieu de (6 ; −4 ; −1)
- **Matrice de passage dans le mauvais sens** (`l_change_basis_direction`, E) : P_{C←B} = B⁻¹C au lieu de C⁻¹B
- **Matrice de passage : produit incomplet** (`l_change_basis_product`, E) : P = C⁻¹ (B oubliée) ou P = BC⁻¹ au lieu de 
- **Matrice de T dans les bases canoniques** (`l_map_basis_ignored`, E) : matrice dans les bases canoniques au lieu de 
- **P et P⁻¹ échangées** (`l_similar_order`, E) : [T]_B = PAP⁻¹ au lieu de P⁻¹AP
- **Le vecteur nul pris pour un vecteur propre** (`l_eigvec_zero`, E) : v = 0 au lieu de 
- **Valeurs propres lues sur la forme échelonnée** (`l_eigen_rref`, E) : valeurs propres lues sur la forme échelonnée de A au lieu de 
- **Signe du terme bc dans det(A − λI)** (`l_charpoly_sign`, E) : (4 − λ)(3 − λ) + 2 au lieu de − 2
- **λ soustrait à une seule case** (`l_lambda_one_entry`, E) : A − λI avec λ sur une seule case au lieu de 
- **Une ligne de A − λI prise pour un vecteur propre** (`l_eigvec_row`, E) : [[2, 1], [2, 1]] au lieu de v = (2 ; 1) au lieu de (1 ; −2)
- **Valeur propre de A⁻¹ : l'opposé au lieu de l'inverse** (`l_eig_inv_neg`, E) : valeurs propres de A⁻¹ : −λ au lieu de 1/λ
- **Règles « + c » et « × c » échangées** (`l_eig_shift_scale`, E) : A + 3I : 3λ ; 2A : λ + 2 au lieu de 
- **Aᵀ et A ont les mêmes vecteurs propres** (`l_eig_transpose_vec`, E) : « Aᵀ a les mêmes vecteurs propres » au lieu de 
- **Valeurs propres de A + B additionnées** (`l_eig_sum`, E) : valeurs propres de A + B = λ + μ au lieu de 
- **Colonnes de P dans un autre ordre que D** (`l_pd_order`, C) : P = [v₂ v₁], D = diag(λ₁, λ₂) au lieu de 
- **« Valeur propre double, donc pas diagonalisable »** (`l_diag_distinct`, E) : « valeur propre double ⇒ pas diagonalisable » au lieu de 
- **Aᵏ calculée case par case** (`l_powers_entrywise`, E) : Aᵏ = (aᵢⱼᵏ) au lieu de 
- **Probabilités de transition rangées en lignes** (`l_markov_rows`, E) : M avec les probabilités en lignes au lieu de 
- **Vecteur stationnaire non normalisé** (`l_markov_normalize`, E) : q = (4/3 ; 1) au lieu de (4/7 ; 3/7)
- **Même vecteur propre pour λ et λ̄** (`l_complex_conj_vec`, E) : même v pour λ et λ̄ au lieu de 
- **Produit scalaire laissé en vecteur** (`l_dot_no_sum`, E) : u · v = (3 ; 0 ; −8) au lieu de 
- **L'orthogonalité n'est pas transitive** (`l_orth_transitive`, E) : u ⊥ v, v ⊥ w ⇒ u ⊥ w au lieu de 
- **Orthogonal à un seul vecteur de W** (`l_perp_one_vector`, E) : vecteurs orthogonaux à w₁ seulement au lieu de 
- **Projection sur une base non orthogonale** (`l_proj_nonorth`, E) : formule de projection sur une base non orthogonale au lieu de 
- **Colonnes orthogonales mais pas normées** (`l_orth_cols_only`, E) : colonnes orthogonales ⇒ U⁻¹ = Uᵀ au lieu de 
- **Orthogonale n'implique pas det = 1** (`l_orth_det_one`, C) : « orthogonale ⇒ det = 1 » (2019 Q5) au lieu de 
- **Projeter sur les xᵢ au lieu des vᵢ** (`l_gs_use_x`, E) : v₃ = x₃ − proj_{x₁}x₃ − proj_{x₂}x₃ au lieu de 
- **Projection ajoutée au lieu d'être retranchée** (`l_gs_sign`, E) : v₂ = x₂ + c·v₁ au lieu de 
- **R remplie avec les coefficients de Gram-Schmidt** (`l_qr_r_from_gs`, E) : rᵢⱼ = coefficient de Gram-Schmidt (r₃₃ = 1) au lieu de 
- **Seulement les premières équations** (`l_lsq_square_subsystem`, E) : résoudre les n premières équations de Ax = b au lieu de 
- **β₀ et β₁ échangés** (`l_lsq_line_swap`, E) : y = β₁ + β₀x au lieu de 
- **AAᵀ au lieu de AᵀA** (`l_lsq_normal_aat`, E) : AAᵀx = Ab au lieu de 
- **uᵀAᵀAv n'est pas toujours un produit scalaire** (`l_inner_positivity`, E) : uᵀAᵀAv « toujours un produit scalaire » au lieu de 
- **Colonnes de Q non normalisées** (`l_orthodiag_no_normalize`, C) : Q = [(3 ; 4), (4 ; −3)] au lieu de 
- **Espace propre de dimension 2 sans Gram-Schmidt** (`l_orthodiag_no_gs`, E) : base de E₋₁ non orthogonalisée au lieu de 
- **Matrice non symétrique dite orthodiagonalisable** (`l_sym_needed`, C) : matrice non symétrique « orthodiagonalisable » (2021 Q21) au lieu de 
- **Coefficient entier de xᵢxⱼ hors de la diagonale** (`l_quadform_offdiag`, E) : Q = x₁² + 10x₁x₂ + x₂² au lieu de a₁₂ = 10 (au lieu de 5)
- **Diagonale positive prise pour « définie positive »** (`l_posdef_diag`, E) : « diagonale positive ⇒ définie positive » au lieu de 
- **Valeur singulière prise égale à λᵢ** (`l_svd_sigma_is_eig`, E) : σᵢ = λᵢ(AᵀA) au lieu de √λᵢ
- **uᵢ = Avᵢ sans diviser par σᵢ** (`l_svd_no_sigma`, E) : uᵢ = Avᵢ au lieu de Avᵢ/σᵢ
- **Rôles de U et de V échangés** (`l_svd_uv_swap`, E) : V tirée des vecteurs propres de AAᵀ au lieu de 
- **Ellipse pleine ou bord seul** (`l_svd_sphere_boundary`, E) : image de la sphère de ℝ³ par A 2 × 3 = ellipse (le bord seul) au lieu de 
- **Preuve qui suppose sa conclusion** (`l_proof_circular`, E) : bloc qui utilise la conclusion au lieu de 
- **Symétrique et orthogonale confondues** (`l_sym_orth_confusion`, E) : « A symétrique, donc AᵀA = I » au lieu de 
- **Division par ‖v‖ au lieu de ‖v‖²** (`g4_proj_no_square`, E) : (u·v/‖v‖)·v au lieu de (u·v/‖v‖²)·v
