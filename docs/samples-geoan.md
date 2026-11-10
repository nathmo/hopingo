# Exemples de questions — Géométrie analytique

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Vecteurs : Chasles, combinaisons, colinéarité (`g4-vectors`, Gymnase)

_AB⃗ = B − A, milieu, parallélogramme, décomposer un vecteur._

### Niveau 1

```
Le parallélogramme ABCD a pour sommets A(−3 ; −6) et B(−4 ; 4), et pour centre M(−2 ; −1). Calcule les coordonnées de C, puis de D.
  [guided]  C
    (M est le milieu de [AC] : C = 2M − A.)
    = C=(2×□-(-3);2×□-(-6))   (trous : C = (2·(-2) - (-3) ; 2·(-1) - (-6)))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (-1 ; 4))
  — C = (−1 ; 4). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·(-2) - (-4) ; 2·(-1) - 4))
    = (□;□)   (trous : (0 ; -6))
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−2) − □ ; 2·(−1) − □) | C = 2M − A = (−1 ; 4)
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(−3 ; −3) et B(−2 ; −6), et pour centre M(−3 ; 0). Calcule les coordonnées de C, puis de D.
  [guided]  C
    (M est le milieu de [AC] : C = 2M − A.)
    = C=(2×□-(-3);2×□-(-3))   (trous : C = (2·(-3) - (-3) ; 2·0 - (-3)))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (-3 ; 3))
  — C = (−3 ; 3). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·(-3) - (-2) ; 2·0 - (-6)))
    = (□;□)   (trous : (-4 ; 6))
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−3) − □ ; 2·0 − □) | C = 2M − A = (−3 ; 3)
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(3 ; −6) et B(−6 ; −4), et pour centre M(−3 ; −1). Calcule les coordonnées de C, puis de D.
  [guided]  C
    (M est le milieu de [AC] : C = 2M − A.)
    = C=(2×□-3;2×□-(-6))   (trous : C = (2·(-3) - 3 ; 2·(-1) - (-6)))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (-9 ; 4))
  — C = (−9 ; 4). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·(-3) - (-6) ; 2·(-1) - (-4)))
    = (□;□)   (trous : (0 ; 2))
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−3) − □ ; 2·(−1) − □) | C = 2M − A = (−9 ; 4)
  pièges : g4_midpoint_half

```

### Niveau 2

```
Le parallélogramme ABCD a pour sommets A(0 ; 4) et B(2 ; 5), et pour centre M(2 ; 0). Calcule les coordonnées de C, puis de D.
  [guided]  C
    ? Quelle relation donne C ? · C = 2M + A / · C = M − A / ✔ C = 2M − A
    = C=(□;□)   (trous : C = (2·2 - 0 ; 2·0 - 4))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (4 ; -4))
  — C = (4 ; −4). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·2 - 2 ; 2·0 - 5))
    = (2 ; -5)
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·2 − □ ; 2·0 − □) | C = 2M − A = (4 ; −4)
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(5 ; −1) et B(−4 ; 2), et pour centre M(−2 ; −1). Calcule les coordonnées de C, puis de D.
  [guided]  C
    ? Quelle relation donne C ? · C = M − A / ✔ C = 2M − A / · C = 2M + A
    = C=(□;□)   (trous : C = (2·(-2) - 5 ; 2·(-1) - (-1)))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (-9 ; -1))
  — C = (−9 ; −1). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·(-2) - (-4) ; 2·(-1) - 2))
    = (0 ; -4)
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−2) − □ ; 2·(−1) − □) | C = 2M − A = (−9 ; −1)
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(−5 ; 6) et B(−4 ; 0), et pour centre M(−2 ; 1). Calcule les coordonnées de C, puis de D.
  [guided]  C
    ? Quelle relation donne C ? ✔ C = 2M − A / · C = 2M + A / · C = M − A
    = C=(□;□)   (trous : C = (2·(-2) - (-5) ; 2·1 - 6))   ← Coordonnée par coordonnée
    = (□;□)   (trous : (1 ; -4))
  — C = (1 ; −4). Et D ?  [juge vector]  départ : D
    (M est aussi le milieu de [BD] : D = 2M − B.)
    = D=(□;□)   (trous : D = (2·(-2) - (-4) ; 2·1 - 0))
    = (0 ; 2)
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−2) − □ ; 2·1 − □) | C = 2M − A = (1 ; −4)
  pièges : g4_midpoint_half

```

### Niveau 3

```
Les points A(−4 ; 6), B(4 ; −2) et C(4 ; −8) sont trois sommets du parallélogramme ABCD. Calcule les coordonnées de D.
  [tap, suivre l'erreur, menu menu]  D
    = D = A + vec(B,C)   ← ABCD parallélogramme ⇔ AD⃗ = BC⃗
    = D = ((-4) + 4 - 4 ; 6 + (-8) - (-2))   ← BC⃗ = C − B
    = (-4 ; 0)
  aides : Dans un parallélogramme ABCD, AD⃗ = BC⃗ : D = A + BC⃗. | D = A + (C − B) = (−4 + □ ; 6 + □) | D = (−4 ; 0)
  pièges : g4_vector_reversed

Les points A(0 ; −6), B(1 ; 0) et C(0 ; 6) sont trois sommets du parallélogramme ABCD. Calcule les coordonnées de D.
  [tap, suivre l'erreur, menu menu]  D
    = D = A + vec(B,C)   ← ABCD parallélogramme ⇔ AD⃗ = BC⃗
    = D = (0 + 0 - 1 ; (-6) + 6 - 0)   ← BC⃗ = C − B
    = (-1 ; 0)
  aides : Dans un parallélogramme ABCD, AD⃗ = BC⃗ : D = A + BC⃗. | D = A + (C − B) = (0 + □ ; −6 + □) | D = (−1 ; 0)
  pièges : g4_vector_reversed

Les points A(−6 ; 5), B(−6 ; 0) et C(0 ; −3) sont trois sommets du parallélogramme ABCD. Calcule les coordonnées de D.
  [tap, suivre l'erreur, menu menu]  D
    = D = A + vec(B,C)   ← ABCD parallélogramme ⇔ AD⃗ = BC⃗
    = D = ((-6) + 0 - (-6) ; 5 + (-3) - 0)   ← BC⃗ = C − B
    = (0 ; 2)
  aides : Dans un parallélogramme ABCD, AD⃗ = BC⃗ : D = A + BC⃗. | D = A + (C − B) = (−6 + □ ; 5 + □) | D = (0 ; 2)
  pièges : g4_vector_reversed

```

### Niveau 4

```
Les points A(1 ; 5), B(2 ; 6) et C(7 ; 7) sont trois sommets du parallélogramme ABCD. Calcule les coordonnées de D.
  [free, suivre l'erreur]  D
    = D = A + vec(B,C)   ← ABCD parallélogramme ⇔ AD⃗ = BC⃗
    = D = (1 + 7 - 2 ; 5 + 7 - 6)   ← BC⃗ = C − B
    = (6 ; 6)
  aides : Dans un parallélogramme ABCD, AD⃗ = BC⃗ : D = A + BC⃗. | D = A + (C − B) = (1 + □ ; 5 + □) | D = (6 ; 6)
  pièges : g4_vector_reversed

Le parallélogramme ABCD a pour sommets A(0 ; 5) et B(2 ; 4), et pour centre M(0 ; 4). Calcule les coordonnées de C, puis de D.
  [free, suivre l'erreur]  C
    = C = 2M − A   ← M est le milieu de [AC]
    = C = (2·0 - 0 ; 2·4 - 5)   ← Coordonnée par coordonnée
    = (0 ; 3)
  — C = (0 ; 3). Et D ?  [juge vector]  départ : D
    = D = 2M − B   ← M est aussi le milieu de [BD]
    = D = (2·0 - 2 ; 2·4 - 4)
    = (-2 ; 4)
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·0 − □ ; 2·4 − □) | C = 2M − A = (0 ; 3)
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(4 ; 2) et B(−2 ; 0), et pour centre M(−1 ; 3). Calcule les coordonnées de C, puis de D.
  [free, suivre l'erreur]  C
    = C = 2M − A   ← M est le milieu de [AC]
    = C = (2·(-1) - 4 ; 2·3 - 2)   ← Coordonnée par coordonnée
    = (-6 ; 4)
  — C = (−6 ; 4). Et D ?  [juge vector]  départ : D
    = D = 2M − B   ← M est aussi le milieu de [BD]
    = D = (2·(-1) - (-2) ; 2·3 - 0)
    = (0 ; 6)
  aides : Le centre d'un parallélogramme est le milieu de chaque diagonale : M = (A + C)/2. | C = 2M − □ = (2·(−1) − □ ; 2·3 − □) | C = 2M − A = (−6 ; 4)
  pièges : g4_midpoint_half

```

### Niveau 5

```
Le parallélogramme ABCD a pour sommets A(−6 ; 2) et B(1 ; 5), et pour centre M(1 ; 2). Calcule les coordonnées de C, puis de D. Vérifie ensuite que AB⃗ = DC⃗, puis décompose un vecteur dans la base (AB⃗, AD⃗).
  [free, sans aide]  C
    = C = 2M − A   ← M est le milieu de [AC]
    = C = (2·1 - (-6) ; 2·2 - 2)   ← Coordonnée par coordonnée
    = (8 ; 2)
  — C = (8 ; 2). Et D ?  [juge vector]  départ : D
    = D = 2M − B   ← M est aussi le milieu de [BD]
    = D = (2·1 - 1 ; 2·2 - 5)
    = (1 ; -1)
  — Vérifie que AB⃗ = DC⃗.  [juge vector]  départ : vec(D,C)
    = vec(A,B) = (7 ; 3)   ← Les deux vecteurs sont égaux
  — Écris w⃗ = (0 ; 6) comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = (7 ; 3) et v⃗ = AD⃗ = (7 ; −3). Le système : 7α + 7β = 0 et 3α − 3β = 6. Que vaut α ?  [juge value]  départ : α
    = 1   ← Par combinaison des deux équations
  — Et β ?  [juge value]  départ : β
    = −1
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(1 ; −4) et B(−5 ; 3), et pour centre M(−1 ; 0). Calcule les coordonnées de C, puis de D. Vérifie ensuite que AB⃗ = DC⃗, puis décompose un vecteur dans la base (AB⃗, AD⃗).
  [free, sans aide]  C
    = C = 2M − A   ← M est le milieu de [AC]
    = C = (2·(-1) - 1 ; 2·0 - (-4))   ← Coordonnée par coordonnée
    = (-3 ; 4)
  — C = (−3 ; 4). Et D ?  [juge vector]  départ : D
    = D = 2M − B   ← M est aussi le milieu de [BD]
    = D = (2·(-1) - (-5) ; 2·0 - 3)
    = (3 ; -3)
  — Vérifie que AB⃗ = DC⃗.  [juge vector]  départ : vec(D,C)
    = vec(A,B) = (-6 ; 7)   ← Les deux vecteurs sont égaux
  — Écris w⃗ = (−16 ; 32) comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = (−6 ; 7) et v⃗ = AD⃗ = (2 ; 1). Le système : −6α + 2β = −16 et 7α + β = 32. Que vaut α ?  [juge value]  départ : α
    = 4   ← Par combinaison des deux équations
  — Et β ?  [juge value]  départ : β
    = 4
  pièges : g4_midpoint_half

Le parallélogramme ABCD a pour sommets A(−2 ; −2) et B(−6 ; −5), et pour centre M(−2 ; −4). Calcule les coordonnées de C, puis de D. Vérifie ensuite que AB⃗ = DC⃗, puis décompose un vecteur dans la base (AB⃗, AD⃗).
  [free, sans aide]  C
    = C = 2M − A   ← M est le milieu de [AC]
    = C = (2·(-2) - (-2) ; 2·(-4) - (-2))   ← Coordonnée par coordonnée
    = (-2 ; -6)
  — C = (−2 ; −6). Et D ?  [juge vector]  départ : D
    = D = 2M − B   ← M est aussi le milieu de [BD]
    = D = (2·(-2) - (-6) ; 2·(-4) - (-5))
    = (2 ; -3)
  — Vérifie que AB⃗ = DC⃗.  [juge vector]  départ : vec(D,C)
    = vec(A,B) = (-4 ; -3)   ← Les deux vecteurs sont égaux
  — Écris w⃗ = (24 ; 10) comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = (−4 ; −3) et v⃗ = AD⃗ = (4 ; −1). Le système : −4α + 4β = 24 et −3α − β = 10. Que vaut α ?  [juge value]  départ : α
    = −4   ← Par combinaison des deux équations
  — Et β ?  [juge value]  départ : β
    = 2
  pièges : g4_midpoint_half

```

### Variantes d'examen

```
Le parallélogramme ABCD a pour sommets A(2 ; 1), B(3 ; 6) et pour centre M(1 ; 2). Quelles sont les coordonnées de C ?
  · (3/2 ; 3/2) [g4_midpoint_half]   · (−1 ; 1) [g4_midpoint_half]   · (4 ; 5) [g4_midpoint_half]   ✔ (0 ; 3)
  [examen mcq]
  pièges : g4_midpoint_half

Vrai ou faux ?
  « M est le milieu de [AB] si et seulement si AM⃗ = MB⃗. » → VRAI
  [examen tf]

Le parallélogramme ABCD a pour sommets A(−4 ; −6) et B(−5 ; −2), et pour centre M(−1 ; −1). Calcule les coordonnées de C, puis de D. Vérifie ensuite que AB⃗ = DC⃗, puis décompose un vecteur dans la base (AB⃗, AD⃗).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; C = (2 ; 4). Et D ? : 1 ; Vérifie que AB⃗ = DC⃗. : 1 ; Écris w⃗ = (29 ; 20) comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = (−1 ; 4) et v⃗ = AD⃗ = (7 ; 6). Le système : −α + 7β = 29 et 4α + 6β = 20. Que vaut α ? : 0,5 ; Et β ? : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  C
      = C = 2M − A   ← M est le milieu de [AC]
      = C = (2·(-1) - (-4) ; 2·(-1) - (-6))   ← Coordonnée par coordonnée
      = (2 ; 4)
    — C = (2 ; 4). Et D ?  [juge vector]  départ : D
      = D = 2M − B   ← M est aussi le milieu de [BD]
      = D = (2·(-1) - (-5) ; 2·(-1) - (-2))
      = (3 ; 0)
    — Vérifie que AB⃗ = DC⃗.  [juge vector]  départ : vec(D,C)
      = vec(A,B) = (-1 ; 4)   ← Les deux vecteurs sont égaux
    — Écris w⃗ = (29 ; 20) comme combinaison αu⃗ + βv⃗ de u⃗ = AB⃗ = (−1 ; 4) et v⃗ = AD⃗ = (7 ; 6). Le système : −α + 7β = 29 et 4α + 6β = 20. Que vaut α ?  [juge value]  départ : α
      = −1   ← Par combinaison des deux équations
    — Et β ?  [juge value]  départ : β
      = 4
  pièges : g4_midpoint_half

```

## Droite du plan : paramétrique, cartésienne, intersection (`g4-line2`, Gymnase)

_A + t·v⃗, ax + by + c = 0, et le point commun de deux droites._

### Niveau 1

```
Dans le plan, la droite d passe par A(2 ; −1) et a pour direction v⃗ = (−1 ; 2). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-2y-9 = 0.
  [guided]  d
    (Comment passer à la cartésienne ? Éliminer t entre x et y.)
    = (x;y)=□+t(-1;2)   (trous : (x ; y) = (2 ; -1) + t(-1 ; 2))   ← Paramétrique
    = □x + y = 2·2 + 1·□   (trous : 2x + y = 2·2 + 1·(−1))   ← 2·x et 1·y : t disparaît
    = 2x + y − □ = 0   (trous : 2x + y − 3 = 0)   ← Cartésienne
  — d : 2x+y-3 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (2 − t) + (−2)·(−1 + 2t) + (−9) = 0
    = □t − 5 = 0   (trous : −5t − 5 = 0)   ← Développer
    = t = □   (trous : t = −1)
  — t = −1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (2 + (-1)·(-1) ; -1 + 2·(-1))   ← Remplacer t
    = I=(□;□)   (trous : I = (3 ; -3))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (2 ; 1) donne 2x + y = 2x_A + y_A. | 2x + y = 2·(□) + 1·(□) | 2x+y-3 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−4 ; 4) et a pour direction v⃗ = (−1 ; −3). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : 3x-2y+11 = 0.
  [guided]  d
    (Comment passer à la cartésienne ? Éliminer t entre x et y.)
    = (x;y)=□+t(-1;-3)   (trous : (x ; y) = (-4 ; 4) + t(-1 ; -3))   ← Paramétrique
    = 3x − y = 3·□ + (−1)·□   (trous : 3x − y = 3·(−4) + (−1)·4)   ← 3·x et −1·y : t disparaît
    = 3x − y + □ = 0   (trous : 3x − y + 16 = 0)   ← Cartésienne
  — d : 3x-y+16 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : 3·(−4 − t) + (−2)·(4 − 3t) + 11 = 0
    = □t − 9 = 0   (trous : 3t − 9 = 0)   ← Développer
    = t = □   (trous : t = 3)
  — t = 3. Le point d'intersection ?  [juge vector]  départ : I
    = I = (-4 + (-1)·3 ; 4 + (-3)·3)   ← Remplacer t
    = I=(□;□)   (trous : I = (-7 ; -5))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (3 ; −1) donne 3x − y = 3x_A − y_A. | 3x − y = 3·(□) + (−1)·(□) | 3x-y+16 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−1 ; −5) et a pour direction v⃗ = (−1 ; −4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : y+1 = 0.
  [guided]  d
    (Comment passer à la cartésienne ? Éliminer t entre x et y.)
    = (x;y)=□+t(-1;-4)   (trous : (x ; y) = (-1 ; -5) + t(-1 ; -4))   ← Paramétrique
    = 4x − y = 4·□ + (−1)·□   (trous : 4x − y = 4·(−1) + (−1)·(−5))   ← 4·x et −1·y : t disparaît
    = 4x − y − □ = 0   (trous : 4x − y − 1 = 0)   ← Cartésienne
  — d : 4x-y-1 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−5 − 4t) + 1 = 0
    = □t − 4 = 0   (trous : −4t − 4 = 0)   ← Développer
    = t = □   (trous : t = −1)
  — t = −1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (-1 + (-1)·(-1) ; -5 + (-4)·(-1))   ← Remplacer t
    = I=(□;□)   (trous : I = (0 ; -1))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (4 ; −1) donne 4x − y = 4x_A − y_A. | 4x − y = 4·(□) + (−1)·(□) | 4x-y-1 = 0
  pièges : g4_normal_as_direction, g4_line_constant

```

### Niveau 2

```
Dans le plan, la droite d passe par A(−4 ; −3) et a pour direction v⃗ = (2 ; 3). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : 2x+3y-22 = 0.
  [guided]  d
    ? Comment passer à la cartésienne ? ✔ Éliminer t entre x et y / ✔ Prendre la normale (v₂ ; −v₁) = (3 ; −2), puis la constante / · Prendre (2 ; 3) comme normale
    = (x;y)=□+t□   (trous : (x ; y) = (-4 ; -3) + t(2 ; 3))   ← Paramétrique
    = □ = 3·(−4) + (−2)·(−3)   (trous : 3x − 2y = 3·(−4) + (−2)·(−3))   ← 3·x et −2·y : t disparaît
    = 3x − 2y + □ = 0   (trous : 3x − 2y + 6 = 0)   ← Cartésienne
  — d : 3x-2y+6 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : 2·(−4 + 2t) + 3·(−3 + 3t) + (−22) = 0
    = □t − 39 = 0   (trous : 13t − 39 = 0)   ← Développer
    = t = □   (trous : t = 3)
  — t = 3. Le point d'intersection ?  [juge vector]  départ : I
    = I = (-4 + 2·3 ; -3 + 3·3)   ← Remplacer t
    = I=(□;□)   (trous : I = (2 ; 6))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (3 ; −2) donne 3x − 2y = 3x_A − 2y_A. | 3x − 2y = 3·(□) + (−2)·(□) | 3x-2y+6 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(1 ; 2) et a pour direction v⃗ = (3 ; −4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-7 = 0.
  [guided]  d
    ? Comment passer à la cartésienne ? ✔ Éliminer t entre x et y / ✔ Prendre la normale (v₂ ; −v₁) = (4 ; 3), puis la constante / · Prendre (3 ; −4) comme normale
    = (x;y)=□+t□   (trous : (x ; y) = (1 ; 2) + t(3 ; -4))   ← Paramétrique
    = □ = 4·1 + 3·2   (trous : 4x + 3y = 4·1 + 3·2)   ← 4·x et 3·y : t disparaît
    = 4x + 3y − □ = 0   (trous : 4x + 3y − 10 = 0)   ← Cartésienne
  — d : 4x+3y-10 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (1 + 3t) + (−7) = 0
    = □t − 6 = 0   (trous : 3t − 6 = 0)   ← Développer
    = t = □   (trous : t = 2)
  — t = 2. Le point d'intersection ?  [juge vector]  départ : I
    = I = (1 + 3·2 ; 2 + (-4)·2)   ← Remplacer t
    = I=(□;□)   (trous : I = (7 ; -6))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (4 ; 3) donne 4x + 3y = 4x_A + 3y_A. | 4x + 3y = 4·(□) + 3·(□) | 4x+3y-10 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(5 ; 1) et a pour direction v⃗ = (−3 ; −4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-y-6 = 0.
  [guided]  d
    ? Comment passer à la cartésienne ? ✔ Éliminer t entre x et y / ✔ Prendre la normale (v₂ ; −v₁) = (4 ; −3), puis la constante / · Prendre (−3 ; −4) comme normale
    = (x;y)=□+t□   (trous : (x ; y) = (5 ; 1) + t(-3 ; -4))   ← Paramétrique
    = □ = 4·5 + (−3)·1   (trous : 4x − 3y = 4·5 + (−3)·1)   ← 4·x et −3·y : t disparaît
    = 4x − 3y − □ = 0   (trous : 4x − 3y − 17 = 0)   ← Cartésienne
  — d : 4x-3y-17 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (5 − 3t) − (1 − 4t) + (−6) = 0
    = t − 2 = 0   ← Développer
    = t = □   (trous : t = 2)
  — t = 2. Le point d'intersection ?  [juge vector]  départ : I
    = I = (5 + (-3)·2 ; 1 + (-4)·2)   ← Remplacer t
    = I=(□;□)   (trous : I = (-1 ; -7))
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (4 ; −3) donne 4x − 3y = 4x_A − 3y_A. | 4x − 3y = 4·(□) + (−3)·(□) | 4x-3y-17 = 0
  pièges : g4_normal_as_direction, g4_line_constant

```

### Niveau 3

```
Dans le plan, la droite d passe par A(2 ; 1) et est perpendiculaire à la droite h : -x+3y-6 = 0. Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x+3y+11 = 0.
  [tap, suivre l'erreur, menu menu]  d
    (d est perpendiculaire à h : le vecteur normal de h, (−1 ; 3), dirige d.)
    = (x ; y) = (2 ; 1) + t(-1 ; 3)   ← Paramétrique
    = 3x + y = 3·2 + 1·1   ← 3·x et 1·y : t disparaît
    = 3x + y − 7 = 0   ← Cartésienne
  — d : 3x+y-7 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (2 − t) + 3·(1 + 3t) + 11 = 0
    = 8t + 16 = 0   ← Développer
    = t = −2
  — t = −2. Le point d'intersection ?  [juge vector]  départ : I
    = I = (4 ; -5)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (3 ; 1) donne 3x + y = 3x_A + y_A. | 3x + y = 3·(□) + 1·(□) | 3x+y-7 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−3 ; 1) et B(−2 ; 2). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x+y+4 = 0.
  [tap, suivre l'erreur, menu menu]  d
    (Une direction : v⃗ = AB⃗ = (1 ; 1).)
    = (x ; y) = (-3 ; 1) + t(1 ; 1)   ← Paramétrique
    = x − y = 1·(−3) + (−1)·1   ← 1·x et −1·y : t disparaît
    = x − y + 4 = 0   ← Cartésienne
  — d : x-y+4 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−3 + t) + (1 + t) + 4 = 0
    = 2t + 2 = 0   ← Développer
    = t = −1
  — t = −1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (-4 ; 0)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (1 ; −1) donne x − y = x_A − y_A. | x − y = 1·(□) + (−1)·(□) | x-y+4 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(2 ; −5) et B(3 ; −4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : 3x+2y-1 = 0.
  [tap, suivre l'erreur, menu menu]  d
    (Une direction : v⃗ = AB⃗ = (1 ; 1).)
    = (x ; y) = (2 ; -5) + t(1 ; 1)   ← Paramétrique
    = x − y = 1·2 + (−1)·(−5)   ← 1·x et −1·y : t disparaît
    = x − y − 7 = 0   ← Cartésienne
  — d : x-y-7 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : 3·(2 + t) + 2·(−5 + t) + (−1) = 0
    = 5t − 5 = 0   ← Développer
    = t = 1
  — t = 1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (3 ; -4)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (1 ; −1) donne x − y = x_A − y_A. | x − y = 1·(□) + (−1)·(□) | x-y-7 = 0
  pièges : g4_normal_as_direction, g4_line_constant

```

### Niveau 4

```
Dans le plan, la droite d passe par A(3 ; −4) et est perpendiculaire à la droite h : y-1 = 0. Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : 2x-3y-21 = 0.
  [free, suivre l'erreur]  d
    (d est perpendiculaire à h : le vecteur normal de h, (0 ; 1), dirige d.)
    = (x ; y) = (3 ; -4) + t(0 ; 1)   ← Paramétrique
    = x = 1·3 + 0·(−4)   ← 1·x et 0·y : t disparaît
    = x − 3 = 0   ← Cartésienne
  — d : x-3 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : 2·3 + (−3)·(−4 + t) + (−21) = 0
    = −3t − 3 = 0   ← Développer
    = t = −1
  — t = −1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (3 ; -5)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (1 ; 0) donne x = x_A. | x = 1·(□) + 0·(□) | x-3 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−3 ; −1) et B(−5 ; −4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-2y+13 = 0.
  [free, suivre l'erreur]  d
    (Une direction : v⃗ = AB⃗ = (−2 ; −3).)
    = (x ; y) = (-3 ; -1) + t(-2 ; -3)   ← Paramétrique
    = 3x − 2y = 3·(−3) + (−2)·(−1)   ← 3·x et −2·y : t disparaît
    = 3x − 2y + 7 = 0   ← Cartésienne
  — d : 3x-2y+7 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−3 − 2t) + (−2)·(−1 − 3t) + 13 = 0
    = 4t + 12 = 0   ← Développer
    = t = −3
  — t = −3. Le point d'intersection ?  [juge vector]  départ : I
    = I = (3 ; 8)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (3 ; −2) donne 3x − 2y = 3x_A − 2y_A. | 3x − 2y = 3·(□) + (−2)·(□) | 3x-2y+7 = 0
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(1 ; −1) et est perpendiculaire à la droite h : -x+y+5 = 0. Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-2y = 0.
  [free, suivre l'erreur]  d
    (d est perpendiculaire à h : le vecteur normal de h, (−1 ; 1), dirige d.)
    = (x ; y) = (1 ; -1) + t(-1 ; 1)   ← Paramétrique
    = x + y = 1·1 + 1·(−1)   ← 1·x et 1·y : t disparaît
    = x + y = 0   ← Cartésienne
  — d : x+y = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (1 − t) + (−2)·(−1 + t) = 0
    = −3t + 3 = 0   ← Développer
    = t = 1
  — t = 1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (0 ; 0)
  aides : Écris d sous forme paramétrique A + t·v⃗, puis élimine t : la normale (v₂ ; −v₁) = (1 ; 1) donne x + y = x_A + y_A. | x + y = 1·(□) + 1·(□) | x+y = 0
  pièges : g4_normal_as_direction

```

### Niveau 5

```
Dans le plan, la droite d passe par A(1 ; 5) et a pour direction v⃗ = (3 ; 4). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : y-9 = 0.
  [free, sans aide]  d
    = (x ; y) = (1 ; 5) + t(3 ; 4)   ← Paramétrique
    = 4x − 3y = 4·1 + (−3)·5   ← 4·x et −3·y : t disparaît
    = 4x − 3y + 11 = 0   ← Cartésienne
  — d : 4x-3y+11 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (5 + 4t) + (−9) = 0
    ? Les normales (4 ; −3) et (0 ; 1) sont-elles colinéaires ? ✔ Non : les droites sont sécantes / · Oui : parallèles (sans point commun) / · Oui : confondues
    = 4t − 4 = 0   ← Développer
    = t = 1
  — t = 1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (4 ; 9)
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−4 ; 2) et a pour direction v⃗ = (−3 ; −2). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-3y+16 = 0.
  [free, sans aide]  d
    = (x ; y) = (-4 ; 2) + t(-3 ; -2)   ← Paramétrique
    = 2x − 3y = 2·(−4) + (−3)·2   ← 2·x et −3·y : t disparaît
    = 2x − 3y + 14 = 0   ← Cartésienne
  — d : 2x-3y+14 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−4 − 3t) + (−3)·(2 − 2t) + 16 = 0
    ? Les normales (2 ; −3) et (1 ; −3) sont-elles colinéaires ? ✔ Non : les droites sont sécantes / · Oui : parallèles (sans point commun) / · Oui : confondues
    = 3t + 6 = 0   ← Développer
    = t = −2
  — t = −2. Le point d'intersection ?  [juge vector]  départ : I
    = I = (2 ; 6)
  pièges : g4_normal_as_direction, g4_line_constant

Dans le plan, la droite d passe par A(−3 ; −4) et a pour direction v⃗ = (3 ; −1). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x+y+1 = 0.
  [free, sans aide]  d
    = (x ; y) = (-3 ; -4) + t(3 ; -1)   ← Paramétrique
    = x + 3y = 1·(−3) + 3·(−4)   ← 1·x et 3·y : t disparaît
    = x + 3y + 15 = 0   ← Cartésienne
  — d : x+3y+15 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−3 + 3t) + (−4 − t) + 1 = 0
    ? Les normales (1 ; 3) et (1 ; 1) sont-elles colinéaires ? ✔ Non : les droites sont sécantes / · Oui : parallèles (sans point commun) / · Oui : confondues
    = 2t − 6 = 0   ← Développer
    = t = 3
  — t = 3. Le point d'intersection ?  [juge vector]  départ : I
    = I = (6 ; -7)
  pièges : g4_normal_as_direction, g4_line_constant

```

