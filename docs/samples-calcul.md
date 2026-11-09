# Exemples de questions — Calcul mental

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Additions jusqu'à 20 (`cm-add20`, 5H)

_Faire 10, les doubles, les presque-doubles._

### Niveau 1

```
Calcule de tête.
  3+4= [7]    pièges attendus : 12 [fact_mul_for_add], 8 [count_off_by_one], 6 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  5+5= [10]    pièges attendus : 25 [fact_mul_for_add], 11 [count_off_by_one], 9 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  6+1= [7]    pièges attendus : 6 [fact_mul_for_add], 8 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

```

### Niveau 2

```
Calcule de tête.
  8+4= [12]    pièges attendus : 32 [fact_mul_for_add], 13 [count_off_by_one], 11 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  8+9= [17]    pièges attendus : 72 [fact_mul_for_add], 18 [count_off_by_one], 16 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  8+4= [12]    pièges attendus : 32 [fact_mul_for_add], 13 [count_off_by_one], 11 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

```

### Niveau 3

```
Calcule de tête.
  7+7= [14]    pièges attendus : 49 [fact_mul_for_add], 15 [count_off_by_one], 13 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  7+4= [11]    pièges attendus : 28 [fact_mul_for_add], 12 [count_off_by_one], 10 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  9+6= [15]    pièges attendus : 54 [fact_mul_for_add], 16 [count_off_by_one], 14 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

```

### Niveau 4

```
Calcule de tête.
  1+1= [2]    pièges attendus : 1 [fact_mul_for_add], 3 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  6+8= [14]    pièges attendus : 48 [fact_mul_for_add], 15 [count_off_by_one], 13 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  4+6= [10]    pièges attendus : 24 [fact_mul_for_add], 11 [count_off_by_one], 9 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

```

### Niveau 5

```
Calcule de tête.
  3+3= [6]    pièges attendus : 9 [fact_mul_for_add], 7 [count_off_by_one], 5 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  5+2= [7]    pièges attendus : 10 [fact_mul_for_add], 8 [count_off_by_one], 6 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

Calcule de tête.
  5+9= [14]    pièges attendus : 45 [fact_mul_for_add], 15 [count_off_by_one], 13 [count_off_by_one]
  pièges : fact_mul_for_add, count_off_by_one

```

## Soustractions jusqu'à 20 (`cm-sub20`, 5H)

_Une soustraction est une addition à trou._

### Niveau 1

```
Calcule de tête.
  5−2= [3]    pièges attendus : 4 [count_off_by_one], 2 [count_off_by_one], 7 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  10−2= [8]    pièges attendus : 9 [count_off_by_one], 7 [count_off_by_one], 12 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  8−1= [7]    pièges attendus : 8 [count_off_by_one], 6 [count_off_by_one], 9 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

```

### Niveau 2

```
Calcule de tête.
  19−1= [18]    pièges attendus : 19 [count_off_by_one], 17 [count_off_by_one], 20 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  15−5= [10]    pièges attendus : 11 [count_off_by_one], 9 [count_off_by_one], 20 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  16−6= [10]    pièges attendus : 11 [count_off_by_one], 9 [count_off_by_one], 22 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

```

### Niveau 3

```
Calcule de tête.
  11−3= [8]    pièges attendus : 9 [count_off_by_one], 7 [count_off_by_one], 14 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  11−3= [8]    pièges attendus : 9 [count_off_by_one], 7 [count_off_by_one], 14 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  13−9= [4]    pièges attendus : 5 [count_off_by_one], 3 [count_off_by_one], 22 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

```

### Niveau 4

```
Calcule de tête.
  16−4= [12]    pièges attendus : 13 [count_off_by_one], 11 [count_off_by_one], 20 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  13−2= [11]    pièges attendus : 12 [count_off_by_one], 10 [count_off_by_one], 15 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  16−8= [8]    pièges attendus : 9 [count_off_by_one], 7 [count_off_by_one], 24 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

```

### Niveau 5

