# Exemples de questions — Exponentielles et logarithmes

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Puissances à exposant réel (`g2-real-powers`, Gymnase)

_a^(1/n) = ⁿ√a, et les règles des puissances avec des fractions._

### Niveau 1

```
Calcule 32^(3/5) sans calculatrice.
  [guided]  32^(3/5)
    = (32^(□))³   (trous : (32^(1/5))³)   ← a^(p/q) = (a^(1/q))^p
    = □³   (trous : 2³)   ← racine cinquième de 32 : 2
    = 8   ← Calculer
  aides : a^(p/q) = (ⁿ√a)ᵖ avec n = q : prends d'abord la racine cinquième de 32. | 32^(1/5) = 2 | 2³

Calcule 27^(−2/3) sans calculatrice.
  [guided]  27^(−2/3)
    = 1/27^(2/3)   ← a^(−p) = 1/aᵖ
    = 1/(27^(□))²   (trous : 1/(27^(1/3))²)   ← a^(p/q) = (a^(1/q))^p
    = 1/□²   (trous : 1/3²)   ← racine cubique de 27 : 3
    = 1/9   ← Calculer
  aides : a^(p/q) = (ⁿ√a)ᵖ avec n = q : prends d'abord la racine cubique de 27. | 27^(1/3) = 3 | 1/3²

Calcule 27^(−2/3) sans calculatrice.
  [guided]  27^(−2/3)
    = 1/27^(2/3)   ← a^(−p) = 1/aᵖ
    = 1/(27^(□))²   (trous : 1/(27^(1/3))²)   ← a^(p/q) = (a^(1/q))^p
    = 1/□²   (trous : 1/3²)   ← racine cubique de 27 : 3
    = 1/9   ← Calculer
  aides : a^(p/q) = (ⁿ√a)ᵖ avec n = q : prends d'abord la racine cubique de 27. | 27^(1/3) = 3 | 1/3²

```

### Niveau 2

```
Simplifie (a^(−4/3))³/(a^−2) (a > 0) : une seule puissance par lettre.
  [guided]  (a^(−4/3))³/(a^(−2))
    = a^(□)/(a^(−2))   (trous : a^(−4)/(a^(−2)))   ← Puissance d'un produit : multiplier les exposants
    = a^(−4 + 2)   ← Quotient : soustraire les exposants
    = a^(−2)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(−4/3))³ = a^(…) | a^−4/(a^−2)
  pièges : g2_power_power

Simplifie (a^(1/2))²/(a³) (a > 0) : une seule puissance par lettre.
  [guided]  (a^(1/2))²/(a³)
    = a/(a³)   ← Puissance d'un produit : multiplier les exposants
    = a^(1 − 3)   ← Quotient : soustraire les exposants
    = a^(−2)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(1/2))² = a^(…) | a/(a³)
  pièges : g2_power_power

Simplifie (a^(1/2))⁴/(a³) (a > 0) : une seule puissance par lettre.
  [guided]  (a^(1/2))⁴/(a³)
    = a^□/(a³)   (trous : a²/(a³))   ← Puissance d'un produit : multiplier les exposants
    = a^(2 − 3)   ← Quotient : soustraire les exposants
    = a^(−1)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(1/2))⁴ = a^(…) | a²/(a³)
  pièges : g2_power_power

```

### Niveau 3

```
Simplifie (a^(2/3)b^(2/3))³/(a³b⁴) (a, b > 0) : une seule puissance par lettre.
  [tap, suivre l'erreur, menu steps]  (a^(2/3)b^(2/3))³/(a³b⁴)
    = a²b²/(a³b⁴)   ← Puissance d'un produit : multiplier les exposants
    = a^(2 − 3)b^(2 − 4)   ← Quotient : soustraire les exposants
    = a^(−1)b^(−2)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(2/3))³ = a^(…) | a²b²/(a³b⁴)

Simplifie (a^(3/2)b^(−1/4))⁴/(a³b) (a, b > 0) : une seule puissance par lettre.
  [tap, suivre l'erreur, menu steps]  (a^(3/2)b^(−1/4))⁴/(a³b)
    = a⁶b^(−1)/(a³b)   ← Puissance d'un produit : multiplier les exposants
    = a^(6 − 3)b^(−1 − 1)   ← Quotient : soustraire les exposants
    = a³b^(−2)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(3/2))⁴ = a^(…) | a⁶b^−1/(a³b)

Simplifie (a^(3/4)b^−1)⁴/(b^−3) (a, b > 0) : une seule puissance par lettre.
  [tap, suivre l'erreur, menu steps]  (a^(3/4)b^(−1))⁴/(b^(−3))
    = a³b^(−4)/(b^(−3))   ← Puissance d'un produit : multiplier les exposants
    = a^(3)b^(−4 + 3)   ← Quotient : soustraire les exposants
    = a³b^(−1)   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(3/4))⁴ = a^(…) | a³b^−4/(b^−3)

```

### Niveau 4

```
Simplifie (a^(1/6)b^(5/6))⁶/(a³b²) (a, b > 0) : une seule puissance par lettre.
  [free, suivre l'erreur]  (a^(1/6)b^(5/6))⁶/(a³b²)
    = ab⁵/(a³b²)   ← Puissance d'un produit : multiplier les exposants
    = a^(1 − 3)b^(5 − 2)   ← Quotient : soustraire les exposants
    = a^(−2)b³   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(1/6))⁶ = a^(…) | ab⁵/(a³b²)

Simplifie (a^(1/3)b^(−2/3))³/(b^−2) (a, b > 0) : une seule puissance par lettre.
  [free, suivre l'erreur]  (a^(1/3)b^(−2/3))³/(b^(−2))
    = ab^(−2)/(b^(−2))   ← Puissance d'un produit : multiplier les exposants
    = a^(1)b^(−2 + 2)   ← Quotient : soustraire les exposants
    = a   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(1/3))³ = a^(…) | ab^−2/(b^−2)

Simplifie (a^(1/6)b^(−1/2))⁶/(a^−2b^−3) (a, b > 0) : une seule puissance par lettre.
  [free, suivre l'erreur]  (a^(1/6)b^(−1/2))⁶/(a^(−2)b^(−3))
    = ab^(−3)/(a^(−2)b^(−3))   ← Puissance d'un produit : multiplier les exposants
    = a^(1 + 2)b^(−3 + 3)   ← Quotient : soustraire les exposants
    = a³   ← Réduire
  aides : (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᵠ = aᵖᵠ. Ensuite aᵖ/aᵠ = a^(p − q). | (a^(1/6))⁶ = a^(…) | ab^−3/(a^−2b^−3)

```

### Niveau 5

```
Résous 3^x·9^(x + 1) = 9.
  [free, sans aide]  3^x·9^(x + 1) = 9
    = 3^x·3^(2(x + 1)) = 3²   ← 9 = 3²
    = 3^(x + 2(x + 1)) = 3²   ← Produit de même base
    = x + 2(x + 1) = 2   ← Comparer les exposants
    = x = 0   ← Résoudre

Résous 3^(3x)·9^(x − 2) = 3.
  [free, sans aide]  3^(3x)·9^(x − 2) = 3
    = 3^(3x)·3^(2(x − 2)) = 3¹   ← 9 = 3² et 3 = 3^1
    = 3^(3x + 2(x − 2)) = 3¹   ← Produit de même base
    = 3x + 2(x − 2) = 1   ← Comparer les exposants
    = x = 1   ← Résoudre

Résous 2^x·4^(x − 1) = 2.
  [free, sans aide]  2^x·4^(x − 1) = 2
    = 2^x·2^(2(x − 1)) = 2¹   ← 4 = 2² et 2 = 2^1
    = 2^(x + 2(x − 1)) = 2¹   ← Produit de même base
    = x + 2(x − 1) = 1   ← Comparer les exposants
    = x = 1   ← Résoudre

```

### Variantes d'examen

```
Pour a, b > 0, (a^(−1/3)b^(−2/3))³/(a^−1b^−4) =
  · a^(11/3)b^(19/3) [g2_power_power]   · a^−2b^−6   ✔ b²   · a^(2/3)b^(10/3)
  [examen mcq]
  pièges : g2_power_power

Vrai ou faux ?
  « Pour tout a > 0 : a^(−1/2) = 1/√a. » → VRAI
  [examen tf]

```

## Logarithmes : définition et règles (`g2-log-rules`, Gymnase)

_ln(uv) = ln u + ln v, ln(uᵖ) = p ln u, changement de base._

### Niveau 1

```
Calcule log₉(1/3).
  [guided]  log₉(1/3)
    = log₉(9^(□))   (trous : log₉(9^(−1/2)))   ← 1/3 est une puissance de 9
    = −1/2   ← log_a(aʳ) = r
  aides : log_a y = x ⇔ aˣ = y : écris 1/3 comme une puissance de 9. | 1/3 = 9^… | log₉(9^(−1/2))

Calcule log₃(1/9).
  [guided]  log₃(1/9)
    = log₃(3^(□))   (trous : log₃(3^(−2)))   ← 1/9 est une puissance de 3
    = −2   ← log_a(aʳ) = r
  aides : log_a y = x ⇔ aˣ = y : écris 1/9 comme une puissance de 3. | 1/9 = 3^… | log₃(3^−2)

Calcule log₃(1/9).
  [guided]  log₃(1/9)
    = log₃(3^(□))   (trous : log₃(3^(−2)))   ← 1/9 est une puissance de 3
    = −2   ← log_a(aʳ) = r
  aides : log_a y = x ⇔ aˣ = y : écris 1/9 comme une puissance de 3. | 1/9 = 3^… | log₃(3^−2)

```

### Niveau 2

```
Développe ln(e·√(x + 1)) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [guided]  ln(e·√(x + 1))
    = □ + ln(√(x + 1))   (trous : ln(e) + ln(√(x + 1)))   ← Produit et quotient
    = 1 + (1/2)ln(x + 1)   ← Puissances
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(e) + ln(√(x + 1)), puis ln(√u) = (1/2)·ln u | ln(e) + ln(√(x + 1))

Développe ln(x²·(x + 2)²) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [guided]  ln(x²·(x + 2)²)
    = □ + ln((x + 2)²)   (trous : ln(x²) + ln((x + 2)²))   ← Produit et quotient
    = 2ln(x) + 2ln(x + 2)   ← Puissances
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(x²) + ln((x + 2)²), puis ln(√u) = (1/2)·ln u | ln(x²) + ln((x + 2)²)

Développe ln(x³·√(x + 2)) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [guided]  ln(x³·√(x + 2))
    = □ + ln(√(x + 2))   (trous : ln(x³) + ln(√(x + 2)))   ← Produit et quotient
    = 3ln(x) + (1/2)ln(x + 2)   ← Puissances
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(x³) + ln(√(x + 2)), puis ln(√u) = (1/2)·ln u | ln(x³) + ln(√(x + 2))

```

### Niveau 3

```
Développe ln((√x·x⁴)/(x + 3)²) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [tap, suivre l'erreur, menu steps]  ln((√x·x⁴)/(x + 3)²)
    = ln(√x) + ln(x⁴) − ln((x + 3)²)   ← Produit et quotient
    = (9/2)ln(x) − 2ln(x + 3)   ← Puissances, puis réduire
    ? Quelle règle as-tu utilisée à la première ligne ? → ln(uv) = ln u + ln v
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(√x) + ln(x⁴) − ln((x + 3)²), puis ln(√u) = (1/2)·ln u | ln(√x) + ln(x⁴) − ln((x + 3)²)
  pièges : g2_log_quotient

Développe ln((√x·x³)/(x + 5)³) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [tap, suivre l'erreur, menu steps]  ln((√x·x³)/(x + 5)³)
    = ln(√x) + ln(x³) − ln((x + 5)³)   ← Produit et quotient
    = (7/2)ln(x) − 3ln(x + 5)   ← Puissances, puis réduire
    ? Quelle règle as-tu utilisée à la première ligne ? → ln(uv) = ln u + ln v
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(√x) + ln(x³) − ln((x + 5)³), puis ln(√u) = (1/2)·ln u | ln(√x) + ln(x³) − ln((x + 5)³)
  pièges : g2_log_quotient

Développe ln((x²·√(x + 4))/(x + 5)) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [tap, suivre l'erreur, menu steps]  ln((x²·√(x + 4))/(x + 5))
    = ln(x²) + ln(√(x + 4)) − ln(x + 5)   ← Produit et quotient
    = 2ln(x) + (1/2)ln(x + 4) − ln(x + 5)   ← Puissances
    ? Quelle règle as-tu utilisée à la première ligne ? → ln(uv) = ln u + ln v
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(x²) + ln(√(x + 4)) − ln(x + 5), puis ln(√u) = (1/2)·ln u | ln(x²) + ln(√(x + 4)) − ln(x + 5)
  pièges : g2_log_quotient

```

