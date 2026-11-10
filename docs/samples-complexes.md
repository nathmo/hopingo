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
    = (24 + 16i)/□   (trous : (24 + 16i)/8)   ← (−2−2i)(−2+2i) = 8
    = □   (trous : 3 + 2i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−2 − 10i)(□))/8 | 3 + 2i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (−6 + 9i)/(−2 + 3i)
  [guided]  (−6 + 9i)/(−2 + 3i)
    = ((−6 + 9i)(□))/((−2 + 3i)(−2 − 3i))   (trous : ((−6 + 9i)(−2 − 3i))/((−2 + 3i)(−2 − 3i)))   ← Conjugué du dénominateur
    = 39/□   (trous : 39/13)   ← (−2+3i)(−2−3i) = 13
    = □   (trous : 3)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−6 + 9i)(□))/13 | 3
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (1 − 5i)/(1 + i)
  [guided]  (1 − 5i)/(1 + i)
    = ((1 − 5i)(□))/((1 + i)(1 − i))   (trous : ((1 − 5i)(1 − i))/((1 + i)(1 − i)))   ← Conjugué du dénominateur
    = (−4 − 6i)/□   (trous : (−4 − 6i)/2)   ← (1+i)(1−i) = 2
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
    = (30 − 40i)/□   (trous : (30 − 40i)/10)   ← (1−3i)(1+3i) = 10
    = □   (trous : 3 − 4i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−9 − 13i)(□))/10 | 3 − 4i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (−17 + 6i)/(2 − 3i)
  [guided]  (−17 + 6i)/(2 − 3i)
    ? Comment se débarrasser de i au dénominateur ? ✔ Multiplier en haut et en bas par le conjugué 2 + 3i / · Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire / · Multiplier en haut et en bas par 2 − 3i
    = ((−17 + 6i)(□))/((2 − 3i)(2 + 3i))   (trous : ((−17 + 6i)(2 + 3i))/((2 − 3i)(2 + 3i)))   ← Conjugué du dénominateur
    = (−52 − 39i)/□   (trous : (−52 − 39i)/13)   ← (2−3i)(2+3i) = 13
    = □   (trous : −4 − 3i)   ← Diviser
  aides : Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. | ((−17 + 6i)(□))/13 | −4 − 3i
  pièges : g8_div_componentwise

Écris sous la forme a + bi : (6 − 3i)/(2 − i)
  [guided]  (6 − 3i)/(2 − i)
    ? Comment se débarrasser de i au dénominateur ? ✔ Multiplier en haut et en bas par le conjugué 2 + i / · Diviser la partie réelle par la partie réelle, et la partie imaginaire par la partie imaginaire / · Multiplier en haut et en bas par 2 − i
    = ((6 − 3i)(□))/((2 − i)(2 + i))   (trous : ((6 − 3i)(2 + i))/((2 − i)(2 + i)))   ← Conjugué du dénominateur
    = 15/□   (trous : 15/5)   ← (2−i)(2+i) = 5
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
  pièges : g8_i_squared

Écris sous la forme a + bi, sans aide : (−2 + i)(−2 + 3i) + (−1 + 4i) + i¹⁴¹⁴
  [free, sans aide]  (−2 + i)(−2 + 3i) + (−1 + 4i) + i¹⁴¹⁴
    = (4 − 6i − 2i + 3i² − 1 + 4i) + (i⁴)³⁵³·i²   ← Développer ; cycle de 4
    = (−4i) + i²   ← Calculer
    = −1 − 4i   ← Regrouper
  pièges : g8_i_squared

Écris sous la forme a + bi, sans aide : (4 − i)(−2 − 4i) + i⁶⁴³
  [free, sans aide]  (4 − i)(−2 − 4i) + i⁶⁴³
    = (−8 − 16i + 2i + 4i²) + (i⁴)¹⁶⁰·i³   ← Développer ; cycle de 4
    = (−12 − 14i) + i³   ← Calculer
    = −12 − 15i   ← Regrouper
  pièges : g8_i_squared

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
    ? Quel multiple de 2π faut-il retirer à −6π pour arriver dans ]−π ; π] ? ✔ −6π / · −7π / · 2π
    = (2e^(□))⁹   (trous : (2e^(−2iπ/3))⁹)   ← Forme exponentielle
    = 2⁹e^(□)   (trous : 2⁹e^(−6iπ))   ← (r·e^(iθ))ⁿ = rⁿ·e^(inθ)
    = □e^(−6iπ)   (trous : 512e^(−6iπ))   ← Calculer rⁿ
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
  [free, sans aide]  (5 − i)² − 4(12)
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
    = □ − 8 − 8i   (trous : 3 − 4i − 8 − 8i)   ← b² et 4ac
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
    = □   (trous : −8 + 6i + 24 − 36i)   ← b² et 4ac
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
    = □ − 36 − 36i   (trous : 9 − 36 − 36i)   ← b² et 4ac
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
    = □ − 16 + 28i   (trous : 16 − 30i − 16 + 28i)   ← b² et 4ac
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
    = □ + 8i   (trous : 3 − 4i + 8i)   ← b² et 4ac
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
    = −□ − 8 + 16i   (trous : −4 − 8 + 16i)   ← b² et 4ac
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
  [tap, suivre l'erreur, menu steps]  (−8 − 6i)² − 4(2)(6 + 6i)
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
