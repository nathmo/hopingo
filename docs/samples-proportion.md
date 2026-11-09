# Exemples de questions — Proportionnalité et pourcentages

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Proportionnel ou pas ? (`prop-detect`, 9H)

_Multiplier par le même nombre, pas ajouter._

### Niveau 1

```
Ce tableau est-il proportionnel ?x23810y12174252
  · Oui : les deux lignes augmentent [additive_reasoning]   · Oui : y grandit quand x grandit [additive_reasoning]   ✔ Non : 12 ÷ 2 et 17 ÷ 3 ne donnent pas le même nombre
  pièges : additive_reasoning

Ce tableau est-il proportionnel ?x15810y6264151
  · Oui : les deux lignes augmentent [additive_reasoning]   ✔ Non : 6 ÷ 1 et 26 ÷ 5 ne donnent pas le même nombre   · Oui : y grandit quand x grandit [additive_reasoning]
  pièges : additive_reasoning

Ce tableau est-il proportionnel ?x46810y12182430
  · Non : on n'ajoute pas toujours le même nombre [additive_reasoning]   · Non : les nombres ne se suivent pas   ✔ Oui : on multiplie toujours par 3
  pièges : additive_reasoning

```

### Niveau 2

```
Ce tableau est-il proportionnel ?x35610y8,511,51319
  · Oui : les deux lignes augmentent [additive_reasoning]   ✔ Non : 8,5 ÷ 3 et 11,5 ÷ 5 ne donnent pas le même nombre   · Oui : y grandit quand x grandit [additive_reasoning]
  pièges : additive_reasoning

Ce tableau est-il proportionnel ?x25810y714,52227
  · Oui : y grandit quand x grandit [additive_reasoning]   ✔ Non : 7 ÷ 2 et 14,5 ÷ 5 ne donnent pas le même nombre   · Oui : les deux lignes augmentent [additive_reasoning]
  pièges : additive_reasoning

Ce tableau est-il proportionnel ?x25610y59,51117
  · Oui : y grandit quand x grandit [additive_reasoning]   ✔ Non : 5 ÷ 2 et 9,5 ÷ 5 ne donnent pas le même nombre   · Oui : les deux lignes augmentent [additive_reasoning]
  pièges : additive_reasoning

```

### Niveau 3

```
Il faut 6 minutes pour cuire 2 œufs dans une casserole. Combien de temps pour 4 œufs dans la même casserole ?
  · 8 minutes [additive_reasoning]   · 12 minutes [linearity_illusion]   ✔ 6 minutes   · 3 minutes
  pièges : linearity_illusion, additive_reasoning

Il faut 6 minutes pour cuire 2 œufs dans une casserole. Combien de temps pour 4 œufs dans la même casserole ?
  ✔ 6 minutes   · 8 minutes [additive_reasoning]   · 12 minutes [linearity_illusion]   · 3 minutes
  pièges : linearity_illusion, additive_reasoning

Léa a 10 ans et son frère 5 ans. Quel âge aura le frère quand Léa aura 20 ans ?
  · 40 ans   · 10 ans [linearity_illusion]   ✔ 15 ans   · 20 ans
  pièges : linearity_illusion

```

### Niveau 4

```
L'arête d'un cube triple. Que devient son volume ?
  ✔ Il est multiplié par 27   · Il augmente de 3 [additive_reasoning]   · Il est multiplié par 9   · Il triple [linearity_illusion]
  pièges : linearity_illusion, additive_reasoning

Un rectangle de 2 cm sur 3 cm est agrandi à 4 cm sur 5 cm. Est-ce un agrandissement proportionnel ?
  ✔ Non : 2 × 2 = 4 mais 3 × 2 ≠ 5   · Oui : les deux côtés ont grandi   · Oui : on a ajouté 2 cm à chaque côté [additive_reasoning]   · On ne peut pas savoir
  pièges : additive_reasoning

L'arête d'un cube triple. Que devient son volume ?
  · Il triple [linearity_illusion]   · Il augmente de 3 [additive_reasoning]   · Il est multiplié par 9   ✔ Il est multiplié par 27
  pièges : linearity_illusion, additive_reasoning

```

### Niveau 5

