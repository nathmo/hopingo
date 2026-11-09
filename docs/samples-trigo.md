# Exemples de questions — Trigonométrie

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Radians et degrés (`g3-radians`, Gymnase)

_π rad = 180° ; longueur d'arc L = rθ._

### Niveau 1

```
Convertis 120° en radians.
  [guided]  120°
    = 120/□·π   (trous : 120/180·π)   ← Multiplier par π/180
    = (2π)/3   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 120° = 120/180·π | (2π)/3
  pièges : g3_deg_rad

Convertis 90° en radians.
  [guided]  90°
    = 90/□·π   (trous : 90/180·π)   ← Multiplier par π/180
    = π/2   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 90° = 90/180·π | π/2
  pièges : g3_deg_rad

Convertis 135° en radians.
  [guided]  135°
    = 135/□·π   (trous : 135/180·π)   ← Multiplier par π/180
    = (3π)/4   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 135° = 135/180·π | (3π)/4
  pièges : g3_deg_rad

```

### Niveau 2

```
Convertis 420° en radians.
  [guided]  420°
    = 420/180·π   ← Multiplier par π/180
    = (7π)/3   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 420° = 420/180·π | (7π)/3
  pièges : g3_deg_rad

Convertis 240° en radians.
  [guided]  240°
    = 240/180·π   ← Multiplier par π/180
    = (4π)/3   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 240° = 240/180·π | (4π)/3
  pièges : g3_deg_rad

Convertis 330° en radians.
  [guided]  330°
    = 330/180·π   ← Multiplier par π/180
    = (11π)/6   ← Simplifier la fraction
  aides : 180° = π rad : on multiplie par π/180. | 330° = 330/180·π | (11π)/6
  pièges : g3_deg_rad

```

### Niveau 3

```
Convertis 270° en radians, puis (3π)/4 en degrés.
  [tap, suivre l'erreur, menu menu]  270°
    = (3π)/2   ← En radians
  — Et (3π)/4 en degrés :  [juge value]  départ : (3π)/4
    = 135°   ← Multiplier par 180/π
  aides : Degrés → radians : × π/180. Radians → degrés : × 180/π. | (3π)/4 = (3·180/4)° | (3π)/2 puis 135°
  pièges : g3_deg_rad

Convertis −45° en radians, puis (11π)/6 en degrés.
  [tap, suivre l'erreur, menu menu]  −45°
    = −π/4   ← En radians
  — Et (11π)/6 en degrés :  [juge value]  départ : (11π)/6
    = 330°   ← Multiplier par 180/π
  aides : Degrés → radians : × π/180. Radians → degrés : × 180/π. | (11π)/6 = (11·180/6)° | −π/4 puis 330°
  pièges : g3_deg_rad

Convertis 240° en radians, puis (5π)/4 en degrés.
  [tap, suivre l'erreur, menu menu]  240°
    = (4π)/3   ← En radians
  — Et (5π)/4 en degrés :  [juge value]  départ : (5π)/4
    = 225°   ← Multiplier par 180/π
  aides : Degrés → radians : × π/180. Radians → degrés : × 180/π. | (5π)/4 = (5·180/4)° | (4π)/3 puis 225°
  pièges : g3_deg_rad

```

### Niveau 4

```
Aire du secteur d'un disque de rayon 7 cm et d'angle 20° (en cm², valeur exacte).
  [free, suivre l'erreur]  20°
    = π/9   ← Convertir en radians
  — Aire du secteur A = r²θ/2 :  [juge value]  départ : 7²·20°/2
    = 49/2·π/9   ← A = r²θ/2
    = (49π)/18   ← Calculer
  aides : A = r²θ/2 demande θ en radians. | 20° = 20/180·π = … | π/9
  pièges : g3_deg_rad

Longueur de l'arc d'un cercle de rayon 15 cm sous-tendu par un angle de 135° (en cm, valeur exacte).
  [free, suivre l'erreur]  135°
    = (3π)/4   ← Convertir en radians
  — Longueur L = rθ :  [juge value]  départ : 15·135°
    = 15·(3π)/4   ← L = rθ
    = (45π)/4   ← Calculer
  aides : L = rθ demande θ en radians. | 135° = 135/180·π = … | (3π)/4
  pièges : g3_deg_rad

Longueur de l'arc d'un cercle de rayon 10 cm sous-tendu par un angle de 30° (en cm, valeur exacte).
  [free, suivre l'erreur]  30°
    = π/6   ← Convertir en radians
  — Longueur L = rθ :  [juge value]  départ : 10·30°
    = 10·π/6   ← L = rθ
    = (5π)/3   ← Calculer
  aides : L = rθ demande θ en radians. | 30° = 30/180·π = … | π/6
  pièges : g3_deg_rad

```

### Niveau 5

```
Un polygone régulier a 5 côtés. Quel est chacun de ses angles intérieurs, en radians ?
  [free, sans aide]  θ
    = (5 − 2)·π/5   ← Somme des angles (n − 2)π, partagée en n
    = (3π)/5   ← Simplifier

Un polygone régulier a 9 côtés. Quel est chacun de ses angles intérieurs, en radians ?
  [free, sans aide]  θ
    = (9 − 2)·π/9   ← Somme des angles (n − 2)π, partagée en n
    = (7π)/9   ← Simplifier

Un polygone régulier a 5 côtés. Quel est chacun de ses angles intérieurs, en radians ?
  [free, sans aide]  θ
    = (5 − 2)·π/5   ← Somme des angles (n − 2)π, partagée en n
    = (3π)/5   ← Simplifier

```

### Variantes d'examen

```
Longueur de l'arc d'un cercle de rayon 6 cm sous-tendu par un angle de 45° ?
  · 3π cm   · 270 cm [g3_deg_rad]   · π/4 cm   ✔ (3π)/2 cm
  [examen mcq]
  pièges : g3_deg_rad

```

## Cercle trigonométrique, réduction d'angles (`g3-reduce`, Gymnase)

_Retirer des tours, puis lire le quadrant._

### Niveau 1

```
Calcule sin((5π)/3) sans calculatrice.
  [guided]  sin((5π)/3)
    = −sin(π/3)   ← Angle associé
    = □   (trous : −√3/2)   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | −sin(π/3) | −√3/2
  pièges : g3_reduce_sign

Calcule sin((2π)/3) sans calculatrice.
  [guided]  sin((2π)/3)
    = sin(π/3)   ← Angle associé
    = □   (trous : √3/2)   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | sin(π/3) | √3/2

Calcule sin(π/3) sans calculatrice.
  [guided]  sin(π/3)
    = □   (trous : √3/2)   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | sin(π/3) = … | √3/2

```

### Niveau 2

```
Calcule cos((52π)/3) sans calculatrice.
  [guided]  cos((52π)/3)
    = cos((4π)/3)   ← Retirer des tours de 2π
    = −cos(π/3)   ← Angle associé
    = −1/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | −cos(π/3) | −1/2
  pièges : g3_reduce_sign

Calcule sin((14π)/3) sans calculatrice.
  [guided]  sin((14π)/3)
    = sin((2π)/3)   ← Retirer des tours de 2π
    = sin(π/3)   ← Angle associé
    = √3/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | sin(π/3) | √3/2

Calcule cos((35π)/6) sans calculatrice.
  [guided]  cos((35π)/6)
    = cos((11π)/6)   ← Retirer des tours de 2π
    = cos(π/6)   ← Angle associé
    = √3/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | cos(π/6) | √3/2

```

### Niveau 3

```
Calcule tan(−(5π)/3) sans calculatrice.
  [tap, suivre l'erreur, menu trig]  tan(−(5π)/3)
    = tan(π/3)   ← Retirer des multiples de π
    = √3   ← Valeur connue
  aides : tan a pour période π : retire des multiples de π, puis lis le quadrant. | tan(π/3) | √3

Calcule tan(−(27π)/4) sans calculatrice.
  [tap, suivre l'erreur, menu trig]  tan(−(27π)/4)
    = tan(π/4)   ← Retirer des multiples de π
    = 1   ← Valeur connue
  aides : tan a pour période π : retire des multiples de π, puis lis le quadrant. | tan(π/4) | 1

Calcule sin(−(34π)/3) sans calculatrice.
  [tap, suivre l'erreur, menu trig]  sin(−(34π)/3)
    = sin((2π)/3)   ← Retirer des tours de 2π
    = sin(π/3)   ← Angle associé
    = √3/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | sin(π/3) | √3/2

```

### Niveau 4

```
Calcule sin((35π)/3) sans calculatrice.
  [free, suivre l'erreur]  sin((35π)/3)
    = sin((5π)/3)   ← Retirer des tours de 2π
    = −sin(π/3)   ← Angle associé
    = −√3/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | −sin(π/3) | −√3/2
  pièges : g3_reduce_sign

Calcule cos((37π)/4) sans calculatrice.
  [free, suivre l'erreur]  cos((37π)/4)
    = cos((5π)/4)   ← Retirer des tours de 2π
    = −cos(π/4)   ← Angle associé
    = −√2/2   ← Valeur connue
  aides : Retire des tours de 2π, puis lis le quadrant. | −cos(π/4) | −√2/2
  pièges : g3_reduce_sign

Écris sin((7π)/2 − x) avec une seule fonction de x.
  [free, suivre l'erreur]  sin((7π)/2 − x)
    = sin((3π)/2 − x)   ← Retirer des tours de 2π
    = −cos(x)   ← Autour de π/2 : sin et cos s'échangent
  aides : Retire des multiples de 2π, puis utilise un angle associé. | sin((3π)/2 − x) | −cos(x)
  pièges : g3_reduce_swap, g3_linear, g3_add_sign

```

### Niveau 5

```
Calcule cot((19π)/3) sans calculatrice.
  [free, sans aide]  cot((19π)/3)
    = cot(π/3)   ← Retirer des multiples de π
    = √3/3   ← Valeur connue

Calcule cot(−(23π)/3) sans calculatrice.
  [free, sans aide]  cot(−(23π)/3)
    = cot(π/3)   ← Retirer des multiples de π
    = √3/3   ← Valeur connue

Calcule sin(−(20π)/3) sans calculatrice.
  [free, sans aide]  sin(−(20π)/3)
    = sin((4π)/3)   ← Retirer des tours de 2π
    = −sin(π/3)   ← Angle associé
    = −√3/2   ← Valeur connue
  pièges : g3_reduce_sign

```

### Variantes d'examen

```
cos((44π)/3) = ?
  · 1/2 [g3_reduce_sign]   · √3/2   · −√3/2 [g3_reduce_swap]   ✔ −1/2
  [examen mcq]
  pièges : g3_reduce_sign, g3_reduce_swap

Vrai ou faux ?
  « Pour tout x réel, tan(x + π) = −tan(x). » → FAUX
    contre-exemple (refute) : x = π/4
  [examen tf]
  pièges : g3_reduce_sign

```

## Formules d'addition, d'angle double, de bissection, somme-produit (`g3-identities`, Gymnase)

_cos(a + b), sin 2x, cos²x = (1 + cos 2x)/2._

### Niveau 1

```
Montre que (1 + cos(4x))/2 = cos(2x)² (transforme le membre de gauche).
  [guided]  (1 + cos(4x))/2
    (Formule : Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u.)
    = (1 + 2□² − 1)/2   (trous : (1 + 2cos(2x)² − 1)/2)   ← Angle double
    = cos(2x)²   ← Angle double
  aides : Commence par : Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u. | (1 + 2cos(2x)² − 1)/2 | cos(2x)²
  pièges : g3_linear

Montre que sin(3x) = 3sin(x) − 4sin(x)³ (transforme le membre de gauche).
  [guided]  sin(3x)
    (Formule : Addition : cos(a ± b), sin(a ± b).)
    = □cos(x) + cos(2x)sin(x)   (trous : sin(2x)cos(x) + cos(2x)sin(x))   ← Formule d'addition
    = 2sin(x)cos(x)² + (1 − 2sin(x)²)sin(x)   ← Angle double
    = 2sin(x)(1 − sin(x)²) + sin(x) − 2sin(x)³   ← cos² + sin² = 1
    = 3sin(x) − 4sin(x)³   ← cos² + sin² = 1
  aides : Commence par : Addition : cos(a ± b), sin(a ± b). | sin(2x)cos(x) + cos(2x)sin(x) | 2sin(x)cos(x)² + (1 − 2sin(x)²)sin(x)
  pièges : g3_linear

Montre que sin(3x) = 3sin(x) − 4sin(x)³ (transforme le membre de gauche).
  [guided]  sin(3x)
    (Formule : Addition : cos(a ± b), sin(a ± b).)
    = □cos(x) + cos(2x)sin(x)   (trous : sin(2x)cos(x) + cos(2x)sin(x))   ← Formule d'addition
    = 2sin(x)cos(x)² + (1 − 2sin(x)²)sin(x)   ← Angle double
    = 2sin(x)(1 − sin(x)²) + sin(x) − 2sin(x)³   ← cos² + sin² = 1
    = 3sin(x) − 4sin(x)³   ← cos² + sin² = 1
  aides : Commence par : Addition : cos(a ± b), sin(a ± b). | sin(2x)cos(x) + cos(2x)sin(x) | 2sin(x)cos(x)² + (1 − 2sin(x)²)sin(x)
  pièges : g3_linear

```

### Niveau 2

```
Montre que tan(x) + 1/tan(x) = 2/sin(2x) (transforme le membre de gauche).
  [guided]  tan(x) + 1/tan(x)
    ? Quelle formule pour commencer ? ✔ tan u = sin u / cos u / · Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u / · Addition : cos(a ± b), sin(a ± b) / · cos²u + sin²u = 1
    = sin(x)/cos(x) + cos(x)/sin(x)   ← tan = sin/cos
    = (sin(x)² + cos(x)²)/(sin(x)cos(x))   ← tan = sin/cos
    = 1/(sin(x)cos(x))   ← cos² + sin² = 1
    = 2/sin(2x)   ← Angle double
  aides : Commence par : tan u = sin u / cos u. | sin(x)/cos(x) + cos(x)/sin(x) | (sin(x)² + cos(x)²)/(sin(x)cos(x))
  pièges : g3_linear

Montre que (1 − cos(2x))/sin(2x) = tan(x) (transforme le membre de gauche).
  [guided]  (1 − cos(2x))/sin(2x)
    ? Quelle formule pour commencer ? ✔ Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u / · Addition : cos(a ± b), sin(a ± b) / · cos²u + sin²u = 1 / · tan u = sin u / cos u
    = 2sin(x)²/sin(2x)   ← Angle double
    = 2sin(x)²/(2sin(x)cos(x))   ← Angle double
    = sin(x)/cos(x)   ← tan = sin/cos
    = tan(x)   ← tan = sin/cos
  aides : Commence par : Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u. | 2sin(x)²/sin(2x) | 2sin(x)²/(2sin(x)cos(x))
  pièges : g3_linear

Montre que cos(x) − cos(3x) = 2sin(2x)sin(x) (transforme le membre de gauche).
  [guided]  cos(x) − cos(3x)
    ? Quelle formule pour commencer ? ✔ Somme-produit : sin p ± sin q, cos p ± cos q / · Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u / · Addition : cos(a ± b), sin(a ± b) / · cos²u + sin²u = 1
    = −2sin((x + 3x)/2)sin((x − 3x)/2)   ← Somme-produit
    = 2sin(2x)sin(x)   ← Somme-produit
  aides : Commence par : Somme-produit : sin p ± sin q, cos p ± cos q. | −2sin((x + 3x)/2)sin((x − 3x)/2) | 2sin(2x)sin(x)
  pièges : g3_linear

```

### Niveau 3