### Niveau 4

```
Écris 2ln(x) − 2ln(x + 5) + 1 (x > 0) avec un seul logarithme.
  [free, suivre l'erreur]  2ln(x) − 2ln(x + 5) + 1
    = ln(x²) − ln((x + 5)²) + ln(e)   ← p·ln u = ln(uᵖ), k = ln(eᵏ)
    = ln(e·x²/(x + 5)²)   ← Un seul logarithme
  aides : Fais d'abord entrer chaque coefficient dans son ln (p·ln u = ln(uᵖ)), et écris le nombre comme un ln : k = ln(eᵏ). | ln(x²) − ln((x + 5)²) + ln(e) | ln(e·x²/(x + 5)²)
  pièges : g2_log_sum

Développe ln((√x·x⁴)/(x + 1)²) (x > 0) : écris-le avec ln x et des ln(x + c) seulement.
  [free, suivre l'erreur]  ln((√x·x⁴)/(x + 1)²)
    = ln(√x) + ln(x⁴) − ln((x + 1)²)   ← Produit et quotient
    = (9/2)ln(x) − 2ln(x + 1)   ← Puissances, puis réduire
  aides : ln d'un produit = somme des ln ; ln d'un quotient = différence. Puis l'exposant sort devant. | ln(√x) + ln(x⁴) − ln((x + 1)²), puis ln(√u) = (1/2)·ln u | ln(√x) + ln(x⁴) − ln((x + 1)²)
  pièges : g2_log_quotient

Écris 3ln(x) − 2ln(x + 4) + 2 (x > 0) avec un seul logarithme.
  [free, suivre l'erreur]  3ln(x) − 2ln(x + 4) + 2
    = ln(x³) − ln((x + 4)²) + ln(e²)   ← p·ln u = ln(uᵖ), k = ln(eᵏ)
    = ln(e²·x³/(x + 4)²)   ← Un seul logarithme
  aides : Fais d'abord entrer chaque coefficient dans son ln (p·ln u = ln(uᵖ)), et écris le nombre comme un ln : k = ln(eᵏ). | ln(x³) − ln((x + 4)²) + ln(e²) | ln(e²·x³/(x + 4)²)
  pièges : g2_log_sum

```

### Niveau 5

```
Calcule log₅(7)·log₇(625) sans calculatrice.
  [free, sans aide]  log₅(7)·log₇(625)
    = ln(7)/ln(5)·ln(625)/ln(7)   ← log_a y = ln y / ln a
    = ln(625)/ln(5)   ← Simplifier par ln 7
    = 4ln(5)/ln(5)   ← 625 = 5^4
    = 4   ← Simplifier

Calcule log₅(7)·log₇(125) sans calculatrice.
  [free, sans aide]  log₅(7)·log₇(125)
    = ln(7)/ln(5)·ln(125)/ln(7)   ← log_a y = ln y / ln a
    = ln(125)/ln(5)   ← Simplifier par ln 7
    = 3ln(5)/ln(5)   ← 125 = 5^3
    = 3   ← Simplifier

Calcule log₃(6)·log₆(81) sans calculatrice.
  [free, sans aide]  log₃(6)·log₆(81)
    = ln(6)/ln(3)·ln(81)/ln(6)   ← log_a y = ln y / ln a
    = ln(81)/ln(3)   ← Simplifier par ln 6
    = 4ln(3)/ln(3)   ← 81 = 3^4
    = 4   ← Simplifier

```

### Variantes d'examen

```
Pour x > 0, ln(x³/(x + 5)) =
  · 3ln(x) − ln(x) − ln(5) [g2_log_sum]   · ln(x)³ − ln(x + 5) [g2_log_power]   ✔ 3ln(x) − ln(x + 5)   · 3ln(x)/ln(x + 5) [g2_log_quotient]
  [examen mcq]
  pièges : g2_log_power, g2_log_quotient, g2_log_sum

Vrai ou faux ?
  « Pour tous a, b > 0 : ln(a + b) = ln a · ln b. » → FAUX
    contre-exemple (refute) : a = 1, b = 1
  [examen tf]
  pièges : g2_log_sum

```

## Équations exponentielles (`g2-exp-eq`, Gymnase)

_Même base, ln des deux membres, ou t = eˣ._

### Niveau 1

```
Résous 2^(3x + 1) = 4^(2x + 2).
  [guided]  2^(3x + 1) = 4^(2x + 2)
    = 2^(3x + 1) = 2^(□)   (trous : 2^(3x + 1) = 2^(2(2x + 2)))   ← 4 = 2^2
    = 3x + 1 = 2(2x + 2)   ← Comparer les exposants
    = x = −3   ← Résoudre
  aides : Écris 4 comme une puissance de 2, puis compare les exposants. | 4 = 2^…, donc 4^(2x + 2) = 2^(2(2x+2)) | 3x + 1 = 2(2x + 2)

Résous 3^(x − 2) = 9^(x − 2).
  [guided]  3^(x − 2) = 9^(x − 2)
    = 3^(x − 2) = 3^(□)   (trous : 3^(x − 2) = 3^(2(x − 2)))   ← 9 = 3^2
    = x − 2 = 2(x − 2)   ← Comparer les exposants
    = x = 2   ← Résoudre
  aides : Écris 9 comme une puissance de 3, puis compare les exposants. | 9 = 3^…, donc 9^(x − 2) = 3^(2(x-2)) | x − 2 = 2(x − 2)

Résous 2^(3x + 4) = 4^(2x + 2).
  [guided]  2^(3x + 4) = 4^(2x + 2)
    = 2^(3x + 4) = 2^(□)   (trous : 2^(3x + 4) = 2^(2(2x + 2)))   ← 4 = 2^2
    = 3x + 4 = 2(2x + 2)   ← Comparer les exposants
    = x = 0   ← Résoudre
  aides : Écris 4 comme une puissance de 2, puis compare les exposants. | 4 = 2^…, donc 4^(2x + 2) = 2^(2(2x+2)) | 3x + 4 = 2(2x + 2)

```

### Niveau 2

```
Résous 3^(x − 5) = 27^(x − 3).
  [guided]  3^(x − 5) = 27^(x − 3)
    = 3^(x − 5) = 3^(3(x − 3))   ← 27 = 3^3
    = x − 5 = 3(x − 3)   ← Comparer les exposants
    = x = 2   ← Résoudre
  aides : Écris 27 comme une puissance de 3, puis compare les exposants. | 27 = 3^…, donc 27^(x − 3) = 3^(3(x-3)) | x − 5 = 3(x − 3)

Résous 7^(x − 3) = 2^x (valeur exacte).
  [guided]  7^(x − 3) = 2^x
    = (x − 3)□ = x□   (trous : (x − 3)ln(7) = xln(2))   ← ln des deux membres
    = x(ln(7) − ln(2)) = 3ln(7)   ← Regrouper les x
    = x = 3ln(7)/(ln(7) − ln(2))   ← Diviser
  aides : Les bases sont différentes : prends ln des deux membres, ln(aᵘ) = u·ln a. | (x − 3)·ln 7 = x·… | (x − 3)ln(7) = xln(2)

Résous 2^(3x + 5) = 4^(x + 1).
  [guided]  2^(3x + 5) = 4^(x + 1)
    = 2^(3x + 5) = 2^(2(x + 1))   ← 4 = 2^2
    = 3x + 5 = 2(x + 1)   ← Comparer les exposants
    = x = −3   ← Résoudre
  aides : Écris 4 comme une puissance de 2, puis compare les exposants. | 4 = 2^…, donc 4^(x + 1) = 2^(2(x+1)) | 3x + 5 = 2(x + 1)

```

### Niveau 3

```
Résous e^(2x) − 5e^x + 4 = 0.
  [tap, suivre l'erreur, menu steps]  e^(2x) − 5e^x + 4 = 0
    ? Que fais-tu ? ✔ Poser t = eˣ : e²ˣ = t² / · Prendre ln de chaque terme / · Comparer les exposants
    = t² − 5t + 4 = 0   ← Posons t = eˣ > 0
    = t = 4 ou t = 1   ← Résoudre le trinôme
    = e^x = 4 ou e^x = 1   ← Revenir à x
    = x = 0 ou x = ln(4)   ← Résoudre
  aides : e²ˣ = (eˣ)² : pose t = eˣ, qui est toujours > 0. | t² − 5t + 4 = 0, donc t = … | t = 4 ou t = 1
  pièges : g2_log_sum

Résous 2e^(2x) + 5e^x − 3 = 0.
  [tap, suivre l'erreur, menu steps]  2e^(2x) + 5e^x − 3 = 0
    ? Que fais-tu ? ✔ Poser t = eˣ : e²ˣ = t² / · Prendre ln de chaque terme / · Comparer les exposants
    = 2t² + 5t − 3 = 0   ← Posons t = eˣ > 0
    = t = 1/2 ou t = −3   ← Résoudre le trinôme
    = e^x = 1/2   ← Garder t > 0, puis revenir à x
    = x = −ln(2)   ← Résoudre
  aides : e²ˣ = (eˣ)² : pose t = eˣ, qui est toujours > 0. | 2t² + 5t − 3 = 0, donc t = … | t = 1/2 ou t = −3
  pièges : g2_log_sum

Résous e^(2x) − 4e^x + 3 = 0.
  [tap, suivre l'erreur, menu steps]  e^(2x) − 4e^x + 3 = 0
    ? Que fais-tu ? ✔ Poser t = eˣ : e²ˣ = t² / · Prendre ln de chaque terme / · Comparer les exposants
    = t² − 4t + 3 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = 1   ← Résoudre le trinôme
    = e^x = 3 ou e^x = 1   ← Revenir à x
    = x = 0 ou x = ln(3)   ← Résoudre
  aides : e²ˣ = (eˣ)² : pose t = eˣ, qui est toujours > 0. | t² − 4t + 3 = 0, donc t = … | t = 3 ou t = 1
  pièges : g2_log_sum

```

### Niveau 4

```
Résous e^(2x) − 4e^x + 3 = 0. Tu peux poser t = eˣ.
  [free, suivre l'erreur]  e^(2x) − 4e^x + 3 = 0
    = t² − 4t + 3 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = 1   ← Résoudre le trinôme
    = e^x = 3 ou e^x = 1   ← Revenir à x
    = x = 0 ou x = ln(3)   ← Résoudre
  aides : e²ˣ = (eˣ)² : pose t = eˣ, qui est toujours > 0. | t² − 4t + 3 = 0, donc t = … | t = 3 ou t = 1

Résous 3^(x + 2) = 5^x (valeur exacte).
  [free, suivre l'erreur]  3^(x + 2) = 5^x
    = (x + 2)ln(3) = xln(5)   ← ln des deux membres
    = x(ln(5) − ln(3)) = 2ln(3)   ← Regrouper les x
    = x = 2ln(3)/(ln(5) − ln(3))   ← Diviser
  aides : Les bases sont différentes : prends ln des deux membres, ln(aᵘ) = u·ln a. | (x + 2)·ln 3 = x·… | (x + 2)ln(3) = xln(5)

Résous e^(2x) − e^x − 2 = 0. Tu peux poser t = eˣ.
  [free, suivre l'erreur]  e^(2x) − e^x − 2 = 0
    = t² − t − 2 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = −1   ← Résoudre le trinôme
    = e^x = 2   ← Garder t > 0, puis revenir à x
    = x = ln(2)   ← Résoudre
  aides : e²ˣ = (eˣ)² : pose t = eˣ, qui est toujours > 0. | t² − t − 2 = 0, donc t = … | t = 2 ou t = −1

```

### Niveau 5

```
Résous 4^x − 3·2^(x + 1) + 8 = 0.
  [free, sans aide]  4^x − 3·2^(x + 1) + 8 = 0
    = t² − 6t + 8 = 0   ← Posons t = 2ˣ, 4ˣ = t², 2^(x+1) = 2t
    = t = 4 ou t = 2   ← Résoudre
    = 2^x = 4 ou 2^x = 2   ← Revenir à x
    = x = 1 ou x = 2   ← Puissances de 2

Résous 2·4^x − 17·2^x + 8 = 0.
  [free, sans aide]  2·4^x − 17·2^x + 8 = 0
    = 2t² − 17t + 8 = 0   ← Posons t = 2ˣ, 4ˣ = t², 2^(x+1) = 2t
    = t = 8 ou t = 1/2   ← Résoudre
    = 2^x = 8 ou 2^x = 1/2   ← Revenir à x
    = x = −1 ou x = 3   ← Puissances de 2

Résous 4^x − 5·2^x + 4 = 0.
  [free, sans aide]  4^x − 5·2^x + 4 = 0
    = t² − 5t + 4 = 0   ← Posons t = 2ˣ, 4ˣ = t², 2^(x+1) = 2t
    = t = 4 ou t = 1   ← Résoudre
    = 2^x = 4 ou 2^x = 1   ← Revenir à x
    = x = 0 ou x = 2   ← Puissances de 2

```

