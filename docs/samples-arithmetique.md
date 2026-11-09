# Exemples de questions — Diviseurs et nombres premiers

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Critères de divisibilité (`ar-div`, 9H)

_Par 2, 3, 4, 5, 9 et 10, sans poser la division._

### Niveau 1

```
Lequel de ces nombres est divisible par 5 ?
  · 2804   ✔ 6730   · 5313   · 6284

Lequel de ces nombres est divisible par 10 ?
  · 8389   · 606   · 5964   ✔ 4760

Lequel de ces nombres est divisible par 2 ?
  · 4553   · 6007   · 8109   ✔ 5350

```

### Niveau 2

```
Lequel de ces nombres est divisible par 9 ?
  · 807   · 6159 [div_last_digit]   ✔ 4869   · 7229 [div_last_digit]
  pièges : div_last_digit

Lequel de ces nombres est divisible par 9 ?
  · 9059 [div_last_digit]   · 6999 [div_last_digit]   ✔ 1098   · 4341
  pièges : div_last_digit

Lequel de ces nombres est divisible par 9 ?
  · 6387   · 1929 [div_last_digit]   · 3439 [div_last_digit]   ✔ 9090
  pièges : div_last_digit

```

### Niveau 3

```
Lequel de ces nombres est divisible par 4 ?
  · 4241   · 4045   ✔ 4400   · 3426 [div_last_digit]
  pièges : div_last_digit

Lequel de ces nombres est divisible par 4 ?
  · 3210 [div_last_digit]   · 519   ✔ 1776   · 3206 [div_last_digit]
  pièges : div_last_digit

Lequel de ces nombres est divisible par 4 ?
  · 8419   ✔ 5304   · 1550 [div_last_digit]   · 8954 [div_last_digit]
  pièges : div_last_digit

```

### Niveau 4

```
9860 est-il divisible par 3 ?
  ✔ Non : 9 + 8 + 6 + 0 = 23, pas un multiple de 3   · Oui : son dernier chiffre est 0 [div_last_digit]   · Oui : il est pair
  pièges : div_last_digit

1481 est-il divisible par 9 ?
  · Oui : il est impair   · Oui : son dernier chiffre est 1 [div_last_digit]   ✔ Non : 1 + 4 + 8 + 1 = 14, pas un multiple de 9
  pièges : div_last_digit

7847 est-il divisible par 9 ?
  ✔ Non : 7 + 8 + 4 + 7 = 26, pas un multiple de 9   · Oui : il est impair   · Oui : son dernier chiffre est 7 [div_last_digit]
  pièges : div_last_digit

```

### Niveau 5

```
Par lequel de ces nombres 7920 n'est-il pas divisible ?
  · 10   ✔ 25   · 6   · 2

Par lequel de ces nombres 540 n'est-il pas divisible ?
  · 4   · 2   ✔ 8   · 5

Par lequel de ces nombres 450 n'est-il pas divisible ?
  · 5   ✔ 8   · 3   · 25

```

## Multiples et diviseurs (`ar-divisors`, 9H)

_Lister les diviseurs, reconnaître un multiple._

### Niveau 1

```
Lequel est un diviseur de 24 ?
  · 22   · 21   ✔ 3   · 16

Lequel est un diviseur de 12 ?
  ✔ 3   · 11   · 10   · 5

Lequel est un diviseur de 30 ?
  ✔ 10   · 16   · 12   · 29

```

### Niveau 2

```
Combien de diviseurs a 15 ? (1 et 15 comptent aussi)
  → 4   pièges attendus : 2 [divisors_forget_ends]
  pièges : divisors_forget_ends

Combien de diviseurs a 18 ? (1 et 18 comptent aussi)
  → 6   pièges attendus : 4 [divisors_forget_ends]
  pièges : divisors_forget_ends

Combien de diviseurs a 10 ? (1 et 10 comptent aussi)
  → 4   pièges attendus : 2 [divisors_forget_ends]
  pièges : divisors_forget_ends

```

### Niveau 3

```
Lequel est un multiple de 9 ?
  ✔ 90   · 91   · 98   · 88

Lequel est un multiple de 10 ?
  · 121   ✔ 120   · 118   · 129

Lequel est un multiple de 11 ?
  ✔ 99   · 97   · 100   · 109

```

### Niveau 4

```
Quel est le 9^(e) multiple de 15 (en commençant par 15) ?
  → 135

Quel est le 6^(e) multiple de 17 (en commençant par 17) ?
  → 102

Quel est le 9^(e) multiple de 18 (en commençant par 18) ?
  → 162

```

### Niveau 5

```
Combien de diviseurs a 48 ? (1 et 48 comptent aussi)
  → 10   pièges attendus : 8 [divisors_forget_ends]
  pièges : divisors_forget_ends

Combien de diviseurs a 72 ? (1 et 72 comptent aussi)
  → 12   pièges attendus : 10 [divisors_forget_ends]
  pièges : divisors_forget_ends

Combien de diviseurs a 60 ? (1 et 60 comptent aussi)
  → 12   pièges attendus : 10 [divisors_forget_ends]
  pièges : divisors_forget_ends

```

