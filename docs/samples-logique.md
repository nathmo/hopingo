# Exemples de questions — Logique et langage

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Ensembles : écrire et opérer (`g9-sets`, Gymnase)

_En extension, en compréhension ; ∩, ∪, ∖._

### Niveau 1

```
Écris en extension {n ∈ ℕ | 2n − 3 < 4}.
  [guided]  {n ∈ ℕ | 2n − 3 < 4}
    = 2n < □   (trous : 2n < 7)   ← Ajouter 3
    = n < □   (trous : n < 7/2)   ← Diviser par 2
    = {□ ; □ ; 2 ; 3}   (trous : {0 ; 1 ; 2 ; 3})   ← Garder les entiers naturels
  aides : Résous d'abord la condition, puis garde les entiers permis. | 2n < 7 | {0 ; 1 ; 2 ; 3}

Écris en extension {n ∈ ℕ | 4n − 1 < 14}.
  [guided]  {n ∈ ℕ | 4n − 1 < 14}
    = 4n < □   (trous : 4n < 15)   ← Ajouter 1
    = n < □   (trous : n < 15/4)   ← Diviser par 4
    = {0 ; □ ; 2 ; □}   (trous : {0 ; 1 ; 2 ; 3})   ← Garder les entiers naturels
  aides : Résous d'abord la condition, puis garde les entiers permis. | 4n < 15 | {0 ; 1 ; 2 ; 3}

Écris en extension {x ∈ ℤ | x² ≤ 2}.
  [guided]  {x ∈ ℤ | x² ≤ 2}
    = □ ≤ x ≤ □   (trous : −1 ≤ x ≤ 1)   ← x² ≤ 2 et x entier : |x| ≤ 1
    = {□ ; 0 ; □}   (trous : {−1 ; 0 ; 1})   ← Lister
  aides : Résous d'abord la condition, puis garde les entiers permis. | −1 ≤ x ≤ 1 | {−1 ; 0 ; 1}

```

### Niveau 2

```
Écris en extension {n ∈ ℕ | n + 4 < 10}.
  [guided]  {n ∈ ℕ | n + 4 < 10}
    = n < □   (trous : n < 6)   ← Soustraire 4
    = {0 ; 1 ; 2 ; 3 ; 4 ; 5}   ← Garder les entiers naturels
  aides : Résous d'abord la condition, puis garde les entiers permis. | n < 6 | {0 ; 1 ; 2 ; 3 ; 4 ; 5}

Écris en extension {x ∈ ℤ | x² ≤ 11}.
  [guided]  {x ∈ ℤ | x² ≤ 11}
    = □ ≤ x ≤ □   (trous : −3 ≤ x ≤ 3)   ← x² ≤ 11 et x entier : |x| ≤ 3
    = {−3 ; −2 ; −1 ; 0 ; 1 ; 2 ; 3}   ← Lister
  aides : Résous d'abord la condition, puis garde les entiers permis. | −3 ≤ x ≤ 3 | {−3 ; −2 ; −1 ; 0 ; 1 ; 2 ; 3}

Écris en extension {x ∈ ℤ | x² ≤ 8}.
  [guided]  {x ∈ ℤ | x² ≤ 8}
    = □ ≤ x ≤ □   (trous : −2 ≤ x ≤ 2)   ← x² ≤ 8 et x entier : |x| ≤ 2
    = {−2 ; −1 ; 0 ; 1 ; 2}   ← Lister
  aides : Résous d'abord la condition, puis garde les entiers permis. | −2 ≤ x ≤ 2 | {−2 ; −1 ; 0 ; 1 ; 2}

```

### Niveau 3

```
Écris en extension {2n − 3 | n ∈ ℕ et n ≤ 3}.
  [tap, suivre l'erreur, menu solset]  {2n − 3 | n ∈ ℕ et n ≤ 3}
    = {2·0 − 3 ; 2·1 − 3 ; 2·2 − 3 ; 2·3 − 3}   ← Remplacer n par 0, 1, 2…
    = {−3 ; −1 ; 1 ; 3}   ← Calculer
  aides : Remplace n par chaque entier permis : les éléments sont les valeurs obtenues, pas les n. | {2·0 − 3 ; 2·1 − 3 ; 2·2 − 3 ; 2·3 − 3} | {−3 ; −1 ; 1 ; 3}
  pièges : g9_set_builder, g9_union_inter

Écris en extension {2n + 2 | n ∈ ℕ et n ≤ 2}.
  [tap, suivre l'erreur, menu solset]  {2n + 2 | n ∈ ℕ et n ≤ 2}
    = {2·0 + 2 ; 2·1 + 2 ; 2·2 + 2}   ← Remplacer n par 0, 1, 2…
    = {2 ; 4 ; 6}   ← Calculer
  aides : Remplace n par chaque entier permis : les éléments sont les valeurs obtenues, pas les n. | {2·0 + 2 ; 2·1 + 2 ; 2·2 + 2} | {2 ; 4 ; 6}
  pièges : g9_set_builder, g9_union_inter

Écris en extension {n ∈ ℕ | 3n − 2 < 8}.
  [tap, suivre l'erreur, menu solset]  {n ∈ ℕ | 3n − 2 < 8}
    = 3n < 10   ← Ajouter 2
    = n < 10/3   ← Diviser par 3
    = {0 ; 1 ; 2 ; 3}   ← Garder les entiers naturels
  aides : Résous d'abord la condition, puis garde les entiers permis. | 3n < 10 | {0 ; 1 ; 2 ; 3}

```

### Niveau 4

```
Soit A = {n ∈ ℕ | 3n − 3 < 21} et B = {2k | k ∈ ℕ}. Écris A en extension, puis calcule A ∖ B.
  [free, suivre l'erreur]  {n ∈ ℕ | 3n − 3 < 21}
    = 3n < 24   ← Ajouter 3
    = n < 8   ← Diviser par 3
    = {0 ; 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7}   ← Garder les entiers naturels
  — Avec B = {2k | k ∈ ℕ}, calcule A ∖ B.  [juge solset]  départ : A ∖ B
    = {1 ; 3 ; 5 ; 7}   ← Opérer
  aides : Résous d'abord la condition, puis garde les entiers permis. | 3n < 24 | {0 ; 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7}

Soit A = {n ∈ ℕ | n + 3 ≤ 8} et B = {n ∈ ℕ | 6 ≤ n ≤ 8}. Écris A en extension, puis calcule A ∪ B.
  [free, suivre l'erreur]  {n ∈ ℕ | n + 3 ≤ 8}
    = n ≤ 5   ← Soustraire 3
    = {0 ; 1 ; 2 ; 3 ; 4 ; 5}   ← Garder les entiers naturels
  — Avec B = {n ∈ ℕ | 6 ≤ n ≤ 8}, calcule A ∪ B.  [juge solset]  départ : A ∪ B
    = {0 ; 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8}   ← Opérer
  aides : Résous d'abord la condition, puis garde les entiers permis. | n ≤ 5 | {0 ; 1 ; 2 ; 3 ; 4 ; 5}

Écris en extension {x ∈ ℤ | x² ≤ 5}.
  [free, suivre l'erreur]  {x ∈ ℤ | x² ≤ 5}
    = −2 ≤ x ≤ 2   ← x² ≤ 5 et x entier : |x| ≤ 2
    = {−2 ; −1 ; 0 ; 1 ; 2}   ← Lister
  aides : Résous d'abord la condition, puis garde les entiers permis. | −2 ≤ x ≤ 2 | {−2 ; −1 ; 0 ; 1 ; 2}

```

### Niveau 5

```
Écris en extension {4n − 2 | n ∈ ℕ et n ≤ 4}.
  [free, sans aide]  {4n − 2 | n ∈ ℕ et n ≤ 4}
    = {4·0 − 2 ; 4·1 − 2 ; 4·2 − 2 ; 4·3 − 2 ; 4·4 − 2}   ← Remplacer n par 0, 1, 2…
    = {−2 ; 2 ; 6 ; 10 ; 14}   ← Calculer
  pièges : g9_set_builder, g9_union_inter

Écris en extension {4n | n ∈ ℕ et n ≤ 3}.
  [free, sans aide]  {4n | n ∈ ℕ et n ≤ 3}
    = {4·0 ; 4·1 ; 4·2 ; 4·3}   ← Remplacer n par 0, 1, 2…
    = {0 ; 4 ; 8 ; 12}   ← Calculer
  pièges : g9_set_builder, g9_union_inter

Écris en extension {3n − 1 | n ∈ ℕ et n ≤ 4}.
  [free, sans aide]  {3n − 1 | n ∈ ℕ et n ≤ 4}
    = {3·0 − 1 ; 3·1 − 1 ; 3·2 − 1 ; 3·3 − 1 ; 3·4 − 1}   ← Remplacer n par 0, 1, 2…
    = {−1 ; 2 ; 5 ; 8 ; 11}   ← Calculer
  pièges : g9_set_builder, g9_union_inter

```

### Variantes d'examen

```
Quel est l'ensemble {3n + 4 | n ∈ ℕ et n ≤ 4} ?
  · {0 ; 1 ; 2 ; 3 ; 4} [g9_set_builder]   ✔ {4 ; 7 ; 10 ; 13 ; 16}   · {7 ; 10 ; 13 ; 16}   · {4 ; 7 ; 10 ; 13 ; 16 ; 19}
  [examen mcq]
  pièges : g9_set_builder

Vrai ou faux ?
  « Pour tous ensembles A et B : A ∖ B = B ∖ A. » → FAUX
    contre-exemple (refute) : A = {1}, B = ∅
  [examen tf]

```

## Intervalles et parties de ℝ (`g9-intervals`, Gymnase)

_Crochets, ∩ pour « et », ∪ pour « ou »._

### Niveau 1

```
Quel ensemble décrit les réels x tels que x < 4 ?
  · ]−∞ ; 4] [g9_bracket]   ✔ ]−∞ ; 4[
  pièges : g9_bracket

Quel ensemble décrit les réels x tels que 4 < x ≤ 6 ?
  · [4 ; 6] [g9_bracket]   · [4 ; 6[ [g9_bracket]   ✔ ]4 ; 6]   · ]4 ; 6[ [g9_bracket]
  pièges : g9_bracket

Quel ensemble décrit les réels x tels que x ≥ −4 ?
  ✔ [−4 ; +∞[   · ]−4 ; +∞[ [g9_bracket]
  pièges : g9_bracket

```