### Variantes d'examen

```
Ensemble des solutions de e^(2x) − 3e^x − 4 = 0 :
  · {−1 ; 4}   · {e⁴}   ✔ {ln(4)}   · {ln(4) ; ln(−1)} [g2_exp_neg_t]
  [examen mcq]
  pièges : g2_exp_neg_t

Résous 4^x − 3·2^(x + 1) + 8 = 0.
  [free, sans aide, examen open]  4^x − 3·2^(x + 1) + 8 = 0
    = t² − 6t + 8 = 0   ← Posons t = 2ˣ, 4ˣ = t², 2^(x+1) = 2t
    = t = 4 ou t = 2   ← Résoudre
    = 2^x = 4 ou 2^x = 2   ← Revenir à x
    = x = 1 ou x = 2   ← Puissances de 2

```

## Équations logarithmiques (`g2-log-eq`, Gymnase)

_Le domaine d'abord, puis un seul logarithme de chaque côté._

### Niveau 1

```
Résous log₃(x + 5) + log₃(x − 3) = 2.
  [guided]  log₃(x + 5) + log₃(x − 3) = 2
    (Domaine : D = ]3 ; +∞[.)
    = log₃((x + 5)(x − 3)) = 2   ← Regrouper
    = (x + 5)(x − 3) = □   (trous : (x + 5)(x − 3) = 9)   ← Passer à l'exponentielle : 3^2 = 9
    = x = 4 ou x = −6   ← Résoudre
    = {4}   ← Trier selon D : −6 n'est pas dans D
  aides : Commence par le domaine : x + 5 > 0 et x − 3 > 0. | log_3(…) = 2 ⇔ (…) = 3^2 | (x + 5)(x − 3) = 9
  pièges : g2_log_domain

Résous log₁₀(x + 3) + log₁₀(x) = 1.
  [guided]  log₁₀(x + 3) + log₁₀(x) = 1
    (Domaine : D = ]0 ; +∞[.)
    = log₁₀((x + 3)x) = 1   ← Regrouper
    = (x + 3)x = □   (trous : (x + 3)x = 10)   ← Passer à l'exponentielle : 10^1 = 10
    = x = 2 ou x = −5   ← Résoudre
    = {2}   ← Trier selon D : −5 n'est pas dans D
  aides : Commence par le domaine : x + 3 > 0 et x > 0. | log_10(…) = 1 ⇔ (…) = 10^1 | (x + 3)x = 10
  pièges : g2_log_domain

Résous log₂(x − 3) + log₂(x − 4) = 1.
  [guided]  log₂(x − 3) + log₂(x − 4) = 1
    (Domaine : D = ]4 ; +∞[.)
    = log₂((x − 3)(x − 4)) = 1   ← Regrouper
    = (x − 3)(x − 4) = □   (trous : (x − 3)(x − 4) = 2)   ← Passer à l'exponentielle : 2^1 = 2
    = x = 5 ou x = 2   ← Résoudre
    = {5}   ← Trier selon D : 2 n'est pas dans D
  aides : Commence par le domaine : x − 3 > 0 et x − 4 > 0. | log_2(…) = 1 ⇔ (…) = 2^1 | (x − 3)(x − 4) = 2
  pièges : g2_log_domain

```

### Niveau 2

```
Résous log₃(x + 8) + log₃(x) = 2.
  [guided]  log₃(x + 8) + log₃(x) = 2
    = D = ]□ ; +∞[   (trous : D = ]0 ; +∞[)   ← Domaine : x+8 > 0 et x > 0
    = log₃((x + 8)x) = 2   ← Regrouper
    = (x + 8)x = 9   ← Passer à l'exponentielle : 3^2 = 9
    = x = 1 ou x = −9   ← Résoudre
    = {1}   ← Trier selon D : −9 n'est pas dans D
  aides : Commence par le domaine : x + 8 > 0 et x > 0. | log_3(…) = 2 ⇔ (…) = 3^2 | (x + 8)x = 9
  pièges : g2_log_domain

Résous log₃(x + 1) + log₃(x − 1) = 1.
  [guided]  log₃(x + 1) + log₃(x − 1) = 1
    = D = ]□ ; +∞[   (trous : D = ]1 ; +∞[)   ← Domaine : x+1 > 0 et x−1 > 0
    = log₃((x + 1)(x − 1)) = 1   ← Regrouper
    = (x + 1)(x − 1) = 3   ← Passer à l'exponentielle : 3^1 = 3
    = x = 2 ou x = −2   ← Résoudre
    = {2}   ← Trier selon D : −2 n'est pas dans D
  aides : Commence par le domaine : x + 1 > 0 et x − 1 > 0. | log_3(…) = 1 ⇔ (…) = 3^1 | (x + 1)(x − 1) = 3
  pièges : g2_log_domain

Résous log₂(x + 4) + log₂(x + 3) = 1.
  [guided]  log₂(x + 4) + log₂(x + 3) = 1
    = D = ]□ ; +∞[   (trous : D = ]−3 ; +∞[)   ← Domaine : x+4 > 0 et x+3 > 0
    = log₂((x + 4)(x + 3)) = 1   ← Regrouper
    = (x + 4)(x + 3) = 2   ← Passer à l'exponentielle : 2^1 = 2
    = x = −2 ou x = −5   ← Résoudre
    = {−2}   ← Trier selon D : −5 n'est pas dans D
  aides : Commence par le domaine : x + 4 > 0 et x + 3 > 0. | log_2(…) = 1 ⇔ (…) = 2^1 | (x + 4)(x + 3) = 2
  pièges : g2_log_domain

```

### Niveau 3

```
Résous log₂(x − 2) + log₂(x − 3) = 1.
  [tap, suivre l'erreur, menu steps]  log₂(x − 2) + log₂(x − 3) = 1
    = D = ]3 ; +∞[   ← Domaine : x−2 > 0 et x−3 > 0
    = log₂((x − 2)(x − 3)) = 1   ← Regrouper
    = (x − 2)(x − 3) = 2   ← Passer à l'exponentielle : 2^1 = 2
    = x = 4 ou x = 1   ← Résoudre
    = {4}   ← Trier selon D : 1 n'est pas dans D
  aides : Commence par le domaine : x − 2 > 0 et x − 3 > 0. | log_2(…) = 1 ⇔ (…) = 2^1 | (x − 2)(x − 3) = 2
  pièges : g2_log_domain

Résous log₃(x + 9) + log₃(x + 3) = 3.
  [tap, suivre l'erreur, menu steps]  log₃(x + 9) + log₃(x + 3) = 3
    = D = ]−3 ; +∞[   ← Domaine : x+9 > 0 et x+3 > 0
    = log₃((x + 9)(x + 3)) = 3   ← Regrouper
    = (x + 9)(x + 3) = 27   ← Passer à l'exponentielle : 3^3 = 27
    = x = 0 ou x = −12   ← Résoudre
    = {0}   ← Trier selon D : −12 n'est pas dans D
  aides : Commence par le domaine : x + 9 > 0 et x + 3 > 0. | log_3(…) = 3 ⇔ (…) = 3^3 | (x + 9)(x + 3) = 27
  pièges : g2_log_domain

Résous log₂(x − 1) + log₂(x − 2) = 1.
  [tap, suivre l'erreur, menu steps]  log₂(x − 1) + log₂(x − 2) = 1
    = D = ]2 ; +∞[   ← Domaine : x−1 > 0 et x−2 > 0
    = log₂((x − 1)(x − 2)) = 1   ← Regrouper
    = (x − 1)(x − 2) = 2   ← Passer à l'exponentielle : 2^1 = 2
    = x = 3 ou x = 0   ← Résoudre
    = {3}   ← Trier selon D : 0 n'est pas dans D
  aides : Commence par le domaine : x − 1 > 0 et x − 2 > 0. | log_2(…) = 1 ⇔ (…) = 2^1 | (x − 1)(x − 2) = 2
  pièges : g2_log_domain

```

### Niveau 4

```
Résous ln(x²) = 2ln(x + 4).
  [free, suivre l'erreur]  ln(x²) = 2ln(x + 4)
    = D = ]−4 ; 0[ ∪ ]0 ; +∞[   ← Domaine : x ≠ 0 et x > −c
    = ln(x²) = ln((x + 4)²)   ← 2 ln u = ln(u²)
    = x² = (x + 4)²   ← ln est injective
    = 8x + 16 = 0   ← Développer
    = x = −2   ← Résoudre ; −2 est dans D
  aides : Attention : ln(x²) existe aussi pour x < 0. Ne remplace pas ln(x²) par 2 ln x. | 2 ln(x + 4) = ln((x + 4)²) | x² = (x + 4)²
  pièges : g2_log_domain, g2_log_square_abs

Résous log₁₀(x + 4) + log₁₀(x + 1) = 1.
  [free, suivre l'erreur]  log₁₀(x + 4) + log₁₀(x + 1) = 1
    = D = ]−1 ; +∞[   ← Domaine : x+4 > 0 et x+1 > 0
    = log₁₀((x + 4)(x + 1)) = 1   ← Regrouper
    = (x + 4)(x + 1) = 10   ← Passer à l'exponentielle : 10^1 = 10
    = x = 1 ou x = −6   ← Résoudre
    = {1}   ← Trier selon D : −6 n'est pas dans D
  aides : Commence par le domaine : x + 4 > 0 et x + 1 > 0. | log_10(…) = 1 ⇔ (…) = 10^1 | (x + 4)(x + 1) = 10
  pièges : g2_log_domain

Résous ln(x²) = 2ln(x + 3).
  [free, suivre l'erreur]  ln(x²) = 2ln(x + 3)
    = D = ]−3 ; 0[ ∪ ]0 ; +∞[   ← Domaine : x ≠ 0 et x > −c
    = ln(x²) = ln((x + 3)²)   ← 2 ln u = ln(u²)
    = x² = (x + 3)²   ← ln est injective
    = 6x + 9 = 0   ← Développer
    = x = −3/2   ← Résoudre ; −3/2 est dans D
  aides : Attention : ln(x²) existe aussi pour x < 0. Ne remplace pas ln(x²) par 2 ln x. | 2 ln(x + 3) = ln((x + 3)²) | x² = (x + 3)²
  pièges : g2_log_domain, g2_log_square_abs

```

### Niveau 5

```
Résous log₂(x) = log₄(x + 2).
  [free, sans aide]  log₂(x) = log₄(x + 2)
    = D = ]0 ; +∞[   ← Domaine : x > 0 et x+2 > 0
    = log₂(x) = (1/2)log₂(x + 2)   ← log₄ u = log₂ u / log₂ 4 = (1/2) log₂ u
    = 2log₂(x) = log₂(x + 2)   ← Multiplier par 2
    = x² = x + 2   ← 2 log₂ u = log₂(u²), puis exponentielle
    = x = −1 ou x = 2   ← Résoudre
    = {2}   ← Trier selon D
  pièges : g2_log_domain

Résous log₂(x + 2) = log₄(x + 4).
  [free, sans aide]  log₂(x + 2) = log₄(x + 4)
    = D = ]−2 ; +∞[   ← Domaine : x+2 > 0 et x+4 > 0
    = log₂(x + 2) = (1/2)log₂(x + 4)   ← log₄ u = log₂ u / log₂ 4 = (1/2) log₂ u
    = 2log₂(x + 2) = log₂(x + 4)   ← Multiplier par 2
    = (x + 2)² = x + 4   ← 2 log₂ u = log₂(u²), puis exponentielle
    = x = −3 ou x = 0   ← Résoudre
    = {0}   ← Trier selon D
  pièges : g2_log_domain

Résous log₂(x) = log₄(x + 12).
  [free, sans aide]  log₂(x) = log₄(x + 12)
    = D = ]0 ; +∞[   ← Domaine : x > 0 et x+12 > 0
    = log₂(x) = (1/2)log₂(x + 12)   ← log₄ u = log₂ u / log₂ 4 = (1/2) log₂ u
    = 2log₂(x) = log₂(x + 12)   ← Multiplier par 2
    = x² = x + 12   ← 2 log₂ u = log₂(u²), puis exponentielle
    = x = −3 ou x = 4   ← Résoudre
    = {4}   ← Trier selon D
  pièges : g2_log_domain

```

### Variantes d'examen

