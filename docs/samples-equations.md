# Exemples de questions — Équations

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Le sens de « = » (`eq-meaning`, 10H)

_Les deux côtés ont la même valeur._

### Niveau 1

```
x=6 est-il solution de 5x−1=34 ?
  ✔ Non : 5 × 6 − 1 = 29, pas 34   · Oui

x=6 est-il solution de 4x−4=16 ?
  ✔ Non : 4 × 6 − 4 = 20, pas 16   · Oui

x=6 est-il solution de 3x+7=25 ?
  ✔ Oui : 3 × 6 + 7 = 25   · Non

```

### Niveau 2

```
x=5 est-il solution de 2x+4=14 ?
  ✔ Oui : 2 × 5 + 4 = 14   · Non

x=0 est-il solution de 4x+6=10 ?
  ✔ Non : 4 × 0 + 6 = 6, pas 10   · Oui

x=3 est-il solution de 3x−8=−2 ?
  ✔ Non : 3 × 3 − 8 = 1, pas −2   · Oui

```

### Niveau 3

```
Complète : 3 + 4 = … + 6
  → 1   pièges attendus : 7 [equals_as_result], 13 [equals_as_result]
  pièges : equals_as_result

Complète : 9 + 13 = … + 8
  → 14   pièges attendus : 22 [equals_as_result], 30 [equals_as_result]
  pièges : equals_as_result

Complète : 8 + 2 = … + 2
  → 8   pièges attendus : 10 [equals_as_result], 12 [equals_as_result]
  pièges : equals_as_result

```

### Niveau 4

```
Complète : 10 + 10 = … + 6
  → 14   pièges attendus : 20 [equals_as_result], 26 [equals_as_result]
  pièges : equals_as_result

Complète : 11 + 4 = … + 5
  → 10   pièges attendus : 15 [equals_as_result], 20 [equals_as_result]
  pièges : equals_as_result

Complète : 12 + 14 = … + 14
  → 12   pièges attendus : 26 [equals_as_result], 40 [equals_as_result]
  pièges : equals_as_result

```

### Niveau 5

```
Quel nombre x rend l'égalité vraie : 3x+3=15 ?
  → 4

Quel nombre x rend l'égalité vraie : 2x+7=21 ?
  → 7

Quel nombre x rend l'égalité vraie : 5x+1=46 ?
  → 9

```

## Équations en une étape (`eq-one-step`, 10H)

_x + 5 = 12, 3x = 12, x/4 = 3._

### Niveau 1

```
Résous l'équation, une ligne à la fois.
  x-5=9   [coups montrés] → x=14
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x+2=-7   [coups montrés] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x-5=-7   [coups montrés] → x=-2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous l'équation, une ligne à la fois.
  2x=26   [coups montrés] → x=13
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  4x=56   [coups montrés] → x=14
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/6=-7   [coups montrés] → x=-42
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous l'équation, une ligne à la fois.
  9x=-81   [lignes libres] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  5x=65   [lignes libres] → x=13
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x-6=-9   [lignes libres] → x=-3
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous l'équation, une ligne à la fois.
  x-4=4   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/7=11   [lignes libres] → x=77
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  5x=60   [lignes libres] → x=12
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous l'équation, une ligne à la fois.
  2x=-8   [lignes libres] → x=-4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/8=-4   [lignes libres] → x=-32
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/5=-10   [lignes libres] → x=-50
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Équations en deux étapes (`eq-two-step`, 10H)

_3x + 5 = 20._

### Niveau 1

```
Résous l'équation, une ligne à la fois.
  9x-10=8   [coups montrés] → x=2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  7x-9=40   [coups montrés] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  3x+5=17   [coups montrés] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous l'équation, une ligne à la fois.
  3x+4=-5   [coups montrés] → x=-3
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  4x+9=37   [coups montrés] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  3x+11=5   [coups montrés] → x=-2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous l'équation, une ligne à la fois.
  -9x+7=25   [lignes libres] → x=-2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  7x+13=34   [lignes libres] → x=3
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  2x-10=-22   [lignes libres] → x=-6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous l'équation, une ligne à la fois.
  4x+6=-30   [lignes libres] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -4x-5=11   [lignes libres] → x=-4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -5x+15=60   [lignes libres] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous l'équation, une ligne à la fois.
  9x-10=-1   [lignes libres] → x=1
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x-6=-12   [lignes libres] → x=-6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -x-3=-1   [lignes libres] → x=-2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Inconnue des deux côtés (`eq-both-sides`, 10H)

_5x − 3 = 2x + 9._

### Niveau 1