### Niveau 2

```
Écris l'ensemble des réels x tels que −1 < x ≤ 5 à l'aide d'intervalles.
  [guided]  −1 < x ≤ 5
    = ]−1 ; 5]   ← Traduire en intervalle
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | ]−1 ; 5] | ]−1 ; 5]
  pièges : g9_bracket

Écris l'ensemble des réels x tels que 2 < x ≤ 9/2 à l'aide d'intervalles.
  [guided]  2 < x ≤ 9/2
    = ]2 ; 9/2]   ← Traduire en intervalle
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | ]2 ; 9/2] | ]2 ; 9/2]
  pièges : g9_bracket

Écris l'ensemble des réels x tels que x ≥ −4 à l'aide d'intervalles.
  [guided]  x ≥ −4
    = [−4 ; +∞[   ← Traduire en intervalle
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | [−4 ; +∞[ | [−4 ; +∞[
  pièges : g9_bracket

```

### Niveau 3

```
Écris l'ensemble des réels x tels que |x + 2| < 1 et x ≥ −2 à l'aide d'intervalles.
  [tap, suivre l'erreur, menu solset]  |x + 2| < 1 et x ≥ −2
    = −1 < x + 2 < 1 et x ≥ −2   ← Ôter la valeur absolue
    = −3 < x < −1 et x ≥ −2   ← Isoler x : soustraire 2
    = ]−3 ; −1[ ∩ [−2 ; +∞[   ← Traduire en intervalles
    = [−2 ; −1[   ← Intersecter
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | −1 < x + 2 < 1 et □ | [−2 ; −1[
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que |x + 1| < 2 et x ≥ −1 à l'aide d'intervalles.
  [tap, suivre l'erreur, menu solset]  |x + 1| < 2 et x ≥ −1
    = −2 < x + 1 < 2 et x ≥ −1   ← Ôter la valeur absolue
    = −3 < x < 1 et x ≥ −1   ← Isoler x : soustraire 1
    = ]−3 ; 1[ ∩ [−1 ; +∞[   ← Traduire en intervalles
    = [−1 ; 1[   ← Intersecter
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | −2 < x + 1 < 2 et □ | [−1 ; 1[
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que ¬(−4 ≤ x < 2) à l'aide d'intervalles.
  [tap, suivre l'erreur, menu solset]  ¬(−4 ≤ x < 2)
    = x < −4 ou x ≥ 2   ← Nier : « non (a ≤ x < b) » donne « x < a ou x ≥ b »
    = ]−∞ ; −4[ ∪ [2 ; +∞[   ← Traduire en intervalles
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | x < −4 ou □ | ]−∞ ; −4[ ∪ [2 ; +∞[
  pièges : g9_bracket

```

### Niveau 4

```
Écris l'ensemble des réels x tels que |x + 1| < 1 et x ≥ −1 à l'aide d'intervalles.
  [free, suivre l'erreur]  |x + 1| < 1 et x ≥ −1
    = −1 < x + 1 < 1 et x ≥ −1   ← Ôter la valeur absolue
    = −2 < x < 0 et x ≥ −1   ← Isoler x : soustraire 1
    = ]−2 ; 0[ ∩ [−1 ; +∞[   ← Traduire en intervalles
    = [−1 ; 0[   ← Intersecter
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | −1 < x + 1 < 1 et □ | [−1 ; 0[
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que x < −4 ou x ≥ 1/2 à l'aide d'intervalles.
  [free, suivre l'erreur]  x < −4 ou x ≥ 1/2
    = ]−∞ ; −4[ ∪ [1/2 ; +∞[   ← Traduire : « ou » donne ∪
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | ]−∞ ; −4[ ∪ □ | ]−∞ ; −4[ ∪ [1/2 ; +∞[
  pièges : g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que x < −1/2 ou x ≥ 2 à l'aide d'intervalles.
  [free, suivre l'erreur]  x < −1/2 ou x ≥ 2
    = ]−∞ ; −1/2[ ∪ [2 ; +∞[   ← Traduire : « ou » donne ∪
  aides : Écris chaque condition comme un intervalle : « et » donne ∩, « ou » donne ∪. Un crochet tourné vers le nombre l'inclut. | ]−∞ ; −1/2[ ∪ □ | ]−∞ ; −1/2[ ∪ [2 ; +∞[
  pièges : g9_union_inter, g9_bracket

```

### Niveau 5

```
Écris l'ensemble des réels x tels que |x + 2| < 2 et x ≥ −2 à l'aide d'intervalles.
  [free, sans aide]  |x + 2| < 2 et x ≥ −2
    = −2 < x + 2 < 2 et x ≥ −2   ← Ôter la valeur absolue
    = −4 < x < 0 et x ≥ −2   ← Isoler x : soustraire 2
    = ]−4 ; 0[ ∩ [−2 ; +∞[   ← Traduire en intervalles
    = [−2 ; 0[   ← Intersecter
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que |x| < 4 et x ≥ 2 à l'aide d'intervalles.
  [free, sans aide]  |x| < 4 et x ≥ 2
    = −4 < x < 4 et x ≥ 2   ← Ôter la valeur absolue
    = ]−4 ; 4[ ∩ [2 ; +∞[   ← Traduire en intervalles
    = [2 ; 4[   ← Intersecter
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

Écris l'ensemble des réels x tels que |x + 3| < 1 et x ≥ −3 à l'aide d'intervalles.
  [free, sans aide]  |x + 3| < 1 et x ≥ −3
    = −1 < x + 3 < 1 et x ≥ −3   ← Ôter la valeur absolue
    = −4 < x < −2 et x ≥ −3   ← Isoler x : soustraire 3
    = ]−4 ; −2[ ∩ [−3 ; +∞[   ← Traduire en intervalles
    = [−3 ; −2[   ← Intersecter
  pièges : g1_abs_dropped, g9_union_inter, g9_bracket

```

### Variantes d'examen

```
Quel ensemble décrit les réels x tels que |x − 1| < 4 et x ≥ 4 ?
  · ]−3 ; +∞[ [g9_union_inter]   ✔ [4 ; 5[   · ]4 ; 5[ [g9_bracket]   · [4 ; 5] [g9_bracket]
  [examen mcq]
  pièges : g9_bracket, g9_union_inter

Vrai ou faux ?
  « ℝ ∖ ]−2 ; 5] = ]−∞ ; −2[ ∪ [5 ; +∞[ » → FAUX
    contre-exemple (refute) : x = -2
  [examen tf]
  pièges : g9_bracket

```

## Connecteurs et tables de vérité (`g9-connectives`, Gymnase)

_P ⇒ Q ≡ ¬P ∨ Q ; lois de De Morgan._

### Niveau 1

```
Complète la table de vérité de P ∨ Q (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | P ∨ Q
             V  V  (V)
             V  F  (V)
             F  V  (V)
             F  F  (F)

Complète la table de vérité de P ∧ Q (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | P ∧ Q
             V  V  (V)
             V  F  (F)
             F  V  (F)
             F  F  (F)

Complète la table de vérité de ¬P ∨ Q (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | ¬P ∨ Q
             V  V  (V)
             V  F  (F)
             F  V  (V)
             F  F  (V)

```

### Niveau 2

```
Complète la table de vérité (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | P ⇒ Q | Q ⇒ P | (P ⇒ Q) ∧ (Q ⇒ P)
             V  V  (V)  (V)  (V)
             V  F  (F)  (V)  (F)
             F  V  (V)  (F)  (F)
             F  F  (V)  (V)  (V)
  puis : La dernière colonne est la table de…
      · P ∨ Q   · P ⇒ Q   · P ∧ Q   ✔ P ⇔ Q

Complète la table de vérité (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | P ⇒ Q | Q ⇒ P | (P ⇒ Q) ∧ (Q ⇒ P)
             V  V  (V)  (V)  (V)
             V  F  (F)  (V)  (F)
             F  V  (V)  (F)  (F)
             F  F  (V)  (V)  (V)
  puis : La dernière colonne est la table de…
      · P ⇒ Q   · P ∨ Q   · P ∧ Q   ✔ P ⇔ Q

Complète la table de vérité (V = vrai, F = faux).
  [tableau truth]  colonnes : P | Q | P ⇒ Q | Q ⇒ P | (P ⇒ Q) ∧ (Q ⇒ P)
             V  V  (V)  (V)  (V)
             V  F  (F)  (V)  (F)
             F  V  (V)  (F)  (F)
             F  F  (V)  (V)  (V)
  puis : La dernière colonne est la table de…
      · P ∧ Q   ✔ P ⇔ Q   · P ∨ Q   · P ⇒ Q

```

### Niveau 3

```
Simplifie ¬(¬P ∧ Q) : fais entrer la négation, une règle par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(¬P ∧ Q)
    = ¬¬P ∨ ¬Q   ← De Morgan
    = P ∨ ¬Q   ← Double négation
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬¬P ∨ ¬Q | P ∨ ¬Q
  pièges : g9_demorgan, g9_neg_strict

Montre que ¬(P ∧ ¬Q) ≡ P ⇒ Q, une règle par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(P ∧ ¬Q)
    = ¬P ∨ ¬¬Q   ← De Morgan
    = ¬P ∨ Q   ← Double négation
    = P ⇒ Q   ← Reconnaître l'implication : ¬A ∨ B ≡ A ⇒ B
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬P ∨ ¬¬Q | P ⇒ Q
  pièges : g9_demorgan, g9_neg_strict

Montre que ¬(P ∧ ¬Q) ≡ P ⇒ Q, une règle par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(P ∧ ¬Q)
    = ¬P ∨ ¬¬Q   ← De Morgan
    = ¬P ∨ Q   ← Double négation
    = P ⇒ Q   ← Reconnaître l'implication : ¬A ∨ B ≡ A ⇒ B
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬P ∨ ¬¬Q | P ⇒ Q
  pièges : g9_demorgan, g9_neg_strict

```

### Niveau 4

