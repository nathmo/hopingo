# Exemples de questions — Nombres complexes

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Forme algébrique : opérations, conjugué, module, division (`g8-algebraic`, Gymnase)

_Calculer avec i² = −1, diviser par le conjugué, |a + bi| = √(a² + b²)._

### Niveau 1

```
Écris sous la forme a + bi : (−2 − 10i)/(−2 − 2i)
  [guided]  (−2 − 10i)/(−2 − 2i)
    = ((−2 − 10i)(□))/((−2 − 2i)(−2 + 2i))   (trous : ((−2 − 10i)(−2 + 2i))/((−2 − 2i)(−2 + 2i)))   ← Conjugué du dénominateur
    = (□)/8   (trous : (24 + 16i)/8)   ← (−2−2i)(−2+2i) = 8
    = □   (trous : 3 + 2i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−2 − 10i)(□))/8 | 3 + 2i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (−6 + 9i)/(−2 + 3i)
  [guided]  (−6 + 9i)/(−2 + 3i)
    = ((−6 + 9i)(□))/((−2 + 3i)(−2 − 3i))   (trous : ((−6 + 9i)(−2 − 3i))/((−2 + 3i)(−2 − 3i)))   ← Conjugué du dénominateur
    = □/13   (trous : 39/13)   ← (−2+3i)(−2−3i) = 13
    = □   (trous : 3)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−6 + 9i)(□))/13 | 3
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (1 − 5i)/(1 + i)
  [guided]  (1 − 5i)/(1 + i)
    = ((1 − 5i)(□))/((1 + i)(1 − i))   (trous : ((1 − 5i)(1 − i))/((1 + i)(1 − i)))   ← Conjugué du dénominateur
    = (□)/2   (trous : (−4 − 6i)/2)   ← (1+i)(1−i) = 2
    = □   (trous : −2 − 3i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((1 − 5i)(□))/2 | −2 − 3i
  pièges : g8_div_componentwise

```

### Niveau 2

```
Écris sous la forme a + bi : (−9 − 13i)/(1 − 3i)
  [guided]  (−9 − 13i)/(1 − 3i)
    ? Comment se débarrasser de i au dénominateur ? ✔ Multiplier en haut et en bas par le conjugué 1 + 3i / · Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire / · Multiplier en haut et en bas par 1 − 3i
    = ((−9 − 13i)(□))/((1 − 3i)(1 + 3i))   (trous : ((−9 − 13i)(1 + 3i))/((1 − 3i)(1 + 3i)))   ← Conjugué du dénominateur
    = (□)/10   (trous : (30 − 40i)/10)   ← (1−3i)(1+3i) = 10
    = □   (trous : 3 − 4i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−9 − 13i)(□))/10 | 3 − 4i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (−17 + 6i)/(2 − 3i)
  [guided]  (−17 + 6i)/(2 − 3i)
    ? Comment se débarrasser de i au dénominateur ? ✔ Multiplier en haut et en bas par le conjugué 2 + 3i / · Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire / · Multiplier en haut et en bas par 2 − 3i
    = ((−17 + 6i)(□))/((2 − 3i)(2 + 3i))   (trous : ((−17 + 6i)(2 + 3i))/((2 − 3i)(2 + 3i)))   ← Conjugué du dénominateur
    = (□)/13   (trous : (−52 − 39i)/13)   ← (2−3i)(2+3i) = 13
    = □   (trous : −4 − 3i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−17 + 6i)(□))/13 | −4 − 3i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (6 − 3i)/(2 − i)
  [guided]  (6 − 3i)/(2 − i)
    ? Comment se débarrasser de i au dénominateur ? ✔ Multiplier en haut et en bas par le conjugué 2 + i / · Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire / · Multiplier en haut et en bas par 2 − i
    = ((6 − 3i)(□))/((2 − i)(2 + i))   (trous : ((6 − 3i)(2 + i))/((2 − i)(2 + i)))   ← Conjugué du dénominateur
    = □/5   (trous : 15/5)   ← (2−i)(2+i) = 5
    = □   (trous : 3)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((6 − 3i)(□))/5 | 3
  pièges : g8_div_componentwise

```

### Niveau 3

```
Écris sous la forme a + bi : (−12 + 4i)/(1 − 2i)
  [tap, suivre l'erreur, menu steps]  (−12 + 4i)/(1 − 2i)
    = ((−12 + 4i)(1 + 2i))/((1 − 2i)(1 + 2i))   ← Conjugué du dénominateur
    = (−20 − 20i)/5   ← (1−2i)(1+2i) = 5
    = −4 − 4i   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−12 + 4i)(□))/5 | −4 − 4i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : −13i/(2 + 3i)
  [tap, suivre l'erreur, menu steps]  −13i/(2 + 3i)
    = ((−13i)(2 − 3i))/((2 + 3i)(2 − 3i))   ← Conjugué du dénominateur
    = (−39 − 26i)/13   ← (2+3i)(2−3i) = 13
    = −3 − 2i   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−13i)(□))/13 | −3 − 2i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (−3 + 11i)/(−1 − 3i)
  [tap, suivre l'erreur, menu steps]  (−3 + 11i)/(−1 − 3i)
    = ((−3 + 11i)(−1 + 3i))/((−1 − 3i)(−1 + 3i))   ← Conjugué du dénominateur
    = (−30 − 20i)/10   ← (−1−3i)(−1+3i) = 10
    = −3 − 2i   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−3 + 11i)(□))/10 | −3 − 2i
  pièges : g8_div_componentwise

```

### Niveau 4

```
Écris sous la forme a + bi : 8/(−1 + i)
  [free, suivre l'erreur]  8/(−1 + i)
    = (8(−1 − i))/((−1 + i)(−1 − i))   ← Conjugué du dénominateur
    = (−8 − 8i)/2   ← (−1+i)(−1−i) = 2
    = −4 − 4i   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | (8(□))/2 | −4 − 4i
  pièges : g8_div_componentwise

Calcule le module : |3 + 4i|
  [free, suivre l'erreur]  |3 + 4i|
    = √(9 + 16)   ← |a + bi| = √(a² + b²)
    = √25   ← Additionner
    = 5   ← Racine
  aides : |a + bi| = √(a² + b²) : c'est une longueur (Pythagore). | √(9 + 16) = √□ | 5
  pièges : g8_modulus_no_square

Développe et écris sous la forme a + bi : (3 − 4i)²
  [free, suivre l'erreur]  (3 − 4i)²
    = 9 − 24i + 16i²   ← (a + b)² = a² + 2ab + b²
    = 9 − 24i − 16   ← i² = −1
    = −7 − 24i   ← Regrouper
  aides : Développe comme avec des polynômes en i, puis remplace i² par −1. | 9 − 24i + 16i², et 16i² = □ | −7 − 24i
  pièges : g8_i_squared, g8_moivre_modulus

```

### Niveau 5

```
Écris sous la forme a + bi, sans aide : (4 − 4i)(5 + i) + i⁸⁸⁷
  [free, sans aide]  (4 − 4i)(5 + i) + i⁸⁸⁷
    = (20 + 4i − 20i − 4i²) + (i⁴)²²¹·i³   ← Développer ; cycle de 4
    = (24 − 16i) + i³   ← Calculer
    = 24 − 17i   ← Regrouper
  pièges : a1_cplx_ik_mod, g8_i_squared

Écris sous la forme a + bi, sans aide : (−2 + i)(−2 + 3i) + (−1 + 4i) + i¹⁴¹⁴
  [free, sans aide]  (−2 + i)(−2 + 3i) + (−1 + 4i) + i¹⁴¹⁴
    = (4 − 6i − 2i + 3i² − 1 + 4i) + (i⁴)³⁵³·i²   ← Développer ; cycle de 4
    = (−4i) + i²   ← Calculer
    = −1 − 4i   ← Regrouper
  pièges : a1_cplx_ik_mod, g8_i_squared

Écris sous la forme a + bi, sans aide : (4 − i)(−2 − 4i) + i⁶⁴³
  [free, sans aide]  (4 − i)(−2 − 4i) + i⁶⁴³
    = (−8 − 16i + 2i + 4i²) + (i⁴)¹⁶⁰·i³   ← Développer ; cycle de 4
    = (−12 − 14i) + i³   ← Calculer
    = −12 − 15i   ← Regrouper
  pièges : a1_cplx_ik_mod, g8_i_squared

```

### Variantes d'examen

```
Calcule le module : |−15 − 8i|
  · √23 [g8_modulus_no_square]   · 23 [g8_modulus_no_square]   ✔ 17   · 289
  [examen mcq]
  pièges : g8_modulus_no_square

Vrai ou faux ?
  « Pour tous z₁, z₂ ∈ ℂ : |z₁ − z₂| = |z₁| − |z₂|. » → FAUX
    contre-exemple (complex) : z = 1, w = -1
  [examen tf]
  pièges : g8_modulus_no_square

Donne la partie réelle de (3 − 4i)².
  → -7   pièges attendus : 25 [g8_i_squared]
  [examen coef]
  pièges : g8_i_squared

```

## Forme polaire et exponentielle (`g8-polar`, Gymnase)

_r = |z|, θ par cos θ = a/r et sin θ = b/r ; e^(iθ)·e^(iφ) = e^(i(θ + φ))._

### Niveau 1

```
Écris z = √2e^(−iπ/4) sous la forme a + bi.
  [guided]  √2e^(−iπ/4)
    = √2(cos(□) + isin(−π/4))   (trous : √2(cos(−π/4) + isin(−π/4)))   ← e^(iθ) = cos θ + i sin θ
    = √2(□)   (trous : √2(√2/2 − i√2/2))   ← Valeurs exactes
    = □   (trous : 1 − i)   ← Développer
  aides : r·e^(iθ) = r(cos θ + i sin θ) : remplace cos θ et sin θ par leurs valeurs exactes. | √2e^(−iπ/4) = √2(cos(□) + isin(□)) | 1 − i

Écris z = −1 − i sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π]. On donne r = |z| = √2.
  [guided]  cos(θ)
    = □   (trous : −√2/2)   ← a/r
  — sin θ = b/r =  [juge value]  départ : sin(θ)
    = □   (trous : −√2/2)   ← b/r
  — Argument : θ (dans ]−π ; π]) =  [juge complex]  départ : arg(−1 − i)
    = □   (trous : −3π/4)   ← 3e : θ = −3π/4
  — Forme exponentielle :  [juge complex]  départ : −1 − i
    = □   (trous : √2e^(−3iπ/4))   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√2/2 et sin θ = −√2/2 : θ = □ | √2e^(−3iπ/4)

Écris z = −3 − i√3 sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π]. On donne r = |z| = 2√3.
  [guided]  cos(θ)
    = □   (trous : −√3/2)   ← a/r
  — sin θ = b/r =  [juge value]  départ : sin(θ)
    = □   (trous : −1/2)   ← b/r
  — Argument : θ (dans ]−π ; π]) =  [juge complex]  départ : arg(−3 − i√3)
    = □   (trous : −5π/6)   ← 3e : θ = −5π/6
  — Forme exponentielle :  [juge complex]  départ : −3 − i√3
    = □   (trous : 2√3e^(−5iπ/6))   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√3/2 et sin θ = −1/2 : θ = □ | 2√3e^(−5iπ/6)

```

### Niveau 2

```
Écris z = −2√3 − 2i sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].
  [guided]  |−2√3 − 2i|
    = □   (trous : √(12 + 4))   ← r = √(a² + b²)
    = □   (trous : 4)   ← Calculer
  — Argument : θ = arg z (dans ]−π ; π]) =  [juge complex]  départ : arg(−2√3 − 2i)
    ? cos θ = −√3/2 et sin θ = −1/2. Dans quel quadrant est z ? ✔ 3e quadrant / · 1er quadrant / · 2e quadrant / · θ = arctan(b/a) = π/6
    = □   (trous : −5π/6)   ← 3e : θ = −5π/6
  — Forme exponentielle :  [juge complex]  départ : −2√3 − 2i
    = □   (trous : 4e^(−5iπ/6))   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√3/2 et sin θ = −1/2 : θ = □ | 4e^(−5iπ/6)
  pièges : g8_arg_quadrant

Écris z = −2 + 2i sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].
  [guided]  |−2 + 2i|
    = □   (trous : √(4 + 4))   ← r = √(a² + b²)
    = □   (trous : 2√2)   ← Calculer
  — Argument : θ = arg z (dans ]−π ; π]) =  [juge complex]  départ : arg(−2 + 2i)
    ? cos θ = −√2/2 et sin θ = √2/2. Dans quel quadrant est z ? ✔ 2e quadrant / · 1er quadrant / · 3e quadrant / · θ = arctan(b/a) = −π/4
    = □   (trous : 3π/4)   ← 2e : θ = 3π/4
  — Forme exponentielle :  [juge complex]  départ : −2 + 2i
    = □   (trous : 2√2e^(3iπ/4))   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√2/2 et sin θ = √2/2 : θ = □ | 2√2e^(3iπ/4)
  pièges : g8_modulus_no_square, g8_arg_quadrant

Écris z = −√2 + i√2 sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].
  [guided]  |−√2 + i√2|
    = □   (trous : √(2 + 2))   ← r = √(a² + b²)
    = □   (trous : 2)   ← Calculer
  — Argument : θ = arg z (dans ]−π ; π]) =  [juge complex]  départ : arg(−√2 + i√2)
    ? cos θ = −√2/2 et sin θ = √2/2. Dans quel quadrant est z ? ✔ 2e quadrant / · 1er quadrant / · 3e quadrant / · θ = arctan(b/a) = −π/4
    = □   (trous : 3π/4)   ← 2e : θ = 3π/4
  — Forme exponentielle :  [juge complex]  départ : −√2 + i√2
    = □   (trous : 2e^(3iπ/4))   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√2/2 et sin θ = √2/2 : θ = □ | 2e^(3iπ/4)
  pièges : g8_arg_quadrant

```

### Niveau 3

```
Écris z = −1 + i√3 sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].
  [tap, suivre l'erreur, menu steps]  |−1 + i√3|
    = √(1 + 3)   ← r = √(a² + b²)
    = 2   ← Calculer
  — cos θ = a/r =  [juge value]  départ : cos(θ)
    = −1/2   ← a/r
  — sin θ = b/r =  [juge value]  départ : sin(θ)
    = √3/2   ← b/r
  — Argument : θ = arg z (dans ]−π ; π]) =  [juge complex]  départ : arg(−1 + i√3)
    = 2π/3   ← 2e : θ = 2π/3
  — Forme exponentielle :  [juge complex]  départ : −1 + i√3
    = 2e^(2iπ/3)   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −1/2 et sin θ = √3/2 : θ = □ | 2e^(2iπ/3)

Écris z = −2 + 2i sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π].
  [tap, suivre l'erreur, menu steps]  |−2 + 2i|
    = √(4 + 4)   ← r = √(a² + b²)
    = 2√2   ← Calculer
  — cos θ = a/r =  [juge value]  départ : cos(θ)
    = −√2/2   ← a/r
  — sin θ = b/r =  [juge value]  départ : sin(θ)
    = √2/2   ← b/r
  — Argument : θ = arg z (dans ]−π ; π]) =  [juge complex]  départ : arg(−2 + 2i)
    = 3π/4   ← 2e : θ = 3π/4
  — Forme exponentielle :  [juge complex]  départ : −2 + 2i
    = 2√2e^(3iπ/4)   ← z = r·e^(iθ)
  aides : Calcule r = |z|, puis cos θ = a/r et sin θ = b/r : le signe de a et celui de b disent le quadrant. | cos θ = −√2/2 et sin θ = √2/2 : θ = □ | 2√2e^(3iπ/4)
  pièges : g8_modulus_no_square

Écris z = 4e^(iπ/3) sous la forme a + bi.
  [tap, suivre l'erreur, menu steps]  4e^(iπ/3)
    = 4(cos(π/3) + isin(π/3))   ← e^(iθ) = cos θ + i sin θ
    = 4(1/2 + i√3/2)   ← Valeurs exactes
    = 2 + 2i√3   ← Développer
  aides : r·e^(iθ) = r(cos θ + i sin θ) : remplace cos θ et sin θ par leurs valeurs exactes. | 4e^(iπ/3) = 4(cos(□) + isin(□)) | 2 + 2i√3

```

### Niveau 4

```
Écris sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π] : 3e^(−iπ/12)·4e^(−2iπ/3)
  [free, suivre l'erreur]  3e^(−iπ/12)·4e^(−2iπ/3)
    = (3·4)e^(i(−π/12 + (−2π/3)))   ← Multiplier les modules, additionner les arguments
    = 12e^(−3iπ/4)   ← Calculer
  aides : e^(iθ)·e^(iφ) = e^(i(θ + φ)) : on multiplie les modules et on additionne les arguments. | 3e^(−iπ/12)·4e^(−2iπ/3) = 12e^(i(□)) | 12e^(−3iπ/4)

Écris sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π] : (3e^(−2iπ/3))/(3e^(−5iπ/6))
  [free, suivre l'erreur]  (3e^(−2iπ/3))/(3e^(−5iπ/6))
    = e^(iπ/6)   ← Calculer
  aides : e^(iθ)·e^(iφ) = e^(i(θ + φ)) et e^(iθ)/e^(iφ) = e^(i(θ − φ)) : on divise les modules et on soustrait les arguments. | (3e^(−2iπ/3))/(3e^(−5iπ/6)) = e^(i(□)) | e^(iπ/6)

Écris sous forme exponentielle r·e^(iθ), avec θ dans ]−π ; π] : e^(iπ/6)·4e^(−2iπ/3)
  [free, suivre l'erreur]  e^(iπ/6)·4e^(−2iπ/3)
    = (1·4)e^(i(π/6 + (−2π/3)))   ← Multiplier les modules, additionner les arguments
    = 4e^(−iπ/2)   ← Calculer
  aides : e^(iθ)·e^(iφ) = e^(i(θ + φ)) : on multiplie les modules et on additionne les arguments. | e^(iπ/6)·4e^(−2iπ/3) = 4e^(i(□)) | 4e^(−iπ/2)

```

### Niveau 5

```
Écris z = (2 + 2i)(2√3 + 2i) sous forme exponentielle r·e^(iθ), θ dans ]−π ; π], sans aide.
  [free, sans aide]  (2 + 2i)(2√3 + 2i)
    = 2√2e^(iπ/4)·4e^(iπ/6)   ← Forme exponentielle de chaque facteur
    = 8√2e^(5iπ/12)   ← Multiplier les modules, additionner les arguments

Écris z = (−√3 − 3i)(−√2 + i√2) sous forme exponentielle r·e^(iθ), θ dans ]−π ; π], sans aide.
  [free, sans aide]  (−√3 − 3i)(−√2 + i√2)
    = 2√3e^(−2iπ/3)·2e^(3iπ/4)   ← Forme exponentielle de chaque facteur
    = 4√3e^(iπ/12)   ← Multiplier les modules, additionner les arguments

Écris z = (2 − 2i)(−2 − 2i√3) sous forme exponentielle r·e^(iθ), θ dans ]−π ; π], sans aide.
  [free, sans aide]  (2 − 2i)(−2 − 2i√3)
    = 2√2e^(−iπ/4)·4e^(−2iπ/3)   ← Forme exponentielle de chaque facteur
    = 8√2e^(−11iπ/12)   ← Multiplier les modules, additionner les arguments
  pièges : g8_arg_quadrant

```

### Variantes d'examen

```
Forme exponentielle de z = −1 − i (θ dans ]−π ; π]) :
  · 2e^(−3iπ/4)   · √2e^(3iπ/4)   ✔ √2e^(−3iπ/4)   · √2e^(iπ/4) [g8_arg_quadrant]
  [examen mcq]
  pièges : g8_arg_quadrant

Vrai ou faux ?
  « Pour tous z, w ≠ 0 : arg(z·w) = arg z + arg w (arguments dans ]−π ; π]). » → FAUX
    contre-exemple (complex) : z = -1, w = -1
  [examen tf]

Donne θ = arg z, dans ]−π ; π], pour z = −√2 − i√2.
  [free, sans aide, examen coef]  arg(−√2 − i√2)
    = −3π/4   ← 3e
  pièges : g8_arg_quadrant

```

## Puissances par la formule de Moivre (`g8-moivre`, Gymnase)

