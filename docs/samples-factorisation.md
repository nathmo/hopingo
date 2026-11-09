# Exemples de questions — Factorisation

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Mettre en évidence (`fac-common`, 11H)

_6x + 9 = 3(2x + 3)._

### Niveau 1

```
Factorise en mettant le plus grand facteur commun en évidence : 20x+35
  → 5(4x+7) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 10x+5
  → 5(2x+1) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 15x+21
  → 3(5x+7) (common)
  pièges : fac_forget_divide

```

### Niveau 2

```
Factorise en mettant le plus grand facteur commun en évidence : 10x+35
  → 5(2x+7) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 35x−63
  → 7(5x-9) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 25x−45
  → 5(5x-9) (common)
  pièges : fac_forget_divide

```

### Niveau 3

```
Factorise en mettant le plus grand facteur commun en évidence : x^2−4x
  → x(x-4) (common)

Factorise en mettant le plus grand facteur commun en évidence : x^2−8x
  → x(x-8) (common)

Factorise en mettant le plus grand facteur commun en évidence : x^2−6x
  → x(x-6) (common)

```

### Niveau 4

```
Factorise en mettant le plus grand facteur commun en évidence : 15x^2−35x
  → 5x(3x-7) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 4x^2−2x
  → 2x(2x-1) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 2x^2+2x
  → 2x(x+1) (common)
  pièges : fac_forget_divide

```

### Niveau 5

```
Factorise en mettant le plus grand facteur commun en évidence : 8x^2−12x
  → 4x(2x-3) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 20x^2−16x
  → 4x(5x-4) (common)
  pièges : fac_forget_divide

Factorise en mettant le plus grand facteur commun en évidence : 12x^2+9x
  → 3x(4x+3) (common)
  pièges : fac_forget_divide

```

## Parenthèse en facteur commun (`fac-bracket`, 11H)

_(x + 1)(x − 2) + 3(x + 1)._

### Niveau 1

```
Factorise : (x+3)(x+6)−5(x+3)
  → (x+3)(x+1) (common)

Factorise : (x+6)(x−1)+5(x+6)
  → (x+6)(x+4) (common)

Factorise : (x−5)(x−5)−5(x−5)
  → (x-5)(x-10) (common)

```

### Niveau 2

```
Factorise : (x−2)(x+1)+4(x−2)
  → (x-2)(x+5) (common)

Factorise : (x−5)(x+3)+5(x−5)
  → (x-5)(x+8) (common)

Factorise : (x−3)(x+3)−4(x−3)
  → (x-3)(x-1) (common)

```

### Niveau 3

```
Factorise : (x+1)(2x+5)−(x+1)(x−1)
  → (x+1)(x+6) (common)

Factorise : (x+1)(2x−2)+(x+1)(x+1)
  → (x+1)(3x-1) (common)

Factorise : (x−2)(2x+3)−(x−2)(x−2)
  → (x-2)(x+5) (common)

```

### Niveau 4

```
Factorise : (x+6)(2x+5)−(x+6)(x−1)
  → (x+6)(x+6) (common)

Factorise : (x+1)(2x−3)−(x+1)(x−4)
  → (x+1)(x+1) (common)

Factorise : (x+3)(2x−2)+(x+3)(x+3)
  → (x+3)(3x+1) (common)

```

### Niveau 5

```
Factorise : (x+5)(2x−5)+(x+5)(x+4)
  → (x+5)(3x-1) (common)

Factorise : (x−5)(2x+6)−(x−5)(x−4)
  → (x-5)(x+10) (common)

Factorise : (x+3)(2x+3)−(x+3)(x−3)
  → (x+3)(x+6) (common)

```

## Identités à l'envers (`fac-identities`, 11H)

_9x² − 25 = (3x − 5)(3x + 5)._

### Niveau 1

```
Factorise avec une identité remarquable : x^2−16
  → (x-4)(x+4) (factored)
  pièges : fac_diff_squares_as_square

Factorise avec une identité remarquable : x^2−4
  → (x-2)(x+2) (factored)
  pièges : fac_diff_squares_as_square

Factorise avec une identité remarquable : x^2−36
  → (x-6)(x+6) (factored)
  pièges : fac_diff_squares_as_square

```

### Niveau 2

```
Factorise avec une identité remarquable : x^2+8x+16
  → (x+4)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : x^2−12x+36
  → (x-6)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : x^2−6x+9
  → (x-3)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

```

### Niveau 3

```
Factorise avec une identité remarquable : 9x^2−12x+4
  → (3x-2)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : 9x^2−6x+1
  → (3x-1)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : 16x^2−81
  → (4x-9)(4x+9) (factored)
  pièges : fac_diff_squares_as_square

```

### Niveau 4

```
Factorise avec une identité remarquable : 16x^2−25
  → (4x-5)(4x+5) (factored)
  pièges : fac_diff_squares_as_square

Factorise avec une identité remarquable : 4x^2−28x+49
  → (2x-7)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : 9x^2−16
  → (3x-4)(3x+4) (factored)
  pièges : fac_diff_squares_as_square

```

### Niveau 5

```
Factorise avec une identité remarquable : 4x^2+36x+81
  → (2x+9)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

Factorise avec une identité remarquable : 25x^2−4
  → (5x-2)(5x+2) (factored)
  pièges : fac_diff_squares_as_square

Factorise avec une identité remarquable : 16x^2+24x+9
  → (4x+3)^2 (factored)
  pièges : identity_sign_square, fac_diff_squares_as_square

```

