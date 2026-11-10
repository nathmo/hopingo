# Exemples de questions — Analyse I

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Dérivée par la définition ; dérivées à gauche et à droite (`a1-deriv-def`, BA1)

_f′(x₀) = lim (f(x₀ + h) − f(x₀))/h, et les deux côtés aux raccords._

### Niveau 1

```
Soit f(x) = |x|·x². Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  (|h|·h²)/h
    = □·h   (trous : |h|·h)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □·h | |h|·h, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule

Soit f(x) = x·|x|. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  (h·|h|)/h
    = □   (trous : |h|)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □ | |h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule

Soit f(x) = 3x + x³·sin(1/x) si x ≠ 0, et f(0) = 0. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  (3h + h³·sin(1/h))/h
    = 3 + □·sin(1/h)   (trous : 3 + h²·sin(1/h))   ← Simplifier par h
    = 3   ← Gendarmes : |h²·sin(1/h)| ≤ h² → 0
  aides : Écris (f(0 + h) − f(0))/h, simplifie par h, puis encadre la partie bornée. | = 3 + □·sin(1/h) | 3 + h²·sin(1/h), puis 3 : f′(0) = 3
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule

```

### Niveau 2

```
Soit f(x) = |x|·x². Calcule f′(0) par la définition.
  [guided]  (|h|·h²)/h
    ? Comment trouver la limite du taux ? · Simplifier, puis gendarmes : la partie bornée est multipliée par une quantité qui tend vers 0 / ✔ Simplifier par h (ou un équivalent), puis passer à la limite / · 0 × (borné) est une forme indéterminée : la limite n'existe pas / · Dériver la formule de f, puis remplacer x par 0
    = □   (trous : |h|·h)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □·h | |h|·h, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule, a1_bounded_times_zero, a1_derivable_from_formula

Soit f(x) = |x|³. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  |h|³/h
    ? Comment trouver la limite du taux ? · Simplifier, puis gendarmes : la partie bornée est multipliée par une quantité qui tend vers 0 / ✔ Simplifier par h (ou un équivalent), puis passer à la limite / · 0 × (borné) est une forme indéterminée : la limite n'existe pas / · Dériver la formule de f, puis remplacer x par 0
    = □   (trous : h·|h|)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = h·□ | h·|h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule, a1_bounded_times_zero, a1_derivable_from_formula

Soit f(x) = x + x²·cos(1/x) si x ≠ 0, et f(0) = 0. Calcule f′(0) par la définition.
  [guided]  (h + h²·cos(1/h))/h
    ? Comment trouver la limite du taux ? ✔ Simplifier, puis gendarmes : la partie bornée est multipliée par une quantité qui tend vers 0 / · Simplifier par h (ou un équivalent), puis passer à la limite / · 0 × (borné) est une forme indéterminée : la limite n'existe pas / · Dériver la formule de f, puis remplacer x par 0
    = 1 + □   (trous : 1 + h·cos(1/h))   ← Simplifier par h
    = 1   ← Gendarmes : |h·cos(1/h)| ≤ |h| → 0
  aides : Écris (f(0 + h) − f(0))/h, simplifie par h, puis encadre la partie bornée. | = 1 + □·cos(1/h) | 1 + h·cos(1/h), puis 1 : f′(0) = 1
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_bounded_times_zero, a1_derivable_from_formula

```

### Niveau 3

```
Soit f(x) = x²·sin(1/x) si x ≠ 0, et f(0) = 0. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [tap, suivre l'erreur, menu steps]  (h²·sin(1/h))/h
    = h·sin(1/h)   ← Simplifier par h
    = 0   ← Gendarmes : |h·sin(1/h)| ≤ |h| → 0
  aides : Écris (f(0 + h) − f(0))/h, simplifie par h, puis encadre la partie bornée. | = □·sin(1/h) | h·sin(1/h), puis 0 : f′(0) = 0
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule

Soit f(x) = x·|x|. Calcule f′(0) par la définition.
  [tap, suivre l'erreur, menu steps]  (h·|h|)/h
    = |h|   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □ | |h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule

Soit f(x) = e^x − 1 si x ≥ 0, et −x − 3x² si x < 0. Calcule les dérivées à droite et à gauche de f en 0 par la définition, puis conclus.
  [tap, suivre l'erreur, menu steps]  (e^h − 1)/h
    = 1   ← eᵘ − 1 ~ u avec u = h
  — Dérivée à gauche : h < 0, avec le morceau de gauche.  [juge limit]  départ : (−h − 3h²)/h
    = −1 − 3h   ← Simplifier par h
    = −1   ← h → 0
  — Conclusion.  [juge value]  départ : f′(0⁺) − f′(0⁻)
    ? f est-elle dérivable en 0 ? · Oui : les deux dérivées latérales valent 1 / ✔ Non : les dérivées à gauche et à droite sont différentes / · Oui, et f′(0) = 0, la moyenne des deux pentes
    = 2   ← f′(0⁺) − f′(0⁻) = 2 ≠ 0 : point anguleux
  aides : Deux formules : calcule la dérivée à droite (h > 0) avec le morceau de droite, puis la dérivée à gauche (h < 0) avec celui de gauche. | f′(0⁺) = lim (e^h − 1)/h = 1… | f′(0⁺) = 1, f′(0⁻) = −1 : pas dérivable en 0.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_corner_missed

```

### Niveau 4

```
Soit f(x) = |x|³. Calcule f′(0) par la définition.
  [free, suivre l'erreur]  |h|³/h
    = h·|h|   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = h·□ | h·|h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule

Soit f(x) = x·|x|. Calcule f′(0) par la définition.
  [free, suivre l'erreur]  (h·|h|)/h
    = |h|   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □ | |h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule

Soit f(x) = 3x + x·|x|. Calcule f′(0) par la définition.
  [free, suivre l'erreur]  (3h + h·|h|)/h
    = 3 + |h|   ← Simplifier par h
    = 3   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = 3 + □ | 3 + |h|, puis 3 : f′(0) = 3
  pièges : a1_bh_quotient_rule

```

### Niveau 5

```
Soit f(x) = x³·sin(1/x) si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?
  · f n'est pas continue en 0, car sin(1/x) n'a pas de limite en 0 [a1_bounded_times_zero]   · f est dérivable en 0, mais f′ n'est pas continue en 0   · f n'est pas dérivable en 0, car la formule f′(x) = 3x²·sin(1/x) − x·cos(1/x) n'a pas de sens en 0 [a1_derivable_from_formula]   ✔ f est de classe C¹ sur ℝ et f′(0) = 0
  pièges : a1_derivable_from_formula, a1_bounded_times_zero

Soit f(x) = x·sin(e^(1/x) − 1) si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?
  · f est dérivable à droite en 0, mais pas à gauche   · f est dérivable en 0 [a1_corner_missed]   ✔ f est dérivable à gauche en 0, mais pas à droite   · f n'est dérivable ni à gauche ni à droite en 0 [a1_derivable_from_formula]
  pièges : a1_corner_missed, a1_derivable_from_formula

Soit f(x) = x·cos(1/x) si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?
  · f n'est pas continue en 0, car cos(1/x) n'a pas de limite en 0 [a1_bounded_times_zero]   · f est dérivable en 0 et f′(0) = 0   · f est dérivable à droite en 0 seulement   ✔ f est continue en 0, mais pas dérivable en 0
  pièges : a1_bounded_times_zero

```

### Variantes d'examen

```
Soit f(x) = x·sin(1/x) si x ≠ 0, et f(0) = 0. Que peut-on dire de f en 0 ?
  · f n'est pas continue en 0, car sin(1/x) n'a pas de limite en 0 [a1_bounded_times_zero]   ✔ f est continue en 0, mais pas dérivable en 0   · f est dérivable à droite en 0 seulement   · f est dérivable en 0 et f′(0) = 0
  [examen mcq]
  pièges : a1_bounded_times_zero

Vrai ou faux ? « g(x) = ∫₀^|x| 1 dt est dérivable en 0. »
  · Vrai [a1_corner_missed]   ✔ Faux
  [examen tf]
  pièges : a1_corner_missed

```

## Dériver au niveau BA1 : produits, quotients, compositions, fonctions arc et hyperboliques (`a1-deriv-rules`, BA1)

_Les règles, avec Arctg, Arcsin, sinh, cosh, Argsh._

### Niveau 1

```
Dérive f(x) = sinh(3x)/(x + 1) sur ]0 ; 1[.
  [guided]  (sinh(3x)/(x + 1))′
    (Règle du quotient : u = sinh(3x), v = x + 1, u′ = 3cosh(3x), v′ = 1.)
    = ((□)·(x + 1) − sinh(3x))/(x + 1)²   (trous : ((3cosh(3x))·(x + 1) − sinh(3x))/(x + 1)²)   ← Règle du quotient
  aides : Quotient : (u/v)′ = (u′v − uv′)/v², avec u = sinh(3x) et v = x + 1. | = ((□)·(x + 1) − sinh(3x))/(x + 1)² | = (3cosh(3x)·(x + 1) − sinh(3x))/(x + 1)²
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = cosh(3x)/(x² + 2), x ∈ ]0 ; 1[.
  [guided]  (cosh(3x)/(x² + 2))′
    (Règle du quotient : u = cosh(3x), v = x² + 2, u′ = 3sinh(3x), v′ = 2x.)
    = ((□)·(x² + 2) − 2x·cosh(3x))/(x² + 2)²   (trous : ((3sinh(3x))·(x² + 2) − 2x·cosh(3x))/(x² + 2)²)   ← Règle du quotient
  aides : Quotient : (u/v)′ = (u′v − uv′)/v², avec u = cosh(3x) et v = x² + 2. | = ((□)·(x² + 2) − 2x·cosh(3x))/(x² + 2)² | = (3sinh(3x)·(x² + 2) − 2x·cosh(3x))/(x² + 2)²
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = sin(2x)·sinh(x²), x ∈ ]0 ; 1[.
  [guided]  (sin(2x)·sinh(x²))′
    (Règle du produit : u = sin(2x), v = sinh(x²), u′ = 2cos(2x), v′ = 2x·cosh(x²).)
    = (□)·sinh(x²) + sin(2x)·(□)   (trous : (2cos(2x))·sinh(x²) + sin(2x)·(2x·cosh(x²)))   ← Règle du produit
  aides : Produit de deux facteurs : (uv)′ = u′v + uv′, avec u = sin(2x) et v = sinh(x²). | = (□)·sinh(x²) + sin(2x)·(□) | = 2cos(2x)·sinh(x²) + 2x·sin(2x)·cosh(x²)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 2

```
Dérive f(x) = cosh(2x)/(x + 1) sur ]0 ; 1[.
  [guided]  (cosh(2x)/(x + 1))′
    ? Quelle règle d'abord ? · Règle du produit / ✔ Règle du quotient / · Règle de chaîne
    (u = cosh(2x), v = x + 1.)
    = ((□)·(x + 1) − cosh(2x))/(x + 1)²   (trous : ((2sinh(2x))·(x + 1) − cosh(2x))/(x + 1)²)   ← Règle du quotient
  aides : Quotient : (u/v)′ = (u′v − uv′)/v², avec u = cosh(2x) et v = x + 1. | = ((□)·(x + 1) − cosh(2x))/(x + 1)² | = (2sinh(2x)·(x + 1) − cosh(2x))/(x + 1)²
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square, g2_hyp_trig_sign

Calcule f′(x) pour f(x) = cosh(3x)/(x² + 1), x ∈ ]0 ; 1[.
  [guided]  (cosh(3x)/(x² + 1))′
    ? Quelle règle d'abord ? · Règle du produit / ✔ Règle du quotient / · Règle de chaîne
    (u = cosh(3x), v = x² + 1.)
    = ((□)·(x² + 1) − 2x·cosh(3x))/(x² + 1)²   (trous : ((3sinh(3x))·(x² + 1) − 2x·cosh(3x))/(x² + 1)²)   ← Règle du quotient
  aides : Quotient : (u/v)′ = (u′v − uv′)/v², avec u = cosh(3x) et v = x² + 1. | = ((□)·(x² + 1) − 2x·cosh(3x))/(x² + 1)² | = (3sinh(3x)·(x² + 1) − 2x·cosh(3x))/(x² + 1)²
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

Calcule f′(x) pour f(x) = x³·sinh(3x), x ∈ ]0 ; 1[.
  [guided]  (x³·sinh(3x))′
    ? Quelle règle d'abord ? ✔ Règle du produit / · Règle du quotient / · Règle de chaîne
    (u = sinh(3x), v = x³.)
    = (□)·x³ + sinh(3x)·(□)   (trous : (3cosh(3x))·x³ + sinh(3x)·(3x²))   ← Règle du produit
  aides : Produit de deux facteurs : (uv)′ = u′v + uv′, avec u = sinh(3x) et v = x³. | = (□)·x³ + sinh(3x)·(□) | = 3x³·cosh(3x) + 3x²·sinh(3x)
  pièges : g6_product_naive, g6_chain_forgot

```

### Niveau 3

```
Dérive f(x) = Arcsin(x/2)·e^(√x) sur ]0 ; 1[.
  [tap, suivre l'erreur, menu deriv]  (Arcsin(x/2)·e^(√x))′
    = (Arcsin(x/2))′·e^(√x) + Arcsin(x/2)·(e^(√x))′   ← Règle du produit
    ? Quelle règle as-tu utilisée en premier ? → (uv)′ = u′v + uv′
    = e^(√x)/(2√(1 − x²/4)) + Arcsin(x/2)·e^(√x)/(2√x)   ← Assembler
  aides : Produit de deux facteurs : (uv)′ = u′v + uv′, avec u = Arcsin(x/2) et v = e^(√x). | = (□)·e^(√x) + Arcsin(x/2)·(□) | = e^(√x)/(2√(1 − x²/4)) + Arcsin(x/2)·e^(√x)/(2√x)
  pièges : g6_product_naive, g6_chain_forgot, a1_arc_deriv_table

Calcule f′(x) pour f(x) = argsh(e^(3x)), x ∈ ]0 ; 1[.
  [tap, suivre l'erreur, menu deriv]  (argsh(e^(3x)))′
    = 1/√((e^(3x))² + 1)·(e^(3x))′   ← Règle de chaîne
    ? Quelle règle as-tu utilisée en premier ? → (f∘g)′ = f′(g)·g′
    = 3e^(3x)/√(e^(6x) + 1)   ← Assembler
  aides : Composée : (f∘g)′ = f′(g)·g′. Arctg′ = 1/(1 + x²), Arcsin′ = 1/√(1 − x²), Argsh′ = 1/√(1 + x²), sinh′ = cosh. | = (1/√(e^(6x) + 1))·(□) | = 3e^(3x)/√(e^(6x) + 1)
  pièges : g6_chain_forgot, a1_arc_deriv_table

Dérive f(x) = Arctg(e^(2x)) sur ]0 ; 1[.
  [tap, suivre l'erreur, menu deriv]  (Arctg(e^(2x)))′
    = 1/(1 + (e^(2x))²)·(e^(2x))′   ← Règle de chaîne
    ? Quelle règle as-tu utilisée en premier ? → (f∘g)′ = f′(g)·g′
    = 2e^(2x)/(1 + e^(4x))   ← Assembler
  aides : Composée : (f∘g)′ = f′(g)·g′. Arctg′ = 1/(1 + x²), Arcsin′ = 1/√(1 − x²), Argsh′ = 1/√(1 + x²), sinh′ = cosh. | = (1/(1 + e^(4x)))·(□) | = 2e^(2x)/(1 + e^(4x))
  pièges : g6_chain_forgot, a1_arc_deriv_table

```

### Niveau 4

```
Dérive f(x) = cosh(2x)/(x² + 1) sur ]0 ; 1[.
  [free, suivre l'erreur]  (cosh(2x)/(x² + 1))′
    = ((cosh(2x))′·(x² + 1) − cosh(2x)·(x² + 1)′)/(x² + 1)²   ← Règle du quotient
    = (2sinh(2x)·(x² + 1) − 2x·cosh(2x))/(x² + 1)²   ← Assembler
  aides : Quotient : (u/v)′ = (u′v − uv′)/v², avec u = cosh(2x) et v = x² + 1. | = ((□)·(x² + 1) − 2x·cosh(2x))/(x² + 1)² | = (2sinh(2x)·(x² + 1) − 2x·cosh(2x))/(x² + 1)²
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square, g2_hyp_trig_sign

Calcule f′(x) pour f(x) = Arctg(e^(2x)), x ∈ ]0 ; 1[.
  [free, suivre l'erreur]  (Arctg(e^(2x)))′
    = 1/(1 + (e^(2x))²)·(e^(2x))′   ← Règle de chaîne
    = 2e^(2x)/(1 + e^(4x))   ← Assembler
  aides : Composée : (f∘g)′ = f′(g)·g′. Arctg′ = 1/(1 + x²), Arcsin′ = 1/√(1 − x²), Argsh′ = 1/√(1 + x²), sinh′ = cosh. | = (1/(1 + e^(4x)))·(□) | = 2e^(2x)/(1 + e^(4x))
  pièges : g6_chain_forgot, a1_arc_deriv_table

Dérive f(x) = Arcsin(√x)·e^x sur ]0 ; 1[.
  [free, suivre l'erreur]  (Arcsin(√x)·e^x)′
    = (Arcsin(√x))′·e^x + Arcsin(√x)·(e^x)′   ← Règle du produit
    = e^x/(2√(1 − x)·√x) + Arcsin(√x)·e^x   ← Assembler
  aides : Produit de deux facteurs : (uv)′ = u′v + uv′, avec u = Arcsin(√x) et v = e^x. | = (□)·e^x + Arcsin(√x)·(□) | = e^x/(2√(1 − x)·√x) + Arcsin(√x)·e^x
  pièges : g6_product_naive, g6_chain_forgot, a1_arc_deriv_table

```

### Niveau 5

```
Soit f(x) = e^(2x)·Arcsin(x²). Dérive f, puis calcule f′(0).
  [free, sans aide]  (e^(2x)·Arcsin(x²))′
    = (e^(2x))′·Arcsin(x²) + e^(2x)·(Arcsin(x²))′   ← Règle du produit
    = 2e^(2x)·Arcsin(x²) + 2x·e^(2x)/√(1 − x⁴)   ← Assembler
  — Calcule maintenant f′(0).  [juge value]  départ : 2e^(2(0))·Arcsin((0)²) + 2(0)·e^(2(0))/√(1 − (0)⁴)
    = 0   ← f′(0) = 0
  pièges : g6_product_naive, g6_chain_forgot, a1_arc_deriv_table

Soit f(x) = Arctg(2x). Dérive f, puis calcule f′(0).
  [free, sans aide]  (Arctg(2x))′
    = 1/(1 + (2x)²)·(2x)′   ← Règle de chaîne
    = 2/(1 + 4x²)   ← Assembler
  — Calcule maintenant f′(0).  [juge value]  départ : 2/(1 + 4(0)²)
    = 2   ← f′(0) = 2
  pièges : g6_chain_forgot, a1_arc_deriv_table

Soit f(x) = sinh(3x)/(x + 1). Dérive f, puis calcule f′(0).
  [free, sans aide]  (sinh(3x)/(x + 1))′
    = ((sinh(3x))′·(x + 1) − sinh(3x)·(x + 1)′)/(x + 1)²   ← Règle du quotient
    = (3cosh(3x)·(x + 1) − sinh(3x))/(x + 1)²   ← Assembler
  — Calcule maintenant f′(0).  [juge value]  départ : (3cosh(3(0))·((0) + 1) − sinh(3(0)))/((0) + 1)²
    = 3   ← f′(0) = 3
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

```

### Variantes d'examen

```
Quelle est la dérivée de f(x) = sinh(√x) sur ]0 ; 1[ ?
  · cosh(√x)/√x   ✔ cosh(√x)/(2√x)   · cosh(√x) [g6_chain_forgot]   · −cosh(√x)/(2√x)
  [examen mcq]
  pièges : g6_chain_forgot

Vrai ou faux ? « (Arctg x)′ = 1/√(1 − x²) pour |x| < 1. »
  · Vrai [a1_arc_deriv_table]   ✔ Faux
  [examen tf]
  pièges : a1_arc_deriv_table

```

## Dérivée d'une fonction réciproque en un point (`a1-deriv-inverse`, BA1)

_(f⁻¹)′(y₀) = 1/f′(x₀), avec f(x₀) = y₀._

### Niveau 1

```
Soit f(x) = e^x + 3x, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(1).
  [guided]  x_0
    (f(0) = 1.)
    = 0   ← f(0) = 1
  — Dérive f.  [juge equiv]  départ : (e^x + 3x)′
    = e^x + 3   ← Dériver f
  — Évalue f′ en x₀ = 0.  [juge value]  départ : f′(0)
    = e^(□) + 3   (trous : e^(0) + 3)   ← Remplacer x par x₀
    = 4   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(1)
    = 1/4   ← (f⁻¹)′(1) = 1/f′(0)
  aides : Cherche le x₀ dont l'image est 1 : c'est là qu'on dérive f. | (f⁻¹)′(1) = 1/f′(□) | (f⁻¹)′(1) = 1/f′(0) = 1/4

Soit f(x) = e^x + 3x, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(1).
  [guided]  x_0
    (f(0) = 1.)
    = 0   ← f(0) = 1
  — Dérive f.  [juge equiv]  départ : (e^x + 3x)′
    = e^x + 3   ← Dériver f
  — Évalue f′ en x₀ = 0.  [juge value]  départ : f′(0)
    = e^(□) + 3   (trous : e^(0) + 3)   ← Remplacer x par x₀
    = 4   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(1)
    = 1/4   ← (f⁻¹)′(1) = 1/f′(0)
  aides : Cherche le x₀ dont l'image est 1 : c'est là qu'on dérive f. | (f⁻¹)′(1) = 1/f′(□) | (f⁻¹)′(1) = 1/f′(0) = 1/4

Soit f(x) = e^x + x, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(1).
  [guided]  x_0
    (f(0) = 1.)
    = 0   ← f(0) = 1
  — Dérive f.  [juge equiv]  départ : (e^x + x)′
    = e^x + 1   ← Dériver f
  — Évalue f′ en x₀ = 0.  [juge value]  départ : f′(0)
    = e^(□) + 1   (trous : e^(0) + 1)   ← Remplacer x par x₀
    = 2   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(1)
    = 1/2   ← (f⁻¹)′(1) = 1/f′(0)
  aides : Cherche le x₀ dont l'image est 1 : c'est là qu'on dérive f. | (f⁻¹)′(1) = 1/f′(□) | (f⁻¹)′(1) = 1/f′(0) = 1/2

```

### Niveau 2

```
f(x) = x³ + x + 2 est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en 4.
  [guided]  x_0
    ? Quel x₀ vérifie f(x₀) = 4 ? ✔ x₀ = 1 / · x₀ = 4 / · x₀ = 0
    = 1   ← f(1) = 4
  — Dérive f.  [juge equiv]  départ : (x³ + x + 2)′
    = 3x² + 1   ← Dériver f
  — Évalue f′ en x₀ = 1.  [juge value]  départ : f′(1)
    = 3·(1)² + 1   ← Remplacer x par x₀
    = 4   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(4)
    = 1/4   ← (f⁻¹)′(4) = 1/f′(1)
  aides : Cherche le x₀ dont l'image est 4 : c'est là qu'on dérive f. | (f⁻¹)′(4) = 1/f′(□) | (f⁻¹)′(4) = 1/f′(1) = 1/4
  pièges : a1_inverse_deriv_wrong_point

f(x) = e^x + 2x est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en 1.
  [guided]  x_0
    ? Quel x₀ vérifie f(x₀) = 1 ? ✔ x₀ = 0 / · x₀ = 1
    = 0   ← f(0) = 1
  — Dérive f.  [juge equiv]  départ : (e^x + 2x)′
    = e^x + 2   ← Dériver f
  — Évalue f′ en x₀ = 0.  [juge value]  départ : f′(0)
    = e^(0) + 2   ← Remplacer x par x₀
    = 3   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(1)
    = 1/3   ← (f⁻¹)′(1) = 1/f′(0)
  aides : Cherche le x₀ dont l'image est 1 : c'est là qu'on dérive f. | (f⁻¹)′(1) = 1/f′(□) | (f⁻¹)′(1) = 1/f′(0) = 1/3
  pièges : a1_inverse_deriv_wrong_point

Soit f(x) = x³ + 2x − 4, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(−16).
  [guided]  x_0
    ? Quel x₀ vérifie f(x₀) = −16 ? ✔ x₀ = −2 / · x₀ = −16 / · x₀ = 0
    = −2   ← f(−2) = −16
  — Dérive f.  [juge equiv]  départ : (x³ + 2x − 4)′
    = 3x² + 2   ← Dériver f
  — Évalue f′ en x₀ = −2.  [juge value]  départ : f′(−2)
    = 3·(−2)² + 2   ← Remplacer x par x₀
    = 14   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(−16)
    = 1/14   ← (f⁻¹)′(−16) = 1/f′(−2)
  aides : Cherche le x₀ dont l'image est −16 : c'est là qu'on dérive f. | (f⁻¹)′(−16) = 1/f′(□) | (f⁻¹)′(−16) = 1/f′(−2) = 1/14
  pièges : a1_inverse_deriv_wrong_point

```

### Niveau 3

```
f(x) = 4x + cos(x) est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en 2π.
  [tap, suivre l'erreur, menu steps]  x_0
    = π/2   ← f(π/2) = 2π
  — Dérive f.  [juge equiv]  départ : (4x + cos(x))′
    = 4 − sin(x)   ← Dériver f
  — Évalue f′ en x₀ = π/2.  [juge value]  départ : f′(π/2)
    = 4 − sin(π/2)   ← Remplacer x par x₀
    = 3   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(2π)
    = 1/3   ← (f⁻¹)′(2π) = 1/f′(π/2)
  aides : Cherche le x₀ dont l'image est 2π : c'est là qu'on dérive f. | (f⁻¹)′(2π) = 1/f′(□) | (f⁻¹)′(2π) = 1/f′(π/2) = 1/3

f(x) = x³ + x est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en −2.
  [tap, suivre l'erreur, menu steps]  x_0
    = −1   ← f(−1) = −2
  — Dérive f.  [juge equiv]  départ : (x³ + x)′
    = 3x² + 1   ← Dériver f
  — Évalue f′ en x₀ = −1.  [juge value]  départ : f′(−1)
    = 3·(−1)² + 1   ← Remplacer x par x₀
    = 4   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(−2)
    = 1/4   ← (f⁻¹)′(−2) = 1/f′(−1)
  aides : Cherche le x₀ dont l'image est −2 : c'est là qu'on dérive f. | (f⁻¹)′(−2) = 1/f′(□) | (f⁻¹)′(−2) = 1/f′(−1) = 1/4

Soit f(x) = x³ + x − 4, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(6).
  [tap, suivre l'erreur, menu steps]  x_0
    = 2   ← f(2) = 6
  — Dérive f.  [juge equiv]  départ : (x³ + x − 4)′
    = 3x² + 1   ← Dériver f
  — Évalue f′ en x₀ = 2.  [juge value]  départ : f′(2)
    = 3·(2)² + 1   ← Remplacer x par x₀
    = 13   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(6)
    = 1/13   ← (f⁻¹)′(6) = 1/f′(2)
  aides : Cherche le x₀ dont l'image est 6 : c'est là qu'on dérive f. | (f⁻¹)′(6) = 1/f′(□) | (f⁻¹)′(6) = 1/f′(2) = 1/13

```

### Niveau 4

```
f(x) = e^x + 2x est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en 1.
  [free, suivre l'erreur]  x_0
    = 0   ← f(0) = 1
  — Dérive f.  [juge equiv]  départ : (e^x + 2x)′
    = e^x + 2   ← Dériver f
  — Évalue f′ en x₀ = 0.  [juge value]  départ : f′(0)
    = e^(0) + 2   ← Remplacer x par x₀
    = 3   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(1)
    = 1/3   ← (f⁻¹)′(1) = 1/f′(0)
  aides : Cherche le x₀ dont l'image est 1 : c'est là qu'on dérive f. | (f⁻¹)′(1) = 1/f′(□) | (f⁻¹)′(1) = 1/f′(0) = 1/3

Soit f(x) = x³ + 5x − 5, bijective de ℝ dans ℝ. Calcule (f⁻¹)′(−11).
  [free, suivre l'erreur]  x_0
    = −1   ← f(−1) = −11
  — Dérive f.  [juge equiv]  départ : (x³ + 5x − 5)′
    = 3x² + 5   ← Dériver f
  — Évalue f′ en x₀ = −1.  [juge value]  départ : f′(−1)
    = 3·(−1)² + 5   ← Remplacer x par x₀
    = 8   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(−11)
    = 1/8   ← (f⁻¹)′(−11) = 1/f′(−1)
  aides : Cherche le x₀ dont l'image est −11 : c'est là qu'on dérive f. | (f⁻¹)′(−11) = 1/f′(□) | (f⁻¹)′(−11) = 1/f′(−1) = 1/8

f(x) = 3x + cos(x) est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en 3π/2.
  [free, suivre l'erreur]  x_0
    = π/2   ← f(π/2) = 3π/2
  — Dérive f.  [juge equiv]  départ : (3x + cos(x))′
    = 3 − sin(x)   ← Dériver f
  — Évalue f′ en x₀ = π/2.  [juge value]  départ : f′(π/2)
    = 3 − sin(π/2)   ← Remplacer x par x₀
    = 2   ← Calculer
  — Conclus.  [juge value]  départ : (f^(−1))′(3π/2)
    = 1/2   ← (f⁻¹)′(3π/2) = 1/f′(π/2)
  aides : Cherche le x₀ dont l'image est 3π/2 : c'est là qu'on dérive f. | (f⁻¹)′(3π/2) = 1/f′(□) | (f⁻¹)′(3π/2) = 1/f′(π/2) = 1/2

```

### Niveau 5

```
Soit f(x) = 3x + cos(x), bijective de ℝ dans ℝ. Que vaut (f⁻¹)′(9π/2) ?
  ✔ 1/4   · 1/2 [a1_inverse_deriv_wrong_point]   · f⁻¹ n'est pas dérivable en 9π/2   · 4 [g1_inverse_reciprocal]
  pièges : a1_inverse_deriv_wrong_point, g1_inverse_reciprocal

Soit f(x) = x³ + x − 4, bijective de ℝ dans ℝ. Que vaut (f⁻¹)′(−14) ?
  ✔ 1/13   · f⁻¹ n'est pas dérivable en −14   · 13 [g1_inverse_reciprocal]   · 1/589 [a1_inverse_deriv_wrong_point]
  pièges : a1_inverse_deriv_wrong_point, g1_inverse_reciprocal

Soit f(x) = 4x + sin(x), bijective de ℝ dans ℝ. Que vaut (f⁻¹)′(4π) ?
  · 3 [g1_inverse_reciprocal]   ✔ 1/3   · f⁻¹ n'est pas dérivable en 4π   · 1/5 [a1_inverse_deriv_wrong_point]
  pièges : a1_inverse_deriv_wrong_point, g1_inverse_reciprocal

```

### Variantes d'examen

```
Soit f(x) = e^x + 3x, bijective de ℝ dans ℝ. Que vaut (f⁻¹)′(1) ?
  · f⁻¹ n'est pas dérivable en 1   · 1/(e + 3) [a1_inverse_deriv_wrong_point]   · 4 [g1_inverse_reciprocal]   ✔ 1/4
  [examen mcq]
  pièges : a1_inverse_deriv_wrong_point, g1_inverse_reciprocal

Vrai ou faux ? « Si f est bijective et continue de ℝ dans ℝ, alors f⁻¹ est dérivable partout. »
  · Vrai   ✔ Faux
  [examen tf]

```

## Dérivée logarithmique : u(x)^(v(x)) (`a1-deriv-log`, BA1)

_u^v = e^(v·Log u), puis la règle de chaîne._

### Niveau 1

```
Calcule la dérivée de f(x) = (1 + x²)^(2x), puis sa valeur en 1.
  [guided]  (e^(2x·ln(1 + x²)))′
    (L'exposant dépend de x : f(x) = e^(2x·ln(1 + x²)).)
    = (1 + x²)^(2x)·(2ln(1 + x²) + □)   (trous : (1 + x²)^(2x)·(2ln(1 + x²) + 4x²/(1 + x²)))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : (1 + (1)²)^(2(1))·(2ln(1 + (1)²) + 4(1)²/(1 + (1)²))
    = 8ln(2) + 8   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(2x·ln(1 + x²)), puis dérive avec la règle de chaîne. | f′ = f·(2ln(1 + x²) + □) | f′(x) = (1 + x²)^(2x)·(2ln(1 + x²) + 4x²/(1 + x²)) ; f′(1) = 8ln(2) + 8
  pièges : g6_product_naive, g6_chain_forgot, g2_log_sum, g6_power_rule_exp

Calcule la dérivée de f(x) = (1 + x²)^(1 + x²), puis sa valeur en 1.
  [guided]  (e^((1 + x²)·ln(1 + x²)))′
    (L'exposant dépend de x : f(x) = e^((1 + x²)·ln(1 + x²)).)
    = (1 + x²)^(1 + x²)·(□ + 2x)   (trous : (1 + x²)^(1 + x²)·(2x·ln(1 + x²) + 2x))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : (1 + (1)²)^(1 + (1)²)·(2(1)·ln(1 + (1)²) + 2(1))
    = 8ln(2) + 8   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^((1 + x²)·ln(1 + x²)), puis dérive avec la règle de chaîne. | f′ = f·(2x·ln(1 + x²) + □) | f′(x) = (1 + x²)^(1 + x²)·(2x·ln(1 + x²) + 2x) ; f′(1) = 8ln(2) + 8
  pièges : g6_product_naive, g6_chain_forgot, g2_log_sum, g6_power_rule_exp

Soit f(x) = (x + 3)^x. Dérive f, puis calcule f′(2).
  [guided]  (e^(x·ln(x + 3)))′
    (L'exposant dépend de x : f(x) = e^(x·ln(x + 3)).)
    = (x + 3)^x·(ln(x + 3) + □)   (trous : (x + 3)^x·(ln(x + 3) + x/(x + 3)))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : ((2) + 3)^(2)·(ln((2) + 3) + (2)/((2) + 3))
    = 25ln(5) + 10   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(x + 3)), puis dérive avec la règle de chaîne. | f′ = f·(ln(x + 3) + □) | f′(x) = (x + 3)^x·(ln(x + 3) + x/(x + 3)) ; f′(2) = 25ln(5) + 10
  pièges : g6_product_naive, g6_chain_forgot, g2_log_sum, g6_power_rule_exp

```

### Niveau 2

```
Soit f(x) = (x + 3)^(1 + x²). Dérive f, puis calcule f′(1).
  [guided]  ((x + 3)^(1 + x²))′
    = (e^(□))′   (trous : (e^((1 + x²)·ln(x + 3)))′)   ← Forme exponentielle
    = (x + 3)^(1 + x²)·(□)   (trous : (x + 3)^(1 + x²)·(2x·ln(x + 3) + (1 + x²)/(x + 3)))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : ((1) + 3)^(1 + (1)²)·(2(1)·ln((1) + 3) + (1 + (1)²)/((1) + 3))
    = 64ln(2) + 8   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^((1 + x²)·ln(x + 3)), puis dérive avec la règle de chaîne. | f′ = f·(2x·ln(x + 3) + □) | f′(x) = (x + 3)^(1 + x²)·(2x·ln(x + 3) + (1 + x²)/(x + 3)) ; f′(1) = 64ln(2) + 8
  pièges : g2_exp_sum, a1_exp_rule_var_base

Soit f(x) = (1 + x²)^(1 + x²). Dérive f, puis calcule f′(1).
  [guided]  ((1 + x²)^(1 + x²))′
    = (e^(□))′   (trous : (e^((1 + x²)·ln(1 + x²)))′)   ← Forme exponentielle
    = (1 + x²)^(1 + x²)·(□)   (trous : (1 + x²)^(1 + x²)·(2x·ln(1 + x²) + 2x))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : (1 + (1)²)^(1 + (1)²)·(2(1)·ln(1 + (1)²) + 2(1))
    = 8ln(2) + 8   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^((1 + x²)·ln(1 + x²)), puis dérive avec la règle de chaîne. | f′ = f·(2x·ln(1 + x²) + □) | f′(x) = (1 + x²)^(1 + x²)·(2x·ln(1 + x²) + 2x) ; f′(1) = 8ln(2) + 8
  pièges : g2_exp_sum, a1_exp_rule_var_base

Calcule la dérivée de f(x) = (x + 1)^x, puis sa valeur en 1.
  [guided]  ((x + 1)^x)′
    = (e^(□))′   (trous : (e^(x·ln(x + 1)))′)   ← Forme exponentielle
    = (x + 1)^x·(□)   (trous : (x + 1)^x·(ln(x + 1) + x/(x + 1)))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : ((1) + 1)^(1)·(ln((1) + 1) + (1)/((1) + 1))
    = 2ln(2) + 1   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(x + 1)), puis dérive avec la règle de chaîne. | f′ = f·(ln(x + 1) + □) | f′(x) = (x + 1)^x·(ln(x + 1) + x/(x + 1)) ; f′(1) = 2ln(2) + 1
  pièges : a1_exp_rule_var_base

```

### Niveau 3

```
Calcule la dérivée de f(x) = (x + 3)^x, puis sa valeur en 2.
  [tap, suivre l'erreur, menu steps]  ((x + 3)^x)′
    = (e^(x·ln(x + 3)))′   ← Forme exponentielle
    = (x + 3)^x·(ln(x + 3) + x/(x + 3))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : ((2) + 3)^(2)·(ln((2) + 3) + (2)/((2) + 3))
    = 25ln(5) + 10   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(x + 3)), puis dérive avec la règle de chaîne. | f′ = f·(ln(x + 3) + □) | f′(x) = (x + 3)^x·(ln(x + 3) + x/(x + 3)) ; f′(2) = 25ln(5) + 10
  pièges : a1_exp_rule_var_base

Soit f(x) = (x + 1)^(1 + x²). Dérive f, puis calcule f′(0).
  [tap, suivre l'erreur, menu steps]  ((x + 1)^(1 + x²))′
    = (e^((1 + x²)·ln(x + 1)))′   ← Forme exponentielle
    = (x + 1)^(1 + x²)·(2x·ln(x + 1) + (1 + x²)/(x + 1))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(0).  [juge definite]  départ : ((0) + 1)^(1 + (0)²)·(2(0)·ln((0) + 1) + (1 + (0)²)/((0) + 1))
    = 1   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^((1 + x²)·ln(x + 1)), puis dérive avec la règle de chaîne. | f′ = f·(2x·ln(x + 1) + □) | f′(x) = (x + 1)^(1 + x²)·(2x·ln(x + 1) + (1 + x²)/(x + 1)) ; f′(0) = 1
  pièges : g2_exp_sum, a1_exp_rule_var_base

Soit f(x) = (x + 1)^(1 + x²). Dérive f, puis calcule f′(1).
  [tap, suivre l'erreur, menu steps]  ((x + 1)^(1 + x²))′
    = (e^((1 + x²)·ln(x + 1)))′   ← Forme exponentielle
    = (x + 1)^(1 + x²)·(2x·ln(x + 1) + (1 + x²)/(x + 1))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : ((1) + 1)^(1 + (1)²)·(2(1)·ln((1) + 1) + (1 + (1)²)/((1) + 1))
    = 8ln(2) + 4   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^((1 + x²)·ln(x + 1)), puis dérive avec la règle de chaîne. | f′ = f·(2x·ln(x + 1) + □) | f′(x) = (x + 1)^(1 + x²)·(2x·ln(x + 1) + (1 + x²)/(x + 1)) ; f′(1) = 8ln(2) + 4
  pièges : g2_exp_sum, a1_exp_rule_var_base

```

### Niveau 4

```
Calcule la dérivée de f(x) = (1 + x²)^x, puis sa valeur en 2.
  [free, suivre l'erreur]  ((1 + x²)^x)′
    = (e^(x·ln(1 + x²)))′   ← Forme exponentielle
    = (1 + x²)^x·(ln(1 + x²) + 2x²/(1 + x²))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : (1 + (2)²)^(2)·(ln(1 + (2)²) + 2(2)²/(1 + (2)²))
    = 25ln(5) + 40   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(1 + x²)), puis dérive avec la règle de chaîne. | f′ = f·(ln(1 + x²) + □) | f′(x) = (1 + x²)^x·(ln(1 + x²) + 2x²/(1 + x²)) ; f′(2) = 25ln(5) + 40
  pièges : a1_exp_rule_var_base

Soit f(x) = (x + 1)^x. Dérive f, puis calcule f′(1).
  [free, suivre l'erreur]  ((x + 1)^x)′
    = (e^(x·ln(x + 1)))′   ← Forme exponentielle
    = (x + 1)^x·(ln(x + 1) + x/(x + 1))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : ((1) + 1)^(1)·(ln((1) + 1) + (1)/((1) + 1))
    = 2ln(2) + 1   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(x + 1)), puis dérive avec la règle de chaîne. | f′ = f·(ln(x + 1) + □) | f′(x) = (x + 1)^x·(ln(x + 1) + x/(x + 1)) ; f′(1) = 2ln(2) + 1
  pièges : a1_exp_rule_var_base

Calcule la dérivée de f(x) = (x + 2)^x, puis sa valeur en 2.
  [free, suivre l'erreur]  ((x + 2)^x)′
    = (e^(x·ln(x + 2)))′   ← Forme exponentielle
    = (x + 2)^x·(ln(x + 2) + x/(x + 2))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : ((2) + 2)^(2)·(ln((2) + 2) + (2)/((2) + 2))
    = 32ln(2) + 8   ← Évaluer et simplifier
  aides : L'exposant dépend de x : écris f = e^(x·ln(x + 2)), puis dérive avec la règle de chaîne. | f′ = f·(ln(x + 2) + □) | f′(x) = (x + 2)^x·(ln(x + 2) + x/(x + 2)) ; f′(2) = 32ln(2) + 8
  pièges : a1_exp_rule_var_base

```

### Niveau 5

```
Soit f(x) = (x + 1)^(1 + x²). Dérive f, puis calcule f′(1).
  [free, sans aide]  ((x + 1)^(1 + x²))′
    = (e^((1 + x²)·ln(x + 1)))′   ← Forme exponentielle
    = (x + 1)^(1 + x²)·(2x·ln(x + 1) + (1 + x²)/(x + 1))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(1).  [juge definite]  départ : ((1) + 1)^(1 + (1)²)·(2(1)·ln((1) + 1) + (1 + (1)²)/((1) + 1))
    = 8ln(2) + 4   ← Évaluer et simplifier
  pièges : g2_exp_sum, a1_exp_rule_var_base

Calcule la dérivée de f(x) = (x + 3)^x, puis sa valeur en 0.
  [free, sans aide]  ((x + 3)^x)′
    = (e^(x·ln(x + 3)))′   ← Forme exponentielle
    = (x + 3)^x·(ln(x + 3) + x/(x + 3))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(0).  [juge definite]  départ : ((0) + 3)^(0)·(ln((0) + 3) + (0)/((0) + 3))
    = ln(3)   ← Évaluer et simplifier
  pièges : a1_exp_rule_var_base

Soit f(x) = (1 + x²)^x. Dérive f, puis calcule f′(2).
  [free, sans aide]  ((1 + x²)^x)′
    = (e^(x·ln(1 + x²)))′   ← Forme exponentielle
    = (1 + x²)^x·(ln(1 + x²) + 2x²/(1 + x²))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : (1 + (2)²)^(2)·(ln(1 + (2)²) + 2(2)²/(1 + (2)²))
    = 25ln(5) + 40   ← Évaluer et simplifier
  pièges : a1_exp_rule_var_base

```

### Variantes d'examen

```
Soit f(x) = (x + 2)^(1 + x²). Que vaut f′(1) ?
  · 18ln(3) + 18   · 18ln(3) [a1_exp_rule_var_base]   · 6 [g6_power_rule_exp]   ✔ 18ln(3) + 6
  [examen mcq]
  pièges : a1_exp_rule_var_base, g6_power_rule_exp

Calcule la dérivée de f(x) = (1 + x²)^x, puis sa valeur en 2.
  [free, sans aide, examen open]  ((1 + x²)^x)′
    = (e^(x·ln(1 + x²)))′   ← Forme exponentielle
    = (1 + x²)^x·(ln(1 + x²) + 2x²/(1 + x²))   ← Dériver l'exposant, puis revenir à f
  — Calcule maintenant f′(2).  [juge definite]  départ : (1 + (2)²)^(2)·(ln(1 + (2)²) + 2(2)²/(1 + (2)²))
    = 25ln(5) + 40   ← Évaluer et simplifier
  pièges : a1_exp_rule_var_base

```

## Définir C¹(I) (`a1-c1-def`, BA1)

_Dérivable en tout point de I, et f′ continue sur I._

### Niveau 1

```
Construis la définition de C¹(I). Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. La fonction f′ : I → ℝ est continue sur I.
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C¹(]−1 ; 1[). Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. La fonction f′ : ]−1 ; 1[ → ℝ est continue sur ]−1 ; 1[.
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f′ existe en un point de ]−1 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C¹(]−1 ; 1[). Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. La fonction f′ : ]−1 ; 1[ → ℝ est continue sur ]−1 ; 1[.
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]−1 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Niveau 2

```
Construis la définition de C¹(]−2 ; 3[). Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. f est dérivable en tout point de ]−2 ; 3[.
    2. La fonction f′ : ]−2 ; 3[ → ℝ est continue sur ]−2 ; 3[.
    ✗ f′ est bornée sur ]−2 ; 3[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]−2 ; 3[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C¹(]0 ; 1[). Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. f est dérivable en tout point de ]0 ; 1[.
    2. La fonction f′ : ]0 ; 1[ → ℝ est continue sur ]0 ; 1[.
    ✗ f′ existe en un point de ]0 ; 1[. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]0 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de « f est continûment dérivable sur I ». Le début est placé. Touche les blocs dans l'ordre.
  [blocs define]
    1. f est dérivable en tout point de I.
    2. La fonction f′ : I → ℝ est continue sur I.
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Niveau 3

```
Construis la définition de C¹(]−1 ; 1[). Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit f : ]−1 ; 1[ → ℝ.
    2. f est dérivable en tout point de ]−1 ; 1[.
    3. La fonction f′ : ]−1 ; 1[ → ℝ est continue sur ]−1 ; 1[.
    4. On note C¹(]−1 ; 1[) l'ensemble de ces fonctions.
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f′ existe en un point de ]−1 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de « f est continûment dérivable sur ]0 ; 1[ ». Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit f : ]0 ; 1[ → ℝ.
    2. f est dérivable en tout point de ]0 ; 1[.
    3. La fonction f′ : ]0 ; 1[ → ℝ est continue sur ]0 ; 1[.
    4. On dit alors que f est continûment dérivable sur ]0 ; 1[ : f ∈ C¹(]0 ; 1[).
    ✗ f′ est bornée sur ]0 ; 1[. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]0 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C¹(]−2 ; 3[). Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit f : ]−2 ; 3[ → ℝ.
    2. f est dérivable en tout point de ]−2 ; 3[.
    3. La fonction f′ : ]−2 ; 3[ → ℝ est continue sur ]−2 ; 3[.
    4. On note C¹(]−2 ; 3[) l'ensemble de ces fonctions.
    ✗ f′ est bornée sur ]−2 ; 3[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]−2 ; 3[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Niveau 4

```
Construis la définition de Cᵏ(]−1 ; 1[) (k ≥ 1). Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit f : ]−1 ; 1[ → ℝ.
    2. f est k fois dérivable en tout point de ]−1 ; 1[.
    3. La fonction f⁽ᵏ⁾ : ]−1 ; 1[ → ℝ est continue sur ]−1 ; 1[.
    4. On note Cᵏ(]−1 ; 1[) l'ensemble de ces fonctions.
    ✗ f⁽ᵏ⁾ est bornée sur ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f⁽ᵏ⁾ existe en un point de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f⁽ᵏ⁾(x) existe pour un x₀ de ]−1 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de « f est continûment dérivable sur I ». Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ.
    2. f est dérivable en tout point de I.
    3. La fonction f′ : I → ℝ est continue sur I.
    4. On dit alors que f est continûment dérivable sur I : f ∈ C¹(I).
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
    ✗ f′ existe en un point de I. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
    ✗ f′ est bornée sur I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C¹(]0 ; 1[). Touche les blocs dans l'ordre.
  [blocs define]
    1. Soit f : ]0 ; 1[ → ℝ.
    2. f est dérivable en tout point de ]0 ; 1[.
    3. La fonction f′ : ]0 ; 1[ → ℝ est continue sur ]0 ; 1[.
    4. On note C¹(]0 ; 1[) l'ensemble de ces fonctions.
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de ]0 ; 1[. [a1_c1_def_missing_cont]
    ✗ f′ est bornée sur ]0 ; 1[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]0 ; 1[. [a1_c1_def_missing_cont]
    ✗ f′ existe en un point de ]0 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Niveau 5

```
Construis la définition de Cᵏ(I) (k ≥ 1). Touche les blocs dans l'ordre.
  [blocs define, sans aide]
    1. Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ.
    2. f est k fois dérivable en tout point de I.
    3. La fonction f⁽ᵏ⁾ : I → ℝ est continue sur I.
    4. On note Cᵏ(I) l'ensemble de ces fonctions.
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
    ✗ f⁽ᵏ⁾ est bornée sur I. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f⁽ᵏ⁾(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
    ✗ f⁽ᵏ⁾ existe en un point de I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de C²(]−1 ; 1[). Touche les blocs dans l'ordre.
  [blocs define, sans aide]
    1. Soit f : ]−1 ; 1[ → ℝ.
    2. f est deux fois dérivable en tout point de ]−1 ; 1[.
    3. La fonction f″ : ]−1 ; 1[ → ℝ est continue sur ]−1 ; 1[.
    4. On note C²(]−1 ; 1[) l'ensemble de ces fonctions.
    ✗ lim_{x→x₀} f″(x) existe pour un x₀ de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f″ existe en un point de ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f est continue sur ]−1 ; 1[. [a1_c1_def_missing_cont]
    ✗ f″ est bornée sur ]−1 ; 1[. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de Cᵏ(I) (k ≥ 1). Touche les blocs dans l'ordre.
  [blocs define, sans aide]
    1. Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ.
    2. f est k fois dérivable en tout point de I.
    3. La fonction f⁽ᵏ⁾ : I → ℝ est continue sur I.
    4. On note Cᵏ(I) l'ensemble de ces fonctions.
    ✗ f⁽ᵏ⁾ est bornée sur I. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f⁽ᵏ⁾(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
    ✗ f⁽ᵏ⁾ existe en un point de I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Variantes d'examen

```
Soit f(x) = x·|x| sur ℝ. Quelle affirmation est juste ?
  · f est de classe C² sur ℝ, mais pas C³ [a1_corner_missed]   · f est de classe C⁰ sur ℝ, mais pas C¹   ✔ f est de classe C¹ sur ℝ, mais pas C²   · f est de classe C^∞ sur ℝ [a1_corner_missed]
  [examen mcq]
  pièges : a1_corner_missed

Construis la définition de C¹(I). Touche les blocs dans l'ordre.
  [blocs define, sans aide]
    1. Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ.
    2. f est dérivable en tout point de I.
    3. La fonction f′ : I → ℝ est continue sur I.
    4. On note C¹(I) l'ensemble de ces fonctions.
    ✗ f′ est bornée sur I. [a1_c1_def_missing_cont]
    ✗ lim_{x→x₀} f′(x) existe pour un x₀ de I. [a1_c1_def_missing_cont]
    ✗ f′ existe en un point de I. [a1_c1_def_missing_cont]
    ✗ f est continue sur I. [a1_c1_def_missing_cont]
  [examen open]
  pièges : a1_c1_def_missing_cont

```

## Fonction par morceaux : choisir a et b pour qu'elle soit dérivable (`a1-piecewise-ab`, BA1)

_Continuité au raccord, puis mêmes dérivées à gauche et à droite._

### Niveau 1

```
Soit f(x) = ax + b si x < 0, et e^(−2x) + 1 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−2).
  [guided]  e^(−2x) + 1
    (Continuité en 0 : la limite à droite de e^(−2x) + 1 vaut 2.)
    = 2   ← f(0) = 2, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 2   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 2).  [juge limit]  départ : (e^(−2h) − 1)/h
    = −2   ← eᵘ − 1 ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = −2   ← f′(0⁻) = a
  — Calcule f(−2).  [juge value]  départ : f(−2)
    = −2·(−2) + 2   ← Remplacer
    = 6   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (e^(−2h) − 1)/h = □ | b = 2, a = −2
  pièges : a1_dl_factorial_missing

Soit f(x) = ax + b si x < 0, et (x − 1)(x + 3) si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−1).
  [guided]  (x − 1)(x + 3)
    (Continuité en 0 : la limite à droite de (x − 1)(x + 3) vaut −3.)
    = −3   ← f(0) = −3, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = −3   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = −3).  [juge limit]  départ : ((h − 1)(h + 3) + 3)/h
    = h + □   (trous : h + 2)   ← Simplifier par h
    = 2   ← h → 0
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 2   ← f′(0⁻) = a
  — Calcule f(−1).  [juge value]  départ : f(−1)
    = 2·(−1) − 3   ← Remplacer
    = −5   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim ((h − 1)(h + 3) + 3)/h = □ | b = −3, a = 2

Soit f(x) = ax + b si x < 0, et e^(2x) + 3 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−3).
  [guided]  e^(2x) + 3
    (Continuité en 0 : la limite à droite de e^(2x) + 3 vaut 4.)
    = 4   ← f(0) = 4, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 4   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 4).  [juge limit]  départ : (e^(2h) − 1)/h
    = 2   ← eᵘ − 1 ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 2   ← f′(0⁻) = a
  — Calcule f(−3).  [juge value]  départ : f(−3)
    = 2·(−3) + 4   ← Remplacer
    = −2   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (e^(2h) − 1)/h = □ | b = 4, a = 2
  pièges : a1_dl_factorial_missing

```

### Niveau 2

```
Soit f(x) = e^(3x) + 1 si x < 0, et ax + b si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(3).
  [guided]  e^(3x) + 1
    ? Par quoi commencer ? ✔ La continuité en 0 : une équation en a et b / · Égaler les dérivées des deux morceaux en 0
    = 2   ← lim_{x→0⁻} f(x) = 2, et f(0) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 2   ← Continuité en 0
  — Dérivée à gauche en 0, par le taux d'accroissement (f(0) = 2).  [juge limit]  départ : (e^(3h) − 1)/h
    = 3   ← eᵘ − 1 ~ u
  — La dérivée à droite vaut a : égale les deux.  [juge value]  départ : a
    = 3   ← f′(0⁺) = a
  — Calcule f(3).  [juge value]  départ : f(3)
    = 3·3 + 2   ← Remplacer
    = 11   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁻) = lim (e^(3h) − 1)/h = □ | b = 2, a = 3
  pièges : a1_dl_factorial_missing, a1_piecewise_derivative_formula

Soit f(x) = ax + b si x < 0, et e^(3x) + 3 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−2).
  [guided]  e^(3x) + 3
    ? Par quoi commencer ? ✔ La continuité en 0 : une équation en a et b / · Égaler les dérivées des deux morceaux en 0
    = 4   ← f(0) = 4, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 4   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 4).  [juge limit]  départ : (e^(3h) − 1)/h
    = 3   ← eᵘ − 1 ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 3   ← f′(0⁻) = a
  — Calcule f(−2).  [juge value]  départ : f(−2)
    = 3·(−2) + 4   ← Remplacer
    = −2   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (e^(3h) − 1)/h = □ | b = 4, a = 3
  pièges : a1_dl_factorial_missing, a1_piecewise_derivative_formula

Soit f(x) = ax + b si x < 0, et (x + 3)(x + 2) si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−3).
  [guided]  (x + 3)(x + 2)
    ? Par quoi commencer ? ✔ La continuité en 0 : une équation en a et b / · Égaler les dérivées des deux morceaux en 0
    = 6   ← f(0) = 6, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 6   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 6).  [juge limit]  départ : ((h + 3)(h + 2) − 6)/h
    = h + 5   ← Simplifier par h
    = 5   ← h → 0
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 5   ← f′(0⁻) = a
  — Calcule f(−3).  [juge value]  départ : f(−3)
    = 5·(−3) + 6   ← Remplacer
    = −9   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim ((h + 3)(h + 2) − 6)/h = □ | b = 6, a = 5
  pièges : a1_piecewise_derivative_formula

```

### Niveau 3

```
Soit f(x) = ax + b si x < 0, et sin(2x) + 1 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−2).
  [tap, suivre l'erreur, menu steps]  sin(2x) + 1
    = 1   ← f(0) = 1, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 1   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 1).  [juge limit]  départ : (sin(2h))/h
    = 2   ← sin u ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 2   ← f′(0⁻) = a
  — Calcule f(−2).  [juge value]  départ : f(−2)
    = 2·(−2) + 1   ← Remplacer
    = −3   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (sin(2h))/h = □ | b = 1, a = 2
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum

Soit f(x) = ax + b si x < 0, et (x − 4)(x + 3) si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−3).
  [tap, suivre l'erreur, menu steps]  (x − 4)(x + 3)
    = −12   ← f(0) = −12, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = −12   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = −12).  [juge limit]  départ : ((h − 4)(h + 3) + 12)/h
    = h − 1   ← Simplifier par h
    = −1   ← h → 0
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = −1   ← f′(0⁻) = a
  — Calcule f(−3).  [juge value]  départ : f(−3)
    = −1·(−3) − 12   ← Remplacer
    = −9   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim ((h − 4)(h + 3) + 12)/h = □ | b = −12, a = −1

Soit f(x) = e^(3x) − 2 si x < 0, et ax + b si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(1).
  [tap, suivre l'erreur, menu steps]  e^(3x) − 2
    = −1   ← lim_{x→0⁻} f(x) = −1, et f(0) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = −1   ← Continuité en 0
  — Dérivée à gauche en 0, par le taux d'accroissement (f(0) = −1).  [juge limit]  départ : (e^(3h) − 1)/h
    = 3   ← eᵘ − 1 ~ u
  — La dérivée à droite vaut a : égale les deux.  [juge value]  départ : a
    = 3   ← f′(0⁺) = a
  — Calcule f(1).  [juge value]  départ : f(1)
    = 3·1 − 1   ← Remplacer
    = 2   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁻) = lim (e^(3h) − 1)/h = □ | b = −1, a = 3
  pièges : a1_dl_factorial_missing

```

### Niveau 4

```
Soit f(x) = ax + b si x < 0, et e^(2x) + 1 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−2).
  [free, suivre l'erreur]  e^(2x) + 1
    = 2   ← f(0) = 2, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 2   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 2).  [juge limit]  départ : (e^(2h) − 1)/h
    = 2   ← eᵘ − 1 ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 2   ← f′(0⁻) = a
  — Calcule f(−2).  [juge value]  départ : f(−2)
    = 2·(−2) + 2   ← Remplacer
    = −2   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (e^(2h) − 1)/h = □ | b = 2, a = 2
  pièges : a1_dl_factorial_missing

Soit f(x) = (x − 1)(x − 4) si x < 0, et ax + b si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(2).
  [free, suivre l'erreur]  (x − 1)(x − 4)
    = 4   ← lim_{x→0⁻} f(x) = 4, et f(0) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 4   ← Continuité en 0
  — Dérivée à gauche en 0, par le taux d'accroissement (f(0) = 4).  [juge limit]  départ : ((h − 1)(h − 4) − 4)/h
    = h − 5   ← Simplifier par h
    = −5   ← h → 0
  — La dérivée à droite vaut a : égale les deux.  [juge value]  départ : a
    = −5   ← f′(0⁺) = a
  — Calcule f(2).  [juge value]  départ : f(2)
    = −5·2 + 4   ← Remplacer
    = −6   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁻) = lim ((h − 1)(h − 4) − 4)/h = □ | b = 4, a = −5

Soit f(x) = ax + b si x < 0, et sin(3x) + 3 si x ≥ 0. Trouve a et b pour que f soit dérivable en 0, puis calcule f(−2).
  [free, suivre l'erreur]  sin(3x) + 3
    = 3   ← f(0) = 3, et lim_{x→0⁻} f(x) = b
  — Écris l'équation de continuité.  [juge value]  départ : b
    = 3   ← Continuité en 0
  — Dérivée à droite en 0, par le taux d'accroissement (f(0) = 3).  [juge limit]  départ : (sin(3h))/h
    = 3   ← sin u ~ u
  — La dérivée à gauche vaut a : égale les deux.  [juge value]  départ : a
    = 3   ← f′(0⁻) = a
  — Calcule f(−2).  [juge value]  départ : f(−2)
    = 3·(−2) + 3   ← Remplacer
    = −3   ← Calculer
  aides : D'abord continue en 0, ensuite mêmes pentes des deux côtés. | b = □ ; a = f′(0⁺) = lim (sin(3h))/h = □ | b = 3, a = 3
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum

```

### Niveau 5

```
Soit f(x) = ax + b si x < 0, et (x − 1)(x − 2) si x ≥ 0. Pour quelles valeurs f est-elle dérivable en 0 ?
  · a = −3 et b = −2   · a = 2 et b = −3   ✔ a = −3 et b = 2   · a = −3, et b quelconque [a1_piecewise_derivative_formula]
  pièges : a1_piecewise_derivative_formula

Soit f(x) = ax + b si x < 0, et (x + 2)(x + 4) si x ≥ 0. Pour quelles valeurs f est-elle dérivable en 0 ?
  · a = 6, et b quelconque [a1_piecewise_derivative_formula]   · a = 6 et b = −8   ✔ a = 6 et b = 8   · a = 8 et b = 6
  pièges : a1_piecewise_derivative_formula

Soit f(x) = e^(2x) + 2 si x < 0, et ax + b si x ≥ 0. Pour quelles valeurs f est-elle dérivable en 0 ?
  · a = 3 et b = 2   ✔ a = 2 et b = 3   · a = 2 et b = −3   · a = 2, et b quelconque [a1_piecewise_derivative_formula]
  pièges : a1_piecewise_derivative_formula

```

### Variantes d'examen

```
Soit f(x) = e^(3x) + 2 si x < 0, et ax + b si x ≥ 0. Pour quelles valeurs f est-elle dérivable en 0 ?
  · Aucune valeur : f a un point anguleux en 0 [a1_corner_missed]   · a = 3 et b = −3   · a = 3, et b quelconque [a1_piecewise_derivative_formula]   ✔ a = 3 et b = 3
  [examen mcq]
  pièges : a1_piecewise_derivative_formula, a1_corner_missed

Vrai ou faux ? « Si f est définie par g sur ]−1 ; 0[ et par k sur [0 ; 1[, avec g′(0) = k′(0), alors f est dérivable en 0. »
  · Vrai [a1_piecewise_derivative_formula]   ✔ Faux
  [examen tf]
  pièges : a1_piecewise_derivative_formula

```

## Montrer qu'une fonction définie par morceaux est C¹ (`a1-c1-proof`, BA1)

_Hors du point, en x₀ par la définition, limite de f′, conclusion._

### Niveau 1

```
Soit f : ]−1 ; 1[ → ℝ, f(x) = 3x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 3 + 4x³·sin(1/x) − x²·cos(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 3 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 3]
    3. Pour x ≠ 0 : |f′(x) − 3| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 3]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

Soit f : ]−1 ; 1[ → ℝ, f(x) = 3x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 3 + 4x³·sin(1/x) − x²·cos(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 3 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 3]
    3. Pour x ≠ 0 : |f′(x) − 3| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 3]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

Soit f : ]−1 ; 1[ → ℝ, f(x) = x + x³·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 1 + 3x²·cos(1/x) + x·sin(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 1 + h²·cos(1/h), et |h²·cos(1/h)| ≤ h² → 0. Donc f′(0) = …   [à écrire : f′(0) = 1]
    3. Pour x ≠ 0 : |f′(x) − 1| ≤ 3|x|² + |x| → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 1]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

```

### Niveau 2

```
Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x⁴·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 6+4x^3×cos(1/x)+x^2×sin(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 6 + h³·cos(1/h), et |h³·cos(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 6]
    3. Pour x ≠ 0 : |f′(x) − 6| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 6]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

Soit f : ]−1 ; 1[ → ℝ, f(x) = x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 1+4x^3×sin(1/x)-x^2×cos(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 1 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 1]
    3. Pour x ≠ 0 : |f′(x) − 1| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 1]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

Soit f : ]−1 ; 1[ → ℝ, f(x) = 3x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 3+4x^3×sin(1/x)-x^2×cos(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 3 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 3]
    3. Pour x ≠ 0 : |f′(x) − 3| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 3]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).

```

### Niveau 3

```
Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 6 + 4x³·sin(1/x) − x²·cos(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 6 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = 6.
    3. Pour x ≠ 0 : |f′(x) − 6| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = 6 = f′(0).
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f′(0) = lim_{x→0} f′(x) = 6. [a1_c1_from_lim_fprime_only]
  pièges : a1_c1_def_missing_cont, a1_c1_from_lim_fprime_only

Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x³·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 6 + 3x²·sin(1/x) − x·cos(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 6 + h²·sin(1/h), et |h²·sin(1/h)| ≤ h² → 0. Donc f′(0) = 6.
    3. Pour x ≠ 0 : |f′(x) − 6| ≤ 3|x|² + |x| → 0, donc lim_{x→0} f′(x) = 6 = f′(0).
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f′(0) = lim_{x→0} f′(x) = 6. [a1_c1_from_lim_fprime_only]
  pièges : a1_c1_def_missing_cont, a1_c1_from_lim_fprime_only

Soit f : ]−1 ; 1[ → ℝ, f(x) = 5x + x³·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = 5 + 3x²·cos(1/x) + x·sin(1/x).
    2. En 0, par la définition : (f(h) − f(0))/h = 5 + h²·cos(1/h), et |h²·cos(1/h)| ≤ h² → 0. Donc f′(0) = 5.
    3. Pour x ≠ 0 : |f′(x) − 5| ≤ 3|x|² + |x| → 0, donc lim_{x→0} f′(x) = 5 = f′(0).
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f′(0) = lim_{x→0} f′(x) = 5. [a1_c1_from_lim_fprime_only]
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
  pièges : a1_c1_from_lim_fprime_only, a1_c1_def_missing_cont

```

### Niveau 4

```
Soit f : ]−1 ; 1[ → ℝ, f(x) = 2x + x⁴·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 2+4x^3×cos(1/x)+x^2×sin(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 2 + h³·cos(1/h), et |h³·cos(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 2]
    3. Pour x ≠ 0 : |f′(x) − 2| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 2]
    4. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f′(0) se lit sur la formule : f′(0) = 2 + 4·0·cos(1/0) + … = 2. [a1_derivable_from_formula]
    ✗ f′(0) = lim_{x→0} f′(x) = 2. [a1_c1_from_lim_fprime_only]
  pièges : a1_c1_def_missing_cont, a1_derivable_from_formula, a1_c1_from_lim_fprime_only

Soit f : ]−1 ; 1[ → ℝ, f(x) = 5x + x²·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f est dérivable sur ]−1 ; 1[ mais pas C¹. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est dérivable (produit et composée de fonctions dérivables) et f′(x) = …   [à écrire : f′(x) = 5+2x×cos(1/x)+sin(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 5 + h·cos(1/h) → 5, car |h·cos(1/h)| ≤ |h|. Donc f′(0) = …   [à écrire : f′(0) = 5]
    3. Mais f′(x) − 5 = 2x·cos(1/x) + sin(1/x) : le premier terme tend vers 0, le second n'a pas de limite en 0. f′ n'a pas de limite en 0.
    4. f est dérivable sur ]−1 ; 1[, mais f′ n'est pas continue en 0 : f ∉ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f n'est pas dérivable en 0, car f′(x) n'a pas de limite en 0. [a1_derivable_from_formula]
  pièges : a1_c1_def_missing_cont, a1_derivable_from_formula

Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x²·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f est dérivable sur ]−1 ; 1[ mais pas C¹. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour x ≠ 0, f est dérivable (produit et composée de fonctions dérivables) et f′(x) = …   [à écrire : f′(x) = 6+2x×sin(1/x)-cos(1/x)]
    2. En 0, par la définition : (f(h) − f(0))/h = 6 + h·sin(1/h) → 6, car |h·sin(1/h)| ≤ |h|. Donc f′(0) = …   [à écrire : f′(0) = 6]
    3. Mais f′(x) − 6 = 2x·sin(1/x) − cos(1/x) : le premier terme tend vers 0, le second n'a pas de limite en 0. f′ n'a pas de limite en 0.
    4. f est dérivable sur ]−1 ; 1[, mais f′ n'est pas continue en 0 : f ∉ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f n'est pas dérivable en 0, car f′(x) n'a pas de limite en 0. [a1_derivable_from_formula]
  pièges : a1_c1_def_missing_cont, a1_derivable_from_formula

```

### Niveau 5

```
Soit f : ]−1 ; 1[ → ℝ, f(x) = 3x + x³·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Définition : f ∈ C¹(]−1 ; 1[) si f est dérivable en tout point de ]−1 ; 1[ et si f′ est continue sur ]−1 ; 1[.
    2. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 3+3x^2×sin(1/x)-x×cos(1/x)]
    3. En 0, par la définition : (f(h) − f(0))/h = 3 + h²·sin(1/h), et |h²·sin(1/h)| ≤ h² → 0. Donc f′(0) = …   [à écrire : f′(0) = 3]
    4. Pour x ≠ 0 : |f′(x) − 3| ≤ 3|x|² + |x| → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 3]
    5. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f′(0) = lim_{x→0} f′(x) = 3. [a1_c1_from_lim_fprime_only]
    ✗ f′(0) se lit sur la formule : f′(0) = 3 + 3·0·sin(1/0) + … = 3. [a1_derivable_from_formula]
  pièges : a1_c1_def_missing_cont, a1_c1_from_lim_fprime_only, a1_derivable_from_formula

Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x⁴·cos(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Définition : f ∈ C¹(]−1 ; 1[) si f est dérivable en tout point de ]−1 ; 1[ et si f′ est continue sur ]−1 ; 1[.
    2. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 6+4x^3×cos(1/x)+x^2×sin(1/x)]
    3. En 0, par la définition : (f(h) − f(0))/h = 6 + h³·cos(1/h), et |h³·cos(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 6]
    4. Pour x ≠ 0 : |f′(x) − 6| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 6]
    5. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f′(0) se lit sur la formule : f′(0) = 6 + 4·0·cos(1/0) + … = 6. [a1_derivable_from_formula]
    ✗ f′(0) = lim_{x→0} f′(x) = 6. [a1_c1_from_lim_fprime_only]
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
  pièges : a1_derivable_from_formula, a1_c1_from_lim_fprime_only, a1_c1_def_missing_cont

Soit f : ]−1 ; 1[ → ℝ, f(x) = 6x + x⁴·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[). Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Définition : f ∈ C¹(]−1 ; 1[) si f est dérivable en tout point de ]−1 ; 1[ et si f′ est continue sur ]−1 ; 1[.
    2. Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = …   [à écrire : f′(x) = 6+4x^3×sin(1/x)-x^2×cos(1/x)]
    3. En 0, par la définition : (f(h) − f(0))/h = 6 + h³·sin(1/h), et |h³·sin(1/h)| ≤ |h|³ → 0. Donc f′(0) = …   [à écrire : f′(0) = 6]
    4. Pour x ≠ 0 : |f′(x) − 6| ≤ 4|x|³ + |x|² → 0, donc lim_{x→0} f′(x) = … = f′(0).   [à écrire : lim_{x→0} f′(x) = 6]
    5. f est dérivable en tout point de ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).
    ✗ f′(0) se lit sur la formule : f′(0) = 6 + 4·0·sin(1/0) + … = 6. [a1_derivable_from_formula]
    ✗ f est dérivable sur ]−1 ; 1[, donc f ∈ C¹(]−1 ; 1[). [a1_c1_def_missing_cont]
    ✗ f′(0) = lim_{x→0} f′(x) = 6. [a1_c1_from_lim_fprime_only]
  pièges : a1_derivable_from_formula, a1_c1_def_missing_cont, a1_c1_from_lim_fprime_only

```

### Variantes d'examen

```
f est de classe C¹ sur ℝ, et f′(x) = x·sin(3x)/(√(x² + 1) − 1) pour x ≠ 0. Que vaut f′(0) ?
  · 0 [a1_derivable_from_formula]   · 3   ✔ 6   · f′(0) n'existe pas : la formule n'est pas définie en 0 [a1_derivable_from_formula]
  [examen mcq]
  pièges : a1_derivable_from_formula

Vrai ou faux ? « f(x) = x³·sin(1/x), f(0) = 0, est deux fois dérivable sur ℝ. »
  · Vrai [a1_derivable_from_formula]   ✔ Faux
  [examen tf]
  pièges : a1_derivable_from_formula

Soit f : ]−1 ; 1[ → ℝ, f(x) = x + x³·sin(1/x) si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[) : dérive f hors de 0, calcule f′(0) par la définition, puis la limite de f′ en 0.
  [free, sans aide, examen open]  (x + x³·sin(1/x))′
    = 1 + 3x²·sin(1/x) − x·cos(1/x)   ← Pour x ≠ 0 : produit et composée
  — En 0, par la définition : (f(h) − f(0))/h.  [juge limit]  départ : (h + h³·sin(1/h))/h
    = 1 + h²·sin(1/h)   ← Simplifier par h
    = 1   ← Gendarmes : |h²·sin(1/h)| ≤ |h|² → 0
  — Continuité de f′ en 0 : la limite de f′(x).  [juge limit]  départ : 1 + 3x²·sin(1/x) − x·cos(1/x)
    = 1   ← |f′(x) − 1| ≤ 3|x|² + |x| → 0
    (f est dérivable sur ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).)
  pièges : g6_product_naive, g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square

```

## Rolle et accroissements finis : encadrer un taux d'accroissement (`a1-mvt`, BA1)

_(f(b) − f(a))/(b − a) = f′(c) : encadrer f′ sur l'intervalle._

### Niveau 1

```
Soit f(x) = −2x² + 6x + 2 sur ]−2 ; 0[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [guided]  −4c + 6
    (TAF : (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y. Ici f′(x) = −4x + 6.)
    (Pour c ∈ ]−2 ; 0[, minore f′(c) au plus juste :)
    = −4·□ + 6   (trous : −4·0 + 6)   ← f′ est affine : sa plus petite valeur est en c = 0
    = 6   ← Calculer
  — Pour c ∈ ]−2 ; 0[, majore f′(c) au plus juste :  [juge equiv]  départ : −4c + 6
    = −4·(□) + 6   (trous : −4·(−2) + 6)   ← Plus grande valeur en c = −2
    = 14   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = −4c + 6 ∈ [▢ ; ▢] | 6 ≤ f′(c) ≤ 14, donc 6 ≤ (f(x) − f(y))/(x − y) ≤ 14.

Soit f(x) = x² + 6x − 1 sur ]1 ; 6[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [guided]  2c + 6
    (TAF : (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y. Ici f′(x) = 2x + 6.)
    (Pour c ∈ ]1 ; 6[, minore f′(c) au plus juste :)
    = 2·□ + 6   (trous : 2·1 + 6)   ← f′ est affine : sa plus petite valeur est en c = 1
    = 8   ← Calculer
  — Pour c ∈ ]1 ; 6[, majore f′(c) au plus juste :  [juge equiv]  départ : 2c + 6
    = 2·□ + 6   (trous : 2·6 + 6)   ← Plus grande valeur en c = 6
    = 18   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 2c + 6 ∈ [▢ ; ▢] | 8 ≤ f′(c) ≤ 18, donc 8 ≤ (f(x) − f(y))/(x − y) ≤ 18.

Soit f(x) = x² − 2x − 2 sur ]−3 ; 1[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [guided]  2c − 2
    (TAF : (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y. Ici f′(x) = 2x − 2.)
    (Pour c ∈ ]−3 ; 1[, minore f′(c) au plus juste :)
    = 2·(□) − 2   (trous : 2·(−3) − 2)   ← f′ est affine : sa plus petite valeur est en c = −3
    = −8   ← Calculer
  — Pour c ∈ ]−3 ; 1[, majore f′(c) au plus juste :  [juge equiv]  départ : 2c − 2
    = 2·□ − 2   (trous : 2·1 − 2)   ← Plus grande valeur en c = 1
    = 0   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 2c − 2 ∈ [▢ ; ▢] | −8 ≤ f′(c) ≤ 0, donc −8 ≤ (f(x) − f(y))/(x − y) ≤ 0.

```

### Niveau 2

```
Soit f(x) = 2x² + 2x + 3 sur ]−3 ; 2[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [guided]  (2x² + 2x + 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−3) et f(2) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = □ + 2   (trous : 4x + 2)   ← Dériver
  — Pour c ∈ ]−3 ; 2[, minore f′(c) au plus juste :  [juge equiv]  départ : 4c + 2
    = 4·(□) + 2   (trous : 4·(−3) + 2)   ← f′ est affine : sa plus petite valeur est en c = −3
    = −10   ← Calculer
  — Pour c ∈ ]−3 ; 2[, majore f′(c) au plus juste :  [juge equiv]  départ : 4c + 2
    = 4·□ + 2   (trous : 4·2 + 2)   ← Plus grande valeur en c = 2
    = 10   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 4c + 2 ∈ [▢ ; ▢] | −10 ≤ f′(c) ≤ 10, donc −10 ≤ (f(x) − f(y))/(x − y) ≤ 10.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = 2x² − x + 6. Encadre (f(x) − f(y))/(x − y) pour x ≠ y dans ]−2 ; 1[, au plus juste.
  [guided]  (2x² − x + 6)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−2) et f(1) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = □ − 1   (trous : 4x − 1)   ← Dériver
  — Pour c ∈ ]−2 ; 1[, minore f′(c) au plus juste :  [juge equiv]  départ : 4c − 1
    = 4·(□) − 1   (trous : 4·(−2) − 1)   ← f′ est affine : sa plus petite valeur est en c = −2
    = −9   ← Calculer
  — Pour c ∈ ]−2 ; 1[, majore f′(c) au plus juste :  [juge equiv]  départ : 4c − 1
    = 4·□ − 1   (trous : 4·1 − 1)   ← Plus grande valeur en c = 1
    = 3   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 4c − 1 ∈ [▢ ; ▢] | −9 ≤ f′(c) ≤ 3, donc −9 ≤ (f(x) − f(y))/(x − y) ≤ 3.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = −2x² − 4x − 3 sur ]0 ; 4[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [guided]  (−2x² − 4x − 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(0) et f(4) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = □ − 4   (trous : −4x − 4)   ← Dériver
  — Pour c ∈ ]0 ; 4[, minore f′(c) au plus juste :  [juge equiv]  départ : −4c − 4
    = −4·□ − 4   (trous : −4·4 − 4)   ← f′ est affine : sa plus petite valeur est en c = 4
    = −20   ← Calculer
  — Pour c ∈ ]0 ; 4[, majore f′(c) au plus juste :  [juge equiv]  départ : −4c − 4
    = −4·□ − 4   (trous : −4·0 − 4)   ← Plus grande valeur en c = 0
    = −4   ← Calculer
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = −4c − 4 ∈ [▢ ; ▢] | −20 ≤ f′(c) ≤ −4, donc −20 ≤ (f(x) − f(y))/(x − y) ≤ −4.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

```

### Niveau 3

```
Soit f(x) = −x² − x − 1. Encadre (f(x) − f(y))/(x − y) pour x ≠ y dans ]−1 ; 3[, au plus juste.
  [tap, suivre l'erreur, menu steps]  (−x² − x − 1)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−1) et f(3) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = −2x − 1   ← Dériver
  — Pour c ∈ ]−1 ; 3[, minore f′(c) au plus juste :  [juge equiv]  départ : −2c − 1
    = −7   ← f′ est affine : minimum en c = 3
  — Pour c ∈ ]−1 ; 3[, majore f′(c) au plus juste :  [juge equiv]  départ : −2c − 1
    = 1   ← Maximum en c = −1
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = −2c − 1 ∈ [▢ ; ▢] | −7 ≤ f′(c) ≤ 1, donc −7 ≤ (f(x) − f(y))/(x − y) ≤ 1.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = −x² + 4x − 4. Encadre (f(x) − f(y))/(x − y) pour x ≠ y dans ]−1 ; 3[, au plus juste.
  [tap, suivre l'erreur, menu steps]  (−x² + 4x − 4)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−1) et f(3) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = −2x + 4   ← Dériver
  — Pour c ∈ ]−1 ; 3[, minore f′(c) au plus juste :  [juge equiv]  départ : −2c + 4
    = −2   ← f′ est affine : minimum en c = 3
  — Pour c ∈ ]−1 ; 3[, majore f′(c) au plus juste :  [juge equiv]  départ : −2c + 4
    = 6   ← Maximum en c = −1
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = −2c + 4 ∈ [▢ ; ▢] | −2 ≤ f′(c) ≤ 6, donc −2 ≤ (f(x) − f(y))/(x − y) ≤ 6.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = x² + 6x + 8 sur ]−1 ; 4[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [tap, suivre l'erreur, menu steps]  (x² + 6x + 8)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−1) et f(4) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 2x + 6   ← Dériver
  — Pour c ∈ ]−1 ; 4[, minore f′(c) au plus juste :  [juge equiv]  départ : 2c + 6
    = 4   ← f′ est affine : minimum en c = −1
  — Pour c ∈ ]−1 ; 4[, majore f′(c) au plus juste :  [juge equiv]  départ : 2c + 6
    = 14   ← Maximum en c = 4
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 2c + 6 ∈ [▢ ; ▢] | 4 ≤ f′(c) ≤ 14, donc 4 ≤ (f(x) − f(y))/(x − y) ≤ 14.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

```

### Niveau 4

```
Soit f(x) = x³ + 3 sur ]−3 ; 2[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [free, suivre l'erreur]  (x³ + 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−3) et f(2) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x²   ← Dériver
  — Pour c ∈ ]−3 ; 2[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c²
    = 0   ← c² ≥ 0
  — Pour c ∈ ]−3 ; 2[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c²
    = 27   ← c² ≤ 9 sur ]−3 ; 2[
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 3c² ∈ [▢ ; ▢] | 0 ≤ f′(c) ≤ 27, donc 0 ≤ (f(x) − f(y))/(x − y) ≤ 27.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = x³ + 6x + 2. Encadre (f(x) − f(y))/(x − y) pour x ≠ y dans ]−2 ; 1[, au plus juste.
  [free, suivre l'erreur]  (x³ + 6x + 2)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−2) et f(1) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x² + 6   ← Dériver
  — Pour c ∈ ]−2 ; 1[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c² + 6
    = 6   ← c² ≥ 0
  — Pour c ∈ ]−2 ; 1[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c² + 6
    = 18   ← c² ≤ 4 sur ]−2 ; 1[
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 3c² + 6 ∈ [▢ ; ▢] | 6 ≤ f′(c) ≤ 18, donc 6 ≤ (f(x) − f(y))/(x − y) ≤ 18.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = x³ − 2x + 1 sur ]−2 ; 1[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [free, suivre l'erreur]  (x³ − 2x + 1)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−2) et f(1) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x² − 2   ← Dériver
  — Pour c ∈ ]−2 ; 1[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 2
    = −2   ← c² ≥ 0
  — Pour c ∈ ]−2 ; 1[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 2
    = 10   ← c² ≤ 4 sur ]−2 ; 1[
  aides : Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. | f′(c) = 3c² − 2 ∈ [▢ ; ▢] | −2 ≤ f′(c) ≤ 10, donc −2 ≤ (f(x) − f(y))/(x − y) ≤ 10.
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

```

### Niveau 5

```
Soit f(x) = x³ − 2x − 3 sur ]−2 ; 3[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [free, sans aide]  (x³ − 2x − 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−2) et f(3) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x² − 2   ← Dériver
  — Pour c ∈ ]−2 ; 3[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 2
    = −2   ← c² ≥ 0
  — Pour c ∈ ]−2 ; 3[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 2
    = 25   ← c² ≤ 9 sur ]−2 ; 3[
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = x³ + 6x + 3 sur ]−1 ; 2[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [free, sans aide]  (x³ + 6x + 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−1) et f(2) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x² + 6   ← Dériver
  — Pour c ∈ ]−1 ; 2[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c² + 6
    = 6   ← c² ≥ 0
  — Pour c ∈ ]−1 ; 2[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c² + 6
    = 18   ← c² ≤ 4 sur ]−1 ; 2[
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

Soit f(x) = x³ − x + 3 sur ]−3 ; 1[. Trouve le plus grand m et le plus petit M tels que m ≤ (f(x) − f(y))/(x − y) ≤ M pour tous x ≠ y de l'intervalle.
  [free, sans aide]  (x³ − x + 3)′
    ? Que dit le théorème des accroissements finis sur (f(x) − f(y))/(x − y) ? ✔ (f(x) − f(y))/(x − y) = f′(c) pour un c entre x et y / · Rolle : f′(c) = 0 pour un c, donc le taux vaut 0 / · Le taux est compris entre f(−3) et f(1) / · TVI : f prend toutes les valeurs entre f(x) et f(y)
    (Dérive f :)
    = 3x² − 1   ← Dériver
  — Pour c ∈ ]−3 ; 1[, minore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 1
    = −1   ← c² ≥ 0
  — Pour c ∈ ]−3 ; 1[, majore f′(c) au plus juste :  [juge equiv]  départ : 3c² − 1
    = 26   ← c² ≤ 9 sur ]−3 ; 1[
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values

```

### Variantes d'examen

```
Soit f(x) = x² + 3x − 4. Pour tous x ≠ y dans ]−2 ; 0[, quel est le meilleur encadrement ?
  · −3 < (f(x) − f(y))/(x − y) < 1   ✔ −1 < (f(x) − f(y))/(x − y) < 3   · (f(x) − f(y))/(x − y) = 0, par le théorème de Rolle [a1_rolle_without_hyp]   · −6 < (f(x) − f(y))/(x − y) < −4 [a1_mvt_endpoints_values]
  [examen mcq]
  pièges : a1_mvt_endpoints_values, a1_rolle_without_hyp

Vrai ou faux ? « Si f est dérivable sur ]0 ; 1[, continue sur [0 ; 1] et f(0) = f(1), alors f′ s'annule sur ]0 ; 1[. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Règle de Bernoulli-l'Hôpital, avec ses conditions (`a1-bh`, BA1)

_Forme 0/0 ou ∞/∞ : lim f/g = lim f′/g′._

### Niveau 1

```
Calcule lim_{x→0} (e^(−2x) − e^(3x))/x.
  [guided]  (e^(−2x) − e^(3x))/x
    (Forme 0/0 : on peut appliquer BH.)
    = □ − 3e^(3x)   (trous : −2e^(−2x) − 3e^(3x))   ← BH : dériver le haut et le bas
    = −5   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □−3e^(3x) | Une fois BH, puis la limite vaut −5.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} ln(1 − 5x)/(3x), avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  ln(1 − 5x)/(3x)
    (Forme 0/0 : on peut appliquer BH.)
    = −5/(3(1 − 5x))   ← BH : dériver le haut et le bas
    = −5/3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : −5/(3(1−5x)) | Une fois BH, puis la limite vaut −5/3.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} (e^(−2x) − e^x)/x, avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  (e^(−2x) − e^x)/x
    (Forme 0/0 : on peut appliquer BH.)
    = □ − e^x   (trous : −2e^(−2x) − e^x)   ← BH : dériver le haut et le bas
    = −3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □−e^x | Une fois BH, puis la limite vaut −3.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

```

### Niveau 2

```
Trouve lim_{x→0} ln(1 + 4x)/(3x), avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  ln(1 + 4x)/(3x)
    ? Quelle forme ? ✔ 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / · Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = 4/(3(1 + 4x))   ← BH : dériver le haut et le bas
    = 4/3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : 4/(3(□)) | Une fois BH, puis la limite vaut 4/3.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} (e^(4x) − e^(−x))/x, avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  (e^(4x) − e^(−x))/x
    ? Quelle forme ? ✔ 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / · Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = 4e^(4x) + e^(−x)   ← BH : dériver le haut et le bas
    = 5   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □+e^(−x) | Une fois BH, puis la limite vaut 5.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} (x − 5)/(x² + 2x + 5), avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  (x − 5)/(x² + 2x + 5)
    ? Quelle forme ? · 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / ✔ Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = −1   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | En 0, le haut vaut −5 et le bas vaut 5 : substitue x = 0. | La limite vaut −1.
  pièges : a1_bh_not_indeterminate

```

### Niveau 3

```
Trouve lim_{x→0} (x − sin(x))/x³, avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [tap, suivre l'erreur, menu steps]  (x − sin(x))/x³
    ? Quelle forme ? → 0/0
    = (1 − cos(x))/(3x²)   ← BH : dériver le haut et le bas
    = sin(x)/(6x)   ← BH : dériver le haut et le bas
    = cos(x)/6   ← BH : dériver le haut et le bas
    = 1/6   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : (1−□)/(□) | 3 fois BH, puis la limite vaut 1/6.
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} (1 − cos(3x))/x², avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [tap, suivre l'erreur, menu steps]  (1 − cos(3x))/x²
    ? Quelle forme ? → 0/0
    = 3sin(3x)/(2x)   ← BH : dériver le haut et le bas
    = 9cos(3x)/2   ← BH : dériver le haut et le bas
    = 9/2   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : 3sin(3x)/(□) | 2 fois BH, puis la limite vaut 9/2.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→0} (1 − cos(2x))/x², avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [tap, suivre l'erreur, menu steps]  (1 − cos(2x))/x²
    ? Quelle forme ? → 0/0
    = 2sin(2x)/(2x)   ← BH : dériver le haut et le bas
    = 4cos(2x)/2   ← BH : dériver le haut et le bas
    = 2   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : 2sin(□)/(2x) | 2 fois BH, puis la limite vaut 2.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

```

### Niveau 4

```
Trouve lim_{x→0} (e^(−x) − 1 + x)/x², avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [free, suivre l'erreur]  (e^(−x) − 1 + x)/x²
    ? Quelle forme ? → 0/0
    = (−e^(−x) + 1)/(2x)   ← BH : dériver le haut et le bas
    = e^(−x)/2   ← BH : dériver le haut et le bas
    = 1/2   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : (□+1)/(□) | 2 fois BH, puis la limite vaut 1/2.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Calcule lim_{x→0} (e^x − e^(−3x))/x.
  [free, suivre l'erreur]  (e^x − e^(−3x))/x
    ? Quelle forme ? → 0/0
    = e^x + 3e^(−3x)   ← BH : dériver le haut et le bas
    = 4   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □+3e^(−3x) | Une fois BH, puis la limite vaut 4.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Calcule lim_{x→0} (e^x − e^(−2x))/x.
  [free, suivre l'erreur]  (e^x − e^(−2x))/x
    ? Quelle forme ? → 0/0
    = e^x + 2e^(−2x)   ← BH : dériver le haut et le bas
    = 3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □+2e^(−2x) | Une fois BH, puis la limite vaut 3.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

```

### Niveau 5

```
Trouve lim_{x→0} (x − sin(x))/x³, avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [free, sans aide]  (x − sin(x))/x³
    = (1 − cos(x))/(3x²)   ← BH : dériver le haut et le bas
    = sin(x)/(6x)   ← BH : dériver le haut et le bas
    = cos(x)/6   ← BH : dériver le haut et le bas
    = 1/6   ← Substituer
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_dl_order_too_low, a1_bh_quotient_rule

Trouve lim_{x→∞} 2ln(x)/x², avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [free, sans aide]  2ln(x)/x²
    = (2/x)/(2x)   ← BH : dériver le haut et le bas
    = 1/x²   ← Simplifier
    = 0   ← Substituer

Calcule lim_{x→0} (2x − sin(2x))/x³.
  [free, sans aide]  (2x − sin(2x))/x³
    = (2 − 2cos(2x))/(3x²)   ← BH : dériver le haut et le bas
    = 4sin(2x)/(6x)   ← BH : dériver le haut et le bas
    = 8cos(2x)/6   ← BH : dériver le haut et le bas
    = 4/3   ← Substituer
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_dl_order_too_low, a1_bh_quotient_rule

```

### Variantes d'examen

```
lim_{x→0} (1 − cos(2x))/x² = ?
  ✔ 2   · 0 [a1_dl_order_too_low]   · −2   · 4 [a1_dl_factorial_missing]
  [examen mcq]
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low

Vrai ou faux ? « Si f/g est de la forme 0/0 en a, alors limx→a f/g = limx→a (f/g)′. »
  · Vrai [a1_bh_quotient_rule]   ✔ Faux
  [examen tf]
  pièges : a1_bh_quotient_rule

```

## Extrema globaux sur [a ; b] : bornes, f′ = 0, f′ qui n'existe pas (`a1-extrema-global`, BA1)

_Trois sortes de candidats, puis comparer les valeurs._

### Niveau 1

```
Trouve le maximum et le minimum de f(x) = (x² + 4)/x sur le segment [−3 ; −1].
  [guided]  x² − 4 = 0
    (f′(x) = ((x + 2)(x − 2))/x². Résous f′(x) = 0 :)
    = (x + 2)(x − 2) = 0   ← Factoriser
    = x = □ ou x = □   (trous : x = −2 ou x = 2)   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−3)² + 4)/(−3)
    (Candidats : les bornes −3 et −1, et −2 (2 est hors de [−3 ; −1]).)
    = −13/3   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−2)² + 4)/(−2)
    = −4   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−1)² + 4)/(−1)
    = −5   ← Calculer
  — Maximum global de f sur [−3 ; −1] :  [juge value]  départ : M
    = −4   ← Comparer
  — Minimum global de f sur [−3 ; −1] :  [juge value]  départ : m
    = −5   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (▢(x − 2))/x² | Compare f(−3) = −13/3, f(−2) = −4 et f(−1) = −5 : max −4, min −5.

Soit f(x) = (x² + 8)/(x − 1) sur [−4 ; −1]. Trouve ses extrema globaux.
  [guided]  x² − 2x − 8 = 0
    (f′(x) = ((x + 2)(x − 4))/(x − 1)². Résous f′(x) = 0 :)
    = (x + 2)(x − 4) = 0   ← Factoriser
    = x = □ ou x = □   (trous : x = −2 ou x = 4)   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−4)² + 8)/((−4) − 1)
    (Candidats : les bornes −4 et −1, et −2 (4 est hors de [−4 ; −1]).)
    = −24/5   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−2)² + 8)/((−2) − 1)
    = −4   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−1)² + 8)/((−1) − 1)
    = −9/2   ← Calculer
  — Maximum global de f sur [−4 ; −1] :  [juge value]  départ : M
    = −4   ← Comparer
  — Minimum global de f sur [−4 ; −1] :  [juge value]  départ : m
    = −24/5   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (▢(x − 4))/(x − 1)² | Compare f(−4) = −24/5, f(−2) = −4 et f(−1) = −9/2 : max −4, min −24/5.

Soit f(x) = x³ − 6x² + 5 sur [−2 ; 1]. Trouve ses extrema globaux.
  [guided]  3x² − 12x = 0
    (f′(x) = 3x(x − 4). Résous f′(x) = 0 :)
    = 3x(x − 4) = 0   ← Factoriser
    = x = □ ou x = □   (trous : x = 0 ou x = 4)   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−2)³ − 6·(−2)² + 5
    (Candidats : les bornes −2 et 1, et 0 (4 est hors de [−2 ; 1]).)
    = −27   ← Calculer
  — Candidat suivant :  [juge value]  départ : 0³ − 6·0² + 5
    = 5   ← Calculer
  — Candidat suivant :  [juge value]  départ : 1³ − 6·1² + 5
    = 0   ← Calculer
  — Maximum global de f sur [−2 ; 1] :  [juge value]  départ : M
    = 5   ← Comparer
  — Minimum global de f sur [−2 ; 1] :  [juge value]  départ : m
    = −27   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x − 4) | Compare f(−2) = −27, f(0) = 5 et f(1) = 0 : max 5, min −27.

```

### Niveau 2

```
Soit f(x) = (x² − 4x − 2)/(x² + 4) sur [−6 ; −2]. Trouve ses extrema globaux.
  [guided]  ((x² − 4x − 2)/(x² + 4))′
    (Dérive f :)
    = (4(□)(x − 1))/(x² + 4)²   (trous : (4(x + 4)(x − 1))/(x² + 4)²)   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 4x² + 12x − 16 = 0
    = 4(x + 4)(x − 1) = 0   ← Factoriser
    = x = −4 ou x = 1   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−6)² − 4·(−6) − 2)/((−6)² + 4)
    ? Quels sont les candidats sur [−6 ; −2] ? ✔ x = −6, −4, −2 / · x = −4 seulement / · x = −6, −4, −2, 1 / · x = −6, −2 seulement
    = 29/20   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−4)² − 4·(−4) − 2)/((−4)² + 4)
    = 3/2   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−2)² − 4·(−2) − 2)/((−2)² + 4)
    = 5/4   ← Calculer
  — Maximum global de f sur [−6 ; −2] :  [juge value]  départ : M
    = 3/2   ← Comparer
  — Minimum global de f sur [−6 ; −2] :  [juge value]  départ : m
    = 5/4   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (4▢(x − 1))/(x² + 4)² | Compare f(−6) = 29/20, f(−4) = 3/2 et f(−2) = 5/4 : max 3/2, min 5/4.
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_extrema_bounds_forgotten

Trouve le maximum et le minimum de f(x) = x³ − 3x² − 9x + 4 sur le segment [2 ; 4].
  [guided]  (x³ − 3x² − 9x + 4)′
    (Dérive f :)
    = 3(□)(x + 1)   (trous : 3(x − 3)(x + 1))   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² − 6x − 9 = 0
    = 3(x − 3)(x + 1) = 0   ← Factoriser
    = x = −1 ou x = 3   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : 2³ − 3·2² − 9·2 + 4
    ? Quels sont les candidats sur [2 ; 4] ? ✔ x = 2, 3, 4 / · x = 3 seulement / · x = −1, 2, 3, 4 / · x = 2, 4 seulement
    = −18   ← Calculer
  — Candidat suivant :  [juge value]  départ : 3³ − 3·3² − 9·3 + 4
    = −23   ← Calculer
  — Candidat suivant :  [juge value]  départ : 4³ − 3·4² − 9·4 + 4
    = −16   ← Calculer
  — Maximum global de f sur [2 ; 4] :  [juge value]  départ : M
    = −16   ← Comparer
  — Minimum global de f sur [2 ; 4] :  [juge value]  départ : m
    = −23   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x + 1) | Compare f(2) = −18, f(3) = −23 et f(4) = −16 : max −16, min −23.
  pièges : a1_extrema_bounds_forgotten

Soit f(x) = x³ + 3x² − 9x + 4 sur [−4 ; −2]. Trouve ses extrema globaux.
  [guided]  (x³ + 3x² − 9x + 4)′
    (Dérive f :)
    = 3(□)(x − 1)   (trous : 3(x + 3)(x − 1))   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² + 6x − 9 = 0
    = 3(x + 3)(x − 1) = 0   ← Factoriser
    = x = −3 ou x = 1   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−4)³ + 3·(−4)² − 9·(−4) + 4
    ? Quels sont les candidats sur [−4 ; −2] ? ✔ x = −4, −3, −2 / · x = −3 seulement / · x = −4, −3, −2, 1 / · x = −4, −2 seulement
    = 24   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−3)³ + 3·(−3)² − 9·(−3) + 4
    = 31   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−2)³ + 3·(−2)² − 9·(−2) + 4
    = 26   ← Calculer
  — Maximum global de f sur [−4 ; −2] :  [juge value]  départ : M
    = 31   ← Comparer
  — Minimum global de f sur [−4 ; −2] :  [juge value]  départ : m
    = 24   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x − 1) | Compare f(−4) = 24, f(−3) = 31 et f(−2) = 26 : max 31, min 24.
  pièges : a1_extrema_bounds_forgotten

```

### Niveau 3

```
Trouve le maximum et le minimum de f(x) = (x² + 12)/(x − 2) sur le segment [−4 ; −1].
  [tap, suivre l'erreur, menu steps]  ((x² + 12)/(x − 2))′
    (Dérive f :)
    = ((x + 2)(x − 6))/(x − 2)²   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : x² − 4x − 12 = 0
    = x = −2 ou x = 6   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−4)² + 12)/((−4) − 2)
    (Candidats : les bornes −4 et −1, et −2 (6 est hors de [−4 ; −1]).)
    = −14/3   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−2)² + 12)/((−2) − 2)
    = −4   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−1)² + 12)/((−1) − 2)
    = −13/3   ← Calculer
  — Maximum global de f sur [−4 ; −1] :  [juge value]  départ : M
    = −4   ← Comparer
  — Minimum global de f sur [−4 ; −1] :  [juge value]  départ : m
    = −14/3   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (▢(x − 6))/(x − 2)² | Compare f(−4) = −14/3, f(−2) = −4 et f(−1) = −13/3 : max −4, min −14/3.
  pièges : g6_quotient_sign, g6_quotient_no_square

Trouve le maximum et le minimum de f(x) = (x² + 4)/x sur le segment [−3 ; −1].
  [tap, suivre l'erreur, menu steps]  ((x² + 4)/x)′
    (Dérive f :)
    = ((x + 2)(x − 2))/x²   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : x² − 4 = 0
    = x = −2 ou x = 2   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−3)² + 4)/(−3)
    (Candidats : les bornes −3 et −1, et −2 (2 est hors de [−3 ; −1]).)
    = −13/3   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−2)² + 4)/(−2)
    = −4   ← Calculer
  — Candidat suivant :  [juge value]  départ : ((−1)² + 4)/(−1)
    = −5   ← Calculer
  — Maximum global de f sur [−3 ; −1] :  [juge value]  départ : M
    = −4   ← Comparer
  — Minimum global de f sur [−3 ; −1] :  [juge value]  départ : m
    = −5   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (▢(x − 2))/x² | Compare f(−3) = −13/3, f(−2) = −4 et f(−1) = −5 : max −4, min −5.
  pièges : g6_quotient_sign, g6_quotient_no_square

Soit f(x) = x³ + 6x² sur [−2 ; 1]. Trouve ses extrema globaux.
  [tap, suivre l'erreur, menu steps]  (x³ + 6x²)′
    (Dérive f :)
    = 3x(x + 4)   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² + 12x = 0
    = x = −4 ou x = 0   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−2)³ + 6·(−2)²
    (Candidats : les bornes −2 et 1, et 0 (−4 est hors de [−2 ; 1]).)
    = 16   ← Calculer
  — Candidat suivant :  [juge value]  départ : 0³ + 6·0²
    = 0   ← Calculer
  — Candidat suivant :  [juge value]  départ : 1³ + 6·1²
    = 7   ← Calculer
  — Maximum global de f sur [−2 ; 1] :  [juge value]  départ : M
    = 16   ← Comparer
  — Minimum global de f sur [−2 ; 1] :  [juge value]  départ : m
    = 0   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x + 4) | Compare f(−2) = 16, f(0) = 0 et f(1) = 7 : max 16, min 0.

```

### Niveau 4

```
Trouve le maximum et le minimum de f(x) = x²/(x − 2) sur le segment [−1 ; 1].
  [free, suivre l'erreur]  (x²/(x − 2))′
    ? Pourquoi f est-elle continue sur [−1 ; 1] ? ✔ Le dénominateur ne s'annule qu'en 2, hors de [−1 ; 1] / · Une fraction rationnelle est continue sur ℝ / · Parce que f′ existe
    (Dérive f :)
    = (x(x − 4))/(x − 2)²   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : x² − 4x = 0
    = x = 0 ou x = 4   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−1)²/((−1) − 2)
    ? Quels sont les candidats sur [−1 ; 1] ? ✔ x = −1, 0, 1 / · x = 0 seulement / · x = −1, 0, 1, 4 / · x = −1, 1 seulement
    = −1/3   ← Calculer
  — Candidat suivant :  [juge value]  départ : 0²/(0 − 2)
    = 0   ← Calculer
  — Candidat suivant :  [juge value]  départ : 1²/(1 − 2)
    = −1   ← Calculer
  — Maximum global de f sur [−1 ; 1] :  [juge value]  départ : M
    = 0   ← Comparer
  — Minimum global de f sur [−1 ; 1] :  [juge value]  départ : m
    = −1   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = (▢(x − 4))/(x − 2)² | Compare f(−1) = −1/3, f(0) = 0 et f(1) = −1 : max 0, min −1.
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_extrema_bounds_forgotten

Soit f(x) = x³ − 12x + 5 sur [−3 ; −1]. Trouve ses extrema globaux.
  [free, suivre l'erreur]  (x³ − 12x + 5)′
    (Dérive f :)
    = 3(x + 2)(x − 2)   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² − 12 = 0
    = x = −2 ou x = 2   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−3)³ − 12·(−3) + 5
    ? Quels sont les candidats sur [−3 ; −1] ? ✔ x = −3, −2, −1 / · x = −2 seulement / · x = −3, −2, −1, 2 / · x = −3, −1 seulement
    = 14   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−2)³ − 12·(−2) + 5
    = 21   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−1)³ − 12·(−1) + 5
    = 16   ← Calculer
  — Maximum global de f sur [−3 ; −1] :  [juge value]  départ : M
    = 21   ← Comparer
  — Minimum global de f sur [−3 ; −1] :  [juge value]  départ : m
    = 14   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x − 2) | Compare f(−3) = 14, f(−2) = 21 et f(−1) = 16 : max 21, min 14.
  pièges : a1_extrema_bounds_forgotten

Trouve le maximum et le minimum de f(x) = x³ − 3x² − 24x + 4 sur le segment [−4 ; −1].
  [free, suivre l'erreur]  (x³ − 3x² − 24x + 4)′
    (Dérive f :)
    = 3(x + 2)(x − 4)   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² − 6x − 24 = 0
    = x = −2 ou x = 4   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−4)³ − 3·(−4)² − 24·(−4) + 4
    ? Quels sont les candidats sur [−4 ; −1] ? ✔ x = −4, −2, −1 / · x = −2 seulement / · x = −4, −2, −1, 4 / · x = −4, −1 seulement
    = −12   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−2)³ − 3·(−2)² − 24·(−2) + 4
    = 32   ← Calculer
  — Candidat suivant :  [juge value]  départ : (−1)³ − 3·(−1)² − 24·(−1) + 4
    = 24   ← Calculer
  — Maximum global de f sur [−4 ; −1] :  [juge value]  départ : M
    = 32   ← Comparer
  — Minimum global de f sur [−4 ; −1] :  [juge value]  départ : m
    = −12   ← Comparer
  aides : Trois sortes de candidats : les bornes, les points où f′ = 0, les points où f′ n'existe pas. | f′(x) = 3▢(x − 4) | Compare f(−4) = −12, f(−2) = 32 et f(−1) = 24 : max 32, min −12.
  pièges : a1_extrema_bounds_forgotten

```

### Niveau 5

```
Soit f(x) = x³ + 6x² + 3 sur [−2 ; 2]. Trouve ses extrema globaux.
  [free, sans aide]  (x³ + 6x² + 3)′
    (Dérive f :)
    = 3x(x + 4)   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² + 12x = 0
    = x = −4 ou x = 0   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−2)³ + 6·(−2)² + 3
    ? Quels sont les candidats sur [−2 ; 2] ? ✔ x = −2, 0, 2 / · x = 0 seulement / · x = −4, −2, 0, 2 / · x = −2, 2 seulement
    = 19   ← Calculer
  — Candidat suivant :  [juge value]  départ : 0³ + 6·0² + 3
    = 3   ← Calculer
  — Candidat suivant :  [juge value]  départ : 2³ + 6·2² + 3
    = 35   ← Calculer
  — Maximum global de f sur [−2 ; 2] :  [juge value]  départ : M
    = 35   ← Comparer
  — Minimum global de f sur [−2 ; 2] :  [juge value]  départ : m
    = 3   ← Comparer
  pièges : a1_extrema_bounds_forgotten

Soit f(x) = (x² − x − 2)/(x² + x + 2) sur [−1 ; 3]. Trouve ses extrema globaux.
  [free, sans aide]  1² − 4·2
    (f est-elle définie sur [−1 ; 3] ? Discriminant du dénominateur x² + x + 2 :)
    = −7   ← Δ < 0 : le dénominateur ne s'annule pas
  — Dérive f :  [juge equiv]  départ : ((x² − x − 2)/(x² + x + 2))′
    = (2x(x + 4))/(x² + x + 2)²   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 2x² + 8x = 0
    = x = −4 ou x = 0   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−1)² − (−1) − 2)/((−1)² + (−1) + 2)
    ? Quels sont les candidats sur [−1 ; 3] ? ✔ x = −1, 0, 3 / · x = 0 seulement / · x = −4, −1, 0, 3 / · x = −1, 3 seulement
    = 0   ← Calculer
  — Candidat suivant :  [juge value]  départ : (0² − 0 − 2)/(0² + 0 + 2)
    = −1   ← Calculer
  — Candidat suivant :  [juge value]  départ : (3² − 3 − 2)/(3² + 3 + 2)
    = 2/7   ← Calculer
  — Maximum global de f sur [−1 ; 3] :  [juge value]  départ : M
    = 2/7   ← Comparer
  — Minimum global de f sur [−1 ; 3] :  [juge value]  départ : m
    = −1   ← Comparer
  pièges : a1_extrema_bounds_forgotten

Soit f(x) = x³ − 6x² + 9x + 4 sur [−1 ; 2]. Trouve ses extrema globaux.
  [free, sans aide]  (x³ − 6x² + 9x + 4)′
    (Dérive f :)
    = 3(x − 1)(x − 3)   ← Dériver, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 3x² − 12x + 9 = 0
    = x = 1 ou x = 3   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : (−1)³ − 6·(−1)² + 9·(−1) + 4
    ? Quels sont les candidats sur [−1 ; 2] ? ✔ x = −1, 1, 2 / · x = 1 seulement / · x = −1, 1, 2, 3 / · x = −1, 2 seulement
    = −12   ← Calculer
  — Candidat suivant :  [juge value]  départ : 1³ − 6·1² + 9·1 + 4
    = 8   ← Calculer
  — Candidat suivant :  [juge value]  départ : 2³ − 6·2² + 9·2 + 4
    = 6   ← Calculer
  — Maximum global de f sur [−1 ; 2] :  [juge value]  départ : M
    = 8   ← Comparer
  — Minimum global de f sur [−1 ; 2] :  [juge value]  départ : m
    = −12   ← Comparer
  pièges : a1_extrema_bounds_forgotten

```

### Variantes d'examen

```
f est deux fois dérivable sur ℝ et admet un minimum local en 0. Que peut-on affirmer ?
  ✔ f′(0) = 0 et f″(0) ≥ 0   · f′(0) = 0 et f″(0) > 0   · f″(0) > 0, sans rien sur f′(0)   · f′(0) = 0 et f″(0) ≤ 0
  [examen mcq]

Soit f(x) = (x² − 2x − 3)/(x² + 2x + 3) sur [−1 ; 2]. Trouve ses extrema globaux.
  [free, sans aide, examen open]  2² − 4·3
    (f est-elle définie sur [−1 ; 2] ? Discriminant du dénominateur x² + 2x + 3 :)
    = −8   ← Δ < 0 : le dénominateur ne s'annule pas
  — Dérive f :  [juge equiv]  départ : ((x² − 2x − 3)/(x² + 2x + 3))′
    = (4x(x + 3))/(x² + 2x + 3)²   ← Règle du quotient, factoriser
  — Résous f′(x) = 0 :  [juge solset]  départ : 4x² + 12x = 0
    = x = −3 ou x = 0   ← Racines
  — Évalue f aux candidats :  [juge value]  départ : ((−1)² − 2·(−1) − 3)/((−1)² + 2·(−1) + 3)
    ? Quels sont les candidats sur [−1 ; 2] ? ✔ x = −1, 0, 2 / · x = 0 seulement / · x = −3, −1, 0, 2 / · x = −1, 2 seulement
    = 0   ← Calculer
  — Candidat suivant :  [juge value]  départ : (0² − 2·0 − 3)/(0² + 2·0 + 3)
    = −1   ← Calculer
  — Candidat suivant :  [juge value]  départ : (2² − 2·2 − 3)/(2² + 2·2 + 3)
    = −3/11   ← Calculer
  — Maximum global de f sur [−1 ; 2] :  [juge value]  départ : M
    = 0   ← Comparer
  — Minimum global de f sur [−1 ; 2] :  [juge value]  départ : m
    = −1   ← Comparer
  pièges : a1_extrema_bounds_forgotten

```

## Étude de fonction : convexité, asymptotes, graphe (`a1-fn-study`, BA1)

_f″ et la convexité, asymptotes par limites ou division, choisir le graphe._

### Niveau 1

```
Étudie f(x) = (x² − 7)/(x − 4) : asymptotes, monotonie, convexité.
  [guided]  1 − 9/(x − 4)² > 0
    (f′(x) = 1 − 9/(x − 4)² = ((x − 1)(x − 7))/(x − 4)². f est croissante là où f′(x) > 0 :)
    = ((x − 1)(x − 7))/(x − 4)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 1[ ∪ ]7 ; +∞[)   ← Signe des facteurs
  — f″(x) = 18/(x − 4)³. f est convexe là où f″(x) > 0 :  [juge solset]  départ : 18/(x − 4)³ > 0
    = ]□ ; +∞[   (trous : ]4 ; +∞[)   ← Signe de (x − 4)³
  aides : Divise x² − 7 par x − 4 : le quotient donne l'asymptote oblique. | f(x) = x + 4 + ▢/(x − 4) | f″(x) = 18/(x − 4)³
  pièges : g9_bracket, g1_trinome_sign_swap

Étudie f(x) = (x² + 8x + 17)/(x + 4) : asymptotes, monotonie, convexité.
  [guided]  1 − 1/(x + 4)² > 0
    (f′(x) = 1 − 1/(x + 4)² = ((x + 5)(x + 3))/(x + 4)². f est croissante là où f′(x) > 0 :)
    = ((x + 5)(x + 3))/(x + 4)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −5[ ∪ ]−3 ; +∞[)   ← Signe des facteurs
  — f″(x) = 2/(x + 4)³. f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x + 4)³ > 0
    = ]□ ; +∞[   (trous : ]−4 ; +∞[)   ← Signe de (x + 4)³
  aides : Divise x² + 8x + 17 par x + 4 : le quotient donne l'asymptote oblique. | f(x) = x + 4 + ▢/(x + 4) | f″(x) = 2/(x + 4)³
  pièges : g9_bracket, g1_trinome_sign_swap

Étudie f(x) = (x² + x + 4)/(x + 4) : asymptotes, monotonie, convexité.
  [guided]  1 − 16/(x + 4)² > 0
    (f′(x) = 1 − 16/(x + 4)² = ((x + 8)(x))/(x + 4)². f est croissante là où f′(x) > 0 :)
    = ((x + 8)(x))/(x + 4)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −8[ ∪ ]0 ; +∞[)   ← Signe des facteurs
  — f″(x) = 32/(x + 4)³. f est convexe là où f″(x) > 0 :  [juge solset]  départ : 32/(x + 4)³ > 0
    = ]□ ; +∞[   (trous : ]−4 ; +∞[)   ← Signe de (x + 4)³
  aides : Divise x² + x + 4 par x + 4 : le quotient donne l'asymptote oblique. | f(x) = x − 3 + ▢/(x + 4) | f″(x) = 32/(x + 4)³
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Niveau 2

```
Étudie f(x) = (x² − 3x + 3)/(x − 2) : asymptotes, monotonie, convexité.
  [guided]  (x² − 3x + 3)/(x − 2)
    (Division euclidienne :)
    = x − □ + 1/(x − 2)   (trous : x − 1 + 1/(x − 2))   ← Quotient x + m, reste K
  — Asymptote verticale : limite quand x → 2⁺  [juge limit]  départ : (x² − 3x + 3)/(x − 2)
    ? Asymptote oblique en ±∞ : ✔ y = x − 1 / · y = x / · Pas d'asymptote oblique
    = □   (trous : ∞)   ← Le haut tend vers un nombre ≠ 0, le bas vers 0⁺
  — Puis quand x → 2⁻  [juge limit]  départ : (x² − 3x + 3)/(x − 2)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 1 + 1/(x − 2))′
    = 1 − 1/(x − 2)²   ← Dériver
  aides : Divise x² − 3x + 3 par x − 2 : le quotient donne l'asymptote oblique. | f(x) = x − 1 + ▢/(x − 2) | f″(x) = 2/(x − 2)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Soit f(x) = (x² − 4x + 8)/(x − 2), définie sur ℝ ∖ {2}. Fais son étude.
  [guided]  (x² − 4x + 8)/(x − 2)
    (Division euclidienne :)
    = x − 2 + □/(x − 2)   (trous : x − 2 + 4/(x − 2))   ← Quotient x + m, reste K
  — Asymptote verticale : limite quand x → 2⁺  [juge limit]  départ : (x² − 4x + 8)/(x − 2)
    ? Asymptote oblique en ±∞ : ✔ y = x − 2 / · y = x / · y = x + 2 / · Pas d'asymptote oblique
    = □   (trous : ∞)   ← Le haut tend vers un nombre ≠ 0, le bas vers 0⁺
  — Puis quand x → 2⁻  [juge limit]  départ : (x² − 4x + 8)/(x − 2)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 2 + 4/(x − 2))′
    = 1 − 4/(x − 2)²   ← Dériver
  aides : Divise x² − 4x + 8 par x − 2 : le quotient donne l'asymptote oblique. | f(x) = x − 2 + ▢/(x − 2) | f″(x) = 8/(x − 2)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Soit f(x) = (x² − 8x + 20)/(x − 4), définie sur ℝ ∖ {4}. Fais son étude.
  [guided]  (x² − 8x + 20)/(x − 4)
    (Division euclidienne :)
    = x − □ + 4/(x − 4)   (trous : x − 4 + 4/(x − 4))   ← Quotient x + m, reste K
  — Asymptote verticale : limite quand x → 4⁺  [juge limit]  départ : (x² − 8x + 20)/(x − 4)
    ? Asymptote oblique en ±∞ : ✔ y = x − 4 / · y = x / · Pas d'asymptote oblique
    = □   (trous : ∞)   ← Le haut tend vers un nombre ≠ 0, le bas vers 0⁺
  — Puis quand x → 4⁻  [juge limit]  départ : (x² − 8x + 20)/(x − 4)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 4 + 4/(x − 4))′
    = 1 − 4/(x − 4)²   ← Dériver
  aides : Divise x² − 8x + 20 par x − 4 : le quotient donne l'asymptote oblique. | f(x) = x − 4 + ▢/(x − 4) | f″(x) = 8/(x − 4)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

```

### Niveau 3

```
Étudie f(x) = (x² − 2x − 15)/(x + 2) : asymptotes, monotonie, convexité.
  [tap, suivre l'erreur, menu steps]  (x² − 2x − 15)/(x + 2)
    (Division euclidienne :)
    = x − 4 − 7/(x + 2)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 4 − 7/(x + 2))′
    = 1 + 7/(x + 2)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 + 7/(x + 2)² > 0
    = ]−∞ ; −2[ ∪ ]−2 ; +∞[   ← f′(x) = 1 + 7/(x + 2)² > 0
  — Dérive encore :  [juge equiv]  départ : (1 + 7/(x + 2)²)′
    = −14/(x + 2)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : −14/(x + 2)³ > 0
    = ]−∞ ; −2[   ← Signe de (x + 2)³
  aides : Divise x² − 2x − 15 par x + 2 : le quotient donne l'asymptote oblique. | f(x) = x − 4 + ▢/(x + 2) | f″(x) = −14/(x + 2)³
  pièges : g0_pfd_no_div

Étudie f(x) = (x² − 8x + 17)/(x − 4) : asymptotes, monotonie, convexité.
  [tap, suivre l'erreur, menu steps]  (x² − 8x + 17)/(x − 4)
    (Division euclidienne :)
    = x − 4 + 1/(x − 4)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 4 + 1/(x − 4))′
    = 1 − 1/(x − 4)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x − 4)² > 0
    = ((x − 3)(x − 5))/(x − 4)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; 3[ ∪ ]5 ; +∞[   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x − 4)²)′
    = 2/(x − 4)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x − 4)³ > 0
    = ]4 ; +∞[   ← Signe de (x − 4)³
  aides : Divise x² − 8x + 17 par x − 4 : le quotient donne l'asymptote oblique. | f(x) = x − 4 + ▢/(x − 4) | f″(x) = 2/(x − 4)³
  pièges : g0_pfd_no_div

Soit f(x) = (x² + x − 9)/(x + 3), définie sur ℝ ∖ {−3}. Fais son étude.
  [tap, suivre l'erreur, menu steps]  (x² + x − 9)/(x + 3)
    (Division euclidienne :)
    = x − 2 − 3/(x + 3)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 2 − 3/(x + 3))′
    = 1 + 3/(x + 3)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 + 3/(x + 3)² > 0
    = ]−∞ ; −3[ ∪ ]−3 ; +∞[   ← f′(x) = 1 + 3/(x + 3)² > 0
  — Dérive encore :  [juge equiv]  départ : (1 + 3/(x + 3)²)′
    = −6/(x + 3)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : −6/(x + 3)³ > 0
    = ]−∞ ; −3[   ← Signe de (x + 3)³
  aides : Divise x² + x − 9 par x + 3 : le quotient donne l'asymptote oblique. | f(x) = x − 2 + ▢/(x + 3) | f″(x) = −6/(x + 3)³
  pièges : g0_pfd_no_div

```

### Niveau 4

```
Soit f(x) = (x² + 7x + 13)/(x + 3), définie sur ℝ ∖ {−3}. Fais son étude.
  [free, suivre l'erreur]  (x² + 7x + 13)/(x + 3)
    (Division euclidienne :)
    = x + 4 + 1/(x + 3)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x + 4 + 1/(x + 3))′
    ? Asymptote oblique en ±∞ : ✔ y = x + 4 / · y = x / · y = x + 5 / · Pas d'asymptote oblique
    = 1 − 1/(x + 3)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x + 3)² > 0
    = ((x + 4)(x + 2))/(x + 3)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; −4[ ∪ ]−2 ; +∞[   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x + 3)²)′
    = 2/(x + 3)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x + 3)³ > 0
    = ]−3 ; +∞[   ← Signe de (x + 3)³
  aides : Divise x² + 7x + 13 par x + 3 : le quotient donne l'asymptote oblique. | f(x) = x + 4 + ▢/(x + 3) | f″(x) = 2/(x + 3)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Soit f(x) = (x² − 5x + 5)/(x − 1), définie sur ℝ ∖ {1}. Fais son étude.
  [free, suivre l'erreur]  (x² − 5x + 5)/(x − 1)
    (Division euclidienne :)
    = x − 4 + 1/(x − 1)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 4 + 1/(x − 1))′
    ? Asymptote oblique en ±∞ : ✔ y = x − 4 / · y = x / · y = x − 3 / · Pas d'asymptote oblique
    = 1 − 1/(x − 1)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x − 1)² > 0
    = ((x)(x − 2))/(x − 1)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; 0[ ∪ ]2 ; +∞[   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x − 1)²)′
    = 2/(x − 1)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x − 1)³ > 0
    = ]1 ; +∞[   ← Signe de (x − 1)³
  aides : Divise x² − 5x + 5 par x − 1 : le quotient donne l'asymptote oblique. | f(x) = x − 4 + ▢/(x − 1) | f″(x) = 2/(x − 1)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Étudie f(x) = (x² − 3x + 3)/(x − 2) : asymptotes, monotonie, convexité.
  [free, suivre l'erreur]  (x² − 3x + 3)/(x − 2)
    (Division euclidienne :)
    = x − 1 + 1/(x − 2)   ← Division euclidienne
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 1 + 1/(x − 2))′
    ? Asymptote oblique en ±∞ : ✔ y = x − 1 / · y = x / · Pas d'asymptote oblique
    = 1 − 1/(x − 2)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x − 2)² > 0
    = ((x − 1)(x − 3))/(x − 2)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; 1[ ∪ ]3 ; +∞[   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x − 2)²)′
    = 2/(x − 2)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x − 2)³ > 0
    = ]2 ; +∞[   ← Signe de (x − 2)³
  aides : Divise x² − 3x + 3 par x − 2 : le quotient donne l'asymptote oblique. | f(x) = x − 1 + ▢/(x − 2) | f″(x) = 2/(x − 2)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

```

### Niveau 5

```
Soit f(x) = (x² + 6x + 13)/(x + 3), définie sur ℝ ∖ {−3}. Fais son étude.
  [free, sans aide]  (x² + 6x + 13)/(x + 3)
    (Division euclidienne :)
    = x + 3 + 4/(x + 3)   ← Division euclidienne
  — Asymptote verticale : limite quand x → −3⁺  [juge limit]  départ : (x² + 6x + 13)/(x + 3)
    ? Asymptote oblique en ±∞ : ✔ y = x + 3 / · y = x / · y = x + 7 / · Pas d'asymptote oblique
    = ∞   ← Le bas tend vers 0
  — Puis quand x → −3⁻  [juge limit]  départ : (x² + 6x + 13)/(x + 3)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x + 3 + 4/(x + 3))′
    = 1 − 4/(x + 3)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 4/(x + 3)² > 0
    = ((x + 5)(x + 1))/(x + 3)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; −5[ ∪ ]−1 ; +∞[   ← Signe des facteurs
  — Maximum local en x = −5 :  [juge value]  départ : ((−5)² + 6·(−5) + 13)/((−5) + 3)
    = −4   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 4/(x + 3)²)′
    = 8/(x + 3)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 8/(x + 3)³ > 0
    = ]−3 ; +∞[   ← Signe de (x + 3)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Soit f(x) = (x² − 2x + 6)/(x + 1), définie sur ℝ ∖ {−1}. Fais son étude.
  [free, sans aide]  (x² − 2x + 6)/(x + 1)
    (Division euclidienne :)
    = x − 3 + 9/(x + 1)   ← Division euclidienne
  — Asymptote verticale : limite quand x → −1⁺  [juge limit]  départ : (x² − 2x + 6)/(x + 1)
    ? Asymptote oblique en ±∞ : ✔ y = x − 3 / · y = x / · y = x + 6 / · Pas d'asymptote oblique
    = ∞   ← Le bas tend vers 0
  — Puis quand x → −1⁻  [juge limit]  départ : (x² − 2x + 6)/(x + 1)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 3 + 9/(x + 1))′
    = 1 − 9/(x + 1)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 9/(x + 1)² > 0
    = ((x + 4)(x − 2))/(x + 1)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; −4[ ∪ ]2 ; +∞[   ← Signe des facteurs
  — Maximum local en x = −4 :  [juge value]  départ : ((−4)² − 2·(−4) + 6)/((−4) + 1)
    = −10   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 9/(x + 1)²)′
    = 18/(x + 1)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 18/(x + 1)³ > 0
    = ]−1 ; +∞[   ← Signe de (x + 1)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

Soit f(x) = (x² − 6x + 12)/(x − 2), définie sur ℝ ∖ {2}. Fais son étude.
  [free, sans aide]  (x² − 6x + 12)/(x − 2)
    (Division euclidienne :)
    = x − 4 + 4/(x − 2)   ← Division euclidienne
  — Asymptote verticale : limite quand x → 2⁺  [juge limit]  départ : (x² − 6x + 12)/(x − 2)
    ? Asymptote oblique en ±∞ : ✔ y = x − 4 / · y = x / · Pas d'asymptote oblique
    = ∞   ← Le bas tend vers 0
  — Puis quand x → 2⁻  [juge limit]  départ : (x² − 6x + 12)/(x − 2)
    = −∞   ← Le bas tend vers 0⁻
  — Dérive f (sous la forme divisée) :  [juge equiv]  départ : (x − 4 + 4/(x − 2))′
    = 1 − 4/(x − 2)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 4/(x − 2)² > 0
    = ((x)(x − 4))/(x − 2)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; 0[ ∪ ]4 ; +∞[   ← Signe des facteurs
  — Maximum local en x = 0 :  [juge value]  départ : (0² − 6·0 + 12)/(0 − 2)
    = −6   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 4/(x − 2)²)′
    = 8/(x − 2)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 8/(x − 2)³ > 0
    = ]2 ; +∞[   ← Signe de (x − 2)³
  pièges : g0_pfd_no_div, a1_oblique_asymptote_slope_only

```

### Variantes d'examen

```
Quelle description convient au graphe de f(x) = (x² + 3x − 3)/(x − 1) ?
  · f est convexe sur ℝ ∖ {1} ; asymptotes x = 1 et y = x + 4   · f est convexe sur ]−∞ ; 1[ et concave sur ]1 ; +∞[ ; asymptotes x = 1 et y = x + 4   · f est concave sur ]−∞ ; 1[ et convexe sur ]1 ; +∞[ ; asymptotes x = 1 et y = x [a1_oblique_asymptote_slope_only]   ✔ f est concave sur ]−∞ ; 1[ et convexe sur ]1 ; +∞[ ; asymptotes x = 1 et y = x + 4
  [examen mcq]
  pièges : a1_oblique_asymptote_slope_only

Vrai ou faux ? « f(x) = (x² + 8x + 15)/(x + 4) est convexe sur ]−∞ ; −4[. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Courbes paramétrées : tangentes, points doubles, asymptotes (`a1-param-curve`, BA1)

_Pente ẏ/ẋ, tangentes horizontales et verticales, γ(t) = γ(s)._

### Niveau 1

```
Soit la courbe γ(t) = (t³ − 3t − 1 ; t² − 2), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [guided]  (t² − 2)′/(t³ − 3t − 1)′
    (ẋ = 3t² − 3, ẏ = 2t. Pente de la tangente :)
    = (□)/(3t² − 3)   (trous : (2t)/(3t² − 3))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = □   (trous : t = −1 ou t = 1)   ← Racines
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = 0 : tangente horizontale.

Soit la courbe γ(t) = (t² + 3 ; t³ − 12t − 3), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [guided]  (t³ − 12t − 3)′/(t² + 3)′
    (ẋ = 2t, ẏ = 3t² − 12. Pente de la tangente :)
    = (□)/(2t)   (trous : (3t² − 12)/(2t))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 12 = 0
    = t = −2 ou t = □   (trous : t = −2 ou t = 2)   ← Racines
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±2 : tangente horizontale.

Étudie la courbe paramétrée x(t) = t² − 1, y(t) = t³ − 12t + 3 : pente, tangentes horizontales et verticales.
  [guided]  (t³ − 12t + 3)′/(t² − 1)′
    (ẋ = 2t, ẏ = 3t² − 12. Pente de la tangente :)
    = (□)/(2t)   (trous : (3t² − 12)/(2t))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 12 = 0
    = t = −2 ou t = □   (trous : t = −2 ou t = 2)   ← Racines
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±2 : tangente horizontale.

```

### Niveau 2

```
Soit la courbe γ(t) = (t² − 2 ; t³ − 12t + 3), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [guided]  (t² − 2)′
    (Dérive x(t) :)
    = □   (trous : 2t)   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 12t + 3)′
    = 3t² − 12   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t³ − 12t + 3)′/(t² − 2)′
    = (□)/(2t)   (trous : (3t² − 12)/(2t))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 12 = 0
    = t = −2 ou t = □   (trous : t = −2 ou t = 2)   ← Racines
  — Point de tangente horizontale pour t = 2 :  [juge value]  départ : 2³ − 12·2 + 3
    = −13   ← Calculer
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±2 : tangente horizontale.

Soit la courbe γ(t) = (t² + 2 ; t³ − 12t), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [guided]  (t² + 2)′
    (Dérive x(t) :)
    = □   (trous : 2t)   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 12t)′
    = 3t² − 12   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t³ − 12t)′/(t² + 2)′
    = (□)/(2t)   (trous : (3t² − 12)/(2t))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 12 = 0
    = t = −2 ou t = □   (trous : t = −2 ou t = 2)   ← Racines
  — Point de tangente horizontale pour t = 2 :  [juge value]  départ : 2³ − 12·2
    = −16   ← Calculer
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±2 : tangente horizontale.

Étudie la courbe paramétrée x(t) = t³ − 12t + 3, y(t) = t² − 3 : pente, tangentes horizontales et verticales.
  [guided]  (t³ − 12t + 3)′
    (Dérive x(t) :)
    = □ − 12   (trous : 3t² − 12)   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t² − 3)′
    = 2t   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t² − 3)′/(t³ − 12t + 3)′
    = (□)/(3t² − 12)   (trous : (2t)/(3t² − 12))   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point de tangente horizontale pour t = 0 :  [juge value]  départ : 0² − 3
    = −3   ← Calculer
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = 0 : tangente horizontale.

```

### Niveau 3

```
Étudie la courbe paramétrée x(t) = t³ − 3t + 1, y(t) = t² + 1 : tangentes horizontales et verticales, point double.
  [tap, suivre l'erreur, menu steps]  (t³ − 3t + 1)′
    (Dérive x(t) :)
    = 3t² − 3   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t² + 1)′
    = 2t   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point double : y(t) = y(s) avec s ≠ t donne s = −t ; alors x(t) = x(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = 0 : tangente horizontale.

Soit la courbe γ(t) = (t³ − 3t − 2 ; t² − 1), t ∈ ℝ. Trouve ses tangentes horizontales et verticales et son point double.
  [tap, suivre l'erreur, menu steps]  (t³ − 3t − 2)′
    (Dérive x(t) :)
    = 3t² − 3   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t² − 1)′
    = 2t   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point double : y(t) = y(s) avec s ≠ t donne s = −t ; alors x(t) = x(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = 0 : tangente horizontale.

Soit la courbe γ(t) = (t² ; t³ − 3t − 1), t ∈ ℝ. Trouve ses tangentes horizontales et verticales et son point double.
  [tap, suivre l'erreur, menu steps]  (t²)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 3t − 1)′
    = 3t² − 3   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point double : x(t) = x(s) avec s ≠ t donne s = −t ; alors y(t) = y(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±1 : tangente horizontale.

```

### Niveau 4

```
Soit la courbe γ(t) = (t² + 1 ; t³ − 3t − 3), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [free, suivre l'erreur]  (t² + 1)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 3t − 3)′
    = 3t² − 3   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t³ − 3t − 3)′/(t² + 1)′
    = (3t² − 3)/(2t)   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1³ − 3·1 − 3
    = −5   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±1 : tangente horizontale.

Étudie la courbe paramétrée x(t) = t³ − 3t − 2, y(t) = t² + 2 : pente, tangentes horizontales et verticales.
  [free, suivre l'erreur]  (t³ − 3t − 2)′
    (Dérive x(t) :)
    = 3t² − 3   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t² + 2)′
    = 2t   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t² + 2)′/(t³ − 3t − 2)′
    = (2t)/(3t² − 3)   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point de tangente horizontale pour t = 0 :  [juge value]  départ : 0² + 2
    = 2   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = 0 : tangente horizontale.

Soit la courbe γ(t) = (t² ; t³ − 12t + 1), t ∈ ℝ. Trouve ses tangentes horizontales et verticales.
  [free, suivre l'erreur]  (t²)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 12t + 1)′
    = 3t² − 12   ← Dériver
  — Pente de la tangente :  [juge equiv]  départ : (t³ − 12t + 1)′/(t²)′
    = (3t² − 12)/(2t)   ← ẏ/ẋ
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 12 = 0
    = t = −2 ou t = 2   ← Racines
  — Point de tangente horizontale pour t = 2 :  [juge value]  départ : 2³ − 12·2 + 1
    = −15   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  aides : La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. | ẏ = 0 ⇔ t = ▢ | t = ±2 : tangente horizontale.

```

### Niveau 5

```
Étudie la courbe paramétrée x(t) = t² + 1, y(t) = t³ − 3t − 3 : tangentes horizontales et verticales, point double.
  [free, sans aide]  (t² + 1)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 3t − 3)′
    = 3t² − 3   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1² + 1
    = 2   ← Calculer
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1³ − 3·1 − 3
    = −5   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point double : x(t) = x(s) avec s ≠ t donne s = −t ; alors y(t) = y(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  — Point double : coordonnée x (l'autre vaut −3)  [juge value]  départ : (√3)² + 1
    = 4   ← Calculer

Soit la courbe γ(t) = (t² − 2 ; t³ − 3t + 3), t ∈ ℝ. Trouve ses tangentes horizontales et verticales et son point double.
  [free, sans aide]  (t² − 2)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 3t + 3)′
    = 3t² − 3   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1² − 2
    = −1   ← Calculer
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1³ − 3·1 + 3
    = 1   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point double : x(t) = x(s) avec s ≠ t donne s = −t ; alors y(t) = y(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  — Point double : coordonnée x (l'autre vaut 3)  [juge value]  départ : (√3)² − 2
    = 1   ← Calculer

Étudie la courbe paramétrée x(t) = t² − 3, y(t) = t³ − 3t + 1 : tangentes horizontales et verticales, point double.
  [free, sans aide]  (t² − 3)′
    (Dérive x(t) :)
    = 2t   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t³ − 3t + 1)′
    = 3t² − 3   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1² − 3
    = −2   ← Calculer
  — Point de tangente horizontale pour t = 1 :  [juge value]  départ : 1³ − 3·1 + 1
    = −1   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point double : x(t) = x(s) avec s ≠ t donne s = −t ; alors y(t) = y(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines
  — Point double : coordonnée x (l'autre vaut 1)  [juge value]  départ : (√3)² − 3
    = 0   ← Calculer

```

### Variantes d'examen

```
En quels points la courbe x(t) = t³ − 12t, y(t) = t² − 3 a-t-elle une tangente horizontale ?
  ✔ (0 ; −3)   · (16 ; 1) et (−16 ; 1)   · t = 0   · (0 ; −3) et (−16 ; 1)
  [examen mcq]

Soit la courbe γ(t) = (t³ − 3t − 1 ; t² + 2), t ∈ ℝ. Trouve ses tangentes horizontales et verticales et son point double.
  [free, sans aide, examen open]  (t³ − 3t − 1)′
    (Dérive x(t) :)
    = 3t² − 3   ← Dériver
  — Dérive y(t) :  [juge equiv]  départ : (t² + 2)′
    = 2t   ← Dériver
  — Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t)  [juge solset]  départ : 2t = 0
    = t = 0   ← Racine
  — Point de tangente horizontale pour t = 0 :  [juge value]  départ : 0² + 2
    = 2   ← Calculer
  — Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t)  [juge solset]  départ : 3t² − 3 = 0
    = t = −1 ou t = 1   ← Racines
  — Point double : y(t) = y(s) avec s ≠ t donne s = −t ; alors x(t) = x(−t) donne, pour t ≠ 0 :  [juge solset]  départ : 2t³ − 6t = 0
    = t² = 3   ← Diviser par 2t
    = t = −√3 ou t = √3   ← Racines

```

## Courbe polaire ρ = f(φ) : limites, pente, tangentes (problème long) (`a1-polar-curve`, BA1)

_x = ρ cos φ, y = ρ sin φ : limites, ρ̇, pente, tangentes horizontales._

### Niveau 1

```
Courbe polaire ρ(φ) = 5tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente.
  [guided]  (5tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = (5/2)(1 + tan(φ/2)²)   ← Dériver
    = 5/(□)   (trous : 5/(1 + cos(φ)))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·sin(φ)
    = 5sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 5(1 − □)   (trous : 5(1 − cos(φ)))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = □   (trous : 10)   ← Passer à la limite
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 5(1 − ▢) | y → 10 : asymptote horizontale y = 10.
  pièges : g6_chain_forgot

On étudie la courbe polaire ρ = 4/(1 + cos(φ)), φ ∈ ]−π ; π[.
  [guided]  (4/(1 + cos(φ)))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 4sin(φ)/(1 + cos(φ))²   ← Dériver
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4sin(φ)/(1 + cos(φ))
    = 4tan(φ/2)   ← tan(φ/2) = sin φ/(1 + cos φ)
    = □   (trous : ∞)   ← Passer à la limite
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 4·▢ | x → −∞ et y → +∞ : pas d'asymptote.
  pièges : g6_quotient_sign, g6_quotient_no_square

Courbe polaire ρ(φ) = 5tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente.
  [guided]  (5tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = (5/2)(1 + tan(φ/2)²)   ← Dériver
    = 5/(□)   (trous : 5/(1 + cos(φ)))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·sin(φ)
    = 5sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 5(1 − □)   (trous : 5(1 − cos(φ)))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = □   (trous : 10)   ← Passer à la limite
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 5(1 − ▢) | y → 10 : asymptote horizontale y = 10.
  pièges : g6_chain_forgot

```

### Niveau 2

```
Courbe polaire ρ(φ) = 5tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente.
  [guided]  (5tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = (5/2)(1 + tan(φ/2)²)   ← Dériver
    = 5/(□)   (trous : 5/(1 + cos(φ)))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·sin(φ)
    = 5sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 5(1 − □)   (trous : 5(1 − cos(φ)))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 10   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 5tan(φ/2) et ρ̇ = 5/(1 + cos(φ)) :  [juge equiv]  départ : (5/(1 + cos(φ))·sin(φ) + 5tan(φ/2)·cos(φ))/(5/(1 + cos(φ))·cos(φ) − 5tan(φ/2)·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/5
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 5(1 − ▢) | y → 10 : asymptote horizontale y = 10.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

On étudie la courbe polaire ρ = 4tan(φ/2), φ ∈ [0 ; π[.
  [guided]  (4tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2(1 + tan(φ/2)²)   ← Dériver
    = 4/(□)   (trous : 4/(1 + cos(φ)))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·sin(φ)
    = 4sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 4(1 − □)   (trous : 4(1 − cos(φ)))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 8   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) :  [juge equiv]  départ : (4/(1 + cos(φ))·sin(φ) + 4tan(φ/2)·cos(φ))/(4/(1 + cos(φ))·cos(φ) − 4tan(φ/2)·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/4
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 4(1 − ▢) | y → 8 : asymptote horizontale y = 8.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

On étudie la courbe polaire ρ = 4/(1 + cos(φ)), φ ∈ ]−π ; π[.
  [guided]  (4/(1 + cos(φ)))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 4sin(φ)/(1 + cos(φ))²   ← Dériver
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4cos(φ)/(1 + cos(φ))
    = −∞   ← cos φ → −1, 1 + cos φ → 0⁺
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4sin(φ)/(1 + cos(φ))
    = 4tan(φ/2)   ← tan(φ/2) = sin φ/(1 + cos φ)
    = ∞   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4/(1 + cos(φ)) et ρ̇ = 4sin(φ)/(1 + cos(φ))² :  [juge equiv]  départ : (4sin(φ)/(1 + cos(φ))²·sin(φ) + 4/(1 + cos(φ))·cos(φ))/(4sin(φ)/(1 + cos(φ))²·cos(φ) − 4/(1 + cos(φ))·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ)² + cos(φ)(1 + cos(φ)))/(sin(φ)cos(φ) − sin(φ)(1 + cos(φ)))   ← Multiplier haut et bas par (1 + cos φ)²/4
    = −(1 + cos(φ))/sin(φ)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 4·▢ | x → −∞ et y → +∞ : pas d'asymptote.
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_polar_slope_naive, g6_param_slope_inverted

```

### Niveau 3

```
Courbe polaire ρ(φ) = 4tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente.
  [tap, suivre l'erreur, menu steps]  (4tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2(1 + tan(φ/2)²)   ← Dériver
    = 4/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·sin(φ)
    = 4sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 4(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 8   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) :  [juge equiv]  départ : (4/(1 + cos(φ))·sin(φ) + 4tan(φ/2)·cos(φ))/(4/(1 + cos(φ))·cos(φ) − 4tan(φ/2)·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/4
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 4(1 − ▢) | y → 8 : asymptote horizontale y = 8.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

Courbe polaire ρ(φ) = 2tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente.
  [tap, suivre l'erreur, menu steps]  (2tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 1 + tan(φ/2)²   ← Dériver
    = 2/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·sin(φ)
    = 2sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 2(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 4   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 2tan(φ/2) et ρ̇ = 2/(1 + cos(φ)) :  [juge equiv]  départ : (2/(1 + cos(φ))·sin(φ) + 2tan(φ/2)·cos(φ))/(2/(1 + cos(φ))·cos(φ) − 2tan(φ/2)·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/2
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 2(1 − ▢) | y → 4 : asymptote horizontale y = 4.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

On étudie la courbe polaire ρ = 2tan(φ/2), φ ∈ [0 ; π[.
  [tap, suivre l'erreur, menu steps]  (2tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 1 + tan(φ/2)²   ← Dériver
    = 2/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·sin(φ)
    = 2sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 2(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 4   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 2tan(φ/2) et ρ̇ = 2/(1 + cos(φ)) :  [juge equiv]  départ : (2/(1 + cos(φ))·sin(φ) + 2tan(φ/2)·cos(φ))/(2/(1 + cos(φ))·cos(φ) − 2tan(φ/2)·sin(φ))
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/2
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 2(1 − ▢) | y → 4 : asymptote horizontale y = 4.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

```

### Niveau 4

```
On étudie la courbe polaire ρ = 5tan(φ/2), φ ∈ [0 ; π[.
  [free, suivre l'erreur]  (5tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = (5/2)(1 + tan(φ/2)²)   ← Dériver
    = 5/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·sin(φ)
    = 5sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 5(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 10   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 5tan(φ/2) et ρ̇ = 5/(1 + cos(φ)) :  [juge equiv]  départ : (5/(1 + cos(φ))·sin(φ) + 5tan(φ/2)·cos(φ))/(5/(1 + cos(φ))·cos(φ) − 5tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 10 / · Asymptote horizontale y = 5 / · Asymptote verticale x = −10 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/5
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (5(1 − cos(φ)))′
    = 5sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 5(1 − cos(π/2))
    = 5   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 5sin(φ) = 0
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 5(1 − ▢) | y → 10 : asymptote horizontale y = 10.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

On étudie la courbe polaire ρ = 4tan(φ/2), φ ∈ [0 ; π[.
  [free, suivre l'erreur]  (4tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2(1 + tan(φ/2)²)   ← Dériver
    = 4/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·sin(φ)
    = 4sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 4(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 8   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) :  [juge equiv]  départ : (4/(1 + cos(φ))·sin(φ) + 4tan(φ/2)·cos(φ))/(4/(1 + cos(φ))·cos(φ) − 4tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 8 / · Asymptote horizontale y = 4 / · Asymptote verticale x = −8 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/4
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (4(1 − cos(φ)))′
    = 4sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 4(1 − cos(π/2))
    = 4   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 4sin(φ) = 0
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 4(1 − ▢) | y → 8 : asymptote horizontale y = 8.
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

Courbe polaire ρ(φ) = 2/(1 + cos(φ)) pour φ ∈ ]−π ; π[ : limites quand φ → π⁻, ρ̇, pente, point sur Oy, tangentes horizontales.
  [free, suivre l'erreur]  (2/(1 + cos(φ)))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2sin(φ)/(1 + cos(φ))²   ← Dériver
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 2cos(φ)/(1 + cos(φ))
    = −∞   ← cos φ → −1, 1 + cos φ → 0⁺
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 2sin(φ)/(1 + cos(φ))
    = 2tan(φ/2)   ← tan(φ/2) = sin φ/(1 + cos φ)
    = ∞   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 2/(1 + cos(φ)) et ρ̇ = 2sin(φ)/(1 + cos(φ))² :  [juge equiv]  départ : (2sin(φ)/(1 + cos(φ))²·sin(φ) + 2/(1 + cos(φ))·cos(φ))/(2sin(φ)/(1 + cos(φ))²·cos(φ) − 2/(1 + cos(φ))·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Pas d'asymptote : x → −∞ et y → +∞ / · Asymptote horizontale y = 4 / · Asymptote verticale x = −2 / · Asymptote horizontale y = 2
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ)² + cos(φ)(1 + cos(φ)))/(sin(φ)cos(φ) − sin(φ)(1 + cos(φ)))   ← Multiplier haut et bas par (1 + cos φ)²/2
    = −(1 + cos(φ))/sin(φ)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (2tan(φ/2))′
    = 2/(1 + cos(φ))   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 2sin(π/2)/(1 + cos(π/2))
    = 2   ← Calculer
  — (d) Pente en P :  [juge value]  départ : −(1 + cos(π/2))/sin(π/2)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur ]−π ; π[  [juge solset]  départ : 2/(1 + cos(φ)) = 0
    = ∅   ← 1/(1 + cos φ) ne s'annule jamais
  aides : Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). | y = 2·▢ | x → −∞ et y → +∞ : pas d'asymptote.
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_polar_slope_naive, g6_param_slope_inverted

```

### Niveau 5

```
Courbe polaire ρ(φ) = 4tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente, point sur Oy, tangentes horizontales.
  [free, sans aide]  (4tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2(1 + tan(φ/2)²)   ← Dériver
    = 4/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·sin(φ)
    = 4sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 4(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 8   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) :  [juge equiv]  départ : (4/(1 + cos(φ))·sin(φ) + 4tan(φ/2)·cos(φ))/(4/(1 + cos(φ))·cos(φ) − 4tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 8 / · Asymptote horizontale y = 4 / · Asymptote verticale x = −8 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/4
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (4(1 − cos(φ)))′
    = 4sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 4(1 − cos(π/2))
    = 4   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 4sin(φ) = 0
    ? Esquisse : quelle description convient ? ✔ Part de l'origine, passe par (0 ; 4), puis file vers x → −∞ en s'approchant de la droite y = 8 / · Part de l'origine, passe par (0 ; 4), puis file vers x → +∞ en s'approchant de la droite y = 8 / · Part de l'origine, passe par (0 ; 4), puis file vers x → −∞ en s'approchant de la droite y = 4 / · Courbe fermée qui passe par l'origine et par (0 ; 4)
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

Courbe polaire ρ(φ) = 5tan(φ/2) pour φ ∈ [0 ; π[ : limites quand φ → π⁻, ρ̇, pente, point sur Oy, tangentes horizontales.
  [free, sans aide]  (5tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = (5/2)(1 + tan(φ/2)²)   ← Dériver
    = 5/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 5tan(φ/2)·sin(φ)
    = 5sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 5(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 10   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 5tan(φ/2) et ρ̇ = 5/(1 + cos(φ)) :  [juge equiv]  départ : (5/(1 + cos(φ))·sin(φ) + 5tan(φ/2)·cos(φ))/(5/(1 + cos(φ))·cos(φ) − 5tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 10 / · Asymptote horizontale y = 5 / · Asymptote verticale x = −10 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/5
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (5(1 − cos(φ)))′
    = 5sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 5(1 − cos(π/2))
    = 5   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 5sin(φ) = 0
    ? Esquisse : quelle description convient ? ✔ Part de l'origine, passe par (0 ; 5), puis file vers x → −∞ en s'approchant de la droite y = 10 / · Part de l'origine, passe par (0 ; 5), puis file vers x → +∞ en s'approchant de la droite y = 10 / · Part de l'origine, passe par (0 ; 5), puis file vers x → −∞ en s'approchant de la droite y = 5 / · Courbe fermée qui passe par l'origine et par (0 ; 5)
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

On étudie la courbe polaire ρ = 2tan(φ/2), φ ∈ [0 ; π[.
  [free, sans aide]  (2tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 1 + tan(φ/2)²   ← Dériver
    = 2/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 2tan(φ/2)·sin(φ)
    = 2sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 2(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 4   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 2tan(φ/2) et ρ̇ = 2/(1 + cos(φ)) :  [juge equiv]  départ : (2/(1 + cos(φ))·sin(φ) + 2tan(φ/2)·cos(φ))/(2/(1 + cos(φ))·cos(φ) − 2tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 4 / · Asymptote horizontale y = 2 / · Asymptote verticale x = −4 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/2
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (2(1 − cos(φ)))′
    = 2sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 2(1 − cos(π/2))
    = 2   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 2sin(φ) = 0
    ? Esquisse : quelle description convient ? ✔ Part de l'origine, passe par (0 ; 2), puis file vers x → −∞ en s'approchant de la droite y = 4 / · Part de l'origine, passe par (0 ; 2), puis file vers x → +∞ en s'approchant de la droite y = 4 / · Part de l'origine, passe par (0 ; 2), puis file vers x → −∞ en s'approchant de la droite y = 2 / · Courbe fermée qui passe par l'origine et par (0 ; 2)
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

```

### Variantes d'examen

```
On étudie la courbe polaire ρ = 4tan(φ/2), φ ∈ [0 ; π[.
  [free, sans aide, examen open]  (4tan(φ/2))′
    (x = ρ cos φ, y = ρ sin φ. Formule : tan(φ/2) = sin φ/(1 + cos φ).)
    ((a) Dérive ρ et simplifie :)
    = 2(1 + tan(φ/2)²)   ← Dériver
    = 4/(1 + cos(φ))   ← 1 + tan²(φ/2) = 2/(1 + cos φ)
  — (b) Limite de x = ρ cos φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·cos(φ)
    = −∞   ← tan(φ/2) → +∞, cos φ → −1
  — (b) Limite de y = ρ sin φ quand φ → π⁻ :  [juge limit]  départ : 4tan(φ/2)·sin(φ)
    = 4sin(φ)²/(1 + cos(φ))   ← tan(φ/2) = sin φ/(1 + cos φ)
    = 4(1 − cos(φ))   ← sin²φ = (1 − cos φ)(1 + cos φ)
    = 8   ← Passer à la limite
  — (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) :  [juge equiv]  départ : (4/(1 + cos(φ))·sin(φ) + 4tan(φ/2)·cos(φ))/(4/(1 + cos(φ))·cos(φ) − 4tan(φ/2)·sin(φ))
    ? Quand φ → π⁻, que dit-on de la courbe ? ✔ Asymptote horizontale y = 8 / · Asymptote horizontale y = 4 / · Asymptote verticale x = −8 / · Pas d'asymptote
    ? La pente de la tangente, avec x = ρ cos φ et y = ρ sin φ : ✔ y′ = ẏ/ẋ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) / · y′ = ρ̇ / · y′ = ρ̇/ρ / · y′ = ẋ/ẏ
    = (sin(φ) + sin(φ)cos(φ))/(cos(φ) − sin(φ)²)   ← Multiplier haut et bas par (1 + cos φ)/4
    = sin(φ)(1 + cos(φ))/(cos(φ)² + cos(φ) − 1)   ← Simplifier
  — (c) Au passage, ẏ (dérive y simplifié) :  [juge equiv]  départ : (4(1 − cos(φ)))′
    = 4sin(φ)   ← Dériver
  — (d) Point P sur l'axe Oy : φ = π/2.  [juge value]  départ : 4(1 − cos(π/2))
    = 4   ← Calculer
  — (d) Pente en P :  [juge value]  départ : sin(π/2)(1 + cos(π/2))/(cos(π/2)² + cos(π/2) − 1)
    = −1   ← Calculer
  — (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[  [juge solset]  départ : 4sin(φ) = 0
    ? Esquisse : quelle description convient ? ✔ Part de l'origine, passe par (0 ; 4), puis file vers x → −∞ en s'approchant de la droite y = 8 / · Part de l'origine, passe par (0 ; 4), puis file vers x → +∞ en s'approchant de la droite y = 8 / · Part de l'origine, passe par (0 ; 4), puis file vers x → −∞ en s'approchant de la droite y = 4 / · Courbe fermée qui passe par l'origine et par (0 ; 4)
    = φ = 0   ← sin φ = 0 ; ẋ(0) ≠ 0 : l'origine
  pièges : g6_chain_forgot, a1_polar_slope_naive, g6_param_slope_inverted

```

## DL usuels en 0, notation xⁿ·ε(x) (`a1-dl-usual`, BA1)

_eˣ, sin, cos, Log(1 + x), (1 + x)^α, 1/(1 − x), Arctg, sinh, cosh._

### Niveau 1

```
Écris le DL d'ordre 5 de √(1 − x) en 0. Rappel : (1 + u)^α = 1 + αu + α(α − 1)/2!·u² + α(α − 1)(α − 2)/3!·u³ + … + uⁿ·ε(u), ici α = 1/2.
  [guided]  √(1 − x)
    = 1 + (□)/2 − (−x)²/8 + (−x)³/16 − (5/128)(−x)⁴ + (7/256)(−x)⁵ + x⁵ε(x)   (trous : 1 + (−x)/2 − (−x)²/8 + (−x)³/16 − (5/128)(−x)⁴ + (7/256)(−x)⁵ + x⁵ε(x))   ← DL de √(1 + u) = (1 + u)^(1/2) avec u = −x
    = 1 − x/□ − x²/□ − x³/□ − □x⁴ − □x⁵ + x⁵ε(x)   (trous : 1 − x/2 − x²/8 − x³/16 − (5/128)x⁴ − (7/256)x⁵ + x⁵ε(x))   ← Puissances calculées, termes jusqu'à x⁵
  aides : C'est √(1 + u) = (1 + u)^(1/2) avec u = −x : écris son DL, puis remplace u. | 1 − x/□ − x²/□ − x³/□ − □x⁴ − □x⁵ + x⁵ε(x) | 1 − x/2 − x²/8 − x³/16 − (5/128)x⁴ − (7/256)x⁵ + x⁵ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 5 de 1/(1 − x/2) en 0. Rappel : 1/(1 − u) = 1 + u + u² + u³ + … + uⁿ + uⁿ·ε(u).
  [guided]  1/(1 − x/2)
    = 1 + (□) + (x/2)² + (x/2)³ + (x/2)⁴ + (x/2)⁵ + x⁵ε(x)   (trous : 1 + (x/2) + (x/2)² + (x/2)³ + (x/2)⁴ + (x/2)⁵ + x⁵ε(x))   ← DL de 1/(1 − u) avec u = x/2
    = 1 + x/□ + x²/□ + x³/□ + x⁴/□ + x⁵/□ + x⁵ε(x)   (trous : 1 + x/2 + x²/4 + x³/8 + x⁴/16 + x⁵/32 + x⁵ε(x))   ← Puissances calculées, termes jusqu'à x⁵
  aides : C'est 1/(1 − u) avec u = x/2 : écris son DL, puis remplace u. | 1 + x/□ + x²/□ + x³/□ + x⁴/□ + x⁵/□ + x⁵ε(x) | 1 + x/2 + x²/4 + x³/8 + x⁴/16 + x⁵/32 + x⁵ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 6 de 1/(1 − 3x²) en 0. Rappel : 1/(1 − u) = 1 + u + u² + u³ + … + uⁿ + uⁿ·ε(u).
  [guided]  1/(1 − 3x²)
    = 1 + (□) + (3x²)² + (3x²)³ + x⁶ε(x)   (trous : 1 + (3x²) + (3x²)² + (3x²)³ + x⁶ε(x))   ← DL de 1/(1 − u) avec u = 3x²
    = 1 + □x² + □x⁴ + □x⁶ + x⁶ε(x)   (trous : 1 + 3x² + 9x⁴ + 27x⁶ + x⁶ε(x))   ← Puissances calculées, termes jusqu'à x⁶
  aides : C'est 1/(1 − u) avec u = 3x² : écris son DL, puis remplace u. | 1 + □x² + □x⁴ + □x⁶ + x⁶ε(x) | 1 + 3x² + 9x⁴ + 27x⁶ + x⁶ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Niveau 2

```
Écris le DL d'ordre 3 de e^(3x) en 0. Rappel : eᵘ = 1 + u + u²/2! + u³/3! + … + uⁿ/n! + uⁿ·ε(u).
  [guided]  e^(3x)
    ? Quel DL de référence ? · sin u avec u = 3x / · cosh u avec u = 3x / ✔ eᵘ avec u = 3x
    = 1 + □ + □ + □ + x³ε(x)   (trous : 1 + (3x) + (3x)²/2 + (3x)³/6 + x³ε(x))   ← DL de eᵘ avec u = 3x
    = □ + □ + □ + □ + x³ε(x)   (trous : 1 + 3x + (9/2)x² + (9/2)x³ + x³ε(x))   ← Puissances calculées, termes jusqu'à x³
  aides : C'est eᵘ avec u = 3x : écris son DL, puis remplace u. | 1 + □x + □x² + □x³ + x³ε(x) | 1 + 3x + (9/2)x² + (9/2)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 4 de sinh(−2x) en 0. Rappel : sinh u = u + u³/3! + u⁵/5! + … + uⁿ·ε(u).
  [guided]  sinh(−2x)
    ? Quel DL de référence ? · eᵘ avec u = −2x / ✔ sinh u avec u = −2x / · cosh u avec u = −2x
    = (−2x) + □ + x⁴ε(x)   (trous : (−2x) + (−2x)³/6 + x⁴ε(x))   ← DL de sinh u avec u = −2x
    = □ − □ + x⁴ε(x)   (trous : −2x − (4/3)x³ + x⁴ε(x))   ← Puissances calculées, termes jusqu'à x⁴
  aides : C'est sinh u avec u = −2x : écris son DL, puis remplace u. | −2x − □x³ + x⁴ε(x) | −2x − (4/3)x³ + x⁴ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 5 de arctan(−x) en 0. Rappel : Arctg u = u − u³/3 + u⁵/5 − … + uⁿ·ε(u).
  [guided]  arctan(−x)
    ? Quel DL de référence ? ✔ Arctg u avec u = −x / · sinh u avec u = −x / · 1/(1 − u) avec u = −x
    = (−x) − □ + □ + x⁵ε(x)   (trous : (−x) − (−x)³/3 + (−x)⁵/5 + x⁵ε(x))   ← DL de Arctg u avec u = −x
    = −□ + □ − □ + x⁵ε(x)   (trous : −x + x³/3 − x⁵/5 + x⁵ε(x))   ← Puissances calculées, termes jusqu'à x⁵
  aides : C'est Arctg u avec u = −x : écris son DL, puis remplace u. | −x + x³/□ − x⁵/□ + x⁵ε(x) | −x + x³/3 − x⁵/5 + x⁵ε(x)
  pièges : a1_dl_remainder_wrong_order

```

### Niveau 3

```
Écris le DL d'ordre 3 de arctan(−x) en 0.
  [tap, suivre l'erreur, menu steps]  arctan(−x)
    = (−x) − (−x)³/3 + x³ε(x)   ← DL de Arctg u avec u = −x
    = −x + x³/3 + x³ε(x)   ← Puissances calculées, termes jusqu'à x³
  aides : C'est Arctg u avec u = −x : écris son DL, puis remplace u. | −x + x³/□ + x³ε(x) | −x + x³/3 + x³ε(x)
  pièges : a1_dl_remainder_wrong_order

Écris le DL d'ordre 6 de sinh(−x²) en 0.
  [tap, suivre l'erreur, menu steps]  sinh(−x²)
    = (−x²) + (−x²)³/6 + x⁶ε(x)   ← DL de sinh u avec u = −x²
    = −x² − x⁶/6 + x⁶ε(x)   ← Puissances calculées, termes jusqu'à x⁶
  aides : C'est sinh u avec u = −x² : écris son DL, puis remplace u. | −x² − x⁶/□ + x⁶ε(x) | −x² − x⁶/6 + x⁶ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 3 de e^(2x) en 0.
  [tap, suivre l'erreur, menu steps]  e^(2x)
    = 1 + (2x) + (2x)²/2 + (2x)³/6 + x³ε(x)   ← DL de eᵘ avec u = 2x
    = 1 + 2x + 2x² + (4/3)x³ + x³ε(x)   ← Puissances calculées, termes jusqu'à x³
  aides : C'est eᵘ avec u = 2x : écris son DL, puis remplace u. | 1 + □x + □x² + □x³ + x³ε(x) | 1 + 2x + 2x² + (4/3)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Niveau 4

```
Écris le DL d'ordre 5 de 1/(1 − 2x) en 0.
  [free, suivre l'erreur]  1/(1 − 2x)
    = 1 − (−2x) + (−2x)² − (−2x)³ + (−2x)⁴ − (−2x)⁵ + x⁵ε(x)   ← DL de 1/(1 + u) = (1 + u)^(−1) avec u = −2x
    = 1 + 2x + 4x² + 8x³ + 16x⁴ + 32x⁵ + x⁵ε(x)   ← Puissances calculées, termes jusqu'à x⁵
  aides : C'est 1/(1 + u) = (1 + u)^−1 avec u = −2x : écris son DL, puis remplace u. | 1 + □x + □x² + □x³ + □x⁴ + □x⁵ + x⁵ε(x) | 1 + 2x + 4x² + 8x³ + 16x⁴ + 32x⁵ + x⁵ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 4 de cosh(3x²) en 0.
  [free, suivre l'erreur]  cosh(3x²)
    = 1 + (3x²)²/2 + x⁴ε(x)   ← DL de cosh u avec u = 3x²
    = 1 + (9/2)x⁴ + x⁴ε(x)   ← Puissances calculées, termes jusqu'à x⁴
  aides : C'est cosh u avec u = 3x² : écris son DL, puis remplace u. | 1 + □x⁴ + x⁴ε(x) | 1 + (9/2)x⁴ + x⁴ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Écris le DL d'ordre 2 de cosh(2x) en 0.
  [free, suivre l'erreur]  cosh(2x)
    = 1 + (2x)²/2 + x²ε(x)   ← DL de cosh u avec u = 2x
    = 1 + 2x² + x²ε(x)   ← Puissances calculées, termes jusqu'à x²
  aides : C'est cosh u avec u = 2x : écris son DL, puis remplace u. | 1 + □x² + x²ε(x) | 1 + 2x² + x²ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 5

```
Trois DL usuels en 0, sans aide. D'abord cosh(x²/2) à l'ordre 4.
  [free, sans aide]  cosh(x²/2)
    = 1 + x⁴/8 + x⁴ε(x)   ← DL usuel
  — DL d'ordre 3 de sin(3x) en 0 :  [juge series]  départ : sin(3x)
    = 3x − (9/2)x³ + x³ε(x)   ← DL usuel
  — DL d'ordre 6 de e^(3x²) en 0 :  [juge series]  départ : e^(3x²)
    = 1 + 3x² + (9/2)x⁴ + (9/2)x⁶ + x⁶ε(x)   ← DL usuel
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Trois DL usuels en 0, sans aide. D'abord sinh(−x) à l'ordre 5.
  [free, sans aide]  sinh(−x)
    = −x − x³/6 − x⁵/120 + x⁵ε(x)   ← DL usuel
  — DL d'ordre 5 de cosh(x/2) en 0 :  [juge series]  départ : cosh(x/2)
    = 1 + x²/8 + x⁴/384 + x⁵ε(x)   ← DL usuel
  — DL d'ordre 3 de e^(x/2) en 0 :  [juge series]  départ : e^(x/2)
    = 1 + x/2 + x²/8 + x³/48 + x³ε(x)   ← DL usuel
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Trois DL usuels en 0, sans aide. D'abord 1/(1 − 2x)² à l'ordre 4.
  [free, sans aide]  1/(1 − 2x)²
    = 1 + 4x + 12x² + 32x³ + 80x⁴ + x⁴ε(x)   ← DL usuel
  — DL d'ordre 4 de sinh(2x) en 0 :  [juge series]  départ : sinh(2x)
    = 2x + (4/3)x³ + x⁴ε(x)   ← DL usuel
  — DL d'ordre 2 de 1/(1 − x/2) en 0 :  [juge series]  départ : 1/(1 − x/2)
    = 1 + x/2 + x²/4 + x²ε(x)   ← DL usuel
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_cube_coeffs

```

### Variantes d'examen

```
Le DL d'ordre 3 de 1/(2 − 3x) en 0 est :
  ✔ 1/2 + (3/4)x + (9/8)x² + (27/16)x³ + x³ε(x)   · 1/2 + (3/2)x + (9/2)x² + (27/2)x³ + x³ε(x) [a1_dl_factor_out_constant]   · 1/2 − (3/4)x + (9/8)x² − (27/16)x³ + x³ε(x)   · 1 + 3x + 9x² + 27x³ + x³ε(x) [a1_dl_factor_out_constant]
  [examen mcq]
  pièges : a1_dl_factor_out_constant

Vrai ou faux ?
  « Si f est paire et admet un DL d'ordre 4 en 0, alors les coefficients de x et de x³ de ce DL sont nuls. » → VRAI
  [examen tf]

```

## Somme, produit et quotient de DL (`a1-dl-ops`, BA1)

_Multiplier et ne garder que les termes de degré ≤ n ; 1/(1 + u)._

### Niveau 1

```
Écris le DL d'ordre 4 de sin(2x)·ln(1 + x) en 0.
  [guided]  sin(2x)·ln(1 + x)
    = (2x − □ + x⁴ε(x))·(x − x²/2 + x³/3 − □ + x⁴ε(x))   (trous : (2x − (4/3)x³ + x⁴ε(x))·(x − x²/2 + x³/3 − x⁴/4 + x⁴ε(x)))   ← DL des deux facteurs
    = 2x² − x³ + (2/3)x⁴ − (4/3)x⁴ + x⁴ε(x)   ← Développer, garder les termes de degré ≤ 4
    = 2x² − □ − □x⁴ + x⁴ε(x)   (trous : 2x² − x³ − (2/3)x⁴ + x⁴ε(x))   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 4. | 2x² − □ − □x⁴ + x⁴ε(x) | 2x² − x³ − (2/3)x⁴ + x⁴ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 3 de sin(2x)·ln(1 + x) en 0.
  [guided]  sin(2x)·ln(1 + x)
    = (2x − □ + x³ε(x))·(x − x²/2 + □ + x³ε(x))   (trous : (2x − (4/3)x³ + x³ε(x))·(x − x²/2 + x³/3 + x³ε(x)))   ← DL des deux facteurs
    = 2x² − □ + x³ε(x)   (trous : 2x² − x³ + x³ε(x))   ← Développer, garder les termes de degré ≤ 3
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 3. | 2x² − □ + x³ε(x) | 2x² − x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 3 de e^(2x)·cos(3x) en 0.
  [guided]  e^(2x)·cos(3x)
    = (1 + 2x + 2x² + □ + x³ε(x))·(1 − □ + x³ε(x))   (trous : (1 + 2x + 2x² + (4/3)x³ + x³ε(x))·(1 − (9/2)x² + x³ε(x)))   ← DL des deux facteurs
    = 1 + 2x − (9/2)x² + 2x² − 9x³ + (4/3)x³ + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
    = 1 + □x − □x² − □x³ + x³ε(x)   (trous : 1 + 2x − (5/2)x² − (23/3)x³ + x³ε(x))   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 3. | 1 + □x − □x² − □x³ + x³ε(x) | 1 + 2x − (5/2)x² − (23/3)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 2

```
Écris le DL d'ordre 3 de cos(2x)·ln(1 + 2x) en 0.
  [guided]  cos(2x)·ln(1 + 2x)
    ? Jusqu'où développer chaque facteur ? · Jusqu'à x² / ✔ Ne pas développer : dériver 3 fois / ✔ Jusqu'à x³
    = (□ + x³ε(x))·(□ + x³ε(x))   (trous : (1 − 2x² + x³ε(x))·(2x − 2x² + (8/3)x³ + x³ε(x)))   ← DL des deux facteurs
    = 2x − 2x² + (8/3)x³ − 4x³ + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
    = 2x − □ − □ + x³ε(x)   (trous : 2x − 2x² − (4/3)x³ + x³ε(x))   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 3. | 2x − □x² − □x³ + x³ε(x) | 2x − 2x² − (4/3)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 4 de e^(2x)·sin(x) en 0.
  [guided]  e^(2x)·sin(x)
    ? Jusqu'où développer chaque facteur ? · Jusqu'à x³ / ✔ Ne pas développer : dériver 4 fois / ✔ Jusqu'à x⁴
    = (□ + x⁴ε(x))·(□ + x⁴ε(x))   (trous : (1 + 2x + 2x² + (4/3)x³ + (2/3)x⁴ + x⁴ε(x))·(x − x³/6 + x⁴ε(x)))   ← DL des deux facteurs
    = x + 2x² − x³/6 + 2x³ − x⁴/3 + (4/3)x⁴ + x⁴ε(x)   ← Développer, garder les termes de degré ≤ 4
    = x + □ + □ + □ + x⁴ε(x)   (trous : x + 2x² + (11/6)x³ + x⁴ + x⁴ε(x))   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 4. | x + □x² + □x³ + □ + x⁴ε(x) | x + 2x² + (11/6)x³ + x⁴ + x⁴ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 2 de √(1 + x)·e^(2x) en 0.
  [guided]  √(1 + x)·e^(2x)
    ? Jusqu'où développer chaque facteur ? · Jusqu'à x / ✔ Ne pas développer : dériver 2 fois / ✔ Jusqu'à x²
    = (□ + x²ε(x))·(□ + x²ε(x))   (trous : (1 + x/2 − x²/8 + x²ε(x))·(1 + 2x + 2x² + x²ε(x)))   ← DL des deux facteurs
    = 1 + 2x + x/2 + 2x² + x² − x²/8 + x²ε(x)   ← Développer, garder les termes de degré ≤ 2
    = 1 + □ + □ + x²ε(x)   (trous : 1 + (5/2)x + (23/8)x² + x²ε(x))   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 2. | 1 + □x + □x² + x²ε(x) | 1 + (5/2)x + (23/8)x² + x²ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 3

```
Écris le DL d'ordre 3 de sin(2x)/(1 − x²) en 0.
  [tap, suivre l'erreur, menu steps]  sin(2x)/(1 − x²)
    = (2x − (4/3)x³)·(1 − (−x²)) + x³ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = 2x + (2/3)x³ + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
  aides : Développe le haut et le bas, mets le dénominateur sous la forme c(1 + u), puis 1/(1 + u) = 1 − u + u² − … | 2x + □x³ + x³ε(x) | 2x + (2/3)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 2 de 1/(1 + e^(−x)) en 0.
  [tap, suivre l'erreur, menu steps]  1/(1 + e^(−x))
    = 1/(2 − x + x²/2 + x²ε(x))   ← DL du numérateur et du dénominateur
    = (1/2)·(1 − (−x/2 + x²/4) + (−x/2 + x²/4)²) + x²ε(x)   ← Constante 2 en facteur, puis 1/(1 + u) = 1 − u + u² − …
    = 1/2 + x/4 + x²ε(x)   ← Développer, garder les termes de degré ≤ 2
  aides : Développe le haut et le bas, mets le dénominateur sous la forme c(1 + u), puis 1/(1 + u) = 1 − u + u² − … | 1/2 + x/□ + x²ε(x) | 1/2 + x/4 + x²ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_factor_out_constant, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 3 de sin(x)/(1 + x²) en 0.
  [tap, suivre l'erreur, menu steps]  sin(x)/(1 + x²)
    = (x − x³/6)·(1 − (x²)) + x³ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = x − (7/6)x³ + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
  aides : Développe le haut et le bas, mets le dénominateur sous la forme c(1 + u), puis 1/(1 + u) = 1 − u + u² − … | x − □x³ + x³ε(x) | x − (7/6)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 4

```
Écris le DL d'ordre 3 de √(1 + x)·e^(−x) en 0.
  [free, suivre l'erreur]  √(1 + x)·e^(−x)
    = (1 + x/2 − x²/8 + x³/16 + x³ε(x))·(1 − x + x²/2 − x³/6 + x³ε(x))   ← DL des deux facteurs
    = 1 − x + x/2 + x²/2 − x²/2 − x²/8 − x³/6 + x³/4 + x³/8 + x³/16 + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
    = 1 − x/2 − x²/8 + (13/48)x³ + x³ε(x)   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 3. | 1 − x/□ − x²/□ + □x³ + x³ε(x) | 1 − x/2 − x²/8 + (13/48)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 3 de cos(x)·ln(1 + 2x) en 0.
  [free, suivre l'erreur]  cos(x)·ln(1 + 2x)
    = (1 − x²/2 + x³ε(x))·(2x − 2x² + (8/3)x³ + x³ε(x))   ← DL des deux facteurs
    = 2x − 2x² + (8/3)x³ − x³ + x³ε(x)   ← Développer, garder les termes de degré ≤ 3
    = 2x − 2x² + (5/3)x³ + x³ε(x)   ← Réduire
  aides : Multiplie les deux DL et ne garde que les termes de degré ≤ 3. | 2x − □x² + □x³ + x³ε(x) | 2x − 2x² + (5/3)x³ + x³ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 2 de e^(2x)/(1 + x) en 0.
  [free, suivre l'erreur]  e^(2x)/(1 + x)
    = (1 + 2x + 2x²)·(1 − x + x²) + x²ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = 1 + x + x² + x²ε(x)   ← Développer, garder les termes de degré ≤ 2
  aides : Développe le haut et le bas, mets le dénominateur sous la forme c(1 + u), puis 1/(1 + u) = 1 − u + u² − … | 1 + □ + □ + x²ε(x) | 1 + x + x² + x²ε(x)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 5

```
Écris le DL d'ordre 4 de 1/(1 + e^(−x)) en 0.
  [free, sans aide]  1/(1 + e^(−x))
    = 1/(2 − x + x²/2 − x³/6 + x⁴/24 + x⁴ε(x))   ← DL du numérateur et du dénominateur
    = (1/2)·(1 − (−x/2 + x²/4 − x³/12 + x⁴/48) + (−x/2 + x²/4 − x³/12 + x⁴/48)² − (−x/2 + x²/4 − x³/12 + x⁴/48)³ + (−x/2 + x²/4 − x³/12 + x⁴/48)⁴) + x⁴ε(x)   ← Constante 2 en facteur, puis 1/(1 + u) = 1 − u + u² − …
    = 1/2 + x/4 − x³/48 + x⁴ε(x)   ← Développer, garder les termes de degré ≤ 4
  pièges : a1_dl_factorial_missing, a1_dl_factor_out_constant, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 4 de ln(1 − x²)/sin(x) en 0.
  [free, sans aide]  ln(1 − x²)/sin(x)
    = (−x² − x⁴/2 + x⁵ε(x))/(x − x³/6 + x⁵/120 + x⁵ε(x))   ← DL du numérateur et du dénominateur
    = (−x − x³/2 + x⁴ε(x))/(1 − x²/6 + x⁴/120 + x⁴ε(x))   ← Simplifier par x
    = (−x − x³/2)·(1 − (−x²/6 + x⁴/120) + (−x²/6 + x⁴/120)²) + x⁴ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = −x − (2/3)x³ + x⁴ε(x)   ← Développer, garder les termes de degré ≤ 4
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 5 de ln(1 − x²)/sin(x) en 0.
  [free, sans aide]  ln(1 − x²)/sin(x)
    = (−x² − x⁴/2 − x⁶/3 + x⁶ε(x))/(x − x³/6 + x⁵/120 + x⁶ε(x))   ← DL du numérateur et du dénominateur
    = (−x − x³/2 − x⁵/3 + x⁵ε(x))/(1 − x²/6 + x⁴/120 + x⁵ε(x))   ← Simplifier par x
    = (−x − x³/2 − x⁵/3)·(1 − (−x²/6 + x⁴/120) + (−x²/6 + x⁴/120)²) + x⁵ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = −x − (2/3)x³ − (157/360)x⁵ + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Variantes d'examen

```
Le DL d'ordre 5 de sin(2x)/(1 − x²) en 0 est :
  · 2x + (2/3)x³ − (16/15)x⁵ + x⁵ε(x) [a1_dl_truncate_early]   · 2x + (2/3)x³ + (2/3)x⁵ + x⁵ε(x) [a1_dl_truncate_early]   ✔ 2x + (2/3)x³ + (14/15)x⁵ + x⁵ε(x)   · 2x + (2/3)x³ − (14/15)x⁵ + x⁵ε(x)
  [examen mcq]
  pièges : a1_dl_truncate_early

Vrai ou faux ?
  « Pour tous réels b, c : si f(x) = 1 + bx + cx² + x²·ε(x), alors f(x)² = 1 + b²x + c²x² + x²·ε(x). » → FAUX
    contre-exemple (refute) : b = 1, c = 0
  [examen tf]
  pièges : a1_dl_cube_coeffs

```

## Composition de DL, y compris une constante intérieure non nulle (`a1-dl-compose`, BA1)

_u = g(x) → 0 ; sinon recentrer : e^(g) = e^c·e^(g − c)._

### Niveau 1

```
Vérifie d'abord la limite en 0 de u = tan(x), puis écris le DL d'ordre 3 de e^(tan(x)) en 0.
  [guided]  tan(x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de e^(tan(x)) en 0 :  [juge series]  départ : e^(tan(x))
    = 1 + (□) + (x + x³/3)²/2 + (x + x³/3)³/6 + x³ε(x)   (trous : 1 + (x + x³/3) + (x + x³/3)²/2 + (x + x³/3)³/6 + x³ε(x))   ← DL de eᵘ avec u = x + x³/3
    = 1 + (x + x³/3) + □ + □ + x³ε(x)   (trous : 1 + (x + x³/3) + x²/2 + x³/6 + x³ε(x))   ← Puissances de u, termes de degré ≤ 3
    = 1 + □ + x²/□ + x³/□ + x³ε(x)   (trous : 1 + x + x²/2 + x³/2 + x³ε(x))   ← Réduire
  aides : u = tan(x) tend vers 0 : remplace u par son DL dans celui de eᵘ, et garde dans uᵏ tous les termes de degré ≤ 3. | 1 + □ + x²/□ + x³/□ + x³ε(x) | 1 + x + x²/2 + x³/2 + x³ε(x)

Vérifie d'abord la limite en 0 de u = ln(1 + x), puis écris le DL d'ordre 3 de √(1 + ln(1 + x)) en 0.
  [guided]  ln(1 + x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de √(1 + ln(1 + x)) en 0 :  [juge series]  départ : √(1 + ln(1 + x))
    = 1 + (□)/2 − (x − x²/2 + x³/3)²/8 + (x − x²/2 + x³/3)³/16 + x³ε(x)   (trous : 1 + (x − x²/2 + x³/3)/2 − (x − x²/2 + x³/3)²/8 + (x − x²/2 + x³/3)³/16 + x³ε(x))   ← DL de √(1 + u) avec u = x − x²/2 + x³/3
    = 1 + (x − x²/2 + x³/3)/2 − □ + □ + x³ε(x)   (trous : 1 + (x − x²/2 + x³/3)/2 − (x² − x³)/8 + x³/16 + x³ε(x))   ← Puissances de u, termes de degré ≤ 3
    = 1 + x/□ − □x² + □x³ + x³ε(x)   (trous : 1 + x/2 − (3/8)x² + (17/48)x³ + x³ε(x))   ← Réduire
  aides : u = ln(1 + x) tend vers 0 : remplace u par son DL dans celui de √(1 + u), et garde dans uᵏ tous les termes de degré ≤ 3. | 1 + x/□ − □x² + □x³ + x³ε(x) | 1 + x/2 − (3/8)x² + (17/48)x³ + x³ε(x)

Vérifie d'abord la limite en 0 de u = x/(1 − x), puis écris le DL d'ordre 3 de e^(x/(1 − x)) en 0.
  [guided]  x/(1 − x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de e^(x/(1 − x)) en 0 :  [juge series]  départ : e^(x/(1 − x))
    = 1 + (□) + (x + x² + x³)²/2 + (x + x² + x³)³/6 + x³ε(x)   (trous : 1 + (x + x² + x³) + (x + x² + x³)²/2 + (x + x² + x³)³/6 + x³ε(x))   ← DL de eᵘ avec u = x + x² + x³
    = 1 + (x + x² + x³) + □ + □ + x³ε(x)   (trous : 1 + (x + x² + x³) + (x² + 2x³)/2 + x³/6 + x³ε(x))   ← Puissances de u, termes de degré ≤ 3
    = 1 + □ + □x² + □x³ + x³ε(x)   (trous : 1 + x + (3/2)x² + (13/6)x³ + x³ε(x))   ← Réduire
  aides : u = x/(1 − x) tend vers 0 : remplace u par son DL dans celui de eᵘ, et garde dans uᵏ tous les termes de degré ≤ 3. | 1 + □ + □x² + □x³ + x³ε(x) | 1 + x + (3/2)x² + (13/6)x³ + x³ε(x)
  pièges : a1_bh_not_indeterminate

```

### Niveau 2

```
Vérifie d'abord la limite en 0 de u = x/(1 − x), puis écris le DL d'ordre 2 de e^(x/(1 − x)) en 0.
  [guided]  x/(1 − x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 2 de e^(x/(1 − x)) en 0 :  [juge series]  départ : e^(x/(1 − x))
    ? Peut-on mettre u = x/(1 − x) directement dans le DL de eᵘ en 0 ? · Non : u tend vers 1, il faut recentrer / ✔ Oui : u tend vers 0
    = 1 + (□) + (x + x²)²/2 + x²ε(x)   (trous : 1 + (x + x²) + (x + x²)²/2 + x²ε(x))   ← DL de eᵘ avec u = x + x²
    = 1 + (x + x²) + x²/2 + x²ε(x)   ← Puissances de u, termes de degré ≤ 2
    = 1 + □ + □ + x²ε(x)   (trous : 1 + x + (3/2)x² + x²ε(x))   ← Réduire
  aides : u = x/(1 − x) tend vers 0 : remplace u par son DL dans celui de eᵘ, et garde dans uᵏ tous les termes de degré ≤ 2. | 1 + □ + □x² + x²ε(x) | 1 + x + (3/2)x² + x²ε(x)
  pièges : a1_bh_not_indeterminate

Vérifie d'abord la limite en 0 de u = tan(x), puis écris le DL d'ordre 4 de e^(tan(x)) en 0.
  [guided]  tan(x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 4 de e^(tan(x)) en 0 :  [juge series]  départ : e^(tan(x))
    ? Peut-on mettre u = tan(x) directement dans le DL de eᵘ en 0 ? ✔ Oui : u tend vers 0 / · Non : u tend vers 1, il faut recentrer
    = 1 + (□) + (x + x³/3)²/2 + (x + x³/3)³/6 + (x + x³/3)⁴/24 + x⁴ε(x)   (trous : 1 + (x + x³/3) + (x + x³/3)²/2 + (x + x³/3)³/6 + (x + x³/3)⁴/24 + x⁴ε(x))   ← DL de eᵘ avec u = x + x³/3
    = 1 + (x + x³/3) + (x² + (2/3)x⁴)/2 + x³/6 + x⁴/24 + x⁴ε(x)   ← Puissances de u, termes de degré ≤ 4
    = 1 + □ + □ + □ + □ + x⁴ε(x)   (trous : 1 + x + x²/2 + x³/2 + (3/8)x⁴ + x⁴ε(x))   ← Réduire
  aides : u = tan(x) tend vers 0 : remplace u par son DL dans celui de eᵘ, et garde dans uᵏ tous les termes de degré ≤ 4. | 1 + □ + x²/□ + x³/□ + □x⁴ + x⁴ε(x) | 1 + x + x²/2 + x³/2 + (3/8)x⁴ + x⁴ε(x)

Vérifie d'abord la limite en 0 de u = 1 + sin(x), puis écris le DL d'ordre 4 de e^(1 + sin(x)) en 0.
  [guided]  1 + sin(x)
    = 1   ← u ne tend pas vers 0 : il faudra recentrer
  — DL d'ordre 4 de e^(1 + sin(x)) en 0 :  [juge series]  départ : e^(1 + sin(x))
    ? Peut-on mettre u = 1 + sin(x) directement dans le DL de eᵘ en 0 ? ✔ Non : u tend vers 1, il faut recentrer / · Oui : u tend vers 0
    = □·e^(□ + x⁴ε(x))   (trous : e·e^(x − x³/6 + x⁴ε(x)))   ← 1 + sin(x) → 1 : on sort e¹
    = e·(1 + (x − x³/6) + (x − x³/6)²/2 + (x − x³/6)³/6 + (x − x³/6)⁴/24) + x⁴ε(x)   ← DL de eᵘ avec u = x − x³/6
    = e·(1 + (x − x³/6) + (x² − x⁴/3)/2 + x³/6 + x⁴/24) + x⁴ε(x)   ← Puissances de u, termes de degré ≤ 4
    = e + □ + □ − □ + x⁴ε(x)   (trous : e + e·x + (e/2)·x² − (e/8)·x⁴ + x⁴ε(x))   ← Réduire
  aides : 1 + sin(x) tend vers 1 : sors e¹ avant d'utiliser le DL de l'exponentielle. | e + □·x + □·x² − □·x⁴ + x⁴ε(x) | e + e·x + (e/2)·x² − (e/8)·x⁴ + x⁴ε(x)
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_dl_compose_nonzero_inner

```

### Niveau 3

```
Vérifie d'abord la limite en 0 de u = sin(x), puis écris le DL d'ordre 3 de e^(sin(x)) en 0.
  [tap, suivre l'erreur, menu steps]  sin(x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de e^(sin(x)) en 0 :  [juge series]  départ : e^(sin(x))
    = 1 + (x − x³/6) + (x − x³/6)²/2 + (x − x³/6)³/6 + x³ε(x)   ← DL de eᵘ avec u = x − x³/6
    = 1 + x + x²/2 + x³ε(x)   ← Réduire
  aides : u = sin(x) tend vers 0 : remplace u par son DL dans celui de eᵘ, et garde dans uᵏ tous les termes de degré ≤ 3. | 1 + □ + x²/□ + x³ε(x) | 1 + x + x²/2 + x³ε(x)
  pièges : a1_dl_factorial_missing

Vérifie d'abord la limite en 0 de u = ln(1 + x), puis écris le DL d'ordre 4 de cos(ln(1 + x)) en 0.
  [tap, suivre l'erreur, menu steps]  ln(1 + x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 4 de cos(ln(1 + x)) en 0 :  [juge series]  départ : cos(ln(1 + x))
    = 1 − (x − x²/2 + x³/3 − x⁴/4)²/2 + (x − x²/2 + x³/3 − x⁴/4)⁴/24 + x⁴ε(x)   ← DL de cos u avec u = x − x²/2 + x³/3 − x⁴/4
    = 1 − (x² − x³ + (11/12)x⁴)/2 + x⁴/24 + x⁴ε(x)   ← Puissances de u, termes de degré ≤ 4
    = 1 − x²/2 + x³/2 − (5/12)x⁴ + x⁴ε(x)   ← Réduire
  aides : u = ln(1 + x) tend vers 0 : remplace u par son DL dans celui de cos u, et garde dans uᵏ tous les termes de degré ≤ 4. | 1 − x²/□ + x³/□ − □x⁴ + x⁴ε(x) | 1 − x²/2 + x³/2 − (5/12)x⁴ + x⁴ε(x)

Vérifie d'abord la limite en 0 de u = e^x − 1, puis écris le DL d'ordre 2 de 1/(1 − (e^x − 1)) en 0.
  [tap, suivre l'erreur, menu steps]  e^x − 1
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 2 de 1/(1 − (e^x − 1)) en 0 :  [juge series]  départ : 1/(1 − (e^x − 1))
    = 1 + (x + x²/2) + (x + x²/2)² + x²ε(x)   ← DL de 1/(1 − u) avec u = x + x²/2
    = 1 + (x + x²/2) + x² + x²ε(x)   ← Puissances de u, termes de degré ≤ 2
    = 1 + x + (3/2)x² + x²ε(x)   ← Réduire
  aides : u = e^x − 1 tend vers 0 : remplace u par son DL dans celui de 1/(1 − u), et garde dans uᵏ tous les termes de degré ≤ 2. | 1 + □ + □x² + x²ε(x) | 1 + x + (3/2)x² + x²ε(x)
  pièges : a1_dl_factorial_missing

```

### Niveau 4

```
Vérifie d'abord la limite en 0 de u = x + x², puis écris le DL d'ordre 3 de ln(1 + x + x²) en 0.
  [free, suivre l'erreur]  x + x²
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de ln(1 + x + x²) en 0 :  [juge series]  départ : ln(1 + x + x²)
    = (x + x²) − (x + x²)²/2 + (x + x²)³/3 + x³ε(x)   ← DL de Log(1 + u) avec u = x + x²
    = (x + x²) − (x² + 2x³)/2 + x³/3 + x³ε(x)   ← Puissances de u, termes de degré ≤ 3
    = x + x²/2 − (2/3)x³ + x³ε(x)   ← Réduire
  aides : u = x + x² tend vers 0 : remplace u par son DL dans celui de Log(1 + u), et garde dans uᵏ tous les termes de degré ≤ 3. | x + x²/□ − □x³ + x³ε(x) | x + x²/2 − (2/3)x³ + x³ε(x)

Vérifie d'abord la limite en 0 de u = ln(1 + x), puis écris le DL d'ordre 3 de √(1 + ln(1 + x)) en 0.
  [free, suivre l'erreur]  ln(1 + x)
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de √(1 + ln(1 + x)) en 0 :  [juge series]  départ : √(1 + ln(1 + x))
    = 1 + (x − x²/2 + x³/3)/2 − (x − x²/2 + x³/3)²/8 + (x − x²/2 + x³/3)³/16 + x³ε(x)   ← DL de √(1 + u) avec u = x − x²/2 + x³/3
    = 1 + (x − x²/2 + x³/3)/2 − (x² − x³)/8 + x³/16 + x³ε(x)   ← Puissances de u, termes de degré ≤ 3
    = 1 + x/2 − (3/8)x² + (17/48)x³ + x³ε(x)   ← Réduire
  aides : u = ln(1 + x) tend vers 0 : remplace u par son DL dans celui de √(1 + u), et garde dans uᵏ tous les termes de degré ≤ 3. | 1 + x/□ − □x² + □x³ + x³ε(x) | 1 + x/2 − (3/8)x² + (17/48)x³ + x³ε(x)

Vérifie d'abord la limite en 0 de u = cos(x), puis écris le DL d'ordre 4 de √(cos(x)) en 0.
  [free, suivre l'erreur]  cos(x)
    = 1   ← u ne tend pas vers 0 : il faudra recentrer
  — DL d'ordre 4 de √(cos(x)) en 0 :  [juge series]  départ : √(cos(x))
    = √(1 + (−x²/2 + x⁴/24 + x⁴ε(x)))   ← cos(x) = 1 + u avec u → 0
    = 1 + (−x²/2 + x⁴/24)/2 − (−x²/2 + x⁴/24)²/8 + x⁴ε(x)   ← DL de √(1 + u) avec u = −x²/2 + x⁴/24
    = 1 + (−x²/2 + x⁴/24)/2 − x⁴/32 + x⁴ε(x)   ← Puissances de u, termes de degré ≤ 4
    = 1 − x²/4 − x⁴/96 + x⁴ε(x)   ← Réduire
  aides : cos(x) tend vers 1 : écris-le 1 + u avec u → 0. | 1 − x²/□ − x⁴/□ + x⁴ε(x) | 1 − x²/4 − x⁴/96 + x⁴ε(x)
  pièges : a1_dl_factorial_missing

```

### Niveau 5

```
Vérifie d'abord la limite en 0 de u = x − x², puis écris le DL d'ordre 2 de ln(1 + x − x²) en 0.
  [free, sans aide]  x − x²
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 2 de ln(1 + x − x²) en 0 :  [juge series]  départ : ln(1 + x − x²)
    = (x − x²) − (x − x²)²/2 + x²ε(x)   ← DL de Log(1 + u) avec u = x − x²
    = (x − x²) − x²/2 + x²ε(x)   ← Puissances de u, termes de degré ≤ 2
    = x − (3/2)x² + x²ε(x)   ← Réduire

Vérifie d'abord la limite en 0 de u = x − x², puis écris le DL d'ordre 3 de ln(1 + x − x²) en 0.
  [free, sans aide]  x − x²
    = 0   ← u → 0 : le DL de f en 0 s'applique
  — DL d'ordre 3 de ln(1 + x − x²) en 0 :  [juge series]  départ : ln(1 + x − x²)
    = (x − x²) − (x − x²)²/2 + (x − x²)³/3 + x³ε(x)   ← DL de Log(1 + u) avec u = x − x²
    = (x − x²) − (x² − 2x³)/2 + x³/3 + x³ε(x)   ← Puissances de u, termes de degré ≤ 3
    = x − (3/2)x² + (4/3)x³ + x³ε(x)   ← Réduire

Vérifie d'abord la limite en 0 de u = cos(x), puis écris le DL d'ordre 4 de √(cos(x)) en 0.
  [free, sans aide]  cos(x)
    = 1   ← u ne tend pas vers 0 : il faudra recentrer
  — DL d'ordre 4 de √(cos(x)) en 0 :  [juge series]  départ : √(cos(x))
    = √(1 + (−x²/2 + x⁴/24 + x⁴ε(x)))   ← cos(x) = 1 + u avec u → 0
    = 1 + (−x²/2 + x⁴/24)/2 − (−x²/2 + x⁴/24)²/8 + x⁴ε(x)   ← DL de √(1 + u) avec u = −x²/2 + x⁴/24
    = 1 + (−x²/2 + x⁴/24)/2 − x⁴/32 + x⁴ε(x)   ← Puissances de u, termes de degré ≤ 4
    = 1 − x²/4 − x⁴/96 + x⁴ε(x)   ← Réduire
  pièges : a1_dl_factorial_missing

```

### Variantes d'examen

```
Le DL d'ordre 4 de 1/(1 − sin(x)) en 0 est :
  · 1 + x + x² + (5/6)x³ + x⁴ + x⁴ε(x) [a1_dl_truncate_inner]   · 1 + x + x² + (5/6)x³ − (2/3)x⁴ + x⁴ε(x)   · 1 + x + x² + x³ + x⁴ + x⁴ε(x) [a1_dl_truncate_early]   ✔ 1 + x + x² + (5/6)x³ + (2/3)x⁴ + x⁴ε(x)
  [examen mcq]
  pièges : a1_dl_truncate_inner, a1_dl_truncate_early

Dans le DL de ln(1 + sin(x)) en 0, quel est le coefficient de x⁴ ?
  → -1/12   pièges attendus : 3/4 [a1_dl_factorial_missing], -1/4 [a1_dl_truncate_inner], 1/6 [a1_dl_truncate_early]
  [examen coef]
  pièges : a1_dl_factorial_missing, a1_dl_truncate_inner, a1_dl_truncate_early

```

## Calculer une limite par DL (`a1-dl-limits`, BA1)

_Développer le haut et le bas jusqu'au premier terme non nul._

### Niveau 1

```
Calcule lim_{x→0} (1 + 2x + 2x² − e^(2x))/x³ par développements limités. Développe à l'ordre 3.
  [guided]  1 + 2x + 2x² − e^(2x)
    = 1 + 2x + 2x² − (1 + 2x + 2x² + (4/3)x³ + x³ε(x))   ← DL de chaque fonction
    = □x³ + x³ε(x)   (trous : −(4/3)x³ + x³ε(x))   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (1 + 2x + 2x² − e^(2x))/x³
    = (−(4/3)x³ + x³ε(x))/x³   ← Remplacer par les DL
    = □ + ε(x)   (trous : −4/3 + ε(x))   ← Diviser par x³
    = −4/3   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | 1 + 2x + 2x² − e^(2x) = □·x³ + x³·ε(x) | (−(4/3)x³ + x³ε(x))/x³ → −4/3
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Calcule lim_{x→0} (cos(2x) − 1)/x² par développements limités. Développe à l'ordre 2.
  [guided]  cos(2x) − 1
    = (1 − 2x² + x²ε(x)) − 1   ← DL de chaque fonction
    = □x² + x²ε(x)   (trous : −2x² + x²ε(x))   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (cos(2x) − 1)/x²
    = (−2x² + x²ε(x))/x²   ← Remplacer par les DL
    = □ + ε(x)   (trous : −2 + ε(x))   ← Diviser par x²
    = −2   ← ε(x) → 0
  aides : Le dénominateur commence en x² : développe le numérateur jusqu'à x². | cos(2x) − 1 = □·x² + x²·ε(x) | (−2x² + x²ε(x))/x² → −2
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Calcule lim_{x→0} (1/(1 + x) − 1 + x)/x² par développements limités. Développe à l'ordre 2.
  [guided]  1/(1 + x) − 1 + x
    = □ + x²ε(x)   (trous : x² + x²ε(x))   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (1/(1 + x) − 1 + x)/x²
    = (x² + x²ε(x))/x²   ← Remplacer par les DL
    = □ + ε(x)   (trous : 1 + ε(x))   ← Diviser par x²
    = 1   ← ε(x) → 0
  aides : Le dénominateur commence en x² : développe le numérateur jusqu'à x². | 1/(1 + x) − 1 + x = □·x² + x²·ε(x) | (x² + x²ε(x))/x² → 1
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 2

```
Calcule lim_{x→0} (tan(x) − sin(x))/x³ par développements limités.
  [guided]  tan(x) − sin(x)
    ? À quel ordre développer le numérateur ? · Ordre 2 / ✔ Ordre 4 / ✔ Ordre 3
    = (x + x³/3 + x³ε(x)) − (x − x³/6 + x³ε(x))   ← DL de chaque fonction
    = x³/□ + x³ε(x)   (trous : x³/2 + x³ε(x))   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (tan(x) − sin(x))/x³
    = (x³/2 + x³ε(x))/x³   ← Remplacer par les DL
    = 1/2 + ε(x)   ← Diviser par x³
    = 1/2   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | tan(x) − sin(x) = □·x³ + x³·ε(x) | (x³/2 + x³ε(x))/x³ → 1/2
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_order_too_low

Calcule lim_{x→0} (ln(1 + x) − sin(x))/x² par développements limités.
  [guided]  ln(1 + x) − sin(x)
    ? À quel ordre développer le numérateur ? · Ordre 1 / ✔ Ordre 3 / ✔ Ordre 2
    = (x − x²/2 + x²ε(x)) − (x + x²ε(x))   ← DL de chaque fonction
    = −x²/□ + x²ε(x)   (trous : −x²/2 + x²ε(x))   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (ln(1 + x) − sin(x))/x²
    = (−x²/2 + x²ε(x))/x²   ← Remplacer par les DL
    = −1/2 + ε(x)   ← Diviser par x²
    = −1/2   ← ε(x) → 0
  aides : Le dénominateur commence en x² : développe le numérateur jusqu'à x². | ln(1 + x) − sin(x) = □·x² + x²·ε(x) | (−x²/2 + x²ε(x))/x² → −1/2
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early, a1_dl_order_too_low

Calcule lim_{x→0} (x − sinh(x))/x³ par développements limités.
  [guided]  x − sinh(x)
    ? À quel ordre développer le numérateur ? · Ordre 2 / ✔ Ordre 4 / ✔ Ordre 3
    = x − (x + x³/6 + x³ε(x))   ← DL de chaque fonction
    = −x³/□ + x³ε(x)   (trous : −x³/6 + x³ε(x))   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (x − sinh(x))/x³
    = (−x³/6 + x³ε(x))/x³   ← Remplacer par les DL
    = −1/6 + ε(x)   ← Diviser par x³
    = −1/6   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | x − sinh(x) = □·x³ + x³·ε(x) | (−x³/6 + x³ε(x))/x³ → −1/6
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_order_too_low

```

### Niveau 3

```
Calcule lim_{x→0} (1/√(1 − x) − 1 − x/2)/x² par développements limités.
  [tap, suivre l'erreur, menu steps]  1/√(1 − x) − 1 − x/2
    = 1/(1 − x/2 − x²/8 + x²ε(x)) − 1 − x/2   ← DL de chaque fonction
    = (3/8)x² + x²ε(x)   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (1/√(1 − x) − 1 − x/2)/x²
    = ((3/8)x² + x²ε(x))/x²   ← Remplacer par les DL
    = 3/8 + ε(x)   ← Diviser par x²
    = 3/8   ← ε(x) → 0
  aides : Le dénominateur commence en x² : développe le numérateur jusqu'à x². | 1/√(1 − x) − 1 − x/2 = □·x² + x²·ε(x) | ((3/8)x² + x²ε(x))/x² → 3/8
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Calcule lim_{x→0} (e^(2x) − 1 − 2x − 2x²)/x³ par développements limités.
  [tap, suivre l'erreur, menu steps]  e^(2x) − 1 − 2x − 2x²
    = (1 + 2x + 2x² + (4/3)x³ + x³ε(x)) − 1 − 2x − 2x²   ← DL de chaque fonction
    = (4/3)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (e^(2x) − 1 − 2x − 2x²)/x³
    = ((4/3)x³ + x³ε(x))/x³   ← Remplacer par les DL
    = 4/3 + ε(x)   ← Diviser par x³
    = 4/3   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | e^(2x) − 1 − 2x − 2x² = □·x³ + x³·ε(x) | ((4/3)x³ + x³ε(x))/x³ → 4/3
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Calcule lim_{x→0} (2x − tan(2x))/x³ par développements limités.
  [tap, suivre l'erreur, menu steps]  2x − tan(2x)
    = 2x − (2x + (8/3)x³ + x³ε(x))   ← DL de chaque fonction
    = −(8/3)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (2x − tan(2x))/x³
    = (−(8/3)x³ + x³ε(x))/x³   ← Remplacer par les DL
    = −8/3 + ε(x)   ← Diviser par x³
    = −8/3   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | 2x − tan(2x) = □·x³ + x³·ε(x) | (−(8/3)x³ + x³ε(x))/x³ → −8/3
  pièges : a1_dl_remainder_wrong_order

```

### Niveau 4

```
Calcule lim_{x→0} (ln(1 − x) + x)/x² par développements limités.
  [free, suivre l'erreur]  ln(1 − x) + x
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = (−x − x²/2 + x²ε(x)) + x   ← DL de chaque fonction
    = −x²/2 + x²ε(x)   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (ln(1 − x) + x)/x²
    = (−x²/2 + x²ε(x))/x²   ← Remplacer par les DL
    = −1/2 + ε(x)   ← Diviser par x²
    = −1/2   ← ε(x) → 0
  aides : Le dénominateur commence en x² : développe le numérateur jusqu'à x². | ln(1 − x) + x = □·x² + x²·ε(x) | (−x²/2 + x²ε(x))/x² → −1/2
  pièges : a1_dl_remainder_wrong_order, a1_dl_truncate_early

Calcule lim_{x→0} (2x − sinh(2x))/x³ par développements limités.
  [free, suivre l'erreur]  2x − sinh(2x)
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = 2x − (2x + (4/3)x³ + x³ε(x))   ← DL de chaque fonction
    = −(4/3)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (2x − sinh(2x))/x³
    = (−(4/3)x³ + x³ε(x))/x³   ← Remplacer par les DL
    = −4/3 + ε(x)   ← Diviser par x³
    = −4/3   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | 2x − sinh(2x) = □·x³ + x³·ε(x) | (−(4/3)x³ + x³ε(x))/x³ → −4/3
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Calcule lim_{x→0} (2x − sin(2x))/(x(1 − cos(2x))) par développements limités.
  [free, suivre l'erreur]  2x − sin(2x)
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = 2x − (2x − (4/3)x³ + x³ε(x))   ← DL de chaque fonction
    = (4/3)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — Le dénominateur x(1 − cos(2x)) à l'ordre 3 :  [juge series]  départ : x(1 − cos(2x))
    = x(1 − (1 − 2x² + x³ε(x)))   ← DL de chaque fonction
    = 2x³ + x³ε(x)   ← DL du dénominateur à l'ordre 3
  — La limite :  [juge limit]  départ : (2x − sin(2x))/(x(1 − cos(2x)))
    = ((4/3)x³ + x³ε(x))/(2x³ + x³ε(x))   ← Remplacer par les DL
    = (4/3 + ε(x))/(2 + ε(x))   ← Diviser par x³
    = 2/3   ← ε(x) → 0
  aides : Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. | 2x − sin(2x) = □·x³ + x³·ε(x) | ((4/3)x³ + x³ε(x))/(2x³ + x³ε(x)) → 2/3
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Niveau 5

```
Calcule lim_{x→0} (3x − sin(3x))/(x(1 − cos(3x))) par développements limités.
  [free, sans aide]  3x − sin(3x)
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = 3x − (3x − (9/2)x³ + x³ε(x))   ← DL de chaque fonction
    = (9/2)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — Le dénominateur x(1 − cos(3x)) à l'ordre 3 :  [juge series]  départ : x(1 − cos(3x))
    = x(1 − (1 − (9/2)x² + x³ε(x)))   ← DL de chaque fonction
    = (9/2)x³ + x³ε(x)   ← DL du dénominateur à l'ordre 3
  — La limite :  [juge limit]  départ : (3x − sin(3x))/(x(1 − cos(3x)))
    = ((9/2)x³ + x³ε(x))/((9/2)x³ + x³ε(x))   ← Remplacer par les DL
    = (9/2 + ε(x))/(9/2 + ε(x))   ← Diviser par x³
    = 1   ← ε(x) → 0
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Calcule lim_{x→0} (2x − sin(2x))/x³ par développements limités.
  [free, sans aide]  2x − sin(2x)
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = 2x − (2x − (4/3)x³ + x³ε(x))   ← DL de chaque fonction
    = (4/3)x³ + x³ε(x)   ← DL du numérateur à l'ordre 3
  — La limite :  [juge limit]  départ : (2x − sin(2x))/x³
    = ((4/3)x³ + x³ε(x))/x³   ← Remplacer par les DL
    = 4/3 + ε(x)   ← Diviser par x³
    = 4/3   ← ε(x) → 0
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Calcule lim_{x→0} (1 + x − e^x)/x² par développements limités.
  [free, sans aide]  1 + x − e^x
    ? Quelle méthode ? ✔ Développements limités / ✔ Règle de Bernoulli-l'Hôpital
    = 1 + x − (1 + x + x²/2 + x²ε(x))   ← DL de chaque fonction
    = −x²/2 + x²ε(x)   ← DL du numérateur à l'ordre 2
  — La limite :  [juge limit]  départ : (1 + x − e^x)/x²
    = (−x²/2 + x²ε(x))/x²   ← Remplacer par les DL
    = −1/2 + ε(x)   ← Diviser par x²
    = −1/2   ← ε(x) → 0
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Variantes d'examen

```
lim_{x→0} (e^(cos(x) − 1) − 1 + x²/2)/(x²·sin(x)²) =
  · −1/6   · 7/24 [a1_dl_factorial_missing]   ✔ 1/6   · 0 [a1_dl_order_too_low]
  [examen mcq]
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low

Vrai ou faux ?
  « Pour tout réel b : si f(x) = x + bx³ + x³·ε(x), alors limx→0 (f(x) − x)/x³ = b. » → VRAI
  [examen tf]

```

## Lire f⁽ⁿ⁾(a) ou la nature d'un point critique sur un DL (`a1-dl-read`, BA1)

_f⁽ᵏ⁾(a) = k!·aₖ ; signe de a₂ pour un extremum._

### Niveau 1

```
f est de classe C^3 et f(x) = 2 + 9(x − 1) + 7(x − 1)³ + (x − 1)³ε(x) au voisinage de 1. Calcule f‴(1).
  [guided]  f′′′(1)
    = □·7   (trous : 6·7)   ← f‴(1) = 3!·a₃
    = 42   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f‴(1) = □·7 | f‴(1) = 6·7 = 42
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^3 et f(x) = −7 − 9x − (3/2)x² + 9x³ + x³ε(x) au voisinage de 0. Calcule f‴(0).
  [guided]  f′′′(0)
    = □·9   (trous : 6·9)   ← f‴(0) = 3!·a₃
    = 54   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f‴(0) = □·9 | f‴(0) = 6·9 = 54
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^3 et f(x) = −9 + 5x + 9x² − 5x³ + x³ε(x) au voisinage de 0. Calcule f″(0).
  [guided]  f′′(0)
    = □·9   (trous : 2·9)   ← f″(0) = 2!·a₂
    = 18   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f″(0) = □·9 | f″(0) = 2·9 = 18
  pièges : a1_dl_read_factorial, a1_dl_read_divide

```

### Niveau 2

```
f est de classe C^3 et f(x) = −2 − (3/2)x² − x³ + x³ε(x) au voisinage de 0. Calcule f‴(0).
  [guided]  f′′′(0)
    ? Comment obtenir f‴(0) à partir du coefficient a₃ ? · f‴(0) = a₃/3! / · f‴(0) = a₃ / ✔ f‴(0) = 3!·a₃
    = 6·(−1)   ← f‴(0) = 3!·a₃
    = −6   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f‴(0) = □·(−1) | f‴(0) = 6·(−1) = −6
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^4 et f(x) = 7 + 3x − 5x³ + 3x⁴ + x⁴ε(x) au voisinage de 0. Calcule f⁽⁴⁾(0).
  [guided]  f′′′′(0)
    ? Comment obtenir f⁽⁴⁾(0) à partir du coefficient a₄ ? ✔ f⁽⁴⁾(0) = 4!·a₄ / · f⁽⁴⁾(0) = a₄/4! / · f⁽⁴⁾(0) = a₄
    = 24·3   ← f⁽⁴⁾(0) = 4!·a₄
    = 72   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f⁽⁴⁾(0) = □·3 | f⁽⁴⁾(0) = 24·3 = 72
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^4 et f(x) = 9 + 2(x − 1) − (x − 1)² + 2(x − 1)³ + 3(x − 1)⁴ + (x − 1)⁴ε(x) au voisinage de 1. Calcule f″(1).
  [guided]  f′′(1)
    ? Comment obtenir f″(1) à partir du coefficient a₂ ? ✔ f″(1) = 2!·a₂ / · f″(1) = a₂ / · f″(1) = a₂/2!
    = 2·(−1)   ← f″(1) = 2!·a₂
    = −2   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f″(1) = □·(−1) | f″(1) = 2·(−1) = −2
  pièges : a1_dl_read_factorial, a1_dl_read_divide

```

### Niveau 3

```
f est de classe C^3 et f(x) = −5 + 5(x − 1) + (7/2)(x − 1)² − 2(x − 1)³ + (x − 1)³ε(x) au voisinage de 1. Calcule f″(1) et f‴(1).
  [tap, suivre l'erreur, menu steps]  f′′(1)
    = 2·(7/2)   ← f″(1) = 2!·a₂
    = 7   ← Calculer
  — Puis f‴(1) :  [juge value]  départ : f′′′(1)
    = 6·(−2)   ← f‴(1) = 3!·a₃
    = −12   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f″(1) = □·(7/2) | f″(1) = 2·(7/2) = 7
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^4 et f(x) = 3 − 5(x − 1) + 3(x − 1)² − 7(x − 1)³ + (5/3)(x − 1)⁴ + (x − 1)⁴ε(x) au voisinage de 1. Calcule f″(1) et f⁽⁴⁾(1).
  [tap, suivre l'erreur, menu steps]  f′′(1)
    = 2·3   ← f″(1) = 2!·a₂
    = 6   ← Calculer
  — Puis f⁽⁴⁾(1) :  [juge value]  départ : f′′′′(1)
    = 24·(5/3)   ← f⁽⁴⁾(1) = 4!·a₄
    = 40   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f″(1) = □·3 | f″(1) = 2·3 = 6
  pièges : a1_dl_read_factorial, a1_dl_read_divide

f est de classe C^3 et f(x) = 9 − 7(x − 1) + 7(x − 1)³ + (x − 1)³ε(x) au voisinage de 1. Calcule f‴(1).
  [tap, suivre l'erreur, menu steps]  f′′′(1)
    = 6·7   ← f‴(1) = 3!·a₃
    = 42   ← Calculer
  aides : Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!. | f‴(1) = □·7 | f‴(1) = 6·7 = 42
  pièges : a1_dl_read_factorial, a1_dl_read_divide

```

### Niveau 4

```
Écris le DL d'ordre 5 de f(x) = sin(2x)·ln(1 − x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, suivre l'erreur]  sin(2x)·ln(1 − x)
    = (2x − (4/3)x³ + (4/15)x⁵ + x⁵ε(x))·(−x − x²/2 − x³/3 − x⁴/4 − x⁵/5 + x⁵ε(x))   ← DL des deux facteurs
    = −2x² − x³ − (2/3)x⁴ + (4/3)x⁴ − x⁵/2 + (2/3)x⁵ + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
    = −2x² − x³ + (2/3)x⁴ + x⁵/6 + x⁵ε(x)   ← Réduire
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·(2/3)   ← f⁽⁴⁾(0) = 4!·a₄
    = 16   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(1/6)   ← f⁽⁵⁾(0) = 5!·a₅
    = 20   ← Calculer
  aides : D'abord le DL (produit ou quotient de DL usuels). Ensuite, le coefficient de xᵏ vaut f⁽ᵏ⁾(0)/k!. | −2x² − □ + □x⁴ + x⁵/□ + x⁵ε(x) | −2x² − x³ + (2/3)x⁴ + x⁵/6 + x⁵ε(x), puis f⁽⁵⁾(0) = 5!·a₅
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 5 de f(x) = sin(x)·ln(1 + 2x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, suivre l'erreur]  sin(x)·ln(1 + 2x)
    = (x − x³/6 + x⁵/120 + x⁵ε(x))·(2x − 2x² + (8/3)x³ − 4x⁴ + (32/5)x⁵ + x⁵ε(x))   ← DL des deux facteurs
    = 2x² − 2x³ + (8/3)x⁴ − x⁴/3 − 4x⁵ + x⁵/3 + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
    = 2x² − 2x³ + (7/3)x⁴ − (11/3)x⁵ + x⁵ε(x)   ← Réduire
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·(7/3)   ← f⁽⁴⁾(0) = 4!·a₄
    = 56   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(−11/3)   ← f⁽⁵⁾(0) = 5!·a₅
    = −440   ← Calculer
  aides : D'abord le DL (produit ou quotient de DL usuels). Ensuite, le coefficient de xᵏ vaut f⁽ᵏ⁾(0)/k!. | 2x² − □x³ + □x⁴ − □x⁵ + x⁵ε(x) | 2x² − 2x³ + (7/3)x⁴ − (11/3)x⁵ + x⁵ε(x), puis f⁽⁵⁾(0) = 5!·a₅
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 4 de f(x) = tan(2x) en 0, puis déduis-en f‴(0) et f⁽⁴⁾(0).
  [free, suivre l'erreur]  tan(2x)
    = (2x − (4/3)x³ + x⁴ε(x))/(1 − 2x² + (2/3)x⁴ + x⁴ε(x))   ← DL du numérateur et du dénominateur
    = (2x − (4/3)x³)·(1 − (−2x² + (2/3)x⁴) + (−2x² + (2/3)x⁴)²) + x⁴ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = 2x + (8/3)x³ + x⁴ε(x)   ← Développer, garder les termes de degré ≤ 4
  — Déduis-en f‴(0) :  [juge value]  départ : f′′′(0)
    = 6·(8/3)   ← f‴(0) = 3!·a₃
    = 16   ← Calculer
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·0   ← f⁽⁴⁾(0) = 4!·a₄
    = 0   ← Calculer
  aides : D'abord le DL (produit ou quotient de DL usuels). Ensuite, le coefficient de xᵏ vaut f⁽ᵏ⁾(0)/k! ; un coefficient nul donne une dérivée nulle. | 2x + □x³ + x⁴ε(x) | 2x + (8/3)x³ + x⁴ε(x), puis f⁽⁴⁾(0) = 4!·a₄
  pièges : a1_dl_remainder_wrong_order

```

### Niveau 5

```
Écris le DL d'ordre 5 de f(x) = sin(x)·ln(1 + x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, sans aide]  sin(x)·ln(1 + x)
    = (x − x³/6 + x⁵/120 + x⁵ε(x))·(x − x²/2 + x³/3 − x⁴/4 + x⁵/5 + x⁵ε(x))   ← DL des deux facteurs
    = x² − x³/2 + x⁴/3 − x⁴/6 − x⁵/4 + x⁵/12 + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
    = x² − x³/2 + x⁴/6 − x⁵/6 + x⁵ε(x)   ← Réduire
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·(1/6)   ← f⁽⁴⁾(0) = 4!·a₄
    = 4   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(−1/6)   ← f⁽⁵⁾(0) = 5!·a₅
    = −20   ← Calculer
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 5 de f(x) = cos(x)·ln(1 + x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, sans aide]  cos(x)·ln(1 + x)
    = (1 − x²/2 + x⁴/24 + x⁵ε(x))·(x − x²/2 + x³/3 − x⁴/4 + x⁵/5 + x⁵ε(x))   ← DL des deux facteurs
    = x − x²/2 + x³/3 − x³/2 − x⁴/4 + x⁴/4 + x⁵/5 − x⁵/6 + x⁵/24 + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
    = x − x²/2 − x³/6 + (3/40)x⁵ + x⁵ε(x)   ← Réduire
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·0   ← f⁽⁴⁾(0) = 4!·a₄
    = 0   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(3/40)   ← f⁽⁵⁾(0) = 5!·a₅
    = 9   ← Calculer
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

Écris le DL d'ordre 5 de f(x) = sin(2x)·ln(1 − x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, sans aide]  sin(2x)·ln(1 − x)
    = (2x − (4/3)x³ + (4/15)x⁵ + x⁵ε(x))·(−x − x²/2 − x³/3 − x⁴/4 − x⁵/5 + x⁵ε(x))   ← DL des deux facteurs
    = −2x² − x³ − (2/3)x⁴ + (4/3)x⁴ − x⁵/2 + (2/3)x⁵ + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
    = −2x² − x³ + (2/3)x⁴ + x⁵/6 + x⁵ε(x)   ← Réduire
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·(2/3)   ← f⁽⁴⁾(0) = 4!·a₄
    = 16   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(1/6)   ← f⁽⁵⁾(0) = 5!·a₅
    = 20   ← Calculer
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Variantes d'examen

```
f est de classe C⁴ et f(x) = 7 + 3x² − 3x³ + 4x⁴ + x⁴ε(x) au voisinage de 0. En 0, f a :
  ✔ un minimum local   · un maximum local   · un point d'inflexion à tangente horizontale   · pas de point critique (f′(a) ≠ 0)
  [examen mcq]

Vrai ou faux ?
  « f est de classe C⁵ et f(x) = 1 − 3x − x² − 3x³ − x⁴ + x⁴ε(x). Alors f′(0) + 3f″(0) + f‴(0) = −27. » → VRAI
  [examen tf]

Écris le DL d'ordre 5 de f(x) = ln(1 − x²)/sin(x) en 0, puis déduis-en f⁽⁴⁾(0) et f⁽⁵⁾(0).
  [free, sans aide, examen open]  ln(1 − x²)/sin(x)
    = (−x² − x⁴/2 − x⁶/3 + x⁶ε(x))/(x − x³/6 + x⁵/120 + x⁶ε(x))   ← DL du numérateur et du dénominateur
    = (−x − x³/2 − x⁵/3 + x⁵ε(x))/(1 − x²/6 + x⁴/120 + x⁵ε(x))   ← Simplifier par x
    = (−x − x³/2 − x⁵/3)·(1 − (−x²/6 + x⁴/120) + (−x²/6 + x⁴/120)²) + x⁵ε(x)   ← 1/(1 + u) = 1 − u + u² − …
    = −x − (2/3)x³ − (157/360)x⁵ + x⁵ε(x)   ← Développer, garder les termes de degré ≤ 5
  — Déduis-en f⁽⁴⁾(0) :  [juge value]  départ : f′′′′(0)
    = 24·0   ← f⁽⁴⁾(0) = 4!·a₄
    = 0   ← Calculer
  — Déduis-en f⁽⁵⁾(0) :  [juge value]  départ : f′′′′′(0)
    = 120·(−157/360)   ← f⁽⁵⁾(0) = 5!·a₅
    = −157/3   ← Calculer
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

## Reste de Taylor : majorer l'erreur (`a1-taylor-rest`, BA1)

_Reste de Lagrange : majorer |f⁽ⁿ⁺¹⁾| sur tout l'intervalle._

### Niveau 1

```
On approche f(x) = e^x par son polynôme de Taylor T1 en 0, pour x ∈ [0 ; 0,1]. On donne T1(x) = 1 + x et f″(x) = e^x. Majore l'erreur avec le reste de Lagrange.
  [guided]  |e^x|
    = □   (trous : 2)   ← eˣ ≤ e^0,1 < 2 sur [0 ; 0,1]
  — Majore l'erreur |f(x) − T1(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |e^x − (1 + x)|
    = □·x²/2   (trous : 2·x²/2)   ← Lagrange : |R₁(x)| ≤ M·x²/2!
    = 2·(1/10)²/2   ← x ≤ 0,1
    = 1/100   ← Calculer
  aides : Reste de Lagrange : f(x) − T₁(x) = f″(c)·x²/2! avec c entre 0 et x. Majore |f″| sur tout [0 ; 0,1]. | |R₁| ≤ □·(0,1)^2/2 | |R₁| ≤ 2·(0,1)^2/2 = 1/100
  pièges : a1_taylor_rest_at_a

On approche f(x) = ln(1 + x) par son polynôme de Taylor T3 en 0, pour x ∈ [0 ; 0,5]. On donne T3(x) = x − x²/2 + x³/3 et f⁽⁴⁾(x) = −6/(1 + x)⁴. Majore l'erreur avec le reste de Lagrange.
  [guided]  |−6/(1 + x)⁴|
    = □   (trous : 6)   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T3(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |ln(1 + x) − (x − x²/2 + x³/3)|
    = □·x⁴/24   (trous : 6·x⁴/24)   ← Lagrange : |R₃(x)| ≤ M·x⁴/4!
    = 6·(1/2)⁴/24   ← x ≤ 0,5
    = 1/64   ← Calculer
  aides : Reste de Lagrange : f(x) − T₃(x) = f⁽⁴⁾(c)·x⁴/4! avec c entre 0 et x. Majore |f⁽⁴⁾| sur tout [0 ; 0,5]. | |R₃| ≤ □·(0,5)^4/24 | |R₃| ≤ 6·(0,5)^4/24 = 1/64

On approche f(x) = e^x par son polynôme de Taylor T1 en 0, pour x ∈ [0 ; 0,2]. On donne T1(x) = 1 + x et f″(x) = e^x. Majore l'erreur avec le reste de Lagrange.
  [guided]  |e^x|
    = □   (trous : 2)   ← eˣ ≤ e^0,2 < 2 sur [0 ; 0,2]
  — Majore l'erreur |f(x) − T1(x)| pour x ∈ [0 ; 0,2] :  [juge equiv]  départ : |e^x − (1 + x)|
    = □·x²/2   (trous : 2·x²/2)   ← Lagrange : |R₁(x)| ≤ M·x²/2!
    = 2·(1/5)²/2   ← x ≤ 0,2
    = 1/25   ← Calculer
  aides : Reste de Lagrange : f(x) − T₁(x) = f″(c)·x²/2! avec c entre 0 et x. Majore |f″| sur tout [0 ; 0,2]. | |R₁| ≤ □·(0,2)^2/2 | |R₁| ≤ 2·(0,2)^2/2 = 1/25
  pièges : a1_taylor_rest_at_a

```

### Niveau 2

```
On approche f(x) = e^x par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,5]. On donne T2(x) = 1 + x + x²/2. Majore l'erreur avec le reste de Lagrange.
  [guided]  (e^x)′′′
    = e^x   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |e^x|
    ? Où majorer |f‴(c)| ? ✔ Sur tout [0 ; 0,5] : c y est quelque part / · En 0 seulement : le développement est fait en 0
    = 2   ← eˣ ≤ e^0,5 < 2 sur [0 ; 0,5]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |e^x − (1 + x + x²/2)|
    = 2·x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 2·(1/2)³/6   ← x ≤ 0,5
    = 1/24   ← Calculer
  aides : Reste de Lagrange : f(x) − T₂(x) = f‴(c)·x³/3! avec c entre 0 et x. Majore |f‴| sur tout [0 ; 0,5]. | |R₂| ≤ □·(0,5)^3/6 | |R₂| ≤ 2·(0,5)^3/6 = 1/24
  pièges : a1_taylor_rest_at_a

On approche f(x) = ln(1 + x) par son polynôme de Taylor T3 en 0, pour x ∈ [0 ; 0,1]. On donne T3(x) = x − x²/2 + x³/3. Majore l'erreur avec le reste de Lagrange.
  [guided]  (ln(1 + x))′′′′
    = −□/(1 + x)⁴   (trous : −6/(1 + x)⁴)   ← Dériver 4 fois
  — Majore |f⁽⁴⁾(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |−6/(1 + x)⁴|
    ? Où majorer |f⁽⁴⁾(c)| ? ✔ Sur tout [0 ; 0,1] : c y est quelque part / · En 0 seulement : le développement est fait en 0
    = 6   ← Majorer sur tout [0 ; 0,1]
  — Majore l'erreur |f(x) − T3(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |ln(1 + x) − (x − x²/2 + x³/3)|
    = 6·x⁴/24   ← Lagrange : |R₃(x)| ≤ M·x⁴/4!
    = 6·(1/10)⁴/24   ← x ≤ 0,1
    = 1/40000   ← Calculer
  aides : Reste de Lagrange : f(x) − T₃(x) = f⁽⁴⁾(c)·x⁴/4! avec c entre 0 et x. Majore |f⁽⁴⁾| sur tout [0 ; 0,1]. | |R₃| ≤ □·(0,1)^4/24 | |R₃| ≤ 6·(0,1)^4/24 = 1/40000
  pièges : g2_log_sum, a1_taylor_rest_at_a

On approche f(x) = sin(x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,5]. On donne T2(x) = x. Majore l'erreur avec le reste de Lagrange.
  [guided]  (sin(x))′′′
    = −cos(x)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |−cos(x)|
    ? Où majorer |f‴(c)| ? ✔ Sur tout [0 ; 0,5] : c y est quelque part / · En 0 seulement : le développement est fait en 0
    = 1   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |sin(x) − (x)|
    = x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = (1/2)³/6   ← x ≤ 0,5
    = 1/48   ← Calculer
  aides : Reste de Lagrange : f(x) − T₂(x) = f‴(c)·x³/3! avec c entre 0 et x. Majore |f‴| sur tout [0 ; 0,5]. | |R₂| ≤ □·(0,5)^3/6 | |R₂| ≤ 1·(0,5)^3/6 = 1/48
  pièges : a1_taylor_rest_at_a

```

### Niveau 3

```
On approche f(x) = e^x par son polynôme de Taylor T3 en 0, pour x ∈ [0 ; 0,1]. Majore l'erreur avec le reste de Lagrange.
  [tap, suivre l'erreur, menu steps]  e^x
    = 1 + x + x²/2 + x³/6 + x³ε(x)   ← DL d'ordre 3 de eˣ
  — Approximation T3(0,1) :  [juge value]  départ : 1 + (1/10) + (1/2)(1/10)² + (1/6)(1/10)³
    = 6631/6000   ← Calculer
  — La dérivée d'ordre 4 :  [juge equiv]  départ : (e^x)′′′′
    = e^x   ← Dériver 4 fois
  — Majore |f⁽⁴⁾(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |e^x|
    = 2   ← eˣ ≤ e^0,1 < 2 sur [0 ; 0,1]
  — Majore l'erreur |f(x) − T3(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |e^x − (1 + x + x²/2 + x³/6)|
    = 2·x⁴/24   ← Lagrange : |R₃(x)| ≤ M·x⁴/4!
    = 1/120000   ← Calculer
  aides : Reste de Lagrange : f(x) − T₃(x) = f⁽⁴⁾(c)·x⁴/4! avec c entre 0 et x. Majore |f⁽⁴⁾| sur tout [0 ; 0,1]. | |R₃| ≤ □·(0,1)^4/24 | |R₃| ≤ 2·(0,1)^4/24 = 1/120000
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

On approche f(x) = √(1 + x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,5]. Majore l'erreur avec le reste de Lagrange.
  [tap, suivre l'erreur, menu steps]  √(1 + x)
    = 1 + x/2 − x²/8 + x²ε(x)   ← DL d'ordre 2 de √(1 + x)
  — Approximation T2(0,5) :  [juge value]  départ : 1 + (1/2)(1/2) − (1/8)(1/2)²
    = 1,21875   ← Calculer
  — La dérivée d'ordre 3 :  [juge equiv]  départ : (√(1 + x))′′′
    = (3/8)(1 + x)^(−5/2)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |(3/8)(1 + x)^(−5/2)|
    = 3/8   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |√(1 + x) − (1 + x/2 − x²/8)|
    = (3/8)·x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 1/128   ← Calculer
  aides : Reste de Lagrange : f(x) − T₂(x) = f‴(c)·x³/3! avec c entre 0 et x. Majore |f‴| sur tout [0 ; 0,5]. | |R₂| ≤ □·(0,5)^3/6 | |R₂| ≤ 3/8·(0,5)^3/6 = 1/128
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

On approche f(x) = √(1 + x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,1]. Majore l'erreur avec le reste de Lagrange.
  [tap, suivre l'erreur, menu steps]  √(1 + x)
    = 1 + x/2 − x²/8 + x²ε(x)   ← DL d'ordre 2 de √(1 + x)
  — Approximation T2(0,1) :  [juge value]  départ : 1 + (1/2)(1/10) − (1/8)(1/10)²
    = 1,04875   ← Calculer
  — La dérivée d'ordre 3 :  [juge equiv]  départ : (√(1 + x))′′′
    = (3/8)(1 + x)^(−5/2)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |(3/8)(1 + x)^(−5/2)|
    = 3/8   ← Majorer sur tout [0 ; 0,1]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |√(1 + x) − (1 + x/2 − x²/8)|
    = (3/8)·x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 1/16000   ← Calculer
  aides : Reste de Lagrange : f(x) − T₂(x) = f‴(c)·x³/3! avec c entre 0 et x. Majore |f‴| sur tout [0 ; 0,1]. | |R₂| ≤ □·(0,1)^3/6 | |R₂| ≤ 3/8·(0,1)^3/6 = 1/16000
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 4

```
On approche f(x) = sin(x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,2]. Majore l'erreur avec le reste de Lagrange.
  [free, suivre l'erreur]  sin(x)
    = x + x²ε(x)   ← DL d'ordre 2 de sin x
  — La dérivée d'ordre 3 :  [juge equiv]  départ : (sin(x))′′′
    = −cos(x)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,2] :  [juge equiv]  départ : |−cos(x)|
    = 1   ← Majorer sur tout [0 ; 0,2]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,2] :  [juge equiv]  départ : |sin(x) − (x)|
    = x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 1/750   ← Calculer
  aides : Reste de Lagrange : f(x) − T₂(x) = f‴(c)·x³/3! avec c entre 0 et x. Majore |f‴| sur tout [0 ; 0,2]. | |R₂| ≤ □·(0,2)^3/6 | |R₂| ≤ 1·(0,2)^3/6 = 1/750
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

On approche f(x) = ln(1 + x) par son polynôme de Taylor T3 en 0, pour x ∈ [0 ; 0,5]. Majore l'erreur avec le reste de Lagrange.
  [free, suivre l'erreur]  ln(1 + x)
    = x − x²/2 + x³/3 + x³ε(x)   ← DL d'ordre 3 de Log(1 + x)
  — Approximation T3(0,5) :  [juge value]  départ : (1/2) − (1/2)(1/2)² + (1/3)(1/2)³
    = 5/12   ← Calculer
  — La dérivée d'ordre 4 :  [juge equiv]  départ : (ln(1 + x))′′′′
    = −6/(1 + x)⁴   ← Dériver 4 fois
  — Majore |f⁽⁴⁾(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |−6/(1 + x)⁴|
    = 6   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T3(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |ln(1 + x) − (x − x²/2 + x³/3)|
    = 6·x⁴/24   ← Lagrange : |R₃(x)| ≤ M·x⁴/4!
    = 1/64   ← Calculer
  aides : Reste de Lagrange : f(x) − T₃(x) = f⁽⁴⁾(c)·x⁴/4! avec c entre 0 et x. Majore |f⁽⁴⁾| sur tout [0 ; 0,5]. | |R₃| ≤ □·(0,5)^4/24 | |R₃| ≤ 6·(0,5)^4/24 = 1/64
  pièges : a1_dl_remainder_wrong_order

On approche f(x) = ln(1 + x) par son polynôme de Taylor T3 en 0, pour x ∈ [0 ; 0,1]. Majore l'erreur avec le reste de Lagrange.
  [free, suivre l'erreur]  ln(1 + x)
    = x − x²/2 + x³/3 + x³ε(x)   ← DL d'ordre 3 de Log(1 + x)
  — Approximation T3(0,1) :  [juge value]  départ : (1/10) − (1/2)(1/10)² + (1/3)(1/10)³
    = 143/1500   ← Calculer
  — La dérivée d'ordre 4 :  [juge equiv]  départ : (ln(1 + x))′′′′
    = −6/(1 + x)⁴   ← Dériver 4 fois
  — Majore |f⁽⁴⁾(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |−6/(1 + x)⁴|
    = 6   ← Majorer sur tout [0 ; 0,1]
  — Majore l'erreur |f(x) − T3(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |ln(1 + x) − (x − x²/2 + x³/3)|
    = 6·x⁴/24   ← Lagrange : |R₃(x)| ≤ M·x⁴/4!
    = 1/40000   ← Calculer
  aides : Reste de Lagrange : f(x) − T₃(x) = f⁽⁴⁾(c)·x⁴/4! avec c entre 0 et x. Majore |f⁽⁴⁾| sur tout [0 ; 0,1]. | |R₃| ≤ □·(0,1)^4/24 | |R₃| ≤ 6·(0,1)^4/24 = 1/40000
  pièges : a1_dl_remainder_wrong_order

```

### Niveau 5

```
On approche f(x) = ln(1 + x) par son polynôme de Taylor T1 en 0, pour x ∈ [0 ; 0,5]. Majore l'erreur avec le reste de Lagrange.
  [free, sans aide]  ln(1 + x)
    = x + xε(x)   ← DL d'ordre 1 de Log(1 + x)
  — La dérivée d'ordre 2 :  [juge equiv]  départ : (ln(1 + x))′′
    = −1/(1 + x)²   ← Dériver 2 fois
  — Majore |f″(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |−1/(1 + x)²|
    = 1   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T1(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |ln(1 + x) − (x)|
    = x²/2   ← Lagrange : |R₁(x)| ≤ M·x²/2!
    = 1/8   ← Calculer
  — Avec |f⁽ⁿ⁺¹⁾(c)| ≤ n! sur [0 ; 0,5], quel est le plus petit n tel que la borne de Lagrange garantisse |f(0,5) − Tₙ(0,5)| ≤ 10^−4 ?  [juge value]  départ : n
    = 9   ← Essayer n = 1, 2, 3…
  pièges : a1_dl_remainder_wrong_order, a1_dl_truncate_early

On approche f(x) = sin(x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,1]. Majore l'erreur avec le reste de Lagrange.
  [free, sans aide]  sin(x)
    = x + x²ε(x)   ← DL d'ordre 2 de sin x
  — La dérivée d'ordre 3 :  [juge equiv]  départ : (sin(x))′′′
    = −cos(x)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |−cos(x)|
    = 1   ← Majorer sur tout [0 ; 0,1]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,1] :  [juge equiv]  départ : |sin(x) − (x)|
    = x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 1/6000   ← Calculer
  — Avec |f⁽ⁿ⁺¹⁾(c)| ≤ 1 sur [0 ; 0,1], quel est le plus petit n tel que la borne de Lagrange garantisse |f(0,1) − Tₙ(0,1)| ≤ 10^−5 ?  [juge value]  départ : n
    = 3   ← Essayer n = 1, 2, 3…
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

On approche f(x) = sin(x) par son polynôme de Taylor T2 en 0, pour x ∈ [0 ; 0,5]. Majore l'erreur avec le reste de Lagrange.
  [free, sans aide]  sin(x)
    = x + x²ε(x)   ← DL d'ordre 2 de sin x
  — La dérivée d'ordre 3 :  [juge equiv]  départ : (sin(x))′′′
    = −cos(x)   ← Dériver 3 fois
  — Majore |f‴(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |−cos(x)|
    = 1   ← Majorer sur tout [0 ; 0,5]
  — Majore l'erreur |f(x) − T2(x)| pour x ∈ [0 ; 0,5] :  [juge equiv]  départ : |sin(x) − (x)|
    = x³/6   ← Lagrange : |R₂(x)| ≤ M·x³/3!
    = 1/48   ← Calculer
  — Avec |f⁽ⁿ⁺¹⁾(c)| ≤ 1 sur [0 ; 0,5], quel est le plus petit n tel que la borne de Lagrange garantisse |f(0,5) − Tₙ(0,5)| ≤ 10^−3 ?  [juge value]  départ : n
    = 4   ← Essayer n = 1, 2, 3…
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Variantes d'examen

```
Vrai ou faux ?
  « |eˣ − (1 + x + x²/2)| ≤ x³/6 pour tout x ∈ [0 ; 1]. » → FAUX
    contre-exemple (refute) : x = 1
  [examen tf]
  pièges : a1_taylor_rest_at_a

```

## Primitives immédiates : u′/u, u′·uʳ, u′/(1 + u²), u′·eᵘ (`a1-int-direct`, BA1)

_Chercher une dérivée cachée, puis ajuster la constante._

### Niveau 1

```
Calcule ∫ x/(1 + x⁴) dx.
  [guided]  (x²)′
    (Méthode : forme u′/(1 + u²) avec u = x², u′ = 2x)
    (u = x² : sa dérivée apparaît-elle dans l'intégrale ?)
    = 2x   ← Dériver u = x²
  — L’intégrale  [juge antideriv]  départ : ∫ x/(1 + x⁴) dx
    = (□)(∫ 2x/(1 + (x²)²) dx)   (trous : (1/2)(∫ 2x/(1 + (x²)²) dx))   ← u = x², u′ = 2x : ajuster la constante
    = (1/2)arctan(□) + C   (trous : (1/2)arctan(x²) + C)   ← ∫ u′/(1 + u²) = Arctg u
  aides : 2x est (à une constante près) la dérivée de u = x² : forme u′/(1 + u²). Ajuste la constante. | (1/2)(∫ 2x/(1 + (x²)²) dx) | (1/2)arctan(x²) + C
  pièges : a1_int_no_constant

Calcule ∫ 5x²/(1 + x⁶) dx.
  [guided]  (x³)′
    (Méthode : forme u′/(1 + u²) avec u = x³, u′ = 3x²)
    (u = x³ : sa dérivée apparaît-elle dans l'intégrale ?)
    = 3x²   ← Dériver u = x³
  — L’intégrale  [juge antideriv]  départ : ∫ 5x²/(1 + x⁶) dx
    = (□)(∫ 3x²/(1 + (x³)²) dx)   (trous : (5/3)(∫ 3x²/(1 + (x³)²) dx))   ← u = x³, u′ = 3x² : ajuster la constante
    = (5/3)arctan(□) + C   (trous : (5/3)arctan(x³) + C)   ← ∫ u′/(1 + u²) = Arctg u
  aides : 3x² est (à une constante près) la dérivée de u = x³ : forme u′/(1 + u²). Ajuste la constante. | (5/3)(∫ 3x²/(1 + (x³)²) dx) | (5/3)arctan(x³) + C
  pièges : a1_int_no_constant

Calcule ∫ 4x/(x² + 4) dx.
  [guided]  (x² + 4)′
    (Méthode : forme u′/u avec u = x² + 4, u′ = 2x)
    (u = x² + 4 : sa dérivée apparaît-elle dans l'intégrale ?)
    = 2x   ← Dériver u = x² + 4
  — L’intégrale  [juge antideriv]  départ : ∫ 4x/(x² + 4) dx
    = □(∫ 2x/(x² + 4) dx)   (trous : 2(∫ 2x/(x² + 4) dx))   ← u = x² + 4, u′ = 2x : ajuster la constante
    = 2ln(□) + C   (trous : 2ln(x² + 4) + C)   ← ∫ u′/u = Log u
  aides : 2x est (à une constante près) la dérivée de u = x² + 4 : forme u′/u. Ajuste la constante. | 2(∫ 2x/(x² + 4) dx) | 2ln(x² + 4) + C
  pièges : a1_int_no_constant

```

### Niveau 2

```
Calcule ∫_{0}^{1} 6x/(x² + 1) dx.
  [guided]  ∫_{0}^{1} 6x/(x² + 1) dx
    ? Quelle méthode ? · Log(x² + 1) + C, sans constante devant / ✔ Forme u′/u avec u = x² + 1
    = 3(∫_{0}^{1} 2x/(□) dx)   (trous : 3(∫_{0}^{1} 2x/(x² + 1) dx))   ← u = x² + 1, u′ = 2x : ajuster la constante
    = 3([ln(x² + 1)]_{0}^{1})   ← Primitive
    = 3ln(2)   ← Évaluer en 1 et en 0
  aides : 2x est (à une constante près) la dérivée de u = x² + 1 : forme u′/u. Ajuste la constante. | 3(∫_{0}^{1} 2x/(x² + 1) dx) | 3([ln(x² + 1)]_{0}^{1})
  pièges : a1_int_missing_inner_factor

Calcule ∫ 4cos(2x)·√(sin(2x)) dx.
  [guided]  (sin(2x))′
    ? Quelle méthode ? · uʳ⁺¹/(r + 1) + C, sans constante devant / ✔ Forme u′·uʳ avec u = sin 2x
    (u = sin 2x : sa dérivée apparaît-elle dans l'intégrale ?)
    = 2cos(2x)   ← Dériver u = sin 2x
  — L’intégrale  [juge antideriv]  départ : ∫ 4cos(2x)·√(sin(2x)) dx
    = 2(∫ 2cos(2x)·√(□) dx)   (trous : 2(∫ 2cos(2x)·√(sin(2x)) dx))   ← u = sin 2x, u′ = 2cos 2x : ajuster la constante
    = (4/3)□^(3/2) + C   (trous : (4/3)sin(2x)^(3/2) + C)   ← ∫ u′·uʳ = uʳ⁺¹/(r + 1)
  aides : 2cos 2x est (à une constante près) la dérivée de u = sin 2x : forme u′·uʳ. Ajuste la constante. | 2(∫ 2cos(2x)·√(sin(2x)) dx) | (4/3)sin(2x)^(3/2) + C
  pièges : g6_chain_forgot, g6_cos_sign, a1_int_missing_inner_factor, a1_int_no_constant

Calcule ∫ sin(x)/cos(x) dx.
  [guided]  (cos(x))′
    ? Quelle méthode ? · Log(cos x) + C, sans constante devant / ✔ Forme u′/u avec u = cos x
    (u = cos x : sa dérivée apparaît-elle dans l'intégrale ?)
    = −sin(x)   ← Dériver u = cos x
  — L’intégrale  [juge antideriv]  départ : ∫ sin(x)/cos(x) dx
    = −∫ −sin(x)/□ dx   (trous : −∫ −sin(x)/cos(x) dx)   ← u = cos x, u′ = −sin x : ajuster la constante
    = −ln(|□|) + C   (trous : −ln(|cos(x)|) + C)   ← ∫ u′/u = Log u
  aides : −sin x est (à une constante près) la dérivée de u = cos x : forme u′/u. Ajuste la constante. | −∫ −sin(x)/cos(x) dx | −ln(|cos(x)|) + C
  pièges : g6_cos_sign, a1_int_missing_inner_factor, a1_int_no_constant

```

### Niveau 3

```
Calcule ∫_{e}^{e²} 3/(x·ln(x)) dx.
  [tap, suivre l'erreur, menu steps]  ∫_{e}^{e²} 3/(x·ln(x)) dx
    ? Quelle méthode ? · Log(Log x) + C, sans constante devant / · Intégration par parties / ✔ Changement de variable t = Log x, puis dt = 1/x dx / ✔ Forme u′/u avec u = Log x
    = 3(∫_{e}^{e²} 1/(x·ln(x)) dx)   ← u = Log x, u′ = 1/x : ajuster la constante
    = 3([ln(|ln(x)|)]_{e}^{e²})   ← Primitive
    = 3ln(2)   ← Évaluer en e^2 et en e
  aides : 1/x est (à une constante près) la dérivée de u = Log x : forme u′/u. Ajuste la constante. | 3(∫_{e}^{e²} 1/(x·ln(x)) dx) | 3([ln(|ln(x)|)]_{e}^{e²})
  pièges : a1_int_missing_inner_factor, a1_int_log_of_denominator

Calcule ∫ 5x·√(x² + 3) dx.
  [tap, suivre l'erreur, menu steps]  (x² + 3)′
    ? Quelle méthode ? ✔ Changement de variable t = x² + 3, puis dt = 2x dx / ✔ Forme u′·uʳ avec u = x² + 3 / · Intégration par parties / · uʳ⁺¹/(r + 1) + C, sans constante devant
    (u = x² + 3 : sa dérivée apparaît-elle dans l'intégrale ?)
    = 2x   ← Dériver u = x² + 3
  — L’intégrale  [juge antideriv]  départ : ∫ 5x·√(x² + 3) dx
    = (5/2)(∫ 2x·√(x² + 3) dx)   ← u = x² + 3, u′ = 2x : ajuster la constante
    = (5/3)(x² + 3)^(3/2) + C   ← ∫ u′·uʳ = uʳ⁺¹/(r + 1)
  aides : 2x est (à une constante près) la dérivée de u = x² + 3 : forme u′·uʳ. Ajuste la constante. | (5/2)(∫ 2x·√(x² + 3) dx) | (5/3)(x² + 3)^(3/2) + C
  pièges : a1_int_missing_inner_factor, a1_int_no_constant

Calcule ∫_{π/12}^{π/4} 5cos(2x)·e^(sin(2x)) dx.
  [tap, suivre l'erreur, menu steps]  ∫_{π/12}^{π/4} 5cos(2x)·e^(sin(2x)) dx
    ? Quelle méthode ? · Intégration par parties / ✔ Changement de variable t = sin 2x, puis dt = 2cos 2x dx / · exp(sin 2x) + C, sans constante devant / ✔ Forme u′·eᵘ avec u = sin 2x
    = (5/2)(∫_{π/12}^{π/4} 2cos(2x)·e^(sin(2x)) dx)   ← u = sin 2x, u′ = 2cos 2x : ajuster la constante
    = (5/2)([e^(sin(2x))]_{π/12}^{π/4})   ← Primitive
    = 5e/2 − 5e^(1/2)/2   ← Évaluer en π/4 et en π/12
  aides : 2cos 2x est (à une constante près) la dérivée de u = sin 2x : forme u′·eᵘ. Ajuste la constante. | (5/2)(∫_{π/12}^{π/4} 2cos(2x)·e^(sin(2x)) dx) | (5/2)([e^(sin(2x))]_{π/12}^{π/4})
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term

```

### Niveau 4

```
Calcule ∫_{1}^{e} 2ln(x)²/x dx.
  [free, suivre l'erreur]  ∫_{1}^{e} 2ln(x)²/x dx
    = 2(∫_{1}^{e} ln(x)²/x dx)   ← u = Log x, u′ = 1/x : ajuster la constante
    = (2/3)([ln(x)³]_{1}^{e})   ← Primitive
    = 2/3   ← Évaluer en e et en 1
  aides : 1/x est (à une constante près) la dérivée de u = Log x : forme u′·uʳ. Ajuste la constante. | 2(∫_{1}^{e} ln(x)²/x dx) | (2/3)([ln(x)³]_{1}^{e})
  pièges : a1_int_missing_inner_factor

Calcule ∫_{1}^{e} 4/(x·(1 + ln(x)²)) dx.
  [free, suivre l'erreur]  ∫_{1}^{e} 4/(x·(1 + ln(x)²)) dx
    = 4(∫_{1}^{e} 1/(x·(1 + ln(x)²)) dx)   ← u = Log x, u′ = 1/x : ajuster la constante
    = 4([arctan(ln(x))]_{1}^{e})   ← Primitive
    = π   ← Évaluer en e et en 1
  aides : 1/x est (à une constante près) la dérivée de u = Log x : forme u′/(1 + u²). Ajuste la constante. | 4(∫_{1}^{e} 1/(x·(1 + ln(x)²)) dx) | 4([arctan(ln(x))]_{1}^{e})
  pièges : a1_int_missing_inner_factor, a1_int_log_of_denominator

Calcule ∫_{0}^{π/4} 5cos(2x)·sin(2x)² dx.
  [free, suivre l'erreur]  ∫_{0}^{π/4} 5cos(2x)·sin(2x)² dx
    = (5/2)(∫_{0}^{π/4} 2cos(2x)·sin(2x)² dx)   ← u = sin 2x, u′ = 2cos 2x : ajuster la constante
    = (5/6)([sin(2x)³]_{0}^{π/4})   ← Primitive
    = 5/6   ← Évaluer en π/4 et en 0
  aides : 2cos 2x est (à une constante près) la dérivée de u = sin 2x : forme u′·uʳ. Ajuste la constante. | (5/2)(∫_{0}^{π/4} 2cos(2x)·sin(2x)² dx) | (5/6)([sin(2x)³]_{0}^{π/4})
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term

```

### Niveau 5

```
Calcule ∫_{0}^{ln(2)/2} 6e^(2x)/(1 + e^(4x)) dx.
  [free, sans aide]  ∫_{0}^{ln(2)/2} 6e^(2x)/(1 + e^(4x)) dx
    = 3(∫_{0}^{ln(2)/2} 2e^(2x)/(1 + (e^(2x))²) dx)   ← u = e²ˣ, u′ = 2e²ˣ : ajuster la constante
    = 3([arctan(e^(2x))]_{0}^{ln(2)/2})   ← Primitive
    = 3arctan(2) − 3π/4   ← Évaluer en ln(2)/2 et en 0
  pièges : a1_int_missing_inner_factor

Calcule ∫_{0}^{ln(2)} 6e^x·√(e^x + 3) dx.
  [free, sans aide]  ∫_{0}^{ln(2)} 6e^x·√(e^x + 3) dx
    = 6(∫_{0}^{ln(2)} e^x·√(e^x + 3) dx)   ← u = eˣ + 3, u′ = eˣ : ajuster la constante
    = 4([(e^x + 3)^(3/2)]_{0}^{ln(2)})   ← Primitive
    = 20√5 − 32   ← Évaluer en ln(2) et en 0
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term

Calcule ∫_{0}^{1} x²·e^(x³) dx.
  [free, sans aide]  ∫_{0}^{1} x²·e^(x³) dx
    = (1/3)(∫_{0}^{1} 3x²·e^(x³) dx)   ← u = x³, u′ = 3x² : ajuster la constante
    = (1/3)([e^(x³)]_{0}^{1})   ← Primitive
    = e/3 − 1/3   ← Évaluer en 1 et en 0
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term

```

### Variantes d'examen

```
∫ 5x·e^(x²) dx =
  · (5/4)e^(x²) + C [a1_int_missing_inner_factor]   ✔ (5/2)e^(x²) + C   · 5e^(x²) + C [a1_int_missing_inner_factor]   · (5/2)e^(x²) [a1_int_no_constant]
  [examen mcq]
  pièges : a1_int_missing_inner_factor, a1_int_no_constant

Vrai ou faux ?
  « Sur un intervalle où u ne s'annule pas, ∫ u′/u dx = Log|u| + C. » → VRAI
  [examen tf]

```

## Changement de variable : choisir φ, changer dx et les bornes (`a1-int-subst`, BA1)

_t = √x, t = Log x, x = sin t… : dx et les bornes changent aussi._

### Niveau 1

```
Calcule ∫ 3/(√x(9 + x)) dx.
  [guided]  (t²)′
    (Méthode : changement de variable t = √x, x = t², dx = 2t dt)
    (t = √x, x = t² : dx = (t²)′ dt.)
    = 2t   ← dx/dt
  — L’intégrale  [juge antideriv]  départ : ∫ 3/(√x(9 + x)) dx
    = ∫ 3/(t(9 + t²))·(□) dt   (trous : ∫ 3/(t(9 + t²))·(2t) dt)   ← Remplacer x et dx
    = ∫ 6/(9 + t²) dt   ← Simplifier
    = 2arctan(t/3) + C   ← Intégrer en t
    = 2arctan(√x/3) + C   ← Revenir à x
  aides : Pose t = √x, x = t² ; n'oublie ni dx. | ∫ 3/(t(9 + t²))·(2t) dt | ∫ 6/(9 + t²) dt
  pièges : a1_int_no_constant

Calcule ∫_{1}^{9} 3/(√x(1 + √x)) dx.
  [guided]  ∫_{1}^{9} 3/(√x(1 + √x)) dx
    (Méthode : changement de variable t = √x, x = t², dx = 2t dt)
    = ∫_{□}^{□} 3/(t(1 + t))·(□) dt   (trous : ∫_{1}^{3} 3/(t(1 + t))·(2t) dt)   ← Remplacer x, dx et les bornes
    = ∫_{1}^{3} 6/(1 + t) dt   ← Simplifier
    = 6([ln(1 + t)]_{1}^{3})   ← Intégrer en t
    = 6ln(2)   ← Évaluer
  aides : Pose t = √x, x = t² ; n'oublie ni dx ni les bornes. | ∫_{1}^{3} 3/(t(1 + t))·(2t) dt | ∫_{1}^{3} 6/(1 + t) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫ 1/(√x(4 + x)) dx.
  [guided]  (t²)′
    (Méthode : changement de variable t = √x, x = t², dx = 2t dt)
    (t = √x, x = t² : dx = (t²)′ dt.)
    = 2t   ← dx/dt
  — L’intégrale  [juge antideriv]  départ : ∫ 1/(√x(4 + x)) dx
    = ∫ 1/(t(4 + t²))·(□) dt   (trous : ∫ 1/(t(4 + t²))·(2t) dt)   ← Remplacer x et dx
    = ∫ 2/(4 + t²) dt   ← Simplifier
    = arctan(t/2) + C   ← Intégrer en t
    = arctan(√x/2) + C   ← Revenir à x
  aides : Pose t = √x, x = t² ; n'oublie ni dx. | ∫ 1/(t(4 + t²))·(2t) dt | ∫ 2/(4 + t²) dt
  pièges : a1_int_no_constant

```

### Niveau 2

```
Calcule ∫_{1}^{6} x/√(x + 3) dx.
  [guided]  ∫_{1}^{6} x/√(x + 3) dx
    ? Quelle méthode ? · Remplacer √(x + 3) par t, et dx par dt / ✔ Changement de variable
    = ∫_{□}^{□} (t² − 3)/t·(□) dt   (trous : ∫_{2}^{3} (t² − 3)/t·(2t) dt)   ← Remplacer x, dx et les bornes
    = ∫_{2}^{3} (2t² − 6) dt   ← Simplifier
    = [(2/3)t³ − 6t]_{2}^{3}   ← Intégrer en t
    = 20/3   ← Évaluer
  aides : Pose t = √(x + 3), x = t² − 3 ; n'oublie ni dx ni les bornes. | ∫_{2}^{3} (t² − 3)/t·(2t) dt | ∫_{2}^{3} (2t² − 6) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{8} x/√(x + 1) dx.
  [guided]  ∫_{0}^{8} x/√(x + 1) dx
    ? Quelle méthode ? · Remplacer √(x + 1) par t, et dx par dt / ✔ Changement de variable
    = ∫_{□}^{□} (t² − 1)/t·(□) dt   (trous : ∫_{1}^{3} (t² − 1)/t·(2t) dt)   ← Remplacer x, dx et les bornes
    = ∫_{1}^{3} (2t² − 2) dt   ← Simplifier
    = [(2/3)t³ − 2t]_{1}^{3}   ← Intégrer en t
    = 40/3   ← Évaluer
  aides : Pose t = √(x + 1), x = t² − 1 ; n'oublie ni dx ni les bornes. | ∫_{1}^{3} (t² − 1)/t·(2t) dt | ∫_{1}^{3} (2t² − 2) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫ ln(x)/(x√(ln(x)² + 4)) dx.
  [guided]  (e^t)′
    ? Quelle méthode ? ✔ Changement de variable / · Remplacer Log x par t, et dx par dt
    (t = Log x, x = eᵗ : dx = (eᵗ)′ dt.)
    = e^t   ← dx/dt
  — L’intégrale  [juge antideriv]  départ : ∫ ln(x)/(x√(ln(x)² + 4)) dx
    = ∫ t/(□·√(t² + 4))·e^t dt   (trous : ∫ t/(e^t·√(t² + 4))·e^t dt)   ← Remplacer x et dx
    = ∫ t/√(t² + 4) dt   ← Simplifier
    = √(t² + 4) + C   ← Intégrer en t
    = √(ln(x)² + 4) + C   ← Revenir à x
  aides : Pose t = Log x, x = eᵗ ; n'oublie ni dx. | ∫ t/(e^t·√(t² + 4))·e^t dt | ∫ t/√(t² + 4) dt
  pièges : g6_power_rule_exp, a1_subst_dx_kept, a1_int_no_constant

```

### Niveau 3

```
Calcule ∫_{4}^{16} 1/(√x(1 + √x)) dx.
  [tap, suivre l'erreur, menu steps]  ∫_{4}^{16} 1/(√x(1 + √x)) dx
    ? Quelle méthode ? · Remplacer √x par t, et dx par dt / ✔ Changement de variable / · Décomposer en éléments simples en x / ✔ Parties avec u = 1/(1 + √x)
    = ∫_{2}^{4} 1/(t(1 + t))·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{2}^{4} 2/(1 + t) dt   ← Simplifier
    = 2([ln(1 + t)]_{2}^{4})   ← Intégrer en t
    = 2ln(5/3)   ← Évaluer
  aides : Pose t = √x, x = t² ; n'oublie ni dx ni les bornes. | ∫_{2}^{4} 1/(t(1 + t))·(2t) dt | ∫_{2}^{4} 2/(1 + t) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫ ln(x)/(x√(ln(x)² + 8)) dx.
  [tap, suivre l'erreur, menu steps]  (e^t)′
    ? Quelle méthode ? ✔ Parties avec u = Log x / · Remplacer Log x par t, et dx par dt / ✔ Changement de variable / · Décomposer en éléments simples en x
    (t = Log x, x = eᵗ : dx = (eᵗ)′ dt.)
    = e^t   ← dx/dt
  — L’intégrale  [juge antideriv]  départ : ∫ ln(x)/(x√(ln(x)² + 8)) dx
    = ∫ t/(e^t·√(t² + 8))·e^t dt   ← Remplacer x et dx
    = ∫ t/√(t² + 8) dt   ← Simplifier
    = √(t² + 8) + C   ← Intégrer en t
    = √(ln(x)² + 8) + C   ← Revenir à x
  aides : Pose t = Log x, x = eᵗ ; n'oublie ni dx. | ∫ t/(e^t·√(t² + 8))·e^t dt | ∫ t/√(t² + 8) dt
  pièges : g6_power_rule_exp, a1_subst_dx_kept, a1_int_no_constant

Calcule ∫ ln(x)/(x√(ln(x)² + 2)) dx.
  [tap, suivre l'erreur, menu steps]  (e^t)′
    ? Quelle méthode ? ✔ Changement de variable / · Décomposer en éléments simples en x / · Remplacer Log x par t, et dx par dt / ✔ Parties avec u = Log x
    (t = Log x, x = eᵗ : dx = (eᵗ)′ dt.)
    = e^t   ← dx/dt
  — L’intégrale  [juge antideriv]  départ : ∫ ln(x)/(x√(ln(x)² + 2)) dx
    = ∫ t/(e^t·√(t² + 2))·e^t dt   ← Remplacer x et dx
    = ∫ t/√(t² + 2) dt   ← Simplifier
    = √(t² + 2) + C   ← Intégrer en t
    = √(ln(x)² + 2) + C   ← Revenir à x
  aides : Pose t = Log x, x = eᵗ ; n'oublie ni dx. | ∫ t/(e^t·√(t² + 2))·e^t dt | ∫ t/√(t² + 2) dt
  pièges : g6_power_rule_exp, a1_subst_dx_kept, a1_int_no_constant

```

### Niveau 4

```
Calcule ∫_{0}^{3} x/√(x + 1) dx.
  [free, suivre l'erreur]  ∫_{0}^{3} x/√(x + 1) dx
    = ∫_{1}^{2} (t² − 1)/t·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{1}^{2} (2t² − 2) dt   ← Simplifier
    = [(2/3)t³ − 2t]_{1}^{2}   ← Intégrer en t
    = 8/3   ← Évaluer
  aides : Pose t = √(x + 1), x = t² − 1 ; n'oublie ni dx ni les bornes. | ∫_{1}^{2} (t² − 1)/t·(2t) dt | ∫_{1}^{2} (2t² − 2) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{1}^{9} 1/(√x(2 + √x)) dx.
  [free, suivre l'erreur]  ∫_{1}^{9} 1/(√x(2 + √x)) dx
    = ∫_{1}^{3} 1/(t(2 + t))·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{1}^{3} 2/(2 + t) dt   ← Simplifier
    = 2([ln(2 + t)]_{1}^{3})   ← Intégrer en t
    = 2ln(5/3)   ← Évaluer
  aides : Pose t = √x, x = t² ; n'oublie ni dx ni les bornes. | ∫_{1}^{3} 1/(t(2 + t))·(2t) dt | ∫_{1}^{3} 2/(2 + t) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{9}^{16} 2/(√x(3 + √x)) dx.
  [free, suivre l'erreur]  ∫_{9}^{16} 2/(√x(3 + √x)) dx
    = ∫_{3}^{4} 2/(t(3 + t))·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{3}^{4} 4/(3 + t) dt   ← Simplifier
    = 4([ln(3 + t)]_{3}^{4})   ← Intégrer en t
    = 4ln(7/6)   ← Évaluer
  aides : Pose t = √x, x = t² ; n'oublie ni dx ni les bornes. | ∫_{3}^{4} 2/(t(3 + t))·(2t) dt | ∫_{3}^{4} 4/(3 + t) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

```

### Niveau 5

```
Calcule ∫_{−1}^{7} x/√(x + 2) dx.
  [free, sans aide]  ∫_{−1}^{7} x/√(x + 2) dx
    = ∫_{1}^{3} (t² − 2)/t·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{1}^{3} (2t² − 4) dt   ← Simplifier
    = [(2/3)t³ − 4t]_{1}^{3}   ← Intégrer en t
    = 28/3   ← Évaluer
  pièges : a1_subst_dx_kept, a1_int_log_of_denominator, a1_subst_bounds_kept

Calcule ∫_{9}^{16} 1/(√x(3 + √x)) dx.
  [free, sans aide]  ∫_{9}^{16} 1/(√x(3 + √x)) dx
    = ∫_{3}^{4} 1/(t(3 + t))·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{3}^{4} 2/(3 + t) dt   ← Simplifier
    = 2([ln(3 + t)]_{3}^{4})   ← Intégrer en t
    = 2ln(7/6)   ← Évaluer
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{−1}^{2} x/√(x + 2) dx.
  [free, sans aide]  ∫_{−1}^{2} x/√(x + 2) dx
    = ∫_{1}^{2} (t² − 2)/t·(2t) dt   ← Remplacer x, dx et les bornes
    = ∫_{1}^{2} (2t² − 4) dt   ← Simplifier
    = [(2/3)t³ − 4t]_{1}^{2}   ← Intégrer en t
    = 2/3   ← Évaluer
  pièges : a1_subst_dx_kept, a1_int_log_of_denominator, a1_subst_bounds_kept

```

### Variantes d'examen

```
∫_{1/3}^{3} 1/(√x(1 + x)) dx =
  · 2arctan(3) − 2arctan(1/3) [a1_subst_bounds_kept]   ✔ π/3   · ln(3) [a1_subst_dx_kept]   · ln(3)/2 [a1_subst_dx_kept]
  [examen mcq]
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept

Vrai ou faux ?
  « Si φ est de classe C¹ sur [α ; β] et f continue, ∫ de φ(α) à φ(β) de f(x) dx = ∫ de α à β de f(φ(t))·φ′(t) dt. » → VRAI
  [examen tf]

```

## Intégration par parties (`a1-int-parts`, BA1)

_∫ u·v′ = u·v − ∫ u′·v : dériver ce qui se simplifie._

### Niveau 1

```
Calcule ∫_{0}^{1} (2x² + x − 1)·e^x dx.
  [guided]  ∫_{0}^{1} (2x² + x − 1)·e^x dx
    (Méthode : intégration par parties avec u = 2x² + x − 1, v′ = e^x)
    = [(2x² + x − 1)·□]_{0}^{1} − ∫_{0}^{1} (□)·e^x dx   (trous : [(2x² + x − 1)·e^x]_{0}^{1} − ∫_{0}^{1} (4x + 1)·e^x dx)   ← u = 2x² + x − 1, v′ = e^x : u′ = 4x + 1, v = e^x
    = [(2x² + x − 1)·e^x]_{0}^{1} − ([(□)·e^x]_{0}^{1} − ∫_{0}^{1} 4e^x dx)   (trous : [(2x² + x − 1)·e^x]_{0}^{1} − ([(4x + 1)·e^x]_{0}^{1} − ∫_{0}^{1} 4e^x dx))   ← Deuxième intégration par parties
    = [(2x² − 3x + 2)e^x]_{0}^{1}   ← Intégrer ce qui reste
    = e − 2   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [(2x² + x − 1)·e^x]_{0}^{1} − ∫_{0}^{1} (4x + 1)·e^x dx | [(2x² + x − 1)·e^x]_{0}^{1} − ([(4x + 1)·e^x]_{0}^{1} − ∫_{0}^{1} 4e^x dx)
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫ (3x − 1)·sin(2x) dx.
  [guided]  (3x − 1)′
    (Méthode : intégration par parties avec u = 3x − 1, v′ = sin(2x))
    (u = 3x − 1, v′ = sin(2x) : dérive u.)
    = 3   ← Dériver u = 3x − 1
  — L’intégrale  [juge antideriv]  départ : ∫ (3x − 1)·sin(2x) dx
    = (3x − 1)·(□) − ∫ 3·(−cos(2x)/2) dx   (trous : (3x − 1)·(−cos(2x)/2) − ∫ 3·(−cos(2x)/2) dx)   ← u = 3x − 1, v′ = sin(2x) : u′ = 3, v = -cos(2x)/2
    = (−(3/2)x + 1/2)·cos(2x) + (3/4)sin(2x) + C   ← Intégrer et réduire
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | (3x − 1)·(−cos(2x)/2) − ∫ 3·(−cos(2x)/2) dx | (−(3/2)x + 1/2)·cos(2x) + (3/4)sin(2x) + C
  pièges : a1_int_product, a1_int_no_constant

Calcule ∫ (x + 2)·cos(2x) dx.
  [guided]  (x + 2)′
    (Méthode : intégration par parties avec u = x + 2, v′ = cos(2x))
    (u = x + 2, v′ = cos(2x) : dérive u.)
    = 1   ← Dériver u = x + 2
  — L’intégrale  [juge antideriv]  départ : ∫ (x + 2)·cos(2x) dx
    = (x + 2)·(□) − ∫ (sin(2x)/2) dx   (trous : (x + 2)·(sin(2x)/2) − ∫ (sin(2x)/2) dx)   ← u = x + 2, v′ = cos(2x) : u′ = 1, v = sin(2x)/2
    = ((1/2)x + 1)·sin(2x) + (1/4)cos(2x) + C   ← Intégrer et réduire
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | (x + 2)·(sin(2x)/2) − ∫ (sin(2x)/2) dx | ((1/2)x + 1)·sin(2x) + (1/4)cos(2x) + C
  pièges : a1_int_product, a1_int_no_constant

```

### Niveau 2

```
Calcule ∫_{−1}^{0} (3x − 1)·e^(−x) dx.
  [guided]  ∫_{−1}^{0} (3x − 1)·e^(−x) dx
    ? Quel choix pour u et v′ ? ✔ u = e⁻ˣ, v′ = 3x − 1 / ✔ u = 3x − 1, v′ = e⁻ˣ
    = [□]_{−1}^{0} − ∫_{−1}^{0} □ dx   (trous : [(3x − 1)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} 3·(−e^(−x)) dx)   ← u = 3x − 1, v′ = e⁻ˣ : u′ = 3, v = −e⁻ˣ
    = [(−3x − 2)e^(−x)]_{−1}^{0}   ← Intégrer ce qui reste
    = −e − 2   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [(3x − 1)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} 3·(−e^(−x)) dx | [(−3x − 2)e^(−x)]_{−1}^{0}
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫ x·ln(x) dx.
  [guided]  (ln(x))′
    ? Quel choix pour u et v′ ? · u = x, v′ = Log x / ✔ u = Log x, v′ = x
    (u = Log x, v′ = x : dérive u.)
    = 1/x   ← Dériver u = Log x
  — L’intégrale  [juge antideriv]  départ : ∫ x·ln(x) dx
    = (x²/2)·ln(x) − ∫ □ dx   (trous : (x²/2)·ln(x) − ∫ (x²/2)·(1/x) dx)   ← u = Log x, v′ = x : u′ = 1/x, v = x²/2
    = (x²/2)·ln(x) − ∫ x/2 dx   ← Simplifier
    = (x²/2)ln(x) − x²/4 + C   ← Intégrer et réduire
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | (x²/2)·ln(x) − ∫ (x²/2)·(1/x) dx | (x²/2)·ln(x) − ∫ x/2 dx
  pièges : a1_int_product, a1_int_no_constant

Calcule ∫ (2x² − 3x − 3)·e^(−x) dx.
  [guided]  (2x² − 3x − 3)′
    ? Quel choix pour u et v′ ? ✔ u = 2x² − 3x − 3, v′ = e⁻ˣ / ✔ u = e⁻ˣ, v′ = 2x² − 3x − 3
    (u = 2x² − 3x − 3, v′ = e⁻ˣ : dérive u.)
    = 4x − 3   ← Dériver u = 2x² − 3x − 3
  — L’intégrale  [juge antideriv]  départ : ∫ (2x² − 3x − 3)·e^(−x) dx
    = □ − ∫ □ dx   (trous : (2x² − 3x − 3)·(−e^(−x)) − ∫ (4x − 3)·(−e^(−x)) dx)   ← u = 2x² − 3x − 3, v′ = e⁻ˣ : u′ = 4x − 3, v = −e⁻ˣ
    = (2x² − 3x − 3)·(−e^(−x)) − ((□)·(−e^(−x)) − ∫ 4e^(−x) dx)   (trous : (2x² − 3x − 3)·(−e^(−x)) − ((−4x + 3)·(−e^(−x)) − ∫ 4e^(−x) dx))   ← Deuxième intégration par parties
    = (−2x² − x + 2)e^(−x) + C   ← Intégrer et réduire
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | (2x² − 3x − 3)·(−e^(−x)) − ∫ (4x − 3)·(−e^(−x)) dx | (2x² − 3x − 3)·(−e^(−x)) − ((−4x + 3)·(−e^(−x)) − ∫ 4e^(−x) dx)
  pièges : a1_int_product, a1_int_no_constant

```

### Niveau 3

```
Calcule ∫_{1}^{e} x³·ln(x) dx.
  [tap, suivre l'erreur, menu steps]  ∫_{1}^{e} x³·ln(x) dx
    ? Quelle méthode ? · ∫ Log x · ∫ x³ / · Substitution t = Log x / · Parties avec u = x³, v′ = Log x / ✔ Intégration par parties
    = [(x⁴/4)·ln(x)]_{1}^{e} − ∫_{1}^{e} (x⁴/4)·(1/x) dx   ← u = Log x, v′ = x³ : u′ = 1/x, v = x⁴/4
    = [(x⁴/4)·ln(x)]_{1}^{e} − ∫_{1}^{e} x³/4 dx   ← Simplifier
    = [(x⁴/4)ln(x) − x⁴/16]_{1}^{e}   ← Intégrer ce qui reste
    = 3e⁴/16 + 1/16   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [(x⁴/4)·ln(x)]_{1}^{e} − ∫_{1}^{e} (x⁴/4)·(1/x) dx | [(x⁴/4)·ln(x)]_{1}^{e} − ∫_{1}^{e} x³/4 dx
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫_{−1}^{0} ((x + 2)²)·e^x dx.
  [tap, suivre l'erreur, menu steps]  ∫_{−1}^{0} ((x + 2)²)·e^x dx
    ? Quelle méthode ? ✔ Intégration par parties / · Substitution t = (x + 2)² / ✔ Parties avec u = e^x, v′ = (x + 2)² / · ∫ (x + 2)² · ∫ e^x
    = [((x + 2)²)·e^x]_{−1}^{0} − ∫_{−1}^{0} (2(x + 2))·e^x dx   ← u = (x + 2)², v′ = e^x : u′ = 2(x + 2), v = e^x
    = [((x + 2)²)·e^x]_{−1}^{0} − ([(2x + 4)·e^x]_{−1}^{0} − ∫_{−1}^{0} 2e^x dx)   ← Deuxième intégration par parties
    = [(x² + 2x + 2)e^x]_{−1}^{0}   ← Intégrer ce qui reste
    = 2 − 1/e   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [((x + 2)²)·e^x]_{−1}^{0} − ∫_{−1}^{0} (2(x + 2))·e^x dx | [((x + 2)²)·e^x]_{−1}^{0} − ([(2x + 4)·e^x]_{−1}^{0} − ∫_{−1}^{0} 2e^x dx)
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫_{−1}^{0} (−x − 2)·e^(2x) dx.
  [tap, suivre l'erreur, menu steps]  ∫_{−1}^{0} (−x − 2)·e^(2x) dx
    ? Quelle méthode ? · ∫ −x − 2 · ∫ e²ˣ / · Substitution t = −x − 2 / ✔ Parties avec u = e²ˣ, v′ = −x − 2 / ✔ Intégration par parties
    = [(−x − 2)·(e^(2x)/2)]_{−1}^{0} − ∫_{−1}^{0} −1·(e^(2x)/2) dx   ← u = −x − 2, v′ = e²ˣ : u′ = −1, v = e²ˣ/2
    = [e^(2x)(−2x − 3)/4]_{−1}^{0}   ← Intégrer ce qui reste
    = e⁻²/4 − 3/4   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [(−x − 2)·(e^(2x)/2)]_{−1}^{0} − ∫_{−1}^{0} −1·(e^(2x)/2) dx | [e^(2x)(−2x − 3)/4]_{−1}^{0}
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

```

### Niveau 4

```
Calcule ∫_{0}^{π/2} x·sin(2x) dx.
  [free, suivre l'erreur]  ∫_{0}^{π/2} x·sin(2x) dx
    = [x·(−cos(2x)/2)]_{0}^{π/2} − ∫_{0}^{π/2} (−cos(2x)/2) dx   ← u = x, v′ = sin(2x) : u′ = 1, v = -cos(2x)/2
    = [−(1/2)x·cos(2x) + (1/4)sin(2x)]_{0}^{π/2}   ← Intégrer ce qui reste
    = π/4   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [x·(−cos(2x)/2)]_{0}^{π/2} − ∫_{0}^{π/2} (−cos(2x)/2) dx | [−(1/2)x·cos(2x) + (1/4)sin(2x)]_{0}^{π/2}
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_int_product, a1_ibp_boundary_term

Calcule ∫_{0}^{1} ((x − 1)²)·e^x dx.
  [free, suivre l'erreur]  ∫_{0}^{1} ((x − 1)²)·e^x dx
    = [((x − 1)²)·e^x]_{0}^{1} − ∫_{0}^{1} (2(x − 1))·e^x dx   ← u = (x − 1)², v′ = e^x : u′ = 2(x − 1), v = e^x
    = [((x − 1)²)·e^x]_{0}^{1} − ([(2x − 2)·e^x]_{0}^{1} − ∫_{0}^{1} 2e^x dx)   ← Deuxième intégration par parties
    = [(x² − 4x + 5)e^x]_{0}^{1}   ← Intégrer ce qui reste
    = 2e − 5   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [((x − 1)²)·e^x]_{0}^{1} − ∫_{0}^{1} (2(x − 1))·e^x dx | [((x − 1)²)·e^x]_{0}^{1} − ([(2x − 2)·e^x]_{0}^{1} − ∫_{0}^{1} 2e^x dx)
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫_{−1}^{0} (x² − 3x + 2)·e^(−x) dx.
  [free, suivre l'erreur]  ∫_{−1}^{0} (x² − 3x + 2)·e^(−x) dx
    = [(x² − 3x + 2)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} (2x − 3)·(−e^(−x)) dx   ← u = x² − 3x + 2, v′ = e⁻ˣ : u′ = 2x − 3, v = −e⁻ˣ
    = [(x² − 3x + 2)·(−e^(−x))]_{−1}^{0} − ([(−2x + 3)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} 2e^(−x) dx)   ← Deuxième intégration par parties
    = [(−x² + x − 1)e^(−x)]_{−1}^{0}   ← Intégrer ce qui reste
    = 3e − 1   ← Évaluer
  aides : Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable. | [(x² − 3x + 2)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} (2x − 3)·(−e^(−x)) dx | [(x² − 3x + 2)·(−e^(−x))]_{−1}^{0} − ([(−2x + 3)·(−e^(−x))]_{−1}^{0} − ∫_{−1}^{0} 2e^(−x) dx)
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

```

### Niveau 5

```
Calcule ∫_{0}^{1} (−x² − x − 3)·e^(−x) dx.
  [free, sans aide]  ∫_{0}^{1} (−x² − x − 3)·e^(−x) dx
    = [(−x² − x − 3)·(−e^(−x))]_{0}^{1} − ∫_{0}^{1} (−2x − 1)·(−e^(−x)) dx   ← u = −x² − x − 3, v′ = e⁻ˣ : u′ = −2x − 1, v = −e⁻ˣ
    = [(−x² − x − 3)·(−e^(−x))]_{0}^{1} − ([(2x + 1)·(−e^(−x))]_{0}^{1} − ∫_{0}^{1} −2e^(−x) dx)   ← Deuxième intégration par parties
    = [(x² + 3x + 6)e^(−x)]_{0}^{1}   ← Intégrer ce qui reste
    = 10/e − 6   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

Calcule ∫_{1}^{e} ln(x) dx.
  [free, sans aide]  ∫_{1}^{e} ln(x) dx
    = [x·ln(x)]_{1}^{e} − ∫_{1}^{e} x·(1/x) dx   ← u = Log x, v′ = 1 : u′ = 1/x, v = x
    = [x·ln(x) − x]_{1}^{e}   ← Intégrer ce qui reste
    = 1   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_int_product

Calcule ∫_{1}^{e} ln(x) dx.
  [free, sans aide]  ∫_{1}^{e} ln(x) dx
    = [x·ln(x)]_{1}^{e} − ∫_{1}^{e} x·(1/x) dx   ← u = Log x, v′ = 1 : u′ = 1/x, v = x
    = [x·ln(x) − x]_{1}^{e}   ← Intégrer ce qui reste
    = 1   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_int_product

```

### Variantes d'examen

```
∫_{−π}^{π} 2x·sin(x) dx =
  · 6π [a1_ibp_boundary_term]   · −8π [a1_ibp_plus]   ✔ 4π   · 0 [a1_int_product]
  [examen mcq]
  pièges : a1_ibp_boundary_term, a1_ibp_plus, a1_int_product

Vrai ou faux ?
  « ∫ x·eˣ dx = (x − 1)·eˣ + C. » → VRAI
  [examen tf]

Calcule ∫_{0}^{1} x·arctan(x) dx.
  [free, sans aide, examen open]  ∫_{0}^{1} x·arctan(x) dx
    = [(x²/2)·arctan(x)]_{0}^{1} − ∫_{0}^{1} (x²/2)·(1/(1 + x²)) dx   ← u = Arctg x, v′ = x : u′ = 1/(1 + x²), v = x²/2
    = [(x²/2)·arctan(x)]_{0}^{1} − (1/2)(∫_{0}^{1} (1 − 1/(1 + x²)) dx)   ← x²/(1 + x²) = 1 − 1/(1 + x²)
    = [(x²/2)arctan(x) − x/2 + arctan(x)/2]_{0}^{1}   ← Intégrer ce qui reste
    = π/4 − 1/2   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_ibp_plus, a1_ibp_boundary_term, a1_int_product

```

## Formules de récurrence Iₙ (`a1-int-reduction`, BA1)

_Une IPP exprime Iₙ avec Iₙ₋₁ ; on remonte depuis I₀._

### Niveau 1

```
Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₂.
  [guided]  I_n
    (Méthode : IPP avec u = (Log x)ⁿ, v′ = 1)
    (L'intégration par parties donne [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx).)
    = □ − □·I_(n − 1)   (trous : e − n·I_(n − 1))   ← Reconnaître Iₙ₋₁
  — Calcule I₀  [juge definite]  départ : I_0
    = [x]_{1}^{e}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à I₂  [juge definite]  départ : I_2
    = e − 2·I_1   ← Récurrence
    = e − 2·(e − I_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← I₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx) | e − n·I_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₂.
  [guided]  J_n
    (Méthode : IPP avec u = xⁿ, v′ = eˣ)
    (L'intégration par parties donne [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx).)
    = □ − □·J_(n − 1)   (trous : e − n·J_(n − 1))   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₂  [juge definite]  départ : J_2
    = e − 2·J_1   ← Récurrence
    = e − 2·(e − J_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← J₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₃.
  [guided]  J_n
    (Méthode : IPP avec u = xⁿ, v′ = eˣ)
    (L'intégration par parties donne [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx).)
    = □ − □·J_(n − 1)   (trous : e − n·J_(n − 1))   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₃  [juge definite]  départ : J_3
    = e − 3·J_2   ← Récurrence
    = e − 3·(e − 2·J_1)   ← Récurrence
    = e − 3·(e − 2·(e − J_0))   ← Récurrence
    = e − 3·(e − 2·(e − (e − 1)))   ← J₀ = e − 1
    = 6 − 2e   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

```

### Niveau 2

```
Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₃.
  [guided]  I_n
    ? Quelle méthode ? ✔ IPP avec u = (Log x)ⁿ, v′ = 1 / · IPP sans terme de bord : Iₙ = −n·Iₙ₋₁
    = [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx)   ← u = (Log x)ⁿ, v′ = 1
    = □ − n·I_(n − 1)   (trous : e − n·I_(n − 1))   ← Reconnaître Iₙ₋₁
  — Remonte la récurrence jusqu'à I₃  [juge definite]  départ : I_3
    (I₀ = e − 1.)
    = e − 3·I_2   ← Récurrence
    = e − 3·(e − 2·I_1)   ← Récurrence
    = e − 3·(e − 2·(e − I_0))   ← Récurrence
    = e − 3·(e − 2·(e − (e − 1)))   ← I₀ = e − 1
    = 6 − 2e   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx) | e − n·I_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₂.
  [guided]  I_n
    ? Quelle méthode ? · IPP sans terme de bord : Iₙ = −n·Iₙ₋₁ / ✔ IPP avec u = (Log x)ⁿ, v′ = 1
    = [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx)   ← u = (Log x)ⁿ, v′ = 1
    = □ − n·I_(n − 1)   (trous : e − n·I_(n − 1))   ← Reconnaître Iₙ₋₁
  — Remonte la récurrence jusqu'à I₂  [juge definite]  départ : I_2
    (I₀ = e − 1.)
    = e − 2·I_1   ← Récurrence
    = e − 2·(e − I_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← I₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx) | e − n·I_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₂.
  [guided]  I_n
    ? Quelle méthode ? · IPP sans terme de bord : Iₙ = −n·Iₙ₋₁ / ✔ IPP avec u = (Log x)ⁿ, v′ = 1
    = [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx)   ← u = (Log x)ⁿ, v′ = 1
    = □ − n·I_(n − 1)   (trous : e − n·I_(n − 1))   ← Reconnaître Iₙ₋₁
  — Remonte la récurrence jusqu'à I₂  [juge definite]  départ : I_2
    (I₀ = e − 1.)
    = e − 2·I_1   ← Récurrence
    = e − 2·(e − I_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← I₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx) | e − n·I_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

```

### Niveau 3

```
Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₂.
  [tap, suivre l'erreur, menu steps]  J_n
    ? Quelle méthode ? ✔ IPP avec u = xⁿ, v′ = eˣ / ✔ IPP avec u = eˣ, v′ = xⁿ / · Substitution t = xⁿ / · IPP sans terme de bord : Jₙ = −n·Jₙ₋₁
    = [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx)   ← u = xⁿ, v′ = eˣ
    = e − n·J_(n − 1)   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₂  [juge definite]  départ : J_2
    = e − 2·J_1   ← Récurrence
    = e − 2·(e − J_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← J₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₃.
  [tap, suivre l'erreur, menu steps]  J_n
    ? Quelle méthode ? ✔ IPP avec u = xⁿ, v′ = eˣ / ✔ IPP avec u = eˣ, v′ = xⁿ / · IPP sans terme de bord : Jₙ = −n·Jₙ₋₁ / · Substitution t = xⁿ
    = [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx)   ← u = xⁿ, v′ = eˣ
    = e − n·J_(n − 1)   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₃  [juge definite]  départ : J_3
    = e − 3·J_2   ← Récurrence
    = e − 3·(e − 2·J_1)   ← Récurrence
    = e − 3·(e − 2·(e − J_0))   ← Récurrence
    = e − 3·(e − 2·(e − (e − 1)))   ← J₀ = e − 1
    = 6 − 2e   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

Soit Jₙ = ∫₀¹ xⁿe²ˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₂.
  [tap, suivre l'erreur, menu steps]  J_n
    ? Quelle méthode ? ✔ IPP avec u = e²ˣ, v′ = xⁿ / · IPP sans terme de bord : Jₙ = −n·Jₙ₋₁ / ✔ IPP avec u = xⁿ, v′ = e²ˣ / · Substitution t = xⁿ
    = [x^n·e^(2x)/2]_{0}^{1} − (n/2)·(∫_{0}^{1} x^(n − 1)·e^(2x) dx)   ← u = xⁿ, v′ = e²ˣ
    = e²/2 − (n/2)·J_(n − 1)   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^(2x)/2]_{0}^{1}   ← Primitive
    = e²/2 − 1/2   ← Valeur
  — Remonte la récurrence jusqu'à J₂  [juge definite]  départ : J_2
    = e²/2 − J_1   ← Récurrence
    = e²/2 − (e²/2 − (1/2)·J_0)   ← Récurrence
    = e²/2 − (e²/2 − (1/2)·(e²/2 − 1/2))   ← J₀ = e²/2 − 1/2
    = e²/4 − 1/4   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^(2x)/2]_{0}^{1} − (n/2)·(∫_{0}^{1} x^(n − 1)·e^(2x) dx) | e²/2 − (n/2)·J_(n − 1)
  pièges : a1_ibp_boundary_term, a1_reduction_index

```

### Niveau 4

```
Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₂.
  [free, suivre l'erreur]  J_n
    = [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx)   ← u = xⁿ, v′ = eˣ
    = e − n·J_(n − 1)   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₂  [juge definite]  départ : J_2
    = e − 2·J_1   ← Récurrence
    = e − 2·(e − J_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← J₀ = e − 1
    = e − 2   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

Soit Jₙ = ∫₀¹ xⁿeˣ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule J₄.
  [free, suivre l'erreur]  J_n
    = [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx)   ← u = xⁿ, v′ = eˣ
    = e − n·J_(n − 1)   ← Reconnaître Jₙ₋₁
  — Calcule J₀  [juge definite]  départ : J_0
    = [e^x]_{0}^{1}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à J₄  [juge definite]  départ : J_4
    = e − 4·J_3   ← Récurrence
    = e − 4·(e − 3·J_2)   ← Récurrence
    = e − 4·(e − 3·(e − 2·J_1))   ← Récurrence
    = e − 4·(e − 3·(e − 2·(e − J_0)))   ← Récurrence
    = e − 4·(e − 3·(e − 2·(e − (e − 1))))   ← J₀ = e − 1
    = 9e − 24   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x^n·e^x]_{0}^{1} − n·(∫_{0}^{1} x^(n − 1)·e^x dx) | e − n·J_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₃.
  [free, suivre l'erreur]  I_n
    = [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx)   ← u = (Log x)ⁿ, v′ = 1
    = e − n·I_(n − 1)   ← Reconnaître Iₙ₋₁
  — Calcule I₀  [juge definite]  départ : I_0
    = [x]_{1}^{e}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à I₃  [juge definite]  départ : I_3
    = e − 3·I_2   ← Récurrence
    = e − 3·(e − 2·I_1)   ← Récurrence
    = e − 3·(e − 2·(e − I_0))   ← Récurrence
    = e − 3·(e − 2·(e − (e − 1)))   ← I₀ = e − 1
    = 6 − 2e   ← Calculer
  aides : Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième. | [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx) | e − n·I_(n − 1)
  pièges : a1_reduction_index, a1_ibp_boundary_term

```

### Niveau 5

```
Soit Wₙ = ∫₀^(π/2) sinⁿx dx. Trouve une relation entre Wₙ et Wₙ₋₂ (n ≥ 2), puis calcule W₃.
  [free, sans aide]  W_n
    = (n − 1)·(∫_{0}^{π/2} sin(x)^(n − 2)·cos(x)² dx)   ← IPP : u = sinⁿ⁻¹x, v′ = sin x (le terme de bord est nul)
    = (n − 1)·(W_(n − 2) − W_n)   ← cos²x = 1 − sin²x
    = (n − 1)/n·W_(n − 2)   ← Résoudre en Wₙ
  — Calcule W₃  [juge definite]  départ : W_3
    = (2/3)W_1   ← Remonter
    = 2/3   ← W₁ = 1
  pièges : a1_reduction_index

Soit Wₙ = ∫₀^(π/2) sinⁿx dx. Trouve une relation entre Wₙ et Wₙ₋₂ (n ≥ 2), puis calcule W₅.
  [free, sans aide]  W_n
    = (n − 1)·(∫_{0}^{π/2} sin(x)^(n − 2)·cos(x)² dx)   ← IPP : u = sinⁿ⁻¹x, v′ = sin x (le terme de bord est nul)
    = (n − 1)·(W_(n − 2) − W_n)   ← cos²x = 1 − sin²x
    = (n − 1)/n·W_(n − 2)   ← Résoudre en Wₙ
  — Calcule W₅  [juge definite]  départ : W_5
    = (4/5)(2/3)W_1   ← Remonter
    = 8/15   ← W₁ = 1
  pièges : a1_reduction_index

Soit Wₙ = ∫₀^(π/2) sinⁿx dx. Trouve une relation entre Wₙ et Wₙ₋₂ (n ≥ 2), puis calcule W₃.
  [free, sans aide]  W_n
    = (n − 1)·(∫_{0}^{π/2} sin(x)^(n − 2)·cos(x)² dx)   ← IPP : u = sinⁿ⁻¹x, v′ = sin x (le terme de bord est nul)
    = (n − 1)·(W_(n − 2) − W_n)   ← cos²x = 1 − sin²x
    = (n − 1)/n·W_(n − 2)   ← Résoudre en Wₙ
  — Calcule W₃  [juge definite]  départ : W_3
    = (2/3)W_1   ← Remonter
    = 2/3   ← W₁ = 1
  pièges : a1_reduction_index

```

### Variantes d'examen

```
Soit Jₙ = ∫₀¹ xⁿeˣ dx. Alors J₄ =
  ✔ 9e − 24   · 65e − 24 [a1_ibp_sign]   · −2e [a1_reduction_index]   · 24e − 24 [a1_ibp_boundary_term]
  [examen mcq]
  pièges : a1_reduction_index, a1_ibp_boundary_term, a1_ibp_sign

Soit Iₙ = ∫₁ᵉ (Log x)ⁿ dx (n ≥ 0). Trouve une formule de récurrence, puis calcule I₂.
  [free, sans aide, examen open]  I_n
    = [x·ln(x)^n]_{1}^{e} − n·(∫_{1}^{e} ln(x)^(n − 1) dx)   ← u = (Log x)ⁿ, v′ = 1
    = e − n·I_(n − 1)   ← Reconnaître Iₙ₋₁
  — Calcule I₀  [juge definite]  départ : I_0
    = [x]_{1}^{e}   ← Primitive
    = e − 1   ← Valeur
  — Remonte la récurrence jusqu'à I₂  [juge definite]  départ : I_2
    = e − 2·I_1   ← Récurrence
    = e − 2·(e − I_0)   ← Récurrence
    = e − 2·(e − (e − 1))   ← I₀ = e − 1
    = e − 2   ← Calculer
  pièges : a1_reduction_index, a1_ibp_boundary_term

```

## Fractions rationnelles : DES, y compris avec un facteur irréductible (`a1-int-rational`, BA1)

_Division, factorisation, éléments simples, puis Log et Arctg._

### Niveau 1

```
Calcule ∫ (3x² + 13x + 32)/((x − 1)(x² + 4x + 7)) dx.
  [guided]  (3x² + 13x + 32)/((x − 1)(x² + 4x + 7))
    (Méthode : décomposition en éléments simples : A/(x − 1) + (Bx + C)/(x² + 4x + 7))
    (Décompose la fraction.)
    = □/(x − 1) + (□)/(x² + 4x + 7)   (trous : 4/(x − 1) + (−x − 4)/(x² + 4x + 7))   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (3x² + 13x + 32)/((x − 1)(x² + 4x + 7)) dx
    = ∫ (4/(x − 1) + (−x − 4)/(x² + 4x + 7)) dx   ← Intégrer les éléments simples
    = 4(∫ 1/(x − 1) dx) − (1/2)(∫ (2x + 4)/(x² + 4x + 7) dx) − 2(∫ 1/((x + 2)² + 3) dx)   ← Dérivée du dénominateur + constante, carré complété
    = 4ln(|x − 1|) − (1/2)ln(x² + 4x + 7) − (2/√3)arctan((x + 2)/√3) + C   ← Log et Arctg
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | 4/(x − 1) + (−x − 4)/(x² + 4x + 7) | 4ln(|x − 1|) − (1/2)ln(x² + 4x + 7) − (2/√3)arctan((x + 2)/√3) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (3x² + 2x − 4)/((x)²(x − 2)) dx.
  [guided]  (3x² + 2x − 4)/((x)²(x − 2))
    (Méthode : décomposition en éléments simples : A/x + B/x² + C/(x − 2))
    (Décompose la fraction.)
    = □/x² + □/(x − 2)   (trous : 2/x² + 3/(x − 2))   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (3x² + 2x − 4)/((x)²(x − 2)) dx
    = ∫ (2/x² + 3/(x − 2)) dx   ← Intégrer les éléments simples
    = −2/(x) + 3ln(|x − 2|) + C   ← Log
  aides : Racine double : A/(x − a) + B/(x − a)², puis C/(x − b). | 2/x² + 3/(x − 2) | −2/(x) + 3ln(|x − 2|) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (−4x² − 5x + 2)/((x + 2)(x² + 2x + 4)) dx.
  [guided]  (−4x² − 5x + 2)/((x + 2)(x² + 2x + 4))
    (Méthode : décomposition en éléments simples : A/(x + 2) + (Bx + C)/(x² + 2x + 4))
    (Décompose la fraction.)
    = −□/(x + 2) + (□)/(x² + 2x + 4)   (trous : −1/(x + 2) + (−3x + 3)/(x² + 2x + 4))   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (−4x² − 5x + 2)/((x + 2)(x² + 2x + 4)) dx
    = ∫ (−1/(x + 2) + (−3x + 3)/(x² + 2x + 4)) dx   ← Intégrer les éléments simples
    = −∫ 1/(x + 2) dx − (3/2)(∫ (2x + 2)/(x² + 2x + 4) dx) + 6(∫ 1/((x + 1)² + 3) dx)   ← Dérivée du dénominateur + constante, carré complété
    = −ln(|x + 2|) − (3/2)ln(x² + 2x + 4) + (6/√3)arctan((x + 1)/√3) + C   ← Log et Arctg
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | −1/(x + 2) + (−3x + 3)/(x² + 2x + 4) | −ln(|x + 2|) − (3/2)ln(x² + 2x + 4) + (6/√3)arctan((x + 1)/√3) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

```

### Niveau 2

```
Calcule ∫ (−2x² − 13x − 4)/((x + 3)(x² − 2x + 2)) dx.
  [guided]  (−2x² − 13x − 4)/((x + 3)(x² − 2x + 2))
    ? Quelle forme pour la décomposition ? ✔ A/(x + 3) + (Bx + C)/(x² − 2x + 2) / · A/(x + 3) + B/(x − r₁) + C/(x − r₂) / · A/(x + 3) + B/(x² − 2x + 2)
    (Décompose la fraction.)
    = □/(x + 3) + (−3x − 2)/(x² − 2x + 2)   (trous : 1/(x + 3) + (−3x − 2)/(x² − 2x + 2))   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (−2x² − 13x − 4)/((x + 3)(x² − 2x + 2)) dx
    = ∫ (1/(x + 3) + (−3x − 2)/(x² − 2x + 2)) dx   ← Intégrer les éléments simples
    = ∫ 1/(x + 3) dx − (3/2)(∫ (2x − 2)/(x² − 2x + 2) dx) − 5(∫ 1/((x − 1)² + 1) dx)   ← Dérivée du dénominateur + constante, carré complété
    = ln(|x + 3|) − (3/2)ln(x² − 2x + 2) − 5arctan(x − 1) + C   ← Log et Arctg
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | 1/(x + 3) + (−3x − 2)/(x² − 2x + 2) | ln(|x + 3|) − (3/2)ln(x² − 2x + 2) − 5arctan(x − 1) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (3x² + 5x + 2)/((x − 2)(x² + 2)) dx.
  [guided]  (3x² + 5x + 2)/((x − 2)(x² + 2))
    ? Quelle forme pour la décomposition ? · A/(x − 2) + B/(x − r₁) + C/(x − r₂) / ✔ A/(x − 2) + (Bx + C)/(x² + 2) / · A/(x − 2) + B/(x² + 2)
    (Décompose la fraction.)
    = □/(x − 2) + (−x + 3)/(x² + 2)   (trous : 4/(x − 2) + (−x + 3)/(x² + 2))   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (3x² + 5x + 2)/((x − 2)(x² + 2)) dx
    = ∫ (4/(x − 2) + (−x + 3)/(x² + 2)) dx   ← Intégrer les éléments simples
    = 4(∫ 1/(x − 2) dx) − (1/2)(∫ 2x/(x² + 2) dx) + 3(∫ 1/(x² + 2) dx)   ← Dérivée du dénominateur + constante, carré complété
    = 4ln(|x − 2|) − (1/2)ln(x² + 2) + (3/√2)arctan(x/√2) + C   ← Log et Arctg
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | 4/(x − 2) + (−x + 3)/(x² + 2) | 4ln(|x − 2|) − (1/2)ln(x² + 2) + (3/√2)arctan(x/√2) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (5x² + x − 10)/((x − 1)²(x + 3)) dx.
  [guided]  (5x² + x − 10)/((x − 1)²(x + 3))
    ? Quelle forme pour la décomposition ? · A/(x − 1) + C/(x + 3) / ✔ A/(x − 1) + B/(x − 1)² + C/(x + 3) / · A/(x − 1)² + C/(x + 3)
    (Décompose la fraction.)
    = 3/(x − 1) − 1/(x − 1)² + 2/(x + 3)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (5x² + x − 10)/((x − 1)²(x + 3)) dx
    = ∫ (3/(x − 1) − 1/(x − 1)² + 2/(x + 3)) dx   ← Intégrer les éléments simples
    = 3ln(|x − 1|) + 1/(x − 1) + 2ln(|x + 3|) + C   ← Log
  aides : Racine double : A/(x − a) + B/(x − a)², puis C/(x − b). | 3/(x − 1) − 1/(x − 1)² + 2/(x + 3) | 3ln(|x − 1|) + 1/(x − 1) + 2ln(|x + 3|) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

```

### Niveau 3

```
Calcule ∫ (x² + 4x + 2)/((x)²(x + 1)) dx.
  [tap, suivre l'erreur, menu steps]  (x² + 4x + 2)/((x)²(x + 1))
    ? Quelle méthode ? ✔ Décomposition en éléments simples / ✔ Intégration par parties / · t = dénominateur / · Log|dénominateur|
    (Décompose la fraction.)
    = 2/x + 2/x² − 1/(x + 1)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (x² + 4x + 2)/((x)²(x + 1)) dx
    = ∫ (2/x + 2/x² − 1/(x + 1)) dx   ← Intégrer les éléments simples
    = 2ln(|x|) − 2/(x) − ln(|x + 1|) + C   ← Log
  aides : Racine double : A/(x − a) + B/(x − a)², puis C/(x − b). | 2/x + 2/x² − 1/(x + 1) | 2ln(|x|) − 2/(x) − ln(|x + 1|) + C
  pièges : a1_int_log_of_denominator, a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (−4x² − 5x − 6)/((x)²(x + 3)) dx.
  [tap, suivre l'erreur, menu steps]  (−4x² − 5x − 6)/((x)²(x + 3))
    ? Quelle méthode ? · Log|dénominateur| / · t = dénominateur / ✔ Décomposition en éléments simples / ✔ Intégration par parties
    (Décompose la fraction.)
    = −1/x − 2/x² − 3/(x + 3)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (−4x² − 5x − 6)/((x)²(x + 3)) dx
    = ∫ (−1/x − 2/x² − 3/(x + 3)) dx   ← Intégrer les éléments simples
    = −ln(|x|) + 2/(x) − 3ln(|x + 3|) + C   ← Log
  aides : Racine double : A/(x − a) + B/(x − a)², puis C/(x − b). | −1/x − 2/x² − 3/(x + 3) | −ln(|x|) + 2/(x) − 3ln(|x + 3|) + C
  pièges : a1_int_log_of_denominator, a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (−3x + 6)/((x + 2)(x² + 2x + 4)) dx.
  [tap, suivre l'erreur, menu steps]  (−3x + 6)/((x + 2)(x² + 2x + 4))
    ? Quelle méthode ? · Log|dénominateur| / ✔ Décomposition en éléments simples / ✔ Intégration par parties / · t = x² + 2x + 4
    (Décompose la fraction.)
    = 3/(x + 2) + (−3x − 3)/(x² + 2x + 4)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (−3x + 6)/((x + 2)(x² + 2x + 4)) dx
    = ∫ (3/(x + 2) + (−3x − 3)/(x² + 2x + 4)) dx   ← Intégrer les éléments simples
    = 3(∫ 1/(x + 2) dx) − (3/2)(∫ (2x + 2)/(x² + 2x + 4) dx)   ← Dérivée du dénominateur + constante, carré complété
    = 3ln(|x + 2|) − (3/2)ln(x² + 2x + 4) + C   ← Log
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | 3/(x + 2) + (−3x − 3)/(x² + 2x + 4) | 3ln(|x + 2|) − (3/2)ln(x² + 2x + 4) + C
  pièges : a1_int_log_of_denominator, a1_des_wrong_form, a1_int_no_constant

```

### Niveau 4

```
Calcule ∫ (x² − 11x + 14)/(x² − 3x + 2) dx.
  [free, suivre l'erreur]  (x² − 11x + 14)/(x² − 3x + 2)
    (Décompose la fraction.)
    = 1 + (−8x + 12)/((x − 1)(x − 2))   ← Division euclidienne
    = 1 − 4/(x − 1) − 4/(x − 2)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (x² − 11x + 14)/(x² − 3x + 2) dx
    = ∫ (1 − 4/(x − 1) − 4/(x − 2)) dx   ← Intégrer les éléments simples
    = x − 4ln(|x − 1|) − 4ln(|x − 2|) + C   ← Log
  aides : deg P = deg Q : divise d'abord, puis décompose le reste. | 1 − 4/(x − 1) − 4/(x − 2) | x − 4ln(|x − 1|) − 4ln(|x − 2|) + C
  pièges : g0_pfd_no_div, a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (x² + 2x + 5)/(x³ + x² − x − 1) dx.
  [free, suivre l'erreur]  (x² + 2x + 5)/(x³ + x² − x − 1)
    (Décompose la fraction.)
    = (x² + 2x + 5)/((x + 1)²(x − 1))   ← Factoriser Q
    = −1/(x + 1) − 2/(x + 1)² + 2/(x − 1)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (x² + 2x + 5)/(x³ + x² − x − 1) dx
    = ∫ (−1/(x + 1) − 2/(x + 1)² + 2/(x − 1)) dx   ← Intégrer les éléments simples
    = −ln(|x + 1|) + 2/(x + 1) + 2ln(|x − 1|) + C   ← Log
  aides : Racine double : A/(x − a) + B/(x − a)², puis C/(x − b). | −1/(x + 1) − 2/(x + 1)² + 2/(x − 1) | −ln(|x + 1|) + 2/(x + 1) + 2ln(|x − 1|) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

Calcule ∫ (−x² − 11x + 36)/(x³ + 6x + 20) dx.
  [free, suivre l'erreur]  (−x² − 11x + 36)/(x³ + 6x + 20)
    (Décompose la fraction.)
    = (−x² − 11x + 36)/((x + 2)(x² − 2x + 10))   ← Factoriser Q
    = 3/(x + 2) + (−4x + 3)/(x² − 2x + 10)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (−x² − 11x + 36)/(x³ + 6x + 20) dx
    = ∫ (3/(x + 2) + (−4x + 3)/(x² − 2x + 10)) dx   ← Intégrer les éléments simples
    = 3(∫ 1/(x + 2) dx) − 2(∫ (2x − 2)/(x² − 2x + 10) dx) − ∫ 1/((x − 1)² + 9) dx   ← Dérivée du dénominateur + constante, carré complété
    = 3ln(|x + 2|) − 2ln(x² − 2x + 10) − (1/3)arctan((x − 1)/3) + C   ← Log et Arctg
  aides : Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré. | 3/(x + 2) + (−4x + 3)/(x² − 2x + 10) | 3ln(|x + 2|) − 2ln(x² − 2x + 10) − (1/3)arctan((x − 1)/3) + C
  pièges : a1_des_wrong_form, a1_int_no_constant

```

### Niveau 5

```
Calcule ∫_{−1}^{0} (4x² − 8)/((x + 2)(x² + 4)) dx.
  [free, sans aide]  ∫_{−1}^{0} (4x² − 8)/((x + 2)(x² + 4)) dx
    = ∫_{−1}^{0} (1/(x + 2) + (3x − 6)/(x² + 4)) dx   ← Éléments simples
    = [ln(|x + 2|) + (3/2)ln(x² + 4) − 3arctan(x/2)]_{−1}^{0}   ← Intégrer
    = −3arctan(1/2) + 4ln(2) − 3ln(5)/2   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_int_log_of_denominator

Calcule ∫_{3}^{4} (x² + x + 6)/(x² − 4) dx.
  [free, sans aide]  ∫_{3}^{4} (x² + x + 6)/(x² − 4) dx
    = ∫_{3}^{4} (1 + (x + 10)/((x + 2)(x − 2))) dx   ← Division
    = ∫_{3}^{4} (1 − 2/(x + 2) + 3/(x − 2)) dx   ← Éléments simples
    = [x − 2ln(|x + 2|) + 3ln(|x − 2|)]_{3}^{4}   ← Intégrer
    = ln(50/9) + 1   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_int_log_of_denominator

Calcule ∫_{3}^{4} (−6x² − 6x − 18)/((x − 2)(x² + 2x + 10)) dx.
  [free, sans aide]  ∫_{3}^{4} (−6x² − 6x − 18)/((x − 2)(x² + 2x + 10)) dx
    = ∫_{3}^{4} (−3/(x − 2) + (−3x − 6)/(x² + 2x + 10)) dx   ← Éléments simples
    = [−3ln(|x − 2|) − (3/2)ln(x² + 2x + 10) − arctan((x + 1)/3)]_{3}^{4}   ← Intégrer
    = −arctan(5/3) + arctan(4/3) + 3ln(25/136)/2   ← Évaluer
  pièges : a1_int_missing_inner_factor, a1_int_log_of_denominator

```

### Variantes d'examen

```
∫ (7x² + 2x + 20)/(x(x² + 2x + 5)) dx =
  · 4ln(|x|) + (3/2)ln(x² + 2x + 5) − 9arctan(x + 1) + C [a1_arctg_scale]   · ln(|x(x² + 2x + 5)|) + C [a1_int_log_of_denominator]   ✔ 4ln(|x|) + (3/2)ln(x² + 2x + 5) − (9/2)arctan((x + 1)/2) + C   · 4ln(|x|) − (15/2)ln(x² + 2x + 5) + C [a1_int_arctg_as_log]
  [examen mcq]
  pièges : a1_arctg_scale, a1_int_arctg_as_log, a1_int_log_of_denominator

Calcule ∫ (4x² + x + 21)/(x³ + 3x² + 9x + 27) dx.
  [free, sans aide, examen open]  (4x² + x + 21)/(x³ + 3x² + 9x + 27)
    (Décompose la fraction.)
    = (4x² + x + 21)/((x + 3)(x² + 9))   ← Factoriser Q
    = 3/(x + 3) + (x − 2)/(x² + 9)   ← Éléments simples
  — L’intégrale  [juge antideriv]  départ : ∫ (4x² + x + 21)/(x³ + 3x² + 9x + 27) dx
    = ∫ (3/(x + 3) + (x − 2)/(x² + 9)) dx   ← Intégrer les éléments simples
    = 3(∫ 1/(x + 3) dx) + (1/2)(∫ 2x/(x² + 9) dx) − 2(∫ 1/(x² + 9) dx)   ← Dérivée du dénominateur + constante, carré complété
    = 3ln(|x + 3|) + (1/2)ln(x² + 9) − (2/3)arctan(x/3) + C   ← Log et Arctg
  pièges : a1_des_wrong_form, a1_int_no_constant

```

## Fractions rationnelles en sin et cos : Bioche et t = tan(x/2) (`a1-int-trig`, BA1)

_Invariance par x → −x, π − x, π + x ; sinon t = tan(x/2)._

### Niveau 1

```
Calcule ∫ 1/(3 − cos(x)) dx.
  [guided]  (2arctan(t))′
    (Méthode : t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²))
    (t = tan(x/2), donc x = 2 Arctg t : calcule dx/dt.)
    = 2/(1 + t²)   ← x = 2 Arctg t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/(3 − cos(x)) dx
    = ∫ 1/(3 − (1 − t²)/(1 + t²))·□ dt   (trous : ∫ 1/(3 − (1 − t²)/(1 + t²))·2/(1 + t²) dt)   ← Exprimer en t
    = ∫ 2/(2 + 4t²) dt   ← Diviser
    = (1/√2)arctan(√2·t) + C   ← Intégrer en t
    = (1/√2)arctan(√2·tan(x/2)) + C   ← Revenir en x
  aides : Pose t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²). | ∫ 1/(3 − (1 − t²)/(1 + t²))·2/(1 + t²) dt | (1/√2)arctan(√2·t) + C
  pièges : a1_arc_deriv_table, a1_trig_subst_dx, a1_int_no_constant

Calcule ∫ 1/(2 − cos(x)) dx.
  [guided]  (2arctan(t))′
    (Méthode : t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²))
    (t = tan(x/2), donc x = 2 Arctg t : calcule dx/dt.)
    = 2/(1 + t²)   ← x = 2 Arctg t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/(2 − cos(x)) dx
    = ∫ 1/(2 − (1 − t²)/(1 + t²))·□ dt   (trous : ∫ 1/(2 − (1 − t²)/(1 + t²))·2/(1 + t²) dt)   ← Exprimer en t
    = ∫ 2/(1 + 3t²) dt   ← Diviser
    = (2/√3)arctan(√3·t) + C   ← Intégrer en t
    = (2/√3)arctan(√3·tan(x/2)) + C   ← Revenir en x
  aides : Pose t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²). | ∫ 1/(2 − (1 − t²)/(1 + t²))·2/(1 + t²) dt | (2/√3)arctan(√3·t) + C
  pièges : a1_arc_deriv_table, a1_trig_subst_dx, a1_int_no_constant

Calcule ∫ 1/(2 − cos(x)) dx.
  [guided]  (2arctan(t))′
    (Méthode : t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²))
    (t = tan(x/2), donc x = 2 Arctg t : calcule dx/dt.)
    = 2/(1 + t²)   ← x = 2 Arctg t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/(2 − cos(x)) dx
    = ∫ 1/(2 − (1 − t²)/(1 + t²))·□ dt   (trous : ∫ 1/(2 − (1 − t²)/(1 + t²))·2/(1 + t²) dt)   ← Exprimer en t
    = ∫ 2/(1 + 3t²) dt   ← Diviser
    = (2/√3)arctan(√3·t) + C   ← Intégrer en t
    = (2/√3)arctan(√3·tan(x/2)) + C   ← Revenir en x
  aides : Pose t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²). | ∫ 1/(2 − (1 − t²)/(1 + t²))·2/(1 + t²) dt | (2/√3)arctan(√3·t) + C
  pièges : a1_arc_deriv_table, a1_trig_subst_dx, a1_int_no_constant

```

### Niveau 2

```
Calcule ∫ cos(x)/(4 + sin(x)²) dx.
  [guided]  (sin(x))′
    ? Quelle transformation laisse f(x) dx invariant ? · x → π + x : t = tan x / ✔ x → π − x : t = sin x / · x → −x : t = cos x
    (t = sin x : calcule dt/dx.)
    = cos(x)   ← t = sin x : dt = cos x dx
  — L’intégrale  [juge antideriv]  départ : ∫ cos(x)/(4 + sin(x)²) dx
    = ∫ 1/(4 + t²) dt   ← Exprimer en t
    = (1/2)arctan(t/2) + C   ← Intégrer en t
    = (1/2)arctan(sin(x)/2) + C   ← Revenir en x
  aides : Teste x → π − x : f(x) dx ne change pas. Pose t = sin x. | ∫ 1/(4 + t²) dt | (1/2)arctan(t/2) + C
  pièges : g6_cos_sign, a1_subst_dx_kept, a1_int_no_constant

Calcule ∫ sin(x)³/(3 + cos(x)) dx.
  [guided]  (cos(x))′
    ? Quelle transformation laisse f(x) dx invariant ? · x → π + x : t = tan x / ✔ x → −x : t = cos x / · x → π − x : t = sin x
    (t = cos x : calcule dt/dx.)
    = −sin(x)   ← t = cos x : dt = −sin x dx
  — L’intégrale  [juge antideriv]  départ : ∫ sin(x)³/(3 + cos(x)) dx
    = ∫ −(1 − t²)/(3 + t) dt   ← Exprimer en t
    = ∫ (t − 3 + 8/(3 + t)) dt   ← Diviser
    = t²/2 − 3t + 8ln(3 + t) + C   ← Intégrer en t
    = cos(x)²/2 − 3cos(x) + 8ln(3 + cos(x)) + C   ← Revenir en x
  aides : Teste x → −x : f(x) dx ne change pas. Pose t = cos x. | ∫ −(1 − t²)/(3 + t) dt | t²/2 − 3t + 8ln(3 + t) + C
  pièges : g6_cos_sign, a1_subst_dx_kept, a1_int_no_constant

Calcule ∫ sin(x)/(1 + cos(x)²) dx.
  [guided]  (cos(x))′
    ? Quelle transformation laisse f(x) dx invariant ? · x → π − x : t = sin x / · x → π + x : t = tan x / ✔ x → −x : t = cos x
    (t = cos x : calcule dt/dx.)
    = −sin(x)   ← t = cos x : dt = −sin x dx
  — L’intégrale  [juge antideriv]  départ : ∫ sin(x)/(1 + cos(x)²) dx
    = ∫ −1/(1 + t²) dt   ← Exprimer en t
    = −arctan(t) + C   ← Intégrer en t
    = −arctan(cos(x)) + C   ← Revenir en x
  aides : Teste x → −x : f(x) dx ne change pas. Pose t = cos x. | ∫ −1/(1 + t²) dt | −arctan(t) + C
  pièges : g6_cos_sign, a1_subst_dx_kept, a1_int_no_constant

```

### Niveau 3

```
Calcule ∫ sin(x)³/(3 + cos(x)) dx.
  [tap, suivre l'erreur, menu steps]  (cos(x))′
    ? Quelle méthode ? · Intégration par parties / ✔ Règles de Bioche / ✔ Linéariser sin³x / ✔ t = tan(x/2)
    (t = cos x : calcule dt/dx.)
    = −sin(x)   ← t = cos x : dt = −sin x dx
  — L’intégrale  [juge antideriv]  départ : ∫ sin(x)³/(3 + cos(x)) dx
    = ∫ −(1 − t²)/(3 + t) dt   ← Exprimer en t
    = ∫ (t − 3 + 8/(3 + t)) dt   ← Diviser
    = t²/2 − 3t + 8ln(3 + t) + C   ← Intégrer en t
    = cos(x)²/2 − 3cos(x) + 8ln(3 + cos(x)) + C   ← Revenir en x
  aides : Teste x → −x : f(x) dx ne change pas. Pose t = cos x. | ∫ −(1 − t²)/(3 + t) dt | t²/2 − 3t + 8ln(3 + t) + C
  pièges : g6_cos_sign, a1_subst_dx_kept, a1_int_no_constant

Calcule ∫ cos(x)³/(3 + sin(x)) dx.
  [tap, suivre l'erreur, menu steps]  (sin(x))′
    ? Quelle méthode ? ✔ Règles de Bioche / ✔ t = tan(x/2) / · Intégration par parties / ✔ Linéariser cos³x
    (t = sin x : calcule dt/dx.)
    = cos(x)   ← t = sin x : dt = cos x dx
  — L’intégrale  [juge antideriv]  départ : ∫ cos(x)³/(3 + sin(x)) dx
    = ∫ (1 − t²)/(3 + t) dt   ← Exprimer en t
    = ∫ (−t + 3 − 8/(3 + t)) dt   ← Diviser
    = −t²/2 + 3t − 8ln(3 + t) + C   ← Intégrer en t
    = −sin(x)²/2 + 3sin(x) − 8ln(3 + sin(x)) + C   ← Revenir en x
  aides : Teste x → π − x : f(x) dx ne change pas. Pose t = sin x. | ∫ (1 − t²)/(3 + t) dt | −t²/2 + 3t − 8ln(3 + t) + C
  pièges : g6_cos_sign, a1_subst_dx_kept, a1_int_no_constant

Calcule ∫ 1/sin(x) dx.
  [tap, suivre l'erreur, menu steps]  (2arctan(t))′
    ? Quelle méthode ? ✔ t = tan(x/2) / · t = tan(x/2) et dx = dt / · Intégration par parties / · t = cos x
    (t = tan(x/2), donc x = 2 Arctg t : calcule dx/dt.)
    = 2/(1 + t²)   ← x = 2 Arctg t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/sin(x) dx
    = ∫ 1/((2t)/(1 + t²))·2/(1 + t²) dt   ← Exprimer en t
    = ∫ 1/t dt   ← Simplifier
    = ln(|t|) + C   ← Intégrer en t
    = ln(|tan(x/2)|) + C   ← Revenir en x
  aides : Pose t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²). | ∫ 1/((2t)/(1 + t²))·2/(1 + t²) dt | ln(|t|) + C
  pièges : a1_arc_deriv_table, a1_trig_subst_dx, a1_int_no_constant

```

### Niveau 4

```
Calcule ∫_{π/3}^{π/2} 1/sin(x) dx.
  [free, suivre l'erreur]  ∫_{π/3}^{π/2} 1/sin(x) dx
    = ∫_{√3/3}^{1} 1/((2t)/(1 + t²))·2/(1 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{√3/3}^{1} 1/t dt   ← Simplifier
    = [ln(|t|)]_{√3/3}^{1}   ← Intégrer en t
    = ln(3)/2   ← Évaluer
  aides : Pose t = tan(x/2) : dx = 2 dt/(1 + t²). | ∫_{√3/3}^{1} 1/((2t)/(1 + t²))·2/(1 + t²) dt | ∫_{√3/3}^{1} 1/t dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{π/2} cos(x)³/(2 + sin(x)) dx.
  [free, suivre l'erreur]  ∫_{0}^{π/2} cos(x)³/(2 + sin(x)) dx
    = ∫_{0}^{1} (1 − t²)/(2 + t) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{0}^{1} (−t + 2 − 3/(2 + t)) dt   ← Simplifier
    = [−t²/2 + 2t − 3ln(2 + t)]_{0}^{1}   ← Intégrer en t
    = 3ln(2/3) + 3/2   ← Évaluer
  aides : Teste x → π − x : pose t = sin x. | ∫_{0}^{1} (1 − t²)/(2 + t) dt | ∫_{0}^{1} (−t + 2 − 3/(2 + t)) dt
  pièges : a1_subst_dx_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{π/2} 1/(5 + 3cos(x)) dx.
  [free, suivre l'erreur]  ∫_{0}^{π/2} 1/(5 + 3cos(x)) dx
    = ∫_{0}^{1} 1/(5 + 3·(1 − t²)/(1 + t²))·2/(1 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{0}^{1} 2/(8 + 2t²) dt   ← Simplifier
    = [(1/2)arctan(t/2)]_{0}^{1}   ← Intégrer en t
    = arctan(1/2)/2   ← Évaluer
  aides : Pose t = tan(x/2) : dx = 2 dt/(1 + t²). | ∫_{0}^{1} 1/(5 + 3·(1 − t²)/(1 + t²))·2/(1 + t²) dt | ∫_{0}^{1} 2/(8 + 2t²) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

```

### Niveau 5

```
Calcule ∫_{0}^{π/2} cos(x)³/(4 + sin(x)²) dx.
  [free, sans aide]  ∫_{0}^{π/2} cos(x)³/(4 + sin(x)²) dx
    = ∫_{0}^{1} (1 − t²)/(4 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{0}^{1} (−1 + 5/(4 + t²)) dt   ← Simplifier
    = [−t + (5/2)arctan(t/2)]_{0}^{1}   ← Intégrer en t
    = 5arctan(1/2)/2 − 1   ← Évaluer
  pièges : a1_int_arctg_as_log, a1_subst_dx_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{π/2} sin(x)/(1 + cos(x)²) dx.
  [free, sans aide]  ∫_{0}^{π/2} sin(x)/(1 + cos(x)²) dx
    = ∫_{1}^{0} −1/(1 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = [−arctan(t)]_{1}^{0}   ← Intégrer en t
    = π/4   ← Évaluer
  pièges : a1_int_arctg_as_log, a1_subst_dx_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{π/2} sin(x)³/(4 + cos(x)²) dx.
  [free, sans aide]  ∫_{0}^{π/2} sin(x)³/(4 + cos(x)²) dx
    = ∫_{1}^{0} −(1 − t²)/(4 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{1}^{0} (1 − 5/(4 + t²)) dt   ← Simplifier
    = [t − (5/2)arctan(t/2)]_{1}^{0}   ← Intégrer en t
    = 5arctan(1/2)/2 − 1   ← Évaluer
  pièges : a1_int_arctg_as_log, a1_subst_dx_kept, a1_int_log_of_denominator

```

### Variantes d'examen

```
Sur ]0 ; π[, ∫ 1/sin(x) dx =
  · (1/2)ln(|tan(x/2)|) + (1/4)tan(x/2)² + C [a1_trig_subst_dx]   · ln(|tan(x/2)|) + (1/2)tan(x/2)² + C [a1_trig_subst_dx]   ✔ ln(|tan(x/2)|) + C   · ln(|sin(x)|) + C [a1_int_log_of_denominator]
  [examen mcq]
  pièges : a1_trig_subst_dx, a1_int_log_of_denominator

Calcule ∫_{π/3}^{π/2} 2/sin(x) dx.
  [free, sans aide, examen open]  ∫_{π/3}^{π/2} 2/sin(x) dx
    = ∫_{√3/3}^{1} 2/((2t)/(1 + t²))·2/(1 + t²) dt   ← Exprimer en t, avec dt et les bornes
    = ∫_{√3/3}^{1} 2/t dt   ← Simplifier
    = [2ln(|t|)]_{√3/3}^{1}   ← Intégrer en t
    = ln(3)   ← Évaluer
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

```

## sinh et cosh dans les intégrales (`a1-int-hyper`, BA1)

_√(x² + a²) → x = a·sinh t ; cosh² − sinh² = 1._

### Niveau 1

```
Calcule ∫ 1/√(x² + 1) dx.
  [guided]  (sinh(t))′
    (Méthode : x =  sinh t, dx =  cosh t dt)
    (x =  sinh t : calcule dx/dt.)
    = cosh(t)   ← x =  sinh t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/√(x² + 1) dx
    = ∫ □/√(sinh(t)² + 1) dt   (trous : ∫ cosh(t)/√(sinh(t)² + 1) dt)   ← Remplacer x et dx
    = ∫ cosh(t)/cosh(t) dt   ← 1 + sinh²t = cosh²t
    = t + C   ← Intégrer
    = argsh(x) + C   ← Revenir en x
  aides : √(x² + 1) : pense à 1 + sinh²t = cosh²t. Pose x =  sinh t. | ∫ cosh(t)/√(sinh(t)² + 1) dt | ∫ cosh(t)/cosh(t) dt
  pièges : a1_int_no_constant

Calcule ∫_{15/4}^{5} 1/√(x² − 9) dx.
  [guided]  ∫_{15/4}^{5} 1/√(x² − 9) dx
    (Méthode : x = 3 cosh t, dx = 3 sinh t dt)
    = ∫_{ln(2)}^{ln(3)} 3·sinh(t)/√(9·cosh(t)² − 9) dt   ← Remplacer x, dx et les bornes
    = ∫_{ln(2)}^{ln(3)} 3·sinh(t)/(3·sinh(t)) dt   ← cosh²t − 1 = sinh²t
    = [t]_{ln(2)}^{ln(3)}   ← Intégrer
    = ln(3/2)   ← Évaluer
  aides : √(x² − 9) : pense à cosh²t − 1 = sinh²t. Pose x = 3 cosh t. | ∫_{ln(2)}^{ln(3)} 3·sinh(t)/√(9·cosh(t)² − 9) dt | ∫_{ln(2)}^{ln(3)} 3·sinh(t)/(3·sinh(t)) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫ 1/√(x² + 4) dx.
  [guided]  (2·sinh(t))′
    (Méthode : x = 2 sinh t, dx = 2 cosh t dt)
    (x = 2 sinh t : calcule dx/dt.)
    = 2·cosh(t)   ← x = 2 sinh t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/√(x² + 4) dx
    = ∫ 2·cosh(t)/√(4·sinh(t)² + 4) dt   ← Remplacer x et dx
    = ∫ 2·cosh(t)/(2·cosh(t)) dt   ← 1 + sinh²t = cosh²t
    = t + C   ← Intégrer
    = argsh(x/2) + C   ← Revenir en x
  aides : √(x² + 4) : pense à 1 + sinh²t = cosh²t. Pose x = 2 sinh t. | ∫ 2·cosh(t)/√(4·sinh(t)² + 4) dt | ∫ 2·cosh(t)/(2·cosh(t)) dt
  pièges : a1_int_no_constant

```

### Niveau 2

```
Calcule ∫ 1/√(x² − 4) dx sur ]2 ; +∞[.
  [guided]  (2·cosh(t))′
    ? Quelle méthode ? ✔ x = 2 cosh t / · x = 2 sinh t
    (x = 2 cosh t : calcule dx/dt.)
    = 2·sinh(t)   ← x = 2 cosh t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/√(x² − 4) dx
    = ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt   ← Remplacer x et dx
    = ∫ 2·sinh(t)/(2·sinh(t)) dt   ← cosh²t − 1 = sinh²t
    = t + C   ← Intégrer
    = argch(x/2) + C   ← Revenir en x
  aides : √(x² − 4) : pense à cosh²t − 1 = sinh²t. Pose x = 2 cosh t. | ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt | ∫ 2·sinh(t)/(2·sinh(t)) dt
  pièges : a1_int_no_constant

Calcule ∫ 1/√(x² − 4) dx sur ]2 ; +∞[.
  [guided]  (2·cosh(t))′
    ? Quelle méthode ? ✔ x = 2 cosh t / · x = 2 sinh t
    (x = 2 cosh t : calcule dx/dt.)
    = 2·sinh(t)   ← x = 2 cosh t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/√(x² − 4) dx
    = ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt   ← Remplacer x et dx
    = ∫ 2·sinh(t)/(2·sinh(t)) dt   ← cosh²t − 1 = sinh²t
    = t + C   ← Intégrer
    = argch(x/2) + C   ← Revenir en x
  aides : √(x² − 4) : pense à cosh²t − 1 = sinh²t. Pose x = 2 cosh t. | ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt | ∫ 2·sinh(t)/(2·sinh(t)) dt
  pièges : a1_int_no_constant

Calcule ∫_{0}^{4} 1/√(x² + 9) dx.
  [guided]  ∫_{0}^{4} 1/√(x² + 9) dx
    ? Quelle méthode ? ✔ x = 3 sinh t / · x = 3 cosh t
    = ∫_{0}^{ln(3)} 3·cosh(t)/√(9·sinh(t)² + 9) dt   ← Remplacer x, dx et les bornes
    = ∫_{0}^{ln(3)} 3·cosh(t)/(3·cosh(t)) dt   ← 1 + sinh²t = cosh²t
    = [t]_{0}^{ln(3)}   ← Intégrer
    = ln(3)   ← Évaluer
  aides : √(x² + 9) : pense à 1 + sinh²t = cosh²t. Pose x = 3 sinh t. | ∫_{0}^{ln(3)} 3·cosh(t)/√(9·sinh(t)² + 9) dt | ∫_{0}^{ln(3)} 3·cosh(t)/(3·cosh(t)) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

```

### Niveau 3

```
Calcule ∫ 2cosh(x)² dx.
  [tap, suivre l'erreur, menu steps]  2cosh(x)²
    ? Quelle méthode ? · cosh²x = (1 − cosh 2x)/2 / ✔ Écrire avec eˣ et e⁻ˣ / ✔ Linéariser : cosh²x = (cosh 2x + 1)/2 / ✔ Parties avec u = cosh x
    (Linéarise cosh²x.)
    = 2(cosh(2x) + 1)/2   ← cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x
  — L’intégrale  [juge antideriv]  départ : ∫ 2cosh(x)² dx
    = ∫ 2(cosh(2x) + 1)/2 dx   ← Linéariser
    = (1/2)sinh(2x) + x + C   ← Intégrer
  aides : cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x : linéarise. | 2(cosh(2x) + 1)/2 | (1/2)sinh(2x) + x + C
  pièges : a1_hyper_identity_sign, a1_int_no_constant

Calcule ∫ 4sinh(x)² dx.
  [tap, suivre l'erreur, menu steps]  4sinh(x)²
    ? Quelle méthode ? · sinh²x = (1 − cosh 2x)/2 / ✔ Parties avec u = sinh x / ✔ Écrire avec eˣ et e⁻ˣ / ✔ Linéariser : sinh²x = (cosh 2x − 1)/2
    (Linéarise sinh²x.)
    = 4(cosh(2x) − 1)/2   ← cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x
  — L’intégrale  [juge antideriv]  départ : ∫ 4sinh(x)² dx
    = ∫ 4(cosh(2x) − 1)/2 dx   ← Linéariser
    = sinh(2x) − 2x + C   ← Intégrer
  aides : cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x : linéarise. | 4(cosh(2x) − 1)/2 | sinh(2x) − 2x + C
  pièges : a1_hyper_identity_sign, a1_int_no_constant

Calcule ∫ 1/√(x² − 4) dx sur ]2 ; +∞[.
  [tap, suivre l'erreur, menu steps]  (2·cosh(t))′
    ? Quelle méthode ? · x = 2 sinh t / ✔ x = 2 cosh t / · Log(x² − 4) / ✔ x = 2/cos t
    (x = 2 cosh t : calcule dx/dt.)
    = 2·sinh(t)   ← x = 2 cosh t
  — L’intégrale  [juge antideriv]  départ : ∫ 1/√(x² − 4) dx
    = ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt   ← Remplacer x et dx
    = ∫ 2·sinh(t)/(2·sinh(t)) dt   ← cosh²t − 1 = sinh²t
    = t + C   ← Intégrer
    = argch(x/2) + C   ← Revenir en x
  aides : √(x² − 4) : pense à cosh²t − 1 = sinh²t. Pose x = 2 cosh t. | ∫ 2·sinh(t)/√(4·cosh(t)² − 4) dt | ∫ 2·sinh(t)/(2·sinh(t)) dt
  pièges : a1_int_log_of_denominator, a1_int_no_constant

```

### Niveau 4

```
Calcule ∫_{0}^{8/3} 1/√(x² + 4) dx.
  [free, suivre l'erreur]  ∫_{0}^{8/3} 1/√(x² + 4) dx
    = ∫_{0}^{ln(3)} 2·cosh(t)/√(4·sinh(t)² + 4) dt   ← Remplacer x, dx et les bornes
    = ∫_{0}^{ln(3)} 2·cosh(t)/(2·cosh(t)) dt   ← 1 + sinh²t = cosh²t
    = [t]_{0}^{ln(3)}   ← Intégrer
    = ln(3)   ← Évaluer
  aides : √(x² + 4) : pense à 1 + sinh²t = cosh²t. Pose x = 2 sinh t. | ∫_{0}^{ln(3)} 2·cosh(t)/√(4·sinh(t)² + 4) dt | ∫_{0}^{ln(3)} 2·cosh(t)/(2·cosh(t)) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

Calcule ∫_{0}^{ln(3)} 2cosh(x)² dx.
  [free, suivre l'erreur]  ∫_{0}^{ln(3)} 2cosh(x)² dx
    = ∫_{0}^{ln(3)} 2(cosh(2x) + 1)/2 dx   ← Linéariser
    = [(1/2)sinh(2x) + x]_{0}^{ln(3)}   ← Intégrer
    = ln(3) + 20/9   ← sinh(2 Log 3) = (3² − 1/3²)/2
  aides : cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x : linéarise. | ∫_{0}^{ln(3)} 2(cosh(2x) + 1)/2 dx | [(1/2)sinh(2x) + x]_{0}^{ln(3)}
  pièges : a1_hyper_identity_sign

Calcule ∫_{0}^{12/5} 1/√(x² + 1) dx.
  [free, suivre l'erreur]  ∫_{0}^{12/5} 1/√(x² + 1) dx
    = ∫_{0}^{ln(5)} cosh(t)/√(sinh(t)² + 1) dt   ← Remplacer x, dx et les bornes
    = ∫_{0}^{ln(5)} cosh(t)/cosh(t) dt   ← 1 + sinh²t = cosh²t
    = [t]_{0}^{ln(5)}   ← Intégrer
    = ln(5)   ← Évaluer
  aides : √(x² + 1) : pense à 1 + sinh²t = cosh²t. Pose x =  sinh t. | ∫_{0}^{ln(5)} cosh(t)/√(sinh(t)² + 1) dt | ∫_{0}^{ln(5)} cosh(t)/cosh(t) dt
  pièges : a1_subst_dx_kept, a1_subst_bounds_kept, a1_int_log_of_denominator

```

### Niveau 5

```
Calcule ∫_{0}^{ln(3)} cosh(x)² dx.
  [free, sans aide]  ∫_{0}^{ln(3)} cosh(x)² dx
    = ∫_{0}^{ln(3)} (cosh(2x) + 1)/2 dx   ← Linéariser
    = [(1/4)sinh(2x) + (1/2)x]_{0}^{ln(3)}   ← Intégrer
    = ln(3)/2 + 10/9   ← sinh(2 Log 3) = (3² − 1/3²)/2
  pièges : a1_hyper_identity_sign

Calcule l'intégrale généralisée ∫_{ln(3)}^{∞} e^x/(e^(2x) − 1) dx (elle converge : l'intégrande se comporte comme e⁻ˣ en +∞).
  [free, sans aide]  ∫_{ln(3)}^{∞} e^x/(e^(2x) − 1) dx
    = ∫_{3}^{∞} 1/(t² − 1) dt   ← t = eˣ, dt = eˣ dx, e²ˣ = t²
    = ∫_{3}^{∞} (1/2)(1/(t − 1) − 1/(t + 1)) dt   ← Éléments simples
    = ln(2)/2   ← [½·Log((t − 1)/(t + 1))] : la limite en +∞ vaut 0
  pièges : a1_subst_bounds_kept

Calcule l'intégrale généralisée ∫_{ln(3)}^{∞} e^x/(e^(2x) − 1) dx (elle converge : l'intégrande se comporte comme e⁻ˣ en +∞).
  [free, sans aide]  ∫_{ln(3)}^{∞} e^x/(e^(2x) − 1) dx
    = ∫_{3}^{∞} 1/(t² − 1) dt   ← t = eˣ, dt = eˣ dx, e²ˣ = t²
    = ∫_{3}^{∞} (1/2)(1/(t − 1) − 1/(t + 1)) dt   ← Éléments simples
    = ln(2)/2   ← [½·Log((t − 1)/(t + 1))] : la limite en +∞ vaut 0
  pièges : a1_subst_bounds_kept

```

### Variantes d'examen

```
∫_{0}^{12/5} 1/√(x² + 1) dx =
  · 2ln(13/5) [a1_int_log_of_denominator]   · 12/5 [a1_subst_bounds_kept]   ✔ ln(5)   · 2arctan(5) − π/2 [a1_subst_dx_kept]
  [examen mcq]
  pièges : a1_subst_bounds_kept, a1_int_log_of_denominator, a1_subst_dx_kept

Vrai ou faux ?
  « Pour tout x réel : Argsh x = Log(x + √(x² + 1)). » → VRAI
  [examen tf]

```

## Encadrer une intégrale ; parité et moyenne (`a1-int-estimate`, BA1)

_m(b − a) ≤ ∫ f ≤ M(b − a) ; une fonction impaire donne 0._

### Niveau 1

```
Encadre ∫_{0}^{2} e^(−x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre. Sur [0 ; 2], f est décroissante : m = e^−4, M = 1.
  [guided]  ∫_{0}^{2} e^(−4) dx
    = □·(2 − 0)   (trous : e^(−4)·(2 − 0))   ← m·(b − a)
    = 2e^(−4)   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = □·(2 − 0)   (trous : 1·(2 − 0))   ← M·(b − a)
    = 2   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2e^−4 ≤ I ≤ 2

Encadre ∫_{0}^{2} 1/(1 + 2x³) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre. Sur [0 ; 2], f est décroissante : m = 1/17, M = 1.
  [guided]  ∫_{0}^{2} 1/17 dx
    = (□)·(2 − 0)   (trous : (1/17)·(2 − 0))   ← m·(b − a)
    = 2/17   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = □·(2 − 0)   (trous : 1·(2 − 0))   ← M·(b − a)
    = 2   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2/17 ≤ I ≤ 2

Encadre ∫_{0}^{2} √(1 + x³) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre. Sur [0 ; 2], f est croissante : m = 1, M = 3.
  [guided]  ∫_{0}^{2} 1 dx
    = □·(2 − 0)   (trous : 1·(2 − 0))   ← m·(b − a)
    = 2   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 3 dx
    = □·(2 − 0)   (trous : 3·(2 − 0))   ← M·(b − a)
    = 6   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est croissante. | m = f(0) = ▢ et M = f(2) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2 ≤ I ≤ 6

```

### Niveau 2

```
Encadre ∫_{0}^{2} 1/(1 + 4x³) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre.
  [guided]  (1/(1 + 4x³))′
    = −12x²/(1 + 4x³)²   ← Dériver
  — Minimum m de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 4·2³)
    ? Sur [0 ; 2], f′ est négative. Où f atteint-elle son minimum ? ✔ En x = 2 : f est décroissante / · En x = 0
    = 1/33   ← f est décroissante : m = f(2)
  — Maximum M de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 4·0³)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{2} 1/33 dx
    = (1/33)·(2 − 0)   ← m·(b − a)
    = 2/33   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = 1·(2 − 0)   ← M·(b − a)
    = 2   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2/33 ≤ I ≤ 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Encadre ∫_{0}^{2} 1/(1 + 3x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre.
  [guided]  (1/(1 + 3x²))′
    = −6x/(1 + 3x²)²   ← Dériver
  — Minimum m de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 3·2²)
    ? Sur [0 ; 2], f′ est négative. Où f atteint-elle son minimum ? ✔ En x = 2 : f est décroissante / · En x = 0
    = 1/13   ← f est décroissante : m = f(2)
  — Maximum M de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 3·0²)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{2} 1/13 dx
    = (1/13)·(2 − 0)   ← m·(b − a)
    = 2/13   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = 1·(2 − 0)   ← M·(b − a)
    = 2   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2/13 ≤ I ≤ 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Encadre ∫_{1}^{2} 1/(1 + 3x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [1 ; 2], puis intègre.
  [guided]  (1/(1 + 3x²))′
    = −6x/(1 + 3x²)²   ← Dériver
  — Minimum m de f sur [1 ; 2] :  [juge definite]  départ : 1/(1 + 3·2²)
    ? Sur [1 ; 2], f′ est négative. Où f atteint-elle son minimum ? ✔ En x = 2 : f est décroissante / · En x = 1
    = 1/13   ← f est décroissante : m = f(2)
  — Maximum M de f sur [1 ; 2] :  [juge definite]  départ : 1/(1 + 3·1²)
    = 1/4   ← M = f(1)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{1}^{2} 1/13 dx
    = (1/13)·(2 − 1)   ← m·(b − a)
    = 1/13   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{1}^{2} 1/4 dx
    = (1/4)·(2 − 1)   ← M·(b − a)
    = 1/4   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [1 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(1) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 1/13 ≤ I ≤ 1/4
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 3

```
Calcule ∫_{−1}^{1} (sin(x³) + 1) dx en utilisant la parité.
  [tap, suivre l'erreur, menu steps]  ∫_{−1}^{1} (sin(x³) + 1) dx
    ? La fonction x ↦ sin(x³) est : ✔ impaire : g(−x) = −g(x) / · paire / · ni paire ni impaire
    = ∫_{−1}^{1} sin(x³) dx + ∫_{−1}^{1} 1 dx   ← Linéarité
    = 0 + 2(∫_{0}^{1} 1 dx)   ← Partie impaire : 0 ; partie paire : le double
    = 2([x]_{0}^{1})   ← Primitive
    = 2   ← Calculer
  aides : sin(x³) est impaire : son intégrale sur [−1 ; 1] est nulle. 1 est paire. | ∫_{−1}^{1} (sin(x³) + 1) dx = 0 + 2·∫₀^1 ▢ dx | 0 + 2(∫_{0}^{1} 1 dx)

Encadre ∫_{0}^{2} 1/(1 + 5x³) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre.
  [tap, suivre l'erreur, menu steps]  (1/(1 + 5x³))′
    = −15x²/(1 + 5x³)²   ← Dériver
  — Minimum m de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 5·2³)
    ? Sur [0 ; 2], f′ est négative. Où f atteint-elle son minimum ? ✔ En x = 2 : f est décroissante / · En x = 0
    = 1/41   ← f est décroissante : m = f(2)
  — Maximum M de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 5·0³)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{2} 1/41 dx
    = (1/41)·(2 − 0)   ← m·(b − a)
    = 2/41   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = 1·(2 − 0)   ← M·(b − a)
    = 2   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2/41 ≤ I ≤ 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Encadre ∫_{0}^{1} 1/(1 + 2x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 1], puis intègre.
  [tap, suivre l'erreur, menu steps]  (1/(1 + 2x²))′
    = −4x/(1 + 2x²)²   ← Dériver
  — Minimum m de f sur [0 ; 1] :  [juge definite]  départ : 1/(1 + 2·1²)
    ? Sur [0 ; 1], f′ est négative. Où f atteint-elle son minimum ? ✔ En x = 1 : f est décroissante / · En x = 0
    = 1/3   ← f est décroissante : m = f(1)
  — Maximum M de f sur [0 ; 1] :  [juge definite]  départ : 1/(1 + 2·0²)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{1} 1/3 dx
    = (1/3)·(1 − 0)   ← m·(b − a)
    = 1/3   ← Calculer
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{1} 1 dx
    = 1·(1 − 0)   ← M·(b − a)
    = 1   ← Calculer
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 1]. f est décroissante. | m = f(1) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 1/3 ≤ I ≤ 1
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 4

```
Encadre ∫_{0}^{1} 1/(1 + 5x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 1], puis intègre.
  [free, suivre l'erreur]  (1/(1 + 5x²))′
    = −10x/(1 + 5x²)²   ← Dériver
  — Minimum m de f sur [0 ; 1] :  [juge definite]  départ : 1/(1 + 5·1²)
    = 1/6   ← f est décroissante : m = f(1)
  — Maximum M de f sur [0 ; 1] :  [juge definite]  départ : 1/(1 + 5·0²)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{1} 1/6 dx
    = 1/6   ← m·(b − a)
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{1} 1 dx
    = 1   ← M·(b − a)
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 1]. f est décroissante. | m = f(1) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 1/6 ≤ I ≤ 1
  pièges : g6_quotient_sign, g6_quotient_no_square

Encadre ∫_{0}^{2} 1/(1 + 4x³) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre.
  [free, suivre l'erreur]  (1/(1 + 4x³))′
    = −12x²/(1 + 4x³)²   ← Dériver
  — Minimum m de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 4·2³)
    = 1/33   ← f est décroissante : m = f(2)
  — Maximum M de f sur [0 ; 2] :  [juge definite]  départ : 1/(1 + 4·0³)
    = 1   ← M = f(0)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{2} 1/33 dx
    = 2/33   ← m·(b − a)
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = 2   ← M·(b − a)
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est décroissante. | m = f(2) = ▢ et M = f(0) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2/33 ≤ I ≤ 2
  pièges : g6_quotient_sign, g6_quotient_no_square

Encadre ∫_{0}^{2} e^(x²) dx sans chercher de primitive : trouve m ≤ f(x) ≤ M sur [0 ; 2], puis intègre.
  [free, suivre l'erreur]  (e^(x²))′
    = 2x·e^(x²)   ← Dériver
  — Minimum m de f sur [0 ; 2] :  [juge definite]  départ : e^(0²)
    = 1   ← f est croissante : m = f(0)
  — Maximum M de f sur [0 ; 2] :  [juge definite]  départ : e^(2²)
    = e⁴   ← M = f(2)
  — Intègre l'encadrement : m(b − a) ≤ I ≤ M(b − a). Minorant de I :  [juge definite]  départ : ∫_{0}^{2} 1 dx
    = 2   ← m·(b − a)
  — Majorant de I :  [juge definite]  départ : ∫_{0}^{2} e⁴ dx
    = 2e⁴   ← M·(b − a)
  aides : Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 2]. f est croissante. | m = f(0) = ▢ et M = f(2) = ▢, puis m(b − a) ≤ I ≤ M(b − a). | 2 ≤ I ≤ 2e⁴
  pièges : g6_chain_forgot, g6_power_rule_exp

```

### Niveau 5

```
∫_{−1}^{1} (x·e^(x²) + 5) dx =
  ✔ 10   · 5   · 0 [a1_parity_misused]   · 20
  pièges : a1_parity_misused

∫_{−3}^{3} (sin(x)·cos(x)² + 4) dx =
  · 12   · 0 [a1_parity_misused]   ✔ 24   · 48
  pièges : a1_parity_misused

Soit I = ∫_{0}^{2} e^(−x²) dx. Quelle affirmation est vraie ?
  · I ≤ 2e^−4   ✔ 2e^−4 ≤ I ≤ 2   · I ≥ 2   · I = 1 − e^(−8/3) [a1_int_exp_square_primitive]
  pièges : a1_int_exp_square_primitive

```

### Variantes d'examen

```
Soit I = ∫_{0}^{1} e^(−x²) dx. Quelle affirmation est vraie ?
  · I ≥ 1   · I ≤ e^−1   · I = 1 − e^(−1/3) [a1_int_exp_square_primitive]   ✔ e^−1 ≤ I ≤ 1
  [examen mcq]
  pièges : a1_int_exp_square_primitive

Vrai ou faux ?
  « Pour tout a > 0, ∫_{−a}^{a} (x⁵ + 2) dx = 0, car l'intervalle est symétrique. » → FAUX
    contre-exemple (refute) : a = 1
  [examen tf]
  pièges : a1_parity_misused

```

## Théorème fondamental ; dériver ∫ₐ^(g(x)) f(t) dt (`a1-ftc`, BA1)

_F′ = f, puis la règle de chaîne sur la borne._

### Niveau 1

```
G(x) = ∫_{0}^{e^x} ln(1 + t²) dt. Calcule G′(x).
  [guided]  (∫_{0}^{e^x} ln(1 + t²) dt)′
    = ln(1 + (□)²)·(e^x)′   (trous : ln(1 + (e^x)²)·(e^x)′)   ← Théorème fondamental : F′(g(x))·g′(x)
    = □·ln(1 + e^(2x))   (trous : e^x·ln(1 + e^(2x)))   ← Règle de chaîne : (e^x)′ = e^x
  aides : Appelle F une primitive de ln(1 + t²) (sans la calculer) : G(x) = F(e^x) − F(0), et F′ = f. | G′(x) = ln(1 + (e^x)²)·▢ | e^x·ln(1 + e^(2x))
  pièges : g2_log_sum, a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{1}^{x³} ln(1 + t²) dt. Calcule G′(x).
  [guided]  (∫_{1}^{x³} ln(1 + t²) dt)′
    = ln(1 + (□)²)·(x³)′   (trous : ln(1 + (x³)²)·(x³)′)   ← Théorème fondamental : F′(g(x))·g′(x)
    = □·ln(1 + x⁶)   (trous : 3x²·ln(1 + x⁶))   ← Règle de chaîne : (x³)′ = 3x²
  aides : Appelle F une primitive de ln(1 + t²) (sans la calculer) : G(x) = F(x³) − F(1), et F′ = f. | G′(x) = ln(1 + (x³)²)·▢ | 3x²·ln(1 + x⁶)
  pièges : g2_log_sum, a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{0}^{x³} e^(−t²) dt. Calcule G′(x).
  [guided]  (∫_{0}^{x³} e^(−t²) dt)′
    = e^(−(□)²)·(x³)′   (trous : e^(−(x³)²)·(x³)′)   ← Théorème fondamental : F′(g(x))·g′(x)
    = □·e^(−x⁶)   (trous : 3x²·e^(−x⁶))   ← Règle de chaîne : (x³)′ = 3x²
  aides : Appelle F une primitive de e^(−t²) (sans la calculer) : G(x) = F(x³) − F(0), et F′ = f. | G′(x) = e^(−(x³)²)·▢ | 3x²·e^(−x⁶)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

```

### Niveau 2

```
G(x) = ∫_{0}^{x²} e^(−t²) dt. Calcule G′(x).
  [guided]  (∫_{0}^{x²} e^(−t²) dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(x²) − F(0), puis dériver / · Chercher d'abord une primitive de e^(−t²)
    = e^(−(x²)²)·(x²)′   ← Théorème fondamental : F′(g(x))·g′(x)
    = □·e^(−x⁴)   (trous : 2x·e^(−x⁴))   ← Règle de chaîne : (x²)′ = 2x
  aides : Appelle F une primitive de e^(−t²) (sans la calculer) : G(x) = F(x²) − F(0), et F′ = f. | G′(x) = e^(−(x²)²)·▢ | 2x·e^(−x⁴)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{1}^{sin(x)} e^(−t²) dt. Calcule G′(x).
  [guided]  (∫_{1}^{sin(x)} e^(−t²) dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(sin(x)) − F(1), puis dériver / · Chercher d'abord une primitive de e^(−t²)
    = e^(−(sin(x))²)·(sin(x))′   ← Théorème fondamental : F′(g(x))·g′(x)
    = □·e^(−sin(x)²)   (trous : cos(x)·e^(−sin(x)²))   ← Règle de chaîne : (sin(x))′ = cos(x)
  aides : Appelle F une primitive de e^(−t²) (sans la calculer) : G(x) = F(sin(x)) − F(1), et F′ = f. | G′(x) = e^(−(sin(x))²)·▢ | cos(x)·e^(−sin(x)²)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{1}^{x³} √(1 + t⁴) dt. Calcule G′(x).
  [guided]  (∫_{1}^{x³} √(1 + t⁴) dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(x³) − F(1), puis dériver / · Chercher d'abord une primitive de √(1 + t⁴)
    = √(1 + (x³)⁴)·(x³)′   ← Théorème fondamental : F′(g(x))·g′(x)
    = □√(1 + x¹²)   (trous : 3x²√(1 + x¹²))   ← Règle de chaîne : (x³)′ = 3x²
  aides : Appelle F une primitive de √(1 + t⁴) (sans la calculer) : G(x) = F(x³) − F(1), et F′ = f. | G′(x) = √(1 + (x³)⁴)·▢ | 3x²√(1 + x¹²)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

```

### Niveau 3

```
G(x) = ∫_{1}^{x²} sin(t)/t dt. Calcule G′(x).
  [tap, suivre l'erreur, menu steps]  (∫_{1}^{x²} sin(t)/t dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(x²) − F(1), puis dériver / · Chercher d'abord une primitive de sin(t)/t / · G′(x) = f(x²), sans autre facteur
    = sin(x²)/x²·(x²)′   ← Théorème fondamental : F′(g(x))·g′(x)
    = 2sin(x²)/x   ← Règle de chaîne : (x²)′ = 2x
  aides : Appelle F une primitive de sin(t)/t (sans la calculer) : G(x) = F(x²) − F(1), et F′ = f. | G′(x) = sin(x²)/x²·▢ | 2sin(x²)/x
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{0}^{x³} √(1 + t⁴) dt. Calcule G′(x).
  [tap, suivre l'erreur, menu steps]  (∫_{0}^{x³} √(1 + t⁴) dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(x³) − F(0), puis dériver / · Chercher d'abord une primitive de √(1 + t⁴) / · G′(x) = f(x³), sans autre facteur
    = √(1 + (x³)⁴)·(x³)′   ← Théorème fondamental : F′(g(x))·g′(x)
    = 3x²√(1 + x¹²)   ← Règle de chaîne : (x³)′ = 3x²
  aides : Appelle F une primitive de √(1 + t⁴) (sans la calculer) : G(x) = F(x³) − F(0), et F′ = f. | G′(x) = √(1 + (x³)⁴)·▢ | 3x²√(1 + x¹²)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{0}^{sin(x)} ln(1 + t²) dt. Calcule G′(x).
  [tap, suivre l'erreur, menu steps]  (∫_{0}^{sin(x)} ln(1 + t²) dt)′
    ? Comment dérives-tu G ? ✔ Appeler F une primitive : G(x) = F(sin(x)) − F(0), puis dériver / ✔ Chercher d'abord une primitive de ln(1 + t²) / · G′(x) = f(sin(x)), sans autre facteur
    = ln(1 + (sin(x))²)·(sin(x))′   ← Théorème fondamental : F′(g(x))·g′(x)
    = cos(x)·ln(1 + sin(x)²)   ← Règle de chaîne : (sin(x))′ = cos(x)
  aides : Appelle F une primitive de ln(1 + t²) (sans la calculer) : G(x) = F(sin(x)) − F(0), et F′ = f. | G′(x) = ln(1 + (sin(x))²)·▢ | cos(x)·ln(1 + sin(x)²)
  pièges : g2_log_sum, a1_ftc_no_chain, a1_ftc_integrate_first

```

### Niveau 4

```
G(x) = ∫_{0}^{sin(x)} e^(−t²) dt. Calcule G′(x).
  [free, suivre l'erreur]  (∫_{0}^{sin(x)} e^(−t²) dt)′
    = e^(−(sin(x))²)·(sin(x))′   ← Théorème fondamental : F′(g(x))·g′(x)
    = cos(x)·e^(−sin(x)²)   ← Règle de chaîne : (sin(x))′ = cos(x)
  aides : Appelle F une primitive de e^(−t²) (sans la calculer) : G(x) = F(sin(x)) − F(0), et F′ = f. | G′(x) = e^(−(sin(x))²)·▢ | cos(x)·e^(−sin(x)²)
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{x}^{e^x} sin(t)/t dt. Calcule G′(x).
  [free, suivre l'erreur]  (∫_{x}^{e^x} sin(t)/t dt)′
    = sin(e^x)/e^x·(e^x)′ − sin(x)/x·x′   ← Théorème fondamental aux deux bornes
    = sin(e^x) − sin(x)/x   ← Règle de chaîne : dériver les bornes
  aides : Appelle F une primitive de sin(t)/t (sans la calculer) : G(x) = F(e^x) − F(x), et F′ = f. | G′(x) = sin(e^x)/e^x·▢ | sin(e^x) − sin(x)/x
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{x}^{x³} sin(t)/t dt. Calcule G′(x).
  [free, suivre l'erreur]  (∫_{x}^{x³} sin(t)/t dt)′
    = sin(x³)/x³·(x³)′ − sin(x)/x·x′   ← Théorème fondamental aux deux bornes
    = 3sin(x³)/x − sin(x)/x   ← Règle de chaîne : dériver les bornes
  aides : Appelle F une primitive de sin(t)/t (sans la calculer) : G(x) = F(x³) − F(x), et F′ = f. | G′(x) = sin(x³)/x³·▢ | 3sin(x³)/x − sin(x)/x
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

```

### Niveau 5

```
G(x) = ∫_{x}^{x³} e^(−t²) dt. Calcule G′(x), puis G′(1).
  [free, sans aide]  (∫_{x}^{x³} e^(−t²) dt)′
    = e^(−(x³)²)·(x³)′ − e^(−x²)·x′   ← Théorème fondamental aux deux bornes
    = 3x²·e^(−x⁶) − e^(−x²)   ← Règle de chaîne : dériver les bornes
  — Calcule G′(1) :  [juge definite]  départ : 3(1)²·e^(−(1)⁶) − e^(−(1)²)
    = 2e^(−1)   ← Remplacer x par 1
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{x}^{x³} ln(1 + t²) dt. Calcule G′(x), puis G′(1).
  [free, sans aide]  (∫_{x}^{x³} ln(1 + t²) dt)′
    = ln(1 + (x³)²)·(x³)′ − ln(1 + x²)·x′   ← Théorème fondamental aux deux bornes
    = 3x²·ln(1 + x⁶) − ln(1 + x²)   ← Règle de chaîne : dériver les bornes
  — Calcule G′(1) :  [juge definite]  départ : 3(1)²·ln(1 + (1)⁶) − ln(1 + (1)²)
    = 2ln(2)   ← Remplacer x par 1
  pièges : g2_log_sum, a1_ftc_no_chain, a1_ftc_integrate_first

G(x) = ∫_{x}^{x³} √(1 + t⁴) dt. Calcule G′(x), puis G′(1).
  [free, sans aide]  (∫_{x}^{x³} √(1 + t⁴) dt)′
    = √(1 + (x³)⁴)·(x³)′ − √(1 + x⁴)·x′   ← Théorème fondamental aux deux bornes
    = 3x²√(1 + x¹²) − √(1 + x⁴)   ← Règle de chaîne : dériver les bornes
  — Calcule G′(1) :  [juge definite]  départ : 3(1)²√(1 + (1)¹²) − √(1 + (1)⁴)
    = 2√2   ← Remplacer x par 1
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

```

### Variantes d'examen

```
G(x) = ∫_{1}^{sin(x)} sin(t)/t dt. G′(x) =
  · −(−sin(sin(x))·cos(x)·sin(x) − cos(sin(x))·cos(x))/sin(x)² [a1_ftc_integrate_first]   · cos(x)·sin(x)/x   ✔ cos(x)·sin(sin(x))/sin(x)   · sin(sin(x))/(sin(x)) [a1_ftc_no_chain]
  [examen mcq]
  pièges : a1_ftc_no_chain, a1_ftc_integrate_first

Vrai ou faux ?
  « Pour tout x > 0, (∫_{0}^{x³} ln(1 + t²) dt)′ = ln(1 + x⁶). » → FAUX
    contre-exemple (refute) : x = 1
  [examen tf]
  pièges : a1_ftc_no_chain

```

## Intégrale généralisée : calculer par une limite (bornes 0⁺, 1⁻, +∞) (`a1-improper-calc`, BA1)

_Repérer chaque point problème, intégrale propre, puis limite._

### Niveau 1

```
Calcule ∫_{1}^{2⁻} (3x + 3)/√(2 − x) dx, ou montre qu'elle diverge. Le seul point problème est 2⁻ : f n'est pas bornée quand x → 2⁻.
  [guided]  ∫_{1}^{2⁻} (3x + 3)/√(2 − x) dx
    = ∫_{0⁺}^{□} (9 − 3t)/√t dt   (trous : ∫_{0⁺}^{1} (9 − 3t)/√t dt)   ← t = 2 − x, dx = −dt ; x = 1 → t = 1, x → 2⁻ → t → 0⁺
    = lim_{ε→0⁺} [18√t − 2t^(3/2)]_{ε}^{1}   ← Primitive, puis limite en 0⁺
    = □ − 2   (trous : 18 − 2)   ← Évaluer
    = 16   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{1}^{2⁻} (3x + 3)/√(2 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 16   ← L'intégrale converge
  aides : Le problème est en 2 : pose t = 2 − x, la borne devient 0⁺. | lim_{ε→0⁺} [18√t − 2t^(3/2)]_{ε}^{1} | ∫_{1}^{2⁻} (3x + 3)/√(2 − x) dx = 16
  pièges : a1_improper_undefined_means_diverge

Calcule ∫_{2}^{3⁻} (x + 5)/√(3 − x) dx, ou montre qu'elle diverge. Le seul point problème est 3⁻ : f n'est pas bornée quand x → 3⁻.
  [guided]  ∫_{2}^{3⁻} (x + 5)/√(3 − x) dx
    = ∫_{0⁺}^{□} (8 − t)/√t dt   (trous : ∫_{0⁺}^{1} (8 − t)/√t dt)   ← t = 3 − x, dx = −dt ; x = 2 → t = 1, x → 3⁻ → t → 0⁺
    = lim_{ε→0⁺} [16√t − (2/3)t^(3/2)]_{ε}^{1}   ← Primitive, puis limite en 0⁺
    = □ − 2/3   (trous : 16 − 2/3)   ← Évaluer
    = 46/3   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{2}^{3⁻} (x + 5)/√(3 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 46/3   ← L'intégrale converge
  aides : Le problème est en 3 : pose t = 3 − x, la borne devient 0⁺. | lim_{ε→0⁺} [16√t − (2/3)t^(3/2)]_{ε}^{1} | ∫_{2}^{3⁻} (x + 5)/√(3 − x) dx = 46/3
  pièges : a1_improper_undefined_means_diverge

Calcule ∫_{2}^{3⁻} 2x/√(3 − x) dx, ou montre qu'elle diverge. Le seul point problème est 3⁻ : f n'est pas bornée quand x → 3⁻.
  [guided]  ∫_{2}^{3⁻} 2x/√(3 − x) dx
    = ∫_{0⁺}^{□} (6 − 2t)/√t dt   (trous : ∫_{0⁺}^{1} (6 − 2t)/√t dt)   ← t = 3 − x, dx = −dt ; x = 2 → t = 1, x → 3⁻ → t → 0⁺
    = lim_{ε→0⁺} [12√t − (4/3)t^(3/2)]_{ε}^{1}   ← Primitive, puis limite en 0⁺
    = □ − 4/3   (trous : 12 − 4/3)   ← Évaluer
    = 32/3   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{2}^{3⁻} 2x/√(3 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 32/3   ← L'intégrale converge
  aides : Le problème est en 3 : pose t = 3 − x, la borne devient 0⁺. | lim_{ε→0⁺} [12√t − (4/3)t^(3/2)]_{ε}^{1} | ∫_{2}^{3⁻} 2x/√(3 − x) dx = 32/3
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 2

```
Calcule ∫_{−1}^{1} 2/x² dx, ou montre qu'elle diverge. Commence par le morceau ∫_{0⁺}^{1} 2/x² dx : intègre de ε à 1.
  [guided]  ∫_{ε}^{1} 2/x² dx
    ? ∫_{−1}^{1} 2/x² dx : que fais-tu ? ✔ f n'est pas bornée en 0 : couper en 0, et calculer chaque morceau par une limite / · Primitive −2/x, puis évaluer entre −1 et 1
    = [−2/x]_{ε}^{1}   ← Primitive sur [ε ; 1]
    = 2/ε − 2   ← Évaluer
  — Conclusion : la limite quand ε → 0⁺.  [juge limit]  départ : 2/ε − 2
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = ∞   ← La limite est infinie : l'intégrale diverge
  aides : f n'est pas bornée en 0 : coupe en 0 et regarde ∫ de 0⁺ à 1, de ε à 1 puis ε → 0⁺. | [−2/x]_{ε}^{1} | 2/ε − 2 → +∞
  pièges : a1_improper_singularity_ignored

Calcule ∫_{1}^{2⁻} (x + 2)/√(2 − x) dx, ou montre qu'elle diverge.
  [guided]  ∫_{1}^{2⁻} (x + 2)/√(2 − x) dx
    ? Quelle méthode ? ✔ t = 2 − x / · Primitive puis évaluer en 2 directement
    = ∫_{0⁺}^{1} (4 − t)/√t dt   ← t = 2 − x, dx = −dt ; x = 1 → t = 1, x → 2⁻ → t → 0⁺
    = lim_{ε→0⁺} [□]_{ε}^{1}   (trous : lim_{ε→0⁺} [8√t − (2/3)t^(3/2)]_{ε}^{1})   ← Primitive, puis limite en 0⁺
    = 8 − 2/3   ← Évaluer
    = 22/3   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{1}^{2⁻} (x + 2)/√(2 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 22/3   ← L'intégrale converge
  aides : Le problème est en 2 : pose t = 2 − x, la borne devient 0⁺. | lim_{ε→0⁺} [8√t − (2/3)t^(3/2)]_{ε}^{1} | ∫_{1}^{2⁻} (x + 2)/√(2 − x) dx = 22/3
  pièges : a1_improper_singularity_ignored, a1_improper_undefined_means_diverge

Calcule ∫_{e}^{∞} 1/(x·ln(x)) dx, ou montre qu'elle diverge. Intègre d'abord jusqu'à b.
  [guided]  ∫_{e}^{b} 1/(x·ln(x)) dx
    = [ln(ln(x))]_{e}^{b}   ← Forme u′/u avec u = ln x
    = ln(ln(b))   ← ln(ln e) = ln 1 = 0
  — Conclusion : la limite quand b → +∞.  [juge limit]  départ : ln(ln(b))
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = ∞   ← La limite est infinie : l'intégrale diverge
  aides : u = ln x : 1/(x ln x) = u′/u. Intègre de e à b, puis b → +∞. | [ln(ln(x))]_{e}^{b} | ln(ln(b)) → +∞

```

### Niveau 3

```
Calcule ∫_{1}^{2⁻} (x + 1)/√(2 − x) dx, ou montre qu'elle diverge.
  [tap, suivre l'erreur, menu steps]  ∫_{1}^{2⁻} (x + 1)/√(2 − x) dx
    ? Quelle méthode ? ✔ t = 2 − x / ✔ t = √(2 − x) / ✔ Parties avec u = x + 1 / · Primitive puis évaluer en 2 directement
    = ∫_{0⁺}^{1} (3 − t)/√t dt   ← t = 2 − x, dx = −dt ; x = 1 → t = 1, x → 2⁻ → t → 0⁺
    = lim_{ε→0⁺} [6√t − (2/3)t^(3/2)]_{ε}^{1}   ← Primitive, puis limite en 0⁺
    = 6 − 2/3   ← Évaluer
    = 16/3   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{1}^{2⁻} (x + 1)/√(2 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 16/3   ← L'intégrale converge
  aides : Le problème est en 2 : pose t = 2 − x, la borne devient 0⁺. | lim_{ε→0⁺} [6√t − (2/3)t^(3/2)]_{ε}^{1} | ∫_{1}^{2⁻} (x + 1)/√(2 − x) dx = 16/3
  pièges : a1_improper_singularity_ignored, a1_improper_undefined_means_diverge

Calcule ∫_{0⁺}^{π/6} cos(x)/√(sin(x)) dx, ou montre qu'elle diverge.
  [tap, suivre l'erreur, menu steps]  ∫_{0⁺}^{π/6} cos(x)/√(sin(x)) dx
    ? Quelle méthode ? ✔ u = sin x, du = cos x dx / · Parties avec u = cos x / ✔ Primitive puis évaluer en 0 directement / · Diverge : f n'est pas définie en 0
    = lim_{ε→0⁺} [2√(sin(x))]_{ε}^{π/6}   ← u = sin x : primitive 2√(sin x)
    = 2√(sin(π/6))   ← √(sin ε) → 0
    = √2   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{0⁺}^{π/6} cos(x)/√(sin(x)) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = √2   ← L'intégrale converge
  aides : Forme u′/√u avec u = sin x : une primitive est 2√u. | 2√(sin(π/6)) | ∫_{0⁺}^{π/6} cos(x)/√(sin(x)) dx = √2
  pièges : a1_improper_undefined_means_diverge

Calcule ∫_{1}^{∞} (x^(1/2) + 5)/x² dx, ou montre qu'elle diverge.
  [tap, suivre l'erreur, menu steps]  ∫_{1}^{∞} (x^(1/2) + 5)/x² dx
    ? Quelle méthode ? ✔ Séparer : x^(−3/2) + 5x^(−2) / · Intégration par parties / · L'intégrale diverge : la borne est infinie / · Remplacer ∞ par un grand nombre
    = ∫_{1}^{∞} (x^(−3/2) + 5x^(−2)) dx   ← Séparer
    = lim_{b→∞} [−2x^(−1/2) − 5x^(−1)]_{1}^{b}   ← Primitive, puis limite en +∞
    = 2 + 5   ← Les puissances négatives de b tendent vers 0
    = 7   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{1}^{∞} (x^(1/2) + 5)/x² dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 7   ← L'intégrale converge
  aides : Sépare en deux puissances de x, puis intègre de 1 à b et fais b → +∞. | lim_{b→∞} [−2x^(−1/2) − 5x^−1]_{1}^{b} | ∫_{1}^{∞} (x^(1/2) + 5)/x² dx = 7
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 4

```
Calcule ∫_{1}^{∞} (x^(3/2) + 3)/x³ dx, ou montre qu'elle diverge.
  [free, suivre l'erreur]  ∫_{1}^{∞} (x^(3/2) + 3)/x³ dx
    = ∫_{1}^{∞} (x^(−3/2) + 3x^(−3)) dx   ← Séparer
    = lim_{b→∞} [−2x^(−1/2) − (3/2)x^(−2)]_{1}^{b}   ← Primitive, puis limite en +∞
    = 2 + 3/2   ← Les puissances négatives de b tendent vers 0
    = 7/2   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{1}^{∞} (x^(3/2) + 3)/x³ dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 7/2   ← L'intégrale converge
  aides : Sépare en deux puissances de x, puis intègre de 1 à b et fais b → +∞. | lim_{b→∞} [−2x^(−1/2) − (3/2)x^−2]_{1}^{b} | ∫_{1}^{∞} (x^(3/2) + 3)/x³ dx = 7/2
  pièges : a1_improper_undefined_means_diverge

Calcule ∫_{0}^{1⁻} (2x + 3)/√(1 − x) dx, ou montre qu'elle diverge.
  [free, suivre l'erreur]  ∫_{0}^{1⁻} (2x + 3)/√(1 − x) dx
    = ∫_{0⁺}^{1} (5 − 2t)/√t dt   ← t = 1 − x, dx = −dt ; x = 0 → t = 1, x → 1⁻ → t → 0⁺
    = lim_{ε→0⁺} [10√t − (4/3)t^(3/2)]_{ε}^{1}   ← Primitive, puis limite en 0⁺
    = 10 − 4/3   ← Évaluer
    = 26/3   ← Calculer
  — Conclusion.  [juge definite]  départ : ∫_{0}^{1⁻} (2x + 3)/√(1 − x) dx
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = 26/3   ← L'intégrale converge
  aides : Le problème est en 1 : pose t = 1 − x, la borne devient 0⁺. | lim_{ε→0⁺} [10√t − (4/3)t^(3/2)]_{ε}^{1} | ∫_{0}^{1⁻} (2x + 3)/√(1 − x) dx = 26/3
  pièges : a1_improper_undefined_means_diverge

Calcule ∫_{1}^{2⁻} 3/(2 − x) dx, ou montre qu'elle diverge. Intègre d'abord jusqu'à b.
  [free, suivre l'erreur]  ∫_{1}^{b} 3/(2 − x) dx
    = [−3ln(2 − x)]_{1}^{b}   ← Primitive
    = −3ln(2 − b)   ← Évaluer : ln 1 = 0
  — Conclusion : la limite quand b → 2⁻.  [juge limit]  départ : −3ln(2 − b)
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → La limite de l'intégrale propre, quand la borne tend vers le point problème
    = ∞   ← La limite est infinie : l'intégrale diverge
  aides : Intègre de 1 à b < 2, puis fais b → 2⁻. | [−3ln(2 − x)]_{1}^{b} | −3ln(2 − b) → +∞

```

### Niveau 5

```
∫_{1}^{2⁻} (x + 4)/√(2 − x) dx :
  ✔ Elle converge et vaut 34/3.   · Elle converge et vaut 68/3.   · Elle diverge : f n'est pas définie en 2. [a1_improper_undefined_means_diverge]   · Elle converge et vaut −34/3.
  pièges : a1_improper_undefined_means_diverge

∫_{1}^{∞} (x + 6)/x³ dx :
  · Elle converge et vaut 8.   · Elle converge et vaut −4.   · Elle diverge : f n'est pas définie en +∞. [a1_improper_undefined_means_diverge]   ✔ Elle converge et vaut 4.
  pièges : a1_improper_undefined_means_diverge

∫_{0⁺}^{1} x·ln(x) dx :
  · Elle converge et vaut 1/4.   · Elle converge et vaut −1/2.   ✔ Elle converge et vaut −1/4.   · Elle diverge : f n'est pas définie en 0. [a1_improper_undefined_means_diverge]
  pièges : a1_improper_undefined_means_diverge

```

### Variantes d'examen

```
∫_{0⁺}^{1} x·ln(x) dx :
  · Elle converge et vaut −1/2.   ✔ Elle converge et vaut −1/4.   · Elle diverge : f n'est pas définie en 0. [a1_improper_undefined_means_diverge]   · Elle converge et vaut 1/4.
  [examen mcq]
  pièges : a1_improper_undefined_means_diverge

Vrai ou faux ? « ∫₋₁¹ dx/x² = [−1/x]₋₁¹ = −2. »
  · Vrai [a1_improper_singularity_ignored]   ✔ Faux
  [examen tf]
  pièges : a1_improper_singularity_ignored

```

## Convergence d'une intégrale généralisée par comparaison, sans la calculer (`a1-improper-compare`, BA1)

_Comparer à 1/xᵅ en 0⁺ (α < 1) et en +∞ (α > 1)._

### Niveau 1

```
∫_{1⁺}^{∞} 1/(√(x − 1)(x + 2)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale. Points problèmes : 1⁺ (compare à 1/(x − 1)^(1/2)) ; +∞ (compare à 1/x^(3/2)).
  [guided]  √(x − 1)·1/(√(x − 1)(x + 2))
    ? En 1⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 1)^(1/2) / · g(x) = 1/x^(1/2)
    = 1/(x + 2)   ← Simplifier
    = □   (trous : 1/3)   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x^(3/2)·1/(√(x − 1)(x + 2))
    ? En 1⁺, α = 1/2 < 1. Près de 1⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x^(3/2) / · g(x) = 1/x
    ? En +∞, α = 3/2 > 1. Près de +∞, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(√(1 − 1/x)(1 + 2/x))   ← Diviser par x^(3/2)
    = □   (trous : 1)   ← Limite
  aides : Deux problèmes : en 1⁺ et en +∞. Compare à 1/(x − 1)^(1/2) puis à 1/x^(3/2). | en 1⁺, α = ▢ ; en +∞, α = ▢ | en 1⁺, α = 1/2 ; en +∞, α = 3/2 : converge.
  pièges : a1_alpha_criteria_swapped

∫_{3⁺}^{6⁻} 1/√((x − 3)(6 − x)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale. Points problèmes : 3⁺ (compare à 1/(x − 3)^(1/2)) ; 6⁻ (compare à 1/(6 − x)^(1/2)).
  [guided]  √(x − 3)·1/√((x − 3)(6 − x))
    ? En 3⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 3)^(1/2) / · g(x) = 1/(x − 3)
    = 1/√(6 − x)   ← Simplifier
    = □   (trous : √3/3)   ← Limite
  — En 6⁻ : compare f à 1/(6 − x)ᵅ, et calcule la limite de f(x)·(6 − x)ᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : √(6 − x)·1/√((x − 3)(6 − x))
    ? En 3⁺, α = 1/2 < 1. Près de 3⁺, ∫ f : ✔ converge / · diverge
    ? En 6⁻, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(6 − x)^(1/2) / · g(x) = 1/(6 − x)
    ? En 6⁻, α = 1/2 < 1. Près de 6⁻, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√(x − 3)   ← Simplifier
    = □   (trous : √3/3)   ← Limite
  aides : Deux problèmes : en 3⁺ et en 6⁻. Compare à 1/(x − 3)^(1/2) puis à 1/(6 − x)^(1/2). | en 3⁺, α = ▢ ; en 6⁻, α = ▢ | en 3⁺, α = 1/2 ; en 6⁻, α = 1/2 : converge.
  pièges : a1_alpha_criteria_swapped

∫_{0⁺}^{1} 1/(x^(1/3)(3 + x)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale. Points problèmes : 0⁺ (compare à 1/x^(1/3)).
  [guided]  x^(1/3)·1/(x^(1/3)(3 + x))
    ? En 0⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x^(1/3) / · g(x) = 1/x
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(3 + x)   ← Simplifier
    = □   (trous : 1/3)   ← Limite
  aides : Un seul problème : en 0⁺. Compare à 1/x^(1/3). | en 0⁺, α = ▢ | en 0⁺, α = 1/3 : converge.
  pièges : a1_alpha_criteria_swapped

```

### Niveau 2

```
∫_{2⁺}^{∞} 1/√((x − 2)(x + 4)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [guided]  √(x − 2)·1/√((x − 2)(x + 4))
    ? Où sont les points problèmes ? ✔ 2⁺ et +∞ / · seulement +∞
    ? En 2⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 2)^(1/2) / · g(x) = 1/x^(1/2) / · g(x) = 1/(x − 2)
    = 1/√(x + 4)   ← Simplifier
    = √6/6   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x·1/√((x − 2)(x + 4))
    ? En 2⁺, α = 1/2 < 1. Près de 2⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x / · g(x) = 1/x^(1/2) / · g(x) = 1/x²
    ? En +∞, α = 1. Près de +∞, ∫ f : · converge / ✔ diverge
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√((1 − 2/x)(1 + 4/x))   ← Diviser par x
    = 1   ← Limite
  aides : Deux problèmes : en 2⁺ et en +∞. Compare à 1/(x − 2)^(1/2) puis à 1/x. | en 2⁺, α = ▢ ; en +∞, α = ▢ | en 2⁺, α = 1/2 ; en +∞, α = 1 : diverge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{1⁺}^{∞} 1/√((x − 1)(x + 1)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [guided]  √(x − 1)·1/√((x − 1)(x + 1))
    ? Où sont les points problèmes ? ✔ 1⁺ et +∞ / · seulement +∞
    ? En 1⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 1)^(1/2) / · g(x) = 1/x^(1/2) / · g(x) = 1/(x − 1)
    = 1/√(x + 1)   ← Simplifier
    = √2/2   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x·1/√((x − 1)(x + 1))
    ? En 1⁺, α = 1/2 < 1. Près de 1⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x / · g(x) = 1/x^(1/2) / · g(x) = 1/x²
    ? En +∞, α = 1. Près de +∞, ∫ f : · converge / ✔ diverge
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√((1 − 1/x)(1 + 1/x))   ← Diviser par x
    = 1   ← Limite
  aides : Deux problèmes : en 1⁺ et en +∞. Compare à 1/(x − 1)^(1/2) puis à 1/x. | en 1⁺, α = ▢ ; en +∞, α = ▢ | en 1⁺, α = 1/2 ; en +∞, α = 1 : diverge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{1}^{∞} (2x + 4)/(x³ + 3) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [guided]  x²·(2x + 4)/(x³ + 3)
    ? Où sont les points problèmes ? ✔ +∞ / · 1 et +∞
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x² / · g(x) = 1/x / · g(x) = 1/x³
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (2 + 4/x)/(1 + 3/x³)   ← Diviser par x³
    = 2   ← Limite
  aides : Un seul problème : en +∞. Compare à 1/x². | en +∞, α = ▢ | en +∞, α = 2 : converge.
  pièges : a1_alpha_criteria_swapped

```

### Niveau 3

```
∫_{3⁺}^{∞} 1/(√(x − 3)(x + 3)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [tap, suivre l'erreur, menu steps]  √(x − 3)·1/(√(x − 3)(x + 3))
    ? Où sont les points problèmes ? ✔ 3⁺ et +∞ / · seulement +∞
    ? En 3⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 3)^(1/2) / · g(x) = 1/x^(1/2) / · g(x) = 1/(x − 3)
    = 1/(x + 3)   ← Simplifier
    = 1/6   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x^(3/2)·1/(√(x − 3)(x + 3))
    ? En 3⁺, α = 1/2 < 1. Près de 3⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x^(3/2) / · g(x) = 1/x / · g(x) = 1/x²
    ? En +∞, α = 3/2 > 1. Près de +∞, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(√(1 − 3/x)(1 + 3/x))   ← Diviser par x^(3/2)
    = 1   ← Limite
  aides : Deux problèmes : en 3⁺ et en +∞. Compare à 1/(x − 3)^(1/2) puis à 1/x^(3/2). | en 3⁺, α = ▢ ; en +∞, α = ▢ | en 3⁺, α = 1/2 ; en +∞, α = 3/2 : converge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{2⁺}^{∞} 1/(√(x − 2)(x + 2)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [tap, suivre l'erreur, menu steps]  √(x − 2)·1/(√(x − 2)(x + 2))
    ? Où sont les points problèmes ? ✔ 2⁺ et +∞ / · seulement +∞
    ? En 2⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 2)^(1/2) / · g(x) = 1/x^(1/2) / · g(x) = 1/(x − 2)
    = 1/(x + 2)   ← Simplifier
    = 1/4   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x^(3/2)·1/(√(x − 2)(x + 2))
    ? En 2⁺, α = 1/2 < 1. Près de 2⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, à quelle fonction g compares-tu f ? ✔ g(x) = 1/x^(3/2) / · g(x) = 1/x / · g(x) = 1/x²
    ? En +∞, α = 3/2 > 1. Près de +∞, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(√(1 − 2/x)(1 + 2/x))   ← Diviser par x^(3/2)
    = 1   ← Limite
  aides : Deux problèmes : en 2⁺ et en +∞. Compare à 1/(x − 2)^(1/2) puis à 1/x^(3/2). | en 2⁺, α = ▢ ; en +∞, α = ▢ | en 2⁺, α = 1/2 ; en +∞, α = 3/2 : converge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{1⁺}^{3⁻} 1/√((x − 1)(3 − x)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [tap, suivre l'erreur, menu steps]  √(x − 1)·1/√((x − 1)(3 − x))
    ? Où sont les points problèmes ? ✔ 1⁺ et 3⁻ / · seulement 3⁻
    ? En 1⁺, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(x − 1)^(1/2) / · g(x) = 1/(x − 1) / · g(x) = 1/x^(1/2)
    = 1/√(3 − x)   ← Simplifier
    = √2/2   ← Limite
  — En 3⁻ : compare f à 1/(3 − x)ᵅ, et calcule la limite de f(x)·(3 − x)ᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : √(3 − x)·1/√((x − 1)(3 − x))
    ? En 1⁺, α = 1/2 < 1. Près de 1⁺, ∫ f : ✔ converge / · diverge
    ? En 3⁻, à quelle fonction g compares-tu f ? ✔ g(x) = 1/(3 − x)^(1/2) / · g(x) = 1/(3 − x) / · g(x) = 1/x²
    ? En 3⁻, α = 1/2 < 1. Près de 3⁻, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√(x − 1)   ← Simplifier
    = √2/2   ← Limite
  aides : Deux problèmes : en 1⁺ et en 3⁻. Compare à 1/(x − 1)^(1/2) puis à 1/(3 − x)^(1/2). | en 1⁺, α = ▢ ; en 3⁻, α = ▢ | en 1⁺, α = 1/2 ; en 3⁻, α = 1/2 : converge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

```

### Niveau 4

```
∫_{0⁺}^{1} 1/(x(3 + x)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, suivre l'erreur]  x·1/(x(3 + x))
    ? Où sont les points problèmes ? ✔ 0⁺ / · 0⁺ et 1
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(3 + x)   ← Simplifier
    = 1/3   ← Limite
  aides : Un seul problème : en 0⁺. Compare à 1/x^1. | en 0⁺, α = ▢ | en 0⁺, α = 1 : diverge.

∫_{2⁺}^{∞} 1/(√(x − 2)(x + 1)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, suivre l'erreur]  √(x − 2)·1/(√(x − 2)(x + 1))
    ? Où sont les points problèmes ? ✔ 2⁺ et +∞ / · seulement +∞
    = 1/(x + 1)   ← Simplifier
    = 1/3   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x^(3/2)·1/(√(x − 2)(x + 1))
    ? En 2⁺, α = 1/2 < 1. Près de 2⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, α = 3/2 > 1. Près de +∞, ∫ f : ✔ converge / · diverge
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/(√(1 − 2/x)(1 + 1/x))   ← Diviser par x^(3/2)
    = 1   ← Limite
  aides : Deux problèmes : en 2⁺ et en +∞. Compare à 1/(x − 2)^(1/2) puis à 1/x^(3/2). | en 2⁺, α = ▢ ; en +∞, α = ▢ | en 2⁺, α = 1/2 ; en +∞, α = 3/2 : converge.
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{1}^{∞} (4x + 6)/(x³ + 3) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, suivre l'erreur]  x²·(4x + 6)/(x³ + 3)
    ? Où sont les points problèmes ? ✔ +∞ / · 1 et +∞
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (4 + 6/x)/(1 + 3/x³)   ← Diviser par x³
    = 4   ← Limite
  aides : Un seul problème : en +∞. Compare à 1/x². | en +∞, α = ▢ | en +∞, α = 2 : converge.
  pièges : a1_alpha_criteria_swapped

```

### Niveau 5

```
∫_{3⁺}^{∞} 1/√((x − 3)(x + 1)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, sans aide]  √(x − 3)·1/√((x − 3)(x + 1))
    ? Où sont les points problèmes ? ✔ 3⁺ et +∞ / · seulement +∞
    = 1/√(x + 1)   ← Simplifier
    = 1/2   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x·1/√((x − 3)(x + 1))
    ? En 3⁺, α = 1/2 < 1. Près de 3⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, α = 1. Près de +∞, ∫ f : · converge / ✔ diverge
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√((1 − 3/x)(1 + 1/x))   ← Diviser par x
    = 1   ← Limite
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{3⁺}^{∞} 1/√((x − 3)(x + 1)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, sans aide]  √(x − 3)·1/√((x − 3)(x + 1))
    ? Où sont les points problèmes ? ✔ 3⁺ et +∞ / · seulement +∞
    = 1/√(x + 1)   ← Simplifier
    = 1/2   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x·1/√((x − 3)(x + 1))
    ? En 3⁺, α = 1/2 < 1. Près de 3⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, α = 1. Près de +∞, ∫ f : · converge / ✔ diverge
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√((1 − 3/x)(1 + 1/x))   ← Diviser par x
    = 1   ← Limite
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

∫_{2⁺}^{∞} 1/√((x − 2)(x + 3)) dx converge-t-elle ? Étudie chaque point problème sans calculer l'intégrale.
  [free, sans aide]  √(x − 2)·1/√((x − 2)(x + 3))
    ? Où sont les points problèmes ? ✔ 2⁺ et +∞ / · seulement +∞
    = 1/√(x + 3)   ← Simplifier
    = √5/5   ← Limite
  — En +∞ : compare f à 1/xᵅ, et calcule la limite de f(x)·xᵅ. Conclus, puis justifie par la limite.  [juge limit]  départ : x·1/√((x − 2)(x + 3))
    ? En 2⁺, α = 1/2 < 1. Près de 2⁺, ∫ f : ✔ converge / · diverge
    ? En +∞, α = 1. Près de +∞, ∫ f : · converge / ✔ diverge
    ? Nature de l'intégrale ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1/√((1 − 2/x)(1 + 3/x))   ← Diviser par x
    = 1   ← Limite
  pièges : a1_improper_one_end_only, a1_alpha_criteria_swapped

```

### Variantes d'examen

```
∫_{2⁺}^{∞} 1/(√(x − 2)(x + 3)) dx :
  · Converge : en +∞, α = 3/2, et c'est le seul point à étudier. [a1_improper_one_end_only]   · Diverge : f(x) ≥ 1/(x − a) près de 2⁺, et cette intégrale diverge. [a1_compare_wrong_direction]   · Diverge : en 2⁺, α = 1/2 < 1. [a1_alpha_criteria_swapped]   ✔ Converge : en 2⁺, α = 1/2 et en +∞, α = 3/2.
  [examen mcq]
  pièges : a1_alpha_criteria_swapped, a1_improper_one_end_only, a1_compare_wrong_direction

Vrai ou faux ?
  « ∫₁^∞ sin(x)/x² dx converge absolument. » → VRAI
  [examen tf]

I = ∫_{1}^{∞} (5x + 1)/(x³ + 3x² + 4x + 2) dx. Montre que I converge, sans la calculer.
  [free, sans aide, examen open]  x²·(5x + 1)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 5   ← f(x) ~ 5/x²
  pièges : a1_improper_undefined_means_diverge

```

## Intégrale généralisée d'une fraction rationnelle (problème long) (`a1-improper-rational`, BA1)

_Convergence, DES, primitives, regrouper les Log, limite en +∞._

### Niveau 1

```
I = ∫_{1}^{∞} (4x + 11)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I. On donne Q(x) = (x + 2)(x² + 4x + 5).
  [guided]  x²·(4x + 11)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (4 + 11/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = □   (trous : 4)   ← f(x) ~ 4/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (4x + 11)/(x³ + 6x² + 13x + 10)
    = □/(x + 2) + (−3x − 2)/(x² + 4x + 5)   (trous : 3/(x + 2) + (−3x − 2)/(x² + 4x + 5))   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (3/(x + 2) + (−3x − 2)/(x² + 4x + 5)) dx
    = ∫ 3/(x + 2) dx + ∫ −(3/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 4/((x + 2)² + 1) dx   ← −3x − 2 = −(3/2)(2x + 4) + 4, et x² + 4x + 5 = (x + 2)² + 1
    = 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4□ + C   (trous : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2)
    = (3/2)ln(□) + 4arctan(x + 2)   (trous : (3/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2))   ← Regrouper les Log
    = 2π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (4x + 11)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 2π + (3/2)ln(10/9) − 4arctan(3)   ← Retrancher F(1)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 3ln(x + 2) − (3/2)ln(x² + 4x + 5) en un seul Log. | (3/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{0}^{∞} (4x + 6)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I. On donne Q(x) = (x + 2)(x² + 4x + 5).
  [guided]  x²·(4x + 6)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (4 + 6/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = □   (trous : 4)   ← f(x) ~ 4/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (4x + 6)/(x³ + 6x² + 13x + 10)
    = −2/(x + 2) + (2x + □)/(x² + 4x + 5)   (trous : −2/(x + 2) + (2x + 8)/(x² + 4x + 5))   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (−2/(x + 2) + (2x + 8)/(x² + 4x + 5)) dx
    = ∫ −2/(x + 2) dx + ∫ (2x + 4)/(x² + 4x + 5) dx + ∫ 4/((x + 2)² + 1) dx   ← 2x + 8 = (2x + 4) + 4, et x² + 4x + 5 = (x + 2)² + 1
    = −2ln(x + 2) + ln(x² + 4x + 5) + 4□ + C   (trous : −2ln(x + 2) + ln(x² + 4x + 5) + 4arctan(x + 2) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : −2ln(x + 2) + ln(x² + 4x + 5) + 4arctan(x + 2)
    = −ln(□) + 4arctan(x + 2)   (trous : −ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2))   ← Regrouper les Log
    = 2π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (4x + 6)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [−2ln(x + 2) + ln(x² + 4x + 5) + 4arctan(x + 2)]_{0}^{b}   ← I = lim F(b) − F(a)
    = 2π − ln(5/4) − 4arctan(2)   ← Retrancher F(0)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe −2ln(x + 2) + ln(x² + 4x + 5) en un seul Log. | −ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{0}^{∞} (3x + 9)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I. On donne Q(x) = (x + 2)(x² + 4x + 5).
  [guided]  x²·(3x + 9)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (3 + 9/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = □   (trous : 3)   ← f(x) ~ 3/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (3x + 9)/(x³ + 6x² + 13x + 10)
    = □/(x + 2) + (□x − 3)/(x² + 4x + 5)   (trous : 3/(x + 2) + (−3x − 3)/(x² + 4x + 5))   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (3/(x + 2) + (−3x − 3)/(x² + 4x + 5)) dx
    = ∫ 3/(x + 2) dx + ∫ −(3/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 3/((x + 2)² + 1) dx   ← −3x − 3 = −(3/2)(2x + 4) + 3, et x² + 4x + 5 = (x + 2)² + 1
    = 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 3□ + C   (trous : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 3arctan(x + 2) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 3arctan(x + 2)
    = (3/2)ln(□) + 3arctan(x + 2)   (trous : (3/2)ln((x + 2)²/(x² + 4x + 5)) + 3arctan(x + 2))   ← Regrouper les Log
    = 3π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (3x + 9)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 3arctan(x + 2)]_{0}^{b}   ← I = lim F(b) − F(a)
    = 3π/2 + (3/2)ln(5/4) − 3arctan(2)   ← Retrancher F(0)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 3ln(x + 2) − (3/2)ln(x² + 4x + 5) en un seul Log. | (3/2)ln((x + 2)²/(x² + 4x + 5)) + 3arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 2

```
I = ∫_{1}^{∞} (2x + 1)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I.
  [guided]  x²·(2x + 1)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (2 + 1/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = 2   ← f(x) ~ 2/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (2x + 1)/(x³ + 6x² + 13x + 10)
    = (2x + 1)/((□)(x² + 4x + 5))   (trous : (2x + 1)/((x + 2)(x² + 4x + 5)))   ← Q(−2) = 0 : Q = (x + 2)(x² + 4x + 5)
    = −3/(x + 2) + (3x + 8)/(x² + 4x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (−3/(x + 2) + (3x + 8)/(x² + 4x + 5)) dx
    = ∫ −3/(x + 2) dx + ∫ (3/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 2/((x + 2)² + 1) dx   ← 3x + 8 = (3/2)(2x + 4) + 2, et x² + 4x + 5 = (x + 2)² + 1
    = −3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 2□ + C   (trous : −3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 2arctan(x + 2) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : −3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 2arctan(x + 2)
    = −(3/2)ln((x + 2)²/(x² + 4x + 5)) + 2arctan(x + 2)   ← Regrouper les Log
    = π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (2x + 1)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [−3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 2arctan(x + 2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = π − (3/2)ln(10/9) − 2arctan(3)   ← Retrancher F(1)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe −3ln(x + 2) + (3/2)ln(x² + 4x + 5) en un seul Log. | −(3/2)ln((x + 2)²/(x² + 4x + 5)) + 2arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{0}^{∞} (2x + 10)/(x³ + 3x² + 7x + 5) dx. (a) Montre que I converge. (b) Calcule I.
  [guided]  x²·(2x + 10)/(x³ + 3x² + 7x + 5)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (2 + 10/x)/(1 + 3/x + 7/x² + 5/x³)   ← Diviser par x³
    = 2   ← f(x) ~ 2/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (2x + 10)/(x³ + 3x² + 7x + 5)
    = (2x + 10)/((□)(x² + 2x + 5))   (trous : (2x + 10)/((x + 1)(x² + 2x + 5)))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 5)
    = 2/(x + 1) + (−2x)/(x² + 2x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (2/(x + 1) + (−2x)/(x² + 2x + 5)) dx
    = ∫ 2/(x + 1) dx + ∫ −(2x + 2)/(x² + 2x + 5) dx + ∫ 2/((x + 1)² + 4) dx   ← −2x = −(2x + 2) + 2, et x² + 2x + 5 = (x + 1)² + 4
    = 2ln(x + 1) − ln(x² + 2x + 5) + □ + C   (trous : 2ln(x + 1) − ln(x² + 2x + 5) + arctan((x + 1)/2) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 2ln(x + 1) − ln(x² + 2x + 5) + arctan((x + 1)/2)
    = ln((x + 1)²/(x² + 2x + 5)) + arctan((x + 1)/2)   ← Regrouper les Log
    = π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (2x + 10)/(x³ + 3x² + 7x + 5) dx
    = lim_{b→∞} [2ln(x + 1) − ln(x² + 2x + 5) + arctan((x + 1)/2)]_{0}^{b}   ← I = lim F(b) − F(a)
    = π/2 + ln(5) − arctan(1/2)   ← Retrancher F(0)
  aides : −1 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 2ln(x + 1) − ln(x² + 2x + 5) en un seul Log. | ln((x + 1)²/(x² + 2x + 5)) + arctan((x + 1)/2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{0}^{∞} (2x + 3)/(x³ + 3x² + 4x + 2) dx. (a) Montre que I converge. (b) Calcule I.
  [guided]  x²·(2x + 3)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (2 + 3/x)/(1 + 3/x + 4/x² + 2/x³)   ← Diviser par x³
    = 2   ← f(x) ~ 2/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (2x + 3)/(x³ + 3x² + 4x + 2)
    = (2x + 3)/((□)(x² + 2x + 2))   (trous : (2x + 3)/((x + 1)(x² + 2x + 2)))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 2)
    = 1/(x + 1) + (−x + 1)/(x² + 2x + 2)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (1/(x + 1) + (−x + 1)/(x² + 2x + 2)) dx
    = ∫ 1/(x + 1) dx + ∫ −(1/2)(2x + 2)/(x² + 2x + 2) dx + ∫ 2/((x + 1)² + 1) dx   ← −x + 1 = −(1/2)(2x + 2) + 2, et x² + 2x + 2 = (x + 1)² + 1
    = ln(x + 1) − (1/2)ln(x² + 2x + 2) + 2□ + C   (trous : ln(x + 1) − (1/2)ln(x² + 2x + 2) + 2arctan(x + 1) + C)   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : ln(x + 1) − (1/2)ln(x² + 2x + 2) + 2arctan(x + 1)
    = (1/2)ln((x + 1)²/(x² + 2x + 2)) + 2arctan(x + 1)   ← Regrouper les Log
    = π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (2x + 3)/(x³ + 3x² + 4x + 2) dx
    = lim_{b→∞} [ln(x + 1) − (1/2)ln(x² + 2x + 2) + 2arctan(x + 1)]_{0}^{b}   ← I = lim F(b) − F(a)
    = π/2 + (1/2)ln(2)   ← Retrancher F(0)
  aides : −1 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe ln(x + 1) − (1/2)ln(x² + 2x + 2) en un seul Log. | (1/2)ln((x + 1)²/(x² + 2x + 2)) + 2arctan(x + 1)
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 3

```
I = ∫_{1}^{∞} (4x + 9)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I.
  [tap, suivre l'erreur, menu steps]  x²·(4x + 9)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (4 + 9/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = 4   ← f(x) ~ 4/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (4x + 9)/(x³ + 6x² + 13x + 10)
    = (4x + 9)/((x + 2)(x² + 4x + 5))   ← Q(−2) = 0 : Q = (x + 2)(x² + 4x + 5)
    = 1/(x + 2) + (−x + 2)/(x² + 4x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (1/(x + 2) + (−x + 2)/(x² + 4x + 5)) dx
    = ∫ 1/(x + 2) dx + ∫ −(1/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 4/((x + 2)² + 1) dx   ← −x + 2 = −(1/2)(2x + 4) + 4, et x² + 4x + 5 = (x + 2)² + 1
    = ln(x + 2) − (1/2)ln(x² + 4x + 5) + 4arctan(x + 2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : ln(x + 2) − (1/2)ln(x² + 4x + 5) + 4arctan(x + 2)
    = (1/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)   ← Regrouper les Log
    = 2π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (4x + 9)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [ln(x + 2) − (1/2)ln(x² + 4x + 5) + 4arctan(x + 2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 2π + (1/2)ln(10/9) − 4arctan(3)   ← Retrancher F(1)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe ln(x + 2) − (1/2)ln(x² + 4x + 5) en un seul Log. | (1/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{1}^{∞} (4x + 11)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I.
  [tap, suivre l'erreur, menu steps]  x²·(4x + 11)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (4 + 11/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = 4   ← f(x) ~ 4/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (4x + 11)/(x³ + 6x² + 13x + 10)
    = (4x + 11)/((x + 2)(x² + 4x + 5))   ← Q(−2) = 0 : Q = (x + 2)(x² + 4x + 5)
    = 3/(x + 2) + (−3x − 2)/(x² + 4x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (3/(x + 2) + (−3x − 2)/(x² + 4x + 5)) dx
    = ∫ 3/(x + 2) dx + ∫ −(3/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 4/((x + 2)² + 1) dx   ← −3x − 2 = −(3/2)(2x + 4) + 4, et x² + 4x + 5 = (x + 2)² + 1
    = 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2)
    = (3/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)   ← Regrouper les Log
    = 2π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (4x + 11)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 4arctan(x + 2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 2π + (3/2)ln(10/9) − 4arctan(3)   ← Retrancher F(1)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 3ln(x + 2) − (3/2)ln(x² + 4x + 5) en un seul Log. | (3/2)ln((x + 2)²/(x² + 4x + 5)) + 4arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{0}^{∞} (2x + 7)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I.
  [tap, suivre l'erreur, menu steps]  x²·(2x + 7)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = (2 + 7/x)/(1 + 6/x + 13/x² + 10/x³)   ← Diviser par x³
    = 2   ← f(x) ~ 2/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (2x + 7)/(x³ + 6x² + 13x + 10)
    = (2x + 7)/((x + 2)(x² + 4x + 5))   ← Q(−2) = 0 : Q = (x + 2)(x² + 4x + 5)
    = 3/(x + 2) + (−3x − 4)/(x² + 4x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (3/(x + 2) + (−3x − 4)/(x² + 4x + 5)) dx
    = ∫ 3/(x + 2) dx + ∫ −(3/2)(2x + 4)/(x² + 4x + 5) dx + ∫ 2/((x + 2)² + 1) dx   ← −3x − 4 = −(3/2)(2x + 4) + 2, et x² + 4x + 5 = (x + 2)² + 1
    = 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 2arctan(x + 2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 2arctan(x + 2)
    = (3/2)ln((x + 2)²/(x² + 4x + 5)) + 2arctan(x + 2)   ← Regrouper les Log
    = π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (2x + 7)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [3ln(x + 2) − (3/2)ln(x² + 4x + 5) + 2arctan(x + 2)]_{0}^{b}   ← I = lim F(b) − F(a)
    = π + (3/2)ln(5/4) − 2arctan(2)   ← Retrancher F(0)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 3ln(x + 2) − (3/2)ln(x² + 4x + 5) en un seul Log. | (3/2)ln((x + 2)²/(x² + 4x + 5)) + 2arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 4

```
I = ∫_{1}^{∞} (x + 5)/(x³ + 3x² + 7x + 5) dx. (a) Montre que I converge. (b) Calcule I.
  [free, suivre l'erreur]  x²·(x + 5)/(x³ + 3x² + 7x + 5)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1   ← f(x) ~ 1/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (x + 5)/(x³ + 3x² + 7x + 5)
    = (x + 5)/((x + 1)(x² + 2x + 5))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 5)
    = 1/(x + 1) + (−x)/(x² + 2x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (1/(x + 1) + (−x)/(x² + 2x + 5)) dx
    = ln(x + 1) − (1/2)ln(x² + 2x + 5) + (1/2)arctan((x + 1)/2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : ln(x + 1) − (1/2)ln(x² + 2x + 5) + (1/2)arctan((x + 1)/2)
    = (1/2)ln((x + 1)²/(x² + 2x + 5)) + (1/2)arctan((x + 1)/2)   ← Regrouper les Log
    = π/4   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (x + 5)/(x³ + 3x² + 7x + 5) dx
    = lim_{b→∞} [ln(x + 1) − (1/2)ln(x² + 2x + 5) + (1/2)arctan((x + 1)/2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = π/8 + (1/2)ln(2)   ← Retrancher F(1)
  aides : −1 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe ln(x + 1) − (1/2)ln(x² + 2x + 5) en un seul Log. | (1/2)ln((x + 1)²/(x² + 2x + 5)) + (1/2)arctan((x + 1)/2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{1}^{∞} (4x + 12)/(x³ + 3x² + 7x + 5) dx. (a) Montre que I converge. (b) Calcule I.
  [free, suivre l'erreur]  x²·(4x + 12)/(x³ + 3x² + 7x + 5)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 4   ← f(x) ~ 4/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (4x + 12)/(x³ + 3x² + 7x + 5)
    = (4x + 12)/((x + 1)(x² + 2x + 5))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 5)
    = 2/(x + 1) + (−2x + 2)/(x² + 2x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (2/(x + 1) + (−2x + 2)/(x² + 2x + 5)) dx
    = 2ln(x + 1) − ln(x² + 2x + 5) + 2arctan((x + 1)/2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : 2ln(x + 1) − ln(x² + 2x + 5) + 2arctan((x + 1)/2)
    = ln((x + 1)²/(x² + 2x + 5)) + 2arctan((x + 1)/2)   ← Regrouper les Log
    = π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (4x + 12)/(x³ + 3x² + 7x + 5) dx
    = lim_{b→∞} [2ln(x + 1) − ln(x² + 2x + 5) + 2arctan((x + 1)/2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = π/2 + ln(2)   ← Retrancher F(1)
  aides : −1 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe 2ln(x + 1) − ln(x² + 2x + 5) en un seul Log. | ln((x + 1)²/(x² + 2x + 5)) + 2arctan((x + 1)/2)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{1}^{∞} (3x + 3)/(x³ + 6x² + 13x + 10) dx. (a) Montre que I converge. (b) Calcule I.
  [free, suivre l'erreur]  x²·(3x + 3)/(x³ + 6x² + 13x + 10)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −2 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 3   ← f(x) ~ 3/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (3x + 3)/(x³ + 6x² + 13x + 10)
    = (3x + 3)/((x + 2)(x² + 4x + 5))   ← Q(−2) = 0 : Q = (x + 2)(x² + 4x + 5)
    = −3/(x + 2) + (3x + 9)/(x² + 4x + 5)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (−3/(x + 2) + (3x + 9)/(x² + 4x + 5)) dx
    = −3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 3arctan(x + 2) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : −3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 3arctan(x + 2)
    = −(3/2)ln((x + 2)²/(x² + 4x + 5)) + 3arctan(x + 2)   ← Regrouper les Log
    = 3π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (3x + 3)/(x³ + 6x² + 13x + 10) dx
    = lim_{b→∞} [−3ln(x + 2) + (3/2)ln(x² + 4x + 5) + 3arctan(x + 2)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 3π/2 − (3/2)ln(10/9) − 3arctan(3)   ← Retrancher F(1)
  aides : −2 est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞. | Regroupe −3ln(x + 2) + (3/2)ln(x² + 4x + 5) en un seul Log. | −(3/2)ln((x + 2)²/(x² + 4x + 5)) + 3arctan(x + 2)
  pièges : a1_improper_undefined_means_diverge

```

### Niveau 5

```
I = ∫_{0}^{∞} (5x + 4)/(x³ + 3x² + 4x + 2) dx. (a) Montre que I converge. (b) Calcule I.
  [free, sans aide]  x²·(5x + 4)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 5   ← f(x) ~ 5/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (5x + 4)/(x³ + 3x² + 4x + 2)
    = (5x + 4)/((x + 1)(x² + 2x + 2))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 2)
    = −1/(x + 1) + (x + 6)/(x² + 2x + 2)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (−1/(x + 1) + (x + 6)/(x² + 2x + 2)) dx
    = −ln(x + 1) + (1/2)ln(x² + 2x + 2) + 5arctan(x + 1) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : −ln(x + 1) + (1/2)ln(x² + 2x + 2) + 5arctan(x + 1)
    = −(1/2)ln((x + 1)²/(x² + 2x + 2)) + 5arctan(x + 1)   ← Regrouper les Log
    = 5π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (5x + 4)/(x³ + 3x² + 4x + 2) dx
    = lim_{b→∞} [−ln(x + 1) + (1/2)ln(x² + 2x + 2) + 5arctan(x + 1)]_{0}^{b}   ← I = lim F(b) − F(a)
    = 5π/4 − (1/2)ln(2)   ← Retrancher F(0)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{1}^{∞} (6x + 7)/(x³ + 3x² + 4x + 2) dx. (a) Montre que I converge. (b) Calcule I.
  [free, sans aide]  x²·(6x + 7)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 6   ← f(x) ~ 6/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (6x + 7)/(x³ + 3x² + 4x + 2)
    = (6x + 7)/((x + 1)(x² + 2x + 2))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 2)
    = 1/(x + 1) + (−x + 5)/(x² + 2x + 2)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (1/(x + 1) + (−x + 5)/(x² + 2x + 2)) dx
    = ln(x + 1) − (1/2)ln(x² + 2x + 2) + 6arctan(x + 1) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : ln(x + 1) − (1/2)ln(x² + 2x + 2) + 6arctan(x + 1)
    = (1/2)ln((x + 1)²/(x² + 2x + 2)) + 6arctan(x + 1)   ← Regrouper les Log
    = 3π   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (6x + 7)/(x³ + 3x² + 4x + 2) dx
    = lim_{b→∞} [ln(x + 1) − (1/2)ln(x² + 2x + 2) + 6arctan(x + 1)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 3π + (1/2)ln(5/4) − 6arctan(2)   ← Retrancher F(1)
  pièges : a1_improper_undefined_means_diverge

I = ∫_{1}^{∞} (3x + 2)/(x³ + 3x² + 4x + 2) dx. (a) Montre que I converge. (b) Calcule I.
  [free, sans aide]  x²·(3x + 2)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [1 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 3   ← f(x) ~ 3/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (3x + 2)/(x³ + 3x² + 4x + 2)
    = (3x + 2)/((x + 1)(x² + 2x + 2))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 2)
    = −1/(x + 1) + (x + 4)/(x² + 2x + 2)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (−1/(x + 1) + (x + 4)/(x² + 2x + 2)) dx
    = −ln(x + 1) + (1/2)ln(x² + 2x + 2) + 3arctan(x + 1) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : −ln(x + 1) + (1/2)ln(x² + 2x + 2) + 3arctan(x + 1)
    = −(1/2)ln((x + 1)²/(x² + 2x + 2)) + 3arctan(x + 1)   ← Regrouper les Log
    = 3π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{1}^{∞} (3x + 2)/(x³ + 3x² + 4x + 2) dx
    = lim_{b→∞} [−ln(x + 1) + (1/2)ln(x² + 2x + 2) + 3arctan(x + 1)]_{1}^{b}   ← I = lim F(b) − F(a)
    = 3π/2 − (1/2)ln(5/4) − 3arctan(2)   ← Retrancher F(1)
  pièges : a1_improper_undefined_means_diverge

```

### Variantes d'examen

```
I = ∫_{0}^{∞} (x + 2)/(x³ + 3x² + 4x + 2) dx. (a) Montre que I converge. (b) Calcule I.
  [free, sans aide, examen open]  x²·(x + 2)/(x³ + 3x² + 4x + 2)
    ? Q s'annule-t-il sur [0 ; +∞[ ? ✔ Non : sa seule racine réelle est −1 / · Oui
    ? Nature de l'intégrale ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère ? → Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)
    = 1   ← f(x) ~ 1/x²
  — (b) Factorise Q, puis décompose f en éléments simples :  [juge equiv]  départ : (x + 2)/(x³ + 3x² + 4x + 2)
    = (x + 2)/((x + 1)(x² + 2x + 2))   ← Q(−1) = 0 : Q = (x + 1)(x² + 2x + 2)
    = 1/(x + 1) + (−x)/(x² + 2x + 2)   ← Décomposition en éléments simples
  — Primitive de f :  [juge antideriv]  départ : ∫ (1/(x + 1) + (−x)/(x² + 2x + 2)) dx
    = ln(x + 1) − (1/2)ln(x² + 2x + 2) + arctan(x + 1) + C   ← Primitives : Log et Arctg
  — Limite de la primitive en +∞ (regroupe les Log avant) :  [juge limit]  départ : ln(x + 1) − (1/2)ln(x² + 2x + 2) + arctan(x + 1)
    = (1/2)ln((x + 1)²/(x² + 2x + 2)) + arctan(x + 1)   ← Regrouper les Log
    = π/2   ← Log 1 = 0 et Arctg → π/2
  — Valeur de I :  [juge definite]  départ : ∫_{0}^{∞} (x + 2)/(x³ + 3x² + 4x + 2) dx
    = lim_{b→∞} [ln(x + 1) − (1/2)ln(x² + 2x + 2) + arctan(x + 1)]_{0}^{b}   ← I = lim F(b) − F(a)
    = π/4 + (1/2)ln(2)   ← Retrancher F(0)
  pièges : a1_improper_undefined_means_diverge

```

## Applications : volumes, longueurs d'arc, aires de révolution (`a1-int-applications`, BA1)

_V = π∫f², L = ∫√(1 + f′²), A = 2π∫|f|√(1 + f′²)._

### Niveau 1

```
Calcule la longueur L de la courbe y = x^(3/2) sur [0 ; 32/9]. On utilise L = ∫ √(1 + f′(x)²) dx.
  [guided]  (x^(3/2))′
    = □   (trous : (3/2)√x)   ← Dériver
  — Simplifie 1 + f′(x)² :  [juge equiv]  départ : 1 + ((3/2)√x)²
    = 1 + 9x/4   ← ((3/2)√x)² = 9x/4
  — L = ∫ √(1 + f′(x)²) dx :  [juge definite]  départ : ∫_{0}^{32/9} √(1 + ((3/2)√x)²) dx
    = ∫_{0}^{32/9} √(1 + 9x/4) dx   ← L = ∫ √(1 + 9x/4) dx
    = [□]_{0}^{32/9}   (trous : [(8/27)(1 + 9x/4)^(3/2)]_{0}^{32/9})   ← Primitive de (1 + 9x/4)^(1/2)
    = (8/27)·(27 − 1)   ← 1 + 9x/4 vaut 9 en 32/9
    = 208/27   ← Calculer
  aides : L = ∫ √(1 + f′(x)²) dx : simplifie d'abord ce qu'il y a sous la racine. | L = ∫_{0}^{32/9} √(1 + 9x/4) dx, puis une primitive. | L = 208/27

Calcule le volume V du solide obtenu en faisant tourner y = √(9 − x²) sur [−3 ; 3] autour de l'axe Ox. On utilise V = π∫ f(x)² dx.
  [guided]  π·(∫_{−3}^{3} (√(9 − x²))² dx)
    = π·(∫_{−3}^{3} (9 − x²) dx)   ← f(x)² = r² − x²
    = π·([□]_{−3}^{3})   (trous : π·([9x − x³/3]_{−3}^{3}))   ← Primitive
    = 36π   ← 4πr³/3
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{−3}^{3} (9 − x²) dx), puis une primitive. | V = 36π
  pièges : a1_volume_no_square

Calcule le volume V du solide obtenu en faisant tourner y = e^(−2x) sur [0 ; +∞[ autour de l'axe Ox. On utilise V = π∫ f(x)² dx.
  [guided]  π·(∫_{0}^{∞} (e^(−2x))² dx)
    = π·(∫_{0}^{∞} e^(−4x) dx)   ← (e^(-2x))² = e^(−4x)
    = π·(lim_{b→∞} [□]_{0}^{b})   (trous : π·(lim_{b→∞} [−e^(−4x)/4]_{0}^{b}))   ← Intégrale généralisée : une limite
    = π/4   ← Calculer
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{0}^{∞} e^(−4x) dx), puis une primitive. | V = π/4
  pièges : a1_volume_no_square

```

### Niveau 2

```
Calcule l'aire A de la surface obtenue en faisant tourner y = cosh(x) sur [0 ; ln(2)] autour de l'axe Ox.
  [guided]  (cosh(x))′
    = sinh(x)   ← Dériver
  — Simplifie |f(x)|·√(1 + f′(x)²) :  [juge equiv]  départ : cosh(x)·√(1 + sinh(x)²)
    ? Quelle formule donne l'aire de la surface obtenue en faisant tourner autour de l'axe Ox ? ✔ A = 2π∫ |f(x)|·√(1 + f′(x)²) dx / · L = ∫ √(1 + f′(x)²) dx / · V = π∫ f(x)² dx
    = cosh(x)²   ← 1 + sinh² = cosh²
  — A = 2π∫ |f(x)|·√(1 + f′(x)²) dx :  [juge definite]  départ : 2π·(∫_{0}^{ln(2)} cosh(x)·√(1 + sinh(x)²) dx)
    = 2π·(∫_{0}^{ln(2)} □ dx)   (trous : 2π·(∫_{0}^{ln(2)} cosh(x)² dx))   ← A = 2π∫ cosh²x dx
    = π·(∫_{0}^{ln(2)} (1 + cosh(2x)) dx)   ← 2cosh²x = 1 + cosh 2x
    = π·([x + sinh(2x)/2]_{0}^{ln(2)})   ← Primitive
    = π·(ln(2) + (4 − 1/4)/4)   ← sinh(2ln 2) = (4 − 1/4)/2
    = π·ln(2) + 15π/16   ← Calculer
  aides : 1 + sinh² = cosh² : la racine disparaît. | A = 2π·(∫_{0}^{ln(2)} cosh(x)² dx), puis une primitive. | A = π·ln(2) + 15π/16

Calcule l'aire A de la surface obtenue en faisant tourner y = √(4 − x²) sur [−2 ; 2] autour de l'axe Ox.
  [guided]  (√(4 − x²))′
    = −x/√(4 − x²)   ← Dériver
  — Simplifie |f(x)|·√(1 + f′(x)²) :  [juge equiv]  départ : √(4 − x²)·√(1 + (−x/√(4 − x²))²)
    ? Quelle formule donne l'aire de la surface obtenue en faisant tourner autour de l'axe Ox ? ✔ A = 2π∫ |f(x)|·√(1 + f′(x)²) dx / · L = ∫ √(1 + f′(x)²) dx / · V = π∫ f(x)² dx
    = 2   ← 1 + x²/(4 − x²) = 4/(4 − x²)
  — A = 2π∫ |f(x)|·√(1 + f′(x)²) dx :  [juge definite]  départ : 2π·(∫_{−2}^{2} √(4 − x²)·√(1 + (−x/√(4 − x²))²) dx)
    = □π·(∫_{−2}^{2} 2 dx)   (trous : 2π·(∫_{−2}^{2} 2 dx))   ← A = 2π∫ 2 dx
    = 2π·([2x]_{−2}^{2})   ← Primitive
    = 16π   ← 4πr² avec r = 2
  aides : A = 2π∫ |f(x)|·√(1 + f′(x)²) dx : simplifie d'abord ce qu'il y a sous la racine. | A = 2π·(∫_{−2}^{2} 2 dx), puis une primitive. | A = 16π
  pièges : g6_chain_forgot

Calcule la longueur L de la courbe y = x²/8 − ln(x) sur [1 ; 3].
  [guided]  (x²/8 − ln(x))′
    = x/4 − 1/x   ← Dériver
  — Simplifie 1 + f′(x)² : c'est un carré parfait.  [juge equiv]  départ : 1 + (x/4 − 1/x)²
    ? Quelle formule donne la longueur de la courbe ? ✔ L = ∫ √(1 + f′(x)²) dx / · L = ∫ (1 + f′(x)²) dx / · V = π∫ f(x)² dx
    = (x/4 + 1/x)²   ← Carré parfait
  — L = ∫ √(1 + f′(x)²) dx :  [juge definite]  départ : ∫_{1}^{3} √(1 + (x/4 − 1/x)²) dx
    = ∫_{1}^{3} □ dx   (trous : ∫_{1}^{3} (x/4 + 1/x) dx)   ← La racine d'un carré positif
    = [x²/8 + ln(x)]_{1}^{3}   ← Primitive
    = (9 − 1)/8 + ln(3)   ← Évaluer
    = 1 + ln(3)   ← Calculer
  aides : L = ∫ √(1 + f′(x)²) dx : simplifie d'abord ce qu'il y a sous la racine. | L = ∫_{1}^{3} (x/4 + 1/x) dx, puis une primitive. | L = 1 + ln(3)
  pièges : a1_arc_length_no_sqrt

```

### Niveau 3

```
Calcule le volume V du solide obtenu en faisant tourner y = e^(−x) sur [0 ; +∞[ autour de l'axe Ox.
  [tap, suivre l'erreur, menu steps]  π·(∫_{0}^{∞} (e^(−x))² dx)
    = π·(∫_{0}^{∞} e^(−2x) dx)   ← (e^(-x))² = e^(−2x)
    = π·(lim_{b→∞} [−e^(−2x)/2]_{0}^{b})   ← Intégrale généralisée : une limite
    = π/2   ← Calculer
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{0}^{∞} e^(−2x) dx), puis une primitive. | V = π/2
  pièges : a1_volume_no_square

Calcule le volume V du solide obtenu en faisant tourner y = e^(−2x) sur [0 ; +∞[ autour de l'axe Ox.
  [tap, suivre l'erreur, menu steps]  π·(∫_{0}^{∞} (e^(−2x))² dx)
    = π·(∫_{0}^{∞} e^(−4x) dx)   ← (e^(-2x))² = e^(−4x)
    = π·(lim_{b→∞} [−e^(−4x)/4]_{0}^{b})   ← Intégrale généralisée : une limite
    = π/4   ← Calculer
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{0}^{∞} e^(−4x) dx), puis une primitive. | V = π/4
  pièges : a1_volume_no_square

Calcule le volume V du solide obtenu en faisant tourner y = sin(x) sur [0 ; π] autour de l'axe Ox.
  [tap, suivre l'erreur, menu steps]  π·(∫_{0}^{π} sin(x)² dx)
    = π·(∫_{0}^{π} (1 − cos(2x))/2 dx)   ← sin²x = (1 − cos 2x)/2
    = π·([x/2 − sin(2x)/4]_{0}^{π})   ← Primitive
    = π²/2   ← Calculer
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{0}^{π} (1 − cos(2x))/2 dx), puis une primitive. | V = π²/2
  pièges : a1_volume_no_square

```

### Niveau 4

```
Calcule le volume V du solide obtenu en faisant tourner y = √(1 − x²) sur [−1 ; 1] autour de l'axe Ox.
  [free, suivre l'erreur]  π·(∫_{−1}^{1} (√(1 − x²))² dx)
    = π·(∫_{−1}^{1} (1 − x²) dx)   ← f(x)² = r² − x²
    = π·([x − x³/3]_{−1}^{1})   ← Primitive
    = 4π/3   ← 4πr³/3
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{−1}^{1} (1 − x²) dx), puis une primitive. | V = 4π/3
  pièges : a1_volume_no_square

Calcule la longueur L de la courbe y = cosh(x) sur [0 ; ln(4)].
  [free, suivre l'erreur]  (cosh(x))′
    = sinh(x)   ← Dériver
  — Simplifie 1 + f′(x)² :  [juge equiv]  départ : 1 + sinh(x)²
    = cosh(x)²   ← 1 + sinh² = cosh²
  — L = ∫ √(1 + f′(x)²) dx :  [juge definite]  départ : ∫_{0}^{ln(4)} √(1 + sinh(x)²) dx
    = ∫_{0}^{ln(4)} cosh(x) dx   ← √(cosh²x) = cosh x
    = [sinh(x)]_{0}^{ln(4)}   ← Primitive
    = (4 − 1/4)/2   ← sinh(ln 4) = (4 − 1/4)/2
    = 15/8   ← Calculer
  aides : 1 + sinh² = cosh² : la racine disparaît. | L = ∫_{0}^{ln(4)} cosh(x) dx, puis une primitive. | L = 15/8

Calcule le volume V du solide obtenu en faisant tourner y = sin(x) sur [0 ; π] autour de l'axe Ox.
  [free, suivre l'erreur]  π·(∫_{0}^{π} sin(x)² dx)
    = π·(∫_{0}^{π} (1 − cos(2x))/2 dx)   ← sin²x = (1 − cos 2x)/2
    = π·([x/2 − sin(2x)/4]_{0}^{π})   ← Primitive
    = π²/2   ← Calculer
  aides : Chaque tranche est un disque de rayon f(x) : V = π∫ f(x)² dx. | V = π·(∫_{0}^{π} (1 − cos(2x))/2 dx), puis une primitive. | V = π²/2
  pièges : a1_volume_no_square

```

### Niveau 5

```
Calcule la longueur L de la courbe y = x²/8 − ln(x) sur [1 ; e].
  [free, sans aide]  (x²/8 − ln(x))′
    = x/4 − 1/x   ← Dériver
  — Simplifie 1 + f′(x)² : c'est un carré parfait.  [juge equiv]  départ : 1 + (x/4 − 1/x)²
    = (x/4 + 1/x)²   ← Carré parfait
  — L = ∫ √(1 + f′(x)²) dx :  [juge definite]  départ : ∫_{1}^{e} √(1 + (x/4 − 1/x)²) dx
    = ∫_{1}^{e} (x/4 + 1/x) dx   ← La racine d'un carré positif
    = [x²/8 + ln(x)]_{1}^{e}   ← Primitive
    = (e² − 1)/8 + 1   ← Évaluer
    = e²/8 + 7/8   ← Calculer

Calcule l'aire A de la surface obtenue en faisant tourner y = cosh(x) sur [0 ; ln(2)] autour de l'axe Ox.
  [free, sans aide]  (cosh(x))′
    = sinh(x)   ← Dériver
  — Simplifie |f(x)|·√(1 + f′(x)²) :  [juge equiv]  départ : cosh(x)·√(1 + sinh(x)²)
    = cosh(x)²   ← 1 + sinh² = cosh²
  — A = 2π∫ |f(x)|·√(1 + f′(x)²) dx :  [juge definite]  départ : 2π·(∫_{0}^{ln(2)} cosh(x)·√(1 + sinh(x)²) dx)
    = 2π·(∫_{0}^{ln(2)} cosh(x)² dx)   ← A = 2π∫ cosh²x dx
    = π·(∫_{0}^{ln(2)} (1 + cosh(2x)) dx)   ← 2cosh²x = 1 + cosh 2x
    = π·([x + sinh(2x)/2]_{0}^{ln(2)})   ← Primitive
    = π·(ln(2) + (4 − 1/4)/4)   ← sinh(2ln 2) = (4 − 1/4)/2
    = π·ln(2) + 15π/16   ← Calculer

Calcule la longueur L de la courbe y = x²/8 − ln(x) sur [1 ; 3].
  [free, sans aide]  (x²/8 − ln(x))′
    = x/4 − 1/x   ← Dériver
  — Simplifie 1 + f′(x)² : c'est un carré parfait.  [juge equiv]  départ : 1 + (x/4 − 1/x)²
    = (x/4 + 1/x)²   ← Carré parfait
  — L = ∫ √(1 + f′(x)²) dx :  [juge definite]  départ : ∫_{1}^{3} √(1 + (x/4 − 1/x)²) dx
    = ∫_{1}^{3} (x/4 + 1/x) dx   ← La racine d'un carré positif
    = [x²/8 + ln(x)]_{1}^{3}   ← Primitive
    = (9 − 1)/8 + ln(3)   ← Évaluer
    = 1 + ln(3)   ← Calculer

```

### Variantes d'examen

```
Volume du solide obtenu en faisant tourner y = √x, x ∈ [0 ; 1], autour de l'axe Ox :
  ✔ π/2   · 1/2   · π   · 2/3π [a1_volume_no_square]
  [examen mcq]
  pièges : a1_volume_no_square

Calcule l'aire A de la surface obtenue en faisant tourner y = cosh(x) sur [0 ; ln(3)] autour de l'axe Ox.
  [free, sans aide, examen open]  (cosh(x))′
    = sinh(x)   ← Dériver
  — Simplifie |f(x)|·√(1 + f′(x)²) :  [juge equiv]  départ : cosh(x)·√(1 + sinh(x)²)
    = cosh(x)²   ← 1 + sinh² = cosh²
  — A = 2π∫ |f(x)|·√(1 + f′(x)²) dx :  [juge definite]  départ : 2π·(∫_{0}^{ln(3)} cosh(x)·√(1 + sinh(x)²) dx)
    = 2π·(∫_{0}^{ln(3)} cosh(x)² dx)   ← A = 2π∫ cosh²x dx
    = π·(∫_{0}^{ln(3)} (1 + cosh(2x)) dx)   ← 2cosh²x = 1 + cosh 2x
    = π·([x + sinh(2x)/2]_{0}^{ln(3)})   ← Primitive
    = π·(ln(3) + (9 − 1/9)/4)   ← sinh(2ln 3) = (9 − 1/9)/2
    = π·ln(3) + 20π/9   ← Calculer

```

## Pièges de cette unité

- **Dérivabilité en x₀ lue sur la formule de f′(x) (guide « Méthodes », 5.1)** (`a1_derivable_from_formula`, C) : « f′(x) = 2x sin(1/x) − cos(1/x) n'a pas de limite en 0, donc f n'est pas dérivable en 0 » au lieu de f′(0) = lim (h² sin(1/h))/h = 0
- **Point anguleux non vu : une seule dérivée latérale, ou leur moyenne** (`a1_corner_missed`, E) : « |x| a pour dérivée 0 en 0 » au lieu de |x| n'est pas dérivable en 0 : f′₋(0) = −1, f′₊(0) = 1
- **Dérivées d'Arctg, Arcsin et Argsh échangées** (`a1_arc_deriv_table`, E) : (Arctg x)′ = 1/√(1 − x²) au lieu de (Arctg x)′ = 1/(1 + x²)
- **(f⁻¹)′(y₀) calculé avec f′(y₀) au lieu de f′(x₀)** (`a1_inverse_deriv_wrong_point`, E) : (f⁻¹)′(5) = 1/f′(5) au lieu de (f⁻¹)′(5) = 1/f′(1)
- **(uᵛ)′ = uᵛ·Log u·v′ : le terme v·u′/u manque** (`a1_exp_rule_var_base`, E) : ((x + 3)ˣ)′ = (x + 3)ˣ·Log(x + 3) au lieu de ((x + 3)ˣ)′ = (x + 3)ˣ·(Log(x + 3) + x/(x + 3))
- **C¹ défini sans la continuité de f′ (cours Friedli, exemple 9.34 ; examens 2020 et 2022)** (`a1_c1_def_missing_cont`, C) : « f ∈ C¹(I) si f est dérivable sur I » au lieu de f ∈ C¹(I) si f est dérivable sur I et f′ est continue sur I
- **Pentes des morceaux égalées sans vérifier la continuité (guide « Méthodes », 5.1)** (`a1_piecewise_derivative_formula`, C) : égaler g₁′(x₀) et g₂′(x₀) seulement au lieu de continuité au raccord, puis dérivées à gauche et à droite
- **f′(x₀) déduit de lim f′(x) sans le taux d'accroissement (check-list MT 2018)** (`a1_c1_from_lim_fprime_only`, C) : « lim f′(x) = 3, donc f′(0) = 3 » au lieu de f′(0) = lim (f(h) − f(0))/h = 3, puis lim f′(x) = 3 = f′(0)
- **0 × (borné) pris pour une forme indéterminée (résumé « Calcul de limites »)** (`a1_bounded_times_zero`, C) : lim x·sin(1/x) « n'existe pas » au lieu de lim x·sin(1/x) = 0
- **Coefficients du DL sans le k!** (`a1_dl_factorial_missing`, E) : eˣ = 1 + x + x² + x³ + x³·ε(x) au lieu de eˣ = 1 + x + x²/2 + x³/6 + x³·ε(x)
- **1/(1 + u) appliqué sans mettre la constante en facteur** (`a1_dl_factor_out_constant`, E) : 1/(4 + 3x) = 1 − 3x + 9x² + x²·ε(x) au lieu de 1/(4 + 3x) = (1/4)(1 − 3x/4 + 9x²/16) + x²·ε(x)
- **Reste écrit à un autre ordre que le dernier terme gardé** (`a1_dl_remainder_wrong_order`, E) : sin x = x − x³/6 + x⁵·ε(x) au lieu de sin x = x − x³/6 + x³·ε(x)
- **Dans uᵏ, seul le terme principal de u est gardé** (`a1_dl_truncate_inner`, C) : sin(sin x) = x − x³/3 + x⁵/60 + x⁵·ε(x) au lieu de sin(sin x) = x − x³/3 + x⁵/10 + x⁵·ε(x)
- **Un facteur développé à un ordre trop bas** (`a1_dl_truncate_early`, E) : eˣ·sin x avec eˣ = 1 + x : x + x² − x³/6 + x³·ε(x) au lieu de eˣ·sin x = x + x² + x³/3 + x³·ε(x)
- **Puissance d'un DL distribuée sur ses termes** (`a1_dl_cube_coeffs`, C) : (1 + x + x²·ε(x))³ = 1 + x + x²·ε(x) au lieu de (1 + x)³ = 1 + 3x + 3x² + …
- **DL de f en 0 appliqué à u qui ne tend pas vers 0** (`a1_dl_compose_nonzero_inner`, C) : e^(1/(1 − x)) = 5/2 + 2x + 5x²/2 + x²·ε(x) au lieu de e^(1/(1 − x)) = e(1 + x + 3x²/2) + x²·ε(x)
- **Équivalent remplacé dans une somme** (`a1_ipe_in_sum`, C) : (x − sin x)/x³ avec sin x ~ x : (x − x)/x³ → 0 au lieu de (x − sin x)/x³ → 1/6
- **DL pas assez long pour le dénominateur** (`a1_dl_order_too_low`, E) : (eˣ − 1 − x)/x² avec eˣ = 1 + x + x·ε(x) : → 0 au lieu de (eˣ − 1 − x)/x² → 1/2 (DL d'ordre 2)
- **f⁽ᵏ⁾(a) lu comme le coefficient aₖ** (`a1_dl_read_factorial`, C) : f = 7 − 5(x − 1)² + … : f″(1) = −5 au lieu de f″(1) = 2!·(−5) = −10
- **aₖ divisé par k! au lieu de multiplié** (`a1_dl_read_divide`, E) : f⁽⁵⁾(0) = (47/40)/120 au lieu de f⁽⁵⁾(0) = 120·47/40 = 141
- **|f⁽ⁿ⁺¹⁾| majoré par sa valeur en a** (`a1_taylor_rest_at_a`, E) : eˣ sur [0 ; 0,1] : |f‴(c)| ≤ |f‴(0)| = 1 au lieu de |f‴(c)| ≤ e^0,1 ≤ 2
- **Bernoulli-l'Hôpital appliqué sans forme indéterminée** (`a1_bh_not_indeterminate`, C) : (x + 1)/(x² + 3x + 1) en 0 : « = 1/3 par BH » au lieu de la limite est 1/1 = 1
- **BH : dériver le quotient au lieu du haut et du bas** (`a1_bh_quotient_rule`, E) : lim f/g = lim (f/g)′ au lieu de lim f/g = lim f′/g′
- **Réciproque de BH : « lim f′/g′ n'existe pas, donc lim f/g non plus »** (`a1_bh_converse`, C) : lim g′/h′ n'existe pas ⇒ lim g/h n'existe pas au lieu de on ne peut rien conclure
- **Extrema globaux cherchés seulement parmi les points où f′ = 0** (`a1_extrema_bounds_forgotten`, E) : max de x³ − 3x sur [0 ; 3] : « −2 » (seul point critique) au lieu de f(3) = 18
- **Rolle appliqué sans ses hypothèses** (`a1_rolle_without_hyp`, C) : f(−1) = f(1) ⇒ ∃c : f′(c) = 0, pour f = |x| au lieu de hypothèse « f dérivable » manquante
- **Taux d'accroissement encadré par les valeurs de f au lieu de f′** (`a1_mvt_endpoints_values`, E) : encadrement par f(a) et f(b) au lieu de encadrement par les valeurs de f′
- **Asymptote oblique : la pente sans l'ordonnée à l'origine** (`a1_oblique_asymptote_slope_only`, E) : asymptote y = x au lieu de y = x + 1
- **Pente d'une courbe polaire prise égale à ρ̇** (`a1_polar_slope_naive`, E) : y′ = ρ̇ au lieu de y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ)
- **Arctg pris pour un Log** (`a1_int_arctg_as_log`, E) : ∫ 1/(1 + x²) dx = Log(1 + x²) au lieu de ∫ 1/(1 + x²) dx = Arctg x
- **Facteur de u′ oublié dans une primitive** (`a1_int_missing_inner_factor`, E) : ∫ x/(1 + x⁴) dx = Arctg(x²) au lieu de ∫ x/(1 + x⁴) dx = ½Arctg(x²)
- **Constante d'intégration oubliée** (`a1_int_no_constant`, E) : ∫ 2x dx = x² au lieu de ∫ 2x dx = x² + C
- **dx remplacé par dt sans le facteur φ′(t)** (`a1_subst_dx_kept`, E) : t = √x : ∫ dx/(√x(1 + √x)) = ∫ dt/(t(1 + t)) au lieu de ∫ 2 dt/(1 + t)
- **Bornes en x gardées après le changement de variable** (`a1_subst_bounds_kept`, E) : t = √x : ∫₁⁴ dx/(√x(1 + √x)) = ∫₁⁴ 2 dt/(1 + t) au lieu de ∫₁² 2 dt/(1 + t)
- **Signe de la deuxième IPP pas distribué** (`a1_ibp_sign`, E) : x²e^(2x)/2 − ∫ x e^(2x) = x²e^(2x)/2 − x e^(2x)/2 − ∫ e^(2x)/2 au lieu de … + ∫ e^(2x)/2
- **Formule d'intégration par parties avec un +** (`a1_ibp_plus`, E) : ∫ uv′ = uv + ∫ u′v au lieu de ∫ uv′ = uv − ∫ u′v
- **Primitive d'un produit prise comme produit des primitives** (`a1_int_product`, R) : ∫ x²e^(2x) dx = (x³/3)(e^(2x)/2) au lieu de intégration par parties
- **Terme de bord [uv] oublié dans une IPP définie** (`a1_ibp_boundary_term`, C) : ∫₀¹ x eˣ dx = −∫₀¹ eˣ dx au lieu de [x eˣ]₀¹ − ∫₀¹ eˣ dx
- **Coefficient décalé dans une formule de récurrence** (`a1_reduction_index`, E) : Jₙ = e − (n − 1)Jₙ₋₁ au lieu de Jₙ = e − n·Jₙ₋₁
- **Mauvaise forme de la décomposition en éléments simples** (`a1_des_wrong_form`, E) : B/(x² + 2x + 5) au lieu de (Bx + C)/(x² + 2x + 5)
- **Arctg sans le facteur 1/a** (`a1_arctg_scale`, E) : ∫ dx/((x + 1)² + 4) = Arctg(x + 1) au lieu de ½Arctg((x + 1)/2)
- **Log du dénominateur quel que soit le numérateur** (`a1_int_log_of_denominator`, E) : ∫ (x + 5)/((x − 1)(x² + 2x + 5)) dx = Log|(x − 1)(x² + 2x + 5)| au lieu de décomposition en éléments simples
- **t = tan(x/2) sans le facteur 2/(1 + t²)** (`a1_trig_subst_dx`, E) : t = tan(x/2) : dx = dt au lieu de dx = 2 dt/(1 + t²)
- **Identité trigonométrique appliquée aux hyperboliques** (`a1_hyper_identity_sign`, E) : 2cosh²t = 2 − 2sinh²t au lieu de 2cosh²t = 2 + 2sinh²t
- **Primitive inventée pour e^(x²)** (`a1_int_exp_square_primitive`, C) : ∫₀² e^(x²) dx = e^(8/3) − 1 au lieu de e^(x²) n'a pas de primitive élémentaire : on encadre
- **Intégrale nulle sur un intervalle symétrique sans fonction impaire** (`a1_parity_misused`, C) : f bijective, f(0) = 0 ⇒ ∫₋₁¹ f = 0 au lieu de seulement si f est impaire
- **Théorème fondamental sans la règle de chaîne** (`a1_ftc_no_chain`, E) : (∫₁^(x³) f)′ = f(x³) au lieu de 3x²·f(x³)
- **Chercher une primitive avant de dériver** (`a1_ftc_integrate_first`, E) : (∫₀^(x²) e^(−t²) dt)′ : primitive e^(−t³/3) au lieu de G′(x) = 2x·e^(−x⁴), sans primitive
- **Théorème fondamental à travers un point où f n'est pas bornée** (`a1_improper_singularity_ignored`, R) : ∫₋₁¹ dx/x² = [−1/x]₋₁¹ = −2 au lieu de diverge
- **« f n'est pas définie à la borne, donc l'intégrale diverge »** (`a1_improper_undefined_means_diverge`, C) : f n'est pas définie en 0, donc ∫ de 0⁺ à π/6 diverge au lieu de elle converge et vaut √2
- **Critères en 0⁺ et en +∞ échangés** (`a1_alpha_criteria_swapped`, E) : ∫ de 0⁺ à 1 de dx/√x « diverge (α < 1) » au lieu de converge
- **« f → 0, donc l'intégrale converge »** (`a1_improper_lim_zero_converges`, C) : 1/x → 0 en +∞, donc ∫₁^∞ dx/x converge au lieu de diverge
- **Un seul point problème étudié** (`a1_improper_one_end_only`, E) : verdict après le seul point 1⁺ au lieu de les deux points 1⁺ et +∞
- **Limite de chaque Log séparément (∞ − ∞)** (`a1_improper_log_split_limit`, C) : [−2Log(x + 1)]₁^∞ + [Log(x² + 2x + 2)]₁^∞ = −∞ + ∞ au lieu de Log((x² + 2x + 2)/(x + 1)²) → 0
- **Volume de révolution sans le carré** (`a1_volume_no_square`, E) : V = π∫ f(x) dx au lieu de V = π∫ f(x)² dx
- **Longueur d'arc sans la racine** (`a1_arc_length_no_sqrt`, E) : L = ∫ (1 + f′²) dx au lieu de L = ∫ √(1 + f′²) dx
- **Comparaison dans le mauvais sens** (`a1_compare_wrong_direction`, E) : f ≥ 1/x², ∫ 1/x² converge, donc ∫ f converge au lieu de il faut f ≤ g
