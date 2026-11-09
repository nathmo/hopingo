# Exemples de questions — Équations du 2e degré

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## x² = k (`quad-xk`, 11H)

_Deux, une ou aucune solution._

### Niveau 1

```
Résous x^2=64. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-8;x=8

Résous x^2=36. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=6

Résous x^2=121. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-11;x=11

```

### Niveau 2

```
Résous x^2=81. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-9;x=9

Résous x^2=9. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=3

Résous x^2=49. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-7;x=7

```

### Niveau 3

```
Résous 3x^2=48. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4;x=4

Résous 3x^2=363. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-11;x=11

Résous 4x^2=36. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=3

```

### Niveau 4

```
Résous x^2=3. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-√3;x=√3

Résous x^2=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-√5;x=√5

Résous x^2=7. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-√7;x=√7

```

### Niveau 5

```
Résous x^2=−1. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → aucune
  pièges : square_negative_solutions

Résous x^2=−36. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → aucune
  pièges : square_negative_solutions

Résous x^2=−121. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → aucune
  pièges : square_negative_solutions

```

## (x − p)² = k (`quad-shift`, 11H)

_On prend la racine des deux côtés._

### Niveau 1

```
Résous (x+6)^2=16. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-10;x=-2
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+6)^2=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-8;x=-4
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+6)^2=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-8;x=-4
  pièges : square_eq_one_solution, zero_product_sign

```

### Niveau 2

```
Résous (x−4)^2=16. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=0;x=8
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+6)^2=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-8;x=-4
  pièges : square_eq_one_solution, zero_product_sign

Résous (x−4)^2=9. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1;x=7
  pièges : square_eq_one_solution, zero_product_sign

```

### Niveau 3

```
Résous (x−4)^2=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=6
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+1)^2=1. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=0
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+6)^2=16. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-10;x=-2
  pièges : square_eq_one_solution, zero_product_sign

```

### Niveau 4

```
Résous (x−1)^2=3. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1-√3;x=1+√3
  pièges : square_eq_one_solution, zero_product_sign

Résous (x+4)^2=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4-√5;x=-4+√5
  pièges : square_eq_one_solution, zero_product_sign

Résous (x−5)^2=2. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=5-√2;x=5+√2
  pièges : square_eq_one_solution, zero_product_sign

```

### Niveau 5

```
Résous (x+3)^2=2. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3-√2;x=-3+√2
  pièges : square_eq_one_solution, zero_product_sign

Résous (x−2)^2=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2-√5;x=2+√5
  pièges : square_eq_one_solution, zero_product_sign

Résous (x−6)^2=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=6-√5;x=6+√5
  pièges : square_eq_one_solution, zero_product_sign

```

## Résoudre en factorisant (`quad-factor`, 11H)

_Facteur commun, identité, somme et produit._

### Niveau 1

```
Résous x^2+x=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=0
  pièges : zero_product_forget_zero

Résous x^2+5x=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-5;x=0
  pièges : zero_product_forget_zero

Résous x^2+7x=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-7;x=0
  pièges : zero_product_forget_zero

```

### Niveau 2

```
Résous x^2−4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=2

Résous x^2−36=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=6

Résous x^2−49=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-7;x=7

```

### Niveau 3

```
Résous x^2+2x−15=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-5;x=3
  pièges : zero_product_sign

Résous x^2+x−30=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=5
  pièges : zero_product_sign

Résous x^2−8x+7=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1;x=7
  pièges : zero_product_sign

```

### Niveau 4

```
Résous x^2−5x−6=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=6
  pièges : zero_product_sign

Résous x^2+x−2=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=1
  pièges : zero_product_sign

Résous x^2+2x−3=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=1
  pièges : zero_product_sign

```

### Niveau 5

```
Résous x^2−7x+12=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=3;x=4
  pièges : zero_product_sign

Résous x^2−4x−5=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=5
  pièges : zero_product_sign

Résous x^2−10x+21=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=3;x=7
  pièges : zero_product_sign

```

## Discriminant et formule (`quad-formula`, 11H)

_Δ = b² − 4ac, x = (−b ± √Δ)/(2a)._

### Niveau 1

