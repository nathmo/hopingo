# Exemples de questions — Analyse complexe

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Fonctions élémentaires : e^z, cos z, Log z, z^α (`c-elem-fn`, BA3)

_Log z = ln|z| + i Arg z avec Arg dans ]−π ; π] ; z^α = e^(α Log z) ; cos z n'est pas borné._

### Niveau 1

```
Calcule (−i)^(1 + i) (détermination principale), sous la forme a + bi.
  [guided]  (−i)^(1 + i)
    = e^((1 + i)·□)   (trous : e^((1 + i)·Log(−i)))   ← z^α = e^(α Log z)
    = e^((1 + i)·(−(π/2)i))   ← Log z = ln|z| + i Arg z
    = e^(π/2 − (π/2)i)
    = □   (trous : −ie^(π/2))
  aides : z^α = e^(α Log z) : commence par Log z = ln|z| + i Arg z. | e^((1 + i)·(−(π/2)i)) | (−i)^(1 + i) = −ie^(π/2)

Calcule le logarithme principal Log(−√3 − i).
  [guided]  Log(−√3 − i)
    (On donne |z| = 2 et Arg z = −5π/6.)
    = □ − (□)i   (trous : ln(2) − (5π/6)i)   ← Log z = ln|z| + i Arg z
  aides : Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π]. | Arg(−√3−i) = −5π/6, |z| = 2 | Log(−√3 − i) = ln(2) − (5π/6)i
  pièges : c_log_branch

Calcule le logarithme principal Log(2 − 2i).
  [guided]  Log(2 − 2i)
    (On donne |z| = 2√2 et Arg z = −π/4.)
    = □ − (□)i   (trous : ln(2√2) − (π/4)i)   ← Log z = ln|z| + i Arg z
  aides : Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π]. | Arg(2−2i) = −π/4, |z| = 2√2 | Log(2 − 2i) = ln(2√2) − (π/4)i
  pièges : c_log_branch

```

### Niveau 2

```
Calcule cos(2i) avec la définition par l'exponentielle.
  [guided]  cos(2i)
    = (e^(i·2i) + e^(−i·2i))/2   ← cos z = (e^(iz) + e^(−iz))/2
    = □   (trous : (e^(−2) + e²)/2)   ← i·i = −1
  aides : Remplace z par la définition avec e^(iz) ; i·i = −1. | (e^(i·2i) + e^(−i·2i))/2 | cos(2i) = (e^−2 + e²)/2

Calcule cos(3i) avec la définition par l'exponentielle.
  [guided]  cos(3i)
    = (e^(i·3i) + e^(−i·3i))/2   ← cos z = (e^(iz) + e^(−iz))/2
    = □   (trous : (e^(−3) + e³)/2)   ← i·i = −1
  aides : Remplace z par la définition avec e^(iz) ; i·i = −1. | (e^(i·3i) + e^(−i·3i))/2 | cos(3i) = (e^−3 + e³)/2

Calcule le logarithme principal Log(−√3 − i) : d'abord |z| et Arg z.
  [guided]  |−√3 − i|
    = √(□)   (trous : √(3 + 1))   ← |a + bi| = √(a² + b²)
    = □   (trous : 2)
  — L'argument principal :  [juge cvalue]  départ : arg(−√3 − i)
    = −□   (trous : −5π/6)   ← Arg z ∈ ]−π ; π], selon le quadrant de z
  — Le logarithme principal :  [juge cvalue]  départ : Log(−√3 − i)
    = □ − (□)i   (trous : ln(2) − (5π/6)i)   ← Log z = ln|z| + i Arg z
  aides : Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π]. | Arg(−√3−i) = −5π/6, |z| = 2 | Log(−√3 − i) = ln(2) − (5π/6)i

```

### Niveau 3

```
Calcule i^(−i) (détermination principale), sous la forme a + bi.
  [tap, suivre l'erreur, menu menu]  i^(−i)
    = e^((−i)·Log(i))   ← z^α = e^(α Log z)
    = e^((−i)·(π/2)i)   ← Log z = ln|z| + i Arg z
    = e^(π/2)
  aides : z^α = e^(α Log z) : commence par Log z = ln|z| + i Arg z. | e^((−i)·(π/2)i) | i^(−i) = e^(π/2)

Calcule sin(i) avec la définition par l'exponentielle.
  [tap, suivre l'erreur, menu menu]  sin(i)
    = (e^(i·i) − e^(−i·i))/(2i)   ← sin z = (e^(iz) − e^(−iz))/(2i)
    = (e^(−1) − e)/(2i)   ← i·i = −1
    = i(e − e^(−1))/2
  aides : Remplace z par la définition avec e^(iz) ; i·i = −1. | (e^(i·i) − e^(−i·i))/(2i) | sin(i) = i(e − e^−1)/2

Calcule le logarithme principal Log(1 − i√3) : d'abord |z| et Arg z.
  [tap, suivre l'erreur, menu menu]  |1 − i√3|
    = √(1 + 3)   ← |a + bi| = √(a² + b²)
    = 2
  — L'argument principal :  [juge cvalue]  départ : arg(1 − i√3)
    = −π/3   ← Arg z ∈ ]−π ; π], selon le quadrant de z
  — Le logarithme principal :  [juge cvalue]  départ : Log(1 − i√3)
    = ln(|1 − i√3|) + i·arg(1 − i√3)   ← Log z = ln|z| + i Arg z
    = ln(2) − (π/3)i
  aides : Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π]. | Arg(1−i√3) = −π/3, |z| = 2 | Log(1 − i√3) = ln(2) − (π/3)i

```

### Niveau 4

```
Calcule le logarithme principal Log(1 + i√3) : d'abord |z| et Arg z.
  [free, suivre l'erreur]  |1 + i√3|
    = √(1 + 3)   ← |a + bi| = √(a² + b²)
    = 2
  — L'argument principal :  [juge cvalue]  départ : arg(1 + i√3)
    = π/3   ← Arg z ∈ ]−π ; π], selon le quadrant de z
  — Le logarithme principal :  [juge cvalue]  départ : Log(1 + i√3)
    = ln(|1 + i√3|) + i·arg(1 + i√3)   ← Log z = ln|z| + i Arg z
    = ln(2) + (π/3)i
  aides : Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π]. | Arg(1+i√3) = π/3, |z| = 2 | Log(1 + i√3) = ln(2) + (π/3)i

Calcule i^i (détermination principale), sous la forme a + bi.
  [free, suivre l'erreur]  i^i
    = e^(i·Log(i))   ← z^α = e^(α Log z)
    = e^(i·(π/2)i)   ← Log z = ln|z| + i Arg z
    = e^(−π/2)
  aides : z^α = e^(α Log z) : commence par Log z = ln|z| + i Arg z. | e^(i·(π/2)i) | i^i = e^(−π/2)

Calcule |e^(2 + 2i)|.
  [free, suivre l'erreur]  |e^(2 + 2i)|
    = |e²|·|e^(2i)|   ← |e^z| = e^(Re z), |e^(iy)| = 1
    = e²
  aides : |e^(x + iy)| = eˣ·|e^(iy)|, et |e^(iy)| = 1. | |e²|·|e^(2i)| | |e^(2 + 2i)| = e²

```

### Niveau 5

```
Module de cos z, puis borne.
  [problème, 3 points]
  partie 1 (|cos(x + iy)|² : 2)
  Montre que |cos(x + iy)|² = cos(x)² + sinh(y)².
    [free, sans aide, suivre l'erreur]  |cos(x + iy)|²
      = |cos(x)cosh(y) − i·sin(x)sinh(y)|²   ← cos(x + iy) = cos x cosh y − i sin x sinh y
      = cos(x)²cosh(y)² + sin(x)²sinh(y)²   ← |a + bi|² = a² + b²
      = cos(x)² + sinh(y)²   ← cosh² = 1 + sinh², puis cos² + sin² = 1
  partie 2 (cos z bornée ? : 1)
  cos z est-elle bornée sur ℂ ?
    · Seulement sur les droites horizontales y = 0.   · Oui, par cos(x)² + sinh(y)² ≤ 2. [c_cos_bounded]   · Oui : |cos(z)| ≤ 1 comme sur ℝ. [c_cos_bounded]   ✔ Non : |cos(iy)| ≥ |sinh(y)|, qui tend vers l'infini.
  pièges : c_cos_bounded

Module de sin z, puis borne.
  [problème, 3 points]
  partie 1 (|sin(x + iy)|² : 2)
  Montre que |sin(x + iy)|² = sin(x)² + sinh(y)².
    [free, sans aide, suivre l'erreur]  |sin(x + iy)|²
      = |sin(x)cosh(y) + i·cos(x)sinh(y)|²   ← sin(x + iy) = sin x cosh y + i cos x sinh y
      = sin(x)²cosh(y)² + cos(x)²sinh(y)²   ← |a + bi|² = a² + b²
      = sin(x)² + sinh(y)²   ← cosh² = 1 + sinh², puis cos² + sin² = 1
  partie 2 (sin z bornée ? : 1)
  sin z est-elle bornée sur ℂ ?
    · Oui, par sin(x)² + sinh(y)² ≤ 2. [c_cos_bounded]   · Oui : |sin(z)| ≤ 1 comme sur ℝ. [c_cos_bounded]   · Seulement sur les droites horizontales y = 0.   ✔ Non : |sin(iy)| ≥ |sinh(y)|, qui tend vers l'infini.
  pièges : c_cos_bounded

Calcule i^(2i) (détermination principale), sous la forme a + bi.
  [free, sans aide]  i^(2i)
    = e^((2i)·Log(i))   ← z^α = e^(α Log z)
    = e^((2i)·(π/2)i)   ← Log z = ln|z| + i Arg z
    = e^(−π)

```

### Variantes d'examen

```
Log(1 − i) = ?
  ✔ ln(√2) − (π/4)i   · ln(√2) + (7π/4)i [c_log_branch]   · ln(√2) + (π/4)i   · ln(2) − (π/4)i
  [examen mcq]
  pièges : c_log_branch

```

## Équations dans ℂ (`c-equations`, BA3)

_Poser w = e^z (ou e^(iz)), résoudre le trinôme en w, puis z = Log w + 2kπi._

### Niveau 1

```
Résous dans ℂ : 4cos(z) = 5.
  [guided]  4cos(z) = 5
    (cos z = (w + 1/w)/2, avec w = e^(iz) ≠ 0.)
    = 2(□) = 5   (trous : 2(w + 1/w) = 5)   ← w = e^(iz)
    = □ = 0   (trous : 2w² − 5w + 2 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 2w² − 5w + 2 = 0
    = w = □ ou w = □   (trous : w = 2 ou w = 1/2)   ← formule du trinôme
  — e^(iz) = w ⟺ iz = Log w + 2kπi ⟺ z = −i Log w + 2kπ :  [juge cfamily]  départ : w = 2 ou w = 1/2
    = z = □ + 2kπ ou z = □ + 2kπ ; k ∈ ℤ   (trous : z = −i·ln(2) + 2kπ ou z = i·ln(2) + 2kπ ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : cos z = (w + 1/w)/2. | 2w² − 5w + 2 = 0, puis w = 2 ou w = 1/2 | z = −i·ln(2) + 2kπ ou z = i·ln(2) + 2kπ ; k ∈ ℤ

Résous dans ℂ : 3cos(z) = −5.
  [guided]  3cos(z) = −5
    (cos z = (w + 1/w)/2, avec w = e^(iz) ≠ 0.)
    = (3/2)(□) = −5   (trous : (3/2)(w + 1/w) = −5)   ← w = e^(iz)
    = □ = 0   (trous : 3w² + 10w + 3 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² + 10w + 3 = 0
    = w = □ ou w = □   (trous : w = −3 ou w = −1/3)   ← formule du trinôme
  — e^(iz) = w ⟺ iz = Log w + 2kπi ⟺ z = −i Log w + 2kπ :  [juge cfamily]  départ : w = −3 ou w = −1/3
    = z = □ + 2kπ ou z = □ + 2kπ ; k ∈ ℤ   (trous : z = π − i·ln(3) + 2kπ ou z = π + i·ln(3) + 2kπ ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : cos z = (w + 1/w)/2. | 3w² + 10w + 3 = 0, puis w = −3 ou w = −1/3 | z = π − i·ln(3) + 2kπ ou z = π + i·ln(3) + 2kπ ; k ∈ ℤ

Résous dans ℂ : 3cos(z) = 5.
  [guided]  3cos(z) = 5
    (cos z = (w + 1/w)/2, avec w = e^(iz) ≠ 0.)
    = (3/2)(□) = 5   (trous : (3/2)(w + 1/w) = 5)   ← w = e^(iz)
    = □ = 0   (trous : 3w² − 10w + 3 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² − 10w + 3 = 0
    = w = □ ou w = □   (trous : w = 3 ou w = 1/3)   ← formule du trinôme
  — e^(iz) = w ⟺ iz = Log w + 2kπi ⟺ z = −i Log w + 2kπ :  [juge cfamily]  départ : w = 3 ou w = 1/3
    = z = □ + 2kπ ou z = □ + 2kπ ; k ∈ ℤ   (trous : z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : cos z = (w + 1/w)/2. | 3w² − 10w + 3 = 0, puis w = 3 ou w = 1/3 | z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ

```

### Niveau 2

```
Résous dans ℂ : cosh(z) + 3sinh(z) = 1.
  [guided]  cosh(z) + 3sinh(z) = 1
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = (1/2)(□) + (3/2)(w − 1/w) = 1   (trous : (1/2)(w + 1/w) + (3/2)(w − 1/w) = 1)   ← w = e^z
    = □ = 0   (trous : 2w² − w − 1 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 2w² − w − 1 = 0
    = w = □ ou w = □   (trous : w = 1 ou w = −1/2)   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = 1 ou w = −1/2
    = z = Log(1) + 2kπi ou z = Log(−1/2) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = 2kπi ou z = □ + 2kπi ; k ∈ ℤ   (trous : z = 2kπi ou z = −ln(2) + πi + 2kπi ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | 2w² − w − 1 = 0, puis w = 1 ou w = −1/2 | z = 2kπi ou z = −ln(2) + πi + 2kπi ; k ∈ ℤ

Résous dans ℂ : cosh(z) + 2sinh(z) = −2i.
  [guided]  cosh(z) + 2sinh(z) = −2i
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = (1/2)(□) + (w − 1/w) = −2i   (trous : (1/2)(w + 1/w) + (w − 1/w) = −2i)   ← w = e^z
    = □ = 0   (trous : 3w² + 4iw − 1 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² + 4iw − 1 = 0
    (Δ = −4 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
    = w = □ ou w = □   (trous : w = −i/3 ou w = −i)   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = −i/3 ou w = −i
    = z = Log(−i/3) + 2kπi ou z = Log(−i) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = □ + 2kπi ou z = □ + 2kπi ; k ∈ ℤ   (trous : z = −ln(3) − (π/2)i + 2kπi ou z = −(π/2)i + 2kπi ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | 3w² + 4iw − 1 = 0, puis w = −i/3 ou w = −i | z = −ln(3) − (π/2)i + 2kπi ou z = −(π/2)i + 2kπi ; k ∈ ℤ

Résous dans ℂ : −cosh(z) + 5sinh(z) = 5.
  [guided]  −cosh(z) + 5sinh(z) = 5
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = −(1/2)(□) + (5/2)(w − 1/w) = 5   (trous : −(1/2)(w + 1/w) + (5/2)(w − 1/w) = 5)   ← w = e^z
    = □ = 0   (trous : 2w² − 5w − 3 = 0)   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 2w² − 5w − 3 = 0
    = w = □ ou w = □   (trous : w = 3 ou w = −1/2)   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = 3 ou w = −1/2
    = z = Log(3) + 2kπi ou z = Log(−1/2) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = □ + 2kπi ou z = □ + 2kπi ; k ∈ ℤ   (trous : z = ln(3) + 2kπi ou z = −ln(2) + πi + 2kπi ; k ∈ ℤ)   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | 2w² − 5w − 3 = 0, puis w = 3 ou w = −1/2 | z = ln(3) + 2kπi ou z = −ln(2) + πi + 2kπi ; k ∈ ℤ

```

### Niveau 3

```
Résous dans ℂ : −cosh(z) + 3sinh(z) = −2i.
  [tap, suivre l'erreur, menu menu]  −cosh(z) + 3sinh(z) = −2i
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = −(1/2)(w + 1/w) + (3/2)(w − 1/w) = −2i   ← w = e^z
    = w² + 2iw − 2 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : w² + 2iw − 2 = 0
    = w = −1 − i ou w = 1 − i   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = −1 − i ou w = 1 − i
    = z = Log(−1 − i) + 2kπi ou z = Log(1 − i) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = ln(√2) − (3π/4)i + 2kπi ou z = ln(√2) − (π/4)i + 2kπi ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | w² + 2iw − 2 = 0, puis w = −1 − i ou w = 1 − i | z = ln(√2) − (3π/4)i + 2kπi ou z = ln(√2) − (π/4)i + 2kπi ; k ∈ ℤ

Résous dans ℂ : 2cosh(z) + sinh(z) = i.
  [tap, suivre l'erreur, menu menu]  2cosh(z) + sinh(z) = i
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = (w + 1/w) + (1/2)(w − 1/w) = i   ← w = e^z
    = 3w² − 2iw + 1 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² − 2iw + 1 = 0
    (Δ = −16 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
    = w = i ou w = −i/3   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = i ou w = −i/3
    = z = Log(i) + 2kπi ou z = Log(−i/3) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = (π/2)i + 2kπi ou z = −ln(3) − (π/2)i + 2kπi ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | 3w² − 2iw + 1 = 0, puis w = i ou w = −i/3 | z = (π/2)i + 2kπi ou z = −ln(3) − (π/2)i + 2kπi ; k ∈ ℤ

Résous dans ℂ : cosh(z) + 3sinh(z) = 3i.
  [tap, suivre l'erreur, menu menu]  cosh(z) + 3sinh(z) = 3i
    (cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2, avec w = e^z ≠ 0.)
    ? Quel changement de variable ? ✔ w = e^z / · w = e^(iz) / · w = z²
    = (1/2)(w + 1/w) + (3/2)(w − 1/w) = 3i   ← w = e^z
    = 2w² − 3iw − 1 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 2w² − 3iw − 1 = 0
    (Δ = −1 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
    = w = i ou w = i/2   ← formule du trinôme
  — e^z = w ⟺ z = Log w + 2kπi :  [juge cfamily]  départ : w = i ou w = i/2
    = z = Log(i) + 2kπi ou z = Log(i/2) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
    = z = (π/2)i + 2kπi ou z = −ln(2) + (π/2)i + 2kπi ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^z : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. | 2w² − 3iw − 1 = 0, puis w = i ou w = i/2 | z = (π/2)i + 2kπi ou z = −ln(2) + (π/2)i + 2kπi ; k ∈ ℤ

```

### Niveau 4

```
Résous dans ℂ : 3cos(z) = 5.
  [free, suivre l'erreur]  3cos(z) = 5
    = (3/2)(w + 1/w) = 5   ← w = e^(iz)
    = 3w² − 10w + 3 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² − 10w + 3 = 0
    = w = 3 ou w = 1/3   ← formule du trinôme
  — Les solutions en z :  [juge cfamily]  départ : w = 3 ou w = 1/3
    = z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : cos z = (w + 1/w)/2. | 3w² − 10w + 3 = 0, puis w = 3 ou w = 1/3 | z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ

Résous dans ℂ : 3cos(z) = 5.
  [free, suivre l'erreur]  3cos(z) = 5
    = (3/2)(w + 1/w) = 5   ← w = e^(iz)
    = 3w² − 10w + 3 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² − 10w + 3 = 0
    = w = 3 ou w = 1/3   ← formule du trinôme
  — Les solutions en z :  [juge cfamily]  départ : w = 3 ou w = 1/3
    = z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : cos z = (w + 1/w)/2. | 3w² − 10w + 3 = 0, puis w = 3 ou w = 1/3 | z = −i·ln(3) + 2kπ ou z = i·ln(3) + 2kπ ; k ∈ ℤ

Résous dans ℂ : 3sin(z) = 5.
  [free, suivre l'erreur]  3sin(z) = 5
    = 3(w − 1/w)/(2i) = 5   ← w = e^(iz)
    = 3w² − 10iw − 3 = 0   ← multiplier par 2w (w ≠ 0), simplifier
  — Les racines du trinôme en w :  [juge complex]  départ : 3w² − 10iw − 3 = 0
    (Δ = −64 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
    = w = 3i ou w = i/3   ← formule du trinôme
  — Les solutions en z :  [juge cfamily]  départ : w = 3i ou w = i/3
    = z = −i·Log(3i) + 2kπ ou z = −i·Log(i/3) + 2kπ ; k ∈ ℤ   ← z = −i Log w + 2kπ
    = z = π/2 − i·ln(3) + 2kπ ou z = π/2 + i·ln(3) + 2kπ ; k ∈ ℤ   ← Log w = ln|w| + i Arg w
  aides : Pose w = e^(iz) : sin z = (w − 1/w)/(2i). | 3w² − 10iw − 3 = 0, puis w = 3i ou w = i/3 | z = π/2 − i·ln(3) + 2kπ ou z = π/2 + i·ln(3) + 2kπ ; k ∈ ℤ

```

### Niveau 5

```
Résous dans ℂ : −cosh(z) + 3sinh(z) = −3i.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Les racines du trinôme en w : 1 ; Les solutions en z : 1)
    [free, sans aide, suivre l'erreur]  −cosh(z) + 3sinh(z) = −3i
      = −(1/2)(w + 1/w) + (3/2)(w − 1/w) = −3i   ← w = e^z
      = w² + 3iw − 2 = 0   ← multiplier par 2w (w ≠ 0), simplifier
    — Les racines du trinôme en w :  [juge complex]  départ : w² + 3iw − 2 = 0
      (Δ = −1 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
      = w = −2i ou w = −i   ← formule du trinôme
    — Les solutions en z :  [juge cfamily]  départ : w = −2i ou w = −i
      = z = Log(−2i) + 2kπi ou z = Log(−i) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
      = z = ln(2) − (π/2)i + 2kπi ou z = −(π/2)i + 2kπi ; k ∈ ℤ   ← Log w = ln|w| + i Arg w

Résous dans ℂ : 4cos(z) = −5.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Les racines du trinôme en w : 1 ; Les solutions en z : 1)
    [free, sans aide, suivre l'erreur]  4cos(z) = −5
      = 2(w + 1/w) = −5   ← w = e^(iz)
      = 2w² + 5w + 2 = 0   ← multiplier par 2w (w ≠ 0), simplifier
    — Les racines du trinôme en w :  [juge complex]  départ : 2w² + 5w + 2 = 0
      = w = −2 ou w = −1/2   ← formule du trinôme
    — Les solutions en z :  [juge cfamily]  départ : w = −2 ou w = −1/2
      = z = −i·Log(−2) + 2kπ ou z = −i·Log(−1/2) + 2kπ ; k ∈ ℤ   ← z = −i Log w + 2kπ
      = z = π − i·ln(2) + 2kπ ou z = π + i·ln(2) + 2kπ ; k ∈ ℤ   ← Log w = ln|w| + i Arg w

Résous dans ℂ : −cosh(z) + 3sinh(z) = 3i.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Les racines du trinôme en w : 1 ; Les solutions en z : 1)
    [free, sans aide, suivre l'erreur]  −cosh(z) + 3sinh(z) = 3i
      = −(1/2)(w + 1/w) + (3/2)(w − 1/w) = 3i   ← w = e^z
      = w² − 3iw − 2 = 0   ← multiplier par 2w (w ≠ 0), simplifier
    — Les racines du trinôme en w :  [juge complex]  départ : w² − 3iw − 2 = 0
      (Δ = −1 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
      = w = 2i ou w = i   ← formule du trinôme
    — Les solutions en z :  [juge cfamily]  départ : w = 2i ou w = i
      = z = Log(2i) + 2kπi ou z = Log(i) + 2kπi ; k ∈ ℤ   ← z = Log w + 2kπi
      = z = ln(2) + (π/2)i + 2kπi ou z = (π/2)i + 2kπi ; k ∈ ℤ   ← Log w = ln|w| + i Arg w

```

### Variantes d'examen

```
L'ensemble des solutions de 4cos(z) = −5 est :
  · z = ln(2) + πi + 2kπ ou z = −ln(2) + πi + 2kπ ; k ∈ ℤ   · z = π − i·ln(2) ou z = π + i·ln(2) [c_exp_periodic]   · z = π − i·ln(2) + kπ ou z = π + i·ln(2) + kπ ; k ∈ ℤ   ✔ z = π − i·ln(2) + 2kπ ou z = π + i·ln(2) + 2kπ ; k ∈ ℤ
  [examen mcq]
  pièges : c_exp_periodic

Résous dans ℂ : 3sin(z) = −5.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Les racines du trinôme en w : 1 ; Les solutions en z : 1)
    [free, sans aide, suivre l'erreur]  3sin(z) = −5
      = 3(w − 1/w)/(2i) = −5   ← w = e^(iz)
      = 3w² + 10iw − 3 = 0   ← multiplier par 2w (w ≠ 0), simplifier
    — Les racines du trinôme en w :  [juge complex]  départ : 3w² + 10iw − 3 = 0
      (Δ = −64 < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).)
      = w = −3i ou w = −i/3   ← formule du trinôme
    — Les solutions en z :  [juge cfamily]  départ : w = −3i ou w = −i/3
      = z = −i·Log(−3i) + 2kπ ou z = −i·Log(−i/3) + 2kπ ; k ∈ ℤ   ← z = −i Log w + 2kπ
      = z = −π/2 − i·ln(3) + 2kπ ou z = −π/2 + i·ln(3) + 2kπ ; k ∈ ℤ   ← Log w = ln|w| + i Arg w

```

## Cauchy-Riemann et holomorphie (`c-cauchy-riemann`, BA3)

_u_x = v_y et u_y = −v_x sur un ouvert ; alors f′ = u_x + i v_x._

### Niveau 1

```
f(z) = e^z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  ∂/∂x (e^x·cos(y))
    (On a u = e^x·cos(y) et v = e^x·sin(y).)
    = □   (trous : e^x·cos(y))   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (e^x·sin(y))
    = □   (trous : e^x·cos(y))   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (e^x·cos(y))
    = □   (trous : −e^x·sin(y))   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (e^x·sin(y))
    = □   (trous : e^x·sin(y))   ← y constante
  — u_x = v_y = e^x·cos(y) et u_y = −v_x = −e^x·sin(y) partout : f est holomorphe sur ℂ, et f′ = u_x + i v_x.  [juge cvalue]  départ : e^x·cos(y) + i(e^x·sin(y))
    (Les équations de Cauchy-Riemann sont : u_x = v_y et u_y = −v_x.)
    = □   (trous : e^z)   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = e^x·cos(y), v_y = e^x·cos(y) | f′(z) = e^z
  pièges : g6_power_rule_exp

f(z) = z² + z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  ∂/∂x (x² − y² + x)
    (On a u = x² − y² + x et v = 2xy + y.)
    = □   (trous : 2x + 1)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (2xy + y)
    = □   (trous : 2x + 1)   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x² − y² + x)
    = □   (trous : −2y)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (2xy + y)
    = □   (trous : 2y)   ← y constante
  — u_x = v_y = 2x + 1 et u_y = −v_x = −2y partout : f est holomorphe sur ℂ, et f′ = u_x + i v_x.  [juge cvalue]  départ : 2x + 1 + i(2y)
    (Les équations de Cauchy-Riemann sont : u_x = v_y et u_y = −v_x.)
    = □   (trous : 2z + 1)   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2x + 1, v_y = 2x + 1 | f′(z) = 2z + 1

f(z) = |z|² + i(−2x − 2y). Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  ∂/∂x (x² + y²)
    (On a u = x² + y² et v = −2x − 2y.)
    = □   (trous : 2x)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (−2x − 2y)
    = □   (trous : −2)   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x² + y²)
    = □   (trous : 2y)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (−2x − 2y)
    = □   (trous : −2)   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = −2 ; 2y = 2
    (Les équations de Cauchy-Riemann sont : u_x = v_y et u_y = −v_x.)
    = x = □ ; y = □   (trous : x = −1 ; y = 1)   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2x, v_y = −2 | 2x = −2 ; 2y = 2

```

### Niveau 2

```
f(z) = z² + 2z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  (x + iy)² + 2(x + iy)
    = x² + 2i·xy − y² + 2x + 2i·y   ← z = x + iy
    = x² − y² + 2x + i(□)   (trous : x² − y² + 2x + i(2xy + 2y))   ← regrouper les termes en i
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² − y² + 2x)
    = □   (trous : 2x + 2)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (2xy + 2y)
    = □   (trous : 2x + 2)   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x² − y² + 2x)
    = □   (trous : −2y)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (2xy + 2y)
    = □   (trous : 2y)   ← y constante
  — u_x = v_y = 2x + 2 et u_y = −v_x = −2y partout : f est holomorphe sur ℂ, et f′ = u_x + i v_x.  [juge cvalue]  départ : 2x + 2 + i(2y)
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = □   (trous : 2z + 2)   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2x + 2, v_y = 2x + 2 | f′(z) = 2z + 2
  pièges : c_cr_sign

f(z) = z·Re(z). Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  (x + iy)x
    = x² + i·□   (trous : x² + i·xy)   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x²)
    = □   (trous : 2x)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (xy)
    = □   (trous : x)   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x²)
    = □   (trous : 0)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (xy)
    = □   (trous : y)   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = x ; 0 = −y
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = x = □ ; y = □   (trous : x = 0 ; y = 0)   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2x, v_y = x | 2x = x ; 0 = −y
  pièges : c_cr_sign

f(z) = |z + 2|². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [guided]  |x + 2 + iy|²
    = □   (trous : (x + 2)² + y²)   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x ((x + 2)² + y²)
    = □   (trous : 2(x + 2))   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (0)
    = □   (trous : 0)   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y ((x + 2)² + y²)
    = □   (trous : 2y)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (0)
    = □   (trous : 0)   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2(x + 2) = 0 ; 2y = 0
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = x = □ ; y = □   (trous : x = −2 ; y = 0)   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2(x + 2), v_y = 0 | 2(x + 2) = 0 ; 2y = 0
  pièges : c_cr_sign

```

### Niveau 3

```
f(z) = z³. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [tap, suivre l'erreur, menu menu]  (x + iy)³
    ? Comment étudier f ? ✔ Écrire u et v, puis vérifier Cauchy-Riemann / ✔ Reconnaître une fonction holomorphe connue
    = x³ − 3xy² + i(3x²y − y³)   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x³ − 3xy²)
    = 3x² − 3y²   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (3x²y − y³)
    = 3x² − 3y²   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x³ − 3xy²)
    = −6xy   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (3x²y − y³)
    = 6xy   ← y constante
  — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 3x² − 3y² + i(6xy)
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = 3z²   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 3x² − 3y², v_y = 3x² − 3y² | f′(z) = 3z²
  pièges : c_cr_sign

f(z) = z³. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [tap, suivre l'erreur, menu menu]  (x + iy)³
    ? Comment étudier f ? ✔ Écrire u et v, puis vérifier Cauchy-Riemann / ✔ Reconnaître une fonction holomorphe connue
    = x³ − 3xy² + i(3x²y − y³)   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x³ − 3xy²)
    = 3x² − 3y²   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (3x²y − y³)
    = 3x² − 3y²   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x³ − 3xy²)
    = −6xy   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (3x²y − y³)
    = 6xy   ← y constante
  — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 3x² − 3y² + i(6xy)
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = 3z²   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 3x² − 3y², v_y = 3x² − 3y² | f′(z) = 3z²
  pièges : c_cr_sign

f(z) = |z + 1 − 2i|². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [tap, suivre l'erreur, menu menu]  |x + 1 + iy − 2i|²
    ? Comment étudier f ? ✔ Écrire u et v, puis vérifier Cauchy-Riemann / · Reconnaître une fonction holomorphe connue
    = (x + 1)² + (y − 2)²   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x ((x + 1)² + (y − 2)²)
    = 2(x + 1)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (0)
    = 0   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y ((x + 1)² + (y − 2)²)
    = 2(y − 2)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (0)
    = 0   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2(x + 1) = 0 ; 2(y − 2) = 0
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = x = −1 ; y = 2   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2(x + 1), v_y = 0 | 2(x + 1) = 0 ; 2(y − 2) = 0
  pièges : c_conj_not_holo, c_cr_sign

```

### Niveau 4

```
f(z) = z³. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [free, suivre l'erreur]  (x + iy)³
    = x³ − 3xy² + i(3x²y − y³)   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x³ − 3xy²)
    = 3x² − 3y²   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (3x²y − y³)
    = 3x² − 3y²   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x³ − 3xy²)
    = −6xy   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (3x²y − y³)
    = 6xy   ← y constante
  — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 3x² − 3y² + i(6xy)
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = 3z²   ← écrire en z = x + iy
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 3x² − 3y², v_y = 3x² − 3y² | f′(z) = 3z²
  pièges : c_cr_sign

f(z) = z·Re(z). Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [free, suivre l'erreur]  (x + iy)x
    = x² + i·xy   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x²)
    = 2x   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (xy)
    = x   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y (x²)
    = 0   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (xy)
    = y   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = x ; 0 = −y
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = x = 0 ; y = 0   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2x, v_y = x | 2x = x ; 0 = −y
  pièges : c_cr_sign

f(z) = |z + 1 + i|². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
  [free, suivre l'erreur]  |x + 1 + iy + i|²
    = (x + 1)² + (y + 1)²   ← z = x + iy
  — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x ((x + 1)² + (y + 1)²)
    = 2(x + 1)   ← y constante
  — Puis v_y :  [juge equiv]  départ : ∂/∂y (0)
    = 0   ← x constante
  — u_y :  [juge equiv]  départ : ∂/∂y ((x + 1)² + (y + 1)²)
    = 2(y + 1)   ← x constante
  — v_x :  [juge equiv]  départ : ∂/∂x (0)
    = 0   ← y constante
  — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2(x + 1) = 0 ; 2(y + 1) = 0
    ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
    = x = −1 ; y = −1   ← un seul point : f n'est holomorphe sur aucun ouvert
  aides : Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x. | u_x = 2(x + 1), v_y = 0 | 2(x + 1) = 0 ; 2(y + 1) = 0
  pièges : c_cr_sign

```

### Niveau 5

