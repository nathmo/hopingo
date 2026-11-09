# Exemples de questions — Calcul littéral

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Valeur d'une expression (`lit-value`, 9H)

_Remplacer la lettre par un nombre._

### Niveau 1

```
Calcule 6x−1 pour x = 8.
  → 47   pièges attendus : 67 [subst_juxtapose]
  pièges : subst_juxtapose

Calcule 7x−6 pour x = 6.
  → 36   pièges attendus : 70 [subst_juxtapose]
  pièges : subst_juxtapose

Calcule 4x+2 pour x = 8.
  → 34   pièges attendus : 50 [subst_juxtapose]
  pièges : subst_juxtapose

```

### Niveau 2

```
Calcule 5x−5 pour x = 4.
  → 15   pièges attendus : 49 [subst_juxtapose]
  pièges : subst_juxtapose

Calcule 7x−4 pour x = −3.
  → -25
  pièges : minus_minus_positive, add_ignore_signs

Calcule 6x+4 pour x = 1.
  → 10   pièges attendus : 65 [subst_juxtapose]
  pièges : subst_juxtapose

```

### Niveau 3

```
Calcule −5x^2−1 pour x = 4.
  → -81
  pièges : minus_minus_positive, add_ignore_signs, pow_times_exponent

Calcule −5x^2+2 pour x = −5.
  → -123
  pièges : neg_power_brackets, pow_times_exponent, add_sizes_keep_minus

Calcule −3x^2−8 pour x = −3.
  → -35
  pièges : neg_power_brackets, pow_times_exponent, minus_minus_positive

```

### Niveau 4

```
Calcule 3a+4b pour a = −5 et b = −3.
  → -27
  pièges : priority_left_to_right, neg_plus_neg_positive, mul_sign_dropped, mul_neg_neg_negative, add_ignore_signs, add_sizes_keep_minus

Calcule 3a−5b pour a = −1 et b = −4.
  → 17
  pièges : priority_left_to_right, sub_neg_subtracts, add_ignore_signs, mul_sign_dropped, mul_neg_neg_negative

Calcule a−3b pour a = −3 et b = 1.
  → -6
  pièges : minus_minus_positive, add_ignore_signs

```

### Niveau 5

```
Calcule a^2+b^2−2ab pour a = 4 et b = −3.
  → 49
  pièges : priority_left_to_right, sub_neg_subtracts, pow_times_exponent, neg_power_brackets, mul_sign_dropped, pow_neg_base_sign, add_sizes_keep_minus

Calcule a^2+b^2−2ab pour a = 2 et b = 2.
  → 0
  pièges : priority_left_to_right

Calcule a^2+b^2−2ab pour a = 5 et b = −1.
  → 36
  pièges : priority_left_to_right, sub_neg_subtracts, pow_times_exponent, neg_power_brackets, mul_sign_dropped, pow_neg_base_sign, add_sizes_keep_minus

```

## Traduire en expression (`lit-write`, 9H)

_Des mots aux lettres._

### Niveau 1

```
Quelle expression traduit : « Le double de x, augmenté de 2 » ?
  · x^2+2   · 2+x+2   · 2(x+2) [translate_order]   ✔ 2x+2
  pièges : translate_order

Quelle expression traduit : « Le carré de x, diminué de 7 » ?
  · x−7^2   · (x−7)^2 [translate_order]   · 2x−7   ✔ x^2−7
  pièges : translate_order

Quelle expression traduit : « Le triple de la somme de x et 6 » ?
  · 3+x+6   · x+3×6   · 3x+6 [translate_order]   ✔ 3(x+6)
  pièges : translate_order

```

### Niveau 2

```
Quelle expression traduit : « Le double de x, augmenté de 7 » ?
  · 2(x+7) [translate_order]   ✔ 2x+7   · 2+x+7   · x^2+7
  pièges : translate_order

Quelle expression traduit : « Le carré de x, diminué de 4 » ?
  · x−4^2   · (x−4)^2 [translate_order]   ✔ x^2−4   · 2x−4
  pièges : translate_order

Quelle expression traduit : « Le triple de la somme de x et 4 » ?
  ✔ 3(x+4)   · 3x+4 [translate_order]   · x+3×4   · 3+x+4
  pièges : translate_order

```

### Niveau 3

