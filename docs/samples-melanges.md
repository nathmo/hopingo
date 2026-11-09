# Exemples de questions — Calculs mélangés

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Calculs mélangés 9H (`mix-9`, 9H)

_Nombres relatifs, fractions et carrés dans un même calcul._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  3/4 + 1/5 × 4   [guided, irréductible] → 31/20
  pièges : priority_left_to_right, int_times_both, mult_rule_for_addition, add_across, ignore_denominators, forget_amplify

Calcule et donne le résultat sous forme irréductible.
  3 + 6 × 4   [guided, irréductible] → 27
  pièges : priority_left_to_right

Calcule et donne le résultat sous forme irréductible.
  5 + 5 × 3   [guided, irréductible] → 20
  pièges : priority_left_to_right

```

### Niveau 2

```
Calcule et donne le résultat sous forme irréductible.
  2 − 5 × 5   [guided, irréductible] → -23
  pièges : priority_left_to_right, reverse_subtraction, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  −2 − 6 × 2   [guided, irréductible] → -14
  pièges : priority_left_to_right, minus_minus_positive, add_ignore_signs, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  (1/2 + 1/2) × 5   [guided, irréductible] → 5
  pièges : ignore_parentheses, mult_rule_for_addition, add_denominators, int_times_both

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  1/3 × 2 + 2^2   [tap, irréductible] → 14/3
  pièges : pow_before_product, int_plus_frac, int_times_both

Calcule et donne le résultat sous forme irréductible.
  4 − 2/3 × 3   [tap, irréductible] → 2
  pièges : priority_left_to_right, int_times_both, int_plus_frac

Calcule et donne le résultat sous forme irréductible.
  4 − (5 + 2)   [tap, irréductible] → -3
  pièges : minus_before_parens, reverse_subtraction, sign_of_first

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  3^2 − (−4 + (−6))   [free, irréductible] → 19
  pièges : minus_before_parens, sub_neg_subtracts, pow_times_exponent, add_sizes_keep_minus

Calcule et donne le résultat sous forme irréductible.
  3/5 + 1/6 − 1/6 × 6   [free, irréductible] → -7/30
  pièges : priority_left_to_right, int_times_both, int_plus_frac, ignore_denominators, sub_across, forget_amplify, reverse_subtraction, add_across, mult_rule_for_addition

Calcule et donne le résultat sous forme irréductible.
  2^2 − (−6 + (−3))   [free, irréductible] → 13
  pièges : minus_before_parens, sub_neg_subtracts, add_sizes_keep_minus

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  (5 − 1/6) × 5 + 1/6   [free, irréductible] → 73/3
  pièges : ignore_parentheses, int_times_both, add_denominators, mult_rule_for_addition, int_plus_frac

Calcule et donne le résultat sous forme irréductible.
  −5 + 2 − 6^2 × 2   [free, irréductible] → -75
  pièges : priority_left_to_right, minus_minus_positive, add_ignore_signs, add_sizes_keep_minus, pow_times_exponent, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  2 + 6 − 4^2 × 4   [free, irréductible] → -56
  pièges : priority_left_to_right, reverse_subtraction, pow_times_exponent, mul_sign_dropped

```

## Calculs mélangés 10H (`mix-10`, 10H)

_Fractions relatives et puissances de négatifs._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  2^2 + (−2/3)   [guided, irréductible] → 10/3
  pièges : int_plus_frac, add_ignore_signs, add_sizes_keep_minus

Calcule et donne le résultat sous forme irréductible.
  5^2 + 4/5   [guided, irréductible] → 129/5
  pièges : int_plus_frac, pow_times_exponent

Calcule et donne le résultat sous forme irréductible.
  2^2 + 1/3   [guided, irréductible] → 13/3
  pièges : int_plus_frac

```

### Niveau 2