```
Simplifie ¬((P ∨ ¬Q) ∧ ¬R) : fais entrer la négation, une règle par ligne.
  [free, suivre l'erreur]  ¬((P ∨ ¬Q) ∧ ¬R)
    = ¬(P ∨ ¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ ¬¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ Q) ∨ ¬¬R   ← Double négation
    = (¬P ∧ Q) ∨ R   ← Double négation
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬(P ∨ ¬Q) ∨ ¬¬R | (¬P ∧ Q) ∨ R
  pièges : g9_demorgan, g9_neg_strict

Simplifie ¬(¬P ∧ (¬Q ∨ ¬R)) : fais entrer la négation, une règle par ligne.
  [free, suivre l'erreur]  ¬(¬P ∧ (¬Q ∨ ¬R))
    = ¬¬P ∨ ¬(¬Q ∨ ¬R)   ← De Morgan
    = P ∨ ¬(¬Q ∨ ¬R)   ← Double négation
    = P ∨ (¬¬Q ∧ ¬¬R)   ← De Morgan
    = P ∨ (Q ∧ ¬¬R)   ← Double négation
    = P ∨ (Q ∧ R)   ← Double négation
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬¬P ∨ ¬(¬Q ∨ ¬R) | P ∨ (Q ∧ R)
  pièges : g9_demorgan, g9_neg_strict

Simplifie ¬(P ∧ (¬Q ∨ R)) : fais entrer la négation, une règle par ligne.
  [free, suivre l'erreur]  ¬(P ∧ (¬Q ∨ R))
    = ¬P ∨ ¬(¬Q ∨ R)   ← De Morgan
    = ¬P ∨ (¬¬Q ∧ ¬R)   ← De Morgan
    = ¬P ∨ (Q ∧ ¬R)   ← Double négation
  aides : Fais entrer la négation dans la parenthèse : ∧ devient ∨, ∨ devient ∧, et ¬¬A = A. | Première ligne : ¬P ∨ ¬(¬Q ∨ R) | ¬P ∨ (Q ∧ ¬R)
  pièges : g9_demorgan, g9_neg_strict

```

### Niveau 5

```
Simplifie ¬((P ∨ ¬Q) ∧ ¬R) : fais entrer la négation, une règle par ligne.
  [free, sans aide]  ¬((P ∨ ¬Q) ∧ ¬R)
    = ¬(P ∨ ¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ ¬¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ Q) ∨ ¬¬R   ← Double négation
    = (¬P ∧ Q) ∨ R   ← Double négation
  pièges : g9_demorgan, g9_neg_strict

Simplifie ¬((P ∨ ¬Q) ∧ ¬R) : fais entrer la négation, une règle par ligne.
  [free, sans aide]  ¬((P ∨ ¬Q) ∧ ¬R)
    = ¬(P ∨ ¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ ¬¬Q) ∨ ¬¬R   ← De Morgan
    = (¬P ∧ Q) ∨ ¬¬R   ← Double négation
    = (¬P ∧ Q) ∨ R   ← Double négation
  pièges : g9_demorgan, g9_neg_strict

Simplifie ¬((¬P ∧ ¬Q) ∨ R) : fais entrer la négation, une règle par ligne.
  [free, sans aide]  ¬((¬P ∧ ¬Q) ∨ R)
    = ¬(¬P ∧ ¬Q) ∧ ¬R   ← De Morgan
    = (¬¬P ∨ ¬¬Q) ∧ ¬R   ← De Morgan
    = (P ∨ ¬¬Q) ∧ ¬R   ← Double négation
    = (P ∨ Q) ∧ ¬R   ← Double négation
  pièges : g9_demorgan, g9_neg_strict

```

### Variantes d'examen

```
Vrai ou faux ?
  « P ⇒ Q ≡ Q ⇒ P » → FAUX
    contre-exemple (truth) : P = V, Q = F
  [examen tf]
  pièges : g9_converse_contra

Quelle formule est équivalente à ¬(P ⇒ Q) ?
  · P ∧ Q   · P ⇒ ¬Q [g9_neg_implication]   ✔ P ∧ ¬Q   · ¬P ⇒ ¬Q [g9_neg_implication]
  [examen mcq]
  pièges : g9_neg_implication

```

## Implication, réciproque, contraposée (`g9-implication`, Gymnase)

_Contraposée ¬Q ⇒ ¬P ; négation P ∧ ¬Q._

### Niveau 1

```
Laquelle est la contraposée de n² est pair ⇒ n est pair ?
  ✔ n est impair ⇒ n² est impair   · n² est pair ⇒ n est impair   · n est pair ⇒ n² est pair [g9_converse_contra]   · n² est impair ⇒ n est impair [g9_converse_contra]
  pièges : g9_converse_contra

Laquelle est la contraposée de n² est multiple de 3 ⇒ n est multiple de 3 ?
  · n est multiple de 3 ⇒ n² est multiple de 3 [g9_converse_contra]   · n² est multiple de 3 ⇒ n n'est pas multiple de 3   · n² n'est pas multiple de 3 ⇒ n n'est pas multiple de 3 [g9_converse_contra]   ✔ n n'est pas multiple de 3 ⇒ n² n'est pas multiple de 3
  pièges : g9_converse_contra

Laquelle est la contraposée de x² > 9 ⇒ x > 3 ?
  · x > 3 ⇒ x² > 9 [g9_converse_contra]   · x² > 9 ⇒ x ≤ 3   · x² ≤ 9 ⇒ x ≤ 3 [g9_converse_contra]   ✔ x ≤ 3 ⇒ x² ≤ 9
  pièges : g9_converse_contra

```

### Niveau 2

```
Écris la réciproque de l'énoncé x² > 4 ⇒ x > 2 (« si x² > 4, alors x > 2 »).
  [jetons] palette : x² > 4 · x² ≤ 4 · x > 2 · x ≤ 2
    → x > 2 ⇒ x² > 4
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ x² > 4 | x > 2 ⇒ x² > 4
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé x > 5 ⇒ x² > 25 (« si x > 5, alors x² > 25 »).
  [jetons] palette : x > 5 · x ≤ 5 · x² > 25 · x² ≤ 25
    → x² > 25 ⇒ x > 5
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ x > 5 | x² > 25 ⇒ x > 5
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé x > 3 ⇒ x² > 9 (« si x > 3, alors x² > 9 »).
  [jetons] palette : x > 3 · x ≤ 3 · x² > 9 · x² ≤ 9
    → x² > 9 ⇒ x > 3
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ x > 3 | x² > 9 ⇒ x > 3
  pièges : g9_converse_contra

```

### Niveau 3

```
Écris la contraposée de l'énoncé ∀n ∈ ℤ, n² est multiple de 2 ⇒ n est multiple de 2.
  [jetons] palette : n ∈ ℤ · n² est multiple de 2 · n² n'est pas multiple de 2 · n est multiple de 2 · n n'est pas multiple de 2
    → ∀n ∈ ℤ, n n'est pas multiple de 2 ⇒ n² n'est pas multiple de 2
  aides : On nie les deux côtés et on les échange : ¬B ⇒ ¬A. | … ⇒ n² n'est pas multiple de 2 | ∀n ∈ ℤ, n n'est pas multiple de 2 ⇒ n² n'est pas multiple de 2
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé ∀x ∈ ℝ, x² > 16 ⇒ x > 4.
  [jetons] palette : x ∈ ℝ · x² > 16 · x² ≤ 16 · x > 4 · x ≤ 4
    → ∀x ∈ ℝ, x > 4 ⇒ x² > 16
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ x² > 16 | ∀x ∈ ℝ, x > 4 ⇒ x² > 16
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé ∀n ∈ ℤ, n² est pair ⇒ n est pair.
  [jetons] palette : n ∈ ℤ · n² est pair · n² est impair · n est pair · n est impair
    → ∀n ∈ ℤ, n est pair ⇒ n² est pair
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ n² est pair | ∀n ∈ ℤ, n est pair ⇒ n² est pair
  pièges : g9_converse_contra

```

### Niveau 4

```
Écris la contraposée de l'énoncé ∀x ∈ ℝ, x² > 25 ⇒ x > 5.
  [jetons] palette : x ∈ ℝ · x² > 25 · x² ≤ 25 · x² < 25 · x > 5 · x ≤ 5 · x < 5
    → ∀x ∈ ℝ, x ≤ 5 ⇒ x² ≤ 25
  aides : On nie les deux côtés et on les échange : ¬B ⇒ ¬A. | … ⇒ x² ≤ 25 | ∀x ∈ ℝ, x ≤ 5 ⇒ x² ≤ 25
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé ∀n ∈ ℤ, n² est pair ⇒ n est pair.
  [jetons] palette : n ∈ ℤ · n² est pair · n² est impair · n est pair · n est impair
    → ∀n ∈ ℤ, n est pair ⇒ n² est pair
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ n² est pair | ∀n ∈ ℤ, n est pair ⇒ n² est pair
  pièges : g9_converse_contra

Écris la réciproque de l'énoncé ∀x ∈ ℝ, x > 5 ⇒ x² > 25.
  [jetons] palette : x ∈ ℝ · x > 5 · x ≤ 5 · x < 5 · x² > 25 · x² ≤ 25 · x² < 25
    → ∀x ∈ ℝ, x² > 25 ⇒ x > 5
  aides : On échange les deux côtés : B ⇒ A. | … ⇒ x > 5 | ∀x ∈ ℝ, x² > 25 ⇒ x > 5
  pièges : g9_converse_contra

```

### Niveau 5

```
Écris la négation de l'énoncé ∀x ∈ ℝ, x² > 4 ⇒ x > 2.
  [jetons, sans aide] palette : x ∈ ℝ · x² > 4 · x² ≤ 4 · x² < 4 · x > 2 · x ≤ 2 · x < 2
    → ∃x ∈ ℝ, x² > 4 ∧ x ≤ 2
  pièges : g9_neg_implication

Écris la négation de l'énoncé ∀x ∈ ℝ, x > 3 ⇒ x² > 9.
  [jetons, sans aide] palette : x ∈ ℝ · x > 3 · x ≤ 3 · x < 3 · x² > 9 · x² ≤ 9 · x² < 9
    → ∃x ∈ ℝ, x > 3 ∧ x² ≤ 9
  pièges : g9_neg_implication

Écris la négation de l'énoncé ∀A, B, C ⊂ ℕ, A ∩ C = B ∩ C ⇒ A = B.
  [jetons, sans aide] palette : A, B, C ⊂ ℕ · A ∩ C = B ∩ C · A ∩ C ≠ B ∩ C · A = B · A ≠ B
    → ∃A, B, C ⊂ ℕ, A ∩ C = B ∩ C ∧ A ≠ B
  pièges : g9_neg_implication

```

