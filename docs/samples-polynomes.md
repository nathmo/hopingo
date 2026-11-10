# Exemples de questions — Polynômes

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Identifier des coefficients (`g0-identify`, Gymnase)

_Deux polynômes égaux ont les mêmes coefficients._

### Niveau 1

```
Trouve a, b, c tels que (x − 1)(ax² + bx + c) = 2x³ − 2x² + 3x − 3 pour tout x.
  [guided]  ax³ + (b − a)x² + (c − b)x − c = 2x³ − 2x² + 3x − 3
    (Développé : ax³ + (b − a)x² + (c − b)x − c = 2x³ − 2x² + 3x − 3)
    = a = 2 ; b − a = −2 ; c − b = 3 ; −c = −3   ← Identifier les coefficients
    = a = 2 ; b = 0 ; c = 3   ← Résoudre
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 2 ; b − a = −2 ; c − b = 3 ; −c = −3 | a = 2 ; b = 0 ; c = 3

Trouve a, b, c tels que (x − 1)(ax² + bx + c) = x³ − x² − 2x + 2 pour tout x.
  [guided]  ax³ + (b − a)x² + (c − b)x − c = x³ − x² − 2x + 2
    (Développé : ax³ + (b − a)x² + (c − b)x − c = x³ − x² − 2x + 2)
    = a = 1 ; b − a = −1 ; c − b = −2 ; −c = 2   ← Identifier les coefficients
    = a = 1 ; b = 0 ; c = −2   ← Résoudre
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; b − a = −1 ; c − b = −2 ; −c = 2 | a = 1 ; b = 0 ; c = −2

Trouve a, b, c tels que (x − 3)(ax² + bx + c) = 3x³ − 9x² − 2x + 6 pour tout x.
  [guided]  ax³ + (b − 3a)x² + (c − 3b)x − 3c = 3x³ − 9x² − 2x + 6
    (Développé : ax³ + (b − 3a)x² + (c − 3b)x − 3c = 3x³ − 9x² − 2x + 6)
    = a = 3 ; b − 3a = −9 ; c − 3b = −2 ; −3c = 6   ← Identifier les coefficients
    = a = 3 ; b = 0 ; c = −2   ← Résoudre
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 3 ; b − 3a = −9 ; c − 3b = −2 ; −3c = 6 | a = 3 ; b = 0 ; c = −2

```

### Niveau 2

```
Trouve a, b, c tels que (x − 1)(ax² + bx + c) = 3x³ − 5x² − x + 3 pour tout x.
  [guided]  (x − 1)(ax² + bx + c) = 3x³ − 5x² − x + 3
    = ax³ + (b − a)x² + (c − b)x − c = 3x³ − 5x² − x + 3   ← Développer et ordonner
    = a = 3 ; b − a = −5 ; c − b = −1 ; −c = 3   ← Identifier les coefficients
    = a = 3 ; b = −2 ; c = −3   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 3 ; b − a = −5 ; c − b = −1 ; −c = 3 | a = 3 ; b = −2 ; c = −3

Trouve a, b, c tels que (x + 2)(ax² + bx + c) = x³ + 3x² − 2x − 8 pour tout x.
  [guided]  (x + 2)(ax² + bx + c) = x³ + 3x² − 2x − 8
    = ax³ + (2a + b)x² + (2b + c)x + 2c = x³ + 3x² − 2x − 8   ← Développer et ordonner
    = a = 1 ; 2a + b = 3 ; 2b + c = −2 ; 2c = −8   ← Identifier les coefficients
    = a = 1 ; b = 1 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; 2a + b = 3 ; 2b + c = −2 ; 2c = −8 | a = 1 ; b = 1 ; c = −4

Trouve a, b, c tels que (x + 3)(ax² + bx + c) = x³ + 3x² − 4x − 12 pour tout x.
  [guided]  (x + 3)(ax² + bx + c) = x³ + 3x² − 4x − 12
    = ax³ + (3a + b)x² + (3b + c)x + 3c = x³ + 3x² − 4x − 12   ← Développer et ordonner
    = a = 1 ; 3a + b = 3 ; 3b + c = −4 ; 3c = −12   ← Identifier les coefficients
    = a = 1 ; b = 0 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; 3a + b = 3 ; 3b + c = −4 ; 3c = −12 | a = 1 ; b = 0 ; c = −4

```

### Niveau 3

```
Trouve a, b, c tels que (x + 2)(ax² + bx + c) = x³ + 4x² + 7x + 6 pour tout x.
  [tap, suivre l'erreur, menu identify]  (x + 2)(ax² + bx + c) = x³ + 4x² + 7x + 6
    = ax³ + (2a + b)x² + (2b + c)x + 2c = x³ + 4x² + 7x + 6   ← Développer et ordonner
    = a = 1 ; 2a + b = 4 ; 2b + c = 7 ; 2c = 6   ← Identifier les coefficients
    = a = 1 ; b = 2 ; c = 3   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; 2a + b = 4 ; 2b + c = 7 ; 2c = 6 | a = 1 ; b = 2 ; c = 3

Trouve a, b, c tels que (x − 1)(ax² + bx + c) = x³ − 3x² − 2x + 4 pour tout x.
  [tap, suivre l'erreur, menu identify]  (x − 1)(ax² + bx + c) = x³ − 3x² − 2x + 4
    = ax³ + (b − a)x² + (c − b)x − c = x³ − 3x² − 2x + 4   ← Développer et ordonner
    = a = 1 ; b − a = −3 ; c − b = −2 ; −c = 4   ← Identifier les coefficients
    = a = 1 ; b = −2 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; b − a = −3 ; c − b = −2 ; −c = 4 | a = 1 ; b = −2 ; c = −4

Trouve a, b, c tels que (x − 3)(ax² + bx + c) = 3x³ − 5x² − 16x + 12 pour tout x.
  [tap, suivre l'erreur, menu identify]  (x − 3)(ax² + bx + c) = 3x³ − 5x² − 16x + 12
    = ax³ + (b − 3a)x² + (c − 3b)x − 3c = 3x³ − 5x² − 16x + 12   ← Développer et ordonner
    = a = 3 ; b − 3a = −5 ; c − 3b = −16 ; −3c = 12   ← Identifier les coefficients
    = a = 3 ; b = 4 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 3 ; b − 3a = −5 ; c − 3b = −16 ; −3c = 12 | a = 3 ; b = 4 ; c = −4

```

### Niveau 4

```
Trouve a, b, c tels que a(x − 2)² + b(x − 2) + c = x² − 8x + 8 pour tout x.
  [free, suivre l'erreur]  a(x − 2)² + b(x − 2) + c = x² − 8x + 8
    = ax² + (b − 4a)x + 4a − 2b + c = x² − 8x + 8   ← Développer et ordonner
    = a = 1 ; b − 4a = −8 ; 4a − 2b + c = 8   ← Identifier les coefficients
    = a = 1 ; b = −4 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; b − 4a = −8 ; 4a − 2b + c = 8 | a = 1 ; b = −4 ; c = −4

Trouve a, b, c tels que (x − 3)(ax² + bx + c) = 2x³ − 2x² − 16x + 12 pour tout x.
  [free, suivre l'erreur]  (x − 3)(ax² + bx + c) = 2x³ − 2x² − 16x + 12
    = ax³ + (b − 3a)x² + (c − 3b)x − 3c = 2x³ − 2x² − 16x + 12   ← Développer et ordonner
    = a = 2 ; b − 3a = −2 ; c − 3b = −16 ; −3c = 12   ← Identifier les coefficients
    = a = 2 ; b = 4 ; c = −4   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 2 ; b − 3a = −2 ; c − 3b = −16 ; −3c = 12 | a = 2 ; b = 4 ; c = −4

Trouve a, b, c tels que (x − 1)(ax² + bx + c) = x³ + 3x² − 3x − 1 pour tout x.
  [free, suivre l'erreur]  (x − 1)(ax² + bx + c) = x³ + 3x² − 3x − 1
    = ax³ + (b − a)x² + (c − b)x − c = x³ + 3x² − 3x − 1   ← Développer et ordonner
    = a = 1 ; b − a = 3 ; c − b = −3 ; −c = −1   ← Identifier les coefficients
    = a = 1 ; b = 4 ; c = 1   ← Résoudre le système
  aides : Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance. | a = 1 ; b − a = 3 ; c − b = −3 ; −c = −1 | a = 1 ; b = 4 ; c = 1

```

### Niveau 5

```
Trouve a, b, c, d tels que (x + 1)(ax³ + bx² + cx + d) = 2x⁴ + 3x³ − x² + 2 pour tout x.
  [free, sans aide]  (x + 1)(ax³ + bx² + cx + d) = 2x⁴ + 3x³ − x² + 2
    = ax⁴ + (a + b)x³ + (b + c)x² + (c + d)x + d = 2x⁴ + 3x³ − x² + 2   ← Développer et ordonner
    = a = 2 ; a + b = 3 ; b + c = −1 ; c + d = 0 ; d = 2   ← Identifier les coefficients
    = a = 2 ; b = 1 ; c = −2 ; d = 2   ← Résoudre le système

Trouve a, b, c, d tels que (x − 3)(ax³ + bx² + cx + d) = 2x⁴ − 3x³ − 7x² − 2x − 12 pour tout x.
  [free, sans aide]  (x − 3)(ax³ + bx² + cx + d) = 2x⁴ − 3x³ − 7x² − 2x − 12
    = ax⁴ + (b − 3a)x³ + (c − 3b)x² + (d − 3c)x − 3d = 2x⁴ − 3x³ − 7x² − 2x − 12   ← Développer et ordonner
    = a = 2 ; b − 3a = −3 ; c − 3b = −7 ; d − 3c = −2 ; −3d = −12   ← Identifier les coefficients
    = a = 2 ; b = 3 ; c = 2 ; d = 4   ← Résoudre le système

Trouve a, b, c, d tels que (x − 1)(ax³ + bx² + cx + d) = 2x⁴ − 2x³ − 2x² − 2x + 4 pour tout x.
  [free, sans aide]  (x − 1)(ax³ + bx² + cx + d) = 2x⁴ − 2x³ − 2x² − 2x + 4
    = ax⁴ + (b − a)x³ + (c − b)x² + (d − c)x − d = 2x⁴ − 2x³ − 2x² − 2x + 4   ← Développer et ordonner
    = a = 2 ; b − a = −2 ; c − b = −2 ; d − c = −2 ; −d = 4   ← Identifier les coefficients
    = a = 2 ; b = 0 ; c = −2 ; d = −4   ← Résoudre le système

```

### Variantes d'examen

```
a(x − 2)² + b(x − 2) + c = x² − x + 2 pour tout x. Que vaut c ?
  → 4
  [examen coef]

Pour quelles valeurs a-t-on (x − 1)(ax² + bx + c) = x³ + 3x² − 7x + 3 pour tout x ?
  · a = 1, b = −4, c = 3   · a = 1, b = −3, c = 4   · a = 1, b = 2, c = −9   ✔ a = 1, b = 4, c = −3
  [examen mcq]

```

## Schéma de Horner : valeur et division par x − a (`g0-horner`, Gymnase)

_Descendre, multiplier par a, ajouter._

### Niveau 1

```
Divise P(x) = −2x⁴ + 7x² + 3x + 4 par x + 1 avec le schéma de Horner.
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = −1
    coefficients −2  0  7  3  4
    × a      ·  (2)  −2  (−5)  2
    b        (−2)  2  (5)  −2  (6)
  puis : Écris P(x) = (x + 1)·Q(x) + R avec les nombres du tableau.
      [free]  −2x⁴ + 7x² + 3x + 4
        = (x + 1)(−2x³ + 2x² + 5x − 2) + 6   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 1)(…) + 6 | (x + 1)(−2x³ + 2x² + 5x − 2) + 6
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = 3x³ + 7x² − 12x − 13 par x + 3 avec le schéma de Horner.
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = −3
    coefficients 3  7  −12  −13
    × a      ·  (−9)  6  (18)
    b        (3)  −2  (−6)  5
  puis : Écris P(x) = (x + 3)·Q(x) + R avec les nombres du tableau.
      [free]  3x³ + 7x² − 12x − 13
        = (x + 3)(3x² − 2x − 6) + 5   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 3)(…) + 5 | (x + 3)(3x² − 2x − 6) + 5
      pièges : g0_horner_sign, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = 3x⁴ − 13x³ + 13x² − 3x − 6 par x − 3 avec le schéma de Horner.
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = 3
    coefficients 3  −13  13  −3  −6
    × a      ·  (9)  −12  (3)  0
    b        (3)  −4  (1)  0  (−6)
  puis : Écris P(x) = (x − 3)·Q(x) + R avec les nombres du tableau.
      [free]  3x⁴ − 13x³ + 13x² − 3x − 6
        = (x − 3)(3x³ − 4x² + x) − 6   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x − 3)(…) − 6 | (x − 3)(3x³ − 4x² + x) − 6
      pièges : g0_horner_sign, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

```

### Niveau 2

```
Divise P(x) = x³ − 4x² par x − 1 avec le schéma de Horner.
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = 1
    coefficients (1)  (−4)  (0)  (0)
    × a      ·  1  −3  −3
    b        (1)  (−3)  (−3)  (−3)
  puis : Écris P(x) = (x − 1)·Q(x) + R avec les nombres du tableau.
      [free]  x³ − 4x²
        = (x − 1)(x² − 3x − 3) − 3   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x − 1)(…) − 3 | (x − 1)(x² − 3x − 3) − 3
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = −2x⁴ − x² + x + 5 par x − 1 avec le schéma de Horner.
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = 1
    coefficients (−2)  (0)  (−1)  (1)  (5)
    × a      ·  −2  −2  −3  −2
    b        (−2)  (−2)  (−3)  (−2)  (3)
  puis : Écris P(x) = (x − 1)·Q(x) + R avec les nombres du tableau.
      [free]  −2x⁴ − x² + x + 5
        = (x − 1)(−2x³ − 2x² − 3x − 2) + 3   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x − 1)(…) + 3 | (x − 1)(−2x³ − 2x² − 3x − 2) + 3
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = x³ − 9x − 14 par x + 2 avec le schéma de Horner.
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = −2
    coefficients (1)  (0)  (−9)  (−14)
    × a      ·  −2  4  10
    b        (1)  (−2)  (−5)  (−4)
  puis : Écris P(x) = (x + 2)·Q(x) + R avec les nombres du tableau.
      [free]  x³ − 9x − 14
        = (x + 2)(x² − 2x − 5) − 4   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 2)(…) − 4 | (x + 2)(x² − 2x − 5) − 4
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

```

### Niveau 3

```
Divise P(x) = 2x³ − 12x + 11 par x − 2 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = (2)
    coefficients (2)  (0)  (−12)  (11)
    × a      ·  (4)  (8)  (−8)
    b        (2)  (4)  (−4)  (3)
  puis : Écris P(x) = (x − 2)·Q(x) + R avec les nombres du tableau.
      [free]  2x³ − 12x + 11
        = (x − 2)(2x² + 4x − 4) + 3   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x − 2)(…) + 3 | (x − 2)(2x² + 4x − 4) + 3
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = 2x⁴ − 20x² − 10x − 8 par x + 3 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = (-3)
    coefficients (2)  (0)  (−20)  (−10)  (−8)
    × a      ·  (−6)  (18)  (6)  (12)
    b        (2)  (−6)  (−2)  (−4)  (4)
  puis : Écris P(x) = (x + 3)·Q(x) + R avec les nombres du tableau.
      [free]  2x⁴ − 20x² − 10x − 8
        = (x + 3)(2x³ − 6x² − 2x − 4) + 4   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 3)(…) + 4 | (x + 3)(2x³ − 6x² − 2x − 4) + 4
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = x⁴ + 6x³ + 11x² + 9x par x + 2 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = (-2)
    coefficients (1)  (6)  (11)  (9)  (0)
    × a      ·  (−2)  (−8)  (−6)  (−6)
    b        (1)  (4)  (3)  (3)  (−6)
  puis : Écris P(x) = (x + 2)·Q(x) + R avec les nombres du tableau.
      [free]  x⁴ + 6x³ + 11x² + 9x
        = (x + 2)(x³ + 4x² + 3x + 3) − 6   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 2)(…) − 6 | (x + 2)(x³ + 4x² + 3x + 3) − 6
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

```

### Niveau 4