```
Étudie l'holomorphie des deux fonctions (Cauchy-Riemann).
  [problème, 6 points]
  partie 1 (Première fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Conclus, et calcule la dérivée : 0,5)
  f(z) = z² − z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  (x + iy)² − (x + iy)
      = x² + 2i·xy − y² − x − i·y   ← z = x + iy
      = x² − y² − x + i(2xy − y)   ← regrouper les termes en i
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² − y² − x)
      = 2x − 1   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (2xy − y)
      = 2x − 1   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x² − y² − x)
      = −2y   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (2xy − y)
      = 2y   ← y constante
    — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 2x − 1 + i(2y)
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = 2z − 1   ← écrire en z = x + iy
  partie 2 (Seconde fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Cauchy-Riemann n'est vérifié qu'aux points solutions du système : 0,5)
  f(z) = |z + 2 − i|². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  |x + 2 + iy − i|²
      = (x + 2)² + (y − 1)²   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x ((x + 2)² + (y − 1)²)
      = 2(x + 2)   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (0)
      = 0   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y ((x + 2)² + (y − 1)²)
      = 2(y − 1)   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (0)
      = 0   ← y constante
    — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2(x + 2) = 0 ; 2(y − 1) = 0
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = x = −2 ; y = 1   ← un seul point : f n'est holomorphe sur aucun ouvert
  pièges : c_cr_sign

Étudie l'holomorphie des deux fonctions (Cauchy-Riemann).
  [problème, 6 points]
  partie 1 (Première fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Conclus, et calcule la dérivée : 0,5)
  f(z) = z² + 2z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  (x + iy)² + 2(x + iy)
      = x² + 2i·xy − y² + 2x + 2i·y   ← z = x + iy
      = x² − y² + 2x + i(2xy + 2y)   ← regrouper les termes en i
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² − y² + 2x)
      = 2x + 2   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (2xy + 2y)
      = 2x + 2   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x² − y² + 2x)
      = −2y   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (2xy + 2y)
      = 2y   ← y constante
    — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 2x + 2 + i(2y)
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = 2z + 2   ← écrire en z = x + iy
  partie 2 (Seconde fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Cauchy-Riemann n'est vérifié qu'aux points solutions du système : 0,5)
  f(z) = |z + i|². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  |x + iy + i|²
      = x² + (y + 1)²   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² + (y + 1)²)
      = 2x   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (0)
      = 0   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x² + (y + 1)²)
      = 2(y + 1)   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (0)
      = 0   ← y constante
    — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = 0 ; 2(y + 1) = 0
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = x = 0 ; y = −1   ← un seul point : f n'est holomorphe sur aucun ouvert
  pièges : c_cr_sign

Étudie l'holomorphie des deux fonctions (Cauchy-Riemann).
  [problème, 6 points]
  partie 1 (Première fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Conclus, et calcule la dérivée : 0,5)
  f(z) = z³. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  (x + iy)³
      = x³ − 3xy² + i(3x²y − y³)   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x³ − 3xy²)
      = 3x² − 3y²   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (3x²y − y³)
      = 3x² − 3y²   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x³ − 3xy²)
      = −6xy   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (3x²y − y³)
      = 6xy   ← y constante
    — Conclus, et calcule la dérivée :  [juge cvalue]  départ : 3x² − 3y² + i(6xy)
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = 3z²   ← écrire en z = x + iy
  partie 2 (Seconde fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Cauchy-Riemann n'est vérifié qu'aux points solutions du système : 0,5)
  f(z) = |z|² + i(−4x + 6y). Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  |x + iy|² + i(−4x + 6y)
      = x² + y² + i(−4x + 6y)   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² + y²)
      = 2x   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (−4x + 6y)
      = 6   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x² + y²)
      = 2y   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (−4x + 6y)
      = −4   ← y constante
    — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = 6 ; 2y = 4
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = x = 3 ; y = 2   ← un seul point : f n'est holomorphe sur aucun ouvert
  pièges : c_cr_sign

```

### Variantes d'examen

```
Laquelle de ces fonctions est holomorphe sur ℂ (z = x + iy) ?
  · f(z) = z·Re(z) [c_conj_not_holo]   ✔ f(z) = e^z   · f(z) = Im(z) [c_conj_not_holo]   · f(z) = x² − y² + i(2xy + y)
  [examen mcq]
  pièges : c_conj_not_holo

Étudie l'holomorphie des deux fonctions (Cauchy-Riemann).
  [problème, examen open, 6 points]
  partie 1 (Première fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Conclus, et calcule la dérivée : 0,5)
  f(z) = e^z. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  e^(x + iy)
      = e^x·cos(y) + i·e^x·sin(y)   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (e^x·cos(y))
      = e^x·cos(y)   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (e^x·sin(y))
      = e^x·cos(y)   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (e^x·cos(y))
      = −e^x·sin(y)   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (e^x·sin(y))
      = e^x·sin(y)   ← y constante
    — Conclus, et calcule la dérivée :  [juge cvalue]  départ : e^x·cos(y) + i(e^x·sin(y))
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = e^z   ← écrire en z = x + iy
  partie 2 (Seconde fonction : 0,5 ; Les dérivées partielles : 0,5 ; Puis v_y : 0,5 ; u_y : 0,5 ; v_x : 0,5 ; Cauchy-Riemann n'est vérifié qu'aux points solutions du système : 0,5)
  f(z) = z̄². Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.
    [free, sans aide, suivre l'erreur]  (x − iy)²
      = x² − y² − 2i·xy   ← z = x + iy
    — Les dérivées partielles :  [juge equiv]  départ : ∂/∂x (x² − y²)
      = 2x   ← y constante
    — Puis v_y :  [juge equiv]  départ : ∂/∂y (−2xy)
      = −2x   ← x constante
    — u_y :  [juge equiv]  départ : ∂/∂y (x² − y²)
      = −2y   ← x constante
    — v_x :  [juge equiv]  départ : ∂/∂x (−2xy)
      = −2y   ← y constante
    — Cauchy-Riemann n'est vérifié qu'aux points solutions du système :  [juge system]  départ : 2x = −2x ; −2y = 2y
      ? Les équations de Cauchy-Riemann sont : ✔ u_x = v_y et u_y = −v_x / · u_x = v_y et u_y = v_x / · u_x = u_y et v_x = v_y
      = x = 0 ; y = 0   ← un seul point : f n'est holomorphe sur aucun ouvert
  pièges : c_cr_sign

```

## Construire f holomorphe à partir de v (`c-harmonic-conj`, BA3)

_Δv = 0, puis u par Cauchy-Riemann, puis f en z, à une constante réelle près._

### Niveau 1

```
Trouve f holomorphe sur ℂ telle que Im(f) = 2xy − 3y, et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (2xy − 3y)) + ∂/∂y (∂/∂y (2xy − 3y))
    (v doit être harmonique :)
    = □   (trous : 0)   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (2x − 3) dx
    = u = □ + α(y)   (trous : u = x² − 3x + α(y))   ← u_x = v_y, intégré en x
    = u = x² − 3x□ + C   (trous : u = x² − 3x − y² + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : x² − 3x − y² + C + i(2xy − 3y)
    (La constante C est : réelle : Im f = v est imposée.)
    = □ + C   (trous : z² − 3z + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = x² − 3x + α(y) | u = x² − 3x − y² + C

Trouve f holomorphe sur ℂ telle que Im(f) = −2xy + 3x²y − y³ − 2y, et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (−2xy + 3x²y − y³ − 2y)) + ∂/∂y (∂/∂y (−2xy + 3x²y − y³ − 2y))
    (v doit être harmonique :)
    = □ − 6y   (trous : 6y − 6y)   ← v_xx + v_yy
    = □   (trous : 0)
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (−2x + 3x² − 3y² − 2) dx
    = u = □ + α(y)   (trous : u = −x² + x³ − 3xy² − 2x + α(y))   ← u_x = v_y, intégré en x
    = u = −x² + x³ − 3x□ − 2x + y² + C   (trous : u = −x² + x³ − 3xy² − 2x + y² + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : −x² + x³ − 3xy² − 2x + y² + C + i(−2xy + 3x²y − y³ − 2y)
    (La constante C est : réelle : Im f = v est imposée.)
    = □ + C   (trous : z³ − z² − 2z + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = −x² + x³ − 3xy² − 2x + α(y) | u = −x² + x³ − 3xy² − 2x + y² + C

Trouve f holomorphe sur ℂ telle que Im(f) = 3y + x² − y², et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (3y + x² − y²)) + ∂/∂y (∂/∂y (3y + x² − y²))
    (v doit être harmonique :)
    = □ − 2   (trous : 2 − 2)   ← v_xx + v_yy
    = □   (trous : 0)
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (3 − 2y) dx
    = u = □ + α(y)   (trous : u = 3x − 2xy + α(y))   ← u_x = v_y, intégré en x
    = u = □ + C   (trous : u = 3x − 2xy + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : 3x − 2xy + C + i(3y + x² − y²)
    (La constante C est : réelle : Im f = v est imposée.)
    = □ + C   (trous : i·z² + 3z + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 3x − 2xy + α(y) | u = 3x − 2xy + C

```

### Niveau 2

```
Trouve f holomorphe sur ℂ telle que Im(f) = −2xy + 2y, et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (−2xy + 2y)) + ∂/∂y (∂/∂y (−2xy + 2y))
    (v doit être harmonique :)
    = □   (trous : 0)   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (−2x + 2) dx
    = u = □ + α(y)   (trous : u = −x² + 2x + α(y))   ← u_x = v_y, intégré en x
    = u = −x² + 2x + □ + C   (trous : u = −x² + 2x + y² + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : −x² + 2x + y² + C + i(−2xy + 2y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = □ + C   (trous : −z² + 2z + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = −x² + 2x + α(y) | u = −x² + 2x + y² + C
  pièges : c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 4xy − 3y, et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (4xy − 3y)) + ∂/∂y (∂/∂y (4xy − 3y))
    (v doit être harmonique :)
    = □   (trous : 0)   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (4x − 3) dx
    = u = □ + α(y)   (trous : u = 2x² − 3x + α(y))   ← u_x = v_y, intégré en x
    = u = 2x² − 3x□ + C   (trous : u = 2x² − 3x − 2y² + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : 2x² − 3x − 2y² + C + i(4xy − 3y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = □ + C   (trous : 2z² − 3z + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 2x² − 3x + α(y) | u = 2x² − 3x − 2y² + C
  pièges : c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 2xy, et écris-la en z.
  [guided]  ∂/∂x (∂/∂x (2xy)) + ∂/∂y (∂/∂y (2xy))
    (v doit être harmonique :)
    = □   (trous : 0)   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ 2x dx
    = u = □ + α(y)   (trous : u = x² + α(y))   ← u_x = v_y, intégré en x
    = u = x²□ + C   (trous : u = x² − y² + C)   ← u_y = −v_x fixe α(y)
  — Sur l'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :  [juge cvalue]  départ : x² − y² + C + i(2xy)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = □ + C   (trous : z² + C)   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = x² + α(y) | u = x² − y² + C
  pièges : c_harmonic_const_imag

```

### Niveau 3

```
Trouve f holomorphe sur ℂ telle que Im(f) = 6xy + 3x²y − y³ − 3y, et écris-la en z.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (∂/∂x (6xy + 3x²y − y³ − 3y)) + ∂/∂y (∂/∂y (6xy + 3x²y − y³ − 3y))
    (v doit être harmonique :)
    = 6y − 6y   ← v_xx + v_yy
    = 0
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (6x + 3x² − 3y² − 3) dx
    ? Comment trouver u ? ✔ Intégrer les équations de Cauchy-Riemann / ✔ Reconnaître Im de zⁿ, de e^z, de e^(z²) / · Intégrer u_y = v_x
    = u = 3x² + x³ − 3xy² − 3x + α(y)   ← u_x = v_y, intégré en x
    = u = 3x² + x³ − 3xy² − 3x − 3y² + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : 3x² + x³ − 3xy² − 3x − 3y² + C + i(6xy + 3x²y − y³ − 3y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = z³ + 3z² − 3z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 3x² + x³ − 3xy² − 3x + α(y) | u = 3x² + x³ − 3xy² − 3x − 3y² + C
  pièges : c_cr_sign, c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 6xy + y, et écris-la en z.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (∂/∂x (6xy + y)) + ∂/∂y (∂/∂y (6xy + y))
    (v doit être harmonique :)
    = 0   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (6x + 1) dx
    ? Comment trouver u ? ✔ Intégrer les équations de Cauchy-Riemann / ✔ Reconnaître Im de zⁿ, de e^z, de e^(z²) / · Intégrer u_y = v_x
    = u = 3x² + x + α(y)   ← u_x = v_y, intégré en x
    = u = 3x² + x − 3y² + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : 3x² + x − 3y² + C + i(6xy + y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = 3z² + z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 3x² + x + α(y) | u = 3x² + x − 3y² + C
  pièges : c_cr_sign, c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 2y + x² − y², et écris-la en z.
  [tap, suivre l'erreur, menu menu]  ∂/∂x (∂/∂x (2y + x² − y²)) + ∂/∂y (∂/∂y (2y + x² − y²))
    (v doit être harmonique :)
    = 2 − 2   ← v_xx + v_yy
    = 0
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (2 − 2y) dx
    ? Comment trouver u ? ✔ Intégrer les équations de Cauchy-Riemann / ✔ Reconnaître Im de zⁿ, de e^z, de e^(z²) / · Intégrer u_y = v_x
    = u = 2x − 2xy + α(y)   ← u_x = v_y, intégré en x
    = u = 2x − 2xy + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : 2x − 2xy + C + i(2y + x² − y²)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = i·z² + 2z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 2x − 2xy + α(y) | u = 2x − 2xy + C
  pièges : c_cr_sign, c_harmonic_const_imag

```

### Niveau 4

```
Trouve f holomorphe sur ℂ telle que Im(f) = 6xy + 3x²y − y³ + y, et écris-la en z.
  [free, suivre l'erreur]  ∂/∂x (∂/∂x (6xy + 3x²y − y³ + y)) + ∂/∂y (∂/∂y (6xy + 3x²y − y³ + y))
    (v doit être harmonique :)
    = 6y − 6y   ← v_xx + v_yy
    = 0
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (6x + 3x² − 3y² + 1) dx
    = u = 3x² + x³ − 3xy² + x + α(y)   ← u_x = v_y, intégré en x
    = u = 3x² + x³ − 3xy² + x − 3y² + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : 3x² + x³ − 3xy² + x − 3y² + C + i(6xy + 3x²y − y³ + y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = z³ + 3z² + z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 3x² + x³ − 3xy² + x + α(y) | u = 3x² + x³ − 3xy² + x − 3y² + C
  pièges : c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 4xy + 2y, et écris-la en z.
  [free, suivre l'erreur]  ∂/∂x (∂/∂x (4xy + 2y)) + ∂/∂y (∂/∂y (4xy + 2y))
    (v doit être harmonique :)
    = 0   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (4x + 2) dx
    = u = 2x² + 2x + α(y)   ← u_x = v_y, intégré en x
    = u = 2x² + 2x − 2y² + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : 2x² + 2x − 2y² + C + i(4xy + 2y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = 2z² + 2z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = 2x² + 2x + α(y) | u = 2x² + 2x − 2y² + C
  pièges : c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 2xy + y, et écris-la en z.
  [free, suivre l'erreur]  ∂/∂x (∂/∂x (2xy + y)) + ∂/∂y (∂/∂y (2xy + y))
    (v doit être harmonique :)
    = 0   ← v_xx + v_yy
  — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (2x + 1) dx
    = u = x² + x + α(y)   ← u_x = v_y, intégré en x
    = u = x² + x − y² + C   ← u_y = −v_x fixe α(y)
  — f = u + iv, écrite en z :  [juge cvalue]  départ : x² + x − y² + C + i(2xy + y)
    ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
    = z² + z + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  aides : Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. | u = x² + x + α(y) | u = x² + x − y² + C
  pièges : c_harmonic_const_imag

```

### Niveau 5

```
Trouve f holomorphe sur ℂ telle que Im(f) = 3x²y − y³ + x² − y² + e^(x² − y²)·sin(2xy), et écris-la en z.
  [problème, 5 points]
  partie 1 (Début du problème : 1 ; u_x = v_y, intégré en x, puis u_y = −v_x : 2 ; f = u + iv, écrite en z : 2)
    [free, sans aide, suivre l'erreur]  ∂/∂x (∂/∂x (3x²y − y³ + x² − y² + e^(x² − y²)·sin(2xy))) + ∂/∂y (∂/∂y (3x²y − y³ + x² − y² + e^(x² − y²)·sin(2xy)))
      (v doit être harmonique :)
      = 0   ← v_xx + v_yy
    — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (3x² − 3y² − 2y + 2e^(x² − y²)(x·cos(2xy) − y·sin(2xy))) dx
      = u = x³ − 3xy² − 2xy + e^(x² − y²)·cos(2xy) + α(y)   ← u_x = v_y, intégré en x
      = u = x³ − 3xy² − 2xy + e^(x² − y²)·cos(2xy) + C   ← u_y = −v_x fixe α(y)
    — f = u + iv, écrite en z :  [juge cvalue]  départ : x³ − 3xy² − 2xy + e^(x² − y²)·cos(2xy) + C + i(3x²y − y³ + x² − y² + e^(x² − y²)·sin(2xy))
      ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
      = z³ + i·z² + e^(z²) + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  pièges : g6_product_naive, g6_chain_forgot, g2_exp_sum, c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 3x²y − y³ + 2y + e^(x² − y²)·sin(2xy), et écris-la en z.
  [problème, 5 points]
  partie 1 (Début du problème : 1 ; u_x = v_y, intégré en x, puis u_y = −v_x : 2 ; f = u + iv, écrite en z : 2)
    [free, sans aide, suivre l'erreur]  ∂/∂x (∂/∂x (3x²y − y³ + 2y + e^(x² − y²)·sin(2xy))) + ∂/∂y (∂/∂y (3x²y − y³ + 2y + e^(x² − y²)·sin(2xy)))
      (v doit être harmonique :)
      = 0   ← v_xx + v_yy
    — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (3x² − 3y² + 2 + 2e^(x² − y²)(x·cos(2xy) − y·sin(2xy))) dx
      = u = x³ − 3xy² + 2x + e^(x² − y²)·cos(2xy) + α(y)   ← u_x = v_y, intégré en x
      = u = x³ − 3xy² + 2x + e^(x² − y²)·cos(2xy) + C   ← u_y = −v_x fixe α(y)
    — f = u + iv, écrite en z :  [juge cvalue]  départ : x³ − 3xy² + 2x + e^(x² − y²)·cos(2xy) + C + i(3x²y − y³ + 2y + e^(x² − y²)·sin(2xy))
      ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
      = z³ + 2z + e^(z²) + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  pièges : g6_product_naive, g6_chain_forgot, g2_exp_sum, c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 3x²y − y³ + e^(x² − y²)·sin(2xy), et écris-la en z.
  [problème, 5 points]
  partie 1 (Début du problème : 1 ; u_x = v_y, intégré en x, puis u_y = −v_x : 2 ; f = u + iv, écrite en z : 2)
    [free, sans aide, suivre l'erreur]  ∂/∂x (∂/∂x (3x²y − y³ + e^(x² − y²)·sin(2xy))) + ∂/∂y (∂/∂y (3x²y − y³ + e^(x² − y²)·sin(2xy)))
      (v doit être harmonique :)
      = 0   ← v_xx + v_yy
    — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (3x² − 3y² + 2e^(x² − y²)(x·cos(2xy) − y·sin(2xy))) dx
      = u = x³ − 3xy² + e^(x² − y²)·cos(2xy) + α(y)   ← u_x = v_y, intégré en x
      = u = x³ − 3xy² + e^(x² − y²)·cos(2xy) + C   ← u_y = −v_x fixe α(y)
    — f = u + iv, écrite en z :  [juge cvalue]  départ : x³ − 3xy² + e^(x² − y²)·cos(2xy) + C + i(3x²y − y³ + e^(x² − y²)·sin(2xy))
      ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
      = z³ + e^(z²) + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  pièges : g6_product_naive, g6_chain_forgot, g2_exp_sum, c_harmonic_const_imag

```

### Variantes d'examen

```
f est holomorphe sur ℂ et Im(f) = 6xy − 2y. Alors :
  · f(z) = 3z² − 2z + C, C ∈ ℂ [c_harmonic_const_imag]   ✔ f(z) = 3z² − 2z + C, C ∈ ℝ   · f(z) = 3z̄² − 2z + C, C ∈ ℝ [c_cr_sign]   · f(z) = i(3z² − 2z) + C, C ∈ ℝ
  [examen mcq]
  pièges : c_cr_sign, c_harmonic_const_imag

Trouve f holomorphe sur ℂ telle que Im(f) = 3x²y − y³ + e^(x² − y²)·sin(2xy), et écris-la en z.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1 ; u_x = v_y, intégré en x, puis u_y = −v_x : 2 ; f = u + iv, écrite en z : 2)
    [free, sans aide, suivre l'erreur]  ∂/∂x (∂/∂x (3x²y − y³ + e^(x² − y²)·sin(2xy))) + ∂/∂y (∂/∂y (3x²y − y³ + e^(x² − y²)·sin(2xy)))
      (v doit être harmonique :)
      = 0   ← v_xx + v_yy
    — u_x = v_y, intégré en x, puis u_y = −v_x :  [juge antideriv]  départ : u = ∫ (3x² − 3y² + 2e^(x² − y²)(x·cos(2xy) − y·sin(2xy))) dx
      = u = x³ − 3xy² + e^(x² − y²)·cos(2xy) + α(y)   ← u_x = v_y, intégré en x
      = u = x³ − 3xy² + e^(x² − y²)·cos(2xy) + C   ← u_y = −v_x fixe α(y)
    — f = u + iv, écrite en z :  [juge cvalue]  départ : x³ − 3xy² + e^(x² − y²)·cos(2xy) + C + i(3x²y − y³ + e^(x² − y²)·sin(2xy))
      ? La constante C est : ✔ réelle : Im f = v est imposée / · complexe quelconque
      = z³ + e^(z²) + C   ← f(x) = u(x, 0) + i v(x, 0), puis x → z
  pièges : g6_product_naive, g6_chain_forgot, g2_exp_sum, c_harmonic_const_imag

```

## Intégrales de contour par paramétrisation (`c-contour-param`, BA3)

_∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramétrer, dériver, remplacer, intégrer._

### Niveau 1

```
Calcule ∫_γ z̄ dz, où γ est le segment de 2 à −i.
  [guided]  d/dt (2 + (−2 − i)t)
    (γ(t) = 2 + (−2 − i)t, t ∈ [0 ; 1].)
    = □   (trous : −2 − i)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(2 + (−2 − i)t)
    = □   (trous : −4 − 2i + 5t)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−4 − 2i + 5t) dt
    = □   (trous : −3/2 − 2i)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 2 + (−2 − i)t, γ′(t) = −2 − i | −4 − 2i + 5t

Calcule ∫_γ z̄ dz, où γ est le cercle |z| = 1, parcouru une fois dans le sens positif.
  [guided]  d/dt (e^(it))
    (γ(t) = e^(it), t ∈ [0 ; 2π].)
    = □   (trous : ie^(it))   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(e^(it))
    = □   (trous : i)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{2π} i dt
    = □   (trous : 2πi)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = e^(it), γ′(t) = ie^(it) | i

Calcule ∫_γ 1/z dz, où γ est le cercle |z| = 2, parcouru une fois dans le sens positif.
  [guided]  d/dt (2e^(it))
    (γ(t) = 2e^(it), t ∈ [0 ; 2π].)
    = □   (trous : 2ie^(it))   ← dériver en t
  — On remplace z par γ(t) dans f(z) = 1/z, et dz = γ′(t) dt :  [juge cvalue]  départ : 1/(2e^(it))
    = □   (trous : i)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{2π} i dt
    = □   (trous : 2πi)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 2e^(it), γ′(t) = 2ie^(it) | i

```

### Niveau 2

```
Calcule ∫_γ Re(z) dz, où γ est le segment de −i à 1.
  [guided]  γ : segment de −i à 1
    (γ est le segment de −i à 1 :)
    = γ(t)=□,t∈[0;1]   (trous : γ(t) = -i+(1+i)t, t ∈ [0 ; 1])   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (−i + (1 + i)t)
    = □   (trous : 1 + i)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = Re(z), et dz = γ′(t) dt :  [juge cvalue]  départ : Re(−i + (1 + i)t)
    = □   (trous : (1 + i)t)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (1 + i)t dt
    = □   (trous : 1/2 + i/2)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = −i + (1 + i)t, γ′(t) = 1 + i | (1 + i)t

Calcule ∫_γ z² dz, où γ est le segment de −i à 2.
  [guided]  γ : segment de −i à 2
    (γ est le segment de −i à 2 :)
    = γ(t)=□,t∈[0;1]   (trous : γ(t) = -i+(2+i)t, t ∈ [0 ; 1])   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (−i + (2 + i)t)
    = □   (trous : 2 + i)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z², et dz = γ′(t) dt :  [juge cvalue]  départ : (−i + (2 + i)t)²
    = □   (trous : −2 − i + (8 − 6i)t + (2 + 11i)t²)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−2 − i + (8 − 6i)t + (2 + 11i)t²) dt
    = □   (trous : 8/3 − i/3)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = −i + (2 + i)t, γ′(t) = 2 + i | −2 − i + (8 − 6i)t + (2 + 11i)t²

Calcule ∫_γ z² dz, où γ est le segment de i à 2.
  [guided]  γ : segment de i à 2
    (γ est le segment de i à 2 :)
    = γ(t)=□,t∈[0;1]   (trous : γ(t) = i+(2-i)t, t ∈ [0 ; 1])   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (i + (2 − i)t)
    = □   (trous : 2 − i)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z², et dz = γ′(t) dt :  [juge cvalue]  départ : (i + (2 − i)t)²
    = □   (trous : −2 + i + (8 + 6i)t + (2 − 11i)t²)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−2 + i + (8 + 6i)t + (2 − 11i)t²) dt
    = □   (trous : 8/3 + i/3)   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = i + (2 − i)t, γ′(t) = 2 − i | −2 + i + (8 + 6i)t + (2 − 11i)t²

```

### Niveau 3

```
Calcule ∫_γ 1/z dz, où γ est le cercle |z| = 2, parcouru une fois dans le sens positif.
  [tap, suivre l'erreur, menu menu]  γ : cercle de centre 0 et de rayon 2
    (γ est le cercle |z| = 2, parcouru une fois dans le sens positif :)
    = γ(t) = 2e^(it), t ∈ [0 ; 2π]   ← z₀ + Re^(it)
  — Sa dérivée :  [juge cvalue]  départ : d/dt (2e^(it))
    = 2ie^(it)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = 1/z, et dz = γ′(t) dt :  [juge cvalue]  départ : 1/(2e^(it))
    = i   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{2π} i dt
    = 2πi   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 2e^(it), γ′(t) = 2ie^(it) | i

Calcule ∫_γ z² dz, où γ est le segment de 2 à −i.
  [tap, suivre l'erreur, menu menu]  γ : segment de 2 à −i
    (γ est le segment de 2 à −i :)
    = γ(t) = 2+(-2-i)t, t ∈ [0 ; 1]   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (2 + (−2 − i)t)
    = −2 − i   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z², et dz = γ′(t) dt :  [juge cvalue]  départ : (2 + (−2 − i)t)²
    = −8 − 4i + (12 + 16i)t + (−2 − 11i)t²   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−8 − 4i + (12 + 16i)t + (−2 − 11i)t²) dt
    = −8/3 + i/3   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 2 + (−2 − i)t, γ′(t) = −2 − i | −8 − 4i + (12 + 16i)t + (−2 − 11i)t²

Calcule ∫_γ z̄ dz, où γ est le segment de i à 2i.
  [tap, suivre l'erreur, menu menu]  γ : segment de i à 2i
    (γ est le segment de i à 2i :)
    = γ(t) = i+it, t ∈ [0 ; 1]   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (i + it)
    = i   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(i + it)
    = 1 + t   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (1 + t) dt
    = 3/2   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = i + it, γ′(t) = i | 1 + t

```

### Niveau 4

```
Calcule ∫_γ z² dz, où γ est le segment de 1 + i à −i.
  [free, suivre l'erreur]  γ : segment de 1 + i à −i
    (γ est le segment de 1 + i à −i :)
    = γ(t) = 1+i+(-1-2i)t, t ∈ [0 ; 1]   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (1 + i + (−1 − 2i)t)
    = −1 − 2i   ← dériver en t
  — On remplace z par γ(t) dans f(z) = z², et dz = γ′(t) dt :  [juge cvalue]  départ : (1 + i + (−1 − 2i)t)²
    = 4 − 2i + (−14 + 2i)t + (11 + 2i)t²   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (4 − 2i + (−14 + 2i)t + (11 + 2i)t²) dt
    = 2/3 − i/3   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 1 + i + (−1 − 2i)t, γ′(t) = −1 − 2i | 4 − 2i + (−14 + 2i)t + (11 + 2i)t²

Calcule ∫_γ Im(z) dz, où γ est le segment de 1 + i à i.
  [free, suivre l'erreur]  γ : segment de 1 + i à i
    (γ est le segment de 1 + i à i :)
    = γ(t) = 1+i-t, t ∈ [0 ; 1]   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (1 + i − t)
    = −1   ← dériver en t
  — On remplace z par γ(t) dans f(z) = Im(z), et dz = γ′(t) dt :  [juge cvalue]  départ : Im(1 + i − t)
    = −1   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} −1 dt
    = −1   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 1 + i − t, γ′(t) = −1 | −1

Calcule ∫_γ |z|² dz, où γ est le segment de 2 à −i.
  [free, suivre l'erreur]  γ : segment de 2 à −i
    (γ est le segment de 2 à −i :)
    = γ(t) = 2+(-2-i)t, t ∈ [0 ; 1]   ← p + (q − p)t
  — Sa dérivée :  [juge cvalue]  départ : d/dt (2 + (−2 − i)t)
    = −2 − i   ← dériver en t
  — On remplace z par γ(t) dans f(z) = |z|², et dz = γ′(t) dt :  [juge cvalue]  départ : |2 + (−2 − i)t|²
    = −8 − 4i + (16 + 8i)t + (−10 − 5i)t²   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−8 − 4i + (16 + 8i)t + (−10 − 5i)t²) dt
    = −10/3 − (5i)/3   ← intégrer en t
  aides : ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace. | γ(t) = 2 + (−2 − i)t, γ′(t) = −2 − i | −8 − 4i + (16 + 8i)t + (−10 − 5i)t²

```

### Niveau 5

```
Calcule ∫_γ Re(z) dz, où γ est le cercle |z + 1| = 2, parcouru une fois dans le sens positif.
  [free, sans aide]  γ : cercle de centre −1 et de rayon 2
    (γ est le cercle |z + 1| = 2, parcouru une fois dans le sens positif :)
    = γ(t) = -1+2e^(it), t ∈ [0 ; 2π]   ← z₀ + Re^(it)
  — Sa dérivée :  [juge cvalue]  départ : d/dt (−1 + 2e^(it))
    = 2ie^(it)   ← dériver en t
  — On remplace z par γ(t) dans f(z) = Re(z), et dz = γ′(t) dt :  [juge cvalue]  départ : Re(−1 + 2e^(it))
    = 2i(−1 + 2cos(t))e^(it)   ← f(γ(t))·γ′(t), simplifié
  — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{2π} 2i(−1 + 2cos(t))e^(it) dt
    = 4πi   ← intégrer en t

Compare ∫ z̄ dz de 4 à 0 sur deux chemins.
  [problème, 6 points]
  partie 1 (Le demi-cercle : 1 ; Sa dérivée : 0,5 ; On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt : 0,5 ; Puis l'intégrale en t : 0,5)
  ∫_γ z̄ dz, où γ est le demi-cercle supérieur |z − 2| = 2, de 4 à 0.
    [free, sans aide, suivre l'erreur]  γ : cercle de centre 2 et de rayon 2
      (γ est le demi-cercle supérieur |z − 2| = 2, de 4 à 0 :)
      = γ(t) = 2+2e^(it), t ∈ [0 ; π]   ← z₀ + Re^(it)
    — Sa dérivée :  [juge cvalue]  départ : d/dt (2 + 2e^(it))
      = 2ie^(it)   ← dériver en t
    — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(2 + 2e^(it))
      = 4i + 4ie^(it)   ← f(γ(t))·γ′(t), simplifié
    — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{π} (4i + 4ie^(it)) dt
      = −8 + 4πi   ← intégrer en t
  partie 2 (Le segment : 1 ; Sa dérivée : 0,5 ; On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt : 0,5 ; Puis l'intégrale en t : 0,5)
  ∫_γ z̄ dz, où γ est le segment de 4 à 0.
    [free, sans aide, suivre l'erreur]  γ : segment de 4 à 0
      (γ est le segment de 4 à 0 :)
      = γ(t) = 4-4t, t ∈ [0 ; 1]   ← p + (q − p)t
    — Sa dérivée :  [juge cvalue]  départ : d/dt (4 − 4t)
      = −4   ← dériver en t
    — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(4 − 4t)
      = −16 + 16t   ← f(γ(t))·γ′(t), simplifié
    — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−16 + 16t) dt
      = −8   ← intégrer en t
  partie 3 (Conclusion : 1)
  Les deux chemins ont les mêmes extrémités, mais les intégrales diffèrent. Pourquoi ?
    ✔ z̄ n'est pas holomorphe (u_x = 1, v_y = −1) : l'intégrale dépend du chemin.   · Les intégrales sont égales : il y a une erreur de calcul. [c_conj_not_holo]   · Le demi-cercle n'est pas une courbe fermée.   · Le segment est parcouru dans le mauvais sens.
  pièges : c_conj_not_holo

Compare ∫ z̄ dz de 4 à 0 sur deux chemins.
  [problème, 6 points]
  partie 1 (Le demi-cercle : 1 ; Sa dérivée : 0,5 ; On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt : 0,5 ; Puis l'intégrale en t : 0,5)
  ∫_γ z̄ dz, où γ est le demi-cercle supérieur |z − 2| = 2, de 4 à 0.
    [free, sans aide, suivre l'erreur]  γ : cercle de centre 2 et de rayon 2
      (γ est le demi-cercle supérieur |z − 2| = 2, de 4 à 0 :)
      = γ(t) = 2+2e^(it), t ∈ [0 ; π]   ← z₀ + Re^(it)
    — Sa dérivée :  [juge cvalue]  départ : d/dt (2 + 2e^(it))
      = 2ie^(it)   ← dériver en t
    — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(2 + 2e^(it))
      = 4i + 4ie^(it)   ← f(γ(t))·γ′(t), simplifié
    — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{π} (4i + 4ie^(it)) dt
      = −8 + 4πi   ← intégrer en t
  partie 2 (Le segment : 1 ; Sa dérivée : 0,5 ; On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt : 0,5 ; Puis l'intégrale en t : 0,5)
  ∫_γ z̄ dz, où γ est le segment de 4 à 0.
    [free, sans aide, suivre l'erreur]  γ : segment de 4 à 0
      (γ est le segment de 4 à 0 :)
      = γ(t) = 4-4t, t ∈ [0 ; 1]   ← p + (q − p)t
    — Sa dérivée :  [juge cvalue]  départ : d/dt (4 − 4t)
      = −4   ← dériver en t
    — On remplace z par γ(t) dans f(z) = z̄, et dz = γ′(t) dt :  [juge cvalue]  départ : conj(4 − 4t)
      = −16 + 16t   ← f(γ(t))·γ′(t), simplifié
    — Puis l'intégrale en t :  [juge cvalue]  départ : ∫_{0}^{1} (−16 + 16t) dt
      = −8   ← intégrer en t
  partie 3 (Conclusion : 1)
  Les deux chemins ont les mêmes extrémités, mais les intégrales diffèrent. Pourquoi ?
    · Le demi-cercle n'est pas une courbe fermée.   ✔ z̄ n'est pas holomorphe (u_x = 1, v_y = −1) : l'intégrale dépend du chemin.   · Les intégrales sont égales : il y a une erreur de calcul. [c_conj_not_holo]   · Le segment est parcouru dans le mauvais sens.
  pièges : c_conj_not_holo

```

