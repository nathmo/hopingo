# Exemples de questions — Fourchettes et pire cas

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Lire une incertitude (`rg-read`, 11H)

_400 ± 20 m : entre 380 et 420 m._

### Niveau 1

```
h = 3,50 ± 0,05 m. Quelle est la plus grande valeur possible ?
  → 3,55

m = 310 ± 1 g. Quelle est la plus grande valeur possible ?
  → 311

P = 1600 ± 50 W. Quelle est la plus grande valeur possible ?
  → 1650

```

### Niveau 2

```
v = 4,8 ± 0,2 m/s. Entre quelles valeurs se trouve la vraie valeur ?
  ✔ entre 4,6 m/s et 5,0 m/s   · entre 4,8 m/s et 5,0 m/s [rg_half_width]   · entre 4,4 m/s et 5,2 m/s [rg_full_width]   · entre 4,6 m/s et 4,8 m/s [rg_half_width]
  pièges : rg_half_width, rg_full_width

d = 580 ± 25 m. Entre quelles valeurs se trouve la vraie valeur ?
  · entre 555 m et 580 m [rg_half_width]   · entre 530 m et 630 m [rg_full_width]   · entre 580 m et 605 m [rg_half_width]   ✔ entre 555 m et 605 m
  pièges : rg_half_width, rg_full_width

t = 46 ± 1 s. Entre quelles valeurs se trouve la vraie valeur ?
  · entre 45 s et 46 s [rg_half_width]   ✔ entre 45 s et 47 s   · entre 46 s et 47 s [rg_half_width]   · entre 44 s et 48 s [rg_full_width]
  pièges : rg_half_width, rg_full_width

```

### Niveau 3

```
On sait que 422 g ≤ m ≤ 426 g. Écris-le sous la forme « valeur ± incertitude » : quelle est la valeur du milieu ?
  → 424
  pièges : rg_full_width

On sait que 88 s ≤ t ≤ 90 s. Écris-le sous la forme « valeur ± incertitude » : quelle est l'incertitude ?
  → 1
  pièges : rg_full_width

On sait que 4,1 m ≤ h ≤ 4,3 m. Écris-le sous la forme « valeur ± incertitude » : quelle est la valeur du milieu ?
  → 4,2
  pièges : rg_full_width

```

### Niveau 4

```
Une course dure t = 26 ± 3 min. Quelle est la plus grande durée possible, en secondes ?
  → 1740
  pièges : ph_not_si, rg_half_width

m = 400 g à 2 % près. Quelle est la plus petite valeur possible ?
  → 392
  pièges : percent_as_amount, rg_percent_fraction

m = 800 g à 4 % près. Quelle est la plus grande valeur possible ?
  → 832
  pièges : percent_as_amount, rg_percent_fraction

```

### Niveau 5

```
Deux chronomètres mesurent la même course : 12,1 ± 0,2 s et 12,2 ± 0,2 s. Leurs mesures sont-elles compatibles ?
  · Non : les deux fourchettes ne se touchent pas.   · Non, car les deux valeurs du milieu sont différentes. [rg_conclude_middle]   ✔ Oui : les deux fourchettes se chevauchent.
  pièges : rg_conclude_middle

Deux groupes mesurent la masse du même caillou : 215 ± 2 g et 218 ± 2 g. Leurs mesures sont-elles compatibles ?
  · Non : les deux fourchettes ne se touchent pas.   ✔ Oui : les deux fourchettes se chevauchent.   · Non, car les deux valeurs du milieu sont différentes. [rg_conclude_middle]
  pièges : rg_conclude_middle

Deux chronomètres mesurent la même course : 10,9 ± 0,2 s et 11,4 ± 0,2 s. Leurs mesures sont-elles compatibles ?
  · Oui : les deux fourchettes se chevauchent.   ✔ Non : les deux fourchettes ne se touchent pas.   · Non, car les deux valeurs du milieu sont différentes. [rg_conclude_middle]
  pièges : rg_conclude_middle

```

