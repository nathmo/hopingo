# Exemples de questions — Cercles et coniques

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Cercle : centre, rayon, cercle par trois points (`g10-circle-eq`, CMS)

_Compléter les carrés ; le centre est sur les médiatrices._

### Niveau 1

```
Trouve le centre Ω et le rayon r du cercle γ : x² + y² − 2x + 2y − 34 = 0.
  [guided]  x² + y² − 2x + 2y − 34 = 0
    = (x − 1)² − □ + (y + 1)² − □ − 34 = 0   (trous : (x − 1)² − 1 + (y + 1)² − 1 − 34 = 0)   ← Compléter les carrés
    = (x − 1)² + (y + 1)² = □   (trous : (x − 1)² + (y + 1)² = 36)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (1 ; -1))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    = □   (trous : 6)   ← r = √36
  aides : Complète un carré en x et un en y : x² − 2hx = (x − h)² − h². | (x − 1)² − □ + (y + 1)² − 1 − 34 = 0 | (x − 1)² + (y + 1)² = 36
  pièges : g4_square_constant

Trouve le centre Ω et le rayon r du cercle γ : x² + y² − 4x + 8y + 4 = 0.
  [guided]  x² + y² − 4x + 8y + 4 = 0
    = (x − 2)² − □ + (y + 4)² − □ + 4 = 0   (trous : (x − 2)² − 4 + (y + 4)² − 16 + 4 = 0)   ← Compléter les carrés
    = (x − 2)² + (y + 4)² = □   (trous : (x − 2)² + (y + 4)² = 16)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (2 ; -4))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    = □   (trous : 4)   ← r = √16
  aides : Complète un carré en x et un en y : x² − 2hx = (x − h)² − h². | (x − 2)² − □ + (y + 4)² − 16 + 4 = 0 | (x − 2)² + (y + 4)² = 16
  pièges : g4_square_constant

Trouve le centre Ω et le rayon r du cercle γ : x² + y² + 6x − 4y − 36 = 0.
  [guided]  x² + y² + 6x − 4y − 36 = 0
    = (x + 3)² − □ + (y − 2)² − □ − 36 = 0   (trous : (x + 3)² − 9 + (y − 2)² − 4 − 36 = 0)   ← Compléter les carrés
    = (x + 3)² + (y − 2)² = □   (trous : (x + 3)² + (y − 2)² = 49)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (-3 ; 2))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    = □   (trous : 7)   ← r = √49
  aides : Complète un carré en x et un en y : x² − 2hx = (x − h)² − h². | (x + 3)² − □ + (y − 2)² − 4 − 36 = 0 | (x + 3)² + (y − 2)² = 49
  pièges : g4_square_constant

```

### Niveau 2

```
Trouve le centre Ω et le rayon r du cercle γ : 5x² + 5y² + 30y − 200 = 0.
  [guided]  5x² + 5y² + 30y − 200 = 0
    ? Par quoi commencer ? ✔ Diviser toute l'équation par 5 / · Lire tout de suite Ω = (−D/2 ; −E/2)
    = x² + y² + 6y − 40 = 0   ← Diviser par 5
    = x² + (y + 3)² − □ − 40 = 0   (trous : x² + (y + 3)² − 9 − 40 = 0)   ← Compléter les carrés
    = x² + (y + 3)² = □   (trous : x² + (y + 3)² = 49)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (0 ; -3))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    ? r² = 49 : l'ensemble est… ✔ un cercle / · un seul point, Ω / · vide
    = □   (trous : 7)   ← r = √49
  aides : Divise par 5, puis complète un carré en x et un en y. | x² + (y + 3)² − 9 − 40 = 0 | x² + (y + 3)² = 49
  pièges : g4_square_constant, g4_not_normalized

Trouve le centre Ω et le rayon r du cercle γ : 5x² + 5y² + 30x + 40y + 45 = 0.
  [guided]  5x² + 5y² + 30x + 40y + 45 = 0
    ? Par quoi commencer ? ✔ Diviser toute l'équation par 5 / · Lire tout de suite Ω = (−D/2 ; −E/2)
    = x² + y² + 6x + 8y + 9 = 0   ← Diviser par 5
    = (x + 3)² − □ + (y + 4)² − □ + 9 = 0   (trous : (x + 3)² − 9 + (y + 4)² − 16 + 9 = 0)   ← Compléter les carrés
    = (x + 3)² + (y + 4)² = □   (trous : (x + 3)² + (y + 4)² = 16)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (-3 ; -4))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    ? r² = 16 : l'ensemble est… ✔ un cercle / · un seul point, Ω / · vide
    = □   (trous : 4)   ← r = √16
  aides : Divise par 5, puis complète un carré en x et un en y. | (x + 3)² − □ + (y + 4)² − 16 + 9 = 0 | (x + 3)² + (y + 4)² = 16
  pièges : g4_square_constant, g4_not_normalized

Trouve le centre Ω et le rayon r du cercle γ : 5x² + 5y² − 10x + 60y + 105 = 0.
  [guided]  5x² + 5y² − 10x + 60y + 105 = 0
    ? Par quoi commencer ? ✔ Diviser toute l'équation par 5 / · Lire tout de suite Ω = (−D/2 ; −E/2)
    = x² + y² − 2x + 12y + 21 = 0   ← Diviser par 5
    = (x − 1)² − □ + (y + 6)² − □ + 21 = 0   (trous : (x − 1)² − 1 + (y + 6)² − 36 + 21 = 0)   ← Compléter les carrés
    = (x − 1)² + (y + 6)² = □   (trous : (x − 1)² + (y + 6)² = 16)   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (1 ; -6))   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    ? r² = 16 : l'ensemble est… ✔ un cercle / · un seul point, Ω / · vide
    = □   (trous : 4)   ← r = √16
  aides : Divise par 5, puis complète un carré en x et un en y. | (x − 1)² − □ + (y + 6)² − 36 + 21 = 0 | (x − 1)² + (y + 6)² = 16
  pièges : g4_square_constant, g4_not_normalized

```

### Niveau 3

```
Mets γ : x² + y² + 12x + 6y + 44 = 0 sous forme réduite, puis donne son centre et son rayon (ou dis pourquoi ce n'est pas un cercle).
  [tap, suivre l'erreur, menu menu]  x² + y² + 12x + 6y + 44 = 0
    = (x + 6)² − 36 + (y + 3)² − 9 + 44 = 0   ← Compléter les carrés
    = (x + 6)² + (y + 3)² = 1   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω = (-6 ; -3)   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    ? r² = 1 : l'ensemble est… ✔ un cercle / · un seul point, Ω / · vide
    = 1   ← r = √1
  aides : Complète un carré en x et un en y : x² − 2hx = (x − h)² − h². | (x + 6)² − □ + (y + 3)² − 9 + 44 = 0 | (x + 6)² + (y + 3)² = 1
  pièges : g4_square_constant

Trouve l'équation du cercle qui passe par A(−3 ; −8), B(−5 ; −4) et C(−4 ; −7).
  [tap, suivre l'erreur, menu menu]  m
    (Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].)
    = (−2)(x + 4) + 4(y + 6) = 0   ← AB⃗ = (−2 ; 4), milieu I = (−4 ; −6)
    = x − 2y − 8 = 0   ← Forme cartésienne
  — Et sur la médiatrice de [AC].  [juge geom]  départ : m
    = (−1)(x + 7/2) + 1(y + 15/2) = 0   ← AC⃗ = (−1 ; 1), milieu I = (−7/2 ; −15/2)
    = x − y − 4 = 0   ← Forme cartésienne
  — Le centre est l'intersection des deux médiatrices.  [juge vector]  départ : Ω
    = Ω = (0 ; -4)   ← Résoudre le système des deux médiatrices
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (−3 − 0)² + (−8 − (−4))²   ← r² = (x_A − h)² + (y_A − k)²
    = 25
  — L'équation du cercle.  [juge geom]  départ : γ
    = x² + (y + 4)² = 25   ← (x − h)² + (y − k)² = r²
  aides : Le centre est à égale distance des trois points : il est sur les médiatrices de [AB] et de [AC]. | Médiatrice de [AB] : (−2 ; 4)·(M − I) = 0, I = □ | x² + (y + 4)² = 25
  pièges : g4_line_constant

Mets γ : x² + y² − 6x − 10y + 18 = 0 sous forme réduite, puis donne son centre et son rayon (ou dis pourquoi ce n'est pas un cercle).
  [tap, suivre l'erreur, menu menu]  x² + y² − 6x − 10y + 18 = 0
    = (x − 3)² − 9 + (y − 5)² − 25 + 18 = 0   ← Compléter les carrés
    = (x − 3)² + (y − 5)² = 16   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω = (3 ; 5)   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    ? r² = 16 : l'ensemble est… ✔ un cercle / · un seul point, Ω / · vide
    = 4   ← r = √16
  aides : Complète un carré en x et un en y : x² − 2hx = (x − h)² − h². | (x − 3)² − □ + (y − 5)² − 25 + 18 = 0 | (x − 3)² + (y − 5)² = 16
  pièges : g4_square_constant

```

### Niveau 4

```
Mets γ : 3x² + 3y² + 36x − 12y + 45 = 0 sous forme réduite, puis donne son centre et son rayon (ou dis pourquoi ce n'est pas un cercle).
  [free, suivre l'erreur]  3x² + 3y² + 36x − 12y + 45 = 0
    = x² + y² + 12x − 4y + 15 = 0   ← Diviser par 3
    = (x + 6)² − 36 + (y − 2)² − 4 + 15 = 0   ← Compléter les carrés
    = (x + 6)² + (y − 2)² = 25   ← Forme réduite
  — Le centre ?  [juge vector]  départ : Ω
    = Ω = (-6 ; 2)   ← (x − h)² + (y − k)² = r² : Ω = (h ; k)
  — Le rayon ?  [juge value]  départ : r
    = 5   ← r = √25
  aides : Divise par 3, puis complète un carré en x et un en y. | (x + 6)² − □ + (y − 2)² − 4 + 15 = 0 | (x + 6)² + (y − 2)² = 25
  pièges : g4_square_constant, g4_not_normalized

Trouve l'équation du cercle de diamètre [AB], avec A(0 ; 1) et B(8 ; −7).
  [free, suivre l'erreur]  Ω
    = Ω = (A + B)/2   ← Le centre est le milieu du diamètre
    = Ω = (4 ; -3)
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (0 − 4)² + (1 − (−3))²   ← r² = (x_A − h)² + (y_A − k)²
    = 32
  — L'équation du cercle.  [juge geom]  départ : γ
    = (x − 4)² + (y + 3)² = 32
  aides : Le centre est le milieu de [AB], le rayon la moitié de AB. | Ω = (A + B)/2, r² = ΩA² = □ | (x − 4)² + (y + 3)² = 32

Trouve l'équation du cercle de diamètre [AB], avec A(1 ; 5) et B(−1 ; 7).
  [free, suivre l'erreur]  Ω
    = Ω = (A + B)/2   ← Le centre est le milieu du diamètre
    = Ω = (0 ; 6)
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (1 − 0)² + (5 − 6)²   ← r² = (x_A − h)² + (y_A − k)²
    = 2
  — L'équation du cercle.  [juge geom]  départ : γ
    = x² + (y − 6)² = 2
  aides : Le centre est le milieu de [AB], le rayon la moitié de AB. | Ω = (A + B)/2, r² = ΩA² = □ | x² + (y − 6)² = 2

```

### Niveau 5

```
Trouve l'équation du cercle qui passe par A(−6 ; 1), B(−5 ; 4) et C(4 ; 1).
  [free, sans aide]  m
    (Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].)
    = 1(x + 11/2) + 3(y − 5/2) = 0   ← AB⃗ = (1 ; 3), milieu I = (−11/2 ; 5/2)
    = x + 3y − 2 = 0   ← Forme cartésienne
  — Et sur la médiatrice de [AC].  [juge geom]  départ : m
    = x + 1 = 0   ← AC⃗ = (10 ; 0), milieu I = (−1 ; 1)
  — Le centre est l'intersection des deux médiatrices.  [juge vector]  départ : Ω
    = Ω = (-1 ; 1)   ← Résoudre le système des deux médiatrices
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (−6 − (−1))² + (1 − 1)²   ← r² = (x_A − h)² + (y_A − k)²
    = 25
  — L'équation du cercle.  [juge geom]  départ : γ
    = (x + 1)² + (y − 1)² = 25   ← (x − h)² + (y − k)² = r²
  pièges : g4_line_constant

Trouve l'équation du cercle qui passe par A(8 ; −10), B(10 ; −8) et C(12 ; −2).
  [free, sans aide]  m
    (Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].)
    = 2(x − 9) + 2(y + 9) = 0   ← AB⃗ = (2 ; 2), milieu I = (9 ; −9)
    = x + y = 0   ← Forme cartésienne
  — Et sur la médiatrice de [AC].  [juge geom]  départ : m
    = 4(x − 10) + 8(y + 6) = 0   ← AC⃗ = (4 ; 8), milieu I = (10 ; −6)
    = x + 2y + 2 = 0   ← Forme cartésienne
  — Le centre est l'intersection des deux médiatrices.  [juge vector]  départ : Ω
    = Ω = (2 ; -2)   ← Résoudre le système des deux médiatrices
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (8 − 2)² + (−10 − (−2))²   ← r² = (x_A − h)² + (y_A − k)²
    = 100
  — L'équation du cercle.  [juge geom]  départ : γ
    = (x − 2)² + (y + 2)² = 100   ← (x − h)² + (y − k)² = r²

Trouve l'équation du cercle qui passe par A(−6 ; −3), B(−3 ; −4) et C(0 ; −3).
  [free, sans aide]  m
    (Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].)
    = 3(x + 9/2) + (−1)(y + 7/2) = 0   ← AB⃗ = (3 ; −1), milieu I = (−9/2 ; −7/2)
    = 3x − y + 10 = 0   ← Forme cartésienne
  — Et sur la médiatrice de [AC].  [juge geom]  départ : m
    = x + 3 = 0   ← AC⃗ = (6 ; 0), milieu I = (−3 ; −3)
  — Le centre est l'intersection des deux médiatrices.  [juge vector]  départ : Ω
    = Ω = (-3 ; 1)   ← Résoudre le système des deux médiatrices
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (−6 − (−3))² + (−3 − 1)²   ← r² = (x_A − h)² + (y_A − k)²
    = 25
  — L'équation du cercle.  [juge geom]  départ : γ
    = (x + 3)² + (y − 1)² = 25   ← (x − h)² + (y − k)² = r²
  pièges : g4_line_constant

```

### Variantes d'examen

```
Quels sont le centre Ω et le carré du rayon r² du cercle 2x² + 2y² − 8x − 20y − 40 = 0 ?
  · Ω = (−2 ; −5), r² = 49   ✔ Ω = (2 ; 5), r² = 49   · Ω = (4 ; 10), r² = 156 [g4_not_normalized]   · Ω = (2 ; 5), r² = 20 [g4_square_constant]
  [examen mcq]
  pièges : g4_not_normalized, g4_square_constant

Vrai ou faux ?
  « x² + y² − 6x + 6y + 22 = 0 est l'équation d'un cercle. » → FAUX
    contre-exemple (geo) : r2 = -4
  [examen tf]
  pièges : g4_square_constant

Trouve l'équation du cercle qui passe par A(−6 ; −4), B(3 ; −1) et C(2 ; −4).
  [free, sans aide, examen open]  m
    (Le centre est à égale distance de A et de B : il est sur la médiatrice de [AB].)
    = 9(x + 3/2) + 3(y + 5/2) = 0   ← AB⃗ = (9 ; 3), milieu I = (−3/2 ; −5/2)
    = 3x + y + 7 = 0   ← Forme cartésienne
  — Et sur la médiatrice de [AC].  [juge geom]  départ : m
    = x + 2 = 0   ← AC⃗ = (8 ; 0), milieu I = (−2 ; −4)
  — Le centre est l'intersection des deux médiatrices.  [juge vector]  départ : Ω
    = Ω = (-2 ; -1)   ← Résoudre le système des deux médiatrices
  — Le rayon : r² = ΩA².  [juge value]  départ : r²
    = (−6 − (−2))² + (−4 − (−1))²   ← r² = (x_A − h)² + (y_A − k)²
    = 25
  — L'équation du cercle.  [juge geom]  départ : γ
    = (x + 2)² + (y + 1)² = 25   ← (x − h)² + (y − k)² = r²
  pièges : g4_line_constant

```

## Tangentes à un cercle (`g10-circle-tangent`, CMS)

_En un point, ou depuis un point extérieur (sans oublier la verticale)._

### Niveau 1

```
Écris l'équation de la tangente au cercle γ : (x − 2)² + (y + 1)² = 25 au point T(−2 ; −4).
  [guided]  t
    = (□)(x − 2) + (□)(y + 1) = 25   (trous : (−4)(x − 2) + (−3)(y + 1) = 25)   ← Dédoubler : ΩT⃗ = (−4 ; −3)
    = 4x + 3y + 20 = 0   ← Développer
  aides : En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗. | (−4)(x − 2) + □(y + 1) = 25 | 4x + 3y + 20 = 0
  pièges : g4_line_constant, g10_tangent_radius_direction

Écris l'équation de la tangente au cercle γ : (x + 2)² + y² = 100 au point T(6 ; 6).
  [guided]  t
    = □(x + 2) + □(y − 0) = 100   (trous : 8(x + 2) + 6(y − 0) = 100)   ← Dédoubler : ΩT⃗ = (8 ; 6)
    = 4x + 3y − 42 = 0   ← Développer
  aides : En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗. | 8(x + 2) + □(y) = 100 | 4x + 3y − 42 = 0
  pièges : g4_line_constant, g10_tangent_radius_direction

Écris l'équation de la tangente au cercle γ : (x − 1)² + (y + 3)² = 25 au point T(−2 ; 1).
  [guided]  t
    = (□)(x − 1) + □(y + 3) = 25   (trous : (−3)(x − 1) + 4(y + 3) = 25)   ← Dédoubler : ΩT⃗ = (−3 ; 4)
    = 3x − 4y + 10 = 0   ← Développer
  aides : En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗. | (−3)(x − 1) + □(y + 3) = 25 | 3x − 4y + 10 = 0
  pièges : g4_line_constant, g10_tangent_radius_direction

```

### Niveau 2

```
Trouve les tangentes au cercle γ : (x + 2)² + (y + 3)² = 25 issues du point Q(3 ; 2).
  [guided]  ΩQ²
    = (3 − (−2))² + (2 − (−3))²   ← Position de Q : ΩQ²
    = □   (trous : 50)   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y − 2 = m(x − 3). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |−5m + 5|/√(m² + 1) = 5
    (La droite verticale x = 3 est à la distance |3 − (−2)| = 5 du centre : c'est une tangente.)
    = (−5m + 5)² = □(m² + 1)   (trous : (−5m + 5)² = 25(m² + 1))   ← Élever au carré
    = −50m = 0   ← Développer
    = m = □   (trous : m = 0)   ← Une seule pente : l'autre tangente est verticale
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = x = 3 ou y − 2 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |−5m + 5| = 5·√(□) | x = 3 ou y − 2 = 0

Trouve les tangentes au cercle γ : (x − 4)² + (y − 3)² = 25 issues du point Q(−11 ; −2).
  [guided]  ΩQ²
    = (−11 − 4)² + (−2 − 3)²   ← Position de Q : ΩQ²
    = □   (trous : 250)   ← 250 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y + 2 = m(x + 11). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |15m − 5|/√(m² + 1) = 5
    (La droite verticale x = −11 est à la distance |−11 − 4| = 15 du centre : ce n'est pas une tangente.)
    = (15m − 5)² = □(m² + 1)   (trous : (15m − 5)² = 25(m² + 1))   ← Élever au carré
    = 200m² − 150m = 0   ← Développer
    = m = □ ou m = □   (trous : m = 0 ou m = 3/4)   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 3x − 4y + 25 = 0 ou y + 2 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |15m − 5| = 5·√(□) | 3x − 4y + 25 = 0 ou y + 2 = 0

Trouve les tangentes au cercle γ : (x + 3)² + (y − 1)² = 25 issues du point Q(−4 ; 8).
  [guided]  ΩQ²
    = (−4 − (−3))² + (8 − 1)²   ← Position de Q : ΩQ²
    = □   (trous : 50)   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y − 8 = m(x + 4). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |m + 7|/√(m² + 1) = 5
    (La droite verticale x = −4 est à la distance |−4 − (−3)| = 1 du centre : ce n'est pas une tangente.)
    = (m + 7)² = □(m² + 1)   (trous : (m + 7)² = 25(m² + 1))   ← Élever au carré
    = −24m² + 14m + 24 = 0   ← Développer
    = m = □ ou m = □   (trous : m = −3/4 ou m = 4/3)   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 4x − 3y + 40 = 0 ou 3x + 4y − 20 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |m + 7| = 5·√(□) | 4x − 3y + 40 = 0 ou 3x + 4y − 20 = 0

```

### Niveau 3

```
Écris l'équation de la tangente au cercle γ : (x − 1)² + (y − 5)² = 25 au point T(−3 ; 8).
  [tap, suivre l'erreur, menu menu]  t
    ? Quelle méthode ? ✔ En T : dédoubler l'équation du cercle / · Depuis Q : distance au centre = r / · Depuis Q : discriminant nul de l'intersection
    = (−4)(x − 1) + 3(y − 5) = 25   ← Dédoubler : ΩT⃗ = (−4 ; 3)
    = 4x − 3y + 36 = 0   ← Développer
  aides : En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗. | (−4)(x − 1) + □(y − 5) = 25 | 4x − 3y + 36 = 0
  pièges : g4_line_constant, g10_tangent_radius_direction

Trouve les tangentes au cercle γ : (x − 1)² + (y − 3)² = 25 issues du point Q(−6 ; 2).
  [tap, suivre l'erreur, menu menu]  ΩQ²
    ? Quelle méthode ? · En T : dédoubler l'équation du cercle / ✔ Depuis Q : distance au centre = r / ✔ Depuis Q : discriminant nul de l'intersection
    = (−6 − 1)² + (2 − 3)²   ← Position de Q : ΩQ²
    = 50   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y − 2 = m(x + 6). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |7m − 1|/√(m² + 1) = 5
    ? La droite verticale x = −6 est-elle tangente ? Sa distance au centre vaut |−6 − 1| = 7. · Oui : 7 = r / ✔ Non : 7 ≠ r
    = (7m − 1)² = 25(m² + 1)   ← Élever au carré
    = 24m² − 14m − 24 = 0   ← Développer
    = m = −3/4 ou m = 4/3   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 4x − 3y + 30 = 0 ou 3x + 4y + 10 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |7m − 1| = 5·√(□) | 4x − 3y + 30 = 0 ou 3x + 4y + 10 = 0

Écris l'équation de la tangente au cercle γ : (x + 1)² + (y − 4)² = 100 au point T(−7 ; 12).
  [tap, suivre l'erreur, menu menu]  t
    ? Quelle méthode ? ✔ En T : dédoubler l'équation du cercle / · Depuis Q : distance au centre = r / · Depuis Q : discriminant nul de l'intersection
    = (−6)(x + 1) + 8(y − 4) = 100   ← Dédoubler : ΩT⃗ = (−6 ; 8)
    = 3x − 4y + 69 = 0   ← Développer
  aides : En T, dédouble : (x_T − h)(x − h) + (y_T − k)(y − k) = r². La tangente est perpendiculaire au rayon ΩT⃗. | (−6)(x + 1) + □(y − 4) = 100 | 3x − 4y + 69 = 0
  pièges : g4_line_constant, g10_tangent_radius_direction

```

### Niveau 4

```
Trouve les tangentes au cercle γ : (x − 4)² + (y + 4)² = 4 parallèles à la droite x = 0.
  [free, suivre l'erreur]  |c + 4| = 2
    (Les droites parallèles : x + c = 0. Leur distance au centre vaut r.)
    = c = −6 ou c = −2   ← Deux cas : ± dans la valeur absolue
  — Les deux tangentes.  [juge geom]  départ : T
    = x − 6 = 0 ou x − 2 = 0
  aides : Une parallèle s'écrit ax + by + c = 0 avec les mêmes a et b ; elle est tangente si sa distance au centre vaut r. | |c + 4| = □ | x − 6 = 0 ou x − 2 = 0
  pièges : g1_abs_dropped, g1_abs_one_case

Trouve les tangentes au cercle γ : (x − 3)² + y² = 25 issues du point Q(−2 ; −5).
  [free, suivre l'erreur]  ΩQ²
    = (−2 − 3)² + (−5 − 0)²   ← Position de Q : ΩQ²
    = 50   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y + 5 = m(x + 2). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |5m − 5|/√(m² + 1) = 5
    ? La droite verticale x = −2 est-elle tangente ? Sa distance au centre vaut |−2 − 3| = 5. ✔ Oui : 5 = r / · Non : 5 ≠ r
    = (5m − 5)² = 25(m² + 1)   ← Élever au carré
    = −50m = 0   ← Développer
    = m = 0   ← Une seule pente : l'autre tangente est verticale
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = x = −2 ou y + 5 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |5m − 5| = 5·√(□) | x = −2 ou y + 5 = 0
  pièges : g10_vertical_tangent_lost

Trouve les tangentes au cercle γ : (x + 4)² + (y + 2)² = 25 issues du point Q(1 ; −12).
  [free, suivre l'erreur]  ΩQ²
    = (1 − (−4))² + (−12 − (−2))²   ← Position de Q : ΩQ²
    = 125   ← 125 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y + 12 = m(x − 1). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |−5m − 10|/√(m² + 1) = 5
    ? La droite verticale x = 1 est-elle tangente ? Sa distance au centre vaut |1 − (−4)| = 5. ✔ Oui : 5 = r / · Non : 5 ≠ r
    = (−5m − 10)² = 25(m² + 1)   ← Élever au carré
    = 100m + 75 = 0   ← Développer
    = m = −3/4   ← Une seule pente : l'autre tangente est verticale
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = x = 1 ou 3x + 4y + 45 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne
  aides : Une tangente est à la distance r du centre. Pense à la droite verticale x = x_Q. | |−5m − 10| = 5·√(□) | x = 1 ou 3x + 4y + 45 = 0
  pièges : g10_vertical_tangent_lost

```

### Niveau 5

```
Trouve les tangentes au cercle γ : (x + 1)² + (y + 2)² = 25 issues du point Q(0 ; −9).
  [free, sans aide]  ΩQ²
    = (0 − (−1))² + (−9 − (−2))²   ← Position de Q : ΩQ²
    = 50   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y + 9 = m(x). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |−m − 7|/√(m² + 1) = 5
    ? La droite verticale x = 0 est-elle tangente ? Sa distance au centre vaut |0 − (−1)| = 1. · Oui : 1 = r / ✔ Non : 1 ≠ r
    = (−m − 7)² = 25(m² + 1)   ← Élever au carré
    = −24m² + 14m + 24 = 0   ← Développer
    = m = −3/4 ou m = 4/3   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 4x − 3y − 27 = 0 ou 3x + 4y + 36 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne

Trouve les tangentes au cercle γ : (x − 2)² + (y − 3)² = 16 parallèles à la droite 5x + 12y = 0.
  [free, sans aide]  |c + 46|/13 = 4
    (Les droites parallèles : 5x + 12y + c = 0. Leur distance au centre vaut r.)
    = |c + 46| = 52   ← Multiplier par ‖n⃗‖ = 13
    = c = −98 ou c = 6   ← Deux cas : ± dans la valeur absolue
  — Les deux tangentes.  [juge geom]  départ : T
    = 5x + 12y − 98 = 0 ou 5x + 12y + 6 = 0
  pièges : g1_abs_dropped

Trouve les tangentes au cercle γ : (x + 1)² + (y + 2)² = 25 issues du point Q(−8 ; −3).
  [free, sans aide]  ΩQ²
    = (−8 − (−1))² + (−3 − (−2))²   ← Position de Q : ΩQ²
    = 50   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y + 3 = m(x + 8). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |7m − 1|/√(m² + 1) = 5
    ? La droite verticale x = −8 est-elle tangente ? Sa distance au centre vaut |−8 − (−1)| = 7. · Oui : 7 = r / ✔ Non : 7 ≠ r
    = (7m − 1)² = 25(m² + 1)   ← Élever au carré
    = 24m² − 14m − 24 = 0   ← Développer
    = m = −3/4 ou m = 4/3   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 4x − 3y + 23 = 0 ou 3x + 4y + 36 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne

```

### Variantes d'examen

```
Quelles sont les tangentes au cercle x² + (y − 3)² = 25 issues du point Q(−5 ; −12) ?
  · 4x − 3y − 16 = 0 seulement [g10_vertical_tangent_lost]   ✔ 4x − 3y − 16 = 0 et x = −5   · 4x − 3y − 16 = 0 et y = −12   · 3x + 4y − 12 = 0 et x = −5 [g10_tangent_radius_direction]
  [examen mcq]
  pièges : g10_vertical_tangent_lost, g10_tangent_radius_direction

Vrai ou faux ?
  « Pour tout point Q extérieur au cercle γ : x² + (y − 2)² = 16, on trouve deux pentes m telles que la droite y − y_Q = m(x − x_Q) soit tangente à γ. » → FAUX
    contre-exemple (geo) : Q = (4 ; 9)
  [examen tf]
  pièges : g10_vertical_tangent_lost

Trouve les tangentes au cercle γ : (x − 1)² + (y − 3)² = 25 issues du point Q(8 ; 2).
  [free, sans aide, examen open]  ΩQ²
    = (8 − 1)² + (2 − 3)²   ← Position de Q : ΩQ²
    = 50   ← 50 > 25 = r² : Q est extérieur
  — Les droites non verticales par Q : y − 2 = m(x − 8). Elles sont tangentes si leur distance au centre vaut r = 5.  [juge solset]  départ : |−7m − 1|/√(m² + 1) = 5
    = (−7m − 1)² = 25(m² + 1)   ← Élever au carré
    = 24m² + 14m − 24 = 0   ← Développer
    = m = −4/3 ou m = 3/4   ← Deux pentes
  — Les tangentes issues de Q.  [juge geom]  départ : T
    = 3x − 4y − 16 = 0 ou 4x + 3y − 38 = 0   ← y − y_Q = m(x − x_Q), mis sous forme cartésienne

```

