# Exemples de questions — Fonctions et inéquations

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Domaine de définition (`g1-domain`, Gymnase)

_Toutes les conditions : dénominateurs, racines, puis « et »._

### Niveau 1

```
Détermine le domaine de définition de f(x) = √(−2x − 4)/(x + 3).
  [guided]  −2x − 4 ≥ 0 et x + 3 ≠ 0
    (Les conditions de √(−2x − 4)/(x + 3) sont écrites. Résous-les.)
    = x ≤ □ et x ≠ □   (trous : x ≤ −2 et x ≠ −3)   ← Résoudre chaque condition
    = ]−∞ ; −3[ ∪ ]−3 ; −2]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −2x − 4 ≥ 0 et x + 3 ≠ 0 | x ≤ −2 et x ≠ −3
  pièges : g9_union_inter, g9_bracket, g1_domain_partial

Détermine le domaine de définition de f(x) = (x − 2)/√(x + 5).
  [guided]  x + 5 > 0
    (Les conditions de (x − 2)/√(x + 5) sont écrites. Résous-les.)
    = x > □   (trous : x > −5)   ← Résoudre chaque condition
    = ]−5 ; +∞[   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | x + 5 > 0 | x > −5
  pièges : g9_bracket

Détermine le domaine de définition de f(x) = (x − 4)/√(2x + 3).
  [guided]  2x + 3 > 0
    (Les conditions de (x − 4)/√(2x + 3) sont écrites. Résous-les.)
    = x > □   (trous : x > −3/2)   ← Résoudre chaque condition
    = ]−3/2 ; +∞[   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | 2x + 3 > 0 | x > −3/2
  pièges : g9_bracket

```

### Niveau 2

```
Détermine le domaine de définition de f(x) = √(−2x)/(x² − 9).
  [guided]  √(−2x)/(x² − 9)
    = □ ≥ 0 et □ ≠ 0   (trous : −2x ≥ 0 et x² − 9 ≠ 0)   ← Écrire les conditions
    = x ≤ 0 et x ≠ −3 et x ≠ 3   ← Résoudre chaque condition
    = ]−∞ ; −3[ ∪ ]−3 ; 0]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −2x ≥ 0 et x² − 9 ≠ 0 | x ≤ 0 et x ≠ −3 et x ≠ 3
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = √(−2x + 4)/((x − 5)(x + 1)).
  [guided]  √(−2x + 4)/((x − 5)(x + 1))
    = □ ≥ 0 et □ ≠ 0   (trous : −2x + 4 ≥ 0 et (x − 5)(x + 1) ≠ 0)   ← Écrire les conditions
    = x ≤ 2 et x ≠ −1 et x ≠ 5   ← Résoudre chaque condition
    = ]−∞ ; −1[ ∪ ]−1 ; 2]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −2x + 4 ≥ 0 et (x − 5)(x + 1) ≠ 0 | x ≤ 2 et x ≠ −1 et x ≠ 5
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = (x − 1)/√(x + 5).
  [guided]  (x − 1)/√(x + 5)
    = □ > 0   (trous : x + 5 > 0)   ← Écrire les conditions
    = x > −5   ← Résoudre chaque condition
    = ]−5 ; +∞[   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | x + 5 > 0 | x > −5
  pièges : g1_domain_partial

```

### Niveau 3

```
Détermine le domaine de définition de f(x) = (x + 1)/√(x + 2).
  [tap, suivre l'erreur, menu steps]  (x + 1)/√(x + 2)
    ? Quelles conditions écrire ? ✔ x + 2 > 0 / · x + 2 > 0 et numérateur ≠ 0
    = x + 2 > 0   ← Écrire les conditions
    = x > −2   ← Résoudre chaque condition
    = ]−2 ; +∞[   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | x + 2 > 0 | x > −2
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = (x − 2)/√(−x).
  [tap, suivre l'erreur, menu steps]  (x − 2)/√(−x)
    ? Quelles conditions écrire ? ✔ −x > 0 / · −x > 0 et numérateur ≠ 0
    = −x > 0   ← Écrire les conditions
    = x < 0   ← Résoudre chaque condition
    = ]−∞ ; 0[   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −x > 0 | x < 0
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = √(−x + 5)/(x + 4).
  [tap, suivre l'erreur, menu steps]  √(−x + 5)/(x + 4)
    ? Quelles conditions écrire ? ✔ −x + 5 ≥ 0 et x + 4 ≠ 0 / · x + 4 ≠ 0 / · −x + 5 ≥ 0 et x + 4 ≠ 0 et numérateur ≠ 0 / · −x + 5 > 0 et x + 4 ≠ 0
    = −x + 5 ≥ 0 et x + 4 ≠ 0   ← Écrire les conditions
    = x ≤ 5 et x ≠ −4   ← Résoudre chaque condition
    = ]−∞ ; −4[ ∪ ]−4 ; 5]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −x + 5 ≥ 0 et x + 4 ≠ 0 | x ≤ 5 et x ≠ −4
  pièges : g1_domain_partial

```

### Niveau 4

```
Détermine le domaine de définition de f(x) = √(x + 1) + √(−x + 2).
  [free, suivre l'erreur]  √(x + 1) + √(−x + 2)
    = x + 1 ≥ 0 et −x + 2 ≥ 0   ← Écrire les conditions
    = x ≥ −1 et x ≤ 2   ← Résoudre chaque condition
    = [−1 ; 2]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | x + 1 ≥ 0 et −x + 2 ≥ 0 | x ≥ −1 et x ≤ 2
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = √(−x² − x + 6)/(x + 2).
  [free, suivre l'erreur]  √(−x² − x + 6)/(x + 2)
    = −x² − x + 6 ≥ 0 et x + 2 ≠ 0   ← Écrire les conditions
    = −3 ≤ x ≤ 2 et x ≠ −2   ← Résoudre chaque condition
    = [−3 ; −2[ ∪ ]−2 ; 2]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | −x² − x + 6 ≥ 0 et x + 2 ≠ 0 | −3 ≤ x ≤ 2 et x ≠ −2
  pièges : g1_domain_partial

Détermine le domaine de définition de f(x) = √(x + 4) + √(−2x − 2).
  [free, suivre l'erreur]  √(x + 4) + √(−2x − 2)
    = x + 4 ≥ 0 et −2x − 2 ≥ 0   ← Écrire les conditions
    = x ≥ −4 et x ≤ −1   ← Résoudre chaque condition
    = [−4 ; −1]   ← Combiner
  aides : Deux dangers : une racine carrée (ce qui est dessous doit être ≥ 0) et un dénominateur (≠ 0). | x + 4 ≥ 0 et −2x − 2 ≥ 0 | x ≥ −4 et x ≤ −1
  pièges : g1_domain_partial

```

### Niveau 5

```
Soit f(x) = (x − 1)√(x − 3)/(x − 6). Détermine D_f, puis résous f(x) = 0.
  [free, sans aide]  (x − 1)√(x − 3)/(x − 6)
    = x − 3 ≥ 0 et x − 6 ≠ 0   ← Conditions
    = x ≥ 3 et x ≠ 6   ← Résoudre
    = [3 ; 6[ ∪ ]6 ; +∞[   ← D_f
  — Résous f(x) = 0 sur D_f :  [juge solset]  départ : (x − 1)√(x − 3)/(x − 6) = 0
    = x = 1 ou x = 3   ← Un produit est nul si un facteur est nul
    = {3}   ← 1 n'est pas dans D_f
  pièges : g1_domain_partial

Soit f(x) = (x + 3)√(x + 1)/(x − 1). Détermine D_f, puis résous f(x) = 0.
  [free, sans aide]  (x + 3)√(x + 1)/(x − 1)
    = x + 1 ≥ 0 et x − 1 ≠ 0   ← Conditions
    = x ≥ −1 et x ≠ 1   ← Résoudre
    = [−1 ; 1[ ∪ ]1 ; +∞[   ← D_f
  — Résous f(x) = 0 sur D_f :  [juge solset]  départ : (x + 3)√(x + 1)/(x − 1) = 0
    = x = −3 ou x = −1   ← Un produit est nul si un facteur est nul
    = {−1}   ← −3 n'est pas dans D_f
  pièges : g1_domain_partial

Soit f(x) = (x − 2)√(x − 3)/(x − 6). Détermine D_f, puis résous f(x) = 0.
  [free, sans aide]  (x − 2)√(x − 3)/(x − 6)
    = x − 3 ≥ 0 et x − 6 ≠ 0   ← Conditions
    = x ≥ 3 et x ≠ 6   ← Résoudre
    = [3 ; 6[ ∪ ]6 ; +∞[   ← D_f
  — Résous f(x) = 0 sur D_f :  [juge solset]  départ : (x − 2)√(x − 3)/(x − 6) = 0
    = x = 2 ou x = 3   ← Un produit est nul si un facteur est nul
    = {3}   ← 2 n'est pas dans D_f
  pièges : g1_domain_partial

```

### Variantes d'examen

```
Domaine de définition de f(x) = √(x + 5)/(x + 3) :
  · ]−∞ ; −3[ ∪ ]−3 ; +∞[ [g1_domain_partial]   ✔ [−5 ; −3[ ∪ ]−3 ; +∞[   · ℝ   · [−5 ; +∞[ [g1_domain_partial]
  [examen mcq]
  pièges : g1_domain_partial

Vrai ou faux ?
  « La fonction x ↦ √(x²) n'est définie que sur [0 ; +∞[. » → FAUX
    contre-exemple (refute) : x = -1
  [examen tf]

```

## Composition de fonctions (`g1-compose`, Gymnase)

_(f ∘ g)(x) = f(g(x)) : g d'abord. Et le domaine._

### Niveau 1

```
f(x) = √x et g(x) = 3x + 3. Calcule (f ∘ g)(x) et simplifie.
  [guided]  f(g(x))
    (Le domaine de f ∘ g est [−1 ; +∞[.)
    = f(□)   (trous : f(3x + 3))   ← g d'abord : g(x) = 3x + 3
    = √(3x + 3)   ← Remplacer x par 3x + 3 dans f
  aides : f ∘ g : on calcule d'abord g(x), puis on l'envoie dans l'autre fonction. | f(3x + 3) | √(3x + 3)
  pièges : g1_compose_order

f(x) = −2x − 2 et g(x) = 1/x. Calcule (g ∘ f)(x) et simplifie.
  [guided]  g(f(x))
    (Le domaine de g ∘ f est ]−∞ ; −1[ ∪ ]−1 ; +∞[.)
    = g(□)   (trous : g(−2x − 2))   ← f d'abord : f(x) = −2x − 2
    = 1/(−2x − 2)   ← Remplacer x par −2x − 2 dans g
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(−2x − 2) | 1/(−2x − 2)
  pièges : g1_compose_order

f(x) = 1/x et g(x) = 3x + 1. Calcule (g ∘ f)(x) et simplifie.
  [guided]  g(f(x))
    (Le domaine de g ∘ f est ]−∞ ; 0[ ∪ ]0 ; +∞[.)
    = g(□)   (trous : g(1/x))   ← f d'abord : f(x) = 1/x
    = 3(1/x) + 1   ← Remplacer x par 1/x dans g
    = 3/x + 1   ← Simplifier
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(1/x) | 3(1/x) + 1
  pièges : g1_compose_order

```

### Niveau 2

```
f(x) = √x et g(x) = −2x + 2. Calcule (g ∘ f)(x) et simplifie.
  [guided]  g(f(x))
    (Le domaine de g ∘ f est [0 ; +∞[.)
    = g(√x)   ← f d'abord : f(x) = √x
    = −2√x + 2   ← Remplacer x par √x dans g
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(√x) | −2√x + 2
  pièges : g1_compose_order

f(x) = −2x − 2 et g(x) = x². Calcule (f ∘ g)(x) et simplifie.
  [guided]  f(g(x))
    (Le domaine de f ∘ g est ℝ.)
    = f(x²)   ← g d'abord : g(x) = x²
    = −2x² − 2   ← Remplacer x par x² dans f
  aides : f ∘ g : on calcule d'abord g(x), puis on l'envoie dans l'autre fonction. | f(x²) | −2x² − 2
  pièges : g1_compose_order

f(x) = √x et g(x) = 4 − x². Calcule (g ∘ f)(x) et simplifie.
  [guided]  g(f(x))
    (Le domaine de g ∘ f est [0 ; +∞[.)
    = g(√x)   ← f d'abord : f(x) = √x
    = 4 − (√x)²   ← Remplacer x par √x dans g
    = 4 − x   ← Simplifier
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(√x) | 4 − (√x)²
  pièges : g1_compose_order

```

### Niveau 3

```
f(x) = 1/(x − 2) et g(x) = 1/x. Calcule (f ∘ g)(x) et simplifie, puis donne son domaine.
  [tap, suivre l'erreur, menu steps]  f(g(x))
    ? Pour f ∘ g, quelle fonction applique-t-on d'abord ? ✔ g d'abord / · f d'abord
    = f(1/x)   ← g d'abord : g(x) = 1/x
    = 1/((1/x) − 2)   ← Remplacer x par 1/x dans f
    = x/(1 − 2x)   ← Simplifier
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = ]−∞ ; 0[ ∪ ]0 ; 1/2[ ∪ ]1/2 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : f ∘ g : on calcule d'abord g(x), puis on l'envoie dans l'autre fonction. | f(1/x) | 1/((1/x) − 2)
  pièges : g1_compose_order

f(x) = 1/(x − 1) et g(x) = 1/x. Calcule (g ∘ f)(x) et simplifie, puis donne son domaine.
  [tap, suivre l'erreur, menu steps]  g(f(x))
    ? Pour g ∘ f, quelle fonction applique-t-on d'abord ? ✔ f d'abord / · g d'abord
    = g(1/(x − 1))   ← f d'abord : f(x) = 1/(x − 1)
    = 1/(1/(x − 1))   ← Remplacer x par 1/(x − 1) dans g
    = x − 1   ← Simplifier
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(1/(x − 1)) | 1/(1/(x − 1))
  pièges : g1_compose_order

f(x) = √x et g(x) = 1 − x². Calcule (g ∘ f)(x) et simplifie, puis donne son domaine.
  [tap, suivre l'erreur, menu steps]  g(f(x))
    ? Pour g ∘ f, quelle fonction applique-t-on d'abord ? ✔ f d'abord / · g d'abord
    = g(√x)   ← f d'abord : f(x) = √x
    = 1 − (√x)²   ← Remplacer x par √x dans g
    = 1 − x   ← Simplifier
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = [0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(√x) | 1 − (√x)²
  pièges : g1_compose_order

```

### Niveau 4

```
f(x) = √x et g(x) = −2x + 3. Calcule (f ∘ g)(x) et (g ∘ f)(x), simplifie, et donne leurs domaines.
  [free, suivre l'erreur]  f(g(x))
    = f(−2x + 3)   ← g d'abord : g(x) = −2x + 3
    = √(−2x + 3)   ← Remplacer x par −2x + 3 dans f
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = ]−∞ ; 3/2]   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (g ∘ f)(x) :  [juge equiv]  départ : g(f(x))
    = g(√x)   ← f d'abord : f(x) = √x
    = −2√x + 3   ← Remplacer x par √x dans g
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = [0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : f ∘ g : on calcule d'abord g(x), puis on l'envoie dans l'autre fonction. | f(−2x + 3) | √(−2x + 3)
  pièges : g1_compose_order

f(x) = 1/x et g(x) = 3x + 2. Calcule (g ∘ f)(x) et (f ∘ g)(x), simplifie, et donne leurs domaines.
  [free, suivre l'erreur]  g(f(x))
    = g(1/x)   ← f d'abord : f(x) = 1/x
    = 3(1/x) + 2   ← Remplacer x par 1/x dans g
    = 3/x + 2   ← Simplifier
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (f ∘ g)(x) :  [juge equiv]  départ : f(g(x))
    = f(3x + 2)   ← g d'abord : g(x) = 3x + 2
    = 1/(3x + 2)   ← Remplacer x par 3x + 2 dans f
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = ]−∞ ; −2/3[ ∪ ]−2/3 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(1/x) | 3(1/x) + 2
  pièges : g1_compose_order

f(x) = √x et g(x) = 3x − 2. Calcule (g ∘ f)(x) et (f ∘ g)(x), simplifie, et donne leurs domaines.
  [free, suivre l'erreur]  g(f(x))
    = g(√x)   ← f d'abord : f(x) = √x
    = 3√x − 2   ← Remplacer x par √x dans g
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = [0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (f ∘ g)(x) :  [juge equiv]  départ : f(g(x))
    = f(3x − 2)   ← g d'abord : g(x) = 3x − 2
    = √(3x − 2)   ← Remplacer x par 3x − 2 dans f
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = [2/3 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  aides : g ∘ f : on calcule d'abord f(x), puis on l'envoie dans l'autre fonction. | g(√x) | 3√x − 2
  pièges : g1_compose_order

```

### Niveau 5

```
f(x) = √x et g(x) = 4 − x². Calcule (g ∘ f)(x) et (f ∘ g)(x), simplifie, et donne leurs domaines.
  [free, sans aide]  g(f(x))
    = g(√x)   ← f d'abord : f(x) = √x
    = 4 − (√x)²   ← Remplacer x par √x dans g
    = 4 − x   ← Simplifier
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = [0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (f ∘ g)(x) :  [juge equiv]  départ : f(g(x))
    = f(4 − x²)   ← g d'abord : g(x) = 4 − x²
    = √(4 − x²)   ← Remplacer x par 4 − x² dans f
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = [−2 ; 2]   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  pièges : g1_compose_order

f(x) = 1/x et g(x) = −2x − 3. Calcule (f ∘ g)(x) et (g ∘ f)(x), simplifie, et donne leurs domaines.
  [free, sans aide]  f(g(x))
    = f(−2x − 3)   ← g d'abord : g(x) = −2x − 3
    = 1/(−2x − 3)   ← Remplacer x par −2x − 3 dans f
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = ]−∞ ; −3/2[ ∪ ]−3/2 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (g ∘ f)(x) :  [juge equiv]  départ : g(f(x))
    = g(1/x)   ← f d'abord : f(x) = 1/x
    = −2(1/x) − 3   ← Remplacer x par 1/x dans g
    = −2/x − 3   ← Simplifier
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = ]−∞ ; 0[ ∪ ]0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  pièges : g1_compose_order

f(x) = 9 − x² et g(x) = √x. Calcule (g ∘ f)(x) et (f ∘ g)(x), simplifie, et donne leurs domaines.
  [free, sans aide]  g(f(x))
    = g(9 − x²)   ← f d'abord : f(x) = 9 − x²
    = √(9 − x²)   ← Remplacer x par 9 − x² dans g
  — Domaine de g ∘ f :  [juge solset]  départ : g(f(x))
    = [−3 ; 3]   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  — Puis (f ∘ g)(x) :  [juge equiv]  départ : f(g(x))
    = f(√x)   ← g d'abord : g(x) = √x
    = 9 − (√x)²   ← Remplacer x par √x dans f
    = 9 − x   ← Simplifier
  — Domaine de f ∘ g :  [juge solset]  départ : f(g(x))
    = [0 ; +∞[   ← Domaine : x doit être dans le domaine de la fonction intérieure, et l'expression brute définie
  pièges : g1_compose_order

```

### Variantes d'examen

```
f(x) = 2x + 1 et g(x) = x². Alors (f ∘ g)(x) =
  · (2x + 1)², sur ℝ [g1_compose_order]   · (2x + 1)·x², sur ℝ   ✔ 2x² + 1, sur ℝ
  [examen mcq]
  pièges : g1_compose_order

Vrai ou faux ?
  « Pour f(x) = 2x et g(x) = x + 1, on a f ∘ g = g ∘ f. » → FAUX
    contre-exemple (refute) : x = 0
  [examen tf]

```

## Fonction réciproque : l'expliciter (`g1-inverse`, Gymnase)

_Résoudre y = f(x) en x, garder la solution de l'ensemble de départ._

### Niveau 1

```
f : ℝ → ℝ, f(x) = 3x − 4 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  3x − 4 = y
    = 3x = y + 4   ← Ajouter 4
    = x = (y + 4)/□   (trous : x = (y + 4)/3)   ← Diviser par 3
  — Renomme la variable :  [juge equiv]  départ : (y + 4)/3
    = (x + 4)/3   ← Renommer y en x
  aides : Résous y = f(x) en x. | 3x = y + 4 | x = (y + 4)/3

f : ℝ → ℝ, f(x) = 4x + 6 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  4x + 6 = y
    = 4x = y − 6   ← Soustraire 6
    = x = (y − 6)/□   (trous : x = (y − 6)/4)   ← Diviser par 4
  — Renomme la variable :  [juge equiv]  départ : (y − 6)/4
    = (x − 6)/4   ← Renommer y en x
  aides : Résous y = f(x) en x. | 4x = y − 6 | x = (y − 6)/4

f : ℝ → ℝ, f(x) = −2x + 5 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  −2x + 5 = y
    = −2x = y − 5   ← Soustraire 5
    = x = (−y + 5)/□   (trous : x = (−y + 5)/2)   ← Diviser par −2
  — Renomme la variable :  [juge equiv]  départ : (−y + 5)/2
    = (−x + 5)/2   ← Renommer y en x
  aides : Résous y = f(x) en x. | −2x = y − 5 | x = (−y + 5)/2

```

### Niveau 2

```
f : ℝ ∖ {1/3} → ℝ ∖ {1/3}, f(x) = (x + 2)/(3x − 1) est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  (x + 2)/(3x − 1) = y
    = y(3x − 1) = x + 2   ← Multiplier par le dénominateur
    = x(3y − 1) = y + 2   ← Regrouper les termes en x
    = x = (y + 2)/(3y − 1)   ← Diviser : 3y − 1 ≠ 0 car y ≠ 1/3
  — Renomme la variable :  [juge equiv]  départ : (y + 2)/(3y − 1)
    = (x + 2)/(3x − 1)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ℝ∖{1/3}. | x(3y − 1) = y + 2 | x = (y + 2)/(3y − 1)

f : ℝ ∖ {1/3} → ℝ ∖ {1}, f(x) = (3x − 2)/(3x − 1) est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  (3x − 2)/(3x − 1) = y
    = y(3x − 1) = 3x − 2   ← Multiplier par le dénominateur
    = x(3y − 3) = y − 2   ← Regrouper les termes en x
    = x = (y − 2)/(3y − 3)   ← Diviser : 3y − 3 ≠ 0 car y ≠ 1
  — Renomme la variable :  [juge equiv]  départ : (y − 2)/(3y − 3)
    = (x − 2)/(3x − 3)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ℝ∖{1/3}. | x(3y − 3) = y − 2 | x = (y − 2)/(3y − 3)

f : ℝ ∖ {−1/2} → ℝ ∖ {−1/2}, f(x) = (−x)/(2x + 1) est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [guided]  (−x)/(2x + 1) = y
    = y(2x + 1) = −x   ← Multiplier par le dénominateur
    = x(2y + 1) = −y   ← Regrouper les termes en x
    = x = −y/(2y + 1)   ← Diviser : 2y + 1 ≠ 0 car y ≠ −1/2
  — Renomme la variable :  [juge equiv]  départ : −y/(2y + 1)
    = −x/(2x + 1)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ℝ∖{−1/2}. | x(2y + 1) = −y | x = −y/(2y + 1)

```

