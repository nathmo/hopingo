# Exemples de questions — Analyse de base

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Dérivées usuelles (`g6-deriv-usual`, Gymnase)

_La table : xⁿ, √x, 1/x, eˣ, aˣ, ln x, sin, cos, tan, arctan, sinh, cosh._

### Niveau 1

```
Calcule f′(x) pour f(x) = 5/x − 3/x² − 4/x³, à l'aide de la table.
  [guided]  (5/x − 3/x² − 4/x³)′
    (En puissances : 5/x = 5x^−1, −3/x² = −3x^−2, −4/x³ = −4x^−3.)
    = 5(x^(□))′ − 3(x^(□))′ − 4(x^(□))′   (trous : 5(x^(−1))′ − 3(x^(−2))′ − 4(x^(−3))′)   ← Linéarité, réécrire en puissances
    = −5x^(□) + 6x^(□) + 12x^(□)   (trous : −5x^(−2) + 6x^(−3) + 12x^(−4))   ← Table : (xⁿ)′ = nxⁿ⁻¹
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −5/x² + 6/x³ + □ | = −5/x² + 6/x³ + 12/x⁴
  pièges : g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = −4x⁵ + 6/√x − 3/x + 2/x², à l'aide de la table.
  [guided]  (−4x⁵ + 6/√x − 3/x + 2/x²)′
    (En puissances : 6/√x = 6x^(−1/2), −3/x = −3x^−1, 2/x² = 2x^−2.)
    = −4(x⁵)′ + 6(x^(□))′ − 3(x^(□))′ + 2(x^(□))′   (trous : −4(x⁵)′ + 6(x^(−1/2))′ − 3(x^(−1))′ + 2(x^(−2))′)   ← Linéarité, réécrire en puissances
    = −20x^□ − 3x^(□) + 3x^(□) − 4x^(□)   (trous : −20x⁴ − 3x^(−3/2) + 3x^(−2) − 4x^(−3))   ← Table : (xⁿ)′ = nxⁿ⁻¹
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −20x⁴ − 3/(x√x) + 3/x² − □ | = −20x⁴ − 3/(x√x) + 3/x² − 4/x³
  pièges : g6_quotient_sign, g6_quotient_no_square

Dérive f(x) = x² + 4/x.
  [guided]  (x² + 4/x)′
    (En puissances : 4/x = 4x^−1.)
    = (x²)′ + 4(x^(□))′   (trous : (x²)′ + 4(x^(−1))′)   ← Linéarité, réécrire en puissances
    = 2x − 4x^(□)   (trous : 2x − 4x^(−2))   ← Table : (xⁿ)′ = nxⁿ⁻¹
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = 2x − □ | = 2x − 4/x²
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 2

```
Calcule f′(x) pour f(x) = 4x³ − 6/x², à l'aide de la table.
  [guided]  (4x³ − 6/x²)′
    = 4(x³)′ − 6(□)′   (trous : 4(x³)′ − 6(x^(−2))′)   ← Linéarité, réécrire en puissances
    ? Quelle règle pour dériver <math alttext="4x³"><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow></math> ? · (aˣ)′ = aˣ·ln a / ✔ (xⁿ)′ = nxⁿ⁻¹ / · (xⁿ)′ = xⁿ⁻¹
    = □ − 6(x^(−2))′   (trous : 12x² − 6(x^(−2))′)   ← Table, premier terme
    = 12x² + □   (trous : 12x² + 12/x³)   ← Terme suivant
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = 12x² + □ | = 12x² + 12/x³
  pièges : g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = 2x⁴ − 6x² + 1/x², à l'aide de la table.
  [guided]  (2x⁴ − 6x² + 1/x²)′
    = 2(x⁴)′ − 6(x²)′ + (□)′   (trous : 2(x⁴)′ − 6(x²)′ + (x^(−2))′)   ← Linéarité, réécrire en puissances
    ? Quelle règle pour dériver <math alttext="2x⁴"><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>4</mn></msup></mrow></math> ? · (xⁿ)′ = xⁿ⁻¹ / · (aˣ)′ = aˣ·ln a / ✔ (xⁿ)′ = nxⁿ⁻¹
    = □ − 6(x²)′ + (x^(−2))′   (trous : 8x³ − 6(x²)′ + (x^(−2))′)   ← Table, premier terme
    = 8x³ − □ + (x^(−2))′   (trous : 8x³ − 12x + (x^(−2))′)   ← Terme suivant
    = 8x³ − 12x − □   (trous : 8x³ − 12x − 2/x³)   ← Terme suivant
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = 8x³ − 12x − □ | = 8x³ − 12x − 2/x³
  pièges : g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = 2/x³ − 3ln(x), à l'aide de la table.
  [guided]  (2/x³ − 3ln(x))′
    = 2(□)′ − 3(ln(x))′   (trous : 2(x^(−3))′ − 3(ln(x))′)   ← Linéarité, réécrire en puissances
    ? Quelle règle pour dériver <math alttext="2/x³"><mfrac><mn>2</mn><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mfrac></math> ? · (arctan x)′ = 1/(1 + x²) / ✔ (xⁿ)′ = nxⁿ⁻¹ / · (xⁿ)′ = xⁿ⁻¹
    = □ − 3(ln(x))′   (trous : −6/x⁴ − 3(ln(x))′)   ← Table, premier terme
    = −6/x⁴ − □   (trous : −6/x⁴ − 3/x)   ← Terme suivant
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −6/x⁴ − □ | = −6/x⁴ − 3/x
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 3

```
Dérive f(x) = 5/x³ − 5·2^x − 2e^x.
  [tap, suivre l'erreur, menu steps]  (5/x³ − 5·2^x − 2e^x)′
    = 5(x^(−3))′ − 5(2^x)′ − 2(e^x)′   ← Linéarité, réécrire en puissances
    = −15/x⁴ − 5·2^x·ln(2) − 2e^x   ← Table des dérivées
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −15/x⁴ − 5·2^x·ln(2) − □ | = −15/x⁴ − 5·2^x·ln(2) − 2e^x
  pièges : g6_quotient_sign, g6_quotient_no_square, g6_power_rule_exp

Calcule f′(x) pour f(x) = 2x√x + 3ln(x) + 4·2^x, à l'aide de la table.
  [tap, suivre l'erreur, menu steps]  (2x√x + 3ln(x) + 4·2^x)′
    = 2(x^(3/2))′ + 3(ln(x))′ + 4(2^x)′   ← Linéarité, réécrire en puissances
    = 3√x + 3/x + 4·2^x·ln(2)   ← Table des dérivées
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = 3√x + 3/x + □ | = 3√x + 3/x + 4·2^x·ln(2)
  pièges : g6_product_naive, g6_power_rule_exp

Calcule f′(x) pour f(x) = 4/x + sin(x) + 3ln(x), à l'aide de la table.
  [tap, suivre l'erreur, menu steps]  (4/x + sin(x) + 3ln(x))′
    = 4(x^(−1))′ + (sin(x))′ + 3(ln(x))′   ← Linéarité, réécrire en puissances
    = −4/x² + cos(x) + 3/x   ← Table des dérivées
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −4/x² + cos(x) + □ | = −4/x² + cos(x) + 3/x
  pièges : g6_quotient_sign, g6_quotient_no_square, g6_cos_sign

```

### Niveau 4

```
Dérive f(x) = sin(x) − 5ln(x) − 5cosh(x).
  [free, suivre l'erreur]  (sin(x) − 5ln(x) − 5cosh(x))′
    = (sin(x))′ − 5(ln(x))′ − 5(cosh(x))′   ← Linéarité : les constantes sortent
    = cos(x) − 5/x − 5sinh(x)   ← Table des dérivées
  aides : Dérive terme par terme avec la table ; les constantes restent devant. | = cos(x) − 5/x − □ | = cos(x) − 5/x − 5sinh(x)
  pièges : g6_cos_sign

Calcule f′(x) pour f(x) = −4x⁵ + 3x³ − 4/x − 4/x³, à l'aide de la table.
  [free, suivre l'erreur]  (−4x⁵ + 3x³ − 4/x − 4/x³)′
    = −4(x⁵)′ + 3(x³)′ − 4(x^(−1))′ − 4(x^(−3))′   ← Linéarité, réécrire en puissances
    = −20x⁴ + 9x² + 4/x² + 12/x⁴   ← Table des dérivées
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −20x⁴ + 9x² + 4/x² + □ | = −20x⁴ + 9x² + 4/x² + 12/x⁴
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = −5x⁵ + 3x² − 2/√x + 5/x³. Dérive f, puis calcule f′(1).
  [free, suivre l'erreur]  (−5x⁵ + 3x² − 2/√x + 5/x³)′
    = −5(x⁵)′ + 3(x²)′ − 2(x^(−1/2))′ + 5(x^(−3))′   ← Linéarité, réécrire en puissances
    = −25x⁴ + 6x + 1/(x√x) − 15/x⁴   ← Table des dérivées
  — Calcule f′(1).  [juge value]  départ : −25·1⁴ + 6·1 + 1/(1√1) − 15/1⁴
    = −33   ← f′(1)
  aides : Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. | = −25x⁴ + 6x + 1/(x√x) − □ | = −25x⁴ + 6x + 1/(x√x) − 15/x⁴
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 5

```
Série rapide, sans aide : dérive les six fonctions.
  [free, sans aide]  (5·2^x − 3x³)′
    (f₁(x) = 5·2^x − 3x³)
    = 5·2^x·ln(2) − 9x²   ← Table
  — f₂(x) = −2arctan(x) − x²  [juge equiv]  départ : (−2arctan(x) − x²)′
    = −2/(1 + x²) − 2x   ← Table
  — f₃(x) = 2sin(x) − x³  [juge equiv]  départ : (2sin(x) − x³)′
    = 2cos(x) − 3x²   ← Table
  — f₄(x) = −2ln(x)  [juge equiv]  départ : (−2ln(x))′
    = −2/x   ← Table
  — f₅(x) = cosh(x)  [juge equiv]  départ : (cosh(x))′
    = sinh(x)   ← Table
  — f₆(x) = sinh(x) − 2x²  [juge equiv]  départ : (sinh(x) − 2x²)′
    = cosh(x) − 4x   ← Table
  pièges : g6_power_rule_exp

Série rapide, sans aide : dérive les six fonctions.
  [free, sans aide]  (−3e^x)′
    (f₁(x) = −3e^x)
    = −3e^x   ← Table
  — f₂(x) = −cosh(x)  [juge equiv]  départ : (−cosh(x))′
    = −sinh(x)   ← Table
  — f₃(x) = 5sinh(x)  [juge equiv]  départ : (5sinh(x))′
    = 5cosh(x)   ← Table
  — f₄(x) = −sin(x) + 3x³  [juge equiv]  départ : (−sin(x) + 3x³)′
    = −cos(x) + 9x²   ← Table
  — f₅(x) = 4/√x  [juge equiv]  départ : (4/√x)′
    = −2/(x√x)   ← Table
  — f₆(x) = −4tan(x)  [juge equiv]  départ : (−4tan(x))′
    = −4/cos(x)²   ← Table
  pièges : g6_power_rule_exp

Série rapide, sans aide : dérive les six fonctions.
  [free, sans aide]  (−4x²)′
    (f₁(x) = −4x²)
    = −8x   ← Table
  — f₂(x) = 3/x³  [juge equiv]  départ : (3/x³)′
    = −9/x⁴   ← Table
  — f₃(x) = 3sin(x)  [juge equiv]  départ : (3sin(x))′
    = 3cos(x)   ← Table
  — f₄(x) = 4cosh(x)  [juge equiv]  départ : (4cosh(x))′
    = 4sinh(x)   ← Table
  — f₅(x) = tan(x) + 3x³  [juge equiv]  départ : (tan(x) + 3x³)′
    = 1/cos(x)² + 9x²   ← Table
  — f₆(x) = −2sinh(x)  [juge equiv]  départ : (−2sinh(x))′
    = −2cosh(x)   ← Table

```

### Variantes d'examen

```
Quelle est la dérivée de f(x) = −3/x² + 2^x − 2cos(x) ?
  · 6/x³ + x·2^(x − 1) − 2sin(x) [g6_power_rule_exp]   · 6/x³ + 2^x·ln(2) − 2sin(x) [g6_cos_sign]   · 6/x³ + x·2^(x − 1) + 2sin(x) [g6_power_rule_exp]   ✔ 6/x³ + 2^x·ln(2) + 2sin(x)
  [examen mcq]
  pièges : g6_power_rule_exp, g6_cos_sign

Vrai ou faux ?
  « Pour tout x : (arctan x)′ = 1/(1 + x²). » → VRAI
  [examen tf]