```
3 kg de pommes coûtent 7,50 CHF. Combien coûtent 6 kg ?
  · 10,50 CHF [additive_reasoning]   · 7,50 CHF   ✔ 15 CHF   · 30 CHF
  pièges : additive_reasoning

3 kg de pommes coûtent 7,50 CHF. Combien coûtent 6 kg ?
  · 10,50 CHF [additive_reasoning]   · 30 CHF   · 7,50 CHF   ✔ 15 CHF
  pièges : additive_reasoning

3 kg de pommes coûtent 7,50 CHF. Combien coûtent 6 kg ?
  · 10,50 CHF [additive_reasoning]   · 30 CHF   ✔ 15 CHF   · 7,50 CHF
  pièges : additive_reasoning

```

## Règle de trois (`prop-rule3`, 9H)

_Passer par l'unité._

### Niveau 1

```
3 kg de pommes coûtent 21 CHF. Combien coûtent 6 kg de pommes ?
  → 42   pièges attendus : 24 [additive_reasoning], 21/2 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

2 m de tissu coûtent 18 CHF. Combien coûtent 6 m de tissu ?
  → 54   pièges attendus : 22 [additive_reasoning], 6 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

4 L d'essence coûtent 12 CHF. Combien coûtent 8 L d'essence ?
  → 24   pièges attendus : 16 [additive_reasoning], 6 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

```

### Niveau 2

```
6 kg de pommes coûtent 7,2 CHF. Combien coûtent 11 kg de pommes ?
  → 13,2   pièges attendus : 61/5 [additive_reasoning]
  pièges : additive_reasoning

6 cahiers coûtent 15 CHF. Combien coûtent 7 cahiers ?
  → 17,5   pièges attendus : 16 [additive_reasoning]
  pièges : additive_reasoning

7 kg de pommes coûtent 10,5 CHF. Combien coûtent 9 kg de pommes ?
  → 13,5   pièges attendus : 25/2 [additive_reasoning]
  pièges : additive_reasoning

```

### Niveau 3

```
5 L d'essence coûtent 12 CHF. Combien coûtent 2 L d'essence ?
  → 4,8   pièges attendus : 9 [additive_reasoning], 30 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

6 kg de pommes coûtent 11,1 CHF. Combien coûtent 12 kg de pommes ?
  → 22,2   pièges attendus : 171/10 [additive_reasoning], 111/20 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

6 kg de pommes coûtent 7,5 CHF. Combien coûtent 5 kg de pommes ?
  → 6,25   pièges attendus : 13/2 [additive_reasoning], 9 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

```

### Niveau 4

```
3 ouvriers construisent un mur en 12 jours. Combien de jours faut-il à 6 ouvriers (même rythme) ?
  → 6   pièges attendus : 24 [rule3_inverted], 15 [additive_reasoning]
  pièges : rule3_inverted, additive_reasoning

4 ouvriers construisent un mur en 6 jours. Combien de jours faut-il à 2 ouvriers (même rythme) ?
  → 12   pièges attendus : 3 [rule3_inverted], 4 [additive_reasoning]
  pièges : rule3_inverted, additive_reasoning

3 ouvriers construisent un mur en 12 jours. Combien de jours faut-il à 12 ouvriers (même rythme) ?
  → 3   pièges attendus : 48 [rule3_inverted], 21 [additive_reasoning]
  pièges : rule3_inverted, additive_reasoning

```

### Niveau 5

```
5 m de tissu coûtent 12 CHF. Combien coûtent 11 m de tissu ?
  → 26,4   pièges attendus : 18 [additive_reasoning]
  pièges : additive_reasoning

6 L d'essence coûtent 21,6 CHF. Combien coûtent 8 L d'essence ?
  → 28,8   pièges attendus : 118/5 [additive_reasoning], 81/5 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

4 m de tissu coûtent 9,6 CHF. Combien coûtent 5 m de tissu ?
  → 12   pièges attendus : 53/5 [additive_reasoning], 192/25 [rule3_inverted]
  pièges : additive_reasoning, rule3_inverted

```

## Échelles (`prop-scale`, 9H)

_Plans et cartes, dans les deux sens._

### Niveau 1