```
Divise P(x) = −2x⁴ − x³ + 6x² + 2 par x + 2 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x⁴ | x³ | x² | x | 1
    a = (-2)
    coefficients (−2)  (−1)  (6)  (0)  (2)
    × a      ·  (4)  (−6)  (0)  (0)
    b        (−2)  (3)  (0)  (0)  (2)
  puis : Écris P(x) = (x + 2)·Q(x) + R avec les nombres du tableau.
      [free]  −2x⁴ − x³ + 6x² + 2
        = (x + 2)(−2x³ + 3x²) + 2   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 2)(…) + 2 | (x + 2)(−2x³ + 3x²) + 2
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = −2x⁵ − 3x⁴ + 4x³ − 4x + 3 par x + 2 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x⁵ | x⁴ | x³ | x² | x | 1
    a = (-2)
    coefficients (−2)  (−3)  (4)  (0)  (−4)  (3)
    × a      ·  (4)  (−2)  (−4)  (8)  (−8)
    b        (−2)  (1)  (2)  (−4)  (4)  (−5)
  puis : Écris P(x) = (x + 2)·Q(x) + R avec les nombres du tableau.
      [free]  −2x⁵ − 3x⁴ + 4x³ − 4x + 3
        = (x + 2)(−2x⁴ + x³ + 2x² − 4x + 4) − 5   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x + 2)(…) − 5 | (x + 2)(−2x⁴ + x³ + 2x² − 4x + 4) − 5
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = x³ − 5x + 12 par x − 1 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = (1)
    coefficients (1)  (0)  (−5)  (12)
    × a      ·  (1)  (1)  (−4)
    b        (1)  (1)  (−4)  (8)
  puis : Écris P(x) = (x − 1)·Q(x) + R avec les nombres du tableau.
      [free]  x³ − 5x + 12
        = (x − 1)(x² + x − 4) + 8   ← Lire Q et R
      aides : Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a). | (x − 1)(…) + 8 | (x − 1)(x² + x − 4) + 8
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

```

### Niveau 5

```
Divise P(x) = x⁵ + 2x⁴ + 2x³ − 2x + 18 par x + 2 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x⁵ | x⁴ | x³ | x² | x | 1
    a = (-2)
    coefficients (1)  (2)  (2)  (0)  (−2)  (18)
    × a      ·  (−2)  (0)  (−4)  (8)  (−12)
    b        (1)  (0)  (2)  (−4)  (6)  (6)
  puis : Écris P(x) = (x + 2)·Q(x) + R avec les nombres du tableau.
      [free, sans aide]  x⁵ + 2x⁴ + 2x³ − 2x + 18
        = (x + 2)(x⁴ + 2x² − 4x + 6) + 6   ← Lire Q et R
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = −x³ + 2x² + 9 par x − 3 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = (3)
    coefficients (−1)  (2)  (0)  (9)
    × a      ·  (−3)  (−3)  (−9)
    b        (−1)  (−1)  (−3)  (0)
  puis : Écris P(x) = (x − 3)·Q(x) + R avec les nombres du tableau.
      [free, sans aide]  −x³ + 2x² + 9
        = (x − 3)(−x² − x − 3) + 0   ← Lire Q et R
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

Divise P(x) = −3x³ + 8x² − 2x par x − 1 avec le schéma de Horner (choisis d'abord a).
  [tableau horner]  colonnes : x³ | x² | x | 1
    a = (1)
    coefficients (−3)  (8)  (−2)  (0)
    × a      ·  (−3)  (5)  (3)
    b        (−3)  (5)  (3)  (3)
  puis : Écris P(x) = (x − 1)·Q(x) + R avec les nombres du tableau.
      [free, sans aide]  −3x³ + 8x² − 2x
        = (x − 1)(−3x² + 5x + 3) + 3   ← Lire Q et R
      pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree, g0_div_subtract
  pièges : g0_horner_sign, g0_horner_zero, g0_horner_degree

```

### Variantes d'examen

```
On divise P(x) = x⁵ + 4x⁴ + 3x³ − 1 par x + 3. Quel est le coefficient de x dans le quotient Q ?
  → 0
  [examen coef]

Quel est le quotient Q et le reste R de la division de 3x⁴ + 3x³ − 18x² + 3 par x + 3 ?
  ✔ Q = 3x³ − 6x², R = 3   · Q = −6x³ + 3, R = 3   · Q = 3x³ + 12x² + 18x + 54, R = 165 [g0_horner_sign]   · Q = 3x² − 6x, R = 3 [g0_horner_zero]
  [examen mcq]
  pièges : g0_horner_sign, g0_horner_zero

```

## Division euclidienne (`g0-long-div`, Gymnase)

_A = BQ + R avec deg R < deg B._

### Niveau 1

```
Divise A = x⁴ − 2x³ − 10x − 7 par B = x² + 3. Écris chaque étape A = B·Q + R.
  [guided]  A = x⁴ − 2x³ − 10x − 7
    = A = B·(x²) + □   (trous : A = B·(x²) + (−2x³ − 3x² − 10x − 7))   ← Premier terme : x²
    = A = B·(x² − 2x) + □   (trous : A = B·(x² − 2x) + (−3x² − 4x − 7))   ← Terme suivant : −2x
    = A = B·(x² − 2x − 3) + □   (trous : A = B·(x² − 2x − 3) + (−4x + 2))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x². | A − (x²)·B = … | A = B·(x²) + (−2x³ − 3x² − 10x − 7)
  pièges : g0_div_subtract

Divise A = x³ + 7x² + 17x + 7 par B = x² + 3x + 2. Écris chaque étape A = B·Q + R.
  [guided]  A = x³ + 7x² + 17x + 7
    = A = B·(x) + □   (trous : A = B·(x) + (4x² + 15x + 7))   ← Premier terme : x
    = A = B·(x + 4) + □   (trous : A = B·(x + 4) + (3x − 1))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x. | A − (x)·B = … | A = B·(x) + (4x² + 15x + 7)
  pièges : g0_div_subtract

Divise A = 3x⁴ − 3x³ − 5x² + 9x par B = x² − 2. Écris chaque étape A = B·Q + R.
  [guided]  A = 3x⁴ − 3x³ − 5x² + 9x
    = A = B·(3x²) + □   (trous : A = B·(3x²) + (−3x³ + x² + 9x))   ← Premier terme : 3x²
    = A = B·(3x² − 3x) + □   (trous : A = B·(3x² − 3x) + (x² + 3x))   ← Terme suivant : −3x
    = A = B·(3x² − 3x + 1) + □   (trous : A = B·(3x² − 3x + 1) + (3x + 2))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, 3x². | A − (3x²)·B = … | A = B·(3x²) + (−3x³ + x² + 9x)
  pièges : g0_div_subtract

```

### Niveau 2

```
Divise A = x⁴ + 5x³ + 8x² + 6x − 1 par B = x² + x + 2. Écris chaque étape A = B·Q + R.
  [guided]  A = x⁴ + 5x³ + 8x² + 6x − 1
    = A = B·□ + (4x³ + 6x² + 6x − 1)   (trous : A = B·(x²) + (4x³ + 6x² + 6x − 1))   ← Premier terme : x²
    = A = B·□ + (2x² − 2x − 1)   (trous : A = B·(x² + 4x) + (2x² − 2x − 1))   ← Terme suivant : 4x
    = A = B·□ + (−4x − 5)   (trous : A = B·(x² + 4x + 2) + (−4x − 5))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x². | A − (x²)·B = … | A = B·(x²) + (4x³ + 6x² + 6x − 1)
  pièges : g0_div_subtract

Divise A = −3x⁴ − 5x³ + 12x² − x − 3 par B = x² + 2x − 3. Écris chaque étape A = B·Q + R.
  [guided]  A = −3x⁴ − 5x³ + 12x² − x − 3
    = A = B·□ + (x³ + 3x² − x − 3)   (trous : A = B·(−3x²) + (x³ + 3x² − x − 3))   ← Premier terme : −3x²
    = A = B·□ + (x² + 2x − 3)   (trous : A = B·(−3x² + x) + (x² + 2x − 3))   ← Terme suivant : x
    = A = B·□ + (0)   (trous : A = B·(−3x² + x + 1) + (0))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, −3x². | A − (−3x²)·B = … | A = B·(−3x²) + (x³ + 3x² − x − 3)
  pièges : g0_div_subtract

Divise A = x³ + 2x² + 5x + 1 par B = x² + 3x + 4. Écris chaque étape A = B·Q + R.
  [guided]  A = x³ + 2x² + 5x + 1
    = A = B·□ + (−x² + x + 1)   (trous : A = B·(x) + (−x² + x + 1))   ← Premier terme : x
    = A = B·□ + (4x + 5)   (trous : A = B·(x − 1) + (4x + 5))   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x. | A − (x)·B = … | A = B·(x) + (−x² + x + 1)
  pièges : g0_div_subtract

```

### Niveau 3

```
Divise A = 3x⁴ + 7x³ − 12x² − 7x + 8 par B = x² + 3x − 1. Écris chaque étape A = B·Q + R.
  [tap, suivre l'erreur, menu polydiv]  A = 3x⁴ + 7x³ − 12x² − 7x + 8
    = A = B·(3x²) + (−2x³ − 9x² − 7x + 8)   ← Premier terme : 3x²
    = A = B·(3x² − 2x) + (−3x² − 9x + 8)   ← Terme suivant : −2x
    = A = B·(3x² − 2x − 3) + (5)   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, 3x². | A − (3x²)·B = … | A = B·(3x²) + (−2x³ − 9x² − 7x + 8)
  pièges : g0_div_subtract

Divise A = 3x⁴ + x³ − 10x² + 10x − 11 par B = x² + x − 4. Écris chaque étape A = B·Q + R.
  [tap, suivre l'erreur, menu polydiv]  A = 3x⁴ + x³ − 10x² + 10x − 11
    = A = B·(3x²) + (−2x³ + 2x² + 10x − 11)   ← Premier terme : 3x²
    = A = B·(3x² − 2x) + (4x² + 2x − 11)   ← Terme suivant : −2x
    = A = B·(3x² − 2x + 4) + (−2x + 5)   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, 3x². | A − (3x²)·B = … | A = B·(3x²) + (−2x³ + 2x² + 10x − 11)
  pièges : g0_div_subtract

Divise A = x⁴ − x − 5 par B = x² − 3. Écris chaque étape A = B·Q + R.
  [tap, suivre l'erreur, menu polydiv]  A = x⁴ − x − 5
    = A = B·(x²) + (3x² − x − 5)   ← Premier terme : x²
    = A = B·(x² + 3) + (−x + 4)   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x². | A − (x²)·B = … | A = B·(x²) + (3x² − x − 5)
  pièges : g0_div_subtract

```

### Niveau 4

```
Divise A = x³ − 3x² + 4x − 1 par B = x² − 2x + 2. Écris chaque étape A = B·Q + R.
  [free, suivre l'erreur]  A = x³ − 3x² + 4x − 1
    = A = B·(x) + (−x² + 2x − 1)   ← Premier terme : x
    = A = B·(x − 1) + (1)   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, x. | A − (x)·B = … | A = B·(x) + (−x² + 2x − 1)
  pièges : g0_div_subtract

Divise A = 2x⁴ + 6x³ − 3x² − 9x − 1 par B = x² + x − 3. Écris chaque étape A = B·Q + R.
  [free, suivre l'erreur]  A = 2x⁴ + 6x³ − 3x² − 9x − 1
    = A = B·(2x²) + (4x³ + 3x² − 9x − 1)   ← Premier terme : 2x²
    = A = B·(2x² + 4x) + (−x² + 3x − 1)   ← Terme suivant : 4x
    = A = B·(2x² + 4x − 1) + (4x − 4)   ← deg R < deg B : fini
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, 2x². | A − (2x²)·B = … | A = B·(2x²) + (4x³ + 3x² − 9x − 1)
  pièges : g0_div_subtract

Divise A = −3x⁴ + 9x³ + 9x² + 5 par B = x² − 3x − 3. Écris chaque étape A = B·Q + R.
  [free, suivre l'erreur]  A = −3x⁴ + 9x³ + 9x² + 5
    = A = B·(−3x²) + (5)   ← Premier terme : −3x²
  aides : Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, −3x². | A − (−3x²)·B = … | A = B·(−3x²) + (5)
  pièges : g0_div_subtract

```

### Niveau 5

```
Divise A = −2x³ − 4x² + 5x + 4 par B = 2x² − 3. Écris chaque étape A = B·Q + R.
  [free, sans aide]  A = −2x³ − 4x² + 5x + 4
    = A = B·(−x) + (−4x² + 2x + 4)   ← Premier terme : −x
    = A = B·(−x − 2) + (2x − 2)   ← deg R < deg B : fini
  pièges : g0_div_subtract

Divise A = −x³ − 5x² + 2x + 12 par B = 2x² + 2x − 4. Écris chaque étape A = B·Q + R.
  [free, sans aide]  A = −x³ − 5x² + 2x + 12
    = A = B·(−1/2·x) + (−4x² + 12)   ← Premier terme : −1/2·x
    = A = B·(−1/2·x − 2) + (4x + 4)   ← deg R < deg B : fini
  pièges : g0_div_subtract

Divise A = −x³ − 3x² − 4x − 2 par B = 2x² + 2x + 4. Écris chaque étape A = B·Q + R.
  [free, sans aide]  A = −x³ − 3x² − 4x − 2
    = A = B·(−1/2·x) + (−2x² − 2x − 2)   ← Premier terme : −1/2·x
    = A = B·(−1/2·x − 1) + (2)   ← deg R < deg B : fini
  pièges : g0_div_subtract

```

### Variantes d'examen

```
Division de A = −2x⁴ + 4x³ + 9x² − 2x par B = x² − 3x − 1. Quel est le coefficient constant du reste R ?
  → 1
  [examen coef]

Division de A = 3x³ + 7x² + 5x − 5 par B = x² + 3x + 4. Quel est le reste ?
  · R = 23x − 13   ✔ R = −x + 3   · R = x − 3   · R = −31x − 69 [g0_div_subtract]
  [examen mcq]
  pièges : g0_div_subtract

```

## Théorème du reste, racine évidente (`g0-factor-thm`, Gymnase)

_Le reste par x − a est P(a)._

### Niveau 1

```
P(x) = x³ + 9x² + 26x + 24. Quel est le reste de la division de P par x + 1 ?
  [guided]  (−1)³ + 9(−1)² + 26(−1) + 24
    = −1 + 9 − □ + □   (trous : −1 + 9 − 26 + 24)   ← Calculer chaque terme
    = 6   ← Reste = P(−1)
  aides : Le reste par x + 1, c'est P(−1). | −1 + 9 − 26 + 24 | 6
  pièges : g0_rem_sign

P(x) = x³ + 9x² + 26x + 24. Quel est le reste de la division de P par x + 1 ?
  [guided]  (−1)³ + 9(−1)² + 26(−1) + 24
    = −1 + 9 − □ + □   (trous : −1 + 9 − 26 + 24)   ← Calculer chaque terme
    = 6   ← Reste = P(−1)
  aides : Le reste par x + 1, c'est P(−1). | −1 + 9 − 26 + 24 | 6
  pièges : g0_rem_sign

P(x) = x³ − 2x² − 5x + 6. Quel est le reste de la division de P par x + 2 ?
  [guided]  (−2)³ − 2(−2)² − 5(−2) + 6
    = −8 − 8 + □ + □   (trous : −8 − 8 + 10 + 6)   ← Calculer chaque terme
    = 0   ← Reste = P(−2)
  aides : Le reste par x + 2, c'est P(−2). | −8 − 8 + 10 + 6 | 0
  pièges : g0_rem_sign

```

### Niveau 2

```
P(x) = x³ − 4x² − x + 4. Quel est le reste de la division de P par x + 1 ?
  [guided]  (−1)³ − 4(−1)² − (−1) + 4
    ? Le reste par x + 1, c'est… ✔ P(−1) / · P(1)
    = −1 − 4 + 1 + 4   ← Calculer chaque terme
    = 0   ← Reste = P(−1)
  aides : Le reste par x + 1, c'est P(−1). | −1 − 4 + 1 + 4 | 0
  pièges : g0_rem_sign

P(x) = x³ + 2x² − 5x − 6. Quel est le reste de la division de P par x + 2 ?
  [guided]  (−2)³ + 2(−2)² − 5(−2) − 6
    ? Le reste par x + 2, c'est… ✔ P(−2) / · P(2)
    = −8 + 8 + 10 − 6   ← Calculer chaque terme
    = 4   ← Reste = P(−2)
  aides : Le reste par x + 2, c'est P(−2). | −8 + 8 + 10 − 6 | 4
  pièges : g0_rem_sign

P(x) = x³ − 8x² + 19x − 12. Quel est le reste de la division de P par x + 3 ?
  [guided]  (−3)³ − 8(−3)² + 19(−3) − 12
    ? Le reste par x + 3, c'est… ✔ P(−3) / · P(3)
    = −27 − 72 − 57 − 12   ← Calculer chaque terme
    = −168   ← Reste = P(−3)
  aides : Le reste par x + 3, c'est P(−3). | −27 − 72 − 57 − 12 | −168
  pièges : g0_rem_sign

```

### Niveau 3

```
Trouve une racine évidente de P(x) = x³ − 7x − 6, puis factorise P sur ℝ.
  [tap, suivre l'erreur, menu factor]  x³ − 7x − 6
    ? Où chercher une racine entière ? ✔ Parmi les diviseurs de 6 : ±1, ±2, ±3, ±6 / · Parmi les diviseurs du coefficient dominant / · Il faut résoudre P(x) = 0 avec une formule
    = (x + 2)(x² − 2x − 3)   ← Diviser par x + 2
    = (x + 2)(x + 1)(x − 3)   ← Factoriser le trinôme
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(−2) = 0 : x + 2 divise P. | (x + 2)(x² − 2x − 3)

Trouve une racine évidente de P(x) = x³ + 6x² + 11x + 6, puis factorise P sur ℝ.
  [tap, suivre l'erreur, menu factor]  x³ + 6x² + 11x + 6
    ? Où chercher une racine entière ? ✔ Parmi les diviseurs de 6 : ±1, ±2, ±3, ±6 / · Parmi les diviseurs du coefficient dominant / · Il faut résoudre P(x) = 0 avec une formule
    = (x + 3)(x² + 3x + 2)   ← Diviser par x + 3
    = (x + 3)(x + 2)(x + 1)   ← Factoriser le trinôme
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(−3) = 0 : x + 3 divise P. | (x + 3)(x² + 3x + 2)

Trouve une racine évidente de P(x) = x³ − 7x − 6, puis factorise P sur ℝ.
  [tap, suivre l'erreur, menu factor]  x³ − 7x − 6
    ? Où chercher une racine entière ? ✔ Parmi les diviseurs de 6 : ±1, ±2, ±3, ±6 / · Parmi les diviseurs du coefficient dominant / · Il faut résoudre P(x) = 0 avec une formule
    = (x + 2)(x² − 2x − 3)   ← Diviser par x + 2
    = (x + 2)(x + 1)(x − 3)   ← Factoriser le trinôme
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(−2) = 0 : x + 2 divise P. | (x + 2)(x² − 2x − 3)

```