```

## Règles de dérivation : produit, quotient, chaîne (`g6-deriv-rules`, Gymnase)

_(uv)′, (u/v)′ et (f∘g)′, une règle à la fois._

### Niveau 1

```
Dérive f(x) = (x² − 1)·sin(2x).
  [guided]  ((x² − 1)·sin(2x))′
    (C'est un produit : (uv)′ = u′v + uv′, avec u = x² − 1 et v = sin(2x).)
    = □·sin(2x) + (x² − 1)·□   (trous : 2x·sin(2x) + (x² − 1)·2cos(2x))   ← Règle du produit, avec les dérivées usuelles
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x² − 1 et v = sin(2x). | = □·sin(2x) + (x² − 1)·□ | = 2x·sin(2x) + 2(x² − 1)·cos(2x)
  pièges : g6_product_naive, g6_chain_forgot

Calcule f′(x) pour f(x) = 3x·e^(5x).
  [guided]  (3x·e^(5x))′
    (C'est un produit : (uv)′ = u′v + uv′, avec u = 3x et v = e^(5x).)
    = □e^(5x) + 3x·□   (trous : 3e^(5x) + 3x·5e^(5x))   ← Règle du produit, avec les dérivées usuelles
    = □e^(5x) + □x·e^(5x)   (trous : 3e^(5x) + 15x·e^(5x))   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = 3x et v = e^(5x). | = □e^(5x) + 3x·□ | = 3e^(5x) + 15x·e^(5x)
  pièges : g6_product_naive, g6_chain_forgot

Dérive f(x) = (x² − 3)·cos(3x).
  [guided]  ((x² − 3)·cos(3x))′
    (C'est un produit : (uv)′ = u′v + uv′, avec u = x² − 3 et v = cos(3x).)
    = □·cos(3x) + (x² − 3)·(□)   (trous : 2x·cos(3x) + (x² − 3)·(−3sin(3x)))   ← Règle du produit, avec les dérivées usuelles
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x² − 3 et v = cos(3x). | = □·cos(3x) + (x² − 3)·(□) | = 2x·cos(3x) − 3(x² − 3)·sin(3x)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 2

```
Calcule f′(x) pour f(x) = (2x + 3)/(x² + 2).
  [guided]  ((2x + 3)/(x² + 2))′
    ? Quelle règle d'abord ? · Règle du produit / ✔ Règle du quotient / · Règle de chaîne
    = (□ − □)/(x² + 2)²   (trous : (2(x² + 2) − (2x + 3)·2x)/(x² + 2)²)   ← Règle du quotient, avec les dérivées usuelles
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = 2x + 3 et v = x² + 2. | = (□(x² + 2) − (2x + 3)·□)/(x² + 2)² | = (−2x² − 6x + 4)/(x² + 2)²
  pièges : g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = (2x + 1)/(x² + 1).
  [guided]  ((2x + 1)/(x² + 1))′
    ? Quelle règle d'abord ? · Règle du produit / ✔ Règle du quotient / · Règle de chaîne
    = (□ − □)/(x² + 1)²   (trous : (2(x² + 1) − (2x + 1)·2x)/(x² + 1)²)   ← Règle du quotient, avec les dérivées usuelles
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = 2x + 1 et v = x² + 1. | = (□(x² + 1) − (2x + 1)·□)/(x² + 1)² | = (−2x² − 2x + 2)/(x² + 1)²
  pièges : g6_quotient_sign, g6_quotient_no_square

Dérive f(x) = (3x + 3)·sin(5x).
  [guided]  ((3x + 3)·sin(5x))′
    ? Quelle règle d'abord ? ✔ Règle du produit / · Règle du quotient / · Règle de chaîne
    = □ + □   (trous : 3sin(5x) + (3x + 3)·5cos(5x))   ← Règle du produit, avec les dérivées usuelles
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = 3x + 3 et v = sin(5x). | = □sin(5x) + (3x + 3)·□ | = 3sin(5x) + 5(3x + 3)·cos(5x)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 3

```
Dérive f(x) = e^(2x)·cos(3x).
  [tap, suivre l'erreur, menu deriv]  (e^(2x)·cos(3x))′
    = (e^(2x))′·cos(3x) + e^(2x)·(cos(3x))′   ← Règle du produit
    = e^(2x)·(2x)′·cos(3x) − e^(2x)·sin(3x)·(3x)′   ← Règle de chaîne
    = 2e^(2x)·cos(3x) − 3e^(2x)·sin(3x)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = e^(2x) et v = cos(3x). | = □·cos(3x) + e^(2x)·(□) | = 2e^(2x)·cos(3x) − 3e^(2x)·sin(3x)
  pièges : g6_product_naive, g6_chain_forgot

Calcule f′(x) pour f(x) = x²/(x + 4).
  [tap, suivre l'erreur, menu deriv]  (x²/(x + 4))′
    = ((x²)′·(x + 4) − x²·(x + 4)′)/(x + 4)²   ← Règle du quotient
    = (x² + 8x)/(x + 4)²   ← Simplifier
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = x² et v = x + 4. | = (□·(x + 4) − x²)/(x + 4)² | = (x² + 8x)/(x + 4)²
  pièges : g6_quotient_sign, g6_quotient_no_square

Dérive f(x) = √(x² + 3).
  [tap, suivre l'erreur, menu deriv]  (√(x² + 3))′
    = 1/(2√(x² + 3))·(x² + 3)′   ← Règle de chaîne
    = x/√(x² + 3)   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = x² + 3 : (f∘g)′ = f′(g)·g′. | = 1/(2√(x² + 3))·□ | = x/√(x² + 3)
  pièges : g6_chain_forgot

```

### Niveau 4

```
Calcule f′(x) pour f(x) = x·sin(x²).
  [free, suivre l'erreur]  (x·sin(x²))′
    = sin(x²) + x·(sin(x²))′   ← Règle du produit
    ? Quelle règle as-tu utilisée en premier ? → (uv)′ = u′v + uv′
    = sin(x²) + x·cos(x²)·(x²)′   ← Règle de chaîne
    = sin(x²) + 2x²·cos(x²)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x et v = sin(x²). | = sin(x²) + x·□ | = sin(x²) + 2x²·cos(x²)
  pièges : g6_product_naive, g6_chain_forgot

Dérive f(x) = x²·e^(x²).
  [free, suivre l'erreur]  (x²·e^(x²))′
    = (x²)′·e^(x²) + x²·(e^(x²))′   ← Règle du produit
    ? Quelle règle as-tu utilisée en premier ? → (uv)′ = u′v + uv′
    = 2x·e^(x²) + x²·e^(x²)·(x²)′   ← Règle de chaîne, avec les dérivées usuelles
    = 2x·e^(x²) + 2x³·e^(x²)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x² et v = e^(x²). | = □·e^(x²) + x²·□ | = 2x·e^(x²) + 2x³·e^(x²)
  pièges : g6_product_naive, g6_chain_forgot

Calcule f′(x) pour f(x) = (x − 5)/(x² + 2).
  [free, suivre l'erreur]  ((x − 5)/(x² + 2))′
    = ((x − 5)′·(x² + 2) − (x − 5)·(x² + 2)′)/(x² + 2)²   ← Règle du quotient
    ? Quelle règle as-tu utilisée en premier ? → (u/v)′ = (u′v − uv′)/v²
    = (−x² + 10x + 2)/(x² + 2)²   ← Simplifier
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = x − 5 et v = x² + 2. | = ((x² + 2) − (x − 5)·□)/(x² + 2)² | = (−x² + 10x + 2)/(x² + 2)²
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 5

```
Soit f(x) = x²/(x + 5). Dérive f, puis calcule f′(0).
  [free, sans aide]  (x²/(x + 5))′
    = ((x²)′·(x + 5) − x²·(x + 5)′)/(x + 5)²   ← Règle du quotient
    = (x² + 10x)/(x + 5)²   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : (0² + 10·0)/(0 + 5)²
    = 0   ← f′(0) = 0
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = (3x − 3)/(x² + 4). Dérive f, puis calcule f′(1).
  [free, sans aide]  ((3x − 3)/(x² + 4))′
    = ((3x − 3)′·(x² + 4) − (3x − 3)·(x² + 4)′)/(x² + 4)²   ← Règle du quotient
    = (−3x² + 6x + 12)/(x² + 4)²   ← Simplifier
  — Calcule maintenant f′(1).  [juge value]  départ : (−3·1² + 6·1 + 12)/(1² + 4)²
    = 3/5   ← f′(1) = 3/5
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = e^(3x)·sin(3x). Dérive f, puis calcule f′(0).
  [free, sans aide]  (e^(3x)·sin(3x))′
    = (e^(3x))′·sin(3x) + e^(3x)·(sin(3x))′   ← Règle du produit
    = e^(3x)·(3x)′·sin(3x) + e^(3x)·cos(3x)·(3x)′   ← Règle de chaîne
    = 3e^(3x)·sin(3x) + 3e^(3x)·cos(3x)   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : 3e^(3·0)·sin(3·0) + 3e^(3·0)·cos(3·0)
    = 3   ← f′(0) = 3
  pièges : g6_product_naive, g6_chain_forgot

```

### Variantes d'examen

```
Quelle est la dérivée de f(x) = (4x − 1)/(x² + 2) ?
  · (12x² − 2x + 8)/(x² + 2)² [g6_quotient_sign]   ✔ (−4x² + 2x + 8)/(x² + 2)²   · (4x² − 2x − 8)/(x² + 2)² [g6_quotient_sign]   · (−4x² + 2x + 8)/(x² + 2) [g6_quotient_no_square]
  [examen mcq]
  pièges : g6_quotient_sign, g6_quotient_no_square

Vrai ou faux ? (e^(x²))′ = e^(x²)
  · Vrai [g6_chain_forgot]   ✔ Faux
  [examen tf]
  pièges : g6_chain_forgot

Soit f(x) = x²·(x² + 3)³. Dérive f, puis calcule f′(0).
  [free, sans aide, examen coef]  (x²·(x² + 3)³)′
    = (x²)′·(x² + 3)³ + x²·((x² + 3)³)′   ← Règle du produit
    = 2x·(x² + 3)³ + 3x²·(x² + 3)²·(x² + 3)′   ← Règle de chaîne, avec les dérivées usuelles
    = 2x·(x² + 3)³ + 6x³·(x² + 3)²   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : 2·0(0² + 3)³ + 6·0³·(0² + 3)²
    = 0   ← f′(0) = 0
  pièges : g6_product_naive, g6_chain_forgot

Calcule f′(x) pour f(x) = x·sin(2x² + 3).
  [free, sans aide, examen open]  (x·sin(2x² + 3))′
    = sin(2x² + 3) + x·(sin(2x² + 3))′   ← Règle du produit
    = sin(2x² + 3) + x·cos(2x² + 3)·(2x² + 3)′   ← Règle de chaîne
    = sin(2x² + 3) + 4x²·cos(2x² + 3)   ← Simplifier
  pièges : g6_product_naive, g6_chain_forgot

```

## Tangente et approximation linéaire (`g6-tangent`, Gymnase)

_y = f(a) + f′(a)(x − a), et f(a + h) ≈ f(a) + f′(a)·h._

### Niveau 1

```
Soit f(x) = x³ − 2x² + 2x − 2. Donne la tangente à son graphe au point d'abscisse 3, sous la forme y = mx + p.
  [guided]  3³ − 2·3² + 2·3 − 2
    (On donne f′(x) = 3x² − 4x + 2.)
    (Valeur en a = 3 :)
    = 13   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 3·3² − 4·3 + 2
    = 17   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ + □(x − 3)   (trous : 13 + 17(x − 3))   ← y = f(a) + f′(a)(x − a)
    = 17x − □   (trous : 17x − 38)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = 13 + □(x − 3) | y = 17x − 38

Équation de la tangente au graphe de f(x) = √(x) en a = 9.
  [guided]  √(9)
    (On donne f′(x) = 1/(2√(x)).)
    (Valeur en a = 9 :)
    = 3   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 1/(2√(9))
    = 1/6   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ + (□)(x − 9)   (trous : 3 + (1/6)(x − 9))   ← y = f(a) + f′(a)(x − a)
    = (1/6)x + □   (trous : (1/6)x + 3/2)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = 3 + (□)(x − 9) | y = (1/6)x + 3/2

Équation de la tangente au graphe de f(x) = −2ln(x) − 2x en a = 1.
  [guided]  −2·ln(1) − 2·1
    (On donne f′(x) = −2/x − 2.)
    (Valeur en a = 1 :)
    = −2   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : −2/1 − 2
    = −4   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ − □(x − 1)   (trous : −2 − 4(x − 1))   ← y = f(a) + f′(a)(x − a)
    = −4x + □   (trous : −4x + 2)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = −2 − □(x − 1) | y = −4x + 2

```

### Niveau 2

```
Soit f(x) = ln(x) − 3x. Donne la tangente à son graphe au point d'abscisse 1, sous la forme y = mx + p.
  [guided]  (ln(x) − 3x)′
    (Dérive f.)
    = 1/x − 3   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : ln(1) − 3·1
    = −3   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 1/1 − 3
    = −2   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ − □(x − 1)   (trous : −3 − 2(x − 1))   ← y = f(a) + f′(a)(x − a)
    = −2x − □   (trous : −2x − 1)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = −3 − □(x − 1) | y = −2x − 1

Équation de la tangente au graphe de f(x) = −3ln(x) − 3x en a = 1.
  [guided]  (−3ln(x) − 3x)′
    (Dérive f.)
    = −3/x − 3   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : −3·ln(1) − 3·1
    = −3   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : −3/1 − 3
    = −6   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ − □(x − 1)   (trous : −3 − 6(x − 1))   ← y = f(a) + f′(a)(x − a)
    = −6x + □   (trous : −6x + 3)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = −3 − □(x − 1) | y = −6x + 3

Soit f(x) = x³ + 4x² + x + 3. Donne la tangente à son graphe au point d'abscisse −1, sous la forme y = mx + p.
  [guided]  (x³ + 4x² + x + 3)′
    (Dérive f.)
    = 3x² + 8x + 1   ← Dériver
  — Valeur en a = −1 :  [juge value]  départ : (−1)³ + 4(−1)² + (−1) + 3
    = 5   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 3(−1)² + 8(−1) + 1
    = −4   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = □ − □(x + 1)   (trous : 5 − 4(x + 1))   ← y = f(a) + f′(a)(x − a)
    = −4x + □   (trous : −4x + 1)   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = 5 − □(x + 1) | y = −4x + 1

```

### Niveau 3

```
Équation de la tangente au graphe de f(x) = 2ln(x) − x en a = 1.
  [tap, suivre l'erreur, menu steps]  (2ln(x) − x)′
    (Dérive f.)
    = 2/x − 1   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : 2ln(1) − 1
    = −1   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 2/1 − 1
    = 1   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = −1 + (x − 1)   ← y = f(a) + f′(a)(x − a)
    = x − 2   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = −□ + (x − 1) | y = x − 2

Donne une valeur approchée de √16,1 (fraction exacte) par l'approximation linéaire de f(x) = √x en a = 16.
  [tap, suivre l'erreur, menu steps]  (√x)′
    (Dérive f(x) = √x.)
    = 1/(2√x)   ← Table
  — Pente en a = 16 :  [juge value]  départ : 1/(2√16)
    = 1/8   ← Pente en a
  — Approximation linéaire, avec h = 0,1 :  [juge value]  départ : √(16,1)
    = 4 + 1/8·(1/10)   ← f(a) + f′(a)·h
    = 321/80   ← Calculer
  aides : f(a + h) ≈ f(a) + f′(a)·h, avec f′(x) = 1/(2√x). | √16,1 ≈ 4 + □·(1/10) | 4 + 1/8·(1/10) = 321/80

Équation de la tangente au graphe de f(x) = 3ln(x) + 2x en a = 1.
  [tap, suivre l'erreur, menu steps]  (3ln(x) + 2x)′
    (Dérive f.)
    = 3/x + 2   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : 3ln(1) + 2·1
    = 2   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 3/1 + 2
    = 5   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = 2 + 5(x − 1)   ← y = f(a) + f′(a)(x − a)
    = 5x − 3   ← Développer
  aides : y = f(a) + f′(a)(x − a) : calcule f(a) et f′(a) en a, puis écris la droite. | y = 2 + □(x − 1) | y = 5x − 3

```

### Niveau 4

```
Donne une valeur approchée de √4,1 (fraction exacte) par l'approximation linéaire de f(x) = √x en a = 4.
  [free, suivre l'erreur]  (√x)′
    (Dérive f(x) = √x.)
    = 1/(2√x)   ← Table
  — Pente en a = 4 :  [juge value]  départ : 1/(2√4)
    = 1/4   ← Pente en a
  — Approximation linéaire, avec h = 0,1 :  [juge value]  départ : √(4,1)
    = 2 + 1/4·(1/10)   ← f(a) + f′(a)·h
    = 81/40   ← Calculer
  aides : f(a + h) ≈ f(a) + f′(a)·h, avec f′(x) = 1/(2√x). | √4,1 ≈ 2 + □·(1/10) | 2 + 1/4·(1/10) = 81/40

Soit f(x) = x² − 3x + 1. En quel point la tangente au graphe de f est-elle parallèle à la droite y = −7x + 1 ? Donne l'équation de cette tangente.
  [free, suivre l'erreur]  (x² − 3x + 1)′
    (Dérive f.)
    = 2x − 3   ← Dériver
  — Même pente que la droite : f′(x) = −7.  [juge solset]  départ : 2x − 3 = −7
    = x = −2   ← Résoudre
  — Valeur en a = −2 :  [juge value]  départ : (−2)² − 3(−2) + 1
    = 11   ← Remplacer x par a
  — Tangente :  [juge equiv]  départ : y
    = 11 − 7(x + 2)   ← y = f(a) + f′(a)(x − a)
    = −7x − 3   ← Développer
  aides : Deux droites parallèles ont la même pente : résous f′(x) = −7. | x = −2, puis y = f(−2) − 7(x + 2) avec f(−2) = □ | y = −7x − 3

Soit f(x) = x² + 3x. En quel point la tangente au graphe de f est-elle parallèle à la droite y = −x − 3 ? Donne l'équation de cette tangente.
  [free, suivre l'erreur]  (x² + 3x)′
    (Dérive f.)
    = 2x + 3   ← Dériver
  — Même pente que la droite : f′(x) = −1.  [juge solset]  départ : 2x + 3 = −1
    = x = −2   ← Résoudre
  — Valeur en a = −2 :  [juge value]  départ : (−2)² + 3(−2)
    = −2   ← Remplacer x par a
  — Tangente :  [juge equiv]  départ : y
    = −2 − (x + 2)   ← y = f(a) + f′(a)(x − a)
    = −x − 4   ← Développer
  aides : Deux droites parallèles ont la même pente : résous f′(x) = −1. | x = −2, puis y = f(−2) − (x + 2) avec f(−2) = □ | y = −x − 4

```

### Niveau 5

```
Soit f(x) = e^(−x + 1). Donne la tangente à son graphe en a = 1, puis une valeur approchée de f(1,1) (fraction exacte).
  [free, sans aide]  (e^(−x + 1))′
    (Dérive f.)
    = −e^(−x + 1)   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : e^(−1 + 1)
    = 1   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : −e^(−1 + 1)
    = −1   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = 1 − (x − 1)   ← y = f(a) + f′(a)(x − a)
    = −x + 2   ← Développer
  — Avec la tangente, donne une valeur approchée de f(1,1).  [juge value]  départ : f(1,1)
    = 9/10   ← f(a + h) ≈ f(a) + f′(a)·h
  pièges : g6_chain_forgot, g2_exp_sum, g6_power_rule_exp

Soit f(x) = −3ln(x) − 3x. Donne la tangente à son graphe en a = 1, puis une valeur approchée de f(0,9) (fraction exacte).
  [free, sans aide]  (−3ln(x) − 3x)′
    (Dérive f.)
    = −3/x − 3   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : −3·ln(1) − 3·1
    = −3   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : −3/1 − 3
    = −6   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = −3 − 6(x − 1)   ← y = f(a) + f′(a)(x − a)
    = −6x + 3   ← Développer
  — Avec la tangente, donne une valeur approchée de f(0,9).  [juge value]  départ : f(0,9)
    = −12/5   ← f(a + h) ≈ f(a) + f′(a)·h

Soit f(x) = x³ + x. Donne la tangente à son graphe en a = 2, puis une valeur approchée de f(2,1) (fraction exacte).
  [free, sans aide]  (x³ + x)′
    (Dérive f.)
    = 3x² + 1   ← Dériver
  — Valeur en a = 2 :  [juge value]  départ : 2³ + 2
    = 10   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 3·2² + 1
    = 13   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = 10 + 13(x − 2)   ← y = f(a) + f′(a)(x − a)
    = 13x − 16   ← Développer
  — Avec la tangente, donne une valeur approchée de f(2,1).  [juge value]  départ : f(2,1)
    = 113/10   ← f(a + h) ≈ f(a) + f′(a)·h

```

### Variantes d'examen

```
Quelle est la tangente au graphe de f(x) = 2x³ + 3x² − x − 3 en a = 1 ?
  · y = 11x + 1   ✔ y = 11x − 10   · y = 1 + (6x² + 6x − 1)(x − 1) [g6_tangent_slope_function]   · y = x + 10
  [examen mcq]
  pièges : g6_tangent_slope_function

La tangente au graphe de f(x) = x³ − 4x² + 3x − 1 en a = 1 s'écrit y = mx + p. Donne p (l'ordonnée à l'origine).
  → 1
  [examen coef]

Soit f(x) = e^(2x − 2). Donne la tangente à son graphe au point d'abscisse 1, sous la forme y = mx + p.
  [free, sans aide, examen open]  (e^(2x − 2))′
    (Dérive f.)
    = 2e^(2x − 2)   ← Dériver
  — Valeur en a = 1 :  [juge value]  départ : e^(2·1 − 2)
    = 1   ← Remplacer x par a
  — Pente de la tangente :  [juge value]  départ : 2e^(2·1 − 2)
    = 2   ← Pente en a
  — Tangente :  [juge equiv]  départ : y
    = 1 + 2(x − 1)   ← y = f(a) + f′(a)(x − a)
    = 2x − 1   ← Développer
  pièges : g6_chain_forgot, g2_exp_sum, g6_power_rule_exp

```

## Limites de fonctions pour l'étude de fonction (`g6-limits`, CMS)

_Terme dominant en ±∞, signe à gauche et à droite d'un pôle, expression conjuguée._

### Niveau 1

```
Calcule lim_{x→−∞} (3x² − 3x)/(x³ + 2x² − 5x − 6).
  [guided]  (3x² − 3x)/(x³ + 2x² − 5x − 6)
    = □(3 − 3/x)/(x³(1 + 2/x − 5/x² − 6/x³))   (trous : x²(3 − 3/x)/(x³(1 + 2/x − 5/x² − 6/x³)))   ← Mettre en évidence le terme dominant
    = (□ − 3/x)/(x(1 + 2/x − 5/x² − 6/x³))   (trous : (3 − 3/x)/(x(1 + 2/x − 5/x² − 6/x³)))   ← Simplifier par x²
    = □   (trous : 0)   ← Le dénominateur tend vers l'infini
  aides : En ±∞ : mets en évidence la plus grande puissance de x en haut et en bas. | = □(3 − 3/x)/(x³(1 + 2/x − 5/x² − 6/x³)) | = x²(3 − 3/x)/(x³(1 + 2/x − 5/x² − 6/x³)), et la limite vaut 0.
  pièges : a1_bh_quotient_rule

Calcule la limite de f(x) = √(x² − 6x) − x quand x → +∞.
  [guided]  √(x² − 6x) − x
    = (□)/(√(x² − 6x) + x)   (trous : (−6x)/(√(x² − 6x) + x))   ← Multiplier et diviser par la conjuguée
    = −□/(√(1 − 6/x) + 1)   (trous : −6/(√(1 − 6/x) + 1))   ← Diviser par x (x > 0)
    = □   (trous : −3)   ← Passer à la limite
  aides : ∞ − ∞ avec une racine : multiplie et divise par l'expression conjuguée. | = (□)/(√(x² − 6x) + x) | = (−6x)/(√(x² − 6x) + x), et la limite vaut −3.
  pièges : g6_infinity_minus_infinity

Calcule lim_{x→−∞} (√(x² + 8x) + x).
  [guided]  √(x² + 8x) + x
    = (□)/(√(x² + 8x) − x)   (trous : (8x)/(√(x² + 8x) − x))   ← Multiplier et diviser par la conjuguée
    = □/(−√(1 + 8/x) − 1)   (trous : 8/(−√(1 + 8/x) − 1))   ← Diviser par x : x < 0, donc √(x²) = −x
    = □   (trous : −4)   ← Passer à la limite
  aides : ∞ − ∞ avec une racine : multiplie et divise par l'expression conjuguée. | = (□)/(√(x² + 8x) − x) | = (8x)/(√(x² + 8x) − x), et la limite vaut −4.
  pièges : g6_infinity_minus_infinity, g6_sqrt_x2_abs

```

### Niveau 2

```
Calcule lim_{x→∞} √(4x² + 4)/(−2x − 5).
  [guided]  √(4x² + 4)/(−2x − 5)
    ? Quelle méthode ? ✔ Mettre en évidence le terme dominant / · Expression conjuguée
    = √(x²(□))/(x(−2 − 5/x))   (trous : √(x²(4 + 4/x²))/(x(−2 − 5/x)))   ← Mettre en évidence x² sous la racine, x en bas
    = √(4 + 4/x²)/(□)   (trous : √(4 + 4/x²)/(−2 − 5/x))   ← √(x²) = x pour x > 0
    = −1   ← Passer à la limite
  aides : Mets x² en évidence sous la racine : √(x²) = |x|, et |x| = −x quand x → −∞. | = √(x²(□))/(x(−2 − 5/x)) | = √(x²(4 + 4/x²))/(x(−2 − 5/x)), et la limite vaut −1.
  pièges : a1_bh_quotient_rule

Calcule la limite de f(x) = √(4x² + 1)/(−x + 1) quand x → +∞.
  [guided]  √(4x² + 1)/(−x + 1)
    ? Quelle méthode ? ✔ Mettre en évidence le terme dominant / · Expression conjuguée
    = √(x²(□))/(x(−1 + 1/x))   (trous : √(x²(4 + 1/x²))/(x(−1 + 1/x)))   ← Mettre en évidence x² sous la racine, x en bas
    = √(4 + 1/x²)/(□)   (trous : √(4 + 1/x²)/(−1 + 1/x))   ← √(x²) = x pour x > 0
    = −2   ← Passer à la limite
  aides : Mets x² en évidence sous la racine : √(x²) = |x|, et |x| = −x quand x → −∞. | = √(x²(□))/(x(−1 + 1/x)) | = √(x²(4 + 1/x²))/(x(−1 + 1/x)), et la limite vaut −2.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule

Soit f(x) = (3x − 9)/((x − 2)²). Calcule les limites de f à gauche et à droite de 2.
  [guided]  3·2 − 9
    (Le numérateur en x = 2 :)
    = −3   ← Pas nul : le pôle donne ±∞
  — Limite quand x → 2⁻ :  [juge limit]  départ : (3x − 9)/((x − 2)²)
    ? Quand x → 2⁻, le dénominateur tend vers 0 par valeurs… ✔ positives (0⁺) / · négatives (0⁻)
    = −∞   ← −3/0⁺
  — Limite quand x → 2⁺ :  [juge limit]  départ : (3x − 9)/((x − 2)²)
    ? Quand x → 2⁺, le dénominateur tend vers 0 par valeurs… ✔ positives (0⁺) / · négatives (0⁻)
    = −∞   ← −3/0⁺
  aides : Le numérateur ne s'annule pas au pôle : la limite est ±∞, avec le signe du numérateur fois le signe du dénominateur. | N(2) = −3, et le dénominateur tend vers 0⁺ à gauche | À gauche : −∞ ; à droite : −∞.

```

### Niveau 3

```
Calcule la limite de f(x) = √(9x² + 4)/(2x − 1) quand x → +∞.
  [tap, suivre l'erreur, menu steps]  √(9x² + 4)/(2x − 1)
    = √(x²(9 + 4/x²))/(x(2 − 1/x))   ← Mettre en évidence x² sous la racine, x en bas
    = √(9 + 4/x²)/(2 − 1/x)   ← √(x²) = x pour x > 0
    = 3/2   ← Passer à la limite
  aides : Mets x² en évidence sous la racine : √(x²) = |x|, et |x| = −x quand x → −∞. | = √(x²(□))/(x(2 − 1/x)) | = √(x²(9 + 4/x²))/(x(2 − 1/x)), et la limite vaut 3/2.
  pièges : a1_bh_quotient_rule

Calcule lim_{x→−∞} (√(x² + 4x) + x).
  [tap, suivre l'erreur, menu steps]  √(x² + 4x) + x
    = (4x)/(√(x² + 4x) − x)   ← Multiplier et diviser par la conjuguée
    = 4/(−√(1 + 4/x) − 1)   ← Diviser par x : x < 0, donc √(x²) = −x
    = −2   ← Passer à la limite
  aides : ∞ − ∞ avec une racine : multiplie et divise par l'expression conjuguée. | = (□)/(√(x² + 4x) − x) | = (4x)/(√(x² + 4x) − x), et la limite vaut −2.
  pièges : g6_infinity_minus_infinity, g6_sqrt_x2_abs

Calcule la limite de f(x) = (−x + 1)/(3x + 3) quand x → −∞.
  [tap, suivre l'erreur, menu steps]  (−x + 1)/(3x + 3)
    = x(−1 + 1/x)/(x(3 + 3/x))   ← Mettre en évidence le terme dominant
    = (−1 + 1/x)/(3 + 3/x)   ← Simplifier par x
    = −1/3   ← Les termes en 1/x tendent vers 0
  aides : En ±∞ : mets en évidence la plus grande puissance de x en haut et en bas. | = □(−1 + 1/x)/(x(3 + 3/x)) | = x(−1 + 1/x)/(x(3 + 3/x)), et la limite vaut −1/3.
  pièges : a1_bh_quotient_rule

```

### Niveau 4

```
Calcule lim_{x→∞} (x − 4)/(x³ − 3x² − x + 3).
  [free, suivre l'erreur]  (x − 4)/(x³ − 3x² − x + 3)
    = x(1 − 4/x)/(x³(1 − 3/x − 1/x² + 3/x³))   ← Mettre en évidence le terme dominant
    = (1 − 4/x)/(x²(1 − 3/x − 1/x² + 3/x³))   ← Simplifier par x
    = 0   ← Le dénominateur tend vers l'infini
  aides : En ±∞ : mets en évidence la plus grande puissance de x en haut et en bas. | = □(1 − 4/x)/(x³(1 − 3/x − 1/x² + 3/x³)) | = x(1 − 4/x)/(x³(1 − 3/x − 1/x² + 3/x³)), et la limite vaut 0.
  pièges : a1_bh_quotient_rule

Calcule la limite de f(x) = √(9x² + 1)/(x − 5) quand x → −∞.
  [free, suivre l'erreur]  √(9x² + 1)/(x − 5)
    = √(x²(9 + 1/x²))/(x(1 − 5/x))   ← Mettre en évidence x² sous la racine, x en bas
    = −√(9 + 1/x²)/(1 − 5/x)   ← √(x²) = |x| = −x pour x < 0
    = −3   ← Passer à la limite
  aides : Mets x² en évidence sous la racine : √(x²) = |x|, et |x| = −x quand x → −∞. | = √(x²(□))/(x(1 − 5/x)) | = √(x²(9 + 1/x²))/(x(1 − 5/x)), et la limite vaut −3.
  pièges : g6_sqrt_x2_abs, a1_dl_factorial_missing, a1_bh_quotient_rule

Calcule lim_{x→∞} (√(x² − 2x − 1) − x).
  [free, suivre l'erreur]  √(x² − 2x − 1) − x
    = (−2x − 1)/(√(x² − 2x − 1) + x)   ← Multiplier et diviser par la conjuguée
    = (−2 − 1/x)/(√(1 − 2/x − 1/x²) + 1)   ← Diviser par x (x > 0)
    = −1   ← Passer à la limite
  aides : ∞ − ∞ avec une racine : multiplie et divise par l'expression conjuguée. | = (□)/(√(x² − 2x − 1) + x) | = (−2x − 1)/(√(x² − 2x − 1) + x), et la limite vaut −1.
  pièges : g6_infinity_minus_infinity

```

### Niveau 5

```
Soit f(x) = (x² − 3x + 2)/((x − 3)²). Calcule ses limites en +∞, en −∞, et à gauche et à droite de 3.
  [free, sans aide]  (x² − 3x + 2)/((x − 3)²)
    (En +∞ :)
    = x²(1 − 3/x + 2/x²)/(x²(1 − 6/x + 9/x²))   ← Mettre en évidence le terme dominant
    = (1 − 3/x + 2/x²)/(1 − 6/x + 9/x²)   ← Simplifier par x²
    = 1   ← Les termes en 1/x tendent vers 0
  — En −∞ :  [juge limit]  départ : (x² − 3x + 2)/((x − 3)²)
    = 1   ← Même calcul : les termes en 1/x tendent vers 0
  — Quand x → 3⁻ :  [juge limit]  départ : (x² − 3x + 2)/((x − 3)²)
    = ∞   ← 2/0⁺
  — Quand x → 3⁺ :  [juge limit]  départ : (x² − 3x + 2)/((x − 3)²)
    = ∞   ← 2/0⁺
  pièges : a1_bh_quotient_rule

Soit f(x) = (2x + 8)/(x − 1). Calcule ses limites en +∞, en −∞, et à gauche et à droite de 1.
  [free, sans aide]  (2x + 8)/(x − 1)
    (En +∞ :)
    = x(2 + 8/x)/(x(1 − 1/x))   ← Mettre en évidence le terme dominant
    = (2 + 8/x)/(1 − 1/x)   ← Simplifier par x
    = 2   ← Les termes en 1/x tendent vers 0
  — En −∞ :  [juge limit]  départ : (2x + 8)/(x − 1)
    = 2   ← Même calcul : les termes en 1/x tendent vers 0
  — Quand x → 1⁻ :  [juge limit]  départ : (2x + 8)/(x − 1)
    = −∞   ← 10/0⁻
  — Quand x → 1⁺ :  [juge limit]  départ : (2x + 8)/(x − 1)
    = ∞   ← 10/0⁺
  pièges : a1_bh_quotient_rule

Soit f(x) = (3x² − 9x + 6)/((x + 3)²). Calcule ses limites en +∞, en −∞, et à gauche et à droite de −3.
  [free, sans aide]  (3x² − 9x + 6)/((x + 3)²)
    (En +∞ :)
    = x²(3 − 9/x + 6/x²)/(x²(1 + 6/x + 9/x²))   ← Mettre en évidence le terme dominant
    = (3 − 9/x + 6/x²)/(1 + 6/x + 9/x²)   ← Simplifier par x²
    = 3   ← Les termes en 1/x tendent vers 0
  — En −∞ :  [juge limit]  départ : (3x² − 9x + 6)/((x + 3)²)
    = 3   ← Même calcul : les termes en 1/x tendent vers 0
  — Quand x → −3⁻ :  [juge limit]  départ : (3x² − 9x + 6)/((x + 3)²)
    = ∞   ← 60/0⁺
  — Quand x → −3⁺ :  [juge limit]  départ : (3x² − 9x + 6)/((x + 3)²)
    = ∞   ← 60/0⁺
  pièges : a1_bh_quotient_rule

```

### Variantes d'examen

```
Que vaut lim_{x→∞} (√(x² + 6x − 2) − x) ?
  · +∞   ✔ 3   · 0 [g6_infinity_minus_infinity]   · 6
  [examen mcq]
  pièges : g6_infinity_minus_infinity

Vrai ou faux ? « Quand x → 1⁺, (−x² − x + 6)/((x − 1)(x + 1)) tend vers +∞. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Signe de f′, tableau de variation, extrema locaux (`g6-sign-variation`, Gymnase)

_Factoriser f′, faire son tableau de signes, lire la variation et les extrema._

### Niveau 1

```
f(x) = x⁴ − 8x³ + 18x² − 2, et f′(x) = 4x(x − 3)². Fais le tableau de signes de f′ (touche une case pour choisir + , − , 0 ou ‖).
  [tableau signs]  colonnes :  | 0 |  | 3 | 
    x        (−)  (0)  (+)  (+)  (+)
    (x-3)²   (+)  (+)  (+)  (0)  (+)
    f′(x)    (−)  (0)  (+)  (0)  (+)
  puis : Lis le tableau : nature et valeur de chaque point critique.
      [guided, sans aide]  0⁴ − 8·0³ + 18·0² − 2
        (x = 0 : minimum local)
        = −2   ← minimum local : f(0)
      — x = 3 : ni maximum ni minimum  [juge value]  départ : 3⁴ − 8·3³ + 18·3² − 2
        = 25   ← ni maximum ni minimum : f(3)
  pièges : g6_critical_is_extremum

f(x) = −x⁴ + 8x³ − 18x² − 5, et f′(x) = −4x(x − 3)². Fais le tableau de signes de f′ (touche une case pour choisir + , − , 0 ou ‖).
  [tableau signs]  colonnes :  | 0 |  | 3 | 
    -x       (+)  (0)  (−)  (−)  (−)
    (x-3)²   (+)  (+)  (+)  (0)  (+)
    f′(x)    (+)  (0)  (−)  (0)  (−)
  puis : Lis le tableau : nature et valeur de chaque point critique.
      [guided, sans aide]  −0⁴ + 8·0³ − 18·0² − 5
        (x = 0 : maximum local)
        = −5   ← maximum local : f(0)
      — x = 3 : ni maximum ni minimum  [juge value]  départ : −3⁴ + 8·3³ − 18·3² − 5
        = −32   ← ni maximum ni minimum : f(3)
  pièges : g6_critical_is_extremum

f(x) = x⁴ + 4x³ − 5, et f′(x) = 4x²(x + 3). Fais le tableau de signes de f′ (touche une case pour choisir + , − , 0 ou ‖).
  [tableau signs]  colonnes :  | −3 |  | 0 | 
    x+3      (−)  (0)  (+)  (+)  (+)
    x²       (+)  (+)  (+)  (0)  (+)
    f′(x)    (−)  (0)  (+)  (0)  (+)
  puis : Lis le tableau : nature et valeur de chaque point critique.
      [guided, sans aide]  (−3)⁴ + 4(−3)³ − 5
        (x = −3 : minimum local)
        = −32   ← minimum local : f(−3)
      — x = 0 : ni maximum ni minimum  [juge value]  départ : 0⁴ + 4·0³ − 5
        = −5   ← ni maximum ni minimum : f(0)
  pièges : g6_critical_is_extremum

```

### Niveau 2

```
Étudie la variation de f(x) = 2x³ + 9x² + 12x − 1 : signe de f′, puis nature et valeur de chaque point critique.
  [guided]  (2x³ + 9x² + 12x − 1)′
    (Dérive et factorise f′.)
    = 6x² + 18x + 12   ← Dériver
    = 6(x + 2)(□)   (trous : 6(x + 2)(x + 1))   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 6(x + 2)(x + 1) > 0
    = ]−∞ ; □[ ∪ ]−1 ; +∞[   (trous : ]−∞ ; −2[ ∪ ]−1 ; +∞[)   ← Tableau de signes de f′
  — Point critique x = −2 :  [juge value]  départ : 2(−2)³ + 9(−2)² + 12(−2) − 1
    ? En x = −2, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = −5   ← maximum local
  — Point critique x = −1 :  [juge value]  départ : 2(−1)³ + 9(−1)² + 12(−1) − 1
    ? En x = −1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −6   ← minimum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = 6(x + 2)(□) | en −2 : maximum local, f(−2) = −5 ; en −1 : minimum local, f(−1) = −6

Soit f(x) = (x² + 1)/x. Où f croît-elle ? Donne ses extrema locaux.
  [guided]  ((x² + 1)/x)′
    (Dérive et factorise f′.)
    = (2x·x − (x² + 1))/x²   ← Règle du quotient
    = (x² − 1)/x²   ← Réduire
    = (□)(x + 1)/x²   (trous : (x − 1)(x + 1)/x²)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : (x − 1)(x + 1)/x² > 0
    = ]−∞ ; □[ ∪ ]1 ; +∞[   (trous : ]−∞ ; −1[ ∪ ]1 ; +∞[)   ← Tableau de signes de f′
  — Point critique x = −1 :  [juge value]  départ : ((−1)² + 1)/(−1)
    ? En x = −1, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = −2   ← maximum local
  — Point critique x = 1 :  [juge value]  départ : (1² + 1)/1
    ? En x = 1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = 2   ← minimum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = (□)(x + 1)/x² | en −1 : maximum local, f(−1) = −2 ; en 1 : minimum local, f(1) = 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = −x⁴ − 4x³ + 16x + 5. Où f croît-elle ? Donne ses extrema locaux.
  [guided]  (−x⁴ − 4x³ + 16x + 5)′
    (Dérive et factorise f′.)
    = −4x³ − 12x² + 16   ← Dériver
    = −4(x + 2)²(□)   (trous : −4(x + 2)²(x − 1))   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : −4(x + 2)²(x − 1) > 0
    = ]−∞ ; □[ ∪ ]−2 ; 1[   (trous : ]−∞ ; −2[ ∪ ]−2 ; 1[)   ← Tableau de signes de f′
  — Point critique x = −2 :  [juge value]  départ : −(−2)⁴ − 4(−2)³ + 16(−2) + 5
    ? En x = −2, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = −11   ← ni maximum ni minimum
  — Point critique x = 1 :  [juge value]  départ : −1⁴ − 4·1³ + 16·1 + 5
    ? En x = 1, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = 16   ← maximum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = −4(x + 2)²(□) | en −2 : ni maximum ni minimum, f(−2) = −11 ; en 1 : maximum local, f(1) = 16
  pièges : g6_critical_is_extremum

```

### Niveau 3

```
Soit f(x) = (x² + 1)/x. Où f croît-elle ? Donne ses extrema locaux.
  [tap, suivre l'erreur, menu steps]  ((x² + 1)/x)′
    (Dérive et factorise f′.)
    = (2x·x − (x² + 1))/x²   ← Règle du quotient
    = (x² − 1)/x²   ← Réduire
    = (x − 1)(x + 1)/x²   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : (x − 1)(x + 1)/x² > 0
    = ]−∞ ; −1[ ∪ ]1 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −1 :  [juge value]  départ : ((−1)² + 1)/(−1)
    ? En x = −1, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = −2   ← maximum local
  — Point critique x = 1 :  [juge value]  départ : (1² + 1)/1
    ? En x = 1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = 2   ← minimum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = (□)(x + 1)/x² | en −1 : maximum local, f(−1) = −2 ; en 1 : minimum local, f(1) = 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = x⁴ − 8x³ + 18x² − 5. Où f croît-elle ? Donne ses extrema locaux.
  [tap, suivre l'erreur, menu steps]  (x⁴ − 8x³ + 18x² − 5)′
    (Dérive et factorise f′.)
    = 4x³ − 24x² + 36x   ← Dériver
    = 4x(x − 3)²   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4x(x − 3)² > 0
    = ]0 ; 3[ ∪ ]3 ; +∞[   ← Tableau de signes de f′
  — Point critique x = 0 :  [juge value]  départ : 0⁴ − 8·0³ + 18·0² − 5
    ? En x = 0, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −5   ← minimum local
  — Point critique x = 3 :  [juge value]  départ : 3⁴ − 8·3³ + 18·3² − 5
    ? En x = 3, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = 22   ← ni maximum ni minimum
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = 4x(□)² | en 0 : minimum local, f(0) = −5 ; en 3 : ni maximum ni minimum, f(3) = 22
  pièges : g6_critical_is_extremum

Soit f(x) = −x³ − 3x² + 24x + 1. Où f croît-elle ? Donne ses extrema locaux.
  [tap, suivre l'erreur, menu steps]  (−x³ − 3x² + 24x + 1)′
    (Dérive et factorise f′.)
    = −3x² − 6x + 24   ← Dériver
    = −3(x + 4)(x − 2)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : −3(x + 4)(x − 2) > 0
    = ]−4 ; 2[   ← Tableau de signes de f′
  — Point critique x = −4 :  [juge value]  départ : −(−4)³ − 3(−4)² + 24(−4) + 1
    ? En x = −4, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −79   ← minimum local
  — Point critique x = 2 :  [juge value]  départ : −2³ − 3·2² + 24·2 + 1
    ? En x = 2, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = 29   ← maximum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = −3(x + 4)(□) | en −4 : minimum local, f(−4) = −79 ; en 2 : maximum local, f(2) = 29

```

### Niveau 4

```
Étudie la variation de f(x) = x⁴ − 6x² − 8x − 1 : signe de f′, puis nature et valeur de chaque point critique.
  [free, suivre l'erreur]  (x⁴ − 6x² − 8x − 1)′
    (Dérive et factorise f′.)
    = 4x³ − 12x − 8   ← Dériver
    = 4(x + 1)²(x − 2)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4(x + 1)²(x − 2) > 0
    = ]2 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −1 :  [juge value]  départ : (−1)⁴ − 6(−1)² − 8(−1) − 1
    ? En x = −1, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = 2   ← ni maximum ni minimum
  — Point critique x = 2 :  [juge value]  départ : 2⁴ − 6·2² − 8·2 − 1
    ? En x = 2, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −25   ← minimum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = 4(x + 1)²(□) | en −1 : ni maximum ni minimum, f(−1) = 2 ; en 2 : minimum local, f(2) = −25
  pièges : g6_critical_is_extremum

Étudie la variation de f(x) = (x² + 1)/x : signe de f′, puis nature et valeur de chaque point critique.
  [free, suivre l'erreur]  ((x² + 1)/x)′
    (Dérive et factorise f′.)
    = (2x·x − (x² + 1))/x²   ← Règle du quotient
    = (x² − 1)/x²   ← Réduire
    = (x − 1)(x + 1)/x²   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : (x − 1)(x + 1)/x² > 0
    = ]−∞ ; −1[ ∪ ]1 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −1 :  [juge value]  départ : ((−1)² + 1)/(−1)
    ? En x = −1, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = −2   ← maximum local
  — Point critique x = 1 :  [juge value]  départ : (1² + 1)/1
    ? En x = 1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = 2   ← minimum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = (□)(x + 1)/x² | en −1 : maximum local, f(−1) = −2 ; en 1 : minimum local, f(1) = 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Étudie la variation de f(x) = −x⁴ + 4x³ − 4 : signe de f′, puis nature et valeur de chaque point critique.
  [free, suivre l'erreur]  (−x⁴ + 4x³ − 4)′
    (Dérive et factorise f′.)
    = −4x³ + 12x²   ← Dériver
    = −4x²(x − 3)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : −4x²(x − 3) > 0
    = ]−∞ ; 0[ ∪ ]0 ; 3[   ← Tableau de signes de f′
  — Point critique x = 0 :  [juge value]  départ : −0⁴ + 4·0³ − 4
    ? En x = 0, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = −4   ← ni maximum ni minimum
  — Point critique x = 3 :  [juge value]  départ : −3⁴ + 4·3³ − 4
    ? En x = 3, f a… ✔ un maximum local / · un minimum local / · ni maximum ni minimum
    = 23   ← maximum local
  aides : Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ change de signe. | f′(x) = −4x²(□) | en 0 : ni maximum ni minimum, f(0) = −4 ; en 3 : maximum local, f(3) = 23
  pièges : g6_critical_is_extremum

```

### Niveau 5

```
Étudie la variation de f(x) = x⁴ − 6x² − 8x + 5 : signe de f′, puis nature et valeur de chaque point critique.
  [free, sans aide]  (x⁴ − 6x² − 8x + 5)′
    (Dérive et factorise f′.)
    = 4x³ − 12x − 8   ← Dériver
    = 4(x + 1)²(x − 2)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4(x + 1)²(x − 2) > 0
    = ]2 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −1 :  [juge value]  départ : (−1)⁴ − 6(−1)² − 8(−1) + 5
    ? En x = −1, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = 8   ← ni maximum ni minimum
  — Point critique x = 2 :  [juge value]  départ : 2⁴ − 6·2² − 8·2 + 5
    ? En x = 2, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −19   ← minimum local
  pièges : g6_critical_is_extremum

Soit f(x) = x⁴ − 4x³ − 1. Où f croît-elle ? Donne ses extrema locaux.
  [free, sans aide]  (x⁴ − 4x³ − 1)′
    (Dérive et factorise f′.)
    = 4x³ − 12x²   ← Dériver
    = 4x²(x − 3)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4x²(x − 3) > 0
    = ]3 ; +∞[   ← Tableau de signes de f′
  — Point critique x = 0 :  [juge value]  départ : 0⁴ − 4·0³ − 1
    ? En x = 0, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = −1   ← ni maximum ni minimum
  — Point critique x = 3 :  [juge value]  départ : 3⁴ − 4·3³ − 1
    ? En x = 3, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −28   ← minimum local
  pièges : g6_critical_is_extremum

Étudie la variation de f(x) = x⁴ + 4x³ − 16x + 1 : signe de f′, puis nature et valeur de chaque point critique.
  [free, sans aide]  (x⁴ + 4x³ − 16x + 1)′
    (Dérive et factorise f′.)
    = 4x³ + 12x² − 16   ← Dériver
    = 4(x + 2)²(x − 1)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4(x + 2)²(x − 1) > 0
    = ]1 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −2 :  [juge value]  départ : (−2)⁴ + 4(−2)³ − 16(−2) + 1
    ? En x = −2, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = 17   ← ni maximum ni minimum
  — Point critique x = 1 :  [juge value]  départ : 1⁴ + 4·1³ − 16·1 + 1
    ? En x = 1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −10   ← minimum local
  pièges : g6_critical_is_extremum

```

### Variantes d'examen

```
f(x) = −x⁴ + 8x³ − 18x² + 5, avec f′(x) = −4x(x − 3)². Quels sont les extrema locaux de f ?
  · un maximum local en x = 0 et un minimum local en x = 3 [g6_critical_is_extremum]   ✔ un maximum local en x = 0   · aucun extremum local   · un minimum local en x = 0
  [examen mcq]
  pièges : g6_critical_is_extremum

Vrai ou faux ? « f(x) = x³ − 27x − 2 n’a ni maximum ni minimum local en x = 3. »
  · Vrai   ✔ Faux
  [examen tf]

Étudie la variation de f(x) = x⁴ + 4x³ − 16x + 3 : signe de f′, puis nature et valeur de chaque point critique.
  [free, sans aide, examen open]  (x⁴ + 4x³ − 16x + 3)′
    (Dérive et factorise f′.)
    = 4x³ + 12x² − 16   ← Dériver
    = 4(x + 2)²(x − 1)   ← Factoriser
  — Où f′ est-elle positive ?  [juge solset]  départ : 4(x + 2)²(x − 1) > 0
    = ]1 ; +∞[   ← Tableau de signes de f′
  — Point critique x = −2 :  [juge value]  départ : (−2)⁴ + 4(−2)³ − 16(−2) + 3
    ? En x = −2, f a… · un maximum local / · un minimum local / ✔ ni maximum ni minimum
    = 19   ← ni maximum ni minimum
  — Point critique x = 1 :  [juge value]  départ : 1⁴ + 4·1³ − 16·1 + 3
    ? En x = 1, f a… · un maximum local / ✔ un minimum local / · ni maximum ni minimum
    = −8   ← minimum local
  pièges : g6_critical_is_extremum

```

## Concavité et points d'inflexion (`g6-convexity`, Gymnase)

_Signe de f″, points où la concavité change, tangente d'inflexion._

### Niveau 1

```
Étudie la concavité de f(x) = x⁴ + 8x³ + 24x² − 3x + 4 : signe de f″, points d'inflexion.
  [guided]  12(x + 2)² > 0
    (On donne f″(x) = 12(x + 2)².)
    (Où f″ est-elle positive (f convexe) ?)
    = ]−∞ ; □[ ∪ ]−2 ; +∞[   (trous : ]−∞ ; −2[ ∪ ]−2 ; +∞[)   ← Signe de f″
  — x = −2 :  [juge value]  départ : (−2)⁴ + 8(−2)³ + 24(−2)² − 3(−2) + 4
    (f″ ne change pas de signe : pas d'inflexion.)
    = 58   ← Pas d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12(x + 2)² | pas d'inflexion en −2
  pièges : g9_bracket, g1_trinome_sign_swap

Soit f(x) = −x³ + 3x² − 3x − 2. Où f est-elle convexe ? Donne ses points d'inflexion.
  [guided]  −6(x − 1) > 0
    (On donne f″(x) = −6(x − 1).)
    (Où f″ est-elle positive (f convexe) ?)
    = ]−∞ ; □[   (trous : ]−∞ ; 1[)   ← Signe de f″
  — x = 1 :  [juge value]  départ : −1³ + 3·1² − 3·1 − 2
    (f″ change de signe : point d'inflexion.)
    = −3   ← Point d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = −6(x − 1) | inflexion en (1 ; −3)
  pièges : g1_ineq_not_flipped, g9_bracket

Étudie la concavité de f(x) = x⁴ − 4x³ + 4x + 2 : signe de f″, points d'inflexion.
  [guided]  12x(x − 2) > 0
    (On donne f″(x) = 12x(x − 2).)
    (Où f″ est-elle positive (f convexe) ?)
    = ]−∞ ; □[ ∪ ]2 ; +∞[   (trous : ]−∞ ; 0[ ∪ ]2 ; +∞[)   ← Signe de f″
  — x = 0 :  [juge value]  départ : 0⁴ − 4·0³ + 4·0 + 2
    (f″ change de signe : point d'inflexion.)
    = 2   ← Point d'inflexion
  — x = 2 :  [juge value]  départ : 2⁴ − 4·2³ + 4·2 + 2
    (f″ change de signe : point d'inflexion.)
    = −6   ← Point d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12x(x − 2) | inflexion en (0 ; 2) ; inflexion en (2 ; −6)
  pièges : g9_bracket

```

### Niveau 2

```
Étudie la concavité de f(x) = x⁴ + 4x³ + 6x² − x − 2 : signe de f″, points d'inflexion.
  [guided]  ((x⁴ + 4x³ + 6x² − x − 2)′)′
    (Dérive deux fois.)
    = (4x³ + 12x² + 12x − 1)′   ← Dériver une fois
    = 12x² + 24x + 12   ← Dériver une deuxième fois
    = 12(□)²   (trous : 12(x + 1)²)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 12(x + 1)² > 0
    = ]−∞ ; −1[ ∪ ]−1 ; +∞[   ← Signe de f″
  — x = −1 :  [juge value]  départ : (−1)⁴ + 4(−1)³ + 6(−1)² − (−1) − 2
    ? f″(−1) = 0. Le graphe a-t-il un point d'inflexion en x = −1 ? · Oui / ✔ Non
    = 2   ← Pas d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12(x + 1)² | pas d'inflexion en −1
  pièges : g6_inflection_f2_zero

Étudie la concavité de f(x) = x⁴ + 4x − 1 : signe de f″, points d'inflexion.
  [guided]  ((x⁴ + 4x − 1)′)′
    (Dérive deux fois.)
    = (4x³ + 4)′   ← Dériver une fois
    = 12□²   (trous : 12x²)   ← Dériver une deuxième fois
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 12x² > 0
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← Signe de f″
  — x = 0 :  [juge value]  départ : 0⁴ + 4·0 − 1
    ? f″(0) = 0. Le graphe a-t-il un point d'inflexion en x = 0 ? · Oui / ✔ Non
    = −1   ← Pas d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12x² | pas d'inflexion en 0
  pièges : g6_inflection_f2_zero

Soit f(x) = x⁴ + 6x³ + 12x² + 3. Où f est-elle convexe ? Donne ses points d'inflexion et la tangente au premier.
  [guided]  ((x⁴ + 6x³ + 12x² + 3)′)′
    (Dérive deux fois.)
    = (4x³ + 18x² + 24x)′   ← Dériver une fois
    = 12x² + 36x + 24   ← Dériver une deuxième fois
    = 12(□)(x + 1)   (trous : 12(x + 2)(x + 1))   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 12(x + 2)(x + 1) > 0
    = ]−∞ ; −2[ ∪ ]−1 ; +∞[   ← Signe de f″
  — x = −2 :  [juge value]  départ : (−2)⁴ + 6(−2)³ + 12(−2)² + 3
    ? f″(−2) = 0. Le graphe a-t-il un point d'inflexion en x = −2 ? ✔ Oui / · Non
    = 19   ← Point d'inflexion
  — x = −1 :  [juge value]  départ : (−1)⁴ + 6(−1)³ + 12(−1)² + 3
    ? f″(−1) = 0. Le graphe a-t-il un point d'inflexion en x = −1 ? ✔ Oui / · Non
    = 10   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 4(−2)³ + 18(−2)² + 24(−2)
    = −8   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 19 − □(x + 2)   (trous : 19 − 8(x + 2))   ← y = f(a) + f′(a)(x − a)
    = −8x + 3   ← Développer
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12(x + 2)(x + 1) | inflexion en (−2 ; 19) ; inflexion en (−1 ; 10)

```

### Niveau 3

```
Étudie la concavité de f(x) = x³ − 3x² − x − 3 : signe de f″, points d'inflexion, tangente d'inflexion.
  [tap, suivre l'erreur, menu steps]  ((x³ − 3x² − x − 3)′)′
    (Dérive deux fois.)
    = (3x² − 6x − 1)′   ← Dériver une fois
    = 6x − 6   ← Dériver une deuxième fois
    = 6(x − 1)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x − 1) > 0
    = ]1 ; +∞[   ← Signe de f″
  — x = 1 :  [juge value]  départ : 1³ − 3·1² − 1 − 3
    ? f″(1) = 0. Le graphe a-t-il un point d'inflexion en x = 1 ? ✔ Oui / · Non
    = −6   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3·1² − 6·1 − 1
    = −4   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = −6 − 4(x − 1)   ← y = f(a) + f′(a)(x − a)
    = −4x − 2   ← Développer
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 6(x − 1) | inflexion en (1 ; −6)

Étudie la concavité de f(x) = x³ + 6x² − 3x − 2 : signe de f″, points d'inflexion, tangente d'inflexion.
  [tap, suivre l'erreur, menu steps]  ((x³ + 6x² − 3x − 2)′)′
    (Dérive deux fois.)
    = (3x² + 12x − 3)′   ← Dériver une fois
    = 6x + 12   ← Dériver une deuxième fois
    = 6(x + 2)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x + 2) > 0
    = ]−2 ; +∞[   ← Signe de f″
  — x = −2 :  [juge value]  départ : (−2)³ + 6(−2)² − 3(−2) − 2
    ? f″(−2) = 0. Le graphe a-t-il un point d'inflexion en x = −2 ? ✔ Oui / · Non
    = 20   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3(−2)² + 12(−2) − 3
    = −15   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 20 − 15(x + 2)   ← y = f(a) + f′(a)(x − a)
    = −15x − 10   ← Développer
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 6(x + 2) | inflexion en (−2 ; 20)

Soit f(x) = x³ + 3x² − 2. Où f est-elle convexe ? Donne ses points d'inflexion et la tangente au premier.
  [tap, suivre l'erreur, menu steps]  ((x³ + 3x² − 2)′)′
    (Dérive deux fois.)
    = (3x² + 6x)′   ← Dériver une fois
    = 6x + 6   ← Dériver une deuxième fois
    = 6(x + 1)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x + 1) > 0
    = ]−1 ; +∞[   ← Signe de f″
  — x = −1 :  [juge value]  départ : (−1)³ + 3(−1)² − 2
    ? f″(−1) = 0. Le graphe a-t-il un point d'inflexion en x = −1 ? ✔ Oui / · Non
    = 0   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3(−1)² + 6(−1)
    = −3   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = −3x − 3   ← y = f(a) + f′(a)(x − a)
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 6(x + 1) | inflexion en (−1 ; 0)

```

### Niveau 4

```
Étudie la concavité de f(x) = x³ − 6x² − 4 : signe de f″, points d'inflexion, tangente d'inflexion.
  [free, suivre l'erreur]  ((x³ − 6x² − 4)′)′
    (Dérive deux fois.)
    = (3x² − 12x)′   ← Dériver une fois
    = 6x − 12   ← Dériver une deuxième fois
    = 6(x − 2)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x − 2) > 0
    = ]2 ; +∞[   ← Signe de f″
  — x = 2 :  [juge value]  départ : 2³ − 6·2² − 4
    ? f″(2) = 0. Le graphe a-t-il un point d'inflexion en x = 2 ? ✔ Oui / · Non
    = −20   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3·2² − 12·2
    = −12   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = −20 − 12(x − 2)   ← y = f(a) + f′(a)(x − a)
    = −12x + 4   ← Développer
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 6(x − 2) | inflexion en (2 ; −20)

Soit f(x) = x³ + 6x² + x + 4. Où f est-elle convexe ? Donne ses points d'inflexion et la tangente au premier.
  [free, suivre l'erreur]  ((x³ + 6x² + x + 4)′)′
    (Dérive deux fois.)
    = (3x² + 12x + 1)′   ← Dériver une fois
    = 6x + 12   ← Dériver une deuxième fois
    = 6(x + 2)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x + 2) > 0
    = ]−2 ; +∞[   ← Signe de f″
  — x = −2 :  [juge value]  départ : (−2)³ + 6(−2)² + (−2) + 4
    ? f″(−2) = 0. Le graphe a-t-il un point d'inflexion en x = −2 ? ✔ Oui / · Non
    = 18   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3(−2)² + 12(−2) + 1
    = −11   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 18 − 11(x + 2)   ← y = f(a) + f′(a)(x − a)
    = −11x − 4   ← Développer
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 6(x + 2) | inflexion en (−2 ; 18)

Soit f(x) = x⁴ + 4x³ + 6x² − 1. Où f est-elle convexe ? Donne ses points d'inflexion.
  [free, suivre l'erreur]  ((x⁴ + 4x³ + 6x² − 1)′)′
    (Dérive deux fois.)
    = (4x³ + 12x² + 12x)′   ← Dériver une fois
    = 12x² + 24x + 12   ← Dériver une deuxième fois
    = 12(x + 1)²   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 12(x + 1)² > 0
    = ]−∞ ; −1[ ∪ ]−1 ; +∞[   ← Signe de f″
  — x = −1 :  [juge value]  départ : (−1)⁴ + 4(−1)³ + 6(−1)² − 1
    ? f″(−1) = 0. Le graphe a-t-il un point d'inflexion en x = −1 ? · Oui / ✔ Non
    = 2   ← Pas d'inflexion
  aides : Calcule f″ et cherche où elle change de signe : f″(a) = 0 ne suffit pas. | f″(x) = 12(x + 1)² | pas d'inflexion en −1
  pièges : g6_inflection_f2_zero

```

### Niveau 5

```
g(x) = x³ + px² + qx. Trouve p et q pour que le graphe de g ait un point d'inflexion en x = −2, avec une tangente de pente 3 ; donne cette tangente.
  [free, sans aide]  ((x³ + p·x² + q·x)′)′
    (Dérive deux fois g.)
    = (3x² + 2p·x + q)′   ← Dériver une fois
    = 6x + 2p   ← Dériver une deuxième fois
  — Inflexion en −2 : g″(−2) = 0.  [juge solset]  départ : 6(−2) + 2p = 0
    = p = 6   ← Résoudre
  — Pente 3 en −2 : g′(−2) = 3.  [juge solset]  départ : 3(−2)² + 12(−2) + q = 3
    = q = 15   ← Résoudre
  — Point d'inflexion : g(x) = x³ + 6x² + 15x.  [juge value]  départ : (−2)³ + 6(−2)² + 15(−2)
    = −14   ← Valeur en a
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = −14 + 3(x + 2)   ← y = g(a) + g′(a)(x − a)
    = 3x − 8   ← Développer

g(x) = x³ + px² + qx. Trouve p et q pour que le graphe de g ait un point d'inflexion en x = −2, avec une tangente de pente −6 ; donne cette tangente.
  [free, sans aide]  ((x³ + p·x² + q·x)′)′
    (Dérive deux fois g.)
    = (3x² + 2p·x + q)′   ← Dériver une fois
    = 6x + 2p   ← Dériver une deuxième fois
  — Inflexion en −2 : g″(−2) = 0.  [juge solset]  départ : 6(−2) + 2p = 0
    = p = 6   ← Résoudre
  — Pente −6 en −2 : g′(−2) = −6.  [juge solset]  départ : 3(−2)² + 12(−2) + q = −6
    = q = 6   ← Résoudre
  — Point d'inflexion : g(x) = x³ + 6x² + 6x.  [juge value]  départ : (−2)³ + 6(−2)² + 6(−2)
    = 4   ← Valeur en a
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 4 − 6(x + 2)   ← y = g(a) + g′(a)(x − a)
    = −6x − 8   ← Développer

g(x) = x³ + px² + qx. Trouve p et q pour que le graphe de g ait un point d'inflexion en x = −1, avec une tangente de pente −4 ; donne cette tangente.
  [free, sans aide]  ((x³ + p·x² + q·x)′)′
    (Dérive deux fois g.)
    = (3x² + 2p·x + q)′   ← Dériver une fois
    = 6x + 2p   ← Dériver une deuxième fois
  — Inflexion en −1 : g″(−1) = 0.  [juge solset]  départ : 6(−1) + 2p = 0
    = p = 3   ← Résoudre
  — Pente −4 en −1 : g′(−1) = −4.  [juge solset]  départ : 3(−1)² + 6(−1) + q = −4
    = q = −1   ← Résoudre
  — Point d'inflexion : g(x) = x³ + 3x² − x.  [juge value]  départ : (−1)³ + 3(−1)² − (−1)
    = 3   ← Valeur en a
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 3 − 4(x + 1)   ← y = g(a) + g′(a)(x − a)
    = −4x − 1   ← Développer

```

### Variantes d'examen

```
Soit f(x) = x⁴ − 8x³ + 24x² + x − 1, avec f″(x) = 12x² − 48x + 48. Où le graphe de f a-t-il un point d'inflexion ?
  · en x = −2   · en x = 2 [g6_inflection_f2_zero]   ✔ aucun point d’inflexion   · en x = 0 et en x = 2
  [examen mcq]
  pièges : g6_inflection_f2_zero

Vrai ou faux ? « Si f″ change de signe en a, le graphe de f a un point d'inflexion en a. »
  ✔ Vrai   · Faux
  [examen tf]

Soit f(x) = x³ + 3x² − x. Où f est-elle convexe ? Donne ses points d'inflexion et la tangente au premier.
  [free, sans aide, examen open]  ((x³ + 3x² − x)′)′
    (Dérive deux fois.)
    = (3x² + 6x − 1)′   ← Dériver une fois
    = 6x + 6   ← Dériver une deuxième fois
    = 6(x + 1)   ← Factoriser
  — Où f″ est-elle positive (f convexe) ?  [juge solset]  départ : 6(x + 1) > 0
    = ]−1 ; +∞[   ← Signe de f″
  — x = −1 :  [juge value]  départ : (−1)³ + 3(−1)² − (−1)
    ? f″(−1) = 0. Le graphe a-t-il un point d'inflexion en x = −1 ? ✔ Oui / · Non
    = 3   ← Point d'inflexion
  — Tangente d'inflexion : pente  [juge value]  départ : 3(−1)² + 6(−1) − 1
    = −4   ← Pente au point d'inflexion
  — Tangente d'inflexion :  [juge equiv]  départ : y
    = 3 − 4(x + 1)   ← y = f(a) + f′(a)(x − a)
    = −4x − 1   ← Développer

```

## Optimisation (`g6-optim`, Gymnase)

_Une grandeur en fonction d'une seule variable, sa dérivée, le maximum dans le domaine._

### Niveau 1

```
Dans une feuille de 24 cm × 9 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [guided]  (4x³ − 66x² + 216x)′
    (Le domaine est ]0 ; 9/2[ et V(x) = x(24 − 2x)(9 − 2x) = 4x³ − 66x² + 216x.)
    (Dérive V et factorise.)
    = 12x² − 132x + 216   ← Dériver
    = 12(x − □)(x − 9)   (trous : 12(x − 2)(x − 9))   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 9/2[ :  [juge solset]  départ : 12(x − 2)(x − 9) = 0
    (x = 9 est hors du domaine : on le rejette.)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2(24 − 2·2)·(9 − 2·2)
    (V′ > 0 sur ]0 ; 2[ et V′ < 0 après : maximum en x = 2.)
    = 200   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(24 − 2x)(9 − 2x) | x = 2, et V(2) = 200

Dans une feuille de 24 cm × 9 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [guided]  (4x³ − 66x² + 216x)′
    (Le domaine est ]0 ; 9/2[ et V(x) = x(24 − 2x)(9 − 2x) = 4x³ − 66x² + 216x.)
    (Dérive V et factorise.)
    = 12x² − 132x + 216   ← Dériver
    = 12(x − □)(x − 9)   (trous : 12(x − 2)(x − 9))   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 9/2[ :  [juge solset]  départ : 12(x − 2)(x − 9) = 0
    (x = 9 est hors du domaine : on le rejette.)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2(24 − 2·2)·(9 − 2·2)
    (V′ > 0 sur ]0 ; 2[ et V′ < 0 après : maximum en x = 2.)
    = 200   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(24 − 2x)(9 − 2x) | x = 2, et V(2) = 200

Dans une feuille de 15 cm × 7 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [guided]  (4x³ − 44x² + 105x)′
    (Le domaine est ]0 ; 7/2[ et V(x) = x(15 − 2x)(7 − 2x) = 4x³ − 44x² + 105x.)
    (Dérive V et factorise.)
    = 12x² − 88x + 105   ← Dériver
    = (2x − □)(6x − 35)   (trous : (2x − 3)(6x − 35))   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 7/2[ :  [juge solset]  départ : (2x − 3)(6x − 35) = 0
    (x = 35/6 est hors du domaine : on le rejette.)
    = x = 3/2   ← La racine du domaine
  — Maximum :  [juge value]  départ : (3/2)·(15 − 2(3/2))·(7 − 2(3/2))
    (V′ > 0 sur ]0 ; 3/2[ et V′ < 0 après : maximum en x = 3/2.)
    = 72   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(15 − 2x)(7 − 2x) | x = 3/2, et V(3/2) = 72

```

### Niveau 2

```
Avec 20 m de clôture, on entoure un enclos rectangulaire le long d'un mur (le mur ferme le quatrième côté). x est la longueur des deux côtés perpendiculaires au mur. Pour quel x l'aire est-elle maximale, et que vaut-elle ?
  [guided]  x > 0 et 20 − 2x > 0
    (Domaine de x :)
    = ]□ ; 10[   (trous : ]0 ; 10[)   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = x(□ − 2x)   (trous : x(20 − 2x))   ← La grandeur avec la seule variable x
    = −2x² + 20x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x² + 20x)′
    = −4x + 20   ← Dériver
    = 4(5 − x)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 10[ :  [juge solset]  départ : 4(5 − x) = 0
    = x = 5   ← La racine du domaine
  — Maximum :  [juge value]  départ : 5(20 − 2·5)
    ? A′ > 0 sur ]0 ; 5[ et A′ < 0 après. En x = 5, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 50   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | A(x) = x(20 − 2x) | x = 5, et A(5) = 50
  pièges : g9_union_inter, g9_bracket

Dans une feuille de 24 cm × 15 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [guided]  x > 0 et 24 − 2x > 0 et 15 − 2x > 0
    (Domaine de x :)
    = ]□ ; 15/2[   (trous : ]0 ; 15/2[)   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(□ − 2x)(15 − 2x)   (trous : x(24 − 2x)(15 − 2x))   ← La grandeur avec la seule variable x
    = 4x³ − 78x² + 360x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 78x² + 360x)′
    = 12x² − 156x + 360   ← Dériver
    = 12(x − 3)(x − 10)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 15/2[ :  [juge solset]  départ : 12(x − 3)(x − 10) = 0
    ? La racine x = 10 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3   ← La racine du domaine
  — Maximum :  [juge value]  départ : 3(24 − 2·3)·(15 − 2·3)
    ? V′ > 0 sur ]0 ; 3[ et V′ < 0 après. En x = 3, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 486   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(24 − 2x)(15 − 2x) | x = 3, et V(3) = 486
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = 12 − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; 12 − x²)). Pour quel x son aire est-elle maximale, et que vaut-elle ?
  [guided]  x > 0 et 12 − x² > 0
    (Domaine de x :)
    = ]□ ; 2√3[   (trous : ]0 ; 2√3[)   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = 2□(12 − x²)   (trous : 2x(12 − x²))   ← La grandeur avec la seule variable x
    = −2x³ + 24x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x³ + 24x)′
    = −6x² + 24   ← Dériver
    = −6(x − 2)(x + 2)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 2√3[ :  [juge solset]  départ : −6(x − 2)(x + 2) = 0
    ? La racine x = −2 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2·2·(12 − 2²)
    ? A′ > 0 sur ]0 ; 2[ et A′ < 0 après. En x = 2, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 32   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | A(x) = 2x(12 − x²) | x = 2, et A(2) = 32
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

```

### Niveau 3

```
Dans une feuille de 16 cm × 10 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [tap, suivre l'erreur, menu steps]  x > 0 et 16 − 2x > 0 et 10 − 2x > 0
    (Domaine de x :)
    = ]0 ; 5[   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(16 − 2x)(10 − 2x)   ← La grandeur avec la seule variable x
    = 4x³ − 52x² + 160x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 52x² + 160x)′
    = 12x² − 104x + 160   ← Dériver
    = 4(x − 2)(3x − 20)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 5[ :  [juge solset]  départ : 4(x − 2)(3x − 20) = 0
    ? La racine x = 20/3 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2(16 − 2·2)·(10 − 2·2)
    ? V′ > 0 sur ]0 ; 2[ et V′ < 0 après. En x = 2, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 144   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(16 − 2x)(10 − 2x) | x = 2, et V(2) = 144
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Dans une feuille de 15 cm × 7 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [tap, suivre l'erreur, menu steps]  x > 0 et 15 − 2x > 0 et 7 − 2x > 0
    (Domaine de x :)
    = ]0 ; 7/2[   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(15 − 2x)(7 − 2x)   ← La grandeur avec la seule variable x
    = 4x³ − 44x² + 105x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 44x² + 105x)′
    = 12x² − 88x + 105   ← Dériver
    = (2x − 3)(6x − 35)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 7/2[ :  [juge solset]  départ : (2x − 3)(6x − 35) = 0
    ? La racine x = 35/6 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3/2   ← La racine du domaine
  — Maximum :  [juge value]  départ : (3/2)·(15 − 2(3/2))·(7 − 2(3/2))
    ? V′ > 0 sur ]0 ; 3/2[ et V′ < 0 après. En x = 3/2, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 72   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(15 − 2x)(7 − 2x) | x = 3/2, et V(3/2) = 72
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Avec 24 m de clôture, on entoure un enclos rectangulaire le long d'un mur (le mur ferme le quatrième côté). x est la longueur des deux côtés perpendiculaires au mur. Pour quel x l'aire est-elle maximale, et que vaut-elle ?
  [tap, suivre l'erreur, menu steps]  x > 0 et 24 − 2x > 0
    (Domaine de x :)
    = ]0 ; 12[   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = x(24 − 2x)   ← La grandeur avec la seule variable x
    = −2x² + 24x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x² + 24x)′
    = −4x + 24   ← Dériver
    = 4(6 − x)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 12[ :  [juge solset]  départ : 4(6 − x) = 0
    = x = 6   ← La racine du domaine
  — Maximum :  [juge value]  départ : 6(24 − 2·6)
    ? A′ > 0 sur ]0 ; 6[ et A′ < 0 après. En x = 6, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 72   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | A(x) = x(24 − 2x) | x = 6, et A(6) = 72
  pièges : g9_union_inter, g9_bracket

```

### Niveau 4

```
Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = 12 − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; 12 − x²)). Pour quel x son aire est-elle maximale, et que vaut-elle ?
  [free, suivre l'erreur]  x > 0 et 12 − x² > 0
    (Domaine de x :)
    = ]0 ; 2√3[   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = 2x(12 − x²)   ← La grandeur avec la seule variable x
    = −2x³ + 24x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x³ + 24x)′
    = −6x² + 24   ← Dériver
    = −6(x − 2)(x + 2)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 2√3[ :  [juge solset]  départ : −6(x − 2)(x + 2) = 0
    ? La racine x = −2 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2·2·(12 − 2²)
    ? A′ > 0 sur ]0 ; 2[ et A′ < 0 après. En x = 2, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 32   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | A(x) = 2x(12 − x²) | x = 2, et A(2) = 32
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Avec 80 m de clôture, on entoure un enclos rectangulaire le long d'un mur (le mur ferme le quatrième côté). x est la longueur des deux côtés perpendiculaires au mur. Pour quel x l'aire est-elle maximale, et que vaut-elle ?
  [free, suivre l'erreur]  x > 0 et 80 − 2x > 0
    (Domaine de x :)
    = ]0 ; 40[   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = x(80 − 2x)   ← La grandeur avec la seule variable x
    = −2x² + 80x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x² + 80x)′
    = −4x + 80   ← Dériver
    = 4(20 − x)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 40[ :  [juge solset]  départ : 4(20 − x) = 0
    = x = 20   ← La racine du domaine
  — Maximum :  [juge value]  départ : 20(80 − 2·20)
    ? A′ > 0 sur ]0 ; 20[ et A′ < 0 après. En x = 20, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 800   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | A(x) = x(80 − 2x) | x = 20, et A(20) = 800
  pièges : g9_union_inter, g9_bracket

Dans une feuille de 24 cm × 15 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [free, suivre l'erreur]  x > 0 et 24 − 2x > 0 et 15 − 2x > 0
    (Domaine de x :)
    = ]0 ; 15/2[   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(24 − 2x)(15 − 2x)   ← La grandeur avec la seule variable x
    = 4x³ − 78x² + 360x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 78x² + 360x)′
    = 12x² − 156x + 360   ← Dériver
    = 12(x − 3)(x − 10)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 15/2[ :  [juge solset]  départ : 12(x − 3)(x − 10) = 0
    ? La racine x = 10 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3   ← La racine du domaine
  — Maximum :  [juge value]  départ : 3(24 − 2·3)·(15 − 2·3)
    ? V′ > 0 sur ]0 ; 3[ et V′ < 0 après. En x = 3, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 486   ← Valeur maximale
  aides : Écris la grandeur avec la seule variable x, note pour quels x l'objet existe, puis cherche les zéros de la dérivée dans ce domaine. | V(x) = x(24 − 2x)(15 − 2x) | x = 3, et V(3) = 486
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

```

### Niveau 5

```
Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = 12 − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; 12 − x²)). Pour quel x son aire est-elle maximale, et que vaut-elle ?
  [free, sans aide]  x > 0 et 12 − x² > 0
    (Domaine de x :)
    = ]0 ; 2√3[   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = 2x(12 − x²)   ← La grandeur avec la seule variable x
    = −2x³ + 24x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x³ + 24x)′
    = −6x² + 24   ← Dériver
    = −6(x − 2)(x + 2)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 2√3[ :  [juge solset]  départ : −6(x − 2)(x + 2) = 0
    ? La racine x = −2 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 2   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2·2·(12 − 2²)
    ? A′ > 0 sur ]0 ; 2[ et A′ < 0 après. En x = 2, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 32   ← Valeur maximale
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Dans une feuille de 24 cm × 15 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [free, sans aide]  x > 0 et 24 − 2x > 0 et 15 − 2x > 0
    (Domaine de x :)
    = ]0 ; 15/2[   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(24 − 2x)(15 − 2x)   ← La grandeur avec la seule variable x
    = 4x³ − 78x² + 360x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 78x² + 360x)′
    = 12x² − 156x + 360   ← Dériver
    = 12(x − 3)(x − 10)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 15/2[ :  [juge solset]  départ : 12(x − 3)(x − 10) = 0
    ? La racine x = 10 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3   ← La racine du domaine
  — Maximum :  [juge value]  départ : 3(24 − 2·3)·(15 − 2·3)
    ? V′ > 0 sur ]0 ; 3[ et V′ < 0 après. En x = 3, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 486   ← Valeur maximale
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = 27 − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; 27 − x²)). Pour quel x son aire est-elle maximale, et que vaut-elle ?
  [free, sans aide]  x > 0 et 27 − x² > 0
    (Domaine de x :)
    = ]0 ; 3√3[   ← Contraintes : longueurs positives
  — A(x) en fonction de x :  [juge equiv]  départ : A
    = 2x(27 − x²)   ← La grandeur avec la seule variable x
    = −2x³ + 54x   ← Développer
  — Dérive A et factorise.  [juge equiv]  départ : (−2x³ + 54x)′
    = −6x² + 54   ← Dériver
    = −6(x − 3)(x + 3)   ← Factoriser
  — Zéros de A′ dans le domaine ]0 ; 3√3[ :  [juge solset]  départ : −6(x − 3)(x + 3) = 0
    ? La racine x = −3 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3   ← La racine du domaine
  — Maximum :  [juge value]  départ : 2·3·(27 − 3²)
    ? A′ > 0 sur ]0 ; 3[ et A′ < 0 après. En x = 3, A a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 108   ← Valeur maximale
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

```

### Variantes d'examen

```
Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = 27 − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; 27 − x²)). Pour quel x son aire est-elle maximale ? (A(x) = 2x(27 − x²), A′(x) = −6(x − 3)(x + 3).)
  · x = −3 [g6_optim_outside_domain]   · x = 6   ✔ x = 3   · x = 3√3
  [examen mcq]
  pièges : g6_optim_outside_domain

Dans une feuille de 21 cm × 16 cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?
  [free, sans aide, examen open]  x > 0 et 21 − 2x > 0 et 16 − 2x > 0
    (Domaine de x :)
    = ]0 ; 8[   ← Contraintes : longueurs positives
  — V(x) en fonction de x :  [juge equiv]  départ : V
    = x(21 − 2x)(16 − 2x)   ← La grandeur avec la seule variable x
    = 4x³ − 74x² + 336x   ← Développer
  — Dérive V et factorise.  [juge equiv]  départ : (4x³ − 74x² + 336x)′
    = 12x² − 148x + 336   ← Dériver
    = 4(x − 3)(3x − 28)   ← Factoriser
  — Zéros de V′ dans le domaine ]0 ; 8[ :  [juge solset]  départ : 4(x − 3)(3x − 28) = 0
    ? La racine x = 28/3 de la dérivée : on la… · garde / ✔ rejette (hors du domaine)
    = x = 3   ← La racine du domaine
  — Maximum :  [juge value]  départ : 3(21 − 2·3)·(16 − 2·3)
    ? V′ > 0 sur ]0 ; 3[ et V′ < 0 après. En x = 3, V a… ✔ un maximum / · un minimum / · on ne peut rien dire
    = 450   ← Valeur maximale
  pièges : g9_union_inter, g9_bracket, g6_optim_outside_domain

```

## Primitives usuelles (`g6-antideriv-usual`, Gymnase)

_∫xⁿ dx, ∫dx/x = ln|x|, ∫eᵃˣ dx, ∫cos(ax) dx… et + C._

### Niveau 1

```
Calcule ∫ (−6x² + 5√x − 5/√x) dx. 1/xⁿ = x⁻ⁿ et √x = x^(1/2) : écris d'abord chaque terme comme une puissance de x.
  [guided]  −6x² + 5√x − 5/√x
    = −6x² + 5x^□ − 5x^□   (trous : −6x² + 5x^(1/2) − 5x^(−1/2))   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−6x² + 5x^(1/2) − 5x^(−1/2)) dx
    (∫xⁿ dx = xⁿ⁺¹/(n + 1) : on monte l'exposant de 1, et on divise par le nouvel exposant.)
    = −2x^□ + 10x^□/3 − 10x^□ + C   (trous : −2x³ + 10x^(3/2)/3 − 10x^(1/2) + C)   ← Monter l'exposant, diviser ; + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −2x³ + 10x^(3/2)/3 − □ + C | = −2x³ + 10x^(3/2)/3 − 10√x + C
  pièges : g6_antideriv_power_minus_one

Calcule ∫ (−2/√x + 1/x² + 6/x³) dx. 1/xⁿ = x⁻ⁿ et √x = x^(1/2) : écris d'abord chaque terme comme une puissance de x.
  [guided]  −2/√x + 1/x² + 6/x³
    = −2x^□ + x^□ + 6x^□   (trous : −2x^(−1/2) + x^(−2) + 6x^(−3))   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−2x^(−1/2) + x^(−2) + 6x^(−3)) dx
    (∫xⁿ dx = xⁿ⁺¹/(n + 1) : on monte l'exposant de 1, et on divise par le nouvel exposant.)
    = −4x^□ − 1/x − 3x^□ + C   (trous : −4x^(1/2) − 1/x − 3x^(−2) + C)   ← Monter l'exposant, diviser ; + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −4√x − 1/x − □ + C | = −4√x − 1/x − 3/x² + C
  pièges : g6_antideriv_power_minus_one

Trouve les primitives de f(x) = 6√x − 5/√x − 4/x³. 1/xⁿ = x⁻ⁿ et √x = x^(1/2) : écris d'abord chaque terme comme une puissance de x.
  [guided]  6√x − 5/√x − 4/x³
    = 6x^□ − 5x^□ − 4x^□   (trous : 6x^(1/2) − 5x^(−1/2) − 4x^(−3))   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (6x^(1/2) − 5x^(−1/2) − 4x^(−3)) dx
    (∫xⁿ dx = xⁿ⁺¹/(n + 1) : on monte l'exposant de 1, et on divise par le nouvel exposant.)
    = 4x^□ − 10x^□ + 2x^□ + C   (trous : 4x^(3/2) − 10x^(1/2) + 2x^(−2) + C)   ← Monter l'exposant, diviser ; + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = 4x^(3/2) − 10√x + □ + C | = 4x^(3/2) − 10√x + 2/x² + C
  pièges : g6_antideriv_power_minus_one

```

### Niveau 2

```
Trouve les primitives de f(x) = −6x(x + 1). Écris d'abord f(x) comme une somme de termes de la table.
  [guided]  −6x(x + 1)
    = □ − 6x   (trous : −6x² − 6x)   ← Développer
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−6x² − 6x) dx
    ? Une primitive de <math alttext="x²"><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></math>, c'est… ✔ <math alttext="x³/3"><mfrac><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mn>3</mn></mfrac></math> / · <math alttext="2x¹"><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>1</mn></msup></mrow></math> / · <math alttext="x³"><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></math>
    = −6(∫ □ dx) − 6(∫ □ dx)   (trous : −6(∫ x² dx) − 6(∫ x dx))   ← Linéarité : une ∫ par terme
    = □ − 6(∫ x dx)   (trous : −2x³ − 6(∫ x dx))   ← Un terme avec la table
    = −2x³ − □ + C   (trous : −2x³ − 3x² + C)   ← Dernier terme, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −2x³ − □ + C | = −2x³ − 3x² + C
  pièges : g6_antideriv_power_minus_one

Calcule ∫ ((−3x³ + 2)/x − 1/(1 + x²)) dx. Écris d'abord f(x) comme une somme de termes de la table.
  [guided]  (−3x³ + 2)/x − 1/(1 + x²)
    = □ + 2/x − 1/(1 + x²)   (trous : −3x² + 2/x − 1/(1 + x²))   ← Séparer la fraction : (a + b)/x = a/x + b/x
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−3x² + 2/x − 1/(1 + x²)) dx
    ? Une primitive de 1/x, c'est… ✔ <math alttext="ln(|x|)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mo stretchy="false">|</mo><mi>x</mi><mo stretchy="false">|</mo></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="ln(x)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x⁰/0"><mfrac><msup><mrow><mi>x</mi></mrow><mn>0</mn></msup><mn>0</mn></mfrac></math>
    = −3(∫ □ dx) + 2(∫ □ dx) − ∫ 1/(1 + x²) dx   (trous : −3(∫ x² dx) + 2(∫ 1/x dx) − ∫ 1/(1 + x²) dx)   ← Linéarité : une ∫ par terme
    = −□ + 2(∫ 1/x dx) − ∫ 1/(1 + x²) dx   (trous : −x³ + 2(∫ 1/x dx) − ∫ 1/(1 + x²) dx)   ← Un terme avec la table
    = −x³ + □ − ∫ 1/(1 + x²) dx   (trous : −x³ + 2ln(|x|) − ∫ 1/(1 + x²) dx)   ← Un terme avec la table
    = −x³ + 2ln(|x|) − □ + C   (trous : −x³ + 2ln(|x|) − arctan(x) + C)   ← Dernier terme, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −x³ + 2ln(|x|) − □ + C | = −x³ + 2ln(|x|) − arctan(x) + C
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

Calcule ∫ (3x⁴ + 2x² + 3)/x dx. Écris d'abord f(x) comme une somme de termes de la table.
  [guided]  (3x⁴ + 2x² + 3)/x
    = □ + 2x + 3/x   (trous : 3x³ + 2x + 3/x)   ← Séparer la fraction : (a + b)/x = a/x + b/x
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (3x³ + 2x + 3/x) dx
    ? Une primitive de 1/x, c'est… ✔ <math alttext="ln(|x|)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mo stretchy="false">|</mo><mi>x</mi><mo stretchy="false">|</mo></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="ln(x)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x⁰/0"><mfrac><msup><mrow><mi>x</mi></mrow><mn>0</mn></msup><mn>0</mn></mfrac></math>
    = 3(∫ □ dx) + 2(∫ □ dx) + 3(∫ 1/x dx)   (trous : 3(∫ x³ dx) + 2(∫ x dx) + 3(∫ 1/x dx))   ← Linéarité : une ∫ par terme
    = □ + 2(∫ x dx) + 3(∫ 1/x dx)   (trous : 3x⁴/4 + 2(∫ x dx) + 3(∫ 1/x dx))   ← Un terme avec la table
    = 3x⁴/4 + □ + 3(∫ 1/x dx)   (trous : 3x⁴/4 + x² + 3(∫ 1/x dx))   ← Un terme avec la table
    = 3x⁴/4 + x² + □ + C   (trous : 3x⁴/4 + x² + 3ln(|x|) + C)   ← Dernier terme, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = 3x⁴/4 + x² + □ + C | = 3x⁴/4 + x² + 3ln(|x|) + C
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

```

### Niveau 3

```
Calcule ∫ (−5x⁴ − 6/√x − 1/x²) dx. Écris d'abord f(x) comme une somme de termes de la table.
  [tap, suivre l'erreur, menu steps]  −5x⁴ − 6/√x − 1/x²
    = −5x⁴ − 6x^(−1/2) − x^(−2)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−5x⁴ − 6x^(−1/2) − x^(−2)) dx
    = −5(∫ x⁴ dx) − 6(∫ x^(−1/2) dx) − ∫ x^(−2) dx   ← Linéarité
    = −x⁵ − 12√x + 1/x + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −x⁵ − 12√x + □ + C | = −x⁵ − 12√x + 1/x + C
  pièges : g6_antideriv_power_minus_one

Trouve les primitives de f(x) = −5x³ − 2/x² + 6/x³. Écris d'abord f(x) comme une somme de termes de la table.
  [tap, suivre l'erreur, menu steps]  −5x³ − 2/x² + 6/x³
    = −5x³ − 2x^(−2) + 6x^(−3)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−5x³ − 2x^(−2) + 6x^(−3)) dx
    = −5(∫ x³ dx) − 2(∫ x^(−2) dx) + 6(∫ x^(−3) dx)   ← Linéarité
    = −5x⁴/4 + 2/x − 3/x² + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −5x⁴/4 + 2/x − □ + C | = −5x⁴/4 + 2/x − 3/x² + C
  pièges : g6_antideriv_power_minus_one

Trouve les primitives de f(x) = (−x² + 2)/x − 1/(1 + x²). Écris d'abord f(x) comme une somme de termes de la table.
  [tap, suivre l'erreur, menu steps]  (−x² + 2)/x − 1/(1 + x²)
    = −x + 2/x − 1/(1 + x²)   ← Séparer la fraction : (a + b)/x = a/x + b/x
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−x + 2/x − 1/(1 + x²)) dx
    = −∫ x dx + 2(∫ 1/x dx) − ∫ 1/(1 + x²) dx   ← Linéarité
    = −x²/2 + 2ln(|x|) − arctan(x) + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −x²/2 + 2ln(|x|) − □ + C | = −x²/2 + 2ln(|x|) − arctan(x) + C
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

```

### Niveau 4

```
Trouve les primitives de f(x) = (x³ − 6x² + 5)/x − 6e^(−x). Écris d'abord f(x) comme une somme de termes de la table.
  [free, suivre l'erreur]  (x³ − 6x² + 5)/x − 6e^(−x)
    = x² − 6x + 5/x − 6e^(−x)   ← Séparer la fraction : (a + b)/x = a/x + b/x
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (x² − 6x + 5/x − 6e^(−x)) dx
    = ∫ x² dx − 6(∫ x dx) + 5(∫ 1/x dx) − 6(∫ e^(−x) dx)   ← Linéarité
    = x³/3 − 3x² + 5ln(|x|) + 6e^(−x) + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = x³/3 − 3x² + 5ln(|x|) + □ + C | = x³/3 − 3x² + 5ln(|x|) + 6e^(−x) + C
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

Calcule ∫ ((−5x² − 5)/x − 3e^x) dx. Écris d'abord f(x) comme une somme de termes de la table.
  [free, suivre l'erreur]  (−5x² − 5)/x − 3e^x
    = −5x − 5/x − 3e^x   ← Séparer la fraction : (a + b)/x = a/x + b/x
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−5x − 5/x − 3e^x) dx
    = −5(∫ x dx) − 5(∫ 1/x dx) − 3(∫ e^x dx)   ← Linéarité
    = −5x²/2 − 5ln(|x|) − 3e^x + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −5x²/2 − 5ln(|x|) − □ + C | = −5x²/2 − 5ln(|x|) − 3e^x + C
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

Calcule ∫ (−3x² − 4x + 6/√x) dx. Écris d'abord f(x) comme une somme de termes de la table.
  [free, suivre l'erreur]  −3x² − 4x + 6/√x
    = −3x² − 4x + 6x^(−1/2)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−3x² − 4x + 6x^(−1/2)) dx
    = −3(∫ x² dx) − 4(∫ x dx) + 6(∫ x^(−1/2) dx)   ← Linéarité
    = −x³ − 2x² + 12√x + C   ← Table des primitives, + C
  aides : Écris d'abord f comme une somme de termes de la table, puis intègre terme par terme (∫xⁿ dx = xⁿ⁺¹/(n + 1), ∫dx/x = ln|x|…) ; vérifie en dérivant. | = −x³ − 2x² + □ + C | = −x³ − 2x² + 12√x + C
  pièges : g6_antideriv_power_minus_one

```

### Niveau 5

```
Trouve la primitive F de f(x) = −4x³ − 6√x − 3/x³ telle que F(1) = −1.
  [free, sans aide]  −4x³ − 6√x − 3/x³
    = −4x³ − 6x^(1/2) − 3x^(−3)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−4x³ − 6x^(1/2) − 3x^(−3)) dx
    = −4(∫ x³ dx) − 6(∫ x^(1/2) dx) − 3(∫ x^(−3) dx)   ← Linéarité
    = −x⁴ − 4x^(3/2) + 3/(2x²) + C   ← Table des primitives, + C
  — F(1) = −1 : trouve C.  [juge solset]  départ : −(1)⁴ − 4(1)^(3/2) + 3/(2(1)²) + C = −1
    = −7/2 + C = −1   ← Calculer F(x₀)
    = C = 5/2   ← Isoler C
  pièges : g6_antideriv_power_minus_one

Trouve la primitive F de f(x) = −2x + 1/√x − 4/x² telle que F(1) = 9.
  [free, sans aide]  −2x + 1/√x − 4/x²
    = −2x + x^(−1/2) − 4x^(−2)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (−2x + x^(−1/2) − 4x^(−2)) dx
    = −2(∫ x dx) + ∫ x^(−1/2) dx − 4(∫ x^(−2) dx)   ← Linéarité
    = −x² + 2√x + 4/x + C   ← Table des primitives, + C
  — F(1) = 9 : trouve C.  [juge solset]  départ : −(1)² + 2√(1) + 4/(1) + C = 9
    = 5 + C = 9   ← Calculer F(x₀)
    = C = 4   ← Isoler C
  pièges : g6_antideriv_power_minus_one

Trouve la primitive F de f(x) = x³ + 6x + 3/√x telle que F(1) = 6.
  [free, sans aide]  x³ + 6x + 3/√x
    = x³ + 6x + 3x^(−1/2)   ← Réécrire en puissances
  — Intègre terme par terme :  [juge antideriv]  départ : ∫ (x³ + 6x + 3x^(−1/2)) dx
    = ∫ x³ dx + 6(∫ x dx) + 3(∫ x^(−1/2) dx)   ← Linéarité
    = x⁴/4 + 3x² + 6√x + C   ← Table des primitives, + C
  — F(1) = 6 : trouve C.  [juge solset]  départ : (1)⁴/4 + 3(1)² + 6√(1) + C = 6
    = 37/4 + C = 6   ← Calculer F(x₀)
    = C = −13/4   ← Isoler C
  pièges : g6_antideriv_power_minus_one

```

### Variantes d'examen

```
Quelles sont les primitives de f(x) = −5x³ − 6/x − 6e^(−2x) ?
  ✔ −5x⁴/4 − 6ln(|x|) + 3e^(−2x) + C   · −5x⁴/4 − 6ln(|x|) − 6e^(−2x) + C   · −5x⁴/4 − 6ln(x) + 3e^(−2x) + C [g6_ln_abs]   · −15x² + 6/x² + 3e^(−2x) + C [g6_antideriv_power_minus_one]
  [examen mcq]
  pièges : g6_ln_abs, g6_antideriv_power_minus_one

Vrai ou faux ? « Si F est une primitive de f, alors F + 5 aussi. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Aire entre des courbes (`g6-area`, Gymnase)

_Intersections, courbe du haut, ∫ (haut − bas)._

### Niveau 1

```
Les courbes y = −x² + 5x − 2 et y = 3x − 2 se coupent en x = 0 et x = 2 ; entre les deux, y = −x² + 5x − 2 est au-dessus. Calcule l'aire du domaine qu'elles limitent.
  [guided]  ∫_{0}^{2} (−x² + 2x) dx
    (Aire = ∫ (haut − bas) dx = ∫_{0}^{2} (−x² + 2x) dx.)
    = [−□ + x²]_{0}^{2}   (trous : [−x³/3 + x²]_{0}^{2})   ← Primitive
    = 4/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + x²] de □ à 2 | 4/3

Les courbes y = −3x² + 3 et y = −2x² + 2x se coupent en x = −3 et x = 1 ; entre les deux, y = −3x² + 3 est au-dessus. Calcule l'aire du domaine qu'elles limitent.
  [guided]  ∫_{−3}^{1} (−x² − 2x + 3) dx
    (Aire = ∫ (haut − bas) dx = ∫_{−3}^{1} (−x² − 2x + 3) dx.)
    = [−□ − x² + 3x]_{−3}^{1}   (trous : [−x³/3 − x² + 3x]_{−3}^{1})   ← Primitive
    = 5/3 − (−9)   ← F(b) − F(a)
    = 32/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 − x² + 3x] de −3 à 1 | 32/3

Les courbes y = −2x² + 3x + 2 et y = −x + 2 se coupent en x = 0 et x = 2 ; entre les deux, y = −2x² + 3x + 2 est au-dessus. Calcule l'aire du domaine qu'elles limitent.
  [guided]  ∫_{0}^{2} (−2x² + 4x) dx
    (Aire = ∫ (haut − bas) dx = ∫_{0}^{2} (−2x² + 4x) dx.)
    = [−2□ + □]_{0}^{2}   (trous : [−2x³/3 + 2x²]_{0}^{2})   ← Primitive
    = 8/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−2x³/3 + 2x²] de □ à 2 | 8/3

```

### Niveau 2

```
Soient f(x) = −x² + 3x − 10 et g(x) = −3x − 2. Calcule l'aire du domaine compris entre leurs graphes.
  [guided]  −x² + 3x − 10 = −3x − 2
    = −x² + 6x − 8 = 0   ← Tout du même côté
    = −□□ = 0   (trous : −(x − 2)(x − 4) = 0)   ← Factoriser
    = x = 2 ou x = 4   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{2}^{4} |−x² + 3x − 10 − (−3x − 2)| dx
    ? Sur ]2 ; 4[, quelle courbe est au-dessus ? ✔ y = <math alttext="−x² + 3x − 10"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>−</mo><mn>10</mn></mrow></math> / · y = <math alttext="−3x − 2"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mn>2</mn></mrow></math>
    = ∫_{2}^{4} (−x² + 6x − 8) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−□ + 3x² − 8x]_{2}^{4}   (trous : [−x³/3 + 3x² − 8x]_{2}^{4})   ← Primitive
    = −16/3 − (−20/3)   ← F(b) − F(a)
    = 4/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + 3x² − 8x] de □ à 4 | 4/3
  pièges : g6_area_signed

Soient f(x) = −x² + 7x − 7 et g(x) = 2x − 3. Calcule l'aire du domaine compris entre leurs graphes.
  [guided]  −x² + 7x − 7 = 2x − 3
    = −x² + 5x − 4 = 0   ← Tout du même côté
    = −□□ = 0   (trous : −(x − 1)(x − 4) = 0)   ← Factoriser
    = x = 1 ou x = 4   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{1}^{4} |−x² + 7x − 7 − (2x − 3)| dx
    ? Sur ]1 ; 4[, quelle courbe est au-dessus ? ✔ y = <math alttext="−x² + 7x − 7"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>7</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>−</mo><mn>7</mn></mrow></math> / · y = <math alttext="2x − 3"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mn>3</mn></mrow></math>
    = ∫_{1}^{4} (−x² + 5x − 4) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−□ + 5□ − 4x]_{1}^{4}   (trous : [−x³/3 + 5x²/2 − 4x]_{1}^{4})   ← Primitive
    = 8/3 − (−11/6)   ← F(b) − F(a)
    = 9/2   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + 5x²/2 − 4x] de □ à 4 | 9/2
  pièges : g6_area_signed

Calcule l'aire du domaine limité par la courbe y = x² − 8x + 12 et l'axe Ox.
  [guided]  x² − 8x + 12 = 0
    = □□ = 0   (trous : (x − 2)(x − 6) = 0)   ← Factoriser
    = x = 2 ou x = 6   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{2}^{6} |x² − 8x + 12| dx
    ? Sur ]2 ; 6[, quelle courbe est au-dessus ? ✔ l'axe Ox / · y = <math alttext="x² − 8x + 12"><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>8</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mn>12</mn></mrow></math>
    = ∫_{2}^{6} (−x² + 8x − 12) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−□ + 4x² − 12x]_{2}^{6}   (trous : [−x³/3 + 4x² − 12x]_{2}^{6})   ← Primitive
    = 0 − (−32/3)   ← F(b) − F(a)
    = 32/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + 4x² − 12x] de □ à 6 | 32/3
  pièges : g6_area_signed

```

### Niveau 3

```
Calcule l'aire du domaine limité par les courbes y = 3x² et y = 2x² + 2x.
  [tap, suivre l'erreur, menu steps]  3x² = 2x² + 2x
    = x² − 2x = 0   ← Tout du même côté
    = x(x − 2) = 0   ← Factoriser
    = x = 0 ou x = 2   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{0}^{2} |3x² − (2x² + 2x)| dx
    ? Sur ]0 ; 2[, quelle courbe est au-dessus ? ✔ y = <math alttext="2x² + 2x"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> / · y = <math alttext="3x²"><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></math>
    = ∫_{0}^{2} (−x² + 2x) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−x³/3 + x²]_{0}^{2}   ← Primitive
    = 4/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + x²] de □ à 2 | 4/3
  pièges : g6_area_signed

Calcule l'aire du domaine limité par la courbe y = x² − 2x et l'axe Ox.
  [tap, suivre l'erreur, menu steps]  x² − 2x = 0
    = x(x − 2) = 0   ← Factoriser
    = x = 0 ou x = 2   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{0}^{2} |x² − 2x| dx
    ? Sur ]0 ; 2[, quelle courbe est au-dessus ? ✔ l'axe Ox / · y = <math alttext="x² − 2x"><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math>
    = ∫_{0}^{2} (−x² + 2x) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−x³/3 + x²]_{0}^{2}   ← Primitive
    = 4/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + x²] de □ à 2 | 4/3
  pièges : g6_area_signed

Calcule l'aire du domaine limité par les courbes y = −x² + 2x + 4 et y = −x + 4.
  [tap, suivre l'erreur, menu steps]  −x² + 2x + 4 = −x + 4
    = −x² + 3x = 0   ← Tout du même côté
    = −x(x − 3) = 0   ← Factoriser
    = x = 0 ou x = 3   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{0}^{3} |−x² + 2x + 4 − (−x + 4)| dx
    ? Sur ]0 ; 3[, quelle courbe est au-dessus ? ✔ y = <math alttext="−x² + 2x + 4"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mn>4</mn></mrow></math> / · y = <math alttext="−x + 4"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>4</mn></mrow></math>
    = ∫_{0}^{3} (−x² + 3x) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−x³/3 + 3x²/2]_{0}^{3}   ← Primitive
    = 9/2   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + 3x²/2] de □ à 3 | 9/2
  pièges : g6_area_signed

```

### Niveau 4

```
Soient f(x) = x³ − x² − 3x + 4 et g(x) = −x + 4. Calcule l'aire du domaine compris entre leurs graphes.
  [free, suivre l'erreur]  x³ − x² − 3x + 4 = −x + 4
    = x³ − x² − 2x = 0   ← Tout du même côté
    = x(x + 1)(x − 2) = 0   ← Factoriser
    = x = −1 ou x = 0 ou x = 2   ← Produit nul
  — L'aire est la somme des aires des deux morceaux :  [juge definite]  départ : ∫_{−1}^{0} |x³ − x² − 3x + 4 − (−x + 4)| dx + ∫_{0}^{2} |x³ − x² − 3x + 4 − (−x + 4)| dx
    ? Les courbes se croisent en x = 0. Qui est au-dessus sur chaque morceau ? ✔ <math alttext="x³ − x² − 3x + 4"><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mn>4</mn></mrow></math> sur ]−1 ; 0[, puis <math alttext="−x + 4"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>4</mn></mrow></math> sur ]0 ; 2[ / · <math alttext="x³ − x² − 3x + 4"><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mn>4</mn></mrow></math> sur les deux morceaux / · <math alttext="−x + 4"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>4</mn></mrow></math> sur les deux morceaux
    = ∫_{−1}^{0} (x³ − x² − 2x) dx + ∫_{0}^{2} (−x³ + x² + 2x) dx   ← Courbe du haut sur chaque morceau
    = [x⁴/4 − x³/3 − x²]_{−1}^{0} + [−x⁴/4 + x³/3 + x²]_{0}^{2}   ← Primitive
    = (0 − (−5/12)) + 8/3   ← F(b) − F(a)
    = 37/12   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [x⁴/4 − x³/3 − x²] de −1 à 0 + [−x⁴/4 + x³/3 + x²] de □ à 2 | 37/12
  pièges : g6_area_signed

Quelle est l'aire comprise entre le graphe de f(x) = −x² + 4 et l'axe des x ?
  [free, suivre l'erreur]  −x² + 4 = 0
    = −(x + 2)(x − 2) = 0   ← Factoriser
    = x = −2 ou x = 2   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{−2}^{2} |−x² + 4| dx
    ? Sur ]−2 ; 2[, quelle courbe est au-dessus ? ✔ y = <math alttext="−x² + 4"><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mn>4</mn></mrow></math> / · l'axe Ox
    = ∫_{−2}^{2} (−x² + 4) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−x³/3 + 4x]_{−2}^{2}   ← Primitive
    = 16/3 − (−16/3)   ← F(b) − F(a)
    = 32/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−x³/3 + 4x] de −2 à 2 | 32/3
  pièges : g6_area_signed

Calcule l'aire du domaine limité par la courbe y = −2x² − 4x et l'axe Ox.
  [free, suivre l'erreur]  −2x² − 4x = 0
    = −2x(x + 2) = 0   ← Factoriser
    = x = −2 ou x = 0   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{−2}^{0} |−2x² − 4x| dx
    ? Sur ]−2 ; 0[, quelle courbe est au-dessus ? ✔ y = <math alttext="−2x² − 4x"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> / · l'axe Ox
    = ∫_{−2}^{0} (−2x² − 4x) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−2x³/3 − 2x²]_{−2}^{0}   ← Primitive
    = 0 − (−8/3)   ← F(b) − F(a)
    = 8/3   ← Calculer
  aides : Trouve les intersections, puis intègre (haut − bas) sur chaque morceau : une aire est positive. | [−2x³/3 − 2x²] de −2 à 0 | 8/3
  pièges : g6_area_signed

```

### Niveau 5

```
Soient f(x) = x³ + 4x² + 2x − 1 et g(x) = −x − 1. Calcule l'aire du domaine compris entre leurs graphes.
  [free, sans aide]  x³ + 4x² + 2x − 1 = −x − 1
    = x³ + 4x² + 3x = 0   ← Tout du même côté
    = x(x + 3)(x + 1) = 0   ← Factoriser
    = x = −3 ou x = −1 ou x = 0   ← Produit nul
  — L'aire est la somme des aires des deux morceaux :  [juge definite]  départ : ∫_{−3}^{−1} |x³ + 4x² + 2x − 1 − (−x − 1)| dx + ∫_{−1}^{0} |x³ + 4x² + 2x − 1 − (−x − 1)| dx
    ? Les courbes se croisent en x = −1. Qui est au-dessus sur chaque morceau ? ✔ <math alttext="x³ + 4x² + 2x − 1"><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>−</mo><mn>1</mn></mrow></math> sur ]−3 ; −1[, puis <math alttext="−x − 1"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>−</mo><mn>1</mn></mrow></math> sur ]−1 ; 0[ / · <math alttext="x³ + 4x² + 2x − 1"><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>−</mo><mn>1</mn></mrow></math> sur les deux morceaux / · <math alttext="−x − 1"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>−</mo><mn>1</mn></mrow></math> sur les deux morceaux
    = ∫_{−3}^{−1} (x³ + 4x² + 3x) dx + ∫_{−1}^{0} (−x³ − 4x² − 3x) dx   ← Courbe du haut sur chaque morceau
    = [x⁴/4 + 4x³/3 + 3x²/2]_{−3}^{−1} + [−x⁴/4 − 4x³/3 − 3x²/2]_{−1}^{0}   ← Primitive
    = (5/12 − (−9/4)) + (0 − (−5/12))   ← F(b) − F(a)
    = 37/12   ← Calculer
  pièges : g6_area_signed

Quelle est l'aire comprise entre le graphe de f(x) = −x³ + 4x et l'axe des x ?
  [free, sans aide]  −x³ + 4x = 0
    = −x(x + 2)(x − 2) = 0   ← Factoriser
    = x = −2 ou x = 0 ou x = 2   ← Produit nul
  — L'aire est la somme des aires des deux morceaux :  [juge definite]  départ : ∫_{−2}^{0} |−x³ + 4x| dx + ∫_{0}^{2} |−x³ + 4x| dx
    ? La courbe coupe l’axe Ox en x = 0. Qui est au-dessus sur chaque morceau ? ✔ Ox sur ]−2 ; 0[, puis <math alttext="−x³ + 4x"><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> sur ]0 ; 2[ / · Ox sur les deux morceaux / · <math alttext="−x³ + 4x"><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> sur les deux morceaux
    = ∫_{−2}^{0} (x³ − 4x) dx + ∫_{0}^{2} (−x³ + 4x) dx   ← Courbe du haut sur chaque morceau
    = [x⁴/4 − 2x²]_{−2}^{0} + [−x⁴/4 + 2x²]_{0}^{2}   ← Primitive
    = (0 − (−4)) + 4   ← F(b) − F(a)
    = 8   ← Calculer
  pièges : g6_area_signed

Calcule l'aire du domaine limité par les courbes y = −x³ − x² + 5x et y = 3x.
  [free, sans aide]  −x³ − x² + 5x = 3x
    = −x³ − x² + 2x = 0   ← Tout du même côté
    = −x(x + 2)(x − 1) = 0   ← Factoriser
    = x = −2 ou x = 0 ou x = 1   ← Produit nul
  — L'aire est la somme des aires des deux morceaux :  [juge definite]  départ : ∫_{−2}^{0} |−x³ − x² + 5x − 3x| dx + ∫_{0}^{1} |−x³ − x² + 5x − 3x| dx
    ? Les courbes se croisent en x = 0. Qui est au-dessus sur chaque morceau ? ✔ <math alttext="3x"><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></math> sur ]−2 ; 0[, puis <math alttext="−x³ − x² + 5x"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> sur ]0 ; 1[ / · <math alttext="3x"><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></math> sur les deux morceaux / · <math alttext="−x³ − x² + 5x"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> sur les deux morceaux
    = ∫_{−2}^{0} (x³ + x² − 2x) dx + ∫_{0}^{1} (−x³ − x² + 2x) dx   ← Courbe du haut sur chaque morceau
    = [x⁴/4 + x³/3 − x²]_{−2}^{0} + [−x⁴/4 − x³/3 + x²]_{0}^{1}   ← Primitive
    = (0 − (−8/3)) + 5/12   ← F(b) − F(a)
    = 37/12   ← Calculer
  pièges : g6_area_signed

```

### Variantes d'examen

```
Quelle est l'aire du domaine limité par les courbes y = 4x² − 7x − 3 et y = 2x² − 3x − 3 ?
  · 4/3   · −8/3 [g6_area_signed]   · 16/3   ✔ 8/3
  [examen mcq]
  pièges : g6_area_signed

Vrai ou faux ? « L'aire entre y = x² et y = x sur [0 ; 1] vaut ∫_{0}^{1} (x² − x) dx. »
  · Vrai [g6_area_signed]   ✔ Faux
  [examen tf]
  pièges : g6_area_signed

Calcule l'aire du domaine limité par la courbe y = −x² − 4x − 3 et l'axe Ox.
  [free, sans aide, examen open]  −x² − 4x − 3 = 0
    = −(x + 3)(x + 1) = 0   ← Factoriser
    = x = −3 ou x = −1   ← Produit nul
  — L'aire vaut :  [juge definite]  départ : ∫_{−3}^{−1} |−x² − 4x − 3| dx
    ? Sur ]−3 ; −1[, quelle courbe est au-dessus ? ✔ y = <math alttext="−x² − 4x − 3"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>−</mo><mn>3</mn></mrow></math> / · l'axe Ox
    = ∫_{−3}^{−1} (−x² − 4x − 3) dx   ← Courbe du haut : intégrer (haut − bas)
    = [−x³/3 − 2x² − 3x]_{−3}^{−1}   ← Primitive
    = 4/3   ← Calculer
  pièges : g6_area_signed

```

## Dérivée implicite, tangente à une courbe implicite (`g6-deriv-implicit`, CMS)

_Dériver F(x, y) = 0 par rapport à x, isoler y′, tangente en un point._

### Niveau 1

```
Γ : 2x³ + 3x·y² + y³ = 22. y dépend de x : dérive les deux membres par rapport à x.
  [guided]  (2x³ + 3x·y² + y³)′
    (Le membre de droite est constant : sa dérivée est 0. Pour un terme en y, la règle de chaîne donne un facteur y′ : (y³)′ = 3y²·y′.)
    = 6x² + 3y² + □ + □   (trous : 6x² + 3y² + 6x·y·y′ + 3y²·y′)   ← Dériver par rapport à x
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | 6x² + 3y² + □ + 3y²·y′ = 0 | y′ = −(6x² + 3y²)/(6x·y + 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : −3x + 3x²·y + y³ = 6. y dépend de x : dérive les deux membres par rapport à x.
  [guided]  (−3x + 3x²·y + y³)′
    (Le membre de droite est constant : sa dérivée est 0. Pour un terme en y, la règle de chaîne donne un facteur y′ : (y³)′ = 3y²·y′.)
    = −3 + 6x·y + □ + □   (trous : −3 + 6x·y + 3x²·y′ + 3y²·y′)   ← Dériver par rapport à x
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | −3 + 6x·y + □ + 3y²·y′ = 0 | y′ = (3 − 6x·y)/(3x² + 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : −3x − x² + x²·y + y³ = −8. y dépend de x : dérive les deux membres par rapport à x.
  [guided]  (−3x − x² + x²·y + y³)′
    (Le membre de droite est constant : sa dérivée est 0. Pour un terme en y, la règle de chaîne donne un facteur y′ : (y³)′ = 3y²·y′.)
    = −3 − 2x + 2x·y + □ + □   (trous : −3 − 2x + 2x·y + x²·y′ + 3y²·y′)   ← Dériver par rapport à x
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | −3 − 2x + 2x·y + □ + 3y²·y′ = 0 | y′ = (3 + 2x − 2x·y)/(x² + 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 2

```
Γ : −x² + 2x³ − x²·y − y³ = −1. Calcule y′ en fonction de x et de y.
  [guided]  (−x² + 2x³ − x²·y − y³)′
    ? Que vaut la dérivée de <math alttext="y³"><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></math> par rapport à x ? ✔ <math alttext="3y²·y′"><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>·</mo><mrow><mi>y</mi><mo lspace="0" rspace="0">′</mo></mrow></mrow></math> / · <math alttext="3y²"><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math> / · <math alttext="0"><mn>0</mn></math>
    = −2x + 6x² − 2x·y − □ − 3y²·y′   (trous : −2x + 6x² − 2x·y − x²·y′ − 3y²·y′)   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −2x + 6x² − 2x·y − x²·p − 3y²·p = 0
    = p(□) = 2x − 6x² + 2x·y   (trous : p(−x² − 3y²) = 2x − 6x² + 2x·y)   ← Regrouper les termes en p
    = p = (2x − 6x² + 2x·y)/(−x² − 3y²)   ← Diviser
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | −2x + 6x² − 2x·y − □ − 3y²·y′ = 0 | y′ = (2x − 6x² + 2x·y)/(−x² − 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : −y − x² + 3x·y² − y³ = 21. Calcule y′ en fonction de x et de y.
  [guided]  (−y − x² + 3x·y² − y³)′
    ? Que vaut la dérivée de <math alttext="y³"><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></math> par rapport à x ? ✔ <math alttext="3y²·y′"><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>·</mo><mrow><mi>y</mi><mo lspace="0" rspace="0">′</mo></mrow></mrow></math> / · <math alttext="3y²"><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math> / · <math alttext="0"><mn>0</mn></math>
    = −y′ − 2x + 3y² + □ − 3y²·y′   (trous : −y′ − 2x + 3y² + 6x·y·y′ − 3y²·y′)   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −p − 2x + 3y² + 6x·y·p − 3y²·p = 0
    = p(□) = 2x − 3y²   (trous : p(−1 + 6x·y − 3y²) = 2x − 3y²)   ← Regrouper les termes en p
    = p = (2x − 3y²)/(−1 + 6x·y − 3y²)   ← Diviser
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | −y′ − 2x + 3y² + □ − 3y²·y′ = 0 | y′ = (2x − 3y²)/(−1 + 6x·y − 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : −2y − x² − 3x·y² − y³ = 3. Calcule y′ en fonction de x et de y.
  [guided]  (−2y − x² − 3x·y² − y³)′
    ? Que vaut la dérivée de <math alttext="x·y²"><mrow><mi>x</mi><mo>·</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math> par rapport à x ? ✔ <math alttext="y² + 2x·y·y′"><mrow><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup><mo>+</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>·</mo><mi>y</mi></mrow><mo>·</mo><mrow><mi>y</mi><mo lspace="0" rspace="0">′</mo></mrow></mrow></mrow></math> / · <math alttext="2x·y·y′"><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>·</mo><mi>y</mi></mrow><mo>·</mo><mrow><mi>y</mi><mo lspace="0" rspace="0">′</mo></mrow></mrow></math> / · <math alttext="y²"><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></math>
    = □ − 2x − 3y² − 6x·y·y′ − 3y²·y′   (trous : −2·y′ − 2x − 3y² − 6x·y·y′ − 3y²·y′)   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −2·p − 2x − 3y² − 6x·y·p − 3y²·p = 0
    = p(□) = 2x + 3y²   (trous : p(−2 − 6x·y − 3y²) = 2x + 3y²)   ← Regrouper les termes en p
    = p = (2x + 3y²)/(−2 − 6x·y − 3y²)   ← Diviser
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | □ − 2x − 3y² − 6x·y·y′ − 3y²·y′ = 0 | y′ = (2x + 3y²)/(−2 − 6x·y − 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 3

```
Γ : 2y² − x³ − 2x·y² + y³ = −2. Le point T(1 ; −1) est sur Γ. Calcule y′, puis la pente de la tangente à Γ en T.
  [tap, suivre l'erreur, menu steps]  (2y² − x³ − 2x·y² + y³)′
    = 4y·y′ − 3x² − 2y² − 4x·y·y′ + 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : 4y·p − 3x² − 2y² − 4x·y·p + 3y²·p = 0
    = p(4y − 4x·y + 3y²) = 3x² + 2y²   ← Regrouper les termes en p
    = p = (3x² + 2y²)/(4y − 4x·y + 3y²)   ← Diviser
  — Pente en T(1 ; −1) :  [juge value]  départ : (3·1² + 2·(−1)²)/(4·(−1) − 4·1·(−1) + 3·(−1)²)
    = 5/3   ← Calculer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | □ − 3x² − 2y² − 4x·y·y′ + 3y²·y′ = 0 | y′ = (3x² + 2y²)/(4y − 4x·y + 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : 3x + 2x·y + y² − y³ = −5. Le point T(−1 ; 1) est sur Γ. Calcule y′, puis la pente de la tangente à Γ en T.
  [tap, suivre l'erreur, menu steps]  (3x + 2x·y + y² − y³)′
    = 3 + 2y + 2x·y′ + 2y·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : 3 + 2y + 2x·p + 2y·p − 3y²·p = 0
    = p(2x + 2y − 3y²) = −3 − 2y   ← Regrouper les termes en p
    = p = −(3 + 2y)/(2x + 2y − 3y²)   ← Diviser
  — Pente en T(−1 ; 1) :  [juge value]  départ : −(3 + 2·1)/(2·(−1) + 2·1 − 3·1²)
    = 5/3   ← Calculer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | 3 + 2y + □ + 2y·y′ − 3y²·y′ = 0 | y′ = −(3 + 2y)/(2x + 2y − 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : −x² − x²·y − y³ = −1. Le point T(1 ; 0) est sur Γ. Calcule y′, puis la pente de la tangente à Γ en T.
  [tap, suivre l'erreur, menu steps]  (−x² − x²·y − y³)′
    = −2x − 2x·y − x²·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −2x − 2x·y − x²·p − 3y²·p = 0
    = p(−x² − 3y²) = 2x + 2x·y   ← Regrouper les termes en p
    = p = (2x + 2x·y)/(−x² − 3y²)   ← Diviser
  — Pente en T(1 ; 0) :  [juge value]  départ : (2·1 + 2·1·0)/(−1² − 3·0²)
    = −2   ← Calculer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | −2x − 2x·y − □ − 3y²·y′ = 0 | y′ = (2x + 2x·y)/(−x² − 3y²)
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 4

```
Γ : −3y + 2x³ + x²·y + y³ = −6. Trouve l'équation de la tangente à Γ au point d'abscisse −1. (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  −3y + 2x³ + x²·y + y³ = −6
    = y³ − 2y + 4 = 0   ← x = −1
    = (y + 2)(y² − 2y + 2) = 0   ← Racine évidente, factoriser
    = y = −2   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (−3y + 2x³ + x²·y + y³)′
    = −3·y′ + 6x² + 2x·y + x²·y′ + 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −3·p + 6x² + 2x·y + x²·p + 3y²·p = 0
    = p(−3 + x² + 3y²) = −6x² − 2x·y   ← Regrouper les termes en p
    = p = −(6x² + 2x·y)/(−3 + x² + 3y²)   ← Diviser
  — Pente en T(−1 ; −2) :  [juge value]  départ : −(6·(−1)² + 2·(−1)·(−2))/(−3 + (−1)² + 3·(−2)²)
    = −1   ← Calculer
  — Tangente en T(−1 ; −2) :  [juge equiv]  départ : −2 + (−1)(x + 1)
    = −x − 3   ← Développer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | □ + 6x² + 2x·y + x²·y′ + 3y²·y′ = 0 | y′ = −(6x² + 2x·y)/(−3 + x² + 3y²)

Γ : 2x·y + 3y² − y³ = −2. Trouve l'équation de la tangente à Γ au point d'abscisse −2. (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  2x·y + 3y² − y³ = −2
    = −y³ + 3y² − 4y + 2 = 0   ← x = −2
    = −(y − 1)(y² − 2y + 2) = 0   ← Racine évidente, factoriser
    = y = 1   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (2x·y + 3y² − y³)′
    = 2y + 2x·y′ + 6y·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : 2y + 2x·p + 6y·p − 3y²·p = 0
    = p(2x + 6y − 3y²) = −2y   ← Regrouper les termes en p
    = p = −2y/(2x + 6y − 3y²)   ← Diviser
  — Pente en T(−2 ; 1) :  [juge value]  départ : −(2·1)/(2·(−2) + 6·1 − 3·1²)
    = 2   ← Calculer
  — Tangente en T(−2 ; 1) :  [juge equiv]  départ : 1 + (2)(x + 2)
    = 2x + 5   ← Développer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | 2y + □ + 6y·y′ − 3y²·y′ = 0 | y′ = −2y/(2x + 6y − 3y²)

La courbe Γ a pour équation x² − 2x·y² − y³ = −8. Détermine le point T de Γ d'abscisse 0, puis la tangente à Γ en T. (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  x² − 2x·y² − y³ = −8
    = −y³ + 8 = 0   ← x = 0
    = −(y − 2)(y² + 2y + 4) = 0   ← Racine évidente, factoriser
    = y = 2   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (x² − 2x·y² − y³)′
    = 2x − 2y² − 4x·y·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : 2x − 2y² − 4x·y·p − 3y²·p = 0
    = p(−4x·y − 3y²) = −2x + 2y²   ← Regrouper les termes en p
    = p = −(2x − 2y²)/(−4x·y − 3y²)   ← Diviser
  — Pente en T(0 ; 2) :  [juge value]  départ : −(2·0 − 2·2²)/(−4·0·2 − 3·2²)
    = −2/3   ← Calculer
  — Tangente en T(0 ; 2) :  [juge equiv]  départ : 2 + (−2/3)x
    = −2x/3 + 2   ← Développer
  aides : Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. Puis isole y′. | 2x − 2y² − □ − 3y²·y′ = 0 | y′ = −(2x − 2y²)/(−4x·y − 3y²)

```

### Niveau 5

```
La courbe Γ a pour équation −x² − x·y + y³ = −8. Détermine le point T de Γ d'abscisse 2, puis la tangente à Γ en T. (Écris y′ pour la dérivée de y.)
  [free, sans aide]  −x² − x·y + y³ = −8
    = y³ − 2y + 4 = 0   ← x = 2
    = (y + 2)(y² − 2y + 2) = 0   ← Racine évidente, factoriser
    = y = −2   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (−x² − x·y + y³)′
    = −2x − y − x·y′ + 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −2x − y − x·p + 3y²·p = 0
    = p(−x + 3y²) = 2x + y   ← Regrouper les termes en p
    = p = (2x + y)/(−x + 3y²)   ← Diviser
  — Pente en T(2 ; −2) :  [juge value]  départ : (2·2 + (−2))/(−2 + 3·(−2)²)
    = 1/5   ← Calculer
  — Tangente en T(2 ; −2) :  [juge equiv]  départ : −2 + (1/5)(x − 2)
    = x/5 − 12/5   ← Développer

La courbe Γ a pour équation −3x² − 2x·y − y³ = 1. Détermine le point T de Γ d'abscisse 0, puis la tangente à Γ en T. (Écris y′ pour la dérivée de y.)
  [free, sans aide]  −3x² − 2x·y − y³ = 1
    = −y³ − 1 = 0   ← x = 0
    = −(y + 1)(y² − y + 1) = 0   ← Racine évidente, factoriser
    = y = −1   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (−3x² − 2x·y − y³)′
    = −6x − 2y − 2x·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −6x − 2y − 2x·p − 3y²·p = 0
    = p(−2x − 3y²) = 6x + 2y   ← Regrouper les termes en p
    = p = (6x + 2y)/(−2x − 3y²)   ← Diviser
  — Pente en T(0 ; −1) :  [juge value]  départ : (6·0 + 2·(−1))/(−2·0 − 3·(−1)²)
    = 2/3   ← Calculer
  — Tangente en T(0 ; −1) :  [juge equiv]  départ : −1 + (2/3)x
    = 2x/3 − 1   ← Développer

Γ : −x² + x·y − y³ = −1. Trouve l'équation de la tangente à Γ au point d'abscisse 0. (Écris y′ pour la dérivée de y.)
  [free, sans aide]  −x² + x·y − y³ = −1
    = −y³ + 1 = 0   ← x = 0
    = −(y − 1)(y² + y + 1) = 0   ← Racine évidente, factoriser
    = y = 1   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (−x² + x·y − y³)′
    = −2x + y + x·y′ − 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −2x + y + x·p − 3y²·p = 0
    = p(x − 3y²) = 2x − y   ← Regrouper les termes en p
    = p = (2x − y)/(x − 3y²)   ← Diviser
  — Pente en T(0 ; 1) :  [juge value]  départ : (2·0 − 1)/(−3·1²)
    = 1/3   ← Calculer
  — Tangente en T(0 ; 1) :  [juge equiv]  départ : 1 + (1/3)x
    = x/3 + 1   ← Développer

```

### Variantes d'examen

```
Γ : −3x·y + 3y² + 2x³ + y³ = −6, où y dépend de x. En dérivant par rapport à x, on obtient :
  · −3y − 3x·y′ + 6y + 6x² + 3y² = 0 [g6_implicit_yprime_forgot]   ✔ −3y − 3x·y′ + 6y·y′ + 6x² + 3y²·y′ = 0   · −3y − 3x + 6y + 6x² + 3y² = 0 [g6_implicit_yprime_forgot]   · −3x·y′ + 6y·y′ + 6x² + 3y²·y′ = 0 [g6_implicit_xy]
  [examen mcq]
  pièges : g6_implicit_yprime_forgot, g6_implicit_xy

Le point T(−2 ; 0) est sur la courbe Γ : x + y + x²·y + y³ = −2. Quelle est la pente de la tangente à Γ en T ?
  → -1/5
  [examen coef]

La courbe Γ a pour équation −3x·y − 3y² + y³ = 2. Détermine le point T de Γ d'abscisse −1, puis la tangente à Γ en T. (Écris y′ pour la dérivée de y.)
  [free, sans aide, examen open]  −3x·y − 3y² + y³ = 2
    = y³ − 3y² + 3y − 2 = 0   ← x = −1
    = (y − 2)(y² − y + 1) = 0   ← Racine évidente, factoriser
    = y = 2   ← Le trinôme n'a pas de racine réelle
  — Dérive les deux membres par rapport à x. Le membre de droite est constant : sa dérivée est 0. y dépend de x : écris y′.  [juge equiv]  départ : (−3x·y − 3y² + y³)′
    = −3y − 3x·y′ − 6y·y′ + 3y²·y′   ← Dériver par rapport à x
  — On note p = y′. Isole p :  [juge solset]  départ : −3y − 3x·p − 6y·p + 3y²·p = 0
    = p(−3x − 6y + 3y²) = 3y   ← Regrouper les termes en p
    = p = 3y/(−3x − 6y + 3y²)   ← Diviser
  — Pente en T(−1 ; 2) :  [juge value]  départ : (3·2)/(−3·(−1) − 6·2 + 3·2²)
    = 2   ← Calculer
  — Tangente en T(−1 ; 2) :  [juge equiv]  départ : 2 + (2)(x + 1)
    = 2x + 4   ← Développer

```

## Tangente imposée à une courbe ; tangente commune à deux courbes (`g6-common-tangent`, CMS)

_T sur la courbe, T sur la droite, même pente : trouver T puis le paramètre._

### Niveau 1

```
Γ : −2x·y² + 2x·y − y² + p = 0 (p ∈ ℝ) et t : y = −x − 2. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? En dérivant : −2y² − 4x·y·y′ + 2y + 2x·y′ − 2y·y′ = 0.
  [guided]  −2y² − 4x·y·(−1) + 2y + 2x·(−1) − 2y·(−1) = 0
    (La pente de t est −1 : on remplace y′ par −1. T est sur t : on remplace y par −x − 2.)
    = −6x² − □ − 16 = 0   (trous : −6x² − 22x − 16 = 0)   ← y′ = −1, et y = <math alttext="−x − 2"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>−</mo><mn>2</mn></mrow></math> (T sur t)
    = −2(x + 1)(3x + 8) = 0   ← Factoriser
    = x = −8/3 ou x = −1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : −2x·y² + 2x·y − y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = −1, donc T(−1 ; −1) / · x = −8/3, donc T(−8/3 ; 2/3)
    = 3 + p = 0   ← T(−1 ; −1) sur Γ
    = p = □   (trous : p = −3)   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −6x² − 22x − 16 = 0, donc x = … | T(−1 ; −1), p = −3

Γ : 3x·y² + y³ + 3x·y + p = 0 (p ∈ ℝ) et t : y = x − 4. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? En dérivant : 3y² + 6x·y·y′ + 3y²·y′ + 3y + 3x·y′ = 0.
  [guided]  3y² + 6x·y + 3y² + 3y + 3x = 0
    (La pente de t est 1 : on remplace y′ par 1. T est sur t : on remplace y par x − 4.)
    = 12x² − □ + 84 = 0   (trous : 12x² − 66x + 84 = 0)   ← y′ = 1, et y = <math alttext="x − 4"><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></math> (T sur t)
    = 6(x − 2)(2x − 7) = 0   ← Factoriser
    = x = 2 ou x = 7/2   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 3x·y² + y³ + 3x·y + p = 0
    ? Quel point T retiens-tu ? ✔ x = 2, donc T(2 ; −2) / · x = 7/2, donc T(7/2 ; −1/2)
    = 4 + p = 0   ← T(2 ; −2) sur Γ
    = p = □   (trous : p = −4)   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | 12x² − 66x + 84 = 0, donc x = … | T(2 ; −2), p = −4

Γ : x³ − 3x·y² + x·y + p = 0 (p ∈ ℝ) et t : y = −x − 1. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? En dérivant : 3x² − 3y² − 6x·y·y′ + y + x·y′ = 0.
  [guided]  3x² − 3y² − 6x·y·(−1) + y + x·(−1) = 0
    (La pente de t est −1 : on remplace y′ par −1. T est sur t : on remplace y par −x − 1.)
    = −6x² − □ − 4 = 0   (trous : −6x² − 14x − 4 = 0)   ← y′ = −1, et y = <math alttext="−x − 1"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>−</mo><mn>1</mn></mrow></math> (T sur t)
    = −2(x + 2)(3x + 1) = 0   ← Factoriser
    = x = −2 ou x = −1/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : x³ − 3x·y² + x·y + p = 0
    ? Quel point T retiens-tu ? ✔ x = −2, donc T(−2 ; 1) / · x = −1/3, donc T(−1/3 ; −2/3)
    = −4 + p = 0   ← T(−2 ; 1) sur Γ
    = p = □   (trous : p = 4)   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −6x² − 14x − 4 = 0, donc x = … | T(−2 ; 1), p = 4

```

### Niveau 2

```
Trouve p pour que la droite y = x − 4 soit tangente à la courbe −x³ − x·y² − 3x·y + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [guided]  (−x³ − x·y² − 3x·y + p)′
    ? Quelles conditions écris-tu pour T ? ✔ T ∈ Γ, T ∈ t, et la pente de Γ en T est celle de t / · T ∈ Γ et T ∈ t seulement / · Seulement : la pente de Γ en T est celle de t
    = −3x² − y² − □ − 3y − 3x·y′   (trous : −3x² − y² − 2x·y·y′ − 3y − 3x·y′)   ← Dériver implicitement
  — La pente de t est 1 : y′ = 1. T est sur t : y = x − 4.  [juge solset]  départ : −3x² − y² − 2x·y − 3y − 3x = 0
    = □x² + 10x − 4 = 0   (trous : −6x² + 10x − 4 = 0)   ← y′ = 1, et y = <math alttext="x − 4"><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></math> (T sur t)
    = −2(x − 1)(3x − 2) = 0   ← Factoriser
    = x = 2/3 ou x = 1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : −x³ − x·y² − 3x·y + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; −3) / · x = 2/3, donc T(2/3 ; −10/3)
    = −1 + p = 0   ← T(1 ; −3) sur Γ
    = p = 1   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −6x² + 10x − 4 = 0, donc x = … | T(1 ; −3), p = 1
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = 2x + 1 soit tangente à la courbe −x³ + 3x·y − y² + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [guided]  (−x³ + 3x·y − y² + p)′
    ? Quelles conditions écris-tu pour T ? ✔ T ∈ Γ, T ∈ t, et la pente de Γ en T est celle de t / · T ∈ Γ et T ∈ t seulement / · Seulement : la pente de Γ en T est celle de t
    = −3x² + 3y + □ − 2y·y′   (trous : −3x² + 3y + 3x·y′ − 2y·y′)   ← Dériver implicitement
  — La pente de t est 2 : y′ = 2. T est sur t : y = 2x + 1.  [juge solset]  départ : −3x² + 3y + 3x·2 − 2y·2 = 0
    = □x² + 4x − 1 = 0   (trous : −3x² + 4x − 1 = 0)   ← y′ = 2, et y = <math alttext="2x + 1"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>1</mn></mrow></math> (T sur t)
    = −(x − 1)(3x − 1) = 0   ← Factoriser
    = x = 1/3 ou x = 1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : −x³ + 3x·y − y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; 3) / · x = 1/3, donc T(1/3 ; 5/3)
    = −1 + p = 0   ← T(1 ; 3) sur Γ
    = p = 1   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −3x² + 4x − 1 = 0, donc x = … | T(1 ; 3), p = 1
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = −2x − 4 soit tangente à la courbe −2x²·y + x·y² + y² + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [guided]  (−2x²·y + x·y² + y² + p)′
    ? Quelles conditions écris-tu pour T ? ✔ T ∈ Γ, T ∈ t, et la pente de Γ en T est celle de t / · T ∈ Γ et T ∈ t seulement / · Seulement : la pente de Γ en T est celle de t
    = −4x·y − □ + y² + 2x·y·y′ + 2y·y′   (trous : −4x·y − 2x²·y′ + y² + 2x·y·y′ + 2y·y′)   ← Dériver implicitement
  — La pente de t est −2 : y′ = −2. T est sur t : y = −2x − 4.  [juge solset]  départ : −4x·y − 2x²·(−2) + y² + 2x·y·(−2) + 2y·(−2) = 0
    = □x² + 56x + 32 = 0   (trous : 24x² + 56x + 32 = 0)   ← y′ = −2, et y = <math alttext="−2x − 4"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mn>4</mn></mrow></math> (T sur t)
    = 8(x + 1)(3x + 4) = 0   ← Factoriser
    = x = −4/3 ou x = −1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : −2x²·y + x·y² + y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = −1, donc T(−1 ; −2) / · x = −4/3, donc T(−4/3 ; −4/3)
    = 4 + p = 0   ← T(−1 ; −2) sur Γ
    = p = −4   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | 24x² + 56x + 32 = 0, donc x = … | T(−1 ; −2), p = −4
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 3

```
Trouve p pour que la droite y = x + 1 soit tangente à la courbe x²·y − x·y² − y³ + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [tap, suivre l'erreur, menu steps]  (x²·y − x·y² − y³ + p)′
    = 2x·y + x²·y′ − y² − 2x·y·y′ − 3y²·y′   ← Dériver implicitement
  — La pente de t est 1 : y′ = 1. T est sur t : y = x + 1.  [juge solset]  départ : 2x·y + x² − y² − 2x·y − 3y² = 0
    = −3x² − 8x − 4 = 0   ← y′ = 1, et y = <math alttext="x + 1"><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math> (T sur t)
    = −(x + 2)(3x + 2) = 0   ← Factoriser
    = x = −2 ou x = −2/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : x²·y − x·y² − y³ + p = 0
    ? Quel point T retiens-tu ? ✔ x = −2, donc T(−2 ; −1) / · x = −2/3, donc T(−2/3 ; 1/3)
    = −1 + p = 0   ← T(−2 ; −1) sur Γ
    = p = 1   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −3x² − 8x − 4 = 0, donc x = … | T(−2 ; −1), p = 1
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : x³ − x² − x·y + p = 0 (p ∈ ℝ) et t : y = −2x + 1. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? (Écris y′ pour la dérivée de y.)
  [tap, suivre l'erreur, menu steps]  (x³ − x² − x·y + p)′
    = 3x² − 2x − y − x·y′   ← Dériver implicitement
  — La pente de t est −2 : y′ = −2. T est sur t : y = −2x + 1.  [juge solset]  départ : 3x² − 2x − y − x·(−2) = 0
    = 3x² + 2x − 1 = 0   ← y′ = −2, et y = <math alttext="−2x + 1"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>1</mn></mrow></math> (T sur t)
    = (x + 1)(3x − 1) = 0   ← Factoriser
    = x = −1 ou x = 1/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : x³ − x² − x·y + p = 0
    ? Quel point T retiens-tu ? ✔ x = −1, donc T(−1 ; 3) / · x = 1/3, donc T(1/3 ; 1/3)
    = 1 + p = 0   ← T(−1 ; 3) sur Γ
    = p = −1   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | 3x² + 2x − 1 = 0, donc x = … | T(−1 ; 3), p = −1
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = −x + 2 soit tangente à la courbe −2x·y² − x·y + y² + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [tap, suivre l'erreur, menu steps]  (−2x·y² − x·y + y² + p)′
    = −2y² − 4x·y·y′ − y − x·y′ + 2y·y′   ← Dériver implicitement
  — La pente de t est −1 : y′ = −1. T est sur t : y = −x + 2.  [juge solset]  départ : −2y² − 4x·y·(−1) − y − x·(−1) + 2y·(−1) = 0
    = −6x² + 20x − 14 = 0   ← y′ = −1, et y = <math alttext="−x + 2"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>2</mn></mrow></math> (T sur t)
    = −2(x − 1)(3x − 7) = 0   ← Factoriser
    = x = 1 ou x = 7/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : −2x·y² − x·y + y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; 1) / · x = 7/3, donc T(7/3 ; −1/3)
    = −2 + p = 0   ← T(1 ; 1) sur Γ
    = p = 2   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −6x² + 20x − 14 = 0, donc x = … | T(1 ; 1), p = 2
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 4

```
Γ : 2x³ + x² − x·y + p = 0 (p ∈ ℝ) et t : y = −x + 2. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  (2x³ + x² − x·y + p)′
    = 6x² + 2x − y − x·y′   ← Dériver implicitement
  — La pente de t est −1 : y′ = −1. T est sur t : y = −x + 2.  [juge solset]  départ : 6x² + 2x − y − x·(−1) = 0
    = 6x² + 4x − 2 = 0   ← y′ = −1, et y = <math alttext="−x + 2"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>2</mn></mrow></math> (T sur t)
    = 2(x + 1)(3x − 1) = 0   ← Factoriser
    = x = −1 ou x = 1/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 2x³ + x² − x·y + p = 0
    ? Quel point T retiens-tu ? ✔ x = −1, donc T(−1 ; 3) / · x = 1/3, donc T(1/3 ; 5/3)
    = 2 + p = 0   ← T(−1 ; 3) sur Γ
    = p = −2   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | 6x² + 4x − 2 = 0, donc x = … | T(−1 ; 3), p = −2
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Γ : 3x·y² − y³ + x² + p = 0 (p ∈ ℝ) et t : y = x + 1. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ? (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  (3x·y² − y³ + x² + p)′
    = 3y² + 6x·y·y′ − 3y²·y′ + 2x   ← Dériver implicitement
  — La pente de t est 1 : y′ = 1. T est sur t : y = x + 1.  [juge solset]  départ : 3y² + 6x·y − 3y² + 2x = 0
    = 6x² + 8x = 0   ← y′ = 1, et y = <math alttext="x + 1"><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math> (T sur t)
    = 2x(3x + 4) = 0   ← Factoriser
    = x = −4/3 ou x = 0   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 3x·y² − y³ + x² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 0, donc T(0 ; 1) / · x = −4/3, donc T(−4/3 ; −1/3)
    = −1 + p = 0   ← T(0 ; 1) sur Γ
    = p = 1   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | 6x² + 8x = 0, donc x = … | T(0 ; 1), p = 1
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = −2x + 3 soit tangente à la courbe 3x²·y + 2x² + y² + p = 0 en un point T dont les coordonnées sont entières. (Écris y′ pour la dérivée de y.)
  [free, suivre l'erreur]  (3x²·y + 2x² + y² + p)′
    = 6x·y + 3x²·y′ + 4x + 2y·y′   ← Dériver implicitement
  — La pente de t est −2 : y′ = −2. T est sur t : y = −2x + 3.  [juge solset]  départ : 6x·y + 3x²·(−2) + 4x + 2y·(−2) = 0
    = −18x² + 30x − 12 = 0   ← y′ = −2, et y = <math alttext="−2x + 3"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>3</mn></mrow></math> (T sur t)
    = −6(x − 1)(3x − 2) = 0   ← Factoriser
    = x = 2/3 ou x = 1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 3x²·y + 2x² + y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; 1) / · x = 2/3, donc T(2/3 ; 5/3)
    = 6 + p = 0   ← T(1 ; 1) sur Γ
    = p = −6   ← Isoler p
  aides : Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T (y′ = pente de t). | −18x² + 30x − 12 = 0, donc x = … | T(1 ; 1), p = −6
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Niveau 5

```
Γ : 2x³ + 3x²·y − 3x·y² + p = 0 (p ∈ ℝ) et t : y = −2x + 2. Pour quelle valeur de p la droite t est-elle tangente à Γ en un point T à coordonnées entières ?
  [free, sans aide]  (2x³ + 3x²·y − 3x·y² + p)′
    = 6x² + 6x·y + 3x²·y′ − 3y² − 6x·y·y′   ← Dériver implicitement
  — La pente de t est −2 : y′ = −2. T est sur t : y = −2x + 2.  [juge solset]  départ : 6x² + 6x·y + 3x²·(−2) − 3y² − 6x·y·(−2) = 0
    = −48x² + 60x − 12 = 0   ← y′ = −2, et y = <math alttext="−2x + 2"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>2</mn></mrow></math> (T sur t)
    = −12(x − 1)(4x − 1) = 0   ← Factoriser
    = x = 1/4 ou x = 1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 2x³ + 3x²·y − 3x·y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; 0) / · x = 1/4, donc T(1/4 ; 3/2)
    = 2 + p = 0   ← T(1 ; 0) sur Γ
    = p = −2   ← Isoler p
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = 2x + 3 soit tangente à la courbe 2x²·y − 2x·y² + 3x² + p = 0 en un point T dont les coordonnées sont entières.
  [free, sans aide]  (2x²·y − 2x·y² + 3x² + p)′
    = 4x·y + 2x²·y′ − 2y² − 4x·y·y′ + 6x   ← Dériver implicitement
  — La pente de t est 2 : y′ = 2. T est sur t : y = 2x + 3.  [juge solset]  départ : 4x·y + 2x²·2 − 2y² − 4x·y·2 + 6x = 0
    = −12x² − 30x − 18 = 0   ← y′ = 2, et y = <math alttext="2x + 3"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>3</mn></mrow></math> (T sur t)
    = −6(x + 1)(2x + 3) = 0   ← Factoriser
    = x = −3/2 ou x = −1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 2x²·y − 2x·y² + 3x² + p = 0
    ? Quel point T retiens-tu ? ✔ x = −1, donc T(−1 ; 1) / · x = −3/2, donc T(−3/2 ; 0)
    = 7 + p = 0   ← T(−1 ; 1) sur Γ
    = p = −7   ← Isoler p
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

Trouve p pour que la droite y = 2x + 2 soit tangente à la courbe 2x²·y − 2x·y² − 2x² + p = 0 en un point T dont les coordonnées sont entières.
  [free, sans aide]  (2x²·y − 2x·y² − 2x² + p)′
    = 4x·y + 2x²·y′ − 2y² − 4x·y·y′ − 4x   ← Dériver implicitement
  — La pente de t est 2 : y′ = 2. T est sur t : y = 2x + 2.  [juge solset]  départ : 4x·y + 2x²·2 − 2y² − 4x·y·2 − 4x = 0
    = −12x² − 28x − 8 = 0   ← y′ = 2, et y = <math alttext="2x + 2"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>2</mn></mrow></math> (T sur t)
    = −4(x + 2)(3x + 1) = 0   ← Factoriser
    = x = −2 ou x = −1/3   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : 2x²·y − 2x·y² − 2x² + p = 0
    ? Quel point T retiens-tu ? ✔ x = −2, donc T(−2 ; −2) / · x = −1/3, donc T(−1/3 ; 4/3)
    = −8 + p = 0   ← T(−2 ; −2) sur Γ
    = p = 8   ← Isoler p
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

### Variantes d'examen

```
Trouve p pour que la droite y = 2x − 2 soit tangente à la courbe x²·y − x² + y² + p = 0 en un point T dont les coordonnées sont entières.
  [free, sans aide, examen open]  (x²·y − x² + y² + p)′
    = 2x·y + x²·y′ − 2x + 2y·y′   ← Dériver implicitement
  — La pente de t est 2 : y′ = 2. T est sur t : y = 2x − 2.  [juge solset]  départ : 2x·y + x²·2 − 2x + 2y·2 = 0
    = 6x² + 2x − 8 = 0   ← y′ = 2, et y = <math alttext="2x − 2"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mn>2</mn></mrow></math> (T sur t)
    = 2(x − 1)(3x + 4) = 0   ← Factoriser
    = x = −4/3 ou x = 1   ← Produit nul
  — T est sur Γ :  [juge solset]  départ : x²·y − x² + y² + p = 0
    ? Quel point T retiens-tu ? ✔ x = 1, donc T(1 ; 0) / · x = −4/3, donc T(−4/3 ; −14/3)
    = −1 + p = 0   ← T(1 ; 0) sur Γ
    = p = 1   ← Isoler p
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot

```

## Points anguleux et de rebroussement (`g6-angular-points`, CMS)

_f par morceaux, f′(a⁻) et f′(a⁺), extremum ou non._

### Niveau 1

```
Soit f(x) = |x + 4|(x − 1). Étudie le point x = −4 : dérivées latérales, nature du point, extremum.
  [guided]  −2x − 3
    (Par morceaux : f(x) = x² + 3x − 4 si x > −4 ; −x² − 3x + 4 si x < −4. Donc f′(x) = 2x + 3 si x > −4 ; −2x − 3 si x < −4.)
    (Dérivée à gauche en −4 : la limite de f′(x) quand x → −4⁻.)
    = −2·(□) − 3   (trous : −2·(−4) − 3)   ← x = −4 dans la dérivée du morceau de gauche
    = 5   ← Calculer
  — Dérivée à droite en −4 : la limite de f′(x) quand x → −4⁺.  [juge limit]  départ : 2x + 3
    = 2·(□) + 3   (trous : 2·(−4) + 3)   ← x = −4 dans la dérivée du morceau de droite
    = −5   ← Calculer
  — Le point A(−4 ; f(−4)) :  [juge value]  départ : |−4 + 4|·(−4 − 1)
    ? En x = −4 : f′(−4⁻) = 5 et f′(−4⁺) = −5. Le point d'abscisse −4 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / ✔ oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de −4 (le signe de x + 4 décide), dérive chaque morceau, puis compare f′(−4⁻) et f′(−4⁺). | f′(−4⁻) = −2·(−4) − 3 = □ | f′(−4⁻) = 5 et f′(−4⁺) = −5 : un maximum local.
  pièges : g6_angular_not_seen

Soit f(x) = |x² − 3x| − 4x − 4. Étudie le point x = 0 : dérivées latérales, nature du point, extremum.
  [guided]  2x − 7
    (Par morceaux : f(x) = x² − 7x − 4 si x < 0 ou x > 3 ; −x² − x − 4 si 0 < x < 3. Donc f′(x) = 2x − 7 si x < 0 ou x > 3 ; −2x − 1 si 0 < x < 3.)
    (Dérivée à gauche en 0 : la limite de f′(x) quand x → 0⁻.)
    = 2·□ − 7   (trous : 2·0 − 7)   ← x = 0 dans la dérivée du morceau de gauche
    = −7   ← Calculer
  — Dérivée à droite en 0 : la limite de f′(x) quand x → 0⁺.  [juge limit]  départ : −2x − 1
    = −2·□ − 1   (trous : −2·0 − 1)   ← x = 0 dans la dérivée du morceau de droite
    = −1   ← Calculer
  — Le point A(0 ; f(0)) :  [juge value]  départ : |0² − 3·0| − 4·0 − 4
    ? En x = 0 : f′(0⁻) = −7 et f′(0⁺) = −1. Le point d'abscisse 0 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = −4   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 0 (le signe de x² − 3x décide), dérive chaque morceau, puis compare f′(0⁻) et f′(0⁺). | f′(0⁻) = 2·0 − 7 = □ | f′(0⁻) = −7 et f′(0⁺) = −1 : pas un extremum.
  pièges : g6_angular_not_seen

Soit f(x) = |x + 2|(x − 4). Étudie le point x = −2 : dérivées latérales, nature du point, extremum.
  [guided]  −2x + 2
    (Par morceaux : f(x) = x² − 2x − 8 si x > −2 ; −x² + 2x + 8 si x < −2. Donc f′(x) = 2x − 2 si x > −2 ; −2x + 2 si x < −2.)
    (Dérivée à gauche en −2 : la limite de f′(x) quand x → −2⁻.)
    = −2·(□) + 2   (trous : −2·(−2) + 2)   ← x = −2 dans la dérivée du morceau de gauche
    = 6   ← Calculer
  — Dérivée à droite en −2 : la limite de f′(x) quand x → −2⁺.  [juge limit]  départ : 2x − 2
    = 2·(□) − 2   (trous : 2·(−2) − 2)   ← x = −2 dans la dérivée du morceau de droite
    = −6   ← Calculer
  — Le point A(−2 ; f(−2)) :  [juge value]  départ : |−2 + 2|·(−2 − 4)
    ? En x = −2 : f′(−2⁻) = 6 et f′(−2⁺) = −6. Le point d'abscisse −2 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / ✔ oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de −2 (le signe de x + 2 décide), dérive chaque morceau, puis compare f′(−2⁻) et f′(−2⁺). | f′(−2⁻) = −2·(−2) + 2 = □ | f′(−2⁻) = 6 et f′(−2⁺) = −6 : un maximum local.
  pièges : g6_angular_not_seen

```

### Niveau 2

```
Soit f(x) = |x − 1|(x + 4). Étudie le point x = 1 : dérivées latérales, nature du point, extremum.
  [guided]  |x − 1|(x + 4)
    (Pour x > 1 :)
    = x² + 3x − □   (trous : x² + 3x − 4)   ← Ici x − 1 > 0 : on enlève les barres
  — Pour x < 1 :  [juge equiv]  départ : |x − 1|(x + 4)
    = −x² − 3x + □   (trous : −x² − 3x + 4)   ← Ici x − 1 < 0 : on enlève les barres en changeant le signe
  — Dérivée à gauche en 1 : la limite de f′(x) quand x → 1⁻.  [juge limit]  départ : −2x − 3
    (Les dérivées : f′(x) = 2x + 3 si x > 1 ; −2x − 3 si x < 1.)
    = −2·1 − 3   ← x = 1 dans la dérivée du morceau de gauche
    = −5   ← Calculer
  — Dérivée à droite en 1 : la limite de f′(x) quand x → 1⁺.  [juge limit]  départ : 2x + 3
    = 2·1 + 3   ← x = 1 dans la dérivée du morceau de droite
    = 5   ← Calculer
  — Le point A(1 ; f(1)) :  [juge value]  départ : |1 − 1|·(1 + 4)
    ? En x = 1 : f′(1⁻) = −5 et f′(1⁺) = 5. Le point d'abscisse 1 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? ✔ oui, un minimum local / · oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 1 (le signe de x − 1 décide), dérive chaque morceau, puis compare f′(1⁻) et f′(1⁺). | f′(1⁻) = −2·1 − 3 = □ | f′(1⁻) = −5 et f′(1⁺) = 5 : un minimum local.
  pièges : g1_triangle_reverse, g6_angular_not_seen

Soit f(x) = |x² − 5x + 6| − 4x + 2. Étudie le point x = 2 : dérivées latérales, nature du point, extremum.
  [guided]  |x² − 5x + 6| − 4x + 2
    (Pour x < 2 ou x > 3 :)
    = x² − 9x + □   (trous : x² − 9x + 8)   ← Ici x² − 5x + 6 ≥ 0 : on enlève les barres
  — Pour 2 < x < 3 :  [juge equiv]  départ : |x² − 5x + 6| − 4x + 2
    = −x² + x − □   (trous : −x² + x − 4)   ← Ici x² − 5x + 6 < 0 : on enlève les barres en changeant le signe
  — Dérivée à gauche en 2 : la limite de f′(x) quand x → 2⁻.  [juge limit]  départ : 2x − 9
    (Les dérivées : f′(x) = 2x − 9 si x < 2 ou x > 3 ; −2x + 1 si 2 < x < 3.)
    = 2·2 − 9   ← x = 2 dans la dérivée du morceau de gauche
    = −5   ← Calculer
  — Dérivée à droite en 2 : la limite de f′(x) quand x → 2⁺.  [juge limit]  départ : −2x + 1
    = −2·2 + 1   ← x = 2 dans la dérivée du morceau de droite
    = −3   ← Calculer
  — Le point A(2 ; f(2)) :  [juge value]  départ : |2² − 5·2 + 6| − 4·2 + 2
    ? En x = 2 : f′(2⁻) = −5 et f′(2⁺) = −3. Le point d'abscisse 2 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = −6   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 2 (le signe de x² − 5x + 6 décide), dérive chaque morceau, puis compare f′(2⁻) et f′(2⁺). | f′(2⁻) = 2·2 − 9 = □ | f′(2⁻) = −5 et f′(2⁺) = −3 : pas un extremum.
  pièges : g1_triangle_reverse, g6_angular_not_seen

Soit f(x) = |x + 1|(x − 2). Étudie le point x = −1 : dérivées latérales, nature du point, extremum.
  [guided]  |x + 1|(x − 2)
    (Pour x > −1 :)
    = x² − x − □   (trous : x² − x − 2)   ← Ici x + 1 > 0 : on enlève les barres
  — Pour x < −1 :  [juge equiv]  départ : |x + 1|(x − 2)
    = −x² + x + □   (trous : −x² + x + 2)   ← Ici x + 1 < 0 : on enlève les barres en changeant le signe
  — Dérivée à gauche en −1 : la limite de f′(x) quand x → −1⁻.  [juge limit]  départ : −2x + 1
    (Les dérivées : f′(x) = 2x − 1 si x > −1 ; −2x + 1 si x < −1.)
    = −2·(−1) + 1   ← x = −1 dans la dérivée du morceau de gauche
    = 3   ← Calculer
  — Dérivée à droite en −1 : la limite de f′(x) quand x → −1⁺.  [juge limit]  départ : 2x − 1
    = 2·(−1) − 1   ← x = −1 dans la dérivée du morceau de droite
    = −3   ← Calculer
  — Le point A(−1 ; f(−1)) :  [juge value]  départ : |−1 + 1|·(−1 − 2)
    ? En x = −1 : f′(−1⁻) = 3 et f′(−1⁺) = −3. Le point d'abscisse −1 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / ✔ oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de −1 (le signe de x + 1 décide), dérive chaque morceau, puis compare f′(−1⁻) et f′(−1⁺). | f′(−1⁻) = −2·(−1) + 1 = □ | f′(−1⁻) = 3 et f′(−1⁺) = −3 : un maximum local.
  pièges : g1_triangle_reverse, g6_angular_not_seen

```

### Niveau 3

```
Soit f(x) = |x + 1|(x + 4). Étudie le point x = −1 : dérivées latérales, nature du point, extremum.
  [tap, suivre l'erreur, menu steps]  |x + 1|(x + 4)
    (Pour x > −1 :)
    = x² + 5x + 4   ← Ici x + 1 > 0 : on enlève les barres
  — Pour x < −1 :  [juge equiv]  départ : |x + 1|(x + 4)
    = −x² − 5x − 4   ← Ici x + 1 < 0 : on enlève les barres en changeant le signe
  — Pour x > −1 :  [juge equiv]  départ : (|x + 1|(x + 4))′
    = (x² + 5x + 4)′   ← Dériver le morceau de ce côté
    = 2x + 5   ← Dérivées usuelles
  — Pour x < −1 :  [juge equiv]  départ : (|x + 1|(x + 4))′
    = (−x² − 5x − 4)′   ← Dériver le morceau de ce côté
    = −2x − 5   ← Dérivées usuelles
  — Dérivée à gauche en −1 : la limite de f′(x) quand x → −1⁻.  [juge limit]  départ : −2x − 5
    = −2·(−1) − 5   ← x = −1 dans la dérivée du morceau de gauche
    = −3   ← Calculer
  — Dérivée à droite en −1 : la limite de f′(x) quand x → −1⁺.  [juge limit]  départ : 2x + 5
    = 2·(−1) + 5   ← x = −1 dans la dérivée du morceau de droite
    = 3   ← Calculer
  — Le point A(−1 ; f(−1)) :  [juge value]  départ : |−1 + 1|·(−1 + 4)
    ? En x = −1 : f′(−1⁻) = −3 et f′(−1⁺) = 3. Le point d'abscisse −1 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? ✔ oui, un minimum local / · oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de −1 (le signe de x + 1 décide), dérive chaque morceau, puis compare f′(−1⁻) et f′(−1⁺). | f′(−1⁻) = −2·(−1) − 5 = □ | f′(−1⁻) = −3 et f′(−1⁺) = 3 : un minimum local.
  pièges : g1_triangle_reverse, g6_angular_not_seen, g6_abs_derivative

Soit f(x) = |x² − 5x + 4| − 2x + 4. Étudie le point x = 4 : dérivées latérales, nature du point, extremum.
  [tap, suivre l'erreur, menu steps]  |x² − 5x + 4| − 2x + 4
    (Pour x < 1 ou x > 4 :)
    = x² − 7x + 8   ← Ici x² − 5x + 4 ≥ 0 : on enlève les barres
  — Pour 1 < x < 4 :  [juge equiv]  départ : |x² − 5x + 4| − 2x + 4
    = −x² + 3x   ← Ici x² − 5x + 4 < 0 : on enlève les barres en changeant le signe
  — Pour x < 1 ou x > 4 :  [juge equiv]  départ : (|x² − 5x + 4| − 2x + 4)′
    = (x² − 7x + 8)′   ← Dériver le morceau de ce côté
    = 2x − 7   ← Dérivées usuelles
  — Pour 1 < x < 4 :  [juge equiv]  départ : (|x² − 5x + 4| − 2x + 4)′
    = (−x² + 3x)′   ← Dériver le morceau de ce côté
    = −2x + 3   ← Dérivées usuelles
  — Dérivée à gauche en 4 : la limite de f′(x) quand x → 4⁻.  [juge limit]  départ : −2x + 3
    = −2·4 + 3   ← x = 4 dans la dérivée du morceau de gauche
    = −5   ← Calculer
  — Dérivée à droite en 4 : la limite de f′(x) quand x → 4⁺.  [juge limit]  départ : 2x − 7
    = 2·4 − 7   ← x = 4 dans la dérivée du morceau de droite
    = 1   ← Calculer
  — Le point A(4 ; f(4)) :  [juge value]  départ : |4² − 5·4 + 4| − 2·4 + 4
    ? En x = 4 : f′(4⁻) = −5 et f′(4⁺) = 1. Le point d'abscisse 4 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? ✔ oui, un minimum local / · oui, un maximum local / · non, ce n'est pas un extremum
    = −4   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 4 (le signe de x² − 5x + 4 décide), dérive chaque morceau, puis compare f′(4⁻) et f′(4⁺). | f′(4⁻) = −2·4 + 3 = □ | f′(4⁻) = −5 et f′(4⁺) = 1 : un minimum local.
  pièges : g1_triangle_reverse, g6_angular_not_seen, g6_abs_derivative

Soit f(x) = |x|(x − 3). Étudie le point x = 0 : dérivées latérales, nature du point, extremum.
  [tap, suivre l'erreur, menu steps]  |x|(x − 3)
    (Pour x > 0 :)
    = x² − 3x   ← Ici x > 0 : on enlève les barres
  — Pour x < 0 :  [juge equiv]  départ : |x|(x − 3)
    = −x² + 3x   ← Ici x < 0 : on enlève les barres en changeant le signe
  — Pour x > 0 :  [juge equiv]  départ : (|x|(x − 3))′
    = (x² − 3x)′   ← Dériver le morceau de ce côté
    = 2x − 3   ← Dérivées usuelles
  — Pour x < 0 :  [juge equiv]  départ : (|x|(x − 3))′
    = (−x² + 3x)′   ← Dériver le morceau de ce côté
    = −2x + 3   ← Dérivées usuelles
  — Dérivée à gauche en 0 : la limite de f′(x) quand x → 0⁻.  [juge limit]  départ : −2x + 3
    = −2·0 + 3   ← x = 0 dans la dérivée du morceau de gauche
    = 3   ← Calculer
  — Dérivée à droite en 0 : la limite de f′(x) quand x → 0⁺.  [juge limit]  départ : 2x − 3
    = 2·0 − 3   ← x = 0 dans la dérivée du morceau de droite
    = −3   ← Calculer
  — Le point A(0 ; f(0)) :  [juge value]  départ : |0|·(0 − 3)
    ? En x = 0 : f′(0⁻) = 3 et f′(0⁺) = −3. Le point d'abscisse 0 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / ✔ oui, un maximum local / · non, ce n'est pas un extremum
    = 0   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 0 (le signe de x décide), dérive chaque morceau, puis compare f′(0⁻) et f′(0⁺). | f′(0⁻) = −2·0 + 3 = □ | f′(0⁻) = 3 et f′(0⁺) = −3 : un maximum local.
  pièges : g6_angular_not_seen, g6_abs_derivative

```

### Niveau 4

```
Soit f(x) = |x² − 2x| + 4x + 4. Étudie les points x = 2 et x = 0 : dérivées latérales, nature du point, extremum.
  [free, suivre l'erreur]  |x² − 2x| + 4x + 4
    (Pour x < 0 ou x > 2 :)
    = x² + 2x + 4   ← Ici x² − 2x ≥ 0 : on enlève les barres
  — Pour 0 < x < 2 :  [juge equiv]  départ : |x² − 2x| + 4x + 4
    = −x² + 6x + 4   ← Ici x² − 2x < 0 : on enlève les barres en changeant le signe
  — Pour x < 0 ou x > 2 :  [juge equiv]  départ : (|x² − 2x| + 4x + 4)′
    = (x² + 2x + 4)′   ← Dériver le morceau de ce côté
    = 2x + 2   ← Dérivées usuelles
  — Pour 0 < x < 2 :  [juge equiv]  départ : (|x² − 2x| + 4x + 4)′
    = (−x² + 6x + 4)′   ← Dériver le morceau de ce côté
    = −2x + 6   ← Dérivées usuelles
  — Dérivée à gauche en 2 : la limite de f′(x) quand x → 2⁻.  [juge limit]  départ : −2x + 6
    = −2·2 + 6   ← x = 2 dans la dérivée du morceau de gauche
    = 2   ← Calculer
  — Dérivée à droite en 2 : la limite de f′(x) quand x → 2⁺.  [juge limit]  départ : 2x + 2
    = 2·2 + 2   ← x = 2 dans la dérivée du morceau de droite
    = 6   ← Calculer
  — Le point A(2 ; f(2)) :  [juge value]  départ : |2² − 2·2| + 4·2 + 4
    ? En x = 2 : f′(2⁻) = 2 et f′(2⁺) = 6. Le point d'abscisse 2 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = 12   ← Calculer
  — Dérivée à gauche en 0 : la limite de f′(x) quand x → 0⁻.  [juge limit]  départ : 2x + 2
    = 2·0 + 2   ← x = 0 dans la dérivée du morceau de gauche
    = 2   ← Calculer
  — Dérivée à droite en 0 : la limite de f′(x) quand x → 0⁺.  [juge limit]  départ : −2x + 6
    = −2·0 + 6   ← x = 0 dans la dérivée du morceau de droite
    = 6   ← Calculer
  — Le point A(0 ; f(0)) :  [juge value]  départ : |0² − 2·0| + 4·0 + 4
    ? En x = 0 : f′(0⁻) = 2 et f′(0⁺) = 6. Le point d'abscisse 0 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = 4   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 2 (le signe de x² − 2x décide), dérive chaque morceau, puis compare f′(2⁻) et f′(2⁺). | f′(2⁻) = −2·2 + 6 = □ | f′(2⁻) = 2 et f′(2⁺) = 6 : pas un extremum.
  pièges : g1_triangle_reverse, g6_angular_not_seen

Soit f(x) = |x² − 6x + 8| − 2x + 2. Étudie les points x = 4 et x = 2 : dérivées latérales, nature du point, extremum.
  [free, suivre l'erreur]  |x² − 6x + 8| − 2x + 2
    (Pour x < 2 ou x > 4 :)
    = x² − 8x + 10   ← Ici x² − 6x + 8 ≥ 0 : on enlève les barres
  — Pour 2 < x < 4 :  [juge equiv]  départ : |x² − 6x + 8| − 2x + 2
    = −x² + 4x − 6   ← Ici x² − 6x + 8 < 0 : on enlève les barres en changeant le signe
  — Pour x < 2 ou x > 4 :  [juge equiv]  départ : (|x² − 6x + 8| − 2x + 2)′
    = (x² − 8x + 10)′   ← Dériver le morceau de ce côté
    = 2x − 8   ← Dérivées usuelles
  — Pour 2 < x < 4 :  [juge equiv]  départ : (|x² − 6x + 8| − 2x + 2)′
    = (−x² + 4x − 6)′   ← Dériver le morceau de ce côté
    = −2x + 4   ← Dérivées usuelles
  — Dérivée à gauche en 4 : la limite de f′(x) quand x → 4⁻.  [juge limit]  départ : −2x + 4
    = −2·4 + 4   ← x = 4 dans la dérivée du morceau de gauche
    = −4   ← Calculer
  — Dérivée à droite en 4 : la limite de f′(x) quand x → 4⁺.  [juge limit]  départ : 2x − 8
    = 2·4 − 8   ← x = 4 dans la dérivée du morceau de droite
    = 0   ← Calculer
  — Le point A(4 ; f(4)) :  [juge value]  départ : |4² − 6·4 + 8| − 2·4 + 2
    ? En x = 4 : f′(4⁻) = −4 et f′(4⁺) = 0. Le point d'abscisse 4 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? (Une des dérivées latérales est nulle.) ✔ oui, un minimum local / · oui, un maximum local / · non, ce n'est pas un extremum
    = −6   ← Calculer
  — Dérivée à gauche en 2 : la limite de f′(x) quand x → 2⁻.  [juge limit]  départ : 2x − 8
    = 2·2 − 8   ← x = 2 dans la dérivée du morceau de gauche
    = −4   ← Calculer
  — Dérivée à droite en 2 : la limite de f′(x) quand x → 2⁺.  [juge limit]  départ : −2x + 4
    = −2·2 + 4   ← x = 2 dans la dérivée du morceau de droite
    = 0   ← Calculer
  — Le point A(2 ; f(2)) :  [juge value]  départ : |2² − 6·2 + 8| − 2·2 + 2
    ? En x = 2 : f′(2⁻) = −4 et f′(2⁺) = 0. Le point d'abscisse 2 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? (Une des dérivées latérales est nulle.) · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = −2   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 4 (le signe de x² − 6x + 8 décide), dérive chaque morceau, puis compare f′(4⁻) et f′(4⁺). | f′(4⁻) = −2·4 + 4 = □ | f′(4⁻) = −4 et f′(4⁺) = 0 : un minimum local.
  pièges : g1_triangle_reverse, g6_angular_not_seen, g6_angular_boundary

Soit f(x) = |x² + x − 2| − 4x − 4. Étudie les points x = 1 et x = −2 : dérivées latérales, nature du point, extremum.
  [free, suivre l'erreur]  |x² + x − 2| − 4x − 4
    (Pour x < −2 ou x > 1 :)
    = x² − 3x − 6   ← Ici x² + x − 2 ≥ 0 : on enlève les barres
  — Pour −2 < x < 1 :  [juge equiv]  départ : |x² + x − 2| − 4x − 4
    = −x² − 5x − 2   ← Ici x² + x − 2 < 0 : on enlève les barres en changeant le signe
  — Pour x < −2 ou x > 1 :  [juge equiv]  départ : (|x² + x − 2| − 4x − 4)′
    = (x² − 3x − 6)′   ← Dériver le morceau de ce côté
    = 2x − 3   ← Dérivées usuelles
  — Pour −2 < x < 1 :  [juge equiv]  départ : (|x² + x − 2| − 4x − 4)′
    = (−x² − 5x − 2)′   ← Dériver le morceau de ce côté
    = −2x − 5   ← Dérivées usuelles
  — Dérivée à gauche en 1 : la limite de f′(x) quand x → 1⁻.  [juge limit]  départ : −2x − 5
    = −2·1 − 5   ← x = 1 dans la dérivée du morceau de gauche
    = −7   ← Calculer
  — Dérivée à droite en 1 : la limite de f′(x) quand x → 1⁺.  [juge limit]  départ : 2x − 3
    = 2·1 − 3   ← x = 1 dans la dérivée du morceau de droite
    = −1   ← Calculer
  — Le point A(1 ; f(1)) :  [juge value]  départ : |1² + 1 − 2| − 4·1 − 4
    ? En x = 1 : f′(1⁻) = −7 et f′(1⁺) = −1. Le point d'abscisse 1 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = −8   ← Calculer
  — Dérivée à gauche en −2 : la limite de f′(x) quand x → −2⁻.  [juge limit]  départ : 2x − 3
    = 2·(−2) − 3   ← x = −2 dans la dérivée du morceau de gauche
    = −7   ← Calculer
  — Dérivée à droite en −2 : la limite de f′(x) quand x → −2⁺.  [juge limit]  départ : −2x − 5
    = −2·(−2) − 5   ← x = −2 dans la dérivée du morceau de droite
    = −1   ← Calculer
  — Le point A(−2 ; f(−2)) :  [juge value]  départ : |(−2)² + (−2) − 2| − 4·(−2) − 4
    ? En x = −2 : f′(−2⁻) = −7 et f′(−2⁺) = −1. Le point d'abscisse −2 est : ✔ un point anguleux : f n'est pas dérivable en ce point / · un point où f est dérivable / · un point de rebroussement
    ? Ce point est-il un extremum local de f ? · oui, un minimum local / · oui, un maximum local / ✔ non, ce n'est pas un extremum
    = 4   ← Calculer
  aides : Écris f sans valeur absolue de chaque côté de 1 (le signe de x² + x − 2 décide), dérive chaque morceau, puis compare f′(1⁻) et f′(1⁺). | f′(1⁻) = −2·1 − 5 = □ | f′(1⁻) = −7 et f′(1⁺) = −1 : pas un extremum.
  pièges : g1_triangle_reverse, g6_angular_not_seen

```

### Niveau 5

```
Soit f(x) = |x³ − a³| + 3x, avec a ∈ ℝ. Écris f par morceaux, calcule f′(a⁻) et f′(a⁺), puis trouve pour quels a le graphe a en x = a un point anguleux qui est un extremum (attention aux cas limites).
  [free, sans aide]  |x³ − a³| + 3x
    (Pour x > a :)
    = x³ − a³ + 3x   ← x³ − a³ > 0 quand x > a
  — Pour x < a :  [juge equiv]  départ : |x³ − a³| + 3x
    = a³ − x³ + 3x   ← x³ − a³ < 0 quand x < a
  — f′(a⁻) : dérive le morceau de gauche, puis fais tendre x vers a.  [juge equiv]  départ : (a³ − x³ + 3x)′
    = −3x² + 3   ← Dériver le morceau
    = −3a² + 3   ← x → a
  — f′(a⁺) : dérive le morceau de droite, puis fais tendre x vers a.  [juge equiv]  départ : (x³ − a³ + 3x)′
    = 3x² + 3   ← Dériver le morceau
    = 3a² + 3   ← x → a
  — Les dérivées latérales diffèrent dès que a ≠ 0. Sans les cas limites, le point anguleux est un extremum quand elles sont de signes opposés : f′(a⁻)·f′(a⁺) < 0.  [juge solset]  départ : (−3a² + 3)(3a² + 3) < 0
    = a² > 1   ← f′(a⁺) > 0 pour tout a
    = ]−∞ ; −1[ ∪ ]1 ; +∞[   ← S₁
  — Réponse : réunis S₁ = ]−∞ ; −1[ ∪ ]1 ; +∞[ et S₂, les cas limites qui donnent un extremum.  [juge solset]  départ : S_1 ∪ S_2
    ? Cas limite a = 1 : f′(1⁻) = 0. Le point anguleux est-il un extremum ? · oui / ✔ non
    ? Cas limite a = −1 : f′(−1⁻) = 0. Le point anguleux est-il un extremum ? ✔ oui / · non
    = ]−∞ ; −1] ∪ ]1 ; +∞[   ← Réunir
  pièges : g1_triangle_reverse, g6_angular_boundary

Soit f(x) = |x³ − a³| + 27x, avec a ∈ ℝ. Écris f par morceaux, calcule f′(a⁻) et f′(a⁺), puis trouve pour quels a le graphe a en x = a un point anguleux qui est un extremum (attention aux cas limites).
  [free, sans aide]  |x³ − a³| + 27x
    (Pour x > a :)
    = x³ − a³ + 27x   ← x³ − a³ > 0 quand x > a
  — Pour x < a :  [juge equiv]  départ : |x³ − a³| + 27x
    = a³ − x³ + 27x   ← x³ − a³ < 0 quand x < a
  — f′(a⁻) : dérive le morceau de gauche, puis fais tendre x vers a.  [juge equiv]  départ : (a³ − x³ + 27x)′
    = −3x² + 27   ← Dériver le morceau
    = −3a² + 27   ← x → a
  — f′(a⁺) : dérive le morceau de droite, puis fais tendre x vers a.  [juge equiv]  départ : (x³ − a³ + 27x)′
    = 3x² + 27   ← Dériver le morceau
    = 3a² + 27   ← x → a
  — Les dérivées latérales diffèrent dès que a ≠ 0. Sans les cas limites, le point anguleux est un extremum quand elles sont de signes opposés : f′(a⁻)·f′(a⁺) < 0.  [juge solset]  départ : (−3a² + 27)(3a² + 27) < 0
    = a² > 9   ← f′(a⁺) > 0 pour tout a
    = ]−∞ ; −3[ ∪ ]3 ; +∞[   ← S₁
  — Réponse : réunis S₁ = ]−∞ ; −3[ ∪ ]3 ; +∞[ et S₂, les cas limites qui donnent un extremum.  [juge solset]  départ : S_1 ∪ S_2
    ? Cas limite a = 3 : f′(3⁻) = 0. Le point anguleux est-il un extremum ? · oui / ✔ non
    ? Cas limite a = −3 : f′(−3⁻) = 0. Le point anguleux est-il un extremum ? ✔ oui / · non
    = ]−∞ ; −3] ∪ ]3 ; +∞[   ← Réunir
  pièges : g1_triangle_reverse, g6_angular_boundary

Soit f(x) = |x³ − a³| + 12x, avec a ∈ ℝ. Écris f par morceaux, calcule f′(a⁻) et f′(a⁺), puis trouve pour quels a le graphe a en x = a un point anguleux qui est un extremum (attention aux cas limites).
  [free, sans aide]  |x³ − a³| + 12x
    (Pour x > a :)
    = x³ − a³ + 12x   ← x³ − a³ > 0 quand x > a
  — Pour x < a :  [juge equiv]  départ : |x³ − a³| + 12x
    = a³ − x³ + 12x   ← x³ − a³ < 0 quand x < a
  — f′(a⁻) : dérive le morceau de gauche, puis fais tendre x vers a.  [juge equiv]  départ : (a³ − x³ + 12x)′
    = −3x² + 12   ← Dériver le morceau
    = −3a² + 12   ← x → a
  — f′(a⁺) : dérive le morceau de droite, puis fais tendre x vers a.  [juge equiv]  départ : (x³ − a³ + 12x)′
    = 3x² + 12   ← Dériver le morceau
    = 3a² + 12   ← x → a
  — Les dérivées latérales diffèrent dès que a ≠ 0. Sans les cas limites, le point anguleux est un extremum quand elles sont de signes opposés : f′(a⁻)·f′(a⁺) < 0.  [juge solset]  départ : (−3a² + 12)(3a² + 12) < 0
    = a² > 4   ← f′(a⁺) > 0 pour tout a
    = ]−∞ ; −2[ ∪ ]2 ; +∞[   ← S₁
  — Réponse : réunis S₁ = ]−∞ ; −2[ ∪ ]2 ; +∞[ et S₂, les cas limites qui donnent un extremum.  [juge solset]  départ : S_1 ∪ S_2
    ? Cas limite a = 2 : f′(2⁻) = 0. Le point anguleux est-il un extremum ? · oui / ✔ non
    ? Cas limite a = −2 : f′(−2⁻) = 0. Le point anguleux est-il un extremum ? ✔ oui / · non
    = ]−∞ ; −2] ∪ ]2 ; +∞[   ← Réunir
  pièges : g1_triangle_reverse, g6_angular_boundary

```

### Variantes d'examen

```
Soit f(x) = |x² − x| − 2x − 1. Que se passe-t-il en x = 0 ?
  ✔ f′(0⁻) = −3 et f′(0⁺) = −1 : point anguleux   · f′(0⁻) = −1 et f′(0⁺) = −3 : point anguleux   · f′(0⁻) = f′(0⁺) = −1 : f est dérivable en 0 [g6_abs_derivative]   · f′(0⁻) = f′(0⁺) = −3 : f est dérivable en 0 [g6_angular_not_seen]
  [examen mcq]
  pièges : g6_abs_derivative, g6_angular_not_seen

Vrai ou faux ?
  « Pour tout réel c, la fonction f(x) = 3·|x + 3| + cx a un extremum local en x = −3. » → FAUX
    contre-exemple (refute) : c = 4
  [examen tf]

Soit f(x) = |x³ − a³| − 12x, avec a ∈ ℝ. Écris f par morceaux, calcule f′(a⁻) et f′(a⁺), puis trouve pour quels a le graphe a en x = a un point anguleux qui est un extremum (attention aux cas limites).
  [free, sans aide, examen open]  |x³ − a³| − 12x
    (Pour x > a :)
    = x³ − a³ − 12x   ← x³ − a³ > 0 quand x > a
  — Pour x < a :  [juge equiv]  départ : |x³ − a³| − 12x
    = a³ − x³ − 12x   ← x³ − a³ < 0 quand x < a
  — f′(a⁻) : dérive le morceau de gauche, puis fais tendre x vers a.  [juge equiv]  départ : (a³ − x³ − 12x)′
    = −3x² − 12   ← Dériver le morceau
    = −3a² − 12   ← x → a
  — f′(a⁺) : dérive le morceau de droite, puis fais tendre x vers a.  [juge equiv]  départ : (x³ − a³ − 12x)′
    = 3x² − 12   ← Dériver le morceau
    = 3a² − 12   ← x → a
  — Les dérivées latérales diffèrent dès que a ≠ 0. Sans les cas limites, le point anguleux est un extremum quand elles sont de signes opposés : f′(a⁻)·f′(a⁺) < 0.  [juge solset]  départ : (−3a² − 12)(3a² − 12) < 0
    = a² > 4   ← f′(a⁻) < 0 pour tout a
    = ]−∞ ; −2[ ∪ ]2 ; +∞[   ← S₁
  — Réponse : réunis S₁ = ]−∞ ; −2[ ∪ ]2 ; +∞[ et S₂, les cas limites qui donnent un extremum.  [juge solset]  départ : S_1 ∪ S_2
    ? Cas limite a = 2 : f′(2⁺) = 0. Le point anguleux est-il un extremum ? ✔ oui / · non
    ? Cas limite a = −2 : f′(−2⁺) = 0. Le point anguleux est-il un extremum ? · oui / ✔ non
    = ]−∞ ; −2[ ∪ [2 ; +∞[   ← Réunir
  pièges : g1_triangle_reverse, g6_angular_boundary

```

## Asymptotes verticales, horizontales, obliques ; branches paraboliques (`g6-asymptotes`, CMS)

_m = lim f(x)/x, puis h = lim (f(x) − mx) ; ou la division euclidienne._

### Niveau 1

```
Soit f(x) = (x² + x − 3)/(x + 2). Trouve ses asymptotes obliques et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (x² + x − 3)/(x + 2) − x
    (m = lim f(x)/x = 1 en ±∞ (déjà calculé).)
    (Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = 1.)
    = (□)/(x + 2)   (trous : (−x − 3)/(x + 2))   ← Même dénominateur
    = −1   ← Termes de plus haut degré
  — Position : f(x) − (x − 1) =  [juge equiv]  départ : (x² + x − 3)/(x + 2) − (x − 1)
    = −1/(x + 2)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = 1 et h = −1 :  [juge equiv]  départ : mx + h
    ? Pour x < −2, −1/(x + 2) est positif. La courbe de f est : ✔ au-dessus de l'asymptote / · en dessous de l'asymptote
    = x − □   (trous : x − 1)   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 2) | y = x − 1
  pièges : g6_infinity_minus_infinity, g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (x² − x − 7)/(x + 3). Trouve ses asymptotes obliques et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (x² − x − 7)/(x + 3) − x
    (m = lim f(x)/x = 1 en ±∞ (déjà calculé).)
    (Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = 1.)
    = (□)/(x + 3)   (trous : (−4x − 7)/(x + 3))   ← Même dénominateur
    = −4   ← Termes de plus haut degré
  — Position : f(x) − (x − 4) =  [juge equiv]  départ : (x² − x − 7)/(x + 3) − (x − 4)
    = 5/(x + 3)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = 1 et h = −4 :  [juge equiv]  départ : mx + h
    ? Pour x < −3, 5/(x + 3) est négatif. La courbe de f est : · au-dessus de l'asymptote / ✔ en dessous de l'asymptote
    = x − □   (trous : x − 4)   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 3) | y = x − 4
  pièges : g6_infinity_minus_infinity, g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (2x² + 4x − 3)/(x + 3). Trouve ses asymptotes obliques et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (2x² + 4x − 3)/(x + 3) − 2x
    (m = lim f(x)/x = 2 en ±∞ (déjà calculé).)
    (Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = 2.)
    = (□)/(x + 3)   (trous : (−2x − 3)/(x + 3))   ← Même dénominateur
    = −2   ← Termes de plus haut degré
  — Position : f(x) − (2x − 2) =  [juge equiv]  départ : (2x² + 4x − 3)/(x + 3) − (2x − 2)
    = 3/(x + 3)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = 2 et h = −2 :  [juge equiv]  départ : mx + h
    ? Pour x > −3, 3/(x + 3) est positif. La courbe de f est : ✔ au-dessus de l'asymptote / · en dessous de l'asymptote
    = 2x − □   (trous : 2x − 2)   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 3) | y = 2x − 2
  pièges : g6_infinity_minus_infinity, g6_sketch_crosses_asymptote, g6_oblique_h_forgot

```

### Niveau 2

```
Soit f(x) = (x² − 2x − 4)/(x − 1). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (x² − 2x − 4)/(x − 1)
    (Domaine de f :)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← 1 annule le dénominateur
  — En x = 1 (valeur interdite) : la limite de f quand x → 1⁺.  [juge limit]  départ : (x² − 2x − 4)/(x − 1)
    = −5/(x − 1)   ← Le numérateur tend vers −5 ≠ 0
    = −∞   ← Asymptote verticale x = 1
  — Division euclidienne :  [juge equiv]  départ : (x² − 2x − 4)/(x − 1)
    ? Comment trouver l'asymptote oblique ? ✔ Division euclidienne : f(x) = mx + h + reste/(x − a) / ✔ m = lim f(x)/x, puis h = lim (f(x) − mx)
    = □ − 5/(x − 1)   (trous : x − 1 − 5/(x − 1))   ← Quotient et reste
  — Asymptote oblique en ±∞ (le quotient de la division) :  [juge equiv]  départ : mx + h
    ? Pour x < 1, −5/(x − 1) est positif. La courbe de f est : ✔ au-dessus de l'asymptote / · en dessous de l'asymptote
    = x − 1   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x − 1) | y = x − 1
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (x² + 6x + 3)/(x + 2). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (x² + 6x + 3)/(x + 2)
    (Domaine de f :)
    = ]−∞ ; −2[ ∪ ]−2 ; +∞[   ← −2 annule le dénominateur
  — En x = −2 (valeur interdite) : la limite de f quand x → −2⁺.  [juge limit]  départ : (x² + 6x + 3)/(x + 2)
    = −5/(x + 2)   ← Le numérateur tend vers −5 ≠ 0
    = −∞   ← Asymptote verticale x = −2
  — Division euclidienne :  [juge equiv]  départ : (x² + 6x + 3)/(x + 2)
    ? Comment trouver l'asymptote oblique ? ✔ Division euclidienne : f(x) = mx + h + reste/(x − a) / ✔ m = lim f(x)/x, puis h = lim (f(x) − mx)
    = □ − 5/(x + 2)   (trous : x + 4 − 5/(x + 2))   ← Quotient et reste
  — Asymptote oblique en ±∞ (le quotient de la division) :  [juge equiv]  départ : mx + h
    ? Pour x > −2, −5/(x + 2) est négatif. La courbe de f est : · au-dessus de l'asymptote / ✔ en dessous de l'asymptote
    = x + 4   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 2) | y = x + 4
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (x² − 5x + 2)/(x − 1). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [guided]  (x² − 5x + 2)/(x − 1)
    (Domaine de f :)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← 1 annule le dénominateur
  — En x = 1 (valeur interdite) : la limite de f quand x → 1⁺.  [juge limit]  départ : (x² − 5x + 2)/(x − 1)
    = −2/(x − 1)   ← Le numérateur tend vers −2 ≠ 0
    = −∞   ← Asymptote verticale x = 1
  — Division euclidienne :  [juge equiv]  départ : (x² − 5x + 2)/(x − 1)
    ? Comment trouver l'asymptote oblique ? ✔ Division euclidienne : f(x) = mx + h + reste/(x − a) / ✔ m = lim f(x)/x, puis h = lim (f(x) − mx)
    = □ − 2/(x − 1)   (trous : x − 4 − 2/(x − 1))   ← Quotient et reste
  — Asymptote oblique en ±∞ (le quotient de la division) :  [juge equiv]  départ : mx + h
    ? Pour x > 1, −2/(x − 1) est négatif. La courbe de f est : · au-dessus de l'asymptote / ✔ en dessous de l'asymptote
    = x − 4   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x − 1) | y = x − 4
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

```

### Niveau 3

```
Soit f(x) = (x² + x − 1)/(x + 2). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [tap, suivre l'erreur, menu steps]  (x² + x − 1)/(x + 2)
    (Domaine de f :)
    = ]−∞ ; −2[ ∪ ]−2 ; +∞[   ← −2 annule le dénominateur
  — En x = −2 (valeur interdite) : la limite de f quand x → −2⁺.  [juge limit]  départ : (x² + x − 1)/(x + 2)
    = 1/(x + 2)   ← Le numérateur tend vers 1 ≠ 0
    = ∞   ← Asymptote verticale x = −2
  — Pente : m = lim f(x)/x quand x → ±∞.  [juge limit]  départ : ((x² + x − 1)/(x + 2))/x
    = (x² + x − 1)/(x² + 2x)   ← f(x)/x
    = 1   ← Termes de plus haut degré
  — Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = 1.  [juge limit]  départ : (x² + x − 1)/(x + 2) − x
    = (−x − 1)/(x + 2)   ← Même dénominateur
    = −1   ← Termes de plus haut degré
  — Position : f(x) − (x − 1) =  [juge equiv]  départ : (x² + x − 1)/(x + 2) − (x − 1)
    = 1/(x + 2)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = 1 et h = −1 :  [juge equiv]  départ : mx + h
    ? Pour x < −2, 1/(x + 2) est négatif. La courbe de f est : · au-dessus de l'asymptote / ✔ en dessous de l'asymptote
    = x − 1   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 2) | y = x − 1
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (2x² + x − 4)/(x + 1). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [tap, suivre l'erreur, menu steps]  (2x² + x − 4)/(x + 1)
    (Domaine de f :)
    = ]−∞ ; −1[ ∪ ]−1 ; +∞[   ← −1 annule le dénominateur
  — En x = −1 (valeur interdite) : la limite de f quand x → −1⁺.  [juge limit]  départ : (2x² + x − 4)/(x + 1)
    = −3/(x + 1)   ← Le numérateur tend vers −3 ≠ 0
    = −∞   ← Asymptote verticale x = −1
  — Pente : m = lim f(x)/x quand x → ±∞.  [juge limit]  départ : ((2x² + x − 4)/(x + 1))/x
    = (2x² + x − 4)/(x² + x)   ← f(x)/x
    = 2   ← Termes de plus haut degré
  — Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = 2.  [juge limit]  départ : (2x² + x − 4)/(x + 1) − 2x
    = (−x − 4)/(x + 1)   ← Même dénominateur
    = −1   ← Termes de plus haut degré
  — Position : f(x) − (2x − 1) =  [juge equiv]  départ : (2x² + x − 4)/(x + 1) − (2x − 1)
    = −3/(x + 1)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = 2 et h = −1 :  [juge equiv]  départ : mx + h
    ? Pour x > −1, −3/(x + 1) est négatif. La courbe de f est : · au-dessus de l'asymptote / ✔ en dessous de l'asymptote
    = 2x − 1   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x + 1) | y = 2x − 1
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

Soit f(x) = (−2x² + 7x − 7)/(x − 2). Trouve ses asymptotes et la position de la courbe par rapport à l'asymptote oblique.
  [tap, suivre l'erreur, menu steps]  (−2x² + 7x − 7)/(x − 2)
    (Domaine de f :)
    = ]−∞ ; 2[ ∪ ]2 ; +∞[   ← 2 annule le dénominateur
  — En x = 2 (valeur interdite) : la limite de f quand x → 2⁺.  [juge limit]  départ : (−2x² + 7x − 7)/(x − 2)
    = −1/(x − 2)   ← Le numérateur tend vers −1 ≠ 0
    = −∞   ← Asymptote verticale x = 2
  — Pente : m = lim f(x)/x quand x → ±∞.  [juge limit]  départ : ((−2x² + 7x − 7)/(x − 2))/x
    = (−2x² + 7x − 7)/(x² − 2x)   ← f(x)/x
    = −2   ← Termes de plus haut degré
  — Ordonnée à l'origine : h = lim (f(x) − mx) quand x → ±∞, avec m = −2.  [juge limit]  départ : (−2x² + 7x − 7)/(x − 2) + 2x
    = (3x − 7)/(x − 2)   ← Même dénominateur
    = 3   ← Termes de plus haut degré
  — Position : f(x) − (−2x + 3) =  [juge equiv]  départ : (−2x² + 7x − 7)/(x − 2) − (−2x + 3)
    = −1/(x − 2)   ← Même dénominateur
  — Asymptote oblique en +∞ et en −∞, avec m = −2 et h = 3 :  [juge equiv]  départ : mx + h
    ? Pour x < 2, −1/(x − 2) est positif. La courbe de f est : ✔ au-dessus de l'asymptote / · en dessous de l'asymptote
    = −2x + 3   ← y = mx + h
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Ou bien la division euclidienne. | h = lim (□)/(x − 2) | y = −2x + 3
  pièges : g6_sketch_crosses_asymptote, g6_oblique_h_forgot

```

### Niveau 4

```
Soit f(x) = 3x − √x, x > 0. Étudie la branche infinie de f en +∞.
  [free, suivre l'erreur]  (3x − √x)/x
    (En +∞ : m = lim f(x)/x.)
    = 3 − 1/√x   ← Diviser chaque terme par x
    = 3   ← 1/√x → 0
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : 3x − √x − 3x
    = −√x   ← Réduire
    = −∞   ← h est infini
  — Direction de la branche parabolique :  [juge equiv]  départ : mx
    ? m est fini, mais f(x) − mx tend vers l'infini. En +∞, la courbe a : ✔ une branche parabolique de direction y = mx / · l'asymptote oblique y = mx / · une branche parabolique de direction Oy / · une asymptote horizontale
    = 3x   ← y = mx
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Si h est infini, ce n'est pas une asymptote. | m = 3, puis f(x) − 3x = □ | Branche parabolique de direction y = 3x.
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

Soit f(x) = 2x + 2ln(x), x > 0. Étudie la branche infinie de f en +∞.
  [free, suivre l'erreur]  (2x + 2ln(x))/x
    (En +∞ : m = lim f(x)/x.)
    = 2 + 2ln(x)/x   ← Diviser chaque terme par x
    = 2   ← ln(x)/x → 0
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : 2x + 2ln(x) − 2x
    = 2ln(x)   ← Réduire
    = ∞   ← h est infini
  — Direction de la branche parabolique :  [juge equiv]  départ : mx
    ? m est fini, mais f(x) − mx tend vers l'infini. En +∞, la courbe a : ✔ une branche parabolique de direction y = mx / · l'asymptote oblique y = mx / · une branche parabolique de direction Oy / · une asymptote horizontale
    = 2x   ← y = mx
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Si h est infini, ce n'est pas une asymptote. | m = 2, puis f(x) − 2x = □ | Branche parabolique de direction y = 2x.
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

Soit f(x) = −x − 2√x, x > 0. Étudie la branche infinie de f en +∞.
  [free, suivre l'erreur]  (−x − 2√x)/x
    (En +∞ : m = lim f(x)/x.)
    = −1 − 2/√x   ← Diviser chaque terme par x
    = −1   ← 1/√x → 0
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : −x − 2√x + x
    = −2√x   ← Réduire
    = −∞   ← h est infini
  — Direction de la branche parabolique :  [juge equiv]  départ : mx
    ? m est fini, mais f(x) − mx tend vers l'infini. En +∞, la courbe a : ✔ une branche parabolique de direction y = mx / · l'asymptote oblique y = mx / · une branche parabolique de direction Oy / · une asymptote horizontale
    = −x   ← y = mx
  aides : m = lim f(x)/x, puis h = lim (f(x) − mx). Si h est infini, ce n'est pas une asymptote. | m = −1, puis f(x) − −x = □ | Branche parabolique de direction y = −x.
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

```

### Niveau 5

```
Soit f(x) = √(x² − 2x − 3). Trouve ses asymptotes en +∞ et en −∞.
  [free, sans aide]  (√(x² − 2x − 3))/x
    (En +∞ : m = lim f(x)/x.)
    = √(1 − 2/x − 3/x²)   ← x > 0 : √(x²) = x
    = 1   ← Calculer
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² − 2x − 3) − x
    = (−2x − 3)/(√(x² − 2x − 3) + x)   ← Multiplier par la quantité conjuguée
    = −1   ← Diviser par x
  — Asymptote oblique en +∞ :  [juge equiv]  départ : mx + h
    = x − 1   ← y = mx + h
  — En −∞ : m = lim f(x)/x.  [juge limit]  départ : (√(x² − 2x − 3))/x
    = −√(1 − 2/x − 3/x²)   ← x < 0 : √(x²) = |x| = −x
    = −1   ← Calculer
  — En −∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² − 2x − 3) + x
    = (−2x − 3)/(√(x² − 2x − 3) − x)   ← Multiplier par la quantité conjuguée
    = 1   ← Diviser par x
  — Asymptote oblique en −∞ :  [juge equiv]  départ : mx + h
    = −x + 1   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

Soit f(x) = √(x² + 6x − 4). Trouve ses asymptotes en +∞ et en −∞.
  [free, sans aide]  (√(x² + 6x − 4))/x
    (En +∞ : m = lim f(x)/x.)
    = √(1 + 6/x − 4/x²)   ← x > 0 : √(x²) = x
    = 1   ← Calculer
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 6x − 4) − x
    = (6x − 4)/(√(x² + 6x − 4) + x)   ← Multiplier par la quantité conjuguée
    = 3   ← Diviser par x
  — Asymptote oblique en +∞ :  [juge equiv]  départ : mx + h
    = x + 3   ← y = mx + h
  — En −∞ : m = lim f(x)/x.  [juge limit]  départ : (√(x² + 6x − 4))/x
    = −√(1 + 6/x − 4/x²)   ← x < 0 : √(x²) = |x| = −x
    = −1   ← Calculer
  — En −∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 6x − 4) + x
    = (6x − 4)/(√(x² + 6x − 4) − x)   ← Multiplier par la quantité conjuguée
    = −3   ← Diviser par x
  — Asymptote oblique en −∞ :  [juge equiv]  départ : mx + h
    = −x − 3   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

Soit f(x) = √(x² + 2x + 8). Trouve ses asymptotes en +∞ et en −∞.
  [free, sans aide]  (√(x² + 2x + 8))/x
    (En +∞ : m = lim f(x)/x.)
    = √(1 + 2/x + 8/x²)   ← x > 0 : √(x²) = x
    = 1   ← Calculer
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 2x + 8) − x
    = (2x + 8)/(√(x² + 2x + 8) + x)   ← Multiplier par la quantité conjuguée
    = 1   ← Diviser par x
  — Asymptote oblique en +∞ :  [juge equiv]  départ : mx + h
    = x + 1   ← y = mx + h
  — En −∞ : m = lim f(x)/x.  [juge limit]  départ : (√(x² + 2x + 8))/x
    = −√(1 + 2/x + 8/x²)   ← x < 0 : √(x²) = |x| = −x
    = −1   ← Calculer
  — En −∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 2x + 8) + x
    = (2x + 8)/(√(x² + 2x + 8) − x)   ← Multiplier par la quantité conjuguée
    = −1   ← Diviser par x
  — Asymptote oblique en −∞ :  [juge equiv]  départ : mx + h
    = −x − 1   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

```

### Variantes d'examen

```
Quelle est l'asymptote oblique de f(x) = (3x² − 5x − 15)/(x − 3) en ±∞ ?
  · y = 3x [g6_oblique_h_forgot]   ✔ y = 3x + 4   · y = 3x + 3 [g6_oblique_h_forgot]   · y = 3x − 4
  [examen mcq]
  pièges : g6_oblique_h_forgot

Vrai ou faux ?
  « La droite y = x + 4 est asymptote à la courbe de f(x) = (x² + 6x + 6)/(x + 2) en +∞ et en −∞. » → VRAI
  [examen tf]

Soit f(x) = √(x² + 6x + 4). Trouve ses asymptotes en +∞ et en −∞.
  [free, sans aide, examen open]  (√(x² + 6x + 4))/x
    (En +∞ : m = lim f(x)/x.)
    = √(1 + 6/x + 4/x²)   ← x > 0 : √(x²) = x
    = 1   ← Calculer
  — En +∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 6x + 4) − x
    = (6x + 4)/(√(x² + 6x + 4) + x)   ← Multiplier par la quantité conjuguée
    = 3   ← Diviser par x
  — Asymptote oblique en +∞ :  [juge equiv]  départ : mx + h
    = x + 3   ← y = mx + h
  — En −∞ : m = lim f(x)/x.  [juge limit]  départ : (√(x² + 6x + 4))/x
    = −√(1 + 6/x + 4/x²)   ← x < 0 : √(x²) = |x| = −x
    = −1   ← Calculer
  — En −∞ : h = lim (f(x) − mx).  [juge limit]  départ : √(x² + 6x + 4) + x
    = (6x + 4)/(√(x² + 6x + 4) − x)   ← Multiplier par la quantité conjuguée
    = −3   ← Diviser par x
  — Asymptote oblique en −∞ :  [juge equiv]  départ : mx + h
    = −x − 3   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_oblique_h_forgot

```

## Étude de fonction complète et esquisse (`g6-study-full`, CMS)

_Domaine, symétries, asymptotes, variation, concavité, tableau, esquisse._

### Niveau 1

```
Étudie la fonction f(x) = (2x² + 2x + 8)/x : valeurs du tableau.
  [guided]  mx + h
    (Les calculs sont faits : f(x) = 2x + 2 + 8/x ; f′(x) = 2 − 8/x², nulle en x = −2 et x = 2 ; f″(x) = 16/x³. Remplis le tableau.)
    (Asymptote oblique (en ±∞) :)
    ? Pour x > 0, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = 2x + □   (trous : 2x + 2)   ← Le quotient de la division
  — Valeur au point x = −2 :  [juge value]  départ : 2·(−2) + 2 + 8/(−2)
    ? Concavité : f est ✔ concave sur ]−∞ ; 0[ et convexe sur ]0 ; +∞[ / · convexe sur ]−∞ ; 0[ et concave sur ]0 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 0, mais 0 n'est pas dans le domaine / · oui, en x = 0
    ? En x = −2, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −6   ← Calculer
  — Valeur au point x = 2 :  [juge value]  départ : 2·2 + 2 + 8/2
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 10   ← Calculer
  aides : Fais la division : f(x) = 2x + 2 + 8/x. Tout se lit mieux : asymptote y = 2x + 2, et f′ se calcule terme par terme. | f′(x) = 2 − 8/□ | f′(x) = 2 − 8/x², nulle en x = −2 (max) et x = 2 (min).
  pièges : g6_oblique_h_forgot, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (2x² − 9x + 17)/(x − 3) : valeurs du tableau.
  [guided]  mx + h
    (Les calculs sont faits : f(x) = 2x − 3 + 8/(x − 3) ; f′(x) = 2 − 8/(x − 3)², nulle en x = 1 et x = 5 ; f″(x) = 16/(x − 3)³. Remplis le tableau.)
    (Asymptote oblique (en ±∞) :)
    ? Pour x > 3, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = 2x − □   (trous : 2x − 3)   ← Le quotient de la division
  — Valeur au point x = 1 :  [juge value]  départ : 2·1 − 3 + 8/(1 − 3)
    ? Concavité : f est ✔ concave sur ]−∞ ; 3[ et convexe sur ]3 ; +∞[ / · convexe sur ]−∞ ; 3[ et concave sur ]3 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 3, mais 3 n'est pas dans le domaine / · oui, en x = 3
    ? En x = 1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −5   ← Calculer
  — Valeur au point x = 5 :  [juge value]  départ : 2·5 − 3 + 8/(5 − 3)
    ? En x = 5, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 11   ← Calculer
  aides : Fais la division : f(x) = 2x − 3 + 8/(x − 3). Tout se lit mieux : asymptote y = 2x − 3, et f′ se calcule terme par terme. | f′(x) = 2 − 8/□ | f′(x) = 2 − 8/(x − 3)², nulle en x = 1 (max) et x = 5 (min).
  pièges : g6_oblique_h_forgot, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (2x² + 2)/x : valeurs du tableau.
  [guided]  mx + h
    (Les calculs sont faits : f(x) = 2x + 2/x ; f′(x) = 2 − 2/x², nulle en x = −1 et x = 1 ; f″(x) = 4/x³. Remplis le tableau.)
    (Asymptote oblique (en ±∞) :)
    ? Pour x > 0, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = □x   (trous : 2x)   ← Le quotient de la division
  — Valeur au point x = −1 :  [juge value]  départ : 2·(−1) + 2/(−1)
    ? Concavité : f est ✔ concave sur ]−∞ ; 0[ et convexe sur ]0 ; +∞[ / · convexe sur ]−∞ ; 0[ et concave sur ]0 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 0, mais 0 n'est pas dans le domaine / · oui, en x = 0
    ? En x = −1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −4   ← Calculer
  — Valeur au point x = 1 :  [juge value]  départ : 2·1 + 2/1
    ? En x = 1, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 4   ← Calculer
  aides : Fais la division : f(x) = 2x + 2/x. Tout se lit mieux : asymptote y = 2x, et f′ se calcule terme par terme. | f′(x) = 2 − 2/□ | f′(x) = 2 − 2/x², nulle en x = −1 (max) et x = 1 (min).
  pièges : g6_oblique_h_forgot, g6_sketch_crosses_asymptote

```

### Niveau 2

```
Étudie la fonction f(x) = (2x² − 2x − 2)/(x − 2) : valeurs du tableau.
  [guided]  (2x + 2 + 2/(x − 2))′
    (La division donne f(x) = 2x + 2 + 2/(x − 2), et f″(x) = 4/(x − 2)³.)
    (Dérivée :)
    = 2 − 2/□   (trous : 2 − 2/(x − 2)²)   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 2 − 2/(x − 2)² = 0
    = (x − 2)² = □   (trous : (x − 2)² = 1)   ← Isoler le carré
    = x = 1 ou x = 3   ← Racine carrée
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > 2, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = 2x + 2   ← Le quotient de la division
  — Valeur au point x = 1 :  [juge value]  départ : 2·1 + 2 + 2/(1 − 2)
    ? Concavité : f est ✔ concave sur ]−∞ ; 2[ et convexe sur ]2 ; +∞[ / · convexe sur ]−∞ ; 2[ et concave sur ]2 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 2, mais 2 n'est pas dans le domaine / · oui, en x = 2
    ? En x = 1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = 2   ← Calculer
  — Valeur au point x = 3 :  [juge value]  départ : 2·3 + 2 + 2/(3 − 2)
    ? En x = 3, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 10   ← Calculer
  aides : Fais la division : f(x) = 2x + 2 + 2/(x − 2). Tout se lit mieux : asymptote y = 2x + 2, et f′ se calcule terme par terme. | f′(x) = 2 − 2/□ | f′(x) = 2 − 2/(x − 2)², nulle en x = 1 (max) et x = 3 (min).
  pièges : g6_quotient_sign, g6_quotient_no_square, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (x² + 4x + 12)/(x + 1) : valeurs du tableau.
  [guided]  (x + 3 + 9/(x + 1))′
    (La division donne f(x) = x + 3 + 9/(x + 1), et f″(x) = 18/(x + 1)³.)
    (Dérivée :)
    = 1 − 9/□   (trous : 1 − 9/(x + 1)²)   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 9/(x + 1)² = 0
    = (x + 1)² = □   (trous : (x + 1)² = 9)   ← Isoler le carré
    = x = −4 ou x = 2   ← Racine carrée
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > −1, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = x + 3   ← Le quotient de la division
  — Valeur au point x = −4 :  [juge value]  départ : −4 + 3 + 9/(−4 + 1)
    ? Concavité : f est ✔ concave sur ]−∞ ; −1[ et convexe sur ]−1 ; +∞[ / · convexe sur ]−∞ ; −1[ et concave sur ]−1 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en −1, mais −1 n'est pas dans le domaine / · oui, en x = −1
    ? En x = −4, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −4   ← Calculer
  — Valeur au point x = 2 :  [juge value]  départ : 2 + 3 + 9/(2 + 1)
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 8   ← Calculer
  aides : Fais la division : f(x) = x + 3 + 9/(x + 1). Tout se lit mieux : asymptote y = x + 3, et f′ se calcule terme par terme. | f′(x) = 1 − 9/□ | f′(x) = 1 − 9/(x + 1)², nulle en x = −4 (max) et x = 2 (min).
  pièges : g6_quotient_sign, g6_quotient_no_square, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (x² + 2x + 1)/(x + 3) : valeurs du tableau.
  [guided]  (x − 1 + 4/(x + 3))′
    (La division donne f(x) = x − 1 + 4/(x + 3), et f″(x) = 8/(x + 3)³.)
    (Dérivée :)
    = 1 − 4/□   (trous : 1 − 4/(x + 3)²)   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 4/(x + 3)² = 0
    = (x + 3)² = □   (trous : (x + 3)² = 4)   ← Isoler le carré
    = x = −5 ou x = −1   ← Racine carrée
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > −3, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = x − 1   ← Le quotient de la division
  — Valeur au point x = −5 :  [juge value]  départ : −5 − 1 + 4/(−5 + 3)
    ? Concavité : f est ✔ concave sur ]−∞ ; −3[ et convexe sur ]−3 ; +∞[ / · convexe sur ]−∞ ; −3[ et concave sur ]−3 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en −3, mais −3 n'est pas dans le domaine / · oui, en x = −3
    ? En x = −5, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −8   ← Calculer
  — Valeur au point x = −1 :  [juge value]  départ : −1 − 1 + 4/(−1 + 3)
    ? En x = −1, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 0   ← Calculer
  aides : Fais la division : f(x) = x − 1 + 4/(x + 3). Tout se lit mieux : asymptote y = x − 1, et f′ se calcule terme par terme. | f′(x) = 1 − 4/□ | f′(x) = 1 − 4/(x + 3)², nulle en x = −5 (max) et x = −1 (min).
  pièges : g6_quotient_sign, g6_quotient_no_square, g6_sketch_crosses_asymptote

```

### Niveau 3

```
Étudie la fonction f(x) = (2x² − 3x − 1)/(x − 3) : valeurs du tableau et position de la courbe.
  [tap, suivre l'erreur, menu steps]  (2x² − 3x − 1)/(x − 3)
    (Division euclidienne :)
    = 2x + 3 + 8/(x − 3)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x < 3, la courbe de f est : · au-dessus de l'asymptote oblique / ✔ en dessous de l'asymptote oblique
    = 2x + 3   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (2x + 3 + 8/(x − 3))′
    = 2 − 8/(x − 3)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 2 − 8/(x − 3)² = 0
    = (x − 3)² = 4   ← Isoler le carré
    = x = 1 ou x = 5   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (2 − 8/(x − 3)²)′
    = 16/(x − 3)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = 1 :  [juge value]  départ : 2·1 + 3 + 8/(1 − 3)
    ? Concavité : f est ✔ concave sur ]−∞ ; 3[ et convexe sur ]3 ; +∞[ / · convexe sur ]−∞ ; 3[ et concave sur ]3 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 3, mais 3 n'est pas dans le domaine / · oui, en x = 3
    ? En x = 1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = 1   ← Calculer
  — Valeur au point x = 5 :  [juge value]  départ : 2·5 + 3 + 8/(5 − 3)
    ? En x = 5, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 17   ← Calculer
  aides : Fais la division : f(x) = 2x + 3 + 8/(x − 3). Tout se lit mieux : asymptote y = 2x + 3, et f′ se calcule terme par terme. | f′(x) = 2 − 8/□ | f′(x) = 2 − 8/(x − 3)², nulle en x = 1 (max) et x = 5 (min).
  pièges : g0_pfd_no_div, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (x² − 3x + 11)/(x − 1) : valeurs du tableau et position de la courbe.
  [tap, suivre l'erreur, menu steps]  (x² − 3x + 11)/(x − 1)
    (Division euclidienne :)
    = x − 2 + 9/(x − 1)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x < 1, la courbe de f est : · au-dessus de l'asymptote oblique / ✔ en dessous de l'asymptote oblique
    = x − 2   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (x − 2 + 9/(x − 1))′
    = 1 − 9/(x − 1)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 9/(x − 1)² = 0
    = (x − 1)² = 9   ← Isoler le carré
    = x = −2 ou x = 4   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (1 − 9/(x − 1)²)′
    = 18/(x − 1)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = −2 :  [juge value]  départ : −2 − 2 + 9/(−2 − 1)
    ? Concavité : f est ✔ concave sur ]−∞ ; 1[ et convexe sur ]1 ; +∞[ / · convexe sur ]−∞ ; 1[ et concave sur ]1 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 1, mais 1 n'est pas dans le domaine / · oui, en x = 1
    ? En x = −2, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −7   ← Calculer
  — Valeur au point x = 4 :  [juge value]  départ : 4 − 2 + 9/(4 − 1)
    ? En x = 4, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 5   ← Calculer
  aides : Fais la division : f(x) = x − 2 + 9/(x − 1). Tout se lit mieux : asymptote y = x − 2, et f′ se calcule terme par terme. | f′(x) = 1 − 9/□ | f′(x) = 1 − 9/(x − 1)², nulle en x = −2 (max) et x = 4 (min).
  pièges : g0_pfd_no_div, g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (x² − 4x + 5)/(x − 2) : valeurs du tableau et position de la courbe.
  [tap, suivre l'erreur, menu steps]  (x² − 4x + 5)/(x − 2)
    (Division euclidienne :)
    = x − 2 + 1/(x − 2)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x < 2, la courbe de f est : · au-dessus de l'asymptote oblique / ✔ en dessous de l'asymptote oblique
    = x − 2   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (x − 2 + 1/(x − 2))′
    = 1 − 1/(x − 2)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 1/(x − 2)² = 0
    = (x − 2)² = 1   ← Isoler le carré
    = x = 1 ou x = 3   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (1 − 1/(x − 2)²)′
    = 2/(x − 2)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = 1 :  [juge value]  départ : 1 − 2 + 1/(1 − 2)
    ? Concavité : f est ✔ concave sur ]−∞ ; 2[ et convexe sur ]2 ; +∞[ / · convexe sur ]−∞ ; 2[ et concave sur ]2 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 2, mais 2 n'est pas dans le domaine / · oui, en x = 2
    ? En x = 1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −2   ← Calculer
  — Valeur au point x = 3 :  [juge value]  départ : 3 − 2 + 1/(3 − 2)
    ? En x = 3, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 2   ← Calculer
  aides : Fais la division : f(x) = x − 2 + 1/(x − 2). Tout se lit mieux : asymptote y = x − 2, et f′ se calcule terme par terme. | f′(x) = 1 − 1/□ | f′(x) = 1 − 1/(x − 2)², nulle en x = 1 (max) et x = 3 (min).
  pièges : g0_pfd_no_div, g6_sketch_crosses_asymptote

```

### Niveau 4

```
Étudie la fonction f(x) = (x²)/(x + 3) : domaine, symétries, asymptotes, variation, concavité, valeurs du tableau et position de la courbe.
  [free, suivre l'erreur]  (x²)/(x + 3)
    (Domaine de f :)
    = ]−∞ ; −3[ ∪ ]−3 ; +∞[   ← −3 annule le dénominateur
  — Limite en −3⁺ :  [juge limit]  départ : (x²)/(x + 3)
    ? Symétries : f est ✔ ni paire ni impaire / · impaire (symétrique par rapport à l'origine) / · paire (symétrique par rapport à l'axe Oy)
    = 9/(x + 3)   ← Le numérateur tend vers 9
    = ∞   ← Asymptote verticale x = −3
  — Division euclidienne :  [juge equiv]  départ : (x²)/(x + 3)
    = x − 3 + 9/(x + 3)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > −3, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = x − 3   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (x − 3 + 9/(x + 3))′
    = 1 − 9/(x + 3)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 9/(x + 3)² = 0
    = (x + 3)² = 9   ← Isoler le carré
    = x = −6 ou x = 0   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (1 − 9/(x + 3)²)′
    = 18/(x + 3)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = −6 :  [juge value]  départ : −6 − 3 + 9/(−6 + 3)
    ? Concavité : f est ✔ concave sur ]−∞ ; −3[ et convexe sur ]−3 ; +∞[ / · convexe sur ]−∞ ; −3[ et concave sur ]−3 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en −3, mais −3 n'est pas dans le domaine / · oui, en x = −3
    ? En x = −6, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −12   ← Calculer
  — Valeur au point x = 0 :  [juge value]  départ : 0 − 3 + 9/(0 + 3)
    ? En x = 0, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 0   ← Calculer
  aides : Fais la division : f(x) = x − 3 + 9/(x + 3). Tout se lit mieux : asymptote y = x − 3, et f′ se calcule terme par terme. | f′(x) = 1 − 9/□ | f′(x) = 1 − 9/(x + 3)², nulle en x = −6 (max) et x = 0 (min).
  pièges : g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (2x² + 7x + 8)/(x + 2) : domaine, symétries, asymptotes, variation, concavité, valeurs du tableau et position de la courbe.
  [free, suivre l'erreur]  (2x² + 7x + 8)/(x + 2)
    (Domaine de f :)
    = ]−∞ ; −2[ ∪ ]−2 ; +∞[   ← −2 annule le dénominateur
  — Limite en −2⁺ :  [juge limit]  départ : (2x² + 7x + 8)/(x + 2)
    ? Symétries : f est ✔ ni paire ni impaire / · impaire (symétrique par rapport à l'origine) / · paire (symétrique par rapport à l'axe Oy)
    = 2/(x + 2)   ← Le numérateur tend vers 2
    = ∞   ← Asymptote verticale x = −2
  — Division euclidienne :  [juge equiv]  départ : (2x² + 7x + 8)/(x + 2)
    = 2x + 3 + 2/(x + 2)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > −2, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = 2x + 3   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (2x + 3 + 2/(x + 2))′
    = 2 − 2/(x + 2)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 2 − 2/(x + 2)² = 0
    = (x + 2)² = 1   ← Isoler le carré
    = x = −3 ou x = −1   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (2 − 2/(x + 2)²)′
    = 4/(x + 2)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = −3 :  [juge value]  départ : 2·(−3) + 3 + 2/(−3 + 2)
    ? Concavité : f est ✔ concave sur ]−∞ ; −2[ et convexe sur ]−2 ; +∞[ / · convexe sur ]−∞ ; −2[ et concave sur ]−2 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en −2, mais −2 n'est pas dans le domaine / · oui, en x = −2
    ? En x = −3, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −5   ← Calculer
  — Valeur au point x = −1 :  [juge value]  départ : 2·(−1) + 3 + 2/(−1 + 2)
    ? En x = −1, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 3   ← Calculer
  aides : Fais la division : f(x) = 2x + 3 + 2/(x + 2). Tout se lit mieux : asymptote y = 2x + 3, et f′ se calcule terme par terme. | f′(x) = 2 − 2/□ | f′(x) = 2 − 2/(x + 2)², nulle en x = −3 (max) et x = −1 (min).
  pièges : g6_sketch_crosses_asymptote

Étudie la fonction f(x) = (x² − x + 4)/(x − 1) : domaine, symétries, asymptotes, variation, concavité, valeurs du tableau et position de la courbe.
  [free, suivre l'erreur]  (x² − x + 4)/(x − 1)
    (Domaine de f :)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← 1 annule le dénominateur
  — Limite en 1⁺ :  [juge limit]  départ : (x² − x + 4)/(x − 1)
    ? Symétries : f est ✔ ni paire ni impaire / · impaire (symétrique par rapport à l'origine) / · paire (symétrique par rapport à l'axe Oy)
    = 4/(x − 1)   ← Le numérateur tend vers 4
    = ∞   ← Asymptote verticale x = 1
  — Division euclidienne :  [juge equiv]  départ : (x² − x + 4)/(x − 1)
    = x + 4/(x − 1)   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x > 1, la courbe de f est : ✔ au-dessus de l'asymptote oblique / · en dessous de l'asymptote oblique
    = x   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (x + 4/(x − 1))′
    = 1 − 4/(x − 1)²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 1 − 4/(x − 1)² = 0
    = (x − 1)² = 4   ← Isoler le carré
    = x = −1 ou x = 3   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (1 − 4/(x − 1)²)′
    = 8/(x − 1)³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = −1 :  [juge value]  départ : −1 + 4/(−1 − 1)
    ? Concavité : f est ✔ concave sur ]−∞ ; 1[ et convexe sur ]1 ; +∞[ / · convexe sur ]−∞ ; 1[ et concave sur ]1 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 1, mais 1 n'est pas dans le domaine / · oui, en x = 1
    ? En x = −1, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −3   ← Calculer
  — Valeur au point x = 3 :  [juge value]  départ : 3 + 4/(3 − 1)
    ? En x = 3, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 5   ← Calculer
  aides : Fais la division : f(x) = x + 4/(x − 1). Tout se lit mieux : asymptote y = x, et f′ se calcule terme par terme. | f′(x) = 1 − 4/□ | f′(x) = 1 − 4/(x − 1)², nulle en x = −1 (max) et x = 3 (min).
  pièges : g6_sketch_crosses_asymptote

```

### Niveau 5

```
Étudie f(x) = |x + 1| + 4/x : domaine, asymptotes (de chaque côté), point anguleux, extrema, position de la courbe.
  [free, sans aide]  |x + 1| + 4/x
    (Domaine de f :)
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← 0 annule le dénominateur
  — Pour x > −1 :  [juge equiv]  départ : |x + 1| + 4/x
    = x + 1 + 4/x   ← |x + 1| = x + 1
  — Pour x < −1 :  [juge equiv]  départ : |x + 1| + 4/x
    = −x − 1 + 4/x   ← |x + 1| = −x − 1
  — Limite en 0⁺ :  [juge limit]  départ : |x + 1| + 4/x
    = 4/x   ← |x + 1| tend vers 1
    = ∞   ← Asymptote verticale x = 0
  — Asymptote en +∞ :  [juge equiv]  départ : mx + h
    = x + 1   ← f(x) = x + 1 + 4/x et 4/x → 0
  — Asymptote en −∞ :  [juge equiv]  départ : mx + h
    ? En +∞, la courbe est : ✔ au-dessus de son asymptote / · en dessous de son asymptote
    = −x − 1   ← f(x) = −x − 1 + 4/x
  — Pour x > −1 :  [juge equiv]  départ : (|x + 1| + 4/x)′
    = 1 − 4/x²   ← Dériver le morceau de droite
  — Pour x < −1 :  [juge equiv]  départ : (|x + 1| + 4/x)′
    = −1 − 4/x²   ← Dériver le morceau de gauche
  — Dérivée à gauche en −1 :  [juge limit]  départ : −1 − 4/x²
    = −1 − 4/(−1)²   ← x = a dans la dérivée de gauche
    = −5   ← Calculer
  — Dérivée à droite en −1 :  [juge limit]  départ : 1 − 4/x²
    = 1 − 4/(−1)²   ← x = a dans la dérivée de droite
    = −3   ← Calculer
  — Le point anguleux A(−1 ; f(−1)) :  [juge value]  départ : |−1 + 1| + 4/(−1)
    ? f′(−1⁻) = −5 et f′(−1⁺) = −3. En x = −1, f a : ✔ un point anguleux / · une tangente : f y est dérivable
    ? Ce point anguleux est-il un extremum local ? · oui, un minimum local / · oui, un maximum local / ✔ non
    = −4   ← Calculer
  — Zéros de f′ pour x > −1 :  [juge solset]  départ : 1 − 4/x² = 0
    = x² = 4   ← Isoler x²
    = x = 2   ← Garder les solutions plus grandes que −1
  — Valeur en x = 2 :  [juge value]  départ : |2 + 1| + 4/2
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 5   ← Calculer
  pièges : g1_abs_dropped, g6_sketch_crosses_asymptote, g6_angular_not_seen

Étudie f(x) = |x − 1| + 4/x : domaine, asymptotes (de chaque côté), point anguleux, extrema, position de la courbe.
  [free, sans aide]  |x − 1| + 4/x
    (Domaine de f :)
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← 0 annule le dénominateur
  — Pour x > 1 :  [juge equiv]  départ : |x − 1| + 4/x
    = x − 1 + 4/x   ← |x − 1| = x − 1
  — Pour x < 1 :  [juge equiv]  départ : |x − 1| + 4/x
    = −x + 1 + 4/x   ← |x − 1| = −x + 1
  — Limite en 0⁺ :  [juge limit]  départ : |x − 1| + 4/x
    = 4/x   ← |x − 1| tend vers 1
    = ∞   ← Asymptote verticale x = 0
  — Asymptote en +∞ :  [juge equiv]  départ : mx + h
    = x − 1   ← f(x) = x − 1 + 4/x et 4/x → 0
  — Asymptote en −∞ :  [juge equiv]  départ : mx + h
    ? En +∞, la courbe est : ✔ au-dessus de son asymptote / · en dessous de son asymptote
    = −x + 1   ← f(x) = −x + 1 + 4/x
  — Pour x > 1 :  [juge equiv]  départ : (|x − 1| + 4/x)′
    = 1 − 4/x²   ← Dériver le morceau de droite
  — Pour x < 1 :  [juge equiv]  départ : (|x − 1| + 4/x)′
    = −1 − 4/x²   ← Dériver le morceau de gauche
  — Dérivée à gauche en 1 :  [juge limit]  départ : −1 − 4/x²
    = −1 − 4/1²   ← x = a dans la dérivée de gauche
    = −5   ← Calculer
  — Dérivée à droite en 1 :  [juge limit]  départ : 1 − 4/x²
    = 1 − 4/1²   ← x = a dans la dérivée de droite
    = −3   ← Calculer
  — Le point anguleux A(1 ; f(1)) :  [juge value]  départ : |1 − 1| + 4/1
    ? f′(1⁻) = −5 et f′(1⁺) = −3. En x = 1, f a : ✔ un point anguleux / · une tangente : f y est dérivable
    ? Ce point anguleux est-il un extremum local ? · oui, un minimum local / · oui, un maximum local / ✔ non
    = 4   ← Calculer
  — Zéros de f′ pour x > 1 :  [juge solset]  départ : 1 − 4/x² = 0
    = x² = 4   ← Isoler x²
    = x = 2   ← Garder les solutions plus grandes que 1
  — Valeur en x = 2 :  [juge value]  départ : |2 − 1| + 4/2
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 3   ← Calculer
  pièges : g1_abs_dropped, g6_sketch_crosses_asymptote, g6_angular_not_seen

Étudie f(x) = |x + 1| + 4/x : domaine, asymptotes (de chaque côté), point anguleux, extrema, position de la courbe.
  [free, sans aide]  |x + 1| + 4/x
    (Domaine de f :)
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← 0 annule le dénominateur
  — Pour x > −1 :  [juge equiv]  départ : |x + 1| + 4/x
    = x + 1 + 4/x   ← |x + 1| = x + 1
  — Pour x < −1 :  [juge equiv]  départ : |x + 1| + 4/x
    = −x − 1 + 4/x   ← |x + 1| = −x − 1
  — Limite en 0⁺ :  [juge limit]  départ : |x + 1| + 4/x
    = 4/x   ← |x + 1| tend vers 1
    = ∞   ← Asymptote verticale x = 0
  — Asymptote en +∞ :  [juge equiv]  départ : mx + h
    = x + 1   ← f(x) = x + 1 + 4/x et 4/x → 0
  — Asymptote en −∞ :  [juge equiv]  départ : mx + h
    ? En +∞, la courbe est : ✔ au-dessus de son asymptote / · en dessous de son asymptote
    = −x − 1   ← f(x) = −x − 1 + 4/x
  — Pour x > −1 :  [juge equiv]  départ : (|x + 1| + 4/x)′
    = 1 − 4/x²   ← Dériver le morceau de droite
  — Pour x < −1 :  [juge equiv]  départ : (|x + 1| + 4/x)′
    = −1 − 4/x²   ← Dériver le morceau de gauche
  — Dérivée à gauche en −1 :  [juge limit]  départ : −1 − 4/x²
    = −1 − 4/(−1)²   ← x = a dans la dérivée de gauche
    = −5   ← Calculer
  — Dérivée à droite en −1 :  [juge limit]  départ : 1 − 4/x²
    = 1 − 4/(−1)²   ← x = a dans la dérivée de droite
    = −3   ← Calculer
  — Le point anguleux A(−1 ; f(−1)) :  [juge value]  départ : |−1 + 1| + 4/(−1)
    ? f′(−1⁻) = −5 et f′(−1⁺) = −3. En x = −1, f a : ✔ un point anguleux / · une tangente : f y est dérivable
    ? Ce point anguleux est-il un extremum local ? · oui, un minimum local / · oui, un maximum local / ✔ non
    = −4   ← Calculer
  — Zéros de f′ pour x > −1 :  [juge solset]  départ : 1 − 4/x² = 0
    = x² = 4   ← Isoler x²
    = x = 2   ← Garder les solutions plus grandes que −1
  — Valeur en x = 2 :  [juge value]  départ : |2 + 1| + 4/2
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 5   ← Calculer
  pièges : g1_abs_dropped, g6_sketch_crosses_asymptote, g6_angular_not_seen

```

### Variantes d'examen

```
Étudie la fonction f(x) = (2x² + 8)/x : domaine, symétries, asymptotes, variation, concavité, valeurs du tableau et position de la courbe.
  [free, sans aide, examen open]  (2x² + 8)/x
    (Domaine de f :)
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← 0 annule le dénominateur
  — Limite en 0⁺ :  [juge limit]  départ : (2x² + 8)/x
    ? Symétries : f est · ni paire ni impaire / ✔ impaire (symétrique par rapport à l'origine) / · paire (symétrique par rapport à l'axe Oy)
    = 8/x   ← Le numérateur tend vers 8
    = ∞   ← Asymptote verticale x = 0
  — Division euclidienne :  [juge equiv]  départ : (2x² + 8)/x
    = 2x + 8/x   ← Division euclidienne
  — Asymptote oblique (en ±∞) :  [juge equiv]  départ : mx + h
    ? Pour x < 0, la courbe de f est : · au-dessus de l'asymptote oblique / ✔ en dessous de l'asymptote oblique
    = 2x   ← Le quotient de la division
  — Dérivée :  [juge equiv]  départ : (2x + 8/x)′
    = 2 − 8/x²   ← La dérivée de k/(x − a) est −k/(x − a)²
  — Zéros de f′ :  [juge solset]  départ : 2 − 8/x² = 0
    = x² = 4   ← Isoler le carré
    = x = −2 ou x = 2   ← Racine carrée
  — Dérivée seconde :  [juge equiv]  départ : (2 − 8/x²)′
    = 16/x³   ← Dériver −k(x − a)⁻²
  — Valeur au point x = −2 :  [juge value]  départ : 2·(−2) + 8/(−2)
    ? Concavité : f est ✔ concave sur ]−∞ ; 0[ et convexe sur ]0 ; +∞[ / · convexe sur ]−∞ ; 0[ et concave sur ]0 ; +∞[ / · convexe sur tout son domaine
    ? Point d'inflexion ? ✔ aucun : f″ change de signe en 0, mais 0 n'est pas dans le domaine / · oui, en x = 0
    ? En x = −2, f′ s'annule. Ce point est : ✔ un maximum local / · un minimum local / · pas un extremum
    = −8   ← Calculer
  — Valeur au point x = 2 :  [juge value]  départ : 2·2 + 8/2
    ? En x = 2, f′ s'annule. Ce point est : · un maximum local / ✔ un minimum local / · pas un extremum
    = 8   ← Calculer
  pièges : g6_sketch_crosses_asymptote

```

## Arcs paramétrés : vitesse, tangente, points stationnaires (`g6-param-tangent`, CMS)

_Pente ẏ/ẋ, tangentes horizontales et verticales, points stationnaires._

### Niveau 1

```
Arc paramétré : x(t) = t³ − 3t² − 2, y(t) = t² − 4t + 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  3t² − 6t = 0
    (Vecteur vitesse : ẋ = 3t² − 6t et ẏ = 2t − 4.)
    (Zéros de ẋ :)
    = 3t(□) = 0   (trous : 3t(t − 2) = 0)   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 4 = 0
    = 2(t − 2) = 0   ← Factoriser
    = t = 2   ← Produit nul
  — Pente au point stationnaire t = 2 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 4)/(3t² − 6t)
    ? En t = 0 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3t)   ← Simplifier par t − 2
    = 1/3   ← t → 2
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(−6 ; −2).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 3t² − 2, y(t) = t² − 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  3t² − 6t = 0
    (Vecteur vitesse : ẋ = 3t² − 6t et ẏ = 2t.)
    (Zéros de ẋ :)
    = 3t(□) = 0   (trous : 3t(t − 2) = 0)   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t = 0
    = t = 0   ← Produit nul
  — Pente au point stationnaire t = 0 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t)/(3t² − 6t)
    ? En t = 2 : ẋ = 0 et ẏ = 4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 0 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t − 2))   ← Simplifier par t
    = −1/3   ← t → 0
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente −1/3 au point M(−2 ; −2).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ + 3t² + 2, y(t) = t² + 1. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  3t² + 6t = 0
    (Vecteur vitesse : ẋ = 3t² + 6t et ẏ = 2t.)
    (Zéros de ẋ :)
    = 3(□ + 2)t = 0   (trous : 3(t + 2)t = 0)   ← Factoriser
    = t = −2 ou t = 0   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t = 0
    = t = 0   ← Produit nul
  — Pente au point stationnaire t = 0 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t)/(3t² + 6t)
    ? En t = −2 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 0 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t + 2))   ← Simplifier par t
    = 1/3   ← t → 0
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(2 ; 1).
  pièges : g6_param_slope_inverted