```
Sur un plan à l'échelle 1 : 50, une pièce mesure 11 cm. Combien mesure-t-elle en vrai, en mètres ?
  → 5,5   pièges attendus : 550 [scale_forget_convert], 11/50 [convert_wrong_direction]
  pièges : scale_forget_convert, convert_wrong_direction

Sur un plan à l'échelle 1 : 50, une pièce mesure 4 cm. Combien mesure-t-elle en vrai, en mètres ?
  → 2   pièges attendus : 200 [scale_forget_convert], 2/25 [convert_wrong_direction]
  pièges : scale_forget_convert, convert_wrong_direction

Sur un plan à l'échelle 1 : 200, une pièce mesure 6 cm. Combien mesure-t-elle en vrai, en mètres ?
  → 12   pièges attendus : 1200 [scale_forget_convert], 3/100 [convert_wrong_direction]
  pièges : scale_forget_convert, convert_wrong_direction

```

### Niveau 2

```
Sur une carte au 1 : 10 000, deux villages sont à 4 cm. Quelle est la vraie distance, en km ?
  → 0,4   pièges attendus : 40000 [scale_forget_convert], 40 [scale_forget_convert]
  pièges : scale_forget_convert

Sur une carte au 1 : 10 000, deux villages sont à 6 cm. Quelle est la vraie distance, en km ?
  → 0,6   pièges attendus : 60000 [scale_forget_convert], 60 [scale_forget_convert]
  pièges : scale_forget_convert

Sur une carte au 1 : 10 000, deux villages sont à 5 cm. Quelle est la vraie distance, en km ?
  → 0,5   pièges attendus : 50000 [scale_forget_convert], 50 [scale_forget_convert]
  pièges : scale_forget_convert

```

### Niveau 3

```
Sur une carte au 1 : 25 000, combien de cm représentent 1,5 km ?
  → 6   pièges attendus : 37500 [convert_wrong_direction]
  pièges : convert_wrong_direction

Sur une carte au 1 : 100 000, combien de cm représentent 8 km ?
  → 8   pièges attendus : 800000 [convert_wrong_direction]
  pièges : convert_wrong_direction

Sur une carte au 1 : 25 000, combien de cm représentent 0,75 km ?
  → 3   pièges attendus : 18750 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 4

```
Sur une carte, 4 cm représentent 2 km. L'échelle est 1 : …
  → 50000   pièges attendus : 1/2 [scale_forget_convert], 500 [scale_forget_convert]
  pièges : scale_forget_convert

Sur une carte, 5 cm représentent 2,5 km. L'échelle est 1 : …
  → 50000   pièges attendus : 1/2 [scale_forget_convert], 500 [scale_forget_convert]
  pièges : scale_forget_convert

Sur une carte, 2 cm représentent 0,5 km. L'échelle est 1 : …
  → 25000   pièges attendus : 1/4 [scale_forget_convert], 250 [scale_forget_convert]
  pièges : scale_forget_convert

```

### Niveau 5

```
Sur un plan au 1 : 50, une pièce a une aire de 30 cm². Quelle est son aire réelle, en m² ?
  → 7,5   pièges attendus : 3/20 [linearity_illusion], 15 [linearity_illusion]
  pièges : linearity_illusion

Sur un plan au 1 : 10, une pièce a une aire de 6 cm². Quelle est son aire réelle, en m² ?
  → 0,06   pièges attendus : 3/500 [linearity_illusion], 3/5 [linearity_illusion]
  pièges : linearity_illusion

Sur un plan au 1 : 50, une pièce a une aire de 30 cm². Quelle est son aire réelle, en m² ?
  → 7,5   pièges attendus : 3/20 [linearity_illusion], 15 [linearity_illusion]
  pièges : linearity_illusion

```

## Pourcentage d'une quantité (`pct-of`, 9H)

_15 % de 80._

### Niveau 1

```
Combien font 50 % de 40 ?
  → 20   pièges attendus : 200 [percent_shift], 2 [percent_shift]
  pièges : percent_shift

Combien font 10 % de 360 ?
  → 36   pièges attendus : 360 [percent_shift], 18/5 [percent_shift], 350 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 25 % de 120 ?
  → 30   pièges attendus : 300 [percent_shift], 3 [percent_shift], 95 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

```

### Niveau 2

```
Combien font 40 % de 80 ?
  → 32   pièges attendus : 320 [percent_shift], 16/5 [percent_shift], 40 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 5 % de 240 ?
  → 12   pièges attendus : 120 [percent_shift], 6/5 [percent_shift], 235 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 75 % de 60 ?
  → 45   pièges attendus : 450 [percent_shift], 9/2 [percent_shift]
  pièges : percent_shift