```
Calcule de tête.
  8−6= [2]    pièges attendus : 3 [count_off_by_one], 1 [count_off_by_one], 14 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  10−3= [7]    pièges attendus : 8 [count_off_by_one], 6 [count_off_by_one], 13 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

Calcule de tête.
  16−4= [12]    pièges attendus : 13 [count_off_by_one], 11 [count_off_by_one], 20 [fact_add_for_sub]
  pièges : count_off_by_one, fact_add_for_sub

```

## Ajouter ou retirer un petit nombre (`cm-add1`, 5H)

_47 + 8, 52 − 7 : on passe par la dizaine._

### Niveau 1

```
Calcule de tête.
  36+2= [38] 

Calcule de tête.
  23+2= [25] 

Calcule de tête.
  12+4= [16] 

```

### Niveau 2

```
Calcule de tête.
  74+9= [83]    pièges attendus : 73 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  35+7= [42]    pièges attendus : 32 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  26+6= [32]    pièges attendus : 22 [forget_carry]
  pièges : forget_carry

```

### Niveau 3

```
Calcule de tête.
  83−2= [81] 

Calcule de tête.
  98−6= [92] 

Calcule de tête.
  75−4= [71] 

```

### Niveau 4

```
Calcule de tête.
  72−9= [63]    pièges attendus : 77 [sub_smaller_from_larger]
  pièges : sub_smaller_from_larger

Calcule de tête.
  52−8= [44]    pièges attendus : 56 [sub_smaller_from_larger]
  pièges : sub_smaller_from_larger

Calcule de tête.
  22−9= [13]    pièges attendus : 27 [sub_smaller_from_larger]
  pièges : sub_smaller_from_larger

```

### Niveau 5

```
Calcule de tête.
  73+7= [80]    pièges attendus : 70 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  47+3= [50]    pièges attendus : 40 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  66−9= [57]    pièges attendus : 63 [sub_smaller_from_larger]
  pièges : sub_smaller_from_larger

```

## Ajouter ou retirer un nombre à 2 chiffres (`cm-add2`, 6H)

_Les dizaines puis les unités, ou arrondir et corriger._

### Niveau 1

```
Calcule de tête.
  21+62= [83] 

Calcule de tête.
  33+15= [48] 

Calcule de tête.
  44+13= [57] 

```

### Niveau 2

```
Calcule de tête.
  59+31= [90]    pièges attendus : 80 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  48+34= [82]    pièges attendus : 72 [forget_carry]
  pièges : forget_carry

Calcule de tête.
  37+34= [71]    pièges attendus : 61 [forget_carry]
  pièges : forget_carry

```

### Niveau 3

```
Calcule de tête.
  67−27= [40]    pièges attendus : 34 [compensation_wrong_way]
  pièges : compensation_wrong_way

Calcule de tête.
  77−41= [36] 

Calcule de tête.
  82−42= [40] 

```

### Niveau 4

```
Calcule de tête.
  72−15= [57]    pièges attendus : 63 [sub_smaller_from_larger], 67 [forget_carry]
  pièges : sub_smaller_from_larger, forget_carry

Calcule de tête.
  62−35= [27]    pièges attendus : 33 [sub_smaller_from_larger], 37 [forget_carry]
  pièges : sub_smaller_from_larger, forget_carry

Calcule de tête.
  85−58= [27]    pièges attendus : 33 [sub_smaller_from_larger], 37 [forget_carry], 23 [compensation_wrong_way]
  pièges : sub_smaller_from_larger, forget_carry, compensation_wrong_way

```

### Niveau 5

```
Calcule de tête.
  81−33= [48]    pièges attendus : 52 [sub_smaller_from_larger], 58 [forget_carry]
  pièges : sub_smaller_from_larger, forget_carry

Calcule de tête.
  83−49= [34]    pièges attendus : 46 [sub_smaller_from_larger], 44 [forget_carry], 32 [compensation_wrong_way]
  pièges : sub_smaller_from_larger, forget_carry, compensation_wrong_way

Calcule de tête.
  26+45= [71]    pièges attendus : 61 [forget_carry]
  pièges : forget_carry

```

## Livrets de 2, 5 et 10 (`tab-2510`, 5H)