```

### Niveau 2

```
Arc paramétré : x(t) = t³ − 3t² + 1, y(t) = t² − 4t. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  (t³ − 3t² + 1)′
    (Vecteur vitesse :)
    = 3t² − □t   (trous : 3t² − 6t)   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 4t)′
    = 2t − 4   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 6t = 0
    = 3t(t − 2) = 0   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 4 = 0
    = 2(t − 2) = 0   ← Factoriser
    = t = 2   ← Produit nul
  — Pente au point stationnaire t = 2 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 4)/(3t² − 6t)
    ? En t = 0 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3t)   ← Simplifier par t − 2
    = 1/3   ← t → 2
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(−3 ; −4).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 3t² − 2, y(t) = t² − 4t. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  (t³ − 3t² − 2)′
    (Vecteur vitesse :)
    = 3t² − □t   (trous : 3t² − 6t)   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 4t)′
    = 2t − 4   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 6t = 0
    = 3t(t − 2) = 0   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 4 = 0
    = 2(t − 2) = 0   ← Factoriser
    = t = 2   ← Produit nul
  — Pente au point stationnaire t = 2 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 4)/(3t² − 6t)
    ? En t = 0 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3t)   ← Simplifier par t − 2
    = 1/3   ← t → 2
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(−6 ; −4).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 3t + 1, y(t) = t² + 2t + 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, avec sa pente.
  [guided]  (t³ − 3t + 1)′
    (Vecteur vitesse :)
    = 3t² − □   (trous : 3t² − 3)   ← Dériver x(t)
  —   [juge equiv]  départ : (t² + 2t + 2)′
    = 2t + 2   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 3 = 0
    = 3(t + 1)(t − 1) = 0   ← Factoriser
    = t = −1 ou t = 1   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t + 2 = 0
    = 2(t + 1) = 0   ← Factoriser
    = t = −1   ← Produit nul
  — Pente au point stationnaire t = −1 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t + 2)/(3t² − 3)
    ? En t = 1 : ẋ = 0 et ẏ = 4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = −1 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t − 1))   ← Simplifier par t + 1
    = −1/3   ← t → −1
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente −1/3 au point M(3 ; 1).
  pièges : g6_param_slope_inverted