```
Calcule et donne le résultat sous forme irréductible.
  (−4/5 − 3/4) × (−5)   [guided, irréductible] → 31/4
  pièges : ignore_parentheses, int_times_both, mul_neg_neg_negative, sub_across, ignore_denominators, forget_amplify, add_ignore_signs, sub_neg_subtracts

Calcule et donne le résultat sous forme irréductible.
  (1/2)^2 + 1/3   [guided, irréductible] → 7/12
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, pow_fraction_numerator_only

Calcule et donne le résultat sous forme irréductible.
  (−2/5 − 4/5) × (−3)   [guided, irréductible] → 18/5
  pièges : ignore_parentheses, int_times_both, mul_neg_neg_negative, add_ignore_signs, sub_neg_subtracts

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  (−3)^2 ÷ (−1/6)   [tap, irréductible] → -54
  pièges : neg_power_brackets, pow_times_exponent, invert_first

Calcule et donne le résultat sous forme irréductible.
  1/2 × (−2/5) − (−3)   [tap, irréductible] → 14/5
  pièges : int_plus_frac, sub_neg_subtracts, add_ignore_signs, keep_common_denominator_mult, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  −3^2 + 5/6 × (−5)   [tap, irréductible] → -79/6
  pièges : priority_left_to_right, int_times_both, neg_power_brackets, neg_plus_neg_positive, pow_times_exponent, int_plus_frac, mul_sign_dropped, mul_neg_neg_negative, add_ignore_signs, add_sizes_keep_minus

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  (−1/3 + 1/5) × (−5 − 5)   [free, irréductible] → 4/3
  pièges : ignore_parentheses, int_times_both, mul_neg_neg_negative, add_across, mult_rule_for_addition, add_ignore_signs, add_sizes_keep_minus, int_plus_frac, minus_minus_positive, ignore_denominators, forget_amplify, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  (−1/2 + 1/4) × (−2 − 3)   [free, irréductible] → 5/4
  pièges : ignore_parentheses, add_ignore_signs, int_times_both, mul_neg_neg_negative, add_across, mult_rule_for_addition, add_sizes_keep_minus, minus_minus_positive, ignore_denominators, forget_amplify, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  (−2)^2 + (−4/5) ÷ 2/3   [free, irréductible] → 14/5
  pièges : priority_left_to_right, neg_power_brackets, add_ignore_signs, int_plus_frac, mult_across_division, invert_first, add_sizes_keep_minus, mul_sign_dropped

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  −4^2 + (5/6 + 1/2) × (−5)   [free, irréductible] → -68/3
  pièges : priority_left_to_right, pow_times_exponent, ignore_parentheses, int_plus_frac, neg_power_brackets, neg_plus_neg_positive, mul_sign_dropped, add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, mul_neg_neg_negative, add_ignore_signs, add_sizes_keep_minus, int_times_both

Calcule et donne le résultat sous forme irréductible.
  (−2)^3 × 2/5 − (2/5)^2   [free, irréductible] → -84/25
  pièges : sub_across, ignore_denominators, forget_amplify, minus_minus_positive, add_ignore_signs, int_times_both, pow_times_exponent

Calcule et donne le résultat sous forme irréductible.
  −4^2 + (−1/5 + 1/2) × (−4)   [free, irréductible] → -86/5
  pièges : priority_left_to_right, int_times_both, ignore_parentheses, neg_power_brackets, neg_plus_neg_positive, pow_times_exponent, int_plus_frac, mul_sign_dropped, add_across, mult_rule_for_addition, add_ignore_signs, add_sizes_keep_minus, mul_neg_neg_negative, ignore_denominators, forget_amplify

```

## Calculs mélangés 11H (`mix-11`, 11H)

_Tout ensemble : racines, exposants négatifs, fractions relatives._

### Niveau 1

```
Calcule et donne le résultat sous forme irréductible.
  √(1/16) + (−1/4)^2   [guided, irréductible] → 5/16
  pièges : neg_power_brackets, add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, sqrt_half, sqrt_is_square, add_sizes_keep_minus

Calcule et donne le résultat sous forme irréductible.
  (−1/4)^2 − 3/4 × √(1/16)   [guided, irréductible] → -1/8
  pièges : priority_left_to_right, neg_power_brackets, reverse_subtraction, pow_fraction_numerator_only, keep_common_denominator_mult, sqrt_half, sqrt_numerator_only, sqrt_is_square, mul_sign_dropped, sub_across, ignore_denominators, forget_amplify, pow_neg_base_sign, minus_minus_positive

Calcule et donne le résultat sous forme irréductible.
  (−1/2)^2 − 1/6 × √(1/25)   [guided, irréductible] → 13/60
  pièges : priority_left_to_right, sub_across, neg_power_brackets, pow_fraction_numerator_only, keep_common_denominator_mult, sqrt_half, sqrt_numerator_only, sqrt_is_square, pow_neg_base_sign, ignore_denominators, forget_amplify, minus_minus_positive

```