## Le pire cas : quelles extrémités ? (`rg-ends`, 11H)

_Sous une barre de fraction, la plus grande valeur donne le plus petit résultat._

### Niveau 1

```
Dans t=E/P, quelles valeurs prends-tu pour obtenir le plus petit t ?
  ✔ Emin, Pmax   · Emax, Pmin   · Emin, Pmin [rg_same_ends]   · Emax, Pmax
  pièges : rg_same_ends

Dans F=P/v, quelles valeurs prends-tu pour obtenir le plus petit F ?
  ✔ Pmin, vmax   · Pmax, vmin   · Pmax, vmax   · Pmin, vmin [rg_same_ends]
  pièges : rg_same_ends

Dans I=P/U, quelles valeurs prends-tu pour obtenir le plus petit I ?
  ✔ Pmin, Umax   · Pmax, Umin   · Pmin, Umin [rg_same_ends]   · Pmax, Umax
  pièges : rg_same_ends

```

### Niveau 2

```
Dans ρ=m/V, quelles valeurs prends-tu pour obtenir le plus grand ρ ?
  · mmin, Vmin   · mmax, Vmax [rg_same_ends]   ✔ mmax, Vmin   · mmin, Vmax
  pièges : rg_same_ends

Dans h=E/mg, quelles valeurs prends-tu pour obtenir le plus grand h ?
  · Emin, mmin   ✔ Emax, mmin   · Emin, mmax   · Emax, mmax [rg_same_ends]
  pièges : rg_same_ends

Dans h=E/mg, quelles valeurs prends-tu pour obtenir le plus grand h ?
  · Emax, mmax [rg_same_ends]   ✔ Emax, mmin   · Emin, mmin   · Emin, mmax
  pièges : rg_same_ends

```

### Niveau 3

```
Dans h=E/mg, quelles valeurs prends-tu pour obtenir le plus petit h ?
  · Emax, mmin   · Emax, mmax   ✔ Emin, mmax   · Emin, mmin [rg_same_ends]
  pièges : rg_same_ends

Dans ΔT=E/mc, quelles valeurs prends-tu pour obtenir le plus petit ΔT ?
  · Emax, mmin   · Emax, mmax   ✔ Emin, mmax   · Emin, mmin [rg_same_ends]
  pièges : rg_same_ends

Dans h=E/mg, quelles valeurs prends-tu pour obtenir le plus petit h ?
  ✔ Emin, mmax   · Emin, mmin [rg_same_ends]   · Emax, mmax   · Emax, mmin
  pièges : rg_same_ends

```

### Niveau 4

```
Dans t=mcΔT/P, quelles valeurs prends-tu pour obtenir le plus grand t ?
  · mmax, ΔTmin, Pmin   · mmin, ΔTmin, Pmax   ✔ mmax, ΔTmax, Pmin   · mmax, ΔTmax, Pmax [rg_same_ends]
  pièges : rg_same_ends

Dans c=E/mΔT, quelles valeurs prends-tu pour obtenir le plus petit c ?
  · Emin, mmin, ΔTmin [rg_same_ends]   · Emax, mmin, ΔTmax   ✔ Emin, mmax, ΔTmax   · Emin, mmax, ΔTmin
  pièges : rg_same_ends

Dans ΔT=E/mc, quelles valeurs prends-tu pour obtenir le plus petit ΔT ?
  ✔ Emin, mmax   · Emax, mmin   · Emax, mmax   · Emin, mmin [rg_same_ends]
  pièges : rg_same_ends

```

### Niveau 5