_(r·e^(iθ))ⁿ = rⁿ·e^(inθ), puis réduire l'argument._

### Niveau 1

```
Calcule (1/2 + i√3/2)⁸ et écris le résultat sous la forme a + bi. On donne 1/2 + i√3/2 = e^(iπ/3).
  [guided]  (1/2 + i√3/2)⁸
    = (e^(□))⁸   (trous : (e^(iπ/3))⁸)   ← Forme exponentielle
    = e^(□)   (trous : e^(8iπ/3))   ← (e^(iθ))ⁿ = e^(inθ)
    = e^(□)   (trous : e^(2iπ/3))   ← 8π/3 − 2π = 2π/3
    = □   (trous : −1/2 + i√3/2)   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (e^(iπ/3))⁸ = e^(8iπ/3) | −1/2 + i√3/2

Calcule (−1 + i)⁸ et écris le résultat sous la forme a + bi. On donne −1 + i = √2e^(3iπ/4).
  [guided]  (−1 + i)⁸
    = (√2e^(□))⁸   (trous : (√2e^(3iπ/4))⁸)   ← Forme exponentielle
    = (√2)⁸·e^(□)   (trous : (√2)⁸·e^(6iπ))   ← (r·e^(iθ))ⁿ = rⁿ·e^(inθ)
    = □e^(6iπ)   (trous : 16e^(6iπ))   ← Calculer rⁿ
    = □   (trous : 16)   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (√2e^(3iπ/4))⁸ = □e^(6iπ) | 16
  pièges : g8_i_squared, g8_moivre_modulus

Calcule (−√2/2 + i√2/2)¹⁰ et écris le résultat sous la forme a + bi. On donne −√2/2 + i√2/2 = e^(3iπ/4).
  [guided]  (−√2/2 + i√2/2)¹⁰
    = (e^(□))¹⁰   (trous : (e^(3iπ/4))¹⁰)   ← Forme exponentielle
    = e^(□)   (trous : e^(15iπ/2))   ← (e^(iθ))ⁿ = e^(inθ)
    = e^(□)   (trous : e^(−iπ/2))   ← 15π/2 − 8π = −π/2
    = □   (trous : −i)   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (e^(3iπ/4))¹⁰ = e^(15iπ/2) | −i

```

### Niveau 2

```
Calcule (−1 − i√3)⁹ et écris le résultat sous la forme a + bi.
  [guided]  (−1 − i√3)⁹
    = (2e^(□))⁹   (trous : (2e^(−2iπ/3))⁹)   ← Forme exponentielle
    = 2⁹e^(□)   (trous : 2⁹e^(−6iπ))   ← (r·e^(iθ))ⁿ = rⁿ·e^(inθ)
    = □e^(−6iπ)   (trous : 512e^(−6iπ))   ← Calculer rⁿ
    ? Quel multiple de 2π faut-il retirer à −6π pour arriver dans ]−π ; π] ? ✔ −6π / · −7π / · 2π
    = □   (trous : 512)   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (2e^(−2iπ/3))⁹ = □e^(−6iπ) | 512
  pièges : g8_arg_quadrant, g8_moivre_modulus

Calcule (√3/2 + i/2)⁵ et écris le résultat sous la forme a + bi.
  [guided]  (√3/2 + i/2)⁵
    = (e^(□))⁵   (trous : (e^(iπ/6))⁵)   ← Forme exponentielle
    = e^(□)   (trous : e^(5iπ/6))   ← (e^(iθ))ⁿ = e^(inθ)
    = □   (trous : −√3/2 + i/2)   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (e^(iπ/6))⁵ = e^(5iπ/6) | −√3/2 + i/2

Calcule ((1 − i)⁶)/((1 + i)⁶) et écris le résultat sous la forme a + bi.
  [guided]  ((1 − i)⁶)/((1 + i)⁶)
    = ((√2e^(□))⁶)/((√2e^(iπ/4))⁶)   (trous : ((√2e^(−iπ/4))⁶)/((√2e^(iπ/4))⁶))   ← Formes exponentielles
    = e^(□)   (trous : e^(−3iπ))   ← Moivre : modules et arguments
    = e^(□)   (trous : e^(iπ))   ← Réduire l'argument
    = □   (trous : −1)   ← Forme algébrique
  aides : Écris chaque nombre sous forme exponentielle : les modules se simplifient, les arguments se soustraient. | ((1 − i)⁶)/((1 + i)⁶) = e^(−3iπ) | −1
  pièges : g8_moivre_modulus

```

### Niveau 3

```
Soit z = √3/2 − i/2. Écris z sous forme exponentielle, puis trouve le plus petit entier n ≥ 1 tel que zⁿ soit un réel positif.
  [tap, suivre l'erreur, menu steps]  √3/2 − i/2
    = e^(−iπ/6)   ← Forme exponentielle
  — Plus petit entier n ≥ 1 tel que zⁿ soit un réel positif :  [juge value]  départ : n
    ? zⁿ = e^(inθ), avec θ = −π/6. C'est un réel positif quand : ✔ n·(−π/6) est un multiple de 2π / · n·(−π/6) est un multiple de π / · n·(−π/6) = π/2
    = 12   ← 12·(−π/6) = −2π
  aides : zⁿ = rⁿ·e^(inθ) est un réel positif quand nθ est un multiple de 2π. | θ = −π/6 : n·(−π/6) = 2kπ, donc n = □ | n = 12

Calcule (1 + i)⁷ et écris le résultat sous la forme a + bi.
  [tap, suivre l'erreur, menu steps]  (1 + i)⁷
    = (√2e^(iπ/4))⁷   ← Forme exponentielle
    = (√2)⁷·e^(7iπ/4)   ← (r·e^(iθ))ⁿ = rⁿ·e^(inθ)
    = 8√2e^(7iπ/4)   ← Calculer rⁿ
    = 8√2e^(−iπ/4)   ← 7π/4 − 2π = −π/4
    = 8 − 8i   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (√2e^(iπ/4))⁷ = □e^(7iπ/4) | 8 − 8i
  pièges : g8_i_squared, g8_moivre_modulus

Calcule ((−1 + i√3)⁷)/((−1 − i√3)⁷) et écris le résultat sous la forme a + bi.
  [tap, suivre l'erreur, menu steps]  ((−1 + i√3)⁷)/((−1 − i√3)⁷)
    = ((2e^(2iπ/3))⁷)/((2e^(−2iπ/3))⁷)   ← Formes exponentielles
    = e^(28iπ/3)   ← Moivre : modules et arguments
    = e^(−2iπ/3)   ← Réduire l'argument
    = −1/2 − i√3/2   ← Forme algébrique
  aides : Écris chaque nombre sous forme exponentielle : les modules se simplifient, les arguments se soustraient. | ((−1 + i√3)⁷)/((−1 − i√3)⁷) = e^(28iπ/3) | −1/2 − i√3/2
  pièges : g8_arg_quadrant, g8_moivre_modulus

```

### Niveau 4

```
Soit z = √3 − i. Écris z sous forme exponentielle, puis trouve le plus petit entier n ≥ 1 tel que zⁿ soit un réel positif.
  [free, suivre l'erreur]  √3 − i
    = 2e^(−iπ/6)   ← Forme exponentielle
  — Plus petit entier n ≥ 1 tel que zⁿ soit un réel positif :  [juge value]  départ : n
    = 12   ← 12·(−π/6) = −2π
  aides : zⁿ = rⁿ·e^(inθ) est un réel positif quand nθ est un multiple de 2π. | θ = −π/6 : n·(−π/6) = 2kπ, donc n = □ | n = 12

Calcule (−√3/2 + i/2)⁶ et écris le résultat sous la forme a + bi.
  [free, suivre l'erreur]  (−√3/2 + i/2)⁶
    = (e^(5iπ/6))⁶   ← Forme exponentielle
    = e^(5iπ)   ← (e^(iθ))ⁿ = e^(inθ)
    = e^(iπ)   ← 5π − 4π = π
    = −1   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (e^(5iπ/6))⁶ = e^(5iπ) | −1

Calcule (−1 + i√3)⁷ et écris le résultat sous la forme a + bi.
  [free, suivre l'erreur]  (−1 + i√3)⁷
    = (2e^(2iπ/3))⁷   ← Forme exponentielle
    = 2⁷e^(14iπ/3)   ← (r·e^(iθ))ⁿ = rⁿ·e^(inθ)
    = 128e^(14iπ/3)   ← Calculer rⁿ
    = 128e^(2iπ/3)   ← 14π/3 − 4π = 2π/3
    = −64 + 64i√3   ← Forme algébrique
  aides : Passe en forme exponentielle : la puissance élève le module et multiplie l'argument. | (2e^(2iπ/3))⁷ = □e^(14iπ/3) | −64 + 64i√3
  pièges : g8_arg_quadrant, g8_moivre_modulus

```

### Niveau 5

```
Soit z = √3/2 + i/2. Écris z sous forme exponentielle, puis trouve le plus petit entier n ≥ 1 tel que zⁿ soit un réel positif, sans aide.
  [free, sans aide]  √3/2 + i/2
    = e^(iπ/6)   ← Forme exponentielle
  — Plus petit entier n ≥ 1 tel que zⁿ soit un réel positif :  [juge value]  départ : n
    = 12   ← 12·π/6 = 2π

Calcule ((−1/2 + i√3/2)⁸)/((1/2 + i√3/2)⁷) et écris le résultat sous la forme a + bi, sans aide.
  [free, sans aide]  ((−1/2 + i√3/2)⁸)/((1/2 + i√3/2)⁷)
    = ((e^(2iπ/3))⁸)/((e^(iπ/3))⁷)   ← Formes exponentielles
    = e^(3iπ)   ← Moivre : modules et arguments
    = e^(iπ)   ← Réduire l'argument
    = −1   ← Forme algébrique

Soit z = 1 − i. Écris z sous forme exponentielle, puis trouve le plus petit entier n ≥ 1 tel que zⁿ soit un réel positif, sans aide.
  [free, sans aide]  1 − i
    = √2e^(−iπ/4)   ← Forme exponentielle
  — Plus petit entier n ≥ 1 tel que zⁿ soit un réel positif :  [juge value]  départ : n
    = 8   ← 8·(−π/4) = −2π

```

### Variantes d'examen

```
(−1 + i)⁵ =
  · −4 + 4i [g8_arg_quadrant]   · 5 − 5i [g8_moivre_modulus]   ✔ 4 − 4i   · 1 − i [g8_moivre_modulus]
  [examen mcq]
  pièges : g8_moivre_modulus, g8_arg_quadrant

Vrai ou faux ?
  « (√3 + i)⁶ est réel. » → VRAI
  [examen tf]

Donne la partie réelle de (1/2 + i√3/2)¹¹.
  → 1/2
  [examen coef]

```

## Racines n-ièmes (`g8-nth-roots`, CMS)

_zⁿ = w : n racines de module ρ^(1/n), d'arguments φ/n + 2kπ/n._

### Niveau 1

```
Résous dans ℂ : z³ = i. Donne les 3 solutions sous forme algébrique. On donne w = i = e^(iπ/2).
  [guided]  |z|
    = □   (trous : 1)   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = π/2 + 2kπ
    = θ = π/6 + □   (trous : θ = π/6 + 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 0 : z₀ =  [juge complex]  départ : e^(iπ/6)
    = cos(□) + isin(π/6)   (trous : cos(π/6) + isin(π/6))   ← r(cos θ + i sin θ)
    = □   (trous : √3/2 + i/2)   ← Forme algébrique
  — k = 1 : z₁ =  [juge complex]  départ : e^(5iπ/6)
    = cos(□) + isin(5π/6)   (trous : cos(5π/6) + isin(5π/6))   ← r(cos θ + i sin θ)
    = □   (trous : −√3/2 + i/2)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−iπ/2)
    = cos(□) + isin(−π/2)   (trous : cos(−π/2) + isin(−π/2))   ← r(cos θ + i sin θ)
    = □   (trous : −i)   ← Forme algébrique
  — Contrôle : (−i)³ =  [juge complex]  départ : (−i)³
    = □   (trous : i)   ← On retrouve w
  — Les solutions de z³ = i, sous forme algébrique :  [juge complex]  départ : z³ = i
    = {√3/2 + i/2 ; −√3/2 + i/2 ; □}   (trous : {√3/2 + i/2 ; −√3/2 + i/2 ; −i})   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = π/6 + 2kπ/□ | {√3/2 + i/2 ; −√3/2 + i/2 ; −i}

Résous dans ℂ : z³ = 1. Donne les 3 solutions sous forme algébrique.
  [guided]  |z|
    = □   (trous : 1)   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = 2kπ
    = θ = □   (trous : θ = 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 1 : z₁ =  [juge complex]  départ : e^(2iπ/3)
    = cos(□) + isin(2π/3)   (trous : cos(2π/3) + isin(2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 + i√3/2)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−2iπ/3)
    = cos(□) + isin(−2π/3)   (trous : cos(−2π/3) + isin(−2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 − i√3/2)   ← Forme algébrique
  — Les solutions de z³ = 1, sous forme algébrique :  [juge complex]  départ : z³ = 1
    = {1 ; −1/2 + i√3/2 ; □}   (trous : {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2})   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = 0 + 2kπ/□ | {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}

Résous dans ℂ : z³ = 1. Donne les 3 solutions sous forme algébrique.
  [guided]  |z|
    = □   (trous : 1)   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = 2kπ
    = θ = □   (trous : θ = 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 1 : z₁ =  [juge complex]  départ : e^(2iπ/3)
    = cos(□) + isin(2π/3)   (trous : cos(2π/3) + isin(2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 + i√3/2)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−2iπ/3)
    = cos(□) + isin(−2π/3)   (trous : cos(−2π/3) + isin(−2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 − i√3/2)   ← Forme algébrique
  — Les solutions de z³ = 1, sous forme algébrique :  [juge complex]  départ : z³ = 1
    = {1 ; −1/2 + i√3/2 ; □}   (trous : {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2})   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = 0 + 2kπ/□ | {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}

```

### Niveau 2

```
Résous dans ℂ : z³ = −27. Donne les 3 solutions sous forme algébrique.
  [guided]  −27
    = □e^(iπ)   (trous : 27e^(iπ))   ← w = ρ·e^(iφ)
  — Module des racines : |z|³ = |w| = 27, donc |z| =  [juge value]  départ : |z|
    = □   (trous : 3)   ← |z|³ = 27
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = π + 2kπ
    = θ = π/3 + □   (trous : θ = π/3 + 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 0 : z₀ =  [juge complex]  départ : 3e^(iπ/3)
    = 3(cos(□) + isin(π/3))   (trous : 3(cos(π/3) + isin(π/3)))   ← r(cos θ + i sin θ)
    = 3(□)   (trous : 3(1/2 + i√3/2))   ← Valeurs exactes
    = □   (trous : 3/2 + 3i√3/2)   ← Forme algébrique
  — k = 1 : z₁ =  [juge complex]  départ : 3e^(iπ)
    = 3(cos(□) + isin(π))   (trous : 3(cos(π) + isin(π)))   ← r(cos θ + i sin θ)
    = 3(□)   (trous : 3(−1))   ← Valeurs exactes
    = □   (trous : −3)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : 3e^(−iπ/3)
    = 3(cos(□) + isin(−π/3))   (trous : 3(cos(−π/3) + isin(−π/3)))   ← r(cos θ + i sin θ)
    = 3(□)   (trous : 3(1/2 − i√3/2))   ← Valeurs exactes
    = □   (trous : 3/2 − 3i√3/2)   ← Forme algébrique
  — Contrôle : (−3)³ =  [juge complex]  départ : (−3)³
    = □   (trous : −27)   ← On retrouve w
  — Les solutions de z³ = −27, sous forme algébrique :  [juge complex]  départ : z³ = −27
    = □   (trous : {3/2 + 3i√3/2 ; −3 ; 3/2 − 3i√3/2})   ← Les 3 racines
  aides : Il y a 3 racines, de module 3 et d'arguments espacés de 2π/3. | θ = π/3 + 2kπ/□ | {3/2 + 3i√3/2 ; −3 ; 3/2 − 3i√3/2}

Résous dans ℂ : z³ = 1. Donne les 3 solutions sous forme algébrique.
  [guided]  |z|
    = □   (trous : 1)   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = 2kπ
    = θ = □   (trous : θ = 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 1 : z₁ =  [juge complex]  départ : e^(2iπ/3)
    = cos(□) + isin(2π/3)   (trous : cos(2π/3) + isin(2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 + i√3/2)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−2iπ/3)
    = cos(□) + isin(−2π/3)   (trous : cos(−2π/3) + isin(−2π/3))   ← r(cos θ + i sin θ)
    = □   (trous : −1/2 − i√3/2)   ← Forme algébrique
  — Les solutions de z³ = 1, sous forme algébrique :  [juge complex]  départ : z³ = 1
    = □   (trous : {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2})   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = 0 + 2kπ/□ | {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}

Résous dans ℂ : z³ = i. Donne les 3 solutions sous forme algébrique.
  [guided]  i
    = □   (trous : e^(iπ/2))   ← w = ρ·e^(iφ)
  — Module des racines : |z|³ = |w| = 1, donc |z| =  [juge value]  départ : |z|
    = □   (trous : 1)   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = π/2 + 2kπ
    = θ = π/6 + □   (trous : θ = π/6 + 2kπ/3)   ← Diviser par 3, la période aussi
  — k = 0 : z₀ =  [juge complex]  départ : e^(iπ/6)
    = cos(□) + isin(π/6)   (trous : cos(π/6) + isin(π/6))   ← r(cos θ + i sin θ)
    = □   (trous : √3/2 + i/2)   ← Forme algébrique
  — k = 1 : z₁ =  [juge complex]  départ : e^(5iπ/6)
    = cos(□) + isin(5π/6)   (trous : cos(5π/6) + isin(5π/6))   ← r(cos θ + i sin θ)
    = □   (trous : −√3/2 + i/2)   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−iπ/2)
    = cos(□) + isin(−π/2)   (trous : cos(−π/2) + isin(−π/2))   ← r(cos θ + i sin θ)
    = □   (trous : −i)   ← Forme algébrique
  — Contrôle : (−i)³ =  [juge complex]  départ : (−i)³
    = □   (trous : i)   ← On retrouve w
  — Les solutions de z³ = i, sous forme algébrique :  [juge complex]  départ : z³ = i
    = □   (trous : {√3/2 + i/2 ; −√3/2 + i/2 ; −i})   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = π/6 + 2kπ/□ | {√3/2 + i/2 ; −√3/2 + i/2 ; −i}

```

### Niveau 3

