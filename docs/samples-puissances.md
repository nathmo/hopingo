# Exemples de questions — Puissances

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Les puissances (`pow-def`, 9H)

_Carrés, cubes : un produit de facteurs égaux._

### Niveau 1

```
Calcule.
  3^3   [guided] → 27
  pièges : pow_times_exponent

Calcule.
  4^3   [guided] → 64
  pièges : pow_times_exponent

Calcule.
  4^2   [guided] → 16
  pièges : pow_times_exponent

```

### Niveau 2

```
Comment écrire 4×4×4×4×4 avec une puissance ?
  · 4×5 [pow_times_exponent]   ✔ 4^5   · 5^4   · 4^6
  pièges : pow_times_exponent

Comment écrire 9×9×9×9×9 avec une puissance ?
  · 9×5 [pow_times_exponent]   · 9^6   ✔ 9^5   · 5^9
  pièges : pow_times_exponent

Comment écrire 7×7×7×7×7 avec une puissance ?
  · 7^6   · 7×5 [pow_times_exponent]   · 5^7   ✔ 7^5
  pièges : pow_times_exponent

```

### Niveau 3

```
Calcule 3^2.
  → 9
  pièges : pow_times_exponent

Calcule 4^2.
  → 16
  pièges : pow_times_exponent

Calcule 3^3.
  → 27
  pièges : pow_times_exponent

```

### Niveau 4

```
Calcule (1/2)^2.
  → 1/4
  pièges : pow_fraction_numerator_only

Calcule (1/4)^2.
  → 1/16
  pièges : pow_fraction_numerator_only

Calcule (3/4)^2.
  → 9/16
  pièges : pow_fraction_numerator_only

```

### Niveau 5

```
Complète : ?^3 = 27
  → 3   pièges attendus : 9 [pow_times_exponent]
  pièges : pow_times_exponent

Complète : 10^? = 10 000
  → 4

Complète : 10^? = 100 000
  → 5

```

## Calculs avec des puissances (`pow-priority`, 10H)

_Les puissances passent avant × et ÷._

### Niveau 1

```
Calcule.
  6^2 − 3   [guided, irréductible] → 33
  pièges : pow_times_exponent

Calcule.
  2^2 − 4   [guided, irréductible] → 0

Calcule.
  6 × 4^2   [guided, irréductible] → 96
  pièges : pow_before_product, pow_times_exponent

```

### Niveau 2

```
Combien vaut 3+4^2 ?
  · 20   ✔ 19   · 11 [pow_times_exponent]   · 49 [pow_before_product]
  pièges : pow_before_product, pow_times_exponent

Combien vaut (6+5)^2 ?
  · 61 [pow_distribute_sum]   ✔ 121   · 37 [pow_distribute_sum]   · 46 [pow_distribute_sum]
  pièges : pow_distribute_sum

Combien vaut 3+2^2 ?
  · 9   · 25 [pow_before_product]   ✔ 7   · 8
  pièges : pow_before_product

```

### Niveau 3

```
Calcule.
  2^2 + 4^2   [tap, irréductible] → 20
  pièges : pow_before_product, pow_times_exponent

Calcule.
  2^2 + 6^2   [tap, irréductible] → 40
  pièges : pow_before_product, pow_times_exponent

Calcule.
  5 + 5^2 × 3   [tap, irréductible] → 80
  pièges : priority_left_to_right, pow_times_exponent

```

### Niveau 4

```
Calcule.
  (2 × 5)^2 − 3   [free, irréductible] → 97
  pièges : pow_forget_coefficient, pow_times_exponent

Calcule.
  (2 × 5)^2 − 5   [free, irréductible] → 95
  pièges : pow_forget_coefficient, pow_times_exponent

Calcule.
  (2 × 2)^2 − 5   [free, irréductible] → 11
  pièges : pow_forget_coefficient

```

### Niveau 5

```
Calcule.
  (3^2 − 3) × 3   [free, irréductible] → 18
  pièges : ignore_parentheses, pow_times_exponent

Calcule.
  (2 + 4)^2 − (3 − 3)^2   [free, irréductible] → 36
  pièges : pow_distribute_sum, pow_times_exponent

Calcule.
  4 × (5 + 3)^2 − 3   [free, irréductible] → 253
  pièges : pow_distribute_sum, pow_times_exponent

```