```

### Niveau 3

```
Combien font 12,5 % de 240 ?
  → 30   pièges attendus : 300 [percent_shift], 3 [percent_shift], 455/2 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 7,5 % de 240 ?
  → 18   pièges attendus : 180 [percent_shift], 9/5 [percent_shift], 465/2 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 2,5 % de 160 ?
  → 4   pièges attendus : 40 [percent_shift], 2/5 [percent_shift], 315/2 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

```

### Niveau 4

```
Combien font 8 % de 250 ?
  → 20   pièges attendus : 200 [percent_shift], 2 [percent_shift], 242 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 17 % de 50 ?
  → 8,5   pièges attendus : 85 [percent_shift], 17/20 [percent_shift], 33 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

Combien font 17 % de 50 ?
  → 8,5   pièges attendus : 85 [percent_shift], 17/20 [percent_shift], 33 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

```

### Niveau 5

```
La TVA est de 8,1 %. Combien de TVA sur un achat de 500 CHF ?
  → 40,5   pièges attendus : 405 [percent_shift], 81/20 [percent_shift], 4919/10 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

La TVA est de 7,7 %. Combien de TVA sur un achat de 300 CHF ?
  → 23,1   pièges attendus : 231 [percent_shift], 231/100 [percent_shift], 2923/10 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

La TVA est de 2,6 %. Combien de TVA sur un achat de 300 CHF ?
  → 7,8   pièges attendus : 78 [percent_shift], 39/50 [percent_shift], 1487/5 [percent_as_amount]
  pièges : percent_shift, percent_as_amount

```

## Quel pourcentage ? (`pct-which`, 9H)

_Une part du total, en %._

### Niveau 1

```
17 sur 50, c'est quel pourcentage ?
  → 34   pièges attendus : 17/50 [percent_shift]
  pièges : percent_shift

19 sur 20, c'est quel pourcentage ?
  → 95   pièges attendus : 19/20 [percent_shift]
  pièges : percent_shift

16 sur 20, c'est quel pourcentage ?
  → 80   pièges attendus : 125 [percent_inverted], 4/5 [percent_shift]
  pièges : percent_inverted, percent_shift

```

### Niveau 2

```
38 sur 40, c'est quel pourcentage ?
  → 95   pièges attendus : 19/20 [percent_shift]
  pièges : percent_shift

64 sur 200, c'est quel pourcentage ?
  → 32   pièges attendus : 625/2 [percent_inverted], 8/25 [percent_shift]
  pièges : percent_inverted, percent_shift

34 sur 40, c'est quel pourcentage ?
  → 85   pièges attendus : 17/20 [percent_shift]
  pièges : percent_shift

```

### Niveau 3

```
54 sur 60, c'est quel pourcentage ?
  → 90   pièges attendus : 9/10 [percent_shift]
  pièges : percent_shift

18 sur 40, c'est quel pourcentage ?
  → 45   pièges attendus : 9/20 [percent_shift]
  pièges : percent_shift

8 sur 80, c'est quel pourcentage ?
  → 10   pièges attendus : 1000 [percent_inverted], 1/10 [percent_shift]
  pièges : percent_inverted, percent_shift

```

### Niveau 4

```
112 sur 160, c'est quel pourcentage ?
  → 70   pièges attendus : 7/10 [percent_shift]
  pièges : percent_shift

16 sur 160, c'est quel pourcentage ?
  → 10   pièges attendus : 1000 [percent_inverted], 1/10 [percent_shift]
  pièges : percent_inverted, percent_shift

29 sur 40, c'est quel pourcentage ?
  → 72,5   pièges attendus : 29/40 [percent_shift]
  pièges : percent_shift

```

### Niveau 5

```
Sur un test de 64 points, Tim a obtenu 8 points. Quel pourcentage des points a-t-il obtenu ?
  → 12,5   pièges attendus : 800 [percent_inverted], 1/8 [percent_shift]
  pièges : percent_inverted, percent_shift

Sur un test de 24 points, Tim a obtenu 15 points. Quel pourcentage des points a-t-il obtenu ?
  → 62,5   pièges attendus : 160 [percent_inverted], 5/8 [percent_shift]
  pièges : percent_inverted, percent_shift

Sur un test de 24 points, Tim a obtenu 12 points. Quel pourcentage des points a-t-il obtenu ?
  → 50   pièges attendus : 200 [percent_inverted], 1/2 [percent_shift]
  pièges : percent_inverted, percent_shift

