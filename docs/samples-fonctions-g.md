# Exemples de questions — Fonctions et inéquations

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Inéquations rationnelles (`g1-rational-ineq`, Gymnase)

_Tout d'un côté, même dénominateur, tableau de signes._

### Niveau 1

```
Résous (x − 5)/x > 0.
  [guided]  (x − 5)/x > 0
    (Bornes du tableau : 0 (valeur interdite, ‖) et 5 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {0})   ← Valeur interdite : 0
    = ]−∞ ; 0[ ∪ ]□ ; +∞[   (trous : ]−∞ ; 0[ ∪ ]5 ; +∞[)   ← Signes : valeur interdite 0, zéro 5
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : 0 ; zéro : 5 | ]−∞ ; 0[ ∪ ]5 ; +∞[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (x − 2)/(x + 2) > 0.
  [guided]  (x − 2)/(x + 2) > 0
    (Bornes du tableau : −2 (valeur interdite, ‖) et 2 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {−2})   ← Valeur interdite : −2
    = ]−∞ ; −2[ ∪ ]□ ; +∞[   (trous : ]−∞ ; −2[ ∪ ]2 ; +∞[)   ← Signes : valeur interdite −2, zéro 2
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : −2 ; zéro : 2 | ]−∞ ; −2[ ∪ ]2 ; +∞[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (x − 3)/(x − 5) < 0.
  [guided]  (x − 3)/(x − 5) < 0
    (Bornes du tableau : 5 (valeur interdite, ‖) et 3 (zéro).)
    = D = ℝ ∖ {□}   (trous : D = ℝ ∖ {5})   ← Valeur interdite : 5
    = ]□ ; 5[   (trous : ]3 ; 5[)   ← Signes : valeur interdite 5, zéro 3
  aides : Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue. | Valeur interdite : 5 ; zéro : 3 | ]3 ; 5[
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

```

### Niveau 2

```
Résous (2x − 5)/(x − 3) > 1.
  [guided]  (2x − 5)/(x − 3) > 1
    = D = ℝ ∖ {3}   ← Valeur interdite : 3
    = (2x − 5)/(x − 3) − 1 > 0   ← Tout d'un côté
    = (2x − 5 − (x − 3))/(x − 3) > 0   ← Même dénominateur
    = (□)/(x − 3) > 0   (trous : (x − 2)/(x − 3) > 0)   ← Réduire le numérateur
    = ]−∞ ; 2[ ∪ ]3 ; +∞[   ← Signes : valeur interdite 3, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (2x − 5 − (x − 3))/(x − 3) > 0 | (x − 2)/(x − 3) > 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (2x + 3)/(x + 5) ≥ 1.
  [guided]  (2x + 3)/(x + 5) ≥ 1
    = D = ℝ ∖ {−5}   ← Valeur interdite : −5
    = (2x + 3)/(x + 5) − 1 ≥ 0   ← Tout d'un côté
    = (2x + 3 − (x + 5))/(x + 5) ≥ 0   ← Même dénominateur
    = (□)/(x + 5) ≥ 0   (trous : (x − 2)/(x + 5) ≥ 0)   ← Réduire le numérateur
    = ]−∞ ; −5[ ∪ [2 ; +∞[   ← Signes : valeur interdite −5, zéro 2
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (2x + 3 − (x + 5))/(x + 5) ≥ 0 | (x − 2)/(x + 5) ≥ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (−x + 10)/(x − 5) < −2.
  [guided]  (−x + 10)/(x − 5) < −2
    = D = ℝ ∖ {5}   ← Valeur interdite : 5
    = (−x + 10)/(x − 5) + 2 < 0   ← Tout d'un côté
    = (−x + 10 + □)/(x − 5) < 0   (trous : (−x + 10 + 2(x − 5))/(x − 5) < 0)   ← Même dénominateur
    = □/(x − 5) < 0   (trous : x/(x − 5) < 0)   ← Réduire le numérateur
    = ]0 ; 5[   ← Signes : valeur interdite 5, zéro 0
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−x + 10 + 2(x − 5))/(x − 5) < 0 | x/(x − 5) < 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

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
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (−2x − 1)/(x + 1) < −1.
  [tap, suivre l'erreur, menu steps]  (−2x − 1)/(x + 1) < −1
    ? Comment commences-tu ? · Multiplier les deux membres par le dénominateur / ✔ Tout passer à gauche et réduire au même dénominateur
    = D = ℝ ∖ {−1}   ← Valeur interdite : −1
    = (−2x − 1)/(x + 1) + 1 < 0   ← Tout d'un côté
    = (−2x − 1 + (x + 1))/(x + 1) < 0   ← Même dénominateur
    = −x/(x + 1) < 0   ← Réduire le numérateur
    = ]−∞ ; −1[ ∪ ]0 ; +∞[   ← Signes : valeur interdite −1, zéro 0
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−2x − 1 + (x + 1))/(x + 1) < 0 | −x/(x + 1) < 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous x/(x − 3) < 2.
  [tap, suivre l'erreur, menu steps]  x/(x − 3) < 2
    ? Comment commences-tu ? · Multiplier les deux membres par le dénominateur / ✔ Tout passer à gauche et réduire au même dénominateur
    = D = ℝ ∖ {3}   ← Valeur interdite : 3
    = x/(x − 3) − 2 < 0   ← Tout d'un côté
    = (x − 2(x − 3))/(x − 3) < 0   ← Même dénominateur
    = (6 − x)/(x − 3) < 0   ← Réduire le numérateur
    = ]−∞ ; 3[ ∪ ]6 ; +∞[   ← Signes : valeur interdite 3, zéro 6
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (x − 2(x − 3))/(x − 3) < 0 | (6 − x)/(x − 3) < 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

```

### Niveau 4

```
Résous (3x + 1)/(x + 2) > 2.
  [free, suivre l'erreur]  (3x + 1)/(x + 2) > 2
    = D = ℝ ∖ {−2}   ← Valeur interdite : −2
    = (3x + 1)/(x + 2) − 2 > 0   ← Tout d'un côté
    = (3x + 1 − 2(x + 2))/(x + 2) > 0   ← Même dénominateur
    = (x − 3)/(x + 2) > 0   ← Réduire le numérateur
    = ]−∞ ; −2[ ∪ ]3 ; +∞[   ← Signes : valeur interdite −2, zéro 3
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (3x + 1 − 2(x + 2))/(x + 2) > 0 | (x − 3)/(x + 2) > 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (−2x + 3)/(x − 3) ≥ −3.
  [free, suivre l'erreur]  (−2x + 3)/(x − 3) ≥ −3
    = D = ℝ ∖ {3}   ← Valeur interdite : 3
    = (−2x + 3)/(x − 3) + 3 ≥ 0   ← Tout d'un côté
    = (−2x + 3 + 3(x − 3))/(x − 3) ≥ 0   ← Même dénominateur
    = (x − 6)/(x − 3) ≥ 0   ← Réduire le numérateur
    = ]−∞ ; 3[ ∪ [6 ; +∞[   ← Signes : valeur interdite 3, zéro 6
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−2x + 3 + 3(x − 3))/(x − 3) ≥ 0 | (x − 6)/(x − 3) ≥ 0
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous −x/(x + 2) > −2.
  [free, suivre l'erreur]  −x/(x + 2) > −2
    = D = ℝ ∖ {−2}   ← Valeur interdite : −2
    = −x/(x + 2) + 2 > 0   ← Tout d'un côté
    = (−x + 2(x + 2))/(x + 2) > 0   ← Même dénominateur
    = (x + 4)/(x + 2) > 0   ← Réduire le numérateur
    = ]−∞ ; −4[ ∪ ]−2 ; +∞[   ← Signes : valeur interdite −2, zéro −4
  aides : Ne multiplie pas par le dénominateur : son signe change. Écris d'abord le domaine, puis passe tout à gauche. | (−x + 2(x + 2))/(x + 2) > 0 | (x + 4)/(x + 2) > 0
  pièges : g1_pole_closed, g9_bracket, g2_log_domain

```

### Niveau 5

```
Résous (x − 3)/(x + 1) ≤ (x + 3)/(x + 4).
  [free, sans aide]  (x − 3)/(x + 1) ≤ (x + 3)/(x + 4)
    = D = ℝ ∖ {−4 ; −1}   ← Valeurs interdites
    = (x − 3)/(x + 1) − (x + 3)/(x + 4) ≤ 0   ← Tout d'un côté
    = ((x − 3)(x + 4) − (x + 3)(x + 1))/((x + 1)(x + 4)) ≤ 0   ← Même dénominateur
    = (−3x − 15)/((x + 1)(x + 4)) ≤ 0   ← Développer le numérateur
    = [−5 ; −4[ ∪ ]−1 ; +∞[   ← Signes : valeurs interdites −4 et −1, zéro −5
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (x + 2)/(x − 4) ≤ (x + 4)/x.
  [free, sans aide]  (x + 2)/(x − 4) ≤ (x + 4)/x
    = D = ℝ ∖ {0 ; 4}   ← Valeurs interdites
    = (x + 2)/(x − 4) − (x + 4)/x ≤ 0   ← Tout d'un côté
    = ((x + 2)x − (x + 4)(x − 4))/((x − 4)x) ≤ 0   ← Même dénominateur
    = (2x + 16)/((x − 4)x) ≤ 0   ← Développer le numérateur
    = ]−∞ ; −8] ∪ ]0 ; 4[   ← Signes : valeurs interdites 0 et 4, zéro −8
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

Résous (x − 3)/(x − 4) ≤ (x + 1)/(x + 2).
  [free, sans aide]  (x − 3)/(x − 4) ≤ (x + 1)/(x + 2)
    = D = ℝ ∖ {−2 ; 4}   ← Valeurs interdites
    = (x − 3)/(x − 4) − (x + 1)/(x + 2) ≤ 0   ← Tout d'un côté
    = ((x − 3)(x + 2) − (x + 1)(x − 4))/((x − 4)(x + 2)) ≤ 0   ← Même dénominateur
    = (2x − 2)/((x − 4)(x + 2)) ≤ 0   ← Développer le numérateur
    = ]−∞ ; −2[ ∪ [1 ; 4[   ← Signes : valeurs interdites −2 et 4, zéro 1
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

```

### Variantes d'examen

```
Ensemble des solutions de (2x + 3)/(x − 1) ≤ 3 :
  · [6 ; +∞[ [g1_mult_denominator]   ✔ ]−∞ ; 1[ ∪ [6 ; +∞[   · ]−∞ ; 1] ∪ [6 ; +∞[ [g1_pole_closed]   · ]1 ; 6[
  [examen mcq]
  pièges : g1_mult_denominator, g1_pole_closed

Résous (x − 1)/(x − 4) > x/(x − 2).
  [free, sans aide, examen open]  (x − 1)/(x − 4) > x/(x − 2)
    = D = ℝ ∖ {2 ; 4}   ← Valeurs interdites
    = (x − 1)/(x − 4) − x/(x − 2) > 0   ← Tout d'un côté
    = ((x − 1)(x − 2) − x(x − 4))/((x − 4)(x − 2)) > 0   ← Même dénominateur
    = (x + 2)/((x − 4)(x − 2)) > 0   ← Développer le numérateur
    = ]−2 ; 2[ ∪ ]4 ; +∞[   ← Signes : valeurs interdites 2 et 4, zéro −2
  pièges : g1_mult_denominator, g1_pole_closed, g9_bracket, g2_log_domain

```

## Équations et inéquations à paramètre (`g1-param`, CMS)

_Avant de diviser par une expression en m, on discute._

### Niveau 1