### Variantes d'examen

```
∮ z̄ dz sur le cercle |z| = 1 (sens positif) vaut :
  ✔ 2πi   · πi   · 2π   · 0 [c_conj_not_holo]
  [examen mcq]
  pièges : c_conj_not_holo

```

## Théorème de Cauchy (`c-cauchy-thm`, BA3)

_f holomorphe sur un simplement connexe qui contient Γ : ∮ f dz = 0. Où sont les singularités ?_

### Niveau 1

```
Calcule ∮|z−i|=3f(z)dz pour f(z) = sin(z)/(z − 3) (sens positif).
  [guided]  I
    (La singularité de f est 3. Place chaque singularité, puis conclus.)
    (3 est à distance 3,16 du centre i, et le rayon vaut 3 : 3 est hors du disque fermé.)
    (Conclusion : f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy.)
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : 3 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.

Calcule ∮|z−i|=1f(z)dz pour f(z) = e^z/(z + 1) (sens positif).
  [guided]  I
    (La singularité de f est −1. Place chaque singularité, puis conclus.)
    (−1 est à distance 1,41 du centre i, et le rayon vaut 1 : −1 est hors du disque fermé.)
    (Conclusion : f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy.)
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −1 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.

Calcule ∮|z−i|=1f(z)dz pour f(z) = 1/((z + i)(z − 3)) (sens positif).
  [guided]  I
    (Les singularités de f sont −i et 3. Place chaque singularité, puis conclus.)
    (−i est à distance 2 du centre i, et le rayon vaut 1 : −i est hors du disque fermé.)
    (3 est à distance 3,16 du centre i, et le rayon vaut 1 : 3 est hors du disque fermé.)
    (Conclusion : f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy.)
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −i, 3 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.

```

### Niveau 2

```
Calcule ∮|z+1|=2f(z)dz pour f(z) = 1/(z + 2i) (sens positif).
  [guided]  z + 2i = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = □   (trous : z = −2i)   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? −2i est à distance 2,24 du centre −1, et le rayon vaut 2 : −2i est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −2i | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z|=1,5f(z)dz pour f(z) = 1/cos(z) (sens positif).
  [guided]  cos(z) = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = □ + kπ ; k ∈ ℤ   (trous : z = π/2 + kπ ; k ∈ ℤ)   ← cos z = 0 ⇔ z = π/2 + kπ (aussi dans ℂ)
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? −π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : −π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | cos(z) = 0 ⇔ z = π/2 + kπ | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_exp_periodic, c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z−i|=0,5f(z)dz pour f(z) = z/(z − 1) (sens positif).
  [guided]  z − 1 = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = □   (trous : z = 1)   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? 1 est à distance 1,41 du centre i, et le rayon vaut 0,5 : 1 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = □   (trous : 0)   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : 1 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

```

### Niveau 3

```
Calcule ∮|z−i|=0,5f(z)dz pour f(z) = sin(z)/(z + 2i) (sens positif).
  [tap, suivre l'erreur, menu menu]  z + 2i = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = −2i   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? −2i est à distance 3 du centre i, et le rayon vaut 0,5 : −2i est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −2i | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z−i|=0,5f(z)dz pour f(z) = z/(z + 1) (sens positif).
  [tap, suivre l'erreur, menu menu]  z + 1 = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = −1   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? −1 est à distance 1,41 du centre i, et le rayon vaut 0,5 : −1 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −1 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z|=1,5f(z)dz pour f(z) = e^z/cos(z) (sens positif).
  [tap, suivre l'erreur, menu menu]  cos(z) = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = π/2 + kπ ; k ∈ ℤ   ← cos z = 0 ⇔ z = π/2 + kπ (aussi dans ℂ)
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? −π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : −π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | cos(z) = 0 ⇔ z = π/2 + kπ | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_exp_periodic, c_pole_outside_counted, c_pole_on_contour

```

### Niveau 4

```
Calcule ∮|z|=1,5f(z)dz pour f(z) = e^z/cos(z) (sens positif).
  [free, suivre l'erreur]  cos(z) = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = π/2 + kπ ; k ∈ ℤ   ← cos z = 0 ⇔ z = π/2 + kπ (aussi dans ℂ)
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? −π/2 est à distance 1,57 du centre 0, et le rayon vaut 1,5 : −π/2 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | cos(z) = 0 ⇔ z = π/2 + kπ | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_exp_periodic, c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z−2|=0,5f(z)dz pour f(z) = z²/(z + 1) (sens positif).
  [free, suivre l'erreur]  z + 1 = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = −1   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? −1 est à distance 3 du centre 2, et le rayon vaut 0,5 : −1 est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −1 | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

Calcule ∮|z+1|=1f(z)dz pour f(z) = z/((z + 2i)²(z + i)) (sens positif).
  [free, suivre l'erreur]  (z + 2i)²(z + i) = 0
    (Les singularités sont les zéros du dénominateur :)
    = z = −2i ou z = −i   ← zéros du dénominateur
  — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
    ? −2i est à distance 2,24 du centre −1, et le rayon vaut 1 : −2i est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? −i est à distance 1,41 du centre −1, et le rayon vaut 1 : −i est · dans le disque / · sur le cercle Γ / ✔ hors du disque fermé
    ? Conclusion : ✔ f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy / · L'intégrale n'est pas définie / · Il faut les résidus des singularités
    = 0   ← théorème de Cauchy
  aides : Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon. | singularités : −2i, −i | Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.
  pièges : c_pole_outside_counted, c_pole_on_contour

```

### Niveau 5

```
Pour chaque fonction, que vaut l'intégrale sur le cercle unité ?
  [problème, 4 points]
  partie 1 (Fonction 1 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z − 3)² :
    · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]   · n'est pas définie : une singularité est sur le cercle   ✔ vaut 0 par le théorème de Cauchy
  partie 2 (Fonction 2 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z(z − 1)) :
    · vaut 0 par le théorème de Cauchy [c_pole_on_contour]   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]   ✔ n'est pas définie : une singularité est sur le cercle
  partie 3 (Fonction 3 : 1)
  ∮|z|=1f(z)dz pour f(z) = z²/(z − 2) :
    ✔ vaut 0 par le théorème de Cauchy   · n'est pas définie : une singularité est sur le cercle   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]
  partie 4 (Fonction 4 : 1)
  ∮|z|=1f(z)dz pour f(z) = cos(z)/z³ :
    · n'est pas définie : une singularité est sur le cercle   · vaut 0 par le théorème de Cauchy   ✔ demande les résidus : une singularité est dans le disque
  pièges : c_pole_outside_counted, c_pole_on_contour

Pour chaque fonction, que vaut l'intégrale sur le cercle unité ?
  [problème, 4 points]
  partie 1 (Fonction 1 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z − 3)² :
    · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]   · n'est pas définie : une singularité est sur le cercle   ✔ vaut 0 par le théorème de Cauchy
  partie 2 (Fonction 2 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z(z + 1)) :
    ✔ n'est pas définie : une singularité est sur le cercle   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]   · vaut 0 par le théorème de Cauchy [c_pole_on_contour]
  partie 3 (Fonction 3 : 1)
  ∮|z|=1f(z)dz pour f(z) = e^z/cos(z) :
    · n'est pas définie : une singularité est sur le cercle   ✔ vaut 0 par le théorème de Cauchy   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]
  partie 4 (Fonction 4 : 1)
  ∮|z|=1f(z)dz pour f(z) = e^z/z :
    · n'est pas définie : une singularité est sur le cercle   · vaut 0 par le théorème de Cauchy   ✔ demande les résidus : une singularité est dans le disque
  pièges : c_pole_outside_counted, c_pole_on_contour

Pour chaque fonction, que vaut l'intégrale sur le cercle unité ?
  [problème, 4 points]
  partie 1 (Fonction 1 : 1)
  ∮|z|=1f(z)dz pour f(z) = e^z/(z − 1) :
    ✔ n'est pas définie : une singularité est sur le cercle   · vaut 0 par le théorème de Cauchy [c_pole_on_contour]   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]
  partie 2 (Fonction 2 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z² + 4) :
    ✔ vaut 0 par le théorème de Cauchy   · n'est pas définie : une singularité est sur le cercle   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]
  partie 3 (Fonction 3 : 1)
  ∮|z|=1f(z)dz pour f(z) = e^z/z :
    ✔ demande les résidus : une singularité est dans le disque   · vaut 0 par le théorème de Cauchy   · n'est pas définie : une singularité est sur le cercle
  partie 4 (Fonction 4 : 1)
  ∮|z|=1f(z)dz pour f(z) = 1/(z + 2)² :
    · n'est pas définie : une singularité est sur le cercle   · demande les résidus : une singularité est dans le disque [c_pole_outside_counted]   ✔ vaut 0 par le théorème de Cauchy
  pièges : c_pole_on_contour, c_pole_outside_counted

```

### Variantes d'examen

```
Pour laquelle de ces fonctions a-t-on ∮|z|=1f(z)dz = 0 par le théorème de Cauchy ?
  · f(z) = 1/(z(z + 1)) [c_pole_on_contour]   ✔ f(z) = e^z/cos(z)   · f(z) = z/(2z − 1)   · f(z) = cos(z)/z³
  [examen mcq]
  pièges : c_pole_on_contour

Calcule ∮|z−1|=0,5f(z)dz pour f(z) = cos(z)/(z + 1) (sens positif).
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1,5 ; Place les singularités par rapport à Γ, puis conclus : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  z + 1 = 0
      (Les singularités sont les zéros du dénominateur :)
      = z = −1   ← zéros du dénominateur
    — Place les singularités par rapport à Γ, puis conclus :  [juge cvalue]  départ : I
      = 0   ← théorème de Cauchy

```

## Formule intégrale de Cauchy (`c-cauchy-formula`, BA3)

_∮ g(z)/(z − z₀)ⁿ⁺¹ dz = 2πi g⁽ⁿ⁾(z₀)/n! : la puissance est n + 1._

### Niveau 1

```
Calcule ∮|z−1|=2f(z)dz pour f(z) = sin(z)/(z − 1)² (sens positif).
  [guided]  d/dz (sin(z))
    (g(z) = sin(z), z₀ = 1 et n = 1 : on dérive g une fois.)
    = □   (trous : cos(z))   ← dériver une fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·cos(1)/1!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = □   (trous : 2πi·cos(1))
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 1, g(z) = sin(z), g⁽ⁿ⁾(z₀) = cos(1) | 2πi·cos(1)

Calcule ∮|z−1|=2f(z)dz pour f(z) = z⁴/(z − 1) (sens positif).
  [guided]  I
    (g(z) = z⁴ est holomorphe et z₀ = 1 est à l'intérieur de Γ :)
    = □   (trous : 2πi)   ← 2πi g(z₀)
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 0, g(z) = z⁴, g⁽ⁿ⁾(z₀) = 1 | 2πi

Calcule ∮|z−i|=2f(z)dz pour f(z) = e^(2z)/(z − i)³ (sens positif).
  [guided]  d/dz (d/dz (e^(2z)))
    (g(z) = e^(2z), z₀ = i et n = 2 : on dérive g 2 fois.)
    = □   (trous : 4e^(2z))   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·4e^(2i)/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = □   (trous : 4πie^(2i))
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = e^(2z), g⁽ⁿ⁾(z₀) = 4e^(2i) | 4πie^(2i)

```

### Niveau 2

```
Calcule ∮|z−1|=2f(z)dz pour f(z) = cos(z)/(z − 1)⁴ (sens positif).
  [guided]  d/dz (d/dz (d/dz (cos(z))))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? La puissance de (z − 1) est 4 : n = ✔ 3 (puissance n + 1) / · 4
    = □   (trous : sin(z))   ← dériver 3 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·sin(1)/3!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = □   (trous : πi·sin(1)/3)
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 3, g(z) = cos(z), g⁽ⁿ⁾(z₀) = sin(1) | πi·sin(1)/3
  pièges : c_cauchy_n_factor

Calcule ∮|z−1|=2f(z)dz pour f(z) = e^(3z)/(z − 1)³ (sens positif).
  [guided]  d/dz (d/dz (e^(3z)))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? La puissance de (z − 1) est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = □   (trous : 9e^(3z))   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·9e³/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = □   (trous : 9πie³)
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = e^(3z), g⁽ⁿ⁾(z₀) = 9e³ | 9πie³
  pièges : c_cauchy_n_factor

Calcule ∮|z|=2f(z)dz pour f(z) = e^(2z)/z³ (sens positif).
  [guided]  d/dz (d/dz (e^(2z)))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? La puissance de z est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = □   (trous : 4e^(2z))   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·4/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = □   (trous : 4πi)
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = e^(2z), g⁽ⁿ⁾(z₀) = 4 | 4πi
  pièges : c_cauchy_n_factor

```

### Niveau 3

```
Calcule ∮|z−1|=2f(z)dz pour f(z) = z⁴/(z − 1)³ (sens positif).
  [tap, suivre l'erreur, menu menu]  d/dz (d/dz (z⁴))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? Quelle méthode ? · Cauchy : ∮ = 0 / ✔ Formule intégrale de Cauchy / ✔ Théorème des résidus
    ? La puissance de (z − 1) est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = 12z²   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·12/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = 12πi
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = z⁴, g⁽ⁿ⁾(z₀) = 12 | 12πi
  pièges : c_cauchy_n_factor

Calcule ∮|z|=2f(z)dz pour f(z) = cos(z)/z³ (sens positif).
  [tap, suivre l'erreur, menu menu]  d/dz (d/dz (cos(z)))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? Quelle méthode ? · Cauchy : ∮ = 0 / ✔ Formule intégrale de Cauchy / ✔ Théorème des résidus
    ? La puissance de z est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = −cos(z)   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·(−1)/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = −πi
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = cos(z), g⁽ⁿ⁾(z₀) = −1 | −πi
  pièges : c_cauchy_n_factor

Calcule ∮|z−1|=2f(z)dz pour f(z) = z³/(z − 1)³ (sens positif).
  [tap, suivre l'erreur, menu menu]  d/dz (d/dz (z³))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? Quelle méthode ? · Cauchy : ∮ = 0 / ✔ Formule intégrale de Cauchy / ✔ Théorème des résidus
    ? La puissance de (z − 1) est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = 6z   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·6/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = 6πi
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = z³, g⁽ⁿ⁾(z₀) = 6 | 6πi
  pièges : c_cauchy_n_factor

```

### Niveau 4

```
Calcule ∮|z|=2f(z)dz pour f(z) = 1/(z³(z − 3)) (sens positif).
  [free, suivre l'erreur]  d/dz (d/dz (1/(z − 3)))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? La puissance de z est 3 : n = ✔ 2 (puissance n + 1) / · 3
    = 2/(z − 3)³   ← dériver 2 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·(−2/27)/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = −2πi/27
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 2, g(z) = 1/(z − 3), g⁽ⁿ⁾(z₀) = −2/27 | −2πi/27
  pièges : c_cauchy_n_factor

Calcule ∮|z|=2f(z)dz pour f(z) = e^z/z⁴ (sens positif).
  [free, suivre l'erreur]  d/dz (d/dz (d/dz (e^z)))
    (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
    ? La puissance de z est 4 : n = ✔ 3 (puissance n + 1) / · 4
    = e^z   ← dériver 3 fois
  — Formule de Cauchy :  [juge cvalue]  départ : I
    = 2πi·1/3!   ← 2πi g⁽ⁿ⁾(z₀)/n!
    = πi/3
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 3, g(z) = e^z, g⁽ⁿ⁾(z₀) = 1 | πi/3
  pièges : c_cauchy_n_factor

Calcule ∮|z−1|=2f(z)dz pour f(z) = sin(z)/(z − 1) (sens positif).
  [free, suivre l'erreur]  I
    (g(z) = sin(z) est holomorphe et z₀ = 1 est à l'intérieur de Γ :)
    ? La puissance de (z − 1) est 1 : n = ✔ 0 (puissance n + 1) / · 1
    = 2πi·sin(1)   ← 2πi g(z₀)
  aides : Écris l'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!. | n = 0, g(z) = sin(z), g⁽ⁿ⁾(z₀) = sin(1) | 2πi·sin(1)
  pièges : c_cauchy_n_factor

```

### Niveau 5

```
La formule intégrale de Cauchy, puis un calcul.
  [problème, 3 points]
  partie 1 (La formule : 1)
  f est holomorphe sur un disque qui contient le cercle Γ (sens positif), z₀ à l'intérieur. Quelle formule est juste ?
    · ∮ f(z)/(z − z₀)³ dz = 2πi f″(z₀) [c_cauchy_n_factor]   ✔ ∮ f(z)/(z − z₀)² dz = 2πi f′(z₀) si f est holomorphe et z₀ intérieur à Γ   · f^(n)(z_0) = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ dz [c_cauchy_n_factor]   · ∮ f(z)/(z − z₀) dz = 0 si f est holomorphe et z₀ intérieur à Γ
  partie 2 (Le calcul : 2)
  Calcule ∮|z−1|=2f(z)dz pour f(z) = sin(z)/(z − 1) (sens positif).
    [free, sans aide, suivre l'erreur]  I
      (g(z) = sin(z) est holomorphe et z₀ = 1 est à l'intérieur de Γ :)
      ? La puissance de (z − 1) est 1 : n = ✔ 0 (puissance n + 1) / · 1
      = 2πi·sin(1)   ← 2πi g(z₀)
  pièges : c_cauchy_n_factor

La formule intégrale de Cauchy, puis un calcul.
  [problème, 3 points]
  partie 1 (La formule : 1)
  f est holomorphe sur un disque qui contient le cercle Γ (sens positif), z₀ à l'intérieur. Quelle formule est juste ?
    · ∮ f(z)/(z − z₀) dz = 0 si f est holomorphe et z₀ intérieur à Γ   · f^(n)(z_0) = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ dz [c_cauchy_n_factor]   · ∮ f(z)/(z − z₀)³ dz = 2πi f″(z₀) [c_cauchy_n_factor]   ✔ f^(n)(z_0) = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ⁺¹ dz
  partie 2 (Le calcul : 1 ; Formule de Cauchy : 1)
  Calcule ∮|z−1|=2f(z)dz pour f(z) = sin(z)/(z − 1)³ (sens positif).
    [free, sans aide, suivre l'erreur]  d/dz (d/dz (sin(z)))
      (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
      ? La puissance de (z − 1) est 3 : n = ✔ 2 (puissance n + 1) / · 3
      = −sin(z)   ← dériver 2 fois
    — Formule de Cauchy :  [juge cvalue]  départ : I
      = 2πi·(−sin(1))/2!   ← 2πi g⁽ⁿ⁾(z₀)/n!
      = −πi·sin(1)
  pièges : c_cauchy_n_factor

La formule intégrale de Cauchy, puis un calcul.
  [problème, 3 points]
  partie 1 (La formule : 1)
  f est holomorphe sur un disque qui contient le cercle Γ (sens positif), z₀ à l'intérieur. Quelle formule est juste ?
    ✔ ∮ f(z)/(z − z₀)² dz = 2πi f′(z₀) si f est holomorphe et z₀ intérieur à Γ   · ∮ f(z)/(z − z₀)³ dz = 2πi f″(z₀) [c_cauchy_n_factor]   · ∮ f(z)/(z − z₀) dz = 0 si f est holomorphe et z₀ intérieur à Γ   · f^(n)(z_0) = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ dz [c_cauchy_n_factor]
  partie 2 (Le calcul : 1 ; Formule de Cauchy : 1)
  Calcule ∮|z−i|=2f(z)dz pour f(z) = e^(2z)/(z − i)⁴ (sens positif).
    [free, sans aide, suivre l'erreur]  d/dz (d/dz (d/dz (e^(2z))))
      (On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :)
      ? La puissance de (z − i) est 4 : n = ✔ 3 (puissance n + 1) / · 4
      = 8e^(2z)   ← dériver 3 fois
    — Formule de Cauchy :  [juge cvalue]  départ : I
      = 2πi·8e^(2i)/3!   ← 2πi g⁽ⁿ⁾(z₀)/n!
      = 8πie^(2i)/3
  pièges : c_cauchy_n_factor

```

### Variantes d'examen

```
∮|z|=2f(z)dz pour f(z) = 1/(z³(z − 4)) vaut :
  · −πi/16 [c_cauchy_n_factor]   ✔ −πi/32   · 0   · −1/64 [c_residue_2pii]
  [examen mcq]
  pièges : c_cauchy_n_factor, c_residue_2pii

```

## Série de Taylor et rayon de convergence (`c-taylor`, BA3)

_Se ramener à 1/(1 − w) = Σ wⁿ ; le rayon est la distance à la singularité la plus proche._

### Niveau 1

```
Développe f(z) = 1/(2 + z²) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  (1/2)·1/(1 − (−z²/2))
    (On a 1/(2 + z²) = (1/2)·1/(1 − (−z²/2)).)
    = (1/2)Σ_{n=0}^{∞} □   (trous : (1/2)Σ_{n=0}^{∞} (−z²/2)^n)   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} (−1)^nz^(2n)/2^(n + 1))   ← simplifier le terme général
  — La singularité la plus proche de 0 est ±i√2 :  [juge cvalue]  départ : R
    = □   (trous : √2)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/2)·1/(1 − (−z²/2)) | Σ_{n=0}^{∞} (−1)^nz^(2n)/2^(n + 1)
  pièges : c_laurent_sign

Développe f(z) = 1/(4 + z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  (1/4)·1/(1 − (−z/4))
    (On a 1/(4 + z) = (1/4)·1/(1 − (−z/4)).)
    = (1/4)Σ_{n=0}^{∞} □   (trous : (1/4)Σ_{n=0}^{∞} (−z/4)^n)   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} (−1)^nz^n/4^(n + 1))   ← simplifier le terme général
  — La singularité la plus proche de 0 est −4 :  [juge cvalue]  départ : R
    = □   (trous : 4)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/4)·1/(1 − (−z/4)) | Σ_{n=0}^{∞} (−1)^nz^n/4^(n + 1)
  pièges : c_laurent_sign

Développe f(z) = 1/(3 + z²) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  (1/3)·1/(1 − (−z²/3))
    (On a 1/(3 + z²) = (1/3)·1/(1 − (−z²/3)).)
    = (1/3)Σ_{n=0}^{∞} □   (trous : (1/3)Σ_{n=0}^{∞} (−z²/3)^n)   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} (−1)^nz^(2n)/3^(n + 1))   ← simplifier le terme général
  — La singularité la plus proche de 0 est ±i√3 :  [juge cvalue]  départ : R
    = □   (trous : √3)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/3)·1/(1 − (−z²/3)) | Σ_{n=0}^{∞} (−1)^nz^(2n)/3^(n + 1)
  pièges : c_laurent_sign

```

### Niveau 2

```
Développe f(z) = z/(1 − z)² en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  z/(1 − z)²
    (z/(1 − z)² = z · (1/(1 − z))′ :)
    = z·□   (trous : z·d/dz (1/(1 − z)))
  — Le terme général :  [juge cvalue]  départ : z·d/dz (1/(1 − z))
    = z·Σ_{n=1}^{∞} □   (trous : z·Σ_{n=1}^{∞} n·z^(n − 1))   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=1}^{∞} □   (trous : Σ_{n=1}^{∞} n·z^n)   ← simplifier le terme général
  — La singularité la plus proche de 0 est 1 :  [juge cvalue]  départ : R
    = □   (trous : 1)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | z·d/dz (1/(1 − z)) | Σ_{n=1}^{∞} n·z^n

Développe f(z) = z/(1 − z)² en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  z/(1 − z)²
    (z/(1 − z)² = z · (1/(1 − z))′ :)
    = z·□   (trous : z·d/dz (1/(1 − z)))
  — Le terme général :  [juge cvalue]  départ : z·d/dz (1/(1 − z))
    = z·Σ_{n=1}^{∞} □   (trous : z·Σ_{n=1}^{∞} n·z^(n − 1))   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=1}^{∞} □   (trous : Σ_{n=1}^{∞} n·z^n)   ← simplifier le terme général
  — La singularité la plus proche de 0 est 1 :  [juge cvalue]  départ : R
    = □   (trous : 1)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | z·d/dz (1/(1 − z)) | Σ_{n=1}^{∞} n·z^n

Développe f(z) = z/(1 − z)² en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [guided]  z/(1 − z)²
    (z/(1 − z)² = z · (1/(1 − z))′ :)
    = z·□   (trous : z·d/dz (1/(1 − z)))
  — Le terme général :  [juge cvalue]  départ : z·d/dz (1/(1 − z))
    = z·Σ_{n=1}^{∞} □   (trous : z·Σ_{n=1}^{∞} n·z^(n − 1))   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=1}^{∞} □   (trous : Σ_{n=1}^{∞} n·z^n)   ← simplifier le terme général
  — La singularité la plus proche de 0 est 1 :  [juge cvalue]  départ : R
    = □   (trous : 1)   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | z·d/dz (1/(1 − z)) | Σ_{n=1}^{∞} n·z^n

```

### Niveau 3

```
Développe f(z) = 1/(3 + z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [tap, suivre l'erreur, menu menu]  1/(3 + z)
    (On fait apparaître la série géométrique :)
    ? Quelle méthode ? ✔ Série géométrique 1/(1 − w) = Σ wⁿ / · DL usuel / ✔ Dérivées en 0 : aₙ = f⁽ⁿ⁾(0)/n!
    = (1/3)·1/(1 − (−z/3))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/3)·1/(1 − (−z/3))
    = (1/3)Σ_{n=0}^{∞} (−z/3)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est −3 :  [juge cvalue]  départ : R
    = 3   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/3)·1/(1 − (−z/3)) | Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)

Développe f(z) = 1/(2 + z²) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [tap, suivre l'erreur, menu menu]  1/(2 + z²)
    (On fait apparaître la série géométrique :)
    ? Quelle méthode ? ✔ Série géométrique 1/(1 − w) = Σ wⁿ / · DL usuel / ✔ Dérivées en 0 : aₙ = f⁽ⁿ⁾(0)/n!
    = (1/2)·1/(1 − (−z²/2))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/2)·1/(1 − (−z²/2))
    = (1/2)Σ_{n=0}^{∞} (−z²/2)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} (−1)^nz^(2n)/2^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est ±i√2 :  [juge cvalue]  départ : R
    = √2   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/2)·1/(1 − (−z²/2)) | Σ_{n=0}^{∞} (−1)^nz^(2n)/2^(n + 1)

Développe f(z) = 1/(2 + z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [tap, suivre l'erreur, menu menu]  1/(2 + z)
    (On fait apparaître la série géométrique :)
    ? Quelle méthode ? ✔ Série géométrique 1/(1 − w) = Σ wⁿ / · DL usuel / ✔ Dérivées en 0 : aₙ = f⁽ⁿ⁾(0)/n!
    = (1/2)·1/(1 − (−z/2))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/2)·1/(1 − (−z/2))
    = (1/2)Σ_{n=0}^{∞} (−z/2)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} (−1)^nz^n/2^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est −2 :  [juge cvalue]  départ : R
    = 2   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/2)·1/(1 − (−z/2)) | Σ_{n=0}^{∞} (−1)^nz^n/2^(n + 1)

```

### Niveau 4

```
Développe f(z) = 1/(3 − z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [free, suivre l'erreur]  1/(3 − z)
    (On fait apparaître la série géométrique :)
    = (1/3)·1/(1 − (z/3))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/3)·1/(1 − (z/3))
    = (1/3)Σ_{n=0}^{∞} (z/3)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} z^n/3^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est 3 :  [juge cvalue]  départ : R
    = 3   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/3)·1/(1 − (z/3)) | Σ_{n=0}^{∞} z^n/3^(n + 1)

Donne a₀, a₁, a₂, a₃ de la série de Taylor en 0 de f(z) = e^z/(1 + z), sous la forme a₀ + a₁z + a₂z² + a₃z³ + o(z³).
  [free, suivre l'erreur]  e^z/(1 + z)
    = 1 + (1/2)z² − (1/3)z³ + z³·ε(z)   ← DL des deux fonctions, puis 1/(1 − u) = 1 + u + u² + u³ + o(u³)
  aides : Développe le numérateur et le dénominateur à l'ordre 3, puis divise (1/(1 − u) = 1 + u + u² + …). | a₀ = 1 | 1 + (1/2)z² − (1/3)z³ + z³·ε(z)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Développe f(z) = 1/(3 + z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [free, suivre l'erreur]  1/(3 + z)
    (On fait apparaître la série géométrique :)
    = (1/3)·1/(1 − (−z/3))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/3)·1/(1 − (−z/3))
    = (1/3)Σ_{n=0}^{∞} (−z/3)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est −3 :  [juge cvalue]  départ : R
    = 3   ← distance de 0 à la singularité
  aides : Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1. | (1/3)·1/(1 − (−z/3)) | Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)

```

### Niveau 5

```
Développe f(z) = z/(1 − z)² en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [free, sans aide]  z/(1 − z)²
    (z/(1 − z)² = z · (1/(1 − z))′ :)
    = z·d/dz (1/(1 − z))
  — Le terme général :  [juge cvalue]  départ : z·d/dz (1/(1 − z))
    = z·Σ_{n=1}^{∞} n·z^(n − 1)   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=1}^{∞} n·z^n   ← simplifier le terme général
  — La singularité la plus proche de 0 est 1 :  [juge cvalue]  départ : R
    = 1   ← distance de 0 à la singularité

Développe f(z) = z/(1 − z)² en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [free, sans aide]  z/(1 − z)²
    (z/(1 − z)² = z · (1/(1 − z))′ :)
    = z·d/dz (1/(1 − z))
  — Le terme général :  [juge cvalue]  départ : z·d/dz (1/(1 − z))
    = z·Σ_{n=1}^{∞} n·z^(n − 1)   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=1}^{∞} n·z^n   ← simplifier le terme général
  — La singularité la plus proche de 0 est 1 :  [juge cvalue]  départ : R
    = 1   ← distance de 0 à la singularité

Développe f(z) = 1/(3 + z) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [free, sans aide]  1/(3 + z)
    (On fait apparaître la série géométrique :)
    = (1/3)·1/(1 − (−z/3))   ← mettre en facteur
  — Le terme général :  [juge cvalue]  départ : (1/3)·1/(1 − (−z/3))
    = (1/3)Σ_{n=0}^{∞} (−z/3)^n   ← 1/(1 − w) = Σ wⁿ
    = Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← simplifier le terme général
  — La singularité la plus proche de 0 est −3 :  [juge cvalue]  départ : R
    = 3   ← distance de 0 à la singularité

```

### Variantes d'examen

```
La série de Taylor en 0 de f(z) = 1/(3 + z) est :
  · −Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   · Σ_{n=0}^{∞} (−1)^nz^n/3^n   ✔ Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   · Σ_{n=0}^{∞} z^n/3^(n + 1) [c_laurent_sign]
  [examen mcq]
  pièges : c_laurent_sign

Série de Taylor en 0 de f(z) = 1/(2 − e^z) : a₂ = ?
  → 3/2
  [examen coef]

Développe f(z) = 1/(2 + z²) en série de Taylor en 0 (terme général), puis donne le rayon de convergence.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Le terme général : 1 ; La singularité la plus proche de 0 est ±i√2 : 1)
    [free, sans aide, suivre l'erreur, examen open]  1/(2 + z²)
      (On fait apparaître la série géométrique :)
      = (1/2)·1/(1 − (−z²/2))   ← mettre en facteur
    — Le terme général :  [juge cvalue]  départ : (1/2)·1/(1 − (−z²/2))
      = (1/2)Σ_{n=0}^{∞} (−z²/2)^n   ← 1/(1 − w) = Σ wⁿ
      = Σ_{n=0}^{∞} (−1)^nz^(2n)/2^(n + 1)   ← simplifier le terme général
    — La singularité la plus proche de 0 est ±i√2 :  [juge cvalue]  départ : R
      = √2   ← distance de 0 à la singularité

```

## Série de Laurent dans une couronne donnée (`c-laurent`, BA3)

_Éléments simples, puis chaque 1/(z − a) en puissances de z/a ou de a/z selon la couronne._

### Niveau 1

```
Développe f(z) = 1/(z(z − 1)) en série de Laurent dans la couronne 0 < |z| < 1.
  [guided]  1/(z − 1)
    (f(z) = −1/z + 1/(z − 1). Chaque élément simple, selon la couronne :)
    = −1/(1 − z)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} □   (trous : −Σ_{n=0}^{∞} z^n)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/z + 1/(z − 1)
    = □   (trous : −1/z − Σ_{n=0}^{∞} z^n)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/z + 1/(z − 1) | −1/z − Σ_{n=0}^{∞} z^n
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/(z(z + 1)) en série de Laurent dans la couronne |z| > 1.
  [guided]  1/(z + 1)
    (f(z) = 1/z − 1/(z + 1). Chaque élément simple, selon la couronne :)
    = (1/z)·1/(1 − (−1/z))   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} (−1)^n/z^(n + 1))   ← série géométrique
  — On assemble :  [juge cvalue]  départ : 1/z − 1/(z + 1)
    = □   (trous : 1/z − Σ_{n=0}^{∞} (−1)^n/z^(n + 1))   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = 1/z − 1/(z + 1) | 1/z − Σ_{n=0}^{∞} (−1)^n/z^(n + 1)
  pièges : c_laurent_sign, c_laurent_wrong_annulus

Développe f(z) = 1/((z − 1)(z − 2)) en série de Laurent dans la couronne |z| > 2.
  [guided]  1/(z − 1)
    (f(z) = −1/(z − 1) + 1/(z − 2). Chaque élément simple, selon la couronne :)
    = (1/z)·1/(1 − 1/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} 1/z^(n + 1))   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 2)
    = (1/z)·1/(1 − 2/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} 2^n/z^(n + 1))   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(z − 1) + 1/(z − 2)
    = □   (trous : −Σ_{n=0}^{∞} 1/z^(n + 1) + Σ_{n=0}^{∞} 2^n/z^(n + 1))   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(z − 1) + 1/(z − 2) | −Σ_{n=0}^{∞} 1/z^(n + 1) + Σ_{n=0}^{∞} 2^n/z^(n + 1)
  pièges : c_laurent_wrong_annulus

```

### Niveau 2