_Les points d'appui des autres livrets._

### Niveau 1

```
Calcule de tête.
  8×10= [80]    pièges attendus : 72 [fact_neighbor], 88 [fact_neighbor], 70 [fact_neighbor], 90 [fact_neighbor], 18 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  2×9= [18]    pièges attendus : 16 [fact_neighbor], 20 [fact_neighbor], 9 [fact_neighbor], 27 [fact_neighbor], 11 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  3×10= [30]    pièges attendus : 27 [fact_neighbor], 33 [fact_neighbor], 20 [fact_neighbor], 40 [fact_neighbor], 13 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 2

```
Calcule de tête.
  5×5= [25]    pièges attendus : 20 [fact_neighbor], 30 [fact_neighbor], 10 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  2×5= [10]    pièges attendus : 8 [fact_neighbor], 12 [fact_neighbor], 5 [fact_neighbor], 15 [fact_neighbor], 7 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  2×4= [8]    pièges attendus : 6 [fact_neighbor], 10 [fact_neighbor], 4 [fact_neighbor], 12 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 3

```
Calcule de tête.
  6×10= [60]    pièges attendus : 54 [fact_neighbor], 66 [fact_neighbor], 50 [fact_neighbor], 70 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  5×10= [50]    pièges attendus : 45 [fact_neighbor], 55 [fact_neighbor], 40 [fact_neighbor], 60 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  2×1= [2]    pièges attendus : 4 [fact_neighbor], 1 [fact_neighbor], 3 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 4

```
Calcule de tête.
  5×10= [50]    pièges attendus : 45 [fact_neighbor], 55 [fact_neighbor], 40 [fact_neighbor], 60 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  7×10= [70]    pièges attendus : 63 [fact_neighbor], 77 [fact_neighbor], 60 [fact_neighbor], 80 [fact_neighbor], 17 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  8×10= [80]    pièges attendus : 72 [fact_neighbor], 88 [fact_neighbor], 70 [fact_neighbor], 90 [fact_neighbor], 18 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 5

```
Calcule de tête.
  5×10= [50]    pièges attendus : 45 [fact_neighbor], 55 [fact_neighbor], 40 [fact_neighbor], 60 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Trouve le nombre manquant.
  2× [8] =16   pièges attendus : 14 [missing_factor_subtract], 7 [fact_neighbor], 9 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

Calcule de tête.
  5×4= [20]    pièges attendus : 15 [fact_neighbor], 25 [fact_neighbor], 16 [fact_neighbor], 24 [fact_neighbor], 9 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

## Livrets de 3, 4 et 9 (`tab-349`, 5H)

_Le double du double, 10 fois moins une fois._

### Niveau 1

```
Calcule de tête.
  4×3= [12]    pièges attendus : 8 [fact_neighbor], 16 [fact_neighbor], 9 [fact_neighbor], 15 [fact_neighbor], 7 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  8×4= [32]    pièges attendus : 24 [fact_neighbor], 40 [fact_neighbor], 28 [fact_neighbor], 36 [fact_neighbor], 12 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  5×4= [20]    pièges attendus : 15 [fact_neighbor], 25 [fact_neighbor], 16 [fact_neighbor], 24 [fact_neighbor], 9 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 2

```
Calcule de tête.
  3×4= [12]    pièges attendus : 9 [fact_neighbor], 15 [fact_neighbor], 8 [fact_neighbor], 16 [fact_neighbor], 7 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  5×9= [45]    pièges attendus : 40 [fact_neighbor], 50 [fact_neighbor], 36 [fact_neighbor], 54 [fact_neighbor], 14 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  4×3= [12]    pièges attendus : 8 [fact_neighbor], 16 [fact_neighbor], 9 [fact_neighbor], 15 [fact_neighbor], 7 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 3

```
Calcule de tête.
  3×1= [3]    pièges attendus : 6 [fact_neighbor], 2 [fact_neighbor], 4 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  3×7= [21]    pièges attendus : 18 [fact_neighbor], 24 [fact_neighbor], 14 [fact_neighbor], 28 [fact_neighbor], 10 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  10×9= [90]    pièges attendus : 80 [fact_neighbor], 100 [fact_neighbor], 81 [fact_neighbor], 99 [fact_neighbor], 19 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 4