### Niveau 3

```
f : [1 ; +∞[ → [−2 ; +∞[, f(x) = x² − 2x − 1 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [tap, suivre l'erreur, menu steps]  x² − 2x − 1 = y
    = (x − 1)² − 2 = y   ← Faire apparaître un carré
    = (x − 1)² = y + 2   ← Isoler le carré
    = x = 1 + √(y + 2) ou x = 1 − √(y + 2)   ← Deux racines
    ? Quelle racine garder ? ✔ x = 1 + √(y + 2) / · x = 1 − √(y + 2) / · Les deux
    = x = 1 + √(y + 2)   ← x ≥ 1 : on garde la racine +
  — Renomme la variable :  [juge equiv]  départ : 1 + √(y + 2)
    = 1 + √(x + 2)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans [1;+∞[. | x = 1 + √(y + 2) ou x = 1 − √(y + 2) | x = 1 + √(y + 2)
  pièges : g1_inverse_branch

f : ]−∞ ; 1] → [2 ; +∞[, f(x) = x² − 2x + 3 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [tap, suivre l'erreur, menu steps]  x² − 2x + 3 = y
    = (x − 1)² + 2 = y   ← Faire apparaître un carré
    = (x − 1)² = y − 2   ← Isoler le carré
    = x = 1 − √(y − 2) ou x = 1 + √(y − 2)   ← Deux racines
    ? Quelle racine garder ? ✔ x = 1 − √(y − 2) / · x = 1 + √(y − 2) / · Les deux
    = x = 1 − √(y − 2)   ← x ≤ 1 : on garde la racine −
  — Renomme la variable :  [juge equiv]  départ : 1 − √(y − 2)
    = 1 − √(x − 2)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ]−∞;1]. | x = 1 − √(y − 2) ou x = 1 + √(y − 2) | x = 1 − √(y − 2)
  pièges : g1_inverse_branch

f : ]−∞ ; −2] → [2 ; +∞[, f(x) = x² + 4x + 6 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [tap, suivre l'erreur, menu steps]  x² + 4x + 6 = y
    = (x + 2)² + 2 = y   ← Faire apparaître un carré
    = (x + 2)² = y − 2   ← Isoler le carré
    = x = −2 − √(y − 2) ou x = −2 + √(y − 2)   ← Deux racines
    ? Quelle racine garder ? ✔ x = −2 − √(y − 2) / · x = −2 + √(y − 2) / · Les deux
    = x = −2 − √(y − 2)   ← x ≤ −2 : on garde la racine −
  — Renomme la variable :  [juge equiv]  départ : −2 − √(y − 2)
    = −2 − √(x − 2)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ]−∞;−2]. | x = −2 − √(y − 2) ou x = −2 + √(y − 2) | x = −2 − √(y − 2)
  pièges : g1_inverse_branch

```

### Niveau 4

```
f : [1 ; +∞[ → [−1 ; +∞[, f(x) = x² − 2x est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, suivre l'erreur]  x² − 2x = y
    = (x − 1)² − 1 = y   ← Faire apparaître un carré
    = (x − 1)² = y + 1   ← Isoler le carré
    = x = 1 + √(y + 1) ou x = 1 − √(y + 1)   ← Deux racines
    = x = 1 + √(y + 1)   ← x ≥ 1 : on garde la racine +
  — Renomme la variable :  [juge equiv]  départ : 1 + √(y + 1)
    = 1 + √(x + 1)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans [1;+∞[. | x = 1 + √(y + 1) ou x = 1 − √(y + 1) | x = 1 + √(y + 1)

f : [2 ; +∞[ → [0 ; +∞[, f(x) = x² − 4x + 4 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, suivre l'erreur]  x² − 4x + 4 = y
    = (x − 2)² = y   ← Faire apparaître un carré
    = x = 2 + √(y) ou x = 2 − √(y)   ← Deux racines
    = x = 2 + √(y)   ← x ≥ 2 : on garde la racine +
  — Renomme la variable :  [juge equiv]  départ : 2 + √(y)
    = 2 + √(x)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans [2;+∞[. | x = 2 + √(y) ou x = 2 − √(y) | x = 2 + √(y)

f : ℝ ∖ {3} → ℝ ∖ {4}, f(x) = (−4x − 3)/(−x + 3) est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, suivre l'erreur]  (−4x − 3)/(−x + 3) = y
    = y(−x + 3) = −4x − 3   ← Multiplier par le dénominateur
    = x(−y + 4) = −3y − 3   ← Regrouper les termes en x
    = x = (−3y − 3)/(−y + 4)   ← Diviser : −y + 4 ≠ 0 car y ≠ 4
  — Renomme la variable :  [juge equiv]  départ : (−3y − 3)/(−y + 4)
    = (−3x − 3)/(−x + 4)   ← Renommer y en x
  aides : Résous y = f(x) en x, puis garde la solution qui est dans ℝ∖{3}. | x(−y + 4) = −3y − 3 | x = (−3y − 3)/(−y + 4)

```

### Niveau 5

```
f : [2 ; +∞[ → [−3 ; +∞[, f(x) = √(x − 2) − 3 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, sans aide]  √(x − 2) − 3 = y
    = √(x − 2) = y + 3   ← Isoler la racine
    = x − 2 = (y + 3)²   ← Élever au carré : y ≥ −3, les deux membres sont ≥ 0
    = x = (y + 3)² + 2   ← Isoler x
  — Renomme la variable :  [juge equiv]  départ : (y + 3)² + 2
    = (x + 3)² + 2   ← Renommer y en x

f : [−2 ; +∞[ → [1 ; +∞[, f(x) = x² + 4x + 5 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, sans aide]  x² + 4x + 5 = y
    = (x + 2)² + 1 = y   ← Faire apparaître un carré
    = (x + 2)² = y − 1   ← Isoler le carré
    = x = −2 + √(y − 1) ou x = −2 − √(y − 1)   ← Deux racines
    = x = −2 + √(y − 1)   ← x ≥ −2 : on garde la racine +
  — Renomme la variable :  [juge equiv]  départ : −2 + √(y − 1)
    = −2 + √(x − 1)   ← Renommer y en x

f : [1 ; +∞[ → [3 ; +∞[, f(x) = √(x − 1) + 3 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [free, sans aide]  √(x − 1) + 3 = y
    = √(x − 1) = y − 3   ← Isoler la racine
    = x − 1 = (y − 3)²   ← Élever au carré : y ≥ 3, les deux membres sont ≥ 0
    = x = (y − 3)² + 1   ← Isoler x
  — Renomme la variable :  [juge equiv]  départ : (y − 3)² + 1
    = (x − 3)² + 1   ← Renommer y en x

```

### Variantes d'examen

```
f : ℝ ∖ {2} → ℝ ∖ {−1}, f(x) = (−x − 4)/(x − 2). Alors f⁻¹(x) =
  · (−x − 4)/(x − 2)   ✔ (2x − 4)/(x + 1)   · 1/((−x − 4)/(x − 2)) [g1_inverse_reciprocal]
  [examen mcq]
  pièges : g1_inverse_reciprocal

f : [2 ; +∞[ → [0 ; +∞[, f(x) = x² − 4x + 4 est bijective. Résous y = f(x) en x, puis explicite f⁻¹.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 2 ; Renomme la variable : 1)
    [free, sans aide, suivre l'erreur, examen open]  x² − 4x + 4 = y
      = (x − 2)² = y   ← Faire apparaître un carré
      = x = 2 + √(y) ou x = 2 − √(y)   ← Deux racines
      = x = 2 + √(y)   ← x ≥ 2 : on garde la racine +
    — Renomme la variable :  [juge equiv]  départ : 2 + √(y)
      = 2 + √(x)   ← Renommer y en x

```

## Injectivité : prouver ou réfuter (`g1-injective`, Gymnase)

_f(a) = f(b) ⇒ a = b, ou deux valeurs qui ont la même image._

### Niveau 1

```
Preuve : f(x) = x² + 6x est injective sur ]−∞ ; −3].Soient a, b ∈ ]−∞ ; −3] tels que a² + 6a = b² + 6b.…Sur ]−∞ ; −3], a ≤ −3 et b ≤ −3, donc a + b + 6 ≤ 0, avec égalité seulement si a = b = −3.Dans les deux cas, a − b = 0 : a = b.Donc f est injective sur ]−∞ ; −3].Quel bloc manque ?
  ✔ (a − b)(a + b + 6) = 0 (tout à gauche, puis factoriser)   · (a − b)(a + b + 6) = 0, donc a = b. [g1_inj_square]
  pièges : g1_inj_square

Preuve : f(x) = x + 1/x est injective sur [1 ; +∞[.Soient a, b ∈ [1 ; +∞[ tels que a + 1/a = b + 1/b.…Sur [1 ; +∞[, a et b ont le même signe et |a|, |b| ≥ 1, donc ab ≥ 1, avec ab = 1 seulement si a = b = 1.Dans les deux cas, a − b = 0 : a = b.Donc f est injective sur [1 ; +∞[.Quel bloc manque ?
  · (a − b)(ab − 1) = 0, donc a = b. [g1_inj_square]   ✔ (a − b)(ab − 1) = 0 (multiplier par ab, puis factoriser)
  pièges : g1_inj_square

Preuve : f(x) = x² + 4x est injective sur [−2 ; +∞[.Soient a, b ∈ [−2 ; +∞[ tels que a² + 4a = b² + 4b.…Sur [−2 ; +∞[, a ≥ −2 et b ≥ −2, donc a + b + 4 ≥ 0, avec égalité seulement si a = b = −2.Dans les deux cas, a − b = 0 : a = b.Donc f est injective sur [−2 ; +∞[.Quel bloc manque ?
  ✔ (a − b)(a + b + 4) = 0 (tout à gauche, puis factoriser)   · (a − b)(a + b + 4) = 0, donc a = b. [g1_inj_square]
  pièges : g1_inj_square

```

### Niveau 2

```
Montre que f(x) = x² − 4x est injective sur [2 ; +∞[. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soient a, b ∈ [2 ; +∞[ tels que a² − 4a = b² − 4b.
    2. (a − b)(a + b − 4) = 0 (tout à gauche, puis factoriser)
    3. Sur [2 ; +∞[, a ≥ 2 et b ≥ 2, donc a + b − 4 ≥ 0, avec égalité seulement si a = b = 2.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur [2 ; +∞[.
    ✗ (a − b)(a + b − 4) = 0, donc a = b. [g1_inj_square]
  pièges : g1_inj_square

Montre que f(x) = (2x − 4)/(x + 4) est injective sur ℝ ∖ {−4}. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soient a, b ∈ ℝ ∖ {−4} tels que (2a − 4)/(a + 4) = (2b − 4)/(b + 4).
    2. (2a − 4)(b + 4) = (2b − 4)(a + 4) (produit en croix)
    3. 8a − 4b = 8b − 4a (les termes en ab et les constantes s'éliminent)
    4. −12(b − a) = 0, et −12 ≠ 0, donc a = b.
    5. Donc f est injective sur ℝ ∖ {−4}.
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
  pièges : g9_proof_by_example

Montre que f(x) = (−2x + 1)/(x − 2) est injective sur ℝ ∖ {2}. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soient a, b ∈ ℝ ∖ {2} tels que (−2a + 1)/(a − 2) = (−2b + 1)/(b − 2).
    2. (−2a + 1)(b − 2) = (−2b + 1)(a − 2) (produit en croix)
    3. 4a + 1b = 4b + 1a (les termes en ab et les constantes s'éliminent)
    4. −3(b − a) = 0, et −3 ≠ 0, donc a = b.
    5. Donc f est injective sur ℝ ∖ {2}.
    ✗ Si a = b, alors f(a) = f(b) : f est injective. [g9_converse_contra]
  pièges : g9_converse_contra

```

### Niveau 3

```
Montre que f(x) = x² + 4x est injective sur ]−∞ ; −2]. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? f(x) = x² + 4x est-elle injective sur ]−∞;−2] ? ✔ Oui : je pars de f(a) = f(b) / · Non : je cherche a ≠ b avec f(a) = f(b)
    1. Soient a, b ∈ ]−∞ ; −2] tels que a² + 4a = b² + 4b.
    2. (a − b)(a + b + 4) = 0 (tout à gauche, puis factoriser)
    3. Sur ]−∞ ; −2], a ≤ −2 et b ≤ −2, donc a + b + 4 ≤ 0, avec égalité seulement si a = b = −2.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur ]−∞ ; −2].
    ✗ (a − b)(a + b + 4) = 0, donc a = b. [g1_inj_square]
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
  pièges : g1_inj_square, g9_proof_by_example

Montre que f(x) = (−2x + 4)/(x + 3) est injective sur ℝ ∖ {−3}. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? f(x) = (−2x + 4)/(x + 3) est-elle injective sur ℝ∖{−3} ? ✔ Oui : je pars de f(a) = f(b) / · Non : je cherche a ≠ b avec f(a) = f(b)
    1. Soient a, b ∈ ℝ ∖ {−3} tels que (−2a + 4)/(a + 3) = (−2b + 4)/(b + 3).
    2. (−2a + 4)(b + 3) = (−2b + 4)(a + 3) (produit en croix)
    3. −6a + 4b = −6b + 4a (les termes en ab et les constantes s'éliminent)
    4. 10(b − a) = 0, et 10 ≠ 0, donc a = b.
    5. Donc f est injective sur ℝ ∖ {−3}.
    ✗ Si a = b, alors f(a) = f(b) : f est injective. [g9_converse_contra]
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

Montre que f(x) = x + 1/x est injective sur [1 ; +∞[. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? f(x) = x + 1/x est-elle injective sur [1;+∞[ ? ✔ Oui : je pars de f(a) = f(b) / · Non : je cherche a ≠ b avec f(a) = f(b)
    1. Soient a, b ∈ [1 ; +∞[ tels que a + 1/a = b + 1/b.
    2. (a − b)(ab − 1) = 0 (multiplier par ab, puis factoriser)
    3. Sur [1 ; +∞[, a et b ont le même signe et |a|, |b| ≥ 1, donc ab ≥ 1, avec ab = 1 seulement si a = b = 1.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur [1 ; +∞[.
    ✗ (a − b)(ab − 1) = 0, donc a = b. [g1_inj_square]
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
  pièges : g1_inj_square, g9_proof_by_example

```

### Niveau 4

```
Montre que f(x) = x + 4/x est injective sur [2 ; +∞[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soient a, b ∈ [2 ; +∞[ tels que a + 4/a = b + 4/b.
    2. (a − b)(ab − 4) = 0 (multiplier par ab, puis factoriser)   [à écrire : Multiplie par ab et factorise : (a-b)(ab-4)=0]
    3. Sur [2 ; +∞[, a et b ont le même signe et |a|, |b| ≥ 2, donc ab ≥ 4, avec ab = 4 seulement si a = b = 2.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur [2 ; +∞[.
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    ✗ (a − b)(ab − 4) = 0, donc a = b. [g1_inj_square]
  pièges : g9_proof_by_example, g1_inj_square

Montre que f(x) = (3x − 2)/(x + 1) est injective sur ℝ ∖ {−1}. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soient a, b ∈ ℝ ∖ {−1} tels que (3a − 2)/(a + 1) = (3b − 2)/(b + 1).
    2. (3a − 2)(b + 1) = (3b − 2)(a + 1) (produit en croix)   [à écrire : Produit en croix : (3a-2)(b+1)=(3b-2)(a+1)]
    3. 3a − 2b = 3b − 2a (les termes en ab et les constantes s'éliminent)
    4. −5(b − a) = 0, et −5 ≠ 0, donc a = b.   [à écrire : Factorise : -5(b-a)=0]
    5. Donc f est injective sur ℝ ∖ {−1}.
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    ✗ Si a = b, alors f(a) = f(b) : f est injective. [g9_converse_contra]
  pièges : g9_proof_by_example, g9_converse_contra

Montre que f(x) = x + 4/x est injective sur ]−∞ ; −2]. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soient a, b ∈ ]−∞ ; −2] tels que a + 4/a = b + 4/b.
    2. (a − b)(ab − 4) = 0 (multiplier par ab, puis factoriser)   [à écrire : Multiplie par ab et factorise : (a-b)(ab-4)=0]
    3. Sur ]−∞ ; −2], a et b ont le même signe et |a|, |b| ≥ 2, donc ab ≥ 4, avec ab = 4 seulement si a = b = −2.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur ]−∞ ; −2].
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    ✗ (a − b)(ab − 4) = 0, donc a = b. [g1_inj_square]
  pièges : g9_proof_by_example, g1_inj_square

```

### Niveau 5

```
Montre que f(x) = x² − 2x est injective sur [1 ; +∞[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soient a, b ∈ [1 ; +∞[ tels que a² − 2a = b² − 2b.
    2. (a − b)(a + b − 2) = 0 (tout à gauche, puis factoriser)   [à écrire : Tout à gauche et factorise : (a-b)(a+b-2)=0]
    3. Sur [1 ; +∞[, a ≥ 1 et b ≥ 1, donc a + b − 2 ≥ 0, avec égalité seulement si a = b = 1.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur [1 ; +∞[.
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    ✗ (a − b)(a + b − 2) = 0, donc a = b. [g1_inj_square]
  pièges : g9_proof_by_example, g1_inj_square

Montre que f(x) = x + 1/x est injective sur ]−∞ ; −1]. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soient a, b ∈ ]−∞ ; −1] tels que a + 1/a = b + 1/b.
    2. (a − b)(ab − 1) = 0 (multiplier par ab, puis factoriser)   [à écrire : Multiplie par ab et factorise : (a-b)(ab-1)=0]
    3. Sur ]−∞ ; −1], a et b ont le même signe et |a|, |b| ≥ 1, donc ab ≥ 1, avec ab = 1 seulement si a = b = −1.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur ]−∞ ; −1].
    ✗ (a − b)(ab − 1) = 0, donc a = b. [g1_inj_square]
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
  pièges : g1_inj_square, g9_proof_by_example

Montre que f(x) = x² − 4x est injective sur [2 ; +∞[. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soient a, b ∈ [2 ; +∞[ tels que a² − 4a = b² − 4b.
    2. (a − b)(a + b − 4) = 0 (tout à gauche, puis factoriser)   [à écrire : Tout à gauche et factorise : (a-b)(a+b-4)=0]
    3. Sur [2 ; +∞[, a ≥ 2 et b ≥ 2, donc a + b − 4 ≥ 0, avec égalité seulement si a = b = 2.
    4. Dans les deux cas, a − b = 0 : a = b.
    5. Donc f est injective sur [2 ; +∞[.
    ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    ✗ (a − b)(a + b − 4) = 0, donc a = b. [g1_inj_square]
  pièges : g9_proof_by_example, g1_inj_square

```

### Variantes d'examen

```
Vrai ou faux ?
  « x ↦ |x − 1| est injective sur [0 ; 3]. » → FAUX
    contre-exemple (refute) : a = 0, b = 2
  [examen tf]

Montre que f(x) = (x + 1)/(x − 1) est injective sur ℝ ∖ {1}. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [blocs frame, sans aide]
      1. Soient a, b ∈ ℝ ∖ {1} tels que (a + 1)/(a − 1) = (b + 1)/(b − 1).
      2. (a + 1)(b − 1) = (b + 1)(a − 1) (produit en croix)   [à écrire : Produit en croix : (a+1)(b-1)=(b+1)(a-1)]
      3. −1a + 1b = −1b + 1a (les termes en ab et les constantes s'éliminent)
      4. 2(b − a) = 0, et 2 ≠ 0, donc a = b.   [à écrire : Factorise : 2(b-a)=0]
      5. Donc f est injective sur ℝ ∖ {1}.
      ✗ Si a = b, alors f(a) = f(b) : f est injective. [g9_converse_contra]
      ✗ f(0) ≠ f(1), donc f est injective. [g9_proof_by_example]
    [examen open]
  pièges : g9_converse_contra, g9_proof_by_example

```

## Surjectivité, bijection, ensemble d'arrivée (`g1-surjective`, CMS)

_Un antécédent pour chaque y, et dans l'ensemble de départ._

### Niveau 1

```
Preuve : f : ℝ ∖ {−4} → ℝ ∖ {2}, f(x) = (2x − 4)/(x + 4) est surjective, et explicite f⁻¹.Soit y ≠ 2. On cherche x ≠ −4 avec (2x − 4)/(x + 4) = y.y(x + 4) = 2x − 4x(y − 2) = −4y − 4y ≠ 2, donc x = (−4y − 4)/(y − 2).…Donc f est surjective ; elle est aussi injective, donc bijective.f⁻¹(x) = (−4x − 4)/(x − 2), x ≠ 2.Quel bloc manque ?
  ✔ x ≠ −4 : sinon −4y − 4 = −4(y − 2), soit −12 = 0, impossible. La solution est dans ℝ ∖ {−4}.   · On trouve une solution x, donc f est surjective. [g1_surj_domain]
  pièges : g1_surj_domain

Preuve : f : ]−∞ ; −1] → ]−∞ ; −2], f(x) = x + 1/x est surjective, et explicite f⁻¹.Soit y ≤ −2. On cherche x ∈ ]−∞ ; −1] avec x + 1/x = y.x² − yx + 1 = 0 (multiplier par x ≠ 0)Δ = y² − 4 ≥ 0, car |y| ≥ 2.x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2.…Donc f est surjective ; elle est aussi injective, donc bijective.f⁻¹(x) = (x − √(x² − 4))/2, x ∈ ]−∞ ; −2].Quel bloc manque ?
  ✔ (y − √(y² − 4))/2 ≤ y/2 ≤ −1 : cette solution est dans ]−∞ ; −1].   · Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
  pièges : g1_surj_domain

Preuve : f : ℝ ∖ {−3} → ℝ ∖ {1}, f(x) = (x − 3)/(x + 3) est surjective, et explicite f⁻¹.Soit y ≠ 1. On cherche x ≠ −3 avec (x − 3)/(x + 3) = y.y(x + 3) = x − 3x(y − 1) = −3y − 3y ≠ 1, donc x = (−3y − 3)/(y − 1).…Donc f est surjective ; elle est aussi injective, donc bijective.f⁻¹(x) = (−3x − 3)/(x − 1), x ≠ 1.Quel bloc manque ?
  · On trouve une solution x, donc f est surjective. [g1_surj_domain]   ✔ x ≠ −3 : sinon −3y − 3 = −3(y − 1), soit −6 = 0, impossible. La solution est dans ℝ ∖ {−3}.
  pièges : g1_surj_domain

```