## Puissances et signes (`pow-sign`, 10H)

_(−3)² ou −3² : les parenthèses changent tout._

### Niveau 1

```
Calcule.
  (−4)^2   [guided, irréductible] → 16
  pièges : neg_power_brackets, pow_times_exponent

Calcule.
  (−2)^3   [guided, irréductible] → -8
  pièges : pow_times_exponent, pow_neg_base_sign

Calcule.
  (−3)^3   [guided, irréductible] → -27
  pièges : pow_times_exponent, pow_neg_base_sign

```

### Niveau 2

```
Combien vaut (−2)^2 ?
  · 5   · 6   ✔ 4   · −4 [neg_power_brackets]
  pièges : neg_power_brackets

Combien vaut −2^2 ?
  · 4 [neg_power_brackets]   · −2   ✔ −4   · −3
  pièges : neg_power_brackets

Combien vaut −2^2 ?
  · 4 [neg_power_brackets]   · −2   ✔ −4   · −3
  pièges : neg_power_brackets

```

### Niveau 3

```
Calcule −(−3)^4.
  → -81
  pièges : neg_power_brackets, pow_times_exponent

Calcule (−5)^2.
  → 25
  pièges : neg_power_brackets, pow_times_exponent

Calcule −(−6)^3.
  → 216
  pièges : pow_times_exponent, pow_neg_base_sign

```

### Niveau 4

```
Calcule (−1)^16.
  → 1
  pièges : neg_power_brackets, pow_times_exponent

Calcule (−1)^25.
  → -1
  pièges : pow_times_exponent, pow_neg_base_sign

Calcule (−1)^19×(−1)^20.
  → -1
  pièges : neg_power_brackets, pow_times_exponent

```

### Niveau 5

```
Calcule.
  (−5)^2 × (−5)   [free, irréductible] → -125
  pièges : neg_power_brackets, pow_times_exponent

Calcule.
  (−2)^2 × (−2)   [free, irréductible] → -8
  pièges : neg_power_brackets

Calcule.
  −(5 − 10)^2   [free, irréductible] → -25
  pièges : pow_distribute_sum, reverse_subtraction, pow_times_exponent

```

## Puissances de 10 (`pow-ten`, 10H)

_10⁴ = 10 000, 10⁰ = 1, 10⁻² = 0,01._

### Niveau 1

```
Écris 10^5 en chiffres.
  → 100000
  pièges : pow_times_exponent

Écris 10^6 en chiffres.
  → 1000000
  pièges : pow_times_exponent

Écris 10^6 en chiffres.
  → 1000000
  pièges : pow_times_exponent

```

### Niveau 2

```
Complète : 1 000 000 = 10^?
  → 6   pièges attendus : 7 [pow_ten_count_digits]
  pièges : pow_ten_count_digits

Complète : 10 000 = 10^?
  → 4   pièges attendus : 5 [pow_ten_count_digits]
  pièges : pow_ten_count_digits

Complète : 100 000 = 10^?
  → 5   pièges attendus : 6 [pow_ten_count_digits]
  pièges : pow_ten_count_digits

```

### Niveau 3

```
Écris 10^−5 sous forme décimale.
  → 0,00001 (decimal)
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

Écris 10^−4 sous forme décimale.
  → 0,0001 (decimal)
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

Écris 10^−2 sous forme décimale.
  → 0,01 (decimal)
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

```

### Niveau 4

```
Combien vaut 10^0 ?
  · 10 [pow_zero_is_base]   · −1   · 0 [pow_zero_is_zero]   ✔ 1
  pièges : pow_zero_is_zero, pow_zero_is_base

Combien vaut 10^0 ?
  ✔ 1   · 10 [pow_zero_is_base]   · 0 [pow_zero_is_zero]   · −1
  pièges : pow_zero_is_zero, pow_zero_is_base

Combien vaut 3^0 ?
  ✔ 1   · 3 [pow_zero_is_base]   · −1   · 0 [pow_zero_is_zero]
  pièges : pow_zero_is_zero, pow_zero_is_base

```

