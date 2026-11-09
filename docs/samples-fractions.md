# Exemples de questions — Fractions

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Lire une fraction (`frac-read`, 6H)

_Parts égales d'une unité : le dénominateur, le numérateur._

### Niveau 1

```
Colorie 2/3 de la bande.
  (figure bar en 3 parts, colorier 2)
  pièges : read_swap

Colorie 1/2 de la bande.
  (figure bar en 2 parts, colorier 1)
  pièges : read_swap

Colorie 2/3 du disque.
  (figure circle en 3 parts, colorier 2)
  pièges : read_swap

```

### Niveau 2

```
Quelle fraction est coloriée ?
  · 4/3 [read_swap]   · 4/4   ✔ 3/4   · 1/4
  (figure : 1 × circle en 4 parts, 3 coloriées)
  pièges : read_swap

Quelle fraction est coloriée ?
  · 3/7   · 4/3 [read_part_over_rest]   · 7/4 [read_swap]   ✔ 4/7
  (figure : 1 × bar en 7 parts, 4 coloriées)
  pièges : read_swap, read_part_over_rest

Quelle fraction est coloriée ?
  · 5/6   · 1/5 [read_part_over_rest]   ✔ 1/6   · 6 [read_swap]
  (figure : 1 × circle en 6 parts, 1 coloriées)
  pièges : read_swap, read_part_over_rest

```

### Niveau 3

```
Quelle fraction est coloriée ?
  → 1/9   pièges attendus : 9 [read_swap], 1/8 [read_part_over_rest]
  (figure : 1 × grid en 9 parts, 1 coloriées)
  pièges : read_swap, read_part_over_rest

Quelle fraction est coloriée ?
  → 5/11   pièges attendus : 11/5 [read_swap], 5/6 [read_part_over_rest]
  (figure : 1 × circle en 11 parts, 5 coloriées)
  pièges : read_swap, read_part_over_rest

Quelle fraction est coloriée ?
  → 3/8   pièges attendus : 8/3 [read_swap], 3/5 [read_part_over_rest]
  (figure : 1 × grid en 8 parts, 3 coloriées)
  pièges : read_swap, read_part_over_rest

```

### Niveau 4

```
Colorie 1/2 du rectangle.
  (figure grid en 6 parts, colorier 3)

Colorie 2/3 du rectangle.
  (figure grid en 9 parts, colorier 6)

Colorie 1/2 du rectangle.
  (figure grid en 8 parts, colorier 4)

```

### Niveau 5

```
Chaque disque est une unité. Quelle fraction est coloriée ?
  → 9/6   pièges attendus : 3/4 [read_total_parts], 2/3 [read_swap]
  (figure : 2 × circle en 6 parts, 9 coloriées)
  pièges : read_total_parts, read_swap

Chaque disque est une unité. Quelle fraction est coloriée ?
  → 4/3   pièges attendus : 2/3 [read_total_parts], 3/4 [read_swap]
  (figure : 2 × circle en 3 parts, 4 coloriées)
  pièges : read_total_parts, read_swap

Chaque disque est une unité. Quelle fraction est coloriée ?
  → 4/3   pièges attendus : 2/3 [read_total_parts], 3/4 [read_swap]
  (figure : 2 × circle en 3 parts, 4 coloriées)
  pièges : read_total_parts, read_swap

```

## Fractions sur la droite (`frac-line`, 7H)

_Placer une fraction sur une droite graduée, même au-delà de 1._

### Niveau 1

```
Place 3/4 sur la droite.
  (droite 0 → 1, graduée en 4es) → 3/4

Place 3/4 sur la droite.
  (droite 0 → 1, graduée en 4es) → 3/4

Place 1/2 sur la droite.
  (droite 0 → 1, graduée en 2es) → 1/2

```

### Niveau 2

```
Place 5/6 sur la droite.
  (droite 0 → 1, graduée en 6es) → 5/6

Place 1/3 sur la droite.
  (droite 0 → 1, graduée en 3es) → 1/3

Place 1/3 sur la droite.
  (droite 0 → 1, graduée en 3es) → 1/3

```

### Niveau 3

```
Place 5/3 sur la droite.
  (droite 0 → 2, graduée en 3es) → 5/3

Place 7/4 sur la droite.
  (droite 0 → 2, graduée en 4es) → 7/4

Place 5/4 sur la droite.
  (droite 0 → 2, graduée en 4es) → 5/4

```

### Niveau 4

```
Quelle fraction est repérée par le point ?
  → 2/8
  (point à 2/8 sur 0 → 2)

Quelle fraction est repérée par le point ?
  → 9/5
  (point à 9/5 sur 0 → 2)

Quelle fraction est repérée par le point ?
  → 2/5
  (point à 2/5 sur 0 → 1)

```

### Niveau 5

```
Place 3/2 sur la droite.
  (droite 0 → 2, graduée en 10es) → 3/2

Place 3/2 sur la droite.
  (droite 0 → 2, graduée en 8es) → 3/2

Place 9/5 sur la droite.
  (droite 0 → 2, graduée en 10es) → 9/5

```

## Fractions et décimaux (`frac-decimal`, 7H)

_Les fractions repères : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75…_

### Niveau 1