```
Développe f(z) = 1/((z − 2)(z − 3)) en série de Laurent dans la couronne |z| > 3.
  [guided]  1/((z − 2)(z − 3))
    (Éléments simples :)
    = □   (trous : −1/(z − 2) + 1/(z − 3))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z − 2)
    ? Dans |z| > 3, pour 1/(z−2) : · |z| < 2 : puissances de z / ✔ |z| > 2 : puissances de 1/z
    = (1/z)·1/(1 − 2/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} 2^n/z^(n + 1))   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans |z| > 3, pour 1/(z−3) : · |z| < 3 : puissances de z / ✔ |z| > 3 : puissances de 1/z
    = (1/z)·1/(1 − 3/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} 3^n/z^(n + 1))   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(z − 2) + 1/(z − 3)
    = □   (trous : −Σ_{n=0}^{∞} 2^n/z^(n + 1) + Σ_{n=0}^{∞} 3^n/z^(n + 1))   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(z − 2) + 1/(z − 3) | −Σ_{n=0}^{∞} 2^n/z^(n + 1) + Σ_{n=0}^{∞} 3^n/z^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z + 2)(z − 3)) en série de Laurent dans la couronne 2 < |z| < 3.
  [guided]  1/((z + 2)(z − 3))
    (Éléments simples :)
    = □   (trous : −1/(5(z + 2)) + 1/(5(z − 3)))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 2)
    ? Dans 2 < |z| < 3, pour 1/(z+2) : · |z| < 2 : puissances de z / ✔ |z| > 2 : puissances de 1/z
    = (1/z)·1/(1 − (−2/z))   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} □   (trous : Σ_{n=0}^{∞} (−2)^n/z^(n + 1))   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans 2 < |z| < 3, pour 1/(z−3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} □   (trous : −Σ_{n=0}^{∞} z^n/3^(n + 1))   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(5(z + 2)) + 1/(5(z − 3))
    = □   (trous : −(1/5)Σ_{n=0}^{∞} (−2)^n/z^(n + 1) − (1/5)Σ_{n=0}^{∞} z^n/3^(n + 1))   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(5(z + 2)) + 1/(5(z − 3)) | −(1/5)Σ_{n=0}^{∞} (−2)^n/z^(n + 1) − (1/5)Σ_{n=0}^{∞} z^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z − 1)(z − 3)) en série de Laurent dans la couronne |z| < 1.
  [guided]  1/((z − 1)(z − 3))
    (Éléments simples :)
    = □   (trous : −1/(2(z − 1)) + 1/(2(z − 3)))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z − 1)
    ? Dans |z| < 1, pour 1/(z−1) : ✔ |z| < 1 : puissances de z / · |z| > 1 : puissances de 1/z
    = −1/(1 − z)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} □   (trous : −Σ_{n=0}^{∞} z^n)   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans |z| < 1, pour 1/(z−3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} □   (trous : −Σ_{n=0}^{∞} z^n/3^(n + 1))   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(2(z − 1)) + 1/(2(z − 3))
    = □   (trous : (1/2)Σ_{n=0}^{∞} z^n − (1/2)Σ_{n=0}^{∞} z^n/3^(n + 1))   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(2(z − 1)) + 1/(2(z − 3)) | (1/2)Σ_{n=0}^{∞} z^n − (1/2)Σ_{n=0}^{∞} z^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

```

### Niveau 3

```
Développe f(z) = 1/((z + 2)(z + 3)) en série de Laurent dans la couronne 2 < |z| < 3.
  [tap, suivre l'erreur, menu menu]  1/((z + 2)(z + 3))
    (Éléments simples :)
    = 1/(z + 2) − 1/(z + 3)   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 2)
    ? Dans 2 < |z| < 3, pour 1/(z+2) : · |z| < 2 : puissances de z / ✔ |z| > 2 : puissances de 1/z
    = (1/z)·1/(1 − (−2/z))   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} (−2)^n/z^(n + 1)   ← série géométrique
  —   [juge cvalue]  départ : 1/(z + 3)
    ? Dans 2 < |z| < 3, pour 1/(z+3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = (1/3)·1/(1 − (−z/3))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : 1/(z + 2) − 1/(z + 3)
    = Σ_{n=0}^{∞} (−2)^n/z^(n + 1) − Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = 1/(z + 2) − 1/(z + 3) | Σ_{n=0}^{∞} (−2)^n/z^(n + 1) − Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z + 1)(z + 2)) en série de Laurent dans la couronne |z| < 1.
  [tap, suivre l'erreur, menu menu]  1/((z + 1)(z + 2))
    (Éléments simples :)
    = 1/(z + 1) − 1/(z + 2)   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 1)
    ? Dans |z| < 1, pour 1/(z+1) : ✔ |z| < 1 : puissances de z / · |z| > 1 : puissances de 1/z
    = 1/(1 − (−z))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n   ← série géométrique
  —   [juge cvalue]  départ : 1/(z + 2)
    ? Dans |z| < 1, pour 1/(z+2) : ✔ |z| < 2 : puissances de z / · |z| > 2 : puissances de 1/z
    = (1/2)·1/(1 − (−z/2))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n/2^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : 1/(z + 1) − 1/(z + 2)
    = Σ_{n=0}^{∞} (−1)^nz^n − Σ_{n=0}^{∞} (−1)^nz^n/2^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = 1/(z + 1) − 1/(z + 2) | Σ_{n=0}^{∞} (−1)^nz^n − Σ_{n=0}^{∞} (−1)^nz^n/2^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z − 2)(z − 3)) en série de Laurent dans la couronne 2 < |z| < 3.
  [tap, suivre l'erreur, menu menu]  1/((z − 2)(z − 3))
    (Éléments simples :)
    = −1/(z − 2) + 1/(z − 3)   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z − 2)
    ? Dans 2 < |z| < 3, pour 1/(z−2) : · |z| < 2 : puissances de z / ✔ |z| > 2 : puissances de 1/z
    = (1/z)·1/(1 − 2/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
    = Σ_{n=0}^{∞} 2^n/z^(n + 1)   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans 2 < |z| < 3, pour 1/(z−3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} z^n/3^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(z − 2) + 1/(z − 3)
    = −Σ_{n=0}^{∞} 2^n/z^(n + 1) − Σ_{n=0}^{∞} z^n/3^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(z − 2) + 1/(z − 3) | −Σ_{n=0}^{∞} 2^n/z^(n + 1) − Σ_{n=0}^{∞} z^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

```

### Niveau 4

```
Développe f(z) = 1/(z(z + 3)) en série de Laurent dans la couronne 0 < |z| < 3.
  [free, suivre l'erreur]  1/(z(z + 3))
    (Éléments simples :)
    = 1/(3z) − 1/(3(z + 3))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 3)
    ? Dans 0 < |z| < 3, pour 1/(z+3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = (1/3)·1/(1 − (−z/3))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : 1/(3z) − 1/(3(z + 3))
    = 1/(3z) − (1/3)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = 1/(3z) − 1/(3(z + 3)) | 1/(3z) − (1/3)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z + 1)(z − 3)) en série de Laurent dans la couronne |z| < 1.
  [free, suivre l'erreur]  1/((z + 1)(z − 3))
    (Éléments simples :)
    = −1/(4(z + 1)) + 1/(4(z − 3))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 1)
    ? Dans |z| < 1, pour 1/(z+1) : ✔ |z| < 1 : puissances de z / · |z| > 1 : puissances de 1/z
    = 1/(1 − (−z))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans |z| < 1, pour 1/(z−3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} z^n/3^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(4(z + 1)) + 1/(4(z − 3))
    = −(1/4)Σ_{n=0}^{∞} (−1)^nz^n − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(4(z + 1)) + 1/(4(z − 3)) | −(1/4)Σ_{n=0}^{∞} (−1)^nz^n − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

Développe f(z) = 1/((z + 1)(z − 3)) en série de Laurent dans la couronne |z| < 1.
  [free, suivre l'erreur]  1/((z + 1)(z − 3))
    (Éléments simples :)
    = −1/(4(z + 1)) + 1/(4(z − 3))   ← éléments simples
  — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z + 1)
    ? Dans |z| < 1, pour 1/(z+1) : ✔ |z| < 1 : puissances de z / · |z| > 1 : puissances de 1/z
    = 1/(1 − (−z))   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = Σ_{n=0}^{∞} (−1)^nz^n   ← série géométrique
  —   [juge cvalue]  départ : 1/(z − 3)
    ? Dans |z| < 1, pour 1/(z−3) : ✔ |z| < 3 : puissances de z / · |z| > 3 : puissances de 1/z
    = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
    = −Σ_{n=0}^{∞} z^n/3^(n + 1)   ← série géométrique
  — On assemble :  [juge cvalue]  départ : −1/(4(z + 1)) + 1/(4(z − 3))
    = −(1/4)Σ_{n=0}^{∞} (−1)^nz^n − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)   ← somme des deux développements
  aides : Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle. | f(z) = −1/(4(z + 1)) + 1/(4(z − 3)) | −(1/4)Σ_{n=0}^{∞} (−1)^nz^n − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)
  pièges : c_laurent_wrong_annulus

```

### Niveau 5

```
f(z) = 1/((z − 1)(z + 3)) : séries de Laurent dans les trois régions, puis un coefficient.
  [problème, 4 points]
  partie 1 (|z| < 1 : 1)
  Dans |z| < 1 :
    [free, sans aide, suivre l'erreur]  1/((z − 1)(z + 3))
      = −(1/4)Σ_{n=0}^{∞} z^n − (1/4)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)
  partie 2 (1 < |z| < 3 : 1)
  Dans 1 < |z| < 3 :
    [free, sans aide, suivre l'erreur]  1/((z − 1)(z + 3))
      = (1/4)Σ_{n=0}^{∞} 1/z^(n + 1) − (1/4)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)
  partie 3 (|z| > 3 : 1)
  Dans |z| > 3 :
    [free, sans aide, suivre l'erreur]  1/((z − 1)(z + 3))
      = (1/4)Σ_{n=0}^{∞} 1/z^(n + 1) − (1/4)Σ_{n=0}^{∞} (−3)^n/z^(n + 1)
  partie 4 (Coefficient : 1)
  Dans |z| > 3, le coefficient a₋₃ de z^−3 vaut :
    → -2

f(z) = 1/((z + 1)(z − 3)) : séries de Laurent dans les trois régions, puis un coefficient.
  [problème, 4 points]
  partie 1 (|z| < 1 : 1)
  Dans |z| < 1 :
    [free, sans aide, suivre l'erreur]  1/((z + 1)(z − 3))
      = −(1/4)Σ_{n=0}^{∞} (−1)^nz^n − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)
  partie 2 (1 < |z| < 3 : 1)
  Dans 1 < |z| < 3 :
    [free, sans aide, suivre l'erreur]  1/((z + 1)(z − 3))
      = −(1/4)Σ_{n=0}^{∞} (−1)^n/z^(n + 1) − (1/4)Σ_{n=0}^{∞} z^n/3^(n + 1)
  partie 3 (|z| > 3 : 1)
  Dans |z| > 3 :
    [free, sans aide, suivre l'erreur]  1/((z + 1)(z − 3))
      = −(1/4)Σ_{n=0}^{∞} (−1)^n/z^(n + 1) + (1/4)Σ_{n=0}^{∞} 3^n/z^(n + 1)
  partie 4 (Coefficient : 1)
  Dans |z| > 3, le coefficient a₋₃ de z^−3 vaut :
    → 2

f(z) = 1/((z − 2)(z − 3)) : séries de Laurent dans les trois régions, puis un coefficient.
  [problème, 4 points]
  partie 1 (|z| < 2 : 1)
  Dans |z| < 2 :
    [free, sans aide, suivre l'erreur]  1/((z − 2)(z − 3))
      = Σ_{n=0}^{∞} z^n/2^(n + 1) − Σ_{n=0}^{∞} z^n/3^(n + 1)
  partie 2 (2 < |z| < 3 : 1)
  Dans 2 < |z| < 3 :
    [free, sans aide, suivre l'erreur]  1/((z − 2)(z − 3))
      = −Σ_{n=0}^{∞} 2^n/z^(n + 1) − Σ_{n=0}^{∞} z^n/3^(n + 1)
  partie 3 (|z| > 3 : 1)
  Dans |z| > 3 :
    [free, sans aide, suivre l'erreur]  1/((z − 2)(z − 3))
      = −Σ_{n=0}^{∞} 2^n/z^(n + 1) + Σ_{n=0}^{∞} 3^n/z^(n + 1)
  partie 4 (Coefficient : 1)
  Dans |z| > 3, le coefficient a₋₃ de z^−3 vaut :
    → 5

```

### Variantes d'examen

```
La série de Laurent de f(z) = 1/((z + 1)(z + 3)) dans 1 < |z| < 3 est :
  · (1/2)Σ_{n=0}^{∞} (−1)^n/z^(n + 1) − (1/2)Σ_{n=0}^{∞} (−3)^n/z^(n + 1) [c_laurent_wrong_annulus]   · (1/2)Σ_{n=0}^{∞} (−1)^nz^n − (1/2)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1) [c_laurent_wrong_annulus]   ✔ (1/2)Σ_{n=0}^{∞} (−1)^n/z^(n + 1) − (1/2)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1)   · −((1/2)Σ_{n=0}^{∞} (−1)^n/z^(n + 1) − (1/2)Σ_{n=0}^{∞} (−1)^nz^n/3^(n + 1))
  [examen mcq]
  pièges : c_laurent_wrong_annulus

Série de Laurent de f(z) = 1/((z + 2)(z − 3)) dans |z| > 3 : a₋₃ (coefficient de z^−3) = ?
  → 1
  [examen coef]

Développe f(z) = 1/((z − 1)(z − 3)) en série de Laurent dans la couronne 1 < |z| < 3.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 0,5 ; Chaque élément simple, selon la couronne : 1 ; Étape 3 : 1 ; On assemble : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  1/((z − 1)(z − 3))
      (Éléments simples :)
      = −1/(2(z − 1)) + 1/(2(z − 3))   ← éléments simples
    — Chaque élément simple, selon la couronne :  [juge cvalue]  départ : 1/(z − 1)
      = (1/z)·1/(1 − 1/z)   ← 1/(z − c) = (1/z)·1/(1 − c/z)
      = Σ_{n=0}^{∞} 1/z^(n + 1)   ← série géométrique
    —   [juge cvalue]  départ : 1/(z − 3)
      = −(1/3)·1/(1 − z/3)   ← 1/(z − c) = −(1/c)·1/(1 − z/c)
      = −Σ_{n=0}^{∞} z^n/3^(n + 1)   ← série géométrique
    — On assemble :  [juge cvalue]  départ : −1/(2(z − 1)) + 1/(2(z − 3))
      = −(1/2)Σ_{n=0}^{∞} 1/z^(n + 1) − (1/2)Σ_{n=0}^{∞} z^n/3^(n + 1)   ← somme des deux développements

```

## Classer les singularités (`c-singularities`, BA3)

_Apparente, pôle d'ordre m, essentielle : ordre du zéro en bas moins ordre du zéro en haut._

### Niveau 1

```
Nature de la singularité de f(z) = 1/sin(z) en z₀ = 0 ; si c'est un pôle, son ordre.
  [guided]  m
    (Le numérateur ne s'annule pas, le dénominateur a un zéro d'ordre 1.)
    (ord(dénominateur) = 1, ord(numérateur) = 0 : la singularité est un pôle.)
    = □   (trous : 1)   ← ord(bas) − ord(haut)
  aides : Compte l'ordre du zéro en haut et en bas. | ordre 0 en haut, z + z·ε(z) en bas | pôle d'ordre 1

Nature de la singularité de f(z) = ((z + 1) − sin(z + 1))/(z + 1)³ en z₀ = −1 ; si c'est un pôle, son ordre.
  [guided]  m
    (On pose h = z + 1 : f = (h − sin(h))/h³. Le numérateur a un zéro d'ordre 3, le dénominateur a un zéro d'ordre 3.)
    (ord(dénominateur) = 3, ord(numérateur) = 3 : la singularité est apparente (pas de puissance négative).)
    = □   (trous : 0)   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | h³/6 + h³·ε(h) en haut, ordre 3 en bas | singularité apparente (m = 0)
  pièges : c_order_pole_numerator

Nature de la singularité de f(z) = z²/sin(z)² en z₀ = 0 ; si c'est un pôle, son ordre.
  [guided]  m
    (Le numérateur a un zéro d'ordre 2, le dénominateur a un zéro d'ordre 2.)
    (ord(dénominateur) = 2, ord(numérateur) = 2 : la singularité est apparente (pas de puissance négative).)
    = □   (trous : 0)   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | ordre 2 en haut, z² + z²·ε(z) en bas | singularité apparente (m = 0)
  pièges : c_order_pole_numerator

```

### Niveau 2

