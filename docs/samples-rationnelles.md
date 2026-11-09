# Exemples de questions — Fractions rationnelles

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Valeurs interdites (`rat-domain`, 12H)

_Le dénominateur ne peut pas valoir 0._

### Niveau 1

```
Pour quelles valeurs de x l'expression x+4/x−1 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1
  pièges : forbidden_numerator, zero_product_sign

Pour quelles valeurs de x l'expression x−2/x−2 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2
  pièges : forbidden_numerator, zero_product_sign

Pour quelles valeurs de x l'expression x−3/x−2 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2
  pièges : forbidden_numerator, zero_product_sign

```

### Niveau 2

```
Pour quelles valeurs de x l'expression x−2/x−5 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=5
  pièges : forbidden_numerator, zero_product_sign

Pour quelles valeurs de x l'expression x+1/x+4 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4
  pièges : forbidden_numerator, zero_product_sign

Pour quelles valeurs de x l'expression x−5/x+6 n'est-elle pas définie ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6
  pièges : forbidden_numerator, zero_product_sign

```

### Niveau 3

```
Valeurs interdites de x−6/x^2−1 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=1
  pièges : forbidden_numerator

Valeurs interdites de x−6/x^2−9 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=3
  pièges : forbidden_numerator

Valeurs interdites de x+4/x^2−16 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4;x=4
  pièges : forbidden_numerator

```

### Niveau 4

```
Valeurs interdites de x−4/x^2−36 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=6
  pièges : forbidden_numerator

Valeurs interdites de x+4/x^2−16 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4;x=4
  pièges : forbidden_numerator

Valeurs interdites de x−1/x^2−4 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2;x=2
  pièges : forbidden_numerator

```

### Niveau 5

```
Valeurs interdites de x−6/x^2−36 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-6;x=6
  pièges : forbidden_numerator

Valeurs interdites de x+1/x^2−1 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1;x=1
  pièges : forbidden_numerator

Valeurs interdites de x+2/x^2−9 ? Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-3;x=3
  pièges : forbidden_numerator

```

## Simplifier une fraction rationnelle (`rat-simplify`, 12H)

_Factoriser, puis simplifier des facteurs._

### Niveau 1

```
Simplifie : 3x+12/3
  → x+4 (reduced)
  pièges : cancel_terms

Simplifie : 4x−16/4
  → x-4 (reduced)
  pièges : cancel_terms

Simplifie : 3x−18/3
  → x-6 (reduced)
  pièges : cancel_terms

```

### Niveau 2

```
Simplifie : 5x+15/5
  → x+3 (reduced)
  pièges : cancel_terms

Simplifie : 2x+14/2
  → x+7 (reduced)
  pièges : cancel_terms

Simplifie : 6x−30/6
  → x-5 (reduced)
  pièges : cancel_terms

```

### Niveau 3

```
Simplifie : x^2−25/x+5 (x ≠ −5)
  → x-5 (reduced)
  pièges : identity_sign_square, cancel_terms

Simplifie : x^2−4/x+2 (x ≠ −2)
  → x-2 (reduced)
  pièges : identity_sign_square, cancel_terms

Simplifie : x^2−1/x−1 (x ≠ 1)
  → x+1 (reduced)
  pièges : identity_sign_square, cancel_terms

```

### Niveau 4

```
Simplifie : x^2−25/x+5 (x ≠ −5)
  → x-5 (reduced)
  pièges : fac_trinomial_signs

Simplifie : x^2+7x+12/x+3 (x ≠ −3)
  → x+4 (reduced)
  pièges : fac_trinomial_signs

Simplifie : x^2−9x+20/x−4 (x ≠ 4)
  → x-5 (reduced)
  pièges : fac_trinomial_signs

```

### Niveau 5