```
Calcule de tête.
  9×8= [72]    pièges attendus : 63 [fact_neighbor], 81 [fact_neighbor], 64 [fact_neighbor], 80 [fact_neighbor], 17 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  5×6= [30]    pièges attendus : 25 [fact_neighbor], 35 [fact_neighbor], 24 [fact_neighbor], 36 [fact_neighbor], 11 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  10×5= [50]    pièges attendus : 40 [fact_neighbor], 60 [fact_neighbor], 45 [fact_neighbor], 55 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 5

```
Calcule de tête.
  9×2= [18]    pièges attendus : 9 [fact_neighbor], 27 [fact_neighbor], 16 [fact_neighbor], 20 [fact_neighbor], 11 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Trouve le nombre manquant.
  4× [8] =32   pièges attendus : 28 [missing_factor_subtract], 7 [fact_neighbor], 9 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

Trouve le nombre manquant.
  3× [2] =6   pièges attendus : 3 [missing_factor_subtract], 1 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

```

## Livrets de 6, 7 et 8 (`tab-678`, 6H)

_Les derniers, à partir de ceux que tu connais._

### Niveau 1

```
Calcule de tête.
  6×2= [12]    pièges attendus : 6 [fact_neighbor], 18 [fact_neighbor], 10 [fact_neighbor], 14 [fact_neighbor], 8 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  6×8= [48]    pièges attendus : 42 [fact_neighbor], 54 [fact_neighbor], 40 [fact_neighbor], 56 [fact_neighbor], 14 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  9×6= [54]    pièges attendus : 45 [fact_neighbor], 63 [fact_neighbor], 48 [fact_neighbor], 60 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 2

```
Calcule de tête.
  10×6= [60]    pièges attendus : 50 [fact_neighbor], 70 [fact_neighbor], 54 [fact_neighbor], 66 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  6×4= [24]    pièges attendus : 18 [fact_neighbor], 30 [fact_neighbor], 20 [fact_neighbor], 28 [fact_neighbor], 10 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  1×8= [8]    pièges attendus : 7 [fact_neighbor], 9 [fact_neighbor], 16 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 3

```
Calcule de tête.
  6×6= [36]    pièges attendus : 30 [fact_neighbor], 42 [fact_neighbor], 12 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  6×7= [42]    pièges attendus : 36 [fact_neighbor], 48 [fact_neighbor], 35 [fact_neighbor], 49 [fact_neighbor], 13 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  9×7= [63]    pièges attendus : 54 [fact_neighbor], 72 [fact_neighbor], 56 [fact_neighbor], 70 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 4

```
Calcule de tête.
  5×6= [30]    pièges attendus : 25 [fact_neighbor], 35 [fact_neighbor], 24 [fact_neighbor], 36 [fact_neighbor], 11 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  1×9= [9]    pièges attendus : 8 [fact_neighbor], 10 [fact_neighbor], 18 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  7×1= [7]    pièges attendus : 14 [fact_neighbor], 6 [fact_neighbor], 8 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 5

```
Trouve le nombre manquant.
  8× [8] =64   pièges attendus : 56 [missing_factor_subtract], 7 [fact_neighbor], 9 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

Trouve le nombre manquant.
  6× [6] =36   pièges attendus : 30 [missing_factor_subtract], 5 [fact_neighbor], 7 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

Calcule de tête.
  7×7= [49]    pièges attendus : 42 [fact_neighbor], 56 [fact_neighbor], 14 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

## Divisions des livrets (`tab-div`, 6H)

_56 : 8 = 7, car 8 × 7 = 56._

### Niveau 1

```
Calcule de tête.
  20:2= [10]    pièges attendus : 9 [fact_neighbor], 11 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  20:10= [2]    pièges attendus : 1 [fact_neighbor], 3 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  30:10= [3]    pièges attendus : 2 [fact_neighbor], 4 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 2

```
Calcule de tête.
  18:3= [6]    pièges attendus : 5 [fact_neighbor], 7 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  20:10= [2]    pièges attendus : 1 [fact_neighbor], 3 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  32:4= [8]    pièges attendus : 7 [fact_neighbor], 9 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 3