```
Nature de la singularité de f(z) = ((z + 1) − sin(z + 1))/((z + 1)·sin(z + 1)) en z₀ = −1 ; si c'est un pôle, son ordre.
  [guided]  h − sin(h)
    (On pose h = z + 1 : f = (h − sin(h))/(h·sin(h)). Le numérateur :)
    = □ + h³·ε(h)   (trous : h³/6 + h³·ε(h))   ← DL usuel
  — Le dénominateur :  [juge series]  départ : h·sin(h)
    = □ + h²·ε(h)   (trous : h² + h²·ε(h))   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 2, ord(numérateur) = 3 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = □   (trous : 0)   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | h³/6 + h³·ε(h) en haut, h² + h²·ε(h) en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

Nature de la singularité de f(z) = ((z + 1) − sin(z + 1))/(z + 1)² en z₀ = −1 ; si c'est un pôle, son ordre.
  [guided]  h − sin(h)
    (On pose h = z + 1 : f = (h − sin(h))/h². Le numérateur :)
    = □ + h³·ε(h)   (trous : h³/6 + h³·ε(h))   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 2, ord(numérateur) = 3 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = □   (trous : 0)   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | h³/6 + h³·ε(h) en haut, ordre 2 en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

Nature de la singularité de f(z) = sin(z + 1)/(z + 1)³ en z₀ = −1 ; si c'est un pôle, son ordre.
  [guided]  sin(h)
    (On pose h = z + 1 : f = sin(h)/h³. Le numérateur :)
    = □ + h·ε(h)   (trous : h + h·ε(h))   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 3, ord(numérateur) = 1 : la singularité est · apparente (pas de puissance négative) / ✔ un pôle / · essentielle
    = □   (trous : 2)   ← ord(bas) − ord(haut)
  aides : Compte l'ordre du zéro en haut et en bas. | h + h·ε(h) en haut, ordre 3 en bas | pôle d'ordre 2
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Niveau 3

```
Nature de la singularité de f(z) = (e^(z − 1) − 1)/(z − 1)² en z₀ = 1 ; si c'est un pôle, son ordre.
  [tap, suivre l'erreur, menu menu]  e^h − 1
    (On pose h = z − 1 : f = (e^h − 1)/h². Le numérateur :)
    = h + h·ε(h)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? Quelle méthode ? ✔ Ordres des zéros en haut et en bas / ✔ Série de Laurent complète / ✔ Limite de f en z₀
    ? ord(dénominateur) = 2, ord(numérateur) = 1 : la singularité est · apparente (pas de puissance négative) / ✔ un pôle / · essentielle
    = 1   ← ord(bas) − ord(haut)
  aides : Compte l'ordre du zéro en haut et en bas. | h + h·ε(h) en haut, ordre 2 en bas | pôle d'ordre 1
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Nature de la singularité de f(z) = sin(z − 1)²/sin(z − 1) en z₀ = 1 ; si c'est un pôle, son ordre.
  [tap, suivre l'erreur, menu menu]  sin(h)²
    (On pose h = z − 1 : f = sin(h)²/sin(h). Le numérateur :)
    = h² + h²·ε(h)   ← DL usuel
  — Le dénominateur :  [juge series]  départ : sin(h)
    = h + h·ε(h)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? Quelle méthode ? ✔ Ordres des zéros en haut et en bas / ✔ Série de Laurent complète / ✔ Limite de f en z₀
    ? ord(dénominateur) = 1, ord(numérateur) = 2 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = 0   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | h² + h²·ε(h) en haut, h + h·ε(h) en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early, c_removable_as_pole

Nature de la singularité de f(z) = (z − sin(z))/z³ en z₀ = 0 ; si c'est un pôle, son ordre.
  [tap, suivre l'erreur, menu menu]  z − sin(z)
    (Le numérateur :)
    = z³/6 + z³·ε(z)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? Quelle méthode ? ✔ Ordres des zéros en haut et en bas / ✔ Série de Laurent complète / ✔ Limite de f en z₀
    ? ord(dénominateur) = 3, ord(numérateur) = 3 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = 0   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | z³/6 + z³·ε(z) en haut, ordre 3 en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

```

### Niveau 4

```
Nature de la singularité de f(z) = (z − 2)²/sin(z − 2)² en z₀ = 2 ; si c'est un pôle, son ordre.
  [free, suivre l'erreur]  sin(h)²
    (On pose h = z − 2 : f = h²/sin(h)². Le dénominateur :)
    = h² + h²·ε(h)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 2, ord(numérateur) = 2 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = 0   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | ordre 2 en haut, h² + h²·ε(h) en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early, c_removable_as_pole

Nature de la singularité de f(z) = ((z − 2) − sin(z − 2))/sin(z − 2)² en z₀ = 2 ; si c'est un pôle, son ordre.
  [free, suivre l'erreur]  h − sin(h)
    (On pose h = z − 2 : f = (h − sin(h))/sin(h)². Le numérateur :)
    = h³/6 + h³·ε(h)   ← DL usuel
  — Le dénominateur :  [juge series]  départ : sin(h)²
    = h² + h²·ε(h)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 2, ord(numérateur) = 3 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = 0   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | h³/6 + h³·ε(h) en haut, h² + h²·ε(h) en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

Nature de la singularité de f(z) = z/sin(z) en z₀ = 0 ; si c'est un pôle, son ordre.
  [free, suivre l'erreur]  sin(z)
    (Le dénominateur :)
    = z + z·ε(z)   ← DL usuel
  — On conclut :  [juge cvalue]  départ : m
    ? ord(dénominateur) = 1, ord(numérateur) = 1 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
    = 0   ← le numérateur compense
  aides : Compte l'ordre du zéro en haut et en bas. | ordre 1 en haut, z + z·ε(z) en bas | singularité apparente (m = 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

```

### Niveau 5

```
Les singularités de f(z) = z/(z³(z − 2)²) sont 0 et 2. Classe-les.
  [problème, 2 points]
  partie 1 (z₀ = 0 : 1)
  En z₀ = 0, f(z) = z/(z³(z − 2)²) a :
    · une singularité apparente   · un pôle simple [c_order_pole_numerator]   ✔ un pôle double   · une singularité essentielle
  partie 2 (z₀ = 2 : 1)
  En z₀ = 2, f(z) = z/(z³(z − 2)²) a :
    · une singularité apparente   · un pôle simple [c_order_pole_numerator]   ✔ un pôle double   · une singularité essentielle
  pièges : c_order_pole_numerator

Les singularités de f(z) = z/(z(z − 2)²) sont 0 et 2. Classe-les.
  [problème, 2 points]
  partie 1 (z₀ = 0 : 1)
  En z₀ = 0, f(z) = z/(z(z − 2)²) a :
    ✔ une singularité apparente   · un pôle simple [c_removable_as_pole]   · un pôle double [c_removable_as_pole]   · une singularité essentielle
  partie 2 (z₀ = 2 : 1)
  En z₀ = 2, f(z) = z/(z(z − 2)²) a :
    · une singularité apparente   · un pôle simple [c_order_pole_numerator]   ✔ un pôle double   · une singularité essentielle
  pièges : c_removable_as_pole, c_order_pole_numerator

Les singularités de f(z) = 1 − cos(z)/(z²(z + 2)) sont 0 et −2. Classe-les.
  [problème, 2 points]
  partie 1 (z₀ = 0 : 1)
  En z₀ = 0, f(z) = 1 − cos(z)/(z²(z + 2)) a :
    · une singularité apparente   · un pôle simple [c_order_pole_numerator]   ✔ un pôle double   · une singularité essentielle
  partie 2 (z₀ = −2 : 1)
  En z₀ = −2, f(z) = 1 − cos(z)/(z²(z + 2)) a :
    · une singularité apparente   ✔ un pôle simple   · un pôle double [c_order_pole_numerator]   · une singularité essentielle
  pièges : c_order_pole_numerator

```

### Variantes d'examen

```
En z₀ = 2, f(z) = (1 − cos(z − 2))/(z − 2)² a :
  ✔ une singularité apparente   · un pôle simple [c_removable_as_pole]   · un pôle double [c_removable_as_pole]   · une singularité essentielle
  [examen mcq]
  pièges : c_removable_as_pole

Classe les singularités de ces deux fonctions.
  [problème, examen open, 3 points]
  partie 1 (Première fonction : 0,5 ; On conclut : 1)
  Nature de la singularité de f(z) = (z + 1)²/sin(z + 1) en z₀ = −1 ; si c'est un pôle, son ordre.
    [free, sans aide, suivre l'erreur]  sin(h)
      (On pose h = z + 1 : f = h²/sin(h). Le dénominateur :)
      = h + h·ε(h)   ← DL usuel
    — On conclut :  [juge cvalue]  départ : m
      ? ord(dénominateur) = 1, ord(numérateur) = 2 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
      = 0   ← le numérateur compense
  partie 2 (Seconde fonction : 0,5 ; Le dénominateur : 0,5 ; On conclut : 0,5)
  Nature de la singularité de f(z) = (e^z − 1)/sin(z) en z₀ = 0 ; si c'est un pôle, son ordre.
    [free, sans aide, suivre l'erreur]  e^z − 1
      (Le numérateur :)
      = z + z·ε(z)   ← DL usuel
    — Le dénominateur :  [juge series]  départ : sin(z)
      = z + z·ε(z)   ← DL usuel
    — On conclut :  [juge cvalue]  départ : m
      ? ord(dénominateur) = 1, ord(numérateur) = 1 : la singularité est ✔ apparente (pas de puissance négative) / · un pôle / · essentielle
      = 0   ← le numérateur compense
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, c_removable_as_pole

```

## Résidu en un pôle simple (`c-res-simple`, BA3)

_Res(p/q ; z₀) = p(z₀)/q′(z₀) quand q a un zéro simple en z₀._

### Niveau 1

```
z₀ = −i est un pôle simple de f(z) = z²/((z + i)(z + 3)). Calcule Res(f ; −i).
  [guided]  Res(f ; −i)
    (Le dénominateur est q(z) = (z + i)(z + 3), q′(z) = 2z + 3 + i et q′(−i) = 3 − i. Le numérateur vaut p(−i) = −1.)
    = (−1)/(□)   (trous : (−1)/(3 − i))   ← p(z₀) = −1, q′(z₀) = 3−i
    = □   (trous : −3/10 − i/10)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z + 3 + i, donc q′(−i) = 3 − i. | Res = (−1)/(3 − i) = −3/10 − i/10

z₀ = 2π est un pôle simple de f(z) = 1/(sin(z)). Calcule Res(f ; 2π).
  [guided]  Res(f ; 2π)
    (Le dénominateur est q(z) = sin(z), q′(z) = cos(z) et q′(2π) = 1. Le numérateur vaut p(2π) = 1.)
    = □   (trous : 1)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = cos(z), donc q′(2π) = 1. | Res = 1/(1) = 1

z₀ = −2 est un pôle simple de f(z) = z/((z + 2)(z − 2i)). Calcule Res(f ; −2).
  [guided]  Res(f ; −2)
    (Le dénominateur est q(z) = (z + 2)(z − 2i), q′(z) = 2z + 2 − 2i et q′(−2) = −2 − 2i. Le numérateur vaut p(−2) = −2.)
    = (−2)/(□)   (trous : (−2)/(−2 − 2i))   ← p(z₀) = −2, q′(z₀) = −2−2i
    = □   (trous : 1/2 − i/2)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z + 2 − 2i, donc q′(−2) = −2 − 2i. | Res = (−2)/(−2 − 2i) = 1/2 − i/2

```

### Niveau 2

```
z₀ = 2i est un pôle simple de f(z) = 1/(z² + 4). Calcule Res(f ; 2i).
  [guided]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = □   (trous : 2z)   ← Dériver q
  — q′(z) = 2z. En z₀ :  [juge cval]  départ : d/dz q(2i)
    = □   (trous : 4i)   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; 2i)
    = □   (trous : 1/(4i))   ← p(z₀) = 1, q′(z₀) = 4i
    = □   (trous : −i/4)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z, donc q′(2i) = 4i. | Res = 1/(4i) = −i/4

z₀ = i est un pôle simple de f(z) = z/(z² + 1). Calcule Res(f ; i).
  [guided]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = □   (trous : 2z)   ← Dériver q
  — q′(z) = 2z. En z₀ :  [juge cval]  départ : d/dz q(i)
    = □   (trous : 2i)   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; i)
    = □   (trous : i/(2i))   ← p(z₀) = i, q′(z₀) = 2i
    = □   (trous : 1/2)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z, donc q′(i) = 2i. | Res = i/(2i) = 1/2

z₀ = −i est un pôle simple de f(z) = z²/((z + i)(z − 2i)). Calcule Res(f ; −i).
  [guided]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = □   (trous : 2z − i)   ← Dériver q
  — q′(z) = 2z − i. En z₀ :  [juge cval]  départ : d/dz q(−i)
    = □   (trous : 2(−i) − (i))   ← Remplacer z par z₀
    = □   (trous : −3i)   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −i)
    = □   (trous : (−1)/(−3i))   ← p(z₀) = −1, q′(z₀) = −3i
    = □   (trous : −i/3)   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z − i, donc q′(−i) = −3i. | Res = (−1)/(−3i) = −i/3

```

### Niveau 3

```
z₀ = −1 + i est un pôle simple de f(z) = 1/(z⁴ + 4). Calcule Res(f ; −1 + i).
  [tap, suivre l'erreur, menu menu]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = 4z³   ← Dériver q
  — q′(z) = 4z³. En z₀ :  [juge cval]  départ : d/dz q(−1 + i)
    = 4(−1 + i)³   ← Remplacer z par z₀
    = 8 + 8i   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −1+i)
    = 1/(8 + 8i)   ← p(z₀) = 1, q′(z₀) = 8+8i
    = 1/16 − i/16   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 4z³, donc q′(−1 + i) = 8 + 8i. | Res = 1/(8 + 8i) = 1/16 − i/16

z₀ = −3i est un pôle simple de f(z) = e^(2iz)/(z² + 9). Calcule Res(f ; −3i).
  [tap, suivre l'erreur, menu menu]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = 2z   ← Dériver q
  — q′(z) = 2z. En z₀ :  [juge cval]  départ : d/dz q(−3i)
    = −6i   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −3i)
    = e^(6)/(−6i)   ← p(z₀) = e^(6), q′(z₀) = −6i
    = ie^(6)/6   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z, donc q′(−3i) = −6i. | Res = e^6/(−6i) = ie^6/6
  pièges : c_essential_factor

z₀ = −1 − i est un pôle simple de f(z) = 1/(z⁴ + 4). Calcule Res(f ; −1 − i).
  [tap, suivre l'erreur, menu menu]  d/dz q(z)
    ? Quelle formule pour ce pôle simple ? ✔ Res = p(z₀)/q′(z₀) / ✔ Res = lim (z − z₀)·f(z) / ✔ Développer f en série de Laurent / · Res = p(z₀)/q(z₀)
    = 4z³   ← Dériver q
  — q′(z) = 4z³. En z₀ :  [juge cval]  départ : d/dz q(−1 − i)
    = 4(−1 − i)³   ← Remplacer z par z₀
    = 8 − 8i   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −1−i)
    = 1/(8 − 8i)   ← p(z₀) = 1, q′(z₀) = 8−8i
    = 1/16 + i/16   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 4z³, donc q′(−1 − i) = 8 − 8i. | Res = 1/(8 − 8i) = 1/16 + i/16

```

### Niveau 4

```
z₀ = −π/2 est un pôle simple de f(z) = 1/(cos(z)). Calcule Res(f ; −π/2).
  [free, suivre l'erreur]  d/dz q(z)
    = −sin(z)   ← Dériver q
  — q′(z) = −sin(z). En z₀ :  [juge cval]  départ : d/dz q(−π/2)
    = −sin(−π/2)   ← Remplacer z par z₀
    = 1   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −π/2)
    = 1   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = −sin(z), donc q′(−π/2) = 1. | Res = 1/(1) = 1

z₀ = −3 est un pôle simple de f(z) = z/((z + 3)(z + 2i)). Calcule Res(f ; −3).
  [free, suivre l'erreur]  d/dz q(z)
    = 2z + 3 + 2i   ← Dériver q
  — q′(z) = 2z + 3 + 2i. En z₀ :  [juge cval]  départ : d/dz q(−3)
    = 2(−3) − (−3 − 2i)   ← Remplacer z par z₀
    = −3 + 2i   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −3)
    = (−3)/(−3 + 2i)   ← p(z₀) = −3, q′(z₀) = −3+2i
    = 9/13 + 6i/13   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = 2z + 3 + 2i, donc q′(−3) = −3 + 2i. | Res = (−3)/(−3 + 2i) = 9/13 + 6i/13

z₀ = −π/2 est un pôle simple de f(z) = z/(cos(z)). Calcule Res(f ; −π/2).
  [free, suivre l'erreur]  d/dz q(z)
    = −sin(z)   ← Dériver q
  — q′(z) = −sin(z). En z₀ :  [juge cval]  départ : d/dz q(−π/2)
    = −sin(−π/2)   ← Remplacer z par z₀
    = 1   ← Calculer
  — Le résidu :  [juge cval]  départ : Res(f ; −π/2)
    = (−π/2)/(1)   ← p(z₀) = −π/2, q′(z₀) = 1
    = −π/2   ← Simplifier
  aides : Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀). | q′(z) = −sin(z), donc q′(−π/2) = 1. | Res = (−π/2)/(1) = −π/2

```

### Niveau 5

```
Calcule les résidus de f(z) = 1/((z² + 4)(z² + 9)) en tous ses pôles du demi-plan Im z < 0 (ce sont des pôles simples). Commence par le pôle de plus petit module.
  [free, sans aide]  Res(f ; −2i)
    = 1/(2(−2i)((−2i)² + 9))   ← p(z₀)/q′(z₀)
    = i/20   ← p(z₀)/q′(z₀)
  — Pôle suivant, z = −3i :  [juge cval]  départ : Res(f ; −3i)
    = 1/(2(−3i)((−3i)² + 4))   ← p(z₀)/q′(z₀)
    = −i/30   ← p(z₀)/q′(z₀)

Calcule les résidus de f(z) = z²/(z⁴ + 4) en tous ses pôles du demi-plan Im z > 0. Commence par le pôle de plus petit module.
  [free, sans aide]  Res(f ; 1+i)
    = 2i/(4(1 + i)³)   ← p(z₀)/q′(z₀)
    = 1/8 − i/8   ← p(z₀)/q′(z₀)
  — Pôle suivant, z = −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = (−2i)/(4(−1 + i)³)   ← p(z₀)/q′(z₀)
    = −1/8 − i/8   ← p(z₀)/q′(z₀)

Calcule les résidus de f(z) = z²/(z⁴ + 4) en tous ses pôles du demi-plan Im z > 0. Commence par le pôle de plus petit module.
  [free, sans aide]  Res(f ; 1+i)
    = 2i/(4(1 + i)³)   ← p(z₀)/q′(z₀)
    = 1/8 − i/8   ← p(z₀)/q′(z₀)
  — Pôle suivant, z = −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = (−2i)/(4(−1 + i)³)   ← p(z₀)/q′(z₀)
    = −1/8 − i/8   ← p(z₀)/q′(z₀)

```

### Variantes d'examen

```
Soit f(z) = 1/(z⁴ + 4). Res(f ; 1 − i) =
  ✔ −1/16 + i/16   · −1/8 + i/8   · −8 − 8i   · 1/16 − i/16
  [examen mcq]

z₀ = −3 est un pôle simple de f(z) = 1/((z + 3)(z − 2)). Calcule Res(f ; −3).
  [free, sans aide, examen coef]  Res(f ; −3)
    = 1/(−5)   ← p(z₀) = 1, q′(z₀) = −5
    = −1/5   ← Simplifier

```

## Résidu en un pôle multiple (`c-res-multiple`, BA3)

_Pôle d'ordre m : on dérive m − 1 fois (z − z₀)^m f et on divise par (m − 1)!._

### Niveau 1

```
Calcule Res(f ; −1) pour f(z) = e^z/((z + 1)³(z − 3)).
  [guided]  (z + 1)³f(z)
    (z₀ = −1 est un pôle d'ordre m = 3. On pose φ(z) = (z − z₀)^3 f(z) ; alors Res(f ; z₀) = φ″(z₀)/2!.)
    = □   (trous : e^z/(z − 3))   ← z₀ = −1 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = e^z/(z − 3). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = □   (trous : e^z((z − 3)² − 2(z − 3) + 2)/(z − 3)³)   ← Dériver
  — En z₀ = −1 :  [juge cval]  départ : Res(f ; −1)
    = □   (trous : (1/2)(e^(−1)(((−1) − 3)² − 2((−1) − 3) + 2)/((−1) − 3)³))   ← 1/(m − 1)! · φ″(z₀)
    = □   (trous : (−13/64)e^(−1))   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = e^z/(z − 3), φ″(z) = e^z((z − 3)² − 2(z − 3) + 2)/(z − 3)³. | Res = (−13/64)e^−1
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; 1) pour f(z) = 1/((z − 1)³(z − 2)).
  [guided]  (z − 1)³f(z)
    (z₀ = 1 est un pôle d'ordre m = 3. On pose φ(z) = (z − z₀)^3 f(z) ; alors Res(f ; z₀) = φ″(z₀)/2!.)
    = □   (trous : 1/(z − 2))   ← z₀ = 1 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = 1/(z − 2). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = □   (trous : 2/(z − 2)³)   ← Dériver
  — En z₀ = 1 :  [juge cval]  départ : Res(f ; 1)
    = □   (trous : (1/2)(2/((1) − 2)³))   ← 1/(m − 1)! · φ″(z₀)
    = □   (trous : −1)   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = 1/(z − 2), φ″(z) = 2/(z − 2)³. | Res = −1
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; 0) pour f(z) = e^z/(z²(z + 2)).
  [guided]  z²f(z)
    (z₀ = 0 est un pôle d'ordre m = 2. On pose φ(z) = (z − z₀)^2 f(z) ; alors Res(f ; z₀) = φ′(z₀)/1!.)
    = □   (trous : e^z/(z + 2))   ← z₀ = 0 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^z/(z + 2). On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = □   (trous : e^z((z + 2) − 1)/(z + 2)²)   ← Dériver
  — En z₀ = 0 :  [juge cval]  départ : Res(f ; 0)
    = □   (trous : e^(0)(((0) + 2) − 1)/((0) + 2)²)   ← 1/(m − 1)! · φ′(z₀)
    = □   (trous : 1/4)   ← Simplifier
  aides : Ordre m = 2 : on dérive 1 fois (z − z₀)^2 f et on divise par 1!. | φ(z) = e^z/(z + 2), φ′(z) = e^z((z + 2) − 1)/(z + 2)². | Res = 1/4
  pièges : c_simple_formula_double, c_multiple_factorial

```

### Niveau 2

```
Calcule Res(f ; 1) pour f(z) = 1/((z − 1)³(z + 1)).
  [guided]  (z − 1)³f(z)
    ? z₀ = 1 : quelle formule ? ✔ Pôle d'ordre 3 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = □   (trous : 1/(z + 1))   ← z₀ = 1 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = 1/(z + 1). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = □   (trous : 2/(z + 1)³)   ← Dériver
  — En z₀ = 1 :  [juge cval]  départ : Res(f ; 1)
    = □   (trous : (1/2)(2/((1) + 1)³))   ← 1/(m − 1)! · φ″(z₀)
    = □   (trous : 1/8)   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = 1/(z + 1), φ″(z) = 2/(z + 1)³. | Res = 1/8
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; −2) pour f(z) = z/((z + 2)³(z − 2)).
  [guided]  (z + 2)³f(z)
    ? z₀ = −2 : quelle formule ? ✔ Pôle d'ordre 3 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = □   (trous : z/(z − 2))   ← z₀ = −2 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = z/(z − 2). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = □   (trous : 4/(z − 2)³)   ← Dériver
  — En z₀ = −2 :  [juge cval]  départ : Res(f ; −2)
    = □   (trous : (1/2)(4/((−2) − 2)³))   ← 1/(m − 1)! · φ″(z₀)
    = □   (trous : −1/32)   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = z/(z − 2), φ″(z) = 4/(z − 2)³. | Res = −1/32
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; −2) pour f(z) = e^z/((z + 2)³(z − 2)).
  [guided]  (z + 2)³f(z)
    ? z₀ = −2 : quelle formule ? ✔ Pôle d'ordre 3 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = □   (trous : e^z/(z − 2))   ← z₀ = −2 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = e^z/(z − 2). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = □   (trous : e^z((z − 2)² − 2(z − 2) + 2)/(z − 2)³)   ← Dériver
  — En z₀ = −2 :  [juge cval]  départ : Res(f ; −2)
    = □   (trous : (1/2)(e^(−2)(((−2) − 2)² − 2((−2) − 2) + 2)/((−2) − 2)³))   ← 1/(m − 1)! · φ″(z₀)
    = □   (trous : (−13/64)e^(−2))   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = e^z/(z − 2), φ″(z) = e^z((z − 2)² − 2(z − 2) + 2)/(z − 2)³. | Res = (−13/64)e^−2
  pièges : c_simple_formula_double, c_multiple_factorial

```

### Niveau 3

```
Calcule Res(f ; 0) pour f(z) = e^z/(z³(z + 1)).
  [tap, suivre l'erreur, menu menu]  z³f(z)
    ? z₀ = 0 : quelle formule ? ✔ Pôle d'ordre 3 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = e^z/(z + 1)   ← z₀ = 0 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = e^z/(z + 1). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = e^z((z + 1)² − 2(z + 1) + 2)/(z + 1)³   ← Dériver
  — En z₀ = 0 :  [juge cval]  départ : Res(f ; 0)
    = (1/2)(e^(0)(((0) + 1)² − 2((0) + 1) + 2)/((0) + 1)³)   ← 1/(m − 1)! · φ″(z₀)
    = 1/2   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = e^z/(z + 1), φ″(z) = e^z((z + 1)² − 2(z + 1) + 2)/(z + 1)³. | Res = 1/2
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; −2) pour f(z) = e^z/((z + 2)²z).
  [tap, suivre l'erreur, menu menu]  (z + 2)²f(z)
    ? z₀ = −2 : quelle formule ? ✔ Pôle d'ordre 2 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = e^z/z   ← z₀ = −2 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^z/z. On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^z(z − 1)/z²   ← Dériver
  — En z₀ = −2 :  [juge cval]  départ : Res(f ; −2)
    = e^(−2)((−2) − 1)/(−2)²   ← 1/(m − 1)! · φ′(z₀)
    = (−3/4)e^(−2)   ← Simplifier
  aides : Ordre m = 2 : on dérive 1 fois (z − z₀)^2 f et on divise par 1!. | φ(z) = e^z/z, φ′(z) = e^z(z − 1)/z². | Res = (−3/4)e^−2
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; 2) pour f(z) = e^z/((z − 2)²).
  [tap, suivre l'erreur, menu menu]  (z − 2)²f(z)
    ? z₀ = 2 : quelle formule ? ✔ Pôle d'ordre 2 : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] / · Pôle simple : Res = lim (z − z₀)f(z)
    = e^z   ← z₀ = 2 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^z. On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^z   ← Dériver
  — En z₀ = 2 :  [juge cval]  départ : Res(f ; 2)
    = e^(2)   ← Simplifier
  aides : Ordre m = 2 : on dérive 1 fois (z − z₀)^2 f et on divise par 1!. | φ(z) = e^z, φ′(z) = e^z. | Res = e^2
  pièges : c_simple_formula_double, c_multiple_factorial

```

### Niveau 4

```
Calcule Res(f ; 0) pour f(z) = e^z/(z²(z − 3)).
  [free, suivre l'erreur]  z²f(z)
    = e^z/(z − 3)   ← z₀ = 0 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^z/(z − 3). On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^z((z − 3) − 1)/(z − 3)²   ← Dériver
  — En z₀ = 0 :  [juge cval]  départ : Res(f ; 0)
    = e^(0)(((0) − 3) − 1)/((0) − 3)²   ← 1/(m − 1)! · φ′(z₀)
    = −4/9   ← Simplifier
  aides : Ordre m = 2 : on dérive 1 fois (z − z₀)^2 f et on divise par 1!. | φ(z) = e^z/(z − 3), φ′(z) = e^z((z − 3) − 1)/(z − 3)². | Res = −4/9
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; 2) pour f(z) = e^z/((z − 2)³).
  [free, suivre l'erreur]  (z − 2)³f(z)
    = e^z   ← z₀ = 2 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = e^z. On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = e^z   ← Dériver
  — En z₀ = 2 :  [juge cval]  départ : Res(f ; 2)
    = e^(2)/2   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = e^z, φ″(z) = e^z. | Res = e^2/2
  pièges : c_simple_formula_double, c_multiple_factorial

Calcule Res(f ; −1) pour f(z) = e^z/((z + 1)³(z + 2)).
  [free, suivre l'erreur]  (z + 1)³f(z)
    = e^z/(z + 2)   ← z₀ = −1 est un pôle d'ordre 3 : on simplifie
  — φ(z) = (z − z₀)^3 f(z) = e^z/(z + 2). On dérive deux fois :  [juge cval]  départ : d2/dz2 φ(z)
    = e^z((z + 2)² − 2(z + 2) + 2)/(z + 2)³   ← Dériver
  — En z₀ = −1 :  [juge cval]  départ : Res(f ; −1)
    = (1/2)(e^(−1)(((−1) + 2)² − 2((−1) + 2) + 2)/((−1) + 2)³)   ← 1/(m − 1)! · φ″(z₀)
    = (1/2)e^(−1)   ← Simplifier
  aides : Ordre m = 3 : on dérive 2 fois (z − z₀)^3 f et on divise par 2!. | φ(z) = e^z/(z + 2), φ″(z) = e^z((z + 2)² − 2(z + 2) + 2)/(z + 2)³. | Res = (1/2)e^−1
  pièges : c_simple_formula_double, c_multiple_factorial

```

### Niveau 5

```
Laplace inverse par les résidus : y(t) = Σ Res(e^(zt)F(z)) pour F(z) = 1/((z + 2)²(z + 3)), t > 0. Calcule les résidus de e^(zt)/((z + 2)²(z + 3)), puis y(t).
  [free, sans aide]  (z + 2)²f(z)
    = e^(zt)/(z + 3)   ← z₀ = −2 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^(zt)/(z + 3). On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^(zt)(t(z + 3) − 1)/(z + 3)²   ← Dériver
  — En z₀ = −2 :  [juge cval]  départ : Res(f ; −2)
    = e^((−2)t)(t((−2) + 3) − 1)/((−2) + 3)²   ← 1/(m − 1)! · φ′(z₀)
    = (t − 1)e^(−2t)   ← Simplifier
  — Le pôle simple z = -3 :  [juge cval]  départ : Res(f ; −3)
    = e^(−3t)/((−3) − (−2))²   ← p(z₀)/q′(z₀)
    = e^(−3t)   ← p(z₀)/q′(z₀)
  — La fonction est la somme des résidus :  [juge cval]  départ : y(t)
    = (t − 1)e^(−2t) + e^(−3t)   ← Somme des résidus
  pièges : c_simple_formula_double, c_multiple_factorial

Laplace inverse par les résidus : y(t) = Σ Res(e^(zt)F(z)) pour F(z) = 1/((z + 1)²(z + 2)), t > 0. Calcule les résidus de e^(zt)/((z + 1)²(z + 2)), puis y(t).
  [free, sans aide]  (z + 1)²f(z)
    = e^(zt)/(z + 2)   ← z₀ = −1 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^(zt)/(z + 2). On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^(zt)(t(z + 2) − 1)/(z + 2)²   ← Dériver
  — En z₀ = −1 :  [juge cval]  départ : Res(f ; −1)
    = e^((−1)t)(t((−1) + 2) − 1)/((−1) + 2)²   ← 1/(m − 1)! · φ′(z₀)
    = (t − 1)e^(−t)   ← Simplifier
  — Le pôle simple z = -2 :  [juge cval]  départ : Res(f ; −2)
    = e^(−2t)/((−2) − (−1))²   ← p(z₀)/q′(z₀)
    = e^(−2t)   ← p(z₀)/q′(z₀)
  — La fonction est la somme des résidus :  [juge cval]  départ : y(t)
    = (t − 1)e^(−t) + e^(−2t)   ← Somme des résidus
  pièges : c_simple_formula_double, c_multiple_factorial

Laplace inverse par les résidus : y(t) = Σ Res(e^(zt)F(z)) pour F(z) = 1/((z − 1)²(z − 2)), t > 0. Calcule les résidus de e^(zt)/((z − 1)²(z − 2)), puis y(t).
  [free, sans aide]  (z − 1)²f(z)
    = e^(zt)/(z − 2)   ← z₀ = 1 est un pôle d'ordre 2 : on simplifie
  — φ(z) = (z − z₀)^2 f(z) = e^(zt)/(z − 2). On dérive une fois :  [juge cval]  départ : d/dz φ(z)
    = e^(zt)(t(z − 2) − 1)/(z − 2)²   ← Dériver
  — En z₀ = 1 :  [juge cval]  départ : Res(f ; 1)
    = e^((1)t)(t((1) − 2) − 1)/((1) − 2)²   ← 1/(m − 1)! · φ′(z₀)
    = (−t − 1)e^(t)   ← Simplifier
  — Le pôle simple z = 2 :  [juge cval]  départ : Res(f ; 2)
    = e^(2t)/((2) − (1))²   ← p(z₀)/q′(z₀)
    = e^(2t)   ← p(z₀)/q′(z₀)
  — La fonction est la somme des résidus :  [juge cval]  départ : y(t)
    = (−t − 1)e^(t) + e^(2t)   ← Somme des résidus
  pièges : c_simple_formula_double, c_multiple_factorial

```

### Variantes d'examen

```
Soit f(z) = e^z/((z + 1)²). Res(f ; −1) =
  · e^−1/2 [c_multiple_factorial]   · −e^−1   · 2e^−1   ✔ e^−1
  [examen mcq]
  pièges : c_multiple_factorial

Calcule Res(f ; 1) pour f(z) = z/((z − 1)³(z + 2)).
  [free, sans aide, examen coef]  Res(f ; 1)
    = (1/2)(−4/((1) + 2)³)   ← 1/(m − 1)! · φ″(z₀)
    = −2/27   ← Simplifier
  pièges : c_simple_formula_double, c_multiple_factorial

```

## Résidu par la série de Laurent (singularité essentielle) (`c-res-laurent`, BA3)

_En une singularité essentielle, le résidu est a₋₁ : on développe et on lit._

### Niveau 1

```
h(z) = sin(1/(2 − z)) a une singularité essentielle en z₀ = 2. Trouve sa série de Laurent, puis Res(h ; 2).
  [guided]  sin(−1/w)
    (On pose w = z − 2 : 1/(2 − z) = −1/w.)
    = □ + 1/w³·ε(w)   (trous : −1/w + 1/(6w³) + 1/w³·ε(w))   ← sin u = u − u³/6 + …, u = −1/w
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 2)
    = □   (trous : −1)   ← a₋₁
  aides : Pose w = z − 2 : 1/(2−z) = −1/w, puis développe sin u avec u = −1/w. | h = −1/w + 1/(6w³) + 1/w³·ε(x) | −1/w + 1/(6w³) + 1/w³·ε(x) : a₋₁ = −1
  pièges : c_essential_lim, c_essential_factor

h(z) = zcosh(1/z) a une singularité essentielle en z₀ = 0. Trouve sa série de Laurent, puis Res(h ; 0).
  [guided]  cosh(1/z)
    = □ + 1/z²·ε(z)   (trous : 1 + 1/(2z²) + 1/z²·ε(z))   ← DL usuel en u = 1/z
  — On multiplie par z :  [juge laur]  départ : z(1 + 1/(2z²) + 1/z²·ε(z))
    = □ + 1/z·ε(z)   (trous : z + 1/(2z) + 1/z·ε(z))   ← Multiplier terme à terme
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 0)
    = □   (trous : 1/2)   ← a₋₁
  aides : Développe cosh u avec u = 1/z, puis multiplie par z. | cosh(1/z) = 1 + 1/(2z²) + 1/z²·ε(x) | z + 1/(2z) + 1/z·ε(x) : a₋₁ = 1/2
  pièges : c_essential_lim

h(z) = e^(1/(2 − 2z)) a une singularité essentielle en z₀ = 1. Trouve sa série de Laurent, puis Res(h ; 1).
  [guided]  e^(−1/(2w))
    (On pose w = z − 1 : 1/(2 − 2z) = −1/(2w).)
    = □ + 1/w²·ε(w)   (trous : 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(w))   ← eᵘ = 1 + u + u²/2 + …, u = −1/(2w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 1)
    = □   (trous : −1/2)   ← a₋₁
  aides : Pose w = z − 1 : 1/(2−2z) = −1/(2w), puis développe eᵘ avec u = −1/(2w). | h = 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) | 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) : a₋₁ = −1/2
  pièges : c_essential_lim, c_essential_factor

```

### Niveau 2

```
h(z) = sin(1/z) a une singularité essentielle en z₀ = 0. Trouve sa série de Laurent, puis Res(h ; 0).
  [guided]  sin(1/z)
    = □ + 1/z·ε(z)   (trous : 1/z + 1/z·ε(z))   ← DL usuel en u = 1/z
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 0)
    = □   (trous : 1)   ← a₋₁
  aides : Développe sin u avec u = 1/z. | sin(1/z) = 1/z + 1/z·ε(x) | 1/z + 1/z·ε(x) : a₋₁ = 1
  pièges : c_essential_lim

h(z) = sin(1/(2 − 3z)) a une singularité essentielle en z₀ = 2/3. Trouve sa série de Laurent, puis Res(h ; 2/3).
  [guided]  1/(2 − 3z)
    (On pose w = z − 2/3, donc z = w + 2/3.)
    = □   (trous : −1/(3w))   ← z = w+2/3
  — 1/(2 − 3z) = −1/(3w). Développe en puissances de 1/w :  [juge laur]  départ : sin(−1/(3w))
    = □ + 1/w³·ε(w)   (trous : −1/(3w) + 1/(162w³) + 1/w³·ε(w))   ← sin u = u − u³/6 + …, u = −1/(3w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 2/3)
    = □   (trous : −1/3)   ← a₋₁
  aides : Pose w = z − 2/3 : 1/(2−3z) = −1/(3w), puis développe sin u avec u = −1/(3w). | h = −1/(3w) + 1/(162w³) + 1/w³·ε(x) | −1/(3w) + 1/(162w³) + 1/w³·ε(x) : a₋₁ = −1/3
  pièges : c_essential_lim, c_essential_factor

h(z) = e^(1/(2i − 2z)) a une singularité essentielle en z₀ = i. Trouve sa série de Laurent, puis Res(h ; i).
  [guided]  1/(2i − 2z)
    (On pose w = z − i, donc z = w + i.)
    = □   (trous : −1/(2w))   ← z = w+i
  — 1/(2i − 2z) = −1/(2w). Développe en puissances de 1/w :  [juge laur]  départ : e^(−1/(2w))
    = □ + 1/w²·ε(w)   (trous : 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(w))   ← eᵘ = 1 + u + u²/2 + …, u = −1/(2w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; i)
    = □   (trous : −1/2)   ← a₋₁
  aides : Pose w = z − i : 1/(2i−2z) = −1/(2w), puis développe eᵘ avec u = −1/(2w). | h = 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) | 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) : a₋₁ = −1/2
  pièges : c_essential_lim, c_essential_factor

