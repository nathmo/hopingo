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
  [free, sans aide, examen open]  x² − 4x + 4 = y
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
Tableau de signes de f(x) = (x − 3)x². Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | 0 |  | 3 | 
    x − 3    −  −  −  0  +
    x²       +  0  +  +  +
    f(x)     (−)  (0)  (−)  (0)  (+)
  puis : Lis le tableau : résous (x − 3)x² > 0.
      [free, sans aide]  (x − 3)x² > 0
        = ]3 ; +∞[   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
  pièges : g1_sign_even_root

Tableau de signes de f(x) = ((x − 2)(x + 3))/(x − 3). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −3 |  | 2 |  | 3 | 
    x − 2    −  −  −  0  +  +  +
    x − 3 (dén.) −  −  −  −  −  0  +
    x + 3    −  0  +  +  +  +  +
    f(x)     (−)  (0)  (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous ((x − 2)(x + 3))/(x − 3) ≥ 0.
      [free, sans aide]  ((x − 2)(x + 3))/(x − 3) ≥ 0
        = [−3 ; 2] ∪ ]3 ; +∞[   ← Lire le tableau
      pièges : g9_bracket

Tableau de signes de f(x) = (−3 − x)/(3 − x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −3 |  | 3 | 
    −3 − x   +  0  −  −  −
    3 − x (dén.) +  +  +  0  −
    f(x)     (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous (−3 − x)/(3 − x) ≤ 0.
      [free, sans aide]  (−3 − x)/(3 − x) ≤ 0
        = [−3 ; 3[   ← Lire le tableau
      pièges : g9_bracket

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

Tableau de signes de f(x) = (−4 − x)/(−2 − x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | −4 |  | −2 | 
    −2 − x (dén.) (+)  (+)  (+)  (0)  (−)
    −4 − x   (+)  (0)  (−)  (−)  (−)
    f(x)     (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous (−4 − x)/(−2 − x) < 0.
      [free, sans aide]  (−4 − x)/(−2 − x) < 0
        = ]−4 ; −2[   ← Lire le tableau
      pièges : g9_bracket

Tableau de signes de f(x) = x/(x − 1). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | 0 |  | 1 | 
    x        (−)  (0)  (+)  (+)  (+)
    x − 1 (dén.) (−)  (−)  (−)  (0)  (+)
    f(x)     (+)  (0)  (−)  (‖)  (+)
  puis : Lis le tableau : résous x/(x − 1) ≥ 0.
      [free, sans aide]  x/(x − 1) ≥ 0
        = ]−∞ ; 0] ∪ ]1 ; +∞[   ← Lire le tableau
      pièges : g9_bracket

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

Tableau de signes de f(x) = ((x − 2)(4 − x))/(x + 3). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (2)  ·  (4)  ·
    x − 2    (−)  (−)  (−)  (0)  (+)  (+)  (+)
    x + 3 (dén.) (−)  (0)  (+)  (+)  (+)  (+)  (+)
    4 − x    (+)  (+)  (+)  (+)  (+)  (0)  (−)
    f(x)     (+)  (‖)  (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((x − 2)(4 − x))/(x + 3) ≥ 0.
      [free, sans aide, suivre l'erreur]  ((x − 2)(4 − x))/(x + 3) ≥ 0
        = ]−∞ ; −3[ ∪ [2 ; 4]   ← Lire le tableau
      pièges : g9_bracket

Tableau de signes de f(x) = ((2 − x)(x + 3))/(x − 4)². Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (2)  ·  (4)  ·
    (x − 4)² (dén.) (+)  (+)  (+)  (+)  (+)  (0)  (+)
    2 − x    (+)  (+)  (+)  (0)  (−)  (−)  (−)
    x + 3    (−)  (0)  (+)  (+)  (+)  (+)  (+)
    f(x)     (−)  (0)  (+)  (0)  (−)  (‖)  (−)
  puis : Lis le tableau : résous ((2 − x)(x + 3))/((x − 4)²) ≥ 0.
      [free, sans aide, suivre l'erreur]  ((2 − x)(x + 3))/((x − 4)²) ≥ 0
        = [−3 ; 2]   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
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

Tableau de signes de f(x) = ((x − 4)x(x − 3))/(−3 − x). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · |  | · | 
    x        ·  (-3)  ·  (0)  ·  (3)  ·  (4)  ·
    −3 − x (dén.) (+)  (0)  (−)  (−)  (−)  (−)  (−)  (−)  (−)
    x − 4    (−)  (−)  (−)  (−)  (−)  (−)  (−)  (0)  (+)
    x        (−)  (−)  (−)  (0)  (+)  (+)  (+)  (+)  (+)
    x − 3    (−)  (−)  (−)  (−)  (−)  (0)  (+)  (+)  (+)
    f(x)     (−)  (‖)  (+)  (0)  (−)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((x − 4)x(x − 3))/(−3 − x) ≤ 0.
      [free, sans aide, suivre l'erreur]  ((x − 4)x(x − 3))/(−3 − x) ≤ 0
        = ]−∞ ; −3[ ∪ [0 ; 3] ∪ [4 ; +∞[   ← Lire le tableau
      pièges : g9_bracket

Tableau de signes de f(x) = ((x + 2)²(3 − x))/(x + 3). Place d'abord les zéros et les valeurs interdites dans l'ordre (ligne x). Touche une case pour choisir + , − , 0 ou ‖.
  [tableau signs]  colonnes :  | · |  | · |  | · | 
    x        ·  (-3)  ·  (-2)  ·  (3)  ·
    (x + 2)² (+)  (+)  (+)  (0)  (+)  (+)  (+)
    x + 3 (dén.) (−)  (0)  (+)  (+)  (+)  (+)  (+)
    3 − x    (+)  (+)  (+)  (+)  (+)  (0)  (−)
    f(x)     (−)  (‖)  (+)  (0)  (+)  (0)  (−)
  puis : Lis le tableau : résous ((x + 2)²(3 − x))/(x + 3) ≤ 0.
      [free, sans aide, suivre l'erreur]  ((x + 2)²(3 − x))/(x + 3) ≤ 0
        = ]−∞ ; −3[ ∪ {−2} ∪ [3 ; +∞[   ← Lire le tableau
      pièges : g9_bracket, g1_trinome_sign_swap
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
Ensemble des solutions de (x(x − 3)²)/(x − 2) ≤ 0 :
  · ]0 ; 2[ [g9_bracket]   ✔ [0 ; 2[ ∪ {3}   · ]−∞ ; 0] ∪ ]2 ; 3] [g1_sign_even_root]   · [0 ; 2] ∪ {3}
  [examen mcq]
  pièges : g1_sign_even_root, g9_bracket

```

## Pièges de cette unité

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