```
Quelle expression traduit : « 4 de moins que le double de x » ?
  · 4−2x [translate_order]   · 2x+4   ✔ 2x−4   · 2(x−4) [translate_order]
  pièges : translate_order

Quelle expression traduit : « L'aire d'un carré de côté x + 3 » ?
  · x^2+3 [pow_distribute_sum]   ✔ (x+3)^2   · 4(x+3)   · 2(x+3)
  pièges : pow_distribute_sum

Quelle expression traduit : « Le périmètre d'un rectangle de côtés x et 6 » ?
  · 6x   · 2x+6 [translate_order]   · x+6   ✔ 2x+12
  pièges : translate_order

```

### Niveau 4

```
Quelle expression traduit : « L'aire d'un carré de côté x + 6 » ?
  · 4(x+6)   · 2(x+6)   · x^2+6 [pow_distribute_sum]   ✔ (x+6)^2
  pièges : pow_distribute_sum

Quelle expression traduit : « L'aire d'un carré de côté x + 4 » ?
  · 2(x+4)   · 4(x+4)   · x^2+4 [pow_distribute_sum]   ✔ (x+4)^2
  pièges : pow_distribute_sum

Quelle expression traduit : « Le carré de x, diminué de 6 » ?
  · 2x−6   · x−6^2   ✔ x^2−6   · (x−6)^2 [translate_order]
  pièges : translate_order

```

### Niveau 5

```
Quelle expression traduit : « Le carré de x, diminué de 2 » ?
  ✔ x^2−2   · x−2^2   · (x−2)^2 [translate_order]   · 2x−2
  pièges : translate_order

Quelle expression traduit : « 3 de moins que le double de x » ?
  · 2x+3   ✔ 2x−3   · 3−2x [translate_order]   · 2(x−3) [translate_order]
  pièges : translate_order

Quelle expression traduit : « Le double de x, augmenté de 6 » ?
  · 2(x+6) [translate_order]   · 2+x+6   ✔ 2x+6   · x^2+6
  pièges : translate_order

```

## Égal ou pas ? (`lit-equal`, 9H)

_Exercice éclair : deux écritures, même valeur ?_

### Niveau 1

```
3x+1 et 3(x+1) sont-elles égales ?
  · Oui, pour toutes les valeurs de x [distribute_partial]   ✔ Non, pas toujours
  pièges : distribute_partial

4(x+7) et 4x+7 sont-elles égales ?
  · Oui, pour toutes les valeurs de x [distribute_partial]   ✔ Non, pas toujours
  pièges : distribute_partial

x×x et 2x sont-elles égales ?
  · Oui, pour toutes les valeurs de x [alg_x_times_x]   ✔ Non, pas toujours
  pièges : alg_x_times_x

```

### Niveau 2

```
x×x et 2x sont-elles égales ?
  · Oui, pour toutes les valeurs de x [alg_x_times_x]   ✔ Non, pas toujours
  pièges : alg_x_times_x

2x et x+x sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

x×x et x^2 sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

```

### Niveau 3

```
(x+3)^2 et x^2+9 sont-elles égales ?
  · Oui, pour toutes les valeurs de x [pow_distribute_sum]   ✔ Non, pas toujours
  pièges : pow_distribute_sum

x+x et x^2 sont-elles égales ?
  · Oui, pour toutes les valeurs de x [alg_x_plus_x]   ✔ Non, pas toujours
  pièges : alg_x_plus_x

(x+1)^2 et x^2+2x+1 sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

```

### Niveau 4

```
16x^2 et (4x)^2 sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

x^2 et x×x sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

x^2×x^3 et x^5 sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

```

### Niveau 5

```
(2x)^2 et 2x^2 sont-elles égales ?
  · Oui, pour toutes les valeurs de x [alg_coeff_power]   ✔ Non, pas toujours
  pièges : alg_coeff_power

x^2×x^3 et x^6 sont-elles égales ?
  · Oui, pour toutes les valeurs de x [pow_product_multiply_exp]   ✔ Non, pas toujours
  pièges : pow_product_multiply_exp

(6x)^2 et 36x^2 sont-elles égales ?
  ✔ Oui, pour toutes les valeurs de x   · Non, pas toujours

```

## Réduire (`lit-reduce`, 10H)

_Regrouper les termes de même sorte._

### Niveau 1

```
Réduis : x+2+5x+7
  → 6x+9 (reduced)
  pièges : conjoin_terms

Réduis : 6x+8x+6+8
  → 14x+14 (reduced)
  pièges : conjoin_terms

Réduis : 6+7x+9x+4
  → 16x+10 (reduced)
  pièges : conjoin_terms

```