## Nombres premiers (`ar-prime`, 9H)

_Exactement deux diviseurs : 1 et lui-même._

### Niveau 1

```
Lequel de ces nombres est premier ?
  · 15 [odd_is_prime]   ✔ 3   · 1 [one_is_prime]   · 9 [odd_is_prime]
  pièges : one_is_prime, odd_is_prime

Lequel de ces nombres est premier ?
  · 1 [one_is_prime]   ✔ 13   · 15 [odd_is_prime]   · 9 [odd_is_prime]
  pièges : one_is_prime, odd_is_prime

Lequel de ces nombres est premier ?
  · 15 [odd_is_prime]   ✔ 17   · 1 [one_is_prime]   · 9 [odd_is_prime]
  pièges : one_is_prime, odd_is_prime

```

### Niveau 2

```
Lequel de ces nombres est premier ?
  · 15 [odd_is_prime]   · 27 [odd_is_prime]   · 9 [odd_is_prime]   ✔ 19
  pièges : odd_is_prime

Lequel de ces nombres est premier ?
  · 49 [odd_is_prime]   ✔ 41   · 27 [odd_is_prime]   · 21 [odd_is_prime]
  pièges : odd_is_prime

Lequel de ces nombres est premier ?
  · 33 [odd_is_prime]   · 9 [odd_is_prime]   · 27 [odd_is_prime]   ✔ 3
  pièges : odd_is_prime

```

### Niveau 3

```
91 est-il un nombre premier ?
  · Oui : il est impair [odd_is_prime]   · Oui : il n'est pas dans les livrets de 2, 5 et 10 [odd_is_prime]   · Oui : on ne peut pas le diviser par 2 [odd_is_prime]   ✔ Non : 91 = 7 × 13
  pièges : odd_is_prime

49 est-il un nombre premier ?
  · Oui : il n'est pas dans les livrets de 2, 5 et 10 [odd_is_prime]   · Oui : il est impair [odd_is_prime]   · Oui : on ne peut pas le diviser par 2 [odd_is_prime]   ✔ Non : 49 = 7 × 7
  pièges : odd_is_prime

69 est-il un nombre premier ?
  ✔ Non : 69 = 3 × 23   · Oui : il n'est pas dans les livrets de 2, 5 et 10 [odd_is_prime]   · Oui : il est impair [odd_is_prime]   · Oui : on ne peut pas le diviser par 2 [odd_is_prime]
  pièges : odd_is_prime

```

### Niveau 4

```
Lequel de ces nombres est premier ?
  · 75 [odd_is_prime]   · 77 [odd_is_prime]   · 87 [odd_is_prime]   ✔ 53
  pièges : odd_is_prime

Lequel de ces nombres est premier ?
  · 57 [odd_is_prime]   · 95 [odd_is_prime]   ✔ 79   · 81 [odd_is_prime]
  pièges : odd_is_prime

Lequel de ces nombres est premier ?
  · 81 [odd_is_prime]   ✔ 83   · 77 [odd_is_prime]   · 87 [odd_is_prime]
  pièges : odd_is_prime

```

### Niveau 5

```
Combien y a-t-il de nombres premiers entre 80 et 100 ?
  → 3

Combien y a-t-il de nombres premiers entre 20 et 40 ?
  → 4

Combien y a-t-il de nombres premiers entre 10 et 30 ?
  → 6

```

## Décomposer en facteurs premiers (`ar-factor`, 9H)

_360 = 2³ × 3² × 5._

### Niveau 1

```
Décompose 45 en produit de facteurs premiers.
  → 3^2×5

Décompose 20 en produit de facteurs premiers.
  → 2^2×5

Décompose 18 en produit de facteurs premiers.
  → 2×3^2

```

### Niveau 2

```
Décompose 63 en produit de facteurs premiers.
  → 3^2×7

Décompose 84 en produit de facteurs premiers.
  → 2^2×3×7

Décompose 60 en produit de facteurs premiers.
  → 2^2×3×5

```

### Niveau 3

```
Décompose 196 en produit de facteurs premiers.
  → 2^2×7^2

Décompose 150 en produit de facteurs premiers.
  → 2×3×5^2

Décompose 196 en produit de facteurs premiers.
  → 2^2×7^2

```

### Niveau 4

```
Décompose 378 en produit de facteurs premiers.
  → 2×3^3×7

Décompose 840 en produit de facteurs premiers.
  → 2^3×3×5×7

Décompose 540 en produit de facteurs premiers.
  → 2^2×3^3×5

```

### Niveau 5

```
Décompose 1540 en produit de facteurs premiers.
  → 2^2×5×7×11

Décompose 1260 en produit de facteurs premiers.
  → 2^2×3^2×5×7

Décompose 1800 en produit de facteurs premiers.
  → 2^3×3^2×5^2

```

## PGDC et PPMC (`ar-gcd`, 9H)

_Le plus grand diviseur commun, le plus petit multiple commun._

### Niveau 1