```
Relie chaque fraction à son écriture décimale.
  3/10 ↔ 0,3   1/10 ↔ 0,1   1/2 ↔ 0,5   1/4 ↔ 0,25

Relie chaque fraction à son écriture décimale.
  7/10 ↔ 0,7   3/4 ↔ 0,75   1/2 ↔ 0,5   3/10 ↔ 0,3

Relie chaque fraction à son écriture décimale.
  3/4 ↔ 0,75   1/4 ↔ 0,25   7/10 ↔ 0,7   1/10 ↔ 0,1

```

### Niveau 2

```
3/10 = ?
  · 2,5   · 0,2   ✔ 0,3   · 3,10 [decimal_digits]
  pièges : decimal_digits

3/4 = ?
  · 3,4 [decimal_digits]   ✔ 0,75   · 0,1   · 0,7
  pièges : decimal_digits

1/4 = ?
  · 0,1   ✔ 0,25   · 2   · 1,4 [decimal_digits]
  pièges : decimal_digits

```

### Niveau 3

```
Écris 3/2 sous forme décimale.
  → 1,5 (decimal)   pièges attendus : 16/5 [decimal_digits]
  pièges : decimal_digits

Écris 1/10 sous forme décimale.
  → 0,1 (decimal)   pièges attendus : 11/10 [decimal_digits]
  pièges : decimal_digits

Écris 1/10 sous forme décimale.
  → 0,1 (decimal)   pièges attendus : 11/10 [decimal_digits]
  pièges : decimal_digits

```

### Niveau 4

```
Écris 0,2 sous forme de fraction.
  → 1/5 (fraction)

Écris 0,1 sous forme de fraction.
  → 1/10 (fraction)

Écris 0,3 sous forme de fraction.
  → 3/10 (fraction)

```

### Niveau 5

```
Relie chaque fraction à son écriture décimale.
  1/100 ↔ 0,01   2/5 ↔ 0,4   3/10 ↔ 0,3   1/2 ↔ 0,5   1/10 ↔ 0,1

Relie chaque fraction à son écriture décimale.
  1/5 ↔ 0,2   5/2 ↔ 2,5   2/5 ↔ 0,4   7/10 ↔ 0,7   3/2 ↔ 1,5

Relie chaque fraction à son écriture décimale.
  1/100 ↔ 0,01   2/5 ↔ 0,4   1/10 ↔ 0,1   4/2 ↔ 2   1/2 ↔ 0,5

```

## Fraction d'une quantité (`frac-of`, 7H)

_Calculer 2/3 de 12 : partager, puis prendre plusieurs parts._

### Niveau 1

```
Combien font 1/4 de 20 élèves ?
  → 5   pièges attendus : 20 [of_multiply_only]
  pièges : of_multiply_only

Combien font 1/5 de 25 bonbons ?
  → 5   pièges attendus : 25 [of_multiply_only]
  pièges : of_multiply_only

Combien font 1/2 de 4 timbres ?
  → 2   pièges attendus : 4 [of_multiply_only]
  pièges : of_multiply_only

```

### Niveau 2

```
Combien font 4/5 de 25 billes ?
  → 20   pièges attendus : 5 [of_divide_only], 100 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 5/6 de 36 perles ?
  → 30   pièges attendus : 6 [of_divide_only], 180 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 3/5 de 20 timbres ?
  → 12   pièges attendus : 4 [of_divide_only], 60 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

```

### Niveau 3

```
Combien font 5/8 de 80 perles ?
  → 50   pièges attendus : 10 [of_divide_only], 400 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 4/5 de 20 cartes ?
  → 16   pièges attendus : 4 [of_divide_only], 80 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 2/3 de 24 élèves ?
  → 16   pièges attendus : 8 [of_divide_only], 48 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

```

### Niveau 4

```
Combien font 11/6 de 30 timbres ?
  → 55   pièges attendus : 5 [of_divide_only], 330 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 3/2 de 4 cartes ?
  → 6   pièges attendus : 2 [of_divide_only], 12 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 4/3 de 15 œufs ?
  → 20   pièges attendus : 5 [of_divide_only], 60 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

```

### Niveau 5

```
Combien font 4/5 de 6 litres ?
  → 24/5   pièges attendus : 6/5 [of_divide_only], 24 [of_multiply_only]
  pièges : of_divide_only, of_multiply_only

Combien font 1/4 de 10 litres ?
  → 5/2   pièges attendus : 10 [of_multiply_only]
  pièges : of_multiply_only

Combien font 1/4 de 9 litres ?
  → 9/4   pièges attendus : 9 [of_multiply_only]
  pièges : of_multiply_only

```

## Fractions égales (`frac-equiv`, 8H)

_Multiplier le numérateur et le dénominateur par le même nombre._

### Niveau 1

```
Complète : 1/2 = ?/4
  → 2   pièges attendus : 3 [equiv_additive], 1 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

Complète : 1/2 = ?/4
  → 2   pièges attendus : 3 [equiv_additive], 1 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

Complète : 1/5 = ?/15
  → 3   pièges attendus : 11 [equiv_additive], 1 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

```

### Niveau 2

```
Complète : 3/5 = ?/10
  → 6   pièges attendus : 8 [equiv_additive], 3 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

Complète : 1/7 = ?/21
  → 3   pièges attendus : 15 [equiv_additive], 1 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

Complète : 2/3 = ?/12
  → 8   pièges attendus : 11 [equiv_additive], 2 [equiv_denominator_only]
  pièges : equiv_additive, equiv_denominator_only

```

### Niveau 3

