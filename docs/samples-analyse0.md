# Exemples de questions — Analyse de base

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Règles de dérivation : produit, quotient, chaîne (`g6-deriv-rules`, Gymnase)

_(uv)′, (u/v)′ et (f∘g)′, une règle à la fois._

### Niveau 1

```
Dérive f(x) = (4x − 1)/(x² + 3).
  [guided]  ((4x − 1)/(x² + 3))′
    (C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = 4x − 1 et v = x² + 3.)
    = (□(x² + 3) − (4x − 1)·□)/(x² + 3)²   (trous : (4(x² + 3) − (4x − 1)·2x)/(x² + 3)²)   ← Règle du quotient, avec les dérivées usuelles
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = 4x − 1 et v = x² + 3. | = (□(x² + 3) − (4x − 1)·□)/(x² + 3)² | = (−4x² + 2x + 12)/(x² + 3)²
  pièges : g6_quotient_sign, g6_quotient_no_square

Dérive f(x) = x²/(x + 4).
  [guided]  (x²/(x + 4))′
    (C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = x² et v = x + 4.)
    = (□·(x + 4) − x²)/(x + 4)²   (trous : (2x·(x + 4) − x²)/(x + 4)²)   ← Règle du quotient, avec les dérivées usuelles
  aides : C'est un quotient : (u/v)′ = (u′v − uv′)/v², avec u = x² et v = x + 4. | = (□·(x + 4) − x²)/(x + 4)² | = (x² + 8x)/(x + 4)²
  pièges : g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = e^(3x + 3).
  [guided]  (e^(3x + 3))′
    (C'est une composée f(g(x)) avec g(x) = 3x + 3 : (f∘g)′ = f′(g)·g′.)
    = e^(3x + 3)·□   (trous : e^(3x + 3)·3)   ← Règle de chaîne, avec les dérivées usuelles
  aides : C'est une composée f(g(x)) avec g(x) = 3x + 3 : (f∘g)′ = f′(g)·g′. | = e^(3x + 3)·□ | = 3e^(3x + 3)
  pièges : g6_chain_forgot

```

### Niveau 2

```
Dérive f(x) = (x² + 1)·sin(2x).
  [guided]  ((x² + 1)·sin(2x))′
    ? Quelle règle d'abord ? ✔ Règle du produit / · Règle du quotient / · Règle de chaîne
    = □ + □   (trous : 2x·sin(2x) + (x² + 1)·2cos(2x))   ← Règle du produit, avec les dérivées usuelles
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x² + 1 et v = sin(2x). | = □·sin(2x) + (x² + 1)·□ | = 2x·sin(2x) + 2(x² + 1)·cos(2x)
  pièges : g6_product_naive, g6_chain_forgot

Dérive f(x) = (2x + 1)⁵.
  [guided]  ((2x + 1)⁵)′
    ? Quelle règle d'abord ? · Règle du produit / · Règle du quotient / ✔ Règle de chaîne
    = □(2x + 1)⁴·□   (trous : 5(2x + 1)⁴·2)   ← Règle de chaîne, avec les dérivées usuelles
    = 10(2x + 1)⁴   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = 2x + 1 : (f∘g)′ = f′(g)·g′. | = 5(2x + 1)⁴·□ | = 10(2x + 1)⁴
  pièges : g6_chain_forgot

Calcule f′(x) pour f(x) = (2x + 1)³.
  [guided]  ((2x + 1)³)′
    ? Quelle règle d'abord ? · Règle du produit / · Règle du quotient / ✔ Règle de chaîne
    = □(2x + 1)²·□   (trous : 3(2x + 1)²·2)   ← Règle de chaîne, avec les dérivées usuelles
    = 6(2x + 1)²   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = 2x + 1 : (f∘g)′ = f′(g)·g′. | = 3(2x + 1)²·□ | = 6(2x + 1)²
  pièges : g6_chain_forgot

```

### Niveau 3