### Variantes d'examen

```
Écris la négation de l'énoncé ∀n ∈ ℤ, n² est pair ⇒ n est pair.
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 2)
    [jetons, sans aide] palette : n ∈ ℤ · n² est pair · n² est impair · n est pair · n est impair
      → ∃n ∈ ℤ, n² est pair ∧ n est impair
    [examen open]
  pièges : g9_neg_implication

Laquelle est la contraposée de ∀A, B, C ⊂ ℕ, A ∩ C = B ∩ C ⇒ A = B ?
  · ∀A, B, C ⊂ ℕ, A ∩ C ≠ B ∩ C ⇒ A ≠ B [g9_converse_contra]   · ∀A, B, C ⊂ ℕ, A = B ⇒ A ∩ C = B ∩ C [g9_converse_contra]   ✔ ∀A, B, C ⊂ ℕ, A ≠ B ⇒ A ∩ C ≠ B ∩ C   · ∀A, B, C ⊂ ℕ, A ∩ C = B ∩ C ⇒ A ≠ B
  [examen mcq]
  pièges : g9_converse_contra

Vrai ou faux ?
  « « ∀x ∈ ℝ, x > 3 ⇒ x² > 9 » est vraie. Sa contraposée est donc vraie aussi. » → VRAI
  [examen tf]

```

## Lire un énoncé quantifié (`g9-quant-read`, Gymnase)

_∀x ∃y ou ∃y ∀x : l'ordre compte._

### Niveau 1

```
A = {1 ; 3 ; 4}. Coche les cases où x·y ≥ 15 est vraie.
  [tableau grid]  colonnes : y = 1 | y = 3 | y = 4
    x = 1    (F)  (F)  (F)
    x = 3    (F)  (F)  (F)
    x = 4    (F)  (F)  (V)
  puis : Vrai ou faux ?
      « A = {1 ; 3 ; 4}. ∀x ∈ A ∃y ∈ A, x·y ≥ 15 » → FAUX
        contre-exemple (refute) : x = 1
      aides : Pour ∀x ∃y : prends chaque x et cherche un y qui marche. | Teste x = 4 avec le plus petit y. | L'énoncé est faux : x = 1.

A = {2 ; 4 ; 5}. Coche les cases où x² + y < 14 est vraie.
  [tableau grid]  colonnes : y = 2 | y = 4 | y = 5
    x = 2    (V)  (V)  (V)
    x = 4    (F)  (F)  (F)
    x = 5    (F)  (F)  (F)
  puis : Vrai ou faux ?
      « A = {2 ; 4 ; 5}. ∃y ∈ A ∀x ∈ A, x² + y < 14 » → FAUX
        contre-exemple (refute) : x = 4
      aides : Pour ∃y ∀x : cherche un seul y qui marche pour tous les x à la fois. | Teste x = 5 avec le plus petit y. | L'énoncé est faux : x = 4.

A = {2 ; 3 ; 5}. Coche les cases où x·y ≥ 6 est vraie.
  [tableau grid]  colonnes : y = 2 | y = 3 | y = 5
    x = 2    (F)  (V)  (V)
    x = 3    (V)  (V)  (V)
    x = 5    (V)  (V)  (V)
  puis : Vrai ou faux ?
      « A = {2 ; 3 ; 5}. ∃y ∈ A ∀x ∈ A, x·y ≥ 6 » → VRAI
      aides : Pour ∃y ∀x : cherche un seul y qui marche pour tous les x à la fois. | Teste x = 5 avec le plus petit y. | L'énoncé est vrai.

```

### Niveau 2

```
Vrai ou faux ?
  « A = {1 ; 2 ; 5}. ∃y ∈ A ∀x ∈ A, x·y ≥ 9 » → FAUX
    contre-exemple (refute) : x = 1
  aides : Pour ∃y ∀x : cherche un seul y qui marche pour tous les x à la fois. | Teste x = 5 avec le plus petit y. | L'énoncé est faux : x = 1.

Vrai ou faux ?
  « A = {1 ; 2 ; 4}. ∀x ∈ A ∃y ∈ A, x + 2y < 9 » → VRAI
  aides : Pour ∀x ∃y : prends chaque x et cherche un y qui marche. | Teste x = 4 avec le plus petit y. | L'énoncé est vrai.

Vrai ou faux ?
  « A = {2 ; 3 ; 5}. ∀x ∈ A ∃y ∈ A, x + 2y < 13 » → VRAI
  aides : Pour ∀x ∃y : prends chaque x et cherche un y qui marche. | Teste x = 5 avec le plus petit y. | L'énoncé est vrai.

```

### Niveau 3

```
Vrai ou faux ?
  « ∃y ∈ ℝ ∀x ∈ ℝ, x·y = 0 » → VRAI
  aides : ∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x. | Essaie de trouver le y (ou le x) qui marche. | Vrai.
  pièges : g9_quant_order

Vrai ou faux ?
  « ∀x ∈ ℝ ∃y ∈ ℝ, y < x² » → VRAI
  aides : ∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x. | Essaie de trouver le y (ou le x) qui marche. | Vrai.
  pièges : g9_quant_order

Vrai ou faux ?
  « ∀n ∈ ℕ ∃m ∈ ℕ, m > n » → VRAI
  aides : ∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x. | Essaie de trouver le y (ou le x) qui marche. | Vrai.
  pièges : g9_quant_order

```

### Niveau 4

```
Écris avec des quantificateurs : « Pour tout réel x, il existe un réel y tel que x + y = 0. »
  [jetons] palette : x ∈ ℝ · y ∈ ℝ · x + y = 0 · x + y ≠ 0
    → ∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0
  aides : « Pour tout » donne ∀, « il existe » donne ∃. Garde l'ordre de la phrase. | ∀… | ∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0
  pièges : g9_quant_order

Écris avec des quantificateurs : « Tout entier naturel n a un entier m plus grand que lui. »
  [jetons] palette : n ∈ ℕ · m ∈ ℕ · m > n · m ≤ n
    → ∀n ∈ ℕ ∃m ∈ ℕ, m > n
  aides : « Pour tout » donne ∀, « il existe » donne ∃. Garde l'ordre de la phrase. | ∀… | ∀n ∈ ℕ ∃m ∈ ℕ, m > n
  pièges : g9_quant_order

Écris avec des quantificateurs : « Il existe un réel y tel que, pour tout réel x, y > x. »
  [jetons] palette : x ∈ ℝ · y ∈ ℝ · y > x · y ≤ x
    → ∃y ∈ ℝ ∀x ∈ ℝ, y > x
  aides : « Pour tout » donne ∀, « il existe » donne ∃. Garde l'ordre de la phrase. | ∃… | ∃y ∈ ℝ ∀x ∈ ℝ, y > x
  pièges : g9_quant_order

```

### Niveau 5

```
Vrai ou faux ?
  « ∀n ∈ ℕ ∃m ∈ ℕ, m > n » → VRAI
  pièges : g9_quant_order

Vrai ou faux ?
  « A = {2 ; 3 ; 4}. ∃y ∈ A ∀x ∈ A, x·y ≥ 12 » → FAUX
    contre-exemple (refute) : x = 2

Vrai ou faux ?
  « A = {1 ; 4 ; 5}. ∃y ∈ A ∀x ∈ A, x·y ≥ 9 » → FAUX
    contre-exemple (refute) : x = 1

```

### Variantes d'examen

```
Vrai ou faux ?
  « ∀x ∈ ℝ ∃y ∈ ℝ, x·y = 1 » → FAUX
    contre-exemple (refute) : x = 0
  [examen tf]
  pièges : g9_quant_order

Quelle phrase dit la même chose que ∃m ∈ ℕ ∀n ∈ ℕ, m > n ?
  ✔ Il existe un entier naturel m, pour tout entier naturel n, m > n.   · Pour tout entier naturel m, pour tout entier naturel n, m > n.   · Il existe un entier naturel m, il existe un entier naturel n tel que m > n.   · Pour tout entier naturel n, il existe un entier naturel m tel que m > n. [g9_quant_order]
  [examen mcq]
  pièges : g9_quant_order

```

## Écrire une définition avec des quantificateurs (`g9-quant-write`, Gymnase)

_Majorée, bornée, croissante, convergente…_

### Niveau 1

```
Quelle formule dit « f est bornée sur ℝ » ?
  ✔ ∃M ∈ ℝ ∀x ∈ ℝ, |f(x)| ≤ M   · ∀M ∈ ℝ ∀x ∈ ℝ, |f(x)| ≤ M   · ∃M ∈ ℝ ∀x ∈ ℝ, |f(x)| ≥ M   · ∀x ∈ ℝ ∃M ∈ ℝ, |f(x)| ≤ M [g9_quant_order]
  pièges : g9_quant_order

Quelle formule dit « f est minorée sur ℝ » ?
  ✔ ∃m ∈ ℝ ∀x ∈ ℝ, f(x) ≥ m   · ∃m ∈ ℝ ∀x ∈ ℝ, f(x) ≤ m   · ∀m ∈ ℝ ∀x ∈ ℝ, f(x) ≥ m   · ∀x ∈ ℝ ∃m ∈ ℝ, f(x) ≥ m [g9_quant_order]
  pièges : g9_quant_order

Quelle formule dit « f est majorée sur ℝ » ?
  · ∀M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M   · ∀x ∈ ℝ ∃M ∈ ℝ, f(x) ≤ M [g9_quant_order]   ✔ ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M   · ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≥ M
  pièges : g9_quant_order

```

### Niveau 2

```
Construis la définition : « f est périodique ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃T > 0
    2. ∀x ∈ ℝ
    3. , f(x + T) = f(x)
    ✗ ∀T > 0 [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « f est minorée sur ℝ ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃m ∈ ℝ
    2. ∀x ∈ ℝ
    3. , f(x) ≥ m
    ✗ ∀m ∈ ℝ [g9_quant_order]
  pièges : g9_quant_order

Construis la définition : « f est majorée sur ℝ ». Touche les morceaux dans l'ordre.
  [blocs define]
    1. ∃M ∈ ℝ
    2. ∀x ∈ ℝ
    3. , f(x) ≤ M
    ✗ ∀M ∈ ℝ [g9_quant_order]
  pièges : g9_quant_order

```