```
Simplifie : x^2−1/x−1 (x ≠ 1)
  → x+1 (reduced)
  pièges : fac_trinomial_signs

Simplifie : x^2−x−2/x+1 (x ≠ −1)
  → x-2 (reduced)
  pièges : fac_trinomial_signs

Simplifie : x^2−5x−6/x−6 (x ≠ 6)
  → x+1 (reduced)
  pièges : fac_trinomial_signs

```

## Opérations sur les fractions rationnelles (`rat-operations`, 12H)

_Mêmes règles qu'avec les nombres._

### Niveau 1

```
Calcule et simplifie : x/x−2×x−2/4
  → x/4

Calcule et simplifie : x/x−2×x−2/5
  → x/5

Calcule et simplifie : x/x−4×x−4/2
  → x/2

```

### Niveau 2

```
Calcule et simplifie : x/x+5×x+5/4
  → x/4

Calcule et simplifie : x/x+2×x+2/3
  → x/3

Calcule et simplifie : x/x−4×x−4/3
  → x/3

```

### Niveau 3

```
Écris en une seule fraction : 1/x−3+1/x+1
  → (2x-2)/((x-3)(x+1))
  pièges : add_across

Écris en une seule fraction : 1/x+4+1/x−2
  → (2x+2)/((x+4)(x-2))
  pièges : add_across

Écris en une seule fraction : 1/x+3+1/x−1
  → (2x+2)/((x+3)(x-1))
  pièges : add_across

```

### Niveau 4

```
Écris en une seule fraction : 1/x−4+1/x+4
  → (2x)/((x-4)(x+4))
  pièges : add_across

Écris en une seule fraction : 1/x−1+1/x−5
  → (2x-6)/((x-1)(x-5))
  pièges : add_across

Écris en une seule fraction : 1/x+3+1/x+1
  → (2x+4)/((x+3)(x+1))
  pièges : add_across

```

### Niveau 5

```
Écris en une seule fraction : 1/x−3+1/x+1
  → (2x-2)/((x-3)(x+1))
  pièges : add_across

Écris en une seule fraction : 1/x−3+1/x−5
  → (2x-8)/((x-3)(x-5))
  pièges : add_across

Écris en une seule fraction : 1/x−2+1/x−5
  → (2x-7)/((x-2)(x-5))
  pièges : add_across

```

## Équations rationnelles (`rat-equation`, 12H)

_Multiplier par les dénominateurs, puis vérifier._

### Niveau 1

```
Résous 4/x+5=4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4

Résous 2/x−4=1. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=6

Résous 3/x−2=−3. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1

```

### Niveau 2

```
Résous 4/x−1=−2. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1

Résous 5/x−2=−5/3. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1

Résous 4/x+1=−4. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2

```

### Niveau 3

```
Résous x+8/x=6. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=4

Résous x+6/x=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=3

Résous x+10/x=7. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=5

```

### Niveau 4

```
Résous x+6/x=5. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=3

Résous x+10/x=7. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=2;x=5

Résous x+2/x=3. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=1;x=2

```

### Niveau 5

```
Résous x^2−1/x−1=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-1
  pièges : forbidden_value_kept

Résous x^2−16/x−4=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-4
  pièges : forbidden_value_kept

Résous x^2−4/x−2=0. Sépare les solutions par « ; ». Écris « aucune » s'il n'y en a pas.
  → x=-2
  pièges : forbidden_value_kept

```

## Pièges de cette unité

- **Valeur interdite cherchée au numérateur** (`forbidden_numerator`, E) : (x + 1)/(x − 2) : x ≠ −1 au lieu de x ≠ 2
- **Barrer des termes** (`cancel_terms`, R) : (x + 6)/3 = x + 2 … ou (x + 3)/3 = x au lieu de (2x + 6)/2 = x + 3
- **Garder une valeur interdite** (`forbidden_value_kept`, R) : (x² − 4)/(x − 2) = 0 → x = 2 ou −2 au lieu de x = 2 est interdit : x = −2