### Niveau 2

```
Montre que f : ℝ ∖ {−2} → ℝ ∖ {−3}, f(x) = (−3x − 4)/(x + 2) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit y ≠ −3. On cherche x ≠ −2 avec (−3x − 4)/(x + 2) = y.
    2. y(x + 2) = −3x − 4
    3. x(y + 3) = −2y − 4
    4. y ≠ −3, donc x = (−2y − 4)/(y + 3).
    5. x ≠ −2 : sinon −2y − 4 = −2(y + 3), soit 2 = 0, impossible. La solution est dans ℝ ∖ {−2}.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (−2x − 4)/(x + 3), x ≠ −3.
    ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
  pièges : g1_surj_domain

Montre que f : ]−∞ ; −2] → ]−∞ ; −4], f(x) = x + 4/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit y ≤ −4. On cherche x ∈ ]−∞ ; −2] avec x + 4/x = y.
    2. x² − yx + 4 = 0 (multiplier par x ≠ 0)
    3. Δ = y² − 16 ≥ 0, car |y| ≥ 4.
    4. x = (y + √(y² − 16))/2 ou x = (y − √(y² − 16))/2.
    5. (y − √(y² − 16))/2 ≤ y/2 ≤ −2 : cette solution est dans ]−∞ ; −2].
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x − √(x² − 16))/2, x ∈ ]−∞ ; −4].
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
  pièges : g1_surj_domain

Montre que f : [1 ; +∞[ → [2 ; +∞[, f(x) = x + 1/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Soit y ≥ 2. On cherche x ∈ [1 ; +∞[ avec x + 1/x = y.
    2. x² − yx + 1 = 0 (multiplier par x ≠ 0)
    3. Δ = y² − 4 ≥ 0, car |y| ≥ 2.
    4. x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2.
    5. (y + √(y² − 4))/2 ≥ y/2 ≥ 1 : cette solution est dans [1 ; +∞[.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x + √(x² − 4))/2, x ∈ [2 ; +∞[.
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
  pièges : g1_surj_domain

```

### Niveau 3

```
Montre que f : ℝ ∖ {1} → ℝ ∖ {2}, f(x) = (2x − 1)/(x − 1) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pour quel ensemble d'arrivée B la fonction f(x) = (2x − 1)/(x − 1), définie sur ℝ∖{1}, est-elle surjective ? ✔ ℝ∖{2} / · ℝ / · ℝ∖{1}
    1. Soit y ≠ 2. On cherche x ≠ 1 avec (2x − 1)/(x − 1) = y.
    2. y(x − 1) = 2x − 1
    3. x(y − 2) = y − 1
    4. y ≠ 2, donc x = (y − 1)/(y − 2).
    5. x ≠ 1 : sinon y − 1 = 1(y − 2), soit 1 = 0, impossible. La solution est dans ℝ ∖ {1}.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x − 1)/(x − 2), x ≠ 2.
    ✗ f⁻¹(x) = (x − 1)/(2x − 1). [g1_inverse_reciprocal]
    ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
  pièges : g1_inverse_reciprocal, g1_surj_domain

Montre que f : ℝ ∖ {−4} → ℝ ∖ {2}, f(x) = (2x − 5)/(x + 4) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pour quel ensemble d'arrivée B la fonction f(x) = (2x − 5)/(x + 4), définie sur ℝ∖{−4}, est-elle surjective ? ✔ ℝ∖{2} / · ℝ / · ℝ∖{−4}
    1. Soit y ≠ 2. On cherche x ≠ −4 avec (2x − 5)/(x + 4) = y.
    2. y(x + 4) = 2x − 5
    3. x(y − 2) = −4y − 5
    4. y ≠ 2, donc x = (−4y − 5)/(y − 2).
    5. x ≠ −4 : sinon −4y − 5 = −4(y − 2), soit −13 = 0, impossible. La solution est dans ℝ ∖ {−4}.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (−4x − 5)/(x − 2), x ≠ 2.
    ✗ f⁻¹(x) = (x + 4)/(2x − 5). [g1_inverse_reciprocal]
    ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
  pièges : g1_inverse_reciprocal, g1_surj_domain

Montre que f : ]−∞ ; −1] → ]−∞ ; −2], f(x) = x + 1/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Pour quel ensemble d'arrivée B la fonction f(x) = x + 1/x, définie sur ]−∞;−1], est-elle surjective ? ✔ ]−∞;−2] / · ]−∞;−1] / · ℝ
    1. Soit y ≤ −2. On cherche x ∈ ]−∞ ; −1] avec x + 1/x = y.
    2. x² − yx + 1 = 0 (multiplier par x ≠ 0)
    3. Δ = y² − 4 ≥ 0, car |y| ≥ 2.
    4. x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2.
    5. (y − √(y² − 4))/2 ≤ y/2 ≤ −1 : cette solution est dans ]−∞ ; −1].
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x − √(x² − 4))/2, x ∈ ]−∞ ; −2].
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
    ✗ f⁻¹(x) = (x + √(x² − 4))/2. [g1_inverse_branch]
  pièges : g1_surj_domain, g1_inverse_branch

```

### Niveau 4

```
Montre que f : ℝ ∖ {−1} → ℝ ∖ {−1}, f(x) = (−x + 1)/(x + 1) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soit y ≠ −1. On cherche x ≠ −1 avec (−x + 1)/(x + 1) = y.
    2. y(x + 1) = −x + 1   [à écrire : Multiplie par le dénominateur : y(x+1)=-x+1]
    3. x(y + 1) = −y + 1   [à écrire : Regroupe les termes en x : x(y+1)=-y+1]
    4. y ≠ −1, donc x = (−y + 1)/(y + 1).
    5. x ≠ −1 : sinon −y + 1 = −1(y + 1), soit 2 = 0, impossible. La solution est dans ℝ ∖ {−1}.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (−x + 1)/(x + 1), x ≠ −1.
    ✗ f⁻¹(x) = (x + 1)/(−x + 1). [g1_inverse_reciprocal]
    ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
  pièges : g1_inverse_reciprocal, g1_surj_domain

Montre que f : [2 ; +∞[ → [4 ; +∞[, f(x) = x + 4/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soit y ≥ 4. On cherche x ∈ [2 ; +∞[ avec x + 4/x = y.
    2. x² − yx + 4 = 0 (multiplier par x ≠ 0)   [à écrire : Équation en x : x^2-yx+4=0]
    3. Δ = y² − 16 ≥ 0, car |y| ≥ 4.   [à écrire : Δ = y^2-16]
    4. x = (y + √(y² − 16))/2 ou x = (y − √(y² − 16))/2.
    5. (y + √(y² − 16))/2 ≥ y/2 ≥ 2 : cette solution est dans [2 ; +∞[.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x + √(x² − 16))/2, x ∈ [4 ; +∞[.
    ✗ f⁻¹(x) = (x − √(x² − 16))/2. [g1_inverse_branch]
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
  pièges : g1_inverse_branch, g1_surj_domain

Montre que f : [1 ; +∞[ → [2 ; +∞[, f(x) = x + 1/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame]
    1. Soit y ≥ 2. On cherche x ∈ [1 ; +∞[ avec x + 1/x = y.
    2. x² − yx + 1 = 0 (multiplier par x ≠ 0)   [à écrire : Équation en x : x^2-yx+1=0]
    3. Δ = y² − 4 ≥ 0, car |y| ≥ 2.   [à écrire : Δ = y^2-4]
    4. x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2.
    5. (y + √(y² − 4))/2 ≥ y/2 ≥ 1 : cette solution est dans [1 ; +∞[.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x + √(x² − 4))/2, x ∈ [2 ; +∞[.
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
    ✗ f⁻¹(x) = (x − √(x² − 4))/2. [g1_inverse_branch]
  pièges : g1_surj_domain, g1_inverse_branch

```

### Niveau 5

```
Montre que f : ℝ ∖ {−2} → ℝ ∖ {−2}, f(x) = (−2x + 5)/(x + 2) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soit y ≠ −2. On cherche x ≠ −2 avec (−2x + 5)/(x + 2) = y.
    2. y(x + 2) = −2x + 5   [à écrire : Multiplie par le dénominateur : y(x+2)=-2x+5]
    3. x(y + 2) = −2y + 5   [à écrire : Regroupe les termes en x : x(y+2)=-2y+5]
    4. y ≠ −2, donc x = (−2y + 5)/(y + 2).
    5. x ≠ −2 : sinon −2y + 5 = −2(y + 2), soit 9 = 0, impossible. La solution est dans ℝ ∖ {−2}.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (−2x + 5)/(x + 2), x ≠ −2.
    ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
    ✗ f⁻¹(x) = (x + 2)/(−2x + 5). [g1_inverse_reciprocal]
  pièges : g1_surj_domain, g1_inverse_reciprocal

Montre que f : [1 ; +∞[ → [2 ; +∞[, f(x) = x + 1/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soit y ≥ 2. On cherche x ∈ [1 ; +∞[ avec x + 1/x = y.
    2. x² − yx + 1 = 0 (multiplier par x ≠ 0)   [à écrire : Équation en x : x^2-yx+1=0]
    3. Δ = y² − 4 ≥ 0, car |y| ≥ 2.   [à écrire : Δ = y^2-4]
    4. x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2.
    5. (y + √(y² − 4))/2 ≥ y/2 ≥ 1 : cette solution est dans [1 ; +∞[.
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x + √(x² − 4))/2, x ∈ [2 ; +∞[.
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
    ✗ f⁻¹(x) = 1/(x + 1/x). [g1_inverse_reciprocal]
    ✗ f⁻¹(x) = (x − √(x² − 4))/2. [g1_inverse_branch]
  pièges : g1_surj_domain, g1_inverse_reciprocal, g1_inverse_branch

Montre que f : ]−∞ ; −2] → ]−∞ ; −4], f(x) = x + 4/x est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [blocs frame, sans aide]
    1. Soit y ≤ −4. On cherche x ∈ ]−∞ ; −2] avec x + 4/x = y.
    2. x² − yx + 4 = 0 (multiplier par x ≠ 0)   [à écrire : Équation en x : x^2-yx+4=0]
    3. Δ = y² − 16 ≥ 0, car |y| ≥ 4.   [à écrire : Δ = y^2-16]
    4. x = (y + √(y² − 16))/2 ou x = (y − √(y² − 16))/2.
    5. (y − √(y² − 16))/2 ≤ y/2 ≤ −2 : cette solution est dans ]−∞ ; −2].
    6. Donc f est surjective ; elle est aussi injective, donc bijective.
    7. f⁻¹(x) = (x − √(x² − 16))/2, x ∈ ]−∞ ; −4].
    ✗ f⁻¹(x) = (x + √(x² − 16))/2. [g1_inverse_branch]
    ✗ f⁻¹(x) = 1/(x + 4/x). [g1_inverse_reciprocal]
    ✗ Δ ≥ 0 : une solution existe, donc f est surjective. [g1_surj_domain]
  pièges : g1_inverse_branch, g1_inverse_reciprocal, g1_surj_domain

```

### Variantes d'examen

```
Montre que f : ℝ ∖ {2} → ℝ ∖ {−2}, f(x) = (−2x − 5)/(x − 2) est surjective, et explicite f⁻¹. Touche les blocs dans l'ordre de la preuve et complète les calculs.
  [problème, examen open, 7 points]
  partie 1 (Début du problème : 7)
    [blocs frame, sans aide]
      1. Soit y ≠ −2. On cherche x ≠ 2 avec (−2x − 5)/(x − 2) = y.
      2. y(x − 2) = −2x − 5   [à écrire : Multiplie par le dénominateur : y(x-2)=-2x-5]
      3. x(y + 2) = 2y − 5   [à écrire : Regroupe les termes en x : x(y+2)=2y-5]
      4. y ≠ −2, donc x = (2y − 5)/(y + 2).
      5. x ≠ 2 : sinon 2y − 5 = 2(y + 2), soit −9 = 0, impossible. La solution est dans ℝ ∖ {2}.
      6. Donc f est surjective ; elle est aussi injective, donc bijective.
      7. f⁻¹(x) = (2x − 5)/(x + 2), x ≠ −2.
      ✗ On trouve une solution x, donc f est surjective. [g1_surj_domain]
      ✗ f⁻¹(x) = (x − 2)/(−2x − 5). [g1_inverse_reciprocal]
    [examen open]
  pièges : g1_surj_domain, g1_inverse_reciprocal

```

## Parité et périodicité (`g1-parity-period`, Gymnase)

_f(−x) = f(x) ou −f(x) pour tout x ; période d'une somme._

### Niveau 1

```
f(x) = 5/(x² + 1) sur ℝ, et f(−x) = 5/(x² + 1). f est :
  ✔ paire   · impaire   · ni paire ni impaire

f(x) = sin(3x) + x sur ℝ, et f(−x) = −sin(3x) − x. f est :
  · paire   ✔ impaire   · ni paire ni impaire

f(x) = sin(3x) + x sur ℝ, et f(−x) = −sin(3x) − x. f est :
  ✔ impaire   · ni paire ni impaire   · paire

```

### Niveau 2

```
f(x) = x·cos(x), définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [guided]  f(−x)
    = (□)·cos(−x)   (trous : (−x)·cos(−x))   ← Remplacer x par −x
    = −x·cos(x)   ← Simplifier
  — Vérifie : f(−x) + f(x) =  [juge equiv]  départ : f(−x) + f(x)
    ? Donc f est : · paire / ✔ impaire / · ni paire ni impaire
    = 0   ← Pour tout x : f est impaire
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | (−x)·cos(−x) | −x·cos(x)

f(x) = x⁵ + 4x³, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [guided]  f(−x)
    = (□)⁵ + 4(−x)³   (trous : (−x)⁵ + 4(−x)³)   ← Remplacer x par −x
    = −x⁵ − 4x³   ← Simplifier
  — Vérifie : f(−x) + f(x) =  [juge equiv]  départ : f(−x) + f(x)
    ? Donc f est : · paire / ✔ impaire / · ni paire ni impaire
    = 0   ← Pour tout x : f est impaire
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | (−x)⁵ + 4(−x)³ | −x⁵ − 4x³

f(x) = cos(2x) + x², définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [guided]  f(−x)
    = cos(2(□)) + (−x)²   (trous : cos(2(−x)) + (−x)²)   ← Remplacer x par −x
    = cos(2x) + x²   ← Simplifier
  — Vérifie : f(−x) − f(x) =  [juge equiv]  départ : f(−x) − f(x)
    ? Donc f est : ✔ paire / · impaire / · ni paire ni impaire
    = 0   ← Pour tout x : f est paire
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | cos(2(−x)) + (−x)² | cos(2x) + x²

```

### Niveau 3

```
f(x) = 4/(x² + 4), définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [tap, suivre l'erreur, menu steps]  f(−x)
    = 4/((−x)² + 4)   ← Remplacer x par −x
    = 4/(x² + 4)   ← Simplifier
  — Vérifie : f(−x) − f(x) =  [juge equiv]  départ : f(−x) − f(x)
    ? Donc f est : ✔ paire / · impaire / · ni paire ni impaire
    = 0   ← Pour tout x : f est paire
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | 4/((−x)² + 4) | 4/(x² + 4)

f(x) = x² + x, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [tap, suivre l'erreur, menu steps]  f(−x)
    = (−x)² + (−x)   ← Remplacer x par −x
    = x² − x   ← Simplifier
  — Contre-exemple : calcule f(1) et f(−1).  [juge value]  départ : 1² + 1
    ? Donc f est : · paire / · impaire / ✔ ni paire ni impaire
    = 2   ← f(1)
  —   [juge value]  départ : (−1)² + (−1)
    = 0   ← f(−1) n'est ni f(1) ni −f(1)
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | (−x)² + (−x) | x² − x

f(x) = x·|x|, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [tap, suivre l'erreur, menu steps]  f(−x)
    = (−x)·|−x|   ← Remplacer x par −x
    = −x·|x|   ← Simplifier
  — Vérifie : f(−x) + f(x) =  [juge equiv]  départ : f(−x) + f(x)
    ? Donc f est : · paire / ✔ impaire / · ni paire ni impaire
    = 0   ← Pour tout x : f est impaire
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | (−x)·|−x| | −x·|x|

```

### Niveau 4

```
f(x) = x² + 4x + 4, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [free, suivre l'erreur]  f(−x)
    = (−x)² + 4(−x) + 4   ← Remplacer x par −x
    = x² − 4x + 4   ← Simplifier
  — Contre-exemple : calcule f(1) et f(−1).  [juge value]  départ : 1² + 4(1) + 4
    ? Donc f est : · paire / · impaire / ✔ ni paire ni impaire
    = 9   ← f(1)
  —   [juge value]  départ : (−1)² + 4(−1) + 4
    = 1   ← f(−1) n'est ni f(1) ni −f(1)
  aides : Calcule f(−x) et compare à f(x) et à −f(x). | (−x)² + 4(−x) + 4 | x² − 4x + 4

Trouve la plus petite période de f(x) = sin(3x) + cos(x).
  [free, suivre l'erreur]  T_1
    = 2π/3   ← Période de sin(3x) : 2π/|a|
  — Période de cos(x) :  [juge value]  départ : T_2
    = 2π   ← Période : 2π/|b|
  — Plus petite période commune :  [juge value]  départ : T
    = 2π   ← Le plus petit nombre qui est un multiple des deux périodes
  aides : La période de sin(ax) et de cos(ax) est 2π/|a|. Une somme a pour période le plus petit multiple commun. | 2π/3 et 2π | 2π

Trouve la plus petite période de f(x) = sin(2x) + cos(4x).
  [free, suivre l'erreur]  T_1
    = π   ← Période de sin(2x) : 2π/|a|
  — Période de cos(4x) :  [juge value]  départ : T_2
    = π/2   ← Période : 2π/|b|
  — Plus petite période commune :  [juge value]  départ : T
    = π   ← Le plus petit nombre qui est un multiple des deux périodes
  aides : La période de sin(ax) et de cos(ax) est 2π/|a|. Une somme a pour période le plus petit multiple commun. | π et π/2 | π

```

### Niveau 5

```
f(x) = x² + 4x, définie sur ℝ. Calcule f(−x), puis dis si f est paire, impaire ou ni l'une ni l'autre.
  [free, sans aide]  f(−x)
    = (−x)² + 4(−x)   ← Remplacer x par −x
    = x² − 4x   ← Simplifier
  — Contre-exemple : calcule f(1) et f(−1).  [juge value]  départ : 1² + 4(1)
    ? Donc f est : · paire / · impaire / ✔ ni paire ni impaire
    = 5   ← f(1)
  —   [juge value]  départ : (−1)² + 4(−1)
    = −3   ← f(−1) n'est ni f(1) ni −f(1)

Trouve la plus petite période de f(x) = sin(2x) + cos(4x).
  [free, sans aide]  T_1
    = π   ← Période de sin(2x) : 2π/|a|
  — Période de cos(4x) :  [juge value]  départ : T_2
    = π/2   ← Période : 2π/|b|
  — Plus petite période commune :  [juge value]  départ : T
    = π   ← Le plus petit nombre qui est un multiple des deux périodes

Trouve la plus petite période de f(x) = sin(3x) + cos(2x).
  [free, sans aide]  T_1
    = 2π/3   ← Période de sin(3x) : 2π/|a|
  — Période de cos(2x) :  [juge value]  départ : T_2
    = π   ← Période : 2π/|b|
  — Plus petite période commune :  [juge value]  départ : T
    = 2π   ← Le plus petit nombre qui est un multiple des deux périodes

```

### Variantes d'examen

```
Vrai ou faux ?
  « Une fonction impaire définie en 0 vérifie f(0) = 0. » → VRAI
  [examen tf]

Plus petite période de f(x) = sin(2x) + cos(x) :
  · π [g1_period_sum]   ✔ 2π   · 4π
  [examen mcq]
  pièges : g1_period_sum

```

## Signe du trinôme, inéquation du 2e degré (`g1-trinome-sign`, Gymnase)

_Le signe de a à l'extérieur des racines._

### Niveau 1

```
Résous dans ℝ : 2x² + 4x − 30 < 0.
  [guided]  2x² + 4x − 30 < 0
    (Les racines de 2x² + 4x − 30 sont −5 et 3.)
    ? Où 2x² + 4x − 30 est-il négatif ? ✔ Entre les racines / · À l'extérieur des racines
    = ]□ ; □[   (trous : ]−5 ; 3[)   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 2(x + 5)(x − 3) < 0 | ]−5 ; 3[
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : −2x² + 10x − 8 > 0.
  [guided]  −2x² + 10x − 8 > 0
    (Les racines de −2x² + 10x − 8 sont 1 et 4.)
    ? Où −2x² + 10x − 8 est-il positif ? ✔ Entre les racines / · À l'extérieur des racines
    = ]□ ; □[   (trous : ]1 ; 4[)   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −2(x − 1)(x − 4) > 0 | ]1 ; 4[
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : −x² − x + 6 ≥ 0.
  [guided]  −x² − x + 6 ≥ 0
    (Les racines de −x² − x + 6 sont −3 et 2.)
    ? Où −x² − x + 6 est-il positif ? ✔ Entre les racines / · À l'extérieur des racines
    = [□ ; □]   (trous : [−3 ; 2])   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −(x + 3)(x − 2) ≥ 0 | [−3 ; 2]
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Niveau 2

```
Résous dans ℝ : 2x² − 7x − 15 ≤ 0.
  [guided]  (−7)² − 4·2·(−15)
    = 169   ← Δ = b² − 4ac
  — Résous 2x² − 7x − 15 ≤ 0.  [juge solset]  départ : 2x² − 7x − 15 ≤ 0
    = 2(x + 3/2)(x − □) ≤ 0   (trous : 2(x + 3/2)(x − 5) ≤ 0)   ← Racines −3/2 et 5
    = −3/2 ≤ x ≤ 5   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = [−3/2 ; 5]   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 2(x + 3/2)(x − 5) ≤ 0 | [−3/2 ; 5]

