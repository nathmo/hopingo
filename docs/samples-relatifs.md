# Exemples de questions — Nombres relatifs

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Les nombres relatifs (`rel-read`, 9H)

_Sous zéro : températures, droite graduée, opposé._

### Niveau 1

```
Place −3 sur la droite.
  (droite -5 → 5, graduée en 1es) → -3

Place 4 sur la droite.
  (droite -5 → 5, graduée en 1es) → 4

Place −3 sur la droite.
  (droite -5 → 5, graduée en 1es) → -3

```

### Niveau 2

```
Quel nombre est repéré par le point ?
  → -4   pièges attendus : 4 [read_neg_as_pos]
  (point à -4/1 sur -6 → 6)
  pièges : read_neg_as_pos

Quel nombre est repéré par le point ?
  → 3
  (point à 3/1 sur -6 → 6)

Quel nombre est repéré par le point ?
  → -6   pièges attendus : 6 [read_neg_as_pos]
  (point à -6/1 sur -6 → 6)
  pièges : read_neg_as_pos

```

### Niveau 3

```
Il fait −3 °C. La température baisse de 4 °C. Quelle température fait-il ensuite ?
  → -7
  pièges : minus_minus_positive, add_ignore_signs

Il fait 1 °C. La température baisse de 6 °C. Quelle température fait-il ensuite ?
  → -5
  pièges : reverse_subtraction

Il fait −6 °C. La température monte de 7 °C. Quelle température fait-il ensuite ?
  → 1
  pièges : add_ignore_signs, add_sizes_keep_minus, sign_of_first

```

### Niveau 4

```
Place 1/2 sur la droite.
  (droite -2 → 2, graduée en 2es) → 1/2

Place 5/4 sur la droite.
  (droite -2 → 2, graduée en 4es) → 5/4

Place −3/2 sur la droite.
  (droite -2 → 2, graduée en 2es) → -3/2

```

### Niveau 5

```
Quel nombre est repéré par le point ?
  → -7/4   pièges attendus : -5/4 [neg_line_direction], 7/4 [read_neg_as_pos]
  (point à -7/4 sur -3 → 1)
  pièges : neg_line_direction, read_neg_as_pos

Quel nombre est repéré par le point ?
  → -4/3   pièges attendus : -5/3 [neg_line_direction], 4/3 [read_neg_as_pos]
  (point à -4/3 sur -3 → 1)
  pièges : neg_line_direction, read_neg_as_pos

Quel nombre est repéré par le point ?
  → -5/2   pièges attendus : 5/2 [read_neg_as_pos]
  (point à -5/2 sur -3 → 1)
  pièges : read_neg_as_pos

```

## Comparer des relatifs (`rel-compare`, 9H)

_Le plus à gauche sur la droite est le plus petit._

### Niveau 1

```
Compare : −3 ? 2
  ✔ <   · =   · > [compare_neg_digits]
  pièges : compare_neg_digits

Compare : 6 ? −7
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

Compare : 0 ? −3
  · < [zero_smallest]   · =   ✔ >
  pièges : zero_smallest

```

### Niveau 2

```
Compare : −2 ? −10
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

Compare : −11 ? −12
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

Compare : −14 ? −2
  ✔ <   · =   · > [compare_neg_digits]
  pièges : compare_neg_digits

```

### Niveau 3

```
Compare : −5,4 ? −5,94
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

Compare : −0,1 ? −0,36
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

Compare : −3,08 ? −3,9
  · < [compare_neg_digits]   · =   ✔ >
  pièges : compare_neg_digits

```

### Niveau 4

```
Quel est le plus petit nombre ?
  · 1 [compare_neg_digits]   · −2   ✔ −15   · 7
  pièges : compare_neg_digits

Quel est le plus petit nombre ?
  · 0 [zero_smallest]   ✔ −11   · 7   · −4
  pièges : zero_smallest

Quel est le plus petit nombre ?
  ✔ −13   · −2   · 11   · 0 [zero_smallest]
  pièges : zero_smallest

```

### Niveau 5

```
Quel est le plus grand nombre ?
  ✔ −0,7   · −3,3 [compare_neg_digits]   · −2,6   · −1,8
  pièges : compare_neg_digits

Quel est le plus grand nombre ?
  ✔ −0,6   · −5   · −2,9   · −5,5 [compare_neg_digits]
  pièges : compare_neg_digits

Quel est le plus grand nombre ?
  ✔ −1,4   · −2,5   · −4,2   · −4,3 [compare_neg_digits]
  pièges : compare_neg_digits

```

## Additionner des relatifs (`rel-add`, 9H)