### Niveau 3

```
Écris avec des quantificateurs : « f est paire ».
  [jetons] palette : x ∈ ℝ · f(-x) = f(x)
    → ∀x ∈ ℝ, f(-x) = f(x)
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∀x ∈ ℝ, … | ∀x ∈ ℝ, f(-x) = f(x)
  pièges : g9_quant_order

Écris avec des quantificateurs : « f est paire ».
  [jetons] palette : x ∈ ℝ · f(-x) = f(x)
    → ∀x ∈ ℝ, f(-x) = f(x)
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∀x ∈ ℝ, … | ∀x ∈ ℝ, f(-x) = f(x)
  pièges : g9_quant_order

Écris avec des quantificateurs : « A = B (dans E) ».
  [jetons] palette : x ∈ E · x ∈ A · x ∈ B
    → ∀x ∈ E, x ∈ A ⇔ x ∈ B
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∀x ∈ E, … | ∀x ∈ E, x ∈ A ⇔ x ∈ B
  pièges : g9_quant_order

```

### Niveau 4

```
Écris avec des quantificateurs : « A ⊂ B ».
  [jetons] palette : x ∈ A · x ∈ B · x ∉ B
    → ∀x ∈ A, x ∈ B
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∀x ∈ A, … | ∀x ∈ A, x ∈ B
  pièges : g9_quant_order

Écris avec des quantificateurs : « f est majorée sur ℝ ».
  [jetons] palette : M ∈ ℝ · x ∈ ℝ · f(x) ≤ M · f(x) ≥ M
    → ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∃M ∈ ℝ ∀x ∈ ℝ, … | ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  pièges : g9_quant_order

Écris avec des quantificateurs : « f est majorée sur ℝ ».
  [jetons] palette : M ∈ ℝ · x ∈ ℝ · f(x) ≤ M · f(x) ≥ M
    → ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  aides : Qui est choisi en premier ? Une borne, un seuil (∃) vient avant les x (∀) qu'elle contrôle. | ∃M ∈ ℝ ∀x ∈ ℝ, … | ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  pièges : g9_quant_order

```

### Niveau 5

```
Écris avec des quantificateurs : « (uₙ) converge vers L ».
  [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · n ≥ N · |u_n − L| < ε · |u_n − L| > ε · ε ≥ 0
    → ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε
  pièges : g9_quant_order

Écris avec des quantificateurs : « (uₙ) converge vers L ».
  [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · n ≥ N · |u_n − L| < ε · |u_n − L| > ε · ε ≥ 0
    → ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε
  pièges : g9_quant_order

Écris avec des quantificateurs : « (uₙ) converge vers L ».
  [jetons, sans aide] palette : ε > 0 · N ∈ ℕ · n ≥ N · |u_n − L| < ε · |u_n − L| > ε · ε ≥ 0
    → ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε
  pièges : g9_quant_order

```

### Variantes d'examen

```
Quelle formule dit « f est majorée sur ℝ » ?
  · ∀x ∈ ℝ ∃M ∈ ℝ, f(x) ≤ M [g9_quant_order]   · ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≥ M   ✔ ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M   · ∀M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  [examen mcq]
  pièges : g9_quant_order

Écris avec des quantificateurs : « f est injective sur I ».
  [problème, examen open, 1 points]
  partie 1 (Début du problème : 1)
    [jetons, sans aide] palette : x, y ∈ I · f(x) = f(y) · x = y · f(x) ≠ f(y) · x ≠ y
      → ∀x, y ∈ I, f(x) = f(y) ⇒ x = y
    [examen open]
  pièges : g9_quant_order

```

## Nier un énoncé quantifié (`g9-negate`, Gymnase)

_∀ devient ∃, ∃ devient ∀, la propriété est niée._

### Niveau 1

```
On nie ∀x ∈ A ∃y ∈ A, x² + y < 12. Première ligne : ∃x ∈ A, ¬(∃y ∈ A, x² + y < 12). Quelle est la ligne suivante ?
  ✔ ∃x ∈ A ∀y ∈ A, x² + y ≥ 12   · ∃x ∈ A ∀y ∈ A, x² + y < 12 [g9_neg_pred_kept]   · ∃x ∈ A ∀y ∈ A, x² + y > 12 [g9_neg_strict]
  pièges : g9_neg_strict, g9_neg_pred_kept

On nie ∀x ∈ A ∃y ∈ A, x² + y < 12. Première ligne : ∃x ∈ A, ¬(∃y ∈ A, x² + y < 12). Quelle est la ligne suivante ?
  ✔ ∃x ∈ A ∀y ∈ A, x² + y ≥ 12   · ∃x ∈ A ∀y ∈ A, x² + y < 12 [g9_neg_pred_kept]   · ∃x ∈ A ∀y ∈ A, x² + y > 12 [g9_neg_strict]
  pièges : g9_neg_strict, g9_neg_pred_kept

On nie ∀x ∈ A ∃y ∈ A, x² + y < 9. Première ligne : ∃x ∈ A, ¬(∃y ∈ A, x² + y < 9). Quelle est la ligne suivante ?
  · ∃x ∈ A ∀y ∈ A, x² + y < 9 [g9_neg_pred_kept]   ✔ ∃x ∈ A ∀y ∈ A, x² + y ≥ 9   · ∃x ∈ A ∀y ∈ A, x² + y > 9 [g9_neg_strict]
  pièges : g9_neg_strict, g9_neg_pred_kept

```

### Niveau 2

```
Écris la négation de ∀x ∈ A ∃y ∈ A, x² + y < 12.
  [jetons] palette : x ∈ A · y ∈ A · x² + y < 12 · x² + y ≥ 12 · x² + y > 12
    → ∃x ∈ A ∀y ∈ A, x² + y ≥ 12
  aides : Chaque ∀ devient ∃, chaque ∃ devient ∀, et la propriété à la fin est niée. | ∃x ∈ A ∀y ∈ A, … | ∃x ∈ A ∀y ∈ A, x² + y ≥ 12
  pièges : g9_neg_one_quant, g9_neg_pred_kept, g9_neg_strict

Écris la négation de ∀x ∈ ℝ, x² ≥ 5.
  [jetons] palette : x ∈ ℝ · x² ≥ 5 · x² < 5 · x² ≤ 5
    → ∃x ∈ ℝ, x² < 5
  aides : Chaque ∀ devient ∃, chaque ∃ devient ∀, et la propriété à la fin est niée. | ∃x ∈ ℝ, … | ∃x ∈ ℝ, x² < 5
  pièges : g9_neg_one_quant, g9_neg_pred_kept, g9_neg_strict

Écris la négation de ∀M ∈ ℝ ∃x ∈ ℝ, f(x) > M.
  [jetons] palette : M ∈ ℝ · x ∈ ℝ · f(x) > M · f(x) ≤ M · f(x) < M
    → ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  aides : Chaque ∀ devient ∃, chaque ∃ devient ∀, et la propriété à la fin est niée. | ∃M ∈ ℝ ∀x ∈ ℝ, … | ∃M ∈ ℝ ∀x ∈ ℝ, f(x) ≤ M
  pièges : g9_neg_one_quant, g9_neg_pred_kept, g9_neg_strict

```

### Niveau 3

```
Écris la négation de ∀x ∈ A ∃y ∈ A, x² + y < 14 (« A = {1 ; 2 ; 3} ») : fais entrer ¬, un symbole par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(∀x ∈ A ∃y ∈ A, x² + y < 14)
    = ∃x ∈ A, ¬(∃y ∈ A, x² + y < 14)   ← Franchir ∀x ∈ A
    = ∃x ∈ A ∀y ∈ A, x² + y ≥ 14   ← Franchir ∃y ∈ A
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃x ∈ A, ¬(∃y ∈ A, x² + y < 14) | ∃x ∈ A ∀y ∈ A, x² + y ≥ 14
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_strict

Écris la négation de ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε (« (uₙ) tend vers 2 ») : fais entrer ¬, un symbole par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)
    = ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∀ε > 0
    = ∃ε > 0 ∀N ∈ ℕ, ¬(∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∃N ∈ ℕ
    = ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε   ← Franchir ∀n ≥ N
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε) | ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_restriction, g9_neg_strict

Écris la négation de ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, |x − 5| < δ ⇒ |f(x) − f(5)| < ε (« f est continue en 5 ») : fais entrer ¬, un symbole par ligne.
  [tap, suivre l'erreur, menu logic]  ¬(∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, |x − 5| < δ ⇒ |f(x) − f(5)| < ε)
    = ∃ε > 0, ¬(∃δ > 0 ∀x ∈ ℝ, |x − 5| < δ ⇒ |f(x) − f(5)| < ε)   ← Franchir ∀ε > 0
    = ∃ε > 0 ∀δ > 0, ¬(∀x ∈ ℝ, |x − 5| < δ ⇒ |f(x) − f(5)| < ε)   ← Franchir ∃δ > 0
    = ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, ¬(|x − 5| < δ ⇒ |f(x) − f(5)| < ε)   ← Franchir ∀x ∈ ℝ
    = ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, |x − 5| < δ ∧ |f(x) − f(5)| ≥ ε   ← Nier l'implication : A ∧ ¬B
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃ε > 0, ¬(∃δ > 0 ∀x ∈ ℝ, |x − 5| < δ ⇒ |f(x) − f(5)| < ε) | ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, |x − 5| < δ ∧ |f(x) − f(5)| ≥ ε
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_restriction, g9_neg_strict

```

### Niveau 4