```
Résous (m − 3)x ≤ m² − 2m − 3 selon les valeurs du paramètre m.
  [guided]  (m − 3)x ≤ m² − 2m − 3
    (Cas m > 3 :)
    = (m − 3)x ≤ (m − 3)(□)   (trous : (m − 3)x ≤ (m − 3)(m + 1))   ← Factoriser
    = x ≤ □   (trous : x ≤ m + 1)   ← (m − 3) > 0 : on garde le sens
    = ]−∞ ; m + 1]   ← Écrire l'ensemble
  — Cas m < 3 :  [juge solset]  départ : (m − 3)x ≤ (m − 3)(m + 1)
    = x ≥ □   (trous : x ≥ m + 1)   ← (m − 3) < 0 : on retourne
    = [m + 1 ; +∞[   ← Écrire l'ensemble
  — Cas m = 3 :  [juge solset]  départ : (m − 3)x ≤ (m − 3)(m + 1)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 3 = 0 ? Et si m − 3 < 0 ? | Cas m < 3 : on divise par m − 3 < 0, donc x … m + 1 | x ≥ m + 1
  pièges : g1_param_case, g1_ineq_not_flipped

Résous (m + 2)x < m² + m − 2 selon les valeurs du paramètre m.
  [guided]  (m + 2)x < m² + m − 2
    (Cas m > −2 :)
    = (m + 2)x < (m + 2)(□)   (trous : (m + 2)x < (m + 2)(m − 1))   ← Factoriser
    = x < □   (trous : x < m − 1)   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m − 1[   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 1)
    = x > □   (trous : x > m − 1)   ← (m + 2) < 0 : on retourne
    = ]m − 1 ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 1)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m − 1 | x > m − 1
  pièges : g1_param_case, g1_ineq_not_flipped

Résous (m − 1)x = m² − 1 selon les valeurs du paramètre m.
  [guided]  (m − 1)x = m² − 1
    (Cas m ≠ 1 :)
    = (m − 1)x = (m − 1)(□)   (trous : (m − 1)x = (m − 1)(m + 1))   ← Factoriser
    = x = □   (trous : x = m + 1)   ← Diviser par (m − 1) ≠ 0
  — Cas m = 1 :  [juge solset]  départ : (m − 1)x = (m − 1)(m + 1)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 1 = 0 ? Et si m − 1 < 0 ? | Cas m < 1 : on divise par m − 1 < 0, donc x … m + 1 | x = m + 1
  pièges : g1_param_case

```

### Niveau 2

```
Résous (m − 3)x ≤ m² − 9 selon les valeurs du paramètre m.
  [guided]  m − 3 = 0
    (Valeur critique de m :)
    = {3}   ← Le coefficient de x s'annule
  — Cas m > 3 :  [juge solset]  départ : (m − 3)x ≤ m² − 9
    = (m − 3)x ≤ (m − 3)(m + 3)   ← Factoriser
    = x ≤ □   (trous : x ≤ m + 3)   ← (m − 3) > 0 : on garde le sens
    = ]−∞ ; m + 3]   ← Écrire l'ensemble
  — Cas m < 3 :  [juge solset]  départ : (m − 3)x ≤ (m − 3)(m + 3)
    = x ≥ □   (trous : x ≥ m + 3)   ← (m − 3) < 0 : on retourne
    = [m + 3 ; +∞[   ← Écrire l'ensemble
  — Cas m = 3 :  [juge solset]  départ : (m − 3)x ≤ (m − 3)(m + 3)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 3 = 0 ? Et si m − 3 < 0 ? | Cas m < 3 : on divise par m − 3 < 0, donc x … m + 3 | x ≥ m + 3

Résous (m + 2)x < m² − 4 selon les valeurs du paramètre m.
  [guided]  m + 2 = 0
    (Valeur critique de m :)
    = {−2}   ← Le coefficient de x s'annule
  — Cas m > −2 :  [juge solset]  départ : (m + 2)x < m² − 4
    = (m + 2)x < (m + 2)(m − 2)   ← Factoriser
    = x < □   (trous : x < m − 2)   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m − 2[   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 2)
    = x > □   (trous : x > m − 2)   ← (m + 2) < 0 : on retourne
    = ]m − 2 ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x < (m + 2)(m − 2)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m − 2 | x > m − 2

Résous (m + 1)x = m² − 1 selon les valeurs du paramètre m.
  [guided]  m + 1 = 0
    (Valeur critique de m :)
    = {−1}   ← Le coefficient de x s'annule
  — Cas m ≠ −1 :  [juge solset]  départ : (m + 1)x = m² − 1
    = (m + 1)x = (m + 1)(m − 1)   ← Factoriser
    = x = □   (trous : x = m − 1)   ← Diviser par (m + 1) ≠ 0
  — Cas m = −1 :  [juge solset]  départ : (m + 1)x = (m + 1)(m − 1)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m + 1 = 0 ? Et si m + 1 < 0 ? | Cas m < −1 : on divise par m + 1 < 0, donc x … m − 1 | x = m − 1

```

### Niveau 3

```
Résous mx > m² selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m = 0
    (Valeur critique de m :)
    = {0}   ← Le coefficient de x s'annule
  — Cas m > 0 :  [juge solset]  départ : mx > m²
    = mx > m(m)   ← Factoriser
    = x > m   ← m > 0 : on garde le sens
    = ]m ; +∞[   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx > m(m)
    = x < m   ← m < 0 : on retourne
    = ]−∞ ; m[   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx > m(m)
    = 0 > 0   ← 0·x > 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m | x < m

Résous (m − 2)x < m² − 4 selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m − 2 = 0
    (Valeur critique de m :)
    = {2}   ← Le coefficient de x s'annule
  — Cas m > 2 :  [juge solset]  départ : (m − 2)x < m² − 4
    = (m − 2)x < (m − 2)(m + 2)   ← Factoriser
    = x < m + 2   ← (m − 2) > 0 : on garde le sens
    = ]−∞ ; m + 2[   ← Écrire l'ensemble
  — Cas m < 2 :  [juge solset]  départ : (m − 2)x < (m − 2)(m + 2)
    = x > m + 2   ← (m − 2) < 0 : on retourne
    = ]m + 2 ; +∞[   ← Écrire l'ensemble
  — Cas m = 2 :  [juge solset]  départ : (m − 2)x < (m − 2)(m + 2)
    = 0 < 0   ← 0·x < 0
    = ∅   ← Jamais vrai
  aides : Que se passe-t-il si m − 2 = 0 ? Et si m − 2 < 0 ? | Cas m < 2 : on divise par m − 2 < 0, donc x … m + 2 | x > m + 2

Résous (m − 1)x ≤ m² − m selon les valeurs du paramètre m.
  [tap, suivre l'erreur, menu steps]  m − 1 = 0
    (Valeur critique de m :)
    = {1}   ← Le coefficient de x s'annule
  — Cas m > 1 :  [juge solset]  départ : (m − 1)x ≤ m² − m
    = (m − 1)x ≤ (m − 1)(m)   ← Factoriser
    = x ≤ m   ← (m − 1) > 0 : on garde le sens
    = ]−∞ ; m]   ← Écrire l'ensemble
  — Cas m < 1 :  [juge solset]  départ : (m − 1)x ≤ (m − 1)(m)
    = x ≥ m   ← (m − 1) < 0 : on retourne
    = [m ; +∞[   ← Écrire l'ensemble
  — Cas m = 1 :  [juge solset]  départ : (m − 1)x ≤ (m − 1)(m)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m − 1 = 0 ? Et si m − 1 < 0 ? | Cas m < 1 : on divise par m − 1 < 0, donc x … m | x ≥ m

```

### Niveau 4

```
Résous mx ≤ m² − m selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m = 0
    (Valeur critique de m :)
    = {0}   ← Le coefficient de x s'annule
  — Cas m > 0 :  [juge solset]  départ : mx ≤ m² − m
    = mx ≤ m(m − 1)   ← Factoriser
    = x ≤ m − 1   ← m > 0 : on garde le sens
    = ]−∞ ; m − 1]   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx ≤ m(m − 1)
    = x ≥ m − 1   ← m < 0 : on retourne
    = [m − 1 ; +∞[   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx ≤ m(m − 1)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m − 1 | x ≥ m − 1

Résous (m + 2)x ≤ m² + 2m selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m + 2 = 0
    (Valeur critique de m :)
    = {−2}   ← Le coefficient de x s'annule
  — Cas m > −2 :  [juge solset]  départ : (m + 2)x ≤ m² + 2m
    = (m + 2)x ≤ (m + 2)(m)   ← Factoriser
    = x ≤ m   ← (m + 2) > 0 : on garde le sens
    = ]−∞ ; m]   ← Écrire l'ensemble
  — Cas m < −2 :  [juge solset]  départ : (m + 2)x ≤ (m + 2)(m)
    = x ≥ m   ← (m + 2) < 0 : on retourne
    = [m ; +∞[   ← Écrire l'ensemble
  — Cas m = −2 :  [juge solset]  départ : (m + 2)x ≤ (m + 2)(m)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m + 2 = 0 ? Et si m + 2 < 0 ? | Cas m < −2 : on divise par m + 2 < 0, donc x … m | x ≥ m

Résous mx ≤ m² + m selon les valeurs du paramètre m.
  [free, suivre l'erreur]  m = 0
    (Valeur critique de m :)
    = {0}   ← Le coefficient de x s'annule
  — Cas m > 0 :  [juge solset]  départ : mx ≤ m² + m
    = mx ≤ m(m + 1)   ← Factoriser
    = x ≤ m + 1   ← m > 0 : on garde le sens
    = ]−∞ ; m + 1]   ← Écrire l'ensemble
  — Cas m < 0 :  [juge solset]  départ : mx ≤ m(m + 1)
    = x ≥ m + 1   ← m < 0 : on retourne
    = [m + 1 ; +∞[   ← Écrire l'ensemble
  — Cas m = 0 :  [juge solset]  départ : mx ≤ m(m + 1)
    = 0 ≤ 0   ← 0·x ≤ 0
    = ℝ   ← Toujours vrai
  aides : Que se passe-t-il si m = 0 ? Et si m < 0 ? | Cas m < 0 : on divise par m < 0, donc x … m + 1 | x ≥ m + 1

```

### Niveau 5

```
Selon m, combien de solutions a l'équation x² − 2mx + 2m + 15 = 0 ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.
  [free, sans aide]  (−2m)² − 4(2m + 15) > 0
    (Deux solutions : Δ > 0.)
    = m² − 2m − 15 > 0   ← Diviser par 4
    = (m + 3)(m − 5) > 0   ← Factoriser
    = ]−∞ ; −3[ ∪ ]5 ; +∞[   ← Signe du trinôme en m
  — Une seule solution : Δ = 0.  [juge solset]  départ : (−2m)² − 4(2m + 15) = 0
    = (m + 3)(m − 5) = 0   ← Diviser par 4, factoriser
    = {−3 ; 5}   ← Résoudre
  — Aucune solution : Δ < 0.  [juge solset]  départ : (−2m)² − 4(2m + 15) < 0
    = (m + 3)(m − 5) < 0   ← Diviser par 4, factoriser
    = ]−3 ; 5[   ← Signe du trinôme en m
  pièges : g9_bracket

Selon m, combien de solutions a l'équation x² − 2mx + 16 = 0 ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.
  [free, sans aide]  (−2m)² − 4(16) > 0
    (Deux solutions : Δ > 0.)
    = m² − 16 > 0   ← Diviser par 4
    = (m + 4)(m − 4) > 0   ← Factoriser
    = ]−∞ ; −4[ ∪ ]4 ; +∞[   ← Signe du trinôme en m
  — Une seule solution : Δ = 0.  [juge solset]  départ : (−2m)² − 4(16) = 0
    = (m + 4)(m − 4) = 0   ← Diviser par 4, factoriser
    = {−4 ; 4}   ← Résoudre
  — Aucune solution : Δ < 0.  [juge solset]  départ : (−2m)² − 4(16) < 0
    = (m + 4)(m − 4) < 0   ← Diviser par 4, factoriser
    = ]−4 ; 4[   ← Signe du trinôme en m
  pièges : g9_bracket

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
  pièges : g9_bracket

```

### Variantes d'examen