_Avancer, reculer : les signes contraires se compensent._

### Niveau 1

```
Calcule.
  −6 + 2   [guided, irréductible] → -4
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule.
  7 + (−3)   [guided, irréductible] → 4
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule.
  6 + (−2)   [guided, irréductible] → 4
  pièges : add_ignore_signs, add_sizes_keep_minus

```

### Niveau 2

```
Calcule −3+(−12).
  → -15
  pièges : neg_plus_neg_positive

Calcule 10+(−7).
  → 3
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule −8+(−11).
  → -19
  pièges : neg_plus_neg_positive

```

### Niveau 3

```
Un ascenseur est à l'étage −9 (sous-sol). Il monte de 6 étages. À quel étage arrive-t-il ?
  → -3
  pièges : add_ignore_signs, add_sizes_keep_minus

Un ascenseur est à l'étage −1 (sous-sol). Il monte de 20 étages. À quel étage arrive-t-il ?
  → 19
  pièges : add_ignore_signs, add_sizes_keep_minus, sign_of_first

Un ascenseur est à l'étage −12 (sous-sol). Il monte de 4 étages. À quel étage arrive-t-il ?
  → -8
  pièges : add_ignore_signs, add_sizes_keep_minus

```

### Niveau 4

```
Calcule.
  −6 + (−3) + (−2)   [free, irréductible] → -11
  pièges : neg_plus_neg_positive

Calcule.
  −3 + 6 + (−3)   [free, irréductible] → 0
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule.
  −5 + 12 + (−5)   [free, irréductible] → 2
  pièges : add_ignore_signs, add_sizes_keep_minus

```

### Niveau 5

```
Calcule −3,7+3,6.
  → -0,1 (decimal)
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule 1,4+(−4,2).
  → -2,8 (decimal)
  pièges : add_ignore_signs, add_sizes_keep_minus, sign_of_first

Calcule −0,8+(−0,3).
  → -1,1 (decimal)
  pièges : neg_plus_neg_positive

```

## Soustraire des relatifs (`rel-sub`, 9H)

_Soustraire, c'est ajouter l'opposé._

### Niveau 1

```
Calcule.
  −2 − 6   [guided, irréductible] → -8
  pièges : minus_minus_positive, add_ignore_signs

Calcule.
  −4 − (−9)   [guided, irréductible] → 5
  pièges : sub_neg_subtracts, add_ignore_signs

Calcule.
  −6 − 8   [guided, irréductible] → -14
  pièges : minus_minus_positive, add_ignore_signs

```

### Niveau 2

```
Calcule −1−(−8).
  → 7
  pièges : sub_neg_subtracts, add_ignore_signs

Calcule −7−(−6).
  → -1
  pièges : sub_neg_subtracts, add_ignore_signs

Combien vaut 9−10 ?
  · 0   · 1 [reverse_subtraction]   · 2   ✔ −1
  pièges : reverse_subtraction

```

### Niveau 3

```
À midi, il fait 15 °C ; la nuit, il faisait −10 °C. Quel est l'écart entre ces deux températures ?
  → 25
  pièges : sub_neg_subtracts

À midi, il fait 13 °C ; la nuit, il faisait −8 °C. Quel est l'écart entre ces deux températures ?
  → 21
  pièges : sub_neg_subtracts

À midi, il fait 6 °C ; la nuit, il faisait −8 °C. Quel est l'écart entre ces deux températures ?
  → 14
  pièges : sub_neg_subtracts

```

### Niveau 4

```
Calcule.
  −1 − 9 − (−4)   [free, irréductible] → -6
  pièges : sub_neg_subtracts, add_ignore_signs, minus_minus_positive

Calcule.
  11 − 4 − 9   [free, irréductible] → -2
  pièges : reverse_subtraction

Calcule.
  −9 − (−1) − (−10)   [free, irréductible] → 2
  pièges : sub_neg_subtracts, add_ignore_signs

```

### Niveau 5

```
Calcule 4,4−5,3.
  → -0,9 (decimal)
  pièges : reverse_subtraction

Calcule −4,3−(−1,7).
  → -2,6 (decimal)
  pièges : sub_neg_subtracts, add_ignore_signs

Calcule −0,3−(−2,7).
  → 2,4 (decimal)
  pièges : sub_neg_subtracts, add_ignore_signs

```

## Sommes de relatifs (`rel-chain`, 9H)

_Plusieurs termes, et le − devant une parenthèse._

### Niveau 1