```
Résous dans ℂ : z⁴ = −16. Donne les 4 solutions sous forme algébrique.
  [tap, suivre l'erreur, menu steps]  −16
    = 16e^(iπ)   ← w = ρ·e^(iφ)
  — Module des racines : |z|⁴ = |w| = 16, donc |z| =  [juge value]  départ : |z|
    = 2   ← |z|⁴ = 16
  — Arguments : z = |z|·e^(iθ), et 4θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 4θ = π + 2kπ
    = θ = π/4 + kπ/2   ← Diviser par 4, la période aussi
  — k = 0 : z₀ =  [juge complex]  départ : 2e^(iπ/4)
    = 2(cos(π/4) + isin(π/4))   ← r(cos θ + i sin θ)
    = 2(√2/2 + i√2/2)   ← Valeurs exactes
    = √2 + i√2   ← Forme algébrique
  — k = 1 : z₁ =  [juge complex]  départ : 2e^(3iπ/4)
    = 2(cos(3π/4) + isin(3π/4))   ← r(cos θ + i sin θ)
    = 2(−√2/2 + i√2/2)   ← Valeurs exactes
    = −√2 + i√2   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : 2e^(−3iπ/4)
    = 2(cos(−3π/4) + isin(−3π/4))   ← r(cos θ + i sin θ)
    = 2(−√2/2 − i√2/2)   ← Valeurs exactes
    = −√2 − i√2   ← Forme algébrique
  — k = 3 : z₃ =  [juge complex]  départ : 2e^(−iπ/4)
    = 2(cos(−π/4) + isin(−π/4))   ← r(cos θ + i sin θ)
    = 2(√2/2 − i√2/2)   ← Valeurs exactes
    = √2 − i√2   ← Forme algébrique
  — Les solutions de z⁴ = −16, sous forme algébrique :  [juge complex]  départ : z⁴ = −16
    = {√2 + i√2 ; −√2 + i√2 ; −√2 − i√2 ; √2 − i√2}   ← Les 4 racines
  aides : Il y a 4 racines, de module 2 et d'arguments espacés de 2π/4. | θ = π/4 + 2kπ/□ | {√2 + i√2 ; −√2 + i√2 ; −√2 − i√2 ; √2 − i√2}

Résous dans ℂ : z³ = 1. Donne les 3 solutions sous forme algébrique.
  [tap, suivre l'erreur, menu steps]  |z|
    = 1   ← |z|³ = 1
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = 2kπ
    = θ = 2kπ/3   ← Diviser par 3, la période aussi
  — k = 1 : z₁ =  [juge complex]  départ : e^(2iπ/3)
    = cos(2π/3) + isin(2π/3)   ← r(cos θ + i sin θ)
    = −1/2 + i√3/2   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : e^(−2iπ/3)
    = cos(−2π/3) + isin(−2π/3)   ← r(cos θ + i sin θ)
    = −1/2 − i√3/2   ← Forme algébrique
  — Les solutions de z³ = 1, sous forme algébrique :  [juge complex]  départ : z³ = 1
    = {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}   ← Les 3 racines
  aides : Il y a 3 racines, de module 1 et d'arguments espacés de 2π/3. | θ = 0 + 2kπ/□ | {1 ; −1/2 + i√3/2 ; −1/2 − i√3/2}

Résous dans ℂ : z³ = −8. Donne les 3 solutions sous forme algébrique.
  [tap, suivre l'erreur, menu steps]  −8
    = 8e^(iπ)   ← w = ρ·e^(iφ)
  — Module des racines : |z|³ = |w| = 8, donc |z| =  [juge value]  départ : |z|
    = 2   ← |z|³ = 8
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = π + 2kπ
    = θ = π/3 + 2kπ/3   ← Diviser par 3, la période aussi
  — k = 0 : z₀ =  [juge complex]  départ : 2e^(iπ/3)
    = 2(cos(π/3) + isin(π/3))   ← r(cos θ + i sin θ)
    = 2(1/2 + i√3/2)   ← Valeurs exactes
    = 1 + i√3   ← Forme algébrique
  — k = 1 : z₁ =  [juge complex]  départ : 2e^(iπ)
    = 2(cos(π) + isin(π))   ← r(cos θ + i sin θ)
    = 2(−1)   ← Valeurs exactes
    = −2   ← Forme algébrique
  — k = 2 : z₂ =  [juge complex]  départ : 2e^(−iπ/3)
    = 2(cos(−π/3) + isin(−π/3))   ← r(cos θ + i sin θ)
    = 2(1/2 − i√3/2)   ← Valeurs exactes
    = 1 − i√3   ← Forme algébrique
  — Contrôle : (−2)³ =  [juge complex]  départ : (−2)³
    = −8   ← On retrouve w
  — Les solutions de z³ = −8, sous forme algébrique :  [juge complex]  départ : z³ = −8
    = {1 + i√3 ; −2 ; 1 − i√3}   ← Les 3 racines
  aides : Il y a 3 racines, de module 2 et d'arguments espacés de 2π/3. | θ = π/3 + 2kπ/□ | {1 + i√3 ; −2 ; 1 − i√3}

```

### Niveau 4

```
Résous dans ℂ : (z − 2i)⁶ = −1. Pose u = z − 2i. Donne les 6 solutions sous forme algébrique.
  [free, suivre l'erreur]  −1
    = e^(iπ)   ← w = ρ·e^(iφ)
  — Module des racines : |u|⁶ = |w| = 1, donc |u| =  [juge value]  départ : |u|
    = 1   ← |u|⁶ = 1
  — Arguments : u = |u|·e^(iθ), et 6θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 6θ = π + 2kπ
    = θ = π/6 + kπ/3   ← Diviser par 6, la période aussi
  — Les solutions de (z − 2i)⁶ = −1, sous forme algébrique :  [juge complex]  départ : (z − 2i)⁶ = −1
    = {√3/2 + 5i/2 ; 3i ; −√3/2 + 5i/2 ; −√3/2 + 3i/2 ; i ; √3/2 + 3i/2}   ← Les 6 racines
  aides : Il y a 6 racines, de module 1 et d'arguments espacés de 2π/6. | θ = π/6 + 2kπ/□ | {√3/2 + 5i/2 ; 3i ; −√3/2 + 5i/2 ; −√3/2 + 3i/2 ; i ; √3/2 + 3i/2}

Résous dans ℂ : z² = 9/2 + 9i√3/2. Donne les 2 solutions sous forme algébrique.
  [free, suivre l'erreur]  9/2 + 9i√3/2
    = 9e^(iπ/3)   ← w = ρ·e^(iφ)
  — Module des racines : |z|² = |w| = 9, donc |z| =  [juge value]  départ : |z|
    = 3   ← |z|² = 9
  — Arguments : z = |z|·e^(iθ), et 2θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 2θ = π/3 + 2kπ
    = θ = π/6 + kπ   ← Diviser par 2, la période aussi
  — Les solutions, sous forme algébrique :  [juge complex]  départ : {3e^(iπ/6) ; 3e^(−5iπ/6)}
    = {3√3/2 + 3i/2 ; −3√3/2 − 3i/2}   ← Les 2 racines
  aides : Il y a 2 racines, de module 3 et d'arguments espacés de 2π/2. | θ = π/6 + 2kπ/□ | {3√3/2 + 3i/2 ; −3√3/2 − 3i/2}

Résous dans ℂ : z³ = 8i. Donne les 3 solutions sous forme algébrique.
  [free, suivre l'erreur]  8i
    = 8e^(iπ/2)   ← w = ρ·e^(iφ)
  — Module des racines : |z|³ = |w| = 8, donc |z| =  [juge value]  départ : |z|
    = 2   ← |z|³ = 8
  — Arguments : z = |z|·e^(iθ), et 3θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 3θ = π/2 + 2kπ
    = θ = π/6 + 2kπ/3   ← Diviser par 3, la période aussi
  — Les solutions de z³ = 8i, sous forme algébrique :  [juge complex]  départ : z³ = 8i
    = {√3 + i ; −√3 + i ; −2i}   ← Les 3 racines
  aides : Il y a 3 racines, de module 2 et d'arguments espacés de 2π/3. | θ = π/6 + 2kπ/□ | {√3 + i ; −√3 + i ; −2i}

```

### Niveau 5

```
Résous dans ℂ : z⁴ = −1/2 + i√3/2. Donne les 4 solutions sous forme algébrique, sans aide.
  [free, sans aide]  −1/2 + i√3/2
    = e^(2iπ/3)   ← w = ρ·e^(iφ)
  — Module des racines : |z|⁴ = |w| = 1, donc |z| =  [juge value]  départ : |z|
    = 1   ← |z|⁴ = 1
  — Arguments : z = |z|·e^(iθ), et 4θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 4θ = 2π/3 + 2kπ
    = θ = π/6 + kπ/2   ← Diviser par 4, la période aussi
  — Les solutions, sous forme algébrique :  [juge complex]  départ : {e^(iπ/6) ; e^(2iπ/3) ; e^(−5iπ/6) ; e^(−iπ/3)}
    = {√3/2 + i/2 ; −1/2 + i√3/2 ; −√3/2 − i/2 ; 1/2 − i√3/2}   ← Les 4 racines
  pièges : g8_arg_quadrant

Résous dans ℂ : z² = 9i. Donne les 2 solutions sous forme algébrique, sans aide.
  [free, sans aide]  9i
    = 9e^(iπ/2)   ← w = ρ·e^(iφ)
  — Module des racines : |z|² = |w| = 9, donc |z| =  [juge value]  départ : |z|
    = 3   ← |z|² = 9
  — Arguments : z = |z|·e^(iθ), et 2θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 2θ = π/2 + 2kπ
    = θ = π/4 + kπ   ← Diviser par 2, la période aussi
  — Les solutions de z² = 9i, sous forme algébrique :  [juge complex]  départ : z² = 9i
    = {3√2/2 + 3i√2/2 ; −3√2/2 − 3i√2/2}   ← Les 2 racines

Résous dans ℂ : (z − 1)² = −9/2 + 9i√3/2. Pose u = z − 1. Donne les 2 solutions sous forme algébrique, sans aide.
  [free, sans aide]  −9/2 + 9i√3/2
    = 9e^(2iπ/3)   ← w = ρ·e^(iφ)
  — Module des racines : |u|² = |w| = 9, donc |u| =  [juge value]  départ : |u|
    = 3   ← |u|² = 9
  — Arguments : u = |u|·e^(iθ), et 2θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 2θ = 2π/3 + 2kπ
    = θ = π/3 + kπ   ← Diviser par 2, la période aussi
  — Les solutions z = 1 + u, sous forme algébrique :  [juge complex]  départ : {1 + 3e^(iπ/3) ; 1 + 3e^(−2iπ/3)}
    = {5/2 + 3i√3/2 ; −1/2 − 3i√3/2}   ← Les 2 racines
  pièges : g8_arg_quadrant

```

### Variantes d'examen

```
Les solutions dans ℂ de z³ = 8i sont :
  · {√3 + i} [g8_roots_only_one]   · {√3 + i ; 2i ; −√3 + i} [g8_roots_spacing]   · {4√3 + 4i ; −4√3 + 4i ; −8i}   ✔ {√3 + i ; −√3 + i ; −2i}
  [examen mcq]
  pièges : g8_roots_only_one, g8_roots_spacing

Vrai ou faux ?
  « Pour tout z ∈ ℂ : si z⁴ = 16, alors z = 2 ou z = −2. » → FAUX
    contre-exemple (complex) : z = 2i
  [examen tf]
  pièges : g8_roots_only_one

Résous dans ℂ : (z − 1 − 2i)² = −1. Pose u = z − 1 − 2i. Donne les 2 solutions sous forme algébrique, sans aide.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Module des racines : |u|² = |w| = 1, donc |u| = : 1 ; Arguments : u = |u|·e^(iθ), et 2θ = φ + 2kπ. Résous en θ : 1 ; Les solutions de (z − 1 − 2i)² = −1, sous forme algébrique : 1)
    [free, sans aide, suivre l'erreur, examen open]  −1
      = e^(iπ)   ← w = ρ·e^(iφ)
    — Module des racines : |u|² = |w| = 1, donc |u| =  [juge value]  départ : |u|
      = 1   ← |u|² = 1
    — Arguments : u = |u|·e^(iθ), et 2θ = φ + 2kπ. Résous en θ :  [juge solset]  départ : 2θ = π + 2kπ
      = θ = π/2 + kπ   ← Diviser par 2, la période aussi
    — Les solutions de (z − 1 − 2i)² = −1, sous forme algébrique :  [juge complex]  départ : (z − 1 − 2i)² = −1
      = {1 + 3i ; 1 + i}   ← Les 2 racines

```

## Racine carrée sous forme algébrique (`g8-sqrt-alg`, CMS)

_z = x + iy avec z² = w : x² − y² = a, 2xy = b, x² + y² = |w|._

### Niveau 1

```
Résous dans ℂ : z² = 11 + 60i, sous forme algébrique, avec z = x + iy. On a x² − y² = 11 et 2xy = 60.
  [guided]  |11 + 60i|
    = √(121 + □)   (trous : √(121 + 3600))   ← |a + bi| = √(a² + b²)
    = □   (trous : 61)   ← Calculer
  — x² = (|w| + a)/2 = (61 + 11)/2 :  [juge value]  départ : x²
    = □   (trous : 36)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 25)   ← Soustraire les équations
  — Les racines carrées de 11 + 60i :  [juge complex]  départ : z² = 11 + 60i
    = {6 + 5i ; □}   (trous : {6 + 5i ; −6 − 5i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (61 + 11)/2 = □ | {6 + 5i ; −6 − 5i}
  pièges : g8_modulus_no_square

Résous dans ℂ : z² = 32i, sous forme algébrique, avec z = x + iy. On a x² − y² = 0 et 2xy = 32.
  [guided]  |32i|
    = □   (trous : 32)   ← |bi| = |b|
  — x² = (|w| + a)/2 = (32 + 0)/2 :  [juge value]  départ : x²
    = □   (trous : 16)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 16)   ← Soustraire les équations
  — Les racines carrées de 32i :  [juge complex]  départ : z² = 32i
    = {4 + 4i ; □}   (trous : {4 + 4i ; −4 − 4i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (32 + 0)/2 = □ | {4 + 4i ; −4 − 4i}

Trouve les racines carrées de −72i, sous forme algébrique, avec z = x + iy. On a x² − y² = 0 et 2xy = −72.
  [guided]  |−72i|
    = □   (trous : 72)   ← |bi| = |b|
  — x² = (|w| + a)/2 = (72 + 0)/2 :  [juge value]  départ : x²
    = □   (trous : 36)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 36)   ← Soustraire les équations
  — Les racines carrées de −72i :  [juge complex]  départ : z² = −72i
    = {6 − 6i ; □}   (trous : {6 − 6i ; −6 + 6i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (72 + 0)/2 = □ | {6 − 6i ; −6 + 6i}

```

### Niveau 2

```
Trouve les racines carrées de −35 − 12i, sous forme algébrique, avec z = x + iy.
  [guided]  (x + iy)²
    = x² − □ + 2xyi   (trous : x² − y² + 2xyi)   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −35 − 12i : x² − y² = −35 et 2xy = −12. Module : x² + y² = |−35 − 12i| =  [juge complex]  départ : |−35 − 12i|
    = √(1225 + □)   (trous : √(1225 + 144))   ← |a + bi| = √(a² + b²)
    = □   (trous : 37)   ← Calculer
  — x² = (|w| + a)/2 = (37 − 35)/2 :  [juge value]  départ : x²
    = □   (trous : 1)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 36)   ← Soustraire les équations
  — Les racines carrées de −35 − 12i :  [juge complex]  départ : z² = −35 − 12i
    ? 2xy = −12 < 0. Les racines sont : ✔ x et y de signes contraires : ±(1 − 6i) / · les quatre : ±1 ± 6i / · ±(1 + 6i)
    = {1 − 6i ; □}   (trous : {1 − 6i ; −1 + 6i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (37 − 35)/2 = □ | {1 − 6i ; −1 + 6i}
  pièges : g8_sqrt_signs

Trouve les racines carrées de −9 − 40i, sous forme algébrique, avec z = x + iy.
  [guided]  (x + iy)²
    = x² − □ + 2xyi   (trous : x² − y² + 2xyi)   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −9 − 40i : x² − y² = −9 et 2xy = −40. Module : x² + y² = |−9 − 40i| =  [juge complex]  départ : |−9 − 40i|
    = √(81 + □)   (trous : √(81 + 1600))   ← |a + bi| = √(a² + b²)
    = □   (trous : 41)   ← Calculer
  — x² = (|w| + a)/2 = (41 − 9)/2 :  [juge value]  départ : x²
    = □   (trous : 16)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 25)   ← Soustraire les équations
  — Les racines carrées de −9 − 40i :  [juge complex]  départ : z² = −9 − 40i
    ? 2xy = −40 < 0. Les racines sont : ✔ x et y de signes contraires : ±(4 − 5i) / · les quatre : ±4 ± 5i / · ±(4 + 5i)
    = {4 − 5i ; □}   (trous : {4 − 5i ; −4 + 5i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (41 − 9)/2 = □ | {4 − 5i ; −4 + 5i}
  pièges : g8_sqrt_signs

Trouve les racines carrées de −11 − 60i, sous forme algébrique, avec z = x + iy.
  [guided]  (x + iy)²
    = x² − □ + 2xyi   (trous : x² − y² + 2xyi)   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −11 − 60i : x² − y² = −11 et 2xy = −60. Module : x² + y² = |−11 − 60i| =  [juge complex]  départ : |−11 − 60i|
    = √(121 + □)   (trous : √(121 + 3600))   ← |a + bi| = √(a² + b²)
    = □   (trous : 61)   ← Calculer
  — x² = (|w| + a)/2 = (61 − 11)/2 :  [juge value]  départ : x²
    = □   (trous : 25)   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = □   (trous : 36)   ← Soustraire les équations
  — Les racines carrées de −11 − 60i :  [juge complex]  départ : z² = −11 − 60i
    ? 2xy = −60 < 0. Les racines sont : ✔ x et y de signes contraires : ±(5 − 6i) / · les quatre : ±5 ± 6i / · ±(5 + 6i)
    = {5 − 6i ; □}   (trous : {5 − 6i ; −5 + 6i})   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (61 − 11)/2 = □ | {5 − 6i ; −5 + 6i}
  pièges : g8_sqrt_signs

```

### Niveau 3

```
Résous dans ℂ : z² = 12 − 16i, sous forme algébrique, avec z = x + iy.
  [tap, suivre l'erreur, menu steps]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec 12 − 16i : x² − y² = 12 et 2xy = −16. Module : x² + y² = |12 − 16i| =  [juge complex]  départ : |12 − 16i|
    = √(144 + 256)   ← |a + bi| = √(a² + b²)
    = 20   ← Calculer
  — x² = (|w| + a)/2 = (20 + 12)/2 :  [juge value]  départ : x²
    = 16   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 4   ← Soustraire les équations
  — Les racines carrées de 12 − 16i :  [juge complex]  départ : z² = 12 − 16i
    ? 2xy = −16 < 0. Les racines sont : ✔ x et y de signes contraires : ±(4 − 2i) / · les quatre : ±4 ± 2i / · ±(4 + 2i)
    = {4 − 2i ; −4 + 2i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (20 + 12)/2 = □ | {4 − 2i ; −4 + 2i}
  pièges : g8_sqrt_signs

Trouve les racines carrées de 72i, sous forme algébrique, avec z = x + iy.
  [tap, suivre l'erreur, menu steps]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec 72i : x² − y² = 0 et 2xy = 72. Module : x² + y² = |72i| =  [juge complex]  départ : |72i|
    = 72   ← |bi| = |b|
  — x² = (|w| + a)/2 = (72 + 0)/2 :  [juge value]  départ : x²
    = 36   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 36   ← Soustraire les équations
  — Les racines carrées de 72i :  [juge complex]  départ : z² = 72i
    ? 2xy = 72 > 0. Les racines sont : ✔ x et y de même signe : ±(6 + 6i) / · les quatre : ±6 ± 6i / · ±(6 − 6i)
    = {6 + 6i ; −6 − 6i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (72 + 0)/2 = □ | {6 + 6i ; −6 − 6i}
  pièges : g8_sqrt_signs

Résous dans ℂ : z² = −15 + 8i, sous forme algébrique, avec z = x + iy.
  [tap, suivre l'erreur, menu steps]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −15 + 8i : x² − y² = −15 et 2xy = 8. Module : x² + y² = |−15 + 8i| =  [juge complex]  départ : |−15 + 8i|
    = √(225 + 64)   ← |a + bi| = √(a² + b²)
    = 17   ← Calculer
  — x² = (|w| + a)/2 = (17 − 15)/2 :  [juge value]  départ : x²
    = 1   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 16   ← Soustraire les équations
  — Les racines carrées de −15 + 8i :  [juge complex]  départ : z² = −15 + 8i
    ? 2xy = 8 > 0. Les racines sont : ✔ x et y de même signe : ±(1 + 4i) / · les quatre : ±1 ± 4i / · ±(1 − 4i)
    = {1 + 4i ; −1 − 4i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (17 − 15)/2 = □ | {1 + 4i ; −1 − 4i}
  pièges : g8_sqrt_signs

```

### Niveau 4