```

### Niveau 3

```
Arc paramétré : x(t) = t³ − 12t − 1, y(t) = t³ − 3t² + 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [tap, suivre l'erreur, menu steps]  (t³ − 12t − 1)′
    (Vecteur vitesse :)
    = 3t² − 12   ← Dériver x(t)
  —   [juge equiv]  départ : (t³ − 3t² + 2)′
    = 3t² − 6t   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 12 = 0
    = 3(t + 2)(t − 2) = 0   ← Factoriser
    = t = −2 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 3t² − 6t = 0
    = 3(t − 2)t = 0   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Pente au point stationnaire t = 2 : la limite de ẏ/ẋ.  [juge limit]  départ : (3t² − 6t)/(3t² − 12)
    ? En t = −2 : ẋ = 0 et ẏ = 24 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 0 : ẏ = 0 et ẋ = −12 ≠ 0. La tangente en ce point est : ✔ horizontale / · verticale / · un point stationnaire
    ? En t = 2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = t/(t + 2)   ← Simplifier par t − 2
    = 1/2   ← t → 2
  — Le point stationnaire M(2) :  [juge value]  départ : 2³ − 12·2 − 1
    = −17   ← Calculer
  —   [juge value]  départ : 2³ − 3·2² + 2
    = −2   ← Calculer
  — Tangente en M(−17 ; −2), de pente 1/2 :  [juge equiv]  départ : −2 + (1/2)(x + 17)
    = (1/2)x + 13/2   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = □/(t + 2) | Pente 1/2 au point M(−17 ; −2).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 12t + 1, y(t) = t² + 4t. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [tap, suivre l'erreur, menu steps]  (t³ − 12t + 1)′
    (Vecteur vitesse :)
    = 3t² − 12   ← Dériver x(t)
  —   [juge equiv]  départ : (t² + 4t)′
    = 2t + 4   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 12 = 0
    = 3(t + 2)(t − 2) = 0   ← Factoriser
    = t = −2 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t + 4 = 0
    = 2(t + 2) = 0   ← Factoriser
    = t = −2   ← Produit nul
  — Pente au point stationnaire t = −2 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t + 4)/(3t² − 12)
    ? En t = 2 : ẋ = 0 et ẏ = 8 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = −2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t − 2))   ← Simplifier par t + 2
    = −1/6   ← t → −2
  — Le point stationnaire M(−2) :  [juge value]  départ : (−2)³ − 12·(−2) + 1
    = 17   ← Calculer
  —   [juge value]  départ : (−2)² + 4·(−2)
    = −4   ← Calculer
  — Tangente en M(17 ; −4), de pente −1/6 :  [juge equiv]  départ : −4 + (−1/6)(x − 17)
    = −(1/6)x − 7/6   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente −1/6 au point M(17 ; −4).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ + 3t² − 2, y(t) = t² + 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [tap, suivre l'erreur, menu steps]  (t³ + 3t² − 2)′
    (Vecteur vitesse :)
    = 3t² + 6t   ← Dériver x(t)
  —   [juge equiv]  départ : (t² + 2)′
    = 2t   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² + 6t = 0
    = 3(t + 2)t = 0   ← Factoriser
    = t = −2 ou t = 0   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t = 0
    = t = 0   ← Produit nul
  — Pente au point stationnaire t = 0 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t)/(3t² + 6t)
    ? En t = −2 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 0 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t + 2))   ← Simplifier par t
    = 1/3   ← t → 0
  — Le point stationnaire M(0) :  [juge value]  départ : 0³ + 3·0² − 2
    = −2   ← Calculer
  —   [juge value]  départ : 0² + 2
    = 2   ← Calculer
  — Tangente en M(−2 ; 2), de pente 1/3 :  [juge equiv]  départ : 2 + (1/3)(x + 2)
    = (1/3)x + 8/3   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(−2 ; 2).
  pièges : g6_param_slope_inverted