```
PGDC(30 ; 24) = ?
  → 6   pièges attendus : 120 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

PGDC(12 ; 16) = ?
  → 4   pièges attendus : 48 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

PGDC(12 ; 16) = ?
  → 4   pièges attendus : 48 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

```

### Niveau 2

```
PPMC(10 ; 15) = ?
  → 30   pièges attendus : 5 [gcd_lcm_swap], 150 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

PPMC(25 ; 15) = ?
  → 75   pièges attendus : 5 [gcd_lcm_swap], 375 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

PPMC(25 ; 15) = ?
  → 75   pièges attendus : 5 [gcd_lcm_swap], 375 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

```

### Niveau 3

```
PGDC(24 ; 20) = ?
  → 4   pièges attendus : 120 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

PGDC(55 ; 88) = ?
  → 11   pièges attendus : 440 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

PGDC(42 ; 36) = ?
  → 6   pièges attendus : 252 [gcd_lcm_swap]
  pièges : gcd_lcm_swap

```

### Niveau 4

```
PPMC(36 ; 8) = ?
  → 72   pièges attendus : 4 [gcd_lcm_swap], 288 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

PPMC(65 ; 91) = ?
  → 455   pièges attendus : 13 [gcd_lcm_swap], 5915 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

PPMC(54 ; 36) = ?
  → 108   pièges attendus : 18 [gcd_lcm_swap], 1944 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

```

### Niveau 5

```
Un bus passe toutes les 20 minutes, un autre toutes les 32 minutes. Ils partent ensemble. Dans combien de minutes repartent-ils ensemble ?
  → 160   pièges attendus : 4 [gcd_lcm_swap], 640 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

Un bus passe toutes les 24 minutes, un autre toutes les 32 minutes. Ils partent ensemble. Dans combien de minutes repartent-ils ensemble ?
  → 96   pièges attendus : 8 [gcd_lcm_swap], 768 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

Un bus passe toutes les 60 minutes, un autre toutes les 105 minutes. Ils partent ensemble. Dans combien de minutes repartent-ils ensemble ?
  → 420   pièges attendus : 15 [gcd_lcm_swap], 6300 [lcm_product]
  pièges : gcd_lcm_swap, lcm_product

```

## Fractions avec PGDC et PPMC (`ar-fractions`, 9H)

_Simplifier d'un coup, trouver le plus petit dénominateur commun._

### Niveau 1

```
Simplifie en une seule étape, en divisant par le PGDC de 60 et 135.
  60/135   [free, irréductible] → 4/9

Simplifie en une seule étape, en divisant par le PGDC de 14 et 112.
  14/112   [free, irréductible] → 1/8

Simplifie en une seule étape, en divisant par le PGDC de 45 et 105.
  45/105   [free, irréductible] → 3/7

```

### Niveau 2

```
Simplifie en une seule étape, en divisant par le PGDC de 120 et 264.
  120/264   [free, irréductible] → 5/11

Simplifie en une seule étape, en divisant par le PGDC de 56 et 308.
  56/308   [free, irréductible] → 2/11

Simplifie en une seule étape, en divisant par le PGDC de 147 et 189.
  147/189   [free, irréductible] → 7/9

```

### Niveau 3

```
Quel est le plus petit dénominateur commun de 1/20 et 1/6 ?
  → 60   pièges attendus : 120 [lcm_product]
  pièges : lcm_product

Quel est le plus petit dénominateur commun de 1/21 et 5/6 ?
  → 42   pièges attendus : 126 [lcm_product]
  pièges : lcm_product

Quel est le plus petit dénominateur commun de 7/16 et 5/6 ?
  → 48   pièges attendus : 96 [lcm_product]
  pièges : lcm_product

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  7/12 + 5/9   [free, irréductible] → 41/36
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  5/6 + 13/16   [free, irréductible] → 79/48
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  8/15 + 5/12   [free, irréductible] → 19/20
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  5/18 − 5/24   [free, irréductible] → 5/72
  pièges : sub_across

Calcule et donne le résultat sous forme irréductible.
  13/20 − 11/30   [free, irréductible] → 17/60
  pièges : sub_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  20/21 − 13/28   [free, irréductible] → 41/84
  pièges : sub_across, ignore_denominators, forget_amplify

```

## Pièges de cette unité

- **Regarder seulement le dernier chiffre** (`div_last_digit`, E) : 73 est divisible par 3 (il finit par 3) au lieu de 7 + 3 = 10 : non
- **Oublier 1 et le nombre lui-même** (`divisors_forget_ends`, E) : 12 a 4 diviseurs au lieu de 12 a 6 diviseurs : 1, 2, 3, 4, 6, 12
- **1 est premier** (`one_is_prime`, E) : 1 est premier au lieu de 1 n'est pas premier
- **Impair, donc premier** (`odd_is_prime`, E) : 51 est premier au lieu de 51 = 3 × 17
- **Confondre PGDC et PPMC** (`gcd_lcm_swap`, E) : PGDC(12 ; 18) = 36 au lieu de PGDC(12 ; 18) = 6
- **Le PPMC, c'est le produit** (`lcm_product`, E) : PPMC(12 ; 18) = 216 au lieu de PPMC(12 ; 18) = 36
