# Exemples de questions — Racines carrées

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Racines carrées (`root-squares`, 10H)

_Le nombre positif dont le carré est donné._

### Niveau 1

```
Relie chaque racine carrée à sa valeur.
  √9 ↔ 3   √1 ↔ 1   √36 ↔ 6   √121 ↔ 11

Relie chaque racine carrée à sa valeur.
  √36 ↔ 6   √49 ↔ 7   √9 ↔ 3   √144 ↔ 12

Relie chaque racine carrée à sa valeur.
  √144 ↔ 12   √49 ↔ 7   √100 ↔ 10   √25 ↔ 5

```

### Niveau 2

```
Calcule √100.
  → 10
  pièges : sqrt_half, sqrt_is_square

Calcule √16.
  → 4
  pièges : sqrt_half, sqrt_is_square

Calcule √36.
  → 6
  pièges : sqrt_half, sqrt_is_square

```

### Niveau 3

```
Combien vaut √4 ?
  · 4   · 3   · 16 [sqrt_is_square]   ✔ 2
  pièges : sqrt_is_square

Combien vaut √25 ?
  · 25/2 [sqrt_half]   · 7   ✔ 5   · 6
  pièges : sqrt_half

Combien vaut √144 ?
  · 13   ✔ 12   · 72 [sqrt_half]   · 14
  pièges : sqrt_half

```

### Niveau 4

```
Calcule √2500.
  → 50
  pièges : sqrt_half, sqrt_is_square

Calcule √14400.
  → 120
  pièges : sqrt_half, sqrt_is_square

Calcule √(49/100).
  → 7/10
  pièges : sqrt_half, sqrt_is_square

```

### Niveau 5

```
Combien vaut √9 ?
  ✔ 3   · −3 [sqrt_plus_minus]   · −3 et 3 [sqrt_plus_minus]   · 4,5 [sqrt_half]
  pièges : sqrt_plus_minus, sqrt_half

Combien vaut √16 ?
  · −4 et 4 [sqrt_plus_minus]   · −4 [sqrt_plus_minus]   · 8 [sqrt_half]   ✔ 4
  pièges : sqrt_plus_minus, sqrt_half

Combien vaut √49 ?
  · −7 et 7 [sqrt_plus_minus]   ✔ 7   · 24,5 [sqrt_half]   · −7 [sqrt_plus_minus]
  pièges : sqrt_plus_minus, sqrt_half

```

## Encadrer une racine (`root-estimate`, 11H)

_√50 est entre 7 et 8, car 49 < 50 < 64._

### Niveau 1

```
Entre quels entiers consécutifs se trouve √37 ?
  · 7 et 8   · 5 et 6   ✔ 6 et 7   · 18 et 19 [sqrt_half]
  pièges : sqrt_half

Entre quels entiers consécutifs se trouve √11 ?
  · 2 et 3   ✔ 3 et 4   · 5 et 6 [sqrt_half]   · 4 et 5
  pièges : sqrt_half

Entre quels entiers consécutifs se trouve √50 ?
  · 6 et 7   ✔ 7 et 8   · 25 et 26 [sqrt_half]   · 8 et 9
  pièges : sqrt_half

```

### Niveau 2

```
Quel est le plus grand entier plus petit que √59 ?
  → 7   pièges attendus : 29 [sqrt_half]
  pièges : sqrt_half

Quel est le plus grand entier plus petit que √61 ?
  → 7   pièges attendus : 30 [sqrt_half]
  pièges : sqrt_half

Quel est le plus grand entier plus petit que √34 ?
  → 5   pièges attendus : 17 [sqrt_half]
  pièges : sqrt_half

```

### Niveau 3

```
Quel entier est le plus proche de √110 ?
  · 9   · 11   · 55 [sqrt_half]   ✔ 10
  pièges : sqrt_half

Quel entier est le plus proche de √105 ?
  ✔ 10   · 9   · 11   · 52 [sqrt_half]
  pièges : sqrt_half

Quel entier est le plus proche de √83 ?
  · 10   · 41 [sqrt_half]   · 8   ✔ 9
  pièges : sqrt_half

```

### Niveau 4