```
Calcule le discriminant Δ = b² − 4ac de 3x^2−x+1=0.
  → -11   pièges attendus : -13 [discriminant_b_sign], -2 [discriminant_forget_4]
  pièges : discriminant_b_sign, discriminant_forget_4

Calcule le discriminant Δ = b² − 4ac de x^2−8x+4=0.
  → 48   pièges attendus : -80 [discriminant_b_sign], 60 [discriminant_forget_4]
  pièges : discriminant_b_sign, discriminant_forget_4

Calcule le discriminant Δ = b² − 4ac de x^2+5x+8=0.
  → -7   pièges attendus : -57 [discriminant_b_sign], 17 [discriminant_forget_4]
  pièges : discriminant_b_sign, discriminant_forget_4

```

### Niveau 2

```
Δ = 64. Combien de solutions a l'équation ?
  ✔ Deux solutions   · Une seule solution   · Aucune solution

Δ = −12. Combien de solutions a l'équation ?
  · Deux solutions   · Une seule solution   ✔ Aucune solution

Δ = 49. Combien de solutions a l'équation ?
  ✔ Deux solutions   · Une seule solution   · Aucune solution

```

### Niveau 3

```
Résous avec la formule : 3x^2−6x−9=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=3
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : 3x^2+4x−4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=2/3
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : 2x^2−3x−9=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3/2;x=3
  pièges : formula_minus_b, formula_2a_partial

```

### Niveau 4

```
Résous avec la formule : x^2+9x+1=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=(-9-√77)/2;x=(-9+√77)/2
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : 4x^2−6x−6=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=(6-√132)/8;x=(6+√132)/8
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : 3x^2−4x−2=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=(4-√40)/6;x=(4+√40)/6
  pièges : formula_minus_b, formula_2a_partial

```

### Niveau 5

```
Résous avec la formule : 3x^2−5x−3=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=(5-√61)/6;x=(5+√61)/6
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : x^2−6x+4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=(6-√20)/2;x=(6+√20)/2
  pièges : formula_minus_b, formula_2a_partial

Résous avec la formule : 2x^2−7x−4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1/2;x=4
  pièges : formula_minus_b, formula_2a_partial

```

## Choisir la méthode (`quad-choose`, 11H)

_La plus rapide selon l'équation._

### Niveau 1

```
Quelle méthode est la plus rapide pour x^2−16=0 ?
  · La formule avec Δ   · Mettre x en évidence   ✔ x² = 16, ou l'identité a² − b²   · Compléter le carré

Quelle méthode est la plus rapide pour x^2+5x=0 ?
  ✔ Mettre x en évidence   · La formule avec Δ   · Compléter le carré   · x² = k

Quelle méthode est la plus rapide pour x^2−5x+6=0 ?
  · Identité a² − b²   · x² = k   · Mettre x en évidence   ✔ Somme et produit (factoriser)

```

### Niveau 2

```
Quelle méthode est la plus rapide pour (x−3)^2=5 ?
  · Mettre x en évidence   ✔ Prendre la racine des deux côtés   · Développer puis la formule   · Somme et produit

Quelle méthode est la plus rapide pour 3x^2+2x−7=0 ?
  · Mettre x en évidence   · x² = k   ✔ La formule avec Δ   · Identité a² − b²

Quelle méthode est la plus rapide pour x^2−5x+6=0 ?
  ✔ Somme et produit (factoriser)   · Mettre x en évidence   · x² = k   · Identité a² − b²

```

### Niveau 3

```
Quelle méthode est la plus rapide pour (x−3)^2=5 ?
  · Développer puis la formule   · Somme et produit   ✔ Prendre la racine des deux côtés   · Mettre x en évidence

Quelle méthode est la plus rapide pour x^2−16=0 ?
  ✔ x² = 16, ou l'identité a² − b²   · La formule avec Δ   · Mettre x en évidence   · Compléter le carré

Quelle méthode est la plus rapide pour (x−3)^2=5 ?
  ✔ Prendre la racine des deux côtés   · Mettre x en évidence   · Développer puis la formule   · Somme et produit

```

### Niveau 4

```
Quelle méthode est la plus rapide pour (x−3)^2=5 ?
  · Somme et produit   ✔ Prendre la racine des deux côtés   · Développer puis la formule   · Mettre x en évidence

Quelle méthode est la plus rapide pour (x−3)^2=5 ?
  ✔ Prendre la racine des deux côtés   · Somme et produit   · Développer puis la formule   · Mettre x en évidence

Quelle méthode est la plus rapide pour 3x^2+2x−7=0 ?
  · Identité a² − b²   ✔ La formule avec Δ   · x² = k   · Mettre x en évidence

```

### Niveau 5