```
Résous (m − 2)x = m² − 4 selon les valeurs du paramètre m.
  [free, sans aide, examen open]  m − 2 = 0
    (Valeur critique de m :)
    = {2}   ← Le coefficient de x s'annule
  — Cas m ≠ 2 :  [juge solset]  départ : (m − 2)x = m² − 4
    = (m − 2)x = (m − 2)(m + 2)   ← Factoriser
    = x = m + 2   ← Diviser par (m − 2) ≠ 0
  — Cas m = 2 :  [juge solset]  départ : (m − 2)x = (m − 2)(m + 2)
    = 0 = 0   ← 0·x = 0
    = ℝ   ← Toujours vrai

On résout (m + 3)x < m² + 2m − 3. Pour m = −6, l'ensemble des solutions est :
  · ∅   · ]−∞ ; −7[ [g1_param_case]   ✔ ]−7 ; +∞[   · ℝ
  [examen mcq]
  pièges : g1_param_case

```

## Trinôme à paramètre : position des racines (`g1-viete`, CMS)

_k est entre les racines si et seulement si a·f(k) < 0._

### Niveau 1

```
Pour quels m l'équation (m − 2)x² + 2x − 3m − 2 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ ?
  [guided]  (m − 2)·2² + 2·2 + (−3m − 2)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(2) =)
    = m − □   (trous : m − 6)   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 2)(m − 6) < 0
    = 2 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]2 ; 6[)   ← Écrire l'ensemble
  aides : 2 est entre les racines si et seulement si a·f(2) < 0, avec a = m − 2. | f(2) = (m − 2)·2² + 2·2 + (−3m − 2) = … | m − 6

Pour quels m l'équation (m + 2)x² + (−2m − 3)x + 2m + 2 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [guided]  (m + 2)·1² + (−2m − 3)·1 + (2m + 2)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(1) =)
    = m + 1   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)(m + 1) < 0
    = −2 < m < −1   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]−2 ; −1[)   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m + 2. | f(1) = (m + 2)·1² + (−2m − 3)·1 + (2m + 2) = … | m + 1

Pour quels m l'équation mx² + (−m + 2)x − 5m + 1 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ ?
  [guided]  m·(−2)² + (−m + 2)·(−2) + (−5m + 1)
    (Rappel : k est entre les racines si et seulement si a·f(k) < 0 ; k est à l'extérieur si a·f(k) > 0.)
    (f(−2) =)
    = m − □   (trous : m − 3)   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : m(m − 3) < 0
    = 0 < m < 3   ← Signe du trinôme en m : entre les racines
    = ]□ ; □[   (trous : ]0 ; 3[)   ← Écrire l'ensemble
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m. | f(−2) = m·(−2)² + (−m + 2)·(−2) + (−5m + 1) = … | m − 3

```

### Niveau 2

```
Pour quels m l'équation (m + 2)x² + (2m − 2)x − 2m − 6 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [guided]  (m + 2)·1² + (2m − 2)·1 + (−2m − 6)
    (f(1) =)
    = m − 6   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)(m − 6) < 0
    ? Quelle condition dit que 1 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = −2 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]−2 ; 6[   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m + 2. | f(1) = (m + 2)·1² + (2m − 2)·1 + (−2m − 6) = … | m − 6
  pièges : g1_viete_a

Pour quels m l'équation (m − 4)x² + mx − m − 2 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [guided]  (m − 4)·1² + m·1 + (−m − 2)
    (f(1) =)
    = m − 6   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 4)(m − 6) < 0
    ? Quelle condition dit que 1 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = 4 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]4 ; 6[   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m − 4. | f(1) = (m − 4)·1² + m·1 + (−m − 2) = … | m − 6
  pièges : g1_viete_a

Pour quels m l'équation (m − 1)x² + (2m + 3)x − 7m − 6 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ ?
  [guided]  (m − 1)·2² + (2m + 3)·2 + (−7m − 6)
    (f(2) =)
    = m − 4   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 1)(m − 4) < 0
    ? Quelle condition dit que 2 est entre les racines ? ✔ a·f(k) < 0 / · f(k) < 0 / · Δ > 0
    = 1 < m < 4   ← Signe du trinôme en m : entre les racines
    = ]1 ; 4[   ← Écrire l'ensemble
  aides : 2 est entre les racines si et seulement si a·f(2) < 0, avec a = m − 1. | f(2) = (m − 1)·2² + (2m + 3)·2 + (−7m − 6) = … | m − 4
  pièges : g1_viete_a

```

### Niveau 3

```
Pour quels m l'équation (m − 1)x² − 3x − 3m + 6 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ < 4 ?
  [tap, suivre l'erreur, menu steps]  (m − 1)·2² + (−3)·2 + (−3m + 6)
    (f(2) =)
    = m − 4   ← Développer et réduire
  — f(4) =  [juge equiv]  départ : (m − 1)·4² + (−3)·4 + (−3m + 6)
    = 13m − 22   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 1)(m − 4) < 0 et (m − 1)(13m − 22) > 0
    = 1 < m < 4 et m ∈ ]−∞ ; 1[ ∪ ]22/13 ; +∞[   ← Résoudre chaque condition
    = ]22/13 ; 4[   ← Intersecter
  aides : 2 est entre les racines si et seulement si a·f(2) < 0, avec a = m − 1. | f(2) = (m − 1)·2² + (−3)·2 + (−3m + 6) = … | m − 4

Pour quels m l'équation (m − 4)x² + 3x − 5 = 0 a-t-elle deux racines avec −3 < x₁ < 1 < x₂ ?
  [tap, suivre l'erreur, menu steps]  (m − 4)·1² + 3·1 + (−5)
    (f(1) =)
    = m − 6   ← Développer et réduire
  — f(−3) =  [juge equiv]  départ : (m − 4)·(−3)² + 3·(−3) + (−5)
    = 9m − 50   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 4)(m − 6) < 0 et (m − 4)(9m − 50) > 0
    = 4 < m < 6 et m ∈ ]−∞ ; 4[ ∪ ]50/9 ; +∞[   ← Résoudre chaque condition
    = ]50/9 ; 6[   ← Intersecter
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m − 4. | f(1) = (m − 4)·1² + 3·1 + (−5) = … | m − 6

Pour quels m l'équation (m + 1)x² + (m − 2)x − m − 12 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ < 5 ?
  [tap, suivre l'erreur, menu steps]  (m + 1)·(−2)² + (m − 2)·(−2) + (−m − 12)
    (f(−2) =)
    = m − 4   ← Développer et réduire
  — f(5) =  [juge equiv]  départ : (m + 1)·5² + (m − 2)·5 + (−m − 12)
    = 29m + 3   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m + 1)(m − 4) < 0 et (m + 1)(29m + 3) > 0
    = −1 < m < 4 et m ∈ ]−∞ ; −1[ ∪ ]−3/29 ; +∞[   ← Résoudre chaque condition
    = ]−3/29 ; 4[   ← Intersecter
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m + 1. | f(−2) = (m + 1)·(−2)² + (m − 2)·(−2) + (−m − 12) = … | m − 4

```

### Niveau 4

```
Pour quels m l'équation (m + 2)x² − 2x − 4 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [free, suivre l'erreur]  (m + 2)·1² + (−2)·1 + (−4)
    (f(1) =)
    = m − 4   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m + 2)(m − 4) < 0
    = −2 < m < 4   ← Signe du trinôme en m : entre les racines
    = ]−2 ; 4[   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m + 2. | f(1) = (m + 2)·1² + (−2)·1 + (−4) = … | m − 4

Pour quels m l'équation (m − 1)x² + 1x − 5 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ ?
  [free, suivre l'erreur]  (m − 1)·1² + 1·1 + (−5)
    (f(1) =)
    = m − 5   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 1)(m − 5) < 0
    = 1 < m < 5   ← Signe du trinôme en m : entre les racines
    = ]1 ; 5[   ← Écrire l'ensemble
  aides : 1 est entre les racines si et seulement si a·f(1) < 0, avec a = m − 1. | f(1) = (m − 1)·1² + 1·1 + (−5) = … | m − 5

Pour quels m l'équation (m − 5)x² + (−m − 2)x − 5m + 10 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ ?
  [free, suivre l'erreur]  (m − 5)·(−2)² + (−m − 2)·(−2) + (−5m + 10)
    (f(−2) =)
    = m − 6   ← Développer et réduire
  — Condition a·f(k) < 0 :  [juge solset]  départ : (m − 5)(m − 6) < 0
    = 5 < m < 6   ← Signe du trinôme en m : entre les racines
    = ]5 ; 6[   ← Écrire l'ensemble
  aides : −2 est entre les racines si et seulement si a·f(−2) < 0, avec a = m − 5. | f(−2) = (m − 5)·(−2)² + (−m − 2)·(−2) + (−5m + 10) = … | m − 6

```

### Niveau 5

```
Pour quels m l'équation (m + 3)x² + (−m − 1)x + m − 7 = 0 a-t-elle deux racines avec −2 < x₁ < 1 < x₂ ?
  [free, sans aide]  (m + 3)·1² + (−m − 1)·1 + (m − 7)
    (f(1) =)
    = m − 5   ← Développer et réduire
  — f(−2) =  [juge equiv]  départ : (m + 3)·(−2)² + (−m − 1)·(−2) + (m − 7)
    = 7m + 7   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m + 3)(m − 5) < 0 et (m + 3)(7m + 7) > 0
    = −3 < m < 5 et m ∈ ]−∞ ; −3[ ∪ ]−1 ; +∞[   ← Résoudre chaque condition
    = ]−1 ; 5[   ← Intersecter

Pour quels m l'équation (m − 2)x² − 3m + 4 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ < 4 ?
  [free, sans aide]  (m − 2)·(−2)² + (−3m + 4)
    (f(−2) =)
    = m − 4   ← Développer et réduire
  — f(4) =  [juge equiv]  départ : (m − 2)·4² + (−3m + 4)
    = 13m − 28   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 2)(m − 4) < 0 et (m − 2)(13m − 28) > 0
    = 2 < m < 4 et m ∈ ]−∞ ; 2[ ∪ ]28/13 ; +∞[   ← Résoudre chaque condition
    = ]28/13 ; 4[   ← Intersecter

Pour quels m l'équation (m − 3)x² + (−m + 1)x − 5m + 8 = 0 a-t-elle deux racines avec x₁ < −2 < x₂ < 5 ?
  [free, sans aide]  (m − 3)·(−2)² + (−m + 1)·(−2) + (−5m + 8)
    (f(−2) =)
    = m − 6   ← Développer et réduire
  — f(5) =  [juge equiv]  départ : (m − 3)·5² + (−m + 1)·5 + (−5m + 8)
    = 15m − 62   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 3)(m − 6) < 0 et (m − 3)(15m − 62) > 0
    = 3 < m < 6 et m ∈ ]−∞ ; 3[ ∪ ]62/15 ; +∞[   ← Résoudre chaque condition
    = ]62/15 ; 6[   ← Intersecter

```

### Variantes d'examen

```
Pour quels m l'équation (m − 5)x² − 3x + 2 = 0 a-t-elle deux racines avec x₁ < 1 < x₂ < 3 ?
  [free, sans aide, examen open]  (m − 5)·1² + (−3)·1 + 2
    (f(1) =)
    = m − 6   ← Développer et réduire
  — f(3) =  [juge equiv]  départ : (m − 5)·3² + (−3)·3 + 2
    = 9m − 52   ← Développer et réduire
  — Conditions a·f(k₁) et a·f(k₂) :  [juge solset]  départ : (m − 5)(m − 6) < 0 et (m − 5)(9m − 52) > 0
    = 5 < m < 6 et m ∈ ]−∞ ; 5[ ∪ ]52/9 ; +∞[   ← Résoudre chaque condition
    = ]52/9 ; 6[   ← Intersecter

Pour quels m l'équation mx² + (2m − 1)x − 7m − 2 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ ?
  · [0 ; 4]   · ]−∞ ; 4[ [g1_viete_a]   ✔ ]0 ; 4[   · ]−∞ ; 0[ ∪ ]4 ; +∞[
  [examen mcq]
  pièges : g1_viete_a

```

## Valeur absolue : équations (`g1-abs-eq`, Gymnase)

_Un cas par signe, et on garde les solutions du cas._

### Niveau 1