### Niveau 4

```
Trouve une racine évidente de P(x) = x³ − x² − 4x − 6, puis factorise P sur ℝ.
  [free, suivre l'erreur]  x³ − x² − 4x − 6
    = (x − 3)(x² + 2x + 2)   ← Diviser par x − 3
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(3) = 0 : x − 3 divise P. | (x − 3)(x² + 2x + 2)
  pièges : g0_irred_split

Trouve une racine évidente de P(x) = x³ − 3x² − 6x + 8, puis factorise P sur ℝ.
  [free, suivre l'erreur]  x³ − 3x² − 6x + 8
    = (x + 2)(x² − 5x + 4)   ← Diviser par x + 2
    = (x + 2)(x − 1)(x − 4)   ← Factoriser le trinôme
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(−2) = 0 : x + 2 divise P. | (x + 2)(x² − 5x + 4)

Trouve une racine évidente de P(x) = x³ − 3x² − 3x − 4, puis factorise P sur ℝ.
  [free, suivre l'erreur]  x³ − 3x² − 3x − 4
    = (x − 4)(x² + x + 1)   ← Diviser par x − 4
  aides : Essaie les diviseurs du terme constant : P(1), P(−1), P(2)… | P(4) = 0 : x − 4 divise P. | (x − 4)(x² + x + 1)
  pièges : g0_irred_split

```

### Niveau 5

```
Trouve une racine évidente de P(x) = x³ − 7x + 6, puis factorise P sur ℝ.
  [free, sans aide]  x³ − 7x + 6
    = (x + 3)(x² − 3x + 2)   ← Diviser par x + 3
    = (x + 3)(x − 1)(x − 2)   ← Factoriser le trinôme

Trouve une racine évidente de P(x) = x³ + 4x² + x − 6, puis factorise P sur ℝ.
  [free, sans aide]  x³ + 4x² + x − 6
    = (x + 3)(x² + x − 2)   ← Diviser par x + 3
    = (x + 3)(x + 2)(x − 1)   ← Factoriser le trinôme

Trouve une racine évidente de P(x) = x³ − 2x² + x − 2, puis factorise P sur ℝ.
  [free, sans aide]  x³ − 2x² + x − 2
    = (x − 2)(x² + 1)   ← Diviser par x − 2
  pièges : g0_irred_split

```

### Variantes d'examen

```
Quel est le reste de la division de x³ + 4x² + x − 6 par x + 3 ?
  · 60 [g0_rem_sign]   ✔ 0   · 1   · −6
  [examen mcq]
  pièges : g0_rem_sign

Vrai ou faux ?
  « Si P(4) = 0, alors x − 4 divise P. » → VRAI
  [examen tf]

```

## Multiplicité d'une racine (`g0-multiplicity`, Gymnase)

_Horner en a, encore et encore, tant que le reste est nul._

### Niveau 1

```
Applique le schéma de Horner en a = 1 à P(x) = x⁴ − 2x³ + 2x − 1, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁴ | x³ | x² | x | 1
    a = 1
    P        1  −2  0  2  −1
    Horner 1 1  −1  −1  1  0
    Horner 2 1  0  −1  0  ·
    Horner 3 1  1  0  ·  ·
    Horner 4 (1)  (2)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de 1.
      [free]  x⁴ − 2x³ + 2x − 1
        = (x − 1)³(x + 1)   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x − 1. | (x − 1)³(…) | (x − 1)³(x + 1)
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

Applique le schéma de Horner en a = −2 à P(x) = x⁴ + 5x³ + 6x² − 4x − 8, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁴ | x³ | x² | x | 1
    a = −2
    P        1  5  6  −4  −8
    Horner 1 1  3  0  −4  0
    Horner 2 1  1  −2  0  ·
    Horner 3 1  −1  0  ·  ·
    Horner 4 (1)  (−3)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de −2.
      [free]  x⁴ + 5x³ + 6x² − 4x − 8
        = (x + 2)³(x − 1)   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x + 2. | (x + 2)³(…) | (x + 2)³(x − 1)
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

Applique le schéma de Horner en a = −1 à P(x) = x⁴ + 6x³ + 12x² + 10x + 3, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁴ | x³ | x² | x | 1
    a = −1
    P        1  6  12  10  3
    Horner 1 1  5  7  3  0
    Horner 2 1  4  3  0  ·
    Horner 3 1  3  0  ·  ·
    Horner 4 (1)  (2)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de −1.
      [free]  x⁴ + 6x³ + 12x² + 10x + 3
        = (x + 1)³(x + 3)   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x + 1. | (x + 1)³(…) | (x + 1)³(x + 3)
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

```

### Niveau 2

```
Applique le schéma de Horner en a = 1 à P(x) = x⁵ − 7x⁴ + 19x³ − 25x² + 16x − 4, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁵ | x⁴ | x³ | x² | x | 1
    a = 1
    P        1  −7  19  −25  16  −4
    Horner 1 (1)  (−6)  (13)  (−12)  (4)  (0)
    Horner 2 (1)  (−5)  (8)  (−4)  (0)  ·
    Horner 3 (1)  (−4)  (4)  (0)  ·  ·
    Horner 4 (1)  (−3)  (1)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de 1.
      [free]  x⁵ − 7x⁴ + 19x³ − 25x² + 16x − 4
        = (x − 1)³(x − 2)²   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x − 1. | (x − 1)³(…) | (x − 1)³(x − 2)²
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

Applique le schéma de Horner en a = 1 à P(x) = x⁴ − 2x³ + 2x − 1, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁴ | x³ | x² | x | 1
    a = 1
    P        1  −2  0  2  −1
    Horner 1 (1)  (−1)  (−1)  (1)  (0)
    Horner 2 (1)  (0)  (−1)  (0)  ·
    Horner 3 (1)  (1)  (0)  ·  ·
    Horner 4 (1)  (2)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de 1.
      [free]  x⁴ − 2x³ + 2x − 1
        = (x − 1)³(x + 1)   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x − 1. | (x − 1)³(…) | (x − 1)³(x + 1)
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

Applique le schéma de Horner en a = −1 à P(x) = x⁵ + 7x⁴ + 19x³ + 25x² + 16x + 4, puis encore sur chaque quotient, tant que le reste vaut 0.
  [tableau horner-repeat]  colonnes : x⁵ | x⁴ | x³ | x² | x | 1
    a = −1
    P        1  7  19  25  16  4
    Horner 1 (1)  (6)  (13)  (12)  (4)  (0)
    Horner 2 (1)  (5)  (8)  (4)  (0)  ·
    Horner 3 (1)  (4)  (4)  (0)  ·  ·
    Horner 4 (1)  (3)  (1)  ·  ·  ·
  puis : Écris P factorisé, avec la multiplicité de −1.
      [free]  x⁵ + 7x⁴ + 19x³ + 25x² + 16x + 4
        = (x + 1)³(x + 2)²   ← Multiplicité 3
      aides : Chaque reste nul donne un facteur x + 1. | (x + 1)³(…) | (x + 1)³(x + 2)²
      pièges : g0_mult_once
  pièges : g0_mult_once, g0_horner_zero

```

### Niveau 3

```
Quelle est la multiplicité de la racine −1 de P(x) = x³ + 4x² + 5x + 2 ? Factorise P.
  [tap, suivre l'erreur, menu factor]  x³ + 4x² + 5x + 2
    = (x + 1)(x² + 3x + 2)   ← Horner en −1 : reste 0
    = (x + 1)²(x + 2)   ← Horner en −1 ; le quotient ne s'annule plus en −1
  aides : Refais Horner en −1 sur le quotient, tant que le reste vaut 0. | (x + 1)(x² + 3x + 2) | (x + 1)²(x + 2)
  pièges : g0_mult_once

Quelle est la multiplicité de la racine 2 de P(x) = x⁴ − 5x³ + 6x² + 4x − 8 ? Factorise P.
  [tap, suivre l'erreur, menu factor]  x⁴ − 5x³ + 6x² + 4x − 8
    = (x − 2)(x³ − 3x² + 4)   ← Horner en 2 : reste 0
    = (x − 2)²(x² − x − 2)   ← Horner en 2 : reste 0
    = (x − 2)³(x + 1)   ← Horner en 2 ; le quotient ne s'annule plus en 2
  aides : Refais Horner en 2 sur le quotient, tant que le reste vaut 0. | (x − 2)(x³ − 3x² + 4) | (x − 2)³(x + 1)
  pièges : g0_mult_once

Quelle est la multiplicité de la racine 2 de P(x) = x⁴ − 4x³ + 16x − 16 ? Factorise P.
  [tap, suivre l'erreur, menu factor]  x⁴ − 4x³ + 16x − 16
    = (x − 2)(x³ − 2x² − 4x + 8)   ← Horner en 2 : reste 0
    = (x − 2)²(x² − 4)   ← Horner en 2 : reste 0
    = (x − 2)³(x + 2)   ← Horner en 2 ; le quotient ne s'annule plus en 2
  aides : Refais Horner en 2 sur le quotient, tant que le reste vaut 0. | (x − 2)(x³ − 2x² − 4x + 8) | (x − 2)³(x + 2)
  pièges : g0_mult_once

```

### Niveau 4

```
Quelle est la multiplicité de la racine −1 de P(x) = x⁵ − 3x⁴ − 6x³ + 10x² + 21x + 9 ? Factorise P.
  [free, suivre l'erreur]  x⁵ − 3x⁴ − 6x³ + 10x² + 21x + 9
    = (x + 1)(x⁴ − 4x³ − 2x² + 12x + 9)   ← Horner en −1 : reste 0
    = (x + 1)²(x³ − 5x² + 3x + 9)   ← Horner en −1 : reste 0
    = (x + 1)³(x² − 6x + 9)   ← Horner en −1 : reste 0
    = (x + 1)³(x − 3)²   ← Factoriser le quotient
  aides : Refais Horner en −1 sur le quotient, tant que le reste vaut 0. | (x + 1)(x⁴ − 4x³ − 2x² + 12x + 9) | (x + 1)³(x − 3)²
  pièges : g0_mult_once

Quelle est la multiplicité de la racine 2 de P(x) = x³ − x² − 8x + 12 ? Factorise P.
  [free, suivre l'erreur]  x³ − x² − 8x + 12
    = (x − 2)(x² + x − 6)   ← Horner en 2 : reste 0
    = (x − 2)²(x + 3)   ← Horner en 2 ; le quotient ne s'annule plus en 2
  aides : Refais Horner en 2 sur le quotient, tant que le reste vaut 0. | (x − 2)(x² + x − 6) | (x − 2)²(x + 3)
  pièges : g0_mult_once

Quelle est la multiplicité de la racine −1 de P(x) = x⁴ − 2x² + 1 ? Factorise P.
  [free, suivre l'erreur]  x⁴ − 2x² + 1
    = (x + 1)(x³ − x² − x + 1)   ← Horner en −1 : reste 0
    = (x + 1)²(x² − 2x + 1)   ← Horner en −1 : reste 0
    = (x + 1)²(x − 1)²   ← Factoriser le quotient
  aides : Refais Horner en −1 sur le quotient, tant que le reste vaut 0. | (x + 1)(x³ − x² − x + 1) | (x + 1)²(x − 1)²
  pièges : g0_mult_once

```

### Niveau 5

```
Donne toutes les racines de P(x) = x³ + 5x² + 7x + 3 avec leur multiplicité : factorise P.
  [free, sans aide]  x³ + 5x² + 7x + 3
    = (x + 1)(x² + 4x + 3)   ← Horner en −1 : reste 0
    = (x + 1)²(x + 3)   ← Horner en −1 ; le quotient ne s'annule plus en −1
  pièges : g0_mult_once

Donne toutes les racines de P(x) = x⁴ − 6x² − 8x − 3 avec leur multiplicité : factorise P.
  [free, sans aide]  x⁴ − 6x² − 8x − 3
    = (x + 1)(x³ − x² − 5x − 3)   ← Horner en −1 : reste 0
    = (x + 1)²(x² − 2x − 3)   ← Horner en −1 : reste 0
    = (x + 1)³(x − 3)   ← Horner en −1 ; le quotient ne s'annule plus en −1
  pièges : g0_mult_once

Donne toutes les racines de P(x) = x⁴ + 5x³ + 9x² + 7x + 2 avec leur multiplicité : factorise P.
  [free, sans aide]  x⁴ + 5x³ + 9x² + 7x + 2
    = (x + 1)(x³ + 4x² + 5x + 2)   ← Horner en −1 : reste 0
    = (x + 1)²(x² + 3x + 2)   ← Horner en −1 : reste 0
    = (x + 1)³(x + 2)   ← Horner en −1 ; le quotient ne s'annule plus en −1
  pièges : g0_mult_once

```

### Variantes d'examen

```
Quelle est la multiplicité de la racine −1 de x³ + 4x² + 5x + 2 ?
  ✔ 2   · 3   · 4   · 1 [g0_mult_once]
  [examen mcq]
  pièges : g0_mult_once

Vrai ou faux ?
  « Si P(2) = 0 et que le quotient Q de P par x − 2 vérifie aussi Q(2) = 0, alors 2 est racine double de P. » → FAUX
    contre-exemple (poly) : P = (x-2)^3
  [examen tf]
  pièges : g0_mult_once

```

## Factoriser sur ℝ (`g0-factor-real`, Gymnase)

_Facteurs du 1er degré et trinômes à Δ < 0._

### Niveau 1

```
Factorise P(x) = x⁴ − 3x³ + 8x − 24 sur ℝ.
  [guided]  x⁴ − 3x³ + 8x − 24
    (On regroupe les deux premiers termes et les deux derniers.)
    = x³(x − 3) + □   (trous : x³(x − 3) + 8(x − 3))   ← Grouper
    = (x − 3)□   (trous : (x − 3)(x³ + 8))   ← Facteur commun
    = (x − 3)(x + 2)□   (trous : (x − 3)(x + 2)(x² − 2x + 4))   ← a³ + b³ ; le trinôme a Δ = −12 < 0
  aides : Regroupe les deux premiers termes et les deux derniers. | x³(x − 3) + 8(x − 3) | (x − 3)(x + 2)(x² − 2x + 4)
  pièges : g0_irred_split

Factorise P(x) = x⁴ + 2x³ + x + 2 sur ℝ.
  [guided]  x⁴ + 2x³ + x + 2
    (On regroupe les deux premiers termes et les deux derniers.)
    = x³(x + 2) + □   (trous : x³(x + 2) + (x + 2))   ← Grouper
    = (x + 2)□   (trous : (x + 2)(x³ + 1))   ← Facteur commun
    = (x + 2)(x + 1)□   (trous : (x + 2)(x + 1)(x² − x + 1))   ← a³ + b³ ; le trinôme a Δ = −3 < 0
  aides : Regroupe les deux premiers termes et les deux derniers. | x³(x + 2) + (x + 2) | (x + 2)(x + 1)(x² − x + 1)
  pièges : g0_irred_split

Factorise P(x) = x⁴ − 3x³ + 8x − 24 sur ℝ.
  [guided]  x⁴ − 3x³ + 8x − 24
    (On regroupe les deux premiers termes et les deux derniers.)
    = x³(x − 3) + □   (trous : x³(x − 3) + 8(x − 3))   ← Grouper
    = (x − 3)□   (trous : (x − 3)(x³ + 8))   ← Facteur commun
    = (x − 3)(x + 2)□   (trous : (x − 3)(x + 2)(x² − 2x + 4))   ← a³ + b³ ; le trinôme a Δ = −12 < 0
  aides : Regroupe les deux premiers termes et les deux derniers. | x³(x − 3) + 8(x − 3) | (x − 3)(x + 2)(x² − 2x + 4)
  pièges : g0_irred_split

```

### Niveau 2

```
Factorise P(x) = x³ − 5x − 12 sur ℝ.
  [guided]  x³ − 5x − 12
    (Indication : Racine évidente 3.)
    = (x − 3)(x² + 3x + 4)   ← Racine évidente 3, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x − 3)(x² + 3x + 4) | (x − 3)(x² + 3x + 4)
  pièges : g0_irred_split

Factorise P(x) = x³ − 3x² + 8x − 6 sur ℝ.
  [guided]  x³ − 3x² + 8x − 6
    (Indication : Racine évidente 1.)
    = (x − 1)(x² − 2x + 6)   ← Racine évidente 1, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x − 1)(x² − 2x + 6) | (x − 1)(x² − 2x + 6)
  pièges : g0_irred_split

Factorise P(x) = x³ + x² + 2x − 4 sur ℝ.
  [guided]  x³ + x² + 2x − 4
    (Indication : Racine évidente 1.)
    = (x − 1)(x² + 2x + 4)   ← Racine évidente 1, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x − 1)(x² + 2x + 4) | (x − 1)(x² + 2x + 4)
  pièges : g0_irred_split

```

