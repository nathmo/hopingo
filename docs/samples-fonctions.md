# Exemples de questions — Fonctions

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Lire un graphique (`fn-read`, 9H)

_f(2) = ? et pour quel x ?_

### Niveau 1

```
Voici le graphique d'une fonction f. Que vaut f(1) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 4   pièges attendus : 1 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(1) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -4   pièges attendus : 1 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(3) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 4   pièges attendus : 3 [graph_xy_swap]
  pièges : graph_xy_swap

```

### Niveau 2

```
Voici le graphique d'une fonction f. Que vaut f(−2) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -4   pièges attendus : -2 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(−3) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -2   pièges attendus : -3 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(1) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -2   pièges attendus : 1 [graph_xy_swap]
  pièges : graph_xy_swap

```

### Niveau 3

```
Voici le graphique d'une fonction f. Que vaut f(−2) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 4   pièges attendus : -2 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(2) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 0   pièges attendus : 2 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Que vaut f(0) ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -2   pièges attendus : 0 [graph_xy_swap]
  pièges : graph_xy_swap

```

### Niveau 4

```
Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = −4 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 0   pièges attendus : -4 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = −1 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 1   pièges attendus : -1 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = −2 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 0   pièges attendus : -2 [graph_xy_swap]
  pièges : graph_xy_swap

```

### Niveau 5

```
Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = 0 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -1   pièges attendus : 0 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = −2 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 1   pièges attendus : -2 [graph_xy_swap]
  pièges : graph_xy_swap

Voici le graphique d'une fonction f. Pour quel x a-t-on f(x) = 1 ?−5−4−3−2−112345−5−4−3−2−112345xy
  → -3   pièges attendus : 1 [graph_xy_swap]
  pièges : graph_xy_swap

```

## Tableau de valeurs (`fn-table`, 9H)

_Calculer f(x) pour quelques x._

### Niveau 1

```
f(x) = −x+4. Calcule f(6).
  → -2
  pièges : add_ignore_signs, add_sizes_keep_minus

f(x) = −4x−4. Calcule f(1).
  → -8
  pièges : minus_minus_positive, add_ignore_signs

f(x) = x+4. Calcule f(3).
  → 7

```

### Niveau 2

```
f(x) = 2x+4. Calcule f(1).
  → 6

f(x) = 2x−3. Calcule f(2).
  → 1

f(x) = 4x−3. Calcule f(4).
  → 13

```

### Niveau 3

```
f(x) = x+4. Calcule f(5).
  → 9

f(x) = x−1. Calcule f(−1).
  → -2
  pièges : minus_minus_positive, add_ignore_signs

f(x) = −2x+2. Calcule f(1).
  → 0
  pièges : add_ignore_signs, add_sizes_keep_minus

```

### Niveau 4

```
f(x) = x^2−1. Calcule f(−2).
  → 3
  pièges : neg_power_brackets, minus_minus_positive

f(x) = x^2+2. Calcule f(4).
  → 18
  pièges : pow_times_exponent

f(x) = x^2+4. Calcule f(5).
  → 29
  pièges : pow_times_exponent

```

### Niveau 5

```
f(x) = 2x^2−2. Calcule f(−1).
  → 0
  pièges : neg_power_brackets, pow_times_exponent, minus_minus_positive

f(x) = 3x^2−2. Calcule f(2).
  → 10

f(x) = 2x^2−4. Calcule f(4).
  → 28
  pièges : pow_times_exponent

```

## Placer des points (`fn-point`, 9H)

_A(2 ; −3) : d'abord x, puis y._

### Niveau 1

```
Place le point A(4 ; 1).
  (point à placer : 4 ; 1)
  pièges : graph_xy_swap

Place le point A(1 ; 2).
  (point à placer : 1 ; 2)
  pièges : graph_xy_swap

Place le point A(2 ; 1).
  (point à placer : 2 ; 1)
  pièges : graph_xy_swap

```

### Niveau 2

```
Place le point A(2 ; 4).
  (point à placer : 2 ; 4)
  pièges : graph_xy_swap

Place le point A(4 ; 2).
  (point à placer : 4 ; 2)
  pièges : graph_xy_swap

Place le point A(3 ; 4).
  (point à placer : 3 ; 4)
  pièges : graph_xy_swap

```

### Niveau 3

```
Place le point A(1 ; −3).
  (point à placer : 1 ; -3)
  pièges : graph_xy_swap

Place le point A(2 ; −2).
  (point à placer : 2 ; -2)
  pièges : graph_xy_swap

Place le point A(−4 ; −3).
  (point à placer : -4 ; -3)
  pièges : graph_xy_swap

```

### Niveau 4