```
F=P/v, avec P = 600 ± 60 W et v = 2,3 ± 0,2 m/s. Pour obtenir le plus petit F, quelle valeur de v prends-tu ?
  → 2,5
  pièges : rg_same_ends, rg_central_value

F=P/v, avec P = 500 ± 40 W et v = 2,5 ± 0,1 m/s. Pour obtenir le plus petit F, quelle valeur de v prends-tu ?
  → 2,6
  pièges : rg_same_ends, rg_central_value

ρ=m/V, avec m = 176 ± 1 g et V = 163 ± 5 mL. Pour obtenir le plus grand ρ, quelle valeur de V prends-tu ?
  → 158
  pièges : rg_same_ends, rg_central_value

```

## Calculer une fourchette (`rg-compute`, 11H)

_Les deux calculs, et la vraie valeur entre les deux._

### Niveau 1

```
E=Fd, avec F = 370 ± 5 N ; d = 77 ± 2 m. Quelle est la plus grande valeur possible de E ?
  → 29600
  pièges : rg_central_value

E=Fd, avec F = 220 ± 10 N ; d = 62 ± 2 m. Quelle est la plus grande valeur possible de E ?
  → 14700
  pièges : rg_central_value

E=Fd, avec F = 210 ± 10 N ; d = 85 ± 1 m. Quelle est la plus petite valeur possible de E ?
  → 16800
  pièges : rg_central_value

```

### Niveau 2

```
P=E/t, avec E = 198 ± 5 kJ ; t = 272 ± 10 s. Quelle est la plus grande valeur possible de P ?
  → 775
  pièges : rg_central_value, ph_not_si

v=d/t, avec d = 340 ± 10 m ; t = 106 ± 5 s. Quelle est la plus grande valeur possible de v ?
  → 3,47
  pièges : rg_central_value

P=E/t, avec E = 175 ± 10 kJ ; t = 268 ± 10 s. Quelle est la plus petite valeur possible de P ?
  → 594
  pièges : rg_central_value, ph_not_si

```

### Niveau 3

```
P=E/t, avec E = 123 ± 10 kJ ; t = 236 ± 5 s. Quelle est la plus grande valeur possible de P ?
  → 576
  pièges : rg_central_value, rg_same_ends, ph_not_si

F=P/v, avec P = 600 ± 60 W ; v = 1,9 ± 0,1 m/s. Quelle est la plus petite valeur possible de F ?
  → 270
  pièges : rg_central_value

v=d/t, avec d = 690 ± 20 m ; t = 146 ± 5 s. Quelle est la plus petite valeur possible de v ?
  → 4,44
  pièges : rg_central_value

```

### Niveau 4

```
ρ=m/ℓdh, avec m = 250 ± 1 g ; ℓ = 10,2 ± 0,1 cm ; d = 5,9 ± 0,1 cm ; h = 3,9 ± 0,1 cm. Quelle est la plus grande valeur possible de ρ ?
  → 1130
  pièges : rg_central_value, rg_same_ends, ph_gram_as_kg

ρ=m/ℓdh, avec m = 250 ± 1 g ; ℓ = 11,0 ± 0,1 cm ; d = 6,2 ± 0,1 cm ; h = 3,6 ± 0,1 cm. Quelle est la plus petite valeur possible de ρ ?
  → 962
  pièges : rg_central_value, rg_same_ends, ph_gram_as_kg

c=E/mΔT, avec E = 201 ± 5 kJ ; m = 2,1 ± 0,1 kg ; ΔT = 40 ± 1 K. Quelle est la plus petite valeur possible de c ?
  → 2170
  pièges : rg_central_value, rg_same_ends, ph_not_si

```

### Niveau 5

```
F=P/v, avec P = 500 ± 60 W ; v = 1,8 ± 0,2 m/s. Quelle est la plus petite valeur possible de F ?
  → 220
  pièges : rg_central_value

ρ=m/ℓdh, avec m = 250 ± 1 g ; ℓ = 10,1 ± 0,1 cm ; d = 5,8 ± 0,1 cm ; h = 3,9 ± 0,1 cm. Quelle est la plus grande valeur possible de ρ ?
  → 1160
  pièges : rg_central_value, rg_same_ends, ph_gram_as_kg

v=d/t, avec d = 16,0 ± 0,2 km ; t = 47 ± 2 min. Quelle est la plus grande valeur possible de v ?
  → 6
  pièges : rg_central_value, rg_same_ends, ph_not_si

```