```

### Niveau 4

```
Arc paramétré : x(t) = t³ − 3t − 1, y(t) = t² − 2t. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, suivre l'erreur]  (t³ − 3t − 1)′
    (Vecteur vitesse :)
    = 3t² − 3   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 2t)′
    = 2t − 2   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 3 = 0
    = 3(t + 1)(t − 1) = 0   ← Factoriser
    = t = −1 ou t = 1   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 2 = 0
    = 2(t − 1) = 0   ← Factoriser
    = t = 1   ← Produit nul
  — Pente au point stationnaire t = 1 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 2)/(3t² − 3)
    ? En t = −1 : ẋ = 0 et ẏ = −4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 1 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t + 1))   ← Simplifier par t − 1
    = 1/3   ← t → 1
  — Le point stationnaire M(1) :  [juge value]  départ : 1³ − 3·1 − 1
    = −3   ← Calculer
  —   [juge value]  départ : 1² − 2·1
    = −1   ← Calculer
  — Tangente en M(−3 ; −1), de pente 1/3 :  [juge equiv]  départ : −1 + (1/3)(x + 3)
    = (1/3)x   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/3 au point M(−3 ; −1).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 3t² − 9t + 2, y(t) = t² − 6t. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, suivre l'erreur]  (t³ − 3t² − 9t + 2)′
    (Vecteur vitesse :)
    = 3t² − 6t − 9   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 6t)′
    = 2t − 6   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 6t − 9 = 0
    = 3(t + 1)(t − 3) = 0   ← Factoriser
    = t = −1 ou t = 3   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 6 = 0
    = 2(t − 3) = 0   ← Factoriser
    = t = 3   ← Produit nul
  — Pente au point stationnaire t = 3 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 6)/(3t² − 6t − 9)
    ? En t = −1 : ẋ = 0 et ẏ = −8 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 3 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t + 1))   ← Simplifier par t − 3
    = 1/6   ← t → 3
  — Le point stationnaire M(3) :  [juge value]  départ : 3³ − 3·3² − 9·3 + 2
    = −25   ← Calculer
  —   [juge value]  départ : 3² − 6·3
    = −9   ← Calculer
  — Tangente en M(−25 ; −9), de pente 1/6 :  [juge equiv]  départ : −9 + (1/6)(x + 25)
    = (1/6)x − 29/6   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = 2/(3(t − □)) | Pente 1/6 au point M(−25 ; −9).
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 3t² + 2, y(t) = t³ − 12t − 1. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, suivre l'erreur]  (t³ − 3t² + 2)′
    (Vecteur vitesse :)
    = 3t² − 6t   ← Dériver x(t)
  —   [juge equiv]  départ : (t³ − 12t − 1)′
    = 3t² − 12   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 6t = 0
    = 3t(t − 2) = 0   ← Factoriser
    = t = 0 ou t = 2   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 3t² − 12 = 0
    = 3(t − 2)(t + 2) = 0   ← Factoriser
    = t = −2 ou t = 2   ← Produit nul
  — Pente au point stationnaire t = 2 : la limite de ẏ/ẋ.  [juge limit]  départ : (3t² − 12)/(3t² − 6t)
    ? En t = 0 : ẋ = 0 et ẏ = −12 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = −2 : ẏ = 0 et ẋ = 24 ≠ 0. La tangente en ce point est : ✔ horizontale / · verticale / · un point stationnaire
    ? En t = 2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = (t + 2)/t   ← Simplifier par t − 2
    = 2   ← t → 2
  — Le point stationnaire M(2) :  [juge value]  départ : 2³ − 3·2² + 2
    = −2   ← Calculer
  —   [juge value]  départ : 2³ − 12·2 − 1
    = −17   ← Calculer
  — Tangente en M(−2 ; −17), de pente 2 :  [juge equiv]  départ : −17 + (2)(x + 2)
    = 2x − 13   ← Développer
  aides : Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ. | ẏ/ẋ = □/t | Pente 2 au point M(−2 ; −17).
  pièges : g6_param_slope_inverted