```
Calcule de tête.
  36:6= [6]    pièges attendus : 5 [fact_neighbor], 7 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  70:7= [10]    pièges attendus : 9 [fact_neighbor], 11 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  42:7= [6]    pièges attendus : 5 [fact_neighbor], 7 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 4

```
Calcule de tête.
  21:3= [7]    pièges attendus : 6 [fact_neighbor], 8 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  63:9= [7]    pièges attendus : 6 [fact_neighbor], 8 [fact_neighbor]
  pièges : fact_neighbor

Calcule de tête.
  16:2= [8]    pièges attendus : 7 [fact_neighbor], 9 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 5

```
Calcule de tête.
  16:4= [4]    pièges attendus : 3 [fact_neighbor], 5 [fact_neighbor]
  pièges : fact_neighbor

Trouve le nombre manquant.
  10× [10] =100   pièges attendus : 90 [missing_factor_subtract], 9 [fact_neighbor], 11 [fact_neighbor]
  pièges : missing_factor_subtract, fact_neighbor

Calcule de tête.
  35:5= [7]    pièges attendus : 6 [fact_neighbor], 8 [fact_neighbor]
  pièges : fact_neighbor

```

## Livrets de 11 et 12 (`tab-1112`, 7H)

_10 fois plus une fois, 10 fois plus deux fois._

### Niveau 1

```
Calcule de tête.
  5×11= [55]    pièges attendus : 50 [fact_neighbor], 60 [fact_neighbor], 44 [fact_neighbor], 66 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  11×6= [66]    pièges attendus : 55 [fact_neighbor], 77 [fact_neighbor], 60 [fact_neighbor], 72 [fact_neighbor], 17 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  11×7= [77]    pièges attendus : 66 [fact_neighbor], 88 [fact_neighbor], 70 [fact_neighbor], 84 [fact_neighbor], 18 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 2

```
Calcule de tête.
  12×11= [132]    pièges attendus : 120 [fact_neighbor], 144 [fact_neighbor], 121 [fact_neighbor], 143 [fact_neighbor], 23 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  11×5= [55]    pièges attendus : 44 [fact_neighbor], 66 [fact_neighbor], 50 [fact_neighbor], 60 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  7×11= [77]    pièges attendus : 70 [fact_neighbor], 84 [fact_neighbor], 66 [fact_neighbor], 88 [fact_neighbor], 18 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

### Niveau 3

```
Calcule de tête.
  12×5= [60]    pièges attendus : 48 [fact_neighbor], 72 [fact_neighbor], 55 [fact_neighbor], 65 [fact_neighbor], 17 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  12×3= [36]    pièges attendus : 24 [fact_neighbor], 48 [fact_neighbor], 33 [fact_neighbor], 39 [fact_neighbor], 15 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  1×12= [12]    pièges attendus : 11 [fact_neighbor], 13 [fact_neighbor], 24 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 4

```
Calcule de tête.
  12×5= [60]    pièges attendus : 48 [fact_neighbor], 72 [fact_neighbor], 55 [fact_neighbor], 65 [fact_neighbor], 17 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  4×12= [48]    pièges attendus : 44 [fact_neighbor], 52 [fact_neighbor], 36 [fact_neighbor], 60 [fact_neighbor], 16 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  1×12= [12]    pièges attendus : 11 [fact_neighbor], 13 [fact_neighbor], 24 [fact_neighbor]
  pièges : fact_neighbor

```

### Niveau 5

```
Calcule de tête.
  2×11= [22]    pièges attendus : 20 [fact_neighbor], 24 [fact_neighbor], 11 [fact_neighbor], 33 [fact_neighbor], 13 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  6×12= [72]    pièges attendus : 66 [fact_neighbor], 78 [fact_neighbor], 60 [fact_neighbor], 84 [fact_neighbor], 18 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