```
Montre que cos(3x)⁴ − sin(3x)⁴ = cos(6x) (transforme le membre de gauche).
  [tap, suivre l'erreur, menu menu]  cos(3x)⁴ − sin(3x)⁴
    = (cos(3x)² − sin(3x)²)(cos(3x)² + sin(3x)²)   ← Factoriser a² − b²
    ? Quelle formule as-tu utilisée ? → Factoriser a² − b²
    = cos(3x)² − sin(3x)²   ← cos² + sin² = 1
    = cos(6x)   ← Angle double
  aides : Commence par : Factoriser a² − b² = (a − b)(a + b). | (cos(3x)² − sin(3x)²)(cos(3x)² + sin(3x)²) | cos(3x)² − sin(3x)²
  pièges : g3_linear

Montre que (sin(2x) + cos(2x))² = 1 + sin(4x) (transforme le membre de gauche).
  [tap, suivre l'erreur, menu menu]  (sin(2x) + cos(2x))²
    = sin(2x)² + 2sin(2x)cos(2x) + cos(2x)²   ← Développer
    ? Quelle formule as-tu utilisée ? → Développer
    = 1 + 2sin(2x)cos(2x)   ← cos² + sin² = 1
    = 1 + sin(4x)   ← Angle double
  aides : Commence par : Développer (identité remarquable). | sin(2x)² + 2sin(2x)cos(2x) + cos(2x)² | 1 + 2sin(2x)cos(2x)
  pièges : g3_linear

Montre que cos(x + π/6) + cos(x − π/6) = √3cos(x) (transforme le membre de gauche).
  [tap, suivre l'erreur, menu menu]  cos(x + π/6) + cos(x − π/6)
    = cos(x)cos(π/6) − sin(x)sin(π/6) + cos(x)cos(π/6) + sin(x)sin(π/6)   ← Formule d'addition
    ? Quelle formule as-tu utilisée ? → Formule d'addition
    = 2cos(x)cos(π/6)   ← Formule d'addition
    = √3cos(x)   ← Formule d'addition
  aides : Commence par : Addition : cos(a ± b), sin(a ± b). | cos(x)cos(π/6) − sin(x)sin(π/6) + cos(x)cos(π/6) + sin(x)sin(π/6) | 2cos(x)cos(π/6)
  pièges : g3_linear, g3_add_sign

```

### Niveau 4

```
Montre que (1 − cos(2x))/sin(2x) = tan(x) (transforme le membre de gauche).
  [free, suivre l'erreur]  (1 − cos(2x))/sin(2x)
    = 2sin(x)²/sin(2x)   ← Angle double
    = 2sin(x)²/(2sin(x)cos(x))   ← Angle double
    = sin(x)/cos(x)   ← tan = sin/cos
    = tan(x)   ← tan = sin/cos
  aides : Commence par : Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u. | 2sin(x)²/sin(2x) | 2sin(x)²/(2sin(x)cos(x))
  pièges : g3_linear

Montre que cos(x + π/4) + cos(x − π/4) = √2cos(x) (transforme le membre de gauche).
  [free, suivre l'erreur]  cos(x + π/4) + cos(x − π/4)
    = cos(x)cos(π/4) − sin(x)sin(π/4) + cos(x)cos(π/4) + sin(x)sin(π/4)   ← Formule d'addition
    = 2cos(x)cos(π/4)   ← Formule d'addition
    = √2cos(x)   ← Formule d'addition
  aides : Commence par : Addition : cos(a ± b), sin(a ± b). | cos(x)cos(π/4) − sin(x)sin(π/4) + cos(x)cos(π/4) + sin(x)sin(π/4) | 2cos(x)cos(π/4)
  pièges : g3_linear, g3_add_sign

Montre que (1 + cos(4x))/2 = cos(2x)² (transforme le membre de gauche).
  [free, suivre l'erreur]  (1 + cos(4x))/2
    = (1 + 2cos(2x)² − 1)/2   ← Angle double
    = cos(2x)²   ← Angle double
  aides : Commence par : Angle double : sin 2u = 2 sin u cos u, cos 2u = 2cos²u − 1 = 1 − 2sin²u. | (1 + 2cos(2x)² − 1)/2 | cos(2x)²
  pièges : g3_linear

```

### Niveau 5

```
Résous sin(3x) + sin(x) = 0 dans ℝ (k désigne un entier).
  [free, sans aide]  sin(3x) + sin(x) = 0
    = 2sin(2x)cos(x) = 0   ← Somme-produit
    = sin(2x) = 0 ou cos(x) = 0   ← Produit nul
    = x = kπ/2 ou x = π/2 + kπ   ← Équations de base

Résous sin(3x) + sin(x) = 0 dans ℝ (k désigne un entier).
  [free, sans aide]  sin(3x) + sin(x) = 0
    = 2sin(2x)cos(x) = 0   ← Somme-produit
    = sin(2x) = 0 ou cos(x) = 0   ← Produit nul
    = x = kπ/2 ou x = π/2 + kπ   ← Équations de base

Résous sin(3x) − sin(x) = 0 dans ℝ (k désigne un entier).
  [free, sans aide]  sin(3x) − sin(x) = 0
    = 2cos(2x)sin(x) = 0   ← Somme-produit
    = cos(2x) = 0 ou sin(x) = 0   ← Produit nul
    = x = π/4 + kπ/2 ou x = kπ   ← Équations de base

```

### Variantes d'examen

```
sin(a − b) = ?
  · sin(a) − sin(b) [g3_linear]   ✔ sin(a)cos(b) − cos(a)sin(b)   · sin(a)cos(b) + cos(a)sin(b) [g3_add_sign]   · sin(a)sin(b) − cos(a)cos(b)
  [examen mcq]
  pièges : g3_add_sign, g3_linear

Vrai ou faux ?
  « Pour tous a, b réels, cos(2a) = 1 − 2sin(a)². » → VRAI
  [examen tf]

```

## Valeurs exactes sans calculatrice (`g3-exact`, Gymnase)

_7π/12 = π/3 + π/4 ; π/8 = (π/4)/2._

### Niveau 1

```
Calcule cos((7π)/12) sans calculatrice (valeur exacte).
  [guided]  cos((7π)/12)
    = cos(π/3 + π/4)   ← Décomposer
    = cos(π/3)cos(π/4) − sin(π/3)sin(π/4)   ← Formule d'addition
    = (1/2)(√2/2) − (√3/2)□   (trous : (1/2)(√2/2) − (√3/2)(√2/2))   ← Valeurs connues
    = −(√6 − √2)/4   ← Simplifier
  aides : (7π)/12 = π/3 + π/4. | cos(a + b) = cos a cos b − sin a sin b | cos(π/3)cos(π/4) − sin(π/3)sin(π/4)
  pièges : g3_half_sign

Calcule cos(−(5π)/12) sans calculatrice (valeur exacte).
  [guided]  cos(−(5π)/12)
    = cos(π/4 − (2π)/3)   ← Décomposer
    = cos(π/4)cos((2π)/3) + sin(π/4)sin((2π)/3)   ← Formule d'addition
    = (√2/2)(−1/2) + (√2/2)□   (trous : (√2/2)(−1/2) + (√2/2)(√3/2))   ← Valeurs connues
    = (√6 − √2)/4   ← Simplifier
  aides : −(5π)/12 = π/4 − (2π)/3. | cos(a + b) = cos a cos b − sin a sin b | cos(π/4)cos((2π)/3) + sin(π/4)sin((2π)/3)

Calcule cos(−π/12) sans calculatrice (valeur exacte).
  [guided]  cos(−π/12)
    = cos(π/6 − π/4)   ← Décomposer
    = cos(π/6)cos(π/4) + sin(π/6)sin(π/4)   ← Formule d'addition
    = (√3/2)(√2/2) + (1/2)□   (trous : (√3/2)(√2/2) + (1/2)(√2/2))   ← Valeurs connues
    = (√6 + √2)/4   ← Simplifier
  aides : −π/12 = π/6 − π/4. | cos(a + b) = cos a cos b − sin a sin b | cos(π/6)cos(π/4) + sin(π/6)sin(π/4)

```

### Niveau 2

```
Calcule cos(π/12) sans calculatrice (valeur exacte).
  [guided]  cos(π/12)
    ? Comment écrire π/12 ? ✔ π/4 − π/6 / · La moitié de π/6 / · cos(π/4) − cos(π/6)
    = cos(π/4 − π/6)   ← Décomposer
    = cos(π/4)cos(π/6) + sin(π/4)sin(π/6)   ← Formule d'addition
    = (√2/2)(√3/2) + (√2/2)(1/2)   ← Valeurs connues
    = (√6 + √2)/4   ← Simplifier
  aides : π/12 = π/4 − π/6. | cos(a + b) = cos a cos b − sin a sin b | cos(π/4)cos(π/6) + sin(π/4)sin(π/6)
  pièges : g3_linear

Calcule cos((19π)/12) sans calculatrice (valeur exacte).
  [guided]  cos((19π)/12)
    ? Comment écrire (19π)/12 ? ✔ (5π)/6 + (3π)/4 / · La moitié de (19π)/6 / · cos((5π)/6) + cos((3π)/4)
    = cos((5π)/6 + (3π)/4)   ← Décomposer
    = cos((5π)/6)cos((3π)/4) − sin((5π)/6)sin((3π)/4)   ← Formule d'addition
    = (−√3/2)(−√2/2) − (1/2)(√2/2)   ← Valeurs connues
    = (√6 − √2)/4   ← Simplifier
  aides : (19π)/12 = (5π)/6 + (3π)/4. | cos(a + b) = cos a cos b − sin a sin b | cos((5π)/6)cos((3π)/4) − sin((5π)/6)sin((3π)/4)
  pièges : g3_linear

Calcule cos(−π/12) sans calculatrice (valeur exacte).
  [guided]  cos(−π/12)
    ? Comment écrire −π/12 ? ✔ π/6 − π/4 / · La moitié de −π/6 / · cos(π/6) − cos(π/4)
    = cos(π/6 − π/4)   ← Décomposer
    = cos(π/6)cos(π/4) + sin(π/6)sin(π/4)   ← Formule d'addition
    = (√3/2)(√2/2) + (1/2)(√2/2)   ← Valeurs connues
    = (√6 + √2)/4   ← Simplifier
  aides : −π/12 = π/6 − π/4. | cos(a + b) = cos a cos b − sin a sin b | cos(π/6)cos(π/4) + sin(π/6)sin(π/4)
  pièges : g3_linear

```

### Niveau 3

```
Calcule tan(−π/12) sans calculatrice (valeur exacte).
  [tap, suivre l'erreur, menu exact]  tan(−π/12)
    = tan(π/6 − π/4)   ← Décomposer
    = (tan(π/6) − tan(π/4))/(1 + tan(π/6)tan(π/4))   ← Formule d'addition
    = (√3/3 − (1))/(1 + (√3/3)(1))   ← Valeurs connues
    = −2 + √3   ← Simplifier
  aides : −π/12 = π/6 − π/4. | tan(a + b) = (tan a + tan b)/(1 − tan a tan b) | (tan(π/6) − tan(π/4))/(1 + tan(π/6)tan(π/4))
  pièges : g3_half_sign

Calcule sin((13π)/12) sans calculatrice (valeur exacte).
  [tap, suivre l'erreur, menu exact]  sin((13π)/12)
    = sin((3π)/4 + π/3)   ← Décomposer
    = sin((3π)/4)cos(π/3) + cos((3π)/4)sin(π/3)   ← Formule d'addition
    = (√2/2)(1/2) + (−√2/2)(√3/2)   ← Valeurs connues
    = −(√6 − √2)/4   ← Simplifier
  aides : (13π)/12 = (3π)/4 + π/3. | sin(a + b) = sin a cos b + cos a sin b | sin((3π)/4)cos(π/3) + cos((3π)/4)sin(π/3)
  pièges : g3_half_sign

Calcule sin((11π)/12) sans calculatrice (valeur exacte).
  [tap, suivre l'erreur, menu exact]  sin((11π)/12)
    = sin((2π)/3 + π/4)   ← Décomposer
    = sin((2π)/3)cos(π/4) + cos((2π)/3)sin(π/4)   ← Formule d'addition
    = (√3/2)(√2/2) + (−1/2)(√2/2)   ← Valeurs connues
    = (√6 − √2)/4   ← Simplifier
  aides : (11π)/12 = (2π)/3 + π/4. | sin(a + b) = sin a cos b + cos a sin b | sin((2π)/3)cos(π/4) + cos((2π)/3)sin(π/4)

```

### Niveau 4

```
Calcule sin((11π)/12) sans calculatrice (valeur exacte).
  [free, suivre l'erreur]  sin((11π)/12)
    = sin((2π)/3 + π/4)   ← Décomposer
    = sin((2π)/3)cos(π/4) + cos((2π)/3)sin(π/4)   ← Formule d'addition
    = (√3/2)(√2/2) + (−1/2)(√2/2)   ← Valeurs connues
    = (√6 − √2)/4   ← Simplifier
  aides : (11π)/12 = (2π)/3 + π/4. | sin(a + b) = sin a cos b + cos a sin b | sin((2π)/3)cos(π/4) + cos((2π)/3)sin(π/4)

Calcule cos((11π)/12) sans calculatrice (valeur exacte).
  [free, suivre l'erreur]  cos((11π)/12)
    = cos((2π)/3 + π/4)   ← Décomposer
    = cos((2π)/3)cos(π/4) − sin((2π)/3)sin(π/4)   ← Formule d'addition
    = (−1/2)(√2/2) − (√3/2)(√2/2)   ← Valeurs connues
    = −(√6 + √2)/4   ← Simplifier
  aides : (11π)/12 = (2π)/3 + π/4. | cos(a + b) = cos a cos b − sin a sin b | cos((2π)/3)cos(π/4) − sin((2π)/3)sin(π/4)
  pièges : g3_half_sign

Calcule cos((19π)/12) sans calculatrice (valeur exacte).
  [free, suivre l'erreur]  cos((19π)/12)
    = cos((5π)/6 + (3π)/4)   ← Décomposer
    = cos((5π)/6)cos((3π)/4) − sin((5π)/6)sin((3π)/4)   ← Formule d'addition
    = (−√3/2)(−√2/2) − (1/2)(√2/2)   ← Valeurs connues
    = (√6 − √2)/4   ← Simplifier
  aides : (19π)/12 = (5π)/6 + (3π)/4. | cos(a + b) = cos a cos b − sin a sin b | cos((5π)/6)cos((3π)/4) − sin((5π)/6)sin((3π)/4)

```

### Niveau 5

```
On sait que sin x = −8/17 et x ∈ [π ; 3π/2]. Calcule cos x, sin 2x et cos 2x.
  [free, sans aide]  cos(x)
    = −√(1 − 64/289)   ← cos x < 0 sur [π ; 3π/2]
    = −15/17   ← cos x
  — sin 2x = 2 sin x cos x :  [juge value]  départ : 2·(−8/17)·(−15/17)
    = 240/289   ← Angle double
  — cos 2x = 1 − 2sin²x :  [juge value]  départ : 1 − 2·(−8/17)²
    = 161/289   ← Angle double

On sait que sin x = 15/17 et x ∈ [π/2 ; π]. Calcule cos x, sin 2x et cos 2x.
  [free, sans aide]  cos(x)
    = −√(1 − 225/289)   ← cos x < 0 sur [π/2 ; π]
    = −8/17   ← cos x
  — sin 2x = 2 sin x cos x :  [juge value]  départ : 2·(15/17)·(−8/17)
    = −240/289   ← Angle double
  — cos 2x = 1 − 2sin²x :  [juge value]  départ : 1 − 2·(15/17)²
    = −161/289   ← Angle double

On sait que sin x = 4/5 et x ∈ [π/2 ; π]. Calcule cos x, sin 2x et cos 2x.
  [free, sans aide]  cos(x)
    = −√(1 − 16/25)   ← cos x < 0 sur [π/2 ; π]
    = −3/5   ← cos x
  — sin 2x = 2 sin x cos x :  [juge value]  départ : 2·(4/5)·(−3/5)
    = −24/25   ← Angle double
  — cos 2x = 1 − 2sin²x :  [juge value]  départ : 1 − 2·(4/5)²
    = −7/25   ← Angle double

```