### Niveau 3

```
Factorise P(x) = x⁴ + 3x² − 4 sur ℝ.
  [tap, suivre l'erreur, menu factor]  x⁴ + 3x² − 4
    = (x² − 1)(x² + 4)   ← Polynôme en x² : poser X = x²
    = (x − 1)(x + 1)(x² + 4)   ← Identité a² − b²
  aides : C'est un polynôme en x² : pose X = x². | (x² − 1)(x² + 4) | (x − 1)(x + 1)(x² + 4)
  pièges : g0_irred_split

Factorise P(x) = x³ + 3x² + 3x + 9 sur ℝ.
  [tap, suivre l'erreur, menu factor]  x³ + 3x² + 3x + 9
    = (x + 3)(x² + 3)   ← Racine évidente −3, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x + 3)(x² + 3) | (x + 3)(x² + 3)
  pièges : g0_irred_split

Factorise P(x) = x³ − x² + 3x + 5 sur ℝ.
  [tap, suivre l'erreur, menu factor]  x³ − x² + 3x + 5
    = (x + 1)(x² − 2x + 5)   ← Racine évidente −1, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x + 1)(x² − 2x + 5) | (x + 1)(x² − 2x + 5)
  pièges : g0_irred_split

```

### Niveau 4

```
Factorise P(x) = x³ − x² + x − 6 sur ℝ.
  [free, suivre l'erreur]  x³ − x² + x − 6
    = (x − 2)(x² + x + 3)   ← Racine évidente 2, diviser
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x − 2)(x² + x + 3) | (x − 2)(x² + x + 3)
  pièges : g0_irred_split

Factorise P(x) = x⁴ + 7x³ + 18x² + 22x + 12 sur ℝ.
  [free, suivre l'erreur]  x⁴ + 7x³ + 18x² + 22x + 12
    = (x + 3)(x³ + 4x² + 6x + 4)   ← Racine évidente −3, diviser
    = (x + 3)(x + 2)(x² + 2x + 2)   ← Factoriser ; le trinôme restant a Δ < 0
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x + 3)(x³ + 4x² + 6x + 4) | (x + 3)(x + 2)(x² + 2x + 2)
  pièges : g0_irred_split

Factorise P(x) = x⁴ − 2x³ + 2x² − 7x + 6 sur ℝ.
  [free, suivre l'erreur]  x⁴ − 2x³ + 2x² − 7x + 6
    = (x − 1)(x³ − x² + x − 6)   ← Racine évidente 1, diviser
    = (x − 1)(x − 2)(x² + x + 3)   ← Factoriser ; le trinôme restant a Δ < 0
  aides : Cherche une racine évidente parmi les diviseurs du terme constant. | (x − 1)(x³ − x² + x − 6) | (x − 1)(x − 2)(x² + x + 3)
  pièges : g0_irred_split

```

### Niveau 5

```
Factorise P(x) = x⁴ + x³ − 7x + 5 sur ℝ.
  [free, sans aide]  x⁴ + x³ − 7x + 5
    = (x − 1)(x³ + 2x² + 2x − 5)   ← Racine évidente 1, diviser
    = (x − 1)²(x² + 3x + 5)   ← Factoriser ; le trinôme restant a Δ < 0
  pièges : g0_mult_once, g0_irred_split

Factorise P(x) = x⁴ − 6x³ + 14x² − 16x + 8 sur ℝ.
  [free, sans aide]  x⁴ − 6x³ + 14x² − 16x + 8
    = (x − 2)(x³ − 4x² + 6x − 4)   ← Racine évidente 2, diviser
    = (x − 2)²(x² − 2x + 2)   ← Factoriser ; le trinôme restant a Δ < 0
  pièges : g0_mult_once, g0_irred_split

Factorise P(x) = x⁴ + 7x³ + 18x² + 27x + 27 sur ℝ.
  [free, sans aide]  x⁴ + 7x³ + 18x² + 27x + 27
    = (x + 3)(x³ + 4x² + 6x + 9)   ← Racine évidente −3, diviser
    = (x + 3)²(x² + x + 3)   ← Factoriser ; le trinôme restant a Δ < 0
  pièges : g0_mult_once, g0_irred_split

```

### Variantes d'examen

```
Quelle est la factorisation de x³ − 4x − 15 sur ℝ ?
  · (x + 3)(x² + 3x + 5)   · (x² + 3x + 5)   ✔ (x − 3)(x² + 3x + 5)
  [examen mcq]

Vrai ou faux ?
  « Tout polynôme réel de degré 4 a au moins une racine réelle. » → FAUX
    contre-exemple (poly) : P = x^4+1
  [examen tf]

```

## Factoriser sur ℂ, racines conjuguées (`g0-factor-complex`, CMS)

_P réel : z racine ⇒ z̄ racine._

### Niveau 1

```
Factorise P(x) = x⁴ + 2x³ + 3x² + 2x + 2 sur ℂ sachant que −1 + i est racine.
  [guided]  x⁴ + 2x³ + 3x² + 2x + 2
    (P est réel : −1 − i est aussi racine, et (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2.)
    = (x² + 2x + 2)□   (trous : (x² + 2x + 2)(x² + 1))   ← Diviser P par le trinôme réel
    = (x + 1 − i)(x + 1 + i)(x − i)□   (trous : (x + 1 − i)(x + 1 + i)(x − i)(x + i))   ← Racines des trinômes
  aides : P est réel : la conjuguée −1 − i est aussi racine. | (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2 | (x² + 2x + 2)(x² + 1)

Factorise P(x) = x⁴ + 2x³ + 9x² + 8x + 20 sur ℂ sachant que −1 + 2i est racine.
  [guided]  x⁴ + 2x³ + 9x² + 8x + 20
    (P est réel : −1 − 2i est aussi racine, et (x − (−1 + 2i))(x − (−1 − 2i)) = x² + 2x + 5.)
    = (x² + 2x + 5)□   (trous : (x² + 2x + 5)(x² + 4))   ← Diviser P par le trinôme réel
    = (x + 1 − 2i)(x + 1 + 2i)(x − 2i)□   (trous : (x + 1 − 2i)(x + 1 + 2i)(x − 2i)(x + 2i))   ← Racines des trinômes
  aides : P est réel : la conjuguée −1 − 2i est aussi racine. | (x − (−1 + 2i))(x − (−1 − 2i)) = x² + 2x + 5 | (x² + 2x + 5)(x² + 4)

Factorise P(x) = x⁴ − x³ + x² − x sur ℂ sachant que i est racine.
  [guided]  x⁴ − x³ + x² − x
    (P est réel : −i est aussi racine, et (x − (i))(x − (−i)) = x² + 1.)
    = (x² + 1)□   (trous : (x² + 1)(x² − x))   ← Diviser P par le trinôme réel
    = x(x − i)(x + i)□   (trous : x(x − i)(x + i)(x − 1))   ← Racines des trinômes
  aides : P est réel : la conjuguée −i est aussi racine. | (x − (i))(x − (−i)) = x² + 1 | (x² + 1)(x² − x)
  pièges : g0_irred_split

```

### Niveau 2

```
Factorise P(x) = x⁴ − x³ − 2x² + 16x + 16 sur ℂ sachant que 2 + 2i est racine.
  [guided]  x⁴ − x³ − 2x² + 16x + 16
    (P est réel : 2 − 2i est aussi racine, et (x − (2 + 2i))(x − (2 − 2i)) = x² − 4x + 8.)
    = □(x² + 3x + 2)   (trous : (x² − 4x + 8)(x² + 3x + 2))   ← Diviser P par le trinôme réel
    = (x − 2 − 2i)(x − 2 + 2i)(x + 1)(x + 2)   ← Racines des trinômes
  aides : P est réel : la conjuguée 2 − 2i est aussi racine. | (x − (2 + 2i))(x − (2 − 2i)) = x² − 4x + 8 | (x² − 4x + 8)(x² + 3x + 2)
  pièges : g0_irred_split

Factorise P(x) = x⁴ + 4x³ + 6x² + 4x + 5 sur ℂ sachant que −2 + i est racine.
  [guided]  x⁴ + 4x³ + 6x² + 4x + 5
    (P est réel : −2 − i est aussi racine, et (x − (−2 + i))(x − (−2 − i)) = x² + 4x + 5.)
    = □(x² + 1)   (trous : (x² + 4x + 5)(x² + 1))   ← Diviser P par le trinôme réel
    = (x + 2 − i)(x + 2 + i)(x − i)(x + i)   ← Racines des trinômes
  aides : P est réel : la conjuguée −2 − i est aussi racine. | (x − (−2 + i))(x − (−2 − i)) = x² + 4x + 5 | (x² + 4x + 5)(x² + 1)

Factorise P(x) = x⁴ − 2x³ + 11x² − 2x + 10 sur ℂ sachant que 1 + 3i est racine.
  [guided]  x⁴ − 2x³ + 11x² − 2x + 10
    (P est réel : 1 − 3i est aussi racine, et (x − (1 + 3i))(x − (1 − 3i)) = x² − 2x + 10.)
    = □(x² + 1)   (trous : (x² − 2x + 10)(x² + 1))   ← Diviser P par le trinôme réel
    = (x − 1 − 3i)(x − 1 + 3i)(x − i)(x + i)   ← Racines des trinômes
  aides : P est réel : la conjuguée 1 − 3i est aussi racine. | (x − (1 + 3i))(x − (1 − 3i)) = x² − 2x + 10 | (x² − 2x + 10)(x² + 1)

```

### Niveau 3

```
Factorise P(x) = x⁴ + 2x³ + 2x² + 10x + 25 sur ℂ sachant que −2 + i est racine.
  [tap, suivre l'erreur, menu menu]  x⁴ + 2x³ + 2x² + 10x + 25
    = (x² + 4x + 5)(x² − 2x + 5)   ← Diviser P par le trinôme réel
    = (x + 2 − i)(x + 2 + i)(x − 1 − 2i)(x − 1 + 2i)   ← Racines des trinômes
  aides : P est réel : la conjuguée −2 − i est aussi racine. | (x − (−2 + i))(x − (−2 − i)) = x² + 4x + 5 | (x² + 4x + 5)(x² − 2x + 5)

Factorise P(x) = x⁴ + 4 sur ℂ sachant que −1 + i est racine.
  [tap, suivre l'erreur, menu menu]  x⁴ + 4
    = (x² + 2x + 2)(x² − 2x + 2)   ← Diviser P par le trinôme réel
    = (x + 1 − i)(x + 1 + i)(x − 1 − i)(x − 1 + i)   ← Racines des trinômes
  aides : P est réel : la conjuguée −1 − i est aussi racine. | (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2 | (x² + 2x + 2)(x² − 2x + 2)

Factorise P(x) = x⁴ − 2x³ + 9x² − 8x + 20 sur ℂ sachant que 2i est racine.
  [tap, suivre l'erreur, menu menu]  x⁴ − 2x³ + 9x² − 8x + 20
    = (x² + 4)(x² − 2x + 5)   ← Diviser P par le trinôme réel
    = (x − 2i)(x + 2i)(x − 1 − 2i)(x − 1 + 2i)   ← Racines des trinômes
  aides : P est réel : la conjuguée −2i est aussi racine. | (x − (2i))(x − (−2i)) = x² + 4 | (x² + 4)(x² − 2x + 5)

```

### Niveau 4

```
Factorise P(x) = x⁴ + 3x³ + 9x² − 13x sur ℂ sachant que −2 + 3i est racine.
  [free, suivre l'erreur]  x⁴ + 3x³ + 9x² − 13x
    = (x² + 4x + 13)(x² − x)   ← Diviser P par le trinôme réel
    = x(x + 2 − 3i)(x + 2 + 3i)(x − 1)   ← Racines des trinômes
  aides : P est réel : la conjuguée −2 − 3i est aussi racine. | (x − (−2 + 3i))(x − (−2 − 3i)) = x² + 4x + 13 | (x² + 4x + 13)(x² − x)
  pièges : g0_irred_split

Factorise P(x) = x⁴ + 5x³ + 8x² + 6x sur ℂ sachant que −1 + i est racine.
  [free, suivre l'erreur]  x⁴ + 5x³ + 8x² + 6x
    = (x² + 2x + 2)(x² + 3x)   ← Diviser P par le trinôme réel
    = x(x + 1 − i)(x + 1 + i)(x + 3)   ← Racines des trinômes
  aides : P est réel : la conjuguée −1 − i est aussi racine. | (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2 | (x² + 2x + 2)(x² + 3x)
  pièges : g0_irred_split

Factorise P(x) = x⁴ − 2x³ − x² + 2x + 10 sur ℂ sachant que −1 + i est racine.
  [free, suivre l'erreur]  x⁴ − 2x³ − x² + 2x + 10
    = (x² + 2x + 2)(x² − 4x + 5)   ← Diviser P par le trinôme réel
    = (x + 1 − i)(x + 1 + i)(x − 2 − i)(x − 2 + i)   ← Racines des trinômes
  aides : P est réel : la conjuguée −1 − i est aussi racine. | (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2 | (x² + 2x + 2)(x² − 4x + 5)

```

### Niveau 5

```
Factorise P(x) = x⁴ − 4x³ + 6x² − 4x + 5 sur ℂ (P a une racine imaginaire pure : i).
  [free, sans aide]  x⁴ − 4x³ + 6x² − 4x + 5
    = (x² + 1)(x² − 4x + 5)   ← Diviser P par le trinôme réel
    = (x − i)(x + i)(x − 2 − i)(x − 2 + i)   ← Racines des trinômes

Factorise P(x) = x⁴ − x³ + 2x² − 4x − 8 sur ℂ (P a une racine imaginaire pure : 2i).
  [free, sans aide]  x⁴ − x³ + 2x² − 4x − 8
    = (x² + 4)(x² − x − 2)   ← Diviser P par le trinôme réel
    = (x − 2i)(x + 2i)(x + 1)(x − 2)   ← Racines des trinômes
  pièges : g0_irred_split

Factorise P(x) = x⁴ + 2x³ + 6x² + 8x + 8 sur ℂ (P a une racine imaginaire pure : 2i).
  [free, sans aide]  x⁴ + 2x³ + 6x² + 8x + 8
    = (x² + 4)(x² + 2x + 2)   ← Diviser P par le trinôme réel
    = (x − 2i)(x + 2i)(x + 1 − i)(x + 1 + i)   ← Racines des trinômes

```

### Variantes d'examen

```
P(x) = x⁴ − 2x³ + 5x² + 26x est réel et admet la racine 2 + 3i. Que peut-on dire ?
  ✔ x² − 4x + 13 divise P   · x² + 4x + 13 divise P   · x² − 4x − 5 divise P   · (x − 2 − 3i) divise P, mais pas (x − 2 + 3i) [g0_conj_missing]
  [examen mcq]
  pièges : g0_conj_missing

Vrai ou faux ?
  « Un polynôme de degré 3 à coefficients complexes a toujours une racine réelle. » → FAUX
    contre-exemple (poly) : P = (x-i)^3
  [examen tf]
  pièges : g0_conj_missing

```

## Polynôme défini par des conditions (`g0-conditions`, CMS)

_Écrire la forme imposée, puis une équation par condition._

### Niveau 1

```
Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + 2i comme racine et dont le reste par x + 1 vaut 60.
  [guided]  ((−1)² − 6(−1) + 13)(−1 − c) = 60
    (La forme est donnée : P = (x² − 6x + 13)(x − c).)
    = □(−1 − c) = 60   (trous : 20(−1 − c) = 60)   ← Calculer le trinôme en −1
    = −1 − c = 3   ← Diviser par 20
    = c = −4   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 13)(x + 4)
    = x³ − 2x² − 11x + 52   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 1 = P(−1) = ((−1)² − 6(−1) + 13)(−1 − c) | 20(−1 − c) = 60

Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + 2i comme racine et dont le reste par x + 3 vaut −40.
  [guided]  ((−3)² − 6(−3) + 13)(−3 − c) = −40
    (La forme est donnée : P = (x² − 6x + 13)(x − c).)
    = □(−3 − c) = −40   (trous : 40(−3 − c) = −40)   ← Calculer le trinôme en −3
    = −3 − c = −1   ← Diviser par 40
    = c = −2   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 13)(x + 2)
    = x³ − 4x² + x + 26   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 3 = P(−3) = ((−3)² − 6(−3) + 13)(−3 − c) | 40(−3 − c) = −40

Détermine le polynôme réel unitaire P de degré 3 qui admet −1 + i comme racine et dont le reste par x + 2 vaut 2.
  [guided]  ((−2)² + 2(−2) + 2)(−2 − c) = 2
    (La forme est donnée : P = (x² + 2x + 2)(x − c).)
    = □(−2 − c) = 2   (trous : 2(−2 − c) = 2)   ← Calculer le trinôme en −2
    = −2 − c = 1   ← Diviser par 2
    = c = −3   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 2x + 2)(x + 3)
    = x³ + 5x² + 8x + 6   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 2 = P(−2) = ((−2)² + 2(−2) + 2)(−2 − c) | 2(−2 − c) = 2

```

