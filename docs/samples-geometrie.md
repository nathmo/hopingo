# Exemples de questions — Géométrie calculée

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Aires (`geo-area`, 9H)

_Triangle, trapèze, disque._

### Niveau 1

```
Aire d'un triangle de base 10 cm et de hauteur 9 cm ? (arrondi au dixième)
  → 45
  pièges : triangle_forget_half

Aire d'un triangle de base 11 cm et de hauteur 6 cm ? (arrondi au dixième)
  → 33
  pièges : triangle_forget_half

Aire d'un triangle de base 6 cm et de hauteur 9 cm ? (arrondi au dixième)
  → 27
  pièges : triangle_forget_half

```

### Niveau 2

```
Aire d'un trapèze de bases 9 cm et 4 cm, de hauteur 9 cm ? (arrondi au dixième)
  → 58,5
  pièges : triangle_forget_half

Aire d'un trapèze de bases 12 cm et 5 cm, de hauteur 3 cm ? (arrondi au dixième)
  → 25,5
  pièges : triangle_forget_half

Aire d'un trapèze de bases 9 cm et 9 cm, de hauteur 7 cm ? (arrondi au dixième)
  → 63
  pièges : triangle_forget_half

```

### Niveau 3

```
Aire d'un disque de rayon 2 cm ? (arrondi au dixième)
  → 12,6
  pièges : circle_formula_swap, radius_diameter

Aire d'un disque de rayon 2 cm ? (arrondi au dixième)
  → 12,6
  pièges : circle_formula_swap, radius_diameter

Aire d'un disque de rayon 2 cm ? (arrondi au dixième)
  → 12,6
  pièges : circle_formula_swap, radius_diameter

```

### Niveau 4

```
Périmètre d'un cercle de diamètre 20 cm ? (arrondi au dixième)
  → 62,8
  pièges : circle_formula_swap, radius_diameter

Périmètre d'un cercle de diamètre 4 cm ? (arrondi au dixième)
  → 12,6
  pièges : circle_formula_swap, radius_diameter

Périmètre d'un cercle de diamètre 18 cm ? (arrondi au dixième)
  → 56,5
  pièges : circle_formula_swap, radius_diameter

```

### Niveau 5

```
Un rectangle de 5 m sur 5 m, dont on enlève un disque de rayon 1 m. Aire restante ? (arrondi au centième)
  → 21,86
  pièges : circle_formula_swap

Un rectangle de 9 m sur 4 m, dont on enlève un disque de rayon 1 m. Aire restante ? (arrondi au centième)
  → 32,86
  pièges : circle_formula_swap

Un rectangle de 3 m sur 9 m, dont on enlève un disque de rayon 1 m. Aire restante ? (arrondi au centième)
  → 23,86
  pièges : circle_formula_swap

```

## Volumes (`geo-volume`, 9H)

_Prismes, cylindres, pyramides, cônes._

### Niveau 1

```
Volume d'un pavé de 10 cm × 2 cm × 12 cm ? (arrondi à l'unité)
  → 240

Volume d'un pavé de 10 cm × 2 cm × 4 cm ? (arrondi à l'unité)
  → 80

Volume d'un pavé de 5 cm × 5 cm × 9 cm ? (arrondi à l'unité)
  → 225

```

### Niveau 2

```
Volume d'un prisme dont la base est un triangle de base 2 cm et de hauteur 7 cm, et de hauteur 12 cm ? (arrondi au dixième)
  → 84
  pièges : triangle_forget_half

Volume d'un prisme dont la base est un triangle de base 8 cm et de hauteur 3 cm, et de hauteur 8 cm ? (arrondi au dixième)
  → 96
  pièges : triangle_forget_half

Volume d'un prisme dont la base est un triangle de base 3 cm et de hauteur 8 cm, et de hauteur 8 cm ? (arrondi au dixième)
  → 96
  pièges : triangle_forget_half

```

### Niveau 3

```
Volume d'un cylindre de rayon 4 cm et de hauteur 6 cm ? (arrondi à l'unité)
  → 302
  pièges : circle_formula_swap

Volume d'un cylindre de rayon 4 cm et de hauteur 5 cm ? (arrondi à l'unité)
  → 251
  pièges : circle_formula_swap

Volume d'un cylindre de rayon 6 cm et de hauteur 12 cm ? (arrondi à l'unité)
  → 1357
  pièges : circle_formula_swap

```

### Niveau 4