```

### Niveau 3

```
h(z) = sin(1/(−1 − 2z)) a une singularité essentielle en z₀ = −1/2. Trouve sa série de Laurent, puis Res(h ; −1/2).
  [tap, suivre l'erreur, menu menu]  1/(−1 − 2z)
    (On pose w = z + 1/2, donc z = w − 1/2.)
    ? En z₀ = −1/2, h a une singularité essentielle. Comment trouver le résidu ? ✔ Avec la série de Laurent : Res = a₋₁ / · Avec une formule de pôle : lim (z − z₀)h(z)
    = −1/(2w)   ← z = w−1/2
  — 1/(−1 − 2z) = −1/(2w). Développe en puissances de 1/w :  [juge laur]  départ : sin(−1/(2w))
    = −1/(2w) + 1/(48w³) + 1/w³·ε(w)   ← sin u = u − u³/6 + …, u = −1/(2w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; −1/2)
    = −1/2   ← a₋₁
  aides : Pose w = z − −1/2 : 1/(−1−2z) = −1/(2w), puis développe sin u avec u = −1/(2w). | h = −1/(2w) + 1/(48w³) + 1/w³·ε(x) | −1/(2w) + 1/(48w³) + 1/w³·ε(x) : a₋₁ = −1/2
  pièges : c_essential_lim, c_essential_factor

h(z) = cos(1/(i − z)) a une singularité essentielle en z₀ = i. Trouve sa série de Laurent, puis Res(h ; i).
  [tap, suivre l'erreur, menu menu]  1/(i − z)
    (On pose w = z − i, donc z = w + i.)
    ? En z₀ = i, h a une singularité essentielle. Comment trouver le résidu ? ✔ Avec la série de Laurent : Res = a₋₁ / · Avec une formule de pôle : lim (z − z₀)h(z)
    = −1/w   ← z = w+i
  — 1/(i − z) = −1/w. Développe en puissances de 1/w :  [juge laur]  départ : cos(−1/w)
    = 1 − 1/(2w²) + 1/w³·ε(w)   ← cos u = 1 − u²/2 + …, u = −1/w
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; i)
    = 0   ← a₋₁
  aides : Pose w = z − i : 1/(i−z) = −1/w, puis développe cos u avec u = −1/w. | h = 1 − 1/(2w²) + 1/w³·ε(x) | 1 − 1/(2w²) + 1/w³·ε(x) : a₋₁ = 0
  pièges : c_essential_lim

h(z) = sinh(1/(1 − z)) a une singularité essentielle en z₀ = 1. Trouve sa série de Laurent, puis Res(h ; 1).
  [tap, suivre l'erreur, menu menu]  1/(1 − z)
    (On pose w = z − 1, donc z = w + 1.)
    ? En z₀ = 1, h a une singularité essentielle. Comment trouver le résidu ? ✔ Avec la série de Laurent : Res = a₋₁ / · Avec une formule de pôle : lim (z − z₀)h(z)
    = −1/w   ← z = w+1
  — 1/(1 − z) = −1/w. Développe en puissances de 1/w :  [juge laur]  départ : sinh(−1/w)
    = −1/w − 1/(6w³) + 1/w³·ε(w)   ← sinh u = u + u³/6 + …, u = −1/w
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 1)
    = −1   ← a₋₁
  aides : Pose w = z − 1 : 1/(1−z) = −1/w, puis développe sinh u avec u = −1/w. | h = −1/w − 1/(6w³) + 1/w³·ε(x) | −1/w − 1/(6w³) + 1/w³·ε(x) : a₋₁ = −1
  pièges : c_essential_lim, c_essential_factor

```

### Niveau 4

```
h(z) = e^(1/(3 − 2z)) a une singularité essentielle en z₀ = 3/2. Trouve sa série de Laurent, puis Res(h ; 3/2).
  [free, suivre l'erreur]  1/(3 − 2z)
    (On pose w = z − 3/2, donc z = w + 3/2.)
    = −1/(2w)   ← z = w+3/2
  — 1/(3 − 2z) = −1/(2w). Développe en puissances de 1/w :  [juge laur]  départ : e^(−1/(2w))
    = 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(w)   ← eᵘ = 1 + u + u²/2 + …, u = −1/(2w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 3/2)
    = −1/2   ← a₋₁
  aides : Pose w = z − 3/2 : 1/(3−2z) = −1/(2w), puis développe eᵘ avec u = −1/(2w). | h = 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) | 1 − 1/(2w) + 1/(8w²) + 1/w²·ε(x) : a₋₁ = −1/2
  pièges : c_essential_lim, c_essential_factor

h(z) = sin(1/(3 − 3z)) a une singularité essentielle en z₀ = 1. Trouve sa série de Laurent, puis Res(h ; 1).
  [free, suivre l'erreur]  1/(3 − 3z)
    (On pose w = z − 1, donc z = w + 1.)
    = −1/(3w)   ← z = w+1
  — 1/(3 − 3z) = −1/(3w). Développe en puissances de 1/w :  [juge laur]  départ : sin(−1/(3w))
    = −1/(3w) + 1/(162w³) + 1/w³·ε(w)   ← sin u = u − u³/6 + …, u = −1/(3w)
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 1)
    = −1/3   ← a₋₁
  aides : Pose w = z − 1 : 1/(3−3z) = −1/(3w), puis développe sin u avec u = −1/(3w). | h = −1/(3w) + 1/(162w³) + 1/w³·ε(x) | −1/(3w) + 1/(162w³) + 1/w³·ε(x) : a₋₁ = −1/3
  pièges : c_essential_lim, c_essential_factor

h(z) = sin(1/(2i − z)) a une singularité essentielle en z₀ = 2i. Trouve sa série de Laurent, puis Res(h ; 2i).
  [free, suivre l'erreur]  1/(2i − z)
    (On pose w = z − 2i, donc z = w + 2i.)
    = −1/w   ← z = w+2i
  — 1/(2i − z) = −1/w. Développe en puissances de 1/w :  [juge laur]  départ : sin(−1/w)
    = −1/w + 1/(6w³) + 1/w³·ε(w)   ← sin u = u − u³/6 + …, u = −1/w
  — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 2i)
    = −1   ← a₋₁
  aides : Pose w = z − 2i : 1/(2i−z) = −1/w, puis développe sin u avec u = −1/w. | h = −1/w + 1/(6w³) + 1/w³·ε(x) | −1/w + 1/(6w³) + 1/w³·ε(x) : a₋₁ = −1
  pièges : c_essential_lim, c_essential_factor

```

### Niveau 5

```
h(z) = sinh(1/(i − z)), z₀ = i (format 2022, 4 points).
  [problème, 4 points]
  partie 1 (Nature de la singularité : 1)
  Quelle est la nature de la singularité de h(z) = sinh(1/(i − z)) en z₀ = i ?
    · Une singularité apparente [c_removable_as_pole]   · Un pôle d'ordre 3 [c_essential_lim]   ✔ Une singularité essentielle   · Un pôle simple [c_essential_lim]
  partie 2 (Série de Laurent et résidu : 0,5 ; 1/(i − z) = −1/w. Développe en puissances de 1/w : 0,5 ; Le résidu est le coefficient a₋₁ : 2)
  Écris la série de Laurent de h autour de z₀ (jusqu'au terme en 1/(z − z₀) au moins), puis le résidu.
    [free, sans aide, suivre l'erreur]  1/(i − z)
      (On pose w = z − i, donc z = w + i.)
      = −1/w   ← z = w+i
    — 1/(i − z) = −1/w. Développe en puissances de 1/w :  [juge laur]  départ : sinh(−1/w)
      = −1/w − 1/(6w³) + 1/w³·ε(w)   ← sinh u = u + u³/6 + …, u = −1/w
    — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; i)
      = −1   ← a₋₁
  pièges : c_essential_lim, c_removable_as_pole

h(z) = sin(1/(3 − 2z)), z₀ = 3/2 (format 2022, 4 points).
  [problème, 4 points]
  partie 1 (Nature de la singularité : 1)
  Quelle est la nature de la singularité de h(z) = sin(1/(3 − 2z)) en z₀ = 3/2 ?
    · Un pôle d'ordre 3 [c_essential_lim]   · Une singularité apparente [c_removable_as_pole]   · Un pôle simple [c_essential_lim]   ✔ Une singularité essentielle
  partie 2 (Série de Laurent et résidu : 0,5 ; 1/(3 − 2z) = −1/(2w). Développe en puissances de 1/w : 0,5 ; Le résidu est le coefficient a₋₁ : 2)
  Écris la série de Laurent de h autour de z₀ (jusqu'au terme en 1/(z − z₀) au moins), puis le résidu.
    [free, sans aide, suivre l'erreur]  1/(3 − 2z)
      (On pose w = z − 3/2, donc z = w + 3/2.)
      = −1/(2w)   ← z = w+3/2
    — 1/(3 − 2z) = −1/(2w). Développe en puissances de 1/w :  [juge laur]  départ : sin(−1/(2w))
      = −1/(2w) + 1/(48w³) + 1/w³·ε(w)   ← sin u = u − u³/6 + …, u = −1/(2w)
    — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 3/2)
      = −1/2   ← a₋₁
  pièges : c_essential_lim, c_removable_as_pole

h(z) = sinh(1/(1 − 2z)), z₀ = 1/2 (format 2022, 4 points).
  [problème, 4 points]
  partie 1 (Nature de la singularité : 1)
  Quelle est la nature de la singularité de h(z) = sinh(1/(1 − 2z)) en z₀ = 1/2 ?
    · Un pôle d'ordre 3 [c_essential_lim]   ✔ Une singularité essentielle   · Un pôle simple [c_essential_lim]   · Une singularité apparente [c_removable_as_pole]
  partie 2 (Série de Laurent et résidu : 0,5 ; 1/(1 − 2z) = −1/(2w). Développe en puissances de 1/w : 0,5 ; Le résidu est le coefficient a₋₁ : 2)
  Écris la série de Laurent de h autour de z₀ (jusqu'au terme en 1/(z − z₀) au moins), puis le résidu.
    [free, sans aide, suivre l'erreur]  1/(1 − 2z)
      (On pose w = z − 1/2, donc z = w + 1/2.)
      = −1/(2w)   ← z = w+1/2
    — 1/(1 − 2z) = −1/(2w). Développe en puissances de 1/w :  [juge laur]  départ : sinh(−1/(2w))
      = −1/(2w) − 1/(48w³) + 1/w³·ε(w)   ← sinh u = u + u³/6 + …, u = −1/(2w)
    — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 1/2)
      = −1/2   ← a₋₁
  pièges : c_essential_lim, c_removable_as_pole

```

### Variantes d'examen

```
Soit h(z) = e^(1/(1 − z)). Res(h ; 1) =
  · 1 [c_essential_factor]   · 0 [c_essential_lim]   ✔ −1   · −2
  [examen mcq]
  pièges : c_essential_lim, c_essential_factor

h(z) = sinh(1/(i − 2z)) a une singularité essentielle en z₀ = i/2. Que vaut Res(h ; i/2) ?
  [free, sans aide, examen coef]  Res(h ; i/2)
    = −1/2   ← a₋₁
  pièges : c_essential_lim, c_essential_factor

h(z) = sinh(1/z), z₀ = 0 (format 2022, 4 points).
  [problème, examen open, 4 points]
  partie 1 (Nature de la singularité : 1)
  Quelle est la nature de la singularité de h(z) = sinh(1/z) en z₀ = 0 ?
    · Un pôle d'ordre 3 [c_essential_lim]   · Un pôle simple [c_essential_lim]   · Une singularité apparente [c_removable_as_pole]   ✔ Une singularité essentielle
  partie 2 (Série de Laurent et résidu : 1 ; Le résidu est le coefficient a₋₁ : 2)
  Écris la série de Laurent de h autour de z₀ (jusqu'au terme en 1/(z − z₀) au moins), puis le résidu.
    [free, sans aide, suivre l'erreur]  sinh(1/z)
      = 1/z + 1/z·ε(z)   ← DL usuel en u = 1/z
    — Le résidu est le coefficient a₋₁ :  [juge cval]  départ : Res(h ; 0)
      = 1   ← a₋₁
  pièges : c_essential_lim, c_removable_as_pole

```

## Théorème des résidus sur un contour fermé (`c-res-theorem`, BA3)

_∮ f dz = 2πi × la somme des résidus des singularités à l'intérieur._

### Niveau 1

```
Calcule ∮_Γ f(z) dz pour f(z) = (2z − 1)/(z(z − (1 + i))(z − 3)) et Γ = le cercle |z| = 2, parcouru une fois dans le sens positif.
  [guided]  Res(f ; 0)
    (Singularités : 0, 1 + i, 3. À l'intérieur de Γ : 0, 1 + i ; dehors : 3.)
    = □   (trous : (−1)/((−1 − i)(−3)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : −1/6 + i/6)   ← Calculer
  — Résidu en 1 + i :  [juge cval]  départ : Res(f ; 1+i)
    = □   (trous : (1 + 2i)/((1 + i)(−2 + i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : −1/2 − i/2)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : 2πi((−1/6 + i/6) + (−1/2 − i/2)))   ← Pôles intérieurs : 0, 1+i
    = □   (trous : 2π/3 − 4πi/3)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 0) + Res(f ; 1+i)) | Res(f ; 0) = −1/6 + i/6 ; Res(f ; 1 + i) = −1/2 − i/2
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 2/((z − i)(z − 3)(z − 1)) et Γ = le cercle |z − i| = 1, parcouru une fois dans le sens positif.
  [guided]  Res(f ; i)
    (Singularités : i, 3, 1. À l'intérieur de Γ : i ; dehors : 3, 1.)
    = □   (trous : 2/((−3 + i)(−1 + i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : 1/5 + 2i/5)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : 2πi(1/5 + 2i/5))   ← Pôles intérieurs : i
    = □   (trous : −4π/5 + 2πi/5)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; i)) | Res(f ; i) = 1/5 + 2i/5
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 2/((z − 3)(z − (1 + i))(z + 1)) et Γ = le cercle |z| = 2, parcouru une fois dans le sens positif.
  [guided]  Res(f ; 1+i)
    (Singularités : 3, 1 + i, −1. À l'intérieur de Γ : 1 + i, −1 ; dehors : 3.)
    = □   (trous : 2/((−2 + i)(2 + i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : −2/5)   ← Calculer
  — Résidu en −1 :  [juge cval]  départ : Res(f ; −1)
    = □   (trous : 2/((−4)(−2 − i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : 1/5 − i/10)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : 2πi((−2/5) + (1/5 − i/10)))   ← Pôles intérieurs : 1+i, −1
    = □   (trous : π/5 − 2πi/5)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 1+i) + Res(f ; −1)) | Res(f ; 1 + i) = −2/5 ; Res(f ; −1) = 1/5 − i/10
  pièges : c_pole_outside_counted, c_residue_2pii

```

### Niveau 2

```
Calcule ∮_Γ f(z) dz pour f(z) = (z)/((z + i)(z + 2)(z + 3)) et Γ = le cercle |z| = 3/2, parcouru une fois dans le sens positif.
  [guided]  Res(f ; −i)
    ? z = −i : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    ? z = −2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = −3 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    = □   (trous : (−i)/((2 − i)(3 − i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : 1/10 − i/10)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : 2πi(1/10 − i/10))   ← Pôles intérieurs : −i
    = □   (trous : π/5 + πi/5)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; −i)) | Res(f ; −i) = 1/10 − i/10
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 1/((z + 3)z(z + 2)) et Γ = le cercle |z − 1| = 2, parcouru une fois dans le sens positif.
  [guided]  Res(f ; 0)
    ? z = −3 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = 0 : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    ? z = −2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    = □   (trous : 1/((3)(2)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : 1/6)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : πi/3)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 0)) | Res(f ; 0) = 1/6
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = (2z − 1)/((z − i)(z − 2)(z + 2)) et Γ = le cercle |z − i| = 3/2, parcouru une fois dans le sens positif.
  [guided]  Res(f ; i)
    ? z = i : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    ? z = 2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = −2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    = □   (trous : (−1 + 2i)/((−2 + i)(2 + i)))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = □   (trous : 1/5 − 2i/5)   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = □   (trous : 2πi(1/5 − 2i/5))   ← Pôles intérieurs : i
    = □   (trous : 4π/5 + 2πi/5)   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; i)) | Res(f ; i) = 1/5 − 2i/5
  pièges : c_pole_outside_counted, c_residue_2pii

```

### Niveau 3

```
Calcule ∮_Γ f(z) dz pour f(z) = (z + 1)/((z − 2)²(z − (1 + i))) et Γ = le cercle |z − i| = 3/2, parcouru une fois dans le sens positif.
  [tap, suivre l'erreur, menu menu]  Res(f ; 1+i)
    ? z = 2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = 1+i : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    = (2 + i)/((−1 + i)²)   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −1/2 + i   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi(−1/2 + i)   ← Pôles intérieurs : 1+i
    = −2π − πi   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 1+i)) | Res(f ; 1 + i) = −1/2 + i
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 2/((z − i)(z + 2i)(z − 1)) et Γ = le cercle |z − i| = 1, parcouru une fois dans le sens positif.
  [tap, suivre l'erreur, menu menu]  Res(f ; i)
    ? z = i : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    ? z = −2i : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = 1 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    = 2/((3i)(−1 + i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −1/3 + i/3   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi(−1/3 + i/3)   ← Pôles intérieurs : i
    = −2π/3 − 2πi/3   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; i)) | Res(f ; i) = −1/3 + i/3
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 1/((z + 2)(z − i)) et Γ = le cercle |z − 1| = 5/2, parcouru une fois dans le sens positif.
  [tap, suivre l'erreur, menu menu]  Res(f ; i)
    ? z = −2 : · à l'intérieur de Γ / ✔ à l'extérieur de Γ / · sur Γ
    ? z = i : ✔ à l'intérieur de Γ / · à l'extérieur de Γ / · sur Γ
    = 1/((2 + i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 2/5 − i/5   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi(2/5 − i/5)   ← Pôles intérieurs : i
    = 2π/5 + 4πi/5   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; i)) | Res(f ; i) = 2/5 − i/5
  pièges : c_pole_outside_counted, c_residue_2pii

```

### Niveau 4

```
Calcule ∮_Γ f(z) dz pour f(z) = 2/((z + 2i)(z − 2)(z − 1)) et Γ = le cercle |z − i| = 5/2, parcouru une fois dans le sens positif.
  [free, suivre l'erreur]  Res(f ; 2)
    = 2/((2 + 2i)(1))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 1/2 − i/2   ← Calculer
  — Résidu en 1 :  [juge cval]  départ : Res(f ; 1)
    = 2/((1 + 2i)(−1))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −2/5 + 4i/5   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi((1/2 − i/2) + (−2/5 + 4i/5))   ← Pôles intérieurs : 2, 1
    = −3π/5 + πi/5   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 2) + Res(f ; 1)) | Res(f ; 2) = 1/2 − i/2 ; Res(f ; 1) = −2/5 + 4i/5
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = (z − 2)/((z + 3)(z + 1)) et Γ = le cercle |z| = 5/2, parcouru une fois dans le sens positif.
  [free, suivre l'erreur]  Res(f ; −1)
    = (−3)/((2))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −3/2   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = −3πi   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; −1)) | Res(f ; −1) = −3/2
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = 1/(z(z − 1)(z + 3)) et Γ = le cercle |z − 1| = 3, parcouru une fois dans le sens positif.
  [free, suivre l'erreur]  Res(f ; 0)
    = 1/((−1)(3))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −1/3   ← Calculer
  — Résidu en 1 :  [juge cval]  départ : Res(f ; 1)
    = 1/((1)(4))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 1/4   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi((−1/3) + (1/4))   ← Pôles intérieurs : 0, 1
    = −πi/6   ← Calculer
  aides : Seuls les pôles à l'intérieur de Γ comptent : compare leur distance au centre avec le rayon. | ∮ = 2πi (Res(f ; 0) + Res(f ; 1)) | Res(f ; 0) = −1/3 ; Res(f ; 1) = 1/4
  pièges : c_pole_outside_counted, c_residue_2pii

```

### Niveau 5

```
Calcule ∮_Γ f(z) dz pour f(z) = (2z − 1)/(z(z + 3)(z − 3)) et Γ = le carré de sommets ±2 ± 2i, parcouru une fois dans le sens positif.
  [free, sans aide]  Res(f ; 0)
    = (−1)/((3)(−3))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 1/9   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi/9   ← Calculer
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = (z − 2)/((z − 3)(z + 2i)z) et Γ = l'ellipse x²/4 + y²/1 = 1, parcouru une fois dans le sens positif.
  [free, sans aide]  Res(f ; 0)
    = (−2)/((−3)(2i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −i/3   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi(−i/3)   ← Pôles intérieurs : 0
    = 2π/3   ← Calculer
  pièges : c_pole_outside_counted, c_residue_2pii

Calcule ∮_Γ f(z) dz pour f(z) = (2z − 1)/((z + 2i)(z + 1)z(z − 1)) et Γ = l'ellipse x²/4 + y²/1 = 1, parcouru une fois dans le sens positif.
  [free, sans aide]  Res(f ; −1)
    = (−3)/((−1 + 2i)(−1)(−2))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 3/10 + 3i/5   ← Calculer
  — Résidu en 0 :  [juge cval]  départ : Res(f ; 0)
    = (−1)/((2i)(1)(−1))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = −i/2   ← Calculer
  — Résidu en 1 :  [juge cval]  départ : Res(f ; 1)
    = 1/((1 + 2i)(2)(1))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
    = 1/10 − i/5   ← Calculer
  — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
    = 2πi((3/10 + 3i/5) + (−i/2) + (1/10 − i/5))   ← Pôles intérieurs : −1, 0, 1
    = π/5 + 4πi/5   ← Calculer
  pièges : c_pole_outside_counted, c_residue_2pii

```

### Variantes d'examen

```
Calcule ∮_Γ f(z) dz pour f(z) = 2/((z + 1)²(z + 3)) et Γ = le cercle |z| = 3/2, parcouru une fois dans le sens positif. ∮_Γ f(z) dz =
  · −πi/2 [c_residue_2pii]   · 0 [c_pole_outside_counted]   ✔ −πi   · −1/2 [c_residue_2pii]
  [examen mcq]
  pièges : c_pole_outside_counted, c_residue_2pii

Soit f(z) = (2z − 1)/(z(z − 2)(z − 2i)). Calcule ∮ f(z) dz sur deux contours parcourus dans le sens positif (format 2022, 5 points).
  [problème, examen open, 5 points]
  partie 1 (Γ₁ : |z − i| = 2 : 1 ; Résidu en 2i : 1 ; Théorème des résidus : 0,5)
  Contour Γ1 = le cercle |z − i| = 2.
    [free, sans aide, suivre l'erreur]  Res(f ; 0)
      = (−1)/((−2)(−2i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
      = i/4   ← Calculer
    — Résidu en 2i :  [juge cval]  départ : Res(f ; 2i)
      = (−1 + 4i)/((2i)(−2 + 2i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
      = −3/8 − 5i/8   ← Calculer
    — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
      = 2πi((i/4) + (−3/8 − 5i/8))   ← Pôles intérieurs : 0, 2i
      = 3π/4 − 3πi/4   ← Calculer
  partie 2 (Γ₂ : |z + 1| = 3/2 : 1,5 ; Théorème des résidus : 1)
  Contour Γ2 = le cercle |z + 1| = 3/2.
    [free, sans aide, suivre l'erreur]  Res(f ; 0)
      = (−1)/((−2)(−2i))   ← Pôle simple : N(z₀)/Π(z₀ − z_j)
      = i/4   ← Calculer
    — Théorème des résidus :  [juge cval]  départ : ∮_Γ f(z) dz
      = 2πi(i/4)   ← Pôles intérieurs : 0
      = −π/2   ← Calculer

```

## Montrer qu'une intégrale sur un arc tend vers 0 (`c-arc-estimate`, BA3)

_|∫ f dz| ≤ longueur × max |f| : majorer le numérateur, minorer le dénominateur._

### Niveau 1

```
Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = e^(2iz)/(z² + 1) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Sur C_R : |e^(2iz)| = e^(−2Im z) ≤ 1 (Im z ≥ 0).
    2. Sur C_R : |z² + 1| ≥ |z|² − 1 = R² − 1 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ 1/(R² − 1) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R² − 1).
    6. πR/(R² − 1) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = ze^(2iz)/(z⁴ + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Sur C_R : |e^(2iz)| = e^(−2Im z) ≤ 1 (Im z ≥ 0), |z| = R.
    2. Sur C_R : |z⁴ + 4| ≥ |z|⁴ − 4 = R⁴ − 4 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ R/(R⁴ − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR²/(R⁴ − 4).
    6. πR²/(R⁴ − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = e^(−2iz)/(z² + 4) et le demi-cercle inférieur C_R (|z| = R, Im z ≤ 0). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Sur C_R : |e^(−2iz)| = e^(2Im z) ≤ 1 (Im z ≤ 0).
    2. Sur C_R : |z² + 4| ≥ |z|² − 4 = R² − 4 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ 1/(R² − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R² − 4).
    6. πR/(R² − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.

```

### Niveau 2

```
Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = 1/(z² + 1) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : le numérateur vaut 1.
    2. Sur C_R : |z² + 1| ≥ |z|² − 1 = R² − 1 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ 1/(R² − 1) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R² − 1).
    6. πR/(R² − 1) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
    ✗ |z² + 1| ≤ R² + 1, donc 1/|z² + 1| ≤ 1/(R² + 1). [c_arc_triangle]
  pièges : c_cos_bounded, c_arc_triangle

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = z/(z⁴ + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : |z| = R.
    2. Sur C_R : |z⁴ + 4| ≥ |z|⁴ − 4 = R⁴ − 4 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ R/(R⁴ − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR²/(R⁴ − 4).
    6. πR²/(R⁴ − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
    ✗ |z⁴ + 4| ≤ R⁴ + 4, donc 1/|z⁴ + 4| ≤ 1/(R⁴ + 4). [c_arc_triangle]
  pièges : c_cos_bounded, c_arc_triangle

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = 1/(z² + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : le numérateur vaut 1.
    2. Sur C_R : |z² + 4| ≥ |z|² − 4 = R² − 4 (inégalité triangulaire inverse).
    3. Donc |f(z)| ≤ 1/(R² − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R² − 4).
    6. πR/(R² − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ |z² + 4| ≤ R² + 4, donc 1/|z² + 4| ≤ 1/(R² + 4). [c_arc_triangle]
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
  pièges : c_arc_triangle, c_cos_bounded

```

### Niveau 3

```
Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = ze^(iz)/(z⁴ + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : |e^(iz)| = e^(−Im z) ≤ 1 (Im z ≥ 0), |z| = R.
    2. Sur C_R : |z⁴ + 4| ≥ |z|⁴ − 4 = … (à compléter, en fonction de R).   [à écrire : |z^4+4| ≥ R^4-4]
    3. Donc |f(z)| ≤ R/(R⁴ − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR²/(R⁴ − 4).
    6. πR²/(R⁴ − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ |e^(iz)| ≤ 1 sur le demi-cercle inférieur. [c_jordan_alpha_sign]
    ✗ |z⁴ + 4| ≤ R⁴ + 4, donc 1/|z⁴ + 4| ≤ 1/(R⁴ + 4). [c_arc_triangle]
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
  pièges : c_jordan_alpha_sign, c_arc_triangle, c_cos_bounded

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = e^(iz)/(z⁴ + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : |e^(iz)| = e^(−Im z) ≤ 1 (Im z ≥ 0).
    2. Sur C_R : |z⁴ + 4| ≥ |z|⁴ − 4 = … (à compléter, en fonction de R).   [à écrire : |z^4+4| ≥ R^4-4]
    3. Donc |f(z)| ≤ 1/(R⁴ − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R⁴ − 4).
    6. πR/(R⁴ − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ |e^(iz)| ≤ 1 sur le demi-cercle inférieur. [c_jordan_alpha_sign]
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
    ✗ |z⁴ + 4| ≤ R⁴ + 4, donc 1/|z⁴ + 4| ≤ 1/(R⁴ + 4). [c_arc_triangle]
  pièges : c_jordan_alpha_sign, c_cos_bounded, c_arc_triangle

Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = e^(iz)/(z⁴ + 4) et le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0). Touche les blocs dans l'ordre de la preuve (certains blocs sont faux).
  [blocs order]
    1. Sur C_R : |e^(iz)| = e^(−Im z) ≤ 1 (Im z ≥ 0).
    2. Sur C_R : |z⁴ + 4| ≥ |z|⁴ − 4 = … (à compléter, en fonction de R).   [à écrire : |z^4+4| ≥ R^4-4]
    3. Donc |f(z)| ≤ 1/(R⁴ − 4) sur C_R.
    4. La longueur de C_R est πR.
    5. |∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ πR/(R⁴ − 4).
    6. πR/(R⁴ − 4) → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.
    ✗ |z⁴ + 4| ≤ R⁴ + 4, donc 1/|z⁴ + 4| ≤ 1/(R⁴ + 4). [c_arc_triangle]
    ✗ Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ. [c_cos_bounded]
    ✗ |e^(iz)| ≤ 1 sur le demi-cercle inférieur. [c_jordan_alpha_sign]
  pièges : c_arc_triangle, c_cos_bounded, c_jordan_alpha_sign

```

### Niveau 4

```
Montre que l'intégrale de f(z) = e^(3iz)/(z² + 1) sur le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0), tend vers 0 quand R → +∞.
  [free, suivre l'erreur]  |z² + 1|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = |z|² − 1   ← |a + b| ≥ |a| − |b|
    = R² − 1   ← |z| = R
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(3iz)/(z² + 1)|
    = |e^(3iz)|/|z² + 1|   ← |a/b| = |a|/|b|
    = 1/|z² + 1|   ← |e^(3iz)| = e^(−3Im z) ≤ 1 (Im z ≥ 0)
    = 1/(R² − 1)   ← Le dénominateur minoré
  — Longueur de l'arc : πR. Majore l'intégrale :  [juge arcb]  départ : πR|e^(3iz)/(z² + 1)|
    = πR/(R² − 1)   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πR/(R² − 1)
    = 0   ← Degré du dénominateur plus grand
  aides : |∫_{C_R} f dz| ≤ longueur × max |f| : majore le numérateur, minore le dénominateur. | |z² + 1| ≥ |z|² − 1 = R² − 1 | |f(z)| ≤ 1/(R² − 1), donc |∫| ≤ πR/(R² − 1)
  pièges : c_arc_triangle

Montre que l'intégrale de f(z) = e^(iz)/(z⁴ + 4) sur le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0), tend vers 0 quand R → +∞.
  [free, suivre l'erreur]  |z⁴ + 4|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = |z|⁴ − 4   ← |a + b| ≥ |a| − |b|
    = R⁴ − 4   ← |z| = R
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(iz)/(z⁴ + 4)|
    = |e^(iz)|/|z⁴ + 4|   ← |a/b| = |a|/|b|
    = 1/|z⁴ + 4|   ← |e^(iz)| = e^(−Im z) ≤ 1 (Im z ≥ 0)
    = 1/(R⁴ − 4)   ← Le dénominateur minoré
  — Longueur de l'arc : πR. Majore l'intégrale :  [juge arcb]  départ : πR|e^(iz)/(z⁴ + 4)|
    = πR/(R⁴ − 4)   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πR/(R⁴ − 4)
    = 0   ← Degré du dénominateur plus grand
  aides : |∫_{C_R} f dz| ≤ longueur × max |f| : majore le numérateur, minore le dénominateur. | |z⁴ + 4| ≥ |z|⁴ − 4 = R⁴ − 4 | |f(z)| ≤ 1/(R⁴ − 4), donc |∫| ≤ πR/(R⁴ − 4)
  pièges : c_arc_triangle

Montre que l'intégrale de f(z) = e^(−iz)/(z² + 4) sur le demi-cercle inférieur C_R (|z| = R, Im z ≤ 0), tend vers 0 quand R → +∞.
  [free, suivre l'erreur]  |z² + 4|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = |z|² − 4   ← |a + b| ≥ |a| − |b|
    = R² − 4   ← |z| = R
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(−iz)/(z² + 4)|
    = |e^(−iz)|/|z² + 4|   ← |a/b| = |a|/|b|
    = 1/|z² + 4|   ← |e^(−iz)| = e^(Im z) ≤ 1 (Im z ≤ 0)
    = 1/(R² − 4)   ← Le dénominateur minoré
  — Longueur de l'arc : πR. Majore l'intégrale :  [juge arcb]  départ : πR|e^(−iz)/(z² + 4)|
    = πR/(R² − 4)   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πR/(R² − 4)
    = 0   ← Degré du dénominateur plus grand
  aides : |∫_{C_R} f dz| ≤ longueur × max |f| : majore le numérateur, minore le dénominateur. | |z² + 4| ≥ |z|² − 4 = R² − 4 | |f(z)| ≤ 1/(R² − 4), donc |∫| ≤ πR/(R² − 4)
  pièges : c_arc_triangle

```

### Niveau 5

```
Montre que l'intégrale de f(z) = e^(zt)/((z + 2)²(z + 1)) sur le demi-cercle gauche C_r (|z| = r, Re z ≤ 0), tend vers 0 quand r → +∞. (Laplace inverse, t > 0.)
  [free, sans aide]  |(z + 2)²(z + 1)|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = (|z| − 2)²(|z| − 1)   ← |a + b| ≥ |a| − |b|
    = (r − 2)²(r − 1)   ← |z| = r
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(zt)/((z + 2)²(z + 1))|
    = |e^(zt)|/|(z + 2)²(z + 1)|   ← |a/b| = |a|/|b|
    = 1/|(z + 2)²(z + 1)|   ← |e^(zt)| = e^(t Re z) ≤ 1 (Re z ≤ 0, t > 0)
    = 1/((r − 2)²(r − 1))   ← Le dénominateur minoré
  — Longueur de l'arc : πr. Majore l'intégrale :  [juge arcb]  départ : πr|e^(zt)/((z + 2)²(z + 1))|
    = πr/((r − 2)²(r − 1))   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πr/((r − 2)²(r − 1))
    = 0   ← Degré du dénominateur plus grand
  pièges : c_arc_triangle

Montre que l'intégrale de f(z) = e^(zt)/((z + 2)²(z + 1)) sur le demi-cercle gauche C_r (|z| = r, Re z ≤ 0), tend vers 0 quand r → +∞. (Laplace inverse, t > 0.)
  [free, sans aide]  |(z + 2)²(z + 1)|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = (|z| − 2)²(|z| − 1)   ← |a + b| ≥ |a| − |b|
    = (r − 2)²(r − 1)   ← |z| = r
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(zt)/((z + 2)²(z + 1))|
    = |e^(zt)|/|(z + 2)²(z + 1)|   ← |a/b| = |a|/|b|
    = 1/|(z + 2)²(z + 1)|   ← |e^(zt)| = e^(t Re z) ≤ 1 (Re z ≤ 0, t > 0)
    = 1/((r − 2)²(r − 1))   ← Le dénominateur minoré
  — Longueur de l'arc : πr. Majore l'intégrale :  [juge arcb]  départ : πr|e^(zt)/((z + 2)²(z + 1))|
    = πr/((r − 2)²(r − 1))   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πr/((r − 2)²(r − 1))
    = 0   ← Degré du dénominateur plus grand
  pièges : c_arc_triangle

Montre que l'intégrale de f(z) = e^(zt)/((z + 1)³) sur le demi-cercle gauche C_r (|z| = r, Re z ≤ 0), tend vers 0 quand r → +∞. (Laplace inverse, t > 0.)
  [free, sans aide]  |(z + 1)³|
    (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
    = (|z| − 1)³   ← |a + b| ≥ |a| − |b|
    = (r − 1)³   ← |z| = r
  — Majore |f| sur l'arc :  [juge arcb]  départ : |e^(zt)/((z + 1)³)|
    = |e^(zt)|/|(z + 1)³|   ← |a/b| = |a|/|b|
    = 1/|(z + 1)³|   ← |e^(zt)| = e^(t Re z) ≤ 1 (Re z ≤ 0, t > 0)
    = 1/((r − 1)³)   ← Le dénominateur minoré
  — Longueur de l'arc : πr. Majore l'intégrale :  [juge arcb]  départ : πr|e^(zt)/((z + 1)³)|
    = πr/((r − 1)³)   ← Longueur × max
  — La borne tend-elle vers 0 ?  [juge limit]  départ : πr/((r − 1)³)
    = 0   ← Degré du dénominateur plus grand
  pièges : c_arc_triangle

```

### Variantes d'examen

```
Montre que l'intégrale de f(z) = 1/(z⁴ + 4) sur le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0), tend vers 0 quand R → +∞.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Majore |f| sur l'arc : 1 ; Longueur de l'arc : πR. Majore l'intégrale : 0,5 ; La borne tend-elle vers 0 ? : 0,5)
    [free, sans aide, suivre l'erreur, examen open]  |z⁴ + 4|
      (Minore le dénominateur sur l'arc (inégalité triangulaire inverse) :)
      = |z|⁴ − 4   ← |a + b| ≥ |a| − |b|
      = R⁴ − 4   ← |z| = R
    — Majore |f| sur l'arc :  [juge arcb]  départ : |1/(z⁴ + 4)|
      = 1/|z⁴ + 4|   ← le numérateur vaut 1
      = 1/(R⁴ − 4)   ← Le dénominateur minoré
    — Longueur de l'arc : πR. Majore l'intégrale :  [juge arcb]  départ : πR|1/(z⁴ + 4)|
      = πR/(R⁴ − 4)   ← Longueur × max
    — La borne tend-elle vers 0 ?  [juge limit]  départ : πR/(R⁴ − 4)
      = 0   ← Degré du dénominateur plus grand
  pièges : c_arc_triangle

```

## Intégrales rationnelles sur ℝ (`c-int-rational`, BA3)

_∫_ℝ p/q dx = 2πi × la somme des résidus du demi-plan supérieur._

### Niveau 1

```
Calcule ∫_ℝ x²/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    (On ferme par le demi-cercle supérieur : pôles 1 + i et −1 + i.)
    = □   (trous : 2i/(−8 + 8i))   ← p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : 1/8 − i/8)   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : (−2i)/(8 + 8i))   ← p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : −1/8 − i/8)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi((1/8 − i/8) + (−1/8 − i/8)))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} x²/(x⁴ + 4) dx
    = π/2   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = 1/8 − i/8 ; Res(f ; −1 + i) = −1/8 − i/8
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ x²/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    (On ferme par le demi-cercle supérieur : pôles 1 + i et −1 + i.)
    = □   (trous : 2i/(−8 + 8i))   ← p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : 1/8 − i/8)   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : (−2i)/(8 + 8i))   ← p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : −1/8 − i/8)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi((1/8 − i/8) + (−1/8 − i/8)))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} x²/(x⁴ + 4) dx
    = π/2   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = 1/8 − i/8 ; Res(f ; −1 + i) = −1/8 − i/8
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    (On ferme par le demi-cercle supérieur : pôles 1 + i et −1 + i.)
    = □   (trous : 1/(−8 + 8i))   ← p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : −1/16 − i/16)   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : 1/(8 + 8i))   ← p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : 1/16 − i/16)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi((−1/16 − i/16) + (1/16 − i/16)))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/4)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x⁴ + 4) dx
    = π/4   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = −1/16 − i/16 ; Res(f ; −1 + i) = 1/16 − i/16
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

### Niveau 2

```
Calcule ∫_ℝ 1/(x² + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 2i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 2i / · Ceux du demi-plan inférieur : −2i / · Tous les pôles de q
    = □   (trous : 1/(4i))   ← p(z₀)/q′(z₀), z₀ = 2i
    = □   (trous : −i/4)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi(−i/4))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x² + 4) dx
    = π/2   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 2i)) | Res(f ; 2i) = −i/4
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 1+i et −1+i / · Ceux du demi-plan inférieur : 1−i et −1−i / · Tous les pôles de q
    = □   (trous : 1/(−8 + 8i))   ← p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : −1/16 − i/16)   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : 1/(8 + 8i))   ← p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : 1/16 − i/16)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi((−1/16 − i/16) + (1/16 − i/16)))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/4)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x⁴ + 4) dx
    = π/4   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = −1/16 − i/16 ; Res(f ; −1 + i) = 1/16 − i/16
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 1+i et −1+i / · Ceux du demi-plan inférieur : 1−i et −1−i / · Tous les pôles de q
    = □   (trous : 1/(−8 + 8i))   ← p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : −1/16 − i/16)   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : 1/(8 + 8i))   ← p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : 1/16 − i/16)   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = □   (trous : 2πi((−1/16 − i/16) + (1/16 − i/16)))   ← 2πi × Σ des résidus du haut
    = □   (trous : π/4)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x⁴ + 4) dx
    = π/4   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = −1/16 − i/16 ; Res(f ; −1 + i) = 1/16 − i/16
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

### Niveau 3

```
Calcule ∫_ℝ 1/((x² + 4)(x² + 9)) dx avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  Res(f ; 2i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 2i et 3i / · Ceux du demi-plan inférieur : −2i et −3i / · Tous les pôles de q
    = 1/(20i)   ← p(z₀)/q′(z₀), z₀ = 2i
    = −i/20   ← Calculer
  — Pôle 3i :  [juge cval]  départ : Res(f ; 3i)
    = 1/(−30i)   ← p(z₀)/q′(z₀), z₀ = 3i
    = i/30   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi((−i/20) + (i/30))   ← 2πi × Σ des résidus du haut
    = π/30   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/((x² + 4)(x² + 9)) dx
    = π/30   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 2i) + Res(f ; 3i)) | Res(f ; 2i) = −i/20 ; Res(f ; 3i) = i/30
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/(x² + 4)² dx avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  Res(f ; 2i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 2i / · Ceux du demi-plan inférieur : −2i / · Tous les pôles de q
    = −i/32   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi(−i/32)   ← 2πi × Σ des résidus du haut
    = π/16   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x² + 4)² dx
    = π/16   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 2i)) | Res(f ; 2i) = −i/32
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ x²/(x⁴ + 4) dx avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  Res(f ; 1+i)
    ? On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l'intérieur ? ✔ Ceux du demi-plan supérieur : 1+i et −1+i / · Ceux du demi-plan inférieur : 1−i et −1−i / · Tous les pôles de q
    = 2i/(−8 + 8i)   ← p(z₀)/q′(z₀), z₀ = 1+i
    = 1/8 − i/8   ← Calculer
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = (−2i)/(8 + 8i)   ← p(z₀)/q′(z₀), z₀ = −1+i
    = −1/8 − i/8   ← Calculer
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi((1/8 − i/8) + (−1/8 − i/8))   ← 2πi × Σ des résidus du haut
    = π/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} x²/(x⁴ + 4) dx
    = π/2   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 1+i) + Res(f ; −1+i)) | Res(f ; 1 + i) = 1/8 − i/8 ; Res(f ; −1 + i) = −1/8 − i/8
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

### Niveau 4

```
Calcule ∫_ℝ 1/(x² + 9) dx avec le théorème des résidus. Justifie que l'intégrale sur l'arc tend vers 0.
  [free, suivre l'erreur]  Res(f ; 3i)
    = 1/(6i)   ← p(z₀)/q′(z₀), z₀ = 3i
    = −i/6   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|1/(z² + 9)|
    = πR·1/(R² − 9)   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi(−i/6)   ← 2πi × Σ des résidus du haut
    = π/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x² + 9) dx
    = π/3   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 3i)) | Res(f ; 3i) = −i/6
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/((x² + 1)(x² + 9)) dx avec le théorème des résidus. Justifie que l'intégrale sur l'arc tend vers 0.
  [free, suivre l'erreur]  Res(f ; i)
    = 1/(16i)   ← p(z₀)/q′(z₀), z₀ = i
    = −i/16   ← Calculer
  — Pôle 3i :  [juge cval]  départ : Res(f ; 3i)
    = 1/(−48i)   ← p(z₀)/q′(z₀), z₀ = 3i
    = i/48   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|1/((z² + 1)(z² + 9))|
    = πR·1/((R² − 1)(R² − 9))   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi((−i/16) + (i/48))   ← 2πi × Σ des résidus du haut
    = π/12   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/((x² + 1)(x² + 9)) dx
    = π/12   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; i) + Res(f ; 3i)) | Res(f ; i) = −i/16 ; Res(f ; 3i) = i/48
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫_ℝ 1/((x² + 4)(x² + 9)) dx avec le théorème des résidus. Justifie que l'intégrale sur l'arc tend vers 0.
  [free, suivre l'erreur]  Res(f ; 2i)
    = 1/(20i)   ← p(z₀)/q′(z₀), z₀ = 2i
    = −i/20   ← Calculer
  — Pôle 3i :  [juge cval]  départ : Res(f ; 3i)
    = 1/(−30i)   ← p(z₀)/q′(z₀), z₀ = 3i
    = i/30   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|1/((z² + 4)(z² + 9))|
    = πR·1/((R² − 4)(R² − 9))   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi((−i/20) + (i/30))   ← 2πi × Σ des résidus du haut
    = π/30   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} 1/((x² + 4)(x² + 9)) dx
    = π/30   ← La valeur
  aides : Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 comptent. | ∫_ℝ f = 2πi (Res(f ; 2i) + Res(f ; 3i)) | Res(f ; 2i) = −i/20 ; Res(f ; 3i) = i/30
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

### Niveau 5

```
Calcule ∫₀^∞ 1/(x² + 1) dx avec le théorème des résidus.
  [free, sans aide]  Res(f ; i)
    (Les pôles du demi-plan supérieur :)
    = 1/(2i)   ← p(z₀)/q′(z₀), z₀ = i
    = −i/2   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|1/(z² + 1)|
    = πR·1/(R² − 1)   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi(−i/2)   ← 2πi × Σ des résidus du haut
    = π   ← Calculer
  — Conclusion : f est paire.  [juge definite]  départ : ∫_{0}^{∞} 1/(x² + 1) dx
    = (1/2)(∫_{−∞}^{∞} 1/(x² + 1) dx)   ← Parité : la moitié de ∫_ℝ
    = π/2   ← La valeur
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫₀^∞ 1/(x² + 1) dx avec le théorème des résidus.
  [free, sans aide]  Res(f ; i)
    (Les pôles du demi-plan supérieur :)
    = 1/(2i)   ← p(z₀)/q′(z₀), z₀ = i
    = −i/2   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|1/(z² + 1)|
    = πR·1/(R² − 1)   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi(−i/2)   ← 2πi × Σ des résidus du haut
    = π   ← Calculer
  — Conclusion : f est paire.  [juge definite]  départ : ∫_{0}^{∞} 1/(x² + 1) dx
    = (1/2)(∫_{−∞}^{∞} 1/(x² + 1) dx)   ← Parité : la moitié de ∫_ℝ
    = π/2   ← La valeur
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

Calcule ∫₀^∞ x²/((x² + 1)(x² + 9)) dx avec le théorème des résidus.
  [free, sans aide]  Res(f ; i)
    (Les pôles du demi-plan supérieur :)
    = (−1)/(16i)   ← p(z₀)/q′(z₀), z₀ = i
    = i/16   ← Calculer
  — Pôle 3i :  [juge cval]  départ : Res(f ; 3i)
    = (−9)/(−48i)   ← p(z₀)/q′(z₀), z₀ = 3i
    = −3i/16   ← Calculer
  — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|z²/((z² + 1)(z² + 9))|
    = πR·R²/((R² − 1)(R² − 9))   ← Longueur × max ; cette borne tend vers 0
  — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
    = 2πi((i/16) + (−3i/16))   ← 2πi × Σ des résidus du haut
    = π/4   ← Calculer
  — Conclusion : f est paire.  [juge definite]  départ : ∫_{0}^{∞} x²/((x² + 1)(x² + 9)) dx
    = (1/2)(∫_{−∞}^{∞} x²/((x² + 1)(x² + 9)) dx)   ← Parité : la moitié de ∫_ℝ
    = π/8   ← La valeur
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

### Variantes d'examen

```
∫_ℝ x²/((x² + 4)(x² + 9)) dx =
  ✔ π/5   · 0 [c_pole_outside_counted]   · −π/5 [c_upper_half_lower_pole]   · 2π/5
  [examen mcq]
  pièges : c_upper_half_lower_pole, c_pole_outside_counted

Calcule ∫_ℝ x²/((x² + 1)(x² + 4)) dx avec le théorème des résidus. Justifie que l'intégrale sur l'arc tend vers 0.
  [problème, examen open, 7 points]
  partie 1 (Début du problème : 2 ; Pôle 2i : 1,5 ; L'arc C_R (demi-cercle supérieur, longueur πR) : 1 ; Théorème des résidus (l'arc tend vers 0) : 1,5 ; Conclusion : 1)
    [free, sans aide, suivre l'erreur, examen open]  Res(f ; i)
      = (−1)/(6i)   ← p(z₀)/q′(z₀), z₀ = i
      = i/6   ← Calculer
    — Pôle 2i :  [juge cval]  départ : Res(f ; 2i)
      = (−4)/(−12i)   ← p(z₀)/q′(z₀), z₀ = 2i
      = −i/3   ← Calculer
    — L'arc C_R (demi-cercle supérieur, longueur πR) :  [juge arcb]  départ : πR|z²/((z² + 1)(z² + 4))|
      = πR·R²/((R² − 1)(R² − 4))   ← Longueur × max ; cette borne tend vers 0
    — Théorème des résidus (l'arc tend vers 0) :  [juge cval]  départ : ∫_ℝ f(x) dx
      = 2πi((i/6) + (−i/3))   ← 2πi × Σ des résidus du haut
      = π/3   ← Calculer
    — Conclusion :  [juge definite]  départ : ∫_{−∞}^{∞} x²/((x² + 1)(x² + 4)) dx
      = π/3   ← La valeur
  pièges : c_upper_half_lower_pole, c_pole_outside_counted, c_residue_2pii

```

## Intégrales trigonométriques sur [0 ; 2π] (`c-int-trig`, BA3)

_z = e^(iθ) : une intégrale sur le cercle unité, pôles de |z| < 1._

### Niveau 1

```
Calcule I = ∫₀^{2π} 1/(5 + 4sin(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    (Avec z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz), et θ ∈ [0 ; 2π] parcourt le cercle |z| = 1.)
    = 1/(5 + 4□)·1/(iz)   (trous : 1/(5 + 4(z − 1/z)/(2i))·1/(iz))   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = □   (trous : 2/(4z² + 10iz − 4))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(4z² + 10iz − 4). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : −i/2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : 2/(8(−i/2) + 10i))   ← p(z₀)/q′(z₀)
    = □   (trous : −i/3)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i/3))   ← 2πi × Res
    = □   (trous : 2π/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 4sin(θ)) dθ
    = 2π/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 + 4(z − 1/z)/(2i))·1/(iz) = … | g(z) = 2/(4z² + 10iz − 4)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(3 − cos(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    (Avec z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz), et θ ∈ [0 ; 2π] parcourt le cercle |z| = 1.)
    = 1/(3 − □)·1/(iz)   (trous : 1/(3 − (z + 1/z)/2)·1/(iz))   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = □   (trous : 2i/(z² − 6z + 1))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2i/(z² − 6z + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : 3 − 2√2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : 2i/(2(3 − 2√2) − 6))   ← p(z₀)/q′(z₀)
    = □   (trous : −i√2/4)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i√2/4))   ← 2πi × Res
    = □   (trous : π√2/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(3 − cos(θ)) dθ
    = π√2/2   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(3 − (z + 1/z)/2)·1/(iz) = … | g(z) = 2i/(z² − 6z + 1)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(3 − 2sin(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    (Avec z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz), et θ ∈ [0 ; 2π] parcourt le cercle |z| = 1.)
    = 1/(3 − 2□)·1/(iz)   (trous : 1/(3 − 2(z − 1/z)/(2i))·1/(iz))   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = □   (trous : 2/(−2z² + 6iz + 2))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(−2z² + 6iz + 2). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : i(3 − √5)/2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : 2/(−4(i(3 − √5)/2) + 6i))   ← p(z₀)/q′(z₀)
    = □   (trous : −i√5/5)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i√5/5))   ← 2πi × Res
    = □   (trous : 2π√5/5)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(3 − 2sin(θ)) dθ
    = 2π√5/5   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(3 − 2(z − 1/z)/(2i))·1/(iz) = … | g(z) = 2/(−2z² + 6iz + 2)
  pièges : c_trig_sub, c_pole_outside_counted

```

### Niveau 2

```
Calcule I = ∫₀^{2π} 1/(5 + 4cos(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    = 1/(5 + 4□)·1/(iz)   (trous : 1/(5 + 4(z + 1/z)/2)·1/(iz))   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = □   (trous : −2i/(4z² + 10z + 4))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = −2i/(4z² + 10z + 4). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : −1/2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : −2i/(8(−1/2) + 10))   ← p(z₀)/q′(z₀)
    = □   (trous : −i/3)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i/3))   ← 2πi × Res
    = □   (trous : 2π/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 4cos(θ)) dθ
    = 2π/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 + 4(z + 1/z)/2)·1/(iz) = … | g(z) = −2i/(4z² + 10z + 4)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(5 + 4sin(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    = 1/(5 + 4□)·1/(iz)   (trous : 1/(5 + 4(z − 1/z)/(2i))·1/(iz))   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = □   (trous : 2/(4z² + 10iz − 4))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(4z² + 10iz − 4). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : −i/2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : 2/(8(−i/2) + 10i))   ← p(z₀)/q′(z₀)
    = □   (trous : −i/3)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i/3))   ← 2πi × Res
    = □   (trous : 2π/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 4sin(θ)) dθ
    = 2π/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 + 4(z − 1/z)/(2i))·1/(iz) = … | g(z) = 2/(4z² + 10iz − 4)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(2 + cos(θ)) dθ avec le théorème des résidus.
  [guided]  g(z)
    = 1/(2 + □)·1/(iz)   (trous : 1/(2 + (z + 1/z)/2)·1/(iz))   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = □   (trous : −2i/(z² + 4z + 1))   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = −2i/(z² + 4z + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = □   (trous : √3 − 2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = □   (trous : −2i/(2(√3 − 2) + 4))   ← p(z₀)/q′(z₀)
    = □   (trous : −i√3/3)   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = □   (trous : 2πi(−i√3/3))   ← 2πi × Res
    = □   (trous : 2π√3/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(2 + cos(θ)) dθ
    = 2π√3/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(2 + (z + 1/z)/2)·1/(iz) = … | g(z) = −2i/(z² + 4z + 1)
  pièges : c_trig_sub, c_pole_outside_counted

```

### Niveau 3

```
Calcule I = ∫₀^{2π} 1/(3 − cos(θ)) dθ avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  g(z)
    = 1/(3 − (z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = 2i/(z² − 6z + 1)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2i/(z² − 6z + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    ? Les racines du dénominateur sont z₁ et z₂, avec z₁z₂ de module 1. Lequel garder ? ✔ Celle de module < 1 : 3−2√2 / · Celle de module > 1 : (2√2+3)/1 / · Les deux
    = 3 − 2√2   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2i/(2(3 − 2√2) − 6)   ← p(z₀)/q′(z₀)
    = −i√2/4   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i√2/4)   ← 2πi × Res
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(3 − cos(θ)) dθ
    = π√2/2   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(3 − (z + 1/z)/2)·1/(iz) = … | g(z) = 2i/(z² − 6z + 1)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(2 − cos(θ)) dθ avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  g(z)
    = 1/(2 − (z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = 2i/(z² − 4z + 1)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2i/(z² − 4z + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    ? Les racines du dénominateur sont z₁ et z₂, avec z₁z₂ de module 1. Lequel garder ? ✔ Celle de module < 1 : 2−√3 / · Celle de module > 1 : (√3+2)/1 / · Les deux
    = 2 − √3   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2i/(2(2 − √3) − 4)   ← p(z₀)/q′(z₀)
    = −i√3/3   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i√3/3)   ← 2πi × Res
    = 2π√3/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(2 − cos(θ)) dθ
    = 2π√3/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(2 − (z + 1/z)/2)·1/(iz) = … | g(z) = 2i/(z² − 4z + 1)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(5 + 4sin(θ)) dθ avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  g(z)
    = 1/(5 + 4(z − 1/z)/(2i))·1/(iz)   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = 2/(4z² + 10iz − 4)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(4z² + 10iz − 4). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    ? Les racines du dénominateur sont z₁ et z₂, avec z₁z₂ de module 1. Lequel garder ? ✔ Celle de module < 1 : −i/2 / · Celle de module > 1 : −2i / · Les deux
    = −i/2   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2/(8(−i/2) + 10i)   ← p(z₀)/q′(z₀)
    = −i/3   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i/3)   ← 2πi × Res
    = 2π/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 4sin(θ)) dθ
    = 2π/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 + 4(z − 1/z)/(2i))·1/(iz) = … | g(z) = 2/(4z² + 10iz − 4)
  pièges : c_trig_sub, c_pole_outside_counted

```

### Niveau 4

```
Calcule I = ∫₀^{2π} 1/(5 − 3cos(θ)) dθ avec le théorème des résidus.
  [free, suivre l'erreur]  g(z)
    = 1/(5 − 3(z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = 2i/(3z² − 10z + 3)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2i/(3z² − 10z + 3). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = 1/3   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2i/(6(1/3) − 10)   ← p(z₀)/q′(z₀)
    = −i/4   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i/4)   ← 2πi × Res
    = π/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 − 3cos(θ)) dθ
    = π/2   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 − 3(z + 1/z)/2)·1/(iz) = … | g(z) = 2i/(3z² − 10z + 3)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(5 − 3cos(θ)) dθ avec le théorème des résidus.
  [free, suivre l'erreur]  g(z)
    = 1/(5 − 3(z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = 2i/(3z² − 10z + 3)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2i/(3z² − 10z + 3). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = 1/3   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2i/(6(1/3) − 10)   ← p(z₀)/q′(z₀)
    = −i/4   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i/4)   ← 2πi × Res
    = π/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 − 3cos(θ)) dθ
    = π/2   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 − 3(z + 1/z)/2)·1/(iz) = … | g(z) = 2i/(3z² − 10z + 3)
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(5 + 4sin(θ)) dθ avec le théorème des résidus.
  [free, suivre l'erreur]  g(z)
    = 1/(5 + 4(z − 1/z)/(2i))·1/(iz)   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = 2/(4z² + 10iz − 4)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(4z² + 10iz − 4). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = −i/2   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2/(8(−i/2) + 10i)   ← p(z₀)/q′(z₀)
    = −i/3   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i/3)   ← 2πi × Res
    = 2π/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 4sin(θ)) dθ
    = 2π/3   ← La valeur
  aides : Pose z = e^(iθ) ; dθ = dz/(iz), et l'intégrale devient une intégrale sur |z| = 1. | g(z) = 1/(5 + 4(z − 1/z)/(2i))·1/(iz) = … | g(z) = 2/(4z² + 10iz − 4)
  pièges : c_trig_sub, c_pole_outside_counted

```

### Niveau 5

```
Calcule I = ∫₀^{2π} 1/(3 − sin(θ)) dθ avec le théorème des résidus.
  [free, sans aide]  g(z)
    = 1/(3 − (z − 1/z)/(2i))·1/(iz)   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = 2/(−z² + 6iz + 1)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(−z² + 6iz + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = i(3 − 2√2)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2/(−2(i(3 − 2√2)) + 6i)   ← p(z₀)/q′(z₀)
    = −i√2/4   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i√2/4)   ← 2πi × Res
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(3 − sin(θ)) dθ
    = π√2/2   ← La valeur
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(2 − sin(θ)) dθ avec le théorème des résidus.
  [free, sans aide]  g(z)
    = 1/(2 − (z − 1/z)/(2i))·1/(iz)   ← z = e^(iθ) : sin θ = (z − 1/z)/(2i), dθ = dz/(iz)
    = 2/(−z² + 4iz + 1)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = 2/(−z² + 4iz + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = i(2 − √3)   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = 2/(−2(i(2 − √3)) + 4i)   ← p(z₀)/q′(z₀)
    = −i√3/3   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i√3/3)   ← 2πi × Res
    = 2π√3/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(2 − sin(θ)) dθ
    = 2π√3/3   ← La valeur
  pièges : c_trig_sub, c_pole_outside_counted

Calcule I = ∫₀^{2π} 1/(5 + 3cos(θ)) dθ avec le théorème des résidus.
  [free, sans aide]  g(z)
    = 1/(5 + 3(z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
    = −2i/(3z² + 10z + 3)   ← Multiplier en haut et en bas
  — I = ∮_{|z| = 1} g(z) dz avec g(z) = −2i/(3z² + 10z + 3). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
    = −1/3   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
  — Son résidu :  [juge cval]  départ : Res(g ; z₀)
    = −2i/(6(−1/3) + 10)   ← p(z₀)/q′(z₀)
    = −i/4   ← Simplifier
  — Théorème des résidus :  [juge cval]  départ : I
    = 2πi(−i/4)   ← 2πi × Res
    = π/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(5 + 3cos(θ)) dθ
    = π/2   ← La valeur
  pièges : c_trig_sub, c_pole_outside_counted

```

### Variantes d'examen

```
∫₀^{2π} 1/(3 + cos(θ)) dθ =
  · π√2   · −π√2/2   ✔ π√2/2   · π√2/4 [c_trig_sub]
  [examen mcq]
  pièges : c_trig_sub

Calcule I = ∫₀^{2π} 1/(2 + cos(θ)) dθ avec le théorème des résidus.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1 ; I = ∮_{|z| = 1} g(z) dz avec g(z) = −2i/(z² + 4z + 1). Le pôle de g dans |z| < 1 : 1 ; Son résidu : 1 ; Théorème des résidus : 1 ; Conclusion : 1)
    [free, sans aide, suivre l'erreur, examen open]  g(z)
      = 1/(2 + (z + 1/z)/2)·1/(iz)   ← z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)
      = −2i/(z² + 4z + 1)   ← Multiplier en haut et en bas
    — I = ∮_{|z| = 1} g(z) dz avec g(z) = −2i/(z² + 4z + 1). Le pôle de g dans |z| < 1 :  [juge cval]  départ : z_0
      = √3 − 2   ← Racines du dénominateur ; leur produit vaut 1 (ou −1)
    — Son résidu :  [juge cval]  départ : Res(g ; z₀)
      = −2i/(2(√3 − 2) + 4)   ← p(z₀)/q′(z₀)
      = −i√3/3   ← Simplifier
    — Théorème des résidus :  [juge cval]  départ : I
      = 2πi(−i√3/3)   ← 2πi × Res
      = 2π√3/3   ← Calculer
    — Conclusion :  [juge definite]  départ : ∫_{0}^{2π} 1/(2 + cos(θ)) dθ
      = 2π√3/3   ← La valeur
  pièges : c_trig_sub, c_pole_outside_counted

```

## Intégrales avec e^(iαx) (`c-int-fourier`, BA3)

_On intègre R(x)e^(iαx), puis on prend la partie réelle ou imaginaire._

### Niveau 1

```
Calcule ∫_ℝ xsin(2x)/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    (On intègre f(z) = ze^(2iz)/(z⁴ + 4) sur [−R ; R] fermé par le demi-cercle supérieur (Im z ≥ 0), puis on prend la partie imaginaire.)
    = □   (trous : (−i/8)e^(2i(1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : (−i/8)e^(−2 + 2i))   ← Calculer l'exposant
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : (i/8)e^(2i(−1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : (i/8)e^(−2 − 2i))   ← Calculer l'exposant
  — La somme des résidus :  [juge cval]  départ : ΣRe(s)
    = □   (trous : (−i/8)e^(−2 + 2i) + (i/8)e^(−2 − 2i))   ← Additionner
    = □   (trous : e^(−2)sin(2)/4)   ← e^(ix) − e^(−ix) = 2i sin x
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : (iπ/2)e^(−2)sin(2))   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(2x)/(x⁴ + 4) dx
    = (π/2)e^(−2)sin(2)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 2, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/8)e^(2i(1 + i)) ; (i/8)e^(2i(−1 + i)) | J = (iπ/2)e^−2sin(2)
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ cos(x)/(x² + 9) dx avec le théorème des résidus.
  [guided]  Res(f ; 3i)
    (On intègre f(z) = e^(iz)/(z² + 9) sur [−R ; R] fermé par le demi-cercle supérieur (Im z ≥ 0), puis on prend la partie réelle.)
    = □   (trous : (−i/6)e^(i(3i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 3i
    = □   (trous : (−i/6)e^(−3))   ← Calculer l'exposant
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : 2πi((−i/6)e^(−3)))   ← 2πi × Σ Res
    = □   (trous : πe^(−3)/3)   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(x)/(x² + 9) dx
    = πe^(−3)/3   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = 1, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/6)e^(i(3i)) | J = πe^−3/3
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ xsin(2x)/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    (On intègre f(z) = ze^(2iz)/(z⁴ + 4) sur [−R ; R] fermé par le demi-cercle supérieur (Im z ≥ 0), puis on prend la partie imaginaire.)
    = □   (trous : (−i/8)e^(2i(1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : (−i/8)e^(−2 + 2i))   ← Calculer l'exposant
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : (i/8)e^(2i(−1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : (i/8)e^(−2 − 2i))   ← Calculer l'exposant
  — La somme des résidus :  [juge cval]  départ : ΣRe(s)
    = □   (trous : (−i/8)e^(−2 + 2i) + (i/8)e^(−2 − 2i))   ← Additionner
    = □   (trous : e^(−2)sin(2)/4)   ← e^(ix) − e^(−ix) = 2i sin x
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : (iπ/2)e^(−2)sin(2))   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(2x)/(x⁴ + 4) dx
    = (π/2)e^(−2)sin(2)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 2, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/8)e^(2i(1 + i)) ; (i/8)e^(2i(−1 + i)) | J = (iπ/2)e^−2sin(2)
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

```

### Niveau 2

```
Calcule ∫_ℝ xsin(x)/(x⁴ + 4) dx avec le théorème des résidus.
  [guided]  Res(f ; 1+i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="ze^(iz)/(z⁴ + 4)"><mrow><mi>z</mi><mo>&#x2062;</mo><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mi>i</mi><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><msup><mrow><mi>z</mi></mrow><mn>4</mn></msup><mo>+</mo><mn>4</mn></mrow></mfrac></mrow></math>, puis la partie imaginaire / · R(z)sin(αz), directement
    ? α = 1. Quel demi-cercle ? ✔ Le demi-plan supérieur (Im z ≥ 0) / · Le demi-plan inférieur (Im z ≤ 0)
    = □   (trous : (−i/8)e^(i(1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
    = □   (trous : (−i/8)e^(−1 + i))   ← Calculer l'exposant
  — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
    = □   (trous : (i/8)e^(i(−1 + i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
    = □   (trous : (i/8)e^(−1 − i))   ← Calculer l'exposant
  — La somme des résidus :  [juge cval]  départ : ΣRe(s)
    = □   (trous : (−i/8)e^(−1 + i) + (i/8)e^(−1 − i))   ← Additionner
    = □   (trous : e^(−1)sin(1)/4)   ← e^(ix) − e^(−ix) = 2i sin x
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : (iπ/2)e^(−1)sin(1))   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(x)/(x⁴ + 4) dx
    = (π/2)e^(−1)sin(1)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 1, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/8)e^(i(1 + i)) ; (i/8)e^(i(−1 + i)) | J = (iπ/2)e^−1sin(1)
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ cos(2x)/(x² + 1) dx avec le théorème des résidus.
  [guided]  Res(f ; i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="e^(2iz)/(z² + 1)"><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mrow><mn>2</mn><mo>&#x2062;</mo><mi>i</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow></mfrac></math>, puis la partie réelle / · R(z)cos(αz), directement
    ? α = 2. Quel demi-cercle ? ✔ Le demi-plan supérieur (Im z ≥ 0) / · Le demi-plan inférieur (Im z ≤ 0)
    = □   (trous : (−i/2)e^(2i(i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = i
    = □   (trous : (−i/2)e^(−2))   ← Calculer l'exposant
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : 2πi((−i/2)e^(−2)))   ← 2πi × Σ Res
    = □   (trous : πe^(−2))   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(2x)/(x² + 1) dx
    = πe^(−2)   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = 2, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/2)e^(2i(i)) | J = πe^−2
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ cos(x)/((x² + 1)(x² + 4)) dx avec le théorème des résidus, en passant par J = ∫_ℝ e^(−ix)/((x² + 1)(x² + 4)) dx (α = −1).
  [guided]  Res(f ; −i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="e^(−iz)/((z² + 1)(z² + 4))"><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mi>i</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow><mo stretchy="false">)</mo></mrow><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn></mrow><mo stretchy="false">)</mo></mrow></mrow></mfrac></math>, puis la partie réelle / · R(z)cos(αz), directement
    ? α = -1. Quel demi-cercle ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = □   (trous : (i/6)e^(−i(−i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −i
    = □   (trous : (i/6)e^(−1))   ← Calculer l'exposant
  — Pôle −2i :  [juge cval]  départ : Res(f ; −2i)
    = □   (trous : (−i/12)e^(−i(−2i)))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −2i
    = □   (trous : (−i/12)e^(−2))   ← Calculer l'exposant
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = □   (trous : −2πi((i/6)e^(−1) + (−i/12)e^(−2)))   ← −2πi × Σ Res
    = □   (trous : πe^(−1)/3 − πe^(−2)/6)   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(x)/((x² + 1)(x² + 4)) dx
    = πe^(−1)/3 − πe^(−2)/6   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = -1, |e^(iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (i/6)e^(−i(−i)) ; (−i/12)e^(−i(−2i)) | J = πe^−1/3 − πe^−2/6
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

```

### Niveau 3

```
Calcule ∫_ℝ cos(3x)/(x² + 4) dx avec le théorème des résidus, en passant par J = ∫_ℝ e^(−3ix)/(x² + 4) dx (α = −3).
  [tap, suivre l'erreur, menu menu]  Res(f ; −2i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="e^(−3iz)/(z² + 4)"><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>i</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn></mrow></mfrac></math>, puis la partie réelle / · R(z)cos(αz), directement
    ? α = -3. Quel demi-cercle ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = (i/4)e^(−3i(−2i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −2i
    = (i/4)e^(−6)   ← Calculer l'exposant
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = −2πi((i/4)e^(−6))   ← −2πi × Σ Res
    = πe^(−6)/2   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(3x)/(x² + 4) dx
    = πe^(−6)/2   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = -3, |e^(iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (i/4)e^(−3i(−2i)) | J = πe^−6/2
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ cos(3x)/(x² + 1) dx avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  Res(f ; i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="e^(3iz)/(z² + 1)"><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mrow><mn>3</mn><mo>&#x2062;</mo><mi>i</mi></mrow><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow></mfrac></math>, puis la partie réelle / · R(z)cos(αz), directement
    ? α = 3. Quel demi-cercle ? ✔ Le demi-plan supérieur (Im z ≥ 0) / · Le demi-plan inférieur (Im z ≤ 0)
    = (−i/2)e^(3i(i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = i
    = (−i/2)e^(−3)   ← Calculer l'exposant
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = 2πi((−i/2)e^(−3))   ← 2πi × Σ Res
    = πe^(−3)   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(3x)/(x² + 1) dx
    = πe^(−3)   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = 3, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (−i/2)e^(3i(i)) | J = πe^−3
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ xsin(x)/(x² + 1) dx avec le théorème des résidus.
  [tap, suivre l'erreur, menu menu]  Res(f ; i)
    ? Quelle fonction intégrer sur le contour ? ✔ R(z)e^(iαz) = <math alttext="ze^(iz)/(z² + 1)"><mrow><mi>z</mi><mo>&#x2062;</mo><mfrac><msup><mrow><mi>e</mi></mrow><mrow><mi>i</mi><mo>&#x2062;</mo><mi>z</mi></mrow></msup><mrow><msup><mrow><mi>z</mi></mrow><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></math>, puis la partie imaginaire / · R(z)sin(αz), directement
    ? α = 1. Quel demi-cercle ? ✔ Le demi-plan supérieur (Im z ≥ 0) / · Le demi-plan inférieur (Im z ≤ 0)
    = (1/2)e^(i(i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = i
    = (1/2)e^(−1)   ← Calculer l'exposant
  — Théorème des résidus (lemme de Jordan pour l'arc) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = iπe^(−1)   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(x)/(x² + 1) dx
    = πe^(−1)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 1, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (1/2)e^(i(i)) | J = iπe^−1
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

```

### Niveau 4

```
Calcule ∫_ℝ xsin(3x)/(x² + 1) dx avec le théorème des résidus.
  [free, suivre l'erreur]  Res(f ; i)
    = (1/2)e^(3i(i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = i
    = (1/2)e^(−3)   ← Calculer l'exposant
  — Théorème des résidus (lemme de Jordan pour l'arc) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = iπe^(−3)   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(3x)/(x² + 1) dx
    = πe^(−3)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 3, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (1/2)e^(3i(i)) | J = iπe^−3
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ cos(3x)/((x² + 1)(x² + 4)) dx avec le théorème des résidus, en passant par J = ∫_ℝ e^(−3ix)/((x² + 1)(x² + 4)) dx (α = −3).
  [free, suivre l'erreur]  Res(f ; −i)
    = (i/6)e^(−3i(−i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −i
    = (i/6)e^(−3)   ← Calculer l'exposant
  — Pôle −2i :  [juge cval]  départ : Res(f ; −2i)
    = (−i/12)e^(−3i(−2i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −2i
    = (−i/12)e^(−6)   ← Calculer l'exposant
  — L'arc C_R (demi-cercle inférieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.  [juge arcb]  départ : πR|e^(−3iz)/((z² + 1)(z² + 4))|
    = πR·1/((R² − 1)(R² − 4))   ← Longueur × max ; tend vers 0
  — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = −2πi((i/6)e^(−3) + (−i/12)e^(−6))   ← −2πi × Σ Res
    = πe^(−3)/3 − πe^(−6)/6   ← Simplifier
  — Partie réelle de J :  [juge definite]  départ : ∫_{−∞}^{∞} cos(3x)/((x² + 1)(x² + 4)) dx
    = πe^(−3)/3 − πe^(−6)/6   ← Re J
  aides : Intègre R(z)e^(iαz) : avec α = -3, |e^(iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (i/6)e^(−3i(−i)) ; (−i/12)e^(−3i(−2i)) | J = πe^−3/3 − πe^−6/6
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

Calcule ∫_ℝ xsin(x)/(x² + 1) dx avec le théorème des résidus.
  [free, suivre l'erreur]  Res(f ; i)
    = (1/2)e^(i(i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = i
    = (1/2)e^(−1)   ← Calculer l'exposant
  — Théorème des résidus (lemme de Jordan pour l'arc) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
    = iπe^(−1)   ← Simplifier
  — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(x)/(x² + 1) dx
    = πe^(−1)   ← Im J
  aides : Intègre R(z)e^(iαz) : avec α = 1, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut. | Res = e^(iαz₀) p(z₀)/q′(z₀) : (1/2)e^(i(i)) | J = iπe^−1
  pièges : c_eiax_cos, c_jordan_alpha_sign, c_upper_half_lower_pole, c_residue_2pii

```

### Niveau 5

```
Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ xe^(ix)/(x⁴ + 4) dx (format 2022, 11 points). En déduire ∫_ℝ xsin(x)/(x⁴ + 4) dx.
  [problème, 11 points]
  partie 1 (Fonction et contour : 1)
  Quelle fonction et quel contour ?
    ✔ f(z) = ze^(iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur   · f(z) = ze^(iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle inférieur [c_jordan_alpha_sign]   · f(z) = zsin(z)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur [c_eiax_cos]   · f(z) = ze^(iz)/(z⁴ + 4) ; le cercle |z| = 1
  partie 2 (Pôles du demi-plan supérieur : 1,5)
  Les pôles de f dans le demi-plan supérieur :
    ✔ 1 + i et −1 + i   · 1 − i et −1 − i [c_upper_half_lower_pole]   · √2i seulement   · 1 + i, −1 + i, 1 − i et −1 − i [c_pole_outside_counted]
  partie 3 (Résidus, somme, arc et conclusion : 1,5 ; Pôle −1 + i : 1,5 ; La somme des résidus : 0,5 ; L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus. : 3 ; Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx. : 1 ; Partie imaginaire de J : 1)
  Les résidus, la somme, J, l'arc et la conclusion.
    [free, sans aide, suivre l'erreur]  Res(f ; 1+i)
      = (−i/8)e^(i(1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
      = (−i/8)e^(−1 + i)   ← Calculer l'exposant
    — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
      = (i/8)e^(i(−1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
      = (i/8)e^(−1 − i)   ← Calculer l'exposant
    — La somme des résidus :  [juge cval]  départ : ΣRe(s)
      = (−i/8)e^(−1 + i) + (i/8)e^(−1 − i)   ← Additionner
      = e^(−1)sin(1)/4   ← e^(ix) − e^(−ix) = 2i sin x
    — L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.  [juge arcb]  départ : πR|ze^(iz)/(z⁴ + 4)|
      = πR·R/(R⁴ − 4)   ← Longueur × max ; tend vers 0
    — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
      = (iπ/2)e^(−1)sin(1)   ← Simplifier
    — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(x)/(x⁴ + 4) dx
      = (π/2)e^(−1)sin(1)   ← Im J
  pièges : c_jordan_alpha_sign, c_eiax_cos, c_pole_outside_counted, c_upper_half_lower_pole

Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ xe^(2ix)/(x⁴ + 4) dx (format 2022, 11 points). En déduire ∫_ℝ xsin(2x)/(x⁴ + 4) dx.
  [problème, 11 points]
  partie 1 (Fonction et contour : 1)
  Quelle fonction et quel contour ?
    ✔ f(z) = ze^(2iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur   · f(z) = zsin(2z)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur [c_eiax_cos]   · f(z) = ze^(2iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle inférieur [c_jordan_alpha_sign]   · f(z) = ze^(2iz)/(z⁴ + 4) ; le cercle |z| = 1
  partie 2 (Pôles du demi-plan supérieur : 1,5)
  Les pôles de f dans le demi-plan supérieur :
    ✔ 1 + i et −1 + i   · √2i seulement   · 1 − i et −1 − i [c_upper_half_lower_pole]   · 1 + i, −1 + i, 1 − i et −1 − i [c_pole_outside_counted]
  partie 3 (Résidus, somme, arc et conclusion : 1,5 ; Pôle −1 + i : 1,5 ; La somme des résidus : 0,5 ; L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus. : 3 ; Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx. : 1 ; Partie imaginaire de J : 1)
  Les résidus, la somme, J, l'arc et la conclusion.
    [free, sans aide, suivre l'erreur]  Res(f ; 1+i)
      = (−i/8)e^(2i(1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
      = (−i/8)e^(−2 + 2i)   ← Calculer l'exposant
    — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
      = (i/8)e^(2i(−1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
      = (i/8)e^(−2 − 2i)   ← Calculer l'exposant
    — La somme des résidus :  [juge cval]  départ : ΣRe(s)
      = (−i/8)e^(−2 + 2i) + (i/8)e^(−2 − 2i)   ← Additionner
      = e^(−2)sin(2)/4   ← e^(ix) − e^(−ix) = 2i sin x
    — L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.  [juge arcb]  départ : πR|ze^(2iz)/(z⁴ + 4)|
      = πR·R/(R⁴ − 4)   ← Longueur × max ; tend vers 0
    — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
      = (iπ/2)e^(−2)sin(2)   ← Simplifier
    — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(2x)/(x⁴ + 4) dx
      = (π/2)e^(−2)sin(2)   ← Im J
  pièges : c_jordan_alpha_sign, c_eiax_cos, c_pole_outside_counted, c_upper_half_lower_pole

Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ xe^(3ix)/(x⁴ + 4) dx (format 2022, 11 points). En déduire ∫_ℝ xsin(3x)/(x⁴ + 4) dx.
  [problème, 11 points]
  partie 1 (Fonction et contour : 1)
  Quelle fonction et quel contour ?
    · f(z) = ze^(3iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle inférieur [c_jordan_alpha_sign]   ✔ f(z) = ze^(3iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur   · f(z) = ze^(3iz)/(z⁴ + 4) ; le cercle |z| = 1   · f(z) = zsin(3z)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur [c_eiax_cos]
  partie 2 (Pôles du demi-plan supérieur : 1,5)
  Les pôles de f dans le demi-plan supérieur :
    · √2i seulement   · 1 − i et −1 − i [c_upper_half_lower_pole]   · 1 + i, −1 + i, 1 − i et −1 − i [c_pole_outside_counted]   ✔ 1 + i et −1 + i
  partie 3 (Résidus, somme, arc et conclusion : 1,5 ; Pôle −1 + i : 1,5 ; La somme des résidus : 0,5 ; L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus. : 3 ; Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx. : 1 ; Partie imaginaire de J : 1)
  Les résidus, la somme, J, l'arc et la conclusion.
    [free, sans aide, suivre l'erreur]  Res(f ; 1+i)
      = (−i/8)e^(3i(1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
      = (−i/8)e^(−3 + 3i)   ← Calculer l'exposant
    — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
      = (i/8)e^(3i(−1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
      = (i/8)e^(−3 − 3i)   ← Calculer l'exposant
    — La somme des résidus :  [juge cval]  départ : ΣRe(s)
      = (−i/8)e^(−3 + 3i) + (i/8)e^(−3 − 3i)   ← Additionner
      = e^(−3)sin(3)/4   ← e^(ix) − e^(−ix) = 2i sin x
    — L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.  [juge arcb]  départ : πR|ze^(3iz)/(z⁴ + 4)|
      = πR·R/(R⁴ − 4)   ← Longueur × max ; tend vers 0
    — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
      = (iπ/2)e^(−3)sin(3)   ← Simplifier
    — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(3x)/(x⁴ + 4) dx
      = (π/2)e^(−3)sin(3)   ← Im J
  pièges : c_jordan_alpha_sign, c_eiax_cos, c_pole_outside_counted, c_upper_half_lower_pole

```

### Variantes d'examen

```
∫_ℝ cos(x)/(x² + 1) dx =
  · πcosh(1) [c_eiax_cos]   · πe^1 [c_jordan_alpha_sign]   · π   ✔ πe^−1
  [examen mcq]
  pièges : c_jordan_alpha_sign, c_eiax_cos

Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ xe^(2ix)/(x⁴ + 4) dx (format 2022, 11 points). En déduire ∫_ℝ xsin(2x)/(x⁴ + 4) dx.
  [problème, examen open, 11 points]
  partie 1 (Fonction et contour : 1)
  Quelle fonction et quel contour ?
    ✔ f(z) = ze^(2iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur   · f(z) = ze^(2iz)/(z⁴ + 4) ; le cercle |z| = 1   · f(z) = zsin(2z)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle supérieur [c_eiax_cos]   · f(z) = ze^(2iz)/(z⁴ + 4) ; segment [−R ; R] et demi-cercle inférieur [c_jordan_alpha_sign]
  partie 2 (Pôles du demi-plan supérieur : 1,5)
  Les pôles de f dans le demi-plan supérieur :
    · √2i seulement   ✔ 1 + i et −1 + i   · 1 − i et −1 − i [c_upper_half_lower_pole]   · 1 + i, −1 + i, 1 − i et −1 − i [c_pole_outside_counted]
  partie 3 (Résidus, somme, arc et conclusion : 1,5 ; Pôle −1 + i : 1,5 ; La somme des résidus : 0,5 ; L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus. : 3 ; Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx. : 1 ; Partie imaginaire de J : 1)
  Les résidus, la somme, J, l'arc et la conclusion.
    [free, sans aide, suivre l'erreur]  Res(f ; 1+i)
      = (−i/8)e^(2i(1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = 1+i
      = (−i/8)e^(−2 + 2i)   ← Calculer l'exposant
    — Pôle −1 + i :  [juge cval]  départ : Res(f ; −1+i)
      = (i/8)e^(2i(−1 + i))   ← e^(iαz₀) · p(z₀)/q′(z₀), z₀ = −1+i
      = (i/8)e^(−2 − 2i)   ← Calculer l'exposant
    — La somme des résidus :  [juge cval]  départ : ΣRe(s)
      = (−i/8)e^(−2 + 2i) + (i/8)e^(−2 − 2i)   ← Additionner
      = e^(−2)sin(2)/4   ← e^(ix) − e^(−ix) = 2i sin x
    — L'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.  [juge arcb]  départ : πR|ze^(2iz)/(z⁴ + 4)|
      = πR·R/(R⁴ − 4)   ← Longueur × max ; tend vers 0
    — Théorème des résidus (l'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.  [juge cval]  départ : J
      = (iπ/2)e^(−2)sin(2)   ← Simplifier
    — Partie imaginaire de J :  [juge definite]  départ : ∫_{−∞}^{∞} xsin(2x)/(x⁴ + 4) dx
      = (π/2)e^(−2)sin(2)   ← Im J
  pièges : c_jordan_alpha_sign, c_eiax_cos, c_pole_outside_counted, c_upper_half_lower_pole

```

## Intégrales avec coupure (GM) (`c-int-branch`, BA3)

_Trou de serrure : (1 − e^(2πia)) ∫₀^∞ x^a R(x) dx = 2πi Σ Res._

### Niveau 1

```
Calcule I = ∫₀^∞ 1/(√x(x + 2)) dx avec un contour en trou de serrure (a = −1/2).
  [guided]  Res(f ; −2)
    (f(z) = z^(−1/2)/(z + 2), z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ (coupure sur ℝ₊), contour en trou de serrure. Les deux bords donnent (1 − e^(2πia)) I = 2πi Σ Res, et ici 1 − e^(2πia) = 2.)
    = □   (trous : 2^(−1/2)e^((−π/2)i))   ← −2 = 2e^(iπ)
    = □   (trous : −i√2/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi(−i√2/2)/(2))   ← Diviser par le facteur
    = □   (trous : π√2/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(x + 2) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −2)) | Res(f ; −2) = 2^(−1/2)e^((−π/2)i) = −i√2/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/3)/(1 + x) dx avec un contour en trou de serrure (a = −1/3).
  [guided]  Res(f ; −1)
    (f(z) = z^(−1/3)/(1 + z), z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ (coupure sur ℝ₊), contour en trou de serrure. Les deux bords donnent (1 − e^(2πia)) I = 2πi Σ Res, et ici 1 − e^(2πia) = 3/2 + i√3/2.)
    = □   (trous : e^((−π/3)i))   ← −1 = e^(iπ)
    = □   (trous : 1/2 − i√3/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi(1/2 − i√3/2)/(3/2 + i√3/2))   ← Diviser par le facteur
    = □   (trous : 2π√3/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x) dx
    = 2π√3/3   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −1)) | Res(f ; −1) = e^((−π/3)i) = 1/2 − i√3/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ 1/(√x(x + 2)) dx avec un contour en trou de serrure (a = −1/2).
  [guided]  Res(f ; −2)
    (f(z) = z^(−1/2)/(z + 2), z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ (coupure sur ℝ₊), contour en trou de serrure. Les deux bords donnent (1 − e^(2πia)) I = 2πi Σ Res, et ici 1 − e^(2πia) = 2.)
    = □   (trous : 2^(−1/2)e^((−π/2)i))   ← −2 = 2e^(iπ)
    = □   (trous : −i√2/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi(−i√2/2)/(2))   ← Diviser par le facteur
    = □   (trous : π√2/2)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(x + 2) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −2)) | Res(f ; −2) = 2^(−1/2)e^((−π/2)i) = −i√2/2
  pièges : c_branch_factor, c_log_branch

```

### Niveau 2

```
Calcule I = ∫₀^∞ x^(−1/3)/(1 + x²) dx avec un contour en trou de serrure (a = −1/3).
  [guided]  1 − e^(2πia)
    = □   (trous : 1 − e^((−2π/3)i))   ← a = −1/3
    = □   (trous : 3/2 + i√3/2)   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = □   (trous : e^((−π/6)i)/(2i))   ← i = e^(iπ/2)
    = □   (trous : −1/4 − i√3/4)   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = □   (trous : e^((−π/2)i)/(−2i))   ← −i = e^(i3π/2)
    = □   (trous : 1/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi((−1/4 − i√3/4) + (1/2))/(3/2 + i√3/2))   ← Diviser par le facteur
    = □   (trous : π√3/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x²) dx
    = π√3/3   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; i) + Res(f ; −i)) | Res(f ; i) = e^((−π/6)i)/(2i) = −1/4 − i√3/4 ; Res(f ; −i) = e^((−π/2)i)/(−2i) = 1/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/3)/(1 + x) dx avec un contour en trou de serrure (a = −1/3).
  [guided]  1 − e^(2πia)
    = □   (trous : 1 − e^((−2π/3)i))   ← a = −1/3
    = □   (trous : 3/2 + i√3/2)   ← Calculer
  — Résidu en −1 (arg = π) :  [juge cval]  départ : Res(f ; −1)
    = □   (trous : e^((−π/3)i))   ← −1 = e^(iπ)
    = □   (trous : 1/2 − i√3/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi(1/2 − i√3/2)/(3/2 + i√3/2))   ← Diviser par le facteur
    = □   (trous : 2π√3/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x) dx
    = 2π√3/3   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −1)) | Res(f ; −1) = e^((−π/3)i) = 1/2 − i√3/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/3)/(1 + x²) dx avec un contour en trou de serrure (a = −1/3).
  [guided]  1 − e^(2πia)
    = □   (trous : 1 − e^((−2π/3)i))   ← a = −1/3
    = □   (trous : 3/2 + i√3/2)   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = □   (trous : e^((−π/6)i)/(2i))   ← i = e^(iπ/2)
    = □   (trous : −1/4 − i√3/4)   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = □   (trous : e^((−π/2)i)/(−2i))   ← −i = e^(i3π/2)
    = □   (trous : 1/2)   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = □   (trous : 2πi((−1/4 − i√3/4) + (1/2))/(3/2 + i√3/2))   ← Diviser par le facteur
    = □   (trous : π√3/3)   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x²) dx
    = π√3/3   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; i) + Res(f ; −i)) | Res(f ; i) = e^((−π/6)i)/(2i) = −1/4 − i√3/4 ; Res(f ; −i) = e^((−π/2)i)/(−2i) = 1/2
  pièges : c_branch_factor, c_log_branch

```

### Niveau 3

```
Calcule I = ∫₀^∞ x^(−1/2)/(1 + x²) dx avec un contour en trou de serrure (a = −1/2).
  [tap, suivre l'erreur, menu menu]  1 − e^(2πia)
    ? Quelle détermination de z^a prendre pour le trou de serrure (coupure sur ℝ₊) ? ✔ z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ / · L'argument principal, arg z ∈ ]−π ; π]
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = e^((−π/4)i)/(2i)   ← i = e^(iπ/2)
    = −√2/4 − i√2/4   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = e^((−3π/4)i)/(−2i)   ← −i = e^(i3π/2)
    = √2/4 − i√2/4   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi((−√2/4 − i√2/4) + (√2/4 − i√2/4))/(2)   ← Diviser par le facteur
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(1 + x²) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; i) + Res(f ; −i)) | Res(f ; i) = e^((−π/4)i)/(2i) = −√2/4 − i√2/4 ; Res(f ; −i) = e^((−3π/4)i)/(−2i) = √2/4 − i√2/4
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ 1/(√x(1 + x)) dx avec un contour en trou de serrure (a = −1/2).
  [tap, suivre l'erreur, menu menu]  1 − e^(2πia)
    ? Quelle détermination de z^a prendre pour le trou de serrure (coupure sur ℝ₊) ? ✔ z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ / · L'argument principal, arg z ∈ ]−π ; π]
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en −1 (arg = π) :  [juge cval]  départ : Res(f ; −1)
    = e^((−π/2)i)   ← −1 = e^(iπ)
    = −i   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi(−i)/(2)   ← Diviser par le facteur
    = π   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(1 + x) dx
    = π   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −1)) | Res(f ; −1) = e^((−π/2)i) = −i
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/2)/(1 + x²) dx avec un contour en trou de serrure (a = −1/2).
  [tap, suivre l'erreur, menu menu]  1 − e^(2πia)
    ? Quelle détermination de z^a prendre pour le trou de serrure (coupure sur ℝ₊) ? ✔ z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ / · L'argument principal, arg z ∈ ]−π ; π]
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = e^((−π/4)i)/(2i)   ← i = e^(iπ/2)
    = −√2/4 − i√2/4   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = e^((−3π/4)i)/(−2i)   ← −i = e^(i3π/2)
    = √2/4 − i√2/4   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi((−√2/4 − i√2/4) + (√2/4 − i√2/4))/(2)   ← Diviser par le facteur
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(1 + x²) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; i) + Res(f ; −i)) | Res(f ; i) = e^((−π/4)i)/(2i) = −√2/4 − i√2/4 ; Res(f ; −i) = e^((−3π/4)i)/(−2i) = √2/4 − i√2/4
  pièges : c_branch_factor, c_log_branch

```

### Niveau 4

```
Calcule I = ∫₀^∞ 1/(√x(x + 2)) dx avec un contour en trou de serrure (a = −1/2).
  [free, suivre l'erreur]  1 − e^(2πia)
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en −2 (arg = π) :  [juge cval]  départ : Res(f ; −2)
    = 2^(−1/2)e^((−π/2)i)   ← −2 = 2e^(iπ)
    = −i√2/2   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi(−i√2/2)/(2)   ← Diviser par le facteur
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(x + 2) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −2)) | Res(f ; −2) = 2^(−1/2)e^((−π/2)i) = −i√2/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/3)/(1 + x) dx avec un contour en trou de serrure (a = −1/3).
  [free, suivre l'erreur]  1 − e^(2πia)
    = 1 − e^((−2π/3)i)   ← a = −1/3
    = 3/2 + i√3/2   ← Calculer
  — Résidu en −1 (arg = π) :  [juge cval]  départ : Res(f ; −1)
    = e^((−π/3)i)   ← −1 = e^(iπ)
    = 1/2 − i√3/2   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi(1/2 − i√3/2)/(3/2 + i√3/2)   ← Diviser par le facteur
    = 2π√3/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x) dx
    = 2π√3/3   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −1)) | Res(f ; −1) = e^((−π/3)i) = 1/2 − i√3/2
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ 1/(√x(x + 2)) dx avec un contour en trou de serrure (a = −1/2).
  [free, suivre l'erreur]  1 − e^(2πia)
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en −2 (arg = π) :  [juge cval]  départ : Res(f ; −2)
    = 2^(−1/2)e^((−π/2)i)   ← −2 = 2e^(iπ)
    = −i√2/2   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi(−i√2/2)/(2)   ← Diviser par le facteur
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(x + 2) dx
    = π√2/2   ← La valeur
  aides : Trou de serrure : sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia). | (1 − e^(2πia)) I = 2πi (Res(f ; −2)) | Res(f ; −2) = 2^(−1/2)e^((−π/2)i) = −i√2/2
  pièges : c_branch_factor, c_log_branch

```

### Niveau 5

```
Calcule I = ∫₀^∞ x^(−1/3)/(1 + x²) dx avec un contour en trou de serrure (a = −1/3).
  [free, sans aide]  1 − e^(2πia)
    = 1 − e^((−2π/3)i)   ← a = −1/3
    = 3/2 + i√3/2   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = e^((−π/6)i)/(2i)   ← i = e^(iπ/2)
    = −1/4 − i√3/4   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = e^((−π/2)i)/(−2i)   ← −i = e^(i3π/2)
    = 1/2   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi((−1/4 − i√3/4) + (1/2))/(3/2 + i√3/2)   ← Diviser par le facteur
    = π√3/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x²) dx
    = π√3/3   ← La valeur
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(1/3)/(1 + x²) dx avec un contour en trou de serrure (a = 1/3).
  [free, sans aide]  1 − e^(2πia)
    = 1 − e^((2π/3)i)   ← a = 1/3
    = 3/2 − i√3/2   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = e^((π/6)i)/(2i)   ← i = e^(iπ/2)
    = 1/4 − i√3/4   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = e^((π/2)i)/(−2i)   ← −i = e^(i3π/2)
    = −1/2   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi((1/4 − i√3/4) + (−1/2))/(3/2 − i√3/2)   ← Diviser par le facteur
    = π√3/3   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(1/3)/(1 + x²) dx
    = π√3/3   ← La valeur
  pièges : c_branch_factor, c_log_branch

Calcule I = ∫₀^∞ x^(−1/2)/(1 + x²) dx avec un contour en trou de serrure (a = −1/2).
  [free, sans aide]  1 − e^(2πia)
    = 1 − e^((−π)i)   ← a = −1/2
    = 2   ← Calculer
  — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
    = e^((−π/4)i)/(2i)   ← i = e^(iπ/2)
    = −√2/4 − i√2/4   ← Calculer
  — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
    = e^((−3π/4)i)/(−2i)   ← −i = e^(i3π/2)
    = √2/4 − i√2/4   ← Calculer
  — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
    = 2πi((−√2/4 − i√2/4) + (√2/4 − i√2/4))/(2)   ← Diviser par le facteur
    = π√2/2   ← Calculer
  — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/2)/(1 + x²) dx
    = π√2/2   ← La valeur
  pièges : c_branch_factor, c_log_branch

```

### Variantes d'examen

```
Calcule I = ∫₀^∞ x^(−1/3)/(1 + x²) dx avec un contour en trou de serrure (a = −1/3).
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; Résidu en i (arg = π/2) : 1,5 ; Résidu en −i (arg = 3π/2) : 1 ; (1 − e^(2πia)) I = 2πi Σ Res : 1 ; Conclusion : 1)
    [free, sans aide, suivre l'erreur, examen open]  1 − e^(2πia)
      = 1 − e^((−2π/3)i)   ← a = −1/3
      = 3/2 + i√3/2   ← Calculer
    — Résidu en i (arg = π/2) :  [juge cval]  départ : Res(f ; i)
      = e^((−π/6)i)/(2i)   ← i = e^(iπ/2)
      = −1/4 − i√3/4   ← Calculer
    — Résidu en −i (arg = 3π/2) :  [juge cval]  départ : Res(f ; −i)
      = e^((−π/2)i)/(−2i)   ← −i = e^(i3π/2)
      = 1/2   ← Calculer
    — (1 − e^(2πia)) I = 2πi Σ Res :  [juge cval]  départ : I
      = 2πi((−1/4 − i√3/4) + (1/2))/(3/2 + i√3/2)   ← Diviser par le facteur
      = π√3/3   ← Calculer
    — Conclusion :  [juge definite]  départ : ∫_{0}^{∞} x^(−1/3)/(1 + x²) dx
      = π√3/3   ← La valeur
  pièges : c_branch_factor, c_log_branch

```

## Transformée de Fourier calculée par les résidus (GM) (`c-fourier-residues`, BA3)

_f̂(α) = (1/√(2π)) ∫ f(x)e^(−iαx) dx : fermer en bas si α > 0, puis |α|._

### Niveau 1

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [guided]  Res(g ; −i)
    (Pour α > 0, |e^(−iαz)| = e^(α Im z) ≤ 1 quand Im z ≤ 0 : on ferme en bas, le contour est parcouru dans le sens négatif, ∫ = −2πi Σ Res. Pour α < 0, on conclut par parité.)
    = □   (trous : e^(−α)/(−2i))   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−α))   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i)) | Res(g ; −i) = e^(−α)/(−2i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 9) avec les résidus.
  [guided]  Res(g ; −3i)
    (Pour α > 0, |e^(−iαz)| = e^(α Im z) ≤ 1 quand Im z ≤ 0 : on ferme en bas, le contour est parcouru dans le sens négatif, ∫ = −2πi Σ Res. Pour α < 0, on conclut par parité.)
    = □   (trous : e^(−3α)/(−6i))   ← g(z) = e^(−iαz)f(z), pôle −3i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−3α)/3)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−3|α|)/3   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −3i)) | Res(g ; −3i) = e^(−3α)/(−6i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 4) avec les résidus.
  [guided]  Res(g ; −2i)
    (Pour α > 0, |e^(−iαz)| = e^(α Im z) ≤ 1 quand Im z ≤ 0 : on ferme en bas, le contour est parcouru dans le sens négatif, ∫ = −2πi Σ Res. Pour α < 0, on conclut par parité.)
    = □   (trous : e^(−2α)/(−4i))   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−2α)/2)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−2|α|)/2   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −2i)) | Res(g ; −2i) = e^(−2α)/(−4i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

### Niveau 2

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [guided]  Res(g ; −i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = □   (trous : e^(−α)/(−2i))   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−α))   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i)) | Res(g ; −i) = e^(−α)/(−2i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 4) avec les résidus.
  [guided]  Res(g ; −2i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = □   (trous : e^(−2α)/(−4i))   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−2α)/2)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−2|α|)/2   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −2i)) | Res(g ; −2i) = e^(−2α)/(−4i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 4) avec les résidus.
  [guided]  Res(g ; −2i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = □   (trous : e^(−2α)/(−4i))   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = □   (trous : √(π/2)e^(−2α)/2)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−2|α|)/2   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −2i)) | Res(g ; −2i) = e^(−2α)/(−4i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

### Niveau 3

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [tap, suivre l'erreur, menu menu]  Res(g ; −i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = e^(−α)/(−2i)   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(π/2)e^(−α)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i)) | Res(g ; −i) = e^(−α)/(−2i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [tap, suivre l'erreur, menu menu]  Res(g ; −i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = e^(−α)/(−2i)   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(π/2)e^(−α)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i)) | Res(g ; −i) = e^(−α)/(−2i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 4) avec les résidus.
  [tap, suivre l'erreur, menu menu]  Res(g ; −2i)
    ? α > 0 : quel demi-plan ? ✔ Le demi-plan inférieur (Im z ≤ 0) / · Le demi-plan supérieur (Im z ≥ 0)
    = e^(−2α)/(−4i)   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(π/2)e^(−2α)/2   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−2|α|)/2   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −2i)) | Res(g ; −2i) = e^(−2α)/(−4i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

### Niveau 4

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/((x² + 1)(x² + 4)) avec les résidus.
  [free, suivre l'erreur]  Res(g ; −i)
    = e^(−α)/(−6i)   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pôle −2i :  [juge cval]  départ : Res(g ; −2i)
    = e^(−2α)/(12i)   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(2π)(2e^(−α) − e^(−2α))/12   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(2π)(2e^(−|α|) − e^(−2|α|))/12   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i) + Res(g ; −2i)) | Res(g ; −i) = e^(−α)/(−6i) ; Res(g ; −2i) = e^(−2α)/(12i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [free, suivre l'erreur]  Res(g ; −i)
    = e^(−α)/(−2i)   ← g(z) = e^(−iαz)f(z), pôle −i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(π/2)e^(−α)   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −i)) | Res(g ; −i) = e^(−α)/(−2i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 9) avec les résidus.
  [free, suivre l'erreur]  Res(g ; −3i)
    = e^(−3α)/(−6i)   ← g(z) = e^(−iαz)f(z), pôle −3i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(π/2)e^(−3α)/3   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(π/2)e^(−3|α|)/3   ← Remplacer α par |α|
  aides : α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi. | f̂(α) = (1/√(2π)) · (−2πi) (Res(g ; −3i)) | Res(g ; −3i) = e^(−3α)/(−6i)
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

### Niveau 5

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/((x² + 4)(x² + 9)) avec les résidus.
  [free, sans aide]  Res(g ; −2i)
    = e^(−2α)/(−20i)   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pôle −3i :  [juge cval]  départ : Res(g ; −3i)
    = e^(−3α)/(30i)   ← g(z) = e^(−iαz)f(z), pôle −3i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(2π)(3e^(−2α) − 2e^(−3α))/60   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(2π)(3e^(−2|α|) − 2e^(−3|α|))/60   ← Remplacer α par |α|
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x⁴ + 4) avec les résidus.
  [free, sans aide]  Res(g ; 1−i)
    = (−1 + i)e^(−α)e^(−iα)/16   ← g(z) = e^(−iαz)f(z), pôle 1−i
  — Pôle −1 − i :  [juge cval]  départ : Res(g ; −1−i)
    = (1 + i)e^(−α)e^(iα)/16   ← g(z) = e^(−iαz)f(z), pôle −1−i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(2π)e^(−α)(cos(α) + sin(α))/8   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(2π)e^(−|α|)(cos(α) + sin(|α|))/8   ← Remplacer α par |α|
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/((x² + 4)(x² + 9)) avec les résidus.
  [free, sans aide]  Res(g ; −2i)
    = e^(−2α)/(−20i)   ← g(z) = e^(−iαz)f(z), pôle −2i
  — Pôle −3i :  [juge cval]  départ : Res(g ; −3i)
    = e^(−3α)/(30i)   ← g(z) = e^(−iαz)f(z), pôle −3i
  — Pour α > 0 :  [juge cval]  départ : f̂(α)
    = √(2π)(3e^(−2α) − 2e^(−3α))/60   ← Simplifier
  — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
    = √(2π)(3e^(−2|α|) − 2e^(−3|α|))/60   ← Remplacer α par |α|
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