```
Trouve les racines carrées de −27 + 36i, sous forme algébrique, avec z = x + iy.
  [free, suivre l'erreur]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −27 + 36i : x² − y² = −27 et 2xy = 36. Module : x² + y² = |−27 + 36i| =  [juge complex]  départ : |−27 + 36i|
    = √(729 + 1296)   ← |a + bi| = √(a² + b²)
    = 45   ← Calculer
  — x² =  [juge value]  départ : x²
    = 9   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 36   ← Soustraire les équations
  — Les racines carrées de −27 + 36i :  [juge complex]  départ : z² = −27 + 36i
    = {3 + 6i ; −3 − 6i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (45 − 27)/2 = □ | {3 + 6i ; −3 − 6i}

Résous dans ℂ : z² = −3 − 4i, sous forme algébrique, avec z = x + iy.
  [free, suivre l'erreur]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −3 − 4i : x² − y² = −3 et 2xy = −4. Module : x² + y² = |−3 − 4i| =  [juge complex]  départ : |−3 − 4i|
    = √(9 + 16)   ← |a + bi| = √(a² + b²)
    = 5   ← Calculer
  — x² =  [juge value]  départ : x²
    = 1   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 4   ← Soustraire les équations
  — Les racines carrées de −3 − 4i :  [juge complex]  départ : z² = −3 − 4i
    = {1 − 2i ; −1 + 2i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (5 − 3)/2 = □ | {1 − 2i ; −1 + 2i}

Trouve les racines carrées de −32i, sous forme algébrique, avec z = x + iy.
  [free, suivre l'erreur]  (x + iy)²
    = x² − y² + 2xyi   ← (x + iy)² = x² + 2ixy + i²y²
  — On identifie avec −32i : x² − y² = 0 et 2xy = −32. Module : x² + y² = |−32i| =  [juge complex]  départ : |−32i|
    = 32   ← |bi| = |b|
  — x² =  [juge value]  départ : x²
    = 16   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 16   ← Soustraire les équations
  — Les racines carrées de −32i :  [juge complex]  départ : z² = −32i
    = {4 − 4i ; −4 + 4i}   ← Deux racines opposées
  aides : Ajoute l'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y². | x² = (32 + 0)/2 = □ | {4 − 4i ; −4 + 4i}

```

### Niveau 5

```
Résous dans ℂ : z² − 4z + 4 − 2i = 0. Calcule Δ, puis une racine carrée δ de Δ avec δ = x + iy, puis les solutions, sans aide.
  [free, sans aide]  (−4)² − 4(4 − 2i)
    = 16 − 16 + 8i   ← b² et 4ac
    = 8i   ← Regrouper
  — Module : x² + y² = |8i| =  [juge complex]  départ : |8i|
    = 8   ← |bi| = |b|
  — x² =  [juge value]  départ : x²
    = 4   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 4   ← Soustraire les équations
  — Les racines carrées de 8i :  [juge complex]  départ : δ² = 8i
    = {2 + 2i ; −2 − 2i}   ← Deux racines opposées
  — Les solutions, sous forme algébrique :  [juge complex]  départ : z² − 4z + 4 − 2i = 0
    = {3 + i ; 1 − i}   ← z = (−b ± δ)/(2a), simplifié

Résous dans ℂ : z² + (5 − i)z + 12 = 0. Calcule Δ, puis une racine carrée δ de Δ avec δ = x + iy, puis les solutions, sans aide.
  [free, sans aide]  (5 − i)² − 4·12
    = 24 − 10i − 48   ← b² et 4ac
    = −24 − 10i   ← Regrouper
  — Module : x² + y² = |−24 − 10i| =  [juge complex]  départ : |−24 − 10i|
    = √(576 + 100)   ← |a + bi| = √(a² + b²)
    = 26   ← Calculer
  — x² =  [juge value]  départ : x²
    = 1   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 25   ← Soustraire les équations
  — Les racines carrées de −24 − 10i :  [juge complex]  départ : δ² = −24 − 10i
    = {1 − 5i ; −1 + 5i}   ← Deux racines opposées
  — Les solutions, sous forme algébrique :  [juge complex]  départ : z² + (5 − i)z + 12 = 0
    = {−2 − 2i ; −3 + 3i}   ← z = (−b ± δ)/(2a), simplifié
  pièges : g8_i_squared, g8_moivre_modulus

Résous dans ℂ : iz² + (1 + i)z + 2 + 2i = 0. Calcule Δ, puis une racine carrée δ de Δ avec δ = x + iy, puis les solutions, sans aide.
  [free, sans aide]  (1 + i)² − 4(i)(2 + 2i)
    = 2i + 8 − 8i   ← b² et 4ac
    = 8 − 6i   ← Regrouper
  — Module : x² + y² = |8 − 6i| =  [juge complex]  départ : |8 − 6i|
    = √(64 + 36)   ← |a + bi| = √(a² + b²)
    = 10   ← Calculer
  — x² =  [juge value]  départ : x²
    = 9   ← Additionner les équations
  — y² =  [juge value]  départ : y²
    = 1   ← Soustraire les équations
  — Les racines carrées de 8 − 6i :  [juge complex]  départ : δ² = 8 − 6i
    = {3 − i ; −3 + i}   ← Deux racines opposées
  — Les solutions, sous forme algébrique :  [juge complex]  départ : iz² + (1 + i)z + 2 + 2i = 0
    = {−1 − i ; 2i}   ← z = (−b ± δ)/(2a), simplifié
  pièges : g8_i_squared, g8_moivre_modulus

```

### Variantes d'examen

```
Les racines carrées de −3 + 4i sont :
  ✔ {1 + 2i ; −1 − 2i}   · {2 + i ; −2 − i}   · {1 + 2i ; −1 − 2i ; 1 − 2i ; −1 + 2i} [g8_sqrt_signs]   · {1 − 2i ; −1 + 2i} [g8_sqrt_signs]
  [examen mcq]
  pièges : g8_sqrt_signs

Vrai ou faux ?
  « Pour tout w ∈ ℂ : si δ² = w, alors |δ|² = |w|. » → VRAI
  [examen tf]

```

## Équation du 2e degré à coefficients complexes (`g8-quadratic`, CMS)

_Δ = b² − 4ac, δ avec δ² = Δ, puis z = (−b ± δ)/(2a)._

### Niveau 1

```
Résous dans ℂ : z² + (−2 + i)z + 2 + 2i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−2 + i)² − 4(2 + 2i)
    = 3 − 4i − 8 − □   (trous : 3 − 4i − 8 − 8i)   ← b² et 4ac
    = □   (trous : −5 − 12i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −5 − 12i
    (δ = x + iy avec δ² = Δ : x² − y² = −5, 2xy = −12, x² + y² = |Δ| = 13.)
    = {2 − 3i ; □}   (trous : {2 − 3i ; −2 + 3i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((2 − i) + (2 − 3i))/2
    = (□)/2   (trous : (4 − 4i)/2)   ← −b + δ
    = □   (trous : 2 − 2i)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((2 − i) − (2 − 3i))/2
    = □   (trous : i)   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : (2 − 2i) + i
    = □   (trous : 2 − i)   ← −b/a = 2 − i
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((2 − i) + (□))/2 ou avec − | {2 − 2i ; i}
  pièges : g8_i_squared, g8_moivre_modulus

Résous dans ℂ : z² − (1 + 3i)z − 6 + 9i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−1 − 3i)² − 4(−6 + 9i)
    = −8 + 6i + 24 − □   (trous : −8 + 6i + 24 − 36i)   ← b² et 4ac
    = □   (trous : 16 − 30i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = 16 − 30i
    (δ = x + iy avec δ² = Δ : x² − y² = 16, 2xy = −30, x² + y² = |Δ| = 34.)
    = {5 − 3i ; □}   (trous : {5 − 3i ; −5 + 3i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((1 + 3i) + (5 − 3i))/2
    = □/2   (trous : 6/2)   ← −b + δ
    = □   (trous : 3)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((1 + 3i) − (5 − 3i))/2
    = (□)/2   (trous : (−4 + 6i)/2)   ← −b − δ
    = □   (trous : −2 + 3i)   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : 3 + (−2 + 3i)
    = □   (trous : 1 + 3i)   ← −b/a = 1 + 3i
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((1 + 3i) + (□))/2 ou avec − | {3 ; −2 + 3i}
  pièges : g8_i_squared, g8_moivre_modulus

Résous dans ℂ : z² − 3z + 9 + 9i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−3)² − 4(9 + 9i)
    = 9 − 36 − □   (trous : 9 − 36 − 36i)   ← b² et 4ac
    = □   (trous : −27 − 36i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −27 − 36i
    (δ = x + iy avec δ² = Δ : x² − y² = −27, 2xy = −36, x² + y² = |Δ| = 45.)
    = {3 − 6i ; □}   (trous : {3 − 6i ; −3 + 6i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : (3 + (3 − 6i))/2
    = (□)/2   (trous : (6 − 6i)/2)   ← −b + δ
    = □   (trous : 3 − 3i)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : (3 − (3 − 6i))/2
    = □   (trous : 3i)   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : (3 − 3i) + 3i
    = □   (trous : 3)   ← −b/a = 3
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = (3 + (□))/2 ou avec − | {3 − 3i ; 3i}

```

### Niveau 2

```
Résous dans ℂ : iz² + (−5 + 3i)z − 7 − 4i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−5 + 3i)² − 4(i)(−7 − 4i)
    ? a = i : comment commencer ? ✔ Formule directe avec a, b, c / ✔ Diviser d'abord l'équation par a
    = 16 − 30i − 16 + □   (trous : 16 − 30i − 16 + 28i)   ← b² et 4ac
    = □   (trous : −2i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −2i
    (δ = x + iy avec δ² = Δ : x² − y² = 0, 2xy = −2, x² + y² = |Δ| = 2.)
    ? Comment trouver δ, une racine carrée de Δ = −2i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(2i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {1 − i ; □}   (trous : {1 − i ; −1 + i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((5 − 3i) + (1 − i))/(2i)
    = (□)/(2i)   (trous : (6 − 4i)/(2i))   ← −b + δ
    = □   (trous : (−8 − 12i)/4)   ← Conjugué du dénominateur
    = □   (trous : −2 − 3i)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((5 − 3i) − (1 − i))/(2i)
    = (□)/(2i)   (trous : (4 − 2i)/(2i))   ← −b − δ
    = □   (trous : (−4 − 8i)/4)   ← Conjugué du dénominateur
    = □   (trous : −1 − 2i)   ← Simplifier
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((5 − 3i) + (□))/(2i) ou avec − | {−2 − 3i ; −1 − 2i}
  pièges : g8_i_squared, g8_moivre_modulus, g8_sqrt_symbol_complex

Résous dans ℂ : z² + (−2 + i)z − 2i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−2 + i)² − 4(−2i)
    = 3 − 4i + □   (trous : 3 − 4i + 8i)   ← b² et 4ac
    = □   (trous : 3 + 4i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = 3 + 4i
    (δ = x + iy avec δ² = Δ : x² − y² = 3, 2xy = 4, x² + y² = |Δ| = 5.)
    ? Comment trouver δ, une racine carrée de Δ = 3 + 4i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(−3 − 4i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {2 + i ; □}   (trous : {2 + i ; −2 − i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((2 − i) + (2 + i))/2
    = □/2   (trous : 4/2)   ← −b + δ
    = □   (trous : 2)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((2 − i) − (2 + i))/2
    = □   (trous : −i)   ← Simplifier
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((2 − i) + (□))/2 ou avec − | {2 ; −i}
  pièges : g8_i_squared, g8_moivre_modulus, g8_sqrt_symbol_complex

Résous dans ℂ : iz² − 2iz − 4 − 2i = 0. Commence par Δ = b² − 4ac.
  [guided]  (−2i)² − 4(i)(−4 − 2i)
    ? a = i : comment commencer ? ✔ Formule directe avec a, b, c / ✔ Diviser d'abord l'équation par a
    = −4 − 8 + □   (trous : −4 − 8 + 16i)   ← b² et 4ac
    = □   (trous : −12 + 16i)   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −12 + 16i
    (δ = x + iy avec δ² = Δ : x² − y² = −12, 2xy = 16, x² + y² = |Δ| = 20.)
    ? Comment trouver δ, une racine carrée de Δ = −12 + 16i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(12 − 16i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {2 + 4i ; □}   (trous : {2 + 4i ; −2 − 4i})   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((2i) + (2 + 4i))/(2i)
    = (□)/(2i)   (trous : (2 + 6i)/(2i))   ← −b + δ
    = □   (trous : (12 − 4i)/4)   ← Conjugué du dénominateur
    = □   (trous : 3 − i)   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((2i) − (2 + 4i))/(2i)
    = (□)/(2i)   (trous : (−2 − 2i)/(2i))   ← −b − δ
    = □   (trous : (−4 + 4i)/4)   ← Conjugué du dénominateur
    = □   (trous : −1 + i)   ← Simplifier
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((2i) + (□))/(2i) ou avec − | {3 − i ; −1 + i}
  pièges : g8_i_squared, g8_moivre_modulus, g8_sqrt_symbol_complex

```

### Niveau 3

```
Résous dans ℂ : iz² + iz − 3 − i = 0. Commence par Δ = b² − 4ac.
  [tap, suivre l'erreur, menu steps]  (i)² − 4(i)(−3 − i)
    = −1 − 4 + 12i   ← b² et 4ac
    = −5 + 12i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −5 + 12i
    ? Comment trouver δ, une racine carrée de Δ = −5 + 12i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(5 − 12i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {2 + 3i ; −2 − 3i}   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((−i) + (2 + 3i))/(2i)
    = (2 + 2i)/(2i)   ← −b + δ
    = (4 − 4i)/4   ← Conjugué du dénominateur
    = 1 − i   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((−i) − (2 + 3i))/(2i)
    = (−2 − 4i)/(2i)   ← −b − δ
    = (−8 + 4i)/4   ← Conjugué du dénominateur
    = −2 + i   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : (1 − i) + (−2 + i)
    = −1   ← −b/a = −1
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((−i) + (□))/(2i) ou avec − | {1 − i ; −2 + i}
  pièges : g8_i_squared, g8_sqrt_symbol_complex

Résous dans ℂ : 2z² − (8 + 6i)z + 6 + 6i = 0. Commence par Δ = b² − 4ac.
  [tap, suivre l'erreur, menu steps]  (−8 − 6i)² − 4·2(6 + 6i)
    = 28 + 96i − 48 − 48i   ← b² et 4ac
    = −20 + 48i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −20 + 48i
    ? Comment trouver δ, une racine carrée de Δ = −20 + 48i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(20 − 48i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {4 + 6i ; −4 − 6i}   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((8 + 6i) + (4 + 6i))/4
    = (12 + 12i)/4   ← −b + δ
    = 3 + 3i   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((8 + 6i) − (4 + 6i))/4
    = 1   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : (3 + 3i) + 1
    = 4 + 3i   ← −b/a = 4 + 3i
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((8 + 6i) + (□))/4 ou avec − | {3 + 3i ; 1}
  pièges : g8_i_squared, g8_moivre_modulus, g8_sqrt_symbol_complex

Résous dans ℂ : (1 − i)z² + (7 − i)z + 8 + 4i = 0. Commence par Δ = b² − 4ac.
  [tap, suivre l'erreur, menu steps]  (7 − i)² − 4(1 − i)(8 + 4i)
    = 48 − 14i − 48 + 16i   ← b² et 4ac
    = 2i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = 2i
    ? Comment trouver δ, une racine carrée de Δ = 2i ? ✔ Poser δ = x + iy avec δ² = Δ / · δ = i√(−2i), comme pour un réel négatif / · Prendre la racine de chaque partie de Δ
    = {1 + i ; −1 − i}   ← δ et −δ
  — z₁ = (−b + δ)/(2a) =  [juge complex]  départ : ((−7 + i) + (1 + i))/(2 − 2i)
    = (−6 + 2i)/(2 − 2i)   ← −b + δ
    = (−16 − 8i)/8   ← Conjugué du dénominateur
    = −2 − i   ← Simplifier
  — z₂ = (−b − δ)/(2a) =  [juge complex]  départ : ((−7 + i) − (1 + i))/(2 − 2i)
    = −8/(2 − 2i)   ← −b − δ
    = (−16 − 16i)/8   ← Conjugué du dénominateur
    = −2 − 2i   ← Simplifier
  — Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) =  [juge complex]  départ : (−2 − i) + (−2 − 2i)
    = −4 − 3i   ← −b/a = −4 − 3i
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((−7 + i) + (□))/(2 − 2i) ou avec − | {−2 − i ; −2 − 2i}
  pièges : g8_i_squared, g8_moivre_modulus, g8_sqrt_symbol_complex

```

### Niveau 4

```
Résous dans ℂ : (1 − i)z² − (5 + 3i)z − 8 + 12i = 0. Commence par Δ = b² − 4ac.
  [free, suivre l'erreur]  (−5 − 3i)² − 4(1 − i)(−8 + 12i)
    = 16 + 30i − 16 − 80i   ← b² et 4ac
    = −50i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = −50i
    = {5 − 5i ; −5 + 5i}   ← δ et −δ
  — Les solutions, sous forme algébrique :  [juge complex]  départ : (1 − i)z² − (5 + 3i)z − 8 + 12i = 0
    = {3 + 2i ; −2 + 2i}   ← z = (−b ± δ)/(2a), simplifié
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((5 + 3i) + (□))/(2 − 2i) ou avec − | {3 + 2i ; −2 + 2i}
  pièges : g8_i_squared, g8_moivre_modulus

Résous dans ℂ : z² + (1 − 5i)z − 12 − 5i = 0. Commence par Δ = b² − 4ac.
  [free, suivre l'erreur]  (1 − 5i)² − 4(−12 − 5i)
    = −24 − 10i + 48 + 20i   ← b² et 4ac
    = 24 + 10i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = 24 + 10i
    = {5 + i ; −5 − i}   ← δ et −δ
  — Les solutions, sous forme algébrique :  [juge complex]  départ : z² + (1 − 5i)z − 12 − 5i = 0
    = {2 + 3i ; −3 + 2i}   ← z = (−b ± δ)/(2a), simplifié
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((−1 + 5i) + (□))/2 ou avec − | {2 + 3i ; −3 + 2i}
  pièges : g8_i_squared, g8_moivre_modulus

Résous dans ℂ : z² + (1 − 4i)z − 5 + i = 0. Commence par Δ = b² − 4ac.
  [free, suivre l'erreur]  (1 − 4i)² − 4(−5 + i)
    = −15 − 8i + 20 − 4i   ← b² et 4ac
    = 5 − 12i   ← Regrouper
  — δ, une racine carrée de Δ : résous δ² = Δ.  [juge complex]  départ : δ² = 5 − 12i
    = {3 − 2i ; −3 + 2i}   ← δ et −δ
  — Les solutions, sous forme algébrique :  [juge complex]  départ : z² + (1 − 4i)z − 5 + i = 0
    = {1 + i ; −2 + 3i}   ← z = (−b ± δ)/(2a), simplifié
  aides : Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy. | z = ((−1 + 4i) + (□))/2 ou avec − | {1 + i ; −2 + 3i}
  pièges : g8_i_squared, g8_moivre_modulus

```

### Niveau 5