## Combien de chiffres ? (`rg-digits`, 11H)

_La fourchette dit jusqu'où on a le droit d'être précis._

### Niveau 1

```
La fourchette de h va de 1,044 m à 1,072 m. La calculatrice affiche 1,0583. Qu'écris-tu comme résultat ?
  ✔ 1,06 m   · 1,0583 m [ph_too_many_digits]   · 1,058 m [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de v va de 34,26 m/s à 34,76 m/s. La calculatrice affiche 34,504. Qu'écris-tu comme résultat ?
  ✔ 34,5 m/s   · 34,50 m/s [ph_too_many_digits]   · 34,504 m/s [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de h va de 855,4 m à 866,8 m. La calculatrice affiche 861,16. Qu'écris-tu comme résultat ?
  · 861,2 m [ph_too_many_digits]   · 861,16 m [ph_too_many_digits]   ✔ 861 m
  pièges : ph_too_many_digits

```

### Niveau 2

```
La fourchette de t va de 68,73 s à 69,51 s. Combien de chiffres significatifs peux-tu garder dans le résultat ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de t va de 6,307 s à 6,395 s. Combien de chiffres significatifs peux-tu garder dans le résultat ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de ρ va de 343,4 kg/m³ à 351,0 kg/m³. Combien de chiffres significatifs peux-tu garder dans le résultat ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

```

### Niveau 3

```
La calculatrice donne P = 2,9492 ± 0,05907 W. Comment l'écrire honnêtement ?
  · 2,949 ± 0,059 W [ph_too_many_digits]   ✔ 2,95 ± 0,06 W   · 2,9492 ± 0,06 W [ph_too_many_digits]   · 2,9492 ± 0,05907 W [ph_too_many_digits]
  pièges : ph_too_many_digits

La calculatrice donne t = 4768,3 ± 15,04 s. Comment l'écrire honnêtement ?
  ✔ 4770 ± 20 s   · 4768,3 ± 15,04 s [ph_too_many_digits]   · 4768,3 ± 20 s [ph_too_many_digits]   · 4768 ± 15 s [ph_too_many_digits]
  pièges : ph_too_many_digits

La calculatrice donne E = 1,7696 ± 0,01608 J. Comment l'écrire honnêtement ?
  · 1,770 ± 0,016 J [ph_too_many_digits]   · 1,7696 ± 0,02 J [ph_too_many_digits]   ✔ 1,77 ± 0,02 J   · 1,7696 ± 0,01608 J [ph_too_many_digits]
  pièges : ph_too_many_digits

```

### Niveau 4

```
Un élève écrit h = 278,27 ± 5,3 m. Combien de chiffres significatifs a-t-il le droit de garder ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

Un élève écrit ρ = 6,3085 ± 0,023 kg/m³. Combien de chiffres significatifs a-t-il le droit de garder ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

Un élève écrit t = 49,384 ± 0,41 s. Combien de chiffres significatifs a-t-il le droit de garder ?
  → 3   pièges attendus : 4 [ph_too_many_digits], 5 [ph_too_many_digits]
  pièges : ph_too_many_digits

```

### Niveau 5