### Variantes d'examen

```
Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = 1/(x² + 1) avec les résidus.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 2 ; Pour α > 0 : 1,5 ; f est paire, donc f̂ aussi : pour tout α, : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  Res(g ; −i)
      = e^(−α)/(−2i)   ← g(z) = e^(−iαz)f(z), pôle −i
    — Pour α > 0 :  [juge cval]  départ : f̂(α)
      = √(π/2)e^(−α)   ← Simplifier
    — f est paire, donc f̂ aussi : pour tout α,  [juge transform]  départ : f̂(α)
      = √(π/2)e^(−|α|)   ← Remplacer α par |α|
  pièges : c_fourier_res_sign, c_jordan_alpha_sign

```

## Applications conformes (opt.) (`c-conformal`, BA3)

_Homographies : images de points, de droites et de cercles._

### Niveau 1

```
Soit w = 1/z. Calcule les images de −1, ∞, 1.
  [guided]  w(−1)
    = □   (trous : (1)/((−1)))   ← Remplacer z
    = □   (trous : −1)   ← Simplifier
  — La limite quand z → ∞ :  [juge cval]  départ : w(∞)
    = □   (trous : 0)   ← w(∞) = a/c
  — Image de 1 :  [juge cval]  départ : w(1)
    = □   (trous : 1)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(−1) = (1)/((−1)) | w(−1) = −1
  pièges : c_mobius_point

Soit w = z/(z − 2). Calcule les images de −1, 1, i.
  [guided]  w(−1)
    = □   (trous : ((−1))/((−1) − 2))   ← Remplacer z
    = □   (trous : 1/3)   ← Simplifier
  — Image de 1 :  [juge cval]  départ : w(1)
    = □   (trous : (1)/(1 − 2))   ← Remplacer z
    = □   (trous : −1)   ← Simplifier
  — Image de i :  [juge cval]  départ : w(i)
    = □   (trous : (i)/(i − 2))   ← Remplacer z
    = □   (trous : 1/5 − 2i/5)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(−1) = ((−1))/((−1) − 2) | w(−1) = 1/3
  pièges : c_mobius_point

Soit w = 2z/(z + 1). Calcule les images de ∞, 0, i.
  [guided]  w(∞)
    = □   (trous : 2)   ← w(∞) = a/c
  — Image de 0 :  [juge cval]  départ : w(0)
    = □   (trous : (2(0))/(0 + 1))   ← Remplacer z
    = □   (trous : 0)   ← Simplifier
  — Image de i :  [juge cval]  départ : w(i)
    = □   (trous : (2(i))/(i + 1))   ← Remplacer z
    = □   (trous : 1 + i)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(∞) = a/c | w(∞) = 2
  pièges : c_mobius_point

```