```
Calcule.
  1 − 8 + 5   [guided, irréductible] → -2
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule.
  −1 + 4 + 2   [guided, irréductible] → 5
  pièges : add_ignore_signs, add_sizes_keep_minus, sign_of_first

Calcule.
  −4 − 6 + (−1)   [guided, irréductible] → -11
  pièges : neg_plus_neg_positive, minus_minus_positive, add_ignore_signs

```

### Niveau 2

```
Calcule.
  −9 − (−11) + 2 − (−5)   [free, irréductible] → 9
  pièges : sub_neg_subtracts, add_ignore_signs

Calcule.
  −7 − 2 − 8 − 10   [free, irréductible] → -27
  pièges : minus_minus_positive, add_ignore_signs

Calcule.
  1 + (−2) + (−9) − 12   [free, irréductible] → -22
  pièges : minus_minus_positive, add_ignore_signs, add_sizes_keep_minus, sign_of_first

```

### Niveau 3

```
Calcule.
  −12 − (4 + 4)   [free, irréductible] → -20
  pièges : minus_before_parens, minus_minus_positive, add_ignore_signs

Calcule.
  11 − (5 − 2)   [free, irréductible] → 8
  pièges : minus_before_parens

Calcule.
  14 − (3 − 5)   [free, irréductible] → 16
  pièges : minus_before_parens, sub_neg_subtracts

```

### Niveau 4

```
Calcule.
  −(9 − 9) + (1 − 8)   [free, irréductible] → -7
  pièges : add_ignore_signs

Calcule.
  1 − (5 − 10) − (7 + 5)   [free, irréductible] → -6
  pièges : minus_before_parens, reverse_subtraction, add_ignore_signs, add_sizes_keep_minus

Calcule.
  −(5 − 12) + (9 − 7)   [free, irréductible] → 9
  pièges : reverse_subtraction

```

### Niveau 5

```
Calcule de tête : 4−6−14+8−14
  → -22
  pièges : minus_minus_positive, add_ignore_signs, add_sizes_keep_minus

Calcule de tête : 6+(−15)+(−10)−11+14
  → -16
  pièges : add_ignore_signs, add_sizes_keep_minus, sign_of_first

Calcule de tête : 1+(−8)−7+11−(−3)
  → 0
  pièges : sub_neg_subtracts, add_ignore_signs, add_sizes_keep_minus

```

## Multiplier et diviser (`rel-mul`, 10H)

_La règle des signes._

### Niveau 1

```
Calcule.
  −8 × (−7)   [guided, irréductible] → 56
  pièges : mul_neg_neg_negative

Calcule.
  −2 × 6   [guided, irréductible] → -12
  pièges : mul_sign_dropped

Calcule.
  −8 × (−9)   [guided, irréductible] → 72
  pièges : mul_neg_neg_negative

```

### Niveau 2

```
Combien vaut −6×5 ?
  ✔ −30   · −29   · 30 [mul_sign_dropped]   · −28
  pièges : mul_sign_dropped

Combien vaut 10×(−4) ?
  · 40 [mul_sign_dropped]   · −38   ✔ −40   · −39
  pièges : mul_sign_dropped

Calcule −6×(−6).
  → 36
  pièges : mul_neg_neg_negative

```

### Niveau 3

```
Calcule −14÷2.
  → -7
  pièges : mul_sign_dropped

Calcule −56÷8.
  → -7
  pièges : mul_sign_dropped

Calcule 72÷(−8).
  → -9
  pièges : mul_sign_dropped

```

### Niveau 4

```
Calcule.
  −3 × (−4) × 6   [free, irréductible] → 72
  pièges : mul_neg_neg_negative

Sans calculer : quel est le signe de −2×(−6)×3×4 ?
  ✔ positif   · négatif [product_sign_count]
  pièges : product_sign_count

Calcule.
  4 × (−5) × (−5)   [free, irréductible] → 100
  pièges : mul_neg_neg_negative

```

### Niveau 5

```
Complète : −1 × ? = −7
  → 7   pièges attendus : -7 [mul_sign_dropped]
  pièges : mul_sign_dropped

Complète : −6 × ? = 42
  → -7   pièges attendus : 7 [mul_sign_dropped]
  pièges : mul_sign_dropped

Complète : −6 × ? = −30
  → 5   pièges attendus : -5 [mul_sign_dropped]
  pièges : mul_sign_dropped

```

## Priorités avec des relatifs (`rel-multistep`, 10H)

_Parenthèses, puis × et ÷, puis + et −, avec les signes._

### Niveau 1