## Puissance d'un point, axe radical, cercles orthogonaux (`g10-power-radical`, CMS)

_γ(P) = ΩP² − r², γ₁ − γ₂ = 0, Ω₁Ω₂² = r₁² + r₂²._

### Niveau 1

```
Trouve l'axe radical des cercles γ₁ : x² + y² + 12x − 6y + 9 = 0 et γ₂ : x² + y² + 4x + 8y − 16 = 0.
  [guided]  Δ
    = (x² + y² + 12x − 6y + 9) − (x² + y² + 4x + 8y − 16) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □x − 14y + 25 = 0   (trous : 8x − 14y + 25 = 0)   ← Réduire
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² + 12x − 6y + 9) − (□) = 0 | 8x − 14y + 25 = 0
  pièges : g4_line_constant

Trouve l'axe radical des cercles γ₁ : x² + y² + 10y + 24 = 0 et γ₂ : x² + y² − 8x + 2y − 32 = 0.
  [guided]  Δ
    = (x² + y² + 10y + 24) − (x² + y² − 8x + 2y − 32) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □(x + y + 7) = 0   (trous : 8(x + y + 7) = 0)   ← Réduire : 8x + 8y + 56 = 0
    = x + y + 7 = 0   ← Réduire, puis diviser par 8
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² + 10y + 24) − (□) = 0 | x + y + 7 = 0
  pièges : g4_line_constant

Trouve l'axe radical des cercles γ₁ : x² + y² − 8x − 33 = 0 et γ₂ : x² + y² + 8x + 10y + 25 = 0.
  [guided]  Δ
    = (x² + y² − 8x − 33) − (x² + y² + 8x + 10y + 25) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □(8x + 5y + 29) = 0   (trous : −2(8x + 5y + 29) = 0)   ← Réduire : −16x − 10y − 58 = 0
    = 8x + 5y + 29 = 0   ← Réduire, puis diviser par −2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² − 8x − 33) − (□) = 0 | 8x + 5y + 29 = 0
  pièges : g4_line_constant

```

### Niveau 2

```
Trouve l'axe radical des cercles γ₁ : x² + y² − 4x + 8y − 16 = 0 et γ₂ : 3x² + 3y² + 18x + 30y + 27 = 0.
  [guided]  Δ
    ? Les deux équations sont-elles normalisées (1 devant x² et y²) ? · Oui : on peut soustraire / ✔ Non : diviser γ₂ par 3, puis soustraire
    = (x² + y² − 4x + 8y − 16) − (x² + y² + 6x + 10y + 9) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □x − 2y − 25 = 0   (trous : −10x − 2y − 25 = 0)   ← Réduire
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² − 4x + 8y − 16) − (□) = 0 | 10x + 2y + 25 = 0
  pièges : g4_line_constant, g10_radical_unnormalized

Trouve l'axe radical des cercles γ₁ : x² + y² − 2x + 8y − 32 = 0 et γ₂ : 3x² + 3y² − 18y + 24 = 0.
  [guided]  Δ
    ? Les deux équations sont-elles normalisées (1 devant x² et y²) ? · Oui : on peut soustraire / ✔ Non : diviser γ₂ par 3, puis soustraire
    = (x² + y² − 2x + 8y − 32) − (x² + y² − 6y + 8) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □(x − 7y + 20) = 0   (trous : −2(x − 7y + 20) = 0)   ← Réduire : −2x + 14y − 40 = 0
    = x − 7y + 20 = 0   ← Réduire, puis diviser par −2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² − 2x + 8y − 32) − (□) = 0 | x − 7y + 20 = 0
  pièges : g4_line_constant, g10_radical_unnormalized

Trouve l'axe radical des cercles γ₁ : x² + y² − 2x + 6y + 9 = 0 et γ₂ : 2x² + 2y² + 8x − 12y − 46 = 0.
  [guided]  Δ
    ? Les deux équations sont-elles normalisées (1 devant x² et y²) ? · Oui : on peut soustraire / ✔ Non : diviser γ₂ par 2, puis soustraire
    = (x² + y² − 2x + 6y + 9) − (x² + y² + 4x − 6y − 23) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = □(3x − 6y − 16) = 0   (trous : −2(3x − 6y − 16) = 0)   ← Réduire : −6x + 12y + 32 = 0
    = 3x − 6y − 16 = 0   ← Réduire, puis diviser par −2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² − 2x + 6y + 9) − (□) = 0 | 3x − 6y − 16 = 0
  pièges : g4_line_constant, g10_radical_unnormalized

```

### Niveau 3

```
Les cercles γ₁ : (x + 3)² + (y − 1)² = 1 et γ₂ : x² + y² − 9 = 0 sont-ils orthogonaux ?
  [tap, suivre l'erreur, menu menu]  Ω_2
    (Le centre de γ₂.)
    = Ω_2 = (0 ; 0)   ← Compléter les carrés
  — Le carré de son rayon.  [juge value]  départ : r_2²
    = 9   ← (x − 0)² + (y − 0)² = 9
  — Avec Ω₁ = (−3 ; 1) et r₁² = 1 : orthogonaux ?  [juge value]  départ : Ω_1Ω_2² − (r_1² + r_2²)
    ? Deux cercles sont orthogonaux si… ✔ Ω₁Ω₂² = r₁² + r₂² (les rayons aux points communs sont perpendiculaires) / · Ω₁Ω₂ = r₁ + r₂
    = (0 − (−3))² + (0 − 1)² − (1 + 9)   ← Ω₁Ω₂² − (r₁² + r₂²)
    = 0   ← Nul : les cercles sont orthogonaux
  aides : Deux cercles sont orthogonaux si Ω₁Ω₂² = r₁² + r₂². | Ω₁Ω₂² = (0 − (−3))² + (□)² | Ω₁Ω₂² = 10, r₁² + r₂² = 10 : orthogonaux
  pièges : g10_orthogonal_sum

Trouve l'axe radical des cercles γ₁ : x² + y² + 10x − 12y + 57 = 0 et γ₂ : x² + y² − 4x − 21 = 0.
  [tap, suivre l'erreur, menu menu]  Δ
    ? Les deux équations sont-elles normalisées (1 devant x² et y²) ? ✔ Oui : on peut soustraire / · Non
    = (x² + y² + 10x − 12y + 57) − (x² + y² − 4x − 21) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = 2(7x − 6y + 39) = 0   ← Réduire : 14x − 12y + 78 = 0
    = 7x − 6y + 39 = 0   ← Réduire, puis diviser par 2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² + 10x − 12y + 57) − (□) = 0 | 7x − 6y + 39 = 0
  pièges : g4_line_constant

Les cercles γ₁ : (x + 1)² + (y + 3)² = 9 et γ₂ : x² + y² + 4x + 6y − 3 = 0 sont-ils orthogonaux ?
  [tap, suivre l'erreur, menu menu]  Ω_2
    (Le centre de γ₂.)
    = Ω_2 = (-2 ; -3)   ← Compléter les carrés
  — Le carré de son rayon.  [juge value]  départ : r_2²
    = 16   ← (x + 2)² + (y + 3)² = 16
  — Avec Ω₁ = (−1 ; −3) et r₁² = 9 : orthogonaux ?  [juge value]  départ : Ω_1Ω_2² − (r_1² + r_2²)
    ? Deux cercles sont orthogonaux si… ✔ Ω₁Ω₂² = r₁² + r₂² (les rayons aux points communs sont perpendiculaires) / · Ω₁Ω₂ = r₁ + r₂
    = (−2 − (−1))² + (−3 − (−3))² − (9 + 16)   ← Ω₁Ω₂² − (r₁² + r₂²)
    = −24   ← Non nul : les cercles ne sont pas orthogonaux
  aides : Deux cercles sont orthogonaux si Ω₁Ω₂² = r₁² + r₂². | Ω₁Ω₂² = (−2 − (−1))² + (□)² | Ω₁Ω₂² = 1, r₁² + r₂² = 25 : pas orthogonaux
  pièges : g10_orthogonal_sum

```

### Niveau 4

```
Trouve l'axe radical des cercles γ₁ : x² + y² + 12y − 13 = 0 et γ₂ : 2x² + 2y² + 8x + 4y + 2 = 0.
  [free, suivre l'erreur]  Δ
    = (x² + y² + 12y − 13) − (x² + y² + 4x + 2y + 1) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = −2(2x − 5y + 7) = 0   ← Réduire : −4x + 10y − 14 = 0
    = 2x − 5y + 7 = 0   ← Réduire, puis diviser par −2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² + 12y − 13) − (□) = 0 | 2x − 5y + 7 = 0
  pièges : g4_line_constant, g10_radical_unnormalized

Trouve l'axe radical des cercles γ₁ : x² + y² − 4x + 12y − 9 = 0 et γ₂ : x² + y² − 6x − 4y − 23 = 0.
  [free, suivre l'erreur]  Δ
    = (x² + y² − 4x + 12y − 9) − (x² + y² − 6x − 4y − 23) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = 2(x + 8y + 7) = 0   ← Réduire : 2x + 16y + 14 = 0
    = x + 8y + 7 = 0   ← Réduire, puis diviser par 2
  aides : Normalise les deux équations, puis soustrais-les : les carrés disparaissent, il reste une droite. | (x² + y² − 4x + 12y − 9) − (□) = 0 | x + 8y + 7 = 0
  pièges : g4_line_constant

Calcule la puissance du point P(0 ; −1) par rapport au cercle γ : x² + y² − 2x − 15 = 0. P est-il à l'intérieur ou à l'extérieur ?
  [free, suivre l'erreur]  γ(P)
    ? Que dit le signe de la puissance ? ✔ γ(P) = ΩP² − r² : négatif à l'intérieur, nul sur le cercle, positif à l'extérieur / · γ(P) est la distance de P au cercle
    = 0² + (−1)² + (−2)·0 + (0)·(−1) + (−15)   ← Remplacer x et y par les coordonnées de P
    = −14   ← Négatif : P est à l'intérieur
  aides : La puissance de P est la valeur de l'équation normalisée en P : γ(P) = ΩP² − r². | γ(P) = 0² + (−1)² + □ | −14

```

### Niveau 5

```
Trouve le cercle γ orthogonal aux cercles γ₁ : x² + y² + 12x − 13 = 0 et γ₂ : x² + y² − 8x − 6y − 11 = 0, dont le centre est sur la droite d : x − 1 = 0.
  [free, sans aide]  Δ
    (Le centre Ω a la même puissance par rapport aux deux cercles (r²) : il est sur leur axe radical.)
    = (x² + y² + 12x − 13) − (x² + y² − 8x − 6y − 11) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = 2(10x + 3y − 1) = 0   ← Réduire : 20x + 6y − 2 = 0
    = 10x + 3y − 1 = 0   ← Réduire, puis diviser par 2
  — Ω est aussi sur d : x − 1 = 0.  [juge vector]  départ : Ω
    = Ω = (1 ; -3)   ← Intersection de l'axe radical et de d
  — r² est la puissance de Ω par rapport à γ₁.  [juge value]  départ : r²
    = 1² + (−3)² + (12)·1 + (0)·(−3) + (−13)   ← γ₁(Ω)
    = 9
  — Le cercle cherché.  [juge geom]  départ : γ
    = (x − 1)² + (y + 3)² = 9
  pièges : g4_line_constant

Trouve le cercle γ orthogonal aux cercles γ₁ : x² + y² − 12x + 4y + 31 = 0 et γ₂ : x² + y² + 4x + 8y − 5 = 0, dont le centre est sur la droite d : x − y − 1 = 0.
  [free, sans aide]  Δ
    (Le centre Ω a la même puissance par rapport aux deux cercles (r²) : il est sur leur axe radical.)
    = (x² + y² − 12x + 4y + 31) − (x² + y² + 4x + 8y − 5) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = −4(4x + y − 9) = 0   ← Réduire : −16x − 4y + 36 = 0
    = 4x + y − 9 = 0   ← Réduire, puis diviser par −4
  — Ω est aussi sur d : x − y − 1 = 0.  [juge vector]  départ : Ω
    = Ω = (2 ; 1)   ← Intersection de l'axe radical et de d
  — r² est la puissance de Ω par rapport à γ₁.  [juge value]  départ : r²
    = 2² + 1² + (−12)·2 + (4)·1 + (31)   ← γ₁(Ω)
    = 16
  — Le cercle cherché.  [juge geom]  départ : γ
    = (x − 2)² + (y − 1)² = 16
  pièges : g4_line_constant

Trouve le cercle γ orthogonal aux cercles γ₁ : x² + y² − 4x − 6y + 9 = 0 et γ₂ : x² + y² − 8x + 16y + 31 = 0, dont le centre est sur la droite d : y + 1 = 0.
  [free, sans aide]  Δ
    (Le centre Ω a la même puissance par rapport aux deux cercles (r²) : il est sur leur axe radical.)
    = (x² + y² − 4x − 6y + 9) − (x² + y² − 8x + 16y + 31) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = 2(2x − 11y − 11) = 0   ← Réduire : 4x − 22y − 22 = 0
    = 2x − 11y − 11 = 0   ← Réduire, puis diviser par 2
  — Ω est aussi sur d : y + 1 = 0.  [juge vector]  départ : Ω
    = Ω = (0 ; -1)   ← Intersection de l'axe radical et de d
  — r² est la puissance de Ω par rapport à γ₁.  [juge value]  départ : r²
    = 0² + (−1)² + (−4)·0 + (−6)·(−1) + (9)   ← γ₁(Ω)
    = 16
  — Le cercle cherché.  [juge geom]  départ : γ
    = x² + (y + 1)² = 16
  pièges : g4_line_constant

```

### Variantes d'examen

```
Quel est l'axe radical des cercles γ₁ : x² + y² + 10x − 10y + 49 = 0 et γ₂ : 3x² + 3y² + 36x + 105 = 0 ?
  · −2x² − 2y² − 26x − 10y − 56 = 0 [g10_radical_unnormalized]   · 5x − y − 7 = 0   ✔ x + 5y − 7 = 0   · 5x − y + 30 = 0
  [examen mcq]
  pièges : g10_radical_unnormalized

Vrai ou faux ?
  « L'axe radical de deux cercles de centres distincts est toujours la droite qui passe par leurs deux points communs. » → FAUX
    contre-exemple (geo) : O1 = (-1 ; -2), r1 = 1, O2 = (4 ; -2), r2 = 2
  [examen tf]

Trouve le cercle γ orthogonal aux cercles γ₁ : x² + y² − 8x − 4y + 16 = 0 et γ₂ : x² + y² − 14x − 4y + 28 = 0, dont le centre est sur la droite d : x − y − 1 = 0.
  [free, sans aide, examen open]  Δ
    (Le centre Ω a la même puissance par rapport aux deux cercles (r²) : il est sur leur axe radical.)
    = (x² + y² − 8x − 4y + 16) − (x² + y² − 14x − 4y + 28) = 0   ← γ₁ − γ₂ = 0 : les carrés disparaissent
    = 6(x − 2) = 0   ← Réduire : 6x − 12 = 0
    = x − 2 = 0   ← Réduire, puis diviser par 6
  — Ω est aussi sur d : x − y − 1 = 0.  [juge vector]  départ : Ω
    = Ω = (2 ; 1)   ← Intersection de l'axe radical et de d
  — r² est la puissance de Ω par rapport à γ₁.  [juge value]  départ : r²
    = 2² + 1² + (−8)·2 + (−4)·1 + (16)   ← γ₁(Ω)
    = 1
  — Le cercle cherché.  [juge geom]  départ : γ
    = (x − 2)² + (y − 1)² = 1
  pièges : g4_line_constant

```

## Pôle et polaire par rapport à un cercle (`g10-pole-polar`, CMS)

_Dédoubler l'équation ; les points de contact des tangentes._

### Niveau 1

```
Écris l'équation de la polaire du point P(0 ; 0) par rapport au cercle γ : (x + 1)² + (y − 1)² = 1.
  [guided]  p
    = □(x + 1) + (□)(y − 1) = 1   (trous : 1(x + 1) + (−1)(y − 1) = 1)   ← Dédoubler : x₀ − h = 1, y₀ − k = −1
    = x − y + 1 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | 1(x + 1) + (□)(y − 1) = 1 | x − y + 1 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

Écris l'équation de la polaire du point P(−7 ; 2) par rapport au cercle γ : (x + 3)² + (y − 2)² = 8.
  [guided]  p
    = (□)(x + 3) = 8   (trous : (−4)(x + 3) = 8)   ← Dédoubler : x₀ − h = −4, y₀ − k = 0
    = x + 5 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | (−4)(x + 3) = 8 | x + 5 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

Écris l'équation de la polaire du point P(1 ; 3) par rapport au cercle γ : (x + 2)² + (y − 4)² = 5.
  [guided]  p
    = □(x + 2) + (□)(y − 4) = 5   (trous : 3(x + 2) + (−1)(y − 4) = 5)   ← Dédoubler : x₀ − h = 3, y₀ − k = −1
    = 3x − y + 5 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | 3(x + 2) + (□)(y − 4) = 5 | 3x − y + 5 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

```

### Niveau 2

```
Trouve le pôle P de la droite x − 3y + 1 = 0 par rapport au cercle γ : (x − 1)² + (y + 1)² = 5.
  [guided]  P
    ? On cherche… ✔ le pôle d'une droite : identifier / · la polaire d'un point : dédoubler
    = P=(1;-1)+□×(1;-3)   (trous : P = (1 ; -1) + (-1)·(1 ; -3))   ← La polaire de P est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² : P − Ω est proportionnel à (1 ; −3), et la constante donne le coefficient
    = P = (0 ; 2)
  aides : Écris la polaire d'un point P(x₀ ; y₀) quelconque et identifie ses coefficients avec ceux de la droite. | P = (1 ; −1) + □·(1 ; −3) | P = (0 ; 2)

Trouve le pôle P de la droite x + y − 11 = 0 par rapport au cercle γ : (x − 4)² + (y − 2)² = 25.
  [guided]  P
    ? On cherche… ✔ le pôle d'une droite : identifier / · la polaire d'un point : dédoubler
    = P=(4;2)+□×(1;1)   (trous : P = (4 ; 2) + 5·(1 ; 1))   ← La polaire de P est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² : P − Ω est proportionnel à (1 ; 1), et la constante donne le coefficient
    = P = (9 ; 7)
  aides : Écris la polaire d'un point P(x₀ ; y₀) quelconque et identifie ses coefficients avec ceux de la droite. | P = (4 ; 2) + □·(1 ; 1) | P = (9 ; 7)

Écris l'équation de la polaire du point P(5 ; 4) par rapport au cercle γ : x² + (y − 4)² = 5.
  [guided]  p
    ? On cherche… ✔ la polaire d'un point : dédoubler / · le pôle d'une droite : identifier
    = □(x − 0) = 5   (trous : 5(x − 0) = 5)   ← Dédoubler : x₀ − h = 5, y₀ − k = 0
    = x − 1 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | 5(x) = 5 | x − 1 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

```

### Niveau 3

```
Écris l'équation de la polaire du point P(−7 ; 9) par rapport au cercle γ : (x + 2)² + (y − 4)² = 5.
  [tap, suivre l'erreur, menu menu]  p
    = (−5)(x + 2) + 5(y − 4) = 5   ← Dédoubler : x₀ − h = −5, y₀ − k = 5
    = x − y + 7 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | (−5)(x + 2) + (□)(y − 4) = 5 | x − y + 7 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x + 4)² + (y − 1)² = 25 issues du point P(1 ; 6).
  [tap, suivre l'erreur, menu menu]  p
    (La polaire de P passe par les deux points de contact.)
    = 5(x + 4) + 5(y − 1) = 25   ← Dédoubler : x₀ − h = 5, y₀ − k = 5
    = x + y − 2 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x + 4)² + (−x + 1)² = 25
    = x² + 3x − 4 = 0   ← Développer
    = x = −4 ou x = 1   ← Résoudre
  — Le premier point de contact (x = −4).  [juge vector]  départ : T_1
    = T_1 = (-4 ; 6)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (1 ; 1)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = y − 6 = 0 ou x − 1 = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  aides : La polaire de P coupe le cercle aux points de contact des tangentes issues de P. | Polaire : 5(x + 4) + (□)(y − 1) = 25 | y − 6 = 0 ou x − 1 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x + 2)² + (y − 4)² = 10 issues du point P(3 ; 9).
  [tap, suivre l'erreur, menu menu]  p
    (La polaire de P passe par les deux points de contact.)
    = 5(x + 2) + 5(y − 4) = 10   ← Dédoubler : x₀ − h = 5, y₀ − k = 5
    = x + y − 4 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x + 2)² + (−x)² = 10
    = x² + 2x − 3 = 0   ← Développer
    = x = −3 ou x = 1   ← Résoudre
  — Le premier point de contact (x = −3).  [juge vector]  départ : T_1
    = T_1 = (-3 ; 7)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (1 ; 3)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = x − 3y + 24 = 0 ou 3x − y = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  aides : La polaire de P coupe le cercle aux points de contact des tangentes issues de P. | Polaire : 5(x + 2) + (□)(y − 4) = 10 | x − 3y + 24 = 0 ou 3x − y = 0
  pièges : g4_line_constant, g10_polar_origin_formula

```

### Niveau 4

```
Écris l'équation de la polaire du point P(3 ; 1) par rapport au cercle γ : (x + 2)² + y² = 13.
  [free, suivre l'erreur]  p
    = 5(x + 2) + 1(y − 0) = 13   ← Dédoubler : x₀ − h = 5, y₀ − k = 1
    = 5x + y − 3 = 0   ← Développer
  aides : Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. | 5(x + 2) + (□)(y) = 13 | 5x + y − 3 = 0
  pièges : g4_line_constant, g10_polar_origin_formula

Trouve le pôle P de la droite x − y + 10 = 0 par rapport au cercle γ : (x + 2)² + (y − 4)² = 16.
  [free, suivre l'erreur]  P
    = P = (-2 ; 4) + (-4)·(1 ; -1)   ← La polaire de P est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² : P − Ω est proportionnel à (1 ; −1), et la constante donne le coefficient
    = P = (-6 ; 8)
  aides : Écris la polaire d'un point P(x₀ ; y₀) quelconque et identifie ses coefficients avec ceux de la droite. | P = (−2 ; 4) + □·(1 ; −1) | P = (−6 ; 8)

Trouve le pôle P de la droite x + y + 3 = 0 par rapport au cercle γ : x² + (y + 1)² = 4.
  [free, suivre l'erreur]  P
    = P = (0 ; -1) + (-2)·(1 ; 1)   ← La polaire de P est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² : P − Ω est proportionnel à (1 ; 1), et la constante donne le coefficient
    = P = (-2 ; -3)
  aides : Écris la polaire d'un point P(x₀ ; y₀) quelconque et identifie ses coefficients avec ceux de la droite. | P = (0 ; −1) + □·(1 ; 1) | P = (−2 ; −3)

```

### Niveau 5

```
Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x + 3)² + (y − 1)² = 13 issues du point P(−4 ; 6).
  [free, sans aide]  p
    (La polaire de P passe par les deux points de contact.)
    = (−1)(x + 3) + 5(y − 1) = 13   ← Dédoubler : x₀ − h = −1, y₀ − k = 5
    = x − 5y + 21 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x + 3)² + ((x + 16)/5)² = 13
    = x² + 7x + 6 = 0   ← Développer
    = x = −6 ou x = −1   ← Résoudre
  — Le premier point de contact (x = −6).  [juge vector]  départ : T_1
    = T_1 = (-6 ; 3)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (-1 ; 4)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = 3x − 2y + 24 = 0 ou 2x + 3y − 10 = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  pièges : g4_line_constant, g10_polar_origin_formula

Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x − 1)² + y² = 13 issues du point P(6 ; −1).
  [free, sans aide]  p
    (La polaire de P passe par les deux points de contact.)
    = 5(x − 1) + (−1)(y − 0) = 13   ← Dédoubler : x₀ − h = 5, y₀ − k = −1
    = 5x − y − 18 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x − 1)² + (5x − 18)² = 13
    = x² − 7x + 12 = 0   ← Développer
    = x = 3 ou x = 4   ← Résoudre
  — Le premier point de contact (x = 3).  [juge vector]  départ : T_1
    = T_1 = (3 ; -3)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (4 ; 2)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = 2x − 3y − 15 = 0 ou 3x + 2y − 16 = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  pièges : g4_line_constant, g10_polar_origin_formula

Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x − 1)² + (y − 3)² = 17 issues du point P(6 ; 0).
  [free, sans aide]  p
    (La polaire de P passe par les deux points de contact.)
    = 5(x − 1) + (−3)(y − 3) = 17   ← Dédoubler : x₀ − h = 5, y₀ − k = −3
    = 5x − 3y − 13 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x − 1)² + ((5x − 22)/3)² = 17
    = x² − 7x + 10 = 0   ← Développer
    = x = 2 ou x = 5   ← Résoudre
  — Le premier point de contact (x = 2).  [juge vector]  départ : T_1
    = T_1 = (2 ; -1)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (5 ; 4)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = x − 4y − 6 = 0 ou 4x + y − 24 = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  pièges : g4_line_constant, g10_polar_origin_formula

```

### Variantes d'examen

```
Quelle est la polaire du point P(0 ; 5) par rapport au cercle (x − 1)² + y² = 13 ?
  ✔ x − 5y + 12 = 0   · x − 5y + 13 = 0   · 5y − 13 = 0 [g10_polar_origin_formula]   · 5x + y − 5 = 0
  [examen mcq]
  pièges : g10_polar_origin_formula

Vrai ou faux ?
  « La polaire de tout point P ≠ Ω par rapport au cercle γ : (x + 1)² + (y + 2)² = 4 coupe ce cercle. » → FAUX
    contre-exemple (geo) : P = (0 ; -2)
  [examen tf]

Par la polaire, trouve les points de contact et les tangentes au cercle γ : (x + 1)² + (y + 2)² = 17 issues du point P(2 ; −7).
  [free, sans aide, examen open]  p
    (La polaire de P passe par les deux points de contact.)
    = 3(x + 1) + (−5)(y + 2) = 17   ← Dédoubler : x₀ − h = 3, y₀ − k = −5
    = 3x − 5y − 24 = 0   ← Développer
  — On remplace y de la polaire dans l'équation du cercle.  [juge solset]  départ : (x + 1)² + ((3x − 14)/5)² = 17
    = x² − x − 6 = 0   ← Développer
    = x = −2 ou x = 3   ← Résoudre
  — Le premier point de contact (x = −2).  [juge vector]  départ : T_1
    = T_1 = (-2 ; -6)   ← y se lit sur la polaire
  — Le second.  [juge vector]  départ : T_2
    = T_2 = (3 ; -3)
  — Les tangentes issues de P sont les droites (PT₁) et (PT₂).  [juge geom]  départ : t
    = x + 4y + 26 = 0 ou 4x − y − 15 = 0   ← En Tᵢ : (x_T − h)(x − h) + (y_T − k)(y − k) = r²
  pièges : g4_line_constant, g10_polar_origin_formula

```

## Ellipse : axes, foyers, excentricité, directrices (`g10-ellipse`, CMS)

_Forme réduite, c² = a² − b², e = c/a._

### Niveau 1