```
La fourchette de F va de 4,11·10⁴ N à 4,68·10⁴ N. La calculatrice affiche 4,404·10⁴. Qu'écris-tu comme résultat ?
  · 4,40·10⁴ N [ph_too_many_digits]   ✔ 4,4·10⁴ N   · 4,404·10⁴ N [ph_too_many_digits]   · 4,4040·10⁴ N [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de P va de 7,319·10⁵ W à 7,420·10⁵ W. La calculatrice affiche 7,37·10⁵. Qu'écris-tu comme résultat ?
  · 7,370·10⁵ W [ph_too_many_digits]   · 7,3700·10⁵ W [ph_too_many_digits]   ✔ 7,37·10⁵ W   · 7,37000·10⁵ W [ph_too_many_digits]
  pièges : ph_too_many_digits

La fourchette de t va de 8,658·10⁶ s à 8,758·10⁶ s. La calculatrice affiche 8,7074·10⁶. Qu'écris-tu comme résultat ?
  · 8,7074·10⁶ s [ph_too_many_digits]   · 8,70740·10⁶ s [ph_too_many_digits]   · 8,707·10⁶ s [ph_too_many_digits]   ✔ 8,71·10⁶ s
  pièges : ph_too_many_digits

```

## Peut-on conclure ? (`rg-conclude`, 11H)

_On compare la fourchette, pas la valeur du milieu._

### Niveau 1

```
v = 31 ± 2 km/h. La voiture a-t-elle dépassé la limite de 30 km/h ?
  · Oui, car 31 km/h est plus grand que 30 km/h. [rg_conclude_middle]   ✔ On ne peut pas conclure : 30 km/h est dans la fourchette.   · Oui : toute la fourchette est au-dessus de 30 km/h.   · Non : toute la fourchette est en dessous de 30 km/h.
  pièges : rg_conclude_middle

E = 838 ± 50 J. Le sac a-t-il gagné plus de 800 J d'énergie ?
  · Oui : toute la fourchette est au-dessus de 800 J.   · Oui, car 838 J est plus grand que 800 J. [rg_conclude_middle]   ✔ On ne peut pas conclure : 800 J est dans la fourchette.   · Non : toute la fourchette est en dessous de 800 J.
  pièges : rg_conclude_middle

v = 34 ± 5 km/h. La voiture a-t-elle dépassé la limite de 30 km/h ?
  · Non : toute la fourchette est en dessous de 30 km/h.   · Oui, car 34 km/h est plus grand que 30 km/h. [rg_conclude_middle]   ✔ On ne peut pas conclure : 30 km/h est dans la fourchette.   · Oui : toute la fourchette est au-dessus de 30 km/h.
  pièges : rg_conclude_middle

```

### Niveau 2

```
m = 615 ± 20 kg. La charge dépasse-t-elle le maximum autorisé de 630 kg ?
  · Oui : toute la fourchette est au-dessus de 630 kg.   · Non : toute la fourchette est en dessous de 630 kg.   ✔ On ne peut pas conclure : 630 kg est dans la fourchette.   · Non, car 615 kg est plus petit que 630 kg. [rg_conclude_middle]
  pièges : rg_conclude_middle

m = 475 ± 10 kg. La charge dépasse-t-elle le maximum autorisé de 450 kg ?
  · Non : toute la fourchette est en dessous de 450 kg.   ✔ Oui : toute la fourchette est au-dessus de 450 kg.   · On ne peut pas conclure : 450 kg est dans la fourchette.

v = 79 ± 5 km/h. La voiture a-t-elle dépassé la limite de 80 km/h ?
  · Non : toute la fourchette est en dessous de 80 km/h.   ✔ On ne peut pas conclure : 80 km/h est dans la fourchette.   · Non, car 79 km/h est plus petit que 80 km/h. [rg_conclude_middle]   · Oui : toute la fourchette est au-dessus de 80 km/h.
  pièges : rg_conclude_middle

```

### Niveau 3

```
778 J ≤ E ≤ 838 J. Le sac a-t-il gagné plus de 800 J d'énergie ?
  · Non : toute la fourchette est en dessous de 800 J.   · Oui, car 808 J est plus grand que 800 J. [rg_conclude_middle]   · Oui : toute la fourchette est au-dessus de 800 J.   ✔ On ne peut pas conclure : 800 J est dans la fourchette.
  pièges : rg_conclude_middle

1030 J ≤ E ≤ 1090 J. Le sac a-t-il gagné plus de 1000 J d'énergie ?
  · On ne peut pas conclure : 1000 J est dans la fourchette.   ✔ Oui : toute la fourchette est au-dessus de 1000 J.   · Non : toute la fourchette est en dessous de 1000 J.

460 kg ≤ m ≤ 480 kg. La charge dépasse-t-elle le maximum autorisé de 450 kg ?
  · On ne peut pas conclure : 450 kg est dans la fourchette.   · Non : toute la fourchette est en dessous de 450 kg.   ✔ Oui : toute la fourchette est au-dessus de 450 kg.

```