```
Volume d'une pyramide de base carrée de côté 5 cm et de hauteur 5 cm ? (arrondi au dixième)
  → 41,7
  pièges : pyramid_forget_third

Volume d'une pyramide de base carrée de côté 8 cm et de hauteur 10 cm ? (arrondi au dixième)
  → 213,3
  pièges : pyramid_forget_third

Volume d'une pyramide de base carrée de côté 2 cm et de hauteur 11 cm ? (arrondi au dixième)
  → 14,7
  pièges : pyramid_forget_third

```

### Niveau 5

```
Volume d'un cône de rayon 5 cm et de hauteur 10 cm ? (arrondi à l'unité)
  → 262
  pièges : pyramid_forget_third

Volume d'un cône de rayon 5 cm et de hauteur 4 cm ? (arrondi à l'unité)
  → 105
  pièges : pyramid_forget_third

Volume d'un cône de rayon 6 cm et de hauteur 9 cm ? (arrondi à l'unité)
  → 339
  pièges : pyramid_forget_third

```

## Théorème de Pythagore (`geo-pythagore`, 10H)

_Dans un triangle rectangle : a² + b² = c²._

### Niveau 1

```
Un triangle rectangle a des côtés de l'angle droit de 5 cm et 12 cm. Longueur de l'hypoténuse ? (arrondi à l'unité)
  → 13
  pièges : sqrt_distribute_sum, iso_forget_root

Un triangle rectangle a des côtés de l'angle droit de 7 cm et 24 cm. Longueur de l'hypoténuse ? (arrondi à l'unité)
  → 25
  pièges : sqrt_distribute_sum, iso_forget_root

Un triangle rectangle a des côtés de l'angle droit de 5 cm et 12 cm. Longueur de l'hypoténuse ? (arrondi à l'unité)
  → 13
  pièges : sqrt_distribute_sum, iso_forget_root

```

### Niveau 2

```
Un triangle rectangle a une hypoténuse de 5 cm et un côté de 3 cm. Longueur de l'autre côté ? (arrondi à l'unité)
  → 4
  pièges : pythagore_hypotenuse, sqrt_distribute_sum

Un triangle rectangle a une hypoténuse de 20 cm et un côté de 12 cm. Longueur de l'autre côté ? (arrondi à l'unité)
  → 16
  pièges : pythagore_hypotenuse, sqrt_distribute_sum

Un triangle rectangle a une hypoténuse de 13 cm et un côté de 5 cm. Longueur de l'autre côté ? (arrondi à l'unité)
  → 12
  pièges : pythagore_hypotenuse, sqrt_distribute_sum

```

### Niveau 3

```
Côtés de l'angle droit : 2 cm et 10 cm. Hypoténuse ? (arrondi au dixième)
  → 10,2
  pièges : sqrt_distribute_sum, iso_forget_root

Côtés de l'angle droit : 8 cm et 11 cm. Hypoténuse ? (arrondi au dixième)
  → 13,6
  pièges : sqrt_distribute_sum, iso_forget_root

Côtés de l'angle droit : 11 cm et 4 cm. Hypoténuse ? (arrondi au dixième)
  → 11,7
  pièges : sqrt_distribute_sum, iso_forget_root

```

### Niveau 4

```
Hypoténuse 10 cm, un côté 7 cm. L'autre côté ? (arrondi au dixième)
  → 7,1
  pièges : pythagore_hypotenuse

Hypoténuse 14 cm, un côté 2 cm. L'autre côté ? (arrondi au dixième)
  → 13,9
  pièges : pythagore_hypotenuse

Hypoténuse 8 cm, un côté 5 cm. L'autre côté ? (arrondi au dixième)
  → 6,2
  pièges : pythagore_hypotenuse

```

### Niveau 5

```
Une échelle de 10 m est posée contre un mur ; son pied est à 2 m du mur. À quelle hauteur touche-t-elle le mur ? (arrondi au centième)
  → 9,8
  pièges : pythagore_hypotenuse

Une échelle de 4 m est posée contre un mur ; son pied est à 2 m du mur. À quelle hauteur touche-t-elle le mur ? (arrondi au centième)
  → 3,46
  pièges : pythagore_hypotenuse

Une échelle de 6 m est posée contre un mur ; son pied est à 2 m du mur. À quelle hauteur touche-t-elle le mur ? (arrondi au centième)
  → 5,66
  pièges : pythagore_hypotenuse

```

## Agrandir et réduire (`geo-scale`, 10H)

_Longueurs × k, aires × k², volumes × k³._

### Niveau 1

```
On réduit une figure : toutes les longueurs sont multipliées par 0,5. Son aire valait 9 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 2,25
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 3. Son aire valait 19 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 171
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 3. Son aire valait 11 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 99
  pièges : linearity_illusion

```