```
L'ellipse E a pour forme réduite (x + 2)²/9 + (y + 5)²/4 = 1. Donne son centre, a et b, ses foyers, son excentricité et ses directrices.
  [guided]  (x + 2)²/9 + (y + 5)²/4 = 1
    = Ω=(-2;-5);a=□;b=□   (trous : Ω = (-2 ; -5) ; a = 3 ; b = 2)   ← Grand axe horizontal : a² = 9 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = √5)   ← c² = a² − b² = 5
    = F = (-2 + √5 ; -5) ; F' = (-2 - √5 ; -5)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = √5/3)   ← e = c/a
    = directrices÷x = −2 + 9√5/5 ou x = −2 − 9√5/5   ← À a²/c = 9√5/5 du centre, perpendiculaires au grand axe
  aides : Le grand axe est du côté du plus grand dénominateur ; c² = a² − b² ; e = c/a. | c² = a² − b² = □ | F = (−2 + √5 ; −5) et F′ = (−2 − √5 ; −5)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

L'ellipse E a pour forme réduite (x − 2)²/9 + (y + 3)²/25 = 1. Donne son centre, a et b, ses foyers, son excentricité et ses directrices.
  [guided]  (x − 2)²/9 + (y + 3)²/25 = 1
    = Ω=(2;-3);a=□;b=□   (trous : Ω = (2 ; -3) ; a = 5 ; b = 3)   ← Grand axe vertical : a² = 25 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = 4)   ← c² = a² − b² = 16
    = F = (2 ; 1) ; F' = (2 ; -7)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = 4/5)   ← e = c/a
    = directrices÷y = 13/4 ou y = −37/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  aides : Le grand axe est du côté du plus grand dénominateur ; c² = a² − b² ; e = c/a. | c² = a² − b² = □ | F = (2 ; 1) et F′ = (2 ; −7)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

L'ellipse E a pour forme réduite (x + 2)² + (y − 1)²/4 = 1. Donne son centre, a et b, ses foyers, son excentricité et ses directrices.
  [guided]  (x + 2)² + (y − 1)²/4 = 1
    = Ω=(-2;1);a=□;b=□   (trous : Ω = (-2 ; 1) ; a = 2 ; b = 1)   ← Grand axe vertical : a² = 4 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = √3)   ← c² = a² − b² = 3
    = F = (-2 ; 1 + √3) ; F' = (-2 ; 1 - √3)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = √3/2)   ← e = c/a
    = directrices÷y = 1 + 4√3/3 ou y = 1 − 4√3/3   ← À a²/c = 4√3/3 du centre, perpendiculaires au grand axe
  aides : Le grand axe est du côté du plus grand dénominateur ; c² = a² − b² ; e = c/a. | c² = a² − b² = □ | F = (−2 ; 1 + √3) et F′ = (−2 ; 1 − √3)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Niveau 2

```
Pour l'ellipse E : 25x² + 9y² + 150x + 36y + 36 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [guided]  25x² + 9y² + 150x + 36y + 36 = 0
    = 25(x + 3)² − □ + 9(y + 2)² − □ + 36 = 0   (trous : 25(x + 3)² − 225 + 9(y + 2)² − 36 + 36 = 0)   ← Compléter les carrés
    = (x + 3)²/□ + (y + 2)²/□ = 1   (trous : (x + 3)²/9 + (y + 2)²/25 = 1)   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    ? Le grand axe est… · horizontal / ✔ vertical
    = Ω=(-3;-2);a=□;b=□   (trous : Ω = (-3 ; -2) ; a = 5 ; b = 3)   ← Grand axe vertical : a² = 25 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = 4)   ← c² = a² − b² = 16
    = F = (-3 ; 2) ; F' = (-3 ; -6)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = 4/5)   ← e = c/a
    = directrices÷y = 17/4 ou y = −33/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  aides : Mets 25 en facteur dans les x, 9 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (−3 ; 2) et F′ = (−3 ; −6)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 9x² + 25y² + 200y + 175 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [guided]  9x² + 25y² + 200y + 175 = 0
    = 9x² + 25(y + 4)² − □ + 175 = 0   (trous : 9x² + 25(y + 4)² − 400 + 175 = 0)   ← Compléter les carrés
    = x²/□ + (y + 4)²/□ = 1   (trous : x²/25 + (y + 4)²/9 = 1)   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    ? Le grand axe est… ✔ horizontal / · vertical
    = Ω=(0;-4);a=□;b=□   (trous : Ω = (0 ; -4) ; a = 5 ; b = 3)   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = 4)   ← c² = a² − b² = 16
    = F = (4 ; -4) ; F' = (-4 ; -4)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = 4/5)   ← e = c/a
    = directrices÷x = 25/4 ou x = −25/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  aides : Mets 9 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (4 ; −4) et F′ = (−4 ; −4)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 9x² + 25y² − 90x + 50y + 25 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [guided]  9x² + 25y² − 90x + 50y + 25 = 0
    = 9(x − 5)² − □ + 25(y + 1)² − □ + 25 = 0   (trous : 9(x − 5)² − 225 + 25(y + 1)² − 25 + 25 = 0)   ← Compléter les carrés
    = (x − 5)²/□ + (y + 1)²/□ = 1   (trous : (x − 5)²/25 + (y + 1)²/9 = 1)   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    ? Le grand axe est… ✔ horizontal / · vertical
    = Ω=(5;-1);a=□;b=□   (trous : Ω = (5 ; -1) ; a = 5 ; b = 3)   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = □   (trous : c = 4)   ← c² = a² − b² = 16
    = F = (9 ; -1) ; F' = (1 ; -1)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = □   (trous : e = 4/5)   ← e = c/a
    = directrices÷x = 45/4 ou x = −5/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  aides : Mets 9 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (9 ; −1) et F′ = (1 ; −1)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Niveau 3

```
Pour l'ellipse E : 16x² + 25y² − 32x + 200y + 16 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [tap, suivre l'erreur, menu menu]  16x² + 25y² − 32x + 200y + 16 = 0
    = 16(x − 1)² − 16 + 25(y + 4)² − 400 + 16 = 0   ← Compléter les carrés
    = (x − 1)²/25 + (y + 4)²/16 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (1 ; -4) ; a = 5 ; b = 4   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 3   ← c² = a² − b² = 9
    = F = (4 ; -4) ; F' = (-2 ; -4)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 3/5   ← e = c/a
    = directrices÷x = 28/3 ou x = −22/3   ← À a²/c = 25/3 du centre, perpendiculaires au grand axe
  aides : Mets 16 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (4 ; −4) et F′ = (−2 ; −4)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 16x² + 25y² − 50y − 375 = 0, trouve la forme réduite, le centre, a et b, les foyers et l'excentricité.
  [tap, suivre l'erreur, menu menu]  16x² + 25y² − 50y − 375 = 0
    = 16x² + 25(y − 1)² − 25 − 375 = 0   ← Compléter les carrés
    = x²/25 + (y − 1)²/16 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (0 ; 1) ; a = 5 ; b = 4   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 3   ← c² = a² − b² = 9
    = F = (3 ; 1) ; F' = (-3 ; 1)   ← Sur le grand axe, à c du centre
    = e = 3/5   ← e = c/a
  aides : Mets 16 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (3 ; 1) et F′ = (−3 ; 1)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 9x² + 25y² − 72x − 200y + 319 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [tap, suivre l'erreur, menu menu]  9x² + 25y² − 72x − 200y + 319 = 0
    = 9(x − 4)² − 144 + 25(y − 4)² − 400 + 319 = 0   ← Compléter les carrés
    = (x − 4)²/25 + (y − 4)²/9 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (4 ; 4) ; a = 5 ; b = 3   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 4   ← c² = a² − b² = 16
    = F = (8 ; 4) ; F' = (0 ; 4)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 4/5   ← e = c/a
    = directrices÷x = 41/4 ou x = −9/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  aides : Mets 9 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (8 ; 4) et F′ = (0 ; 4)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Niveau 4

```
Pour l'ellipse E : 16x² + y² − 64x + 48 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [free, suivre l'erreur]  16x² + y² − 64x + 48 = 0
    = 16(x − 2)² − 64 + y² + 48 = 0   ← Compléter les carrés
    = (x − 2)² + y²/16 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (2 ; 0) ; a = 4 ; b = 1   ← Grand axe vertical : a² = 16 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = √15   ← c² = a² − b² = 15
    = F = (2 ; √15) ; F' = (2 ; -√15)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = √15/4   ← e = c/a
    = directrices÷y = 16√15/15 ou y = −16√15/15   ← À a²/c = 16√15/15 du centre, perpendiculaires au grand axe
  aides : Mets 16 en facteur dans les x, 1 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (2 ; √15) et F′ = (2 ; −√15)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Esquisse l'ellipse E : (x − 4)²/25 + (y − 4)²/16 = 1. Place son centre Ω, les sommets du grand axe et les foyers.
  [repère conic, à placer : Ω ×1, Sommets ×2, Foyers ×2]
  pièges : g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 16x² + 25y² − 96x − 50y − 231 = 0, trouve la forme réduite, le centre, a et b, les foyers et l'excentricité.
  [free, suivre l'erreur]  16x² + 25y² − 96x − 50y − 231 = 0
    = 16(x − 3)² − 144 + 25(y − 1)² − 25 − 231 = 0   ← Compléter les carrés
    = (x − 3)²/25 + (y − 1)²/16 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (3 ; 1) ; a = 5 ; b = 4   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 3   ← c² = a² − b² = 9
    = F = (6 ; 1) ; F' = (0 ; 1)   ← Sur le grand axe, à c du centre
    = e = 3/5   ← e = c/a
  aides : Mets 16 en facteur dans les x, 25 dans les y, complète, puis divise par le second membre. | c² = a² − b² = □ | F = (6 ; 1) et F′ = (0 ; 1)
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Niveau 5

```
Pour l'ellipse E : 9x² + y² + 72x + 10y + 160 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [free, sans aide]  9x² + y² + 72x + 10y + 160 = 0
    = 9(x + 4)² − 144 + (y + 5)² − 25 + 160 = 0   ← Compléter les carrés
    = (x + 4)² + (y + 5)²/9 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (-4 ; -5) ; a = 3 ; b = 1   ← Grand axe vertical : a² = 9 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = 2√2   ← c² = a² − b² = 8
    = F = (-4 ; -5 + 2√2) ; F' = (-4 ; -5 - 2√2)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 2√2/3   ← e = c/a
    = directrices÷y = −5 + 9√2/4 ou y = −5 − 9√2/4   ← À a²/c = 9√2/4 du centre, perpendiculaires au grand axe
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : x² + 9y² + 18y = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [free, sans aide]  x² + 9y² + 18y = 0
    = x² + 9(y + 1)² − 9 = 0   ← Compléter les carrés
    = x²/9 + (y + 1)² = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (0 ; -1) ; a = 3 ; b = 1   ← Grand axe horizontal : a² = 9 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 2√2   ← c² = a² − b² = 8
    = F = (2√2 ; -1) ; F' = (-2√2 ; -1)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 2√2/3   ← e = c/a
    = directrices÷x = 9√2/4 ou x = −9√2/4   ← À a²/c = 9√2/4 du centre, perpendiculaires au grand axe
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 9x² + 25y² + 18x + 100y − 116 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [free, sans aide]  9x² + 25y² + 18x + 100y − 116 = 0
    = 9(x + 1)² − 9 + 25(y + 2)² − 100 − 116 = 0   ← Compléter les carrés
    = (x + 1)²/25 + (y + 2)²/9 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (-1 ; -2) ; a = 5 ; b = 3   ← Grand axe horizontal : a² = 25 sous x
  — Les foyers.  [juge conic]  départ : E
    = c = 4   ← c² = a² − b² = 16
    = F = (3 ; -2) ; F' = (-5 ; -2)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 4/5   ← e = c/a
    = directrices÷x = 21/4 ou x = −29/4   ← À a²/c = 25/4 du centre, perpendiculaires au grand axe
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Variantes d'examen

```
Quels sont les foyers de l'ellipse 16x² + 25y² + 96x + 200y + 144 = 0 ?
  · (−3 ; −1) et (−3 ; −7) [g10_axis_swap]   ✔ (0 ; −4) et (−6 ; −4)   · (−3 + √41 ; −4) et (−3 − √41 ; −4) [g10_c_wrong_formula]   · (2 ; −4) et (−8 ; −4)
  [examen mcq]
  pièges : g10_c_wrong_formula, g10_axis_swap

Vrai ou faux ?
  « Les foyers de l'ellipse x²/a² + y²/b² = 1 (avec a > b > 0) sont à la distance √(a² + b²) du centre. » → FAUX
    contre-exemple (geo) : a = 5, b = 3
  [examen tf]
  pièges : g10_c_wrong_formula

L'ellipse 16x² + 25y² + 96x − 250y + 369 = 0 a un foyer F à droite de l'autre. Que vaut son abscisse ?
  [free, sans aide, examen coef]  x_F
    = 0
  pièges : g10_c_wrong_formula, g10_axis_swap

Pour l'ellipse E : 25x² + 16y² + 50x + 160y + 25 = 0, trouve la forme réduite, le centre, a et b, les foyers, l'excentricité et les directrices.
  [free, sans aide, examen open]  25x² + 16y² + 50x + 160y + 25 = 0
    = 25(x + 1)² − 25 + 16(y + 5)² − 400 + 25 = 0   ← Compléter les carrés
    = (x + 1)²/16 + (y + 5)²/25 = 1   ← Diviser par le second membre
  — Le centre et les demi-axes.  [juge conic]  départ : E
    = Ω = (-1 ; -5) ; a = 5 ; b = 4   ← Grand axe vertical : a² = 25 sous y
  — Les foyers.  [juge conic]  départ : E
    = c = 3   ← c² = a² − b² = 9
    = F = (-1 ; -2) ; F' = (-1 ; -8)   ← Sur le grand axe, à c du centre
  — L'excentricité et les directrices.  [juge conic]  départ : E
    = e = 3/5   ← e = c/a
    = directrices÷y = 10/3 ou y = −40/3   ← À a²/c = 25/3 du centre, perpendiculaires au grand axe
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

## Hyperbole : foyers, asymptotes, directrices (`g10-hyperbola`, CMS)

_Forme réduite, c² = a² + b², asymptotes y − k = ±(b/a)(x − h)._

### Niveau 1

```
L'hyperbole H a pour forme réduite (y − 5)²/9 − (x + 5)²/16 = 1. Donne son centre, a, b, c, ses foyers, son excentricité et ses asymptotes.
  [guided]  (y − 5)²/9 − (x + 5)²/16 = 1
    = Ω=(-5;5);a=□;b=□;c=5   (trous : Ω = (-5 ; 5) ; a = 3 ; b = 4 ; c = 5)   ← Axe réel vertical ; c² = a² + b² = 25
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (-5 ; 10) ; F' = (-5 ; 0)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = 5/3)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 4y + 35 = 0 ou 3x + 4y − 5 = 0   ← y − k = ±(a/b)(x − h) : l'axe réel est vertical
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−5 ; 5) | asymptotes : 3x − 4y + 35 = 0 ou 3x + 4y − 5 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

L'hyperbole H a pour forme réduite (y − 2)²/16 − (x + 3)²/9 = 1. Donne son centre, a, b, c, ses foyers, son excentricité et ses asymptotes.
  [guided]  (y − 2)²/16 − (x + 3)²/9 = 1
    = Ω=(-3;2);a=□;b=□;c=5   (trous : Ω = (-3 ; 2) ; a = 4 ; b = 3 ; c = 5)   ← Axe réel vertical ; c² = a² + b² = 25
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (-3 ; 7) ; F' = (-3 ; -3)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = 5/4)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷4x − 3y + 18 = 0 ou 4x + 3y + 6 = 0   ← y − k = ±(a/b)(x − h) : l'axe réel est vertical
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−3 ; 2) | asymptotes : 4x − 3y + 18 = 0 ou 4x + 3y + 6 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

L'hyperbole H a pour forme réduite (x − 4)²/36 − (y + 3)²/64 = 1. Donne son centre, a, b, c, ses foyers, son excentricité et ses asymptotes.
  [guided]  (x − 4)²/36 − (y + 3)²/64 = 1
    = Ω=(4;-3);a=□;b=□;c=10   (trous : Ω = (4 ; -3) ; a = 6 ; b = 8 ; c = 10)   ← Axe réel horizontal ; c² = a² + b² = 100
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (14 ; -3) ; F' = (-6 ; -3)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = 5/3)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷4x − 3y − 25 = 0 ou 4x + 3y − 7 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (4 ; −3) | asymptotes : 4x − 3y − 25 = 0 ou 4x + 3y − 7 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

```

### Niveau 2

```
Pour l'hyperbole H : 9x² − 16y² + 54x − 160y − 895 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes.
  [guided]  9x² − 16y² + 54x − 160y − 895 = 0
    = 9(x + 3)² − □ − 16(y + 5)² + □ − 895 = 0   (trous : 9(x + 3)² − 81 − 16(y + 5)² + 400 − 895 = 0)   ← Compléter les carrés
    = (x + 3)²/□ − (y + 5)²/□ = 1   (trous : (x + 3)²/64 − (y + 5)²/36 = 1)   ← 9(x + 3)² − 16(y + 5)² = 576, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    ? L'axe réel est… ✔ horizontal / · vertical
    = Ω=(-3;-5);a=□;b=□;c=10   (trous : Ω = (-3 ; -5) ; a = 8 ; b = 6 ; c = 10)   ← Axe réel horizontal ; c² = a² + b² = 100
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (7 ; -5) ; F' = (-13 ; -5)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = 5/4)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 4y − 11 = 0 ou 3x + 4y + 29 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−3 ; −5) | asymptotes : 3x − 4y − 11 = 0 ou 3x + 4y + 29 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : 16x² − 9y² + 96x − 72y − 576 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes.
  [guided]  16x² − 9y² + 96x − 72y − 576 = 0
    = 16(x + 3)² − □ − 9(y + 4)² + □ − 576 = 0   (trous : 16(x + 3)² − 144 − 9(y + 4)² + 144 − 576 = 0)   ← Compléter les carrés
    = (x + 3)²/□ − (y + 4)²/□ = 1   (trous : (x + 3)²/36 − (y + 4)²/64 = 1)   ← 16(x + 3)² − 9(y + 4)² = 576, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    ? L'axe réel est… ✔ horizontal / · vertical
    = Ω=(-3;-4);a=□;b=□;c=10   (trous : Ω = (-3 ; -4) ; a = 6 ; b = 8 ; c = 10)   ← Axe réel horizontal ; c² = a² + b² = 100
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (7 ; -4) ; F' = (-13 ; -4)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = 5/3)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷4x − 3y = 0 ou 4x + 3y + 24 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−3 ; −4) | asymptotes : 4x − 3y = 0 ou 4x + 3y + 24 = 0
  pièges : g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : 9x² − 4y² − 18x − 40y − 127 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes.
  [guided]  9x² − 4y² − 18x − 40y − 127 = 0
    = 9(x − 1)² − □ − 4(y + 5)² + □ − 127 = 0   (trous : 9(x − 1)² − 9 − 4(y + 5)² + 100 − 127 = 0)   ← Compléter les carrés
    = (x − 1)²/□ − (y + 5)²/□ = 1   (trous : (x − 1)²/4 − (y + 5)²/9 = 1)   ← 9(x − 1)² − 4(y + 5)² = 36, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    ? L'axe réel est… ✔ horizontal / · vertical
    = Ω=(1;-5);a=□;b=□;c=√13   (trous : Ω = (1 ; -5) ; a = 2 ; b = 3 ; c = √13)   ← Axe réel horizontal ; c² = a² + b² = 13
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (1 + √13 ; -5) ; F' = (1 - √13 ; -5)   ← Sur l'axe réel, à c du centre
    = e = □   (trous : e = √13/2)   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 2y − 13 = 0 ou 3x + 2y + 7 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (1 ; −5) | asymptotes : 3x − 2y − 13 = 0 ou 3x + 2y + 7 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

```

### Niveau 3

```
Pour l'hyperbole H : 9x² − 16y² − 72x − 96y + 576 = 0, trouve la forme réduite et les asymptotes.
  [tap, suivre l'erreur, menu menu]  9x² − 16y² − 72x − 96y + 576 = 0
    = 9(x − 4)² − 144 − 16(y + 3)² + 144 + 576 = 0   ← Compléter les carrés
    = (y + 3)²/36 − (x − 4)²/64 = 1   ← 9(x − 4)² − 16(y + 3)² = −576, puis diviser par le second membre (qui devient +1)
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 4y − 24 = 0 ou 3x + 4y = 0   ← y − k = ±(a/b)(x − h) : l'axe réel est vertical
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (4 ; −3) | asymptotes : 3x − 4y − 24 = 0 ou 3x + 4y = 0
  pièges : g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : 16x² − 9y² − 128x + 90y + 175 = 0, trouve la forme réduite et les asymptotes.
  [tap, suivre l'erreur, menu menu]  16x² − 9y² − 128x + 90y + 175 = 0
    = 16(x − 4)² − 256 − 9(y − 5)² + 225 + 175 = 0   ← Compléter les carrés
    = (y − 5)²/16 − (x − 4)²/9 = 1   ← 16(x − 4)² − 9(y − 5)² = −144, puis diviser par le second membre (qui devient +1)
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷4x − 3y − 1 = 0 ou 4x + 3y − 31 = 0   ← y − k = ±(a/b)(x − h) : l'axe réel est vertical
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (4 ; 5) | asymptotes : 4x − 3y − 1 = 0 ou 4x + 3y − 31 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : x² − 4y² + 10x + 40y − 79 = 0, trouve la forme réduite et les asymptotes.
  [tap, suivre l'erreur, menu menu]  x² − 4y² + 10x + 40y − 79 = 0
    = (x + 5)² − 25 − 4(y − 5)² + 100 − 79 = 0   ← Compléter les carrés
    = (x + 5)²/4 − (y − 5)² = 1   ← (x + 5)² − 4(y − 5)² = 4, puis diviser par le second membre (qui devient +1)
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷x − 2y + 15 = 0 ou x + 2y − 5 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−5 ; 5) | asymptotes : x − 2y + 15 = 0 ou x + 2y − 5 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

```

### Niveau 4

```
Pour l'hyperbole H : 16x² − 9y² + 128x − 36y − 356 = 0, trouve la forme réduite et les asymptotes.
  [free, suivre l'erreur]  16x² − 9y² + 128x − 36y − 356 = 0
    = 16(x + 4)² − 256 − 9(y + 2)² + 36 − 356 = 0   ← Compléter les carrés
    = (x + 4)²/36 − (y + 2)²/64 = 1   ← 16(x + 4)² − 9(y + 2)² = 576, puis diviser par le second membre (qui devient +1)
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷4x − 3y + 10 = 0 ou 4x + 3y + 22 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (−4 ; −2) | asymptotes : 4x − 3y + 10 = 0 ou 4x + 3y + 22 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : 9x² − y² − 18x + 4y − 4 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes et les directrices.
  [free, suivre l'erreur]  9x² − y² − 18x + 4y − 4 = 0
    = 9(x − 1)² − 9 − (y − 2)² + 4 − 4 = 0   ← Compléter les carrés
    = (x − 1)² − (y − 2)²/9 = 1   ← 9(x − 1)² − (y − 2)² = 9, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    = Ω = (1 ; 2) ; a = 1 ; b = 3 ; c = √10   ← Axe réel horizontal ; c² = a² + b² = 10
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (1 + √10 ; 2) ; F' = (1 - √10 ; 2)   ← Sur l'axe réel, à c du centre
    = e = √10   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − y − 1 = 0 ou 3x + y − 5 = 0   ← y − k = ±(b/a)(x − h)
  — Les directrices.  [juge conic]  départ : H
    = directrices÷x = 1 + √10/10 ou x = 1 − √10/10   ← À a²/c = √10/10 du centre
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (1 ; 2) | asymptotes : 3x − y − 1 = 0 ou 3x + y − 5 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Pour l'hyperbole H : 9x² − 4y² − 18x − 8y − 31 = 0, trouve la forme réduite et les asymptotes.
  [free, suivre l'erreur]  9x² − 4y² − 18x − 8y − 31 = 0
    = 9(x − 1)² − 9 − 4(y + 1)² + 4 − 31 = 0   ← Compléter les carrés
    = (x − 1)²/4 − (y + 1)²/9 = 1   ← 9(x − 1)² − 4(y + 1)² = 36, puis diviser par le second membre (qui devient +1)
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 2y − 5 = 0 ou 3x + 2y − 1 = 0   ← y − k = ±(b/a)(x − h)
  aides : Pour une hyperbole, c² = a² + b² ; l'axe réel est du côté du terme positif quand le second membre vaut +1. | y − k = ±(□/□)(x − h), Ω = (1 ; −1) | asymptotes : 3x − 2y − 5 = 0 ou 3x + 2y − 1 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

```

### Niveau 5

```
Pour l'hyperbole H : 9x² − y² − 90x − 6y + 225 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes et les directrices.
  [free, sans aide]  9x² − y² − 90x − 6y + 225 = 0
    = 9(x − 5)² − 225 − (y + 3)² + 9 + 225 = 0   ← Compléter les carrés
    = (y + 3)²/9 − (x − 5)² = 1   ← 9(x − 5)² − (y + 3)² = −9, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    = Ω = (5 ; -3) ; a = 3 ; b = 1 ; c = √10   ← Axe réel vertical ; c² = a² + b² = 10
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (5 ; -3 + √10) ; F' = (5 ; -3 - √10)   ← Sur l'axe réel, à c du centre
    = e = √10/3   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − y − 18 = 0 ou 3x + y − 12 = 0   ← y − k = ±(a/b)(x − h) : l'axe réel est vertical
  — Les directrices.  [juge conic]  départ : H
    = directrices÷y = −3 + 9√10/10 ou y = −3 − 9√10/10   ← À a²/c = 9√10/10 du centre
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

Esquisse l'hyperbole H : 9x² − 16y² + 18x − 32y − 583 = 0. Place son centre Ω, ses sommets et ses deux asymptotes (chacune par deux points).
  [repère conic, à placer : Ω ×1, Sommets ×2, Asymptotes ×2, sans aide]
  pièges : g10_asymptote_ratio, g10_axis_swap

Esquisse l'hyperbole H : 16x² − 9y² − 32x + 36y + 556 = 0. Place son centre Ω, ses sommets et ses deux asymptotes (chacune par deux points).
  [repère conic, à placer : Ω ×1, Sommets ×2, Asymptotes ×2, sans aide]
  pièges : g10_asymptote_ratio, g10_axis_swap

```

### Variantes d'examen

```
Quelles sont les asymptotes de l'hyperbole 16x² − 9y² + 54y − 657 = 0 ?
  · x − y + 3 = 0 et x + y − 3 = 0   · 4x − 3y − 9 = 0 et 4x + 3y + 9 = 0   · 3x − 4y + 12 = 0 et 3x + 4y − 12 = 0 [g10_asymptote_ratio]   ✔ 4x − 3y + 9 = 0 et 4x + 3y − 9 = 0
  [examen mcq]
  pièges : g10_asymptote_ratio

Vrai ou faux ?
  « Les asymptotes de l'hyperbole x²/a² − y²/b² = 1 sont perpendiculaires si et seulement si a = b. » → VRAI
  [examen tf]

Pour l'hyperbole H : 9x² − 16y² − 90x − 32y + 65 = 0, trouve la forme réduite, le centre, a, b, c, les foyers, l'excentricité, les asymptotes et les directrices.
  [free, sans aide, examen open]  9x² − 16y² − 90x − 32y + 65 = 0
    = 9(x − 5)² − 225 − 16(y + 1)² + 16 + 65 = 0   ← Compléter les carrés
    = (x − 5)²/16 − (y + 1)²/9 = 1   ← 9(x − 5)² − 16(y + 1)² = 144, puis diviser par le second membre (qui devient +1)
  — Le centre, a, b et c.  [juge conic]  départ : H
    = Ω = (5 ; -1) ; a = 4 ; b = 3 ; c = 5   ← Axe réel horizontal ; c² = a² + b² = 25
  — Les foyers et l'excentricité.  [juge conic]  départ : H
    = F = (10 ; -1) ; F' = (0 ; -1)   ← Sur l'axe réel, à c du centre
    = e = 5/4   ← e = c/a > 1
  — Les asymptotes.  [juge conic]  départ : H
    = asymptotes÷3x − 4y − 19 = 0 ou 3x + 4y − 11 = 0   ← y − k = ±(b/a)(x − h)
  — Les directrices.  [juge conic]  départ : H
    = directrices÷x = 41/5 ou x = 9/5   ← À a²/c = 16/5 du centre
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio

```

## Parabole : sommet, foyer, directrice (`g10-parabola`, CMS)

_(x − h)² = 2p(y − k) : le foyer est à p/2 du sommet._

### Niveau 1

```
La parabole P a pour forme réduite (x + 3)² = −12y. Donne son sommet, son axe, p, son foyer et sa directrice.
  [guided]  (x + 3)² = −12y
    = S=(□;□);axe÷x=-3   (trous : S = (-3 ; 0) ; axe : x = -3)   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : −6)   ← 2p = -12
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(□;-3);directrice÷y=3   (trous : F = (-3 ; -3) ; directrice : y = 3)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−3 ; 0 + □) | (x + 3)² = −12y ; F = (−3 ; −3) ; directrice y = 3
  pièges : g4_square_constant, g10_parabola_p_half

La parabole P a pour forme réduite (y − 5)² = 8(x + 2). Donne son sommet, son axe, p, son foyer et sa directrice.
  [guided]  (y − 5)² = 8(x + 2)
    = S=(□;□);axe÷y=5   (trous : S = (-2 ; 5) ; axe : y = 5)   ← Axe horizontal : le carré porte sur y
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : 4)   ← 2p = 8
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(□;5);directrice÷x=-4   (trous : F = (0 ; 5) ; directrice : x = -4)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−2 + □ ; 5) | (y − 5)² = 8(x + 2) ; F = (0 ; 5) ; directrice x = −4
  pièges : g4_square_constant, g10_parabola_p_half

La parabole P a pour forme réduite (y + 2)² = −2x. Donne son sommet, son axe, p, son foyer et sa directrice.
  [guided]  (y + 2)² = −2x
    = S=(□;□);axe÷y=-2   (trous : S = (0 ; -2) ; axe : y = -2)   ← Axe horizontal : le carré porte sur y
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : −1)   ← 2p = -2
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(□;-2);directrice÷x=1/2   (trous : F = (-1/2 ; -2) ; directrice : x = 1/2)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (0 + □ ; −2) | (y + 2)² = −2x ; F = (−1/2 ; −2) ; directrice x = 1/2
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 2

```
Pour la parabole P : x² + 6x − 4y − 11 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [guided]  x² + 6x − 4y − 11 = 0
    ? L'axe de la parabole est… ✔ vertical (le carré porte sur x) / · horizontal (le carré porte sur y)
    = (x + 3)² − □ − 4y − 11 = 0   (trous : (x + 3)² − 9 − 4y − 11 = 0)   ← Compléter le carré
    = (x + 3)² = □(y + 5)   (trous : (x + 3)² = 4(y + 5))   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S=(□;□);axe÷x=-3   (trous : S = (-3 ; -5) ; axe : x = -3)   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : 2)   ← 2p = 4
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(-3;□);directrice÷y=-6   (trous : F = (-3 ; -4) ; directrice : y = -6)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−3 ; −5 + □) | (x + 3)² = 4(y + 5) ; F = (−3 ; −4) ; directrice y = −6
  pièges : g4_square_constant, g10_parabola_p_half