```
Écris la négation de ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n + 1| < ε (« (uₙ) tend vers −1 ») : fais entrer ¬, un symbole par ligne.
  [free, suivre l'erreur]  ¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n + 1| < ε)
    = ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n + 1| < ε)   ← Franchir ∀ε > 0
    = ∃ε > 0 ∀N ∈ ℕ, ¬(∀n ≥ N, |u_n + 1| < ε)   ← Franchir ∃N ∈ ℕ
    = ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n + 1| ≥ ε   ← Franchir ∀n ≥ N
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n + 1| < ε) | ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n + 1| ≥ ε
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_restriction, g9_neg_strict

Écris la négation de ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε (« (uₙ) tend vers 2 ») : fais entrer ¬, un symbole par ligne.
  [free, suivre l'erreur]  ¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)
    = ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∀ε > 0
    = ∃ε > 0 ∀N ∈ ℕ, ¬(∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∃N ∈ ℕ
    = ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε   ← Franchir ∀n ≥ N
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε) | ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_restriction, g9_neg_strict

Écris la négation de ∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε (« (uₙ) tend vers 2 ») : fais entrer ¬, un symbole par ligne.
  [free, suivre l'erreur]  ¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)
    = ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∀ε > 0
    = ∃ε > 0 ∀N ∈ ℕ, ¬(∀n ≥ N, |u_n − 2| < ε)   ← Franchir ∃N ∈ ℕ
    = ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε   ← Franchir ∀n ≥ N
  aides : Un symbole à la fois, de gauche à droite : ∀ devient ∃, ∃ devient ∀, la restriction (ε > 0) reste, et la propriété à la fin est niée. | Première ligne : ∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − 2| < ε) | ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − 2| ≥ ε
  pièges : g9_quant_order, g9_neg_one_quant, g9_neg_pred_kept, g9_neg_restriction, g9_neg_strict

```

### Niveau 5

```
Écris la négation de ∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y) (« f est croissante sur I ») : fais entrer ¬, un symbole par ligne.
  [free, sans aide]  ¬(∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y))
    = ∃x, y ∈ I, ¬(x < y ⇒ f(x) ≤ f(y))   ← Franchir ∀x, y ∈ I
    = ∃x, y ∈ I, x < y ∧ f(x) > f(y)   ← Nier l'implication : A ∧ ¬B
  pièges : g9_neg_pred_kept, g9_neg_strict

Écris la négation de ∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y) (« f est croissante sur I ») : fais entrer ¬, un symbole par ligne.
  [free, sans aide]  ¬(∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y))
    = ∃x, y ∈ I, ¬(x < y ⇒ f(x) ≤ f(y))   ← Franchir ∀x, y ∈ I
    = ∃x, y ∈ I, x < y ∧ f(x) > f(y)   ← Nier l'implication : A ∧ ¬B
  pièges : g9_neg_pred_kept, g9_neg_strict

Écris la négation de ∀x, y ∈ I, f(x) = f(y) ⇒ x = y (« f est injective sur I ») : fais entrer ¬, un symbole par ligne.
  [free, sans aide]  ¬(∀x, y ∈ I, f(x) = f(y) ⇒ x = y)
    = ∃x, y ∈ I, ¬(f(x) = f(y) ⇒ x = y)   ← Franchir ∀x, y ∈ I
    = ∃x, y ∈ I, f(x) = f(y) ∧ x ≠ y   ← Nier l'implication : A ∧ ¬B
  pièges : g9_neg_pred_kept, g9_neg_strict

```

### Variantes d'examen

```
Écris la négation de ∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y) (« f est croissante sur I ») : fais entrer ¬, un symbole par ligne.
  [problème, examen open, 2 points]
  partie 1 (Début du problème : 2)
    [free, sans aide, suivre l'erreur, examen open]  ¬(∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y))
      = ∃x, y ∈ I, ¬(x < y ⇒ f(x) ≤ f(y))   ← Franchir ∀x, y ∈ I
      = ∃x, y ∈ I, x < y ∧ f(x) > f(y)   ← Nier l'implication : A ∧ ¬B
  pièges : g9_neg_pred_kept, g9_neg_strict

Quelle est la négation de ∃y ∈ A ∀x ∈ A, x + 2y < 9 ?
  · ∀y ∈ A ∃x ∈ A, x + 2y < 9 [g9_neg_pred_kept]   · ∀y ∈ A ∀x ∈ A, x + 2y ≥ 9 [g9_neg_one_quant]   ✔ ∀y ∈ A ∃x ∈ A, x + 2y ≥ 9   · ∀y ∈ A ∃x ∈ A, x + 2y > 9 [g9_neg_strict]
  [examen mcq]
  pièges : g9_neg_strict, g9_neg_one_quant, g9_neg_pred_kept

```

## Réfuter par un contre-exemple (`g9-counterexample`, Gymnase)

_Un seul x suffit pour montrer qu'un « pour tout » est faux._

### Niveau 1

```
Lequel est un contre-exemple à « ∀x ∈ ℝ, x² > 4 ⇒ x > 2 » ?
  · x = −2 [g9_counter_not_hyp]   · x = 3   · x = 0 [g9_counter_not_hyp]   ✔ x = −4
  pièges : g9_counter_not_hyp

Lequel est un contre-exemple à « ∀x ∈ ℝ, x² > 4 ⇒ x > 2 » ?
  · x = 3   ✔ x = −4   · x = −2 [g9_counter_not_hyp]   · x = 0 [g9_counter_not_hyp]
  pièges : g9_counter_not_hyp

Lequel est un contre-exemple à « ∀x ∈ ℝ, x² > 9 ⇒ x > 3 » ?
  · x = 1 [g9_counter_not_hyp]   · x = 4   ✔ x = −5   · x = −3 [g9_counter_not_hyp]
  pièges : g9_counter_not_hyp

```

### Niveau 2

```
Cet énoncé est faux. Donne un contre-exemple.
  « ∀n ∈ ℕ, n² + n + 41 est premier » (faux, contre-exemple demandé) → FAUX
    contre-exemple (composite) : n = 40
  aides : Un seul exemple qui ne marche pas suffit à montrer qu'un « pour tout » est faux. | Cherche un n qui rend n² + n + 41 divisible par 41 : par exemple n = 41. | n = 40
  pièges : g9_proof_by_example

Cet énoncé est faux. Donne un contre-exemple.
  « ∀x ∈ ℝ, x² ≥ x » (faux, contre-exemple demandé) → FAUX
    contre-exemple (refute) : x = 1/2
  aides : Un seul exemple qui ne marche pas suffit à montrer qu'un « pour tout » est faux. | Essaie une valeur négative, ou entre 0 et 1. | x = 1/2
  pièges : g9_proof_by_example

Cet énoncé est faux. Donne un contre-exemple.
  « ∀x > 0, 1/x < 1 » (faux, contre-exemple demandé) → FAUX
    contre-exemple (refute) : x = 1/2
  aides : Un seul exemple qui ne marche pas suffit à montrer qu'un « pour tout » est faux. | Essaie une valeur négative, ou entre 0 et 1. | x = 1/2
  pièges : g9_proof_by_example

```

### Niveau 3

```
Vrai ou faux ?
  « ∀x ∈ ℝ, x² ≥ x ⇒ x ≥ 1 » → FAUX
    contre-exemple (refute) : x = -1
  aides : Cherche un x qui vérifie l'hypothèse mais pas la conclusion. | Essaie une valeur négative, ou entre 0 et 1. | x = −1
  pièges : g9_proof_by_example

Vrai ou faux ?
  « ∀x ∈ ℝ, x < 1 ⇒ x² < 1 » → FAUX
    contre-exemple (refute) : x = -2
  aides : Cherche un x qui vérifie l'hypothèse mais pas la conclusion. | Essaie une valeur négative, ou entre 0 et 1. | x = −2
  pièges : g9_proof_by_example

Vrai ou faux ?
  « ∀x ∈ ℝ, x > 1 ⇒ x² > 1 » → VRAI
  aides : Cherche un x qui vérifie l'hypothèse mais pas la conclusion. | Essaie quelques valeurs : trouves-tu un exemple qui ne marche pas ? | Vrai : si x > 1 > 0, alors x² > 1.

```

### Niveau 4

```
Vrai ou faux ?
  « Pour tous ensembles A, B : A ∪ B = A ⇒ B = ∅ » → FAUX
    contre-exemple (refute) : A = {1}, B = {1}
  aides : Cherche un x qui vérifie l'hypothèse mais pas la conclusion. | Essaie de tout petits ensembles : ∅, {1}, {1 ; 2}. | A = {1}, B = {1}
  pièges : g9_proof_by_example

Vrai ou faux ?
  « Pour tous ensembles A, B : (A ∪ B) ∖ B = A » → FAUX
    contre-exemple (refute) : A = {1}, B = {1}
  aides : Un seul exemple qui ne marche pas suffit à montrer qu'un « pour tout » est faux. | Essaie de tout petits ensembles : ∅, {1}, {1 ; 2}. | A = {1}, B = {1}
  pièges : g9_proof_by_example

Vrai ou faux ?
  « Pour tous ensembles A, B : (A ∪ B) ∖ B = A » → FAUX
    contre-exemple (refute) : A = {1}, B = {1}
  aides : Un seul exemple qui ne marche pas suffit à montrer qu'un « pour tout » est faux. | Essaie de tout petits ensembles : ∅, {1}, {1 ; 2}. | A = {1}, B = {1}
  pièges : g9_proof_by_example

```

### Niveau 5

```
Vrai ou faux ?
  « ∀x ∈ ℝ, x² ≥ x ⇒ x ≥ 1 » → FAUX
    contre-exemple (refute) : x = -1
  pièges : g9_proof_by_example

Vrai ou faux ?
  « ∀x ∈ ℝ, x > 4 ⇒ x² > 16 » → VRAI

Vrai ou faux ?
  « ∀a, b ∈ ℝ, (a + b)² = a² + b² » → FAUX
    contre-exemple (refute) : a = 1, b = 1
  pièges : g9_proof_by_example

```

### Variantes d'examen

```
Vrai ou faux ?
  « ∀x ∈ ℝ, |x| ≥ x » → VRAI
  [examen tf]

Lequel est un contre-exemple à « ∀x ∈ ℝ, x² > 16 ⇒ x > 4 » ?
  ✔ x = −5   · x = 5   · x = −4 [g9_counter_not_hyp]   · x = 0 [g9_counter_not_hyp]
  [examen mcq]
  pièges : g9_counter_not_hyp

```

## Preuve directe et par contraposée (`g9-proof-contra`, Gymnase)

_Supposer ¬Q pour arriver à ¬P._