### Niveau 4

```
ρ = 1160 ± 80 kg/m³. L'objet coule-t-il dans l'eau (1,00 kg/L) ?
  · Non : toute la fourchette est en dessous de 1,00 kg/L.   ✔ Oui : toute la fourchette est au-dessus de 1,00 kg/L.   · On ne peut pas conclure : 1,00 kg/L est dans la fourchette.

ρ = 988 ± 50 kg/m³. L'objet coule-t-il dans l'eau (1,00 kg/L) ?
  · Non : toute la fourchette est en dessous de 1,00 kg/L.   · Oui : toute la fourchette est au-dessus de 1,00 kg/L.   ✔ On ne peut pas conclure : 1,00 kg/L est dans la fourchette.   · Non, car 988 kg/m³ est plus petit que 1,00 kg/L. [rg_conclude_middle]
  pièges : rg_conclude_middle

v = 21,8 ± 0,5 m/s. La voiture a-t-elle dépassé la limite de 80 km/h ?
  · Non : toute la fourchette est en dessous de 80 km/h.   · Oui : toute la fourchette est au-dessus de 80 km/h.   ✔ On ne peut pas conclure : 80 km/h est dans la fourchette.   · Non, car 21,8 m/s est plus petit que 80 km/h. [rg_conclude_middle]
  pièges : rg_conclude_middle

```

### Niveau 5

```
Liquide A : ρA = 0,93 ± 0,05 kg/L. Liquide B : ρB = 1,08 ± 0,05 kg/L. Le liquide A est-il plus dense que le liquide B ?
  ✔ Non : même la plus grande valeur de A est plus petite que la plus petite de B.   · Oui : même la plus petite valeur de A dépasse la plus grande de B.   · On ne peut pas conclure : les deux fourchettes se chevauchent.

Moteur A : PA = 2250 ± 100 W. Moteur B : PB = 2000 ± 100 W. Le moteur A est-il plus puissant que le moteur B ?
  · Non : même la plus grande valeur de A est plus petite que la plus petite de B.   ✔ Oui : même la plus petite valeur de A dépasse la plus grande de B.   · On ne peut pas conclure : les deux fourchettes se chevauchent.

Liquide A : ρA = 1,34 ± 0,05 kg/L. Liquide B : ρB = 1,14 ± 0,05 kg/L. Le liquide A est-il plus dense que le liquide B ?
  ✔ Oui : même la plus petite valeur de A dépasse la plus grande de B.   · On ne peut pas conclure : les deux fourchettes se chevauchent.   · Non : même la plus grande valeur de A est plus petite que la plus petite de B.

```

## Incertitude relative (`rg-percent`, 11H)

_Quelle mesure améliorer en priorité ?_

### Niveau 1

```
d = 200 ± 1 cm. Quelle est l'incertitude relative, en % ?
  → 0,5
  pièges : percent_inverted, rg_percent_fraction

t = 50 ± 1 s. Quelle est l'incertitude relative, en % ?
  → 2
  pièges : percent_inverted, rg_percent_fraction

d = 25,0 ± 0,5 cm. Quelle est l'incertitude relative, en % ?
  → 2
  pièges : percent_inverted, rg_percent_fraction

```

### Niveau 2