### Niveau 5

```
Complète : 0,00001 = 10^?
  → -5   pièges attendus : 5 [exp_sign_small_number]
  pièges : exp_sign_small_number

Complète : 0,00001 = 10^?
  → -5   pièges attendus : 5 [exp_sign_small_number]
  pièges : exp_sign_small_number

Complète : 0,00001 = 10^?
  → -5   pièges attendus : 5 [exp_sign_small_number]
  pièges : exp_sign_small_number

```

## Règles de calcul (`pow-rules`, 10H)

_Produit, quotient et puissance de puissances du même nombre._

### Niveau 1

```
Complète : 3^5 × 3^4 = 3^?
  → 9   pièges attendus : 20 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : 5^4 × 5^4 = 5^?
  → 8   pièges attendus : 16 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : 5^3 × 5^3 = 5^?
  → 6   pièges attendus : 9 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

```

### Niveau 2

```
Complète : 2^5 ÷ 2^3 = 2^?
  → 2

Complète : 7^4 × 7^2 = 7^?
  → 6   pièges attendus : 8 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : 2^6 ÷ 2^3 = 2^?
  → 3   pièges attendus : 2 [pow_quotient_divide_exp]
  pièges : pow_quotient_divide_exp

```

### Niveau 3

```
Complète : 10^2 × 10^3 = 10^?
  → 5   pièges attendus : 6 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : (10^5)^4 = 10^?
  → 20   pièges attendus : 9 [pow_power_add_exp]
  pièges : pow_power_add_exp

Complète : (7^6)^3 = 7^?
  → 18   pièges attendus : 9 [pow_power_add_exp]
  pièges : pow_power_add_exp

```

### Niveau 4

```
Combien vaut 2^3 + 2^3 ?
  ✔ 2^4   · 2^6 [pow_sum_add_exp]   · 4^6   · 4^3 [pow_product_multiply_bases]
  pièges : pow_sum_add_exp, pow_product_multiply_bases

Combien vaut 2^3 + 2^3 ?
  · 4^3 [pow_product_multiply_bases]   ✔ 2^4   · 2^6 [pow_sum_add_exp]   · 4^6
  pièges : pow_sum_add_exp, pow_product_multiply_bases

Combien vaut 5^7 × 5^3 ?
  ✔ 5^10   · 5^21 [pow_product_multiply_exp]   · 25^10 [pow_product_multiply_bases]   · 25^21
  pièges : pow_product_multiply_exp, pow_product_multiply_bases

```

### Niveau 5

```
Complète : (10^−3)^3 = 10^?
  → -9   pièges attendus : 0 [pow_power_add_exp]
  pièges : pow_power_add_exp

Complète : (10^−5)^3 = 10^?
  → -15   pièges attendus : -2 [pow_power_add_exp]
  pièges : pow_power_add_exp

Complète : (10^−3)^3 = 10^?
  → -9   pièges attendus : 0 [pow_power_add_exp]
  pièges : pow_power_add_exp

```

## Notation scientifique (`pow-sci`, 11H)

_a × 10ⁿ avec un seul chiffre non nul avant la virgule._

### Niveau 1

```
Complète : 89 000 = 8,9 × 10^?
  → 4   pièges attendus : 3 [sci_count_zeros]
  pièges : sci_count_zeros

Complète : 50 000 = 5 × 10^?
  → 4

Complète : 8 500 000 = 8,5 × 10^?
  → 6   pièges attendus : 5 [sci_count_zeros]
  pièges : sci_count_zeros

```

### Niveau 2

```
Complète : 0,07 = 7 × 10^?
  → -2   pièges attendus : -1 [sci_count_zeros], 2 [exp_sign_small_number]
  pièges : sci_count_zeros, exp_sign_small_number

Complète : 0,0096 = 9,6 × 10^?
  → -3   pièges attendus : -2 [sci_count_zeros], 3 [exp_sign_small_number]
  pièges : sci_count_zeros, exp_sign_small_number

Complète : 0,000067 = 6,7 × 10^?
  → -5   pièges attendus : -4 [sci_count_zeros], 5 [exp_sign_small_number]
  pièges : sci_count_zeros, exp_sign_small_number

```