### Niveau 2

```
Détermine le polynôme réel unitaire P de degré 3 qui admet −1 + i comme racine et dont le reste par x + 2 vaut −8.
  [guided]  (x + 1 − i)(x + 1 + i)
    = x² + 2x + 2   ← Développer
  — Reste par x + 2 : P(−2) = −8, avec P = (x² + 2x + 2)(x − c). Trouve c.  [juge solset]  départ : ((−2)² + 2(−2) + 2)(−2 − c) = −8
    = □(−2 − c) = −8   (trous : 2(−2 − c) = −8)   ← Calculer le trinôme en −2
    = −2 − c = −4   ← Diviser par 2
    = c = 2   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 2x + 2)(x − 2)
    = x³ − 2x − 4   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 2 = P(−2) = ((−2)² + 2(−2) + 2)(−2 − c) | 2(−2 − c) = −8
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + 2i comme racine et dont le reste par x − 2 vaut 25.
  [guided]  (x − 3 − 2i)(x − 3 + 2i)
    = x² − 6x + 13   ← Développer
  — Reste par x − 2 : P(2) = 25, avec P = (x² − 6x + 13)(x − c). Trouve c.  [juge solset]  départ : (2² − 6·2 + 13)(2 − c) = 25
    = □(2 − c) = 25   (trous : 5(2 − c) = 25)   ← Calculer le trinôme en 2
    = 2 − c = 5   ← Diviser par 5
    = c = −3   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 13)(x + 3)
    = x³ − 3x² − 5x + 39   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x − 2 = P(2) = (2² − 6·2 + 13)(2 − c) | 5(2 − c) = 25
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet 1 + i comme racine et dont le reste par x + 3 vaut 17.
  [guided]  (x − 1 − i)(x − 1 + i)
    = x² − 2x + 2   ← Développer
  — Reste par x + 3 : P(−3) = 17, avec P = (x² − 2x + 2)(x − c). Trouve c.  [juge solset]  départ : ((−3)² − 2(−3) + 2)(−3 − c) = 17
    = □(−3 − c) = 17   (trous : 17(−3 − c) = 17)   ← Calculer le trinôme en −3
    = −3 − c = 1   ← Diviser par 17
    = c = −4   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 2x + 2)(x + 4)
    = x³ + 2x² − 6x + 8   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 3 = P(−3) = ((−3)² − 2(−3) + 2)(−3 − c) | 17(−3 − c) = 17
  pièges : g0_irred_split

```

### Niveau 3

```
Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + 2i comme racine et dont le reste par x − 2 vaut 15.
  [tap, suivre l'erreur, menu menu]  (x − 3 − 2i)(x − 3 + 2i)
    ? Quelle forme a P ? ✔ (x − (3 + 2i))(x − (3 − 2i))(x − c) / · (x − (3 + 2i))(x − c) / · a(x − (3 + 2i))(x − (3 − 2i))(x − c)
    = x² − 6x + 13   ← Développer
  — Reste par x − 2 : P(2) = 15, avec P = (x² − 6x + 13)(x − c). Trouve c.  [juge solset]  départ : (2² − 6·2 + 13)(2 − c) = 15
    = 5(2 − c) = 15   ← Calculer le trinôme en 2
    = 2 − c = 3   ← Diviser par 5
    = c = −1   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 13)(x + 1)
    = x³ − 5x² + 7x + 13   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x − 2 = P(2) = (2² − 6·2 + 13)(2 − c) | 5(2 − c) = 15
  pièges : g0_irred_split, g0_conj_missing

Détermine le polynôme réel unitaire P de degré 3 qui admet −1 + i comme racine et dont le reste par x − 2 vaut 50.
  [tap, suivre l'erreur, menu menu]  (x + 1 − i)(x + 1 + i)
    ? Quelle forme a P ? ✔ (x − (−1 + i))(x − (−1 − i))(x − c) / · (x − (−1 + i))(x − c) / · a(x − (−1 + i))(x − (−1 − i))(x − c)
    = x² + 2x + 2   ← Développer
  — Reste par x − 2 : P(2) = 50, avec P = (x² + 2x + 2)(x − c). Trouve c.  [juge solset]  départ : (2² + 2·2 + 2)(2 − c) = 50
    = 10(2 − c) = 50   ← Calculer le trinôme en 2
    = 2 − c = 5   ← Diviser par 10
    = c = −3   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 2x + 2)(x + 3)
    = x³ + 5x² + 8x + 6   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x − 2 = P(2) = (2² + 2·2 + 2)(2 − c) | 10(2 − c) = 50
  pièges : g0_irred_split, g0_conj_missing

Détermine le polynôme réel unitaire P de degré 3 qui admet 2 + 2i comme racine et dont le reste par x + 1 vaut 39.
  [tap, suivre l'erreur, menu menu]  (x − 2 − 2i)(x − 2 + 2i)
    ? Quelle forme a P ? ✔ (x − (2 + 2i))(x − (2 − 2i))(x − c) / · (x − (2 + 2i))(x − c) / · a(x − (2 + 2i))(x − (2 − 2i))(x − c)
    = x² − 4x + 8   ← Développer
  — Reste par x + 1 : P(−1) = 39, avec P = (x² − 4x + 8)(x − c). Trouve c.  [juge solset]  départ : ((−1)² − 4(−1) + 8)(−1 − c) = 39
    = 13(−1 − c) = 39   ← Calculer le trinôme en −1
    = −1 − c = 3   ← Diviser par 13
    = c = −4   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 4x + 8)(x + 4)
    = x³ − 8x + 32   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 1 = P(−1) = ((−1)² − 4(−1) + 8)(−1 − c) | 13(−1 − c) = 39
  pièges : g0_irred_split, g0_conj_missing

```

### Niveau 4

```
Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + i comme racine et dont le reste par x − 2 vaut 12.
  [free, suivre l'erreur]  (x − 3 − i)(x − 3 + i)
    = x² − 6x + 10   ← Développer
  — Reste par x − 2 : P(2) = 12, avec P = (x² − 6x + 10)(x − c). Trouve c.  [juge solset]  départ : (2² − 6·2 + 10)(2 − c) = 12
    = 2(2 − c) = 12   ← Calculer le trinôme en 2
    = 2 − c = 6   ← Diviser par 2
    = c = −4   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 10)(x + 4)
    = x³ − 2x² − 14x + 40   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x − 2 = P(2) = (2² − 6·2 + 10)(2 − c) | 2(2 − c) = 12
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet −2 + 2i comme racine et dont le reste par x + 2 vaut −20.
  [free, suivre l'erreur]  (x + 2 − 2i)(x + 2 + 2i)
    = x² + 4x + 8   ← Développer
  — Reste par x + 2 : P(−2) = −20, avec P = (x² + 4x + 8)(x − c). Trouve c.  [juge solset]  départ : ((−2)² + 4(−2) + 8)(−2 − c) = −20
    = 4(−2 − c) = −20   ← Calculer le trinôme en −2
    = −2 − c = −5   ← Diviser par 4
    = c = 3   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 4x + 8)(x − 3)
    = x³ + x² − 4x − 24   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 2 = P(−2) = ((−2)² + 4(−2) + 8)(−2 − c) | 4(−2 − c) = −20
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet −2 + 2i comme racine et dont le reste par x + 2 vaut −4.
  [free, suivre l'erreur]  (x + 2 − 2i)(x + 2 + 2i)
    = x² + 4x + 8   ← Développer
  — Reste par x + 2 : P(−2) = −4, avec P = (x² + 4x + 8)(x − c). Trouve c.  [juge solset]  départ : ((−2)² + 4(−2) + 8)(−2 − c) = −4
    = 4(−2 − c) = −4   ← Calculer le trinôme en −2
    = −2 − c = −1   ← Diviser par 4
    = c = −1   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 4x + 8)(x + 1)
    = x³ + 5x² + 12x + 8   ← Développer
  aides : Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. | Reste par x + 2 = P(−2) = ((−2)² + 4(−2) + 8)(−2 − c) | 4(−2 − c) = −4
  pièges : g0_irred_split

```

### Niveau 5

```
Détermine le polynôme réel unitaire P de degré 3 qui admet 1 + i comme racine et dont le reste par x + 2 vaut −10.
  [free, sans aide]  (x − 1 − i)(x − 1 + i)
    = x² − 2x + 2   ← Développer
  — Reste par x + 2 : P(−2) = −10, avec P = (x² − 2x + 2)(x − c). Trouve c.  [juge solset]  départ : ((−2)² − 2(−2) + 2)(−2 − c) = −10
    = 10(−2 − c) = −10   ← Calculer le trinôme en −2
    = −2 − c = −1   ← Diviser par 10
    = c = −1   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 2x + 2)(x + 1)
    = x³ − x² + 2   ← Développer
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet 3 + 2i comme racine et dont le reste par x − 3 vaut 28.
  [free, sans aide]  (x − 3 − 2i)(x − 3 + 2i)
    = x² − 6x + 13   ← Développer
  — Reste par x − 3 : P(3) = 28, avec P = (x² − 6x + 13)(x − c). Trouve c.  [juge solset]  départ : (3² − 6·3 + 13)(3 − c) = 28
    = 4(3 − c) = 28   ← Calculer le trinôme en 3
    = 3 − c = 7   ← Diviser par 4
    = c = −4   ← Isoler c
  — P développé :  [juge poly]  départ : (x² − 6x + 13)(x + 4)
    = x³ − 2x² − 11x + 52   ← Développer
  pièges : g0_irred_split

Détermine le polynôme réel unitaire P de degré 3 qui admet i comme racine et dont le reste par x − 3 vaut 10.
  [free, sans aide]  (x − i)(x + i)
    = x² + 1   ← Développer
  — Reste par x − 3 : P(3) = 10, avec P = (x² + 1)(x − c). Trouve c.  [juge solset]  départ : (3² + 1)(3 − c) = 10
    = 10(3 − c) = 10   ← Calculer le trinôme en 3
    = 3 − c = 1   ← Diviser par 10
    = c = 2   ← Isoler c
  — P développé :  [juge poly]  départ : (x² + 1)(x − 2)
    = x³ − 2x² + x − 2   ← Développer
  pièges : g0_irred_split

```

### Variantes d'examen

```
Détermine le polynôme réel unitaire P de degré 3 qui admet 1 + 2i comme racine et dont le reste par x − 2 vaut 25.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; Reste par x − 2 : P(2) = 25, avec P = (x² − 2x + 5)(x − c). Trouve c. : 3 ; P développé : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  (x − 1 − 2i)(x − 1 + 2i)
      = x² − 2x + 5   ← Développer
    — Reste par x − 2 : P(2) = 25, avec P = (x² − 2x + 5)(x − c). Trouve c.  [juge solset]  départ : (2² − 2·2 + 5)(2 − c) = 25
      = 5(2 − c) = 25   ← Calculer le trinôme en 2
      = 2 − c = 5   ← Diviser par 5
      = c = −3   ← Isoler c
    — P développé :  [juge poly]  départ : (x² − 2x + 5)(x + 3)
      = x³ + x² − x + 15   ← Développer
  pièges : g0_irred_split

P est réel, unitaire, de degré 3, admet 3 + 2i comme racine, et son reste par x − 2 vaut 20. Alors P =
  ✔ x³ − 4x² + x + 26   · (x − 3 − 2i)(x + 2) [g0_conj_missing]   · x³ − 8x² + 25x − 26
  [examen mcq]
  pièges : g0_conj_missing

```

## Divisibilité avec un paramètre (`g0-div-param`, CMS)

_(x − a)(x − b) divise P ⇔ P(a) = 0 et P(b) = 0._

### Niveau 1

```
P(x) = x⁴ + 5x³ + 8x² + (λ + 2)x + λ² − λ − 2. Détermine λ pour que x² + 2x divise P, puis factorise P.
  [guided]  (0)⁴ + 5(0)³ + 8(0)² + (λ + 2)(0) + λ² − λ − 2 = 0
    (Première condition déjà faite : P(−2) = 0 donne λ ∈ {1 ; 2}.)
    = λ² − λ − 2 = 0   ← Calculer P(0)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−1 ; 2})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {1 ; 2} ∩ {−1 ; 2}
    = λ = 2   ← Intersecter
  — Avec λ = 2, factorise P :  [juge poly]  départ : x⁴ + 5x³ + 8x² + 4x
    = (x + 2)²(x + 1)x   ← Factoriser
  aides : x² + 2x = (x + 2)x : P(−2) et P(0) doivent être nuls. | λ² − λ − 2 = 0 | λ = 2

P(x) = x⁴ − 8x² + (−λ − 2)x + λ² + 4λ + 20. Détermine λ pour que x² − 4 divise P, puis factorise P.
  [guided]  (−2)⁴ − 8(−2)² + (−λ − 2)(−2) + λ² + 4λ + 20 = 0
    (Première condition déjà faite : P(2) = 0 donne λ ∈ {−2 ; 0}.)
    = λ² + 6λ + 8 = 0   ← Calculer P(−2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−4 ; −2})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−2 ; 0} ∩ {−4 ; −2}
    = λ = −2   ← Intersecter
  — Avec λ = −2, factorise P :  [juge poly]  départ : x⁴ − 8x² + 16
    = (x + 2)²(x − 2)²   ← Factoriser
  aides : x² − 4 = (x − 2)(x + 2) : P(2) et P(−2) doivent être nuls. | λ² + 6λ + 8 = 0 | λ = −2

P(x) = x⁴ − 4x³ + 5x² + 2λx + λ² + λ. Détermine λ pour que x² − 2x divise P, puis factorise P.
  [guided]  (2)⁴ − 4(2)³ + 5(2)² + 2λ(2) + λ² + λ = 0
    (Première condition déjà faite : P(0) = 0 donne λ ∈ {−1 ; 0}.)
    = λ² + 5λ + 4 = 0   ← Calculer P(2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−4 ; −1})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−1 ; 0} ∩ {−4 ; −1}
    = λ = −1   ← Intersecter
  — Avec λ = −1, factorise P :  [juge poly]  départ : x⁴ − 4x³ + 5x² − 2x
    = x(x − 1)²(x − 2)   ← Factoriser
  aides : x² − 2x = x(x − 2) : P(0) et P(2) doivent être nuls. | λ² + 5λ + 4 = 0 | λ = −1

```

### Niveau 2

```
P(x) = x⁴ + 2x³ − x² + (−2λ − 2)x + λ² + λ. Détermine λ pour que x² + 3x + 2 divise P, puis factorise P.
  [guided]  (−1)⁴ + 2(−1)³ − (−1)² + (−2λ − 2)(−1) + λ² + λ = 0
    ? Comment traduire « x² + 3x + 2 divise P » ? ✔ x² + 3x + 2 = (x + 1)(x + 2) : P(−1) = 0 et P(−2) = 0 / ✔ Diviser P par B et annuler le reste / · Seulement P(−1) = 0
    = λ² + 3λ = 0   ← Calculer P(−1)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−3 ; 0})   ← Résoudre
  — Condition P(−2) = 0 :  [juge solset]  départ : (−2)⁴ + 2(−2)³ − (−2)² + (−2λ − 2)(−2) + λ² + λ = 0
    = λ² + 5λ = 0   ← Calculer P(−2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−5 ; 0})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−3 ; 0} ∩ {−5 ; 0}
    = λ = 0   ← Intersecter
  — Avec λ = 0, factorise P :  [juge poly]  départ : x⁴ + 2x³ − x² − 2x
    = (x + 2)(x + 1)x(x − 1)   ← Factoriser
  aides : x² + 3x + 2 = (x + 1)(x + 2) : P(−1) et P(−2) doivent être nuls. | λ² + 5λ = 0 | λ = 0
  pièges : g0_param_one_cond

P(x) = x⁴ − 2x³ − 4x² + (λ + 6)x + λ² − 3λ + 2. Détermine λ pour que x² − 4 divise P, puis factorise P.
  [guided]  (−2)⁴ − 2(−2)³ − 4(−2)² + (λ + 6)(−2) + λ² − 3λ + 2 = 0
    ? Comment traduire « x² − 4 divise P » ? ✔ x² − 4 = (x + 2)(x − 2) : P(−2) = 0 et P(2) = 0 / ✔ Diviser P par B et annuler le reste / · Seulement P(−2) = 0
    = λ² − 5λ + 6 = 0   ← Calculer P(−2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {2 ; 3})   ← Résoudre
  — Condition P(2) = 0 :  [juge solset]  départ : (2)⁴ − 2(2)³ − 4(2)² + (λ + 6)(2) + λ² − 3λ + 2 = 0
    = λ² − λ − 2 = 0   ← Calculer P(2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−1 ; 2})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {2 ; 3} ∩ {−1 ; 2}
    = λ = 2   ← Intersecter
  — Avec λ = 2, factorise P :  [juge poly]  départ : x⁴ − 2x³ − 4x² + 8x
    = (x + 2)x(x − 2)²   ← Factoriser
  aides : x² − 4 = (x + 2)(x − 2) : P(−2) et P(2) doivent être nuls. | λ² − λ − 2 = 0 | λ = 2
  pièges : g0_param_one_cond

P(x) = x⁴ + 3x³ + (−λ − 1)x + λ² − 3λ. Détermine λ pour que x² + 2x divise P, puis factorise P.
  [guided]  (0)⁴ + 3(0)³ + (−λ − 1)(0) + λ² − 3λ = 0
    ? Comment traduire « x² + 2x divise P » ? ✔ x² + 2x = x(x + 2) : P(0) = 0 et P(−2) = 0 / ✔ Diviser P par B et annuler le reste / · Seulement P(0) = 0
    = λ² − 3λ = 0   ← Calculer P(0)
    = λ ∈ {□ ; □}   (trous : λ ∈ {0 ; 3})   ← Résoudre
  — Condition P(−2) = 0 :  [juge solset]  départ : (−2)⁴ + 3(−2)³ + (−λ − 1)(−2) + λ² − 3λ = 0
    = λ² − λ − 6 = 0   ← Calculer P(−2)
    = λ ∈ {□ ; □}   (trous : λ ∈ {−2 ; 3})   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {0 ; 3} ∩ {−2 ; 3}
    = λ = 3   ← Intersecter
  — Avec λ = 3, factorise P :  [juge poly]  départ : x⁴ + 3x³ − 4x
    = (x + 2)²x(x − 1)   ← Factoriser
  aides : x² + 2x = x(x + 2) : P(0) et P(−2) doivent être nuls. | λ² − λ − 6 = 0 | λ = 3
  pièges : g0_param_one_cond

```