Résous dans ℝ : −3x² + 3x + 6 ≥ 0.
  [guided]  3² − 4·(−3)·6
    = 81   ← Δ = b² − 4ac
  — Résous −3x² + 3x + 6 ≥ 0.  [juge solset]  départ : −3x² + 3x + 6 ≥ 0
    = −3(x + 1)(x − □) ≥ 0   (trous : −3(x + 1)(x − 2) ≥ 0)   ← Racines −1 et 2
    = −1 ≤ x ≤ 2   ← a < 0 : positif entre les racines, négatif à l'extérieur
    = [−1 ; 2]   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −3(x + 1)(x − 2) ≥ 0 | [−1 ; 2]

Résous dans ℝ : −3x² + 3 > 0.
  [guided]  0² − 4·(−3)·3
    = 36   ← Δ = b² − 4ac
  — Résous −3x² + 3 > 0.  [juge solset]  départ : −3x² + 3 > 0
    = −3(x + □)(x − 1) > 0   (trous : −3(x + 1)(x − 1) > 0)   ← Racines −1 et 1
    = −1 < x < 1   ← a < 0 : positif entre les racines, négatif à l'extérieur
    = ]−1 ; 1[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −3(x + 1)(x − 1) > 0 | ]−1 ; 1[

```

### Niveau 3

```
Résous dans ℝ : 2x² + x > 0.
  [tap, suivre l'erreur, menu steps]  1² − 4·2·0
    = 1   ← Δ = b² − 4ac
  — Résous 2x² + x > 0.  [juge solset]  départ : 2x² + x > 0
    = 2x(x + 1/2) > 0   ← Racines −1/2 et 0
    = x < −1/2 ou x > 0   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = ]−∞ ; −1/2[ ∪ ]0 ; +∞[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 2x(x + 1/2) > 0 | ]−∞ ; −1/2[ ∪ ]0 ; +∞[

Résous dans ℝ : 2x² + 9x < 0.
  [tap, suivre l'erreur, menu steps]  9² − 4·2·0
    = 81   ← Δ = b² − 4ac
  — Résous 2x² + 9x < 0.  [juge solset]  départ : 2x² + 9x < 0
    = 2x(x + 9/2) < 0   ← Racines −9/2 et 0
    = −9/2 < x < 0   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = ]−9/2 ; 0[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 2x(x + 9/2) < 0 | ]−9/2 ; 0[

Résous dans ℝ : 3x² − 21x + 30 ≥ 0.
  [tap, suivre l'erreur, menu steps]  (−21)² − 4·3·30
    = 81   ← Δ = b² − 4ac
  — Résous 3x² − 21x + 30 ≥ 0.  [juge solset]  départ : 3x² − 21x + 30 ≥ 0
    = 3(x − 2)(x − 5) ≥ 0   ← Racines 2 et 5
    = x ≤ 2 ou x ≥ 5   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = ]−∞ ; 2] ∪ [5 ; +∞[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 3(x − 2)(x − 5) ≥ 0 | ]−∞ ; 2] ∪ [5 ; +∞[

```

### Niveau 4

```
Résous dans ℝ : −2x² + 8x − 6 ≥ 0.
  [free, suivre l'erreur]  −2x² + 8x − 6 ≥ 0
    = −2(x − 1)(x − 3) ≥ 0   ← Racines 1 et 3
    = 1 ≤ x ≤ 3   ← a < 0 : positif entre les racines, négatif à l'extérieur
    = [1 ; 3]   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −2(x − 1)(x − 3) ≥ 0 | [1 ; 3]
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : 2x² − 2x > 0.
  [free, suivre l'erreur]  2x² − 2x > 0
    = 2x(x − 1) > 0   ← Racines 0 et 1
    = x < 0 ou x > 1   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = ]−∞ ; 0[ ∪ ]1 ; +∞[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | 2x(x − 1) > 0 | ]−∞ ; 0[ ∪ ]1 ; +∞[
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : −x² − 7x − 12 ≤ 0.
  [free, suivre l'erreur]  −x² − 7x − 12 ≤ 0
    = −(x + 4)(x + 3) ≤ 0   ← Racines −4 et −3
    = x ≤ −4 ou x ≥ −3   ← a < 0 : positif entre les racines, négatif à l'extérieur
    = ]−∞ ; −4] ∪ [−3 ; +∞[   ← Écrire S
  aides : Le trinôme a le signe de a à l'extérieur des racines, le signe contraire entre elles. | −(x + 4)(x + 3) ≤ 0 | ]−∞ ; −4] ∪ [−3 ; +∞[
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Niveau 5

```
Résous dans ℝ : −2x² + 16x − 45 > −2x − 5.
  [free, sans aide]  −2x² + 16x − 45 > −2x − 5
    = −2x² + 18x − 40 > 0   ← Tout passer à gauche
    = −2(x − 4)(x − 5) > 0   ← Racines 4 et 5
    = 4 < x < 5   ← a < 0 : positif entre les racines, négatif à l'extérieur
    = ]4 ; 5[   ← Écrire S
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : 2x² + 3x − 23 ≤ −2x − 5.
  [free, sans aide]  2x² + 3x − 23 ≤ −2x − 5
    = 2x² + 5x − 18 ≤ 0   ← Tout passer à gauche
    = 2(x + 9/2)(x − 2) ≤ 0   ← Racines −9/2 et 2
    = −9/2 ≤ x ≤ 2   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = [−9/2 ; 2]   ← Écrire S
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : x² + 2x − 5 ≤ −x − 1.
  [free, sans aide]  x² + 2x − 5 ≤ −x − 1
    = x² + 3x − 4 ≤ 0   ← Tout passer à gauche
    = (x + 4)(x − 1) ≤ 0   ← Racines −4 et 1
    = −4 ≤ x ≤ 1   ← a > 0 : négatif entre les racines, positif à l'extérieur
    = [−4 ; 1]   ← Écrire S
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Variantes d'examen

```
Ensemble des solutions de 2x² + 3x ≤ 0 :
  · ]−3/2 ; 0[ [g9_bracket]   ✔ [−3/2 ; 0]   · ]−∞ ; −3/2] ∪ [0 ; +∞[ [g1_trinome_sign_swap]   · {−3/2 ; 0}
  [examen mcq]
  pièges : g1_trinome_sign_swap, g9_bracket

Vrai ou faux ?
  « x² + x + 1 > 0 pour tout x ∈ ℝ. » → VRAI
  [examen tf]

```

## Tableau de signes (`g1-sign-table`, Gymnase)

_Une ligne par facteur, puis la règle des signes._

### Niveau 1

```
Tableau de signes de f(x) = x(x − 3)². Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | 0 |  | 3 | 
    x        −  0  +  +  +
    (x − 3)² +  +  +  0  +
    f(x)     (−)  (0)  (+)  (0)  (+)
  puis : Lis le tableau : résous x(x − 3)² > 0.
      [free, sans aide]  x(x − 3)² > 0
        = ]0 ; 3[ ∪ ]3 ; +∞[   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

Tableau de signes de f(x) = ((x + 3)(x − 3))/(x − 2). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −3 |  | 2 |  | 3 | 
    x + 3    −  0  +  +  +  +  +
    x − 2 (dén.) −  −  −  0  +  +  +
    x − 3    −  −  −  −  −  0  +
    f(x)     (−)  (0)  (+)  (‖)  (−)  (0)  (+)
  puis : Lis le tableau : résous ((x + 3)(x − 3))/(x − 2) ≥ 0.
      [free, sans aide]  ((x + 3)(x − 3))/(x − 2) ≥ 0
        = [−3 ; 2[ ∪ [3 ; +∞[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Tableau de signes de f(x) = (−3 − x)/(3 − x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −3 |  | 3 | 
    −3 − x   +  0  −  −  −
    3 − x (dén.) +  +  +  0  −
    f(x)     (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous (−3 − x)/(3 − x) ≤ 0.
      [free, sans aide]  (−3 − x)/(3 − x) ≤ 0
        = [−3 ; 3[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 2

```
Tableau de signes de f(x) = (x + 4)(−3 − x)x². Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −4 |  | −3 |  | 0 | 
    x + 4    (−)  (0)  (+)  (+)  (+)  (+)  (+)
    −3 − x   (+)  (+)  (+)  (0)  (−)  (−)  (−)
    x²       (+)  (+)  (+)  (+)  (+)  (0)  (+)
    f(x)     (−)  (0)  (+)  (0)  (−)  (0)  (−)
  puis : Lis le tableau : résous (x + 4)(−3 − x)x² > 0.
      [free, sans aide]  (x + 4)(−3 − x)x² > 0
        = ]−4 ; −3[   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

Tableau de signes de f(x) = (−2 − x)/(−4 − x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −4 |  | −2 | 
    −4 − x (dén.) (+)  (0)  (−)  (−)  (−)
    −2 − x   (+)  (+)  (+)  (0)  (−)
    f(x)     (+)  (‖)  (−)  (0)  (+)
  puis : Lis le tableau : résous (−2 − x)/(−4 − x) < 0.
      [free, sans aide]  (−2 − x)/(−4 − x) < 0
        = ]−4 ; −2[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Tableau de signes de f(x) = x/(x − 1). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | 0 |  | 1 | 
    x        (−)  (0)  (+)  (+)  (+)
    x − 1 (dén.) (−)  (−)  (−)  (0)  (+)
    f(x)     (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous x/(x − 1) ≥ 0.
      [free, sans aide]  x/(x − 1) ≥ 0
        = ]−∞ ; 0] ∪ ]1 ; +∞[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 3

```
Tableau de signes de f(x) = (x + 3)(4 − x). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · | 
    x        ·  (-3)  ·  (4)  ·
    x + 3    (−)  (0)  (+)  (+)  (+)
    4 − x    (+)  (+)  (+)  (0)  (−)
    f(x)     (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous (x + 3)(4 − x) > 0.
      [free, sans aide, suivre l'erreur]  (x + 3)(4 − x) > 0
        = ]−3 ; 4[   ← Lire le tableau
      pièges : g9_bracket

Tableau de signes de f(x) = ((x + 3)(4 − x))/(x − 2). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (2)  ·  (4)  ·
    x + 3    (−)  (0)  (+)  (+)  (+)  (+)  (+)
    x − 2 (dén.) (−)  (−)  (−)  (0)  (+)  (+)  (+)
    4 − x    (+)  (+)  (+)  (+)  (+)  (0)  (−)
    f(x)     (+)  (0)  (−)  (‖)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((x + 3)(4 − x))/(x − 2) ≥ 0.
      [free, sans aide, suivre l'erreur]  ((x + 3)(4 − x))/(x − 2) ≥ 0
        = ]−∞ ; −3] ∪ ]2 ; 4]   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Tableau de signes de f(x) = ((2 − x)(x − 4))/(x + 3)². Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (2)  ·  (4)  ·
    (x + 3)² (dén.) (+)  (0)  (+)  (+)  (+)  (+)  (+)
    2 − x    (+)  (+)  (+)  (0)  (−)  (−)  (−)
    x − 4    (−)  (−)  (−)  (−)  (−)  (0)  (+)
    f(x)     (−)  (‖)  (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((2 − x)(x − 4))/((x + 3)²) ≥ 0.
      [free, sans aide, suivre l'erreur]  ((2 − x)(x − 4))/((x + 3)²) ≥ 0
        = [2 ; 4]   ← Lire le tableau
      pièges : g1_mult_denominator, g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

```

### Niveau 4

```
Tableau de signes de f(x) = (x + 3)²(−2 − x)(x − 4). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (-2)  ·  (4)  ·
    (x + 3)² (+)  (0)  (+)  (+)  (+)  (+)  (+)
    −2 − x   (+)  (+)  (+)  (0)  (−)  (−)  (−)
    x − 4    (−)  (−)  (−)  (−)  (−)  (0)  (+)
    f(x)     (−)  (0)  (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous (x + 3)²(−2 − x)(x − 4) ≤ 0.
      [free, sans aide, suivre l'erreur]  (x + 3)²(−2 − x)(x − 4) ≤ 0
        = ]−∞ ; −2] ∪ [4 ; +∞[   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

Tableau de signes de f(x) = (x(x − 3)(x − 4))/(−3 − x). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · |  | · | 
    x        ·  (-3)  ·  (0)  ·  (3)  ·  (4)  ·
    −3 − x (dén.) (+)  (0)  (−)  (−)  (−)  (−)  (−)  (−)  (−)
    x        (−)  (−)  (−)  (0)  (+)  (+)  (+)  (+)  (+)
    x − 3    (−)  (−)  (−)  (−)  (−)  (0)  (+)  (+)  (+)
    x − 4    (−)  (−)  (−)  (−)  (−)  (−)  (−)  (0)  (+)
    f(x)     (−)  (‖)  (+)  (0)  (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous (x(x − 3)(x − 4))/(−3 − x) ≤ 0.
      [free, sans aide, suivre l'erreur]  (x(x − 3)(x − 4))/(−3 − x) ≤ 0
        = ]−∞ ; −3[ ∪ [0 ; 3] ∪ [4 ; +∞[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Tableau de signes de f(x) = ((x + 3)²(3 − x))/(x + 2). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (-2)  ·  (3)  ·
    (x + 3)² (+)  (0)  (+)  (+)  (+)  (+)  (+)
    x + 2 (dén.) (−)  (−)  (−)  (0)  (+)  (+)  (+)
    3 − x    (+)  (+)  (+)  (+)  (+)  (0)  (−)
    f(x)     (−)  (0)  (−)  (‖)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((x + 3)²(3 − x))/(x + 2) ≤ 0.
      [free, sans aide, suivre l'erreur]  ((x + 3)²(3 − x))/(x + 2) ≤ 0
        = ]−∞ ; −2[ ∪ [3 ; +∞[   ← Lire le tableau
      pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

```

### Niveau 5

```
Résous dans ℝ : x³ + x² − 10x + 8 > 0.
  [free, sans aide]  x³ + x² − 10x + 8 > 0
    = (x + 4)(x − 1)(x − 2) > 0   ← Factoriser (racine évidente)
    = ]−4 ; 1[ ∪ ]2 ; +∞[   ← Tableau de signes, puis lire
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : x³ + 2x² − 8x < 0.
  [free, sans aide]  x³ + 2x² − 8x < 0
    = (x + 4)x(x − 2) < 0   ← Factoriser (racine évidente)
    = ]−∞ ; −4[ ∪ ]0 ; 2[   ← Tableau de signes, puis lire
  pièges : g9_bracket, g1_trinome_sign_swap

Résous dans ℝ : x³ − 3x² + 2x < 0.
  [free, sans aide]  x³ − 3x² + 2x < 0
    = x(x − 1)(x − 2) < 0   ← Factoriser (racine évidente)
    = ]−∞ ; 0[ ∪ ]1 ; 2[   ← Tableau de signes, puis lire
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Variantes d'examen

```
Ensemble des solutions de ((x − 2)(x − 3)²)/(x) ≤ 0 :
  · ]0 ; 2[ [g9_bracket]   ✔ ]0 ; 2] ∪ {3}   · ]−∞ ; 0[ ∪ [2 ; 3] [g1_sign_even_root]   · [0 ; 2] ∪ {3}
  [examen mcq]
  pièges : g1_sign_even_root, g9_bracket

```

## Inéquations rationnelles (`g1-rational-ineq`, Gymnase)

_Tout d'un côté, même dénominateur, tableau de signes._

### Niveau 1

```
Résous (4 − x)/(x + 2) < 0.
  [guided]  (4 − x)/(x + 2) < 0
    (Bornes du tableau : −2 (valeur interdite, ‖) et 4 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {−2})   ← Valeur interdite : −2
    = ]−∞ ; −2[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −2[ ∪ ]4 ; +∞[)   ← Signes : valeur interdite −2, zéro 4
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : −2 ; zéro : 4 | ]−∞ ; −2[ ∪ ]4 ; +∞[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (−4 − x)/(x − 2) > 0.
  [guided]  (−4 − x)/(x − 2) > 0
    (Bornes du tableau : 2 (valeur interdite, ‖) et −4 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {2})   ← Valeur interdite : 2
    = ]□ ; 2[   (trous : ]−4 ; 2[)   ← Signes : valeur interdite 2, zéro −4
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : 2 ; zéro : −4 | ]−4 ; 2[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (−3 − x)/(x − 4) ≥ 0.
  [guided]  (−3 − x)/(x − 4) ≥ 0
    (Bornes du tableau : 4 (valeur interdite, ‖) et −3 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {4})   ← Valeur interdite : 4
    = [□ ; 4[   (trous : [−3 ; 4[)   ← Signes : valeur interdite 4, zéro −3
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : 4 ; zéro : −3 | [−3 ; 4[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 2

```
Résous (−2x − 11)/(x + 3) < −3.
  [guided]  (−2x − 11)/(x + 3) < −3
    = D = ℝ ∖ {−3}   ← Valeur interdite : −3
    = (−2x − 11)/(x + 3) + 3 < 0   ← Tout d'un côté
    = (−2x − 11 + □)/(x + 3) < 0   (trous : (−2x − 11 + 3(x + 3))/(x + 3) < 0)   ← Même dénominateur
    = (□)/(x + 3) < 0   (trous : (x − 2)/(x + 3) < 0)   ← Réduire le numérateur
    = ]−3 ; 2[   ← Signes : valeur interdite −3, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−2x − 11 + 3(x + 3))/(x + 3) < 0 | (x − 2)/(x + 3) < 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous 2x/(x + 2) > 1.
  [guided]  2x/(x + 2) > 1
    = D = ℝ ∖ {−2}   ← Valeur interdite : −2
    = 2x/(x + 2) − 1 > 0   ← Tout d'un côté
    = (2x − (x + 2))/(x + 2) > 0   ← Même dénominateur
    = (□)/(x + 2) > 0   (trous : (x − 2)/(x + 2) > 0)   ← Réduire le numérateur
    = ]−∞ ; −2[ ∪ ]2 ; +∞[   ← Signes : valeur interdite −2, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (2x − (x + 2))/(x + 2) > 0 | (x − 2)/(x + 2) > 0
  pièges : g1_pole_closed, g9_bracket

Résous (x − 12)/(x − 4) < 2.
  [guided]  (x − 12)/(x − 4) < 2
    = D = ℝ ∖ {4}   ← Valeur interdite : 4
    = (x − 12)/(x − 4) − 2 < 0   ← Tout d'un côté
    = (x − 12 − □)/(x − 4) < 0   (trous : (x − 12 − 2(x − 4))/(x − 4) < 0)   ← Même dénominateur
    = (□)/(x − 4) < 0   (trous : (−4 − x)/(x − 4) < 0)   ← Réduire le numérateur
    = ]−∞ ; −4[ ∪ ]4 ; +∞[   ← Signes : valeur interdite 4, zéro −4
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (x − 12 − 2(x − 4))/(x − 4) < 0 | (−4 − x)/(x − 4) < 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 3

```
Résous (−2x − 7)/(x + 2) ≤ −1.
  [tap, suivre l'erreur, menu steps]  (−2x − 7)/(x + 2) ≤ −1
    ? Comment commences-tu ? · Multiplier les deux membres par le dénominateur / ✔ Tout passer à gauche et réduire au même dénominateur
    = D = ℝ ∖ {−2}   ← Valeur interdite : −2
    = (−2x − 7)/(x + 2) + 1 ≤ 0   ← Tout d'un côté
    = (−2x − 7 + (x + 2))/(x + 2) ≤ 0   ← Même dénominateur
    = (−5 − x)/(x + 2) ≤ 0   ← Réduire le numérateur
    = ]−∞ ; −5] ∪ ]−2 ; +∞[   ← Signes : valeur interdite −2, zéro −5
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−2x − 7 + (x + 2))/(x + 2) ≤ 0 | (−5 − x)/(x + 2) ≤ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (−x − 10)/(x + 4) > −2.
  [tap, suivre l'erreur, menu steps]  (−x − 10)/(x + 4) > −2
    ? Comment commences-tu ? · Multiplier les deux membres par le dénominateur / ✔ Tout passer à gauche et réduire au même dénominateur
    = D = ℝ ∖ {−4}   ← Valeur interdite : −4
    = (−x − 10)/(x + 4) + 2 > 0   ← Tout d'un côté
    = (−x − 10 + 2(x + 4))/(x + 4) > 0   ← Même dénominateur
    = (x − 2)/(x + 4) > 0   ← Réduire le numérateur
    = ]−∞ ; −4[ ∪ ]2 ; +∞[   ← Signes : valeur interdite −4, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−x − 10 + 2(x + 4))/(x + 4) > 0 | (x − 2)/(x + 4) > 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (2x + 15)/(x + 5) ≥ 3.
  [tap, suivre l'erreur, menu steps]  (2x + 15)/(x + 5) ≥ 3
    ? Comment commences-tu ? · Multiplier les deux membres par le dénominateur / ✔ Tout passer à gauche et réduire au même dénominateur
    = D = ℝ ∖ {−5}   ← Valeur interdite : −5
    = (2x + 15)/(x + 5) − 3 ≥ 0   ← Tout d'un côté
    = (2x + 15 − 3(x + 5))/(x + 5) ≥ 0   ← Même dénominateur
    = −x/(x + 5) ≥ 0   ← Réduire le numérateur
    = ]−5 ; 0]   ← Signes : valeur interdite −5, zéro 0
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (2x + 15 − 3(x + 5))/(x + 5) ≥ 0 | −x/(x + 5) ≥ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 4

```
Résous (2x + 15)/(x + 5) ≤ 3.
  [free, suivre l'erreur]  (2x + 15)/(x + 5) ≤ 3
    = D = ℝ ∖ {−5}   ← Valeur interdite : −5
    = (2x + 15)/(x + 5) − 3 ≤ 0   ← Tout d'un côté
    = (2x + 15 − 3(x + 5))/(x + 5) ≤ 0   ← Même dénominateur
    = −x/(x + 5) ≤ 0   ← Réduire le numérateur
    = ]−∞ ; −5[ ∪ [0 ; +∞[   ← Signes : valeur interdite −5, zéro 0
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (2x + 15 − 3(x + 5))/(x + 5) ≤ 0 | −x/(x + 5) ≤ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (−3x + 14)/(x − 6) ≤ −2.
  [free, suivre l'erreur]  (−3x + 14)/(x − 6) ≤ −2
    = D = ℝ ∖ {6}   ← Valeur interdite : 6
    = (−3x + 14)/(x − 6) + 2 ≤ 0   ← Tout d'un côté
    = (−3x + 14 + 2(x − 6))/(x − 6) ≤ 0   ← Même dénominateur
    = (2 − x)/(x − 6) ≤ 0   ← Réduire le numérateur
    = ]−∞ ; 2] ∪ ]6 ; +∞[   ← Signes : valeur interdite 6, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−3x + 14 + 2(x − 6))/(x − 6) ≤ 0 | (2 − x)/(x − 6) ≤ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (−4x + 2)/(x − 2) ≥ −3.
  [free, suivre l'erreur]  (−4x + 2)/(x − 2) ≥ −3
    = D = ℝ ∖ {2}   ← Valeur interdite : 2
    = (−4x + 2)/(x − 2) + 3 ≥ 0   ← Tout d'un côté
    = (−4x + 2 + 3(x − 2))/(x − 2) ≥ 0   ← Même dénominateur
    = (−4 − x)/(x − 2) ≥ 0   ← Réduire le numérateur
    = [−4 ; 2[   ← Signes : valeur interdite 2, zéro −4
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−4x + 2 + 3(x − 2))/(x − 2) ≥ 0 | (−4 − x)/(x − 2) ≥ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Niveau 5

```
Résous x/(x + 2) ≥ (x + 3)/(x + 4).
  [free, sans aide]  x/(x + 2) ≥ (x + 3)/(x + 4)
    = D = ℝ ∖ {−4 ; −2}   ← Valeurs interdites
    = x/(x + 2) − (x + 3)/(x + 4) ≥ 0   ← Tout d'un côté
    = (x(x + 4) − (x + 3)(x + 2))/((x + 2)(x + 4)) ≥ 0   ← Même dénominateur
    = (−x − 6)/((x + 2)(x + 4)) ≥ 0   ← Développer le numérateur
    = ]−∞ ; −6] ∪ ]−4 ; −2[   ← Signes : valeurs interdites −4 et −2, zéro −6
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (x + 4)/(x − 2) > x/(x − 4).
  [free, sans aide]  (x + 4)/(x − 2) > x/(x − 4)
    = D = ℝ ∖ {2 ; 4}   ← Valeurs interdites
    = (x + 4)/(x − 2) − x/(x − 4) > 0   ← Tout d'un côté
    = ((x + 4)(x − 4) − x(x − 2))/((x − 2)(x − 4)) > 0   ← Même dénominateur
    = (2x − 16)/((x − 2)(x − 4)) > 0   ← Développer le numérateur
    = ]2 ; 4[ ∪ ]8 ; +∞[   ← Signes : valeurs interdites 2 et 4, zéro 8
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

Résous (x + 2)/x ≥ (x − 1)/(x + 3).
  [free, sans aide]  (x + 2)/x ≥ (x − 1)/(x + 3)
    = D = ℝ ∖ {−3 ; 0}   ← Valeurs interdites
    = (x + 2)/x − (x − 1)/(x + 3) ≥ 0   ← Tout d'un côté
    = ((x + 2)(x + 3) − (x − 1)x)/(x(x + 3)) ≥ 0   ← Même dénominateur
    = (6x + 6)/(x(x + 3)) ≥ 0   ← Développer le numérateur
    = ]−3 ; −1] ∪ ]0 ; +∞[   ← Signes : valeurs interdites −3 et 0, zéro −1
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

### Variantes d'examen

```
Ensemble des solutions de (−2x − 12)/(x + 2) ≤ −3 :
  · [−2 ; 6] [g1_pole_closed]   · ]−∞ ; −2[ ∪ ]−2 ; 6] [g1_mult_denominator]   ✔ ]−2 ; 6]   · ]−∞ ; −2[ ∪ ]6 ; +∞[
  [examen mcq]
  pièges : g1_mult_denominator, g1_pole_closed

Résous (x + 4)/(x − 4) ≥ (x − 1)/(x − 5).
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur, examen open]  (x + 4)/(x − 4) ≥ (x − 1)/(x − 5)
      = D = ℝ ∖ {4 ; 5}   ← Valeurs interdites
      = (x + 4)/(x − 4) − (x − 1)/(x − 5) ≥ 0   ← Tout d'un côté
      = ((x + 4)(x − 5) − (x − 1)(x − 4))/((x − 4)(x − 5)) ≥ 0   ← Même dénominateur
      = (4x − 24)/((x − 4)(x − 5)) ≥ 0   ← Développer le numérateur
      = ]4 ; 5[ ∪ [6 ; +∞[   ← Signes : valeurs interdites 4 et 5, zéro 6
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket

```

## Équations et inéquations à paramètre (`g1-param`, CMS)

_Avant de diviser par une expression en m, on discute._

### Niveau 1

```
Résous (m + 2)x < m² + 4m + 4 selon les valeurs du paramètre m.
  [guided]  (m + 2)x < m² + 4m + 4
    (Cas m > −2 :)
    = (□)x < (m + 2)(m + 2)   (trous : (m + 2)x < (m + 2)(m + 2))   ← Factoriser
    = x < □   (trous : x < m + 2)   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m + 2[   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m + 2)
    = x > □   (trous : x > m + 2)   ← (m + 2) < 0 : on retourne
    = ]m + 2 ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m + 2)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m + 2 | x > m + 2
  pièges : g1_param_case, g1_trinome_sign_swap

Résous mx > m² − m selon les valeurs du paramètre m.
  [guided]  mx > m² − m
    (Cas m > 0 :)
    = mx > m(□)   (trous : mx > m(m − 1))   ← Factoriser
    = x > □   (trous : x > m − 1)   ← m > 0 : on garde le sens
    = ]m − 1 ; +∞[   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx > m(m − 1)
    = x < □   (trous : x < m − 1)   ← m < 0 : on retourne
    = ]−∞ ; m − 1[   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx > m(m − 1)
    = 0 > 0   ← 0·x > 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m − 1 | x < m − 1
  pièges : g1_param_case, g1_trinome_sign_swap

Résous (m + 1)x = m² − 1 selon les valeurs du paramètre m.
  [guided]  (m + 1)x = m² − 1
    (Cas m ≠ −1 :)
    = (m + 1)x = (m + 1)(□)   (trous : (m + 1)x = (m + 1)(m − 1))   ← Factoriser
    = x = □   (trous : x = m − 1)   ← Diviser par (m + 1) ≠ 0
  — Cas m = −1 :  [juge solset]  départ : (m + 1)x = (m + 1)(m − 1)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m + 1 = 0 ? Et si m + 1 < 0 ? | Cas m < −1 : on divise par m + 1 < 0, donc x … m − 1 | x = m − 1
  pièges : g1_param_case

```

### Niveau 2

```
Résous (m − 2)x = m² − 4 selon les valeurs du paramètre m.
  [guided]  m − 2 = 0
    (Valeur critique de m :)
    = {2}   ← Le coefficient de x s'annule
  — Cas m ≠ 2 :  [juge solset]  départ : (m − 2)x = m² − 4
    = (m − 2)x = (m − 2)(m + 2)   ← Factoriser
    = x = □   (trous : x = m + 2)   ← Diviser par (m − 2) ≠ 0
  — Cas m = 2 :  [juge solset]  départ : (m − 2)x = (m − 2)(m + 2)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 2 = 0 ? Et si m − 2 < 0 ? | Cas m < 2 : on divise par m − 2 < 0, donc x … m + 2 | x = m + 2

Résous (m − 1)x > m² − 1 selon les valeurs du paramètre m.
  [guided]  m − 1 = 0
    (Valeur critique de m :)
    = {1}   ← Le coefficient de x s'annule
  — Cas m > 1 :  [juge solset]  départ : (m − 1)x > m² − 1
    = (m − 1)x > (m − 1)(m + 1)   ← Factoriser
    = x > □   (trous : x > m + 1)   ← (m − 1) > 0 : on garde le sens
    = ]m + 1 ; +∞[   ← Écrire l'ensemble
  — Cas m < 1 :  [juge solset]  départ : (m − 1)x > (m − 1)(m + 1)
    = x < □   (trous : x < m + 1)   ← (m − 1) < 0 : on retourne
    = ]−∞ ; m + 1[   ← Écrire l'ensemble
  — Cas m = 1 :  [juge solset]  départ : (m − 1)x > (m − 1)(m + 1)
    = 0 > 0   ← 0·x > 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m − 1 = 0 ? Et si m − 1 < 0 ? | Cas m < 1 : on divise par m − 1 < 0, donc x … m + 1 | x < m + 1

Résous mx < m² selon les valeurs du paramètre m.
  [guided]  m = 0
    (Valeur critique de m :)
    = {0}   ← Le coefficient de x s'annule
  — Cas m > 0 :  [juge solset]  départ : mx < m²
    = mx < m(m)   ← Factoriser
    = x < □   (trous : x < m)   ← m > 0 : on garde le sens
    = ]−∞ ; m[   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx < m(m)
    = x > □   (trous : x > m)   ← m < 0 : on retourne
    = ]m ; +∞[   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx < m(m)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m | x > m

```

### Niveau 3

```
Résous (m + 2)x ≤ m² − m − 6 selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m + 2 = 0
    (Valeur critique de m :)
    = {−2}   ← Le coefficient de x s'annule
  — Cas m > −2 :  [juge solset]  départ : (m + 2)x ≤ m² − m − 6
    = (m + 2)x ≤ (m + 2)(m − 3)   ← Factoriser
    = x ≤ m − 3   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m − 3]   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x ≤ (m + 2)(m − 3)
    = x ≥ m − 3   ← (m + 2) < 0 : on retourne
    = [m − 3 ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x ≤ (m + 2)(m − 3)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m − 3 | x ≥ m − 3

Résous (m + 2)x < m² − 4 selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m + 2 = 0
    (Valeur critique de m :)
    = {−2}   ← Le coefficient de x s'annule
  — Cas m > −2 :  [juge solset]  départ : (m + 2)x < m² − 4
    = (m + 2)x < (m + 2)(m − 2)   ← Factoriser
    = x < m − 2   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m − 2[   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 2)
    = x > m − 2   ← (m + 2) < 0 : on retourne
    = ]m − 2 ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 2)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m − 2 | x > m − 2

Résous (m − 3)x > m² − 4m + 3 selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m − 3 = 0
    (Valeur critique de m :)
    = {3}   ← Le coefficient de x s'annule
  — Cas m > 3 :  [juge solset]  départ : (m − 3)x > m² − 4m + 3
    = (m − 3)x > (m − 3)(m − 1)   ← Factoriser
    = x > m − 1   ← (m − 3) > 0 : on garde le sens
    = ]m − 1 ; +∞[   ← Écrire l'ensemble
  — Cas m < 3 :  [juge solset]  départ : (m − 3)x > (m − 3)(m − 1)
    = x < m − 1   ← (m − 3) < 0 : on retourne
    = ]−∞ ; m − 1[   ← Écrire l'ensemble
  — Cas m = 3 :  [juge solset]  départ : (m − 3)x > (m − 3)(m − 1)
    = 0 > 0   ← 0·x > 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m − 3 = 0 ? Et si m − 3 < 0 ? | Cas m < 3 : on divise par m − 3 < 0, donc x … m − 1 | x < m − 1

```

### Niveau 4

```
Résous mx ≥ m² + 2m selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m = 0
    (Valeur critique de m :)
    = {0}   ← Le coefficient de x s'annule
  — Cas m > 0 :  [juge solset]  départ : mx ≥ m² + 2m
    = mx ≥ m(m + 2)   ← Factoriser
    = x ≥ m + 2   ← m > 0 : on garde le sens
    = [m + 2 ; +∞[   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx ≥ m(m + 2)
    = x ≤ m + 2   ← m < 0 : on retourne
    = ]−∞ ; m + 2]   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx ≥ m(m + 2)
    = 0 ≥ 0   ← 0·x ≥ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m + 2 | x ≤ m + 2

Résous (m − 3)x = m² − 9 selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m − 3 = 0
    (Valeur critique de m :)
    = {3}   ← Le coefficient de x s'annule
  — Cas m ≠ 3 :  [juge solset]  départ : (m − 3)x = m² − 9
    = (m − 3)x = (m − 3)(m + 3)   ← Factoriser
    = x = m + 3   ← Diviser par (m − 3) ≠ 0
  — Cas m = 3 :  [juge solset]  départ : (m − 3)x = (m − 3)(m + 3)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 3 = 0 ? Et si m − 3 < 0 ? | Cas m < 3 : on divise par m − 3 < 0, donc x … m + 3 | x = m + 3

Résous (m − 2)x ≤ m² − 4m + 4 selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m − 2 = 0
    (Valeur critique de m :)
    = {2}   ← Le coefficient de x s'annule
  — Cas m > 2 :  [juge solset]  départ : (m − 2)x ≤ m² − 4m + 4
    = (m − 2)x ≤ (m − 2)(m − 2)   ← Factoriser
    = x ≤ m − 2   ← (m − 2) > 0 : on garde le sens
    = ]−∞ ; m − 2]   ← Écrire l'ensemble
  — Cas m < 2 :  [juge solset]  départ : (m − 2)x ≤ (m − 2)(m − 2)
    = x ≥ m − 2   ← (m − 2) < 0 : on retourne
    = [m − 2 ; +∞[   ← Écrire l'ensemble
  — Cas m = 2 :  [juge solset]  départ : (m − 2)x ≤ (m − 2)(m − 2)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 2 = 0 ? Et si m − 2 < 0 ? | Cas m < 2 : on divise par m − 2 < 0, donc x … m − 2 | x ≥ m − 2

```

### Niveau 5

```
Selon m, combien de solutions a l'équation x² − 2mx − m + 2 = 0 ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.
  [free, sans aide]  (−2m)² − 4(−m + 2) > 0
    (Deux solutions : Δ > 0.)
    = m² + m − 2 > 0   ← Diviser par 4
    = (m + 2)(m − 1) > 0   ← Factoriser
    = ]−∞ ; −2[ ∪ ]1 ; +∞[   ← Signe du trinôme en m
  — Une seule solution : Δ = 0.  [juge solset]  départ : (−2m)² − 4(−m + 2) = 0
    = (m + 2)(m − 1) = 0   ← Diviser par 4, factoriser
    = {−2 ; 1}   ← Résoudre
  — Aucune solution : Δ < 0.  [juge solset]  départ : (−2m)² − 4(−m + 2) < 0
    = (m + 2)(m − 1) < 0   ← Diviser par 4, factoriser
    = ]−2 ; 1[   ← Signe du trinôme en m
  pièges : g9_bracket, g1_trinome_sign_swap

Selon m, combien de solutions a l'équation x² − 2mx + m + 6 = 0 ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.
  [free, sans aide]  (−2m)² − 4(m + 6) > 0
    (Deux solutions : Δ > 0.)
    = m² − m − 6 > 0   ← Diviser par 4
    = (m + 2)(m − 3) > 0   ← Factoriser
    = ]−∞ ; −2[ ∪ ]3 ; +∞[   ← Signe du trinôme en m
  — Une seule solution : Δ = 0.  [juge solset]  départ : (−2m)² − 4(m + 6) = 0
    = (m + 2)(m − 3) = 0   ← Diviser par 4, factoriser
    = {−2 ; 3}   ← Résoudre
  — Aucune solution : Δ < 0.  [juge solset]  départ : (−2m)² − 4(m + 6) < 0
    = (m + 2)(m − 3) < 0   ← Diviser par 4, factoriser
    = ]−2 ; 3[   ← Signe du trinôme en m
  pièges : g9_bracket, g1_trinome_sign_swap

Selon m, combien de solutions a l'équation x² − 2mx + 1 = 0 ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.
  [free, sans aide]  (−2m)² − 4(1) > 0
    (Deux solutions : Δ > 0.)
    = m² − 1 > 0   ← Diviser par 4
    = (m + 1)(m − 1) > 0   ← Factoriser
    = ]−∞ ; −1[ ∪ ]1 ; +∞[   ← Signe du trinôme en m
  — Une seule solution : Δ = 0.  [juge solset]  départ : (−2m)² − 4(1) = 0
    = (m + 1)(m − 1) = 0   ← Diviser par 4, factoriser
    = {−1 ; 1}   ← Résoudre
  — Aucune solution : Δ < 0.  [juge solset]  départ : (−2m)² − 4(1) < 0
    = (m + 1)(m − 1) < 0   ← Diviser par 4, factoriser
    = ]−1 ; 1[   ← Signe du trinôme en m
  pièges : g9_bracket, g1_trinome_sign_swap

```

### Variantes d'examen

```
Résous (m + 3)x = m² − 9 selon les valeurs du paramètre m.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Cas m ≠ −3 : 1,5 ; Cas m = −3 : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  m + 3 = 0
      (Valeur critique de m :)
      = {−3}   ← Le coefficient de x s'annule
    — Cas m ≠ −3 :  [juge solset]  départ : (m + 3)x = m² − 9
      = (m + 3)x = (m + 3)(m − 3)   ← Factoriser
      = x = m − 3   ← Diviser par (m + 3) ≠ 0
    — Cas m = −3 :  [juge solset]  départ : (m + 3)x = (m + 3)(m − 3)
      = 0 = 0   ← 0·x = 0
      = ℝ   ← Toujours vrai

On résout (m + 2)x < m² + 2m. Pour m = −5, l'ensemble des solutions est :
  · ℝ   · ∅   ✔ ]−5 ; +∞[   · ]−∞ ; −5[ [g1_param_case]
  [examen mcq]
  pièges : g1_param_case

```

## Trinôme à paramètre : position des racines (`g1-viete`, CMS)

_k est entre les racines si et seulement si a·f(k) < 0._

### Niveau 1

```
Pour quels m l'équation (m − 3)x² + (−2m − 2)x − 7m + 4 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ ?
  [guided]  (m − 3)·(−2)² + (−2m − 2)·(−2) + (−7m + 4)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(−2) =)
    = m − □   (trous : m − 4)   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 3)(m − 4) < 0
    = 3 < m < 4   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]3 ; 4[)   ← Écrire l'ensemble
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m − 3. | f(−2) = (m − 3)·(−2)² + (−2m − 2)·(−2) + (−7m + 4) = … | m − 4

Pour quels m l'équation (m − 2)x² + (−m − 1)x − m + 4 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ ?
  [guided]  (m − 2)·2² + (−m − 1)·2 + (−m + 4)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(2) =)
    = m − □   (trous : m − 6)   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 2)(m − 6) < 0
    = 2 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]2 ; 6[)   ← Écrire l'ensemble
  aides : 2 est entre les racines si et seulement si a·f(2) < 0, avec a = m − 2. | f(2) = (m − 2)·2² + (−m − 1)·2 + (−m + 4) = … | m − 6

Pour quels m l'équation (m + 2)x² + (−m − 3)x + m − 4 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [guided]  (m + 2)·1² + (−m − 3)·1 + (m − 4)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(1) =)
    = m − □   (trous : m − 5)   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)(m − 5) < 0
    = −2 < m < 5   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]−2 ; 5[)   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m + 2. | f(1) = (m + 2)·1² + (−m − 3)·1 + (m − 4) = … | m − 5

```

### Niveau 2

```
Pour quels m l'équation (m + 1)x² + 2x − 3m − 2 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ ?
  [guided]  (m + 1)·(−2)² + 2·(−2) + (−3m − 2)
    (f(−2) =)
    = m − 2   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 1)(m − 2) < 0
    ? Quelle condition dit que −2 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = −1 < m < 2   ← Signe du trinôme en m : entre les racines
    = ]−1 ; 2[   ← Écrire l'ensemble
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m + 1. | f(−2) = (m + 1)·(−2)² + 2·(−2) + (−3m − 2) = … | m − 2
  pièges : g1_viete_a

Pour quels m l'équation (m + 1)x² + (−m + 3)x − m = 0 a-t-elle deux racines avec x₁ < −1 < x₂ ?
  [guided]  (m + 1)·(−1)² + (−m + 3)·(−1) + (−m)
    (f(−1) =)
    = m − 2   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 1)(m − 2) < 0
    ? Quelle condition dit que −1 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = −1 < m < 2   ← Signe du trinôme en m : entre les racines
    = ]−1 ; 2[   ← Écrire l'ensemble
  aides : −1 est entre les racines si et seulement si a·f(−1) < 0, avec a = m + 1. | f(−1) = (m + 1)·(−1)² + (−m + 3)·(−1) + (−m) = … | m − 2
  pièges : g1_viete_a

Pour quels m l'équation (m + 2)x² + (−m + 2)x − m = 0 a-t-elle deux racines avec x₁ < −1 < x₂ ?
  [guided]  (m + 2)·(−1)² + (−m + 2)·(−1) + (−m)
    (f(−1) =)
    = m   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)m < 0
    ? Quelle condition dit que −1 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = −2 < m < 0   ← Signe du trinôme en m : entre les racines
    = ]−2 ; 0[   ← Écrire l'ensemble
  aides : −1 est entre les racines si et seulement si a·f(−1) < 0, avec a = m + 2. | f(−1) = (m + 2)·(−1)² + (−m + 2)·(−1) + (−m) = … | m
  pièges : g1_viete_a

```

### Niveau 3

```
Pour quels m l'équation mx² + (−2m + 1)x + m − 8 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ < 3 ?
  [tap, suivre l'erreur, menu steps]  m·2² + (−2m + 1)·2 + (m − 8)
    (f(2) =)
    = m − 6   ← Développer et réduire
  — f(3) =  [juge equiv]  départ : m·3² + (−2m + 1)·3 + (m − 8)
    = 4m − 5   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : m(m − 6) < 0 et m(4m − 5) > 0
    = 0 < m < 6 et m ∈ ]−∞ ; 0[ ∪ ]5/4 ; +∞[   ← Résoudre chaque condition
    = ]5/4 ; 6[   ← Intersecter
  aides : 2 est entre les racines si et seulement si a·f(2) < 0, avec a = m. | f(2) = m·2² + (−2m + 1)·2 + (m − 8) = … | m − 6

Pour quels m l'équation mx² + (−m − 3)x − 5m + 7 = 0 a-t-elle deux racines avec x₁ < 3 < x₂ < 6 ?
  [tap, suivre l'erreur, menu steps]  m·3² + (−m − 3)·3 + (−5m + 7)
    (f(3) =)
    = m − 2   ← Développer et réduire
  — f(6) =  [juge equiv]  départ : m·6² + (−m − 3)·6 + (−5m + 7)
    = 25m − 11   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : m(m − 2) < 0 et m(25m − 11) > 0
    = 0 < m < 2 et m ∈ ]−∞ ; 0[ ∪ ]11/25 ; +∞[   ← Résoudre chaque condition
    = ]11/25 ; 2[   ← Intersecter
  aides : 3 est entre les racines si et seulement si a·f(3) < 0, avec a = m. | f(3) = m·3² + (−m − 3)·3 + (−5m + 7) = … | m − 2

Pour quels m l'équation (m + 2)x² − 2x − 4 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ < 5 ?
  [tap, suivre l'erreur, menu steps]  (m + 2)·1² + (−2)·1 + (−4)
    (f(1) =)
    = m − 4   ← Développer et réduire
  — f(5) =  [juge equiv]  départ : (m + 2)·5² + (−2)·5 + (−4)
    = 25m + 36   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m + 2)(m − 4) < 0 et (m + 2)(25m + 36) > 0
    = −2 < m < 4 et m ∈ ]−∞ ; −2[ ∪ ]−36/25 ; +∞[   ← Résoudre chaque condition
    = ]−36/25 ; 4[   ← Intersecter
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m + 2. | f(1) = (m + 2)·1² + (−2)·1 + (−4) = … | m − 4

```

### Niveau 4

```
Pour quels m l'équation mx² − 2mx + 2m − 1 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [free, suivre l'erreur]  m·1² + (−2m)·1 + (2m − 1)
    (f(1) =)
    = m − 1   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : m(m − 1) < 0
    = 0 < m < 1   ← Signe du trinôme en m : entre les racines
    = ]0 ; 1[   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m. | f(1) = m·1² + (−2m)·1 + (2m − 1) = … | m − 1

Pour quels m l'équation (m − 2)x² + (−2m + 1)x − 7m + 5 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ ?
  [free, suivre l'erreur]  (m − 2)·(−2)² + (−2m + 1)·(−2) + (−7m + 5)
    (f(−2) =)
    = m − 5   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 2)(m − 5) < 0
    = 2 < m < 5   ← Signe du trinôme en m : entre les racines
    = ]2 ; 5[   ← Écrire l'ensemble
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m − 2. | f(−2) = (m − 2)·(−2)² + (−2m + 1)·(−2) + (−7m + 5) = … | m − 5

Pour quels m l'équation (m + 2)x² + (−2m − 2)x − 2m − 10 = 0 a-t-elle deux racines avec x₁ < −1 < x₂ ?
  [free, suivre l'erreur]  (m + 2)·(−1)² + (−2m − 2)·(−1) + (−2m − 10)
    (f(−1) =)
    = m − 6   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)(m − 6) < 0
    = −2 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]−2 ; 6[   ← Écrire l'ensemble
  aides : −1 est entre les racines si et seulement si a·f(−1) < 0, avec a = m + 2. | f(−1) = (m + 2)·(−1)² + (−2m − 2)·(−1) + (−2m − 10) = … | m − 6

```

### Niveau 5

```
Pour quels m l'équation (m − 5)x² − 1 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ < 4 ?
  [free, sans aide]  (m − 5)·1² + (−1)
    (f(1) =)
    = m − 6   ← Développer et réduire
  — f(4) =  [juge equiv]  départ : (m − 5)·4² + (−1)
    = 16m − 81   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 5)(m − 6) < 0 et (m − 5)(16m − 81) > 0
    = 5 < m < 6 et m ∈ ]−∞ ; 5[ ∪ ]81/16 ; +∞[   ← Résoudre chaque condition
    = ]81/16 ; 6[   ← Intersecter

Pour quels m l'équation (m + 1)x² − 3x − 3 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ < 3 ?
  [free, sans aide]  (m + 1)·1² + (−3)·1 + (−3)
    (f(1) =)
    = m − 5   ← Développer et réduire
  — f(3) =  [juge equiv]  départ : (m + 1)·3² + (−3)·3 + (−3)
    = 9m − 3   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m + 1)(m − 5) < 0 et (m + 1)(9m − 3) > 0
    = −1 < m < 5 et m ∈ ]−∞ ; −1[ ∪ ]1/3 ; +∞[   ← Résoudre chaque condition
    = ]1/3 ; 5[   ← Intersecter

Pour quels m l'équation (m + 1)x² + 2mx − 2m − 1 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ < 3 ?
  [free, sans aide]  (m + 1)·1² + 2m·1 + (−2m − 1)
    (f(1) =)
    = m   ← Développer et réduire
  — f(3) =  [juge equiv]  départ : (m + 1)·3² + 2m·3 + (−2m − 1)
    = 13m + 8   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m + 1)m < 0 et (m + 1)(13m + 8) > 0
    = −1 < m < 0 et m ∈ ]−∞ ; −1[ ∪ ]−8/13 ; +∞[   ← Résoudre chaque condition
    = ]−8/13 ; 0[   ← Intersecter

```

### Variantes d'examen

```
Pour quels m l'équation mx² + (−2m + 2)x − 2m − 11 = 0 a-t-elle deux racines avec −4 < x₁ < 3 < x₂ ?
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; f(−4) = : 1,5 ; Conditions a·f(k₁) et a·f(k₂) : 3)
    [free, sans aide, suivre l'erreur, examen open]  m·3² + (−2m + 2)·3 + (−2m − 11)
      (f(3) =)
      = m − 5   ← Développer et réduire
    — f(−4) =  [juge equiv]  départ : m·(−4)² + (−2m + 2)·(−4) + (−2m − 11)
      = 22m − 19   ← Développer et réduire
    — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : m(m − 5) < 0 et m(22m − 19) > 0
      = 0 < m < 5 et m ∈ ]−∞ ; 0[ ∪ ]19/22 ; +∞[   ← Résoudre chaque condition
      = ]19/22 ; 5[   ← Intersecter

Pour quels m l'équation (m − 2)x² − 2mx + 2m − 3 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  · ]−∞ ; 2[ ∪ ]5 ; +∞[   · [2 ; 5]   ✔ ]2 ; 5[   · ]−∞ ; 5[ [g1_viete_a]
  [examen mcq]
  pièges : g1_viete_a

```

## Valeur absolue : équations (`g1-abs-eq`, Gymnase)

_Un cas par signe, et on garde les solutions du cas._

### Niveau 1

```
Résous |3x + 1| = 2x + 4.
  [guided]  |3x + 1| = 2x + 4
    (Cas x ≥ −1/3 :)
    (3x + 1 = 2x + 4)
    = x = 3   ← Isoler x : la solution est dans le cas
  — Cas x < −1/3 :  [juge solset]  départ : |3x + 1| = 2x + 4
    (−(3x + 1) = 2x + 4)
    = x = −1   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−1 ; 3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −1/3. | Cas x ≥ −1/3 : 3x + 1 = 2x + 4 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |2x + 3| = x + 4.
  [guided]  |2x + 3| = x + 4
    (Cas x ≥ −3/2 :)
    (2x + 3 = x + 4)
    = x = 1   ← Isoler x : la solution est dans le cas
  — Cas x < −3/2 :  [juge solset]  départ : |2x + 3| = x + 4
    (−(2x + 3) = x + 4)
    = x = −7/3   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−7/3 ; 1}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −3/2. | Cas x ≥ −3/2 : 2x + 3 = x + 4 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |2x − 2| = x + 5.
  [guided]  |2x − 2| = x + 5
    (Cas x ≥ 1 :)
    (2x − 2 = x + 5)
    = x = 7   ← Isoler x : la solution est dans le cas
  — Cas x < 1 :  [juge solset]  départ : |2x − 2| = x + 5
    (−(2x − 2) = x + 5)
    = x = −1   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−1 ; 7}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 1. | Cas x ≥ 1 : 2x − 2 = x + 5 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

```

### Niveau 2

```
Résous |3x + 5| = −x + 1.
  [guided]  3x + 5 = 0
    (Frontières des cas :)
    = {−5/3}   ← Là où |…| change d'écriture
  — Cas x ≥ −5/3 :  [juge solset]  départ : |3x + 5| = −x + 1
    = 3x + 5 = −x + 1   ← Ôter la valeur absolue dans ce cas
    = x = −1   ← Isoler x : la solution est dans le cas
  — Cas x < −5/3 :  [juge solset]  départ : |3x + 5| = −x + 1
    = −(3x + 5) = −x + 1   ← Ôter la valeur absolue dans ce cas
    = x = −3   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−3 ; −1}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −5/3. | Cas x ≥ −5/3 : 3x + 5 = −x + 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

Résous |x − 4| = 2x.
  [guided]  x − 4 = 0
    (Frontières des cas :)
    = {4}   ← Là où |…| change d'écriture
  — Cas x ≥ 4 :  [juge solset]  départ : |x − 4| = 2x
    = x − 4 = 2x   ← Ôter la valeur absolue dans ce cas
    = x = −4   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x < 4 :  [juge solset]  départ : |x − 4| = 2x
    = −(x − 4) = 2x   ← Ôter la valeur absolue dans ce cas
    = x = 4/3   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {4/3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 4. | Cas x ≥ 4 : x − 4 = 2x | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

Résous |x − 1| = −2x − 5.
  [guided]  x − 1 = 0
    (Frontières des cas :)
    = {1}   ← Là où |…| change d'écriture
  — Cas x ≥ 1 :  [juge solset]  départ : |x − 1| = −2x − 5
    = x − 1 = −2x − 5   ← Ôter la valeur absolue dans ce cas
    = x = −4/3   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x < 1 :  [juge solset]  départ : |x − 1| = −2x − 5
    = −(x − 1) = −2x − 5   ← Ôter la valeur absolue dans ce cas
    = x = −6   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−6}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 1. | Cas x ≥ 1 : x − 1 = −2x − 5 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

```

### Niveau 3

```
Résous |3x + 3| = −x + 1.
  [tap, suivre l'erreur, menu steps]  |3x + 3| = −x + 1
    (Cas x ≥ −1 :)
    = 3x + 3 = −x + 1   ← Ôter la valeur absolue dans ce cas
    = x = −1/2   ← Isoler x : la solution est dans le cas
  — Cas x < −1 :  [juge solset]  départ : |3x + 3| = −x + 1
    = −(3x + 3) = −x + 1   ← Ôter la valeur absolue dans ce cas
    = x = −2   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−2 ; −1/2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −1. | Cas x ≥ −1 : 3x + 3 = −x + 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |2x + 4| = −x + 2.
  [tap, suivre l'erreur, menu steps]  |2x + 4| = −x + 2
    (Cas x ≥ −2 :)
    = 2x + 4 = −x + 2   ← Ôter la valeur absolue dans ce cas
    = x = −2/3   ← Isoler x : la solution est dans le cas
  — Cas x < −2 :  [juge solset]  départ : |2x + 4| = −x + 2
    = −(2x + 4) = −x + 2   ← Ôter la valeur absolue dans ce cas
    = x = −6   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−6 ; −2/3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −2. | Cas x ≥ −2 : 2x + 4 = −x + 2 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |x − 3| = −2x − 1.
  [tap, suivre l'erreur, menu steps]  |x − 3| = −2x − 1
    (Cas x ≥ 3 :)
    = x − 3 = −2x − 1   ← Ôter la valeur absolue dans ce cas
    = x = 2/3   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x < 3 :  [juge solset]  départ : |x − 3| = −2x − 1
    = −(x − 3) = −2x − 1   ← Ôter la valeur absolue dans ce cas
    = x = −4   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−4}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 3. | Cas x ≥ 3 : x − 3 = −2x − 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

```

### Niveau 4

```
Résous |x + 4| = −2x.
  [free, suivre l'erreur]  |x + 4| = −2x
    (Cas x ≥ −4 :)
    = x + 4 = −2x   ← Ôter la valeur absolue dans ce cas
    = x = −4/3   ← Isoler x : la solution est dans le cas
  — Cas x < −4 :  [juge solset]  départ : |x + 4| = −2x
    = −(x + 4) = −2x   ← Ôter la valeur absolue dans ce cas
    = x = 4   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−4/3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −4. | Cas x ≥ −4 : x + 4 = −2x | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |x − 6| − |x − 4| − |2x + 1| = 1.
  [free, suivre l'erreur]  |x − 6| − |x − 4| − |2x + 1| = 1
    (Cas x < −1/2 :)
    = −(x − 6) + (x − 4) + (2x + 1) = 1   ← Ôter la valeur absolue dans ce cas
    = x = −1   ← Isoler x : la solution est dans le cas
  — Cas −1/2 ≤ x < 4 :  [juge solset]  départ : |x − 6| − |x − 4| − |2x + 1| = 1
    = −(x − 6) + (x − 4) − (2x + 1) = 1   ← Ôter la valeur absolue dans ce cas
    = x = 0   ← Isoler x : la solution est dans le cas
  — Cas 4 ≤ x < 6 :  [juge solset]  départ : |x − 6| − |x − 4| − |2x + 1| = 1
    = −(x − 6) − (x − 4) − (2x + 1) = 1   ← Ôter la valeur absolue dans ce cas
    = x = 2   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x ≥ 6 :  [juge solset]  départ : |x − 6| − |x − 4| − |2x + 1| = 1
    = (x − 6) − (x − 4) − (2x + 1) = 1   ← Ôter la valeur absolue dans ce cas
    = x = −2   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {−1 ; 0}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −1/2, 4, 6. | Cas x < −1/2 : −(x − 6) + (x − 4) + (2x + 1) = 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped

Résous |3x + 5| = −x − 1.
  [free, suivre l'erreur]  |3x + 5| = −x − 1
    (Cas x ≥ −5/3 :)
    = 3x + 5 = −x − 1   ← Ôter la valeur absolue dans ce cas
    = x = −3/2   ← Isoler x : la solution est dans le cas
  — Cas x < −5/3 :  [juge solset]  départ : |3x + 5| = −x − 1
    = −(3x + 5) = −x − 1   ← Ôter la valeur absolue dans ce cas
    = x = −2   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−2 ; −3/2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −5/3. | Cas x ≥ −5/3 : 3x + 5 = −x − 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

```

### Niveau 5

```
Résous |x² + 2x| − |x + 3| − 3 = 0.
  [free, sans aide]  |x² + 2x| − |x + 3| − 3 = 0
    (Cas x < −3 :)
    = (x² + 2x) + (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² + 3x = 0   ← Réduire
    = {−3 ; 0}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas −3 ≤ x < −2 :  [juge solset]  départ : |x² + 2x| − |x + 3| − 3 = 0
    = (x² + 2x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² + x − 6 = 0   ← Réduire
    = {−3 ; 2}   ← Résoudre
    = {−3}   ← Garder les solutions du cas
  — Cas −2 ≤ x < 0 :  [juge solset]  départ : |x² + 2x| − |x + 3| − 3 = 0
    = −(x² + 2x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² − 3x − 6 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 0 :  [juge solset]  départ : |x² + 2x| − |x + 3| − 3 = 0
    = (x² + 2x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² + x − 6 = 0   ← Réduire
    = {−3 ; 2}   ← Résoudre
    = {2}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {−3 ; 2}   ← Réunir les cas
  pièges : g1_abs_dropped

Résous |x² − 4x| − |x + 3| − 3 = 0.
  [free, sans aide]  |x² − 4x| − |x + 3| − 3 = 0
    (Cas x < −3 :)
    = (x² − 4x) + (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 3x = 0   ← Réduire
    = {0 ; 3}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas −3 ≤ x < 0 :  [juge solset]  départ : |x² − 4x| − |x + 3| − 3 = 0
    = (x² − 4x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 5x − 6 = 0   ← Réduire
    = {−1 ; 6}   ← Résoudre
    = {−1}   ← Garder les solutions du cas
  — Cas 0 ≤ x < 4 :  [juge solset]  départ : |x² − 4x| − |x + 3| − 3 = 0
    = −(x² − 4x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² + 3x − 6 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 4 :  [juge solset]  départ : |x² − 4x| − |x + 3| − 3 = 0
    = (x² − 4x) − (x + 3) − 3 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 5x − 6 = 0   ← Réduire
    = {−1 ; 6}   ← Résoudre
    = {6}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {−1 ; 6}   ← Réunir les cas
  pièges : g1_abs_dropped

Résous |x² − 6x + 8| − |x| − 2 = 0.
  [free, sans aide]  |x² − 6x + 8| − |x| − 2 = 0
    (Cas x < 0 :)
    = (x² − 6x + 8) + x − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 5x + 6 = 0   ← Réduire
    = {2 ; 3}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas 0 ≤ x < 2 :  [juge solset]  départ : |x² − 6x + 8| − |x| − 2 = 0
    = (x² − 6x + 8) − x − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 7x + 6 = 0   ← Réduire
    = {1 ; 6}   ← Résoudre
    = {1}   ← Garder les solutions du cas
  — Cas 2 ≤ x < 4 :  [juge solset]  départ : |x² − 6x + 8| − |x| − 2 = 0
    = −(x² − 6x + 8) − x − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² + 5x − 10 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 4 :  [juge solset]  départ : |x² − 6x + 8| − |x| − 2 = 0
    = (x² − 6x + 8) − x − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 7x + 6 = 0   ← Réduire
    = {1 ; 6}   ← Résoudre
    = {6}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {1 ; 6}   ← Réunir les cas
  pièges : g1_abs_dropped

```

### Variantes d'examen

```
Ensemble des solutions de |3x − 2| = 2x + 2 :
  · {0}   · {4} [g1_abs_dropped]   · ∅   ✔ {0 ; 4}
  [examen mcq]
  pièges : g1_abs_dropped

Vrai ou faux ?
  « L'équation |x − 5| = −2 n'a aucune solution. » → VRAI
  [examen tf]

```

## Valeur absolue : inéquations, y compris avec un 2e degré (`g1-abs-ineq`, Gymnase)

_|A| < B : encadrement ; |A| > B : « ou » ; sinon des cas._

### Niveau 1

```
Résous |x + 4| ≤ 3.
  [guided]  |x + 4| ≤ 3
    = −3 ≤ x + 4 ≤ 3   ← |A| < r ⇔ −r < A < r
    = □ ≤ x ≤ □   (trous : −7 ≤ x ≤ −1)   ← Ajouter −4
    = [−7 ; −1]   ← Écrire l'intervalle
  aides : |A| ≤ 3 ⇔ −3 ≤ A ≤ 3 : un encadrement. | −3 ≤ x + 4 ≤ 3 | −7 ≤ x ≤ −1
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |x + 3| ≤ 4.
  [guided]  |x + 3| ≤ 4
    = −4 ≤ x + 3 ≤ 4   ← |A| < r ⇔ −r < A < r
    = □ ≤ x ≤ □   (trous : −7 ≤ x ≤ 1)   ← Ajouter −3
    = [−7 ; 1]   ← Écrire l'intervalle
  aides : |A| ≤ 4 ⇔ −4 ≤ A ≤ 4 : un encadrement. | −4 ≤ x + 3 ≤ 4 | −7 ≤ x ≤ 1
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |x + 4| < 4.
  [guided]  |x + 4| < 4
    = −4 < x + 4 < 4   ← |A| < r ⇔ −r < A < r
    = □ < x < □   (trous : −8 < x < 0)   ← Ajouter −4
    = ]−8 ; 0[   ← Écrire l'intervalle
  aides : |A| < 4 ⇔ −4 < A < 4 : un encadrement. | −4 < x + 4 < 4 | −8 < x < 0
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

```

### Niveau 2

```
Résous |3x + 6| > 5.
  [guided]  |3x + 6| > 5
    = 3x + 6 < □ ou 3x + 6 > 5   (trous : 3x + 6 < −5 ou 3x + 6 > 5)   ← |A| > r ⇔ A < −r ou A > r
    = x < −11/3 ou x > −1/3   ← Isoler x
    = ]−∞ ; −11/3[ ∪ ]−1/3 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 3x + 6 < −5 ou 3x + 6 > 5 | x < −11/3 ou x > −1/3
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |2x − 2| ≥ 1.
  [guided]  |2x − 2| ≥ 1
    = 2x − 2 ≤ □ ou 2x − 2 ≥ 1   (trous : 2x − 2 ≤ −1 ou 2x − 2 ≥ 1)   ← |A| > r ⇔ A < −r ou A > r
    = x ≤ 1/2 ou x ≥ 3/2   ← Isoler x
    = ]−∞ ; 1/2] ∪ [3/2 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 2x − 2 ≤ −1 ou 2x − 2 ≥ 1 | x ≤ 1/2 ou x ≥ 3/2
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |2x + 1| > 3.
  [guided]  |2x + 1| > 3
    = 2x + 1 < □ ou 2x + 1 > 3   (trous : 2x + 1 < −3 ou 2x + 1 > 3)   ← |A| > r ⇔ A < −r ou A > r
    = x < −2 ou x > 1   ← Isoler x
    = ]−∞ ; −2[ ∪ ]1 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 2x + 1 < −3 ou 2x + 1 > 3 | x < −2 ou x > 1
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

```

### Niveau 3

```
Résous x² + |x − 1| ≤ 1.
  [tap, suivre l'erreur, menu steps]  x² + |x − 1| ≤ 1
    (Cas x ≥ 1 :)
    = x² + (x − 1) ≤ 1   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 ≤ 0   ← Réduire
    = [−2 ; 1]   ← Résoudre
    = {1}   ← Garder les solutions du cas
  — Cas x < 1 :  [juge solset]  départ : x² + |x − 1| ≤ 1
    = x² − (x − 1) ≤ 1   ← Ôter la valeur absolue dans ce cas
    = x² − x ≤ 0   ← Réduire
    = [0 ; 1]   ← Résoudre
    = [0 ; 1[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [0 ; 1]   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 1 : x² + (x − 1) ≤ 1 | Cas x ≥ 1 : solutions brutes [−2 ; 1], dans le cas : {1}
  pièges : g1_abs_dropped, g1_trinome_sign_swap

Résous x² − |3x + 2| ≥ 2x + 4.
  [tap, suivre l'erreur, menu steps]  x² − |3x + 2| ≥ 2x + 4
    (Cas x ≥ −2/3 :)
    = x² − (3x + 2) ≥ 2x + 4   ← Ôter la valeur absolue dans ce cas
    = x² − 5x − 6 ≥ 0   ← Réduire
    = ]−∞ ; −1] ∪ [6 ; +∞[   ← Résoudre
    = [6 ; +∞[   ← Garder les solutions du cas
  — Cas x < −2/3 :  [juge solset]  départ : x² − |3x + 2| ≥ 2x + 4
    = x² + (3x + 2) ≥ 2x + 4   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 ≥ 0   ← Réduire
    = ]−∞ ; −2] ∪ [1 ; +∞[   ← Résoudre
    = ]−∞ ; −2]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −2] ∪ [6 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ −2/3 : x² − (3x + 2) ≥ 2x + 4 | Cas x ≥ −2/3 : solutions brutes ]−∞ ; −1] ∪ [6 ; +∞[, dans le cas : [6 ; +∞[
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Résous x² − |2x − 3| > −3x + 3.
  [tap, suivre l'erreur, menu steps]  x² − |2x − 3| > −3x + 3
    (Cas x ≥ 3/2 :)
    = x² − (2x − 3) > −3x + 3   ← Ôter la valeur absolue dans ce cas
    = x² + x > 0   ← Réduire
    = ]−∞ ; −1[ ∪ ]0 ; +∞[   ← Résoudre
    = [3/2 ; +∞[   ← Garder les solutions du cas
  — Cas x < 3/2 :  [juge solset]  départ : x² − |2x − 3| > −3x + 3
    = x² + (2x − 3) > −3x + 3   ← Ôter la valeur absolue dans ce cas
    = x² + 5x − 6 > 0   ← Réduire
    = ]−∞ ; −6[ ∪ ]1 ; +∞[   ← Résoudre
    = ]−∞ ; −6[ ∪ ]1 ; 3/2[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −6[ ∪ ]1 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 3/2 : x² − (2x − 3) > −3x + 3 | Cas x ≥ 3/2 : solutions brutes ]−∞ ; −1[ ∪ ]0 ; +∞[, dans le cas : [3/2 ; +∞[
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

```

### Niveau 4

```
Résous x² + |2x − 2| > x.
  [free, suivre l'erreur]  x² + |2x − 2| > x
    (Cas x ≥ 1 :)
    = x² + (2x − 2) > x   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 > 0   ← Réduire
    = ]−∞ ; −2[ ∪ ]1 ; +∞[   ← Résoudre
    = ]1 ; +∞[   ← Garder les solutions du cas
  — Cas x < 1 :  [juge solset]  départ : x² + |2x − 2| > x
    = x² − (2x − 2) > x   ← Ôter la valeur absolue dans ce cas
    = x² − 3x + 2 > 0   ← Réduire
    = ]−∞ ; 1[ ∪ ]2 ; +∞[   ← Résoudre
    = ]−∞ ; 1[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; 1[ ∪ ]1 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 1 : x² + (2x − 2) > x | Cas x ≥ 1 : solutions brutes ]−∞ ; −2[ ∪ ]1 ; +∞[, dans le cas : ]1 ; +∞[
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Résous x² − |3x + 1| > −2x + 1.
  [free, suivre l'erreur]  x² − |3x + 1| > −2x + 1
    (Cas x ≥ −1/3 :)
    = x² − (3x + 1) > −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² − x − 2 > 0   ← Réduire
    = ]−∞ ; −1[ ∪ ]2 ; +∞[   ← Résoudre
    = ]2 ; +∞[   ← Garder les solutions du cas
  — Cas x < −1/3 :  [juge solset]  départ : x² − |3x + 1| > −2x + 1
    = x² + (3x + 1) > −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² + 5x > 0   ← Réduire
    = ]−∞ ; −5[ ∪ ]0 ; +∞[   ← Résoudre
    = ]−∞ ; −5[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5[ ∪ ]2 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ −1/3 : x² − (3x + 1) > −2x + 1 | Cas x ≥ −1/3 : solutions brutes ]−∞ ; −1[ ∪ ]2 ; +∞[, dans le cas : ]2 ; +∞[
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Résous x² − |3x + 3| ≥ −x.
  [free, suivre l'erreur]  x² − |3x + 3| ≥ −x
    (Cas x ≥ −1 :)
    = x² − (3x + 3) ≥ −x   ← Ôter la valeur absolue dans ce cas
    = x² − 2x − 3 ≥ 0   ← Réduire
    = ]−∞ ; −1] ∪ [3 ; +∞[   ← Résoudre
    = {−1} ∪ [3 ; +∞[   ← Garder les solutions du cas
  — Cas x < −1 :  [juge solset]  départ : x² − |3x + 3| ≥ −x
    = x² + (3x + 3) ≥ −x   ← Ôter la valeur absolue dans ce cas
    = x² + 4x + 3 ≥ 0   ← Réduire
    = ]−∞ ; −3] ∪ [−1 ; +∞[   ← Résoudre
    = ]−∞ ; −3]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −3] ∪ {−1} ∪ [3 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ −1 : x² − (3x + 3) ≥ −x | Cas x ≥ −1 : solutions brutes ]−∞ ; −1] ∪ [3 ; +∞[, dans le cas : {−1} ∪ [3 ; +∞[
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

```

### Niveau 5

```
Résous x² − |3x − 6| ≤ 2x.
  [free, sans aide]  x² − |3x − 6| ≤ 2x
    (Cas x ≥ 2 :)
    = x² − (3x − 6) ≤ 2x   ← Ôter la valeur absolue dans ce cas
    = x² − 5x + 6 ≤ 0   ← Réduire
    = [2 ; 3]   ← Résoudre
  — Cas x < 2 :  [juge solset]  départ : x² − |3x − 6| ≤ 2x
    = x² + (3x − 6) ≤ 2x   ← Ôter la valeur absolue dans ce cas
    = x² + x − 6 ≤ 0   ← Réduire
    = [−3 ; 2]   ← Résoudre
    = [−3 ; 2[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−3 ; 3]   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Résous x² − |3x + 3| ≤ −2x + 3.
  [free, sans aide]  x² − |3x + 3| ≤ −2x + 3
    (Cas x ≥ −1 :)
    = x² − (3x + 3) ≤ −2x + 3   ← Ôter la valeur absolue dans ce cas
    = x² − x − 6 ≤ 0   ← Réduire
    = [−2 ; 3]   ← Résoudre
    = [−1 ; 3]   ← Garder les solutions du cas
  — Cas x < −1 :  [juge solset]  départ : x² − |3x + 3| ≤ −2x + 3
    = x² + (3x + 3) ≤ −2x + 3   ← Ôter la valeur absolue dans ce cas
    = x² + 5x ≤ 0   ← Réduire
    = [−5 ; 0]   ← Résoudre
    = [−5 ; −1[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−5 ; 3]   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Résous x² − |x − 4| > −2x + 6.
  [free, sans aide]  x² − |x − 4| > −2x + 6
    (Cas x ≥ 4 :)
    = x² − (x − 4) > −2x + 6   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 > 0   ← Réduire
    = ]−∞ ; −2[ ∪ ]1 ; +∞[   ← Résoudre
    = [4 ; +∞[   ← Garder les solutions du cas
  — Cas x < 4 :  [juge solset]  départ : x² − |x − 4| > −2x + 6
    = x² + (x − 4) > −2x + 6   ← Ôter la valeur absolue dans ce cas
    = x² + 3x − 10 > 0   ← Réduire
    = ]−∞ ; −5[ ∪ ]2 ; +∞[   ← Résoudre
    = ]−∞ ; −5[ ∪ ]2 ; 4[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5[ ∪ ]2 ; +∞[   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

```

### Variantes d'examen

```
Résous x² − |3x + 3| > 3x + 4.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 2 ; Cas x < −1 : 2 ; Réunion : 1)
    [free, sans aide, suivre l'erreur, examen open]  x² − |3x + 3| > 3x + 4
      (Cas x ≥ −1 :)
      = x² − (3x + 3) > 3x + 4   ← Ôter la valeur absolue dans ce cas
      = x² − 6x − 7 > 0   ← Réduire
      = ]−∞ ; −1[ ∪ ]7 ; +∞[   ← Résoudre
      = ]7 ; +∞[   ← Garder les solutions du cas
    — Cas x < −1 :  [juge solset]  départ : x² − |3x + 3| > 3x + 4
      = x² + (3x + 3) > 3x + 4   ← Ôter la valeur absolue dans ce cas
      = x² − 1 > 0   ← Réduire
      = ]−∞ ; −1[ ∪ ]1 ; +∞[   ← Résoudre
      = ]−∞ ; −1[   ← Garder les solutions du cas
    — Réunion :  [juge solset]  départ : S_1 ∪ S_2
      = ]−∞ ; −1[ ∪ ]7 ; +∞[   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket, g1_trinome_sign_swap

Ensemble des solutions de x² + |x + 2| > 2x + 2 :
  · ]−∞ ; −1[ ∪ ]4 ; +∞[   · [0 ; 1]   ✔ ]−∞ ; 0[ ∪ ]1 ; +∞[
  [examen mcq]

```

## Équations irrationnelles (`g1-irr-eq`, Gymnase)

_√A = B ⇔ B ≥ 0 et A = B²._

### Niveau 1

```
Résous √(−x + 3) = x − 1.
  [guided]  x − 1 ≥ 0 et −x + 3 = (x − 1)²
    = x ≥ 1 et x² − x − 2 = 0   ← Développer, tout d'un côté
    = x ≥ 1 et (x = □ ou x = □)   (trous : x ≥ 1 et (x = 2 ou x = −1))   ← Résoudre
    = {2}   ← Trier : −1 ne vérifie pas x ≥ 1
  aides : Une racine carrée est ≥ 0 : il faut x − 1 ≥ 0. | −x + 3 = (x − 1)², donc x² − x − 2 = 0 | x ≥ 1 et (x = 2 ou x = −1)
  pièges : g1_irr_extraneous, g9_union_inter

Résous √(−3x + 4) = x.
  [guided]  x ≥ 0 et −3x + 4 = x²
    = x ≥ 0 et x² + 3x − 4 = 0   ← Développer, tout d'un côté
    = x ≥ 0 et (x = □ ou x = □)   (trous : x ≥ 0 et (x = 1 ou x = −4))   ← Résoudre
    = {1}   ← Trier : −4 ne vérifie pas x ≥ 0
  aides : Une racine carrée est ≥ 0 : il faut x ≥ 0. | −3x + 4 = (x)², donc x² + 3x − 4 = 0 | x ≥ 0 et (x = 1 ou x = −4)
  pièges : g1_irr_extraneous, g9_union_inter

Résous √(−2x + 2) = x − 1.
  [guided]  x − 1 ≥ 0 et −2x + 2 = (x − 1)²
    = x ≥ 1 et x² − 1 = 0   ← Développer, tout d'un côté
    = x ≥ □ et (x = 1 ou x = □)   (trous : x ≥ 1 et (x = 1 ou x = −1))   ← Résoudre
    = {1}   ← Trier : −1 ne vérifie pas x ≥ 1
  aides : Une racine carrée est ≥ 0 : il faut x − 1 ≥ 0. | −2x + 2 = (x − 1)², donc x² − 1 = 0 | x ≥ 1 et (x = 1 ou x = −1)
  pièges : g1_irr_extraneous, g9_union_inter

```

### Niveau 2

```
Résous √(−3x + 1) = x + 1.
  [guided]  √(−3x + 1) = x + 1
    = □ et −3x + 1 = (x + 1)²   (trous : x + 1 ≥ 0 et −3x + 1 = (x + 1)²)   ← Condition B ≥ 0 et carré
    = x ≥ −1 et x² + 5x = 0   ← Développer, tout d'un côté
    = x ≥ −1 et (x = 0 ou x = −5)   ← Résoudre
    = {0}   ← Trier : −5 ne vérifie pas x ≥ −1
  aides : Une racine carrée est ≥ 0 : il faut x + 1 ≥ 0. | −3x + 1 = (x + 1)², donc x² + 5x = 0 | x ≥ −1 et (x = 0 ou x = −5)
  pièges : g1_irr_extraneous

Résous √(3x + 10) = −x − 2.
  [guided]  √(3x + 10) = −x − 2
    = □ et 3x + 10 = (−x − 2)²   (trous : −x − 2 ≥ 0 et 3x + 10 = (−x − 2)²)   ← Condition B ≥ 0 et carré
    = x ≤ −2 et x² + x − 6 = 0   ← Développer, tout d'un côté
    = x ≤ −2 et (x = −3 ou x = 2)   ← Résoudre
    = {−3}   ← Trier : 2 ne vérifie pas x ≤ −2
  aides : Une racine carrée est ≥ 0 : il faut −x − 2 ≥ 0. | 3x + 10 = (−x − 2)², donc x² + x − 6 = 0 | x ≤ −2 et (x = −3 ou x = 2)
  pièges : g1_irr_extraneous

Résous √(−x + 20) = x.
  [guided]  √(−x + 20) = x
    = □ et −x + 20 = x²   (trous : x ≥ 0 et −x + 20 = x²)   ← Condition B ≥ 0 et carré
    = x ≥ 0 et x² + x − 20 = 0   ← Développer, tout d'un côté
    = x ≥ 0 et (x = 4 ou x = −5)   ← Résoudre
    = {4}   ← Trier : −5 ne vérifie pas x ≥ 0
  aides : Une racine carrée est ≥ 0 : il faut x ≥ 0. | −x + 20 = (x)², donc x² + x − 20 = 0 | x ≥ 0 et (x = 4 ou x = −5)
  pièges : g1_irr_extraneous

```

### Niveau 3

```
Résous √(2x − 1) = −x + 2.
  [tap, suivre l'erreur, menu steps]  √(2x − 1) = −x + 2
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire −x + 2 ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = −x + 2 ≥ 0 et 2x − 1 = (−x + 2)²   ← Condition B ≥ 0 et carré
    = x ≤ 2 et x² − 6x + 5 = 0   ← Développer, tout d'un côté
    = x ≤ 2 et (x = 1 ou x = 5)   ← Résoudre
    = {1}   ← Trier : 5 ne vérifie pas x ≤ 2
  aides : Une racine carrée est ≥ 0 : il faut −x + 2 ≥ 0. | 2x − 1 = (−x + 2)², donc x² − 6x + 5 = 0 | x ≤ 2 et (x = 1 ou x = 5)
  pièges : g1_irr_extraneous

Résous √(3x + 19) = −x − 3.
  [tap, suivre l'erreur, menu steps]  √(3x + 19) = −x − 3
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire −x − 3 ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = −x − 3 ≥ 0 et 3x + 19 = (−x − 3)²   ← Condition B ≥ 0 et carré
    = x ≤ −3 et x² + 3x − 10 = 0   ← Développer, tout d'un côté
    = x ≤ −3 et (x = −5 ou x = 2)   ← Résoudre
    = {−5}   ← Trier : 2 ne vérifie pas x ≤ −3
  aides : Une racine carrée est ≥ 0 : il faut −x − 3 ≥ 0. | 3x + 19 = (−x − 3)², donc x² + 3x − 10 = 0 | x ≤ −3 et (x = −5 ou x = 2)
  pièges : g1_irr_extraneous

Résous √(4x + 8) = −x − 2.
  [tap, suivre l'erreur, menu steps]  √(4x + 8) = −x − 2
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire −x − 2 ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = −x − 2 ≥ 0 et 4x + 8 = (−x − 2)²   ← Condition B ≥ 0 et carré
    = x ≤ −2 et x² − 4 = 0   ← Développer, tout d'un côté
    = x ≤ −2 et (x = −2 ou x = 2)   ← Résoudre
    = {−2}   ← Trier : 2 ne vérifie pas x ≤ −2
  aides : Une racine carrée est ≥ 0 : il faut −x − 2 ≥ 0. | 4x + 8 = (−x − 2)², donc x² − 4 = 0 | x ≤ −2 et (x = −2 ou x = 2)
  pièges : g1_irr_extraneous

```

### Niveau 4

```
Résous √(x + 2) + √x = 2.
  [free, suivre l'erreur]  √(x + 2) + √x = 2
    = √(x + 2) = 2 − √x   ← Isoler une racine
    = 2 − √x ≥ 0 et x + 2 = 4 − 4√x + x   ← Condition et carré
    = √x ≤ 2 et 4√x = 2   ← Réduire
    = √x = 1/2   ← Diviser
    = x = 1/4   ← Élever au carré
  aides : Isole d'abord une racine, puis élève au carré avec la condition. | √(x + 2) = 2 − √x | √x ≤ 2 et 4√x = 2

Résous √(3x + 13) = x + 3.
  [free, suivre l'erreur]  √(3x + 13) = x + 3
    = x + 3 ≥ 0 et 3x + 13 = (x + 3)²   ← Condition B ≥ 0 et carré
    = x ≥ −3 et x² + 3x − 4 = 0   ← Développer, tout d'un côté
    = x ≥ −3 et (x = 1 ou x = −4)   ← Résoudre
    = {1}   ← Trier : −4 ne vérifie pas x ≥ −3
  aides : Une racine carrée est ≥ 0 : il faut x + 3 ≥ 0. | 3x + 13 = (x + 3)², donc x² + 3x − 4 = 0 | x ≥ −3 et (x = 1 ou x = −4)
  pièges : g1_irr_extraneous

Résous √(x + 20) = −x.
  [free, suivre l'erreur]  √(x + 20) = −x
    = −x ≥ 0 et x + 20 = (−x)²   ← Condition B ≥ 0 et carré
    = x ≤ 0 et x² − x − 20 = 0   ← Développer, tout d'un côté
    = x ≤ 0 et (x = −4 ou x = 5)   ← Résoudre
    = {−4}   ← Trier : 5 ne vérifie pas x ≤ 0
  aides : Une racine carrée est ≥ 0 : il faut −x ≥ 0. | x + 20 = (−x)², donc x² − x − 20 = 0 | x ≤ 0 et (x = −4 ou x = 5)
  pièges : g1_irr_extraneous

```

### Niveau 5

```
Donne le domaine de √(x² − 2x − 15), puis résous √(x² − 2x − 15) = x + 3.
  [free, sans aide]  √(x² − 2x − 15)
    (Domaine de la racine :)
    = x² − 2x − 15 ≥ 0   ← Radicande ≥ 0
    = (x + 3)(x − 5) ≥ 0   ← Factoriser
    = ]−∞ ; −3] ∪ [5 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² − 2x − 15) = x + 3
    = x + 3 ≥ 0 et x² − 2x − 15 = (x + 3)²   ← Condition et carré
    = x ≥ −3 et −8x = 24   ← Les x² s'en vont
    = x ≥ −3 et x = −3   ← Résoudre
    = {−3}   ← La condition est vérifiée

Donne le domaine de √(x² − x), puis résous √(x² − x) = x + 1.
  [free, sans aide]  √(x² − x)
    (Domaine de la racine :)
    = x² − x ≥ 0   ← Radicande ≥ 0
    = x(x − 1) ≥ 0   ← Factoriser
    = ]−∞ ; 0] ∪ [1 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² − x) = x + 1
    = x + 1 ≥ 0 et x² − x = (x + 1)²   ← Condition et carré
    = x ≥ −1 et −3x = 1   ← Les x² s'en vont
    = x ≥ −1 et x = −1/3   ← Résoudre
    = {−1/3}   ← La condition est vérifiée

Donne le domaine de √(x² + x − 6), puis résous √(x² + x − 6) = x + 3.
  [free, sans aide]  √(x² + x − 6)
    (Domaine de la racine :)
    = x² + x − 6 ≥ 0   ← Radicande ≥ 0
    = (x + 3)(x − 2) ≥ 0   ← Factoriser
    = ]−∞ ; −3] ∪ [2 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² + x − 6) = x + 3
    = x + 3 ≥ 0 et x² + x − 6 = (x + 3)²   ← Condition et carré
    = x ≥ −3 et −5x = 15   ← Les x² s'en vont
    = x ≥ −3 et x = −3   ← Résoudre
    = {−3}   ← La condition est vérifiée

```

### Variantes d'examen

```
Ensemble des solutions de √(3x + 19) = x + 3 :
  ✔ {2}   · {−5 ; 2} [g1_irr_extraneous]   · {−5}   · ∅
  [examen mcq]
  pièges : g1_irr_extraneous

Vrai ou faux ?
  « Pour tout x ∈ ℝ, √(x²) = x. » → FAUX
    contre-exemple (refute) : x = -1
  [examen tf]

```

## Inéquations irrationnelles (`g1-irr-ineq`, CMS)

_Les signes avant d'élever au carré._

### Niveau 1

```
Résous √(x + 3) ≤ x + 1.
  [guided]  √(x + 3) ≤ x + 1
    = x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −3 et x ≥ −1 et □ ≥ 0   (trous : x ≥ −3 et x ≥ −1 et x² + x − 2 ≥ 0)   ← Simplifier
    = x ≥ −3 et x ≥ −1 et (x ≤ −2 ou x ≥ 1)   ← Signe du trinôme
    = [1 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)² | x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 9) < x − 3.
  [guided]  √(x + 9) < x − 3
    = x + 9 ≥ 0 et x − 3 > 0 et x + 9 < (x − 3)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −9 et x > 3 et □ > 0   (trous : x ≥ −9 et x > 3 et x² − 7x > 0)   ← Simplifier
    = x ≥ −9 et x > 3 et (x < 0 ou x > 7)   ← Signe du trinôme
    = ]7 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 9 ≥ 0 et x − 3 ≥ 0 et x + 9 ≤ (x − 3)² | x + 9 ≥ 0 et x − 3 > 0 et x + 9 < (x − 3)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 11) ≤ x − 1.
  [guided]  √(x + 11) ≤ x − 1
    = x + 11 ≥ 0 et x − 1 ≥ 0 et x + 11 ≤ (x − 1)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −11 et x ≥ 1 et □ ≥ 0   (trous : x ≥ −11 et x ≥ 1 et x² − 3x − 10 ≥ 0)   ← Simplifier
    = x ≥ −11 et x ≥ 1 et (x ≤ −2 ou x ≥ 5)   ← Signe du trinôme
    = [5 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 11 ≥ 0 et x − 1 ≥ 0 et x + 11 ≤ (x − 1)² | x + 11 ≥ 0 et x − 1 ≥ 0 et x + 11 ≤ (x − 1)²
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 2

```
Résous √(x + 12) ≥ x.
  [guided]  √(x + 12) ≥ x
    (Cas x < 0 :)
    = x + 12 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−12 ; 0[   ← Garder les x du cas
  — Cas x ≥ 0 :  [juge solset]  départ : √(x + 12) ≥ x
    = x + 12 ≥ x²   ← B ≥ 0 : élever au carré
    = x² − x − 12 ≤ 0   ← Réduire
    = [−3 ; 4]   ← Signe du trinôme
    = [0 ; 4]   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−12 ; 4]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x < 0 : vrai dès que x + 12 ≥ 0. | x + 12 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 4) ≥ x + 2.
  [guided]  √(x + 4) ≥ x + 2
    (Cas x + 2 < 0 :)
    = x + 4 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−4 ; −2[   ← Garder les x du cas
  — Cas x + 2 ≥ 0 :  [juge solset]  départ : √(x + 4) ≥ x + 2
    = x + 4 ≥ (x + 2)²   ← B ≥ 0 : élever au carré
    = x² + 3x ≤ 0   ← Réduire
    = [−3 ; 0]   ← Signe du trinôme
    = [−2 ; 0]   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−4 ; 0]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x + 2 < 0 : vrai dès que x + 4 ≥ 0. | x + 4 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 3) ≥ x − 3.
  [guided]  √(x + 3) ≥ x − 3
    (Cas x − 3 < 0 :)
    = x + 3 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−3 ; 3[   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x + 3) ≥ x − 3
    = x + 3 ≥ (x − 3)²   ← B ≥ 0 : élever au carré
    = x² − 7x + 6 ≤ 0   ← Réduire
    = [1 ; 6]   ← Signe du trinôme
    = [3 ; 6]   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−3 ; 6]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 3 < 0 : vrai dès que x + 3 ≥ 0. | x + 3 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 3

```
Résous √(x + 4) > x − 2.
  [tap, suivre l'erreur, menu steps]  √(x + 4) > x − 2
    (Cas x − 2 < 0 :)
    ? Comment commences-tu ? · Élever au carré directement / ✔ Deux cas, selon le signe du membre sans racine
    = x + 4 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−4 ; 2[   ← Garder les x du cas
  — Cas x − 2 ≥ 0 :  [juge solset]  départ : √(x + 4) > x − 2
    = x + 4 > (x − 2)²   ← B ≥ 0 : élever au carré
    = x² − 5x < 0   ← Réduire
    = ]0 ; 5[   ← Signe du trinôme
    = [2 ; 5[   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−4 ; 5[   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 2 < 0 : vrai dès que x + 4 ≥ 0. | x + 4 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 10) < x − 2.
  [tap, suivre l'erreur, menu steps]  √(x + 10) < x − 2
    ? Comment commences-tu ? · Élever au carré directement / ✔ Écrire les conditions de signe, puis élever au carré
    = x + 10 ≥ 0 et x − 2 > 0 et x + 10 < (x − 2)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −10 et x > 2 et x² − 5x − 6 > 0   ← Simplifier
    = x ≥ −10 et x > 2 et (x < −1 ou x > 6)   ← Signe du trinôme
    = ]6 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 10 ≥ 0 et x − 2 ≥ 0 et x + 10 ≤ (x − 2)² | x + 10 ≥ 0 et x − 2 > 0 et x + 10 < (x − 2)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 7) ≤ x + 1.
  [tap, suivre l'erreur, menu steps]  √(x + 7) ≤ x + 1
    ? Comment commences-tu ? · Élever au carré directement / ✔ Écrire les conditions de signe, puis élever au carré
    = x + 7 ≥ 0 et x + 1 ≥ 0 et x + 7 ≤ (x + 1)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −7 et x ≥ −1 et x² + x − 6 ≥ 0   ← Simplifier
    = x ≥ −7 et x ≥ −1 et (x ≤ −3 ou x ≥ 2)   ← Signe du trinôme
    = [2 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 7 ≥ 0 et x + 1 ≥ 0 et x + 7 ≤ (x + 1)² | x + 7 ≥ 0 et x + 1 ≥ 0 et x + 7 ≤ (x + 1)²
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 4

```
Résous √(x² + 4x − 5) ≥ x − 3.
  [free, suivre l'erreur]  √(x² + 4x − 5) ≥ x − 3
    (Cas x − 3 < 0 :)
    = x² + 4x − 5 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −5] ∪ [1 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −5] ∪ [1 ; 3[   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x² + 4x − 5) ≥ x − 3
    = x² + 4x − 5 ≥ (x − 3)²   ← B ≥ 0 : élever au carré
    = 10x ≥ 14   ← Les x² s'en vont
    = [7/5 ; +∞[   ← Isoler x
    = [3 ; +∞[   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5] ∪ [1 ; +∞[   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 3 < 0 : vrai dès que x² + 4x − 5 ≥ 0. | x² + 4x − 5 ≥ 0
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

Résous √(x² + 5x + 4) ≤ x + 3.
  [free, suivre l'erreur]  √(x² + 5x + 4) ≤ x + 3
    = x² + 5x + 4 ≥ 0 et x + 3 ≥ 0 et x² + 5x + 4 ≤ (x + 3)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = (x ≤ −4 ou x ≥ −1) et x ≥ −3 et −x ≤ 5   ← Signe du trinôme ; les x² s'en vont
    = [−1 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x² + 5x + 4 ≥ 0 et x + 3 ≥ 0 et x² + 5x + 4 ≤ (x + 3)² | x² + 5x + 4 ≥ 0 et x + 3 ≥ 0 et x² + 5x + 4 ≤ (x + 3)²
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

Résous √(x² − 3x − 4) ≥ x.
  [free, suivre l'erreur]  √(x² − 3x − 4) ≥ x
    (Cas x < 0 :)
    = x² − 3x − 4 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −1] ∪ [4 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −1]   ← Garder les x du cas
  — Cas x ≥ 0 :  [juge solset]  départ : √(x² − 3x − 4) ≥ x
    = x² − 3x − 4 ≥ x²   ← B ≥ 0 : élever au carré
    = −3x ≥ 4   ← Les x² s'en vont
    = ]−∞ ; −4/3]   ← Isoler x
    = ∅   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −1]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x < 0 : vrai dès que x² − 3x − 4 ≥ 0. | x² − 3x − 4 ≥ 0
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

```

### Niveau 5

```
Résous √(x² + 4x) > x.
  [free, sans aide]  √(x² + 4x) > x
    (Cas x < 0 :)
    = x² + 4x ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −4] ∪ [0 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −4]   ← Garder les x du cas
  — Cas x ≥ 0 :  [juge solset]  départ : √(x² + 4x) > x
    = x² + 4x > x²   ← B ≥ 0 : élever au carré
    = 4x > 0   ← Les x² s'en vont
    = ]0 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −4] ∪ ]0 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

Résous √(x² + 3x) > x.
  [free, sans aide]  √(x² + 3x) > x
    (Cas x < 0 :)
    = x² + 3x ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −3] ∪ [0 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −3]   ← Garder les x du cas
  — Cas x ≥ 0 :  [juge solset]  départ : √(x² + 3x) > x
    = x² + 3x > x²   ← B ≥ 0 : élever au carré
    = 3x > 0   ← Les x² s'en vont
    = ]0 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −3] ∪ ]0 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

Résous √(x² − x − 2) ≥ x − 1.
  [free, sans aide]  √(x² − x − 2) ≥ x − 1
    (Cas x − 1 < 0 :)
    = x² − x − 2 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −1] ∪ [2 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −1]   ← Garder les x du cas
  — Cas x − 1 ≥ 0 :  [juge solset]  départ : √(x² − x − 2) ≥ x − 1
    = x² − x − 2 ≥ (x − 1)²   ← B ≥ 0 : élever au carré
    = x ≥ 3   ← Les x² s'en vont
    = [3 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −1] ∪ [3 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

```

### Variantes d'examen

```
Résous √(x² + x − 6) ≥ x + 2.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 2 ; Cas x + 2 ≥ 0 : 3 ; Réunion : 1)
    [free, sans aide, suivre l'erreur, examen open]  √(x² + x − 6) ≥ x + 2
      (Cas x + 2 < 0 :)
      = x² + x − 6 ≥ 0   ← B < 0 : vrai dès que la racine existe
      = ]−∞ ; −3] ∪ [2 ; +∞[   ← Signe du trinôme
      = ]−∞ ; −3]   ← Garder les x du cas
    — Cas x + 2 ≥ 0 :  [juge solset]  départ : √(x² + x − 6) ≥ x + 2
      = x² + x − 6 ≥ (x + 2)²   ← B ≥ 0 : élever au carré
      = −3x ≥ 10   ← Les x² s'en vont
      = ]−∞ ; −10/3]   ← Isoler x
      = ∅   ← Garder les x du cas
    — Réunion :  [juge solset]  départ : S_1 ∪ S_2
      = ]−∞ ; −3]   ← Réunir
  pièges : g1_square_no_cond, g9_bracket, g1_trinome_sign_swap

Ensemble des solutions de √(x + 11) ≥ x − 1 :
  · ]5 ; +∞[   ✔ [−11 ; 5]   · [−2 ; 5] [g1_square_no_cond]
  [examen mcq]
  pièges : g1_square_no_cond

```

## Majorer ou minorer une expression (`g1-bound`, CMS)

_Majorer chaque facteur, minorer le dénominateur._

### Niveau 1

```
Montre que si x ∈ [0 ; 2], alors |(x² − 5)/(x + 2)| ≤ 5/2. Écris une chaîne de majorations.
  [guided]  |(x² − 5)/(x + 2)|
    = |x² − 5|/(x + 2)   ← x + 2 > 0 sur l'intervalle
    = 5/(x + 2)   ← x² ∈ [0 ; 4], donc |x² − 5| ≤ 5
    = □   (trous : 5/2)   ← x + 2 ≥ 2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 5|/(x + 2) | 5/(x + 2)
  pièges : g1_bound_denominator

Montre que si x ∈ [1/2 ; 3/2], alors |(x² − 8)/(x + 2)| ≤ 31/10. Écris une chaîne de majorations.
  [guided]  |(x² − 8)/(x + 2)|
    = |x² − 8|/(x + 2)   ← x + 2 > 0 sur l'intervalle
    = (31/4)/(x + 2)   ← x² ∈ [1/4 ; 9/4], donc |x² − 8| ≤ 31/4
    = □   (trous : 31/10)   ← x + 2 ≥ 5/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 8|/(x + 2) | (31/4)/(x + 2)
  pièges : g1_bound_denominator

Montre que si x ∈ [0 ; 2], alors |(x² − 7)/(x + 1)| ≤ 7. Écris une chaîne de majorations.
  [guided]  |(x² − 7)/(x + 1)|
    = |x² − 7|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = 7/(x + 1)   ← x² ∈ [0 ; 4], donc |x² − 7| ≤ 7
    = □   (trous : 7)   ← x + 1 ≥ 1
  aides : Majore le numérateur et minore le dénominateur. | |x² − 7|/(x + 1) | 7/(x + 1)
  pièges : g1_bound_denominator

```

### Niveau 2

```
Montre que si |x − 2| ≤ 1, alors |x² + x − 6| ≤ 6. Écris une chaîne de majorations.
  [guided]  |x² + x − 6|
    = |x − 2|·|x + 3|   ← Factoriser
    ? Comment majorer |x − 2| ? ✔ Par 1, l'hypothèse / · Par 3
    = 1·|x + 3|   ← |x − 2| ≤ 1
    ? Comment majorer |x + 3| sur [1 ; 3] ? ✔ Par sa plus grande valeur sur l'intervalle, 6 / · Par sa plus petite valeur sur l'intervalle
    = 6   ← x ∈ [1 ; 3], donc |x + 3| ≤ 6
  aides : Fais apparaître |x − 2|, que tu sais majorer. | |x − 2|·|x + 3| | 1·|x + 3|
  pièges : g1_triangle_reverse

Montre que si |x + 1| ≤ 2, alors |x² − 2x − 3| ≤ 12. Écris une chaîne de majorations.
  [guided]  |x² − 2x − 3|
    = |x + 1|·|x − 3|   ← Factoriser
    ? Comment majorer |x + 1| ? ✔ Par 2, l'hypothèse / · Par 3
    = 2·|x − 3|   ← |x + 1| ≤ 2
    ? Comment majorer |x − 3| sur [−3 ; 1] ? ✔ Par sa plus grande valeur sur l'intervalle, 6 / · Par sa plus petite valeur sur l'intervalle
    = 12   ← x ∈ [−3 ; 1], donc |x − 3| ≤ 6
  aides : Fais apparaître |x + 1|, que tu sais majorer. | |x + 1|·|x − 3| | 2·|x − 3|
  pièges : g1_triangle_reverse

Montre que si |x + 1| ≤ 1/2, alors |x² + x| ≤ 1. Écris une chaîne de majorations.
  [guided]  |x² + x|
    = |x + 1|·|x|   ← Factoriser
    ? Comment majorer |x + 1| ? ✔ Par 1/2, l'hypothèse / · Par 3/2
    = (1/2)·|x|   ← |x + 1| ≤ 1/2
    ? Comment majorer |x| sur [−3/2 ; −1/2] ? ✔ Par sa plus grande valeur sur l'intervalle, 3/2 / · Par sa plus petite valeur sur l'intervalle
    = 3/4   ← x ∈ [−3/2 ; −1/2], donc |x| ≤ 3/2
  aides : Fais apparaître |x + 1|, que tu sais majorer. | |x + 1|·|x| | (1/2)·|x|
  pièges : g1_triangle_reverse

```

### Niveau 3

```
Montre que si x ∈ [1 ; 3], alors |(x² − 3)/(x + 2)| ≤ 2. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |(x² − 3)/(x + 2)|
    = |x² − 3|/(x + 2)   ← x + 2 > 0 sur l'intervalle
    = 6/(x + 2)   ← x² ∈ [1 ; 9], donc |x² − 3| ≤ 6
    = 2   ← x + 2 ≥ 3
  aides : Majore le numérateur et minore le dénominateur. | |x² − 3|/(x + 2) | 6/(x + 2)
  pièges : g1_bound_denominator

Montre que si x ∈ [2 ; 4], alors |(x² − 6)/(x + 2)| ≤ 5/2. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |(x² − 6)/(x + 2)|
    = |x² − 6|/(x + 2)   ← x + 2 > 0 sur l'intervalle
    = 10/(x + 2)   ← x² ∈ [4 ; 16], donc |x² − 6| ≤ 10
    = 5/2   ← x + 2 ≥ 4
  aides : Majore le numérateur et minore le dénominateur. | |x² − 6|/(x + 2) | 10/(x + 2)
  pièges : g1_bound_denominator

Montre que si |x − 3| ≤ 1/2, alors |x² − 2x − 3| ≤ 3. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |x² − 2x − 3|
    = |x − 3|·|x + 1|   ← Factoriser
    = (1/2)·|x + 1|   ← |x − 3| ≤ 1/2
    = 9/4   ← x ∈ [5/2 ; 7/2], donc |x + 1| ≤ 9/2
  aides : Fais apparaître |x − 3|, que tu sais majorer. | |x − 3|·|x + 1| | (1/2)·|x + 1|
  pièges : g1_triangle_reverse

```

### Niveau 4

```
Montre que si |x + 2| ≤ 1, alors |x² − 4| ≤ 5. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |x² − 4|
    = |x + 2|·|x − 2|   ← Factoriser
    = 1·|x − 2|   ← |x + 2| ≤ 1
    = 5   ← x ∈ [−3 ; −1], donc |x − 2| ≤ 5
  aides : Fais apparaître |x + 2|, que tu sais majorer. | |x + 2|·|x − 2| | 1·|x − 2|
  pièges : g1_triangle_reverse

Montre que si x ∈ [0 ; 2], alors |(x² − 5)/(x + 1)| ≤ 5. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |(x² − 5)/(x + 1)|
    = |x² − 5|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = 5/(x + 1)   ← x² ∈ [0 ; 4], donc |x² − 5| ≤ 5
    = 5   ← x + 1 ≥ 1
  aides : Majore le numérateur et minore le dénominateur. | |x² − 5|/(x + 1) | 5/(x + 1)
  pièges : g1_bound_denominator

Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 8)/(x + 1)| ≤ 17/14. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |(x² − 8)/(x + 1)|
    = |x² − 8|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = (17/4)/(x + 1)   ← x² ∈ [25/4 ; 49/4], donc |x² − 8| ≤ 17/4
    = 17/14   ← x + 1 ≥ 7/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 8|/(x + 1) | (17/4)/(x + 1)
  pièges : g1_bound_denominator

```

### Niveau 5

```
Trouve une constante C telle que |(x² − 6)/(x + 1)| ≤ C pour x ∈ [5/2 ; 7/2].
  [free, sans aide]  |(x² − 6)/(x + 1)|
    = |x² − 6|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = (25/4)/(x + 1)   ← x² ∈ [25/4 ; 49/4], donc |x² − 6| ≤ 25/4
    = 25/14   ← x + 1 ≥ 7/2
  pièges : g1_bound_denominator

Trouve une constante C telle que |x² − 6x + 8| ≤ C pour |x − 2| ≤ 1/2.
  [free, sans aide]  |x² − 6x + 8|
    = |x − 2|·|x − 4|   ← Factoriser
    = (1/2)·|x − 4|   ← |x − 2| ≤ 1/2
    = 5/4   ← x ∈ [3/2 ; 5/2], donc |x − 4| ≤ 5/2
  pièges : g1_triangle_reverse

Trouve une constante C telle que |x² − 2x − 8| ≤ C pour |x + 2| ≤ 1/2.
  [free, sans aide]  |x² − 2x − 8|
    = |x + 2|·|x − 4|   ← Factoriser
    = (1/2)·|x − 4|   ← |x + 2| ≤ 1/2
    = 13/4   ← x ∈ [−5/2 ; −3/2], donc |x − 4| ≤ 13/2
  pièges : g1_triangle_reverse

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si x ∈ [1 ; 2], alors 1/(x² + 3) ≤ 1/4. » → VRAI
  [examen tf]

Montre que si |x + 1| ≤ 1, alors |x² − 1| ≤ 3. Écris une chaîne de majorations.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  |x² − 1|
      = |x + 1|·|x − 1|   ← Factoriser
      = 1·|x − 1|   ← |x + 1| ≤ 1
      = 3   ← x ∈ [−2 ; 0], donc |x − 1| ≤ 3
  pièges : g1_triangle_reverse

```

## Pièges de cette unité

- **Multiplier par un dénominateur de signe inconnu** (`g1_mult_denominator`, E) : (x + 1)/(x − 2) ≥ 2 → x + 1 ≥ 2(x − 2) au lieu de (x + 1)/(x − 2) − 2 ≥ 0
- **Valeur interdite gardée dans l'ensemble** (`g1_pole_closed`, E) : (5 − x)/(x − 2) ≥ 0 : [2 ; 5] au lieu de ]2 ; 5]
- **Diviser par une expression en m sans discuter** (`g1_param_case`, E) : (m − 1)x ≤ (m − 1)(m + 1) → x ≤ m + 1 pour tout m au lieu de cas m > 1, m < 1, m = 1
- **Inégalité non retournée après une division par un négatif** (`g1_ineq_not_flipped`, E) : −2x ≥ 6 → x ≥ −3 au lieu de x ≤ −3
- **f(k) < 0 au lieu de a·f(k) < 0** (`g1_viete_a`, E) : (m − 2)(m − 5) < 0 → m − 5 < 0 au lieu de m ∈ ]2 ; 5[
- **Une condition de la position des racines oubliée** (`g1_viete_delta`, E) : a·f(2) < 0 et a·f(6) > 0 → seulement a·f(2) < 0 au lieu de les deux conditions
- **Valeur absolue enlevée sans changer le signe** (`g1_abs_dropped`, E) : |2x − 3| = x + 1 → 2x − 3 = x + 1 seul au lieu de deux cas
- **|A| = B → A = ±B, sans B ≥ 0** (`g1_abs_one_case`, E) : |x + 3| = 2x → x = 3 ou x = −1 au lieu de x = 3
- **Solutions d'un cas gardées hors du cas** (`g1_abs_case_bounds`, E) : x² + |x − 5| ≤ 7 : [−4 ; 3] au lieu de [−1 ; 2]
- **« et » et « ou » échangés avec une valeur absolue** (`g1_abs_and_or`, E) : |x − 1| > 2 → −2 < x − 1 < 2 au lieu de x − 1 < −2 ou x − 1 > 2
- **Solutions du carré gardées sans la condition B ≥ 0** (`g1_irr_extraneous`, E) : √(x + 7) = x + 1 : {−3 ; 2} au lieu de {2}
- **Inéquation élevée au carré sans regarder les signes** (`g1_square_no_cond`, E) : √(x + 12) ≤ x : [−12 ; −3] ∪ [4 ; +∞[ au lieu de [4 ; +∞[
- **Inégalité triangulaire à l'envers** (`g1_triangle_reverse`, E) : |x + 2| ≤ |x| − 2 au lieu de |x + 2| ≤ |x| + 2
- **Dénominateur remplacé par son maximum** (`g1_bound_denominator`, E) : 1/(x² + 1) ≤ 1/10 sur [1 ; 3] au lieu de ≤ 1/2
- **Une condition du domaine oubliée** (`g1_domain_partial`, E) : √(x + 3)/(x² − 4) : x ≠ ±2 au lieu de x ≥ −3 et x ≠ ±2
- **f ∘ g calculée dans le mauvais ordre** (`g1_compose_order`, E) : g ∘ f = √(1 − x²) au lieu de g ∘ f = 1 − x
- **Domaine de l'expression simplifiée** (`g1_compose_domain`, E) : D_{g∘f} = ℝ au lieu de D_{g∘f} = [0 ; +∞[
- **f⁻¹ lu comme 1/f** (`g1_inverse_reciprocal`, E) : f⁻¹(x) = 1/(x² − 2x) au lieu de f⁻¹(x) = 1 + √(1 + x)
- **Mauvaise racine gardée pour f⁻¹ (corrigé MAN 2018, Math 1B, Q2)** (`g1_inverse_branch`, C) : x = 1 − √(1 + y) au lieu de x = 1 + √(1 + y)
- **a² = b² donne a = b sans condition** (`g1_inj_square`, E) : a² = b² ⇒ a = b sur [−1 ; 2] au lieu de a = −1, b = 1 : a² = b², a ≠ b
- **Une solution existe, mais pas dans l'ensemble de départ (corrigé MAN 2018, Math 1B, Q2)** (`g1_surj_domain`, C) : « Δ ≥ 0, donc f est surjective » au lieu de Δ ≥ 0, et la solution est dans A
- **Parité conclue sur une seule valeur** (`g1_parity_point`, E) : f(−1) = f(1), donc f paire au lieu de f(−x) = f(x) pour tout x
- **Période d'une somme : max, min ou produit** (`g1_period_sum`, E) : période de sin 2x + cos 3x : π ou 2π/3 au lieu de 2π
- **Un carré change de signe en sa racine** (`g1_sign_even_root`, E) : (x + 2)² : − 0 + au lieu de (x + 2)² : + 0 +
- **Signe du trinôme inversé** (`g1_trinome_sign_swap`, E) : −2x² + x + 3 ≥ 0 : ]−∞ ; −1] ∪ [3/2 ; +∞[ au lieu de [−1 ; 3/2]
