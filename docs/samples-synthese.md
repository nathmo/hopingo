# Exemples de questions — Synthèse : paramètres

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Équations du 1er degré à paramètres (`param-linear`, 12H)

_Résoudre pour x avec des lettres._

### Niveau 1

```
Résous pour x, en supposant a ≠ 0 : ax+b=c. Écris x = …
  → x=(c-b)/a
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : ax=b. Écris x = …
  → x=b/a
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : ax+b=c. Écris x = …
  → x=(c-b)/a
  pièges : iso_var_both_sides, eq_move_no_sign

```

### Niveau 2

```
Résous pour x, en supposant a ≠ c : ax+b=cx. Écris x = …
  → x=b/(c-a)
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : ax+b=c. Écris x = …
  → x=(c-b)/a
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ c : ax+b=cx. Écris x = …
  → x=b/(c-a)
  pièges : iso_var_both_sides, eq_move_no_sign

```

### Niveau 3

```
Résous pour x, en supposant a ≠ c : ax+b=cx. Écris x = …
  → x=b/(c-a)
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : a(x−b)=c. Écris x = …
  → x=c/a+b
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : a(x−b)=c. Écris x = …
  → x=c/a+b
  pièges : iso_var_both_sides, eq_move_no_sign

```

### Niveau 4

```
Résous pour x, en supposant a ≠ 0 : a(x−b)=c. Écris x = …
  → x=c/a+b
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ 0 : a(x−b)=c. Écris x = …
  → x=c/a+b
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ c : ax+b=cx+d. Écris x = …
  → x=(d-b)/(a-c)
  pièges : iso_var_both_sides, eq_move_no_sign

```

### Niveau 5

```
Résous pour x, en supposant a ≠ c : ax+b=cx+d. Écris x = …
  → x=(d-b)/(a-c)
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ c : ax+b=cx+d. Écris x = …
  → x=(d-b)/(a-c)
  pièges : iso_var_both_sides, eq_move_no_sign

Résous pour x, en supposant a ≠ c : ax+b=cx+d. Écris x = …
  → x=(d-b)/(a-c)
  pièges : iso_var_both_sides, eq_move_no_sign

```

## Équations du 2e degré à paramètres (`param-quadratic`, 12H)

_Identités, facteurs, formule… avec des lettres._

### Niveau 1

```
Résous pour x : x^2=a^2. Sépare les solutions par « ; ».
  → x=a;x=-a

Résous pour x : x^2=a^2. Sépare les solutions par « ; ».
  → x=a;x=-a

Résous pour x : x^2=a^2. Sépare les solutions par « ; ».
  → x=a;x=-a

```

### Niveau 2

```
Résous pour x : x^2−2ax+a^2=1. Sépare les solutions par « ; ».
  → x=a-1;x=a+1

Résous pour x : x^2−2ax+a^2=1. Sépare les solutions par « ; ».
  → x=a-1;x=a+1

Résous pour x : x^2−2ax+a^2=1. Sépare les solutions par « ; ».
  → x=a-1;x=a+1

```

### Niveau 3

```
Résous pour x : (x−a)^2=b. Sépare les solutions par « ; ».
  → x=a-√b;x=a+√b

Résous pour x : (x−a)^2=b. Sépare les solutions par « ; ».
  → x=a-√b;x=a+√b

Résous pour x : (x−a)^2=b. Sépare les solutions par « ; ».
  → x=a-√b;x=a+√b

```

### Niveau 4

```
Résous pour x : x^2−(a+b)x+ab=0. Sépare les solutions par « ; ».
  → x=a;x=b

Résous pour x : x^2−(a+b)x+ab=0. Sépare les solutions par « ; ».
  → x=a;x=b

Résous pour x : x^2−(a+b)x+ab=0. Sépare les solutions par « ; ».
  → x=a;x=b

```

### Niveau 5