### Variantes d'examen

```
cos((17π)/12) = ?
  · (√6 + √2)/4 [g3_add_sign]   ✔ −(√6 − √2)/4   · (√6 − √2)/4 [g3_half_sign]   · −(√6 + √2)/4
  [examen mcq]
  pièges : g3_add_sign, g3_half_sign

On sait que sin x = −5/13 et x ∈ [π ; 3π/2]. Calcule cos x, sin 2x et cos 2x.
  [free, sans aide, examen open]  cos(x)
    = −√(1 − 25/169)   ← cos x < 0 sur [π ; 3π/2]
    = −12/13   ← cos x
  — sin 2x = 2 sin x cos x :  [juge value]  départ : 2·(−5/13)·(−12/13)
    = 120/169   ← Angle double
  — cos 2x = 1 − 2sin²x :  [juge value]  départ : 1 − 2·(−5/13)²
    = 119/169   ← Angle double

```

## Équations de base : cos x = a, sin x = a, tan x = a (`g3-basic-eq`, Gymnase)

_Deux familles (une pour tan), et la période divisée aussi._

### Niveau 1

```
Résous cos(x) = 1/2 dans ℝ (k désigne un entier).
  [guided]  cos(x) = 1/2
    (cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ.)
    = x = π/3 + 2kπ ou x = □ + 2kπ   (trous : x = π/3 + 2kπ ou x = −π/3 + 2kπ)   ← Deux familles
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ. | Ici α = π/3. | x = π/3 + 2kπ ou x = −π/3 + 2kπ
  pièges : g3_family_missing

Résous cos(x) = √3/2 dans ℝ (k désigne un entier).
  [guided]  cos(x) = √3/2
    (cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ.)
    = x = π/6 + 2kπ ou x = □ + 2kπ   (trous : x = π/6 + 2kπ ou x = −π/6 + 2kπ)   ← Deux familles
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ. | Ici α = π/6. | x = π/6 + 2kπ ou x = −π/6 + 2kπ
  pièges : g3_family_missing

Résous cos(x) = 1/2 dans ℝ (k désigne un entier).
  [guided]  cos(x) = 1/2
    (cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ.)
    = x = π/3 + 2kπ ou x = □ + 2kπ   (trous : x = π/3 + 2kπ ou x = −π/3 + 2kπ)   ← Deux familles
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ. | Ici α = π/3. | x = π/3 + 2kπ ou x = −π/3 + 2kπ
  pièges : g3_family_missing

```

### Niveau 2

```
Résous sin(x − π/4) = 1/2 dans ℝ (k désigne un entier).
  [guided]  sin(x − π/4) = 1/2
    = x − π/4 = π/6 + 2kπ ou x − π/4 = (5π)/6 + 2kπ   ← Deux familles
    = x = (5π)/12 + 2kπ ou x = (13π)/12 + 2kπ   ← Isoler x
  aides : sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ. | Ici α = π/6 pour u = x−π/4. | x = (5π)/12 + 2kπ ou x = (13π)/12 + 2kπ
  pièges : g3_family_missing, g3_sin_family

Résous sin(x + π/6) = √2/2 dans ℝ (k désigne un entier).
  [guided]  sin(x + π/6) = √2/2
    = x + π/6 = π/4 + 2kπ ou x + π/6 = (3π)/4 + 2kπ   ← Deux familles
    = x = π/12 + 2kπ ou x = (7π)/12 + 2kπ   ← Isoler x
  aides : sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ. | Ici α = π/4 pour u = x+π/6. | x = π/12 + 2kπ ou x = (7π)/12 + 2kπ
  pièges : g3_family_missing, g3_sin_family

Résous cos(x − π/4) = √2/2 dans ℝ (k désigne un entier).
  [guided]  cos(x − π/4) = √2/2
    = x − π/4 = π/4 + 2kπ ou x − π/4 = −π/4 + 2kπ   ← Deux familles
    = x = π/2 + 2kπ ou x = 2kπ   ← Isoler x
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ. | Ici α = π/4 pour u = x−π/4. | x = π/2 + 2kπ ou x = 2kπ
  pièges : g3_family_missing

```

### Niveau 3

```
Résous cos(2x + π/4) = −√3/2 dans ℝ (k désigne un entier).
  [tap, suivre l'erreur, menu solset]  cos(2x + π/4) = −√3/2
    ? Quelle formule ? ✔ cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ / · sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ / · tan u = tan α ⇔ u = α + kπ
    = 2x + π/4 = (5π)/6 + 2kπ ou 2x + π/4 = −(5π)/6 + 2kπ   ← Deux familles
    = 2x = (7π)/12 + 2kπ ou 2x = −(13π)/12 + 2kπ   ← Isoler 2x
    = x = (7π)/24 + kπ ou x = −(13π)/24 + kπ   ← Diviser aussi la période
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ ; puis on divise aussi la période. | Ici α = (5π)/6 pour u = 2x+π/4, puis on divise aussi la période. | x = (7π)/24 + kπ ou x = −(13π)/24 + kπ
  pièges : g3_family_missing

Résous sin(x/2 + π/6) = −√2/2 dans ℝ (k désigne un entier).
  [tap, suivre l'erreur, menu solset]  sin(x/2 + π/6) = −√2/2
    ? Quelle formule ? · cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ / ✔ sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ / · tan u = tan α ⇔ u = α + kπ
    = x/2 + π/6 = −π/4 + 2kπ ou x/2 + π/6 = (5π)/4 + 2kπ   ← Deux familles
    = x/2 = −(5π)/12 + 2kπ ou x/2 = (13π)/12 + 2kπ   ← Isoler x/2
    = x = −(5π)/6 + 4kπ ou x = (13π)/6 + 4kπ   ← Diviser aussi la période
  aides : sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ ; puis on divise aussi la période. | Ici α = −π/4 pour u = x/2+π/6, puis on divise aussi la période. | x = −(5π)/6 + 4kπ ou x = (13π)/6 + 4kπ
  pièges : g3_family_missing, g3_sin_family

Résous tan(2x + π/6) = 1 dans ℝ (k désigne un entier).
  [tap, suivre l'erreur, menu solset]  tan(2x + π/6) = 1
    ? Quelle formule ? · cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ / · sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ / ✔ tan u = tan α ⇔ u = α + kπ
    = 2x + π/6 = π/4 + kπ   ← Une famille
    = 2x = π/12 + kπ   ← Isoler 2x
    = x = π/24 + kπ/2   ← Diviser aussi la période
  aides : tan u = tan α ⇔ u = α + kπ ; puis on divise aussi la période. | Ici α = π/4 pour u = 2x+π/6, puis on divise aussi la période. | x = π/24 + kπ/2
  pièges : g3_period_divide

```

### Niveau 4

```
Résous sin(x/2 + π/3) = −√2/2, puis donne les solutions dans [0 ; 2π] (k désigne un entier).
  [free, suivre l'erreur]  sin(x/2 + π/3) = −√2/2
    = x/2 + π/3 = −π/4 + 2kπ ou x/2 + π/3 = (5π)/4 + 2kπ   ← Deux familles
    = x/2 = −(7π)/12 + 2kπ ou x/2 = (11π)/12 + 2kπ   ← Isoler x/2
    = x = −(7π)/6 + 4kπ ou x = (11π)/6 + 4kπ   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = −(7π)/6 + 4kπ ou x = (11π)/6 + 4kπ
    = {(11π)/6}   ← Garder les k qui tombent dans l'intervalle
  aides : sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ ; puis on divise aussi la période. | Ici α = −π/4 pour u = x/2+π/3, puis on divise aussi la période. | x = −(7π)/6 + 4kπ ou x = (11π)/6 + 4kπ
  pièges : g3_family_missing, g3_sin_family

Résous cos(3x + π/4) = √2/2, puis donne les solutions dans [0 ; 2π] (k désigne un entier).
  [free, suivre l'erreur]  cos(3x + π/4) = √2/2
    = 3x + π/4 = π/4 + 2kπ ou 3x + π/4 = −π/4 + 2kπ   ← Deux familles
    = 3x = 2kπ ou 3x = −π/2 + 2kπ   ← Isoler 3x
    = x = 2kπ/3 ou x = −π/6 + 2kπ/3   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = 2kπ/3 ou x = −π/6 + 2kπ/3
    = {0 ; π/2 ; (2π)/3 ; (7π)/6 ; (4π)/3 ; (11π)/6 ; 2π}   ← Garder les k qui tombent dans l'intervalle
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ ; puis on divise aussi la période. | Ici α = π/4 pour u = 3x+π/4, puis on divise aussi la période. | x = 2kπ/3 ou x = −π/6 + 2kπ/3
  pièges : g3_family_missing

Résous cos(2x) = 1/2, puis donne les solutions dans [0 ; 2π] (k désigne un entier).
  [free, suivre l'erreur]  cos(2x) = 1/2
    = 2x = π/3 + 2kπ ou 2x = −π/3 + 2kπ   ← Deux familles
    = x = π/6 + kπ ou x = −π/6 + kπ   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = π/6 + kπ ou x = −π/6 + kπ
    = {π/6 ; (5π)/6 ; (7π)/6 ; (11π)/6}   ← Garder les k qui tombent dans l'intervalle
  aides : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ ; puis on divise aussi la période. | Ici α = π/3 pour u = 2x, puis on divise aussi la période. | x = π/6 + kπ ou x = −π/6 + kπ
  pièges : g3_family_missing

```

### Niveau 5

```
Résous cos(2x) = cos(x) dans [0 ; 2π[.
  [free, sans aide]  cos(2x) = cos(x)
    = 2x = x + 2kπ ou 2x = −x + 2kπ   ← cos u = cos v : u = ±v + 2kπ
    = x = 2kπ ou x = 2kπ/3   ← Isoler x
  — Solutions dans [0 ; 2π[ :  [juge solset]  départ : x = 2kπ ou x = 2kπ/3
    = {0 ; (2π)/3 ; (4π)/3}   ← Garder les k qui tombent dans l'intervalle

Résous sin(2x) = sin(x) dans [−π ; π].
  [free, sans aide]  sin(2x) = sin(x)
    = 2x = x + 2kπ ou 2x = π − x + 2kπ   ← sin u = sin v : u = v + 2kπ ou u = π − v + 2kπ
    = x = 2kπ ou x = π/3 + 2kπ/3   ← Isoler x
  — Solutions dans [−π ; π] :  [juge solset]  départ : x = 2kπ ou x = π/3 + 2kπ/3
    = {−π ; −π/3 ; 0 ; π/3 ; π}   ← Garder les k qui tombent dans l'intervalle

Résous cos(3x) = cos(2x) dans [−π ; π].
  [free, sans aide]  cos(3x) = cos(2x)
    = 3x = 2x + 2kπ ou 3x = −2x + 2kπ   ← cos u = cos v : u = ±v + 2kπ
    = x = 2kπ ou x = 2kπ/5   ← Isoler x
  — Solutions dans [−π ; π] :  [juge solset]  départ : x = 2kπ ou x = 2kπ/5
    = {−(4π)/5 ; −(2π)/5 ; 0 ; (2π)/5 ; (4π)/5}   ← Garder les k qui tombent dans l'intervalle

```

### Variantes d'examen

```
Les solutions de sin(2x − π/4) = −√2/2 sont…
  · x = 2kπ ou x = (3π)/4 + 2kπ [g3_period_divide]   · x = kπ [g3_family_missing]   ✔ x = kπ ou x = (3π)/4 + kπ   · x = kπ ou x = π/4 + kπ [g3_sin_family]
  [examen mcq]
  pièges : g3_family_missing, g3_period_divide, g3_sin_family

Vrai ou faux ?
  « Pour tous x, y réels, si tan x = tan y, alors x = y. » → FAUX
    contre-exemple (refute) : x = 0, y = π
  [examen tf]
  pièges : g3_family_missing

```

## Équations trigonométriques (`g3-eq`, CMS)

_Une seule fonction, factoriser, ou diviser par cos²x._

### Niveau 1

```
Résous cos(x)² − 3cos(x) + 2 = 0 dans ℝ.
  [guided]  X² − 3X + 2 = 0
    (On a posé X = cos x.)
    = (X − 1)(X − 2) = 0   ← Factoriser
    = cos(x) = 1 ou cos(x) = 2   ← Revenir à x
    = x = 2kπ   ← Équations de base
  aides : C'est un trinôme en cos x : pose X = cos x. | (X − 1)(X − 2) = 0 | cos(x) = 1 ou cos(x) = 2

Résous 2sin(x)² + sin(x) − 1 = 0 dans ℝ.
  [guided]  2X² + X − 1 = 0
    (On a posé X = sin x.)
    = (X + 1)(2X − 1) = 0   ← Factoriser
    = sin(x) = −1 ou sin(x) = 1/2   ← Revenir à x
    = x = −π/2 + 2kπ ou x = π/6 + 2kπ ou x = (5π)/6 + 2kπ   ← Équations de base
  aides : C'est un trinôme en sin x : pose X = sin x. | (X + 1)(2X − 1) = 0 | sin(x) = −1 ou sin(x) = 1/2

Résous cos(x)² − cos(x) − 2 = 0 dans ℝ.
  [guided]  X² − X − 2 = 0
    (On a posé X = cos x.)
    = (X + 1)(X − 2) = 0   ← Factoriser
    = cos(x) = −1 ou cos(x) = 2   ← Revenir à x
    = x = π + 2kπ   ← Équations de base
  aides : C'est un trinôme en cos x : pose X = cos x. | (X + 1)(X − 2) = 0 | cos(x) = −1 ou cos(x) = 2

```

### Niveau 2

```
Résous −2cos(x)² − 5sin(x) + 4 = 0 dans ℝ.
  [guided]  −2cos(x)² − 5sin(x) + 4 = 0
    = −2(1 − sin(x)²) − 5sin(x) + 4 = 0   ← cos²x = 1 − sin²x
    = 2sin(x)² − 5sin(x) + 2 = 0   ← Réduire
    = 2X² − 5X + 2 = 0   ← Posons X = sin x
    = (2X − 1)(X − 2) = 0   ← Factoriser
    = sin(x) = 1/2 ou sin(x) = 2   ← Revenir à x
    = x = π/6 + 2kπ ou x = (5π)/6 + 2kπ   ← Équations de base
  aides : C'est un trinôme en sin x : pose X = sin x. | (2X − 1)(X − 2) = 0 | sin(x) = 1/2 ou sin(x) = 2
  pièges : g3_divide_zero, g3_rphi

Résous −cos(x)² − sin(x) + 1 = 0 dans ℝ.
  [guided]  −cos(x)² − sin(x) + 1 = 0
    = −(1 − sin(x)²) − sin(x) + 1 = 0   ← cos²x = 1 − sin²x
    = sin(x)² − sin(x) = 0   ← Réduire
    = X² − X = 0   ← Posons X = sin x
    = X(X − 1) = 0   ← Factoriser
    = sin(x) = 0 ou sin(x) = 1   ← Revenir à x
    = x = kπ ou x = π/2 + 2kπ   ← Équations de base
  aides : C'est un trinôme en sin x : pose X = sin x. | X(X − 1) = 0 | sin(x) = 0 ou sin(x) = 1

Résous −2cos(x)² − sin(x) + 1 = 0 dans ℝ.
  [guided]  −2cos(x)² − sin(x) + 1 = 0
    = −2(1 − sin(x)²) − sin(x) + 1 = 0   ← cos²x = 1 − sin²x
    = 2sin(x)² − sin(x) − 1 = 0   ← Réduire
    = 2X² − X − 1 = 0   ← Posons X = sin x
    = (2X + 1)(X − 1) = 0   ← Factoriser
    = sin(x) = −1/2 ou sin(x) = 1   ← Revenir à x
    = x = −π/6 + 2kπ ou x = (7π)/6 + 2kπ ou x = π/2 + 2kπ   ← Équations de base
  aides : C'est un trinôme en sin x : pose X = sin x. | (2X + 1)(X − 1) = 0 | sin(x) = −1/2 ou sin(x) = 1

```