### Variantes d'examen

```
Quelle est une équation cartésienne de la droite passant par A(2 ; −1), de direction v⃗ = (2 ; −3) ?
  · 3x+2y+4 = 0 [g4_line_constant]   ✔ 3x+2y-4 = 0   · 3x+2y = 0 [g4_line_constant]   · 2x-3y-7 = 0 [g4_normal_as_direction]
  [examen mcq]
  pièges : g4_normal_as_direction, g4_line_constant

Vrai ou faux ?
  « Les droites 2x+3y-6 = 0 et 4x+6y-9 = 0 sont parallèles et distinctes. » → VRAI
  [examen tf]

Dans le plan, la droite d passe par A(−5 ; 0) et a pour direction v⃗ = (−4 ; 3). Donne une équation cartésienne de d (coefficients entiers), puis le point d'intersection I de d et de la droite g : x-3 = 0.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1,5 ; d : 3x+4y+15 = 0. Remplace la paramétrique de d dans g. : 1,5 ; t = −2. Le point d'intersection ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  d
      = (x ; y) = (-5 ; 0) + t(-4 ; 3)   ← Paramétrique
      = 3x + 4y = 3·(−5) + 4·0   ← 3·x et 4·y : t disparaît
      = 3x + 4y + 15 = 0   ← Cartésienne
    — d : 3x+4y+15 = 0. Remplace la paramétrique de d dans g.  [juge solset]  départ : (−5 − 4t) + (−3) = 0
      ? Les normales (3 ; 4) et (1 ; 0) sont-elles colinéaires ? ✔ Non : les droites sont sécantes / · Oui : parallèles (sans point commun) / · Oui : confondues
      = −4t − 8 = 0   ← Développer
      = t = −2
    — t = −2. Le point d'intersection ?  [juge vector]  départ : I
      = I = (3 ; -6)
  pièges : g4_normal_as_direction, g4_line_constant

```

## Produit scalaire, angles, projection d'un vecteur (`g4-dot`, Gymnase)

_u⃗·v⃗ = ‖u⃗‖‖v⃗‖cos θ, angle de deux droites, projection._

### Niveau 1

```
Le triangle ABC a pour sommets A(−2 ; 1 ; 2), B(−5 ; −1 ; 0) et C(0 ; 1 ; −1). Calcule l'angle θ du triangle en A (en radians, valeur exacte ou arccos(…)). On a AB⃗ = (−3 ; −2 ; −2) et AC⃗ = (2 ; 0 ; −3).
  [guided]  AB·AC
    = (-3 ; -2 ; -2)·(2 ; 0 ; -3)   ← Les composantes
    = (−3)·□ + (−2)·□ + (−2)·(−3)   (trous : (−3)·2 + (−2)·0 + (−2)·(−3))   ← Produit scalaire
    = □   (trous : 0)
  — AB·AC = 0. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √(□)·√(2² + 0² + (−3)²)   (trous : √((−3)² + (−2)² + (−2)²)·√(2² + 0² + (−3)²))   ← Pythagore
    = □   (trous : √221)   ← ‖AB‖ = √17, ‖AC‖ = √13
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos θ = AB·AC/(‖AB‖·‖AC‖)   ← cos θ = u⃗·v⃗/(‖u⃗‖‖v⃗‖)
    = cos(θ) = □   (trous : cos(θ) = 0)   ← 0/(√221)
  — cos θ = 0. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/2)   ← Un angle remarquable
  aides : cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖). | cos θ = 0 / (□·□) | cos θ = 0, donc θ = π/2

Deux droites ont pour vecteurs directeurs u⃗ = (−3 ; −2) et v⃗ = (−2 ; 3). Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).
  [guided]  u·v
    = (-3 ; -2)·(-2 ; 3)   ← Les composantes
    = (−3)·□ + (−2)·□   (trous : (−3)·(−2) + (−2)·3)   ← Produit scalaire
    = □   (trous : 0)
  — u·v = 0. Les normes ?  [juge vector]  départ : ‖u‖·‖v‖
    = √(□)·√((−2)² + 3²)   (trous : √((−3)² + (−2)²)·√((−2)² + 3²))   ← Pythagore
    = □   (trous : 13)   ← ‖u‖ = √13, ‖v‖ = √13
  — L'angle de deux droites est le plus petit : on prend |cos θ|.  [juge vector]  départ : cos(θ)
    = cos θ = |u·v|/(‖u‖·‖v‖)   ← |cos θ| pour deux droites
    = cos(θ) = □   (trous : cos(θ) = 0)   ← 0/(13)
  — cos θ = 0. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/2)   ← Un angle remarquable
  aides : cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites. | cos θ = |0| / 13 | cos θ = 0, θ = π/2

Deux droites ont pour vecteurs directeurs u⃗ = (−2 ; 1) et v⃗ = (3 ; 1). Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).
  [guided]  u·v
    = (-2 ; 1)·(3 ; 1)   ← Les composantes
    = (−2)·□ + □·1   (trous : (−2)·3 + 1·1)   ← Produit scalaire
    = □   (trous : −5)
  — u·v = −5. Les normes ?  [juge vector]  départ : ‖u‖·‖v‖
    = √(□)·√(3² + 1²)   (trous : √((−2)² + 1²)·√(3² + 1²))   ← Pythagore
    = □   (trous : 5√2)   ← ‖u‖ = √5, ‖v‖ = √10
  — L'angle de deux droites est le plus petit : on prend |cos θ|.  [juge vector]  départ : cos(θ)
    = cos θ = |u·v|/(‖u‖·‖v‖)   ← |cos θ| pour deux droites
    = cos(θ) = □   (trous : cos(θ) = √2/2)   ← 5/(5√2)
  — cos θ = √2/2. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/4)   ← Un angle remarquable
  aides : cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites. | cos θ = |−5| / 5√2 | cos θ = √2/2, θ = π/4

```

### Niveau 2

```
Deux droites ont pour vecteurs directeurs u⃗ = (0 ; −2 ; −2) et v⃗ = (1 ; 0 ; 0). Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).
  [guided]  u·v
    = (0 ; -2 ; -2)·(1 ; 0 ; 0)   ← Les composantes
    = 0·□ + (−2)·□ + (−2)·0   (trous : 0·1 + (−2)·0 + (−2)·0)   ← Produit scalaire
    = □   (trous : 0)
  — u·v = 0. Les normes ?  [juge vector]  départ : ‖u‖·‖v‖
    = √(□)·√(1² + 0² + 0²)   (trous : √(0² + (−2)² + (−2)²)·√(1² + 0² + 0²))   ← Pythagore
    = □   (trous : 2√2)   ← ‖u‖ = 2√2, ‖v‖ = 1
  — L'angle de deux droites est le plus petit : on prend |cos θ|.  [juge vector]  départ : cos(θ)
    ? Angle de deux vecteurs, ou de deux droites ? ✔ De deux droites : on prend |cos θ| / · De deux vecteurs : cos θ tel quel
    = cos θ = |u·v|/(‖u‖·‖v‖)   ← |cos θ| pour deux droites
    = cos(θ) = □   (trous : cos(θ) = 0)   ← 0/(2√2)
  — cos θ = 0. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/2)   ← Un angle remarquable
  aides : cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites. | cos θ = |0| / 2√2 | cos θ = 0, θ = π/2

Deux droites ont pour vecteurs directeurs u⃗ = (−2 ; −2) et v⃗ = (0 ; −1). Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).
  [guided]  u·v
    = (-2 ; -2)·(0 ; -1)   ← Les composantes
    = (−2)·□ + (−2)·□   (trous : (−2)·0 + (−2)·(−1))   ← Produit scalaire
    = □   (trous : 2)
  — u·v = 2. Les normes ?  [juge vector]  départ : ‖u‖·‖v‖
    = √(□)·√(0² + (−1)²)   (trous : √((−2)² + (−2)²)·√(0² + (−1)²))   ← Pythagore
    = □   (trous : 2√2)   ← ‖u‖ = 2√2, ‖v‖ = 1
  — L'angle de deux droites est le plus petit : on prend |cos θ|.  [juge vector]  départ : cos(θ)
    ? Angle de deux vecteurs, ou de deux droites ? ✔ De deux droites : on prend |cos θ| / · De deux vecteurs : cos θ tel quel
    = cos θ = |u·v|/(‖u‖·‖v‖)   ← |cos θ| pour deux droites
    = cos(θ) = □   (trous : cos(θ) = √2/2)   ← 2/(2√2)
  — cos θ = √2/2. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/4)   ← Un angle remarquable
  aides : cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites. | cos θ = |2| / 2√2 | cos θ = √2/2, θ = π/4

Le triangle ABC a pour sommets A(−4 ; −3 ; 2), B(−7 ; 0 ; 3) et C(−7 ; −5 ; −1). Calcule l'angle θ du triangle en A (en radians, valeur exacte ou arccos(…)). On a AB⃗ = (−3 ; 3 ; 1) et AC⃗ = (−3 ; −2 ; −3).
  [guided]  AB·AC
    = (-3 ; 3 ; 1)·(-3 ; -2 ; -3)   ← Les composantes
    = □·(−3) + 3·□ + 1·(−3)   (trous : (−3)·(−3) + 3·(−2) + 1·(−3))   ← Produit scalaire
    = □   (trous : 0)
  — AB·AC = 0. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √(□)·√((−3)² + (−2)² + (−3)²)   (trous : √((−3)² + 3² + 1²)·√((−3)² + (−2)² + (−3)²))   ← Pythagore
    = □   (trous : √418)   ← ‖AB‖ = √19, ‖AC‖ = √22
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    ? Angle de deux vecteurs, ou de deux droites ? ✔ Des vecteurs AB⃗ et AC⃗ : cos θ tel quel / · De deux droites : |cos θ|
    = cos θ = AB·AC/(‖AB‖·‖AC‖)   ← cos θ = u⃗·v⃗/(‖u⃗‖‖v⃗‖)
    = cos(θ) = □   (trous : cos(θ) = 0)   ← 0/(√418)
  — cos θ = 0. L'angle ?  [juge vector]  départ : θ
    = θ = □   (trous : θ = π/2)   ← Un angle remarquable
  aides : cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖). | cos θ = 0 / (□·□) | cos θ = 0, donc θ = π/2

```

### Niveau 3

```
Calcule la projection orthogonale p⃗ du vecteur u⃗ = (3 ; −2 ; 2) sur v⃗ = (0 ; 0 ; 3).
  [tap, suivre l'erreur, menu menu]  u·v
    = 3·0 + (−2)·0 + 2·3   ← Produit scalaire
    = 6
  — u⃗·v⃗ = 6. Et ‖v⃗‖² ?  [juge vector]  départ : ‖v‖^2
    = 0² + 0² + 3²   ← Sans racine : le carré de la norme
    = 9
  — ‖v⃗‖² = 9. La projection p⃗ de u⃗ sur v⃗ ?  [juge vector]  départ : p
    = p = (6/9)·v   ← p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗
    = (0 ; 0 ; 2)
  aides : p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗ : on divise par le carré de la norme. | p⃗ = (6/□)·(0 ; 0 ; 3) | p⃗ = (0 ; 0 ; 2)

Calcule la projection orthogonale p⃗ du vecteur u⃗ = (0 ; −2) sur v⃗ = (−2 ; −1).
  [tap, suivre l'erreur, menu menu]  u·v
    = 0·(−2) + (−2)·(−1)   ← Produit scalaire
    = 2
  — u⃗·v⃗ = 2. Et ‖v⃗‖² ?  [juge vector]  départ : ‖v‖^2
    = (−2)² + (−1)²   ← Sans racine : le carré de la norme
    = 5
  — ‖v⃗‖² = 5. La projection p⃗ de u⃗ sur v⃗ ?  [juge vector]  départ : p
    = p = (2/5)·v   ← p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗
    = (-4/5 ; -2/5)
  aides : p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗ : on divise par le carré de la norme. | p⃗ = (2/□)·(−2 ; −1) | p⃗ = (−4/5 ; −2/5)

Le triangle ABC a pour sommets A(−3 ; 4 ; 4), B(−1 ; 4 ; 2) et C(−4 ; 5 ; 6). Calcule l'angle θ du triangle en A (en radians, valeur exacte ou arccos(…)).
  [tap, suivre l'erreur, menu menu]  AB·AC
    = (2 ; 0 ; -2)·(-1 ; 1 ; 2)   ← Les composantes
    = 2·(−1) + 0·1 + (−2)·2   ← Produit scalaire
    = −6
  — AB·AC = −6. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √(2² + 0² + (−2)²)·√((−1)² + 1² + 2²)   ← Pythagore
    = 4√3   ← ‖AB‖ = 2√2, ‖AC‖ = √6
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos θ = AB·AC/(‖AB‖·‖AC‖)   ← cos θ = u⃗·v⃗/(‖u⃗‖‖v⃗‖)
    = cos(θ) = −√3/2   ← −6/(4√3)
  — cos θ = −√3/2. L'angle ?  [juge vector]  départ : θ
    = θ = 5π/6   ← Un angle remarquable
  aides : cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖). | cos θ = −6 / (□·□) | cos θ = −√3/2, donc θ = 5π/6

```

### Niveau 4

```
Le triangle ABC a pour sommets A(1 ; 2 ; 1), B(−2 ; 1 ; 1) et C(2 ; −1 ; 4). Calcule l'angle θ du triangle en A (en radians, valeur exacte ou arccos(…)).
  [free, suivre l'erreur]  AB·AC
    = (−3)·1 + (−1)·(−3) + 0·3   ← Produit scalaire
    = 0
  — AB·AC = 0. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √((−3)² + (−1)² + 0²)·√(1² + (−3)² + 3²)   ← Pythagore
    = √190   ← ‖AB‖ = √10, ‖AC‖ = √19
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos(θ) = 0   ← 0/(√190)
  — cos θ = 0. L'angle ?  [juge vector]  départ : θ
    = θ = π/2   ← Un angle remarquable
  aides : cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖). | cos θ = 0 / (□·□) | cos θ = 0, donc θ = π/2

Deux droites ont pour vecteurs directeurs u⃗ = (3 ; 0) et v⃗ = (−3 ; 3). Calcule l'angle θ entre ces droites (en radians, valeur exacte ou arccos(…)).
  [free, suivre l'erreur]  u·v
    = 3·(−3) + 0·3   ← Produit scalaire
    = −9
  — u·v = −9. Les normes ?  [juge vector]  départ : ‖u‖·‖v‖
    = √(3² + 0²)·√((−3)² + 3²)   ← Pythagore
    = 9√2   ← ‖u‖ = 3, ‖v‖ = 3√2
  — L'angle de deux droites est le plus petit : on prend |cos θ|.  [juge vector]  départ : cos(θ)
    = cos(θ) = √2/2   ← 9/(9√2)
  — cos θ = √2/2. L'angle ?  [juge vector]  départ : θ
    = θ = π/4   ← Un angle remarquable
  aides : cos θ = |u⃗·v⃗| / (‖u⃗‖‖v⃗‖) pour deux droites. | cos θ = |−9| / 9√2 | cos θ = √2/2, θ = π/4

Calcule la projection orthogonale p⃗ du vecteur u⃗ = (−1 ; −2) sur v⃗ = (1 ; −1).
  [free, suivre l'erreur]  u·v
    = (−1)·1 + (−2)·(−1)   ← Produit scalaire
    = 1
  — u⃗·v⃗ = 1. Et ‖v⃗‖² ?  [juge vector]  départ : ‖v‖^2
    = 1² + (−1)²   ← Sans racine : le carré de la norme
    = 2
  — ‖v⃗‖² = 2. La projection p⃗ de u⃗ sur v⃗ ?  [juge vector]  départ : p
    = p = (1/2)·v   ← p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗
    = (1/2 ; -1/2)
  aides : p⃗ = (u⃗·v⃗ / ‖v⃗‖²)·v⃗ : on divise par le carré de la norme. | p⃗ = (1/□)·(1 ; −1) | p⃗ = (1/2 ; −1/2)

```

### Niveau 5

```
Le triangle ABC a pour sommets A(0 ; 0 ; −4), B(2 ; 2 ; −3) et C(1 ; 0 ; −3). Calcule l'angle du triangle en A, puis le pied H de la hauteur issue de C (projection orthogonale de C sur la droite (AB)).
  [free, sans aide]  AB·AC
    = 2·1 + 2·0 + 1·1   ← Produit scalaire
    = 3
  — AB·AC = 3. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √(2² + 2² + 1²)·√(1² + 0² + 1²)   ← Pythagore
    = 3√2   ← ‖AB‖ = 3, ‖AC‖ = √2
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos(θ) = √2/2   ← 3/(3√2)
  — cos θ = √2/2. L'angle ?  [juge vector]  départ : θ
    = θ = π/4   ← Un angle remarquable
  — Le pied H de la hauteur issue de C : H = A + (AC⃗·AB⃗ / ‖AB⃗‖²)·AB⃗. Que vaut H ?  [juge vector]  départ : H
    = H = A + (3/9)·AB   ← Projection de AC⃗ sur AB⃗
    = H = (2/3 ; 2/3 ; -11/3)

Le triangle ABC a pour sommets A(1 ; 1 ; 4), B(0 ; 3 ; 6) et C(4 ; 1 ; 1). Calcule l'angle du triangle en A, puis le pied H de la hauteur issue de C (projection orthogonale de C sur la droite (AB)).
  [free, sans aide]  AB·AC
    = (−1)·3 + 2·0 + 2·(−3)   ← Produit scalaire
    = −9
  — AB·AC = −9. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √((−1)² + 2² + 2²)·√(3² + 0² + (−3)²)   ← Pythagore
    = 9√2   ← ‖AB‖ = 3, ‖AC‖ = 3√2
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos(θ) = −√2/2   ← −9/(9√2)
  — cos θ = −√2/2. L'angle ?  [juge vector]  départ : θ
    = θ = 3π/4   ← Un angle remarquable
  — Le pied H de la hauteur issue de C : H = A + (AC⃗·AB⃗ / ‖AB⃗‖²)·AB⃗. Que vaut H ?  [juge vector]  départ : H
    = H = A + (−9/9)·AB   ← Projection de AC⃗ sur AB⃗
    = H = (2 ; -1 ; 2)

Le triangle ABC a pour sommets A(−1 ; −2 ; 3), B(−1 ; 0 ; 3) et C(−1 ; −3 ; 2). Calcule l'angle du triangle en A, puis le pied H de la hauteur issue de C (projection orthogonale de C sur la droite (AB)).
  [free, sans aide]  AB·AC
    = 0·0 + 2·(−1) + 0·(−1)   ← Produit scalaire
    = −2
  — AB·AC = −2. Les normes ?  [juge vector]  départ : ‖AB‖·‖AC‖
    = √(0² + 2² + 0²)·√(0² + (−1)² + (−1)²)   ← Pythagore
    = 2√2   ← ‖AB‖ = 2, ‖AC‖ = √2
  — Alors cos θ ?  [juge vector]  départ : cos(θ)
    = cos(θ) = −√2/2   ← −2/(2√2)
  — cos θ = −√2/2. L'angle ?  [juge vector]  départ : θ
    = θ = 3π/4   ← Un angle remarquable
  — Le pied H de la hauteur issue de C : H = A + (AC⃗·AB⃗ / ‖AB⃗‖²)·AB⃗. Que vaut H ?  [juge vector]  départ : H
    = H = A + (−2/4)·AB   ← Projection de AC⃗ sur AB⃗
    = H = (-1 ; -3 ; 3)

```

### Variantes d'examen

```
Quelle est la projection orthogonale de u⃗ = (−2 ; −2) sur v⃗ = (2 ; 1) ?
  · (−12√5/5 ; −6√5/5) [g4_proj_no_square]   ✔ (−12/5 ; −6/5)   · (−12 ; −6) [g4_proj_no_square]   · (3/2 ; 3/2)
  [examen mcq]
  pièges : g4_proj_no_square

Vrai ou faux ?
  « Si u⃗·v⃗ = 0, alors u⃗ = 0⃗ ou v⃗ = 0⃗. » → FAUX
    contre-exemple (geo) : u = (4 ; 4), v = (-4 ; 4)
  [examen tf]

p⃗ est la projection orthogonale de u⃗ = (−2 ; 0) sur v⃗ = (−3 ; −3). Que vaut sa composante n° 2 ?
  [free, sans aide, examen coef]  p_2
    = −1
  pièges : g4_proj_no_square

```

## Médiatrice et bissectrices (`g4-bisectors`, Gymnase)

_Distance d'un point à une droite, points à égale distance._

### Niveau 1

```
Donne les équations des deux bissectrices des droites d₁ : 4x-3y+16 = 0 et d₂ : 15x-8y+47 = 0, à coefficients entiers.
  [guided]  b
    (Les normes valent ‖n⃗₁‖ = 5 et ‖n⃗₂‖ = 17.)
    (Comment écrire l'égalité des distances ? Diviser chaque valeur absolue par la norme de sa normale.)
    = |4x − 3y + 16|/□ = |15x − 8y + 47|/□   (trous : |4x − 3y + 16|/5 = |15x − 8y + 47|/17)   ← Égalité des distances
    = 17(4x − 3y + 16) − 5(15x − 8y + 47) = 0 ou 17(4x − 3y + 16) + 5(15x − 8y + 47) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = 7x + 11y − □ = 0 ou 11x − 7y + 39 = 0   (trous : 7x + 11y − 37 = 0 ou 11x − 7y + 39 = 0)   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 4x − 3y + 16 = ±(□) (après avoir multiplié par les normes) | 7x+11y-37 = 0 ou 11x-7y+39 = 0
  pièges : g4_bisector_unnormalized, g4_bisector_one_sign

Donne les équations des deux bissectrices des droites d₁ : 8x-15y+45 = 0 et d₂ : 4x-3y+9 = 0, à coefficients entiers.
  [guided]  b
    (Les normes valent ‖n⃗₁‖ = 17 et ‖n⃗₂‖ = 5.)
    (Comment écrire l'égalité des distances ? Diviser chaque valeur absolue par la norme de sa normale.)
    = |8x − 15y + 45|/□ = |4x − 3y + 9|/□   (trous : |8x − 15y + 45|/17 = |4x − 3y + 9|/5)   ← Égalité des distances
    = 5(8x − 15y + 45) − 17(4x − 3y + 9) = 0 ou 5(8x − 15y + 45) + 17(4x − 3y + 9) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = 7x + 6y − □ = 0 ou 6x − 7y + 21 = 0   (trous : 7x + 6y − 18 = 0 ou 6x − 7y + 21 = 0)   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 8x − 15y + 45 = ±(□) (après avoir multiplié par les normes) | 7x+6y-18 = 0 ou 6x-7y+21 = 0
  pièges : g4_bisector_unnormalized, g4_bisector_one_sign

Donne les équations des deux bissectrices des droites d₁ : 4x-3y+1 = 0 et d₂ : 3x+4y+7 = 0, à coefficients entiers.
  [guided]  b
    (Les normes valent ‖n⃗₁‖ = 5 et ‖n⃗₂‖ = 5.)
    (Comment écrire l'égalité des distances ? Diviser chaque valeur absolue par la norme de sa normale.)
    = |4x − 3y + 1|/□ = |3x + 4y + 7|/□   (trous : |4x − 3y + 1|/5 = |3x + 4y + 7|/5)   ← Égalité des distances
    = 4x − 3y + 1 − (3x + 4y + 7) = 0 ou 4x − 3y + 1 + (3x + 4y + 7) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = x − 7y − □ = 0 ou 7x + y + 8 = 0   (trous : x − 7y − 6 = 0 ou 7x + y + 8 = 0)   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 4x − 3y + 1 = ±(□) (après avoir multiplié par les normes) | x-7y-6 = 0 ou 7x+y+8 = 0
  pièges : g4_bisector_one_sign

```

### Niveau 2

```
Donne les équations des deux bissectrices des droites d₁ : 3x+4y+17 = 0 et d₂ : 3x-4y+1 = 0, à coefficients entiers.
  [guided]  ‖(3 ; 4)‖
    (La norme de n⃗₁ = (3 ; 4) ?)
    = √(3² + 4²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (3 ; −4) ?  [juge vector]  départ : ‖(3 ; -4)‖
    = √(3² + (−4)²)   ← Pythagore
    = 5
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 5. Les bissectrices ?  [juge geom]  départ : b
    ? Comment écrire l'égalité des distances ? ✔ Diviser chaque valeur absolue par la norme de sa normale / ✔ Égaler directement les deux valeurs absolues
    = |3x + 4y + 17|/5 = |3x − 4y + 1|/5   ← Égalité des distances
    = 3x + 4y + 17 − (3x − 4y + 1) = 0 ou 3x + 4y + 17 + (3x − 4y + 1) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = y + 2 = 0 ou x + 3 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 3x + 4y + 17 = ±(□) (après avoir multiplié par les normes) | y+2 = 0 ou x+3 = 0

Donne les équations des deux bissectrices des droites d₁ : y+1 = 0 et d₂ : 3x-4y-7 = 0, à coefficients entiers.
  [guided]  ‖(0 ; 1)‖
    (La norme de n⃗₁ = (0 ; 1) ?)
    = √(0² + 1²)   ← Pythagore
    = 1
  — La norme de n⃗₂ = (3 ; −4) ?  [juge vector]  départ : ‖(3 ; -4)‖
    = √(3² + (−4)²)   ← Pythagore
    = 5
  — ‖n⃗₁‖ = 1, ‖n⃗₂‖ = 5. Les bissectrices ?  [juge geom]  départ : b
    ? Comment écrire l'égalité des distances ? ✔ Diviser chaque valeur absolue par la norme de sa normale / · Égaler directement les deux valeurs absolues
    = |y + 1|/1 = |3x − 4y − 7|/5   ← Égalité des distances
    = 5(y + 1) − (3x − 4y − 7) = 0 ou 5(y + 1) + (3x − 4y − 7) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = x − 3y − 4 = 0 ou 3x + y − 2 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | y + 1 = ±(□) (après avoir multiplié par les normes) | x-3y-4 = 0 ou 3x+y-2 = 0
  pièges : g4_bisector_unnormalized

Donne les équations des deux bissectrices des droites d₁ : 4x+3y+4 = 0 et d₂ : 4x-3y-20 = 0, à coefficients entiers.
  [guided]  ‖(4 ; 3)‖
    (La norme de n⃗₁ = (4 ; 3) ?)
    = √(4² + 3²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (4 ; −3) ?  [juge vector]  départ : ‖(4 ; -3)‖
    = √(4² + (−3)²)   ← Pythagore
    = 5
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 5. Les bissectrices ?  [juge geom]  départ : b
    ? Comment écrire l'égalité des distances ? ✔ Diviser chaque valeur absolue par la norme de sa normale / ✔ Égaler directement les deux valeurs absolues
    = |4x + 3y + 4|/5 = |4x − 3y − 20|/5   ← Égalité des distances
    = 4x + 3y + 4 − (4x − 3y − 20) = 0 ou 4x + 3y + 4 + (4x − 3y − 20) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = y + 4 = 0 ou x − 2 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 4x + 3y + 4 = ±(□) (après avoir multiplié par les normes) | y+4 = 0 ou x-2 = 0

```

### Niveau 3

```
Donne les équations des deux bissectrices des droites d₁ : 3x+4y+16 = 0 et d₂ : 15x-8y-32 = 0, à coefficients entiers.
  [tap, suivre l'erreur, menu menu]  ‖(3 ; 4)‖
    (La norme de n⃗₁ = (3 ; 4) ?)
    = √(3² + 4²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (15 ; −8) ?  [juge vector]  départ : ‖(15 ; -8)‖
    = √(15² + (−8)²)   ← Pythagore
    = 17
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 17. Les bissectrices ?  [juge geom]  départ : b
    = |3x + 4y + 16|/5 = |15x − 8y − 32|/17   ← Égalité des distances
    = 17(3x + 4y + 16) − 5(15x − 8y − 32) = 0 ou 17(3x + 4y + 16) + 5(15x − 8y − 32) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = 2x − 9y − 36 = 0 ou 9x + 2y + 8 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 3x + 4y + 16 = ±(□) (après avoir multiplié par les normes) | 2x-9y-36 = 0 ou 9x+2y+8 = 0

Donne une équation cartésienne (coefficients entiers) de la médiatrice de [AB], avec A(1 ; 3) et B(3 ; 1).
  [tap, suivre l'erreur, menu menu]  m
    (Le milieu de [AB] est I(2 ; 2), et AB⃗ = (2 ; −2) est normal à la médiatrice.)
    = 2(x − 2) + (−2)(y − 2) = 0   ← AB⃗·(X − I) = 0
    = x − y = 0   ← Développer et simplifier
  aides : Un point M de la médiatrice vérifie MA = MB, ou AB⃗·(M − I) = 0 avec I le milieu de [AB]. | 2(x − □) − 2(y − □) = 0 | x-y = 0

Donne les équations des deux bissectrices des droites d₁ : 3x+4y+5 = 0 et d₂ : 3x-4y-11 = 0, à coefficients entiers.
  [tap, suivre l'erreur, menu menu]  ‖(3 ; 4)‖
    (La norme de n⃗₁ = (3 ; 4) ?)
    = √(3² + 4²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (3 ; −4) ?  [juge vector]  départ : ‖(3 ; -4)‖
    = √(3² + (−4)²)   ← Pythagore
    = 5
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 5. Les bissectrices ?  [juge geom]  départ : b
    = |3x + 4y + 5|/5 = |3x − 4y − 11|/5   ← Égalité des distances
    = 3x + 4y + 5 − (3x − 4y − 11) = 0 ou 3x + 4y + 5 + (3x − 4y − 11) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = y + 2 = 0 ou x − 1 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 3x + 4y + 5 = ±(□) (après avoir multiplié par les normes) | y+2 = 0 ou x-1 = 0

```

### Niveau 4