### Niveau 1

```
Preuve : si x² < 1, alors |x| < 1 (x ∈ ℝ).Montrons la contraposée : si |x| ≥ 1, alors x² ≥ 1.…x² = |x|² ≥ 1² = 1, car t ↦ t² est croissante sur [0 ; +∞[.Donc x² ≥ 1.La contraposée est vraie, donc l'énoncé l'est aussi.Quel bloc manque ?
  · Soit |x| < 1 : alors x² < 1. [g9_converse_contra]   ✔ Soit x avec |x| ≥ 1.
  pièges : g9_converse_contra

Preuve : si x² < 1, alors |x| < 1 (x ∈ ℝ).Montrons la contraposée : si |x| ≥ 1, alors x² ≥ 1.Soit x avec |x| ≥ 1.…Donc x² ≥ 1.La contraposée est vraie, donc l'énoncé l'est aussi.Quel bloc manque ?
  ✔ x² = |x|² ≥ 1² = 1, car t ↦ t² est croissante sur [0 ; +∞[.   · x = 1/2 donne x² = 1/4 < 1 et |x| < 1, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_proof_by_example

Preuve : si n + m est impair, alors n ou m est pair (n, m ∈ ℤ).Montrons la contraposée : si n et m sont impairs, alors n + m est pair.…n + m = 2k + 2l + 2 = 2(k + l + 1).Donc n + m est pair.La contraposée est vraie, donc l'énoncé l'est aussi.Quel bloc manque ?
  · 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]   ✔ Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
  pièges : g9_proof_by_example

```

### Niveau 2

```
Montre que si n + m est impair, alors n ou m est pair (n, m ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Montrons la contraposée : si n et m sont impairs, alors n + m est pair.
    2. Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
    3. n + m = 2k + 2l + 2 = 2(k + l + 1).
    4. Donc n + m est pair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_proof_by_example

Montre que si n + m est impair, alors n ou m est pair (n, m ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Montrons la contraposée : si n et m sont impairs, alors n + m est pair.
    2. Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
    3. n + m = 2k + 2l + 2 = 2(k + l + 1).
    4. Donc n + m est pair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_proof_by_example

Montre que si x² < 1, alors |x| < 1 (x ∈ ℝ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Montrons la contraposée : si |x| ≥ 1, alors x² ≥ 1.
    2. Soit x avec |x| ≥ 1.
    3. x² = |x|² ≥ 1² = 1, car t ↦ t² est croissante sur [0 ; +∞[.
    4. Donc x² ≥ 1.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ x = 1/2 donne x² = 1/4 < 1 et |x| < 1, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_proof_by_example

```

### Niveau 3

```
Montre que si n² est multiple de 3, alors n est multiple de 3 (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n n'est pas multiple de 3, alors n² n'est pas multiple de 3.
    2. n n'est pas multiple de 3 : n = 3k + 1 ou n = 3k + 2, avec k ∈ ℤ.
    3. Si n = 3k + 1 : n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1.
    4. Si n = 3k + 2 : n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1.
    5. Dans les deux cas, n² = 3m + 1 : n² n'est pas multiple de 3.
    6. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n = 3k : n² = 9k² est multiple de 3. [g9_converse_contra]
    ✗ 3² = 9 et 6² = 36 sont multiples de 3, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

Montre que si n² est pair, alors n est pair (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n est impair, alors n² est impair.
    2. Soit n impair : n = 2k + 1, avec k ∈ ℤ.
    3. n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.
    4. Donc n² est impair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n pair : n = 2k, donc n² = 4k² est pair. [g9_converse_contra]
    ✗ 2² = 4 et 4² = 16 sont pairs, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

Montre que si x² < 1, alors |x| < 1 (x ∈ ℝ). Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si |x| ≥ 1, alors x² ≥ 1.
    2. Soit x avec |x| ≥ 1.
    3. x² = |x|² ≥ 1² = 1, car t ↦ t² est croissante sur [0 ; +∞[.
    4. Donc x² ≥ 1.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit |x| < 1 : alors x² < 1. [g9_converse_contra]
    ✗ x = 1/2 donne x² = 1/4 < 1 et |x| < 1, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

```

### Niveau 4

```
Montre que si n + m est impair, alors n ou m est pair (n, m ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n et m sont impairs, alors n + m est pair.
    2. Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
    3. n + m = 2k + 2l + 2 = 2(k + l + 1).   [à écrire : n + m = (2k + 1) + (2l + 1) = 2(k+l+1)]
    4. Donc n + m est pair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n pair : alors n + m a la parité de m. [g9_converse_contra]
    ✗ 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

Montre que si n + m est impair, alors n ou m est pair (n, m ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n et m sont impairs, alors n + m est pair.
    2. Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
    3. n + m = 2k + 2l + 2 = 2(k + l + 1).   [à écrire : n + m = (2k + 1) + (2l + 1) = 2(k+l+1)]
    4. Donc n + m est pair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]
    ✗ Soit n pair : alors n + m a la parité de m. [g9_converse_contra]
  pièges : g9_proof_by_example, g9_converse_contra

Montre que si n² est multiple de 3, alors n est multiple de 3 (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n n'est pas multiple de 3, alors n² n'est pas multiple de 3.
    2. n n'est pas multiple de 3 : n = 3k + 1 ou n = 3k + 2, avec k ∈ ℤ.
    3. Si n = 3k + 1 : n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1.   [à écrire : n² = (3k + 1)² = 3(3k^2+2k)+1]
    4. Si n = 3k + 2 : n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1.
    5. Dans les deux cas, n² = 3m + 1 : n² n'est pas multiple de 3.
    6. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n = 3k : n² = 9k² est multiple de 3. [g9_converse_contra]
    ✗ 3² = 9 et 6² = 36 sont multiples de 3, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

```

### Niveau 5

```
Montre que si n² est pair, alors n est pair (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n est impair, alors n² est impair.
    2. Soit n impair : n = 2k + 1, avec k ∈ ℤ.
    3. n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.   [à écrire : n² = (2k + 1)² = 2(2k^2+2k)+1]
    4. Donc n² est impair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n pair : n = 2k, donc n² = 4k² est pair. [g9_converse_contra]
    ✗ 2² = 4 et 4² = 16 sont pairs, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

Montre que si n² est multiple de 3, alors n est multiple de 3 (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n n'est pas multiple de 3, alors n² n'est pas multiple de 3.
    2. n n'est pas multiple de 3 : n = 3k + 1 ou n = 3k + 2, avec k ∈ ℤ.
    3. Si n = 3k + 1 : n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1.   [à écrire : n² = (3k + 1)² = 3(3k^2+2k)+1]
    4. Si n = 3k + 2 : n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1.
    5. Dans les deux cas, n² = 3m + 1 : n² n'est pas multiple de 3.
    6. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ 3² = 9 et 6² = 36 sont multiples de 3, donc c'est vrai. [g9_proof_by_example]
    ✗ Soit n = 3k : n² = 9k² est multiple de 3. [g9_converse_contra]
  pièges : g9_proof_by_example, g9_converse_contra

Montre que si n² est pair, alors n est pair (n ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
    1. Montrons la contraposée : si n est impair, alors n² est impair.
    2. Soit n impair : n = 2k + 1, avec k ∈ ℤ.
    3. n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.   [à écrire : n² = (2k + 1)² = 2(2k^2+2k)+1]
    4. Donc n² est impair.
    5. La contraposée est vraie, donc l'énoncé l'est aussi.
    ✗ Soit n pair : n = 2k, donc n² = 4k² est pair. [g9_converse_contra]
    ✗ 2² = 4 et 4² = 16 sont pairs, donc c'est vrai. [g9_proof_by_example]
  pièges : g9_converse_contra, g9_proof_by_example

```

### Variantes d'examen

```
Montre que si n + m est impair, alors n ou m est pair (n, m ∈ ℤ). Touche les blocs dans l'ordre de la preuve.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [blocs frame, sans aide]
      ? Preuve directe ou par contraposée ? ✔ Par contraposée / ~ Preuve directe
      1. Montrons la contraposée : si n et m sont impairs, alors n + m est pair.
      2. Soit n = 2k + 1 et m = 2l + 1, avec k, l ∈ ℤ.
      3. n + m = 2k + 2l + 2 = 2(k + l + 1).   [à écrire : n + m = (2k + 1) + (2l + 1) = 2(k+l+1)]
      4. Donc n + m est pair.
      5. La contraposée est vraie, donc l'énoncé l'est aussi.
      ✗ 3 + 4 = 7 est impair et 4 est pair, donc c'est vrai. [g9_proof_by_example]
      ✗ Soit n pair : alors n + m a la parité de m. [g9_converse_contra]
    [examen open]
  pièges : g9_proof_by_example, g9_converse_contra

```

## Preuve par l'absurde (`g9-proof-absurd`, Gymnase)

_Supposer la négation, arriver à une contradiction._

### Niveau 1

```
Preuve : √7 est irrationnel.Supposons √7 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.…7 divise a², et 7 est premier, donc 7 divise a : a = 7c.49c² = 7b², donc b² = 7c², donc 7 divise b.7 divise a et b : contradiction avec pgcd(a, b) = 1.Donc √7 est irrationnel.Quel bloc manque ?
  ✔ Alors a² = 7b².   · √7 ≈ 2,6458… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_proof_by_example

Preuve : il n'existe pas de plus grand entier.Supposons qu'il existe un plus grand entier N.…N + 1 > N : N n'est pas le plus grand, contradiction.Donc il n'existe pas de plus grand entier.Quel bloc manque ?
  · Supposons qu'il n'existe pas de plus grand entier. [g9_absurd_wrong_assumption]   ✔ Alors N + 1 est aussi un entier.
  pièges : g9_absurd_wrong_assumption

Preuve : √5 est irrationnel.Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.Alors a² = 5b².5 divise a², et 5 est premier, donc 5 divise a : a = 5c.…5 divise a et b : contradiction avec pgcd(a, b) = 1.Donc √5 est irrationnel.Quel bloc manque ?
  ✔ 25c² = 5b², donc b² = 5c², donc 5 divise b.   · √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_proof_by_example

```

### Niveau 2