```
Calcule.
  −7 + 3 × 2   [guided, irréductible] → -1
  pièges : priority_left_to_right, add_ignore_signs, add_sizes_keep_minus, mul_sign_dropped

Calcule.
  −6 × 8 + 5   [guided, irréductible] → -43
  pièges : add_ignore_signs, add_sizes_keep_minus

Calcule.
  9 + 2 × (−4)   [guided, irréductible] → 1
  pièges : priority_left_to_right, add_ignore_signs, add_sizes_keep_minus, mul_sign_dropped

```

### Niveau 2

```
Calcule.
  (−3 + 4) × 5   [guided, irréductible] → 5
  pièges : ignore_parentheses, add_ignore_signs, add_sizes_keep_minus, sign_of_first

Calcule.
  (7 + (−1)) × (−6)   [guided, irréductible] → -36
  pièges : ignore_parentheses, mul_sign_dropped, add_ignore_signs, add_sizes_keep_minus, mul_neg_neg_negative

Calcule.
  −6 × (7 − (−8))   [guided, irréductible] → -90
  pièges : ignore_parentheses, mul_sign_dropped, sub_neg_subtracts, add_ignore_signs

```

### Niveau 3

```
Calcule.
  9 − (−5) × (−1)   [tap, irréductible] → 4
  pièges : priority_left_to_right, mul_neg_neg_negative, sub_neg_subtracts

Calcule.
  6 + (−3) × (−6) − 5   [tap, irréductible] → 19
  pièges : priority_left_to_right, mul_neg_neg_negative, minus_minus_positive, add_ignore_signs, add_sizes_keep_minus

Calcule.
  −5 × (−9) + 7 × (−3)   [tap, irréductible] → 24
  pièges : priority_left_to_right, add_ignore_signs, add_sizes_keep_minus, mul_sign_dropped, mul_neg_neg_negative

```

### Niveau 4

```
Calcule.
  −5 − (−9 + 3) × (−8)   [free, irréductible] → -53
  pièges : priority_left_to_right, ignore_parentheses, minus_minus_positive, add_ignore_signs, mul_neg_neg_negative, add_sizes_keep_minus, mul_sign_dropped, sub_neg_subtracts, sign_of_first

Calcule.
  −(5 + 3) × 6   [free, irréductible] → -48
  pièges : mul_sign_dropped

Calcule.
  (4 − (−9)) × (4 + (−6))   [free, irréductible] → -26
  pièges : ignore_parentheses, mul_sign_dropped, sub_neg_subtracts, add_ignore_signs, add_sizes_keep_minus

```

### Niveau 5

```
Calcule.
  (4 − 8) ÷ (−4) + 2 × 8   [free, irréductible] → 17
  pièges : priority_left_to_right, ignore_parentheses, mul_neg_neg_negative, sub_neg_subtracts

Calcule.
  (−9 − 1) ÷ (−1) + (−1) × 5   [free, irréductible] → 5
  pièges : priority_left_to_right, ignore_parentheses, add_sizes_keep_minus, add_ignore_signs, neg_plus_neg_positive, mul_sign_dropped

Calcule.
  4 × 2 − 8 × (6 + (−9))   [free, irréductible] → 32
  pièges : priority_left_to_right, ignore_parentheses, sub_neg_subtracts, add_ignore_signs, add_sizes_keep_minus, neg_plus_neg_positive, reverse_subtraction

```

## Fractions relatives (`rel-frac`, 10H)

_Les règles des fractions et des signes ensemble._

### Niveau 1

```
Calcule.
  1/9 − 10/9   [guided] → -1
  pièges : reverse_subtraction

Calcule.
  5/6 − 11/6   [guided] → -1
  pièges : reverse_subtraction

Calcule.
  8/9 − 17/9   [guided] → -1
  pièges : reverse_subtraction

```

### Niveau 2

```
Calcule et donne le résultat sous forme irréductible.
  2/5 − 2/3   [free, irréductible] → -4/15
  pièges : sub_across, reverse_subtraction

Calcule et donne le résultat sous forme irréductible.
  1/2 − 2/3   [free, irréductible] → -1/6
  pièges : sub_across, ignore_denominators, reverse_subtraction

Calcule et donne le résultat sous forme irréductible.
  2/5 − 3/4   [free, irréductible] → -7/20
  pièges : sub_across, ignore_denominators, forget_amplify, reverse_subtraction

```

### Niveau 3

```
Calcule et donne le résultat sous forme irréductible.
  −2/3 ÷ 2/9   [free, irréductible] → -3
  pièges : mult_across_division, invert_first, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  3/4 × (−7/9)   [free, irréductible] → -7/12
  pièges : keep_common_denominator_mult, mul_sign_dropped

Calcule et donne le résultat sous forme irréductible.
  −1/2 ÷ (−1/2)   [free, irréductible] → 1
  pièges : mult_across_division, invert_first, mul_neg_neg_negative

```