```
Résous |x − 2| = 2x.
  [guided]  |x − 2| = 2x
    (Cas x ≥ 2 :)
    (x − 2 = 2x)
    = x = −2   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x < 2 :  [juge solset]  départ : |x − 2| = 2x
    (−(x − 2) = 2x)
    = x = 2/3   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {2/3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 2. | Cas x ≥ 2 : x − 2 = 2x | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |2x − 2| = x.
  [guided]  |2x − 2| = x
    (Cas x ≥ 1 :)
    (2x − 2 = x)
    = x = 2   ← Isoler x : la solution est dans le cas
  — Cas x < 1 :  [juge solset]  départ : |2x − 2| = x
    (−(2x − 2) = x)
    = x = 2/3   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {2/3 ; 2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 1. | Cas x ≥ 1 : 2x − 2 = x | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |2x + 6| = −x − 1.
  [guided]  |2x + 6| = −x − 1
    (Cas x ≥ −3 :)
    (2x + 6 = −x − 1)
    = x = −7/3   ← Isoler x : la solution est dans le cas
  — Cas x < −3 :  [juge solset]  départ : |2x + 6| = −x − 1
    (−(2x + 6) = −x − 1)
    = x = −5   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−5 ; −7/3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −3. | Cas x ≥ −3 : 2x + 6 = −x − 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

```

### Niveau 2

```
Résous |x − 6| = −2x − 2.
  [guided]  x − 6 = 0
    (Frontières des cas :)
    = {6}   ← Là où |…| change d'écriture
  — Cas x ≥ 6 :  [juge solset]  départ : |x − 6| = −2x − 2
    = x − 6 = −2x − 2   ← Ôter la valeur absolue dans ce cas
    = x = 4/3   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x < 6 :  [juge solset]  départ : |x − 6| = −2x − 2
    = −(x − 6) = −2x − 2   ← Ôter la valeur absolue dans ce cas
    = x = −8   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−8}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 6. | Cas x ≥ 6 : x − 6 = −2x − 2 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

Résous |2x − 1| = −x + 5.
  [guided]  2x − 1 = 0
    (Frontières des cas :)
    = {1/2}   ← Là où |…| change d'écriture
  — Cas x ≥ 1/2 :  [juge solset]  départ : |2x − 1| = −x + 5
    = 2x − 1 = −x + 5   ← Ôter la valeur absolue dans ce cas
    = x = 2   ← Isoler x : la solution est dans le cas
  — Cas x < 1/2 :  [juge solset]  départ : |2x − 1| = −x + 5
    = −(2x − 1) = −x + 5   ← Ôter la valeur absolue dans ce cas
    = x = −4   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−4 ; 2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 1/2. | Cas x ≥ 1/2 : 2x − 1 = −x + 5 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

Résous |3x + 1| = −2x + 1.
  [guided]  3x + 1 = 0
    (Frontières des cas :)
    = {−1/3}   ← Là où |…| change d'écriture
  — Cas x ≥ −1/3 :  [juge solset]  départ : |3x + 1| = −2x + 1
    = 3x + 1 = −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x = 0   ← Isoler x : la solution est dans le cas
  — Cas x < −1/3 :  [juge solset]  départ : |3x + 1| = −2x + 1
    = −(3x + 1) = −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x = −2   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {−2 ; 0}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −1/3. | Cas x ≥ −1/3 : 3x + 1 = −2x + 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.

```

### Niveau 3

```
Résous |2x − 5| = −x + 4.
  [tap, suivre l'erreur, menu steps]  |2x − 5| = −x + 4
    (Cas x ≥ 5/2 :)
    = 2x − 5 = −x + 4   ← Ôter la valeur absolue dans ce cas
    = x = 3   ← Isoler x : la solution est dans le cas
  — Cas x < 5/2 :  [juge solset]  départ : |2x − 5| = −x + 4
    = −(2x − 5) = −x + 4   ← Ôter la valeur absolue dans ce cas
    = x = 1   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {1 ; 3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 5/2. | Cas x ≥ 5/2 : 2x − 5 = −x + 4 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |3x − 5| = x − 1.
  [tap, suivre l'erreur, menu steps]  |3x − 5| = x − 1
    (Cas x ≥ 5/3 :)
    = 3x − 5 = x − 1   ← Ôter la valeur absolue dans ce cas
    = x = 2   ← Isoler x : la solution est dans le cas
  — Cas x < 5/3 :  [juge solset]  départ : |3x − 5| = x − 1
    = −(3x − 5) = x − 1   ← Ôter la valeur absolue dans ce cas
    = x = 3/2   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {3/2 ; 2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 5/3. | Cas x ≥ 5/3 : 3x − 5 = x − 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

Résous |x| = 2x − 3.
  [tap, suivre l'erreur, menu steps]  |x| = 2x − 3
    (Cas x ≥ 0 :)
    = x = 2x − 3   ← Ôter la valeur absolue dans ce cas
    = x = 3   ← Isoler x : la solution est dans le cas
  — Cas x < 0 :  [juge solset]  départ : |x| = 2x − 3
    = −x = 2x − 3   ← Ôter la valeur absolue dans ce cas
    = x = 1   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {3}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 0. | Cas x ≥ 0 : x = 2x − 3 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped, g1_abs_one_case

```

### Niveau 4

```
Résous |x − 6| − |x + 2| + |2x − 2| = 3.
  [free, suivre l'erreur]  |x − 6| − |x + 2| + |2x − 2| = 3
    (Cas x < −2 :)
    = −(x − 6) + (x + 2) − (2x − 2) = 3   ← Ôter la valeur absolue dans ce cas
    = x = 7/2   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas −2 ≤ x < 1 :  [juge solset]  départ : |x − 6| − |x + 2| + |2x − 2| = 3
    = −(x − 6) − (x + 2) − (2x − 2) = 3   ← Ôter la valeur absolue dans ce cas
    = x = 3/4   ← Isoler x : la solution est dans le cas
  — Cas 1 ≤ x < 6 :  [juge solset]  départ : |x − 6| − |x + 2| + |2x − 2| = 3
    = −(x − 6) − (x + 2) + (2x − 2) = 3   ← Ôter la valeur absolue dans ce cas
    = 2 = 3   ← Réduire : il ne reste pas de x
    = ∅   ← Garder les solutions du cas
  — Cas x ≥ 6 :  [juge solset]  départ : |x − 6| − |x + 2| + |2x − 2| = 3
    = (x − 6) − (x + 2) + (2x − 2) = 3   ← Ôter la valeur absolue dans ce cas
    = x = 13/2   ← Isoler x : la solution est dans le cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {3/4 ; 13/2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −2, 1, 6. | Cas x < −2 : −(x − 6) + (x + 2) − (2x − 2) = 3 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped

Résous |x − 2| − |x| = 1.
  [free, suivre l'erreur]  |x − 2| − |x| = 1
    (Cas x < 0 :)
    = −(x − 2) + x = 1   ← Ôter la valeur absolue dans ce cas
    = 2 = 1   ← Réduire : il ne reste pas de x
    = ∅   ← Garder les solutions du cas
  — Cas 0 ≤ x < 2 :  [juge solset]  départ : |x − 2| − |x| = 1
    = −(x − 2) − x = 1   ← Ôter la valeur absolue dans ce cas
    = x = 1/2   ← Isoler x : la solution est dans le cas
  — Cas x ≥ 2 :  [juge solset]  départ : |x − 2| − |x| = 1
    = (x − 2) − x = 1   ← Ôter la valeur absolue dans ce cas
    = −2 = 1   ← Réduire : il ne reste pas de x
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3
    = {1/2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = 0, 2. | Cas x < 0 : −(x − 2) + x = 1 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped

Résous |x − 2| + |x + 3| − |2x − 6| = 0.
  [free, suivre l'erreur]  |x − 2| + |x + 3| − |2x − 6| = 0
    (Cas x < −3 :)
    = −(x − 2) − (x + 3) + (2x − 6) = 0   ← Ôter la valeur absolue dans ce cas
    = −7 = 0   ← Réduire : il ne reste pas de x
    = ∅   ← Garder les solutions du cas
  — Cas −3 ≤ x < 2 :  [juge solset]  départ : |x − 2| + |x + 3| − |2x − 6| = 0
    = −(x − 2) + (x + 3) + (2x − 6) = 0   ← Ôter la valeur absolue dans ce cas
    = x = 1/2   ← Isoler x : la solution est dans le cas
  — Cas 2 ≤ x < 3 :  [juge solset]  départ : |x − 2| + |x + 3| − |2x − 6| = 0
    = (x − 2) + (x + 3) + (2x − 6) = 0   ← Ôter la valeur absolue dans ce cas
    = x = 5/4   ← Isoler x
    = ∅   ← Garder les solutions du cas
  — Cas x ≥ 3 :  [juge solset]  départ : |x − 2| + |x + 3| − |2x − 6| = 0
    = (x − 2) + (x + 3) − (2x − 6) = 0   ← Ôter la valeur absolue dans ce cas
    = 7 = 0   ← Réduire : il ne reste pas de x
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {1/2}   ← Réunir les cas
  aides : Coupe là où ce qui est dans |…| change de signe : x = −3, 2, 3. | Cas x < −3 : −(x − 2) − (x + 3) + (2x − 6) = 0 | Dans chaque cas, garde seulement les solutions qui sont dans le cas.
  pièges : g1_abs_dropped

```

### Niveau 5

```
Résous |x² − 5x + 6| − |x| − 6 = 0.
  [free, sans aide]  |x² − 5x + 6| − |x| − 6 = 0
    (Cas x < 0 :)
    = (x² − 5x + 6) + x − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 4x = 0   ← Réduire
    = {0 ; 4}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas 0 ≤ x < 2 :  [juge solset]  départ : |x² − 5x + 6| − |x| − 6 = 0
    = (x² − 5x + 6) − x − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 6x = 0   ← Réduire
    = {0 ; 6}   ← Résoudre
    = {0}   ← Garder les solutions du cas
  — Cas 2 ≤ x < 3 :  [juge solset]  départ : |x² − 5x + 6| − |x| − 6 = 0
    = −(x² − 5x + 6) − x − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² + 4x − 12 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 3 :  [juge solset]  départ : |x² − 5x + 6| − |x| − 6 = 0
    = (x² − 5x + 6) − x − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 6x = 0   ← Réduire
    = {0 ; 6}   ← Résoudre
    = {6}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {0 ; 6}   ← Réunir les cas
  pièges : g1_abs_dropped

Résous |x² − 7x + 12| − |x − 2| − 2 = 0.
  [free, sans aide]  |x² − 7x + 12| − |x − 2| − 2 = 0
    (Cas x < 2 :)
    = (x² − 7x + 12) + (x − 2) − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 6x + 8 = 0   ← Réduire
    = {2 ; 4}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas 2 ≤ x < 3 :  [juge solset]  départ : |x² − 7x + 12| − |x − 2| − 2 = 0
    = (x² − 7x + 12) − (x − 2) − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 8x + 12 = 0   ← Réduire
    = {2 ; 6}   ← Résoudre
    = {2}   ← Garder les solutions du cas
  — Cas 3 ≤ x < 4 :  [juge solset]  départ : |x² − 7x + 12| − |x − 2| − 2 = 0
    = −(x² − 7x + 12) − (x − 2) − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² + 6x − 12 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 4 :  [juge solset]  départ : |x² − 7x + 12| − |x − 2| − 2 = 0
    = (x² − 7x + 12) − (x − 2) − 2 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 8x + 12 = 0   ← Réduire
    = {2 ; 6}   ← Résoudre
    = {6}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {2 ; 6}   ← Réunir les cas
  pièges : g1_abs_dropped

Résous |x² − 7x + 12| − |x − 1| − 6 = 0.
  [free, sans aide]  |x² − 7x + 12| − |x − 1| − 6 = 0
    (Cas x < 1 :)
    = (x² − 7x + 12) + (x − 1) − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 6x + 5 = 0   ← Réduire
    = {1 ; 5}   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Cas 1 ≤ x < 3 :  [juge solset]  départ : |x² − 7x + 12| − |x − 1| − 6 = 0
    = (x² − 7x + 12) − (x − 1) − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 8x + 7 = 0   ← Réduire
    = {1 ; 7}   ← Résoudre
    = {1}   ← Garder les solutions du cas
  — Cas 3 ≤ x < 4 :  [juge solset]  départ : |x² − 7x + 12| − |x − 1| − 6 = 0
    = −(x² − 7x + 12) − (x − 1) − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = −x² + 6x − 17 = 0   ← Réduire
    = ∅   ← Résoudre
  — Cas x ≥ 4 :  [juge solset]  départ : |x² − 7x + 12| − |x − 1| − 6 = 0
    = (x² − 7x + 12) − (x − 1) − 6 = 0   ← Ôter la valeur absolue dans ce cas
    = x² − 8x + 7 = 0   ← Réduire
    = {1 ; 7}   ← Résoudre
    = {7}   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2 ∪ S_3 ∪ S_4
    = {1 ; 7}   ← Réunir les cas
  pièges : g1_abs_dropped

```