```
Complète : 1/2 = 5/?
  → 10   pièges attendus : 6 [equiv_additive]
  pièges : equiv_additive

Complète : 4/5 = 16/?
  → 20   pièges attendus : 17 [equiv_additive]
  pièges : equiv_additive

Complète : 1/3 = 2/?
  → 6   pièges attendus : 4 [equiv_additive]
  pièges : equiv_additive

```

### Niveau 4

```
Complète : 4/8 = ?/10
  → 5   pièges attendus : 6 [equiv_additive]
  pièges : equiv_additive

Complète : 6/8 = ?/12
  → 9   pièges attendus : 10 [equiv_additive]
  pièges : equiv_additive

Complète : 4/12 = ?/15
  → 5   pièges attendus : 7 [equiv_additive]
  pièges : equiv_additive

```

### Niveau 5

```
Quelle fraction n'est pas égale à 3/4 ?
  ✔ 7/8   · 15/20   · 6/8   · 30/40

Quelle fraction n'est pas égale à 4/5 ?
  ✔ 8/9   · 16/20   · 8/10   · 40/50

Quelle fraction n'est pas égale à 3/4 ?
  · 6/8   ✔ 5/6   · 30/40   · 15/20

```

## Même dénominateur (`frac-add-same`, 8H)

_Additionner et soustraire des fractions de même dénominateur._

### Niveau 1

```
Calcule.
  3/5 + 1/5   [guided] → 4/5
  pièges : add_denominators, mult_rule_for_addition

Calcule.
  2/7 + 3/7   [guided] → 5/7
  pièges : add_denominators, mult_rule_for_addition

Calcule.
  1/7 + 4/7   [guided] → 5/7
  pièges : add_denominators, mult_rule_for_addition

```

### Niveau 2

```
Calcule.
  3/8 + 1/8   [free] → 1/2
  pièges : add_denominators, mult_rule_for_addition

Calcule.
  1/6 + 1/6   [free] → 1/3
  pièges : add_denominators, mult_rule_for_addition

Calcule.
  5/6 + 5/6   [free] → 5/3
  pièges : add_denominators, mult_rule_for_addition

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  5/12 − 1/12   [free, irréductible] → 1/3

Calcule et donne le résultat sous forme irréductible.
  4/9 + 2/9   [free, irréductible] → 2/3
  pièges : add_denominators, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  5/4 − 3/4   [free, irréductible] → 1/2

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  4/5 + 3/5 − 4/5   [free, irréductible] → 3/5
  pièges : add_denominators, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2/3 + 2/3 − 1/3   [free, irréductible] → 1
  pièges : add_denominators, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2/3 + 2/3 − 2/3   [free, irréductible] → 2/3
  pièges : add_denominators, mult_rule_for_addition

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  2 + 4/5   [free, irréductible] → 14/5
  pièges : int_plus_frac

Calcule et donne le résultat sous forme irréductible.
  3 − 1/8   [free, irréductible] → 23/8
  pièges : int_plus_frac

Calcule et donne le résultat sous forme irréductible.
  2 + 1/12   [free, irréductible] → 25/12
  pièges : int_plus_frac

```

## Entiers et fractions (`frac-unit`, 8H)

_Écrire 17/5 = 3 + 2/5, et 2 + 3/4 en une seule fraction._

### Niveau 1

```
Complète : 7/4 = 1 + ?/4
  → 3   pièges attendus : 6 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

Complète : 3/2 = 1 + ?/2
  → 1   pièges attendus : 2 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

Complète : 8/6 = 1 + ?/6
  → 2   pièges attendus : 7 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

```

### Niveau 2

```
Complète : 14/3 = 4 + ?/3
  → 2   pièges attendus : 10 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

Complète : 10/4 = 2 + ?/4
  → 2   pièges attendus : 8 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

Complète : 17/4 = 4 + ?/4
  → 1   pièges attendus : 13 [mixed_subtract_whole]
  pièges : mixed_subtract_whole

```

### Niveau 3

```
Complète : 2 + 1/3 = ?/3
  → 7   pièges attendus : 3 [int_plus_frac]
  pièges : int_plus_frac

Complète : 3 + 1/4 = ?/4
  → 13   pièges attendus : 4 [int_plus_frac]
  pièges : int_plus_frac

Complète : 4 + 1/2 = ?/2
  → 9   pièges attendus : 5 [int_plus_frac]
  pièges : int_plus_frac

```

### Niveau 4

```
Écris 1+4/5 sous forme d'une seule fraction.
  → 9/5 (fraction)
  pièges : int_plus_frac

Écris 2+1/4 sous forme d'une seule fraction.
  → 9/4 (fraction)
  pièges : int_plus_frac

Écris 2+1/4 sous forme d'une seule fraction.
  → 9/4 (fraction)
  pièges : int_plus_frac

```

### Niveau 5

```
Entre quels entiers se trouve 9/4 ?
  · 1 et 2   · 9 et 10   ✔ 2 et 3   · 3 et 4

Entre quels entiers se trouve 34/5 ?
  · 7 et 8   ✔ 6 et 7   · 5 et 6   · 34 et 35

Entre quels entiers se trouve 21/4 ?
  · 6 et 7   · 4 et 5   ✔ 5 et 6   · 21 et 22

```

## La fraction quotient (`frac-quotient`, 9H)

_a/b est le nombre qui multiplié par b donne a._