```
V = 630 ± 20 mL. Quelle est l'incertitude relative, en % ?
  → 3,2
  pièges : percent_inverted, rg_percent_fraction

V = 750 ± 20 mL. Quelle est l'incertitude relative, en % ?
  → 2,7
  pièges : percent_inverted, rg_percent_fraction

d = 710 ± 25 m. Quelle est l'incertitude relative, en % ?
  → 3,5
  pièges : percent_inverted, rg_percent_fraction

```

### Niveau 3

```
Laquelle de ces mesures faut-il améliorer en priorité ?
  · d = 900 ± 5 m [rg_percent_absolute]   ✔ h = 3,6 ± 0,2 m
  pièges : rg_percent_absolute

Laquelle de ces mesures faut-il améliorer en priorité ?
  ✔ t = 40 ± 1 s   · m = 309 ± 1 g

Laquelle de ces mesures faut-il améliorer en priorité ?
  · m = 460 ± 2 g [rg_percent_absolute]   ✔ h = 2,70 ± 0,05 m
  pièges : rg_percent_absolute

```

### Niveau 4

```
h = 80 mm à 0,5 % près. Quelle est l'incertitude, dans l'unité de la mesure ?
  → 0,4
  pièges : percent_as_amount, rg_percent_fraction, percent_inverted

h = 150 mm à 2 % près. Quelle est l'incertitude, dans l'unité de la mesure ?
  → 3
  pièges : percent_as_amount, rg_percent_fraction, percent_inverted

d = 80 cm à 0,5 % près. Quelle est l'incertitude, dans l'unité de la mesure ?
  → 0,4
  pièges : percent_as_amount, rg_percent_fraction, percent_inverted

```

### Niveau 5

```
Laquelle de ces mesures faut-il améliorer en priorité ?
  · ρ = 0,95 ± 0,08 kg/L   · m = 230 ± 2 g [rg_percent_absolute]   ✔ v = 4,3 ± 0,5 m/s
  pièges : rg_percent_absolute

Laquelle de ces mesures faut-il améliorer en priorité ?
  · m = 237 ± 1 g   · P = 1100 ± 50 W [rg_percent_absolute]   ✔ v = 5,8 ± 0,5 m/s   · V = 240 ± 10 mL
  pièges : rg_percent_absolute

Laquelle de ces mesures faut-il améliorer en priorité ?
  · h = 5,8 ± 0,2 m   ✔ F = 2300 ± 200 N   · d = 670 ± 25 m   · m = 439 ± 5 g

```

## Fourchettes dans un problème (`rg-in-problem`, 11H)

_Les 6 étapes, puis la fourchette du résultat._

### Niveau 1

```
Une catapulte à ressort (raideur 250 N/m) est comprimée de 0,17 m. Elle lance une balle de 0,27 kg. Toute l'énergie du ressort devient de l'énergie cinétique. À quelle vitesse part la balle ?
  [étapes 7 · live · pick] → v = 5.17293526533 m/s   (montré : √(((((k)×((x)^(2))))/(m))), ≈ 6)
  pièges : rg_same_ends, ph_too_many_digits

Un cheval de trait fournit 400 W en tirant une charrue avec une force de 400 N. Combien de temps met-il pour labourer un sillon de 250 m ?
  [étapes 7 · live · pick] → t = 250 s   (montré : (((F)×(d)))/(P), ≈ 300)
  pièges : rg_same_ends, ph_too_many_digits

Chaque seconde, 5 m³ d'eau tombent de 12 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 7 · live · pick] → P = 600000 W   (montré : (((((ρ)×(V))×(g))×(h)))/(t), ≈ 500000)
  pièges : rg_same_ends, ph_too_many_digits

```

### Niveau 2