### Variantes d'examen

```
Ensemble des solutions de |2x + 3| = x + 4 :
  · {−7/3}   ✔ {−7/3 ; 1}   · ∅   · {1} [g1_abs_dropped]
  [examen mcq]
  pièges : g1_abs_dropped

Vrai ou faux ?
  « Pour tout x ∈ ℝ, |x − 3| = x − 3. » → FAUX
    contre-exemple (refute) : x = 0
  [examen tf]
  pièges : g1_abs_dropped

```

## Valeur absolue : inéquations, y compris avec un 2e degré (`g1-abs-ineq`, Gymnase)

_|A| < B : encadrement ; |A| > B : « ou » ; sinon des cas._

### Niveau 1

```
Résous |x + 3| < 5.
  [guided]  |x + 3| < 5
    = −5 < x + 3 < 5   ← |A| < r ⇔ −r < A < r
    = □ < x < □   (trous : −8 < x < 2)   ← Ajouter −3
    = ]−8 ; 2[   ← Écrire l'intervalle
  aides : |A| < 5 ⇔ −5 < A < 5 : un encadrement. | −5 < x + 3 < 5 | −8 < x < 2
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |x − 1| ≤ 4.
  [guided]  |x − 1| ≤ 4
    = −4 ≤ x − 1 ≤ 4   ← |A| < r ⇔ −r < A < r
    = □ ≤ x ≤ □   (trous : −3 ≤ x ≤ 5)   ← Ajouter 1
    = [−3 ; 5]   ← Écrire l'intervalle
  aides : |A| ≤ 4 ⇔ −4 ≤ A ≤ 4 : un encadrement. | −4 ≤ x − 1 ≤ 4 | −3 ≤ x ≤ 5
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |x − 2| ≤ 1.
  [guided]  |x − 2| ≤ 1
    = −1 ≤ x − 2 ≤ 1   ← |A| < r ⇔ −r < A < r
    = □ ≤ x ≤ □   (trous : 1 ≤ x ≤ 3)   ← Ajouter 2
    = [1 ; 3]   ← Écrire l'intervalle
  aides : |A| ≤ 1 ⇔ −1 ≤ A ≤ 1 : un encadrement. | −1 ≤ x − 2 ≤ 1 | 1 ≤ x ≤ 3
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

```

### Niveau 2

```
Résous |3x + 1| > 5.
  [guided]  |3x + 1| > 5
    = 3x + 1 < □ ou 3x + 1 > 5   (trous : 3x + 1 < −5 ou 3x + 1 > 5)   ← |A| > r ⇔ A < −r ou A > r
    = x < −2 ou x > 4/3   ← Isoler x
    = ]−∞ ; −2[ ∪ ]4/3 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 3x + 1 < −5 ou 3x + 1 > 5 | x < −2 ou x > 4/3
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |2x + 1| ≥ 2.
  [guided]  |2x + 1| ≥ 2
    = 2x + 1 ≤ □ ou 2x + 1 ≥ 2   (trous : 2x + 1 ≤ −2 ou 2x + 1 ≥ 2)   ← |A| > r ⇔ A < −r ou A > r
    = x ≤ −3/2 ou x ≥ 1/2   ← Isoler x
    = ]−∞ ; −3/2] ∪ [1/2 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 2x + 1 ≤ −2 ou 2x + 1 ≥ 2 | x ≤ −3/2 ou x ≥ 1/2
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

Résous |2x + 6| ≥ 6.
  [guided]  |2x + 6| ≥ 6
    = 2x + 6 ≤ □ ou 2x + 6 ≥ 6   (trous : 2x + 6 ≤ −6 ou 2x + 6 ≥ 6)   ← |A| > r ⇔ A < −r ou A > r
    = x ≤ −6 ou x ≥ 0   ← Isoler x
    = ]−∞ ; −6] ∪ [0 ; +∞[   ← Écrire la réunion
  aides : |A| > r : A est loin de 0, d'un côté « ou » de l'autre. | 2x + 6 ≤ −6 ou 2x + 6 ≥ 6 | x ≤ −6 ou x ≥ 0
  pièges : g1_abs_dropped, g1_abs_and_or, g9_bracket

```

### Niveau 3

```
Résous x² − |2x + 4| < −3x − 2.
  [tap, suivre l'erreur, menu steps]  x² − |2x + 4| < −3x − 2
    (Cas x ≥ −2 :)
    = x² − (2x + 4) < −3x − 2   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 < 0   ← Réduire
    = ]−2 ; 1[   ← Résoudre
  — Cas x < −2 :  [juge solset]  départ : x² − |2x + 4| < −3x − 2
    = x² + (2x + 4) < −3x − 2   ← Ôter la valeur absolue dans ce cas
    = x² + 5x + 6 < 0   ← Réduire
    = ]−3 ; −2[   ← Résoudre
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−3 ; −2[ ∪ ]−2 ; 1[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ −2 : x² − (2x + 4) < −3x − 2 | Cas x ≥ −2 : solutions brutes ]−2 ; 1[, dans le cas : ]−2 ; 1[
  pièges : g1_abs_dropped, g9_bracket

Résous x² − |x − 1| < 2x + 1.
  [tap, suivre l'erreur, menu steps]  x² − |x − 1| < 2x + 1
    (Cas x ≥ 1 :)
    = x² − (x − 1) < 2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² − 3x < 0   ← Réduire
    = ]0 ; 3[   ← Résoudre
    = [1 ; 3[   ← Garder les solutions du cas
  — Cas x < 1 :  [juge solset]  départ : x² − |x − 1| < 2x + 1
    = x² + (x − 1) < 2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² − x − 2 < 0   ← Réduire
    = ]−1 ; 2[   ← Résoudre
    = ]−1 ; 1[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−1 ; 3[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 1 : x² − (x − 1) < 2x + 1 | Cas x ≥ 1 : solutions brutes ]0 ; 3[, dans le cas : [1 ; 3[
  pièges : g1_abs_dropped, g9_bracket

Résous x² − |3x| ≥ 2x.
  [tap, suivre l'erreur, menu steps]  x² − |3x| ≥ 2x
    (Cas x ≥ 0 :)
    = x² − (3x) ≥ 2x   ← Ôter la valeur absolue dans ce cas
    = x² − 5x ≥ 0   ← Réduire
    = ]−∞ ; 0] ∪ [5 ; +∞[   ← Résoudre
    = {0} ∪ [5 ; +∞[   ← Garder les solutions du cas
  — Cas x < 0 :  [juge solset]  départ : x² − |3x| ≥ 2x
    = x² + (3x) ≥ 2x   ← Ôter la valeur absolue dans ce cas
    = x² + x ≥ 0   ← Réduire
    = ]−∞ ; −1] ∪ [0 ; +∞[   ← Résoudre
    = ]−∞ ; −1]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −1] ∪ {0} ∪ [5 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 0 : x² − (3x) ≥ 2x | Cas x ≥ 0 : solutions brutes ]−∞ ; 0] ∪ [5 ; +∞[, dans le cas : {0} ∪ [5 ; +∞[
  pièges : g1_abs_dropped, g9_bracket

```

### Niveau 4

```
Résous x² + |3x − 6| ≤ 3x − 2.
  [free, suivre l'erreur]  x² + |3x − 6| ≤ 3x − 2
    (Cas x ≥ 2 :)
    = x² + (3x − 6) ≤ 3x − 2   ← Ôter la valeur absolue dans ce cas
    = x² − 4 ≤ 0   ← Réduire
    = [−2 ; 2]   ← Résoudre
    = {2}   ← Garder les solutions du cas
  — Cas x < 2 :  [juge solset]  départ : x² + |3x − 6| ≤ 3x − 2
    = x² − (3x − 6) ≤ 3x − 2   ← Ôter la valeur absolue dans ce cas
    = x² − 6x + 8 ≤ 0   ← Réduire
    = [2 ; 4]   ← Résoudre
    = ∅   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = {2}   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 2 : x² + (3x − 6) ≤ 3x − 2 | Cas x ≥ 2 : solutions brutes [−2 ; 2], dans le cas : {2}
  pièges : g1_abs_dropped

Résous x² − |2x − 6| ≥ 3x.
  [free, suivre l'erreur]  x² − |2x − 6| ≥ 3x
    (Cas x ≥ 3 :)
    = x² − (2x − 6) ≥ 3x   ← Ôter la valeur absolue dans ce cas
    = x² − 5x + 6 ≥ 0   ← Réduire
    = ]−∞ ; 2] ∪ [3 ; +∞[   ← Résoudre
    = [3 ; +∞[   ← Garder les solutions du cas
  — Cas x < 3 :  [juge solset]  départ : x² − |2x − 6| ≥ 3x
    = x² + (2x − 6) ≥ 3x   ← Ôter la valeur absolue dans ce cas
    = x² − x − 6 ≥ 0   ← Réduire
    = ]−∞ ; −2] ∪ [3 ; +∞[   ← Résoudre
    = ]−∞ ; −2]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −2] ∪ [3 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 3 : x² − (2x − 6) ≥ 3x | Cas x ≥ 3 : solutions brutes ]−∞ ; 2] ∪ [3 ; +∞[, dans le cas : [3 ; +∞[
  pièges : g1_abs_dropped, g9_bracket

Résous x² − |3x| ≥ x.
  [free, suivre l'erreur]  x² − |3x| ≥ x
    (Cas x ≥ 0 :)
    = x² − (3x) ≥ x   ← Ôter la valeur absolue dans ce cas
    = x² − 4x ≥ 0   ← Réduire
    = ]−∞ ; 0] ∪ [4 ; +∞[   ← Résoudre
    = {0} ∪ [4 ; +∞[   ← Garder les solutions du cas
  — Cas x < 0 :  [juge solset]  départ : x² − |3x| ≥ x
    = x² + (3x) ≥ x   ← Ôter la valeur absolue dans ce cas
    = x² + 2x ≥ 0   ← Réduire
    = ]−∞ ; −2] ∪ [0 ; +∞[   ← Résoudre
    = ]−∞ ; −2]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −2] ∪ {0} ∪ [4 ; +∞[   ← Réunir les cas
  aides : Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas. | Cas x ≥ 0 : x² − (3x) ≥ x | Cas x ≥ 0 : solutions brutes ]−∞ ; 0] ∪ [4 ; +∞[, dans le cas : {0} ∪ [4 ; +∞[
  pièges : g1_abs_dropped, g9_bracket

```

### Niveau 5