### Niveau 3

```
P(x) = x⁴ + 5x³ + 5x² + (λ − 5)x + λ² + 4λ − 6. Détermine λ pour que x² − 1 divise P, puis factorise P.
  [tap, suivre l'erreur, menu menu]  (−1)⁴ + 5(−1)³ + 5(−1)² + (λ − 5)(−1) + λ² + 4λ − 6 = 0
    = λ² + 3λ = 0   ← Calculer P(−1)
    = λ ∈ {−3 ; 0}   ← Résoudre
  — Condition P(1) = 0 :  [juge solset]  départ : (1)⁴ + 5(1)³ + 5(1)² + (λ − 5)(1) + λ² + 4λ − 6 = 0
    = λ² + 5λ = 0   ← Calculer P(1)
    = λ ∈ {−5 ; 0}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−3 ; 0} ∩ {−5 ; 0}
    = λ = 0   ← Intersecter
  — Avec λ = 0, factorise P :  [juge poly]  départ : x⁴ + 5x³ + 5x² − 5x − 6
    = (x + 3)(x + 2)(x + 1)(x − 1)   ← Factoriser
  aides : x² − 1 = (x + 1)(x − 1) : P(−1) et P(1) doivent être nuls. | λ² + 5λ = 0 | λ = 0

P(x) = x⁴ + 4x³ + (−λ − 14)x + λ² − 3λ − 14. Détermine λ pour que x² − 4 divise P, puis factorise P.
  [tap, suivre l'erreur, menu menu]  (−2)⁴ + 4(−2)³ + (−λ − 14)(−2) + λ² − 3λ − 14 = 0
    = λ² − λ − 2 = 0   ← Calculer P(−2)
    = λ ∈ {−1 ; 2}   ← Résoudre
  — Condition P(2) = 0 :  [juge solset]  départ : (2)⁴ + 4(2)³ + (−λ − 14)(2) + λ² − 3λ − 14 = 0
    = λ² − 5λ + 6 = 0   ← Calculer P(2)
    = λ ∈ {2 ; 3}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−1 ; 2} ∩ {2 ; 3}
    = λ = 2   ← Intersecter
  — Avec λ = 2, factorise P :  [juge poly]  départ : x⁴ + 4x³ − 16x − 16
    = (x + 2)³(x − 2)   ← Factoriser
  aides : x² − 4 = (x + 2)(x − 2) : P(−2) et P(2) doivent être nuls. | λ² − 5λ + 6 = 0 | λ = 2

P(x) = x⁴ − 2x³ − 3x² + (2λ + 14)x + λ² + 5λ + 2. Détermine λ pour que x² + x − 2 divise P, puis factorise P.
  [tap, suivre l'erreur, menu menu]  (−2)⁴ − 2(−2)³ − 3(−2)² + (2λ + 14)(−2) + λ² + 5λ + 2 = 0
    = λ² + λ − 6 = 0   ← Calculer P(−2)
    = λ ∈ {−3 ; 2}   ← Résoudre
  — Condition P(1) = 0 :  [juge solset]  départ : (1)⁴ − 2(1)³ − 3(1)² + (2λ + 14)(1) + λ² + 5λ + 2 = 0
    = λ² + 7λ + 12 = 0   ← Calculer P(1)
    = λ ∈ {−4 ; −3}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−3 ; 2} ∩ {−4 ; −3}
    = λ = −3   ← Intersecter
  — Avec λ = −3, factorise P :  [juge poly]  départ : x⁴ − 2x³ − 3x² + 8x − 4
    = (x + 2)(x − 1)²(x − 2)   ← Factoriser
  aides : x² + x − 2 = (x + 2)(x − 1) : P(−2) et P(1) doivent être nuls. | λ² + 7λ + 12 = 0 | λ = −3

```

### Niveau 4

```
P(x) = x⁴ + x³ − 4x² + (−2λ − 4)x + λ² − 5λ. Détermine λ pour que x² + 2x divise P, puis factorise P.
  [free, suivre l'erreur]  (−2)⁴ + (−2)³ − 4(−2)² + (−2λ − 4)(−2) + λ² − 5λ = 0
    = λ² − λ = 0   ← Calculer P(−2)
    = λ ∈ {0 ; 1}   ← Résoudre
  — Condition P(0) = 0 :  [juge solset]  départ : (0)⁴ + (0)³ − 4(0)² + (−2λ − 4)(0) + λ² − 5λ = 0
    = λ² − 5λ = 0   ← Calculer P(0)
    = λ ∈ {0 ; 5}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {0 ; 1} ∩ {0 ; 5}
    = λ = 0   ← Intersecter
  — Avec λ = 0, factorise P :  [juge poly]  départ : x⁴ + x³ − 4x² − 4x
    = (x + 2)(x + 1)x(x − 2)   ← Factoriser
  aides : x² + 2x = (x + 2)x : P(−2) et P(0) doivent être nuls. | λ² − 5λ = 0 | λ = 0

P(x) = x⁴ − 5x³ + 7x² + (−2λ − 7)x + λ² + λ − 2. Détermine λ pour que x² − x divise P, puis factorise P.
  [free, suivre l'erreur]  (1)⁴ − 5(1)³ + 7(1)² + (−2λ − 7)(1) + λ² + λ − 2 = 0
    = λ² − λ − 6 = 0   ← Calculer P(1)
    = λ ∈ {−2 ; 3}   ← Résoudre
  — Condition P(0) = 0 :  [juge solset]  départ : (0)⁴ − 5(0)³ + 7(0)² + (−2λ − 7)(0) + λ² + λ − 2 = 0
    = λ² + λ − 2 = 0   ← Calculer P(0)
    = λ ∈ {−2 ; 1}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−2 ; 3} ∩ {−2 ; 1}
    = λ = −2   ← Intersecter
  — Avec λ = −2, factorise P :  [juge poly]  départ : x⁴ − 5x³ + 7x² − 3x
    = x(x − 1)²(x − 3)   ← Factoriser
  aides : x² − x = (x − 1)x : P(1) et P(0) doivent être nuls. | λ² + λ − 2 = 0 | λ = −2

P(x) = x⁴ − 7x² + (−λ − 6)x + λ². Détermine λ pour que x² + 3x + 2 divise P, puis factorise P.
  [free, suivre l'erreur]  (−2)⁴ − 7(−2)² + (−λ − 6)(−2) + λ² = 0
    = λ² + 2λ = 0   ← Calculer P(−2)
    = λ ∈ {−2 ; 0}   ← Résoudre
  — Condition P(−1) = 0 :  [juge solset]  départ : (−1)⁴ − 7(−1)² + (−λ − 6)(−1) + λ² = 0
    = λ² + λ = 0   ← Calculer P(−1)
    = λ ∈ {−1 ; 0}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−2 ; 0} ∩ {−1 ; 0}
    = λ = 0   ← Intersecter
  — Avec λ = 0, factorise P :  [juge poly]  départ : x⁴ − 7x² − 6x
    = (x + 2)(x + 1)x(x − 3)   ← Factoriser
  aides : x² + 3x + 2 = (x + 2)(x + 1) : P(−2) et P(−1) doivent être nuls. | λ² + λ = 0 | λ = 0

```

### Niveau 5

```
P(x) = x⁴ + x³ − 3x² + (−2λ + 1)x + λ² − 4λ + 5. Détermine λ pour que x² + x − 2 divise P, puis factorise P.
  [free, sans aide]  (−2)⁴ + (−2)³ − 3(−2)² + (−2λ + 1)(−2) + λ² − 4λ + 5 = 0
    = λ² − 1 = 0   ← Calculer P(−2)
    = λ ∈ {−1 ; 1}   ← Résoudre
  — Condition P(1) = 0 :  [juge solset]  départ : (1)⁴ + (1)³ − 3(1)² + (−2λ + 1)(1) + λ² − 4λ + 5 = 0
    = λ² − 6λ + 5 = 0   ← Calculer P(1)
    = λ ∈ {1 ; 5}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−1 ; 1} ∩ {1 ; 5}
    = λ = 1   ← Intersecter
  — Avec λ = 1, factorise P :  [juge poly]  départ : x⁴ + x³ − 3x² − x + 2
    = (x + 2)(x + 1)(x − 1)²   ← Factoriser

P(x) = x⁴ − 2x³ − x² + (−λ + 5)x + λ² − λ − 6. Détermine λ pour que x² − 1 divise P, puis factorise P.
  [free, sans aide]  (−1)⁴ − 2(−1)³ − (−1)² + (−λ + 5)(−1) + λ² − λ − 6 = 0
    = λ² − 9 = 0   ← Calculer P(−1)
    = λ ∈ {−3 ; 3}   ← Résoudre
  — Condition P(1) = 0 :  [juge solset]  départ : (1)⁴ − 2(1)³ − (1)² + (−λ + 5)(1) + λ² − λ − 6 = 0
    = λ² − 2λ − 3 = 0   ← Calculer P(1)
    = λ ∈ {−1 ; 3}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {−3 ; 3} ∩ {−1 ; 3}
    = λ = 3   ← Intersecter
  — Avec λ = 3, factorise P :  [juge poly]  départ : x⁴ − 2x³ − x² + 2x
    = (x + 1)x(x − 1)(x − 2)   ← Factoriser

P(x) = x⁴ − 3x³ + 2x² + (2λ − 4)x + λ² − 3λ + 2. Détermine λ pour que x² − 2x divise P, puis factorise P.
  [free, sans aide]  (0)⁴ − 3(0)³ + 2(0)² + (2λ − 4)(0) + λ² − 3λ + 2 = 0
    = λ² − 3λ + 2 = 0   ← Calculer P(0)
    = λ ∈ {1 ; 2}   ← Résoudre
  — Condition P(2) = 0 :  [juge solset]  départ : (2)⁴ − 3(2)³ + 2(2)² + (2λ − 4)(2) + λ² − 3λ + 2 = 0
    = λ² + λ − 6 = 0   ← Calculer P(2)
    = λ ∈ {−3 ; 2}   ← Résoudre
  — Les deux conditions à la fois :  [juge solset]  départ : {1 ; 2} ∩ {−3 ; 2}
    = λ = 2   ← Intersecter
  — Avec λ = 2, factorise P :  [juge poly]  départ : x⁴ − 3x³ + 2x²
    = x²(x − 1)(x − 2)   ← Factoriser

```

### Variantes d'examen

```
P(x) = x⁴ − 7x² + (−λ − 9)x + λ² + λ − 6. Détermine λ pour que x² + x divise P, puis factorise P.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Condition P(−1) = 0 : 1 ; Les deux conditions à la fois : 1 ; Avec λ = −3, factorise P : 1)
    [free, sans aide, suivre l'erreur, examen open]  (0)⁴ − 7(0)² + (−λ − 9)(0) + λ² + λ − 6 = 0
      = λ² + λ − 6 = 0   ← Calculer P(0)
      = λ ∈ {−3 ; 2}   ← Résoudre
    — Condition P(−1) = 0 :  [juge solset]  départ : (−1)⁴ − 7(−1)² + (−λ − 9)(−1) + λ² + λ − 6 = 0
      = λ² + 2λ − 3 = 0   ← Calculer P(−1)
      = λ ∈ {−3 ; 1}   ← Résoudre
    — Les deux conditions à la fois :  [juge solset]  départ : {−3 ; 2} ∩ {−3 ; 1}
      = λ = −3   ← Intersecter
    — Avec λ = −3, factorise P :  [juge poly]  départ : x⁴ − 7x² − 6x
      = (x + 2)(x + 1)x(x − 3)   ← Factoriser

P(x) = x⁴ + x³ − 3x² + (λ − 1)x + λ² + 3λ + 2. Pour quelles valeurs de λ le polynôme x² + x − 2 divise-t-il P ?
  ✔ {0}   · {−4 ; −1 ; 0} [g9_union_inter]   · {−4 ; 0} [g0_param_one_cond]   · {−1 ; 0} [g0_param_one_cond]
  [examen mcq]
  pièges : g0_param_one_cond, g9_union_inter

```

## PGCD de polynômes, racines communes (`g0-gcd`, CMS)

_Algorithme d'Euclide : le dernier reste non nul._

### Niveau 1

```
Trouve le PGCD de A = x³ + 3x² − 4x − 12 et B = x³ + 4x² − 4x − 16, puis leurs racines communes.
  [guided]  B = x³ + 4x² − 4x − 16
    (Première division déjà faite : A = B·1 + (−x² + 4).)
    = B = (−x² + 4)□ + 0   (trous : B = (−x² + 4)(−x − 4) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 4
    = x² − 4   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 4 | PGCD = x² − 4 : racines communes −2 et 2
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ − 6x² + 11x − 6 et B = x³ − 5x² + 6x, puis leurs racines communes.
  [guided]  B = x³ − 5x² + 6x
    (Première division déjà faite : A = B·1 + (−x² + 5x − 6).)
    = B = (−x² + 5x − 6)□ + 0   (trous : B = (−x² + 5x − 6)(−x) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 5x − 6
    = x² − 5x + 6   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 5x − 6 | PGCD = x² − 5x + 6 : racines communes 2 et 3
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ − 3x² − 4x + 12 et B = x³ − 2x² − 9x + 18, puis leurs racines communes.
  [guided]  B = x³ − 2x² − 9x + 18
    (Première division déjà faite : A = B·1 + (−x² + 5x − 6).)
    = B = (−x² + 5x − 6)□ + 0   (trous : B = (−x² + 5x − 6)(−x − 3) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 5x − 6
    = x² − 5x + 6   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 5x − 6 | PGCD = x² − 5x + 6 : racines communes 2 et 3
  pièges : g0_div_subtract

```

### Niveau 2

```
Trouve le PGCD de A = x³ − 2x² − 5x + 6 et B = x³ − x² − 9x + 9, puis leurs racines communes.
  [guided]  A = x³ − 2x² − 5x + 6
    = A = B·1 + (−x² + 4x − 3)   ← Première division
  — Divise B par le reste R₁ = −x² + 4x − 3 :  [juge poly]  départ : B = x³ − x² − 9x + 9
    = B = (−x² + 4x − 3)□ + 0   (trous : B = (−x² + 4x − 3)(−x − 3) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 4x − 3
    = x² − 4x + 3   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 4x − 3 | PGCD = x² − 4x + 3 : racines communes 1 et 3
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ + x² − 6x et B = x³ + 2x² − 5x − 6, puis leurs racines communes.
  [guided]  A = x³ + x² − 6x
    = A = B·1 + (−x² − x + 6)   ← Première division
  — Divise B par le reste R₁ = −x² − x + 6 :  [juge poly]  départ : B = x³ + 2x² − 5x − 6
    = B = (−x² − x + 6)□ + 0   (trous : B = (−x² − x + 6)(−x − 1) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² − x + 6
    = x² + x − 6   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² − x + 6 | PGCD = x² + x − 6 : racines communes −3 et 2
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ + 2x² − 9x − 18 et B = x³ + 3x² − 4x − 12, puis leurs racines communes.
  [guided]  A = x³ + 2x² − 9x − 18
    = A = B·1 + (−x² − 5x − 6)   ← Première division
  — Divise B par le reste R₁ = −x² − 5x − 6 :  [juge poly]  départ : B = x³ + 3x² − 4x − 12
    = B = (−x² − 5x − 6)□ + 0   (trous : B = (−x² − 5x − 6)(−x + 2) + 0)   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² − 5x − 6
    = x² + 5x + 6   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² − 5x − 6 | PGCD = x² + 5x + 6 : racines communes −3 et −2
  pièges : g0_div_subtract

```

### Niveau 3