```
Donne, sous forme algébrique simplifiée, les racines de P(z) = 2z² − (2 + 8i)z − 6 + 6i.
  [problème, 7 points]
  partie 1 (1. Discriminant : 1 ; Δ = b² − 4ac = : 1)
  Calcule le discriminant : b² =
    [free, sans aide, suivre l'erreur]  (−2 − 8i)²
      = −60 + 32i   ← b²
    — Δ = b² − 4ac =  [juge complex]  départ : −60 + 32i − 4(2)(−6 + 6i)
      = −60 + 32i + 48 − 48i   ← 4ac
      = −12 − 16i   ← Δ
  partie 2 (2. Racine carrée de Δ : 1 ; δ = x + iy avec δ² = Δ : 1)
  Racine carrée de Δ : d'abord |Δ| =
    [free, sans aide, suivre l'erreur]  |−12 − 16i|
      = 20   ← x² + y² = |Δ|
    — δ = x + iy avec δ² = Δ :  [juge complex]  départ : δ² = −12 − 16i
      = δ = 2 − 4i ou δ = −2 + 4i   ← x² − y², 2xy et x² + y²
  partie 3 (3. Formule : 1)
  Les solutions z₁ et z₂ sont :
    ✔ {((2 + 8i) + (2 − 4i))/4 ; ((2 + 8i) − (2 − 4i))/4}   · {((2 + 8i) + (−12 − 16i))/4 ; ((2 + 8i) − (−12 − 16i))/4}   · {((2 + 8i) + (2 − 4i))/2 ; ((2 + 8i) − (2 − 4i))/2}   · {((−2 − 8i) + (2 − 4i))/4 ; ((−2 − 8i) − (2 − 4i))/4}
  partie 4 (4. Simplifier : 1 ; z₂ = : 1)
  Simplifie : z₁ =
    [free, sans aide, suivre l'erreur]  ((2 + 8i) + (2 − 4i))/4
      = (4 + 4i)/4   ← −b + δ
      = 1 + i   ← Simplifier
    — z₂ =  [juge complex]  départ : ((2 + 8i) − (2 − 4i))/4
      = 3i   ← Simplifier
  pièges : g8_i_squared, g8_moivre_modulus, g8_modulus_no_square

Donne, sous forme algébrique simplifiée, les racines de P(z) = (1 + i)z² − (5 + 5i)z + 12 + 8i.
  [problème, 7 points]
  partie 1 (1. Discriminant : 1 ; Δ = b² − 4ac = : 1)
  Calcule le discriminant : b² =
    [free, sans aide, suivre l'erreur]  (−5 − 5i)²
      = 50i   ← b²
    — Δ = b² − 4ac =  [juge complex]  départ : 50i − 4(1 + i)(12 + 8i)
      = 50i − 16 − 80i   ← 4ac
      = −16 − 30i   ← Δ
  partie 2 (2. Racine carrée de Δ : 1 ; δ = x + iy avec δ² = Δ : 1)
  Racine carrée de Δ : d'abord |Δ| =
    [free, sans aide, suivre l'erreur]  |−16 − 30i|
      = 34   ← x² + y² = |Δ|
    — δ = x + iy avec δ² = Δ :  [juge complex]  départ : δ² = −16 − 30i
      = δ = 3 − 5i ou δ = −3 + 5i   ← x² − y², 2xy et x² + y²
  partie 3 (3. Formule : 1)
  Les solutions z₁ et z₂ sont :
    · {((−5 − 5i) + (3 − 5i))/(2 + 2i) ; ((−5 − 5i) − (3 − 5i))/(2 + 2i)}   · {((5 + 5i) + (−16 − 30i))/(2 + 2i) ; ((5 + 5i) − (−16 − 30i))/(2 + 2i)}   · {((5 + 5i) + (3 − 5i))/2 ; ((5 + 5i) − (3 − 5i))/2}   ✔ {((5 + 5i) + (3 − 5i))/(2 + 2i) ; ((5 + 5i) − (3 − 5i))/(2 + 2i)}
  partie 4 (4. Simplifier : 1 ; z₂ = : 1)
  Simplifie : z₁ =
    [free, sans aide, suivre l'erreur]  ((5 + 5i) + (3 − 5i))/(2 + 2i)
      = 8/(2 + 2i)   ← −b + δ
      = (16 − 16i)/8   ← Conjugué
      = 2 − 2i   ← Simplifier
    — z₂ =  [juge complex]  départ : ((5 + 5i) − (3 − 5i))/(2 + 2i)
      = (2 + 10i)/(2 + 2i)   ← −b − δ
      = (24 + 16i)/8   ← Conjugué
      = 3 + 2i   ← Simplifier
  pièges : g8_i_squared, g8_moivre_modulus, g8_modulus_no_square, g8_div_componentwise

Donne, sous forme algébrique simplifiée, les racines de P(z) = (1 − i)z² + (−1 + 3i)z − 2 + 4i.
  [problème, 7 points]
  partie 1 (1. Discriminant : 1 ; Δ = b² − 4ac = : 1)
  Calcule le discriminant : b² =
    [free, sans aide, suivre l'erreur]  (−1 + 3i)²
      = −8 − 6i   ← b²
    — Δ = b² − 4ac =  [juge complex]  départ : −8 − 6i − 4(1 − i)(−2 + 4i)
      = −8 − 6i − 8 − 24i   ← 4ac
      = −16 − 30i   ← Δ
  partie 2 (2. Racine carrée de Δ : 1 ; δ = x + iy avec δ² = Δ : 1)
  Racine carrée de Δ : d'abord |Δ| =
    [free, sans aide, suivre l'erreur]  |−16 − 30i|
      = 34   ← x² + y² = |Δ|
    — δ = x + iy avec δ² = Δ :  [juge complex]  départ : δ² = −16 − 30i
      = δ = 3 − 5i ou δ = −3 + 5i   ← x² − y², 2xy et x² + y²
  partie 3 (3. Formule : 1)
  Les solutions z₁ et z₂ sont :
    · {((1 − 3i) + (3 − 5i))/2 ; ((1 − 3i) − (3 − 5i))/2}   · {((−1 + 3i) + (3 − 5i))/(2 − 2i) ; ((−1 + 3i) − (3 − 5i))/(2 − 2i)}   · {((1 − 3i) + (−16 − 30i))/(2 − 2i) ; ((1 − 3i) − (−16 − 30i))/(2 − 2i)}   ✔ {((1 − 3i) + (3 − 5i))/(2 − 2i) ; ((1 − 3i) − (3 − 5i))/(2 − 2i)}
  partie 4 (4. Simplifier : 1 ; z₂ = : 1)
  Simplifie : z₁ =
    [free, sans aide, suivre l'erreur]  ((1 − 3i) + (3 − 5i))/(2 − 2i)
      = (4 − 8i)/(2 − 2i)   ← −b + δ
      = (24 − 8i)/8   ← Conjugué
      = 3 − i   ← Simplifier
    — z₂ =  [juge complex]  départ : ((1 − 3i) − (3 − 5i))/(2 − 2i)
      = (−2 + 2i)/(2 − 2i)   ← −b − δ
      = −1   ← Simplifier
  pièges : g8_i_squared, g8_moivre_modulus, g8_modulus_no_square, g8_div_componentwise

```

### Variantes d'examen

```
Les solutions dans ℂ de (1 − i)z² + (2 − 4i)z + 12 = 0 sont :
  ✔ {−3 + 3i ; −2i}   · {−3 − 3i ; 2i}   · {3 − 3i ; 2i}   · {((−2 + 4i) + 2i√17)/(2 − 2i) ; ((−2 + 4i) − 2i√17)/(2 − 2i)} [g8_sqrt_symbol_complex]
  [examen mcq]
  pièges : g8_sqrt_symbol_complex

Résous z² + (3 − i)z + 8 + i = 0 dans ℂ et donne la partie réelle de la solution dont la partie imaginaire est la plus grande.
  → -2
  [examen coef]

Donne, sous forme algébrique simplifiée, les racines de P(z) = 2z² + (−6 + 6i)z − 8i.
  [problème, examen open, 7 points]
  partie 1 (1. Discriminant : 1 ; Δ = b² − 4ac = : 1)
  Calcule le discriminant : b² =
    [free, sans aide, suivre l'erreur]  (−6 + 6i)²
      = −72i   ← b²
    — Δ = b² − 4ac =  [juge complex]  départ : −72i − 4(2)(−8i)
      = −72i + 64i   ← 4ac
      = −8i   ← Δ
  partie 2 (2. Racine carrée de Δ : 1 ; δ = x + iy avec δ² = Δ : 1)
  Racine carrée de Δ : d'abord |Δ| =
    [free, sans aide, suivre l'erreur]  |−8i|
      = 8   ← x² + y² = |Δ|
    — δ = x + iy avec δ² = Δ :  [juge complex]  départ : δ² = −8i
      = δ = 2 − 2i ou δ = −2 + 2i   ← x² − y², 2xy et x² + y²
  partie 3 (3. Formule : 1)
  Les solutions z₁ et z₂ sont :
    ✔ {((6 − 6i) + (2 − 2i))/4 ; ((6 − 6i) − (2 − 2i))/4}   · {((6 − 6i) + (−8i))/4 ; ((6 − 6i) − (−8i))/4}   · {((−6 + 6i) + (2 − 2i))/4 ; ((−6 + 6i) − (2 − 2i))/4}   · {((6 − 6i) + (2 − 2i))/2 ; ((6 − 6i) − (2 − 2i))/2}
  partie 4 (4. Simplifier : 1 ; z₂ = : 1)
  Simplifie : z₁ =
    [free, sans aide, suivre l'erreur]  ((6 − 6i) + (2 − 2i))/4
      = (8 − 8i)/4   ← −b + δ
      = 2 − 2i   ← Simplifier
    — z₂ =  [juge complex]  départ : ((6 − 6i) − (2 − 2i))/4
      = (4 − 4i)/4   ← −b − δ
      = 1 − i   ← Simplifier
  pièges : g8_i_squared, g8_moivre_modulus

```

## Polynômes complexes, théorème fondamental, racines conjuguées (`g8-poly`, CMS)

_Un polynôme réel a ses racines par paires conjuguées : (x − w)(x − w̄) est un facteur réel._

### Niveau 1

```
P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine −1 + i, et P(2) = 50. Trouve P(x). Son facteur réel est (x − (−1 + i))(x − (−1 − i)) = x² + 2x + 2, donc P(x) = (x² + 2x + 2)(x − r).
  [guided]  (2² + 2·2 + 2)(2 − r) = 50
    = □(2 − r) = 50   (trous : 10(2 − r) = 50)   ← Calculer le facteur en x₀
    = r = −3   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² + 2x + 2)(x + 3)
    = x³ + 3x² + 2x² + 6x + 2x + 6   ← Distribuer
    = x³ + 5x² + 8x + □   (trous : x³ + 5x² + 8x + 6)   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x + 1)² + 1 = x² + 2x + 2, puis P(2) = 10·(2 − r) = 50. | P(x) = (x² + 2x + 2)(x + 3) = x³ + 5x² + 8x + 6

P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine 1 − 3i, et P(−1) = 13. Trouve P(x). Son facteur réel est (x − (1 − 3i))(x − (1 + 3i)) = x² − 2x + 10, donc P(x) = (x² − 2x + 10)(x − r).
  [guided]  ((−1)² − 2·(−1) + 10)(−1 − r) = 13
    = □(−1 − r) = 13   (trous : 13(−1 − r) = 13)   ← Calculer le facteur en x₀
    = r = −2   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² − 2x + 10)(x + 2)
    = x³ + 2x² − 2x² − 4x + 10x + 20   ← Distribuer
    = x³ + 6x + □   (trous : x³ + 6x + 20)   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x − 1)² + 9 = x² − 2x + 10, puis P(−1) = 13·(−1 − r) = 13. | P(x) = (x² − 2x + 10)(x + 2) = x³ + 6x + 20

P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine −3 + 2i, et le reste de sa division par x + 1 vaut 8. Trouve P(x). Son facteur réel est (x − (−3 + 2i))(x − (−3 − 2i)) = x² + 6x + 13, donc P(x) = (x² + 6x + 13)(x − r).
  [guided]  ((−1)² + 6·(−1) + 13)(−1 − r) = 8
    = □(−1 − r) = 8   (trous : 8(−1 − r) = 8)   ← Calculer le facteur en x₀
    = r = −2   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² + 6x + 13)(x + 2)
    = x³ + 2x² + 6x² + 12x + 13x + 26   ← Distribuer
    = x³ + 8x² + 25x + □   (trous : x³ + 8x² + 25x + 26)   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x + 3)² + 4 = x² + 6x + 13, puis P(−1) = 8·(−1 − r) = 8. | P(x) = (x² + 6x + 13)(x + 2) = x³ + 8x² + 25x + 26

```

### Niveau 2

```
P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine 2 − 2i, et P(2) = 4. Trouve P(x).
  [guided]  (x − (2 − 2i))(x − (2 + 2i))
    ? P est à coefficients réels et 2 − 2i est racine. Que peut-on dire de 2 + 2i ? ✔ 2 + 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x − 2)² + 4   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² − □x + □   (trous : x² − 4x + 8)   ← Développer
  — Troisième facteur : P(x) = (x² − 4x + 8)(x − r). Condition :  [juge poly]  départ : (2² − 4·2 + 8)(2 − r) = 4
    = □(2 − r) = 4   (trous : 4(2 − r) = 4)   ← Calculer le facteur en x₀
    = r = 1   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² − 4x + 8)(x − 1)
    = x³ − x² − 4x² + 4x + 8x − 8   ← Distribuer
    = x³ − 5x² + 12x − □   (trous : x³ − 5x² + 12x − 8)   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x − 2)² + 4 = x² − 4x + 8, puis P(2) = 4·(2 − r) = 4. | P(x) = (x² − 4x + 8)(x − 1) = x³ − 5x² + 12x − 8
  pièges : g0_conj_missing

P(x) = x³ − 2x² − 11x + 52 est à coefficients réels, et 3 − 2i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [guided]  (x − (3 − 2i))(x − (3 + 2i))
    ? P est à coefficients réels et 3 − 2i est racine. Que peut-on dire de 3 + 2i ? ✔ 3 + 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x − 3)² + 4   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² − □x + □   (trous : x² − 6x + 13)   ← Développer
  — Divise P par x² − 6x + 13 :  [juge poly]  départ : x³ − 2x² − 11x + 52
    = (x² − 6x + 13)·x + 4x² − 24x + 52   ← Premier terme du quotient : x
    = (x² − 6x + 13)(x + 4)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² − 6x + 13)(x + 4) = 0
    = x = 3 − 2i ou x = 3 + 2i ou x = −4   ← Racines
  aides : P est réel : 3 + 2i est aussi racine, et (x − w)(x − w̄) divise P. | (x − w)(x − w̄) = x² − 6x + 13 ; P(x) = (x² − 6x + 13)(x − □). | Racines : 3 − 2i, 3 + 2i et −4.
  pièges : g0_conj_missing

P(x) = x³ + 8x² + 25x + 26 est à coefficients réels, et −3 − 2i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [guided]  (x − (−3 − 2i))(x − (−3 + 2i))
    ? P est à coefficients réels et −3 − 2i est racine. Que peut-on dire de −3 + 2i ? ✔ −3 + 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x + 3)² + 4   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² + □x + □   (trous : x² + 6x + 13)   ← Développer
  — Divise P par x² + 6x + 13 :  [juge poly]  départ : x³ + 8x² + 25x + 26
    = (x² + 6x + 13)·x + 2x² + 12x + 26   ← Premier terme du quotient : x
    = (x² + 6x + 13)(x + 2)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² + 6x + 13)(x + 2) = 0
    = x = −3 − 2i ou x = −3 + 2i ou x = −2   ← Racines
  aides : P est réel : −3 + 2i est aussi racine, et (x − w)(x − w̄) divise P. | (x − w)(x − w̄) = x² + 6x + 13 ; P(x) = (x² + 6x + 13)(x − □). | Racines : −3 − 2i, −3 + 2i et −2.
  pièges : g0_conj_missing

```

### Niveau 3

```
P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine 2 − i, et P(−1) = 20. Trouve P(x).
  [tap, suivre l'erreur, menu steps]  (x − (2 − i))(x − (2 + i))
    ? P est à coefficients réels et 2 − i est racine. Que peut-on dire de 2 + i ? ✔ 2 + i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x − 2)² + 1   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² − 4x + 5   ← Développer
  — Troisième facteur : P(x) = (x² − 4x + 5)(x − r). Condition :  [juge poly]  départ : ((−1)² − 4·(−1) + 5)(−1 − r) = 20
    = 10(−1 − r) = 20   ← Calculer le facteur en x₀
    = r = −3   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² − 4x + 5)(x + 3)
    = x³ + 3x² − 4x² − 12x + 5x + 15   ← Distribuer
    = x³ − x² − 7x + 15   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x − 2)² + 1 = x² − 4x + 5, puis P(−1) = 10·(−1 − r) = 20. | P(x) = (x² − 4x + 5)(x + 3) = x³ − x² − 7x + 15
  pièges : g0_conj_missing

P(x) = x³ − 3x − 52 est à coefficients réels, et −2 + 3i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [tap, suivre l'erreur, menu steps]  (x − (−2 + 3i))(x − (−2 − 3i))
    ? P est à coefficients réels et −2 + 3i est racine. Que peut-on dire de −2 − 3i ? ✔ −2 − 3i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x + 2)² + 9   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² + 4x + 13   ← Développer
  — Divise P par x² + 4x + 13 :  [juge poly]  départ : x³ − 3x − 52
    = (x² + 4x + 13)·x − 4x² − 16x − 52   ← Premier terme du quotient : x
    = (x² + 4x + 13)(x − 4)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² + 4x + 13)(x − 4) = 0
    = x = −2 + 3i ou x = −2 − 3i ou x = 4   ← Racines
  aides : P est réel : −2 − 3i est aussi racine, et (x − w)(x − w̄) divise P. | (x − w)(x − w̄) = x² + 4x + 13 ; P(x) = (x² + 4x + 13)(x − □). | Racines : −2 + 3i, −2 − 3i et 4.
  pièges : g0_conj_missing

P est un polynôme à coefficients réels, unitaire, de degré 3. Il a pour racine 2 − 3i, et P(2) = 36. Trouve P(x).
  [tap, suivre l'erreur, menu steps]  (x − (2 − 3i))(x − (2 + 3i))
    ? P est à coefficients réels et 2 − 3i est racine. Que peut-on dire de 2 + 3i ? ✔ 2 + 3i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = (x − 2)² + 9   ← (x − p)² − (qi)² = (x − p)² + q²
    = x² − 4x + 13   ← Développer
  — Troisième facteur : P(x) = (x² − 4x + 13)(x − r). Condition :  [juge poly]  départ : (2² − 4·2 + 13)(2 − r) = 36
    = 9(2 − r) = 36   ← Calculer le facteur en x₀
    = r = −2   ← Résoudre
  — Développe P :  [juge poly]  départ : (x² − 4x + 13)(x + 2)
    = x³ + 2x² − 4x² − 8x + 13x + 26   ← Distribuer
    = x³ − 2x² + 5x + 26   ← Regrouper
  aides : Pour un polynôme réel, la conjuguée d'une racine est racine : (x − w)(x − w̄) est un facteur réel de P. | (x − 2)² + 9 = x² − 4x + 13, puis P(2) = 9·(2 − r) = 36. | P(x) = (x² − 4x + 13)(x + 2) = x³ − 2x² + 5x + 26
  pièges : g0_conj_missing

```

### Niveau 4

```
P(x) = x³ − 8x² + 24x − 32 est à coefficients réels, et 2 + 2i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [free, suivre l'erreur]  (x − (2 + 2i))(x − (2 − 2i))
    ? P est à coefficients réels et 2 + 2i est racine. Que peut-on dire de 2 − 2i ? ✔ 2 − 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = x² − 4x + 8   ← Facteur réel : (x − Re w)² + (Im w)²
  — Divise P par x² − 4x + 8 :  [juge poly]  départ : x³ − 8x² + 24x − 32
    = (x² − 4x + 8)(x − 4)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² − 4x + 8)(x − 4) = 0
    = x = 2 + 2i ou x = 2 − 2i ou x = 4   ← Racines
  aides : P est réel : 2 − 2i est aussi racine, et (x − w)(x − w̄) divise P. | (x − w)(x − w̄) = x² − 4x + 8 ; P(x) = (x² − 4x + 8)(x − □). | Racines : 2 + 2i, 2 − 2i et 4.
  pièges : g0_conj_missing

P(x) = x³ − 6x² + 16x − 16 est à coefficients réels, et 2 − 2i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [free, suivre l'erreur]  (x − (2 − 2i))(x − (2 + 2i))
    ? P est à coefficients réels et 2 − 2i est racine. Que peut-on dire de 2 + 2i ? ✔ 2 + 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
    = x² − 4x + 8   ← Facteur réel : (x − Re w)² + (Im w)²
  — Divise P par x² − 4x + 8 :  [juge poly]  départ : x³ − 6x² + 16x − 16
    = (x² − 4x + 8)(x − 2)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² − 4x + 8)(x − 2) = 0
    = x = 2 − 2i ou x = 2 + 2i ou x = 2   ← Racines
  aides : P est réel : 2 + 2i est aussi racine, et (x − w)(x − w̄) divise P. | (x − w)(x − w̄) = x² − 4x + 8 ; P(x) = (x² − 4x + 8)(x − □). | Racines : 2 − 2i, 2 + 2i et 2.
  pièges : g0_conj_missing

P(z) = z³ + (−2 + i)z² − (8 + 2i)z − 8i a une racine imaginaire pure iy (y réel). Pose z = iy, trouve y, puis toutes les racines de P.
  [free, suivre l'erreur]  (iy)³ + (−2 + i)(iy)² − (8 + 2i)(iy) − 8i = 0
    ? Les coefficients de P ne sont pas tous réels. Si −i est racine, i l'est-elle ? ✔ Pas forcément : la règle de la conjuguée demande des coefficients réels / · Oui : la conjuguée d'une racine est toujours racine
    = 2y² + 2y = 0 ; −y³ − y² − 8y − 8 = 0   ← Partie réelle et partie imaginaire nulles
    = y = −1   ← Racine commune
  — Divise P par z + i :  [juge poly]  départ : z³ + (−2 + i)z² − (8 + 2i)z − 8i
    = (z + i)(z² − 2z − 8)   ← Quotient
  — Toutes les racines de P :  [juge complex]  départ : (z + i)(z² − 2z − 8) = 0
    = z = −i ou z = −2 ou z = 4   ← Racines
  aides : P(iy) = 0 : la partie réelle et la partie imaginaire sont nulles toutes les deux. Cherche le y commun. | Partie réelle : 2y² + 2y = 0 ; partie imaginaire : −y³ − y² − 8y − 8 = 0. | y = −1 ; P(z) = (z + i)(z² − 2z − 8) ; racines −i, −2, 4.
  pièges : g8_conj_root_nonreal

```