```
Résous x² − |3x| ≤ −2x.
  [free, sans aide]  x² − |3x| ≤ −2x
    (Cas x ≥ 0 :)
    = x² − (3x) ≤ −2x   ← Ôter la valeur absolue dans ce cas
    = x² − x ≤ 0   ← Réduire
    = [0 ; 1]   ← Résoudre
  — Cas x < 0 :  [juge solset]  départ : x² − |3x| ≤ −2x
    = x² + (3x) ≤ −2x   ← Ôter la valeur absolue dans ce cas
    = x² + 5x ≤ 0   ← Réduire
    = [−5 ; 0]   ← Résoudre
    = [−5 ; 0[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−5 ; 1]   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket

Résous x² − |3x + 3| ≥ 7.
  [free, sans aide]  x² − |3x + 3| ≥ 7
    (Cas x ≥ −1 :)
    = x² − (3x + 3) ≥ 7   ← Ôter la valeur absolue dans ce cas
    = x² − 3x − 10 ≥ 0   ← Réduire
    = ]−∞ ; −2] ∪ [5 ; +∞[   ← Résoudre
    = [5 ; +∞[   ← Garder les solutions du cas
  — Cas x < −1 :  [juge solset]  départ : x² − |3x + 3| ≥ 7
    = x² + (3x + 3) ≥ 7   ← Ôter la valeur absolue dans ce cas
    = x² + 3x − 4 ≥ 0   ← Réduire
    = ]−∞ ; −4] ∪ [1 ; +∞[   ← Résoudre
    = ]−∞ ; −4]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −4] ∪ [5 ; +∞[   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket

Résous x² − |2x − 6| ≥ −3x + 8.
  [free, sans aide]  x² − |2x − 6| ≥ −3x + 8
    (Cas x ≥ 3 :)
    = x² − (2x − 6) ≥ −3x + 8   ← Ôter la valeur absolue dans ce cas
    = x² + x − 2 ≥ 0   ← Réduire
    = ]−∞ ; −2] ∪ [1 ; +∞[   ← Résoudre
    = [3 ; +∞[   ← Garder les solutions du cas
  — Cas x < 3 :  [juge solset]  départ : x² − |2x − 6| ≥ −3x + 8
    = x² + (2x − 6) ≥ −3x + 8   ← Ôter la valeur absolue dans ce cas
    = x² + 5x − 14 ≥ 0   ← Réduire
    = ]−∞ ; −7] ∪ [2 ; +∞[   ← Résoudre
    = ]−∞ ; −7] ∪ [2 ; 3[   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −7] ∪ [2 ; +∞[   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket

```

### Variantes d'examen

```
Résous x² − |3x + 1| ≥ −2x + 1.
  [free, sans aide, examen open]  x² − |3x + 1| ≥ −2x + 1
    (Cas x ≥ −1/3 :)
    = x² − (3x + 1) ≥ −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² − x − 2 ≥ 0   ← Réduire
    = ]−∞ ; −1] ∪ [2 ; +∞[   ← Résoudre
    = [2 ; +∞[   ← Garder les solutions du cas
  — Cas x < −1/3 :  [juge solset]  départ : x² − |3x + 1| ≥ −2x + 1
    = x² + (3x + 1) ≥ −2x + 1   ← Ôter la valeur absolue dans ce cas
    = x² + 5x ≥ 0   ← Réduire
    = ]−∞ ; −5] ∪ [0 ; +∞[   ← Résoudre
    = ]−∞ ; −5]   ← Garder les solutions du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5] ∪ [2 ; +∞[   ← Réunir les cas
  pièges : g1_abs_dropped, g9_bracket

Ensemble des solutions de x² − |2x − 4| < −2x + 8 :
  ✔ ]−6 ; 2[   · ]−2 ; 2[   · ]−∞ ; −6] ∪ [2 ; +∞[
  [examen mcq]

```

## Équations irrationnelles (`g1-irr-eq`, Gymnase)

_√A = B ⇔ B ≥ 0 et A = B²._

### Niveau 1

```
Résous √(x + 5) = x + 3.
  [guided]  x + 3 ≥ 0 et x + 5 = (x + 3)²
    = x ≥ −3 et x² + 5x + □ = 0   (trous : x ≥ −3 et x² + 5x + 4 = 0)   ← Développer, tout d'un côté
    = x ≥ −3 et (x = □ ou x = □)   (trous : x ≥ −3 et (x = −1 ou x = −4))   ← Résoudre
    = {−1}   ← Trier : −4 ne vérifie pas x ≥ −3
  aides : Une racine carrée est ≥ 0 : il faut x + 3 ≥ 0. | x + 5 = (x + 3)², donc x² + 5x + 4 = 0 | x ≥ −3 et (x = −1 ou x = −4)
  pièges : g1_irr_extraneous, g9_union_inter

Résous √(x + 5) = −x − 3.
  [guided]  −x − 3 ≥ 0 et x + 5 = (−x − 3)²
    = x ≤ −3 et x² + 5x + □ = 0   (trous : x ≤ −3 et x² + 5x + 4 = 0)   ← Développer, tout d'un côté
    = x ≤ −3 et (x = □ ou x = □)   (trous : x ≤ −3 et (x = −4 ou x = −1))   ← Résoudre
    = {−4}   ← Trier : −1 ne vérifie pas x ≤ −3
  aides : Une racine carrée est ≥ 0 : il faut −x − 3 ≥ 0. | x + 5 = (−x − 3)², donc x² + 5x + 4 = 0 | x ≤ −3 et (x = −4 ou x = −1)
  pièges : g1_irr_extraneous, g9_union_inter

Résous √(−x + 8) = x − 2.
  [guided]  x − 2 ≥ 0 et −x + 8 = (x − 2)²
    = x ≥ 2 et x² − 3x − 4 = 0   ← Développer, tout d'un côté
    = x ≥ 2 et (x = □ ou x = □)   (trous : x ≥ 2 et (x = 4 ou x = −1))   ← Résoudre
    = {4}   ← Trier : −1 ne vérifie pas x ≥ 2
  aides : Une racine carrée est ≥ 0 : il faut x − 2 ≥ 0. | −x + 8 = (x − 2)², donc x² − 3x − 4 = 0 | x ≥ 2 et (x = 4 ou x = −1)
  pièges : g1_irr_extraneous, g9_union_inter

```

### Niveau 2

```
Résous √(−x + 5) = −x + 3.
  [guided]  √(−x + 5) = −x + 3
    = □ et −x + 5 = (−x + 3)²   (trous : −x + 3 ≥ 0 et −x + 5 = (−x + 3)²)   ← Condition B ≥ 0 et carré
    = x ≤ 3 et x² − 5x + 4 = 0   ← Développer, tout d'un côté
    = x ≤ 3 et (x = 1 ou x = 4)   ← Résoudre
    = {1}   ← Trier : 4 ne vérifie pas x ≤ 3
  aides : Une racine carrée est ≥ 0 : il faut −x + 3 ≥ 0. | −x + 5 = (−x + 3)², donc x² − 5x + 4 = 0 | x ≤ 3 et (x = 1 ou x = 4)
  pièges : g1_irr_extraneous

Résous √(4x + 13) = −x − 2.
  [guided]  √(4x + 13) = −x − 2
    = □ et 4x + 13 = (−x − 2)²   (trous : −x − 2 ≥ 0 et 4x + 13 = (−x − 2)²)   ← Condition B ≥ 0 et carré
    = x ≤ −2 et x² − 9 = 0   ← Développer, tout d'un côté
    = x ≤ −2 et (x = −3 ou x = 3)   ← Résoudre
    = {−3}   ← Trier : 3 ne vérifie pas x ≤ −2
  aides : Une racine carrée est ≥ 0 : il faut −x − 2 ≥ 0. | 4x + 13 = (−x − 2)², donc x² − 9 = 0 | x ≤ −2 et (x = −3 ou x = 3)
  pièges : g1_irr_extraneous

Résous √(x + 4) = x + 2.
  [guided]  √(x + 4) = x + 2
    = □ et x + 4 = (x + 2)²   (trous : x + 2 ≥ 0 et x + 4 = (x + 2)²)   ← Condition B ≥ 0 et carré
    = x ≥ −2 et x² + 3x = 0   ← Développer, tout d'un côté
    = x ≥ −2 et (x = 0 ou x = −3)   ← Résoudre
    = {0}   ← Trier : −3 ne vérifie pas x ≥ −2
  aides : Une racine carrée est ≥ 0 : il faut x + 2 ≥ 0. | x + 4 = (x + 2)², donc x² + 3x = 0 | x ≥ −2 et (x = 0 ou x = −3)
  pièges : g1_irr_extraneous

```

### Niveau 3

```
Résous √(2x + 3) = x.
  [tap, suivre l'erreur, menu steps]  √(2x + 3) = x
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire x ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = x ≥ 0 et 2x + 3 = x²   ← Condition B ≥ 0 et carré
    = x ≥ 0 et x² − 2x − 3 = 0   ← Développer, tout d'un côté
    = x ≥ 0 et (x = 3 ou x = −1)   ← Résoudre
    = {3}   ← Trier : −1 ne vérifie pas x ≥ 0
  aides : Une racine carrée est ≥ 0 : il faut x ≥ 0. | 2x + 3 = (x)², donc x² − 2x − 3 = 0 | x ≥ 0 et (x = 3 ou x = −1)
  pièges : g1_irr_extraneous

Résous √(2x + 17) = x + 1.
  [tap, suivre l'erreur, menu steps]  √(2x + 17) = x + 1
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire x + 1 ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = x + 1 ≥ 0 et 2x + 17 = (x + 1)²   ← Condition B ≥ 0 et carré
    = x ≥ −1 et x² − 16 = 0   ← Développer, tout d'un côté
    = x ≥ −1 et (x = 4 ou x = −4)   ← Résoudre
    = {4}   ← Trier : −4 ne vérifie pas x ≥ −1
  aides : Une racine carrée est ≥ 0 : il faut x + 1 ≥ 0. | 2x + 17 = (x + 1)², donc x² − 16 = 0 | x ≥ −1 et (x = 4 ou x = −4)
  pièges : g1_irr_extraneous

Résous √(x + 13) = −x − 1.
  [tap, suivre l'erreur, menu steps]  √(x + 13) = −x − 1
    ? Comment te débarrasses-tu de la racine ? ✔ Écrire −x − 1 ≥ 0, puis élever au carré / ✔ Élever au carré directement
    = −x − 1 ≥ 0 et x + 13 = (−x − 1)²   ← Condition B ≥ 0 et carré
    = x ≤ −1 et x² + x − 12 = 0   ← Développer, tout d'un côté
    = x ≤ −1 et (x = −4 ou x = 3)   ← Résoudre
    = {−4}   ← Trier : 3 ne vérifie pas x ≤ −1
  aides : Une racine carrée est ≥ 0 : il faut −x − 1 ≥ 0. | x + 13 = (−x − 1)², donc x² + x − 12 = 0 | x ≤ −1 et (x = −4 ou x = 3)
  pièges : g1_irr_extraneous

```

### Niveau 4

```
Résous √(−4x + 17) = x − 3.
  [free, suivre l'erreur]  √(−4x + 17) = x − 3
    = x − 3 ≥ 0 et −4x + 17 = (x − 3)²   ← Condition B ≥ 0 et carré
    = x ≥ 3 et x² − 2x − 8 = 0   ← Développer, tout d'un côté
    = x ≥ 3 et (x = 4 ou x = −2)   ← Résoudre
    = {4}   ← Trier : −2 ne vérifie pas x ≥ 3
  aides : Une racine carrée est ≥ 0 : il faut x − 3 ≥ 0. | −4x + 17 = (x − 3)², donc x² − 2x − 8 = 0 | x ≥ 3 et (x = 4 ou x = −2)
  pièges : g1_irr_extraneous

Résous √(x + 5) + √x = 5.
  [free, suivre l'erreur]  √(x + 5) + √x = 5
    = √(x + 5) = 5 − √x   ← Isoler une racine
    = 5 − √x ≥ 0 et x + 5 = 25 − 10√x + x   ← Condition et carré
    = √x ≤ 5 et 10√x = 20   ← Réduire
    = √x = 2   ← Diviser
    = x = 4   ← Élever au carré
  aides : Isole d'abord une racine, puis élève au carré avec la condition. | √(x + 5) = 5 − √x | √x ≤ 5 et 10√x = 20

Résous √(−4x + 4) = x − 1.
  [free, suivre l'erreur]  √(−4x + 4) = x − 1
    = x − 1 ≥ 0 et −4x + 4 = (x − 1)²   ← Condition B ≥ 0 et carré
    = x ≥ 1 et x² + 2x − 3 = 0   ← Développer, tout d'un côté
    = x ≥ 1 et (x = 1 ou x = −3)   ← Résoudre
    = {1}   ← Trier : −3 ne vérifie pas x ≥ 1
  aides : Une racine carrée est ≥ 0 : il faut x − 1 ≥ 0. | −4x + 4 = (x − 1)², donc x² + 2x − 3 = 0 | x ≥ 1 et (x = 1 ou x = −3)
  pièges : g1_irr_extraneous

```