### Niveau 2

```
Réduis : −3x−9+3−8x
  → -11x-6 (reduced)
  pièges : conjoin_terms

Réduis : 4−7x−4−x
  → -8x (reduced)
  pièges : conjoin_terms

Réduis : 4x+1−x+6
  → 3x+7 (reduced)
  pièges : conjoin_terms

```

### Niveau 3

```
Réduis : −1−x^2−3x−x^2−x
  → -2x^2-4x-1 (reduced)
  pièges : conjoin_terms

Réduis : x−x^2+3−7x+x^2
  → -6x+3 (reduced)
  pièges : conjoin_terms

Réduis : 6x^2−8x−8+7x^2−x
  → 13x^2-9x-8 (reduced)
  pièges : conjoin_terms

```

### Niveau 4

```
Réduis : 6a−8a+9b+3b+5a
  → 3a+12b (reduced)
  pièges : conjoin_terms

Réduis : −8b−8a+3a−8a−5b
  → -13a-13b (reduced)
  pièges : conjoin_terms

Réduis : a−2a−4a+6b−3b
  → -5a+3b (reduced)
  pièges : conjoin_terms

```

### Niveau 5

```
Réduis : 7x^2+x^2+4+6x+8x+2x×x
  → 10x^2+14x+4 (reduced)
  pièges : conjoin_terms

Réduis : x^2+5x+9x^2+9+x−1x×x
  → 9x^2+6x+9 (reduced)
  pièges : conjoin_terms

Réduis : 7x^2−3x−3x−2x^2+7+2x×x
  → 7x^2-6x+7 (reduced)
  pièges : conjoin_terms

```

## Multiplier des monômes (`lit-monomial`, 10H)

_3x² × 4x = 12x³._

### Niveau 1

```
Calcule et écris le plus simplement possible : 2x^3×3x^2
  → 6x^5 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

Calcule et écris le plus simplement possible : 3x^3×5x^3
  → 15x^6 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

Calcule et écris le plus simplement possible : 5x^3×2x^3
  → 10x^6 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

```

### Niveau 2

```
Calcule et écris le plus simplement possible : 4x×4x^2
  → 16x^3 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

Calcule et écris le plus simplement possible : 6x^2×5x^2
  → 30x^4 (reduced)
  pièges : alg_coeff_add

Calcule et écris le plus simplement possible : 5x^2×5x
  → 25x^3 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

```

### Niveau 3

```
Calcule et écris le plus simplement possible : −4x×(−5x^2)
  → 20x^3 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

Calcule et écris le plus simplement possible : 4x^3×4x
  → 16x^4 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

Calcule et écris le plus simplement possible : −6x^3×(−3x)
  → 18x^4 (reduced)
  pièges : pow_product_multiply_exp, alg_coeff_add

```

### Niveau 4

```
Calcule et écris le plus simplement possible : (5x)^2
  → 25x^2 (reduced)
  pièges : alg_coeff_power

Calcule et écris le plus simplement possible : (−5x)^2
  → 25x^2 (reduced)
  pièges : alg_coeff_power

Calcule et écris le plus simplement possible : (−3x)^3
  → -27x^3 (reduced)
  pièges : alg_coeff_power

```

### Niveau 5

```
Calcule et écris le plus simplement possible : −5x^3×(4x^3)×x
  → -20x^7 (reduced)
  pièges : pow_product_multiply_exp

Calcule et écris le plus simplement possible : −5x×(−6x^2)×x
  → 30x^4 (reduced)
  pièges : pow_product_multiply_exp

Calcule et écris le plus simplement possible : −3x^3×(−4x^2)×x
  → 12x^6 (reduced)
  pièges : pow_product_multiply_exp

```

## Développer : distributivité (`lit-expand1`, 10H)

_k(a + b) = ka + kb, avec les signes._

### Niveau 1

```
Développe et réduis : 8(3x+3)
  → 24x+24 (reduced)
  pièges : distribute_partial

Développe et réduis : 2(5x+6)
  → 10x+12 (reduced)
  pièges : distribute_partial

Développe et réduis : 5(2x+5)
  → 10x+25 (reduced)
  pièges : distribute_partial

```

### Niveau 2