Pour la parabole P : x² + 10x − 8y + 49 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [guided]  x² + 10x − 8y + 49 = 0
    ? L'axe de la parabole est… ✔ vertical (le carré porte sur x) / · horizontal (le carré porte sur y)
    = (x + 5)² − □ − 8y + 49 = 0   (trous : (x + 5)² − 25 − 8y + 49 = 0)   ← Compléter le carré
    = (x + 5)² = □(y − 3)   (trous : (x + 5)² = 8(y − 3))   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S=(□;□);axe÷x=-5   (trous : S = (-5 ; 3) ; axe : x = -5)   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : 4)   ← 2p = 8
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(-□;5);directrice÷y=1   (trous : F = (-5 ; 5) ; directrice : y = 1)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−5 ; 3 + □) | (x + 5)² = 8(y − 3) ; F = (−5 ; 5) ; directrice y = 1
  pièges : g4_square_constant, g10_parabola_p_half

Pour la parabole P : y² + 2x + 4y + 6 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [guided]  y² + 2x + 4y + 6 = 0
    ? L'axe de la parabole est… · vertical (le carré porte sur x) / ✔ horizontal (le carré porte sur y)
    = (y + 2)² − □ + 2x + 6 = 0   (trous : (y + 2)² − 4 + 2x + 6 = 0)   ← Compléter le carré
    = (y + 2)² = □(x + 1)   (trous : (y + 2)² = −2(x + 1))   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S=(□;□);axe÷y=-2   (trous : S = (-1 ; -2) ; axe : y = -2)   ← Axe horizontal : le carré porte sur y
  — Le paramètre p.  [juge value]  départ : p
    = □   (trous : −1)   ← 2p = -2
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F=(□;-2);directrice÷x=-1/2   (trous : F = (-3/2 ; -2) ; directrice : x = -1/2)   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−1 + □ ; −2) | (y + 2)² = −2(x + 1) ; F = (−3/2 ; −2) ; directrice x = −1/2
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 3