### Niveau 1

```
On partage équitablement 5 pizzas entre 6 enfants. Quelle part de pizza reçoit chaque enfant ?
  → 5/6   pièges attendus : 6/5 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

On partage équitablement 3 pizzas entre 7 enfants. Quelle part de pizza reçoit chaque enfant ?
  → 3/7   pièges attendus : 7/3 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

On partage équitablement 2 pizzas entre 3 enfants. Quelle part de pizza reçoit chaque enfant ?
  → 2/3   pièges attendus : 3/2 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

```

### Niveau 2

```
Complète : 6 × ? = 1
  → 1/6   pièges attendus : 6 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Complète : 7 × ? = 5
  → 5/7   pièges attendus : 7/5 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Complète : 6 × ? = 5
  → 5/6   pièges attendus : 6/5 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

```

### Niveau 3

```
Écris 8 ÷ 7 sous forme de fraction.
  → 8/7 (fraction)   pièges attendus : 7/8 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Écris 9 ÷ 8 sous forme de fraction.
  → 9/8 (fraction)   pièges attendus : 8/9 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Écris 9 ÷ 8 sous forme de fraction.
  → 9/8 (fraction)   pièges attendus : 8/9 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

```

### Niveau 4

```
Complète : 4 × ? = 18
  → 9/2 (irreducible)   pièges attendus : 2/9 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Complète : 21 × ? = 24
  → 8/7 (irreducible)   pièges attendus : 7/8 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

Complète : 16 × ? = 6
  → 3/8 (irreducible)   pièges attendus : 8/3 [quotient_larger_by_smaller]
  pièges : quotient_larger_by_smaller

```

### Niveau 5

```
Laquelle de ces fractions est égale à un nombre entier ?
  · 23/6   · 6/24   ✔ 24/6   · 25/6

Laquelle de ces fractions est égale à un nombre entier ?
  · 5/10   · 11/5   · 9/5   ✔ 10/5

Laquelle de ces fractions est égale à un nombre entier ?
  ✔ 16/4   · 4/16   · 17/4   · 15/4

```

## Simplifier (`frac-simplify`, 9H)

_Diviser le numérateur et le dénominateur par le même nombre._

### Niveau 1

```
Simplifie 6/9 par 3.
  → 2/3   pièges attendus : 1/2 [simplify_subtract], 2/9 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Simplifie 12/27 par 3.
  → 4/9   pièges attendus : 3/8 [simplify_subtract], 4/27 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Simplifie 12/14 par 2.
  → 6/7   pièges attendus : 5/6 [simplify_subtract], 3/7 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

```

### Niveau 2

```
Rends 2/14 irréductible.
  → 1/7 (irreducible)   pièges attendus : 1/14 [simplify_one_part]
  pièges : simplify_one_part

Rends 18/21 irréductible.
  → 6/7 (irreducible)   pièges attendus : 5/6 [simplify_subtract], 2/7 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Rends 6/21 irréductible.
  → 2/7 (irreducible)   pièges attendus : 1/6 [simplify_subtract], 2/21 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

```

### Niveau 3

```
Rends 30/40 irréductible.
  → 3/4 (irreducible)   pièges attendus : 2/3 [simplify_subtract], 3/40 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Rends 36/63 irréductible.
  → 4/7 (irreducible)   pièges attendus : 1/2 [simplify_subtract], 4/63 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Rends 63/81 irréductible.
  → 7/9 (irreducible)   pièges attendus : 3/4 [simplify_subtract], 7/81 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

```

### Niveau 4

```
Rends 12/36 irréductible.
  → 1/3 (irreducible)   pièges attendus : 1/36 [simplify_one_part]
  pièges : simplify_one_part

Rends 20/60 irréductible.
  → 1/3 (irreducible)   pièges attendus : 1/60 [simplify_one_part]
  pièges : simplify_one_part

Rends 36/54 irréductible.
  → 2/3 (irreducible)   pièges attendus : 1/2 [simplify_subtract], 1/27 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

```

### Niveau 5

```
Rends 120/24 irréductible.
  → 5 (irreducible)   pièges attendus : 5/24 [simplify_one_part]
  pièges : simplify_one_part

Rends 96/72 irréductible.
  → 4/3 (irreducible)   pièges attendus : 3/2 [simplify_subtract], 1/18 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

Rends 180/210 irréductible.
  → 6/7 (irreducible)   pièges attendus : 5/6 [simplify_subtract], 1/35 [simplify_one_part]
  pièges : simplify_subtract, simplify_one_part

```

## Comparer des fractions (`frac-compare`, 9H)

_Même dénominateur, même numérateur, ou on transforme._

### Niveau 1

```
Compare : 5/8 ? 1/8
  · <   · =   ✔ >

Compare : 6/5 ? 8/5
  ✔ <   · =   · >

Compare : 13/12 ? 7/12
  · <   · =   ✔ >

```

### Niveau 2

```
Compare : 3/5 ? 3/8
  · < [compare_denominators]   · = [compare_numerators]   ✔ >
  pièges : compare_denominators, compare_numerators

Compare : 5/9 ? 5/11
  · < [compare_denominators]   · = [compare_numerators]   ✔ >
  pièges : compare_denominators, compare_numerators

Compare : 2/9 ? 2/7
  ✔ <   · = [compare_numerators]   · > [compare_denominators]
  pièges : compare_numerators, compare_denominators

```