```
Trouve le PGCD de A = x³ − 4x et B = x³ + x² − 4x − 4, puis leurs racines communes.
  [tap, suivre l'erreur, menu menu]  A = x³ − 4x
    = A = B·1 + (−x² + 4)   ← Première division
  — Divise B par le reste R₁ = −x² + 4 :  [juge poly]  départ : B = x³ + x² − 4x − 4
    = B = (−x² + 4)(−x − 1) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 4
    = x² − 4   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 4 | PGCD = x² − 4 : racines communes −2 et 2
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ + 4x² + 3x et B = x³ + 5x² + 4x, puis leurs racines communes.
  [tap, suivre l'erreur, menu menu]  A = x³ + 4x² + 3x
    = A = B·1 + (−x² − x)   ← Première division
  — Divise B par le reste R₁ = −x² − x :  [juge poly]  départ : B = x³ + 5x² + 4x
    = B = (−x² − x)(−x − 4) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² − x
    = x² + x   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² − x | PGCD = x² + x : racines communes −1 et 0
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ + 5x² + 6x et B = x³ + 6x² + 11x + 6, puis leurs racines communes.
  [tap, suivre l'erreur, menu menu]  A = x³ + 5x² + 6x
    = A = B·1 + (−x² − 5x − 6)   ← Première division
  — Divise B par le reste R₁ = −x² − 5x − 6 :  [juge poly]  départ : B = x³ + 6x² + 11x + 6
    = B = (−x² − 5x − 6)(−x − 1) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² − 5x − 6
    = x² + 5x + 6   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² − 5x − 6 | PGCD = x² + 5x + 6 : racines communes −3 et −2
  pièges : g0_div_subtract

```

### Niveau 4

```
Trouve le PGCD de A = x² − 2x − 3 et B = x² − x − 6, puis leurs racines communes.
  [free, suivre l'erreur]  A = x² − 2x − 3
    = A = B·1 + (−x + 3)   ← Première division
  — Divise B par le reste R₁ = −x + 3 :  [juge poly]  départ : B = x² − x − 6
    = B = (−x + 3)(−x − 2) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x + 3
    = x − 3   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x + 3 | PGCD = x − 3 : racines communes 3
  pièges : g0_div_subtract

Trouve le PGCD de A = x² + 2x − 3 et B = x² + 3x − 4, puis leurs racines communes.
  [free, suivre l'erreur]  A = x² + 2x − 3
    = A = B·1 + (−x + 1)   ← Première division
  — Divise B par le reste R₁ = −x + 1 :  [juge poly]  départ : B = x² + 3x − 4
    = B = (−x + 1)(−x − 4) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x + 1
    = x − 1   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x + 1 | PGCD = x − 1 : racines communes 1
  pièges : g0_div_subtract

Trouve le PGCD de A = x³ − 3x² − x + 3 et B = x³ − 2x² − 5x + 6, puis leurs racines communes.
  [free, suivre l'erreur]  A = x³ − 3x² − x + 3
    = A = B·1 + (−x² + 4x − 3)   ← Première division
  — Divise B par le reste R₁ = −x² + 4x − 3 :  [juge poly]  départ : B = x³ − 2x² − 5x + 6
    = B = (−x² + 4x − 3)(−x − 2) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x² + 4x − 3
    = x² − 4x + 3   ← Rendre unitaire
  aides : Divise A par B, puis B par le reste, jusqu'à un reste nul. | A − B = −x² + 4x − 3 | PGCD = x² − 4x + 3 : racines communes 1 et 3
  pièges : g0_div_subtract

```

### Niveau 5

```
Trouve le PGCD de A = x² + 3x et B = x² + 5x, puis leurs racines communes.
  [free, sans aide]  A = x² + 3x
    = A = B·1 + (−2x)   ← Première division
  — Divise B par le reste R₁ = −2x :  [juge poly]  départ : B = x² + 5x
    = B = (−2x)(−1/2·x − 5/2) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −2x
    = x   ← Rendre unitaire
  pièges : g0_div_subtract

Trouve le PGCD de A = x² − 2x et B = x² − x, puis leurs racines communes.
  [free, sans aide]  A = x² − 2x
    = A = B·1 + (−x)   ← Première division
  — Divise B par le reste R₁ = −x :  [juge poly]  départ : B = x² − x
    = B = (−x)(−x + 1) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −x
    = x   ← Rendre unitaire
  pièges : g0_div_subtract

Trouve le PGCD de A = x² + 3x + 2 et B = x² + 5x + 4, puis leurs racines communes.
  [free, sans aide]  A = x² + 3x + 2
    = A = B·1 + (−2x − 2)   ← Première division
  — Divise B par le reste R₁ = −2x − 2 :  [juge poly]  départ : B = x² + 5x + 4
    = B = (−2x − 2)(−1/2·x − 2) + 0   ← Deuxième division : reste nul
  — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : −2x − 2
    = x + 1   ← Rendre unitaire
  pièges : g0_div_subtract

```

### Variantes d'examen

```
Quel est le PGCD (unitaire) de x³ − x² − 6x et x³ − 7x − 6 ?
  ✔ x² − x − 6   · x³ − 7x − 6 [g0_gcd_last]   · x − 3   · x³ − x² − 6x [g0_gcd_last]
  [examen mcq]
  pièges : g0_gcd_last

Trouve le PGCD de A = x² − 9 et B = x² − 2x − 3, puis leurs racines communes.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 2 ; Divise B par le reste R₁ = 2x − 6 : 1,5 ; Le PGCD est le dernier reste non nul, rendu unitaire : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  A = x² − 9
      = A = B·1 + (2x − 6)   ← Première division
    — Divise B par le reste R₁ = 2x − 6 :  [juge poly]  départ : B = x² − 2x − 3
      = B = (2x − 6)(1/2·x + 1/2) + 0   ← Deuxième division : reste nul
    — Le PGCD est le dernier reste non nul, rendu unitaire :  [juge poly]  départ : 2x − 6
      = x − 3   ← Rendre unitaire
  pièges : g0_div_subtract

```

## Éléments simples : facteurs du 1er degré distincts (`g0-pfd-simple`, CMS)

_La méthode du cache._

### Niveau 1

```
Décompose en éléments simples (3x + 11)/((x − 3)(x + 2)).
  [guided]  A
    (Forme : A/(x − 3) + B/(x + 2))
    = (3·3 + 11)/(3 + 2)   ← Cache x − 3, pose x = 3
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (3(−2) + 11)/(−2 − 3)   ← Cache x + 2, pose x = −2
    = −1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (3x + 11)/((x − 3)(x + 2))
    = 4/(x − 3) − 1/(x + 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (3·3 + 11)/(3 + 2) | 4/(x − 3) − 1/(x + 2)
  pièges : g0_coverup_sign

Décompose en éléments simples (−x + 15)/((x + 3)(x − 3)).
  [guided]  A
    (Forme : A/(x + 3) + B/(x − 3))
    = (−(−3) + 15)/(−3 − 3)   ← Cache x + 3, pose x = −3
    = −3   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−(3) + 15)/(3 + 3)   ← Cache x − 3, pose x = 3
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−x + 15)/((x + 3)(x − 3))
    = −3/(x + 3) + 2/(x − 3)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (−(−3) + 15)/(−3 − 3) | −3/(x + 3) + 2/(x − 3)

Décompose en éléments simples (4x + 6)/((x)(x + 2)).
  [guided]  A
    (Forme : A/x + B/(x + 2))
    = (4·0 + 6)/(0 + 2)   ← Cache x, pose x = 0
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = (4(−2) + 6)/(−2 − 0)   ← Cache x + 2, pose x = −2
    = 1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (4x + 6)/((x)(x + 2))
    = 3/x + 1/(x + 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (4·0 + 6)/(0 + 2) | 3/x + 1/(x + 2)
  pièges : g0_coverup_sign

```

### Niveau 2

```
Décompose en éléments simples (4x − 4)/(x² − 4).
  [guided]  (4x − 4)/(x² − 4)
    (Forme : A/(x + 2) + B/(x − 2))
    = (4x − 4)/((x + 2)(x − 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (4(−2) − 4)/(−2 − 2)   ← Cache x + 2, pose x = −2
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = (4·2 − 4)/(2 + 2)   ← Cache x − 2, pose x = 2
    = 1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (4x − 4)/((x + 2)(x − 2))
    = 3/(x + 2) + 1/(x − 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (4(−2) − 4)/(−2 − 2) | 3/(x + 2) + 1/(x − 2)

Décompose en éléments simples (−7x − 6)/(x² + 2x).
  [guided]  (−7x − 6)/(x² + 2x)
    (Forme : A/x + B/(x + 2))
    = (−7x − 6)/((x)(x + 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (−7(0) − 6)/(0 + 2)   ← Cache x, pose x = 0
    = −3   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−7(−2) − 6)/(−2 − 0)   ← Cache x + 2, pose x = −2
    = −4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−7x − 6)/((x)(x + 2))
    = −3/x − 4/(x + 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (−7(0) − 6)/(0 + 2) | −3/x − 4/(x + 2)

Décompose en éléments simples (−2x − 2)/(x² − x).
  [guided]  (−2x − 2)/(x² − x)
    (Forme : A/(x − 1) + B/x)
    = (−2x − 2)/((x − 1)(x))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (−2(1) − 2)/(1 − 0)   ← Cache x − 1, pose x = 1
    = −4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−2(0) − 2)/(0 − 1)   ← Cache x, pose x = 0
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−2x − 2)/((x − 1)(x))
    = −4/(x − 1) + 2/x   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (−2(1) − 2)/(1 − 0) | −4/(x − 1) + 2/x

```

### Niveau 3

```
Décompose en éléments simples (x + 9)/(x² + 4x + 3).
  [tap, suivre l'erreur, menu menu]  (x + 9)/(x² + 4x + 3)
    (Forme : A/(x + 1) + B/(x + 3))
    = (x + 9)/((x + 1)(x + 3))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = ((−1) + 9)/(−1 + 3)   ← Cache x + 1, pose x = −1
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = ((−3) + 9)/(−3 + 1)   ← Cache x + 3, pose x = −3
    = −3   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (x + 9)/((x + 1)(x + 3))
    = 4/(x + 1) − 3/(x + 3)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = ((−1) + 9)/(−1 + 3) | 4/(x + 1) − 3/(x + 3)

Décompose en éléments simples (−2)/(x² + 5x + 6).
  [tap, suivre l'erreur, menu menu]  (−2)/(x² + 5x + 6)
    (Forme : A/(x + 2) + B/(x + 3))
    = (−2)/((x + 2)(x + 3))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (−2)/(−2 + 3)   ← Cache x + 2, pose x = −2
    = −2   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−2)/(−3 + 2)   ← Cache x + 3, pose x = −3
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−2)/((x + 2)(x + 3))
    = −2/(x + 2) + 2/(x + 3)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (−2)/(−2 + 3) | −2/(x + 2) + 2/(x + 3)

Décompose en éléments simples (8x + 8)/(x² + 2x − 3).
  [tap, suivre l'erreur, menu menu]  (8x + 8)/(x² + 2x − 3)
    (Forme : A/(x + 3) + B/(x − 1))
    = (8x + 8)/((x + 3)(x − 1))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (8(−3) + 8)/(−3 − 1)   ← Cache x + 3, pose x = −3
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (8·1 + 8)/(1 + 3)   ← Cache x − 1, pose x = 1
    = 4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (8x + 8)/((x + 3)(x − 1))
    = 4/(x + 3) + 4/(x − 1)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (8(−3) + 8)/(−3 − 1) | 4/(x + 3) + 4/(x − 1)

```

### Niveau 4

```
Décompose en éléments simples (5x² + 11x − 6)/(x³ + 5x² + 6x).
  [free, suivre l'erreur]  (5x² + 11x − 6)/(x³ + 5x² + 6x)
    (Forme : A/x + B/(x + 3) + C/(x + 2))
    = (5x² + 11x − 6)/((x)(x + 3)(x + 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (5·0² + 11·0 − 6)/((0 + 3)(0 + 2))   ← Cache x, pose x = 0
    = −1   ← Calculer
  — B = ?  [juge value]  départ : B
    = (5(−3)² + 11(−3) − 6)/((−3 − 0)(−3 + 2))   ← Cache x + 3, pose x = −3
    = 2   ← Calculer
  — C = ?  [juge value]  départ : C
    = (5(−2)² + 11(−2) − 6)/((−2 − 0)(−2 + 3))   ← Cache x + 2, pose x = −2
    = 4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (5x² + 11x − 6)/((x)(x + 3)(x + 2))
    = −1/x + 2/(x + 3) + 4/(x + 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (5·0² + 11·0 − 6)/((0 + 3)(0 + 2)) | −1/x + 2/(x + 3) + 4/(x + 2)

Décompose en éléments simples (−3x − 9)/(x² + x − 2).
  [free, suivre l'erreur]  (−3x − 9)/(x² + x − 2)
    (Forme : A/(x − 1) + B/(x + 2))
    = (−3x − 9)/((x − 1)(x + 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (−3(1) − 9)/(1 + 2)   ← Cache x − 1, pose x = 1
    = −4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−3(−2) − 9)/(−2 − 1)   ← Cache x + 2, pose x = −2
    = 1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−3x − 9)/((x − 1)(x + 2))
    = −4/(x − 1) + 1/(x + 2)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (−3(1) − 9)/(1 + 2) | −4/(x − 1) + 1/(x + 2)

Décompose en éléments simples (6x + 6)/(x² + 3x).
  [free, suivre l'erreur]  (6x + 6)/(x² + 3x)
    (Forme : A/x + B/(x + 3))
    = (6x + 6)/((x)(x + 3))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (6·0 + 6)/(0 + 3)   ← Cache x, pose x = 0
    = 2   ← Calculer
  — B = ?  [juge value]  départ : B
    = (6(−3) + 6)/(−3 − 0)   ← Cache x + 3, pose x = −3
    = 4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (6x + 6)/((x)(x + 3))
    = 2/x + 4/(x + 3)   ← Écrire
  aides : Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine. | A = (6·0 + 6)/(0 + 3) | 2/x + 4/(x + 3)

```

### Niveau 5

```
Décompose en éléments simples (5x² + 8x − 12)/(x³ − 4x).
  [free, sans aide]  (5x² + 8x − 12)/(x³ − 4x)
    (Forme : A/(x − 2) + B/x + C/(x + 2))
    = (5x² + 8x − 12)/((x − 2)(x)(x + 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (5·2² + 8·2 − 12)/((2 − 0)(2 + 2))   ← Cache x − 2, pose x = 2
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = (5·0² + 8·0 − 12)/((0 − 2)(0 + 2))   ← Cache x, pose x = 0
    = 3   ← Calculer
  — C = ?  [juge value]  départ : C
    = (5(−2)² + 8(−2) − 12)/((−2 − 2)(−2 − 0))   ← Cache x + 2, pose x = −2
    = −1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (5x² + 8x − 12)/((x − 2)(x)(x + 2))
    = 3/(x − 2) + 3/x − 1/(x + 2)   ← Écrire

Décompose en éléments simples (10x² + 22x + 8)/(x³ + 3x² + 2x).
  [free, sans aide]  (10x² + 22x + 8)/(x³ + 3x² + 2x)
    (Forme : A/x + B/(x + 1) + C/(x + 2))
    = (10x² + 22x + 8)/((x)(x + 1)(x + 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (10·0² + 22·0 + 8)/((0 + 1)(0 + 2))   ← Cache x, pose x = 0
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (10(−1)² + 22(−1) + 8)/((−1 − 0)(−1 + 2))   ← Cache x + 1, pose x = −1
    = 4   ← Calculer
  — C = ?  [juge value]  départ : C
    = (10(−2)² + 22(−2) + 8)/((−2 − 0)(−2 + 1))   ← Cache x + 2, pose x = −2
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (10x² + 22x + 8)/((x)(x + 1)(x + 2))
    = 4/x + 4/(x + 1) + 2/(x + 2)   ← Écrire

Décompose en éléments simples (−7x² − 5x + 14)/(x³ + x² − 4x − 4).
  [free, sans aide]  (−7x² − 5x + 14)/(x³ + x² − 4x − 4)
    (Forme : A/(x + 1) + B/(x + 2) + C/(x − 2))
    = (−7x² − 5x + 14)/((x + 1)(x + 2)(x − 2))   ← Factoriser le dénominateur
  — A = ?  [juge value]  départ : A
    = (−7(−1)² − 5(−1) + 14)/((−1 + 2)(−1 − 2))   ← Cache x + 1, pose x = −1
    = −4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−7(−2)² − 5(−2) + 14)/((−2 + 1)(−2 − 2))   ← Cache x + 2, pose x = −2
    = −1   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−7(2)² − 5(2) + 14)/((2 + 1)(2 + 2))   ← Cache x − 2, pose x = 2
    = −2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−7x² − 5x + 14)/((x + 1)(x + 2)(x − 2))
    = −4/(x + 1) − 1/(x + 2) − 2/(x − 2)   ← Écrire

```

### Variantes d'examen

```
(−3x − 2)/(x² − 2x) = A/(x − 2) + B/x. Que vaut B ?
  → 1
  [examen coef]

Quelle est la décomposition en éléments simples de (−6)/(x² + 2x) ?
  ✔ −3/x + 3/(x + 2)   · 3/x − 3/(x + 2)   · −3/x − 3/(x + 2) [g0_coverup_sign]
  [examen mcq]
  pièges : g0_coverup_sign

```

## Éléments simples : facteurs répétés, trinômes irréductibles, partie entière (`g0-pfd-general`, CMS)