```
Montre que log₂ 3 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Supposons log₂ 3 = a/b, avec a, b ∈ ℕ*.
    2. Alors 2^(a/b) = 3, donc 2^a = 3^b.
    3. 2^a est pair et 3^b est impair : contradiction.
    4. Donc log₂ 3 est irrationnel.
    ✗ Supposons log₂ 3 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_absurd_wrong_assumption

Montre que il n'existe pas de plus grand entier. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Supposons qu'il existe un plus grand entier N.
    2. Alors N + 1 est aussi un entier.
    3. N + 1 > N : N n'est pas le plus grand, contradiction.
    4. Donc il n'existe pas de plus grand entier.
    ✗ Supposons qu'il n'existe pas de plus grand entier. [g9_absurd_wrong_assumption]
  pièges : g9_absurd_wrong_assumption

Montre que log₂ 3 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    1. Supposons log₂ 3 = a/b, avec a, b ∈ ℕ*.
    2. Alors 2^(a/b) = 3, donc 2^a = 3^b.
    3. 2^a est pair et 3^b est impair : contradiction.
    4. Donc log₂ 3 est irrationnel.
    ✗ Supposons log₂ 3 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_absurd_wrong_assumption

```

### Niveau 3

```
Montre que log₂ 3 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons log₂ 3 = a/b, avec a, b ∈ ℕ*.
    2. Alors 2^(a/b) = 3, donc 2^a = 3^b.
    3. 2^a est pair et 3^b est impair : contradiction.
    4. Donc log₂ 3 est irrationnel.
    ✗ Supposons log₂ 3 irrationnel. [g9_absurd_wrong_assumption]
    ✗ log₂ 3 ≈ 1,585 n'est pas une fraction simple, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_absurd_wrong_assumption, g9_proof_by_example

Montre que log₂ 3 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons log₂ 3 = a/b, avec a, b ∈ ℕ*.
    2. Alors 2^(a/b) = 3, donc 2^a = 3^b.
    3. 2^a est pair et 3^b est impair : contradiction.
    4. Donc log₂ 3 est irrationnel.
    ✗ log₂ 3 ≈ 1,585 n'est pas une fraction simple, donc il est irrationnel. [g9_proof_by_example]
    ✗ Supposons log₂ 3 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_proof_by_example, g9_absurd_wrong_assumption

Montre que √2 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs order]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √2 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 2b².
    3. 2 divise a², et 2 est premier, donc 2 divise a : a = 2c.
    4. 4c² = 2b², donc b² = 2c², donc 2 divise b.
    5. 2 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √2 est irrationnel.
    ✗ √2 ≈ 1,4142… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
    ✗ Supposons √2 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_proof_by_example, g9_absurd_wrong_assumption

```

### Niveau 4

```
Montre que √5 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 5b².   [à écrire : En élevant √5 = a/b au carré : a^2=5b^2]
    3. 5 divise a², et 5 est premier, donc 5 divise a : a = 5c.
    4. 25c² = 5b², donc b² = 5c², donc 5 divise b.
    5. 5 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √5 est irrationnel.
    ✗ Supposons √5 irrationnel. [g9_absurd_wrong_assumption]
    ✗ √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_absurd_wrong_assumption, g9_proof_by_example

Montre que √5 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 5b².   [à écrire : En élevant √5 = a/b au carré : a^2=5b^2]
    3. 5 divise a², et 5 est premier, donc 5 divise a : a = 5c.
    4. 25c² = 5b², donc b² = 5c², donc 5 divise b.
    5. 5 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √5 est irrationnel.
    ✗ √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
    ✗ Supposons √5 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_proof_by_example, g9_absurd_wrong_assumption

Montre que √5 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 5b².   [à écrire : En élevant √5 = a/b au carré : a^2=5b^2]
    3. 5 divise a², et 5 est premier, donc 5 divise a : a = 5c.
    4. 25c² = 5b², donc b² = 5c², donc 5 divise b.
    5. 5 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √5 est irrationnel.
    ✗ √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
    ✗ Supposons √5 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_proof_by_example, g9_absurd_wrong_assumption

```

### Niveau 5

```
Montre que √5 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 5b².   [à écrire : En élevant √5 = a/b au carré : a^2=5b^2]
    3. 5 divise a², et 5 est premier, donc 5 divise a : a = 5c.
    4. 25c² = 5b², donc b² = 5c², donc 5 divise b.
    5. 5 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √5 est irrationnel.
    ✗ Supposons √5 irrationnel. [g9_absurd_wrong_assumption]
    ✗ √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_absurd_wrong_assumption, g9_proof_by_example

Montre que √5 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √5 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 5b².   [à écrire : En élevant √5 = a/b au carré : a^2=5b^2]
    3. 5 divise a², et 5 est premier, donc 5 divise a : a = 5c.
    4. 25c² = 5b², donc b² = 5c², donc 5 divise b.
    5. 5 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √5 est irrationnel.
    ✗ Supposons √5 irrationnel. [g9_absurd_wrong_assumption]
    ✗ √5 ≈ 2,2361… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
  pièges : g9_absurd_wrong_assumption, g9_proof_by_example

Montre que √7 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [blocs frame, sans aide]
    ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
    1. Supposons √7 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
    2. Alors a² = 7b².   [à écrire : En élevant √7 = a/b au carré : a^2=7b^2]
    3. 7 divise a², et 7 est premier, donc 7 divise a : a = 7c.
    4. 49c² = 7b², donc b² = 7c², donc 7 divise b.
    5. 7 divise a et b : contradiction avec pgcd(a, b) = 1.
    6. Donc √7 est irrationnel.
    ✗ √7 ≈ 2,6458… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
    ✗ Supposons √7 irrationnel. [g9_absurd_wrong_assumption]
  pièges : g9_proof_by_example, g9_absurd_wrong_assumption

```

### Variantes d'examen

```
Montre que √3 est irrationnel. Touche les blocs dans l'ordre de la preuve.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [blocs frame, sans aide]
      ? Que suppose-t-on ? ✔ La négation de l'énoncé / · L'énoncé lui-même / · La réciproque / · Un exemple
      1. Supposons √3 = a/b, avec a, b ∈ ℕ* et pgcd(a, b) = 1.
      2. Alors a² = 3b².   [à écrire : En élevant √3 = a/b au carré : a^2=3b^2]
      3. 3 divise a², et 3 est premier, donc 3 divise a : a = 3c.
      4. 9c² = 3b², donc b² = 3c², donc 3 divise b.
      5. 3 divise a et b : contradiction avec pgcd(a, b) = 1.
      6. Donc √3 est irrationnel.
      ✗ Supposons √3 irrationnel. [g9_absurd_wrong_assumption]
      ✗ √3 ≈ 1,7321… n'a pas de période visible, donc il est irrationnel. [g9_proof_by_example]
    [examen open]
  pièges : g9_absurd_wrong_assumption, g9_proof_by_example

```

## Pièges de cette unité

- **Ensemble image lu comme l'ensemble des indices** (`g9_set_builder`, E) : {3n + 1 | n ≤ 3} = {0 ; 1 ; 2 ; 3} au lieu de {3n + 1 | n ≤ 3} = {1 ; 4 ; 7 ; 10}
- **« et » et « ou » confondus (∩ et ∪)** (`g9_union_inter`, E) : x < −1 ou x > 2 : ]−∞ ; −1[ ∩ ]2 ; +∞[ au lieu de x < −1 ou x > 2 : ]−∞ ; −1[ ∪ ]2 ; +∞[
- **Crochet tourné du mauvais côté** (`g9_bracket`, E) : −1 < x ≤ 3 : [−1 ; 3] au lieu de −1 < x ≤ 3 : ]−1 ; 3]
- **De Morgan sans changer ∧ en ∨** (`g9_demorgan`, E) : ¬(P ∧ Q) ≡ ¬P ∧ ¬Q au lieu de ¬(P ∧ Q) ≡ ¬P ∨ ¬Q
- **Négation d'une implication écrite comme une implication** (`g9_neg_implication`, E) : ¬(P ⇒ Q) ≡ ¬P ⇒ ¬Q au lieu de ¬(P ⇒ Q) ≡ P ∧ ¬Q
- **Réciproque prise pour la contraposée** (`g9_converse_contra`, E) : contraposée de P ⇒ Q : Q ⇒ P au lieu de contraposée de P ⇒ Q : ¬Q ⇒ ¬P
- **Ordre des quantificateurs ∀∃ et ∃∀ confondu** (`g9_quant_order`, R) : ∃y ∀x, x + y = 0 lu comme ∀x ∃y, x + y = 0 au lieu de ∃y ∀x : un même y pour tous les x
- **Un seul quantificateur changé dans la négation** (`g9_neg_one_quant`, R) : ¬(∀x ∃y, P) ≡ ∃x ∃y, ¬P au lieu de ¬(∀x ∃y, P) ≡ ∃x ∀y, ¬P
- **Quantificateurs changés, propriété pas niée** (`g9_neg_pred_kept`, E) : ¬(∀x, x² ≥ 0) ≡ ∃x, x² ≥ 0 au lieu de ¬(∀x, x² ≥ 0) ≡ ∃x, x² < 0
- **Restriction d'un quantificateur niée (ε > 0 devenu ε ≤ 0)** (`g9_neg_restriction`, E) : ¬(∀ε > 0, P) ≡ ∃ε ≤ 0, ¬P au lieu de ¬(∀ε > 0, P) ≡ ∃ε > 0, ¬P
- **Négation d'une inégalité stricte : > au lieu de ≥** (`g9_neg_strict`, E) : ¬(x < 3) ≡ x > 3 au lieu de ¬(x < 3) ≡ x ≥ 3
- **Preuve par des exemples** (`g9_proof_by_example`, R) : « vrai pour n = 1, 2, 3, donc pour tout n » au lieu de des exemples ne prouvent pas un « pour tout »
- **Contre-exemple qui ne vérifie pas l'hypothèse** (`g9_counter_not_hyp`, E) : « x² > 4 ⇒ x > 2 » réfuté par x = 1 au lieu de « x² > 4 ⇒ x > 2 » réfuté par x = −3
- **Par l'absurde : on suppose l'énoncé au lieu de sa négation** (`g9_absurd_wrong_assumption`, E) : « Supposons √5 irrationnel » au lieu de « Supposons √5 rationnel »