```
Ensemble des solutions de log₂(x + 9) + log₂(x + 3) = 4 :
  ✔ {−1}   · {−11 ; −1} [g2_log_domain]   · {−11}   · {2} [g2_log_sum]
  [examen mcq]
  pièges : g2_log_domain, g2_log_sum

Vrai ou faux ?
  « Pour tout x ≠ 0 : ln(x²) = 2 ln x. » → FAUX
    contre-exemple (refute) : x = -1
  [examen tf]
  pièges : g2_log_square_abs

```

## Inéquations exponentielles et logarithmiques, base < 1 (`g2-ineq`, CMS)

_Base < 1 : la fonction décroît, l'inégalité se retourne._

### Niveau 1

```
Résous log₃(x) < log₃(3x − 4).
  [guided]  log₃(x) < log₃(3x − 4)
    (Domaine : D = ]4/3 ; +∞[.)
    = □ < 3x − 4   (trous : x < 3x − 4)   ← Base > 1 : même sens
    = x > 2   ← Résoudre
    = ]2 ; +∞[   ← Intersecter avec D
  aides : log est croissante si la base est > 1 : on garde le sens. | x < … | x < 3x − 4
  pièges : g9_bracket, g2_log_domain

Résous log₁₀(2x + 3) ≥ log₁₀(3x).
  [guided]  log₁₀(2x + 3) ≥ log₁₀(3x)
    (Domaine : D = ]0 ; +∞[.)
    = □ ≥ 3x   (trous : 2x + 3 ≥ 3x)   ← Base > 1 : même sens
    = x ≤ 3   ← Résoudre
    = ]0 ; 3]   ← Intersecter avec D
  aides : log est croissante si la base est > 1 : on garde le sens. | 2x + 3 ≥ … | 2x + 3 ≥ 3x
  pièges : g9_bracket, g2_log_domain

Résous log₂(x + 2) ≥ log₂(2x − 3).
  [guided]  log₂(x + 2) ≥ log₂(2x − 3)
    (Domaine : D = ]3/2 ; +∞[.)
    = □ ≥ 2x − 3   (trous : x + 2 ≥ 2x − 3)   ← Base > 1 : même sens
    = x ≤ 5   ← Résoudre
    = ]3/2 ; 5]   ← Intersecter avec D
  aides : log est croissante si la base est > 1 : on garde le sens. | x + 2 ≥ … | x + 2 ≥ 2x − 3
  pièges : g9_bracket, g2_log_domain

```

### Niveau 2

```
Résous log_(1/10)(2x) > log_(1/10)(x + 3).
  [guided]  log_(1/10)(2x) > log_(1/10)(x + 3)
    = D = ]0 ; +∞[   ← Domaine : 2x > 0 et x+3 > 0
    ? Quand on enlève les logarithmes, faut-il retourner l'inégalité ? ✔ Oui : la base 1/10 est < 1 / · Non : on garde le même sens
    = □ < x + 3   (trous : 2x < x + 3)   ← Base 1/10 < 1 : on retourne
    = x < 3   ← Résoudre
    = ]0 ; 3[   ← Intersecter avec D
  aides : La fonction log de base 1/10 est décroissante : le plus grand logarithme a le plus petit argument. | 2x < … | 2x < x + 3
  pièges : g9_bracket, g2_log_domain, g2_base_lt1

Résous log_(1/10)(x + 1) ≤ log_(1/10)(2x).
  [guided]  log_(1/10)(x + 1) ≤ log_(1/10)(2x)
    = D = ]0 ; +∞[   ← Domaine : x+1 > 0 et 2x > 0
    ? Quand on enlève les logarithmes, faut-il retourner l'inégalité ? ✔ Oui : la base 1/10 est < 1 / · Non : on garde le même sens
    = □ ≥ 2x   (trous : x + 1 ≥ 2x)   ← Base 1/10 < 1 : on retourne
    = x ≤ 1   ← Résoudre
    = ]0 ; 1]   ← Intersecter avec D
  aides : La fonction log de base 1/10 est décroissante : le plus grand logarithme a le plus petit argument. | x + 1 ≥ … | x + 1 ≥ 2x
  pièges : g9_bracket, g2_log_domain, g2_base_lt1

Résous log_(1/2)(2x) ≤ log_(1/2)(3x − 5).
  [guided]  log_(1/2)(2x) ≤ log_(1/2)(3x − 5)
    = D = ]5/3 ; +∞[   ← Domaine : 2x > 0 et 3x−5 > 0
    ? Quand on enlève les logarithmes, faut-il retourner l'inégalité ? ✔ Oui : la base 1/2 est < 1 / · Non : on garde le même sens
    = □ ≥ 3x − 5   (trous : 2x ≥ 3x − 5)   ← Base 1/2 < 1 : on retourne
    = x ≤ 5   ← Résoudre
    = ]5/3 ; 5]   ← Intersecter avec D
  aides : La fonction log de base 1/2 est décroissante : le plus grand logarithme a le plus petit argument. | 2x ≥ … | 2x ≥ 3x − 5
  pièges : g9_bracket, g2_log_domain, g2_base_lt1

```

### Niveau 3

```
Résous log_(1/2)(x − 1) ≤ −2 + log₂(x + 2).
  [tap, suivre l'erreur, menu steps]  log_(1/2)(x − 1) ≤ −2 + log₂(x + 2)
    = D = ]1 ; +∞[   ← Domaine : x−1 > 0 et x+2 > 0
    = −log₂(x − 1) ≤ −2 + log₂(x + 2)   ← log_{1/2} u = −log_2 u
    = 2 ≤ log₂((x − 1)(x + 2))   ← Regrouper
    = (x − 1)(x + 2) ≥ 4   ← Base 2 > 1 : exponentielle, même sens
    = x² + x − 6 ≥ 0   ← Développer
    = x ≤ −3 ou x ≥ 2   ← Signe du trinôme
    = [2 ; +∞[   ← Intersecter avec D
  aides : Domaine d'abord. Puis log_{1/2} u = −log_2 u : tout en base 2. | 2 ≤ log_2(…), donc (x − 1)(x + 2) ≥ 2^2 | 2 ≤ log₂((x − 1)(x + 2))
  pièges : g9_bracket, g2_log_domain

Résous log_(1/10)(3x + 1) ≤ log_(1/10)(2x + 4).
  [tap, suivre l'erreur, menu steps]  log_(1/10)(3x + 1) ≤ log_(1/10)(2x + 4)
    = D = ]−1/3 ; +∞[   ← Domaine : 3x+1 > 0 et 2x+4 > 0
    = 3x + 1 ≥ 2x + 4   ← Base 1/10 < 1 : on retourne
    = x ≥ 3   ← Résoudre
    = [3 ; +∞[   ← Intersecter avec D
  aides : La fonction log de base 1/10 est décroissante : le plus grand logarithme a le plus petit argument. | 3x + 1 ≥ … | 3x + 1 ≥ 2x + 4
  pièges : g9_bracket, g2_log_domain, g2_base_lt1

Résous log₁₀(3x − 5) < log₁₀(x + 5).
  [tap, suivre l'erreur, menu steps]  log₁₀(3x − 5) < log₁₀(x + 5)
    = D = ]5/3 ; +∞[   ← Domaine : 3x−5 > 0 et x+5 > 0
    = 3x − 5 < x + 5   ← Base > 1 : même sens
    = x < 5   ← Résoudre
    = ]5/3 ; 5[   ← Intersecter avec D
  aides : log est croissante si la base est > 1 : on garde le sens. | 3x − 5 < … | 3x − 5 < x + 5
  pièges : g9_bracket, g2_log_domain

```

### Niveau 4

```
Résous 2^(3x + 3) > 2^(2x + 2).
  [free, suivre l'erreur]  2^(3x + 3) > 2^(2x + 2)
    = 3x + 3 > 2x + 2   ← Base > 1 : même sens
    = x > −1   ← Résoudre
    = ]−1 ; +∞[   ← Écrire l'ensemble
  aides : x ↦ 2ˣ est croissante : même sens entre les exposants. | 3x + 3 > 2x + 2 | 3x + 3 > 2x + 2
  pièges : g9_bracket

Résous log_(1/2)(x + 3) ≥ −3 + log₂(x + 5).
  [free, suivre l'erreur]  log_(1/2)(x + 3) ≥ −3 + log₂(x + 5)
    = D = ]−3 ; +∞[   ← Domaine : x+3 > 0 et x+5 > 0
    = −log₂(x + 3) ≥ −3 + log₂(x + 5)   ← log_{1/2} u = −log_2 u
    = 3 ≥ log₂((x + 3)(x + 5))   ← Regrouper
    = (x + 3)(x + 5) ≤ 8   ← Base 2 > 1 : exponentielle, même sens
    = x² + 8x + 7 ≤ 0   ← Développer
    = −7 ≤ x ≤ −1   ← Signe du trinôme
    = ]−3 ; −1]   ← Intersecter avec D
  aides : Domaine d'abord. Puis log_{1/2} u = −log_2 u : tout en base 2. | 3 ≥ log_2(…), donc (x + 3)(x + 5) ≤ 2^3 | 3 ≥ log₂((x + 3)(x + 5))
  pièges : g9_bracket, g2_log_domain

Résous log₁₀(2x + 3) ≤ log₁₀(3x − 5).
  [free, suivre l'erreur]  log₁₀(2x + 3) ≤ log₁₀(3x − 5)
    = D = ]5/3 ; +∞[   ← Domaine : 2x+3 > 0 et 3x−5 > 0
    = 2x + 3 ≤ 3x − 5   ← Base > 1 : même sens
    = x ≥ 8   ← Résoudre
    = [8 ; +∞[   ← Intersecter avec D
  aides : log est croissante si la base est > 1 : on garde le sens. | 2x + 3 ≤ … | 2x + 3 ≤ 3x − 5
  pièges : g9_bracket, g2_log_domain

```

### Niveau 5

```
Résous log_(1/3)(x + 1) ≥ −3 + log₃(x + 7).
  [free, sans aide]  log_(1/3)(x + 1) ≥ −3 + log₃(x + 7)
    = D = ]−1 ; +∞[   ← Domaine : x+1 > 0 et x+7 > 0
    = −log₃(x + 1) ≥ −3 + log₃(x + 7)   ← log_{1/3} u = −log_3 u
    = 3 ≥ log₃((x + 1)(x + 7))   ← Regrouper
    = (x + 1)(x + 7) ≤ 27   ← Base 3 > 1 : exponentielle, même sens
    = x² + 8x − 20 ≤ 0   ← Développer
    = −10 ≤ x ≤ 2   ← Signe du trinôme
    = ]−1 ; 2]   ← Intersecter avec D
  pièges : g9_bracket, g2_log_domain

Résous log_(1/2)(x + 2) ≥ −4 + log₂(x + 8).
  [free, sans aide]  log_(1/2)(x + 2) ≥ −4 + log₂(x + 8)
    = D = ]−2 ; +∞[   ← Domaine : x+2 > 0 et x+8 > 0
    = −log₂(x + 2) ≥ −4 + log₂(x + 8)   ← log_{1/2} u = −log_2 u
    = 4 ≥ log₂((x + 2)(x + 8))   ← Regrouper
    = (x + 2)(x + 8) ≤ 16   ← Base 2 > 1 : exponentielle, même sens
    = x² + 10x ≤ 0   ← Développer
    = −10 ≤ x ≤ 0   ← Signe du trinôme
    = ]−2 ; 0]   ← Intersecter avec D
  pièges : g9_bracket, g2_log_domain

Résous log_(1/2)(x − 3) ≥ −4 + log₂(x + 3).
  [free, sans aide]  log_(1/2)(x − 3) ≥ −4 + log₂(x + 3)
    = D = ]3 ; +∞[   ← Domaine : x−3 > 0 et x+3 > 0
    = −log₂(x − 3) ≥ −4 + log₂(x + 3)   ← log_{1/2} u = −log_2 u
    = 4 ≥ log₂((x − 3)(x + 3))   ← Regrouper
    = (x − 3)(x + 3) ≤ 16   ← Base 2 > 1 : exponentielle, même sens
    = x² − 25 ≤ 0   ← Développer
    = −5 ≤ x ≤ 5   ← Signe du trinôme
    = ]3 ; 5]   ← Intersecter avec D
  pièges : g9_bracket, g2_log_domain

```

### Variantes d'examen