```
Donne les équations des deux bissectrices des droites d₁ : 3x-4y+20 = 0 et d₂ : 12x-5y+58 = 0, à coefficients entiers.
  [free, suivre l'erreur]  ‖(3 ; -4)‖
    (La norme de n⃗₁ = (3 ; −4) ?)
    = √(3² + (−4)²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (12 ; −5) ?  [juge vector]  départ : ‖(12 ; -5)‖
    = √(12² + (−5)²)   ← Pythagore
    = 13
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 13. Les bissectrices ?  [juge geom]  départ : b
    = |3x − 4y + 20|/5 = |12x − 5y + 58|/13   ← Égalité des distances
    = 13(3x − 4y + 20) − 5(12x − 5y + 58) = 0 ou 13(3x − 4y + 20) + 5(12x − 5y + 58) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = 7x + 9y + 10 = 0 ou 9x − 7y + 50 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 3x − 4y + 20 = ±(□) (après avoir multiplié par les normes) | 7x+9y+10 = 0 ou 9x-7y+50 = 0

Donne les équations des deux bissectrices des droites d₁ : 3x-4y-10 = 0 et d₂ : 4x-3y-4 = 0, à coefficients entiers.
  [free, suivre l'erreur]  ‖(3 ; -4)‖
    (La norme de n⃗₁ = (3 ; −4) ?)
    = √(3² + (−4)²)   ← Pythagore
    = 5
  — La norme de n⃗₂ = (4 ; −3) ?  [juge vector]  départ : ‖(4 ; -3)‖
    = √(4² + (−3)²)   ← Pythagore
    = 5
  — ‖n⃗₁‖ = 5, ‖n⃗₂‖ = 5. Les bissectrices ?  [juge geom]  départ : b
    = |3x − 4y − 10|/5 = |4x − 3y − 4|/5   ← Égalité des distances
    = 3x − 4y − 10 − (4x − 3y − 4) = 0 ou 3x − 4y − 10 + (4x − 3y − 4) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = x + y + 6 = 0 ou x − y − 2 = 0   ← Les deux bissectrices
  aides : Un point de la bissectrice est à la même distance des deux droites : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖. | 3x − 4y − 10 = ±(□) (après avoir multiplié par les normes) | x+y+6 = 0 ou x-y-2 = 0

Donne une équation cartésienne (coefficients entiers) de la médiatrice de [AB], avec A(5 ; −1) et B(−1 ; 5).
  [free, suivre l'erreur]  m
    (Le milieu de [AB] est I(2 ; 2), et AB⃗ = (−6 ; 6) est normal à la médiatrice.)
    = (−6)(x − 2) + 6(y − 2) = 0   ← AB⃗·(X − I) = 0
    = x − y = 0   ← Développer et simplifier
  aides : Un point M de la médiatrice vérifie MA = MB, ou AB⃗·(M − I) = 0 avec I le milieu de [AB]. | −6(x − □) + 6(y − □) = 0 | x-y = 0

```

### Niveau 5

```
Le triangle ABC a pour sommets A(3 ; 3), B(0 ; 7) et C(3 ; 2). Donne une équation de la bissectrice intérieure de l'angle en A.
  [free, sans aide]  (AB)
    = 4x + 3y − 21 = 0   ← Normale (4 ; 3), par A
  — La droite (AC) ?  [juge geom]  départ : (AC)
    = x − 3 = 0   ← Normale (1 ; 0), par A
  — Les deux bissectrices de (AB) et (AC) ?  [juge geom]  départ : b
    = |4x + 3y − 21|/5 = |x − 3|/1   ← Égalité des distances
    = (4x + 3y − 21) − 5(x − 3) = 0 ou (4x + 3y − 21) + 5(x − 3) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = x − 3y + 6 = 0 ou 3x + y − 12 = 0   ← Les deux bissectrices
  — Laquelle est intérieure ?  [juge geom]  départ : b_A
    ? La bissectrice intérieure sépare B et C. Laquelle est-ce ? ✔ x − 3y + 6 = 0 / · 3x + y − 12 = 0
    = x − 3y + 6 = 0   ← Signes opposés en B et en C
  pièges : g4_line_constant

Le triangle ABC a pour sommets A(0 ; 1), B(−2 ; 1) et C(−5 ; −11). Donne une équation de la bissectrice intérieure de l'angle en A.
  [free, sans aide]  (AB)
    = y − 1 = 0   ← Normale (0 ; 1), par A
  — La droite (AC) ?  [juge geom]  départ : (AC)
    = 12x − 5y + 5 = 0   ← Normale (12 ; −5), par A
  — Les deux bissectrices de (AB) et (AC) ?  [juge geom]  départ : b
    = |y − 1|/1 = |12x − 5y + 5|/13   ← Égalité des distances
    = 13(y − 1) − (12x − 5y + 5) = 0 ou 13(y − 1) + (12x − 5y + 5) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = 2x − 3y + 3 = 0 ou 3x + 2y − 2 = 0   ← Les deux bissectrices
  — Laquelle est intérieure ?  [juge geom]  départ : b_A
    ? La bissectrice intérieure sépare B et C. Laquelle est-ce ? ✔ 2x − 3y + 3 = 0 / · 3x + 2y − 2 = 0
    = 2x − 3y + 3 = 0   ← Signes opposés en B et en C
  pièges : g4_line_constant

Le triangle ABC a pour sommets A(−3 ; −3), B(−6 ; 1) et C(0 ; 1). Donne une équation de la bissectrice intérieure de l'angle en A.
  [free, sans aide]  (AB)
    = 4x + 3y + 21 = 0   ← Normale (4 ; 3), par A
  — La droite (AC) ?  [juge geom]  départ : (AC)
    = 4x − 3y + 3 = 0   ← Normale (4 ; −3), par A
  — Les deux bissectrices de (AB) et (AC) ?  [juge geom]  départ : b
    = |4x + 3y + 21|/5 = |4x − 3y + 3|/5   ← Égalité des distances
    = 4x + 3y + 21 − (4x − 3y + 3) = 0 ou 4x + 3y + 21 + (4x − 3y + 3) = 0   ← |A| = |B| ⇔ A = B ou A = −B
    = y + 3 = 0 ou x + 3 = 0   ← Les deux bissectrices
  — Laquelle est intérieure ?  [juge geom]  départ : b_A
    ? La bissectrice intérieure sépare B et C. Laquelle est-ce ? ✔ x + 3 = 0 / · y + 3 = 0
    = x + 3 = 0   ← Signes opposés en B et en C
  pièges : g4_line_constant

```

### Variantes d'examen

```
Quelles sont les bissectrices des droites d₁ : 12x-5y-5 = 0 et d₂ : 3x+4y+4 = 0 ?
  · 3x-11y-11 = 0 [g4_bisector_one_sign]   · 3x-11y-11 = 0 ou 11x+3y+4 = 0   · x-y-1 = 0 ou 15x-y-1 = 0 [g4_bisector_unnormalized]   ✔ 3x-11y-11 = 0 ou 11x+3y+3 = 0
  [examen mcq]
  pièges : g4_bisector_unnormalized, g4_bisector_one_sign

Vrai ou faux ?
  « Les deux bissectrices de deux droites sécantes sont perpendiculaires. » → VRAI
  [examen tf]

Le triangle ABC a pour sommets A(−3 ; 0), B(−3 ; −1) et C(−9 ; −8). Donne une équation de la bissectrice intérieure de l'angle en A.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; La droite (AC) ? : 0,5 ; Les deux bissectrices de (AB) et (AC) ? : 1,5 ; Laquelle est intérieure ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  (AB)
      = x + 3 = 0   ← Normale (1 ; 0), par A
    — La droite (AC) ?  [juge geom]  départ : (AC)
      = 4x − 3y + 12 = 0   ← Normale (4 ; −3), par A
    — Les deux bissectrices de (AB) et (AC) ?  [juge geom]  départ : b
      = |x + 3|/1 = |4x − 3y + 12|/5   ← Égalité des distances
      = 5(x + 3) − (4x − 3y + 12) = 0 ou 5(x + 3) + (4x − 3y + 12) = 0   ← |A| = |B| ⇔ A = B ou A = −B
      = x + 3y + 3 = 0 ou 3x − y + 9 = 0   ← Les deux bissectrices
    — Laquelle est intérieure ?  [juge geom]  départ : b_A
      ? La bissectrice intérieure sépare B et C. Laquelle est-ce ? ✔ 3x − y + 9 = 0 / · x + 3y + 3 = 0
      = 3x − y + 9 = 0   ← Signes opposés en B et en C
  pièges : g4_line_constant

```

## Droite de l'espace : paramétrique et cartésienne (`g4-line3`, Gymnase)

_A + t·v⃗, ou deux équations ; on élimine t._

### Niveau 1

```
Donne deux équations cartésiennes de la droite d passant par A(4 ; −5 ; −2), de direction v⃗ = (1 ; 1 ; 2).
  [guided]  d
    = (x;y;z)=(□;-5;-2)+t(1;1;2)   (trous : (x ; y ; z) = (4 ; -5 ; -2) + t(1 ; 1 ; 2))   ← Paramétrique
    = (x-4)/□=(y+5)/1=(z+2)/2   (trous : (x-4)/1 = (y+5)/1 = (z+2)/2)   ← Isoler t dans chaque coordonnée
    = x − y − 9 = 0 ; 2y − z + 8 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x − 4)/1 = (y + 5)/1, donc … | x-y-9 = 0 ; 2y-z+8 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(4 ; −3 ; 1), de direction v⃗ = (−3 ; 1 ; 3).
  [guided]  d
    = (x;y;z)=(□;-3;1)+t(-3;1;3)   (trous : (x ; y ; z) = (4 ; -3 ; 1) + t(-3 ; 1 ; 3))   ← Paramétrique
    = (x-4)/□=(y+3)/1=(z-1)/3   (trous : (x-4)/(-3) = (y+3)/1 = (z-1)/3)   ← Isoler t dans chaque coordonnée
    = x + 3y + 5 = 0 ; 3y − z + 10 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x − 4)/(−3) = (y + 3)/1, donc … | x+3y+5 = 0 ; 3y-z+10 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(−3 ; −1 ; −2), de direction v⃗ = (3 ; 1 ; 3).
  [guided]  d
    = (x;y;z)=(□;-1;-2)+t(3;1;3)   (trous : (x ; y ; z) = (-3 ; -1 ; -2) + t(3 ; 1 ; 3))   ← Paramétrique
    = (x+□)/3=(y+1)/1=(z+2)/3   (trous : (x+3)/3 = (y+1)/1 = (z+2)/3)   ← Isoler t dans chaque coordonnée
    = x − 3y = 0 ; 3y − z + 1 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x + 3)/3 = (y + 1)/1, donc … | x-3y = 0 ; 3y-z+1 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

```

### Niveau 2

```
Donne deux équations cartésiennes de la droite d passant par A(−2 ; −5 ; −4), de direction v⃗ = (−3 ; 1 ; 1).
  [guided]  d
    = (x;y;z)=□+t(-3;1;1)   (trous : (x ; y ; z) = (-2 ; -5 ; -4) + t(-3 ; 1 ; 1))   ← Paramétrique
    = (x+2)/□=(y+5)/□=(z+4)/□   (trous : (x+2)/(-3) = (y+5)/1 = (z+4)/1)   ← Isoler t dans chaque coordonnée
    = x + 3y + 17 = 0 ; y − z + 1 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x + 2)/(−3) = (y + 5)/1, donc … | x+3y+17 = 0 ; y-z+1 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(1 ; −2 ; 2), de direction v⃗ = (−1 ; −3 ; −2).
  [guided]  d
    = (x;y;z)=□+t(-1;-3;-2)   (trous : (x ; y ; z) = (1 ; -2 ; 2) + t(-1 ; -3 ; -2))   ← Paramétrique
    = (x-1)/□=(y+2)/□=(z-2)/□   (trous : (x-1)/(-1) = (y+2)/(-3) = (z-2)/(-2))   ← Isoler t dans chaque coordonnée
    = 3x − y − 5 = 0 ; 2y − 3z + 10 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x − 1)/(−1) = (y + 2)/(−3), donc … | 3x-y-5 = 0 ; 2y-3z+10 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(−4 ; −2 ; 0), de direction v⃗ = (3 ; 3 ; 2).
  [guided]  d
    = (x;y;z)=□+t(3;3;2)   (trous : (x ; y ; z) = (-4 ; -2 ; 0) + t(3 ; 3 ; 2))   ← Paramétrique
    = (x+4)/□=(y+2)/□=(z)/□   (trous : (x+4)/3 = (y+2)/3 = (z)/2)   ← Isoler t dans chaque coordonnée
    = x − y + 2 = 0 ; 2y − 3z + 4 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x + 4)/3 = (y + 2)/3, donc … | x-y+2 = 0 ; 2y-3z+4 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

```

### Niveau 3

```
Donne deux équations cartésiennes de la droite d passant par A(−4 ; 3 ; 3), de direction v⃗ = (3 ; 3 ; 1).
  [tap, suivre l'erreur, menu menu]  d
    = (x ; y ; z) = (-4 ; 3 ; 3) + t(3 ; 3 ; 1)   ← Paramétrique
    = (x+4)/3 = (y-3)/3 = (z-3)/1   ← Isoler t dans chaque coordonnée
    = x − y + 7 = 0 ; y − 3z + 6 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x + 4)/3 = (y − 3)/3, donc … | x-y+7 = 0 ; y-3z+6 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(5 ; 4 ; 5), de direction v⃗ = (0 ; 1 ; 3).
  [tap, suivre l'erreur, menu menu]  d
    = (x ; y ; z) = (5 ; 4 ; 5) + t(0 ; 1 ; 3)   ← Paramétrique
    = x − 5 = 0 ; 3y − z − 7 = 0   ← Une composante de v⃗ est nulle : cette coordonnée est constante
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | La coordonnée dont la composante est nulle est constante. | x-5 = 0 ; 3y-z-7 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(5 ; 0 ; −5), de direction v⃗ = (−2 ; 2 ; −1).
  [tap, suivre l'erreur, menu menu]  d
    = (x ; y ; z) = (5 ; 0 ; -5) + t(-2 ; 2 ; -1)   ← Paramétrique
    = (x-5)/(-2) = (y)/2 = (z+5)/(-1)   ← Isoler t dans chaque coordonnée
    = x + y − 5 = 0 ; y + 2z + 10 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x − 5)/(−2) = (y)/2, donc … | x+y-5 = 0 ; y+2z+10 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

```

### Niveau 4

```
La droite d est l'intersection des plans 3x-z-9 = 0 et y-z-5 = 0. Donne une représentation paramétrique de d.
  [free, suivre l'erreur]  d
    = (x ; y ; z) = (2 ; 2 ; -3) + t(-1 ; -3 ; -3)   ← Un point A(2 ; 2 ; −3) (une inconnue fixée) ; une direction orthogonale aux deux normales : (−1 ; −3 ; −3)
  aides : Fixe une inconnue (z = t, ou une valeur), résous les deux autres : un point et une direction. | (x ; y ; z) = (2 ; 2 ; −3) + t(□ ; □ ; □) | (x ; y ; z) = (2 ; 2 ; -3) + t(-1 ; -3 ; -3)
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(−2 ; −1 ; −4) et B(−4 ; 2 ; −2).
  [free, suivre l'erreur]  d
    (Une direction : AB⃗ = (−2 ; 3 ; 2).)
    = (x ; y ; z) = (-2 ; -1 ; -4) + t(-2 ; 3 ; 2)   ← Paramétrique
    = (x+2)/(-2) = (y+1)/3 = (z+4)/2   ← Isoler t dans chaque coordonnée
    = 3x + 2y + 8 = 0 ; 2y − 3z − 10 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x + 2)/(−2) = (y + 1)/3, donc … | 3x+2y+8 = 0 ; 2y-3z-10 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

Donne deux équations cartésiennes de la droite d passant par A(3 ; 2 ; 0) et B(6 ; 5 ; −1).
  [free, suivre l'erreur]  d
    (Une direction : AB⃗ = (3 ; 3 ; −1).)
    = (x ; y ; z) = (3 ; 2 ; 0) + t(3 ; 3 ; -1)   ← Paramétrique
    = (x-3)/3 = (y-2)/3 = (z)/(-1)   ← Isoler t dans chaque coordonnée
    = x − y − 1 = 0 ; y + 3z − 2 = 0   ← Deux égalités, deux équations
  aides : Isole t dans chaque coordonnée, puis égale deux à deux : deux équations. | (x − 3)/3 = (y − 2)/3, donc … | x-y-1 = 0 ; y+3z-2 = 0
  pièges : g4_normal_as_direction, g4_line3_one_equation

```

### Niveau 5

```
La droite g est l'intersection des plans x+3y+3z-21 = 0 et 2y+3z-17 = 0. Donne une représentation paramétrique de la droite d parallèle à g passant par M(0 ; 4 ; 3).
  [free, sans aide]  v
    = (-3 ; 3 ; -2)   ← v⃗ orthogonal aux normales (1 ; 3 ; 3) et (0 ; 2 ; 3) : un système à deux équations
  — La droite d ?  [juge geom]  départ : d
    = (x ; y ; z) = (0 ; 4 ; 3) + t(-3 ; 3 ; -2)   ← Par M, de direction v⃗

La droite g est l'intersection des plans x+2z-5 = 0 et y+2z = 0. Donne une représentation paramétrique de la droite d parallèle à g passant par M(4 ; −4 ; 3).
  [free, sans aide]  v
    = (2 ; 2 ; -1)   ← v⃗ orthogonal aux normales (1 ; 0 ; 2) et (0 ; 1 ; 2) : un système à deux équations
  — La droite d ?  [juge geom]  départ : d
    = (x ; y ; z) = (4 ; -4 ; 3) + t(2 ; 2 ; -1)   ← Par M, de direction v⃗

La droite g est l'intersection des plans x-y-z-5 = 0 et 2y-z+6 = 0. Donne une représentation paramétrique de la droite d parallèle à g passant par M(−4 ; 3 ; 5).
  [free, sans aide]  v
    = (3 ; 1 ; 2)   ← v⃗ orthogonal aux normales (1 ; −1 ; −1) et (0 ; 2 ; −1) : un système à deux équations
  — La droite d ?  [juge geom]  départ : d
    = (x ; y ; z) = (-4 ; 3 ; 5) + t(3 ; 1 ; 2)   ← Par M, de direction v⃗

```

### Variantes d'examen

```
Quelle description est celle de la droite passant par A(1 ; 1 ; 1), de direction v⃗ = (3 ; −1 ; −2) ?
  · x+3y-4 = 0 [g4_line3_one_equation]   · (x ; y ; z) = (1 ; 1 ; 1) + t(1 ; 3 ; 0) [g4_normal_as_direction]   · x+3y-4 = 0 ; 2y-z = 0   ✔ x+3y-4 = 0 ; 2y-z-1 = 0
  [examen mcq]
  pièges : g4_line3_one_equation, g4_normal_as_direction

Vrai ou faux ?
  « La droite d de représentation (x ; y ; z) = (1 ; -3 ; 1) + t(-1 ; -1 ; 3) est décrite par la seule équation x-y-4 = 0. » → FAUX
    contre-exemple (geo) : P = (-2 ; -6 ; -1)
  [examen tf]
  pièges : g4_line3_one_equation

La droite g est l'intersection des plans x+3y-z+6 = 0 et 2y-z+6 = 0. Donne une représentation paramétrique de la droite d parallèle à g passant par M(−5 ; 4 ; −3).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 2 ; La droite d ? : 2)
    [free, sans aide, suivre l'erreur, examen open]  v
      = (1 ; -1 ; -2)   ← v⃗ orthogonal aux normales (1 ; 3 ; −1) et (0 ; 2 ; −1) : un système à deux équations
    — La droite d ?  [juge geom]  départ : d
      = (x ; y ; z) = (-5 ; 4 ; -3) + t(1 ; -1 ; -2)   ← Par M, de direction v⃗

```

## Plan : par trois points, paramétrique ↔ cartésienne (`g4-plane`, Gymnase)

_Une normale orthogonale aux deux directions, puis la constante._

### Niveau 1

```
Donne une équation cartésienne du plan passant par A(0 ; −3 ; 1), B(1 ; −4 ; 0) et C(−3 ; −5 ; 1).
  [guided]  n
    (AB⃗ = (1 ; −1 ; −1), AC⃗ = (−3 ; −2 ; 0). La normale n⃗ = (a ; b ; c) vérifie a − b − c = 0 et −3a − 2b = 0.)
    (Comment trouver la normale ? Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0.)
    = n=(2;-3;□)   (trous : n = (2 ; -3 ; 5))   ← Une solution non nulle du système
  — n⃗ = (2 ; −3 ; 5). La constante d ?  [juge solset]  départ : 2·0 + (−3)·(−3) + 5·1 + d = 0
    = d = □   (trous : d = −14)   ← A est dans le plan
  — d = −14. L'équation du plan ?  [juge geom]  départ : π
    = □x − 3y + 5z − 14 = 0   (trous : 2x − 3y + 5z − 14 = 0)   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 5) | n⃗ = (2 ; −3 ; 5), puis 2x-3y+5z-14 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(0 ; 2 ; 2), B(0 ; 3 ; −1) et C(3 ; 3 ; 2).
  [guided]  n
    (AB⃗ = (0 ; 1 ; −3), AC⃗ = (3 ; 1 ; 0). La normale n⃗ = (a ; b ; c) vérifie b − 3c = 0 et 3a + b = 0.)
    (Comment trouver la normale ? Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0.)
    = n=(1;-3;□)   (trous : n = (1 ; -3 ; -1))   ← Une solution non nulle du système
  — n⃗ = (1 ; −3 ; −1). La constante d ?  [juge solset]  départ : 1·0 + (−3)·2 + (−1)·2 + d = 0
    = d = □   (trous : d = 8)   ← A est dans le plan
  — d = 8. L'équation du plan ?  [juge geom]  départ : π
    = x − 3y − z + 8 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; −1) | n⃗ = (1 ; −3 ; −1), puis x-3y-z+8 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(4 ; 3 ; −3), B(1 ; 2 ; −3) et C(6 ; 3 ; −2).
  [guided]  n
    (AB⃗ = (−3 ; −1 ; 0), AC⃗ = (2 ; 0 ; 1). La normale n⃗ = (a ; b ; c) vérifie −3a − b = 0 et 2a + c = 0.)
    (Comment trouver la normale ? Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0.)
    = n=(1;-3;□)   (trous : n = (1 ; -3 ; -2))   ← Une solution non nulle du système
  — n⃗ = (1 ; −3 ; −2). La constante d ?  [juge solset]  départ : 1·4 + (−3)·3 + (−2)·(−3) + d = 0
    = d = □   (trous : d = −1)   ← A est dans le plan
  — d = −1. L'équation du plan ?  [juge geom]  départ : π
    = x − 3y − 2z − □ = 0   (trous : x − 3y − 2z − 1 = 0)   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; −2) | n⃗ = (1 ; −3 ; −2), puis x-3y-2z-1 = 0
  pièges : g4_normal_sum

```

### Niveau 2

```
Donne une équation cartésienne du plan passant par A(−4 ; −3 ; 3), B(−4 ; −4 ; 0) et C(−7 ; −2 ; 3).
  [guided]  n
    (AB⃗ = (0 ; −1 ; −3), AC⃗ = (−3 ; 1 ; 0). La normale n⃗ = (a ; b ; c) vérifie −b − 3c = 0 et −3a + b = 0.)
    ? Comment trouver la normale ? ✔ Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0 / · Produit vectoriel u⃗ ∧ v⃗ / · n⃗ = u⃗ + v⃗
    = n=(1;□;□)   (trous : n = (1 ; 3 ; -1))   ← Une solution non nulle du système
  — n⃗ = (1 ; 3 ; −1). La constante d ?  [juge solset]  départ : 1·(−4) + 3·(−3) + (−1)·3 + d = 0
    = d = □   (trous : d = 16)   ← A est dans le plan
  — d = 16. L'équation du plan ?  [juge geom]  départ : π
    = x + 3y − z + 16 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; −1) | n⃗ = (1 ; 3 ; −1), puis x+3y-z+16 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(−4 ; −1 ; −1), B(−4 ; −1 ; 0) et C(−8 ; −4 ; −1).
  [guided]  n
    (AB⃗ = (0 ; 0 ; 1), AC⃗ = (−4 ; −3 ; 0). La normale n⃗ = (a ; b ; c) vérifie c = 0 et −4a − 3b = 0.)
    ? Comment trouver la normale ? ✔ Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0 / · Produit vectoriel u⃗ ∧ v⃗ / · n⃗ = u⃗ + v⃗
    = n=(3;□;□)   (trous : n = (3 ; -4 ; 0))   ← Une solution non nulle du système
  — n⃗ = (3 ; −4 ; 0). La constante d ?  [juge solset]  départ : 3·(−4) + (−4)·(−1) + 0·(−1) + d = 0
    = d = □   (trous : d = 8)   ← A est dans le plan
  — d = 8. L'équation du plan ?  [juge geom]  départ : π
    = □x − 4y + 8 = 0   (trous : 3x − 4y + 8 = 0)   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 0) | n⃗ = (3 ; −4 ; 0), puis 3x-4y+8 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(−4 ; −4 ; −1), B(−2 ; −1 ; −5) et C(−5 ; −4 ; −1).
  [guided]  n
    (AB⃗ = (2 ; 3 ; −4), AC⃗ = (−1 ; 0 ; 0). La normale n⃗ = (a ; b ; c) vérifie 2a + 3b − 4c = 0 et −a = 0.)
    ? Comment trouver la normale ? ✔ Résoudre n⃗·u⃗ = 0 et n⃗·v⃗ = 0 / · Produit vectoriel u⃗ ∧ v⃗ / · n⃗ = u⃗ + v⃗
    = n=(0;□;□)   (trous : n = (0 ; 4 ; 3))   ← Une solution non nulle du système
  — n⃗ = (0 ; 4 ; 3). La constante d ?  [juge solset]  départ : 0·(−4) + 4·(−4) + 3·(−1) + d = 0
    = d = □   (trous : d = 19)   ← A est dans le plan
  — d = 19. L'équation du plan ?  [juge geom]  départ : π
    = 4y + 3z + 19 = □   (trous : 4y + 3z + 19 = 0)   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 3) | n⃗ = (0 ; 4 ; 3), puis 4y+3z+19 = 0
  pièges : g4_normal_sum

```

### Niveau 3

```
Donne une équation cartésienne du plan qui contient le point A(3 ; −3 ; −2) et la droite (x ; y ; z) = (-1 ; -4 ; 2) + t(-2 ; -1 ; 1).
  [tap, suivre l'erreur, menu menu]  n
    (La droite passe par B(−1 ; −4 ; 2) avec la direction v⃗ = (−2 ; −1 ; 1) ; u⃗ = AB⃗ = (−4 ; −1 ; 4). La normale n⃗ = (a ; b ; c) vérifie −4a − b + 4c = 0 et −2a − b + c = 0.)
    = n = (3 ; -4 ; 2)   ← Une solution non nulle du système
  — n⃗ = (3 ; −4 ; 2). La constante d ?  [juge solset]  départ : 3·3 + (−4)·(−3) + 2·(−2) + d = 0
    = d = −17   ← A est dans le plan
  — d = −17. L'équation du plan ?  [juge geom]  départ : π
    = 3x − 4y + 2z − 17 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 2) | n⃗ = (3 ; −4 ; 2), puis 3x-4y+2z-17 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(4 ; −1 ; −4), de directions u⃗ = (1 ; 1 ; −2) et v⃗ = (1 ; 0 ; −4).
  [tap, suivre l'erreur, menu menu]  n
    (Directions : u⃗ = (1 ; 1 ; −2), v⃗ = (1 ; 0 ; −4). La normale n⃗ = (a ; b ; c) vérifie a + b − 2c = 0 et a − 4c = 0.)
    = n = (4 ; -2 ; 1)   ← Une solution non nulle du système
  — n⃗ = (4 ; −2 ; 1). La constante d ?  [juge solset]  départ : 4·4 + (−2)·(−1) + 1·(−4) + d = 0
    = d = −14   ← A est dans le plan
  — d = −14. L'équation du plan ?  [juge geom]  départ : π
    = 4x − 2y + z − 14 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 1) | n⃗ = (4 ; −2 ; 1), puis 4x-2y+z-14 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(4 ; 3 ; −1), de directions u⃗ = (0 ; 1 ; −1) et v⃗ = (−3 ; −2 ; −4).
  [tap, suivre l'erreur, menu menu]  n
    (Directions : u⃗ = (0 ; 1 ; −1), v⃗ = (−3 ; −2 ; −4). La normale n⃗ = (a ; b ; c) vérifie b − c = 0 et −3a − 2b − 4c = 0.)
    = n = (2 ; -1 ; -1)   ← Une solution non nulle du système
  — n⃗ = (2 ; −1 ; −1). La constante d ?  [juge solset]  départ : 2·4 + (−1)·3 + (−1)·(−1) + d = 0
    = d = −6   ← A est dans le plan
  — d = −6. L'équation du plan ?  [juge geom]  départ : π
    = 2x − y − z − 6 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; −1) | n⃗ = (2 ; −1 ; −1), puis 2x-y-z-6 = 0
  pièges : g4_normal_sum

```

### Niveau 4