```

## Hausse et baisse en % (`pct-change`, 10H)

_Multiplier par 1,2 ou par 0,85._

### Niveau 1

```
Un article coûte 240 CHF. Son prix baisse de 10 %. Quel est le nouveau prix ?
  → 216   pièges attendus : 230 [percent_as_amount], 24 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 120 CHF. Son prix baisse de 10 %. Quel est le nouveau prix ?
  → 108   pièges attendus : 110 [percent_as_amount], 12 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 120 CHF. Son prix baisse de 10 %. Quel est le nouveau prix ?
  → 108   pièges attendus : 110 [percent_as_amount], 12 [percent_as_amount]
  pièges : percent_as_amount

```

### Niveau 2

```
Un article coûte 200 CHF. Son prix augmente de 20 %. Quel est le nouveau prix ?
  → 240   pièges attendus : 220 [percent_as_amount], 40 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 60 CHF. Son prix baisse de 25 %. Quel est le nouveau prix ?
  → 45   pièges attendus : 35 [percent_as_amount], 15 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 60 CHF. Son prix baisse de 20 %. Quel est le nouveau prix ?
  → 48   pièges attendus : 40 [percent_as_amount], 12 [percent_as_amount]
  pièges : percent_as_amount

```

### Niveau 3

```
Un article coûte 40 CHF. Son prix baisse de 5 %. Quel est le nouveau prix ?
  → 38   pièges attendus : 35 [percent_as_amount], 2 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 80 CHF. Son prix baisse de 30 %. Quel est le nouveau prix ?
  → 56   pièges attendus : 50 [percent_as_amount], 24 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 60 CHF. Son prix baisse de 5 %. Quel est le nouveau prix ?
  → 57   pièges attendus : 55 [percent_as_amount], 3 [percent_as_amount]
  pièges : percent_as_amount

```

### Niveau 4

```
Augmenter de 15 %, c'est multiplier par…
  · 2,5 [percent_shift]   · 0,85   ✔ 1,15   · 0,15 [percent_as_amount]
  pièges : percent_as_amount, percent_shift

Diminuer de 3 %, c'est multiplier par…
  · 1,03   ✔ 0,97   · 0,997 [percent_shift]   · 0,03 [percent_as_amount]
  pièges : percent_as_amount, percent_shift

Augmenter de 12 %, c'est multiplier par…
  · 2,2 [percent_shift]   · 0,12 [percent_as_amount]   ✔ 1,12   · 0,88
  pièges : percent_as_amount, percent_shift

```

### Niveau 5

```
Un article coûte 250 CHF. Son prix baisse de 12 %. Quel est le nouveau prix ?
  → 220   pièges attendus : 238 [percent_as_amount], 30 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 250 CHF. Son prix augmente de 35 %. Quel est le nouveau prix ?
  → 337,5   pièges attendus : 285 [percent_as_amount], 175/2 [percent_as_amount]
  pièges : percent_as_amount

Un article coûte 125 CHF. Son prix baisse de 12 %. Quel est le nouveau prix ?
  → 110   pièges attendus : 113 [percent_as_amount], 15 [percent_as_amount]
  pièges : percent_as_amount

```

## Retrouver la valeur de départ (`pct-reverse`, 10H)

_Diviser par le coefficient._

### Niveau 1

```
Après une hausse de 10 %, un prix vaut 132 CHF. Quel était le prix de départ ?
  → 120   pièges attendus : 594/5 [percent_reverse_subtract], 122 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 10 %, un prix vaut 132 CHF. Quel était le prix de départ ?
  → 120   pièges attendus : 594/5 [percent_reverse_subtract], 122 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 10 %, un prix vaut 330 CHF. Quel était le prix de départ ?
  → 300   pièges attendus : 297 [percent_reverse_subtract], 320 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

```

### Niveau 2

```
Après une hausse de 25 %, un prix vaut 50 CHF. Quel était le prix de départ ?
  → 40   pièges attendus : 75/2 [percent_reverse_subtract], 25 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 25 %, un prix vaut 187,5 CHF. Quel était le prix de départ ?
  → 150   pièges attendus : 1125/8 [percent_reverse_subtract], 325/2 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 25 %, un prix vaut 375 CHF. Quel était le prix de départ ?
  → 300   pièges attendus : 1125/4 [percent_reverse_subtract], 350 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