```
Compare : √65 ? 9
  ✔ <   · =   · > [sqrt_half]
  pièges : sqrt_half

Compare : √182 ? 13
  · <   · =   ✔ >

Compare : √97 ? 10
  ✔ <   · =   · > [sqrt_half]
  pièges : sqrt_half

```

### Niveau 5

```
Quel est le plus grand nombre ?
  · 10   · 9   · √35   ✔ √147

Quel est le plus grand nombre ?
  ✔ 11   · √57 [sqrt_half]   · 9   · √39
  pièges : sqrt_half

Quel est le plus grand nombre ?
  ✔ √131   · √62   · 10   · 3

```

## Calculer avec des racines (`root-calc`, 11H)

_√(9 + 16) n'est pas √9 + √16._

### Niveau 1

```
Calcule √1,44.
  → 1,2 (decimal)
  pièges : sqrt_half, sqrt_is_square

Calcule √0,16.
  → 0,4 (decimal)
  pièges : sqrt_half, sqrt_is_square

Calcule √1,21.
  → 1,1 (decimal)
  pièges : sqrt_half, sqrt_is_square

```

### Niveau 2

```
Combien vaut √(144+25) ?
  · 77 [sqrt_distribute_sum]   ✔ 13   · 49/2 [sqrt_distribute_sum]   · 17 [sqrt_distribute_sum]
  pièges : sqrt_distribute_sum

Combien vaut √36+√64 ?
  · 10 [sqrt_combine_sum]   ✔ 14   · 38 [sqrt_half]   · 26 [sqrt_half]
  pièges : sqrt_combine_sum, sqrt_half

Combien vaut √36+√64 ?
  · 26 [sqrt_half]   ✔ 14   · 38 [sqrt_half]   · 10 [sqrt_combine_sum]
  pièges : sqrt_combine_sum, sqrt_half

```

### Niveau 3

```
Calcule (√21)^2.
  → 21   pièges attendus : 441 [sqrt_squared_squares]
  pièges : sqrt_squared_squares, sqrt_half, sqrt_is_square

Calcule (√11)^2.
  → 11   pièges attendus : 121 [sqrt_squared_squares]
  pièges : sqrt_squared_squares, sqrt_half, sqrt_is_square

Calcule √((−4)^2).
  → 4   pièges attendus : -4 [sqrt_of_square_sign]
  pièges : sqrt_of_square_sign

```

### Niveau 4

```
Calcule.
  (√49 + 2)^2   [free, irréductible] → 81
  pièges : pow_distribute_sum, sqrt_half, sqrt_is_square

Calcule.
  (√16 + 5)^2   [free, irréductible] → 81
  pièges : pow_distribute_sum, sqrt_half, sqrt_is_square, pow_times_exponent

Calcule.
  1 + 4 × √9   [free, irréductible] → 13
  pièges : priority_left_to_right, sqrt_half, sqrt_is_square

```

### Niveau 5

```
Combien vaut √(−25) ?
  ✔ n'existe pas   · −5 [sqrt_negative_radicand]   · −5 et 5 [sqrt_negative_radicand]   · 5 [sqrt_negative_radicand]
  pièges : sqrt_negative_radicand

Combien vaut √(−25) ?
  ✔ n'existe pas   · 5 [sqrt_negative_radicand]   · −5 [sqrt_negative_radicand]   · −5 et 5 [sqrt_negative_radicand]
  pièges : sqrt_negative_radicand

Combien vaut √(−81) ?
  · −9 et 9 [sqrt_negative_radicand]   · 9 [sqrt_negative_radicand]   · −9 [sqrt_negative_radicand]   ✔ n'existe pas
  pièges : sqrt_negative_radicand

```

## Équations x² = a (`root-eq`, 11H)

_Deux solutions, une, ou aucune._

### Niveau 1