```
Résous log_(1/2)(x − 2) ≥ −2 + log₂(x + 1).
  [free, sans aide, examen open]  log_(1/2)(x − 2) ≥ −2 + log₂(x + 1)
    = D = ]2 ; +∞[   ← Domaine : x−2 > 0 et x+1 > 0
    = −log₂(x − 2) ≥ −2 + log₂(x + 1)   ← log_{1/2} u = −log_2 u
    = 2 ≥ log₂((x − 2)(x + 1))   ← Regrouper
    = (x − 2)(x + 1) ≤ 4   ← Base 2 > 1 : exponentielle, même sens
    = x² − x − 6 ≤ 0   ← Développer
    = −2 ≤ x ≤ 3   ← Signe du trinôme
    = ]2 ; 3]   ← Intersecter avec D
  pièges : g9_bracket, g2_log_domain

Ensemble des solutions de log_(1/3)(2x + 3) < log_(1/3)(3x − 5) :
  · ]8 ; +∞[ [g2_base_lt1]   · ]5/3 ; +∞[   · ]−∞ ; 8[ [g2_log_domain]   ✔ ]5/3 ; 8[
  [examen mcq]
  pièges : g2_base_lt1, g2_log_domain

```

## Équations du type xˣ (`g2-xx`, CMS)

_x^f = x^g ⇔ f = g ou x = 1._

### Niveau 1

```
Résous (x²)^x = x^(x²) pour x > 0.
  [guided]  (x²)^x = x^(x²)
    (Avec e : e^(2xln(x)) = e^(x²ln(x)))
    = 2xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(□) = 0   (trous : xln(x)(2 − x) = 0)   ← Factoriser
    = {1 ; 2}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 2xln(x) − (x²ln(x)) = ln x·(…) | 2xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous (x³)^x = x^(x²) pour x > 0.
  [guided]  (x³)^x = x^(x²)
    (Avec e : e^(3xln(x)) = e^(x²ln(x)))
    = 3xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(□) = 0   (trous : xln(x)(3 − x) = 0)   ← Factoriser
    = {1 ; 3}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 3xln(x) − (x²ln(x)) = ln x·(…) | 3xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous (x²)^x = x^(x²) pour x > 0.
  [guided]  (x²)^x = x^(x²)
    (Avec e : e^(2xln(x)) = e^(x²ln(x)))
    = 2xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(□) = 0   (trous : xln(x)(2 − x) = 0)   ← Factoriser
    = {1 ; 2}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 2xln(x) − (x²ln(x)) = ln x·(…) | 2xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

```

### Niveau 2

```
Résous (x⁴)^x = x^(x²) pour x > 0.
  [guided]  (x⁴)^x = x^(x²)
    = e^(□) = e^(x²ln(x))   (trous : e^(4xln(x)) = e^(x²ln(x)))   ← Écrire avec e
    = 4xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(4 − x) = 0   ← Factoriser
    = {1 ; 4}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 4xln(x) − (x²ln(x)) = ln x·(…) | 4xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous (x³)^x = x^(x²) pour x > 0.
  [guided]  (x³)^x = x^(x²)
    = e^(□) = e^(x²ln(x))   (trous : e^(3xln(x)) = e^(x²ln(x)))   ← Écrire avec e
    = 3xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(3 − x) = 0   ← Factoriser
    = {1 ; 3}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 3xln(x) − (x²ln(x)) = ln x·(…) | 3xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous (x²)^x = x^(x²) pour x > 0.
  [guided]  (x²)^x = x^(x²)
    = e^(□) = e^(x²ln(x))   (trous : e^(2xln(x)) = e^(x²ln(x)))   ← Écrire avec e
    = 2xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(2 − x) = 0   ← Factoriser
    = {1 ; 2}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 2xln(x) − (x²ln(x)) = ln x·(…) | 2xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

```

### Niveau 3

```
Résous (x⁴)^x = x^(x²) pour x > 0.
  [tap, suivre l'erreur, menu steps]  (x⁴)^x = x^(x²)
    = e^(4xln(x)) = e^(x²ln(x))   ← Écrire avec e
    = 4xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(4 − x) = 0   ← Factoriser
    = {1 ; 4}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 4xln(x) − (x²ln(x)) = ln x·(…) | 4xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous (x²)^x = x^(x²) pour x > 0.
  [tap, suivre l'erreur, menu steps]  (x²)^x = x^(x²)
    = e^(2xln(x)) = e^(x²ln(x))   ← Écrire avec e
    = 2xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(2 − x) = 0   ← Factoriser
    = {1 ; 2}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 2xln(x) − (x²ln(x)) = ln x·(…) | 2xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous x^(x² + 10) = x^(7x) pour x > 0.
  [tap, suivre l'erreur, menu steps]  x^(x² + 10) = x^(7x)
    = e^((x² + 10)ln(x)) = e^(7xln(x))   ← Écrire avec e
    = (x² + 10)ln(x) = 7xln(x)   ← Comparer les exposants
    = (x² − 7x + 10)ln(x) = 0   ← Tout d'un côté, factoriser par ln x
    = (x − 2)(x − 5)ln(x) = 0   ← Factoriser
    = {1 ; 2 ; 5}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | (x² + 10)ln(x) − (7xln(x)) = ln x·(…) | (x² + 10)ln(x) = 7xln(x)
  pièges : g2_xx_lost_one

```

### Niveau 4

```
Résous (x³)^x = x^(x²) pour x > 0.
  [free, suivre l'erreur]  (x³)^x = x^(x²)
    = e^(3xln(x)) = e^(x²ln(x))   ← Écrire avec e
    = 3xln(x) = x²ln(x)   ← Comparer les exposants
    = xln(x)(3 − x) = 0   ← Factoriser
    = {1 ; 3}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | 3xln(x) − (x²ln(x)) = ln x·(…) | 3xln(x) = x²ln(x)
  pièges : g2_xx_lost_one

Résous x^(x² + 15) = x^(8x) pour x > 0.
  [free, suivre l'erreur]  x^(x² + 15) = x^(8x)
    = e^((x² + 15)ln(x)) = e^(8xln(x))   ← Écrire avec e
    = (x² + 15)ln(x) = 8xln(x)   ← Comparer les exposants
    = (x² − 8x + 15)ln(x) = 0   ← Tout d'un côté, factoriser par ln x
    = (x − 3)(x − 5)ln(x) = 0   ← Factoriser
    = {1 ; 3 ; 5}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | (x² + 15)ln(x) − (8xln(x)) = ln x·(…) | (x² + 15)ln(x) = 8xln(x)
  pièges : g2_xx_lost_one

Résous x^(x² + 12) = x^(7x) pour x > 0.
  [free, suivre l'erreur]  x^(x² + 12) = x^(7x)
    = e^((x² + 12)ln(x)) = e^(7xln(x))   ← Écrire avec e
    = (x² + 12)ln(x) = 7xln(x)   ← Comparer les exposants
    = (x² − 7x + 12)ln(x) = 0   ← Tout d'un côté, factoriser par ln x
    = (x − 3)(x − 4)ln(x) = 0   ← Factoriser
    = {1 ; 3 ; 4}   ← Produit nul (x = 0 exclu)
  aides : Pour x > 0 : xᵃ = e^(a ln x). Puis compare les exposants, sans diviser par ln x. | (x² + 12)ln(x) − (7xln(x)) = ln x·(…) | (x² + 12)ln(x) = 7xln(x)
  pièges : g2_xx_lost_one

```

### Niveau 5

```
Résous x^(x^(1/3)) = (x^(1/3))^x pour x > 0.
  [free, sans aide]  x^(x^(1/3)) = (x^(1/3))^x
    = e^(x^(1/3)ln(x)) = e^((x/3)ln(x))   ← Écrire avec e
    = x^(1/3)ln(x) = (x/3)ln(x)   ← Comparer les exposants
    = ln(x)(x^(1/3) − x/3) = 0   ← Factoriser
    = {1 ; 3√3}   ← ln x = 0, ou x^(2/3) = 3 : x = 3√3
  pièges : g2_xx_lost_one

Résous x^(√(x)) = (√(x))^x pour x > 0.
  [free, sans aide]  x^(√(x)) = (√(x))^x
    = e^(√(x)ln(x)) = e^((x/2)ln(x))   ← Écrire avec e
    = √(x)ln(x) = (x/2)ln(x)   ← Comparer les exposants
    = ln(x)(√(x) − x/2) = 0   ← Factoriser
    = {1 ; 4}   ← ln x = 0, ou √x = x/2 : x = 4
  pièges : g2_xx_lost_one

Résous x^(x^(1/3)) = (x^(1/3))^x pour x > 0.
  [free, sans aide]  x^(x^(1/3)) = (x^(1/3))^x
    = e^(x^(1/3)ln(x)) = e^((x/3)ln(x))   ← Écrire avec e
    = x^(1/3)ln(x) = (x/3)ln(x)   ← Comparer les exposants
    = ln(x)(x^(1/3) − x/3) = 0   ← Factoriser
    = {1 ; 3√3}   ← ln x = 0, ou x^(2/3) = 3 : x = 3√3
  pièges : g2_xx_lost_one

```

### Variantes d'examen

```
Résous x^(√(x)) = (√(x))^x pour x > 0.
  [free, sans aide, examen open]  x^(√(x)) = (√(x))^x
    = e^(√(x)ln(x)) = e^((x/2)ln(x))   ← Écrire avec e
    = √(x)ln(x) = (x/2)ln(x)   ← Comparer les exposants
    = ln(x)(√(x) − x/2) = 0   ← Factoriser
    = {1 ; 4}   ← ln x = 0, ou √x = x/2 : x = 4
  pièges : g2_xx_lost_one

Pour x > 0, ensemble des solutions de (x⁴)^x = x^(x²) :
  · {−4 ; 1 ; 4}   · {4} [g2_xx_lost_one]   ✔ {1 ; 4}   · {0 ; 1 ; 4}
  [examen mcq]
  pièges : g2_xx_lost_one

```

## sinh, cosh, tanh : définitions et graphes (`g2-hyp-def`, CMS)

_Définies avec eˣ et e⁻ˣ ; cosh² − sinh² = 1._

### Niveau 1

```
Calcule cosh(ln(3)).
  [guided]  cosh(ln(3))
    = (e^(ln(3)) + e^(−ln(3)))/2   ← Définition de cosh
    = (3 + □)/2   (trous : (3 + 1/3)/2)   ← e^(ln a) = a et e^(−ln a) = 1/a
    = 5/3   ← Calculer
  aides : cosh u = (eᵘ + e⁻ᵘ)/2, et e^(ln a) = a. | e^(ln 3) = 3 et e^(−ln 3) = … | (3 + 1/3)/2

Calcule cosh(ln(3)).
  [guided]  cosh(ln(3))
    = (e^(ln(3)) + e^(−ln(3)))/2   ← Définition de cosh
    = (3 + □)/2   (trous : (3 + 1/3)/2)   ← e^(ln a) = a et e^(−ln a) = 1/a
    = 5/3   ← Calculer
  aides : cosh u = (eᵘ + e⁻ᵘ)/2, et e^(ln a) = a. | e^(ln 3) = 3 et e^(−ln 3) = … | (3 + 1/3)/2

Calcule cosh(ln(5)).
  [guided]  cosh(ln(5))
    = (e^(ln(5)) + e^(−ln(5)))/2   ← Définition de cosh
    = (5 + □)/2   (trous : (5 + 1/5)/2)   ← e^(ln a) = a et e^(−ln a) = 1/a
    = 13/5   ← Calculer
  aides : cosh u = (eᵘ + e⁻ᵘ)/2, et e^(ln a) = a. | e^(ln 5) = 5 et e^(−ln 5) = … | (5 + 1/5)/2

```

### Niveau 2

```
Calcule tanh(ln(1/3)).
  [guided]  tanh(ln(1/3))
    = sinh(ln(1/3))/cosh(ln(1/3))   ← tanh = sinh / cosh
    = (□)/(5/3)   (trous : (−4/3)/(5/3))   ← Valeurs de sinh et cosh
    = −4/5   ← Simplifier
  aides : tanh = sinh / cosh : calcule sinh(ln a) et cosh(ln a). | sinh(ln 1/3) = (1/3 − 3)/2 = … | (−4/3)/(5/3)

Calcule tanh(ln(1/2)).
  [guided]  tanh(ln(1/2))
    = sinh(ln(1/2))/cosh(ln(1/2))   ← tanh = sinh / cosh
    = (□)/(5/4)   (trous : (−3/4)/(5/4))   ← Valeurs de sinh et cosh
    = −3/5   ← Simplifier
  aides : tanh = sinh / cosh : calcule sinh(ln a) et cosh(ln a). | sinh(ln 1/2) = (1/2 − 2)/2 = … | (−3/4)/(5/4)

Calcule tanh(ln(3)).
  [guided]  tanh(ln(3))
    = sinh(ln(3))/cosh(ln(3))   ← tanh = sinh / cosh
    = (□)/(5/3)   (trous : (4/3)/(5/3))   ← Valeurs de sinh et cosh
    = 4/5   ← Simplifier
  aides : tanh = sinh / cosh : calcule sinh(ln a) et cosh(ln a). | sinh(ln 3) = (3 − 1/3)/2 = … | (4/3)/(5/3)

```