```
Quelle méthode est la plus rapide pour x^2+5x=0 ?
  · x² = k   · La formule avec Δ   · Compléter le carré   ✔ Mettre x en évidence

Quelle méthode est la plus rapide pour 3x^2+2x−7=0 ?
  · Mettre x en évidence   ✔ La formule avec Δ   · x² = k   · Identité a² − b²

Quelle méthode est la plus rapide pour 3x^2+2x−7=0 ?
  · Mettre x en évidence   · x² = k   · Identité a² − b²   ✔ La formule avec Δ

```

## Compléter le carré (`quad-complete`, 12H)

_x² + 6x = (x + 3)² − 9._

### Niveau 1

```
Résous en complétant le carré : x^2−10x+21=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=3;x=7
  pièges : complete_square_half

Résous en complétant le carré : x^2−2x−8=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=4
  pièges : complete_square_half

Résous en complétant le carré : x^2+4x−12=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=2
  pièges : complete_square_half

```

### Niveau 2

```
Résous en complétant le carré : x^2+6x+8=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4;x=-2
  pièges : complete_square_half

Résous en complétant le carré : x^2+4x−5=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-5;x=1
  pièges : complete_square_half

Résous en complétant le carré : x^2−2x−3=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=3
  pièges : complete_square_half

```

### Niveau 3

```
Résous en complétant le carré : x^2−2x−2=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1-√3;x=1+√3
  pièges : complete_square_half

Résous en complétant le carré : x^2−4x+2=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2-√2;x=2+√2
  pièges : complete_square_half

Résous en complétant le carré : x^2−6x+4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=3-√5;x=3+√5
  pièges : complete_square_half

```

### Niveau 4

```
Résous en complétant le carré : x^2+2x−5=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1-√6;x=-1+√6
  pièges : complete_square_half

Résous en complétant le carré : x^2−2x−1=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1-√2;x=1+√2
  pièges : complete_square_half

Résous en complétant le carré : x^2−10x+23=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=5-√2;x=5+√2
  pièges : complete_square_half

```

### Niveau 5

```
Résous en complétant le carré : x^2+10x+23=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-5-√2;x=-5+√2
  pièges : complete_square_half

Résous en complétant le carré : x^2+8x+11=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4-√5;x=-4+√5
  pièges : complete_square_half

Résous en complétant le carré : x^2−8x+9=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=4-√7;x=4+√7
  pièges : complete_square_half

```

## Se ramener au 2e degré (`quad-reducible`, 12H)

_Changement de variable._

### Niveau 1

```
Résous x^4−5x^2+4=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=-1;x=1;x=2
  pièges : square_eq_one_solution

Résous x^4−10x^2+9=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=-1;x=1;x=3
  pièges : square_eq_one_solution

Résous x^4−5x^2+4=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=-1;x=1;x=2
  pièges : square_eq_one_solution

```

### Niveau 2

```
Résous x^4−25x^2+144=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4;x=-3;x=3;x=4
  pièges : square_eq_one_solution

Résous x^4−13x^2+36=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=-2;x=2;x=3
  pièges : square_eq_one_solution

Résous x^4−13x^2+36=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=-2;x=2;x=3
  pièges : square_eq_one_solution

```

### Niveau 3

```
Résous x^4−5x^2+4=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=-1;x=1;x=2
  pièges : square_eq_one_solution

Résous x^4−5x^2+4=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=-1;x=1;x=2
  pièges : square_eq_one_solution

Résous x^4−5x^2+4=0 (pose X = x²). Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=-1;x=1;x=2
  pièges : square_eq_one_solution

```

### Niveau 4

```
Résous x+30/x=11. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=5;x=6

Résous x+24/x=10. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=4;x=6

Résous x+3/x=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1;x=3

```

### Niveau 5

```
Résous x+6/x=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=3

Résous x+20/x=9. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=4;x=5

Résous x+12/x=8. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=6

```

## Pièges de cette unité

- **b² négatif quand b est négatif** (`discriminant_b_sign`, E) : b = −3 : b² = −9 au lieu de (−3)² = 9
- **Oublier le 4 de 4ac** (`discriminant_forget_4`, E) : Δ = b² − ac au lieu de Δ = b² − 4ac
- **Oublier le − devant b** (`formula_minus_b`, E) : x = (b ± √Δ)/(2a) au lieu de x = (−b ± √Δ)/(2a)
- **Diviser seulement √Δ par 2a** (`formula_2a_partial`, E) : x = −b ± √Δ/(2a) au lieu de x = (−b ± √Δ)/(2a)
- **Oublier de prendre la moitié** (`complete_square_half`, E) : x² + 6x = (x + 6)² − 36 au lieu de x² + 6x = (x + 3)² − 9