```
Place le point de la droite d'équation y=−2x+1 qui a pour abscisse x = −1.
  (point à placer : -1 ; 3)
  pièges : graph_xy_swap

Place le point de la droite d'équation y=−x−1 qui a pour abscisse x = 2.
  (point à placer : 2 ; -3)
  pièges : graph_xy_swap

Place le point de la droite d'équation y=−x−2 qui a pour abscisse x = −1.
  (point à placer : -1 ; -1)
  pièges : graph_xy_swap

```

### Niveau 5

```
Place le point de la droite d'équation y=−x−3 qui a pour abscisse x = 1.
  (point à placer : 1 ; -4)
  pièges : graph_xy_swap

Place le point de la droite d'équation y=−x−4 qui a pour abscisse x = 0.
  (point à placer : 0 ; -4)
  pièges : graph_xy_swap

Place le point de la droite d'équation y=2x−3 qui a pour abscisse x = −1.
  (point à placer : -1 ; -5)
  pièges : graph_xy_swap

```

## Fonction linéaire (`fn-linear`, 10H)

_f(x) = ax : une droite par l'origine._

### Niveau 1

```
Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 3   pièges attendus : 6 [slope_y_over_x]
  pièges : slope_y_over_x

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 3   pièges attendus : 6 [slope_y_over_x]
  pièges : slope_y_over_x

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 4   pièges attendus : 8 [slope_y_over_x]
  pièges : slope_y_over_x

```

### Niveau 2

```
Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 2

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 2   pièges attendus : 4 [slope_y_over_x]
  pièges : slope_y_over_x

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 4   pièges attendus : 8 [slope_y_over_x]
  pièges : slope_y_over_x

```

### Niveau 3

```
Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 3   pièges attendus : 6 [slope_y_over_x]
  pièges : slope_y_over_x

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 1   pièges attendus : 2 [slope_y_over_x]
  pièges : slope_y_over_x

Ce graphique représente une fonction linéaire f(x) = a·x. Que vaut a ?−5−4−3−2−112345−5−4−3−2−112345xy
  → 2   pièges attendus : 4 [slope_y_over_x]
  pièges : slope_y_over_x

```

### Niveau 4

```
Une fonction linéaire vérifie f(3) = −3. Que vaut f(4) ?
  → -4   pièges attendus : -2 [additive_reasoning]
  pièges : additive_reasoning

Une fonction linéaire vérifie f(4) = 12. Que vaut f(5) ?
  → 15   pièges attendus : 13 [additive_reasoning]
  pièges : additive_reasoning

Une fonction linéaire vérifie f(5) = −5. Que vaut f(6) ?
  → -6   pièges attendus : -4 [additive_reasoning]
  pièges : additive_reasoning

```

### Niveau 5

```
Une fonction linéaire vérifie f(3) = 3. Que vaut f(4) ?
  → 4

Une fonction linéaire vérifie f(2) = 4. Que vaut f(3) ?
  → 6   pièges attendus : 5 [additive_reasoning]
  pièges : additive_reasoning

Une fonction linéaire vérifie f(2) = −2. Que vaut f(3) ?
  → -3   pièges attendus : -1 [additive_reasoning]
  pièges : additive_reasoning

```

## Fonction affine (`fn-affine`, 10H)

_f(x) = ax + b : pente et ordonnée à l'origine._

### Niveau 1

```
Pour f(x) = −3x+1, que vaut l'ordonnée à l'origine b ?
  → 1   pièges attendus : -3 [slope_intercept_swap]
  pièges : slope_intercept_swap

Pour f(x) = 2x+4, que vaut l'ordonnée à l'origine b ?
  → 4   pièges attendus : 2 [slope_intercept_swap]
  pièges : slope_intercept_swap

Pour f(x) = 3x+2, que vaut l'ordonnée à l'origine b ?
  → 2   pièges attendus : 3 [slope_intercept_swap]
  pièges : slope_intercept_swap

```

### Niveau 2

```
Pour f(x) = −2x−2, que vaut la pente a ?
  → -2

Pour f(x) = −3x−4, que vaut la pente a ?
  → -3   pièges attendus : -4 [slope_intercept_swap]
  pièges : slope_intercept_swap

Pour f(x) = −x−1, que vaut la pente a ?
  → -1

```

### Niveau 3

```
Quel graphique représente f(x) = 2x+3 ?
  ·  [slope_sign]   ·  [slope_intercept_swap]   ✔    ·  [intercept_sign]
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = −x−2 ?
  ·  [slope_sign]   ·  [intercept_sign]   ✔    ·  [slope_intercept_swap]
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = −2x+1 ?
  ·  [intercept_sign]   ·  [slope_sign]   ✔    ·  [slope_intercept_swap]
  pièges : slope_intercept_swap, slope_sign, intercept_sign

```