## Trinôme x² + bx + c (`fac-trinomial`, 11H)

_Somme et produit._

### Niveau 1

```
Factorise : x^2+3x+2
  → (x+1)(x+2) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+8x+15
  → (x+5)(x+3) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+7x+12
  → (x+4)(x+3) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 2

```
Factorise : x^2+2x−15
  → (x-3)(x+5) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+2x−24
  → (x+6)(x-4) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+11x+28
  → (x+4)(x+7) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 3

```
Factorise : x^2+13x+36
  → (x+4)(x+9) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+5x−6
  → (x-1)(x+6) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2−2x−8
  → (x+2)(x-4) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 4

```
Factorise : x^2−14x+48
  → (x-8)(x-6) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+8x+7
  → (x+1)(x+7) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2−13x+42
  → (x-7)(x-6) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 5

```
Factorise : x^2−6x−7
  → (x-7)(x+1) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+5x−14
  → (x+7)(x-2) (factored)
  pièges : fac_trinomial_signs

Factorise : x^2+x−2
  → (x+2)(x-1) (factored)
  pièges : fac_trinomial_signs

```

## Trinôme ax² + bx + c (`fac-trinomial-a`, 12H)

_La méthode ac._

### Niveau 1

```
Factorise : 6x^2+23x+20
  → (3x+4)(2x+5) (factored)
  pièges : fac_trinomial_signs

Factorise : 6x^2+13x−5
  → (3x-1)(2x+5) (factored)
  pièges : fac_trinomial_signs

Factorise : 6x^2−19x+10
  → (2x-5)(3x-2) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 2

```
Factorise : 3x^2−x−2
  → (3x+2)(x-1) (factored)
  pièges : fac_trinomial_signs

Factorise : 2x^2−x−3
  → (2x-3)(x+1) (factored)
  pièges : fac_trinomial_signs

Factorise : 9x^2+15x+4
  → (3x+1)(3x+4) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 3

```
Factorise : 4x^2−25x+25
  → (4x-5)(x-5) (factored)
  pièges : fac_trinomial_signs

Factorise : 3x^2−8x−16
  → (3x+4)(x-4) (factored)
  pièges : fac_trinomial_signs

Factorise : 15x^2+16x−15
  → (5x-3)(3x+5) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 4

```
Factorise : 15x^2+23x+4
  → (5x+1)(3x+4) (factored)
  pièges : fac_trinomial_signs

Factorise : 15x^2+4x−4
  → (5x-2)(3x+2) (factored)
  pièges : fac_trinomial_signs

Factorise : 12x^2+17x−5
  → (4x-1)(3x+5) (factored)
  pièges : fac_trinomial_signs

```

### Niveau 5

```
Factorise : 9x^2−9x+2
  → (3x-1)(3x-2) (factored)
  pièges : fac_trinomial_signs

Factorise : 4x^2+21x−18
  → (4x-3)(x+6) (factored)
  pièges : fac_trinomial_signs

Factorise : 3x^2+14x+8
  → (3x+2)(x+4) (factored)
  pièges : fac_trinomial_signs

```

## Factoriser complètement (`fac-complete`, 11H)

_Facteur commun, puis identité ou trinôme._

### Niveau 1

```
Factorise complètement : 4x^2−100
  → 4(x-5)(x+5) (factored)

Factorise complètement : 5x^2−80
  → 5(x-4)(x+4) (factored)

Factorise complètement : 3x^2−108
  → 3(x-6)(x+6) (factored)

```

### Niveau 2

```
Factorise complètement : 3x^2−24x+48
  → 3(x-4)^2 (factored)

Factorise complètement : 2x^2+28x+98
  → 2(x+7)^2 (factored)

Factorise complètement : 5x^2−30x+45
  → 5(x-3)^2 (factored)

```

### Niveau 3

```
Factorise complètement : 2x^3−8x
  → 2x(x-2)(x+2) (factored)

Factorise complètement : 5x^3−180x
  → 5x(x-6)(x+6) (factored)

Factorise complètement : 4x^3−16x
  → 4x(x-2)(x+2) (factored)

```

### Niveau 4

```
Factorise complètement : x^3+5x^2−14x
  → x(x-2)(x+7) (factored)

Factorise complètement : x^3−x^2−56x
  → x(x-8)(x+7) (factored)

Factorise complètement : x^3+8x^2+15x
  → x(x+3)(x+5) (factored)

```

### Niveau 5

```
Factorise complètement : 2x^3−16x^2+24x
  → 2x(x-2)(x-6) (factored)

Factorise complètement : 3x^3+15x^2−108x
  → 3x(x+9)(x-4) (factored)

Factorise complètement : 5x^3+5x^2−150x
  → 5x(x+6)(x-5) (factored)

```

## Pièges de cette unité

- **Oublier le 1 en factorisant** (`fac_forget_one`, E) : x² + x = x(x) au lieu de x² + x = x(x + 1)
- **Ne pas diviser tous les termes** (`fac_forget_divide`, E) : 6x + 9 = 3(2x + 9) au lieu de 6x + 9 = 3(2x + 3)
- **a² − b² = (a − b)²** (`fac_diff_squares_as_square`, E) : x² − 9 = (x − 3)² au lieu de x² − 9 = (x − 3)(x + 3)
- **Signes inversés dans un trinôme** (`fac_trinomial_signs`, E) : x² − x − 6 = (x + 3)(x − 2) au lieu de x² − x − 6 = (x − 3)(x + 2)