```

### Niveau 3

```
Après une hausse de 50 %, un prix vaut 450 CHF. Quel était le prix de départ ?
  → 300   pièges attendus : 225 [percent_reverse_subtract], 400 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une baisse de 25 %, un prix vaut 60 CHF. Quel était le prix de départ ?
  → 80   pièges attendus : 75 [percent_reverse_subtract], 85 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 25 %, un prix vaut 75 CHF. Quel était le prix de départ ?
  → 60   pièges attendus : 225/4 [percent_reverse_subtract], 50 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

```

### Niveau 4

```
Après une hausse de 15 %, un prix vaut 172,5 CHF. Quel était le prix de départ ?
  → 150   pièges attendus : 1173/8 [percent_reverse_subtract], 315/2 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une baisse de 40 %, un prix vaut 120 CHF. Quel était le prix de départ ?
  → 200   pièges attendus : 168 [percent_reverse_subtract], 160 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une baisse de 40 %, un prix vaut 180 CHF. Quel était le prix de départ ?
  → 300   pièges attendus : 252 [percent_reverse_subtract], 220 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

```

### Niveau 5

```
Après une hausse de 12 %, un prix vaut 134,4 CHF. Quel était le prix de départ ?
  → 120   pièges attendus : 14784/125 [percent_reverse_subtract], 612/5 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 12 %, un prix vaut 168 CHF. Quel était le prix de départ ?
  → 150   pièges attendus : 3696/25 [percent_reverse_subtract], 156 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

Après une hausse de 30 %, un prix vaut 195 CHF. Quel était le prix de départ ?
  → 150   pièges attendus : 273/2 [percent_reverse_subtract], 165 [percent_as_amount]
  pièges : percent_reverse_subtract, percent_as_amount

```

## Pourcentages successifs (`pct-successive`, 11H)

_+10 % puis −10 % ne font pas 0 %._

### Niveau 1

```
Un prix augmente de 10 %, puis baisse de 10 %. Que devient-il ?
  · Il monte de 1 %   · Il revient au prix de départ [percent_add_successive]   ✔ Il baisse de 1 %   · Il baisse de 10 %
  pièges : percent_add_successive

Un prix augmente de 50 %, puis baisse de 50 %. Que devient-il ?
  ✔ Il baisse de 25 %   · Il baisse de 50 %   · Il revient au prix de départ [percent_add_successive]   · Il monte de 25 %
  pièges : percent_add_successive

Un prix augmente de 50 %, puis baisse de 50 %. Que devient-il ?
  · Il revient au prix de départ [percent_add_successive]   · Il monte de 25 %   ✔ Il baisse de 25 %   · Il baisse de 50 %
  pièges : percent_add_successive

```

### Niveau 2

```
Un prix augmente de 10 %, puis baisse de 10 %. Que devient-il ?
  · Il revient au prix de départ [percent_add_successive]   · Il monte de 1 %   ✔ Il baisse de 1 %   · Il baisse de 10 %
  pièges : percent_add_successive

Un prix augmente de 20 %, puis baisse de 20 %. Que devient-il ?
  · Il baisse de 20 %   · Il revient au prix de départ [percent_add_successive]   · Il monte de 4 %   ✔ Il baisse de 4 %
  pièges : percent_add_successive

Un prix augmente de 10 %, puis baisse de 10 %. Que devient-il ?
  · Il baisse de 10 %   ✔ Il baisse de 1 %   · Il monte de 1 %   · Il revient au prix de départ [percent_add_successive]
  pièges : percent_add_successive

```

### Niveau 3

```
Un prix de 100 CHF augmente de 25 %, puis baisse de 20 %. Prix final ?
  → 100   pièges attendus : 105 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 500 CHF baisse de 25 %, puis augmente de 50 %. Prix final ?
  → 562,5   pièges attendus : 625 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 400 CHF baisse de 25 %, puis augmente de 20 %. Prix final ?
  → 360   pièges attendus : 380 [percent_add_successive]
  pièges : percent_add_successive

```

### Niveau 4

```
Un prix de 100 CHF baisse de 10 %, puis augmente de 25 %. Prix final ?
  → 112,5   pièges attendus : 115 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 200 CHF augmente de 50 %, puis baisse de 50 %. Prix final ?
  → 150   pièges attendus : 200 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 400 CHF baisse de 20 %, puis augmente de 25 %. Prix final ?
  → 400   pièges attendus : 420 [percent_add_successive]
  pièges : percent_add_successive