### Niveau 3

```
Compare : 3/10 ? 1/5
  · < [compare_smallest_denominator]   · =   ✔ >
  pièges : compare_smallest_denominator

Compare : 7/12 ? 1/4
  · < [compare_smallest_denominator]   · =   ✔ >
  pièges : compare_smallest_denominator

Compare : 1/10 ? 4/5
  ✔ <   · =   · > [compare_denominators]
  pièges : compare_denominators

```

### Niveau 4

```
Compare : 1/4 ? 7/12
  ✔ <   · =   · > [compare_smallest_denominator]
  pièges : compare_smallest_denominator

Compare : 1/6 ? 7/8
  ✔ <   · =   · > [compare_smallest_denominator]
  pièges : compare_smallest_denominator

Compare : 5/6 ? 4/7
  · < [compare_denominators]   · =   ✔ >
  pièges : compare_denominators

```

### Niveau 5

```
Quelle est la plus grande fraction ?
  ✔ 1/2   · 2/5   · 1/8   · 2/9 [compare_numerators]
  pièges : compare_numerators

Quelle est la plus grande fraction ?
  · 5/9   · 5/12 [compare_numerators]   · 1/2 [compare_smallest_denominator]   ✔ 4/7
  pièges : compare_smallest_denominator, compare_numerators

Quelle est la plus grande fraction ?
  · 5/9 [compare_numerators]   ✔ 5/6   · 1/2 [compare_smallest_denominator]   · 3/5
  pièges : compare_numerators, compare_smallest_denominator

```

## Dénominateurs multiples (`frac-add-multiple`, 9H)

_1/2 + 3/8 : on transforme une seule fraction._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  2/5 + 7/15   [guided, irréductible] → 13/15
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  5/8 + 1/4   [guided, irréductible] → 7/8
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  7/8 + 1/4   [guided, irréductible] → 9/8
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

### Niveau 2

```
Combien vaut 1/2+5/6 ?
  · 3/4 [add_across]   ✔ 4/3   · 1 [ignore_denominators]   · 3 [ignore_denominators]
  pièges : add_across, ignore_denominators

Combien vaut 3/10+4/5 ?
  · 7/5 [ignore_denominators]   · 7/10 [ignore_denominators]   ✔ 11/10   · 7/15 [add_across]
  pièges : add_across, ignore_denominators

Combien vaut 1/3+5/6 ?
  · 2 [ignore_denominators]   · 2/3 [add_across]   · 1 [ignore_denominators]   ✔ 7/6
  pièges : add_across, ignore_denominators

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  19/20 − 4/5   [free, irréductible] → 3/20
  pièges : sub_across, ignore_denominators

Calcule et donne le résultat sous forme irréductible.
  3/4 − 1/12   [free, irréductible] → 2/3
  pièges : sub_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  4/5 − 3/20   [free, irréductible] → 13/20
  pièges : sub_across, ignore_denominators, forget_amplify

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  1/2 + 5/8 + 5/8   [free, irréductible] → 7/4
  pièges : add_denominators, mult_rule_for_addition, add_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  1/4 + 13/16 + 9/16   [free, irréductible] → 13/8
  pièges : add_denominators, mult_rule_for_addition, add_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  1/3 + 5/6 + 5/6   [free, irréductible] → 2
  pièges : add_denominators, mult_rule_for_addition, add_across, ignore_denominators, forget_amplify

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  1 − 1/2 + 1/4   [free, irréductible] → 3/4
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  1 − 2/3 + 11/12   [free, irréductible] → 5/4
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, int_plus_frac

Calcule et donne le résultat sous forme irréductible.
  1 − 1/3 + 5/6   [free, irréductible] → 3/2
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, int_plus_frac

```

## Dénominateurs quelconques (`frac-add-any`, 9H)

_2/3 + 1/4 : trouver un dénominateur commun._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  5/6 + 2/5   [guided, irréductible] → 37/30
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2/3 + 3/5   [guided, irréductible] → 19/15
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2/3 + 1/4   [guided, irréductible] → 11/12
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

### Niveau 2

```
Calcule.
  4/5 + 1/6   [free] → 29/30
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule.
  1/5 + 3/4   [free] → 19/20
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule.
  3/4 + 1/6   [free] → 11/12
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  4/9 + 3/4   [free, irréductible] → 43/36
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  7/8 − 1/5   [free, irréductible] → 27/40
  pièges : sub_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  3/8 + 1/6   [free, irréductible] → 13/24
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  3/4 + 1/6   [free, irréductible] → 11/12
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  3/4 + 5/6   [free, irréductible] → 19/12
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  11/12 − 3/10   [free, irréductible] → 37/60
  pièges : sub_across, ignore_denominators, forget_amplify

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  3/8 + 3/7 + 3/4   [free, irréductible] → 87/56
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  1/4 + 2/5 + 2/5   [free, irréductible] → 21/20
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2/3 + 4/7 + 5/6   [free, irréductible] → 29/14
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

## Entier × fraction (`frac-mul-int`, 9H)

_3 × 2/5 : on multiplie seulement le numérateur._

### Niveau 1

```
Calcule.
  5 × 4/7   [guided] → 20/7
  pièges : int_times_both

Calcule.
  3 × 3/8   [guided] → 9/8
  pièges : int_times_both

Calcule.
  2 × 1/7   [guided] → 2/7
  pièges : int_times_both