```

### Niveau 5

```
Arc paramétré : x(t) = t³ − 3t² − 9t, y(t) = t² − 6t + 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, sans aide]  (t³ − 3t² − 9t)′
    (Vecteur vitesse :)
    = 3t² − 6t − 9   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 6t + 2)′
    = 2t − 6   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 6t − 9 = 0
    = 3(t + 1)(t − 3) = 0   ← Factoriser
    = t = −1 ou t = 3   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 6 = 0
    = 2(t − 3) = 0   ← Factoriser
    = t = 3   ← Produit nul
  — Pente au point stationnaire t = 3 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 6)/(3t² − 6t − 9)
    ? En t = −1 : ẋ = 0 et ẏ = −8 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 3 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t + 1))   ← Simplifier par t − 3
    = 1/6   ← t → 3
  — Le point stationnaire M(3) :  [juge value]  départ : 3³ − 3·3² − 9·3
    = −27   ← Calculer
  —   [juge value]  départ : 3² − 6·3 + 2
    = −7   ← Calculer
  — Tangente en M(−27 ; −7), de pente 1/6 :  [juge equiv]  départ : −7 + (1/6)(x + 27)
    = (1/6)x − 5/2   ← Développer
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ + a·t² + b·t, y(t) = t² + c·t. Trouve a, b et c pour que M(−2) soit un point stationnaire à tangente verticale.
  [free, sans aide]  (t³ + a·t² + b·t)′
    (Vecteur vitesse :)
    = 3t² + 2a·t + b   ← Dériver x(t)
  —   [juge equiv]  départ : (t² + c·t)′
    = 2t + c   ← Dériver y(t)
  — ẏ(−2) = 0 :  [juge solset]  départ : 2·(−2) + c = 0
    ? Au point M(−2), on veut un point stationnaire à tangente verticale. Il faut : ✔ ẏ(−2) = 0, et −2 zéro double de ẋ : ẋ(−2) = 0 et ẍ(−2) = 0 / · ẋ(−2) = 0, et −2 zéro double de ẏ : ẏ(−2) = 0 et ÿ(−2) = 0 / · ẋ(−2) = 0 et ẏ(−2) = 0 suffisent
    = c = 4   ← Isoler c
  — ẍ = 6t + 2a et ẍ(−2) = 0 :  [juge solset]  départ : 6·(−2) + 2a = 0
    = a = 6   ← Isoler a
  — ẋ(−2) = 0, avec a = 6 :  [juge solset]  départ : 3·(−2)² + 12·(−2) + b = 0
    = b = 12   ← Isoler b
  — Vérifie : ẏ/ẋ quand t → −2⁺.  [juge limit]  départ : (2t + 4)/(3t² + 12t + 12)
    = 2/(3(t + 2))   ← ẋ = 3(t + 2)², ẏ = 2(t + 2)
    = ∞   ← Tangente verticale
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ + 3t², y(t) = t² + 4t − 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, sans aide]  (t³ + 3t²)′
    (Vecteur vitesse :)
    = 3t² + 6t   ← Dériver x(t)
  —   [juge equiv]  départ : (t² + 4t − 2)′
    = 2t + 4   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² + 6t = 0
    = 3(t + 2)t = 0   ← Factoriser
    = t = −2 ou t = 0   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t + 4 = 0
    = 2(t + 2) = 0   ← Factoriser
    = t = −2   ← Produit nul
  — Pente au point stationnaire t = −2 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t + 4)/(3t² + 6t)
    ? En t = 0 : ẋ = 0 et ẏ = 4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = −2 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3t)   ← Simplifier par t + 2
    = −1/3   ← t → −2
  — Le point stationnaire M(−2) :  [juge value]  départ : (−2)³ + 3·(−2)²
    = 4   ← Calculer
  —   [juge value]  départ : (−2)² + 4·(−2) − 2
    = −6   ← Calculer
  — Tangente en M(4 ; −6), de pente −1/3 :  [juge equiv]  départ : −6 + (−1/3)(x − 4)
    = −(1/3)x − 14/3   ← Développer
  pièges : g6_param_slope_inverted