```
Développe et réduis : −(x+5)
  → -x-5 (reduced)
  pièges : minus_before_parens

Développe et réduis : −(5x+9)
  → -5x-9 (reduced)
  pièges : minus_before_parens

Développe et réduis : −(x+1)
  → -x-1 (reduced)
  pièges : minus_before_parens

```

### Niveau 3

```
Développe et réduis : −(−4x+5)
  → 4x-5 (reduced)
  pièges : minus_before_parens

Développe et réduis : −7(2x+2)
  → -14x-14 (reduced)
  pièges : distribute_partial

Développe et réduis : −(5x+5)
  → -5x-5 (reduced)
  pièges : minus_before_parens

```

### Niveau 4

```
Développe et réduis : 9x(x−4)
  → 9x^2-36x (reduced)
  pièges : distribute_partial

Développe et réduis : −9x(−2x+4)
  → 18x^2-36x (reduced)
  pièges : distribute_partial

Développe et réduis : 5x(−3x+7)
  → -15x^2+35x (reduced)
  pièges : distribute_partial

```

### Niveau 5

```
Développe et réduis : −2(2x−6)+4(x−5)
  → -8 (reduced)
  pièges : distribute_partial

Développe et réduis : −7(6x−5)+1(x+2)
  → -41x+37 (reduced)
  pièges : distribute_partial

Développe et réduis : −6(6x+6)−2(x−4)
  → -38x-28 (reduced)
  pièges : distribute_partial

```

## Double distributivité (`lit-expand2`, 11H)

_(x + 3)(2x − 1) : quatre produits._

### Niveau 1

```
Développe et réduis : (x+4)(x+6)
  → x^2+10x+24 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (x+4)(x+4)
  → x^2+8x+16 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (x+2)(x+4)
  → x^2+6x+8 (reduced)
  pièges : double_distribution_partial

```

### Niveau 2

```
Développe et réduis : (x−7)(x+5)
  → x^2-2x-35 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (x−2)(x−1)
  → x^2-3x+2 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (x−4)(x−7)
  → x^2-11x+28 (reduced)
  pièges : double_distribution_partial

```

### Niveau 3

```
Développe et réduis : (3x+6)(−3x+4)
  → -9x^2-6x+24 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (3x−7)(3x+1)
  → 9x^2-18x-7 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (3x−1)(x+1)
  → 3x^2+2x-1 (reduced)
  pièges : double_distribution_partial

```

### Niveau 4

```
Développe et réduis : (x−7)(2x+3)
  → 2x^2-11x-21 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (x+3)(−x+6)
  → -x^2+3x+18 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (2x+6)(x−1)
  → 2x^2+4x-6 (reduced)
  pièges : double_distribution_partial

```

### Niveau 5

```
Développe et réduis : (x−1)(x+4)−3x(x+2)
  → -2x^2-3x-4 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (3x+5)(4x−7)+4x(x−5)
  → 16x^2-21x-35 (reduced)
  pièges : double_distribution_partial

Développe et réduis : (3x+1)(2x+2)+3x(x+2)
  → 9x^2+14x+2 (reduced)
  pièges : double_distribution_partial

```

## Identités remarquables (`lit-identities`, 11H)

_(a ± b)² et (a + b)(a − b)._

### Niveau 1

```
Développe avec une identité remarquable : (x+9)^2
  → x^2+18x+81 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

Développe avec une identité remarquable : (x+9)^2
  → x^2+18x+81 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

Développe avec une identité remarquable : (x+9)^2
  → x^2+18x+81 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

```

### Niveau 2

```
Développe avec une identité remarquable : (x−8)^2
  → x^2-16x+64 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

Développe avec une identité remarquable : (x−9)^2
  → x^2-18x+81 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

Développe avec une identité remarquable : (x−8)^2
  → x^2-16x+64 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square

```

### Niveau 3

```
Développe avec une identité remarquable : (2x+1)(2x−1)
  → 4x^2-1 (reduced)
  pièges : identity_sign_square

Développe avec une identité remarquable : (2x+5)(2x−5)
  → 4x^2-25 (reduced)
  pièges : identity_sign_square

Développe avec une identité remarquable : (4x+7)^2
  → 16x^2+56x+49 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square, alg_coeff_power

```

### Niveau 4

```
Développe avec une identité remarquable : (5x+5)(5x−5)
  → 25x^2-25 (reduced)
  pièges : identity_sign_square

Développe avec une identité remarquable : (4x+3)^2
  → 16x^2+24x+9 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square, alg_coeff_power

Développe avec une identité remarquable : (3x+7)^2
  → 9x^2+42x+49 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square, alg_coeff_power

```