### Niveau 5

```
Donne le domaine de √(x² − 1), puis résous √(x² − 1) = x + 3.
  [free, sans aide]  √(x² − 1)
    (Domaine de la racine :)
    = x² − 1 ≥ 0   ← Radicande ≥ 0
    = (x + 1)(x − 1) ≥ 0   ← Factoriser
    = ]−∞ ; −1] ∪ [1 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² − 1) = x + 3
    = x + 3 ≥ 0 et x² − 1 = (x + 3)²   ← Condition et carré
    = x ≥ −3 et −6x = 10   ← Les x² s'en vont
    = x ≥ −3 et x = −5/3   ← Résoudre
    = {−5/3}   ← La condition est vérifiée

Donne le domaine de √(x² − 8x + 15), puis résous √(x² − 8x + 15) = x − 3.
  [free, sans aide]  √(x² − 8x + 15)
    (Domaine de la racine :)
    = x² − 8x + 15 ≥ 0   ← Radicande ≥ 0
    = (x − 3)(x − 5) ≥ 0   ← Factoriser
    = ]−∞ ; 3] ∪ [5 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² − 8x + 15) = x − 3
    = x − 3 ≥ 0 et x² − 8x + 15 = (x − 3)²   ← Condition et carré
    = x ≥ 3 et −2x = −6   ← Les x² s'en vont
    = x ≥ 3 et x = 3   ← Résoudre
    = {3}   ← La condition est vérifiée

Donne le domaine de √(x² + 2x), puis résous √(x² + 2x) = x + 2.
  [free, sans aide]  √(x² + 2x)
    (Domaine de la racine :)
    = x² + 2x ≥ 0   ← Radicande ≥ 0
    = (x + 2)x ≥ 0   ← Factoriser
    = ]−∞ ; −2] ∪ [0 ; +∞[   ← Signe du trinôme
  — Équation :  [juge solset]  départ : √(x² + 2x) = x + 2
    = x + 2 ≥ 0 et x² + 2x = (x + 2)²   ← Condition et carré
    = x ≥ −2 et −2x = 4   ← Les x² s'en vont
    = x ≥ −2 et x = −2   ← Résoudre
    = {−2}   ← La condition est vérifiée

```

### Variantes d'examen

```
Ensemble des solutions de √(x − 3) = −x + 3 :
  · {4}   ✔ {3}   · {3 ; 4} [g1_irr_extraneous]   · ∅
  [examen mcq]
  pièges : g1_irr_extraneous

Vrai ou faux ?
  « Pour tous a, b ∈ ℝ, si a² = b², alors a = b. » → FAUX
    contre-exemple (refute) : a = -2, b = 2
  [examen tf]
  pièges : g1_irr_extraneous

```

## Inéquations irrationnelles (`g1-irr-ineq`, CMS)

_Les signes avant d'élever au carré._

### Niveau 1

```
Résous √(x + 1) ≤ x − 1.
  [guided]  √(x + 1) ≤ x − 1
    = x + 1 ≥ 0 et x − 1 ≥ 0 et x + 1 ≤ (x − 1)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −1 et x ≥ 1 et □ ≥ 0   (trous : x ≥ −1 et x ≥ 1 et x² − 3x ≥ 0)   ← Simplifier
    = x ≥ −1 et x ≥ 1 et (x ≤ 0 ou x ≥ 3)   ← Signe du trinôme
    = [3 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 1 ≥ 0 et x − 1 ≥ 0 et x + 1 ≤ (x − 1)² | x + 1 ≥ 0 et x − 1 ≥ 0 et x + 1 ≤ (x − 1)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 8) ≤ x + 2.
  [guided]  √(x + 8) ≤ x + 2
    = x + 8 ≥ 0 et x + 2 ≥ 0 et x + 8 ≤ (x + 2)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −8 et x ≥ −2 et □ ≥ 0   (trous : x ≥ −8 et x ≥ −2 et x² + 3x − 4 ≥ 0)   ← Simplifier
    = x ≥ −8 et x ≥ −2 et (x ≤ −4 ou x ≥ 1)   ← Signe du trinôme
    = [1 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 8 ≥ 0 et x + 2 ≥ 0 et x + 8 ≤ (x + 2)² | x + 8 ≥ 0 et x + 2 ≥ 0 et x + 8 ≤ (x + 2)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 3) ≤ x + 1.
  [guided]  √(x + 3) ≤ x + 1
    = x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −3 et x ≥ −1 et □ ≥ 0   (trous : x ≥ −3 et x ≥ −1 et x² + x − 2 ≥ 0)   ← Simplifier
    = x ≥ −3 et x ≥ −1 et (x ≤ −2 ou x ≥ 1)   ← Signe du trinôme
    = [1 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)² | x + 3 ≥ 0 et x + 1 ≥ 0 et x + 3 ≤ (x + 1)²
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 2

```
Résous √(x + 13) ≥ x + 1.
  [guided]  √(x + 13) ≥ x + 1
    (Cas x + 1 < 0 :)
    = x + 13 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−13 ; −1[   ← Garder les x du cas
  — Cas x + 1 ≥ 0 :  [juge solset]  départ : √(x + 13) ≥ x + 1
    = x + 13 ≥ (x + 1)²   ← B ≥ 0 : élever au carré
    = x² + x − 12 ≤ 0   ← Réduire
    = [−4 ; 3]   ← Signe du trinôme
    = [−1 ; 3]   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−13 ; 3]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x + 1 < 0 : vrai dès que x + 13 ≥ 0. | x + 13 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

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