```
Quelles sont les solutions de x^2 = 25 ?
  ✔ −5 et 5   · aucune solution   · seulement 12,5 [sqrt_half]   · seulement 5 [square_eq_one_solution]
  pièges : square_eq_one_solution, sqrt_half

Quelles sont les solutions de x^2 = 49 ?
  ✔ −7 et 7   · seulement 7 [square_eq_one_solution]   · aucune solution   · seulement 24,5 [sqrt_half]
  pièges : square_eq_one_solution, sqrt_half

Quelles sont les solutions de x^2 = 9 ?
  · aucune solution   · seulement 3 [square_eq_one_solution]   · seulement 4,5 [sqrt_half]   ✔ −3 et 3
  pièges : square_eq_one_solution, sqrt_half

```

### Niveau 2

```
Quelles sont les solutions de x^2 = −81 ?
  · −9 et 9 [square_negative_solutions]   · seulement 9 [square_negative_solutions]   ✔ aucune solution   · seulement 40,5
  pièges : square_negative_solutions

Quelles sont les solutions de x^2 = −121 ?
  · seulement 60,5   · −11 et 11 [square_negative_solutions]   · seulement 11 [square_negative_solutions]   ✔ aucune solution
  pièges : square_negative_solutions

Quelles sont les solutions de x^2 = −121 ?
  · −11 et 11 [square_negative_solutions]   · seulement 60,5   ✔ aucune solution   · seulement 11 [square_negative_solutions]
  pièges : square_negative_solutions

```

### Niveau 3

```
x^2 = 36 et x est positif. Que vaut x ?
  → 6   pièges attendus : 18 [sqrt_half]
  pièges : sqrt_half

x^2 = 16 et x est négatif. Que vaut x ?
  → -4   pièges attendus : 8 [sqrt_half], 4 [square_eq_one_solution]
  pièges : sqrt_half, square_eq_one_solution

x^2 = 9 et x est négatif. Que vaut x ?
  → -3   pièges attendus : 9/2 [sqrt_half], 3 [square_eq_one_solution]
  pièges : sqrt_half, square_eq_one_solution

```

### Niveau 4

```
Quelles sont les solutions de x^2 = 1,44 ?
  ✔ −1,2 et 1,2   · seulement 0,72 [sqrt_half]   · seulement 1,2 [square_eq_one_solution]   · aucune solution
  pièges : square_eq_one_solution, sqrt_half

Quelles sont les solutions de x^2 = 0,25 ?
  ✔ −0,5 et 0,5   · seulement 0,125 [sqrt_half]   · aucune solution   · seulement 0,5 [square_eq_one_solution]
  pièges : square_eq_one_solution, sqrt_half

Quelles sont les solutions de x^2 = 25/36 ?
  · seulement 25/72 [sqrt_half]   ✔ −5/6 et 5/6   · aucune solution   · seulement 5/6 [square_eq_one_solution]
  pièges : square_eq_one_solution, sqrt_half

```

### Niveau 5

```
Un carré a une aire de 49 cm². Quelle est la longueur de son côté ?
  → 7   pièges attendus : 49/2 [sqrt_half]
  pièges : sqrt_half

Un carré a une aire de 36 cm². Quelle est la longueur de son côté ?
  → 6   pièges attendus : 18 [sqrt_half]
  pièges : sqrt_half

Un carré a une aire de 64 cm². Quelle est la longueur de son côté ?
  → 8   pièges attendus : 32 [sqrt_half]
  pièges : sqrt_half

```

## Produits de racines (`root-rules`, 11H)

_√a × √b = √(a × b)._

### Niveau 1

```
Combien vaut √7×√28 ?
  · √14   ✔ 14   · √35 [sqrt_product_add]   · 196 [sqrt_forget_root]
  pièges : sqrt_product_add, sqrt_forget_root

Combien vaut √3×√12 ?
  · 36 [sqrt_forget_root]   · √15 [sqrt_product_add]   · √6   ✔ 6
  pièges : sqrt_product_add, sqrt_forget_root

Combien vaut √2×√8 ?
  ✔ 4   · 16 [sqrt_forget_root]   · √10 [sqrt_product_add]   · √4
  pièges : sqrt_product_add, sqrt_forget_root

```

### Niveau 2

```
Calcule √3×√12.
  → 6   pièges attendus : 36 [sqrt_forget_root]
  pièges : sqrt_forget_root

Calcule √3×√48.
  → 12   pièges attendus : 144 [sqrt_forget_root]
  pièges : sqrt_forget_root

Calcule √2×√8.
  → 4   pièges attendus : 16 [sqrt_forget_root]
  pièges : sqrt_forget_root

```