### Niveau 3

```
Résous sin(2x) = −cos(x) dans ℝ.
  [tap, suivre l'erreur, menu solset]  sin(2x) = −cos(x)
    ? Quelle méthode ? · Une seule fonction, puis X = cos x ou X = sin x / ✔ Factoriser, puis produit nul / · Diviser par cos²x (après avoir vérifié cos x = 0)
    = 2sin(x)cos(x) + cos(x) = 0   ← sin 2x = 2 sin x cos x, tout à gauche
    = cos(x)(2sin(x) + 1) = 0   ← Factoriser par cos x (ne pas diviser !)
    = cos(x) = 0 ou sin(x) = −1/2   ← Produit nul
    = x = π/2 + kπ ou x = −π/6 + 2kπ ou x = (7π)/6 + 2kπ   ← Équations de base
  aides : Écris sin 2x = 2 sin x cos x, puis mets cos x en facteur : ne divise pas. | cos(x)(2sin(x) + 1) = 0 | cos(x) = 0 ou sin(x) = −1/2
  pièges : g3_divide_zero

Résous sin(2x) = cos(x) dans ℝ.
  [tap, suivre l'erreur, menu solset]  sin(2x) = cos(x)
    ? Quelle méthode ? · Une seule fonction, puis X = cos x ou X = sin x / ✔ Factoriser, puis produit nul / · Diviser par cos²x (après avoir vérifié cos x = 0)
    = 2sin(x)cos(x) − cos(x) = 0   ← sin 2x = 2 sin x cos x, tout à gauche
    = cos(x)(2sin(x) − 1) = 0   ← Factoriser par cos x (ne pas diviser !)
    = cos(x) = 0 ou sin(x) = 1/2   ← Produit nul
    = x = π/2 + kπ ou x = π/6 + 2kπ ou x = (5π)/6 + 2kπ   ← Équations de base
  aides : Écris sin 2x = 2 sin x cos x, puis mets cos x en facteur : ne divise pas. | cos(x)(2sin(x) − 1) = 0 | cos(x) = 0 ou sin(x) = 1/2
  pièges : g3_divide_zero

Résous −2sin(x)² + cos(x) + 2 = 0 dans ℝ.
  [tap, suivre l'erreur, menu solset]  −2sin(x)² + cos(x) + 2 = 0
    ? Quelle méthode ? ✔ Une seule fonction, puis X = cos x ou X = sin x / · Factoriser, puis produit nul / · Diviser par cos²x (après avoir vérifié cos x = 0)
    = −2(1 − cos(x)²) + cos(x) + 2 = 0   ← sin²x = 1 − cos²x
    = 2cos(x)² + cos(x) = 0   ← Réduire
    = 2X² + X = 0   ← Posons X = cos x
    = X(2X + 1) = 0   ← Factoriser
    = cos(x) = 0 ou cos(x) = −1/2   ← Revenir à x
    = x = π/2 + kπ ou x = (2π)/3 + 2kπ ou x = −(2π)/3 + 2kπ   ← Équations de base
  aides : C'est un trinôme en cos x : pose X = cos x. | X(2X + 1) = 0 | cos(x) = 0 ou cos(x) = −1/2

```

### Niveau 4

```
Résous sin(x)² − 2sin(x)cos(x) − 3cos(x)² = 0 dans ℝ.
  [free, suivre l'erreur]  sin(x)² − 2sin(x)cos(x) − 3cos(x)² = 0
    = tan(x)² − 2tan(x) − 3 = 0   ← cos x = 0 n'est pas solution ; diviser par cos²x
    = tan(x) = −1 ou tan(x) = 3   ← Factoriser
    = x = −π/4 + kπ ou x = arctan(3) + kπ   ← Équations de base
  aides : Vérifie que cos x = 0 n'est pas solution, puis divise par cos²x. | tan(x)² − 2tan(x) − 3 = 0 | tan(x) = −1 ou tan(x) = 3
  pièges : g3_divide_zero, g3_rphi

Résous −cos(x)² + 3sin(x) + 3 = 0 dans ℝ.
  [free, suivre l'erreur]  −cos(x)² + 3sin(x) + 3 = 0
    = −(1 − sin(x)²) + 3sin(x) + 3 = 0   ← cos²x = 1 − sin²x
    = sin(x)² + 3sin(x) + 2 = 0   ← Réduire
    = X² + 3X + 2 = 0   ← Posons X = sin x
    = (X + 1)(X + 2) = 0   ← Factoriser
    = sin(x) = −1 ou sin(x) = −2   ← Revenir à x
    = x = −π/2 + 2kπ   ← Équations de base
  aides : C'est un trinôme en sin x : pose X = sin x. | (X + 1)(X + 2) = 0 | sin(x) = −1 ou sin(x) = −2
  pièges : g3_divide_zero, g3_rphi

Résous sin(2x) = cos(x) dans ℝ.
  [free, suivre l'erreur]  sin(2x) = cos(x)
    = 2sin(x)cos(x) − cos(x) = 0   ← sin 2x = 2 sin x cos x, tout à gauche
    = cos(x)(2sin(x) − 1) = 0   ← Factoriser par cos x (ne pas diviser !)
    = cos(x) = 0 ou sin(x) = 1/2   ← Produit nul
    = x = π/2 + kπ ou x = π/6 + 2kπ ou x = (5π)/6 + 2kπ   ← Équations de base
  aides : Écris sin 2x = 2 sin x cos x, puis mets cos x en facteur : ne divise pas. | cos(x)(2sin(x) − 1) = 0 | cos(x) = 0 ou sin(x) = 1/2

```

### Niveau 5

```
Résous sin(2x) = √2cos(x) dans [−π ; π].
  [free, sans aide]  sin(2x) = √2cos(x)
    = 2sin(x)cos(x) − √2cos(x) = 0   ← sin 2x = 2 sin x cos x, tout à gauche
    = cos(x)(2sin(x) − √2) = 0   ← Factoriser par cos x (ne pas diviser !)
    = cos(x) = 0 ou sin(x) = √2/2   ← Produit nul
    = x = π/2 + kπ ou x = π/4 + 2kπ ou x = (3π)/4 + 2kπ   ← Équations de base
  — Solutions dans [−π ; π] :  [juge solset]  départ : x = π/2 + kπ ou x = π/4 + 2kπ ou x = (3π)/4 + 2kπ
    = {−π/2 ; π/4 ; π/2 ; (3π)/4}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_divide_zero

Résous −sin(x)² + cos(x) + 1 = 0 dans [0 ; 2π].
  [free, sans aide]  −sin(x)² + cos(x) + 1 = 0
    = −(1 − cos(x)²) + cos(x) + 1 = 0   ← sin²x = 1 − cos²x
    = cos(x)² + cos(x) = 0   ← Réduire
    = X² + X = 0   ← Posons X = cos x
    = (X + 1)X = 0   ← Factoriser
    = cos(x) = −1 ou cos(x) = 0   ← Revenir à x
    = x = π + 2kπ ou x = π/2 + kπ   ← Équations de base
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = π + 2kπ ou x = π/2 + kπ
    = {π/2 ; π ; (3π)/2}   ← Garder les k qui tombent dans l'intervalle

Résous sin(x)² − 3sin(x)cos(x) + 2cos(x)² = 0 dans ℝ.
  [free, sans aide]  sin(x)² − 3sin(x)cos(x) + 2cos(x)² = 0
    = tan(x)² − 3tan(x) + 2 = 0   ← cos x = 0 n'est pas solution ; diviser par cos²x
    = tan(x) = 1 ou tan(x) = 2   ← Factoriser
    = x = π/4 + kπ ou x = arctan(2) + kπ   ← Équations de base
  pièges : g3_divide_zero, g3_rphi

```

### Variantes d'examen

```
Résous −sin(x)² + 3cos(x) + 3 = 0 dans [−π ; π].
  [free, sans aide, examen open]  −sin(x)² + 3cos(x) + 3 = 0
    = −(1 − cos(x)²) + 3cos(x) + 3 = 0   ← sin²x = 1 − cos²x
    = cos(x)² + 3cos(x) + 2 = 0   ← Réduire
    = X² + 3X + 2 = 0   ← Posons X = cos x
    = (X + 2)(X + 1) = 0   ← Factoriser
    = cos(x) = −2 ou cos(x) = −1   ← Revenir à x
    = x = π + 2kπ   ← Équations de base
  — Solutions dans [−π ; π] :  [juge solset]  départ : x = π + 2kπ
    = {−π ; π}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_divide_zero, g3_rphi

Les solutions de sin(2x) = −cos(x) sont…
  · x = π/2 + 2kπ ou x = −π/6 + 2kπ ou x = (7π)/6 + 2kπ [g3_period_divide]   · x = −π/6 + 2kπ ou x = (7π)/6 + 2kπ [g3_divide_zero]   · x = π/2 + kπ ou x = −π/6 + 2kπ [g3_family_missing]   ✔ x = π/2 + kπ ou x = −π/6 + 2kπ ou x = (7π)/6 + 2kπ
  [examen mcq]
  pièges : g3_divide_zero, g3_family_missing, g3_period_divide

```

## a sin x + b cos x : équations (`g3-asinbcos`, CMS)

_a sin x + b cos x = R sin(x + φ), R = √(a² + b²)._

### Niveau 1

```
Résous √3sin(x) − cos(x) = 1 dans ℝ.
  [guided]  √3sin(x) − cos(x) = 1
    (R = 2 et √3sin(x) − cos(x) = 2sin(x − π/6).)
    = (√3/2)sin(x) + (−1/2)cos(x) = 1/2   ← Diviser par R = 2
    = sin(□) = 1/2   (trous : sin(x − π/6) = 1/2)   ← Formule d'addition, φ = −π/6
    = x − π/6 = π/6 + 2kπ ou x − π/6 = (5π)/6 + 2kπ   ← Équation de base
    = x = π/3 + 2kπ ou x = π + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = −π/6 | sin(x − π/6) = 1/2
  pièges : g3_divide_zero, g3_rphi

Résous 2sin(x) + 2√3cos(x) = −2√2 dans ℝ.
  [guided]  2sin(x) + 2√3cos(x) = −2√2
    (R = 4 et 2sin(x) + 2√3cos(x) = 4sin(x + π/3).)
    = (1/2)sin(x) + (√3/2)cos(x) = −√2/2   ← Diviser par R = 4
    = sin(□) = −√2/2   (trous : sin(x + π/3) = −√2/2)   ← Formule d'addition, φ = π/3
    = x + π/3 = −π/4 + 2kπ ou x + π/3 = (5π)/4 + 2kπ   ← Équation de base
    = x = −(7π)/12 + 2kπ ou x = (11π)/12 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 4. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/3 | sin(x + π/3) = −√2/2
  pièges : g3_divide_zero, g3_rphi

Résous √3sin(x) + cos(x) = 0 dans ℝ.
  [guided]  √3sin(x) + cos(x) = 0
    (R = 2 et √3sin(x) + cos(x) = 2sin(x + π/6).)
    = (√3/2)sin(x) + (1/2)cos(x) = 0   ← Diviser par R = 2
    = sin(□) = 0   (trous : sin(x + π/6) = 0)   ← Formule d'addition, φ = π/6
    = x + π/6 = kπ   ← Équation de base
    = x = −π/6 + kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/6 | sin(x + π/6) = 0
  pièges : g3_divide_zero, g3_rphi

```

### Niveau 2

```
Résous 2sin(x) + 2√3cos(x) = 2√2 dans ℝ.
  [guided]  2sin(x) + 2√3cos(x) = 2√2
    (R = √(a² + b²) = 4.)
    ? φ vérifie cos φ = a/R et sin φ = b/R. Donc φ = ✔ π/3 / · −(2π)/3 / · −π/3
    = (1/2)sin(x) + (√3/2)cos(x) = √2/2   ← Diviser par R = 4
    = sin(x + π/3) = √2/2   ← Formule d'addition, φ = π/3
    = x + π/3 = π/4 + 2kπ ou x + π/3 = (3π)/4 + 2kπ   ← Équation de base
    = x = −π/12 + 2kπ ou x = (5π)/12 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 4. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/3 | sin(x + π/3) = √2/2
  pièges : g3_divide_zero, g3_rphi

Résous 2√3sin(x) − 2cos(x) = 4 dans ℝ.
  [guided]  2√3sin(x) − 2cos(x) = 4
    (R = √(a² + b²) = 4.)
    ? φ vérifie cos φ = a/R et sin φ = b/R. Donc φ = ✔ −π/6 / · (5π)/6 / · π/6
    = (√3/2)sin(x) + (−1/2)cos(x) = 1   ← Diviser par R = 4
    = sin(x − π/6) = 1   ← Formule d'addition, φ = −π/6
    = x − π/6 = π/2 + 2kπ   ← Équation de base
    = x = (2π)/3 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 4. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = −π/6 | sin(x − π/6) = 1
  pièges : g3_divide_zero, g3_rphi

Résous sin(x) − cos(x) = −√2 dans ℝ.
  [guided]  sin(x) − cos(x) = −√2
    (R = √(a² + b²) = √2.)
    ? φ vérifie cos φ = a/R et sin φ = b/R. Donc φ = ✔ −π/4 / · (3π)/4 / · π/4
    = (√2/2)sin(x) + (−√2/2)cos(x) = −1   ← Diviser par R = √2
    = sin(x − π/4) = −1   ← Formule d'addition, φ = −π/4
    = x − π/4 = −π/2 + 2kπ   ← Équation de base
    = x = −π/4 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = √2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = −π/4 | sin(x − π/4) = −1
  pièges : g3_rphi

```

### Niveau 3

```
Résous √3sin(x) + cos(x) = 1 dans ℝ.
  [tap, suivre l'erreur, menu solset]  √3sin(x) + cos(x) = 1
    ? Quelle forme ? ✔ R sin(x + φ) / ✔ R cos(x − ψ) / · (|a| + |b|) sin(x + φ)
    = (√3/2)sin(x) + (1/2)cos(x) = 1/2   ← Diviser par R = 2
    = sin(x + π/6) = 1/2   ← Formule d'addition, φ = π/6
    = x + π/6 = π/6 + 2kπ ou x + π/6 = (5π)/6 + 2kπ   ← Équation de base
    = x = 2kπ ou x = (2π)/3 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/6 | sin(x + π/6) = 1/2
  pièges : g3_divide_zero, g3_rphi

Résous sin(x) − √3cos(x) = −√3 dans ℝ.
  [tap, suivre l'erreur, menu solset]  sin(x) − √3cos(x) = −√3
    ? Quelle forme ? ✔ R sin(x + φ) / ✔ R cos(x − ψ) / · (|a| + |b|) sin(x + φ)
    = (1/2)sin(x) + (−√3/2)cos(x) = −√3/2   ← Diviser par R = 2
    = sin(x − π/3) = −√3/2   ← Formule d'addition, φ = −π/3
    = x − π/3 = −π/3 + 2kπ ou x − π/3 = (4π)/3 + 2kπ   ← Équation de base
    = x = 2kπ ou x = (5π)/3 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = −π/3 | sin(x − π/3) = −√3/2
  pièges : g3_divide_zero, g3_rphi

Résous sin(x) + cos(x) = −√6/2 dans ℝ.
  [tap, suivre l'erreur, menu solset]  sin(x) + cos(x) = −√6/2
    ? Quelle forme ? ✔ R sin(x + φ) / ✔ R cos(x − ψ) / · (|a| + |b|) sin(x + φ)
    = (√2/2)sin(x) + (√2/2)cos(x) = −√3/2   ← Diviser par R = √2
    = sin(x + π/4) = −√3/2   ← Formule d'addition, φ = π/4
    = x + π/4 = −π/3 + 2kπ ou x + π/4 = (4π)/3 + 2kπ   ← Équation de base
    = x = −(7π)/12 + 2kπ ou x = (13π)/12 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = √2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/4 | sin(x + π/4) = −√3/2
  pièges : g3_rphi

```