```
Calcule f′(x) pour f(x) = cos(2x² + 1).
  [tap, suivre l'erreur, menu deriv]  (cos(2x² + 1))′
    = −sin(2x² + 1)·(2x² + 1)′   ← Règle de chaîne
    = −4x·sin(2x² + 1)   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = 2x² + 1 : (f∘g)′ = f′(g)·g′. | = −sin(2x² + 1)·□ | = −4x·sin(2x² + 1)
  pièges : g6_chain_forgot

Calcule f′(x) pour f(x) = cos(x²).
  [tap, suivre l'erreur, menu deriv]  (cos(x²))′
    = −sin(x²)·(x²)′   ← Règle de chaîne
    = −2x·sin(x²)   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = x² : (f∘g)′ = f′(g)·g′. | = −sin(x²)·□ | = −2x·sin(x²)
  pièges : g6_chain_forgot

Calcule f′(x) pour f(x) = (x − 1)·e^(3x).
  [tap, suivre l'erreur, menu deriv]  ((x − 1)·e^(3x))′
    = (x − 1)′·e^(3x) + (x − 1)·(e^(3x))′   ← Règle du produit
    = e^(3x) + (x − 1)·e^(3x)·(3x)′   ← Règle de chaîne, avec les dérivées usuelles
    = e^(3x) + 3(x − 1)·e^(3x)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x − 1 et v = e^(3x). | = e^(3x) + (x − 1)·□ | = e^(3x) + 3(x − 1)·e^(3x)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 4

```
Dérive f(x) = x·sin(2x² + 2).
  [free, suivre l'erreur]  (x·sin(2x² + 2))′
    = sin(2x² + 2) + x·(sin(2x² + 2))′   ← Règle du produit
    ? Quelle règle as-tu utilisée en premier ? → (uv)′ = u′v + uv′
    = sin(2x² + 2) + x·cos(2x² + 2)·(2x² + 2)′   ← Règle de chaîne
    = sin(2x² + 2) + 4x²·cos(2x² + 2)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = x et v = sin(2x² + 2). | = sin(2x² + 2) + x·□ | = sin(2x² + 2) + 4x²·cos(2x² + 2)
  pièges : g6_product_naive, g6_chain_forgot

Dérive f(x) = (x² + 1)⁴.
  [free, suivre l'erreur]  ((x² + 1)⁴)′
    = 4(x² + 1)³·(x² + 1)′   ← Règle de chaîne
    ? Quelle règle as-tu utilisée en premier ? → (f∘g)′ = f′(g)·g′
    = 8x·(x² + 1)³   ← Simplifier
  aides : C'est une composée f(g(x)) avec g(x) = x² + 1 : (f∘g)′ = f′(g)·g′. | = 4(x² + 1)³·□ | = 8x·(x² + 1)³
  pièges : g6_chain_forgot

Calcule f′(x) pour f(x) = e^(3x)·sin(3x).
  [free, suivre l'erreur]  (e^(3x)·sin(3x))′
    = (e^(3x))′·sin(3x) + e^(3x)·(sin(3x))′   ← Règle du produit
    ? Quelle règle as-tu utilisée en premier ? → (uv)′ = u′v + uv′
    = e^(3x)·(3x)′·sin(3x) + e^(3x)·cos(3x)·(3x)′   ← Règle de chaîne
    = 3e^(3x)·sin(3x) + 3e^(3x)·cos(3x)   ← Simplifier
  aides : C'est un produit : (uv)′ = u′v + uv′, avec u = e^(3x) et v = sin(3x). | = □·sin(3x) + e^(3x)·□ | = 3e^(3x)·sin(3x) + 3e^(3x)·cos(3x)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 5

```
Soit f(x) = (3x + 3)/(x² + 2). Dérive f, puis calcule f′(1).
  [free, sans aide]  ((3x + 3)/(x² + 2))′
    = ((3x + 3)′·(x² + 2) − (3x + 3)·(x² + 2)′)/(x² + 2)²   ← Règle du quotient
    = (−3x² − 6x + 6)/(x² + 2)²   ← Simplifier
  — Calcule maintenant f′(1).  [juge value]  départ : (−3·1² − 6·1 + 6)/(1² + 2)²
    = −1/3   ← f′(1) = −1/3
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = e^(3x)·cos(2x). Dérive f, puis calcule f′(0).
  [free, sans aide]  (e^(3x)·cos(2x))′
    = (e^(3x))′·cos(2x) + e^(3x)·(cos(2x))′   ← Règle du produit
    = e^(3x)·(3x)′·cos(2x) − e^(3x)·sin(2x)·(2x)′   ← Règle de chaîne
    = 3e^(3x)·cos(2x) − 2e^(3x)·sin(2x)   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : 3e^(3·0)·cos(2·0) − 2e^(3·0)·sin(2·0)
    = 3   ← f′(0) = 3
  pièges : g6_product_naive, g6_chain_forgot

Soit f(x) = e^(3x)/(x² + 2). Dérive f, puis calcule f′(0).
  [free, sans aide]  (e^(3x)/(x² + 2))′
    = ((e^(3x))′·(x² + 2) − e^(3x)·(x² + 2)′)/(x² + 2)²   ← Règle du quotient
    = (e^(3x)·(3x)′·(x² + 2) − 2x·e^(3x))/(x² + 2)²   ← Règle de chaîne, avec les dérivées usuelles
    = (3e^(3x)·(x² + 2) − 2x·e^(3x))/(x² + 2)²   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : (3e^(3·0)·(0² + 2) − 2·0e^(3·0))/(0² + 2)²
    = 3/2   ← f′(0) = 3/2
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

```

### Variantes d'examen

```
Quelle est la dérivée de f(x) = cos(x²) ?
  · −sin(x²) [g6_chain_forgot]   ✔ −2x·sin(x²)   · 2x·cos(x²)   · 2x·sin(x²)
  [examen mcq]
  pièges : g6_chain_forgot

Vrai ou faux ? ((3x + 1)·e^(4x))′ = 12e^(4x)
  · Vrai [g6_product_naive]   ✔ Faux
  [examen tf]
  pièges : g6_product_naive

Soit f(x) = x²/(x + 3). Dérive f, puis calcule f′(0).
  [free, sans aide, examen coef]  (x²/(x + 3))′
    = ((x²)′·(x + 3) − x²·(x + 3)′)/(x + 3)²   ← Règle du quotient
    = (x² + 6x)/(x + 3)²   ← Simplifier
  — Calcule maintenant f′(0).  [juge value]  départ : (0² + 6·0)/(0 + 3)²
    = 0   ← f′(0) = 0
  pièges : g6_quotient_sign, g6_quotient_no_square

Dérive f(x) = √(x² + 2).
  [free, sans aide, examen open]  (√(x² + 2))′
    = 1/(2√(x² + 2))·(x² + 2)′   ← Règle de chaîne
    = x/√(x² + 2)   ← Simplifier
  pièges : g6_chain_forgot

```

## Pièges de cette unité

- **Dérivée d'un produit prise comme produit des dérivées** (`g6_product_naive`, R) : (x²·sin(3x))′ = 2x·3cos(3x) au lieu de (x²·sin(3x))′ = 2x·sin(3x) + 3x²·cos(3x)
- **Règle de chaîne oubliée** (`g6_chain_forgot`, R) : (sin(3x))′ = cos(3x) au lieu de (sin(3x))′ = 3cos(3x)
- **Signe ou ordre faux dans la règle du quotient** (`g6_quotient_sign`, E) : ((2x+1)/(x²+1))′ = (2(x²+1) + (2x+1)·2x)/(x²+1)² au lieu de ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²
- **Dénominateur pas au carré dans la règle du quotient** (`g6_quotient_no_square`, E) : ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1) au lieu de ((2x+1)/(x²+1))′ = (2(x²+1) − (2x+1)·2x)/(x²+1)²