```
Donne une équation cartésienne du plan qui contient le point A(−3 ; −1 ; 2) et la droite (x ; y ; z) = (-1 ; 1 ; 1) + t(1 ; -1 ; -2).
  [free, suivre l'erreur]  n
    (La droite passe par B(−1 ; 1 ; 1) avec la direction v⃗ = (1 ; −1 ; −2) ; u⃗ = AB⃗ = (2 ; 2 ; −1). La normale n⃗ = (a ; b ; c) vérifie 2a + 2b − c = 0 et a − b − 2c = 0.)
    = n = (5 ; -3 ; 4)   ← Une solution non nulle du système
  — n⃗ = (5 ; −3 ; 4). La constante d ?  [juge solset]  départ : 5·(−3) + (−3)·(−1) + 4·2 + d = 0
    = d = 4   ← A est dans le plan
  — d = 4. L'équation du plan ?  [juge geom]  départ : π
    = 5x − 3y + 4z + 4 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 4) | n⃗ = (5 ; −3 ; 4), puis 5x-3y+4z+4 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(−3 ; −3 ; 4), de directions u⃗ = (−1 ; 2 ; 2) et v⃗ = (−3 ; −4 ; 0).
  [free, suivre l'erreur]  n
    (Directions : u⃗ = (−1 ; 2 ; 2), v⃗ = (−3 ; −4 ; 0). La normale n⃗ = (a ; b ; c) vérifie −a + 2b + 2c = 0 et −3a − 4b = 0.)
    = n = (4 ; -3 ; 5)   ← Une solution non nulle du système
  — n⃗ = (4 ; −3 ; 5). La constante d ?  [juge solset]  départ : 4·(−3) + (−3)·(−3) + 5·4 + d = 0
    = d = −17   ← A est dans le plan
  — d = −17. L'équation du plan ?  [juge geom]  départ : π
    = 4x − 3y + 5z − 17 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 5) | n⃗ = (4 ; −3 ; 5), puis 4x-3y+5z-17 = 0
  pièges : g4_normal_sum

Donne une équation cartésienne du plan passant par A(−2 ; −4 ; −4), de directions u⃗ = (0 ; 0 ; 1) et v⃗ = (1 ; −4 ; −2).
  [free, suivre l'erreur]  n
    (Directions : u⃗ = (0 ; 0 ; 1), v⃗ = (1 ; −4 ; −2). La normale n⃗ = (a ; b ; c) vérifie c = 0 et a − 4b − 2c = 0.)
    = n = (4 ; 1 ; 0)   ← Une solution non nulle du système
  — n⃗ = (4 ; 1 ; 0). La constante d ?  [juge solset]  départ : 4·(−2) + 1·(−4) + 0·(−4) + d = 0
    = d = 12   ← A est dans le plan
  — d = 12. L'équation du plan ?  [juge geom]  départ : π
    = 4x + y + 12 = 0   ← Cartésienne
  aides : La normale est orthogonale aux deux directions : n⃗·u⃗ = 0 et n⃗·v⃗ = 0. | n⃗ = (□ ; □ ; 0) | n⃗ = (4 ; 1 ; 0), puis 4x+y+12 = 0
  pièges : g4_normal_sum

```

### Niveau 5

```
Donne une équation cartésienne du plan qui contient le point A(4 ; 2 ; 4) et la droite (x ; y ; z) = (4 ; 3 ; 2) + t(-2 ; 0 ; -3).
  [free, sans aide]  n
    (La droite passe par B(4 ; 3 ; 2) avec la direction v⃗ = (−2 ; 0 ; −3) ; u⃗ = AB⃗ = (0 ; 1 ; −2). La normale n⃗ = (a ; b ; c) vérifie b − 2c = 0 et −2a − 3c = 0.)
    = n = (3 ; -4 ; -2)   ← Une solution non nulle du système
  — n⃗ = (3 ; −4 ; −2). La constante d ?  [juge solset]  départ : 3·4 + (−4)·2 + (−2)·4 + d = 0
    = d = 4   ← A est dans le plan
  — d = 4. L'équation du plan ?  [juge geom]  départ : π
    = 3x − 4y − 2z + 4 = 0   ← Cartésienne
  pièges : g4_normal_sum

Donne une équation cartésienne du plan qui contient le point A(−1 ; 2 ; −3) et la droite (x ; y ; z) = (-5 ; 3 ; -3) + t(4 ; -1 ; 1).
  [free, sans aide]  n
    (La droite passe par B(−5 ; 3 ; −3) avec la direction v⃗ = (4 ; −1 ; 1) ; u⃗ = AB⃗ = (−4 ; 1 ; 0). La normale n⃗ = (a ; b ; c) vérifie −4a + b = 0 et 4a − b + c = 0.)
    = n = (1 ; 4 ; 0)   ← Une solution non nulle du système
  — n⃗ = (1 ; 4 ; 0). La constante d ?  [juge solset]  départ : 1·(−1) + 4·2 + 0·(−3) + d = 0
    = d = −7   ← A est dans le plan
  — d = −7. L'équation du plan ?  [juge geom]  départ : π
    = x + 4y − 7 = 0   ← Cartésienne
  pièges : g4_normal_sum

Donne une équation cartésienne du plan qui contient le point A(2 ; 2 ; −1) et la droite (x ; y ; z) = (0 ; 5 ; -1) + t(4 ; -1 ; 2).
  [free, sans aide]  n
    (La droite passe par B(0 ; 5 ; −1) avec la direction v⃗ = (4 ; −1 ; 2) ; u⃗ = AB⃗ = (−2 ; 3 ; 0). La normale n⃗ = (a ; b ; c) vérifie −2a + 3b = 0 et 4a − b + 2c = 0.)
    = n = (3 ; 2 ; -5)   ← Une solution non nulle du système
  — n⃗ = (3 ; 2 ; −5). La constante d ?  [juge solset]  départ : 3·2 + 2·2 + (−5)·(−1) + d = 0
    = d = −15   ← A est dans le plan
  — d = −15. L'équation du plan ?  [juge geom]  départ : π
    = 3x + 2y − 5z − 15 = 0   ← Cartésienne
  pièges : g4_normal_sum

```

### Variantes d'examen

```
Quelle est une équation du plan passant par A(−4 ; 4 ; 4), B(−2 ; 5 ; 4) et C(−3 ; 2 ; 5) ?
  · x-2y-5z = 0 [g4_line_constant]   ✔ x-2y-5z+32 = 0   · x-2y-5z-32 = 0 [g4_line_constant]   · 3x-y+z+12 = 0 [g4_normal_sum]
  [examen mcq]
  pièges : g4_normal_sum, g4_line_constant

Vrai ou faux ?
  « Le vecteur (a ; b ; c) est normal au plan ax + by + cz + d = 0. » → VRAI
  [examen tf]

Donne une équation cartésienne du plan qui contient le point A(0 ; −4 ; −1) et la droite (x ; y ; z) = (-2 ; -7 ; -1) + t(0 ; -2 ; -1).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1,5 ; n⃗ = (3 ; −2 ; 4). La constante d ? : 1,5 ; d = −4. L'équation du plan ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  n
      (La droite passe par B(−2 ; −7 ; −1) avec la direction v⃗ = (0 ; −2 ; −1) ; u⃗ = AB⃗ = (−2 ; −3 ; 0). La normale n⃗ = (a ; b ; c) vérifie −2a − 3b = 0 et −2b − c = 0.)
      = n = (3 ; -2 ; 4)   ← Une solution non nulle du système
    — n⃗ = (3 ; −2 ; 4). La constante d ?  [juge solset]  départ : 3·0 + (−2)·(−4) + 4·(−1) + d = 0
      = d = −4   ← A est dans le plan
    — d = −4. L'équation du plan ?  [juge geom]  départ : π
      = 3x − 2y + 4z − 4 = 0   ← Cartésienne
  pièges : g4_normal_sum

```

## Positions relatives dans l'espace (`g4-relative-pos`, Gymnase)

_Droite et plan, deux droites (sécantes, parallèles, gauches), deux plans._

### Niveau 1

```
On donne la droite d : (x ; y ; z) = (-4 ; 3 ; 0) + λ(1 ; 0 ; -1) et le plan α : x-2y+z+7 = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [guided]  (−4 + λ) + (−2)·3 − λ + 7 = 0
    = □λ − 3 = 0   (trous : 0λ − 3 = 0)   ← Développer et réduire
    (Conclure : la droite et le plan sont… Aucun λ : d ∥ α (sans point commun).)
    = ∅   ← Aucun λ
  aides : Remplace x, y, z de la droite dans l'équation du plan. | (−4+λ) + (−2)·3 − λ + 7 = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

On donne la droite d : (x ; y ; z) = (4 ; -4 ; 4) + λ(-1 ; -3 ; 1) et le plan α : -3x+y+19 = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [guided]  (−3)·(4 − λ) + (−4 − 3λ) + 19 = 0
    = □λ + 3 = 0   (trous : 0λ + 3 = 0)   ← Développer et réduire
    (Conclure : la droite et le plan sont… Aucun λ : d ∥ α (sans point commun).)
    = ∅   ← Aucun λ
  aides : Remplace x, y, z de la droite dans l'équation du plan. | (−3)·(4−λ) + (−4−3λ) + 19 = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

On donne la droite d : (x ; y ; z) = (2 ; 2 ; 4) + λ(-1 ; 0 ; 0) et le plan α : -2y-3z+10 = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [guided]  (−2)·2 + (−3)·4 + 10 = 0
    = □λ − 6 = 0   (trous : 0λ − 6 = 0)   ← Développer et réduire
    (Conclure : la droite et le plan sont… Aucun λ : d ∥ α (sans point commun).)
    = ∅   ← Aucun λ
  aides : Remplace x, y, z de la droite dans l'équation du plan. | (−2)·2 + (−3)·4 + 10 = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

```

### Niveau 2

```
On donne les droites d₁ : (x ; y ; z) = (-3 ; 0 ; -3) + s(3 ; 1 ; -1) et d₂ : (x ; y ; z) = (-9 ; -4 ; 3) + t(3 ; 2 ; -2). Quelle est leur position relative ?
  [guided]  s
    (Le système A + s·u⃗ = B + t·v⃗, deux paramètres différents. Ses deux premières équations utiles : −3 + 3s = −9 + 3t et s = −4 + 2t. Que vaut s ?)
    ? Les directions (3 ; 1 ; −1) et (3 ; 2 ; −2) sont-elles colinéaires ? · Oui / ✔ Non
    = □   (trous : 0)   ← Combinaison des deux équations
  — s = 0. Et t ?  [juge value]  départ : t
    = □   (trous : 2)
  — Vérifie la 3e équation : x_3(A + s·u⃗) − x_3(B + t·v⃗) = ?  [juge value]  départ : (−3) + (−1)·0 − (3 + (−2)·2)
    = −3 − (−1)   ← Chaque membre
    ? La 3e équation décide. Les droites sont… · sécantes (3e équation vérifiée) / ✔ gauches (3e équation fausse)
    = □   (trous : −2)   ← −2 ≠ 0 : gauches
  aides : Compare d'abord les directions ; sinon résous A + s·u⃗ = B + t·v⃗ avec deux paramètres différents. | Deux équations donnent s et t, la troisième décide. | Si la 3e équation n'est pas vérifiée : droites gauches.
  pièges : g4_skew_as_secant

On donne les droites d₁ : (x ; y ; z) = (-2 ; -4 ; 0) + s(-3 ; -2 ; -2) et d₂ : (x ; y ; z) = (-6 ; -6 ; -3) + t(2 ; 2 ; 1). Quelle est leur position relative ?
  [guided]  s
    (Le système A + s·u⃗ = B + t·v⃗, deux paramètres différents. Ses deux premières équations utiles : −2 − 3s = −6 + 2t et −4 − 2s = −6 + 2t. Que vaut s ?)
    ? Les directions (−3 ; −2 ; −2) et (2 ; 2 ; 1) sont-elles colinéaires ? · Oui / ✔ Non
    = □   (trous : 2)   ← Combinaison des deux équations
  — s = 2. Et t ?  [juge value]  départ : t
    = □   (trous : −1)
  — Vérifie la 3e équation : x_3(A + s·u⃗) − x_3(B + t·v⃗) = ?  [juge value]  départ : 0 + (−2)·2 − ((−3) + 1·(−1))
    = −4 − (−4)   ← Chaque membre
    ? La 3e équation décide. Les droites sont… ✔ sécantes (3e équation vérifiée) / · gauches (3e équation fausse)
    = □   (trous : 0)   ← Vérifiée : sécantes
  — Les droites sont sécantes. Le point commun ?  [juge vector]  départ : I
    = I = (-8 ; -8 ; -4)   ← A + s·u⃗
  aides : Compare d'abord les directions ; sinon résous A + s·u⃗ = B + t·v⃗ avec deux paramètres différents. | Deux équations donnent s et t, la troisième décide. | Si la 3e équation n'est pas vérifiée : droites gauches.

On donne les droites d₁ : (x ; y ; z) = (2 ; -3 ; 2) + s(-1 ; -1 ; 2) et d₂ : (x ; y ; z) = (9 ; 4 ; 3) + t(-1 ; -3 ; 1). Quelle est leur position relative ?
  [guided]  s
    (Le système A + s·u⃗ = B + t·v⃗, deux paramètres différents. Ses deux premières équations utiles : 2 − s = 9 − t et −3 − s = 4 − 3t. Que vaut s ?)
    ? Les directions (−1 ; −1 ; 2) et (−1 ; −3 ; 1) sont-elles colinéaires ? · Oui / ✔ Non
    = □   (trous : −7)   ← Combinaison des deux équations
  — s = −7. Et t ?  [juge value]  départ : t
    = □   (trous : 0)
  — Vérifie la 3e équation : x_3(A + s·u⃗) − x_3(B + t·v⃗) = ?  [juge value]  départ : 2 + 2·(−7) − (3 + 1·0)
    = −12 − 3   ← Chaque membre
    ? La 3e équation décide. Les droites sont… · sécantes (3e équation vérifiée) / ✔ gauches (3e équation fausse)
    = □   (trous : −15)   ← −15 ≠ 0 : gauches
  aides : Compare d'abord les directions ; sinon résous A + s·u⃗ = B + t·v⃗ avec deux paramètres différents. | Deux équations donnent s et t, la troisième décide. | Si la 3e équation n'est pas vérifiée : droites gauches.
  pièges : g4_skew_as_secant

```

### Niveau 3

```
On donne la droite d : (x ; y ; z) = (2 ; -4 ; -1) + λ(1 ; -2 ; -1) et le plan α : 2x+y = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [tap, suivre l'erreur, menu menu]  2·(2 + λ) + (−4 − 2λ) = 0
    = 0λ + 0 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… ✔ Vrai pour tout λ : d ⊂ α / · Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ℝ   ← Tout λ convient
  aides : Remplace x, y, z de la droite dans l'équation du plan. | 2·(2+λ) + (−4−2λ) = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

On donne la droite d : (x ; y ; z) = (3 ; -2 ; 3) + λ(0 ; 1 ; -1) et le plan α : x-3y-3z = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [tap, suivre l'erreur, menu menu]  3 + (−3)·(−2 + λ) + (−3)·(3 − λ) = 0
    = 0λ + 0 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… ✔ Vrai pour tout λ : d ⊂ α / · Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ℝ   ← Tout λ convient
  aides : Remplace x, y, z de la droite dans l'équation du plan. | 3 + (−3)·(−2+λ) + (−3)·(3−λ) = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

On donne la droite d : (x ; y ; z) = (0 ; -1 ; 3) + λ(3 ; 1 ; -3) et le plan α : 3x-3y+2z-11 = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [tap, suivre l'erreur, menu menu]  3·3λ + (−3)·(−1 + λ) + 2·(3 − 3λ) + (−11) = 0
    = 0λ − 2 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… · Vrai pour tout λ : d ⊂ α / ✔ Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ∅   ← Aucun λ
  aides : Remplace x, y, z de la droite dans l'équation du plan. | 3·3λ + (−3)·(−1+λ) + 2·(3−3λ) + (−11) = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

```

### Niveau 4

```
Donne une représentation paramétrique de la droite d'intersection des plans x+3y-6 = 0 et 2y-z-6 = 0.
  [free, suivre l'erreur]  d
    ? Les normales (1 ; 3 ; 0) et (0 ; 2 ; −1) sont-elles colinéaires ? ✔ Non : les plans se coupent selon une droite / · Oui : parallèles
    = (x ; y ; z) = (3 ; 1 ; -4) + t(-3 ; 1 ; 2)   ← Un point commun A(3 ; 1 ; −4) ; une direction orthogonale aux deux normales
  aides : Fixe une inconnue, résous les deux autres : un point ; puis une direction orthogonale aux deux normales. | (x ; y ; z) = (3 ; 1 ; −4) + t(□ ; □ ; □) | (x ; y ; z) = (3 ; 1 ; -4) + t(-3 ; 1 ; 2)

On donne la droite d : (x ; y ; z) = (2 ; 1 ; 0) + λ(-2 ; -2 ; -1) et le plan α : 2x-3y+2z-1 = 0. Quelle est leur position relative ? Donne le point commun s'il y en a un seul.
  [free, suivre l'erreur]  2·(2 − 2λ) + (−3)·(1 − 2λ) + 2·(−λ) + (−1) = 0
    = 0λ + 0 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… ✔ Vrai pour tout λ : d ⊂ α / · Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ℝ   ← Tout λ convient
  aides : Remplace x, y, z de la droite dans l'équation du plan. | 2·(2−2λ) + (−3)·(1−2λ) + 2·−λ + (−1) = 0, donc □·λ + □ = 0 | Le coefficient de λ et la constante disent la position.

On donne les droites d₁ : (x ; y ; z) = (4 ; 0 ; 1) + s(-1 ; -3 ; 2) et d₂ : (x ; y ; z) = (5 ; 2 ; 1) + t(-1 ; -3 ; 2). Quelle est leur position relative ?
  [free, suivre l'erreur]  s
    (Un point de d₂ est-il sur d₁ ? Cherche s tel que A + s·u⃗ ait la coordonnée n° 1 de B : 4 − s = 5.)
    ? Les directions (−1 ; −3 ; 2) et (−1 ; −3 ; 2) sont-elles colinéaires ? ✔ Oui / · Non
    = −1   ← Une seule coordonnée
  — s = −1. Les autres coordonnées de A + s·u⃗ et de B sont-elles égales ? Calcule la différence pour la coordonnée n° 2.  [juge value]  départ : 0 + (−3)·(−1) − 2
    = 3 − 2   ← Chaque membre
    ? Les droites sont… · confondues (B est sur d₁) / ✔ parallèles distinctes
    = 1   ← Non nulle : B n'est pas sur d₁
  aides : Compare d'abord les directions ; sinon résous A + s·u⃗ = B + t·v⃗ avec deux paramètres différents. | Deux équations donnent s et t, la troisième décide. | Si la 3e équation n'est pas vérifiée : droites gauches.

```

### Niveau 5

```
On donne la droite d : (x ; y ; z) = (3 ; 1 ; 1) + λ(-2 ; 0 ; 3), le point P(7 ; 1 ; −6) et le plan α : -3x-3y-2z+9 = 0. La droite d passe-t-elle par P ? Est-elle contenue dans α ? Sinon, la coupe-t-elle ?
  [free, sans aide]  λ_P
    = −2   ← Coordonnée n° 1 : 3 − 2λ = 7
  — λ = −2. Différence pour la coordonnée n° 3 entre A + λ·u⃗ et P ?  [juge value]  départ : 1 + 3·(−2) − (−6)
    ? La droite d passe-t-elle par P ? · Oui / ✔ Non
    = 1   ← Non nulle
  — Est-elle contenue dans α ? Substitue d dans α.  [juge solset]  départ : (−3)·(3 − 2λ) + (−3)·1 + (−2)·(1 + 3λ) + 9 = 0
    = 0λ − 5 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… · Vrai pour tout λ : d ⊂ α / ✔ Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ∅   ← Aucun λ

On donne la droite d : (x ; y ; z) = (-4 ; 2 ; 3) + λ(3 ; 1 ; 1), le point P(−7 ; 1 ; 2) et le plan α : -2x+3y+3z-17 = 0. La droite d passe-t-elle par P ? Est-elle contenue dans α ? Sinon, la coupe-t-elle ?
  [free, sans aide]  λ_P
    = −1   ← Coordonnée n° 1 : −4 + 3λ = −7
  — λ = −1. Différence pour la coordonnée n° 2 entre A + λ·u⃗ et P ?  [juge value]  départ : 2 + 1·(−1) − 1
    ? La droite d passe-t-elle par P ? ✔ Oui / · Non
    = 0   ← Nulle (et les autres aussi)
  — Est-elle contenue dans α ? Substitue d dans α.  [juge solset]  départ : (−2)·(−4 + 3λ) + 3·(2 + λ) + 3·(3 + λ) + (−17) = 0
    = 0λ + 6 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… · Vrai pour tout λ : d ⊂ α / ✔ Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
    = ∅   ← Aucun λ

On donne la droite d : (x ; y ; z) = (2 ; -4 ; 4) + λ(3 ; 3 ; 1), le point P(−1 ; −7 ; 3) et le plan α : -3x+2y-3z+20 = 0. La droite d passe-t-elle par P ? Est-elle contenue dans α ? Sinon, la coupe-t-elle ?
  [free, sans aide]  λ_P
    = −1   ← Coordonnée n° 1 : 2 + 3λ = −1
  — λ = −1. Différence pour la coordonnée n° 2 entre A + λ·u⃗ et P ?  [juge value]  départ : (−4) + 3·(−1) − (−7)
    ? La droite d passe-t-elle par P ? ✔ Oui / · Non
    = 0   ← Nulle (et les autres aussi)
  — Est-elle contenue dans α ? Substitue d dans α.  [juge solset]  départ : (−3)·(2 + 3λ) + 2·(−4 + 3λ) + (−3)·(4 + λ) + 20 = 0
    = −6λ − 6 = 0   ← Développer et réduire
    ? Conclure : la droite et le plan sont… · Vrai pour tout λ : d ⊂ α / · Aucun λ : d ∥ α (sans point commun) / ✔ Une seule valeur de λ : d coupe α
    = λ = −1   ← Une solution
  — λ = -1. Le point d'intersection ?  [juge vector]  départ : I
    = I = (-1 ; -7 ; 3)   ← Remplacer λ

```

### Variantes d'examen

```
On donne les droites d₁ : (x ; y ; z) = (-3 ; -3 ; 2) + s(-1 ; 1 ; -1) et d₂ : (x ; y ; z) = (6 ; -8 ; 6) + t(3 ; -1 ; 2). Quelle est leur position relative ?
  · parallèles distinctes   · sécantes [g4_skew_as_secant]   ✔ gauches   · confondues
  [examen mcq]
  pièges : g4_skew_as_secant

Vrai ou faux ?
  « Deux droites de l'espace qui ne sont pas parallèles sont sécantes. » → FAUX
    contre-exemple (geo) : A = (-3 ; 1 ; 3), u = (1 ; 3 ; 2), B = (3 ; 4 ; -3), v = (2 ; 1 ; 3)
  [examen tf]
  pièges : g4_skew_as_secant

On donne la droite d : (x ; y ; z) = (4 ; 4 ; 3) + λ(-3 ; 0 ; 1), le point P(1 ; 4 ; 4) et le plan α : -x-y-3z+21 = 0. La droite d passe-t-elle par P ? Est-elle contenue dans α ? Sinon, la coupe-t-elle ?
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; λ = 1. Différence pour la coordonnée n° 2 entre A + λ·u⃗ et P ? : 1,5 ; Est-elle contenue dans α ? Substitue d dans α. : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  λ_P
      = 1   ← Coordonnée n° 1 : 4 − 3λ = 1
    — λ = 1. Différence pour la coordonnée n° 2 entre A + λ·u⃗ et P ?  [juge value]  départ : 4 + 0·1 − 4
      ? La droite d passe-t-elle par P ? ✔ Oui / · Non
      = 0   ← Nulle (et les autres aussi)
    — Est-elle contenue dans α ? Substitue d dans α.  [juge solset]  départ : −(4 − 3λ) − 4 + (−3)·(3 + λ) + 21 = 0
      = 0λ + 4 = 0   ← Développer et réduire
      ? Conclure : la droite et le plan sont… · Vrai pour tout λ : d ⊂ α / ✔ Aucun λ : d ∥ α (sans point commun) / · Une seule valeur de λ : d coupe α
      = ∅   ← Aucun λ

```

## Produit vectoriel, aires (`g4-cross`, CMS)

_Trois déterminants 2 × 2 ; aire d'un parallélogramme, d'un triangle._

### Niveau 1

```
On donne u⃗ = (2 ; −2 ; 0) et v⃗ = (−1 ; −2 ; 4). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u ∧ v = ((-2)·4 - 0·(-2) ; 0·(-1) - 2·4 ; 2·(-2) - (-2)·(-1))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (□;□;□)   (trous : (-8 ; -8 ; -6))
  — Contrôle : (−8 ; −8 ; −6) doit être orthogonal à u⃗.  [juge vector]  départ : (-8 ; -8 ; -6)·(2 ; -2 ; 0)
    = (−8)·2 + (−8)·(−2) + (−6)·0 = □   (trous : (−8)·2 + (−8)·(−2) + (−6)·0 = 0)   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(□)   (trous : (1/2)·√(64 + 64 + 36))   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = √41
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (−8 ; □ ; −6) | (−8 ; −8 ; −6)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (3 ; −4 ; 2) et v⃗ = (1 ; −4 ; 0). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u ∧ v = ((-4)·0 - 2·(-4) ; 2·1 - 3·0 ; 3·(-4) - (-4)·1)   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (□;□;□)   (trous : (8 ; 2 ; -8))
  — Contrôle : (8 ; 2 ; −8) doit être orthogonal à u⃗.  [juge vector]  départ : (8 ; 2 ; -8)·(3 ; -4 ; 2)
    = 8·3 + 2·(−4) + (−8)·2 = □   (trous : 8·3 + 2·(−4) + (−8)·2 = 0)   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(□)   (trous : (1/2)·√(64 + 4 + 64))   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = √33
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (8 ; □ ; −8) | (8 ; 2 ; −8)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (−2 ; −2 ; 2) et v⃗ = (0 ; −3 ; −1). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u ∧ v = ((-2)·(-1) - 2·(-3) ; 2·0 - (-2)·(-1) ; (-2)·(-3) - (-2)·0)   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (□;□;□)   (trous : (8 ; -2 ; 6))
  — Contrôle : (8 ; −2 ; 6) doit être orthogonal à u⃗.  [juge vector]  départ : (8 ; -2 ; 6)·(-2 ; -2 ; 2)
    = 8·(−2) + (−2)·(−2) + 6·2 = □   (trous : 8·(−2) + (−2)·(−2) + 6·2 = 0)   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(□)   (trous : (1/2)·√(64 + 4 + 36))   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = √26
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (8 ; □ ; 6) | (8 ; −2 ; 6)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 2

```
On donne u⃗ = (1 ; −1 ; −2) et v⃗ = (1 ; 1 ; −4). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u∧v=((-1)×(-4)-(-2)×1;□;1×1-(-1)×1)   (trous : u ∧ v = ((-1)·(-4) - (-2)·1 ; (-2)·1 - 1·(-4) ; 1·1 - (-1)·1))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (6;□;2)   (trous : (6 ; 2 ; 2))
  — Contrôle : (6 ; 2 ; 2) doit être orthogonal à u⃗.  [juge vector]  départ : (6 ; 2 ; 2)·(1 ; -1 ; -2)
    = 6·1 + 2·(−1) + 2·(−2) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(36 + 4 + 4)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = √11
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (6 ; □ ; 2) | (6 ; 2 ; 2)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (2 ; −1 ; −3) et v⃗ = (3 ; 0 ; 3). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u∧v=((-1)×3-(-3)×0;□;2×0-(-1)×3)   (trous : u ∧ v = ((-1)·3 - (-3)·0 ; (-3)·3 - 2·3 ; 2·0 - (-1)·3))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (-3;□;3)   (trous : (-3 ; -15 ; 3))
  — Contrôle : (−3 ; −15 ; 3) doit être orthogonal à u⃗.  [juge vector]  départ : (-3 ; -15 ; 3)·(2 ; -1 ; -3)
    = (−3)·2 + (−15)·(−1) + 3·(−3) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(9 + 225 + 9)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 9√3/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (−3 ; □ ; 3) | (−3 ; −15 ; 3)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (−4 ; −4 ; 1) et v⃗ = (4 ; −4 ; −3). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [guided]  u et v
    = u∧v=((-4)×(-3)-1×(-4);□;(-4)×(-4)-(-4)×4)   (trous : u ∧ v = ((-4)·(-3) - 1·(-4) ; 1·4 - (-4)·(-3) ; (-4)·(-4) - (-4)·4))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (16;□;32)   (trous : (16 ; -8 ; 32))
  — Contrôle : (16 ; −8 ; 32) doit être orthogonal à u⃗.  [juge vector]  départ : (16 ; -8 ; 32)·(-4 ; -4 ; 1)
    = 16·(−4) + (−8)·(−4) + 32·1 = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(256 + 64 + 1024)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 4√21
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (16 ; □ ; 32) | (16 ; −8 ; 32)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 3