```

### Niveau 2

```
Combien vaut 2×1/8 ?
  · 3/4   · 1/2   · 1/8 [int_times_both]   ✔ 1/4
  pièges : int_times_both

Calcule.
  3 × 7/8   [free] → 21/8
  pièges : int_times_both

Combien vaut 3×3/8 ?
  · 11/8   · 3/8 [int_times_both]   · 5/4   ✔ 9/8
  pièges : int_times_both

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  5 × 1/6   [free, irréductible] → 5/6
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  4 × 3/4   [free, irréductible] → 3
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  4 × 4/7   [free, irréductible] → 16/7
  pièges : int_times_both

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  7/9 × 5   [free, irréductible] → 35/9
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  7/8 × 9   [free, irréductible] → 63/8
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  2 × 3/8   [free, irréductible] → 3/4
  pièges : int_times_both

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  1/4 × 12   [free, irréductible] → 3
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  1/4 × 8   [free, irréductible] → 2
  pièges : int_times_both

Calcule et donne le résultat sous forme irréductible.
  5/6 × 18   [free, irréductible] → 15
  pièges : int_times_both

```

## Multiplier des fractions (`frac-mul`, 10H)

_Numérateurs entre eux, dénominateurs entre eux._

### Niveau 1

```
Calcule.
  1/3 × 2/3   [guided] → 2/9
  pièges : keep_common_denominator_mult

Calcule.
  4/7 × 4/5   [guided] → 16/35
  pièges : keep_common_denominator_mult

Calcule.
  2/3 × 3/5   [guided] → 2/5
  pièges : keep_common_denominator_mult

```

### Niveau 2

```
Calcule.
  1/5 × 5/7   [free] → 1/7
  pièges : keep_common_denominator_mult

Combien vaut 1/2×2/3 ?
  · 2 [keep_common_denominator_mult]   ✔ 1/3   · 1   · 2/3
  pièges : keep_common_denominator_mult

Calcule.
  1/2 × 1/2   [free] → 1/4
  pièges : keep_common_denominator_mult

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  2/3 × 7/8   [free, irréductible] → 7/12
  pièges : keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  1/3 × 1/6   [free, irréductible] → 1/18
  pièges : keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  1/3 × 1/3   [free, irréductible] → 1/9
  pièges : keep_common_denominator_mult

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  30/21 × 15/40   [free, irréductible] → 15/28
  pièges : keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  24/44 × 4/24   [free, irréductible] → 1/11
  pièges : keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  27/44 × 20/18   [free, irréductible] → 15/22
  pièges : keep_common_denominator_mult

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  1/2 × 2/3 × 1/4   [free, irréductible] → 1/12
  pièges : keep_common_denominator_mult

Yanis mange les 1/2 des 2/3 d'une tarte. Quelle fraction de la tarte a-t-il ou elle mangée ?
  → 1/3 (irreducible)
  pièges : keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  2/3 × 2/7 × 1/2   [free, irréductible] → 2/21
  pièges : keep_common_denominator_mult

```

## Diviser des fractions (`frac-div`, 10H)

_Diviser, c'est multiplier par l'inverse._

### Niveau 1

```
Quel est l'inverse de 5/7 ?
  → 7/5

Quel est l'inverse de 5/7 ?
  → 7/5

Quel est l'inverse de 4 ?
  → 1/4

```

### Niveau 2

```
Calcule.
  1/4 ÷ 4/5   [guided] → 5/16
  pièges : mult_across_division, invert_first

Calcule.
  3/4 ÷ 1/3   [guided] → 9/4
  pièges : mult_across_division, invert_first

Calcule.
  4/5 ÷ 3/4   [guided] → 16/15
  pièges : mult_across_division, invert_first

```

### Niveau 3

```
Calcule.
  1/2 ÷ 1/2   [free] → 1
  pièges : mult_across_division, invert_first

Combien vaut 1/3÷1/2 ?
  · 1/6 [mult_across_division]   ✔ 2/3   · 3/2 [invert_first]   · 6 [invert_first]
  pièges : mult_across_division, invert_first

Combien vaut 1/4÷1/5 ?
  · 20 [invert_first]   ✔ 5/4   · 1/20 [mult_across_division]   · 4/5 [invert_first]
  pièges : mult_across_division, invert_first

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  4 ÷ 4/7   [free, irréductible] → 7
  pièges : invert_first

Calcule et donne le résultat sous forme irréductible.
  1/2 ÷ 3   [free, irréductible] → 1/6
  pièges : invert_first

Calcule et donne le résultat sous forme irréductible.
  1/3 ÷ 2   [free, irréductible] → 1/6
  pièges : invert_first

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  4/3 ÷ 8/12   [free, irréductible] → 2
  pièges : mult_across_division, invert_first

Calcule et donne le résultat sous forme irréductible.
  12/7 ÷ 24/21   [free, irréductible] → 3/2
  pièges : mult_across_division, invert_first

Calcule et donne le résultat sous forme irréductible.
  4/5 ÷ 4/10   [free, irréductible] → 2
  pièges : mult_across_division, invert_first