Résous √(x + 5) ≥ x + 3.
  [guided]  √(x + 5) ≥ x + 3
    (Cas x + 3 < 0 :)
    = x + 5 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [−5 ; −3[   ← Garder les x du cas
  — Cas x + 3 ≥ 0 :  [juge solset]  départ : √(x + 5) ≥ x + 3
    = x + 5 ≥ (x + 3)²   ← B ≥ 0 : élever au carré
    = x² + 5x + 4 ≤ 0   ← Réduire
    = [−4 ; −1]   ← Signe du trinôme
    = [−3 ; −1]   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [−5 ; −1]   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x + 3 < 0 : vrai dès que x + 5 ≥ 0. | x + 5 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 3

```
Résous √(x − 1) > x − 3.
  [tap, suivre l'erreur, menu steps]  √(x − 1) > x − 3
    (Cas x − 3 < 0 :)
    ? Comment commences-tu ? · Élever au carré directement / ✔ Deux cas, selon le signe du membre sans racine
    = x − 1 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = [1 ; 3[   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x − 1) > x − 3
    = x − 1 > (x − 3)²   ← B ≥ 0 : élever au carré
    = x² − 7x + 10 < 0   ← Réduire
    = ]2 ; 5[   ← Signe du trinôme
    = [3 ; 5[   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = [1 ; 5[   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 3 < 0 : vrai dès que x − 1 ≥ 0. | x − 1 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 4) ≤ x − 2.
  [tap, suivre l'erreur, menu steps]  √(x + 4) ≤ x − 2
    ? Comment commences-tu ? · Élever au carré directement / ✔ Écrire les conditions de signe, puis élever au carré
    = x + 4 ≥ 0 et x − 2 ≥ 0 et x + 4 ≤ (x − 2)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −4 et x ≥ 2 et x² − 5x ≥ 0   ← Simplifier
    = x ≥ −4 et x ≥ 2 et (x ≤ 0 ou x ≥ 5)   ← Signe du trinôme
    = [5 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 4 ≥ 0 et x − 2 ≥ 0 et x + 4 ≤ (x − 2)² | x + 4 ≥ 0 et x − 2 ≥ 0 et x + 4 ≤ (x − 2)²
  pièges : g1_square_no_cond, g9_bracket

Résous √(x + 3) ≤ x − 3.
  [tap, suivre l'erreur, menu steps]  √(x + 3) ≤ x − 3
    ? Comment commences-tu ? · Élever au carré directement / ✔ Écrire les conditions de signe, puis élever au carré
    = x + 3 ≥ 0 et x − 3 ≥ 0 et x + 3 ≤ (x − 3)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = x ≥ −3 et x ≥ 3 et x² − 7x + 6 ≥ 0   ← Simplifier
    = x ≥ −3 et x ≥ 3 et (x ≤ 1 ou x ≥ 6)   ← Signe du trinôme
    = [6 ; +∞[   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x + 3 ≥ 0 et x − 3 ≥ 0 et x + 3 ≤ (x − 3)² | x + 3 ≥ 0 et x − 3 ≥ 0 et x + 3 ≤ (x − 3)²
  pièges : g1_square_no_cond, g9_bracket

```

### Niveau 4

```
Résous √(x² − 5x + 6) > x − 3.
  [free, suivre l'erreur]  √(x² − 5x + 6) > x − 3
    (Cas x − 3 < 0 :)
    = x² − 5x + 6 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; 2] ∪ [3 ; +∞[   ← Signe du trinôme
    = ]−∞ ; 2]   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x² − 5x + 6) > x − 3
    = x² − 5x + 6 > (x − 3)²   ← B ≥ 0 : élever au carré
    = x > 3   ← Les x² s'en vont
    = ]3 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; 2] ∪ ]3 ; +∞[   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 3 < 0 : vrai dès que x² − 5x + 6 ≥ 0. | x² − 5x + 6 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x² − 3x − 4) > x − 3.
  [free, suivre l'erreur]  √(x² − 3x − 4) > x − 3
    (Cas x − 3 < 0 :)
    = x² − 3x − 4 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −1] ∪ [4 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −1]   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x² − 3x − 4) > x − 3
    = x² − 3x − 4 > (x − 3)²   ← B ≥ 0 : élever au carré
    = 3x > 13   ← Les x² s'en vont
    = ]13/3 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −1] ∪ ]13/3 ; +∞[   ← Réunir
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | Cas x − 3 < 0 : vrai dès que x² − 3x − 4 ≥ 0. | x² − 3x − 4 ≥ 0
  pièges : g1_square_no_cond, g9_bracket

Résous √(x² − 5x + 6) ≤ x − 3.
  [free, suivre l'erreur]  √(x² − 5x + 6) ≤ x − 3
    = x² − 5x + 6 ≥ 0 et x − 3 ≥ 0 et x² − 5x + 6 ≤ (x − 3)²   ← A ≥ 0, B ≥ 0 et A ≤ B²
    = (x ≤ 2 ou x ≥ 3) et x ≥ 3 et x ≤ 3   ← Signe du trinôme ; les x² s'en vont
    = {3}   ← Intersecter
  aides : Une racine est ≥ 0. On n'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas. | x² − 5x + 6 ≥ 0 et x − 3 ≥ 0 et x² − 5x + 6 ≤ (x − 3)² | x² − 5x + 6 ≥ 0 et x − 3 ≥ 0 et x² − 5x + 6 ≤ (x − 3)²
  pièges : g1_square_no_cond

```

### Niveau 5

```
Résous √(x² + 7x + 10) > x − 1.
  [free, sans aide]  √(x² + 7x + 10) > x − 1
    (Cas x − 1 < 0 :)
    = x² + 7x + 10 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −5] ∪ [−2 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −5] ∪ [−2 ; 1[   ← Garder les x du cas
  — Cas x − 1 ≥ 0 :  [juge solset]  départ : √(x² + 7x + 10) > x − 1
    = x² + 7x + 10 > (x − 1)²   ← B ≥ 0 : élever au carré
    = 9x > −9   ← Les x² s'en vont
    = ]−1 ; +∞[   ← Isoler x
    = [1 ; +∞[   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5] ∪ [−2 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket

Résous √(x² + x − 20) > x.
  [free, sans aide]  √(x² + x − 20) > x
    (Cas x < 0 :)
    = x² + x − 20 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −5] ∪ [4 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −5]   ← Garder les x du cas
  — Cas x ≥ 0 :  [juge solset]  départ : √(x² + x − 20) > x
    = x² + x − 20 > x²   ← B ≥ 0 : élever au carré
    = x > 20   ← Les x² s'en vont
    = ]20 ; +∞[   ← Isoler x
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5] ∪ ]20 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket

Résous √(x² + 3x − 10) > x + 2.
  [free, sans aide]  √(x² + 3x − 10) > x + 2
    (Cas x + 2 < 0 :)
    = x² + 3x − 10 ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; −5] ∪ [2 ; +∞[   ← Signe du trinôme
    = ]−∞ ; −5]   ← Garder les x du cas
  — Cas x + 2 ≥ 0 :  [juge solset]  départ : √(x² + 3x − 10) > x + 2
    = x² + 3x − 10 > (x + 2)²   ← B ≥ 0 : élever au carré
    = −x > 14   ← Les x² s'en vont
    = ]−∞ ; −14[   ← Isoler x
    = ∅   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; −5]   ← Réunir
  pièges : g1_square_no_cond, g9_bracket

```

### Variantes d'examen

```
Résous √(x² − x) > x − 3.
  [free, sans aide, examen open]  √(x² − x) > x − 3
    (Cas x − 3 < 0 :)
    = x² − x ≥ 0   ← B < 0 : vrai dès que la racine existe
    = ]−∞ ; 0] ∪ [1 ; +∞[   ← Signe du trinôme
    = ]−∞ ; 0] ∪ [1 ; 3[   ← Garder les x du cas
  — Cas x − 3 ≥ 0 :  [juge solset]  départ : √(x² − x) > x − 3
    = x² − x > (x − 3)²   ← B ≥ 0 : élever au carré
    = 5x > 9   ← Les x² s'en vont
    = ]9/5 ; +∞[   ← Isoler x
    = [3 ; +∞[   ← Garder les x du cas
  — Réunion :  [juge solset]  départ : S_1 ∪ S_2
    = ]−∞ ; 0] ∪ [1 ; +∞[   ← Réunir
  pièges : g1_square_no_cond, g9_bracket

Ensemble des solutions de √(x + 4) > x + 2 :
  · ]−3 ; 0[ [g1_square_no_cond]   ✔ [−4 ; 0[   · [−3 ; 0]   · [0 ; +∞[
  [examen mcq]
  pièges : g1_square_no_cond

```

## Majorer ou minorer une expression (`g1-bound`, CMS)

_Majorer chaque facteur, minorer le dénominateur._

### Niveau 1

```
Montre que si x ∈ [0 ; 2], alors |(x² − 3)/(x + 3)| ≤ 1. Écris une chaîne de majorations.
  [guided]  |(x² − 3)/(x + 3)|
    = |x² − 3|/(x + 3)   ← x + 3 > 0 sur l'intervalle
    = 3/(x + 3)   ← x² ∈ [0 ; 4], donc |x² − 3| ≤ 3
    = □   (trous : 1)   ← x + 3 ≥ 3
  aides : Majore le numérateur et minore le dénominateur. | |x² − 3|/(x + 3) | 3/(x + 3)
  pièges : g1_bound_denominator

Montre que si x ∈ [3/2 ; 5/2], alors |(x² − 5)/x| ≤ 11/6. Écris une chaîne de majorations.
  [guided]  |(x² − 5)/x|
    = |x² − 5|/x   ← x > 0 sur l'intervalle
    = (11/4)/x   ← x² ∈ [9/4 ; 25/4], donc |x² − 5| ≤ 11/4
    = □   (trous : 11/6)   ← x ≥ 3/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 5|/x | (11/4)/x
  pièges : g1_bound_denominator

Montre que si |x + 1| ≤ 1, alors |x² − 2x − 3| ≤ 5. Écris une chaîne de majorations.
  [guided]  |x² − 2x − 3|
    = |x + 1|·|x − 3|   ← Factoriser
    = 1·|x − 3|   ← |x + 1| ≤ 1
    = □   (trous : 5)   ← x ∈ [−2 ; 0], donc |x − 3| ≤ 5
  aides : Fais apparaître |x + 1|, que tu sais majorer. | |x + 1|·|x − 3| | 1·|x − 3|
  pièges : g1_triangle_reverse

```

### Niveau 2

```
Montre que si |x − 1| ≤ 1/2, alors |x² − 3x + 2| ≤ 1. Écris une chaîne de majorations.
  [guided]  |x² − 3x + 2|
    = |x − 1|·|x − 2|   ← Factoriser
    ? Comment majorer |x − 1| ? ✔ Par 1/2, l'hypothèse / · Par 3/2
    = (1/2)·|x − 2|   ← |x − 1| ≤ 1/2
    ? Comment majorer |x − 2| sur [1/2 ; 3/2] ? ✔ Par sa plus grande valeur sur l'intervalle, 3/2 / · Par sa plus petite valeur sur l'intervalle
    = 3/4   ← x ∈ [1/2 ; 3/2], donc |x − 2| ≤ 3/2
  aides : Fais apparaître |x − 1|, que tu sais majorer. | |x − 1|·|x − 2| | (1/2)·|x − 2|
  pièges : g1_triangle_reverse

Montre que si |x − 3| ≤ 1, alors |x² − x − 6| ≤ 6. Écris une chaîne de majorations.
  [guided]  |x² − x − 6|
    = |x − 3|·|x + 2|   ← Factoriser
    ? Comment majorer |x − 3| ? ✔ Par 1, l'hypothèse / · Par 4
    = 1·|x + 2|   ← |x − 3| ≤ 1
    ? Comment majorer |x + 2| sur [2 ; 4] ? ✔ Par sa plus grande valeur sur l'intervalle, 6 / · Par sa plus petite valeur sur l'intervalle
    = 6   ← x ∈ [2 ; 4], donc |x + 2| ≤ 6
  aides : Fais apparaître |x − 3|, que tu sais majorer. | |x − 3|·|x + 2| | 1·|x + 2|
  pièges : g1_triangle_reverse

Montre que si |x − 3| ≤ 1/2, alors |x² − 3x| ≤ 2. Écris une chaîne de majorations.
  [guided]  |x² − 3x|
    = |x − 3|·|x|   ← Factoriser
    ? Comment majorer |x − 3| ? ✔ Par 1/2, l'hypothèse / · Par 7/2
    = (1/2)·|x|   ← |x − 3| ≤ 1/2
    ? Comment majorer |x| sur [5/2 ; 7/2] ? ✔ Par sa plus grande valeur sur l'intervalle, 7/2 / · Par sa plus petite valeur sur l'intervalle
    = 7/4   ← x ∈ [5/2 ; 7/2], donc |x| ≤ 7/2
  aides : Fais apparaître |x − 3|, que tu sais majorer. | |x − 3|·|x| | (1/2)·|x|
  pièges : g1_triangle_reverse

```

### Niveau 3

```
Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 7)/(x + 3)| ≤ 21/22. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |(x² − 7)/(x + 3)|
    = |x² − 7|/(x + 3)   ← x + 3 > 0 sur l'intervalle
    = (21/4)/(x + 3)   ← x² ∈ [25/4 ; 49/4], donc |x² − 7| ≤ 21/4
    = 21/22   ← x + 3 ≥ 11/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 7|/(x + 3) | (21/4)/(x + 3)
  pièges : g1_bound_denominator

Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 3)/(x + 3)| ≤ 37/22. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |(x² − 3)/(x + 3)|
    = |x² − 3|/(x + 3)   ← x + 3 > 0 sur l'intervalle
    = (37/4)/(x + 3)   ← x² ∈ [25/4 ; 49/4], donc |x² − 3| ≤ 37/4
    = 37/22   ← x + 3 ≥ 11/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 3|/(x + 3) | (37/4)/(x + 3)
  pièges : g1_bound_denominator

Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 7)/x| ≤ 21/10. Écris une chaîne de majorations.
  [tap, suivre l'erreur, menu steps]  |(x² − 7)/x|
    = |x² − 7|/x   ← x > 0 sur l'intervalle
    = (21/4)/x   ← x² ∈ [25/4 ; 49/4], donc |x² − 7| ≤ 21/4
    = 21/10   ← x ≥ 5/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 7|/x | (21/4)/x
  pièges : g1_bound_denominator

```

### Niveau 4

```
Montre que si x ∈ [3/2 ; 5/2], alors |(x² − 2)/(x + 1)| ≤ 17/10. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |(x² − 2)/(x + 1)|
    = |x² − 2|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = (17/4)/(x + 1)   ← x² ∈ [9/4 ; 25/4], donc |x² − 2| ≤ 17/4
    = 17/10   ← x + 1 ≥ 5/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 2|/(x + 1) | (17/4)/(x + 1)
  pièges : g1_bound_denominator

Montre que si x ∈ [3/2 ; 5/2], alors |(x² − 8)/(x + 3)| ≤ 23/18. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |(x² − 8)/(x + 3)|
    = |x² − 8|/(x + 3)   ← x + 3 > 0 sur l'intervalle
    = (23/4)/(x + 3)   ← x² ∈ [9/4 ; 25/4], donc |x² − 8| ≤ 23/4
    = 23/18   ← x + 3 ≥ 9/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 8|/(x + 3) | (23/4)/(x + 3)
  pièges : g1_bound_denominator

Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 5)/x| ≤ 29/10. Écris une chaîne de majorations.
  [free, suivre l'erreur]  |(x² − 5)/x|
    = |x² − 5|/x   ← x > 0 sur l'intervalle
    = (29/4)/x   ← x² ∈ [25/4 ; 49/4], donc |x² − 5| ≤ 29/4
    = 29/10   ← x ≥ 5/2
  aides : Majore le numérateur et minore le dénominateur. | |x² − 5|/x | (29/4)/x
  pièges : g1_bound_denominator

```

### Niveau 5

```
Trouve une constante C telle que |x² + x − 2| ≤ C pour |x + 2| ≤ 1/2.
  [free, sans aide]  |x² + x − 2|
    = |x + 2|·|x − 1|   ← Factoriser
    = (1/2)·|x − 1|   ← |x + 2| ≤ 1/2
    = 7/4   ← x ∈ [−5/2 ; −3/2], donc |x − 1| ≤ 7/2
  pièges : g1_triangle_reverse

Trouve une constante C telle que |x² − x − 6| ≤ C pour |x − 3| ≤ 1/2.
  [free, sans aide]  |x² − x − 6|
    = |x − 3|·|x + 2|   ← Factoriser
    = (1/2)·|x + 2|   ← |x − 3| ≤ 1/2
    = 11/4   ← x ∈ [5/2 ; 7/2], donc |x + 2| ≤ 11/2
  pièges : g1_triangle_reverse

Trouve une constante C telle que |(x² − 4)/(x + 3)| ≤ C pour x ∈ [0 ; 2].
  [free, sans aide]  |(x² − 4)/(x + 3)|
    = |x² − 4|/(x + 3)   ← x + 3 > 0 sur l'intervalle
    = 4/(x + 3)   ← x² ∈ [0 ; 4], donc |x² − 4| ≤ 4
    = 4/3   ← x + 3 ≥ 3
  pièges : g1_bound_denominator

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si x ∈ [1 ; 3], alors 1/(x² + 1) ≤ 1/2. » → VRAI
  [examen tf]

Montre que si x ∈ [5/2 ; 7/2], alors |(x² − 4)/(x + 1)| ≤ 33/14. Écris une chaîne de majorations.
  [free, sans aide, examen open]  |(x² − 4)/(x + 1)|
    = |x² − 4|/(x + 1)   ← x + 1 > 0 sur l'intervalle
    = (33/4)/(x + 1)   ← x² ∈ [25/4 ; 49/4], donc |x² − 4| ≤ 33/4
    = 33/14   ← x + 1 ≥ 7/2
  pièges : g1_bound_denominator

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