### Niveau 4

```
Résous sin(3x) + cos(3x) = −1 dans ℝ.
  [free, suivre l'erreur]  sin(3x) + cos(3x) = −1
    = (√2/2)sin(3x) + (√2/2)cos(3x) = −√2/2   ← Diviser par R = √2
    = sin(3x + π/4) = −√2/2   ← Formule d'addition, φ = π/4
    = 3x + π/4 = −π/4 + 2kπ ou 3x + π/4 = (5π)/4 + 2kπ   ← Équation de base
    = 3x = −π/2 + 2kπ ou 3x = π + 2kπ   ← Isoler 3x
    = x = −π/6 + 2kπ/3 ou x = π/3 + 2kπ/3   ← Diviser aussi la période
  aides : Divise par √(a² + b²) = √2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/4 | sin(3x + π/4) = −√2/2
  pièges : g3_rphi

Résous sin(x) + cos(x) = −√6/2 dans ℝ.
  [free, suivre l'erreur]  sin(x) + cos(x) = −√6/2
    = (√2/2)sin(x) + (√2/2)cos(x) = −√3/2   ← Diviser par R = √2
    = sin(x + π/4) = −√3/2   ← Formule d'addition, φ = π/4
    = x + π/4 = −π/3 + 2kπ ou x + π/4 = (4π)/3 + 2kπ   ← Équation de base
    = x = −(7π)/12 + 2kπ ou x = (13π)/12 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = √2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/4 | sin(x + π/4) = −√3/2
  pièges : g3_rphi

Résous sin(x) + √3cos(x) = −1 dans ℝ.
  [free, suivre l'erreur]  sin(x) + √3cos(x) = −1
    = (1/2)sin(x) + (√3/2)cos(x) = −1/2   ← Diviser par R = 2
    = sin(x + π/3) = −1/2   ← Formule d'addition, φ = π/3
    = x + π/3 = −π/6 + 2kπ ou x + π/3 = (7π)/6 + 2kπ   ← Équation de base
    = x = −π/2 + 2kπ ou x = (5π)/6 + 2kπ   ← Isoler x
  aides : Divise par √(a² + b²) = 2. | cos(φ) sin x + sin(φ) cos x = sin(x + φ), avec φ = π/3 | sin(x + π/3) = −1/2
  pièges : g3_divide_zero, g3_rphi

```

### Niveau 5

```
Résous sin(2x) + √3cos(2x) = −√3 dans [0 ; 2π].
  [free, sans aide]  sin(2x) + √3cos(2x) = −√3
    = (1/2)sin(2x) + (√3/2)cos(2x) = −√3/2   ← Diviser par R = 2
    = sin(2x + π/3) = −√3/2   ← Formule d'addition, φ = π/3
    = 2x + π/3 = −π/3 + 2kπ ou 2x + π/3 = (4π)/3 + 2kπ   ← Équation de base
    = 2x = −(2π)/3 + 2kπ ou 2x = π + 2kπ   ← Isoler 2x
    = x = −π/3 + kπ ou x = π/2 + kπ   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = −π/3 + kπ ou x = π/2 + kπ
    = {π/2 ; (2π)/3 ; (3π)/2 ; (5π)/3}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_divide_zero, g3_rphi

Résous sin(3x) + cos(3x) = −1 dans [0 ; 2π[.
  [free, sans aide]  sin(3x) + cos(3x) = −1
    = (√2/2)sin(3x) + (√2/2)cos(3x) = −√2/2   ← Diviser par R = √2
    = sin(3x + π/4) = −√2/2   ← Formule d'addition, φ = π/4
    = 3x + π/4 = −π/4 + 2kπ ou 3x + π/4 = (5π)/4 + 2kπ   ← Équation de base
    = 3x = −π/2 + 2kπ ou 3x = π + 2kπ   ← Isoler 3x
    = x = −π/6 + 2kπ/3 ou x = π/3 + 2kπ/3   ← Diviser aussi la période
  — Solutions dans [0 ; 2π[ :  [juge solset]  départ : x = −π/6 + 2kπ/3 ou x = π/3 + 2kπ/3
    = {π/3 ; π/2 ; π ; (7π)/6 ; (5π)/3 ; (11π)/6}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_rphi

Résous −sin(3x) + √3cos(3x) = 1 dans [0 ; 2π].
  [free, sans aide]  −sin(3x) + √3cos(3x) = 1
    = (−1/2)sin(3x) + (√3/2)cos(3x) = 1/2   ← Diviser par R = 2
    = sin(3x + (2π)/3) = 1/2   ← Formule d'addition, φ = (2π)/3
    = 3x + (2π)/3 = π/6 + 2kπ ou 3x + (2π)/3 = (5π)/6 + 2kπ   ← Équation de base
    = 3x = −π/2 + 2kπ ou 3x = π/6 + 2kπ   ← Isoler 3x
    = x = −π/6 + 2kπ/3 ou x = π/18 + 2kπ/3   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = −π/6 + 2kπ/3 ou x = π/18 + 2kπ/3
    = {π/18 ; π/2 ; (13π)/18 ; (7π)/6 ; (25π)/18 ; (11π)/6}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_divide_zero, g3_rphi

```

### Variantes d'examen

```
Les solutions de sin(x) + √3cos(x) = 1 sont…
  · x = −(7π)/6 + 2kπ ou x = −π/2 + 2kπ [g3_rphi]   · x = −π/6 + 2kπ ou x = −π/2 + 2kπ [g3_sin_family]   ✔ x = −π/6 + 2kπ ou x = π/2 + 2kπ   · x = π/2 + 2kπ ou x = (7π)/6 + 2kπ [g3_rphi]
  [examen mcq]
  pièges : g3_rphi, g3_sin_family

Résous sin(3x) − √3cos(3x) = −√2 dans [0 ; 2π].
  [free, sans aide, examen open]  sin(3x) − √3cos(3x) = −√2
    = (1/2)sin(3x) + (−√3/2)cos(3x) = −√2/2   ← Diviser par R = 2
    = sin(3x − π/3) = −√2/2   ← Formule d'addition, φ = −π/3
    = 3x − π/3 = −π/4 + 2kπ ou 3x − π/3 = (5π)/4 + 2kπ   ← Équation de base
    = 3x = π/12 + 2kπ ou 3x = (19π)/12 + 2kπ   ← Isoler 3x
    = x = π/36 + 2kπ/3 ou x = (19π)/36 + 2kπ/3   ← Diviser aussi la période
  — Solutions dans [0 ; 2π] :  [juge solset]  départ : x = π/36 + 2kπ/3 ou x = (19π)/36 + 2kπ/3
    = {π/36 ; (19π)/36 ; (25π)/36 ; (43π)/36 ; (49π)/36 ; (67π)/36}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_divide_zero, g3_rphi

```

## Substitution t = tan(x/2) (`g3-bioche`, CMS)

_sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), et x = π + 2kπ à part._

### Niveau 1

```
Résous −3sin(x) + cos(x) = −1 dans ℝ avec t = tan(x/2).
  [guided]  −3sin(x) + cos(x) = −1
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut −1 = −1 : ce sont des solutions.)
    (Avec t = tan(x/2) : −6t/(1 + t²) + (1 − t²)/(1 + t²) = −1)
    = 6t − 2 = 0   ← Multiplier par 1 + t²
    = t = 1/3   ← Résoudre en t
    = x = 2arctan(1/3) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | 6t − 2 = 0 | t = 1/3
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous sin(x) + cos(x) = −1 dans ℝ avec t = tan(x/2).
  [guided]  sin(x) + cos(x) = −1
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut −1 = −1 : ce sont des solutions.)
    (Avec t = tan(x/2) : 2t/(1 + t²) + (1 − t²)/(1 + t²) = −1)
    = −2t − 2 = 0   ← Multiplier par 1 + t²
    = t = −1   ← Résoudre en t
    = x = −π/2 + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −2t − 2 = 0 | t = −1
  pièges : g3_bioche_pi, g3_rphi

Résous 2sin(x) − cos(x) = 1 dans ℝ avec t = tan(x/2).
  [guided]  2sin(x) − cos(x) = 1
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut 1 = 1 : ce sont des solutions.)
    (Avec t = tan(x/2) : 4t/(1 + t²) − (1 − t²)/(1 + t²) = 1)
    = −4t + 2 = 0   ← Multiplier par 1 + t²
    = t = 1/2   ← Résoudre en t
    = x = 2arctan(1/2) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −4t + 2 = 0 | t = 1/2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

```

### Niveau 2

```
Résous 2sin(x) − cos(x) = 1 dans ℝ avec t = tan(x/2).
  [guided]  2sin(x) − cos(x) = 1
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut 1 = 1 : ce sont des solutions.)
    = 4t/(1 + t²) − (1 − t²)/(1 + t²) = 1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = −4t + 2 = 0   ← Multiplier par 1 + t²
    = t = 1/2   ← Résoudre en t
    = x = 2arctan(1/2) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −4t + 2 = 0 | t = 1/2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous 2sin(x) + cos(x) = 2 dans ℝ avec t = tan(x/2).
  [guided]  2sin(x) + cos(x) = 2
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut −1 ≠ 2 : pas des solutions.)
    = 4t/(1 + t²) + (1 − t²)/(1 + t²) = 2   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 3t² − 4t + 1 = 0   ← Multiplier par 1 + t²
    = t = 1 ou t = 1/3   ← Résoudre en t
    = x = π/2 + 2kπ ou x = 2arctan(1/3) + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | 3t² − 4t + 1 = 0 | t = 1 ou t = 1/3
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous −sin(x) + 2cos(x) = −1 dans ℝ avec t = tan(x/2).
  [guided]  −sin(x) + 2cos(x) = −1
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut −2 ≠ −1 : pas des solutions.)
    = −2t/(1 + t²) + 2(1 − t²)/(1 + t²) = −1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = t² + 2t − 3 = 0   ← Multiplier par 1 + t²
    = t = −3 ou t = 1   ← Résoudre en t
    = x = 2arctan(−3) + 2kπ ou x = π/2 + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | t² + 2t − 3 = 0 | t = −3 ou t = 1
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

```

### Niveau 3

```
Résous 2sin(x) − cos(x) = 1 dans ℝ avec t = tan(x/2).
  [tap, suivre l'erreur, menu solset]  2sin(x) − cos(x) = 1
    ? Que faire des x = π + 2kπ, où tan(x/2) n'existe pas ? ✔ Les tester à part, avant de substituer / ✔ Les tester à part, à la fin / · Rien : la substitution donne toutes les solutions
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut 1 = 1 : ce sont des solutions.)
    = 4t/(1 + t²) − (1 − t²)/(1 + t²) = 1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = −4t + 2 = 0   ← Multiplier par 1 + t²
    = t = 1/2   ← Résoudre en t
    = x = 2arctan(1/2) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −4t + 2 = 0 | t = 1/2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous sin(x) − 3cos(x) = 3 dans ℝ avec t = tan(x/2).
  [tap, suivre l'erreur, menu solset]  sin(x) − 3cos(x) = 3
    ? Que faire des x = π + 2kπ, où tan(x/2) n'existe pas ? ✔ Les tester à part, avant de substituer / ✔ Les tester à part, à la fin / · Rien : la substitution donne toutes les solutions
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut 3 = 3 : ce sont des solutions.)
    = 2t/(1 + t²) − 3(1 − t²)/(1 + t²) = 3   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = −2t + 6 = 0   ← Multiplier par 1 + t²
    = t = 3   ← Résoudre en t
    = x = 2arctan(3) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −2t + 6 = 0 | t = 3
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous −3sin(x) − cos(x) = 3 dans ℝ avec t = tan(x/2).
  [tap, suivre l'erreur, menu solset]  −3sin(x) − cos(x) = 3
    ? Que faire des x = π + 2kπ, où tan(x/2) n'existe pas ? ✔ Les tester à part, avant de substituer / ✔ Les tester à part, à la fin / · Rien : la substitution donne toutes les solutions
    (x = π + 2kπ : sin x = 0 et cos x = −1, donc le membre de gauche vaut 1 ≠ 3 : pas des solutions.)
    = −6t/(1 + t²) − (1 − t²)/(1 + t²) = 3   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 2t² + 6t + 4 = 0   ← Multiplier par 1 + t²
    = t = −1 ou t = −2   ← Résoudre en t
    = x = −π/2 + 2kπ ou x = 2arctan(−2) + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | 2t² + 6t + 4 = 0 | t = −1 ou t = −2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

```

### Niveau 4

```
Résous 3sin(x) + 4cos(x) = 0 dans ℝ avec t = tan(x/2).
  [free, suivre l'erreur]  3sin(x) + 4cos(x) = 0
    = 6t/(1 + t²) + 4(1 − t²)/(1 + t²) = 0   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 4t² − 6t − 4 = 0   ← Multiplier par 1 + t²
    = t = 2 ou t = −1/2   ← Résoudre en t
    = x = 2arctan(2) + 2kπ ou x = 2arctan(−1/2) + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | 4t² − 6t − 4 = 0 | t = 2 ou t = −1/2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous sin(x) − cos(x) = 1 dans ℝ avec t = tan(x/2).
  [free, suivre l'erreur]  sin(x) − cos(x) = 1
    = 2t/(1 + t²) − (1 − t²)/(1 + t²) = 1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = −2t + 2 = 0   ← Multiplier par 1 + t²
    = t = 1   ← Résoudre en t
    = x = π/2 + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −2t + 2 = 0 | t = 1
  pièges : g3_bioche_pi, g3_rphi

Résous sin(x) + 2cos(x) = −2 dans ℝ avec t = tan(x/2).
  [free, suivre l'erreur]  sin(x) + 2cos(x) = −2
    = 2t/(1 + t²) + 2(1 − t²)/(1 + t²) = −2   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = −2t − 4 = 0   ← Multiplier par 1 + t²
    = t = −2   ← Résoudre en t
    = x = 2arctan(−2) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  aides : La substitution oublie x = π + 2kπ : teste-les d'abord. Puis sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). | −2t − 4 = 0 | t = −2
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

```

### Niveau 5

```
Résous sin(x) + 2cos(x) = −1 dans ℝ avec t = tan(x/2).
  [free, sans aide]  sin(x) + 2cos(x) = −1
    = 2t/(1 + t²) + 2(1 − t²)/(1 + t²) = −1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = t² − 2t − 3 = 0   ← Multiplier par 1 + t²
    = t = −1 ou t = 3   ← Résoudre en t
    = x = −π/2 + 2kπ ou x = 2arctan(3) + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Résous −sin(x) + cos(x) = −1 dans [−π ; π] avec t = tan(x/2).
  [free, sans aide]  −sin(x) + cos(x) = −1
    = −2t/(1 + t²) + (1 − t²)/(1 + t²) = −1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 2t − 2 = 0   ← Multiplier par 1 + t²
    = t = 1   ← Résoudre en t
    = x = π/2 + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  — Solutions dans [−π ; π] :  [juge solset]  départ : x = π/2 + 2kπ ou x = π + 2kπ
    = {−π ; π/2 ; π}   ← Garder les k qui tombent dans l'intervalle
  pièges : g3_bioche_pi, g3_rphi

Résous −2sin(x) + cos(x) = −1 dans ℝ avec t = tan(x/2).
  [free, sans aide]  −2sin(x) + cos(x) = −1
    = −4t/(1 + t²) + (1 − t²)/(1 + t²) = −1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 4t − 2 = 0   ← Multiplier par 1 + t²
    = t = 1/2   ← Résoudre en t
    = x = 2arctan(1/2) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

```