### Niveau 3

```
Le graphe de cosh ressemble à…
  · une droite croissante   ✔ une chaînette : paire, minimum 1 en 0   · une exponentielle croissante   · une courbe impaire bornée par −1 et 1

Quelle est l'image de tanh ?
  ✔ ]−1 ; 1[   · ]0 ; 1[   · [1 ; +∞[   · ℝ

Le graphe de cosh ressemble à…
  · une exponentielle croissante   · une courbe impaire bornée par −1 et 1   · une droite croissante   ✔ une chaînette : paire, minimum 1 en 0

```

### Niveau 4

```
Montre que 1 − tanh(x)² = 1/cosh(x)² pour tout x, avec les exponentielles.
  [free, suivre l'erreur]  1 − tanh(x)²
    = (cosh(x)² − sinh(x)²)/cosh(x)²   ← tanh = sinh/cosh, même dénominateur
    = 1/cosh(x)²   ← cosh² − sinh² = 1
  aides : Remplace sinh et cosh par leurs formules en eˣ et e⁻ˣ, puis développe. | cosh x = (eˣ + e⁻ˣ)/2, sinh x = (eˣ − e⁻ˣ)/2 : (cosh(x)² − sinh(x)²)/cosh(x)² | (cosh(x)² − sinh(x)²)/cosh(x)²
  pièges : g2_hyp_trig_sign

Montre que cosh(x) + sinh(x) = e^x pour tout x, avec les exponentielles.
  [free, suivre l'erreur]  cosh(x) + sinh(x)
    = (e^x + e^(−x))/2 + (e^x − e^(−x))/2   ← Définitions
    = e^x   ← Réduire
  aides : Remplace sinh et cosh par leurs formules en eˣ et e⁻ˣ, puis développe. | cosh x = (eˣ + e⁻ˣ)/2, sinh x = (eˣ − e⁻ˣ)/2 : (e^x + e^(−x))/2 + (e^x − e^(−x))/2 | (e^x + e^(−x))/2 + (e^x − e^(−x))/2
  pièges : g2_hyp_trig_sign

Montre que 1 − tanh(x)² = 1/cosh(x)² pour tout x, avec les exponentielles.
  [free, suivre l'erreur]  1 − tanh(x)²
    = (cosh(x)² − sinh(x)²)/cosh(x)²   ← tanh = sinh/cosh, même dénominateur
    = 1/cosh(x)²   ← cosh² − sinh² = 1
  aides : Remplace sinh et cosh par leurs formules en eˣ et e⁻ˣ, puis développe. | cosh x = (eˣ + e⁻ˣ)/2, sinh x = (eˣ − e⁻ˣ)/2 : (cosh(x)² − sinh(x)²)/cosh(x)² | (cosh(x)² − sinh(x)²)/cosh(x)²
  pièges : g2_hyp_trig_sign

```

### Niveau 5

```
Calcule cosh(ln(3)).
  [free, sans aide]  cosh(ln(3))
    = (e^(ln(3)) + e^(−ln(3)))/2   ← Définition de cosh
    = (3 + 1/3)/2   ← e^(ln a) = a et e^(−ln a) = 1/a
    = 5/3   ← Calculer

Calcule tanh(ln(3)).
  [free, sans aide]  tanh(ln(3))
    = sinh(ln(3))/cosh(ln(3))   ← tanh = sinh / cosh
    = (4/3)/(5/3)   ← Valeurs de sinh et cosh
    = 4/5   ← Simplifier

Calcule sinh(ln(1/3)).
  [free, sans aide]  sinh(ln(1/3))
    = (e^(ln(1/3)) − e^(−ln(1/3)))/2   ← Définition de sinh
    = (1/3 − 3)/2   ← e^(ln a) = a et e^(−ln a) = 1/a
    = −4/3   ← Calculer

```

### Variantes d'examen

```
Vrai ou faux ?
  « cosh x ≥ 1 pour tout réel x. » → VRAI
  [examen tf]

cosh(ln(3)) =
  · 3/2   ✔ 5/3   · 4/3 [g2_hyp_trig_sign]   · 10/3
  [examen mcq]
  pièges : g2_hyp_trig_sign

```

## Formules hyperboliques (`g2-hyp-formulas`, CMS)

_On les retrouve avec les exponentielles : un + là où la trigo a un −._

### Niveau 1

```
Montre que 2sinh(x)cosh(x) = sinh(2x) avec les exponentielles.
  [guided]  2sinh(x)cosh(x)
    = 2·(e^x − e^(−x))/2·□   (trous : 2·(e^x − e^(−x))/2·(e^x + e^(−x))/2)   ← Définitions
    = (e^(2x) − e^(−2x))/2   ← (a − b)(a + b) = a² − b²
    = sinh(2x)   ← Définition de sinh 2x
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | 2·(e^x − e^(−x))/2·(e^x + e^(−x))/2 | (e^(2x) − e^(−2x))/2

Montre que cosh(x)² + sinh(x)² = cosh(2x) avec les exponentielles.
  [guided]  cosh(x)² + sinh(x)²
    = ((e^x + e^(−x))/2)² + □   (trous : ((e^x + e^(−x))/2)² + ((e^x − e^(−x))/2)²)   ← Définitions
    = (e^(2x) + e^(−2x))/2   ← Développer, réduire
    = cosh(2x)   ← Définition de cosh 2x
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | ((e^x + e^(−x))/2)² + ((e^x − e^(−x))/2)² | (e^(2x) + e^(−2x))/2
  pièges : g2_hyp_trig_sign, a1_hyper_identity_sign

Montre que cosh(x)² + sinh(x)² = cosh(2x) avec les exponentielles.
  [guided]  cosh(x)² + sinh(x)²
    = ((e^x + e^(−x))/2)² + □   (trous : ((e^x + e^(−x))/2)² + ((e^x − e^(−x))/2)²)   ← Définitions
    = (e^(2x) + e^(−2x))/2   ← Développer, réduire
    = cosh(2x)   ← Définition de cosh 2x
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | ((e^x + e^(−x))/2)² + ((e^x − e^(−x))/2)² | (e^(2x) + e^(−2x))/2
  pièges : g2_hyp_trig_sign, a1_hyper_identity_sign

```

### Niveau 2

```
Montre que sinh(x)cosh(y) + cosh(x)sinh(y) = sinh(x + y) avec les exponentielles.
  [guided]  sinh(x)cosh(y) + cosh(x)sinh(y)
    = ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4   ← Définitions
    = (□ − 2e^(−x − y))/4   (trous : (2e^(x + y) − 2e^(−x − y))/4)   ← Développer : les termes croisés s'annulent
    = sinh(x + y)   ← Définition de sinh(x + y)
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4 | (2e^(x + y) − 2e^(−x − y))/4
  pièges : g2_hyp_trig_sign

Montre que sinh(x)cosh(y) + cosh(x)sinh(y) = sinh(x + y) avec les exponentielles.
  [guided]  sinh(x)cosh(y) + cosh(x)sinh(y)
    = ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4   ← Définitions
    = (□ − 2e^(−x − y))/4   (trous : (2e^(x + y) − 2e^(−x − y))/4)   ← Développer : les termes croisés s'annulent
    = sinh(x + y)   ← Définition de sinh(x + y)
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4 | (2e^(x + y) − 2e^(−x − y))/4
  pièges : g2_hyp_trig_sign

Montre que sinh(x)cosh(y) + cosh(x)sinh(y) = sinh(x + y) avec les exponentielles.
  [guided]  sinh(x)cosh(y) + cosh(x)sinh(y)
    = ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4   ← Définitions
    = (□ − 2e^(−x − y))/4   (trous : (2e^(x + y) − 2e^(−x − y))/4)   ← Développer : les termes croisés s'annulent
    = sinh(x + y)   ← Définition de sinh(x + y)
  aides : Remplace chaque sinh et cosh par sa formule en exponentielles, puis développe. | ((e^x − e^(−x))(e^y + e^(−y)) + (e^x + e^(−x))(e^y − e^(−y)))/4 | (2e^(x + y) − 2e^(−x − y))/4
  pièges : g2_hyp_trig_sign

```

### Niveau 3

```
Exprime sinh(2x) en fonction de t = tanh x.
  [tap, suivre l'erreur, menu steps]  sinh(2x)
    = 2sinh(x)cosh(x)   ← Angle double
    = 2tanh(x)cosh(x)²   ← sinh x = tanh x · cosh x
    ? Quelle identité permet de remplacer cosh²x ? ✔ 1 − tanh²x = 1/cosh²x / · 1 + tanh²x = 1/cosh²x / · cosh²x − sinh²x = cosh 2x
    = 2tanh(x)/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = 2t/(1 − t²)   ← Remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | 2tanh(x)/(1 − tanh(x)²)
  pièges : g2_hyp_trig_sign

Exprime sinh(x)² en fonction de t = tanh x.
  [tap, suivre l'erreur, menu steps]  sinh(x)²
    = tanh(x)²cosh(x)²   ← sinh x = tanh x · cosh x
    = tanh(x)²/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    ? Quelle identité permet de remplacer cosh²x ? ✔ 1 − tanh²x = 1/cosh²x / · 1 + tanh²x = 1/cosh²x / · cosh²x − sinh²x = cosh 2x
    = t²/(1 − t²)   ← Remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | tanh(x)²/(1 − tanh(x)²)
  pièges : a1_hyper_identity_sign, g2_hyp_trig_sign

Exprime sinh(2x) en fonction de t = tanh x.
  [tap, suivre l'erreur, menu steps]  sinh(2x)
    = 2sinh(x)cosh(x)   ← Angle double
    = 2tanh(x)cosh(x)²   ← sinh x = tanh x · cosh x
    ? Quelle identité permet de remplacer cosh²x ? ✔ 1 − tanh²x = 1/cosh²x / · 1 + tanh²x = 1/cosh²x / · cosh²x − sinh²x = cosh 2x
    = 2tanh(x)/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = 2t/(1 − t²)   ← Remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | 2tanh(x)/(1 − tanh(x)²)
  pièges : g2_hyp_trig_sign

```

### Niveau 4

```
Exprime sinh(x)² en fonction de t = tanh x.
  [free, suivre l'erreur]  sinh(x)²
    = tanh(x)²cosh(x)²   ← sinh x = tanh x · cosh x
    = tanh(x)²/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = t²/(1 − t²)   ← Remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | tanh(x)²/(1 − tanh(x)²)
  pièges : a1_hyper_identity_sign

Exprime e^(2x) en fonction de t = tanh x.
  [free, suivre l'erreur]  e^(2x)
    = cosh(2x) + sinh(2x)   ← e^u = cosh u + sinh u
    = cosh(x)² + sinh(x)² + 2sinh(x)cosh(x)   ← Angles doubles
    = cosh(x)²(1 + tanh(x))²   ← cosh²x en facteur
    = (1 + tanh(x))²/((1 − tanh(x))(1 + tanh(x)))   ← cosh²x = 1/(1 − tanh²x)
    = (1 + t)/(1 − t)   ← Simplifier, remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | (1 + tanh(x))²/((1 − tanh(x))(1 + tanh(x)))

Exprime sinh(x)² en fonction de t = tanh x.
  [free, suivre l'erreur]  sinh(x)²
    = tanh(x)²cosh(x)²   ← sinh x = tanh x · cosh x
    = tanh(x)²/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = t²/(1 − t²)   ← Remplacer tanh x par t
  aides : Angle double, puis mets cosh²x en facteur pour faire apparaître tanh x = sinh x / cosh x. | 1 − tanh²x = 1/cosh²x, donc cosh²x = … | tanh(x)²/(1 − tanh(x)²)
  pièges : a1_hyper_identity_sign

```

### Niveau 5

```
Exprime sinh(x)² en fonction de t = tanh x.
  [free, sans aide]  sinh(x)²
    = tanh(x)²cosh(x)²   ← sinh x = tanh x · cosh x
    = tanh(x)²/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = t²/(1 − t²)   ← Remplacer tanh x par t
  pièges : a1_hyper_identity_sign

Exprime sinh(x)² en fonction de t = tanh x.
  [free, sans aide]  sinh(x)²
    = tanh(x)²cosh(x)²   ← sinh x = tanh x · cosh x
    = tanh(x)²/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = t²/(1 − t²)   ← Remplacer tanh x par t
  pièges : a1_hyper_identity_sign

Exprime e^(2x) en fonction de t = tanh x.
  [free, sans aide]  e^(2x)
    = cosh(2x) + sinh(2x)   ← e^u = cosh u + sinh u
    = cosh(x)² + sinh(x)² + 2sinh(x)cosh(x)   ← Angles doubles
    = cosh(x)²(1 + tanh(x))²   ← cosh²x en facteur
    = (1 + tanh(x))²/((1 − tanh(x))(1 + tanh(x)))   ← cosh²x = 1/(1 − tanh²x)
    = (1 + t)/(1 − t)   ← Simplifier, remplacer tanh x par t

```