### Niveau 4

```
Quel graphique représente f(x) = −2x+4 ?
  ·  [slope_intercept_swap]   ·  [intercept_sign]   ·  [slope_sign]   ✔ 
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = −3x+3 ?
  ·  [slope_sign]   ·  [intercept_sign]   ·  [slope_intercept_swap]   ✔ 
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = x+1 ?
  ·  [intercept_sign]   ·  [slope_sign]   ✔ 
  pièges : slope_sign, intercept_sign

```

### Niveau 5

```
Quel graphique représente f(x) = 2x+1 ?
  ✔    ·  [slope_sign]   ·  [slope_intercept_swap]   ·  [intercept_sign]
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = −2x−4 ?
  ·  [slope_intercept_swap]   ·  [slope_sign]   ·  [intercept_sign]   ✔ 
  pièges : slope_intercept_swap, slope_sign, intercept_sign

Quel graphique représente f(x) = x+2 ?
  ·  [slope_intercept_swap]   ✔    ·  [intercept_sign]   ·  [slope_sign]
  pièges : slope_intercept_swap, slope_sign, intercept_sign

```

## Du graphique à l'expression (`fn-from-graph`, 11H)

_Lire a et b sur la droite._

### Niveau 1

```
Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=-x
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=-x
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=-x
  pièges : slope_intercept_swap, slope_sign, slope_inverted

```

### Niveau 2

```
Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=2x-3
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=2x+4
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=-x+3
  pièges : slope_intercept_swap, slope_sign, slope_inverted

```

### Niveau 3

```
Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=3x+2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=2x-2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=2x+2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

```

### Niveau 4

```
Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=3x+4
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=2x-2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=x+2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

```

### Niveau 5

```
Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=3x-1
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=3x-2
  pièges : slope_intercept_swap, slope_sign, slope_inverted

Écris l'expression de la fonction affine représentée : y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → y=3x-1
  pièges : slope_intercept_swap, slope_sign, slope_inverted

```

## Intersection de deux droites (`fn-intersection`, 11H)

_Le point commun : même x, même y._

### Niveau 1

```
Où se coupent les droites y=2x+2 et y=x+1 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=-1;y=0
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−x+3 et y=x−3 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=3;y=0
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−2x−1 et y=−x−2 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=1;y=-3
  pièges : system_one_equation, graph_xy_swap

```

### Niveau 2

```
Où se coupent les droites y=2x−4 et y=x−3 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=1;y=-2
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−2x+4 et y=x−2 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=2;y=0
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=2x−5 et y=−x+4 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=3;y=1
  pièges : system_one_equation, graph_xy_swap

```

### Niveau 3

```
Où se coupent les droites y=x−1 et y=−2x−4 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=-1;y=-2
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−x+1 et y=x+1 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=0;y=1
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=2x−2 et y=x−2 ? Écris x = … ; y = …−5−4−3−2−112345−5−4−3−2−112345xy
  → x=0;y=-2
  pièges : system_one_equation, graph_xy_swap

```

### Niveau 4

```
Où se coupent les droites y=−x et y=−2x−3 ? Écris x = … ; y = …
  → x=-3;y=3
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=x+2 et y=−x ? Écris x = … ; y = …
  → x=-1;y=1
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=2x−2 et y=−2x−2 ? Écris x = … ; y = …
  → x=0;y=-2
  pièges : system_one_equation, graph_xy_swap

```

### Niveau 5

```
Où se coupent les droites y=−2x+1 et y=2x+1 ? Écris x = … ; y = …
  → x=0;y=1
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−x+1 et y=x−3 ? Écris x = … ; y = …
  → x=2;y=-1
  pièges : system_one_equation, graph_xy_swap

Où se coupent les droites y=−x et y=−2x ? Écris x = … ; y = …
  → x=0;y=0
  pièges : system_one_equation, graph_xy_swap

```

## Pièges de cette unité

- **Inverser x et y** (`graph_xy_swap`, R) : A(2 ; −3) placé en (−3 ; 2) au lieu de x = 2 horizontal, y = −3 vertical
- **Lire y au lieu de la pente** (`slope_y_over_x`, E) : passe par (2 ; 6) → a = 6 au lieu de a = 6 ÷ 2 = 3
- **Échanger la pente et l'ordonnée à l'origine** (`slope_intercept_swap`, E) : y = 2x + 3 : coupe l'axe en 2 au lieu de coupe l'axe en 3, pente 2
- **Mauvais signe de pente** (`slope_sign`, E) : y = −2x + 1 qui monte au lieu de y = −2x + 1 descend
- **Mauvais signe de l'ordonnée à l'origine** (`intercept_sign`, E) : y = x − 3 coupe l'axe en 3 au lieu de coupe l'axe en −3