```
Pour la parabole P : x² − 6x + 8y − 23 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [tap, suivre l'erreur, menu menu]  x² − 6x + 8y − 23 = 0
    = (x − 3)² − 9 + 8y − 23 = 0   ← Compléter le carré
    = (x − 3)² = −8(y − 4)   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (3 ; 4) ; axe : x = 3   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = −4   ← 2p = -8
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F = (3 ; 2) ; directrice : y = 6   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (3 ; 4 + □) | (x − 3)² = −8(y − 4) ; F = (3 ; 2) ; directrice y = 6
  pièges : g4_square_constant, g10_parabola_p_half

Pour la parabole P : x² + 2x + 8y − 7 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [tap, suivre l'erreur, menu menu]  x² + 2x + 8y − 7 = 0
    = (x + 1)² − 1 + 8y − 7 = 0   ← Compléter le carré
    = (x + 1)² = −8(y − 1)   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (-1 ; 1) ; axe : x = -1   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = −4   ← 2p = -8
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F = (-1 ; -1) ; directrice : y = 3   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−1 ; 1 + □) | (x + 1)² = −8(y − 1) ; F = (−1 ; −1) ; directrice y = 3
  pièges : g4_square_constant, g10_parabola_p_half

Pour la parabole P : x² + 2x − 12y − 23 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [tap, suivre l'erreur, menu menu]  x² + 2x − 12y − 23 = 0
    = (x + 1)² − 1 − 12y − 23 = 0   ← Compléter le carré
    = (x + 1)² = 12(y + 2)   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (-1 ; -2) ; axe : x = -1   ← Axe vertical : le carré porte sur x
  — Le paramètre p.  [juge value]  départ : p
    = 6   ← 2p = 12
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F = (-1 ; 1) ; directrice : y = -5   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−1 ; −2 + □) | (x + 1)² = 12(y + 2) ; F = (−1 ; 1) ; directrice y = −5
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 4

```
Une parabole P d'axe y = 1 passe par A(11 ; 5) et B(5 ; 3). Trouve son équation sous la forme (y − 1)² = 2p(x − h).
  [free, suivre l'erreur]  2p
    (A et B donnent 4² = 2p(11 − h) et 2² = 2p(5 − h).)
    = (4² − 2²)/(11 − 5)   ← Soustraire les deux équations
    = 2
  — Puis h.  [juge value]  départ : h
    = 11 − 4²/2   ← De 4² = 2p(11 − h)
    = 3
  — L'équation.  [juge conic]  départ : P
    = (y − 1)² = 2(x − 3)
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (3 + □ ; 1) | (y − 1)² = 2(x − 3) ; F = (7/2 ; 1) ; directrice x = 5/2

Trouve l'équation de la parabole P de foyer F(5 ; 5/2) et de directrice D : y = 11/2, sous la forme réduite, puis son sommet et son axe.
  [free, suivre l'erreur]  P
    = (x − 5)² + (y − 5/2)² = (y − 11/2)²   ← MF² = d(M, D)²
    = (x − 5)² = −6(y − 4)   ← Développer et réduire
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (5 ; 4) ; axe : x = 5   ← Axe vertical : le carré porte sur x
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (5 ; 4 + □) | (x − 5)² = −6(y − 4) ; F = (5 ; 5/2) ; directrice y = 11/2
  pièges : g4_square_constant, g10_parabola_p_half

Pour la parabole P : y² + 12x + 8y + 52 = 0, trouve la forme réduite, le sommet, l'axe, p, le foyer et la directrice.
  [free, suivre l'erreur]  y² + 12x + 8y + 52 = 0
    = (y + 4)² − 16 + 12x + 52 = 0   ← Compléter le carré
    = (y + 4)² = −12(x + 3)   ← Isoler le carré et mettre 2p en facteur
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (-3 ; -4) ; axe : y = -4   ← Axe horizontal : le carré porte sur y
  — Le paramètre p.  [juge value]  départ : p
    = −6   ← 2p = -12
  — Le foyer et la directrice.  [juge conic]  départ : P
    = F = (-6 ; -4) ; directrice : x = 0   ← À p/2 du sommet, de part et d'autre
  aides : Isole le carré d'un côté, mets le coefficient de l'autre variable en facteur : (x − h)² = 2p(y − k). | F = (−3 + □ ; −4) | (y + 4)² = −12(x + 3) ; F = (−6 ; −4) ; directrice x = 0
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 5

```
Une parabole P d'axe y = −1 passe par A(−9 ; −5) et B(−3 ; 1). Trouve son équation sous la forme (y + 1)² = 2p(x − h).
  [free, sans aide]  2p
    (A et B donnent (−4)² = 2p(−9 − h) et 2² = 2p(−3 − h).)
    = ((−4)² − 2²)/(−9 − (−3))   ← Soustraire les deux équations
    = −2
  — Puis h.  [juge value]  départ : h
    = −9 − (−4)²/(−2)   ← De (−4)² = 2p(-9 − h)
    = −1
  — L'équation.  [juge conic]  départ : P
    = (y + 1)² = −2(x + 1)

Une parabole P d'axe x = −4 passe par A(−10 ; 13) et B(0 ; 8). Trouve son équation sous la forme (x + 4)² = 2p(y − k).
  [free, sans aide]  2p
    (A et B donnent (−6)² = 2p(13 − k) et 4² = 2p(8 − k).)
    = ((−6)² − 4²)/(13 − 8)   ← Soustraire les deux équations
    = 4
  — Puis k.  [juge value]  départ : k
    = 13 − (−6)²/4   ← De (−6)² = 2p(13 − k)
    = 4
  — L'équation.  [juge conic]  départ : P
    = (x + 4)² = 4(y − 4)

Trouve l'équation de la parabole P de foyer F(−1 ; 4) et de directrice D : x = 1, sous la forme réduite, puis son sommet et son axe.
  [free, sans aide]  P
    = (x + 1)² + (y − 4)² = (x − 1)²   ← MF² = d(M, D)²
    = (y − 4)² = −4x   ← Développer et réduire
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (0 ; 4) ; axe : y = 4   ← Axe horizontal : le carré porte sur y
  pièges : g4_square_constant, g10_parabola_p_half

```

### Variantes d'examen

```
Quel est le foyer de la parabole x² − 8x − 12y + 52 = 0 ?
  · (4 ; 9) [g10_parabola_p_half]   · (4 ; 0)   ✔ (4 ; 6)   · (4 ; 15) [g10_parabola_p_half]
  [examen mcq]
  pièges : g10_parabola_p_half

Vrai ou faux ?
  « Le foyer de la parabole x² = 4y est (0 ; 4). » → FAUX
    contre-exemple (geo) : F = (0 ; 1)
  [examen tf]
  pièges : g10_parabola_p_half

Trouve l'équation de la parabole P de foyer F(7/2 ; 3) et de directrice D : x = 5/2, sous la forme réduite, puis son sommet et son axe.
  [free, sans aide, examen open]  P
    = (x − 7/2)² + (y − 3)² = (x − 5/2)²   ← MF² = d(M, D)²
    = (y − 3)² = 2(x − 3)   ← Développer et réduire
  — Le sommet et l'axe.  [juge conic]  départ : P
    = S = (3 ; 3) ; axe : y = 3   ← Axe horizontal : le carré porte sur y
  pièges : g4_square_constant, g10_parabola_p_half

```

## Trouver l'équation d'une conique à partir de ses éléments (`g10-conic-from-data`, CMS)

_MF = e·d(M, D), élever au carré, reconnaître._

### Niveau 1

```
Trouve l'équation de la conique de foyer F(0 ; 3), de directrice D : x = 6 et d'excentricité e = 1, puis nomme-la.
  [guided]  √(x² + (y − 3)²) = |x − 6|
    (MF = e·d(M, D) avec M(x ; y), F = (0 ; 3), D : x = 6.)
    (e = 1 : quelle conique ? e = 1 : une parabole.)
    = x² + (y − 3)² = □   (trous : x² + (y − 3)² = (x − 6)²)   ← Les deux membres sont positifs : élever au carré
    = x² + y² − 6y + 9 = □   (trous : x² + y² − 6y + 9 = x² − 12x + 36)   ← Développer
    = y² + 12x − 6y − 27 = 0   ← Tout du même côté
    = (y − 3)² = −12(x − 3)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | x² + (y − 3)² = (x − 6)² | y² + 12x − 6y − 27 = 0
  pièges : g4_square_constant, g10_parabola_p_half

Trouve l'équation de la conique de foyer F(−7 ; 0), de directrice D : x = −4 et d'excentricité e = 2, puis nomme-la.
  [guided]  √((x + 7)^2 + y^2) = 2|x + 4|
    (MF = e·d(M, D) avec M(x ; y), F = (−7 ; 0), D : x = −4.)
    (e = 2 : quelle conique ? e > 1 : une hyperbole.)
    = (x + 7)² + y² = 4□   (trous : (x + 7)² + y² = 4(x + 4)²)   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 14x + 49 = □   (trous : x² + y² + 14x + 49 = 4x² + 32x + 64)   ← Développer
    = 3x² − y² + 18x + 15 = 0   ← Tout du même côté
    = (x + 3)²/□ − y²/□ = 1   (trous : (x + 3)²/4 − y²/12 = 1)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 7)² + y² = 4(x + 4)² | 3x² − y² + 18x + 15 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_e_inverted

Trouve l'équation de la conique de foyer F(2 ; 2), de directrice D : y = −1 et d'excentricité e = 1/2, puis nomme-la.
  [guided]  √((x − 2)² + (y − 2)²) = (1/2)·|y + 1|
    (MF = e·d(M, D) avec M(x ; y), F = (2 ; 2), D : y = −1.)
    (e = 1/2 : quelle conique ? e < 1 : une ellipse.)
    = (x − 2)² + (y − 2)² = □/4   (trous : (x − 2)² + (y − 2)² = (y + 1)²/4)   ← Les deux membres sont positifs : élever au carré
    = 4x² + 4y² − 16x − 16y + 32 = □   (trous : 4x² + 4y² − 16x − 16y + 32 = y² + 2y + 1)   ← Développer
    = 4x² + 3y² − 16x − 18y + 31 = 0   ← Tout du même côté
    = (x − 2)²/3 + (y − 3)²/□ = 1   (trous : (x − 2)²/3 + (y − 3)²/4 = 1)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x − 2)² + (y − 2)² = (y + 1)²/4 | 4x² + 3y² − 16x − 18y + 31 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_e_inverted

```

### Niveau 2

```
Trouve l'équation de la conique de foyer F(−4 ; 0), de directrice D : x = 2 et d'excentricité e = 1, puis nomme-la.
  [guided]  √((x + 4)² + y²) = |x − 2|
    (MF = e·d(M, D) avec M(x ; y), F = (−4 ; 0), D : x = 2.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 1 : quelle conique ? · e < 1 : une ellipse / ✔ e = 1 : une parabole / · e > 1 : une hyperbole
    = (x + 4)² + y² = □   (trous : (x + 4)² + y² = (x − 2)²)   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 8x + 16 = □   (trous : x² + y² + 8x + 16 = x² − 4x + 4)   ← Développer
    = y² + 12x + 12 = 0   ← Tout du même côté
    = y² = −12(x + 1)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 4)² + y² = (x − 2)² | y² + 12x + 12 = 0
  pièges : g10_parabola_p_half

Trouve l'équation de la conique de foyer F(3 ; −1), de directrice D : y = 5 et d'excentricité e = 1, puis nomme-la.
  [guided]  √((x − 3)² + (y + 1)²) = |y − 5|
    (MF = e·d(M, D) avec M(x ; y), F = (3 ; −1), D : y = 5.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 1 : quelle conique ? · e < 1 : une ellipse / ✔ e = 1 : une parabole / · e > 1 : une hyperbole
    = (x − 3)² + (y + 1)² = □   (trous : (x − 3)² + (y + 1)² = (y − 5)²)   ← Les deux membres sont positifs : élever au carré
    = x² + y² − 6x + 2y + 10 = □   (trous : x² + y² − 6x + 2y + 10 = y² − 10y + 25)   ← Développer
    = x² − 6x + 12y − 15 = 0   ← Tout du même côté
    = (x − 3)² = −12(y − 2)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x − 3)² + (y + 1)² = (y − 5)² | x² − 6x + 12y − 15 = 0
  pièges : g4_square_constant, g10_parabola_p_half

Trouve l'équation de la conique de foyer F(0 ; 3), de directrice D : y = 0 et d'excentricité e = 2, puis nomme-la.
  [guided]  √(x^2 + (y - 3)^2) = 2|y|
    (MF = e·d(M, D) avec M(x ; y), F = (0 ; 3), D : y = 0.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 2 : quelle conique ? · e < 1 : une ellipse / · e = 1 : une parabole / ✔ e > 1 : une hyperbole
    = x² + (y − 3)² = 4□   (trous : x² + (y − 3)² = 4y²)   ← Les deux membres sont positifs : élever au carré
    = x² + y² − 6y + 9 = □   (trous : x² + y² − 6y + 9 = 4y²)   ← Développer
    = x² − 3y² − 6y + 9 = 0   ← Tout du même côté
    = (y + 1)²/□ − x²/□ = 1   (trous : (y + 1)²/4 − x²/12 = 1)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | x² + (y − 3)² = 4y² | x² − 3y² − 6y + 9 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_e_inverted

```

### Niveau 3

```
Trouve l'équation de la conique de foyer F(−2 ; −2), de directrice D : x = 1 et d'excentricité e = 2, puis nomme-la.
  [tap, suivre l'erreur, menu menu]  √((x + 2)^2 + (y + 2)^2) = 2|x - 1|
    (MF = e·d(M, D) avec M(x ; y), F = (−2 ; −2), D : x = 1.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 2 : quelle conique ? · e < 1 : une ellipse / · e = 1 : une parabole / ✔ e > 1 : une hyperbole
    = (x + 2)² + (y + 2)² = 4(x − 1)²   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 4x + 4y + 8 = 4x² − 8x + 4   ← Développer
    = 3x² − y² − 12x − 4y − 4 = 0   ← Tout du même côté
    = (x − 2)²/4 − (y + 2)²/12 = 1   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 2)² + (y + 2)² = 4(x − 1)² | 3x² − y² − 12x − 4y − 4 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_e_inverted

Trouve l'équation de la conique de foyer F(−3 ; 0), de directrice D : y = 3 et d'excentricité e = 1/2, puis nomme-la.
  [tap, suivre l'erreur, menu menu]  √((x + 3)² + y²) = (1/2)·|y − 3|
    (MF = e·d(M, D) avec M(x ; y), F = (−3 ; 0), D : y = 3.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 1/2 : quelle conique ? ✔ e < 1 : une ellipse / · e = 1 : une parabole / · e > 1 : une hyperbole
    = (x + 3)² + y² = (y − 3)²/4   ← Les deux membres sont positifs : élever au carré
    = 4x² + 4y² + 24x + 36 = y² − 6y + 9   ← Développer
    = 4x² + 3y² + 24x + 6y + 27 = 0   ← Tout du même côté
    = (x + 3)²/3 + (y + 1)²/4 = 1   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 3)² + y² = (y − 3)²/4 | 4x² + 3y² + 24x + 6y + 27 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_e_inverted

Trouve l'équation de la conique de foyer F(−1 ; −4), de directrice D : y = 2 et d'excentricité e = 1, puis nomme-la.
  [tap, suivre l'erreur, menu menu]  √((x + 1)² + (y + 4)²) = |y − 2|
    (MF = e·d(M, D) avec M(x ; y), F = (−1 ; −4), D : y = 2.)
    ? Quelle méthode ? ✔ Foyer-directrice : MF = e·d(M, D) / ✔ Forme réduite à paramètres (centre, a, b)
    ? e = 1 : quelle conique ? · e < 1 : une ellipse / ✔ e = 1 : une parabole / · e > 1 : une hyperbole
    = (x + 1)² + (y + 4)² = (y − 2)²   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 2x + 8y + 17 = y² − 4y + 4   ← Développer
    = x² + 2x + 12y + 13 = 0   ← Tout du même côté
    = (x + 1)² = −12(y + 1)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 1)² + (y + 4)² = (y − 2)² | x² + 2x + 12y + 13 = 0
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 4

```
Une conique a pour centre Ω(1 ; 4), pour foyer F(−3 ; 4) et pour excentricité e = 4/5. Trouve son équation réduite.
  [free, suivre l'erreur]  Γ
    (Ellipse : c = ΩF, a = c/e, b² = a² − c².)
    ? e = 4/5 : quelle conique ? ✔ e < 1 : une ellipse / · e = 1 : une parabole / · e > 1 : une hyperbole
    = c = 4   ← c = ΩF
    = a = 5   ← a = c/e = 4/(4/5)
    = b = 3   ← b² = a² − c²
    = (x − 1)²/25 + (y − 4)²/9 = 1   ← Axe focal parallèle à Ox
  aides : c = ΩF et e = c/a donnent a ; puis b² avec la relation de la conique. | a = 4/(4/5) = □ | (x - 1)²/25 + (y - 4)²/9 = 1
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_e_inverted

Trouve l'équation de la conique de foyer F(−2 ; 4), de directrice D : y = 0 et d'excentricité e = 1, puis nomme-la.
  [free, suivre l'erreur]  √((x + 2)² + (y − 4)²) = |y|
    (MF = e·d(M, D) avec M(x ; y), F = (−2 ; 4), D : y = 0.)
    ? e = 1 : quelle conique ? · e < 1 : une ellipse / ✔ e = 1 : une parabole / · e > 1 : une hyperbole
    = (x + 2)² + (y − 4)² = y²   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 4x − 8y + 20 = y²   ← Développer
    = x² + 4x − 8y + 20 = 0   ← Tout du même côté
    = (x + 2)² = 8(y − 2)   ← Forme réduite : compléter les carrés
  aides : Écris la distance au foyer et la distance à la directrice, puis élève au carré. | (x + 2)² + (y − 4)² = y² | x² + 4x − 8y + 20 = 0
  pièges : g4_square_constant, g10_parabola_p_half

Une conique a pour centre Ω(−1 ; 3), pour foyer F(−1 ; 1) et pour excentricité e = 2. Trouve son équation réduite.
  [free, suivre l'erreur]  Γ
    (Hyperbole : c = ΩF, a = c/e, b² = c² − a².)
    ? e = 2 : quelle conique ? · e < 1 : une ellipse / · e = 1 : une parabole / ✔ e > 1 : une hyperbole
    = c = 2   ← c = ΩF
    = a = 1   ← a = c/e = 2/(2)
    = b = √3   ← b² = c² − a²
    = (y − 3)²/1 − (x + 1)²/3 = 1   ← Axe réel parallèle à Oy
  aides : c = ΩF et e = c/a donnent a ; puis b² avec la relation de la conique. | a = 2/(2) = □ | (y - 3)²/1 - (x + 1)²/3 = 1
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_e_inverted

```

### Niveau 5

```
Trouve l'équation de la conique de foyer F(−4 ; 0), de directrice D : x = 0 et d'excentricité e = 1, puis nomme-la.
  [free, sans aide]  √((x + 4)² + y²) = |x|
    (MF = e·d(M, D) avec M(x ; y), F = (−4 ; 0), D : x = 0.)
    ? e = 1 : quelle conique ? · e < 1 : une ellipse / ✔ e = 1 : une parabole / · e > 1 : une hyperbole
    = (x + 4)² + y² = x²   ← Les deux membres sont positifs : élever au carré
    = x² + y² + 8x + 16 = x²   ← Développer
    = y² + 8x + 16 = 0   ← Tout du même côté
    = y² = −8(x + 2)   ← Forme réduite : compléter les carrés
  pièges : g10_parabola_p_half

Trouve l'équation de la conique de foyer F(3 ; −1), de directrice D : x = 9 et d'excentricité e = 1/2, puis nomme-la.
  [free, sans aide]  √((x − 3)² + (y + 1)²) = (1/2)·|x − 9|
    (MF = e·d(M, D) avec M(x ; y), F = (3 ; −1), D : x = 9.)
    ? e = 1/2 : quelle conique ? ✔ e < 1 : une ellipse / · e = 1 : une parabole / · e > 1 : une hyperbole
    = (x − 3)² + (y + 1)² = (x − 9)²/4   ← Les deux membres sont positifs : élever au carré
    = 4x² + 4y² − 24x + 8y + 40 = x² − 18x + 81   ← Développer
    = 3x² + 4y² − 6x + 8y − 41 = 0   ← Tout du même côté
    = (x − 1)²/16 + (y + 1)²/12 = 1   ← Forme réduite : compléter les carrés
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_e_inverted

Trouve l'équation de la conique de foyer F(0 ; −2), de directrice D : x = 9 et d'excentricité e = 1/2, puis nomme-la.
  [free, sans aide]  √(x² + (y + 2)²) = (1/2)·|x − 9|
    (MF = e·d(M, D) avec M(x ; y), F = (0 ; −2), D : x = 9.)
    ? e = 1/2 : quelle conique ? ✔ e < 1 : une ellipse / · e = 1 : une parabole / · e > 1 : une hyperbole
    = x² + (y + 2)² = (x − 9)²/4   ← Les deux membres sont positifs : élever au carré
    = 4x² + 4y² + 16y + 16 = x² − 18x + 81   ← Développer
    = 3x² + 4y² + 18x + 16y − 65 = 0   ← Tout du même côté
    = (x + 3)²/36 + (y + 2)²/27 = 1   ← Forme réduite : compléter les carrés
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_e_inverted

```

### Variantes d'examen

```
Quelle est l'équation de la conique de foyer F(−4 ; −1), de directrice D : x = −1 et d'excentricité e = 2 ?
  · x² − y² − 4x − 2y − 15 = 0   · 3x² + 4y² + 30x + 8y + 67 = 0 [g10_e_inverted]   · 3x² − y² − 2y − 12 = 0   ✔ 3x² − y² − 2y − 13 = 0
  [examen mcq]
  pièges : g10_e_inverted

Une ellipse a pour centre Ω(3 ; −3), son grand axe parallèle à Oy, un sommet en S(3 ; 1), et elle passe par P(−3 ; −1). Trouve son équation réduite.
  [free, sans aide, examen open]  b²
    (a est la distance du centre au sommet. Que vaut b² ?)
    = 48   ← 2²/16 + 6²/b² = 1
  — L'équation réduite ?  [juge conic]  départ : E
    = (x − 3)²/48 + (y + 3)²/16 = 1

```

## Tangentes à une conique (`g10-conic-tangent`, CMS)

_Dédoubler en T ; depuis un point, la polaire._

### Niveau 1

```
Trouve la tangente à la conique x² − 2y² − 14 = 0 au point T(8 ; 5).
  [guided]  x² − 2y² − 14 = 0
    (La tangente en T : dédouble l'équation.)
    = □·x + (−2)·□·y − 14 = 0   (trous : 8·x + (−2)·5·y − 14 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 4x − 5y − 7 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | □·x + (− 2)·□·y − 14 = 0 | 4x − 5y − 7 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique 3x² − 2y² − 57 = 0 au point T(5 ; −3).
  [guided]  3x² − 2y² − 57 = 0
    (La tangente en T : dédouble l'équation.)
    = 3·□·x + (−2)·□·y − 57 = 0   (trous : 3·5·x + (−2)·(−3)·y − 57 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 5x + 2y − 19 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 3·□·x + (− 2)·□·y − 57 = 0 | 5x + 2y − 19 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique 3x² − 4y² − 8 = 0 au point T(2 ; −1).
  [guided]  3x² − 4y² − 8 = 0
    (La tangente en T : dédouble l'équation.)
    = 3·□·x + (−4)·□·y − 8 = 0   (trous : 3·2·x + (−4)·(−1)·y − 8 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 3x + 2y − 4 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 3·□·x + (− 4)·□·y − 8 = 0 | 3x + 2y − 4 = 0
  pièges : g4_line_constant, g10_doubling_wrong

```

### Niveau 2

```
Trouve la tangente à la conique 2x² + 3y² + 12x − 17 = 0 au point T(−5 ; −3).
  [guided]  2x² + 3y² + 12x − 17 = 0
    (La tangente en T : dédouble l'équation.)
    = 2·□·x + 3·(−3)·y + 6·(x − 5) − 17 = 0   (trous : 2·(−5)·x + 3·(−3)·y + 6·(x − 5) − 17 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 4x + 9y + 47 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 2·□·x + 3·□·y + 6·(x − 5) − 17 = 0 | 4x + 9y + 47 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique x² + 2y² − 4x + 12y + 10 = 0 au point T(0 ; −1).
  [guided]  x² + 2y² − 4x + 12y + 10 = 0
    (La tangente en T : dédouble l'équation.)
    = □·x + 2·(−1)·y + (−2)·(x) + 6·(y − 1) + 10 = 0   (trous : 0·x + 2·(−1)·y + (−2)·(x) + 6·(y − 1) + 10 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = x − 2y − 2 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | □·x + 2·□·y + (− 2)·(x) + 6·(y − 1) + 10 = 0 | x − 2y − 2 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique 2x² + y² + 8x − 4y + 1 = 0 au point T(−3 ; −1).
  [guided]  2x² + y² + 8x − 4y + 1 = 0
    (La tangente en T : dédouble l'équation.)
    = 2·□·x + (−1)·y + 4·(x − 3) + (−2)·(y − 1) + 1 = 0   (trous : 2·(−3)·x + (−1)·y + 4·(x − 3) + (−2)·(y − 1) + 1 = 0)   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 2x + 3y + 9 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 2·□·x + □·y + 4·(x − 3) + (− 2)·(y − 1) + 1 = 0 | 2x + 3y + 9 = 0
  pièges : g4_line_constant, g10_doubling_wrong

```

### Niveau 3

```
Trouve la tangente à la conique 3x² − 2y² − 19 = 0 au point d'abscisse 7 et d'ordonnée positive.
  [tap, suivre l'erreur, menu menu]  T
    (Le point de contact T a pour abscisse 7 et une ordonnée positive.)
    = T = (7 ; 8)   ← 3·(7)² − 2y² = 19
  — La tangente en T : dédouble l'équation.  [juge geom]  départ : 3x² − 2y² − 19 = 0
    = 3·7·x + (−2)·8·y − 19 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 21x − 16y − 19 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 3·□·x + (− 2)·□·y − 19 = 0 | 21x − 16y − 19 = 0

Trouve la tangente à la conique 2x² − 3y² − 15 = 0 au point d'abscisse 9 et d'ordonnée négative.
  [tap, suivre l'erreur, menu menu]  T
    (Le point de contact T a pour abscisse 9 et une ordonnée négative.)
    = T = (9 ; -7)   ← 2·(9)² − 3y² = 15
  — La tangente en T : dédouble l'équation.  [juge geom]  départ : 2x² − 3y² − 15 = 0
    = 2·9·x + (−3)·(−7)·y − 15 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 6x + 7y − 5 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 2·□·x + (− 3)·□·y − 15 = 0 | 6x + 7y − 5 = 0

Trouve la tangente à la conique 2x² + 5y² − 70 = 0 au point d'abscisse −5 et d'ordonnée négative.
  [tap, suivre l'erreur, menu menu]  T
    (Le point de contact T a pour abscisse −5 et une ordonnée négative.)
    = T = (-5 ; -2)   ← 2·(−5)² + 5y² = 70
  — La tangente en T : dédouble l'équation.  [juge geom]  départ : 2x² + 5y² − 70 = 0
    = 2·(−5)·x + 5·(−2)·y − 70 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = x + y + 7 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 2·□·x + 5·□·y − 70 = 0 | x + y + 7 = 0

```

### Niveau 4

```
Trouve la tangente à la conique 4x² + 2y² − 16x − 8y + 12 = 0 au point T(3 ; 4).
  [free, suivre l'erreur]  4x² + 2y² − 16x − 8y + 12 = 0
    (La tangente en T : dédouble l'équation.)
    = 4·3·x + 2·4·y + (−8)·(x + 3) + (−4)·(y + 4) + 12 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = x + y − 7 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 4·□·x + 2·□·y + (− 8)·(x + 3) + (− 4)·(y + 4) + 12 = 0 | x + y − 7 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique 4x² − 3y² − 73 = 0 au point T(−5 ; −3).
  [free, suivre l'erreur]  4x² − 3y² − 73 = 0
    (La tangente en T : dédouble l'équation.)
    = 4·(−5)·x + (−3)·(−3)·y − 73 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 20x − 9y + 73 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | 4·□·x + □·(− 3)·y − 73 = 0 | 20x − 9y + 73 = 0
  pièges : g4_line_constant, g10_doubling_wrong

Trouve la tangente à la conique x² + 4y² − 13 = 0 au point T(−3 ; −1).
  [free, suivre l'erreur]  x² + 4y² − 13 = 0
    (La tangente en T : dédouble l'équation.)
    = (−3)·x + 4·(−1)·y − 13 = 0   ← x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2
    = 3x + 4y + 13 = 0   ← Contrôle : T est sur la tangente
  aides : Dédouble : remplace un x par x₀ et un y par y₀ (x → (x + x₀)/2 dans les termes du 1er degré). | □·x + 4·□·y − 13 = 0 | 3x + 4y + 13 = 0
  pièges : g4_line_constant, g10_doubling_wrong

```

### Niveau 5

```
Trouve les tangentes à la conique 4x² − 3y² − 24 = 0 issues du point Q(−6 ; 8).
  [free, sans aide]  4x² − 3y² − 24 = 0
    (La polaire de Q (dédoubler avec Q) passe par les points de contact.)
    = 4·(−6)·x + (−3)·8·y − 24 = 0   ← Dédoubler avec Q
    = x + y + 1 = 0
  — Intersecte-la avec la conique : le point de contact T₁ (le plus à gauche, ou le plus bas) ?  [juge vector]  départ : T_1
    = T_1 = (-3 ; 2)
  — Et T₂ ?  [juge vector]  départ : T_2
    = T_2 = (9 ; -10)
  — Les deux tangentes, (QT₁) et (QT₂) ?  [juge geom]  départ : τ
    = 2x + y + 4 = 0 ou 6x + 5y − 4 = 0   ← Dédoubler en T₁ et en T₂
  pièges : g4_line_constant

Trouve les tangentes à la conique 4x² + 3y² − 64 = 0 issues du point Q(−4 ; 8).
  [free, sans aide]  4x² + 3y² − 64 = 0
    (La polaire de Q (dédoubler avec Q) passe par les points de contact.)
    = 4·(−4)·x + 3·8·y − 64 = 0   ← Dédoubler avec Q
    = 2x − 3y + 8 = 0
  — Intersecte-la avec la conique : le point de contact T₁ (le plus à gauche, ou le plus bas) ?  [juge vector]  départ : T_1
    = T_1 = (-4 ; 0)
  — Et T₂ ?  [juge vector]  départ : T_2
    = T_2 = (2 ; 4)
  — Les deux tangentes, (QT₁) et (QT₂) ?  [juge geom]  départ : τ
    = x + 4 = 0 ou 2x + 3y − 16 = 0   ← Dédoubler en T₁ et en T₂
  pièges : g4_line_constant

Trouve les tangentes à la conique 3x² − y² − 66 = 0 issues du point Q(−11/2 ; 11/2).
  [free, sans aide]  3x² − y² − 66 = 0
    (La polaire de Q (dédoubler avec Q) passe par les points de contact.)
    = 3·(−11/2)·x − 11/2·y − 66 = 0   ← Dédoubler avec Q
    = 3x + y + 12 = 0
  — Intersecte-la avec la conique : le point de contact T₁ (le plus à gauche, ou le plus bas) ?  [juge vector]  départ : T_1
    = T_1 = (-7 ; 9)
  — Et T₂ ?  [juge vector]  départ : T_2
    = T_2 = (-5 ; 3)
  — Les deux tangentes, (QT₁) et (QT₂) ?  [juge geom]  départ : τ
    = 7x + 3y + 22 = 0 ou 5x + y + 22 = 0   ← Dédoubler en T₁ et en T₂
  pièges : g4_line_constant

```

### Variantes d'examen

```
Quelle est la tangente à la conique 3x² + y² − 12x + 2y − 8 = 0 au point T(0 ; 2) ?
  · 6x − 3y + 5 = 0   ✔ 2x − y + 2 = 0   · y − 2 = 0 [g10_doubling_wrong]   · 3x − y + 2 = 0 [g10_doubling_wrong]
  [examen mcq]
  pièges : g10_doubling_wrong

Trouve les tangentes à la conique 3x² − 5y² − 22 = 0 issues du point Q(−11/2 ; 11/2).
  [free, sans aide, examen open]  3x² − 5y² − 22 = 0
    (La polaire de Q (dédoubler avec Q) passe par les points de contact.)
    = 3·(−11/2)·x + (−5)·11/2·y − 22 = 0   ← Dédoubler avec Q
    = 3x + 5y + 4 = 0
  — Intersecte-la avec la conique : le point de contact T₁ (le plus à gauche, ou le plus bas) ?  [juge vector]  départ : T_1
    = T_1 = (-3 ; 1)
  — Et T₂ ?  [juge vector]  départ : T_2
    = T_2 = (7 ; -5)
  — Les deux tangentes, (QT₁) et (QT₂) ?  [juge geom]  départ : τ
    = 9x + 5y + 22 = 0 ou 21x + 25y − 22 = 0   ← Dédoubler en T₁ et en T₂
  pièges : g4_line_constant

```

## Choisir la méthode : nature d'une conique (`g10-conic-nature`, CMS)

_Δ = det M, puis δ = det A : ellipse, hyperbole, parabole, dégénérée._

### Niveau 1

```
Quelle est la nature de la conique 2y² − x + 12y + 16 = 0 ?
  [guided]  det(M)
    (A = [[0,0],[0,2]] et M = [[0,0,-1/2],[0,2,6],[-1/2,6,16]].)
    (Par quoi commencer ? Écrire A et M, puis calculer Δ = det M.)
    = -1/2·det[[0,2],[-1/2,6]]   ← Développer selon la 1re ligne
    = □   (trous : −1/2)   ← Δ ≠ 0 : non dégénérée
  — A = [[0,0],[0,2]]. Et δ = det A ?  [juge value]  départ : δ
    (Δ = −1/2 : la conique est… non dégénérée (Δ ≠ 0).)
    = □·2 − 0²   (trous : 0·2 − 0²)   ← δ = ac − (b/2)²
    = □   (trous : 0)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 2λ = 0
    (δ = det A = 0 : genre ? δ = 0 (une λ nulle) : genre parabole.)
    = λ = 2 ou λ = 0   ← Une valeur propre nulle
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 0·2 − (□)² | δ = 0, Δ = −1/2 : une parabole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

Quelle est la nature de la conique −x² + 8xy + 5y² + 14x + 28y + 28 = 0 ?
  [guided]  det(M)
    (A = [[-1,4],[4,5]] et M = [[-1,4,7],[4,5,14],[7,14,28]].)
    (Par quoi commencer ? Écrire A et M, puis calculer Δ = det M.)
    = -det[[5,14],[14,28]]-4·det[[4,14],[7,28]]+7·det[[4,5],[7,14]]   ← Développer selon la 1re ligne
    = □   (trous : 147)   ← Δ ≠ 0 : non dégénérée
  — A = [[-1,4],[4,5]]. Et δ = det A ?  [juge value]  départ : δ
    (Δ = 147 : la conique est… non dégénérée (Δ ≠ 0).)
    = (−1)·5 − □²   (trous : (−1)·5 − 4²)   ← δ = ac − (b/2)²
    = □   (trous : −21)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 4λ − 21 = 0
    (δ = det A = −21 : genre ? δ < 0 (λ de signes contraires) : genre hyperbole.)
    = λ = 7 ou λ = −3   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = (−1)·5 − (□)² | δ = −21, Δ = 147 : une hyperbole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

Quelle est la nature de la conique 2x² − 8xy + 2y² − 32x + 16y + 26 = 0 ?
  [guided]  det(M)
    (A = [[2,-4],[-4,2]] et M = [[2,-4,-16],[-4,2,8],[-16,8,26]].)
    (Par quoi commencer ? Écrire A et M, puis calculer Δ = det M.)
    = 2·det[[2,8],[8,26]]+4·det[[-4,8],[-16,26]]-16·det[[-4,2],[-16,8]]   ← Développer selon la 1re ligne
    = □   (trous : 72)   ← Δ ≠ 0 : non dégénérée
  — A = [[2,-4],[-4,2]]. Et δ = det A ?  [juge value]  départ : δ
    (Δ = 72 : la conique est… non dégénérée (Δ ≠ 0).)
    = 2·2 − □²   (trous : 2·2 − (−4)²)   ← δ = ac − (b/2)²
    = □   (trous : −12)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 4λ − 12 = 0
    (δ = det A = −12 : genre ? δ < 0 (λ de signes contraires) : genre hyperbole.)
    = λ = 6 ou λ = −2   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 2·2 − (□)² | δ = −12, Δ = 72 : une hyperbole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

```

### Niveau 2

```
Quelle est la nature de la conique 3x² − 4xy + 6y² − 8x − 4y + 3 = 0 ?
  [guided]  det(M)
    (A = [[3,-2],[-2,6]] et M = [[3,-2,-4],[-2,6,-2],[-4,-2,3]].)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[3,-2,-4],[-2,6,-2],[-4,-2,3]]   (cases à remplir : (1,2) (2,1) (1,3) (3,1))   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 3·det[[6,-2],[-2,3]]+2·det[[-2,-2],[-4,3]]-4·det[[-2,6],[-4,-2]]   ← Développer selon la 1re ligne
    = □   (trous : −98)   ← Δ ≠ 0 : non dégénérée
  — A = [[3,-2],[-2,6]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = −98 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 3·6 − □²   (trous : 3·6 − (−2)²)   ← δ = ac − (b/2)²
    = □   (trous : 14)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 9λ + 14 = 0
    ? δ = det A = 14 : genre ? ✔ δ > 0 (λ de même signe) : genre ellipse / · δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    ? Genre ellipse : (a + c)·Δ = −882. Réelle ou vide ? ✔ (a + c)·Δ < 0 : ellipse réelle / · (a + c)·Δ > 0 : ensemble vide
    = λ = 7 ou λ = 2   ← Même signe
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 3·6 − (□)² | δ = 14, Δ = −98 : une ellipse réelle
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_det_sign_nature

Quelle est la nature de la conique 4x² − 8xy − 2y² − 40x − 8y + 19 = 0 ?
  [guided]  det(M)
    (A = [[4,-4],[-4,-2]] et M = [[4,-4,-20],[-4,-2,-4],[-20,-4,19]].)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[4,-4,-20],[-4,-2,-4],[-20,-4,19]]   (cases à remplir : (1,2) (2,1) (1,3) (3,1))   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 4·det[[-2,-4],[-4,19]]+4·det[[-4,-4],[-20,19]]-20·det[[-4,-2],[-20,-4]]   ← Développer selon la 1re ligne
    = □   (trous : −360)   ← Δ ≠ 0 : non dégénérée
  — A = [[4,-4],[-4,-2]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = −360 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 4·(−2) − □²   (trous : 4·(−2) − (−4)²)   ← δ = ac − (b/2)²
    = □   (trous : −24)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 2λ − 24 = 0
    ? δ = det A = −24 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    = λ = 6 ou λ = −4   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 4·(−2) − (□)² | δ = −24, Δ = −360 : une hyperbole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_det_sign_nature

Quelle est la nature de la conique −2x² − 8xy + 4y² + 4x − 16y + 1 = 0 ?
  [guided]  det(M)
    (A = [[-2,-4],[-4,4]] et M = [[-2,-4,2],[-4,4,-8],[2,-8,1]].)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[-2,-4,2],[-4,4,-8],[2,-8,1]]   (cases à remplir : (1,2) (2,1) (1,3) (3,1))   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = -2·det[[4,-8],[-8,1]]+4·det[[-4,-8],[2,1]]+2·det[[-4,4],[2,-8]]   ← Développer selon la 1re ligne
    = □   (trous : 216)   ← Δ ≠ 0 : non dégénérée
  — A = [[-2,-4],[-4,4]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = 216 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = (−2)·4 − □²   (trous : (−2)·4 − (−4)²)   ← δ = ac − (b/2)²
    = □   (trous : −24)
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 2λ − 24 = 0
    ? δ = det A = −24 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    = λ = 6 ou λ = −4   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = (−2)·4 − (□)² | δ = −24, Δ = 216 : une hyperbole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_det_sign_nature

```

### Niveau 3

```
Quelle est la nature de la conique −6xy + 15x − 6y + 15 = 0 ?
  [tap, suivre l'erreur, menu menu]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[0,-3,15/2],[-3,0,-3],[15/2,-3,15]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 3·det[[-3,-3],[15/2,15]]+15/2·det[[-3,0],[15/2,-3]]   ← Développer selon la 1re ligne
    = 0   ← Δ = 0 : dégénérée
  — A = [[0,-3],[-3,0]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = 0 : la conique est… · non dégénérée (Δ ≠ 0) / ✔ dégénérée (Δ = 0)
    = 0·0 − (−3)²   ← δ = ac − (b/2)²
    = −9
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 9 = 0
    ? δ = det A = −9 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    ? Dégénérée : laquelle ? · δ > 0 : un point / ✔ δ < 0 : deux droites sécantes / · δ = 0 : deux droites parallèles, une droite double, ou vide
    = λ = 3 ou λ = −3   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 0·0 − (□)² | δ = −9, Δ = 0 : deux droites sécantes
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_degenerate_ignored, g10_det_sign_nature

Quelle est la nature de la conique 3x² + 10xy + 3y² + 11x − 7y − 20 = 0 ?
  [tap, suivre l'erreur, menu menu]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[3,5,11/2],[5,3,-7/2],[11/2,-7/2,-20]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 3·det[[3,-7/2],[-7/2,-20]]-5·det[[5,-7/2],[11/2,-20]]+11/2·det[[5,3],[11/2,-7/2]]   ← Développer selon la 1re ligne
    = 0   ← Δ = 0 : dégénérée
  — A = [[3,5],[5,3]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = 0 : la conique est… · non dégénérée (Δ ≠ 0) / ✔ dégénérée (Δ = 0)
    = 3·3 − 5²   ← δ = ac − (b/2)²
    = −16
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 6λ − 16 = 0
    ? δ = det A = −16 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    ? Dégénérée : laquelle ? · δ > 0 : un point / ✔ δ < 0 : deux droites sécantes / · δ = 0 : deux droites parallèles, une droite double, ou vide
    = λ = 8 ou λ = −2   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 3·3 − (□)² | δ = −16, Δ = 0 : deux droites sécantes
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_degenerate_ignored, g10_det_sign_nature

Quelle est la nature de la conique −x² − 4xy − 4y² + 10x + 15y − 19 = 0 ?
  [tap, suivre l'erreur, menu menu]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[-1,-2,5],[-2,-4,15/2],[5,15/2,-19]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = -det[[-4,15/2],[15/2,-19]]+2·det[[-2,15/2],[5,-19]]+5·det[[-2,-4],[5,15/2]]   ← Développer selon la 1re ligne
    = 25/4   ← Δ ≠ 0 : non dégénérée
  — A = [[-1,-2],[-2,-4]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = 25/4 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = (−1)·(−4) − (−2)²   ← δ = ac − (b/2)²
    = 0
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² + 5λ = 0
    ? δ = det A = 0 : genre ? · δ > 0 (λ de même signe) : genre ellipse / · δ < 0 (λ de signes contraires) : genre hyperbole / ✔ δ = 0 (une λ nulle) : genre parabole
    = λ = 0 ou λ = −5   ← Une valeur propre nulle
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = (−1)·(−4) − (□)² | δ = 0, Δ = 25/4 : une parabole
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

```

### Niveau 4

```
Quelle est la nature de la conique 2y² − 2x − 8y + 4 = 0 ?
  [free, suivre l'erreur]  δ
    (A = [[0,0],[0,2]]. Et δ = det A ?)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / ✔ Compléter les carrés
    ? Δ = −2 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 0·2 − 0²   ← δ = ac − (b/2)²
    = 0
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 2λ = 0
    ? δ = det A = 0 : genre ? · δ > 0 (λ de même signe) : genre ellipse / · δ < 0 (λ de signes contraires) : genre hyperbole / ✔ δ = 0 (une λ nulle) : genre parabole
    = λ = 2 ou λ = 0   ← Une valeur propre nulle
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 0·2 − (□)² | δ = 0, Δ = −2 : une parabole
  pièges : g10_bhalf_matrix

Quelle est la nature de la conique 4y² − x − 4 = 0 ?
  [free, suivre l'erreur]  δ
    (A = [[0,0],[0,4]]. Et δ = det A ?)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / ✔ Compléter les carrés
    ? Δ = −1 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 0·4 − 0²   ← δ = ac − (b/2)²
    = 0
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 4λ = 0
    ? δ = det A = 0 : genre ? · δ > 0 (λ de même signe) : genre ellipse / · δ < 0 (λ de signes contraires) : genre hyperbole / ✔ δ = 0 (une λ nulle) : genre parabole
    = λ = 4 ou λ = 0   ← Une valeur propre nulle
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = 0·4 − (□)² | δ = 0, Δ = −1 : une parabole
  pièges : g10_bhalf_matrix

Quelle est la nature de la conique −x² + 4y² − 6x + 32y + 58 = 0 ?
  [free, suivre l'erreur]  δ
    (A = [[-1,0],[0,4]]. Et δ = det A ?)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / ✔ Compléter les carrés
    ? Δ = −12 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = (−1)·4 − 0²   ← δ = ac − (b/2)²
    = −4
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 3λ − 4 = 0
    ? δ = det A = −4 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    = λ = 4 ou λ = −1   ← Signes contraires
  aides : Hors de la diagonale de A, on met la moitié du coefficient de xy. Calcule d'abord Δ = det M, puis δ = det A. | δ = (−1)·4 − (□)² | δ = −4, Δ = −12 : une hyperbole
  pièges : g10_bhalf_matrix, g10_det_sign_nature

```

### Niveau 5

```
Quelle est la nature de la conique 2x² − 8xy + 2y² + 12y + 3 = 0 ? Si elle a un centre, donne aussi son équation réduite.
  [free, sans aide]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[2,-4,0],[-4,2,6],[0,6,3]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 2·det[[2,6],[6,3]]+4·det[[-4,6],[0,3]]   ← Développer selon la 1re ligne
    = −108   ← Δ ≠ 0 : non dégénérée
  — A = [[2,-4],[-4,2]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = −108 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 2·2 − (−4)²   ← δ = ac − (b/2)²
    = −12
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 4λ − 12 = 0
    ? δ = det A = −12 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    = λ = 6 ou λ = −2   ← Signes contraires
  — Écris l'équation réduite dans un repère orthonormé de ses axes, centré en Ω : λ₁X² + λ₂Y² + f(Ω) = 0, avec f(Ω) = Δ/δ.  [juge conic]  départ : 2x² − 8xy + 2y² + 12y + 3 = 0
    = 6X² − 2Y² + 9 = 0   ← f(Ω) = Δ/δ = 9
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_det_sign_nature

Quelle est la nature de la conique x² + 4xy + 4y² + 18x + 21y + 12 = 0 ? Si elle a un centre, donne aussi son équation réduite.
  [free, sans aide]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[1,2,9],[2,4,21/2],[9,21/2,12]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = det[[4,21/2],[21/2,12]]-2·det[[2,21/2],[9,12]]+9·det[[2,4],[9,21/2]]   ← Développer selon la 1re ligne
    = −225/4   ← Δ ≠ 0 : non dégénérée
  — A = [[1,2],[2,4]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = −225/4 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 1·4 − 2²   ← δ = ac − (b/2)²
    = 0
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 5λ = 0
    ? δ = det A = 0 : genre ? · δ > 0 (λ de même signe) : genre ellipse / · δ < 0 (λ de signes contraires) : genre hyperbole / ✔ δ = 0 (une λ nulle) : genre parabole
    = λ = 5 ou λ = 0   ← Une valeur propre nulle
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

Quelle est la nature de la conique 2x² − 8xy + 2y² + 8x − 28y + 24 = 0 ? Si elle a un centre, donne aussi son équation réduite.
  [free, sans aide]  det(M)
    (Calcule Δ = det M.)
    ? Par quoi commencer ? ✔ Écrire A et M, puis calculer Δ = det M / ✔ Calculer tout de suite les valeurs propres de A / · Compléter les carrés
    = det[[2,-4,4],[-4,2,-14],[4,-14,24]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 2·det[[2,-14],[-14,24]]+4·det[[-4,-14],[4,24]]+4·det[[-4,2],[4,-14]]   ← Développer selon la 1re ligne
    = −264   ← Δ ≠ 0 : non dégénérée
  — A = [[2,-4],[-4,2]]. Et δ = det A ?  [juge value]  départ : δ
    ? Δ = −264 : la conique est… ✔ non dégénérée (Δ ≠ 0) / · dégénérée (Δ = 0)
    = 2·2 − (−4)²   ← δ = ac − (b/2)²
    = −12
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 4λ − 12 = 0
    ? δ = det A = −12 : genre ? · δ > 0 (λ de même signe) : genre ellipse / ✔ δ < 0 (λ de signes contraires) : genre hyperbole / · δ = 0 (une λ nulle) : genre parabole
    = λ = 6 ou λ = −2   ← Signes contraires
  — Écris l'équation réduite dans un repère orthonormé de ses axes, centré en Ω : λ₁X² + λ₂Y² + f(Ω) = 0, avec f(Ω) = Δ/δ.  [juge conic]  départ : 2x² − 8xy + 2y² + 8x − 28y + 24 = 0
    = 6X² − 2Y² + 22 = 0   ← f(Ω) = Δ/δ = 22
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix, g10_det_sign_nature

```

### Variantes d'examen

```
Laquelle de ces coniques est une parabole ?
  · 4x² + 8xy + 16y² − 2x + 5y − 6 = 0 [g10_bhalf_matrix]   ✔ −x² − 2xy − y² − x − 7y + 14 = 0   · −2x² + 2xy − 2y² + 8x + 2y + 10 = 0 [g10_det_sign_nature]   · x² + 10xy + y² − 4x + 28y − 11 = 0 [g10_det_sign_nature]
  [examen mcq]
  pièges : g10_bhalf_matrix, g10_det_sign_nature

Vrai ou faux ?
  « Si δ = det A < 0 et Δ = det M ≠ 0, la conique est une hyperbole. » → VRAI
  [examen tf]

Quelle est la nature de la conique 4x² + 2xy + 4y² − 14x − 26y + 41 = 0 ? Si elle a un centre, donne aussi son équation réduite.
  [free, sans aide, examen open]  det(M)
    (Calcule Δ = det M.)
    = det[[4,1,-7],[1,4,-13],[-7,-13,41]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 4·det[[4,-13],[-13,41]]-det[[1,-13],[-7,41]]-7·det[[1,4],[-7,-13]]   ← Développer selon la 1re ligne
    = −75   ← Δ ≠ 0 : non dégénérée
  — A = [[4,1],[1,4]]. Et δ = det A ?  [juge value]  départ : δ
    = 4·4 − 1²   ← δ = ac − (b/2)²
    = 15
  — Contrôle par les valeurs propres de A.  [juge solset]  départ : λ² − 8λ + 15 = 0
    = λ = 5 ou λ = 3   ← Même signe
  — Écris l'équation réduite dans un repère orthonormé de ses axes, centré en Ω : λ₁X² + λ₂Y² + f(Ω) = 0, avec f(Ω) = Δ/δ.  [juge conic]  départ : 4x² + 2xy + 4y² − 14x − 26y + 41 = 0
    = 5X² + 3Y² − 5 = 0   ← f(Ω) = Δ/δ = −5
  pièges : l_cofactor_sign, l_minor_wrong, g10_bhalf_matrix

```

## Réduire une conique avec un terme en xy (`g10-conic-reduce`, CMS)

_Valeurs et vecteurs propres de A, centre, constante f(Ω)._

### Niveau 1

```
Dans un repère orthonormé Re, on donne la conique 3x² − 4xy − 22x + 4y + 1 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[3,-2],[-2,0]] (b/2 = −2 hors de la diagonale).)
    = det[[3-λ,-2],[-2,-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = −2 hors de la diagonale
    = (3 − λ)(−λ) − □²   (trous : (3 − λ)(−λ) − (−2)²)   ← Déterminant 2 × 2
    = λ² − 3λ□   (trous : λ² − 3λ − 4)   ← Développer
    = (λ + 1)(λ − 4)   ← λ₁ = −1, λ₂ = 4
  — λ₁ = −1. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -2)   (cases à remplir : (2,1))   ← (A + 1I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(-1;-2)/□   (trous : u_1 = (-1 ; -2)/√5)   ← ‖(−1 ; −2)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2=(□;-1)/√5   (trous : u_2 = (2 ; -1)/√5)   ← λ₂ = 4
  — Le centre Ω : ∂f/∂x = 6x − 4y − 22 = 0 et ∂f/∂y = −4x + 4 = 0.  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (1 ; -4))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 3·1² + (−4)·1·(−4) + (−22)·1 + 4·(−4) + 1
    = □   (trous : −18)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 3x² − 4xy − 22x + 4y + 1 = 0
    = □ + □ − 18 = 0   (trous : −X² + 4Y² − 18 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (3 − λ)(0 − λ) − □ = 0 | −X² + 4Y² − 18 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique x² + 6xy + y² − 2x − 22y + 6 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[1,3],[3,1]] (b/2 = 3 hors de la diagonale).)
    = det[[1-λ,3],[3,1-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = 3 hors de la diagonale
    = (1 − λ)(1 − λ) − □²   (trous : (1 − λ)(1 − λ) − 3²)   ← Déterminant 2 × 2
    = λ² − 2λ□   (trous : λ² − 2λ − 8)   ← Développer
    = (λ − 4)(λ + 2)   ← λ₁ = 4, λ₂ = −2
  — λ₁ = 4. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (1 ; 1)   (cases à remplir : (2,1))   ← (A − 4I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(1;1)/□   (trous : u_1 = (1 ; 1)/√2)   ← ‖(1 ; 1)‖ = √2
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2=(□;1)/√2   (trous : u_2 = (-1 ; 1)/√2)   ← λ₂ = −2
  — Le centre Ω : ∂f/∂x = 2x + 6y − 2 = 0 et ∂f/∂y = 6x + 2y − 22 = 0.  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (4 ; -1))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 4² + 6·4·(−1) + (−1)² + (−2)·4 + (−22)·(−1) + 6
    = □   (trous : 13)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : x² + 6xy + y² − 2x − 22y + 6 = 0
    = □ − □ + 13 = 0   (trous : 4X² − 2Y² + 13 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (1 − λ)(1 − λ) − □ = 0 | 4X² − 2Y² + 13 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique 10xy + 10x + 30y + 40 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[0,5],[5,0]] (b/2 = 5 hors de la diagonale).)
    = det[[-λ,5],[5,-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = 5 hors de la diagonale
    = (−λ)(−λ) − □²   (trous : (−λ)(−λ) − 5²)   ← Déterminant 2 × 2
    = λ²□   (trous : λ² − 25)   ← Développer
    = (λ − 5)(λ + 5)   ← λ₁ = 5, λ₂ = −5
  — λ₁ = 5. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (1 ; 1)   (cases à remplir : (2,1))   ← (A − 5I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(1;1)/□   (trous : u_1 = (1 ; 1)/√2)   ← ‖(1 ; 1)‖ = √2
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2=(□;1)/√2   (trous : u_2 = (-1 ; 1)/√2)   ← λ₂ = −5
  — Le centre Ω : ∂f/∂x = 10y + 10 = 0 et ∂f/∂y = 10x + 30 = 0.  [juge vector]  départ : Ω
    = Ω=(□;□)   (trous : Ω = (-3 ; -1))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 10·(−3)·(−1) + 10·(−3) + 30·(−1) + 40
    = □   (trous : 10)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 10xy + 10x + 30y + 40 = 0
    = □ − □ + 10 = 0   (trous : 5X² − 5Y² + 10 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (0 − λ)(0 − λ) − □ = 0 | 5X² − 5Y² + 10 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

### Niveau 2

```
Dans un repère orthonormé Re, on donne la conique 5x² + 8xy − y² − 16x − 38y − 39 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[5,4],[4,-1]] (b/2 = 4 hors de la diagonale).)
    = det[[5-λ,4],[4,-1-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = 4 hors de la diagonale
    = (5 − λ)(−1 − λ) − □²   (trous : (5 − λ)(−1 − λ) − 4²)   ← Déterminant 2 × 2
    = λ² − 4λ − 21   ← Développer
    = (λ − 7)(λ + 3)   ← λ₁ = 7, λ₂ = −3
  — λ₁ = 7. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-2 ; -1)   (cases à remplir : (1,1) (2,1))   ← (A − 7I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(-2;-1)/□   (trous : u_1 = (-2 ; -1)/√5)   ← ‖(−2 ; −1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = □/√5   (trous : u_2 = (1 ; -2)/√5)   ← λ₂ = −3
  — Le centre Ω : ∂f/∂x = 10x + 8y − 16 = 0 et ∂f/∂y = 8x − 2y − 38 = 0.  [juge vector]  départ : Ω
    ? La conique a-t-elle un centre ? ✔ Oui : δ = λ₁λ₂ = −21 ≠ 0 / · Non : il faut compléter un carré après la rotation
    = Ω=(□;□)   (trous : Ω = (4 ; -3))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 5·4² + 8·4·(−3) − (−3)² + (−16)·4 + (−38)·(−3) + (−39)
    = □   (trous : −14)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 5x² + 8xy − y² − 16x − 38y − 39 = 0
    = □ − □ − 14 = 0   (trous : 7X² − 3Y² − 14 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (5 − λ)(−1 − λ) − □ = 0 | 7X² − 3Y² − 14 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique −3x² − 8xy + 3y² + 24x + 32y − 58 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[-3,-4],[-4,3]] (b/2 = −4 hors de la diagonale).)
    = det[[-3-λ,-4],[-4,3-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = −4 hors de la diagonale
    = (−3 − λ)(3 − λ) − □²   (trous : (−3 − λ)(3 − λ) − (−4)²)   ← Déterminant 2 × 2
    = λ² − 25   ← Développer
    = (λ + 5)(λ − 5)   ← λ₁ = −5, λ₂ = 5
  — λ₁ = −5. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-2 ; -1)   (cases à remplir : (1,1) (2,1))   ← (A + 5I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(-2;-1)/□   (trous : u_1 = (-2 ; -1)/√5)   ← ‖(−2 ; −1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = □/√5   (trous : u_2 = (1 ; -2)/√5)   ← λ₂ = 5
  — Le centre Ω : ∂f/∂x = −6x − 8y + 24 = 0 et ∂f/∂y = −8x + 6y + 32 = 0.  [juge vector]  départ : Ω
    ? La conique a-t-elle un centre ? ✔ Oui : δ = λ₁λ₂ = −25 ≠ 0 / · Non : il faut compléter un carré après la rotation
    = Ω=(□;□)   (trous : Ω = (4 ; 0))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : (−3)·4² + (−8)·4·0 + 3·0² + 24·4 + 32·0 + (−58)
    = □   (trous : −10)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : −3x² − 8xy + 3y² + 24x + 32y − 58 = 0
    = □ + □ − 10 = 0   (trous : −5X² + 5Y² − 10 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (−3 − λ)(3 − λ) − □ = 0 | −5X² + 5Y² − 10 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique 8xy + 6y² + 8x + 28y + 42 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [guided]  det(A − λI)
    (A = [[0,4],[4,6]] (b/2 = 4 hors de la diagonale).)
    = det[[-λ,4],[4,6-λ]]   (cases à remplir : (1,2) (2,1))   ← A = [[a, b/2], [b/2, c]] : b/2 = 4 hors de la diagonale
    = (−λ)(6 − λ) − □²   (trous : (−λ)(6 − λ) − 4²)   ← Déterminant 2 × 2
    = λ² − 6λ − 16   ← Développer
    = (λ − 8)(λ + 2)   ← λ₁ = 8, λ₂ = −2
  — λ₁ = 8. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -2)   (cases à remplir : (1,1) (2,1))   ← (A − 8I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1=(-1;-2)/□   (trous : u_1 = (-1 ; -2)/√5)   ← ‖(−1 ; −2)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = □/√5   (trous : u_2 = (2 ; -1)/√5)   ← λ₂ = −2
  — Le centre Ω : ∂f/∂x = 8y + 8 = 0 et ∂f/∂y = 8x + 12y + 28 = 0.  [juge vector]  départ : Ω
    ? La conique a-t-elle un centre ? ✔ Oui : δ = λ₁λ₂ = −16 ≠ 0 / · Non : il faut compléter un carré après la rotation
    = Ω=(□;□)   (trous : Ω = (-2 ; -1))   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 8·(−2)·(−1) + 6·(−1)² + 8·(−2) + 28·(−1) + 42
    = □   (trous : 20)   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 8xy + 6y² + 8x + 28y + 42 = 0
    = □ − □ + 20 = 0   (trous : 8X² − 2Y² + 20 = 0)   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (0 − λ)(6 − λ) − □ = 0 | 8X² − 2Y² + 20 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

### Niveau 3

```
Dans un repère orthonormé Re, on donne la conique 2x² + 4xy − y² − 4x − 22y − 24 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (A = [[2,2],[2,-1]] (b/2 = 2 hors de la diagonale).)
    = det[[2-λ,2],[2,-1-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 2 hors de la diagonale
    = (2 − λ)(−1 − λ) − 2²   ← Déterminant 2 × 2
    = λ² − λ − 6   ← Développer
    = (λ − 3)(λ + 2)   ← λ₁ = 3, λ₂ = −2
  — λ₁ = 3. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← (A − 3I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (2 ; 1)/√5   ← ‖(2 ; 1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (-1 ; 2)/√5   ← λ₂ = −2
  — Le centre Ω : ∂f/∂x = 4x + 4y − 4 = 0 et ∂f/∂y = 4x − 2y − 22 = 0.  [juge vector]  départ : Ω
    = Ω = (4 ; -3)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 2·4² + 4·4·(−3) − (−3)² + (−4)·4 + (−22)·(−3) + (−24)
    = 1   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 2x² + 4xy − y² − 4x − 22y − 24 = 0
    = 3X² − 2Y² + 1 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (2 − λ)(−1 − λ) − □ = 0 | 3X² − 2Y² + 1 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique 3x² + 4xy + 16x + 16y + 1 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (A = [[3,2],[2,0]] (b/2 = 2 hors de la diagonale).)
    = det[[3-λ,2],[2,-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 2 hors de la diagonale
    = (3 − λ)(−λ) − 2²   ← Déterminant 2 × 2
    = λ² − 3λ − 4   ← Développer
    = (λ − 4)(λ + 1)   ← λ₁ = 4, λ₂ = −1
  — λ₁ = 4. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← (A − 4I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (2 ; 1)/√5   ← ‖(2 ; 1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (-1 ; 2)/√5   ← λ₂ = −1
  — Le centre Ω : ∂f/∂x = 6x + 4y + 16 = 0 et ∂f/∂y = 4x + 16 = 0.  [juge vector]  départ : Ω
    = Ω = (-4 ; 2)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 3·(−4)² + 4·(−4)·2 + 16·(−4) + 16·2 + 1
    = −15   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 3x² + 4xy + 16x + 16y + 1 = 0
    = 4X² − Y² − 15 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (3 − λ)(0 − λ) − □ = 0 | 4X² − Y² − 15 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique 3x² + 4xy + 8x + 16y − 13 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (A = [[3,2],[2,0]] (b/2 = 2 hors de la diagonale).)
    = det[[3-λ,2],[2,-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 2 hors de la diagonale
    = (3 − λ)(−λ) − 2²   ← Déterminant 2 × 2
    = λ² − 3λ − 4   ← Développer
    = (λ − 4)(λ + 1)   ← λ₁ = 4, λ₂ = −1
  — λ₁ = 4. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-2 ; -1)   ← (A − 4I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-2 ; -1)/√5   ← ‖(−2 ; −1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (1 ; -2)/√5   ← λ₂ = −1
  — Le centre Ω : ∂f/∂x = 6x + 4y + 8 = 0 et ∂f/∂y = 4x + 16 = 0.  [juge vector]  départ : Ω
    = Ω = (-4 ; 4)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 3·(−4)² + 4·(−4)·4 + 8·(−4) + 16·4 + (−13)
    = 3   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 3x² + 4xy + 8x + 16y − 13 = 0
    = 4X² − Y² + 3 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (3 − λ)(0 − λ) − □ = 0 | 4X² − Y² + 3 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

### Niveau 4

```
Dans un repère orthonormé Re, on donne la conique −x² − 4xy − 4y² + 16x + 12y − 8 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l'équation dans le repère Ru.
  [free, suivre l'erreur]  det(A − λI)
    (A = [[-1,-2],[-2,-4]] (b/2 = −2 hors de la diagonale).)
    = det[[-1-λ,-2],[-2,-4-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = −2 hors de la diagonale
    = (−1 − λ)(−4 − λ) − (−2)²   ← Déterminant 2 × 2
    = λ² + 5λ   ← Développer
    = λ(λ + 5)   ← λ₁ = −5, λ₂ = 0
  — λ₁ = −5. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -2)   ← (A + 5I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-1 ; -2)/√5   ← ‖(−1 ; −2)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (2 ; -1)/√5   ← λ₂ = 0
  — Dans le repère (O ; u₁, u₂), x = X·u₁ + Y·u₂ : l'équation sans terme en XY.  [juge conic]  départ : −x² − 4xy − 4y² + 16x + 12y − 8 = 0
    = −5X² + (−40/√5)X + (20/√5)Y + (−8) = 0   ← λ₁ = −5 devant X², λ₂ = 0 : pas de Y²
    = −5X² + 4√5·Y = 0   ← Compléter le carré et translater au sommet S
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (−1 − λ)(−4 − λ) − □ = 0 | λ₁X² + μY = 0 au sommet
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique −4x² − 4xy − y² − 4x + 8y − 40 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l'équation dans le repère Ru.
  [free, suivre l'erreur]  det(A − λI)
    (A = [[-4,-2],[-2,-1]] (b/2 = −2 hors de la diagonale).)
    = det[[-4-λ,-2],[-2,-1-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = −2 hors de la diagonale
    = (−4 − λ)(−1 − λ) − (−2)²   ← Déterminant 2 × 2
    = λ² + 5λ   ← Développer
    = λ(λ + 5)   ← λ₁ = −5, λ₂ = 0
  — λ₁ = −5. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-2 ; -1)   ← (A + 5I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-2 ; -1)/√5   ← ‖(−2 ; −1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (1 ; -2)/√5   ← λ₂ = 0
  — Dans le repère (O ; u₁, u₂), x = X·u₁ + Y·u₂ : l'équation sans terme en XY.  [juge conic]  départ : −4x² − 4xy − y² − 4x + 8y − 40 = 0
    = −5X² + (0/√5)X + (−20/√5)Y + (−40) = 0   ← λ₁ = −5 devant X², λ₂ = 0 : pas de Y²
    = −5X² − 4√5·Y = 0   ← Compléter le carré et translater au sommet S
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (−4 − λ)(−1 − λ) − □ = 0 | λ₁X² + μY = 0 au sommet
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique 2x² − 2xy + 2y² − 8x + 10y − 5 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru.
  [free, suivre l'erreur]  det(A − λI)
    (A = [[2,-1],[-1,2]] (b/2 = −1 hors de la diagonale).)
    = det[[2-λ,-1],[-1,2-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = −1 hors de la diagonale
    = (2 − λ)(2 − λ) − (−1)²   ← Déterminant 2 × 2
    = λ² − 4λ + 3   ← Développer
    = (λ − 1)(λ − 3)   ← λ₁ = 1, λ₂ = 3
  — λ₁ = 1. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -1)   ← (A − 1I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-1 ; -1)/√2   ← ‖(−1 ; −1)‖ = √2
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (1 ; -1)/√2   ← λ₂ = 3
  — Le centre Ω : ∂f/∂x = 4x − 2y − 8 = 0 et ∂f/∂y = −2x + 4y + 10 = 0.  [juge vector]  départ : Ω
    = Ω = (1 ; -2)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : 2·1² + (−2)·1·(−2) + 2·(−2)² + (−8)·1 + 10·(−2) + (−5)
    = −19   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : 2x² − 2xy + 2y² − 8x + 10y − 5 = 0
    = X² + 3Y² − 19 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  aides : Diagonalise A : les valeurs propres sont les coefficients de X² et Y². Le centre annule ∂f/∂x et ∂f/∂y. | (2 − λ)(2 − λ) − □ = 0 | X² + 3Y² − 19 = 0
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

### Niveau 5

```
Dans un repère orthonormé Re, on donne la conique 4x² + 4xy + y² + 19x + 2y + 7 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l'équation dans le repère Ru.
  [free, sans aide]  det(A − λI)
    (A = [[4,2],[2,1]] (b/2 = 2 hors de la diagonale).)
    = det[[4-λ,2],[2,1-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 2 hors de la diagonale
    = (4 − λ)(1 − λ) − 2²   ← Déterminant 2 × 2
    = λ² − 5λ   ← Développer
    = λ(λ − 5)   ← λ₁ = 5, λ₂ = 0
  — λ₁ = 5. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← (A − 5I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (2 ; 1)/√5   ← ‖(2 ; 1)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (-1 ; 2)/√5   ← λ₂ = 0
  — Dans le repère (O ; u₁, u₂), x = X·u₁ + Y·u₂ : l'équation sans terme en XY.  [juge conic]  départ : 4x² + 4xy + y² + 19x + 2y + 7 = 0
    = 5X² + (40/√5)X + (−15/√5)Y + 7 = 0   ← λ₁ = 5 devant X², λ₂ = 0 : pas de Y²
    = 5X² − 3√5·Y = 0   ← Compléter le carré et translater au sommet S
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique −2x² + 8xy − 2y² + 12y + 9 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru, et enfin les foyers dans Re.
  [free, sans aide]  det(A − λI)
    (A = [[-2,4],[4,-2]] (b/2 = 4 hors de la diagonale).)
    = det[[-2-λ,4],[4,-2-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 4 hors de la diagonale
    = (−2 − λ)(−2 − λ) − 4²   ← Déterminant 2 × 2
    = λ² + 4λ − 12   ← Développer
    = (λ − 2)(λ + 6)   ← λ₁ = 2, λ₂ = −6
  — λ₁ = 2. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -1)   ← (A − 2I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-1 ; -1)/√2   ← ‖(−1 ; −1)‖ = √2
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (1 ; -1)/√2   ← λ₂ = −6
  — Le centre Ω : ∂f/∂x = −4x + 8y = 0 et ∂f/∂y = 8x − 4y + 12 = 0.  [juge vector]  départ : Ω
    = Ω = (-2 ; -1)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : (−2)·(−2)² + 8·(−2)·(−1) + (−2)·(−1)² + 12·(−1) + 9
    = 3   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : −2x² + 8xy − 2y² + 12y + 9 = 0
    = 2X² − 6Y² + 3 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  — Les foyers dans le repère initial Re.  [juge conic]  départ : −(2/3)X² + 2Y² = 1
    = F = (-3 ; 0) ; F' = (-1 ; -2)   ← c² = a² + b² ; F = Ω ± c·u, u sur l'axe réel
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique x² + 2xy + y² + x + 3y − 4 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, puis l'équation dans le repère Ru.
  [free, sans aide]  det(A − λI)
    (A = [[1,1],[1,1]] (b/2 = 1 hors de la diagonale).)
    = det[[1-λ,1],[1,1-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 1 hors de la diagonale
    = (1 − λ)(1 − λ) − 1²   ← Déterminant 2 × 2
    = λ² − 2λ   ← Développer
    = λ(λ − 2)   ← λ₁ = 2, λ₂ = 0
  — λ₁ = 2. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -1)   ← (A − 2I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-1 ; -1)/√2   ← ‖(−1 ; −1)‖ = √2
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (1 ; -1)/√2   ← λ₂ = 0
  — Dans le repère (O ; u₁, u₂), x = X·u₁ + Y·u₂ : l'équation sans terme en XY.  [juge conic]  départ : x² + 2xy + y² + x + 3y − 4 = 0
    = 2X² + (−4/√2)X + (−2/√2)Y + (−4) = 0   ← λ₁ = 2 devant X², λ₂ = 0 : pas de Y²
    = 2X² − 1√2·Y = 0   ← Compléter le carré et translater au sommet S
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

### Variantes d'examen

```
On réduit la conique 3x² + 4xy + 3y² − 6x − 4y − 17 = 0 dans un repère orthonormé de ses axes, centré en son centre : λ₁X² + λ₂Y² + c = 0, avec λ₁ > λ₂. Que vaut λ₁ ?
  [free, sans aide, examen coef]  λ_1
    = 5
  pièges : g10_bhalf_matrix

Dans un repère orthonormé Re, on donne la conique −4x² + 8xy + 2y² − 24x + 36y − 18 = 0. Réduis-la : valeurs propres et vecteurs propres normés de A, centre Ω, constante f(Ω), puis l'équation dans le repère Ru, et enfin les foyers dans Re.
  [free, sans aide, examen open]  det(A − λI)
    (A = [[-4,4],[4,2]] (b/2 = 4 hors de la diagonale).)
    = det[[-4-λ,4],[4,2-λ]]   ← A = [[a, b/2], [b/2, c]] : b/2 = 4 hors de la diagonale
    = (−4 − λ)(2 − λ) − 4²   ← Déterminant 2 × 2
    = λ² + 2λ − 24   ← Développer
    = (λ − 4)(λ + 6)   ← λ₁ = 4, λ₂ = −6
  — λ₁ = 4. Un vecteur propre ?  [juge eigvec]  départ : v_1
    = (-1 ; -2)   ← (A − 4I)v = 0
  — Norme-le.  [juge vector]  départ : u_1
    = u_1 = (-1 ; -2)/√5   ← ‖(−1 ; −2)‖ = √5
  — u₂ est orthogonal à u₁ (A est symétrique), et le repère est direct : u₂ = u₁ tourné de +90°.  [juge vector]  départ : u_2
    = u_2 = (2 ; -1)/√5   ← λ₂ = −6
  — Le centre Ω : ∂f/∂x = −8x + 8y − 24 = 0 et ∂f/∂y = 8x + 4y + 36 = 0.  [juge vector]  départ : Ω
    = Ω = (-4 ; -1)   ← Résoudre le système
  — La constante f(Ω) ?  [juge value]  départ : (−4)·(−4)² + 8·(−4)·(−1) + 2·(−1)² + (−24)·(−4) + 36·(−1) + (−18)
    = 12   ← Remplacer x et y par les coordonnées de Ω
  — L'équation dans le repère Ru = (Ω ; u₁, u₂).  [juge conic]  départ : −4x² + 8xy + 2y² − 24x + 36y − 18 = 0
    = 4X² − 6Y² + 12 = 0   ← λ₁X² + λ₂Y² + f(Ω) = 0
  — Les foyers dans le repère initial Re.  [juge conic]  départ : −(1/3)X² + (1/2)Y² = 1
    = F = (-6 ; 0) ; F' = (-2 ; -2)   ← c² = a² + b² ; F = Ω ± c·u, u sur l'axe réel
  pièges : l_charpoly_sign, l_lambda_one_entry, g10_bhalf_matrix

```

## Revenir au repère initial ; esquisser (`g10-conic-frame-back`, CMS)

_Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂._

### Niveau 1

```
La conique 7x² + 2xy + 7y² − 40x + 8y + 52 = 0 a pour équation réduite X²/(3/2) + Y²/2 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (3 ; −1), u₁ = (1 ; 1)/√2 et u₂ = (−1 ; 1)/√2. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² − b², avec a² = 2 et b² = 3/2.)
    = √(2 − □)   (trous : √(2 − 3/2))   ← Ellipse : c² = a² − b²
    = □   (trous : √2/2)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; √2/2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_2   (trous : F = Ω + √2/2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; √2/2)
    = F=(3;-1)+□   (trous : F = (3 ; -1) + (-1/2 ; 1/2))   ← √2/2·u₂ = (−1/2 ; 1/2)
    = (□;□)   (trous : (5/2 ; -1/2))
  — F' est en (0 ; −√2/2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_2   (trous : F′ = Ω − √2/2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; −√2/2)
    = F'=(3;-1)+□   (trous : F' = (3 ; -1) + (1/2 ; -1/2))   ← √2/2·u₂ = (1/2 ; −1/2)
    = (□;□)   (trous : (7/2 ; -3/2))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (3 ; −1) + √2/2·(□) | F = (5/2 ; −1/2)

La conique −x² + 4xy + 2y² + 4x − 8y + 20 = 0 a pour équation réduite −X²/8 + Y²/12 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (2 ; 0), u₁ = (−1 ; −2)/√5 et u₂ = (2 ; −1)/√5. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² + b², avec a² = 12 et b² = 8.)
    = √(12 + □)   (trous : √(12 + 8))   ← Hyperbole : c² = a² + b²
    = □   (trous : 2√5)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 2√5) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_2   (trous : F = Ω + 2√5·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√5)
    = F=(2;0)+□   (trous : F = (2 ; 0) + (4 ; -2))   ← 2√5·u₂ = (4 ; −2)
    = (□;□)   (trous : (6 ; -2))
  — F' est en (0 ; −2√5) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_2   (trous : F′ = Ω − 2√5·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√5)
    = F'=(2;0)+□   (trous : F' = (2 ; 0) + (-4 ; 2))   ← 2√5·u₂ = (−4 ; 2)
    = (□;□)   (trous : (-2 ; 2))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (2 ; 0) + 2√5·(□) | F = (6 ; −2)

La conique −2x² + 4xy − 5y² + 12y + 12 = 0 a pour équation réduite X²/24 + Y²/4 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (2 ; 2), u₁ = (−2 ; −1)/√5 et u₂ = (1 ; −2)/√5. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² − b², avec a² = 24 et b² = 4.)
    = √(24 − 4)   ← Ellipse : c² = a² − b²
    = □   (trous : 2√5)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (2√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_1   (trous : F = Ω + 2√5·u_1)   ← Ω + X·u₁ + Y·u₂ avec (2√5 ; 0)
    = F=(2;2)+□   (trous : F = (2 ; 2) + (-4 ; -2))   ← 2√5·u₁ = (−4 ; −2)
    = (□;□)   (trous : (-2 ; 0))
  — F' est en (−2√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_1   (trous : F′ = Ω − 2√5·u_1)   ← Ω + X·u₁ + Y·u₂ avec (−2√5 ; 0)
    = F'=(2;2)+□   (trous : F' = (2 ; 2) + (4 ; 2))   ← 2√5·u₁ = (4 ; 2)
    = (□;□)   (trous : (6 ; 4))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (2 ; 2) + 2√5·(□) | F = (−2 ; 0)

```

### Niveau 2

```
La conique −x² + 8xy − y² + 8x − 32y − 1 = 0 a pour équation réduite −X²/5 + Y²/3 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (4 ; 0), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² + b², avec a² = 3 et b² = 5.)
    = √(3 + □)   (trous : √(3 + 5))   ← Hyperbole : c² = a² + b²
    = □   (trous : 2√2)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_2   (trous : F = Ω + 2√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√2)
    = F=(4;0)+□   (trous : F = (4 ; 0) + (2 ; -2))   ← 2√2·u₂ = (2 ; −2)
    = (□;□)   (trous : (6 ; -2))
  — F' est en (0 ; −2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_2   (trous : F′ = Ω − 2√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√2)
    = F'=(4;0)+□   (trous : F' = (4 ; 0) + (-2 ; 2))   ← 2√2·u₂ = (−2 ; 2)
    = (□;□)   (trous : (2 ; 2))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (4 ; 0) + 2√2·(□) | F = (6 ; −2)

La conique 4x² + 4xy + 4y² − 16x − 32y + 40 = 0 a pour équation réduite X²/4 + Y²/12 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (0 ; 4), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² − b², avec a² = 12 et b² = 4.)
    = √(12 − □)   (trous : √(12 − 4))   ← Ellipse : c² = a² − b²
    = □   (trous : 2√2)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_2   (trous : F = Ω + 2√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√2)
    = F=(0;4)+□   (trous : F = (0 ; 4) + (2 ; -2))   ← 2√2·u₂ = (2 ; −2)
    = (□;□)   (trous : (2 ; 2))
  — F' est en (0 ; −2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_2   (trous : F′ = Ω − 2√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√2)
    = F'=(0;4)+□   (trous : F' = (0 ; 4) + (-2 ; 2))   ← 2√2·u₂ = (−2 ; 2)
    = (□;□)   (trous : (-2 ; 6))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (0 ; 4) + 2√2·(□) | F = (2 ; 2)

La conique 4x² + 6xy + 4y² + 32x + 24y + 43 = 0 a pour équation réduite X²/3 + Y²/21 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (−4 ; 0), u₁ = (1 ; 1)/√2 et u₂ = (−1 ; 1)/√2. Donne ses foyers dans Re.
  [guided]  c
    (Dans Ru, c² = a² − b², avec a² = 21 et b² = 3.)
    = √(21 − □)   (trous : √(21 − 3))   ← Ellipse : c² = a² − b²
    = □   (trous : 3√2)   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 3√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + □·u_2   (trous : F = Ω + 3√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; 3√2)
    = F=(-4;0)+□   (trous : F = (-4 ; 0) + (-3 ; 3))   ← 3√2·u₂ = (−3 ; 3)
    = (□;□)   (trous : (-7 ; 3))
  — F' est en (0 ; −3√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − □·u_2   (trous : F′ = Ω − 3√2·u_2)   ← Ω + X·u₁ + Y·u₂ avec (0 ; −3√2)
    = F'=(-4;0)+□   (trous : F' = (-4 ; 0) + (3 ; -3))   ← 3√2·u₂ = (3 ; −3)
    = (□;□)   (trous : (-1 ; -3))
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (−4 ; 0) + 3√2·(□) | F = (−7 ; 3)

```

### Niveau 3

```
La conique −4x² − 4xy − 4y² − 16x − 8y − 7 = 0 a pour équation réduite X²/(3/2) + Y²/(9/2) = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (−2 ; 0), u₁ = (1 ; 1)/√2 et u₂ = (−1 ; 1)/√2. Donne ses sommets de l'axe focal et ses deux axes dans Re.
  [tap, suivre l'erreur, menu menu]  S
    (S est en (0 ; 3√2/2) dans Ru. Ses coordonnées dans Re ?)
    = S = Ω + 3√2/2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; 3√2/2)
    = S = (-2 ; 0) + (-3/2 ; 3/2)   ← 3√2/2·u₂ = (−3/2 ; 3/2)
    = (-7/2 ; 3/2)
  — S' est en (0 ; −3√2/2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : S′
    = S′ = Ω − 3√2/2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; −3√2/2)
    = S' = (-2 ; 0) + (3/2 ; -3/2)   ← 3√2/2·u₂ = (3/2 ; −3/2)
    = (-1/2 ; -3/2)
  — Les deux axes de symétrie dans Re ?  [juge geom]  départ : axes
    = x + y − 2 = 0 ou x − y − 2 = 0   ← Direction (−1 ; 1) et (1 ; 1), par Ω
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (−2 ; 0) + √3·(□) | S = (−7/2 ; 3/2)
  pièges : g10_foci_reduced_frame, g10_frame_back_transpose

La conique 5x² + 6xy + 5y² + 12x + 20y + 4 = 0 a pour équation réduite X²/2 + Y²/8 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (0 ; −2), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses sommets de l'axe focal et ses deux axes dans Re.
  [tap, suivre l'erreur, menu menu]  S
    (S est en (0 ; 2√2) dans Ru. Ses coordonnées dans Re ?)
    = S = Ω + 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√2)
    = S = (0 ; -2) + (2 ; -2)   ← 2√2·u₂ = (2 ; −2)
    = (2 ; -4)
  — S' est en (0 ; −2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : S′
    = S′ = Ω − 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√2)
    = S' = (0 ; -2) + (-2 ; 2)   ← 2√2·u₂ = (−2 ; 2)
    = (-2 ; 0)
  — Les deux axes de symétrie dans Re ?  [juge geom]  départ : axes
    = x + y − 2 = 0 ou x − y + 2 = 0   ← Direction (1 ; −1) et (−1 ; −1), par Ω
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (0 ; −2) + √6·(□) | S = (2 ; −4)
  pièges : g10_foci_reduced_frame, g10_frame_back_transpose

La conique 3x² − 4xy + 6y² − 4x + 12y − 8 = 0 a pour équation réduite X²/7 + Y²/2 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (0 ; −1), u₁ = (2 ; 1)/√5 et u₂ = (−1 ; 2)/√5. Donne ses foyers dans Re.
  [tap, suivre l'erreur, menu menu]  c
    (Dans Ru, c² = a² − b², avec a² = 7 et b² = 2.)
    = √(7 − 2)   ← Ellipse : c² = a² − b²
    = √5   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + √5·u_1   ← Ω + X·u₁ + Y·u₂ avec (√5 ; 0)
    = F = (0 ; -1) + (2 ; 1)   ← √5·u₁ = (2 ; 1)
    = (2 ; 0)
  — F' est en (−√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − √5·u_1   ← Ω + X·u₁ + Y·u₂ avec (−√5 ; 0)
    = F' = (0 ; -1) + (-2 ; -1)   ← √5·u₁ = (−2 ; −1)
    = (-2 ; -2)
  — L'axe focal dans Re : la droite par Ω de direction u₁ ?  [juge geom]  départ : axe
    = x − 2y + 2 = 0   ← Direction (2 ; 1), par Ω
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (0 ; −1) + √5·(□) | F = (2 ; 0)

```

### Niveau 4

```
La conique x² − 4xy − 2y² + 14x − 4y + 46 = 0 a pour équation réduite X²/7 − Y²/(21/2) = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (−3 ; 2), u₁ = (1 ; 2)/√5 et u₂ = (−2 ; 1)/√5. Esquisse-la dans Re : place le centre Ω, les deux axes, les sommets de l'axe réel et les asymptotes. (Les points se placent au quart d'unité près.)
  [repère conic, à placer : Ω ×1, axes ×2, sommets (axe focal) ×2, asymptotes ×2]
  pièges : g10_foci_reduced_frame

La conique −x² + 4xy − y² − 10x − 4y + 21 = 0 a pour équation réduite X²/2 − Y²/(2/3) = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (3 ; 4), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses sommets de l'axe focal et ses deux axes dans Re.
  [free, suivre l'erreur]  S
    (S est en (√2 ; 0) dans Ru. Ses coordonnées dans Re ?)
    = S = Ω + √2·u_1   ← Ω + X·u₁ + Y·u₂ avec (√2 ; 0)
    = S = (3 ; 4) + (-1 ; -1)   ← √2·u₁ = (−1 ; −1)
    = (2 ; 3)
  — S' est en (−√2 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : S′
    = S′ = Ω − √2·u_1   ← Ω + X·u₁ + Y·u₂ avec (−√2 ; 0)
    = S' = (3 ; 4) + (1 ; 1)   ← √2·u₁ = (1 ; 1)
    = (4 ; 5)
  — Les deux axes de symétrie dans Re ?  [juge geom]  départ : axes
    = x − y − 1 = 0 ou x + y + 7 = 0   ← Direction (−1 ; −1) et (1 ; −1), par Ω
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (3 ; 4) + 2√6/3·(□) | S = (2 ; 3)
  pièges : g10_foci_reduced_frame, g10_frame_back_transpose

La conique −2xy − 4x + 8y + 20 = 0 a pour équation réduite X²/4 − Y²/4 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (4 ; −2), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses foyers dans Re.
  [free, suivre l'erreur]  c
    (Dans Ru, c² = a² + b², avec a² = 4 et b² = 4.)
    = √(4 + 4)   ← Hyperbole : c² = a² + b²
    = 2√2   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (2√2 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + 2√2·u_1   ← Ω + X·u₁ + Y·u₂ avec (2√2 ; 0)
    = F = (4 ; -2) + (-2 ; -2)   ← 2√2·u₁ = (−2 ; −2)
    = (2 ; -4)
  — F' est en (−2√2 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − 2√2·u_1   ← Ω + X·u₁ + Y·u₂ avec (−2√2 ; 0)
    = F' = (4 ; -2) + (2 ; 2)   ← 2√2·u₁ = (2 ; 2)
    = (6 ; 0)
  — L'axe réel dans Re : la droite par Ω de direction u₁ ?  [juge geom]  départ : axe
    = x − y + 6 = 0   ← Direction (−1 ; −1), par Ω
  aides : Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. | F = (4 ; −2) + 2√2·(□) | F = (2 ; −4)

```

### Niveau 5

```
La conique 3x² − 8xy + 3y² − 18x + 24y + 20 = 0 a pour équation réduite −X²/7 + Y² = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (3 ; 0), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses foyers, son axe focal dans Re.
  [free, sans aide]  c
    (Dans Ru, c² = a² + b², avec a² = 1 et b² = 7.)
    = √(1 + 7)   ← Hyperbole : c² = a² + b²
    = 2√2   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√2)
    = F = (3 ; 0) + (2 ; -2)   ← 2√2·u₂ = (2 ; −2)
    = (5 ; -2)
  — F' est en (0 ; −2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√2)
    = F' = (3 ; 0) + (-2 ; 2)   ← 2√2·u₂ = (−2 ; 2)
    = (1 ; 2)
  — L'axe réel dans Re : la droite par Ω de direction u₂ ?  [juge geom]  départ : axe
    = x + y + 3 = 0   ← Direction (1 ; −1), par Ω

La conique x² + 8xy + y² − 10x − 10y + 25 = 0 a pour équation réduite −X²/3 + Y²/5 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (1 ; 1), u₁ = (1 ; 1)/√2 et u₂ = (−1 ; 1)/√2. Donne ses foyers, son axe focal dans Re.
  [free, sans aide]  c
    (Dans Ru, c² = a² + b², avec a² = 5 et b² = 3.)
    = √(5 + 3)   ← Hyperbole : c² = a² + b²
    = 2√2   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; 2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; 2√2)
    = F = (1 ; 1) + (-2 ; 2)   ← 2√2·u₂ = (−2 ; 2)
    = (-1 ; 3)
  — F' est en (0 ; −2√2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − 2√2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; −2√2)
    = F' = (1 ; 1) + (2 ; -2)   ← 2√2·u₂ = (2 ; −2)
    = (3 ; -1)
  — L'axe réel dans Re : la droite par Ω de direction u₂ ?  [juge geom]  départ : axe
    = x + y + 2 = 0   ← Direction (−1 ; 1), par Ω

La conique −5x² − 2xy − 5y² − 32x − 16y − 50 = 0 a pour équation réduite X² + Y²/(3/2) = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (−3 ; −1), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Donne ses foyers, son axe focal dans Re.
  [free, sans aide]  c
    (Dans Ru, c² = a² − b², avec a² = 3/2 et b² = 1.)
    = √(3/2 − 1)   ← Ellipse : c² = a² − b²
    = √2/2   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (0 ; √2/2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + √2/2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; √2/2)
    = F = (-3 ; -1) + (1/2 ; -1/2)   ← √2/2·u₂ = (1/2 ; −1/2)
    = (-5/2 ; -3/2)
  — F' est en (0 ; −√2/2) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − √2/2·u_2   ← Ω + X·u₁ + Y·u₂ avec (0 ; −√2/2)
    = F' = (-3 ; -1) + (-1/2 ; 1/2)   ← √2/2·u₂ = (−1/2 ; 1/2)
    = (-7/2 ; -1/2)
  — L'axe focal dans Re : la droite par Ω de direction u₂ ?  [juge geom]  départ : axe
    = x + y − 4 = 0   ← Direction (1 ; −1), par Ω

```

### Variantes d'examen

```
La conique 3x² − 10xy + 3y² − 10x + 6y + 23 = 0 a pour équation réduite X²/10 − Y²/(5/2) = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (0 ; −1), u₁ = (−1 ; −1)/√2 et u₂ = (1 ; −1)/√2. Quels sont ses foyers dans Re ?
  ✔ (−5/2 ; −7/2) et (5/2 ; 3/2)   · (5√2/2 ; 0) et (−5√2/2 ; 0) [g10_foci_reduced_frame]   · (5/2 ; −7/2) et (−5/2 ; 3/2)   · (−5/2 ; 3/2) et (5/2 ; −7/2) [g10_frame_back_transpose]
  [examen mcq]
  pièges : g10_foci_reduced_frame, g10_frame_back_transpose

La conique 4x² − 2xy + 4y² − 10x − 20y + 25 = 0 a pour équation réduite X²/5 + Y²/3 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (2 ; 3), u₁ = (1 ; 1)/√2 et u₂ = (−1 ; 1)/√2. Quelle est l'abscisse du foyer le plus à droite, dans Re ?
  [free, sans aide, examen coef]  x
    = 3
  pièges : g10_foci_reduced_frame

La conique 5x² − 4xy + 2y² + 4x − 4y − 22 = 0 a pour équation réduite X²/24 + Y²/4 = 1 dans le repère Ru = (Ω ; u₁, u₂), avec Ω = (0 ; 1), u₁ = (−1 ; −2)/√5 et u₂ = (2 ; −1)/√5. Donne ses foyers, son axe focal dans Re.
  [free, sans aide, examen open]  c
    (Dans Ru, c² = a² − b², avec a² = 24 et b² = 4.)
    = √(24 − 4)   ← Ellipse : c² = a² − b²
    = 2√5   ← Les foyers sont sur l'axe focal, à c du centre
  — F est en (2√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F
    = F = Ω + 2√5·u_1   ← Ω + X·u₁ + Y·u₂ avec (2√5 ; 0)
    = F = (0 ; 1) + (-2 ; -4)   ← 2√5·u₁ = (−2 ; −4)
    = (-2 ; -3)
  — F' est en (−2√5 ; 0) dans Ru. Ses coordonnées dans Re ?  [juge vector]  départ : F′
    = F′ = Ω − 2√5·u_1   ← Ω + X·u₁ + Y·u₂ avec (−2√5 ; 0)
    = F' = (0 ; 1) + (2 ; 4)   ← 2√5·u₁ = (2 ; 4)
    = (2 ; 5)
  — L'axe focal dans Re : la droite par Ω de direction u₁ ?  [juge geom]  départ : axe
    = 2x − y − 1 = 0   ← Direction (−1 ; −2), par Ω

```

## Familles de coniques à paramètre, lieu des centres (`g10-conic-family`, CMS)

_Le genre selon m ; éliminer m entre les équations du centre._

### Niveau 1

```
On donne la famille de coniques (3m + 2)x² + (−6m + 6)xy + (−3m − 3)y² + (−6m + 6)x + (−4m − 6)y + 2m + 1 = 0, m ∈ ℝ. Donne son genre selon m.
  [guided]  −18m² + 3m − 15 < 0
    (δ(m) = −18m² + 3m − 15. δ(m) < 0 : genre hyperbole pour quels m ?)
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −18m² + 3m − 15 : ses racines ? | δ(m) = −18m² + 3m − 15
  pièges : g1_trinome_sign_swap

On donne la famille de coniques (m + 2)x² + (−6m − 2)xy + (−2m − 3)y² + (−6m − 4)x + (−2m − 6)y + 2m − 2 = 0, m ∈ ℝ. Donne son genre selon m.
  [guided]  −11m² − 13m − 7 < 0
    (δ(m) = −11m² − 13m − 7. δ(m) < 0 : genre hyperbole pour quels m ?)
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −11m² − 13m − 7 : ses racines ? | δ(m) = −11m² − 13m − 7
  pièges : g1_trinome_sign_swap

On donne la famille de coniques (−3m + 3)x² + (−2m + 6)xy + (3m − 1)y² + (2m + 4)x + (−4m − 2)y − m − 2 = 0, m ∈ ℝ. Donne son genre selon m.
  [guided]  −10m² + 18m − 12 < 0
    (δ(m) = −10m² + 18m − 12. δ(m) < 0 : genre hyperbole pour quels m ?)
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −10m² + 18m − 12 : ses racines ? | δ(m) = −10m² + 18m − 12
  pièges : g1_trinome_sign_swap

```

### Niveau 2

```
On donne la famille de coniques (−2m + 3)x² + (6m − 4)xy + (−3m + 2)y² + (−4m + 2)x + 6y − 2m + 2 = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [guided]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : 3x − 2y + 1 + m(−2x + 3y − 2) = 0 et −2x + 2y + 3 + m(3x − 3y) = 0. Isole m dans la 1re (si −2x + 3y − 2 ≠ 0) : m = −(3x − 2y + 1)/(−2x + 3y − 2), et remplace dans la 2e.)
    = (−2x + 2y + 3)(−2x + 3y − 2) − □(3x − 3y) = 0   (trous : (−2x + 2y + 3)(−2x + 3y − 2) − (3x − 2y + 1)(3x − 3y) = 0)   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (−2x + 2y + 3)(−2x + 3y − 2) − (3x − 2y + 1)(3x − 3y)
    = −5x² + 5xy − 5x + 8y − 6   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = 135/2
  — Et δ = det A ?  [juge value]  départ : δ
    = −25/4
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = −25/4, Δ = 135/2 : le lieu est… · une ellipse réelle / ✔ une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où −2x + 3y − 2 = 0 et 3x − 3y = 0, aucun m ne convient
    = (2 ; 2)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(3x − 2y + 1)/(□) | −5x² + 5xy − 5x + 8y − 6 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_det_sign_nature, g10_family_division_by_zero

On donne la famille de coniques −4mxy + (2m + 3)y² + (−6m − 6)x + (6m + 4)y − m − 1 = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [guided]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −3 + m(−2y − 3) = 0 et 3y + 2 + m(−2x + 2y + 3) = 0. Isole m dans la 1re (si −2y − 3 ≠ 0) : m = −(−3)/(−2y − 3), et remplace dans la 2e.)
    = (3y + 2)(−2y − 3) − □(−2x + 2y + 3) = 0   (trous : (3y + 2)(−2y − 3) − (−3)(−2x + 2y + 3) = 0)   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (3y + 2)(−2y − 3) − (−3)(−2x + 2y + 3)
    = −6y² − 6x − 7y + 3   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = 54
  — Et δ = det A ?  [juge value]  départ : δ
    = 0
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = 0, Δ = 54 : le lieu est… · une ellipse réelle / · une hyperbole / ✔ une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où −2y − 3 = 0 et −2x + 2y + 3 = 0, aucun m ne convient
    = (0 ; -3/2)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(−3)/(□) | −6y² − 6x − 7y + 3 = 0
  pièges : g4_square_constant, g10_parabola_p_half, g10_family_division_by_zero

On donne la famille de coniques (2m − 1)x² + 2xy + (−2m − 1)y² + (6m + 2)x − m − 2 = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [guided]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −x + y + 1 + m(2x + 3) = 0 et x − y + m(−2y) = 0. Isole m dans la 1re (si 2x + 3 ≠ 0) : m = −(−x + y + 1)/(2x + 3), et remplace dans la 2e.)
    = (x − y)(2x + 3) − □(−2y) = 0   (trous : (x − y)(2x + 3) − (−x + y + 1)(−2y) = 0)   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (x − y)(2x + 3) − (−x + y + 1)(−2y)
    = 2x² − 4xy + 2y² + 3x − y   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = −2
  — Et δ = det A ?  [juge value]  départ : δ
    = 0
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = 0, Δ = −2 : le lieu est… · une ellipse réelle / · une hyperbole / ✔ une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où 2x + 3 = 0 et −2y = 0, aucun m ne convient
    = (-3/2 ; 0)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(−x + y + 1)/(□) | 2x² − 4xy + 2y² + 3x − y = 0
  pièges : g4_square_constant, g10_parabola_p_half, g10_family_division_by_zero

```

### Niveau 3

```
On donne la famille de coniques −3x² + (2m + 2)xy + (6m − 6)x − 6y + m − 3 = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [tap, suivre l'erreur, menu menu]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −3x + y − 3 + m(y + 3) = 0 et x − 3 + m(x) = 0. Isole m dans la 1re (si y + 3 ≠ 0) : m = −(−3x + y − 3)/(y + 3), et remplace dans la 2e.)
    = (x − 3)(y + 3) − (−3x + y − 3)(x) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (x − 3)(y + 3) − (−3x + y − 3)(x)
    = 3x² + 6x − 3y − 9   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[3,0,3],[0,0,-3/2],[3,-3/2,-9]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −27/4
  — Et δ = det A ?  [juge value]  départ : δ
    = 0
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = 0, Δ = −27/4 : le lieu est… · une ellipse réelle / · une hyperbole / ✔ une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où y + 3 = 0 et x = 0, aucun m ne convient
    = (0 ; -3)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(−3x + y − 3)/(□) | 3x² + 6x − 3y − 9 = 0
  pièges : g4_square_constant, g10_parabola_p_half, g10_family_division_by_zero

On donne la famille de coniques (−3m + 2)x² + (4m − 4)xy + (2m − 2)y² + (−6m − 6)x − 4my + m − 3 = 0, m ∈ ℝ. Donne son genre selon m.
  [tap, suivre l'erreur, menu menu]  (−3m + 2)·(2m − 2) − (2m − 2)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −10m² + 18m − 8   ← Développer
  — δ(m) > 0 : genre ellipse pour quels m ?  [juge solset]  départ : −10m² + 18m − 8 > 0
    = ]4/5 ; 1[   ← Signe du trinôme : celui de a à l'extérieur des racines
  — δ(m) = 0 : genre parabole pour quels m ?  [juge solset]  départ : −10m² + 18m − 8 = 0
    = m = 4/5 ou m = 1   ← Les racines de δ(m)
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −10m² + 18m − 8 < 0
    = ]−∞ ; 4/5[ ∪ ]1 ; +∞[   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −10m² + 18m − 8 : ses racines ? | δ(m) = −10m² + 18m − 8

On donne la famille de coniques (2m + 2)x² + (−4m − 2)xy + my² − 4x + 2y + m = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [tap, suivre l'erreur, menu menu]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : 2x − y − 2 + m(2x − 2y) = 0 et −x + 1 + m(−2x + y) = 0. Isole m dans la 1re (si 2x − 2y ≠ 0) : m = −(2x − y − 2)/(2x − 2y), et remplace dans la 2e.)
    = (−x + 1)(2x − 2y) − (2x − y − 2)(−2x + y) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (−x + 1)(2x − 2y) − (2x − y − 2)(−2x + y)
    = 2x² − 2xy + y² − 2x   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[2,-1,-1],[-1,1,0],[-1,0,0]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −1
  — Et δ = det A ?  [juge value]  départ : δ
    = 1
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = 1, Δ = −1 : le lieu est… ✔ une ellipse réelle / · une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où 2x − 2y = 0 et −2x + y = 0, aucun m ne convient
    = (0 ; 0)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(2x − y − 2)/(□) | 2x² − 2xy + y² − 2x = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_det_sign_nature, g10_family_division_by_zero

```

### Niveau 4

```
On donne la famille de coniques −3mx² + (−4m − 2)xy + (2m − 2)y² + (−6m + 4)x + (−2m − 4)y + 2m + 1 = 0, m ∈ ℝ. Donne son genre selon m.
  [free, suivre l'erreur]  −3m·(2m − 2) − (−2m − 1)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −10m² + 2m − 1   ← Développer
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −10m² + 2m − 1 < 0
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −10m² + 2m − 1 : ses racines ? | δ(m) = −10m² + 2m − 1

On donne la famille de coniques (−m − 3)x² − 6mxy + (2m + 1)y² + (−6m − 2)x + (−4m + 4)y + m = 0, m ∈ ℝ. Donne son genre selon m.
  [free, suivre l'erreur]  (−m − 3)·(2m + 1) − (−3m)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −11m² − 7m − 3   ← Développer
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −11m² − 7m − 3 < 0
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  aides : δ(m) = a(m)·c(m) − (b(m)/2)², puis le signe du trinôme en m. | δ(m) = −11m² − 7m − 3 : ses racines ? | δ(m) = −11m² − 7m − 3

On donne la famille de coniques 3mx² + (−2m − 4)xy + 3y² − 6mx + (6m − 6)y + 2 = 0, m ∈ ℝ. Trouve le lieu des centres et sa nature.
  [free, suivre l'erreur]  lieu
    (Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −2y + m(3x − y − 3) = 0 et −2x + 3y − 3 + m(−x + 3) = 0. Isole m dans la 1re (si 3x − y − 3 ≠ 0) : m = −(−2y)/(3x − y − 3), et remplace dans la 2e.)
    = (−2x + 3y − 3)(3x − y − 3) − (−2y)(−x + 3) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (−2x + 3y − 3)(3x − y − 3) − (−2y)(−x + 3)
    = −6x² + 9xy − 3y² − 3x + 9   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[-6,9/2,-3/2],[9/2,-3,0],[-3/2,0,9]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −27/2
  — Et δ = det A ?  [juge value]  départ : δ
    = −9/4
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = −9/4, Δ = −27/2 : le lieu est… · une ellipse réelle / ✔ une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où 3x − y − 3 = 0 et −x + 3 = 0, aucun m ne convient
    = (3 ; 6)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  aides : Isole m dans une des équations du centre et remplace dans l'autre. | m = −(−2y)/(□) | −6x² + 9xy − 3y² − 3x + 9 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_asymptote_ratio, g10_det_sign_nature, g10_family_division_by_zero

```

### Niveau 5

```
On donne la famille de coniques (−2m + 3)x² − 4xy + (2m + 2)y² + (2m + 6)x + 2my + 2 = 0, m ∈ ℝ. Donne son genre selon m, puis le lieu des centres et sa nature.
  [free, sans aide]  (−2m + 3)·(2m + 2) − (−2)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −4m² + 2m + 2   ← Développer
  — δ(m) > 0 : genre ellipse pour quels m ?  [juge solset]  départ : −4m² + 2m + 2 > 0
    = ]−1/2 ; 1[   ← Signe du trinôme : celui de a à l'extérieur des racines
  — δ(m) = 0 : genre parabole pour quels m ?  [juge solset]  départ : −4m² + 2m + 2 = 0
    = m = −1/2 ou m = 1   ← Les racines de δ(m)
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −4m² + 2m + 2 < 0
    = ]−∞ ; −1/2[ ∪ ]1 ; +∞[   ← Signe du trinôme : celui de a à l'extérieur des racines
  — Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : 3x − 2y + 3 + m(−2x + 1) = 0 et −2x + 2y + m(2y + 1) = 0. Isole m dans la 1re (si −2x + 1 ≠ 0) : m = −(3x − 2y + 3)/(−2x + 1), et remplace dans la 2e.  [juge conic]  départ : lieu
    = (−2x + 2y)(−2x + 1) − (3x − 2y + 3)(2y + 1) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (−2x + 2y)(−2x + 1) − (3x − 2y + 3)(2y + 1)
    = 4x² − 10xy + 4y² − 5x − 2y − 3   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[4,-5,-5/2],[-5,4,-1],[-5/2,-1,-3]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −27
  — Et δ = det A ?  [juge value]  départ : δ
    = −9
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = −9, Δ = −27 : le lieu est… · une ellipse réelle / ✔ une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où −2x + 1 = 0 et 2y + 1 = 0, aucun m ne convient
    = (1/2 ; -1/2)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  pièges : g10_det_sign_nature, g10_family_division_by_zero

On donne la famille de coniques (3m − 3)x² + (−4m + 4)xy + (m + 2)y² − 2mx + (−2m + 2)y + m = 0, m ∈ ℝ. Donne son genre selon m, puis le lieu des centres et sa nature.
  [free, sans aide]  (3m − 3)·(m + 2) − (−2m + 2)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −m² + 11m − 10   ← Développer
  — δ(m) > 0 : genre ellipse pour quels m ?  [juge solset]  départ : −m² + 11m − 10 > 0
    = ]1 ; 10[   ← Signe du trinôme : celui de a à l'extérieur des racines
  — δ(m) = 0 : genre parabole pour quels m ?  [juge solset]  départ : −m² + 11m − 10 = 0
    = m = 1 ou m = 10   ← Les racines de δ(m)
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −m² + 11m − 10 < 0
    = ]−∞ ; 1[ ∪ ]10 ; +∞[   ← Signe du trinôme : celui de a à l'extérieur des racines
  — Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −3x + 2y + m(3x − 2y − 1) = 0 et 2x + 2y + 1 + m(−2x + y − 1) = 0. Isole m dans la 1re (si 3x − 2y − 1 ≠ 0) : m = −(−3x + 2y)/(3x − 2y − 1), et remplace dans la 2e.  [juge conic]  départ : lieu
    = (2x + 2y + 1)(3x − 2y − 1) − (−3x + 2y)(−2x + y − 1) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (2x + 2y + 1)(3x − 2y − 1) − (−3x + 2y)(−2x + y − 1)
    = 9xy − 6y² − 2x − 2y − 1   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[0,9/2,-1],[9/2,-6,-1],[-1,-1,-1]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = 141/4
  — Et δ = det A ?  [juge value]  départ : δ
    = −81/4
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = −81/4, Δ = 141/4 : le lieu est… · une ellipse réelle / ✔ une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où 3x − 2y − 1 = 0 et −2x + y − 1 = 0, aucun m ne convient
    = (-3 ; -5)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  pièges : g10_det_sign_nature, g10_family_division_by_zero

On donne la famille de coniques (−m − 1)x² + (−2m − 4)xy + (3m + 1)y² + (6m + 2)x + (−2m + 2)y − 1 = 0, m ∈ ℝ. Donne son genre selon m, puis le lieu des centres et sa nature.
  [free, sans aide]  (−m − 1)·(3m + 1) − (−m − 2)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −4m² − 8m − 5   ← Développer
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −4m² − 8m − 5 < 0
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  — Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −x − 2y + 1 + m(−x − y + 3) = 0 et −2x + y + 1 + m(−x + 3y − 1) = 0. Isole m dans la 1re (si −x − y + 3 ≠ 0) : m = −(−x − 2y + 1)/(−x − y + 3), et remplace dans la 2e.  [juge conic]  départ : lieu
    = (−2x + y + 1)(−x − y + 3) − (−x − 2y + 1)(−x + 3y − 1) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (−2x + y + 1)(−x − y + 3) − (−x − 2y + 1)(−x + 3y − 1)
    = x² + 2xy + 5y² − 7x − 3y + 4   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[1,1,-7/2],[1,5,-3/2],[-7/2,-3/2,4]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −37
  — Et δ = det A ?  [juge value]  départ : δ
    = 4
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    ? δ = 4, Δ = −37 : le lieu est… ✔ une ellipse réelle / · une hyperbole / · une parabole
    ? Tout point du lieu est-il le centre d'une conique de la famille ? · Oui, tous / ✔ Non : là où −x − y + 3 = 0 et −x + 3y − 1 = 0, aucun m ne convient
    = (2 ; 1)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici
  pièges : g10_det_sign_nature, g10_family_division_by_zero

```

### Variantes d'examen

```
Pour m = 0, que décrit la conique 3x² + (4m + 2)xy + (4m − 2)x − 3 = 0 ?
  · Deux droites sécantes   ✔ Une hyperbole   · Une ellipse réelle [g10_det_sign_nature]   · Une parabole
  [examen mcq]
  pièges : g10_det_sign_nature

On donne la famille de coniques (3m − 3)x² + (2m + 6)xy − 2my² + (−4m − 4)x + (−6m + 6)y + m + 1 = 0, m ∈ ℝ. Donne son genre selon m, puis le lieu des centres et sa nature.
  [free, sans aide, examen open]  (3m − 3)·(−2)m − (m + 3)²
    (δ(m) = a(m)·c(m) − (b(m)/2)² ?)
    = −7m² − 9   ← Développer
  — δ(m) < 0 : genre hyperbole pour quels m ?  [juge solset]  départ : −7m² − 9 < 0
    = ℝ   ← Signe du trinôme : celui de a à l'extérieur des racines
  — Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : −3x + 3y − 2 + m(3x + y − 2) = 0 et 3x + 3 + m(x − 2y − 3) = 0. Isole m dans la 1re (si 3x + y − 2 ≠ 0) : m = −(−3x + 3y − 2)/(3x + y − 2), et remplace dans la 2e.  [juge conic]  départ : lieu
    = (3x + 3)(3x + y − 2) − (−3x + 3y − 2)(x − 2y − 3) = 0   ← Multiplier par le dénominateur
  — Développe.  [juge equiv]  départ : (3x + 3)(3x + y − 2) − (−3x + 3y − 2)(x − 2y − 3)
    = 12x² − 6xy + 6y² − 4x + 8y − 12   ← Le lieu des centres : … = 0
  — Sa nature : Δ = det M ?  [juge det]  départ : det(M)
    = det[[12,-3,-2],[-3,6,4],[-2,4,-12]]   ← M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]
    = −924
  — Et δ = det A ?  [juge value]  départ : δ
    = 63
  — Un point du lieu peut-il ne pas être un centre ?  [juge vector]  départ : P
    = (1 ; -1)   ← Q₁ = Q₂ = 0 : le système en m devient P₁ = P₂ = 0, impossible ici

```

## Lieux géométriques qui donnent une conique (`g10-locus`, CMS)

_Traduire la condition, élever au carré avec sa condition, reconnaître._

### Niveau 1

```
On donne le cercle γ : x² + y² = 25 et le point A(0 ; −3). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((y + 3)² + x²).)
    (Au carré : x² + y² = 25 − 10√(…) + (y + 3)² + x², donc 10√((y + 3)² + x²) = 34 + 6y, avec la condition 34 + 6y ≥ 0.)
    = 100((y + 3)² + x²) = □   (trous : 100((y + 3)² + x²) = (34 + 6y)²)   ← Élever au carré (les deux membres sont positifs)
    = 25x² + 16y² + 48y − 64 = 0   ← Développer et réduire
    = x²/4 + (y + 3/2)²/(25/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 34 + 6y ≥ 0 s'écrit y ≥ −17/3. Sur l'ellipse, quelle est la plus petite valeur de y ?  [juge value]  départ : y
    (La condition retire-t-elle des points du lieu ? Non : sur l'ellipse, y reste ≥ −4, donc la condition est toujours vraie.)
    = −4   ← Centre ± a, avec a = 5/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 10√(…) = □ | 25x² + 16y² + 48y − 64 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

On donne le cercle γ : x² + y² = 100 et le point A(6 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((x − 6)² + y²).)
    (Au carré : x² + y² = 100 − 20√(…) + (x − 6)² + y², donc 20√((x − 6)² + y²) = 136 − 12x, avec la condition 136 − 12x ≥ 0.)
    = 400((x − 6)² + y²) = □   (trous : 400((x − 6)² + y²) = (136 − 12x)²)   ← Élever au carré (les deux membres sont positifs)
    = 16x² + 25y² − 96x − 256 = 0   ← Développer et réduire
    = (x − 3)²/25 + y²/16 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 136 − 12x ≥ 0 s'écrit x ≤ 34/3. Sur l'ellipse, quelle est la plus grande valeur de x ?  [juge value]  départ : x
    (La condition retire-t-elle des points du lieu ? Non : sur l'ellipse, x reste ≤ 8, donc la condition est toujours vraie.)
    = 8   ← Centre ± a, avec a = 5
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 20√(…) = □ | 16x² + 25y² − 96x − 256 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

On donne le cercle γ : x² + y² = 100 et le point A(8 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((x − 8)² + y²).)
    (Au carré : x² + y² = 100 − 20√(…) + (x − 8)² + y², donc 20√((x − 8)² + y²) = 164 − 16x, avec la condition 164 − 16x ≥ 0.)
    = 400((x − 8)² + y²) = □   (trous : 400((x − 8)² + y²) = (164 − 16x)²)   ← Élever au carré (les deux membres sont positifs)
    = 9x² + 25y² − 72x − 81 = 0   ← Développer et réduire
    = (x − 4)²/25 + y²/9 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 164 − 16x ≥ 0 s'écrit x ≤ 41/4. Sur l'ellipse, quelle est la plus grande valeur de x ?  [juge value]  départ : x
    (La condition retire-t-elle des points du lieu ? Non : sur l'ellipse, x reste ≤ 9, donc la condition est toujours vraie.)
    = 9   ← Centre ± a, avec a = 5
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 20√(…) = □ | 9x² + 25y² − 72x − 81 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

### Niveau 2

```
On donne le cercle γ : x² + y² = 100 et le point A(0 ; 6). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((y − 6)² + x²).)
    (Au carré : x² + y² = 100 − 20√(…) + (y − 6)² + x², donc 20√((y − 6)² + x²) = 136 − 12y, avec la condition 136 − 12y ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 400((y − 6)² + x²) = □   (trous : 400((y − 6)² + x²) = (136 − 12y)²)   ← Élever au carré (les deux membres sont positifs)
    = 25x² + 16y² − 96y − 256 = 0   ← Développer et réduire
    = x²/16 + (y − 3)²/25 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 136 − 12y ≥ 0 s'écrit y ≤ 34/3. Sur l'ellipse, quelle est la plus grande valeur de y ?  [juge value]  départ : y
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, y reste ≤ 8, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = 8   ← Centre ± a, avec a = 5
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 20√(…) = □ | 25x² + 16y² − 96y − 256 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 100 et le point A(−8 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((x + 8)² + y²).)
    (Au carré : x² + y² = 100 − 20√(…) + (x + 8)² + y², donc 20√((x + 8)² + y²) = 164 + 16x, avec la condition 164 + 16x ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 400((x + 8)² + y²) = □   (trous : 400((x + 8)² + y²) = (164 + 16x)²)   ← Élever au carré (les deux membres sont positifs)
    = 9x² + 25y² + 72x − 81 = 0   ← Développer et réduire
    = (x + 4)²/25 + y²/9 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 164 + 16x ≥ 0 s'écrit x ≥ −41/4. Sur l'ellipse, quelle est la plus petite valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≥ −9, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −9   ← Centre ± a, avec a = 5
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 20√(…) = □ | 9x² + 25y² + 72x − 81 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 25 et le point A(−4 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [guided]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((x + 4)² + y²).)
    (Au carré : x² + y² = 25 − 10√(…) + (x + 4)² + y², donc 10√((x + 4)² + y²) = 41 + 8x, avec la condition 41 + 8x ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 100((x + 4)² + y²) = □   (trous : 100((x + 4)² + y²) = (41 + 8x)²)   ← Élever au carré (les deux membres sont positifs)
    = 36x² + 100y² + 144x − 81 = 0   ← Développer et réduire
    = (x + 2)²/(25/4) + y²/(9/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 41 + 8x ≥ 0 s'écrit x ≥ −41/8. Sur l'ellipse, quelle est la plus petite valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≥ −9/2, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −9/2   ← Centre ± a, avec a = 5/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 10√(…) = □ | 36x² + 100y² + 144x − 81 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

```

### Niveau 3

```
On donne le cercle γ : x² + y² = 169 et le point A(5 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [tap, suivre l'erreur, menu menu]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 13 − r. Donc OM = 13 − MA, soit √(x² + y²) = 13 − √((x − 5)² + y²).)
    (Au carré : x² + y² = 169 − 26√(…) + (x − 5)² + y², donc 26√((x − 5)² + y²) = 194 − 10x, avec la condition 194 − 10x ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 676((x − 5)² + y²) = (194 − 10x)²   ← Élever au carré (les deux membres sont positifs)
    = 144x² + 169y² − 720x − 5184 = 0   ← Développer et réduire
    = (x − 5/2)²/(169/4) + y²/36 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 194 − 10x ≥ 0 s'écrit x ≤ 97/5. Sur l'ellipse, quelle est la plus grande valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≤ 9, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = 9   ← Centre ± a, avec a = 13/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 26√(…) = □ | 144x² + 169y² − 720x − 5184 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 25 et le point A(−3 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [tap, suivre l'erreur, menu menu]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((x + 3)² + y²).)
    (Au carré : x² + y² = 25 − 10√(…) + (x + 3)² + y², donc 10√((x + 3)² + y²) = 34 + 6x, avec la condition 34 + 6x ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 100((x + 3)² + y²) = (34 + 6x)²   ← Élever au carré (les deux membres sont positifs)
    = 16x² + 25y² + 48x − 64 = 0   ← Développer et réduire
    = (x + 3/2)²/(25/4) + y²/4 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 34 + 6x ≥ 0 s'écrit x ≥ −17/3. Sur l'ellipse, quelle est la plus petite valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≥ −4, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −4   ← Centre ± a, avec a = 5/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 10√(…) = □ | 16x² + 25y² + 48x − 64 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

Trouve le lieu des points M(x ; y) à égale distance du point F(1 ; −1) et de la droite D : y = 1.
  [tap, suivre l'erreur, menu menu]  lieu
    (MF = d(M, D) : √((x − 1)² + (y + 1)²) = |y − 1|.)
    = (x − 1)² + (y + 1)² = (y − 1)²   ← Élever au carré (deux distances positives)
    = x² − 2x + 4y + 1 = 0   ← Développer et réduire
    = (x − 1)² = −4(y)   ← Une parabole de foyer F et de directrice D
  aides : Écris MF et la distance de M à D, puis élève au carré. | (x − 1)² + (y + 1)² = (□)² | (x − 1)² = − 4(y)
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 4

```
On donne le cercle γ : x² + y² = 169 et le point A(0 ; −5). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, suivre l'erreur]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 13 − r. Donc OM = 13 − MA, soit √(x² + y²) = 13 − √((y + 5)² + x²).)
    (Au carré : x² + y² = 169 − 26√(…) + (y + 5)² + x², donc 26√((y + 5)² + x²) = 194 + 10y, avec la condition 194 + 10y ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 676((y + 5)² + x²) = (194 + 10y)²   ← Élever au carré (les deux membres sont positifs)
    = 169x² + 144y² + 720y − 5184 = 0   ← Développer et réduire
    = x²/36 + (y + 5/2)²/(169/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 194 + 10y ≥ 0 s'écrit y ≥ −97/5. Sur l'ellipse, quelle est la plus petite valeur de y ?  [juge value]  départ : y
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, y reste ≥ −9, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −9   ← Centre ± a, avec a = 13/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 26√(…) = □ | 169x² + 144y² + 720y − 5184 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 25 et le point A(−4 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, suivre l'erreur]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((x + 4)² + y²).)
    (Au carré : x² + y² = 25 − 10√(…) + (x + 4)² + y², donc 10√((x + 4)² + y²) = 41 + 8x, avec la condition 41 + 8x ≥ 0.)
    ? Comment enlever les racines ? ✔ Élever au carré, puis isoler la racine qui reste et élever encore (avec la condition de signe) / ✔ Élever au carré les deux membres tels quels et développer
    = 100((x + 4)² + y²) = (41 + 8x)²   ← Élever au carré (les deux membres sont positifs)
    = 36x² + 100y² + 144x − 81 = 0   ← Développer et réduire
    = (x + 2)²/(25/4) + y²/(9/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 41 + 8x ≥ 0 s'écrit x ≥ −41/8. Sur l'ellipse, quelle est la plus petite valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≥ −9/2, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −9/2   ← Centre ± a, avec a = 5/2
  aides : La tangence intérieure donne OM = R − r, et r = MA. | 10√(…) = □ | 36x² + 100y² + 144x − 81 = 0
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

Trouve le lieu des points M(x ; y) à égale distance du point F(0 ; −2) et de la droite D : x = 2.
  [free, suivre l'erreur]  lieu
    (MF = d(M, D) : √((x)² + (y + 2)²) = |x − 2|.)
    = (x)² + (y + 2)² = (x − 2)²   ← Élever au carré (deux distances positives)
    = y² + 4x + 4y = 0   ← Développer et réduire
    = (y + 2)² = −4(x − 1)   ← Une parabole de foyer F et de directrice D
  aides : Écris MF et la distance de M à D, puis élève au carré. | (x)² + (y + 2)² = (□)² | (y + 2)² = − 4(x − 1)
  pièges : g4_square_constant, g10_parabola_p_half

```

### Niveau 5

```
On donne le cercle γ : x² + y² = 100 et le point A(6 ; 0). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, sans aide]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((x − 6)² + y²).)
    (Au carré : x² + y² = 100 − 20√(…) + (x − 6)² + y², donc 20√((x − 6)² + y²) = 136 − 12x, avec la condition 136 − 12x ≥ 0.)
    = 400((x − 6)² + y²) = (136 − 12x)²   ← Élever au carré (les deux membres sont positifs)
    = 16x² + 25y² − 96x − 256 = 0   ← Développer et réduire
    = (x − 3)²/25 + y²/16 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 136 − 12x ≥ 0 s'écrit x ≤ 34/3. Sur l'ellipse, quelle est la plus grande valeur de x ?  [juge value]  départ : x
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, x reste ≤ 8, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = 8   ← Centre ± a, avec a = 5
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 25 et le point A(0 ; −3). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, sans aide]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((y + 3)² + x²).)
    (Au carré : x² + y² = 25 − 10√(…) + (y + 3)² + x², donc 10√((y + 3)² + x²) = 34 + 6y, avec la condition 34 + 6y ≥ 0.)
    = 100((y + 3)² + x²) = (34 + 6y)²   ← Élever au carré (les deux membres sont positifs)
    = 25x² + 16y² + 48y − 64 = 0   ← Développer et réduire
    = x²/4 + (y + 3/2)²/(25/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 34 + 6y ≥ 0 s'écrit y ≥ −17/3. Sur l'ellipse, quelle est la plus petite valeur de y ?  [juge value]  départ : y
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, y reste ≥ −4, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −4   ← Centre ± a, avec a = 5/2
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

On donne le cercle γ : x² + y² = 25 et le point A(0 ; −3). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, sans aide]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 5 − r. Donc OM = 5 − MA, soit √(x² + y²) = 5 − √((y + 3)² + x²).)
    (Au carré : x² + y² = 25 − 10√(…) + (y + 3)² + x², donc 10√((y + 3)² + x²) = 34 + 6y, avec la condition 34 + 6y ≥ 0.)
    = 100((y + 3)² + x²) = (34 + 6y)²   ← Élever au carré (les deux membres sont positifs)
    = 25x² + 16y² + 48y − 64 = 0   ← Développer et réduire
    = x²/4 + (y + 3/2)²/(25/4) = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 34 + 6y ≥ 0 s'écrit y ≥ −17/3. Sur l'ellipse, quelle est la plus petite valeur de y ?  [juge value]  départ : y
    ? La condition retire-t-elle des points du lieu ? ✔ Non : sur l'ellipse, y reste ≥ −4, donc la condition est toujours vraie / · Oui : seule une moitié de l'ellipse convient
    = −4   ← Centre ± a, avec a = 5/2
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap, g10_locus_square_condition

```

### Variantes d'examen

```
Les cercles γ₁ de centre O₁ et de rayon 5, et γ₂ de centre O₂ et de rayon 3 sont extérieurs (O₁O₂ = 10). Quel est le lieu des centres M des cercles tangents extérieurement à γ₁ et à γ₂ ?
  · L'hyperbole entière de foyers O₁ et O₂ (|MO₁ − MO₂| = 2) [g10_locus_square_condition]   ✔ Une seule branche d'hyperbole de foyers O₁ et O₂ (MO₁ − MO₂ = 2)   · La médiatrice de [O₁O₂]   · L'ellipse de foyers O₁ et O₂ (MO₁ + MO₂ = 8)
  [examen mcq]
  pièges : g10_locus_square_condition

On donne le cercle γ : x² + y² = 100 et le point A(0 ; 6). Trouve le lieu des centres M des cercles qui passent par A et sont tangents intérieurement à γ.
  [free, sans aide, examen open]  lieu
    (M(x ; y) est le centre d'un cercle de rayon r qui passe par A : MA = r ; il est tangent intérieurement à γ : OM = 10 − r. Donc OM = 10 − MA, soit √(x² + y²) = 10 − √((y − 6)² + x²).)
    (Au carré : x² + y² = 100 − 20√(…) + (y − 6)² + x², donc 20√((y − 6)² + x²) = 136 − 12y, avec la condition 136 − 12y ≥ 0.)
    = 400((y − 6)² + x²) = (136 − 12y)²   ← Élever au carré (les deux membres sont positifs)
    = 25x² + 16y² − 96y − 256 = 0   ← Développer et réduire
    = x²/16 + (y − 3)²/25 = 1   ← Compléter le carré : une ellipse de foyers O et A
  — La condition 136 − 12y ≥ 0 s'écrit y ≤ 34/3. Sur l'ellipse, quelle est la plus grande valeur de y ?  [juge value]  départ : y
    = 8   ← Centre ± a, avec a = 5
  pièges : g4_square_constant, g10_c_wrong_formula, g10_axis_swap

```

## Coordonnées homogènes, points à l'infini (`g10-homogeneous`, CMS)

_x → x/t, y → y/t ; les points à l'infini ont t = 0._

### Niveau 1

```
Écris l'équation homogène de la conique x² − xy − 6y² + 2x − 9y − 4 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² − (x/t)(y/t) − 6(y/t)² + 2(x/t) − 9(y/t) − 4)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − xy − 6y² + 2xt − 9yt − □   (trous : x² − xy − 6y² + 2xt − 9yt − 4t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − x − 6 = 0
    (Combien de points réels à l'infini, et quel genre ? Deux : genre hyperbole (directions des asymptotes).)
    = x = −2 ou x = 3   ← Points à l'infini : (−2 : 1 : 0) et (3 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − xy − 6y² + 2xt − 9yt − 4□ | x² − xy − 6y² + 2xt − 9yt − 4t²
  pièges : g10_homog_missing_t

Écris l'équation homogène de la conique x² + 4xy + 4y² − 6x + 4y + 5 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² + 4(x/t)(y/t) + 4(y/t)² − 6(x/t) + 4(y/t) + 5)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² + 4xy + 4y² − 6xt + 4yt + □   (trous : x² + 4xy + 4y² − 6xt + 4yt + 5t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² + 4x + 4 = 0
    (Combien de points réels à l'infini, et quel genre ? Un point double : genre parabole (direction de l'axe).)
    = x = −2   ← Points à l'infini : (−2 : 1 : 0) ; genre parabole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² + 4xy + 4y² − 6xt + 4yt + 5□ | x² + 4xy + 4y² − 6xt + 4yt + 5t²
  pièges : g10_homog_missing_t

Écris l'équation homogène de la conique x² − 4xy + 3y² − 2x + 8y − 2 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² − 4(x/t)(y/t) + 3(y/t)² − 2(x/t) + 8(y/t) − 2)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − 4xy + 3y² − 2xt + 8yt − □   (trous : x² − 4xy + 3y² − 2xt + 8yt − 2t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − 4x + 3 = 0
    (Combien de points réels à l'infini, et quel genre ? Deux : genre hyperbole (directions des asymptotes).)
    = x = 1 ou x = 3   ← Points à l'infini : (1 : 1 : 0) et (3 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − 4xy + 3y² − 2xt + 8yt − 2□ | x² − 4xy + 3y² − 2xt + 8yt − 2t²
  pièges : g10_homog_missing_t

```

### Niveau 2

```
Écris l'équation homogène de la conique x² − xy − 2y² − 3x − 2y − 5 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² − (x/t)(y/t) − 2(y/t)² − 3(x/t) − 2(y/t) − 5)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − xy − 2y² − 3xt − 2yt − □   (trous : x² − xy − 2y² − 3xt − 2yt − 5t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − x − 2 = 0
    ? Combien de points réels à l'infini, et quel genre ? ✔ Deux : genre hyperbole (directions des asymptotes) / · Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = −1 ou x = 2   ← Points à l'infini : (−1 : 1 : 0) et (2 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − xy − 2y² − 3xt − 2yt − 5□ | x² − xy − 2y² − 3xt − 2yt − 5t²
  pièges : g10_homog_missing_t, g10_det_sign_nature

Écris l'équation homogène de la conique x² + 5xy + 6y² − 6x − 8y + 5 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² + 5(x/t)(y/t) + 6(y/t)² − 6(x/t) − 8(y/t) + 5)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² + 5xy + 6y² − 6xt − 8yt + □   (trous : x² + 5xy + 6y² − 6xt − 8yt + 5t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² + 5x + 6 = 0
    ? Combien de points réels à l'infini, et quel genre ? ✔ Deux : genre hyperbole (directions des asymptotes) / · Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = −3 ou x = −2   ← Points à l'infini : (−3 : 1 : 0) et (−2 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² + 5xy + 6y² − 6xt − 8yt + 5□ | x² + 5xy + 6y² − 6xt − 8yt + 5t²
  pièges : g10_homog_missing_t, g10_det_sign_nature

Écris l'équation homogène de la conique x² − 4xy + 4y² + 6x − 6y − 8 = 0, puis trouve ses points à l'infini.
  [guided]  t²·((x/t)² − 4(x/t)(y/t) + 4(y/t)² + 6(x/t) − 6(y/t) − 8)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − 4xy + 4y² + 6xt − 6yt − □   (trous : x² − 4xy + 4y² + 6xt − 6yt − 8t²)   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − 4x + 4 = 0
    ? Combien de points réels à l'infini, et quel genre ? · Deux : genre hyperbole (directions des asymptotes) / ✔ Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = 2   ← Points à l'infini : (2 : 1 : 0) ; genre parabole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − 4xy + 4y² + 6xt − 6yt − 8□ | x² − 4xy + 4y² + 6xt − 6yt − 8t²
  pièges : g10_homog_missing_t

```

### Niveau 3

```
Écris l'équation homogène de la droite 5x − 2y − 9 = 0 et trouve son point à l'infini.
  [tap, suivre l'erreur, menu menu]  t·(5(x/t) − 2(y/t) − 9)
    (Remplace x par x/t et y par y/t, puis multiplie par t.)
    = 5x − 2y − 9t   ← Degré 1 pour chaque terme
  — t = 0 : 5x − 2y = 0. Le point à l'infini (x : y : 0) donne une direction de la droite ?  [juge vector]  départ : w
    = (2 ; 5)   ← Le point (2 : 5 : 0)
  aides : Le terme constant devient c·t. | 5x − 2y + □·t = 0 | (2 : 5 : 0)
  pièges : g10_homog_missing_t

Écris l'équation homogène de la conique x² − 4y² − x + 5y + 1 = 0, puis trouve ses points à l'infini.
  [tap, suivre l'erreur, menu menu]  t²·((x/t)² − 4(y/t)² − (x/t) + 5(y/t) + 1)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − 4y² − xt + 5yt + t²   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − 4 = 0
    ? Combien de points réels à l'infini, et quel genre ? ✔ Deux : genre hyperbole (directions des asymptotes) / · Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = −2 ou x = 2   ← Points à l'infini : (−2 : 1 : 0) et (2 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − 4y² − xt + 5yt + □ | x² − 4y² − xt + 5yt + t²
  pièges : g10_homog_missing_t, g10_det_sign_nature

Écris l'équation homogène de la droite −2x + 3y − 3 = 0 et trouve son point à l'infini.
  [tap, suivre l'erreur, menu menu]  t·(−2(x/t) + 3(y/t) − 3)
    (Remplace x par x/t et y par y/t, puis multiplie par t.)
    = −2x + 3y − 3t   ← Degré 1 pour chaque terme
  — t = 0 : −2x + 3y = 0. Le point à l'infini (x : y : 0) donne une direction de la droite ?  [juge vector]  départ : w
    = (-3 ; -2)   ← Le point (−3 : −2 : 0)
  aides : Le terme constant devient c·t. | −2x + 3y + □·t = 0 | (−3 : −2 : 0)
  pièges : g10_homog_missing_t

```

### Niveau 4

```
Écris l'équation homogène de la conique x² + 2xy − 3y² − x + 6y − 7 = 0, puis trouve ses points à l'infini.
  [free, suivre l'erreur]  t²·((x/t)² + 2(x/t)(y/t) − 3(y/t)² − (x/t) + 6(y/t) − 7)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² + 2xy − 3y² − xt + 6yt − 7t²   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² + 2x − 3 = 0
    ? Combien de points réels à l'infini, et quel genre ? ✔ Deux : genre hyperbole (directions des asymptotes) / · Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = −3 ou x = 1   ← Points à l'infini : (−3 : 1 : 0) et (1 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² + 2xy − 3y² − xt + 6yt − 7□ | x² + 2xy − 3y² − xt + 6yt − 7t²
  pièges : g10_homog_missing_t, g10_det_sign_nature

Écris l'équation homogène de la conique x² − xy − 6y² − 3x − 4y − 7 = 0, puis trouve ses points à l'infini.
  [free, suivre l'erreur]  t²·((x/t)² − (x/t)(y/t) − 6(y/t)² − 3(x/t) − 4(y/t) − 7)
    (Remplace x par x/t et y par y/t, puis multiplie par t².)
    = x² − xy − 6y² − 3xt − 4yt − 7t²   ← Chaque terme de degré 2
  — Les points à l'infini ont t = 0 : il reste la partie du 2e degré. Avec y = 1 (un point à l'infini est défini à un facteur près) :  [juge solset]  départ : x² − x − 6 = 0
    ? Combien de points réels à l'infini, et quel genre ? ✔ Deux : genre hyperbole (directions des asymptotes) / · Un point double : genre parabole (direction de l'axe) / · Aucun : genre ellipse
    = x = −2 ou x = 3   ← Points à l'infini : (−2 : 1 : 0) et (3 : 1 : 0) ; genre hyperbole
  aides : Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. | x² − xy − 6y² − 3xt − 4yt − 7□ | x² − xy − 6y² − 3xt − 4yt − 7t²
  pièges : g10_homog_missing_t, g10_det_sign_nature

Écris l'équation homogène de la droite 4x + 4y + 4 = 0 et trouve son point à l'infini.
  [free, suivre l'erreur]  t·(4(x/t) + 4(y/t) + 4)
    (Remplace x par x/t et y par y/t, puis multiplie par t.)
    = 4x + 4y + 4t   ← Degré 1 pour chaque terme
  — t = 0 : 4x + 4y = 0. Le point à l'infini (x : y : 0) donne une direction de la droite ?  [juge vector]  départ : w
    = (-4 ; 4)   ← Le point (−4 : 4 : 0)
  aides : Le terme constant devient c·t. | 4x + 4y + □·t = 0 | (−4 : 4 : 0)
  pièges : g10_homog_missing_t

```

### Niveau 5

```
On donne la courbe x³ + 8y³ − xy = 0. Écris son équation homogène, puis trouve son point à l'infini et sa direction asymptotique.
  [free, sans aide]  t³·((x/t)³ + 8(y/t)³ − (x/t)(y/t))
    (Homogénéise (degré 3).)
    = x³ + 8y³ − xyt   ← Le terme du 2e degré reçoit un t
  — t = 0 et y = 1 :  [juge solset]  départ : x³ + 8 = 0
    = x = −2   ← Un seul point réel à l'infini : (−2 : 1 : 0)
  — Une direction asymptotique de la courbe ?  [juge vector]  départ : w
    = (-2 ; 1)
  pièges : g10_homog_missing_t

On donne la courbe x³ + 8y³ − 2xy = 0. Écris son équation homogène, puis trouve son point à l'infini et sa direction asymptotique.
  [free, sans aide]  t³·((x/t)³ + 8(y/t)³ − 2(x/t)(y/t))
    (Homogénéise (degré 3).)
    = x³ + 8y³ − 2xyt   ← Le terme du 2e degré reçoit un t
  — t = 0 et y = 1 :  [juge solset]  départ : x³ + 8 = 0
    = x = −2   ← Un seul point réel à l'infini : (−2 : 1 : 0)
  — Une direction asymptotique de la courbe ?  [juge vector]  départ : w
    = (-2 ; 1)
  pièges : g10_homog_missing_t

On donne la courbe x³ + 8y³ − 2xy = 0. Écris son équation homogène, puis trouve son point à l'infini et sa direction asymptotique.
  [free, sans aide]  t³·((x/t)³ + 8(y/t)³ − 2(x/t)(y/t))
    (Homogénéise (degré 3).)
    = x³ + 8y³ − 2xyt   ← Le terme du 2e degré reçoit un t
  — t = 0 et y = 1 :  [juge solset]  départ : x³ + 8 = 0
    = x = −2   ← Un seul point réel à l'infini : (−2 : 1 : 0)
  — Une direction asymptotique de la courbe ?  [juge vector]  départ : w
    = (-2 ; 1)
  pièges : g10_homog_missing_t

```

### Variantes d'examen

```
Combien la conique x² − xy + 2y² − x + 8y − 1 = 0 a-t-elle de points réels à l'infini ?
  · Une infinité   · Un seul (double)   · Deux [g10_det_sign_nature]   ✔ Aucun
  [examen mcq]
  pièges : g10_det_sign_nature

```

## Pièges de cette unité

- **Tangente verticale oubliée** (`g10_vertical_tangent_lost`, E) : une seule tangente 3x + 4y − 19 = 0 au lieu de aussi x = −3
- **Rayon pris pour la direction de la tangente** (`g10_tangent_radius_direction`, E) : droite par T de direction ΩT⃗ au lieu de de normale ΩT⃗
- **Équations soustraites sans normaliser** (`g10_radical_unnormalized`, E) : 2γ₁ − γ₂ garde un x² au lieu de normaliser d'abord
- **Orthogonaux confondu avec tangents** (`g10_orthogonal_sum`, E) : Ω₁Ω₂ = r₁ + r₂ : orthogonaux au lieu de Ω₁Ω₂² = r₁² + r₂²
- **Polaire écrite comme si le centre était O** (`g10_polar_origin_formula`, E) : x₀x + y₀y = r² au lieu de (x₀ − h)(x − h) + (y₀ − k)(y − k) = r²
- **c² de l'autre conique** (`g10_c_wrong_formula`, E) : ellipse : c² = a² + b² au lieu de c² = a² − b²
- **Axes échangés** (`g10_axis_swap`, E) : grand axe lu sur le petit dénominateur au lieu de sur le grand
- **Pente des asymptotes inversée** (`g10_asymptote_ratio`, E) : y − k = ±(a/b)(x − h) au lieu de ±(b/a)(x − h)
- **Foyer à p du sommet** (`g10_parabola_p_half`, E) : F = (3 ; 3) au lieu de (3 ; 1)
- **Coefficient de xy entier dans A** (`g10_bhalf_matrix`, E) : A = [[5, −6], [−6, 5]] au lieu de [[5, −3], [−3, 5]]
- **Vecteurs propres non normés** (`g10_eigvec_not_normed`, E) : 15X² − 10Y² − 6 = 0 au lieu de 3X² − 2Y² − 6 = 0
- **Constante de départ gardée** (`g10_constant_not_updated`, E) : 3X² − 2Y² − 9 = 0 au lieu de 3X² − 2Y² − 6 = 0
- **Genre lu à l'envers sur le signe de δ** (`g10_det_sign_nature`, E) : δ > 0 ⇒ hyperbole au lieu de ellipse
- **Δ = 0 oublié : conique dégénérée** (`g10_degenerate_ignored`, E) : « hyperbole » pour (x − y)(x + 2y) = 0 au lieu de deux droites
- **Coordonnées de Ru données pour Re** (`g10_foci_reduced_frame`, E) : F = (√5 ; 0) au lieu de (3 ; 0)
- **Retour avec Pᵀ au lieu de P** (`g10_frame_back_transpose`, E) : x = Ω + Pᵀ(X ; Y) au lieu de Ω + P(X ; Y)
- **Excentricité inversée** (`g10_e_inverted`, E) : e·MF = d(M, D) au lieu de MF = e·d(M, D)
- **Dédoublement faux** (`g10_doubling_wrong`, E) : x → x₀ (au lieu de (x + x₀)/2) au lieu de x → (x + x₀)/2
- **Division par une expression qui peut s'annuler** (`g10_family_division_by_zero`, E) : m = (1 − x)/y sans y ≠ 0 au lieu de traiter y = 0 à part
- **Condition de signe oubliée en élevant au carré** (`g10_locus_square_condition`, E) : l'hyperbole entière au lieu de une seule branche
- **Terme non homogénéisé** (`g10_homog_missing_t`, E) : 3x − 5 au lieu de 3xt − 5t²