### Niveau 5

```
P(z) = z³ − (3 + 2i)z² + (−4 + 6i)z + 8i a une racine imaginaire pure iy (y réel). Pose z = iy, trouve y, puis toutes les racines de P.
  [free, sans aide]  (iy)³ − (3 + 2i)(iy)² + (−4 + 6i)(iy) + 8i = 0
    = 3y² − 6y = 0 ; −y³ + 2y² − 4y + 8 = 0   ← Partie réelle et partie imaginaire nulles
    = y = 2   ← Racine commune
  — Divise P par z − 2i :  [juge poly]  départ : z³ − (3 + 2i)z² + (−4 + 6i)z + 8i
    = (z − 2i)(z² − 3z − 4)   ← Quotient
  — Toutes les racines de P :  [juge complex]  départ : (z − 2i)(z² − 3z − 4) = 0
    = z = 2i ou z = −1 ou z = 4   ← Racines

P(x) = x³ − x² − 4x + 24 est à coefficients réels, et 2 − 2i est une de ses racines. Trouve toutes ses racines dans ℂ.
  [free, sans aide]  (x − (2 − 2i))(x − (2 + 2i))
    = x² − 4x + 8   ← Facteur réel : (x − Re w)² + (Im w)²
  — Divise P par x² − 4x + 8 :  [juge poly]  départ : x³ − x² − 4x + 24
    = (x² − 4x + 8)(x + 3)   ← Quotient x − r, reste 0
  — Toutes les racines de P :  [juge complex]  départ : (x² − 4x + 8)(x + 3) = 0
    = x = 2 − 2i ou x = 2 + 2i ou x = −3   ← Racines

P(z) = z³ + (−6 + 2i)z² + (8 − 12i)z + 16i a une racine imaginaire pure iy (y réel). Pose z = iy, trouve y, puis toutes les racines de P.
  [free, sans aide]  (iy)³ + (−6 + 2i)(iy)² + (8 − 12i)(iy) + 16i = 0
    = 6y² + 12y = 0 ; −y³ − 2y² + 8y + 16 = 0   ← Partie réelle et partie imaginaire nulles
    = y = −2   ← Racine commune
  — Divise P par z + 2i :  [juge poly]  départ : z³ + (−6 + 2i)z² + (8 − 12i)z + 16i
    = (z + 2i)(z² − 6z + 8)   ← Quotient
  — Toutes les racines de P :  [juge complex]  départ : (z + 2i)(z² − 6z + 8) = 0
    = z = −2i ou z = 2 ou z = 4   ← Racines

```

### Variantes d'examen

```
−2i est racine de P(z) = z³ + (3 + 2i)z² + (2 + 6i)z + 4i. Quelles sont toutes les racines de P ?
  ✔ {−2i ; −2 ; −1}   · {−2i ; 2i ; −2 ; −1} [g8_conj_root_nonreal]   · {2i ; −2 ; −1}   · {−2i ; 2 ; 1}
  [examen mcq]
  pièges : g8_conj_root_nonreal

Vrai ou faux ? « Un polynôme à coefficients réels de degré 3 a au moins une racine réelle. »
  ✔ Vrai   · Faux
  [examen tf]

P est un polynôme à coefficients réels, unitaire, de degré 3. On sait que 1 − 2i est racine de P et que P(−1) = −40.
  [problème, examen open, 7 points]
  partie 1 ((a) Trouver P : 2 ; Troisième facteur : P(x) = (x² − 2x + 5)(x − r). Condition : 2 ; Développe P : 1)
  (a) Trouve P(x) développé.
    [free, sans aide, suivre l'erreur]  (x − (1 − 2i))(x − (1 + 2i))
      ? P est à coefficients réels et 1 − 2i est racine. Que peut-on dire de 1 + 2i ? ✔ 1 + 2i est aussi racine : P est réel / · Rien : il faut le calculer / · Seulement si P est unitaire
      = x² − 2x + 5   ← Facteur réel : (x − Re w)² + (Im w)²
    — Troisième facteur : P(x) = (x² − 2x + 5)(x − r). Condition :  [juge poly]  départ : ((−1)² − 2·(−1) + 5)(−1 − r) = −40
      = r = 4   ← Résoudre
    — Développe P :  [juge poly]  départ : (x² − 2x + 5)(x − 4)
      = x³ − 6x² + 13x − 20   ← Développer
  partie 2 ((b) Factoriser : 1 ; Dans ℂ : 1)
  (b) Factorise P dans ℝ, puis dans ℂ.
    [free, sans aide, suivre l'erreur]  x³ − 6x² + 13x − 20
      = (x − 4)(x² − 2x + 5)   ← Factorisation dans ℝ
    — Dans ℂ :  [juge poly]  départ : (x − 4)(x² − 2x + 5)
      = (x − 4)(x − (1 − 2i))(x − (1 + 2i))   ← Factorisation dans ℂ
  pièges : g0_conj_missing

```

## Lieux dans le plan complexe (`g8-locus`, CMS)

_|z − a| est une distance : médiatrices, cercles, disques et demi-plans._

### Niveau 1

```
Pose z = x + iy et trouve l'équation du lieu des points z tels que |z − (−3 − i)| = 2·|z + i|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [guided]  |z − (−3 − i)| = 2·|z + i|
    ? Que décrit |z − (−3 − i)| = 2·|z + i| (k = 2) ? ✔ Un cercle : k ≠ 1 (cercle d'Apollonius) / · La médiatrice de [AB] / · Une droite
    = (x + 3)² + (y + 1)² = 4(x² + (y + 1)²)   ← Module au carré
    = x² + y² + 6x + 2y + 10 = 4x² + 4y² + 8y + 4   ← Développer
    = 3x² + 3y² − 6x + 6y − 6 = 0   ← Tout regrouper d'un côté
    = x² + y² − 2x + 2y − 2 = 0   ← Diviser par 3
    = (x − 1)² + (y + 1)² = □   (trous : (x − 1)² + (y + 1)² = 4)   ← Compléter les carrés
  aides : Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)², et le facteur k devient k². Puis tout d'un côté, et complète les carrés. | (x + 3)² + (y + 1)² = 4(x² + (y + 1)²), puis x² + y² − 2x + 2y − 2 = 0. | (x − 1)² + (y + 1)² = 4 : cercle de centre (1 ; −1) et de rayon 2.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − (4 + 2i)| = |z + 5i|.
  [guided]  |z − (4 + 2i)| = |z + 5i|
    ? Que décrit |z − (4 + 2i)| = |z + 5i| ? ✔ La médiatrice de [AB], avec A(4 ; 2) et B(0 ; −5) / · La médiatrice de [AB′], avec A(4 ; 2) et B′(0 ; 5) / · Le cercle de centre A passant par B / · La droite (AB)
    = (x − □)² + (y − 2)² = x² + (y + 5)^□   (trous : (x − 4)² + (y − 2)² = x² + (y + 5)²)   ← Module au carré (les deux côtés sont positifs)
    = −8x − 4y + 20 = 10y + 25   ← Développer : x² et y² disparaissent
    = 8x + 14y + 5 = 0   ← Équation de la droite
  aides : |z − (4 + 2i)| est la distance de z au point A(4 ; 2). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x − 4)² + (y − 2)² = x² + (y + 5)², puis développe : x² et y² disparaissent. | 8x + 14y + 5 = 0.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − 4i| = |z − (1 − i)|.
  [guided]  |z − 4i| = |z − (1 − i)|
    ? Que décrit |z − 4i| = |z − (1 − i)| ? ✔ La médiatrice de [AB], avec A(0 ; 4) et B(1 ; −1) / · La médiatrice de [AB′], avec A(0 ; 4) et B′(−1 ; 1) / · Le cercle de centre A passant par B / · La droite (AB)
    = x² + (y − □)² = (x − 1)² + (y + □)²   (trous : x² + (y − 4)² = (x − 1)² + (y + 1)²)   ← Module au carré (les deux côtés sont positifs)
    = −8y + 16 = −2x + 2y + 2   ← Développer : x² et y² disparaissent
    = x − 5y + 7 = 0   ← Équation de la droite
  aides : |z − 4i| est la distance de z au point A(0 ; 4). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | x² + (y − 4)² = (x − 1)² + (y + 1)², puis développe : x² et y² disparaissent. | x − 5y + 7 = 0.
  pièges : g8_locus_sign

```

### Niveau 2

```
Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − (3 − 5i)| = |z − 5i|.
  [guided]  |z − (3 − 5i)| = |z − 5i|
    ? Que décrit |z − (3 − 5i)| = |z − 5i| ? ✔ La médiatrice de [AB], avec A(3 ; −5) et B(0 ; 5) / · La médiatrice de [AB′], avec A(3 ; −5) et B′(0 ; −5) / · Le cercle de centre A passant par B / · La droite (AB)
    = (x − 3)² + (y + 5)² = x² + (y − 5)²   ← Module au carré (les deux côtés sont positifs)
    = □ = −10y + 25   (trous : −6x + 10y + 34 = −10y + 25)   ← Développer : x² et y² disparaissent
    = 6x − 20y − 9 = 0   ← Équation de la droite
  aides : |z − (3 − 5i)| est la distance de z au point A(3 ; −5). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x − 3)² + (y + 5)² = x² + (y − 5)², puis développe : x² et y² disparaissent. | 6x − 20y − 9 = 0.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − 3i| = |z − (3 + 4i)|.
  [guided]  |z − 3i| = |z − (3 + 4i)|
    ? Que décrit |z − 3i| = |z − (3 + 4i)| ? ✔ La médiatrice de [AB], avec A(0 ; 3) et B(3 ; 4) / · La médiatrice de [AB′], avec A(0 ; 3) et B′(−3 ; −4) / · Le cercle de centre A passant par B / · La droite (AB)
    = x² + (y − 3)² = (x − 3)² + (y − 4)²   ← Module au carré (les deux côtés sont positifs)
    = □ = −6x − 8y + 25   (trous : −6y + 9 = −6x − 8y + 25)   ← Développer : x² et y² disparaissent
    = 3x + y − 8 = 0   ← Équation de la droite
  aides : |z − 3i| est la distance de z au point A(0 ; 3). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | x² + (y − 3)² = (x − 3)² + (y − 4)², puis développe : x² et y² disparaissent. | 3x + y − 8 = 0.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'équation du lieu des points z tels que |z − (−6 − i)| = 2·|z − (−3 − 4i)|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [guided]  |z − (−6 − i)| = 2·|z − (−3 − 4i)|
    ? Que décrit |z − (−6 − i)| = 2·|z − (−3 − 4i)| (k = 2) ? ✔ Un cercle : k ≠ 1 (cercle d'Apollonius) / · La médiatrice de [AB] / · Une droite
    = (x + 6)² + (y + 1)² = 4((x + 3)² + (y + 4)²)   ← Module au carré
    = x² + y² + 12x + 2y + 37 = 4x² + 4y² + 24x + 32y + 100   ← Développer
    = 3x² + 3y² + 12x + 30y + 63 = 0   ← Tout regrouper d'un côté
    = x² + y² + 4x + 10y + 21 = 0   ← Diviser par 3
    = (x + 2)² + (y + 5)² = 8   ← Compléter les carrés
  aides : Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)², et le facteur k devient k². Puis tout d'un côté, et complète les carrés. | (x + 6)² + (y + 1)² = 4((x + 3)² + (y + 4)²), puis x² + y² + 4x + 10y + 21 = 0. | (x + 2)² + (y + 5)² = 8 : cercle de centre (−2 ; −5) et de rayon 2√2.
  pièges : g8_locus_sign

```

### Niveau 3

```
Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − (−5 − 5i)| = |z + 2|.
  [tap, suivre l'erreur, menu steps]  |z − (−5 − 5i)| = |z + 2|
    ? Que décrit |z − (−5 − 5i)| = |z + 2| ? ✔ La médiatrice de [AB], avec A(−5 ; −5) et B(−2 ; 0) / · La médiatrice de [AB′], avec A(−5 ; −5) et B′(2 ; 0) / · Le cercle de centre A passant par B / · La droite (AB)
    = (x + 5)² + (y + 5)² = (x + 2)² + y²   ← Module au carré (les deux côtés sont positifs)
    = 10x + 10y + 50 = 4x + 4   ← Développer : x² et y² disparaissent
    = 3x + 5y + 23 = 0   ← Équation de la droite
  aides : |z − (−5 − 5i)| est la distance de z au point A(−5 ; −5). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x + 5)² + (y + 5)² = (x + 2)² + y², puis développe : x² et y² disparaissent. | 3x + 5y + 23 = 0.
  pièges : g8_locus_sign, g8_modulus_no_square

Pose z = x + iy et trouve l'équation du lieu des points z tels que |z − (−4 + i)| = 2·|z − (−4 + 4i)|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [tap, suivre l'erreur, menu steps]  |z − (−4 + i)| = 2·|z − (−4 + 4i)|
    ? Que décrit |z − (−4 + i)| = 2·|z − (−4 + 4i)| (k = 2) ? ✔ Un cercle : k ≠ 1 (cercle d'Apollonius) / · La médiatrice de [AB] / · Une droite
    = (x + 4)² + (y − 1)² = 4((x + 4)² + (y − 4)²)   ← Module au carré
    = x² + y² + 8x − 2y + 17 = 4x² + 4y² + 32x − 32y + 128   ← Développer
    = 3x² + 3y² + 24x − 30y + 111 = 0   ← Tout regrouper d'un côté
    = x² + y² + 8x − 10y + 37 = 0   ← Diviser par 3
    = (x + 4)² + (y − 5)² = 4   ← Compléter les carrés
  aides : Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)², et le facteur k devient k². Puis tout d'un côté, et complète les carrés. | (x + 4)² + (y − 1)² = 4((x + 4)² + (y − 4)²), puis x² + y² + 8x − 10y + 37 = 0. | (x + 4)² + (y − 5)² = 4 : cercle de centre (−4 ; 5) et de rayon 2.
  pièges : g8_locus_sign, g8_modulus_no_square

Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − (5 + i)| = |z − 5|.
  [tap, suivre l'erreur, menu steps]  |z − (5 + i)| = |z − 5|
    ? Que décrit |z − (5 + i)| = |z − 5| ? ✔ La médiatrice de [AB], avec A(5 ; 1) et B(5 ; 0) / · La médiatrice de [AB′], avec A(5 ; 1) et B′(−5 ; 0) / · Le cercle de centre A passant par B / · La droite (AB)
    = (x − 5)² + (y − 1)² = (x − 5)² + y²   ← Module au carré (les deux côtés sont positifs)
    = −10x − 2y + 26 = −10x + 25   ← Développer : x² et y² disparaissent
    = 2y − 1 = 0   ← Équation de la droite
  aides : |z − (5 + i)| est la distance de z au point A(5 ; 1). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x − 5)² + (y − 1)² = (x − 5)² + y², puis développe : x² et y² disparaissent. | 2y − 1 = 0.
  pièges : g8_locus_sign, g8_modulus_no_square

```

### Niveau 4

```
Pose z = x + iy et trouve l'équation du lieu des points z tels que |z + 1| = 2·|z − (−4 + 3i)|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [free, suivre l'erreur]  |z + 1| = 2·|z − (−4 + 3i)|
    = (x + 1)² + y² = 4((x + 4)² + (y − 3)²)   ← Module au carré
    = x² + y² + 10x − 8y + 33 = 0   ← Développer, tout regrouper d'un côté, diviser par 3
    = (x + 5)² + (y − 4)² = 8   ← Compléter les carrés
  aides : Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)², et le facteur k devient k². Puis tout d'un côté, et complète les carrés. | (x + 1)² + y² = 4((x + 4)² + (y − 3)²), puis x² + y² + 10x − 8y + 33 = 0. | (x + 5)² + (y − 4)² = 8 : cercle de centre (−5 ; 4) et de rayon 2√2.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'inéquation en x et y du lieu des points z tels que |z + 2| < |z − (5 + 3i)|.
  [free, suivre l'erreur]  |z + 2| < |z − (5 + 3i)|
    = (x + 2)² + y² < (x − 5)² + (y − 3)²   ← Module au carré (les deux côtés sont positifs)
    = 7x + 3y − 15 < 0   ← Inéquation du demi-plan
  aides : |z + 2| est la distance de z au point A(−2 ; 0). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x + 2)² + y² < (x − 5)² + (y − 3)², puis développe : x² et y² disparaissent. | 7x + 3y − 15 < 0. C'est le demi-plan des points plus proches de A que de B.
  pièges : g8_locus_sign

Pose z = x + iy et trouve l'équation en x et y du lieu des points z tels que |z − (−4 − 4i)| = |z − 3|.
  [free, suivre l'erreur]  |z − (−4 − 4i)| = |z − 3|
    = (x + 4)² + (y + 4)² = (x − 3)² + y²   ← Module au carré (les deux côtés sont positifs)
    = 14x + 8y + 23 = 0   ← Équation de la droite
  aides : |z − (−4 − 4i)| est la distance de z au point A(−4 ; −4). Élève au carré : |z − a|² = (x − a₁)² + (y − a₂)². | (x + 4)² + (y + 4)² = (x − 3)² + y², puis développe : x² et y² disparaissent. | 14x + 8y + 23 = 0.
  pièges : g8_locus_sign

```

### Niveau 5

```
Pose z = x + iy et décris la région des points z tels que z(conj(z) − 2) < 2Re(z) + 2conj(z) + 9 : écris-la sous la forme (x − a)² + (y − b)² < r².
  [free, sans aide]  z(conj(z) − 2) < 2Re(z) + 2conj(z) + 9
    = x² + y² − 6x − 9 < 0   ← Développer : les parties imaginaires s'annulent
    = (x − 3)² + y² < 18   ← Compléter le carré

Pose z = x + iy et trouve l'équation du lieu des points z tels que |z − (3 + 4i)| = 2·|z − 4i|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [free, sans aide]  |z − (3 + 4i)| = 2·|z − 4i|
    = (x − 3)² + (y − 4)² = 4(x² + (y − 4)²)   ← Module au carré
    = x² + y² + 2x − 8y + 13 = 0   ← Développer, tout regrouper d'un côté, diviser par 3
    = (x + 1)² + (y − 4)² = 4   ← Compléter les carrés
  pièges : g8_locus_sign

Pose z = x + iy et décris la région des points z tels que z(conj(z) − 1) < −4Re(z) + conj(z) + 9 : écris-la sous la forme (x − a)² + (y − b)² < r².
  [free, sans aide]  z(conj(z) − 1) < −4Re(z) + conj(z) + 9
    = x² + y² + 2x − 9 < 0   ← Développer : les parties imaginaires s'annulent
    = (x + 1)² + y² < 10   ← Compléter le carré

```

### Variantes d'examen