```
Résous pour x : ax^2+bx=0. Sépare les solutions par « ; ».
  → x=0;x=-b/a

Résous pour x : ax^2+bx=0. Sépare les solutions par « ; ».
  → x=0;x=-b/a

Résous pour x : ax^2+bx=0. Sépare les solutions par « ; ».
  → x=0;x=-b/a

```

## Le problème final (`param-final`, 12H)

_ax² + bx/(3cx) = (6x + 2)²._

### Niveau 1

```
Pour quelles valeurs l'équation ax^2+bx/3cx=(6x+2)^2 a-t-elle un sens ?
  ✔ x ≠ 0 et c ≠ 0   · x ≠ 0 seulement [forbidden_value_kept]   · Pour toutes les valeurs [forbidden_value_kept]   · a ≠ 0
  pièges : forbidden_value_kept

Pour quelles valeurs l'équation ax^2+bx/3cx=(6x+2)^2 a-t-elle un sens ?
  · Pour toutes les valeurs [forbidden_value_kept]   · a ≠ 0   · x ≠ 0 seulement [forbidden_value_kept]   ✔ x ≠ 0 et c ≠ 0
  pièges : forbidden_value_kept

Pour quelles valeurs l'équation ax^2+bx/3cx=(6x+2)^2 a-t-elle un sens ?
  · a ≠ 0   · Pour toutes les valeurs [forbidden_value_kept]   · x ≠ 0 seulement [forbidden_value_kept]   ✔ x ≠ 0 et c ≠ 0
  pièges : forbidden_value_kept

```

### Niveau 2

```
Simplifie bx/3cx (avec x ≠ 0, c ≠ 0).
  → b/(3c)
  pièges : cancel_terms

Simplifie bx/3cx (avec x ≠ 0, c ≠ 0).
  → b/(3c)
  pièges : cancel_terms

Simplifie bx/3cx (avec x ≠ 0, c ≠ 0).
  → b/(3c)
  pièges : cancel_terms

```

### Niveau 3

```
Développe (6x+2)^2.
  → 36x^2+24x+4 (reduced)
  pièges : pow_distribute_sum, identity_middle_term

Développe (6x+2)^2.
  → 36x^2+24x+4 (reduced)
  pièges : pow_distribute_sum, identity_middle_term

Développe (6x+2)^2.
  → 36x^2+24x+4 (reduced)
  pièges : pow_distribute_sum, identity_middle_term

```

### Niveau 4

```
Ramène ax^2+b/3c=36x^2+24x+4 à la forme … = 0, en regroupant selon les puissances de x.
  → (a-36)x^2-24x+b/(3c)-4=0

Ramène ax^2+b/3c=36x^2+24x+4 à la forme … = 0, en regroupant selon les puissances de x.
  → (a-36)x^2-24x+b/(3c)-4=0

Ramène ax^2+b/3c=36x^2+24x+4 à la forme … = 0, en regroupant selon les puissances de x.
  → (a-36)x^2-24x+b/(3c)-4=0

```

### Niveau 5

```
Le problème final : résous ax^2+bx/3cx=(6x+2)^2 pour x (on suppose a ≠ 36, c ≠ 0 et Δ > 0). Sépare les deux solutions par « ; ».
  → x=(24-√(576-4(a-36)(b/(3c)-4)))/(2(a-36));x=(24+√(576-4(a-36)(b/(3c)-4)))/(2(a-36))

Le problème final : résous ax^2+bx/3cx=(6x+2)^2 pour x (on suppose a ≠ 36, c ≠ 0 et Δ > 0). Sépare les deux solutions par « ; ».
  → x=(24-√(576-4(a-36)(b/(3c)-4)))/(2(a-36));x=(24+√(576-4(a-36)(b/(3c)-4)))/(2(a-36))

Le problème final : résous ax^2+bx/3cx=(6x+2)^2 pour x (on suppose a ≠ 36, c ≠ 0 et Δ > 0). Sépare les deux solutions par « ; ».
  → x=(24-√(576-4(a-36)(b/(3c)-4)))/(2(a-36));x=(24+√(576-4(a-36)(b/(3c)-4)))/(2(a-36))

```

## Pièges de cette unité