### Variantes d'examen

```
Résous −3sin(x) + cos(x) = −1 dans ℝ avec t = tan(x/2).
  [free, sans aide, examen open]  −3sin(x) + cos(x) = −1
    = −6t/(1 + t²) + (1 − t²)/(1 + t²) = −1   ← sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²)
    = 6t − 2 = 0   ← Multiplier par 1 + t²
    = t = 1/3   ← Résoudre en t
    = x = 2arctan(1/3) + 2kπ ou x = π + 2kπ   ← tan(x/2) = t : x = 2 arctan t + 2kπ
  pièges : g3_bioche_pi, g3_divide_zero, g3_rphi

Les solutions de sin(x) + cos(x) = −1 sont…
  · x = −π/2 + 2kπ [g3_bioche_pi]   · x = π/2 + 2kπ ou x = π + 2kπ   ✔ x = −π/2 + 2kπ ou x = π + 2kπ   · x = arctan(−1) + kπ ou x = π + 2kπ
  [examen mcq]
  pièges : g3_bioche_pi

```

## Inéquations trigonométriques (`g3-ineq`, CMS)

_L'arc solution + 2kπ, puis k par k dans l'intervalle._

### Niveau 1

```
Résous sin(x) > −√3/2 dans [0 ; 2π].
  [guided]  sin(x) > −√3/2
    = −π/3 + 2kπ < x < (4π)/3 + 2kπ   ← Arc solution, + 2kπ
    = [0 ; (4π)/3[ ∪ ](5π)/3 ; 2π]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  aides : sin u > −√3/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | −π/3 + 2kπ < x < (4π)/3 + 2kπ | −π/3 + 2kπ < x < (4π)/3 + 2kπ
  pièges : g9_bracket, g3_ineq_arc

Résous sin(x) ≥ √3/2 dans [0 ; 2π].
  [guided]  sin(x) ≥ √3/2
    = π/3 + 2kπ ≤ x ≤ (2π)/3 + 2kπ   ← Arc solution, + 2kπ
    = [π/3 ; (2π)/3]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  aides : sin u ≥ √3/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | π/3 + 2kπ ≤ x ≤ (2π)/3 + 2kπ | π/3 + 2kπ ≤ x ≤ (2π)/3 + 2kπ
  pièges : g9_bracket, g3_ineq_arc

Résous sin(x) ≥ 0 dans [0 ; 2π].
  [guided]  sin(x) ≥ 0
    = 2kπ ≤ x ≤ π + 2kπ   ← Arc solution, + 2kπ
    = [0 ; π] ∪ {2π}   ← Garder ce qui tombe dans [0 ; 2π], k par k
  aides : sin u ≥ 0 : lis l'arc sur le cercle, puis ajoute 2kπ. | 2kπ ≤ x ≤ π + 2kπ | 2kπ ≤ x ≤ π + 2kπ
  pièges : g9_bracket, g3_ineq_arc

```

### Niveau 2

```
Résous cos(x − π/4) ≤ −√2/2 dans [0 ; π].
  [guided]  cos(x − π/4) ≤ −√2/2
    = (3π)/4 + 2kπ ≤ x − π/4 ≤ (5π)/4 + 2kπ   ← Arc solution, + 2kπ
    = π + 2kπ ≤ x ≤ (3π)/2 + 2kπ   ← Ajouter π/4
    = {π}   ← Garder ce qui tombe dans [0 ; π], k par k
  aides : cos u ≤ −√2/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | (3π)/4 + 2kπ ≤ x − π/4 ≤ (5π)/4 + 2kπ | π + 2kπ ≤ x ≤ (3π)/2 + 2kπ
  pièges : g9_bracket, g3_ineq_arc

Résous sin(x + π/3) ≥ −√2/2 dans [0 ; 2π].
  [guided]  sin(x + π/3) ≥ −√2/2
    = −π/4 + 2kπ ≤ x + π/3 ≤ (5π)/4 + 2kπ   ← Arc solution, + 2kπ
    = −(7π)/12 + 2kπ ≤ x ≤ (11π)/12 + 2kπ   ← Retirer π/3
    = [0 ; (11π)/12] ∪ [(17π)/12 ; 2π]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  aides : sin u ≥ −√2/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | −π/4 + 2kπ ≤ x + π/3 ≤ (5π)/4 + 2kπ | −(7π)/12 + 2kπ ≤ x ≤ (11π)/12 + 2kπ
  pièges : g9_bracket, g3_ineq_arc

Résous cos(x − π/4) ≤ 1/2 dans [0 ; π].
  [guided]  cos(x − π/4) ≤ 1/2
    = π/3 + 2kπ ≤ x − π/4 ≤ (5π)/3 + 2kπ   ← Arc solution, + 2kπ
    = (7π)/12 + 2kπ ≤ x ≤ (23π)/12 + 2kπ   ← Ajouter π/4
    = [(7π)/12 ; π]   ← Garder ce qui tombe dans [0 ; π], k par k
  aides : cos u ≤ 1/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | π/3 + 2kπ ≤ x − π/4 ≤ (5π)/3 + 2kπ | (7π)/12 + 2kπ ≤ x ≤ (23π)/12 + 2kπ
  pièges : g9_bracket, g3_ineq_arc

```

### Niveau 3

```
Résous sin(x) − √3cos(x) < √3 dans [0 ; π].
  [tap, suivre l'erreur, menu solset]  sin(x) − √3cos(x) < √3
    = 2sin(x − π/3) < √3   ← Forme R sin(x + φ), R = 2
    = sin(x − π/3) < √3/2   ← Diviser par R
    = (2π)/3 + 2kπ < x − π/3 < (7π)/3 + 2kπ   ← Arc solution, + 2kπ
    = π + 2kπ < x < (8π)/3 + 2kπ   ← Ajouter π/3
    = [0 ; (2π)/3[   ← Garder ce qui tombe dans [0 ; π], k par k
  aides : sin u < √3/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | (2π)/3 + 2kπ < x − π/3 < (7π)/3 + 2kπ | π + 2kπ < x < (8π)/3 + 2kπ
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Résous 2sin(x) + 2√3cos(x) ≤ −2 dans [π/2 ; 3π/2].
  [tap, suivre l'erreur, menu solset]  2sin(x) + 2√3cos(x) ≤ −2
    = 4sin(x + π/3) ≤ −2   ← Forme R sin(x + φ), R = 4
    = sin(x + π/3) ≤ −1/2   ← Diviser par R
    = (7π)/6 + 2kπ ≤ x + π/3 ≤ (11π)/6 + 2kπ   ← Arc solution, + 2kπ
    = (5π)/6 + 2kπ ≤ x ≤ (3π)/2 + 2kπ   ← Retirer π/3
    = [(5π)/6 ; (3π)/2]   ← Garder ce qui tombe dans [π/2 ; 3π/2], k par k
  aides : sin u ≤ −1/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | (7π)/6 + 2kπ ≤ x + π/3 ≤ (11π)/6 + 2kπ | (5π)/6 + 2kπ ≤ x ≤ (3π)/2 + 2kπ
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Résous sin(x) − cos(x) ≤ 1 dans [0 ; π].
  [tap, suivre l'erreur, menu solset]  sin(x) − cos(x) ≤ 1
    = √2sin(x − π/4) ≤ 1   ← Forme R sin(x + φ), R = √2
    = sin(x − π/4) ≤ √2/2   ← Diviser par R
    = (3π)/4 + 2kπ ≤ x − π/4 ≤ (9π)/4 + 2kπ   ← Arc solution, + 2kπ
    = π + 2kπ ≤ x ≤ (5π)/2 + 2kπ   ← Ajouter π/4
    = [0 ; π/2] ∪ {π}   ← Garder ce qui tombe dans [0 ; π], k par k
  aides : sin u ≤ √2/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | (3π)/4 + 2kπ ≤ x − π/4 ≤ (9π)/4 + 2kπ | π + 2kπ ≤ x ≤ (5π)/2 + 2kπ
  pièges : g9_bracket, g3_rphi, g3_ineq_arc

```

### Niveau 4

```
Résous −√3sin(3x) − cos(3x) ≤ √2 dans [π/2 ; 3π/2].
  [free, suivre l'erreur]  −√3sin(3x) − cos(3x) ≤ √2
    = 2sin(3x − (5π)/6) ≤ √2   ← Forme R sin(x + φ), R = 2
    = sin(3x − (5π)/6) ≤ √2/2   ← Diviser par R
    = (3π)/4 + 2kπ ≤ 3x − (5π)/6 ≤ (9π)/4 + 2kπ   ← Arc solution, + 2kπ
    = (19π)/12 + 2kπ ≤ 3x ≤ (37π)/12 + 2kπ   ← Ajouter (5π)/6
    = (19π)/36 + 2kπ/3 ≤ x ≤ (37π)/36 + 2kπ/3   ← Diviser aussi la période
    = [(19π)/36 ; (37π)/36] ∪ [(43π)/36 ; (3π)/2]   ← Garder ce qui tombe dans [π/2 ; 3π/2], k par k
  aides : sin u ≤ √2/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | (3π)/4 + 2kπ ≤ 3x − (5π)/6 ≤ (9π)/4 + 2kπ | (19π)/36 + 2kπ/3 ≤ x ≤ (37π)/36 + 2kπ/3
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Résous sin(3x) − √3cos(3x) ≥ −1 dans [0 ; 2π].
  [free, suivre l'erreur]  sin(3x) − √3cos(3x) ≥ −1
    = 2sin(3x − π/3) ≥ −1   ← Forme R sin(x + φ), R = 2
    = sin(3x − π/3) ≥ −1/2   ← Diviser par R
    = −π/6 + 2kπ ≤ 3x − π/3 ≤ (7π)/6 + 2kπ   ← Arc solution, + 2kπ
    = π/6 + 2kπ ≤ 3x ≤ (3π)/2 + 2kπ   ← Ajouter π/3
    = π/18 + 2kπ/3 ≤ x ≤ π/2 + 2kπ/3   ← Diviser aussi la période
    = [π/18 ; π/2] ∪ [(13π)/18 ; (7π)/6] ∪ [(25π)/18 ; (11π)/6]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  aides : sin u ≥ −1/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | −π/6 + 2kπ ≤ 3x − π/3 ≤ (7π)/6 + 2kπ | π/18 + 2kπ/3 ≤ x ≤ π/2 + 2kπ/3
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Résous sin(3x) − √3cos(3x) ≥ √3 dans [0 ; π].
  [free, suivre l'erreur]  sin(3x) − √3cos(3x) ≥ √3
    = 2sin(3x − π/3) ≥ √3   ← Forme R sin(x + φ), R = 2
    = sin(3x − π/3) ≥ √3/2   ← Diviser par R
    = π/3 + 2kπ ≤ 3x − π/3 ≤ (2π)/3 + 2kπ   ← Arc solution, + 2kπ
    = (2π)/3 + 2kπ ≤ 3x ≤ π + 2kπ   ← Ajouter π/3
    = (2π)/9 + 2kπ/3 ≤ x ≤ π/3 + 2kπ/3   ← Diviser aussi la période
    = [(2π)/9 ; π/3] ∪ [(8π)/9 ; π]   ← Garder ce qui tombe dans [0 ; π], k par k
  aides : sin u ≥ √3/2 : lis l'arc sur le cercle, puis ajoute 2kπ. | π/3 + 2kπ ≤ 3x − π/3 ≤ (2π)/3 + 2kπ | (2π)/9 + 2kπ/3 ≤ x ≤ π/3 + 2kπ/3
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

```

### Niveau 5

```
Résous sin(4x) + cos(4x) ≥ 0 dans [0 ; 2π].
  [free, sans aide]  sin(4x) + cos(4x) ≥ 0
    = √2sin(4x + π/4) ≥ 0   ← Forme R sin(x + φ), R = √2
    = sin(4x + π/4) ≥ 0   ← Diviser par R
    = 2kπ ≤ 4x + π/4 ≤ π + 2kπ   ← Arc solution, + 2kπ
    = −π/4 + 2kπ ≤ 4x ≤ (3π)/4 + 2kπ   ← Retirer π/4
    = −π/16 + kπ/2 ≤ x ≤ (3π)/16 + kπ/2   ← Diviser aussi la période
    = [0 ; (3π)/16] ∪ [(7π)/16 ; (11π)/16] ∪ [(15π)/16 ; (19π)/16] ∪ [(23π)/16 ; (27π)/16] ∪ [(31π)/16 ; 2π]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  pièges : g9_bracket, g3_rphi, g3_ineq_arc

Résous sin(2x) − √3cos(2x) ≥ √2 dans [π/2 ; 3π/2].
  [free, sans aide]  sin(2x) − √3cos(2x) ≥ √2
    = 2sin(2x − π/3) ≥ √2   ← Forme R sin(x + φ), R = 2
    = sin(2x − π/3) ≥ √2/2   ← Diviser par R
    = π/4 + 2kπ ≤ 2x − π/3 ≤ (3π)/4 + 2kπ   ← Arc solution, + 2kπ
    = (7π)/12 + 2kπ ≤ 2x ≤ (13π)/12 + 2kπ   ← Ajouter π/3
    = (7π)/24 + kπ ≤ x ≤ (13π)/24 + kπ   ← Diviser aussi la période
    = [π/2 ; (13π)/24] ∪ [(31π)/24 ; (3π)/2]   ← Garder ce qui tombe dans [π/2 ; 3π/2], k par k
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Résous sin(4x) − √3cos(4x) ≤ −√2 dans [π/2 ; 3π/2].
  [free, sans aide]  sin(4x) − √3cos(4x) ≤ −√2
    = 2sin(4x − π/3) ≤ −√2   ← Forme R sin(x + φ), R = 2
    = sin(4x − π/3) ≤ −√2/2   ← Diviser par R
    = (5π)/4 + 2kπ ≤ 4x − π/3 ≤ (7π)/4 + 2kπ   ← Arc solution, + 2kπ
    = (19π)/12 + 2kπ ≤ 4x ≤ (25π)/12 + 2kπ   ← Ajouter π/3
    = (19π)/48 + kπ/2 ≤ x ≤ (25π)/48 + kπ/2   ← Diviser aussi la période
    = [π/2 ; (25π)/48] ∪ [(43π)/48 ; (49π)/48] ∪ [(67π)/48 ; (3π)/2]   ← Garder ce qui tombe dans [π/2 ; 3π/2], k par k
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

```

### Variantes d'examen

```
Résous −sin(4x) + √3cos(4x) > −1 dans [0 ; 2π].
  [free, sans aide, examen open]  −sin(4x) + √3cos(4x) > −1
    = 2sin(4x + (2π)/3) > −1   ← Forme R sin(x + φ), R = 2
    = sin(4x + (2π)/3) > −1/2   ← Diviser par R
    = −π/6 + 2kπ < 4x + (2π)/3 < (7π)/6 + 2kπ   ← Arc solution, + 2kπ
    = −(5π)/6 + 2kπ < 4x < π/2 + 2kπ   ← Retirer (2π)/3
    = −(5π)/24 + kπ/2 < x < π/8 + kπ/2   ← Diviser aussi la période
    = [0 ; π/8[ ∪ ](7π)/24 ; (5π)/8[ ∪ ](19π)/24 ; (9π)/8[ ∪ ](31π)/24 ; (13π)/8[ ∪ ](43π)/24 ; 2π]   ← Garder ce qui tombe dans [0 ; 2π], k par k
  pièges : g9_bracket, g3_divide_zero, g3_rphi, g3_ineq_arc

Les solutions de cos(x − π/3) ≤ √2/2 dans [0 ; π] sont…
  ✔ [0 ; π/12] ∪ [(7π)/12 ; π]   · [0 ; π/12]   · [π/12 ; (7π)/12] [g3_ineq_arc]   · [(7π)/12 ; (25π)/12] [g3_ineq_window]
  [examen mcq]
  pièges : g3_ineq_arc, g3_ineq_window

```