```
Quel est le lieu des points z = x + iy tels que |z + 4| = |z − (−4 + 5i)| ?
  · 16x − 10y + 25 = 0 [g8_locus_sign]   ✔ 2y − 5 = 0   · 16x − 10y − 25 = 0 [g8_locus_sign]   · x + 4 = 0
  [examen mcq]
  pièges : g8_locus_sign

Vrai ou faux ? « |z − 2i| = |z + 2| est la médiatrice du segment d'extrémités 2i et −2. »
  ✔ Vrai   · Faux
  [examen tf]

Pose z = x + iy et trouve l'équation du lieu des points z tels que |z − (4 − 6i)| = 2·|z − (4 − 3i)|. Donne-la sous la forme (x − a)² + (y − b)² = r².
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur, examen open]  |z − (4 − 6i)| = 2·|z − (4 − 3i)|
      = (x − 4)² + (y + 6)² = 4((x − 4)² + (y + 3)²)   ← Module au carré
      = x² + y² − 8x + 4y + 16 = 0   ← Développer, tout regrouper d'un côté, diviser par 3
      = (x − 4)² + (y + 2)² = 4   ← Compléter les carrés
  pièges : g8_locus_sign

```

## Rapport de longueurs et angle par un quotient (`g8-ratio-angle`, CMS)

_q = (c − a)/(b − a) : |q| = AC/AB, arg q = angle de AB⃗ vers AC⃗._

### Niveau 1

```
A, B et C ont pour affixes a = 4 − i, b = 4 et c = 1 − 4i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [guided]  ((1 − 4i) − (4 − i))/(4 − (4 − i))
    = (−3 − 3i)/(□)   (trous : (−3 − 3i)/(i))   ← Différences c − a et b − a
    = (−3 − 3i)(−i)/((i)(−i))   ← Multiplier par le conjugué
    = (−3 + 3i)/1   ← Calculer
    = −3 + 3i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−3 + 3i|
    = √((−3)² + 3²)   ← Module
    = 3√2   ← Simplifier
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−3 + 3i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (−3 − 3i)/(i) : multiplie en haut et en bas par −i. | q = −3 + 3i : AC/AB = 3√2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = −1 − 4i, b = −2 − 7i et c = 8 − 7i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [guided]  ((8 − 7i) − (−1 − 4i))/((−2 − 7i) − (−1 − 4i))
    = (9 − 3i)/(□)   (trous : (9 − 3i)/(−1 − 3i))   ← Différences c − a et b − a
    = (9 − 3i)(−1 + 3i)/((−1 − 3i)(−1 + 3i))   ← Multiplier par le conjugué
    = (30i)/10   ← Calculer
    = 3i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |3i|
    = √(0² + 3²)   ← Module
    = 3   ← Simplifier
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(3i)
    = π/2   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (9 − 3i)/(−1 − 3i) : multiplie en haut et en bas par −1 + 3i. | q = 3i : AC/AB = 3, angle π/2.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = 4 − 4i, b = 3 − i et c = 7 − 3i. Calcule q = (c − a)/(b − a), puis son argument : A, B et C sont-ils alignés ?
  [guided]  ((7 − 3i) − (4 − 4i))/((3 − i) − (4 − 4i))
    = (3 + i)/(□)   (trous : (3 + i)/(−1 + 3i))   ← Différences c − a et b − a
    = (3 + i)(−1 − 3i)/((−1 + 3i)(−1 − 3i))   ← Multiplier par le conjugué
    = (−10i)/10   ← Calculer
    = −i   ← q sous forme a + bi
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−i)
    ? Que dit q sur A, B et C ? · q est réel : A, B et C sont alignés / ✔ q n'est pas réel : A, B et C ne sont pas alignés
    = −π/2   ← Argument (quadrant)
  aides : A, B et C sont alignés exactement quand q = (c − a)/(b − a) est réel (argument 0 ou π). | q = (3 + i)/(−1 + 3i). | q = −i, arg q = −π/2 : pas alignés.
  pièges : g8_ratio_order, g8_div_componentwise

```

### Niveau 2

```
A, B et C ont pour affixes a = −4 + 3i, b = −1 + 5i et c = −9 + 4i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [guided]  ((−9 + 4i) − (−4 + 3i))/((−1 + 5i) − (−4 + 3i))
    ? Quel quotient donne l'angle (AB⃗, AC⃗) et le rapport AC/AB ? ✔ (c − a)/(b − a) / · (b − a)/(c − a) / · (c − b)/(a − b)
    = (−5 + i)/(3 + 2i)   ← Différences c − a et b − a
    = (−5 + i)(3 − 2i)/((3 + 2i)(3 − 2i))   ← Multiplier par le conjugué
    = (−13 + 13i)/□   (trous : (−13 + 13i)/13)   ← Calculer
    = −1 + i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−1 + i|
    = √((−1)² + 1²)   ← Module
    = √2   ← Simplifier
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−1 + i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (−5 + i)/(3 + 2i) : multiplie en haut et en bas par 3 − 2i. | q = −1 + i : AC/AB = √2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = −2 − 3i, b = −4 et c = −1 + 2i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [guided]  ((−1 + 2i) − (−2 − 3i))/((−4) − (−2 − 3i))
    ? Quel quotient donne l'angle (AB⃗, AC⃗) et le rapport AC/AB ? ✔ (c − a)/(b − a) / · (b − a)/(c − a) / · (c − b)/(a − b)
    = (1 + 5i)/(−2 + 3i)   ← Différences c − a et b − a
    = (1 + 5i)(−2 − 3i)/((−2 + 3i)(−2 − 3i))   ← Multiplier par le conjugué
    = (13 − 13i)/□   (trous : (13 − 13i)/13)   ← Calculer
    = 1 − i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |1 − i|
    = √(1² + (−1)²)   ← Module
    = √2   ← Simplifier
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(1 − i)
    = −π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (1 + 5i)/(−2 + 3i) : multiplie en haut et en bas par −2 − 3i. | q = 1 − i : AC/AB = √2, angle −π/4.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = −3 − 3i, b = −5 − 5i et c = 9 − 3i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [guided]  ((9 − 3i) − (−3 − 3i))/((−5 − 5i) − (−3 − 3i))
    ? Quel quotient donne l'angle (AB⃗, AC⃗) et le rapport AC/AB ? ✔ (c − a)/(b − a) / · (b − a)/(c − a) / · (c − b)/(a − b)
    = 12/(−2 − 2i)   ← Différences c − a et b − a
    = (12)(−2 + 2i)/((−2 − 2i)(−2 + 2i))   ← Multiplier par le conjugué
    = (−24 + 24i)/□   (trous : (−24 + 24i)/8)   ← Calculer
    = −3 + 3i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−3 + 3i|
    = √((−3)² + 3²)   ← Module
    = 3√2   ← Simplifier
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−3 + 3i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = 12/(−2 − 2i) : multiplie en haut et en bas par −2 + 2i. | q = −3 + 3i : AC/AB = 3√2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

```

### Niveau 3

```
A, B et C ont pour affixes a = −2 + 2i, b = −4 + 5i et c = 1 + 4i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [tap, suivre l'erreur, menu steps]  ((1 + 4i) − (−2 + 2i))/((−4 + 5i) − (−2 + 2i))
    ? Quel quotient donne l'angle (AB⃗, AC⃗) et le rapport AC/AB ? ✔ (c − a)/(b − a) / · (b − a)/(c − a) / · (c − b)/(a − b)
    = (3 + 2i)/(−2 + 3i)   ← Différences c − a et b − a
    = (3 + 2i)(−2 − 3i)/((−2 + 3i)(−2 − 3i))   ← Multiplier par le conjugué
    = (−13i)/13   ← Calculer
    = −i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−i|
    = 1   ← Module
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−i)
    = −π/2   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (3 + 2i)/(−2 + 3i) : multiplie en haut et en bas par −2 − 3i. | q = −i : AC/AB = 1, angle −π/2.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = −3 + 3i, b = −2 et c = −1 − 3i. Calcule q = (c − a)/(b − a), puis son argument : A, B et C sont-ils alignés ?
  [tap, suivre l'erreur, menu steps]  ((−1 − 3i) − (−3 + 3i))/((−2) − (−3 + 3i))
    = (2 − 6i)/(1 − 3i)   ← Différences c − a et b − a
    = (2 − 6i)(1 + 3i)/((1 − 3i)(1 + 3i))   ← Multiplier par le conjugué
    = 2   ← q sous forme a + bi
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(2)
    ? Que dit q sur A, B et C ? ✔ q est réel : A, B et C sont alignés / · q n'est pas réel : A, B et C ne sont pas alignés
    = 0   ← Argument (quadrant)
  aides : A, B et C sont alignés exactement quand q = (c − a)/(b − a) est réel (argument 0 ou π). | q = (2 − 6i)/(1 − 3i). | q = 2, arg q = 0 : alignés.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = 4 + 2i, b = 3 + 4i et c = 3 − i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [tap, suivre l'erreur, menu steps]  ((3 − i) − (4 + 2i))/((3 + 4i) − (4 + 2i))
    ? Quel quotient donne l'angle (AB⃗, AC⃗) et le rapport AC/AB ? ✔ (c − a)/(b − a) / · (b − a)/(c − a) / · (c − b)/(a − b)
    = (−1 − 3i)/(−1 + 2i)   ← Différences c − a et b − a
    = (−1 − 3i)(−1 − 2i)/((−1 + 2i)(−1 − 2i))   ← Multiplier par le conjugué
    = (−5 + 5i)/5   ← Calculer
    = −1 + i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−1 + i|
    = √2   ← Module
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−1 + i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (−1 − 3i)/(−1 + 2i) : multiplie en haut et en bas par −1 − 2i. | q = −1 + i : AC/AB = √2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

```

### Niveau 4

```
A, B et C ont pour affixes a = −3 + 3i, b = −4 + 2i et c = 1 + 3i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [free, suivre l'erreur]  ((1 + 3i) − (−3 + 3i))/((−4 + 2i) − (−3 + 3i))
    = 4/(−1 − i)   ← Différences c − a et b − a
    = −2 + 2i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−2 + 2i|
    = 2√2   ← Module
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−2 + 2i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = 4/(−1 − i) : multiplie en haut et en bas par −1 + i. | q = −2 + 2i : AC/AB = 2√2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = −1 − 3i, b = −2i et c = −5 − 3i. Calcule q = (c − a)/(b − a), puis le rapport AC/AB et l'angle orienté (AB⃗, AC⃗).
  [free, suivre l'erreur]  ((−5 − 3i) − (−1 − 3i))/((−2i) − (−1 − 3i))
    = (−4)/(1 + i)   ← Différences c − a et b − a
    = −2 + 2i   ← q sous forme a + bi
  — Rapport : AC/AB = |q| =  [juge complex]  départ : |−2 + 2i|
    = 2√2   ← Module
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(−2 + 2i)
    = 3π/4   ← Argument (quadrant)
  aides : Le quotient (c − a)/(b − a) contient le rapport (son module) et l'angle (son argument). | q = (−4)/(1 + i) : multiplie en haut et en bas par 1 − i. | q = −2 + 2i : AC/AB = 2√2, angle 3π/4.
  pièges : g8_ratio_order, g8_div_componentwise

A, B et C ont pour affixes a = 4 − 3i, b = 1 − i et c = −2 + i. Calcule q = (c − a)/(b − a), puis son argument : A, B et C sont-ils alignés ?
  [free, suivre l'erreur]  ((−2 + i) − (4 − 3i))/((1 − i) − (4 − 3i))
    = (−6 + 4i)/(−3 + 2i)   ← Différences c − a et b − a
    = 2   ← q sous forme a + bi
  — Angle : (AB⃗, AC⃗) = arg q =  [juge complex]  départ : arg(2)
    ? Que dit q sur A, B et C ? ✔ q est réel : A, B et C sont alignés / · q n'est pas réel : A, B et C ne sont pas alignés
    = 0   ← Argument (quadrant)
  aides : A, B et C sont alignés exactement quand q = (c − a)/(b − a) est réel (argument 0 ou π). | q = (−6 + 4i)/(−3 + 2i). | q = 2, arg q = 0 : alignés.
  pièges : g8_ratio_order, g8_div_componentwise

```

### Niveau 5

```
A et B ont pour affixes a = −3i et b = 4 − 3i. Trouve l'affixe c du point C tel que ABC soit un triangle équilatéral d'orientation positive : c = a + e^(iπ/3)(b − a).
  [free, sans aide]  (−3i) + e^(iπ/3)((4 − 3i) − (−3i))
    = (−3i) + (1/2 + i√3/2)·4   ← e^(iπ/3) = 1/2 + i√3/2
    = 2 + (−3 + 2√3)i   ← Regrouper : c = x + iy
  pièges : g8_ratio_order, g8_div_componentwise

A et B ont pour affixes a = −2 − 3i et b = 2 − 3i. Trouve l'affixe c du point C tel que ABC soit un triangle équilatéral d'orientation positive : c = a + e^(iπ/3)(b − a).
  [free, sans aide]  (−2 − 3i) + e^(iπ/3)((2 − 3i) − (−2 − 3i))
    = (−2 − 3i) + (1/2 + i√3/2)·4   ← e^(iπ/3) = 1/2 + i√3/2
    = (−3 + 2√3)i   ← Regrouper : c = x + iy
  pièges : g8_ratio_order, g8_div_componentwise

A et B ont pour affixes a = −2 + i et b = 2 + i. Trouve l'affixe c du point C tel que ABC soit un triangle équilatéral d'orientation positive : c = a + e^(iπ/3)(b − a).
  [free, sans aide]  (−2 + i) + e^(iπ/3)((2 + i) − (−2 + i))
    = (−2 + i) + (1/2 + i√3/2)·4   ← e^(iπ/3) = 1/2 + i√3/2
    = (1 + 2√3)i   ← Regrouper : c = x + iy
  pièges : g8_ratio_order, g8_div_componentwise

```

### Variantes d'examen

```
A, B et C ont pour affixes a = −4 + 3i, b = −5 + 2i et c = −5 + 3i. Que valent le rapport AC/AB et l'angle (AB⃗, AC⃗) ?
  ✔ AC/AB = √2/2, angle (AB⃗, AC⃗) = −π/4   · AC/AB = √2/2, angle (AB⃗, AC⃗) = π/4   · AC/AB = √2, angle (AB⃗, AC⃗) = π/4 [g8_ratio_order]   · AC/AB = 1/2, angle (AB⃗, AC⃗) = −π/4
  [examen mcq]
  pièges : g8_ratio_order

Vrai ou faux ? « Si (c − a)/(b − a) est réel, les points A, B et C sont alignés. »
  ✔ Vrai   · Faux
  [examen tf]

A et B ont pour affixes a = −2 + 2i et b = 2 + 2i. Trouve l'affixe c du point C tel que ABC soit un triangle équilatéral d'orientation positive : c = a + e^(iπ/3)(b − a).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  (−2 + 2i) + e^(iπ/3)((2 + 2i) − (−2 + 2i))
      = (−2 + 2i) + (1/2 + i√3/2)·4   ← e^(iπ/3) = 1/2 + i√3/2
      = (2 + 2√3)i   ← Regrouper : c = x + iy
  pièges : g8_ratio_order, g8_div_componentwise

```

## Translations, rotations, homothéties, similitudes (`g8-transform`, CMS)

_z ↦ az + b : centre ω = aω + b, rapport |a|, angle arg a._

### Niveau 1

```
Écris la similitude de centre −i, de rapport √2 et d'angle π/4 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [guided]  √2·e^(iπ/4)
    = 1 + i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (−i) − (1 + i)·(−i)
    = (−i) − (□)   (trous : (−i) − (1 − i))   ← Calculer aω
    = −1   ← b = ω − aω
  aides : z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω). | a = 1 + i ; b = (−i) − (1 − i) = □ | z′ = (1 + i)z − 1
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ −2iz + 9 + 3i.
  [guided]  ω = −2iω + 9 + 3i
    = (□)ω = 9 + 3i   (trous : (1 + 2i)ω = 9 + 3i)   ← Regrouper les ω : (1 − a)ω = b
    = ω = (9 + 3i)/(1 + 2i)   ← Diviser
    = ω = 3 − 3i   ← Calculer
  — Rapport :  [juge complex]  départ : |−2i|
    = 2   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(−2i)
    = −π/2   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | (1 + 2i)ω = 9 + 3i, donc ω = □. | ω = 3 − 3i, rapport 2, angle −π/2 : similitude.

Écris la similitude de centre i, de rapport √2 et d'angle −π/4 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [guided]  √2·e^(−iπ/4)
    = 1 − i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : i − (1 − i)·i
    = i − (□)   (trous : i − (1 + i))   ← Calculer aω
    = −1   ← b = ω − aω
  aides : z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω). | a = 1 − i ; b = i − (1 + i) = □ | z′ = (1 − i)z − 1
  pièges : g8_rotation_about_origin

```

### Niveau 2

```
Trouve le centre ω, le rapport et l'angle de la transformation z ↦ (−1 + i)z − 1 + 3i.
  [guided]  ω = (−1 + i)ω − 1 + 3i
    = (2 − i)ω = −1 + 3i   ← Regrouper les ω : (1 − a)ω = b
    = ω = (−1 + 3i)/(2 − i)   ← Diviser
    = ω = −1 + i   ← Calculer
  — Rapport :  [juge complex]  départ : |−1 + i|
    = √2   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(−1 + i)
    ? z ↦ (−1 + i)z − 1 + 3i : a = −1 + i. C'est… · une rotation (|a| = 1) / · une homothétie (a réel) / ✔ une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = 3π/4   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | (2 − i)ω = −1 + 3i, donc ω = □. | ω = −1 + i, rapport √2, angle 3π/4 : similitude.
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ −iz − 3 − 3i.
  [guided]  ω = −iω − 3 − 3i
    = (1 + i)ω = −3 − 3i   ← Regrouper les ω : (1 − a)ω = b
    = ω = (−3 − 3i)/(1 + i)   ← Diviser
    = ω = −3   ← Calculer
  — Rapport :  [juge complex]  départ : |−i|
    = 1   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(−i)
    ? z ↦ −iz − 3 − 3i : a = −i. C'est… ✔ une rotation (|a| = 1) / · une homothétie (a réel) / · une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = −π/2   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | (1 + i)ω = −3 − 3i, donc ω = □. | ω = −3, rapport 1, angle −π/2 : rotation.
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ −2z + 6 − 9i.
  [guided]  ω = −2ω + 6 − 9i
    = 3ω = 6 − 9i   ← Regrouper les ω : (1 − a)ω = b
    = ω = (6 − 9i)/3   ← Diviser
    = ω = 2 − 3i   ← Calculer
  — Rapport :  [juge complex]  départ : |−2|
    = 2   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(−2)
    ? z ↦ −2z + 6 − 9i : a = −2. C'est… · une rotation (|a| = 1) / ✔ une homothétie (a réel) / · une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = π   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | 3ω = 6 − 9i, donc ω = □. | ω = 2 − 3i, rapport 2, angle π : homothétie.
  pièges : g8_rotation_about_origin

```

### Niveau 3

```
Écris la rotation de centre −3 + 3i et d'angle π/2 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [tap, suivre l'erreur, menu steps]  e^(iπ/2)
    = i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (−3 + 3i) − i·(−3 + 3i)
    ? Quelle écriture a cette transformation de centre ω ? ✔ z′ − ω = a(z − ω), donc b = ω − aω / · z′ = az + ω, donc b = ω / · z′ = a(z + ω), donc b = aω
    = (−3 + 3i) − (−3 − 3i)   ← Calculer aω
    = 6i   ← b = ω − aω
  aides : z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω). | a = i ; b = (−3 + 3i) − (−3 − 3i) = □ | z′ = iz + 6i
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ −2iz + 2 − 6i.
  [tap, suivre l'erreur, menu steps]  ω = −2iω + 2 − 6i
    = (1 + 2i)ω = 2 − 6i   ← Regrouper les ω : (1 − a)ω = b
    = ω = −2 − 2i   ← Calculer
  — Rapport :  [juge complex]  départ : |−2i|
    = 2   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(−2i)
    ? z ↦ −2iz + 2 − 6i : a = −2i. C'est… · une rotation (|a| = 1) / · une homothétie (a réel) / ✔ une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = −π/2   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | (1 + 2i)ω = 2 − 6i, donc ω = □. | ω = −2 − 2i, rapport 2, angle −π/2 : similitude.
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ (1 − i)z − 3.
  [tap, suivre l'erreur, menu steps]  ω = (1 − i)ω − 3
    = iω = −3   ← Regrouper les ω : (1 − a)ω = b
    = ω = 3i   ← Calculer
  — Rapport :  [juge complex]  départ : |1 − i|
    = √2   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(1 − i)
    ? z ↦ (1 − i)z − 3 : a = 1 − i. C'est… · une rotation (|a| = 1) / · une homothétie (a réel) / ✔ une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = −π/4   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | iω = −3, donc ω = □. | ω = 3i, rapport √2, angle −π/4 : similitude.
  pièges : g8_rotation_about_origin

```