### Niveau 3

```
Quelle est la notation scientifique de 27 000 000 ?
  · 0,27×10^8 [sci_mantissa_range]   ✔ 2,7×10^7   · 27×10^6 [sci_mantissa_range]   · 2,7×10^6 [sci_count_zeros]
  pièges : sci_mantissa_range, sci_count_zeros

Quelle est la notation scientifique de 0,0009 ?
  ✔ 9×10^−4   · 0,9×10^−3 [sci_mantissa_range]   · 9×10^−3 [sci_count_zeros]   · 90×10^−5 [sci_mantissa_range]
  pièges : sci_mantissa_range, sci_count_zeros

Quelle est la notation scientifique de 1 400 ?
  · 14×10^2 [sci_mantissa_range]   · 0,14×10^4 [sci_mantissa_range]   · 1,4×10^2 [sci_count_zeros]   ✔ 1,4×10^3
  pièges : sci_mantissa_range, sci_count_zeros

```

### Niveau 4

```
Écris 7×10^3 sous forme décimale.
  → 7000 (decimal)
  pièges : pow_before_product, pow_times_exponent

Écris 7,3×10^−3 sous forme décimale.
  → 0,0073 (decimal)
  pièges : pow_before_product, pow_neg_exp_negative, pow_neg_exp_forget_power

Écris 9,1×10^5 sous forme décimale.
  → 910000 (decimal)
  pièges : pow_before_product, pow_times_exponent

```

### Niveau 5

```
Complète : (2 × 10^5) × (3 × 10^3) = 6 × 10^?
  → 8   pièges attendus : 15 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : (2 × 10^3) × (4 × 10^5) = 8 × 10^?
  → 8   pièges attendus : 15 [pow_product_multiply_exp]
  pièges : pow_product_multiply_exp

Complète : (2 × 10^4)^2 = ? × 10^8
  → 4   pièges attendus : 2 [pow_forget_coefficient]
  pièges : pow_forget_coefficient

```

## Puissances de fractions (`pow-frac`, 10H)

_(2/3)², (−1/2)³ et les exposants négatifs : (2/3)⁻² = 9/4._

### Niveau 1

```
Calcule.
  (1/2)^3   [guided, irréductible] → 1/8
  pièges : pow_fraction_numerator_only

Calcule.
  (1/5)^2   [guided, irréductible] → 1/25
  pièges : pow_fraction_numerator_only

Calcule.
  (1/2)^2   [guided, irréductible] → 1/4
  pièges : pow_fraction_numerator_only

```

### Niveau 2

```
Calcule.
  (−1/2)^3   [guided, irréductible] → -1/8
  pièges : pow_fraction_numerator_only, pow_neg_base_sign

Calcule.
  (−2/5)^3   [guided, irréductible] → -8/125
  pièges : pow_fraction_numerator_only, pow_neg_base_sign

Calcule.
  (−1/2)^3   [guided, irréductible] → -1/8
  pièges : pow_fraction_numerator_only, pow_neg_base_sign

```

### Niveau 3

```
Combien vaut 2^−3 ?
  · −8 [pow_neg_exp_negative]   · −1/8   ✔ 1/8   · 1/2 [pow_neg_exp_forget_power]
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

Combien vaut (2/3)^−2 ?
  ✔ 9/4   · 3/2 [pow_neg_exp_forget_power]   · −4/9 [pow_neg_exp_negative]   · −9/4
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

Combien vaut (1/2)^−1 ?
  · −1/2 [pow_neg_exp_negative]   · 3   · −2   ✔ 2
  pièges : pow_neg_exp_negative

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  2^−2   [free, irréductible] → 1/4
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

Calcule et donne le résultat sous forme irréductible.
  (−1/2)^−2   [free, irréductible] → 4
  pièges : neg_power_brackets, pow_neg_exp_forget_power, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  (1/2)^−2 × 5   [free, irréductible] → 20
  pièges : pow_neg_exp_negative, pow_neg_exp_forget_power

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  (−1/6)^−2 + 1/4   [free, irréductible] → 145/4
  pièges : neg_power_brackets, pow_neg_exp_forget_power, int_plus_frac, pow_neg_exp_negative, add_sizes_keep_minus

Calcule et donne le résultat sous forme irréductible.
  2^−1 + (1/2)^2   [free, irréductible] → 3/4
  pièges : add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, pow_neg_exp_negative

Calcule et donne le résultat sous forme irréductible.
  (−3/4)^−2 + 1/2   [free, irréductible] → 41/18
  pièges : neg_power_brackets, pow_neg_exp_forget_power, add_across, ignore_denominators, forget_amplify, mult_rule_for_addition, pow_neg_exp_negative, add_sizes_keep_minus

```