## Résoudre un triangle (`g3-triangle`, Gymnase)

_Théorème du cosinus, théorème du sinus, cas ambigu._

### Niveau 1

```
Triangle ABC avec a = 3, b = 8 et γ = 60°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  3² + 8² − 2·3·8·cos(60°)
    (Théorème du cosinus : c² = a² + b² − 2ab cos γ.)
    = 9 + 64 − □   (trous : 9 + 64 − 24)   ← cos 60° = 1/2
    = 49   ← Calculer
  — Racine :  [juge value]  départ : √(49)
    = 7   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (8² + 7² − 3²)/(2·8·7)
    = 104/112   ← Calculer
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 60° − 21,79°
    = 98,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 3² + 8² − 2·3·8·cos(60°) | 9 + 64 − 24
  pièges : g3_deg_rad, g3_cos_law_sign

Triangle ABC avec a = 8, b = 15 et γ = 60°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  8² + 15² − 2·8·15·cos(60°)
    (Théorème du cosinus : c² = a² + b² − 2ab cos γ.)
    = 64 + 225 − □   (trous : 64 + 225 − 120)   ← cos 60° = 1/2
    = 169   ← Calculer
  — Racine :  [juge value]  départ : √(169)
    = 13   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (15² + 13² − 8²)/(2·15·13)
    = 330/390   ← Calculer
    = 11/13   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(11/13)
    = 32,20°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 60° − 32,20°
    = 87,80°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 8² + 15² − 2·8·15·cos(60°) | 64 + 225 − 120
  pièges : g3_deg_rad, g3_cos_law_sign

Triangle ABC avec a = 5, b = 21 et γ = 60°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  5² + 21² − 2·5·21·cos(60°)
    (Théorème du cosinus : c² = a² + b² − 2ab cos γ.)
    = 25 + 441 − □   (trous : 25 + 441 − 105)   ← cos 60° = 1/2
    = 361   ← Calculer
  — Racine :  [juge value]  départ : √(361)
    = 19   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (21² + 19² − 5²)/(2·21·19)
    = 777/798   ← Calculer
    = 37/38   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(37/38)
    = 13,17°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 60° − 13,17°
    = 106,83°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 5² + 21² − 2·5·21·cos(60°) | 25 + 441 − 105
  pièges : g3_deg_rad, g3_cos_law_sign

```

### Niveau 2

```
Triangle ABC avec a = 6, b = 10 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  6² + 10² − 2·6·10·cos(120°)
    ? Deux côtés et l'angle compris : quel théorème ? ✔ Le théorème du cosinus / · Le théorème du sinus / · Pythagore
    = 36 + 100 + 60   ← cos 120° = −1/2
    = 196   ← Calculer
  — Racine :  [juge value]  départ : √(196)
    = 14   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (10² + 14² − 6²)/(2·10·14)
    = 260/280   ← Calculer
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 6² + 10² − 2·6·10·cos(120°) | 36 + 100 + 60
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

Triangle ABC avec a = 6, b = 10 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  6² + 10² − 2·6·10·cos(120°)
    ? Deux côtés et l'angle compris : quel théorème ? ✔ Le théorème du cosinus / · Le théorème du sinus / · Pythagore
    = 36 + 100 + 60   ← cos 120° = −1/2
    = 196   ← Calculer
  — Racine :  [juge value]  départ : √(196)
    = 14   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (10² + 14² − 6²)/(2·10·14)
    = 260/280   ← Calculer
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 6² + 10² − 2·6·10·cos(120°) | 36 + 100 + 60
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

Triangle ABC avec a = 9, b = 15 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [guided]  9² + 15² − 2·9·15·cos(120°)
    ? Deux côtés et l'angle compris : quel théorème ? ✔ Le théorème du cosinus / · Le théorème du sinus / · Pythagore
    = 81 + 225 + 135   ← cos 120° = −1/2
    = 441   ← Calculer
  — Racine :  [juge value]  départ : √(441)
    = 21   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (15² + 21² − 9²)/(2·15·21)
    = 585/630   ← Calculer
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 9² + 15² − 2·9·15·cos(120°) | 81 + 225 + 135
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

```

### Niveau 3

```
Triangle ABC avec a = 7, b = 8 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [tap, suivre l'erreur, menu menu]  7² + 8² − 2·7·8·cos(120°)
    = 49 + 64 + 56   ← cos 120° = −1/2
    = 169   ← Calculer
  — Racine :  [juge value]  départ : √(169)
    = 13   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (8² + 13² − 7²)/(2·8·13)
    = 23/26   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(23/26)
    = 27,80°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 27,80°
    = 32,20°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 7² + 8² − 2·7·8·cos(120°) | 49 + 64 + 56
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

Triangle ABC avec a = 8, b = 15 et γ = 60°. Calcule c, puis α et β (angles à 0,01° près).
  [tap, suivre l'erreur, menu menu]  8² + 15² − 2·8·15·cos(60°)
    = 64 + 225 − 120   ← cos 60° = 1/2
    = 169   ← Calculer
  — Racine :  [juge value]  départ : √(169)
    = 13   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (15² + 13² − 8²)/(2·15·13)
    = 11/13   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(11/13)
    = 32,20°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 60° − 32,20°
    = 87,80°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 8² + 15² − 2·8·15·cos(60°) | 64 + 225 − 120
  pièges : g3_deg_rad, g3_cos_law_sign

Triangle ABC avec a = 6, b = 10 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [tap, suivre l'erreur, menu menu]  6² + 10² − 2·6·10·cos(120°)
    = 36 + 100 + 60   ← cos 120° = −1/2
    = 196   ← Calculer
  — Racine :  [juge value]  départ : √(196)
    = 14   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (10² + 14² − 6²)/(2·10·14)
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 6² + 10² − 2·6·10·cos(120°) | 36 + 100 + 60
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

```

### Niveau 4

```
Triangle ABC avec a = 9, b = 15 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [free, suivre l'erreur]  9² + 15² − 2·9·15·cos(120°)
    = 81 + 225 + 135   ← cos 120° = −1/2
    = 441   ← Calculer
  — Racine :  [juge value]  départ : √(441)
    = 21   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (15² + 21² − 9²)/(2·15·21)
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 9² + 15² − 2·9·15·cos(120°) | 81 + 225 + 135
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

Triangle ABC avec a = 3, b = 5 et γ = 120°. Calcule c, puis α et β (angles à 0,01° près).
  [free, suivre l'erreur]  3² + 5² − 2·3·5·cos(120°)
    = 9 + 25 + 15   ← cos 120° = −1/2
    = 49   ← Calculer
  — Racine :  [juge value]  départ : √(49)
    = 7   ← c > 0
  — Théorème du cosinus pour α :  [juge value]  départ : (5² + 7² − 3²)/(2·5·7)
    = 13/14   ← Simplifier
  — L'angle α :  [juge value]  départ : arccos(13/14)
    = 21,79°   ← arccos, à 0,01° près
  — Somme des angles :  [juge value]  départ : 180° − 120° − 21,79°
    = 38,21°   ← α + β + γ = 180°
  aides : Deux côtés et l'angle entre eux : théorème du cosinus. | 3² + 5² − 2·3·5·cos(120°) | 9 + 25 + 15
  pièges : g3_deg_rad, g3_reduce_sign, g3_cos_law_sign

Triangle ABC avec a = 6, c = 7 et α = 30°. Calcule les valeurs possibles de γ (à 0,01° près).
  [free, suivre l'erreur]  7·sin(30°)/6
    = 7/12   ← sin 30° = 1/2
  — Première valeur :  [juge value]  départ : arcsin(7/12)
    = 35,69°   ← arcsin
  — Seconde valeur, de même sinus :  [juge value]  départ : 180° − 35,69°
    ? Combien de valeurs pour γ ? ✔ Deux : γ₁ et 180° − γ₁, si 30° + γ₂ < 180° / · Une seule : γ = arcsin(…)
    = 144,31°   ← 180° − γ₁ : 30° + γ₂ < 180°, un second triangle
  aides : Un angle et le côté opposé : théorème du sinus. Puis 180° − γ a le même sinus. | 7·sin(30°)/6 | 7/12
  pièges : g3_deg_rad, g3_ssa_lost

```

### Niveau 5

```
Triangle ABC avec a = 13, b = 8, c = 15. (a) Calcule α. (b) D est sur le segment AB et CD = 4√6. Calcule δ = ∠ADC.
  [free, sans aide]  (8² + 15² − 13²)/(2·8·15)
    = 1/2   ← Théorème du cosinus, puis simplifier
  — L'angle α :  [juge value]  départ : arccos(1/2)
    = 60°   ← Valeur exacte
  — Dans le triangle ADC (CD = 4√6), théorème du sinus :  [juge value]  départ : 8·sin(60°)/((8√6)/2)
    = √2/2   ← sin δ = AC·sin α / CD
  — L'angle δ :  [juge value]  départ : arcsin(√2/2)
    ? sin δ = √2/2 : δ = 45° ou δ = 135° ? ✔ δ = 45° : 135° + 60° dépasse 180° / · δ = 135°
    = 45°   ← 135° + 60° > 180° : δ = 45°

Triangle ABC avec a = 7, b = 5, c = 8. (a) Calcule α. (b) D est sur le segment AB et CD = 5√6/2. Calcule δ = ∠ADC.
  [free, sans aide]  (5² + 8² − 7²)/(2·5·8)
    = 1/2   ← Théorème du cosinus, puis simplifier
  — L'angle α :  [juge value]  départ : arccos(1/2)
    = 60°   ← Valeur exacte
  — Dans le triangle ADC (CD = 5√6/2), théorème du sinus :  [juge value]  départ : 5·sin(60°)/((5√6)/2)
    = √2/2   ← sin δ = AC·sin α / CD
  — L'angle δ :  [juge value]  départ : arcsin(√2/2)
    ? sin δ = √2/2 : δ = 45° ou δ = 135° ? ✔ δ = 45° : 135° + 60° dépasse 180° / · δ = 135°
    = 45°   ← 135° + 60° > 180° : δ = 45°

Triangle ABC avec a = 7, b = 5, c = 8. (a) Calcule α. (b) D est sur le segment AB et CD = 5√6/2. Calcule δ = ∠ADC.
  [free, sans aide]  (5² + 8² − 7²)/(2·5·8)
    = 1/2   ← Théorème du cosinus, puis simplifier
  — L'angle α :  [juge value]  départ : arccos(1/2)
    = 60°   ← Valeur exacte
  — Dans le triangle ADC (CD = 5√6/2), théorème du sinus :  [juge value]  départ : 5·sin(60°)/((5√6)/2)
    = √2/2   ← sin δ = AC·sin α / CD
  — L'angle δ :  [juge value]  départ : arcsin(√2/2)
    ? sin δ = √2/2 : δ = 45° ou δ = 135° ? ✔ δ = 45° : 135° + 60° dépasse 180° / · δ = 135°
    = 45°   ← 135° + 60° > 180° : δ = 45°

```

### Variantes d'examen

```
Triangle ABC avec a = 19, b = 5, c = 21. (a) Calcule α. (b) D est sur le segment AB et CD = 5√6/2. Calcule δ = ∠ADC.
  [free, sans aide, examen open]  (5² + 21² − 19²)/(2·5·21)
    = 1/2   ← Théorème du cosinus, puis simplifier
  — L'angle α :  [juge value]  départ : arccos(1/2)
    = 60°   ← Valeur exacte
  — Dans le triangle ADC (CD = 5√6/2), théorème du sinus :  [juge value]  départ : 5·sin(60°)/((5√6)/2)
    = √2/2   ← sin δ = AC·sin α / CD
  — L'angle δ :  [juge value]  départ : arcsin(√2/2)
    ? sin δ = √2/2 : δ = 45° ou δ = 135° ? ✔ δ = 45° : 135° + 60° dépasse 180° / · δ = 135°
    = 45°   ← 135° + 60° > 180° : δ = 45°

Triangle avec a = 5, b = 8 et γ = 60°. Alors c =
  ✔ 7   · 13   · √129 [g3_cos_law_sign]   · √89
  [examen mcq]
  pièges : g3_cos_law_sign

```

## Fonctions arc : définition et arccos(cos θ) (`g3-arc-def`, Gymnase)

_arcsin, arccos, arctan et leurs images._

### Niveau 1

```
Calcule arctan(−√3).
  [guided]  arctan(−√3)
    (arctan prend ses valeurs dans ]−π/2 ; π/2[.)
    = □   (trous : −π/3)   ← L'angle de ]−π/2 ; π/2[ dont le tan vaut −√3
  aides : Cherche l'angle de ]−π/2 ; π/2[ dont le tan vaut −√3. | tan(−π/3) = −√3 | −π/3
  pièges : g3_arc_root_sign

Calcule arctan(−√3).
  [guided]  arctan(−√3)
    (arctan prend ses valeurs dans ]−π/2 ; π/2[.)
    = □   (trous : −π/3)   ← L'angle de ]−π/2 ; π/2[ dont le tan vaut −√3
  aides : Cherche l'angle de ]−π/2 ; π/2[ dont le tan vaut −√3. | tan(−π/3) = −√3 | −π/3
  pièges : g3_arc_root_sign

Calcule arctan(−√3/3).
  [guided]  arctan(−√3/3)
    (arctan prend ses valeurs dans ]−π/2 ; π/2[.)
    = □   (trous : −π/6)   ← L'angle de ]−π/2 ; π/2[ dont le tan vaut −√3/3
  aides : Cherche l'angle de ]−π/2 ; π/2[ dont le tan vaut −√3/3. | tan(−π/6) = −√3/3 | −π/6
  pièges : g3_arc_root_sign

```

### Niveau 2

```
Calcule arccos(cos(−(2π)/3)).
  [guided]  arccos(cos(−(2π)/3))
    (arccos prend ses valeurs dans [0 ; π] : arccos(cos θ) = θ seulement si θ ∈ [0 ; π].)
    = arccos(cos((2π)/3))   ← cos est paire
    = (2π)/3   ← (2π)/3 ∈ [0 ; π]
  aides : Le résultat doit être dans [0 ; π]. | arccos(cos((2π)/3)) | (2π)/3
  pièges : g3_reduce_sign, g3_arc_cancel, g3_arc_root_sign

Calcule arccos(cos(−π/6)).
  [guided]  arccos(cos(−π/6))
    (arccos prend ses valeurs dans [0 ; π] : arccos(cos θ) = θ seulement si θ ∈ [0 ; π].)
    = arccos(cos(π/6))   ← cos est paire
    = π/6   ← π/6 ∈ [0 ; π]
  aides : Le résultat doit être dans [0 ; π]. | arccos(cos(π/6)) | π/6
  pièges : g3_arc_cancel

Calcule arccos(cos(−π/2)).
  [guided]  arccos(cos(−π/2))
    (arccos prend ses valeurs dans [0 ; π] : arccos(cos θ) = θ seulement si θ ∈ [0 ; π].)
    = arccos(cos(π/2))   ← cos est paire
    = π/2   ← π/2 ∈ [0 ; π]
  aides : Le résultat doit être dans [0 ; π]. | arccos(cos(π/2)) | π/2
  pièges : g3_arc_cancel

```

### Niveau 3