### Niveau 4

```
Calcule et donne le résultat sous forme irréductible.
  1/2 − 1/3 ÷ 1/5   [tap, irréductible] → -7/6
  pièges : priority_left_to_right, sub_across, ignore_denominators, forget_amplify, reverse_subtraction, mult_across_division, invert_first

Calcule et donne le résultat sous forme irréductible.
  5/6 − 1/4 ÷ 1/2   [tap, irréductible] → 1/3
  pièges : priority_left_to_right, ignore_denominators, sub_across, forget_amplify, mult_across_division, invert_first

Calcule et donne le résultat sous forme irréductible.
  2/3 × (−3/4) − 4/5   [tap, irréductible] → -13/10
  pièges : sub_across, ignore_denominators, forget_amplify, minus_minus_positive, add_ignore_signs, keep_common_denominator_mult

```

### Niveau 5

```
Calcule et donne le résultat sous forme irréductible.
  2/3 − (−1/6 + 2/3)   [free, irréductible] → 1/6
  pièges : minus_before_parens, mult_rule_for_addition, sign_of_first, add_across, sub_across, ignore_denominators, forget_amplify, add_ignore_signs

Calcule et donne le résultat sous forme irréductible.
  (1/2 + 1/6) ÷ (−2/3)   [free, irréductible] → -1
  pièges : ignore_parentheses, mult_rule_for_addition, mult_across_division, invert_first, mul_sign_dropped, add_across, ignore_denominators, forget_amplify, add_ignore_signs, add_sizes_keep_minus

Calcule et donne le résultat sous forme irréductible.
  −1/3 − (−5/6 + 1/4)   [free, irréductible] → 1/4
  pièges : minus_before_parens, ignore_denominators, forget_amplify, sub_neg_subtracts, add_ignore_signs, sub_across, add_across, mult_rule_for_addition

```

## Pièges de cette unité

- **Deux négatifs donnent un positif (en addition)** (`neg_plus_neg_positive`, R) : −3 + (−4) = 7 au lieu de −3 + (−4) = −7
- **Les deux signes − s'annulent (en soustraction)** (`minus_minus_positive`, R) : −3 − 4 = 7 au lieu de −3 − 4 = −7
- **Soustraire un négatif comme un positif** (`sub_neg_subtracts`, R) : 5 − (−3) = 2 au lieu de 5 − (−3) = 8
- **Oublier les signes** (`add_ignore_signs`, R) : −2 + 5 = 7 au lieu de −2 + 5 = 3
- **Additionner les distances malgré des signes contraires** (`add_sizes_keep_minus`, P) : −5 + 7 = −12 au lieu de −5 + 7 = 2
- **Prendre le signe du premier nombre** (`sign_of_first`, E) : −3 + 8 = −5 au lieu de −3 + 8 = 5
- **Échanger les nombres pour éviter un négatif** (`reverse_subtraction`, R) : 3 − 5 = 2 au lieu de 3 − 5 = −2
- **Négatif fois négatif donne négatif** (`mul_neg_neg_negative`, R) : −3 × (−4) = −12 au lieu de −3 × (−4) = 12
- **Oublier le signe d'un produit** (`mul_sign_dropped`, R) : −2 × 5 = 10 au lieu de −2 × 5 = −10
- **Mal compter les facteurs négatifs** (`product_sign_count`, E) : (−2) × 3 × (−1) × (−5) est positif au lieu de négatif : 3 facteurs négatifs
- **Le − devant une parenthèse** (`minus_before_parens`, P) : 10 − (3 + 2) = 10 − 3 + 2 au lieu de 10 − (3 + 2) = 10 − 3 − 2
- **Comparer les négatifs sans leur signe** (`compare_neg_digits`, R) : −7 > −3 car 7 > 3 au lieu de −7 < −3
- **Zéro est le plus petit nombre** (`zero_smallest`, R) : 0 < −4 au lieu de −4 < 0
- **Oublier le signe à gauche de zéro** (`read_neg_as_pos`, E) : point 3 graduations à gauche de 0 → 3 au lieu de −3
- **Compter dans le mauvais sens sous zéro** (`neg_line_direction`, E) : point à 1/4 après −1 → −7/4 au lieu de −5/4
- **Confondre opposé et inverse** (`opposite_inverse`, E) : l'opposé de 5 est 1/5 au lieu de l'opposé de 5 est −5