## Pièges de cette unité

- **Multiplier par l'exposant** (`pow_times_exponent`, R) : 3² = 6 au lieu de 3² = 9
- **Puissance 0 égale 0** (`pow_zero_is_zero`, R) : 5⁰ = 0 au lieu de 5⁰ = 1
- **Puissance 0 égale le nombre** (`pow_zero_is_base`, E) : 5⁰ = 5 au lieu de 5⁰ = 1
- **Exposant négatif, nombre négatif** (`pow_neg_exp_negative`, R) : 10⁻² = −100 au lieu de 10⁻² = 1/100 = 0,01
- **Inverser sans garder l'exposant** (`pow_neg_exp_forget_power`, E) : (2/3)⁻² = 3/2 au lieu de (2/3)⁻² = (3/2)² = 9/4
- **Mauvais signe pour la puissance d'un négatif** (`pow_neg_base_sign`, E) : (−2)⁴ = −16 au lieu de (−2)⁴ = 16
- **Élever seulement le numérateur** (`pow_fraction_numerator_only`, E) : (2/3)² = 4/3 au lieu de (2/3)² = 4/9
- **Oublier des décimales en élevant au carré** (`pow_decimal_places`, E) : 0,3² = 0,9 au lieu de 0,3² = 0,09
- **Confondre −3² et (−3)²** (`neg_power_brackets`, P) : −3² = 9 au lieu de −3² = −9, mais (−3)² = 9
- **Distribuer la puissance sur une somme** (`pow_distribute_sum`, R) : (1 + 2)² = 1² + 2² = 5 au lieu de (1 + 2)² = 3² = 9
- **Oublier d'élever un des facteurs** (`pow_forget_coefficient`, R) : (2 × 10³)² = 2 × 10⁶ au lieu de (2 × 10³)² = 4 × 10⁶
- **Calculer avant la puissance** (`pow_before_product`, E) : 2 × 3² = 6² = 36 au lieu de 2 × 3² = 2 × 9 = 18
- **Multiplier les exposants d'un produit** (`pow_product_multiply_exp`, R) : 2³ × 2⁴ = 2¹² au lieu de 2³ × 2⁴ = 2⁷
- **Multiplier aussi les nombres** (`pow_product_multiply_bases`, E) : 2³ × 2⁴ = 4⁷ au lieu de 2³ × 2⁴ = 2⁷
- **Additionner les exposants d'une puissance de puissance** (`pow_power_add_exp`, R) : (2³)² = 2⁵ au lieu de (2³)² = 2⁶
- **Diviser les exposants d'un quotient** (`pow_quotient_divide_exp`, E) : 2⁶ ÷ 2² = 2³ au lieu de 2⁶ ÷ 2² = 2⁴
- **Règle du produit utilisée pour une somme** (`pow_sum_add_exp`, E) : 2³ + 2³ = 2⁶ au lieu de 2³ + 2³ = 8 + 8 = 16 = 2⁴
- **Compter les chiffres au lieu des zéros** (`pow_ten_count_digits`, E) : 1 000 = 10⁴ au lieu de 1 000 = 10³
- **Exposant positif pour un nombre plus petit que 1** (`exp_sign_small_number`, E) : 0,001 = 10³ au lieu de 0,001 = 10⁻³
- **Compter les zéros au lieu des rangs** (`sci_count_zeros`, E) : 34 000 = 3,4 × 10³ au lieu de 34 000 = 3,4 × 10⁴
- **Premier nombre hors de 1 à 10** (`sci_mantissa_range`, P) : 34 000 = 34 × 10³ en notation scientifique au lieu de 3,4 × 10⁴