```

### Variantes d'examen

```
Arc paramétré : x(t) = t³ + 6t² + 9t − 1, y(t) = t² + 6t. Quelle est la pente de la tangente au point M(−2) ?
  · 3/2   ✔ −2/3   · 2/3   · −3/2 [g6_param_slope_inverted]
  [examen mcq]
  pièges : g6_param_slope_inverted

Arc paramétré : x(t) = t³ − 6t² + 9t − 2, y(t) = t² − 2t − 2. Trouve les points à tangente horizontale ou verticale et le point stationnaire, puis la tangente en ce point.
  [free, sans aide, examen open]  (t³ − 6t² + 9t − 2)′
    (Vecteur vitesse :)
    = 3t² − 12t + 9   ← Dériver x(t)
  —   [juge equiv]  départ : (t² − 2t − 2)′
    = 2t − 2   ← Dériver y(t)
  — Zéros de ẋ :  [juge solset]  départ : 3t² − 12t + 9 = 0
    = 3(t − 1)(t − 3) = 0   ← Factoriser
    = t = 1 ou t = 3   ← Produit nul
  — Zéros de ẏ :  [juge solset]  départ : 2t − 2 = 0
    = 2(t − 1) = 0   ← Factoriser
    = t = 1   ← Produit nul
  — Pente au point stationnaire t = 1 : la limite de ẏ/ẋ.  [juge limit]  départ : (2t − 2)/(3t² − 12t + 9)
    ? En t = 3 : ẋ = 0 et ẏ = 4 ≠ 0. La tangente en ce point est : ✔ verticale / · horizontale / · un point stationnaire
    ? En t = 1 : ẋ = ẏ = 0. Ce point est : ✔ un point stationnaire : la pente est la limite de ẏ/ẋ / · un point à tangente verticale / · un point à tangente horizontale
    = 2/(3(t − 3))   ← Simplifier par t − 1
    = −1/3   ← t → 1
  — Le point stationnaire M(1) :  [juge value]  départ : 1³ − 6·1² + 9·1 − 2
    = 2   ← Calculer
  —   [juge value]  départ : 1² − 2·1 − 2
    = −3   ← Calculer
  — Tangente en M(2 ; −3), de pente −1/3 :  [juge equiv]  départ : −3 + (−1/3)(x − 2)
    = −(1/3)x − 7/3   ← Développer
  pièges : g6_param_slope_inverted

