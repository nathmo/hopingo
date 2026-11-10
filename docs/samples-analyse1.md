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
  pièges : a1_bh_quotient_rule, a1_abs_removed

Soit f(x) = x·|x|. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  (h·|h|)/h
    = □   (trous : |h|)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □ | |h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule, a1_abs_removed

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
  pièges : a1_bh_quotient_rule, a1_abs_removed, a1_bounded_times_zero, a1_derivable_from_formula

Soit f(x) = |x|³. Montre avec le taux d'accroissement que f est dérivable en 0, et donne f′(0).
  [guided]  |h|³/h
    ? Comment trouver la limite du taux ? · Simplifier, puis gendarmes : la partie bornée est multipliée par une quantité qui tend vers 0 / ✔ Simplifier par h (ou un équivalent), puis passer à la limite / · 0 × (borné) est une forme indéterminée : la limite n'existe pas / · Dériver la formule de f, puis remplacer x par 0
    = □   (trous : h·|h|)   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = h·□ | h·|h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule, a1_abs_removed, a1_bounded_times_zero, a1_derivable_from_formula

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
  pièges : a1_bh_quotient_rule, a1_abs_removed

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
  pièges : a1_bh_quotient_rule, a1_abs_removed

Soit f(x) = x·|x|. Calcule f′(0) par la définition.
  [free, suivre l'erreur]  (h·|h|)/h
    = |h|   ← Simplifier par h
    = 0   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = □ | |h|, puis 0 : f′(0) = 0
  pièges : a1_bh_quotient_rule, a1_abs_removed

Soit f(x) = 3x + x·|x|. Calcule f′(0) par la définition.
  [free, suivre l'erreur]  (3h + h·|h|)/h
    = 3 + |h|   ← Simplifier par h
    = 3   ← |h| → 0
  aides : Écris (f(0 + h) − f(0))/h et simplifie par h : |h| reste, et |h| → 0. | = 3 + □ | 3 + |h|, puis 3 : f′(0) = 3
  pièges : a1_bh_quotient_rule, a1_abs_removed

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
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 1 ; Calcule maintenant f′(2). : 1)
    [free, sans aide, suivre l'erreur, examen open]  ((1 + x²)^x)′
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
  [problème, examen open, 1 points]
  partie 1 (Début du problème : 1)
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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale, a1_piecewise_derivative_formula

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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale, a1_piecewise_derivative_formula

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
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_remarkable_limit_scale

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
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; En 0, par la définition : (f(h) − f(0))/h. : 3 ; Continuité de f′ en 0 : la limite de f′(x). : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  (x + x³·sin(1/x))′
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
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

```

### Niveau 2

```
Trouve lim_{x→0} ln(1 + 4x)/(3x), avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  ln(1 + 4x)/(3x)
    ? Quelle forme ? ✔ 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / · Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = 4/(3(1 + 4x))   ← BH : dériver le haut et le bas
    = 4/3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : 4/(3(□)) | Une fois BH, puis la limite vaut 4/3.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Trouve lim_{x→0} (e^(4x) − e^(−x))/x, avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  (e^(4x) − e^(−x))/x
    ? Quelle forme ? ✔ 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / · Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = 4e^(4x) + e^(−x)   ← BH : dériver le haut et le bas
    = 5   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □+e^(−x) | Une fois BH, puis la limite vaut 5.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Trouve lim_{x→0} (x − 5)/(x² + 2x + 5), avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [guided]  (x − 5)/(x² + 2x + 5)
    ? Quelle forme ? · 0/0 : on peut appliquer BH / · ∞/∞ : on peut appliquer BH / ✔ Pas indéterminé : on substitue / · 1^∞ : on passe par e^(…·ln …)
    = −1   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | En 0, le haut vaut −5 et le bas vaut 5 : substitue x = 0. | La limite vaut −1.
  pièges : a1_bh_not_indeterminate, a1_dominant_term_wrong

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
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Trouve lim_{x→0} (1 − cos(2x))/x², avec la règle de Bernoulli-l'Hôpital si elle s'applique.
  [tap, suivre l'erreur, menu steps]  (1 − cos(2x))/x²
    ? Quelle forme ? → 0/0
    = 2sin(2x)/(2x)   ← BH : dériver le haut et le bas
    = 4cos(2x)/2   ← BH : dériver le haut et le bas
    = 2   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : 2sin(□)/(2x) | 2 fois BH, puis la limite vaut 2.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} (e^x − e^(−2x))/x.
  [free, suivre l'erreur]  (e^x − e^(−2x))/x
    ? Quelle forme ? → 0/0
    = e^x + 2e^(−2x)   ← BH : dériver le haut et le bas
    = 3   ← Substituer
  aides : Vérifie la forme ; si c'est 0/0 ou ∞/∞, dérive le haut et le bas séparément. | Après BH : □+2e^(−2x) | Une fois BH, puis la limite vaut 3.
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

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
  pièges : a1_dl_factorial_missing, a1_ipe_in_sum, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

```

### Variantes d'examen

```
lim_{x→0} (1 − cos(2x))/x² = ?
  ✔ 2   · 0 [a1_dl_order_too_low]   · 1/2 [a1_remarkable_limit_scale]   · 4 [a1_dl_factorial_missing]
  [examen mcq]
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_remarkable_limit_scale

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
  [problème, examen open, 7 points]
  partie 1 (Début du problème : 1 ; Dérive f : 1 ; Résous f′(x) = 0 : 1 ; Évalue f aux candidats : 1 ; Candidat suivant : 1 ; Candidat suivant : 1 ; Maximum global de f sur [−1 ; 2] : 0,5 ; Minimum global de f sur [−1 ; 2] : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  2² − 4·3
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
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Dérive y(t) : 0,5 ; Tangente horizontale : ẏ = 0 (ẋ ≠ 0 en ces t) : 0,5 ; Point de tangente horizontale pour t = 0 : 0,5 ; Tangente verticale : ẋ = 0 (ẏ ≠ 0 en ces t) : 0,5 ; Point double : y(t) = y(s) avec s ≠ t donne s = −t ; alors x(t) = x(−t) donne, pour t ≠ 0 : 1)
    [free, sans aide, suivre l'erreur, examen open]  (t³ − 3t − 1)′
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Limite de x = ρ cos φ quand φ → π⁻ : 1,5 ; (b) Limite de y = ρ sin φ quand φ → π⁻ : 1,5 ; (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) : 3 ; (c) Au passage, ẏ (dérive y simplifié) : 1 ; (d) Point P sur l'axe Oy : φ = π/2. : 1 ; (d) Pente en P : 1 ; (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[ : 1)
    [free, sans aide, suivre l'erreur]  (4tan(φ/2))′
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Limite de x = ρ cos φ quand φ → π⁻ : 1,5 ; (b) Limite de y = ρ sin φ quand φ → π⁻ : 1,5 ; (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 5tan(φ/2) et ρ̇ = 5/(1 + cos(φ)) : 3 ; (c) Au passage, ẏ (dérive y simplifié) : 1 ; (d) Point P sur l'axe Oy : φ = π/2. : 1 ; (d) Pente en P : 1 ; (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[ : 1)
    [free, sans aide, suivre l'erreur]  (5tan(φ/2))′
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Limite de x = ρ cos φ quand φ → π⁻ : 1,5 ; (b) Limite de y = ρ sin φ quand φ → π⁻ : 1,5 ; (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 2tan(φ/2) et ρ̇ = 2/(1 + cos(φ)) : 3 ; (c) Au passage, ẏ (dérive y simplifié) : 1 ; (d) Point P sur l'axe Oy : φ = π/2. : 1 ; (d) Pente en P : 1 ; (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[ : 1)
    [free, sans aide, suivre l'erreur]  (2tan(φ/2))′
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
  [problème, examen open, 12 points]
  partie 1 (Début du problème : 2 ; (b) Limite de x = ρ cos φ quand φ → π⁻ : 1,5 ; (b) Limite de y = ρ sin φ quand φ → π⁻ : 1,5 ; (c) Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ), avec ρ = 4tan(φ/2) et ρ̇ = 4/(1 + cos(φ)) : 3 ; (c) Au passage, ẏ (dérive y simplifié) : 1 ; (d) Point P sur l'axe Oy : φ = π/2. : 1 ; (d) Pente en P : 1 ; (e) Tangentes horizontales : ẏ = 0 sur [0 ; π[ : 1)
    [free, sans aide, suivre l'erreur, examen open]  (4tan(φ/2))′
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
  pièges : a1_bh_not_indeterminate, a1_dominant_term_wrong

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
  pièges : a1_bh_not_indeterminate, a1_dominant_term_wrong

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
  [problème, examen open, 7 points]
  partie 1 (Début du problème : 3 ; Déduis-en f⁽⁴⁾(0) : 2 ; Déduis-en f⁽⁵⁾(0) : 2)
    [free, sans aide, suivre l'erreur, examen open]  ln(1 − x²)/sin(x)
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
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 2)
    [free, sans aide, suivre l'erreur, examen open]  ∫_{0}^{1} x·arctan(x) dx
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
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Calcule I₀ : 1 ; Remonte la récurrence jusqu'à I₂ : 1)
    [free, sans aide, suivre l'erreur, examen open]  I_n
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
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1,5 ; L’intégrale : 2,5)
    [free, sans aide, suivre l'erreur, examen open]  (4x² + x + 21)/(x³ + 3x² + 9x + 27)
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
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  ∫_{π/3}^{π/2} 2/sin(x) dx
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
  pièges : a1_sqrt_sum_split, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  pièges : a1_sqrt_sum_split, a1_improper_one_end_only, a1_alpha_criteria_swapped

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
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 2)
    [free, sans aide, suivre l'erreur, examen open]  x²·(5x + 1)/(x³ + 3x² + 4x + 2)
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Factorise Q, puis décompose f en éléments simples : 4 ; Primitive de f : 2 ; Limite de la primitive en +∞ (regroupe les Log avant) : 3 ; Valeur de I : 1)
    [free, sans aide, suivre l'erreur]  x²·(5x + 4)/(x³ + 3x² + 4x + 2)
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Factorise Q, puis décompose f en éléments simples : 4 ; Primitive de f : 2 ; Limite de la primitive en +∞ (regroupe les Log avant) : 3 ; Valeur de I : 1)
    [free, sans aide, suivre l'erreur]  x²·(6x + 7)/(x³ + 3x² + 4x + 2)
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
  [problème, 12 points]
  partie 1 (Début du problème : 2 ; (b) Factorise Q, puis décompose f en éléments simples : 4 ; Primitive de f : 2 ; Limite de la primitive en +∞ (regroupe les Log avant) : 3 ; Valeur de I : 1)
    [free, sans aide, suivre l'erreur]  x²·(3x + 2)/(x³ + 3x² + 4x + 2)
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
  [problème, examen open, 12 points]
  partie 1 (Début du problème : 2 ; (b) Factorise Q, puis décompose f en éléments simples : 4 ; Primitive de f : 2 ; Limite de la primitive en +∞ (regroupe les Log avant) : 3 ; Valeur de I : 1)
    [free, sans aide, suivre l'erreur, examen open]  x²·(x + 2)/(x³ + 3x² + 4x + 2)
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
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Simplifie |f(x)|·√(1 + f′(x)²) : 1 ; A = 2π∫ |f(x)|·√(1 + f′(x)²) dx : 2)
    [free, sans aide, suivre l'erreur, examen open]  (cosh(x))′
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

## Inf, Sup, Min, Max d'un ensemble défini par une fonction (`a1-sup-inf`, BA1)

_Réécrire A en intervalles en x, puis lire ses bornes._

### Niveau 1

```
A = {x > 0 : 1/ln(x) > 4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max. 1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens.
  [guided]  1/ln(x) > 4
    = 0 < ln(x) < □   (trous : 0 < ln(x) < 1/4)   ← 1/ln x > 0 force ln x > 0 ; multiplier par ln x > 0 garde le sens : 1 > 4ln x
    = 1 < x < e^(1/4)   ← Appliquer exp, croissante
    = ]1 ; e^(1/4)[   ← Écrire en intervalles
  — A = ]1 ; e^(1/4)[. Lis ses bornes. Inf A :  [juge value]  départ : I
    (1 ∉ A : pas de Min.)
    = 1   ← 1 ∉ A
  — Sup A :  [juge value]  départ : S
    (e^(1/4) ∉ A : pas de Max.)
    = e^(1/4)   ← e^(1/4) ∉ A
  aides : 1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens. | Première ligne : 0 < ln(x) < 1/4 | A = ]1 ; e^(1/4)[ : Inf A = 1 ; Sup A = e^(1/4)
  pièges : g1_mult_denominator, g9_bracket

A = {x ∈ ℝ* : 0 < arctan(1/x) ≤ π/4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max. Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[.
  [guided]  0 < arctan(1/x) ≤ π/4
    = tan(0) < 1/x ≤ tan(π/4)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 0 < □/x ≤ □   (trous : 0 < 1/x ≤ 1)   ← Valeurs de tan
    = x > 0 et x ≥ 1   ← Le signe de x, puis inverser
    = [1 ; +∞[   ← Écrire en intervalles
  — A = [1 ; +∞[. Lis ses bornes. Inf A :  [juge value]  départ : I
    (A n'est pas majoré : Sup A = +∞, pas de Max.)
    (1 ∈ A : Min A = Inf A.)
    = 1   ← 1 ∈ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(0) < 1/x ≤ tan(π/4) | A = [1 ; +∞[ : Inf A = 1 ; Sup A = +∞
  pièges : g9_bracket

A = {x ∈ ℝ* : 0 < arctan(2/x) < π/3}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max. Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[.
  [guided]  0 < arctan(2/x) < π/3
    = tan(0) < 2/x < tan(π/3)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 0 < 2/x < □   (trous : 0 < 2/x < √3)   ← Valeurs de tan
    = x > 0 et x > 2√3/3   ← Le signe de x, puis inverser
    = ]2√3/3 ; +∞[   ← Écrire en intervalles
  — A = ]2√3/3 ; +∞[. Lis ses bornes. Inf A :  [juge value]  départ : I
    (A n'est pas majoré : Sup A = +∞, pas de Max.)
    (2√3/3 ∉ A : pas de Min.)
    = 2√3/3   ← 2√3/3 ∉ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(0) < 2/x < tan(π/3) | A = ]2√3/3 ; +∞[ : Inf A = 2√3/3 ; Sup A = +∞
  pièges : g9_bracket

```

### Niveau 2

```
A = {x > 0 : 1/ln(x) > 4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [guided]  1/ln(x) > 4
    ? Comment commencer ? ✔ Multiplier par ln x, qui est positif : le sens ne change pas / · Multiplier par ln x en changeant le sens
    = 0 < ln(x) < 1/4   ← 1/ln x > 0 force ln x > 0 ; multiplier par ln x > 0 garde le sens : 1 > 4ln x
    = 1 < x < e^(1/4)   ← Appliquer exp, croissante
    = ]1 ; e^(1/4)[   ← Écrire en intervalles
  — A = ]1 ; e^(1/4)[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = 1 : est-il dans A ? ✔ Non : 1 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = 1   ← 1 ∉ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = e^(1/4) : est-il dans A ? ✔ Non : e^(1/4) ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = e^(1/4)   ← e^(1/4) ∉ A
  aides : 1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens. | Première ligne : 0 < ln(x) < 1/4 | A = ]1 ; e^(1/4)[ : Inf A = 1 ; Sup A = e^(1/4)
  pièges : g1_mult_denominator, g9_bracket, a1_sup_in_set

A = {x ∈ ℝ* : −π/3 < arctan(3/x) < −π/6}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [guided]  −π/3 < arctan(3/x) < −π/6
    ? Comment commencer ? ✔ Appliquer tan aux trois membres : tan est croissante sur ]−π/2 ; π/2[ / · Appliquer Arctg aux trois membres
    = tan(−π/3) < 3/x < tan(−π/6)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = −√3 < 3/x < −1/√3   ← Valeurs de tan
    = −3√3 < x < −√3   ← Inverser : 1/u est décroissante sur chaque demi-droite
    = ]−3√3 ; −√3[   ← Écrire en intervalles
  — A = ]−3√3 ; −√3[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = −3√3 : est-il dans A ? ✔ Non : −3√3 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = −3√3   ← −3√3 ∉ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = −√3 : est-il dans A ? ✔ Non : −√3 ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = −√3   ← −√3 ∉ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(−π/3) < 3/x < tan(−π/6) | A = ]−3√3 ; −√3[ : Inf A = −3√3 ; Sup A = −√3
  pièges : g9_bracket, a1_sup_in_set

A = {x > 0 : 1 < ln(x) < 2}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [guided]  1 < ln(x) < 2
    ? Comment commencer ? ✔ Appliquer exp aux trois membres (croissante) / · Appliquer ln aux trois membres
    = e < x < e²   ← Appliquer exp, strictement croissante
    = ]e ; e²[   ← Écrire en intervalles
  — A = ]e ; e²[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = e : est-il dans A ? ✔ Non : e ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = e   ← e ∉ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = e² : est-il dans A ? ✔ Non : e² ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = e²   ← e² ∉ A
  aides : exp est strictement croissante : applique-la aux trois membres. | Première ligne : e < x < e² | A = ]e ; e²[ : Inf A = e ; Sup A = e^2
  pièges : g9_bracket, a1_sup_in_set

```

### Niveau 3

```
A = {x ∈ ℝ* : 0 < arctan(4/x) ≤ π/6}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [tap, suivre l'erreur, menu steps]  0 < arctan(4/x) ≤ π/6
    = tan(0) < 4/x ≤ tan(π/6)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 0 < 4/x ≤ 1/√3   ← Valeurs de tan
    = x > 0 et x ≥ 4√3   ← Le signe de x, puis inverser
    = [4√3 ; +∞[   ← Écrire en intervalles
  — A = [4√3 ; +∞[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? A est-il majoré ? ✔ Non : Sup A = +∞, et A n'a pas de maximum / · Oui, par la borne de droite des valeurs
    ? Inf A = 4√3 : est-il dans A ? ✔ Oui : le crochet est fermé, Min A = Inf A / · Non : A n'a pas de minimum
    = 4√3   ← 4√3 ∈ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(0) < 4/x ≤ tan(π/6) | A = [4√3 ; +∞[ : Inf A = 4√3 ; Sup A = +∞
  pièges : g9_bracket, a1_supinf_on_values

A = {x ∈ ℝ* : 0 < arctan(4/x) < π/3}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [tap, suivre l'erreur, menu steps]  0 < arctan(4/x) < π/3
    = tan(0) < 4/x < tan(π/3)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 0 < 4/x < √3   ← Valeurs de tan
    = x > 0 et x > 4√3/3   ← Le signe de x, puis inverser
    = ]4√3/3 ; +∞[   ← Écrire en intervalles
  — A = ]4√3/3 ; +∞[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? A est-il majoré ? ✔ Non : Sup A = +∞, et A n'a pas de maximum / · Oui, par la borne de droite des valeurs
    ? Inf A = 4√3/3 : est-il dans A ? ✔ Non : 4√3/3 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = 4√3/3   ← 4√3/3 ∉ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(0) < 4/x < tan(π/3) | A = ]4√3/3 ; +∞[ : Inf A = 4√3/3 ; Sup A = +∞
  pièges : g9_bracket, a1_supinf_on_values, a1_sup_in_set

A = {x ∈ ℝ* : π/3 < arctan(3/x) < 3π/4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [tap, suivre l'erreur, menu steps]  π/3 < arctan(3/x) < 3π/4
    = π/3 < arctan(3/x)   ← Arctg prend ses valeurs dans ]−π/2 ; π/2[, et π/2 < 3π/4 : la seconde inégalité est toujours vraie
    = √3 < 3/x   ← Appliquer tan, croissante sur ]−π/2 ; π/2[
    = 0 < x < √3   ← k/x > 0 donne x > 0, puis inverser
    = ]0 ; √3[   ← Écrire en intervalles
  — A = ]0 ; √3[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = 0 : est-il dans A ? ✔ Non : 0 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = 0   ← 0 ∉ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = √3 : est-il dans A ? ✔ Non : √3 ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = √3   ← √3 ∉ A
  aides : tan n'est croissante que sur ]−π/2 ; π/2[ : 3π/4 n'y est pas. Arctg(…) < π/2 < 3π/4 est toujours vrai. | Première ligne : π/3 < arctan(3/x) | A = ]0 ; √3[ : Inf A = 0 ; Sup A = √3
  pièges : g1_pole_closed, g9_bracket, a1_tan_monotone_range, a1_sup_in_set

```

### Niveau 4

```
A = {x > 0 : 1/ln(x) > 2}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [free, suivre l'erreur]  1/ln(x) > 2
    = 0 < ln(x) < 1/2   ← 1/ln x > 0 force ln x > 0 ; multiplier par ln x > 0 garde le sens : 1 > 2ln x
    = 1 < x < e^(1/2)   ← Appliquer exp, croissante
    = ]1 ; e^(1/2)[   ← Écrire en intervalles
  — A = ]1 ; e^(1/2)[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = 1 : est-il dans A ? ✔ Non : 1 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = 1   ← 1 ∉ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = e^(1/2) : est-il dans A ? ✔ Non : e^(1/2) ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = e^(1/2)   ← e^(1/2) ∉ A
  aides : 1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens. | Première ligne : 0 < ln(x) < 1/2 | A = ]1 ; e^(1/2)[ : Inf A = 1 ; Sup A = e^(1/2)
  pièges : g1_mult_denominator, g9_bracket, a1_sup_in_set

A = {x > 0 : −2 ≤ ln(x) < 0}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [free, suivre l'erreur]  −2 ≤ ln(x) < 0
    = e^(−2) ≤ x < 1   ← Appliquer exp, strictement croissante
    = [e^(−2) ; 1[   ← Écrire en intervalles
  — A = [e^−2 ; 1[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = e^(−2) : est-il dans A ? ✔ Oui : le crochet est fermé, Min A = Inf A / · Non : A n'a pas de minimum
    = e^(−2)   ← e^(−2) ∈ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = 1 : est-il dans A ? ✔ Non : 1 ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = 1   ← 1 ∉ A
  aides : exp est strictement croissante : applique-la aux trois membres. | Première ligne : e^−2 ≤ x < 1 | A = [e^−2 ; 1[ : Inf A = e^−2 ; Sup A = 1
  pièges : g9_bracket, a1_sup_in_set

A = {x ∈ ℝ* : 0 < arctan(4/x) < π/4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [free, suivre l'erreur]  0 < arctan(4/x) < π/4
    = tan(0) < 4/x < tan(π/4)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 0 < 4/x < 1   ← Valeurs de tan
    = x > 0 et x > 4   ← Le signe de x, puis inverser
    = ]4 ; +∞[   ← Écrire en intervalles
  — A = ]4 ; +∞[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? A est-il majoré ? ✔ Non : Sup A = +∞, et A n'a pas de maximum / · Oui, par la borne de droite des valeurs
    ? Inf A = 4 : est-il dans A ? ✔ Non : 4 ∉ A, A n'a pas de minimum / · Oui : Min A = Inf A
    = 4   ← 4 ∉ A
  aides : Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. | Première ligne : tan(0) < 4/x < tan(π/4) | A = ]4 ; +∞[ : Inf A = 4 ; Sup A = +∞
  pièges : g9_bracket, a1_supinf_on_values, a1_sup_in_set

```

### Niveau 5

```
A = {x ∈ ℝ* : π/6 < arctan(2/x) ≤ π/4}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.
  [free, sans aide]  π/6 < arctan(2/x) ≤ π/4
    = tan(π/6) < 2/x ≤ tan(π/4)   ← Appliquer tan, strictement croissante sur ]−π/2 ; π/2[
    = 1/√3 < 2/x ≤ 1   ← Valeurs de tan
    = 2 ≤ x < 2√3   ← Inverser : 1/u est décroissante sur chaque demi-droite
    = [2 ; 2√3[   ← Écrire en intervalles
  — A = [2 ; 2√3[. Lis ses bornes. Inf A :  [juge value]  départ : I
    ? Inf A = 2 : est-il dans A ? ✔ Oui : le crochet est fermé, Min A = Inf A / · Non : A n'a pas de minimum
    = 2   ← 2 ∈ A
  — Sup A :  [juge value]  départ : S
    ? Sup A = 2√3 : est-il dans A ? ✔ Non : 2√3 ∉ A, A n'a pas de maximum / · Oui : Max A = Sup A
    = 2√3   ← 2√3 ∉ A
  pièges : g9_bracket, a1_sup_in_set

Soit A = {x ∈ ℝ* : π/6 ≤ arctan(4/x) < π/3}. Quelle affirmation est vraie ?
  · Inf A = 1/√3 [a1_supinf_on_values]   · Min A = 4√3/3 [a1_sup_in_set]   ✔ Inf A = 4√3/3, et A n'a pas de minimum   · Sup A = √3 [a1_supinf_on_values]
  pièges : a1_supinf_on_values, a1_sup_in_set

Soit A = {x > 0 : 1/ln(x) > 3}. Quelle affirmation est vraie ?
  · Sup A = 1/3 [a1_supinf_on_values]   · Min A = 1 [a1_sup_in_set]   · Max A = e^(1/3) [a1_sup_in_set]   ✔ Sup A = e^(1/3), et A n'a pas de maximum
  pièges : a1_supinf_on_values, a1_sup_in_set

```

### Variantes d'examen

```
Soit A = {1/(1 + 3x²) : x ≥ 0}, l'ensemble des valeurs. Quelle affirmation est vraie ?
  ✔ Inf A = 0, et A n'a pas de minimum   · A n'est pas majoré [a1_supinf_on_values]   · Sup A = 1, et A n'a pas de maximum   · Min A = 0 [a1_sup_in_set]
  [examen mcq]
  pièges : a1_supinf_on_values, a1_sup_in_set

Vrai ou faux ? « Pour A = {x > 0 : Log(x) < 2}, Sup A = 2. »
  · Vrai [a1_supinf_on_values]   ✔ Faux
  [examen tf]
  pièges : a1_supinf_on_values

```

## Prouver que s = Sup A (`a1-sup-proof`, BA1)

_s majore A, et pour tout ε > 0, un x ∈ A dépasse s − ε._

### Niveau 1

```
A = ]−2 ; 2[. Montre que Sup A = 2. Touche les blocs dans l'ordre. Le début est placé.
  [blocs frame]
    ? Soit ε > 0. Quel x convient (x ∈ A et x > 2 − ε) ? · x = 2 − ε / · x = 2 − ε/2 / ✔ x = max(2 − ε/2 ; 0)
    1. Posons x = max(2 − ε/2 ; 0).
    2. Alors x ∈ A et x > 2 − ε.
    3. Aucun nombre plus petit que 2 n'est un majorant : 2 = Sup A.

A = [−5 ; −2[. Montre que Sup A = −2. Touche les blocs dans l'ordre. Le début est placé.
  [blocs frame]
    ? Soit ε > 0. Quel x convient (x ∈ A et x > −2 − ε) ? ✔ x = max(−2 − ε/2 ; −7/2) / · x = −2 − ε / · x = −2 − ε/2
    1. Posons x = max(−2 − ε/2 ; −7/2).
    2. Alors x ∈ A et x > −2 − ε.
    3. Aucun nombre plus petit que −2 n'est un majorant : −2 = Sup A.

A = [2 ; 5[. Montre que Sup A = 5. Touche les blocs dans l'ordre. Le début est placé.
  [blocs frame]
    ? Soit ε > 0. Quel x convient (x ∈ A et x > 5 − ε) ? ✔ x = max(5 − ε/2 ; 7/2) / · x = 5 − ε / · x = 5 − ε/2
    1. Posons x = max(5 − ε/2 ; 7/2).
    2. Alors x ∈ A et x > 5 − ε.
    3. Aucun nombre plus petit que 5 n'est un majorant : 5 = Sup A.

```

### Niveau 2

```
A = ]2 ; 4[. Montre que Inf A = 2. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x > … : … est un minorant de A.   [à écrire : Minorant : 2]
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = min(2+ε/2 ; 3)]
    4. Alors x ∈ A et x < 2 + ε.
    5. Aucun nombre plus grand que 2 n'est un minorant : 2 = Inf A.

A = ]0 ; 4[. Montre que Sup A = 4. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x < … : … est un majorant de A.   [à écrire : Majorant : 4]
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = max(4-ε/2 ; 2)]
    4. Alors x ∈ A et x > 4 − ε.
    5. Aucun nombre plus petit que 4 n'est un majorant : 4 = Sup A.

A = ]−4 ; 4[. Montre que Inf A = −4. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x > … : … est un minorant de A.   [à écrire : Minorant : -4]
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = min(-4+ε/2 ; 0)]
    4. Alors x ∈ A et x < −4 + ε.
    5. Aucun nombre plus grand que −4 n'est un minorant : −4 = Inf A.

```

### Niveau 3

```
A = [−4 ; 3[. Montre que Sup A = 3. Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour tout x ∈ A, x < 3 : 3 est un majorant de A.
    2. Soit ε > 0.
    3. Posons x = max(3 − ε/2 ; −1/2).
    4. Alors x ∈ A et x > 3 − ε.
    5. Aucun nombre plus petit que 3 n'est un majorant : 3 = Sup A.
    ✗ Prenons ε = 0,1 : x = 3 − 0,05 convient. [g9_proof_by_example]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x > 3 − ε. [g9_quant_order]
  pièges : g9_proof_by_example, g9_quant_order

A = ]−2 ; 3[. Montre que Sup A = 3. Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour tout x ∈ A, x < 3 : 3 est un majorant de A.
    2. Soit ε > 0.
    3. Posons x = max(3 − ε/2 ; 1/2).
    4. Alors x ∈ A et x > 3 − ε.
    5. Aucun nombre plus petit que 3 n'est un majorant : 3 = Sup A.
    ✗ 3 ∈ A, donc 3 = Sup A. [a1_sup_in_set]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x > 3 − ε. [g9_quant_order]
  pièges : a1_sup_in_set, g9_quant_order

A = ]3 ; 5]. Montre que Inf A = 3. Touche les blocs dans l'ordre.
  [blocs order]
    1. Pour tout x ∈ A, x > 3 : 3 est un minorant de A.
    2. Soit ε > 0.
    3. Posons x = min(3 + ε/2 ; 4).
    4. Alors x ∈ A et x < 3 + ε.
    5. Aucun nombre plus grand que 3 n'est un minorant : 3 = Inf A.
    ✗ Prenons ε = 0,1 : x = 3 + 0,05 convient. [g9_proof_by_example]
    ✗ 3 ∈ A, donc 3 = Inf A. [a1_sup_in_set]
  pièges : g9_proof_by_example, a1_sup_in_set

```

### Niveau 4

```
A = [3 ; 5[. Montre que Sup A = 5. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x < 5 : 5 est un majorant de A.
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = max(5-ε/2 ; 4)]
    4. Alors x ∈ A et x > 5 − ε.
    5. Aucun nombre plus petit que 5 n'est un majorant : 5 = Sup A.
    ✗ 5 ∈ A, donc 5 = Sup A. [a1_sup_in_set]
    ✗ Prenons ε = 0,1 : x = 5 − 0,05 convient. [g9_proof_by_example]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x > 5 − ε. [g9_quant_order]
  pièges : a1_sup_in_set, g9_proof_by_example, g9_quant_order

A = ]−1 ; 4]. Montre que Inf A = −1. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x > −1 : −1 est un minorant de A.
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = min(-1+ε/2 ; 3/2)]
    4. Alors x ∈ A et x < −1 + ε.
    5. Aucun nombre plus grand que −1 n'est un minorant : −1 = Inf A.
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x < −1 + ε. [g9_quant_order]
    ✗ Prenons ε = 0,1 : x = −1 + 0,05 convient. [g9_proof_by_example]
    ✗ −1 ∈ A, donc −1 = Inf A. [a1_sup_in_set]
  pièges : g9_quant_order, g9_proof_by_example, a1_sup_in_set

A = ]1 ; 3]. Montre que Inf A = 1. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame]
    1. Pour tout x ∈ A, x > 1 : 1 est un minorant de A.
    2. Soit ε > 0.
    3. Posons x = …   [à écrire : x = min(1+ε/2 ; 2)]
    4. Alors x ∈ A et x < 1 + ε.
    5. Aucun nombre plus grand que 1 n'est un minorant : 1 = Inf A.
    ✗ Prenons ε = 0,1 : x = 1 + 0,05 convient. [g9_proof_by_example]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x < 1 + ε. [g9_quant_order]
    ✗ 1 ∈ A, donc 1 = Inf A. [a1_sup_in_set]
  pièges : g9_proof_by_example, g9_quant_order, a1_sup_in_set

```

### Niveau 5

```
A = {2 + 2/n : n ∈ ℕ*}. Montre que Inf A = 2. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Pour tout n ≥ 1, 2/n > 0, donc 2 + 2/n > 2 : 2 est un minorant de A.
    2. Soit ε > 0.
    3. Prenons un entier n ≥ …   [à écrire : Seuil : n ≥ 2/ε+1]
    4. Alors 2/n < ε, donc x = 2 + 2/n ∈ A et x < 2 + ε.
    5. Aucun nombre plus grand que 2 n'est un minorant : 2 = Inf A.
    ✗ Prenons ε = 0,1 : x = 2 + 0,05 convient. [g9_proof_by_example]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x < 2 + ε. [g9_quant_order]
    ✗ 2 ∈ A, donc 2 = Inf A. [a1_sup_in_set]
  pièges : g9_proof_by_example, g9_quant_order, a1_sup_in_set

A = {3 − 2/n : n ∈ ℕ*}. Montre que Sup A = 3. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Pour tout n ≥ 1, 2/n > 0, donc 3 − 2/n < 3 : 3 est un majorant de A.
    2. Soit ε > 0.
    3. Prenons un entier n ≥ …   [à écrire : Seuil : n ≥ 2/ε+1]
    4. Alors 2/n < ε, donc x = 3 − 2/n ∈ A et x > 3 − ε.
    5. Aucun nombre plus petit que 3 n'est un majorant : 3 = Sup A.
    ✗ 3 ∈ A, donc 3 = Sup A. [a1_sup_in_set]
    ✗ Prenons ε = 0,1 : x = 3 − 0,05 convient. [g9_proof_by_example]
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x > 3 − ε. [g9_quant_order]
  pièges : a1_sup_in_set, g9_proof_by_example, g9_quant_order

A = {−2 − 2/n : n ∈ ℕ*}. Montre que Sup A = −2. Touche les blocs dans l'ordre et complète les calculs.
  [blocs frame, sans aide]
    1. Pour tout n ≥ 1, 2/n > 0, donc −2 − 2/n < −2 : −2 est un majorant de A.
    2. Soit ε > 0.
    3. Prenons un entier n ≥ …   [à écrire : Seuil : n ≥ 2/ε+1]
    4. Alors 2/n < ε, donc x = −2 − 2/n ∈ A et x > −2 − ε.
    5. Aucun nombre plus petit que −2 n'est un majorant : −2 = Sup A.
    ✗ Il existe x ∈ A tel que, pour tout ε > 0, x > −2 − ε. [g9_quant_order]
    ✗ −2 ∈ A, donc −2 = Sup A. [a1_sup_in_set]
    ✗ Prenons ε = 0,1 : x = −2 − 0,05 convient. [g9_proof_by_example]
  pièges : g9_quant_order, a1_sup_in_set, g9_proof_by_example

```

### Variantes d'examen

```
A = {1 − 3/n : n ∈ ℕ*}. Montre que Sup A = 1.
  [problème, examen open, 2 points]
  partie 1 (1 est un majorant : 0,5)
  Première étape : pourquoi 1 est-il un majorant de A ?
    · Pour n = 1, le terme vaut −2, plus petit que 1 [g9_proof_by_example]   · Parce que 1 est le plus grand élément de A [a1_sup_in_set]   ✔ Pour tout n ≥ 1, 3/n > 0, donc 1 − 3/n < 1   · Parce que 1 ∈ A [a1_sup_in_set]
  partie 2 (Construire x(ε) : 1)
  Deuxième étape : pour tout ε > 0, trouve un élément de A plus grand que 1 − ε. Touche les blocs dans l'ordre et complète.
    [blocs frame, sans aide]
      1. Soit ε > 0.
      2. Prenons un entier n ≥ …   [à écrire : Seuil : n ≥ 3/ε+1]
      3. Alors 3/n < ε, donc x = 1 − 3/n ∈ A et x > 1 − ε.
      ✗ Prenons ε = 0,1 : x = 1 − 0,05 convient. [g9_proof_by_example]
  partie 3 (Conclure : 0,5)
  Conclusion :
    · On ne peut rien conclure sans fixer ε [g9_quant_order]   · 1 = Max A [a1_sup_in_set]   · Sup A = 1 − ε   ✔ 1 = Sup A, et A n'a pas de maximum
  pièges : a1_sup_in_set, g9_proof_by_example, g9_quant_order

Vrai ou faux ?
  « Soit A ⊂ ℝ non vide et majoré, et c = Sup A. Pour tout ε > 0, il existe x ∈ A tel que x + ε ≥ c. » → VRAI
  [examen tf]

```

## Écrire la définition ε-N de la limite d'une suite (`a1-seq-eps-n-def`, BA1)

_∀ε > 0 ∃N ∈ ℕ ∀n ≥ N : |aₙ − L| ≤ ε._

### Niveau 1

```
Construis la définition : « lim aₙ = −∞ ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∀n ≥ N
    2. , a_n ≤ −M
    ✗ ∀N ∈ ℕ [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « lim aₙ = −2 ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. , |a_n + 2| ≤ ε
    ✗ ∃N ∈ ℕ qui dépend de n [a1_n_depends_on_n]
  pièges : a1_n_depends_on_n, g9_quant_order

Construis la définition : « lim aₙ = 3 ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. , |a_n − 3| ≤ ε
    ✗ ∃ε > 0 [g9_quant_order]
  pièges : g9_quant_order

```

### Niveau 2

```
Construis la définition : « lim aₙ = +∞ ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃N ∈ ℕ
    2. ∀n ≥ N
    3. , a_n ≥ M
    ✗ ∀N ∈ ℕ [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « lim aₙ = +∞ ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃N ∈ ℕ
    2. ∀n ≥ N
    3. , a_n ≥ M
    ✗ ∀N ∈ ℕ [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « lim aₙ = L ». Le début est placé. Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃N ∈ ℕ
    2. ∀n ≥ N
    3. , |a_n − L| ≤ ε
    ✗ ∃ε > 0 [g9_quant_order]
  pièges : g9_quant_order

```

### Niveau 3

```
Construis la définition : « lim aₙ = 2 ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃N ∈ ℕ
    3. ∀n ≥ N
    4. , |a_n − 2| ≤ ε
    ✗ ∃N ∈ ℕ qui dépend de n [a1_n_depends_on_n]
    ✗ ∀N ∈ ℕ [g9_quant_order]
  pièges : a1_n_depends_on_n, g9_quant_order

Construis la définition : « lim aₙ = 0 ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃N ∈ ℕ
    3. ∀n ≥ N
    4. , |a_n| ≤ ε
    ✗ ∀N ∈ ℕ [g9_quant_order]
    ✗ ∃ε > 0 [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « lim aₙ = L ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃N ∈ ℕ
    3. ∀n ≥ N
    4. , |a_n − L| ≤ ε
    ✗ ∃ε > 0 [g9_quant_order]
    ✗ ∀N ∈ ℕ [g9_quant_order]
  pièges : g9_quant_order

```

### Niveau 4

```
Donne la définition précise : « lim aₙ = −∞ ».
  [jetons] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≤ −M · ε > 0 · a_n ≥ M · a_n ≤ M
    → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  aides : On te donne ε (ou M) d'abord ; tu dois trouver un rang N qui marche pour tous les n après. N dépend de ε, pas de n. | ∀M > 0 … | ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  pièges : g9_quant_order

Donne la définition précise : « lim aₙ = −∞ ».
  [jetons] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≤ −M · ε > 0 · a_n ≥ M · a_n ≤ M
    → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  aides : On te donne ε (ou M) d'abord ; tu dois trouver un rang N qui marche pour tous les n après. N dépend de ε, pas de n. | ∀M > 0 … | ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  pièges : g9_quant_order

Donne la définition précise : « (aₙ) est une suite de Cauchy ».
  [jetons] palette : ε > 0 · N ∈ ℕ · m, n ≥ N · |a_m − a_n| ≤ ε · ε ≥ 0 · |a_(n+1) − a_n| ≤ ε · n ≥ N
    → ∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε
  aides : On te donne ε (ou M) d'abord ; tu dois trouver un rang N qui marche pour tous les n après. N dépend de ε, pas de n. | ∀ε > 0 … | ∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε
  pièges : g9_quant_order, a1_cauchy_consecutive

```

### Niveau 5

```
Donne la définition précise : « (aₙ) est une suite de Cauchy ».
  [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · m, n ≥ N · |a_m − a_n| ≤ ε · ε ≥ 0 · |a_(n+1) − a_n| ≤ ε · n ≥ N
    → ∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε
  pièges : g9_quant_order, a1_cauchy_consecutive

Donne la définition précise : « lim aₙ = −∞ ».
  [jetons, sans aide] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≤ −M · ε > 0 · a_n ≥ M · a_n ≤ M
    → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  pièges : g9_quant_order

Donne la définition précise : « lim aₙ = +∞ ».
  [jetons, sans aide] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≥ M · ε > 0 · a_n ≤ M · |a_n − L| ≤ ε
    → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≥ M
  pièges : g9_quant_order

```

### Variantes d'examen

```
Donne la définition précise : « lim aₙ = L ».
  [problème, examen open, 1 points]
  partie 1 (Début du problème : 1)
    [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · n ≥ N · |a_n − L| ≤ ε · ε ≥ 0 · M > 0 · a_n ≥ M · |a_n| ≤ ε
      → ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |a_n − L| ≤ ε
    [examen open]
  pièges : g9_quant_order

Vrai ou faux ?
  « Toute suite (aₙ) qui converge vers L vérifie : ∃N ∈ ℕ ∀ε > 0 ∀n ≥ N, |aₙ − L| ≤ ε. » → FAUX
    contre-exemple (sequence) : a = 1/n
  [examen tf]
  pièges : g9_quant_order

```

## Trouver N(ε) pour une limite de suite (`a1-seq-eps-n`, BA1)

_Simplifier |aₙ − L|, le majorer simplement, résoudre en n._

### Niveau 1

```
Montre par la définition que lim aₙ = 4 pour aₙ = 4 + 3/(n² + 1) : simplifie |aₙ − 4|, majore-le par c/n², puis donne N(ε) tel que |aₙ − 4| ≤ ε pour tout n ≥ N(ε).
  [guided]  |4 + 3/(n² + 1) − 4|
    = □/(n² + 1)   (trous : 3/(n² + 1))   ← Simplifier : 3/(n² + 1) > 0
  — Majore 3/(n² + 1) par une expression simple c/n² :  [juge equiv]  départ : 3/(n² + 1)
    = □/n²   (trous : 3/n²)   ← Majorer : n² + 1 ≥ n²
  — Résous 3/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = √(□/ε)   (trous : √(3/ε))   ← 3/n² ≤ ε dès que n ≥ √(3/ε)
    (Pour tout n ≥ N(ε) = √(3/ε), |aₙ − 4| ≤ 3/n² ≤ ε : lim aₙ = 4.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ − 4| = 3/(n² + 1) ≤ 3/n² ≤ ε dès que n ≥ ▢ | 3/(n² + 1) ≤ 3/n² ≤ ε dès que n ≥ √(3/ε) : N(ε) = √(3/ε)
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −3 pour aₙ = (−3n² − 5)/(n² + 3) : simplifie |aₙ + 3|, majore-le par c/n², puis donne N(ε) tel que |aₙ + 3| ≤ ε pour tout n ≥ N(ε).
  [guided]  |(−3n² − 5)/(n² + 3) + 3|
    = □/(n² + 3)   (trous : 4/(n² + 3))   ← Simplifier
  — Majore 4/(n² + 3) par une expression simple c/n² :  [juge equiv]  départ : 4/(n² + 3)
    = □/n²   (trous : 4/n²)   ← Majorer : n² + 3 ≥ n²
  — Résous 4/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = √(□/ε)   (trous : √(4/ε))   ← 4/n² ≤ ε dès que n ≥ √(4/ε)
    (Pour tout n ≥ N(ε) = √(4/ε), |aₙ + 3| ≤ 4/n² ≤ ε : lim aₙ = −3.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 3| = 4/(n² + 3) ≤ 4/n² ≤ ε dès que n ≥ ▢ | 4/(n² + 3) ≤ 4/n² ≤ ε dès que n ≥ √(4/ε) : N(ε) = √(4/ε)
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −1 pour aₙ = −1 + 5/(n² + 2) : simplifie |aₙ + 1|, majore-le par c/n², puis donne N(ε) tel que |aₙ + 1| ≤ ε pour tout n ≥ N(ε).
  [guided]  |−1 + 5/(n² + 2) + 1|
    = □/(n² + 2)   (trous : 5/(n² + 2))   ← Simplifier : 5/(n² + 2) > 0
  — Majore 5/(n² + 2) par une expression simple c/n² :  [juge equiv]  départ : 5/(n² + 2)
    = □/n²   (trous : 5/n²)   ← Majorer : n² + 2 ≥ n²
  — Résous 5/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = √(□/ε)   (trous : √(5/ε))   ← 5/n² ≤ ε dès que n ≥ √(5/ε)
    (Pour tout n ≥ N(ε) = √(5/ε), |aₙ + 1| ≤ 5/n² ≤ ε : lim aₙ = −1.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 1| = 5/(n² + 2) ≤ 5/n² ≤ ε dès que n ≥ ▢ | 5/(n² + 2) ≤ 5/n² ≤ ε dès que n ≥ √(5/ε) : N(ε) = √(5/ε)
  pièges : g1_triangle_reverse

```

### Niveau 2

```
Montre par la définition que lim aₙ = −1 pour aₙ = (−n − 11)/(n + 2) : simplifie |aₙ + 1|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 1| ≤ ε pour tout n ≥ N(ε).
  [guided]  |(−n − 11)/(n + 2) + 1|
    = |□|/(n + 2)   (trous : |−n − 11 + (n + 2)|/(n + 2))   ← Réduire au même dénominateur
    = □/(n + 2)   (trous : 9/(n + 2))   ← Simplifier : il reste une constante en haut
  — Majore 9/(n + 2) par une expression simple c/n :  [juge equiv]  départ : 9/(n + 2)
    = □/n   (trous : 9/n)   ← Majorer : n + 2 ≥ n
  — Résous 9/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 9/ε   ← 9/n ≤ ε dès que n ≥ 9/ε
    (Pour tout n ≥ N(ε) = 9/ε, |aₙ + 1| ≤ 9/n ≤ ε : lim aₙ = −1.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 1| = 9/(n + 2) ≤ 9/n ≤ ε dès que n ≥ ▢ | 9/(n + 2) ≤ 9/n ≤ ε dès que n ≥ 9/ε : N(ε) = 9/ε
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = 2 pour aₙ = (2n² + 9)/(n² + 3) : simplifie |aₙ − 2|, majore-le par c/n², puis donne N(ε) tel que |aₙ − 2| ≤ ε pour tout n ≥ N(ε).
  [guided]  |(2n² + 9)/(n² + 3) − 2|
    = |□|/(n² + 3)   (trous : |2n² + 9 − 2(n² + 3)|/(n² + 3))   ← Réduire au même dénominateur
    = □/(n² + 3)   (trous : 3/(n² + 3))   ← Simplifier
  — Majore 3/(n² + 3) par une expression simple c/n² :  [juge equiv]  départ : 3/(n² + 3)
    = □/n²   (trous : 3/n²)   ← Majorer : n² + 3 ≥ n²
  — Résous 3/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = √(3/ε)   ← 3/n² ≤ ε dès que n ≥ √(3/ε)
    (Pour tout n ≥ N(ε) = √(3/ε), |aₙ − 2| ≤ 3/n² ≤ ε : lim aₙ = 2.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ − 2| = 3/(n² + 3) ≤ 3/n² ≤ ε dès que n ≥ ▢ | 3/(n² + 3) ≤ 3/n² ≤ ε dès que n ≥ √(3/ε) : N(ε) = √(3/ε)
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −2 pour aₙ = (−2n − 13)/(n + 3) : simplifie |aₙ + 2|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 2| ≤ ε pour tout n ≥ N(ε).
  [guided]  |(−2n − 13)/(n + 3) + 2|
    = |□|/(n + 3)   (trous : |−2n − 13 + 2(n + 3)|/(n + 3))   ← Réduire au même dénominateur
    = □/(n + 3)   (trous : 7/(n + 3))   ← Simplifier : il reste une constante en haut
  — Majore 7/(n + 3) par une expression simple c/n :  [juge equiv]  départ : 7/(n + 3)
    = □/n   (trous : 7/n)   ← Majorer : n + 3 ≥ n
  — Résous 7/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 7/ε   ← 7/n ≤ ε dès que n ≥ 7/ε
    (Pour tout n ≥ N(ε) = 7/ε, |aₙ + 2| ≤ 7/n ≤ ε : lim aₙ = −2.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 2| = 7/(n + 3) ≤ 7/n ≤ ε dès que n ≥ ▢ | 7/(n + 3) ≤ 7/n ≤ ε dès que n ≥ 7/ε : N(ε) = 7/ε
  pièges : g1_triangle_reverse

```

### Niveau 3

```
Montre par la définition que lim aₙ = −5 pour aₙ = (−5n − 2)/(n + 2) : simplifie |aₙ + 5|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 5| ≤ ε pour tout n ≥ N(ε).
  [tap, suivre l'erreur, menu steps]  |(−5n − 2)/(n + 2) + 5|
    = |−5n − 2 + 5(n + 2)|/(n + 2)   ← Réduire au même dénominateur
    = 8/(n + 2)   ← Simplifier : il reste une constante en haut
  — Majore 8/(n + 2) par une expression simple c/n :  [juge equiv]  départ : 8/(n + 2)
    = 8/n   ← Majorer : n + 2 ≥ n
  — Résous 8/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 8/ε   ← 8/n ≤ ε dès que n ≥ 8/ε
    (Pour tout n ≥ N(ε) = 8/ε, |aₙ + 5| ≤ 8/n ≤ ε : lim aₙ = −5.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 5| = 8/(n + 2) ≤ 8/n ≤ ε dès que n ≥ ▢ | 8/(n + 2) ≤ 8/n ≤ ε dès que n ≥ 8/ε : N(ε) = 8/ε
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −5 pour aₙ = (−5n − 7)/(n + 1) : simplifie |aₙ + 5|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 5| ≤ ε pour tout n ≥ N(ε).
  [tap, suivre l'erreur, menu steps]  |(−5n − 7)/(n + 1) + 5|
    = |−5n − 7 + 5(n + 1)|/(n + 1)   ← Réduire au même dénominateur
    = 2/(n + 1)   ← Simplifier : il reste une constante en haut
  — Majore 2/(n + 1) par une expression simple c/n :  [juge equiv]  départ : 2/(n + 1)
    = 2/n   ← Majorer : n + 1 ≥ n
  — Résous 2/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 2/ε   ← 2/n ≤ ε dès que n ≥ 2/ε
    (Pour tout n ≥ N(ε) = 2/ε, |aₙ + 5| ≤ 2/n ≤ ε : lim aₙ = −5.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 5| = 2/(n + 1) ≤ 2/n ≤ ε dès que n ≥ ▢ | 2/(n + 1) ≤ 2/n ≤ ε dès que n ≥ 2/ε : N(ε) = 2/ε
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = 4 pour aₙ = (4n + 4)/(n + 2) : simplifie |aₙ − 4|, majore-le par c/n, puis donne N(ε) tel que |aₙ − 4| ≤ ε pour tout n ≥ N(ε).
  [tap, suivre l'erreur, menu steps]  |(4n + 4)/(n + 2) − 4|
    = |4n + 4 − 4(n + 2)|/(n + 2)   ← Réduire au même dénominateur
    = 4/(n + 2)   ← Simplifier : il reste une constante en haut
  — Majore 4/(n + 2) par une expression simple c/n :  [juge equiv]  départ : 4/(n + 2)
    = 4/n   ← Majorer : n + 2 ≥ n
  — Résous 4/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 4/ε   ← 4/n ≤ ε dès que n ≥ 4/ε
    (Pour tout n ≥ N(ε) = 4/ε, |aₙ − 4| ≤ 4/n ≤ ε : lim aₙ = 4.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ − 4| = 4/(n + 2) ≤ 4/n ≤ ε dès que n ≥ ▢ | 4/(n + 2) ≤ 4/n ≤ ε dès que n ≥ 4/ε : N(ε) = 4/ε
  pièges : g1_triangle_reverse

```

### Niveau 4

```
Montre par la définition que lim aₙ = −2 pour aₙ = (−2n − 2)/(n + 4) : simplifie |aₙ + 2|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 2| ≤ ε pour tout n ≥ N(ε).
  [free, suivre l'erreur]  |(−2n − 2)/(n + 4) + 2|
    = |−2n − 2 + 2(n + 4)|/(n + 4)   ← Réduire au même dénominateur
    = 6/(n + 4)   ← Simplifier : il reste une constante en haut
  — Majore 6/(n + 4) par une expression simple c/n :  [juge equiv]  départ : 6/(n + 4)
    = 6/n   ← Majorer : n + 4 ≥ n
  — Résous 6/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 6/ε   ← 6/n ≤ ε dès que n ≥ 6/ε
    (Pour tout n ≥ N(ε) = 6/ε, |aₙ + 2| ≤ 6/n ≤ ε : lim aₙ = −2.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 2| = 6/(n + 4) ≤ 6/n ≤ ε dès que n ≥ ▢ | 6/(n + 4) ≤ 6/n ≤ ε dès que n ≥ 6/ε : N(ε) = 6/ε
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −2 pour aₙ = (−2n + 1)/(n + 4) : simplifie |aₙ + 2|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 2| ≤ ε pour tout n ≥ N(ε).
  [free, suivre l'erreur]  |(−2n + 1)/(n + 4) + 2|
    = |−2n + 1 + 2(n + 4)|/(n + 4)   ← Réduire au même dénominateur
    = 9/(n + 4)   ← Simplifier : il reste une constante en haut
  — Majore 9/(n + 4) par une expression simple c/n :  [juge equiv]  départ : 9/(n + 4)
    = 9/n   ← Majorer : n + 4 ≥ n
  — Résous 9/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 9/ε   ← 9/n ≤ ε dès que n ≥ 9/ε
    (Pour tout n ≥ N(ε) = 9/ε, |aₙ + 2| ≤ 9/n ≤ ε : lim aₙ = −2.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 2| = 9/(n + 4) ≤ 9/n ≤ ε dès que n ≥ ▢ | 9/(n + 4) ≤ 9/n ≤ ε dès que n ≥ 9/ε : N(ε) = 9/ε
  pièges : g1_triangle_reverse

Montre par la définition que lim aₙ = −2 pour aₙ = (−2n − 6)/(n + 4) : simplifie |aₙ + 2|, majore-le par c/n, puis donne N(ε) tel que |aₙ + 2| ≤ ε pour tout n ≥ N(ε).
  [free, suivre l'erreur]  |(−2n − 6)/(n + 4) + 2|
    = |−2n − 6 + 2(n + 4)|/(n + 4)   ← Réduire au même dénominateur
    = 2/(n + 4)   ← Simplifier : il reste une constante en haut
  — Majore 2/(n + 4) par une expression simple c/n :  [juge equiv]  départ : 2/(n + 4)
    = 2/n   ← Majorer : n + 4 ≥ n
  — Résous 2/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
    = 2/ε   ← 2/n ≤ ε dès que n ≥ 2/ε
    (Pour tout n ≥ N(ε) = 2/ε, |aₙ + 2| ≤ 2/n ≤ ε : lim aₙ = −2.)
  aides : Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ». | |aₙ + 2| = 2/(n + 4) ≤ 2/n ≤ ε dès que n ≥ ▢ | 2/(n + 4) ≤ 2/n ≤ ε dès que n ≥ 2/ε : N(ε) = 2/ε
  pièges : g1_triangle_reverse

```

### Niveau 5

```
Définition, puis preuve par la définition.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Première partie : donne la définition de lim aₙ = L.
    [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · n ≥ N · |a_n − L| ≤ ε · ε ≥ 0 · M > 0 · a_n ≥ M · |a_n| ≤ ε
      → ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |a_n − L| ≤ ε
  partie 2 (Preuve : 1 ; Majore 5/(n + 3) par une expression simple c/n : 1 ; Résous 5/n ≤ ε en n : choisis N(ε). : 1)
  Deuxième partie : prouve par la définition que lim aₙ = 2 pour aₙ = (2n + 11)/(n + 3) : simplifie |aₙ − 2|, majore-le par c/n, puis donne N(ε) tel que |aₙ − 2| ≤ ε pour tout n ≥ N(ε).
    [free, sans aide, suivre l'erreur]  |(2n + 11)/(n + 3) − 2|
      = |2n + 11 − 2(n + 3)|/(n + 3)   ← Réduire au même dénominateur
      = 5/(n + 3)   ← Simplifier : il reste une constante en haut
    — Majore 5/(n + 3) par une expression simple c/n :  [juge equiv]  départ : 5/(n + 3)
      = 5/n   ← Majorer : n + 3 ≥ n
    — Résous 5/n ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
      = 5/ε   ← 5/n ≤ ε dès que n ≥ 5/ε
      (Pour tout n ≥ N(ε) = 5/ε, |aₙ − 2| ≤ 5/n ≤ ε : lim aₙ = 2.)
  pièges : g9_quant_order, g1_triangle_reverse

Définition, puis preuve par la définition.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Première partie : donne la définition de lim aₙ = L.
    [jetons, sans aide] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≤ −M · ε > 0 · a_n ≥ M · a_n ≤ M
      → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≤ −M
  partie 2 (Preuve : 1 ; Majore 14/(n² + 2) par une expression simple c/n² : 1 ; Résous 14/n² ≤ ε en n : choisis N(ε). : 1)
  Deuxième partie : prouve par la définition que lim aₙ = 3 pour aₙ = (3n² − 8)/(n² + 2) : simplifie |aₙ − 3|, majore-le par c/n², puis donne N(ε) tel que |aₙ − 3| ≤ ε pour tout n ≥ N(ε).
    [free, sans aide, suivre l'erreur]  |(3n² − 8)/(n² + 2) − 3|
      = |3n² − 8 − 3(n² + 2)|/(n² + 2)   ← Réduire au même dénominateur
      = 14/(n² + 2)   ← Simplifier
    — Majore 14/(n² + 2) par une expression simple c/n² :  [juge equiv]  départ : 14/(n² + 2)
      = 14/n²   ← Majorer : n² + 2 ≥ n²
    — Résous 14/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
      = √(14/ε)   ← 14/n² ≤ ε dès que n ≥ √(14/ε)
      (Pour tout n ≥ N(ε) = √(14/ε), |aₙ − 3| ≤ 14/n² ≤ ε : lim aₙ = 3.)
  pièges : g9_quant_order, g1_triangle_reverse

Définition, puis preuve par la définition.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Première partie : donne la définition de lim aₙ = L.
    [jetons, sans aide] palette : M > 0 · N ∈ ℕ · n ≥ N · a_n ≥ M · ε > 0 · a_n ≤ M · |a_n − L| ≤ ε
      → ∀M > 0 ∃N ∈ ℕ ∀n ≥ N, a_n ≥ M
  partie 2 (Preuve : 1 ; Majore 3/(n² + 3) par une expression simple c/n² : 1 ; Résous 3/n² ≤ ε en n : choisis N(ε). : 1)
  Deuxième partie : prouve par la définition que lim aₙ = −1 pour aₙ = (−n² − 6)/(n² + 3) : simplifie |aₙ + 1|, majore-le par c/n², puis donne N(ε) tel que |aₙ + 1| ≤ ε pour tout n ≥ N(ε).
    [free, sans aide, suivre l'erreur]  |(−n² − 6)/(n² + 3) + 1|
      = |−n² − 6 + (n² + 3)|/(n² + 3)   ← Réduire au même dénominateur
      = 3/(n² + 3)   ← Simplifier
    — Majore 3/(n² + 3) par une expression simple c/n² :  [juge equiv]  départ : 3/(n² + 3)
      = 3/n²   ← Majorer : n² + 3 ≥ n²
    — Résous 3/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
      = √(3/ε)   ← 3/n² ≤ ε dès que n ≥ √(3/ε)
      (Pour tout n ≥ N(ε) = √(3/ε), |aₙ + 1| ≤ 3/n² ≤ ε : lim aₙ = −1.)
  pièges : g9_quant_order, g1_triangle_reverse

```

### Variantes d'examen

```
Montre par la définition que lim aₙ = 2 pour aₙ = (2n² + 6)/(n² + 5) : simplifie |aₙ − 2|, majore-le par c/n², puis donne N(ε) tel que |aₙ − 2| ≤ ε pour tout n ≥ N(ε).
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Majore 4/(n² + 5) par une expression simple c/n² : 1 ; Résous 4/n² ≤ ε en n : choisis N(ε). : 1)
    [free, sans aide, suivre l'erreur]  |(2n² + 6)/(n² + 5) − 2|
      = |2n² + 6 − 2(n² + 5)|/(n² + 5)   ← Réduire au même dénominateur
      = 4/(n² + 5)   ← Simplifier
    — Majore 4/(n² + 5) par une expression simple c/n² :  [juge equiv]  départ : 4/(n² + 5)
      = 4/n²   ← Majorer : n² + 5 ≥ n²
    — Résous 4/n² ≤ ε en n : choisis N(ε).  [juge delta]  départ : N
      = √(4/ε)   ← 4/n² ≤ ε dès que n ≥ √(4/ε)
      (Pour tout n ≥ N(ε) = √(4/ε), |aₙ − 2| ≤ 4/n² ≤ ε : lim aₙ = 2.)
  pièges : g1_triangle_reverse

Vrai ou faux ? « Une suite convergente n'atteint jamais sa limite. »
  · Vrai [a1_limit_never_reached]   ✔ Faux
  [examen tf]
  pièges : a1_limit_never_reached

```

## Limites de suites : opérations et formes indéterminées (`a1-seq-limits`, BA1)

_Terme dominant, quantité conjuguée, croissances comparées._

### Niveau 1

```
Calcule la limite de la suite aₙ = √(n² − 2n + 3) − n.
  [guided]  √(n² − 2n + 3) − n
    (∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée √(…) + n.)
    = (n² − 2n + 3 − n²)/(√(n² − 2n + 3) + n)   ← Multiplier et diviser par la quantité conjuguée √(…) + n
    = (□)/(√(n² − 2n + 3) + n)   (trous : (−2n + 3)/(√(n² − 2n + 3) + n))   ← Simplifier : (√A)² − n² = A − n²
    = (−2 + 3/n)/(√(1 − 2/n + 3/n²) + 1)   ← Diviser en haut et en bas par n
    = −1   ← √(…) → 1 : la limite vaut −2/2
  aides : ∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée √(…) + n. | = (n² − 2n + 3 − n²)/(√(n² − 2n + 3) + n) | (−2 + 3/n)/(√(1 − 2/n + 3/n²) + 1) → −1
  pièges : g6_infinity_minus_infinity, a1_sqrt_sum_split

Calcule la limite de la suite aₙ = (8n + 6)/(2n + 4).
  [guided]  (8n + 6)/(2n + 4)
    (∞/∞ : divise en haut et en bas par n, la plus grande puissance du dénominateur.)
    = (8 + 6/n)/(□ + 4/n)   (trous : (8 + 6/n)/(2 + 4/n))   ← Diviser en haut et en bas par n
    = 4   ← Les termes en 1/n tendent vers 0
  aides : ∞/∞ : divise en haut et en bas par n, la plus grande puissance du dénominateur. | = (8 + 6/n)/(2 + 4/n) | (8 + 6/n)/(2 + 4/n) → 4
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Calcule la limite de la suite aₙ = (−2n − 3)/(7n + 5).
  [guided]  (−2n − 3)/(7n + 5)
    (∞/∞ : divise en haut et en bas par n, la plus grande puissance du dénominateur.)
    = (−2 − 3/n)/(□ + 5/n)   (trous : (−2 − 3/n)/(7 + 5/n))   ← Diviser en haut et en bas par n
    = −2/7   ← Les termes en 1/n tendent vers 0
  aides : ∞/∞ : divise en haut et en bas par n, la plus grande puissance du dénominateur. | = (−2 − 3/n)/(7 + 5/n) | (−2 − 3/n)/(7 + 5/n) → −2/7
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

```

### Niveau 2

```
Calcule la limite de la suite aₙ = √(n² + 4n) − n.
  [guided]  √(n² + 4n) − n
    ? Quelle transformation ? ✔ Multiplier et diviser par la quantité conjuguée √(…) + n / · Mettre n en facteur : n·(√(1 + …) − 1)
    = (n² + 4n − n²)/(√(n² + 4n) + n)   ← Multiplier et diviser par la quantité conjuguée √(…) + n
    = 4n/(√(n² + 4n) + n)   ← Simplifier : (√A)² − n² = A − n²
    = 4/(√(1 + 4/n) + 1)   ← Diviser en haut et en bas par n
    = 2   ← √(…) → 1 : la limite vaut 4/2
  aides : ∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée √(…) + n. | = (n² + 4n − n²)/(√(n² + 4n) + n) | 4/(√(1 + 4/n) + 1) → 2
  pièges : g6_infinity_minus_infinity, a1_sqrt_sum_split

Calcule la limite de la suite aₙ = (√(n + 6) − √n)·√(n + 3).
  [guided]  (√(n + 6) − √n)·√(n + 3)
    ? Quelle transformation ? ✔ Multiplier et diviser par √(n + a) + √n / · √(n + a) − √n → 0, donc le produit tend vers 0
    = 6√(n + 3)/(√(n + 6) + √n)   ← Quantité conjuguée : (n + 6) − n = 6
    = 6√(1 + 3/n)/(√(1 + 6/n) + 1)   ← Diviser en haut et en bas par √n
    = 3   ← Les racines tendent vers 1
  aides : ∞ − ∞ avec des racines : multiplie et divise √(n + a) − √n par √(n + a) + √n. | = 6√(n + 3)/(√(n + 6) + √n) | 6√(1 + 3/n)/(√(1 + 6/n) + 1) → 3
  pièges : a1_sqrt_sum_split, a1_indet_inf_minus_inf

Calcule la limite de la suite aₙ = (2n² − 1)/(7n³ − 5).
  [guided]  (2n² − 1)/(7n³ − 5)
    ? Quelle transformation ? ✔ Diviser en haut et en bas par n³ / · Multiplier par la quantité conjuguée
    = (2/n − 1/n³)/(7 − 5/n³)   ← Diviser en haut et en bas par n³
    = 0   ← Le numérateur tend vers 0, le dénominateur vers 7
  aides : ∞/∞ : divise en haut et en bas par n³, la plus grande puissance du dénominateur. | = (2/n − 1/n³)/(7 − 5/n³) | (2/n − 1/n³)/(7 − 5/n³) → 0
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

```

### Niveau 3

```
Calcule la limite de la suite aₙ = n^(1/n).
  [tap, suivre l'erreur, menu steps]  n^(1/n)
    = e^(ln(n)/n)   ← uᵛ = e^(v·ln u)
    = 1   ← Croissances comparées : ln(n)/n → 0, et e⁰ = 1
  aides : Une puissance variable : écris uᵛ = e^(v·ln u), puis cherche la limite de l'exposant. | = e^(ln(n)/n) | e^(ln(n)/n) → 1

Calcule la limite de la suite aₙ = 6n²/(3n³ + 7n).
  [tap, suivre l'erreur, menu steps]  6n²/(3n³ + 7n)
    = (6/n)/(3 + 7/n²)   ← Diviser en haut et en bas par n³
    = 0   ← Le numérateur tend vers 0, le dénominateur vers 3
  aides : ∞/∞ : divise en haut et en bas par n³, la plus grande puissance du dénominateur. | = (6/n)/(3 + 7/n²) | (6/n)/(3 + 7/n²) → 0

Calcule la limite de la suite aₙ = (√(n + 2) − √n)·√(n + 2).
  [tap, suivre l'erreur, menu steps]  (√(n + 2) − √n)·√(n + 2)
    = 2√(n + 2)/(√(n + 2) + √n)   ← Quantité conjuguée : (n + 2) − n = 2
    = 2√(1 + 2/n)/(√(1 + 2/n) + 1)   ← Diviser en haut et en bas par √n
    = 1   ← Les racines tendent vers 1
  aides : ∞ − ∞ avec des racines : multiplie et divise √(n + a) − √n par √(n + a) + √n. | = 2√(n + 2)/(√(n + 2) + √n) | 2√(1 + 2/n)/(√(1 + 2/n) + 1) → 1
  pièges : a1_sqrt_sum_split

```

### Niveau 4

```
Calcule la limite de la suite aₙ = (−2n + ln(n))/(5n + 6).
  [free, suivre l'erreur]  (−2n + ln(n))/(5n + 6)
    = (−2 + ln(n)/n)/(5 + 6/n)   ← Diviser en haut et en bas par n
    = −2/5   ← Croissances comparées : ln(n)/n → 0
  aides : ln n est négligeable devant n : divise en haut et en bas par n. | = (−2 + ln(n)/n)/(5 + 6/n) | (−2 + ln(n)/n)/(5 + 6/n) → −2/5
  pièges : a1_bh_quotient_rule

Calcule la limite de la suite aₙ = √(n² + 6n + 7) − n.
  [free, suivre l'erreur]  √(n² + 6n + 7) − n
    = (n² + 6n + 7 − n²)/(√(n² + 6n + 7) + n)   ← Multiplier et diviser par la quantité conjuguée √(…) + n
    = (6n + 7)/(√(n² + 6n + 7) + n)   ← Simplifier : (√A)² − n² = A − n²
    = (6 + 7/n)/(√(1 + 6/n + 7/n²) + 1)   ← Diviser en haut et en bas par n
    = 3   ← √(…) → 1 : la limite vaut 6/2
  aides : ∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée √(…) + n. | = (n² + 6n + 7 − n²)/(√(n² + 6n + 7) + n) | (6 + 7/n)/(√(1 + 6/n + 7/n²) + 1) → 3
  pièges : g6_infinity_minus_infinity, a1_sqrt_sum_split

Calcule la limite de la suite aₙ = (√(n + 6) − √n)·√(n + 4).
  [free, suivre l'erreur]  (√(n + 6) − √n)·√(n + 4)
    = 6√(n + 4)/(√(n + 6) + √n)   ← Quantité conjuguée : (n + 6) − n = 6
    = 6√(1 + 4/n)/(√(1 + 6/n) + 1)   ← Diviser en haut et en bas par √n
    = 3   ← Les racines tendent vers 1
  aides : ∞ − ∞ avec des racines : multiplie et divise √(n + a) − √n par √(n + a) + √n. | = 6√(n + 4)/(√(n + 6) + √n) | 6√(1 + 4/n)/(√(1 + 6/n) + 1) → 3
  pièges : a1_sqrt_sum_split

```

### Niveau 5

```
limn→+∞ (9n² − 5n)/(8n − 5) =
  · 0   · 8/9   · 1   ✔ +∞

Calcule la limite de la suite aₙ = (−6n + 6)/(4n³ − 1).
  [free, sans aide]  (−6n + 6)/(4n³ − 1)
    = (−6/n² + 6/n³)/(4 − 1/n³)   ← Diviser en haut et en bas par n³
    = 0   ← Le numérateur tend vers 0, le dénominateur vers 4
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

limn→+∞ n^(1/n) =
  · e   · +∞   · 0   ✔ 1

```

### Variantes d'examen

```
limn→+∞ root(3,n³+3n²+8) − n =
  · 3   · 3/2   ✔ 1   · 0 [a1_indet_inf_minus_inf]
  [examen mcq]
  pièges : a1_indet_inf_minus_inf

Vrai ou faux ?
  « Si (aₙ) converge et (bₙ) est bornée, alors (aₙbₙ) converge. » → FAUX
    contre-exemple (sequence) : a = 1, b = (-1)^n
  [examen tf]

```

## Gendarmes : trouver les deux bornes (`a1-seq-squeeze`, BA1)

_Minorer et majorer par deux suites de même limite._

### Niveau 1

```
Calcule la limite de aₙ = ln(e^(3n) + n²)/(n + 5) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  ln(e^(3n) + n²)/(n + 5)
    (Minorant donné : (3n)/(n + 5) ≤ aₙ pour tout n ≥ 1.)
    = ln(2e^(3n))/(n + 5)   ← n² ≤ e^(3n) pour n ≥ 1
    = (3n + □)/(n + 5)   (trous : (3n + ln(2))/(n + 5))   ← Log(2e^(3n)) = 3n + Log 2
  — Limite du minorant :  [juge limit]  départ : (3n)/(n + 5)
    = 3/(1 + □)   (trous : 3/(1 + 5/n))   ← Diviser par n
    = 3   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (3n + ln(2))/(n + 5)
    = (3 + ln(2)/n)/(1 + □)   (trous : (3 + ln(2)/n)/(1 + 5/n))   ← Diviser par n
    = 3   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    ? Que conclure pour aₙ ? ✔ aₙ est coincée entre deux suites qui tendent toutes deux vers 3 / · aₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · aₙ est bornée, donc elle converge
    = 3   ← Gendarmes
  aides : Coince ce qui est dans le Log : e^(3n) ≤ e^(3n) + n² ≤ 2e^(3n), puis Log est croissant. | ln(e^(3n))/(n + 5) ≤ aₙ ≤ ln(□·e^(3n))/(n + 5) | (3n)/(n + 5) ≤ aₙ ≤ (3n + ln(2))/(n + 5) : les deux bornes tendent vers 3.
  pièges : g2_log_sum, a1_squeeze_wrong_direction, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de aₙ = (2n + 5cos(n))/(4n − 1) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  (2n + 5cos(n))/(4n − 1)
    (Minorant donné : (2n − 5)/(4n − 1) ≤ aₙ pour tout n ≥ 1.)
    = (□)/(4n − 1)   (trous : (2n + 5)/(4n − 1))   ← cos n ≤ 1
  — Limite du minorant :  [juge limit]  départ : (2n − 5)/(4n − 1)
    = (2 − □)/(4 − 1/n)   (trous : (2 − 5/n)/(4 − 1/n))   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n + 5)/(4n − 1)
    = (2 + □)/(4 − 1/n)   (trous : (2 + 5/n)/(4 − 1/n))   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    ? Que conclure pour aₙ ? ✔ aₙ est coincée entre deux suites qui tendent toutes deux vers 1/2 / · aₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · aₙ est bornée, donc elle converge
    = 1/2   ← Gendarmes
  aides : −1 ≤ cos n ≤ 1, et le dénominateur est positif : remplace cos n par −1, puis par 1. | (2n − □)/(4n − 1) ≤ aₙ ≤ (2n + □)/(4n − 1) | (2n − 5)/(4n − 1) ≤ aₙ ≤ (2n + 5)/(4n − 1) : les deux bornes tendent vers 1/2.
  pièges : a1_squeeze_wrong_direction, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de Sₙ = Σ_{k=1}^{n} (5n)/(2n² + k) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  Σ_{k=1}^{n} (5n)/(2n² + k)
    (Minorant donné : (5n²)/(2n² + n) ≤ Sₙ pour tout n ≥ 1.)
    = Σ_{k=1}^{n} (5n)/(2n² + 1)   ← Chaque terme est au plus le plus grand (k = 1)
    = (5n²)/(□)   (trous : (5n²)/(2n² + 1))   ← Il y a n termes égaux
  — Limite du minorant :  [juge limit]  départ : (5n²)/(2n² + n)
    = 5/(2 + □)   (trous : 5/(2 + 1/n))   ← Diviser par n²
    = 5/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (5n²)/(2n² + 1)
    = 5/(2 + □)   (trous : 5/(2 + 1/n²))   ← Diviser par n²
    = 5/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} S_n
    ? Que conclure pour Sₙ ? ✔ Sₙ est coincée entre deux suites qui tendent toutes deux vers 5/2 / · Sₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · Sₙ est bornée, donc elle converge
    = 5/2   ← Gendarmes
  aides : Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes. | n·(5n)/(2n² + □) ≤ Sₙ ≤ n·(5n)/(2n² + □) | (5n²)/(2n² + n) ≤ Sₙ ≤ (5n²)/(2n² + 1), et les deux bornes tendent vers 5/2.
  pièges : g5_reindex_half, a1_squeeze_wrong_direction, a1_sum_n_terms_as_one, a1_squeeze_different_limits, a1_bounded_implies_convergent

```

### Niveau 2

```
Calcule la limite de aₙ = ln(e^(4n) + n³)/(4n + 3) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  ln(e^(4n) + n³)/(4n + 3)
    ? Pour minorer <math alttext="ln(e^(4n) + n³)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup><mo>+</mo><msup><mrow><mi>n</mi></mrow><mn>3</mn></msup></mrow><mo stretchy="false">)</mo></mrow></mrow></math> : ✔ <math alttext="ln(e^(4n))"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup><mo stretchy="false">)</mo></mrow></mrow></math>, en retirant <math alttext="n³"><msup><mrow><mi>n</mi></mrow><mn>3</mn></msup></math> ≥ 0 / · <math alttext="ln(2e^(4n))"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, car <math alttext="n³"><msup><mrow><mi>n</mi></mrow><mn>3</mn></msup></math> ≤ <math alttext="e^(4n)"><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup></math>
    = ln(e^(4n))/(4n + 3)   ← Log est croissant et n³ ≥ 0
    = (□)/(4n + 3)   (trous : (4n)/(4n + 3))   ← Log(e^(4n)) = 4n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(4n) + n³)/(4n + 3)
    = ln(2e^(4n))/(4n + 3)   ← n³ ≤ e^(4n) pour n ≥ 1
    = (4n + □)/(4n + 3)   (trous : (4n + ln(2))/(4n + 3))   ← Log(2e^(4n)) = 4n + Log 2
  — Limite du minorant :  [juge limit]  départ : (4n)/(4n + 3)
    = 4/(4 + 3/n)   ← Diviser par n
    = 1   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (4n + ln(2))/(4n + 3)
    = (4 + ln(2)/n)/(4 + 3/n)   ← Diviser par n
    = 1   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    ? Que conclure pour aₙ ? ✔ aₙ est coincée entre deux suites qui tendent toutes deux vers 1 / · aₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · aₙ est bornée, donc elle converge
    = 1   ← Gendarmes
  aides : Coince ce qui est dans le Log : e^(4n) ≤ e^(4n) + n³ ≤ 2e^(4n), puis Log est croissant. | ln(e^(4n))/(4n + 3) ≤ aₙ ≤ ln(□·e^(4n))/(4n + 3) | (4n)/(4n + 3) ≤ aₙ ≤ (4n + ln(2))/(4n + 3) : les deux bornes tendent vers 1.
  pièges : g2_log_sum, a1_squeeze_wrong_direction, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de Sₙ = Σ_{k=1}^{n} (5n)/(3n² + k) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  Σ_{k=1}^{n} (5n)/(3n² + k)
    ? Pour minorer Sₙ, on remplace chaque terme par : ✔ le plus petit, <math alttext="(5n)/(3n² + n)"><mfrac><mrow><mn>5</mn><mo>&#x2062;</mo><mi>n</mi></mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>n</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mi>n</mi></mrow></mfrac></math> (k = n) / · le plus grand, <math alttext="(5n)/(3n² + 1)"><mfrac><mrow><mn>5</mn><mo>&#x2062;</mo><mi>n</mi></mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>n</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mn>1</mn></mrow></mfrac></math> (k = 1)
    = Σ_{k=1}^{n} (5n)/(3n² + n)   ← Chaque terme est au moins le plus petit (k = n)
    = (5n²)/(□)   (trous : (5n²)/(3n² + n))   ← Il y a n termes égaux
  — Majore Sₙ :  [juge equiv]  départ : Σ_{k=1}^{n} (5n)/(3n² + k)
    = Σ_{k=1}^{n} (5n)/(3n² + 1)   ← Chaque terme est au plus le plus grand (k = 1)
    = (5n²)/(□)   (trous : (5n²)/(3n² + 1))   ← Il y a n termes égaux
  — Limite du minorant :  [juge limit]  départ : (5n²)/(3n² + n)
    = 5/(3 + 1/n)   ← Diviser par n²
    = 5/3   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (5n²)/(3n² + 1)
    = 5/(3 + 1/n²)   ← Diviser par n²
    = 5/3   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} S_n
    ? Que conclure pour Sₙ ? ✔ Sₙ est coincée entre deux suites qui tendent toutes deux vers 5/3 / · Sₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · Sₙ est bornée, donc elle converge
    = 5/3   ← Gendarmes
  aides : Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes. | n·(5n)/(3n² + □) ≤ Sₙ ≤ n·(5n)/(3n² + □) | (5n²)/(3n² + n) ≤ Sₙ ≤ (5n²)/(3n² + 1), et les deux bornes tendent vers 5/3.
  pièges : g5_reindex_half, a1_squeeze_wrong_direction, a1_sum_n_terms_as_one, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de aₙ = ln(e^(3n) + n²)/(n + 5) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [guided]  ln(e^(3n) + n²)/(n + 5)
    ? Pour minorer <math alttext="ln(e^(3n) + n²)"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup><mo>+</mo><msup><mrow><mi>n</mi></mrow><mn>2</mn></msup></mrow><mo stretchy="false">)</mo></mrow></mrow></math> : ✔ <math alttext="ln(e^(3n))"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup><mo stretchy="false">)</mo></mrow></mrow></math>, en retirant <math alttext="n²"><msup><mrow><mi>n</mi></mrow><mn>2</mn></msup></math> ≥ 0 / · <math alttext="ln(2e^(3n))"><mrow><mi>ln</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, car <math alttext="n²"><msup><mrow><mi>n</mi></mrow><mn>2</mn></msup></math> ≤ <math alttext="e^(3n)"><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>n</mi></mrow></msup></math>
    = ln(e^(3n))/(n + 5)   ← Log est croissant et n² ≥ 0
    = (□)/(n + 5)   (trous : (3n)/(n + 5))   ← Log(e^(3n)) = 3n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(3n) + n²)/(n + 5)
    = ln(2e^(3n))/(n + 5)   ← n² ≤ e^(3n) pour n ≥ 1
    = (3n + □)/(n + 5)   (trous : (3n + ln(2))/(n + 5))   ← Log(2e^(3n)) = 3n + Log 2
  — Limite du minorant :  [juge limit]  départ : (3n)/(n + 5)
    = 3/(1 + 5/n)   ← Diviser par n
    = 3   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (3n + ln(2))/(n + 5)
    = (3 + ln(2)/n)/(1 + 5/n)   ← Diviser par n
    = 3   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    ? Que conclure pour aₙ ? ✔ aₙ est coincée entre deux suites qui tendent toutes deux vers 3 / · aₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · aₙ est bornée, donc elle converge
    = 3   ← Gendarmes
  aides : Coince ce qui est dans le Log : e^(3n) ≤ e^(3n) + n² ≤ 2e^(3n), puis Log est croissant. | ln(e^(3n))/(n + 5) ≤ aₙ ≤ ln(□·e^(3n))/(n + 5) | (3n)/(n + 5) ≤ aₙ ≤ (3n + ln(2))/(n + 5) : les deux bornes tendent vers 3.
  pièges : g2_log_sum, a1_squeeze_wrong_direction, a1_squeeze_different_limits, a1_bounded_implies_convergent

```

### Niveau 3

```
Calcule la limite de Sₙ = Σ_{k=1}^{n} (4n)/(2n² + k) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [tap, suivre l'erreur, menu steps]  Σ_{k=1}^{n} (4n)/(2n² + k)
    = Σ_{k=1}^{n} (4n)/(2n² + n)   ← Chaque terme est au moins le plus petit (k = n)
    = (4n²)/(2n² + n)   ← Il y a n termes égaux
  — Majore Sₙ :  [juge equiv]  départ : Σ_{k=1}^{n} (4n)/(2n² + k)
    = Σ_{k=1}^{n} (4n)/(2n² + 1)   ← Chaque terme est au plus le plus grand (k = 1)
    = (4n²)/(2n² + 1)   ← Il y a n termes égaux
  — Limite du minorant :  [juge limit]  départ : (4n²)/(2n² + n)
    = 4/(2 + 1/n)   ← Diviser par n²
    = 2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (4n²)/(2n² + 1)
    = 4/(2 + 1/n²)   ← Diviser par n²
    = 2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} S_n
    ? Que conclure pour Sₙ ? ✔ Sₙ est coincée entre deux suites qui tendent toutes deux vers 2 / · Sₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · Sₙ est bornée, donc elle converge
    = 2   ← Gendarmes
  aides : Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes. | n·(4n)/(2n² + □) ≤ Sₙ ≤ n·(4n)/(2n² + □) | (4n²)/(2n² + n) ≤ Sₙ ≤ (4n²)/(2n² + 1), et les deux bornes tendent vers 2.
  pièges : g5_reindex_half, a1_squeeze_wrong_direction, a1_sum_n_terms_as_one, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de Sₙ = Σ_{k=1}^{n} (2n)/(n² + k) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [tap, suivre l'erreur, menu steps]  Σ_{k=1}^{n} (2n)/(n² + k)
    = Σ_{k=1}^{n} (2n)/(n² + n)   ← Chaque terme est au moins le plus petit (k = n)
    = (2n²)/(n² + n)   ← Il y a n termes égaux
  — Majore Sₙ :  [juge equiv]  départ : Σ_{k=1}^{n} (2n)/(n² + k)
    = Σ_{k=1}^{n} (2n)/(n² + 1)   ← Chaque terme est au plus le plus grand (k = 1)
    = (2n²)/(n² + 1)   ← Il y a n termes égaux
  — Limite du minorant :  [juge limit]  départ : (2n²)/(n² + n)
    = 2/(1 + 1/n)   ← Diviser par n²
    = 2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n²)/(n² + 1)
    = 2/(1 + 1/n²)   ← Diviser par n²
    = 2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} S_n
    ? Que conclure pour Sₙ ? ✔ Sₙ est coincée entre deux suites qui tendent toutes deux vers 2 / · Sₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · Sₙ est bornée, donc elle converge
    = 2   ← Gendarmes
  aides : Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes. | n·(2n)/(n² + □) ≤ Sₙ ≤ n·(2n)/(n² + □) | (2n²)/(n² + n) ≤ Sₙ ≤ (2n²)/(n² + 1), et les deux bornes tendent vers 2.
  pièges : g5_reindex_half, a1_squeeze_wrong_direction, a1_sum_n_terms_as_one, a1_squeeze_different_limits, a1_bounded_implies_convergent

Calcule la limite de aₙ = (3n + 5sin(n))/(2n − 1) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [tap, suivre l'erreur, menu steps]  (3n + 5sin(n))/(2n − 1)
    = (3n − 5)/(2n − 1)   ← sin n ≥ −1 (et 2n − 1 > 0)
  — Majore aₙ :  [juge equiv]  départ : (3n + 5sin(n))/(2n − 1)
    = (3n + 5)/(2n − 1)   ← sin n ≤ 1
  — Limite du minorant :  [juge limit]  départ : (3n − 5)/(2n − 1)
    = (3 − 5/n)/(2 − 1/n)   ← Diviser par n
    = 3/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (3n + 5)/(2n − 1)
    = (3 + 5/n)/(2 − 1/n)   ← Diviser par n
    = 3/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    ? Que conclure pour aₙ ? ✔ aₙ est coincée entre deux suites qui tendent toutes deux vers 3/2 / · aₙ est entre deux suites convergentes : elle converge, même si leurs limites diffèrent / · aₙ est bornée, donc elle converge
    = 3/2   ← Gendarmes
  aides : −1 ≤ sin n ≤ 1, et le dénominateur est positif : remplace sin n par −1, puis par 1. | (3n − □)/(2n − 1) ≤ aₙ ≤ (3n + □)/(2n − 1) | (3n − 5)/(2n − 1) ≤ aₙ ≤ (3n + 5)/(2n − 1) : les deux bornes tendent vers 3/2.
  pièges : a1_squeeze_wrong_direction, a1_squeeze_different_limits, a1_bounded_implies_convergent

```

### Niveau 4

```
Calcule la limite de aₙ = ln(e^(3n) + n²)/(2n + 4) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, suivre l'erreur]  ln(e^(3n) + n²)/(2n + 4)
    = ln(e^(3n))/(2n + 4)   ← Log est croissant et n² ≥ 0
    = (3n)/(2n + 4)   ← Log(e^(3n)) = 3n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(3n) + n²)/(2n + 4)
    = ln(2e^(3n))/(2n + 4)   ← n² ≤ e^(3n) pour n ≥ 1
    = (3n + ln(2))/(2n + 4)   ← Log(2e^(3n)) = 3n + Log 2
  — Limite du minorant :  [juge limit]  départ : (3n)/(2n + 4)
    = 3/(2 + 4/n)   ← Diviser par n
    = 3/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (3n + ln(2))/(2n + 4)
    = (3 + ln(2)/n)/(2 + 4/n)   ← Diviser par n
    = 3/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 3/2   ← Gendarmes
  aides : Coince ce qui est dans le Log : e^(3n) ≤ e^(3n) + n² ≤ 2e^(3n), puis Log est croissant. | ln(e^(3n))/(2n + 4) ≤ aₙ ≤ ln(□·e^(3n))/(2n + 4) | (3n)/(2n + 4) ≤ aₙ ≤ (3n + ln(2))/(2n + 4) : les deux bornes tendent vers 3/2.
  pièges : g2_log_sum, a1_squeeze_wrong_direction

Calcule la limite de aₙ = ln(e^(3n) + n)/(n + 2) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, suivre l'erreur]  ln(e^(3n) + n)/(n + 2)
    = ln(e^(3n))/(n + 2)   ← Log est croissant et n ≥ 0
    = (3n)/(n + 2)   ← Log(e^(3n)) = 3n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(3n) + n)/(n + 2)
    = ln(2e^(3n))/(n + 2)   ← n ≤ e^(3n) pour n ≥ 1
    = (3n + ln(2))/(n + 2)   ← Log(2e^(3n)) = 3n + Log 2
  — Limite du minorant :  [juge limit]  départ : (3n)/(n + 2)
    = 3/(1 + 2/n)   ← Diviser par n
    = 3   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (3n + ln(2))/(n + 2)
    = (3 + ln(2)/n)/(1 + 2/n)   ← Diviser par n
    = 3   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 3   ← Gendarmes
  aides : Coince ce qui est dans le Log : e^(3n) ≤ e^(3n) + n ≤ 2e^(3n), puis Log est croissant. | ln(e^(3n))/(n + 2) ≤ aₙ ≤ ln(□·e^(3n))/(n + 2) | (3n)/(n + 2) ≤ aₙ ≤ (3n + ln(2))/(n + 2) : les deux bornes tendent vers 3.
  pièges : g2_log_sum, a1_squeeze_wrong_direction

Calcule la limite de aₙ = (2n + 2cos(n))/(4n + 3) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, suivre l'erreur]  (2n + 2cos(n))/(4n + 3)
    = (2n − 2)/(4n + 3)   ← cos n ≥ −1 (et 4n + 3 > 0)
  — Majore aₙ :  [juge equiv]  départ : (2n + 2cos(n))/(4n + 3)
    = (2n + 2)/(4n + 3)   ← cos n ≤ 1
  — Limite du minorant :  [juge limit]  départ : (2n − 2)/(4n + 3)
    = (2 − 2/n)/(4 + 3/n)   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n + 2)/(4n + 3)
    = (2 + 2/n)/(4 + 3/n)   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 1/2   ← Gendarmes
  aides : −1 ≤ cos n ≤ 1, et le dénominateur est positif : remplace cos n par −1, puis par 1. | (2n − □)/(4n + 3) ≤ aₙ ≤ (2n + □)/(4n + 3) | (2n − 2)/(4n + 3) ≤ aₙ ≤ (2n + 2)/(4n + 3) : les deux bornes tendent vers 1/2.
  pièges : a1_squeeze_wrong_direction

```

### Niveau 5

```
Calcule la limite de aₙ = ln(e^(2n) + n²)/(3n + 4) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, sans aide]  ln(e^(2n) + n²)/(3n + 4)
    = ln(e^(2n))/(3n + 4)   ← Log est croissant et n² ≥ 0
    = (2n)/(3n + 4)   ← Log(e^(2n)) = 2n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(2n) + n²)/(3n + 4)
    = ln(2e^(2n))/(3n + 4)   ← n² ≤ e^(2n) pour n ≥ 1
    = (2n + ln(2))/(3n + 4)   ← Log(2e^(2n)) = 2n + Log 2
  — Limite du minorant :  [juge limit]  départ : (2n)/(3n + 4)
    = 2/(3 + 4/n)   ← Diviser par n
    = 2/3   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n + ln(2))/(3n + 4)
    = (2 + ln(2)/n)/(3 + 4/n)   ← Diviser par n
    = 2/3   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 2/3   ← Gendarmes
  pièges : g2_log_sum, a1_squeeze_wrong_direction

Calcule la limite de aₙ = ln(e^(2n) + n)/(n + 3) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, sans aide]  ln(e^(2n) + n)/(n + 3)
    = ln(e^(2n))/(n + 3)   ← Log est croissant et n ≥ 0
    = (2n)/(n + 3)   ← Log(e^(2n)) = 2n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(2n) + n)/(n + 3)
    = ln(2e^(2n))/(n + 3)   ← n ≤ e^(2n) pour n ≥ 1
    = (2n + ln(2))/(n + 3)   ← Log(2e^(2n)) = 2n + Log 2
  — Limite du minorant :  [juge limit]  départ : (2n)/(n + 3)
    = 2/(1 + 3/n)   ← Diviser par n
    = 2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n + ln(2))/(n + 3)
    = (2 + ln(2)/n)/(1 + 3/n)   ← Diviser par n
    = 2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 2   ← Gendarmes
  pièges : g2_log_sum, a1_squeeze_wrong_direction

Calcule la limite de aₙ = ln(e^(2n) + n)/(4n + 5) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [free, sans aide]  ln(e^(2n) + n)/(4n + 5)
    = ln(e^(2n))/(4n + 5)   ← Log est croissant et n ≥ 0
    = (2n)/(4n + 5)   ← Log(e^(2n)) = 2n
  — Majore aₙ :  [juge equiv]  départ : ln(e^(2n) + n)/(4n + 5)
    = ln(2e^(2n))/(4n + 5)   ← n ≤ e^(2n) pour n ≥ 1
    = (2n + ln(2))/(4n + 5)   ← Log(2e^(2n)) = 2n + Log 2
  — Limite du minorant :  [juge limit]  départ : (2n)/(4n + 5)
    = 2/(4 + 5/n)   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Limite du majorant :  [juge limit]  départ : (2n + ln(2))/(4n + 5)
    = (2 + ln(2)/n)/(4 + 5/n)   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
    = 1/2   ← Gendarmes
  pièges : g2_log_sum, a1_squeeze_wrong_direction

```

### Variantes d'examen

```
Pour calculer la limite de aₙ = ln(e^(4n) + n)/(4n + 1), quel encadrement (pour tout n ≥ 1) permet de conclure par les gendarmes ?
  · 0 ≤ aₙ ≤ (4n + ln(2))/(4n + 1) [a1_squeeze_different_limits]   · aₙ ≤ (4n + ln(2))/(4n + 1) suffit : le majorant tend vers 1   · (4n + ln(2))/(4n + 1) ≤ aₙ ≤ (4n)/(4n + 1) [a1_squeeze_wrong_direction]   ✔ (4n)/(4n + 1) ≤ aₙ ≤ (4n + ln(2))/(4n + 1)
  [examen mcq]
  pièges : a1_squeeze_wrong_direction, a1_squeeze_different_limits

Vrai ou faux ?
  « Si 0 < bₙ < cₙ pour tout n et si (cₙ) converge, alors (bₙ) converge. » → FAUX
    contre-exemple (sequence) : b = (2+(-1)^n)/4, c = 1
  [examen tf]
  pièges : a1_bounded_implies_convergent

Calcule la limite de aₙ = (2n + 5cos(n))/(3n + 2) par les gendarmes : minore, majore, puis passe à la limite des deux bornes.
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 0,5 ; Majore aₙ : 0,5 ; Limite du minorant : 0,5 ; Limite du majorant : 0,5 ; Conclusion : 0)
    [free, sans aide, suivre l'erreur, examen open]  (2n + 5cos(n))/(3n + 2)
      = (2n − 5)/(3n + 2)   ← cos n ≥ −1 (et 3n + 2 > 0)
    — Majore aₙ :  [juge equiv]  départ : (2n + 5cos(n))/(3n + 2)
      = (2n + 5)/(3n + 2)   ← cos n ≤ 1
    — Limite du minorant :  [juge limit]  départ : (2n − 5)/(3n + 2)
      = (2 − 5/n)/(3 + 2/n)   ← Diviser par n
      = 2/3   ← Passer à la limite
    — Limite du majorant :  [juge limit]  départ : (2n + 5)/(3n + 2)
      = (2 + 5/n)/(3 + 2/n)   ← Diviser par n
      = 2/3   ← Passer à la limite
    — Conclusion :  [juge value]  départ : lim_{n→∞} a_n
      = 2/3   ← Gendarmes
  pièges : a1_squeeze_wrong_direction

```

## Formes 1^∞ : écrire e^(n·Log(…)) (`a1-seq-1inf`, BA1)

_uₙ^(vₙ) = e^(vₙ·Log uₙ), puis Log(1 + h) ≈ h._

### Niveau 1

```
Calcule lim_{n→∞} ((n − 1)/(n − 2))^(3n).
  [guided]  3n·ln((n − 1)/(n − 2))
    (Forme exponentielle : ((n − 1)/(n − 2))^(3n) = e^(3n·ln((n − 1)/(n − 2))).)
    = 3n·ln(1 + □)   (trous : 3n·ln(1 + 1/(n − 2)))   ← Faire apparaître 1 + h, avec h → 0
    = 3n·(1)/(n − 2)   ← Log(1 + h) = h + h·ε(h)
    = □   (trous : 3)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((n − 1)/(n − 2))^(3n)
    ? L'exposant tend vers 3. Donc la suite tend vers : ✔ <math alttext="e³"><msup><mrow><mi>e</mi></mrow><mn>3</mn></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 3, la limite de l'exposant
    = e³   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(3n·Log(…)) et écris la base 1 + h. | (n − 1)/(n − 2) = 1 + □/(n − 2) | 3n·ln(1 + 1/(n − 2)) ~ 3n·(1)/(n − 2) → 3
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} ((n + 1)/(n − 2))^(2n).
  [guided]  2n·ln((n + 1)/(n − 2))
    (Forme exponentielle : ((n + 1)/(n − 2))^(2n) = e^(2n·ln((n + 1)/(n − 2))).)
    = 2n·ln(1 + □)   (trous : 2n·ln(1 + 3/(n − 2)))   ← Faire apparaître 1 + h, avec h → 0
    = 2n·(3)/(n − 2)   ← Log(1 + h) = h + h·ε(h)
    = □   (trous : 6)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((n + 1)/(n − 2))^(2n)
    ? L'exposant tend vers 6. Donc la suite tend vers : ✔ <math alttext="e⁶"><msup><mrow><mi>e</mi></mrow><mn>6</mn></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 6, la limite de l'exposant
    = e⁶   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(2n·Log(…)) et écris la base 1 + h. | (n + 1)/(n − 2) = 1 + □/(n − 2) | 2n·ln(1 + 3/(n − 2)) ~ 2n·(3)/(n − 2) → 6
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} ((5n + 1)/(5n))^n.
  [guided]  n·ln((5n + 1)/(5n))
    (Forme exponentielle : ((5n + 1)/(5n))^n = e^(n·ln((5n + 1)/(5n))).)
    = n·ln(1 + □)   (trous : n·ln(1 + 1/(5n)))   ← Faire apparaître 1 + h, h = 1/(5n)
    = n·1/(5n)   ← Log(1 + h) = h + h·ε(h)
    = □   (trous : 1/5)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((5n + 1)/(5n))^n
    ? L'exposant tend vers 1/5. Donc la suite tend vers : ✔ <math alttext="e^(1/5)"><msup><mrow><mi>e</mi></mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 1/5, la limite de l'exposant
    = e^(1/5)   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(n·Log(…)). | (5n + 1)/(5n) = 1 + □ | n·ln(1 + 1/(5n)) ~ n·1/(5n) = 1/5
  pièges : a1_indet_one_inf

```

### Niveau 2

```
Calcule lim_{n→∞} ((n)/(n − 1))^n.
  [guided]  ((n)/(n − 1))^n
    = e^(n·ln((n)/(n − 1)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln((n)/(n − 1))
    = n·ln(1 + 1/(n − 1))   ← Faire apparaître 1 + h, avec h → 0
    = n·(1)/(n − 1)   ← Log(1 + h) = h + h·ε(h)
    = □   (trous : 1)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((n)/(n − 1))^n
    ? L'exposant tend vers 1. Donc la suite tend vers : ✔ <math alttext="e"><mi>e</mi></math>, par continuité de exp / · 1, car la base tend vers 1 / · 1, la limite de l'exposant
    = e   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(n·Log(…)) et écris la base 1 + h. | (n)/(n − 1) = 1 + □/(n − 1) | n·ln(1 + 1/(n − 1)) ~ n·(1)/(n − 1) → 1
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} (1 + (1 + 1/n)/(5n))^(3n).
  [guided]  (1 + (1 + 1/n)/(5n))^(3n)
    = e^(3n·ln(1 + (1 + 1/n)/(5n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : 3n·ln(1 + (1 + 1/n)/(5n))
    = 3n·(1 + 1/n)/(5n)   ← Log(1 + h) = h + h·ε(h), h → 0
    = 3(1 + 1/n)/5   ← Simplifier par n
    = □   (trous : 3/5)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + (1 + 1/n)/(5n))^(3n)
    ? L'exposant tend vers 3/5. Donc la suite tend vers : ✔ <math alttext="e^(3/5)"><msup><mrow><mi>e</mi></mrow><mfrac><mn>3</mn><mn>5</mn></mfrac></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 3/5, la limite de l'exposant
    = e^(3/5)   ← Continuité de exp
  aides : h = (1 + 1/n)/(5n) → 0 : passe en exponentielle, puis Log(1 + h) ≈ h. | 3n·ln(1 + (1 + 1/n)/(5n)) ~ 3n·□ | 3n·(1 + 1/n)/(5n) → 3/5
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} (1 + (1 + 1/n)/(6n))^n.
  [guided]  (1 + (1 + 1/n)/(6n))^n
    = e^(n·ln(1 + (1 + 1/n)/(6n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln(1 + (1 + 1/n)/(6n))
    = n·(1 + 1/n)/(6n)   ← Log(1 + h) = h + h·ε(h), h → 0
    = (1 + 1/n)/6   ← Simplifier par n
    = □   (trous : 1/6)   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + (1 + 1/n)/(6n))^n
    ? L'exposant tend vers 1/6. Donc la suite tend vers : ✔ <math alttext="e^(1/6)"><msup><mrow><mi>e</mi></mrow><mfrac><mn>1</mn><mn>6</mn></mfrac></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 1/6, la limite de l'exposant
    = e^(1/6)   ← Continuité de exp
  aides : h = (1 + 1/n)/(6n) → 0 : passe en exponentielle, puis Log(1 + h) ≈ h. | n·ln(1 + (1 + 1/n)/(6n)) ~ n·□ | n·(1 + 1/n)/(6n) → 1/6
  pièges : a1_indet_one_inf

```

### Niveau 3

```
Calcule lim_{n→∞} ((5n + 1)/(5n))^n.
  [tap, suivre l'erreur, menu steps]  ((5n + 1)/(5n))^n
    = e^(n·ln((5n + 1)/(5n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln((5n + 1)/(5n))
    = n·ln(1 + 1/(5n))   ← Faire apparaître 1 + h, h = 1/(5n)
    = n·1/(5n)   ← Log(1 + h) = h + h·ε(h)
    = 1/5   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((5n + 1)/(5n))^n
    ? L'exposant tend vers 1/5. Donc la suite tend vers : ✔ <math alttext="e^(1/5)"><msup><mrow><mi>e</mi></mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 1/5, la limite de l'exposant
    = e^(1/5)   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(n·Log(…)). | (5n + 1)/(5n) = 1 + □ | n·ln(1 + 1/(5n)) ~ n·1/(5n) = 1/5
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} (1 + 1/n − 3/n²)^(3n).
  [tap, suivre l'erreur, menu steps]  (1 + 1/n − 3/n²)^(3n)
    = e^(3n·ln(1 + 1/n − 3/n²))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : 3n·ln(1 + 1/n − 3/n²)
    = 3n·(1/n − 3/n²)   ← Log(1 + h) = h + h·ε(h), h → 0
    = 3 − 9/n   ← Développer
    = 3   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + 1/n − 3/n²)^(3n)
    ? L'exposant tend vers 3. Donc la suite tend vers : ✔ <math alttext="e³"><msup><mrow><mi>e</mi></mrow><mn>3</mn></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 3, la limite de l'exposant
    = e³   ← Continuité de exp
  aides : La base est déjà 1 + h avec h = 1/n − 3/n² → 0 : passe en exponentielle et remplace Log(1 + h) par h. | 3n·ln(1 + 1/n − 3/n²) ~ 3n·(□) | 3n·(1/n − 3/n²) = 3 − 9/n → 3
  pièges : a1_indet_one_inf

Calcule lim_{n→∞} ((9n + 1)/(9n))^n.
  [tap, suivre l'erreur, menu steps]  ((9n + 1)/(9n))^n
    = e^(n·ln((9n + 1)/(9n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln((9n + 1)/(9n))
    = n·ln(1 + 1/(9n))   ← Faire apparaître 1 + h, h = 1/(9n)
    = n·1/(9n)   ← Log(1 + h) = h + h·ε(h)
    = 1/9   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((9n + 1)/(9n))^n
    ? L'exposant tend vers 1/9. Donc la suite tend vers : ✔ <math alttext="e^(1/9)"><msup><mrow><mi>e</mi></mrow><mfrac><mn>1</mn><mn>9</mn></mfrac></msup></math>, par continuité de exp / · 1, car la base tend vers 1 / · 1/9, la limite de l'exposant
    = e^(1/9)   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(n·Log(…)). | (9n + 1)/(9n) = 1 + □ | n·ln(1 + 1/(9n)) ~ n·1/(9n) = 1/9
  pièges : a1_indet_one_inf

```

### Niveau 4

```
Calcule lim_{n→∞} e^(n²·ln(1 + 1/n) − n). Tout est déjà en exponentielle : étudie l'exposant.
  [free, suivre l'erreur]  n²·ln(1 + 1/n) − n
    = n²·(1/n − 1/(2n²)) − n   ← Log(1 + h) = h − h²/2 + h²·ε(h) : l'ordre 2 est nécessaire
    = −1/2   ← Simplifier
  — Conclusion :  [juge limit]  départ : e^(n²·ln(1 + 1/n) − n)
    = e^(−1/2)   ← Continuité de exp
  aides : À l'ordre 1, n²·(1/n) − n = 0 ne dit rien : il faut Log(1 + h) = h − h²/2 + h²·ε(h). | n²·(1/n − □) − n | n²·(1/n − 1/(2n²)) − n = −1/2
  pièges : g6_infinity_minus_infinity

Calcule lim_{n→∞} e^(n²·ln(1 + 1/n) − n). Tout est déjà en exponentielle : étudie l'exposant.
  [free, suivre l'erreur]  n²·ln(1 + 1/n) − n
    = n²·(1/n − 1/(2n²)) − n   ← Log(1 + h) = h − h²/2 + h²·ε(h) : l'ordre 2 est nécessaire
    = −1/2   ← Simplifier
  — Conclusion :  [juge limit]  départ : e^(n²·ln(1 + 1/n) − n)
    = e^(−1/2)   ← Continuité de exp
  aides : À l'ordre 1, n²·(1/n) − n = 0 ne dit rien : il faut Log(1 + h) = h − h²/2 + h²·ε(h). | n²·(1/n − □) − n | n²·(1/n − 1/(2n²)) − n = −1/2
  pièges : g6_infinity_minus_infinity

Calcule lim_{n→∞} ((n)/(n − 3))^n.
  [free, suivre l'erreur]  ((n)/(n − 3))^n
    = e^(n·ln((n)/(n − 3)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln((n)/(n − 3))
    = n·ln(1 + 3/(n − 3))   ← Faire apparaître 1 + h, avec h → 0
    = n·(3)/(n − 3)   ← Log(1 + h) = h + h·ε(h)
    = 3   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : ((n)/(n − 3))^n
    = e³   ← Continuité de exp
  aides : Base → 1, exposant → ∞ : passe en e^(n·Log(…)) et écris la base 1 + h. | (n)/(n − 3) = 1 + □/(n − 3) | n·ln(1 + 3/(n − 3)) ~ n·(3)/(n − 3) → 3

```

### Niveau 5

```
Calcule lim_{n→∞} (1 + (1 + 1/n)/(3n))^(4n).
  [free, sans aide]  (1 + (1 + 1/n)/(3n))^(4n)
    = e^(4n·ln(1 + (1 + 1/n)/(3n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : 4n·ln(1 + (1 + 1/n)/(3n))
    = 4n·(1 + 1/n)/(3n)   ← Log(1 + h) = h + h·ε(h), h → 0
    = 4(1 + 1/n)/3   ← Simplifier par n
    = 4/3   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + (1 + 1/n)/(3n))^(4n)
    = e^(4/3)   ← Continuité de exp

Calcule lim_{n→∞} (1 + 1/n − 1/n²)^(2n).
  [free, sans aide]  (1 + 1/n − 1/n²)^(2n)
    = e^(2n·ln(1 + 1/n − 1/n²))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : 2n·ln(1 + 1/n − 1/n²)
    = 2n·(1/n − 1/n²)   ← Log(1 + h) = h + h·ε(h), h → 0
    = 2 − 2/n   ← Développer
    = 2   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + 1/n − 1/n²)^(2n)
    = e²   ← Continuité de exp

Calcule lim_{n→∞} (1 + (5 + 1/n)/(4n))^n.
  [free, sans aide]  (1 + (5 + 1/n)/(4n))^n
    = e^(n·ln(1 + (5 + 1/n)/(4n)))   ← uᵛ = e^(v·Log u)
  — Limite de l'exposant :  [juge limit]  départ : n·ln(1 + (5 + 1/n)/(4n))
    = n·(5 + 1/n)/(4n)   ← Log(1 + h) = h + h·ε(h), h → 0
    = (5 + 1/n)/4   ← Simplifier par n
    = 5/4   ← Limite de l'exposant
  — Conclusion :  [juge limit]  départ : (1 + (5 + 1/n)/(4n))^n
    = e^(5/4)   ← Continuité de exp

```

### Variantes d'examen

```
lim_{n→∞} (1 + (5 + 1/n)/(6n))^(3n) =
  · +∞   · e^(−5/2)   · 1 [a1_indet_one_inf]   ✔ e^(5/2)
  [examen mcq]
  pièges : a1_indet_one_inf

Vrai ou faux ?
  « Si uₙ → 1 et n(uₙ − 1) → c, alors uₙⁿ → eᶜ. » → VRAI
  [examen tf]

```

## Critère de d'Alembert pour les suites (`a1-seq-ratio`, BA1)

_|aₙ₊₁/aₙ| → q < 1 : aₙ → 0 ; q > 1 : |aₙ| → +∞._

### Niveau 1

```
Soit aₙ = (6^n(n!)²)/(2n)!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  ((6^(n + 1)((n + 1)!)²)/(2n + 2)!)/((6^n(n!)²)/(2n)!)
    = (6^(n + 1)((n + 1)!)²(2n)!)/((2n + 2)!·6^n(n!)²)   ← Former le rapport
    = (6(n + 1)²)/(□)   (trous : (6(n + 1)²)/((2n + 2)(2n + 1)))   ← Simplifier les factorielles et les puissances
  — Limite du rapport :  [juge limit]  départ : (6(n + 1))/(4n + 2)
    = (6(1 + 1/n))/(4 + 2/n)   ← Diviser par n
    = □   (trous : 3/2)   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : (6^n(n!)²)/(2n)!
    ? Le rapport tend vers q = 3/2. Que conclure ? · q < 1 : aₙ → 0 / ✔ q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = ∞   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (2n + 2)!/(2n)! = □ | aₙ₊₁/aₙ = (6(n + 1))/(4n + 2) → 3/2
  pièges : g2_exp_sum, a1_factorial_ratio

Soit aₙ = (2n)!/3^(n²). Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  ((2n + 2)!/3^((n + 1)²))/((2n)!/3^(n²))
    = ((2n + 2)!·3^(n²))/(3^((n + 1)²)(2n)!)   ← Former le rapport
    = (□)/3^(2n + 1)   (trous : ((2n + 2)(2n + 1))/3^(2n + 1))   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : ((2n + 2)(2n + 1))/3^(2n + 1)
    = □   (trous : 0)   ← Croissances comparées : l'exponentielle l'emporte
  — Conclusion :  [juge limit]  départ : (2n)!/3^(n²)
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (2n + 2)!/(2n)! = □ | aₙ₊₁/aₙ = ((2n + 2)(2n + 1))/3^(2n + 1) → 0
  pièges : a1_factorial_ratio

Soit aₙ = (n²·7^n)/n!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  (((n + 1)²·7^(n + 1))/(n + 1)!)/((n²·7^n)/n!)
    = (7^(n + 1)(n + 1)²·n!)/((n + 1)!·7^n·n²)   ← Former le rapport
    = (7(n + 1)²)/(□)   (trous : (7(n + 1)²)/((n + 1)n²))   ← Simplifier les factorielles et les puissances
  — Limite du rapport :  [juge limit]  départ : (7(n + 1))/n²
    = (7(1 + 1/n))/n   ← Diviser par la plus grande puissance
    = □   (trous : 0)   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : (n²·7^n)/n!
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = (7(n + 1))/n² → 0
  pièges : g2_exp_sum

```

### Niveau 2

```
Soit aₙ = 6^n/n!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  (6^(n + 1)/(n + 1)!)/(6^n/n!)
    ? (n + 1)!/n! = ✔ n + 1 / · n! / · 1
    = (6^(n + 1)·n!)/((n + 1)!·6^n)   ← Former le rapport
    = 6/(n + 1)   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 6/(n + 1)
    = □   (trous : 0)   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : 6^n/n!
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = 6/(n + 1) → 0
  pièges : g2_exp_sum

Soit aₙ = 3^n/n!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  (3^(n + 1)/(n + 1)!)/(3^n/n!)
    ? (n + 1)!/n! = ✔ n + 1 / · n! / · 1
    = (3^(n + 1)·n!)/((n + 1)!·3^n)   ← Former le rapport
    = 3/(n + 1)   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 3/(n + 1)
    = □   (trous : 0)   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : 3^n/n!
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = 3/(n + 1) → 0
  pièges : g2_exp_sum

Soit aₙ = 6^n/n!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [guided]  (6^(n + 1)/(n + 1)!)/(6^n/n!)
    ? (n + 1)!/n! = ✔ n + 1 / · n! / · 1
    = (6^(n + 1)·n!)/((n + 1)!·6^n)   ← Former le rapport
    = 6/(n + 1)   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 6/(n + 1)
    = □   (trous : 0)   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : 6^n/n!
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = 6/(n + 1) → 0
  pièges : g2_exp_sum

```

### Niveau 3

```
Soit aₙ = (2n)!/4^(n²). Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [tap, suivre l'erreur, menu steps]  ((2n + 2)!/4^((n + 1)²))/((2n)!/4^(n²))
    = ((2n + 2)!·4^(n²))/(4^((n + 1)²)(2n)!)   ← Former le rapport
    = ((2n + 2)(2n + 1))/4^(2n + 1)   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : ((2n + 2)(2n + 1))/4^(2n + 1)
    = 0   ← Croissances comparées : l'exponentielle l'emporte
  — Conclusion :  [juge limit]  départ : (2n)!/4^(n²)
    ? Le rapport tend vers q = 0. Que conclure ? ✔ q < 1 : aₙ → 0 / · q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (2n + 2)!/(2n)! = □ | aₙ₊₁/aₙ = ((2n + 2)(2n + 1))/4^(2n + 1) → 0
  pièges : a1_factorial_ratio

Soit aₙ = 2^(n²)/(n!)². Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [tap, suivre l'erreur, menu steps]  (2^((n + 1)²)/((n + 1)!)²)/(2^(n²)/(n!)²)
    = (2^((n + 1)²)(n!)²)/(((n + 1)!)²·2^(n²))   ← Former le rapport
    = 2^(2n + 1)/(n + 1)²   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 2^(2n + 1)/(n + 1)²
    = ∞   ← Croissances comparées
  — Conclusion :  [juge limit]  départ : 2^(n²)/(n!)²
    ? Le rapport tend vers q = +∞. Que conclure ? · q < 1 : aₙ → 0 / ✔ q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = ∞   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = 2^(2n + 1)/(n + 1)² → +∞

Soit aₙ = 3^(n²)/(n!)². Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [tap, suivre l'erreur, menu steps]  (3^((n + 1)²)/((n + 1)!)²)/(3^(n²)/(n!)²)
    = (3^((n + 1)²)(n!)²)/(((n + 1)!)²·3^(n²))   ← Former le rapport
    = 3^(2n + 1)/(n + 1)²   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 3^(2n + 1)/(n + 1)²
    = ∞   ← Croissances comparées
  — Conclusion :  [juge limit]  départ : 3^(n²)/(n!)²
    ? Le rapport tend vers q = +∞. Que conclure ? · q < 1 : aₙ → 0 / ✔ q > 1 : aₙ → +∞ / · Le critère ne permet pas de conclure
    = ∞   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = 3^(2n + 1)/(n + 1)² → +∞

```

### Niveau 4

```
Soit aₙ = (2n)!/4^(n²). Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, suivre l'erreur]  ((2n + 2)!/4^((n + 1)²))/((2n)!/4^(n²))
    = ((2n + 2)!·4^(n²))/(4^((n + 1)²)(2n)!)   ← Former le rapport
    = ((2n + 2)(2n + 1))/4^(2n + 1)   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : ((2n + 2)(2n + 1))/4^(2n + 1)
    = 0   ← Croissances comparées : l'exponentielle l'emporte
  — Conclusion :  [juge limit]  départ : (2n)!/4^(n²)
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (2n + 2)!/(2n)! = □ | aₙ₊₁/aₙ = ((2n + 2)(2n + 1))/4^(2n + 1) → 0
  pièges : a1_factorial_ratio

Soit aₙ = (n³·3^n)/n!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, suivre l'erreur]  (((n + 1)³·3^(n + 1))/(n + 1)!)/((n³·3^n)/n!)
    = (3^(n + 1)(n + 1)³·n!)/((n + 1)!·3^n·n³)   ← Former le rapport
    = (3(n + 1)³)/((n + 1)n³)   ← Simplifier les factorielles et les puissances
  — Limite du rapport :  [juge limit]  départ : (3(n + 1)²)/n³
    = (3(1 + 1/n)²)/n   ← Diviser par la plus grande puissance
    = 0   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : (n³·3^n)/n!
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (n + 1)!/n! = □ | aₙ₊₁/aₙ = (3(n + 1)²)/n³ → 0
  pièges : g2_exp_sum

Soit aₙ = (2^n(n!)²)/(2n)!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, suivre l'erreur]  ((2^(n + 1)((n + 1)!)²)/(2n + 2)!)/((2^n(n!)²)/(2n)!)
    = (2^(n + 1)((n + 1)!)²(2n)!)/((2n + 2)!·2^n(n!)²)   ← Former le rapport
    = (2(n + 1)²)/((2n + 2)(2n + 1))   ← Simplifier les factorielles et les puissances
  — Limite du rapport :  [juge limit]  départ : (2(n + 1))/(4n + 2)
    = (2(1 + 1/n))/(4 + 2/n)   ← Diviser par n
    = 1/2   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : (2^n(n!)²)/(2n)!
    = 0   ← D'Alembert
  aides : Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. | (2n + 2)!/(2n)! = □ | aₙ₊₁/aₙ = (2(n + 1))/(4n + 2) → 1/2
  pièges : g2_exp_sum, a1_factorial_ratio

```

### Niveau 5

```
Soit aₙ = n!/n^n. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, sans aide]  ((n + 1)!/(n + 1)^(n + 1))/(n!/n^n)
    = ((n + 1)!·n^n)/((n + 1)^(n + 1)·n!)   ← Former le rapport
    = ((n + 1)n^n)/(n + 1)^(n + 1)   ← Simplifier les factorielles et les puissances
    = (n/(n + 1))^n   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : (n/(n + 1))^n
    = 1/(1 + 1/n)^n   ← (n/(n + 1))ⁿ = 1/(1 + 1/n)ⁿ
    = e^(−1)   ← (1 + 1/n)ⁿ → e
  — Conclusion :  [juge limit]  départ : n!/n^n
    = 0   ← D'Alembert
  pièges : g2_exp_sum

Soit aₙ = (7^n(n!)²)/(2n)!. Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, sans aide]  ((7^(n + 1)((n + 1)!)²)/(2n + 2)!)/((7^n(n!)²)/(2n)!)
    = (7^(n + 1)((n + 1)!)²(2n)!)/((2n + 2)!·7^n(n!)²)   ← Former le rapport
    = (7(n + 1)²)/((2n + 2)(2n + 1))   ← Simplifier les factorielles et les puissances
  — Limite du rapport :  [juge limit]  départ : (7(n + 1))/(4n + 2)
    = (7(1 + 1/n))/(4 + 2/n)   ← Diviser par n
    = 7/4   ← Limite du rapport
  — Conclusion :  [juge limit]  départ : (7^n(n!)²)/(2n)!
    = ∞   ← D'Alembert
  pièges : g2_exp_sum, a1_factorial_ratio

Soit aₙ = 3^(n²)/(n!)². Forme aₙ₊₁/aₙ, simplifie-le, calcule sa limite q, puis conclus sur lim_{n→∞} a_n.
  [free, sans aide]  (3^((n + 1)²)/((n + 1)!)²)/(3^(n²)/(n!)²)
    = (3^((n + 1)²)(n!)²)/(((n + 1)!)²·3^(n²))   ← Former le rapport
    = 3^(2n + 1)/(n + 1)²   ← Simplifier
  — Limite du rapport :  [juge limit]  départ : 3^(2n + 1)/(n + 1)²
    = ∞   ← Croissances comparées
  — Conclusion :  [juge limit]  départ : 3^(n²)/(n!)²
    = ∞   ← D'Alembert

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si aₙ ≠ 0 et |aₙ₊₁/aₙ| → 3, alors |aₙ| → +∞. » → VRAI
  [examen tf]

lim_{n→∞} n!/n^n =
  · 1   · +∞   · La limite n'existe pas   ✔ 0
  [examen mcq]

```

## Suites monotones et bornées ; suites de Cauchy (`a1-seq-monotone`, BA1)

_Croissante et majorée ⇒ convergente ; bornée ne suffit pas._

### Niveau 1

```
Soit u₀ = 0 et uₙ₊₁ = √(6 + uₙ). Montre que (uₙ) est majorée par 3 et croissante, puis calcule sa limite.
  [guided]  √(6 + u)
    (u₀ = 0 ≤ 3. Hérédité : si 0 ≤ uₙ ≤ 3, alors uₙ₊₁ = √(6 + uₙ) ≤ ?)
    = √(□)   (trous : √(6 + 3))   ← u ≤ 3 et √ est croissante
    = 3   ← Calculer
  — Croissante : uₙ₊₁ − uₙ = √(6 + u) − u pour 0 ≤ u ≤ 3.  [juge equiv]  départ : √(6 + u) − u
    = (□)/(√(6 + u) + u)   (trous : (6 + u − u²)/(√(6 + u) + u))   ← Quantité conjuguée
    = 0   ← 6 + u − u² = (3 − u)(u + 2) ≥ 0 sur [0 ; 3]
  — Conclusion : la limite ℓ vérifie ℓ = √(6 + ℓ) et ℓ ≥ 0.  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 3 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 3   ← ℓ² − ℓ − 6 = 0, ℓ ≥ 0
  aides : Récurrence : si uₙ ≤ 3, alors √(6 + uₙ) ≤ √(6 + 3). Puis le signe de uₙ₊₁ − uₙ. | √(6 + u) − u = (6 + u − u²)/(□) | √(6 + u) ≤ √9 = 3 ; 6 + u − u² = (3 − u)(u + 2) ≥ 0
  pièges : a1_bounded_implies_convergent

Soit uₙ = Σ_{k=0}^{n} 1/k!. Montre que (uₙ) est croissante et majorée par 3, et conclus.
  [guided]  Σ_{k=0}^{n + 1} 1/k! − Σ_{k=0}^{n} 1/k!
    = 1/(□)!   (trous : 1/(n + 1)!)   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=0}^{n} 1/k!
    = 1 + Σ_{k=1}^{n} 1/2^(k − 1)   ← 1/k! ≤ 1/2^(k−1) pour k ≥ 1
    = 1 + 2(1 − 1/2^n)   ← Somme géométrique de raison 1/2
    = 3 − □   (trous : 3 − 1/2^(n − 1))   ← Simplifier
    = 3   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 3 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 3   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k! ≤ 1/2^(k−1), donc uₙ ≤ 1 + Σ 1/2^(k−1) | uₙ ≤ 1 + 2(1 − 1/2ⁿ) ≤ 3
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

Soit uₙ = Σ_{k=1}^{n} 1/k³. Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [guided]  Σ_{k=1}^{n + 1} 1/k³ − Σ_{k=1}^{n} 1/k³
    = 1/□   (trous : 1/(n + 1)³)   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k³
    = Σ_{k=1}^{n} 1/k²   ← 1/k³ ≤ 1/k²
    = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
    = 2 − □   (trous : 2 − 1/n)   ← Télescoper
    = 2   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 2 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 2   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k² ≤ 1/(k − 1) − □ pour k ≥ 2 | uₙ ≤ 1 + (1 − 1/n) ≤ 2
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

```

### Niveau 2

```
Soit uₙ = Σ_{k=0}^{n} 1/k!. Montre que (uₙ) est croissante et majorée par 3, et conclus.
  [guided]  Σ_{k=0}^{n + 1} 1/k! − Σ_{k=0}^{n} 1/k!
    = 1/(n + 1)!   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=0}^{n} 1/k!
    ? Quel majorant de 1/k! (k ≥ 1) donne une somme bornée ? ✔ 1/2^(k−1) / · 1/k / · 1/2^k
    = 1 + Σ_{k=1}^{n} 1/2^(k − 1)   ← 1/k! ≤ 1/2^(k−1) pour k ≥ 1
    = 1 + 2(1 − 1/2^n)   ← Somme géométrique de raison 1/2
    = 3 − 1/2^(n − 1)   ← Simplifier
    = 3   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 3 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 3   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k! ≤ 1/2^(k−1), donc uₙ ≤ 1 + Σ 1/2^(k−1) | uₙ ≤ 1 + 2(1 − 1/2ⁿ) ≤ 3
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

Soit uₙ = Σ_{k=1}^{n} 1/k³. Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [guided]  Σ_{k=1}^{n + 1} 1/k³ − Σ_{k=1}^{n} 1/k³
    = 1/(n + 1)³   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k³
    ? Quel majorant de 1/k³ (k ≥ 2) donne une somme bornée ? ✔ 1/(k − 1) − 1/k / · 1/k / · 1/(k(k + 1))
    = Σ_{k=1}^{n} 1/k²   ← 1/k³ ≤ 1/k²
    = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
    = 2 − 1/n   ← Télescoper
    = 2   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 2 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 2   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k² ≤ 1/(k − 1) − □ pour k ≥ 2 | uₙ ≤ 1 + (1 − 1/n) ≤ 2
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

Soit u₀ = 0 et uₙ₊₁ = √(20 + uₙ). Montre que (uₙ) est majorée par 5 et croissante, puis calcule sa limite.
  [guided]  √(20 + u)
    (u₀ = 0 ≤ 5. Hérédité : si 0 ≤ uₙ ≤ 5, alors uₙ₊₁ = √(20 + uₙ) ≤ ?)
    ? Comment montrer que uₙ ≤ 5 pour tout n ? ✔ Par récurrence : u₀ = 0 ≤ 5, et uₙ ≤ 5 ⇒ uₙ₊₁ ≤ 5 / · La limite est 5, donc uₙ ≤ 5
    = √(20 + 5)   ← u ≤ 5 et √ est croissante
    = 5   ← Calculer
  — Croissante : uₙ₊₁ − uₙ = √(20 + u) − u pour 0 ≤ u ≤ 5.  [juge equiv]  départ : √(20 + u) − u
    = (20 + u − u²)/(√(20 + u) + u)   ← Quantité conjuguée
    = 0   ← 20 + u − u² = (5 − u)(u + 4) ≥ 0 sur [0 ; 5]
  — Conclusion : la limite ℓ vérifie ℓ = √(20 + ℓ) et ℓ ≥ 0.  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 5 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 5   ← ℓ² − ℓ − 20 = 0, ℓ ≥ 0
  aides : Récurrence : si uₙ ≤ 5, alors √(20 + uₙ) ≤ √(20 + 5). Puis le signe de uₙ₊₁ − uₙ. | √(20 + u) − u = (20 + u − u²)/(□) | √(20 + u) ≤ √25 = 5 ; 20 + u − u² = (5 − u)(u + 4) ≥ 0
  pièges : a1_bounded_implies_convergent

```

### Niveau 3

```
Soit uₙ = Σ_{k=1}^{n} 1/k². Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [tap, suivre l'erreur, menu steps]  Σ_{k=1}^{n + 1} 1/k² − Σ_{k=1}^{n} 1/k²
    = 1/(n + 1)²   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k²
    = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
    = 2 − 1/n   ← Télescoper
    = 2   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 2 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 2   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k² ≤ 1/(k − 1) − □ pour k ≥ 2 | uₙ ≤ 1 + (1 − 1/n) ≤ 2
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

Soit u₀ = 0 et uₙ₊₁ = √(2 + uₙ). Montre que (uₙ) est majorée par 2 et croissante, puis calcule sa limite.
  [tap, suivre l'erreur, menu steps]  √(2 + u)
    (u₀ = 0 ≤ 2. Hérédité : si 0 ≤ uₙ ≤ 2, alors uₙ₊₁ = √(2 + uₙ) ≤ ?)
    = 2   ← Calculer
  — Croissante : uₙ₊₁ − uₙ = √(2 + u) − u pour 0 ≤ u ≤ 2.  [juge equiv]  départ : √(2 + u) − u
    = (2 + u − u²)/(√(2 + u) + u)   ← Quantité conjuguée
    = 0   ← 2 + u − u² = (2 − u)(u + 1) ≥ 0 sur [0 ; 2]
  — Conclusion : la limite ℓ vérifie ℓ = √(2 + ℓ) et ℓ ≥ 0.  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 2 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 2   ← ℓ² − ℓ − 2 = 0, ℓ ≥ 0
  aides : Récurrence : si uₙ ≤ 2, alors √(2 + uₙ) ≤ √(2 + 2). Puis le signe de uₙ₊₁ − uₙ. | √(2 + u) − u = (2 + u − u²)/(□) | √(2 + u) ≤ √4 = 2 ; 2 + u − u² = (2 − u)(u + 1) ≥ 0
  pièges : a1_bounded_implies_convergent

Soit uₙ = Σ_{k=0}^{n} 1/k!. Montre que (uₙ) est croissante et majorée par 3, et conclus.
  [tap, suivre l'erreur, menu steps]  Σ_{k=0}^{n + 1} 1/k! − Σ_{k=0}^{n} 1/k!
    = 1/(n + 1)!   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=0}^{n} 1/k!
    = 1 + Σ_{k=1}^{n} 1/2^(k − 1)   ← 1/k! ≤ 1/2^(k−1) pour k ≥ 1
    = 1 + 2(1 − 1/2^n)   ← Somme géométrique de raison 1/2
    = 3 − 1/2^(n − 1)   ← Simplifier
    = 3   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    ? Que conclure ? ✔ (uₙ) est croissante et majorée par 3 : elle converge / · (uₙ) est bornée, donc elle converge / · (uₙ) est croissante, donc elle tend vers +∞
    = 3   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k! ≤ 1/2^(k−1), donc uₙ ≤ 1 + Σ 1/2^(k−1) | uₙ ≤ 1 + 2(1 − 1/2ⁿ) ≤ 3
  pièges : g5_hered_wrong_term, g5_reindex_half, a1_bounded_implies_convergent

```

### Niveau 4

```
Soit uₙ = Σ_{k=1}^{n} 1/k³. Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [free, suivre l'erreur]  Σ_{k=1}^{n + 1} 1/k³ − Σ_{k=1}^{n} 1/k³
    = 1/(n + 1)³   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k³
    = Σ_{k=1}^{n} 1/k²   ← 1/k³ ≤ 1/k²
    = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
    = 2 − 1/n   ← Télescoper
    = 2   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    = 2   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k² ≤ 1/(k − 1) − □ pour k ≥ 2 | uₙ ≤ 1 + (1 − 1/n) ≤ 2
  pièges : g5_hered_wrong_term, g5_reindex_half

Soit u₀ = 0 et uₙ₊₁ = √(20 + uₙ). Montre que (uₙ) est majorée par 5 et croissante, puis calcule sa limite.
  [free, suivre l'erreur]  √(20 + u)
    (u₀ = 0 ≤ 5. Hérédité : si 0 ≤ uₙ ≤ 5, alors uₙ₊₁ = √(20 + uₙ) ≤ ?)
    = 5   ← Calculer
  — Croissante : uₙ₊₁ − uₙ = √(20 + u) − u pour 0 ≤ u ≤ 5.  [juge equiv]  départ : √(20 + u) − u
    = (20 + u − u²)/(√(20 + u) + u)   ← Quantité conjuguée
    = 0   ← 20 + u − u² = (5 − u)(u + 4) ≥ 0 sur [0 ; 5]
  — Conclusion : la limite ℓ vérifie ℓ = √(20 + ℓ) et ℓ ≥ 0.  [juge value]  départ : lim_{n→∞} u_n
    = 5   ← ℓ² − ℓ − 20 = 0, ℓ ≥ 0
  aides : Récurrence : si uₙ ≤ 5, alors √(20 + uₙ) ≤ √(20 + 5). Puis le signe de uₙ₊₁ − uₙ. | √(20 + u) − u = (20 + u − u²)/(□) | √(20 + u) ≤ √25 = 5 ; 20 + u − u² = (5 − u)(u + 4) ≥ 0

Soit uₙ = Σ_{k=1}^{n} 1/k³. Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [free, suivre l'erreur]  Σ_{k=1}^{n + 1} 1/k³ − Σ_{k=1}^{n} 1/k³
    = 1/(n + 1)³   ← Tous les termes s'en vont sauf le dernier
  — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k³
    = Σ_{k=1}^{n} 1/k²   ← 1/k³ ≤ 1/k²
    = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
    = 2 − 1/n   ← Télescoper
    = 2   ← Majorer par une constante
  — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
    = 2   ← Croissante et majorée
  aides : Montre qu'elle croît (uₙ₊₁ − uₙ), puis trouve un majorant qui ne dépend pas de n. | 1/k² ≤ 1/(k − 1) − □ pour k ≥ 2 | uₙ ≤ 1 + (1 − 1/n) ≤ 2
  pièges : g5_hered_wrong_term, g5_reindex_half

```

### Niveau 5

```
Vrai ou faux ?
  « Toute suite croissante et positive converge. » → FAUX
    contre-exemple (sequence) : a = n

Vrai ou faux ?
  « Toute suite décroissante converge. » → FAUX
    contre-exemple (sequence) : a = -n

Vrai ou faux ?
  « Toute suite définie par une récurrence aₙ₊₁ = f(aₙ) et bornée est convergente. » → FAUX
    contre-exemple (sequence) : a = (-1)^n
  pièges : a1_bounded_implies_convergent

```

### Variantes d'examen

```
Vrai ou faux ?
  « Une suite de réels converge si et seulement si elle est de Cauchy. » → VRAI
  [examen tf]

Soit uₙ = Σ_{k=1}^{n} 1/k². Montre que (uₙ) est croissante et majorée par 2, et conclus.
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 0,5 ; Un majorant : 1 ; Conclusion : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  Σ_{k=1}^{n + 1} 1/k² − Σ_{k=1}^{n} 1/k²
      = 1/(n + 1)²   ← Tous les termes s'en vont sauf le dernier
    — Un majorant :  [juge equiv]  départ : Σ_{k=1}^{n} 1/k²
      = 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)   ← 1/k² ≤ 1/(k(k − 1)) = 1/(k − 1) − 1/k pour k ≥ 2
      = 2 − 1/n   ← Télescoper
      = 2   ← Majorer par une constante
    — Conclusion :  [juge value]  départ : lim_{n→∞} u_n
      = 2   ← Croissante et majorée
  pièges : g5_hered_wrong_term, g5_reindex_half

```

## lim sup, lim inf et sous-suites (`a1-seq-limsup`, BA1)

_Séparer selon la parité, prendre la plus grande et la plus petite limite._

### Niveau 1

```
Soit aₙ = √(n + (−1)^n) − √n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  √(2m + 1) − √(2m)
    = 1/(□)   (trous : 1/(√(2m + 1) + √(2m)))   ← Quantité conjuguée
    = □   (trous : 0)   ← Limite
  — a₂ₘ₊₁ = √(2m) − √(2m + 1) :  [juge limit]  départ : √(2m) − √(2m + 1)
    = −1/(□)   (trous : −1/(√(2m) + √(2m + 1)))   ← Quantité conjuguée
    = □   (trous : 0)   ← Limite
  — lim sup :  [juge value]  départ : max(0,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 0 / · la limite de a₂ₘ, quelle qu'elle soit
    = 0   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(0,0)
    = 0   ← La plus petite limite
  aides : (−1)ⁿ vaut 1 ou −1 selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | √(2m + 1) − √(2m) = 1/(□) | Les deux sous-suites tendent vers 0 : lim sup = lim inf = 0, la suite converge vers 0.
  pièges : g6_infinity_minus_infinity, a1_dl_factorial_missing, a1_sqrt_sum_split

Soit aₙ = (−1)^n·n/(n + 1) + 3/n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  (2m)/(2m + 1) + 3/(2m)
    = 2/(2 + □) + 3/(2m)   (trous : 2/(2 + 1/m) + 3/(2m))   ← Diviser par m
    = □   (trous : 1)   ← Limite
  — a₂ₘ₊₁ = −(2m + 1)/(2m + 2) + 3/(2m + 1) :  [juge limit]  départ : −(2m + 1)/(2m + 2) + 3/(2m + 1)
    = −(2 + 1/m)/(2 + □) + 3/(2m + 1)   (trous : −(2 + 1/m)/(2 + 2/m) + 3/(2m + 1))   ← Diviser par m
    = □   (trous : −1)   ← Limite
  — lim sup :  [juge value]  départ : max(1,−1)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 1 / · le plus grand terme de la suite, 5/2 / · la limite de a₂ₘ, quelle qu'elle soit
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,−1)
    = −1   ← La plus petite limite
  aides : (−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément. | a₂ₘ → □, a₂ₘ₊₁ → □ | lim sup aₙ = 1, lim inf aₙ = −1
  pièges : a1_limsup_as_sup

Soit aₙ = (−1)^n·(3n)/(n + 1) + 4/n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  (6m)/(2m + 1) + 4/(2m)
    = 6/(2 + □) + 4/(2m)   (trous : 6/(2 + 1/m) + 4/(2m))   ← Diviser par m
    = □   (trous : 3)   ← Limite
  — a₂ₘ₊₁ = −(3(2m + 1))/(2m + 2) + 4/(2m + 1) :  [juge limit]  départ : −(3(2m + 1))/(2m + 2) + 4/(2m + 1)
    = −(3(2 + 1/m))/(2 + □) + 4/(2m + 1)   (trous : −(3(2 + 1/m))/(2 + 2/m) + 4/(2m + 1))   ← Diviser par m
    = □   (trous : −3)   ← Limite
  — lim sup :  [juge value]  départ : max(3,−3)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 3 / · le plus grand terme de la suite, 4 / · la limite de a₂ₘ, quelle qu'elle soit
    = 3   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(3,−3)
    = −3   ← La plus petite limite
  aides : (−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément. | a₂ₘ → □, a₂ₘ₊₁ → □ | lim sup aₙ = 3, lim inf aₙ = −3
  pièges : a1_limsup_as_sup

```

### Niveau 2

```
Soit aₙ = √(n + (−1)^n) − √n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  √(2m + (−1)^(2m)) − √(2m)
    ? Comment découper la suite ? ✔ Selon la parité : n = 2m et n = 2m + 1 / ✔ Modulo 4 : n = 4m, 4m + 1, 4m + 2, 4m + 3 / · Pas besoin : on calcule directement la limite de aₙ
    = √(2m + 1) − √(2m)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ :  [juge limit]  départ : √(2m + 1) − √(2m)
    = 1/(√(2m + 1) + √(2m))   ← Quantité conjuguée
    = 0   ← Limite
  — a₂ₘ₊₁ :  [juge equiv]  départ : √(2m + 1 + (−1)^(2m + 1)) − √(2m + 1)
    = √(2m) − √(2m + 1)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ₊₁ :  [juge limit]  départ : √(2m) − √(2m + 1)
    = −1/(√(2m) + √(2m + 1))   ← Quantité conjuguée
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(0,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 0 / · la limite de a₂ₘ, quelle qu'elle soit
    = 0   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(0,0)
    = 0   ← La plus petite limite
  aides : (−1)ⁿ vaut 1 ou −1 selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | √(2m + 1) − √(2m) = 1/(□) | Les deux sous-suites tendent vers 0 : lim sup = lim inf = 0, la suite converge vers 0.

Soit aₙ = 7^(1/n) si n est pair, aₙ = 1/n² si n est impair. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  7^(1/(2m))
    ? Comment découper la suite ? ✔ Selon la parité : n = 2m et n = 2m + 1 / ✔ Modulo 4 : n = 4m, 4m + 1, 4m + 2, 4m + 3 / · Pas besoin : on calcule directement la limite de aₙ
    = e^(ln(7)/(2m))   ← Écrire en exponentielle
    = 1   ← Limite
  — a₂ₘ₊₁ = 1/(2m + 1)² :  [juge limit]  départ : 1/(2m + 1)²
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(1,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 1 / · le plus grand terme de la suite, √7 / · la limite de a₂ₘ, quelle qu'elle soit
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,0)
    = 0   ← La plus petite limite
  aides : La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | 7^(1/(2m)) = e^(□/(2m)) → □ | lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √7, atteint en n = 2).
  pièges : a1_limsup_as_sup

Soit aₙ = 7^(1/n) si n est pair, aₙ = 1/n³ si n est impair. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [guided]  7^(1/(2m))
    ? Comment découper la suite ? ✔ Selon la parité : n = 2m et n = 2m + 1 / ✔ Modulo 4 : n = 4m, 4m + 1, 4m + 2, 4m + 3 / · Pas besoin : on calcule directement la limite de aₙ
    = e^(ln(7)/(2m))   ← Écrire en exponentielle
    = 1   ← Limite
  — a₂ₘ₊₁ = 1/(2m + 1)³ :  [juge limit]  départ : 1/(2m + 1)³
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(1,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 1 / · le plus grand terme de la suite, √7 / · la limite de a₂ₘ, quelle qu'elle soit
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,0)
    = 0   ← La plus petite limite
  aides : La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | 7^(1/(2m)) = e^(□/(2m)) → □ | lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √7, atteint en n = 2).
  pièges : a1_limsup_as_sup

```

### Niveau 3

```
Soit aₙ = (−1)^n·(3n)/(n + 3) + 4/n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [tap, suivre l'erreur, menu steps]  (−1)^(2m)·(3(2m))/(2m + 3) + 4/(2m)
    = (6m)/(2m + 3) + 4/(2m)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ :  [juge limit]  départ : (6m)/(2m + 3) + 4/(2m)
    = 6/(2 + 3/m) + 4/(2m)   ← Diviser par m
    = 3   ← Limite
  — a₂ₘ₊₁ :  [juge equiv]  départ : (−1)^(2m + 1)·(3(2m + 1))/(2m + 1 + 3) + 4/(2m + 1)
    = −(3(2m + 1))/(2m + 4) + 4/(2m + 1)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ₊₁ :  [juge limit]  départ : −(3(2m + 1))/(2m + 4) + 4/(2m + 1)
    = −(3(2 + 1/m))/(2 + 4/m) + 4/(2m + 1)   ← Diviser par m
    = −3   ← Limite
  — lim sup :  [juge value]  départ : max(3,−3)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 3 / · le plus grand terme de la suite, 13/4 / · la limite de a₂ₘ, quelle qu'elle soit
    = 3   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(3,−3)
    = −3   ← La plus petite limite
  aides : (−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément. | a₂ₘ → □, a₂ₘ₊₁ → □ | lim sup aₙ = 3, lim inf aₙ = −3
  pièges : a1_limsup_as_sup

Soit aₙ = 3^(1/n) si n est pair, aₙ = 1/n si n est impair. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [tap, suivre l'erreur, menu steps]  3^(1/(2m))
    = e^(ln(3)/(2m))   ← Écrire en exponentielle
    = 1   ← Limite
  — a₂ₘ₊₁ = 1/(2m + 1) :  [juge limit]  départ : 1/(2m + 1)
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(1,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 1 / · le plus grand terme de la suite, √3 / · la limite de a₂ₘ, quelle qu'elle soit
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,0)
    = 0   ← La plus petite limite
  aides : La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | 3^(1/(2m)) = e^(□/(2m)) → □ | lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √3, atteint en n = 2).
  pièges : a1_limsup_as_sup

Soit aₙ = 7^(1/n) si n est pair, aₙ = 1/n³ si n est impair. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [tap, suivre l'erreur, menu steps]  7^(1/(2m))
    = e^(ln(7)/(2m))   ← Écrire en exponentielle
    = 1   ← Limite
  — a₂ₘ₊₁ = 1/(2m + 1)³ :  [juge limit]  départ : 1/(2m + 1)³
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(1,0)
    ? La lim sup de (aₙ), c'est : ✔ la plus grande limite des sous-suites, 1 / · le plus grand terme de la suite, √7 / · la limite de a₂ₘ, quelle qu'elle soit
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,0)
    = 0   ← La plus petite limite
  aides : La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | 7^(1/(2m)) = e^(□/(2m)) → □ | lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √7, atteint en n = 2).
  pièges : a1_limsup_as_sup

```

### Niveau 4

```
Soit aₙ = 6^(1/n) si n est pair, aₙ = 1/n² si n est impair. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [free, suivre l'erreur]  6^(1/(2m))
    = e^(ln(6)/(2m))   ← Écrire en exponentielle
    = 1   ← Limite
  — a₂ₘ₊₁ = 1/(2m + 1)² :  [juge limit]  départ : 1/(2m + 1)²
    = 0   ← Limite
  — lim sup :  [juge value]  départ : max(1,0)
    = 1   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(1,0)
    = 0   ← La plus petite limite
  aides : La suite est définie selon la parité : étudie a₂ₘ et a₂ₘ₊₁. | 6^(1/(2m)) = e^(□/(2m)) → □ | lim sup aₙ = 1, lim inf aₙ = 0 (et sup des termes = √6, atteint en n = 2).

Soit aₙ = (−1)^n·(3n)/(n + 2) + 4/n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [free, suivre l'erreur]  (−1)^(2m)·(3(2m))/(2m + 2) + 4/(2m)
    = (6m)/(2m + 2) + 4/(2m)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ :  [juge limit]  départ : (6m)/(2m + 2) + 4/(2m)
    = 6/(2 + 2/m) + 4/(2m)   ← Diviser par m
    = 3   ← Limite
  — a₂ₘ₊₁ :  [juge equiv]  départ : (−1)^(2m + 1)·(3(2m + 1))/(2m + 1 + 2) + 4/(2m + 1)
    = −(3(2m + 1))/(2m + 3) + 4/(2m + 1)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ₊₁ :  [juge limit]  départ : −(3(2m + 1))/(2m + 3) + 4/(2m + 1)
    = −(3(2 + 1/m))/(2 + 3/m) + 4/(2m + 1)   ← Diviser par m
    = −3   ← Limite
  — lim sup :  [juge value]  départ : max(3,−3)
    = 3   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(3,−3)
    = −3   ← La plus petite limite
  aides : (−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément. | a₂ₘ → □, a₂ₘ₊₁ → □ | lim sup aₙ = 3, lim inf aₙ = −3

Soit aₙ = (−1)^n·(2n)/(n + 1) + 4/n. Calcule la limite de chaque sous-suite, puis lim sup aₙ et lim inf aₙ.
  [free, suivre l'erreur]  (−1)^(2m)·(2(2m))/(2m + 1) + 4/(2m)
    = (4m)/(2m + 1) + 4/(2m)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ :  [juge limit]  départ : (4m)/(2m + 1) + 4/(2m)
    = 4/(2 + 1/m) + 4/(2m)   ← Diviser par m
    = 2   ← Limite
  — a₂ₘ₊₁ :  [juge equiv]  départ : (−1)^(2m + 1)·(2(2m + 1))/(2m + 1 + 1) + 4/(2m + 1)
    = −(2(2m + 1))/(2m + 2) + 4/(2m + 1)   ← Remplacer n, puis simplifier
  — Limite de a₂ₘ₊₁ :  [juge limit]  départ : −(2(2m + 1))/(2m + 2) + 4/(2m + 1)
    = −(2(2 + 1/m))/(2 + 2/m) + 4/(2m + 1)   ← Diviser par m
    = −2   ← Limite
  — lim sup :  [juge value]  départ : max(2,−2)
    = 2   ← La plus grande limite
  — lim inf :  [juge value]  départ : min(2,−2)
    = −2   ← La plus petite limite
  aides : (−1)ⁿ change selon la parité : regarde n = 2m et n = 2m + 1 séparément. | a₂ₘ → □, a₂ₘ₊₁ → □ | lim sup aₙ = 2, lim inf aₙ = −2

```

### Niveau 5

```
Soit aₙ = √(n + (−1)^n) − √n. Que valent lim sup aₙ et lim inf aₙ ?
  ✔ lim sup aₙ = 0, lim inf aₙ = 0   · lim sup aₙ = 1, lim inf aₙ = −1   · lim sup et lim inf n'existent pas : la suite oscille

Soit aₙ = (−1)^n·(4n)/(n + 1) + 2/n. Que valent lim sup aₙ et lim inf aₙ ?
  · lim sup aₙ = −4, lim inf aₙ = 4   · lim sup aₙ = 1, lim inf aₙ = −1   ✔ lim sup aₙ = 4, lim inf aₙ = −4   · lim sup aₙ = 4, lim inf aₙ = 4

Soit aₙ = √(n + (−1)^n) − √n. Que valent lim sup aₙ et lim inf aₙ ?
  · lim sup et lim inf n'existent pas : la suite oscille   · lim sup aₙ = 1, lim inf aₙ = −1   ✔ lim sup aₙ = 0, lim inf aₙ = 0

```

### Variantes d'examen

```
Soit aₙ = 5^(1/n) si n est pair, aₙ = 1/n³ si n est impair. Que valent lim sup aₙ et lim inf aₙ ?
  ✔ lim sup aₙ = 1, lim inf aₙ = 0   · lim sup aₙ = √5, lim inf aₙ = 0 [a1_limsup_as_sup]   · lim sup aₙ = 0, lim inf aₙ = 1   · lim sup aₙ = 1, lim inf aₙ = 1
  [examen mcq]
  pièges : a1_limsup_as_sup

Vrai ou faux ?
  « Si a₂ₘ → ℓ et a₂ₘ₊₁ → ℓ, alors aₙ → ℓ. » → VRAI
  [examen tf]

```

## Suites aₙ₊₁ = q·aₙ + c : formule explicite (`a1-seq-affine`, BA1)

_Le point fixe L, l'écart aₙ − L géométrique, puis la limite._

### Niveau 1

```
a₀ = 3 et a_(n + 1) = 2a_n + 6. Trouve la formule explicite de aₙ, puis la limite. Le point fixe est L = −6.
  [guided]  b_0
    (bₙ = aₙ + 6 est géométrique de raison q = 2. Son premier terme :)
    = 3 − (□)   (trous : 3 − (−6))   ← b₀ = a₀ − L
    = 9   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −6 + □·2^n   (trous : −6 + 9·2^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 9·2^n − 6
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 6 = 2ⁿ·(▢) | aₙ = 9·2^n − 6

a₀ = 6 et a_(n + 1) = −a_n/2 + 12. Trouve la formule explicite de aₙ, puis la limite. Le point fixe est L = 8.
  [guided]  b_0
    (bₙ = aₙ − 8 est géométrique de raison q = −1/2. Son premier terme :)
    = 6 − □   (trous : 6 − 8)   ← b₀ = a₀ − L
    = −2   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = 8 + (□)·(−1/2)^n   (trous : 8 + (−2)·(−1/2)^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 8 − 2(−1/2)^n
    = 8   ← qⁿ → 0
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ − 8 = (−1/2)ⁿ·(▢) | aₙ = 8 − 2(−1/2)^n

a₀ = 9 et a_(n + 1) = (3/4)a_n + 2. Trouve la formule explicite de aₙ, puis la limite. Le point fixe est L = 8.
  [guided]  b_0
    (bₙ = aₙ − 8 est géométrique de raison q = 3/4. Son premier terme :)
    = 9 − □   (trous : 9 − 8)   ← b₀ = a₀ − L
    = 1   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = 8 + □·(3/4)^n   (trous : 8 + 1·(3/4)^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 8 + (3/4)^n
    = 8   ← qⁿ → 0
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ − 8 = (3/4)ⁿ·(▢) | aₙ = 8 + (3/4)^n

```

### Niveau 2

```
a₀ = −2 et a_(n + 1) = 3a_n + 8. Trouve la formule explicite de aₙ, puis la limite.
  [guided]  L = 3L + 8
    (Point fixe : résous L = qL + c.)
    = −2L = □   (trous : −2L = 8)   ← Regrouper les L
    = L = −4   ← Diviser
  — bₙ = aₙ + 4 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = −2 − (−4)   ← b₀ = a₀ − L
    = 2   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −4 + □·3^n   (trous : −4 + 2·3^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 2·3^n − 4
    ? La suite converge-t-elle vers le point fixe ? ✔ Non : q = 3 > 1, l'écart 2·3ⁿ grandit / · Oui : L = −4 vérifie L = qL + c
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 4 = 3ⁿ·(▢) | aₙ = 2·3^n − 4
  pièges : a1_rec_limit_without_convergence

a₀ = 1 et a_(n + 1) = (2/3)a_n − 2. Trouve la formule explicite de aₙ, puis la limite.
  [guided]  L = (2/3)L − 2
    (Point fixe : résous L = qL + c.)
    = (1/3)L = □   (trous : (1/3)L = −2)   ← Regrouper les L
    = L = −6   ← Diviser
  — bₙ = aₙ + 6 est géométrique de raison q = 2/3. Son premier terme :  [juge value]  départ : b_0
    = 1 − (−6)   ← b₀ = a₀ − L
    = 7   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −6 + □·(2/3)^n   (trous : −6 + 7·(2/3)^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : −6 + 7(2/3)^n
    ? Pourquoi aₙ → −6 ? ✔ |q| = 2/3 < 1, donc qⁿ → 0 / · −6 est le point fixe, donc la suite y tend
    = −6   ← qⁿ → 0
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 6 = (2/3)ⁿ·(▢) | aₙ = −6 + 7(2/3)^n
  pièges : a1_rec_limit_without_convergence

a₀ = 2 et a_(n + 1) = 3a_n − 2. Trouve la formule explicite de aₙ, puis la limite.
  [guided]  L = 3L − 2
    (Point fixe : résous L = qL + c.)
    = □L = −2   (trous : −2L = −2)   ← Regrouper les L
    = L = 1   ← Diviser
  — bₙ = aₙ − 1 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = 2 − 1   ← b₀ = a₀ − L
    = 1   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = □ + 1·3^n   (trous : 1 + 1·3^n)   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 3^n + 1
    ? La suite converge-t-elle vers le point fixe ? ✔ Non : q = 3 > 1, l'écart 1·3ⁿ grandit / · Oui : L = 1 vérifie L = qL + c
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ − 1 = 3ⁿ·(▢) | aₙ = 3^n + 1
  pièges : a1_rec_limit_without_convergence

```

### Niveau 3

```
a₀ = −3 et a_(n + 1) = 2a_n + 6. Trouve la formule explicite de aₙ, puis la limite.
  [tap, suivre l'erreur, menu steps]  L = 2L + 6
    (Point fixe : résous L = qL + c.)
    = −L = 6   ← Regrouper les L
    = L = −6   ← Diviser
  — bₙ = aₙ + 6 est géométrique de raison q = 2. Son premier terme :  [juge value]  départ : b_0
    = −3 − (−6)   ← b₀ = a₀ − L
    = 3   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −6 + 3·2^n   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 3·2^n − 6
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 6 = 2ⁿ·(▢) | aₙ = 3·2^n − 6

a₀ = 7 et a_(n + 1) = 3a_n + 10. Trouve la formule explicite de aₙ, puis la limite.
  [tap, suivre l'erreur, menu steps]  L = 3L + 10
    (Point fixe : résous L = qL + c.)
    = −2L = 10   ← Regrouper les L
    = L = −5   ← Diviser
  — bₙ = aₙ + 5 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = 7 − (−5)   ← b₀ = a₀ − L
    = 12   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −5 + 12·3^n   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 12·3^n − 5
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 5 = 3ⁿ·(▢) | aₙ = 12·3^n − 5

a₀ = −4 et a_(n + 1) = 3a_n + 4. Trouve la formule explicite de aₙ, puis la limite.
  [tap, suivre l'erreur, menu steps]  L = 3L + 4
    (Point fixe : résous L = qL + c.)
    = −2L = 4   ← Regrouper les L
    = L = −2   ← Diviser
  — bₙ = aₙ + 2 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = −4 − (−2)   ← b₀ = a₀ − L
    = −2   ← Calculer
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −2 + (−2)·3^n   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : −2·3^n − 2
    = −∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 2 = 3ⁿ·(▢) | aₙ = −2·3^n − 2

```

### Niveau 4

```
a₀ = −7 et a_(n + 1) = 3a_n + 8. Trouve la formule explicite de aₙ, puis la limite.
  [free, suivre l'erreur]  L = 3L + 8
    (Point fixe : résous L = qL + c.)
    = L = −4   ← Point fixe
  — bₙ = aₙ + 4 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = −3   ← b₀ = a₀ − L
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −3·3^n − 4   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : −3·3^n − 4
    ? La suite converge-t-elle vers le point fixe ? ✔ Non : q = 3 > 1, l'écart −3·3ⁿ grandit / · Oui : L = −4 vérifie L = qL + c
    = −∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 4 = 3ⁿ·(▢) | aₙ = −3·3^n − 4
  pièges : a1_rec_limit_without_convergence

a₀ = −5 et a_(n + 1) = (2/3)a_n + 2. Trouve la formule explicite de aₙ, puis la limite.
  [free, suivre l'erreur]  L = (2/3)L + 2
    (Point fixe : résous L = qL + c.)
    = L = 6   ← Point fixe
  — bₙ = aₙ − 6 est géométrique de raison q = 2/3. Son premier terme :  [juge value]  départ : b_0
    = −11   ← b₀ = a₀ − L
  — Formule explicite :  [juge equiv]  départ : a(n)
    = 6 − 11(2/3)^n   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 6 − 11(2/3)^n
    ? Pourquoi aₙ → 6 ? ✔ |q| = 2/3 < 1, donc qⁿ → 0 / · 6 est le point fixe, donc la suite y tend
    = 6   ← qⁿ → 0
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ − 6 = (2/3)ⁿ·(▢) | aₙ = 6 − 11(2/3)^n
  pièges : a1_rec_limit_without_convergence

a₀ = 1 et a_(n + 1) = 3a_n + 8. Trouve la formule explicite de aₙ, puis la limite.
  [free, suivre l'erreur]  L = 3L + 8
    (Point fixe : résous L = qL + c.)
    = L = −4   ← Point fixe
  — bₙ = aₙ + 4 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = 5   ← b₀ = a₀ − L
  — Formule explicite :  [juge equiv]  départ : a(n)
    = 5·3^n − 4   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : 5·3^n − 4
    ? La suite converge-t-elle vers le point fixe ? ✔ Non : q = 3 > 1, l'écart 5·3ⁿ grandit / · Oui : L = −4 vérifie L = qL + c
    = ∞   ← qⁿ → +∞
  aides : Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l'écart bₙ = aₙ − L : il est géométrique. | aₙ + 4 = 3ⁿ·(▢) | aₙ = 5·3^n − 4
  pièges : a1_rec_limit_without_convergence

```

### Niveau 5

```
a₀ = 7 et a_(n + 1) = 3a_n − 4. Quelle est la formule explicite de aₙ ?
  · 9·3^n − 2   · 7·3^n − 4 [a1_affine_rec_no_fixed_point]   · 7·3^n − 4n [a1_affine_rec_no_fixed_point]   ✔ 5·3^n + 2
  pièges : a1_affine_rec_no_fixed_point

a₀ = −1 et a_(n + 1) = 3a_n − 6. Trouve la formule explicite de aₙ, puis la limite.
  [free, sans aide]  L = 3L − 6
    (Point fixe : résous L = qL + c.)
    = L = 3   ← Point fixe
  — bₙ = aₙ − 3 est géométrique de raison q = 3. Son premier terme :  [juge value]  départ : b_0
    = −4   ← b₀ = a₀ − L
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −4·3^n + 3   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : −4·3^n + 3
    ? La suite converge-t-elle vers le point fixe ? ✔ Non : q = 3 > 1, l'écart −4·3ⁿ grandit / · Oui : L = 3 vérifie L = qL + c
    = −∞   ← qⁿ → +∞
  pièges : a1_rec_limit_without_convergence

a₀ = 6 et a_(n + 1) = a_n/2 − 1. Trouve la formule explicite de aₙ, puis la limite.
  [free, sans aide]  L = L/2 − 1
    (Point fixe : résous L = qL + c.)
    = L = −2   ← Point fixe
  — bₙ = aₙ + 2 est géométrique de raison q = 1/2. Son premier terme :  [juge value]  départ : b_0
    = 8   ← b₀ = a₀ − L
  — Formule explicite :  [juge equiv]  départ : a(n)
    = −2 + 8/2^n   ← aₙ = L + qⁿ·b₀
  — Limite de la suite :  [juge limit]  départ : −2 + 8/2^n
    ? Pourquoi aₙ → −2 ? ✔ |q| = 1/2 < 1, donc qⁿ → 0 / · −2 est le point fixe, donc la suite y tend
    = −2   ← qⁿ → 0
  pièges : a1_rec_limit_without_convergence

```

### Variantes d'examen

```
a₀ = −1 et a_(n + 1) = a_n/2 + 3. Que peut-on dire de la limite ?
  · lim aₙ = 3 [a1_affine_rec_no_fixed_point]   · lim aₙ = −1   ✔ lim aₙ = 6   · Elle n'a pas de limite : elle oscille
  [examen mcq]
  pièges : a1_affine_rec_no_fixed_point

Vrai ou faux ?
  « Pour tout a₀ ∈ ℝ, la suite a_(n + 1) = 2a_n − 3 converge vers 3, son point fixe. » → FAUX
    contre-exemple (refute) : a = 4
  [examen tf]
  pièges : a1_rec_limit_without_convergence

```

## Suite aₙ₊₁ = f(aₙ) : points fixes, signe de f(x) − x, intervalle stable (`a1-seq-rec-fixed`, BA1)

_Les candidats L = f(L), le sens donné par f(x) − x, la borne donnée par un intervalle stable._

### Niveau 1

```
On pose a₀ = 0 et a_(n + 1) = (a_n² + 6)/5. Étudie la suite : points fixes, sens de variation, limite. Les points fixes de f sont 2 et 3.
  [guided]  (x² + 6)/5 − x > 0
    (Signe de f(x) − x :)
    = (x² − 5x + 6)/5 > 0   ← Même dénominateur
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 2[ ∪ ]3 ; +∞[)   ← Signe du trinôme
  — Conclusion pour a₀ = 0 :  [juge value]  départ : lim_{n→∞} a_n
    (f est croissante et f(I) ⊂ I pour I = [0 ; 2[ : la suite reste dans I, elle croît et elle est bornée.)
    = 2   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]3 ; +∞[ | aₙ ∈ [0 ; 2[, croissante : aₙ → 2
  pièges : g9_bracket, g1_trinome_sign_swap

On pose a₀ = 7 et a_(n + 1) = a_n²/5. Étudie la suite : points fixes, sens de variation, limite. Les points fixes de f sont 0 et 5.
  [guided]  x²/5 − x > 0
    (Signe de f(x) − x :)
    = (x² − 5x)/5 > 0   ← Même dénominateur
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 0[ ∪ ]5 ; +∞[)   ← Signe du trinôme
  — Pour x > 5, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 14/5, donc aₙ ≥ 7 + (14/5)n. Limite de ce minorant :  [juge limit]  départ : 7 + (14/5)n
    (La suite croît et ne peut tendre vers aucun point fixe.)
    = ∞   ← aₙ → +∞
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]5 ; +∞[ | aₙ ≥ a₀ + n·δ, donc aₙ → +∞
  pièges : g9_bracket, g1_trinome_sign_swap

On pose a₀ = 10 et a_(n + 1) = (a_n² + 28)/11. Étudie la suite : points fixes, sens de variation, limite. Les points fixes de f sont 4 et 7.
  [guided]  (x² + 28)/11 − x > 0
    (Signe de f(x) − x :)
    = (x² − 11x + 28)/11 > 0   ← Même dénominateur
    = ]−∞ ; □[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 4[ ∪ ]7 ; +∞[)   ← Signe du trinôme
  — Pour x > 7, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 18/11, donc aₙ ≥ 10 + (18/11)n. Limite de ce minorant :  [juge limit]  départ : 10 + (18/11)n
    (La suite croît et ne peut tendre vers aucun point fixe.)
    = ∞   ← aₙ → +∞
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]7 ; +∞[ | aₙ ≥ a₀ + n·δ, donc aₙ → +∞
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Niveau 2

```
On pose a₀ = 9 et a_(n + 1) = √(10a_n − 16). Étudie la suite : points fixes, sens de variation, limite.
  [guided]  L = √(10L − 16)
    (Candidats : résous L = f(L).)
    = L² − 10L + 16 = 0   ← Élever au carré (L ≥ 0)
    = L = 2 ou L = □   (trous : L = 2 ou L = 8)   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : √(10x − 16) − x > 0
    = x² − 10x + 16 < 0   ← Les deux membres sont positifs : élever au carré
    = ]□ ; 8[   (trous : ]2 ; 8[)   ← Signe du trinôme
  — Conclusion pour a₀ = 9 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 9 ∈ ]8 ; +∞[. Pourquoi aₙ ∈ ]8 ; +∞[ pour tout n ? ✔ f est croissante, f(8) = 8 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]8 ; +∞[ / · Parce que a₀ ∈ ]8 ; +∞[
    ? Donc la suite (aₙ) : ✔ décroît (f(x) < x sur I) et est minorée par 8 : elle converge, vers 8 / · croît, parce que f est croissante / · décroît et tend vers −∞ / · est minorée par 8 : elle converge / · converge vers 2, l'autre point fixe
    = 8   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]▢ ; 8[ | aₙ ∈ ]8 ; +∞[, décroissante : aₙ → 8
  pièges : g1_irr_extraneous, a1_monotone_by_f_increasing, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a₀ = 4 et a_(n + 1) = √(5a_n). Étudie la suite : points fixes, sens de variation, limite.
  [guided]  L = √(5L)
    (Candidats : résous L = f(L).)
    = L² − 5L = 0   ← Élever au carré (L ≥ 0)
    = L = 0 ou L = □   (trous : L = 0 ou L = 5)   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : √(5x) − x > 0
    = x² − 5x < 0   ← Les deux membres sont positifs : élever au carré
    = ]□ ; 5[   (trous : ]0 ; 5[)   ← Signe du trinôme
  — Conclusion pour a₀ = 4 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 4 ∈ ]0 ; 5[. Pourquoi aₙ ∈ ]0 ; 5[ pour tout n ? ✔ f est croissante, f(0) = 0 et f(5) = 5 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]0 ; 5[ / · Parce que a₀ ∈ ]0 ; 5[
    ? Donc la suite (aₙ) : ✔ croît (f(x) > x sur I) et est majorée par 5 : elle converge, vers 5 / · croît et tend vers +∞ / · est bornée (elle reste dans ]0 ; 5[) : elle converge / · converge vers 0, l'autre point fixe
    = 5   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]▢ ; 5[ | aₙ ∈ ]0 ; 5[, croissante : aₙ → 5
  pièges : g1_irr_extraneous, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a₀ = 3 et a_(n + 1) = (a_n² + 10)/7. Étudie la suite : points fixes, sens de variation, limite.
  [guided]  L = (L² + 10)/7
    (Candidats : résous L = f(L).)
    = L² − 7L + 10 = 0   ← Multiplier par 7
    = L = 2 ou L = □   (trous : L = 2 ou L = 5)   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 10)/7 − x > 0
    = (x² − 7x + 10)/7 > 0   ← Même dénominateur
    = ]−∞ ; □[ ∪ ]5 ; +∞[   (trous : ]−∞ ; 2[ ∪ ]5 ; +∞[)   ← Signe du trinôme
  — Conclusion pour a₀ = 3 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 3 ∈ ]2 ; 5[. Pourquoi aₙ ∈ ]2 ; 5[ pour tout n ? ✔ f est croissante, f(2) = 2 et f(5) = 5 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]2 ; 5[ / · Parce que a₀ ∈ ]2 ; 5[
    ? Donc la suite (aₙ) : ✔ décroît (f(x) < x sur I) et est minorée par 2 : elle converge, vers 2 / · croît, parce que f est croissante / · décroît et tend vers −∞ / · est bornée (elle reste dans ]2 ; 5[) : elle converge / · converge vers 5, l'autre point fixe
    = 2   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]5 ; +∞[ | aₙ ∈ ]2 ; 5[, décroissante : aₙ → 2
  pièges : a1_monotone_by_f_increasing, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

```

### Niveau 3

```
On pose a₀ = 9 et a_(n + 1) = √(8a_n − 7). Étudie la suite : points fixes, sens de variation, limite.
  [tap, suivre l'erreur, menu steps]  L = √(8L − 7)
    (Candidats : résous L = f(L).)
    = L² − 8L + 7 = 0   ← Élever au carré (L ≥ 0)
    = L = 1 ou L = 7   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : √(8x − 7) − x > 0
    = x² − 8x + 7 < 0   ← Les deux membres sont positifs : élever au carré
    = ]1 ; 7[   ← Signe du trinôme
  — Conclusion pour a₀ = 9 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 9 ∈ ]7 ; +∞[. Pourquoi aₙ ∈ ]7 ; +∞[ pour tout n ? ✔ f est croissante, f(7) = 7 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]7 ; +∞[ / · Parce que a₀ ∈ ]7 ; +∞[
    ? Donc la suite (aₙ) : ✔ décroît (f(x) < x sur I) et est minorée par 7 : elle converge, vers 7 / · croît, parce que f est croissante / · décroît et tend vers −∞ / · est minorée par 7 : elle converge / · converge vers 1, l'autre point fixe
    = 7   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]▢ ; 7[ | aₙ ∈ ]7 ; +∞[, décroissante : aₙ → 7
  pièges : g1_irr_extraneous, a1_monotone_by_f_increasing, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a₀ = 2 et a_(n + 1) = a_n²/6. Étudie la suite : points fixes, sens de variation, limite.
  [tap, suivre l'erreur, menu steps]  L = L²/6
    (Candidats : résous L = f(L).)
    = L² − 6L = 0   ← Multiplier par 6
    = L = 0 ou L = 6   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : x²/6 − x > 0
    = (x² − 6x)/6 > 0   ← Même dénominateur
    = ]−∞ ; 0[ ∪ ]6 ; +∞[   ← Signe du trinôme
  — Conclusion pour a₀ = 2 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 2 ∈ ]0 ; 6[. Pourquoi aₙ ∈ ]0 ; 6[ pour tout n ? ✔ f est croissante, f(0) = 0 et f(6) = 6 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]0 ; 6[ / · Parce que a₀ ∈ ]0 ; 6[
    ? Donc la suite (aₙ) : ✔ décroît (f(x) < x sur I) et est minorée par 0 : elle converge, vers 0 / · croît, parce que f est croissante / · décroît et tend vers −∞ / · est bornée (elle reste dans ]0 ; 6[) : elle converge / · converge vers 6, l'autre point fixe
    = 0   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]6 ; +∞[ | aₙ ∈ ]0 ; 6[, décroissante : aₙ → 0
  pièges : a1_monotone_by_f_increasing, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a₀ = 1 et a_(n + 1) = (a_n² + 4)/4. Étudie la suite : points fixes, sens de variation, limite.
  [tap, suivre l'erreur, menu steps]  L = (L² + 4)/4
    (Candidats : résous L = f(L).)
    = L² − 4L + 4 = 0   ← Multiplier par 4
    = L = 2   ← Racines du trinôme
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 4)/4 − x > 0
    = (x − 2)²/4 > 0   ← Même dénominateur
    = ]−∞ ; 2[ ∪ ]2 ; +∞[   ← Signe du trinôme
  — Conclusion pour a₀ = 1 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 1 ∈ [0 ; 2[. Pourquoi aₙ ∈ [0 ; 2[ pour tout n ? ✔ f est croissante, f(0) = 1 ≥ 0 et f(2) = 2 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur [0 ; 2[ / · Parce que a₀ ∈ [0 ; 2[
    ? Donc la suite (aₙ) : ✔ croît (f(x) > x sur I) et est majorée par 2 : elle converge, vers 2 / · croît et tend vers +∞ / · est bornée (elle reste dans [0 ; 2[) : elle converge
    = 2   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]2 ; +∞[ | aₙ ∈ [0 ; 2[, croissante : aₙ → 2
  pièges : a1_bounded_implies_convergent

```

### Niveau 4

```
On pose a₀ = 4 et a_(n + 1) = (a_n² + 1)/2. Étudie la suite : points fixes, sens de variation, limite.
  [free, suivre l'erreur]  L = (L² + 1)/2
    (Candidats : résous L = f(L).)
    = L = 1   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 1)/2 − x > 0
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← Signe de f(x) − x
  — Pour x > 1, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 9/2, donc aₙ ≥ 4 + (9/2)n. Limite de ce minorant :  [juge limit]  départ : 4 + (9/2)n
    ? a₀ = 4 > 1. La suite (aₙ) : ✔ croît (f(x) > x pour x > 1) ; une limite serait un point fixe ≥ a₀, il n'y en a pas / · converge vers 1, le point fixe / · croît et elle est minorée par 1 : elle converge
    = ∞   ← aₙ → +∞
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]1 ; +∞[ | aₙ ≥ a₀ + n·δ, donc aₙ → +∞
  pièges : a1_rec_limit_without_convergence

On pose a₀ = 3 et a_(n + 1) = (a_n² + 24)/10. Étudie la suite : points fixes, sens de variation, limite.
  [free, suivre l'erreur]  L = (L² + 24)/10
    (Candidats : résous L = f(L).)
    = L = 4 ou L = 6   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 24)/10 − x > 0
    = ]−∞ ; 4[ ∪ ]6 ; +∞[   ← Signe de f(x) − x
  — Conclusion pour a₀ = 3 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 3 ∈ [0 ; 4[. Pourquoi aₙ ∈ [0 ; 4[ pour tout n ? ✔ f est croissante, f(0) = 12/5 ≥ 0 et f(4) = 4 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur [0 ; 4[ / · Parce que a₀ ∈ [0 ; 4[
    ? Donc la suite (aₙ) : ✔ croît (f(x) > x sur I) et est majorée par 4 : elle converge, vers 4 / · croît et tend vers +∞ / · est bornée (elle reste dans [0 ; 4[) : elle converge / · converge vers 6, l'autre point fixe
    = 4   ← Monotone et bornée : la limite est un point fixe
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]6 ; +∞[ | aₙ ∈ [0 ; 4[, croissante : aₙ → 4
  pièges : a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a₀ = 6 et a_(n + 1) = (a_n² + 20)/9. Étudie la suite : points fixes, sens de variation, limite.
  [free, suivre l'erreur]  L = (L² + 20)/9
    (Candidats : résous L = f(L).)
    = L = 4 ou L = 5   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 20)/9 − x > 0
    = ]−∞ ; 4[ ∪ ]5 ; +∞[   ← Signe de f(x) − x
  — Pour x > 5, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 2/9, donc aₙ ≥ 6 + (2/9)n. Limite de ce minorant :  [juge limit]  départ : 6 + (2/9)n
    ? a₀ = 6 > 5. La suite (aₙ) : ✔ croît (f(x) > x pour x > 5) ; une limite serait un point fixe ≥ a₀, il n'y en a pas / · converge vers 5, un point fixe / · croît et elle est minorée par 5 : elle converge
    = ∞   ← aₙ → +∞
  aides : Trouve d'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c'est le signe de f(x) − x. | f(x) − x > 0 ⇔ x ∈ ]−∞ ; ▢[ ∪ ]5 ; +∞[ | aₙ ≥ a₀ + n·δ, donc aₙ → +∞
  pièges : a1_rec_limit_without_convergence

```

### Niveau 5

```
On pose a_(n + 1) = (a_n² + 9)/6. Étudie la suite pour a₀ = 0, puis pour a₀ = 4.
  [free, sans aide]  L = (L² + 9)/6
    (Candidats : résous L = f(L).)
    = L = 3   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 9)/6 − x > 0
    = ]−∞ ; 3[ ∪ ]3 ; +∞[   ← Signe de f(x) − x
  — (1) Conclusion pour a₀ = 0 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 0 ∈ [0 ; 3[. Pourquoi aₙ ∈ [0 ; 3[ pour tout n ? ✔ f est croissante, f(0) = 3/2 ≥ 0 et f(3) = 3 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur [0 ; 3[ / · Parce que a₀ ∈ [0 ; 3[
    ? Donc la suite (aₙ) : ✔ croît (f(x) > x sur I) et est majorée par 3 : elle converge, vers 3 / · croît et tend vers +∞ / · est bornée (elle reste dans [0 ; 3[) : elle converge
    = 3   ← Monotone et bornée : la limite est un point fixe
  — (2) Pour x > 3, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 1/6, donc aₙ ≥ 4 + (1/6)n. Limite de ce minorant :  [juge limit]  départ : 4 + (1/6)n
    ? a₀ = 4 > 3. La suite (aₙ) : ✔ croît (f(x) > x pour x > 3) ; une limite serait un point fixe ≥ a₀, il n'y en a pas / · converge vers 3, le point fixe / · croît et elle est minorée par 3 : elle converge
    = ∞   ← aₙ → +∞
  pièges : a1_bounded_implies_convergent, a1_rec_limit_without_convergence

On pose a_(n + 1) = (a_n² + 16)/8. Étudie la suite pour a₀ = 6, puis pour a₀ = 0.
  [free, sans aide]  L = (L² + 16)/8
    (Candidats : résous L = f(L).)
    = L = 4   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 16)/8 − x > 0
    = ]−∞ ; 4[ ∪ ]4 ; +∞[   ← Signe de f(x) − x
  — (1) Pour x > 4, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 1/2, donc aₙ ≥ 6 + (1/2)n. Limite de ce minorant :  [juge limit]  départ : 6 + (1/2)n
    ? a₀ = 6 > 4. La suite (aₙ) : ✔ croît (f(x) > x pour x > 4) ; une limite serait un point fixe ≥ a₀, il n'y en a pas / · converge vers 4, le point fixe / · croît et elle est minorée par 4 : elle converge
    = ∞   ← aₙ → +∞
  — (2) Conclusion pour a₀ = 0 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 0 ∈ [0 ; 4[. Pourquoi aₙ ∈ [0 ; 4[ pour tout n ? ✔ f est croissante, f(0) = 2 ≥ 0 et f(4) = 4 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur [0 ; 4[ / · Parce que a₀ ∈ [0 ; 4[
    ? Donc la suite (aₙ) : ✔ croît (f(x) > x sur I) et est majorée par 4 : elle converge, vers 4 / · croît et tend vers +∞ / · est bornée (elle reste dans [0 ; 4[) : elle converge
    = 4   ← Monotone et bornée : la limite est un point fixe
  pièges : a1_rec_limit_without_convergence, a1_bounded_implies_convergent

On pose a_(n + 1) = (a_n² + 10)/7. Étudie la suite pour a₀ = 4, puis pour a₀ = 6.
  [free, sans aide]  L = (L² + 10)/7
    (Candidats : résous L = f(L).)
    = L = 2 ou L = 5   ← Points fixes
  — Signe de f(x) − x :  [juge solset]  départ : (x² + 10)/7 − x > 0
    = ]−∞ ; 2[ ∪ ]5 ; +∞[   ← Signe de f(x) − x
  — (1) Conclusion pour a₀ = 4 :  [juge value]  départ : lim_{n→∞} a_n
    ? a₀ = 4 ∈ ]2 ; 5[. Pourquoi aₙ ∈ ]2 ; 5[ pour tout n ? ✔ f est croissante, f(2) = 2 et f(5) = 5 : f(I) ⊂ I, puis récurrence / · Parce que f(x) − x garde un signe sur ]2 ; 5[ / · Parce que a₀ ∈ ]2 ; 5[
    ? Donc la suite (aₙ) : ✔ décroît (f(x) < x sur I) et est minorée par 2 : elle converge, vers 2 / · croît, parce que f est croissante / · décroît et tend vers −∞ / · est bornée (elle reste dans ]2 ; 5[) : elle converge / · converge vers 5, l'autre point fixe
    = 2   ← Monotone et bornée : la limite est un point fixe
  — (2) Pour x > 5, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = 4/7, donc aₙ ≥ 6 + (4/7)n. Limite de ce minorant :  [juge limit]  départ : 6 + (4/7)n
    ? a₀ = 6 > 5. La suite (aₙ) : ✔ croît (f(x) > x pour x > 5) ; une limite serait un point fixe ≥ a₀, il n'y en a pas / · converge vers 5, un point fixe / · croît et elle est minorée par 5 : elle converge
    = ∞   ← aₙ → +∞
  pièges : a1_monotone_by_f_increasing, a1_bounded_implies_convergent, a1_rec_limit_without_convergence

```

### Variantes d'examen

```
On pose a₀ = 1/2 et a_(n + 1) = (a_n² + 7)/8. Que vaut la limite de (aₙ) ?
  · lim aₙ = +∞   · lim aₙ = 7 [a1_rec_limit_without_convergence]   · lim aₙ = 1/2   ✔ lim aₙ = 1
  [examen mcq]
  pièges : a1_rec_limit_without_convergence

Vrai ou faux ?
  « Pour tout a₀ ≥ 0, la suite a_(n + 1) = a_n²/2 converge vers 0 ou vers 2. » → FAUX
    contre-exemple (refute) : a = 3
  [examen tf]
  pièges : a1_rec_limit_without_convergence

```

## Suite récurrente par l'étude complète de f (problème long) (`a1-seq-rec-study`, BA1)

_Étudier f, comparer son graphe à y = x, puis discuter la suite selon a₁._

### Niveau 1

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n + (a_n + 2)/(a_n + 1), avec f(x) = x + (x + 2)/(x + 1) (a₁ ≠ −1). On sait que : la seule limite possible est −2 ; f′(x) = (x + 2)x/(x + 1)² ; f croît sur ]−∞ ; −2[ ∪ ]0 ; +∞[ et décroît ailleurs (hors de −1) ; max local f(−2) = −2, min local f(0) = 2 ; asymptotes x = −1 et y = x + 1. (c) Compare le graphe de f à la droite y = x.
  [guided]  x + (x + 2)/(x + 1) > x
    ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
    = (x + 2)/(x + 1) > 0   ← Retrancher x
    = ]−∞ ; −2[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −2[ ∪ ]−1 ; +∞[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x + (x + 2)/(x + 1) < x
    = (x + 2)/(x + 1) < 0   ← Retrancher x
    = ]□ ; −1[   (trous : ]−2 ; −1[)   ← Signe du quotient
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−∞ ; −1[, le maximum de f vaut ▢ : c'est un point fixe. | f(x) ≤ −2 pour x < −1, donc dès a₂ la suite reste sous −2, et elle converge vers −2.
  pièges : g1_pole_closed, g9_bracket

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n + a_n/(2a_n − 1), avec f(x) = x + x/(2x − 1) (a₁ ≠ 1/2). On sait que : la seule limite possible est 0 ; f′(x) = 4x(x − 1)/(2x − 1)² ; f croît sur ]−∞ ; 0[ ∪ ]1 ; +∞[ et décroît ailleurs (hors de 1/2) ; max local f(0) = 0, min local f(1) = 2 ; asymptotes x = 1/2 et y = x + 1/2. (c) Compare le graphe de f à la droite y = x.
  [guided]  x + x/(2x − 1) > x
    ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
    = x/(2x − 1) > 0   ← Retrancher x
    = ]−∞ ; 0[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 0[ ∪ ]1/2 ; +∞[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x + x/(2x − 1) < x
    = x/(2x − 1) < 0   ← Retrancher x
    = ]□ ; 1/2[   (trous : ]0 ; 1/2[)   ← Signe du quotient
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−∞ ; 1/2[, le maximum de f vaut ▢ : c'est un point fixe. | f(x) ≤ 0 pour x < 1/2, donc dès a₂ la suite reste sous 0, et elle converge vers 0.
  pièges : g1_pole_closed, g9_bracket

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − a_n/(a_n + 1), avec f(x) = x − x/(x + 1) (a₁ ≠ −1). On sait que : la seule limite possible est 0 ; f′(x) = x(x + 2)/(x + 1)² ; f croît sur ]−∞ ; −2[ ∪ ]0 ; +∞[ et décroît ailleurs (hors de −1) ; min local f(0) = 0, max local f(−2) = −4 ; asymptotes x = −1 et y = x − 1. (c) Compare le graphe de f à la droite y = x.
  [guided]  x − x/(x + 1) > x
    ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
    = −x/(x + 1) > 0   ← Retrancher x
    = ]□ ; 0[   (trous : ]−1 ; 0[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x − x/(x + 1) < x
    = −x/(x + 1) < 0   ← Retrancher x
    = ]−∞ ; −1[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −1[ ∪ ]0 ; +∞[)   ← Signe du quotient
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−1 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ 0 pour x > −1, donc dès a₂ la suite reste au-dessus de 0, et elle converge vers 0.
  pièges : g1_pole_closed, g9_bracket

```

### Niveau 2

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n + (a_n + 3)/(2a_n + 5), avec f(x) = x + (x + 3)/(2x + 5) (a₁ ≠ −5/2). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [guided]  L = L + (L + 3)/(2L + 5)
    ((a) Seule limite possible : résous L = f(L).)
    = (L + 3)/(2L + 5) = 0   ← Retrancher L
    = L = □   (trous : L = −3)   ← Une fraction est nulle si son numérateur l'est
  — (b) Dérive f :  [juge equiv]  départ : (x + (x + 3)/(2x + 5))′
    = 1 − 1/□   (trous : 1 − 1/(2x + 5)²)   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x + 5)² > 0
    = 4(x + 3)(x + 2)/(2x + 5)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; −3[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −3[ ∪ ]−2 ; +∞[)   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x + 5)²)′
    = □/(2x + 5)³   (trous : 4/(2x + 5)³)   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x + 5)³ > 0
    = ]−5/2 ; +∞[   ← Signe de (2x + 5)³
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x + (x + 3)/(2x + 5) > x
    = (x + 3)/(2x + 5) > 0   ← Retrancher x
    = ]−∞ ; −3[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −3[ ∪ ]−5/2 ; +∞[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x + (x + 3)/(2x + 5) < x
    = (x + 3)/(2x + 5) < 0   ← Retrancher x
    = ]□ ; −5/2[   (trous : ]−3 ; −5/2[)   ← Signe du quotient
  — (d) Pour a₁ < −5/2 : le maximum de f sur ]−∞ ; −5/2[ vaut  [juge value]  départ : M
    ? Si a₁ > −5/2 : ✔ f(x) > x et f(x) ≥ −1 > −5/2 sur ]−5/2 ; +∞[ : (aₙ) croît ; une limite serait un point fixe > −5/2, il n'y en a pas : aₙ → +∞ / · aₙ → −3, le seul point fixe / · (aₙ) croît et elle est minorée par −1 : elle converge
    = −3   ← f(−3) = −3, extremum local et point fixe
  — Si a₁ < −3, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ < −3 : ✔ aₙ < −3 pour tout n (−3 est le maximum de f sur ]−∞ ; −5/2[) et f(x) > x : (aₙ) croît, majorée par −3, donc aₙ → −3 / · f est croissante sur ]−∞ ; −3] : (aₙ) croît sans borne, aₙ → +∞ / · (aₙ) décroît et tend vers −∞ / · (aₙ) croît et converge vers −5/2
    ? Si a₁ est entre −3 et −5/2 : ✔ a₂ = f(a₁) < −3 : on est ramené au cas a₁ < −3, donc aₙ → −3 / · f(x) < x sur cet intervalle : (aₙ) décroît et tend vers −∞ / · (aₙ) décroît et elle est minorée par −3 : aₙ → −3
    = −3   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = −3 donne une suite constante).  [juge solset]  départ : x < −3 ou x = −3 ou (−3 < x et x < −5/2)
    = ]−∞ ; −5/2[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−∞ ; −5/2[, le maximum de f vaut ▢ : c'est un point fixe. | f(x) ≤ −3 pour x < −5/2, donc dès a₂ la suite reste sous −3, et elle converge vers −3.
  pièges : a1_rec_limit_without_convergence

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n + 3)/(a_n + 4), avec f(x) = x − (x + 3)/(x + 4) (a₁ ≠ −4). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [guided]  L = L − (L + 3)/(L + 4)
    ((a) Seule limite possible : résous L = f(L).)
    = (L + 3)/(L + 4) = 0   ← Retrancher L
    = L = □   (trous : L = −3)   ← Une fraction est nulle si son numérateur l'est
  — (b) Dérive f :  [juge equiv]  départ : (x − (x + 3)/(x + 4))′
    = 1 − 1/□   (trous : 1 − 1/(x + 4)²)   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x + 4)² > 0
    = (x + 3)(x + 5)/(x + 4)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; −5[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −5[ ∪ ]−3 ; +∞[)   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x + 4)²)′
    = □/(x + 4)³   (trous : 2/(x + 4)³)   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x + 4)³ > 0
    = ]−4 ; +∞[   ← Signe de (x + 4)³
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x + 3)/(x + 4) > x
    = −(x + 3)/(x + 4) > 0   ← Retrancher x
    = ]□ ; −3[   (trous : ]−4 ; −3[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x − (x + 3)/(x + 4) < x
    = −(x + 3)/(x + 4) < 0   ← Retrancher x
    = ]−∞ ; −4[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −4[ ∪ ]−3 ; +∞[)   ← Signe du quotient
  — (d) Pour a₁ > −4 : le minimum de f sur ]−4 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < −4 : ✔ f(x) < x et f(x) ≤ −7 < −4 sur ]−∞ ; −4[ : (aₙ) décroît ; une limite serait un point fixe < −4, il n'y en a pas : aₙ → −∞ / · aₙ → −3, le seul point fixe / · (aₙ) décroît et elle est majorée par −7 : elle converge
    = −3   ← f(−3) = −3, extremum local et point fixe
  — Si a₁ > −3, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > −3 : ✔ aₙ > −3 pour tout n (−3 est le minimum de f sur ]−4 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par −3, donc aₙ → −3 / · f est croissante sur [−3 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers −4
    ? Si a₁ est entre −4 et −3 : ✔ a₂ = f(a₁) > −3 : on est ramené au cas a₁ > −3, donc aₙ → −3 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par −3 : aₙ → −3
    = −3   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = −3 donne une suite constante).  [juge solset]  départ : x > −3 ou x = −3 ou (−4 < x et x < −3)
    = ]−4 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−4 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ −3 pour x > −4, donc dès a₂ la suite reste au-dessus de −3, et elle converge vers −3.
  pièges : a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n + (a_n − 2)/(2a_n − 5), avec f(x) = x + (x − 2)/(2x − 5) (a₁ ≠ 5/2). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [guided]  L = L + (L − 2)/(2L − 5)
    ((a) Seule limite possible : résous L = f(L).)
    = (L − 2)/(2L − 5) = 0   ← Retrancher L
    = L = □   (trous : L = 2)   ← Une fraction est nulle si son numérateur l'est
  — (b) Dérive f :  [juge equiv]  départ : (x + (x − 2)/(2x − 5))′
    = 1 − 1/□   (trous : 1 − 1/(2x − 5)²)   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x − 5)² > 0
    = 4(x − 2)(x − 3)/(2x − 5)² > 0   ← Même dénominateur, factoriser
    = ]−∞ ; 2[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 2[ ∪ ]3 ; +∞[)   ← Signe des facteurs
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x − 5)²)′
    = □/(2x − 5)³   (trous : 4/(2x − 5)³)   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x − 5)³ > 0
    = ]5/2 ; +∞[   ← Signe de (2x − 5)³
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x + (x − 2)/(2x − 5) > x
    = (x − 2)/(2x − 5) > 0   ← Retrancher x
    = ]−∞ ; 2[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 2[ ∪ ]5/2 ; +∞[)   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x + (x − 2)/(2x − 5) < x
    = (x − 2)/(2x − 5) < 0   ← Retrancher x
    = ]□ ; 5/2[   (trous : ]2 ; 5/2[)   ← Signe du quotient
  — (d) Pour a₁ < 5/2 : le maximum de f sur ]−∞ ; 5/2[ vaut  [juge value]  départ : M
    ? Si a₁ > 5/2 : ✔ f(x) > x et f(x) ≥ 4 > 5/2 sur ]5/2 ; +∞[ : (aₙ) croît ; une limite serait un point fixe > 5/2, il n'y en a pas : aₙ → +∞ / · aₙ → 2, le seul point fixe / · (aₙ) croît et elle est minorée par 4 : elle converge
    = 2   ← f(2) = 2, extremum local et point fixe
  — Si a₁ < 2, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ < 2 : ✔ aₙ < 2 pour tout n (2 est le maximum de f sur ]−∞ ; 5/2[) et f(x) > x : (aₙ) croît, majorée par 2, donc aₙ → 2 / · f est croissante sur ]−∞ ; 2] : (aₙ) croît sans borne, aₙ → +∞ / · (aₙ) décroît et tend vers −∞ / · (aₙ) croît et converge vers 5/2
    ? Si a₁ est entre 2 et 5/2 : ✔ a₂ = f(a₁) < 2 : on est ramené au cas a₁ < 2, donc aₙ → 2 / · f(x) < x sur cet intervalle : (aₙ) décroît et tend vers −∞ / · (aₙ) décroît et elle est minorée par 2 : aₙ → 2
    = 2   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = 2 donne une suite constante).  [juge solset]  départ : x < 2 ou x = 2 ou (2 < x et x < 5/2)
    = ]−∞ ; 5/2[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−∞ ; 5/2[, le maximum de f vaut ▢ : c'est un point fixe. | f(x) ≤ 2 pour x < 5/2, donc dès a₂ la suite reste sous 2, et elle converge vers 2.
  pièges : a1_rec_limit_without_convergence

```

### Niveau 3

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n + a_n/(2a_n − 1), avec f(x) = x + x/(2x − 1) (a₁ ≠ 1/2). On sait que f a un maximum local en 0, f(0) = 0, et que x = 1/2 est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.
  [tap, suivre l'erreur, menu steps]  L = L + L/(2L − 1)
    ((a) Seule limite possible : résous L = f(L).)
    = L/(2L − 1) = 0   ← Retrancher L
    = L = 0   ← Une fraction est nulle si son numérateur l'est
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x + x/(2x − 1) > x
    = x/(2x − 1) > 0   ← Retrancher x
    = ]−∞ ; 0[ ∪ ]1/2 ; +∞[   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x + x/(2x − 1) < x
    = x/(2x − 1) < 0   ← Retrancher x
    = ]0 ; 1/2[   ← Signe du quotient
  — (d) Pour a₁ < 1/2 : le maximum de f sur ]−∞ ; 1/2[ vaut  [juge value]  départ : M
    ? Si a₁ > 1/2 : ✔ f(x) > x et f(x) ≥ 2 > 1/2 sur ]1/2 ; +∞[ : (aₙ) croît ; une limite serait un point fixe > 1/2, il n'y en a pas : aₙ → +∞ / · aₙ → 0, le seul point fixe / · (aₙ) croît et elle est minorée par 2 : elle converge
    = 0   ← f(0) = 0, extremum local et point fixe
  — Si a₁ < 0, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ < 0 : ✔ aₙ < 0 pour tout n (0 est le maximum de f sur ]−∞ ; 1/2[) et f(x) > x : (aₙ) croît, majorée par 0, donc aₙ → 0 / · f est croissante sur ]−∞ ; 0] : (aₙ) croît sans borne, aₙ → +∞ / · (aₙ) décroît et tend vers −∞ / · (aₙ) croît et converge vers 1/2
    ? Si a₁ est entre 0 et 1/2 : ✔ a₂ = f(a₁) < 0 : on est ramené au cas a₁ < 0, donc aₙ → 0 / · f(x) < x sur cet intervalle : (aₙ) décroît et tend vers −∞ / · (aₙ) décroît et elle est minorée par 0 : aₙ → 0
    = 0   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = 0 donne une suite constante).  [juge solset]  départ : x < 0 ou x = 0 ou (0 < x et x < 1/2)
    = ]−∞ ; 1/2[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−∞ ; 1/2[, le maximum de f vaut ▢ : c'est un point fixe. | f(x) ≤ 0 pour x < 1/2, donc dès a₂ la suite reste sous 0, et elle converge vers 0.
  pièges : a1_rec_limit_without_convergence

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n − 2)/(2a_n − 3), avec f(x) = x − (x − 2)/(2x − 3) (a₁ ≠ 3/2). On sait que f a un minimum local en 2, f(2) = 2, et que x = 3/2 est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.
  [tap, suivre l'erreur, menu steps]  L = L − (L − 2)/(2L − 3)
    ((a) Seule limite possible : résous L = f(L).)
    = (L − 2)/(2L − 3) = 0   ← Retrancher L
    = L = 2   ← Une fraction est nulle si son numérateur l'est
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x − 2)/(2x − 3) > x
    = −(x − 2)/(2x − 3) > 0   ← Retrancher x
    = ]3/2 ; 2[   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x − (x − 2)/(2x − 3) < x
    = −(x − 2)/(2x − 3) < 0   ← Retrancher x
    = ]−∞ ; 3/2[ ∪ ]2 ; +∞[   ← Signe du quotient
  — (d) Pour a₁ > 3/2 : le minimum de f sur ]3/2 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < 3/2 : ✔ f(x) < x et f(x) ≤ 0 < 3/2 sur ]−∞ ; 3/2[ : (aₙ) décroît ; une limite serait un point fixe < 3/2, il n'y en a pas : aₙ → −∞ / · aₙ → 2, le seul point fixe / · (aₙ) décroît et elle est majorée par 0 : elle converge
    = 2   ← f(2) = 2, extremum local et point fixe
  — Si a₁ > 2, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > 2 : ✔ aₙ > 2 pour tout n (2 est le minimum de f sur ]3/2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 2, donc aₙ → 2 / · f est croissante sur [2 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers 3/2
    ? Si a₁ est entre 3/2 et 2 : ✔ a₂ = f(a₁) > 2 : on est ramené au cas a₁ > 2, donc aₙ → 2 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par 2 : aₙ → 2
    = 2   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = 2 donne une suite constante).  [juge solset]  départ : x > 2 ou x = 2 ou (3/2 < x et x < 2)
    = ]3/2 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]3/2 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ 2 pour x > 3/2, donc dès a₂ la suite reste au-dessus de 2, et elle converge vers 2.
  pièges : a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n + 1)/(a_n + 2), avec f(x) = x − (x + 1)/(x + 2) (a₁ ≠ −2). On sait que f a un minimum local en −1, f(−1) = −1, et que x = −2 est asymptote verticale. Trouve la limite possible, compare f à y = x, puis discute selon a₁.
  [tap, suivre l'erreur, menu steps]  L = L − (L + 1)/(L + 2)
    ((a) Seule limite possible : résous L = f(L).)
    = (L + 1)/(L + 2) = 0   ← Retrancher L
    = L = −1   ← Une fraction est nulle si son numérateur l'est
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x + 1)/(x + 2) > x
    = −(x + 1)/(x + 2) > 0   ← Retrancher x
    = ]−2 ; −1[   ← Signe du quotient
  — Et en dessous ?  [juge solset]  départ : x − (x + 1)/(x + 2) < x
    = −(x + 1)/(x + 2) < 0   ← Retrancher x
    = ]−∞ ; −2[ ∪ ]−1 ; +∞[   ← Signe du quotient
  — (d) Pour a₁ > −2 : le minimum de f sur ]−2 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < −2 : ✔ f(x) < x et f(x) ≤ −5 < −2 sur ]−∞ ; −2[ : (aₙ) décroît ; une limite serait un point fixe < −2, il n'y en a pas : aₙ → −∞ / · aₙ → −1, le seul point fixe / · (aₙ) décroît et elle est majorée par −5 : elle converge
    = −1   ← f(−1) = −1, extremum local et point fixe
  — Si a₁ > −1, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > −1 : ✔ aₙ > −1 pour tout n (−1 est le minimum de f sur ]−2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par −1, donc aₙ → −1 / · f est croissante sur [−1 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers −2
    ? Si a₁ est entre −2 et −1 : ✔ a₂ = f(a₁) > −1 : on est ramené au cas a₁ > −1, donc aₙ → −1 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par −1 : aₙ → −1
    = −1   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = −1 donne une suite constante).  [juge solset]  départ : x > −1 ou x = −1 ou (−2 < x et x < −1)
    = ]−2 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−2 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ −1 pour x > −2, donc dès a₂ la suite reste au-dessus de −1, et elle converge vers −1.
  pièges : a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

```

### Niveau 4

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n + 2)/(a_n + 3), avec f(x) = x − (x + 2)/(x + 3) (a₁ ≠ −3). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [free, suivre l'erreur]  L = L − (L + 2)/(L + 3)
    ((a) Seule limite possible : résous L = f(L).)
    = L = −2   ← Le seul point fixe
  — (b) Dérive f :  [juge equiv]  départ : (x − (x + 2)/(x + 3))′
    = 1 − 1/(x + 3)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x + 3)² > 0
    = ]−∞ ; −4[ ∪ ]−2 ; +∞[   ← Signe de f′
  — Valeur de l'autre extremum local, en x = −4 :  [juge value]  départ : (−4) − ((−4) + 2)/((−4) + 3)
    ? f′ s'annule en x = −2 et change de signe. En x = −2, f a : ✔ un minimum local, f(−2) = −2 / · un maximum local / · pas d'extremum
    = −6   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x + 3)²)′
    = 2/(x + 3)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x + 3)³ > 0
    = ]−3 ; +∞[   ← Signe de (x + 3)³
  — Asymptote verticale : limite quand x → −3⁺  [juge limit]  départ : x − (x + 2)/(x + 3)
    ? Asymptote verticale : ✔ x = −3 : f n'y est pas définie et |f(x)| → +∞ / · x = −2 / · il n'y en a pas
    = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
  — Puis quand x → −3⁻  [juge limit]  départ : x − (x + 2)/(x + 3)
    = −∞   ← Le dénominateur tend vers 0 de l'autre côté
  — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x + 2)/(x + 3) − x
    ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
    = −1   ← Asymptote y = x − 1
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x + 2)/(x + 3) > x
    = ]−3 ; −2[   ← Signe de f(x) − x
  — Et en dessous ?  [juge solset]  départ : x − (x + 2)/(x + 3) < x
    = ]−∞ ; −3[ ∪ ]−2 ; +∞[   ← Signe de f(x) − x
  — (d) Pour a₁ > −3 : le minimum de f sur ]−3 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < −3 : ✔ f(x) < x et f(x) ≤ −6 < −3 sur ]−∞ ; −3[ : (aₙ) décroît ; une limite serait un point fixe < −3, il n'y en a pas : aₙ → −∞ / · aₙ → −2, le seul point fixe / · (aₙ) décroît et elle est majorée par −6 : elle converge
    = −2   ← f(−2) = −2, extremum local et point fixe
  — Si a₁ > −2, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > −2 : ✔ aₙ > −2 pour tout n (−2 est le minimum de f sur ]−3 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par −2, donc aₙ → −2 / · f est croissante sur [−2 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers −3
    ? Si a₁ est entre −3 et −2 : ✔ a₂ = f(a₁) > −2 : on est ramené au cas a₁ > −2, donc aₙ → −2 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par −2 : aₙ → −2
    = −2   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = −2 donne une suite constante).  [juge solset]  départ : x > −2 ou x = −2 ou (−3 < x et x < −2)
    = ]−3 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]−3 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ −2 pour x > −3, donc dès a₂ la suite reste au-dessus de −2, et elle converge vers −2.
  pièges : a1_oblique_asymptote_slope_only, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n − 1)/(2a_n − 1), avec f(x) = x − (x − 1)/(2x − 1) (a₁ ≠ 1/2). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [free, suivre l'erreur]  L = L − (L − 1)/(2L − 1)
    ((a) Seule limite possible : résous L = f(L).)
    = L = 1   ← Le seul point fixe
  — (b) Dérive f :  [juge equiv]  départ : (x − (x − 1)/(2x − 1))′
    = 1 − 1/(2x − 1)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x − 1)² > 0
    = ]−∞ ; 0[ ∪ ]1 ; +∞[   ← Signe de f′
  — Valeur de l'autre extremum local, en x = 0 :  [juge value]  départ : 0 − (0 − 1)/(2·0 − 1)
    ? f′ s'annule en x = 1 et change de signe. En x = 1, f a : ✔ un minimum local, f(1) = 1 / · un maximum local / · pas d'extremum
    = −1   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x − 1)²)′
    = 4/(2x − 1)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x − 1)³ > 0
    = ]1/2 ; +∞[   ← Signe de (2x − 1)³
  — Asymptote verticale : limite quand x → 1/2⁺  [juge limit]  départ : x − (x − 1)/(2x − 1)
    ? Asymptote verticale : ✔ x = 1/2 : f n'y est pas définie et |f(x)| → +∞ / · x = 1 / · il n'y en a pas
    = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
  — Puis quand x → 1/2⁻  [juge limit]  départ : x − (x − 1)/(2x − 1)
    = −∞   ← Le dénominateur tend vers 0 de l'autre côté
  — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x − 1)/(2x − 1) − x
    ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
    = −1/2   ← Asymptote y = x − 1/2
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x − 1)/(2x − 1) > x
    = ]1/2 ; 1[   ← Signe de f(x) − x
  — Et en dessous ?  [juge solset]  départ : x − (x − 1)/(2x − 1) < x
    = ]−∞ ; 1/2[ ∪ ]1 ; +∞[   ← Signe de f(x) − x
  — (d) Pour a₁ > 1/2 : le minimum de f sur ]1/2 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < 1/2 : ✔ f(x) < x et f(x) ≤ −1 < 1/2 sur ]−∞ ; 1/2[ : (aₙ) décroît ; une limite serait un point fixe < 1/2, il n'y en a pas : aₙ → −∞ / · aₙ → 1, le seul point fixe / · (aₙ) décroît et elle est majorée par −1 : elle converge
    = 1   ← f(1) = 1, extremum local et point fixe
  — Si a₁ > 1, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > 1 : ✔ aₙ > 1 pour tout n (1 est le minimum de f sur ]1/2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 1, donc aₙ → 1 / · f est croissante sur [1 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers 1/2
    ? Si a₁ est entre 1/2 et 1 : ✔ a₂ = f(a₁) > 1 : on est ramené au cas a₁ > 1, donc aₙ → 1 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par 1 : aₙ → 1
    = 1   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = 1 donne une suite constante).  [juge solset]  départ : x > 1 ou x = 1 ou (1/2 < x et x < 1)
    = ]1/2 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]1/2 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ 1 pour x > 1/2, donc dès a₂ la suite reste au-dessus de 1, et elle converge vers 1.
  pièges : a1_oblique_asymptote_slope_only, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n − 2)/(a_n − 1), avec f(x) = x − (x − 2)/(x − 1) (a₁ ≠ 1). (a) Seule limite possible ; (b) étude de f ; (c) position par rapport à y = x ; (d) discussion selon a₁.
  [free, suivre l'erreur]  L = L − (L − 2)/(L − 1)
    ((a) Seule limite possible : résous L = f(L).)
    = L = 2   ← Le seul point fixe
  — (b) Dérive f :  [juge equiv]  départ : (x − (x − 2)/(x − 1))′
    = 1 − 1/(x − 1)²   ← Dériver
  — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x − 1)² > 0
    = ]−∞ ; 0[ ∪ ]2 ; +∞[   ← Signe de f′
  — Valeur de l'autre extremum local, en x = 0 :  [juge value]  départ : 0 − (0 − 2)/(0 − 1)
    ? f′ s'annule en x = 2 et change de signe. En x = 2, f a : ✔ un minimum local, f(2) = 2 / · un maximum local / · pas d'extremum
    = −2   ← Calculer
  — Dérive encore :  [juge equiv]  départ : (1 − 1/(x − 1)²)′
    = 2/(x − 1)³   ← Dériver
  — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x − 1)³ > 0
    = ]1 ; +∞[   ← Signe de (x − 1)³
  — Asymptote verticale : limite quand x → 1⁺  [juge limit]  départ : x − (x − 2)/(x − 1)
    ? Asymptote verticale : ✔ x = 1 : f n'y est pas définie et |f(x)| → +∞ / · x = 2 / · il n'y en a pas
    = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
  — Puis quand x → 1⁻  [juge limit]  départ : x − (x − 2)/(x − 1)
    = −∞   ← Le dénominateur tend vers 0 de l'autre côté
  — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x − 2)/(x − 1) − x
    ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
    = −1   ← Asymptote y = x − 1
  — (c) Où le graphe de f est-il au-dessus de la droite y = x ?  [juge solset]  départ : x − (x − 2)/(x − 1) > x
    = ]1 ; 2[   ← Signe de f(x) − x
  — Et en dessous ?  [juge solset]  départ : x − (x − 2)/(x − 1) < x
    = ]−∞ ; 1[ ∪ ]2 ; +∞[   ← Signe de f(x) − x
  — (d) Pour a₁ > 1 : le minimum de f sur ]1 ; +∞[ vaut  [juge value]  départ : m
    ? Si a₁ < 1 : ✔ f(x) < x et f(x) ≤ −2 < 1 sur ]−∞ ; 1[ : (aₙ) décroît ; une limite serait un point fixe < 1, il n'y en a pas : aₙ → −∞ / · aₙ → 2, le seul point fixe / · (aₙ) décroît et elle est majorée par −2 : elle converge
    = 2   ← f(2) = 2, extremum local et point fixe
  — Si a₁ > 2, la limite de la suite :  [juge value]  départ : lim_{n→∞} a_n
    ? Si a₁ > 2 : ✔ aₙ > 2 pour tout n (2 est le minimum de f sur ]1 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 2, donc aₙ → 2 / · f est croissante sur [2 ; +∞[, donc (aₙ) croît / · (aₙ) croît et tend vers +∞ / · (aₙ) décroît et converge vers 1
    ? Si a₁ est entre 1 et 2 : ✔ a₂ = f(a₁) > 2 : on est ramené au cas a₁ > 2, donc aₙ → 2 / · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞ / · (aₙ) croît et elle est majorée par 2 : aₙ → 2
    = 2   ← Monotone et bornée : la limite est le point fixe
  — Conclusion : réunis les cas où la suite converge (x = a₁ ; a₁ = 2 donne une suite constante).  [juge solset]  départ : x > 2 ou x = 2 ou (1 < x et x < 2)
    = ]1 ; +∞[   ← Réunir les cas
  aides : Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte (f(aₙ) > aₙ) ou descend. | Sur ]1 ; +∞[, le minimum de f vaut ▢ : c'est un point fixe. | f(x) ≥ 2 pour x > 1, donc dès a₂ la suite reste au-dessus de 2, et elle converge vers 2.
  pièges : a1_oblique_asymptote_slope_only, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

```

### Niveau 5

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − a_n/(a_n + 1), avec f(x) = x − x/(x + 1) (a₁ ≠ −1). Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.
  [problème, 13 points]
  partie 1 ((a) Seule limite possible : 1)
  (a) Quelle est la seule limite possible de la suite ?
    [free, sans aide, suivre l'erreur]  L = L − L/(L + 1)
      ((a) Seule limite possible : résous L = f(L).)
      = L = 0   ← Le seul point fixe
  partie 2 ((b) Étude de f : 2 ; f est croissante là où f′(x) > 0 : 0,5 ; Valeur de l'autre extremum local, en x = −2 : 0,5 ; Dérive encore : 1 ; f est convexe là où f″(x) > 0 : 1 ; Asymptote verticale : limite quand x → −1⁺ : 0,5 ; Puis quand x → −1⁻ : 0,5 ; Asymptote oblique en ±∞ : limite de f(x) − x : 1)
  (b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.
    [free, sans aide, suivre l'erreur]  (x − x/(x + 1))′
      ((b) Dérive f :)
      = 1 − 1/(x + 1)²   ← Dériver
    — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(x + 1)² > 0
      = ]−∞ ; −2[ ∪ ]0 ; +∞[   ← Signe de f′
    — Valeur de l'autre extremum local, en x = −2 :  [juge value]  départ : (−2) − (−2)/((−2) + 1)
      ? f′ s'annule en x = 0 et change de signe. En x = 0, f a : ✔ un minimum local, f(0) = 0 / · un maximum local / · pas d'extremum
      = −4   ← Calculer
    — Dérive encore :  [juge equiv]  départ : (1 − 1/(x + 1)²)′
      = 2/(x + 1)³   ← Dériver
    — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 2/(x + 1)³ > 0
      = ]−1 ; +∞[   ← Signe de (x + 1)³
    — Asymptote verticale : limite quand x → −1⁺  [juge limit]  départ : x − x/(x + 1)
      ? Asymptote verticale : ✔ x = −1 : f n'y est pas définie et |f(x)| → +∞ / · x = 0 / · il n'y en a pas
      = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
    — Puis quand x → −1⁻  [juge limit]  départ : x − x/(x + 1)
      = −∞   ← Le dénominateur tend vers 0 de l'autre côté
    — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − x/(x + 1) − x
      ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
      = −1   ← Asymptote y = x − 1
  partie 3 ((c) Position par rapport à y = x : 1 ; Et en dessous ? : 1)
  (c) Compare le graphe de f à la droite y = x.
    [free, sans aide, suivre l'erreur]  x − x/(x + 1) > x
      ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
      = ]−1 ; 0[   ← Signe de f(x) − x
    — Et en dessous ?  [juge solset]  départ : x − x/(x + 1) < x
      = ]−∞ ; −1[ ∪ ]0 ; +∞[   ← Signe de f(x) − x
  partie 4 ((d) Premier cas : 1)
  (d) Si a₁ < −1, que fait la suite ?
    ✔ f(x) < x et f(x) ≤ −4 < −1 sur ]−∞ ; −1[ : (aₙ) décroît ; une limite serait un point fixe < −1, il n'y en a pas : aₙ → −∞   · (aₙ) décroît et elle est majorée par −4 : elle converge   · aₙ → 0, le seul point fixe [a1_rec_limit_without_convergence]
  partie 5 ((d) Deuxième cas : 1)
  (d) Si a₁ > 0, que fait la suite ?
    · (aₙ) décroît et converge vers −1   ✔ aₙ > 0 pour tout n (0 est le minimum de f sur ]−1 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 0, donc aₙ → 0   · (aₙ) croît et tend vers +∞   · f est croissante sur [0 ; +∞[, donc (aₙ) croît [a1_monotone_by_f_increasing]
  partie 6 ((d) Dernier cas et conclusion : 1)
  (d) Si a₁ est entre −1 et 0, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?
    · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞. La suite converge si et seulement si a₁ ≥ 0   · La suite converge seulement si a₁ = 0 (suite constante)   ✔ a₂ = f(a₁) > 0 : on est ramené au cas a₁ > 0, donc aₙ → 0. Avec a₁ = 0 (suite constante), la suite converge, vers 0, si et seulement si a₁ > −1   · (aₙ) croît et elle est majorée par 0 : aₙ → 0. La suite converge pour tout a₁ ≠ −1 [a1_rec_limit_without_convergence]
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_oblique_asymptote_slope_only, g1_pole_closed, g9_bracket, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n − 1)/(2a_n − 1), avec f(x) = x − (x − 1)/(2x − 1) (a₁ ≠ 1/2). Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.
  [problème, 13 points]
  partie 1 ((a) Seule limite possible : 1)
  (a) Quelle est la seule limite possible de la suite ?
    [free, sans aide, suivre l'erreur]  L = L − (L − 1)/(2L − 1)
      ((a) Seule limite possible : résous L = f(L).)
      = L = 1   ← Le seul point fixe
  partie 2 ((b) Étude de f : 2 ; f est croissante là où f′(x) > 0 : 0,5 ; Valeur de l'autre extremum local, en x = 0 : 0,5 ; Dérive encore : 1 ; f est convexe là où f″(x) > 0 : 1 ; Asymptote verticale : limite quand x → 1/2⁺ : 0,5 ; Puis quand x → 1/2⁻ : 0,5 ; Asymptote oblique en ±∞ : limite de f(x) − x : 1)
  (b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.
    [free, sans aide, suivre l'erreur]  (x − (x − 1)/(2x − 1))′
      ((b) Dérive f :)
      = 1 − 1/(2x − 1)²   ← Dériver
    — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x − 1)² > 0
      = ]−∞ ; 0[ ∪ ]1 ; +∞[   ← Signe de f′
    — Valeur de l'autre extremum local, en x = 0 :  [juge value]  départ : 0 − (0 − 1)/(2·0 − 1)
      ? f′ s'annule en x = 1 et change de signe. En x = 1, f a : ✔ un minimum local, f(1) = 1 / · un maximum local / · pas d'extremum
      = −1   ← Calculer
    — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x − 1)²)′
      = 4/(2x − 1)³   ← Dériver
    — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x − 1)³ > 0
      = ]1/2 ; +∞[   ← Signe de (2x − 1)³
    — Asymptote verticale : limite quand x → 1/2⁺  [juge limit]  départ : x − (x − 1)/(2x − 1)
      ? Asymptote verticale : ✔ x = 1/2 : f n'y est pas définie et |f(x)| → +∞ / · x = 1 / · il n'y en a pas
      = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
    — Puis quand x → 1/2⁻  [juge limit]  départ : x − (x − 1)/(2x − 1)
      = −∞   ← Le dénominateur tend vers 0 de l'autre côté
    — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x − 1)/(2x − 1) − x
      ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
      = −1/2   ← Asymptote y = x − 1/2
  partie 3 ((c) Position par rapport à y = x : 1 ; Et en dessous ? : 1)
  (c) Compare le graphe de f à la droite y = x.
    [free, sans aide, suivre l'erreur]  x − (x − 1)/(2x − 1) > x
      ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
      = ]1/2 ; 1[   ← Signe de f(x) − x
    — Et en dessous ?  [juge solset]  départ : x − (x − 1)/(2x − 1) < x
      = ]−∞ ; 1/2[ ∪ ]1 ; +∞[   ← Signe de f(x) − x
  partie 4 ((d) Premier cas : 1)
  (d) Si a₁ < 1/2, que fait la suite ?
    ✔ f(x) < x et f(x) ≤ −1 < 1/2 sur ]−∞ ; 1/2[ : (aₙ) décroît ; une limite serait un point fixe < 1/2, il n'y en a pas : aₙ → −∞   · (aₙ) décroît et elle est majorée par −1 : elle converge   · aₙ → 1, le seul point fixe [a1_rec_limit_without_convergence]
  partie 5 ((d) Deuxième cas : 1)
  (d) Si a₁ > 1, que fait la suite ?
    ✔ aₙ > 1 pour tout n (1 est le minimum de f sur ]1/2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 1, donc aₙ → 1   · f est croissante sur [1 ; +∞[, donc (aₙ) croît [a1_monotone_by_f_increasing]   · (aₙ) décroît et converge vers 1/2   · (aₙ) croît et tend vers +∞
  partie 6 ((d) Dernier cas et conclusion : 1)
  (d) Si a₁ est entre 1/2 et 1, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?
    · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞. La suite converge si et seulement si a₁ ≥ 1   · La suite converge seulement si a₁ = 1 (suite constante)   ✔ a₂ = f(a₁) > 1 : on est ramené au cas a₁ > 1, donc aₙ → 1. Avec a₁ = 1 (suite constante), la suite converge, vers 1, si et seulement si a₁ > 1/2   · (aₙ) croît et elle est majorée par 1 : aₙ → 1. La suite converge pour tout a₁ ≠ 1/2 [a1_rec_limit_without_convergence]
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_oblique_asymptote_slope_only, g1_pole_closed, g9_bracket, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n + 1)/(2a_n + 3), avec f(x) = x − (x + 1)/(2x + 3) (a₁ ≠ −3/2). Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.
  [problème, 13 points]
  partie 1 ((a) Seule limite possible : 1)
  (a) Quelle est la seule limite possible de la suite ?
    [free, sans aide, suivre l'erreur]  L = L − (L + 1)/(2L + 3)
      ((a) Seule limite possible : résous L = f(L).)
      = L = −1   ← Le seul point fixe
  partie 2 ((b) Étude de f : 2 ; f est croissante là où f′(x) > 0 : 0,5 ; Valeur de l'autre extremum local, en x = −2 : 0,5 ; Dérive encore : 1 ; f est convexe là où f″(x) > 0 : 1 ; Asymptote verticale : limite quand x → −3/2⁺ : 0,5 ; Puis quand x → −3/2⁻ : 0,5 ; Asymptote oblique en ±∞ : limite de f(x) − x : 1)
  (b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.
    [free, sans aide, suivre l'erreur]  (x − (x + 1)/(2x + 3))′
      ((b) Dérive f :)
      = 1 − 1/(2x + 3)²   ← Dériver
    — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x + 3)² > 0
      = ]−∞ ; −2[ ∪ ]−1 ; +∞[   ← Signe de f′
    — Valeur de l'autre extremum local, en x = −2 :  [juge value]  départ : (−2) − ((−2) + 1)/(2·(−2) + 3)
      ? f′ s'annule en x = −1 et change de signe. En x = −1, f a : ✔ un minimum local, f(−1) = −1 / · un maximum local / · pas d'extremum
      = −3   ← Calculer
    — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x + 3)²)′
      = 4/(2x + 3)³   ← Dériver
    — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x + 3)³ > 0
      = ]−3/2 ; +∞[   ← Signe de (2x + 3)³
    — Asymptote verticale : limite quand x → −3/2⁺  [juge limit]  départ : x − (x + 1)/(2x + 3)
      ? Asymptote verticale : ✔ x = −3/2 : f n'y est pas définie et |f(x)| → +∞ / · x = −1 / · il n'y en a pas
      = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
    — Puis quand x → −3/2⁻  [juge limit]  départ : x − (x + 1)/(2x + 3)
      = −∞   ← Le dénominateur tend vers 0 de l'autre côté
    — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x + 1)/(2x + 3) − x
      ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
      = −1/2   ← Asymptote y = x − 1/2
  partie 3 ((c) Position par rapport à y = x : 1 ; Et en dessous ? : 1)
  (c) Compare le graphe de f à la droite y = x.
    [free, sans aide, suivre l'erreur]  x − (x + 1)/(2x + 3) > x
      ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
      = ]−3/2 ; −1[   ← Signe de f(x) − x
    — Et en dessous ?  [juge solset]  départ : x − (x + 1)/(2x + 3) < x
      = ]−∞ ; −3/2[ ∪ ]−1 ; +∞[   ← Signe de f(x) − x
  partie 4 ((d) Premier cas : 1)
  (d) Si a₁ < −3/2, que fait la suite ?
    ✔ f(x) < x et f(x) ≤ −3 < −3/2 sur ]−∞ ; −3/2[ : (aₙ) décroît ; une limite serait un point fixe < −3/2, il n'y en a pas : aₙ → −∞   · aₙ → −1, le seul point fixe [a1_rec_limit_without_convergence]   · (aₙ) décroît et elle est majorée par −3 : elle converge
  partie 5 ((d) Deuxième cas : 1)
  (d) Si a₁ > −1, que fait la suite ?
    ✔ aₙ > −1 pour tout n (−1 est le minimum de f sur ]−3/2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par −1, donc aₙ → −1   · (aₙ) croît et tend vers +∞   · f est croissante sur [−1 ; +∞[, donc (aₙ) croît [a1_monotone_by_f_increasing]   · (aₙ) décroît et converge vers −3/2
  partie 6 ((d) Dernier cas et conclusion : 1)
  (d) Si a₁ est entre −3/2 et −1, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?
    · La suite converge seulement si a₁ = −1 (suite constante)   · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞. La suite converge si et seulement si a₁ ≥ −1   ✔ a₂ = f(a₁) > −1 : on est ramené au cas a₁ > −1, donc aₙ → −1. Avec a₁ = −1 (suite constante), la suite converge, vers −1, si et seulement si a₁ > −3/2   · (aₙ) croît et elle est majorée par −1 : aₙ → −1. La suite converge pour tout a₁ ≠ −3/2 [a1_rec_limit_without_convergence]
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_oblique_asymptote_slope_only, g1_pole_closed, g9_bracket, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

```

### Variantes d'examen

```
On étudie la suite définie par a₁ ∈ ℝ et a_(n + 1) = a_n − (a_n − 2)/(2a_n − 3), avec f(x) = x − (x − 2)/(2x − 3) (a₁ ≠ 3/2). Problème en 13 points : (a) seule limite possible, (b) étude de f, (c) position par rapport à y = x, (d) discussion selon a₁.
  [problème, examen open, 13 points]
  partie 1 ((a) Seule limite possible : 1)
  (a) Quelle est la seule limite possible de la suite ?
    [free, sans aide, suivre l'erreur]  L = L − (L − 2)/(2L − 3)
      ((a) Seule limite possible : résous L = f(L).)
      = L = 2   ← Le seul point fixe
  partie 2 ((b) Étude de f : 2 ; f est croissante là où f′(x) > 0 : 0,5 ; Valeur de l'autre extremum local, en x = 1 : 0,5 ; Dérive encore : 1 ; f est convexe là où f″(x) > 0 : 1 ; Asymptote verticale : limite quand x → 3/2⁺ : 0,5 ; Puis quand x → 3/2⁻ : 0,5 ; Asymptote oblique en ±∞ : limite de f(x) − x : 1)
  (b) Étudie f : f′ et f″, monotonie et extrema, convexité, asymptotes.
    [free, sans aide, suivre l'erreur]  (x − (x − 2)/(2x − 3))′
      ((b) Dérive f :)
      = 1 − 1/(2x − 3)²   ← Dériver
    — f est croissante là où f′(x) > 0 :  [juge solset]  départ : 1 − 1/(2x − 3)² > 0
      = ]−∞ ; 1[ ∪ ]2 ; +∞[   ← Signe de f′
    — Valeur de l'autre extremum local, en x = 1 :  [juge value]  départ : 1 − (1 − 2)/(2·1 − 3)
      ? f′ s'annule en x = 2 et change de signe. En x = 2, f a : ✔ un minimum local, f(2) = 2 / · un maximum local / · pas d'extremum
      = 0   ← Calculer
    — Dérive encore :  [juge equiv]  départ : (1 − 1/(2x − 3)²)′
      = 4/(2x − 3)³   ← Dériver
    — f est convexe là où f″(x) > 0 :  [juge solset]  départ : 4/(2x − 3)³ > 0
      = ]3/2 ; +∞[   ← Signe de (2x − 3)³
    — Asymptote verticale : limite quand x → 3/2⁺  [juge limit]  départ : x − (x − 2)/(2x − 3)
      ? Asymptote verticale : ✔ x = 3/2 : f n'y est pas définie et |f(x)| → +∞ / · x = 2 / · il n'y en a pas
      = ∞   ← Le numérateur tend vers un nombre ≠ 0, le dénominateur vers 0
    — Puis quand x → 3/2⁻  [juge limit]  départ : x − (x − 2)/(2x − 3)
      = −∞   ← Le dénominateur tend vers 0 de l'autre côté
    — Asymptote oblique en ±∞ : limite de f(x) − x  [juge limit]  départ : x − (x − 2)/(2x − 3) − x
      ? f(x)/x → 1 en ±∞ : la pente de l'asymptote oblique est 1. Pour son équation y = x + p : ✔ il faut encore p = lim (f(x) − x) / · y = x suffit : la pente est connue
      = −1/2   ← Asymptote y = x − 1/2
  partie 3 ((c) Position par rapport à y = x : 1 ; Et en dessous ? : 1)
  (c) Compare le graphe de f à la droite y = x.
    [free, sans aide, suivre l'erreur]  x − (x − 2)/(2x − 3) > x
      ((c) Où le graphe de f est-il au-dessus de la droite y = x ?)
      = ]3/2 ; 2[   ← Signe de f(x) − x
    — Et en dessous ?  [juge solset]  départ : x − (x − 2)/(2x − 3) < x
      = ]−∞ ; 3/2[ ∪ ]2 ; +∞[   ← Signe de f(x) − x
  partie 4 ((d) Premier cas : 1)
  (d) Si a₁ < 3/2, que fait la suite ?
    ✔ f(x) < x et f(x) ≤ 0 < 3/2 sur ]−∞ ; 3/2[ : (aₙ) décroît ; une limite serait un point fixe < 3/2, il n'y en a pas : aₙ → −∞   · (aₙ) décroît et elle est majorée par 0 : elle converge   · aₙ → 2, le seul point fixe [a1_rec_limit_without_convergence]
  partie 5 ((d) Deuxième cas : 1)
  (d) Si a₁ > 2, que fait la suite ?
    · (aₙ) décroît et converge vers 3/2   · (aₙ) croît et tend vers +∞   · f est croissante sur [2 ; +∞[, donc (aₙ) croît [a1_monotone_by_f_increasing]   ✔ aₙ > 2 pour tout n (2 est le minimum de f sur ]3/2 ; +∞[) et f(x) < x : (aₙ) décroît, minorée par 2, donc aₙ → 2
  partie 6 ((d) Dernier cas et conclusion : 1)
  (d) Si a₁ est entre 3/2 et 2, que fait la suite ? Conclus : pour quels a₁ converge-t-elle ?
    · La suite converge seulement si a₁ = 2 (suite constante)   · f(x) > x sur cet intervalle : (aₙ) croît et tend vers +∞. La suite converge si et seulement si a₁ ≥ 2   ✔ a₂ = f(a₁) > 2 : on est ramené au cas a₁ > 2, donc aₙ → 2. Avec a₁ = 2 (suite constante), la suite converge, vers 2, si et seulement si a₁ > 3/2   · (aₙ) croît et elle est majorée par 2 : aₙ → 2. La suite converge pour tout a₁ ≠ 3/2 [a1_rec_limit_without_convergence]
  pièges : g6_quotient_sign, g6_quotient_no_square, a1_oblique_asymptote_slope_only, g1_pole_closed, g9_bracket, a1_rec_limit_without_convergence, a1_monotone_by_f_increasing

```

## Séries géométriques et télescopiques : calculer la somme (`a1-ser-geo-tele`, BA1)

_Premier terme sur 1 − raison ; une télescopique par ses sommes partielles S_N._

### Niveau 1

```
Calcule Σ_{k=0}^{∞} (3^k + 5^k)/6^k.
  [guided]  Σ_{k=0}^{∞} (3^k + 5^k)/6^k
    = Σ_{k=0}^{∞} (3/6)^k + Σ_{k=0}^{∞} (5/6)^k   ← Séparer : deux séries géométriques
    = 1/(1 − 1/2) + 1/(□)   (trous : 1/(1 − 1/2) + 1/(1 − 5/6))   ← Premier terme sur 1 − raison
    = 8   ← Calculer
  aides : Sépare la fraction : (3ᵏ+5ᵏ)/6ᵏ est une somme de deux puissances k-ièmes. | Σ_{k=0}^{∞} (3^k + 5^k)/6^k = Σ_{k=0}^{∞} (3/6)^k + ▢ | 1/(1 − 1/2) + 1/(1 − 5/6) = 8
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=1}^{∞} 1/((k + 2)(k + 3)) à l'aide des sommes partielles S_N. On donne 1/((k + 2)(k + 3)) = 1/(k + 2) − 1/(k + 3).
  [guided]  Σ_{k=1}^{N} (1/(k + 2) − 1/(k + 3))
    (Somme partielle :)
    (S_N = (1/3 − 1/4) + (1/4 − 1/5) + … + (1/(N + 2) − 1/(N + 3)))
    = 1/3 − □   (trous : 1/3 − 1/(N + 3))   ← Télescoper : il reste le premier et le dernier terme
  — Passe à la limite :  [juge limit]  départ : 1/3 − 1/(N + 3)
    = 1/3   ← Les termes en N tendent vers 0
  aides : Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. | S_N = 1/3 + … − 1/(N + 3) − … | 1/3 − 1/(N + 3) → 1/3
  pièges : g5_reindex_half, g5_telescope_ends

Calcule Σ_{k=1}^{∞} 1/((k + 1)(k + 2)) à l'aide des sommes partielles S_N. On donne 1/((k + 1)(k + 2)) = 1/(k + 1) − 1/(k + 2).
  [guided]  Σ_{k=1}^{N} (1/(k + 1) − 1/(k + 2))
    (Somme partielle :)
    (S_N = (1/2 − 1/3) + (1/3 − 1/4) + … + (1/(N + 1) − 1/(N + 2)))
    = 1/2 − □   (trous : 1/2 − 1/(N + 2))   ← Télescoper : il reste le premier et le dernier terme
  — Passe à la limite :  [juge limit]  départ : 1/2 − 1/(N + 2)
    = 1/2   ← Les termes en N tendent vers 0
  aides : Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. | S_N = 1/2 + … − 1/(N + 2) − … | 1/2 − 1/(N + 2) → 1/2
  pièges : g5_reindex_half, g5_telescope_ends

```

### Niveau 2

```
Calcule Σ_{k=1}^{∞} 1/((k + 2)(k + 3)) à l'aide des sommes partielles S_N.
  [guided]  1/((k + 2)(k + 3))
    (Décompose le terme général :)
    = 1/(k + 2) − □   (trous : 1/(k + 2) − 1/(k + 3))   ← Décomposition en éléments simples
  — Somme partielle :  [juge equiv]  départ : Σ_{k=1}^{N} (1/(k + 2) − 1/(k + 3))
    (S_N = (1/3 − 1/4) + (1/4 − 1/5) + … + (1/(N + 2) − 1/(N + 3)))
    = 1/3 − □   (trous : 1/3 − 1/(N + 3))   ← Télescoper : il reste le premier et le dernier terme
  — Passe à la limite :  [juge limit]  départ : 1/3 − 1/(N + 3)
    = 1/3   ← Les termes en N tendent vers 0
  aides : Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. | S_N = 1/3 + … − 1/(N + 3) − … | 1/3 − 1/(N + 3) → 1/3

Calcule Σ_{k=0}^{∞} (3^k + 5^k)/6^k.
  [guided]  Σ_{k=0}^{∞} (3^k + 5^k)/6^k
    = Σ_{k=0}^{∞} (3/6)^k + Σ_{k=0}^{∞} □   (trous : Σ_{k=0}^{∞} (3/6)^k + Σ_{k=0}^{∞} (5/6)^k)   ← Séparer : deux séries géométriques
    = 1/(1 − 1/2) + 1/(1 − 5/6)   ← Premier terme sur 1 − raison
    = 8   ← Calculer
  aides : Sépare la fraction : (3ᵏ+5ᵏ)/6ᵏ est une somme de deux puissances k-ièmes. | Σ_{k=0}^{∞} (3^k + 5^k)/6^k = Σ_{k=0}^{∞} (3/6)^k + ▢ | 1/(1 − 1/2) + 1/(1 − 5/6) = 8
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=3}^{∞} (−2/3)^k.
  [guided]  Σ_{k=3}^{∞} (−2/3)^k
    = (□)/(1 − (−2/3))   (trous : (−8/27)/(1 − (−2/3)))   ← Premier terme sur 1 − raison
    = −8/45   ← Calculer
  aides : Une série géométrique de raison q, |q| < 1, vaut premier terme sur (1 − q). | Σ_{k=3}^{∞} (−2/3)^k = ▢/(1 − (−2/3)) | (−8/27)/(1 − (−2/3)) = −8/45
  pièges : a1_geo_sum_start, a1_pow_sum_index_shift

```

### Niveau 3

```
Calcule Σ_{k=2}^{∞} 5/4^k.
  [tap, suivre l'erreur, menu steps]  Σ_{k=2}^{∞} 5/4^k
    = (5/16)/(1 − 1/4)   ← Premier terme sur 1 − raison
    = 5/12   ← Calculer
  aides : Une série géométrique de raison q, |q| < 1, vaut premier terme sur (1 − q). | Σ_{k=2}^{∞} 5/4^k = ▢/(1 − 1/4) | (5/16)/(1 − 1/4) = 5/12
  pièges : a1_geo_sum_start, a1_pow_sum_index_shift

Calcule Σ_{k=3}^{∞} −2(−1/2)^k.
  [tap, suivre l'erreur, menu steps]  Σ_{k=3}^{∞} −2(−1/2)^k
    = (1/4)/(1 − (−1/2))   ← Premier terme sur 1 − raison
    = 1/6   ← Calculer
  aides : Une série géométrique de raison q, |q| < 1, vaut premier terme sur (1 − q). | Σ_{k=3}^{∞} −2(−1/2)^k = ▢/(1 − (−1/2)) | (1/4)/(1 − (−1/2)) = 1/6
  pièges : a1_geo_sum_start, a1_pow_sum_index_shift

Calcule Σ_{k=3}^{∞} −2(−1/2)^k.
  [tap, suivre l'erreur, menu steps]  Σ_{k=3}^{∞} −2(−1/2)^k
    = (1/4)/(1 − (−1/2))   ← Premier terme sur 1 − raison
    = 1/6   ← Calculer
  aides : Une série géométrique de raison q, |q| < 1, vaut premier terme sur (1 − q). | Σ_{k=3}^{∞} −2(−1/2)^k = ▢/(1 − (−1/2)) | (1/4)/(1 − (−1/2)) = 1/6
  pièges : a1_geo_sum_start, a1_pow_sum_index_shift

```

### Niveau 4

```
Calcule Σ_{k=1}^{∞} 2/((k + 3)(k + 5)) à l'aide des sommes partielles S_N.
  [free, suivre l'erreur]  2/((k + 3)(k + 5))
    (Décompose le terme général :)
    = 1/(k + 3) − 1/(k + 5)   ← Décomposition en éléments simples
  — Somme partielle :  [juge equiv]  départ : Σ_{k=1}^{N} (1/(k + 3) − 1/(k + 5))
    = 1/4 + 1/5 − 1/(N + 4) − 1/(N + 5)   ← Télescoper : décalage de 2, il reste 2 termes au début et 2 à la fin
  — Passe à la limite :  [juge limit]  départ : 1/4 + 1/5 − 1/(N + 4) − 1/(N + 5)
    = 9/20   ← Les termes en N tendent vers 0
  aides : Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. | S_N = 1/4 + … − 1/(N + 4) − … | 1/4 + 1/5 − 1/(N + 4) − 1/(N + 5) → 9/20

Calcule Σ_{k=1}^{∞} (2^k + 3^k)/5^k.
  [free, suivre l'erreur]  Σ_{k=1}^{∞} (2^k + 3^k)/5^k
    = Σ_{k=1}^{∞} (2/5)^k + Σ_{k=1}^{∞} (3/5)^k   ← Deux séries géométriques
    = 13/6   ← Premier terme sur 1 − raison
  aides : Sépare la fraction : (2ᵏ+3ᵏ)/5ᵏ est une somme de deux puissances k-ièmes. | Σ_{k=1}^{∞} (2^k + 3^k)/5^k = Σ_{k=1}^{∞} (2/5)^k + ▢ | (2/5)/(1 − 2/5) + (3/5)/(1 − 3/5) = 13/6
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=1}^{∞} 1/((k + 3)(k + 4)) à l'aide des sommes partielles S_N.
  [free, suivre l'erreur]  1/((k + 3)(k + 4))
    (Décompose le terme général :)
    = 1/(k + 3) − 1/(k + 4)   ← Décomposition en éléments simples
  — Somme partielle :  [juge equiv]  départ : Σ_{k=1}^{N} (1/(k + 3) − 1/(k + 4))
    = 1/4 − 1/(N + 4)   ← Télescoper : il reste le premier et le dernier terme
  — Passe à la limite :  [juge limit]  départ : 1/4 − 1/(N + 4)
    = 1/4   ← Les termes en N tendent vers 0
  aides : Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. | S_N = 1/4 + … − 1/(N + 4) − … | 1/4 − 1/(N + 4) → 1/4

```

### Niveau 5

```
Calcule Σ_{k=1}^{∞} (1/((k + 3)(k + 4)) + (−2/3)^k).
  [free, sans aide]  Σ_{k=1}^{∞} (1/((k + 3)(k + 4)) + (−2/3)^k)
    = Σ_{k=1}^{∞} (1/(k + 3) − 1/(k + 4)) + Σ_{k=1}^{∞} (−2/3)^k   ← Séparer ; décomposer le premier terme
    = 1/4 + (−2/3)/(1 − (−2/3))   ← Télescoper ; premier terme sur 1 − raison
    = −3/20   ← Calculer
  pièges : a1_pow_sum_index_shift

Σ_{k=1}^{∞} (2/3)^k =
  · 2/5   ✔ 2   · 3 [a1_geo_sum_start]   · 4/3
  pièges : a1_geo_sum_start

Calcule Σ_{k=1}^{∞} (2/(k(k + 2)) + 1/3^k).
  [free, sans aide]  Σ_{k=1}^{∞} (2/(k(k + 2)) + 1/3^k)
    = Σ_{k=1}^{∞} (1/k − 1/(k + 2)) + Σ_{k=1}^{∞} 1/3^k   ← Séparer ; décomposer le premier terme
    = 1 + 1/2 + (1/3)/(1 − 1/3)   ← Télescoper ; premier terme sur 1 − raison
    = 2   ← Calculer
  pièges : a1_pow_sum_index_shift

```

### Variantes d'examen

```
Σ_{k=0}^{∞} 6(−1/2)^k =
  ✔ 4   · 12   · −2   · 6
  [examen mcq]

Vrai ou faux ?
  « Si uₙ → 0, alors la série Σ uₙ converge. » → FAUX
    contre-exemple (sequence) : a = ln((n+1)/n)
  [examen tf]

```

## Condition nécessaire : uₙ → 0 (`a1-ser-necessary`, BA1)

_Si uₙ ne tend pas vers 0, la série diverge ; sinon, il faut un autre critère._

### Niveau 1

```
Que dit la condition nécessaire sur Σ_{n=1}^{∞} n/(n² + 6) ? Calcule d'abord la limite du terme général uₙ = n/(n² + 6).
  [guided]  n/(n² + 6)
    = (1/n)/(1 + 6/n²)   ← Diviser par n²
    = □   (trous : 0)   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : (1/n)/(1 + 6/n²)
    ? Que dit la condition nécessaire ? · La série diverge : son terme général ne tend pas vers 0 / ✔ On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = □   (trous : 0)   ← uₙ → 0 : il faudra un autre critère
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 0 : la condition nécessaire ne dit rien, il faut un autre critère.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_series_term_to_zero

Que dit la condition nécessaire sur Σ_{n=1}^{∞} (1 + 1/n)^n ? Calcule d'abord la limite du terme général uₙ = (1 + 1/n)^n.
  [guided]  (1 + 1/n)^n
    = e^(n·ln(1 + 1/n))   ← Forme 1^∞ : e^(n·Log(1 + 1/n))
    = □   (trous : e)   ← n·Log(1 + 1/n) → 1
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : e^(n·ln(1 + 1/n))
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = □   (trous : e)   ← Limite e ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → e ≠ 0 : la série diverge.
  pièges : a1_indet_one_inf

Que dit la condition nécessaire sur Σ_{n=1}^{∞} 2n/(5n + 1) ? Calcule d'abord la limite du terme général uₙ = 2n/(5n + 1).
  [guided]  2n/(5n + 1)
    = 2/(5 + 1/n)   ← Diviser en haut et en bas par n
    = □   (trous : 2/5)   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : 2/(5 + 1/n)
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = □   (trous : 2/5)   ← Limite 2/5 ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 2/5 ≠ 0 : la série diverge.

```

### Niveau 2

```
Que dit la condition nécessaire sur Σ_{n=1}^{∞} 5n/(2n + 5) ? Calcule d'abord la limite du terme général uₙ = 5n/(2n + 5).
  [guided]  5n/(2n + 5)
    = 5/(□)   (trous : 5/(2 + 5/n))   ← Diviser en haut et en bas par n
    = □   (trous : 5/2)   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : 5/(2 + 5/n)
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 5/2   ← Limite 5/2 ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 5/2 ≠ 0 : la série diverge.

Que dit la condition nécessaire sur Σ_{n=1}^{∞} (2n² + 4)/(5n² + 4n) ? Calcule d'abord la limite du terme général uₙ = (2n² + 4)/(5n² + 4n).
  [guided]  (2n² + 4)/(5n² + 4n)
    = (2 + 4/n²)/(□)   (trous : (2 + 4/n²)/(5 + 4/n))   ← Diviser en haut et en bas par n²
    = □   (trous : 2/5)   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : (2 + 4/n²)/(5 + 4/n)
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 2/5   ← Limite 2/5 ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 2/5 ≠ 0 : la série diverge.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Que dit la condition nécessaire sur Σ_{n=1}^{∞} 1/√n ? Calcule d'abord la limite du terme général uₙ = 1/√n.
  [guided]  1/√n
    = □   (trous : 0)   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : 1/√n
    ? Que dit la condition nécessaire ? · La série diverge : son terme général ne tend pas vers 0 / ✔ On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 0   ← uₙ → 0 : il faudra un autre critère
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 0 : la condition nécessaire ne dit rien, il faut un autre critère.
  pièges : a1_bh_not_indeterminate, a1_series_term_to_zero

```

### Niveau 3

```
Que dit la condition nécessaire sur Σ_{n=1}^{∞} (1 + 2/n)^n ? Calcule d'abord la limite du terme général uₙ = (1 + 2/n)^n.
  [tap, suivre l'erreur, menu steps]  (1 + 2/n)^n
    = e^(n·ln(1 + 2/n))   ← Forme 1^∞ : e^(n·Log(1 + 2/n))
    = e²   ← n·Log(1 + 2/n) → 2
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : e^(n·ln(1 + 2/n))
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = e²   ← Limite e² ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → e² ≠ 0 : la série diverge.
  pièges : a1_indet_one_inf

Que dit la condition nécessaire sur Σ_{n=1}^{∞} n·sin(2/n) ? Calcule d'abord la limite du terme général uₙ = n·sin(2/n).
  [tap, suivre l'erreur, menu steps]  n·sin(2/n)
    = 2·sin(2/n)/(2/n)   ← Faire apparaître sin u/u, u → 0
    = 2   ← sin u/u → 1
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : 2·sin(2/n)/(2/n)
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 2   ← Limite 2 ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 2 ≠ 0 : la série diverge.
  pièges : a1_dl_factorial_missing

Que dit la condition nécessaire sur Σ_{n=1}^{∞} cos(1/n) ? Calcule d'abord la limite du terme général uₙ = cos(1/n).
  [tap, suivre l'erreur, menu steps]  cos(1/n)
    = 1   ← 1/n → 0 et cos 0 = 1
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : cos(1/n)
    ? Que dit la condition nécessaire ? ✔ La série diverge : son terme général ne tend pas vers 0 / · On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 1   ← Limite 1 ≠ 0
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 1 ≠ 0 : la série diverge.
  pièges : a1_dl_factorial_missing

```

### Niveau 4

```
Pour une seule de ces séries, la condition nécessaire ne permet pas de conclure. Laquelle ?
  · Σ_{n=1}^{∞} (1 + 3/n)^n   ✔ Σ_{n=1}^{∞} ln(1 + 2/n)   · Σ_{n=1}^{∞} cos(1/n)   · Σ_{n=1}^{∞} cos(2/n)

Une seule de ces séries diverge par la condition nécessaire (son terme général ne tend pas vers 0). Laquelle ?
  ✔ Σ_{n=1}^{∞} (3n² + 5)/(2n² + 3n)   · Σ_{n=1}^{∞} ln(1 + 2/n)   · Σ_{n=1}^{∞} 2/(n + 6)   · Σ_{n=1}^{∞} 3/(n + 6)

Que dit la condition nécessaire sur Σ_{n=1}^{∞} n/(n² + 3) ? Calcule d'abord la limite du terme général uₙ = n/(n² + 3).
  [free, suivre l'erreur]  n/(n² + 3)
    = (1/n)/(1 + 3/n²)   ← Diviser par n²
    = 0   ← Passer à la limite
  — Conclusion : rappelle la limite du terme général.  [juge limit]  départ : (1/n)/(1 + 3/n²)
    ? Que dit la condition nécessaire ? · La série diverge : son terme général ne tend pas vers 0 / ✔ On ne sait pas encore : uₙ → 0 ne suffit pas, il faut un autre critère / · La série converge, car uₙ → 0
    = 0   ← uₙ → 0 : il faudra un autre critère
  aides : Regarde d'abord si le terme général tend vers 0. | uₙ → ▢ | uₙ → 0 : la condition nécessaire ne dit rien, il faut un autre critère.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_series_term_to_zero

```

### Niveau 5

```
Vrai ou faux ?
  « Si aₙ ne tend pas vers 0, alors Σ aₙ diverge. » → VRAI

Vrai ou faux ?
  « Si f(n) > n pour tout n ≥ 1, alors Σ 1/f(n) converge. » → FAUX
    contre-exemple (sequence) : a = n+1
  pièges : a1_series_term_to_zero

Vrai ou faux ?
  « Si f(n) > n pour tout n ≥ 1, alors Σ 1/f(n) converge. » → FAUX
    contre-exemple (sequence) : a = n+1
  pièges : a1_series_term_to_zero

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si aₙ ne tend pas vers 0, alors Σ aₙ diverge. » → VRAI
  [examen tf]

```

## Critère de comparaison et de la limite du quotient (`a1-ser-compare`, BA1)

_Comparer à Σ 1/nᵖ, qui converge si et seulement si p > 1._

### Niveau 1

```
Nature de Σ_{n=1}^{∞} (√(n + 2) − √n) (termes positifs) ? Compare à bₙ = 1/√n : calcule la limite de aₙ/bₙ.
  [guided]  √n·(√(n + 2) − √n)
    = 2√n/(√(n + 2) + √n)   ← Multiplier par la quantité conjuguée
    = 2/(√(1 + 2/n) + 1)   ← Diviser par √n
    = □   (trous : 1)   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 1/2)   ← bₙ = 1/√n : p = 1/2 ≤ 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = √n·(√(n + 2) − √n) → ▢ | bₙ = 1/√n, aₙ/bₙ → 1, p = 1/2 ≤ 1 : diverge.
  pièges : a1_sqrt_sum_split

Nature de Σ_{n=1}^{∞} 5/(n² + 5n) (termes positifs) ? Compare à bₙ = 1/n² : calcule la limite de aₙ/bₙ.
  [guided]  n²·5/(n² + 5n)
    = 5/(1 + 5/n)   ← Diviser en haut et en bas par n²
    = □   (trous : 5)   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 2)   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·5/(n² + 5n) → ▢ | bₙ = 1/n², aₙ/bₙ → 5, p = 2 > 1 : converge.

Nature de Σ_{n=1}^{∞} (√(n + 2) − √n)/n (termes positifs) ? Compare à bₙ = 1/n^(3/2) : calcule la limite de aₙ/bₙ.
  [guided]  n^(3/2)·(√(n + 2) − √n)/n
    = 2√n/(√(n + 2) + √n)   ← Multiplier par la quantité conjuguée
    = 2/(√(1 + 2/n) + 1)   ← Diviser par √n
    = □   (trous : 1)   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 3/2)   ← bₙ = 1/n^(3/2) : p = 3/2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n^(3/2)·(√(n + 2) − √n)/n → ▢ | bₙ = 1/n^(3/2), aₙ/bₙ → 1, p = 3/2 > 1 : converge.
  pièges : a1_sqrt_sum_split, a1_riemann_p_boundary

```

### Niveau 2

```
Nature de Σ_{n=1}^{∞} ln(1 + 4/n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [guided]  n·ln(1 + 4/n)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n / · bₙ = 1/√n / · bₙ = 1/n^(3/2)
    = 4·□   (trous : 4·ln(1 + 4/n)/(4/n))   ← Log(1 + u)/u avec u = 4/n → 0
    = □   (trous : 4)   ← Log(1 + u)/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 1   ← bₙ = 1/n : p = 1 ≤ 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n·ln(1 + 4/n) → ▢ | bₙ = 1/n, aₙ/bₙ → 4, p = 1 ≤ 1 : diverge.
  pièges : a1_riemann_p_boundary

Nature de Σ_{n=1}^{∞} (n + 2)/(n² + 4n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [guided]  n·(n + 2)/(n² + 4n)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n / · bₙ = 1/√n / · bₙ = 1/n^(3/2)
    = (1 + 2/n)/(□)   (trous : (1 + 2/n)/(1 + 4/n))   ← Diviser en haut et en bas par n²
    = □   (trous : 1)   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 1   ← bₙ = 1/n : p = 1 ≤ 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n·(n + 2)/(n² + 4n) → ▢ | bₙ = 1/n, aₙ/bₙ → 1, p = 1 ≤ 1 : diverge.
  pièges : a1_riemann_p_boundary

Nature de Σ_{n=1}^{∞} sin(1/n²) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [guided]  n²·sin(1/n²)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n² / · bₙ = 1/n^(3/2) / · bₙ = 1/n³
    = sin(□)/(1/n²)   (trous : sin(1/n²)/(1/n²))   ← sin u/u avec u = 1/n² → 0
    = □   (trous : 1)   ← sin u/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·sin(1/n²) → ▢ | bₙ = 1/n², aₙ/bₙ → 1, p = 2 > 1 : converge.
  pièges : a1_dl_factorial_missing

```

### Niveau 3

```
Nature de Σ_{n=1}^{∞} 4/(n² + 6n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [tap, suivre l'erreur, menu steps]  n²·4/(n² + 6n)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n² / · bₙ = 1/n^(3/2) / · bₙ = 1/n³
    = 4/(1 + 6/n)   ← Diviser en haut et en bas par n²
    = 4   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·4/(n² + 6n) → ▢ | bₙ = 1/n², aₙ/bₙ → 4, p = 2 > 1 : converge.

Nature de Σ_{n=1}^{∞} ln(1 + 3/n²) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [tap, suivre l'erreur, menu steps]  n²·ln(1 + 3/n²)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n² / · bₙ = 1/n^(3/2) / · bₙ = 1/n³
    = 3·ln(1 + 3/n²)/(3/n²)   ← Log(1 + u)/u avec u = 3/n² → 0
    = 3   ← Log(1 + u)/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·ln(1 + 3/n²) → ▢ | bₙ = 1/n², aₙ/bₙ → 3, p = 2 > 1 : converge.

Nature de Σ_{n=1}^{∞} ln(1 + 3/n²) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [tap, suivre l'erreur, menu steps]  n²·ln(1 + 3/n²)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n² / · bₙ = 1/n^(3/2) / · bₙ = 1/n³
    = 3·ln(1 + 3/n²)/(3/n²)   ← Log(1 + u)/u avec u = 3/n² → 0
    = 3   ← Log(1 + u)/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·ln(1 + 3/n²) → ▢ | bₙ = 1/n², aₙ/bₙ → 3, p = 2 > 1 : converge.

```

### Niveau 4

```
Nature de Σ_{n=1}^{∞} ln(1 + 3/n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [free, suivre l'erreur]  n·ln(1 + 3/n)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n / · bₙ = 1/√n / · bₙ = 1/n^(3/2)
    = 3·ln(1 + 3/n)/(3/n)   ← Log(1 + u)/u avec u = 3/n → 0
    = 3   ← Log(1 + u)/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 1   ← bₙ = 1/n : p = 1 ≤ 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n·ln(1 + 3/n) → ▢ | bₙ = 1/n, aₙ/bₙ → 3, p = 1 ≤ 1 : diverge.
  pièges : a1_riemann_p_boundary

Nature de Σ_{n=1}^{∞} (√(n + 1) − √n)/n (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [free, suivre l'erreur]  n^(3/2)·(√(n + 1) − √n)/n
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n^(3/2) / · bₙ = 1/n / · bₙ = 1/n²
    = √n/(√(n + 1) + √n)   ← Multiplier par la quantité conjuguée
    = 1/(√(1 + 1/n) + 1)   ← Diviser par √n
    = 1/2   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 3/2   ← bₙ = 1/n^(3/2) : p = 3/2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n^(3/2)·(√(n + 1) − √n)/n → ▢ | bₙ = 1/n^(3/2), aₙ/bₙ → 1/2, p = 3/2 > 1 : converge.
  pièges : a1_dl_factorial_missing, a1_sqrt_sum_split, a1_riemann_p_boundary

Nature de Σ_{n=1}^{∞} 3/(n² + 6) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [free, suivre l'erreur]  n²·3/(n² + 6)
    ? À quelle série de Riemann Σ bₙ compares-tu Σ aₙ ? ✔ bₙ = 1/n² / · bₙ = 1/n^(3/2) / · bₙ = 1/n³
    = 3/(1 + 6/n²)   ← Diviser en haut et en bas par n²
    = 3   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← bₙ = 1/n² : p = 2 > 1
  aides : Garde les termes qui dominent (ou remplace sin u, Log(1 + u) par u) : à quelle série de Riemann cela ressemble-t-il ? | aₙ/bₙ = n²·3/(n² + 6) → ▢ | bₙ = 1/n², aₙ/bₙ → 3, p = 2 > 1 : converge.

```

### Niveau 5

```
Nature de Σ_{n=1}^{∞} ln(1 + 2/n) (termes positifs) ?
  · Converge : aₙ ~ c/n avec c > 0, et Σ 1/n converge. [a1_riemann_p_boundary]   ✔ Diverge : aₙ/(1/n) → 2 ∈ ]0 ; +∞[, et p = 1 ≤ 1.   · Converge : aₙ ≥ 1/n³ pour n assez grand, et Σ 1/n³ converge. [a1_compare_wrong_direction]   · Converge, car aₙ → 0. [a1_series_term_to_zero]
  pièges : a1_compare_wrong_direction, a1_riemann_p_boundary, a1_series_term_to_zero

Nature de Σ_{n=1}^{∞} (√(n + 5) − √(n + 3))·sin(3/n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [free, sans aide]  n^(3/2)·(√(n + 5) − √(n + 3))·sin(3/n)
    = 2√n/(√(n + 5) + √(n + 3))·sin(3/n)/(1/n)   ← Conjuguée, et n^(3/2) = √n·n
    = 3   ← √n/(√(n + …) + √(n + …)) → 1/2 et sin(3/n)/(1/n) → 3
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 3/2   ← bₙ = 1/n^(3/2) : p = 3/2 > 1
  pièges : a1_dl_factorial_missing, a1_sqrt_sum_split, a1_riemann_p_boundary

Nature de Σ_{n=1}^{∞} (√(n + 4) − √(n + 3))·sin(3/n) (termes positifs) ? Calcule la limite de aₙ/bₙ pour la série de Riemann Σ bₙ qui convient.
  [free, sans aide]  n^(3/2)·(√(n + 4) − √(n + 3))·sin(3/n)
    = √n/(√(n + 4) + √(n + 3))·sin(3/n)/(1/n)   ← Conjuguée, et n^(3/2) = √n·n
    = 3/2   ← √n/(√(n + …) + √(n + …)) → 1/2 et sin(3/n)/(1/n) → 3
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 3/2   ← bₙ = 1/n^(3/2) : p = 3/2 > 1
  pièges : a1_dl_factorial_missing, a1_sqrt_sum_split, a1_riemann_p_boundary

```

### Variantes d'examen

```
Nature de Σ_{n=1}^{∞} (1/n − ln(1 + 1/n)) (termes positifs) ?
  · Converge, car aₙ → 0. [a1_series_term_to_zero]   · Diverge : 0 ≤ aₙ ≤ 1/n, et Σ 1/n diverge. [a1_compare_wrong_direction]   · On ne peut pas conclure : Log(1 + ·)(1/n) ~ 1/n, donc aₙ ~ 1/n − 1/n = 0. [a1_ipe_in_sum]   ✔ Converge : aₙ ~ 1/2·1/n² (développement limité), p = 2 > 1.
  [examen mcq]
  pièges : a1_ipe_in_sum, a1_compare_wrong_direction, a1_series_term_to_zero

Vrai ou faux ?
  « Si aₙ ≥ 0 et Σ aₙ converge, alors Σ aₙ² converge. » → VRAI
  [examen tf]

```

## Critères de d'Alembert et de Cauchy pour les séries (`a1-ser-ratio-root`, BA1)

_|aₙ₊₁/aₙ| → ρ ou ⁿ√|aₙ| → ρ : ρ < 1 converge, ρ > 1 diverge, ρ = 1 ne dit rien._

### Niveau 1

```
Nature de Σn≥1 (5n/(6n + 1))ⁿ ? Par Cauchy : ⁿ√|aₙ| = 5n/(6n + 1).
  [guided]  5n/(6n + 1)
    = 5/(6 + 1/n)   ← Diviser par n
    = □   (trous : 5/6)   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 5/(6 + 1/n)
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = □   (trous : 5/6)   ← ρ < 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = 5n/(6n + 1) → ▢ | ρ = 5/6 < 1 : converge absolument.

Nature de Σn≥1 n·5ⁿ/n! ? Par d'Alembert : aₙ₊₁/aₙ = 5(n + 1)/(n(n + 1)).
  [guided]  5(n + 1)/(n(n + 1))
    = 5/n   ← Simplifier par n + 1
    = □   (trous : 0)   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 5/n
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = □   (trous : 0)   ← ρ < 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = 5(n + 1)/(n(n + 1)) → ▢ | ρ = 0 < 1 : converge absolument.

Nature de Σn≥1 (1 + 1/n)^(n²)/2ⁿ ? Par Cauchy : ⁿ√|aₙ| = (1 + 1/n)^n/2.
  [guided]  (1 + 1/n)^n/2
    = e^(n·ln(1 + 1/n))/2   ← Forme 1^∞ : e^(n·Log(1 + 1/n))
    = □   (trous : e/2)   ← n·Log(1 + 1/n) → 1
  — Conclusion : rappelle ρ.  [juge limit]  départ : e^(n·ln(1 + 1/n))/2
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = □   (trous : e/2)   ← ρ > 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = (1 + 1/n)^n/2 → ▢ | ρ = e/2 > 1 : diverge.

```

### Niveau 2

```
Nature de Σn≥1 (n!)²/(2n)! ? Choisis le critère : la ligne de départ est alors aₙ₊₁/aₙ, déjà formé.
  [guided]  (n + 1)²/((2n + 2)(2n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    ? Pour former aₙ₊₁/aₙ : (2n + 2)!/(2n)! = ? ✔ (2n + 2)(2n + 1) / · 2n + 2 / · (n + 1)(n + 2)
    = (n + 1)/(□)   (trous : (n + 1)/(2(2n + 1)))   ← Simplifier par 2n + 2 = 2(n + 1)
    = □   (trous : 1/4)   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : (n + 1)/(2(2n + 1))
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 1/4   ← ρ < 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = (n + 1)²/((2n + 2)(2n + 1)) → ▢ | ρ = 1/4 < 1 : converge absolument.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_dominant_term_wrong, a1_factorial_ratio

Nature de Σn≥1 3ⁿ(n!)²/(2n)! ? Choisis le critère : la ligne de départ est alors aₙ₊₁/aₙ, déjà formé.
  [guided]  3(n + 1)²/((2n + 2)(2n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    ? Pour former aₙ₊₁/aₙ : (2n + 2)!/(2n)! = ? ✔ (2n + 2)(2n + 1) / · 2n + 2 / · (n + 1)(n + 2)
    = 3□   (trous : 3(n + 1)/(2(2n + 1)))   ← Simplifier par 2n + 2 = 2(n + 1)
    = □   (trous : 3/4)   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 3(n + 1)/(2(2n + 1))
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 3/4   ← ρ < 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = 3(n + 1)²/((2n + 2)(2n + 1)) → ▢ | ρ = 3/4 < 1 : converge absolument.
  pièges : a1_dl_factorial_missing, a1_factorial_ratio

Nature de Σn≥1 (n/(5n + 1))ⁿ ? Choisis le critère : la ligne de départ est alors ⁿ√|aₙ|, déjà formé.
  [guided]  n/(5n + 1)
    ? Quel critère choisis-tu ? · d'Alembert : |aₙ₊₁/aₙ| / ✔ Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = 1/(□)   (trous : 1/(5 + 1/n))   ← Diviser par n
    = □   (trous : 1/5)   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 1/(5 + 1/n)
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 1/5   ← ρ < 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = n/(5n + 1) → ▢ | ρ = 1/5 < 1 : converge absolument.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

```

### Niveau 3

```
Nature de Σn≥1 (n/(2n + 1))ⁿ ?
  [tap, suivre l'erreur, menu steps]  n/(2n + 1)
    ? Quel critère choisis-tu ? · d'Alembert : |aₙ₊₁/aₙ| / ✔ Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = 1/(2 + 1/n)   ← Diviser par n
    = 1/2   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 1/(2 + 1/n)
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 1/2   ← ρ < 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = n/(2n + 1) → ▢ | ρ = 1/2 < 1 : converge absolument.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Nature de Σn≥1 5ⁿ(n!)²/(2n)! ?
  [tap, suivre l'erreur, menu steps]  5(n + 1)²/((2n + 2)(2n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    ? Pour former aₙ₊₁/aₙ : (2n + 2)!/(2n)! = ? ✔ (2n + 2)(2n + 1) / · 2n + 2 / · (n + 1)(n + 2)
    = 5(n + 1)/(2(2n + 1))   ← Simplifier par 2n + 2 = 2(n + 1)
    = 5/4   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 5(n + 1)/(2(2n + 1))
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 5/4   ← ρ > 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = 5(n + 1)²/((2n + 2)(2n + 1)) → ▢ | ρ = 5/4 > 1 : diverge.
  pièges : a1_dl_factorial_missing, a1_factorial_ratio

Nature de Σn≥1 n!/(2n)ⁿ ?
  [tap, suivre l'erreur, menu steps]  (n/(n + 1))^n/2
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = 1/(2(1 + 1/n)^n)   ← (n/(n + 1))ⁿ = 1/(1 + 1/n)ⁿ
    = e^(−1)/2   ← (1 + 1/n)ⁿ → e
  — Conclusion : rappelle ρ.  [juge limit]  départ : 1/(2(1 + 1/n)^n)
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = e^(−1)/2   ← ρ < 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = (n/(n + 1))^n/2 → ▢ | ρ = 1/(2e) < 1 : converge absolument.

```

### Niveau 4

```
Nature de Σn≥1 (1 + 1/n)^(n²)/2ⁿ ?
  [free, suivre l'erreur]  (1 + 1/n)^n/2
    ? Quel critère choisis-tu ? · d'Alembert : |aₙ₊₁/aₙ| / ✔ Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = e^(n·ln(1 + 1/n))/2   ← Forme 1^∞ : e^(n·Log(1 + 1/n))
    = e/2   ← n·Log(1 + 1/n) → 1
  — Conclusion : rappelle ρ.  [juge limit]  départ : e^(n·ln(1 + 1/n))/2
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = e/2   ← ρ > 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = (1 + 1/n)^n/2 → ▢ | ρ = e/2 > 1 : diverge.

Nature de Σn≥1 (2n/(5n + 1))ⁿ ?
  [free, suivre l'erreur]  2n/(5n + 1)
    ? Quel critère choisis-tu ? · d'Alembert : |aₙ₊₁/aₙ| / ✔ Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = 2/(5 + 1/n)   ← Diviser par n
    = 2/5   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 2/(5 + 1/n)
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 2/5   ← ρ < 1
  aides : Une puissance n-ième : Cauchy, la racine n-ième la fait disparaître. | ⁿ√|aₙ| = 2n/(5n + 1) → ▢ | ρ = 2/5 < 1 : converge absolument.

Nature de Σn≥1 n²·5ⁿ/n! ?
  [free, suivre l'erreur]  5(n + 1)²/(n²(n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    = 5(n + 1)/n²   ← Simplifier par n + 1
    = 0   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 5(n + 1)/n²
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 0   ← ρ < 1
  aides : Des factorielles : d'Alembert. (n + 1)! = (n + 1)·n! et (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. | aₙ₊₁/aₙ = 5(n + 1)²/(n²(n + 1)) → ▢ | ρ = 0 < 1 : converge absolument.
  pièges : a1_dl_factorial_missing

```

### Niveau 5

```
Nature de Σn≥1 7ⁿ(n!)²/(2n)! ?
  [free, sans aide]  7(n + 1)²/((2n + 2)(2n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    ? Pour former aₙ₊₁/aₙ : (2n + 2)!/(2n)! = ? ✔ (2n + 2)(2n + 1) / · 2n + 2 / · (n + 1)(n + 2)
    = 7(n + 1)/(2(2n + 1))   ← Simplifier par 2n + 2 = 2(n + 1)
    = 7/4   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 7(n + 1)/(2(2n + 1))
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 7/4   ← ρ > 1
  pièges : a1_dl_factorial_missing, a1_factorial_ratio

Nature de Σn≥1 6ⁿ(n!)²/(2n)! ?
  [free, sans aide]  6(n + 1)²/((2n + 2)(2n + 1))
    ? Quel critère choisis-tu ? ✔ d'Alembert : |aₙ₊₁/aₙ| / · Cauchy : ⁿ√|aₙ| / · Comparer à une série de Riemann
    ? Pour former aₙ₊₁/aₙ : (2n + 2)!/(2n)! = ? ✔ (2n + 2)(2n + 1) / · 2n + 2 / · (n + 1)(n + 2)
    = 6(n + 1)/(2(2n + 1))   ← Simplifier par 2n + 2 = 2(n + 1)
    = 3/2   ← Passer à la limite
  — Conclusion : rappelle ρ.  [juge limit]  départ : 6(n + 1)/(2(2n + 1))
    ? Nature de la série ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / ✔ Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Critère de Cauchy : ⁿ√|aₙ| → ρ
    = 3/2   ← ρ > 1
  pièges : a1_dl_factorial_missing, a1_factorial_ratio

Nature de Σn≥1 3ⁿ(n!)²/(2n)! ?
  ✔ Absolument convergente   · Convergente, mais pas absolument   · Divergente, car |aₙ| → +∞ [a1_factorial_ratio]   · Divergente, car |aₙ| → 1
  pièges : a1_factorial_ratio

```

### Variantes d'examen

```
Nature de Σn≥1 2ⁿ(n!)²/(2n)! ?
  ✔ Absolument convergente   · Convergente, mais pas absolument   · Divergente, car |aₙ| → +∞ [a1_factorial_ratio]   · Divergente, car |aₙ| → 1
  [examen mcq]
  pièges : a1_factorial_ratio

Vrai ou faux ?
  « Si aₙ > 0 et aₙ₊₁/aₙ < 1 pour tout n, alors Σ aₙ converge. » → FAUX
    contre-exemple (sequence) : a = 1/n
  [examen tf]
  pièges : a1_ratio_lt1_termwise

```

## Leibniz, convergence absolue et semi-convergence (`a1-ser-leibniz-abs`, BA1)

_D'abord Σ |aₙ| ; si elle diverge, Leibniz : xₙ décroissante et → 0._

### Niveau 1

```
Nature de Σn≥1 (−1)ⁿ⁺¹·sin(1/n²) : converge-t-elle absolument, seulement, ou diverge-t-elle ? Compare |aₙ| à 1/n².
  [guided]  n²·sin(1/n²)
    = sin(1/n²)/(1/n²)   ← sin u/u avec u = 1/n²
    = □   (trous : 1)   ← sin u/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 2)   ← p = 2 > 1 : Σ |aₙ| converge
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | |aₙ| ~ 1/n² : converge absolument.
  pièges : a1_dl_factorial_missing, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ·sin(1/n²) : converge-t-elle absolument, seulement, ou diverge-t-elle ? Compare |aₙ| à 1/n².
  [guided]  n²·sin(1/n²)
    = sin(1/n²)/(1/n²)   ← sin u/u avec u = 1/n²
    = □   (trous : 1)   ← sin u/u → 1
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 2)   ← p = 2 > 1 : Σ |aₙ| converge
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | |aₙ| ~ 1/n² : converge absolument.
  pièges : a1_dl_factorial_missing, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ/(n + 2) : converge-t-elle absolument, seulement, ou diverge-t-elle ? Étape 1 : compare |aₙ| à 1/n. Étape 2 : Leibniz avec xₙ = |aₙ|.
  [guided]  n/(n + 2)
    = 1/(1 + 2/n)   ← Diviser par n
    = □   (trous : 1)   ← Passer à la limite
  — Leibniz : montre que xₙ = 1/(n + 2) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : 1/(n + 2) − 1/(n + 3)
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    = 1/((n + 2)(n + 3))   ← Même dénominateur
    = □   (trous : 0)   ← C'est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : 1/(n + 2)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 0)   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_riemann_p_boundary, a1_abs_conv_confused

```

### Niveau 2

```
Nature de Σn≥1 (−1)ⁿ/(√n + 1) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [guided]  √n/(√n + 1)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = 1/(□)   (trous : 1/(1 + 1/√n))   ← Diviser par √n
    = □   (trous : 1)   ← Passer à la limite
  — Leibniz : montre que xₙ = 1/(√n + 1) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : 1/(√n + 1) − 1/(√(n + 1) + 1)
    ? |aₙ| ~ 1/√n : Σ |aₙ| … ✔ diverge (p = 1/2 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = (√(n + 1) − √n)/(□)   (trous : (√(n + 1) − √n)/((√n + 1)(√(n + 1) + 1)))   ← Même dénominateur
    = □   (trous : 0)   ← √(n + 1) > √n : c'est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : 1/(√n + 1)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 0)   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1/2), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_bh_quotient_rule, a1_series_term_to_zero, a1_leibniz_no_decrease, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ⁺¹·Log(1 + 1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [guided]  n·ln(1 + 1/n)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = □   (trous : 1)   ← Log(1 + u)/u → 1 avec u = 1/n
  — Leibniz : montre que xₙ = ln(1 + 1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : ln(1 + 1/n) − ln(1 + 1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = □   (trous : ln((n + 1)²/(n(n + 2))))   ← Regrouper les Log
    = □   (trous : 0)   ← (n + 1)² > n(n + 2) : le Log est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : ln(1 + 1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 0)   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_series_term_to_zero, a1_riemann_p_boundary, a1_leibniz_no_decrease, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ⁺¹·Log(1 + 1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [guided]  n·ln(1 + 1/n)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = □   (trous : 1)   ← Log(1 + u)/u → 1 avec u = 1/n
  — Leibniz : montre que xₙ = ln(1 + 1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : ln(1 + 1/n) − ln(1 + 1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = □   (trous : ln((n + 1)²/(n(n + 2))))   ← Regrouper les Log
    = □   (trous : 0)   ← (n + 1)² > n(n + 2) : le Log est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : ln(1 + 1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = □   (trous : 0)   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_series_term_to_zero, a1_riemann_p_boundary, a1_leibniz_no_decrease, a1_abs_conv_confused

```

### Niveau 3

```
Nature de Σn≥1 (−1)ⁿ·sin(1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [tap, suivre l'erreur, menu steps]  n·sin(1/n)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = sin(1/n)/(1/n)   ← sin u/u avec u = 1/n
    = 1   ← sin u/u → 1
  — Leibniz : montre que xₙ = sin(1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : sin(1/n) − sin(1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = 0   ← sin croît sur [0 ; 1] et 1/(n + 1) < 1/n : c'est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : sin(1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 0   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_dl_factorial_missing, a1_series_term_to_zero, a1_riemann_p_boundary, a1_leibniz_no_decrease, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ·Log(1 + 1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [tap, suivre l'erreur, menu steps]  n·ln(1 + 1/n)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = 1   ← Log(1 + u)/u → 1 avec u = 1/n
  — Leibniz : montre que xₙ = ln(1 + 1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : ln(1 + 1/n) − ln(1 + 1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = ln((n + 1)²/(n(n + 2)))   ← Regrouper les Log
    = 0   ← (n + 1)² > n(n + 2) : le Log est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : ln(1 + 1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 0   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_series_term_to_zero, a1_riemann_p_boundary, a1_leibniz_no_decrease, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ⁺¹·Log(1 + 1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [tap, suivre l'erreur, menu steps]  n·ln(1 + 1/n)
    ? Par quoi commences-tu ? ✔ Étudier Σ |aₙ| (convergence absolue) / ✔ Appliquer Leibniz tout de suite / · aₙ → 0, donc la série converge
    = 1   ← Log(1 + u)/u → 1 avec u = 1/n
  — Leibniz : montre que xₙ = ln(1 + 1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : ln(1 + 1/n) − ln(1 + 1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    ? Que demande le critère de Leibniz pour aₙ = (−1)ⁿxₙ ? ✔ xₙ ≥ 0, xₙ décroissante et xₙ → 0 / · Des signes alternés et aₙ → 0 / · xₙ décroissante
    = ln((n + 1)²/(n(n + 2)))   ← Regrouper les Log
    = 0   ← (n + 1)² > n(n + 2) : le Log est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : ln(1 + 1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 0   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_series_term_to_zero, a1_riemann_p_boundary, a1_leibniz_no_decrease, a1_abs_conv_confused

```

### Niveau 4

```
Nature de Σn≥1 (−1)ⁿ/(n² + 4) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [free, suivre l'erreur]  n²/(n² + 4)
    = 1/(1 + 4/n²)   ← Diviser par n²
    = 1   ← Passer à la limite
  — Conclusion : quel est l'exposant p de la série de Riemann ?  [juge value]  départ : p
    ? Nature de la série ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / ✔ Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / · Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 2   ← p = 2 > 1 : Σ |aₙ| converge
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | |aₙ| ~ 1/n² : converge absolument.
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ·Log(1 + 1/n) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [free, suivre l'erreur]  n·ln(1 + 1/n)
    = 1   ← Log(1 + u)/u → 1 avec u = 1/n
  — Leibniz : montre que xₙ = ln(1 + 1/n) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : ln(1 + 1/n) − ln(1 + 1/(n + 1))
    ? |aₙ| ~ 1/n : Σ |aₙ| … ✔ diverge (p = 1 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    = ln((n + 1)²/(n(n + 2)))   ← Regrouper les Log
    = 0   ← (n + 1)² > n(n + 2) : le Log est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : ln(1 + 1/n)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 0   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_riemann_p_boundary, a1_abs_conv_confused

Nature de Σn≥1 (−1)ⁿ/(√n + 2) : converge-t-elle absolument, seulement, ou diverge-t-elle ?
  [free, suivre l'erreur]  √n/(√n + 2)
    = 1/(1 + 2/√n)   ← Diviser par √n
    = 1   ← Passer à la limite
  — Leibniz : montre que xₙ = 1/(√n + 2) décroît, avec xₙ − xₙ₊₁ ≥ 0.  [juge equiv]  départ : 1/(√n + 2) − 1/(√(n + 1) + 2)
    ? |aₙ| ~ 1/√n : Σ |aₙ| … ✔ diverge (p = 1/2 ≤ 1) : pas de convergence absolue / · converge : la série converge absolument
    = (√(n + 1) − √n)/((√n + 2)(√(n + 1) + 2))   ← Même dénominateur
    = 0   ← √(n + 1) > √n : c'est positif
  — Conclus, puis vérifie la dernière hypothèse de Leibniz : xₙ → 0.  [juge limit]  départ : 1/(√n + 2)
    ? Nature de la série ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère conclut ? · Condition nécessaire : le terme général ne tend pas vers 0 / · Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ / · Critère de d'Alembert : |aₙ₊₁/aₙ| → ρ / ✔ Comparaison pour Σ |aₙ|, puis le critère de Leibniz
    = 0   ← xₙ → 0
  aides : Commence par les valeurs absolues ; si Σ |aₙ| diverge, essaie Leibniz et vérifie ses trois hypothèses. | |aₙ| ~ 1/n^▢ | Pas absolument (p = 1/2), mais Leibniz : xₙ décroît vers 0.
  pièges : a1_bh_quotient_rule, a1_abs_conv_confused

```

### Niveau 5

```
Nature de Σ_{n=2}^{∞} (−1)^n/(√n + (−1)^n) ?
  · Converge par Leibniz : les signes alternent et aₙ → 0. [a1_leibniz_no_decrease]   · Converge absolument : |aₙ| → 0. [a1_abs_conv_confused]   ✔ Diverge : aₙ = (−1)ⁿ√n/(n − 1) − 1/(n − 1), une série convergente moins une divergente.   · Converge, car aₙ → 0. [a1_series_term_to_zero]
  pièges : a1_leibniz_no_decrease, a1_abs_conv_confused, a1_series_term_to_zero

Nature de Σn≥1 (−1)ⁿ/(√n + 5) ?
  · Converge absolument : |aₙ| → 0. [a1_series_term_to_zero]   ✔ Converge, mais pas absolument (semi-convergente) : Σ |aₙ| diverge (comme Σ 1/√n), et Leibniz s'applique.   · Diverge : Σ |aₙ| diverge (comme Σ 1/√n). [a1_abs_conv_confused]   · Converge absolument : Leibniz s'applique. [a1_abs_conv_confused]
  pièges : a1_abs_conv_confused, a1_series_term_to_zero

Nature de Σn≥1 (−1)ⁿ/(n + 3) ?
  · Converge absolument : |aₙ| → 0. [a1_series_term_to_zero]   ✔ Converge, mais pas absolument (semi-convergente) : Σ |aₙ| diverge (comme Σ 1/n), et Leibniz s'applique.   · Converge absolument : Leibniz s'applique. [a1_abs_conv_confused]   · Diverge : Σ |aₙ| diverge (comme Σ 1/n). [a1_abs_conv_confused]
  pièges : a1_abs_conv_confused, a1_series_term_to_zero

```

### Variantes d'examen

```
Nature de Σn≥1 (−1)ⁿ⁺¹/(√n + 2) ?
  ✔ Converge, mais pas absolument (semi-convergente) : Σ |aₙ| diverge (comme Σ 1/√n), et Leibniz s'applique.   · Converge absolument : Leibniz s'applique. [a1_abs_conv_confused]   · Diverge : Σ |aₙ| diverge (comme Σ 1/√n). [a1_abs_conv_confused]   · Converge absolument : |aₙ| → 0. [a1_series_term_to_zero]
  [examen mcq]
  pièges : a1_abs_conv_confused, a1_series_term_to_zero

Vrai ou faux ?
  « Si aₙ ≥ 0 et Σ aₙ converge, alors Σ (−1)ⁿaₙ converge. » → VRAI
  [examen tf]

```

## Séries à paramètre : ensemble de convergence (`a1-ser-param`, BA1)

_Le critère en gardant le paramètre, une inéquation, puis les bornes à part._

### Niveau 1

```
Pour quels λ ≠ −10 la série Σ_{n=0}^{∞} (3λ/(λ + 10))^n converge-t-elle ? C'est une géométrique : elle converge si et seulement si |q| < 1.
  [guided]  |3λ/(λ + 10)| < 1
    = |3λ| < |λ + 10|   ← |A/B| < 1 ⇔ |A| < |B|
    = 9λ² < (λ + 10)²   ← Élever au carré (deux membres positifs)
    = 8λ² − 20λ − 100 < 0   ← Développer et ordonner
    = (λ − 5)(□) < 0   (trous : (λ − 5)(λ + 5/2) < 0)   ← Racines −5/2 et 5
    = □   (trous : ]−5/2 ; 5[)   ← Négatif entre les racines
  — Borne λ = −5/2 : que vaut la raison q ?  [juge value]  départ : 3·(−5/2)/((−5/2) + 10)
    = □   (trous : −1)   ← q = −1
  — Borne λ = 5 : que vaut q ?  [juge value]  départ : 3·(5)/((5) + 10)
    ? En λ = −5/2, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = □   (trous : 1)   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |3λ/(λ + 10)| < 1
    ? En λ = 5, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = □   (trous : ]−5/2 ; 5[)   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−5)(λ ▢) < 0 | ]−5/2 ; 5[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

Pour quels λ ≠ −9 la série Σ_{n=0}^{∞} (2λ/(λ + 9))^n converge-t-elle ? C'est une géométrique : elle converge si et seulement si |q| < 1.
  [guided]  |2λ/(λ + 9)| < 1
    = |2λ| < |λ + 9|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < (λ + 9)²   ← Élever au carré (deux membres positifs)
    = 3λ² − 18λ − 81 < 0   ← Développer et ordonner
    = (λ − 9)(□) < 0   (trous : (λ − 9)(λ + 3) < 0)   ← Racines −3 et 9
    = □   (trous : ]−3 ; 9[)   ← Négatif entre les racines
  — Borne λ = −3 : que vaut la raison q ?  [juge value]  départ : 2·(−3)/((−3) + 9)
    = □   (trous : −1)   ← q = −1
  — Borne λ = 9 : que vaut q ?  [juge value]  départ : 2·(9)/((9) + 9)
    ? En λ = −3, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = □   (trous : 1)   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 9)| < 1
    ? En λ = 9, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = □   (trous : ]−3 ; 9[)   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−9)(λ ▢) < 0 | ]−3 ; 9[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

Pour quels λ ≠ −6 la série Σ_{n=0}^{∞} (2λ/(λ + 6))^n converge-t-elle ? C'est une géométrique : elle converge si et seulement si |q| < 1.
  [guided]  |2λ/(λ + 6)| < 1
    = |2λ| < |λ + 6|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < (λ + 6)²   ← Élever au carré (deux membres positifs)
    = 3λ² − 12λ − 36 < 0   ← Développer et ordonner
    = (λ − 6)(□) < 0   (trous : (λ − 6)(λ + 2) < 0)   ← Racines −2 et 6
    = □   (trous : ]−2 ; 6[)   ← Négatif entre les racines
  — Borne λ = −2 : que vaut la raison q ?  [juge value]  départ : 2·(−2)/((−2) + 6)
    = □   (trous : −1)   ← q = −1
  — Borne λ = 6 : que vaut q ?  [juge value]  départ : 2·(6)/((6) + 6)
    ? En λ = −2, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = □   (trous : 1)   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 6)| < 1
    ? En λ = 6, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = □   (trous : ]−2 ; 6[)   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−6)(λ ▢) < 0 | ]−2 ; 6[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

```

### Niveau 2

```
Pour quels λ ≠ −3 la série Σ_{n=0}^{∞} (λ/(λ + 3))^n converge-t-elle ?
  [guided]  |λ/(λ + 3)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = λ/(λ+3) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |λ| < |λ + 3|   ← |A/B| < 1 ⇔ |A| < |B|
    = λ² < □   (trous : λ² < (λ + 3)²)   ← Élever au carré
    = 6λ + 9 > 0   ← Développer : λ² se simplifie
    = □   (trous : ]−3/2 ; +∞[)   ← λ > −3/2
  — Borne λ = −3/2 : que vaut la raison q ?  [juge value]  départ : (−3/2)/((−3/2) + 3)
    = −1   ← q = −1
  — Ensemble de convergence :  [juge solset]  départ : |λ/(λ + 3)| < 1
    ? En λ = −3/2, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = ]−3/2 ; +∞[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | Développe (λ + 3)² : λ² se simplifie, et il reste 6λ + ▢ > 0. | ]−3/2 ; +∞[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

Pour quels λ ≠ −9 la série Σ_{n=0}^{∞} (2λ/(λ + 9))^n converge-t-elle ?
  [guided]  |2λ/(λ + 9)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = 2λ/(λ+9) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |2λ| < |λ + 9|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < □   (trous : 4λ² < (λ + 9)²)   ← Élever au carré (deux membres positifs)
    = 3λ² − 18λ − 81 < 0   ← Développer et ordonner
    = (λ − 9)(λ + 3) < 0   ← Racines −3 et 9
    = □   (trous : ]−3 ; 9[)   ← Négatif entre les racines
  — Borne λ = −3 : que vaut la raison q ?  [juge value]  départ : 2·(−3)/((−3) + 9)
    = −1   ← q = −1
  — Borne λ = 9 : que vaut q ?  [juge value]  départ : 2·(9)/((9) + 9)
    ? En λ = −3, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 9)| < 1
    ? En λ = 9, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−3 ; 9[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−9)(λ ▢) < 0 | ]−3 ; 9[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

Pour quels λ ≠ −6 la série Σ_{n=0}^{∞} (2λ/(λ + 6))^n converge-t-elle ?
  [guided]  |2λ/(λ + 6)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = 2λ/(λ+6) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |2λ| < |λ + 6|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < □   (trous : 4λ² < (λ + 6)²)   ← Élever au carré (deux membres positifs)
    = 3λ² − 12λ − 36 < 0   ← Développer et ordonner
    = (λ − 6)(λ + 2) < 0   ← Racines −2 et 6
    = □   (trous : ]−2 ; 6[)   ← Négatif entre les racines
  — Borne λ = −2 : que vaut la raison q ?  [juge value]  départ : 2·(−2)/((−2) + 6)
    = −1   ← q = −1
  — Borne λ = 6 : que vaut q ?  [juge value]  départ : 2·(6)/((6) + 6)
    ? En λ = −2, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 6)| < 1
    ? En λ = 6, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−2 ; 6[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−6)(λ ▢) < 0 | ]−2 ; 6[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

```

### Niveau 3

```
Pour quels λ ≠ −6 la série Σ_{n=0}^{∞} (2λ/(λ + 6))^n converge-t-elle ?
  [tap, suivre l'erreur, menu steps]  |2λ/(λ + 6)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = 2λ/(λ+6) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |2λ| < |λ + 6|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < (λ + 6)²   ← Élever au carré (deux membres positifs)
    = 3λ² − 12λ − 36 < 0   ← Développer et ordonner
    = (λ − 6)(λ + 2) < 0   ← Racines −2 et 6
    = ]−2 ; 6[   ← Négatif entre les racines
  — Borne λ = −2 : que vaut la raison q ?  [juge value]  départ : 2·(−2)/((−2) + 6)
    = −1   ← q = −1
  — Borne λ = 6 : que vaut q ?  [juge value]  départ : 2·(6)/((6) + 6)
    ? En λ = −2, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 6)| < 1
    ? En λ = 6, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−2 ; 6[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−6)(λ ▢) < 0 | ]−2 ; 6[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

Pour quels λ ≠ −4 la série Σ_{n=0}^{∞} (3λ/(λ + 4))^n converge-t-elle ?
  [tap, suivre l'erreur, menu steps]  |3λ/(λ + 4)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = 3λ/(λ+4) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |3λ| < |λ + 4|   ← |A/B| < 1 ⇔ |A| < |B|
    = 9λ² < (λ + 4)²   ← Élever au carré (deux membres positifs)
    = 8λ² − 8λ − 16 < 0   ← Développer et ordonner
    = (λ − 2)(λ + 1) < 0   ← Racines −1 et 2
    = ]−1 ; 2[   ← Négatif entre les racines
  — Borne λ = −1 : que vaut la raison q ?  [juge value]  départ : 3·(−1)/((−1) + 4)
    = −1   ← q = −1
  — Borne λ = 2 : que vaut q ?  [juge value]  départ : 3·(2)/((2) + 4)
    ? En λ = −1, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |3λ/(λ + 4)| < 1
    ? En λ = 2, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−1 ; 2[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−2)(λ ▢) < 0 | ]−1 ; 2[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

Pour quels λ ≠ −3 la série Σ_{n=0}^{∞} (2λ/(λ + 3))^n converge-t-elle ?
  [tap, suivre l'erreur, menu steps]  |2λ/(λ + 3)| < 1
    ? Quel critère pour Σ qⁿ ? ✔ Série géométrique de raison q = 2λ/(λ+3) : converge si et seulement si |q| < 1 / ✔ Cauchy : ⁿ√|qⁿ| = |q|, puis ρ < 1 / · Le terme général qⁿ tend vers 0 : la série converge pour tout λ
    = |2λ| < |λ + 3|   ← |A/B| < 1 ⇔ |A| < |B|
    = 4λ² < (λ + 3)²   ← Élever au carré (deux membres positifs)
    = 3λ² − 6λ − 9 < 0   ← Développer et ordonner
    = (λ − 3)(λ + 1) < 0   ← Racines −1 et 3
    = ]−1 ; 3[   ← Négatif entre les racines
  — Borne λ = −1 : que vaut la raison q ?  [juge value]  départ : 2·(−1)/((−1) + 3)
    = −1   ← q = −1
  — Borne λ = 3 : que vaut q ?  [juge value]  départ : 2·(3)/((3) + 3)
    ? En λ = −1, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |2λ/(λ + 3)| < 1
    ? En λ = 3, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−1 ; 3[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−3)(λ ▢) < 0 | ]−1 ; 3[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_series_term_to_zero, a1_param_bounds_untreated

```

### Niveau 4

```
Pour quels λ ≠ −6 la série Σ_{n=0}^{∞} (5λ/(λ + 6))^n converge-t-elle ?
  [free, suivre l'erreur]  |5λ/(λ + 6)| < 1
    = |5λ| < |λ + 6|   ← |A/B| < 1 ⇔ |A| < |B|
    = 25λ² < (λ + 6)²   ← Élever au carré (deux membres positifs)
    = 24λ² − 12λ − 36 < 0   ← Développer et ordonner
    = (λ − 3/2)(λ + 1) < 0   ← Racines −1 et 3/2
    = ]−1 ; 3/2[   ← Négatif entre les racines
  — Borne λ = −1 : que vaut la raison q ?  [juge value]  départ : 5·(−1)/((−1) + 6)
    = −1   ← q = −1
  — Borne λ = 3/2 : que vaut q ?  [juge value]  départ : 5·(3/2)/((3/2) + 6)
    ? En λ = −1, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |5λ/(λ + 6)| < 1
    ? En λ = 3/2, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−1 ; 3/2[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−3/2)(λ ▢) < 0 | ]−1 ; 3/2[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

Pour quels λ ≠ −4 la série Σ_{n=0}^{∞} (3λ/(λ + 4))^n converge-t-elle ?
  [free, suivre l'erreur]  |3λ/(λ + 4)| < 1
    = |3λ| < |λ + 4|   ← |A/B| < 1 ⇔ |A| < |B|
    = 9λ² < (λ + 4)²   ← Élever au carré (deux membres positifs)
    = 8λ² − 8λ − 16 < 0   ← Développer et ordonner
    = (λ − 2)(λ + 1) < 0   ← Racines −1 et 2
    = ]−1 ; 2[   ← Négatif entre les racines
  — Borne λ = −1 : que vaut la raison q ?  [juge value]  départ : 3·(−1)/((−1) + 4)
    = −1   ← q = −1
  — Borne λ = 2 : que vaut q ?  [juge value]  départ : 3·(2)/((2) + 4)
    ? En λ = −1, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |3λ/(λ + 4)| < 1
    ? En λ = 2, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−1 ; 2[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−2)(λ ▢) < 0 | ]−1 ; 2[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

Pour quels λ ≠ −12 la série Σ_{n=0}^{∞} (3λ/(λ + 12))^n converge-t-elle ?
  [free, suivre l'erreur]  |3λ/(λ + 12)| < 1
    = |3λ| < |λ + 12|   ← |A/B| < 1 ⇔ |A| < |B|
    = 9λ² < (λ + 12)²   ← Élever au carré (deux membres positifs)
    = 8λ² − 24λ − 144 < 0   ← Développer et ordonner
    = (λ − 6)(λ + 3) < 0   ← Racines −3 et 6
    = ]−3 ; 6[   ← Négatif entre les racines
  — Borne λ = −3 : que vaut la raison q ?  [juge value]  départ : 3·(−3)/((−3) + 12)
    = −1   ← q = −1
  — Borne λ = 6 : que vaut q ?  [juge value]  départ : 3·(6)/((6) + 12)
    ? En λ = −3, q = −1 : la série Σ (−1)ⁿ… ✔ diverge : son terme général ne tend pas vers 0 / · converge par Leibniz : la borne est dans l'ensemble
    = 1   ← q = 1
  — Ensemble de convergence :  [juge solset]  départ : |3λ/(λ + 12)| < 1
    ? En λ = 6, q = 1 : la série Σ 1… ✔ diverge : son terme général ne tend pas vers 0 / · converge : la borne est dans l'ensemble
    = ]−3 ; 6[   ← Bornes exclues
  aides : C'est une géométrique : elle converge si et seulement si |q| < 1. Puis regarde les bornes à part. | (λ−6)(λ ▢) < 0 | ]−3 ; 6[, bornes exclues (|q| = 1).
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket, a1_param_bounds_untreated

```

### Niveau 5

```
Pour α > 0, étudie la nature de Σ_{k=1}^{∞} (−1)^(k + 1)·k^(3α)/(α^k + k⁴) : absolument convergente, semi-convergente ou divergente ? On note uₖ son terme général.
  [problème, 9 points]
  partie 1 (α > 1 : d'Alembert sur |uₖ| : 2)
  Cas α > 1. Simplifie le rapport |uₖ₊₁|/|uₖ| de d'Alembert jusqu'à ((k + 1)/k)^(3α)·(1 + k⁴/α^k)/(α + (k + 1)⁴/α^k).
    [free, sans aide, suivre l'erreur]  (k + 1)^(3α)/(α^(k + 1) + (k + 1)⁴)·(α^k + k⁴)/k^(3α)
      = ((k + 1)/k)^(3α)·(α^k + k⁴)/(α^(k + 1) + (k + 1)⁴)   ← Regrouper les puissances de k
      = ((k + 1)/k)^(3α)·(1 + k⁴/α^k)/(α + (k + 1)⁴/α^k)   ← Diviser en haut et en bas par αᵏ
  partie 2 (α > 1 : limite du rapport : 1)
  Cas α > 1 : quand k → +∞, ce rapport tend vers :
    · α   ✔ 1/α   · 1   · 0
  partie 3 (α > 1 : conclusion : 1)
  Cas α > 1 : la série est
    ✔ absolument convergente   · semi-convergente   · divergente   · on ne peut pas conclure [a1_ratio_one]
  partie 4 (0 < α < 1 : comparaison : 1 ; Pour quels α ∈ ]0 ; 1[ l'exposant 4 − 3α est-il > 1 ? : 1)
  Cas 0 < α < 1. Compare |uₖ| à 1/k^(4 − 3α) : simplifie k^(4 − 3α)·|uₖ| jusqu'à 1/(1 + α^k/k⁴), puis étudie l'exposant.
    [free, sans aide, suivre l'erreur]  k^(4 − 3α)·k^(3α)/(α^k + k⁴)
      (0 < α < 1 : αᵏ → 0, donc |uₖ| ~ k^(3α)/k⁴ = 1/k^(4 − 3α).)
      = 1/(1 + α^k/k⁴)   ← k^(4 − 3α)·k^(3α) = k⁴, puis diviser par k⁴ : → 1
    — Pour quels α ∈ ]0 ; 1[ l'exposant 4 − 3α est-il > 1 ?  [juge solset]  départ : 4 − 3α > 1
      = α < 1   ← Résoudre
      = ]0 ; 1[   ← Toujours, sur ]0 ; 1[
  partie 5 (0 < α < 1 : conclusion : 1)
  Cas 0 < α < 1 : la série est
    ✔ absolument convergente   · semi-convergente [a1_abs_conv_confused]   · divergente   · on ne peut pas conclure
  partie 6 (α = 1 : |uₖ| et Leibniz : 0,5 ; Leibniz : xₖ = k³/(1 + k⁴) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0. : 0,5)
  Cas α = 1 : |uₖ| = k³/(1 + k⁴). Calcule la limite de k·|uₖ|, puis vérifie la décroissance de Leibniz.
    [free, sans aide, suivre l'erreur]  k·k³/(1 + k⁴)
      = 1/(1/k⁴ + 1)   ← Diviser par k⁴
      = 1   ← |uₖ| ~ 1/k : Σ |uₖ| diverge
    — Leibniz : xₖ = k³/(1 + k⁴) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0.  [juge equiv]  départ : k³/(1 + k⁴) − (k + 1)³/(1 + (k + 1)⁴)
      = 0   ← C'est positif
  partie 7 (α = 1 : conclusion : 1)
  Cas α = 1 : la série est
    · absolument convergente [a1_abs_conv_confused]   ✔ semi-convergente   · divergente [a1_abs_conv_confused]   · on ne peut pas conclure
  pièges : g2_exp_sum, a1_ratio_one, a1_abs_conv_confused

Pour α > 0, étudie la nature de Σ_{k=1}^{∞} (−1)^(k + 1)·k^(2α)/(α^k + k³) : absolument convergente, semi-convergente ou divergente ? On note uₖ son terme général.
  [problème, 9 points]
  partie 1 (α > 1 : d'Alembert sur |uₖ| : 2)
  Cas α > 1. Simplifie le rapport |uₖ₊₁|/|uₖ| de d'Alembert jusqu'à ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k).
    [free, sans aide, suivre l'erreur]  (k + 1)^(2α)/(α^(k + 1) + (k + 1)³)·(α^k + k³)/k^(2α)
      = ((k + 1)/k)^(2α)·(α^k + k³)/(α^(k + 1) + (k + 1)³)   ← Regrouper les puissances de k
      = ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k)   ← Diviser en haut et en bas par αᵏ
  partie 2 (α > 1 : limite du rapport : 1)
  Cas α > 1 : quand k → +∞, ce rapport tend vers :
    ✔ 1/α   · 1   · α   · 0
  partie 3 (α > 1 : conclusion : 1)
  Cas α > 1 : la série est
    ✔ absolument convergente   · semi-convergente   · divergente   · on ne peut pas conclure [a1_ratio_one]
  partie 4 (0 < α < 1 : comparaison : 1 ; Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ? : 1)
  Cas 0 < α < 1. Compare |uₖ| à 1/k^(3 − 2α) : simplifie k^(3 − 2α)·|uₖ| jusqu'à 1/(1 + α^k/k³), puis étudie l'exposant.
    [free, sans aide, suivre l'erreur]  k^(3 − 2α)·k^(2α)/(α^k + k³)
      (0 < α < 1 : αᵏ → 0, donc |uₖ| ~ k^(2α)/k³ = 1/k^(3 − 2α).)
      = 1/(1 + α^k/k³)   ← k^(3 − 2α)·k^(2α) = k³, puis diviser par k³ : → 1
    — Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ?  [juge solset]  départ : 3 − 2α > 1
      = α < 1   ← Résoudre
      = ]0 ; 1[   ← Toujours, sur ]0 ; 1[
  partie 5 (0 < α < 1 : conclusion : 1)
  Cas 0 < α < 1 : la série est
    ✔ absolument convergente   · semi-convergente [a1_abs_conv_confused]   · divergente   · on ne peut pas conclure
  partie 6 (α = 1 : |uₖ| et Leibniz : 0,5 ; Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0. : 0,5)
  Cas α = 1 : |uₖ| = k²/(1 + k³). Calcule la limite de k·|uₖ|, puis vérifie la décroissance de Leibniz.
    [free, sans aide, suivre l'erreur]  k·k²/(1 + k³)
      = 1/(1/k³ + 1)   ← Diviser par k³
      = 1   ← |uₖ| ~ 1/k : Σ |uₖ| diverge
    — Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0.  [juge equiv]  départ : k²/(1 + k³) − (k + 1)²/(1 + (k + 1)³)
      = 0   ← C'est positif
  partie 7 (α = 1 : conclusion : 1)
  Cas α = 1 : la série est
    · absolument convergente [a1_abs_conv_confused]   ✔ semi-convergente   · divergente [a1_abs_conv_confused]   · on ne peut pas conclure
  pièges : g2_exp_sum, a1_ratio_one, a1_abs_conv_confused

Pour α > 0, étudie la nature de Σ_{k=1}^{∞} (−1)^k·k^(2α)/(α^k + k³) : absolument convergente, semi-convergente ou divergente ? On note uₖ son terme général.
  [problème, 9 points]
  partie 1 (α > 1 : d'Alembert sur |uₖ| : 2)
  Cas α > 1. Simplifie le rapport |uₖ₊₁|/|uₖ| de d'Alembert jusqu'à ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k).
    [free, sans aide, suivre l'erreur]  (k + 1)^(2α)/(α^(k + 1) + (k + 1)³)·(α^k + k³)/k^(2α)
      = ((k + 1)/k)^(2α)·(α^k + k³)/(α^(k + 1) + (k + 1)³)   ← Regrouper les puissances de k
      = ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k)   ← Diviser en haut et en bas par αᵏ
  partie 2 (α > 1 : limite du rapport : 1)
  Cas α > 1 : quand k → +∞, ce rapport tend vers :
    · 1   · α   · 0   ✔ 1/α
  partie 3 (α > 1 : conclusion : 1)
  Cas α > 1 : la série est
    ✔ absolument convergente   · semi-convergente   · divergente   · on ne peut pas conclure [a1_ratio_one]
  partie 4 (0 < α < 1 : comparaison : 1 ; Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ? : 1)
  Cas 0 < α < 1. Compare |uₖ| à 1/k^(3 − 2α) : simplifie k^(3 − 2α)·|uₖ| jusqu'à 1/(1 + α^k/k³), puis étudie l'exposant.
    [free, sans aide, suivre l'erreur]  k^(3 − 2α)·k^(2α)/(α^k + k³)
      (0 < α < 1 : αᵏ → 0, donc |uₖ| ~ k^(2α)/k³ = 1/k^(3 − 2α).)
      = 1/(1 + α^k/k³)   ← k^(3 − 2α)·k^(2α) = k³, puis diviser par k³ : → 1
    — Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ?  [juge solset]  départ : 3 − 2α > 1
      = α < 1   ← Résoudre
      = ]0 ; 1[   ← Toujours, sur ]0 ; 1[
  partie 5 (0 < α < 1 : conclusion : 1)
  Cas 0 < α < 1 : la série est
    ✔ absolument convergente   · semi-convergente [a1_abs_conv_confused]   · divergente   · on ne peut pas conclure
  partie 6 (α = 1 : |uₖ| et Leibniz : 0,5 ; Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0. : 0,5)
  Cas α = 1 : |uₖ| = k²/(1 + k³). Calcule la limite de k·|uₖ|, puis vérifie la décroissance de Leibniz.
    [free, sans aide, suivre l'erreur]  k·k²/(1 + k³)
      = 1/(1/k³ + 1)   ← Diviser par k³
      = 1   ← |uₖ| ~ 1/k : Σ |uₖ| diverge
    — Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0.  [juge equiv]  départ : k²/(1 + k³) − (k + 1)²/(1 + (k + 1)³)
      = 0   ← C'est positif
  partie 7 (α = 1 : conclusion : 1)
  Cas α = 1 : la série est
    · absolument convergente [a1_abs_conv_confused]   ✔ semi-convergente   · divergente [a1_abs_conv_confused]   · on ne peut pas conclure
  pièges : g2_exp_sum, a1_ratio_one, a1_abs_conv_confused

```

### Variantes d'examen

```
Ensemble des λ ≠ −9 pour lesquels Σ_{n=0}^{∞} (2λ/(λ + 9))^n converge :
  · ]−3 ; 9] [a1_ratio_one]   ✔ ]−3 ; 9[   · ]−∞ ; 9[ [a1_abs_square_ineq]   · [−3 ; 9] [a1_param_bounds_untreated]
  [examen mcq]
  pièges : a1_param_bounds_untreated, a1_abs_square_ineq, a1_ratio_one

Vrai ou faux ?
  « Pour tout b ∈ [−1 ; 1], la série Σ (b + 1/k)ᵏ converge. » → FAUX
    contre-exemple (refute) : b = 1
  [examen tf]
  pièges : a1_param_bounds_untreated

Pour α > 0, étudie la nature de Σ_{k=1}^{∞} (−1)^(k + 1)·k^(2α)/(α^k + k³) : absolument convergente, semi-convergente ou divergente ? On note uₖ son terme général.
  [problème, examen open, 9 points]
  partie 1 (α > 1 : d'Alembert sur |uₖ| : 2)
  Cas α > 1. Simplifie le rapport |uₖ₊₁|/|uₖ| de d'Alembert jusqu'à ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k).
    [free, sans aide, suivre l'erreur]  (k + 1)^(2α)/(α^(k + 1) + (k + 1)³)·(α^k + k³)/k^(2α)
      = ((k + 1)/k)^(2α)·(α^k + k³)/(α^(k + 1) + (k + 1)³)   ← Regrouper les puissances de k
      = ((k + 1)/k)^(2α)·(1 + k³/α^k)/(α + (k + 1)³/α^k)   ← Diviser en haut et en bas par αᵏ
  partie 2 (α > 1 : limite du rapport : 1)
  Cas α > 1 : quand k → +∞, ce rapport tend vers :
    ✔ 1/α   · 0   · 1   · α
  partie 3 (α > 1 : conclusion : 1)
  Cas α > 1 : la série est
    ✔ absolument convergente   · semi-convergente   · divergente   · on ne peut pas conclure [a1_ratio_one]
  partie 4 (0 < α < 1 : comparaison : 1 ; Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ? : 1)
  Cas 0 < α < 1. Compare |uₖ| à 1/k^(3 − 2α) : simplifie k^(3 − 2α)·|uₖ| jusqu'à 1/(1 + α^k/k³), puis étudie l'exposant.
    [free, sans aide, suivre l'erreur]  k^(3 − 2α)·k^(2α)/(α^k + k³)
      (0 < α < 1 : αᵏ → 0, donc |uₖ| ~ k^(2α)/k³ = 1/k^(3 − 2α).)
      = 1/(1 + α^k/k³)   ← k^(3 − 2α)·k^(2α) = k³, puis diviser par k³ : → 1
    — Pour quels α ∈ ]0 ; 1[ l'exposant 3 − 2α est-il > 1 ?  [juge solset]  départ : 3 − 2α > 1
      = α < 1   ← Résoudre
      = ]0 ; 1[   ← Toujours, sur ]0 ; 1[
  partie 5 (0 < α < 1 : conclusion : 1)
  Cas 0 < α < 1 : la série est
    ✔ absolument convergente   · semi-convergente [a1_abs_conv_confused]   · divergente   · on ne peut pas conclure
  partie 6 (α = 1 : |uₖ| et Leibniz : 0,5 ; Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0. : 0,5)
  Cas α = 1 : |uₖ| = k²/(1 + k³). Calcule la limite de k·|uₖ|, puis vérifie la décroissance de Leibniz.
    [free, sans aide, suivre l'erreur]  k·k²/(1 + k³)
      = 1/(1/k³ + 1)   ← Diviser par k³
      = 1   ← |uₖ| ~ 1/k : Σ |uₖ| diverge
    — Leibniz : xₖ = k²/(1 + k³) décroît pour k ≥ 2. Montre xₖ − xₖ₊₁ ≥ 0.  [juge equiv]  départ : k²/(1 + k³) − (k + 1)²/(1 + (k + 1)³)
      = 0   ← C'est positif
  partie 7 (α = 1 : conclusion : 1)
  Cas α = 1 : la série est
    · absolument convergente [a1_abs_conv_confused]   ✔ semi-convergente   · divergente [a1_abs_conv_confused]   · on ne peut pas conclure
  pièges : g2_exp_sum, a1_ratio_one, a1_abs_conv_confused

```

## Limites de fonctions : formes indéterminées, croissances comparées, équivalents (`a1-fn-limits`, BA1)

_Limites remarquables, conjugué, e^(v·Log u), 0 × (borné)._

### Niveau 1

```
Calcule lim_{x→0} (1 − cos(6x))/(x·sin(5x)).
  [guided]  (1 − cos(6x))/(x·sin(5x))
    (Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit.)
    = ((1 − cos(6x))/□)·((5x)/sin(5x))·(□)   (trous : ((1 − cos(6x))/(6x)²)·((5x)/sin(5x))·(36/5))   ← Faire apparaître (1 − cos u)/u² et u/sin u, en produit
    = (1/2)·1·(36/5)   ← Limites remarquables
    = 18/5   ← Conclure
  aides : Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit. | (1 − cos(6x))/(6x)² → □ | (1 − cos(6x))/(x·sin(5x)) → 18/5
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0⁺} x^(5x).
  [guided]  x^(5x)
    (Forme 0⁰ : écris u^v = e^(v·Log u), puis utilise x·Log x → 0 en 0⁺.)
    = e^(5x·□)   (trous : e^(5x·ln(x)))   ← Écrire u^v = e^(v·Log u)
    = e⁰   ← Croissances comparées : x·Log x → 0
    = 1   ← Conclure
  aides : Forme 0⁰ : écris u^v = e^(v·Log u), puis utilise x·Log x → 0 en 0⁺. | e^(5x·Log x) → e^□ | x^(5x) → 1

Calcule lim_{x→0} (√(1 + 3x) − 1)/x.
  [guided]  (√(1 + 3x) − 1)/x
    (Forme 0/0 avec une racine : multiplie en haut et en bas par le conjugué √(…) + 1.)
    = (1 + 3x − 1)/(x(□))   (trous : (1 + 3x − 1)/(x(√(1 + 3x) + 1)))   ← Multiplier en haut et en bas par le conjugué
    = 3/(√(1 + 3x) + 1)   ← Simplifier par x
    = 3/2   ← Passer à la limite
  aides : Forme 0/0 avec une racine : multiplie en haut et en bas par le conjugué √(…) + 1. | 3/(√(1 + 3x) + 1) → □ | (√(1 + 3x) − 1)/x → 3/2
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_sqrt_sum_split

```

### Niveau 2

```
Calcule lim_{x→0} (1 − cos(3x))/(x·sin(2x)).
  [guided]  (1 − cos(3x))/(x·sin(2x))
    ? Que vaut la limite de (1 − cos(3x))/x² en 0 ? · 1/2 : c'est une limite remarquable / ✔ 9/2 : on fait apparaître u = 3x en bas / · 0, car le haut tend vers 0
    = ((1 − cos(3x))/□)·((2x)/sin(2x))·(□)   (trous : ((1 − cos(3x))/(3x)²)·((2x)/sin(2x))·(9/2))   ← Faire apparaître (1 − cos u)/u² et u/sin u, en produit
    = (□)·1·(9/2)   (trous : (1/2)·1·(9/2))   ← Limites remarquables
    = 9/4   ← Conclure
  aides : Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit. | (1 − cos(3x))/(3x)² → □ | (1 − cos(3x))/(x·sin(2x)) → 9/4
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} ln(1 + 3x)/sin(2x).
  [guided]  ln(1 + 3x)/sin(2x)
    ? Que vaut la limite de Log(1 + 3x)/x en 0 ? · 0, car le haut tend vers 0 / ✔ 3 : on fait apparaître u = 3x en bas / · 1 : c'est une limite remarquable
    = (ln(1 + 3x)/(3x))·((2x)/sin(2x))·(□)   (trous : (ln(1 + 3x)/(3x))·((2x)/sin(2x))·(3/2))   ← Faire apparaître Log(1 + u)/u avec u = 3x et u/sin(u) avec u = 2x
    = □·(3/2)   (trous : 1·1·(3/2))   ← Limites remarquables
    = 3/2   ← Conclure
  aides : Forme 0/0 : multiplie et divise pour faire apparaître une limite remarquable en haut et une en bas, avec le même argument que la fonction. | ln(1 + 3x)/(3x) → □ | ln(1 + 3x)/sin(2x) → 3/2
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} (√(9 − 3x) − 3)/x.
  [guided]  (√(9 − 3x) − 3)/x
    ? Comment lever la forme 0/0 ? ✔ Multiplier par le conjugué / · Remplacer la racine par sa limite dans la différence : (√… − …)/x → 0
    = (9 − 3x − 9)/(x(□))   (trous : (9 − 3x − 9)/(x(√(9 − 3x) + 3)))   ← Multiplier en haut et en bas par le conjugué
    = −3/(√(9 − 3x) + 3)   ← Simplifier par x
    = −1/2   ← Passer à la limite
  aides : Forme 0/0 avec une racine : multiplie en haut et en bas par le conjugué √(…) + 3. | −3/(√(9 − 3x) + 3) → □ | (√(9 − 3x) − 3)/x → −1/2
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a1_sqrt_sum_split, a1_ipe_in_sum

```

### Niveau 3

```
Calcule lim_{x→0} (1 − cos(4x))/(x·sin(x)).
  [tap, suivre l'erreur, menu steps]  (1 − cos(4x))/(x·sin(x))
    = ((1 − cos(4x))/(4x)²)·(x/sin(x))·16   ← Faire apparaître (1 − cos u)/u² et u/sin u, en produit
    = (1/2)·1·16   ← Limites remarquables
    = 8   ← Conclure
  aides : Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit. | (1 − cos(4x))/(4x)² → □ | (1 − cos(4x))/(x·sin(x)) → 8
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} 2x·sin(3/x).
  [tap, suivre l'erreur, menu steps]  2x·sin(3/x)
    = 0   ← |sin(3/x)| ≤ 1 et x → 0 : 0 × (borné) → 0
  aides : sin(3/x) n'a pas de limite en 0, mais il est borné ; et x → 0. | |2x·sin(3/x)| ≤ 2|x| → □ | 2x·sin(3/x) → 0
  pièges : a1_dl_factorial_missing

Calcule lim_{x→0} x·cos(3/x).
  [tap, suivre l'erreur, menu steps]  x·cos(3/x)
    = 0   ← |cos(3/x)| ≤ 1 et x → 0 : 0 × (borné) → 0
  aides : cos(3/x) n'a pas de limite en 0, mais il est borné ; et x → 0. | |x·cos(3/x)| ≤ |x| → □ | x·cos(3/x) → 0
  pièges : a1_dl_factorial_missing

```

### Niveau 4

```
Calcule lim_{x→0} (√(4 + 4x) − 2)/x.
  [free, suivre l'erreur]  (√(4 + 4x) − 2)/x
    = (4 + 4x − 4)/(x(√(4 + 4x) + 2))   ← Multiplier en haut et en bas par le conjugué
    = 4/(√(4 + 4x) + 2)   ← Simplifier par x
    = 1   ← Passer à la limite
  aides : Forme 0/0 avec une racine : multiplie en haut et en bas par le conjugué √(…) + 2. | 4/(√(4 + 4x) + 2) → □ | (√(4 + 4x) − 2)/x → 1
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a1_sqrt_sum_split

Calcule lim_{x→0} (1 − cos(x))/(x·sin(6x)).
  [free, suivre l'erreur]  (1 − cos(x))/(x·sin(6x))
    = ((1 − cos(x))/x²)·((6x)/sin(6x))·(1/6)   ← Faire apparaître (1 − cos u)/u² et u/sin u, en produit
    = (1/2)·1·(1/6)   ← Limites remarquables
    = 1/12   ← Conclure
  aides : Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit. | (1 − cos(x))/x² → □ | (1 − cos(x))/(x·sin(6x)) → 1/12
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} −2x²·sin(2/x).
  [free, suivre l'erreur]  −2x²·sin(2/x)
    = 0   ← |sin(2/x)| ≤ 1 et x² → 0 : 0 × (borné) → 0
  aides : sin(2/x) n'a pas de limite en 0, mais il est borné ; et x² → 0. | |−2x²·sin(2/x)| ≤ 2x² → □ | −2x²·sin(2/x) → 0
  pièges : a1_dl_factorial_missing

```

### Niveau 5

```
Calcule lim_{x→0} arctan(5x²)/(x·sin(3x)).
  [free, sans aide]  arctan(5x²)/(x·sin(3x))
    = (arctan(5x²)/(5x²))·((3x)/sin(3x))·(5/3)   ← x·sin(bx) ressemble à b·x² : faire apparaître Arctg(u)/u et u/sin u
    = 1·1·(5/3)   ← Limites remarquables
    = 5/3   ← Conclure
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule, a1_remarkable_limit_scale

Calcule lim_{x→0} (1 + 3x)^(2/x).
  [free, sans aide]  (1 + 3x)^(2/x)
    = e^((2/x)·ln(1 + 3x))   ← Écrire u^v = e^(v·Log u)
    = e^(6·ln(1 + 3x)/(3x))   ← Faire apparaître Log(1 + u)/u avec u = 3x
    = e⁶   ← Conclure

Calcule lim_{x→∞} √(x + 7)/√(7x + 9).
  [free, sans aide]  √(x + 7)/√(7x + 9)
    = √((x + 7)/(7x + 9))   ← Une seule racine
    = √((1 + 7/x)/(7 + 9/x))   ← Mettre x en facteur en haut et en bas, simplifier
    = √7/7   ← Sortir la racine du dénominateur
  pièges : a1_bh_quotient_rule, a1_sqrt_sum_split

```

### Variantes d'examen

```
lim_{x→0} (1 − cos(x))/(x·sin(4x)) =
  ✔ 1/8   · 1/4 [a1_dl_factorial_missing]   · 0 [a1_dl_order_too_low]   · 1/2 [a1_remarkable_limit_scale]
  [examen mcq]
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_remarkable_limit_scale

Vrai ou faux ?
  « Si f est bornée sur [−1 ; 1] ∖ {0}, alors limx→0 f(x) existe. » → FAUX
    contre-exemple (function) : f = sin(1/x)
  [examen tf]

Calcule lim_{x→∞} √(9x + 9)/√(3x + 8).
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 2)
    [free, sans aide, suivre l'erreur, examen open]  √(9x + 9)/√(3x + 8)
      = √((9x + 9)/(3x + 8))   ← Une seule racine
      = √((9 + 9/x)/(3 + 8/x))   ← Mettre x en facteur en haut et en bas, simplifier
      = √(3)   ← Passer à la limite
  pièges : a1_bh_quotient_rule, a1_sqrt_sum_split

```

## Limites à gauche et à droite ; limite qui n'existe pas (`a1-fn-onesided`, BA1)

_|x − a|, e^(1/x), Arctg(1/x) ; deux côtés différents : pas de limite._

### Niveau 1

```
Soit f(x) = (x² − 3x)/|x − 3|. Calcule les limites de f à droite et à gauche de 3, puis conclus. Commence par la limite à droite en 3.
  [guided]  (x² − 3x)/|x − 3|
    (Enlève la valeur absolue séparément pour x > 3 et x < 3.)
    = (x − 3)(x)/(x − 3)   ← x > 3 : |x − 3| = x − 3
    = x   ← Simplifier
    = 3   ← Passer à la limite
  — À gauche de 3 :  [juge limit]  départ : (x² − 3x)/|x − 3|
    = (x − 3)(x)/(□)   (trous : (x − 3)(x)/(−(x − 3)))   ← x < 3 : |x − 3| = −(x − 3)
    = □   (trous : −(x))   ← Simplifier
    = −3   ← Passer à la limite
  — Conclusion, et le saut de f en 3 :  [juge value]  départ : lim_{x→3⁺} (x² − 3x)/|x − 3| − lim_{x→3⁻} (x² − 3x)/|x − 3|
    (Les deux limites sont différentes : f n'a pas de limite en 3.)
    = 3 − (−3)   ← Différence des deux limites
    = 6   ← Calculer
  aides : Enlève la valeur absolue séparément pour x > 3 et x < 3. | x < 3 : |x − 3| = □ | À droite 3, à gauche −3 : pas de limite en 3.
  pièges : a1_bh_quotient_rule, a1_abs_removed

Soit f(x) = sin(6x)/|x|. Calcule les limites de f à droite et à gauche de 0, puis conclus. Commence par la limite à droite en 0.
  [guided]  sin(6x)/|x|
    (Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche.)
    = sin(6x)/x   ← x > 0 : |x| = x
    = 6   ← sin(u)/u → 1 avec u = 6x
  — À gauche de 0 :  [juge limit]  départ : sin(6x)/|x|
    = sin(6x)/(□)   (trous : sin(6x)/(−x))   ← x < 0 : |x| = −x
    = −6   ← sin(u)/u → 1 avec u = 6x
  — Conclusion, et le saut de f en 0 :  [juge value]  départ : lim_{x→0⁺} sin(6x)/|x| − lim_{x→0⁻} sin(6x)/|x|
    (Les deux limites sont différentes : f n'a pas de limite en 0.)
    = 6 − (−6)   ← Différence des deux limites
    = 12   ← Calculer
  aides : Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche. | x < 0 : |x| = □ | À droite 6, à gauche −6 : pas de limite en 0.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_remarkable_limit_scale, a1_abs_removed

Soit f(x) = sin(2x)/|x|. Calcule les limites de f à droite et à gauche de 0, puis conclus. Commence par la limite à droite en 0.
  [guided]  sin(2x)/|x|
    (Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche.)
    = sin(2x)/x   ← x > 0 : |x| = x
    = 2   ← sin(u)/u → 1 avec u = 2x
  — À gauche de 0 :  [juge limit]  départ : sin(2x)/|x|
    = sin(2x)/(□)   (trous : sin(2x)/(−x))   ← x < 0 : |x| = −x
    = −2   ← sin(u)/u → 1 avec u = 2x
  — Conclusion, et le saut de f en 0 :  [juge value]  départ : lim_{x→0⁺} sin(2x)/|x| − lim_{x→0⁻} sin(2x)/|x|
    (Les deux limites sont différentes : f n'a pas de limite en 0.)
    = 2 − (−2)   ← Différence des deux limites
    = 4   ← Calculer
  aides : Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche. | x < 0 : |x| = □ | À droite 2, à gauche −2 : pas de limite en 0.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_remarkable_limit_scale, a1_abs_removed

```

### Niveau 2

```
Soit f(x) = sin(1/x). Montre avec deux suites que f n'a pas de limite en 0. Avec xₙ = 1/(2nπ) → 0⁺, calcule la limite de f(xₙ).
  [guided]  sin(2nπ)
    = 0   ← sin(2nπ) = 0 pour tout n
  — Avec yₙ = 1/(2nπ + π/2) → 0 :  [juge limit]  départ : sin(2nπ + π/2)
    = 1   ← sin(2nπ + π/2) = 1 pour tout n
  — Conclusion, et l'écart entre les deux limites :  [juge value]  départ : lim_{n→∞} sin(2nπ + π/2) − lim_{n→∞} sin(2nπ)
    ? Conclusion ? · f tend vers la moyenne des deux valeurs en 0 / ✔ f(xₙ) et f(yₙ) ont des limites différentes : f n'a pas de limite en 0 / · f tend vers 0 en 0 (la première suite suffit)
    = 1 − 0   ← Différence des deux limites
    = 1   ← Calculer
  aides : Prends deux suites qui tendent vers 0, sur lesquelles sin(1/x) vaut toujours la même chose : 1/xₙ = 2nπ, puis 2nπ + π/2. | xₙ = 1/(2nπ) : f(xₙ) = sin(2nπ) = □ | f(xₙ) → 0 et f(yₙ) → 1 : pas de limite.
  pièges : a1_dl_factorial_missing, a1_onesided_ignored

Soit f(x) = (x² − x − 6)/|x − 3|. Calcule les limites de f à droite et à gauche de 3, puis conclus. Commence par la limite à droite en 3.
  [guided]  (x² − x − 6)/|x − 3|
    = (□)(x + 2)/(x − 3)   (trous : (x − 3)(x + 2)/(x − 3))   ← x > 3 : |x − 3| = x − 3
    = x + 2   ← Simplifier
    = 5   ← Passer à la limite
  — À gauche de 3 :  [juge limit]  départ : (x² − x − 6)/|x − 3|
    ? Pour x < 3, |x − 3| = ? · x − 3 / ✔ −(x − 3)
    = (x − 3)(x + 2)/(□)   (trous : (x − 3)(x + 2)/(−(x − 3)))   ← x < 3 : |x − 3| = −(x − 3)
    = □   (trous : −(x + 2))   ← Simplifier
    = −5   ← Passer à la limite
  — Conclusion, et le saut de f en 3 :  [juge value]  départ : lim_{x→3⁺} (x² − x − 6)/|x − 3| − lim_{x→3⁻} (x² − x − 6)/|x − 3|
    ? Conclusion ? ✔ Les deux limites sont différentes : f n'a pas de limite en 3 / · f tend vers 5 en 3 (la limite à droite suffit) / · f tend vers la moyenne des deux valeurs en 3
    = 5 − (−5)   ← Différence des deux limites
    = 10   ← Calculer
  aides : Enlève la valeur absolue séparément pour x > 3 et x < 3. | x < 3 : |x − 3| = □ | À droite 5, à gauche −5 : pas de limite en 3.
  pièges : a1_bh_quotient_rule, a1_abs_removed, a1_onesided_ignored

Soit f(x) = sin(4x)/|x|. Calcule les limites de f à droite et à gauche de 0, puis conclus. Commence par la limite à droite en 0.
  [guided]  sin(4x)/|x|
    = sin(4□)/x   (trous : sin(4x)/x)   ← x > 0 : |x| = x
    = 4   ← sin(u)/u → 1 avec u = 4x
  — À gauche de 0 :  [juge limit]  départ : sin(4x)/|x|
    ? Pour x < 0, |x| = ? · x / ✔ −(x)
    = sin(4x)/(□)   (trous : sin(4x)/(−x))   ← x < 0 : |x| = −x
    = −4   ← sin(u)/u → 1 avec u = 4x
  — Conclusion, et le saut de f en 0 :  [juge value]  départ : lim_{x→0⁺} sin(4x)/|x| − lim_{x→0⁻} sin(4x)/|x|
    ? Conclusion ? · f tend vers 4 en 0 (la limite à droite suffit) / ✔ Les deux limites sont différentes : f n'a pas de limite en 0 / · f tend vers la moyenne des deux valeurs en 0
    = 4 − (−4)   ← Différence des deux limites
    = 8   ← Calculer
  aides : Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche. | x < 0 : |x| = □ | À droite 4, à gauche −4 : pas de limite en 0.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_remarkable_limit_scale, a1_abs_removed, a1_onesided_ignored

```

### Niveau 3

```
Soit f(x) = sin(4x)/|x|. Calcule les limites de f à droite et à gauche de 0, puis conclus. Commence par la limite à droite en 0.
  [tap, suivre l'erreur, menu steps]  sin(4x)/|x|
    = sin(4x)/x   ← x > 0 : |x| = x
    = 4   ← sin(u)/u → 1 avec u = 4x
  — À gauche de 0 :  [juge limit]  départ : sin(4x)/|x|
    = sin(4x)/(−x)   ← x < 0 : |x| = −x
    = −4   ← sin(u)/u → 1 avec u = 4x
  — Conclusion, et le saut de f en 0 :  [juge value]  départ : lim_{x→0⁺} sin(4x)/|x| − lim_{x→0⁻} sin(4x)/|x|
    ? Conclusion ? · f tend vers 4 en 0 (la limite à droite suffit) / · f tend vers la moyenne des deux valeurs en 0 / ✔ Les deux limites sont différentes : f n'a pas de limite en 0
    = 8   ← Calculer
  aides : Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche. | x < 0 : |x| = □ | À droite 4, à gauche −4 : pas de limite en 0.
  pièges : a1_dl_factorial_missing, a1_bh_quotient_rule, a1_remarkable_limit_scale, a1_abs_removed, a1_onesided_ignored

Soit f(x) = cos(1/x). Montre avec deux suites que f n'a pas de limite en 0. Avec xₙ = 1/(2nπ) → 0⁺, calcule la limite de f(xₙ).
  [tap, suivre l'erreur, menu steps]  cos(2nπ)
    = 1   ← cos(2nπ) = 1 pour tout n
  — Avec yₙ = 1/((2n + 1)π) → 0 :  [juge limit]  départ : cos((2n + 1)π)
    = −1   ← cos((2n + 1)π) = −1 pour tout n
  — Conclusion, et l'écart entre les deux limites :  [juge value]  départ : lim_{n→∞} cos((2n + 1)π) − lim_{n→∞} cos(2nπ)
    ? Conclusion ? · f tend vers la moyenne des deux valeurs en 0 / ✔ f(xₙ) et f(yₙ) ont des limites différentes : f n'a pas de limite en 0 / · f tend vers 1 en 0 (la première suite suffit)
    = −2   ← Calculer
  aides : Prends deux suites qui tendent vers 0, sur lesquelles cos(1/x) vaut toujours la même chose : 1/xₙ = 2nπ, puis (2n + 1)π. | xₙ = 1/(2nπ) : f(xₙ) = cos(2nπ) = □ | f(xₙ) → 1 et f(yₙ) → −1 : pas de limite.
  pièges : a1_dl_factorial_missing, a1_onesided_ignored

Soit f(x) = arctan(1/(x − 1)). Calcule les limites de f à droite et à gauche de 1, puis conclus. Commence par la limite à droite en 1.
  [tap, suivre l'erreur, menu steps]  arctan(1/(x − 1))
    = π/2   ← 1/(x − 1) → +∞ et Arctg(u) → π/2
  — À gauche de 1 :  [juge limit]  départ : arctan(1/(x − 1))
    = −π/2   ← 1/(x − 1) → −∞ et Arctg(u) → −π/2
  — Conclusion, et le saut de f en 1 :  [juge value]  départ : lim_{x→1⁺} arctan(1/(x − 1)) − lim_{x→1⁻} arctan(1/(x − 1))
    ? Conclusion ? ✔ Les deux limites sont différentes : f n'a pas de limite en 1 / · f tend vers π/2 en 1 (la limite à droite suffit) / · f tend vers la moyenne des deux valeurs en 1
    = π/2 − (−π/2)   ← Différence des deux limites
    = π   ← Calculer
  aides : Regarde le signe de 1/(x − 1) de chaque côté de 1 : Arctg(u) → ±π/2 quand u → ±∞. | x → 1⁻ : 1/(x − 1) → □ | À droite π/2, à gauche −π/2 : pas de limite en 1.
  pièges : a1_onesided_ignored

```

### Niveau 4

```
Soit f(x) = (x² + x − 2)/|x − 1|. Calcule les limites de f à droite et à gauche de 1, puis conclus. Commence par la limite à droite en 1.
  [free, suivre l'erreur]  (x² + x − 2)/|x − 1|
    = (x − 1)(x + 2)/(x − 1)   ← x > 1 : |x − 1| = x − 1
    = x + 2   ← Simplifier
    = 3   ← Passer à la limite
  — À gauche de 1 :  [juge limit]  départ : (x² + x − 2)/|x − 1|
    = (x − 1)(x + 2)/(−(x − 1))   ← x < 1 : |x − 1| = −(x − 1)
    = −(x + 2)   ← Simplifier
    = −3   ← Passer à la limite
  — Conclusion, et le saut de f en 1 :  [juge value]  départ : lim_{x→1⁺} (x² + x − 2)/|x − 1| − lim_{x→1⁻} (x² + x − 2)/|x − 1|
    ? Conclusion ? · f tend vers la moyenne des deux valeurs en 1 / · f tend vers 3 en 1 (la limite à droite suffit) / ✔ Les deux limites sont différentes : f n'a pas de limite en 1
    = 6   ← Calculer
  aides : Enlève la valeur absolue séparément pour x > 1 et x < 1. | x < 1 : |x − 1| = □ | À droite 3, à gauche −3 : pas de limite en 1.
  pièges : a1_bh_quotient_rule, a1_abs_removed, a1_onesided_ignored

Soit f(x) = cos(1/x). Montre avec deux suites que f n'a pas de limite en 0. Avec xₙ = 1/(2nπ) → 0⁺, calcule la limite de f(xₙ).
  [free, suivre l'erreur]  cos(2nπ)
    = 1   ← cos(2nπ) = 1 pour tout n
  — Avec yₙ = 1/((2n + 1)π) → 0 :  [juge limit]  départ : cos((2n + 1)π)
    = −1   ← cos((2n + 1)π) = −1 pour tout n
  — Conclusion, et l'écart entre les deux limites :  [juge value]  départ : lim_{n→∞} cos((2n + 1)π) − lim_{n→∞} cos(2nπ)
    ? Conclusion ? · f tend vers la moyenne des deux valeurs en 0 / ✔ f(xₙ) et f(yₙ) ont des limites différentes : f n'a pas de limite en 0 / · f tend vers 1 en 0 (la première suite suffit)
    = −2   ← Calculer
  aides : Prends deux suites qui tendent vers 0, sur lesquelles cos(1/x) vaut toujours la même chose : 1/xₙ = 2nπ, puis (2n + 1)π. | xₙ = 1/(2nπ) : f(xₙ) = cos(2nπ) = □ | f(xₙ) → 1 et f(yₙ) → −1 : pas de limite.
  pièges : a1_dl_factorial_missing, a1_onesided_ignored

Soit f(x) = (x² + 2x − 15)/|x − 3|. Calcule les limites de f à droite et à gauche de 3, puis conclus. Commence par la limite à droite en 3.
  [free, suivre l'erreur]  (x² + 2x − 15)/|x − 3|
    = (x − 3)(x + 5)/(x − 3)   ← x > 3 : |x − 3| = x − 3
    = x + 5   ← Simplifier
    = 8   ← Passer à la limite
  — À gauche de 3 :  [juge limit]  départ : (x² + 2x − 15)/|x − 3|
    = (x − 3)(x + 5)/(−(x − 3))   ← x < 3 : |x − 3| = −(x − 3)
    = −(x + 5)   ← Simplifier
    = −8   ← Passer à la limite
  — Conclusion, et le saut de f en 3 :  [juge value]  départ : lim_{x→3⁺} (x² + 2x − 15)/|x − 3| − lim_{x→3⁻} (x² + 2x − 15)/|x − 3|
    ? Conclusion ? · f tend vers 8 en 3 (la limite à droite suffit) / · f tend vers la moyenne des deux valeurs en 3 / ✔ Les deux limites sont différentes : f n'a pas de limite en 3
    = 16   ← Calculer
  aides : Enlève la valeur absolue séparément pour x > 3 et x < 3. | x < 3 : |x − 3| = □ | À droite 8, à gauche −8 : pas de limite en 3.
  pièges : a1_bh_quotient_rule, a1_abs_removed, a1_onesided_ignored

```

### Niveau 5

```
lim_{x→0} sin(e^(1/x))/e^(1/x) =
  · +∞   ✔ n'existe pas   · 0 [a1_onesided_ignored]   · 1 [a1_onesided_ignored]
  pièges : a1_onesided_ignored

lim_{x→0} sin(e^(1/x))/e^(1/x) =
  ✔ n'existe pas   · 0 [a1_onesided_ignored]   · 1 [a1_onesided_ignored]   · +∞
  pièges : a1_onesided_ignored

lim_{x→0} 4e^(1/x) =
  · 4   · +∞ [a1_onesided_ignored]   · 0 [a1_onesided_ignored]   ✔ n'existe pas
  pièges : a1_onesided_ignored

```

### Variantes d'examen

```
lim_{x→0} 2e^(1/x) =
  · +∞ [a1_onesided_ignored]   ✔ n'existe pas   · 2   · 0 [a1_onesided_ignored]
  [examen mcq]
  pièges : a1_onesided_ignored

Vrai ou faux ?
  « limx→0 e^(1/x) n'existe pas. » → VRAI
  [examen tf]
  pièges : a1_onesided_ignored

```

## Prolongement par continuité, continuité d'une fonction par morceaux (`a1-fn-extension`, BA1)

_Limite de chaque morceau = valeur au point._

### Niveau 1

```
Soit f(x) = 2(x² + 2x − 8)/(x² − 4) si x > 2, f(2) = a, et bx + 2 si x < 2. Trouve a et b pour que f soit continue en 2. Commence par la limite à droite.
  [guided]  2(x² + 2x − 8)/(x² − 4)
    (Limite à droite : le morceau de x > 2 se simplifie par (x − 2).)
    = 2(x − 2)(x + 4)/((x − 2)(x + 2))   ← Factoriser le haut et le bas
    = 2(x + 4)/(x + 2)   ← Simplifier par (x − 2)
    = □   (trous : 3)   ← Passer à la limite
  — Continuité à droite : f(2) = a doit valoir cette limite.  [juge value]  départ : a
    = 3   ← Égaler à f(2)
  — Continuité à gauche : la limite de bx + 2 en 2⁻ doit valoir 3.  [juge solset]  départ : lim_{x→2⁻} (b·x + 2) = 3
    = 2b + 2 = □   (trous : 2b + 2 = 3)   ← Limite à gauche de bx + 2, égale à f(2)
    = b = 1/2   ← Résoudre
  aides : Calcule la limite de chaque morceau en 2 ; elles doivent valoir f(2) = a. | 2(x + 4)/(x + 2) → □ | a = 3 et b = 1/2

Soit f(x) = (x² − 5x + 4)/(x² − x) si x > 1, f(1) = a, et bx² + 1 si x < 1. Trouve a et b pour que f soit continue en 1. Commence par la limite à droite.
  [guided]  (x² − 5x + 4)/(x² − x)
    (Limite à droite : le morceau de x > 1 se simplifie par (x − 1).)
    = (x − 1)(x − 4)/((x − 1)x)   ← Factoriser le haut et le bas
    = (x − 4)/x   ← Simplifier par (x − 1)
    = □   (trous : −3)   ← Passer à la limite
  — Continuité à droite : f(1) = a doit valoir cette limite.  [juge value]  départ : a
    = −3   ← Égaler à f(1)
  — Continuité à gauche : la limite de bx² + 1 en 1⁻ doit valoir −3.  [juge solset]  départ : lim_{x→1⁻} (b·x² + 1) = −3
    = b + □ = −3   (trous : b + 1 = −3)   ← Limite à gauche de bx² + 1, égale à f(1)
    = b = −4   ← Résoudre
  aides : Calcule la limite de chaque morceau en 1 ; elles doivent valoir f(1) = a. | (x − 4)/x → □ | a = −3 et b = −4
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Soit f(x) = (x² − 4x + 3)/(x² + x − 2) si x > 1, f(1) = a, et bx − 3 si x < 1. Trouve a et b pour que f soit continue en 1. Commence par la limite à droite.
  [guided]  (x² − 4x + 3)/(x² + x − 2)
    (Limite à droite : le morceau de x > 1 se simplifie par (x − 1).)
    = (x − 1)(x − 3)/((x − 1)(x + 2))   ← Factoriser le haut et le bas
    = (x − 3)/(x + 2)   ← Simplifier par (x − 1)
    = □   (trous : −2/3)   ← Passer à la limite
  — Continuité à droite : f(1) = a doit valoir cette limite.  [juge value]  départ : a
    = −2/3   ← Égaler à f(1)
  — Continuité à gauche : la limite de bx − 3 en 1⁻ doit valoir −2/3.  [juge solset]  départ : lim_{x→1⁻} (b·x − 3) = −2/3
    = b − 3 = □   (trous : b − 3 = −2/3)   ← Limite à gauche de bx − 3, égale à f(1)
    = b = 7/3   ← Résoudre
  aides : Calcule la limite de chaque morceau en 1 ; elles doivent valoir f(1) = a. | (x − 3)/(x + 2) → □ | a = −2/3 et b = 7/3
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

```

### Niveau 2

```
Soit f(x) = (x² + 3x − 4)/(x² − x) si x > 1, f(1) = a, et bx − 1 si x < 1. Trouve a et b pour que f soit continue en 1. Commence par la limite à droite.
  [guided]  (x² + 3x − 4)/(x² − x)
    = (□)(x + 4)/((x − 1)x)   (trous : (x − 1)(x + 4)/((x − 1)x))   ← Factoriser le haut et le bas
    = (□)/x   (trous : (x + 4)/x)   ← Simplifier par (x − 1)
    = 5   ← Passer à la limite
  — Continuité à droite : f(1) = a doit valoir cette limite.  [juge value]  départ : a
    = 5   ← Égaler à f(1)
  — Continuité à gauche : la limite de bx − 1 en 1⁻ doit valoir 5.  [juge solset]  départ : lim_{x→1⁻} (b·x − 1) = 5
    ? Quelle formule pour la limite à gauche de 1 ? ✔ bx − 1, le morceau de x < 1 / · (x + 4)/x, la formule qu'on vient de simplifier
    = b − 1 = 5   ← Limite à gauche de bx − 1, égale à f(1)
    = b = 6   ← Résoudre
  aides : Calcule la limite de chaque morceau en 1 ; elles doivent valoir f(1) = a. | (x + 4)/x → □ | a = 5 et b = 6
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_extension_wrong_branch

Soit f(x) = (x² − 2x − 8)/(x² − 7x + 12) si x > 4, f(4) = a, et bx − 3 si x < 4. Trouve a et b pour que f soit continue en 4. Commence par la limite à droite.
  [guided]  (x² − 2x − 8)/(x² − 7x + 12)
    = (□)(x + 2)/((x − 4)(x − 3))   (trous : (x − 4)(x + 2)/((x − 4)(x − 3)))   ← Factoriser le haut et le bas
    = (□)/(x − 3)   (trous : (x + 2)/(x − 3))   ← Simplifier par (x − 4)
    = 6   ← Passer à la limite
  — Continuité à droite : f(4) = a doit valoir cette limite.  [juge value]  départ : a
    = 6   ← Égaler à f(4)
  — Continuité à gauche : la limite de bx − 3 en 4⁻ doit valoir 6.  [juge solset]  départ : lim_{x→4⁻} (b·x − 3) = 6
    ? Quelle formule pour la limite à gauche de 4 ? · (x + 2)/(x − 3), la formule qu'on vient de simplifier / ✔ bx − 3, le morceau de x < 4
    = 4b − 3 = 6   ← Limite à gauche de bx − 3, égale à f(4)
    = b = 9/4   ← Résoudre
  aides : Calcule la limite de chaque morceau en 4 ; elles doivent valoir f(4) = a. | (x + 2)/(x − 3) → □ | a = 6 et b = 9/4
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_extension_wrong_branch

Soit f(x) = (x² − 3x + 2)/(x² − x − 2) si x > 2, f(2) = a, et bx² + 1 si x < 2. Trouve a et b pour que f soit continue en 2. Commence par la limite à droite.
  [guided]  (x² − 3x + 2)/(x² − x − 2)
    = (□)(x − 1)/((x − 2)(x + 1))   (trous : (x − 2)(x − 1)/((x − 2)(x + 1)))   ← Factoriser le haut et le bas
    = (□)/(x + 1)   (trous : (x − 1)/(x + 1))   ← Simplifier par (x − 2)
    = 1/3   ← Passer à la limite
  — Continuité à droite : f(2) = a doit valoir cette limite.  [juge value]  départ : a
    = 1/3   ← Égaler à f(2)
  — Continuité à gauche : la limite de bx² + 1 en 2⁻ doit valoir 1/3.  [juge solset]  départ : lim_{x→2⁻} (b·x² + 1) = 1/3
    ? Quelle formule pour la limite à gauche de 2 ? · (x − 1)/(x + 1), la formule qu'on vient de simplifier / ✔ bx² + 1, le morceau de x < 2
    = 4b + 1 = 1/3   ← Limite à gauche de bx² + 1, égale à f(2)
    = b = −1/6   ← Résoudre
  aides : Calcule la limite de chaque morceau en 2 ; elles doivent valoir f(2) = a. | (x − 1)/(x + 1) → □ | a = 1/3 et b = −1/6
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong, a1_extension_wrong_branch

```

### Niveau 3

```
Soit f(x) = 2(x² − 3x − 4)/(x² − 5x + 4) si x > 4, f(4) = a, et bx + 1 si x < 4. Trouve a et b pour que f soit continue en 4. Commence par la limite à droite.
  [tap, suivre l'erreur, menu steps]  2(x² − 3x − 4)/(x² − 5x + 4)
    = 2(x − 4)(x + 1)/((x − 4)(x − 1))   ← Factoriser le haut et le bas
    = 2(x + 1)/(x − 1)   ← Simplifier par (x − 4)
    = 10/3   ← Passer à la limite
  — Continuité à droite : f(4) = a doit valoir cette limite.  [juge value]  départ : a
    = 10/3   ← Égaler à f(4)
  — Continuité à gauche : la limite de bx + 1 en 4⁻ doit valoir 10/3.  [juge solset]  départ : lim_{x→4⁻} (b·x + 1) = 10/3
    = 4b + 1 = 10/3   ← Limite à gauche de bx + 1, égale à f(4)
    = b = 7/12   ← Résoudre
  aides : Calcule la limite de chaque morceau en 4 ; elles doivent valoir f(4) = a. | 2(x + 1)/(x − 1) → □ | a = 10/3 et b = 7/12

Soit f(x) = (x² − 4x + 3)/(x² + 3x − 4) si x > 1, f(1) = a, et bx² + 1 si x < 1. Trouve a et b pour que f soit continue en 1. Commence par la limite à droite.
  [tap, suivre l'erreur, menu steps]  (x² − 4x + 3)/(x² + 3x − 4)
    = (x − 1)(x − 3)/((x − 1)(x + 4))   ← Factoriser le haut et le bas
    = (x − 3)/(x + 4)   ← Simplifier par (x − 1)
    = −2/5   ← Passer à la limite
  — Continuité à droite : f(1) = a doit valoir cette limite.  [juge value]  départ : a
    = −2/5   ← Égaler à f(1)
  — Continuité à gauche : la limite de bx² + 1 en 1⁻ doit valoir −2/5.  [juge solset]  départ : lim_{x→1⁻} (b·x² + 1) = −2/5
    = b + 1 = −2/5   ← Limite à gauche de bx² + 1, égale à f(1)
    = b = −7/5   ← Résoudre
  aides : Calcule la limite de chaque morceau en 1 ; elles doivent valoir f(1) = a. | (x − 3)/(x + 4) → □ | a = −2/5 et b = −7/5
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Soit f(x) = 3(x² + 2x − 15)/(x² − x − 6) si x > 3, f(3) = a, et bx − 3 si x < 3. Trouve a et b pour que f soit continue en 3. Commence par la limite à droite.
  [tap, suivre l'erreur, menu steps]  3(x² + 2x − 15)/(x² − x − 6)
    = 3(x − 3)(x + 5)/((x − 3)(x + 2))   ← Factoriser le haut et le bas
    = 3(x + 5)/(x + 2)   ← Simplifier par (x − 3)
    = 24/5   ← Passer à la limite
  — Continuité à droite : f(3) = a doit valoir cette limite.  [juge value]  départ : a
    = 24/5   ← Égaler à f(3)
  — Continuité à gauche : la limite de bx − 3 en 3⁻ doit valoir 24/5.  [juge solset]  départ : lim_{x→3⁻} (b·x − 3) = 24/5
    = 3b − 3 = 24/5   ← Limite à gauche de bx − 3, égale à f(3)
    = b = 13/5   ← Résoudre
  aides : Calcule la limite de chaque morceau en 3 ; elles doivent valoir f(3) = a. | 3(x + 5)/(x + 2) → □ | a = 24/5 et b = 13/5

```

### Niveau 4

```
Soit f(x) = (x² − 6x + 8)/(x² − 4x) si x > 4, f(4) = a, et bx − 3 si x < 4. Trouve a et b pour que f soit continue en 4. Commence par la limite à droite.
  [free, suivre l'erreur]  (x² − 6x + 8)/(x² − 4x)
    = (x − 4)(x − 2)/((x − 4)x)   ← Factoriser le haut et le bas
    = (x − 2)/x   ← Simplifier par (x − 4)
    = 1/2   ← Passer à la limite
  — Continuité à droite : f(4) = a doit valoir cette limite.  [juge value]  départ : a
    = 1/2   ← Égaler à f(4)
  — Continuité à gauche : la limite de bx − 3 en 4⁻ doit valoir 1/2.  [juge solset]  départ : lim_{x→4⁻} (b·x − 3) = 1/2
    = 4b − 3 = 1/2   ← Limite à gauche de bx − 3, égale à f(4)
    = b = 7/8   ← Résoudre
  aides : Calcule la limite de chaque morceau en 4 ; elles doivent valoir f(4) = a. | (x − 2)/x → □ | a = 1/2 et b = 7/8
  pièges : a1_bh_quotient_rule, a1_dominant_term_wrong

Soit f(x) = 3(x² + 2x − 15)/(x² − 2x − 3) si x > 3, f(3) = a, et bx² + 1 si x < 3. Trouve a et b pour que f soit continue en 3. Commence par la limite à droite.
  [free, suivre l'erreur]  3(x² + 2x − 15)/(x² − 2x − 3)
    = 3(x − 3)(x + 5)/((x − 3)(x + 1))   ← Factoriser le haut et le bas
    = 3(x + 5)/(x + 1)   ← Simplifier par (x − 3)
    = 6   ← Passer à la limite
  — Continuité à droite : f(3) = a doit valoir cette limite.  [juge value]  départ : a
    = 6   ← Égaler à f(3)
  — Continuité à gauche : la limite de bx² + 1 en 3⁻ doit valoir 6.  [juge solset]  départ : lim_{x→3⁻} (b·x² + 1) = 6
    = 9b + 1 = 6   ← Limite à gauche de bx² + 1, égale à f(3)
    = b = 5/9   ← Résoudre
  aides : Calcule la limite de chaque morceau en 3 ; elles doivent valoir f(3) = a. | 3(x + 5)/(x + 1) → □ | a = 6 et b = 5/9

Soit f(x) = 3(x² + x − 20)/(x² − 7x + 12) si x > 4, f(4) = a, et bx + 3 si x < 4. Trouve a et b pour que f soit continue en 4. Commence par la limite à droite.
  [free, suivre l'erreur]  3(x² + x − 20)/(x² − 7x + 12)
    = 3(x − 4)(x + 5)/((x − 4)(x − 3))   ← Factoriser le haut et le bas
    = 3(x + 5)/(x − 3)   ← Simplifier par (x − 4)
    = 27   ← Passer à la limite
  — Continuité à droite : f(4) = a doit valoir cette limite.  [juge value]  départ : a
    = 27   ← Égaler à f(4)
  — Continuité à gauche : la limite de bx + 3 en 4⁻ doit valoir 27.  [juge solset]  départ : lim_{x→4⁻} (b·x + 3) = 27
    = 4b + 3 = 27   ← Limite à gauche de bx + 3, égale à f(4)
    = b = 6   ← Résoudre
  aides : Calcule la limite de chaque morceau en 4 ; elles doivent valoir f(4) = a. | 3(x + 5)/(x − 3) → □ | a = 27 et b = 6

```

### Niveau 5

```
Laquelle de ces fonctions est continue en 0 ?
  · sin(1/x) pour x ≠ 0, f(0) = 0   ✔ sin(3x)/x pour x ≠ 0, f(0) = 3   · Aucune des trois   · sin(x)/|x| pour x ≠ 0, f(0) = 1 [a1_onesided_ignored]
  pièges : a1_onesided_ignored

Laquelle de ces fonctions est continue en 0 ?
  · Aucune des trois   · x·sin(1/x) pour x ≠ 0, f(0) = 1   · e^(1/x) pour x ≠ 0, f(0) = 0 [a1_onesided_ignored]   ✔ (e^x − 1)/x pour x ≠ 0, f(0) = 1
  pièges : a1_onesided_ignored

Laquelle de ces fonctions est continue en 0 ?
  ✔ x·ln(|x|) pour x ≠ 0, f(0) = 0   · Aucune des trois   · sin(2x)/x pour x ≠ 0, f(0) = 1 [a1_remarkable_limit_scale]   · sin(1/x) pour x ≠ 0, f(0) = 0
  pièges : a1_remarkable_limit_scale

```

### Variantes d'examen

```
Soit f(x) = (x² + x − 20)/(x² − 6x + 8) si x > 4, f(4) = a, et bx − 1 si x < 4. Pour quelles valeurs f est-elle continue en 4 ?
  · a = −1/2 et b = 1/8   · b = 11/8, et a quelconque [a1_onesided_ignored]   ✔ a = 9/2 et b = 11/8   · a = 9/2, et b quelconque [a1_extension_wrong_branch]
  [examen mcq]
  pièges : a1_extension_wrong_branch, a1_onesided_ignored

Vrai ou faux ?
  « Si f est continue et bornée sur ℝ ∖ {0}, alors f se prolonge par continuité en 0. » → FAUX
    contre-exemple (function) : f = sin(1/x)
  [examen tf]

```

## Écrire la définition ε-δ d'une limite et de la continuité (`a1-fn-epsdelta-def`, BA1)

_∀ε > 0 ∃δ > 0 ∀x : 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε._

### Niveau 1

```
Complète la définition de « limx→x₀ f(x) = L » : ∀ε > 0 ▢ ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε
  · ∃δ = ε   · ∀δ > 0 [g9_quant_order]   ✔ ∃δ > 0   · ∃x ∈ D
  pièges : g9_quant_order

Complète la définition de « limx→x₀⁺ f(x) = L » : ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < x − x₀ ≤ δ ⇒ ▢
  · |f(x) − L| ≤ δ [a1_epsdelta_swapped]   · 0 < x − x₀ ≤ ε [a1_epsdelta_swapped]   ✔ |f(x) − L| ≤ ε   · |f(x) − L| ≥ ε
  pièges : a1_epsdelta_swapped

Complète la définition de « limx→x₀ f(x) = L » : ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ ▢
  ✔ |f(x) − L| ≤ ε   · |f(x) − L| ≥ ε   · 0 < |x − x₀| ≤ ε [a1_epsdelta_swapped]   · |f(x) − L| ≤ δ [a1_epsdelta_swapped]
  pièges : a1_epsdelta_swapped

```

### Niveau 2

```
Construis la définition de « limx→x₀ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < |x − x₀| ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
  pièges : g9_quant_order

Construis la définition de « limx→x₀ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < |x − x₀| ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
  pièges : g9_quant_order

Construis la définition de « limx→x₀ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < |x − x₀| ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
  pièges : g9_quant_order

```

### Niveau 3

```
Construis la définition de « limx→x₀ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < |x − x₀| ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
    ✗ 0 < |x − x₀| ≤ ε [a1_epsdelta_swapped]
    ✗ ⇒ |f(x) − L| ≤ δ [a1_epsdelta_swapped]
  pièges : a1_epsdelta_swapped, g9_quant_order

Construis la définition de « limx→x₀⁺ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < x − x₀ ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
    ✗ 0 < x − x₀ ≤ ε [a1_epsdelta_swapped]
    ✗ ⇒ |f(x) − L| ≤ δ [a1_epsdelta_swapped]
  pièges : a1_epsdelta_swapped, g9_quant_order

Construis la définition de « limx→x₀⁺ f(x) = L ». Touche les blocs dans l'ordre.
  [blocs define]
    1. ∀ε > 0
    2. ∃δ > 0
    3. ∀x ∈ D :
    4. 0 < x − x₀ ≤ δ
    5. ⇒ |f(x) − L| ≤ ε
    ✗ ⇒ |f(x) − L| ≤ δ [a1_epsdelta_swapped]
    ✗ 0 < x − x₀ ≤ ε [a1_epsdelta_swapped]
  pièges : a1_epsdelta_swapped, g9_quant_order

```

### Niveau 4

```
Écris la définition de « f est continue en x₀ » avec des quantificateurs.
  [jetons] palette : ε > 0 · δ > 0 · x ∈ D · |x − x₀| ≤ δ · |f(x) − f(x₀)| ≤ ε · |x − x₀| ≤ ε · |f(x) − f(x₀)| ≤ δ
    → ∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε
  aides : Même structure que pour les suites : ε d'abord, puis δ, puis tous les x assez proches de x₀. | ∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ ▢ ⇒ |f(x) − f(x₀)| ≤ ▢ | ∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε
  pièges : g9_quant_order, a1_epsdelta_swapped

Écris la définition de « limx→x₀ f(x) = L » avec des quantificateurs.
  [jetons] palette : ε > 0 · δ > 0 · x ∈ D · 0 < |x − x₀| ≤ δ · |f(x) − L| ≤ ε · 0 < |x − x₀| ≤ ε · |f(x) − L| ≤ δ
    → ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε
  aides : Même structure que pour les suites : ε d'abord, puis δ, puis tous les x assez proches de x₀. | ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ ▢ ⇒ |f(x) − L| ≤ ▢ | ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε
  pièges : g9_quant_order, a1_epsdelta_swapped

Écris la définition de « limx→x₀⁺ f(x) = L » avec des quantificateurs.
  [jetons] palette : ε > 0 · δ > 0 · x ∈ D · 0 < x − x₀ ≤ δ · |f(x) − L| ≤ ε · 0 < x − x₀ ≤ ε · |f(x) − L| ≤ δ
    → ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < x − x₀ ≤ δ ⇒ |f(x) − L| ≤ ε
  aides : Même structure que pour les suites : ε d'abord, puis δ, puis tous les x assez proches de x₀. | ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < x − x₀ ≤ ▢ ⇒ |f(x) − L| ≤ ▢ | ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < x − x₀ ≤ δ ⇒ |f(x) − L| ≤ ε
  pièges : g9_quant_order, a1_epsdelta_swapped

```

### Niveau 5

```
Écris avec des quantificateurs : « f ne tend pas vers L quand x → x₀ ».
  [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ D · 0 < |x − x₀| ≤ δ · |f(x) − L| ≤ ε · |f(x) − L| > ε · 0 < |x − x₀| ≤ ε · |f(x) − L| ≤ δ
    → ∃ε > 0 ∀δ > 0 ∃x ∈ D, 0 < |x − x₀| ≤ δ ∧ |f(x) − L| > ε
  pièges : g9_quant_order, a1_epsdelta_swapped

Écris avec des quantificateurs : « f n'est pas continue en x₀ ».
  [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ D · |x − x₀| ≤ δ · |f(x) − f(x₀)| ≤ ε · |f(x) − f(x₀)| > ε · |x − x₀| ≤ ε · |f(x) − f(x₀)| ≤ δ
    → ∃ε > 0 ∀δ > 0 ∃x ∈ D, |x − x₀| ≤ δ ∧ |f(x) − f(x₀)| > ε
  pièges : g9_quant_order, a1_epsdelta_swapped

Écris la définition de « limx→x₀ f(x) = +∞ » avec des quantificateurs.
  [jetons, sans aide] palette : M > 0 · δ > 0 · x ∈ D · 0 < |x − x₀| ≤ δ · f(x) ≥ M · 0 < |x − x₀| ≤ M
    → ∀M > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ f(x) ≥ M
  pièges : g9_quant_order

```

### Variantes d'examen

```
Vrai ou faux ? « f est continue en x₀ ⇔ ∃δ > 0 ∀ε > 0 : |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε. »
  · Vrai [g9_quant_order]   ✔ Faux
  [examen tf]
  pièges : g9_quant_order

Écris la définition de « limx→x₀ f(x) = L » avec des quantificateurs.
  [problème, examen open, 1 points]
  partie 1 (Début du problème : 1)
    [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ D · 0 < |x − x₀| ≤ δ · |f(x) − L| ≤ ε · 0 < |x − x₀| ≤ ε · |f(x) − L| ≤ δ
      → ∀ε > 0 ∃δ > 0 ∀x ∈ D, 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε
    [examen open]
  pièges : g9_quant_order, a1_epsdelta_swapped

```

## Trouver δ(ε) : prouver une limite par la définition (`a1-fn-epsdelta`, BA1)

_|f(x) − L| ≤ M·|x − x₀|, puis δ = ε/M (ou min(1 ; ε/M))._

### Niveau 1

```
Montre avec la définition que limx→3 −6x + 5 = −13. Écris d'abord l'écart |(−6x + 5) + 13| en fonction de |x − x₀|.
  [guided]  |(−6x + 5) + 13|
    = |−6x + □|   (trous : |−6x + 18|)   ← Réduire l'écart
    = □(|x − 3|)   (trous : 6(|x − 3|))   ← Faire apparaître |x − x₀| = |x − 3|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/□   (trous : ε/6)   ← 6|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/6
  aides : Écris |f(x) + 13| et fais apparaître |x − x₀| = |x − 3|. | |(−6x + 5) + 13| = □·|x − 3| | δ = ε/6 : 6·|x − 3| ≤ ε dès que |x − 3| ≤ ε/6.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→−4 −5 − 5x = 15. Écris d'abord l'écart |(−5 − 5x) − 15| en fonction de |x − x₀|.
  [guided]  |(−5 − 5x) − 15|
    = |−5x − □|   (trous : |−5x − 20|)   ← Réduire l'écart
    = □(|x + 4|)   (trous : 5(|x + 4|))   ← Faire apparaître |x − x₀| = |x + 4|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/□   (trous : ε/5)   ← 5|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/5
  aides : Écris |f(x) − 15| et fais apparaître |x − x₀| = |x + 4|. | |(−5 − 5x) − 15| = □·|x + 4| | δ = ε/5 : 5·|x + 4| ≤ ε dès que |x + 4| ≤ ε/5.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→−4 2x + 7 = −1. Écris d'abord l'écart |(2x + 7) + 1| en fonction de |x − x₀|.
  [guided]  |(2x + 7) + 1|
    = |2x + □|   (trous : |2x + 8|)   ← Réduire l'écart
    = □(|x + 4|)   (trous : 2(|x + 4|))   ← Faire apparaître |x − x₀| = |x + 4|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/□   (trous : ε/2)   ← 2|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/2
  aides : Écris |f(x) + 1| et fais apparaître |x − x₀| = |x + 4|. | |(2x + 7) + 1| = □·|x + 4| | δ = ε/2 : 2·|x + 4| ≤ ε dès que |x + 4| ≤ ε/2.
  pièges : g1_triangle_reverse

```

### Niveau 2

```
Montre avec la définition que limx→−4 6 + 6x = −18. Écris d'abord l'écart |(6 + 6x) + 18| en fonction de |x − x₀|.
  [guided]  |(6 + 6x) + 18|
    = |6x + □|   (trous : |6x + 24|)   ← Réduire l'écart
    = □(|x + 4|)   (trous : 6(|x + 4|))   ← Faire apparaître |x − x₀| = |x + 4|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    ? Quel δ choisir ? ✔ δ = ε/6 / · δ = 6ε
    = ε/6   ← 6|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/6
  aides : Écris |f(x) + 18| et fais apparaître |x − x₀| = |x + 4|. | |(6 + 6x) + 18| = □·|x + 4| | δ = ε/6 : 6·|x + 4| ≤ ε dès que |x + 4| ≤ ε/6.
  pièges : g1_triangle_reverse, a1_delta_inverted

Montre avec la définition que limx→1 x² + x = 2. Écris d'abord l'écart |(x² + x) − 2| en fonction de |x − x₀|.
  [guided]  |(x² + x) − 2|
    = |(x − 1)(□)|   (trous : |(x − 1)(x + 2)|)   ← Factoriser : x₀ est une racine de f(x) − L
    = |x − 1|·|x + 2|   ← Séparer les deux valeurs absolues
  — Impose |x − 1| ≤ 1 et majore l'autre facteur |x + 2|.  [juge equiv]  départ : |x + 2|
    (Si |x − 1| ≤ 1, alors x ∈ [0 ; 2].)
    = |x − 1| + □   (trous : |x − 1| + 3)   ← x + 2 = (x − 1) + 3 : inégalité triangulaire
    = 4   ← |x − 1| ≤ 1
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    ? Quel δ choisir ? · δ = ε/|x + 2| / · δ = 4ε / ✔ δ = min(1 ; ε/4)
    = min(1,ε/4)   ← |x − 1| ≤ 1 et 4|x − 1| ≤ ε
  aides : Écris |f(x) − 2| et fais apparaître |x − x₀| = |x − 1|. Pour l'autre facteur, impose |x − x₀| ≤ 1. | |(x² + x) − 2| = □·|x − 1| | δ = min(1 ; ε/4) : si |x − 1| ≤ 1, |f(x) − 2| ≤ 4·|x − 1| ≤ ε dès que |x − 1| ≤ ε/4.
  pièges : g1_triangle_reverse, a1_delta_depends_on_x, a1_delta_inverted

Montre avec la définition que limx→2 −3 − 8x = −19. Écris d'abord l'écart |(−3 − 8x) + 19| en fonction de |x − x₀|.
  [guided]  |(−3 − 8x) + 19|
    = |−8x + □|   (trous : |−8x + 16|)   ← Réduire l'écart
    = □(|x − 2|)   (trous : 8(|x − 2|))   ← Faire apparaître |x − x₀| = |x − 2|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    ? Quel δ choisir ? · δ = 8ε / ✔ δ = ε/8
    = ε/8   ← 8|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/8
  aides : Écris |f(x) + 19| et fais apparaître |x − x₀| = |x − 2|. | |(−3 − 8x) + 19| = □·|x − 2| | δ = ε/8 : 8·|x − 2| ≤ ε dès que |x − 2| ≤ ε/8.
  pièges : g1_triangle_reverse, a1_delta_inverted

```

### Niveau 3

```
Montre avec la définition que limx→1 x² − 4x = −3. Écris d'abord l'écart |(x² − 4x) + 3| en fonction de |x − x₀|.
  [tap, suivre l'erreur, menu steps]  |(x² − 4x) + 3|
    = |(x − 1)(x − 3)|   ← Factoriser : x₀ est une racine de f(x) − L
    = |x − 1|·|x − 3|   ← Séparer les deux valeurs absolues
  — Impose |x − 1| ≤ 1 et majore l'autre facteur |x − 3|.  [juge equiv]  départ : |x − 3|
    = |x − 1| + 2   ← x − 3 = (x − 1) + (-2) : inégalité triangulaire
    = 3   ← |x − 1| ≤ 1
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = min(1,ε/3)   ← |x − 1| ≤ 1 et 3|x − 1| ≤ ε
  aides : Écris |f(x) + 3| et fais apparaître |x − x₀| = |x − 1|. Pour l'autre facteur, impose |x − x₀| ≤ 1. | |(x² − 4x) + 3| = □·|x − 1| | δ = min(1 ; ε/3) : si |x − 1| ≤ 1, |f(x) + 3| ≤ 3·|x − 1| ≤ ε dès que |x − 1| ≤ ε/3.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→2 x² + 2x = 8. Écris d'abord l'écart |(x² + 2x) − 8| en fonction de |x − x₀|.
  [tap, suivre l'erreur, menu steps]  |(x² + 2x) − 8|
    = |(x − 2)(x + 4)|   ← Factoriser : x₀ est une racine de f(x) − L
    = |x − 2|·|x + 4|   ← Séparer les deux valeurs absolues
  — Impose |x − 2| ≤ 1 et majore l'autre facteur |x + 4|.  [juge equiv]  départ : |x + 4|
    = |x − 2| + 6   ← x + 4 = (x − 2) + 6 : inégalité triangulaire
    = 7   ← |x − 2| ≤ 1
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = min(1,ε/7)   ← |x − 2| ≤ 1 et 7|x − 2| ≤ ε
  aides : Écris |f(x) − 8| et fais apparaître |x − x₀| = |x − 2|. Pour l'autre facteur, impose |x − x₀| ≤ 1. | |(x² + 2x) − 8| = □·|x − 2| | δ = min(1 ; ε/7) : si |x − 2| ≤ 1, |f(x) − 8| ≤ 7·|x − 2| ≤ ε dès que |x − 2| ≤ ε/7.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→0 −9 + 7x = −9. Écris d'abord l'écart |(−9 + 7x) + 9| en fonction de |x − x₀|.
  [tap, suivre l'erreur, menu steps]  |(−9 + 7x) + 9|
    = |7x|   ← Réduire l'écart
    = 7|x|   ← Faire apparaître |x − x₀| = |x|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/7   ← 7|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/7
  aides : Écris |f(x) + 9| et fais apparaître |x − x₀| = |x|. | |(−9 + 7x) + 9| = □·|x| | δ = ε/7 : 7·|x| ≤ ε dès que |x| ≤ ε/7.
  pièges : g1_triangle_reverse

```

### Niveau 4

```
Montre avec la définition que limx→−1 −7 + 5x = −12. Écris d'abord l'écart |(−7 + 5x) + 12| en fonction de |x − x₀|.
  [free, suivre l'erreur]  |(−7 + 5x) + 12|
    = |5x + 5|   ← Réduire l'écart
    = 5|x + 1|   ← Faire apparaître |x − x₀| = |x + 1|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/5   ← 5|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/5
  aides : Écris |f(x) + 12| et fais apparaître |x − x₀| = |x + 1|. | |(−7 + 5x) + 12| = □·|x + 1| | δ = ε/5 : 5·|x + 1| ≤ ε dès que |x + 1| ≤ ε/5.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→4 7 − 4x = −9. Écris d'abord l'écart |(7 − 4x) + 9| en fonction de |x − x₀|.
  [free, suivre l'erreur]  |(7 − 4x) + 9|
    = |−4x + 16|   ← Réduire l'écart
    = 4|x − 4|   ← Faire apparaître |x − x₀| = |x − 4|
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε/4   ← 4|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/4
  aides : Écris |f(x) + 9| et fais apparaître |x − x₀| = |x − 4|. | |(7 − 4x) + 9| = □·|x − 4| | δ = ε/4 : 4·|x − 4| ≤ ε dès que |x − 4| ≤ ε/4.
  pièges : g1_triangle_reverse

Montre avec la définition que limx→1 √x = 1. Écris d'abord l'écart |√x − 1| en fonction de |x − x₀|.
  [free, suivre l'erreur]  |√x − 1|
    = |x − 1|/(√x + 1)   ← Multiplier par le conjugué √x + 1
  — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
    = ε   ← √x + 1 ≥ 1, donc |√x − 1| ≤ |x − 1|/1 ≤ ε dès que |x − 1| ≤ ε
  aides : Écris |f(x) − 1| et fais apparaître |x − x₀| = |x − 1|. | |√x − 1| = |x − 1|/□ | δ = ε : √x + 1 ≥ 1, donc |√x − 1| ≤ |x − 1|/1.
  pièges : g1_triangle_reverse

```

### Niveau 5

```
Montre avec la définition que limx→4 √x = 2.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Écris avec des quantificateurs ce que veut dire limx→4 √x = 2.
    [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ ℝ · 0 < |x − 4| ≤ δ · |f(x) − 2| ≤ ε · 0 < |x − 4| ≤ ε · |f(x) − 2| ≤ δ
      → ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, 0 < |x − 4| ≤ δ ⇒ |f(x) − 2| ≤ ε
  partie 2 (Écart et δ : 1 ; Choisis δ en fonction de ε seulement. : 1)
  Écris l'écart |√x − 2| en fonction de |x − x₀|, puis choisis δ.
    [free, sans aide, suivre l'erreur]  |√x − 2|
      = |x − 4|/(√x + 2)   ← Multiplier par le conjugué √x + 2
    — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
      = 2ε   ← √x + 2 ≥ 2, donc |√x − 2| ≤ |x − 4|/2 ≤ ε dès que |x − 4| ≤ 2ε
  partie 3 (Conclusion : 1)
  Quelle conclusion ?
    ✔ Pour tout ε > 0, avec δ = 2ε : si 0 < |x − 4| ≤ δ, alors |f(x) − 2| ≤ ε. Donc la limite vaut 2.   · Pour ε = 0,01, δ = 20,01 convient : donc la limite vaut 2. [g9_proof_by_example]   · Il existe δ > 0 tel que pour tout ε > 0 : si 0 < |x − 4| ≤ δ, alors |f(x) − 2| ≤ ε. [g9_quant_order]   · Pour tout x, il existe ε > 0 tel que |f(x) − 2| ≤ ε.
  pièges : g9_quant_order, a1_epsdelta_swapped, g1_triangle_reverse, g9_proof_by_example

Montre avec la définition que limx→2 −1 − 3x = −7.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Écris avec des quantificateurs ce que veut dire limx→2 −1 − 3x = −7.
    [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ ℝ · 0 < |x − 2| ≤ δ · |f(x) + 7| ≤ ε · 0 < |x − 2| ≤ ε · |f(x) + 7| ≤ δ
      → ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, 0 < |x − 2| ≤ δ ⇒ |f(x) + 7| ≤ ε
  partie 2 (Écart et δ : 1 ; Choisis δ en fonction de ε seulement. : 1)
  Écris l'écart |(−1 − 3x) + 7| en fonction de |x − x₀|, puis choisis δ.
    [free, sans aide, suivre l'erreur]  |(−1 − 3x) + 7|
      = |−3x + 6|   ← Réduire l'écart
      = 3|x − 2|   ← Faire apparaître |x − x₀| = |x − 2|
    — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
      = ε/3   ← 3|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/3
  partie 3 (Conclusion : 1)
  Quelle conclusion ?
    · Pour ε = 0,01, δ = 0,01/3 convient : donc la limite vaut −7. [g9_proof_by_example]   ✔ Pour tout ε > 0, avec δ = ε/3 : si 0 < |x − 2| ≤ δ, alors |f(x) + 7| ≤ ε. Donc la limite vaut −7.   · Pour tout x, il existe ε > 0 tel que |f(x) + 7| ≤ ε.   · Il existe δ > 0 tel que pour tout ε > 0 : si 0 < |x − 2| ≤ δ, alors |f(x) + 7| ≤ ε. [g9_quant_order]
  pièges : g9_quant_order, a1_epsdelta_swapped, g1_triangle_reverse, g9_proof_by_example

Montre avec la définition que limx→1 √x = 1.
  [problème, 4 points]
  partie 1 (Définition : 1)
  Écris avec des quantificateurs ce que veut dire limx→1 √x = 1.
    [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ ℝ · 0 < |x − 1| ≤ δ · |f(x) − 1| ≤ ε · 0 < |x − 1| ≤ ε · |f(x) − 1| ≤ δ
      → ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, 0 < |x − 1| ≤ δ ⇒ |f(x) − 1| ≤ ε
  partie 2 (Écart et δ : 1 ; Choisis δ en fonction de ε seulement. : 1)
  Écris l'écart |√x − 1| en fonction de |x − x₀|, puis choisis δ.
    [free, sans aide, suivre l'erreur]  |√x − 1|
      = |x − 1|/(√x + 1)   ← Multiplier par le conjugué √x + 1
    — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
      = ε   ← √x + 1 ≥ 1, donc |√x − 1| ≤ |x − 1|/1 ≤ ε dès que |x − 1| ≤ ε
  partie 3 (Conclusion : 1)
  Quelle conclusion ?
    · Pour tout x, il existe ε > 0 tel que |f(x) − 1| ≤ ε.   · Pour ε = 0,01, δ = 0,01 convient : donc la limite vaut 1. [g9_proof_by_example]   · Il existe δ > 0 tel que pour tout ε > 0 : si 0 < |x − 1| ≤ δ, alors |f(x) − 1| ≤ ε. [g9_quant_order]   ✔ Pour tout ε > 0, avec δ = ε : si 0 < |x − 1| ≤ δ, alors |f(x) − 1| ≤ ε. Donc la limite vaut 1.
  pièges : g9_quant_order, a1_epsdelta_swapped, g1_triangle_reverse, g9_proof_by_example

```

### Variantes d'examen

```
Vrai ou faux ? « Pour prouver limx→3 x² = 9, δ = ε/|x + 3| convient. »
  · Vrai [a1_delta_depends_on_x]   ✔ Faux
  [examen tf]
  pièges : a1_delta_depends_on_x

Montre avec la définition que limx→1 √x = 1.
  [problème, examen open, 4 points]
  partie 1 (Définition : 1)
  Écris avec des quantificateurs ce que veut dire limx→1 √x = 1.
    [jetons, sans aide] palette : ε > 0 · δ > 0 · x ∈ ℝ · 0 < |x − 1| ≤ δ · |f(x) − 1| ≤ ε · 0 < |x − 1| ≤ ε · |f(x) − 1| ≤ δ
      → ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, 0 < |x − 1| ≤ δ ⇒ |f(x) − 1| ≤ ε
  partie 2 (Écart et δ : 1 ; Choisis δ en fonction de ε seulement. : 1)
  Écris l'écart |√x − 1| en fonction de |x − x₀|, puis choisis δ.
    [free, sans aide, suivre l'erreur]  |√x − 1|
      = |x − 1|/(√x + 1)   ← Multiplier par le conjugué √x + 1
    — Choisis δ en fonction de ε seulement.  [juge delta]  départ : δ
      = ε   ← √x + 1 ≥ 1, donc |√x − 1| ≤ |x − 1|/1 ≤ ε dès que |x − 1| ≤ ε
  partie 3 (Conclusion : 1)
  Quelle conclusion ?
    · Pour ε = 0,01, δ = 0,01 convient : donc la limite vaut 1. [g9_proof_by_example]   ✔ Pour tout ε > 0, avec δ = ε : si 0 < |x − 1| ≤ δ, alors |f(x) − 1| ≤ ε. Donc la limite vaut 1.   · Pour tout x, il existe ε > 0 tel que |f(x) − 1| ≤ ε.   · Il existe δ > 0 tel que pour tout ε > 0 : si 0 < |x − 1| ≤ δ, alors |f(x) − 1| ≤ ε. [g9_quant_order]
  pièges : g9_quant_order, a1_epsdelta_swapped, g1_triangle_reverse, g9_proof_by_example

```

## Théorème de la valeur intermédiaire : existence d'une solution (`a1-fn-ivt`, BA1)

_f continue sur [a ; b], f(a) et f(b) de signes contraires : f s'annule._

### Niveau 1

```
Montre que l'équation cos(x) = 3x a une solution dans ]0 ; π/2[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. h(0) = … > 0   [à écrire : h(0) = 1]
    2. h(π/2) = … < 0   [à écrire : h(π/2) = -3π/2]
    3. h est continue sur [0 ; π/2] et change de signe : par le TVI, il existe c ∈ ]0 ; π/2[ tel que h(c) = 0. L'équation a une solution dans ]0 ; π/2[.

Montre que l'équation x⁵ + 8x − 3 = 0 a une solution dans ]0 ; 1[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. f(0) = … < 0   [à écrire : f(0) = -3]
    2. f(1) = … > 0   [à écrire : f(1) = 6]
    3. f est continue sur [0 ; 1] et change de signe : par le TVI, il existe c ∈ ]0 ; 1[ tel que f(c) = 0. L'équation a une solution dans ]0 ; 1[.

Montre que l'équation x⁷ + 4x − 4 = 0 a une solution dans ]0 ; 1[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. f(0) = … < 0   [à écrire : f(0) = -4]
    2. f(1) = … > 0   [à écrire : f(1) = 1]
    3. f est continue sur [0 ; 1] et change de signe : par le TVI, il existe c ∈ ]0 ; 1[ tel que f(c) = 0. L'équation a une solution dans ]0 ; 1[.

```

### Niveau 2

```
Montre que l'équation ln(x) = 3 − x a une solution dans ]1 ; 3[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    ? Sur quel segment, et avec quelle fonction, appliques-tu le TVI ? · h(x) = ln(x) + x − 3 sur [3 ; 4] / · h(x) = ln(x) + x − 3 sur [0 ; 3] / ✔ h(x) = ln(x) + x − 3 sur [1 ; 3]
    1. Soit h(x) = ln(x) + x − 3.
    2. h est continue sur [1 ; 3] (ln est continue sur ]0 ; +∞[).
    3. h(1) = … < 0   [à écrire : h(1) = -2]
    4. h(3) = … > 0   [à écrire : h(3) = ln(3)]
    5. h est continue sur [1 ; 3] et change de signe : par le TVI, il existe c ∈ ]1 ; 3[ tel que h(c) = 0. L'équation a une solution dans ]1 ; 3[.

Montre que l'équation ln(x) = 4 − x a une solution dans ]1 ; 4[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    ? Sur quel segment, et avec quelle fonction, appliques-tu le TVI ? · h(x) = ln(x) + x − 4 sur [4 ; 5] / · h(x) = ln(x) + x − 4 sur [0 ; 4] / ✔ h(x) = ln(x) + x − 4 sur [1 ; 4]
    1. Soit h(x) = ln(x) + x − 4.
    2. h est continue sur [1 ; 4] (ln est continue sur ]0 ; +∞[).
    3. h(1) = … < 0   [à écrire : h(1) = -3]
    4. h(4) = … > 0   [à écrire : h(4) = ln(4)]
    5. h est continue sur [1 ; 4] et change de signe : par le TVI, il existe c ∈ ]1 ; 4[ tel que h(c) = 0. L'équation a une solution dans ]1 ; 4[.

Montre que l'équation cos(x) = x a une solution dans ]0 ; π/2[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    ? Sur quel segment, et avec quelle fonction, appliques-tu le TVI ? · h(x) = cos(x) − x sur [π/2 ; π] / ✔ h(x) = cos(x) − x sur [0 ; π/2] / · h(x) = cos(x) + x sur [0 ; π/2]
    1. Soit h(x) = cos(x) − x : cos c = c ⇔ h(c) = 0.
    2. h est continue sur [0 ; π/2] (somme de fonctions continues).
    3. h(0) = … > 0   [à écrire : h(0) = 1]
    4. h(π/2) = … < 0   [à écrire : h(π/2) = -π/2]
    5. h est continue sur [0 ; π/2] et change de signe : par le TVI, il existe c ∈ ]0 ; π/2[ tel que h(c) = 0. L'équation a une solution dans ]0 ; π/2[.

```

### Niveau 3

```
Montre que l'équation ln(x) = 3 − x a une solution dans ]1 ; 3[. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit h(x) = ln(x) + x − 3.
    2. h est continue sur [1 ; 3] (ln est continue sur ]0 ; +∞[).
    3. h(1) = −2 < 0
    4. h(3) = ln(3) > 0
    5. h est continue sur [1 ; 3] et change de signe : par le TVI, il existe c ∈ ]1 ; 3[ tel que h(c) = 0. L'équation a une solution dans ]1 ; 3[.
    ✗ On calcule h en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ Par le théorème de Rolle, il existe c avec h′(c) = 0. [a1_rolle_without_hyp]
  pièges : g9_proof_by_example, a1_rolle_without_hyp

Soit f : [−1 ; 3] → [0 ; 1] continue. Montre qu'il existe x ∈ [0 ; 1] tel que f(x) = x. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit g(x) = f(x) − x, définie sur [−1 ; 3], qui contient [0 ; 1] : f(x) = x ⇔ g(x) = 0.
    2. g est continue sur [0 ; 1] (différence de deux fonctions continues).
    3. g(0) = f(0) ≥ 0, car f(0) ∈ [0 ; 1]
    4. g(1) = f(1) − 1 ≤ 0, car f(1) ≤ 1
    5. Par le TVI (si g(0) = 0 ou g(1) = 0, c'est déjà fini), g s'annule sur [0 ; 1] : il existe x ∈ [0 ; 1] tel que f(x) = x.
    ✗ On calcule g en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ g(0) et g(1) sont de signes contraires, donc g s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
  pièges : g9_proof_by_example, a1_ivt_no_continuity

Montre que l'équation ln(x) = 4 − x a une solution dans ]1 ; 4[. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit h(x) = ln(x) + x − 4.
    2. h est continue sur [1 ; 4] (ln est continue sur ]0 ; +∞[).
    3. h(1) = −3 < 0
    4. h(4) = ln(4) > 0
    5. h est continue sur [1 ; 4] et change de signe : par le TVI, il existe c ∈ ]1 ; 4[ tel que h(c) = 0. L'équation a une solution dans ]1 ; 4[.
    ✗ On calcule h en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ Par le théorème de Rolle, il existe c avec h′(c) = 0. [a1_rolle_without_hyp]
  pièges : g9_proof_by_example, a1_rolle_without_hyp

```

### Niveau 4

```
Soit f : [−3 ; 1] → [0 ; 1] continue. Montre qu'il existe x ∈ [0 ; 1] tel que f(x) = x. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit g(x) = f(x) − x, définie sur [−3 ; 1], qui contient [0 ; 1] : f(x) = x ⇔ g(x) = 0.
    2. g est continue sur [0 ; 1] (différence de deux fonctions continues).
    3. g(0) = f(0) ≥ 0, car f(0) ∈ [0 ; 1]
    4. g(1) = f(1) − 1 ≤ 0, car f(1) ≤ 1
    5. Par le TVI (si g(0) = 0 ou g(1) = 0, c'est déjà fini), g s'annule sur [0 ; 1] : il existe x ∈ [0 ; 1] tel que f(x) = x.
    ✗ On calcule g en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ Par le théorème de Rolle, il existe c avec g′(c) = 0. [a1_rolle_without_hyp]
    ✗ g(0) et g(1) sont de signes contraires, donc g s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
  pièges : g9_proof_by_example, a1_rolle_without_hyp, a1_ivt_no_continuity

Montre que l'équation x³ − x² − 7 = 0 a au moins une solution réelle. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit P(x) = x³ − x² − 7, polynôme de degré 3 (impair).
    2. P est continue sur ℝ (polynôme).
    3. lim_{x→−∞} P(x) = −∞ : il existe a avec P(a) < 0
    4. lim_{x→+∞} P(x) = +∞ : il existe b > a avec P(b) > 0
    5. Par le TVI sur [a ; b], P s'annule : l'équation a une solution réelle.
    ✗ Par le théorème de Rolle, il existe c avec P′(c) = 0. [a1_rolle_without_hyp]
    ✗ On calcule P en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ P(a) et P(b) sont de signes contraires, donc P s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
  pièges : a1_rolle_without_hyp, g9_proof_by_example, a1_ivt_no_continuity

Montre que l'équation e^(−x) = x a une solution dans ]0 ; 1[, et qu'elle est unique. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soit h(x) = e^(−x) − x.
    2. h est continue sur [0 ; 1] (somme de fonctions continues).
    3. h(0) = … > 0   [à écrire : h(0) = 1]
    4. h(1) = … < 0   [à écrire : h(1) = e^(-1)-1]
    5. h est continue sur [0 ; 1] et change de signe : par le TVI, il existe c ∈ ]0 ; 1[ tel que h(c) = 0. L'équation a une solution dans ]0 ; 1[.
    6. h′(x) = …, de signe constant sur [0 ; 1] : h est strictement décroissante, la solution est unique.   [à écrire : h′(x) = -e^(-x)-1]
    ✗ Par le théorème de Rolle, il existe c avec h′(c) = 0. [a1_rolle_without_hyp]
    ✗ h(0) et h(1) sont de signes contraires, donc h s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
    ✗ On calcule h en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
  pièges : a1_rolle_without_hyp, a1_ivt_no_continuity, g9_proof_by_example

```

### Niveau 5

```
Montre que l'équation x⁷ + 8x − 5 = 0 a une solution dans ]0 ; 1[, et qu'elle est unique. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soit f(x) = x⁷ + 8x − 5.
    2. f est continue sur [0 ; 1] (polynôme).
    3. f(0) = … < 0   [à écrire : f(0) = -5]
    4. f(1) = … > 0   [à écrire : f(1) = 4]
    5. f est continue sur [0 ; 1] et change de signe : par le TVI, il existe c ∈ ]0 ; 1[ tel que f(c) = 0. L'équation a une solution dans ]0 ; 1[.
    6. f′(x) = 7x⁶ + 8, de signe constant sur [0 ; 1] : f est strictement croissante, la solution est unique.
    ✗ On calcule f en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ f(0) et f(1) sont de signes contraires, donc f s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
    ✗ Par le théorème de Rolle, il existe c avec f′(c) = 0. [a1_rolle_without_hyp]
  pièges : g9_proof_by_example, a1_ivt_no_continuity, a1_rolle_without_hyp

Montre que l'équation x³ − 3x − 2 = 0 a au moins une solution réelle. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Soit P(x) = x³ − 3x − 2, polynôme de degré 3 (impair).
    2. P est continue sur ℝ (polynôme).
    3. lim_{x→−∞} P(x) = −∞ : il existe a avec P(a) < 0
    4. lim_{x→+∞} P(x) = +∞ : il existe b > a avec P(b) > 0
    5. Par le TVI sur [a ; b], P s'annule : l'équation a une solution réelle.
    ✗ P(a) et P(b) sont de signes contraires, donc P s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
    ✗ Par le théorème de Rolle, il existe c avec P′(c) = 0. [a1_rolle_without_hyp]
    ✗ On calcule P en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
  pièges : a1_ivt_no_continuity, a1_rolle_without_hyp, g9_proof_by_example

Montre que l'équation e^(−x) = 2x a une solution dans ]0 ; 1[, et qu'elle est unique. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soit h(x) = e^(−x) − 2x.
    2. h est continue sur [0 ; 1] (somme de fonctions continues).
    3. h(0) = … > 0   [à écrire : h(0) = 1]
    4. h(1) = … < 0   [à écrire : h(1) = e^(-1)-2]
    5. h est continue sur [0 ; 1] et change de signe : par le TVI, il existe c ∈ ]0 ; 1[ tel que h(c) = 0. L'équation a une solution dans ]0 ; 1[.
    6. h′(x) = −e^(−x) − 2, de signe constant sur [0 ; 1] : h est strictement décroissante, la solution est unique.
    ✗ Par le théorème de Rolle, il existe c avec h′(c) = 0. [a1_rolle_without_hyp]
    ✗ On calcule h en quelques points : la valeur au milieu est proche de 0, donc c'est la solution. [g9_proof_by_example]
    ✗ h(0) et h(1) sont de signes contraires, donc h s'annule : pas besoin de continuité. [a1_ivt_no_continuity]
  pièges : a1_rolle_without_hyp, g9_proof_by_example, a1_ivt_no_continuity

```

### Variantes d'examen

```
Vrai ou faux ?
  « Il existe une fonction f continue et bijective de ]−1 ; 1[ sur ℝ. » → VRAI
  [examen tf]

```

## Image d'un intervalle par une fonction continue (`a1-fn-image`, BA1)

_Sur un segment : [min ; max], cherchés aux bornes et là où f′ = 0._

### Niveau 1

```
Soit f(x) = e^x·cos(x) sur [0 ; π/2]. Détermine l'image f([0 ; π/2]). On donne f′(x) = e^x(cos(x) − sin(x)).
  [guided]  e^x(cos(x) − sin(x)) = 0
    = cos(x) − sin(x) = 0   ← eˣ > 0 : on simplifie
    = x = □   (trous : x = π/4)   ← Zéros dans [0 ; π/2]
  — Image : f est continue sur [0 ; π/2], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, π/4, π/2).  [juge solset]  départ : min(f(0),f(π/4),f(π/2)) ≤ y ≤ max(f(0),f(π/4),f(π/2))
    = min(1,□,0) ≤ y ≤ max(1,(√2/2)e^(π/4),0)   (trous : min(1,(√2/2)e^(π/4),0) ≤ y ≤ max(1,(√2/2)e^(π/4),0))   ← Valeurs aux candidats
    = 0 ≤ y ≤ (√2/2)e^(π/4)   ← Min et max
    = [□ ; (√2/2)e^(π/4)]   (trous : [0 ; (√2/2)e^(π/4)])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = e^x(cos(x) − sin(x)) = 0 ⇔ x = π/4 ; puis f(0), f(π/4), f(π/2). | max = (√2/2)e^(π/4) (en π/4), min = 0 (en π/2).

Soit f(x) = −2x³ + 9x² − 12x + 1 sur [1 ; 3]. Détermine l'image f([1 ; 3]). On donne f′(x) = −6x² + 18x − 12.
  [guided]  −6x² + 18x − 12 = 0
    = x² − 3x + 2 = 0   ← Diviser par 6
    = x = 1 ou x = □   (trous : x = 1 ou x = 2)   ← Zéros dans [1 ; 3]
  — Image : f est continue sur [1 ; 3], son image est [min ; max] des valeurs aux bornes et aux points critiques (1, 2, 3).  [juge solset]  départ : min(f(1),f(2),f(3)) ≤ y ≤ max(f(1),f(2),f(3))
    = min(−4,□,−8) ≤ y ≤ max(−4,−3,−8)   (trous : min(−4,−3,−8) ≤ y ≤ max(−4,−3,−8))   ← Valeurs aux candidats
    = −8 ≤ y ≤ −3   ← Min et max
    = [□ ; −3]   (trous : [−8 ; −3])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = −6x² + 18x − 12 = 0 ⇔ x = 1 ou x = 2 ; puis f(1), f(2), f(3). | max = −3 (en 2), min = −8 (en 3).

Soit f(x) = e^x·sin(x) sur [0 ; π]. Détermine l'image f([0 ; π]). On donne f′(x) = e^x(sin(x) + cos(x)).
  [guided]  e^x(sin(x) + cos(x)) = 0
    = sin(x) + cos(x) = 0   ← eˣ > 0 : on simplifie
    = x = □   (trous : x = 3π/4)   ← Zéros dans [0 ; π]
  — Image : f est continue sur [0 ; π], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, 3π/4, π).  [juge solset]  départ : min(f(0),f(3π/4),f(π)) ≤ y ≤ max(f(0),f(3π/4),f(π))
    = min(0,□,0) ≤ y ≤ max(0,(√2/2)e^(3π/4),0)   (trous : min(0,(√2/2)e^(3π/4),0) ≤ y ≤ max(0,(√2/2)e^(3π/4),0))   ← Valeurs aux candidats
    = 0 ≤ y ≤ (√2/2)e^(3π/4)   ← Min et max
    = [□ ; (√2/2)e^(3π/4)]   (trous : [0 ; (√2/2)e^(3π/4)])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = e^x(sin(x) + cos(x)) = 0 ⇔ x = 3π/4 ; puis f(0), f(3π/4), f(π). | max = (√2/2)e^(3π/4) (en 3π/4), min = 0 (en 0).

```

### Niveau 2

```
Soit f(x) = −2x³ − 9x² − 12x − 1 sur [−4 ; −1]. Détermine l'image f([−4 ; −1]). Les candidats sont −4, −2, −1.
  [guided]  (−2x³ − 9x² − 12x − 1)′
    = −6x² − 18x − 12   ← Dériver
  — Image : f est continue sur [−4 ; −1], son image est [min ; max] des valeurs aux bornes et aux points critiques (−4, −2, −1).  [juge solset]  départ : min(f(−4),f(−2),f(−1)) ≤ y ≤ max(f(−4),f(−2),f(−1))
    = min(31,3,4) ≤ y ≤ max(31,3,4)   ← Valeurs aux candidats
    = 3 ≤ y ≤ 31   ← Min et max
    = [□ ; 31]   (trous : [3 ; 31])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = −6x² − 18x − 12 = 0 ⇔ x = −2 ou x = −1 ; puis f(−4), f(−2), f(−1). | max = 31 (en −4), min = 3 (en −2).

Soit f(x) = −2x³ + 9x² − 6 sur [0 ; 4]. Détermine l'image f([0 ; 4]). Les candidats sont 0, 3, 4.
  [guided]  (−2x³ + 9x² − 6)′
    = −6x² + 18x   ← Dériver
  — Image : f est continue sur [0 ; 4], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, 3, 4).  [juge solset]  départ : min(f(0),f(3),f(4)) ≤ y ≤ max(f(0),f(3),f(4))
    = min(−6,21,10) ≤ y ≤ max(−6,21,10)   ← Valeurs aux candidats
    = −6 ≤ y ≤ 21   ← Min et max
    = [□ ; 21]   (trous : [−6 ; 21])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = −6x² + 18x = 0 ⇔ x = 0 ou x = 3 ; puis f(0), f(3), f(4). | max = 21 (en 3), min = −6 (en 0).

Soit f(x) = −2x³ + 9x² − 12x sur [−1 ; 2]. Détermine l'image f([−1 ; 2]). Les candidats sont −1, 1, 2.
  [guided]  (−2x³ + 9x² − 12x)′
    = −6x² + 18x − 12   ← Dériver
  — Image : f est continue sur [−1 ; 2], son image est [min ; max] des valeurs aux bornes et aux points critiques (−1, 1, 2).  [juge solset]  départ : min(f(−1),f(1),f(2)) ≤ y ≤ max(f(−1),f(1),f(2))
    = min(23,−5,−4) ≤ y ≤ max(23,−5,−4)   ← Valeurs aux candidats
    = −5 ≤ y ≤ 23   ← Min et max
    = [□ ; 23]   (trous : [−5 ; 23])   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = −6x² + 18x − 12 = 0 ⇔ x = 1 ou x = 2 ; puis f(−1), f(1), f(2). | max = 23 (en −1), min = −5 (en 1).

```

### Niveau 3

```
Soit f(x) = 2x³ + 3x² − 12x − 8 sur [−2 ; 2]. Détermine l'image f([−2 ; 2]).
  [tap, suivre l'erreur, menu steps]  (2x³ + 3x² − 12x − 8)′
    = 6x² + 6x − 12   ← Dériver
  — Points critiques : f′(x) = 0 sur [−2 ; 2].  [juge solset]  départ : 6x² + 6x − 12 = 0
    = x² + x − 2 = 0   ← Diviser par 6
    = x = −2 ou x = 1   ← Zéros dans [−2 ; 2]
  — Image : f est continue sur [−2 ; 2], son image est [min ; max] des valeurs aux bornes et aux points critiques (−2, 1, 2).  [juge solset]  départ : min(f(−2),f(1),f(2)) ≤ y ≤ max(f(−2),f(1),f(2))
    = min(12,−15,−4) ≤ y ≤ max(12,−15,−4)   ← Valeurs aux candidats
    = −15 ≤ y ≤ 12   ← Min et max
    = [−15 ; 12]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = 6x² + 6x − 12 = 0 ⇔ x = −2 ou x = 1 ; puis f(−2), f(1), f(2). | max = 12 (en −2), min = −15 (en 1).

Soit f(x) = e^x·cos(x) sur [0 ; π/2]. Détermine l'image f([0 ; π/2]).
  [tap, suivre l'erreur, menu steps]  (e^x·cos(x))′
    = e^x(cos(x) − sin(x))   ← Dériver
  — Points critiques : f′(x) = 0 sur [0 ; π/2].  [juge solset]  départ : e^x(cos(x) − sin(x)) = 0
    = cos(x) − sin(x) = 0   ← eˣ > 0 : on simplifie
    = x = π/4   ← Zéros dans [0 ; π/2]
  — Image : f est continue sur [0 ; π/2], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, π/4, π/2).  [juge solset]  départ : min(f(0),f(π/4),f(π/2)) ≤ y ≤ max(f(0),f(π/4),f(π/2))
    = min(1,(√2/2)e^(π/4),0) ≤ y ≤ max(1,(√2/2)e^(π/4),0)   ← Valeurs aux candidats
    = 0 ≤ y ≤ (√2/2)e^(π/4)   ← Min et max
    = [0 ; (√2/2)e^(π/4)]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = e^x(cos(x) − sin(x)) = 0 ⇔ x = π/4 ; puis f(0), f(π/4), f(π/2). | max = (√2/2)e^(π/4) (en π/4), min = 0 (en π/2).
  pièges : g6_product_naive

Soit f(x) = 2x³ − 6x + 7 sur [−1 ; 2]. Détermine l'image f([−1 ; 2]).
  [tap, suivre l'erreur, menu steps]  (2x³ − 6x + 7)′
    = 6x² − 6   ← Dériver
  — Points critiques : f′(x) = 0 sur [−1 ; 2].  [juge solset]  départ : 6x² − 6 = 0
    = x² − 1 = 0   ← Diviser par 6
    = x = −1 ou x = 1   ← Zéros dans [−1 ; 2]
  — Image : f est continue sur [−1 ; 2], son image est [min ; max] des valeurs aux bornes et aux points critiques (−1, 1, 2).  [juge solset]  départ : min(f(−1),f(1),f(2)) ≤ y ≤ max(f(−1),f(1),f(2))
    = min(11,3,11) ≤ y ≤ max(11,3,11)   ← Valeurs aux candidats
    = 3 ≤ y ≤ 11   ← Min et max
    = [3 ; 11]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = 6x² − 6 = 0 ⇔ x = −1 ou x = 1 ; puis f(−1), f(1), f(2). | max = 11 (en −1), min = 3 (en 1).

```

### Niveau 4

```
Soit f(x) = e^(−x)·cos(x) sur [0 ; π]. Détermine l'image f([0 ; π]).
  [free, suivre l'erreur]  (e^(−x)·cos(x))′
    = −e^(−x)(sin(x) + cos(x))   ← Dériver
  — Points critiques : f′(x) = 0 sur [0 ; π].  [juge solset]  départ : −e^(−x)(sin(x) + cos(x)) = 0
    = sin(x) + cos(x) = 0   ← e^(−x) > 0 : on simplifie
    = x = 3π/4   ← Zéros dans [0 ; π]
  — Image : f est continue sur [0 ; π], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, 3π/4, π).  [juge solset]  départ : min(f(0),f(3π/4),f(π)) ≤ y ≤ max(f(0),f(3π/4),f(π))
    = min(1,−(√2/2)e^(−3π/4),−e^(−π)) ≤ y ≤ max(1,−(√2/2)e^(−3π/4),−e^(−π))   ← Valeurs aux candidats
    = −(√2/2)e^(−3π/4) ≤ y ≤ 1   ← Min et max
    = [−(√2/2)e^(−3π/4) ; 1]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = −e^(−x)(sin(x) + cos(x)) = 0 ⇔ x = 3π/4 ; puis f(0), f(3π/4), f(π). | max = 1 (en 0), min = −(√2/2)e^(−3π/4) (en 3π/4).
  pièges : g6_product_naive, g6_chain_forgot

Soit f(x) = e^x·cos(x) sur [0 ; π]. Détermine l'image f([0 ; π]).
  [free, suivre l'erreur]  (e^x·cos(x))′
    = e^x(cos(x) − sin(x))   ← Dériver
  — Points critiques : f′(x) = 0 sur [0 ; π].  [juge solset]  départ : e^x(cos(x) − sin(x)) = 0
    = cos(x) − sin(x) = 0   ← eˣ > 0 : on simplifie
    = x = π/4   ← Zéros dans [0 ; π]
  — Image : f est continue sur [0 ; π], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, π/4, π).  [juge solset]  départ : min(f(0),f(π/4),f(π)) ≤ y ≤ max(f(0),f(π/4),f(π))
    = min(1,(√2/2)e^(π/4),−e^π) ≤ y ≤ max(1,(√2/2)e^(π/4),−e^π)   ← Valeurs aux candidats
    = −e^π ≤ y ≤ (√2/2)e^(π/4)   ← Min et max
    = [−e^π ; (√2/2)e^(π/4)]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = e^x(cos(x) − sin(x)) = 0 ⇔ x = π/4 ; puis f(0), f(π/4), f(π). | max = (√2/2)e^(π/4) (en π/4), min = −e^π (en π).
  pièges : g6_product_naive

Soit f(x) = e^x·sin(x) sur [0 ; π]. Détermine l'image f([0 ; π]).
  [free, suivre l'erreur]  (e^x·sin(x))′
    = e^x(sin(x) + cos(x))   ← Dériver
  — Points critiques : f′(x) = 0 sur [0 ; π].  [juge solset]  départ : e^x(sin(x) + cos(x)) = 0
    = sin(x) + cos(x) = 0   ← eˣ > 0 : on simplifie
    = x = 3π/4   ← Zéros dans [0 ; π]
  — Image : f est continue sur [0 ; π], son image est [min ; max] des valeurs aux bornes et aux points critiques (0, 3π/4, π).  [juge solset]  départ : min(f(0),f(3π/4),f(π)) ≤ y ≤ max(f(0),f(3π/4),f(π))
    = min(0,(√2/2)e^(3π/4),0) ≤ y ≤ max(0,(√2/2)e^(3π/4),0)   ← Valeurs aux candidats
    = 0 ≤ y ≤ (√2/2)e^(3π/4)   ← Min et max
    = [0 ; (√2/2)e^(3π/4)]   ← L'image est un segment
  aides : Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. | f′(x) = e^x(sin(x) + cos(x)) = 0 ⇔ x = 3π/4 ; puis f(0), f(3π/4), f(π). | max = (√2/2)e^(3π/4) (en 3π/4), min = 0 (en 0).
  pièges : g6_product_naive

```

### Niveau 5

```
Soit f(x) = −2x³ + 9x² + 1. L'image f([−1 ; 4]) est :
  · [12 ; 17] [a1_image_endpoints_only]   · [1 ; 28[   ✔ [1 ; 28]   · ]1 ; 28[
  pièges : a1_image_endpoints_only

Soit f(x) = 2x³ − 18x² + 48x − 9. L'image f([2 ; 5]) est :
  ✔ [23 ; 31]   · [23 ; 31[   · ]23 ; 31[   · [31 ; 31] [a1_image_endpoints_only]
  pièges : a1_image_endpoints_only

Soit f(x) = −2x³ + 9x² − 2. L'image f([−1 ; 3]) est :
  · [9 ; 25] [a1_image_endpoints_only]   ✔ [−2 ; 25]   · ]−2 ; 25[   · [−2 ; 25[
  pièges : a1_image_endpoints_only

```

### Variantes d'examen

```
Soit f(x) = sin(Arctg(√x)) sur [3 ; +∞[. L'image f([3 ; +∞[) est :
  · [0 ; 1]   ✔ [√3/2 ; 1[   · ]√3/2 ; 1[   · [√3/2 ; 1]
  [examen mcq]

Vrai ou faux ?
  « Soit f(x) = −2x³ + 9x² − 12x + 8. Alors f([0 ; 2]) = [4 ; 8]. » → FAUX
    contre-exemple (refute) : x = 1
  [examen tf]
  pièges : a1_image_endpoints_only

```

## Bissection et méthode du point fixe (cours MT) (`a1-bisection-fixpoint`, BA1)

_Garder la moitié où f change de signe ; g contractante._

### Niveau 1

```
Bissection pour f(x) = x³ + 3x − 9 sur [1 ; 2] : f(1) = −5 < 0 et f(2) = 5 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  1,5  −1,125
    2        (1,5)  (2)  1,75  1,6094
    3        (1,5)  (1,75)  1,625  0,166

Bissection pour f(x) = x³ + x − 7 sur [1 ; 2] : f(1) = −5 < 0 et f(2) = 3 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  1,5  −2,125
    2        (1,5)  (2)  1,75  0,1094
    3        (1,5)  (1,75)  1,625  −1,084

Bissection pour f(x) = x³ + 5x − 5 sur [0 ; 1] : f(0) = −5 < 0 et f(1) = 1 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        0  1  0,5  −2,375
    2        (0,5)  (1)  0,75  −0,8281
    3        (0,75)  (1)  0,875  0,0449

```

### Niveau 2

```
Bissection pour f(x) = x³ + 3x − 6 sur [1 ; 2] : f(1) = −2 < 0 et f(2) = 8 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  1,5  1,875
    2        (1)  (1,5)  (1,25)  −0,2969
    3        (1,25)  (1,5)  (1,375)  0,7246
    4        (1,25)  (1,375)  (1,3125)  0,1985

Bissection pour f(x) = x³ + x² + 4x − 1 sur [0 ; 1] : f(0) = −1 < 0 et f(1) = 5 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        0  1  0,5  1,375
    2        (0)  (0,5)  (0,25)  0,0781
    3        (0)  (0,25)  (0,125)  −0,4824
    4        (0,125)  (0,25)  (0,1875)  −0,2083

Bissection pour f(x) = x³ + 4x − 4 sur [0 ; 1] : f(0) = −4 < 0 et f(1) = 1 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        0  1  0,5  −1,875
    2        (0,5)  (1)  (0,75)  −0,5781
    3        (0,75)  (1)  (0,875)  0,1699
    4        (0,75)  (0,875)  (0,8125)  −0,2136

```

### Niveau 3

```
Bissection pour f(x) = x³ + 2x − 6 sur [1 ; 2] : f(1) = −3 < 0, f(2) = 6 > 0. Précision voulue : un intervalle de longueur ≤ 0,125. À chaque étape, choisis la moitié, puis écris son milieu.
  [tap, suivre l'erreur]  m_1
    = 1,5   ← m₁ = (1 + 2)/2
  — Étape 2  [juge value]  départ : m_2
    ? f(1,5) = 0,375 : quelle moitié gardes-tu ? ✔ Garder [1 ; 1,5] / · Garder [1,5 ; 2] / · Arrêter
    = 1,25   ← Milieu de la moitié gardée
  — Étape 3  [juge value]  départ : m_3
    ? f(1,25) ≈ −1,5469 : quelle moitié gardes-tu ? · Garder [1 ; 1,25] / ✔ Garder [1,25 ; 1,5] / · Arrêter
    = 1,375   ← Milieu de la moitié gardée
  — Fin  [juge value]  départ : c
    ? f(1,375) ≈ −0,6504 : quelle moitié gardes-tu ? · Garder [1,25 ; 1,375] / ✔ Garder [1,375 ; 1,5] / · Arrêter
    ? La moitié gardée mesure 0,125. Continuer ou arrêter ? ✔ Arrêter : son milieu approche la racine à 0,0625 près / · Continuer
    = 1,4375   ← Milieu de [1,375 ; 1,5]
  aides : Garde la moitié où f change de signe : compare le signe de f(m) à ceux de f(a) et f(b). | m₂ est le milieu de la moitié gardée : (a + b)/2 = ▢. | m₁ = 1,5, m₂ = 1,25, m₃ = 1,375, puis c ≈ 1,4375.

Bissection pour f(x) = x³ + 4x − 9 sur [1 ; 2] : f(1) = −4 < 0, f(2) = 7 > 0. Précision voulue : un intervalle de longueur ≤ 0,125. À chaque étape, choisis la moitié, puis écris son milieu.
  [tap, suivre l'erreur]  m_1
    = 1,5   ← m₁ = (1 + 2)/2
  — Étape 2  [juge value]  départ : m_2
    ? f(1,5) = 0,375 : quelle moitié gardes-tu ? ✔ Garder [1 ; 1,5] / · Garder [1,5 ; 2] / · Arrêter
    = 1,25   ← Milieu de la moitié gardée
  — Étape 3  [juge value]  départ : m_3
    ? f(1,25) ≈ −2,0469 : quelle moitié gardes-tu ? · Garder [1 ; 1,25] / ✔ Garder [1,25 ; 1,5] / · Arrêter
    = 1,375   ← Milieu de la moitié gardée
  — Fin  [juge value]  départ : c
    ? f(1,375) ≈ −0,9004 : quelle moitié gardes-tu ? · Garder [1,25 ; 1,375] / ✔ Garder [1,375 ; 1,5] / · Arrêter
    ? La moitié gardée mesure 0,125. Continuer ou arrêter ? ✔ Arrêter : son milieu approche la racine à 0,0625 près / · Continuer
    = 1,4375   ← Milieu de [1,375 ; 1,5]
  aides : Garde la moitié où f change de signe : compare le signe de f(m) à ceux de f(a) et f(b). | m₂ est le milieu de la moitié gardée : (a + b)/2 = ▢. | m₁ = 1,5, m₂ = 1,25, m₃ = 1,375, puis c ≈ 1,4375.

Bissection pour f(x) = x³ + 6x − 2 sur [0 ; 1] : f(0) = −2 < 0, f(1) = 5 > 0. Précision voulue : un intervalle de longueur ≤ 0,125. À chaque étape, choisis la moitié, puis écris son milieu.
  [tap, suivre l'erreur]  m_1
    = 0,5   ← m₁ = (0 + 1)/2
  — Étape 2  [juge value]  départ : m_2
    ? f(0,5) = 1,125 : quelle moitié gardes-tu ? ✔ Garder [0 ; 0,5] / · Garder [0,5 ; 1] / · Arrêter
    = 0,25   ← Milieu de la moitié gardée
  — Étape 3  [juge value]  départ : m_3
    ? f(0,25) ≈ −0,4844 : quelle moitié gardes-tu ? · Garder [0 ; 0,25] / ✔ Garder [0,25 ; 0,5] / · Arrêter
    = 0,375   ← Milieu de la moitié gardée
  — Fin  [juge value]  départ : c
    ? f(0,375) ≈ 0,3027 : quelle moitié gardes-tu ? ✔ Garder [0,25 ; 0,375] / · Garder [0,375 ; 0,5] / · Arrêter
    ? La moitié gardée mesure 0,125. Continuer ou arrêter ? ✔ Arrêter : son milieu approche la racine à 0,0625 près / · Continuer
    = 0,3125   ← Milieu de [0,25 ; 0,375]
  aides : Garde la moitié où f change de signe : compare le signe de f(m) à ceux de f(a) et f(b). | m₂ est le milieu de la moitié gardée : (a + b)/2 = ▢. | m₁ = 0,5, m₂ = 0,25, m₃ = 0,375, puis c ≈ 0,3125.

```

### Niveau 4

```
Bissection pour f(x) = x³ + x² + 6x − 2 sur [0 ; 1] : f(0) = −2 < 0 et f(1) = 6 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        0  1  (0,5)  (1,375)
    2        (0)  (0,5)  (0,25)  (-0,4219)
    3        (0,25)  (0,5)  (0,375)  (0,4434)
    4        (0,25)  (0,375)  (0,3125)  (0,0032)
  puis : Après n étapes, l'erreur est au plus (b − a)/2ⁿ = 1/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻³ ? n =
      → 10   pièges attendus : 3 [a1_bisection_count]
      pièges : a1_bisection_count
  pièges : a1_bisection_count

Bissection pour f(x) = x³ + 4x − 7 sur [1 ; 2] : f(1) = −2 < 0 et f(2) = 9 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  (1,5)  (2,375)
    2        (1)  (1,5)  (1,25)  (-0,0469)
    3        (1,25)  (1,5)  (1,375)  (1,0996)
    4        (1,25)  (1,375)  (1,3125)  (0,511)
  puis : Après n étapes, l'erreur est au plus (b − a)/2ⁿ = 1/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻⁴ ? n =
      → 14   pièges attendus : 4 [a1_bisection_count]
      pièges : a1_bisection_count
  pièges : a1_bisection_count

Bissection pour f(x) = x³ + 2x − 2 sur [0 ; 1] : f(0) = −2 < 0 et f(1) = 1 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        0  1  (0,5)  (-0,875)
    2        (0,5)  (1)  (0,75)  (-0,0781)
    3        (0,75)  (1)  (0,875)  (0,4199)
    4        (0,75)  (0,875)  (0,8125)  (0,1614)
  puis : Après n étapes, l'erreur est au plus (b − a)/2ⁿ = 1/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻² ? n =
      → 7   pièges attendus : 2 [a1_bisection_count]
      pièges : a1_bisection_count
  pièges : a1_bisection_count

```

### Niveau 5

```
Bissection pour f(x) = x³ + x − 3 sur [1 ; 2] : f(1) = −1 < 0 et f(2) = 7 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  (1,5)  (1,875)
    2        (1)  (1,5)  (1,25)  (0,2031)
    3        (1)  (1,25)  (1,125)  (-0,4512)
  puis : Pour approcher la racine par xₙ₊₁ = g(xₙ), quelle fonction g est contractante sur [1 ; 2] (g([1 ; 2]) ⊂ [1 ; 2] et |g′| < 1) ?
      ✔ g(x) = root(3,3−x)   · g(x) = 3/(x² + 1)   · g(x) = 3 − x³

Bissection pour f(x) = x³ + x − 4 sur [1 ; 2] : f(1) = −2 < 0 et f(2) = 6 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  (1,5)  (0,875)
    2        (1)  (1,5)  (1,25)  (-0,7969)
    3        (1,25)  (1,5)  (1,375)  (-0,0254)
  puis : Pour approcher la racine par xₙ₊₁ = g(xₙ), quelle fonction g est contractante sur [1 ; 2] (g([1 ; 2]) ⊂ [1 ; 2] et |g′| < 1) ?
      ✔ g(x) = root(3,4−x)   · g(x) = 4 − x³   · g(x) = 4/(x² + 1)

Bissection pour f(x) = x³ + 4x − 9 sur [1 ; 2] : f(1) = −4 < 0 et f(2) = 7 > 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.
  [tableau bisection]  colonnes : a | b | m = (a + b)/2 | f(m)
    1        1  2  (1,5)  (0,375)
    2        (1)  (1,5)  (1,25)  (-2,0469)
    3        (1,25)  (1,5)  (1,375)  (-0,9004)
  puis : Pour approcher la racine par xₙ₊₁ = g(xₙ), quelle fonction g est contractante sur [1 ; 2] (g([1 ; 2]) ⊂ [1 ; 2] et |g′| < 1) ?
      · g(x) = (9 − x³)/4   · g(x) = root(3,9−4x)   ✔ g(x) = 9/(x² + 4)

```

### Variantes d'examen

```
On applique la bissection sur [1 ; 5]. Après n étapes, l'erreur est au plus (b − a)/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻⁴ ?
  · n = 4 [a1_bisection_count]   ✔ n = 16   · n = 15   · n = 17
  [examen mcq]
  pièges : a1_bisection_count

Vrai ou faux ?
  « Après n étapes de bissection sur [0 ; 4], le zéro est à moins de 4/2ⁿ du milieu du dernier intervalle. » → VRAI
  [examen tf]

```

## Rayon de convergence et domaine, bornes comprises (`a1-pow-domain`, BA1)

_ρ par d'Alembert, R = 1/ρ, puis chaque borne à part._

### Niveau 1

```
Domaine de convergence de Σ_{n=1}^{∞} 2^n/n·(x − 2)^n. On donne ρ = lim |aₙ₊₁/aₙ| = 2.
  [guided]  R
    = □   (trous : 1/2)   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x − 2| < 1/2
    = □ < x < □   (trous : 3/2 < x < 5/2)   ← x₀ − R < x < x₀ + R
    = ]3/2 ; 5/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = 3/2 et x = 5/2, puis le domaine D :  [juge solset]  départ : D
    (En x = 5/2 : Σ 1/n diverge. En x = 3/2 : Σ (−1)^n/n converge (Leibniz), pas absolument.)
    = [□ ; 5/2[   (trous : [3/2 ; 5/2[)   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 2 ± R | ρ = 2, R = 1/2 ; domaine [3/2 ; 5/2[.

Domaine de convergence de Σ_{n=1}^{∞} (−3)^n/2^n·(x − 1)^n. On donne ρ = lim |aₙ₊₁/aₙ| = 3/2.
  [guided]  R
    = □   (trous : 2/3)   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x − 1| < 2/3
    = □ < x < □   (trous : 1/3 < x < 5/3)   ← x₀ − R < x < x₀ + R
    = ]1/3 ; 5/3[   ← Intervalle ouvert de convergence absolue
  — Bornes x = 1/3 et x = 5/3, puis le domaine D :  [juge solset]  départ : D
    (En x = 5/3 : Σ (−1)^n diverge. En x = 1/3 : Σ 1 diverge.)
    = ]□ ; 5/3[   (trous : ]1/3 ; 5/3[)   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 1 ± R | ρ = 3/2, R = 2/3 ; domaine ]1/3 ; 5/3[.

Domaine de convergence de Σ_{n=1}^{∞} 2^n/n·(x + 2)^n. On donne ρ = lim |aₙ₊₁/aₙ| = 2.
  [guided]  R
    = □   (trous : 1/2)   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 2| < 1/2
    = □ < x < □   (trous : −5/2 < x < −3/2)   ← x₀ − R < x < x₀ + R
    = ]−5/2 ; −3/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −5/2 et x = −3/2, puis le domaine D :  [juge solset]  départ : D
    (En x = −3/2 : Σ 1/n diverge. En x = −5/2 : Σ (−1)^n/n converge (Leibniz), pas absolument.)
    = [□ ; −3/2[   (trous : [−5/2 ; −3/2[)   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −2 ± R | ρ = 2, R = 1/2 ; domaine [−5/2 ; −3/2[.

```

### Niveau 2

```
Domaine de convergence de Σ_{n=1}^{∞} 2^n/√n·(x + 3)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [guided]  |2^(n + 1)/√(n + 1)·√n/2^n|
    = 2√(n/(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : 2√(n/(n + 1))
    = 2   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 1/2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 3| < 1/2
    = −7/2 < x < −5/2   ← x₀ − R < x < x₀ + R
    = ]−7/2 ; −5/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −7/2 et x = −5/2, puis le domaine D :  [juge solset]  départ : D
    ? En x = −5/2, la série devient Σ 1/√n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −7/2, la série devient Σ (−1)^n/√n. Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −7/2 ? → Leibniz : série alternée, |uₙ| décroît vers 0
    = [−7/2 ; −5/2[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −3 ± R | ρ = 2, R = 1/2 ; domaine [−7/2 ; −5/2[.
  pièges : g2_exp_sum, a1_power_bounds_forgotten

Domaine de convergence de Σ_{n=1}^{∞} 2^n/(√n·3^n)·x^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [guided]  |2^(n + 1)/(√(n + 1)·3^(n + 1))·(√n·3^n)/2^n|
    = (2/3)√(n/(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : (2/3)√(n/(n + 1))
    = 2/3   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 3/2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x| < 3/2
    = −3/2 < x < 3/2   ← x₀ − R < x < x₀ + R
    = ]−3/2 ; 3/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −3/2 et x = 3/2, puis le domaine D :  [juge solset]  départ : D
    ? En x = 3/2, la série devient Σ 1/√n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −3/2, la série devient Σ (−1)^n/√n. Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −3/2 ? → Leibniz : série alternée, |uₙ| décroît vers 0
    = [−3/2 ; 3/2[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 0 ± R | ρ = 2/3, R = 3/2 ; domaine [−3/2 ; 3/2[.
  pièges : g2_exp_sum, a1_power_bounds_forgotten

Domaine de convergence de Σ_{n=1}^{∞} (−2)^n/(√n·3^n)·(x − 1)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [guided]  |(−2)^(n + 1)/(√(n + 1)·3^(n + 1))·(√n·3^n)/(−2)^n|
    = (2/3)√(n/(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : (2/3)√(n/(n + 1))
    = 2/3   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 3/2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x − 1| < 3/2
    = −1/2 < x < 5/2   ← x₀ − R < x < x₀ + R
    = ]−1/2 ; 5/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −1/2 et x = 5/2, puis le domaine D :  [juge solset]  départ : D
    ? En x = 5/2, la série devient Σ (−1)^n/√n. Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? En x = −1/2, la série devient Σ 1/√n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère pour la borne x = −1/2 ? → Riemann : Σ 1/nᵅ converge ⇔ α > 1
    = ]−1/2 ; 5/2]   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 1 ± R | ρ = 2/3, R = 3/2 ; domaine ]−1/2 ; 5/2].
  pièges : g2_exp_sum, a1_power_bounds_forgotten

```

### Niveau 3

```
Domaine de convergence de Σ_{n=1}^{∞} 3^n/(√n·2^(n + 1))·(x + 2)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [tap, suivre l'erreur, menu steps]  |3^(n + 1)/(√(n + 1)·2^(n + 2))·(√n·2^(n + 1))/3^n|
    = (3/2)√(n/(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : (3/2)√(n/(n + 1))
    = 3/2   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 2/3   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 2| < 2/3
    = −8/3 < x < −4/3   ← x₀ − R < x < x₀ + R
    = ]−8/3 ; −4/3[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −8/3 et x = −4/3, puis le domaine D :  [juge solset]  départ : D
    ? En x = −4/3, la série devient Σ 1/(2√n). Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −8/3, la série devient Σ (−1)^n/(2√n). Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −8/3 ? → Leibniz : série alternée, |uₙ| décroît vers 0
    = [−8/3 ; −4/3[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −2 ± R | ρ = 3/2, R = 2/3 ; domaine [−8/3 ; −4/3[.
  pièges : g2_exp_sum, a1_power_bounds_forgotten

Domaine de convergence de Σ_{n=1}^{∞} 3^n·(x + 3)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [tap, suivre l'erreur, menu steps]  |3^(n + 1)·1/3^n|
    = 3   ← Simplifier le quotient
  — Rayon de convergence :  [juge value]  départ : R
    = 1/3   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 3| < 1/3
    = −10/3 < x < −8/3   ← x₀ − R < x < x₀ + R
    = ]−10/3 ; −8/3[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −10/3 et x = −8/3, puis le domaine D :  [juge solset]  départ : D
    ? En x = −8/3, la série devient Σ 1. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −10/3, la série devient Σ (−1)^n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère pour la borne x = −10/3 ? → Condition nécessaire : uₙ ne tend pas vers 0
    = ]−10/3 ; −8/3[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −3 ± R | ρ = 3, R = 1/3 ; domaine ]−10/3 ; −8/3[.
  pièges : g2_exp_sum

Domaine de convergence de Σ_{n=1}^{∞} 3^n/(n²·2^n)·x^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [tap, suivre l'erreur, menu steps]  |3^(n + 1)/((n + 1)²·2^(n + 1))·(n²·2^n)/3^n|
    = 3n²/(2(n + 1)²)   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : 3n²/(2(n + 1)²)
    = 3/2   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 2/3   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x| < 2/3
    = −2/3 < x < 2/3   ← x₀ − R < x < x₀ + R
    = ]−2/3 ; 2/3[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −2/3 et x = 2/3, puis le domaine D :  [juge solset]  départ : D
    ? En x = 2/3, la série devient Σ 1/n². Nature ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? En x = −2/3, la série devient Σ (−1)^n/n². Nature ? ✔ converge absolument / · converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −2/3 ? → Riemann : Σ 1/nᵅ converge ⇔ α > 1
    = [−2/3 ; 2/3]   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 0 ± R | ρ = 3/2, R = 2/3 ; domaine [−2/3 ; 2/3].
  pièges : g2_exp_sum, a1_power_bounds_forgotten

```

### Niveau 4

```
Domaine de convergence de Σ_{n=1}^{∞} 3^n/2^n·x^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [free, suivre l'erreur]  |3^(n + 1)/2^(n + 1)·2^n/3^n|
    = 3/2   ← Simplifier le quotient
  — Rayon de convergence :  [juge value]  départ : R
    = 2/3   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x| < 2/3
    = −2/3 < x < 2/3   ← x₀ − R < x < x₀ + R
    = ]−2/3 ; 2/3[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −2/3 et x = 2/3, puis le domaine D :  [juge solset]  départ : D
    ? En x = 2/3, la série devient Σ 1. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −2/3, la série devient Σ (−1)^n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? Quel critère pour la borne x = −2/3 ? → Condition nécessaire : uₙ ne tend pas vers 0
    = ]−2/3 ; 2/3[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes 0 ± R | ρ = 3/2, R = 2/3 ; domaine ]−2/3 ; 2/3[.
  pièges : g2_exp_sum

Domaine de convergence de Σ_{n=1}^{∞} 1/(n·2^n)·(x + 1)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [free, suivre l'erreur]  |1/((n + 1)·2^(n + 1))·(n·2^n)|
    = n/(2(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : n/(2(n + 1))
    = 1/2   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 1| < 2
    = −3 < x < 1   ← x₀ − R < x < x₀ + R
    = ]−3 ; 1[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −3 et x = 1, puis le domaine D :  [juge solset]  départ : D
    ? En x = 1, la série devient Σ 1/n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −3, la série devient Σ (−1)^n/n. Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −3 ? → Leibniz : série alternée, |uₙ| décroît vers 0
    = [−3 ; 1[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −1 ± R | ρ = 1/2, R = 2 ; domaine [−3 ; 1[.
  pièges : g2_exp_sum, a1_power_bounds_forgotten

Domaine de convergence de Σ_{n=1}^{∞} 1/(n·2^(n + 1))·(x + 1)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [free, suivre l'erreur]  |1/((n + 1)·2^(n + 2))·(n·2^(n + 1))|
    = n/(2(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : n/(2(n + 1))
    = 1/2   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 1| < 2
    = −3 < x < 1   ← x₀ − R < x < x₀ + R
    = ]−3 ; 1[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −3 et x = 1, puis le domaine D :  [juge solset]  départ : D
    ? En x = 1, la série devient Σ 1/(2n). Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    ? En x = −3, la série devient Σ (−1)^n/(2n). Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? Quel critère pour la borne x = −3 ? → Leibniz : série alternée, |uₙ| décroît vers 0
    = [−3 ; 1[   ← Domaine de convergence
  aides : R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R. | R = ▢ ; bornes −1 ± R | ρ = 1/2, R = 2 ; domaine [−3 ; 1[.
  pièges : g2_exp_sum, a1_power_bounds_forgotten

```

### Niveau 5

```
Le domaine de convergence de Σ_{n=1}^{∞} (−3)^n·(x − 2)^n est :
  ✔ ]5/3 ; 7/3[   · ]−7/3 ; −5/3[ [a1_power_center_sign]   · [5/3 ; 7/3] [a1_power_bounds_forgotten]   · ]−1 ; 5[ [a1_power_radius_inverse]
  pièges : a1_power_bounds_forgotten, a1_power_radius_inverse, a1_power_center_sign

Domaine de convergence de Σ_{n=1}^{∞} (−2)^n/(n·3^n)·(x + 2)^n. Calcule ρ = lim |aₙ₊₁/aₙ| (d'Alembert), R, puis étudie les deux bornes.
  [free, sans aide]  |(−2)^(n + 1)/((n + 1)·3^(n + 1))·(n·3^n)/(−2)^n|
    = 2n/(3(n + 1))   ← Simplifier le quotient
  — Limite du quotient :  [juge limit]  départ : 2n/(3(n + 1))
    = 2/3   ← ρ = lim |aₙ₊₁/aₙ|
  — Rayon de convergence :  [juge value]  départ : R
    = 3/2   ← R = 1/ρ
  — Convergence absolue :  [juge solset]  départ : |x + 2| < 3/2
    = −7/2 < x < −1/2   ← x₀ − R < x < x₀ + R
    = ]−7/2 ; −1/2[   ← Intervalle ouvert de convergence absolue
  — Bornes x = −7/2 et x = −1/2, puis le domaine D :  [juge solset]  départ : D
    ? En x = −1/2, la série devient Σ (−1)^n/n. Nature ? · converge absolument / ✔ converge, pas absolument / · diverge
    ? En x = −7/2, la série devient Σ 1/n. Nature ? · converge absolument / · converge, pas absolument / ✔ diverge
    = ]−7/2 ; −1/2]   ← Domaine de convergence
  pièges : g2_exp_sum, a1_power_bounds_forgotten

Le domaine de convergence de Σ_{n=1}^{∞} (−2)^n/3^(n + 1)·(x − 1)^n est :
  · [−1/2 ; 5/2] [a1_power_bounds_forgotten]   · ]−5/2 ; 1/2[ [a1_power_center_sign]   · ]1/3 ; 5/3[ [a1_power_radius_inverse]   ✔ ]−1/2 ; 5/2[
  pièges : a1_power_bounds_forgotten, a1_power_radius_inverse, a1_power_center_sign

```

### Variantes d'examen

```
Le domaine de convergence de Σ_{n=1}^{∞} 3^n·(x − 1)^n est :
  · ]−4/3 ; −2/3[ [a1_power_center_sign]   · ]−2 ; 4[ [a1_power_radius_inverse]   ✔ ]2/3 ; 4/3[   · [2/3 ; 4/3] [a1_power_bounds_forgotten]
  [examen mcq]
  pièges : a1_power_bounds_forgotten, a1_power_radius_inverse, a1_power_center_sign

Vrai ou faux ?
  « Si Σ aₙ(x + 2)ⁿ converge en x = −1,5, alors elle converge en x = −2,3. » → VRAI
  [examen tf]

```

## Dériver une série entière ; sommes par MacLaurin (`a1-pow-sums`, BA1)

_Reconnaître eˣ, 1/(1 − x) en un point ; changer d'indice._

### Niveau 1

```
Calcule Σ_{k=2}^{∞} (2^k + 2k)/k!. Référence : Σ_{k≥0} xᵏ/k! = eˣ.
  [guided]  Σ_{k=2}^{∞} (2^k + 2k)/k!
    = Σ_{k=2}^{∞} 2^k/k! + 2Σ_{k=2}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e² − □ + 2Σ_{k=2}^{∞} k/k!   (trous : e² − 3 + 2Σ_{k=2}^{∞} k/k!)   ← Σ 2ᵏ/k! = e² sans les termes k = 0 et k = 1
    = e² − 3 + 2Σ_{k=2}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e² − 3 + 2Σ_{j=1}^{∞} 1/□   (trous : e² − 3 + 2Σ_{j=1}^{∞} 1/j!)   ← Changer d'indice : j = k − 1
    = e² + 2e − 5   ← Σ_{j≥1} 1/j! = e − 1
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 2ᵏ/k! = e² − ▢ | e² + 2e − 5
  pièges : a1_pow_sum_index_shift

Pour |x| < 1, écris f(x) = Σ_{n=1}^{∞} n·x^n sans Σ (dérive terme à terme Σ xⁿ), puis calcule Σ_{n≥1} n·(2/3)ⁿ. Référence : Σ_{n≥0} xⁿ = 1/(1 − x), dérivable terme à terme pour |x| < 1.
  [guided]  f(x)
    = x·Σ_{n=1}^{∞} n·x^(□)   (trous : x·Σ_{n=1}^{∞} n·x^(n − 1))   ← Mettre x en facteur
    = x·(1/(1 − x))′   ← Σ n·xⁿ⁻¹ est la dérivée terme à terme de Σ xⁿ
    = x/(1 − x)²   ← Dériver
  — Évaluer en x = 2/3 :  [juge definite]  départ : (2/3)/(1 − (2/3))²
    = 6   ← Calculer
  aides : Reconnais la série de référence : Σ_{n≥0} xⁿ = 1/(1 − x), dérivable terme à terme pour |x| < 1. | Σ n·xⁿ = x·Σ n·xⁿ⁻¹ = x·(1/(1 − x))′ = ▢ | 6

Calcule Σ_{k=1}^{∞} (3^k + k)/k!. Référence : Σ_{k≥0} xᵏ/k! = eˣ.
  [guided]  Σ_{k=1}^{∞} (3^k + k)/k!
    = Σ_{k=1}^{∞} 3^k/k! + Σ_{k=1}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e³ − □ + Σ_{k=1}^{∞} k/k!   (trous : e³ − 1 + Σ_{k=1}^{∞} k/k!)   ← Σ 3ᵏ/k! = e³ sans le terme k = 0
    = e³ − 1 + Σ_{k=1}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e³ − 1 + Σ_{j=0}^{∞} 1/□   (trous : e³ − 1 + Σ_{j=0}^{∞} 1/j!)   ← Changer d'indice : j = k − 1
    = e³ + e − 1   ← Σ_{j≥0} 1/j! = e
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 3ᵏ/k! = e³ − ▢ | e³ + e − 1
  pièges : a1_pow_sum_index_shift

```

### Niveau 2

```
Calcule Σ_{k=2}^{∞} (3^k + k)/k!. Référence : Σ_{k≥0} xᵏ/k! = eˣ.
  [guided]  Σ_{k=2}^{∞} (3^k + k)/k!
    = Σ_{k=2}^{∞} 3^k/k! + Σ_{k=2}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e³ − 4 + Σ_{k=2}^{∞} k/k!   ← Σ 3ᵏ/k! = e³ sans les termes k = 0 et k = 1
    = e³ − 4 + Σ_{k=2}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e³ − 4 + Σ_{j=1}^{∞} 1/□   (trous : e³ − 4 + Σ_{j=1}^{∞} 1/j!)   ← Changer d'indice : j = k − 1
    = e³ + e − 5   ← Σ_{j≥1} 1/j! = e − 1
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 3ᵏ/k! = e³ − ▢ | e³ + e − 5
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=2}^{∞} (3^k + 3k)/k!. Référence : Σ_{k≥0} xᵏ/k! = eˣ.
  [guided]  Σ_{k=2}^{∞} (3^k + 3k)/k!
    = Σ_{k=2}^{∞} 3^k/k! + 3Σ_{k=2}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e³ − 4 + 3Σ_{k=2}^{∞} k/k!   ← Σ 3ᵏ/k! = e³ sans les termes k = 0 et k = 1
    = e³ − 4 + 3Σ_{k=2}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e³ − 4 + 3Σ_{j=1}^{∞} 1/□   (trous : e³ − 4 + 3Σ_{j=1}^{∞} 1/j!)   ← Changer d'indice : j = k − 1
    = e³ + 3e − 7   ← Σ_{j≥1} 1/j! = e − 1
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 3ᵏ/k! = e³ − ▢ | e³ + 3e − 7
  pièges : a1_pow_sum_index_shift

Pour |x| < 1, écris f(x) = Σ_{n=1}^{∞} n·x^n sans Σ (dérive terme à terme Σ xⁿ), puis calcule Σ_{n≥1} n·(1/2)ⁿ. Référence : Σ_{n≥0} xⁿ = 1/(1 − x), dérivable terme à terme pour |x| < 1.
  [guided]  f(x)
    = x·Σ_{n=1}^{∞} n·x^(n − 1)   ← Mettre x en facteur
    = x·(1/(1 − x))′   ← Σ n·xⁿ⁻¹ est la dérivée terme à terme de Σ xⁿ
    = x/(1 − x)²   ← Dériver
  — Évaluer en x = 1/2 :  [juge definite]  départ : (1/2)/(1 − (1/2))²
    = 2   ← Calculer
  aides : Reconnais la série de référence : Σ_{n≥0} xⁿ = 1/(1 − x), dérivable terme à terme pour |x| < 1. | Σ n·xⁿ = x·Σ n·xⁿ⁻¹ = x·(1/(1 − x))′ = ▢ | 2

```

### Niveau 3

```
Calcule Σ_{k=2}^{∞} (2^k + 3k)/k!.
  [tap, suivre l'erreur, menu steps]  Σ_{k=2}^{∞} (2^k + 3k)/k!
    = Σ_{k=2}^{∞} 2^k/k! + 3Σ_{k=2}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e² − 3 + 3Σ_{k=2}^{∞} k/k!   ← Σ 2ᵏ/k! = e² sans les termes k = 0 et k = 1
    = e² − 3 + 3Σ_{k=2}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e² − 3 + 3Σ_{j=1}^{∞} 1/j!   ← Changer d'indice : j = k − 1
    = e² + 3e − 6   ← Σ_{j≥1} 1/j! = e − 1
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 2ᵏ/k! = e² − ▢ | e² + 3e − 6
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=3}^{∞} (−1)^k·2^k/k!.
  [tap, suivre l'erreur, menu steps]  Σ_{k=3}^{∞} (−1)^k·2^k/k!
    = e^(−2) − Σ_{k=0}^{2} (−1)^k·2^k/k!   ← Σ_{k≥0} (−2)ᵏ/k! = e^(−2), moins les premiers termes
    = e^(−2) − 1   ← Les termes retirés : 1 − 2 + 2
  aides : Reconnais la série de référence : Σ_{k≥0} xᵏ/k! = eˣ, en x = −2. | Σ_{k=3}^{∞} (−1)^k·2^k/k! = e^−2 − Σ_{k=0}^{2} ▢ | e^−2 − 1
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=3}^{∞} (−1)^k/k!.
  [tap, suivre l'erreur, menu steps]  Σ_{k=3}^{∞} (−1)^k/k!
    = e^(−1) − Σ_{k=0}^{2} (−1)^k/k!   ← Σ_{k≥0} (−1)ᵏ/k! = e^(−1), moins les premiers termes
    = e^(−1) − 1/2   ← Les termes retirés : 1 − 1 + 1/2
  aides : Reconnais la série de référence : Σ_{k≥0} xᵏ/k! = eˣ, en x = −1. | Σ_{k=3}^{∞} (−1)^k/k! = e^−1 − Σ_{k=0}^{2} ▢ | e^−1 − 1/2
  pièges : a1_pow_sum_index_shift

```

### Niveau 4

```
Calcule Σ_{k=1}^{∞} (2^k + k)/k!.
  [free, suivre l'erreur]  Σ_{k=1}^{∞} (2^k + k)/k!
    = Σ_{k=1}^{∞} 2^k/k! + Σ_{k=1}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e² − 1 + Σ_{k=1}^{∞} k/k!   ← Σ 2ᵏ/k! = e² sans le terme k = 0
    = e² − 1 + Σ_{k=1}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e² − 1 + Σ_{j=0}^{∞} 1/j!   ← Changer d'indice : j = k − 1
    = e² + e − 1   ← Σ_{j≥0} 1/j! = e
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 2ᵏ/k! = e² − ▢ | e² + e − 1
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=1}^{∞} (3^k + k)/k!.
  [free, suivre l'erreur]  Σ_{k=1}^{∞} (3^k + k)/k!
    = Σ_{k=1}^{∞} 3^k/k! + Σ_{k=1}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e³ − 1 + Σ_{k=1}^{∞} k/k!   ← Σ 3ᵏ/k! = e³ sans le terme k = 0
    = e³ − 1 + Σ_{k=1}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e³ − 1 + Σ_{j=0}^{∞} 1/j!   ← Changer d'indice : j = k − 1
    = e³ + e − 1   ← Σ_{j≥0} 1/j! = e
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 3ᵏ/k! = e³ − ▢ | e³ + e − 1
  pièges : a1_pow_sum_index_shift

Calcule Σ_{k=2}^{∞} (2^k − k)/k!.
  [free, suivre l'erreur]  Σ_{k=2}^{∞} (2^k − k)/k!
    = Σ_{k=2}^{∞} 2^k/k! − Σ_{k=2}^{∞} k/k!   ← Séparer : deux séries convergentes
    = e² − 3 − Σ_{k=2}^{∞} k/k!   ← Σ 2ᵏ/k! = e² sans les termes k = 0 et k = 1
    = e² − 3 − Σ_{k=2}^{∞} 1/(k − 1)!   ← k/k! = 1/(k − 1)!
    = e² − 3 − Σ_{j=1}^{∞} 1/j!   ← Changer d'indice : j = k − 1
    = e² − e − 2   ← Σ_{j≥1} 1/j! = e − 1
  aides : Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. | k/k! = 1/(k − 1)! ; puis Σ 2ᵏ/k! = e² − ▢ | e² − e − 2
  pièges : a1_pow_sum_index_shift

```

### Niveau 5

```
Σ_{k=1}^{∞} (2^k + 2k)/(k − 1)! =
  · 2e² + 2e   · 2e² + 2e − 2   ✔ 2e² + 4e   · e² + 4e

Σ_{k=1}^{∞} (2^k − 2k)/(k − 1)! =
  · 2e² − 2e + 2   · e² − 4e   ✔ 2e² − 4e   · 2e² − 2e

Σ_{k=2}^{∞} (3^k + 2k)/(k − 1)! =
  ✔ 3e³ + 4e − 5   · 3e³ + 4e − 2 [a1_pow_sum_index_shift]   · 3e³ + 4e − 3 [a1_pow_sum_index_shift]   · e³ + 4e − 3
  pièges : a1_pow_sum_index_shift

```

### Variantes d'examen

```
Σ_{k=2}^{∞} (3^k + 2k)/(k − 1)! =
  ✔ 3e³ + 4e − 5   · 3e³ + 4e − 2 [a1_pow_sum_index_shift]   · 3e³ + 4e − 3 [a1_pow_sum_index_shift]   · e³ + 4e − 3
  [examen mcq]
  pièges : a1_pow_sum_index_shift

Vrai ou faux ?
  « La série de Taylor de f(x) = 4/(4 + 3x) en x₀ = 2 converge sur ]−14/3 ; 26/3[. » → FAUX
    contre-exemple (refute) : x = -4/3
  [examen tf]
  pièges : a1_power_bounds_forgotten

```

## Simplifier un nombre complexe et l'élever à une puissance (`a1-cplx-exam`, BA1)

_Réduire iᵏ modulo 4, conjugué, forme polaire avec r > 0, Moivre._

### Niveau 1

```
Soit z = (−2i⁸ − 2i⁴¹)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z⁹.
  [guided]  (−2i⁸ − 2i⁴¹)/(1 − i)
    = (−□ − □)/(1 − i)   (trous : (−2 − 2i)/(1 − i))   ← Réduire iᵏ modulo 4
    = (−2 − 2i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = −2i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −2i
    = □e^□   (trous : 2e^(−iπ/2))   ← r = 2, φ = −π/2
  — Calcule z⁹ et écris-le sous la forme a + bi :  [juge complex]  départ : (−2i)⁹
    = (2e^(−iπ/2))⁹   ← Forme polaire
    = □e^(−9iπ/2)   (trous : 512e^(−9iπ/2))   ← Moivre : rᵐ et m·φ
    = 512e^(−iπ/2)   ← Argument dans ]−π ; π]
    = −512i   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −2i = 2·e^(i·▢), puis z⁹ = 512·e^(i·▢). | z = −2i = 2e^(−iπ/2), donc z⁹ = 512e^(−9iπ/2) = −512i.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

Soit z = (−i⁶⁹ − i⁷²)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z⁷.
  [guided]  (−i⁶⁹ − i⁷²)/(1 − i)
    = (−□ − □)/(1 − i)   (trous : (−i − 1)/(1 − i))   ← Réduire iᵏ modulo 4
    = (−1 − i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = −i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −i
    = e^□   (trous : e^(−iπ/2))   ← r = 1, φ = −π/2
  — Calcule z⁷ et écris-le sous la forme a + bi :  [juge complex]  départ : (−i)⁷
    = (e^(−iπ/2))⁷   ← Forme polaire
    = e^□   (trous : e^(−7iπ/2))   ← Moivre : rᵐ et m·φ
    = e^(iπ/2)   ← Argument dans ]−π ; π]
    = i   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −i = e^(i·▢), puis z⁷ = e^(i·▢). | z = −i = e^(−iπ/2), donc z⁷ = e^(−7iπ/2) = i.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

Soit z = (−i⁵³ − i⁸⁴)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z⁹.
  [guided]  (−i⁵³ − i⁸⁴)/(1 − i)
    = (−□ − □)/(1 − i)   (trous : (−i − 1)/(1 − i))   ← Réduire iᵏ modulo 4
    = (−1 − i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = −i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −i
    = e^□   (trous : e^(−iπ/2))   ← r = 1, φ = −π/2
  — Calcule z⁹ et écris-le sous la forme a + bi :  [juge complex]  départ : (−i)⁹
    = (e^(−iπ/2))⁹   ← Forme polaire
    = e^□   (trous : e^(−9iπ/2))   ← Moivre : rᵐ et m·φ
    = e^(−iπ/2)   ← Argument dans ]−π ; π]
    = −i   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −i = e^(i·▢), puis z⁹ = e^(i·▢). | z = −i = e^(−iπ/2), donc z⁹ = e^(−9iπ/2) = −i.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

```

### Niveau 2

```
Soit z = (−2i⁷⁰ − 2i¹⁹)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z¹².
  [guided]  (−2i⁷⁰ − 2i¹⁹)/(1 − i)
    = □/(1 − i)   (trous : (2 + 2i)/(1 − i))   ← Réduire iᵏ modulo 4
    = (2 + 2i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = □   (trous : 2i)   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : 2i
    ? Module et argument de z = <math alttext="2i"><mrow><mn>2</mn><mo>&#x2062;</mo><mi>i</mi></mrow></math> : ✔ r = 2, φ = π/2 / · r = −2, φ = −π/2
    = □e^□   (trous : 2e^(iπ/2))   ← r = 2, φ = π/2
  — Calcule z¹² et écris-le sous la forme a + bi :  [juge complex]  départ : (2i)¹²
    ? Pour calculer z^12 : ✔ Forme polaire, puis Moivre / ✔ Développer (2i)¹² avec le binôme / · Élever 0 et 2i à la puissance 12 séparément
    = (2e^(iπ/2))¹²   ← Forme polaire
    = □e^□   (trous : 4096e^(6iπ))   ← Moivre : rᵐ et m·φ
    = 4096   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = 2i = 2·e^(i·▢), puis z¹² = 4096·e^(i·▢). | z = 2i = 2e^(iπ/2), donc z¹² = 4096e^(6iπ) = 4096.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise, a1_polar_r_negative

Soit z = (−i⁵¹ + 5i⁹⁷)/(1 + i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z⁴.
  [guided]  (−i⁵¹ + 5i⁹⁷)/(1 + i)
    = □/(1 + i)   (trous : (i + 5i)/(1 + i))   ← Réduire iᵏ modulo 4
    = 6i(1 − i)/2   ← Multiplier haut et bas par 1 − i
    = □ + □   (trous : 3 + 3i)   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : 3 + 3i
    ? Module et argument de z = <math alttext="3 + 3i"><mrow><mn>3</mn><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>i</mi></mrow></mrow></math> : · r = −3√2, φ = −3π/4 / ✔ r = 3√2, φ = π/4
    = □e^□   (trous : 3√2e^(iπ/4))   ← r = 3√2, φ = π/4
  — Calcule z⁴ et écris-le sous la forme a + bi :  [juge complex]  départ : (3 + 3i)⁴
    ? Pour calculer z^4 : ✔ Forme polaire, puis Moivre / ✔ Développer (3+3i)⁴ avec le binôme / · Élever 3 et 3i à la puissance 4 séparément
    = (3√2e^(iπ/4))⁴   ← Forme polaire
    = □e^□   (trous : 324e^(iπ))   ← Moivre : rᵐ et m·φ
    = −324   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = 3 + 3i = 3√2·e^(i·▢), puis z⁴ = 324·e^(i·▢). | z = 3 + 3i = 3√2e^(iπ/4), donc z⁴ = 324e^(iπ) = −324.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise, a1_polar_r_negative

Soit z = (i³⁷ − i²⁸)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z⁴.
  [guided]  (i³⁷ − i²⁸)/(1 − i)
    = □/(1 − i)   (trous : (i − 1)/(1 − i))   ← Réduire iᵏ modulo 4
    = (−1 + i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = □   (trous : −1)   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −1
    ? Module et argument de z = <math alttext="−1"><mrow><mo>−</mo><mn>1</mn></mrow></math> : · r = −1, φ = 0 / ✔ r = 1, φ = π
    = e^□   (trous : e^(iπ))   ← r = 1, φ = π
  — Calcule z⁴ et écris-le sous la forme a + bi :  [juge complex]  départ : (−1)⁴
    ? Pour calculer z^4 : ✔ Forme polaire, puis Moivre / ✔ Développer (−1)⁴ avec le binôme / · Élever −1 et 0 à la puissance 4 séparément
    = (e^(iπ))⁴   ← Forme polaire
    = e^□   (trous : e^(4iπ))   ← Moivre : rᵐ et m·φ
    = 1   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −1 = e^(i·▢), puis z⁴ = e^(i·▢). | z = −1 = e^(iπ), donc z⁴ = e^(4iπ) = 1.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise, a1_polar_r_negative

```

### Niveau 3

```
Soit w = √3 − i. Écris w sous forme polaire, puis calcule la partie réelle de w⁴.
  [tap, suivre l'erreur, menu steps]  √3 − i
    = 2e^(−iπ/6)   ← r = 2, φ = −π/6
  — Calcule Re(w⁴) :  [juge complex]  départ : Re((√3 − i)⁴)
    = Re((2e^(−iπ/6))⁴)   ← Forme polaire
    = Re(16e^(−2iπ/3))   ← Moivre
    = 16cos(−2π/3)   ← Re(r·e^(iθ)) = r·cos θ
    = −8   ← Valeur exacte
  aides : Passe en forme polaire : |w| = 2. Puis Moivre, et Re(r·e^(iθ)) = r·cos θ. | w = 2·e^(i·▢), donc w⁴ = 16·e^(i·▢). | Re(16e^(−2iπ/3)) = 16cos(−2π/3) = −8.

Soit z = (−2i¹⁶ − 2i⁹⁹)/(1 + i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z¹².
  [tap, suivre l'erreur, menu steps]  (−2i¹⁶ − 2i⁹⁹)/(1 + i)
    = (−2 + 2i)/(1 + i)   ← Réduire iᵏ modulo 4
    = (−2 + 2i)(1 − i)/2   ← Multiplier haut et bas par 1 − i
    = 2i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : 2i
    = 2e^(iπ/2)   ← r = 2, φ = π/2
  — Calcule z¹² et écris-le sous la forme a + bi :  [juge complex]  départ : (2i)¹²
    = (2e^(iπ/2))¹²   ← Forme polaire
    = 4096e^(6iπ)   ← Moivre : rᵐ et m·φ
    = 4096   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = 2i = 2·e^(i·▢), puis z¹² = 4096·e^(i·▢). | z = 2i = 2e^(iπ/2), donc z¹² = 4096e^(6iπ) = 4096.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

Soit z = (2i⁹⁸ + 2i³¹)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z¹¹.
  [tap, suivre l'erreur, menu steps]  (2i⁹⁸ + 2i³¹)/(1 − i)
    = (−2 − 2i)/(1 − i)   ← Réduire iᵏ modulo 4
    = (−2 − 2i)(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = −2i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −2i
    = 2e^(−iπ/2)   ← r = 2, φ = −π/2
  — Calcule z¹¹ et écris-le sous la forme a + bi :  [juge complex]  départ : (−2i)¹¹
    = (2e^(−iπ/2))¹¹   ← Forme polaire
    = 2048e^(−11iπ/2)   ← Moivre : rᵐ et m·φ
    = 2048e^(iπ/2)   ← Argument dans ]−π ; π]
    = 2048i   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −2i = 2·e^(i·▢), puis z¹¹ = 2048·e^(i·▢). | z = −2i = 2e^(−iπ/2), donc z¹¹ = 2048e^(−11iπ/2) = 2048i.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

```

### Niveau 4

```
Soit w = √3 − i. Écris w sous forme polaire, puis calcule la partie réelle de w⁸.
  [free, suivre l'erreur]  √3 − i
    = 2e^(−iπ/6)   ← r = 2, φ = −π/6
  — Calcule Re(w⁸) :  [juge complex]  départ : Re((√3 − i)⁸)
    = Re((2e^(−iπ/6))⁸)   ← Forme polaire
    = Re(256e^(−4iπ/3))   ← Moivre
    = 256cos(−4π/3)   ← Re(r·e^(iθ)) = r·cos θ
    = −128   ← Valeur exacte
  aides : Passe en forme polaire : |w| = 2. Puis Moivre, et Re(r·e^(iθ)) = r·cos θ. | w = 2·e^(i·▢), donc w⁸ = 256·e^(i·▢). | Re(256e^(−4iπ/3)) = 256cos(−4π/3) = −128.

Soit z = (2i⁴² + 4i²⁸)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z¹⁰.
  [free, suivre l'erreur]  (2i⁴² + 4i²⁸)/(1 − i)
    = (−2 + 4)/(1 − i)   ← Réduire iᵏ modulo 4
    = 2(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = 1 + i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : 1 + i
    = √2e^(iπ/4)   ← r = √2, φ = π/4
  — Calcule z¹⁰ et écris-le sous la forme a + bi :  [juge complex]  départ : (1 + i)¹⁰
    = (√2e^(iπ/4))¹⁰   ← Forme polaire
    = 32e^(5iπ/2)   ← Moivre : rᵐ et m·φ
    = 32e^(iπ/2)   ← Argument dans ]−π ; π]
    = 32i   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = 1 + i = √2·e^(i·▢), puis z¹⁰ = 32·e^(i·▢). | z = 1 + i = √2e^(iπ/4), donc z¹⁰ = 32e^(5iπ/2) = 32i.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

Soit z = (3i³⁹ + 5i⁴¹)/(1 − i). Écris z sous la forme a + bi, puis sous forme polaire, et calcule z¹².
  [free, suivre l'erreur]  (3i³⁹ + 5i⁴¹)/(1 − i)
    = (−3i + 5i)/(1 − i)   ← Réduire iᵏ modulo 4
    = 2i(1 + i)/2   ← Multiplier haut et bas par 1 + i
    = −1 + i   ← Forme algébrique
  — Forme polaire de z (r > 0, φ dans ]−π ; π]) :  [juge complex]  départ : −1 + i
    = √2e^(3iπ/4)   ← r = √2, φ = 3π/4
  — Calcule z¹² et écris-le sous la forme a + bi :  [juge complex]  départ : (−1 + i)¹²
    = (√2e^(3iπ/4))¹²   ← Forme polaire
    = 64e^(9iπ)   ← Moivre : rᵐ et m·φ
    = 64e^(iπ)   ← Argument dans ]−π ; π]
    = −64   ← Forme algébrique
  aides : Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0. | z = −1 + i = √2·e^(i·▢), puis z¹² = 64·e^(i·▢). | z = −1 + i = √2e^(3iπ/4), donc z¹² = 64e^(9iπ) = −64.
  pièges : a1_cplx_ik_mod, g8_i_squared, g8_div_componentwise

```

### Niveau 5

```
Soit w = √3 + i. Quelle affirmation est vraie ?
  · w⁸ est imaginaire pur   ✔ w⁶ ∈ ℝ   · Im(w⁶) < 0   · |w⁷| > 9³

Soit z = (4i⁷ + 6i²⁹)/(1 + i). Alors z⁷ =
  · −8 + 8i [a1_polar_r_negative]   · 625000 − 625000i [a1_cplx_ik_mod]   ✔ 8 − 8i   · 8 + 8i
  pièges : a1_cplx_ik_mod, a1_polar_r_negative

Soit w = √3 − i. Écris w sous forme polaire, puis calcule la partie réelle de w³.
  [free, sans aide]  √3 − i
    = 2e^(−iπ/6)   ← r = 2, φ = −π/6
  — Calcule Re(w³) :  [juge complex]  départ : Re((√3 − i)³)
    = Re((2e^(−iπ/6))³)   ← Forme polaire
    = Re(8e^(−iπ/2))   ← Moivre
    = 8cos(−π/2)   ← Re(r·e^(iθ)) = r·cos θ
    = 0   ← Valeur exacte

```

### Variantes d'examen

```
Soit z = (5i¹⁸ + i⁷⁰)/(1 − i). Alors z⁵ =
  ✔ 972 + 972i   · −972 + 972i   · −972 − 972i [a1_cplx_ik_mod]   · 972 − 972i
  [examen mcq]
  pièges : a1_cplx_ik_mod

Vrai ou faux ?
  « Pour tout réel y ≠ 0, l'équation z⁴ = iy a exactement 4 solutions distinctes. » → VRAI
  [examen tf]

```

## Équations zⁿ = z̄, zⁿ = 1/z̄, zⁿ = |z|, sans oublier r = 0 (`a1-cplx-zn-conj`, BA1)

_Poser z = r·e^(iφ), traiter r = 0 avant de diviser, compter les solutions._

### Niveau 1

```
Résous dans ℂ l'équation z² = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  conj(re^(iφ))
    = re^□   (trous : re^(−iφ))   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r² = r
    (Cas r = 0 : z = 0 est solution. Cas r > 0 : on peut diviser par r.)
    = r = 0 ou r = □   (trous : r = 0 ou r = 1)   ← Cas r = 0, puis r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 2φ = −φ + 2kπ
    = □φ = 2kπ   (trous : 3φ = 2kπ)   ← Regrouper
    = φ = 2kπ/3   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z³ = 1
    = {0 ; 1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 4   ← 1 + 3 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = 2kπ/3 ; avec z = 0, cela fait 4 solutions.
  pièges : a1_conj_arg_sign

Résous dans ℂ l'équation z⁷ = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  conj(re^(iφ))
    = re^□   (trous : re^(−iφ))   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r⁷ = r
    (Cas r = 0 : z = 0 est solution. Cas r > 0 : on peut diviser par r.)
    = r = 0 ou r⁶ = 1   ← Cas r = 0, puis r > 0
    = r = 0 ou r = □   (trous : r = 0 ou r = 1)   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 7φ = −φ + 2kπ
    = □φ = 2kπ   (trous : 8φ = 2kπ)   ← Regrouper
    = φ = kπ/4   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁸ = 1
    = {0 ; 1 ; √2/2 + i√2/2 ; i ; −√2/2 + i√2/2 ; −1 ; −√2/2 − i√2/2 ; −i ; √2/2 − i√2/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 9   ← 1 + 8 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r⁶ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = kπ/4 ; avec z = 0, cela fait 9 solutions.
  pièges : a1_conj_arg_sign

Résous dans ℂ l'équation z⁷ = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  conj(re^(iφ))
    = re^□   (trous : re^(−iφ))   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r⁷ = r
    (Cas r = 0 : z = 0 est solution. Cas r > 0 : on peut diviser par r.)
    = r = 0 ou r⁶ = 1   ← Cas r = 0, puis r > 0
    = r = 0 ou r = □   (trous : r = 0 ou r = 1)   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 7φ = −φ + 2kπ
    = □φ = 2kπ   (trous : 8φ = 2kπ)   ← Regrouper
    = φ = kπ/4   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁸ = 1
    = {0 ; 1 ; √2/2 + i√2/2 ; i ; −√2/2 + i√2/2 ; −1 ; −√2/2 − i√2/2 ; −i ; √2/2 − i√2/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 9   ← 1 + 8 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r⁶ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = kπ/4 ; avec z = 0, cela fait 9 solutions.
  pièges : a1_conj_arg_sign

```

### Niveau 2

```
Résous dans ℂ l'équation z⁷ = 1/z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 1/z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  1/conj(re^(iφ))
    = (1/r)e^(iφ)   ← 1/z̄ = 1/(r·e^(−iφ))
  — Modules : r > 0.  [juge solset]  départ : r⁷ = 1/r
    ? Et r = 0 ? · z = 0 est solution / ✔ z = 0 est exclu : 1/z̄ n'existe pas
    = r⁸ = 1   ← Multiplier par r > 0
    = r = 1   ← r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 7φ = φ + 2kπ
    = 6φ = 2kπ   ← Regrouper
    = φ = □   (trous : φ = kπ/3)   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z⁶ = 1
    = {1 ; 1/2 + i√3/2 ; −1/2 + i√3/2 ; −1 ; −1/2 − i√3/2 ; 1/2 − i√3/2}   ← Les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 6   ← 6 solutions
  aides : Pose z = r·e^(iφ). Ici z = 0 est exclu, donc r > 0. | r > 0 : r⁸ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = kπ/3 : 6 solutions.
  pièges : a1_conj_arg_sign

Résous dans ℂ l'équation z³ = 4z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 4z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  4conj(re^(iφ))
    = 4re^(−iφ)   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r³ = 4r
    ? <math alttext="r³ = 4r"><mrow><msup><mrow><mi>r</mi></mrow><mn>3</mn></msup><mo>=</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>r</mi></mrow></mrow></math> : avant de diviser par r, ✔ je regarde d'abord r = 0 : z = 0 est solution / · je divise par r : r³ ÷ r
    = r = 0 ou r² = 4   ← Cas r = 0, puis r > 0
    = r = 0 ou r = 2   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 3φ = −φ + 2kπ
    = 4φ = 2kπ   ← Regrouper
    = φ = □   (trous : φ = kπ/2)   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁴ = 16
    = {0 ; 2 ; 2i ; −2 ; −2i}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 5   ← 1 + 4 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r² = 4 et e^(i·▢·φ) = 1. | r = 2 et φ = kπ/2 ; avec z = 0, cela fait 5 solutions.
  pièges : a1_conj_arg_sign, a1_zn_conj_r0

Résous dans ℂ l'équation z⁴ = 27z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 27z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [guided]  27conj(re^(iφ))
    = 27re^(−iφ)   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r⁴ = 27r
    ? <math alttext="r⁴ = 27r"><mrow><msup><mrow><mi>r</mi></mrow><mn>4</mn></msup><mo>=</mo><mrow><mn>27</mn><mo>&#x2062;</mo><mi>r</mi></mrow></mrow></math> : avant de diviser par r, ✔ je regarde d'abord r = 0 : z = 0 est solution / · je divise par r : r⁴ ÷ r
    = r = 0 ou r³ = 27   ← Cas r = 0, puis r > 0
    = r = 0 ou r = 3   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 4φ = −φ + 2kπ
    = 5φ = 2kπ   ← Regrouper
    = φ = □   (trous : φ = 2kπ/5)   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁵ = 243
    = {0 ; 3 ; 3e^(2iπ/5) ; 3e^(4iπ/5) ; 3e^(−4iπ/5) ; 3e^(−2iπ/5)}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 6   ← 1 + 5 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r³ = 27 et e^(i·▢·φ) = 1. | r = 3 et φ = 2kπ/5 ; avec z = 0, cela fait 6 solutions.
  pièges : a1_conj_arg_sign, a1_zn_conj_r0

```

### Niveau 3

```
Résous dans ℂ l'équation z⁷ = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [tap, suivre l'erreur, menu steps]  conj(re^(iφ))
    = re^(−iφ)   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r⁷ = r
    ? <math alttext="r⁷ = r"><mrow><msup><mrow><mi>r</mi></mrow><mn>7</mn></msup><mo>=</mo><mi>r</mi></mrow></math> : avant de diviser par r, · je divise par r : r⁷ ÷ r / ✔ je regarde d'abord r = 0 : z = 0 est solution
    = r = 0 ou r⁶ = 1   ← Cas r = 0, puis r > 0
    = r = 0 ou r = 1   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 7φ = −φ + 2kπ
    = 8φ = 2kπ   ← Regrouper
    = φ = kπ/4   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁸ = 1
    = {0 ; 1 ; √2/2 + i√2/2 ; i ; −√2/2 + i√2/2 ; −1 ; −√2/2 − i√2/2 ; −i ; √2/2 − i√2/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 9   ← 1 + 8 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r⁶ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = kπ/4 ; avec z = 0, cela fait 9 solutions.
  pièges : a1_conj_arg_sign, a1_zn_conj_r0

Résous dans ℂ l'équation z⁶ = 1/z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 1/z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [tap, suivre l'erreur, menu steps]  1/conj(re^(iφ))
    = (1/r)e^(iφ)   ← 1/z̄ = 1/(r·e^(−iφ))
  — Modules : r > 0.  [juge solset]  départ : r⁶ = 1/r
    ? Et r = 0 ? ✔ z = 0 est exclu : 1/z̄ n'existe pas / · z = 0 est solution
    = r⁷ = 1   ← Multiplier par r > 0
    = r = 1   ← r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 6φ = φ + 2kπ
    = 5φ = 2kπ   ← Regrouper
    = φ = 2kπ/5   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z⁵ = 1
    = {1 ; e^(2iπ/5) ; e^(4iπ/5) ; e^(−4iπ/5) ; e^(−2iπ/5)}   ← Les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 5   ← 5 solutions
  aides : Pose z = r·e^(iφ). Ici z = 0 est exclu, donc r > 0. | r > 0 : r⁷ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = 2kπ/5 : 5 solutions.
  pièges : a1_conj_arg_sign

Résous dans ℂ l'équation z⁵ = |z|. Pose z = r·e^(iφ) (r ≥ 0) : écris |z| en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [tap, suivre l'erreur, menu steps]  |re^(iφ)|
    = r   ← |z| = r
  — Modules : r ≥ 0.  [juge solset]  départ : r⁵ = r
    ? <math alttext="r⁵ = r"><mrow><msup><mrow><mi>r</mi></mrow><mn>5</mn></msup><mo>=</mo><mi>r</mi></mrow></math> : avant de diviser par r, ✔ je regarde d'abord r = 0 : z = 0 est solution / · je divise par r : r⁵ ÷ r
    = r = 0 ou r⁴ = 1   ← Cas r = 0, puis r > 0
    = r = 0 ou r = 1   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 5φ = 2kπ
    = φ = 2kπ/5   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁵ = 1
    = {0 ; 1 ; e^(2iπ/5) ; e^(4iπ/5) ; e^(−4iπ/5) ; e^(−2iπ/5)}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 6   ← 1 + 5 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r⁴ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = 2kπ/5 ; avec z = 0, cela fait 6 solutions.
  pièges : a1_zn_conj_r0

```

### Niveau 4

```
Résous dans ℂ l'équation z⁵ = 1/z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 1/z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [free, suivre l'erreur]  1/conj(re^(iφ))
    = (1/r)e^(iφ)   ← 1/z̄ = 1/(r·e^(−iφ))
  — Modules : r > 0.  [juge solset]  départ : r⁵ = 1/r
    ? Et r = 0 ? ✔ z = 0 est exclu : 1/z̄ n'existe pas / · z = 0 est solution
    = r⁶ = 1   ← Multiplier par r > 0
    = r = 1   ← r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 5φ = φ + 2kπ
    = 4φ = 2kπ   ← Regrouper
    = φ = kπ/2   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z⁴ = 1
    = {1 ; i ; −1 ; −i}   ← Les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 4   ← 4 solutions
  aides : Pose z = r·e^(iφ). Ici z = 0 est exclu, donc r > 0. | r > 0 : r⁶ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = kπ/2 : 4 solutions.
  pièges : a1_conj_arg_sign

Résous dans ℂ l'équation z² = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [free, suivre l'erreur]  conj(re^(iφ))
    = re^(−iφ)   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r² = r
    ? <math alttext="r² = r"><mrow><msup><mrow><mi>r</mi></mrow><mn>2</mn></msup><mo>=</mo><mi>r</mi></mrow></math> : avant de diviser par r, · je divise par r : r² ÷ r / ✔ je regarde d'abord r = 0 : z = 0 est solution
    = r = 0 ou r = 1   ← Cas r = 0, puis r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 2φ = −φ + 2kπ
    = 3φ = 2kπ   ← Regrouper
    = φ = 2kπ/3   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z³ = 1
    = {0 ; 1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 4   ← 1 + 3 solutions
  aides : Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche. | r > 0 : r = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = 2kπ/3 ; avec z = 0, cela fait 4 solutions.
  pièges : a1_conj_arg_sign, a1_zn_conj_r0

Résous dans ℂ l'équation z⁶ = 1/z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris 1/z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [free, suivre l'erreur]  1/conj(re^(iφ))
    = (1/r)e^(iφ)   ← 1/z̄ = 1/(r·e^(−iφ))
  — Modules : r > 0.  [juge solset]  départ : r⁶ = 1/r
    ? Et r = 0 ? · z = 0 est solution / ✔ z = 0 est exclu : 1/z̄ n'existe pas
    = r⁷ = 1   ← Multiplier par r > 0
    = r = 1   ← r > 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 6φ = φ + 2kπ
    = 5φ = 2kπ   ← Regrouper
    = φ = 2kπ/5   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z⁵ = 1
    = {1 ; e^(2iπ/5) ; e^(4iπ/5) ; e^(−4iπ/5) ; e^(−2iπ/5)}   ← Les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 5   ← 5 solutions
  aides : Pose z = r·e^(iφ). Ici z = 0 est exclu, donc r > 0. | r > 0 : r⁷ = 1 et e^(i·▢·φ) = 1. | r = 1 et φ = 2kπ/5 : 5 solutions.
  pièges : a1_conj_arg_sign

```

### Niveau 5

```
Résous dans ℂ l'équation z⁷ = z̄. Pose z = r·e^(iφ) (r ≥ 0) : écris z̄ en r et φ, résous en r, puis en φ, liste les solutions et compte-les.
  [free, sans aide]  conj(re^(iφ))
    = re^(−iφ)   ← Le conjugué change le signe de φ
  — Modules : r ≥ 0.  [juge solset]  départ : r⁷ = r
    ? <math alttext="r⁷ = r"><mrow><msup><mrow><mi>r</mi></mrow><mn>7</mn></msup><mo>=</mo><mi>r</mi></mrow></math> : avant de diviser par r, ✔ je regarde d'abord r = 0 : z = 0 est solution / · je divise par r : r⁷ ÷ r
    = r = 0 ou r⁶ = 1   ← Cas r = 0, puis r > 0
    = r = 0 ou r = 1   ← r ≥ 0
  — Arguments (cas r > 0), à 2kπ près :  [juge solset]  départ : 7φ = −φ + 2kπ
    = 8φ = 2kπ   ← Regrouper
    = φ = kπ/4   ← Isoler φ
  — L'ensemble des solutions :  [juge complex]  départ : z = 0 ou z⁸ = 1
    = {0 ; 1 ; √2/2 + i√2/2 ; i ; −√2/2 + i√2/2 ; −1 ; −√2/2 − i√2/2 ; −i ; √2/2 − i√2/2}   ← z = 0, et les racines
  — Nombre de solutions distinctes :  [juge value]  départ : N
    = 9   ← 1 + 8 solutions
  pièges : a1_conj_arg_sign, a1_zn_conj_r0

Dans ℂ, l'équation z⁷ = |z| a :
  · 7 solutions distinctes [a1_zn_conj_polynomial_count]   · 9 solutions distinctes   · 14 solutions distinctes   ✔ 8 solutions distinctes
  pièges : a1_zn_conj_polynomial_count

Soit A = {z ∈ ℂ : z²(|z| − 4) = 0} et B = {z ∈ ℂ : Re z = 2}. Alors A ∩ B =
  · {2 + 2i√3}   · ∅   · {0 ; 2 + 2i√3 ; 2 − 2i√3}   ✔ {2 + 2i√3 ; 2 − 2i√3}

```

### Variantes d'examen

```
Dans ℂ, l'équation z⁴ = 1/z̄ a :
  · 4 solutions distinctes [a1_zn_conj_polynomial_count]   ✔ 3 solutions distinctes   · 5 solutions distinctes   · 8 solutions distinctes
  [examen mcq]
  pièges : a1_zn_conj_polynomial_count

Vrai ou faux ?
  « Pour tout n ≥ 1, les solutions de zⁿ = |z| sont exactement les racines n-ièmes de 1. » → FAUX
    contre-exemple (refute) : n = 2
  [examen tf]
  pièges : a1_zn_conj_r0

```

## Définitions à écrire : Sup, continuité, dérivabilité, série convergente, suite de Cauchy (`a1-defs`, BA1)

_Les conditions du cours, dans le bon ordre, sans condition en trop._

### Niveau 1

```
Construis la définition de « f ∈ C¹(I) » : le début est placé, touche le bloc qui manque. Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :
  [blocs define]
    1. et la fonction f′ : I → ℝ est continue sur I.
    ✗ et f est continue sur I. [a1_c1_def_missing_cont]
    ✗ et f′ est bornée sur I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de « la série Σ aₙ converge absolument » : le début est placé, touche le bloc qui manque. Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :
  [blocs define]
    1. converge.
    ✗ la série Σ aₙ [a1_abs_conv_confused]
    ✗ la suite (|aₙ|) [a1_series_term_to_zero]
  pièges : a1_abs_conv_confused, a1_series_term_to_zero

Construis la définition de « ∫ₐ^(+∞) f(x) dx converge » : le début est placé, touche le bloc qui manque. Soit f : [a ; +∞[ → ℝ continue. On dit que l'intégrale ∫ₐ^(+∞) f(x) dx converge si :
  [blocs define]
    1. existe et est finie.
    ✗ f(x) → 0 quand x → +∞. [a1_improper_lim_zero_converges]
    ✗ f est bornée sur [a ; +∞[. [a1_improper_lim_zero_converges]
  pièges : a1_improper_lim_zero_converges

```

### Niveau 2

```
Construis la définition de « s = Sup A » : touche les blocs dans l'ordre. Soit A ⊂ ℝ non vide et s ∈ ℝ. On dit que s = Sup A si :
  [blocs define]
    1. s est un majorant de A : x ≤ s pour tout x ∈ A ;
    2. pour tout ε > 0, il existe x ∈ A tel que x > s − ε.
    ✗ s ∈ A. [a1_sup_in_set]
    ✗ il existe x ∈ A tel que x > s − 1/10. [g9_proof_by_example]
  pièges : a1_sup_in_set, g9_proof_by_example

Construis la définition de « la série Σ aₙ converge absolument » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :
  [blocs define]
    1. la série Σ |aₙ|
    2. converge.
    ✗ la suite (|aₙ|) [a1_series_term_to_zero]
    ✗ la série Σ aₙ [a1_abs_conv_confused]
  pièges : a1_series_term_to_zero, a1_abs_conv_confused

Construis la définition de « (aₙ) est une suite de Cauchy » : le début est placé, touche les blocs qui manquent. Soit (aₙ) une suite réelle. On dit que (aₙ) est une suite de Cauchy si :
  [blocs define]
    1. pour tous m, n ≥ N,
    2. on a |aₘ − aₙ| ≤ ε.
    ✗ on a |aₙ₊₁ − aₙ| ≤ ε. [a1_cauchy_consecutive]
    ✗ la suite aₙ₊₁ − aₙ tend vers 0. [a1_cauchy_consecutive]
  pièges : a1_cauchy_consecutive

```

### Niveau 3

```
Construis la définition de « la série Σ aₙ converge absolument » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :
  [blocs define]
    1. la série Σ |aₙ|
    2. converge.
    ✗ la suite (|aₙ|) [a1_series_term_to_zero]
    ✗ la série Σ aₙ [a1_abs_conv_confused]
  pièges : a1_series_term_to_zero, a1_abs_conv_confused

Construis la définition de « (aₙ) est une suite de Cauchy » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle. On dit que (aₙ) est une suite de Cauchy si :
  [blocs define]
    1. pour tout ε > 0,
    2. il existe N ∈ ℕ tel que,
    3. pour tous m, n ≥ N,
    4. on a |aₘ − aₙ| ≤ ε.
    ✗ on a |aₙ₊₁ − aₙ| ≤ ε. [a1_cauchy_consecutive]
    ✗ la suite aₙ₊₁ − aₙ tend vers 0. [a1_cauchy_consecutive]
  pièges : a1_cauchy_consecutive

Construis la définition de « f ∈ C¹(I) » : touche les blocs dans l'ordre. Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :
  [blocs define]
    1. f est dérivable en tout point de I,
    2. et la fonction f′ : I → ℝ est continue sur I.
    ✗ et f est continue sur I. [a1_c1_def_missing_cont]
    ✗ et f′ est bornée sur I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

```

### Niveau 4

```
Construis la définition de « f ∈ C¹(I) » : touche les blocs dans l'ordre. Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :
  [blocs define]
    1. f est dérivable en tout point de I,
    2. et la fonction f′ : I → ℝ est continue sur I.
    ✗ et f′ est bornée sur I. [a1_c1_def_missing_cont]
    ✗ et f est continue sur I. [a1_c1_def_missing_cont]
  pièges : a1_c1_def_missing_cont

Construis la définition de « f est dérivable en x₀ » : touche les blocs dans l'ordre. Soit I un intervalle ouvert, f : I → ℝ et x₀ ∈ I. On dit que f est dérivable en x₀ si :
  [blocs define]
    1. la limite lim_{h→0} (f(x₀ + h) − f(x₀))/h
    2. existe et est finie ; on la note f′(x₀).
    ✗ f est continue en x₀. [a1_corner_missed]
    ✗ la limite lim_{x→x₀} f′(x) existe. [a1_derivable_from_formula]
  pièges : a1_corner_missed, a1_derivable_from_formula

Construis la définition de « la série Σ aₙ converge » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle et sₙ = a₀ + a₁ + … + aₙ. On dit que la série Σ aₙ converge si :
  [blocs define]
    1. la suite des sommes partielles (sₙ)
    2. converge vers un réel S ; on note S = Σ aₙ.
    ✗ la suite (aₙ) tend vers 0. [a1_series_term_to_zero]
    ✗ la suite (aₙ) converge. [a1_series_term_to_zero]
    ✗ la suite (sₙ) est bornée. [a1_bounded_implies_convergent]
  pièges : a1_series_term_to_zero, a1_bounded_implies_convergent

```

### Niveau 5

```
Donne la définition précise de chacune de ces trois notions.
  [problème, 4 points]
  partie 1 (Définition : (aₙ) est une suite de Cauchy : 2)
  Écris avec des quantificateurs la définition de « (aₙ) est une suite de Cauchy ». Soit (aₙ) une suite réelle. On dit que (aₙ) est une suite de Cauchy si :
    [jetons, sans aide] palette : N ∈ ℕ · ε > 0 · n ≥ N · |a_m − a_n| ≤ ε · |a_(n+1) − a_n| ≤ ε · m, n ≥ N
      → ∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε
  partie 2 (Définition : f admet un DL(n) en x₀ : 1)
  Construis la définition de « f admet un DL(n) en x₀ » : touche les blocs dans l'ordre. Soit f définie autour de x₀ et n ∈ ℕ. On dit que f admet un développement limité d'ordre n en x₀ si :
    [blocs define, sans aide]
      1. il existe des réels a₀, a₁, …, aₙ et une fonction ε(x) → 0 quand x → x₀
      2. tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ + (x − x₀)ⁿ·ε(x).
      ✗ tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ + (x − x₀)ⁿ⁻¹·ε(x). [a1_dl_remainder_wrong_order]
      ✗ tels que f(x) = a₀ + a₁(x − x₀) + … + aₙ(x − x₀)ⁿ. [a1_dl_remainder_wrong_order]
  partie 3 (Définition : f ∈ C¹(I) : 1)
  Construis la définition de « f ∈ C¹(I) » : touche les blocs dans l'ordre. Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :
    [blocs define, sans aide]
      1. f est dérivable en tout point de I,
      2. et la fonction f′ : I → ℝ est continue sur I.
      ✗ et f′ est bornée sur I. [a1_c1_def_missing_cont]
      ✗ et f est continue sur I. [a1_c1_def_missing_cont]
  pièges : g9_quant_order, a1_cauchy_consecutive, a1_dl_remainder_wrong_order, a1_c1_def_missing_cont

Donne la définition précise de chacune de ces trois notions.
  [problème, 4 points]
  partie 1 (Définition : ∫ₐ^(+∞) f(x) dx converge : 1)
  Construis la définition de « ∫ₐ^(+∞) f(x) dx converge » : touche les blocs dans l'ordre. Soit f : [a ; +∞[ → ℝ continue. On dit que l'intégrale ∫ₐ^(+∞) f(x) dx converge si :
    [blocs define, sans aide]
      1. la limite lim_{b→+∞} ∫ₐᵇ f(x) dx
      2. existe et est finie.
      ✗ f est bornée sur [a ; +∞[. [a1_improper_lim_zero_converges]
      ✗ f(x) → 0 quand x → +∞. [a1_improper_lim_zero_converges]
  partie 2 (Définition : (aₙ) est une suite de Cauchy : 2)
  Écris avec des quantificateurs la définition de « (aₙ) est une suite de Cauchy ». Soit (aₙ) une suite réelle. On dit que (aₙ) est une suite de Cauchy si :
    [jetons, sans aide] palette : |a_(n+1) − a_n| ≤ ε · n ≥ N · N ∈ ℕ · |a_m − a_n| ≤ ε · ε > 0 · m, n ≥ N
      → ∀ε > 0 ∃N ∈ ℕ ∀m, n ≥ N, |a_m − a_n| ≤ ε
  partie 3 (Définition : la série Σ aₙ converge absolument : 1)
  Construis la définition de « la série Σ aₙ converge absolument » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :
    [blocs define, sans aide]
      1. la série Σ |aₙ|
      2. converge.
      ✗ la série Σ aₙ [a1_abs_conv_confused]
      ✗ la suite (|aₙ|) [a1_series_term_to_zero]
  pièges : a1_improper_lim_zero_converges, g9_quant_order, a1_cauchy_consecutive, a1_abs_conv_confused, a1_series_term_to_zero

Donne la définition précise de chacune de ces trois notions.
  [problème, 4 points]
  partie 1 (Définition : la série Σ aₙ converge : 1)
  Construis la définition de « la série Σ aₙ converge » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle et sₙ = a₀ + a₁ + … + aₙ. On dit que la série Σ aₙ converge si :
    [blocs define, sans aide]
      1. la suite des sommes partielles (sₙ)
      2. converge vers un réel S ; on note S = Σ aₙ.
      ✗ la suite (aₙ) converge. [a1_series_term_to_zero]
      ✗ la suite (aₙ) tend vers 0. [a1_series_term_to_zero]
      ✗ la suite (sₙ) est bornée. [a1_bounded_implies_convergent]
  partie 2 (Définition : f est continue en x₀ : 2)
  Construis la définition de « f est continue en x₀ » : touche les blocs dans l'ordre. Soit f : D → ℝ et x₀ ∈ D. On dit que f est continue en x₀ si :
    [blocs define, sans aide]
      1. pour tout ε > 0,
      2. il existe δ > 0 tel que,
      3. pour tout x ∈ D avec |x − x₀| ≤ δ,
      4. on a |f(x) − f(x₀)| ≤ ε.
      ✗ pour tout x ∈ D avec |x − x₀| ≤ ε, [a1_epsdelta_swapped]
      ✗ on a |f(x) − f(x₀)| ≤ δ. [a1_epsdelta_swapped]
      ✗ il existe δ > 0 tel que, pour tout ε > 0, [g9_quant_order]
  partie 3 (Définition : f ∈ C¹(I) : 1)
  Construis la définition de « f ∈ C¹(I) » : touche les blocs dans l'ordre. Soit I un intervalle ouvert et f : I → ℝ. On dit que f ∈ C¹(I) si :
    [blocs define, sans aide]
      1. f est dérivable en tout point de I,
      2. et la fonction f′ : I → ℝ est continue sur I.
      ✗ et f′ est bornée sur I. [a1_c1_def_missing_cont]
      ✗ et f est continue sur I. [a1_c1_def_missing_cont]
  pièges : a1_series_term_to_zero, a1_bounded_implies_convergent, a1_epsdelta_swapped, g9_quant_order, a1_c1_def_missing_cont

```

### Variantes d'examen

```
Donne la définition précise de : « la série Σ aₙ converge absolument ».
  [problème, examen open, 1 points]
  partie 1 (Définition : la série Σ aₙ converge absolument : 1)
  Construis la définition de « la série Σ aₙ converge absolument » : touche les blocs dans l'ordre. Soit (aₙ) une suite réelle. On dit que la série Σ aₙ converge absolument si :
    [blocs define, sans aide]
      1. la série Σ |aₙ|
      2. converge.
      ✗ la suite (|aₙ|) [a1_series_term_to_zero]
      ✗ la série Σ aₙ [a1_abs_conv_confused]
  pièges : a1_series_term_to_zero, a1_abs_conv_confused

Vrai ou faux ?
  « Si f est dérivable en x₀, alors f est continue en x₀. » → VRAI
  [examen tf]

```

## Preuves courtes d'examen : énoncer le théorème, vérifier ses hypothèses (`a1-proofs`, BA1)

_Traduire l'hypothèse, citer le théorème, vérifier chaque hypothèse, conclure._

### Niveau 1

```
Soit Σ aₙ une série absolument convergente. Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument. Le début de la preuve est placé : touche les blocs qui suivent.
  [blocs order]
    1. Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.
    2. Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.
    ✗ Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1. [g9_quant_order]
    ✗ Avec aₙ = 1/n², la série converge : c'est vrai. [g9_proof_by_example]
  pièges : g9_quant_order, g9_proof_by_example

Soit Σ aₙ une série absolument convergente. Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument. Le début de la preuve est placé : touche les blocs qui suivent.
  [blocs order]
    1. Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.
    2. Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.
    ✗ aₙe^(aₙ) ≤ e·aₙ, donc la série converge. [a1_compare_wrong_direction]
    ✗ Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1. [g9_quant_order]
  pièges : a1_compare_wrong_direction, g9_quant_order

Soit Σ aₙ une série absolument convergente. Montrer que a₂ₙ + a₂ₙ₊₁ + … + a₃ₙ → 0 quand n → ∞. Le début de la preuve est placé : touche les blocs qui suivent.
  [blocs order]
    1. 0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.
    2. Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.
    ✗ Avec aₖ = 1/k², a₂ₙ + … + a₃ₙ ≤ (n + 1)/(4n²) → 0 : c'est vrai. [g9_proof_by_example]
    ✗ Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0. [a1_sum_n_terms_as_one]
  pièges : g9_proof_by_example, a1_sum_n_terms_as_one

```

### Niveau 2

```
Soit f : [0 ; 1] → ℝ continue, dérivable sur ]0 ; 1[, avec f(0) = 2 et f′(x) ≤ −3 pour tout x ∈ ]0 ; 1[. Montrer que f s'annule sur ]0 ; 1[. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. f est continue sur [0 ; 1] et dérivable sur ]0 ; 1[ : les hypothèses du théorème des accroissements finis sont vérifiées.
    2. TAF : il existe ξ ∈ ]0 ; 1[ tel que f(1) − f(0) = f′(ξ)·(1 − 0).
    3. Comme f′(ξ) ≤ −3 : f(1) = 2 + 1·f′(ξ) ≤ 2 − 3 = −1 < 0.
    4. TVI : si g est continue sur [α ; β] et si g(α) et g(β) sont de signes opposés, alors g s'annule sur ]α ; β[.
    5. Ici f est continue sur [0 ; 1], f(0) = 2 > 0 et f(1) < 0 : les hypothèses du TVI sont vérifiées.
    6. Donc il existe x₀ ∈ ]0 ; 1[ tel que f(x₀) = 0.

Soit (bₙ) une suite convergente. Montrer que la série Σ bₙ/n³ converge. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. (bₙ) converge, donc elle est bornée : il existe M > 0 tel que |bₙ| ≤ M pour tout n.
    2. Donc |bₙ/n³| ≤ M/n³ pour tout n ≥ 1.
    3. La série Σ M/n³ converge : série de Riemann avec p = 3 > 1.
    4. Critère de comparaison (termes positifs) : 0 ≤ |bₙ/n³| ≤ M/n³ et Σ M/n³ converge, donc Σ |bₙ/n³| converge.
    5. Une série absolument convergente converge : Σ bₙ/n³ converge.

Soit (bₙ) une suite convergente. Montrer que la série Σ bₙ/n³ converge. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. (bₙ) converge, donc elle est bornée : il existe M > 0 tel que |bₙ| ≤ M pour tout n.
    2. Donc |bₙ/n³| ≤ M/n³ pour tout n ≥ 1.
    3. La série Σ M/n³ converge : série de Riemann avec p = 3 > 1.
    4. Critère de comparaison (termes positifs) : 0 ≤ |bₙ/n³| ≤ M/n³ et Σ M/n³ converge, donc Σ |bₙ/n³| converge.
    5. Une série absolument convergente converge : Σ bₙ/n³ converge.

```

### Niveau 3

```
Soit f : [2 ; 4] → ℝ continue, dérivable sur ]2 ; 4[, avec f(2) = 2 et f′(x) ≤ −4 pour tout x ∈ ]2 ; 4[. Montrer que f s'annule sur ]2 ; 4[. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. f est continue sur [2 ; 4] et dérivable sur ]2 ; 4[ : les hypothèses du théorème des accroissements finis sont vérifiées.
    2. TAF : il existe ξ ∈ ]2 ; 4[ tel que f(4) − f(2) = f′(ξ)·(4 − 2).
    3. Comme f′(ξ) ≤ −4 : f(4) = 2 + 2·f′(ξ) ≤ 2 − 8 = −6 < 0.
    4. TVI : si g est continue sur [α ; β] et si g(α) et g(β) sont de signes opposés, alors g s'annule sur ]α ; β[.
    5. Ici f est continue sur [2 ; 4], f(2) = 2 > 0 et f(4) < 0 : les hypothèses du TVI sont vérifiées.
    6. Donc il existe x₀ ∈ ]2 ; 4[ tel que f(x₀) = 0.
    ✗ Avec f(x) = 2 − 4(x − 2), f s'annule en x = 5/2 : c'est vrai. [g9_proof_by_example]
    ✗ f(2) > 0 et f′ < 0, donc f décroît et finit par s'annuler. [a1_ivt_no_continuity]
  pièges : g9_proof_by_example, a1_ivt_no_continuity

Soit Σ aₙ une série absolument convergente. Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. Σ |aₙ| converge, donc aₙ → 0 (condition nécessaire).
    2. Il existe N tel que |aₙ| ≤ 1 pour n ≥ N ; alors e^(aₙ) ≤ e.
    3. Pour n ≥ N : |(−1)ⁿaₙe^(aₙ)| = |aₙ|·e^(aₙ) ≤ e·|aₙ|.
    4. Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.
    5. Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.
    ✗ Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1. [g9_quant_order]
    ✗ Avec aₙ = 1/n², la série converge : c'est vrai. [g9_proof_by_example]
  pièges : g9_quant_order, g9_proof_by_example

Soit Σ aₙ une série absolument convergente. Montrer que a₂ₙ + a₂ₙ₊₁ + … + a₃ₙ → 0 quand n → ∞. Touche les blocs de la preuve dans l'ordre.
  [blocs order]
    1. Σ |aₖ| converge : ses restes Rₘ = Σ_{k>m} |aₖ| tendent vers 0 quand m → ∞.
    2. |a₂ₙ + … + a₃ₙ| ≤ |a₂ₙ| + … + |a₃ₙ| (inégalité triangulaire).
    3. |a₂ₙ| + … + |a₃ₙ| ≤ Σ_{k≥2n} |aₖ| = R₂ₙ₋₁ (termes positifs).
    4. 0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.
    5. Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.
    ✗ Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0. [a1_sum_n_terms_as_one]
    ✗ Il existe N tel que, pour tout ε > 0, Rₘ ≤ ε pour m ≥ N. [g9_quant_order]
  pièges : a1_sum_n_terms_as_one, g9_quant_order

```

### Niveau 4

```
Soit Σ aₙ une série absolument convergente. Montrer que a₂ₙ + a₂ₙ₊₁ + … + a₃ₙ → 0 quand n → ∞. Touche les blocs de la preuve dans l'ordre. Un bloc demande un calcul.
  [blocs order]
    1. Σ |aₖ| converge : ses restes Rₘ = Σ_{k>m} |aₖ| tendent vers 0 quand m → ∞.
    2. |a₂ₙ + … + a₃ₙ| ≤ |a₂ₙ| + … + |a₃ₙ| (inégalité triangulaire).
    3. |a₂ₙ| + … + |a₃ₙ| ≤ Σ_{k≥2n} |aₖ| = R₂ₙ₋₁ (termes positifs).   [à écrire : Le reste commence à k = 2n]
    4. 0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.
    5. Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.
    ✗ Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0. [a1_sum_n_terms_as_one]
    ✗ a₂ₙ + … + a₃ₙ ≤ Σ aₖ, qui converge, donc a₂ₙ + … + a₃ₙ → 0. [a1_compare_wrong_direction]
    ✗ Il existe N tel que, pour tout ε > 0, Rₘ ≤ ε pour m ≥ N. [g9_quant_order]
    ✗ Avec aₖ = 1/k², a₂ₙ + … + a₃ₙ ≤ (n + 1)/(4n²) → 0 : c'est vrai. [g9_proof_by_example]
  pièges : a1_sum_n_terms_as_one, a1_compare_wrong_direction, g9_quant_order, g9_proof_by_example

Soit Σ aₙ une série absolument convergente. Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument. Touche les blocs de la preuve dans l'ordre. Un bloc demande un calcul.
  [blocs order]
    1. Σ |aₙ| converge, donc aₙ → 0 (condition nécessaire).
    2. Il existe N tel que |aₙ| ≤ 1 pour n ≥ N ; alors e^(aₙ) ≤ e.   [à écrire : Pour n ≥ N, e^(aₙ) ≤ e]
    3. Pour n ≥ N : |(−1)ⁿaₙe^(aₙ)| = |aₙ|·e^(aₙ) ≤ e·|aₙ|.
    4. Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.
    5. Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.
    ✗ aₙe^(aₙ) ≤ e·aₙ, donc la série converge. [a1_compare_wrong_direction]
    ✗ Avec aₙ = 1/n², la série converge : c'est vrai. [g9_proof_by_example]
    ✗ La série est alternée, donc elle converge absolument par Leibniz. [a1_abs_conv_confused]
    ✗ Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1. [g9_quant_order]
  pièges : a1_compare_wrong_direction, g9_proof_by_example, a1_abs_conv_confused, g9_quant_order

Soit Σ aₙ une série absolument convergente. Montrer que a₂ₙ + a₂ₙ₊₁ + … + a₃ₙ → 0 quand n → ∞. Touche les blocs de la preuve dans l'ordre. Un bloc demande un calcul.
  [blocs order]
    1. Σ |aₖ| converge : ses restes Rₘ = Σ_{k>m} |aₖ| tendent vers 0 quand m → ∞.
    2. |a₂ₙ + … + a₃ₙ| ≤ |a₂ₙ| + … + |a₃ₙ| (inégalité triangulaire).
    3. |a₂ₙ| + … + |a₃ₙ| ≤ Σ_{k≥2n} |aₖ| = R₂ₙ₋₁ (termes positifs).   [à écrire : Le reste commence à k = 2n]
    4. 0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.
    5. Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.
    ✗ Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0. [a1_sum_n_terms_as_one]
    ✗ Il existe N tel que, pour tout ε > 0, Rₘ ≤ ε pour m ≥ N. [g9_quant_order]
    ✗ a₂ₙ + … + a₃ₙ ≤ Σ aₖ, qui converge, donc a₂ₙ + … + a₃ₙ → 0. [a1_compare_wrong_direction]
    ✗ Avec aₖ = 1/k², a₂ₙ + … + a₃ₙ ≤ (n + 1)/(4n²) → 0 : c'est vrai. [g9_proof_by_example]
  pièges : a1_sum_n_terms_as_one, g9_quant_order, a1_compare_wrong_direction, g9_proof_by_example

```

### Niveau 5

```
Soit (bₙ) une suite convergente. Montrer que la série Σ bₙ/n³ converge. Si tu utilises un résultat du cours, énonce-le et vérifie ses hypothèses.
  [problème, 4 points]
  partie 1 (Traduire l'hypothèse : (bₙ) est bornée : 1)
  Traduire l'hypothèse : (bₙ) est bornée :
    [blocs order, sans aide]
      1. (bₙ) converge, donc elle est bornée : il existe M > 0 tel que |bₙ| ≤ M pour tout n.
      ✗ bₙ → ℓ, donc bₙ/n³ ~ ℓ/n³, et Σ ℓ/n³ converge. [a1_equiv_zero_limit]
      ✗ Pour tout n, il existe Mₙ > 0 tel que |bₙ| ≤ Mₙ. [g9_quant_order]
  partie 2 (Majorer |bₙ/nᵖ| : 1)
  Majorer |bₙ/nᵖ| :
    [blocs order, sans aide]
      1. Donc |bₙ/n³| ≤ M/n³ pour tout n ≥ 1.   [à écrire : |bₙ/n³| ≤ M/n^3]
      ✗ bₙ ≤ M, donc bₙ/n³ ≤ M/n³, donc Σ bₙ/n³ converge. [a1_compare_wrong_direction]
  partie 3 (Énoncer et appliquer le critère de comparaison : 1,5)
  Énoncer et appliquer le critère de comparaison :
    [blocs order, sans aide]
      1. La série Σ M/n³ converge : série de Riemann avec p = 3 > 1.
      2. Critère de comparaison (termes positifs) : 0 ≤ |bₙ/n³| ≤ M/n³ et Σ M/n³ converge, donc Σ |bₙ/n³| converge.
      ✗ bₙ → ℓ, donc bₙ/n³ ~ ℓ/n³, et Σ ℓ/n³ converge. [a1_equiv_zero_limit]
      ✗ Avec bₙ = 1 : Σ 1/n³ converge, donc c'est vrai pour toute suite convergente. [g9_proof_by_example]
  partie 4 (Conclure : 0,5)
  Conclure :
    [blocs order, sans aide]
      1. Une série absolument convergente converge : Σ bₙ/n³ converge.
      ✗ bₙ/n³ → 0, donc la série Σ bₙ/n³ converge. [a1_series_term_to_zero]
  pièges : a1_equiv_zero_limit, g9_quant_order, a1_compare_wrong_direction, g9_proof_by_example, a1_series_term_to_zero

Soit Σ aₙ une série absolument convergente. (a) Montrer que a₂ₙ + … + a₃ₙ → 0. (b) Montrer que Σ (−1)ⁿaₙe^(aₙ) converge absolument. Si tu utilises un résultat du cours, énonce-le et vérifie ses hypothèses.
  [problème, 6 points]
  partie 1 ((a) Traduire l'hypothèse : les restes tendent vers 0 : 1)
  Traduire l'hypothèse : les restes tendent vers 0 :
    [blocs order, sans aide]
      1. Σ |aₖ| converge : ses restes Rₘ = Σ_{k>m} |aₖ| tendent vers 0 quand m → ∞.
      ✗ Il existe N tel que, pour tout ε > 0, Rₘ ≤ ε pour m ≥ N. [g9_quant_order]
  partie 2 ((a) Majorer par un reste : 1)
  Majorer par un reste :
    [blocs order, sans aide]
      1. |a₂ₙ + … + a₃ₙ| ≤ |a₂ₙ| + … + |a₃ₙ| (inégalité triangulaire).
      2. |a₂ₙ| + … + |a₃ₙ| ≤ Σ_{k≥2n} |aₖ| = R₂ₙ₋₁ (termes positifs).   [à écrire : Le reste commence à k = 2n]
      ✗ a₂ₙ + … + a₃ₙ ≤ Σ aₖ, qui converge, donc a₂ₙ + … + a₃ₙ → 0. [a1_compare_wrong_direction]
  partie 3 ((a) Conclure par les gendarmes : 1)
  Conclure par les gendarmes :
    [blocs order, sans aide]
      1. 0 ≤ |a₂ₙ + … + a₃ₙ| ≤ R₂ₙ₋₁ et R₂ₙ₋₁ → 0.
      2. Par les gendarmes, a₂ₙ + … + a₃ₙ → 0.
      ✗ Chaque aₖ → 0, donc la somme a₂ₙ + … + a₃ₙ → 0. [a1_sum_n_terms_as_one]
      ✗ Avec aₖ = 1/k², a₂ₙ + … + a₃ₙ ≤ (n + 1)/(4n²) → 0 : c'est vrai. [g9_proof_by_example]
  partie 4 ((b) Traduire l'hypothèse : aₙ → 0, donc e^(aₙ) ≤ e : 1)
  Traduire l'hypothèse : aₙ → 0, donc e^(aₙ) ≤ e :
    [blocs order, sans aide]
      1. Σ |aₙ| converge, donc aₙ → 0 (condition nécessaire).
      2. Il existe N tel que |aₙ| ≤ 1 pour n ≥ N ; alors e^(aₙ) ≤ e.   [à écrire : Pour n ≥ N, e^(aₙ) ≤ e]
      ✗ Pour tout n, il existe Nₙ tel que |aₙ| ≤ 1. [g9_quant_order]
  partie 5 ((b) Majorer : 1)
  Majorer :
    [blocs order, sans aide]
      1. Pour n ≥ N : |(−1)ⁿaₙe^(aₙ)| = |aₙ|·e^(aₙ) ≤ e·|aₙ|.
      ✗ aₙe^(aₙ) ≤ e·aₙ, donc la série converge. [a1_compare_wrong_direction]
  partie 6 ((b) Critère de comparaison et conclusion : 1)
  Critère de comparaison et conclusion :
    [blocs order, sans aide]
      1. Σ e·|aₙ| converge ; par le critère de comparaison (termes positifs, à partir du rang N), Σ |(−1)ⁿaₙe^(aₙ)| converge.
      2. Donc Σ (−1)ⁿaₙe^(aₙ) converge absolument.
      ✗ La série est alternée, donc elle converge absolument par Leibniz. [a1_abs_conv_confused]
      ✗ Avec aₙ = 1/n², la série converge : c'est vrai. [g9_proof_by_example]
  pièges : g9_quant_order, a1_compare_wrong_direction, a1_sum_n_terms_as_one, g9_proof_by_example, a1_abs_conv_confused

Soit (bₙ) une suite convergente. Montrer que la série Σ bₙ/n² converge. Si tu utilises un résultat du cours, énonce-le et vérifie ses hypothèses.
  [problème, 4 points]
  partie 1 (Traduire l'hypothèse : (bₙ) est bornée : 1)
  Traduire l'hypothèse : (bₙ) est bornée :
    [blocs order, sans aide]
      1. (bₙ) converge, donc elle est bornée : il existe M > 0 tel que |bₙ| ≤ M pour tout n.
      ✗ Pour tout n, il existe Mₙ > 0 tel que |bₙ| ≤ Mₙ. [g9_quant_order]
      ✗ bₙ → ℓ, donc bₙ/n² ~ ℓ/n², et Σ ℓ/n² converge. [a1_equiv_zero_limit]
  partie 2 (Majorer |bₙ/nᵖ| : 1)
  Majorer |bₙ/nᵖ| :
    [blocs order, sans aide]
      1. Donc |bₙ/n²| ≤ M/n² pour tout n ≥ 1.   [à écrire : |bₙ/n²| ≤ M/n^2]
      ✗ bₙ ≤ M, donc bₙ/n² ≤ M/n², donc Σ bₙ/n² converge. [a1_compare_wrong_direction]
  partie 3 (Énoncer et appliquer le critère de comparaison : 1,5)
  Énoncer et appliquer le critère de comparaison :
    [blocs order, sans aide]
      1. La série Σ M/n² converge : série de Riemann avec p = 2 > 1.
      2. Critère de comparaison (termes positifs) : 0 ≤ |bₙ/n²| ≤ M/n² et Σ M/n² converge, donc Σ |bₙ/n²| converge.
      ✗ bₙ → ℓ, donc bₙ/n² ~ ℓ/n², et Σ ℓ/n² converge. [a1_equiv_zero_limit]
      ✗ Avec bₙ = 1 : Σ 1/n² converge, donc c'est vrai pour toute suite convergente. [g9_proof_by_example]
  partie 4 (Conclure : 0,5)
  Conclure :
    [blocs order, sans aide]
      1. Une série absolument convergente converge : Σ bₙ/n² converge.
      ✗ bₙ/n² → 0, donc la série Σ bₙ/n² converge. [a1_series_term_to_zero]
  pièges : g9_quant_order, a1_equiv_zero_limit, a1_compare_wrong_direction, g9_proof_by_example, a1_series_term_to_zero

```

### Variantes d'examen

```
Soit f : [1 ; 3] → ℝ continue, dérivable sur ]1 ; 3[, avec f(1) = 3 et f′(x) ≤ −2 pour tout x ∈ ]1 ; 3[. Montrer que f s'annule sur ]1 ; 3[. Si tu utilises un résultat du cours, énonce-le et vérifie ses hypothèses.
  [problème, examen open, 5 points]
  partie 1 (Énoncer le TAF et vérifier ses hypothèses : 1)
  Énoncer le TAF et vérifier ses hypothèses :
    [blocs order, sans aide]
      1. f est continue sur [1 ; 3] et dérivable sur ]1 ; 3[ : les hypothèses du théorème des accroissements finis sont vérifiées.
      2. TAF : il existe ξ ∈ ]1 ; 3[ tel que f(3) − f(1) = f′(ξ)·(3 − 1).
      ✗ Par Rolle, il existe ξ ∈ ]1 ; 3[ tel que f′(ξ) = 0. [a1_rolle_without_hyp]
  partie 2 (Appliquer le TAF : signe de f(3) : 1,5)
  Appliquer le TAF : signe de f(3) :
    [blocs order, sans aide]
      1. Comme f′(ξ) ≤ −2 : f(3) = 3 + 2·f′(ξ) ≤ 3 − 4 = −1 < 0.   [à écrire : f(3) ≤ -1]
      ✗ f′ ≤ −2, donc f(3) ≤ −2. [a1_mvt_endpoints_values]
  partie 3 (Énoncer le TVI : 1)
  Énoncer le TVI :
    [blocs order, sans aide]
      1. TVI : si g est continue sur [α ; β] et si g(α) et g(β) sont de signes opposés, alors g s'annule sur ]α ; β[.
      ✗ TVI : il existe x₀ ∈ ]α ; β[ tel que toute g continue sur [α ; β], avec g(α) et g(β) de signes opposés, vérifie g(x₀) = 0. [g9_quant_order]
  partie 4 (Vérifier les hypothèses du TVI : 1)
  Vérifier les hypothèses du TVI :
    [blocs order, sans aide]
      1. Ici f est continue sur [1 ; 3], f(1) = 3 > 0 et f(3) < 0 : les hypothèses du TVI sont vérifiées.
      ✗ f(1) > 0 et f′ < 0, donc f décroît et finit par s'annuler. [a1_ivt_no_continuity]
  partie 5 (Conclure : 0,5)
  Conclure :
    [blocs order, sans aide]
      1. Donc il existe x₀ ∈ ]1 ; 3[ tel que f(x₀) = 0.
      ✗ Avec f(x) = 3 − 2(x − 1), f s'annule en x = 5/2 : c'est vrai. [g9_proof_by_example]
  pièges : a1_rolle_without_hyp, a1_mvt_endpoints_values, g9_quant_order, a1_ivt_no_continuity, g9_proof_by_example

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
- **Inf ou Sup des valeurs de la fonction, au lieu des x** (`a1_supinf_on_values`, C) : A = {x > 0 : cos(1/x) > 0} : « Sup A = π/2 » au lieu de Sup A = +∞, Inf A = 0
- **tan appliquée hors de ]−π/2 ; π/2[** (`a1_tan_monotone_range`, C) : Arctg(1/x) < 2π/3 ⇒ 1/x < tan(2π/3) = −√3 au lieu de la condition est toujours vraie
- **Le Sup pris pour un élément de A (un Max)** (`a1_sup_in_set`, E) : Sup [0 ; 3[ = 3 = Max au lieu de pas de Max
- **N(ε) qui dépend de n** (`a1_n_depends_on_n`, E) : N(ε) = 5/(εn) au lieu de N(ε) = 5/ε
- **Majorer une fraction en agrandissant son dénominateur** (`a1_bound_wrong_direction`, E) : 5/(n + 2) ≤ 5/(n + 3) au lieu de 5/(n + 2) ≤ 5/n
- **Une limite ne serait jamais atteinte** (`a1_limit_never_reached`, R) : « 0,999… < 1 » ; « la suite constante 3 ne tend pas vers 3 » au lieu de 0,999… = 1, et la suite constante 3 tend vers 3
- **∞ − ∞ pris pour 0 (suites)** (`a1_indet_inf_minus_inf`, E) : √(n² + 4n) − n → 0 au lieu de √(n² + 4n) − n → 2
- **Racine distribuée sur une somme** (`a1_sqrt_sum_split`, E) : √(n² + 4n) = n + 2√n au lieu de quantité conjuguée
- **Termes de plus bas degré gardés en +∞** (`a1_dominant_term_wrong`, E) : (2n³ − n)/(5n³ + 7) → −1/7 au lieu de (2n³ − n)/(5n³ + 7) → 2/5
- **Règle du quotient appliquée avec lim bₙ = 0** (`a1_lim_quotient_bn_nonzero`, C) : aₙ → 1, bₙ → 0 (bₙ ≠ 0) : « aₙ/bₙ converge » au lieu de aₙ/bₙ peut ne pas avoir de limite
- **Minorant et majorant échangés** (`a1_squeeze_wrong_direction`, C) : Sₙ ≤ n²/(n² + n) au lieu de Sₙ ≥ n²/(n² + n)
- **Gendarmes avec deux bornes de limites différentes** (`a1_squeeze_different_limits`, C) : 0 ≤ bₙ ≤ 2 ⇒ « bₙ converge » au lieu de des bornes qui ont la même limite
- **Une somme de n termes majorée par un seul terme** (`a1_sum_n_terms_as_one`, E) : Σ_{k=1}^{n} n/(n² + k) ≤ n/(n² + 1) au lieu de Σ_{k=1}^{n} n/(n² + k) ≤ n·n/(n² + 1)
- **1^∞ pris pour 1** (`a1_indet_one_inf`, E) : (1 + 2/n)ⁿ → 1 au lieu de (1 + 2/n)ⁿ = e^(n·Log(1 + 2/n)) → e²
- **(m + k)!/m! simplifié en un seul facteur** (`a1_factorial_ratio`, E) : (2n + 2)!/(2n)! = 2n + 2 au lieu de (2n + 2)!/(2n)! = (2n + 2)(2n + 1)
- **Bornée, donc convergente** (`a1_bounded_implies_convergent`, C) : « (aₙ) est bornée, donc elle converge » au lieu de (aₙ) monotone et bornée, donc elle converge
- **lim sup confondue avec le sup des termes** (`a1_limsup_as_sup`, E) : lim sup aₙ = sup des termes = 5/2 au lieu de lim sup aₙ = limite de la plus haute sous-suite = 1
- **Formule de aₙ₊₁ = q·aₙ + c sans passer par le point fixe** (`a1_affine_rec_no_fixed_point`, E) : aₙ = qⁿ·a₀ + c au lieu de aₙ = qⁿ·(a₀ − L) + L
- **Point fixe pris pour la limite sans prouver la convergence** (`a1_rec_limit_without_convergence`, C) : « L = f(L) ⇒ L = 2, donc aₙ → 2 » au lieu de la convergence d'abord : monotone et bornée
- **Suite croissante parce que f est croissante** (`a1_monotone_by_f_increasing`, E) : f croissante, donc (aₙ) croissante au lieu de le sens dépend du signe de a₁ − a₀
- **Somme géométrique : 1/(1 − q) sans regarder le premier terme** (`a1_geo_sum_start`, E) : Σ_{k≥2} (1/3)ᵏ = 3/2 au lieu de Σ_{k≥2} (1/3)ᵏ = (1/9)/(1 − 1/3) = 1/6
- **Série télescopique : un seul terme gardé quand le décalage vaut 2** (`a1_tele_wrong_terms`, E) : Σ (1/(k + 1) − 1/(k + 3)) = 1/2 au lieu de 1/2 + 1/3
- **« uₙ → 0, donc la série converge »** (`a1_series_term_to_zero`, R) : 1/n → 0, donc Σ 1/n converge au lieu de Σ 1/n diverge
- **Seuil de la série de Riemann mal placé** (`a1_riemann_p_boundary`, E) : Σ 1/n converge (p = 1) au lieu de diverge
- **ρ = 1, donc « converge » (ou « diverge »)** (`a1_ratio_one`, E) : ρ = 1, donc la série converge au lieu de aucune conclusion
- **aₙ₊₁/aₙ < 1 pour tout n pris pour ρ < 1** (`a1_ratio_lt1_termwise`, E) : aₙ₊₁/aₙ < 1 pour tout n, donc Σ aₙ converge au lieu de il faut ≤ q < 1 fixe, ou une limite < 1
- **Leibniz sans la décroissance** (`a1_leibniz_no_decrease`, C) : Σ (−1)ⁿ/(√n + (−1)ⁿ) « converge par Leibniz » au lieu de |aₙ| n'est pas décroissante : la série diverge
- **Convergence et convergence absolue confondues** (`a1_abs_conv_confused`, E) : Σ (−1)ⁿ/n « converge absolument » au lieu de semi-convergente
- **Bornes de l'ensemble de convergence non étudiées** (`a1_param_bounds_untreated`, E) : [−1 ; 3] au lieu de ]−1 ; 3[
- **|a| < |b| remplacé par a < b** (`a1_abs_square_ineq`, E) : |2λ| < |λ + 3| ⇒ 2λ < λ + 3 au lieu de 4λ² < (λ + 3)²
- **Limite remarquable sans le facteur de l'argument** (`a1_remarkable_limit_scale`, E) : sin(3x)/x → 1 au lieu de sin(3x)/x = 3·sin(3x)/(3x) → 3
- **Une seule limite latérale donnée comme limite** (`a1_onesided_ignored`, E) : lim e^(1/x) en 0 = 0 (vu à gauche) au lieu de à gauche 0, à droite +∞ : pas de limite en 0
- **Valeur absolue enlevée sans regarder le signe** (`a1_abs_removed`, E) : |x − 2| = x − 2 pour x < 2 au lieu de |x − 2| = −(x − 2) pour x < 2
- **Limite latérale prise avec le mauvais morceau** (`a1_extension_wrong_branch`, E) : limite à gauche de 3 avec le morceau de x > 3 au lieu de à gauche de 3, le morceau de x < 3
- **ε et δ échangés dans la définition** (`a1_epsdelta_swapped`, E) : |x − x₀| ≤ ε ⇒ |f(x) − L| ≤ δ au lieu de |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε
- **δ qui dépend de x** (`a1_delta_depends_on_x`, E) : δ = ε/|x + 3| au lieu de δ = min(1 ; ε/7)
- **δ = k·ε au lieu de ε/k** (`a1_delta_inverted`, E) : |f(x) − 7| = 4|x + 1| : δ = 4ε au lieu de δ = ε/4
- **TVI sans la continuité** (`a1_ivt_no_continuity`, E) : « f(0) < 0 < f(1), donc f s'annule » pour 1/(x − 1/2) au lieu de il faut f continue sur [0 ; 1]
- **Image lue sur les seules bornes** (`a1_image_endpoints_only`, E) : f(x) = e^(−x)·sin x : image [f(0) ; f(π)] = {0} au lieu de [0 ; (√2/2)·e^(−π/4)]
- **Bissection : l'erreur divisée par 10 à chaque étape** (`a1_bisection_count`, E) : erreur ≤ 10⁻³ dès n = 3 au lieu de n = 10, car 2¹⁰ = 1024 ≥ 10³
- **Bornes du domaine oubliées** (`a1_power_bounds_forgotten`, E) : domaine ]1/3 ; 5/3[ au lieu de [1/3 ; 5/3[ : en x = 1/3, Σ (−1)ⁿ/(2n) converge
- **Rayon R = ρ au lieu de 1/ρ** (`a1_power_radius_inverse`, E) : ρ = 3/2, donc R = 3/2 au lieu de R = 1/ρ = 2/3
- **Centre de la série lu avec le mauvais signe** (`a1_power_center_sign`, E) : Σ aₙ(x + 1)ⁿ centrée en 1 au lieu de centrée en −1
- **Série de référence sans ses premiers termes** (`a1_pow_sum_index_shift`, E) : Σ_{k≥1} 2ᵏ/k! = e² au lieu de e² − 1 : le terme k = 0 manque
- **iᵏ réduit avec un mauvais modulo** (`a1_cplx_ik_mod`, C) : i¹⁵ = i au lieu de i¹⁵ = i³ = −i
- **Module négatif dans une forme polaire** (`a1_polar_r_negative`, C) : −1 + i√3 = −2e^(−iπ/3), lu « r = 2, φ = −π/3 » au lieu de −1 + i√3 = 2e^(2iπ/3)
- **Division par r sans le cas r = 0** (`a1_zn_conj_r0`, C) : z³ = z̄ : S = {1 ; i ; −1 ; −i} au lieu de S = {0 ; 1 ; i ; −1 ; −i}
- **Nombre de solutions lu sur le degré apparent** (`a1_zn_conj_polynomial_count`, C) : z⁵ = |z| a 5 solutions au lieu de z⁵ = |z| a 6 solutions : 0 et les 5 racines cinquièmes de 1
- **Conjugué écrit sans changer le signe de l'argument** (`a1_conj_arg_sign`, E) : z̄ = r·e^(iφ) au lieu de z̄ = r·e^(−iφ)
- **Cauchy réduit à deux termes consécutifs** (`a1_cauchy_consecutive`, E) : (aₙ) de Cauchy ⇔ aₙ₊₁ − aₙ → 0 au lieu de ∀ε > 0 ∃N ∀m, n ≥ N, |aₘ − aₙ| ≤ ε
- **Équivalent ℓ/n³ avec ℓ = 0** (`a1_equiv_zero_limit`, E) : bₙ → ℓ, donc bₙ/n³ ~ ℓ/n³ au lieu de si ℓ = 0, passer par la borne |bₙ| ≤ M