### Niveau 2

```
On réduit une figure : toutes les longueurs sont multipliées par 0,5. Son aire valait 12 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 3
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 4. Son aire valait 6 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 96
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 3. Son aire valait 7 cm². Que vaut-elle maintenant ? (arrondi au centième)
  → 63
  pièges : linearity_illusion

```

### Niveau 3

```
On agrandit une figure : toutes les longueurs sont multipliées par 3. Son volume valait 14 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 378
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 3. Son volume valait 5 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 135
  pièges : linearity_illusion

On réduit une figure : toutes les longueurs sont multipliées par 0,5. Son volume valait 7 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 0,88
  pièges : linearity_illusion

```

### Niveau 4

```
On agrandit une figure : toutes les longueurs sont multipliées par 2. Son volume valait 7 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 56
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 2. Son volume valait 12 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 96
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 3. Son volume valait 11 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 297
  pièges : linearity_illusion

```

### Niveau 5

```
On agrandit une figure : toutes les longueurs sont multipliées par 3. Son volume valait 15 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 405
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 1,5. Son volume valait 17 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 57,38
  pièges : linearity_illusion

On agrandit une figure : toutes les longueurs sont multipliées par 4. Son volume valait 4 cm³. Que vaut-il maintenant ? (arrondi au centième)
  → 256
  pièges : linearity_illusion

```

## Thalès et figures semblables (`geo-thales`, 11H)

_Des rapports égaux._

### Niveau 1

```
Deux triangles semblables : le petit a des côtés de 5 cm et 7 cm ; dans le grand, le côté qui correspond à 5 cm mesure 20 cm. Que mesure le côté qui correspond à 7 cm ? (arrondi au dixième)
  → 28
  pièges : additive_reasoning, thales_ratio_mismatch

Deux triangles semblables : le petit a des côtés de 5 cm et 3 cm ; dans le grand, le côté qui correspond à 5 cm mesure 20 cm. Que mesure le côté qui correspond à 3 cm ? (arrondi au dixième)
  → 12
  pièges : additive_reasoning, thales_ratio_mismatch

Deux triangles semblables : le petit a des côtés de 7 cm et 3 cm ; dans le grand, le côté qui correspond à 7 cm mesure 17,5 cm. Que mesure le côté qui correspond à 3 cm ? (arrondi au dixième)
  → 7,5
  pièges : additive_reasoning, thales_ratio_mismatch

```

### Niveau 2

```
Deux triangles semblables : le petit a des côtés de 5 cm et 8 cm ; dans le grand, le côté qui correspond à 5 cm mesure 15 cm. Que mesure le côté qui correspond à 8 cm ? (arrondi au dixième)
  → 24
  pièges : additive_reasoning, thales_ratio_mismatch

Deux triangles semblables : le petit a des côtés de 8 cm et 7 cm ; dans le grand, le côté qui correspond à 8 cm mesure 12 cm. Que mesure le côté qui correspond à 7 cm ? (arrondi au dixième)
  → 10,5
  pièges : additive_reasoning, thales_ratio_mismatch

Deux triangles semblables : le petit a des côtés de 2 cm et 2 cm ; dans le grand, le côté qui correspond à 2 cm mesure 5 cm. Que mesure le côté qui correspond à 2 cm ? (arrondi au dixième)
  → 5
  pièges : additive_reasoning, thales_ratio_mismatch

```

### Niveau 3

```
Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 5 cm, AD = 10 cm, BC = 6 cm. Que mesure DE ? (arrondi au dixième)
  → 12
  pièges : thales_ratio_mismatch, additive_reasoning

Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 8 cm, AD = 20 cm, BC = 7 cm. Que mesure DE ? (arrondi au dixième)
  → 17,5
  pièges : thales_ratio_mismatch, additive_reasoning

Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 7 cm, AD = 17,5 cm, BC = 7 cm. Que mesure DE ? (arrondi au dixième)
  → 17,5
  pièges : thales_ratio_mismatch, additive_reasoning

```

### Niveau 4

```
Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 4 cm, AD = 6 cm, BC = 5 cm. Que mesure DE ? (arrondi au dixième)
  → 7,5
  pièges : thales_ratio_mismatch, additive_reasoning

Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 6 cm, AD = 24 cm, BC = 4 cm. Que mesure DE ? (arrondi au dixième)
  → 16
  pièges : thales_ratio_mismatch, additive_reasoning

Dans un triangle ADE, B est sur [AD] et C sur [AE], avec (BC) parallèle à (DE). AB = 6 cm, AD = 24 cm, BC = 4 cm. Que mesure DE ? (arrondi au dixième)
  → 16
  pièges : thales_ratio_mismatch, additive_reasoning

```