```
On donne u⃗ = (−1 ; 2 ; −1) et v⃗ = (2 ; 1 ; 3). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [tap, suivre l'erreur, menu menu]  u et v
    = u ∧ v = (2·3 - (-1)·1 ; (-1)·2 - (-1)·3 ; (-1)·1 - 2·2)   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (7 ; 1 ; -5)
  — Contrôle : (7 ; 1 ; −5) doit être orthogonal à u⃗.  [juge vector]  départ : (7 ; 1 ; -5)·(-1 ; 2 ; -1)
    = 7·(−1) + 1·2 + (−5)·(−1) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(49 + 1 + 25)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 5√3/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (7 ; □ ; −5) | (7 ; 1 ; −5)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (−4 ; −3 ; −1) et v⃗ = (−2 ; −3 ; 0). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [tap, suivre l'erreur, menu menu]  u et v
    = u ∧ v = ((-3)·0 - (-1)·(-3) ; (-1)·(-2) - (-4)·0 ; (-4)·(-3) - (-3)·(-2))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (-3 ; 2 ; 6)
  — Contrôle : (−3 ; 2 ; 6) doit être orthogonal à u⃗.  [juge vector]  départ : (-3 ; 2 ; 6)·(-4 ; -3 ; -1)
    = (−3)·(−4) + 2·(−3) + 6·(−1) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(9 + 4 + 36)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 7/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (−3 ; □ ; 6) | (−3 ; 2 ; 6)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (−2 ; −4 ; −3) et v⃗ = (2 ; −1 ; −3). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [tap, suivre l'erreur, menu menu]  u et v
    = u ∧ v = ((-4)·(-3) - (-3)·(-1) ; (-3)·2 - (-2)·(-3) ; (-2)·(-1) - (-4)·2)   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (9 ; -12 ; 10)
  — Contrôle : (9 ; −12 ; 10) doit être orthogonal à u⃗.  [juge vector]  départ : (9 ; -12 ; 10)·(-2 ; -4 ; -3)
    = 9·(−2) + (−12)·(−4) + 10·(−3) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(81 + 144 + 100)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 5√13/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (9 ; □ ; 10) | (9 ; −12 ; 10)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 4

```
On donne u⃗ = (−4 ; 2 ; −2) et v⃗ = (−1 ; 3 ; 0). Calcule (−2u⃗ − 2v⃗) ∧ (−2u⃗ + 3v⃗) en développant par bilinéarité.
  [free, suivre l'erreur]  (−2u − 2v) et (−2u + 3v)
    = −10·(u et v)   ← Bilinéarité : u⃗ ∧ u⃗ = v⃗ ∧ v⃗ = 0⃗ et v⃗ ∧ u⃗ = −u⃗ ∧ v⃗, d'où (−2·3 − (−2)·(−2))·u⃗ ∧ v⃗
    = -10·(6 ; 2 ; -10)   ← u⃗ ∧ v⃗ = (6 ; 2 ; −10)
    = (-60 ; -20 ; 100)
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (6 ; □ ; −10) | (6 ; 2 ; −10)
  pièges : g4_cross_commute

On donne u⃗ = (4 ; 0 ; 3) et v⃗ = (3 ; −3 ; 0). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [free, suivre l'erreur]  u et v
    = u ∧ v = (0·0 - 3·(-3) ; 3·3 - 4·0 ; 4·(-3) - 0·3)   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (9 ; 9 ; -12)
  — Contrôle : (9 ; 9 ; −12) doit être orthogonal à u⃗.  [juge vector]  départ : (9 ; 9 ; -12)·(4 ; 0 ; 3)
    = 9·4 + 9·0 + (−12)·3 = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(81 + 81 + 144)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 3√34/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (9 ; □ ; −12) | (9 ; 9 ; −12)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne u⃗ = (4 ; 4 ; −1) et v⃗ = (−3 ; 4 ; −1). Calcule u⃗ ∧ v⃗, contrôle-le par un produit scalaire, puis calcule l'aire du triangle construit sur u⃗ et v⃗.
  [free, suivre l'erreur]  u et v
    = u ∧ v = (4·(-1) - (-1)·4 ; (-1)·(-3) - 4·(-1) ; 4·4 - 4·(-3))   ← Trois déterminants 2 × 2 : (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁)
    = (0 ; 7 ; 28)
  — Contrôle : (0 ; 7 ; 28) doit être orthogonal à u⃗.  [juge vector]  départ : (0 ; 7 ; 28)·(4 ; 4 ; -1)
    = 0·4 + 7·4 + 28·(−1) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle construit sur u⃗ et v⃗ ?  [juge value]  départ : S
    = (1/2)·√(0 + 49 + 784)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 7√17/2
  aides : 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). Contrôle : le résultat est orthogonal à u⃗ et à v⃗. | (0 ; □ ; 28) | (0 ; 7 ; 28)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 5

```
On donne les points A(−3 ; −1 ; 1), B(−7 ; 3 ; −3) et C(−4 ; 3 ; 3). Calcule l'aire du triangle ABC, puis sa hauteur relative au côté [AB].
  [free, sans aide]  AB et AC
    = AB ∧ AC = (-4 ; 4 ; -4) ∧ (-1 ; 4 ; 2)   ← AB⃗ = B − A, AC⃗ = C − A
    = (4·2 - (-4)·4 ; (-4)·(-1) - (-4)·2 ; (-4)·4 - 4·(-1))   ← Trois déterminants 2 × 2
    = (24 ; 12 ; -12)
  — Contrôle : (24 ; 12 ; −12) doit être orthogonal à AB⃗.  [juge vector]  départ : (24 ; 12 ; -12)·(-4 ; 4 ; -4)
    = 24·(−4) + 12·4 + (−12)·(−4) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle ABC ?  [juge value]  départ : S
    = (1/2)·√(576 + 144 + 144)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 6√6
  — La hauteur h du triangle issue de C (relative au côté [AB]) ?  [juge value]  départ : h
    = 3√2   ← h = 2S/AB = ‖AB⃗ ∧ AC⃗‖/‖AB⃗‖, avec AB = 4√3
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les points A(−1 ; 2 ; 1), B(3 ; 0 ; 0) et C(−4 ; −1 ; 2). Calcule l'aire du triangle ABC, puis sa hauteur relative au côté [AB].
  [free, sans aide]  AB et AC
    = AB ∧ AC = (4 ; -2 ; -1) ∧ (-3 ; -3 ; 1)   ← AB⃗ = B − A, AC⃗ = C − A
    = ((-2)·1 - (-1)·(-3) ; (-1)·(-3) - 4·1 ; 4·(-3) - (-2)·(-3))   ← Trois déterminants 2 × 2
    = (-5 ; -1 ; -18)
  — Contrôle : (−5 ; −1 ; −18) doit être orthogonal à AB⃗.  [juge vector]  départ : (-5 ; -1 ; -18)·(4 ; -2 ; -1)
    = (−5)·4 + (−1)·(−2) + (−18)·(−1) = 0   ← Le produit scalaire est nul
  — L'aire S du triangle ABC ?  [juge value]  départ : S
    = (1/2)·√(25 + 1 + 324)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 5√14/2
  — La hauteur h du triangle issue de C (relative au côté [AB]) ?  [juge value]  départ : h
    = 5√6/3   ← h = 2S/AB = ‖AB⃗ ∧ AC⃗‖/‖AB⃗‖, avec AB = √21
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les points A(−1 ; 1 ; 0), B(−2 ; 0 ; 1) et C(1 ; 3 ; 1). Calcule l'aire du triangle ABC, puis sa hauteur relative au côté [AB].
  [free, sans aide]  AB et AC
    = AB ∧ AC = (-1 ; -1 ; 1) ∧ (2 ; 2 ; 1)   ← AB⃗ = B − A, AC⃗ = C − A
    = ((-1)·1 - 1·2 ; 1·2 - (-1)·1 ; (-1)·2 - (-1)·2)   ← Trois déterminants 2 × 2
    = (-3 ; 3 ; 0)
  — Contrôle : (−3 ; 3 ; 0) doit être orthogonal à AB⃗.  [juge vector]  départ : (-3 ; 3 ; 0)·(-1 ; -1 ; 1)
    = (−3)·(−1) + 3·(−1) + 0·1 = 0   ← Le produit scalaire est nul
  — L'aire S du triangle ABC ?  [juge value]  départ : S
    = (1/2)·√(9 + 9 + 0)   ← Aire du triangle = ½‖u⃗ ∧ v⃗‖
    = 3√2/2
  — La hauteur h du triangle issue de C (relative au côté [AB]) ?  [juge value]  départ : h
    = √6   ← h = 2S/AB = ‖AB⃗ ∧ AC⃗‖/‖AB⃗‖, avec AB = √3
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Variantes d'examen

```
On donne u⃗ = (4 ; 3 ; 1) et v⃗ = (−1 ; 4 ; 1). Que vaut u⃗ ∧ v⃗ ?
  · (−4 ; 12 ; 1)   · (1 ; 5 ; −19) [g4_cross_commute]   ✔ (−1 ; −5 ; 19)   · (−1 ; 5 ; 19) [g4_cross_middle_sign]
  [examen mcq]
  pièges : g4_cross_middle_sign, g4_cross_commute

Vrai ou faux ?
  « Pour tous vecteurs u⃗ et v⃗, le vecteur u⃗ ∧ v⃗ est orthogonal à u⃗ et à v⃗. » → VRAI
  [examen tf]

On donne u⃗ = (−2 ; −1 ; 0) et v⃗ = (1 ; −4 ; 3), et n⃗ = u⃗ ∧ v⃗. Que vaut n₂, la 2e composante de n⃗ ?
  [free, sans aide, examen coef]  n_2
    = 6
  pièges : g4_cross_middle_sign

```

## Produit mixte, volumes, coplanarité (`g4-triple`, CMS)

_(u⃗ ∧ v⃗)·w⃗, volume d'un tétraèdre, quatre points coplanaires._

### Niveau 1

```
On donne A(−3 ; 3 ; 3), B(−5 ; 4 ; 3), C(−6 ; 3 ; 6) et D(−6 ; 2 ; 6). Calcule le volume du tétraèdre ABCD.
  [guided]  [AB, AC, AD]
    (AB⃗ = (−2 ; 1 ; 0), AC⃗ = (−3 ; 0 ; 3), AD⃗ = (−3 ; −1 ; 3) et AB⃗ ∧ AC⃗ = (3 ; 6 ; 3). Le produit mixte ?)
    = 3·(−3) + 6·(−1) + 3·3 = □   (trous : 3·(−3) + 6·(−1) + 3·3 = −6)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |−6|/□   (trous : |−6|/6)   ← Un tétraèdre : le sixième du parallélépipède
    = 1
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |−6|/□ | V = 1

On donne A(1 ; 0 ; 3), B(4 ; 0 ; 6), C(3 ; 3 ; 0) et D(2 ; −2 ; 2). Calcule le volume du tétraèdre ABCD.
  [guided]  [AB, AC, AD]
    (AB⃗ = (3 ; 0 ; 3), AC⃗ = (2 ; 3 ; −3), AD⃗ = (1 ; −2 ; −1) et AB⃗ ∧ AC⃗ = (−9 ; 15 ; 9). Le produit mixte ?)
    = (−9)·1 + 15·(−2) + 9·(−1) = □   (trous : (−9)·1 + 15·(−2) + 9·(−1) = −48)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |−48|/□   (trous : |−48|/6)   ← Un tétraèdre : le sixième du parallélépipède
    = 8
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |−48|/□ | V = 8

On donne A(−1 ; 2 ; −3), B(−1 ; 4 ; −5), C(−3 ; 3 ; −3) et D(2 ; 3 ; −4). Calcule le volume du tétraèdre ABCD.
  [guided]  [AB, AC, AD]
    (AB⃗ = (0 ; 2 ; −2), AC⃗ = (−2 ; 1 ; 0), AD⃗ = (3 ; 1 ; −1) et AB⃗ ∧ AC⃗ = (2 ; 4 ; 4). Le produit mixte ?)
    = 2·3 + 4·1 + 4·(−1) = □   (trous : 2·3 + 4·1 + 4·(−1) = 6)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |6|/□   (trous : |6|/6)   ← Un tétraèdre : le sixième du parallélépipède
    = 1
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |6|/□ | V = 1

```

### Niveau 2

```
On donne A(−3 ; −2 ; −3), B(0 ; 0 ; −6), C(−1 ; −4 ; −3) et D(−6 ; 1 ; −6). Calcule le volume du tétraèdre ABCD.
  [guided]  AB et AC
    (AB⃗ = (3 ; 2 ; −3), AC⃗ = (2 ; −2 ; 0), AD⃗ = (−3 ; 3 ; −3))
    = AB ∧ AC = (3 ; 2 ; -3) ∧ (2 ; -2 ; 0)   ← Les arêtes issues de A
    = (□;-6;-10)   (trous : (-6 ; -6 ; -10))   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−6)·(−3) + (−6)·3 + (−10)·(−3) = □   (trous : (−6)·(−3) + (−6)·3 + (−10)·(−3) = 30)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    ? Le volume du tétraèdre est |[AB⃗, AC⃗, AD⃗]| multiplié par… ✔ 1/6 / · 1/3 / · 1/2
    = |30|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 5
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |30|/□ | V = 5
  pièges : g4_cross_middle_sign, g4_cross_commute, g4_tetra_factor

On donne A(0 ; 0 ; 1), B(−2 ; −3 ; 0), C(3 ; −1 ; 0) et D(−1 ; −1 ; −2). Calcule le volume du tétraèdre ABCD.
  [guided]  AB et AC
    (AB⃗ = (−2 ; −3 ; −1), AC⃗ = (3 ; −1 ; −1), AD⃗ = (−1 ; −1 ; −3))
    = AB ∧ AC = (-2 ; -3 ; -1) ∧ (3 ; -1 ; -1)   ← Les arêtes issues de A
    = (2;□;11)   (trous : (2 ; -5 ; 11))   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = 2·(−1) + (−5)·(−1) + 11·(−3) = □   (trous : 2·(−1) + (−5)·(−1) + 11·(−3) = −30)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    ? Le volume du tétraèdre est |[AB⃗, AC⃗, AD⃗]| multiplié par… ✔ 1/6 / · 1/3 / · 1/2
    = |−30|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 5
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |−30|/□ | V = 5
  pièges : g4_cross_middle_sign, g4_cross_commute, g4_tetra_factor

On donne A(1 ; 3 ; 1), B(2 ; 3 ; −1), C(−2 ; 6 ; 2) et D(3 ; 6 ; 0). Calcule le volume du tétraèdre ABCD.
  [guided]  AB et AC
    (AB⃗ = (1 ; 0 ; −2), AC⃗ = (−3 ; 3 ; 1), AD⃗ = (2 ; 3 ; −1))
    = AB ∧ AC = (1 ; 0 ; -2) ∧ (-3 ; 3 ; 1)   ← Les arêtes issues de A
    = (6;□;3)   (trous : (6 ; 5 ; 3))   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = 6·2 + 5·3 + 3·(−1) = □   (trous : 6·2 + 5·3 + 3·(−1) = 24)
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    ? Le volume du tétraèdre est |[AB⃗, AC⃗, AD⃗]| multiplié par… ✔ 1/6 / · 1/3 / · 1/2
    = |24|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 4
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |24|/□ | V = 4
  pièges : g4_cross_middle_sign, g4_cross_commute, g4_tetra_factor

```

### Niveau 3

```
On donne A(1 ; −2 ; 0), B(3 ; −4 ; 0), C(0 ; −1 ; 1) et D(0 ; −3 ; 2). Calcule le volume du tétraèdre ABCD.
  [tap, suivre l'erreur, menu menu]  AB et AC
    (AB⃗ = (2 ; −2 ; 0), AC⃗ = (−1 ; 1 ; 1), AD⃗ = (−1 ; −1 ; 2))
    = AB ∧ AC = (2 ; -2 ; 0) ∧ (-1 ; 1 ; 1)   ← Les arêtes issues de A
    = (-2 ; -2 ; 0)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−2)·(−1) + (−2)·(−1) + 0·2 = 4
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |4|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 2/3
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |4|/□ | V = 2/3
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(3 ; 3 ; −1), B(3 ; 0 ; −3), C(2 ; 4 ; −1) et D(6 ; 3 ; −3). Calcule le volume du tétraèdre ABCD.
  [tap, suivre l'erreur, menu menu]  AB et AC
    (AB⃗ = (0 ; −3 ; −2), AC⃗ = (−1 ; 1 ; 0), AD⃗ = (3 ; 0 ; −2))
    = AB ∧ AC = (0 ; -3 ; -2) ∧ (-1 ; 1 ; 0)   ← Les arêtes issues de A
    = (2 ; 2 ; -3)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = 2·3 + 2·0 + (−3)·(−2) = 12
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |12|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 2
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |12|/□ | V = 2
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(0 ; 2 ; −3), B(0 ; 5 ; −2), C(2 ; 3 ; −4) et D(2 ; 3 ; −5). Calcule le volume du tétraèdre ABCD.
  [tap, suivre l'erreur, menu menu]  AB et AC
    (AB⃗ = (0 ; 3 ; 1), AC⃗ = (2 ; 1 ; −1), AD⃗ = (2 ; 1 ; −2))
    = AB ∧ AC = (0 ; 3 ; 1) ∧ (2 ; 1 ; -1)   ← Les arêtes issues de A
    = (-4 ; 2 ; -6)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−4)·2 + 2·1 + (−6)·(−2) = 6
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |6|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 1
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |6|/□ | V = 1
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 4

```
On donne A(−1 ; −2 ; −2), B(−4 ; −5 ; 1), C(1 ; 0 ; −1) et D(0 ; −2 ; −3). Calcule le volume du tétraèdre ABCD.
  [free, suivre l'erreur]  AB et AC
    (AB⃗ = (−3 ; −3 ; 3), AC⃗ = (2 ; 2 ; 1), AD⃗ = (1 ; 0 ; −1))
    = AB ∧ AC = (-3 ; -3 ; 3) ∧ (2 ; 2 ; 1)   ← Les arêtes issues de A
    = (-9 ; 9 ; 0)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−9)·1 + 9·0 + 0·(−1) = −9
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |−9|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 3/2
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |−9|/□ | V = 3/2
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(0 ; 0 ; 1), B(3 ; 1 ; −1), C(3 ; −2 ; 2) et D(−2 ; −2 ; 1). Calcule le volume du tétraèdre ABCD.
  [free, suivre l'erreur]  AB et AC
    (AB⃗ = (3 ; 1 ; −2), AC⃗ = (3 ; −2 ; 1), AD⃗ = (−2 ; −2 ; 0))
    = AB ∧ AC = (3 ; 1 ; -2) ∧ (3 ; -2 ; 1)   ← Les arêtes issues de A
    = (-3 ; -9 ; -9)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−3)·(−2) + (−9)·(−2) + (−9)·0 = 24
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |24|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 4
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |24|/□ | V = 4
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(3 ; 2 ; −1), B(3 ; −1 ; 1), C(0 ; 2 ; 0) et D(1 ; 2 ; 1). Calcule le volume du tétraèdre ABCD.
  [free, suivre l'erreur]  AB et AC
    (AB⃗ = (0 ; −3 ; 2), AC⃗ = (−3 ; 0 ; 1), AD⃗ = (−2 ; 0 ; 2))
    = AB ∧ AC = (0 ; -3 ; 2) ∧ (-3 ; 0 ; 1)   ← Les arêtes issues de A
    = (-3 ; -6 ; -9)   ← Trois déterminants 2 × 2
  — Le produit mixte [AB⃗, AC⃗, AD⃗] = (AB⃗ ∧ AC⃗)·AD⃗ ?  [juge vector]  départ : [AB, AC, AD]
    = (−3)·(−2) + (−6)·0 + (−9)·2 = −12
  — Le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |−12|/6   ← Un tétraèdre : le sixième du parallélépipède
    = 2
  aides : Le volume du tétraèdre est le sixième du parallélépipède : |[AB⃗, AC⃗, AD⃗]|/6. | V = |−12|/□ | V = 2
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 5

```
On donne A(−1 ; 2 ; 3), B(−2 ; 4 ; 6), C(0 ; 1 ; 2) et D(−4 ; −1 ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = −7.
  [free, sans aide]  AB et AC
    (AB⃗ = (−1 ; 2 ; 3), AC⃗ = (1 ; −1 ; −1).)
    = AB ∧ AC = (-1 ; 2 ; 3) ∧ (1 ; -1 ; -1)
    = (1 ; 2 ; -1)
  — AD⃗ = (−3 ; −3 ; m − 3). Le produit mixte, en fonction de m ?  [juge vector]  départ : [AB, AC, AD]
    = −m − 6   ← (AB⃗ ∧ AC⃗)·AD⃗
  — Les quatre points sont coplanaires si et seulement si le produit mixte est nul.  [juge solset]  départ : −m − 6 = 0
    = m = −6
  — Pour m = −7, le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |1|/6   ← [AB⃗, AC⃗, AD⃗] = −1·(−7) − 6 = 1
    = 1/6
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(−1 ; −1 ; −1), B(−1 ; −4 ; −2), C(−3 ; −3 ; −1) et D(−4 ; 2 ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = 0.
  [free, sans aide]  AB et AC
    (AB⃗ = (0 ; −3 ; −1), AC⃗ = (−2 ; −2 ; 0).)
    = AB ∧ AC = (0 ; -3 ; -1) ∧ (-2 ; -2 ; 0)
    = (-2 ; 2 ; -6)
  — AD⃗ = (−3 ; 3 ; m + 1). Le produit mixte, en fonction de m ?  [juge vector]  départ : [AB, AC, AD]
    = −6m + 6   ← (AB⃗ ∧ AC⃗)·AD⃗
  — Les quatre points sont coplanaires si et seulement si le produit mixte est nul.  [juge solset]  départ : −6m + 6 = 0
    = m = 1
  — Pour m = 0, le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |6|/6   ← [AB⃗, AC⃗, AD⃗] = −6·0 + 6 = 6
    = 1
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne A(−1 ; 3 ; −3), B(−4 ; 6 ; −6), C(−2 ; 0 ; −1) et D(−2 ; 4 ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = −1.
  [free, sans aide]  AB et AC
    (AB⃗ = (−3 ; 3 ; −3), AC⃗ = (−1 ; −3 ; 2).)
    = AB ∧ AC = (-3 ; 3 ; -3) ∧ (-1 ; -3 ; 2)
    = (-3 ; 9 ; 12)
  — AD⃗ = (−1 ; 1 ; m + 3). Le produit mixte, en fonction de m ?  [juge vector]  départ : [AB, AC, AD]
    = 12m + 48   ← (AB⃗ ∧ AC⃗)·AD⃗
  — Les quatre points sont coplanaires si et seulement si le produit mixte est nul.  [juge solset]  départ : 12m + 48 = 0
    = m = −4
  — Pour m = −1, le volume V du tétraèdre ABCD ?  [juge value]  départ : V
    = |36|/6   ← [AB⃗, AC⃗, AD⃗] = 12·(−1) + 48 = 36
    = 6
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Variantes d'examen

```
Quel est le volume du tétraèdre de sommets A(3 ; −3 ; 3), B(3 ; −5 ; 0), C(5 ; −5 ; 1) et D(3 ; 0 ; 0) ?
  ✔ 5   · 15 [g4_tetra_factor]   · 10 [g4_tetra_factor]   · 30 [g4_tetra_factor]
  [examen mcq]
  pièges : g4_tetra_factor

Vrai ou faux ?
  « Quatre points A, B, C, D sont coplanaires si et seulement si [AB⃗, AC⃗, AD⃗] = 0. » → VRAI
  [examen tf]

On donne A(1 ; 2 ; 1), B(4 ; 1 ; 2), C(−1 ; 0 ; 4) et D(2 ; −1 ; m). Pour quelle valeur de m les quatre points sont-ils coplanaires ? Calcule ensuite le volume du tétraèdre ABCD pour m = 7.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; AD⃗ = (1 ; −3 ; m − 1). Le produit mixte, en fonction de m ? : 1 ; Les quatre points sont coplanaires si et seulement si le produit mixte est nul. : 1 ; Pour m = 7, le volume V du tétraèdre ABCD ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  AB et AC
      (AB⃗ = (3 ; −1 ; 1), AC⃗ = (−2 ; −2 ; 3).)
      = AB ∧ AC = (3 ; -1 ; 1) ∧ (-2 ; -2 ; 3)
      = (-1 ; -11 ; -8)
    — AD⃗ = (1 ; −3 ; m − 1). Le produit mixte, en fonction de m ?  [juge vector]  départ : [AB, AC, AD]
      = −8m + 40   ← (AB⃗ ∧ AC⃗)·AD⃗
    — Les quatre points sont coplanaires si et seulement si le produit mixte est nul.  [juge solset]  départ : −8m + 40 = 0
      = m = 5
    — Pour m = 7, le volume V du tétraèdre ABCD ?  [juge value]  départ : V
      = |−16|/6   ← [AB⃗, AC⃗, AD⃗] = −8·7 + 40 = −16
      = 8/3
  pièges : g4_cross_middle_sign, g4_cross_commute

```

## Distance d'un point à un plan ou à une droite, pied de la perpendiculaire (`g4-dist-point`, Gymnase)

_|ax₀ + by₀ + cz₀ + d|/‖n⃗‖ ; le pied H par projection._

### Niveau 1

```
Calcule la distance du point P(2 ; −4 ; 3) au plan 2x+2y-z-2 = 0, puis le pied H de la perpendiculaire issue de P.
  [guided]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = 2·2 + 2·(−4) + (−1)·3 + (−2) = □   (trous : 2·2 + 2·(−4) + (−1)·3 + (−2) = −9)   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−9|/√(□)   (trous : |−9|/√(4 + 4 + 1))   ← ‖n⃗‖ = √(4 + 4 + 1) = 3
    = 3
  — Le pied H de la perpendiculaire issue de P (n⃗ = (2 ; 2 ; −1)) ?  [juge vector]  départ : H
    = H = P − (−□/9)·n   (trous : H = P − (−9/9)·n)   ← H = P − (e/‖n⃗‖²)·n⃗
    = (□;□;□)   (trous : (4 ; -2 ; 2))
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = 2·4 + 2·(−2) + (−1)·2 + (−2) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−9|/□ | d = 3, H = (4 ; −2 ; 2)

Calcule la distance du point P(−3 ; −3 ; −7) au plan -x-2y-2z-5 = 0, puis le pied H de la perpendiculaire issue de P.
  [guided]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−1)·(−3) + (−2)·(−3) + (−2)·(−7) + (−5) = □   (trous : (−1)·(−3) + (−2)·(−3) + (−2)·(−7) + (−5) = 18)   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |18|/√(□)   (trous : |18|/√(1 + 4 + 4))   ← ‖n⃗‖ = √(1 + 4 + 4) = 3
    = 6
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−1 ; −2 ; −2)) ?  [juge vector]  départ : H
    = H = P − (18/□)·n   (trous : H = P − (18/9)·n)   ← H = P − (e/‖n⃗‖²)·n⃗
    = (□;□;□)   (trous : (-1 ; 1 ; -3))
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−1)·(−1) + (−2)·1 + (−2)·(−3) + (−5) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |18|/□ | d = 6, H = (−1 ; 1 ; −3)

Calcule la distance du point P(4 ; 0 ; 4) au plan -x+2y-2z-6 = 0, puis le pied H de la perpendiculaire issue de P.
  [guided]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−1)·4 + 2·0 + (−2)·4 + (−6) = □   (trous : (−1)·4 + 2·0 + (−2)·4 + (−6) = −18)   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−18|/√(□)   (trous : |−18|/√(1 + 4 + 4))   ← ‖n⃗‖ = √(1 + 4 + 4) = 3
    = 6
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−1 ; 2 ; −2)) ?  [juge vector]  départ : H
    = H = P − (−18/□)·n   (trous : H = P − (−18/9)·n)   ← H = P − (e/‖n⃗‖²)·n⃗
    = (□;□;□)   (trous : (2 ; 4 ; 0))
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−1)·2 + 2·4 + (−2)·0 + (−6) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−18|/□ | d = 6, H = (2 ; 4 ; 0)

```

### Niveau 2

```
Calcule la distance du point P(0 ; 4 ; −1) au plan 2x-y-2z-7 = 0, puis le pied H de la perpendiculaire issue de P.
  [guided]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    ? Quelle méthode ? ✔ Point-plan : la formule |ax₀ + by₀ + cz₀ + d|/‖n⃗‖ / · Point-droite : le pied H par projection sur la direction
    = 2·0 + (−1)·4 + (−2)·(−1) + (−7) = □   (trous : 2·0 + (−1)·4 + (−2)·(−1) + (−7) = −9)   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−9|/√(4 + 1 + 4)   ← ‖n⃗‖ = √(4 + 1 + 4) = 3
    = 3
  — Le pied H de la perpendiculaire issue de P (n⃗ = (2 ; −1 ; −2)) ?  [juge vector]  départ : H
    = H = P − (−9/9)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (2 ; 3 ; -3)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = 2·2 + (−1)·3 + (−2)·(−3) + (−7) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−9|/□ | d = 3, H = (2 ; 3 ; −3)

Calcule la distance du point P(−1 ; 4 ; 5) à la droite d : (x ; y ; z) = (-4 ; 4 ; 2) + t(2 ; -2 ; 1), en passant par le pied H de la perpendiculaire.
  [guided]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(−4 ; 4 ; 2) et v⃗ = (2 ; −2 ; 1) : t ?)
    ? Quelle méthode ? · Point-plan : la formule |ax₀ + by₀ + cz₀ + d|/‖n⃗‖ / ✔ Point-droite : le pied H par projection sur la direction
    = t = AP·v/(v·v)   ← AP⃗ = (3 ; 0 ; 3) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = □   (trous : 1)   ← t = 9/9
  — t = 1. Le pied H ?  [juge vector]  départ : H
    = H = A + 1·v
    = (-2 ; 2 ; 3)
  — La distance d = PH ?  [juge value]  départ : d
    = √(1 + 4 + 4)   ← PH⃗ = (−1 ; −2 ; −2)
    = 3
  aides : Le pied H = A + t·v⃗ rend PH⃗ orthogonal à v⃗ : t = AP⃗·v⃗/‖v⃗‖². | t = □/9 | H = (−2 ; 2 ; 3), d = 3

Calcule la distance du point P(2 ; 5 ; 1) au plan 2x+2y-z-4 = 0, puis le pied H de la perpendiculaire issue de P.
  [guided]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    ? Quelle méthode ? ✔ Point-plan : la formule |ax₀ + by₀ + cz₀ + d|/‖n⃗‖ / · Point-droite : le pied H par projection sur la direction
    = 2·2 + 2·5 + (−1)·1 + (−4) = □   (trous : 2·2 + 2·5 + (−1)·1 + (−4) = 9)   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |9|/√(4 + 4 + 1)   ← ‖n⃗‖ = √(4 + 4 + 1) = 3
    = 3
  — Le pied H de la perpendiculaire issue de P (n⃗ = (2 ; 2 ; −1)) ?  [juge vector]  départ : H
    = H = P − (9/9)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (0 ; 3 ; 2)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = 2·0 + 2·3 + (−1)·2 + (−4) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |9|/□ | d = 3, H = (0 ; 3 ; 2)

```

### Niveau 3

```
Calcule la distance du point P(10 ; −4 ; −3) à la droite d : (x ; y ; z) = (3 ; -4 ; -4) + t(-3 ; 0 ; -4), en passant par le pied H de la perpendiculaire.
  [tap, suivre l'erreur, menu menu]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(3 ; −4 ; −4) et v⃗ = (−3 ; 0 ; −4) : t ?)
    = t = AP·v/(v·v)   ← AP⃗ = (7 ; 0 ; 1) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = −1   ← t = −25/25
  — t = −1. Le pied H ?  [juge vector]  départ : H
    = H = A − 1·v
    = (6 ; -4 ; 0)
  — La distance d = PH ?  [juge value]  départ : d
    = √(16 + 0 + 9)   ← PH⃗ = (−4 ; 0 ; 3)
    = 5
  aides : Le pied H = A + t·v⃗ rend PH⃗ orthogonal à v⃗ : t = AP⃗·v⃗/‖v⃗‖². | t = □/25 | H = (6 ; −4 ; 0), d = 5

Calcule la distance du point P(7 ; 6 ; −6) au plan -2x-y+2z+14 = 0, puis le pied H de la perpendiculaire issue de P.
  [tap, suivre l'erreur, menu menu]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−2)·7 + (−1)·6 + 2·(−6) + 14 = −18   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−18|/√(4 + 1 + 4)   ← ‖n⃗‖ = √(4 + 1 + 4) = 3
    = 6
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−2 ; −1 ; 2)) ?  [juge vector]  départ : H
    = H = P − (−18/9)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (3 ; 4 ; -2)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−2)·3 + (−1)·4 + 2·(−2) + 14 = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−18|/□ | d = 6, H = (3 ; 4 ; −2)

Calcule la distance du point P(1 ; 2 ; −4) au plan -2x-2y+z-8 = 0, puis le pied H de la perpendiculaire issue de P.
  [tap, suivre l'erreur, menu menu]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−2)·1 + (−2)·2 + 1·(−4) + (−8) = −18   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−18|/√(4 + 4 + 1)   ← ‖n⃗‖ = √(4 + 4 + 1) = 3
    = 6
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−2 ; −2 ; 1)) ?  [juge vector]  départ : H
    = H = P − (−18/9)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (-3 ; -2 ; -2)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−2)·(−3) + (−2)·(−2) + 1·(−2) + (−8) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−18|/□ | d = 6, H = (−3 ; −2 ; −2)

```

### Niveau 4

```
Calcule la distance du point P(−2 ; −2 ; 0) à la droite d : (x ; y ; z) = (2 ; -1 ; 1) + t(-2 ; 1 ; -2), en passant par le pied H de la perpendiculaire.
  [free, suivre l'erreur]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(2 ; −1 ; 1) et v⃗ = (−2 ; 1 ; −2) : t ?)
    = t = AP·v/(v·v)   ← AP⃗ = (−4 ; −1 ; −1) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = 1   ← t = 9/9
  — t = 1. Le pied H ?  [juge vector]  départ : H
    = H = A + 1·v
    = (0 ; 0 ; -1)
  — La distance d = PH ?  [juge value]  départ : d
    = √(4 + 4 + 1)   ← PH⃗ = (2 ; 2 ; −1)
    = 3
  aides : Le pied H = A + t·v⃗ rend PH⃗ orthogonal à v⃗ : t = AP⃗·v⃗/‖v⃗‖². | t = □/9 | H = (0 ; 0 ; −1), d = 3

Calcule la distance du point P(−1 ; 1 ; −2) au plan -2x+2y+z+16 = 0, puis le pied H de la perpendiculaire issue de P.
  [free, suivre l'erreur]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−2)·(−1) + 2·1 + 1·(−2) + 16 = 18   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |18|/√(4 + 4 + 1)   ← ‖n⃗‖ = √(4 + 4 + 1) = 3
    = 6
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−2 ; 2 ; 1)) ?  [juge vector]  départ : H
    = H = P − (18/9)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (3 ; -3 ; -4)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−2)·3 + 2·(−3) + 1·(−4) + 16 = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |18|/□ | d = 6, H = (3 ; −3 ; −4)

Calcule la distance du point P(8 ; −4 ; −2) au plan -4x+3y-6 = 0, puis le pied H de la perpendiculaire issue de P.
  [free, suivre l'erreur]  e
    (On remplace P dans le membre de gauche de l'équation du plan : e = ax₀ + by₀ + cz₀ + d.)
    = (−4)·8 + 3·(−4) + 0·(−2) + (−6) = −50   ← Remplacer P dans l'équation du plan
  — La distance d de P au plan ?  [juge value]  départ : d
    = |−50|/√(16 + 9 + 0)   ← ‖n⃗‖ = √(16 + 9 + 0) = 5
    = 10
  — Le pied H de la perpendiculaire issue de P (n⃗ = (−4 ; 3 ; 0)) ?  [juge vector]  départ : H
    = H = P − (−50/25)·n   ← H = P − (e/‖n⃗‖²)·n⃗
    = (0 ; 2 ; -2)
  — Contrôle : H est dans le plan.  [juge vector]  départ : e_H
    = (−4)·0 + 3·2 + 0·(−2) + (−6) = 0
  aides : Remplace P dans l'équation, puis divise par la norme de la normale. | d = |−50|/□ | d = 10, H = (0 ; 2 ; −2)

```

### Niveau 5

```
On donne le point P(−2 ; −1 ; 2) et la droite d : (x ; y ; z) = (-2 ; -4 ; -4) + t(-1 ; 2 ; 2). La projection orthogonale de P sur d est-elle le point K(−4 ; 0 ; 0) ? Justifie en calculant le pied H, puis donne la distance de P à d.
  [free, sans aide]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(−2 ; −4 ; −4) et v⃗ = (−1 ; 2 ; 2) : t ?)
    = t = AP·v/(v·v)   ← AP⃗ = (0 ; 3 ; 6) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = 2   ← t = 18/9
  — t = 2. Le pied H ?  [juge vector]  départ : H
    = H = A + 2·v
    = (-4 ; 0 ; 0)
  — La distance d = PH ?  [juge value]  départ : d
    ? La projection orthogonale de P sur d est-elle K(−4 ; 0 ; 0) ? ✔ Oui / · Non
    = √(4 + 1 + 4)   ← PH⃗ = (−2 ; 1 ; −2)
    = 3

On donne le point P(−3 ; −5 ; 2) et la droite d : (x ; y ; z) = (2 ; -3 ; -2) + t(-2 ; -2 ; 1). La projection orthogonale de P sur d est-elle le point K(−2 ; −7 ; 0) ? Justifie en calculant le pied H, puis donne la distance de P à d.
  [free, sans aide]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(2 ; −3 ; −2) et v⃗ = (−2 ; −2 ; 1) : t ?)
    = t = AP·v/(v·v)   ← AP⃗ = (−5 ; −2 ; 4) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = 2   ← t = 18/9
  — t = 2. Le pied H ?  [juge vector]  départ : H
    = H = A + 2·v
    = (-2 ; -7 ; 0)
  — La distance d = PH ?  [juge value]  départ : d
    ? La projection orthogonale de P sur d est-elle K(−2 ; −7 ; 0) ? ✔ Oui / · Non
    = √(1 + 4 + 4)   ← PH⃗ = (1 ; −2 ; −2)
    = 3

On donne le point P(−1 ; 7 ; 11) et la droite d : (x ; y ; z) = (-3 ; 3 ; -4) + t(2 ; -3 ; -6). La projection orthogonale de P sur d est-elle le point K(−7 ; 9 ; 8) ? Justifie en calculant le pied H, puis donne la distance de P à d.
  [free, sans aide]  t
    (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(−3 ; 3 ; −4) et v⃗ = (2 ; −3 ; −6) : t ?)
    = t = AP·v/(v·v)   ← AP⃗ = (2 ; 4 ; 15) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
    = −2   ← t = −98/49
  — t = −2. Le pied H ?  [juge vector]  départ : H
    = H = A − 2·v
    = (-7 ; 9 ; 8)
  — La distance d = PH ?  [juge value]  départ : d
    ? La projection orthogonale de P sur d est-elle K(−7 ; 9 ; 8) ? ✔ Oui / · Non
    = √(36 + 4 + 9)   ← PH⃗ = (−6 ; 2 ; −3)
    = 7

```

### Variantes d'examen

```
Quelle est la distance du point P(−1 ; 1 ; 9) au plan 2x+3y-6z+4 = 0 ?
  · 1 [g4_proj_no_square]   ✔ 7   · −49 [g4_dist_no_norm]   · 49 [g4_dist_no_norm]
  [examen mcq]
  pièges : g4_dist_no_norm, g4_proj_no_square

Vrai ou faux ?
  « Le pied de la perpendiculaire issue de P(−4 ; 11 ; 0) sur le plan -3x+6y+2z+20 = 0 est le point (290 ; −577 ; −196). » → FAUX
    contre-exemple (geo) : H = (2 ; -1 ; -4)
  [examen tf]
  pièges : g4_proj_no_square

H est le pied de la perpendiculaire issue de P(8 ; 1 ; −3) sur le plan -4x+3z-9 = 0. Que vaut sa coordonnée y ?
  [free, sans aide, examen coef]  y_H
    = 1
  pièges : g4_proj_no_square

On donne le point P(4 ; 0 ; −3) et la droite d : (x ; y ; z) = (0 ; -1 ; -4) + t(2 ; -1 ; 2). La projection orthogonale de P sur d est-elle le point K(4 ; −3 ; 0) ? Justifie en calculant le pied H, puis donne la distance de P à d.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 2 ; t = 1. Le pied H ? : 1,5 ; La distance d = PH ? : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  t
      (Le pied H = A + t·v⃗ de la perpendiculaire issue de P, avec A(0 ; −1 ; −4) et v⃗ = (2 ; −1 ; 2) : t ?)
      = t = AP·v/(v·v)   ← AP⃗ = (4 ; 1 ; 1) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖²
      = 1   ← t = 9/9
    — t = 1. Le pied H ?  [juge vector]  départ : H
      = H = A + 1·v
      = (2 ; -2 ; -2)
    — La distance d = PH ?  [juge value]  départ : d
      = √(4 + 4 + 1)   ← PH⃗ = (−2 ; −2 ; 1)
      = 3

```

## Distance entre deux droites gauches (`g4-dist-skew`, CMS)

_|AB⃗·(u⃗ ∧ v⃗)|/‖u⃗ ∧ v⃗‖._

### Niveau 1

```
Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (0 ; -3 ; -3) + s(-2 ; 0 ; 1) et d₂ : (x ; y ; z) = (3 ; -2 ; -8) + t(0 ; 1 ; 1).
  [guided]  AB
    (n⃗ = u⃗ ∧ v⃗ = (−1 ; 2 ; −2). Le vecteur AB⃗ ?)
    = (□;□;□)   (trous : (3 ; 1 ; -5))   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 3·(−1) + 1·2 + (−5)·(−2) = □   (trous : 3·(−1) + 1·2 + (−5)·(−2) = 9)   ← 9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |9|/√(□)   (trous : |9|/√(1 + 4 + 4))   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-2 ; -3 ; -3) + s(-1 ; -2 ; -2) et d₂ : (x ; y ; z) = (-2 ; 2 ; -2) + t(0 ; -1 ; -2).
  [guided]  AB
    (n⃗ = u⃗ ∧ v⃗ = (2 ; −2 ; 1). Le vecteur AB⃗ ?)
    = (□;□;□)   (trous : (0 ; 5 ; 1))   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 0·2 + 5·(−2) + 1·1 = □   (trous : 0·2 + 5·(−2) + 1·1 = −9)   ← −9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−9|/√(□)   (trous : |−9|/√(4 + 4 + 1))   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-3 ; -3 ; 0) + s(1 ; 0 ; -2) et d₂ : (x ; y ; z) = (-3 ; -2 ; -7) + t(0 ; -1 ; -2).
  [guided]  AB
    (n⃗ = u⃗ ∧ v⃗ = (−2 ; 2 ; −1). Le vecteur AB⃗ ?)
    = (□;□;□)   (trous : (0 ; 1 ; -7))   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 0·(−2) + 1·2 + (−7)·(−1) = □   (trous : 0·(−2) + 1·2 + (−7)·(−1) = 9)   ← 9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |9|/√(□)   (trous : |9|/√(4 + 4 + 1))   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3

```

### Niveau 2

```
Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (1 ; -2 ; -2) + s(1 ; -1 ; 0) et d₂ : (x ; y ; z) = (4 ; 2 ; 2) + t(-2 ; 1 ; 2).
  [guided]  n
    = n = u ∧ v = (1 ; -1 ; 0) ∧ (-2 ; 1 ; 2)   ← Orthogonal aux deux droites
    = (□;-2;-1)   (trous : (-2 ; -2 ; -1))
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (3 ; 4 ; 4)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    ? Que vérifie le produit mixte [AB⃗, u⃗, v⃗] = AB⃗·n⃗ ? ✔ S'il est non nul, les droites sont gauches / · S'il est nul, les droites sont gauches
    = 3·(−2) + 4·(−2) + 4·(−1) = □   (trous : 3·(−2) + 4·(−2) + 4·(−1) = −18)   ← −18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−18|/√(4 + 4 + 1)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 6
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 6
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-2 ; -2 ; -1) + s(-2 ; 1 ; 0) et d₂ : (x ; y ; z) = (-5 ; 6 ; 4) + t(2 ; 0 ; -3).
  [guided]  n
    = n = u ∧ v = (-2 ; 1 ; 0) ∧ (2 ; 0 ; -3)   ← Orthogonal aux deux droites
    = (-3;□;-2)   (trous : (-3 ; -6 ; -2))
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (-3 ; 8 ; 5)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    ? Que vérifie le produit mixte [AB⃗, u⃗, v⃗] = AB⃗·n⃗ ? ✔ S'il est non nul, les droites sont gauches / · S'il est nul, les droites sont gauches
    = (−3)·(−3) + 8·(−6) + 5·(−2) = □   (trous : (−3)·(−3) + 8·(−6) + 5·(−2) = −49)   ← −49 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−49|/√(9 + 36 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 7
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 7
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (0 ; 0 ; 2) + s(2 ; -1 ; -2) et d₂ : (x ; y ; z) = (3 ; -2 ; 3) + t(0 ; -1 ; -1).
  [guided]  n
    = n = u ∧ v = (2 ; -1 ; -2) ∧ (0 ; -1 ; -1)   ← Orthogonal aux deux droites
    = (-1;□;-2)   (trous : (-1 ; 2 ; -2))
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (3 ; -2 ; 1)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    ? Que vérifie le produit mixte [AB⃗, u⃗, v⃗] = AB⃗·n⃗ ? ✔ S'il est non nul, les droites sont gauches / · S'il est nul, les droites sont gauches
    = 3·(−1) + (−2)·2 + 1·(−2) = □   (trous : 3·(−1) + (−2)·2 + 1·(−2) = −9)   ← −9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−9|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 3

```
Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (2 ; 2 ; -2) + s(-2 ; -2 ; -1) et d₂ : (x ; y ; z) = (2 ; 6 ; 5) + t(-1 ; 0 ; -1).
  [tap, suivre l'erreur, menu menu]  n
    = n = u ∧ v = (-2 ; -2 ; -1) ∧ (-1 ; 0 ; -1)   ← Orthogonal aux deux droites
    = (2 ; -1 ; -2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (0 ; 4 ; 7)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 0·2 + 4·(−1) + 7·(−2) = −18   ← −18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−18|/√(4 + 1 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 6
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 6
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-3 ; 1 ; 2) + s(-2 ; -1 ; -2) et d₂ : (x ; y ; z) = (-5 ; 1 ; -8) + t(0 ; -1 ; -1).
  [tap, suivre l'erreur, menu menu]  n
    = n = u ∧ v = (-2 ; -1 ; -2) ∧ (0 ; -1 ; -1)   ← Orthogonal aux deux droites
    = (-1 ; -2 ; 2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (-2 ; 0 ; -10)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = (−2)·(−1) + 0·(−2) + (−10)·2 = −18   ← −18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−18|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 6
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 6
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-3 ; 0 ; 1) + s(-2 ; 2 ; 3) et d₂ : (x ; y ; z) = (1 ; -7 ; 1) + t(0 ; 1 ; 1).
  [tap, suivre l'erreur, menu menu]  n
    = n = u ∧ v = (-2 ; 2 ; 3) ∧ (0 ; 1 ; 1)   ← Orthogonal aux deux droites
    = (-1 ; 2 ; -2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (4 ; -7 ; 0)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 4·(−1) + (−7)·2 + 0·(−2) = −18   ← −18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−18|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 6
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 6
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Niveau 4

```
Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (-3 ; -2 ; 0) + s(2 ; -2 ; -3) et d₂ : (x ; y ; z) = (-6 ; -1 ; 7) + t(0 ; -1 ; -1).
  [free, suivre l'erreur]  n
    = n = u ∧ v = (2 ; -2 ; -3) ∧ (0 ; -1 ; -1)   ← Orthogonal aux deux droites
    = (-1 ; 2 ; -2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (-3 ; 1 ; 7)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = (−3)·(−1) + 1·2 + 7·(−2) = −9   ← −9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−9|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (2 ; -1 ; 0) + s(0 ; -1 ; -1) et d₂ : (x ; y ; z) = (5 ; -7 ; 0) + t(2 ; -3 ; -2).
  [free, suivre l'erreur]  n
    = n = u ∧ v = (0 ; -1 ; -1) ∧ (2 ; -3 ; -2)   ← Orthogonal aux deux droites
    = (-1 ; -2 ; 2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (3 ; -6 ; 0)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 3·(−1) + (−6)·(−2) + 0·2 = 9   ← 9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |9|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 3
  pièges : g4_cross_middle_sign, g4_cross_commute

Calcule la distance entre les droites gauches d₁ : (x ; y ; z) = (1 ; 1 ; 1) + s(0 ; -1 ; -1) et d₂ : x+y-6 = 0 ; x-y+4z+20 = 0.
  [free, suivre l'erreur]  d_2
    (D'abord une paramétrisation de d₂.)
    = (x ; y ; z) = (7 ; -1 ; -7) + t(-2 ; 2 ; 1)   ← B(7 ; −1 ; −7) est sur les deux plans ; v⃗ est orthogonal à leurs deux normales
  — La normale commune ?  [juge vector]  départ : n
    = n = u ∧ v = (0 ; -1 ; -1) ∧ (-2 ; 2 ; 1)   ← Orthogonal aux deux droites
    = (1 ; 2 ; -2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (6 ; -2 ; -8)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 6·1 + (−2)·2 + (−8)·(−2) = 18   ← 18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |18|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 6
  aides : Projette AB⃗ sur la direction n⃗ = u⃗ ∧ v⃗, perpendiculaire aux deux droites. | d = |AB⃗·n⃗|/□ | d = 6

```

### Niveau 5

```
On donne les droites d₁ : (x ; y ; z) = (-3 ; 2 ; 3) + s(2 ; -2 ; -1) et d₂ : (x ; y ; z) = (-4 ; 2 ; 7) + t(-2 ; 0 ; -1). Montre qu'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.
  [problème, 6 points]
  partie 1 (Début du problème : 0,5 ; Le vecteur AB⃗ entre les points de base ? : 0,5 ; Le produit mixte AB⃗·n⃗ ? : 0,5 ; La distance d entre les deux droites ? : 0,5 ; P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ? : 0,5 ; 1re condition : PQ⃗·u⃗ = 0. : 0,5 ; 2e condition : PQ⃗·v⃗ = 0. : 0,5 ; Le système −6 − 3t − 9s = 0 et −2 + 5t + 3s = 0. s ? : 0,5 ; Et t ? : 0,5 ; s = −1. Le point P ? : 0,5 ; t = 1. Le point Q ? : 0,5 ; Une équation de la perpendiculaire commune (PQ) ? : 0,5)
    [free, sans aide, suivre l'erreur]  n
      = n = u ∧ v = (2 ; -2 ; -1) ∧ (-2 ; 0 ; -1)   ← Orthogonal aux deux droites
      = (2 ; 4 ; -4)
    — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
      = (-1 ; 0 ; 4)   ← B − A
    — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
      = (−1)·2 + 0·4 + 4·(−4) = −18   ← −18 ≠ 0 : les droites sont gauches
    — La distance d entre les deux droites ?  [juge value]  départ : d
      = |−18|/√(4 + 16 + 16)   ← d = |AB⃗·n⃗|/‖n⃗‖
      = 3
    — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
      = PQ = (-1-2t-2s ; 2s ; 4-t+s)   ← AB⃗ + t·v⃗ − s·u⃗
    — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 2·(−1 − 2t − 2s) + (−2)·(2s) + (−1)·(4 − t + s)
      = −6 − 3t − 9s   ← = 0
    — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(−1 − 2t − 2s) + 0·(2s) + (−1)·(4 − t + s)
      = −2 + 5t + 3s   ← = 0
    — Le système −6 − 3t − 9s = 0 et −2 + 5t + 3s = 0. s ?  [juge value]  départ : s
      = −1   ← Par combinaison des deux équations
    — Et t ?  [juge value]  départ : t
      = 1
    — s = −1. Le point P ?  [juge vector]  départ : P
      = (-5 ; 4 ; 4)   ← P = A − 1·u⃗
    — t = 1. Le point Q ?  [juge vector]  départ : Q
      = (-6 ; 2 ; 6)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
    — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
      = (x ; y ; z) = (-5 ; 4 ; 4) + k(1 ; 2 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les droites d₁ : (x ; y ; z) = (1 ; 2 ; -2) + s(3 ; -2 ; 2) et d₂ : (x ; y ; z) = (8 ; 1 ; 0) + t(1 ; 0 ; 1). Montre qu'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.
  [problème, 6 points]
  partie 1 (Début du problème : 0,5 ; Le vecteur AB⃗ entre les points de base ? : 0,5 ; Le produit mixte AB⃗·n⃗ ? : 0,5 ; La distance d entre les deux droites ? : 0,5 ; P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ? : 0,5 ; 1re condition : PQ⃗·u⃗ = 0. : 0,5 ; 2e condition : PQ⃗·v⃗ = 0. : 0,5 ; Le système 27 + 5t − 17s = 0 et 9 + 2t − 5s = 0. s ? : 0,5 ; Et t ? : 0,5 ; s = 1. Le point P ? : 0,5 ; t = −2. Le point Q ? : 0,5 ; Une équation de la perpendiculaire commune (PQ) ? : 0,5)
    [free, sans aide, suivre l'erreur]  n
      = n = u ∧ v = (3 ; -2 ; 2) ∧ (1 ; 0 ; 1)   ← Orthogonal aux deux droites
      = (-2 ; -1 ; 2)
    — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
      = (7 ; -1 ; 2)   ← B − A
    — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
      = 7·(−2) + (−1)·(−1) + 2·2 = −9   ← −9 ≠ 0 : les droites sont gauches
    — La distance d entre les deux droites ?  [juge value]  départ : d
      = |−9|/√(4 + 1 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
      = 3
    — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
      = PQ = (7+t-3s ; -1+2s ; 2+t-2s)   ← AB⃗ + t·v⃗ − s·u⃗
    — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 3·(7 + t − 3s) + (−2)·(−1 + 2s) + 2·(2 + t − 2s)
      = 27 + 5t − 17s   ← = 0
    — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 1·(7 + t − 3s) + 0·(−1 + 2s) + 1·(2 + t − 2s)
      = 9 + 2t − 5s   ← = 0
    — Le système 27 + 5t − 17s = 0 et 9 + 2t − 5s = 0. s ?  [juge value]  départ : s
      = 1   ← Par combinaison des deux équations
    — Et t ?  [juge value]  départ : t
      = −2
    — s = 1. Le point P ?  [juge vector]  départ : P
      = (4 ; 0 ; 0)   ← P = A + 1·u⃗
    — t = −2. Le point Q ?  [juge vector]  départ : Q
      = (6 ; 1 ; -2)   ← Q = B − 2·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
    — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
      = (x ; y ; z) = (4 ; 0 ; 0) + k(2 ; 1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les droites d₁ : (x ; y ; z) = (-3 ; -2 ; 2) + s(-2 ; -1 ; 0) et d₂ : (x ; y ; z) = (1 ; -6 ; 5) + t(0 ; 1 ; 1). Montre qu'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.
  [problème, 6 points]
  partie 1 (Début du problème : 0,5 ; Le vecteur AB⃗ entre les points de base ? : 0,5 ; Le produit mixte AB⃗·n⃗ ? : 0,5 ; La distance d entre les deux droites ? : 0,5 ; P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ? : 0,5 ; 1re condition : PQ⃗·u⃗ = 0. : 0,5 ; 2e condition : PQ⃗·v⃗ = 0. : 0,5 ; Le système −4 − t − 5s = 0 et −1 + 2t + s = 0. s ? : 0,5 ; Et t ? : 0,5 ; s = −1. Le point P ? : 0,5 ; t = 1. Le point Q ? : 0,5 ; Une équation de la perpendiculaire commune (PQ) ? : 0,5)
    [free, sans aide, suivre l'erreur]  n
      = n = u ∧ v = (-2 ; -1 ; 0) ∧ (0 ; 1 ; 1)   ← Orthogonal aux deux droites
      = (-1 ; 2 ; -2)
    — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
      = (4 ; -4 ; 3)   ← B − A
    — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
      = 4·(−1) + (−4)·2 + 3·(−2) = −18   ← −18 ≠ 0 : les droites sont gauches
    — La distance d entre les deux droites ?  [juge value]  départ : d
      = |−18|/√(1 + 4 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
      = 6
    — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
      = PQ = (4+2s ; -4+t+s ; 3+t)   ← AB⃗ + t·v⃗ − s·u⃗
    — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−2)·(4 + 2s) + (−1)·(−4 + t + s) + 0·(3 + t)
      = −4 − t − 5s   ← = 0
    — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 0·(4 + 2s) + 1·(−4 + t + s) + 1·(3 + t)
      = −1 + 2t + s   ← = 0
    — Le système −4 − t − 5s = 0 et −1 + 2t + s = 0. s ?  [juge value]  départ : s
      = −1   ← Par combinaison des deux équations
    — Et t ?  [juge value]  départ : t
      = 1
    — s = −1. Le point P ?  [juge vector]  départ : P
      = (-1 ; -1 ; 2)   ← P = A − 1·u⃗
    — t = 1. Le point Q ?  [juge vector]  départ : Q
      = (1 ; -5 ; 6)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
    — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
      = (x ; y ; z) = (-1 ; -1 ; 2) + k(1 ; -2 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Variantes d'examen

```
Quelle est la distance entre les droites gauches d₁ : (x ; y ; z) = (1 ; 0 ; 1) + s(2 ; 2 ; -1) et d₂ : (x ; y ; z) = (-6 ; -1 ; 3) + t(-1 ; 2 ; 2) ?
  · 3√6 [g4_skew_any_points]   · 27 [g4_dist_no_norm]   ✔ 3   · 6
  [examen mcq]
  pièges : g4_dist_no_norm, g4_skew_any_points

Vrai ou faux ?
  « La distance entre les droites gauches d₁ : (x ; y ; z) = (-1 ; 0 ; -3) + s(0 ; 3 ; 1) et d₂ : (x ; y ; z) = (-6 ; 1 ; 3) + t(2 ; 0 ; 1) est la distance AB entre leurs points de base A(−1 ; 0 ; −3) et B(−6 ; 1 ; 3). » → FAUX
    contre-exemple (geo) : P = (-1 ; 3 ; -2), Q = (-4 ; 1 ; 4)
  [examen tf]
  pièges : g4_skew_any_points

On donne les droites d₁ : (x ; y ; z) = (3 ; 0 ; -3) + s(2 ; -1 ; 0) et d₂ : (x ; y ; z) = (2 ; 1 ; -8) + t(-2 ; -2 ; 3). Montre qu'elles sont gauches et calcule leur distance, puis trouve les points P ∈ d₁ et Q ∈ d₂ de leur perpendiculaire commune, et une équation de celle-ci.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 0,5 ; Le vecteur AB⃗ entre les points de base ? : 0,5 ; Le produit mixte AB⃗·n⃗ ? : 0,5 ; La distance d entre les deux droites ? : 0,5 ; P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ? : 0,5 ; 1re condition : PQ⃗·u⃗ = 0. : 0,5 ; 2e condition : PQ⃗·v⃗ = 0. : 0,5 ; Le système −3 − 2t − 5s = 0 et −15 + 17t + 2s = 0. s ? : 0,5 ; Et t ? : 0,5 ; s = −1. Le point P ? : 0,5 ; t = 1. Le point Q ? : 0,5 ; Une équation de la perpendiculaire commune (PQ) ? : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  n
      = n = u ∧ v = (2 ; -1 ; 0) ∧ (-2 ; -2 ; 3)   ← Orthogonal aux deux droites
      = (-3 ; -6 ; -6)
    — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
      = (-1 ; 1 ; -5)   ← B − A
    — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
      = (−1)·(−3) + 1·(−6) + (−5)·(−6) = 27   ← 27 ≠ 0 : les droites sont gauches
    — La distance d entre les deux droites ?  [juge value]  départ : d
      = |27|/√(9 + 36 + 36)   ← d = |AB⃗·n⃗|/‖n⃗‖
      = 3
    — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
      = PQ = (-1-2t-2s ; 1-2t+s ; -5+3t)   ← AB⃗ + t·v⃗ − s·u⃗
    — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 2·(−1 − 2t − 2s) + (−1)·(1 − 2t + s) + 0·(−5 + 3t)
      = −3 − 2t − 5s   ← = 0
    — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(−1 − 2t − 2s) + (−2)·(1 − 2t + s) + 3·(−5 + 3t)
      = −15 + 17t + 2s   ← = 0
    — Le système −3 − 2t − 5s = 0 et −15 + 17t + 2s = 0. s ?  [juge value]  départ : s
      = −1   ← Par combinaison des deux équations
    — Et t ?  [juge value]  départ : t
      = 1
    — s = −1. Le point P ?  [juge vector]  départ : P
      = (1 ; 1 ; -3)   ← P = A − 1·u⃗
    — t = 1. Le point Q ?  [juge vector]  départ : Q
      = (0 ; -1 ; -5)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
    — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
      = (x ; y ; z) = (1 ; 1 ; -3) + k(1 ; 2 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

## Perpendiculaire commune à deux droites gauches (`g4-common-perp`, CMS)

_PQ⃗ ⟂ u⃗ et PQ⃗ ⟂ v⃗ : un système en s et t._

### Niveau 1

```
On donne les droites gauches d₁ : (x ; y ; z) = (-1 ; 0 ; -2) + s(-1 ; 0 ; -1) et d₂ : (x ; y ; z) = (7 ; 2 ; -4) + t(-3 ; -2 ; -2). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ : PQ⃗ = (8 − 3t + s ; 2 − 2t ; −2 − 2t + s).)
    = PQ=(□;2-2t;-2-2t+s)   (trous : PQ = (8-3t+s ; 2-2t ; -2-2t+s))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−1)·(8 − 3t + s) + 0·(2 − 2t) + (−1)·(−2 − 2t + s)
    = □ + 5t − 2s   (trous : −6 + 5t − 2s)   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−3)·(8 − 3t + s) + (−2)·(2 − 2t) + (−2)·(−2 − 2t + s)
    = □ + 17t − 5s   (trous : −24 + 17t − 5s)   ← = 0
  — Le système −6 + 5t − 2s = 0 et −24 + 17t − 5s = 0. s ?  [juge value]  départ : s
    = □   (trous : 2)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : 2)
  — s = 2. Le point P ?  [juge vector]  départ : P
    = (□;□;□)   (trous : (-3 ; 0 ; -4))   ← P = A + 2·u⃗
  — t = 2. Le point Q ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (1 ; -2 ; -8))   ← Q = B + 2·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (-3 ; 0 ; -4) + k(2 ; -1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = −6 + 5t − 2s = 0, PQ⃗·v⃗ = □ | s = 2, t = 2

On donne les droites gauches d₁ : (x ; y ; z) = (1 ; -3 ; -1) + s(1 ; 0 ; 2) et d₂ : (x ; y ; z) = (0 ; -6 ; -6) + t(-2 ; -1 ; -2). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ : PQ⃗ = (−1 − 2t − s ; −3 − t ; −5 − 2t − 2s).)
    = PQ=(□;-3-t;-5-2t-2s)   (trous : PQ = (-1-2t-s ; -3-t ; -5-2t-2s))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 1·(−1 − 2t − s) + 0·(−3 − t) + 2·(−5 − 2t − 2s)
    = □ − 6t − 5s   (trous : −11 − 6t − 5s)   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(−1 − 2t − s) + (−1)·(−3 − t) + (−2)·(−5 − 2t − 2s)
    = □ + 9t + 6s   (trous : 15 + 9t + 6s)   ← = 0
  — Le système −11 − 6t − 5s = 0 et 15 + 9t + 6s = 0. s ?  [juge value]  départ : s
    = □   (trous : −1)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : −1)
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (□;□;□)   (trous : (0 ; -3 ; -3))   ← P = A − 1·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (2 ; -5 ; -4))   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (0 ; -3 ; -3) + k(2 ; -2 ; -1)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = −11 − 6t − 5s = 0, PQ⃗·v⃗ = □ | s = −1, t = −1

On donne les droites gauches d₁ : (x ; y ; z) = (3 ; -3 ; 0) + s(-1 ; -2 ; 0) et d₂ : (x ; y ; z) = (-4 ; -5 ; 3) + t(1 ; 0 ; 1). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ : PQ⃗ = (−7 + t + s ; −2 + 2s ; 3 + t).)
    = PQ=(□;-2+2s;3+t)   (trous : PQ = (-7+t+s ; -2+2s ; 3+t))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−1)·(−7 + t + s) + (−2)·(−2 + 2s) + 0·(3 + t)
    = □ − t − 5s   (trous : 11 − t − 5s)   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 1·(−7 + t + s) + 0·(−2 + 2s) + 1·(3 + t)
    = □ + 2t + s   (trous : −4 + 2t + s)   ← = 0
  — Le système 11 − t − 5s = 0 et −4 + 2t + s = 0. s ?  [juge value]  départ : s
    = □   (trous : 2)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : 1)
  — s = 2. Le point P ?  [juge vector]  départ : P
    = (□;□;□)   (trous : (1 ; -7 ; 0))   ← P = A + 2·u⃗
  — t = 1. Le point Q ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (-3 ; -5 ; 4))   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (1 ; -7 ; 0) + k(2 ; -1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 11 − t − 5s = 0, PQ⃗·v⃗ = □ | s = 2, t = 1

```

### Niveau 2

```
On donne les droites gauches d₁ : (x ; y ; z) = (-1 ; -3 ; -1) + s(-3 ; -2 ; 0) et d₂ : (x ; y ; z) = (4 ; -6 ; 4) + t(0 ; 2 ; 1). Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ=(5+3s;□;5+t)   (trous : PQ = (5+3s ; -3+2t+2s ; 5+t))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−3)·(5 + 3s) + (−2)·(−3 + 2t + 2s) + 0·(5 + t)
    = −9 − 4t − 13s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 0·(5 + 3s) + 2·(−3 + 2t + 2s) + 1·(5 + t)
    = −1 + 5t + 4s   ← = 0
  — Le système −9 − 4t − 13s = 0 et −1 + 5t + 4s = 0. s ?  [juge value]  départ : s
    = □   (trous : −1)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : 1)
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (2 ; -1 ; -1)   ← P = A − 1·u⃗
  — t = 1. Le point Q ?  [juge vector]  départ : Q
    = (4 ; -4 ; 5)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 7, la distance des droites
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = −9 − 4t − 13s = 0, PQ⃗·v⃗ = □ | s = −1, t = 1

On donne les droites gauches d₁ : (x ; y ; z) = (-3 ; -3 ; 1) + s(2 ; 0 ; -1) et d₂ : (x ; y ; z) = (-3 ; -5 ; -6) + t(-2 ; 2 ; -1). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ=(-2t-2s;□;-7-t+s)   (trous : PQ = (-2t-2s ; -2+2t ; -7-t+s))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 2·(−2t − 2s) + 0·(−2 + 2t) + (−1)·(−7 − t + s)
    = 7 − 3t − 5s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(−2t − 2s) + 2·(−2 + 2t) + (−1)·(−7 − t + s)
    = 3 + 9t + 3s   ← = 0
  — Le système 7 − 3t − 5s = 0 et 3 + 9t + 3s = 0. s ?  [juge value]  départ : s
    = □   (trous : 2)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : −1)
  — s = 2. Le point P ?  [juge vector]  départ : P
    = (1 ; -3 ; -1)   ← P = A + 2·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (-1 ; -7 ; -5)   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (1 ; -3 ; -1) + k(1 ; 2 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 7 − 3t − 5s = 0, PQ⃗·v⃗ = □ | s = 2, t = −1

On donne les droites gauches d₁ : (x ; y ; z) = (-3 ; 0 ; 1) + s(3 ; -1 ; 0) et d₂ : (x ; y ; z) = (2 ; 4 ; 6) + t(0 ; -1 ; 2). Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.
  [guided]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ=(5-3s;□;5+2t)   (trous : PQ = (5-3s ; 4-t+s ; 5+2t))   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 3·(5 − 3s) + (−1)·(4 − t + s) + 0·(5 + 2t)
    = 11 + t − 10s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 0·(5 − 3s) + (−1)·(4 − t + s) + 2·(5 + 2t)
    = 6 + 5t − s   ← = 0
  — Le système 11 + t − 10s = 0 et 6 + 5t − s = 0. s ?  [juge value]  départ : s
    = □   (trous : 1)   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = □   (trous : −1)
  — s = 1. Le point P ?  [juge vector]  départ : P
    = (0 ; -1 ; 1)   ← P = A + 1·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (2 ; 5 ; 4)   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 7, la distance des droites
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 11 + t − 10s = 0, PQ⃗·v⃗ = □ | s = 1, t = −1

```

### Niveau 3

```
On donne les droites gauches d₁ : (x ; y ; z) = (-3 ; 1 ; -1) + s(-1 ; -1 ; 0) et d₂ : (x ; y ; z) = (-2 ; -8 ; 1) + t(-2 ; -3 ; 2). Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.
  [tap, suivre l'erreur, menu menu]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (1-2t+s ; -9-3t+s ; 2+2t)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−1)·(1 − 2t + s) + (−1)·(−9 − 3t + s) + 0·(2 + 2t)
    = 8 + 5t − 2s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(1 − 2t + s) + (−3)·(−9 − 3t + s) + 2·(2 + 2t)
    = 29 + 17t − 5s   ← = 0
  — Le système 8 + 5t − 2s = 0 et 29 + 17t − 5s = 0. s ?  [juge value]  départ : s
    = −1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = −2
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (-2 ; 2 ; -1)   ← P = A − 1·u⃗
  — t = −2. Le point Q ?  [juge vector]  départ : Q
    = (2 ; -2 ; -3)   ← Q = B − 2·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 8 + 5t − 2s = 0, PQ⃗·v⃗ = □ | s = −1, t = −2

On donne les droites gauches d₁ : (x ; y ; z) = (0 ; 0 ; 0) + s(1 ; -1 ; 0) et d₂ : (x ; y ; z) = (-3 ; -6 ; 0) + t(0 ; -1 ; -2). Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.
  [tap, suivre l'erreur, menu menu]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (-3-s ; -6-t+s ; -2t)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 1·(−3 − s) + (−1)·(−6 − t + s) + 0·(−2t)
    = 3 + t − 2s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 0·(−3 − s) + (−1)·(−6 − t + s) + (−2)·(−2t)
    = 6 + 5t − s   ← = 0
  — Le système 3 + t − 2s = 0 et 6 + 5t − s = 0. s ?  [juge value]  départ : s
    = 1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = −1
  — s = 1. Le point P ?  [juge vector]  départ : P
    = (1 ; -1 ; 0)   ← P = A + 1·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (-3 ; -5 ; 2)   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 3 + t − 2s = 0, PQ⃗·v⃗ = □ | s = 1, t = −1

On donne les droites gauches d₁ : (x ; y ; z) = (-1 ; -1 ; -1) + s(1 ; 2 ; 0) et d₂ : (x ; y ; z) = (5 ; 0 ; 7) + t(1 ; 0 ; -3). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [tap, suivre l'erreur, menu menu]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (6+t-s ; 1-2s ; 8-3t)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 1·(6 + t − s) + 2·(1 − 2s) + 0·(8 − 3t)
    = 8 + t − 5s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 1·(6 + t − s) + 0·(1 − 2s) + (−3)·(8 − 3t)
    = −18 + 10t − s   ← = 0
  — Le système 8 + t − 5s = 0 et −18 + 10t − s = 0. s ?  [juge value]  départ : s
    = 2   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = 2
  — s = 2. Le point P ?  [juge vector]  départ : P
    = (1 ; 3 ; -1)   ← P = A + 2·u⃗
  — t = 2. Le point Q ?  [juge vector]  départ : Q
    = (7 ; 0 ; 1)   ← Q = B + 2·v⃗ ; ‖PQ⃗‖ = 7, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (1 ; 3 ; -1) + k(6 ; -3 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 8 + t − 5s = 0, PQ⃗·v⃗ = □ | s = 2, t = 2

```

### Niveau 4

```
On donne les droites gauches d₁ : (x ; y ; z) = (-2 ; 2 ; -2) + s(-3 ; -2 ; -2) et d₂ : (x ; y ; z) = (7 ; 1 ; 0) + t(-1 ; -1 ; 0). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [free, suivre l'erreur]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (9-t+3s ; -1-t+2s ; 2+2s)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−3)·(9 − t + 3s) + (−2)·(−1 − t + 2s) + (−2)·(2 + 2s)
    = −29 + 5t − 17s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−1)·(9 − t + 3s) + (−1)·(−1 − t + 2s) + 0·(2 + 2s)
    = −8 + 2t − 5s   ← = 0
  — Le système −29 + 5t − 17s = 0 et −8 + 2t − 5s = 0. s ?  [juge value]  départ : s
    = −2   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = −1
  — s = −2. Le point P ?  [juge vector]  départ : P
    = (4 ; 6 ; 2)   ← P = A − 2·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (8 ; 2 ; 0)   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 6, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (4 ; 6 ; 2) + k(2 ; -2 ; -1)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = −29 + 5t − 17s = 0, PQ⃗·v⃗ = □ | s = −2, t = −1

On donne les droites gauches d₁ : (x ; y ; z) = (2 ; 2 ; 3) + s(2 ; 1 ; 0) et d₂ : (x ; y ; z) = (7 ; -1 ; 2) + t(-2 ; 2 ; 3). Trouve les points P ∈ d₁ et Q ∈ d₂ les plus proches.
  [free, suivre l'erreur]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (5-2t-2s ; -3+2t-s ; -1+3t)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 2·(5 − 2t − 2s) + 1·(−3 + 2t − s) + 0·(−1 + 3t)
    = 7 − 2t − 5s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(5 − 2t − 2s) + 2·(−3 + 2t − s) + 3·(−1 + 3t)
    = −19 + 17t + 2s   ← = 0
  — Le système 7 − 2t − 5s = 0 et −19 + 17t + 2s = 0. s ?  [juge value]  départ : s
    = 1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = 1
  — s = 1. Le point P ?  [juge vector]  départ : P
    = (4 ; 3 ; 3)   ← P = A + 1·u⃗
  — t = 1. Le point Q ?  [juge vector]  départ : Q
    = (5 ; 1 ; 5)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 7 − 2t − 5s = 0, PQ⃗·v⃗ = □ | s = 1, t = 1

On donne les droites gauches d₁ : (x ; y ; z) = (0 ; -2 ; 0) + s(2 ; -1 ; -2) et d₂ : (x ; y ; z) = (1 ; -6 ; 0) + t(-2 ; 2 ; 3). Trouve leur perpendiculaire commune : les points P ∈ d₁ et Q ∈ d₂, puis une équation de la droite (PQ).
  [free, suivre l'erreur]  PQ
    (P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?)
    = PQ = (1-2t-2s ; -4+2t+s ; 3t+2s)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 2·(1 − 2t − 2s) + (−1)·(−4 + 2t + s) + (−2)·(3t + 2s)
    = 6 − 12t − 9s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−2)·(1 − 2t − 2s) + 2·(−4 + 2t + s) + 3·(3t + 2s)
    = −10 + 17t + 12s   ← = 0
  — Le système 6 − 12t − 9s = 0 et −10 + 17t + 12s = 0. s ?  [juge value]  départ : s
    = −2   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = 2
  — s = −2. Le point P ?  [juge vector]  départ : P
    = (-4 ; 0 ; 4)   ← P = A − 2·u⃗
  — t = 2. Le point Q ?  [juge vector]  départ : Q
    = (-3 ; -2 ; 6)   ← Q = B + 2·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (-4 ; 0 ; 4) + k(1 ; -2 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  aides : Écris un point courant sur chaque droite, avec deux paramètres différents : PQ⃗ doit être orthogonal à u⃗ et à v⃗. | PQ⃗·u⃗ = 6 − 12t − 9s = 0, PQ⃗·v⃗ = □ | s = −2, t = 2

```

### Niveau 5

```
On donne les droites d₁ : (x ; y ; z) = (3 ; 1 ; 1) + s(-2 ; 2 ; 3) et d₂ : (x ; y ; z) = (2 ; 0 ; -3) + t(1 ; 0 ; -1). Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).
  [free, sans aide]  n
    = n = u ∧ v = (-2 ; 2 ; 3) ∧ (1 ; 0 ; -1)   ← Orthogonal aux deux droites
    = (-2 ; 1 ; -2)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (-1 ; -1 ; -4)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = (−1)·(−2) + (−1)·1 + (−4)·(−2) = 9   ← 9 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |9|/√(4 + 1 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
    = PQ = (-1+t+2s ; -1-2s ; -4-t-3s)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−2)·(−1 + t + 2s) + 2·(−1 − 2s) + 3·(−4 − t − 3s)
    = −12 − 5t − 17s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 1·(−1 + t + 2s) + 0·(−1 − 2s) + (−1)·(−4 − t − 3s)
    = 3 + 2t + 5s   ← = 0
  — Le système −12 − 5t − 17s = 0 et 3 + 2t + 5s = 0. s ?  [juge value]  départ : s
    = −1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = 1
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (5 ; -1 ; -2)   ← P = A − 1·u⃗
  — t = 1. Le point Q ?  [juge vector]  départ : Q
    = (3 ; 0 ; -4)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (5 ; -1 ; -2) + k(2 ; -1 ; 2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les droites d₁ : (x ; y ; z) = (0 ; 2 ; 3) + s(-2 ; 2 ; -1) et d₂ : (x ; y ; z) = (4 ; 3 ; 3) + t(0 ; -2 ; -1). Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).
  [free, sans aide]  n
    = n = u ∧ v = (-2 ; 2 ; -1) ∧ (0 ; -2 ; -1)   ← Orthogonal aux deux droites
    = (-4 ; -2 ; 4)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (4 ; 1 ; 0)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 4·(−4) + 1·(−2) + 0·4 = −18   ← −18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |−18|/√(16 + 4 + 16)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
    = PQ = (4+2s ; 1-2t-2s ; -t+s)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−2)·(4 + 2s) + 2·(1 − 2t − 2s) + (−1)·(−t + s)
    = −6 − 3t − 9s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 0·(4 + 2s) + (−2)·(1 − 2t − 2s) + (−1)·(−t + s)
    = −2 + 5t + 3s   ← = 0
  — Le système −6 − 3t − 9s = 0 et −2 + 5t + 3s = 0. s ?  [juge value]  départ : s
    = −1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = 1
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (2 ; 0 ; 4)   ← P = A − 1·u⃗
  — t = 1. Le point Q ?  [juge vector]  départ : Q
    = (4 ; 1 ; 2)   ← Q = B + 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (2 ; 0 ; 4) + k(2 ; 1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

On donne les droites d₁ : (x ; y ; z) = (-2 ; -1 ; 0) + s(0 ; -2 ; -1) et d₂ : (x ; y ; z) = (-2 ; 2 ; 6) + t(2 ; 2 ; 3). Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).
  [free, sans aide]  n
    = n = u ∧ v = (0 ; -2 ; -1) ∧ (2 ; 2 ; 3)   ← Orthogonal aux deux droites
    = (-4 ; -2 ; 4)
  — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
    = (0 ; 3 ; 6)   ← B − A
  — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
    = 0·(−4) + 3·(−2) + 6·4 = 18   ← 18 ≠ 0 : les droites sont gauches
  — La distance d entre les deux droites ?  [juge value]  départ : d
    = |18|/√(16 + 4 + 16)   ← d = |AB⃗·n⃗|/‖n⃗‖
    = 3
  — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
    = PQ = (2t ; 3+2t+2s ; 6+3t+s)   ← AB⃗ + t·v⃗ − s·u⃗
  — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : 0·(2t) + (−2)·(3 + 2t + 2s) + (−1)·(6 + 3t + s)
    = −12 − 7t − 5s   ← = 0
  — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : 2·(2t) + 2·(3 + 2t + 2s) + 3·(6 + 3t + s)
    = 24 + 17t + 7s   ← = 0
  — Le système −12 − 7t − 5s = 0 et 24 + 17t + 7s = 0. s ?  [juge value]  départ : s
    = −1   ← Par combinaison des deux équations
  — Et t ?  [juge value]  départ : t
    = −1
  — s = −1. Le point P ?  [juge vector]  départ : P
    = (-2 ; 1 ; 1)   ← P = A − 1·u⃗
  — t = −1. Le point Q ?  [juge vector]  départ : Q
    = (-4 ; 0 ; 3)   ← Q = B − 1·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
  — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
    = (x ; y ; z) = (-2 ; 1 ; 1) + k(2 ; 1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

### Variantes d'examen

```
La perpendiculaire commune aux droites d₁ : (x ; y ; z) = (-1 ; 1 ; -1) + s(0 ; -1 ; -1) et d₂ : (x ; y ; z) = (5 ; -6 ; -2) + t(-2 ; 1 ; 2) coupe d₁ en P. Que vaut la coordonnée z de P ?
  [free, sans aide, examen coef]  z_P
    = −2
  pièges : g4_common_perp_one_condition

On donne les droites d₁ : (x ; y ; z) = (-2 ; -3 ; 2) + s(-2 ; 2 ; -1) et d₂ : (x ; y ; z) = (2 ; -6 ; 0) + t(-1 ; 0 ; -1). Calcule leur distance, puis trouve leur perpendiculaire commune (P ∈ d₁, Q ∈ d₂, et la droite (PQ)).
  [problème, examen open, 7 points]
  partie 1 (Début du problème : 1 ; Le vecteur AB⃗ entre les points de base ? : 0,5 ; Le produit mixte AB⃗·n⃗ ? : 0,5 ; La distance d entre les deux droites ? : 1 ; P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ? : 0,5 ; 1re condition : PQ⃗·u⃗ = 0. : 0,5 ; 2e condition : PQ⃗·v⃗ = 0. : 0,5 ; Le système −12 + 3t − 9s = 0 et −2 + 2t − 3s = 0. s ? : 0,5 ; Et t ? : 0,5 ; s = −2. Le point P ? : 0,5 ; t = −2. Le point Q ? : 0,5 ; Une équation de la perpendiculaire commune (PQ) ? : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  n
      = n = u ∧ v = (-2 ; 2 ; -1) ∧ (-1 ; 0 ; -1)   ← Orthogonal aux deux droites
      = (-2 ; -1 ; 2)
    — Le vecteur AB⃗ entre les points de base ?  [juge vector]  départ : AB
      = (4 ; -3 ; -2)   ← B − A
    — Le produit mixte AB⃗·n⃗ ?  [juge vector]  départ : AB·n
      = 4·(−2) + (−3)·(−1) + (−2)·2 = −9   ← −9 ≠ 0 : les droites sont gauches
    — La distance d entre les deux droites ?  [juge value]  départ : d
      = |−9|/√(4 + 1 + 4)   ← d = |AB⃗·n⃗|/‖n⃗‖
      = 3
    — P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂ (deux paramètres différents). PQ⃗(s, t) ?  [juge vector]  départ : PQ
      = PQ = (4-t+2s ; -3-2s ; -2-t+s)   ← AB⃗ + t·v⃗ − s·u⃗
    — 1re condition : PQ⃗·u⃗ = 0.  [juge equiv]  départ : (−2)·(4 − t + 2s) + 2·(−3 − 2s) + (−1)·(−2 − t + s)
      = −12 + 3t − 9s   ← = 0
    — 2e condition : PQ⃗·v⃗ = 0.  [juge equiv]  départ : (−1)·(4 − t + 2s) + 0·(−3 − 2s) + (−1)·(−2 − t + s)
      = −2 + 2t − 3s   ← = 0
    — Le système −12 + 3t − 9s = 0 et −2 + 2t − 3s = 0. s ?  [juge value]  départ : s
      = −2   ← Par combinaison des deux équations
    — Et t ?  [juge value]  départ : t
      = −2
    — s = −2. Le point P ?  [juge vector]  départ : P
      = (2 ; -7 ; 4)   ← P = A − 2·u⃗
    — t = −2. Le point Q ?  [juge vector]  départ : Q
      = (4 ; -6 ; 2)   ← Q = B − 2·v⃗ ; ‖PQ⃗‖ = 3, la distance des droites
    — Une équation de la perpendiculaire commune (PQ) ?  [juge geom]  départ : p
      = (x ; y ; z) = (2 ; -7 ; 4) + k(2 ; 1 ; -2)   ← Par P, de direction PQ⃗ (ou n⃗ = u⃗ ∧ v⃗)
  pièges : g4_cross_middle_sign, g4_cross_commute

```

## Droite qui s'appuie sur deux droites gauches (`g4-line-two-skew`, CMS)

_Un plan par a de direction w⃗, puis son intersection avec b._

### Niveau 1

```
On donne les droites gauches a : (x ; y ; z) = (1 ; -1 ; -3) + s(0 ; -2 ; -1) et b : (x ; y ; z) = (0 ; 5 ; -5) + t(0 ; 2 ; -2). Trouve la droite n, de direction w⃗ = (−1 ; 2 ; −1), qui coupe a et b.
  [guided]  π
    (π contient a et la direction w⃗ ; sa normale est u⃗ ∧ w⃗ = (4 ; 1 ; −2). Une équation de π ?)
    = 4x + y − 2z − 9 = 0   ← Par le point (1 ; −1 ; −3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : −1)   ← 15 + 6t − 9 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (0 ; 3 ; -3))
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (0 ; 3 ; -3) + k(-1 ; 2 ; -1)   ← Contrôle : pour k = −1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 4x + y − 2z − 9 = 0
  pièges : g4_line_constant

On donne les droites gauches a : (x ; y ; z) = (1 ; 1 ; 0) + s(1 ; 0 ; -2) et b : (x ; y ; z) = (-1 ; 0 ; 3) + t(1 ; 0 ; -1). Trouve la droite n, de direction w⃗ = (−1 ; 1 ; 1), qui coupe a et b.
  [guided]  π
    (π contient a et la direction w⃗ ; sa normale est u⃗ ∧ w⃗ = (2 ; 1 ; 1). Une équation de π ?)
    = 2x + y + z − 3 = 0   ← Par le point (1 ; 1 ; 0) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : 2)   ← 1 + t − 3 = 0
  — t = 2. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (1 ; 0 ; 1))
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (1 ; 0 ; 1) + k(-1 ; 1 ; 1)   ← Contrôle : pour k = 1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 2x + y + z − 3 = 0
  pièges : g4_line_constant

On donne les droites gauches a : (x ; y ; z) = (3 ; -3 ; 4) + s(-2 ; 0 ; -2) et b : (x ; y ; z) = (-2 ; -6 ; 3) + t(2 ; 1 ; 0). Trouve la droite n, de direction w⃗ = (−1 ; 1 ; −1), qui coupe a et b.
  [guided]  π
    (π contient a et la direction w⃗ ; sa normale est u⃗ ∧ w⃗ = (2 ; 0 ; −2). Une équation de π ?)
    = x − z + 1 = 0   ← Par le point (3 ; −3 ; 4) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : 2)   ← −5 + 2t + 1 = 0
  — t = 2. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (□;□;□)   (trous : (2 ; -4 ; 3))
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (2 ; -4 ; 3) + k(-1 ; 1 ; -1)   ← Contrôle : pour k = 1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : x − z + 1 = 0
  pièges : g4_line_constant

```

### Niveau 2

```
On donne les droites gauches a : (x ; y ; z) = (-1 ; -4 ; -5) + s(1 ; -1 ; -1) et b : (x ; y ; z) = (0 ; -7 ; -1) + t(1 ; 1 ; 2). Trouve la droite n, de direction w⃗ = (2 ; −2 ; 2), qui coupe a et b.
  [guided]  n_π
    ? Quelle méthode ? ✔ Méthode des plans : π contient a et la direction w⃗, puis π ∩ b / ✔ Méthode des paramètres : Q(t) − P(s) = k·w⃗
    = n = u ∧ w = (1 ; -1 ; -1) ∧ (2 ; -2 ; 2)   ← Orthogonal à a et à w⃗
    = (-4 ; -4 ; 0)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = x + y + 5 = 0   ← Par le point (−1 ; −4 ; −5) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : 1)   ← −7 + 2t + 5 = 0
  — t = 1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (1 ; -6 ; 1)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (1 ; -6 ; 1) + k(2 ; -2 ; 2)   ← Contrôle : pour k = −2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : x + y + 5 = 0

On donne les droites gauches a : (x ; y ; z) = (2 ; -2 ; -3) + s(0 ; -1 ; -1) et b : (x ; y ; z) = (2 ; 4 ; -3) + t(2 ; -2 ; 0). Trouve la droite n, de direction w⃗ = (1 ; 1 ; −1), qui coupe a et b.
  [guided]  n_π
    ? Quelle méthode ? ✔ Méthode des plans : π contient a et la direction w⃗, puis π ∩ b / ✔ Méthode des paramètres : Q(t) − P(s) = k·w⃗
    = n = u ∧ w = (0 ; -1 ; -1) ∧ (1 ; 1 ; -1)   ← Orthogonal à a et à w⃗
    = (2 ; -1 ; 1)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = 2x − y + z − 3 = 0   ← Par le point (2 ; −2 ; −3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : 1)   ← −3 + 6t − 3 = 0
  — t = 1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (4 ; 2 ; -3)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (4 ; 2 ; -3) + k(1 ; 1 ; -1)   ← Contrôle : pour k = −2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 2x − y + z − 3 = 0

On donne les droites gauches a : (x ; y ; z) = (5 ; -4 ; -3) + s(1 ; -2 ; -2) et b : (x ; y ; z) = (-1 ; 0 ; -4) + t(2 ; 2 ; 1). Trouve la droite n, de direction w⃗ = (1 ; −1 ; 2), qui coupe a et b.
  [guided]  n_π
    ? Quelle méthode ? ✔ Méthode des plans : π contient a et la direction w⃗, puis π ∩ b / ✔ Méthode des paramètres : Q(t) − P(s) = k·w⃗
    = n = u ∧ w = (1 ; -2 ; -2) ∧ (1 ; -1 ; 2)   ← Orthogonal à a et à w⃗
    = (-6 ; -4 ; 1)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = 6x + 4y − z − 17 = 0   ← Par le point (5 ; −4 ; −3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = □   (trous : 1)   ← −2 + 19t − 17 = 0
  — t = 1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (1 ; 2 ; -3)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (1 ; 2 ; -3) + k(1 ; -1 ; 2)   ← Contrôle : pour k = 2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 6x + 4y − z − 17 = 0

```

### Niveau 3

```
On donne les droites gauches a : (x ; y ; z) = (-5 ; 3 ; -5) + s(-2 ; 2 ; -2) et b : (x ; y ; z) = (0 ; 1 ; -5) + t(-1 ; -1 ; 2). Trouve la droite n, de direction w⃗ = (1 ; −2 ; 2), qui coupe a et b.
  [tap, suivre l'erreur, menu menu]  n_π
    = n = u ∧ w = (-2 ; 2 ; -2) ∧ (1 ; -2 ; 2)   ← Orthogonal à a et à w⃗
    = (0 ; 2 ; 2)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = y + z + 2 = 0   ← Par le point (−5 ; 3 ; −5) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = 2   ← −4 + t + 2 = 0
  — t = 2. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (-2 ; -1 ; -1)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (-2 ; -1 ; -1) + k(1 ; -2 ; 2)   ← Contrôle : pour k = −1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : y + z + 2 = 0

On donne les droites gauches a : (x ; y ; z) = (-2 ; -2 ; 3) + s(-2 ; -1 ; 1) et b : (x ; y ; z) = (0 ; -4 ; 6) + t(2 ; -1 ; 2). Trouve la droite n, de direction w⃗ = (2 ; 2 ; −2), qui coupe a et b.
  [tap, suivre l'erreur, menu menu]  n_π
    = n = u ∧ w = (-2 ; -1 ; 1) ∧ (2 ; 2 ; -2)   ← Orthogonal à a et à w⃗
    = (0 ; -2 ; -2)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = y + z − 1 = 0   ← Par le point (−2 ; −2 ; 3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← 2 + t − 1 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (-2 ; -3 ; 4)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (-2 ; -3 ; 4) + k(2 ; 2 ; -2)   ← Contrôle : pour k = 1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : y + z − 1 = 0

On donne les droites gauches a : (x ; y ; z) = (-2 ; -3 ; 1) + s(0 ; 2 ; 2) et b : (x ; y ; z) = (-4 ; -4 ; 4) + t(1 ; 1 ; 1). Trouve la droite n, de direction w⃗ = (−1 ; −2 ; 2), qui coupe a et b.
  [tap, suivre l'erreur, menu menu]  n_π
    = n = u ∧ w = (0 ; 2 ; 2) ∧ (-1 ; -2 ; 2)   ← Orthogonal à a et à w⃗
    = (8 ; -2 ; 2)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = 4x − y + z + 4 = 0   ← Par le point (−2 ; −3 ; 1) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = 1   ← −8 + 4t + 4 = 0
  — t = 1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (-3 ; -3 ; 5)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (-3 ; -3 ; 5) + k(-1 ; -2 ; 2)   ← Contrôle : pour k = −1, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 4x − y + z + 4 = 0

```

### Niveau 4

```
On donne les droites gauches a : (x ; y ; z) = (4 ; -2 ; -3) + s(2 ; -1 ; 0) et b : (x ; y ; z) = (2 ; 2 ; -3) + t(-2 ; 0 ; 2). Trouve la droite n, de direction w⃗ = (−2 ; −1 ; 1), qui coupe a et b.
  [free, suivre l'erreur]  n_π
    = n = u ∧ w = (2 ; -1 ; 0) ∧ (-2 ; -1 ; 1)   ← Orthogonal à a et à w⃗
    = (-1 ; -2 ; -4)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = x + 2y + 4z + 12 = 0   ← Par le point (4 ; −2 ; −3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← −6 + 6t + 12 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (4 ; 2 ; -5)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (4 ; 2 ; -5) + k(-2 ; -1 ; 1)   ← Contrôle : pour k = 2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : x + 2y + 4z + 12 = 0

On donne les droites gauches a : (x ; y ; z) = (-1 ; -5 ; 2) + s(-1 ; -2 ; 2) et b : (x ; y ; z) = (-1 ; -3 ; 2) + t(-1 ; 2 ; 0). Trouve la droite n, normale au plan α : -y+z+1 = 0, qui coupe a et b.
  [free, suivre l'erreur]  n_π
    = n = u ∧ w = (-1 ; -2 ; 2) ∧ (0 ; -1 ; 1)   ← Orthogonal à a et à w⃗
    = (0 ; 1 ; 1)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = y + z + 3 = 0   ← Par le point (−1 ; −5 ; 2) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← −1 + 2t + 3 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (0 ; -5 ; 2)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (0 ; -5 ; 2) + k(0 ; -1 ; 1)   ← Contrôle : pour k = −2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : y + z + 3 = 0

On donne les droites gauches a : (x ; y ; z) = (-1 ; -1 ; -3) + s(2 ; -2 ; 1) et b : (x ; y ; z) = (3 ; -6 ; 4) + t(0 ; 1 ; 2). Trouve la droite n, normale au plan α : -x+2y-2z+3 = 0, qui coupe a et b.
  [free, suivre l'erreur]  n_π
    = n = u ∧ w = (2 ; -2 ; 1) ∧ (-1 ; 2 ; -2)   ← Orthogonal à a et à w⃗
    = (2 ; 3 ; 2)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = 2x + 3y + 2z + 11 = 0   ← Par le point (−1 ; −1 ; −3) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← −4 + 7t + 11 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (3 ; -7 ; 2)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (3 ; -7 ; 2) + k(-1 ; 2 ; -2)   ← Contrôle : pour k = 2, on retrouve un point de a
  aides : La droite n et la droite a sont dans un même plan π, qui contient la direction w⃗. | normale de π = u⃗ ∧ □ | π : 2x + 3y + 2z + 11 = 0

```

### Niveau 5

```
On donne les droites gauches a : (x ; y ; z) = (-1 ; 3 ; 0) + s(2 ; 1 ; -2) et b : (x ; y ; z) = (-6 ; 1 ; 6) + t(-2 ; 0 ; 2). Trouve la droite n, normale au plan α : x+y-2z+1 = 0, qui coupe a et b. Commence par dire combien il y a de solutions.
  [free, sans aide]  n_π
    ? Combien de droites de direction w⃗ s'appuient sur a et b ? ✔ Une seule : b n'est pas parallèle à π / · Aucune / · Une infinité
    = n = u ∧ w = (2 ; 1 ; -2) ∧ (1 ; 1 ; -2)   ← Orthogonal à a et à w⃗
    = (0 ; 2 ; 1)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = 2y + z − 6 = 0   ← Par le point (−1 ; 3 ; 0) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← 8 + 2t − 6 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (-4 ; 1 ; 4)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (-4 ; 1 ; 4) + k(1 ; 1 ; -2)   ← Contrôle : pour k = 1, on retrouve un point de a

On donne les droites gauches a : (x ; y ; z) = (3 ; 6 ; 4) + s(-1 ; -2 ; -2) et b : (x ; y ; z) = (4 ; 1 ; 5) + t(-2 ; 1 ; -2). Trouve la droite n, de direction w⃗ = (1 ; −1 ; −1), qui coupe a et b. Commence par dire combien il y a de solutions.
  [free, sans aide]  n_π
    ? Combien de droites de direction w⃗ s'appuient sur a et b ? ✔ Une seule : b n'est pas parallèle à π / · Aucune / · Une infinité
    = n = u ∧ w = (-1 ; -2 ; -2) ∧ (1 ; -1 ; -1)   ← Orthogonal à a et à w⃗
    = (0 ; -3 ; 3)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = y − z − 2 = 0   ← Par le point (3 ; 6 ; 4) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = 2   ← −4 + 3t − 2 = 0
  — t = 2. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (0 ; 3 ; 1)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (0 ; 3 ; 1) + k(1 ; -1 ; -1)   ← Contrôle : pour k = 1, on retrouve un point de a

On donne les droites gauches a : (x ; y ; z) = (2 ; -2 ; 1) + s(2 ; 0 ; -1) et b : (x ; y ; z) = (-1 ; -5 ; 2) + t(1 ; -2 ; 0). Trouve la droite n, de direction w⃗ = (0 ; −1 ; −1), qui coupe a et b. Commence par dire combien il y a de solutions.
  [free, sans aide]  n_π
    ? Combien de droites de direction w⃗ s'appuient sur a et b ? ✔ Une seule : b n'est pas parallèle à π / · Aucune / · Une infinité
    = n = u ∧ w = (2 ; 0 ; -1) ∧ (0 ; -1 ; -1)   ← Orthogonal à a et à w⃗
    = (-1 ; 2 ; -2)
  — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
    = x − 2y + 2z − 8 = 0   ← Par le point (2 ; −2 ; 1) de a
  — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
    = −1   ← 13 + 5t − 8 = 0
  — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
    = (-2 ; -3 ; 2)
  — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
    = (x ; y ; z) = (-2 ; -3 ; 2) + k(0 ; -1 ; -1)   ← Contrôle : pour k = −1, on retrouve un point de a

```

### Variantes d'examen

```
On donne a : (x ; y ; z) = (1 ; 1 ; 1) + s(1 ; 2 ; 2), b : (x ; y ; z) = (6 ; 1 ; -5) + t(-2 ; 1 ; 0) et w⃗ = (1 ; 2 ; −2). Combien y a-t-il de droites de direction w⃗ qui coupent a et b ?
  · Aucune   · Deux   ✔ Une seule   · Une infinité
  [examen mcq]

On donne les droites gauches a : (x ; y ; z) = (3 ; -4 ; 2) + s(0 ; 2 ; -2) et b : (x ; y ; z) = (-2 ; -5 ; -6) + t(-1 ; -1 ; 0). Trouve la droite n, normale au plan α : -x-y-z-1 = 0, qui coupe a et b. Commence par dire combien il y a de solutions.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 2 ; Une équation du plan π qui contient a, de direction w⃗ ? : 1 ; π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ? : 1 ; t = −1. Le point Q = π ∩ b ? : 1 ; La droite n, par Q, de direction w⃗ ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  n_π
      = n = u ∧ w = (0 ; 2 ; -2) ∧ (-2 ; -2 ; -2)   ← Orthogonal à a et à w⃗
      = (-8 ; 4 ; 4)
    — Une équation du plan π qui contient a, de direction w⃗ ?  [juge geom]  départ : π
      = 2x − y − z − 8 = 0   ← Par le point (3 ; −4 ; 2) de a
    — π ∩ b : on remplace B + t·v⃗ dans l'équation de π. t ?  [juge value]  départ : t
      = −1   ← 7 − t − 8 = 0
    — t = −1. Le point Q = π ∩ b ?  [juge vector]  départ : Q
      = (-1 ; -4 ; -6)
    — La droite n, par Q, de direction w⃗ ?  [juge geom]  départ : n
      = (x ; y ; z) = (-1 ; -4 ; -6) + k(-2 ; -2 ; -2)   ← Contrôle : pour k = −2, on retrouve un point de a

```

## Sphères : centre, rayon, plan tangent, section (`g4-sphere`, CMS)

_Compléter les carrés ; plan tangent ; cercle de section._

### Niveau 1

```
On donne x^2+y^2+z^2-4x-2y-6z-11 = 0. Donne son centre et son rayon.
  [guided]  x² + y² + z² − 4x − 2y − 6z − 11 = 0
    = (x − 2)² − □ + (y − □)² − 1 + (z − 3)² − □ − 11 = 0   (trous : (x − 2)² − 4 + (y − 1)² − 1 + (z − 3)² − 9 − 11 = 0)   ← Compléter un carré par variable
    = (x − 2)² + (y − 1)² + (z − 3)² = □   (trous : (x − 2)² + (y − 1)² + (z − 3)² = 25)   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (□;□;□)   (trous : (2 ; 1 ; 3))
  — Le rayon r ?  [juge value]  départ : r
    = □   (trous : 5)   ← r² = 25
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x − 2)² − □ + … | (x − 2)² + (y − 1)² + (z − 3)² = 25
  pièges : g4_square_constant

On donne x^2+y^2+z^2-2x-10y-23 = 0. Donne son centre et son rayon.
  [guided]  x² + y² + z² − 2x − 10y − 23 = 0
    = (x − □)² − 1 + (y − 5)² − □ + z² − 23 = 0   (trous : (x − 1)² − 1 + (y − 5)² − 25 + z² − 23 = 0)   ← Compléter un carré par variable
    = (x − 1)² + (y − 5)² + z² = □   (trous : (x − 1)² + (y − 5)² + z² = 49)   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (□;□;□)   (trous : (1 ; 5 ; 0))
  — Le rayon r ?  [juge value]  départ : r
    = □   (trous : 7)   ← r² = 49
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x − 1)² − □ + … | (x − 1)² + (y − 5)² + z² = 49
  pièges : g4_square_constant

On donne x^2+y^2+z^2+8x+10y+4z-4 = 0. Donne son centre et son rayon.
  [guided]  x² + y² + z² + 8x + 10y + 4z − 4 = 0
    = (x + 4)² − □ + (y + 5)² − □ + (z + 2)² − □ − 4 = 0   (trous : (x + 4)² − 16 + (y + 5)² − 25 + (z + 2)² − 4 − 4 = 0)   ← Compléter un carré par variable
    = (x + 4)² + (y + 5)² + (z + 2)² = □   (trous : (x + 4)² + (y + 5)² + (z + 2)² = 49)   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (□;□;□)   (trous : (-4 ; -5 ; -2))
  — Le rayon r ?  [juge value]  départ : r
    = □   (trous : 7)   ← r² = 49
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 4)² − □ + … | (x + 4)² + (y + 5)² + (z + 2)² = 49
  pièges : g4_square_constant

```

### Niveau 2

```
On donne x^2+y^2+z^2+2x+8y-8z+17 = 0. Donne son centre et son rayon.
  [guided]  x² + y² + z² + 2x + 8y − 8z + 17 = 0
    = (x + 1)² − 1 + (y + 4)² − 16 + (z − 4)² − 16 + 17 = 0   ← Compléter un carré par variable
    = (x + 1)² + (y + 4)² + (z − 4)² = 16   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-1 ; -4 ; 4)
  — Le rayon r ?  [juge value]  départ : r
    = 4   ← r² = 16
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 1)² − □ + … | (x + 1)² + (y + 4)² + (z − 4)² = 16
  pièges : g4_square_constant

On donne x^2+y^2+z^2+4x+4z+8 = 0. Quel ensemble décrit cette équation ?
  [guided]  x² + y² + z² + 4x + 4z + 8 = 0
    = (x + 2)² − 4 + y² + (z + 2)² − 4 + 8 = 0   ← Compléter un carré par variable
    = (x + 2)² + y² + (z + 2)² = 0   ← Forme réduite
  — r² = 0. Quel ensemble ?  [juge value]  départ : r²
    ? L'équation décrit… · une sphère (r² > 0) / ✔ un seul point, le centre (r² = 0) / · l'ensemble vide (r² < 0)
    = 0   ← Un seul point : C(−2 ; 0 ; −2)
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 2)² − □ + … | (x + 2)² + y² + (z + 2)² = 0
  pièges : g4_square_constant

On donne x^2+y^2+z^2+6x+8y-4z-7 = 0. Donne son centre et son rayon.
  [guided]  x² + y² + z² + 6x + 8y − 4z − 7 = 0
    = (x + 3)² − 9 + (y + 4)² − 16 + (z − 2)² − 4 − 7 = 0   ← Compléter un carré par variable
    = (x + 3)² + (y + 4)² + (z − 2)² = 36   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-3 ; -4 ; 2)
  — Le rayon r ?  [juge value]  départ : r
    = 6   ← r² = 36
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 3)² − □ + … | (x + 3)² + (y + 4)² + (z − 2)² = 36
  pièges : g4_square_constant

```

### Niveau 3

```
On donne x^2+y^2+z^2+4x-6y+4z-32 = 0. Donne son centre, son rayon, puis le plan tangent en T(1 ; 5 ; −8).
  [tap, suivre l'erreur, menu menu]  x² + y² + z² + 4x − 6y + 4z − 32 = 0
    = (x + 2)² − 4 + (y − 3)² − 9 + (z + 2)² − 4 − 32 = 0   ← Compléter un carré par variable
    = (x + 2)² + (y − 3)² + (z + 2)² = 49   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-2 ; 3 ; -2)
  — Le rayon r ?  [juge value]  départ : r
    = 7   ← r² = 49
  — Le plan tangent en T(1 ; 5 ; −8) : sa normale est CT⃗.  [juge vector]  départ : n
    = n = CT = (3 ; 2 ; -6)   ← Le rayon CT est perpendiculaire au plan tangent
  — Une équation du plan tangent ?  [juge geom]  départ : π
    = 3x + 2y − 6z − 61 = 0   ← Par T, de normale (3 ; 2 ; −6)
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 2)² − □ + … | (x + 2)² + (y − 3)² + (z + 2)² = 49
  pièges : g4_square_constant

On donne x^2+y^2+z^2+2y-10z+27 = 0. Quel ensemble décrit cette équation ?
  [tap, suivre l'erreur, menu menu]  x² + y² + z² + 2y − 10z + 27 = 0
    = x² + (y + 1)² − 1 + (z − 5)² − 25 + 27 = 0   ← Compléter un carré par variable
    = x² + (y + 1)² + (z − 5)² = −1   ← Forme réduite
  — r² = −1. Quel ensemble ?  [juge value]  départ : r²
    ? L'équation décrit… · une sphère (r² > 0) / · un seul point, le centre (r² = 0) / ✔ l'ensemble vide (r² < 0)
    = −1   ← Une somme de carrés n'est jamais négative : aucun point
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (y + 1)² − □ + … | x² + (y + 1)² + (z − 5)² = − 1
  pièges : g4_square_constant

On donne x^2+y^2+z^2+4x+6y-2z+23 = 0. Quel ensemble décrit cette équation ?
  [tap, suivre l'erreur, menu menu]  x² + y² + z² + 4x + 6y − 2z + 23 = 0
    = (x + 2)² − 4 + (y + 3)² − 9 + (z − 1)² − 1 + 23 = 0   ← Compléter un carré par variable
    = (x + 2)² + (y + 3)² + (z − 1)² = −9   ← Forme réduite
  — r² = −9. Quel ensemble ?  [juge value]  départ : r²
    ? L'équation décrit… · une sphère (r² > 0) / · un seul point, le centre (r² = 0) / ✔ l'ensemble vide (r² < 0)
    = −9   ← Une somme de carrés n'est jamais négative : aucun point
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 2)² − □ + … | (x + 2)² + (y + 3)² + (z − 1)² = − 9
  pièges : g4_square_constant

```

### Niveau 4

```
On donne x^2+y^2+z^2+8x-6y+2z+1 = 0. Donne son centre, son rayon, puis la section par le plan 2x+y+2z+4 = 0.
  [free, suivre l'erreur]  x² + y² + z² + 8x − 6y + 2z + 1 = 0
    = (x + 4)² − 16 + (y − 3)² − 9 + (z + 1)² − 1 + 1 = 0   ← Compléter un carré par variable
    = (x + 4)² + (y − 3)² + (z + 1)² = 25   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-4 ; 3 ; -1)
  — Le rayon r ?  [juge value]  départ : r
    = 5   ← r² = 25
  — La section par le plan 2x+y+2z+4 = 0. La distance δ du centre au plan ?  [juge value]  départ : δ
    = 1   ← δ = |n⃗·C + d|/‖n⃗‖
  — δ = 1 < r = 5 : la section est un cercle. Son rayon ρ ?  [juge value]  départ : ρ
    = √(5² − 1²)   ← ρ² = r² − δ²
    = 2√6
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 4)² − □ + … | (x + 4)² + (y − 3)² + (z + 1)² = 25
  pièges : g4_square_constant

On donne x^2+y^2+z^2+4x+6y+6z+18 = 0. Donne son centre et son rayon.
  [free, suivre l'erreur]  x² + y² + z² + 4x + 6y + 6z + 18 = 0
    = (x + 2)² − 4 + (y + 3)² − 9 + (z + 3)² − 9 + 18 = 0   ← Compléter un carré par variable
    = (x + 2)² + (y + 3)² + (z + 3)² = 4   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-2 ; -3 ; -3)
  — Le rayon r ?  [juge value]  départ : r
    = 2   ← r² = 4
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 2)² − □ + … | (x + 2)² + (y + 3)² + (z + 3)² = 4
  pièges : g4_square_constant

On donne x^2+y^2+z^2+4x-4y+10z+8 = 0. Donne son centre, son rayon, puis le plan tangent en T(−2 ; −1 ; −1).
  [free, suivre l'erreur]  x² + y² + z² + 4x − 4y + 10z + 8 = 0
    = (x + 2)² − 4 + (y − 2)² − 4 + (z + 5)² − 25 + 8 = 0   ← Compléter un carré par variable
    = (x + 2)² + (y − 2)² + (z + 5)² = 25   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-2 ; 2 ; -5)
  — Le rayon r ?  [juge value]  départ : r
    = 5   ← r² = 25
  — Le plan tangent en T(−2 ; −1 ; −1) : sa normale est CT⃗.  [juge vector]  départ : n
    = n = CT = (0 ; -3 ; 4)   ← Le rayon CT est perpendiculaire au plan tangent
  — Une équation du plan tangent ?  [juge geom]  départ : π
    = 3y − 4z − 1 = 0   ← Par T, de normale (0 ; 3 ; −4)
  aides : Complète un carré par variable, comme pour un cercle : (x − h)² − h². | (x + 2)² − □ + … | (x + 2)² + (y − 2)² + (z + 5)² = 25
  pièges : g4_square_constant

```

### Niveau 5

```
On donne x^2+y^2+z^2-10x-8y+8z+48 = 0. Donne son centre et son rayon, le plan tangent en T(3 ; 3 ; −2), puis la section par le plan 6x+3y-2z-43 = 0.
  [free, sans aide]  x² + y² + z² − 10x − 8y + 8z + 48 = 0
    = (x − 5)² − 25 + (y − 4)² − 16 + (z + 4)² − 16 + 48 = 0   ← Compléter un carré par variable
    = (x − 5)² + (y − 4)² + (z + 4)² = 9   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (5 ; 4 ; -4)
  — Le rayon r ?  [juge value]  départ : r
    = 3   ← r² = 9
  — Le plan tangent en T(3 ; 3 ; −2) : sa normale est CT⃗.  [juge vector]  départ : n
    = n = CT = (-2 ; -1 ; 2)   ← Le rayon CT est perpendiculaire au plan tangent
  — Une équation du plan tangent ?  [juge geom]  départ : π
    = 2x + y − 2z − 13 = 0   ← Par T, de normale (2 ; 1 ; −2)
  — La section par le plan 6x+3y-2z-43 = 0. La distance δ du centre au plan ?  [juge value]  départ : δ
    = 1   ← δ = |n⃗·C + d|/‖n⃗‖
  — δ = 1 < r = 3 : la section est un cercle. Son rayon ρ ?  [juge value]  départ : ρ
    = √(3² − 1²)   ← ρ² = r² − δ²
    = 2√2
  pièges : g4_square_constant

On donne x^2+y^2+z^2+8x+4y-2z+12 = 0. Donne son centre et son rayon, le plan tangent en T(−2 ; −4 ; 0), puis la section par le plan x+2y-2z+7 = 0.
  [free, sans aide]  x² + y² + z² + 8x + 4y − 2z + 12 = 0
    = (x + 4)² − 16 + (y + 2)² − 4 + (z − 1)² − 1 + 12 = 0   ← Compléter un carré par variable
    = (x + 4)² + (y + 2)² + (z − 1)² = 9   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-4 ; -2 ; 1)
  — Le rayon r ?  [juge value]  départ : r
    = 3   ← r² = 9
  — Le plan tangent en T(−2 ; −4 ; 0) : sa normale est CT⃗.  [juge vector]  départ : n
    = n = CT = (2 ; -2 ; -1)   ← Le rayon CT est perpendiculaire au plan tangent
  — Une équation du plan tangent ?  [juge geom]  départ : π
    = 2x − 2y − z − 4 = 0   ← Par T, de normale (2 ; −2 ; −1)
  — La section par le plan x+2y-2z+7 = 0. La distance δ du centre au plan ?  [juge value]  départ : δ
    = 1   ← δ = |n⃗·C + d|/‖n⃗‖
  — δ = 1 < r = 3 : la section est un cercle. Son rayon ρ ?  [juge value]  départ : ρ
    = √(3² − 1²)   ← ρ² = r² − δ²
    = 2√2
  pièges : g4_square_constant

On donne 3x^2+3y^2+3z^2+12x-24y+18z-21 = 0. Donne son centre et son rayon, le plan tangent en T(−6 ; 0 ; −1), puis la section par le plan 4y+3z+13 = 0.
  [free, sans aide]  3x² + 3y² + 3z² + 12x − 24y + 18z − 21 = 0
    = x² + y² + z² + 4x − 8y + 6z − 7 = 0   ← Diviser par 3
    = (x + 2)² − 4 + (y − 4)² − 16 + (z + 3)² − 9 − 7 = 0   ← Compléter un carré par variable
    = (x + 2)² + (y − 4)² + (z + 3)² = 36   ← Forme réduite
  — Le centre C ?  [juge vector]  départ : C
    = (-2 ; 4 ; -3)
  — Le rayon r ?  [juge value]  départ : r
    = 6   ← r² = 36
  — Le plan tangent en T(−6 ; 0 ; −1) : sa normale est CT⃗.  [juge vector]  départ : n
    = n = CT = (-4 ; -4 ; 2)   ← Le rayon CT est perpendiculaire au plan tangent
  — Une équation du plan tangent ?  [juge geom]  départ : π
    = 2x + 2y − z + 11 = 0   ← Par T, de normale (2 ; 2 ; −1)
  — La section par le plan 4y+3z+13 = 0. La distance δ du centre au plan ?  [juge value]  départ : δ
    = 4   ← δ = |n⃗·C + d|/‖n⃗‖
  — δ = 4 < r = 6 : la section est un cercle. Son rayon ρ ?  [juge value]  départ : ρ
    = √(6² − 4²)   ← ρ² = r² − δ²
    = 2√5
  pièges : g4_square_constant

```

### Variantes d'examen

```
Quels sont le centre et le rayon de la sphère 3x^2+3y^2+3z^2+24x+24y+24z+36 = 0 ?
  · C(−4 ; −4 ; −4), r = 2√21 [g4_square_constant]   · C(4 ; 4 ; 4), r = 6   ✔ C(−4 ; −4 ; −4), r = 6   · C(−12 ; −12 ; −12), r = 6√11 [g4_not_normalized]
  [examen mcq]
  pièges : g4_square_constant, g4_not_normalized

Vrai ou faux ?
  « Le plan tangent en un point T d'une sphère de centre C est perpendiculaire à la droite (CT). » → VRAI
  [examen tf]

On donne x^2+y^2+z^2+6x+6y+6z-22 = 0. Donne son centre et son rayon, le plan tangent en T(−6 ; −1 ; −9), puis la section par le plan 2x-3y+6z+8 = 0.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1 ; Le centre C ? : 1 ; Le rayon r ? : 0,5 ; Le plan tangent en T(−6 ; −1 ; −9) : sa normale est CT⃗. : 0,5 ; Une équation du plan tangent ? : 0,5 ; La section par le plan 2x-3y+6z+8 = 0. La distance δ du centre au plan ? : 0,5 ; δ = 1 < r = 7 : la section est un cercle. Son rayon ρ ? : 1)
    [free, sans aide, suivre l'erreur, examen open]  x² + y² + z² + 6x + 6y + 6z − 22 = 0
      = (x + 3)² − 9 + (y + 3)² − 9 + (z + 3)² − 9 − 22 = 0   ← Compléter un carré par variable
      = (x + 3)² + (y + 3)² + (z + 3)² = 49   ← Forme réduite
    — Le centre C ?  [juge vector]  départ : C
      = (-3 ; -3 ; -3)
    — Le rayon r ?  [juge value]  départ : r
      = 7   ← r² = 49
    — Le plan tangent en T(−6 ; −1 ; −9) : sa normale est CT⃗.  [juge vector]  départ : n
      = n = CT = (-3 ; 2 ; -6)   ← Le rayon CT est perpendiculaire au plan tangent
    — Une équation du plan tangent ?  [juge geom]  départ : π
      = 3x − 2y + 6z + 70 = 0   ← Par T, de normale (3 ; −2 ; 6)
    — La section par le plan 2x-3y+6z+8 = 0. La distance δ du centre au plan ?  [juge value]  départ : δ
      = 1   ← δ = |n⃗·C + d|/‖n⃗‖
    — δ = 1 < r = 7 : la section est un cercle. Son rayon ρ ?  [juge value]  départ : ρ
      = √(7² − 1²)   ← ρ² = r² − δ²
      = 4√3
  pièges : g4_square_constant

```

## Pièges de cette unité

- **Vecteur pris à l'envers** (`g4_vector_reversed`, E) : AB⃗ = A − B au lieu de B − A
- **Milieu pris pour la moitié du vecteur** (`g4_midpoint_half`, E) : M = (B − A)/2 au lieu de (A + B)/2
- **Division par ‖v‖ au lieu de ‖v‖²** (`g4_proj_no_square`, E) : (u·v/‖v‖)·v au lieu de (u·v/‖v‖²)·v
- **Vecteur normal pris pour directeur** (`g4_normal_as_direction`, E) : 2x − 3y − 8 = 0 a la direction (2 ; −3) au lieu de (3 ; 2)
- **Constante de la droite (ou du plan) fausse** (`g4_line_constant`, E) : 2x − 3y = 8 écrit 2x − 3y + 8 = 0 au lieu de 2x − 3y − 8 = 0
- **Angle obtus donné pour deux droites** (`g4_angle_obtuse`, E) : angle de deux droites 2π/3 au lieu de π/3
- **Bissectrices sans diviser par les normes** (`g4_bisector_unnormalized`, E) : |a₁x + b₁y + c₁| = |a₂x + b₂y + c₂| sans les normes au lieu de divisé par ‖n₁‖ et ‖n₂‖
- **Une seule des deux bissectrices** (`g4_bisector_one_sign`, E) : une seule bissectrice au lieu de les deux
- **Une seule équation pour une droite de l'espace** (`g4_line3_one_equation`, E) : (x − 1)/2 = (y + 2)/1 seul au lieu de deux équations
- **Normale prise dans le plan** (`g4_normal_sum`, E) : n⃗ = AB⃗ + AC⃗ au lieu de solution de n⃗·AB⃗ = n⃗·AC⃗ = 0
- **Droites gauches prises pour sécantes** (`g4_skew_as_secant`, E) : non parallèles ⇒ sécantes au lieu de gauches
- **Même paramètre pour deux droites** (`g4_param_same_letter`, E) : A + t·u⃗ = B + t·v⃗ au lieu de A + s·u⃗ = B + t·v⃗
- **Constante du carré oubliée** (`g4_square_constant`, E) : x² − 4x = (x − 2)² au lieu de (x − 2)² − 4
- **Centre lu sans diviser par le coefficient de x²** (`g4_not_normalized`, E) : 3x² + 3y² + 42x − 6y + 75 = 0 : Ω = (−21 ; 3) au lieu de (−7 ; 1)
- **Signe de la 2e composante du produit vectoriel** (`g4_cross_middle_sign`, E) : (2 ; −7 ; 1) au lieu de (2 ; 7 ; 1)
- **Produit vectoriel pris comme commutatif** (`g4_cross_commute`, E) : v⃗ ∧ u⃗ = u⃗ ∧ v⃗ au lieu de −u⃗ ∧ v⃗
- **Volume du tétraèdre sans le facteur 1/6** (`g4_tetra_factor`, E) : V = 24 au lieu de 24/6 = 4
- **Distance sans diviser par ‖n⃗‖** (`g4_dist_no_norm`, E) : d = 9 au lieu de 9/3
- **Distance prise entre deux points quelconques** (`g4_skew_any_points`, E) : d = ‖AB⃗‖ au lieu de |AB⃗·n⃗|/‖n⃗‖
- **Une seule condition d'orthogonalité** (`g4_common_perp_one_condition`, E) : PQ⃗ ⟂ u⃗ seulement au lieu de PQ⃗ ⟂ u⃗ et v⃗