### Niveau 4

```
Écris la similitude de centre −1 + i, de rapport √2 et d'angle 3π/4 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [free, suivre l'erreur]  √2·e^(3iπ/4)
    = −1 + i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (−1 + i) − (−1 + i)·(−1 + i)
    = −1 + 3i   ← b = ω − aω
  aides : z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω). | a = −1 + i ; b = (−1 + i) − (−2i) = □ | z′ = (−1 + i)z − 1 + 3i
  pièges : g8_rotation_about_origin

Écris la rotation de centre 1 + 3i et d'angle π/2 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [free, suivre l'erreur]  e^(iπ/2)
    = i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (1 + 3i) − i·(1 + 3i)
    = 4 + 2i   ← b = ω − aω
  aides : z′ − ω = a(z − ω) : le centre ω reste fixe. Donc z′ = az + (ω − aω). | a = i ; b = (1 + 3i) − (−3 + i) = □ | z′ = iz + 4 + 2i
  pièges : g8_rotation_about_origin

Trouve le centre ω, le rapport et l'angle de la transformation z ↦ iz + 5 − i.
  [free, suivre l'erreur]  ω = iω + 5 − i
    = (1 − i)ω = 5 − i   ← Regrouper les ω : (1 − a)ω = b
    = ω = 3 + 2i   ← Calculer
  — Rapport :  [juge complex]  départ : |i|
    = 1   ← Rapport |a|
  — Angle :  [juge complex]  départ : arg(i)
    ? z ↦ iz + 5 − i : a = i. C'est… ✔ une rotation (|a| = 1) / · une homothétie (a réel) / · une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
    = π/2   ← Angle arg a
  aides : Le centre est le point fixe : résous ω = aω + b. Le rapport est |a|, l'angle arg a. | (1 − i)ω = 5 − i, donc ω = □. | ω = 3 + 2i, rapport 1, angle π/2 : rotation.
  pièges : g8_rotation_about_origin

```

### Niveau 5

```
f₁(z) = iz + 2 − 3i et f₂(z) = (1 − i)z + 1 + 4i. Écris f₂ ∘ f₁ sous la forme z ↦ az + b, puis trouve son centre ω.
  [free, sans aide]  (1 − i)·i
    = 1 + i   ← a = a₂a₁
  — f₂(f₁(z)) = a₂(a₁z + b₁) + b₂, donc b = a₂b₁ + b₂ :  [juge complex]  départ : (1 − i)·(2 − 3i) + (1 + 4i)
    = −i   ← b = a₂b₁ + b₂
  — Centre de f₂ ∘ f₁ :  [juge complex]  départ : ω = (1 + i)ω − i
    = −iω = −i   ← Regrouper les ω : (1 − a)ω = b
    = ω = 1   ← Calculer

Écris la similitude de centre 1 + 2i, de rapport √2 et d'angle −3π/4 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [free, sans aide]  √2·e^(−3iπ/4)
    = −1 − i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (1 + 2i) − (−1 − i)·(1 + 2i)
    = 5i   ← b = ω − aω
  pièges : g8_rotation_about_origin

Écris la similitude de centre −2 + i, de rapport 2 et d'angle −π/2 sous la forme z′ = az + b : a = r·e^(iθ), puis b = ω − aω (car z′ − ω = a(z − ω)).
  [free, sans aide]  2·e^(−iπ/2)
    = −2i   ← a = r·e^(iθ) en forme algébrique
  — Puis b = ω − aω :  [juge complex]  départ : (−2 + i) − (−2i)·(−2 + i)
    = −4 − 3i   ← b = ω − aω
  pièges : g8_rotation_about_origin

```

### Variantes d'examen

```
Quel est le centre de la transformation z ↦ 2iz − 3 − 4i ?
  ✔ 1 − 2i   · 0 [g8_rotation_about_origin]   · −11/5 + (2i)/5   · −3 − 4i [g8_rotation_about_origin]
  [examen mcq]
  pièges : g8_rotation_about_origin

Vrai ou faux ? « z ↦ 2z + 3 est une homothétie de rapport 2. »
  ✔ Vrai   · Faux
  [examen tf]

f₁(z) = (1 − i)z + 3 − 2i et f₂(z) = iz − 1 − i. Écris f₂ ∘ f₁ sous la forme z ↦ az + b, puis trouve son centre ω.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; f₂(f₁(z)) = a₂(a₁z + b₁) + b₂, donc b = a₂b₁ + b₂ : 1 ; Centre de f₂ ∘ f₁ : 2)
    [free, sans aide, suivre l'erreur, examen open]  i·(1 − i)
      = 1 + i   ← a = a₂a₁
    — f₂(f₁(z)) = a₂(a₁z + b₁) + b₂, donc b = a₂b₁ + b₂ :  [juge complex]  départ : i·(3 − 2i) + (−1 − i)
      = 1 + 2i   ← b = a₂b₁ + b₂
    — Centre de f₂ ∘ f₁ :  [juge complex]  départ : ω = (1 + i)ω + 1 + 2i
      ? z ↦ (1 + i)z + 1 + 2i : a = 1 + i. C'est… · une rotation (|a| = 1) / · une homothétie (a réel) / ✔ une similitude (|a| ≠ 1, a non réel) / · une translation / · une transformation de centre 0
      = −iω = 1 + 2i   ← Regrouper les ω : (1 − a)ω = b
      = ω = −2 + i   ← Calculer
  pièges : g8_rotation_about_origin

```

## Inversion z ↦ 1/z̄ et z ↦ 1/z (`g8-inversion`, CMS)

_Image d'une droite ou d'un cercle : on remplace z par 1/w̄._

### Niveau 1

```
Trouve l'image de la droite −2Re(z) − Im(z) = −2 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit −2Re(1/conj(w)) − Im(1/conj(w)) = −2. Re(1/w̄) = x/(x² + y²), Im(1/w̄) = y/(x² + y²).
  [guided]  −2Re(1/conj(w)) − Im(1/conj(w)) = −2
    = (−2x − y)/(□) = −2   (trous : (−2x − y)/(x² + y²) = −2)   ← Re z = x/|w|², Im z = y/|w|²
    = −2x − y = −2(x² + y²)   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = (x − 1/2)² + (y − 1/4)² = 5/16   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | (−2x − y)/(x² + y²) = −2, donc −2x − y = −2(x² + y²). | (x − 1/2)² + (y − 1/4)² = 5/16 : cercle privé de 0.
  pièges : g8_inversion_conj

Calcule l'image w = 1/z̄ du point z = −2 + 2i, sous forme algébrique.
  [guided]  1/conj(−2 + 2i)
    = 1/(−2 − 2i)   ← Conjugué
    = (−2 + 2i)/((−2 − 2i)(−2 + 2i))   ← Multiplier par le conjugué du dénominateur
    = (−2 + 2i)/□   (trous : (−2 + 2i)/8)   ← z·z̄ = |z|² = 8
    = −1/4 + i/4   ← Forme algébrique
  aides : 1/z̄ = z/(z·z̄) = z/|z|² : même argument que z, module inversé. | w = (−2 + 2i)/8 = □ | w = −1/4 + i/4

Calcule l'image w = 1/z̄ du point z = −2 + 2i, sous forme algébrique.
  [guided]  1/conj(−2 + 2i)
    = 1/(−2 − 2i)   ← Conjugué
    = (−2 + 2i)/((−2 − 2i)(−2 + 2i))   ← Multiplier par le conjugué du dénominateur
    = (−2 + 2i)/□   (trous : (−2 + 2i)/8)   ← z·z̄ = |z|² = 8
    = −1/4 + i/4   ← Forme algébrique
  aides : 1/z̄ = z/(z·z̄) = z/|z|² : même argument que z, module inversé. | w = (−2 + 2i)/8 = □ | w = −1/4 + i/4

```

### Niveau 2

```
Trouve l'image de la droite Im(z) = −2 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit Im(1/conj(w)) = −2.
  [guided]  Im(1/conj(w)) = −2
    ? Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est… ✔ un cercle qui passe par 0 (privé de 0) / · une droite / · un cercle qui ne passe pas par 0
    = y/(x² + y²) = −2   ← Im z = Im(w)/|w|²
    = y = −2(x² + y²)   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = x² + (y + 1/4)² = □   (trous : x² + (y + 1/4)² = 1/16)   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | y/(x² + y²) = −2, donc y = −2(x² + y²). | x² + (y + 1/4)² = 1/16 : cercle privé de 0.
  pièges : g8_inversion_conj

Trouve l'image du cercle |z − (−3 + i)| = √10 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − (−3 + i)| = √10.
  [guided]  |1/conj(w) − (−3 + i)| = √10
    ? Le cercle passe par 0. Son image par w = 1/z̄ est… ✔ une droite (qui ne passe pas par 0) / · un cercle qui passe par 0 / · un cercle qui ne passe pas par 0
    = |1 − (−3 + i)conj(w)| = √10·|w|   ← Multiplier par |w̄| = |w|
    = (3x − y + 1)² + (x + 3y)² = 10(x² + y²)   ← 1 − c·w̄ = (3x − y + 1) − i(x + 3y) ; module au carré
    = □ = 1   (trous : −6x + 2y = 1)   ← Développer : x² et y² disparaissent
  aides : Multiplie par |w̄| = |w| pour enlever la fraction, puis élève au carré avec w = x + iy. | |1 − (−3 + i)conj(w)| = √10·|w|, puis (3x − y + 1)² + (x + 3y)² = 10(x² + y²). | −6x + 2y = 1 : une droite.
  pièges : g8_inversion_conj

Trouve l'image de la droite −2Re(z) − Im(z) = 1 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit −2Re(1/conj(w)) − Im(1/conj(w)) = 1.
  [guided]  −2Re(1/conj(w)) − Im(1/conj(w)) = 1
    ? Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est… ✔ un cercle qui passe par 0 (privé de 0) / · une droite / · un cercle qui ne passe pas par 0
    = (−2x − y)/(x² + y²) = 1   ← Re z = x/|w|², Im z = y/|w|²
    = −2x − y = x² + y²   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = (x + 1)² + (y + 1/2)² = □   (trous : (x + 1)² + (y + 1/2)² = 5/4)   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | (−2x − y)/(x² + y²) = 1, donc −2x − y = x² + y². | (x + 1)² + (y + 1/2)² = 5/4 : cercle privé de 0.
  pièges : g8_inversion_conj

```

### Niveau 3

```
Trouve l'image de la droite Im(z) = 2 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit Im(1/conj(w)) = 2.
  [tap, suivre l'erreur, menu steps]  Im(1/conj(w)) = 2
    ? Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est… ✔ un cercle qui passe par 0 (privé de 0) / · une droite / · un cercle qui ne passe pas par 0
    = y/(x² + y²) = 2   ← Im z = Im(w)/|w|²
    = y = 2(x² + y²)   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = x² + (y − 1/4)² = 1/16   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | y/(x² + y²) = 2, donc y = 2(x² + y²). | x² + (y − 1/4)² = 1/16 : cercle privé de 0.
  pièges : g8_inversion_conj

Trouve l'image de la droite Re(z) + Im(z) = 2 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit Re(1/conj(w)) + Im(1/conj(w)) = 2.
  [tap, suivre l'erreur, menu steps]  Re(1/conj(w)) + Im(1/conj(w)) = 2
    ? Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est… ✔ un cercle qui passe par 0 (privé de 0) / · une droite / · un cercle qui ne passe pas par 0
    = (x + y)/(x² + y²) = 2   ← Re z = x/|w|², Im z = y/|w|²
    = x + y = 2(x² + y²)   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = (x − 1/4)² + (y − 1/4)² = 1/8   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | (x + y)/(x² + y²) = 2, donc x + y = 2(x² + y²). | (x − 1/4)² + (y − 1/4)² = 1/8 : cercle privé de 0.
  pièges : g8_inversion_conj

Trouve l'image de la droite 2Re(z) − 2Im(z) = −1 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit 2Re(1/conj(w)) − 2Im(1/conj(w)) = −1.
  [tap, suivre l'erreur, menu steps]  2Re(1/conj(w)) − 2Im(1/conj(w)) = −1
    ? Avant le calcul : la droite ne passe pas par 0. Son image par w = 1/z̄ est… ✔ un cercle qui passe par 0 (privé de 0) / · une droite / · un cercle qui ne passe pas par 0
    = (2x − 2y)/(x² + y²) = −1   ← Re z = x/|w|², Im z = y/|w|²
    = 2x − 2y = −(x² + y²)   ← Multiplier par |w|² (w ≠ 0)
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = (x + 1)² + (y − 1)² = 2   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | (2x − 2y)/(x² + y²) = −1, donc 2x − 2y = −(x² + y²). | (x + 1)² + (y − 1)² = 2 : cercle privé de 0.
  pièges : g8_inversion_conj

```

### Niveau 4

```
Trouve l'image du cercle |z − (1 + 2i)| = √5 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − (1 + 2i)| = √5.
  [free, suivre l'erreur]  |1/conj(w) − (1 + 2i)| = √5
    = |1 − (1 + 2i)conj(w)| = √5·|w|   ← Multiplier par |w̄| = |w|
    = 2x + 4y = 1   ← Développer : x² et y² disparaissent
  aides : Multiplie par |w̄| = |w| pour enlever la fraction, puis élève au carré avec w = x + iy. | |1 − (1 + 2i)conj(w)| = √5·|w|, puis (−x − 2y + 1)² + (2x − y)² = 5(x² + y²). | 2x + 4y = 1 : une droite.
  pièges : g8_inversion_conj

Trouve l'image de la droite Im(z) = −2 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit Im(1/conj(w)) = −2.
  [free, suivre l'erreur]  Im(1/conj(w)) = −2
    = y/(x² + y²) = −2   ← Im z = Im(w)/|w|²
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = x² + (y + 1/4)² = 1/16   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | y/(x² + y²) = −2, donc y = −2(x² + y²). | x² + (y + 1/4)² = 1/16 : cercle privé de 0.
  pièges : g8_inversion_conj

Trouve l'image de la droite Im(z) = −1 par w = 1/z̄. On pose w = x + iy ; comme z = 1/w̄ = w/|w|², la droite s'écrit Im(1/conj(w)) = −1.
  [free, suivre l'erreur]  Im(1/conj(w)) = −1
    = y/(x² + y²) = −1   ← Im z = Im(w)/|w|²
    ? Le point w = 0 est-il dans l'image ? ✔ Non : w = 1/z̄ n'est jamais nul ; on retire 0 du cercle / · Oui : il vérifie l'équation
    = x² + (y + 1/2)² = 1/4   ← Compléter les carrés
  aides : Exprime z en w : z = 1/w̄ = w/|w|². Remplace, puis multiplie par |w|² = x² + y². | y/(x² + y²) = −1, donc y = −(x² + y²). | x² + (y + 1/2)² = 1/4 : cercle privé de 0.
  pièges : g8_inversion_conj

```

### Niveau 5

```
Trouve l'image du cercle |z − (−2 + 2i)| = 2√2 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − (−2 + 2i)| = 2√2.
  [free, sans aide]  |1/conj(w) − (−2 + 2i)| = 2√2
    = |1 − (−2 + 2i)conj(w)| = 2√2·|w|   ← Multiplier par |w̄| = |w|
    = −4x + 4y = 1   ← Développer : x² et y² disparaissent
  pièges : g8_inversion_conj

Trouve l'image du cercle |z + 2i| = 2 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − (−2i)| = 2.
  [free, sans aide]  |1/conj(w) − (−2i)| = 2
    = |1 − −2i·conj(w)| = 2·|w|   ← Multiplier par |w̄| = |w|
    = −4y = 1   ← Développer : x² et y² disparaissent
  pièges : g8_inversion_conj

Trouve l'image du cercle |z − (2 − i)| = √5 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − (2 − i)| = √5.
  [free, sans aide]  |1/conj(w) − (2 − i)| = √5
    = |1 − (2 − i)conj(w)| = √5·|w|   ← Multiplier par |w̄| = |w|
    = 4x − 2y = 1   ← Développer : x² et y² disparaissent
  pièges : g8_inversion_conj

```

### Variantes d'examen

```
Quelle est l'image de la droite Re(z) + 2Im(z) = −1 par w = 1/z̄ (w = x + iy, privée de 0) ?
  · (x + 1)² + (y + 2)² = 5   · x + 2y = −1   ✔ (x + 1/2)² + (y + 1)² = 5/4   · (x + 1/2)² + (y − 1)² = 5/4 [g8_inversion_conj]
  [examen mcq]
  pièges : g8_inversion_conj

Trouve l'image du cercle |z − 3i| = 3 (il passe par 0) par w = 1/z̄. On pose w = x + iy ; avec z = 1/w̄, le cercle s'écrit |1/conj(w) − 3i| = 3.
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  |1/conj(w) − 3i| = 3
      = |1 − 3i·conj(w)| = 3·|w|   ← Multiplier par |w̄| = |w|
      = 6y = 1   ← Développer : x² et y² disparaissent
  pièges : g8_inversion_conj

```

## Pièges de cette unité

- **i² remplacé par 1** (`g8_i_squared`, E) : −4i² = −4 au lieu de −4i² = +4
- **Division partie par partie** (`g8_div_componentwise`, E) : (4 + 7i)/(2 + i) = 2 + 7i au lieu de (4 + 7i)/(2 + i) = 3 + 2i
- **Module sans les carrés** (`g8_modulus_no_square`, E) : |3 + 4i| = 7 au lieu de |3 + 4i| = 5
- **Argument sans correction de quadrant** (`g8_arg_quadrant`, E) : arg(−1 + i√3) = −π/3 au lieu de arg(−1 + i√3) = 2π/3
- **Module pas élevé à la puissance** (`g8_moivre_modulus`, E) : (√2·e^(3iπ/4))¹⁰ = √2·e^(30iπ/4) au lieu de (√2·e^(3iπ/4))¹⁰ = 32·e^(30iπ/4)
- **Racines n-ièmes mal espacées** (`g8_roots_spacing`, E) : 3θ = −π/2 + 2kπ ⇔ θ = −π/6 + 2kπ au lieu de θ = −π/6 + 2kπ/3
- **Une seule racine n-ième** (`g8_roots_only_one`, E) : z³ = −8i : z = 2i au lieu de z ∈ {√3 − i ; 2i ; −√3 − i}
- **Signes des racines carrées pris au hasard** (`g8_sqrt_signs`, E) : z² = −5 + 12i : z = ±2 ± 3i au lieu de z = ±(2 + 3i)
- **√ appliqué à un nombre complexe** (`g8_sqrt_symbol_complex`, E) : √(−8 − 6i) = i√(8 + 6i) au lieu de δ = 1 − 3i, avec δ² = −8 − 6i
- **Racine conjuguée sans coefficients réels** (`g8_conj_root_nonreal`, E) : i racine de z − i, donc −i aussi au lieu de non : z − i n'a pas de coefficients réels
- **Mauvais point dans |z + a|** (`g8_locus_sign`, E) : |z + 4|² = (x − 4)² + y² au lieu de |z + 4|² = (x + 4)² + y²
- **Quotient inversé : rapport et angle de AC⃗ vers AB⃗** (`g8_ratio_order`, E) : angle (AB⃗, AC⃗) = −π/4 au lieu de angle (AB⃗, AC⃗) = π/4
- **Rotation écrite autour de 0** (`g8_rotation_about_origin`, E) : z′ = e^(iθ)z + ω au lieu de z′ − ω = e^(iθ)(z − ω)
- **w = 1/z̄ traité comme 1/z** (`g8_inversion_conj`, E) : Im z = 1 et w = 1/z̄ : x² + (y + 1/2)² = 1/4 au lieu de x² + (y − 1/2)² = 1/4