Calcule de tête.
  12×7= [84]    pièges attendus : 72 [fact_neighbor], 96 [fact_neighbor], 77 [fact_neighbor], 91 [fact_neighbor], 19 [fact_add_for_mul]
  pièges : fact_neighbor, fact_add_for_mul

```

## Carrés jusqu'à 13² (`sq-13`, 7H)

_1, 4, 9, 16, 25… 144, 169._

### Niveau 1

```
Calcule de tête.
  4^2= [16]    pièges attendus : 8 [pow_times_exponent], 12 [fact_neighbor], 20 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  4^2= [16]    pièges attendus : 8 [pow_times_exponent], 12 [fact_neighbor], 20 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  3^2= [9]    pièges attendus : 6 [pow_times_exponent], 12 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

```

### Niveau 2

```
Calcule de tête.
  6^2= [36]    pièges attendus : 12 [pow_times_exponent], 30 [fact_neighbor], 42 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  5^2= [25]    pièges attendus : 10 [pow_times_exponent], 20 [fact_neighbor], 30 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  5^2= [25]    pièges attendus : 10 [pow_times_exponent], 20 [fact_neighbor], 30 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

```

### Niveau 3

```
Calcule de tête.
  10^2= [100]    pièges attendus : 10 [square_digits], 20 [pow_times_exponent], 90 [fact_neighbor], 110 [fact_neighbor]
  pièges : square_digits, pow_times_exponent, fact_neighbor

Calcule de tête.
  6^2= [36]    pièges attendus : 12 [pow_times_exponent], 30 [fact_neighbor], 42 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  11^2= [121]    pièges attendus : 101 [pow_distribute_sum], 11 [square_digits], 22 [pow_times_exponent], 110 [fact_neighbor], 132 [fact_neighbor]
  pièges : pow_distribute_sum, square_digits, pow_times_exponent, fact_neighbor

```

### Niveau 4

```
Calcule de tête.
  1^2= [1]    pièges attendus : 2 [pow_times_exponent]
  pièges : pow_times_exponent

Calcule de tête.
  9^2= [81]    pièges attendus : 18 [pow_times_exponent], 72 [fact_neighbor], 90 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

Calcule de tête.
  3^2= [9]    pièges attendus : 6 [pow_times_exponent], 12 [fact_neighbor]
  pièges : pow_times_exponent, fact_neighbor

```

### Niveau 5

```
Calcule de tête.
  10^2= [100]    pièges attendus : 10 [square_digits], 20 [pow_times_exponent], 90 [fact_neighbor], 110 [fact_neighbor]
  pièges : square_digits, pow_times_exponent, fact_neighbor

Quel nombre au carré donne ce résultat ?
 [7] ^2=49   pièges attendus : 6 [fact_neighbor], 8 [fact_neighbor]
  pièges : fact_neighbor

Quel nombre au carré donne ce résultat ?
 [12] ^2=144   pièges attendus : 72 [sqrt_half], 11 [fact_neighbor], 13 [fact_neighbor]
  pièges : sqrt_half, fact_neighbor

```

## Carrés jusqu'à 25² (`sq-25`, 8H)

_(20 + 3)² = 400 + 120 + 9._

### Niveau 1

```
Calcule de tête.
  14^2= [196]    pièges attendus : 116 [pow_distribute_sum], 28 [pow_times_exponent], 182 [fact_neighbor], 210 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  15^2= [225]    pièges attendus : 125 [pow_distribute_sum], 30 [pow_times_exponent], 210 [fact_neighbor], 240 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  16^2= [256]    pièges attendus : 136 [pow_distribute_sum], 32 [pow_times_exponent], 240 [fact_neighbor], 272 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

```

### Niveau 2

```
Calcule de tête.
  16^2= [256]    pièges attendus : 136 [pow_distribute_sum], 32 [pow_times_exponent], 240 [fact_neighbor], 272 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  14^2= [196]    pièges attendus : 116 [pow_distribute_sum], 28 [pow_times_exponent], 182 [fact_neighbor], 210 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  17^2= [289]    pièges attendus : 149 [pow_distribute_sum], 34 [pow_times_exponent], 272 [fact_neighbor], 306 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