### Niveau 5

```
Développe avec une identité remarquable : (2x−3)^2
  → 4x^2-12x+9 (reduced)
  pièges : pow_distribute_sum, identity_middle_term, identity_sign_square, alg_coeff_power

Développe avec une identité remarquable : (3x+6)(3x−6)
  → 9x^2-36 (reduced)
  pièges : identity_sign_square

Développe avec une identité remarquable : (3x+8)(3x−8)
  → 9x^2-64 (reduced)
  pièges : identity_sign_square

```

## Développer, réduire, ordonner (`lit-polynomial`, 11H)

_Tout ensemble, du plus grand degré au plus petit._

### Niveau 1

```
Développe, réduis et ordonne : (x+2)(x+1)+3x(x−1)
  → 4x^2+2 (reduced)

Développe, réduis et ordonne : 3(x+5)^2−(x−5)(x+5)
  → 2x^2+30x+100 (reduced)

Développe, réduis et ordonne : 3(x+3)^2−(x−3)(x+3)
  → 2x^2+18x+36 (reduced)

```

### Niveau 2

```
Développe, réduis et ordonne : (x+3)(x+4)+x(x−4)
  → 2x^2+3x+12 (reduced)

Développe, réduis et ordonne : (2x−4)^2−4(x^2+3)
  → -16x+4 (reduced)

Développe, réduis et ordonne : (2x+1)^2−4(x^2+4)
  → 4x-15 (reduced)

```

### Niveau 3

```
Développe, réduis et ordonne : (2x−5)^2−4(x^2+1)
  → -20x+21 (reduced)

Développe, réduis et ordonne : (2x−5)^2−4(x^2+1)
  → -20x+21 (reduced)

Développe, réduis et ordonne : (x+3)^2+(x−3)^2
  → 2x^2+18 (reduced)

```

### Niveau 4

```
Développe, réduis et ordonne : x(x+4)(x−5)
  → x^3-x^2-20x (reduced)

Développe, réduis et ordonne : x(x+3)(x−1)
  → x^3+2x^2-3x (reduced)

Développe, réduis et ordonne : (x+1)^2+(x−1)^2
  → 2x^2+2 (reduced)

```

### Niveau 5

```
Développe, réduis et ordonne : x(x+5)(x+5)
  → x^3+10x^2+25x (reduced)

Développe, réduis et ordonne : x(x+5)(x+4)
  → x^3+9x^2+20x (reduced)

Développe, réduis et ordonne : x(x+3)(x+5)
  → x^3+8x^2+15x (reduced)

```

## Pièges de cette unité

- **Coller le nombre à côté du coefficient** (`subst_juxtapose`, R) : 3x pour x = 4 → 34 au lieu de 3 × 4 = 12
- **Parenthèses mal placées en traduisant** (`translate_order`, E) : le double de (x + 3) → 2x + 3 au lieu de 2(x + 3)
- **Coller des termes différents** (`conjoin_terms`, R) : 2x + 3 = 5x au lieu de 2x + 3 ne se réduit pas
- **x + x = x²** (`alg_x_plus_x`, E) : x + x = x² au lieu de x + x = 2x
- **x × x = 2x** (`alg_x_times_x`, E) : x × x = 2x au lieu de x × x = x²
- **Oublier d'élever le coefficient** (`alg_coeff_power`, E) : (2x)² = 2x² au lieu de (2x)² = 4x²
- **Additionner les coefficients d'un produit** (`alg_coeff_add`, E) : 3x × 4x = 7x² au lieu de 3x × 4x = 12x²
- **Distribuer sur un seul terme** (`distribute_partial`, R) : 3(x + 2) = 3x + 2 au lieu de 3(x + 2) = 3x + 6
- **Double distributivité incomplète** (`double_distribution_partial`, R) : (x + 2)(x + 3) = x² + 6 au lieu de x² + 3x + 2x + 6
- **Oublier le 2 du double produit** (`identity_middle_term`, E) : (x + 3)² = x² + 3x + 9 au lieu de (x + 3)² = x² + 6x + 9
- **Mauvais signe dans une identité** (`identity_sign_square`, E) : (x − 3)² = x² − 6x − 9 au lieu de (x − 3)² = x² − 6x + 9
