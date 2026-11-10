# Exemples de questions — Analyse vectorielle

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Gradient, divergence, rotationnel, laplacien (`v-ops`, BA3)

_rot F composante par composante, div F, Δf : seulement des dérivées partielles bien rangées._

### Niveau 1

```
Soit F(x, y, z) = (3x²z + y²z ; −3x²z ; z²). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (z²) − ∂/∂z (−3x²z)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = □ − (□)   (trous : 0 − (−3x²))   ← ∂F₃/∂y − ∂F₂/∂z
    = 3x²   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (3x²z + y²z) − ∂/∂x (z²)
    = □ − □   (trous : 3x² + y² − 0)   ← ∂F₁/∂z − ∂F₃/∂x
    = 3x² + y²   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−3x²z) − ∂/∂y (3x²z + y²z)
    = −6xz − 2yz   ← Les deux dérivées partielles, puis la différence
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(z²) − ∂z(−3x²z) ; …) | rot F = (3x² ; 3x² + y² ; −6xz − 2yz)
  pièges : v_rot_sign

Soit F(x, y, z) = (2x²z ; −2x²z − 2xz² ; 3xz² + y). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (3xz² + y) − ∂/∂z (−2x²z − 2xz²)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = 2x² + 4xz + 1   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2x²z) − ∂/∂x (3xz² + y)
    = 2x² − 3z²   ← Les deux dérivées partielles, puis la différence
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−2x²z − 2xz²) − ∂/∂y (2x²z)
    = □ − □   (trous : −4xz − 2z² − 0)   ← ∂F₂/∂x − ∂F₁/∂y
    = −4xz − 2z²   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(3xz² + y) − ∂z(−2x²z − 2xz²) ; …) | rot F = (2x² + 4xz + 1 ; 2x² − 3z² ; −4xz − 2z²)
  pièges : v_rot_sign

Soit F(x, y, z) = (2x ; x³ − 3xyz ; 2xyz). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (2xyz) − ∂/∂z (x³ − 3xyz)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = 3xy + 2xz   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2x) − ∂/∂x (2xyz)
    = □ − □   (trous : 0 − 2yz)   ← ∂F₁/∂z − ∂F₃/∂x
    = −2yz   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (x³ − 3xyz) − ∂/∂y (2x)
    = □ − □   (trous : 3x² − 3yz − 0)   ← ∂F₂/∂x − ∂F₁/∂y
    = 3x² − 3yz   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(2xyz) − ∂z(x³ − 3xyz) ; …) | rot F = (3xy + 2xz ; −2yz ; 3x² − 3yz)
  pièges : v_rot_sign

```

### Niveau 2

```
Soit F(x, y, z) = (−2yz ; −2z² + y ; 3yz²). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (3yz²) − ∂/∂z (−2z² + y)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = □ + 4z   (trous : 3z² + 4z)   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−2yz) − ∂/∂x (3yz²)
    = □ − □   (trous : −2y − 0)   ← ∂F₁/∂z − ∂F₃/∂x
    = □   (trous : −2y)   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−2z² + y) − ∂/∂y (−2yz)
    = □ − (□)   (trous : 0 − (−2z))   ← ∂F₂/∂x − ∂F₁/∂y
    = □   (trous : 2z)   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(3yz²) − ∂z(−2z² + y) ; …) | rot F = (3z² + 4z ; −2y ; 2z)
  pièges : v_rot_sign

Soit F(x, y, z) = (−2xy² + 2z² ; yz ; −2xyz − 2xz²). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (−2xyz − 2xz²) − ∂/∂z (yz)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = □ − □   (trous : −2xz − y)   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−2xy² + 2z²) − ∂/∂x (−2xyz − 2xz²)
    = 2yz + 2z² + □   (trous : 2yz + 2z² + 4z)   ← Les deux dérivées partielles, puis la différence
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (yz) − ∂/∂y (−2xy² + 2z²)
    = □ − (□)   (trous : 0 − (−4xy))   ← ∂F₂/∂x − ∂F₁/∂y
    = □   (trous : 4xy)   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(−2xyz − 2xz²) − ∂z(yz) ; …) | rot F = (−2xz − y ; 2yz + 2z² + 4z ; 4xy)
  pièges : v_rot_sign

Soit F(x, y, z) = (−3x²y + 3y³ ; 2y ; −x²y + 2xyz). Calcule rot F, composante par composante.
  [guided]  ∂/∂y (−x²y + 2xyz) − ∂/∂z (2y)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y) : une ligne par composante.)
    = □ − □   (trous : −x² + 2xz − 0)   ← ∂F₃/∂y − ∂F₂/∂z
    = □   (trous : −x² + 2xz)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−3x²y + 3y³) − ∂/∂x (−x²y + 2xyz)
    = □ − (□)   (trous : 0 − (−2xy + 2yz))   ← ∂F₁/∂z − ∂F₃/∂x
    = □   (trous : 2xy − 2yz)   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (2y) − ∂/∂y (−3x²y + 3y³)
    = □ − (□)   (trous : 0 − (−3x² + 9y²))   ← ∂F₂/∂x − ∂F₁/∂y
    = □   (trous : 3x² − 9y²)   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(−x²y + 2xyz) − ∂z(2y) ; …) | rot F = (−x² + 2xz ; 2xy − 2yz ; 3x² − 9y²)
  pièges : v_rot_sign

```

### Niveau 3

```
Soit f(x, y, z) = 2xyz − 2xz² − 2x². Calcule Δf, puis Δf(0 ; 0 ; 0).
  [tap, suivre l'erreur, menu menu]  ∂/∂x (∂/∂x (2xyz − 2xz² − 2x²)) + ∂/∂y (∂/∂y (2xyz − 2xz² − 2x²)) + ∂/∂z (∂/∂z (2xyz − 2xz² − 2x²))
    ? Quel opérateur faut-il calculer ? · Le rotationnel rot F = ∇ ∧ F (un vecteur) / · La divergence div F = ∇ · F (un nombre) / · Le gradient ∇f (un vecteur) / ✔ Le laplacien Δf = div ∇f
    = −4 + 0 + (−4x)   ← ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²
    = −4x − 4   ← On regroupe
  — Au point (0 ; 0 ; 0) :  [juge equiv]  départ : −4(0) − 4
    = −4   ← On remplace x, y, z par les coordonnées
  aides : Δf = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² : seulement les dérivées secondes « pures ». | Δf = −4 + 0 + (−4x) | Δf = −4x − 4
  pièges : v_lap_mixed

Soit F(x, y, z) = (2x² − 2z ; x³ ; −2x²y − 3y³). Le champ F est-il irrotationnel ? Calcule ce qu'il faut, composante par composante.
  [tap, suivre l'erreur, menu menu]  ∂/∂y (−2x²y − 3y³) − ∂/∂z (x³)
    ? Quel opérateur faut-il calculer ? ✔ Le rotationnel rot F = ∇ ∧ F (un vecteur) / · La divergence div F = ∇ · F (un nombre) / · Le gradient ∇f (un vecteur) / · Le laplacien Δf = div ∇f
    = −2x² − 9y² − 0   ← ∂F₃/∂y − ∂F₂/∂z
    = −2x² − 9y²   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2x² − 2z) − ∂/∂x (−2x²y − 3y³)
    = 4xy − 2   ← Les deux dérivées partielles, puis la différence
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (x³) − ∂/∂y (2x² − 2z)
    = 3x² − 0   ← ∂F₂/∂x − ∂F₁/∂y
    = 3x²   ← On simplifie
  aides : rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées partielles. | rot F = (∂y(−2x²y − 3y³) − ∂z(x³) ; …) | rot F = (−2x² − 9y² ; 4xy − 2 ; 3x²)
  pièges : v_rot_sign

Soit f(x, y, z) = xy² − 3xyz − 3y³. Calcule Δf, puis Δf(−2 ; 2 ; 1).
  [tap, suivre l'erreur, menu menu]  ∂/∂x (∂/∂x (xy² − 3xyz − 3y³)) + ∂/∂y (∂/∂y (xy² − 3xyz − 3y³)) + ∂/∂z (∂/∂z (xy² − 3xyz − 3y³))
    ? Quel opérateur faut-il calculer ? · Le rotationnel rot F = ∇ ∧ F (un vecteur) / · La divergence div F = ∇ · F (un nombre) / · Le gradient ∇f (un vecteur) / ✔ Le laplacien Δf = div ∇f
    = 0 + (2x − 18y) + 0   ← ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²
    = 2x − 18y   ← On regroupe
  — Au point (−2 ; 2 ; 1) :  [juge equiv]  départ : 2(−2) − 18(2)
    = −40   ← On remplace x, y, z par les coordonnées
  aides : Δf = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² : seulement les dérivées secondes « pures ». | Δf = 0 + (2x − 18y) + 0 | Δf = 2x − 18y
  pièges : v_lap_mixed

```

### Niveau 4

```
Soit F(x, y, z) = (2xy² − y² ; −3z³ + 2xz ; −z² + 2sin(xy)). Calcule div F, puis sa valeur en P = (1 ; 1 ; −2).
  [free, suivre l'erreur]  ∂/∂x (2xy² − y²) + ∂/∂y (−3z³ + 2xz) + ∂/∂z (−z² + 2sin(xy))
    = 2y² + 0 + (−2z)   ← ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
    = 2y² − 2z   ← On regroupe
  — Au point P = (1 ; 1 ; −2) :  [juge equiv]  départ : 2(1)² − 2(−2)
    = 6   ← On remplace x, y, z par les coordonnées
  aides : div F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z : un nombre en chaque point. | div F = 2y² + 0 + (−2z) | div F = 2y² − 2z

Soit F(x, y, z) = (x³ + 2y³ ; 2z² − e^(yz) ; −2x³). Calcule div F.
  [free, suivre l'erreur]  ∂/∂x (x³ + 2y³) + ∂/∂y (2z² − e^(yz)) + ∂/∂z (−2x³)
    = 3x² + (−ze^(yz)) + 0   ← ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
    = 3x² − ze^(yz)   ← On regroupe
  aides : div F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z : un nombre en chaque point. | div F = 3x² + (−ze^(yz)) + 0 | div F = 3x² − ze^(yz)

Soit f(x, y, z) = xy − 2z². Calcule Δf.
  [free, suivre l'erreur]  ∂/∂x (∂/∂x (xy − 2z²)) + ∂/∂y (∂/∂y (xy − 2z²)) + ∂/∂z (∂/∂z (xy − 2z²))
    = 0 + 0 + (−4)   ← ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²
    = −4   ← On regroupe
  aides : Δf = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² : seulement les dérivées secondes « pures ». | Δf = 0 + 0 + (−4) | Δf = −4
  pièges : v_lap_mixed

```

### Niveau 5

```
Soit F(x, y, z) = (x²z ; −x³ ; 3x³ + 3x² + 2sin(yz)). Calcule rot F et div F, puis vérifie que div(rot F) = 0 sur ce champ.
  [free, sans aide]  ∂/∂y (3x³ + 3x² + 2sin(yz)) − ∂/∂z (−x³)
    = 2zcos(yz) − 0   ← ∂F₃/∂y − ∂F₂/∂z
    = 2zcos(yz)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (x²z) − ∂/∂x (3x³ + 3x² + 2sin(yz))
    = x² − (9x² + 6x)   ← ∂F₁/∂z − ∂F₃/∂x
    = −8x² − 6x   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−x³) − ∂/∂y (x²z)
    = −3x² − 0   ← ∂F₂/∂x − ∂F₁/∂y
    = −3x²   ← On simplifie
  — La divergence :  [juge equiv]  départ : ∂/∂x (x²z) + ∂/∂y (−x³) + ∂/∂z (3x³ + 3x² + 2sin(yz))
    = 2xz + 0 + 2ycos(yz)   ← ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
    = 2xz + 2ycos(yz)   ← On regroupe
  — Vérifie que div(rot F) = 0 sur ce champ :  [juge equiv]  départ : ∂/∂x (2zcos(yz)) + ∂/∂y (−8x² − 6x) + ∂/∂z (−3x²)
    = 0 + 0 + 0   ← On dérive chaque composante de rot F
    = 0   ← Tout se simplifie : div(rot F) = 0
  pièges : v_rot_sign

Soit F(x, y, z) = (xyz ; −3y + 2z + 2sin(xz) ; 3y³ − xy). Calcule rot F et div F, puis vérifie que div(rot F) = 0 sur ce champ.
  [free, sans aide]  ∂/∂y (3y³ − xy) − ∂/∂z (−3y + 2z + 2sin(xz))
    = 9y² − x − 2 − 2xcos(xz)   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (xyz) − ∂/∂x (3y³ − xy)
    = xy + y   ← Les deux dérivées partielles, puis la différence
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−3y + 2z + 2sin(xz)) − ∂/∂y (xyz)
    = −xz + 2zcos(xz)   ← Les deux dérivées partielles, puis la différence
  — La divergence :  [juge equiv]  départ : ∂/∂x (xyz) + ∂/∂y (−3y + 2z + 2sin(xz)) + ∂/∂z (3y³ − xy)
    = yz + (−3) + 0   ← ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
    = yz − 3   ← On regroupe
  — Vérifie que div(rot F) = 0 sur ce champ :  [juge equiv]  départ : ∂/∂x (9y² − x − 2 − 2xcos(xz)) + ∂/∂y (xy + y) + ∂/∂z (−xz + 2zcos(xz))
    = −1 + 2xzsin(xz) − 2cos(xz) + (x + 1) + (−x − 2xzsin(xz) + 2cos(xz))   ← On dérive chaque composante de rot F
    = 0   ← Tout se simplifie : div(rot F) = 0
  pièges : v_rot_sign

Soit F(x, y, z) = (3z³ ; −3y²z + 2x² + 2e^(xy) ; xy). Calcule rot F et div F, puis vérifie que div(rot F) = 0 sur ce champ.
  [free, sans aide]  ∂/∂y (xy) − ∂/∂z (−3y²z + 2x² + 2e^(xy))
    = 3y² + x   ← Les deux dérivées partielles, puis la différence
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (3z³) − ∂/∂x (xy)
    = 9z² − y   ← Les deux dérivées partielles, puis la différence
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−3y²z + 2x² + 2e^(xy)) − ∂/∂y (3z³)
    = 4x + 2ye^(xy) − 0   ← ∂F₂/∂x − ∂F₁/∂y
    = 4x + 2ye^(xy)   ← On simplifie
  — La divergence :  [juge equiv]  départ : ∂/∂x (3z³) + ∂/∂y (−3y²z + 2x² + 2e^(xy)) + ∂/∂z (xy)
    = 0 + (−6yz + 2xe^(xy)) + 0   ← ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
    = −6yz + 2xe^(xy)   ← On regroupe
  — Vérifie que div(rot F) = 0 sur ce champ :  [juge equiv]  départ : ∂/∂x (3y² + x) + ∂/∂y (9z² − y) + ∂/∂z (4x + 2ye^(xy))
    = 1 + (−1) + 0   ← On dérive chaque composante de rot F
    = 0   ← Tout se simplifie : div(rot F) = 0
  pièges : v_rot_sign

```

### Variantes d'examen

```
Soit F(x, y, z) = (z² ; −xyz − yz² ; −xyz). Alors rot F =
  · (xy − xz + 2yz ; yz + 2z ; yz) [v_rot_sign]   · (−xy + xz − 2yz ; yz + 2z ; −yz) [v_rot_sign]   ✔ (xy − xz + 2yz ; yz + 2z ; −yz)   · (−xy + xz − 2yz ; −yz − 2z ; yz) [v_rot_sign]
  [examen mcq]
  pièges : v_rot_sign

```

## Identités des opérateurs (`v-identities`, BA3)

_rot ∇f = 0, div rot F = 0, et les règles du produit : div(fF) = f div F + F · ∇f._

### Niveau 1

```
Soit f(x, y, z) = −xy − xz et F(x, y, z) = (2x − 2z ; z ; −2x + 2z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((−xy − xz)(2x − 2z)) + ∂/∂y ((−xy − xz)(z)) + ∂/∂z ((−xy − xz)(−2x + 2z))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (−2x²y − 2x²z + 2xyz + 2xz²) + ∂/∂y (−xyz − xz²) + ∂/∂z (2x²y + 2x²z − 2xyz − 2xz²))   ← fF = <math alttext="(−2x²y − 2x²z + 2xyz + 2xz² ; −xyz − xz² ; 2x²y + 2x²z − 2xyz − 2xz²)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = □ + (□) + (□)   (trous : −4xy − 4xz + 2yz + 2z² + (−xz) + (2x² − 2xy − 4xz))   ← On dérive chaque composante
    = 2x² − 6xy − 9xz + 2yz + 2z²   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−xy − xz)(∂/∂x (2x − 2z) + ∂/∂y z + ∂/∂z (−2x + 2z)) + (2x − 2z)∂/∂x (−xy − xz) + (z)∂/∂y (−xy − xz) + (−2x + 2z)∂/∂z (−xy − xz)
    = (−xy − xz)(□) + (2x − 2z)(□) + (z)(□) + (−2x + 2z)(□)   (trous : (−xy − xz)(4) + (2x − 2z)(−y − z) + (z)(−x) + (−2x + 2z)(−x))   ← div F = <math alttext="4"><mn>4</mn></math> et ∇f = <math alttext="(−y − z ; −x ; −x)"><mrow><mo>(</mo><mrow><mrow><mo>−</mo><mi>y</mi></mrow><mo>−</mo><mi>z</mi></mrow><mo>;</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>;</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></math>
    = 2x² − 6xy − 9xz + 2yz + 2z²   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (2x² − 6xy − 9xz + 2yz + 2z²) − ((−xy − xz)(4) + (2x − 2z)(−y − z) + (z)(−x) + (−2x + 2z)(−x))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−y − z ; −x ; −x) et div F = 4 | f div F + F · ∇f = (−xy − xz)(4) + (2x − 2z)(−y − z) + (z)(−x) + (−2x + 2z)(−x)
  pièges : g6_product_naive

Soit f(x, y, z) = −2x² et F(x, y, z) = (−y ; y − z ; −2z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((−2x²)(−y)) + ∂/∂y ((−2x²)(y − z)) + ∂/∂z ((−2x²)(−2z))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (2x²y) + ∂/∂y (−2x²y + 2x²z) + ∂/∂z (4x²z))   ← fF = <math alttext="(2x²y ; −2x²y + 2x²z ; 4x²z)"><mrow><mo>(</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>)</mo></mrow></math>
    = □ + (□) + □   (trous : 4xy + (−2x²) + 4x²)   ← On dérive chaque composante
    = 2x² + 4xy   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−2x²)(∂/∂x (−y) + ∂/∂y (y − z) + ∂/∂z (−2z)) + (−y)∂/∂x (−2x²) + (y − z)∂/∂y (−2x²) + (−2z)∂/∂z (−2x²)
    = (−2x²)(□) + (−y)(□) + (y − z)(0) + (−2z)(0)   (trous : (−2x²)(−1) + (−y)(−4x) + (y − z)(0) + (−2z)(0))   ← div F = <math alttext="−1"><mrow><mo>−</mo><mn>1</mn></mrow></math> et ∇f = <math alttext="(−4x ; 0 ; 0)"><mrow><mo>(</mo><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = 2x² + 4xy   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (2x² + 4xy) − ((−2x²)(−1) + (−y)(−4x) + (y − z)(0) + (−2z)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−4x ; 0 ; 0) et div F = −1 | f div F + F · ∇f = (−2x²)(−1) + (−y)(−4x) + (y − z)(0) + (−2z)(0)

Soit f(x, y, z) = 3x² + 3yz et F(x, y, z) = (3x + z ; −2x ; −x − y). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((3x² + 3yz)(3x + z)) + ∂/∂y ((3x² + 3yz)(−2x)) + ∂/∂z ((3x² + 3yz)(−x − y))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (9x³ + 3x²z + 9xyz + 3yz²) + ∂/∂y (−6x³ − 6xyz) + ∂/∂z (−3x³ − 3x²y − 3xyz − 3y²z))   ← fF = <math alttext="(9x³ + 3x²z + 9xyz + 3yz² ; −6x³ − 6xyz ; −3x³ − 3x²y − 3xyz − 3y²z)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mo>−</mo><mn>6</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>−</mo><mrow><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>−</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>−</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = □ + (□) + (□)   (trous : 27x² + 6xz + 9yz + (−6xz) + (−3xy − 3y²))   ← On dérive chaque composante
    = 27x² − 3xy − 3y² + 9yz   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (3x² + 3yz)(∂/∂x (3x + z) + ∂/∂y (−2x) + ∂/∂z (−x − y)) + (3x + z)∂/∂x (3x² + 3yz) + (−2x)∂/∂y (3x² + 3yz) + (−x − y)∂/∂z (3x² + 3yz)
    = (□x² + 3yz)(3) + (3x + z)(□) + (−2x)(□) + (−x − y)(□)   (trous : (3x² + 3yz)(3) + (3x + z)(6x) + (−2x)(3z) + (−x − y)(3y))   ← div F = <math alttext="3"><mn>3</mn></math> et ∇f = <math alttext="(6x ; 3z ; 3y)"><mrow><mo>(</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>;</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>z</mi></mrow><mo>;</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>)</mo></mrow></math>
    = 27x² − 3xy − 3y² + 9yz   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (27x² − 3xy − 3y² + 9yz) − ((3x² + 3yz)(3) + (3x + z)(6x) + (−2x)(3z) + (−x − y)(3y))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (6x ; 3z ; 3y) et div F = 3 | f div F + F · ∇f = (3x² + 3yz)(3) + (3x + z)(6x) + (−2x)(3z) + (−x − y)(3y)
  pièges : g6_product_naive

```

### Niveau 2

```
Soit f(x, y, z) = 2x² + 3x et F(x, y, z) = (z ; −2y ; 3z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((2x² + 3x)(z)) + ∂/∂y ((2x² + 3x)(−2y)) + ∂/∂z ((2x² + 3x)(3z))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (2x²z + 3xz) + ∂/∂y (−4x²y − 6xy) + ∂/∂z (6x²z + 9xz))   ← fF = <math alttext="(2x²z + 3xz ; −4x²y − 6xy ; 6x²z + 9xz)"><mrow><mo>(</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = □ + (□) + (□)   (trous : 4xz + 3z + (−4x² − 6x) + (6x² + 9x))   ← On dérive chaque composante
    = □   (trous : 2x² + 4xz + 3x + 3z)   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (2x² + 3x)(∂/∂x z + ∂/∂y (−2y) + ∂/∂z (3z)) + (z)∂/∂x (2x² + 3x) + (−2y)∂/∂y (2x² + 3x) + (3z)∂/∂z (2x² + 3x)
    = (2x² + 3x)(□) + (z)(□) + (−2y)(0) + (3z)(0)   (trous : (2x² + 3x)(1) + (z)(4x + 3) + (−2y)(0) + (3z)(0))   ← div F = <math alttext="1"><mn>1</mn></math> et ∇f = <math alttext="(4x + 3 ; 0 ; 0)"><mrow><mo>(</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>3</mn></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = □   (trous : 2x² + 4xz + 3x + 3z)   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (2x² + 4xz + 3x + 3z) − ((2x² + 3x)(1) + (z)(4x + 3) + (−2y)(0) + (3z)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (4x + 3 ; 0 ; 0) et div F = 1 | f div F + F · ∇f = (2x² + 3x)(1) + (z)(4x + 3) + (−2y)(0) + (3z)(0)

Soit f(x, y, z) = −2xy + 3xz et F(x, y, z) = (3x ; y − 2z ; −2x). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((−2xy + 3xz)(3x)) + ∂/∂y ((−2xy + 3xz)(y − 2z)) + ∂/∂z ((−2xy + 3xz)(−2x))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (−6x²y + 9x²z) + ∂/∂y (−2xy² + 7xyz − 6xz²) + ∂/∂z (4x²y − 6x²z))   ← fF = <math alttext="(−6x²y + 9x²z ; −2xy² + 7xyz − 6xz² ; 4x²y − 6x²z)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mo>−</mo><mn>6</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mrow><mrow><mn>7</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = □ + (□) + (□)   (trous : −12xy + 18xz + (−4xy + 7xz) + (−6x²))   ← On dérive chaque composante
    = □   (trous : −6x² − 16xy + 25xz)   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−2xy + 3xz)(∂/∂x (3x) + ∂/∂y (y − 2z) + ∂/∂z (−2x)) + (3x)∂/∂x (−2xy + 3xz) + (y − 2z)∂/∂y (−2xy + 3xz) + (−2x)∂/∂z (−2xy + 3xz)
    = (−2xy + 3xz)(□) + (3x)(□) + (y − 2z)(□) + (−2x)(□)   (trous : (−2xy + 3xz)(4) + (3x)(−2y + 3z) + (y − 2z)(−2x) + (−2x)(3x))   ← div F = <math alttext="4"><mn>4</mn></math> et ∇f = <math alttext="(−2y + 3z ; −2x ; 3x)"><mrow><mo>(</mo><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>;</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>)</mo></mrow></math>
    = □   (trous : −6x² − 16xy + 25xz)   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (−6x² − 16xy + 25xz) − ((−2xy + 3xz)(4) + (3x)(−2y + 3z) + (y − 2z)(−2x) + (−2x)(3x))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−2y + 3z ; −2x ; 3x) et div F = 4 | f div F + F · ∇f = (−2xy + 3xz)(4) + (3x)(−2y + 3z) + (y − 2z)(−2x) + (−2x)(3x)
  pièges : g6_product_naive

Soit f(x, y, z) = −xz + 2z et F(x, y, z) = (−2x + z ; −2y + 3z ; x). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [guided]  ∂/∂x ((−xz + 2z)(−2x + z)) + ∂/∂y ((−xz + 2z)(−2y + 3z)) + ∂/∂z ((−xz + 2z)(x))
    = ∂/∂x (□) + ∂/∂y (□) + ∂/∂z (□)   (trous : ∂/∂x (2x²z − xz² − 4xz + 2z²) + ∂/∂y (2xyz − 3xz² − 4yz + 6z²) + ∂/∂z (−x²z + 2xz))   ← fF = <math alttext="(2x²z − xz² − 4xz + 2z² ; 2xyz − 3xz² − 4yz + 6z² ; −x²z + 2xz)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = □ + (□) + (□)   (trous : 4xz − z² − 4z + (2xz − 4z) + (−x² + 2x))   ← On dérive chaque composante
    = □   (trous : −x² + 6xz − z² + 2x − 8z)   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−xz + 2z)(∂/∂x (−2x + z) + ∂/∂y (−2y + 3z) + ∂/∂z x) + (−2x + z)∂/∂x (−xz + 2z) + (−2y + 3z)∂/∂y (−xz + 2z) + (x)∂/∂z (−xz + 2z)
    = (−xz + 2z)(□) + (−2x + z)(□) + (−2y + 3z)(0) + (x)(□)   (trous : (−xz + 2z)(−4) + (−2x + z)(−z) + (−2y + 3z)(0) + (x)(−x + 2))   ← div F = <math alttext="−4"><mrow><mo>−</mo><mn>4</mn></mrow></math> et ∇f = <math alttext="(−z ; 0 ; −x + 2)"><mrow><mo>(</mo><mrow><mo>−</mo><mi>z</mi></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></math>
    = □   (trous : −x² + 6xz − z² + 2x − 8z)   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (−x² + 6xz − z² + 2x − 8z) − ((−xz + 2z)(−4) + (−2x + z)(−z) + (−2y + 3z)(0) + (x)(−x + 2))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−z ; 0 ; −x + 2) et div F = −4 | f div F + F · ∇f = (−xz + 2z)(−4) + (−2x + z)(−z) + (−2y + 3z)(0) + (x)(−x + 2)
  pièges : g6_product_naive

```

### Niveau 3

```
Soit f(x, y, z) = −xy − 2x et F(x, y, z) = (2x + 3z ; −2x ; 3z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((−xy − 2x)(2x + 3z)) + ∂/∂y ((−xy − 2x)(−2x)) + ∂/∂z ((−xy − 2x)(3z))
    ? Quelle identité vas-tu vérifier ? ✔ div(fF) = f div F + F · ∇f / · div(fF) = f div F / · rot(fF) = f rot F + ∇f ∧ F / · div(∇f) = Δf
    = ∂/∂x (−2x²y − 3xyz − 4x² − 6xz) + ∂/∂y (2x²y + 4x²) + ∂/∂z (−3xyz − 6xz)   ← fF = <math alttext="(−2x²y − 3xyz − 4x² − 6xz ; 2x²y + 4x² ; −3xyz − 6xz)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = −4xy − 3yz − 8x − 6z + 2x² + (−3xy − 6x)   ← On dérive chaque composante
    = 2x² − 7xy − 3yz − 14x − 6z   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−xy − 2x)(∂/∂x (2x + 3z) + ∂/∂y (−2x) + ∂/∂z (3z)) + (2x + 3z)∂/∂x (−xy − 2x) + (−2x)∂/∂y (−xy − 2x) + (3z)∂/∂z (−xy − 2x)
    = (−xy − 2x)(5) + (2x + 3z)(−y − 2) + (−2x)(−x) + (3z)(0)   ← div F = <math alttext="5"><mn>5</mn></math> et ∇f = <math alttext="(−y − 2 ; −x ; 0)"><mrow><mo>(</mo><mrow><mrow><mo>−</mo><mi>y</mi></mrow><mo>−</mo><mn>2</mn></mrow><mo>;</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = 2x² − 7xy − 3yz − 14x − 6z   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (2x² − 7xy − 3yz − 14x − 6z) − ((−xy − 2x)(5) + (2x + 3z)(−y − 2) + (−2x)(−x) + (3z)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−y − 2 ; −x ; 0) et div F = 5 | f div F + F · ∇f = (−xy − 2x)(5) + (2x + 3z)(−y − 2) + (−2x)(−x) + (3z)(0)
  pièges : g6_product_naive, v_identity_drop_term

Soit f(x, y, z) = −x² + 3x et F(x, y, z) = (y ; y ; −x + z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((−x² + 3x)(y)) + ∂/∂y ((−x² + 3x)(y)) + ∂/∂z ((−x² + 3x)(−x + z))
    ? Quelle identité vas-tu vérifier ? ✔ div(fF) = f div F + F · ∇f / · div(fF) = f div F / · rot(fF) = f rot F + ∇f ∧ F / · div(∇f) = Δf
    = ∂/∂x (−x²y + 3xy) + ∂/∂y (−x²y + 3xy) + ∂/∂z (x³ − x²z − 3x² + 3xz)   ← fF = <math alttext="(−x²y + 3xy ; −x²y + 3xy ; x³ − x²z − 3x² + 3xz)"><mrow><mo>(</mo><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>−</mo><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = −2xy + 3y + (−x² + 3x) + (−x² + 3x)   ← On dérive chaque composante
    = −2x² − 2xy + 6x + 3y   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−x² + 3x)(∂/∂x y + ∂/∂y y + ∂/∂z (−x + z)) + (y)∂/∂x (−x² + 3x) + (y)∂/∂y (−x² + 3x) + (−x + z)∂/∂z (−x² + 3x)
    = (−x² + 3x)(2) + (y)(−2x + 3) + (y)(0) + (−x + z)(0)   ← div F = <math alttext="2"><mn>2</mn></math> et ∇f = <math alttext="(−2x + 3 ; 0 ; 0)"><mrow><mo>(</mo><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mn>3</mn></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = −2x² − 2xy + 6x + 3y   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (−2x² − 2xy + 6x + 3y) − ((−x² + 3x)(2) + (y)(−2x + 3) + (y)(0) + (−x + z)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−2x + 3 ; 0 ; 0) et div F = 2 | f div F + F · ∇f = (−x² + 3x)(2) + (y)(−2x + 3) + (y)(0) + (−x + z)(0)
  pièges : v_identity_drop_term

Soit f(x, y, z) = −xz + 3z² et F(x, y, z) = (x + 3y ; 3x − z ; −y). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((−xz + 3z²)(x + 3y)) + ∂/∂y ((−xz + 3z²)(3x − z)) + ∂/∂z ((−xz + 3z²)(−y))
    ? Quelle identité vas-tu vérifier ? ✔ div(fF) = f div F + F · ∇f / · div(fF) = f div F / · rot(fF) = f rot F + ∇f ∧ F / · div(∇f) = Δf
    = ∂/∂x (−x²z − 3xyz + 3xz² + 9yz²) + ∂/∂y (−3x²z + 10xz² − 3z³) + ∂/∂z (xyz − 3yz²)   ← fF = <math alttext="(−x²z − 3xyz + 3xz² + 9yz² ; −3x²z + 10xz² − 3z³ ; xyz − 3yz²)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>10</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = −2xz − 3yz + 3z² + 0 + (xy − 6yz)   ← On dérive chaque composante
    = xy − 2xz − 9yz + 3z²   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−xz + 3z²)(∂/∂x (x + 3y) + ∂/∂y (3x − z) + ∂/∂z (−y)) + (x + 3y)∂/∂x (−xz + 3z²) + (3x − z)∂/∂y (−xz + 3z²) + (−y)∂/∂z (−xz + 3z²)
    = (−xz + 3z²)(1) + (x + 3y)(−z) + (3x − z)(0) + (−y)(−x + 6z)   ← div F = <math alttext="1"><mn>1</mn></math> et ∇f = <math alttext="(−z ; 0 ; −x + 6z)"><mrow><mo>(</mo><mrow><mo>−</mo><mi>z</mi></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = xy − 2xz − 9yz + 3z²   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (xy − 2xz − 9yz + 3z²) − ((−xz + 3z²)(1) + (x + 3y)(−z) + (3x − z)(0) + (−y)(−x + 6z))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−z ; 0 ; −x + 6z) et div F = 1 | f div F + F · ∇f = (−xz + 3z²)(1) + (x + 3y)(−z) + (3x − z)(0) + (−y)(−x + 6z)
  pièges : g6_product_naive, v_identity_drop_term

```

### Niveau 4

```
Soit f(x, y, z) = −2xz − 2z² et F(x, y, z) = (3x ; −x ; x + 3z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [free, suivre l'erreur]  ∂/∂x ((−2xz − 2z²)(3x)) + ∂/∂y ((−2xz − 2z²)(−x)) + ∂/∂z ((−2xz − 2z²)(x + 3z))
    = ∂/∂x (−6x²z − 6xz²) + ∂/∂y (2x²z + 2xz²) + ∂/∂z (−2x²z − 8xz² − 6z³)   ← fF = <math alttext="(−6x²z − 6xz² ; 2x²z + 2xz² ; −2x²z − 8xz² − 6z³)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mo>−</mo><mn>6</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>8</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = −12xz − 6z² + 0 + (−2x² − 16xz − 18z²)   ← On dérive chaque composante
    = −2x² − 28xz − 24z²   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (−2xz − 2z²)(∂/∂x (3x) + ∂/∂y (−x) + ∂/∂z (x + 3z)) + (3x)∂/∂x (−2xz − 2z²) + (−x)∂/∂y (−2xz − 2z²) + (x + 3z)∂/∂z (−2xz − 2z²)
    = (−2xz − 2z²)(6) + (3x)(−2z) + (−x)(0) + (x + 3z)(−2x − 4z)   ← div F = <math alttext="6"><mn>6</mn></math> et ∇f = <math alttext="(−2z ; 0 ; −2x − 4z)"><mrow><mo>(</mo><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>;</mo><mn>0</mn><mo>;</mo><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = −2x² − 28xz − 24z²   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (−2x² − 28xz − 24z²) − ((−2xz − 2z²)(6) + (3x)(−2z) + (−x)(0) + (x + 3z)(−2x − 4z))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (−2z ; 0 ; −2x − 4z) et div F = 6 | f div F + F · ∇f = (−2xz − 2z²)(6) + (3x)(−2z) + (−x)(0) + (x + 3z)(−2x − 4z)
  pièges : g6_product_naive

Soit f(x, y, z) = 2z² − y et F(x, y, z) = (−2y ; 2x ; 2z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [free, suivre l'erreur]  ∂/∂x ((2z² − y)(−2y)) + ∂/∂y ((2z² − y)(2x)) + ∂/∂z ((2z² − y)(2z))
    = ∂/∂x (−4yz² + 2y²) + ∂/∂y (4xz² − 2xy) + ∂/∂z (4z³ − 2yz)   ← fF = <math alttext="(−4yz² + 2y² ; 4xz² − 2xy ; 4z³ − 2yz)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>;</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>3</mn></msup></mrow><mo>−</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>)</mo></mrow></math>
    = 0 + (−2x) + (12z² − 2y)   ← On dérive chaque composante
    = 12z² − 2x − 2y   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (2z² − y)(∂/∂x (−2y) + ∂/∂y (2x) + ∂/∂z (2z)) + (−2y)∂/∂x (2z² − y) + (2x)∂/∂y (2z² − y) + (2z)∂/∂z (2z² − y)
    = (2z² − y)(2) + (−2y)(0) + (2x)(−1) + (2z)(4z)   ← div F = <math alttext="2"><mn>2</mn></math> et ∇f = <math alttext="(0 ; −1 ; 4z)"><mrow><mo>(</mo><mn>0</mn><mo>;</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>;</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>z</mi></mrow><mo>)</mo></mrow></math>
    = 12z² − 2x − 2y   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (12z² − 2x − 2y) − ((2z² − y)(2) + (−2y)(0) + (2x)(−1) + (2z)(4z))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (0 ; −1 ; 4z) et div F = 2 | f div F + F · ∇f = (2z² − y)(2) + (−2y)(0) + (2x)(−1) + (2z)(4z)

Soit f(x, y, z) = xy + 3y² et F(x, y, z) = (3y ; 3x − y ; x − y). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [free, suivre l'erreur]  ∂/∂x ((xy + 3y²)(3y)) + ∂/∂y ((xy + 3y²)(3x − y)) + ∂/∂z ((xy + 3y²)(x − y))
    = ∂/∂x (3xy² + 9y³) + ∂/∂y (3x²y + 8xy² − 3y³) + ∂/∂z (x²y + 2xy² − 3y³)   ← fF = <math alttext="(3xy² + 9y³ ; 3x²y + 8xy² − 3y³ ; x²y + 2xy² − 3y³)"><mrow><mo>(</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>8</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = 3y² + (3x² + 16xy − 9y²) + 0   ← On dérive chaque composante
    = 3x² + 16xy − 6y²   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (xy + 3y²)(∂/∂x (3y) + ∂/∂y (3x − y) + ∂/∂z (x − y)) + (3y)∂/∂x (xy + 3y²) + (3x − y)∂/∂y (xy + 3y²) + (x − y)∂/∂z (xy + 3y²)
    = (xy + 3y²)(−1) + (3y)(y) + (3x − y)(x + 6y) + (x − y)(0)   ← div F = <math alttext="−1"><mrow><mo>−</mo><mn>1</mn></mrow></math> et ∇f = <math alttext="(y ; x + 6y ; 0)"><mrow><mo>(</mo><mi>y</mi><mo>;</mo><mrow><mi>x</mi><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = 3x² + 16xy − 6y²   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (3x² + 16xy − 6y²) − ((xy + 3y²)(−1) + (3y)(y) + (3x − y)(x + 6y) + (x − y)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  aides : Calcule chaque membre séparément, puis compare. | ∇f = (y ; x + 6y ; 0) et div F = −1 | f div F + F · ∇f = (xy + 3y²)(−1) + (3y)(y) + (3x − y)(x + 6y) + (x − y)(0)

```

### Niveau 5

```
Soit f(x, y, z) = 2y² − 2y et F(x, y, z) = (−2x + 3y ; 2z ; −2x − y). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [free, sans aide]  ∂/∂x ((2y² − 2y)(−2x + 3y)) + ∂/∂y ((2y² − 2y)(2z)) + ∂/∂z ((2y² − 2y)(−2x − y))
    = ∂/∂x (−4xy² + 6y³ + 4xy − 6y²) + ∂/∂y (4y²z − 4yz) + ∂/∂z (−4xy² − 2y³ + 4xy + 2y²)   ← fF = <math alttext="(−4xy² + 6y³ + 4xy − 6y² ; 4y²z − 4yz ; −4xy² − 2y³ + 4xy + 2y²)"><mrow><mo>(</mo><mrow><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>+</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>−</mo><mrow><mn>6</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>3</mn></msup></mrow></mrow><mo>+</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = −4y² + 4y + (8yz − 4z) + 0   ← On dérive chaque composante
    = −4y² + 8yz + 4y − 4z   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (2y² − 2y)(∂/∂x (−2x + 3y) + ∂/∂y (2z) + ∂/∂z (−2x − y)) + (−2x + 3y)∂/∂x (2y² − 2y) + (2z)∂/∂y (2y² − 2y) + (−2x − y)∂/∂z (2y² − 2y)
    = (2y² − 2y)(−2) + (−2x + 3y)(0) + (2z)(4y − 2) + (−2x − y)(0)   ← div F = <math alttext="−2"><mrow><mo>−</mo><mn>2</mn></mrow></math> et ∇f = <math alttext="(0 ; 4y − 2 ; 0)"><mrow><mo>(</mo><mn>0</mn><mo>;</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mn>2</mn></mrow><mo>;</mo><mn>0</mn><mo>)</mo></mrow></math>
    = −4y² + 8yz + 4y − 4z   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (−4y² + 8yz + 4y − 4z) − ((2y² − 2y)(−2) + (−2x + 3y)(0) + (2z)(4y − 2) + (−2x − y)(0))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée

Soit f(x, y, z) = xy + 3xz et F(x, y, z) = (3x ; y ; 3z). Vérifie l'identité div(fF) = f div F + F · ∇f sur cet exemple : calcule chaque membre séparément.
  [free, sans aide]  ∂/∂x ((xy + 3xz)(3x)) + ∂/∂y ((xy + 3xz)(y)) + ∂/∂z ((xy + 3xz)(3z))
    = ∂/∂x (3x²y + 9x²z) + ∂/∂y (xy² + 3xyz) + ∂/∂z (3xyz + 9xz²)   ← fF = <math alttext="(3x²y + 9x²z ; xy² + 3xyz ; 3xyz + 9xz²)"><mrow><mo>(</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mrow><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>)</mo></mrow></math>
    = 6xy + 18xz + (2xy + 3xz) + (3xy + 18xz)   ← On dérive chaque composante
    = 11xy + 39xz   ← On regroupe
  — Le membre de droite :  [juge equiv]  départ : (xy + 3xz)(∂/∂x (3x) + ∂/∂y y + ∂/∂z (3z)) + (3x)∂/∂x (xy + 3xz) + (y)∂/∂y (xy + 3xz) + (3z)∂/∂z (xy + 3xz)
    = (xy + 3xz)(7) + (3x)(y + 3z) + (y)(x) + (3z)(3x)   ← div F = <math alttext="7"><mn>7</mn></math> et ∇f = <math alttext="(y + 3z ; x ; 3x)"><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>;</mo><mi>x</mi><mo>;</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>)</mo></mrow></math>
    = 11xy + 39xz   ← On développe
  — On compare les deux membres :  [juge equiv]  départ : (11xy + 39xz) − ((xy + 3xz)(7) + (3x)(y + 3z) + (y)(x) + (3z)(3x))
    = 0   ← Les deux membres sont égaux : l'identité est vérifiée
  pièges : g6_product_naive

Une seule de ces identités est fausse (f et F de classe C²). Laquelle ?
  · div(rot F) = 0   · div(∇f) = Δf   ✔ rot(∇f) = Δf   · div(fF) = f div F + F · ∇f

```

### Variantes d'examen

```
Soit g : ]0 ; +∞[ → ℝ de classe C¹ et F(x) = g(|x|)·x sur ℝ² \ {0}. Alors :
  ✔ F dérive du potentiel φ(x) = G(|x|), où G est une primitive de t ↦ t·g(t)   · div F = 2·g(|x|) pour toute fonction g [v_identity_drop_term]   · div F = 0 pour toute fonction g   · ∮ F · dl = 1 sur le cercle unité pour une fonction g bien choisie [v_rot_closed_zero]
  [examen mcq]
  pièges : v_identity_drop_term, v_rot_closed_zero

```

## Paramétrer une courbe orientée (`v-curve-param`, BA3)

_Segment, cercle, graphe, ellipse : γ(t), ses bornes et son sens, puis γ′(t) et |γ′(t)|._

### Niveau 1

```
Paramètre le cercle centré en l'origine et de rayon 2, parcouru une fois dans le sens positif (trigonométrique) : donne γ(t) avec ses bornes, puis γ′(t) et |γ′(t)|.
  [guided]  Γ
    (Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif.)
    = γ=(□;2sin(t))   (trous : γ = (2cos(t) ; 2sin(t)))   ← La paramétrisation
    = γ=(2cos(t);2sin(t)),t∈[□;□]   (trous : γ = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;2cos(t))   (trous : γ'(t) = (-2sin(t) ; 2cos(t)))   ← On dérive chaque composante
  — La norme de la vitesse :  [juge equiv]  départ : √((−2sin(t))² + (2cos(t))²)
    = √(4sin(t)² + 4cos(t)²)   ← On développe les carrés
    = □   (trous : 2)   ← On simplifie : c'est la vitesse
  aides : Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif. | γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; …] | γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

Paramètre le segment de A(0 ; 2) à B(2 ; 0) : donne γ(t) avec ses bornes, puis γ′(t).
  [guided]  Γ
    (Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1].)
    = γ=(□;-2t+2)   (trous : γ = (2t ; -2t+2))   ← La paramétrisation
    = γ=(2t;-2t+2),t∈[□;□]   (trous : γ = (2t ; -2t+2), t ∈ [0 ; 1])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;-2)   (trous : γ'(t) = (2 ; -2))   ← On dérive chaque composante
  aides : Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1]. | γ(t) = (2t ; -2t+2), t ∈ [0 ; …] | γ(t) = (2t ; -2t+2), t ∈ [0 ; 1]
  pièges : v_orientation_reversed, v_param_bounds

Paramètre le segment de A(−2 ; −2) à B(−2 ; 2) : donne γ(t) avec ses bornes, puis γ′(t) et |γ′(t)|.
  [guided]  Γ
    (Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1].)
    = γ=(□;4t-2)   (trous : γ = (-2 ; 4t-2))   ← La paramétrisation
    = γ=(-2;4t-2),t∈[□;□]   (trous : γ = (-2 ; 4t-2), t ∈ [0 ; 1])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;4)   (trous : γ'(t) = (0 ; 4))   ← On dérive chaque composante
  — La norme de la vitesse :  [juge equiv]  départ : √((0)² + (4)²)
    = √(16)   ← On développe les carrés
    = □   (trous : 4)   ← On simplifie : c'est la vitesse
  aides : Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1]. | γ(t) = (-2 ; 4t-2), t ∈ [0 ; …] | γ(t) = (-2 ; 4t-2), t ∈ [0 ; 1]
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 2

```
Paramètre le cercle centré en l'origine et de rayon 2, parcouru une fois dans le sens positif (trigonométrique) : donne γ(t) avec ses bornes, puis γ′(t) et |γ′(t)|.
  [guided]  Γ
    ? Quel type de courbe ? · Un segment : A + t(B − A), t ∈ [0 ; 1] / ✔ Un arc de cercle : c + R(cos t ; sin t) / · Un graphe y = g(x) : (t ; g(t)) / · Une ellipse : (a cos t ; b sin t)
    = γ=(□;□)   (trous : γ = (2cos(t) ; 2sin(t)))   ← La paramétrisation
    = γ=(2cos(t);2sin(t)),t∈[□;□]   (trous : γ = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-2sin(t) ; 2cos(t)))   ← On dérive chaque composante
  — La norme de la vitesse :  [juge equiv]  départ : √((−2sin(t))² + (2cos(t))²)
    = √(4sin(t)² + 4cos(t)²)   ← On développe les carrés
    = □   (trous : 2)   ← On simplifie : c'est la vitesse
  aides : Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif. | γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; …] | γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

Paramètre le demi-cercle de centre (2 ; 0) et de rayon 2, de A(2 ; −2) à B(2 ; 2) dans le sens négatif (horaire) : donne γ(t) avec ses bornes, puis γ′(t) et |γ′(t)|.
  [guided]  Γ
    ? Quel type de courbe ? · Un segment : A + t(B − A), t ∈ [0 ; 1] / ✔ Un arc de cercle : c + R(cos t ; sin t) / · Un graphe y = g(x) : (t ; g(t)) / · Une ellipse : (a cos t ; b sin t)
    = γ=(□;□)   (trous : γ = (2cos(t)+2 ; -2sin(t)))   ← La paramétrisation
    = γ=(2cos(t)+2;-2sin(t)),t∈[□;□]   (trous : γ = (2cos(t)+2 ; -2sin(t)), t ∈ [-3π/2 ; -π/2])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-2sin(t) ; -2cos(t)))   ← On dérive chaque composante
  — La norme de la vitesse :  [juge equiv]  départ : √((−2sin(t))² + (−2cos(t))²)
    = √(4sin(t)² + 4cos(t)²)   ← On développe les carrés
    = □   (trous : 2)   ← On simplifie : c'est la vitesse
  aides : Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif. | γ(t) = (2cos(t)+2 ; -2sin(t)), t ∈ [−3π/2 ; …] | γ(t) = (2cos(t)+2 ; -2sin(t)), t ∈ [-3π/2 ; -π/2]
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

Paramètre l'arc de l'ellipse x²/4 + y² = 1 de A(2 ; 0) à B(−2 ; 0) dans le sens positif : donne γ(t) avec ses bornes, puis γ′(t).
  [guided]  Γ
    ? Quel type de courbe ? · Un segment : A + t(B − A), t ∈ [0 ; 1] / · Un arc de cercle : c + R(cos t ; sin t) / · Un graphe y = g(x) : (t ; g(t)) / ✔ Une ellipse : (a cos t ; b sin t)
    = γ=(□;□)   (trous : γ = (2cos(t) ; sin(t)))   ← La paramétrisation
    = γ=(2cos(t);sin(t)),t∈[□;□]   (trous : γ = (2cos(t) ; sin(t)), t ∈ [0 ; π])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-2sin(t) ; cos(t)))   ← On dérive chaque composante
  aides : Ellipse x²/a² + y²/b² = 1 : γ(t) = (a cos t ; b sin t), sens positif. | γ(t) = (2cos(t) ; sin(t)), t ∈ [0 ; …] | γ(t) = (2cos(t) ; sin(t)), t ∈ [0 ; π]
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 3

```
Paramètre le demi-cercle de centre (2 ; 0) et de rayon 2, de A(0 ; 0) à B(4 ; 0) dans le sens positif (trigonométrique) : donne γ(t) avec ses bornes, puis γ′(t).
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (2cos(t)+2 ; 2sin(t)), t ∈ [π ; 2π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-2sin(t) ; 2cos(t))   ← On dérive chaque composante
  aides : Cercle de centre c et de rayon R : γ(t) = c + R(cos t ; sin t) dans le sens positif ; (cos t ; −sin t) dans le sens négatif. | γ(t) = (2cos(t)+2 ; 2sin(t)), t ∈ [π ; …] | γ(t) = (2cos(t)+2 ; 2sin(t)), t ∈ [π ; 2π]
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

Paramètre le segment de A(1 ; 2) à B(−2 ; −1) : donne γ(t) avec ses bornes, puis γ′(t).
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (-3t+1 ; -3t+2), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-3 ; -3)   ← On dérive chaque composante
  aides : Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1]. | γ(t) = (-3t+1 ; -3t+2), t ∈ [0 ; …] | γ(t) = (-3t+1 ; -3t+2), t ∈ [0 ; 1]
  pièges : v_orientation_reversed, v_param_bounds

Paramètre l'ellipse x² + y²/4 = 1, parcourue une fois dans le sens positif : donne γ(t) avec ses bornes, puis γ′(t).
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (cos(t) ; 2sin(t)), t ∈ [0 ; 2π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-sin(t) ; 2cos(t))   ← On dérive chaque composante
  aides : Ellipse x²/a² + y²/b² = 1 : γ(t) = (a cos t ; b sin t), sens positif. | γ(t) = (cos(t) ; 2sin(t)), t ∈ [0 ; …] | γ(t) = (cos(t) ; 2sin(t)), t ∈ [0 ; 2π]
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 4

```
Paramètre le bord du triangle de sommets A(2 ; 1), B(−1 ; 1), C(2 ; −2), parcouru dans le sens positif (le triangle à gauche) : un côté après l'autre, de A à B, de B à C, puis de C à A.
  [free, suivre l'erreur]  Γ_1
    = γ = (-3t+2 ; 1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — Le côté Γ₂, de B à C :  [juge param]  départ : Γ_2
    = γ(t) = (3t-1 ; -3t+1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — Le côté Γ₃, de C à A :  [juge param]  départ : Γ_3
    = γ(t) = (2 ; 3t-2), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  aides : Chaque côté est un segment : γ(t) = P + t(Q − P), t ∈ [0 ; 1]. | Γ₁ : γ(t) = (-3t+2 ; 1) | γ(t) = (-3t+2 ; 1), t ∈ [0 ; 1]
  pièges : v_orientation_reversed, v_param_bounds

Paramètre l'hélice tracée sur le cylindre x² + y² = 1, qui monte de 4π par tour : un tour de A(1 ; 0 ; 0) à B(1 ; 0 ; 4π), dans le sens positif autour de l'axe z, à vitesse de montée constante : donne γ(t) avec ses bornes, puis γ′(t) et |γ′(t)|.
  [free, suivre l'erreur]  Γ
    = γ = (cos(t) ; sin(t) ; 2t), t ∈ [0 ; 2π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-sin(t) ; cos(t) ; 2)   ← On dérive chaque composante
  — La norme de la vitesse :  [juge equiv]  départ : √((−sin(t))² + (cos(t))² + (2)²)
    = √(sin(t)² + cos(t)² + 4)   ← On développe les carrés
    = √(5)   ← On simplifie : c'est la vitesse
  aides : Hélice : (cos t ; sin t) tourne autour de l'axe z, et z monte proportionnellement à t. | γ(t) = (cos(t) ; sin(t) ; 2t), t ∈ [0 ; …] | γ(t) = (cos(t) ; sin(t) ; 2t), t ∈ [0 ; 2π]
  pièges : v_orientation_reversed, v_param_bounds

Paramètre l'arc de l'ellipse x²/4 + y² = 1 de A(2 ; 0) à B(−2 ; 0) dans le sens positif : donne γ(t) avec ses bornes, puis γ′(t).
  [free, suivre l'erreur]  Γ
    = γ = (2cos(t) ; sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-2sin(t) ; cos(t))   ← On dérive chaque composante
  aides : Ellipse x²/a² + y²/b² = 1 : γ(t) = (a cos t ; b sin t), sens positif. | γ(t) = (2cos(t) ; sin(t)), t ∈ [0 ; …] | γ(t) = (2cos(t) ; sin(t)), t ∈ [0 ; π]
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 5

```
Paramètre le bord du triangle de sommets A(−1 ; −2), B(2 ; 1), C(−1 ; 0), orienté positivement (le domaine à gauche), morceau par morceau : Γ₁ de A à B, Γ₂ de B à C, Γ₃ de C à A. Donne aussi γ′(t) sur chaque morceau.
  [free, sans aide]  Γ_1
    = γ = (3t-1 ; 3t-2), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₁ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (3 ; 3)   ← On dérive chaque composante
  — Γ₂, de B à C :  [juge param]  départ : Γ_2
    = γ(t) = (-3t+2 ; -t+1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₂ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-3 ; -1)   ← On dérive chaque composante
  — Γ₃, de C à A :  [juge param]  départ : Γ_3
    = γ(t) = (-1 ; -2t), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₃ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (0 ; -2)   ← On dérive chaque composante
  pièges : v_orientation_reversed, v_param_bounds

Paramètre le bord du demi-disque D = {x² + y² ≤ 1, y ≥ 0}, orienté positivement (le domaine à gauche), morceau par morceau : Γ₁ le diamètre, de (−1 ; 0) à (1 ; 0), Γ₂ le demi-cercle. Donne aussi γ′(t) sur chaque morceau.
  [free, sans aide]  Γ_1
    = γ = (t ; 0), t ∈ [-1 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₁ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (1 ; 0)   ← On dérive chaque composante
  — Γ₂, le demi-cercle :  [juge param]  départ : Γ_2
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₂ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-sin(t) ; cos(t))   ← On dérive chaque composante
  pièges : v_orientation_reversed, v_param_bounds

Paramètre le bord du triangle de sommets A(2 ; −2), B(0 ; 2), C(−2 ; 0), orienté positivement (le domaine à gauche), morceau par morceau : Γ₁ de A à B, Γ₂ de B à C, Γ₃ de C à A. Donne aussi γ′(t) sur chaque morceau.
  [free, sans aide]  Γ_1
    = γ = (-2t+2 ; 4t-2), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₁ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-2 ; 4)   ← On dérive chaque composante
  — Γ₂, de B à C :  [juge param]  départ : Γ_2
    = γ(t) = (-2t ; -2t+2), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₂ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-2 ; -2)   ← On dérive chaque composante
  — Γ₃, de C à A :  [juge param]  départ : Γ_3
    = γ(t) = (4t-2 ; -2t), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — γ′ sur Γ₃ :  [juge vector]  départ : γ′(t)
    = γ'(t) = (4 ; -2)   ← On dérive chaque composante
  pièges : v_orientation_reversed, v_param_bounds

```

### Variantes d'examen

```
Soit Γ le demi-cercle centré en l'origine et de rayon 2, de A(−2 ; 0) à B(2 ; 0) dans le sens négatif (horaire). Quelle paramétrisation décrit Γ, parcourue de A à B ?
  · γ(t) = (2cos(t) ; -2sin(t)), t ∈ [-π ; π] [v_param_bounds]   · γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π] [v_orientation_reversed]   ✔ γ(t) = (2cos(t) ; -2sin(t)), t ∈ [-π ; 0]   · γ(t) = (4cos(t) ; -4sin(t)), t ∈ [-π ; 0] [v_radius_squared]
  [examen mcq]
  pièges : v_orientation_reversed, v_param_bounds, v_radius_squared

```

## Intégrale curviligne d'un champ scalaire ∫ f dl (`v-line-scalar`, BA3)

_∫ f dl = ∫ f(γ(t)) |γ′(t)| dt : la vitesse multiplie ; avec f = 1, la longueur._

### Niveau 1

```
Soit Γ le segment de A(−2 ; 1) à B(−6 ; 4) et f(x, y) = x + 3y. Calcule ∫Γ f dl : calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  √((−4)² + (3)²)
    (Γ est paramétrée par γ(t) = (-4t-2 ; 3t+1), t ∈ [0 ; 1].)
    = √(25)   ← On développe les carrés
    = □   (trous : 5)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} ((−4t − 2) + 3(3t + 1))·□ dt   (trous : ∫_{0}^{1} ((−4t − 2) + 3(3t + 1))·5 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (25t + 5) dt   ← On développe
    = □   (trous : 35/2)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ (−4t − 2) + 3(3t + 1) · … dt | ∫_{0}^{1} (−4t − 2 + 3(3t + 1))·5 dt

Soit Γ le segment de A(0 ; −2) à B(2 ; −2) et f(x, y) = 2xy. Calcule ∫Γ f dl : calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  √((2)² + (0)²)
    (Γ est paramétrée par γ(t) = (2t ; -2), t ∈ [0 ; 1].)
    = √(4)   ← On développe les carrés
    = □   (trous : 2)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} (2(2t)(−2))·□ dt   (trous : ∫_{0}^{1} (2(2t)(−2))·2 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} −16t dt   ← On développe
    = □   (trous : −8)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 2 ; ∫ 2(2t)(−2) · … dt | ∫_{0}^{1} 22t(−2)·2 dt

Soit Γ le segment de A(0 ; 1) à B(4 ; −2) et f(x, y) = xy. Calcule ∫Γ f dl : calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  √((4)² + (−3)²)
    (Γ est paramétrée par γ(t) = (4t ; -3t+1), t ∈ [0 ; 1].)
    = √(25)   ← On développe les carrés
    = □   (trous : 5)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} ((4t)(−3t + 1))·□ dt   (trous : ∫_{0}^{1} ((4t)(−3t + 1))·5 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (−60t² + 20t) dt   ← On développe
    = □   (trous : −10)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ (4t)(−3t + 1) · … dt | ∫_{0}^{1} 4t(−3t + 1)·5 dt

```

### Niveau 2

```
Soit Γ le segment de A(2 ; 0) à B(−1 ; 4) et f(x, y) = 2x + 3y. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  Γ
    = γ=(□;□)   (trous : γ = (-3t+2 ; 4t))   ← La paramétrisation
    = γ=(-3t+2;4t),t∈[□;□]   (trous : γ = (-3t+2 ; 4t), t ∈ [0 ; 1])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La norme de la vitesse :  [juge equiv]  départ : √((−3)² + (4)²)
    = √(25)   ← On développe les carrés
    = □   (trous : 5)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} (2(−3t + 2) + 3(4t))·□ dt   (trous : ∫_{0}^{1} (2(−3t + 2) + 3(4t))·5 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (30t + 20) dt   ← On développe
    = □   (trous : 35)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ 2(−3t + 2) + 3(4t) · … dt | ∫_{0}^{1} (2(−3t + 2) + 34t)·5 dt
  pièges : v_orientation_reversed, v_param_bounds

Soit Γ le cercle centré en l'origine et de rayon 1, parcouru une fois dans le sens positif (trigonométrique) et f(x, y) = −x² + xy + x + y − 1. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  Γ
    = γ=(□;□)   (trous : γ = (cos(t) ; sin(t)))   ← La paramétrisation
    = γ=(cos(t);sin(t)),t∈[□;□]   (trous : γ = (cos(t) ; sin(t)), t ∈ [0 ; 2π])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La norme de la vitesse :  [juge equiv]  départ : √((−sin(t))² + (cos(t))²)
    = √(sin(t)² + cos(t)²)   ← On développe les carrés
    = □   (trous : 1)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{2π} (−(cos(t))² + (cos(t))(sin(t)) + (cos(t)) + (sin(t)) − 1)·□ dt   (trous : ∫_{0}^{2π} (−(cos(t))² + (cos(t))(sin(t)) + (cos(t)) + (sin(t)) − 1)·1 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{2π} (sin(t)cos(t) + sin(t) − cos(t)² + cos(t) − 1) dt   ← On développe
    = □   (trous : −3π)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 1 ; ∫ −(cos(t))² + (cos(t))(sin(t)) + (cos(t)) + (sin(t)) − 1 · … dt | ∫_{0}^{2π} (−cos(t)² + cos(t)sin(t) + cos(t) + sin(t) − 1)·1 dt
  pièges : v_orientation_reversed, v_param_bounds

Soit Γ le cercle centré en l'origine et de rayon 3, parcouru une fois dans le sens positif (trigonométrique) et f(x, y) = −x² + xy + x + y + 1. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [guided]  Γ
    = γ=(□;□)   (trous : γ = (3cos(t) ; 3sin(t)))   ← La paramétrisation
    = γ=(3cos(t);3sin(t)),t∈[□;□]   (trous : γ = (3cos(t) ; 3sin(t)), t ∈ [0 ; 2π])   ← Les bornes : t parcourt Γ une fois, dans le bon sens
  — La norme de la vitesse :  [juge equiv]  départ : √((−3sin(t))² + (3cos(t))²)
    = √(9sin(t)² + 9cos(t)²)   ← On développe les carrés
    = □   (trous : 3)   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{2π} (−(3cos(t))² + (3cos(t))(3sin(t)) + (3cos(t)) + (3sin(t)) + 1)·□ dt   (trous : ∫_{0}^{2π} (−(3cos(t))² + (3cos(t))(3sin(t)) + (3cos(t)) + (3sin(t)) + 1)·3 dt)   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{2π} (27sin(t)cos(t) + 9sin(t) − 27cos(t)² + 9cos(t) + 3) dt   ← On développe
    = □   (trous : −21π)   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 3 ; ∫ −(3cos(t))² + (3cos(t))(3sin(t)) + (3cos(t)) + (3sin(t)) + 1 · … dt | ∫_{0}^{2π} (−(3cos(t))² + 3cos(t)3sin(t) + 3cos(t) + 3sin(t) + 1)·3 dt
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

```

### Niveau 3

```
Soit Γ le demi-cercle centré en l'origine et de rayon 3, de A(3 ; 0) à B(−3 ; 0) dans le sens positif (trigonométrique) et f(x, y) = xy − y − 1. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (3cos(t) ; 3sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((−3sin(t))² + (3cos(t))²)
    = √(9sin(t)² + 9cos(t)²)   ← On développe les carrés
    = 3   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    ? Que faut-il intégrer en t ? ✔ f(γ(t))·|γ′(t)|, avec la vitesse (un nombre) / · f(γ(t))·γ′(t) / · f(γ(t)) seul
    = ∫_{0}^{π} ((3cos(t))(3sin(t)) − (3sin(t)) − 1)·3 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{π} (27sin(t)cos(t) − 9sin(t) − 3) dt   ← On développe
    = −18 − 3π   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 3 ; ∫ (3cos(t))(3sin(t)) − (3sin(t)) − 1 · … dt | ∫_{0}^{π} (3cos(t)3sin(t) − 3sin(t) − 1)·3 dt
  pièges : v_radius_squared, v_speed_forgot, v_orientation_reversed, v_param_bounds

Soit Γ le demi-cercle centré en l'origine et de rayon 2, de A(2 ; 0) à B(−2 ; 0) dans le sens positif (trigonométrique) et f(x, y) = −x² + 2xy + x − y + 3. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (2cos(t) ; 2sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((−2sin(t))² + (2cos(t))²)
    = √(4sin(t)² + 4cos(t)²)   ← On développe les carrés
    = 2   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    ? Que faut-il intégrer en t ? ✔ f(γ(t))·|γ′(t)|, avec la vitesse (un nombre) / · f(γ(t))·γ′(t) / · f(γ(t)) seul
    = ∫_{0}^{π} (−(2cos(t))² + 2(2cos(t))(2sin(t)) + (2cos(t)) − (2sin(t)) + 3)·2 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{π} (16sin(t)cos(t) − 4sin(t) − 8cos(t)² + 4cos(t) + 6) dt   ← On développe
    = −8 + 2π   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 2 ; ∫ −(2cos(t))² + 2(2cos(t))(2sin(t)) + (2cos(t)) − (2sin(t)) + 3 · … dt | ∫_{0}^{π} (−(2cos(t))² + 22cos(t)2sin(t) + 2cos(t) − 2sin(t) + 3)·2 dt
  pièges : v_radius_squared, v_speed_forgot, v_orientation_reversed, v_param_bounds

Soit Γ le segment de A(2 ; −1) à B(−1 ; 3) et f(x, y) = xy. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    = γ = (-3t+2 ; 4t-1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((−3)² + (4)²)
    = √(25)   ← On développe les carrés
    = 5   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    ? Que faut-il intégrer en t ? ✔ f(γ(t))·|γ′(t)|, avec la vitesse (un nombre) / · f(γ(t))·γ′(t) / · f(γ(t)) seul
    = ∫_{0}^{1} ((−3t + 2)(4t − 1))·5 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (−60t² + 55t − 10) dt   ← On développe
    = −5/2   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ (−3t + 2)(4t − 1) · … dt | ∫_{0}^{1} (−3t + 2)(4t − 1)·5 dt
  pièges : v_speed_forgot, v_orientation_reversed, v_param_bounds

```

### Niveau 4

```
Soit Γ le segment de A(−2 ; 1) à B(1 ; −3) et f(x, y) = 3x + 3y + 2. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (3t-2 ; -4t+1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((3)² + (−4)²)
    = √(25)   ← On développe les carrés
    = 5   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} (3(3t − 2) + 3(−4t + 1) + 2)·5 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (−15t − 5) dt   ← On développe
    = −25/2   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ 3(3t − 2) + 3(−4t + 1) + 2 · … dt | ∫_{0}^{1} (3(3t − 2) + 3(−4t + 1) + 2)·5 dt
  pièges : v_orientation_reversed, v_param_bounds

Soit Γ le cercle centré en l'origine et de rayon 2, parcouru une fois dans le sens positif (trigonométrique) et f(x, y) = −x² + xy + x + 3. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((−2sin(t))² + (2cos(t))²)
    = √(4sin(t)² + 4cos(t)²)   ← On développe les carrés
    = 2   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{2π} (−(2cos(t))² + (2cos(t))(2sin(t)) + (2cos(t)) + 3)·2 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{2π} (8sin(t)cos(t) − 8cos(t)² + 4cos(t) + 6) dt   ← On développe
    = 4π   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 2 ; ∫ −(2cos(t))² + (2cos(t))(2sin(t)) + (2cos(t)) + 3 · … dt | ∫_{0}^{2π} (−(2cos(t))² + 2cos(t)2sin(t) + 2cos(t) + 3)·2 dt
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

Soit Γ le segment de A(2 ; 1) à B(5 ; 5) et f(x, y) = 2x − y − 1. Calcule ∫Γ f dl : paramètre Γ, puis calcule |γ′(t)|, puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (3t+2 ; 4t+1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La norme de la vitesse :  [juge equiv]  départ : √((3)² + (4)²)
    = √(25)   ← On développe les carrés
    = 5   ← On simplifie : c'est la vitesse
  — L'intégrale curviligne :  [juge definite]  départ : I
    = ∫_{0}^{1} (2(3t + 2) − (4t + 1) − 1)·5 dt   ← f(γ(t)) multiplié par la vitesse
    = ∫_{0}^{1} (10t + 10) dt   ← On développe
    = 15   ← On intègre
  aides : Paramètre, puis multiplie f(γ(t)) par la vitesse |γ′(t)| : ∫Γ f dl = ∫ f(γ(t))·|γ′(t)| dt. | |γ′(t)| = 5 ; ∫ 2(3t + 2) − (4t + 1) − 1 · … dt | ∫_{0}^{1} (2(3t + 2) − (4t + 1) − 1)·5 dt
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 5

```
Soit Γ la courbe γ(t) = (t³/3 ; 2t ; t²), t ∈ [0 ; 2]. Calcule la longueur de Γ, puis ∫Γ f dl avec f(x, y, z) = z.
  [free, sans aide]  √((t²)² + (2)² + (2t)²)
    = √(t⁴ + 4t² + 4)   ← On développe les carrés
    = t² + 2   ← On simplifie : c'est la vitesse
  — La longueur :  [juge definite]  départ : L
    = ∫_{0}^{2} (t² + 2) dt   ← La longueur : ∫ |γ′(t)| dt
    = 20/3   ← On intègre
  — Puis ∫Γ f dl pour f(x, y, z) = z :  [juge definite]  départ : I
    = ∫_{0}^{2} t²·(t² + 2) dt   ← f(γ(t)) = t², multiplié par |γ′(t)|
    = 176/15   ← On intègre
  pièges : g2_power_power

Soit Γ la courbe γ(t) = (t³/3 ; 8t ; 2t²), t ∈ [0 ; 1]. Calcule la longueur de Γ, puis ∫Γ f dl avec f(x, y, z) = z/2.
  [free, sans aide]  √((t²)² + (8)² + (4t)²)
    = √(t⁴ + 16t² + 64)   ← On développe les carrés
    = t² + 8   ← On simplifie : c'est la vitesse
  — La longueur :  [juge definite]  départ : L
    = ∫_{0}^{1} (t² + 8) dt   ← La longueur : ∫ |γ′(t)| dt
    = 25/3   ← On intègre
  — Puis ∫Γ f dl pour f(x, y, z) = z/2 :  [juge definite]  départ : I
    = ∫_{0}^{1} t²·(t² + 8) dt   ← f(γ(t)) = t², multiplié par |γ′(t)|
    = 43/15   ← On intègre
  pièges : g2_power_power

Soit Γ la courbe γ(t) = (t³/3 ; t/2 ; t²/2), t ∈ [0 ; 1]. Calcule la longueur de Γ, puis ∫Γ f dl avec f(x, y, z) = 2z.
  [free, sans aide]  √((t²)² + (1/2)² + (t)²)
    = √(t⁴ + t² + 1/4)   ← On développe les carrés
    = t² + 1/2   ← On simplifie : c'est la vitesse
  — La longueur :  [juge definite]  départ : L
    = ∫_{0}^{1} (t² + 1/2) dt   ← La longueur : ∫ |γ′(t)| dt
    = 5/6   ← On intègre
  — Puis ∫Γ f dl pour f(x, y, z) = 2z :  [juge definite]  départ : I
    = ∫_{0}^{1} t²·(t² + 1/2) dt   ← f(γ(t)) = t², multiplié par |γ′(t)|
    = 11/30   ← On intègre
  pièges : g2_power_power

```

### Variantes d'examen

```
Soit Γ le cercle x² + y² = 16. Alors ∫Γ (2xy + x + 2) dl =
  · 64π [v_radius_squared]   · 38   · 4π [v_speed_forgot]   ✔ 16π
  [examen mcq]
  pièges : v_speed_forgot, v_radius_squared

Soit Γ la courbe γ(t) = (t³/3 ; t/2 ; t²/2), t ∈ [0 ; 1]. Calcule la longueur de Γ.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 2 ; La longueur : 2)
    [free, sans aide, suivre l'erreur, examen open]  √((t²)² + (1/2)² + (t)²)
      = √(t⁴ + t² + 1/4)   ← On développe les carrés
      = t² + 1/2   ← On simplifie : c'est la vitesse
    — La longueur :  [juge definite]  départ : L
      = ∫_{0}^{1} (t² + 1/2) dt   ← La longueur : ∫ |γ′(t)| dt
      = 5/6   ← On intègre
  pièges : g2_power_power

```

## Travail ∫ F · dl et orientation (`v-line-vector`, BA3)

_∫ F · dl = ∫ F(γ(t)) · γ′(t) dt : produit scalaire avec γ′, pas de |γ′| ; le sens change le signe._

### Niveau 1

```
Soit Γ le quart de cercle centré en l'origine et de rayon 2, de A(2 ; 0) à B(0 ; 2) dans le sens positif (trigonométrique) et F(x, y) = (2y² + 2x ; 3y² − 2y). Calcule le travail ∫Γ F · dl.
  [guided]  W
    (Γ : γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π/2], et (γ(t))′ = (−2sin(t) ; 2cos(t)).)
    = ∫_{0}^{π/2} ((2(2sin(t))² + 2(2cos(t)))·(□) + (3(2sin(t))² − 2(2sin(t)))·(□)) dt   (trous : ∫_{0}^{π/2} ((2(2sin(t))² + 2(2cos(t)))·(−2sin(t)) + (3(2sin(t))² − 2(2sin(t)))·(2cos(t))) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π/2} (−16sin(t)³ + 24sin(t)²cos(t) − 16sin(t)cos(t)) dt   ← On développe
    = □   (trous : −32/3)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (8sin(t)² + 4cos(t) ; 12sin(t)² − 4sin(t)) et γ′(t) = (−2sin(t) ; 2cos(t)) | ∫_{0}^{π/2} ((2(2sin(t))² + 22cos(t))·(−2sin(t)) + (3(2sin(t))² − 22sin(t))·(2cos(t))) dt
  pièges : v_orientation_reversed, v_speed_in_work, v_gamma_prime_forgot, v_sincos_sign

Soit Γ le quart de cercle centré en l'origine et de rayon 2, de A(2 ; 0) à B(0 ; 2) dans le sens positif (trigonométrique) et F(x, y) = (−2xy ; y²). Calcule le travail ∫Γ F · dl.
  [guided]  W
    (Γ : γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π/2], et (γ(t))′ = (−2sin(t) ; 2cos(t)).)
    = ∫_{0}^{π/2} ((−2(2cos(t))(2sin(t)))·(□) + ((2sin(t))²)·(□)) dt   (trous : ∫_{0}^{π/2} ((−2(2cos(t))(2sin(t)))·(−2sin(t)) + ((2sin(t))²)·(2cos(t))) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π/2} 24sin(t)²cos(t) dt   ← On développe
    = □   (trous : 8)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (−8sin(t)cos(t) ; 4sin(t)²) et γ′(t) = (−2sin(t) ; 2cos(t)) | ∫_{0}^{π/2} (−22cos(t)2sin(t)·(−2sin(t)) + (2sin(t))²·(2cos(t))) dt
  pièges : v_orientation_reversed, v_speed_in_work, v_gamma_prime_forgot

Soit Γ le quart de cercle centré en l'origine et de rayon 1, de A(1 ; 0) à B(0 ; 1) dans le sens positif (trigonométrique) et F(x, y) = (y² − 3x ; −x). Calcule le travail ∫Γ F · dl.
  [guided]  W
    (Γ : γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; π/2], et (γ(t))′ = (−sin(t) ; cos(t)).)
    = ∫_{0}^{π/2} (((sin(t))² − 3(cos(t)))·(□) + (−(□))·(cos(t))) dt   (trous : ∫_{0}^{π/2} (((sin(t))² − 3(cos(t)))·(−sin(t)) + (−(cos(t)))·(cos(t))) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π/2} (−sin(t)³ + 3sin(t)cos(t) − cos(t)²) dt   ← On développe
    = □   (trous : 5/6 − π/4)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (sin(t)² − 3cos(t) ; −cos(t)) et γ′(t) = (−sin(t) ; cos(t)) | ∫_{0}^{π/2} ((sin(t)² − 3cos(t))·(−sin(t)) + −cos(t)·cos(t)) dt
  pièges : v_orientation_reversed, v_gamma_prime_forgot, v_sincos_sign

```

### Niveau 2

```
Soit Γ le demi-cercle centré en l'origine et de rayon 1, de A(1 ; 0) à B(−1 ; 0) dans le sens positif (trigonométrique) et F(x, y) = (−2y ; 2x²). Calcule le travail ∫Γ F · dl.
  [guided]  γ′(t)
    (Γ : γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; π].)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-sin(t) ; cos(t)))   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{π} ((□)·(−sin(t)) + (□)·(cos(t))) dt   (trous : ∫_{0}^{π} ((−2(sin(t)))·(−sin(t)) + (2(cos(t))²)·(cos(t))) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π} (2sin(t)² + 2cos(t)³) dt   ← On développe
    = □   (trous : π)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (−2sin(t) ; 2cos(t)²) et γ′(t) = (−sin(t) ; cos(t)) | ∫_{0}^{π} (−2sin(t)·(−sin(t)) + 2cos(t)²·cos(t)) dt

Soit Γ le segment de A(0 ; −1) à B(−1 ; 0) et F(x, y) = (−2x² ; 3y² + 3y). Calcule le travail ∫Γ F · dl.
  [guided]  γ′(t)
    (Γ : γ(t) = (-t ; t-1), t ∈ [0 ; 1].)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-1 ; 1))   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{1} ((□)·(−1) + (□)·(1)) dt   (trous : ∫_{0}^{1} ((−2(−t)²)·(−1) + (3(t − 1)² + 3(t − 1))·(1)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{1} (5t² − 3t) dt   ← On développe
    = □   (trous : 1/6)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (−2t² ; 3t² − 3t) et γ′(t) = (−1 ; 1) | ∫_{0}^{1} (−2(−t)²·(−1) + (3(t − 1)² + 3(t − 1))·1) dt

Soit Γ l'arc de la courbe y = x² de A(1 ; 1) à B(0 ; 0) et F(x, y) = (−3x² − 3xy ; 2x). Calcule le travail ∫Γ F · dl.
  [guided]  γ′(t)
    (Γ : γ(t) = (-t+1 ; t^2-2t+1), t ∈ [0 ; 1].)
    = γ'(t)=(□;□)   (trous : γ'(t) = (-1 ; 2t-2))   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{1} ((□)·(−1) + (□)·(2t − 2)) dt   (trous : ∫_{0}^{1} ((−3(−t + 1)² − 3(−t + 1)(t² − 2t + 1))·(−1) + (2(−t + 1))·(2t − 2)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{1} (−3t³ + 8t² − 7t + 2) dt   ← On développe
    = □   (trous : 5/12)   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (3t³ − 12t² + 15t − 6 ; −2t + 2) et γ′(t) = (−1 ; 2t − 2) | ∫_{0}^{1} ((−3(−t + 1)² − 3(−t + 1)(t² − 2t + 1))·(−1) + 2(−t + 1)·(2t − 2)) dt

```

### Niveau 3

```
Soit Γ l'arc de la courbe y = x³ de A(0 ; 0) à B(1 ; 1) et F(x, y) = (y² + 2y ; −3xy). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    ? Comment calcules-tu le travail ? ✔ Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) dt / · Chercher un potentiel φ, puis φ(B) − φ(A) / · Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) |γ′(t)| dt
    = γ = (t ; t^3), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (1 ; 3t^2)   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{1} (((t³)² + 2(t³))·(1) + (−3(t)(t³))·(3t²)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{1} (−8t⁶ + 2t³) dt   ← On développe
    = −9/14   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (t⁶ + 2t³ ; −3t⁴) et γ′(t) = (1 ; 3t²) | ∫_{0}^{1} (((t³)² + 2t³)·1 + −3tt³·(3t²)) dt
  pièges : v_speed_in_work, v_orientation_reversed, v_param_bounds

Soit Γ l'arc de la courbe y = x² de A(0 ; 0) à B(2 ; 4) et F(x, y) = (−2y² ; −2x² − 2xy). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    ? Comment calcules-tu le travail ? ✔ Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) dt / · Chercher un potentiel φ, puis φ(B) − φ(A) / · Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) |γ′(t)| dt
    = γ = (t ; t^2), t ∈ [0 ; 2]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (1 ; 2t)   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{2} ((−2(t²)²)·(1) + (−2(t)² − 2(t)(t²))·(2t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2} (−6t⁴ − 4t³) dt   ← On développe
    = −272/5   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (−2t⁴ ; −2t³ − 2t²) et γ′(t) = (1 ; 2t) | ∫_{0}^{2} (−2(t²)²·1 + (−2t² − 2tt²)·(2t)) dt
  pièges : v_speed_in_work, v_orientation_reversed, v_param_bounds

Soit Γ le segment de A(0 ; 1) à B(−2 ; 2) et F(x, y) = (2y ; −x²). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [tap, suivre l'erreur, menu menu]  Γ
    ? Comment calcules-tu le travail ? ✔ Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) dt / · Chercher un potentiel φ, puis φ(B) − φ(A) / · Paramétrer Γ, puis ∫ F(γ(t)) · γ′(t) |γ′(t)| dt
    = γ = (-2t ; t+1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-2 ; 1)   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{1} ((2(t + 1))·(−2) + (−(−2t)²)·(1)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{1} (−4t² − 4t − 4) dt   ← On développe
    = −22/3   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (2t + 2 ; −4t²) et γ′(t) = (−2 ; 1) | ∫_{0}^{1} (2(t + 1)·(−2) + −(−2t)²·1) dt
  pièges : v_speed_in_work, v_orientation_reversed, v_param_bounds

```

### Niveau 4

```
Soit Γ le segment de A(−1 ; −1) à B(1 ; 1) et F(x, y) = (3xy ; 2x² + 2x). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (2t-1 ; 2t-1), t ∈ [0 ; 1]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (2 ; 2)   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{1} ((3(2t − 1)(2t − 1))·(2) + (2(2t − 1)² + 2(2t − 1))·(2)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{1} (40t² − 32t + 6) dt   ← On développe
    = 10/3   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (12t² − 12t + 3 ; 8t² − 4t) et γ′(t) = (2 ; 2) | ∫_{0}^{1} (3(2t − 1)(2t − 1)·2 + (2(2t − 1)² + 2(2t − 1))·2) dt
  pièges : v_orientation_reversed, v_param_bounds

Soit Γ le cercle centré en l'origine et de rayon 1, parcouru une fois dans le sens positif (trigonométrique) et F(x, y) = (x² + 2y ; 3xy + x). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-sin(t) ; cos(t))   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{2π} (((cos(t))² + 2(sin(t)))·(−sin(t)) + (3(cos(t))(sin(t)) + (cos(t)))·(cos(t))) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} (−2sin(t)² + 2sin(t)cos(t)² + cos(t)²) dt   ← On développe
    = −π   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (2sin(t) + cos(t)² ; 3sin(t)cos(t) + cos(t)) et γ′(t) = (−sin(t) ; cos(t)) | ∫_{0}^{2π} ((cos(t)² + 2sin(t))·(−sin(t)) + (3cos(t)sin(t) + cos(t))·cos(t)) dt
  pièges : v_orientation_reversed, v_param_bounds

Soit Γ le demi-cercle centré en l'origine et de rayon 1, de A(1 ; 0) à B(−1 ; 0) dans le sens positif (trigonométrique) et F(x, y) = (x² ; −xy). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [free, suivre l'erreur]  Γ
    = γ = (cos(t) ; sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — La vitesse :  [juge vector]  départ : γ′(t)
    = γ'(t) = (-sin(t) ; cos(t))   ← On dérive chaque composante
  — Le travail :  [juge definite]  départ : W
    = ∫_{0}^{π} (((cos(t))²)·(−sin(t)) + (−(cos(t))(sin(t)))·(cos(t))) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π} −2sin(t)cos(t)² dt   ← On développe
    = −4/3   ← On intègre
  aides : Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) : ∫Γ F · dl = ∫ F(γ(t)) · γ′(t) dt. | F(γ(t)) = (cos(t)² ; −sin(t)cos(t)) et γ′(t) = (−sin(t) ; cos(t)) | ∫_{0}^{π} (cos(t)²·(−sin(t)) + −cos(t)sin(t)·cos(t)) dt
  pièges : v_orientation_reversed, v_param_bounds

```

### Niveau 5

```
Soit D le demi-disque {x² + y² ≤ 1, y ≥ 0} et F(x, y) = (−3x² + 3y ; 2y²). Calcule la circulation ∮∂D F · dl sur le bord orienté positivement : Γ₁ le diamètre de (−1 ; 0) à (1 ; 0), puis Γ₂ le demi-cercle.
  [free, sans aide]  Γ_1
    = γ = (t ; 0), t ∈ [-1 ; 1]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₁ :  [juge definite]  départ : I
    = ∫_{−1}^{1} (−3(t)² + 3(0))·(1) dt   ← F(γ(t)) · γ′(t)
    = ∫_{−1}^{1} −3t² dt   ← On développe
    = −2   ← On intègre
  — Le demi-cercle Γ₂ :  [juge param]  départ : Γ_2
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₂ :  [juge definite]  départ : J
    = ∫_{0}^{π} ((−3(cos(t))² + 3(sin(t)))·(−sin(t)) + (2(sin(t))²)·(cos(t))) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π} (2sin(t)²cos(t) − 3sin(t)² + 3sin(t)cos(t)²) dt   ← On développe
    = 2 − 3π/2   ← On intègre
  — La circulation sur tout le bord :  [juge definite]  départ : W
    = −3π/2   ← ∮ F · dl
  pièges : v_orientation_reversed, v_param_bounds

Soit D le demi-disque {x² + y² ≤ 1, y ≥ 0} et F(x, y) = (2x² ; xy). Calcule la circulation ∮∂D F · dl sur le bord orienté positivement : Γ₁ le diamètre de (−1 ; 0) à (1 ; 0), puis Γ₂ le demi-cercle.
  [free, sans aide]  Γ_1
    = γ = (t ; 0), t ∈ [-1 ; 1]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₁ :  [juge definite]  départ : I
    = ∫_{−1}^{1} (2(t)²)·(1) dt   ← F(γ(t)) · γ′(t)
    = ∫_{−1}^{1} 2t² dt   ← On développe
    = 4/3   ← On intègre
  — Le demi-cercle Γ₂ :  [juge param]  départ : Γ_2
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₂ :  [juge definite]  départ : J
    = ∫_{0}^{π} ((2(cos(t))²)·(−sin(t)) + ((cos(t))(sin(t)))·(cos(t))) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π} −sin(t)cos(t)² dt   ← On développe
    = −2/3   ← On intègre
  — La circulation sur tout le bord :  [juge definite]  départ : W
    = 4/3 + (−2/3)   ← On additionne
    = 2/3   ← ∮ F · dl
  pièges : v_orientation_reversed, v_param_bounds

Soit D le demi-disque {x² + y² ≤ 4, y ≥ 0} et F(x, y) = (x² ; −xy). Calcule la circulation ∮∂D F · dl sur le bord orienté positivement : Γ₁ le diamètre de (−2 ; 0) à (2 ; 0), puis Γ₂ le demi-cercle.
  [free, sans aide]  Γ_1
    = γ = (t ; 0), t ∈ [-2 ; 2]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₁ :  [juge definite]  départ : I
    = ∫_{−2}^{2} ((t)²)·(1) dt   ← F(γ(t)) · γ′(t)
    = ∫_{−2}^{2} t² dt   ← On développe
    = 16/3   ← On intègre
  — Le demi-cercle Γ₂ :  [juge param]  départ : Γ_2
    = γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π]   ← La paramétrisation et ses bornes
  — Le travail sur Γ₂ :  [juge definite]  départ : J
    = ∫_{0}^{π} (((2cos(t))²)·(−2sin(t)) + (−(2cos(t))(2sin(t)))·(2cos(t))) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{π} −16sin(t)cos(t)² dt   ← On développe
    = −32/3   ← On intègre
  — La circulation sur tout le bord :  [juge definite]  départ : W
    = 16/3 + (−32/3)   ← On additionne
    = −16/3   ← ∮ F · dl
  pièges : v_orientation_reversed, v_param_bounds

```

### Variantes d'examen

```
Soit Γ le cercle x² + y² = 4, parcouru une fois dans le sens positif. Alors ∮Γ (−y ; x) · dl =
  · −8π [v_orientation_reversed]   ✔ 8π   · 4π [v_speed_forgot]   · 0 [v_rot_closed_zero]
  [examen mcq]
  pièges : v_orientation_reversed, v_speed_forgot, v_rot_closed_zero

Soit Γ le cercle centré en l'origine et de rayon 2, parcouru une fois dans le sens positif (trigonométrique) et F(x, y) = (−x² + y ; xy + 2x). Calcule le travail ∫Γ F · dl : paramètre Γ, calcule γ′(t), puis l'intégrale en t.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; La vitesse : 0,5 ; Le travail : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  Γ
      = γ = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]   ← La paramétrisation et ses bornes
    — La vitesse :  [juge vector]  départ : γ′(t)
      = γ'(t) = (-2sin(t) ; 2cos(t))   ← On dérive chaque composante
    — Le travail :  [juge definite]  départ : W
      = ∫_{0}^{2π} ((−(2cos(t))² + (2sin(t)))·(−2sin(t)) + ((2cos(t))(2sin(t)) + 2(2cos(t)))·(2cos(t))) dt   ← F(γ(t)) · γ′(t)
      = ∫_{0}^{2π} (−4sin(t)² + 16sin(t)cos(t)² + 8cos(t)²) dt   ← On développe
      = 4π   ← On intègre
  pièges : v_radius_squared, v_orientation_reversed, v_param_bounds

```

## Convexe, étoilé, simplement connexe (`v-domain-topo`, BA3)

_Convexe ⇒ étoilé ⇒ simplement connexe ⇒ connexe ; un segment qui sort, une courbe autour du trou._

### Niveau 1

```
Ω = {(x, y) : x² + y² < 4}. xy1Ω est-il étoilé ?
  ✔ Oui : un point de Ω voit tout Ω (chaque segment vers lui reste dans Ω)   · Non : aucun point de Ω ne voit tout Ω

Ω = {(x, y) : x² + y² < 9}. xy1Ω est-il convexe ?
  ✔ Oui : le segment entre deux points quelconques de Ω reste dans Ω   · Non : un segment entre deux points de Ω sort de Ω

Ω = (]0 ; 3[ × ]0 ; 1[) ∪ (]0 ; 1[ × ]0 ; 3[) (en forme de L). xy1Ω est-il étoilé ?
  ✔ Oui : un point de Ω voit tout Ω (chaque segment vers lui reste dans Ω)   · Non : aucun point de Ω ne voit tout Ω

```

### Niveau 2

```
Ω = {(x, y) : y > x²}. xy1Quelles propriétés a Ω ?
  · Connexe, mais pas convexe, ni étoilé, ni simplement connexe [v_simply_connected_wrong]   · Étoilé, simplement connexe, connexe, mais pas convexe   · Simplement connexe, connexe, mais pas convexe, ni étoilé   ✔ Convexe, étoilé, simplement connexe et connexe
  pièges : v_simply_connected_wrong

Ω = {(x, y) : x² + y² < 4} privé du quart {x ≥ 0, y ≤ 0}. xy1Quelles propriétés a Ω ?
  · Connexe, mais pas convexe, ni étoilé, ni simplement connexe [v_simply_connected_wrong]   ✔ Étoilé, simplement connexe, connexe, mais pas convexe   · Convexe, étoilé, simplement connexe et connexe [v_convex_star_confuse]   · Simplement connexe, connexe, mais pas convexe, ni étoilé
  pièges : v_convex_star_confuse, v_simply_connected_wrong

Ω = {(x, y) : x² + y² > 1}. xy1Quelles propriétés a Ω ?
  · Convexe, étoilé, simplement connexe et connexe   · Étoilé, simplement connexe, connexe, mais pas convexe   · Simplement connexe, connexe, mais pas convexe, ni étoilé [v_simply_connected_wrong]   ✔ Connexe, mais pas convexe, ni étoilé, ni simplement connexe
  pièges : v_simply_connected_wrong

```

### Niveau 3

```
Ω = {(x, y) : y > x²}. Quelles propriétés a Ω ?
  · Étoilé, simplement connexe, connexe, mais pas convexe   · Connexe, mais pas convexe, ni étoilé, ni simplement connexe [v_simply_connected_wrong]   ✔ Convexe, étoilé, simplement connexe et connexe   · Simplement connexe, connexe, mais pas convexe, ni étoilé
  pièges : v_simply_connected_wrong

Ω = ]1 ; 4[ × ]1 ; 3[. Quelles propriétés a Ω ?
  ✔ Convexe, étoilé, simplement connexe et connexe   · Connexe, mais pas convexe, ni étoilé, ni simplement connexe [v_simply_connected_wrong]   · Étoilé, simplement connexe, connexe, mais pas convexe   · Simplement connexe, connexe, mais pas convexe, ni étoilé
  pièges : v_simply_connected_wrong

Ω = {(x, y) : x² + y² < 9} privé du quart {x ≥ 0, y ≤ 0}. Quelles propriétés a Ω ?
  ✔ Étoilé, simplement connexe, connexe, mais pas convexe   · Convexe, étoilé, simplement connexe et connexe [v_convex_star_confuse]   · Connexe, mais pas convexe, ni étoilé, ni simplement connexe [v_simply_connected_wrong]   · Simplement connexe, connexe, mais pas convexe, ni étoilé
  pièges : v_convex_star_confuse, v_simply_connected_wrong

```

### Niveau 4

```
Ω = {(x, y) : x² + y² > 1}. Ω n'est pas simplement connexe. Donne une courbe fermée de Ω qui entoure l'origine : (… ; …), t ∈ [a ; b].
  [exemple vcf] → g = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]

Ω = {(x, y) : 1 < x² + y² < 4}. xy1Ω n'est pas convexe. Donne deux points P et Q de Ω tels que le segment [P ; Q] sorte de Ω.
  [exemple vcf] → P = (-1.5 ; 0), Q = (1.5 ; 0)

Ω = ℝ² \ {(0, 0)}. xy1Ω n'est pas convexe. Donne deux points P et Q de Ω tels que le segment [P ; Q] sorte de Ω.
  [exemple vcf] → P = (-1 ; 0), Q = (1 ; 0)

```

### Niveau 5

```
Soit F(x, y) = (y ; −x)/(x² + y²). On a rot F = 0 là où F est défini. F dérive d'un potentiel sur :
  ✔ le rectangle ]2 ; 5[ × ]1 ; 3[   · le disque {x² + y² < 9}   · ℝ² \ {(0, 0)}, puisque rot F = 0 [v_pot_no_domain]   · la couronne {1 < x² + y² < 9} [v_simply_connected_wrong]
  pièges : v_simply_connected_wrong, v_pot_no_domain

Soit F(x, y) = (y ; −x)/(x² + y²). On a rot F = 0 là où F est défini. F dérive d'un potentiel sur :
  · le disque {x² + y² < 9}   · la couronne {1 < x² + y² < 9} [v_simply_connected_wrong]   ✔ le rectangle ]2 ; 5[ × ]−2 ; 2[   · ℝ² \ {(0, 0)}, puisque rot F = 0 [v_pot_no_domain]
  pièges : v_simply_connected_wrong, v_pot_no_domain

Soit F(x, y) = (y ; −x)/(x² + y²). On a rot F = 0 là où F est défini. F dérive d'un potentiel sur :
  · la couronne {1 < x² + y² < 9} [v_simply_connected_wrong]   ✔ le rectangle ]2 ; 5[ × ]−2 ; 2[   · ℝ² \ {(0, 0)}, puisque rot F = 0 [v_pot_no_domain]   · le disque {x² + y² < 9}
  pièges : v_simply_connected_wrong, v_pot_no_domain

```

### Variantes d'examen

```
Soit F(x, y) = (y ; −x)/(x² + y²). On a rot F = 0 là où F est défini. F dérive d'un potentiel sur :
  · le disque {x² + y² < 9}   · la couronne {1 < x² + y² < 9} [v_simply_connected_wrong]   ✔ le rectangle ]2 ; 5[ × ]−2 ; 2[   · ℝ² \ {(0, 0)}, puisque rot F = 0 [v_pot_no_domain]
  [examen mcq]
  pièges : v_simply_connected_wrong, v_pot_no_domain

```

## Le test rot F = 0 et son domaine (`v-pot-test`, BA3)

_rot F = 0 est nécessaire ; sur un domaine simplement connexe, il suffit ; sinon, il ne dit rien._

### Niveau 1

```
Soit F(x, y, z) = (3z ; 2yz − 3z ; y² + 2x − 3y) sur la boule {x² + y² + z² < 4}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂y (y² + 2x − 3y) − ∂/∂z (2yz − 3z)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). Deux choses à vérifier : rot F = 0, et la forme du domaine.)
    = □ − (□)   (trous : 2y − 3 − (2y − 3))   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (3z) − ∂/∂x (y² + 2x − 3y)
    = □ − □   (trous : 3 − 2)   ← ∂F₁/∂z − ∂F₃/∂x
    = 1   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (2yz − 3z) − ∂/∂y (3z)
    = □ − □   (trous : 0 − 0)   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : la boule {x² + y² + z² &lt; 4}. ✔ la boule {x² + y² + z² &lt; 4} est convexe, donc simplement connexe / · la boule {x² + y² + z² &lt; 4} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / ✔ F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rot F = (0 ; 1 ; 0)   ← rot F ≠ 0 : pas de potentiel, sur aucun domaine
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = (0 ; 1 ; 0) ; Ω est-il convexe ? | la boule {x² + y² + z² < 4} est convexe : F ne dérive pas d'un potentiel sur Ω.
  pièges : v_rot_sign, v_simply_connected_wrong

Soit F(x, y, z) = (2y² − yz ; 4xy − xz − 2yz + 2x ; −xy − y²) sur ℝ³. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂y (−xy − y²) − ∂/∂z (4xy − xz − 2yz + 2x)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). Deux choses à vérifier : rot F = 0, et la forme du domaine.)
    = □ − (□)   (trous : −x − 2y − (−x − 2y))   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2y² − yz) − ∂/∂x (−xy − y²)
    = □ − (□)   (trous : −y − (−y))   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (4xy − xz − 2yz + 2x) − ∂/∂y (2y² − yz)
    = □ − (□)   (trous : 4y − z + 2 − (4y − z))   ← ∂F₂/∂x − ∂F₁/∂y
    = 2   ← On simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : ℝ³. ✔ ℝ³ est convexe, donc simplement connexe / · ℝ³ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / ✔ F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rot F = (0 ; 0 ; 2)   ← rot F ≠ 0 : pas de potentiel, sur aucun domaine
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = (0 ; 0 ; 2) ; Ω est-il convexe ? | ℝ³ est convexe : F ne dérive pas d'un potentiel sur Ω.
  pièges : v_rot_sign, v_simply_connected_wrong

Soit F(x, y, z) = (2yz + y ; 2xz + x ; 2xy + 2z) sur ℝ³. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂y (2xy + 2z) − ∂/∂z (2xz + x)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). Deux choses à vérifier : rot F = 0, et la forme du domaine.)
    = □ − □   (trous : 2x − 2x)   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2yz + y) − ∂/∂x (2xy + 2z)
    = □ − □   (trous : 2y − 2y)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (2xz + x) − ∂/∂y (2yz + y)
    = □ − (□)   (trous : 2z + 1 − (2z + 1))   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : ℝ³. ✔ ℝ³ est convexe, donc simplement connexe / · ℝ³ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? ✔ F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rot F = (0 ; 0 ; 0)   ← rot F = 0 et Ω est simplement connexe : F dérive d'un potentiel
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = (0 ; 0 ; 0) ; Ω est-il convexe ? | ℝ³ est convexe : F dérive d'un potentiel sur Ω.
  pièges : v_rot_sign, v_simply_connected_wrong

```

### Niveau 2

```
Soit F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)) sur la couronne Ω = {1 < x² + y² < 4}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂x ((2x + y)/(x² + y²)) − ∂/∂y ((x − 2y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : la couronne Ω = {1 &lt; x² + y² &lt; 4}. · la couronne Ω = {1 &lt; x² + y² &lt; 4} est convexe, donc simplement connexe / ✔ la couronne Ω = {1 &lt; x² + y² &lt; 4} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0, mais Ω a un trou : le critère ne conclut pas
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | la couronne Ω = {1 < x² + y² < 4} a un trou : Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou).
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_pot_no_domain

Soit F(x, y) = (−y/(x² + y²) ; x/(x² + y²)) sur Ω = {x² + y² > 1}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂x (x/(x² + y²)) − ∂/∂y (−y/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : Ω = {x² + y² > 1}. · {x² + y² > 1} est convexe, donc simplement connexe / ✔ {x² + y² > 1} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0, mais Ω a un trou : le critère ne conclut pas
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | Ω = {x² + y² > 1} a un trou : Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou).
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_pot_no_domain

Soit F(x, y, z) = (−3yz + z ; −3xz + 9y² + z ; −3xy + x) sur ℝ³. Calcule rot F, puis dis ce que le critère permet de conclure.
  [guided]  ∂/∂y (−3xy + x) − ∂/∂z (−3xz + 9y² + z)
    (rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). Deux choses à vérifier : rot F = 0, et la forme du domaine.)
    = □ − (□)   (trous : −3x − (−3x + 1))   ← ∂F₃/∂y − ∂F₂/∂z
    = −1   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−3yz + z) − ∂/∂x (−3xy + x)
    = □ − (□)   (trous : −3y + 1 − (−3y + 1))   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−3xz + 9y² + z) − ∂/∂y (−3yz + z)
    = □ − (□)   (trous : −3z − (−3z))   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : ℝ³. ✔ ℝ³ est convexe, donc simplement connexe / · ℝ³ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / ✔ F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rot F = (-1 ; 0 ; 0)   ← rot F ≠ 0 : pas de potentiel, sur aucun domaine
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = (−1 ; 0 ; 0) ; Ω est-il convexe ? | ℝ³ est convexe : F ne dérive pas d'un potentiel sur Ω.
  pièges : v_rot_sign, v_simply_connected_wrong

```

### Niveau 3

```
Soit F(x, y, z) = (6xy − z² ; 3x² ; −2xz − 6z) sur ℝ³. Calcule rot F, puis dis ce que le critère permet de conclure.
  [tap, suivre l'erreur, menu menu]  ∂/∂y (−2xz − 6z) − ∂/∂z (3x²)
    = 0 − 0   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (6xy − z²) − ∂/∂x (−2xz − 6z)
    = −2z − (−2z)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (3x²) − ∂/∂y (6xy − z²)
    = 6x − 6x   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : ℝ³. ✔ ℝ³ est convexe, donc simplement connexe / · ℝ³ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? ✔ F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rot F = (0 ; 0 ; 0)   ← rot F = 0 et Ω est simplement connexe : F dérive d'un potentiel
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = (0 ; 0 ; 0) ; Ω est-il convexe ? | ℝ³ est convexe : F dérive d'un potentiel sur Ω.
  pièges : v_rot_sign, v_simply_connected_wrong

Soit F(x, y) = (−y/(x² + y²) ; x/(x² + y²)) sur le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[. Calcule rot F, puis dis ce que le critère permet de conclure.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (x/(x² + y²)) − ∂/∂y (−y/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[. ✔ le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ est convexe, donc simplement connexe / · le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? ✔ F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0 et Ω est simplement connexe : F dérive d'un potentiel
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ est convexe : F dérive d'un potentiel sur Ω.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong

Soit F(x, y) = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)) sur le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[. Calcule rot F, puis dis ce que le critère permet de conclure.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((3x + y)/(x² + y²)) − ∂/∂y ((x − 3y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[. ✔ le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ est convexe, donc simplement connexe / · le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? ✔ F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0 et Ω est simplement connexe : F dérive d'un potentiel
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ est convexe : F dérive d'un potentiel sur Ω.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong

```

### Niveau 4

```
Soit F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)) sur Ω = ℝ² \ {(0, 0)}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [free, suivre l'erreur]  ∂/∂x ((2x + y)/(x² + y²)) − ∂/∂y ((x − 2y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : Ω = ℝ² \ {(0, 0)}. · ℝ² \ {(0, 0)} est convexe, donc simplement connexe / ✔ ℝ² \ {(0, 0)} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0, mais Ω a un trou : le critère ne conclut pas
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | Ω = ℝ² \ {(0, 0)} a un trou : Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou).
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_pot_no_domain

Soit F(x, y) = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)) sur le demi-plan Ω = {x > 0}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [free, suivre l'erreur]  ∂/∂x ((3x + y)/(x² + y²)) − ∂/∂y ((x − 3y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : le demi-plan Ω = {x > 0}. ✔ le demi-plan Ω = {x > 0} est convexe, donc simplement connexe / · le demi-plan Ω = {x > 0} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? ✔ F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0 et Ω est simplement connexe : F dérive d'un potentiel
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | le demi-plan Ω = {x > 0} est convexe : F dérive d'un potentiel sur Ω.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong

Soit F(x, y) = (−y/(x² + y²) ; x/(x² + y²)) sur la couronne Ω = {1 < x² + y² < 4}. Calcule rot F, puis dis ce que le critère permet de conclure.
  [free, suivre l'erreur]  ∂/∂x (x/(x² + y²)) − ∂/∂y (−y/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie
  — Conclusion :  [juge vector]  départ : rotF
    ? Le domaine : la couronne Ω = {1 &lt; x² + y² &lt; 4}. · la couronne Ω = {1 &lt; x² + y² &lt; 4} est convexe, donc simplement connexe / ✔ la couronne Ω = {1 &lt; x² + y² &lt; 4} n'est pas simplement connexe : il y a un trou
    ? Que dit le critère « rot F = 0 sur un domaine simplement connexe » ? · F dérive d'un potentiel sur Ω / · F ne dérive pas d'un potentiel sur Ω / ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
    = rotF = 0   ← rot F = 0, mais Ω a un trou : le critère ne conclut pas
  aides : Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?). | rot F = ∂F₂/∂x − ∂F₁/∂y = 0 ; Ω est-il convexe ? | la couronne Ω = {1 < x² + y² < 4} a un trou : Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou).
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_pot_no_domain

```

### Niveau 5

```
Pour chaque champ et son domaine, que permet de conclure le critère « rot F = 0 sur un domaine simplement connexe » ?
  [problème, 3 points]
  partie 1 (Champ 1 : 1)
  F = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)) sur Ω = ℝ² \ {(0, 0)} (rot F = 0 là où F est défini).
    ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · F dérive d'un potentiel sur Ω [v_pot_no_domain]   · F ne dérive pas d'un potentiel sur Ω   · Il faut d'abord trouver φ pour conclure
  partie 2 (Champ 2 : 1)
  F = (2xy + 6xz − 2z ; x² ; 3x² − x) sur le demi-espace {z > 0}.
    ✔ F ne dérive pas d'un potentiel sur Ω   · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · Il faut d'abord trouver φ pour conclure   · F dérive d'un potentiel sur Ω
  partie 3 (Champ 3 : 1)
  F = (y ; z² + x − z ; 2yz − y) sur ℝ³.
    · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · Il faut d'abord trouver φ pour conclure   ✔ F dérive d'un potentiel sur Ω   · F ne dérive pas d'un potentiel sur Ω
  pièges : v_pot_no_domain

Pour chaque champ et son domaine, que permet de conclure le critère « rot F = 0 sur un domaine simplement connexe » ?
  [problème, 3 points]
  partie 1 (Champ 1 : 1)
  F = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)) sur le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ (rot F = 0 là où F est défini).
    · Il faut d'abord trouver φ pour conclure   · F ne dérive pas d'un potentiel sur Ω   ✔ F dérive d'un potentiel sur Ω   · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
  partie 2 (Champ 2 : 1)
  F = ((x − y)/(x² + y²) ; (x + y)/(x² + y²)) sur Ω = {x² + y² > 1} (rot F = 0 là où F est défini).
    · Il faut d'abord trouver φ pour conclure   ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · F ne dérive pas d'un potentiel sur Ω   · F dérive d'un potentiel sur Ω [v_pot_no_domain]
  partie 3 (Champ 3 : 1)
  F = (4xy − y² + y ; 2x² − 2xy ; 4z) sur ℝ³.
    · F dérive d'un potentiel sur Ω   ✔ F ne dérive pas d'un potentiel sur Ω   · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · Il faut d'abord trouver φ pour conclure
  pièges : v_pot_no_domain

Pour chaque champ et son domaine, que permet de conclure le critère « rot F = 0 sur un domaine simplement connexe » ?
  [problème, 3 points]
  partie 1 (Champ 1 : 1)
  F = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)) sur Ω = ℝ² \ {(0, 0)} (rot F = 0 là où F est défini).
    · Il faut d'abord trouver φ pour conclure   · F ne dérive pas d'un potentiel sur Ω   · F dérive d'un potentiel sur Ω [v_pot_no_domain]   ✔ Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)
  partie 2 (Champ 2 : 1)
  F = (−y/(x² + y²) ; x/(x² + y²)) sur le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[ (rot F = 0 là où F est défini).
    ✔ F dérive d'un potentiel sur Ω   · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · Il faut d'abord trouver φ pour conclure   · F ne dérive pas d'un potentiel sur Ω
  partie 3 (Champ 3 : 1)
  F = (6xy + 4xz ; 3x² − 4yz ; 2x² − 2y² + x) sur ℝ³.
    · F dérive d'un potentiel sur Ω   · Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)   · Il faut d'abord trouver φ pour conclure   ✔ F ne dérive pas d'un potentiel sur Ω
  pièges : v_pot_no_domain

```

### Variantes d'examen

```
Le champ F(x, y) = (3y ; 1/y) sur Ω = {(x, y) : y > 0} dérive-t-il d'un potentiel ?
  ✔ Non : rot F = −3 ≠ 0   · On ne peut pas savoir : F n'est pas défini sur tout ℝ²   · Oui, car chaque composante a une primitive   · Oui : rot F = 0 et Ω est convexe
  [examen mcq]

```

## Trouver un potentiel pas à pas (`v-pot-find`, BA3)

_φ = ∫F₁ dx + α(y, z), puis comparer à F₂ et F₃ ; une seule constante, fixée par φ(P)._

### Niveau 1

```
Soit F(x, y, z) = (−6xy − 1 ; −3x² + 5z² ; 10yz − 1) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    = φ=□+α(y,z)   (trous : φ = -3x^2y-x + α(y, z))   ← ∫ F₁ dx = <math alttext="−3x²y − x"><mrow><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mi>x</mi></mrow></math> : la « constante » dépend de y et z
    = φ = −3x²y + □ − x + β(z)   (trous : φ = −3x²y + 5yz² − x + β(z))   ← ∂φ/∂y = <math alttext="−3x²"><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="5z²"><mrow><mn>5</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math>
    = φ = −3x²y + 5yz² − x□ + C   (trous : φ = −3x²y + 5yz² − x − z + C)   ← ∂φ/∂z = <math alttext="10yz"><mrow><mrow><mn>10</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="−1"><mrow><mo>−</mo><mn>1</mn></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = −3x²y − x + α(y,z) | φ = −3x²y + 5yz² − x + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

Soit F(x, y, z) = (−z² ; z² ; −2xz + 2yz − 6z² + 5) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    = φ=□+α(y,z)   (trous : φ = -xz^2 + α(y, z))   ← ∫ F₁ dx = <math alttext="−xz²"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math> : la « constante » dépend de y et z
    = φ = −xz² + □ + β(z)   (trous : φ = −xz² + yz² + β(z))   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="z²"><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></math>
    = φ = −xz² + yz²□ + C   (trous : φ = −xz² + yz² − 2z³ + 5z + C)   ← ∂φ/∂z = <math alttext="−2xz + 2yz"><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="−6z² + 5"><mrow><mrow><mrow><mo>−</mo><mn>6</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mn>5</mn></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = −xz² + α(y,z) | φ = −xz² + yz² + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y, z) = (4z² ; −2yz − 3z ; 8xz − y² − 3z² − 3y) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    = φ=□+α(y,z)   (trous : φ = 4xz^2 + α(y, z))   ← ∫ F₁ dx = <math alttext="4xz²"><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math> : la « constante » dépend de y et z
    = φ = 4xz²□ + β(z)   (trous : φ = 4xz² − y²z − 3yz + β(z))   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="−2yz − 3z"><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math>
    = φ = 4xz² − y²z□ − 3yz + C   (trous : φ = 4xz² − y²z − z³ − 3yz + C)   ← ∂φ/∂z = <math alttext="8xz − y² − 3y"><mrow><mrow><mrow><mrow><mn>8</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="−3z²"><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 4xz² + α(y,z) | φ = 4xz² − y²z − 3yz + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

```

### Niveau 2

```
Soit F(x, y, z) = (3z² + 4y + 2 ; 4x ; 6xz + 6z) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    ? Par quelle variable commences-tu ? ✔ Intégrer F₁ en x / ✔ Intégrer F₂ en y / · Intégrer les trois composantes et additionner
    = φ=□+α(y,z)   (trous : φ = 3xz^2+4xy+2x + α(y, z))   ← ∫ F₁ dx = <math alttext="3xz² + 4xy + 2x"><mrow><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow></math> : la « constante » dépend de y et z
    = φ = 3xz² + 4xy + 2x + β(z)   ← ∂φ/∂y = <math alttext="4x"><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="0"><mn>0</mn></math>
    = φ = 3xz² + 4xy + □ + 2x + C   (trous : φ = 3xz² + 4xy + 3z² + 2x + C)   ← ∂φ/∂z = <math alttext="6xz"><mrow><mrow><mn>6</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="6z"><mrow><mn>6</mn><mo>&#x2062;</mo><mi>z</mi></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 3xz² + 4xy + 2x + α(y,z) | φ = 3xz² + 4xy + 2x + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y, z) = (2z ; 3y² ; 2x + 1) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    ? Par quelle variable commences-tu ? ✔ Intégrer F₁ en x / ✔ Intégrer F₂ en y / · Intégrer les trois composantes et additionner
    = φ=□+α(y,z)   (trous : φ = 2xz + α(y, z))   ← ∫ F₁ dx = <math alttext="2xz"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> : la « constante » dépend de y et z
    = φ = □ + 2xz + β(z)   (trous : φ = y³ + 2xz + β(z))   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="3y²"><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math>
    = φ = y³ + 2x□ + z + C   (trous : φ = y³ + 2xz + z + C)   ← ∂φ/∂z = <math alttext="2x"><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="1"><mn>1</mn></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 2xz + α(y,z) | φ = y³ + 2xz + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y, z) = (6x² ; 4y − z ; −y) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [guided]  φ
    ? Par quelle variable commences-tu ? ✔ Intégrer F₁ en x / ✔ Intégrer F₂ en y / · Intégrer les trois composantes et additionner
    = φ=□+α(y,z)   (trous : φ = 2x^3 + α(y, z))   ← ∫ F₁ dx = <math alttext="2x³"><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow></math> : la « constante » dépend de y et z
    = φ = 2x³ + □ + β(z)   (trous : φ = 2x³ + 2y² − yz + β(z))   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="4y − z"><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>−</mo><mi>z</mi></mrow></math>
    = φ = 2x³ + 2y² − yz + C   ← ∂φ/∂z = <math alttext="−y"><mrow><mo>−</mo><mi>y</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 2x³ + α(y,z) | φ = 2x³ + 2y² − yz + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

```

### Niveau 3

```
Soit F(x, y, z) = (z² − ye^(xy) ; 9y² − 4yz − xe^(xy) ; 2xz − 2y²) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [tap, suivre l'erreur, menu menu]  φ
    = φ = xz^2-e^(xy) + α(y, z)   ← ∫ F₁ dx = <math alttext="xz² − e^(xy)"><mrow><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></math> : la « constante » dépend de y et z
    = φ = xz² + 3y³ − 2y²z − e^(xy) + β(z)   ← ∂φ/∂y = <math alttext="−xe^(xy)"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="9y² − 4yz"><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math>
    = φ = xz² + 3y³ − 2y²z − e^(xy) + C   ← ∂φ/∂z = <math alttext="2xz − 2y²"><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = xz² − e^(xy) + α(y,z) | φ = xz² + 3y³ − 2y²z − e^(xy) + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y, z) = (8xy ; 4x² − 2z² + 3z ; −4yz + 3y) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [tap, suivre l'erreur, menu menu]  φ
    = φ = 4x^2y + α(y, z)   ← ∫ F₁ dx = <math alttext="4x²y"><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></math> : la « constante » dépend de y et z
    = φ = 4x²y − 2yz² + 3yz + β(z)   ← ∂φ/∂y = <math alttext="4x²"><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="−2z² + 3z"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math>
    = φ = 4x²y − 2yz² + 3yz + C   ← ∂φ/∂z = <math alttext="−4yz + 3y"><mrow><mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 4x²y + α(y,z) | φ = 4x²y − 2yz² + 3yz + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

Soit F(x, y) = (6x² + 5 + 2ye^(xy) ; 2y + 2xe^(xy)) sur ℝ² (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [tap, suivre l'erreur, menu menu]  φ
    = φ = 2x³ + 5x + 2e^(xy) + α(y)   ← ∫ F₁ dx = <math alttext="2x³ + 5x + 2e^(xy)"><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></mrow></math> : la « constante » dépend de y
    = φ = 2x³ + y² + 5x + 2e^(xy) + C   ← ∂φ/∂y = <math alttext="2xe^(xy)"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></math> + α′(y) doit valoir F₂ : α′(y) = <math alttext="2y"><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y : α(y). Puis dérive en y et compare à F₂. | φ = 2x³ + 5x + 2e^(xy) + α(y) | φ = 2x³ + y² + 5x + 2e^(xy) + C
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

```

### Niveau 4

```
Soit F(x, y, z) = (3y + 4 + 2zcos(xz) ; 3x + z ; 12z² + y + 2xcos(xz)) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ.
  [free, suivre l'erreur]  φ
    = φ = 3xy+4x+2sin(xz) + α(y, z)   ← ∫ F₁ dx = <math alttext="3xy + 4x + 2sin(xz)"><mrow><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>x</mi><mo>&#x2062;</mo><mi>z</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> : la « constante » dépend de y et z
    = φ = 3xy + yz + 4x + 2sin(xz) + β(z)   ← ∂φ/∂y = <math alttext="3x"><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="z"><mi>z</mi></math>
    = φ = 4z³ + 3xy + yz + 4x + 2sin(xz) + C   ← ∂φ/∂z = <math alttext="y + 2xcos(xz)"><mrow><mi>y</mi><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>x</mi><mo>&#x2062;</mo><mi>z</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="12z²"><mrow><mn>12</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math>
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 3xy + 4x + 2sin(xz) + α(y,z) | φ = 3xy + yz + 4x + 2sin(xz) + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y) = (−y + 1 + 2ye^(xy) ; −3y² − x + 2xe^(xy)) sur ℝ² (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(0 ; 2) = 0.
  [free, suivre l'erreur]  φ
    = φ = −xy + x + 2e^(xy) + α(y)   ← ∫ F₁ dx = <math alttext="−xy + x + 2e^(xy)"><mrow><mrow><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></mrow></math> : la « constante » dépend de y
    = φ = −y³ − xy + x + 2e^(xy) + C   ← ∂φ/∂y = <math alttext="−x + 2xe^(xy)"><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></mrow></math> + α′(y) doit valoir F₂ : α′(y) = <math alttext="−3y²"><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math>
    = C = 6   ← φ(0 ; 2) = −6 + C doit valoir 0
    = φ = −y³ − xy + x + 6 + 2e^(xy)   ← Le potentiel demandé
  aides : Intègre F₁ en x ; la « constante » dépend de y : α(y). Puis dérive en y et compare à F₂. | φ = −xy + x + 2e^(xy) + α(y) | φ = −y³ − xy + x + 2e^(xy) + C
  pièges : v_pot_const_fn, v_pot_double_count, v_potential_sign

Soit F(x, y, z) = (4xy + 1 − ye^(xy) ; 2x² − xe^(xy) ; 3) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(−1 ; 0 ; −2) = 0.
  [free, suivre l'erreur]  φ
    = φ = 2x^2y+x-e^(xy) + α(y, z)   ← ∫ F₁ dx = <math alttext="2x²y + x − e^(xy)"><mrow><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mi>x</mi></mrow><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></math> : la « constante » dépend de y et z
    = φ = 2x²y + x − e^(xy) + β(z)   ← ∂φ/∂y = <math alttext="2x² − xe^(xy)"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="0"><mn>0</mn></math>
    = φ = 2x²y + x + 3z − e^(xy) + C   ← ∂φ/∂z = <math alttext="0"><mn>0</mn></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="3"><mn>3</mn></math>
    = C = 8   ← φ(−1 ; 0 ; −2) = −8 + C doit valoir 0
    = φ = 2x²y + x + 3z + 8 − e^(xy)   ← Le potentiel demandé
  aides : Intègre F₁ en x ; la « constante » dépend de y et z : α(y, z). Puis dérive en y et compare à F₂. | φ = 2x²y + x − e^(xy) + α(y,z) | φ = 2x²y + x − e^(xy) + β(z)
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

```

### Niveau 5

```
Soit F(x, y) = (−3x² + y² ; 2xy + 9y² − 6y) sur ℝ² (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(3 ; −1) = 0. Puis calcule ∫Γ F · dl, où Γ est la courbe γ(t) = (t ; 2t³), t ∈ [0 ; 1].
  [free, sans aide]  φ
    = φ = −x³ + xy² + α(y)   ← ∫ F₁ dx = <math alttext="−x³ + xy²"><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup></mrow><mo>+</mo><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow></math> : la « constante » dépend de y
    = φ = −x³ + xy² + 3y³ − 3y² + C   ← ∂φ/∂y = <math alttext="2xy"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></math> + α′(y) doit valoir F₂ : α′(y) = <math alttext="9y² − 6y"><mrow><mrow><mn>9</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>−</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>
    = C = 30   ← φ(3 ; −1) = −30 + C doit valoir 0
    = φ = −x³ + xy² + 3y³ − 3y² + 30   ← Le potentiel demandé
  — Le travail le long de Γ :  [juge definite]  départ : W
    ? Comment calcules-tu ce travail ? ✔ Avec le potentiel : φ(B) − φ(A) / ✔ En paramétrant Γ
    = (15) − (0)   ← φ(B) − φ(A), B = (1 ; 2), A = (0 ; 0) (la constante s'en va)
    = 15   ← Le travail
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

Soit F(x, y, z) = (−2x + 1 ; 12y² + 8yz ; 4y²) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(2 ; −1 ; −2) = 0. Puis calcule ∫Γ F · dl, où Γ est la courbe γ(t) = (t ; 2t³ ; t⁹), t ∈ [0 ; 1].
  [free, sans aide]  φ
    = φ = -x^2+x + α(y, z)   ← ∫ F₁ dx = <math alttext="−x² + x"><mrow><mrow><mo>−</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mi>x</mi></mrow></math> : la « constante » dépend de y et z
    = φ = 4y³ + 4y²z − x² + x + β(z)   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="12y² + 8yz"><mrow><mrow><mn>12</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mrow><mn>8</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math>
    = φ = 4y³ + 4y²z − x² + x + C   ← ∂φ/∂z = <math alttext="4y²"><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
    = C = 14   ← φ(2 ; −1 ; −2) = −14 + C doit valoir 0
    = φ = 4y³ + 4y²z − x² + x + 14   ← Le potentiel demandé
  — Le travail le long de Γ :  [juge definite]  départ : W
    ? Comment calcules-tu ce travail ? ✔ Avec le potentiel : φ(B) − φ(A) / ✔ En paramétrant Γ
    = (48) − (0)   ← φ(B) − φ(A), B = (1 ; 2 ; 1), A = (0 ; 0 ; 0) (la constante s'en va)
    = 48   ← Le travail
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

Soit F(x, y, z) = (3x² + 4xy ; 2x² + 2yz + 8y ; y²) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(−1 ; −2 ; 2) = 0. Puis calcule ∫Γ F · dl, où Γ est la courbe γ(t) = (t ; 2t³ ; t⁹), t ∈ [0 ; 1].
  [free, sans aide]  φ
    = φ = x^3+2x^2y + α(y, z)   ← ∫ F₁ dx = <math alttext="x³ + 2x²y"><mrow><msup><mrow><mi>x</mi></mrow><mn>3</mn></msup><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math> : la « constante » dépend de y et z
    = φ = x³ + 2x²y + y²z + 4y² + β(z)   ← ∂φ/∂y = <math alttext="2x²"><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="2yz + 8y"><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mn>8</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>
    = φ = x³ + 2x²y + y²z + 4y² + C   ← ∂φ/∂z = <math alttext="y²"><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
    = C = −19   ← φ(−1 ; −2 ; 2) = 19 + C doit valoir 0
    = φ = x³ + 2x²y + y²z + 4y² − 19   ← Le potentiel demandé
  — Le travail le long de Γ :  [juge definite]  départ : W
    ? Comment calcules-tu ce travail ? ✔ Avec le potentiel : φ(B) − φ(A) / ✔ En paramétrant Γ
    = (25) − (0)   ← φ(B) − φ(A), B = (1 ; 2 ; 1), A = (0 ; 0 ; 0) (la constante s'en va)
    = 25   ← Le travail
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

```

### Variantes d'examen

```
Soit F(x, y, z) = (−6x² + 2xy ; x² − z² + 3z ; −2yz + 3y). Une fonction potentiel de F (F = ∇φ) est :
  · φ = −2x³ + x²y [v_pot_const_fn]   · φ = −2x³ + 2x²y − 2yz² + 6yz [v_pot_double_count]   ✔ φ = −2x³ + x²y − yz² + 3yz   · φ = 2x³ − x²y + yz² − 3yz [v_potential_sign]
  [examen mcq]
  pièges : v_pot_double_count, v_pot_const_fn, v_potential_sign

Soit F(x, y, z) = (−z² + 4x + 2ye^(xy) ; 6y + 2xe^(xy) ; −2xz) sur ℝ³ (convexe, et rot F = 0). Trouve φ telle que F = ∇φ et φ(0 ; 3 ; 0) = 0.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  φ
      = φ = -xz^2+2x^2+2e^(xy) + α(y, z)   ← ∫ F₁ dx = <math alttext="−xz² + 2x² + 2e^(xy)"><mrow><mrow><mrow><mrow><mo>−</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></mrow></math> : la « constante » dépend de y et z
      = φ = −xz² + 2x² + 3y² + 2e^(xy) + β(z)   ← ∂φ/∂y = <math alttext="2xe^(xy)"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></msup></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="6y"><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></math>
      = φ = −xz² + 2x² + 3y² + 2e^(xy) + C   ← ∂φ/∂z = <math alttext="−2xz"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
      = C = −29   ← φ(0 ; 3 ; 0) = 29 + C doit valoir 0
      = φ = −xz² + 2x² + 3y² − 29 + 2e^(xy)   ← Le potentiel demandé
  pièges : v_pot_const_fn, v_pot_double_count, v_pot_poly_integral, v_potential_sign

```

## Potentiel avec un paramètre λ (`v-pot-lambda`, BA3)

_rot F = 0 donne une équation par composante, vraie en tout point : on garde les λ qui les vérifient toutes._

### Niveau 1

```
Soit F(x, y, z) = (12x² + 2xy + (λ − 1)yz ; (λ − 2)x² + 2xz − 4y ; 2xy) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y (2xy) − ∂/∂z ((λ − 2)x² + 2xz − 4y)
    = □ − (□)   (trous : 2x − (2x))   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (12x² + 2xy + (λ − 1)yz) − ∂/∂x (2xy)
    = □ − (□)   (trous : (λ − 1)y − (2y))   ← ∂F₁/∂z − ∂F₃/∂x
    = (λ − 3)y   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((λ − 2)x² + 2xz − 4y) − ∂/∂y (12x² + 2xy + (λ − 1)yz)
    = □ − (□)   (trous : (2λ − 4)x + 2z − (2x + (λ − 1)z))   ← ∂F₂/∂x − ∂F₁/∂y
    = (2λ − 6)x + (3 − λ)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ − 3 = 0 et 2λ − 6 = 0
    = λ = □   (trous : λ = 3)   ← ℝ³ est convexe : pour λ = 3, F dérive d'un potentiel ; pour λ ≠ 3, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₂ = (λ − 3)y | λ − 3 = 0 et 2λ − 6 = 0 : λ = 3
  pièges : v_rot_sign

Soit F(x, y, z) = (−6x² − 2z² − 3z ; (2λ − 2)z² ; −4xz + 8yz + (λ − 6)x) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y (−4xz + 8yz + (λ − 6)x) − ∂/∂z ((2λ − 2)z²)
    = □ − (□)   (trous : 8z − ((4λ − 4)z))   ← ∂F₃/∂y − ∂F₂/∂z
    = (12 − 4λ)z   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−6x² − 2z² − 3z) − ∂/∂x (−4xz + 8yz + (λ − 6)x)
    = □ − (□)   (trous : −4z − 3 − (−4z + (λ − 6)))   ← ∂F₁/∂z − ∂F₃/∂x
    = (3 − λ)   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((2λ − 2)z²) − ∂/∂y (−6x² − 2z² − 3z)
    = □ − (□)   (trous : 0 − (0))   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −4λ + 12 = 0 et −λ + 3 = 0
    = λ = □   (trous : λ = 3)   ← ℝ³ est convexe : pour λ = 3, F dérive d'un potentiel ; pour λ ≠ 3, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (12 − 4λ)z | −4λ + 12 = 0 et −λ + 3 = 0 : λ = 3
  pièges : v_rot_sign

Soit F(x, y, z) = (6x² + (λ − 4)yz ; −xz ; −xy − 3) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y (−xy − 3) − ∂/∂z (−xz)
    = □ − (□)   (trous : −x − (−x))   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (6x² + (λ − 4)yz) − ∂/∂x (−xy − 3)
    = □ − (□)   (trous : (λ − 4)y − (−y))   ← ∂F₁/∂z − ∂F₃/∂x
    = (λ − 3)y   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−xz) − ∂/∂y (6x² + (λ − 4)yz)
    = □ − (□)   (trous : −z − ((λ − 4)z))   ← ∂F₂/∂x − ∂F₁/∂y
    = (3 − λ)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ − 3 = 0 et −λ + 3 = 0
    = λ = □   (trous : λ = 3)   ← ℝ³ est convexe : pour λ = 3, F dérive d'un potentiel ; pour λ ≠ 3, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₂ = (λ − 3)y | λ − 3 = 0 et −λ + 3 = 0 : λ = 3
  pièges : v_rot_sign

```

### Niveau 2

```
Soit F(x, y, z) = (6xz − 6x ; (2λ − 1)z ; (4 − λ)x² + y − 2z) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y ((4 − λ)x² + y − 2z) − ∂/∂z ((2λ − 1)z)
    = □ − (□)   (trous : 1 − ((2λ − 1)))   ← ∂F₃/∂y − ∂F₂/∂z
    = (2 − 2λ)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (6xz − 6x) − ∂/∂x ((4 − λ)x² + y − 2z)
    = □ − (□)   (trous : 6x − ((8 − 2λ)x))   ← ∂F₁/∂z − ∂F₃/∂x
    = (2λ − 2)x   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((2λ − 1)z) − ∂/∂y (6xz − 6x)
    = □ − (□)   (trous : 0 − (0))   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −2λ + 2 = 0 et 2λ − 2 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = □   (trous : λ = 1)   ← ℝ³ est convexe : pour λ = 1, F dérive d'un potentiel ; pour λ ≠ 1, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (2 − 2λ) | −2λ + 2 = 0 et 2λ − 2 = 0 : λ = 1
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = ((λ − 5)xy − 6xz ; −2x² + (−1 − λ)z ; −3x² − 2y) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y (−3x² − 2y) − ∂/∂z (−2x² + (−1 − λ)z)
    = □ − (□)   (trous : −2 − ((−1 − λ)))   ← ∂F₃/∂y − ∂F₂/∂z
    = (λ − 1)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z ((λ − 5)xy − 6xz) − ∂/∂x (−3x² − 2y)
    = □ − (□)   (trous : −6x − (−6x))   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (−2x² + (−1 − λ)z) − ∂/∂y ((λ − 5)xy − 6xz)
    = □ − (□)   (trous : −4x − ((λ − 5)x))   ← ∂F₂/∂x − ∂F₁/∂y
    = (1 − λ)x   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ − 1 = 0 et −λ + 1 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = □   (trous : λ = 1)   ← ℝ³ est convexe : pour λ = 1, F dérive d'un potentiel ; pour λ ≠ 1, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (λ − 1) | λ − 1 = 0 et −λ + 1 = 0 : λ = 1
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = (−9x² + (2λ + 5)yz ; xz − 6y² ; xy + 5) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [guided]  ∂/∂y (xy + 5) − ∂/∂z (xz − 6y²)
    = □ − (□)   (trous : x − (x))   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−9x² + (2λ + 5)yz) − ∂/∂x (xy + 5)
    = □ − (□)   (trous : (2λ + 5)y − (y))   ← ∂F₁/∂z − ∂F₃/∂x
    = (2λ + 4)y   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (xz − 6y²) − ∂/∂y (−9x² + (2λ + 5)yz)
    = □ − (□)   (trous : z − ((2λ + 5)z))   ← ∂F₂/∂x − ∂F₁/∂y
    = (−4 − 2λ)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : 2λ + 4 = 0 et −2λ − 4 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = □   (trous : λ = −2)   ← ℝ³ est convexe : pour λ = −2, F dérive d'un potentiel ; pour λ ≠ −2, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₂ = (2λ + 4)y | 2λ + 4 = 0 et −2λ − 4 = 0 : λ = −2
  pièges : v_rot_sign, v_rot_scalar_sum

```

### Niveau 3

```
Soit F(x, y, z) = (−6xy + (4 − λ)xz ; (2λ − 7)x² − 2y ; x² − 3) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [tap, suivre l'erreur, menu menu]  ∂/∂y (x² − 3) − ∂/∂z ((2λ − 7)x² − 2y)
    = 0 − (0)   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−6xy + (4 − λ)xz) − ∂/∂x (x² − 3)
    = (4 − λ)x − (2x)   ← ∂F₁/∂z − ∂F₃/∂x
    = (2 − λ)x   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((2λ − 7)x² − 2y) − ∂/∂y (−6xy + (4 − λ)xz)
    = (4λ − 14)x − (−6x)   ← ∂F₂/∂x − ∂F₁/∂y
    = (4λ − 8)x   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −λ + 2 = 0 et 4λ − 8 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = 2   ← ℝ³ est convexe : pour λ = 2, F dérive d'un potentiel ; pour λ ≠ 2, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₂ = (2 − λ)x | −λ + 2 = 0 et 4λ − 8 = 0 : λ = 2
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = ((−5 − λ)xz − yz ; (2λ + 1)xz ; −2x² − xy + 8z) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [tap, suivre l'erreur, menu menu]  ∂/∂y (−2x² − xy + 8z) − ∂/∂z ((2λ + 1)xz)
    = −x − ((2λ + 1)x)   ← ∂F₃/∂y − ∂F₂/∂z
    = (−2 − 2λ)x   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z ((−5 − λ)xz − yz) − ∂/∂x (−2x² − xy + 8z)
    = (−5 − λ)x − y − (−4x − y)   ← ∂F₁/∂z − ∂F₃/∂x
    = (−1 − λ)x   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((2λ + 1)xz) − ∂/∂y ((−5 − λ)xz − yz)
    = (2λ + 1)z − (−z)   ← ∂F₂/∂x − ∂F₁/∂y
    = (2λ + 2)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −2λ − 2 = 0 et −λ − 1 = 0 et 2λ + 2 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = −1   ← ℝ³ est convexe : pour λ = −1, F dérive d'un potentiel ; pour λ ≠ −1, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (−2 − 2λ)x | −2λ − 2 = 0 et −λ − 1 = 0 et 2λ + 2 = 0 : λ = −1
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = (−6xz + (2λ − 2)yz ; 2xz + 2z ; (λ − 5)x² + 2xy + 2y) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [tap, suivre l'erreur, menu menu]  ∂/∂y ((λ − 5)x² + 2xy + 2y) − ∂/∂z (2xz + 2z)
    = 2x + 2 − (2x + 2)   ← ∂F₃/∂y − ∂F₂/∂z
    = 0   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−6xz + (2λ − 2)yz) − ∂/∂x ((λ − 5)x² + 2xy + 2y)
    = −6x + (2λ − 2)y − ((2λ − 10)x + 2y)   ← ∂F₁/∂z − ∂F₃/∂x
    = (4 − 2λ)x + (2λ − 4)y   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (2xz + 2z) − ∂/∂y (−6xz + (2λ − 2)yz)
    = 2z − ((2λ − 2)z)   ← ∂F₂/∂x − ∂F₁/∂y
    = (4 − 2λ)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −2λ + 4 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = 2   ← ℝ³ est convexe : pour λ = 2, F dérive d'un potentiel ; pour λ ≠ 2, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₂ = (4 − 2λ)x + (2λ − 4)y | −2λ + 4 = 0 : λ = 2
  pièges : v_rot_sign, v_rot_scalar_sum

```

### Niveau 4

```
Soit F(x, y, z) = (−2y + 5 ; (λ − 1)x + 5z ; (λ + 6)y + 4z) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [free, suivre l'erreur]  ∂/∂y ((λ + 6)y + 4z) − ∂/∂z ((λ − 1)x + 5z)
    = (λ + 6) − (5)   ← ∂F₃/∂y − ∂F₂/∂z
    = (λ + 1)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−2y + 5) − ∂/∂x ((λ + 6)y + 4z)
    = 0 − (0)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((λ − 1)x + 5z) − ∂/∂y (−2y + 5)
    = (λ − 1) − (−2)   ← ∂F₂/∂x − ∂F₁/∂y
    = (λ + 1)   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ + 1 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = −1   ← ℝ³ est convexe : pour λ = −1, F dérive d'un potentiel ; pour λ ≠ −1, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (λ + 1) | λ + 1 = 0 : λ = −1
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = ((λ − 9)xz ; 10y + (λ + 2)z + 3 ; −3x² + 5y) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ? Pour cette valeur, trouve φ telle que F = ∇φ.
  [free, suivre l'erreur]  ∂/∂y (−3x² + 5y) − ∂/∂z (10y + (λ + 2)z + 3)
    = 5 − ((λ + 2))   ← ∂F₃/∂y − ∂F₂/∂z
    = (3 − λ)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z ((λ − 9)xz) − ∂/∂x (−3x² + 5y)
    = (λ − 9)x − (−6x)   ← ∂F₁/∂z − ∂F₃/∂x
    = (λ − 3)x   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (10y + (λ + 2)z + 3) − ∂/∂y ((λ − 9)xz)
    = 0 − (0)   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −λ + 3 = 0 et λ − 3 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = 3   ← ℝ³ est convexe : pour λ = 3, F dérive d'un potentiel ; pour λ ≠ 3, rot F ≠ 0 et non
  — Pour λ = 3, trouve φ :  [juge antideriv]  départ : φ
    = φ = -3x^2z + α(y, z)   ← ∫ F₁ dx = <math alttext="−3x²z"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> : la « constante » dépend de y et z
    = φ = −3x²z + 5y² + 5yz + 3y + β(z)   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="10y + 5z + 3"><mrow><mrow><mrow><mn>10</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>z</mi></mrow></mrow><mo>+</mo><mn>3</mn></mrow></math>
    = φ = −3x²z + 5y² + 5yz + 3y + C   ← ∂φ/∂z = <math alttext="−3x² + 5y"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (3 − λ) | −λ + 3 = 0 et λ − 3 = 0 : λ = 3
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = (−9x² + 8xy − 4x ; (λ + 6)x² − 2z ; λy) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ?
  [free, suivre l'erreur]  ∂/∂y (λy) − ∂/∂z ((λ + 6)x² − 2z)
    = (λ + 2)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−9x² + 8xy − 4x) − ∂/∂x (λy)
    = 0 − (0)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((λ + 6)x² − 2z) − ∂/∂y (−9x² + 8xy − 4x)
    = (2λ + 12)x − (8x)   ← ∂F₂/∂x − ∂F₁/∂y
    = (2λ + 4)x   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ + 2 = 0 et 2λ + 4 = 0
    ? Comment écris-tu rot F = 0 ? ✔ Chaque composante de rot F est nulle, pour tout (x, y, z) / · La somme des composantes de rot F est nulle
    = λ = −2   ← ℝ³ est convexe : pour λ = −2, F dérive d'un potentiel ; pour λ ≠ −2, rot F ≠ 0 et non
  aides : rot F = 0 veut dire trois équations, vraies en tout point : une par composante. | (rot F)₁ = (λ + 2) | λ + 2 = 0 et 2λ + 4 = 0 : λ = −2
  pièges : v_rot_sign, v_rot_scalar_sum

```

### Niveau 5

```
Soit F(x, y, z) = (2y² ; (7 − λ)xy − 3z ; (2λ − 9)y + 2z) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ? Pour cette valeur, trouve φ telle que F = ∇φ et φ(0 ; 2 ; 1) = 0.
  [free, sans aide]  ∂/∂y ((2λ − 9)y + 2z) − ∂/∂z ((7 − λ)xy − 3z)
    = (2λ − 9) − (−3)   ← ∂F₃/∂y − ∂F₂/∂z
    = (2λ − 6)   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (2y²) − ∂/∂x ((2λ − 9)y + 2z)
    = 0 − (0)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((7 − λ)xy − 3z) − ∂/∂y (2y²)
    = (7 − λ)y − (4y)   ← ∂F₂/∂x − ∂F₁/∂y
    = (3 − λ)y   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : 2λ − 6 = 0 et −λ + 3 = 0
    = λ = 3   ← ℝ³ est convexe : pour λ = 3, F dérive d'un potentiel ; pour λ ≠ 3, rot F ≠ 0 et non
  — Pour λ = 3, trouve φ avec φ(0 ; 2 ; 1) = 0 :  [juge antideriv]  départ : φ
    = φ = 2xy^2 + α(y, z)   ← ∫ F₁ dx = <math alttext="2xy²"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></math> : la « constante » dépend de y et z
    = φ = 2xy² − 3yz + β(z)   ← ∂φ/∂y = <math alttext="4xy"><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="−3z"><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math>
    = φ = 2xy² − 3yz + z² + C   ← ∂φ/∂z = <math alttext="−3y"><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="2z"><mrow><mn>2</mn><mo>&#x2062;</mo><mi>z</mi></mrow></math>
    = C = 5   ← φ(0 ; 2 ; 1) = −5 + C doit valoir 0
    = φ = 2xy² − 3yz + z² + 5   ← Le potentiel demandé
  pièges : v_rot_sign

Soit F(x, y, z) = ((λ + 2)z² ; 8yz − 3 ; 2xz + (λ + 5)y² + 10z) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ? Pour cette valeur, trouve φ telle que F = ∇φ et φ(−2 ; 1 ; 2) = 0.
  [free, sans aide]  ∂/∂y (2xz + (λ + 5)y² + 10z) − ∂/∂z (8yz − 3)
    = (2λ + 10)y − (8y)   ← ∂F₃/∂y − ∂F₂/∂z
    = (2λ + 2)y   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z ((λ + 2)z²) − ∂/∂x (2xz + (λ + 5)y² + 10z)
    = (2λ + 4)z − (2z)   ← ∂F₁/∂z − ∂F₃/∂x
    = (2λ + 2)z   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (8yz − 3) − ∂/∂y ((λ + 2)z²)
    = 0 − (0)   ← ∂F₂/∂x − ∂F₁/∂y
    = 0   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : 2λ + 2 = 0
    = λ = −1   ← ℝ³ est convexe : pour λ = −1, F dérive d'un potentiel ; pour λ ≠ −1, rot F ≠ 0 et non
  — Pour λ = −1, trouve φ avec φ(−2 ; 1 ; 2) = 0 :  [juge antideriv]  départ : φ
    = φ = xz^2 + α(y, z)   ← ∫ F₁ dx = <math alttext="xz²"><mrow><mi>x</mi><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math> : la « constante » dépend de y et z
    = φ = xz² + 4y²z − 3y + β(z)   ← ∂φ/∂y = <math alttext="0"><mn>0</mn></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="8yz − 3"><mrow><mrow><mrow><mn>8</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mn>3</mn></mrow></math>
    = φ = xz² + 4y²z + 5z² − 3y + C   ← ∂φ/∂z = <math alttext="2xz + 4y²"><mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="10z"><mrow><mn>10</mn><mo>&#x2062;</mo><mi>z</mi></mrow></math>
    = C = −17   ← φ(−2 ; 1 ; 2) = 17 + C doit valoir 0
    = φ = xz² + 4y²z + 5z² − 3y − 17   ← Le potentiel demandé
  pièges : v_rot_sign

Soit F(x, y, z) = (−2yz + 6x ; (λ − 4)xz − 3y² + z² ; −2xy + (2λ − 2)yz) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ? Pour cette valeur, trouve φ telle que F = ∇φ et φ(−2 ; 3 ; −2) = 0.
  [free, sans aide]  ∂/∂y (−2xy + (2λ − 2)yz) − ∂/∂z ((λ − 4)xz − 3y² + z²)
    = −2x + (2λ − 2)z − ((λ − 4)x + 2z)   ← ∂F₃/∂y − ∂F₂/∂z
    = (2 − λ)x + (2λ − 4)z   ← On simplifie
  — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (−2yz + 6x) − ∂/∂x (−2xy + (2λ − 2)yz)
    = −2y − (−2y)   ← ∂F₁/∂z − ∂F₃/∂x
    = 0   ← On simplifie
  — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x ((λ − 4)xz − 3y² + z²) − ∂/∂y (−2yz + 6x)
    = (λ − 4)z − (−2z)   ← ∂F₂/∂x − ∂F₁/∂y
    = (λ − 2)z   ← On simplifie
  — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : −λ + 2 = 0 et λ − 2 = 0
    = λ = 2   ← ℝ³ est convexe : pour λ = 2, F dérive d'un potentiel ; pour λ ≠ 2, rot F ≠ 0 et non
  — Pour λ = 2, trouve φ avec φ(−2 ; 3 ; −2) = 0 :  [juge antideriv]  départ : φ
    = φ = -2xyz+3x^2 + α(y, z)   ← ∫ F₁ dx = <math alttext="−2xyz + 3x²"><mrow><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>+</mo><mrow><mn>3</mn><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow></mrow></math> : la « constante » dépend de y et z
    = φ = −2xyz − y³ + yz² + 3x² + β(z)   ← ∂φ/∂y = <math alttext="−2xz"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="−3y² + z²"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>y</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math>
    = φ = −2xyz − y³ + yz² + 3x² + C   ← ∂φ/∂z = <math alttext="−2xy + 2yz"><mrow><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>+</mo><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="0"><mn>0</mn></math>
    = C = 27   ← φ(−2 ; 3 ; −2) = −27 + C doit valoir 0
    = φ = −2xyz − y³ + yz² + 3x² + 27   ← Le potentiel demandé
  pièges : v_rot_sign

```

### Variantes d'examen

```
Soit F(x, y, z) = ((2λ − 7)z ; 2z² + 2z ; −3x + 2y + 2λyz) sur ℝ³. F dérive d'un potentiel si et seulement si :
  ✔ λ = 2   · λ = −2 [v_rot_sign]   · λ = 3   · λ = 2 ou 2z + 2 = 0 [v_rot_scalar_sum]
  [examen mcq]
  pièges : v_rot_sign, v_rot_scalar_sum

Soit F(x, y, z) = (3yz − y ; 3xz + (2λ + 3)x ; (λ + 5)xy + 15z²) sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d'un potentiel ? Pour cette valeur, trouve φ telle que F = ∇φ et φ(−2 ; −2 ; −1) = 0.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1 ; Composante 2 de rot F : 1 ; Composante 3 de rot F : 1 ; Les équations, vraies pour tout (x, y, z) : 1 ; Pour λ = −2, trouve φ avec φ(−2 ; −2 ; −1) = 0 : 2)
    [free, sans aide, suivre l'erreur, examen open]  ∂/∂y ((λ + 5)xy + 15z²) − ∂/∂z (3xz + (2λ + 3)x)
      = (λ + 5)x − (3x)   ← ∂F₃/∂y − ∂F₂/∂z
      = (λ + 2)x   ← On simplifie
    — Composante 2 de rot F :  [juge equiv]  départ : ∂/∂z (3yz − y) − ∂/∂x ((λ + 5)xy + 15z²)
      = 3y − ((λ + 5)y)   ← ∂F₁/∂z − ∂F₃/∂x
      = (−2 − λ)y   ← On simplifie
    — Composante 3 de rot F :  [juge equiv]  départ : ∂/∂x (3xz + (2λ + 3)x) − ∂/∂y (3yz − y)
      = 3z + (2λ + 3) − (3z − 1)   ← ∂F₂/∂x − ∂F₁/∂y
      = (2λ + 4)   ← On simplifie
    — Les équations, vraies pour tout (x, y, z) :  [juge solset]  départ : λ + 2 = 0 et −λ − 2 = 0 et 2λ + 4 = 0
      = λ = −2   ← ℝ³ est convexe : pour λ = −2, F dérive d'un potentiel ; pour λ ≠ −2, rot F ≠ 0 et non
    — Pour λ = −2, trouve φ avec φ(−2 ; −2 ; −1) = 0 :  [juge antideriv]  départ : φ
      = φ = 3xyz-xy + α(y, z)   ← ∫ F₁ dx = <math alttext="3xyz − xy"><mrow><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mrow><mi>x</mi><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math> : la « constante » dépend de y et z
      = φ = 3xyz − xy + β(z)   ← ∂φ/∂y = <math alttext="3xz − x"><mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow><mo>−</mo><mi>x</mi></mrow></math> + ∂α/∂y doit valoir F₂ : ∂α/∂y = <math alttext="0"><mn>0</mn></math>
      = φ = 3xyz + 5z³ − xy + C   ← ∂φ/∂z = <math alttext="3xy"><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><mi>y</mi></mrow></math> + β′(z) doit valoir F₃ : β′(z) = <math alttext="15z²"><mrow><mn>15</mn><mo>&#x2062;</mo><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup></mrow></math>
      = C = 21   ← φ(−2 ; −2 ; −1) = −21 + C doit valoir 0
      = φ = 3xyz + 5z³ − xy + 21   ← Le potentiel demandé
  pièges : v_rot_sign

```

## Prouver qu'il n'y a pas de potentiel (`v-pot-none`, BA3)

_Une seule courbe fermée avec ∮ F · dl ≠ 0 suffit ; une seule avec ∮ = 0 ne prouve rien._

### Niveau 1

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − y)/(x² + y²) ; (x + 2y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω.
  [guided]  I
    (rot F = 0 sur Ω = ℝ² \ {(0, 0)}, mais Ω a un trou. On calcule ∮ F · dl sur le cercle γ(t) = (cos t ; sin t), t ∈ [0 ; 2π].)
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((2cos(t) − sin(t))(−sin(t)) + (cos(t) + 2sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 2π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 1 : ∮ = 2π
  pièges : v_orientation_reversed, v_pot_no_domain

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − y)/(x² + y²) ; (x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω.
  [guided]  I
    (rot F = 0 sur Ω = ℝ² \ {(0, 0)}, mais Ω a un trou. On calcule ∮ F · dl sur le cercle γ(t) = (cos t ; sin t), t ∈ [0 ; 2π].)
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((cos(t) − sin(t))(−sin(t)) + (cos(t) + sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 2π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 1 : ∮ = 2π
  pièges : v_orientation_reversed, v_pot_no_domain

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω.
  [guided]  I
    (rot F = 0 sur Ω = ℝ² \ {(0, 0)}, mais Ω a un trou. On calcule ∮ F · dl sur le cercle γ(t) = (cos t ; sin t), t ∈ [0 ; 2π].)
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 3 dt)   ← sin²t + cos²t = 1
    = □   (trous : 6π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 6π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 6π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 3 : ∮ = 6π
  pièges : v_orientation_reversed, v_pot_no_domain

```

### Niveau 2

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − y)/(x² + y²) ; (x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [guided]  ∂/∂x ((x + y)/(x² + y²)) − ∂/∂y ((x − y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((cos(t) − sin(t))(−sin(t)) + (cos(t) + sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 2π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 1 : ∮ = 2π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_rot_closed_zero, v_pot_no_domain, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−y/(x² + y²) ; x/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [guided]  ∂/∂x (x/(x² + y²)) − ∂/∂y (−y/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((−sin(t))(−sin(t)) + (cos(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 2π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 1 : ∮ = 2π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_rot_closed_zero, v_pot_no_domain, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 3y)/(x² + y²) ; (3x + 2y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [guided]  ∂/∂x ((3x + 2y)/(x² + y²)) − ∂/∂y ((2x − 3y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((2cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + 2sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 3 dt)   ← sin²t + cos²t = 1
    = □   (trous : 6π)   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 6π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 6π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 3 : ∮ = 6π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_rot_closed_zero, v_pot_no_domain, v_orientation_reversed, v_param_bounds

```

### Niveau 3

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−2y/(x² + y²) ; 2x/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (2x/(x² + y²)) − ∂/∂y (−2y/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((−2sin(t))(−sin(t)) + (2cos(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_rot_closed_zero, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((2x + y)/(x² + y²)) − ∂/∂y ((x − 2y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_rot_closed_zero, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((2x + y)/(x² + y²)) − ∂/∂y ((x − 2y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    ? Quelle courbe fermée choisis-tu ? ✔ Un cercle centré en (0 ; 0) : il entoure le trou / · Un cercle qui n'entoure pas (0 ; 0), par exemple de centre (4 ; 0) et de rayon 1
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_rot_closed_zero, v_orientation_reversed, v_param_bounds

```

### Niveau 4

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−2y/(x² + y²) ; 2x/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [free, suivre l'erreur]  ∂/∂x (2x/(x² + y²)) − ∂/∂y (−2y/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 2, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((−2sin(t))(−sin(t)) + (2cos(t))cos(t)) dt   ← F(γ(t)) · γ′(t) (le facteur 2 se simplifie)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (2cos t ; 2sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(1, 0)} et F(x, y) = ((2(x − 1) − 2y)/((x − 1)² + y²) ; (2(x − 1) + 2y)/((x − 1)² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [free, suivre l'erreur]  ∂/∂x ((2(x − 1) + 2y)/((x − 1)² + y²)) − ∂/∂y ((2(x − 1) − 2y)/((x − 1)² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(1, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (1+cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (1 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((2cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (1 + cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(1, 0)} et F(x, y) = (−2y/((x − 1)² + y²) ; 2(x − 1)/((x − 1)² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [free, suivre l'erreur]  ∂/∂x (2(x − 1)/((x − 1)² + y²)) − ∂/∂y (−2y/((x − 1)² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(1, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (1+cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (1 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((−2sin(t))(−sin(t)) + (2cos(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Conclusion :  [juge definite]  départ : I
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = 4π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  aides : Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n'y a pas de potentiel. | γ(t) = (1 + cos t ; sin t) ; F(γ(t)) · γ′(t) = … | F(γ(t)) · γ′(t) = 2 : ∮ = 4π
  pièges : g6_chain_forgot, g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_orientation_reversed, v_param_bounds

```

### Niveau 5

```
Soit F(x, y) = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)) sur Ω = ℝ² \ {(0, 0)}. Range les blocs de la preuve que F ne dérive pas d'un potentiel sur Ω. Deux blocs sont faux.
  [blocs order, sans aide]
    1. rot F = ∂F₂/∂x − ∂F₁/∂y = 0 sur Ω = ℝ² \ {(0, 0)}.
    2. Ω n'est pas simplement connexe : le critère « rot F = 0 » ne permet pas de conclure.
    3. Sur le cercle unité γ(θ) = (cos θ ; sin θ), θ ∈ [0 ; 2π] : F(γ(θ)) · γ′(θ) = 2.
    4. ∮ F · dl = ∫₀^{2π} 2 dθ = 4π ≠ 0.
    5. Si F dérivait d'un potentiel sur Ω, toute circulation sur une courbe fermée de Ω serait nulle : F ne dérive pas d'un potentiel sur Ω.
    ✗ Sur le cercle de centre (4 ; 0) et de rayon 1, ∮ F · dl = 0 : donc F dérive d'un potentiel. [v_rot_closed_zero]
    ✗ rot F = 0, donc F dérive d'un potentiel sur Ω. [v_pot_no_domain]
  pièges : v_rot_closed_zero, v_pot_no_domain

Soit F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)) sur Ω = ℝ² \ {(0, 0)}. Range les blocs de la preuve que F ne dérive pas d'un potentiel sur Ω. Deux blocs sont faux.
  [blocs order, sans aide]
    1. rot F = ∂F₂/∂x − ∂F₁/∂y = 0 sur Ω = ℝ² \ {(0, 0)}.
    2. Ω n'est pas simplement connexe : le critère « rot F = 0 » ne permet pas de conclure.
    3. Sur le cercle unité γ(θ) = (cos θ ; sin θ), θ ∈ [0 ; 2π] : F(γ(θ)) · γ′(θ) = 2.
    4. ∮ F · dl = ∫₀^{2π} 2 dθ = 4π ≠ 0.
    5. Si F dérivait d'un potentiel sur Ω, toute circulation sur une courbe fermée de Ω serait nulle : F ne dérive pas d'un potentiel sur Ω.
    ✗ Sur le cercle de centre (4 ; 0) et de rayon 1, ∮ F · dl = 0 : donc F dérive d'un potentiel. [v_rot_closed_zero]
    ✗ rot F = 0, donc F dérive d'un potentiel sur Ω. [v_pot_no_domain]
  pièges : v_rot_closed_zero, v_pot_no_domain

Soit F(x, y) = (−3y/(x² + y²) ; 3x/(x² + y²)) sur Ω = ℝ² \ {(0, 0)}. Range les blocs de la preuve que F ne dérive pas d'un potentiel sur Ω. Deux blocs sont faux.
  [blocs order, sans aide]
    1. rot F = ∂F₂/∂x − ∂F₁/∂y = 0 sur Ω = ℝ² \ {(0, 0)}.
    2. Ω n'est pas simplement connexe : le critère « rot F = 0 » ne permet pas de conclure.
    3. Sur le cercle unité γ(θ) = (cos θ ; sin θ), θ ∈ [0 ; 2π] : F(γ(θ)) · γ′(θ) = 3.
    4. ∮ F · dl = ∫₀^{2π} 3 dθ = 6π ≠ 0.
    5. Si F dérivait d'un potentiel sur Ω, toute circulation sur une courbe fermée de Ω serait nulle : F ne dérive pas d'un potentiel sur Ω.
    ✗ rot F = 0, donc F dérive d'un potentiel sur Ω. [v_pot_no_domain]
    ✗ Sur le cercle de centre (4 ; 0) et de rayon 1, ∮ F · dl = 0 : donc F dérive d'un potentiel. [v_rot_closed_zero]
  pièges : v_pot_no_domain, v_rot_closed_zero

```

### Variantes d'examen

```
Soit F(x, y) = (−y/(x² + y²) ; x/(x² + y²)). F dérive d'un potentiel sur :
  ✔ le demi-plan {x < 0}   · ℝ² \ {(0, 0)}, puisque rot F = 0 [v_pot_no_domain]   · {x² + y² > 1}, car ∮ F · dl = 0 sur le cercle de centre (3 ; 0) et de rayon 1 [v_rot_closed_zero]   · la couronne {1 < x² + y² < 4} [v_simply_connected_wrong]
  [examen mcq]
  pièges : v_pot_no_domain, v_simply_connected_wrong, v_rot_closed_zero

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)). Montre que F ne dérive pas d'un potentiel sur Ω : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; Une courbe fermée autour du trou : 1 ; La circulation sur ce cercle : 2,5 ; Conclusion : 1)
    [free, sans aide, suivre l'erreur, examen open]  ∂/∂x ((3x + y)/(x² + y²)) − ∂/∂y ((x − 3y)/(x² + y²))
      = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
    — Une courbe fermée autour du trou :  [juge param]  départ : Γ
      = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
    — La circulation sur ce cercle :  [juge definite]  départ : I
      = ∫_{0}^{2π} ((cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
      = ∫_{0}^{2π} 3 dt   ← sin²t + cos²t = 1
      = 6π   ← ≠ 0
    — Conclusion :  [juge definite]  départ : I
      = 6π   ← Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_orientation_reversed, v_param_bounds

```

## Problème : potentiel et discussion du domaine (`v-pot-domain`, BA3)

_Le même champ : pas de potentiel sur ℝ² \ {0}, un potentiel sur {x > 0} ; ou un potentiel malgré le trou._

### Niveau 1

```
Soit Ω = {(x, y) : x² + y² > 1} et F(x, y) = (y² + 2x/(x² + y²) ; 2xy − 9y² + 2y/(x² + y²)). F dérive-t-il d'un potentiel sur Ω ?
  [guided]  ∂/∂x (2xy − 9y² + 2y/(x² + y²)) − ∂/∂y (y² + 2x/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y
  — Un potentiel :  [juge antideriv]  départ : φ
    ? Ω = {x² + y² > 1} a un trou. Que fais-tu ? ✔ Le critère ne conclut pas : je cherche quand même un potentiel défini sur tout Ω / · Ω a un trou, donc F ne dérive pas d'un potentiel
    = φ = xy² + ln(x² + y²) + α(y)   ← ∫ F₁ dx
    = φ = xy² − 3y³ + ln(x² + y²) + C   ← On compare ∂φ/∂y à F₂
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (xy² − 3y³ + ln(x² + y²))
    ? φ est défini et C¹ sur tout Ω. Conclusion ? ✔ F dérive d'un potentiel sur Ω, malgré le trou / · Il fallait d'abord vérifier ∮ F · dl = 0 sur un cercle autour du trou : cela suffit
    = 2xy − 9y² + 2y/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : Le domaine a un trou : rot F = 0 ne conclut pas. Essaie quand même de trouver φ, et regarde où il est défini. | ∫ F₁ dx = xy² + ln(x² + y²) + α(y) | φ = xy² − 3y³ + ln(x² + y²) + C, défini sur tout Ω.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_rot_closed_zero

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [guided]  ∂/∂x ((2x + 2y)/(x² + y²)) − ∂/∂y ((2x − 2y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((2cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + 2sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 2 dt)   ← sin²t + cos²t = 1
    = □   (trous : 4π)   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = ln(x² + y²) + 2arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = ln(x² + y²) + 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (ln(x² + y²) + 2arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (2x + 2y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 2. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = ln(x² + y²) + 2arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 3y)/(x² + y²) ; (3x + y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [guided]  ∂/∂x ((3x + y)/(x² + y²)) − ∂/∂y ((x − 3y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 3 dt)   ← sin²t + cos²t = 1
    = □   (trous : 6π)   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 6π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = (1/2)ln(x² + y²) + 3arctan(y/x) + α(y)   ← ∫ F₁ dx : (1/2 ln(x² + y²))′ = x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = (1/2)ln(x² + y²) + 3arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y ((1/2)ln(x² + y²) + 3arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (3x + y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 3. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = (1/2)ln(x² + y²) + 3arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

```

### Niveau 2

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−y/(x² + y²) ; x/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [guided]  ∂/∂x (x/(x² + y²)) − ∂/∂y (−y/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((−sin(t))(−sin(t)) + (cos(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = arctan(y/x) + α(y)   ← ∫ F₁ dx et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (x)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 1. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − y)/(x² + y²) ; (x + y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [guided]  ∂/∂x ((x + y)/(x² + y²)) − ∂/∂y ((x − y)/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((cos(t) − sin(t))(−sin(t)) + (cos(t) + sin(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 1 dt)   ← sin²t + cos²t = 1
    = □   (trous : 2π)   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = (1/2)ln(x² + y²) + arctan(y/x) + α(y)   ← ∫ F₁ dx : (1/2 ln(x² + y²))′ = x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = (1/2)ln(x² + y²) + arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y ((1/2)ln(x² + y²) + arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (x + y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 1. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = (1/2)ln(x² + y²) + arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−2y/(x² + y²) ; 2x/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [guided]  ∂/∂x (2x/(x² + y²)) − ∂/∂y (−2y/(x² + y²))
    = □   (trous : 0)   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((□)(−sin(t)) + (□)cos(t)) dt   (trous : ∫_{0}^{2π} ((−2sin(t))(−sin(t)) + (2cos(t))cos(t)) dt)   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} □ dt   (trous : ∫_{0}^{2π} 2 dt)   ← sin²t + cos²t = 1
    = □   (trous : 4π)   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = 2arctan(y/x) + α(y)   ← ∫ F₁ dx et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (2arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (2x)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 2. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = 2arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

```

### Niveau 3

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = (−3y/(x² + y²) ; 3x/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (3x/(x² + y²)) − ∂/∂y (−3y/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((−3sin(t))(−sin(t)) + (3cos(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 3 dt   ← sin²t + cos²t = 1
    = 6π   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 6π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = 3arctan(y/x) + α(y)   ← ∫ F₁ dx et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = 3arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (3arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (3x)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 3. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = 3arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((2x + 2y)/(x² + y²)) − ∂/∂y ((2x − 2y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((2cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = ln(x² + y²) + 2arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = ln(x² + y²) + 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (ln(x² + y²) + 2arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (2x + 2y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 2. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = ln(x² + y²) + 2arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − y)/(x² + y²) ; (x + y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((x + y)/(x² + y²)) − ∂/∂y ((x − y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((cos(t) − sin(t))(−sin(t)) + (cos(t) + sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 1 dt   ← sin²t + cos²t = 1
    = 2π   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 2π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = (1/2)ln(x² + y²) + arctan(y/x) + α(y)   ← ∫ F₁ dx : (1/2 ln(x² + y²))′ = x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = (1/2)ln(x² + y²) + arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y ((1/2)ln(x² + y²) + arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (x + y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 1. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = (1/2)ln(x² + y²) + arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

```

### Niveau 4

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [free, suivre l'erreur]  ∂/∂x ((2x + y)/(x² + y²)) − ∂/∂y ((x − 2y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
    = 4π   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 4π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = (1/2)ln(x² + y²) + 2arctan(y/x) + α(y)   ← ∫ F₁ dx : (1/2 ln(x² + y²))′ = x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = (1/2)ln(x² + y²) + 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y ((1/2)ln(x² + y²) + 2arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (2x + y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 2. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = (1/2)ln(x² + y²) + 2arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 3y)/(x² + y²) ; (3x + 2y)/(x² + y²)). (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [free, suivre l'erreur]  ∂/∂x ((3x + 2y)/(x² + y²)) − ∂/∂y ((2x − 3y)/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  — Une courbe fermée autour du trou :  [juge param]  départ : Γ
    ? rot F = 0 sur Ω = ℝ² \ {(0, 0)}. Cela suffit-il à conclure ? ✔ Non : Ω n'est pas simplement connexe, le critère ne conclut pas / · Oui : rot F = 0, donc F dérive d'un potentiel
    = γ(t) = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
  — La circulation sur ce cercle :  [juge definite]  départ : I
    = ∫_{0}^{2π} ((2cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
    = ∫_{0}^{2π} 3 dt   ← sin²t + cos²t = 1
    = 6π   ← ≠ 0
  — Sur le demi-plan {x > 0} (convexe), un potentiel :  [juge antideriv]  départ : φ
    ? ∮ = 6π ≠ 0 sur une courbe fermée de Ω. Conclusion ? ✔ F ne dérive pas d'un potentiel sur Ω / · On ne peut rien conclure : il faudrait essayer toutes les courbes fermées / · F dérive d'un potentiel, puisque rot F = 0
    = φ = ln(x² + y²) + 3arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
    = φ = ln(x² + y²) + 3arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (ln(x² + y²) + 3arctan(y/x))
    ? Ce φ est-il un potentiel sur tout Ω = ℝ² \ {(0, 0)} ? ✔ Non : Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω / · Oui : φ est défini sur Ω et ∇φ = F
    = (3x + 2y)/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini. | Sur le cercle unité, F(γ(t)) · γ′(t) = 3. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²). | φ = ln(x² + y²) + 3arctan(y/x) + C, défini seulement pour x ≠ 0.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_pot_on_restricted, v_orientation_reversed, v_param_bounds

Soit Ω = {(x, y) : x² + y² > 1} et F(x, y) = (6x + x/(x² + y²) ; −6y + y/(x² + y²)). F dérive-t-il d'un potentiel sur Ω ?
  [free, suivre l'erreur]  ∂/∂x (−6y + y/(x² + y²)) − ∂/∂y (6x + x/(x² + y²))
    = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y
  — Un potentiel :  [juge antideriv]  départ : φ
    ? Ω = {x² + y² > 1} a un trou. Que fais-tu ? ✔ Le critère ne conclut pas : je cherche quand même un potentiel défini sur tout Ω / · Ω a un trou, donc F ne dérive pas d'un potentiel
    = φ = 3x² + (1/2)ln(x² + y²) + α(y)   ← ∫ F₁ dx
    = φ = 3x² − 3y² + (1/2)ln(x² + y²) + C   ← On compare ∂φ/∂y à F₂
  — Vérifie que ∂φ/∂y = F₂ :  [juge equiv]  départ : ∂/∂y (3x² − 3y² + (1/2)ln(x² + y²))
    ? φ est défini et C¹ sur tout Ω. Conclusion ? ✔ F dérive d'un potentiel sur Ω, malgré le trou / · Il fallait d'abord vérifier ∮ F · dl = 0 sur un cercle autour du trou : cela suffit
    = −6y + y/(x² + y²)   ← = F₂ : φ est bien un potentiel là où il est défini
  aides : Le domaine a un trou : rot F = 0 ne conclut pas. Essaie quand même de trouver φ, et regarde où il est défini. | ∫ F₁ dx = 3x² + (1/2)ln(x² + y²) + α(y) | φ = 3x² − 3y² + (1/2)ln(x² + y²) + C, défini sur tout Ω.
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_rot_closed_zero

```

### Niveau 5

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 3y)/(x² + y²) ; (3x + 2y)/(x² + y²)). (i) Montre que rot F = 0 sur Ω. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [problème, 8 points]
  partie 1 ((i) rot F : 2)
  (i) Calcule rot F sur Ω.
    [free, sans aide, suivre l'erreur]  ∂/∂x ((3x + 2y)/(x² + y²)) − ∂/∂y ((2x − 3y)/(x² + y²))
      = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  partie 2 ((ii) le domaine : 1)
  (ii) Que permet de conclure le critère « rot F = 0 » sur Ω ?
    · F dérive d'un potentiel sur Ω [v_pot_no_domain]   · F ne dérive pas d'un potentiel, car Ω a un trou [v_simply_connected_wrong]   ✔ Rien : Ω n'est pas simplement connexe   · Ω est simplement connexe, donc F dérive d'un potentiel [v_simply_connected_wrong]
  partie 3 ((ii) la circulation : 1 ; La circulation sur ce cercle : 1)
  (ii) Calcule la circulation de F sur le cercle unité parcouru dans le sens positif.
    [free, sans aide, suivre l'erreur]  Γ
      = γ = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
    — La circulation sur ce cercle :  [juge definite]  départ : I
      = ∫_{0}^{2π} ((2cos(t) − 3sin(t))(−sin(t)) + (3cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
      = ∫_{0}^{2π} 3 dt   ← sin²t + cos²t = 1
      = 6π   ← ≠ 0
  partie 4 ((ii) conclusion : 1)
  (ii) On a trouvé ∮ F · dl = 6π. Conclusion ?
    · F dérive d'un potentiel sur Ω, puisque rot F = 0 [v_pot_no_domain]   ✔ F ne dérive pas d'un potentiel sur Ω   · On ne peut rien conclure d'une seule courbe
  partie 5 ((iii) le potentiel : 1,5)
  (iii) Trouve un potentiel de F sur le demi-plan {x > 0}.
    [free, sans aide, suivre l'erreur]  φ
      = φ = ln(x² + y²) + 3arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
      = φ = ln(x² + y²) + 3arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  partie 6 ((iii) pas sur Ω : 0,5)
  (iii) Pourquoi ce φ n'est-il pas un potentiel sur Ω ?
    · C'en est un : φ est défini sur Ω [v_pot_on_restricted]   · Parce que ln(x² + y²) n'est pas défini pour x < 0   · Parce que rot F ≠ 0 sur l'axe x = 0   ✔ Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_simply_connected_wrong, v_orientation_reversed, v_param_bounds, v_pot_on_restricted

Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)). (i) Montre que rot F = 0 sur Ω. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [problème, 8 points]
  partie 1 ((i) rot F : 2)
  (i) Calcule rot F sur Ω.
    [free, sans aide, suivre l'erreur]  ∂/∂x ((2x + 2y)/(x² + y²)) − ∂/∂y ((2x − 2y)/(x² + y²))
      = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  partie 2 ((ii) le domaine : 1)
  (ii) Que permet de conclure le critère « rot F = 0 » sur Ω ?
    · F ne dérive pas d'un potentiel, car Ω a un trou [v_simply_connected_wrong]   · Ω est simplement connexe, donc F dérive d'un potentiel [v_simply_connected_wrong]   · F dérive d'un potentiel sur Ω [v_pot_no_domain]   ✔ Rien : Ω n'est pas simplement connexe
  partie 3 ((ii) la circulation : 1 ; La circulation sur ce cercle : 1)
  (ii) Calcule la circulation de F sur le cercle unité parcouru dans le sens positif.
    [free, sans aide, suivre l'erreur]  Γ
      = γ = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
    — La circulation sur ce cercle :  [juge definite]  départ : I
      = ∫_{0}^{2π} ((2cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
      = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
      = 4π   ← ≠ 0
  partie 4 ((ii) conclusion : 1)
  (ii) On a trouvé ∮ F · dl = 4π. Conclusion ?
    ✔ F ne dérive pas d'un potentiel sur Ω   · On ne peut rien conclure d'une seule courbe   · F dérive d'un potentiel sur Ω, puisque rot F = 0 [v_pot_no_domain]
  partie 5 ((iii) le potentiel : 1,5)
  (iii) Trouve un potentiel de F sur le demi-plan {x > 0}.
    [free, sans aide, suivre l'erreur]  φ
      = φ = ln(x² + y²) + 2arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
      = φ = ln(x² + y²) + 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  partie 6 ((iii) pas sur Ω : 0,5)
  (iii) Pourquoi ce φ n'est-il pas un potentiel sur Ω ?
    · C'en est un : φ est défini sur Ω [v_pot_on_restricted]   · Parce que ln(x² + y²) n'est pas défini pour x < 0   · Parce que rot F ≠ 0 sur l'axe x = 0   ✔ Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_simply_connected_wrong, v_orientation_reversed, v_param_bounds, v_pot_on_restricted

Soit Ω = {(x, y) : x² + y² > 1} et F(x, y) = (6x + 2x/(x² + y²) ; 2y + 2y/(x² + y²)). F dérive-t-il d'un potentiel sur Ω ?
  [problème, 8 points]
  partie 1 (rot F : 2)
  Calcule rot F sur Ω.
    [free, sans aide, suivre l'erreur]  ∂/∂x (2y + 2y/(x² + y²)) − ∂/∂y (6x + 2x/(x² + y²))
      = 0   ← rot F
  partie 2 (le domaine : 1)
  Que permet de conclure le critère « rot F = 0 » sur Ω = {x² + y² > 1} ?
    · F ne dérive pas d'un potentiel, car Ω a un trou [v_simply_connected_wrong]   ✔ Rien : Ω n'est pas simplement connexe   · F dérive d'un potentiel sur Ω [v_pot_no_domain]
  partie 3 (le potentiel : 3)
  Cherche un potentiel φ de F.
    [free, sans aide, suivre l'erreur]  φ
      = φ = 3x² + ln(x² + y²) + α(y)   ← ∫ F₁ dx
      = φ = 3x² + y² + ln(x² + y²) + C   ← On compare à F₂
  partie 4 (conclusion : 2)
  Conclusion ?
    · Ω a un trou : F ne dérive pas d'un potentiel [v_simply_connected_wrong]   ✔ φ est défini et C¹ sur tout Ω, et ∇φ = F : F dérive d'un potentiel sur Ω   · ∮ F · dl = 0 sur le cercle x² + y² = 4, donc F dérive d'un potentiel [v_rot_closed_zero]
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_simply_connected_wrong, v_pot_no_domain, v_rot_closed_zero

```

### Variantes d'examen

```
Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((2x − 2y)/(x² + y²) ; (2x + 2y)/(x² + y²)). (i) Montre que rot F = 0 sur Ω. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.
  [problème, examen open, 8 points]
  partie 1 ((i) rot F : 2)
  (i) Calcule rot F sur Ω.
    [free, sans aide, suivre l'erreur]  ∂/∂x ((2x + 2y)/(x² + y²)) − ∂/∂y ((2x − 2y)/(x² + y²))
      = 0   ← rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales
  partie 2 ((ii) le domaine : 1)
  (ii) Que permet de conclure le critère « rot F = 0 » sur Ω ?
    ✔ Rien : Ω n'est pas simplement connexe   · Ω est simplement connexe, donc F dérive d'un potentiel [v_simply_connected_wrong]   · F dérive d'un potentiel sur Ω [v_pot_no_domain]   · F ne dérive pas d'un potentiel, car Ω a un trou [v_simply_connected_wrong]
  partie 3 ((ii) la circulation : 1 ; La circulation sur ce cercle : 1)
  (ii) Calcule la circulation de F sur le cercle unité parcouru dans le sens positif.
    [free, sans aide, suivre l'erreur]  Γ
      = γ = (cos(t) ; sin(t)), t ∈ [0 ; 2π]   ← Le cercle de centre (0 ; 0) et de rayon 1, sens positif
    — La circulation sur ce cercle :  [juge definite]  départ : I
      = ∫_{0}^{2π} ((2cos(t) − 2sin(t))(−sin(t)) + (2cos(t) + 2sin(t))cos(t)) dt   ← F(γ(t)) · γ′(t)
      = ∫_{0}^{2π} 2 dt   ← sin²t + cos²t = 1
      = 4π   ← ≠ 0
  partie 4 ((ii) conclusion : 1)
  (ii) On a trouvé ∮ F · dl = 4π. Conclusion ?
    · On ne peut rien conclure d'une seule courbe   ✔ F ne dérive pas d'un potentiel sur Ω   · F dérive d'un potentiel sur Ω, puisque rot F = 0 [v_pot_no_domain]
  partie 5 ((iii) le potentiel : 1,5)
  (iii) Trouve un potentiel de F sur le demi-plan {x > 0}.
    [free, sans aide, suivre l'erreur]  φ
      = φ = ln(x² + y²) + 2arctan(y/x) + α(y)   ← ∫ F₁ dx : (ln(x² + y²))′ = 2x/(x² + y²) et (Arctg(y/x))′ = −y/(x² + y²)
      = φ = ln(x² + y²) + 2arctan(y/x) + C   ← ∂φ/∂y vaut déjà F₂ : α est une constante
  partie 6 ((iii) pas sur Ω : 0,5)
  (iii) Pourquoi ce φ n'est-il pas un potentiel sur Ω ?
    · C'en est un : φ est défini sur Ω [v_pot_on_restricted]   · Parce que rot F ≠ 0 sur l'axe x = 0   · Parce que ln(x² + y²) n'est pas défini pour x < 0   ✔ Arctg(y/x) n'est pas défini sur l'axe x = 0, qui fait partie de Ω
  pièges : g6_quotient_sign, g6_quotient_no_square, v_rot_sign, v_pot_no_domain, v_simply_connected_wrong, v_orientation_reversed, v_param_bounds, v_pot_on_restricted

```

## Théorème de Green et calcul d'une aire (`v-green`, BA3)

_∮ F · dl = ∬ rot F : avec rot F constant, c'est rot F × aire. Pas de Green si F a une singularité dans le domaine._

### Niveau 1

```
Calcule ∮_∂D F · dl pour F = (−3y, x) et l'ellipse pleine D = {x²/9 + y²/16 ≤ 1}, le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x x − ∂/∂y (−3y)
    (rot F (un nombre en 2D) :)
    = □   (trous : 4)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 4 dx dy, avec x = 3r cos φ, y = 4r sin φ (dx dy = 12r dr dφ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 48r dr dφ
    = □   (trous : 48π)   ← 4 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (4) dx dy = 4 × aire(D). | ∫_{0}^{2π} ∫_{0}^{1} 48r dr dφ.

Calcule ∮_∂D F · dl pour F = (−3y, 2x) et le triangle D de sommets (0, 0), (2, 0) et (0, 4), le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x (2x) − ∂/∂y (−3y)
    (rot F (un nombre en 2D) :)
    = □   (trous : 5)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{4 − 2x} 5 dy dx
    = □   (trous : 20)   ← 5 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (5) dx dy = 5 × aire(D). | ∫_{0}^{2} ∫_{0}^{4 − 2x} 5 dy dx.

Calcule ∮_∂D F · dl pour F = (−y, 3x) et l'ellipse pleine D = {x²/16 + y²/9 ≤ 1}, le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x (3x) − ∂/∂y (−y)
    (rot F (un nombre en 2D) :)
    = □   (trous : 4)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 4 dx dy, avec x = 4r cos φ, y = 3r sin φ (dx dy = 12r dr dφ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 48r dr dφ
    = □   (trous : 48π)   ← 4 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (4) dx dy = 4 × aire(D). | ∫_{0}^{2π} ∫_{0}^{1} 48r dr dφ.

```

### Niveau 2

```
Calcule ∮_∂D F · dl pour F = (−y, 2x + y³) et le disque D = {x² + y² ≤ 4}, le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x (2x + y³) − ∂/∂y (−y)
    (rot F (un nombre en 2D) :)
    ? Que faire ? ✔ Green : ∮ F · dl = ∬_D rot F dx dy / ✔ Paramétrer le bord et calculer ∮ F · dl directement / · Par Green, ∮ F · dl = aire(D)
    = □   (trous : 3)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 3 dx dy, en polaires (dx dy = r dr dφ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ
    = □   (trous : 12π)   ← 3 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (3) dx dy = 3 × aire(D). | ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ.
  pièges : v_green_no_rot

Calcule ∮_∂D F · dl pour F = (−3y − x², 2x + 1) et le triangle D de sommets (0, 0), (4, 0) et (0, 6), le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x (2x + 1) − ∂/∂y (−3y − x²)
    (rot F (un nombre en 2D) :)
    ? Que faire ? ✔ Green : ∮ F · dl = ∬_D rot F dx dy / ✔ Paramétrer le bord et calculer ∮ F · dl directement / · Par Green, ∮ F · dl = aire(D)
    = □   (trous : 5)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy :  [juge definite]  départ : ∫_{0}^{4} ∫_{0}^{6 − (3/2)x} 5 dy dx
    = □   (trous : 60)   ← 5 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (5) dx dy = 5 × aire(D). | ∫_{0}^{4} ∫_{0}^{6 − (3/2)x} 5 dy dx.
  pièges : v_green_no_rot

Calcule ∮_∂D F · dl pour F = (−2y + 2, 3x + 1) et le demi-disque D = {x² + y² ≤ 9, y ≥ 0}, le bord ∂D étant orienté positivement (D à gauche).
  [guided]  ∂/∂x (3x + 1) − ∂/∂y (−2y + 2)
    (rot F (un nombre en 2D) :)
    ? Que faire ? ✔ Green : ∮ F · dl = ∬_D rot F dx dy / ✔ Paramétrer le bord et calculer ∮ F · dl directement / · Par Green, ∮ F · dl = aire(D)
    = □   (trous : 5)
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy, en polaires :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} 5r dr dφ
    = □   (trous : 45π/2)   ← 5 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (5) dx dy = 5 × aire(D). | ∫_{0}^{π} ∫_{0}^{3} 5r dr dφ.
  pièges : v_green_no_rot

```

### Niveau 3

```
Soit F = (−y, x)/(x² + y²). Calcule ∮_∂D F · dl sur le bord du disque D = {x² + y² ≤ 4}, orienté positivement. (On a rot F = 0 là où F est défini.)
  [tap, suivre l'erreur, menu menu]  γ(t)
    (Le bord, orienté positivement :)
    ? Green s'applique-t-il sur ce disque ? ✔ Non : F n'est pas défini en (0, 0), qui est dans le disque / · Oui : rot F = 0, donc ∮ F · dl = 0
    = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]
  — F(γ(t)) · γ′(t) dt, puis l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ((−2sin(t))(−2sin(t)) + (2cos(t))(2cos(t)))/4 dt
    = ∫_{0}^{2π} 1 dt
    = 2π
  aides : Où F est-il défini ? Green demande F ∈ C¹ sur tout D. | γ(t) = (2 cos t, 2 sin t) : F(γ(t)) · γ′(t) = (4 sin²t + 4 cos²t)/4. | ∮ F · dl = ∫₀^{2π} 1 dt.
  pièges : v_green_singular

Soit F = (−y, x)/(x² + y²). Calcule ∮_∂D F · dl sur le bord du disque D = {x² + y² ≤ 9}, orienté positivement. (On a rot F = 0 là où F est défini.)
  [tap, suivre l'erreur, menu menu]  γ(t)
    (Le bord, orienté positivement :)
    ? Green s'applique-t-il sur ce disque ? ✔ Non : F n'est pas défini en (0, 0), qui est dans le disque / · Oui : rot F = 0, donc ∮ F · dl = 0
    = (3cos(t) ; 3sin(t)), t ∈ [0 ; 2π]
  — F(γ(t)) · γ′(t) dt, puis l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ((−3sin(t))(−3sin(t)) + (3cos(t))(3cos(t)))/9 dt
    = ∫_{0}^{2π} 1 dt
    = 2π
  aides : Où F est-il défini ? Green demande F ∈ C¹ sur tout D. | γ(t) = (3 cos t, 3 sin t) : F(γ(t)) · γ′(t) = (9 sin²t + 9 cos²t)/9. | ∮ F · dl = ∫₀^{2π} 1 dt.
  pièges : v_green_singular

Soit F = (−y, x)/(x² + y²). Calcule ∮_∂D F · dl sur le bord du disque D = {x² + y² ≤ 4}, orienté positivement. (On a rot F = 0 là où F est défini.)
  [tap, suivre l'erreur, menu menu]  γ(t)
    (Le bord, orienté positivement :)
    ? Green s'applique-t-il sur ce disque ? ✔ Non : F n'est pas défini en (0, 0), qui est dans le disque / · Oui : rot F = 0, donc ∮ F · dl = 0
    = (2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]
  — F(γ(t)) · γ′(t) dt, puis l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ((−2sin(t))(−2sin(t)) + (2cos(t))(2cos(t)))/4 dt
    = ∫_{0}^{2π} 1 dt
    = 2π
  aides : Où F est-il défini ? Green demande F ∈ C¹ sur tout D. | γ(t) = (2 cos t, 2 sin t) : F(γ(t)) · γ′(t) = (4 sin²t + 4 cos²t)/4. | ∮ F · dl = ∫₀^{2π} 1 dt.
  pièges : v_green_singular

```

### Niveau 4

```
Calcule ∮_∂D F · dl pour F = (−2y + 2, 3x + 1) et le triangle D de sommets (0, 0), (4, 0) et (0, 2), le bord ∂D étant orienté positivement (D à gauche).
  [free, suivre l'erreur]  ∂/∂x (3x + 1) − ∂/∂y (−2y + 2)
    (rot F (un nombre en 2D) :)
    ? Que faire ? ✔ Green : ∮ F · dl = ∬_D rot F dx dy / ✔ Paramétrer le bord et calculer ∮ F · dl directement / · Par Green, ∮ F · dl = aire(D)
    = 5
  — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy :  [juge definite]  départ : ∫_{0}^{4} ∫_{0}^{2 − (1/2)x} 5 dy dx
    = 20   ← 5 × aire(D)
  aides : Calcule d'abord rot F : est-il constant ? | ∮ F · dl = ∬_D (5) dx dy = 5 × aire(D). | ∫_{0}^{4} ∫_{0}^{2 − (1/2)x} 5 dy dx.
  pièges : v_green_no_rot

Soit F = (−y, x)/(x² + y²). Calcule ∮_∂D F · dl sur le bord du disque D = {x² + y² ≤ 1}, orienté positivement. (On a rot F = 0 là où F est défini.)
  [free, suivre l'erreur]  γ(t)
    (Le bord, orienté positivement :)
    ? Green s'applique-t-il sur ce disque ? ✔ Non : F n'est pas défini en (0, 0), qui est dans le disque / · Oui : rot F = 0, donc ∮ F · dl = 0
    = (cos(t) ; sin(t)), t ∈ [0 ; 2π]
  — F(γ(t)) · γ′(t) dt, puis l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ((−sin(t))(−sin(t)) + (cos(t))(cos(t)))/1 dt
    = ∫_{0}^{2π} 1 dt
    = 2π
  aides : Où F est-il défini ? Green demande F ∈ C¹ sur tout D. | γ(t) = (1 cos t, 1 sin t) : F(γ(t)) · γ′(t) = (1 sin²t + 1 cos²t)/1. | ∮ F · dl = ∫₀^{2π} 1 dt.
  pièges : v_green_singular

Par Green, calcule l'aire de l'ellipse D = {x²/9 + y²/16 ≤ 1} avec aire(D) = ½ ∮_∂D (x dy − y dx).
  [free, suivre l'erreur]  γ(t)
    (Le bord, orienté positivement :)
    = (3cos(t) ; 4sin(t)), t ∈ [0 ; 2π]
  — aire(D) = ½ ∮ (x dy − y dx) :  [juge definite]  départ : (1/2)(∫_{0}^{2π} (3cos(t)·4cos(t) − 4sin(t)·(−3sin(t))) dt)
    = (1/2)(∫_{0}^{2π} 12 dt)
    = 12π
  aides : Paramètre le bord dans le sens positif, puis remplace x, y, dx = x′(t) dt, dy = y′(t) dt. | γ(t) = (3 cos t, 4 sin t) : x dy − y dx = 12(cos²t + sin²t) dt. | aire = ½ ∫₀^{2π} 12 dt.

```

### Niveau 5

```
Vérifie le théorème de Green pour F = (−y, 3x) sur le demi-disque D = {x² + y² ≤ 1, y ≥ 0} : calcule les deux membres. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, sans aide]  ∂/∂x (3x) − ∂/∂y (−y)
    (rot F (un nombre en 2D) :)
    = 4
  — ∬_D rot F dx dy, en polaires :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{1} 4r dr dφ
    = 2π   ← 4 × aire(D)
  — Le bord : le diamètre [−1 ; 1] (sur y = 0, F · γ′ = 0), puis le demi-cercle, paramétré dans le sens positif :  [juge param]  départ : γ(t)
    = (cos(t) ; sin(t)), t ∈ [0 ; π]
  — Sur le demi-cercle, ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} (sin(t)² + 3cos(t)²) dt
    = 2π

Vérifie le théorème de Green pour F = (−y, 3x) sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0} : calcule les deux membres. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, sans aide]  ∂/∂x (3x) − ∂/∂y (−y)
    (rot F (un nombre en 2D) :)
    = 4
  — ∬_D rot F dx dy, en polaires :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} 4r dr dφ
    = 18π   ← 4 × aire(D)
  — Le bord : le diamètre [−3 ; 3] (sur y = 0, F · γ′ = 0), puis le demi-cercle, paramétré dans le sens positif :  [juge param]  départ : γ(t)
    = (3cos(t) ; 3sin(t)), t ∈ [0 ; π]
  — Sur le demi-cercle, ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} (9sin(t)² + 27cos(t)²) dt
    = 18π

Vérifie le théorème de Green pour F = (−3y, x) sur le demi-disque D = {x² + y² ≤ 1, y ≥ 0} : calcule les deux membres. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, sans aide]  ∂/∂x x − ∂/∂y (−3y)
    (rot F (un nombre en 2D) :)
    = 4
  — ∬_D rot F dx dy, en polaires :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{1} 4r dr dφ
    = 2π   ← 4 × aire(D)
  — Le bord : le diamètre [−1 ; 1] (sur y = 0, F · γ′ = 0), puis le demi-cercle, paramétré dans le sens positif :  [juge param]  départ : γ(t)
    = (cos(t) ; sin(t)), t ∈ [0 ; π]
  — Sur le demi-cercle, ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} (3sin(t)² + cos(t)²) dt
    = 2π

```

### Variantes d'examen

```
Soit F = (−2y − x², 3x) et D le disque de rayon 3 centré en 0, ∂D orienté positivement. ∮_∂D F · dl =
  ✔ 45π   · −45π [v_orientation_reversed]   · 30π   · 9π [v_green_no_rot]
  [examen mcq]
  pièges : v_green_no_rot, v_orientation_reversed

Calcule ∮_∂D F · dl pour F = (−3y + 2, 2x + 1) et l'ellipse pleine D = {x²/4 + y²/9 ≤ 1}, le bord ∂D étant orienté positivement (D à gauche).
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1,5 ; Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy, avec x = 2r cos φ, y = 3r sin φ (dx dy = 6r dr dφ) : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  ∂/∂x (2x + 1) − ∂/∂y (−3y + 2)
      (rot F (un nombre en 2D) :)
      = 5
    — Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D 5 dx dy, avec x = 2r cos φ, y = 3r sin φ (dx dy = 6r dr dφ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 30r dr dφ
      = 30π   ← 5 × aire(D)

```

## Forme flux de Green : ∮ F · ν dl = ∬ div F (`v-green-flux`, BA3)

_∮ F · ν dl = ∬ div F, ν la normale extérieure unité : une intégrale double au lieu de plusieurs côtés._

### Niveau 1

```
Soit F = (−x² + x, xy) et le triangle A de sommets (0, 0), (2, 0) et (2, 2). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (−x² + x) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    (∮_∂A F · ν dl = ? ∬_A div F dx dy.)
    = □ + 1   (trous : −x + 1)
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{x} (−x + 1) dy dx
    = ∫_{0}^{2} (−x² + x) dx
    = □   (trous : −2/3)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = −x + 1 ; ∫_{0}^{2} ∫_{0}^{x} (−x + 1) dy dx. | ∫_{0}^{2} (−x² + x) dx.
  pièges : v_div_rot_confuse

Soit F = (x² + x, x²y) et le carré A = [0 ; 2] × [0 ; 2]. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (x² + x) + ∂/∂y (x²y)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    (∮_∂A F · ν dl = ? ∬_A div F dx dy.)
    = □ + 2x + 1   (trous : x² + 2x + 1)
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2} (x² + 2x + 1) dy dx
    = ∫_{0}^{2} 2(x² + 2x + 1) dx
    = □   (trous : 52/3)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = x² + 2x + 1 ; ∫_{0}^{2} ∫_{0}^{2} (x² + 2x + 1) dy dx. | ∫_{0}^{2} 2(x² + 2x + 1) dx.
  pièges : v_div_rot_confuse

Soit F = (−x² + x, xy) et le carré A = [0 ; 3] × [0 ; 3]. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (−x² + x) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    (∮_∂A F · ν dl = ? ∬_A div F dx dy.)
    = □ + 1   (trous : −x + 1)
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{3} (−x + 1) dy dx
    = ∫_{0}^{3} 3(−x + 1) dx
    = □   (trous : −9/2)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = −x + 1 ; ∫_{0}^{3} ∫_{0}^{3} (−x + 1) dy dx. | ∫_{0}^{3} 3(−x + 1) dx.
  pièges : v_div_rot_confuse

```

### Niveau 2

```
Soit F = (−x² + 3x, xy) et le triangle A de sommets (0, 0), (1, 0) et (1, 1). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (−x² + 3x) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = □ + 3   (trous : −x + 3)
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{x} (−x + 3) dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^1 (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^1 … dx) dy
    = ∫_{0}^{1} (−x² + 3x) dx
    = □   (trous : 7/6)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = −x + 3 ; ∫_{0}^{1} ∫_{0}^{x} (−x + 3) dy dx. | ∫_{0}^{1} (−x² + 3x) dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

Soit F = (−x² + x, x²y) et le carré A = [0 ; 3] × [0 ; 3]. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (−x² + x) + ∂/∂y (x²y)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = □ − 2x + 1   (trous : x² − 2x + 1)
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ 3
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{3} (x² − 2x + 1) dy dx
    = ∫_{0}^{3} 3(x² − 2x + 1) dx
    = □   (trous : 9)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = x² − 2x + 1 ; ∫_{0}^{3} ∫_{0}^{3} (x² − 2x + 1) dy dx. | ∫_{0}^{3} 3(x² − 2x + 1) dx.
  pièges : v_div_rot_confuse

Soit F = (−x² + x, y) et le carré A = [0 ; 1] × [0 ; 1]. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [guided]  ∂/∂x (−x² + x) + ∂/∂y y
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = □ + 2   (trous : −2x + 2)
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{1} (−2x + 2) dy dx
    = ∫_{0}^{1} (−2x + 2) dx
    = □   (trous : 1)
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = −2x + 2 ; ∫_{0}^{1} ∫_{0}^{1} (−2x + 2) dy dx. | ∫_{0}^{1} (−2x + 2) dx.
  pièges : v_div_rot_confuse

```

### Niveau 3

```
Soit F = (2x² + x, xy) et le triangle A de sommets (0, 0), (3, 0) et (3, 3). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (2x² + x) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    ? Comment calculer ce flux ? ✔ Forme flux de Green : ∬_A div F / ✔ Calculer côté par côté, avec la normale de chaque côté
    = 5x + 1
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{x} (5x + 1) dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^3 (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^3 … dx) dy
    = ∫_{0}^{3} (5x² + x) dx
    = 99/2
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = 5x + 1 ; ∫_{0}^{3} ∫_{0}^{x} (5x + 1) dy dx. | ∫_{0}^{3} (5x² + x) dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

Soit F = (2x², y) et le triangle A de sommets (0, 0), (3, 0) et (3, 3). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (2x²) + ∂/∂y y
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    ? Comment calculer ce flux ? ✔ Forme flux de Green : ∬_A div F / ✔ Calculer côté par côté, avec la normale de chaque côté
    = 4x + 1
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{x} (4x + 1) dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^3 (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^3 … dx) dy
    = ∫_{0}^{3} (4x² + x) dx
    = 81/2
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = 4x + 1 ; ∫_{0}^{3} ∫_{0}^{x} (4x + 1) dy dx. | ∫_{0}^{3} (4x² + x) dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

Soit F = (x², ycos(x²)) et le triangle A de sommets (0, 0), (√π, 0) et (√π, √π). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (x²) + ∂/∂y (ycos(x²))
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    ? Comment calculer ce flux ? ✔ Forme flux de Green : ∬_A div F / ✔ Calculer côté par côté, avec la normale de chaque côté
    = 2x + cos(x²)
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ √(π) ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{√(π)} ∫_{0}^{x} (2x + cos(x²)) dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^√π (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^√π … dx) dy
    = ∫_{0}^{√(π)} (2x² + xcos(x²)) dx
    = (2/3)π√π
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = 2x + cos(x²) ; ∫_{0}^{√(π)} ∫_{0}^{x} (2x + cos(x²)) dy dx. | ∫_{0}^{√(π)} (2x² + xcos(x²)) dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

```

### Niveau 4

```
Soit F = (2x², xy) et le triangle A de sommets (0, 0), (1, 0) et (1, 1). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [free, suivre l'erreur]  ∂/∂x (2x²) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = 5x
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{x} 5x dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^1 (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^1 … dx) dy
    = ∫_{0}^{1} 5x² dx
    = 5/3
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = 5x ; ∫_{0}^{1} ∫_{0}^{x} 5x dy dx. | ∫_{0}^{1} 5x² dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

Soit F = (x² + x, y) et le carré A = [0 ; 3] × [0 ; 3]. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [free, suivre l'erreur]  ∂/∂x (x² + x) + ∂/∂y y
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = 2x + 2
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ 3
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{3} (2x + 2) dy dx
    = ∫_{0}^{3} 3(2x + 2) dx
    = 45
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = 2x + 2 ; ∫_{0}^{3} ∫_{0}^{3} (2x + 2) dy dx. | ∫_{0}^{3} 3(2x + 2) dx.
  pièges : v_div_rot_confuse

Soit F = (2x² + 3x, x²y) et le triangle A de sommets (0, 0), (2, 0) et (2, 2). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [free, suivre l'erreur]  ∂/∂x (2x² + 3x) + ∂/∂y (x²y)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    ? ∮_∂A F · ν dl = ? ✔ ∬_A div F dx dy / · ∬_A rot F dx dy
    = x² + 4x + 3
  — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{x} (x² + 4x + 3) dy dx
    ? Dans quel ordre intégrer ? ✔ ∫₀^2 (∫₀ˣ … dy) dx / · ∫₀ˣ (∫₀^2 … dx) dy
    = ∫_{0}^{2} (x³ + 4x² + 3x) dx
    = 62/3
  aides : ν est la normale : c'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F. | div F = x² + 4x + 3 ; ∫_{0}^{2} ∫_{0}^{x} (x² + 4x + 3) dy dx. | ∫_{0}^{2} (x³ + 4x² + 3x) dx.
  pièges : v_div_rot_confuse, v_fubini_bounds

```

### Niveau 5

```
Vérifie la forme flux de Green pour F = (x² + 3x, y) sur le carré A = [0 ; 1] × [0 ; 1] : calcule ∬_A div F, puis ∮_∂A F · ν dl côté par côté.
  [free, sans aide]  ∂/∂x (x² + 3x) + ∂/∂y y
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    = 2x + 4
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{1} (2x + 4) dy dx
    = ∫_{0}^{1} (2x + 4) dx
    = 5
  — Le bord, côté par côté. Sur le côté x = 1, parcouru par γ(t) = (1, t), t ∈ [0 ; 1] : ν = (γ₂′, −γ₁′)/|γ′| =  [juge vector]  départ : ν
    = (1 ; 0)
  — ∫ F · ν dl sur le côté x = 1 :  [juge definite]  départ : ∫_{0}^{1} ((1)² + 3(1)) dt
    = 4
  — Sur le côté y = 1 (ν = (0, 1)) : ∫ F · ν dl = ∫₀^1 F₂(x, 1) dx, et sur les côtés y = 0 et x = 0, F · ν = 0. La somme des côtés :  [juge definite]  départ : 4 + ∫_{0}^{1} 1 dx
    = 5

Vérifie la forme flux de Green pour F = (2x² + x, y) sur le carré A = [0 ; 1] × [0 ; 1] : calcule ∬_A div F, puis ∮_∂A F · ν dl côté par côté.
  [free, sans aide]  ∂/∂x (2x² + x) + ∂/∂y y
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    = 4x + 2
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{1} (4x + 2) dy dx
    = ∫_{0}^{1} (4x + 2) dx
    = 4
  — Le bord, côté par côté. Sur le côté x = 1, parcouru par γ(t) = (1, t), t ∈ [0 ; 1] : ν = (γ₂′, −γ₁′)/|γ′| =  [juge vector]  départ : ν
    = (1 ; 0)
  — ∫ F · ν dl sur le côté x = 1 :  [juge definite]  départ : ∫_{0}^{1} (2(1)² + (1)) dt
    = 3
  — Sur le côté y = 1 (ν = (0, 1)) : ∫ F · ν dl = ∫₀^1 F₂(x, 1) dx, et sur les côtés y = 0 et x = 0, F · ν = 0. La somme des côtés :  [juge definite]  départ : 3 + ∫_{0}^{1} 1 dx
    = 4

Vérifie la forme flux de Green pour F = (x², xy) sur le carré A = [0 ; 3] × [0 ; 3] : calcule ∬_A div F, puis ∮_∂A F · ν dl côté par côté.
  [free, sans aide]  ∂/∂x (x²) + ∂/∂y (xy)
    (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
    = 3x
  — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{3} 3x dy dx
    = ∫_{0}^{3} 3(3x) dx
    = 81/2
  — Le bord, côté par côté. Sur le côté x = 3, parcouru par γ(t) = (3, t), t ∈ [0 ; 3] : ν = (γ₂′, −γ₁′)/|γ′| =  [juge vector]  départ : ν
    = (1 ; 0)
  — ∫ F · ν dl sur le côté x = 3 :  [juge definite]  départ : ∫_{0}^{3} (3)² dt
    = 27
  — Sur le côté y = 3 (ν = (0, 1)) : ∫ F · ν dl = ∫₀^3 F₂(x, 3) dx, et sur les côtés y = 0 et x = 0, F · ν = 0. La somme des côtés :  [juge definite]  départ : 27 + ∫_{0}^{3} 3x dx
    = 81/2
  pièges : v_div_rot_confuse

```

### Variantes d'examen

```
Soit F = (3x, 2y) et A le disque de rayon 2 centré en 0, ν la normale extérieure unité. ∮_∂A F · ν dl =
  · 0 [v_div_rot_confuse]   · 4π   ✔ 20π   · −20π [v_nu_formula]
  [examen mcq]
  pièges : v_div_rot_confuse, v_nu_formula

Soit F = (3x², ycos(x²)) et le triangle A de sommets (0, 0), (√π, 0) et (√π, √π). Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1,5 ; Les bornes de A (type I : x à l'extérieur) : 1,5 ; ∬_A div F dx dy : 2)
    [free, sans aide, suivre l'erreur, examen open]  ∂/∂x (3x²) + ∂/∂y (ycos(x²))
      (A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D'abord div F :)
      = 6x + cos(x²)
    — Les bornes de A (type I : x à l'extérieur) :  [juge domain]  départ : A
      = 0 ≤ x ≤ √(π) ; 0 ≤ y ≤ x
    — ∬_A div F dx dy :  [juge definite]  départ : ∫_{0}^{√(π)} ∫_{0}^{x} (6x + cos(x²)) dy dx
      = ∫_{0}^{√(π)} (6x² + xcos(x²)) dx
      = 2π√π
  pièges : v_div_rot_confuse

```

## Paramétrer une surface ; normale σ_u ∧ σ_v (`v-surf-param`, BA3)

_σ(r, φ) ou σ(θ, φ), le domaine A des paramètres, et la normale σ_u ∧ σ_v, dont l'ordre fixe le sens._

### Niveau 1

```
Paramètre Σ = {x² + y² + z² = 9} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ);3sin(θ)sin(φ);□),(θ;φ)∈[0;π]×[0;2π]   (trous : (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π])   ← toute la sphère : θ ∈ [0 ; π]
  — Dérivées partielles σ_θ :  [juge vector]  départ : σ_θ
    = σ_θ=(3cos(θ)cos(φ);3cos(θ)sin(φ);□)   (trous : σ_θ = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; -3sin(θ)))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;3sin(θ)cos(φ);0)   (trous : σ_φ = (-3sin(θ)sin(φ) ; 3sin(θ)cos(φ) ; 0))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    (La normale σ_θ ∧ σ_φ est-elle extérieure ? Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0.)
    = σ_θ∧σ_φ=(9sin(θ)^2cos(φ);9sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  aides : Sphère : θ depuis l'axe z, φ autour : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ). | σ = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)) ; toute la sphère : θ ∈ [0 ; π]. | σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  pièges : v_sphere_theta

Paramètre Σ = {z = 4 − x² − y², z ≥ 0} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (rcos(φ);rsin(φ);□),(r;φ)∈[0;2]×[0;2π]   (trous : (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π])   ← z ≥ 0 donne r ≤ 2
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r=(cos(φ);sin(φ);□)   (trous : σ_r = (cos(φ) ; sin(φ) ; -2r))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;rcos(φ);0)   (trous : σ_φ = (-r sin(φ) ; r cos(φ) ; 0))
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    (Vers où pointe la normale σ_r ∧ σ_φ ? Vers le haut.)
    = σ_r∧σ_φ=(□;2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r))
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; -r^2+4) ; z ≥ 0 donne r ≤ 2. | σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)

Paramètre Σ = {z = √(x² + y²), z ≤ 1} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (rcos(φ);rsin(φ);r),(r;φ)∈[0;□]×[0;□]   (trous : (r cos(φ) ; r sin(φ) ; r), (r ; φ) ∈ [0 ; 1] × [0 ; 2π])   ← z ≤ 1 donne r ≤ 1
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r=(cos(φ);sin(φ);□)   (trous : σ_r = (cos(φ) ; sin(φ) ; 1))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;rcos(φ);0)   (trous : σ_φ = (-r sin(φ) ; r cos(φ) ; 0))
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    (Vers où pointe la normale σ_r ∧ σ_φ ? Vers le haut.)
    = σ_r∧σ_φ=(□;-rsin(φ);r)   (trous : σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r))
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; r) ; z ≤ 1 donne r ≤ 1. | σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r)

```

### Niveau 2

```
Paramètre Σ = {x² + y² + z² = 9} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ);3sin(θ)sin(φ);3cos(θ)),(θ;φ)∈[0;□]×[0;□]   (trous : (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π])   ← toute la sphère : θ ∈ [0 ; π]
  — Dérivées partielles σ_θ :  [juge vector]  départ : σ_θ
    = σ_θ=(3cos(θ)cos(φ);3cos(θ)sin(φ);□)   (trous : σ_θ = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; -3sin(θ)))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;3sin(θ)cos(φ);0)   (trous : σ_φ = (-3sin(θ)sin(φ) ; 3sin(θ)cos(φ) ; 0))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
    = σ_θ∧σ_φ=(9sin(θ)^2cos(φ);9sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  aides : Sphère : θ depuis l'axe z, φ autour : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ). | σ = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)) ; toute la sphère : θ ∈ [0 ; π]. | σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  pièges : v_sphere_theta, v_cross_order

Paramètre Σ = {x² + y² + z² = 9} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ);3sin(θ)sin(φ);3cos(θ)),(θ;φ)∈[0;□]×[0;□]   (trous : (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π])   ← toute la sphère : θ ∈ [0 ; π]
  — Dérivées partielles σ_θ :  [juge vector]  départ : σ_θ
    = σ_θ=(3cos(θ)cos(φ);3cos(θ)sin(φ);□)   (trous : σ_θ = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; -3sin(θ)))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;3sin(θ)cos(φ);0)   (trous : σ_φ = (-3sin(θ)sin(φ) ; 3sin(θ)cos(φ) ; 0))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
    = σ_θ∧σ_φ=(9sin(θ)^2cos(φ);9sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  aides : Sphère : θ depuis l'axe z, φ autour : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ). | σ = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)) ; toute la sphère : θ ∈ [0 ; π]. | σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  pièges : v_sphere_theta, v_cross_order

Paramètre Σ = {x² + y² + z² = 9} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [guided]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ);3sin(θ)sin(φ);3cos(θ)),(θ;φ)∈[0;□]×[0;□]   (trous : (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π])   ← toute la sphère : θ ∈ [0 ; π]
  — Dérivées partielles σ_θ :  [juge vector]  départ : σ_θ
    = σ_θ=(3cos(θ)cos(φ);3cos(θ)sin(φ);□)   (trous : σ_θ = (3cos(θ)cos(φ) ; 3cos(θ)sin(φ) ; -3sin(θ)))
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ=(□;3sin(θ)cos(φ);0)   (trous : σ_φ = (-3sin(θ)sin(φ) ; 3sin(θ)cos(φ) ; 0))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
    = σ_θ∧σ_φ=(9sin(θ)^2cos(φ);9sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  aides : Sphère : θ depuis l'axe z, φ autour : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ). | σ = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)) ; toute la sphère : θ ∈ [0 ; π]. | σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  pièges : v_sphere_theta, v_cross_order

```

### Niveau 3

```
Paramètre Σ = {z = 2(x² + y²), z ≤ 2} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; 2r^2), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]   ← z ≤ 2 donne r ≤ 1
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; 4r)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-4r^2 cos(φ) ; -4r^2 sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; 2r^2) ; z ≤ 2 donne r ≤ 1. | σ_r ∧ σ_φ = (-4r^2 cos(φ) ; -4r^2 sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = 2√(x² + y²), z ≤ 6} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; 2r), (r ; φ) ∈ [0 ; 3] × [0 ; 2π]   ← z ≤ 6 donne r ≤ 3
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; 2)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; 2r) ; z ≤ 6 donne r ≤ 3. | σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = x² + y², z ≤ 1} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]   ← z ≤ 1 donne r ≤ 1
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; 2r)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; r^2) ; z ≤ 1 donne r ≤ 1. | σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  pièges : v_cross_order

```

### Niveau 4

```
Paramètre Σ = {z = x² + y², z ≤ 1} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]   ← z ≤ 1 donne r ≤ 1
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; 2r)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; r^2) ; z ≤ 1 donne r ≤ 1. | σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = 2√(x² + y²), z ≤ 4} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; 2r), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]   ← z ≤ 4 donne r ≤ 2
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; 2)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; 2r) ; z ≤ 4 donne r ≤ 2. | σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = 4 − x² − y², z ≥ 0} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]   ← z ≥ 0 donne r ≤ 2
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; -2r)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  aides : Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ. | σ = (r cos(φ) ; r sin(φ) ; -r^2+4) ; z ≥ 0 donne r ≤ 2. | σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  pièges : v_cross_order

```

### Niveau 5

```
Paramètre Σ = {z = √(x² + y²)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, sans aide]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; -r^2+3r), (r ; φ) ∈ [0 ; 3] × [0 ; π]   ← z = r(3 − r) ≥ 0 pour 0 ≤ r ≤ 3, et y ≥ 0 donne sin φ ≥ 0
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; -2r+3)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-3)r cos(φ) ; (2r-3)r sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = √(x² + y²)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, sans aide]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; -r^2+2r), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z = r(2 − r) ≥ 0 pour 0 ≤ r ≤ 2, et y ≥ 0 donne sin φ ≥ 0
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; -2r+2)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r)
  pièges : v_cross_order

Paramètre Σ = {z = √(x² + y²)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.
  [free, sans aide]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; -r^2+3r), (r ; φ) ∈ [0 ; 3] × [0 ; π]   ← z = r(3 − r) ≥ 0 pour 0 ≤ r ≤ 3, et y ≥ 0 donne sin φ ≥ 0
  — Dérivées partielles σ_r :  [juge vector]  départ : σ_r
    = σ_r = (cos(φ) ; sin(φ) ; -2r+3)
  — Dérivées partielles σ_φ :  [juge vector]  départ : σ_φ
    = σ_φ = (-r sin(φ) ; r cos(φ) ; 0)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-3)r cos(φ) ; (2r-3)r sin(φ) ; r)
  pièges : v_cross_order

```

### Variantes d'examen

```
Σ = {z = 2√(x² + y²), z ≤ 4} est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; 2r), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Que vaut σ_r ∧ σ_φ ?
  · (-2cos(φ) ; -2sin(φ) ; 1)   ✔ (-2r cos(φ) ; -2r sin(φ) ; r)   · (2r cos(φ) ; 2r sin(φ) ; -r) [v_cross_order]   · (-2r cos(φ) ; 2r sin(φ) ; r) [v_cross_order]
  [examen mcq]
  pièges : v_cross_order

```

## Aire d'une surface et intégrale ∬ f ds (`v-surf-area`, BA3)

_∬ f ds = ∬_A f(σ) |σ_u ∧ σ_v| du dv : la norme de la normale, quel que soit son sens._

### Niveau 1

```
Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 1, z ≥ 0}. On donne σ(θ, φ) = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π] et σ_θ ∧ σ_φ = (sin(θ)^2 cos(φ) ; sin(θ)^2 sin(φ) ; sin(θ)cos(θ)).
  [guided]  √((sin(θ)²cos(φ))² + (sin(θ)²sin(φ))² + (sin(θ)cos(θ))²)
    (Norme de la normale : |σ_θ ∧ σ_φ| =)
    = □   (trous : sin(θ))
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} cos(θ)·sin(θ) dθ dφ
    = □   (trous : π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = sin(θ). | ∬_Σ z ds = ∫_{0}^{2π} ∫_{0}^{π/2} cos(θ)·sin(θ) dθ dφ.
  pièges : v_normal_not_norm

Calcule l'aire de Σ = {x² + y² + z² = 4, z ≥ 0}. On donne σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π] et σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)).
  [guided]  √((4sin(θ)²cos(φ))² + (4sin(θ)²sin(φ))² + (4sin(θ)cos(θ))²)
    (Norme de la normale : |σ_θ ∧ σ_φ| =)
    = □   (trous : 4sin(θ))
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 4sin(θ) dθ dφ
    = □   (trous : 8π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = 4sin(θ). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{π/2} 4sin(θ) dθ dφ.
  pièges : v_normal_not_norm

Calcule l'aire de Σ = {z = x² + y², z ≤ 12}. On donne σ(r, φ) = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; sqrt(12)] × [0 ; 2π] et σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r).
  [guided]  √((−2r²cos(φ))² + (−2r²sin(φ))² + (r)²)
    (Norme de la normale : |σ_r ∧ σ_φ| =)
    = r□   (trous : r√(1 + 4r²))
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{√(12)} r√(1 + 4r²) dr dφ
    = □   (trous : 57π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_r ∧ σ_φ| = r√(1 + 4r²). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{√12} r√(1 + 4r²) dr dφ.
  pièges : v_normal_not_norm

```

### Niveau 2

```
Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 4, z ≥ 0}. On donne σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π].
  [guided]  σ_θ et σ_φ
    (Normale σ_θ ∧ σ_φ :)
    = σ_θ∧σ_φ=(4sin(θ)^2cos(φ);4sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((4sin(θ)²cos(φ))² + (4sin(θ)²sin(φ))² + (4sin(θ)cos(θ))²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_θ ∧ σ_φ| / · Le vecteur σ_θ ∧ σ_φ / · Sa 3e composante 4sin(θ)cos(θ)
    = □   (trous : 4sin(θ))
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 2cos(θ)·4sin(θ) dθ dφ
    = □   (trous : 8π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = 4sin(θ). | ∬_Σ z ds = ∫_{0}^{2π} ∫_{0}^{π/2} 2cos(θ)·4sin(θ) dθ dφ.
  pièges : v_cross_order, v_normal_not_norm

Calcule l'aire de Σ = {x² + y² + z² = 4}. On donne σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π] × [0 ; 2π].
  [guided]  σ_θ et σ_φ
    (Normale σ_θ ∧ σ_φ :)
    = σ_θ∧σ_φ=(4sin(θ)^2cos(φ);4sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)))   ← 4 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((4sin(θ)²cos(φ))² + (4sin(θ)²sin(φ))² + (4sin(θ)cos(θ))²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_θ ∧ σ_φ| / · Le vecteur σ_θ ∧ σ_φ / · Sa 3e composante 4sin(θ)cos(θ)
    = □   (trous : 4sin(θ))
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π} 4sin(θ) dθ dφ
    = □   (trous : 16π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = 4sin(θ). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{π} 4sin(θ) dθ dφ.
  pièges : v_cross_order, v_normal_not_norm

Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 1, z ≥ 0}. On donne σ(θ, φ) = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π].
  [guided]  σ_θ et σ_φ
    (Normale σ_θ ∧ σ_φ :)
    = σ_θ∧σ_φ=(sin(θ)^2cos(φ);sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (sin(θ)^2 cos(φ) ; sin(θ)^2 sin(φ) ; sin(θ)cos(θ)))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((sin(θ)²cos(φ))² + (sin(θ)²sin(φ))² + (sin(θ)cos(θ))²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_θ ∧ σ_φ| / · Le vecteur σ_θ ∧ σ_φ / · Sa 3e composante sin(θ)cos(θ)
    = □   (trous : sin(θ))
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} cos(θ)·sin(θ) dθ dφ
    = □   (trous : π)
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = sin(θ). | ∬_Σ z ds = ∫_{0}^{2π} ∫_{0}^{π/2} cos(θ)·sin(θ) dθ dφ.
  pièges : v_cross_order, v_normal_not_norm

```

### Niveau 3

```
Calcule l'aire de Σ = {x² + y² + z² = 4, z ≥ 0}.
  [tap, suivre l'erreur, menu menu]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? · Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / · Graphe : σ(x, y) = (x, y, g(x, y)) / ✔ Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ))   ← 4 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((4sin(θ)²cos(φ))² + (4sin(θ)²sin(φ))² + (4sin(θ)cos(θ))²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_θ ∧ σ_φ| / · Le vecteur σ_θ ∧ σ_φ / · Sa 3e composante 4sin(θ)cos(θ)
    = 4sin(θ)
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 4sin(θ) dθ dφ
    = 8π
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = 4sin(θ). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{π/2} 4sin(θ) dθ dφ.
  pièges : v_sphere_theta, v_normal_not_norm

Calcule l'aire de Σ = {z = (x² + y²)/2, z ≤ 4}.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; (1/2)r^2), (r ; φ) ∈ [0 ; sqrt(8)] × [0 ; 2π]   ← z ≤ 4 donne r ≤ √8
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-r^2 cos(φ) ; -r^2 sin(φ) ; r)
  — Norme de la normale : |σ_r ∧ σ_φ| =  [juge equiv]  départ : √((−r²cos(φ))² + (−r²sin(φ))² + (r)²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_r ∧ σ_φ| / · Le vecteur σ_r ∧ σ_φ / · Sa 3e composante r
    = r√(1 + r²)
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{√(8)} r√(1 + r²) dr dφ
    = 52π/3
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_r ∧ σ_φ| = r√(1 + r²). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{√8} r√(1 + r²) dr dφ.
  pièges : v_normal_not_norm

Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 9, z ≥ 0}.
  [tap, suivre l'erreur, menu menu]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((9sin(θ)²cos(φ))² + (9sin(θ)²sin(φ))² + (9sin(θ)cos(θ))²)
    ? Qu'est-ce qui multiplie du dv dans ds ? ✔ La norme |σ_θ ∧ σ_φ| / · Le vecteur σ_θ ∧ σ_φ / · Sa 3e composante 9sin(θ)cos(θ)
    = 9sin(θ)
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 3cos(θ)·9sin(θ) dθ dφ
    = 27π
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_θ ∧ σ_φ| = 9sin(θ). | ∬_Σ z ds = ∫_{0}^{2π} ∫_{0}^{π/2} 3cos(θ)·9sin(θ) dθ dφ.
  pièges : v_sphere_theta, v_normal_not_norm

```

### Niveau 4

```
Calcule l'aire de Σ = {z = x² + y², z ≤ 2}.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; sqrt(2)] × [0 ; 2π]   ← z ≤ 2 donne r ≤ √2
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  — Norme de la normale : |σ_r ∧ σ_φ| =  [juge equiv]  départ : √((−2r²cos(φ))² + (−2r²sin(φ))² + (r)²)
    = r√(1 + 4r²)
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{√(2)} r√(1 + 4r²) dr dφ
    = 13π/3
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_r ∧ σ_φ| = r√(1 + 4r²). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{√2} r√(1 + 4r²) dr dφ.

Calcule l'aire de Σ = {z = √(x² + y²), z ≤ 1}.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; r), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]   ← z ≤ 1 donne r ≤ 1
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r)
  — Norme de la normale : |σ_r ∧ σ_φ| =  [juge equiv]  départ : √((−rcos(φ))² + (−rsin(φ))² + (r)²)
    = r√(2)
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} r√(2) dr dφ
    = π√2
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_r ∧ σ_φ| = r√2. | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{1} r√2 dr dφ.

Calcule l'aire de Σ = {z = x² + y², z ≤ 2}.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? Quelle paramétrisation ? ✔ Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r)) / ✔ Graphe : σ(x, y) = (x, y, g(x, y)) / · Coordonnées sphériques : σ(θ, φ), θ depuis l'axe z
    = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; sqrt(2)] × [0 ; 2π]   ← z ≤ 2 donne r ≤ √2
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  — Norme de la normale : |σ_r ∧ σ_φ| =  [juge equiv]  départ : √((−2r²cos(φ))² + (−2r²sin(φ))² + (r)²)
    = r√(1 + 4r²)
  — Aire : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{√(2)} r√(1 + 4r²) dr dφ
    = 13π/3
  aides : ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A. | |σ_r ∧ σ_φ| = r√(1 + 4r²). | aire(Σ) = ∫_{0}^{2π} ∫_{0}^{√2} r√(1 + 4r²) dr dφ.

```

### Niveau 5

```
Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 4, z ≥ 0}.
  [free, sans aide]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((4sin(θ)²cos(φ))² + (4sin(θ)²sin(φ))² + (4sin(θ)cos(θ))²)
    = 4sin(θ)
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 2cos(θ)·4sin(θ) dθ dφ
    = 8π
  pièges : v_sphere_theta

Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 9, z ≥ 0}.
  [free, sans aide]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((9sin(θ)²cos(φ))² + (9sin(θ)²sin(φ))² + (9sin(θ)cos(θ))²)
    = 9sin(θ)
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 3cos(θ)·9sin(θ) dθ dφ
    = 27π
  pièges : v_sphere_theta

Calcule ∬_Σ z ds pour Σ = {x² + y² + z² = 1, z ≥ 0}.
  [free, sans aide]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (sin(θ)^2 cos(φ) ; sin(θ)^2 sin(φ) ; sin(θ)cos(θ))
  — Norme de la normale : |σ_θ ∧ σ_φ| =  [juge equiv]  départ : √((sin(θ)²cos(φ))² + (sin(θ)²sin(φ))² + (sin(θ)cos(θ))²)
    = sin(θ)
  — ∬ z ds : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} cos(θ)·sin(θ) dθ dφ
    = π
  pièges : v_sphere_theta

```

### Variantes d'examen

```
Aire de Σ = {z = √(x² + y²), z ≤ 3} :
  · 9π [v_normal_not_norm]   ✔ 9π√2   · 18π√2   · 6π [v_jacobian_surface]
  [examen mcq]
  pièges : v_jacobian_surface, v_normal_not_norm

```

## Flux ∬ F · ds (`v-flux`, BA3)

_∬ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme ; le sens de la normale donne le signe._

### Niveau 1

```
Calcule le flux ∬_Σ F · ds de F = (0, 0, z) à travers Σ = {z = x² + y², z ≤ 4}, normale vers le haut. On donne σ(r, φ) = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; 2] × [0 ; 2π] et σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r).
  [guided]  F(σ)·(σ_r et σ_φ)
    (F(σ) · (σ_r ∧ σ_φ) :)
    = F(σ)×(σ_r∧σ_φ)=(0;0;r^2)×(-2r^2cos(φ);-2r^2sin(φ);r)=□   (trous : F(σ) · (σ_r ∧ σ_φ) = (0 ; 0 ; r^2)·(-2r^2 cos(φ) ; -2r^2 sin(φ) ; r) = r^3)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} r³ dr dφ
    = □   (trous : 8π)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; r^2). | F(σ) · (σ_r ∧ σ_φ) = r³.
  pièges : v_normal_flip

Calcule le flux ∬_Σ F · ds de F = (0, 0, 1) à travers Σ = {z = √(x² + y²), z ≤ 1}, normale vers le haut. On donne σ(r, φ) = (r cos(φ) ; r sin(φ) ; r), (r ; φ) ∈ [0 ; 1] × [0 ; 2π] et σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r).
  [guided]  F(σ)·(σ_r et σ_φ)
    (F(σ) · (σ_r ∧ σ_φ) :)
    = F(σ)×(σ_r∧σ_φ)=(0;0;1)×(-□cos(φ);-rsin(φ);r)=r   (trous : F(σ) · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·(-r cos(φ) ; -r sin(φ) ; r) = r)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    = □   (trous : π)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; 1). | F(σ) · (σ_r ∧ σ_φ) = r.
  pièges : v_normal_flip

Calcule le flux ∬_Σ F · ds de F = (0, 0, z) à travers Σ = {z = 2√(x² + y²), z ≤ 4}, normale vers le bas. On donne σ(φ, r) = (r cos(φ) ; r sin(φ) ; 2r), (φ ; r) ∈ [0 ; 2π] × [0 ; 2] et σ_φ ∧ σ_r = (2r cos(φ) ; 2r sin(φ) ; -r).
  [guided]  F(σ)·(σ_φ et σ_r)
    (F(σ) · (σ_φ ∧ σ_r) :)
    = F(σ)×(σ_φ∧σ_r)=(0;0;2r)×(2rcos(φ);2rsin(φ);-r)=□   (trous : F(σ) · (σ_φ ∧ σ_r) = (0 ; 0 ; 2r)·(2r cos(φ) ; 2r sin(φ) ; -r) = -2r^2)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} −2r² dr dφ
    = □   (trous : −32π/3)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; 2r). | F(σ) · (σ_φ ∧ σ_r) = −2r².
  pièges : v_normal_flip

```

### Niveau 2

```
Calcule le flux ∬_Σ F · ds de F = (x, y, 0) à travers Σ = {z = x² + y², z ≤ 1}, normale vers le bas.
  [guided]  σ(φ, r)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (rcos(φ);rsin(φ);r^2),(φ;r)∈[0;□]×[0;□]   (trous : (r cos(φ) ; r sin(φ) ; r^2), (φ ; r) ∈ [0 ; 2π] × [0 ; 1])
  — Normale σ_φ ∧ σ_r :  [juge vector]  départ : σ_φ et σ_r
    ? Vers où pointe la normale σ_φ ∧ σ_r ? · Vers le haut / ✔ Vers le bas
    = σ_φ∧σ_r=(□;2r^2sin(φ);-r)   (trous : σ_φ ∧ σ_r = (2r^2 cos(φ) ; 2r^2 sin(φ) ; -r))
  — F(σ) · (σ_φ ∧ σ_r) :  [juge vector]  départ : F(σ)·(σ_φ et σ_r)
    = F(σ)×(σ_φ∧σ_r)=(rcos(φ);rsin(φ);0)×(2r^2cos(φ);2r^2sin(φ);-r)=□   (trous : F(σ) · (σ_φ ∧ σ_r) = (r cos(φ) ; r sin(φ) ; 0)·(2r^2 cos(φ) ; 2r^2 sin(φ) ; -r) = 2r^3)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 2r³ dr dφ
    = □   (trous : π)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (r cos(φ) ; r sin(φ) ; 0). | F(σ) · (σ_φ ∧ σ_r) = 2r³.
  pièges : v_cross_order

Calcule le flux ∬_Σ F · ds de F = (0, 0, z) à travers Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut.
  [guided]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (rcos(φ);rsin(φ);-r^2+1),(r;φ)∈[0;□]×[0;□]   (trous : (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π])
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r∧σ_φ=(□;2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r))
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ)×(σ_r∧σ_φ)=(0;0;-r^2+1)×(2r^2cos(φ);2r^2sin(φ);r)=□   (trous : F(σ) · (σ_r ∧ σ_φ) = (0 ; 0 ; -r^2+1)·(2r^2 cos(φ) ; 2r^2 sin(φ) ; r) = -r^3+r)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (−r³ + r) dr dφ
    = □   (trous : π/2)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; -r^2+1). | F(σ) · (σ_r ∧ σ_φ) = −r³ + r.
  pièges : v_cross_order

Calcule le flux ∬_Σ F · ds de F = (0, 0, z) à travers Σ = {z = x² + y², z ≤ 4}, normale vers le haut.
  [guided]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (rcos(φ);rsin(φ);r^2),(r;φ)∈[0;□]×[0;□]   (trous : (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; 2] × [0 ; 2π])
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r∧σ_φ=(□;-2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r))
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ)×(σ_r∧σ_φ)=(0;0;r^2)×(-2r^2cos(φ);-2r^2sin(φ);r)=□   (trous : F(σ) · (σ_r ∧ σ_φ) = (0 ; 0 ; r^2)·(-2r^2 cos(φ) ; -2r^2 sin(φ) ; r) = r^3)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} r³ dr dφ
    = □   (trous : 8π)
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; r^2). | F(σ) · (σ_r ∧ σ_φ) = r³.
  pièges : v_cross_order

```

### Niveau 3

```
Calcule le flux ∬_Σ F · ds de F = (0, 0, 1) à travers Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? On demande la normale vers le haut. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? ✔ Garder l'ordre (r, φ) / · Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ) · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·(2r^2 cos(φ) ; 2r^2 sin(φ) ; r) = r
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    = π
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (0 ; 0 ; 1). | F(σ) · (σ_r ∧ σ_φ) = r.
  pièges : v_normal_flip, v_cross_order

Calcule le flux ∬_Σ F · ds de F = (x, y, z) à travers l'hémisphère Σ = {x² + y² + z² = 9, z ≥ 0}, normale extérieure.
  [tap, suivre l'erreur, menu menu]  σ(θ, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
    = σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  — F(σ) · (σ_θ ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_θ et σ_φ)
    = F(σ) · (σ_θ ∧ σ_φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ))·(9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)) = 27sin(θ)
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 27sin(θ) dθ dφ
    = 54π
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)). | F(σ) · (σ_θ ∧ σ_φ) = 27sin(θ).
  pièges : v_sphere_theta, v_cross_order

Calcule le flux ∬_Σ F · ds de F = (x, y, z) à travers Σ = {z = 2(x² + y²), z ≤ 8}, normale vers le haut.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? On demande la normale vers le haut. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? ✔ Garder l'ordre (r, φ) / · Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; 2r^2), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-4r^2 cos(φ) ; -4r^2 sin(φ) ; r)
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ) · (σ_r ∧ σ_φ) = (r cos(φ) ; r sin(φ) ; 2r^2)·(-4r^2 cos(φ) ; -4r^2 sin(φ) ; r) = -2r^3
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} −2r³ dr dφ
    = −16π
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (r cos(φ) ; r sin(φ) ; 2r^2). | F(σ) · (σ_r ∧ σ_φ) = −2r³.
  pièges : v_normal_flip, v_cross_order

```

### Niveau 4

```
Calcule le flux ∬_Σ F · ds de F = (x, y, z) à travers Σ = {z = x² + y², z ≤ 4}, normale vers le haut.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? On demande la normale vers le haut. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? ✔ Garder l'ordre (r, φ) / · Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; r^2), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r^2 cos(φ) ; -2r^2 sin(φ) ; r)
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ) · (σ_r ∧ σ_φ) = (r cos(φ) ; r sin(φ) ; r^2)·(-2r^2 cos(φ) ; -2r^2 sin(φ) ; r) = -r^3
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} −r³ dr dφ
    = −8π
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (r cos(φ) ; r sin(φ) ; r^2). | F(σ) · (σ_r ∧ σ_φ) = −r³.
  pièges : v_normal_flip, v_cross_order

Calcule le flux ∬_Σ F · ds de F = (x, y, z) à travers Σ = {z = 2√(x² + y²), z ≤ 2}, normale vers le haut.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? On demande la normale vers le haut. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? ✔ Garder l'ordre (r, φ) / · Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; 2r), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ) · (σ_r ∧ σ_φ) = (r cos(φ) ; r sin(φ) ; 2r)·(-2r cos(φ) ; -2r sin(φ) ; r) = 0
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 0 dr dφ
    = 0
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (r cos(φ) ; r sin(φ) ; 2r). | F(σ) · (σ_r ∧ σ_φ) = 0.
  pièges : v_normal_flip, v_cross_order

Calcule le flux ∬_Σ F · ds de F = (x, y, 0) à travers Σ = {z = 2√(x² + y²), z ≤ 2}, normale vers le haut.
  [free, suivre l'erreur]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    ? On demande la normale vers le haut. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? ✔ Garder l'ordre (r, φ) / · Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; 2r), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r)
  — F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : F(σ)·(σ_r et σ_φ)
    = F(σ) · (σ_r ∧ σ_φ) = (r cos(φ) ; r sin(φ) ; 0)·(-2r cos(φ) ; -2r sin(φ) ; r) = -2r^2
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} −2r² dr dφ
    = −4π/3
  aides : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale. | F(σ) = (r cos(φ) ; r sin(φ) ; 0). | F(σ) · (σ_r ∧ σ_φ) = −2r².
  pièges : v_normal_flip, v_cross_order

```

### Niveau 5

```
Soit Ω = {√(x² + y²) ≤ z ≤ 2} et F = (0, 0, z). Calcule le flux de F sortant de Ω à travers son bord : le cône z = √(x² + y²) puis le disque z = 2.
  [free, sans aide]  σ(φ, r)
    (Le cône, avec sa normale extérieure (vers le bas) : σ et A :)
    ? On demande la normale extérieure. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? · Garder l'ordre (r, φ) / ✔ Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; r), (φ ; r) ∈ [0 ; 2π] × [0 ; 2]   ← z ≤ 2 donne r ≤ 2
  — Normale σ_φ ∧ σ_r :  [juge vector]  départ : σ_φ et σ_r
    ? Vers où pointe la normale σ_φ ∧ σ_r ? · Vers le haut / ✔ Vers le bas
    = σ_φ ∧ σ_r = (r cos(φ) ; r sin(φ) ; -r)
  — F(σ) · (σ_φ ∧ σ_r) :  [juge vector]  départ : F(σ)·(σ_φ et σ_r)
    = F(σ) · (σ_φ ∧ σ_r) = (0 ; 0 ; r)·(r cos(φ) ; r sin(φ) ; -r) = -r^2
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} −r² dr dφ
    = −16π/3
  — Le disque du haut (z = 2, r ≤ 2), ν = (0, 0, 1) : son flux  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2r dr dφ
    = 8π
  — Le flux sortant total :  [juge definite]  départ : −16π/3 + 8π
    = 8π/3
  pièges : v_normal_flip, v_cross_order

Soit Ω = {√(x² + y²) ≤ z ≤ 2} et F = (0, 0, z). Calcule le flux de F sortant de Ω à travers son bord : le cône z = √(x² + y²) puis le disque z = 2.
  [free, sans aide]  σ(φ, r)
    (Le cône, avec sa normale extérieure (vers le bas) : σ et A :)
    ? On demande la normale extérieure. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? · Garder l'ordre (r, φ) / ✔ Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; r), (φ ; r) ∈ [0 ; 2π] × [0 ; 2]   ← z ≤ 2 donne r ≤ 2
  — Normale σ_φ ∧ σ_r :  [juge vector]  départ : σ_φ et σ_r
    ? Vers où pointe la normale σ_φ ∧ σ_r ? · Vers le haut / ✔ Vers le bas
    = σ_φ ∧ σ_r = (r cos(φ) ; r sin(φ) ; -r)
  — F(σ) · (σ_φ ∧ σ_r) :  [juge vector]  départ : F(σ)·(σ_φ et σ_r)
    = F(σ) · (σ_φ ∧ σ_r) = (0 ; 0 ; r)·(r cos(φ) ; r sin(φ) ; -r) = -r^2
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} −r² dr dφ
    = −16π/3
  — Le disque du haut (z = 2, r ≤ 2), ν = (0, 0, 1) : son flux  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2r dr dφ
    = 8π
  — Le flux sortant total :  [juge definite]  départ : −16π/3 + 8π
    = 8π/3
  pièges : v_normal_flip, v_cross_order

Soit Ω = {2√(x² + y²) ≤ z ≤ 2} et F = (0, 0, z). Calcule le flux de F sortant de Ω à travers son bord : le cône z = 2√(x² + y²) puis le disque z = 2.
  [free, sans aide]  σ(φ, r)
    (Le cône, avec sa normale extérieure (vers le bas) : σ et A :)
    ? On demande la normale extérieure. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ? · Garder l'ordre (r, φ) / ✔ Échanger l'ordre : σ(φ, r)
    = (r cos(φ) ; r sin(φ) ; 2r), (φ ; r) ∈ [0 ; 2π] × [0 ; 1]   ← z ≤ 2 donne r ≤ 1
  — Normale σ_φ ∧ σ_r :  [juge vector]  départ : σ_φ et σ_r
    ? Vers où pointe la normale σ_φ ∧ σ_r ? · Vers le haut / ✔ Vers le bas
    = σ_φ ∧ σ_r = (2r cos(φ) ; 2r sin(φ) ; -r)
  — F(σ) · (σ_φ ∧ σ_r) :  [juge vector]  départ : F(σ)·(σ_φ et σ_r)
    = F(σ) · (σ_φ ∧ σ_r) = (0 ; 0 ; 2r)·(2r cos(φ) ; 2r sin(φ) ; -r) = -2r^2
  — Flux : intégrale double sur A, puis sa valeur :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} −2r² dr dφ
    = −4π/3
  — Le disque du haut (z = 2, r ≤ 1), ν = (0, 0, 1) : son flux  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 2r dr dφ
    = 2π
  — Le flux sortant total :  [juge definite]  départ : −4π/3 + 2π
    = 2π/3
  pièges : v_normal_flip, v_cross_order

```

### Variantes d'examen

```
Flux de F = (x, y, 0) à travers Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut :
  ✔ π   · π/3   · −π [v_normal_flip]   · 2π
  [examen mcq]
  pièges : v_normal_flip

```

## Bord orienté ∂Σ = σ(∂A) (`v-boundary`, BA3)

_On fait le tour de A, on applique σ à chaque côté, on retire les points et les côtés qui s'annulent._

### Niveau 1

```
Soit l'hémisphère Σ = {x² + y² + z² = 9, z ≥ 0}, paramétrée par σ(φ, θ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (φ ; θ) ∈ [0 ; 2π] × [0 ; π/2]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : θ = 0, φ de 0 à 2π ; Γ2 : φ = 2π, θ de 0 à π/2 ; Γ3 : θ = π/2, φ de 2π à 0 ; Γ4 : φ = 0, θ de π/2 à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    (Γ1 (θ = 0, φ de 0 à 2π) : son image σ(Γ1) est un point : on le retire.)
    (Γ2 (φ = 2π, θ de 0 à π/2) : son image σ(Γ2) est un côté qui s'annule avec un autre.)
    (Γ3 (θ = π/2, φ de 2π à 0) : son image σ(Γ3) est un morceau du bord ∂Σ.)
    (Γ4 (φ = 0, θ de π/2 à 0) : son image σ(Γ4) est un côté qui s'annule avec un autre.)
    = Γ1 : point
    = Γ2 et Γ4 : s'annulent
    = (□;-3sin(t);0),t∈[0;□]   (trous : (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : le pôle nord ; σ(Γ2) : un méridien ; σ(Γ3) : l'équateur ; σ(Γ4) : le même méridien. | (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π].

Soit Σ = {z = 9 − x² − y², z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+9), (r ; φ) ∈ [0 ; 3] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à 2π ; Γ3 : φ = 2π, r de 3 à 0 ; Γ4 : r = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    (Γ1 (φ = 0, r de 0 à 3) : son image σ(Γ1) est un côté qui s'annule avec un autre.)
    (Γ2 (r = 3, φ de 0 à 2π) : son image σ(Γ2) est un morceau du bord ∂Σ.)
    (Γ3 (φ = 2π, r de 3 à 0) : son image σ(Γ3) est un côté qui s'annule avec un autre.)
    (Γ4 (r = 0, φ de 2π à 0) : son image σ(Γ4) est un point : on le retire.)
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = (□;3sin(t);0),t∈[0;□]   (trous : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : le cercle du bord ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 9). | (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π].

Soit Σ = {z = 4 − x² − y², z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à 2π ; Γ3 : φ = 2π, r de 2 à 0 ; Γ4 : r = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    (Γ1 (φ = 0, r de 0 à 2) : son image σ(Γ1) est un côté qui s'annule avec un autre.)
    (Γ2 (r = 2, φ de 0 à 2π) : son image σ(Γ2) est un morceau du bord ∂Σ.)
    (Γ3 (φ = 2π, r de 2 à 0) : son image σ(Γ3) est un côté qui s'annule avec un autre.)
    (Γ4 (r = 0, φ de 2π à 0) : son image σ(Γ4) est un point : on le retire.)
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = (□;2sin(t);0),t∈[0;□]   (trous : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : le cercle du bord ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 4). | (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π].

```

### Niveau 2

```
Soit Σ = {z = (√(x² + y²) + 1)(3 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(φ, r) = (r cos(φ) ; r sin(φ) ; -r^2+2r+3), (φ ; r) ∈ [0 ; π] × [0 ; 3]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : r = 0, φ de 0 à π ; Γ2 : φ = π, r de 0 à 3 ; Γ3 : r = 3, φ de π à 0 ; Γ4 : φ = 0, r de 3 à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (r = 0, φ de 0 à π) : son image σ(Γ1) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ2 (φ = π, r de 0 à 3) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (r = 3, φ de π à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (φ = 0, r de 3 à 0) : son image σ(Γ4) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    = Γ1 : point
    = (□;□;-t^2+2t+3),t∈[0;3]   (trous : (-t ; 0 ; -t^2+2t+3), t ∈ [0 ; 3])
    = (□;□;0),t∈[0;π]   (trous : (-3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π])
    = (□;□;-t^2+4t),t∈[0;3]   (trous : (3-t ; 0 ; -t^2+4t), t ∈ [0 ; 3])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : le point (0 ; 0 ; 3) ; σ(Γ2) : un arc dans le plan y = 0 ; σ(Γ3) : un demi-cercle ; σ(Γ4) : un arc dans le plan y = 0. | (-t ; 0 ; -t^2+2t+3), t ∈ [0 ; 3] ; (-3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π] ; (3-t ; 0 ; -t^2+4t), t ∈ [0 ; 3].
  pièges : v_boundary_pieces

Soit Σ = {z = √(x² + y²)(2 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(φ, r) = (r cos(φ) ; r sin(φ) ; -r^2+2r), (φ ; r) ∈ [0 ; π] × [0 ; 2]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : r = 0, φ de 0 à π ; Γ2 : φ = π, r de 0 à 2 ; Γ3 : r = 2, φ de π à 0 ; Γ4 : φ = 0, r de 2 à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (r = 0, φ de 0 à π) : son image σ(Γ1) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ2 (φ = π, r de 0 à 2) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (r = 2, φ de π à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (φ = 0, r de 2 à 0) : son image σ(Γ4) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    = Γ1 : point
    = (□;□;-t^2+2t),t∈[0;2]   (trous : (-t ; 0 ; -t^2+2t), t ∈ [0 ; 2])
    = (□;□;0),t∈[0;π]   (trous : (-2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π])
    = (□;□;-t^2+2t),t∈[0;2]   (trous : (2-t ; 0 ; -t^2+2t), t ∈ [0 ; 2])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : le point (0 ; 0 ; 0) ; σ(Γ2) : un arc dans le plan y = 0 ; σ(Γ3) : un demi-cercle ; σ(Γ4) : un arc dans le plan y = 0. | (-t ; 0 ; -t^2+2t), t ∈ [0 ; 2] ; (-2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π] ; (2-t ; 0 ; -t^2+2t), t ∈ [0 ; 2].
  pièges : v_boundary_pieces

Soit l'hémisphère Σ = {x² + y² + z² = 1, z ≥ 0}, paramétrée par σ(θ, φ) = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, θ en abscisse) : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, θ de 0 à π/2) : son image σ(Γ1) est · un point : on le retire / ✔ un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ2 (θ = π/2, φ de 0 à 2π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = 2π, θ de π/2 à 0) : son image σ(Γ3) est · un point : on le retire / ✔ un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ4 (θ = 0, φ de 2π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = (□;□;0),t∈[0;2π]   (trous : (cos(t) ; sin(t) ; 0), t ∈ [0 ; 2π])
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un méridien ; σ(Γ2) : l'équateur ; σ(Γ3) : le même méridien ; σ(Γ4) : le pôle nord. | (cos(t) ; sin(t) ; 0), t ∈ [0 ; 2π].
  pièges : v_boundary_pieces

```

### Niveau 3

```
Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(φ, r) = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (φ ; r) ∈ [0 ; π] × [0 ; 2]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : r = 0, φ de 0 à π ; Γ2 : φ = π, r de 0 à 2 ; Γ3 : r = 2, φ de π à 0 ; Γ4 : φ = 0, r de 2 à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [tap, suivre l'erreur, menu menu]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (r = 0, φ de 0 à π) : son image σ(Γ1) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ2 (φ = π, r de 0 à 2) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (r = 2, φ de π à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (φ = 0, r de 2 à 0) : son image σ(Γ4) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    = Γ1 : point
    = Γ2 : (-t ; 0 ; -t^2+t+2), t ∈ [0 ; 2]
    = Γ3 : (-2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
    = Γ4 : (2-t ; 0 ; -t^2+3t), t ∈ [0 ; 2]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : le point (0 ; 0 ; 2) ; σ(Γ2) : un arc dans le plan y = 0 ; σ(Γ3) : un demi-cercle ; σ(Γ4) : un arc dans le plan y = 0. | (-t ; 0 ; -t^2+t+2), t ∈ [0 ; 2] ; (-2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π] ; (2-t ; 0 ; -t^2+3t), t ∈ [0 ; 2].
  pièges : v_boundary_pieces

Soit Σ = {z = (√(x² + y²) + 1)(3 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+2r+3), (r ; φ) ∈ [0 ; 3] × [0 ; π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à π ; Γ3 : φ = π, r de 3 à 0 ; Γ4 : r = 0, φ de π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [tap, suivre l'erreur, menu menu]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, r de 0 à 3) : son image σ(Γ1) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ2 (r = 3, φ de 0 à π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = π, r de 3 à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (r = 0, φ de π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+2t+3), t ∈ [0 ; 3]
    = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-3 ; 0 ; -t^2+4t), t ∈ [0 ; 3]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : un demi-cercle ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 3). | (t ; 0 ; -t^2+2t+3), t ∈ [0 ; 3] ; (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π] ; (t-3 ; 0 ; -t^2+4t), t ∈ [0 ; 3].
  pièges : v_boundary_pieces

Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [tap, suivre l'erreur, menu menu]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, r de 0 à 2) : son image σ(Γ1) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ2 (r = 2, φ de 0 à π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = π, r de 2 à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (r = 0, φ de π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2]
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : un demi-cercle ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 2). | (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2] ; (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π] ; (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2].
  pièges : v_boundary_pieces

```

### Niveau 4

```
Soit Σ = {z = √(x² + y²)(3 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+3r), (r ; φ) ∈ [0 ; 3] × [0 ; π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à π ; Γ3 : φ = π, r de 3 à 0 ; Γ4 : r = 0, φ de π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [free, suivre l'erreur]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+3t), t ∈ [0 ; 3]
    = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-3 ; 0 ; -t^2+3t), t ∈ [0 ; 3]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : un demi-cercle ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 0). | (t ; 0 ; -t^2+3t), t ∈ [0 ; 3] ; (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π] ; (t-3 ; 0 ; -t^2+3t), t ∈ [0 ; 3].

Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [free, suivre l'erreur]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2]
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : un arc dans le plan y = 0 ; σ(Γ2) : un demi-cercle ; σ(Γ3) : un arc dans le plan y = 0 ; σ(Γ4) : le point (0 ; 0 ; 2). | (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2] ; (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π] ; (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2].

Soit l'hémisphère Σ = {x² + y² + z² = 1, z ≥ 0}, paramétrée par σ(φ, θ) = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (φ ; θ) ∈ [0 ; 2π] × [0 ; π/2]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : θ = 0, φ de 0 à 2π ; Γ2 : φ = 2π, θ de 0 à π/2 ; Γ3 : θ = π/2, φ de 2π à 0 ; Γ4 : φ = 0, θ de π/2 à 0. Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».
  [free, suivre l'erreur]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ1 : point
    = Γ2 et Γ4 : s'annulent
    = Γ3 : (cos(t) ; -sin(t) ; 0), t ∈ [0 ; 2π]
  aides : Fais le tour de A dans le sens positif ; regarde l'image de chaque côté. | σ(Γ1) : le pôle nord ; σ(Γ2) : un méridien ; σ(Γ3) : l'équateur ; σ(Γ4) : le même méridien. | (cos(t) ; -sin(t) ; 0), t ∈ [0 ; 2π].

```

### Niveau 5

```
Soit Σ = {z = 1 − x² − y², z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 1 ; Γ2 : r = 1, φ de 0 à 2π ; Γ3 : φ = 2π, r de 1 à 0 ; Γ4 : r = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A), puis calcule ∮_∂Σ F · dl pour F = 2(−y, x, 0).
  [free, sans aide]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (cos(t) ; sin(t) ; 0), t ∈ [0 ; 2π]
  — Le travail de F = 2(−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt =  [juge definite]  départ : ∫_{0}^{2π} 2(−(sin(t))·(−sin(t)) + (cos(t))·(cos(t))) dt
    = 4π

Soit l'hémisphère Σ = {x² + y² + z² = 4, z ≥ 0}, paramétrée par σ(φ, θ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (φ ; θ) ∈ [0 ; 2π] × [0 ; π/2]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, φ en abscisse) : Γ1 : θ = 0, φ de 0 à 2π ; Γ2 : φ = 2π, θ de 0 à π/2 ; Γ3 : θ = π/2, φ de 2π à 0 ; Γ4 : φ = 0, θ de π/2 à 0. Donne le bord orienté ∂Σ = σ(∂A), puis calcule ∮_∂Σ F · dl pour F = (−y, x, 0).
  [free, sans aide]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ1 : point
    = Γ2 et Γ4 : s'annulent
    = Γ3 : (2cos(t) ; -2sin(t) ; 0), t ∈ [0 ; 2π]
  — Le travail de F = (−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt =  [juge definite]  départ : ∫_{0}^{2π} (−(−2sin(t))·(−2sin(t)) + (2cos(t))·(−2cos(t))) dt
    = −8π

Soit Σ = {z = 4 − x² − y², z ≥ 0}, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, r en abscisse) : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à 2π ; Γ3 : φ = 2π, r de 2 à 0 ; Γ4 : r = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A), puis calcule ∮_∂Σ F · dl pour F = 2(−y, x, 0).
  [free, sans aide]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π]
  — Le travail de F = 2(−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt =  [juge definite]  départ : ∫_{0}^{2π} 2(−(2sin(t))·(−2sin(t)) + (2cos(t))·(2cos(t))) dt
    = 16π

```

### Variantes d'examen

```
Soit l'hémisphère Σ = {x² + y² + z² = 9, z ≥ 0}, paramétrée par σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, θ en abscisse) : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0. Le bord orienté ∂Σ = σ(∂A) est :
  · le cercle (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π] [v_boundary_orient]   · le cercle (3cos(t) ; -3sin(t) ; 0), t ∈ [0 ; 2π] et la courbe (3sin(t) ; 0 ; 3cos(t)), t ∈ [0 ; π/2] [v_boundary_pieces]   ✔ le cercle (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π]   · le cercle (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π] et la courbe (3sin(t) ; 0 ; 3cos(t)), t ∈ [0 ; π/2] [v_boundary_pieces]
  [examen mcq]
  pièges : v_boundary_orient, v_boundary_pieces

Soit l'hémisphère Σ = {x² + y² + z² = 9, z ≥ 0}, paramétrée par σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, θ en abscisse) : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0. Donne le bord orienté ∂Σ = σ(∂A), puis calcule ∮_∂Σ F · dl pour F = 3(−y, x, 0).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 3 ; Le travail de F = 3(−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt = : 1)
    [free, sans aide, suivre l'erreur, examen open]  ∂Σ
      (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
      = Γ4 : point
      = Γ1 et Γ3 : s'annulent
      = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π]
    — Le travail de F = 3(−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt =  [juge definite]  départ : ∫_{0}^{2π} 3(−(3sin(t))·(−3sin(t)) + (3cos(t))·(3cos(t))) dt
      = 54π

```

## Théorème de la divergence (`v-div-thm`, BA3)

_∬_∂Ω F · ν ds = ∭_Ω div F : souvent, le volume est plus simple que les faces._

### Niveau 1

```
Soit F = (−x², 3y², 2z³) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (−x²) + ∂/∂y (3y²) + ∂/∂z (2z³)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = −2x + 6y + □   (trous : −2x + 6y + 6z²)
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (−2x + 6y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{1} (−2rcos(φ) + 6rsin(φ) + 6z²)r dr dφ dz
    = ∫_{0}^{1} π·(6z²) dz
    = □   (trous : 2π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·(6z²) dz. | ∫_{0}^{1} π·(6z²) dz = 2π.

Soit F = (x², y², z³) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (x²) + ∂/∂y (y²) + ∂/∂z (z³)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 2y + □   (trous : 2x + 2y + 3z²)
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (2x + 2y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{1} (2rcos(φ) + 2rsin(φ) + 3z²)r dr dφ dz
    = ∫_{0}^{1} π·(3z²) dz
    = □   (trous : π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·(3z²) dz. | ∫_{0}^{1} π·(3z²) dz = π.

Soit F = (2x², −2y², 2z²) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (2x²) + ∂/∂y (−2y²) + ∂/∂z (2z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 4x − 4y + □   (trous : 4x − 4y + 4z)
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (4x − 4y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{1} (4rcos(φ) − 4rsin(φ) + 4z)r dr dφ dz
    = ∫_{0}^{1} π·4z dz
    = □   (trous : 2π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·4z dz. | ∫_{0}^{1} π·4z dz = 2π.

```

### Niveau 2

```
Soit F = (x², 3y², 2z²) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 2}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (x²) + ∂/∂y (3y²) + ∂/∂z (2z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 6y + □   (trous : 2x + 6y + 4z)
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 2 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (2x + 6y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{1} (2rcos(φ) + 6rsin(φ) + 4z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="2x + 6y"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{2} π·4z dz
    = □   (trous : 8π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{2} π·4z dz. | ∫_{0}^{2} π·4z dz = 8π.

Soit F = (−x², 3y², z²) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (−x²) + ∂/∂y (3y²) + ∂/∂z (z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = −2x + 6y + □   (trous : −2x + 6y + 2z)
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 1 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (−2x + 6y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{1} (−2rcos(φ) + 6rsin(φ) + 2z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="−2x + 6y"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{1} π·2z dz
    = □   (trous : π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·2z dz. | ∫_{0}^{1} π·2z dz = π.

Soit F = (x², y², z²) et le cylindre Ω = {x² + y² ≤ 4, 0 ≤ z ≤ 2}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [guided]  ∂/∂x (x²) + ∂/∂y (y²) + ∂/∂z (z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 2y + □   (trous : 2x + 2y + 2z)
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 2 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) ; ∭ (2x + 2y) = 0 par symétrie :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{2} (2rcos(φ) + 2rsin(φ) + 2z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="2x + 2y"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{2} 4π·2z dz
    = □   (trous : 16π)
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{2} 4π·2z dz. | ∫_{0}^{2} 4π·2z dz = 16π.

```

### Niveau 3

```
Soit F = (x², −2y², 2z³) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (x²) + ∂/∂y (−2y²) + ∂/∂z (2z³)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    ? Comment calculer le flux sortant ? ✔ Théorème de la divergence : ∭_Ω div F / ✔ Face par face (le disque et le cône), avec la normale extérieure de chacune
    = 2x − 4y + 6z²
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 1 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ z
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{z} (2rcos(φ) − 4rsin(φ) + 6z²)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="2x − 4y"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{1} π·(6z²)·z² dz
    = 6π/5
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·(6z²)·z² dz. | ∫_{0}^{1} π·(6z²)·z² dz = 6π/5.

Soit F = (x², −2y², 2z²) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (x²) + ∂/∂y (−2y²) + ∂/∂z (2z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    ? Comment calculer le flux sortant ? ✔ Théorème de la divergence : ∭_Ω div F / ✔ Face par face (deux disques et le côté), avec la normale extérieure de chacune
    = 2x − 4y + 4z
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 1 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{1} (2rcos(φ) − 4rsin(φ) + 4z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="2x − 4y"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{1} π·4z dz
    = 2π
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·4z dz. | ∫_{0}^{1} π·4z dz = 2π.

Soit F = (−x², 3y², z) et le cylindre Ω = {x² + y² ≤ 4, 0 ≤ z ≤ 2}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (−x²) + ∂/∂y (3y²) + ∂/∂z z
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    ? Comment calculer le flux sortant ? ✔ Théorème de la divergence : ∭_Ω div F / ✔ Face par face (deux disques et le côté), avec la normale extérieure de chacune
    = −2x + 6y + 1
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 2 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{2} (−2rcos(φ) + 6rsin(φ) + 1)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="−2x + 6y"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>6</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{2} 4π·1 dz
    = 8π
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{2} 4π·1 dz. | ∫_{0}^{2} 4π·1 dz = 8π.

```

### Niveau 4

```
Soit F = (−x², y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 1}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [free, suivre l'erreur]  ∂/∂x (−x²) + ∂/∂y (y²) + ∂/∂z (z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = −2x + 2y + 2z
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 1 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ z/2
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{z/2} (−2rcos(φ) + 2rsin(φ) + 2z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="−2x + 2y"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{1} π·2z·z²/4 dz
    = π/8
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{1} π·2z·z²/4 dz. | ∫_{0}^{1} π·2z·z²/4 dz = π/8.

Soit F = (x², −2y², 2z³) et le cylindre Ω = {x² + y² ≤ 1, 0 ≤ z ≤ 2}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [free, suivre l'erreur]  ∂/∂x (x²) + ∂/∂y (−2y²) + ∂/∂z (2z³)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x − 4y + 6z²
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 2 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{1} (2rcos(φ) − 4rsin(φ) + 6z²)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="2x − 4y"><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{2} π·(6z²) dz
    = 16π
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{2} π·(6z²) dz. | ∫_{0}^{2} π·(6z²) dz = 16π.

Soit F = (2x², −2y², z²) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 2}. Calcule le flux sortant ∬_∂Ω F · ν ds.
  [free, suivre l'erreur]  ∂/∂x (2x²) + ∂/∂y (−2y²) + ∂/∂z (z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 4x − 4y + 2z
  — Ω en coordonnées cylindriques (z, puis φ, puis r) :  [juge domain]  départ : Ω
    = 0 ≤ z ≤ 2 ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ z
  — ∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{z} (4rcos(φ) − 4rsin(φ) + 2z)r dr dφ dz
    ? Que vaut ∭_Ω (<math alttext="4x − 4y"><mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>y</mi></mrow></mrow></math>) dx dy dz ? ✔ 0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs / ✔ On ne peut pas savoir sans le calculer
    = ∫_{0}^{2} π·2z·z² dz
    = 8π
  aides : Calcule div F, puis intègre sur le volume, en cylindriques. | Les termes en x et y s'annulent par symétrie ; ∫_{0}^{2} π·2z·z² dz. | ∫_{0}^{2} π·2z·z² dz = 8π.

```

### Niveau 5

```
Soit F = (2x², y², z − 1) et Σ = {z = 1 − x² − y², z ≥ 0}, orientée vers le haut. Σ n'est pas fermée : ferme-la par le disque D du plan z = 0 et calcule ∬_Σ F · ds par le théorème de la divergence.
  [free, sans aide]  ∂/∂x (2x²) + ∂/∂y (y²) + ∂/∂z (z − 1)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 4x + 2y + 1
  — Ω = {0 ≤ z ≤ 1 − r²} est fermé par Σ et le disque D = {z = 0, r ≤ 1}. ∭_Ω div F :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} ∫_{0}^{1 − r²} (4rcos(φ) + 2rsin(φ) + 1)r dz dr dφ
    = π/2
  — La normale extérieure à Ω sur le disque D (z = 0) :  [juge vector]  départ : ν
    = (0 ; 0 ; -1)
  — Le flux sortant par D : F · ν = −F₃(x, y, 0) = 1 :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    = π
  — ∬_Σ F · ds = ∭_Ω div F − ∬_D F · ν ds :  [juge definite]  départ : π/2 − (π)
    = −π/2

Soit F = (x², y², z³ − 1) et Σ = {z = 1 − x² − y², z ≥ 0}, orientée vers le haut. Σ n'est pas fermée : ferme-la par le disque D du plan z = 0 et calcule ∬_Σ F · ds par le théorème de la divergence.
  [free, sans aide]  ∂/∂x (x²) + ∂/∂y (y²) + ∂/∂z (z³ − 1)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 2y + 3z²
  — Ω = {0 ≤ z ≤ 1 − r²} est fermé par Σ et le disque D = {z = 0, r ≤ 1}. ∭_Ω div F :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} ∫_{0}^{1 − r²} (2rcos(φ) + 2rsin(φ) + 3z²)r dz dr dφ
    = π/4
  — La normale extérieure à Ω sur le disque D (z = 0) :  [juge vector]  départ : ν
    = (0 ; 0 ; -1)
  — Le flux sortant par D : F · ν = −F₃(x, y, 0) = 1 :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    = π
  — ∬_Σ F · ds = ∭_Ω div F − ∬_D F · ν ds :  [juge definite]  départ : π/4 − (π)
    = −3π/4

Soit F = (2x², −2y², z² − 1) et Σ = {z = 4 − x² − y², z ≥ 0}, orientée vers le haut. Σ n'est pas fermée : ferme-la par le disque D du plan z = 0 et calcule ∬_Σ F · ds par le théorème de la divergence.
  [free, sans aide]  ∂/∂x (2x²) + ∂/∂y (−2y²) + ∂/∂z (z² − 1)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 4x − 4y + 2z
  — Ω = {0 ≤ z ≤ 4 − r²} est fermé par Σ et le disque D = {z = 0, r ≤ 2}. ∭_Ω div F :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} ∫_{0}^{4 − r²} (4rcos(φ) − 4rsin(φ) + 2z)r dz dr dφ
    = 64π/3
  — La normale extérieure à Ω sur le disque D (z = 0) :  [juge vector]  départ : ν
    = (0 ; 0 ; -1)
  — Le flux sortant par D : F · ν = −F₃(x, y, 0) = 1 :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} r dr dφ
    = 4π
  — ∬_Σ F · ds = ∭_Ω div F − ∬_D F · ν ds :  [juge definite]  départ : 64π/3 − (4π)
    = 52π/3

```

### Variantes d'examen

```
Soit F = (x + y + cos(z), xe^z, z + xy) et Ω le cylindre {x² + y² ≤ 1, 0 ≤ z ≤ 2}, ν la normale extérieure. ∬_∂Ω F · ν ds =
  · −4π [v_flux_normal_outward]   · 8π [v_jacobian_volume]   ✔ 4π   · 0 [v_div_rot_confuse]
  [examen mcq]
  pièges : v_jacobian_volume, v_flux_normal_outward, v_div_rot_confuse

```

## Théorème de Stokes (`v-stokes`, BA3)

_∬_Σ rot F · ds = ∮_∂Σ F · dl, le bord σ(∂A) orienté avec σ_u ∧ σ_v._

### Niveau 1

```
Soit F = (−y, x, z) et l'hémisphère Σ = {x² + y² + z² = 4, z ≥ 0}, normale extérieure, paramétrée par σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds. On donne rot F = (0, 0, 2).
  [guided]  rot F(σ(θ, φ))
    (rot F au point σ(θ, φ) :)
    = (0;0;□)   (trous : (0 ; 0 ; 2))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ∧σ_φ=(4sin(θ)^2cos(φ);4sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_θ ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 8sin(θ)cos(θ) dθ dφ
    = □   (trous : 8π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 2) · (σ_θ ∧ σ_φ) dθ dφ. | ∫_{0}^{2π} ∫_{0}^{π/2} 8sin(θ)cos(θ) dθ dφ.
  pièges : v_curl_eval

Soit F = (−2y, 2x, z²) et l'hémisphère Σ = {x² + y² + z² = 4, z ≥ 0}, normale extérieure, paramétrée par σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds. On donne rot F = (0, 0, 4).
  [guided]  rot F(σ(θ, φ))
    (rot F au point σ(θ, φ) :)
    = (0;0;□)   (trous : (0 ; 0 ; 4))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ∧σ_φ=(4sin(θ)^2cos(φ);4sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_θ ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 16sin(θ)cos(θ) dθ dφ
    = □   (trous : 16π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 4) · (σ_θ ∧ σ_φ) dθ dφ. | ∫_{0}^{2π} ∫_{0}^{π/2} 16sin(θ)cos(θ) dθ dφ.
  pièges : v_curl_eval

Soit F = (−y, x, z²) et l'hémisphère Σ = {x² + y² + z² = 1, z ≥ 0}, normale extérieure, paramétrée par σ(θ, φ) = (sin(θ)cos(φ) ; sin(θ)sin(φ) ; cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds. On donne rot F = (0, 0, 2).
  [guided]  rot F(σ(θ, φ))
    (rot F au point σ(θ, φ) :)
    = (0;0;□)   (trous : (0 ; 0 ; 2))
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ∧σ_φ=(sin(θ)^2cos(φ);sin(θ)^2sin(φ);□)   (trous : σ_θ ∧ σ_φ = (sin(θ)^2 cos(φ) ; sin(θ)^2 sin(φ) ; sin(θ)cos(θ)))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_θ ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 2sin(θ)cos(θ) dθ dφ
    = □   (trous : 2π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 2) · (σ_θ ∧ σ_φ) dθ dφ. | ∫_{0}^{2π} ∫_{0}^{π/2} 2sin(θ)cos(θ) dθ dφ.
  pièges : v_curl_eval

```

### Niveau 2

```
Soit F = (−2y, x, 0) et Σ = {z = 4 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [guided]  rotF
    (rot F :)
    = rotF=(0-0;0-0;1-(-2))=□   (trous : rot F = (0-0 ; 0-0 ; 1-(-2)) = (0 ; 0 ; 3))
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0;0;□)   (trous : (0 ; 0 ; 3))
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r∧σ_φ=(□;2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ
    = □   (trous : 12π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 3) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ.

Soit F = (−y, 2x, z²) et Σ = {z = 4 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [guided]  rotF
    (rot F :)
    = rotF=(0-0;0-0;2-(-1))=□   (trous : rot F = (0-0 ; 0-0 ; 2-(-1)) = (0 ; 0 ; 3))
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0;0;□)   (trous : (0 ; 0 ; 3))
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r∧σ_φ=(□;2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ
    = □   (trous : 12π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 3) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ.

Soit F = (−2y, x, 0) et Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [guided]  rotF
    (rot F :)
    = rotF=(0-0;0-0;1-(-2))=□   (trous : rot F = (0-0 ; 0-0 ; 1-(-2)) = (0 ; 0 ; 3))
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0;0;□)   (trous : (0 ; 0 ; 3))
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r∧σ_φ=(□;2r^2sin(φ);r)   (trous : σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 3r dr dφ
    = □   (trous : 3π)
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 3) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{1} 3r dr dφ.

```

### Niveau 3

```
Soit F = (−y, x, z) et l'hémisphère Σ = {x² + y² + z² = 9, z ≥ 0}, normale extérieure, paramétrée par σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [tap, suivre l'erreur, menu menu]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 1-(-1)) = (0 ; 0 ; 2)
  — rot F au point σ(θ, φ) :  [juge vector]  départ : rot F(σ(θ, φ))
    = (0 ; 0 ; 2)
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_θ ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 18sin(θ)cos(θ) dθ dφ
    ? Quel membre de Stokes calcules-tu ? ✔ Une autre surface de même bord : le disque z = 0, normale (0, 0, 1) / ✔ ∬_Σ rot F · ds sur Σ / ✔ ∮_∂Σ F · dl sur le cercle du bord / · ∬_Σ rot F · ds avec la normale intérieure
    = 18π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 2) · (σ_θ ∧ σ_φ) dθ dφ. | ∫_{0}^{2π} ∫_{0}^{π/2} 18sin(θ)cos(θ) dθ dφ.
  pièges : v_normal_flip

Soit F = (−2y, x, z) et Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [tap, suivre l'erreur, menu menu]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 1-(-2)) = (0 ; 0 ; 3)
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0 ; 0 ; 3)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 3r dr dφ
    ? Quel membre de Stokes calcules-tu ? ✔ Une autre surface de même bord : le disque z = 0, normale (0, 0, 1) / ✔ ∬_Σ rot F · ds sur Σ / ✔ ∮_∂Σ F · dl sur le cercle du bord / · ∬_Σ rot F · ds avec la normale intérieure
    = 3π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 3) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{1} 3r dr dφ.
  pièges : v_normal_flip

Soit F = (−2y, x, 0) et Σ = {z = 4 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds.
  [tap, suivre l'erreur, menu menu]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 1-(-2)) = (0 ; 0 ; 3)
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0 ; 0 ; 3)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ
    ? Quel membre de Stokes calcules-tu ? ✔ Une autre surface de même bord : le disque z = 0, normale (0, 0, 1) / ✔ ∬_Σ rot F · ds sur Σ / ✔ ∮_∂Σ F · dl sur le cercle du bord / · ∬_Σ rot F · ds avec la normale intérieure
    = 12π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 3) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{2} 3r dr dφ.
  pièges : v_normal_flip

```

### Niveau 4

```
Soit F = (−2y, 2x, z²) et Σ = {z = 1 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+1), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]. Calcule ∬_Σ rot F · ds, puis vérifie avec ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, suivre l'erreur]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 2-(-2)) = (0 ; 0 ; 4)
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0 ; 0 ; 4)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 4r dr dφ
    = 4π
  — Le bord ∂Σ = σ(∂A) (côtés de ∂A : Γ1 : φ = 0, r de 0 à 1 ; Γ2 : r = 1, φ de 0 à 2π ; Γ3 : φ = 2π, r de 1 à 0 ; Γ4 : r = 0, φ de 2π à 0) :  [juge boundary]  départ : ∂Σ
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (cos(t) ; sin(t) ; 0), t ∈ [0 ; 2π]
  — ∮_∂Σ F · dl sur le cercle (1 cos t, 1 sin t, 0), t ∈ [0 ; 2π] :  [juge definite]  départ : ∫_{0}^{2π} (2sin(t)² + 2cos(t)²) dt
    = 4π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 4) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{1} 4r dr dφ.

Soit F = (−3y, 2x, z) et Σ = {z = 4 − x² − y², z ≥ 0}, normale vers le haut, paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+4), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds, puis vérifie avec ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, suivre l'erreur]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 2-(-3)) = (0 ; 0 ; 5)
  — rot F au point σ(r, φ) :  [juge vector]  départ : rot F(σ(r, φ))
    = (0 ; 0 ; 5)
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (2r^2 cos(φ) ; 2r^2 sin(φ) ; r)
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_r ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 5r dr dφ
    = 20π
  — Le bord ∂Σ = σ(∂A) (côtés de ∂A : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à 2π ; Γ3 : φ = 2π, r de 2 à 0 ; Γ4 : r = 0, φ de 2π à 0) :  [juge boundary]  départ : ∂Σ
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π]
  — ∮_∂Σ F · dl sur le cercle (2 cos t, 2 sin t, 0), t ∈ [0 ; 2π] :  [juge definite]  départ : ∫_{0}^{2π} (12sin(t)² + 8cos(t)²) dt
    = 20π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 5) · (σ_r ∧ σ_φ) dr dφ. | ∫_{0}^{2π} ∫_{0}^{2} 5r dr dφ.

Soit F = (−y, x, 0) et l'hémisphère Σ = {x² + y² + z² = 4, z ≥ 0}, normale extérieure, paramétrée par σ(θ, φ) = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]. Calcule ∬_Σ rot F · ds, puis vérifie avec ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [free, suivre l'erreur]  rotF
    (rot F :)
    = rot F = (0-0 ; 0-0 ; 1-(-1)) = (0 ; 0 ; 2)
  — rot F au point σ(θ, φ) :  [juge vector]  départ : rot F(σ(θ, φ))
    = (0 ; 0 ; 2)
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    = σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ))
  — ∬_Σ rot F · ds = ∬_A rot F(σ) · (σ_θ ∧ σ_φ) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 8sin(θ)cos(θ) dθ dφ
    = 8π
  — Le bord ∂Σ = σ(∂A) (côtés de ∂A : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0) :  [juge boundary]  départ : ∂Σ
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π]
  — ∮_∂Σ F · dl sur le cercle (2 cos t, 2 sin t, 0), t ∈ [0 ; 2π] :  [juge definite]  départ : ∫_{0}^{2π} (4sin(t)² + 4cos(t)²) dt
    = 8π
  aides : Calcule rot F, puis choisis le membre le plus simple. | ∬ (0, 0, 2) · (σ_θ ∧ σ_φ) dθ dφ. | ∫_{0}^{2π} ∫_{0}^{π/2} 8sin(θ)cos(θ) dθ dφ.

```

### Niveau 5

```
Soit F = (−y, x, z²) et Γ la courbe où le cylindre x² + y² = 4 coupe le plan z = x + 2, parcourue dans le sens trigonométrique vue d'en haut. Calcule ∮_Γ F · dl par le théorème de Stokes.
  [free, sans aide]  rotF
    (rot F :)
    = rot F = (0 ; 0 ; 2)
  — Une surface de bord Γ : le morceau du plan à l'intérieur du cylindre, σ(r, φ) et A :  [juge param]  départ : σ(r, φ)
    = (r cos(φ) ; r sin(φ) ; r cos(φ)+2), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ (vers le haut, comme le sens de Γ) :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-r ; 0 ; r)
  — ∮_Γ F · dl = ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2r dr dφ
    = 8π

Soit F = (−2y, 2x, z²) et Γ la courbe où le cylindre x² + y² = 4 coupe le plan z = −x + 1, parcourue dans le sens trigonométrique vue d'en haut. Calcule ∮_Γ F · dl par le théorème de Stokes.
  [free, sans aide]  rotF
    (rot F :)
    = rot F = (0 ; 0 ; 4)
  — Une surface de bord Γ : le morceau du plan à l'intérieur du cylindre, σ(r, φ) et A :  [juge param]  départ : σ(r, φ)
    = (r cos(φ) ; r sin(φ) ; -r cos(φ)+1), (r ; φ) ∈ [0 ; 2] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ (vers le haut, comme le sens de Γ) :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (r ; 0 ; r)
  — ∮_Γ F · dl = ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 4r dr dφ
    = 16π

Soit F = (−y, 2x, z²) et Γ la courbe où le cylindre x² + y² = 1 coupe le plan z = 2x, parcourue dans le sens trigonométrique vue d'en haut. Calcule ∮_Γ F · dl par le théorème de Stokes.
  [free, sans aide]  rotF
    (rot F :)
    = rot F = (0 ; 0 ; 3)
  — Une surface de bord Γ : le morceau du plan à l'intérieur du cylindre, σ(r, φ) et A :  [juge param]  départ : σ(r, φ)
    = (r cos(φ) ; r sin(φ) ; 2r cos(φ)), (r ; φ) ∈ [0 ; 1] × [0 ; 2π]
  — Normale σ_r ∧ σ_φ (vers le haut, comme le sens de Γ) :  [juge vector]  départ : σ_r et σ_φ
    = σ_r ∧ σ_φ = (-2r ; 0 ; r)
  — ∮_Γ F · dl = ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 3r dr dφ
    = 3π

```

### Variantes d'examen

```
Soit F = (−y, x, 0) et l'hémisphère Σ = {x² + y² + z² = 4, z ≥ 0}, normale extérieure. Γ = ∂Σ est orienté comme σ(∂A). ∮_Γ F · dl =
  ✔ 8π   · 16π   · −8π [v_boundary_orient]   · 32π/3 [v_curl_eval]
  [examen mcq]
  pièges : v_curl_eval, v_boundary_orient

```

## Problème : vérifier le théorème de Stokes (`v-verify-stokes`, BA3)

_Vérifier Stokes : calculer les deux membres séparément et constater qu'ils sont égaux._

### Niveau 1

```
Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (0, x, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π] et σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r).
  [guided]  rotF
    (rot F :)
    = rotF = □   (trous : rot F = (0 ; 0 ; 1))
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rotF×(σ_r∧σ_φ)=(0;0;1)×((2□-1)rcos(φ);(2r-1)rsin(φ);r)=r   (trous : rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = r)
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    = □   (trous : 2π)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} r dr dφ = 2π.

Soit Σ = {z = √(x² + y²)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (0, x, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+2r), (r ; φ) ∈ [0 ; 2] × [0 ; π] et σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r).
  [guided]  rotF
    (rot F :)
    = rotF = □   (trous : rot F = (0 ; 0 ; 1))
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rotF×(σ_r∧σ_φ)=(0;0;1)×((2□-2)rcos(φ);(2r-2)rsin(φ);r)=r   (trous : rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r) = r)
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    = □   (trous : 2π)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} r dr dφ = 2π.

Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π] et σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r).
  [guided]  rotF
    (rot F :)
    = rotF = □   (trous : rot F = (0 ; 0 ; 1))
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rotF×(σ_r∧σ_φ)=(0;0;1)×((2□-1)rcos(φ);(2r-1)rsin(φ);r)=r   (trous : rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = r)
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    = □   (trous : 2π)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} r dr dφ = 2π.

```

### Niveau 2

```
Soit Σ = {z = √(x² + y²)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+3r), (r ; φ) ∈ [0 ; 3] × [0 ; π] ; les côtés de ∂A : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à π ; Γ3 : φ = π, r de 3 à 0 ; Γ4 : r = 0, φ de π à 0.
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, r de 0 à 3) : son image σ(Γ1) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ2 (r = 3, φ de 0 à π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = π, r de 3 à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (r = 0, φ de π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = (□;□;-t^2+3t),t∈[0;3]   (trous : (t ; 0 ; -t^2+3t), t ∈ [0 ; 3])
    = (□;□;0),t∈[0;π]   (trous : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π])
    = (□;□;-t^2+3t),t∈[0;3]   (trous : (t-3 ; 0 ; -t^2+3t), t ∈ [0 ; 3])
  — Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :  [juge vector]  départ : F(γ_1(t))·γ_1′(t)
    = (0 ; 0 ; 0)·(1 ; 0 ; -2t+3) = 0
  — Sur le demi-cercle (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 9sin(t)² dt
    = □   (trous : 9π/2)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-3)r cos(φ) ; (2r-3)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{3} r dr dφ = 9π/2.
  pièges : v_boundary_pieces

Soit Σ = {x² + y² + z² = 9, z ≥ 0} et F = (y, −x, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(θ, φ) = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π] ; les côtés de ∂A : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0.
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, θ de 0 à π/2) : son image σ(Γ1) est · un point : on le retire / ✔ un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ2 (θ = π/2, φ de 0 à 2π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = 2π, θ de π/2 à 0) : son image σ(Γ3) est · un point : on le retire / ✔ un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    ? Γ4 (θ = 0, φ de 2π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = (□;□;0),t∈[0;2π]   (trous : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π])
  — Sur l'équateur (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{2π} (−9sin(t)² + −9cos(t)²) dt
    = □   (trous : −18π)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; -2) ; σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)). | ∬_Σ rot F · ds = ∫_{0}^{2π} ∫_{0}^{π/2} −18sin(θ)cos(θ) dθ dφ = −18π.
  pièges : v_boundary_pieces

Soit Σ = {z = √(x² + y²)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−3y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Σ est paramétrée par σ(r, φ) = (r cos(φ) ; r sin(φ) ; -r^2+2r), (r ; φ) ∈ [0 ; 2] × [0 ; π] ; les côtés de ∂A : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0.
  [guided]  ∂Σ
    (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
    ? Γ1 (φ = 0, r de 0 à 2) : son image σ(Γ1) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ2 (r = 2, φ de 0 à π) : son image σ(Γ2) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ3 (φ = π, r de 2 à 0) : son image σ(Γ3) est · un point : on le retire / · un côté qui s'annule avec un autre / ✔ un morceau du bord ∂Σ
    ? Γ4 (r = 0, φ de π à 0) : son image σ(Γ4) est ✔ un point : on le retire / · un côté qui s'annule avec un autre / · un morceau du bord ∂Σ
    = Γ4 : point
    = (□;□;-t^2+2t),t∈[0;2]   (trous : (t ; 0 ; -t^2+2t), t ∈ [0 ; 2])
    = (□;□;0),t∈[0;π]   (trous : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π])
    = (□;□;-t^2+2t),t∈[0;2]   (trous : (t-2 ; 0 ; -t^2+2t), t ∈ [0 ; 2])
  — Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :  [juge vector]  départ : F(γ_1(t))·γ_1′(t)
    = (0 ; 0 ; 0)·(1 ; 0 ; -2t+2) = 0
  — Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 12sin(t)² dt
    = □   (trous : 6π)
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 3) ; σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} 3r dr dφ = 6π.
  pièges : v_boundary_pieces

```

### Niveau 3

```
Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 2, y ≥ 0 pour φ ∈ [0 ; π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r)
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = r
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    = 2π
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} r dr dφ = 2π.
  pièges : v_cross_order

Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 2, y ≥ 0 pour φ ∈ [0 ; π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r)
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = r
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    = 2π
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 1) ; σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} r dr dφ = 2π.
  pièges : v_cross_order

Soit Σ = {z = (√(x² + y²) + 1)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−3y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.
  [tap, suivre l'erreur, menu menu]  σ(r, φ)
    (Paramétrisation de Σ et domaine A des paramètres :)
    = (r cos(φ) ; r sin(φ) ; -r^2+2r+3), (r ; φ) ∈ [0 ; 3] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 3, y ≥ 0 pour φ ∈ [0 ; π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r)
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 3)·((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r) = 3r
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} 3r dr dφ
    = 27π/2
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 3) ; σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{3} 3r dr dφ = 27π/2.
  pièges : v_cross_order

```

### Niveau 4

```
Soit Σ = {z = (√(x² + y²) + 1)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−2y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à π ; Γ3 : φ = π, r de 3 à 0 ; Γ4 : r = 0, φ de π à 0.
  [free, suivre l'erreur]  rotF
    (rot F :)
    ? Les hypothèses du théorème de Stokes sont-elles vérifiées ? ✔ Oui : Σ est orientable et régulière par morceaux, F ∈ C¹(ℝ³) / · Non : Σ devrait être fermée
    = rot F = (0 ; 0 ; 2)
  — Paramétrisation de Σ et domaine A des paramètres :  [juge param]  départ : σ(r, φ)
    = (r cos(φ) ; r sin(φ) ; -r^2+2r+3), (r ; φ) ∈ [0 ; 3] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 3, y ≥ 0 pour φ ∈ [0 ; π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r)
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 2)·((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r) = 2r
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} 2r dr dφ
    = 9π
  — Le bord, un morceau par ligne (les côtés retirés d'abord) :  [juge boundary]  départ : ∂Σ
    ? Dans quel sens parcourir le bord ? ✔ Celui de σ(∂A), ∂A parcouru dans le sens positif / · Le sens trigonométrique vu d'en haut, quel que soit σ / · Celui qui rend la normale extérieure
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+2t+3), t ∈ [0 ; 3]
    = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-3 ; 0 ; -t^2+4t), t ∈ [0 ; 3]
  — Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :  [juge vector]  départ : F(γ_1(t))·γ_1′(t)
    = (0 ; 0 ; 0)·(1 ; 0 ; -2t+2) = 0
  — Sur le demi-cercle (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 18sin(t)² dt
    = 9π   ← = ∬_Σ rot F · ds : les deux membres valent 9π
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 2) ; σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{3} 2r dr dφ = 9π.
  pièges : v_cross_order, v_boundary_orient, v_normal_flip

Soit Σ = {x² + y² + z² = 4, z ≥ 0} et F = 3(−y, x, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0.
  [free, suivre l'erreur]  rotF
    (rot F :)
    ? Les hypothèses du théorème de Stokes sont-elles vérifiées ? ✔ Oui : Σ est orientable et régulière par morceaux, F ∈ C¹(ℝ³) / · Non : Σ devrait être fermée
    = rot F = (0 ; 0 ; 6)
  — Paramétrisation de Σ et domaine A des paramètres :  [juge param]  départ : σ(θ, φ)
    = (2sin(θ)cos(φ) ; 2sin(θ)sin(φ) ; 2cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  — Normale σ_θ ∧ σ_φ :  [juge vector]  départ : σ_θ et σ_φ
    ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 4 sin θ · σ/2, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
    = σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ))   ← 4 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  — rot F(σ) · (σ_θ ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_θ et σ_φ)
    = rot F · (σ_θ ∧ σ_φ) = (0 ; 0 ; 6)·(4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)) = 24sin(θ)cos(θ)
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 24sin(θ)cos(θ) dθ dφ
    = 24π
  — Le bord, un morceau par ligne (les côtés retirés d'abord) :  [juge boundary]  départ : ∂Σ
    ? Dans quel sens parcourir le bord ? ✔ Celui de σ(∂A), ∂A parcouru dans le sens positif / · Le sens trigonométrique vu d'en haut, quel que soit σ / · Celui qui rend la normale extérieure
    = Γ4 : point
    = Γ1 et Γ3 : s'annulent
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; 2π]
  — Sur l'équateur (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{2π} (12sin(t)² + 12cos(t)²) dt
    = 24π   ← = ∬_Σ rot F · ds : les deux membres valent 24π
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 6) ; σ_θ ∧ σ_φ = (4sin(θ)^2 cos(φ) ; 4sin(θ)^2 sin(φ) ; 4sin(θ)cos(θ)). | ∬_Σ rot F · ds = ∫_{0}^{2π} ∫_{0}^{π/2} 24sin(θ)cos(θ) dθ dφ = 24π.
  pièges : v_cross_order, v_boundary_orient, v_normal_flip

Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−3y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0.
  [free, suivre l'erreur]  rotF
    (rot F :)
    ? Les hypothèses du théorème de Stokes sont-elles vérifiées ? ✔ Oui : Σ est orientable et régulière par morceaux, F ∈ C¹(ℝ³) / · Non : Σ devrait être fermée
    = rot F = (0 ; 0 ; 3)
  — Paramétrisation de Σ et domaine A des paramètres :  [juge param]  départ : σ(r, φ)
    = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 2, y ≥ 0 pour φ ∈ [0 ; π]
  — Normale σ_r ∧ σ_φ :  [juge vector]  départ : σ_r et σ_φ
    ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
    = σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r)
  — rot F(σ) · (σ_r ∧ σ_φ) :  [juge vector]  départ : rotF·(σ_r et σ_φ)
    = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 3)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = 3r
  — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} 3r dr dφ
    = 6π
  — Le bord, un morceau par ligne (les côtés retirés d'abord) :  [juge boundary]  départ : ∂Σ
    ? Dans quel sens parcourir le bord ? ✔ Celui de σ(∂A), ∂A parcouru dans le sens positif / · Le sens trigonométrique vu d'en haut, quel que soit σ / · Celui qui rend la normale extérieure
    = Γ4 : point
    = Γ1 : (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2]
    = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
    = Γ3 : (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2]
  — Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :  [juge vector]  départ : F(γ_1(t))·γ_1′(t)
    = (0 ; 0 ; 0)·(1 ; 0 ; -2t+1) = 0
  — Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 12sin(t)² dt
    = 6π   ← = ∬_Σ rot F · ds : les deux membres valent 6π
  aides : Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau. | rot F = (0 ; 0 ; 3) ; σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r). | ∬_Σ rot F · ds = ∫_{0}^{π} ∫_{0}^{2} 3r dr dφ = 6π.
  pièges : v_cross_order, v_boundary_orient, v_normal_flip

```

### Niveau 5

```
Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0. (14 points)
  [problème, 14 points]
  partie 1 (Hypothèses (1 pt) : 1)
  Les hypothèses du théorème de Stokes :
    ✔ Σ est orientable et régulière par morceaux, et F est de classe C¹ sur ℝ³ : le théorème s'applique.   · Σ n'est pas fermée : le théorème ne s'applique pas.   · rot F n'est pas nul : le théorème ne s'applique pas.   · Il faut que la normale de Σ soit extérieure : on doit d'abord la retourner. [v_normal_flip]
  partie 2 (rot F (1 pt) : 1)
  rot F
    [free, sans aide, suivre l'erreur]  rotF
      (rot F :)
      = rot F = (0 ; 0 ; 1)
  partie 3 (σ et A (2 pts) : 2)
  Paramétrisation de Σ
    [free, sans aide, suivre l'erreur]  σ(r, φ)
      (Paramétrisation de Σ et domaine A des paramètres :)
      = (r cos(φ) ; r sin(φ) ; -r^2+r+2), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 2, y ≥ 0 pour φ ∈ [0 ; π]
  partie 4 (Normale (2 pts) : 2)
  Normale
    [free, sans aide, suivre l'erreur]  σ_r et σ_φ
      (Normale σ_r ∧ σ_φ :)
      ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
      = σ_r ∧ σ_φ = ((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r)
  partie 5 (Flux (2 pts) : 1 ; ∬_Σ rot F · ds : 1)
  Le flux de rot F
    [free, sans aide, suivre l'erreur]  rotF·(σ_r et σ_φ)
      (rot F(σ) · (σ_r ∧ σ_φ) :)
      = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-1)r cos(φ) ; (2r-1)r sin(φ) ; r) = r
    — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
      = 2π
  partie 6 (Bord (2 pts) : 2)
  Le bord orienté
    [free, sans aide, suivre l'erreur]  ∂Σ
      (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
      = Γ4 : point
      = Γ1 : (t ; 0 ; -t^2+t+2), t ∈ [0 ; 2]
      = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
      = Γ3 : (t-2 ; 0 ; -t^2+3t), t ∈ [0 ; 2]
  partie 7 (Sens (1 pt) : 1)
  Le sens de parcours de ∂Σ :
    · le sens trigonométrique vu d'en haut, quelle que soit la paramétrisation [v_boundary_orient]   · n'importe lequel : la valeur ne change pas [v_boundary_orient]   · celui qui rend la normale extérieure [v_normal_flip]   ✔ celui de σ(∂A), ∂A étant parcouru dans le sens positif : c'est celui des morceaux ci-dessus.
  partie 8 (Circulation (2 pts) : 1 ; Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt : 1)
  La circulation
    [free, sans aide, suivre l'erreur]  F(γ_1(t))·γ_1′(t)
      (Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :)
      = (0 ; 0 ; 0)·(1 ; 0 ; -2t+1) = 0
    — Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 4sin(t)² dt
      = 2π
  partie 9 (Conclusion (1 pt) : 1)
  Conclusion :
    · Le flux vaut 2π et la circulation −2π : il faut changer la normale. [v_normal_flip]   · Les deux membres valent 4π.   ✔ Les deux membres valent 2π : le théorème de Stokes est vérifié.   · Les deux membres diffèrent : Σ n'est pas fermée.
  pièges : v_normal_flip, v_cross_order, v_boundary_orient

Soit Σ = {z = √(x² + y²)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, r de 0 à 2 ; Γ2 : r = 2, φ de 0 à π ; Γ3 : φ = π, r de 2 à 0 ; Γ4 : r = 0, φ de π à 0. (14 points)
  [problème, 14 points]
  partie 1 (Hypothèses (1 pt) : 1)
  Les hypothèses du théorème de Stokes :
    · Il faut que la normale de Σ soit extérieure : on doit d'abord la retourner. [v_normal_flip]   ✔ Σ est orientable et régulière par morceaux, et F est de classe C¹ sur ℝ³ : le théorème s'applique.   · rot F n'est pas nul : le théorème ne s'applique pas.   · Σ n'est pas fermée : le théorème ne s'applique pas.
  partie 2 (rot F (1 pt) : 1)
  rot F
    [free, sans aide, suivre l'erreur]  rotF
      (rot F :)
      = rot F = (0 ; 0 ; 1)
  partie 3 (σ et A (2 pts) : 2)
  Paramétrisation de Σ
    [free, sans aide, suivre l'erreur]  σ(r, φ)
      (Paramétrisation de Σ et domaine A des paramètres :)
      = (r cos(φ) ; r sin(φ) ; -r^2+2r), (r ; φ) ∈ [0 ; 2] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 2, y ≥ 0 pour φ ∈ [0 ; π]
  partie 4 (Normale (2 pts) : 2)
  Normale
    [free, sans aide, suivre l'erreur]  σ_r et σ_φ
      (Normale σ_r ∧ σ_φ :)
      ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
      = σ_r ∧ σ_φ = ((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r)
  partie 5 (Flux (2 pts) : 1 ; ∬_Σ rot F · ds : 1)
  Le flux de rot F
    [free, sans aide, suivre l'erreur]  rotF·(σ_r et σ_φ)
      (rot F(σ) · (σ_r ∧ σ_φ) :)
      = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-2)r cos(φ) ; (2r-2)r sin(φ) ; r) = r
    — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r dr dφ
      = 2π
  partie 6 (Bord (2 pts) : 2)
  Le bord orienté
    [free, sans aide, suivre l'erreur]  ∂Σ
      (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
      = Γ4 : point
      = Γ1 : (t ; 0 ; -t^2+2t), t ∈ [0 ; 2]
      = Γ2 : (2cos(t) ; 2sin(t) ; 0), t ∈ [0 ; π]
      = Γ3 : (t-2 ; 0 ; -t^2+2t), t ∈ [0 ; 2]
  partie 7 (Sens (1 pt) : 1)
  Le sens de parcours de ∂Σ :
    · n'importe lequel : la valeur ne change pas [v_boundary_orient]   · le sens trigonométrique vu d'en haut, quelle que soit la paramétrisation [v_boundary_orient]   ✔ celui de σ(∂A), ∂A étant parcouru dans le sens positif : c'est celui des morceaux ci-dessus.   · celui qui rend la normale extérieure [v_normal_flip]
  partie 8 (Circulation (2 pts) : 1 ; Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt : 1)
  La circulation
    [free, sans aide, suivre l'erreur]  F(γ_1(t))·γ_1′(t)
      (Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :)
      = (0 ; 0 ; 0)·(1 ; 0 ; -2t+2) = 0
    — Sur le demi-cercle (2 cos t, 2 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 4sin(t)² dt
      = 2π
  partie 9 (Conclusion (1 pt) : 1)
  Conclusion :
    · Les deux membres diffèrent : Σ n'est pas fermée.   · Les deux membres valent 4π.   ✔ Les deux membres valent 2π : le théorème de Stokes est vérifié.   · Le flux vaut 2π et la circulation −2π : il faut changer la normale. [v_normal_flip]
  pièges : v_normal_flip, v_cross_order, v_boundary_orient

Soit Σ = {z = √(x² + y²)(3 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (−y, 0, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, r de 0 à 3 ; Γ2 : r = 3, φ de 0 à π ; Γ3 : φ = π, r de 3 à 0 ; Γ4 : r = 0, φ de π à 0. (14 points)
  [problème, 14 points]
  partie 1 (Hypothèses (1 pt) : 1)
  Les hypothèses du théorème de Stokes :
    · Σ n'est pas fermée : le théorème ne s'applique pas.   ✔ Σ est orientable et régulière par morceaux, et F est de classe C¹ sur ℝ³ : le théorème s'applique.   · Il faut que la normale de Σ soit extérieure : on doit d'abord la retourner. [v_normal_flip]   · rot F n'est pas nul : le théorème ne s'applique pas.
  partie 2 (rot F (1 pt) : 1)
  rot F
    [free, sans aide, suivre l'erreur]  rotF
      (rot F :)
      = rot F = (0 ; 0 ; 1)
  partie 3 (σ et A (2 pts) : 2)
  Paramétrisation de Σ
    [free, sans aide, suivre l'erreur]  σ(r, φ)
      (Paramétrisation de Σ et domaine A des paramètres :)
      = (r cos(φ) ; r sin(φ) ; -r^2+3r), (r ; φ) ∈ [0 ; 3] × [0 ; π]   ← z ≥ 0 pour 0 ≤ r ≤ 3, y ≥ 0 pour φ ∈ [0 ; π]
  partie 4 (Normale (2 pts) : 2)
  Normale
    [free, sans aide, suivre l'erreur]  σ_r et σ_φ
      (Normale σ_r ∧ σ_φ :)
      ? Vers où pointe la normale σ_r ∧ σ_φ ? ✔ Vers le haut / · Vers le bas
      = σ_r ∧ σ_φ = ((2r-3)r cos(φ) ; (2r-3)r sin(φ) ; r)
  partie 5 (Flux (2 pts) : 1 ; ∬_Σ rot F · ds : 1)
  Le flux de rot F
    [free, sans aide, suivre l'erreur]  rotF·(σ_r et σ_φ)
      (rot F(σ) · (σ_r ∧ σ_φ) :)
      = rot F · (σ_r ∧ σ_φ) = (0 ; 0 ; 1)·((2r-3)r cos(φ) ; (2r-3)r sin(φ) ; r) = r
    — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} r dr dφ
      = 9π/2
  partie 6 (Bord (2 pts) : 2)
  Le bord orienté
    [free, sans aide, suivre l'erreur]  ∂Σ
      (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
      = Γ4 : point
      = Γ1 : (t ; 0 ; -t^2+3t), t ∈ [0 ; 3]
      = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; π]
      = Γ3 : (t-3 ; 0 ; -t^2+3t), t ∈ [0 ; 3]
  partie 7 (Sens (1 pt) : 1)
  Le sens de parcours de ∂Σ :
    · le sens trigonométrique vu d'en haut, quelle que soit la paramétrisation [v_boundary_orient]   · celui qui rend la normale extérieure [v_normal_flip]   · n'importe lequel : la valeur ne change pas [v_boundary_orient]   ✔ celui de σ(∂A), ∂A étant parcouru dans le sens positif : c'est celui des morceaux ci-dessus.
  partie 8 (Circulation (2 pts) : 1 ; Sur le demi-cercle (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt : 1)
  La circulation
    [free, sans aide, suivre l'erreur]  F(γ_1(t))·γ_1′(t)
      (Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :)
      = (0 ; 0 ; 0)·(1 ; 0 ; -2t+3) = 0
    — Sur le demi-cercle (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :  [juge definite]  départ : ∫_{0}^{π} 9sin(t)² dt
      = 9π/2
  partie 9 (Conclusion (1 pt) : 1)
  Conclusion :
    · Les deux membres diffèrent : Σ n'est pas fermée.   · Le flux vaut 9π/2 et la circulation −9π/2 : il faut changer la normale. [v_normal_flip]   ✔ Les deux membres valent 9π/2 : le théorème de Stokes est vérifié.   · Les deux membres valent 9π.
  pièges : v_normal_flip, v_cross_order, v_boundary_orient

```

### Variantes d'examen

```
Soit Σ = {x² + y² + z² = 9, z ≥ 0} et F = 3(−y, x, 0). Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t. Côtés de ∂A, dans le sens positif : Γ1 : φ = 0, θ de 0 à π/2 ; Γ2 : θ = π/2, φ de 0 à 2π ; Γ3 : φ = 2π, θ de π/2 à 0 ; Γ4 : θ = 0, φ de 2π à 0. (9 points)
  [problème, examen open, 9 points]
  partie 1 (rot F (1 pt) : 1)
  rot F
    [free, sans aide, suivre l'erreur]  rotF
      (rot F :)
      = rot F = (0 ; 0 ; 6)
  partie 2 (σ et A (1 pt) : 1)
  Paramétrisation de Σ
    [free, sans aide, suivre l'erreur]  σ(θ, φ)
      (Paramétrisation de Σ et domaine A des paramètres :)
      = (3sin(θ)cos(φ) ; 3sin(θ)sin(φ) ; 3cos(θ)), (θ ; φ) ∈ [0 ; π/2] × [0 ; 2π]   ← z ≥ 0 donne θ ∈ [0 ; π/2]
  partie 3 (Normale (1,5 pt) : 1,5)
  Normale
    [free, sans aide, suivre l'erreur]  σ_θ et σ_φ
      (Normale σ_θ ∧ σ_φ :)
      ? La normale σ_θ ∧ σ_φ est-elle extérieure ? ✔ Oui : σ_θ ∧ σ_φ = 9 sin θ · σ/3, avec sin θ ≥ 0 / · Non : elle pointe vers l'intérieur
      = σ_θ ∧ σ_φ = (9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ))   ← 9 sin θ · (sin θ cos φ, sin θ sin φ, cos θ)
  partie 4 (Flux (1,5 pt) : 0,5 ; ∬_Σ rot F · ds : 1)
  Le flux de rot F
    [free, sans aide, suivre l'erreur]  rotF·(σ_θ et σ_φ)
      (rot F(σ) · (σ_θ ∧ σ_φ) :)
      = rot F · (σ_θ ∧ σ_φ) = (0 ; 0 ; 6)·(9sin(θ)^2 cos(φ) ; 9sin(θ)^2 sin(φ) ; 9sin(θ)cos(θ)) = 54sin(θ)cos(θ)
    — ∬_Σ rot F · ds :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{π/2} 54sin(θ)cos(θ) dθ dφ
      = 54π
  partie 5 (Bord (2 pts) : 2)
  Le bord orienté
    [free, sans aide, suivre l'erreur]  ∂Σ
      (Le bord, un morceau par ligne (les côtés retirés d'abord) :)
      = Γ4 : point
      = Γ1 et Γ3 : s'annulent
      = Γ2 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π]
  partie 6 (Circulation (1,5 pt) : 1,5)
  La circulation
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} (27sin(t)² + 27cos(t)²) dt
      (Sur l'équateur (3 cos t, 3 sin t, 0), ∫ F(γ(t)) · γ′(t) dt :)
      = 54π
  partie 7 (Conclusion (0,5 pt) : 0,5)
  Conclusion :
    · Les deux membres diffèrent : Σ n'est pas fermée.   ✔ Les deux membres valent 54π : le théorème de Stokes est vérifié.   · Les deux membres valent 108π.   · Le flux vaut 54π et la circulation −54π : il faut changer la normale. [v_normal_flip]
  pièges : v_sphere_theta, v_cross_order, v_normal_flip, v_curl_eval

```

## Problème : vérifier le théorème de la divergence (`v-verify-div`, BA3)

_Vérifier la divergence : ∭ div F, puis le flux sortant de chaque face, avec sa normale extérieure._

### Niveau 1

```
Soit F = (−x², 3y², z²) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = 8π. Le flux du cône vaut −8π.
  [guided]  ∫_{0}^{2π} ∫_{0}^{2} 4r dr dφ
    (Le disque du haut z = 2, r ≤ 2, ν = (0, 0, 1) : F · ν = z² = 4. Son flux :)
    = □   (trous : 16π)
  — La somme des flux des faces :  [juge definite]  départ : 16π + (−8π)
    = 8π   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 4 ds = 16π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −8π, et 16π + (−8π) = 8π.
  pièges : v_flux_normal_outward

Soit F = (x², y², z) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = π/3. Le flux du cône vaut −2π/3.
  [guided]  ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    (Le disque du haut z = 1, r ≤ 1, ν = (0, 0, 1) : F · ν = z = 1. Son flux :)
    = □   (trous : π)
  — La somme des flux des faces :  [juge definite]  départ : π + (−2π/3)
    = π/3   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −2π/3, et π + (−2π/3) = π/3.
  pièges : v_flux_normal_outward

Soit F = (2x², 3y², z) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = 2π/3. Le flux du cône vaut −4π/3.
  [guided]  ∫_{0}^{2π} ∫_{0}^{1} 2r dr dφ
    (Le disque du haut z = 2, r ≤ 1, ν = (0, 0, 1) : F · ν = z = 2. Son flux :)
    = □   (trous : 2π)
  — La somme des flux des faces :  [juge definite]  départ : 2π + (−4π/3)
    = 2π/3   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 2 ds = 2π ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −4π/3, et 2π + (−4π/3) = 2π/3.
  pièges : v_flux_normal_outward

```

### Niveau 2

```
Soit F = (−x², y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = 2π.
  [guided]  N
    (Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (2rcos(φ);2rsin(φ);□)   (trous : (2r cos(φ) ; 2r sin(φ) ; -r))
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (−2r³cos(φ)³ + 2r³sin(φ)³ − 4r³) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1} −4r³ dr dφ
    = □   (trous : −2π)
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 4 ds = 4π ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −2π, et 4π + (−2π) = 2π.
  pièges : v_flux_normal_outward

Soit F = (2x², −2y², z) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = π/3.
  [guided]  N
    (Le cône σ(r, φ) = (r cos φ, r sin φ, r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (rcos(φ);rsin(φ);□)   (trous : (r cos(φ) ; r sin(φ) ; -r))
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (2r³cos(φ)³ − 2r³sin(φ)³ − r²) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1} −r² dr dφ
    = □   (trous : −2π/3)
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −2π/3, et π + (−2π/3) = π/3.
  pièges : v_flux_normal_outward

Soit F = (−x², −2y², z) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = 2π/3.
  [guided]  N
    (Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (2rcos(φ);2rsin(φ);□)   (trous : (2r cos(φ) ; 2r sin(φ) ; -r))
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (−2r³cos(φ)³ − 4r³sin(φ)³ − 2r²) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1} −2r² dr dφ
    = □   (trous : −4π/3)
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 2 ds = 2π ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −4π/3, et 2π + (−4π/3) = 2π/3.
  pièges : v_flux_normal_outward

```

### Niveau 3

```
Soit F = (−x², −2y², z³) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = 3π/20.
  [tap, suivre l'erreur, menu menu]  ∫_{0}^{2π} ∫_{0}^{1/2} r dr dφ
    (Le disque du haut z = 1, r ≤ 1/2, ν = (0, 0, 1) : F · ν = z³ = 1. Son flux :)
    = π/4
  — Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1/2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (2r cos(φ) ; 2r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1/2} (−2r³cos(φ)³ − 4r³sin(φ)³ − 8r⁴) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1/2} −8r⁴ dr dφ
    = −π/10
  — La somme des flux des faces :  [juge definite]  départ : π/4 + (−π/10)
    = 3π/20   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π/4 ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −π/10, et π/4 + (−π/10) = 3π/20.
  pièges : v_flux_normal_outward

Soit F = (2x², −2y², z²) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = π/2.
  [tap, suivre l'erreur, menu menu]  ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    (Le disque du haut z = 1, r ≤ 1, ν = (0, 0, 1) : F · ν = z² = 1. Son flux :)
    = π
  — Le cône σ(r, φ) = (r cos φ, r sin φ, r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (r cos(φ) ; r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (2r³cos(φ)³ − 2r³sin(φ)³ − r³) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1} −r³ dr dφ
    = −π/2
  — La somme des flux des faces :  [juge definite]  départ : π + (−π/2)
    = π/2   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −π/2, et π + (−π/2) = π/2.
  pièges : v_flux_normal_outward

Soit F = (−x², 3y², z) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). On donne ∭_Ω div F = π/3.
  [tap, suivre l'erreur, menu menu]  ∫_{0}^{2π} ∫_{0}^{1} r dr dφ
    (Le disque du haut z = 1, r ≤ 1, ν = (0, 0, 1) : F · ν = z = 1. Son flux :)
    = π
  — Le cône σ(r, φ) = (r cos φ, r sin φ, r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (r cos(φ) ; r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (−r³cos(φ)³ + 3r³sin(φ)³ − r²) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1} −r² dr dφ
    = −2π/3
  — La somme des flux des faces :  [juge definite]  départ : π + (−2π/3)
    = π/3   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −2π/3, et π + (−2π/3) = π/3.
  pièges : v_flux_normal_outward

```

### Niveau 4

```
Soit F = (2x², y², z) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône).
  [free, suivre l'erreur]  ∂/∂x (2x²) + ∂/∂y (y²) + ∂/∂z z
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 4x + 2y + 1
  — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{z/2} (4rcos(φ) + 2rsin(φ) + 1)r dr dφ dz
    = ∫_{0}^{1} π·1·z²/4 dz
    = π/12
  — Le disque du haut z = 1, r ≤ 1/2, ν = (0, 0, 1) : F · ν = z = 1. Son flux :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1/2} r dr dφ
    = π/4
  — Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1/2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (2r cos(φ) ; 2r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1/2} (4r³cos(φ)³ + 2r³sin(φ)³ − 2r²) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1/2} −2r² dr dφ
    = −π/6
  — La somme des flux des faces :  [juge definite]  départ : π/4 + (−π/6)
    = π/12   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π/4 ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −π/6, et π/4 + (−π/6) = π/12.
  pièges : v_flux_normal_outward

Soit F = (x², y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône).
  [free, suivre l'erreur]  ∂/∂x (x²) + ∂/∂y (y²) + ∂/∂z (z²)
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 2y + 2z
  — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{z/2} (2rcos(φ) + 2rsin(φ) + 2z)r dr dφ dz
    = ∫_{0}^{1} π·2z·z²/4 dz
    = π/8
  — Le disque du haut z = 1, r ≤ 1/2, ν = (0, 0, 1) : F · ν = z² = 1. Son flux :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1/2} r dr dφ
    = π/4
  — Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1/2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (2r cos(φ) ; 2r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1/2} (2r³cos(φ)³ + 2r³sin(φ)³ − 4r³) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{1/2} −4r³ dr dφ
    = −π/8
  — La somme des flux des faces :  [juge definite]  départ : π/4 + (−π/8)
    = π/8   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 1 ds = π/4 ; cône : N = (2r cos(φ) ; 2r sin(φ) ; -r). | Flux du cône : −π/8, et π/4 + (−π/8) = π/8.
  pièges : v_flux_normal_outward

Soit F = (x², y², z) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône).
  [free, suivre l'erreur]  ∂/∂x (x²) + ∂/∂y (y²) + ∂/∂z z
    (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
    = 2x + 2y + 1
  — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{z} (2rcos(φ) + 2rsin(φ) + 1)r dr dφ dz
    = ∫_{0}^{2} π·1·z² dz
    = 8π/3
  — Le disque du haut z = 2, r ≤ 2, ν = (0, 0, 1) : F · ν = z = 2. Son flux :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2r dr dφ
    = 8π
  — Le cône σ(r, φ) = (r cos φ, r sin φ, r), r ∈ [0 ; 2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :  [juge vector]  départ : N
    ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
    = (r cos(φ) ; r sin(φ) ; -r)
  — Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} (r³cos(φ)³ + r³sin(φ)³ − r²) dr dφ
    = ∫_{0}^{2π} ∫_{0}^{2} −r² dr dφ
    = −16π/3
  — La somme des flux des faces :  [juge definite]  départ : 8π + (−16π/3)
    = 8π/3   ← = ∭_Ω div F : les deux membres sont égaux
  aides : Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l'opposé de σ_r ∧ σ_φ sur le cône. | Disque : ∬ 2 ds = 8π ; cône : N = (r cos(φ) ; r sin(φ) ; -r). | Flux du cône : −16π/3, et 8π + (−16π/3) = 8π/3.
  pièges : v_flux_normal_outward

```

### Niveau 5

```
Soit F = (−x², −2y², z²) et le cône Ω = {x² + y² ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). (9 points)
  [problème, 9 points]
  partie 1 (∭_Ω div F (3 pts) : 1 ; ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) : 2)
  ∭_Ω div F
    [free, sans aide, suivre l'erreur]  ∂/∂x (−x²) + ∂/∂y (−2y²) + ∂/∂z (z²)
      (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
      = −2x − 4y + 2z
    — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{z} (−2rcos(φ) − 4rsin(φ) + 2z)r dr dφ dz
      = ∫_{0}^{2} π·2z·z² dz
      = 8π
  partie 2 (Le disque (2 pts) : 2)
  Le disque du haut
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{2} 4r dr dφ
      (Le disque du haut z = 2, r ≤ 2, ν = (0, 0, 1) : F · ν = z² = 4. Son flux :)
      = 16π
  partie 3 (Normale du cône (1,5 pt) : 1,5)
  La normale extérieure du cône
    [free, sans aide, suivre l'erreur]  N
      (Le cône σ(r, φ) = (r cos φ, r sin φ, r), r ∈ [0 ; 2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-r cos(φ) ; -r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
      ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
      = (r cos(φ) ; r sin(φ) ; -r)
  partie 4 (Flux du cône (1,5 pt) : 1,5)
  Le flux du cône
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{2} (−r³cos(φ)³ − 2r³sin(φ)³ − r³) dr dφ
      (Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :)
      = ∫_{0}^{2π} ∫_{0}^{2} −r³ dr dφ
      = −8π
  partie 5 (Conclusion (1 pt) : 1)
  ∭_Ω div F = 8π et le flux sortant total vaut 16π + (−8π). Conclusion :
    ✔ Les deux membres valent 8π : le théorème est vérifié.   · Le flux vaut 24π. [v_flux_normal_outward]   · Les deux membres diffèrent de 16π : il faut changer la normale du cône. [v_flux_normal_outward]   · Les deux membres diffèrent : F n'est pas C¹.
  pièges : v_flux_normal_outward

Soit F = (x², −2y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). (9 points)
  [problème, 9 points]
  partie 1 (∭_Ω div F (3 pts) : 1 ; ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) : 2)
  ∭_Ω div F
    [free, sans aide, suivre l'erreur]  ∂/∂x (x²) + ∂/∂y (−2y²) + ∂/∂z (z²)
      (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
      = 2x − 4y + 2z
    — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{z/2} (2rcos(φ) − 4rsin(φ) + 2z)r dr dφ dz
      = ∫_{0}^{2} π·2z·z²/4 dz
      = 2π
  partie 2 (Le disque (2 pts) : 2)
  Le disque du haut
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1} 4r dr dφ
      (Le disque du haut z = 2, r ≤ 1, ν = (0, 0, 1) : F · ν = z² = 4. Son flux :)
      = 4π
  partie 3 (Normale du cône (1,5 pt) : 1,5)
  La normale extérieure du cône
    [free, sans aide, suivre l'erreur]  N
      (Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
      ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
      = (2r cos(φ) ; 2r sin(φ) ; -r)
  partie 4 (Flux du cône (1,5 pt) : 1,5)
  Le flux du cône
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1} (2r³cos(φ)³ − 4r³sin(φ)³ − 4r³) dr dφ
      (Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :)
      = ∫_{0}^{2π} ∫_{0}^{1} −4r³ dr dφ
      = −2π
  partie 5 (Conclusion (1 pt) : 1)
  ∭_Ω div F = 2π et le flux sortant total vaut 4π + (−2π). Conclusion :
    · Les deux membres diffèrent de 4π : il faut changer la normale du cône. [v_flux_normal_outward]   · Le flux vaut 6π. [v_flux_normal_outward]   ✔ Les deux membres valent 2π : le théorème est vérifié.   · Les deux membres diffèrent : F n'est pas C¹.
  pièges : v_flux_normal_outward

Soit F = (x², 3y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 1}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). (9 points)
  [problème, 9 points]
  partie 1 (∭_Ω div F (3 pts) : 1 ; ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) : 2)
  ∭_Ω div F
    [free, sans aide, suivre l'erreur]  ∂/∂x (x²) + ∂/∂y (3y²) + ∂/∂z (z²)
      (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
      = 2x + 6y + 2z
    — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2π} ∫_{0}^{z/2} (2rcos(φ) + 6rsin(φ) + 2z)r dr dφ dz
      = ∫_{0}^{1} π·2z·z²/4 dz
      = π/8
  partie 2 (Le disque (2 pts) : 2)
  Le disque du haut
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1/2} r dr dφ
      (Le disque du haut z = 1, r ≤ 1/2, ν = (0, 0, 1) : F · ν = z² = 1. Son flux :)
      = π/4
  partie 3 (Normale du cône (1,5 pt) : 1,5)
  La normale extérieure du cône
    [free, sans aide, suivre l'erreur]  N
      (Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1/2], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
      ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
      = (2r cos(φ) ; 2r sin(φ) ; -r)
  partie 4 (Flux du cône (1,5 pt) : 1,5)
  Le flux du cône
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1/2} (2r³cos(φ)³ + 6r³sin(φ)³ − 4r³) dr dφ
      (Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :)
      = ∫_{0}^{2π} ∫_{0}^{1/2} −4r³ dr dφ
      = −π/8
  partie 5 (Conclusion (1 pt) : 1)
  ∭_Ω div F = π/8 et le flux sortant total vaut π/4 + (−π/8). Conclusion :
    ✔ Les deux membres valent π/8 : le théorème est vérifié.   · Les deux membres diffèrent de π/4 : il faut changer la normale du cône. [v_flux_normal_outward]   · Les deux membres diffèrent : F n'est pas C¹.   · Le flux vaut 3π/8. [v_flux_normal_outward]
  pièges : v_flux_normal_outward

```

### Variantes d'examen

```
Soit F = (2x², −2y², z²) et le cône Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône). (9 points)
  [problème, examen open, 9 points]
  partie 1 (∭_Ω div F (3 pts) : 1 ; ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) : 2)
  ∭_Ω div F
    [free, sans aide, suivre l'erreur]  ∂/∂x (2x²) + ∂/∂y (−2y²) + ∂/∂z (z²)
      (Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D'abord div F :)
      = 4x − 4y + 2z
    — ∭_Ω div F, en cylindriques (les termes en x et y s'annulent par symétrie) :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{2π} ∫_{0}^{z/2} (4rcos(φ) − 4rsin(φ) + 2z)r dr dφ dz
      = ∫_{0}^{2} π·2z·z²/4 dz
      = 2π
  partie 2 (Le disque (2 pts) : 2)
  Le disque du haut
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1} 4r dr dφ
      (Le disque du haut z = 2, r ≤ 1, ν = (0, 0, 1) : F · ν = z² = 4. Son flux :)
      = 4π
  partie 3 (Normale du cône (1,5 pt) : 1,5)
  La normale extérieure du cône
    [free, sans aide, suivre l'erreur]  N
      (Le cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = (-2r cos(φ) ; -2r sin(φ) ; r) pointe vers l'intérieur (vers le haut). La normale extérieure :)
      ? Quelle normale prendre sur le cône ? ✔ L'opposé de σ_r ∧ σ_φ : elle sort de Ω / · σ_r ∧ σ_φ telle quelle
      = (2r cos(φ) ; 2r sin(φ) ; -r)
  partie 4 (Flux du cône (1,5 pt) : 1,5)
  Le flux du cône
    [free, sans aide, suivre l'erreur]  ∫_{0}^{2π} ∫_{0}^{1} (4r³cos(φ)³ − 4r³sin(φ)³ − 4r³) dr dφ
      (Le flux sortant par le cône : F(σ) · N, puis l'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :)
      = ∫_{0}^{2π} ∫_{0}^{1} −4r³ dr dφ
      = −2π
  partie 5 (Conclusion (1 pt) : 1)
  ∭_Ω div F = 2π et le flux sortant total vaut 4π + (−2π). Conclusion :
    · Les deux membres diffèrent de 4π : il faut changer la normale du cône. [v_flux_normal_outward]   · Le flux vaut 6π. [v_flux_normal_outward]   · Les deux membres diffèrent : F n'est pas C¹.   ✔ Les deux membres valent 2π : le théorème est vérifié.
  pièges : v_flux_normal_outward

```

## Petites preuves (3 points) (`v-proof-identity`, BA3)

_Une preuve courte : la définition, la règle de chaîne, l'hypothèse, puis le théorème avec son domaine._

### Niveau 1

```
Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(−x, y), F₁(−x, y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve.
  [blocs order]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(−x, y)] − ∂/∂y [F₂(−x, y)]
    2. ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y), par la règle de chaîne (la dérivée de −x vaut −1)
    3. ∂/∂y [F₂(−x, y)] = (∂F₂/∂y)(−x, y)
    4. rot G(x, y) = −(∂F₁/∂x + ∂F₂/∂y)(−x, y) = −div F(−x, y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(x, −y), F₁(x, −y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve.
  [blocs order]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(x, −y)] − ∂/∂y [F₂(x, −y)]
    2. ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y)
    3. ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y), par la règle de chaîne (la dérivée de −y vaut −1)
    4. rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(−x, y), F₁(−x, y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve.
  [blocs order]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(−x, y)] − ∂/∂y [F₂(−x, y)]
    2. ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y), par la règle de chaîne (la dérivée de −x vaut −1)
    3. ∂/∂y [F₂(−x, y)] = (∂F₂/∂y)(−x, y)
    4. rot G(x, y) = −(∂F₁/∂x + ∂F₂/∂y)(−x, y) = −div F(−x, y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²

```

### Niveau 2

```
Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(x, −y), F₁(x, −y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(x, −y)] − ∂/∂y [F₂(x, −y)]
    2. ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y)
    3. ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y), par la règle de chaîne (la dérivée de −y vaut −1)
    4. rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
    ✗ ∂/∂y [F₂(x, −y)] = (∂F₂/∂y)(x, −y) [v_chain_sign]
  pièges : v_chain_sign

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(x, −y), F₁(x, −y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(x, −y)] − ∂/∂y [F₂(x, −y)]
    2. ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y)
    3. ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y), par la règle de chaîne (la dérivée de −y vaut −1)
    4. rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
    ✗ ∂/∂y [F₂(x, −y)] = (∂F₂/∂y)(x, −y) [v_chain_sign]
  pièges : v_chain_sign

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G = (F₂, −F₁). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order]
    1. rot G = ∂G₂/∂x − ∂G₁/∂y = ∂(−F₁)/∂x − ∂F₂/∂y
    2. rot G = −(∂F₁/∂x + ∂F₂/∂y) = −div F = 0
    3. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
    ✗ rot G = 0, donc G dérive d'un potentiel, quel que soit le domaine [v_pot_no_domain]
  pièges : v_pot_no_domain

```

### Niveau 3

```
On veut montrer : si div F = 0 et G(x, y) = (F₂(x, −y), F₁(x, −y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (2x² − 3y² + 6xy, −4xy − 3y² − 6x²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (2x² − 3(−y)² + 6x(−y))
    (Avec cet exemple, G₂(x, y) = F₁(x, −y) = 2x² − 3(−y)² + 6x(−y). La règle de chaîne : ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y) :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    = 4x + 6(−y)
  — G₁(x, y) = F₂(x, −y) = −4x(−y) − 3(−y)² − 6x². ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y) :  [juge equiv]  départ : ∂/∂y (−4x(−y) − 3(−y)² − 6x²)
    = −(−4x − 6(−y))
  — rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y, avec les deux lignes ci-dessus :  [juge equiv]  départ : ∂/∂x (2x² − 3(−y)² + 6x(−y)) − ∂/∂y (−4x(−y) − 3(−y)² − 6x²)
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (4x + 6(−y)) − (−(−4x − 6(−y)))
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y). | rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0.
  pièges : v_rot_sign, v_div_rot_confuse, v_pot_no_domain

On veut montrer : si div F = 0 et G(x, y) = (F₂(x, −y), F₁(x, −y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (−x² + 3y² − 4xy, 2xy + 2y² − 3x²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (−x² + 3(−y)² − 4x(−y))
    (Avec cet exemple, G₂(x, y) = F₁(x, −y) = −x² + 3(−y)² − 4x(−y). La règle de chaîne : ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y) :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    = −2x − 4(−y)
  — G₁(x, y) = F₂(x, −y) = 2x(−y) + 2(−y)² − 3x². ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y) :  [juge equiv]  départ : ∂/∂y (2x(−y) + 2(−y)² − 3x²)
    = −(2x + 4(−y))
  — rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y, avec les deux lignes ci-dessus :  [juge equiv]  départ : ∂/∂x (−x² + 3(−y)² − 4x(−y)) − ∂/∂y (2x(−y) + 2(−y)² − 3x²)
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (−2x − 4(−y)) − (−(2x + 4(−y)))
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y). | rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0.
  pièges : v_rot_sign, v_div_rot_confuse, v_pot_no_domain

On veut montrer : si div F = 0 et G(x, y) = (F₂(−x, y), F₁(−x, y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (x² − 4xy, −2xy + 2y² − 3x²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [tap, suivre l'erreur, menu menu]  ∂/∂x ((−x)² − 4(−x)y)
    (Avec cet exemple, G₂(x, y) = F₁(−x, y) = (−x)² − 4(−x)y. La règle de chaîne : ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y) :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    = −(2(−x) − 4y)
  — G₁(x, y) = F₂(−x, y) = −2(−x)y + 2y² − 3(−x)². ∂/∂y [F₂(−x, y)] = (∂F₂/∂y)(−x, y) :  [juge equiv]  départ : ∂/∂y (−2(−x)y + 2y² − 3(−x)²)
    = −2(−x) + 4y
  — rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y, avec les deux lignes ci-dessus :  [juge equiv]  départ : ∂/∂x ((−x)² − 4(−x)y) − ∂/∂y (−2(−x)y + 2y² − 3(−x)²)
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (−(2(−x) − 4y)) − (−2(−x) + 4y)
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y). | rot G(x, y) = −(∂F₁/∂x + ∂F₂/∂y)(−x, y) = −div F(−x, y) = 0.
  pièges : g6_chain_forgot, v_rot_sign, v_div_rot_confuse, v_pot_no_domain

```

### Niveau 4

```
On veut montrer : si div F = 0 et G(x, y) = (F₂(x, −y), F₁(x, −y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (x² + 3y² − 4xy, −2xy + 2y²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [free, suivre l'erreur]  ∂/∂x (x² + 3(−y)² − 4x(−y)) − ∂/∂y (−2x(−y) + 2(−y)²)
    (rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (2x − 4(−y)) − (−(−2x + 4(−y)))
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y). | rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0.
  pièges : v_rot_sign, v_div_rot_confuse, v_pot_no_domain

On veut montrer : si div F = 0 et G(x, y) = (F₂(x, −y), F₁(x, −y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (x² + 3y² + 6xy, −2xy − 3y² − 3x²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [free, suivre l'erreur]  ∂/∂x (x² + 3(−y)² + 6x(−y)) − ∂/∂y (−2x(−y) − 3(−y)² − 3x²)
    (rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (2x + 6(−y)) − (−(−2x − 6(−y)))
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y). | rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0.
  pièges : v_rot_sign, v_div_rot_confuse, v_pot_no_domain

On veut montrer : si div F = 0 et G(x, y) = (F₂(x, −y), F₁(x, −y)), alors G dérive d'un potentiel sur ℝ². Vérifie le calcul sur l'exemple F(x, y) = (2x² − 3y² + 2xy, −4xy − y² − 6x²) (div F = 0). Écris rot G avec la règle de chaîne, puis conclus.
  [free, suivre l'erreur]  ∂/∂x (2x² − 3(−y)² + 2x(−y)) − ∂/∂y (−4x(−y) − (−y)² − 6x²)
    (rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y :)
    ? rot G(x, y) = ? ✔ ∂G₂/∂x − ∂G₁/∂y / · ∂G₁/∂y − ∂G₂/∂x / · ∂G₁/∂x + ∂G₂/∂y
    ? Pour conclure que G dérive d'un potentiel : ✔ rot G = 0 sur ℝ², qui est convexe, et G ∈ C¹ / · rot G = 0 suffit, quel que soit le domaine
    = (4x + 2(−y)) − (−(−4x − 2(−y)))
  aides : Écris rot G avec la définition : rot G = ∂G₂/∂x − ∂G₁/∂y. | ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y). | rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0.
  pièges : v_rot_sign, v_div_rot_confuse, v_pot_no_domain

```

### Niveau 5

```
Soit F : ℝ² → ℝ² de classe C¹ avec rot F = 0, et G = (−F₂, F₁). Montre que div G = 0 sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order, sans aide]
    1. div G = ∂G₁/∂x + ∂G₂/∂y = −∂F₂/∂x + ∂F₁/∂y
    2. div G = −(∂F₂/∂x − ∂F₁/∂y) = −rot F = 0
    3. Donc div G = 0 en tout point de ℝ²
    ✗ div G = div F [v_div_rot_confuse]
  pièges : v_div_rot_confuse

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(x, −y), F₁(x, −y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order, sans aide]
    1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(x, −y)] − ∂/∂y [F₂(x, −y)]
    2. ∂/∂x [F₁(x, −y)] = (∂F₁/∂x)(x, −y)
    3. ∂/∂y [F₂(x, −y)] = −(∂F₂/∂y)(x, −y), par la règle de chaîne (la dérivée de −y vaut −1)
    4. rot G(x, y) = (∂F₁/∂x + ∂F₂/∂y)(x, −y) = div F(x, −y) = 0
    5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
    ✗ ∂/∂y [F₂(x, −y)] = (∂F₂/∂y)(x, −y) [v_chain_sign]
    ✗ rot G = ∂G₁/∂y − ∂G₂/∂x [v_rot_sign]
  pièges : v_chain_sign, v_rot_sign

Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G = (F₂, −F₁). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [blocs order, sans aide]
    1. rot G = ∂G₂/∂x − ∂G₁/∂y = ∂(−F₁)/∂x − ∂F₂/∂y
    2. rot G = −(∂F₁/∂x + ∂F₂/∂y) = −div F = 0
    3. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
    ✗ rot G = ∂G₁/∂y − ∂G₂/∂x [v_rot_sign]
    ✗ rot G = 0, donc G dérive d'un potentiel, quel que soit le domaine [v_pot_no_domain]
  pièges : v_rot_sign, v_pot_no_domain

```

### Variantes d'examen

```
Soit F : ℝ² → ℝ² de classe C¹ avec div F = 0, et G(x, y) = (F₂(−x, y), F₁(−x, y)). Montre que G dérive d'un potentiel sur ℝ². Range les blocs de la preuve (attention : certains blocs sont faux).
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [blocs order, sans aide]
      1. rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y = ∂/∂x [F₁(−x, y)] − ∂/∂y [F₂(−x, y)]
      2. ∂/∂x [F₁(−x, y)] = −(∂F₁/∂x)(−x, y), par la règle de chaîne (la dérivée de −x vaut −1)
      3. ∂/∂y [F₂(−x, y)] = (∂F₂/∂y)(−x, y)
      4. rot G(x, y) = −(∂F₁/∂x + ∂F₂/∂y)(−x, y) = −div F(−x, y) = 0
      5. ℝ² est convexe et G est de classe C¹ : G dérive d'un potentiel sur ℝ²
      ✗ rot G = ∂G₁/∂y − ∂G₂/∂x [v_rot_sign]
      ✗ rot G = 0, donc G dérive d'un potentiel, quel que soit le domaine [v_pot_no_domain]
    [examen open]
  pièges : v_rot_sign, v_pot_no_domain

```

## Pièges de cette unité

- **Signe d'une composante de rot F** (`v_rot_sign`, C) : rot F = (0, 0, 2) au lieu de (0, 0, −2) pour F = (y, −x, 0)
- **Composantes de rot F additionnées** (`v_rot_scalar_sum`, C) : « rot F = (λ − 1) + 2(λ − 1)x + 0 = 0 » au lieu de trois équations
- **Dérivées croisées dans le laplacien** (`v_lap_mixed`, E) : Δ(x² + y³ + xy) = 3 + 6y au lieu de 2 + 6y
- **div et rot confondus** (`v_div_rot_confuse`, E) : ∮ F · ν dl = ∬ rot F au lieu de ∬ div F
- **Terme oublié dans la règle du produit** (`v_identity_drop_term`, E) : div(fF) = f div F au lieu de f div F + F · ∇f
- **Courbe parcourue dans l'autre sens** (`v_orientation_reversed`, E) : ∮ = −2π au lieu de 2π
- **Mauvaises bornes du paramètre** (`v_param_bounds`, E) : demi-cercle avec t ∈ [0 ; 2π] au lieu de [0 ; π]
- **Rayon au carré** (`v_radius_squared`, E) : γ(t) = (R² cos t, R² sin t) au lieu de (R cos t, R sin t)
- **Vitesse |γ′(t)| oubliée** (`v_speed_forgot`, E) : ∫₀¹ 7t dt = 7/2 au lieu de ∫₀¹ 7t · 5 dt = 35/2
- **|γ′(t)| en trop dans un travail** (`v_speed_in_work`, E) : ∫ F(γ) · γ′ · |γ′| dt au lieu de ∫ F(γ) · γ′ dt
- **Produit scalaire sans γ′(t)** (`v_gamma_prime_forgot`, E) : ∫ F(γ(t)) dt au lieu de ∫ F(γ(t)) · γ′(t) dt
- **Signe de la primitive de sin t cosᵏ t** (`v_sincos_sign`, C) : ∫₀^π sin t cos²t dt = −2/3 au lieu de 2/3
- **Simple connexité mal jugée** (`v_simply_connected_wrong`, E) : ℝ² \ {0} « simplement connexe » au lieu de non
- **Étoilé pris pour convexe** (`v_convex_star_confuse`, E) : « étoilé, donc convexe » au lieu de convexe ⇒ étoilé seulement
- **rot F = 0 sans regarder le domaine** (`v_pot_no_domain`, C) : « rot F = 0, donc F dérive d'un potentiel » (sans parler de Ω) au lieu de 
- **Une courbe avec ∮ = 0 ne prouve rien** (`v_rot_closed_zero`, C) : « ∮_cercle F · dl = 0, donc potentiel » au lieu de aucune conclusion
- **Constante au lieu d'une fonction inconnue** (`v_pot_const_fn`, C) : φ = x²y + xz + C au lieu de x²y + xz + α(y, z)
- **Les trois primitives additionnées** (`v_pot_double_count`, E) : φ = ∫F₁ dx + ∫F₂ dy + ∫F₃ dz au lieu de termes en double
- **Constante finale mal fixée** (`v_pot_final_const`, C) : φ(1, 2, −1) = 0 donne C = 2 au lieu de C = −2
- **Primitive de c·vᵏ sans diviser** (`v_pot_poly_integral`, C) : ∫ −4z dz = −4z² au lieu de −2z²
- **F = −∇φ** (`v_potential_sign`, E) : F = −∇φ au lieu de F = ∇φ
- **Green avec une singularité dans le domaine** (`v_green_singular`, C) : Green pour (−y, x)/(x² + y²) sur le disque unité : 0 au lieu de 2π
- **Green sans calculer rot F** (`v_green_no_rot`, C) : « par Green, ∮ = aire » au lieu de ∮ = ∬ rot F = 2 · aire
- **Potentiel d'un demi-plan pris pour Ω** (`v_pot_on_restricted`, C) : « φ = Arctg(y/x) + ½ ln(x² + y²) est un potentiel sur ℝ² \ {0} » au lieu de seulement là où x ≠ 0
- **Normale ν tournée du mauvais côté** (`v_nu_formula`, E) : ν = (−γ₂′, γ₁′)/|γ′| au lieu de (γ₂′, −γ₁′)/|γ′|
- **Ordre des intégrales échangé sans changer les bornes** (`v_fubini_bounds`, E) : ∫₀ˣ ∫₀ᵃ … dx dy au lieu de ∫₀ᵃ ∫₀ˣ … dy dx
- **Produit vectoriel dans le mauvais ordre** (`v_cross_order`, E) : σ_φ ∧ σ_r au lieu de σ_r ∧ σ_φ ; 2e composante sans le signe − au lieu de 
- **θ mesuré depuis l'équateur** (`v_sphere_theta`, E) : z = R sin θ au lieu de z = R cos θ (θ depuis l'axe z)
- **Domaine des paramètres trop grand ou trop petit** (`v_surf_domain`, E) : φ ∈ [0 ; 2π] avec y ≥ 0 au lieu de [0 ; π]
- **Aire du domaine A au lieu de celle de Σ** (`v_jacobian_surface`, E) : aire = ∬_A du dv au lieu de ∬_A |σ_u ∧ σ_v| du dv
- **Une composante de σ_u ∧ σ_v au lieu de sa norme** (`v_normal_not_norm`, E) : ∬ f · (σ_u ∧ σ_v)₃ au lieu de ∬ f |σ_u ∧ σ_v|
- **Normale retournée d'un seul côté** (`v_normal_flip`, C) : ∬ rot F · ds = −18π au lieu de 18π (la normale « corrigée » alors que le bord n'a pas été changé)
- **Divisé par |σ_u ∧ σ_v|** (`v_normal_unit_twice`, E) : ∬ F · N/|N| du dv au lieu de ∬ F · N du dv
- **rot F constant multiplié par σ** (`v_curl_eval`, C) : rot F(σ(θ, φ)) = (0, 0, −6 cos θ) au lieu de (0, 0, −2)
- **Bord parcouru dans l'autre sens** (`v_boundary_orient`, C) : (3 cos t, 3 sin t, 0) au lieu de (3 cos t, −3 sin t, 0)
- **Morceau du bord en trop** (`v_boundary_pieces`, C) : ∂Σ = méridien + équateur au lieu de équateur
- **Normale d'une face tournée vers l'intérieur** (`v_flux_normal_outward`, E) : disque du bas avec ν = (0, 0, 1) au lieu de (0, 0, −1)
- **Jacobien oublié** (`v_jacobian_volume`, E) : dr dθ dz au lieu de r dr dθ dz
- **Dérivée intérieure −1 oubliée** (`v_chain_sign`, E) : ∂_x[F₁(−x, y)] = ∂₁F₁(−x, y) au lieu de −∂₁F₁(−x, y)