```

## Arcs paramétrés : branches infinies et esquisse (`g6-param-branches`, CMS)

_Limites de x et de y à chaque borne, asymptotes, branches paraboliques._

### Niveau 1

```
Γ : x(t) = (t² + t − 2)/(t − 2), y(t) = (2t + 1)/(t − 2). Détermine les branches infinies de Γ.
  [guided]  ((2t + 1)/(t − 2))/((t² + t − 2)/(t − 2))
    (Les limites : quand t → ±∞, x → ±∞ et y → 2 ; quand t → 2, x → ∞ et y → ∞.)
    (Quand t → 2 : m = lim y/x.)
    ? Quand t → 2, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (2t + 1)/(□)   (trous : (2t + 1)/(t² + t − 2))   ← Les dénominateurs t − t₀ se simplifient
    = 5/4   ← t = 2
  — Quand t → 2 : h = lim (y − mx).  [juge limit]  départ : (2t + 1)/(t − 2) − (5/4)·(t² + t − 2)/(t − 2)
    = (−(5/4)t² + (3/4)t + 7/2)/(t − 2)   ← Même dénominateur
    = −(5/4)t − □/4   (trous : −(5/4)t − 7/4)   ← Le numérateur s'annule en 2 : on simplifie par t − 2
    = −17/4   ← t = 2
  — Asymptote quand t → 2 :  [juge equiv]  départ : mx + h
    ? m = 5/4 et h = −17/4 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = (5/4)x − 17/4   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−(5/4)t² + (3/4)t + 7/2)/(t − □) | y = (5/4)x − 17/4
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² + 3t − 1)/(t + 2), y(t) = (t − 3)/(t + 2). Détermine les branches infinies de Γ.
  [guided]  ((t − 3)/(t + 2))/((t² + 3t − 1)/(t + 2))
    (Les limites : quand t → ±∞, x → ±∞ et y → 1 ; quand t → −2, x → ∞ et y → ∞.)
    (Quand t → −2 : m = lim y/x.)
    ? Quand t → −2, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (t − 3)/(□)   (trous : (t − 3)/(t² + 3t − 1))   ← Les dénominateurs t − t₀ se simplifient
    = 5/3   ← t = −2
  — Quand t → −2 : h = lim (y − mx).  [juge limit]  départ : (t − 3)/(t + 2) − (5/3)·(t² + 3t − 1)/(t + 2)
    = (−(5/3)t² − 4t − 4/3)/(t + 2)   ← Même dénominateur
    = −(5/3)t − □/3   (trous : −(5/3)t − 2/3)   ← Le numérateur s'annule en −2 : on simplifie par t + 2
    = 8/3   ← t = −2
  — Asymptote quand t → −2 :  [juge equiv]  départ : mx + h
    ? m = 5/3 et h = 8/3 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = (5/3)x + 8/3   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−(5/3)t² − 4t − 4/3)/(t − □) | y = (5/3)x + 8/3
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² − 3t − 3)/(t + 3), y(t) = (−t + 3)/(t + 3). Détermine les branches infinies de Γ.
  [guided]  ((−t + 3)/(t + 3))/((t² − 3t − 3)/(t + 3))
    (Les limites : quand t → ±∞, x → ±∞ et y → −1 ; quand t → −3, x → ∞ et y → ∞.)
    (Quand t → −3 : m = lim y/x.)
    ? Quand t → −3, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (−t + 3)/(□)   (trous : (−t + 3)/(t² − 3t − 3))   ← Les dénominateurs t − t₀ se simplifient
    = 2/5   ← t = −3
  — Quand t → −3 : h = lim (y − mx).  [juge limit]  départ : (−t + 3)/(t + 3) − (2/5)·(t² − 3t − 3)/(t + 3)
    = (−(2/5)t² + (1/5)t + 21/5)/(t + 3)   ← Même dénominateur
    = −(2/5)t + □/5   (trous : −(2/5)t + 7/5)   ← Le numérateur s'annule en −3 : on simplifie par t + 3
    = 13/5   ← t = −3
  — Asymptote quand t → −3 :  [juge equiv]  départ : mx + h
    ? m = 2/5 et h = 13/5 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = (2/5)x + 13/5   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−(2/5)t² + (1/5)t + 21/5)/(t − □) | y = (2/5)x + 13/5
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

```

### Niveau 2

```
Γ : x(t) = (t² + 3t − 3)/(t − 1), y(t) = (t + 1)/(t − 1). Détermine les branches infinies de Γ.
  [guided]  (t + 1)/(t − 1)
    (Quand t → ±∞ :)
    = 1   ← Coefficients dominants
  —   [juge limit]  départ : (t² + 3t − 3)/(t − 1)
    = ∞   ← Degré 2 sur degré 1
  — Quand t → 1⁺ :  [juge limit]  départ : (t² + 3t − 3)/(t − 1)
    ? Quand t → ±∞ : x → ±∞ et y → 1. La branche est : ✔ une asymptote horizontale y = 1 / · une asymptote verticale x = 1 / · une asymptote oblique
    = 1/(t − 1)   ← Le numérateur tend vers 1
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (t + 1)/(t − 1)
    = 2/(t − 1)   ← Le numérateur tend vers 2
    = ∞   ← Dénominateur → 0⁺
  — Quand t → 1 : m = lim y/x.  [juge limit]  départ : ((t + 1)/(t − 1))/((t² + 3t − 3)/(t − 1))
    ? Quand t → 1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (t + 1)/(t² + 3t − 3)   ← Les dénominateurs t − t₀ se simplifient
    = 2   ← t = 1
  — Quand t → 1 : h = lim (y − mx).  [juge limit]  départ : (t + 1)/(t − 1) − 2·(t² + 3t − 3)/(t − 1)
    = (−2t² − 5t + 7)/(t − 1)   ← Même dénominateur
    = −2t − □   (trous : −2t − 7)   ← Le numérateur s'annule en 1 : on simplifie par t − 1
    = −9   ← t = 1
  — Asymptote quand t → 1 :  [juge equiv]  départ : mx + h
    ? m = 2 et h = −9 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = 2x − 9   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−2t² − 5t + 7)/(t − □) | y = 2x − 9
  pièges : a1_bh_quotient_rule, g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² + t − 2)/(t − 2), y(t) = (2t − 3)/(t − 2). Détermine les branches infinies de Γ.
  [guided]  (2t − 3)/(t − 2)
    (Quand t → ±∞ :)
    = 2   ← Coefficients dominants
  —   [juge limit]  départ : (t² + t − 2)/(t − 2)
    = ∞   ← Degré 2 sur degré 1
  — Quand t → 2⁺ :  [juge limit]  départ : (t² + t − 2)/(t − 2)
    ? Quand t → ±∞ : x → ±∞ et y → 2. La branche est : ✔ une asymptote horizontale y = 2 / · une asymptote verticale x = 2 / · une asymptote oblique
    = 4/(t − 2)   ← Le numérateur tend vers 4
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (2t − 3)/(t − 2)
    = 1/(t − 2)   ← Le numérateur tend vers 1
    = ∞   ← Dénominateur → 0⁺
  — Quand t → 2 : m = lim y/x.  [juge limit]  départ : ((2t − 3)/(t − 2))/((t² + t − 2)/(t − 2))
    ? Quand t → 2, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (2t − 3)/(t² + t − 2)   ← Les dénominateurs t − t₀ se simplifient
    = 1/4   ← t = 2
  — Quand t → 2 : h = lim (y − mx).  [juge limit]  départ : (2t − 3)/(t − 2) − (1/4)·(t² + t − 2)/(t − 2)
    = (−(1/4)t² + (7/4)t − 5/2)/(t − 2)   ← Même dénominateur
    = −(1/4)t + □/4   (trous : −(1/4)t + 5/4)   ← Le numérateur s'annule en 2 : on simplifie par t − 2
    = 3/4   ← t = 2
  — Asymptote quand t → 2 :  [juge equiv]  départ : mx + h
    ? m = 1/4 et h = 3/4 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = (1/4)x + 3/4   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−(1/4)t² + (7/4)t − 5/2)/(t − □) | y = (1/4)x + 3/4
  pièges : a1_bh_quotient_rule, g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² + 3)/(t − 1), y(t) = (−t − 2)/(t − 1). Détermine les branches infinies de Γ.
  [guided]  (−t − 2)/(t − 1)
    (Quand t → ±∞ :)
    = −1   ← Coefficients dominants
  —   [juge limit]  départ : (t² + 3)/(t − 1)
    = ∞   ← Degré 2 sur degré 1
  — Quand t → 1⁺ :  [juge limit]  départ : (t² + 3)/(t − 1)
    ? Quand t → ±∞ : x → ±∞ et y → −1. La branche est : ✔ une asymptote horizontale y = −1 / · une asymptote verticale x = −1 / · une asymptote oblique
    = 4/(t − 1)   ← Le numérateur tend vers 4
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (−t − 2)/(t − 1)
    = −3/(t − 1)   ← Le numérateur tend vers −3
    = −∞   ← Dénominateur → 0⁺
  — Quand t → 1 : m = lim y/x.  [juge limit]  départ : ((−t − 2)/(t − 1))/((t² + 3)/(t − 1))
    ? Quand t → 1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (−t − 2)/(t² + 3)   ← Les dénominateurs t − t₀ se simplifient
    = −3/4   ← t = 1
  — Quand t → 1 : h = lim (y − mx).  [juge limit]  départ : (−t − 2)/(t − 1) − (−3/4)·(t² + 3)/(t − 1)
    = ((3/4)t² − t + 1/4)/(t − 1)   ← Même dénominateur
    = (3/4)t − □/4   (trous : (3/4)t − 1/4)   ← Le numérateur s'annule en 1 : on simplifie par t − 1
    = 1/2   ← t = 1
  — Asymptote quand t → 1 :  [juge equiv]  départ : mx + h
    ? m = −3/4 et h = 1/2 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = −(3/4)x + 1/2   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim ((3/4)t² − t + 1/4)/(t − □) | y = −(3/4)x + 1/2
  pièges : a1_bh_quotient_rule, g6_param_ratio_inverted, g6_oblique_h_forgot

```

### Niveau 3

```
Γ : x(t) = (t² − t + 1)/(t − 1), y(t) = (t + 3)/(t − 1). Détermine les branches infinies de Γ.
  [tap, suivre l'erreur, menu steps]  (t² − t + 1)/(t − 1)
    (Domaine en t :)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← Bornes à étudier : ±∞ et 1
  — Quand t → +∞ :  [juge limit]  départ : (t² − t + 1)/(t − 1)
    = ∞   ← Degré 2 sur degré 1
  —   [juge limit]  départ : (t + 3)/(t − 1)
    = 1   ← Coefficients dominants
  — Quand t → 1⁺ :  [juge limit]  départ : (t² − t + 1)/(t − 1)
    ? Quand t → ±∞ : x → ±∞ et y → 1. La branche est : ✔ une asymptote horizontale y = 1 / · une asymptote verticale x = 1 / · une asymptote oblique
    = 1/(t − 1)   ← Le numérateur tend vers 1
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (t + 3)/(t − 1)
    = 4/(t − 1)   ← Le numérateur tend vers 4
    = ∞   ← Dénominateur → 0⁺
  — Quand t → 1 : m = lim y/x.  [juge limit]  départ : ((t + 3)/(t − 1))/((t² − t + 1)/(t − 1))
    ? Quand t → 1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (t + 3)/(t² − t + 1)   ← Les dénominateurs t − t₀ se simplifient
    = 4   ← t = 1
  — Quand t → 1 : h = lim (y − mx).  [juge limit]  départ : (t + 3)/(t − 1) − 4·(t² − t + 1)/(t − 1)
    = (−4t² + 5t − 1)/(t − 1)   ← Même dénominateur
    = −4t + 1   ← Le numérateur s'annule en 1 : on simplifie par t − 1
    = −3   ← t = 1
  — Asymptote quand t → 1 :  [juge equiv]  départ : mx + h
    ? m = 4 et h = −3 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = 4x − 3   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−4t² + 5t − 1)/(t − □) | y = 4x − 3
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² − 2)/(t − 2), y(t) = (2t)/(t − 2). Détermine les branches infinies de Γ.
  [tap, suivre l'erreur, menu steps]  (t² − 2)/(t − 2)
    (Domaine en t :)
    = ]−∞ ; 2[ ∪ ]2 ; +∞[   ← Bornes à étudier : ±∞ et 2
  — Quand t → +∞ :  [juge limit]  départ : (t² − 2)/(t − 2)
    = ∞   ← Degré 2 sur degré 1
  —   [juge limit]  départ : (2t)/(t − 2)
    = 2   ← Coefficients dominants
  — Quand t → 2⁺ :  [juge limit]  départ : (t² − 2)/(t − 2)
    ? Quand t → ±∞ : x → ±∞ et y → 2. La branche est : ✔ une asymptote horizontale y = 2 / · une asymptote verticale x = 2 / · une asymptote oblique
    = 2/(t − 2)   ← Le numérateur tend vers 2
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (2t)/(t − 2)
    = 4/(t − 2)   ← Le numérateur tend vers 4
    = ∞   ← Dénominateur → 0⁺
  — Quand t → 2 : m = lim y/x.  [juge limit]  départ : ((2t)/(t − 2))/((t² − 2)/(t − 2))
    ? Quand t → 2, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (2t)/(t² − 2)   ← Les dénominateurs t − t₀ se simplifient
    = 2   ← t = 2
  — Quand t → 2 : h = lim (y − mx).  [juge limit]  départ : (2t)/(t − 2) − 2·(t² − 2)/(t − 2)
    = (−2t² + 2t + 4)/(t − 2)   ← Même dénominateur
    = −2t − 2   ← Le numérateur s'annule en 2 : on simplifie par t − 2
    = −6   ← t = 2
  — Asymptote quand t → 2 :  [juge equiv]  départ : mx + h
    ? m = 2 et h = −6 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = 2x − 6   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−2t² + 2t + 4)/(t − □) | y = 2x − 6
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² + 3t)/(t − 3), y(t) = (t + 3)/(t − 3). Détermine les branches infinies de Γ.
  [tap, suivre l'erreur, menu steps]  (t² + 3t)/(t − 3)
    (Domaine en t :)
    = ]−∞ ; 3[ ∪ ]3 ; +∞[   ← Bornes à étudier : ±∞ et 3
  — Quand t → +∞ :  [juge limit]  départ : (t² + 3t)/(t − 3)
    = ∞   ← Degré 2 sur degré 1
  —   [juge limit]  départ : (t + 3)/(t − 3)
    = 1   ← Coefficients dominants
  — Quand t → 3⁺ :  [juge limit]  départ : (t² + 3t)/(t − 3)
    ? Quand t → ±∞ : x → ±∞ et y → 1. La branche est : ✔ une asymptote horizontale y = 1 / · une asymptote verticale x = 1 / · une asymptote oblique
    = 18/(t − 3)   ← Le numérateur tend vers 18
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (t + 3)/(t − 3)
    = 6/(t − 3)   ← Le numérateur tend vers 6
    = ∞   ← Dénominateur → 0⁺
  — Quand t → 3 : m = lim y/x.  [juge limit]  départ : ((t + 3)/(t − 3))/((t² + 3t)/(t − 3))
    ? Quand t → 3, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (t + 3)/(t² + 3t)   ← Les dénominateurs t − t₀ se simplifient
    = 1/3   ← t = 3
  — Quand t → 3 : h = lim (y − mx).  [juge limit]  départ : (t + 3)/(t − 3) − (1/3)·(t² + 3t)/(t − 3)
    = (−(1/3)t² + 3)/(t − 3)   ← Même dénominateur
    = −(1/3)t − 1   ← Le numérateur s'annule en 3 : on simplifie par t − 3
    = −2   ← t = 3
  — Asymptote quand t → 3 :  [juge equiv]  départ : mx + h
    ? m = 1/3 et h = −2 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = (1/3)x − 2   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−(1/3)t² + 3)/(t − □) | y = (1/3)x − 2
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

```

### Niveau 4

```
Γ : x(t) = (t² + t + 2)/(t − 1), y(t) = (2t − 3)/(t − 1). Détermine les branches infinies de Γ.
  [free, suivre l'erreur]  (t² + t + 2)/(t − 1)
    (Domaine en t :)
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← Bornes à étudier : ±∞ et 1
  — Quand t → +∞ :  [juge limit]  départ : (t² + t + 2)/(t − 1)
    = ∞   ← Degré 2 sur degré 1
  —   [juge limit]  départ : (2t − 3)/(t − 1)
    = 2   ← Coefficients dominants
  — Quand t → 1⁺ :  [juge limit]  départ : (t² + t + 2)/(t − 1)
    ? Quand t → ±∞ : x → ±∞ et y → 2. La branche est : ✔ une asymptote horizontale y = 2 / · une asymptote verticale x = 2 / · une asymptote oblique
    = 4/(t − 1)   ← Le numérateur tend vers 4
    = ∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (2t − 3)/(t − 1)
    = −1/(t − 1)   ← Le numérateur tend vers −1
    = −∞   ← Dénominateur → 0⁺
  — Quand t → 1 : m = lim y/x.  [juge limit]  départ : ((2t − 3)/(t − 1))/((t² + t + 2)/(t − 1))
    ? Quand t → 1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (2t − 3)/(t² + t + 2)   ← Les dénominateurs t − t₀ se simplifient
    = −1/4   ← t = 1
  — Quand t → 1 : h = lim (y − mx).  [juge limit]  départ : (2t − 3)/(t − 1) − (−1/4)·(t² + t + 2)/(t − 1)
    = ((1/4)t² + (9/4)t − 5/2)/(t − 1)   ← Même dénominateur
    = (1/4)t + 5/2   ← Le numérateur s'annule en 1 : on simplifie par t − 1
    = 11/4   ← t = 1
  — Asymptote quand t → 1 :  [juge equiv]  départ : mx + h
    ? m = −1/4 et h = 11/4 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = −(1/4)x + 11/4   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim ((1/4)t² + (9/4)t − 5/2)/(t − □) | y = −(1/4)x + 11/4
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (t² + 3t)/(t + 1), y(t) = (t − 1)/(t + 1). Détermine les branches infinies de Γ.
  [free, suivre l'erreur]  (t² + 3t)/(t + 1)
    (Domaine en t :)
    = ]−∞ ; −1[ ∪ ]−1 ; +∞[   ← Bornes à étudier : ±∞ et −1
  — Quand t → +∞ :  [juge limit]  départ : (t² + 3t)/(t + 1)
    = ∞   ← Degré 2 sur degré 1
  —   [juge limit]  départ : (t − 1)/(t + 1)
    = 1   ← Coefficients dominants
  — Quand t → −1⁺ :  [juge limit]  départ : (t² + 3t)/(t + 1)
    ? Quand t → ±∞ : x → ±∞ et y → 1. La branche est : ✔ une asymptote horizontale y = 1 / · une asymptote verticale x = 1 / · une asymptote oblique
    = −2/(t + 1)   ← Le numérateur tend vers −2
    = −∞   ← Dénominateur → 0⁺
  —   [juge limit]  départ : (t − 1)/(t + 1)
    = −2/(t + 1)   ← Le numérateur tend vers −2
    = −∞   ← Dénominateur → 0⁺
  — Quand t → −1 : m = lim y/x.  [juge limit]  départ : ((t − 1)/(t + 1))/((t² + 3t)/(t + 1))
    ? Quand t → −1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = (t − 1)/(t² + 3t)   ← Les dénominateurs t − t₀ se simplifient
    = 1   ← t = −1
  — Quand t → −1 : h = lim (y − mx).  [juge limit]  départ : (t − 1)/(t + 1) − (t² + 3t)/(t + 1)
    = (−t² − 2t − 1)/(t + 1)   ← Même dénominateur
    = −t − 1   ← Le numérateur s'annule en −1 : on simplifie par t + 1
    = 0   ← t = −1
  — Asymptote quand t → −1 :  [juge equiv]  départ : mx + h
    ? m = 1 et h = 0 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = x   ← y = mx + h
  aides : Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas. | h = lim (−t² − 2t − 1)/(t − □) | y = x
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = ln(t² + 3), y(t) = ln(t⁴ + 3t²). Détermine les branches infinies de Γ.
  [free, suivre l'erreur]  ln(t⁴ + 3t²)
    (Domaine en t :)
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← Bornes à étudier : 0 et ±∞
  — Quand t → 0 :  [juge limit]  départ : ln(t² + 3)
    = ln(3)   ← x est continue en 0
  —   [juge limit]  départ : ln(t⁴ + 3t²)
    = −∞   ← ln de quelque chose qui tend vers 0⁺
  — Quand t → ±∞ (x et y sont paires en t) :  [juge limit]  départ : ln(t² + 3)
    ? Quand t → 0 : x → ln(3) et y → −∞. La branche est : ✔ une asymptote verticale x = ln(3) / · une asymptote horizontale / · pas de branche infinie
    = ∞   ← ln(+∞)
  —   [juge limit]  départ : ln(t⁴ + 3t²)
    = ∞   ← ln(+∞)
  — Quand t → ±∞ : m = lim y/x.  [juge limit]  départ : (ln(t⁴ + 3t²))/(ln(t² + 3))
    ? Quand t → ±∞, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = ln(t²)/ln(t² + 3) + 1   ← ln(t²(t² + 3)) = ln(t²) + ln(t² + 3)
    = 2   ← ln(t²)/ln(t² + c) → 1
  — h = lim (y − mx).  [juge limit]  départ : ln(t⁴ + 3t²) − 2ln(t² + 3)
    = ln(t²) − ln(t² + 3)   ← Regrouper
    = ln(t²/(t² + 3))   ← Un seul logarithme
    = 0   ← ln(1) = 0
  — Asymptote quand t → ±∞ :  [juge equiv]  départ : mx + h
    ? m = 2 et h = 0 sont finis. La branche est : ✔ une asymptote oblique y = mx + h / · une branche parabolique / · l'asymptote y = mx
    = 2x   ← y = mx + h
  aides : À chaque borne (0 et ±∞), calcule les limites de x et de y, puis choisis le cas. | m = lim y/x : écris ln(t²(…)) = ln(t²) + ln(…). | Asymptote verticale en t → 0, asymptote oblique en ±∞.
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

```

### Niveau 5

```
Γ : x(t) = (a·t² − t)/(t + 1), y(t) = t/(t + 1), avec a ∈ ℝ. Détermine, selon a, les branches infinies de Γ (en ±∞ et quand t → −1).
  [free, sans aide]  t/(t + 1)
    (Quand t → ±∞ :)
    = 1   ← Coefficients dominants
  — Cas a = 0 : x(t) = −t/(t + 1). Quand t → ±∞ :  [juge limit]  départ : −t/(t + 1)
    = −1   ← Coefficients dominants
  — Quand t → −1, y → ∞. Cas a = −1 :  [juge equiv]  départ : (−t² − t)/(t + 1)
    ? Quand t → ±∞ : y → 1 ; x → ∞ si a ≠ 0, et x → −1 si a = 0. Donc : ✔ a ≠ 0 : asymptote horizontale y = 1 ; a = 0 : pas de branche infinie, M(t) tend vers (−1 ; 1) / · asymptote horizontale y = 1 pour tout a / · a = 0 : asymptote verticale x = −1
    = −t   ← Factoriser −t(t + 1)
  — Cas a ≠ −1 : quand t → −1, x et y → ∞.  [juge equiv]  départ : (t/(t + 1))/((a·t² − t)/(t + 1))
    ? Cas a = −1 : x(t) = −t → 1 et y → ∞ quand t → −1. La branche est : ✔ une asymptote verticale x = 1 / · une asymptote horizontale y = 1 / · une asymptote oblique
    ? Quand t → −1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = 1/(a·t − 1)   ← Simplifier par t(t + 1)/(t + 1)
  — m = lim y/x quand t → −1 :  [juge equiv]  départ : 1/(a·t − 1)
    = −1/(a + 1)   ← t = −1
  — y − mx =  [juge equiv]  départ : t/(t + 1) + (1/(a + 1))·(a·t² − t)/(t + 1)
    = 1a·t/(a + 1)   ← Même dénominateur, puis simplifier par t + 1
  — h = lim (y − mx) quand t → −1 :  [juge equiv]  départ : 1a·t/(a + 1)
    = −1a/(a + 1)   ← t = −1
  — Asymptote oblique (a ≠ −1) :  [juge equiv]  départ : mx + h
    = −1(x + a)/(a + 1)   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (a·t² − t)/(t + 1), y(t) = 2t/(t + 1), avec a ∈ ℝ. Détermine, selon a, les branches infinies de Γ (en ±∞ et quand t → −1).
  [free, sans aide]  2t/(t + 1)
    (Quand t → ±∞ :)
    = 2   ← Coefficients dominants
  — Cas a = 0 : x(t) = −t/(t + 1). Quand t → ±∞ :  [juge limit]  départ : −t/(t + 1)
    = −1   ← Coefficients dominants
  — Quand t → −1, y → ∞. Cas a = −1 :  [juge equiv]  départ : (−t² − t)/(t + 1)
    ? Quand t → ±∞ : y → 2 ; x → ∞ si a ≠ 0, et x → −1 si a = 0. Donc : ✔ a ≠ 0 : asymptote horizontale y = 2 ; a = 0 : pas de branche infinie, M(t) tend vers (−1 ; 2) / · asymptote horizontale y = 2 pour tout a / · a = 0 : asymptote verticale x = −1
    = −t   ← Factoriser −t(t + 1)
  — Cas a ≠ −1 : quand t → −1, x et y → ∞.  [juge equiv]  départ : (2t/(t + 1))/((a·t² − t)/(t + 1))
    ? Cas a = −1 : x(t) = −t → 1 et y → ∞ quand t → −1. La branche est : ✔ une asymptote verticale x = 1 / · une asymptote horizontale y = 1 / · une asymptote oblique
    ? Quand t → −1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = 2/(a·t − 1)   ← Simplifier par t(t + 1)/(t + 1)
  — m = lim y/x quand t → −1 :  [juge equiv]  départ : 2/(a·t − 1)
    = −2/(a + 1)   ← t = −1
  — y − mx =  [juge equiv]  départ : 2t/(t + 1) + (2/(a + 1))·(a·t² − t)/(t + 1)
    = 2a·t/(a + 1)   ← Même dénominateur, puis simplifier par t + 1
  — h = lim (y − mx) quand t → −1 :  [juge equiv]  départ : 2a·t/(a + 1)
    = −2a/(a + 1)   ← t = −1
  — Asymptote oblique (a ≠ −1) :  [juge equiv]  départ : mx + h
    = −2(x + a)/(a + 1)   ← y = mx + h
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

Γ : x(t) = (a·t² − t)/(t + 1), y(t) = 3t/(t + 1), avec a ∈ ℝ. Détermine, selon a, les branches infinies de Γ (en ±∞ et quand t → −1).
  [free, sans aide]  3t/(t + 1)
    (Quand t → ±∞ :)
    = 3   ← Coefficients dominants
  — Cas a = 0 : x(t) = −t/(t + 1). Quand t → ±∞ :  [juge limit]  départ : −t/(t + 1)
    = −1   ← Coefficients dominants
  — Quand t → −1, y → ∞. Cas a = −1 :  [juge equiv]  départ : (−t² − t)/(t + 1)
    ? Quand t → ±∞ : y → 3 ; x → ∞ si a ≠ 0, et x → −1 si a = 0. Donc : ✔ a ≠ 0 : asymptote horizontale y = 3 ; a = 0 : pas de branche infinie, M(t) tend vers (−1 ; 3) / · asymptote horizontale y = 3 pour tout a / · a = 0 : asymptote verticale x = −1
    = −t   ← Factoriser −t(t + 1)
  — Cas a ≠ −1 : quand t → −1, x et y → ∞.  [juge equiv]  départ : (3t/(t + 1))/((a·t² − t)/(t + 1))
    ? Cas a = −1 : x(t) = −t → 1 et y → ∞ quand t → −1. La branche est : ✔ une asymptote verticale x = 1 / · une asymptote horizontale y = 1 / · une asymptote oblique
    ? Quand t → −1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = 3/(a·t − 1)   ← Simplifier par t(t + 1)/(t + 1)
  — m = lim y/x quand t → −1 :  [juge equiv]  départ : 3/(a·t − 1)
    = −3/(a + 1)   ← t = −1
  — y − mx =  [juge equiv]  départ : 3t/(t + 1) + (3/(a + 1))·(a·t² − t)/(t + 1)
    = 3a·t/(a + 1)   ← Même dénominateur, puis simplifier par t + 1
  — h = lim (y − mx) quand t → −1 :  [juge equiv]  départ : 3a·t/(a + 1)
    = −3a/(a + 1)   ← t = −1
  — Asymptote oblique (a ≠ −1) :  [juge equiv]  départ : mx + h
    = −3(x + a)/(a + 1)   ← y = mx + h
  pièges : g6_param_ratio_inverted, g6_oblique_h_forgot

```

### Variantes d'examen

```
Γ : x(t) = (t² + 1)/(t − 1), y(t) = (t)/(t − 1). Quand t → 1, Γ a :
  · l'asymptote verticale x = 2   · l'asymptote oblique y = 2x [g6_param_ratio_inverted]   ✔ l'asymptote oblique y = (1/2)x   · une branche parabolique
  [examen mcq]
  pièges : g6_param_ratio_inverted

Γ : x(t) = (a·t² − t)/(t + 1), y(t) = t/(t + 1), avec a ∈ ℝ. Détermine, selon a, les branches infinies de Γ (en ±∞ et quand t → −1).
  [free, sans aide, examen open]  t/(t + 1)
    (Quand t → ±∞ :)
    = 1   ← Coefficients dominants
  — Cas a = 0 : x(t) = −t/(t + 1). Quand t → ±∞ :  [juge limit]  départ : −t/(t + 1)
    = −1   ← Coefficients dominants
  — Quand t → −1, y → ∞. Cas a = −1 :  [juge equiv]  départ : (−t² − t)/(t + 1)
    ? Quand t → ±∞ : y → 1 ; x → ∞ si a ≠ 0, et x → −1 si a = 0. Donc : ✔ a ≠ 0 : asymptote horizontale y = 1 ; a = 0 : pas de branche infinie, M(t) tend vers (−1 ; 1) / · asymptote horizontale y = 1 pour tout a / · a = 0 : asymptote verticale x = −1
    = −t   ← Factoriser −t(t + 1)
  — Cas a ≠ −1 : quand t → −1, x et y → ∞.  [juge equiv]  départ : (t/(t + 1))/((a·t² − t)/(t + 1))
    ? Cas a = −1 : x(t) = −t → 1 et y → ∞ quand t → −1. La branche est : ✔ une asymptote verticale x = 1 / · une asymptote horizontale y = 1 / · une asymptote oblique
    ? Quand t → −1, x et y tendent vers l'infini. On calcule : ✔ m = lim y/x, puis h = lim (y − mx) / · m = lim x/y, puis h = lim (y − mx) / · rien : c'est une asymptote verticale
    = 1/(a·t − 1)   ← Simplifier par t(t + 1)/(t + 1)
  — m = lim y/x quand t → −1 :  [juge equiv]  départ : 1/(a·t − 1)
    = −1/(a + 1)   ← t = −1
  — y − mx =  [juge equiv]  départ : t/(t + 1) + (1/(a + 1))·(a·t² − t)/(t + 1)
    = 1a·t/(a + 1)   ← Même dénominateur, puis simplifier par t + 1
  — h = lim (y − mx) quand t → −1 :  [juge equiv]  départ : 1a·t/(a + 1)
    = −1a/(a + 1)   ← t = −1
  — Asymptote oblique (a ≠ −1) :  [juge equiv]  départ : mx + h
    = −1(x + a)/(a + 1)   ← y = mx + h
  pièges : a1_bh_quotient_rule, g6_param_ratio_inverted, g6_oblique_h_forgot

```

## Pièges de cette unité

- **Dérivée d'un produit prise comme produit des dérivées** (`g6_product_naive`, R) : (x²·sin(3x))′ = 2x·3cos(3x) au lieu de (x²·sin(3x))′ = 2x·sin(3x) + 3x²·cos(3x)
- **Règle de chaîne oubliée** (`g6_chain_forgot`, R) : (sin(3x))′ = cos(3x) au lieu de (sin(3x))′ = 3cos(3x)
- **Signe ou ordre faux dans la règle du quotient** (`g6_quotient_sign`, E) : ((2x+1)/(x²+1))′ = (2(x²+1) + (2x+1)·2x)/(x²+1)² au lieu de ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²
- **Dénominateur pas au carré dans la règle du quotient** (`g6_quotient_no_square`, E) : ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1) au lieu de ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²
- **Règle des puissances appliquée à une exponentielle** (`g6_power_rule_exp`, E) : (2ˣ)′ = x·2ˣ⁻¹ au lieu de (2ˣ)′ = 2ˣ·ln 2
- **Signe de la dérivée de cos (ou de sin)** (`g6_cos_sign`, E) : (cos x)′ = sin x au lieu de (cos x)′ = −sin x
- **Pente de la tangente laissée en fonction de x** (`g6_tangent_slope_function`, E) : y = f(2) + f′(x)(x − 2) au lieu de y = f(2) + f′(2)(x − 2)
- **∞ − ∞ pris pour 0** (`g6_infinity_minus_infinity`, E) : lim (√(x² + 4x) − x) = 0 au lieu de lim (√(x² + 4x) − x) = 2
- **√(x²) = x quand x → −∞** (`g6_sqrt_x2_abs`, E) : √(4x² + 1)/(x + 3) → 2 en −∞ au lieu de √(4x² + 1)/(x + 3) → −2 en −∞
- **Point critique pris pour un extremum** (`g6_critical_is_extremum`, E) : f′(0) = 0 pour x³, donc extremum en 0 au lieu de f′ ne change pas de signe en 0 : pas d'extremum
- **Zéro de f″ pris pour un point d'inflexion** (`g6_inflection_f2_zero`, E) : f″(0) = 0 pour x⁴, donc inflexion en 0 au lieu de f″ ne change pas de signe en 0 : pas d'inflexion
- **Racine de la dérivée gardée hors du domaine** (`g6_optim_outside_domain`, E) : x = 20/3 retenu pour la boîte 16 × 10 au lieu de x = 2 : 20/3 > 5 est hors du domaine
- **ln x au lieu de ln|x|** (`g6_ln_abs`, E) : ∫dx/x = ln x au lieu de ∫dx/x = ln|x|
- **Dériver au lieu d'intégrer une puissance** (`g6_antideriv_power_minus_one`, E) : ∫x³ dx = 3x² au lieu de ∫x³ dx = x⁴/4
- **Aire prise comme intégrale avec son signe** (`g6_area_signed`, E) : aire = ∫(bas − haut) = −32/3 au lieu de aire = 32/3
- **Dérivée de x·y prise comme x·y′ ou y′** (`g6_implicit_xy`, E) : (xy)′ = x·y′ au lieu de (xy)′ = y + x·y′
- **Facteur y′ oublié en dérivant une expression en y** (`g6_implicit_yprime_forgot`, E) : (y³)′ = 3y² au lieu de (y³)′ = 3y²·y′
- **Dérivée de |u| prise comme |u′|** (`g6_abs_derivative`, E) : (|x² − 4|)′ = |2x| au lieu de (|x² − 4|)′ = 2x si |x| > 2, −2x si |x| < 2
- **Cas limite d'un point anguleux oublié (dérivée latérale nulle)** (`g6_angular_boundary`, C) : a ∈ ]−∞ ; −2[ ∪ ]2 ; +∞[ au lieu de a ∈ ]−∞ ; −2[ ∪ [2 ; +∞[
- **Point anguleux non vu : une seule formule des deux côtés** (`g6_angular_not_seen`, E) : f′(2⁻) = 7 (formule de droite) au lieu de f′(2⁻) = −1
- **Asymptote oblique sans son ordonnée à l'origine h** (`g6_oblique_h_forgot`, E) : asymptote y = x au lieu de asymptote y = x + 2
- **Asymptote verticale à chaque zéro du dénominateur** (`g6_vertical_any_zero`, E) : x = 2 asymptote de (x² − 4)/(x − 2) au lieu de un trou en x = 2
- **Branche du mauvais côté de l'asymptote** (`g6_sketch_crosses_asymptote`, E) : f(x) − (x + 1) = 1/(x − 1) > 0 pour x > 1 : en dessous au lieu de au-dessus
- **Pente d'un arc paramétré prise comme ẋ/ẏ** (`g6_param_slope_inverted`, E) : pente ẋ/ẏ = 3 au lieu de pente ẏ/ẋ = 1/3
- **Pente d'une asymptote prise comme lim x/y** (`g6_param_ratio_inverted`, E) : m = lim x/y = 4/3 au lieu de m = lim y/x = 3/4