```

### Niveau 3

```
Calcule de tête.
  18^2= [324]    pièges attendus : 164 [pow_distribute_sum], 36 [pow_times_exponent], 306 [fact_neighbor], 342 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  17^2= [289]    pièges attendus : 149 [pow_distribute_sum], 34 [pow_times_exponent], 272 [fact_neighbor], 306 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  18^2= [324]    pièges attendus : 164 [pow_distribute_sum], 36 [pow_times_exponent], 306 [fact_neighbor], 342 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

```

### Niveau 4

```
Calcule de tête.
  23^2= [529]    pièges attendus : 409 [pow_distribute_sum], 49 [square_digits], 46 [pow_times_exponent], 506 [fact_neighbor], 552 [fact_neighbor]
  pièges : pow_distribute_sum, square_digits, pow_times_exponent, fact_neighbor

Calcule de tête.
  15^2= [225]    pièges attendus : 125 [pow_distribute_sum], 30 [pow_times_exponent], 210 [fact_neighbor], 240 [fact_neighbor]
  pièges : pow_distribute_sum, pow_times_exponent, fact_neighbor

Calcule de tête.
  22^2= [484]    pièges attendus : 404 [pow_distribute_sum], 44 [square_digits], 462 [fact_neighbor], 506 [fact_neighbor]
  pièges : pow_distribute_sum, square_digits, fact_neighbor

```

### Niveau 5

```
Quel nombre au carré donne ce résultat ?
 [13] ^2=169   pièges attendus : 12 [fact_neighbor], 14 [fact_neighbor]
  pièges : fact_neighbor

Quel nombre au carré donne ce résultat ?
 [24] ^2=576   pièges attendus : 288 [sqrt_half], 23 [fact_neighbor], 25 [fact_neighbor]
  pièges : sqrt_half, fact_neighbor

Quel nombre au carré donne ce résultat ?
 [20] ^2=400   pièges attendus : 200 [sqrt_half], 19 [fact_neighbor], 21 [fact_neighbor]
  pièges : sqrt_half, fact_neighbor

```

## Arrondir (`cm-round`, 7H)

_À la dizaine, à l'unité, au dixième._

### Niveau 1

```
Arrondis 19 à la dizaine.
  → 20   pièges attendus : 10 [round_truncate]
  pièges : round_truncate

Arrondis 72 à la dizaine.
  → 70

Arrondis 492 à la dizaine.
  → 490

```

### Niveau 2

```
Arrondis 5596 à la centaine.
  → 5600   pièges attendus : 5500 [round_truncate]
  pièges : round_truncate

Arrondis 8534 à la centaine.
  → 8500

Arrondis 9843 à la centaine.
  → 9800

```

### Niveau 3

```
Arrondis 9,67 à l’unité.
  → 10   pièges attendus : 9 [round_truncate]
  pièges : round_truncate

Arrondis 81,3 à l’unité.
  → 81

Arrondis 99,3 à l’unité.
  → 99

```

### Niveau 4

```
Arrondis 87,55 au dixième.
  → 87,6   pièges attendus : 175/2 [round_truncate]
  pièges : round_truncate

Arrondis 77,83 au dixième.
  → 77,8

Arrondis 84,21 au dixième.
  → 84,2

```

### Niveau 5

```
Arrondis 92,38 au dixième.
  → 92,4   pièges attendus : 923/10 [round_truncate]
  pièges : round_truncate

Arrondis 25,81 au dixième.
  → 25,8

Arrondis 3,81 à l’unité.
  → 4   pièges attendus : 3 [round_truncate]
  pièges : round_truncate

```

## Estimer un résultat (`cm-estimate`, 8H)

_L'ordre de grandeur, avant de calculer._

### Niveau 1

```
Sans calculer exactement : 158+225 vaut environ…
  · 40   ✔ 400   · 4000   · 40 000

Sans calculer exactement : 302+592 vaut environ…
  · 90   ✔ 900   · 9000   · 90 000

Sans calculer exactement : 404+603 vaut environ…
  · 100   ✔ 1000   · 10 000   · 100 000