```

### Niveau 5

```
Un prix de 80 CHF baisse de 25 %, puis augmente de 20 %. Prix final ?
  → 72   pièges attendus : 76 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 400 CHF augmente de 50 %, puis baisse de 10 %. Prix final ?
  → 540   pièges attendus : 560 [percent_add_successive]
  pièges : percent_add_successive

Un prix de 200 CHF baisse de 50 %, puis augmente de 25 %. Prix final ?
  → 125   pièges attendus : 150 [percent_add_successive]
  pièges : percent_add_successive

```

## Vitesse moyenne (`speed`, 10H)

_d = v × t, avec les bonnes unités._

### Niveau 1

```
Une voiture parcourt 120 km en 3 h. Quelle est sa vitesse moyenne ?
  → 40

Une voiture parcourt 360 km en 4 h. Quelle est sa vitesse moyenne ?
  → 90   pièges attendus : 3/2 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une voiture parcourt 240 km en 4 h. Quelle est sa vitesse moyenne ?
  → 60   pièges attendus : 1 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 2

```
Une voiture parcourt 75 km en 1 h 15 min. Quelle est sa vitesse moyenne ?
  → 60   pièges attendus : 1 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une voiture parcourt 150 km en 2 h 30 min. Quelle est sa vitesse moyenne ?
  → 60   pièges attendus : 1 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une voiture parcourt 120 km en 1 h 30 min. Quelle est sa vitesse moyenne ?
  → 80

```

### Niveau 3

```
2 h 15 min, c'est combien d'heures ?
  ✔ 2,25 h   · 2,15 h [time_decimal_minutes]   · 135 h
  pièges : time_decimal_minutes

2 h 15 min, c'est combien d'heures ?
  · 135 h   ✔ 2,25 h   · 2,15 h [time_decimal_minutes]
  pièges : time_decimal_minutes

1 h 45 min, c'est combien d'heures ?
  · 105 h   · 1,55 h   · 1,45 h [time_decimal_minutes]   ✔ 1,75 h
  pièges : time_decimal_minutes

```

### Niveau 4

```
Un train roule à 90 km/h pendant 2 h 30 min. Quelle distance parcourt-il ?
  → 225   pièges attendus : 207 [time_decimal_minutes]
  pièges : time_decimal_minutes

Un train roule à 120 km/h pendant 2 h 30 min. Quelle distance parcourt-il ?
  → 300   pièges attendus : 276 [time_decimal_minutes]
  pièges : time_decimal_minutes

Un train roule à 120 km/h pendant 2 h 30 min. Quelle distance parcourt-il ?
  → 300   pièges attendus : 276 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

### Niveau 5

```
Une voiture roule à 90 km/h. Combien de minutes lui faut-il pour 225 km ?
  → 150   pièges attendus : 250 [time_decimal_minutes], 5/2 [convert_wrong_direction]
  pièges : time_decimal_minutes, convert_wrong_direction

Une voiture roule à 90 km/h. Combien de minutes lui faut-il pour 67,5 km ?
  → 45   pièges attendus : 75 [time_decimal_minutes], 3/4 [convert_wrong_direction]
  pièges : time_decimal_minutes, convert_wrong_direction

Une voiture roule à 90 km/h. Combien de minutes lui faut-il pour 225 km ?
  → 150   pièges attendus : 250 [time_decimal_minutes], 5/2 [convert_wrong_direction]
  pièges : time_decimal_minutes, convert_wrong_direction

```

## Pente (`slope`, 10H)

_Dénivelé ÷ distance horizontale._

### Niveau 1

```
Une route monte de 2 m sur une distance horizontale de 100 m. Quelle est sa pente ?
  → 2   pièges attendus : 5000 [slope_inverted], 1/50 [percent_shift]
  pièges : slope_inverted, percent_shift

Une route monte de 20 m sur une distance horizontale de 400 m. Quelle est sa pente ?
  → 5   pièges attendus : 2000 [slope_inverted], 1/20 [percent_shift]
  pièges : slope_inverted, percent_shift

Une route monte de 2 m sur une distance horizontale de 100 m. Quelle est sa pente ?
  → 2   pièges attendus : 5000 [slope_inverted], 1/50 [percent_shift]
  pièges : slope_inverted, percent_shift