```
Résous l'équation, une ligne à la fois.
  5x+10=2x+22   [coups montrés] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  6x+1=4x-5   [coups montrés] → x=-3
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  4x-5=x+1   [coups montrés] → x=2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous l'équation, une ligne à la fois.
  7x-8=2x-23   [coups montrés] → x=-3
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  5x-5=x+11   [coups montrés] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  7x-3=2x-48   [coups montrés] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous l'équation, une ligne à la fois.
  8x-2=6x+6   [lignes libres] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  7x+10=6x+3   [lignes libres] → x=-7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -7x+8=2x+17   [lignes libres] → x=-1
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous l'équation, une ligne à la fois.
  -2x+12=x+30   [lignes libres] → x=-6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  7x-11=5x+3   [lignes libres] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -6x+7=3x+79   [lignes libres] → x=-8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous l'équation, une ligne à la fois.
  6x+8=3x+35   [lignes libres] → x=9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  2x-1=-3x+34   [lignes libres] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  3x+11=-3x+53   [lignes libres] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Équations avec parenthèses (`eq-brackets`, 10H)

_3(x − 2) = x + 4._

### Niveau 1

```
Résous l'équation, une ligne à la fois.
  3(x+5)=-4x+29   [coups montrés] → x=2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  6(x+6)=2x+52   [coups montrés] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  3(x-5)=-5x-63   [coups montrés] → x=-6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous l'équation, une ligne à la fois.
  4(x+1)=2x-4   [coups montrés] → x=-4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  5(x-5)=2x-10   [coups montrés] → x=5
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  4(x-1)=-x-9   [coups montrés] → x=-1
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous l'équation, une ligne à la fois.
  -6(x-5)=5x+96   [lignes libres] → x=-6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  5(x-1)=-4x-68   [lignes libres] → x=-7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -6(x-2)=-3x-3   [lignes libres] → x=5
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous l'équation, une ligne à la fois.
  6(x+4)=3(x+1)   [lignes libres] → x=-7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  2(x+3)=-1(x+6)   [lignes libres] → x=-4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  6(x-4)=1(x+16)   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous l'équation, une ligne à la fois.
  3(x-3)=-1(x-23)   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  -2(x+6)=1(x-30)   [lignes libres] → x=6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  2(x-5)=1(x-4)   [lignes libres] → x=6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Produit en croix (`eq-proportion`, 10H)

_(x + 1)/3 = 5/2._

### Niveau 1

```
Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/5=21/15   [coups montrés] → x=7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/6=-15/18   [coups montrés] → x=-5
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/4=4/8   [coups montrés] → x=2
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/6=3/18   [coups montrés] → x=1
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/5=12/15   [coups montrés] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  x/2=-18/4   [coups montrés] → x=-9
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x+4)/3=-9/9   [lignes libres] → x=-7
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x-5)/2=2/4   [lignes libres] → x=6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x+4)/3=30/9   [lignes libres] → x=6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x-2)/6=16/12   [lignes libres] → x=10
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x-2)/3=4/6   [lignes libres] → x=4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x+1)/4=14/8   [lignes libres] → x=6
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x+5)/5=26/10   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x-2)/2=-20/4   [lignes libres] → x=-8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous avec le produit en croix (ou en multipliant les deux côtés), une ligne à la fois.
  (x+1)/6=-9/18   [lignes libres] → x=-4
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Équations avec fractions (`eq-fractions`, 11H)

_x/3 + x/4 = 7._

### Niveau 1

```
Résous l'équation, une ligne à la fois.
  x/2-6=9   [coups montrés] → x=30
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/3-2=22   [coups montrés] → x=72
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/3-5=11   [coups montrés] → x=48
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 2

```
Résous l'équation, une ligne à la fois.
  x/2-1=11   [coups montrés] → x=24
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/2+6=22   [coups montrés] → x=32
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/3+1=5   [coups montrés] → x=12
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 3

```
Résous l'équation, une ligne à la fois.
  x/3+x/6=9   [lignes libres] → x=18
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/3+x/6=9   [lignes libres] → x=18
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  x/2+x/3=15   [lignes libres] → x=18
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 4

```
Résous l'équation, une ligne à la fois.
  (x+3)/3=-11   [lignes libres] → x=-36
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  (x+4)/2=10   [lignes libres] → x=16
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  (x+2)/2=-19   [lignes libres] → x=-40
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

### Niveau 5

```
Résous l'équation, une ligne à la fois.
  (x+2)/2-x/4=3   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  (x+4)/2-x/4=4   [lignes libres] → x=8
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

Résous l'équation, une ligne à la fois.
  (x+3)/3-x/6=-5   [lignes libres] → x=-36
  pièges : eq_move_no_sign, eq_inverse_op, eq_change_side_sign_mult, eq_divide_one_term, eq_one_side_only