```

### Niveau 2

```
Sans calculer exactement : 97×5 vaut environ…
  · 50   ✔ 500   · 5000   · 50 000

Sans calculer exactement : 82×8 vaut environ…
  · 64   ✔ 640   · 6400   · 64 000

Sans calculer exactement : 22×7 vaut environ…
  · 14   ✔ 140   · 1400   · 14 000

```

### Niveau 3

```
Sans calculer exactement : 88×34 vaut environ…
  · 270   ✔ 2700   · 27 000   · 270 000

Sans calculer exactement : 63×90 vaut environ…
  · 540   ✔ 5400   · 54 000   · 540 000

Sans calculer exactement : 52×45 vaut environ…
  · 250   ✔ 2500   · 25 000   · 250 000

```

### Niveau 4

```
Sans calculer exactement : 1592:80 vaut environ…
  · 2   ✔ 20   · 200   · 2000

Sans calculer exactement : 1790:61 vaut environ…
  · 3   ✔ 30   · 300   · 3000

Sans calculer exactement : 423:20 vaut environ…
  · 2,1   ✔ 21   · 210   · 2100

```

### Niveau 5

```
Sans calculer exactement : 0,49×802 vaut environ…
  · 40   ✔ 400   · 4000   · 40 000

Sans calculer exactement : 0,18×903 vaut environ…
  · 18   ✔ 180   · 1800   · 18 000

Sans calculer exactement : 0,61×602 vaut environ…
  · 36   ✔ 360   · 3600   · 36 000

```

## Calcul malin (`cm-mix`, 8H)

_Doubles, moitiés, × 5, × 25, × 9, × 11._

### Niveau 1

```
La moitié de 82 ?
  → 41

Le double de 15 ?
  → 30

Le double de 46 ?
  → 92

```

### Niveau 2

```
Calcule de tête : 12×5
  → 60

Calcule de tête : 14×5
  → 70

Calcule de tête : 58×5
  → 290

```

### Niveau 3

```
Calcule de tête : 12×25
  → 300

Calcule de tête : 76×25
  → 1900

Calcule de tête : 64×25
  → 1600

```

### Niveau 4

```
Calcule de tête : 12×9
  → 108

Calcule de tête : 43×9
  → 387

Calcule de tête : 19×11
  → 209

```

### Niveau 5

```
Calcule de tête : 120:5
  → 24

Calcule de tête : 335:5
  → 67

Calcule de tête : 330:5
  → 66

```

## Pièges de cette unité

- **Résultat d'un fait voisin** (`fact_neighbor`, R) : 7 × 8 = 54 au lieu de 7 × 8 = 56
- **Additionner au lieu de multiplier** (`fact_add_for_mul`, R) : 3 × 4 = 7 au lieu de 3 × 4 = 12
- **Multiplier au lieu d'additionner** (`fact_mul_for_add`, E) : 3 + 4 = 12 au lieu de 3 + 4 = 7
- **Additionner au lieu de soustraire** (`fact_add_for_sub`, E) : 13 − 8 = 21 au lieu de 13 − 8 = 5
- **Compter une fois de trop ou de moins** (`count_off_by_one`, E) : 8 + 3 = 12 au lieu de 8 + 3 = 11
- **Oublier la retenue** (`forget_carry`, E) : 47 + 8 = 45 au lieu de 47 + 8 = 55
- **Ôter le petit chiffre du grand** (`sub_smaller_from_larger`, R) : 52 − 7 = 55 au lieu de 52 − 7 = 45
- **Corriger dans le mauvais sens** (`compensation_wrong_way`, E) : 47 + 38 = 47 + 40 + 2 = 89 au lieu de 47 + 40 − 2 = 85
- **Le carré de chaque chiffre** (`square_digits`, E) : 23² = 49 au lieu de 23² = 529
- **Soustraire au lieu de diviser** (`missing_factor_subtract`, E) : 7 × … = 56 → 49 au lieu de 7 × 8 = 56
- **Couper au lieu d'arrondir** (`round_truncate`, E) : 3,47 → 3,4 au lieu de 3,47 → 3,5