### Niveau 2

```
Calcule et donne le résultat sous forme irréductible.
  √4 − (1/3)^−1   [guided, irréductible] → -1
  pièges : reverse_subtraction, sqrt_is_square, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  √36 − (−1/2)^−1   [guided, irréductible] → 8
  pièges : sub_neg_subtracts, sqrt_half, sqrt_is_square, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  (2/3)^−2 + √(1/49)   [guided, irréductible] → 67/28
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, pow_neg_exp_negative, pow_neg_exp_forget_power, sqrt_half, sqrt_numerator_only, sqrt_is_square

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  √16 − (−2/3)^−1 × 5/6   [tap, irréductible] → 21/4
  pièges : priority_left_to_right, int_plus_frac, sub_neg_subtracts, sqrt_half, sqrt_is_square, keep_common_denominator_mult, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  6^−1 + √(1/36)   [tap, irréductible] → 1/3
  pièges : add_denominators, mult_rule_for_addition, pow_neg_exp_negative, sqrt_half, sqrt_numerator_only, sqrt_is_square

Calcule et donne le résultat sous forme irréductible.
  √49 − (1/6)^−1 × 1/6   [tap, irréductible] → 6
  pièges : priority_left_to_right, sqrt_half, sqrt_is_square, int_times_both, pow_neg_exp_negative

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  (−2)^2 × (4/5)^−2 − √(4/9)   [free, irréductible] → 67/12
  pièges : neg_power_brackets, int_times_both, sub_across, ignore_denominators, forget_amplify, pow_neg_exp_negative, pow_neg_exp_forget_power, sqrt_half, sqrt_is_square, minus_minus_positive

Calcule et donne le résultat sous forme irréductible.
  2^2 × (1/2)^−2 − √(1/16)   [free, irréductible] → 63/4
  pièges : int_plus_frac, pow_neg_exp_negative, pow_neg_exp_forget_power, sqrt_half, sqrt_numerator_only, sqrt_is_square

Calcule et donne le résultat sous forme irréductible.
  √(25/36) × (−1/2 − 1/2)^2   [free, irréductible] → 5/6
  pièges : pow_distribute_sum, sqrt_half, sqrt_numerator_only, sqrt_is_square, pow_neg_base_sign, pow_fraction_numerator_only

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  (−5/6 + 1/2)^−1 − √(1/36) × 5   [free, irréductible] → -23/6
  pièges : priority_left_to_right, int_times_both, pow_distribute_sum, int_plus_frac, minus_minus_positive, add_ignore_signs, add_across, ignore_denominators, mult_rule_for_addition, add_sizes_keep_minus, sqrt_half, sqrt_numerator_only, sqrt_is_square, mul_sign_dropped, sub_across, reverse_subtraction, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  (√(1/36) − 1/2)^3 × (1/4)^−2   [free, irréductible] → -16/27
  pièges : pow_distribute_sum, sub_across, int_times_both, mul_sign_dropped, sqrt_half, sqrt_numerator_only, sqrt_is_square, pow_neg_exp_negative, pow_neg_exp_forget_power, pow_fraction_numerator_only

Calcule et donne le résultat sous forme irréductible.
  (−1/2 + 1/3)^−1 − √(4/9) × 4   [free, irréductible] → -26/3
  pièges : priority_left_to_right, int_times_both, pow_distribute_sum, int_plus_frac, minus_minus_positive, add_ignore_signs, add_sizes_keep_minus, sqrt_half, sqrt_is_square, mul_sign_dropped, reverse_subtraction, sign_of_first, pow_neg_exp_negative

```

## Pièges de cette unité