### Variantes d'examen

```
Avec t = tanh x, cosh(2x) =
  · (1 − t²)/(1 + t²) [g2_hyp_trig_sign]   · (1 + t)/(1 − t)   · 2t/(1 − t²)   ✔ (1 + t²)/(1 − t²)
  [examen mcq]
  pièges : g2_hyp_trig_sign

Exprime sinh(2x) en fonction de t = tanh x.
  [free, sans aide, examen open]  sinh(2x)
    = 2sinh(x)cosh(x)   ← Angle double
    = 2tanh(x)cosh(x)²   ← sinh x = tanh x · cosh x
    = 2tanh(x)/(1 − tanh(x)²)   ← cosh²x = 1/(1 − tanh²x)
    = 2t/(1 − t²)   ← Remplacer tanh x par t

```

## Équations hyperboliques (`g2-hyp-eq`, CMS)

_Exponentielles, × 2eˣ, puis t = eˣ._

### Niveau 1

```
Résous 3cosh(x) − sinh(x) = 3.
  [guided]  3cosh(x) − sinh(x) = 3
    (Exponentielles : 3(e^x + e^(−x))/2 − (e^x − e^(−x))/2 = 3)
    = 2e^(2x) − 6e^x + 4 = 0   ← Multiplier par 2eˣ
    = 2t² − 6t + 4 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = □   (trous : t = 2 ou t = 1)   ← Résoudre le trinôme
    = x = 0 ou x = ln(2)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 2e^(2x) − 6e^x + 4 = 0 | 2e^(2x) − 6e^x + 4 = 0

Résous 5cosh(x) − sinh(x) = 7.
  [guided]  5cosh(x) − sinh(x) = 7
    (Exponentielles : 5(e^x + e^(−x))/2 − (e^x − e^(−x))/2 = 7)
    = 4e^(2x) − 14e^x + 6 = 0   ← Multiplier par 2eˣ
    = 4t² − 14t + 6 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = □   (trous : t = 3 ou t = 1/2)   ← Résoudre le trinôme
    = x = −ln(2) ou x = ln(3)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 4e^(2x) − 14e^x + 6 = 0 | 4e^(2x) − 14e^x + 6 = 0

Résous 3cosh(x) + sinh(x) = 3.
  [guided]  3cosh(x) + sinh(x) = 3
    (Exponentielles : 3(e^x + e^(−x))/2 + (e^x − e^(−x))/2 = 3)
    = 4e^(2x) − 6e^x + 2 = 0   ← Multiplier par 2eˣ
    = 4t² − 6t + 2 = 0   ← Posons t = eˣ > 0
    = t = 1 ou t = □   (trous : t = 1 ou t = 1/2)   ← Résoudre le trinôme
    = x = −ln(2) ou x = 0   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 4e^(2x) − 6e^x + 2 = 0 | 4e^(2x) − 6e^x + 2 = 0

```

### Niveau 2

```
Résous 5cosh(x) + sinh(x) = 7.
  [guided]  5cosh(x) + sinh(x) = 7
    = 5(e^x + e^(−x))/2 + (e^x − e^(−x))/2 = 7   ← Exponentielles
    = □ − 14e^x + 4 = 0   (trous : 6e^(2x) − 14e^x + 4 = 0)   ← Multiplier par 2eˣ
    = 6t² − 14t + 4 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = 1/3   ← Résoudre le trinôme
    = x = −ln(3) ou x = ln(2)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 6e^(2x) − 14e^x + 4 = 0 | 6e^(2x) − 14e^x + 4 = 0

Résous 3cosh(x) + sinh(x) = 3.
  [guided]  3cosh(x) + sinh(x) = 3
    = 3(e^x + e^(−x))/2 + (e^x − e^(−x))/2 = 3   ← Exponentielles
    = □ − 6e^x + 2 = 0   (trous : 4e^(2x) − 6e^x + 2 = 0)   ← Multiplier par 2eˣ
    = 4t² − 6t + 2 = 0   ← Posons t = eˣ > 0
    = t = 1 ou t = 1/2   ← Résoudre le trinôme
    = x = −ln(2) ou x = 0   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 4e^(2x) − 6e^x + 2 = 0 | 4e^(2x) − 6e^x + 2 = 0

Résous 3cosh(x) − sinh(x) = 3.
  [guided]  3cosh(x) − sinh(x) = 3
    = 3(e^x + e^(−x))/2 − (e^x − e^(−x))/2 = 3   ← Exponentielles
    = □ − 6e^x + 4 = 0   (trous : 2e^(2x) − 6e^x + 4 = 0)   ← Multiplier par 2eˣ
    = 2t² − 6t + 4 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = 1   ← Résoudre le trinôme
    = x = 0 ou x = ln(2)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 2e^(2x) − 6e^x + 4 = 0 | 2e^(2x) − 6e^x + 4 = 0

```

### Niveau 3

```
Résous 5cosh(x) − sinh(x) = 7.
  [tap, suivre l'erreur, menu steps]  5cosh(x) − sinh(x) = 7
    = 5(e^x + e^(−x))/2 − (e^x − e^(−x))/2 = 7   ← Exponentielles
    = 4e^(2x) − 14e^x + 6 = 0   ← Multiplier par 2eˣ
    = 4t² − 14t + 6 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = 1/2   ← Résoudre le trinôme
    = x = −ln(2) ou x = ln(3)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 4e^(2x) − 14e^x + 6 = 0 | 4e^(2x) − 14e^x + 6 = 0

Résous 2cosh(x) + sinh(x) = 2.
  [tap, suivre l'erreur, menu steps]  2cosh(x) + sinh(x) = 2
    = 2(e^x + e^(−x))/2 + (e^x − e^(−x))/2 = 2   ← Exponentielles
    = 3e^(2x) − 4e^x + 1 = 0   ← Multiplier par 2eˣ
    = 3t² − 4t + 1 = 0   ← Posons t = eˣ > 0
    = t = 1 ou t = 1/3   ← Résoudre le trinôme
    = x = −ln(3) ou x = 0   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 3e^(2x) − 4e^x + 1 = 0 | 3e^(2x) − 4e^x + 1 = 0

Résous 7cosh(x) − 5sinh(x) = 5.
  [tap, suivre l'erreur, menu steps]  7cosh(x) − 5sinh(x) = 5
    = 7(e^x + e^(−x))/2 − 5(e^x − e^(−x))/2 = 5   ← Exponentielles
    = 2e^(2x) − 10e^x + 12 = 0   ← Multiplier par 2eˣ
    = 2t² − 10t + 12 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = 2   ← Résoudre le trinôme
    = x = ln(2) ou x = ln(3)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 2e^(2x) − 10e^x + 12 = 0 | 2e^(2x) − 10e^x + 12 = 0

```

### Niveau 4

```
Résous 3cosh(x) + sinh(x) = 3.
  [free, suivre l'erreur]  3cosh(x) + sinh(x) = 3
    = 3(e^x + e^(−x))/2 + (e^x − e^(−x))/2 = 3   ← Exponentielles
    = 4e^(2x) − 6e^x + 2 = 0   ← Multiplier par 2eˣ
    = 4t² − 6t + 2 = 0   ← Posons t = eˣ > 0
    = t = 1 ou t = 1/2   ← Résoudre le trinôme
    = x = −ln(2) ou x = 0   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 4e^(2x) − 6e^x + 2 = 0 | 4e^(2x) − 6e^x + 2 = 0

Résous 3cosh(x) − sinh(x) = 3.
  [free, suivre l'erreur]  3cosh(x) − sinh(x) = 3
    = 3(e^x + e^(−x))/2 − (e^x − e^(−x))/2 = 3   ← Exponentielles
    = 2e^(2x) − 6e^x + 4 = 0   ← Multiplier par 2eˣ
    = 2t² − 6t + 4 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = 1   ← Résoudre le trinôme
    = x = 0 ou x = ln(2)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 2e^(2x) − 6e^x + 4 = 0 | 2e^(2x) − 6e^x + 4 = 0

Résous 7cosh(x) − 5sinh(x) = 5.
  [free, suivre l'erreur]  7cosh(x) − 5sinh(x) = 5
    = 7(e^x + e^(−x))/2 − 5(e^x − e^(−x))/2 = 5   ← Exponentielles
    = 2e^(2x) − 10e^x + 12 = 0   ← Multiplier par 2eˣ
    = 2t² − 10t + 12 = 0   ← Posons t = eˣ > 0
    = t = 3 ou t = 2   ← Résoudre le trinôme
    = x = ln(2) ou x = ln(3)   ← Revenir à x
  aides : Remplace cosh et sinh par leurs formules en eˣ, multiplie par 2eˣ, puis pose t = eˣ. | × 2eˣ : 2e^(2x) − 10e^x + 12 = 0 | 2e^(2x) − 10e^x + 12 = 0

```

### Niveau 5

```
Combien de solutions a l'équation cosh(x) = −x ? (Pense aux graphes, sans calcul.)
  ✔ 0   · 1   · 2   · 3

Combien de solutions a l'équation cosh(x) = 2x ? (Pense aux graphes, sans calcul.)
  · 0   · 1   ✔ 2   · 3

Combien de solutions a l'équation cosh(x) = 3 ? (Pense aux graphes, sans calcul.)
  · 0   · 1   ✔ 2   · 3

```

### Variantes d'examen

```
Résous −3cosh(x) + 5sinh(x) = 0.
  [free, sans aide, examen open]  −3cosh(x) + 5sinh(x) = 0
    = −3(e^x + e^(−x))/2 + 5(e^x − e^(−x))/2 = 0   ← Exponentielles
    = 2e^(2x) − 8 = 0   ← Multiplier par 2eˣ
    = 2t² − 8 = 0   ← Posons t = eˣ > 0
    = t = 2 ou t = −2   ← Résoudre le trinôme
    = e^x = 2   ← t > 0 : une seule racine
    = x = ln(2)   ← Revenir à x

Combien de solutions a l'équation cosh(x) = x + 2 ? (Pense aux graphes, sans calcul.)
  · 0   · 1   ✔ 2   · 3
  [examen mcq]

```

## argsh, argch, argth (`g2-arg`, CMS)

_Les réciproques, en résolvant un trinôme en eᵘ._

### Niveau 1

```
Calcule argch(17/8) sous la forme ln(…).
  [guided]  argch(17/8)
    = ln(17/8 + √((17/8)² − 1))   ← argch y = ln(y + √(y² − 1))
    = ln(17/8 + □)   (trous : ln(17/8 + 15/8))   ← √((17/8)² − 1) = 15/8
    = ln(4)   ← Additionner
  aides : argch y = ln(y + √(y² − 1)). | (17/8)² − 1 = (15/8)² | ln(17/8 + 15/8)

Calcule argsh(12/5) sous la forme ln(…).
  [guided]  argsh(12/5)
    = ln(12/5 + √((12/5)² + 1))   ← argsh y = ln(y + √(y² + 1))
    = ln(12/5 + □)   (trous : ln(12/5 + 13/5))   ← √((12/5)² + 1) = 13/5
    = ln(5)   ← Additionner
  aides : argsh y = ln(y + √(y² + 1)). | (12/5)² + 1 = (13/5)² | ln(12/5 + 13/5)

Calcule argch(5/4) sous la forme ln(…).
  [guided]  argch(5/4)
    = ln(5/4 + √((5/4)² − 1))   ← argch y = ln(y + √(y² − 1))
    = ln(5/4 + □)   (trous : ln(5/4 + 3/4))   ← √((5/4)² − 1) = 3/4
    = ln(2)   ← Additionner
  aides : argch y = ln(y + √(y² − 1)). | (5/4)² − 1 = (3/4)² | ln(5/4 + 3/4)

```

### Niveau 2