```

## Mettre en équation (`eq-problems`, 11H)

_Des mots à l'équation._

### Niveau 1

```
Un rectangle a une longueur de 5 cm de plus que sa largeur, et un périmètre de 22 cm. Quelle est sa largeur (en cm) ?
  → 3

Un rectangle a une longueur de 4 cm de plus que sa largeur, et un périmètre de 52 cm. Quelle est sa largeur (en cm) ?
  → 11

Le triple d'un nombre, augmenté de 13, vaut 43. Quel est ce nombre ?
  → 10

```

### Niveau 2

```
Le quadruple d'un nombre, augmenté de 15, vaut 31. Quel est ce nombre ?
  → 4

Le quintuple d'un nombre, augmenté de 10, vaut 85. Quel est ce nombre ?
  → 15

Un rectangle a une longueur de 5 cm de plus que sa largeur, et un périmètre de 34 cm. Quelle est sa largeur (en cm) ?
  → 6

```

### Niveau 3

```
La somme de trois nombres entiers qui se suivent vaut 60. Quel est le plus petit ?
  → 19

Un père a 40 ans et son fils 10 ans. Dans combien d'années le père aura-t-il le double de l'âge de son fils ?
  → 20

Un père a 38 ans et son fils 14 ans. Dans combien d'années le père aura-t-il le double de l'âge de son fils ?
  → 10

```

### Niveau 4

```
Le quintuple d'un nombre, augmenté de 11, vaut 46. Quel est ce nombre ?
  → 7

Au cinéma, une entrée coûte 4 CHF de plus pour un adulte que pour un enfant. Pour 2 enfants et 2 adultes, on paie 52 CHF. Combien coûte une entrée enfant (CHF) ?
  → 11

Au cinéma, une entrée coûte 5 CHF de plus pour un adulte que pour un enfant. Pour 3 enfants et 3 adultes, on paie 63 CHF. Combien coûte une entrée enfant (CHF) ?
  → 8

```

### Niveau 5

```
Au cinéma, une entrée coûte 4 CHF de plus pour un adulte que pour un enfant. Pour 3 enfants et 3 adultes, on paie 66 CHF. Combien coûte une entrée enfant (CHF) ?
  → 9

Un rectangle a une longueur de 6 cm de plus que sa largeur, et un périmètre de 32 cm. Quelle est sa largeur (en cm) ?
  → 5

La somme de trois nombres entiers qui se suivent vaut 30. Quel est le plus petit ?
  → 9

```

## Équation produit nul (`eq-product`, 11H)

_(x − 2)(3x + 1) = 0._

### Niveau 1

```
Résous (x+3)(x−1)=0. Sépare les solutions par « ; ».
  → x=-3;x=1
  pièges : zero_product_sign

Résous (x+6)(x+1)=0. Sépare les solutions par « ; ».
  → x=-6;x=-1
  pièges : zero_product_sign

Résous (x−8)(x+2)=0. Sépare les solutions par « ; ».
  → x=-2;x=8
  pièges : zero_product_sign

```

### Niveau 2

```
Résous (x−1)(1x+6)=0. Sépare les solutions par « ; ».
  → x=-6;x=1
  pièges : zero_product_sign

Résous (x−2)(1x+5)=0. Sépare les solutions par « ; ».
  → x=-5;x=2
  pièges : zero_product_sign

Résous (x+1)(1x+2)=0. Sépare les solutions par « ; ».
  → x=-2;x=-1
  pièges : zero_product_sign

```

### Niveau 3

```
Résous (x+1)(4x+2)=0. Sépare les solutions par « ; ».
  → x=-1;x=-1/2
  pièges : zero_product_sign

Résous (x−2)(3x−5)=0. Sépare les solutions par « ; ».
  → x=1,666666667;x=2
  pièges : zero_product_sign

Résous (x+9)(4x−2)=0. Sépare les solutions par « ; ».
  → x=-9;x=1/2
  pièges : zero_product_sign

```

### Niveau 4

```
Résous x(2x−6)=0. Sépare les solutions par « ; ».
  → x=0;x=3
  pièges : zero_product_forget_zero

Résous x(3x−7)=0. Sépare les solutions par « ; ».
  → x=0;x=2,333333333
  pièges : zero_product_forget_zero

Résous x(4x−5)=0. Sépare les solutions par « ; ».
  → x=0;x=5/4
  pièges : zero_product_forget_zero

```

### Niveau 5

```
Résous (x+2)(x−3)=−6. Sépare les solutions par « ; ».
  → x=0;x=1
  pièges : zero_product_misuse

Résous (x−2)(x+1)=−2. Sépare les solutions par « ; ».
  → x=0;x=1
  pièges : zero_product_misuse