```

## Calculs en plusieurs étapes (`frac-multistep`, 10H)

_Priorités et parenthèses, étape par étape, sans brouillon._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  1/8 + 2/5 × 5/8   [guided, irréductible] → 3/8
  pièges : priority_left_to_right, mult_rule_for_addition, add_across, ignore_denominators, forget_amplify, keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  5/8 − 1/4 × 5/6   [guided, irréductible] → 5/12
  pièges : priority_left_to_right, sub_across, keep_common_denominator_mult, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  7/8 × 1/6 + 1/3   [guided, irréductible] → 23/48
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, keep_common_denominator_mult

```

### Niveau 2

```
Calcule et donne le résultat sous forme irréductible.
  (3/4 + 7/10) × 1/2   [guided, irréductible] → 29/40
  pièges : ignore_parentheses, ignore_denominators, forget_amplify, mult_rule_for_addition, keep_common_denominator_mult, add_across

Calcule et donne le résultat sous forme irréductible.
  2/3 × (3/5 + 7/10)   [guided, irréductible] → 13/15
  pièges : ignore_parentheses, mult_rule_for_addition, keep_common_denominator_mult, add_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  (1/2 + 2/5) × 1/2   [guided, irréductible] → 9/20
  pièges : ignore_parentheses, ignore_denominators, forget_amplify, mult_rule_for_addition, keep_common_denominator_mult, add_across

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  2/5 ÷ 1/4 − 7/10   [tap, irréductible] → 9/10
  pièges : sub_across, ignore_denominators, forget_amplify, mult_across_division, invert_first

Calcule et donne le résultat sous forme irréductible.
  1/3 × 1/2 + 5/8   [tap, irréductible] → 19/24
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, keep_common_denominator_mult

Calcule et donne le résultat sous forme irréductible.
  1/3 − 1/8 × 1/3   [tap, irréductible] → 7/24
  pièges : priority_left_to_right, sub_across, keep_common_denominator_mult

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  (1/2 + 5/6) ÷ 1/4 − 3   [free, irréductible] → 7/3
  pièges : ignore_parentheses, mult_rule_for_addition, int_plus_frac, mult_across_division, invert_first, ignore_denominators, forget_amplify, add_across

Calcule et donne le résultat sous forme irréductible.
  (2/5 + 1/3) ÷ 3/10 − 2/3   [free, irréductible] → 16/9
  pièges : ignore_parentheses, mult_rule_for_addition, sub_across, ignore_denominators, forget_amplify, mult_across_division, invert_first, add_across

Calcule et donne le résultat sous forme irréductible.
  3/4 × 1/8 + 1/2 × 1/2   [free, irréductible] → 11/32
  pièges : priority_left_to_right, ignore_denominators, forget_amplify, mult_rule_for_addition, add_across, keep_common_denominator_mult

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  1 × (1/3 + 1/2) − 1/3   [free, irréductible] → 1/2
  pièges : sub_across, ignore_denominators, forget_amplify, add_across, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  3/4 × (7/10 + 1/2) − 2/3   [free, irréductible] → 7/30
  pièges : ignore_parentheses, mult_rule_for_addition, sub_across, ignore_denominators, keep_common_denominator_mult, add_across, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  1/2 ÷ 5/6 + 1/4 × 1/2   [free, irréductible] → 29/40
  pièges : priority_left_to_right, ignore_denominators, forget_amplify, mult_rule_for_addition, add_across, mult_across_division, invert_first, keep_common_denominator_mult

```

## Décimal, fraction, pourcentage (`nb-convert`, 9H)

_0,375 = 3/8 = 37,5 %._

### Niveau 1

```
Écris 0,375 sous forme de fraction irréductible.
  → 3/8 (irreducible)

Écris 0,35 sous forme de fraction irréductible.
  → 7/20 (irreducible)

Écris 0,375 sous forme de fraction irréductible.
  → 3/8 (irreducible)

```

### Niveau 2

```
Écris 3/8 sous forme décimale.
  → 0,375 (decimal)   pièges attendus : 19/50 [frac_decimal_digits]
  pièges : frac_decimal_digits

Écris 3/50 sous forme décimale.
  → 0,06 (decimal)   pièges attendus : 7/20 [frac_decimal_digits]
  pièges : frac_decimal_digits

Écris 3/4 sous forme décimale.
  → 0,75 (decimal)   pièges attendus : 17/50 [frac_decimal_digits]
  pièges : frac_decimal_digits

```

### Niveau 3

```
Écris 0,05 en pourcentage.
  → 5   pièges attendus : 1/2 [percent_shift]
  pièges : percent_shift

Écris 0,08 en pourcentage.
  → 8   pièges attendus : 4/5 [percent_shift]
  pièges : percent_shift

Écris 0,03 en pourcentage.
  → 3   pièges attendus : 3/10 [percent_shift]
  pièges : percent_shift

```

### Niveau 4

```
Écris 1/4 en pourcentage.
  → 25

Écris 11/20 en pourcentage.
  → 55

Écris 11/20 en pourcentage.
  → 55

```

### Niveau 5

```
Quelle fraction vaut 0,6666… ?
  · 7/10 [repeating_as_finite]   · 3/20   · 67/100 [repeating_as_finite]   ✔ 2/3
  pièges : repeating_as_finite

Quelle fraction vaut 0,6666… ?
  · 3/20   ✔ 2/3   · 7/10 [repeating_as_finite]   · 67/100 [repeating_as_finite]
  pièges : repeating_as_finite

Quelle fraction vaut 0,6666… ?
  · 7/10 [repeating_as_finite]   ✔ 2/3   · 67/100 [repeating_as_finite]   · 3/20
  pièges : repeating_as_finite

```