### Niveau 3

```
Calcule √45÷√5.
  → 3   pièges attendus : 9 [sqrt_forget_root]
  pièges : sqrt_forget_root

Calcule √98÷√2.
  → 7   pièges attendus : 49 [sqrt_forget_root]
  pièges : sqrt_forget_root

Calcule √200÷√2.
  → 10   pièges attendus : 100 [sqrt_forget_root]
  pièges : sqrt_forget_root

```

### Niveau 4

```
Quelle égalité est vraie ?
  · √(144−81) = 12−9 [sqrt_distribute_sum]   · √(81+144) = 9+12 [sqrt_distribute_sum]   · √81+√144 = √225 [sqrt_combine_sum]   ✔ √(81×144) = 9×12
  pièges : sqrt_distribute_sum, sqrt_combine_sum

Quelle égalité est vraie ?
  ✔ √(81×144) = 9×12   · √81+√144 = √225 [sqrt_combine_sum]   · √(81+144) = 9+12 [sqrt_distribute_sum]   · √(144−81) = 12−9 [sqrt_distribute_sum]
  pièges : sqrt_distribute_sum, sqrt_combine_sum

Quelle égalité est vraie ?
  · √(81+144) = 9+12 [sqrt_distribute_sum]   · √81+√144 = √225 [sqrt_combine_sum]   · √(144−81) = 12−9 [sqrt_distribute_sum]   ✔ √(81×144) = 9×12
  pièges : sqrt_distribute_sum, sqrt_combine_sum

```

### Niveau 5

```
Calcule √6×√6.
  → 6   pièges attendus : 36 [sqrt_forget_root]
  pièges : sqrt_forget_root

Calcule (4×√5)^2.
  → 80   pièges attendus : 20 [pow_forget_coefficient], 400 [sqrt_squared_squares]
  pièges : pow_forget_coefficient, sqrt_squared_squares

Calcule (2×√3)^2.
  → 12   pièges attendus : 6 [pow_forget_coefficient], 36 [sqrt_squared_squares]
  pièges : pow_forget_coefficient, sqrt_squared_squares

```

## Pièges de cette unité

- **Racine carrée égale la moitié** (`sqrt_half`, R) : √16 = 8 au lieu de √16 = 4
- **Élever au carré au lieu de prendre la racine** (`sqrt_is_square`, E) : √9 = 81 au lieu de √9 = 3
- **Distribuer la racine sur une somme** (`sqrt_distribute_sum`, R) : √(9 + 16) = 3 + 4 = 7 au lieu de √(9 + 16) = √25 = 5
- **Regrouper une somme sous une seule racine** (`sqrt_combine_sum`, R) : √9 + √16 = √25 = 5 au lieu de √9 + √16 = 3 + 4 = 7
- **La racine carrée vaut aussi le négatif** (`sqrt_plus_minus`, R) : √25 = −5 et 5 au lieu de √25 = 5
- **Racine d'un nombre négatif** (`sqrt_negative_radicand`, R) : √(−9) = −3 au lieu de √(−9) n'existe pas
- **Garder le signe sous la racine d'un carré** (`sqrt_of_square_sign`, E) : √((−5)²) = −5 au lieu de √((−5)²) = √25 = 5
- **Élever au carré le nombre sous la racine** (`sqrt_squared_squares`, E) : (√7)² = 49 au lieu de (√7)² = 7
- **Additionner sous la racine en multipliant** (`sqrt_product_add`, E) : √2 × √8 = √10 au lieu de √2 × √8 = √16 = 4
- **Oublier la racine à la fin** (`sqrt_forget_root`, E) : √2 × √8 = 16 au lieu de √2 × √8 = √16 = 4
- **Oublier la solution négative** (`square_eq_one_solution`, E) : x² = 25 donne seulement x = 5 au lieu de x = 5 ou x = −5
- **Des solutions à x² = un nombre négatif** (`square_negative_solutions`, E) : x² = −9 donne x = −3 au lieu de pas de solution