Résous (x−1)(x−1)=1. Sépare les solutions par « ; ».
  → x=0;x=2
  pièges : zero_product_misuse

```

## Systèmes 2 × 2 (`eq-systems`, 11H)

_Deux équations, deux inconnues._

### Niveau 1

```
Résous le système : x+y=4 x−y=2Écris la réponse ainsi : x = … ; y = …
  → x=3;y=1
  pièges : system_one_equation

Résous le système : x+y=1 x−y=11Écris la réponse ainsi : x = … ; y = …
  → x=6;y=-5
  pièges : system_one_equation

Résous le système : x+y=−5 x−y=−3Écris la réponse ainsi : x = … ; y = …
  → x=-4;y=-1
  pièges : system_one_equation

```

### Niveau 2

```
Résous le système : x+y=13 x−y=1Écris la réponse ainsi : x = … ; y = …
  → x=7;y=6
  pièges : system_one_equation

Résous le système : x+y=4 x−y=12Écris la réponse ainsi : x = … ; y = …
  → x=8;y=-4
  pièges : system_one_equation

Résous le système : x+y=6 x−y=0Écris la réponse ainsi : x = … ; y = …
  → x=3;y=3
  pièges : system_one_equation

```

### Niveau 3

```
Résous le système : y=−x+13 2x+y=18Écris la réponse ainsi : x = … ; y = …
  → x=5;y=8
  pièges : system_one_equation

Résous le système : y=−2x+16 x+4y=15Écris la réponse ainsi : x = … ; y = …
  → x=7;y=2
  pièges : system_one_equation

Résous le système : y=x+7 4x+3y=−14Écris la réponse ainsi : x = … ; y = …
  → x=-5;y=2
  pièges : system_one_equation

```

### Niveau 4

```
Résous le système : 4x+4y=20 −5x−3y=−23Écris la réponse ainsi : x = … ; y = …
  → x=4;y=1
  pièges : system_one_equation

Résous le système : 2x−y=15 −2x−y=−13Écris la réponse ainsi : x = … ; y = …
  → x=7;y=-1
  pièges : system_one_equation

Résous le système : 4x+4y=8 −3x+y=6Écris la réponse ainsi : x = … ; y = …
  → x=-1;y=3
  pièges : system_one_equation

```

### Niveau 5

```
Résous le système : 3x+y=4 −x+5y=4Écris la réponse ainsi : x = … ; y = …
  → x=1;y=1
  pièges : system_one_equation

Résous le système : −4x−5y=42 −4x−2y=24Écris la réponse ainsi : x = … ; y = …
  → x=-3;y=-6
  pièges : system_one_equation

Résous le système : −x−y=−6 5x+2y=27Écris la réponse ainsi : x = … ; y = …
  → x=5;y=1
  pièges : system_one_equation

```

## Pièges de cette unité

- **« = » lu comme « voici le résultat »** (`equals_as_result`, R) : 8 + 4 = … + 5 → 12 au lieu de 8 + 4 = 7 + 5
- **Passer de l'autre côté sans changer l'opération** (`eq_move_no_sign`, E) : 3x + 5 = 20 → 3x = 25 au lieu de 3x = 20 − 5 = 15
- **Mauvaise opération inverse** (`eq_inverse_op`, R) : 3x = 15 → x = 15 − 3 au lieu de 3x = 15 → x = 15 ÷ 3 = 5
- **« Changer de côté, changer de signe » pour un ×** (`eq_change_side_sign_mult`, E) : 3x = 15 → x = −15/3 au lieu de 3x = 15 → x = 5
- **Diviser un seul terme** (`eq_divide_one_term`, R) : 2x + 6 = 10 → x + 6 = 5 au lieu de 2x + 6 = 10 → x + 3 = 5
- **Opérer d'un seul côté** (`eq_one_side_only`, R) : x + 5 = 12 → x = 12 + 5 au lieu de x + 5 − 5 = 12 − 5
- **Produit nul utilisé quand le produit n'est pas nul** (`zero_product_misuse`, R) : (x − 2)(x + 3) = 6 → x = 8 ou x = 3 au lieu de on développe d'abord
- **Solutions avec le mauvais signe** (`zero_product_sign`, E) : (x − 2)(x + 3) = 0 → x = −2 ou x = 3 au lieu de x = 2 ou x = −3
- **Oublier la solution x = 0** (`zero_product_forget_zero`, E) : x(2x − 6) = 0 → x = 3 au lieu de x = 0 ou x = 3
- **Vérifier une seule équation** (`system_one_equation`, E) : x + y = 7, x − y = 1 → (5 ; 2) au lieu de (4 ; 3) vérifie les deux