```
Établis la formule de argch : résous cosh(u) = y en u ≥ 0, pour y ≥ 1.
  [guided]  cosh(u) = y
    = (e^u + e^(−u))/2 = y   ← Définition de cosh
    = e^(2u) − 2ye^u + 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt + 1 = 0   ← Posons t = eᵘ, avec u ≥ 0 : t ≥ 1
    = t = y + □ ou t = y − √(y² − 1)   (trous : t = y + √(y² − 1) ou t = y − √(y² − 1))   ← Trinôme : Δ/4 = y² − 1 ≥ 0
    = t = y + √(y² − 1)   ← Le produit des racines vaut 1 : y − √(y² − 1) ≤ 1 donne u ≤ 0
    = u = ln(y + √(y² − 1))   ← Revenir à u
  aides : Écris cosh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ. Avec u ≥ 0, il faut t ≥ 1. | t² − 2yt + 1 = 0 : t = y ± √(…) | t = y + √(y² − 1) ou t = y − √(y² − 1)
  pièges : g2_cosh_one_root, g2_argsh_sign

Établis la formule de argch : résous cosh(u) = y en u ≥ 0, pour y ≥ 1.
  [guided]  cosh(u) = y
    = (e^u + e^(−u))/2 = y   ← Définition de cosh
    = e^(2u) − 2ye^u + 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt + 1 = 0   ← Posons t = eᵘ, avec u ≥ 0 : t ≥ 1
    = t = y + □ ou t = y − √(y² − 1)   (trous : t = y + √(y² − 1) ou t = y − √(y² − 1))   ← Trinôme : Δ/4 = y² − 1 ≥ 0
    = t = y + √(y² − 1)   ← Le produit des racines vaut 1 : y − √(y² − 1) ≤ 1 donne u ≤ 0
    = u = ln(y + √(y² − 1))   ← Revenir à u
  aides : Écris cosh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ. Avec u ≥ 0, il faut t ≥ 1. | t² − 2yt + 1 = 0 : t = y ± √(…) | t = y + √(y² − 1) ou t = y − √(y² − 1)
  pièges : g2_cosh_one_root, g2_argsh_sign

Établis la formule de argsh : résous sinh(u) = y en u, pour y ∈ ℝ.
  [guided]  sinh(u) = y
    = (e^u − e^(−u))/2 = y   ← Définition de sinh
    = e^(2u) − 2ye^u − 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt − 1 = 0   ← Posons t = eᵘ > 0
    = t = y + □ ou t = y − √(y² + 1)   (trous : t = y + √(y² + 1) ou t = y − √(y² + 1))   ← Trinôme : Δ/4 = y² + 1
    = t = y + √(y² + 1)   ← y − √(y² + 1) < 0 : rejeté
    = u = ln(y + √(y² + 1))   ← Revenir à u
  aides : Écris sinh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ > 0. | t² − 2yt − 1 = 0 : t = y ± √(…) | t = y + √(y² + 1) ou t = y − √(y² + 1)
  pièges : g2_argsh_sign

```

### Niveau 3

```
Établis la formule de argsh : résous sinh(u) = y en u, pour y ∈ ℝ.
  [tap, suivre l'erreur, menu steps]  sinh(u) = y
    = (e^u − e^(−u))/2 = y   ← Définition de sinh
    = e^(2u) − 2ye^u − 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt − 1 = 0   ← Posons t = eᵘ > 0
    = t = y + √(y² + 1) ou t = y − √(y² + 1)   ← Trinôme : Δ/4 = y² + 1
    ? Quelle racine garder ? ✔ t = y + √(y² + 1) / · t = y − √(y² + 1)
    = t = y + √(y² + 1)   ← y − √(y² + 1) < 0 : rejeté
    = u = ln(y + √(y² + 1))   ← Revenir à u
  aides : Écris sinh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ > 0. | t² − 2yt − 1 = 0 : t = y ± √(…) | t = y + √(y² + 1) ou t = y − √(y² + 1)
  pièges : g2_argsh_sign

Établis la formule de argsh : résous sinh(u) = y en u, pour y ∈ ℝ.
  [tap, suivre l'erreur, menu steps]  sinh(u) = y
    = (e^u − e^(−u))/2 = y   ← Définition de sinh
    = e^(2u) − 2ye^u − 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt − 1 = 0   ← Posons t = eᵘ > 0
    = t = y + √(y² + 1) ou t = y − √(y² + 1)   ← Trinôme : Δ/4 = y² + 1
    ? Quelle racine garder ? ✔ t = y + √(y² + 1) / · t = y − √(y² + 1)
    = t = y + √(y² + 1)   ← y − √(y² + 1) < 0 : rejeté
    = u = ln(y + √(y² + 1))   ← Revenir à u
  aides : Écris sinh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ > 0. | t² − 2yt − 1 = 0 : t = y ± √(…) | t = y + √(y² + 1) ou t = y − √(y² + 1)
  pièges : g2_argsh_sign

Établis la formule de argch : résous cosh(u) = y en u ≥ 0, pour y ≥ 1.
  [tap, suivre l'erreur, menu steps]  cosh(u) = y
    = (e^u + e^(−u))/2 = y   ← Définition de cosh
    = e^(2u) − 2ye^u + 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt + 1 = 0   ← Posons t = eᵘ, avec u ≥ 0 : t ≥ 1
    = t = y + √(y² − 1) ou t = y − √(y² − 1)   ← Trinôme : Δ/4 = y² − 1 ≥ 0
    ? Quelle racine garder, pour u ≥ 0 ? ✔ t = y + √(y² − 1) ≥ 1 / · t = y − √(y² − 1) ≤ 1
    = t = y + √(y² − 1)   ← Le produit des racines vaut 1 : y − √(y² − 1) ≤ 1 donne u ≤ 0
    = u = ln(y + √(y² − 1))   ← Revenir à u
  aides : Écris cosh avec les exponentielles, multiplie par 2eᵘ et pose t = eᵘ. Avec u ≥ 0, il faut t ≥ 1. | t² − 2yt + 1 = 0 : t = y ± √(…) | t = y + √(y² − 1) ou t = y − √(y² − 1)
  pièges : g2_cosh_one_root, g2_argsh_sign

```

### Niveau 4

```
Résous cosh(x) = 5/4.
  [free, suivre l'erreur]  cosh(x) = 5/4
    = e^x + e^(−x) = 5/2   ← Exponentielles
    = 2e^(2x) − 5e^x + 2 = 0   ← Multiplier par 2eˣ
    = 2t² − 5t + 2 = 0   ← Posons t = eˣ
    = t = 2 ou t = 1/2   ← Résoudre : deux racines > 0
    = x = −ln(2) ou x = ln(2)   ← Revenir à x : x = ±argch a
  aides : cosh est paire : si x est solution, −x aussi. Pose t = eˣ. | 2t² − 5t + 2 = 0 | t = 2 ou t = 1/2
  pièges : g2_cosh_one_root

Établis la formule de argth : résous tanh(u) = y en u, pour −1 < y < 1.
  [free, suivre l'erreur]  tanh(u) = y
    = (e^(2u) − 1)/(e^(2u) + 1) = y   ← tanh u = (e²ᵘ − 1)/(e²ᵘ + 1)
    = e^(2u) − 1 = y(e^(2u) + 1)   ← Multiplier par e²ᵘ + 1 > 0
    = e^(2u)(1 − y) = 1 + y   ← Regrouper
    = e^(2u) = (1 + y)/(1 − y)   ← Diviser par 1 − y > 0
    = u = (1/2)ln((1 + y)/(1 − y))   ← ln, puis diviser par 2
  aides : tanh u = (e²ᵘ − 1)/(e²ᵘ + 1) : multiplie par le dénominateur et isole e²ᵘ. | e²ᵘ(1 − y) = … | e^(2u) = (1 + y)/(1 − y)

Résous cosh(x) = 17/8.
  [free, suivre l'erreur]  cosh(x) = 17/8
    = e^x + e^(−x) = 17/4   ← Exponentielles
    = 4e^(2x) − 17e^x + 4 = 0   ← Multiplier par 4eˣ
    = 4t² − 17t + 4 = 0   ← Posons t = eˣ
    = t = 4 ou t = 1/4   ← Résoudre : deux racines > 0
    = x = −ln(4) ou x = ln(4)   ← Revenir à x : x = ±argch a
  aides : cosh est paire : si x est solution, −x aussi. Pose t = eˣ. | 4t² − 17t + 4 = 0 | t = 4 ou t = 1/4
  pièges : g2_cosh_one_root

```

### Niveau 5

```
Établis la formule de argsh : résous sinh(u) = y en u, pour y ∈ ℝ.
  [free, sans aide]  sinh(u) = y
    = (e^u − e^(−u))/2 = y   ← Définition de sinh
    = e^(2u) − 2ye^u − 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt − 1 = 0   ← Posons t = eᵘ > 0
    = t = y + √(y² + 1) ou t = y − √(y² + 1)   ← Trinôme : Δ/4 = y² + 1
    = t = y + √(y² + 1)   ← y − √(y² + 1) < 0 : rejeté
    = u = ln(y + √(y² + 1))   ← Revenir à u
  pièges : g2_argsh_sign

Établis la formule de argsh : résous sinh(u) = y en u, pour y ∈ ℝ.
  [free, sans aide]  sinh(u) = y
    = (e^u − e^(−u))/2 = y   ← Définition de sinh
    = e^(2u) − 2ye^u − 1 = 0   ← Multiplier par 2eᵘ
    = t² − 2yt − 1 = 0   ← Posons t = eᵘ > 0
    = t = y + √(y² + 1) ou t = y − √(y² + 1)   ← Trinôme : Δ/4 = y² + 1
    = t = y + √(y² + 1)   ← y − √(y² + 1) < 0 : rejeté
    = u = ln(y + √(y² + 1))   ← Revenir à u
  pièges : g2_argsh_sign

Résous cosh(x) = 17/8.
  [free, sans aide]  cosh(x) = 17/8
    = e^x + e^(−x) = 17/4   ← Exponentielles
    = 4e^(2x) − 17e^x + 4 = 0   ← Multiplier par 4eˣ
    = 4t² − 17t + 4 = 0   ← Posons t = eˣ
    = t = 4 ou t = 1/4   ← Résoudre : deux racines > 0
    = x = −ln(4) ou x = ln(4)   ← Revenir à x : x = ±argch a
  pièges : g2_cosh_one_root

```

### Variantes d'examen

```
Ensemble des solutions de cosh(x) = 17/8 :
  · {ln(4)} [g2_cosh_one_root]   ✔ {−ln(4) ; ln(4)}   · {0 ; ln(4)}   · {ln(17/4)}
  [examen mcq]
  pièges : g2_cosh_one_root

Vrai ou faux ?
  « argch(cosh x) = x pour tout réel x. » → FAUX
    contre-exemple (refute) : x = -1
  [examen tf]

```

## Pièges de cette unité

- **Somme dans l'exposant lue comme une somme de puissances** (`g2_exp_sum`, E) : e^(x+2) = eˣ + e² au lieu de e^(x+2) = eˣ·e²
- **Puissance d'une puissance : exposants additionnés** (`g2_power_power`, E) : (a^(1/2))⁶ = a^(13/2) au lieu de (a^(1/2))⁶ = a³
- **ln d'une somme découpé en somme de ln** (`g2_log_sum`, R) : ln(a + b) = ln a + ln b au lieu de ln(a + b) ne se découpe pas
- **ln(Aᵖ) lu comme (ln A)ᵖ** (`g2_log_power`, E) : ln(x³) = (ln x)³ au lieu de ln(x³) = 3 ln x
- **ln A − ln B confondu avec ln A / ln B** (`g2_log_quotient`, E) : ln a − ln b = ln a / ln b au lieu de ln a − ln b = ln(a/b)
- **Racine t négative gardée : eˣ = −2** (`g2_exp_neg_t`, E) : t = −2 gardé : x = ln(−2) au lieu de eˣ = −2 n'a pas de solution
- **Solutions gardées hors du domaine** (`g2_log_domain`, E) : S = {−3 ; 3} au lieu de S = {3}
- **ln(x²) = 2 ln x, sans valeur absolue** (`g2_log_square_abs`, E) : ln(x²) = 2 ln x au lieu de ln(x²) = 2 ln|x|
- **Base < 1 : inégalité pas retournée** (`g2_base_lt1`, E) : log_{1/3}(2x − 1) > log_{1/3}(x + 2) → 2x − 1 > x + 2 au lieu de 2x − 1 < x + 2
- **Solution x = 1 perdue (division par ln x)** (`g2_xx_lost_one`, E) : S = {2} au lieu de S = {1 ; 2}
- **Signe de la trigonométrie dans une formule hyperbolique** (`g2_hyp_trig_sign`, E) : cosh 2x = cosh²x − sinh²x au lieu de cosh 2x = cosh²x + sinh²x
- **cosh x = a : une seule solution gardée** (`g2_cosh_one_root`, E) : cosh x = 5/3 : S = {ln 3} au lieu de S = {−ln 3 ; ln 3}
- **Racine négative gardée pour eᵘ** (`g2_argsh_sign`, E) : eᵘ = y − √(y² + 1) au lieu de eᵘ = y + √(y² + 1)