```

### Niveau 2

```
Une route a une pente de 8 %. De combien monte-t-elle sur 50 m (à l'horizontale) ?
  → 4   pièges attendus : 400 [percent_shift], 25/4 [slope_inverted]
  pièges : percent_shift, slope_inverted

Une route a une pente de 2 %. De combien monte-t-elle sur 100 m (à l'horizontale) ?
  → 2   pièges attendus : 200 [percent_shift], 50 [slope_inverted]
  pièges : percent_shift, slope_inverted

Une route a une pente de 8 %. De combien monte-t-elle sur 200 m (à l'horizontale) ?
  → 16   pièges attendus : 1600 [percent_shift], 25 [slope_inverted]
  pièges : percent_shift, slope_inverted

```

### Niveau 3

```
Une route monte de 7,5 m sur une distance horizontale de 50 m. Quelle est sa pente ?
  → 15   pièges attendus : 3/20 [percent_shift]
  pièges : percent_shift

Une route monte de 5 m sur une distance horizontale de 100 m. Quelle est sa pente ?
  → 5   pièges attendus : 2000 [slope_inverted], 1/20 [percent_shift]
  pièges : slope_inverted, percent_shift

Une route monte de 17,5 m sur une distance horizontale de 250 m. Quelle est sa pente ?
  → 7   pièges attendus : 7/100 [percent_shift]
  pièges : percent_shift

```

### Niveau 4

```
Une route a une pente de 9 %. De combien monte-t-elle sur 200 m (à l'horizontale) ?
  → 18   pièges attendus : 1800 [percent_shift]
  pièges : percent_shift

Une route a une pente de 15 %. De combien monte-t-elle sur 200 m (à l'horizontale) ?
  → 30   pièges attendus : 3000 [percent_shift]
  pièges : percent_shift

Une route a une pente de 5 %. De combien monte-t-elle sur 50 m (à l'horizontale) ?
  → 2,5   pièges attendus : 250 [percent_shift], 10 [slope_inverted]
  pièges : percent_shift, slope_inverted

```

### Niveau 5

```
Un panneau indique une pente de 12 % sur 3 km. De combien de mètres monte-t-on ?
  → 360   pièges attendus : 9/25 [convert_wrong_direction], 250 [slope_inverted]
  pièges : convert_wrong_direction, slope_inverted

Un panneau indique une pente de 10 % sur 2,5 km. De combien de mètres monte-t-on ?
  → 250   pièges attendus : 1/4 [convert_wrong_direction]
  pièges : convert_wrong_direction

Un panneau indique une pente de 8 % sur 2 km. De combien de mètres monte-t-on ?
  → 160   pièges attendus : 4/25 [convert_wrong_direction], 250 [slope_inverted]
  pièges : convert_wrong_direction, slope_inverted

```

## Pièges de cette unité

- **Ajouter au lieu de multiplier** (`additive_reasoning`, R) : 3 → 5, donc 6 → 8 au lieu de 3 → 5, donc 6 → 10
- **Tout croire proportionnel** (`linearity_illusion`, R) : côté × 2, donc aire × 2 au lieu de côté × 2, donc aire × 4
- **Règle de trois à l'envers** (`rule3_inverted`, E) : 3 kg = 6 CHF, donc 5 kg = 3,60 CHF au lieu de 5 kg = 10 CHF
- **Oublier de convertir avec l'échelle** (`scale_forget_convert`, E) : 1 : 25 000, 4 cm → 100 000 km au lieu de 4 cm → 100 000 cm = 1 km
- **Prendre le pourcentage pour un montant** (`percent_as_amount`, E) : 80 CHF − 15 % = 65 CHF au lieu de 80 × 0,85 = 68 CHF
- **Diviser à l'envers** (`percent_inverted`, E) : 12 sur 48 = 400 % au lieu de 12 sur 48 = 25 %
- **Retirer le pourcentage pour revenir en arrière** (`percent_reverse_subtract`, E) : après +20 %, 96 → 96 − 20 % = 76,80 au lieu de 96 ÷ 1,2 = 80
- **Additionner des pourcentages successifs** (`percent_add_successive`, E) : +10 % puis −10 % = 0 % au lieu de × 1,1 × 0,9 = × 0,99 : −1 %
- **Pente calculée à l'envers** (`slope_inverted`, E) : 12 m sur 200 m : 200 ÷ 12 au lieu de 12 ÷ 200 = 6 %