### Niveau 5

```
Un bâton de 1.5 m fait une ombre de 2 m. Au même moment, un arbre fait une ombre de 8 m. Quelle est la hauteur de l'arbre ? (arrondi au centième)
  → 6
  pièges : thales_ratio_mismatch

Un bâton de 1 m fait une ombre de 3 m. Au même moment, un arbre fait une ombre de 6 m. Quelle est la hauteur de l'arbre ? (arrondi au centième)
  → 2
  pièges : thales_ratio_mismatch

Un bâton de 4 m fait une ombre de 4 m. Au même moment, un arbre fait une ombre de 10 m. Quelle est la hauteur de l'arbre ? (arrondi au centième)
  → 10
  pièges : thales_ratio_mismatch

```

## Longueur manquante (`geo-missing`, 11H)

_Retrouver une longueur à partir d'une aire ou d'un volume._

### Niveau 1

```
Un rectangle a une aire de 56 cm² et une longueur de 7 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 8
  pièges : iso_wrong_inverse

Un rectangle a une aire de 16 cm² et une longueur de 4 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 4
  pièges : iso_wrong_inverse

Un rectangle a une aire de 8 cm² et une longueur de 4 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 2
  pièges : iso_wrong_inverse

```

### Niveau 2

```
Un rectangle a une aire de 25 cm² et une longueur de 5 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 5
  pièges : iso_wrong_inverse

Un rectangle a une aire de 64 cm² et une longueur de 8 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 8
  pièges : iso_wrong_inverse

Un rectangle a une aire de 90 cm² et une longueur de 10 cm. Quelle est sa largeur ? (arrondi au dixième)
  → 9
  pièges : iso_wrong_inverse

```

### Niveau 3

```
Un triangle a une aire de 14 cm² et une base de 4 cm. Quelle est sa hauteur ? (arrondi au dixième)
  → 7
  pièges : triangle_forget_half

Un triangle a une aire de 20 cm² et une base de 8 cm. Quelle est sa hauteur ? (arrondi au dixième)
  → 5
  pièges : triangle_forget_half

Un triangle a une aire de 21 cm² et une base de 7 cm. Quelle est sa hauteur ? (arrondi au dixième)
  → 6
  pièges : triangle_forget_half

```

### Niveau 4

```
Un disque a une aire de 106 cm². Quel est son rayon ? (arrondi au dixième)
  → 5,8
  pièges : iso_forget_root

Un disque a une aire de 95 cm². Quel est son rayon ? (arrondi au dixième)
  → 5,5
  pièges : iso_forget_root

Un disque a une aire de 201 cm². Quel est son rayon ? (arrondi au dixième)
  → 8
  pièges : iso_forget_root

```

### Niveau 5

```
Un cylindre de rayon 8 cm a un volume de 381 cm³. Quelle est sa hauteur ? (arrondi au dixième)
  → 1,9
  pièges : iso_wrong_inverse

Un cylindre de rayon 2 cm a un volume de 1055 cm³. Quelle est sa hauteur ? (arrondi au dixième)
  → 84
  pièges : iso_wrong_inverse

Un cylindre de rayon 6 cm a un volume de 536 cm³. Quelle est sa hauteur ? (arrondi au dixième)
  → 4,7
  pièges : iso_wrong_inverse

```

## Pièges de cette unité

- **Oublier le ÷ 2 du triangle** (`triangle_forget_half`, E) : triangle 6 × 4 → 24 au lieu de 6 × 4 ÷ 2 = 12
- **Confondre 2πr et πr²** (`circle_formula_swap`, E) : aire d'un disque = 2πr au lieu de aire = πr², périmètre = 2πr
- **Confondre rayon et diamètre** (`radius_diameter`, E) : diamètre 10 → A = π × 10² au lieu de rayon 5 → A = π × 5²
- **Oublier le ÷ 3 de la pyramide** (`pyramid_forget_third`, E) : pyramide : base × h au lieu de base × h ÷ 3
- **Mauvais côté pour l'hypoténuse** (`pythagore_hypotenuse`, E) : hypoténuse 10, côté 6 → √(10² + 6²) au lieu de √(10² − 6²) = 8
- **Rapport pris à l'envers** (`thales_ratio_mismatch`, E) : grand ÷ petit appliqué au grand côté au lieu de même rapport dans le même sens