### Niveau 2

```
Soit w = (iz + 1)/(z + i). Calcule les images de −1, ∞, i.
  [guided]  w(−1)
    = □   (trous : (i(−1) + 1)/((−1) + i))   ← Remplacer z
    = □   (trous : −1)   ← Simplifier
  — La limite quand z → ∞ :  [juge cval]  départ : w(∞)
    = □   (trous : i)   ← w(∞) = a/c
  — Image de i :  [juge cval]  départ : w(i)
    = □   (trous : (i(i) + 1)/(i + i))   ← Remplacer z
    = □   (trous : 0)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(−1) = (i(−1) + 1)/((−1) + i) | w(−1) = −1
  pièges : c_mobius_point

Soit w = (z − i)/(z + i). Calcule les images de ∞, 0, i.
  [guided]  w(∞)
    = □   (trous : 1)   ← w(∞) = a/c
  — Image de 0 :  [juge cval]  départ : w(0)
    = □   (trous : (0 − i)/(0 + i))   ← Remplacer z
    = □   (trous : −1)   ← Simplifier
  — Image de i :  [juge cval]  départ : w(i)
    = □   (trous : (i − i)/(i + i))   ← Remplacer z
    = □   (trous : 0)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(∞) = a/c | w(∞) = 1
  pièges : c_mobius_point

Soit w = (z + i)/(z − i). Calcule les images de 0, −1, 1.
  [guided]  w(0)
    = □   (trous : (0 + i)/(0 − i))   ← Remplacer z
    = □   (trous : −1)   ← Simplifier
  — Image de −1 :  [juge cval]  départ : w(−1)
    = □   (trous : ((−1) + i)/((−1) − i))   ← Remplacer z
    = □   (trous : −i)   ← Simplifier
  — Image de 1 :  [juge cval]  départ : w(1)
    = □   (trous : (1 + i)/(1 − i))   ← Remplacer z
    = □   (trous : i)   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(0) = (0 + i)/(0 − i) | w(0) = −1
  pièges : c_mobius_point

```

### Niveau 3

```
Soit w = (z + i)/(z − i). Calcule les images de 1, 0, −1.
  [tap, suivre l'erreur, menu menu]  w(1)
    ? L'image d'une droite ou d'un cercle par une homographie est : ✔ Un cercle ou une droite / · Une conique quelconque
    = (1 + i)/(1 − i)   ← Remplacer z
    = i   ← Simplifier
  — Image de 0 :  [juge cval]  départ : w(0)
    = (0 + i)/(0 − i)   ← Remplacer z
    = −1   ← Simplifier
  — Image de −1 :  [juge cval]  départ : w(−1)
    = ((−1) + i)/((−1) − i)   ← Remplacer z
    = −i   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(1) = (1 + i)/(1 − i) | w(1) = i
  pièges : c_mobius_point

Soit w = (z − i)/(z + i). Calcule les images de 0, 1, i.
  [tap, suivre l'erreur, menu menu]  w(0)
    ? L'image d'une droite ou d'un cercle par une homographie est : ✔ Un cercle ou une droite / · Une conique quelconque
    = (0 − i)/(0 + i)   ← Remplacer z
    = −1   ← Simplifier
  — Image de 1 :  [juge cval]  départ : w(1)
    = (1 − i)/(1 + i)   ← Remplacer z
    = −i   ← Simplifier
  — Image de i :  [juge cval]  départ : w(i)
    = (i − i)/(i + i)   ← Remplacer z
    = 0   ← Simplifier
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(0) = (0 − i)/(0 + i) | w(0) = −1
  pièges : c_mobius_point

Soit w = (z + 1)/(1 − z). Calcule les images de 0, i, ∞.
  [tap, suivre l'erreur, menu menu]  w(0)
    ? L'image d'une droite ou d'un cercle par une homographie est : ✔ Un cercle ou une droite / · Une conique quelconque
    = (0 + 1)/(1 − 0)   ← Remplacer z
    = 1   ← Simplifier
  — Image de i :  [juge cval]  départ : w(i)
    = (i + 1)/(1 − i)   ← Remplacer z
    = i   ← Simplifier
  — La limite quand z → ∞ :  [juge cval]  départ : w(∞)
    = −1   ← w(∞) = a/c
  aides : Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c. | w(0) = (0 + 1)/(1 − 0) | w(0) = 1
  pièges : c_mobius_point

```

### Niveau 4

```
Trouve l'homographie w = (az + b)/(cz + d) qui envoie 0 ↦ −1, 1 ↦ 0, i ↦ i.
  [free, suivre l'erreur]  w(z)
    = (z − 1)/(z + 1)   ← Trois conditions, a, b, c, d à un facteur près
  aides : Une homographie est fixée par trois points, a, b, c, d à un facteur près. Si 0 ↦ w₀, alors b/d = w₀ ; si ∞ ↦ w∞, alors a/c = w∞. | Un point envoyé sur 0 annule le numérateur, un point envoyé sur ∞ annule le dénominateur ; sinon, résous les trois équations w(zₖ) = wₖ. | w = (z − 1)/(z + 1)

Trouve l'homographie w = (az + b)/(cz + d) qui envoie 0 ↦ −1, 1 ↦ −i, i ↦ 0.
  [free, suivre l'erreur]  w(z)
    = (z − i)/(z + i)   ← Trois conditions, a, b, c, d à un facteur près
  aides : Une homographie est fixée par trois points, a, b, c, d à un facteur près. Si 0 ↦ w₀, alors b/d = w₀ ; si ∞ ↦ w∞, alors a/c = w∞. | Un point envoyé sur 0 annule le numérateur, un point envoyé sur ∞ annule le dénominateur ; sinon, résous les trois équations w(zₖ) = wₖ. | w = (z − i)/(z + i)

Trouve l'homographie w = (az + b)/(cz + d) qui envoie 0 ↦ 0, 1 ↦ 1, i ↦ 1 + i.
  [free, suivre l'erreur]  w(z)
    = 2z/(z + 1)   ← Trois conditions, a, b, c, d à un facteur près
  aides : Une homographie est fixée par trois points, a, b, c, d à un facteur près. Si 0 ↦ w₀, alors b/d = w₀ ; si ∞ ↦ w∞, alors a/c = w∞. | Un point envoyé sur 0 annule le numérateur, un point envoyé sur ∞ annule le dénominateur ; sinon, résous les trois équations w(zₖ) = wₖ. | w = 2z/(z + 1)

```

### Niveau 5

```
L'image de la bande −π/2 < Im z < π/2 par w = e^z est :
  · tout ℂ privé de 0   · le demi-plan Im w > 0   ✔ le demi-plan Re w > 0   · le disque |w| < 1

L'image de la bande 0 < Im z < π par w = e^z est :
  · le demi-plan Re w > 0   · le disque |w| < 1   ✔ le demi-plan Im w > 0   · la bande 0 < Im w < π

L'image du demi-plan Im z > 0 par w = (z − i)/(z + i) est :
  · l'extérieur |w| > 1   ✔ le disque |w| < 1   · le demi-plan Im w > 0   · le demi-plan Re w > 0

```

### Variantes d'examen

```
L'image du disque |z| < 1 par w = (1 + z)/(1 − z) est :
  ✔ le demi-plan Re w > 0   · le demi-plan Im w > 0   · l'extérieur |w| > 1   · le disque |w| < 1
  [examen mcq]

```

## Pièges de cette unité

- **Argument hors de ]−π ; π]** (`c_log_branch`, E) : Log(−1 − i) = ln √2 + 5πi/4 au lieu de ln √2 − 3πi/4
- **Famille + 2kπi oubliée** (`c_exp_periodic`, E) : e^z = i ⟹ z = iπ/2 au lieu de z = iπ/2 + 2kπi
- **√(−a) lu comme √a** (`c_sqrt_i`, C) : √(−16) = −4 ou √(z₁z₂) = √z₁ √z₂ au lieu de ±4i, et pas de règle de produit
- **Signe de Cauchy-Riemann** (`c_cr_sign`, E) : u_y = v_x au lieu de u_y = −v_x
- **z̄ pris pour holomorphe** (`c_conj_not_holo`, E) : ∮_{|z|=1} z̄ dz = 0 au lieu de 2πi
- **Constante complexe** (`c_harmonic_const_imag`, E) : f = z² + 3z + c avec c ∈ ℂ au lieu de c ∈ ℝ
- **γ′(t) oublié** (`c_contour_dz_forgot`, E) : ∫₀¹ t dt = 1/2 au lieu de ∫₀¹ t (1 + i) dt
- **Singularité sur le contour** (`c_pole_on_contour`, C) : ∮_{|z|=1} dz/(z(z + 1)) = 2πi au lieu de non définie
- **Pôle extérieur compté** (`c_pole_outside_counted`, C) : 2πi(Res₀ + Res₁ + Res₃) au lieu de 2πi(Res₀ + Res₁)
- **|cos z| ≤ 1 sur ℂ** (`c_cos_bounded`, C) : « |cos z| ≤ 1 sur l'arc » au lieu de |cos(x + iy)|² = cos²x + sinh²y
- **cos(αz) mis dans le contour** (`c_eiax_cos`, C) : ∮ cos(2z)/(z² + 1) au lieu de ∮ e^(2iz)/(z² + 1), puis Re
- **Puissance n + 1 ou n! dans la formule de Cauchy** (`c_cauchy_n_factor`, C) : f^(n)(z₀) = n!/(2πi) ∮ f/(z − z₀)ⁿ au lieu de (z − z₀)^(n+1)
- **(−1)ⁿ oublié** (`c_laurent_sign`, C) : 1/(1 + z) = Σ zⁿ au lieu de Σ (−1)ⁿ zⁿ
- **Développement de la mauvaise couronne** (`c_laurent_wrong_annulus`, E) : dans |z| > 1 : 1/(z − 1) = −Σ zⁿ au lieu de Σ_{n≥1} z^(−n)
- **Rayon : distance au carré** (`c_taylor_radius`, E) : rayon de 1/(3 + z²) = 3 au lieu de √3
- **Singularité apparente prise pour un pôle** (`c_removable_as_pole`, E) : sin z/z a un pôle en 0 au lieu de singularité apparente
- **Ordre du pôle sans le numérateur** (`c_order_pole_numerator`, E) : (e^(z−π) − 1)/sin²z : pôle double au lieu de pôle simple
- **Formule du pôle simple en un pôle multiple** (`c_simple_formula_double`, E) : Res(1/(z²(z − 1)), 0) = lim z · f au lieu de limite infinie
- **1/(m − 1)! oublié** (`c_multiple_factorial`, E) : pôle d'ordre 3 : Res = d²/dz²[…] au lieu de (1/2!) d²/dz²[…]
- **Formule de pôle en une singularité essentielle** (`c_essential_lim`, E) : Res(sin(1/z), 0) = lim z sin(1/z) au lieu de a₋₁ = 1
- **Facteur de 1/(a − bz) oublié** (`c_essential_factor`, E) : Res(sin(1/(2i − 3z)), 2i/3) = 1 au lieu de −1/3
- **Facteur 2πi oublié** (`c_residue_2pii`, E) : ∮ = Σ Res au lieu de 2πi Σ Res
- **Pôles du mauvais demi-plan** (`c_upper_half_lower_pole`, E) : garder −i au lieu de i au lieu de valeur opposée
- **Fermé du mauvais côté pour α** (`c_jordan_alpha_sign`, E) : α < 0 et fermeture en haut au lieu de fermer en bas
- **Substitution z = e^(iθ) mal faite** (`c_trig_sub`, C) : 1/(√5 − sin θ) ↦ 2/(−z² + iz√5 + 1) au lieu de 2/(−z² + 2iz√5 + 1)
- **Majoration de 1/|q| par 1/(R² + 1)** (`c_arc_triangle`, E) : 1/|z² + 1| ≤ 1/(R² + 1) au lieu de ≤ 1/(R² − 1)
- **Facteur du bord de la coupure** (`c_branch_factor`, E) : (1 + e^(2πia)) I au lieu de (1 − e^(2πia)) I
- **Sens négatif oublié (contour du bas)** (`c_fourier_res_sign`, E) : fermer en bas avec +2πi au lieu de −2πi
- **Division complexe terme à terme** (`c_mobius_point`, E) : (1 − i)/(1 + i) = 1 au lieu de −i