```
Chiara monte un col à vélo : 72 kg avec le vélo, 800 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,28. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 7 · live · pick] → E_f = 492.139439508 kcal   (montré : ((((m)×(g))×(h)))/(η), ≈ 2000000)
  pièges : rg_same_ends, ph_too_many_digits

Chaque seconde, 3,1 m³ d'eau tombent de 44 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 7 · live · pick] → P = 1364000 W   (montré : (((((ρ)×(V))×(g))×(h)))/(t), ≈ 1000000)
  pièges : rg_same_ends, ph_too_many_digits

Tu descends un col en vélo cargo, à vitesse constante : 80 kg en tout, 1450 m de dénivelé, en 2940 s. Un frein régénératif envoie toute l'énergie dans la batterie. Quelle puissance moyenne la batterie doit-elle absorber ?
  [étapes 7 · live · pick] → P = 394.557823129 W   (montré : ((((m)×(g))×(h)))/(t), ≈ 300)
  pièges : rg_same_ends, ph_too_many_digits

```

### Niveau 3

```
Un vélo cargo (90 kg en tout) descend à vitesse constante pendant 3480 s. Son frein régénératif envoie 100 W dans la batterie. Quel dénivelé a-t-il descendu ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · leave · pick] → h = 386.666666667 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Un monte-charge de 55 800 W doit monter 1370 kg de marchandises de 30 m. Combien de temps lui faut-il, au minimum ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · leave · pick] → t = 7.36559139785 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Une équipe de chiens fournit 550 W pour tirer un traîneau avec une force de 220 N. La traversée du lac fait 3500 m. Combien de minutes dure-t-elle ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · leave · pick] → t = 23.3333333333 min
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

```

### Niveau 4

```
Chaque seconde, 4100 L d'eau tombent de 7 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → P = 287000 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Une voiture de 1,7 t roule à 26 m/s. Elle doit s'arrêter sur 176 m. Quelle force de freinage, constante, faut-il ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → F = 3264.77272727 N
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Lila (72 kg avec son vélo) mange un croissant de 484 kcal. Ses muscles en tirent de l'énergie mécanique avec un rendement de 0,3. De quel dénivelé ce croissant lui permet-il de monter ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → h = 842.966666667 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

```

### Niveau 5

```
Après un freinage, une voiture de 1,25 t a laissé des traces sur 33 m. Les freins exercent une force de 3000 N. À quelle vitesse roulait-elle ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → v = 12.585706178 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Une pompe propulse 0,61 m³ d'eau par seconde, qui sort du tuyau à 18 m/s. Quelle est la puissance de la pompe ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → P = 98820 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

Un cheval tire une charrue avec une force de 550 N le long d'un sillon de 0,46 km. Il met 480 s. Quelle puissance moyenne fournit-il ?
  [étapes 1, 2, 3, 4, 5, 6, 7 · end · remove] → P = 527.083333333 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, rg_same_ends, ph_too_many_digits

```

## Pièges de cette unité

- **Trop de chiffres** (`ph_too_many_digits`, E) : h = 175 239,826 m au lieu de h ≈ 1,8·10⁵ m
- **Mêmes extrémités sous une fraction** (`rg_same_ends`, E) : v_min = d_min/t_min au lieu de v_min = d_min/t_max
- **Conclure sur la valeur du milieu** (`rg_conclude_middle`, E) : 1,02 > 1,00, donc ça coule au lieu de 0,94 à 1,10 : on ne peut pas conclure
- **Incertitudes comparées sans pourcentage** (`rg_percent_absolute`, E) : ± 1 g < ± 5 mL, donc la masse est meilleure au lieu de comparer 1/180 et 5/176
- **Incertitude comptée une seule fois** (`rg_half_width`, E) : 400 ± 20 → de 400 à 420 au lieu de de 380 à 420
- **Valeurs du milieu au lieu des extrémités** (`rg_central_value`, E) : v_min = 400/80 au lieu de v_min = 380/84
- **Largeur entière prise pour l'incertitude** (`rg_full_width`, E) : entre 380 et 420 → ± 40 au lieu de entre 380 et 420 → 400 ± 20
- **Facteur 100 du pourcentage oublié** (`rg_percent_fraction`, E) : 1/180 = 0,0056 % au lieu de 1/180 = 0,0056 = 0,56 %