_Diviser d'abord ; (x − a)² donne deux termes ; un trinôme donne Bx + C._

### Niveau 1

```
Décompose en éléments simples (−x² + 14x − 3)/(x³ − 3x² + x − 3).
  [guided]  A
    (Forme : A/(x − 3) + (Bx + C)/(x² + 1))
    = (−(3)² + 14(3) − 3)/(3² + 1)   ← Cache x − 3, pose x = 3
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = −1 − 3   ← Coefficient de x² : A + B
    = −4   ← Calculer
  — C = ?  [juge value]  départ : C
    = (3 − (−3))/(3)   ← Terme constant : N(0) = A − 3C
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−x² + 14x − 3)/(x³ − 3x² + x − 3)
    = 3/(x − 3) + (−4x + 2)/(x² + 1)   ← Écrire
  aides : Sur x² + s, le numérateur est de la forme Bx + C. | A/(x − 3) + (Bx + C)/(x² + 1) | 3/(x − 3) + (−4x + 2)/(x² + 1)
  pièges : g0_coverup_sign

Décompose en éléments simples (−5x² − 7x − 2)/(x³ + 3x² + 4x + 12).
  [guided]  A
    (Forme : A/(x + 3) + (Bx + C)/(x² + 4))
    = (−5(−3)² − 7(−3) − 2)/((−3)² + 4)   ← Cache x + 3, pose x = −3
    = −2   ← Calculer
  — B = ?  [juge value]  départ : B
    = −5 − (−2)   ← Coefficient de x² : A + B
    = −3   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−8 − (−2))/(−3)   ← Terme constant : N(0) = 4A + 3C
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−5x² − 7x − 2)/(x³ + 3x² + 4x + 12)
    = −2/(x + 3) + (−3x + 2)/(x² + 4)   ← Écrire
  aides : Sur x² + s, le numérateur est de la forme Bx + C. | A/(x + 3) + (Bx + C)/(x² + 4) | −2/(x + 3) + (−3x + 2)/(x² + 4)
  pièges : g0_coverup_sign

Décompose en éléments simples (5x² + 4x + 19)/(x³ + x² + 4x + 4).
  [guided]  A
    (Forme : A/(x + 1) + (Bx + C)/(x² + 4))
    = (5(−1)² + 4(−1) + 19)/((−1)² + 4)   ← Cache x + 1, pose x = −1
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = 5 − 4   ← Coefficient de x² : A + B
    = 1   ← Calculer
  — C = ?  [juge value]  départ : C
    = (16 − 19)/(−1)   ← Terme constant : N(0) = 4A + C
    = 3   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (5x² + 4x + 19)/(x³ + x² + 4x + 4)
    = 4/(x + 1) + (x + 3)/(x² + 4)   ← Écrire
  aides : Sur x² + s, le numérateur est de la forme Bx + C. | A/(x + 1) + (Bx + C)/(x² + 4) | 4/(x + 1) + (x + 3)/(x² + 4)
  pièges : g0_coverup_sign

```

### Niveau 2

```
Décompose en éléments simples (−6x² − 6x + 4)/(x³ + 2x²).
  [guided]  A
    ? Quelle forme ? ✔ A/(x + 2) + B/x + C/x² / · A/(x + 2) + C/x² / · A/(x + 2) + B/x
    = (−6(−2)² − 6(−2) + 4)/((−2)²)   ← Cache x + 2, pose x = −2
    = −2   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−6(0)² − 6(0) + 4)/(0 + 2)   ← Cache x², pose x = 0
    = 2   ← Calculer
  — B = ?  [juge value]  départ : B
    = −6 − (−2)   ← Coefficient de x² : A + B
    = −4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−6x² − 6x + 4)/(x³ + 2x²)
    = −2/(x + 2) − 4/x + 2/x²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/(x + 2) + B/x + C/x² | −2/(x + 2) − 4/x + 2/x²
  pièges : g0_coverup_sign, g0_pfd_form

Décompose en éléments simples (2x³ + 7x² + 4x − 1)/(x² + 5x + 6).
  [guided]  N = 2x³ + 7x² + 4x − 1
    ? Quelle forme ? ✔ D'abord diviser : 2x − 3 + A/(x + 3) + B/(x + 2) / · A/(x + 3) + B/(x + 2) / · Ax + A/(x + 3) + B/(x + 2)
    = N = D·(2x − 3) + (7x + 17)   ← Division : partie entière et reste
  — A = ?  [juge value]  départ : A
    = (7(−3) + 17)/(−3 + 2)   ← Cache x + 3, pose x = −3
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (7(−2) + 17)/(−2 + 3)   ← Cache x + 2, pose x = −2
    = 3   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (2x³ + 7x² + 4x − 1)/(x² + 5x + 6)
    = 2x − 3 + 4/(x + 3) + 3/(x + 2)   ← Écrire
  aides : deg N ≥ deg D : divise d'abord. | D'abord diviser : 2x − 3 + A/(x + 3) + B/(x + 2) | 2x − 3 + 4/(x + 3) + 3/(x + 2)
  pièges : g0_div_subtract, g0_pfd_no_div

Décompose en éléments simples (−3x² − 5x − 1)/(x³ + 5x² + 8x + 4).
  [guided]  A
    ? Quelle forme ? ✔ A/(x + 1) + B/(x + 2) + C/(x + 2)² / · A/(x + 1) + C/(x + 2)² / · A/(x + 1) + B/(x + 2)
    = (−3(−1)² − 5(−1) − 1)/((−1)² + 4(−1) + 4)   ← Cache x + 1, pose x = −1
    = 1   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−3(−2)² − 5(−2) − 1)/((−2) + 1)   ← Cache (x + 2)², pose x = −2
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = −3 − 1   ← Coefficient de x² : A + B
    = −4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−3x² − 5x − 1)/(x³ + 5x² + 8x + 4)
    = 1/(x + 1) − 4/(x + 2) + 3/(x + 2)²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/(x + 1) + B/(x + 2) + C/(x + 2)² | 1/(x + 1) − 4/(x + 2) + 3/(x + 2)²
  pièges : g0_coverup_sign, g0_pfd_form

```

### Niveau 3

```
Décompose en éléments simples (x² + 5x + 1)/(x³ + 2x² + x).
  [tap, suivre l'erreur, menu menu]  A
    = (0² + 5·0 + 1)/(0² + 2·0 + 1)   ← Cache x, pose x = 0
    = 1   ← Calculer
  — C = ?  [juge value]  départ : C
    = ((−1)² + 5(−1) + 1)/((−1))   ← Cache (x + 1)², pose x = −1
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = 1 − 1   ← Coefficient de x² : A + B
    = 0   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (x² + 5x + 1)/(x³ + 2x² + x)
    = 1/x + 3/(x + 1)²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/x + B/(x + 1) + C/(x + 1)² | 1/x + 3/(x + 1)²
  pièges : g0_coverup_sign

Décompose en éléments simples (−x³ − 2x² + 9x − 4)/(x² − x).
  [tap, suivre l'erreur, menu menu]  N = −x³ − 2x² + 9x − 4
    = N = D·(−x − 3) + (6x − 4)   ← Division : partie entière et reste
  — A = ?  [juge value]  départ : A
    = (6·1 − 4)/(1 − 0)   ← Cache x − 1, pose x = 1
    = 2   ← Calculer
  — B = ?  [juge value]  départ : B
    = (6·0 − 4)/(0 − 1)   ← Cache x, pose x = 0
    = 4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−x³ − 2x² + 9x − 4)/(x² − x)
    = −x − 3 + 2/(x − 1) + 4/x   ← Écrire
  aides : deg N ≥ deg D : divise d'abord. | D'abord diviser : −x − 3 + A/(x − 1) + B/x | −x − 3 + 2/(x − 1) + 4/x
  pièges : g0_div_subtract

Décompose en éléments simples (2x³ − 4x² − 12x + 12)/(x² − 3x).
  [tap, suivre l'erreur, menu menu]  N = 2x³ − 4x² − 12x + 12
    = N = D·(2x + 2) + (−6x + 12)   ← Division : partie entière et reste
  — A = ?  [juge value]  départ : A
    = (−6(0) + 12)/(0 − 3)   ← Cache x, pose x = 0
    = −4   ← Calculer
  — B = ?  [juge value]  départ : B
    = (−6(3) + 12)/(3 − 0)   ← Cache x − 3, pose x = 3
    = −2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (2x³ − 4x² − 12x + 12)/(x² − 3x)
    = 2x + 2 − 4/x − 2/(x − 3)   ← Écrire
  aides : deg N ≥ deg D : divise d'abord. | D'abord diviser : 2x + 2 + A/x + B/(x − 3) | 2x + 2 − 4/x − 2/(x − 3)
  pièges : g0_div_subtract

```

### Niveau 4

```
Décompose en éléments simples (3x² − 9x + 3)/(x³ − 2x² + x).
  [free, suivre l'erreur]  A
    = (3·0² − 9·0 + 3)/(0² − 2·0 + 1)   ← Cache x, pose x = 0
    = 3   ← Calculer
  — C = ?  [juge value]  départ : C
    = (3·1² − 9·1 + 3)/(1)   ← Cache (x − 1)², pose x = 1
    = −3   ← Calculer
  — B = ?  [juge value]  départ : B
    = 3 − 3   ← Coefficient de x² : A + B
    = 0   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (3x² − 9x + 3)/(x³ − 2x² + x)
    = 3/x − 3/(x − 1)²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/x + B/(x − 1) + C/(x − 1)² | 3/x − 3/(x − 1)²
  pièges : g0_coverup_sign

Décompose en éléments simples (−5x² + 20x − 23)/(x³ − 7x² + 15x − 9).
  [free, suivre l'erreur]  A
    = (−5(1)² + 20(1) − 23)/(1² − 6·1 + 9)   ← Cache x − 1, pose x = 1
    = −2   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−5(3)² + 20(3) − 23)/(3 − 1)   ← Cache (x − 3)², pose x = 3
    = −4   ← Calculer
  — B = ?  [juge value]  départ : B
    = −5 − (−2)   ← Coefficient de x² : A + B
    = −3   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−5x² + 20x − 23)/(x³ − 7x² + 15x − 9)
    = −2/(x − 1) − 3/(x − 3) − 4/(x − 3)²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/(x − 1) + B/(x − 3) + C/(x − 3)² | −2/(x − 1) − 3/(x − 3) − 4/(x − 3)²
  pièges : g0_coverup_sign

Décompose en éléments simples (−3x² − 17x − 16)/(x³ + 4x² + 4x).
  [free, suivre l'erreur]  A
    = (−3(0)² − 17(0) − 16)/(0² + 4·0 + 4)   ← Cache x, pose x = 0
    = −4   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−3(−2)² − 17(−2) − 16)/((−2))   ← Cache (x + 2)², pose x = −2
    = −3   ← Calculer
  — B = ?  [juge value]  départ : B
    = −3 − (−4)   ← Coefficient de x² : A + B
    = 1   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−3x² − 17x − 16)/(x³ + 4x² + 4x)
    = −4/x + 1/(x + 2) − 3/(x + 2)²   ← Écrire
  aides : Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)². | A/x + B/(x + 2) + C/(x + 2)² | −4/x + 1/(x + 2) − 3/(x + 2)²
  pièges : g0_coverup_sign

```

### Niveau 5

```
Décompose en éléments simples (−5x² − 7x + 4)/(x³ + 3x² + x + 3).
  [free, sans aide]  A
    = (−5(−3)² − 7(−3) + 4)/((−3)² + 1)   ← Cache x + 3, pose x = −3
    = −2   ← Calculer
  — B = ?  [juge value]  départ : B
    = −5 − (−2)   ← Coefficient de x² : A + B
    = −3   ← Calculer
  — C = ?  [juge value]  départ : C
    = (−2 − 4)/(−3)   ← Terme constant : N(0) = A + 3C
    = 2   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−5x² − 7x + 4)/(x³ + 3x² + x + 3)
    = −2/(x + 3) + (−3x + 2)/(x² + 1)   ← Écrire
  pièges : g0_coverup_sign

Décompose en éléments simples (−x² + 8x + 15)/(x³ − 3x² + x − 3).
  [free, sans aide]  A
    = (−(3)² + 8(3) + 15)/(3² + 1)   ← Cache x − 3, pose x = 3
    = 3   ← Calculer
  — B = ?  [juge value]  départ : B
    = −1 − 3   ← Coefficient de x² : A + B
    = −4   ← Calculer
  — C = ?  [juge value]  départ : C
    = (3 − 15)/(3)   ← Terme constant : N(0) = A − 3C
    = −4   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (−x² + 8x + 15)/(x³ − 3x² + x − 3)
    = 3/(x − 3) + (−4x − 4)/(x² + 1)   ← Écrire
  pièges : g0_coverup_sign

Décompose en éléments simples (x² + 10x − 23)/(x³ − 5x² + 3x + 9).
  [free, sans aide]  A
    = ((−1)² + 10(−1) − 23)/((−1)² − 6(−1) + 9)   ← Cache x + 1, pose x = −1
    = −2   ← Calculer
  — C = ?  [juge value]  départ : C
    = (3² + 10·3 − 23)/(3 + 1)   ← Cache (x − 3)², pose x = 3
    = 4   ← Calculer
  — B = ?  [juge value]  départ : B
    = 1 − (−2)   ← Coefficient de x² : A + B
    = 3   ← Calculer
  — Écris la décomposition :  [juge equiv]  départ : (x² + 10x − 23)/(x³ − 5x² + 3x + 9)
    = −2/(x + 1) + 3/(x − 3) + 4/(x − 3)²   ← Écrire
  pièges : g0_coverup_sign

```

### Variantes d'examen

```
(x² + 8x − 15)/(x³ + 3x² + x + 3) = A/(x + 3) + (Bx + C)/(x² + 1). Que vaut A ?
  → -3
  [examen coef]

Décompose en éléments simples (7x² − 6x + 14)/(x³ − x² + 4x − 4).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; B = ? : 1 ; C = ? : 1 ; Écris la décomposition : 1)
    [free, sans aide, suivre l'erreur, examen open]  A
      = (7·1² − 6·1 + 14)/(1² + 4)   ← Cache x − 1, pose x = 1
      = 3   ← Calculer
    — B = ?  [juge value]  départ : B
      = 7 − 3   ← Coefficient de x² : A + B
      = 4   ← Calculer
    — C = ?  [juge value]  départ : C
      = 12 − 14   ← Terme constant : N(0) = 4A − C
      = −2   ← Calculer
    — Écris la décomposition :  [juge equiv]  départ : (7x² − 6x + 14)/(x³ − x² + 4x − 4)
      = 3/(x − 1) + (4x − 2)/(x² + 4)   ← Écrire
  pièges : g0_coverup_sign

```

## Pièges de cette unité

- **Horner avec a au lieu de −a** (`g0_horner_sign`, E) : x + 2 : Horner en 2 au lieu de x + 2 : Horner en −2
- **Coefficient nul oublié dans le schéma de Horner** (`g0_horner_zero`, E) : 2x⁴ − 3x³ + 5x − 6 : 2, −3, 5, −6 au lieu de 2x⁴ − 3x³ + 5x − 6 : 2, −3, 0, 5, −6
- **Quotient lu avec un degré de trop** (`g0_horner_degree`, E) : Q = 2x⁴ + x³ + 2x² + 9x + 12 au lieu de Q = 2x³ + x² + 2x + 9, R = 12
- **Soustraction du produit : le signe n'est changé que sur un terme** (`g0_div_subtract`, E) : A − 2x²·B = −x³ − 2x² − 3x + 1 au lieu de A − 2x²·B = −x³ + 2x² − 3x + 1
- **Reste par x + a calculé en a au lieu de −a** (`g0_rem_sign`, E) : reste de P par x + 1 = P(1) au lieu de reste de P par x + 1 = P(−1)
- **Racine multiple comptée une seule fois** (`g0_mult_once`, E) : P = (x − 1)(x + 2) au lieu de P = (x − 1)³(x + 2)
- **Trinôme irréductible factorisé quand même** (`g0_irred_split`, E) : x² + 4 = (x − 2)(x + 2) au lieu de x² + 4 est irréductible sur ℝ
- **Racine conjuguée oubliée** (`g0_conj_missing`, E) : P = (x − 2 − i)(x − c)… au lieu de P réel : 2 − i est aussi racine
- **Une seule des deux conditions gardée** (`g0_param_one_cond`, E) : λ ∈ {1 ; 2} au lieu de λ = 2
- **PGCD pris au mauvais endroit de l'algorithme** (`g0_gcd_last`, E) : PGCD = B au lieu de PGCD = dernier reste non nul
- **Méthode du cache : x remplacé par −a au lieu de a** (`g0_coverup_sign`, E) : A = (−2 + 7)/(−2 + 1) au lieu de A = (2 + 7)/(2 + 1)
- **Forme des éléments simples incomplète** (`g0_pfd_form`, E) : A/(x − 1)² au lieu de A/(x − 1) + B/(x − 1)²
- **Éléments simples sans la partie entière** (`g0_pfd_no_div`, E) : (2x³ + x² + 3)/(x² − 1) = 3/(x − 1) − 1/(x + 1) au lieu de (2x³ + x² + 3)/(x² − 1) = 2x + 1 + 3/(x − 1) − 1/(x + 1)