## Pièges de cette unité

- **Additionner en haut et en bas** (`add_across`, R) : 1/2 + 1/3 = 2/5 au lieu de 1/2 + 1/3 = 5/6
- **Additionner aussi les dénominateurs** (`add_denominators`, R) : 2/7 + 3/7 = 5/14 au lieu de 2/7 + 3/7 = 5/7
- **Soustraire en haut et en bas** (`sub_across`, R) : 3/4 − 1/2 = 2/2 au lieu de 3/4 − 1/2 = 1/4
- **Garder un dénominateur sans transformer** (`ignore_denominators`, R) : 1/2 + 3/4 = 4/4 au lieu de 1/2 + 3/4 = 5/4
- **Changer le dénominateur sans changer le numérateur** (`forget_amplify`, E) : 1/2 + 1/3 = 2/6 au lieu de 1/2 + 1/3 = 5/6
- **Multiplier au lieu d'additionner** (`mult_rule_for_addition`, R) : 1/2 + 1/3 = 1/6 au lieu de 1/2 + 1/3 = 5/6
- **Ajouter l'entier au numérateur** (`int_plus_frac`, E) : 2 + 3/4 = 5/4 au lieu de 2 + 3/4 = 11/4
- **Multiplier en haut ET en bas par l'entier** (`int_times_both`, E) : 3 × 2/5 = 6/15 au lieu de 3 × 2/5 = 6/5
- **Garder le dénominateur commun en multipliant** (`keep_common_denominator_mult`, R) : 2/5 × 3/5 = 6/5 au lieu de 2/5 × 3/5 = 6/25
- **Diviser en multipliant tout droit** (`mult_across_division`, R) : 2/3 ÷ 4/5 = 8/15 au lieu de 2/3 ÷ 4/5 = 5/6
- **Inverser la mauvaise fraction** (`invert_first`, E) : 2/3 ÷ 4/5 = 3/2 × 4/5 au lieu de 2/3 ÷ 4/5 = 2/3 × 5/4
- **Calculer de gauche à droite sans priorités** (`priority_left_to_right`, R) : 1/2 + 1/3 × 3/4 = 5/6 × 3/4 au lieu de 1/2 + 1/3 × 3/4 = 1/2 + 1/4
- **Oublier les parenthèses** (`ignore_parentheses`, R) : (1/2 + 1/4) × 2 = 1/2 + 1/2 au lieu de (1/2 + 1/4) × 2 = 3/4 × 2
- **Comparer seulement les numérateurs** (`compare_numerators`, R) : 3/5 > 2/3 car 3 > 2 au lieu de 3/5 < 2/3
- **Plus grand dénominateur, plus grande fraction** (`compare_denominators`, R) : 1/4 > 1/3 car 4 > 3 au lieu de 1/4 < 1/3
- **Plus petit dénominateur, toujours plus grand** (`compare_smallest_denominator`, R) : 2/5 > 7/8 car 5 < 8 au lieu de 2/5 < 7/8
- **Inverser numérateur et dénominateur** (`read_swap`, P) : 2 parts colorées sur 5 → 5/2 au lieu de 2/5
- **Compter les parts restantes au lieu du total** (`read_part_over_rest`, E) : 2 parts colorées, 3 blanches → 2/3 au lieu de 2/5
- **Compter les parts de toutes les figures** (`read_total_parts`, E) : 2 disques en quarts, 7 parts colorées → 7/8 au lieu de 7/4
- **Ajouter au lieu de multiplier** (`equiv_additive`, R) : 2/3 = 14/15 (on ajoute 12) au lieu de 2/3 = 10/15 (on multiplie par 5)
- **Changer seulement le dénominateur** (`equiv_denominator_only`, E) : 2/3 = 2/15 au lieu de 2/3 = 10/15
- **Simplifier en soustrayant** (`simplify_subtract`, E) : 6/8 = 4/6 (on enlève 2) au lieu de 6/8 = 3/4 (on divise par 2)
- **Diviser seulement une partie** (`simplify_one_part`, E) : 6/8 = 3/8 au lieu de 6/8 = 3/4
- **Prendre une part au lieu de plusieurs** (`of_divide_only`, E) : 2/3 de 12 = 4 au lieu de 2/3 de 12 = 8
- **Oublier de partager** (`of_multiply_only`, E) : 2/3 de 12 = 24 au lieu de 2/3 de 12 = 8
- **Toujours diviser le grand par le petit** (`quotient_larger_by_smaller`, R) : 4 pizzas pour 6 enfants → 6/4 au lieu de 4/6
- **Écrire les chiffres côte à côte** (`decimal_digits`, E) : 1/4 = 1,4 au lieu de 1/4 = 0,25
- **Enlever l'entier au lieu des parts** (`mixed_subtract_whole`, E) : 17/5 = 3 + 14/5 au lieu de 17/5 = 3 + 2/5
- **Recopier les chiffres de la fraction** (`frac_decimal_digits`, E) : 1/4 = 0,4 au lieu de 1/4 = 0,25
- **Pourcentage décalé d'un rang** (`percent_shift`, E) : 35 % = 3,5 au lieu de 35 % = 0,35
- **Arrêter une écriture qui ne s'arrête pas** (`repeating_as_finite`, E) : 0,333… = 3/10 au lieu de 0,333… = 1/3