```
Calcule arcsin(sin((5π)/4)).
  [tap, suivre l'erreur, menu trig]  arcsin(sin((5π)/4))
    = arcsin(sin(−(3π)/4))   ← Retirer des tours de 2π
    = arcsin(sin(−π/4))   ← sin(−π − θ) = sin θ
    = −π/4   ← −π/4 ∈ [−π/2 ; π/2]
  aides : Le résultat doit être dans [−π/2 ; π/2]. | arcsin(sin(−(3π)/4)) | −π/4
  pièges : g3_reduce_sign, g3_arc_cancel, g3_arc_root_sign

Calcule arccos(cos(−(13π)/6)).
  [tap, suivre l'erreur, menu trig]  arccos(cos(−(13π)/6))
    = arccos(cos(−π/6))   ← Retirer des tours de 2π
    = arccos(cos(π/6))   ← cos est paire
    = π/6   ← π/6 ∈ [0 ; π]
  aides : Le résultat doit être dans [0 ; π]. | arccos(cos(−π/6)) | π/6
  pièges : g3_arc_cancel

Calcule arctan(tan((2π)/3)).
  [tap, suivre l'erreur, menu trig]  arctan(tan((2π)/3))
    = arctan(tan(−π/3))   ← Retirer des multiples de π
    = −π/3   ← −π/3 ∈ ]−π/2 ; π/2[
  aides : Le résultat doit être dans ]−π/2 ; π/2[. | arctan(tan(−π/3)) | −π/3
  pièges : g3_reduce_sign, g3_arc_cancel, g3_arc_root_sign

```

### Niveau 4

```
Calcule arcsin(sin(−(7π)/3)).
  [free, suivre l'erreur]  arcsin(sin(−(7π)/3))
    = arcsin(sin(−π/3))   ← Retirer des tours de 2π
    = −π/3   ← −π/3 ∈ [−π/2 ; π/2]
  aides : Le résultat doit être dans [−π/2 ; π/2]. | arcsin(sin(−π/3)) | −π/3
  pièges : g3_reduce_sign, g3_arc_cancel, g3_arc_root_sign

Calcule arcsin(sin((9π)/4)).
  [free, suivre l'erreur]  arcsin(sin((9π)/4))
    = arcsin(sin(π/4))   ← Retirer des tours de 2π
    = π/4   ← π/4 ∈ [−π/2 ; π/2]
  aides : Le résultat doit être dans [−π/2 ; π/2]. | arcsin(sin(π/4)) | π/4
  pièges : g3_arc_cancel

Calcule arctan(tan((11π)/6)).
  [free, suivre l'erreur]  arctan(tan((11π)/6))
    = arctan(tan(−π/6))   ← Retirer des multiples de π
    = −π/6   ← −π/6 ∈ ]−π/2 ; π/2[
  aides : Le résultat doit être dans ]−π/2 ; π/2[. | arctan(tan(−π/6)) | −π/6
  pièges : g3_reduce_sign, g3_arc_cancel, g3_arc_root_sign

```

### Niveau 5

```
Vrai ou faux ?
  « Pour tous α, β ∈ ]−π/2 ; π/2[, tan α > tan β ⇔ α > β. » → VRAI

Vrai ou faux ?
  « Pour tout x ∈ [−π/2 ; π/2], arcsin(sin x) = x. » → VRAI

Vrai ou faux ?
  « cot est décroissante sur ]−π/2 ; 0[ ∪ ]0 ; π/2[ : si a < b, alors cot a > cot b. » → FAUX
    contre-exemple (refute) : a = -π/4, b = π/4
  pièges : g3_arc_cancel

```

### Variantes d'examen

```
arccos(cos(−(13π)/4)) = ?
  · −(3π)/4   · −(13π)/4 [g3_arc_cancel]   ✔ (3π)/4   · π/4
  [examen mcq]
  pièges : g3_arc_cancel

Vrai ou faux ?
  « Pour tous α, β ∈ ]−π/2 ; π/2[, tan α > tan β ⇔ α > β. » → VRAI
  [examen tf]

```

## Compositions : cos(2 arccos a), tan(arcsin a) (`g3-arc-comp`, CMS)

_Poser θ, lire son intervalle, puis le signe._

### Niveau 1

```
Calcule sin(arccos(−3/5)).
  [guided]  sin(arccos(−3/5))
    (θ = arccos(−3/5) : cos θ = −3/5, θ ∈ [0 ; π].)
    = √(1 − (−3/5)²)   ← sin θ ≥ 0 sur [0 ; π]
    = 4/5   ← Calculer
  aides : Sur [0 ; π], sin θ est positif. | √(1 − (−3/5)²) | 4/5
  pièges : g3_arc_root_sign

Calcule cos(arcsin(−15/17)).
  [guided]  cos(arcsin(−15/17))
    (θ = arcsin(−15/17) : sin θ = −15/17, θ ∈ [−π/2 ; π/2].)
    = √(1 − (−15/17)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 8/17   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (−15/17)²) | 8/17
  pièges : g3_arc_root_sign

Calcule cos(arcsin(5/13)).
  [guided]  cos(arcsin(5/13))
    (θ = arcsin(5/13) : sin θ = 5/13, θ ∈ [−π/2 ; π/2].)
    = √(1 − (5/13)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 12/13   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (5/13)²) | 12/13

```

### Niveau 2

```
Calcule sin(arccos(5/13)).
  [guided]  sin(arccos(5/13))
    (θ = arccos(5/13) : cos θ = 5/13, θ ∈ [0 ; π].)
    ? sin θ = ±√(…) : quel signe ? ✔ + : sin θ ≥ 0 sur [0 ; π] / · Le signe de 5/13
    = √(1 − (5/13)²)   ← sin θ ≥ 0 sur [0 ; π]
    = 12/13   ← Calculer
  aides : Sur [0 ; π], sin θ est positif. | √(1 − (5/13)²) | 12/13
  pièges : g3_arc_root_sign

Calcule sin(arctan(15/8)).
  [guided]  cos(arctan(15/8))
    (θ = arctan(15/8) : tan θ = 15/8, θ ∈ ]−π/2 ; π/2[.)
    ? cos θ = ±√(…) : quel signe ? ✔ + : cos θ ≥ 0 sur ]−π/2 ; π/2[ / · Le signe de 15/8
    = 1/√(1 + (15/8)²)   ← cos θ ≥ 0 sur ]−π/2 ; π/2[
    = 8/17   ← Calculer
  — Puis :  [juge value]  départ : sin(arctan(15/8))
    = 15/17   ← Lire
  aides : Sur ]−π/2 ; π/2[, cos θ est positif. | 1/√(1 + (15/8)²) | 8/17
  pièges : g3_arc_root_sign

Calcule cos(arctan(−4/3)).
  [guided]  cos(arctan(−4/3))
    (θ = arctan(−4/3) : tan θ = −4/3, θ ∈ ]−π/2 ; π/2[.)
    ? cos θ = ±√(…) : quel signe ? ✔ + : cos θ ≥ 0 sur ]−π/2 ; π/2[ / · Le signe de −4/3
    = 1/√(1 + (−4/3)²)   ← cos θ ≥ 0 sur ]−π/2 ; π/2[
    = 3/5   ← Calculer
  aides : Sur ]−π/2 ; π/2[, cos θ est positif. | 1/√(1 + (−4/3)²) | 3/5
  pièges : g3_arc_root_sign

```

### Niveau 3

```
Calcule cos(arctan(15/8)).
  [tap, suivre l'erreur, menu menu]  cos(arctan(15/8))
    (θ = arctan(15/8) : tan θ = 15/8, θ ∈ ]−π/2 ; π/2[.)
    = 1/√(1 + (15/8)²)   ← cos θ ≥ 0 sur ]−π/2 ; π/2[
    = 8/17   ← Calculer
  aides : Sur ]−π/2 ; π/2[, cos θ est positif. | 1/√(1 + (15/8)²) | 8/17

Calcule tan(arcsin(8/17)).
  [tap, suivre l'erreur, menu menu]  cos(arcsin(8/17))
    (θ = arcsin(8/17) : sin θ = 8/17, θ ∈ [−π/2 ; π/2].)
    = √(1 − (8/17)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 15/17   ← Calculer
  — Puis :  [juge value]  départ : tan(arcsin(8/17))
    = (8/17)/(15/17)   ← tan θ = sin θ / cos θ
    = 8/15   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (8/17)²) | 15/17

Calcule cos(2arcsin(15/17)).
  [tap, suivre l'erreur, menu menu]  cos(arcsin(15/17))
    (θ = arcsin(15/17) : sin θ = 15/17, θ ∈ [−π/2 ; π/2].)
    ? Quelle formule pour cos(2θ) ? ✔ cos 2θ = cos²θ − sin²θ / · cos(2θ) = 2 cos θ
    = √(1 − (15/17)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 8/17   ← Calculer
  — Puis :  [juge value]  départ : cos(2arcsin(15/17))
    = (8/17)² − (15/17)²   ← cos 2θ = cos²θ − sin²θ
    = −161/289   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (15/17)²) | 8/17
  pièges : g3_linear

```

### Niveau 4

```
Calcule tan(arccos(8/17)).
  [free, suivre l'erreur]  sin(arccos(8/17))
    (θ = arccos(8/17) : cos θ = 8/17, θ ∈ [0 ; π].)
    = √(1 − (8/17)²)   ← sin θ ≥ 0 sur [0 ; π]
    = 15/17   ← Calculer
  — Puis :  [juge value]  départ : tan(arccos(8/17))
    = (15/17)/(8/17)   ← tan θ = sin θ / cos θ
    = 15/8   ← Calculer
  aides : Sur [0 ; π], sin θ est positif. | √(1 − (8/17)²) | 15/17

Calcule cos(2arcsin(−8/17)).
  [free, suivre l'erreur]  cos(arcsin(−8/17))
    (θ = arcsin(−8/17) : sin θ = −8/17, θ ∈ [−π/2 ; π/2].)
    = √(1 − (−8/17)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 15/17   ← Calculer
  — Puis :  [juge value]  départ : cos(2arcsin(−8/17))
    = (15/17)² − (−8/17)²   ← cos 2θ = cos²θ − sin²θ
    = 161/289   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (−8/17)²) | 15/17
  pièges : g3_arc_root_sign

Calcule tan(arcsin(5/13)).
  [free, suivre l'erreur]  cos(arcsin(5/13))
    (θ = arcsin(5/13) : sin θ = 5/13, θ ∈ [−π/2 ; π/2].)
    = √(1 − (5/13)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 12/13   ← Calculer
  — Puis :  [juge value]  départ : tan(arcsin(5/13))
    = (5/13)/(12/13)   ← tan θ = sin θ / cos θ
    = 5/12   ← Calculer
  aides : Sur [−π/2 ; π/2], cos θ est positif. | √(1 − (5/13)²) | 12/13

```

### Niveau 5

```
Écris cos(2arcsin(x)) sans fonction trigonométrique ni fonction arc (x ∈ ]−1 ; 1[).
  [free, sans aide]  cos(2arcsin(x))
    = 1 − 2sin(arcsin(x))²   ← cos 2θ = 1 − 2sin²θ
    = 1 − 2x²   ← sin(arcsin x) = x
  pièges : g3_linear

Écris cos(2arctan(x)) sans fonction trigonométrique ni fonction arc (x ∈ ]−1 ; 1[).
  [free, sans aide]  cos(2arctan(x))
    = cos(arctan(x))² − sin(arctan(x))²   ← cos 2θ = cos²θ − sin²θ
    = 1/(1 + x²) − x²/(1 + x²)   ← cos θ = 1/√(1 + x²), sin θ = x/√(1 + x²)
    = (1 − x²)/(1 + x²)   ← Même dénominateur
  pièges : g3_linear

Écris cos(2arctan(x)) sans fonction trigonométrique ni fonction arc (x ∈ ]−1 ; 1[).
  [free, sans aide]  cos(2arctan(x))
    = cos(arctan(x))² − sin(arctan(x))²   ← cos 2θ = cos²θ − sin²θ
    = 1/(1 + x²) − x²/(1 + x²)   ← cos θ = 1/√(1 + x²), sin θ = x/√(1 + x²)
    = (1 − x²)/(1 + x²)   ← Même dénominateur
  pièges : g3_linear

```

### Variantes d'examen

```
tan(arcsin(−8/17)) = ?
  ✔ −8/15   · 15/17   · −15/8   · 8/15 [g3_arc_root_sign]
  [examen mcq]
  pièges : g3_arc_root_sign

Calcule sin(2arcsin(8/17)).
  [free, sans aide, examen open]  cos(arcsin(8/17))
    (θ = arcsin(8/17) : sin θ = 8/17, θ ∈ [−π/2 ; π/2].)
    = √(1 − (8/17)²)   ← cos θ ≥ 0 sur [−π/2 ; π/2]
    = 15/17   ← Calculer
  — Puis :  [juge value]  départ : sin(2arcsin(8/17))
    = 2·(8/17)·(15/17)   ← sin 2θ = 2 sin θ cos θ
    = 240/289   ← Calculer

```

## Pièges de cette unité

- **Degrés et radians mélangés** (`g3_deg_rad`, E) : L = 12·30 = 360 cm au lieu de L = 12·π/6 = 2π cm
- **Signe oublié en réduisant l'angle** (`g3_reduce_sign`, E) : cos(5π/6) = cos(π/6) au lieu de cos(5π/6) = −cos(π/6)
- **sin et cos pas échangés autour de π/2** (`g3_reduce_swap`, E) : cos(π/2 + x) = cos x au lieu de cos(π/2 + x) = −sin x
- **sin et cos traités comme linéaires** (`g3_linear`, E) : cos 2x = 2cos x au lieu de cos 2x = 2cos²x − 1
- **Signe de la formule d'addition** (`g3_add_sign`, E) : cos(a + b) = cos a cos b + sin a sin b au lieu de cos(a + b) = cos a cos b − sin a sin b
- **Signe de la racine de bissection** (`g3_half_sign`, E) : cos(7π/8) = +√((1 + cos(7π/4))/2) au lieu de cos(7π/8) = −√((1 + cos(7π/4))/2)
- **Une famille de solutions oubliée** (`g3_family_missing`, E) : cos x = 1/2 : x = π/3 + 2kπ au lieu de x = ±π/3 + 2kπ
- **Seconde famille de sin écrite −α** (`g3_sin_family`, E) : sin x = 1/2 : x = π/6 + 2kπ ou x = −π/6 + 2kπ au lieu de x = π/6 + 2kπ ou x = 5π/6 + 2kπ
- **Période pas divisée** (`g3_period_divide`, E) : 2x = α + 2kπ : x = α/2 + 2kπ au lieu de x = α/2 + kπ
- **x = π + 2kπ oublié avec t = tan(x/2)** (`g3_bioche_pi`, E) : 2 sin x − cos x = 1 : S = {2 arctan(1/2) + 2kπ} au lieu de S = {2 arctan(1/2) + 2kπ} ∪ {π + 2kπ}
- **Division par cos x sans vérifier cos x = 0** (`g3_divide_zero`, E) : 2 sin x cos x = cos x → 2 sin x = 1 au lieu de cos x (2 sin x − 1) = 0
- **R ou φ faux dans a sin x + b cos x** (`g3_rphi`, E) : √3 sin x + cos x = (√3 + 1) sin(x + π/6) au lieu de √3 sin x + cos x = 2 sin(x + π/6)
- **Arc complémentaire** (`g3_ineq_arc`, E) : cos u ≥ 1/2 : [π/3 ; 5π/3] au lieu de [−π/3 ; π/3] + 2kπ
- **Un seul k, pas coupé à l'intervalle** (`g3_ineq_window`, E) : S = [−2π/3 ; 0] au lieu de S = {0} ∪ [4π/3 ; 2π]
- **Signe du théorème du cosinus** (`g3_cos_law_sign`, E) : c² = a² + b² + 2ab cos γ au lieu de c² = a² + b² − 2ab cos γ
- **Deuxième angle du cas ambigu oublié** (`g3_ssa_lost`, E) : sin β = s : β seul au lieu de β ou 180° − β
- **arccos(cos θ) = θ sans regarder l'image** (`g3_arc_cancel`, E) : arccos(cos(13π/4)) = 13π/4 au lieu de arccos(cos(13π/4)) = 3π/4
- **Signe de la racine pris sur l'argument** (`g3_arc_root_sign`, E) : cos(arcsin(−3/5)) = −4/5 au lieu de cos(arcsin(−3/5)) = 4/5
