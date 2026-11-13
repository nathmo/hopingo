# Exemples de questions — Énergie et puissance

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Énergie potentielle (`ph-ep`, 10H)

_<span class="m"><i class="m-var">E</i><sub class="m-sub">p</sub><span class="m-op">=</span><i class="m-var">m</i><span class="m-thin"></span><i class="m-var">g</i><span class="m-thin"></span><i class="m-var">h</i></span> : monter, c'est stocker de l'énergie._

### Niveau 1

```
Une randonneuse de 60 kg monte de 450 m sur le sentier du Chasseral. De combien augmente son énergie potentielle ?
  → 270000
  pièges : ph_ep_forget_g

Une randonneuse de 50 kg monte de 300 m sur le sentier du Chasseral. De combien augmente son énergie potentielle ?
  → 150000
  pièges : ph_ep_forget_g

Un seau d'eau de 14 kg est hissé de 14 m avec une corde. De combien augmente son énergie potentielle ?
  → 1960
  pièges : ph_ep_forget_g

```

### Niveau 2

```
Une randonneuse de 56 kg monte de 780 m sur le sentier du Chasseral. De combien augmente son énergie potentielle ?
  → 436800
  pièges : ph_ep_forget_g

Un ascenseur de 600 kg monte de 5,6 m. Quelle énergie potentielle gagne-t-il ?
  → 33600
  pièges : ph_ep_forget_g

Une randonneuse de 72 kg monte de 570 m sur le sentier du Chasseral. De combien augmente son énergie potentielle ?
  → 410400
  pièges : ph_ep_forget_g

```

### Niveau 3

```
Un carton gagne 825 J d'énergie potentielle quand on le monte de 5,5 m. Quelle est sa masse ?
  → 15
  pièges : ph_ep_forget_g, ph_iso_flip, iso_wrong_inverse

Un carton gagne 190 J d'énergie potentielle quand on le monte de 1 m. Quelle est sa masse ?
  → 19
  pièges : ph_ep_forget_g, ph_iso_flip, iso_wrong_inverse

Un carton gagne 60 J d'énergie potentielle quand on le monte de 2 m. Quelle est sa masse ?
  → 3
  pièges : ph_ep_forget_g, ph_iso_flip, iso_wrong_inverse

```

### Niveau 4

```
Un sac de ciment gagne 1,05 kJ d'énergie potentielle quand on le monte sur un échafaudage de 3 m. Quelle est sa masse ?
  → 35
  pièges : ph_not_si, ph_ep_forget_g

Une pomme de 230 g tombe d'une branche à 3 m du sol. Quelle énergie potentielle avait-elle au départ ?
  → 6,9
  pièges : ph_gram_as_kg, ph_ep_forget_g

Un sac de ciment gagne 2,1 kJ d'énergie potentielle quand on le monte sur un échafaudage de 7 m. Quelle est sa masse ?
  → 30
  pièges : ph_not_si, ph_ep_forget_g

```

### Niveau 5

```
Une randonneuse de 70 kg monte à pied. Départ : Nods, altitude 890 m. Arrivée : Chasseral, altitude 1607 m. De combien augmente son énergie potentielle ? Réponds en kJ.
  → 501,9
  pièges : ph_height_altitude, ph_ep_forget_g

Vrai ou faux : un sac de 8 kg posé à 4 m a autant d'énergie potentielle qu'un sac de 4 kg posé à 8 m.
  · Faux : le sac le plus haut en a plus   · Faux : le sac le plus lourd en a plus   ✔ Vrai : 320 J chacun

Vrai ou faux : si on monte le même sac 3 fois plus haut, son énergie potentielle est multipliée par 3.
  · Faux : elle est multipliée par 9   · Faux : elle ne dépend que de la masse   ✔ Vrai : Ep est proportionnelle à h

```

## Énergie cinétique (`ph-ec`, 10H)

_<span class="m"><i class="m-var">E</i><sub class="m-sub">c</sub><span class="m-op">=</span><span class="m-frac"><span class="m-n"><span>1</span></span><span class="m-d"><span>2</span></span></span><span class="m-thin"></span><i class="m-var">m</i><span class="m-thin"></span><i class="m-var">v</i><sup class="m-sup"><span>2</span></sup></span> : la vitesse compte au carré._

### Niveau 1

```
Un enfant de 26 kg file sur sa trottinette à 5 m/s. Quelle est son énergie cinétique ?
  → 325
  pièges : ph_ec_forget_half, ph_ec_forget_square

Une luge de 75 kg, passager compris, glisse à 12 m/s. Quelle est son énergie cinétique ?
  → 5400
  pièges : ph_ec_forget_half, ph_ec_forget_square

Un chariot de 29 kg roule à 4 m/s. Quelle est son énergie cinétique ?
  → 232
  pièges : ph_ec_forget_half, ph_ec_forget_square

```

### Niveau 2

```
Une pomme de 0,16 kg tombe et atteint 4 m/s. Quelle est son énergie cinétique ?
  → 1,28
  pièges : ph_ec_forget_half, ph_ec_forget_square

Un ballon de foot de 0,42 kg part à 25 m/s après un tir. Quelle est son énergie cinétique ?
  → 131
  pièges : ph_ec_forget_half, ph_ec_forget_square

Un chariot de 11,5 kg roule à 1,5 m/s. Quelle est son énergie cinétique ?
  → 12,9
  pièges : ph_ec_forget_half, ph_ec_forget_square

```

### Niveau 3

```
Un chariot roule à 3 m/s avec 171 J d'énergie cinétique. Quelle est sa masse ?
  → 38
  pièges : ph_ec_forget_half, ph_ec_forget_square

Un chariot roule à 4 m/s avec 88 J d'énergie cinétique. Quelle est sa masse ?
  → 11
  pièges : ph_ec_forget_half, ph_ec_forget_square

Un chariot roule à 6 m/s avec 162 J d'énergie cinétique. Quelle est sa masse ?
  → 9
  pièges : ph_ec_forget_half, ph_ec_forget_square

```

### Niveau 4

```
Un vélo cargo chargé, 200 kg au total, roule à 18 km/h. Quelle est son énergie cinétique ?
  → 2500
  pièges : ph_kmh_not_converted, speed_factor_wrong_way, ph_ec_forget_half

Un vélo cargo chargé, 150 kg au total, roule à 21,6 km/h. Quelle est son énergie cinétique ?
  → 2700
  pièges : ph_kmh_not_converted, speed_factor_wrong_way, ph_ec_forget_half

Une balle de tennis de 58 g est servie à 40 m/s. Quelle est son énergie cinétique ?
  → 46,4
  pièges : ph_gram_as_kg, ph_ec_forget_half

```

### Niveau 5

```
Vrai ou faux : si la masse d'un chariot est multipliée par 3, à la même vitesse, son énergie cinétique est multipliée par 3.
  ✔ Vrai : l'énergie cinétique est proportionnelle à la masse   · Faux : elle est multipliée par 9   · Faux : seule la vitesse compte

Une voiture de 1200 kg accélère de 72 km/h à 108 km/h. Quelle énergie supplémentaire faut-il lui fournir ? Réponds en kJ.
  → 300
  pièges : ph_ec_diff_square, ph_kmh_not_converted

Vrai ou faux : si la vitesse d'un chariot est multipliée par 2, son énergie cinétique est aussi multipliée par 2.
  · Vrai : l'énergie cinétique est proportionnelle à la vitesse [ph_ec_forget_square]   ✔ Faux : elle est multipliée par 4, car la vitesse compte au carré   · Faux : elle ne change pas, la masse est la même
  pièges : ph_ec_forget_square

```

## Travail d'une force (`ph-work`, 10H)

_<span class="m"><i class="m-var">E</i><span class="m-op">=</span><i class="m-var">F</i><span class="m-thin"></span><i class="m-var">d</i></span> : l'énergie transférée par une force._

### Niveau 1

```
Un téléski tire une skieuse avec une force de 400 N sur 200 m. Quelle énergie lui transfère-t-il ?
  → 80000
  pièges : iso_wrong_inverse

Noé pousse une armoire avec une force de 270 N sur 1 m. Quelle énergie transfère-t-il à l'armoire ?
  → 270

Un téléski tire une skieuse avec une force de 200 N sur 800 m. Quelle énergie lui transfère-t-il ?
  → 160000
  pièges : iso_wrong_inverse

```

### Niveau 2

```
Un téléski tire une skieuse avec une force de 215 N sur 540 m. Quelle énergie lui transfère-t-il ?
  → 116100
  pièges : iso_wrong_inverse

Un cheval tire une charrue avec une force de 495 N sur 37,5 m. Quelle énergie transfère-t-il ?
  → 18600
  pièges : iso_wrong_inverse

Un cheval tire une charrue avec une force de 485 N sur 80 m. Quelle énergie transfère-t-il ?
  → 38800
  pièges : iso_wrong_inverse

```

### Niveau 3

```
Un treuil transfère 7500 J à un bateau en le tirant sur 6 m de rampe. Quelle force exerce-t-il ?
  → 1250
  pièges : ph_iso_flip, iso_wrong_inverse

Un treuil transfère 8100 J à un bateau en le tirant sur 6 m de rampe. Quelle force exerce-t-il ?
  → 1350
  pièges : ph_iso_flip, iso_wrong_inverse

Un treuil transfère 9200 J à un bateau en le tirant sur 8 m de rampe. Quelle force exerce-t-il ?
  → 1150
  pièges : ph_iso_flip, iso_wrong_inverse

```

### Niveau 4

```
Pour bander un arc, on tire la corde avec une force moyenne de 240 N sur 45 cm. Quelle énergie transfère-t-on à l'arc ?
  → 108
  pièges : ph_not_si

En poussant un chariot sur 35 m, un magasinier lui transfère 2,45 kJ. Quelle force exerce-t-il ?
  → 70
  pièges : ph_not_si, ph_iso_flip

Des chiens de traîneau tirent avec une force de 520 N sur 11,5 km. Quelle énergie transfèrent-ils au traîneau ?
  → 5,98×10^6
  pièges : ph_not_si

```

### Niveau 5

```
Une grue soulève une poutre de 350 kg de 13 m à vitesse constante : sa force est égale au poids de la poutre. Quelle énergie transfère-t-elle ? Réponds en kJ.
  → 45,5
  pièges : ph_ep_forget_g

Une grue soulève une poutre de 300 kg de 30 m à vitesse constante : sa force est égale au poids de la poutre. Quelle énergie transfère-t-elle ? Réponds en kJ.
  → 90
  pièges : ph_ep_forget_g

On veut transférer la même énergie, mais sur une distance 3 fois plus courte. Que doit faire la force ?
  · Être 3 fois plus petite [ph_iso_flip]   · Rester la même : l'énergie ne change pas   ✔ Être 3 fois plus grande : Fd reste le même
  pièges : ph_iso_flip

```

## Puissance (`ph-power`, 10H)

_<span class="m"><i class="m-var">P</i><span class="m-op">=</span><span class="m-frac"><span class="m-n"><i class="m-var">E</i></span><span class="m-d"><i class="m-var">t</i></span></span></span> : le débit d'énergie._

### Niveau 1

```
Un mixeur consomme 20 250 J en 45 s. Quelle est sa puissance ?
  → 450
  pièges : ph_power_times, ph_iso_flip

Un mixeur consomme 38 500 J en 70 s. Quelle est sa puissance ?
  → 550
  pièges : ph_power_times, ph_iso_flip

Un mixeur consomme 42 500 J en 85 s. Quelle est sa puissance ?
  → 500
  pièges : ph_power_times, ph_iso_flip

```

### Niveau 2

```
Un mixeur consomme 38 860 J en 58 s. Quelle est sa puissance ?
  → 670
  pièges : ph_power_times, ph_iso_flip

Une cycliste roule à 6,5 m/s contre une force de résistance (air et frottements) de 23 N. Quelle puissance développe-t-elle ?
  → 149,5
  pièges : iso_wrong_inverse

En montant un escalier, une sportive fournit 4640 J en 8 s. Quelle est sa puissance moyenne ?
  → 580
  pièges : ph_power_times, ph_iso_flip

```

### Niveau 3

```
Un moteur de 1500 W doit fournir 75 000 J. Combien de temps lui faut-il ?
  → 50
  pièges : ph_power_times, ph_iso_flip

Un cycliste développe 150 W pendant 360 s. Quelle énergie fournit-il ?
  → 54000
  pièges : iso_wrong_inverse, ph_iso_flip

Un cycliste développe 220 W pendant 270 s. Quelle énergie fournit-il ?
  → 59400
  pièges : iso_wrong_inverse, ph_iso_flip

```

### Niveau 4

```
Une pompe fonctionne pendant 1 h 45 min et fournit 7,875 MJ. Quelle est sa puissance moyenne ?
  → 1250
  pièges : ph_minutes_decimal, ph_not_si

Un moteur de 1,5 kW doit fournir 1,62 MJ. Combien de temps lui faut-il, en minutes ?
  → 18
  pièges : ph_not_si, ph_power_times

Une pompe fonctionne pendant 1 h 45 min et fournit 8,82 MJ. Quelle est sa puissance moyenne ?
  → 1400
  pièges : ph_minutes_decimal, ph_not_si

```

### Niveau 5

```
Un ascenseur de 550 kg, passagers compris, monte de 21 m en 26 s. Quelle puissance moyenne développe-t-il ? Réponds en kW.
  → 4,44
  pièges : ph_ep_forget_g, ph_power_times

Un treuil monte 180 kg de sacs sur 8 m en 40 s. Quelle est la puissance minimale de son moteur ?
  → 360
  pièges : ph_ep_forget_g, ph_power_times

Un ascenseur de 950 kg, passagers compris, monte de 27 m en 26 s. Quelle puissance moyenne développe-t-il ? Réponds en kW.
  → 9,87
  pièges : ph_ep_forget_g, ph_power_times

```

## Puissance électrique (`ph-elec-power`, 10H)

_<span class="m"><i class="m-var">P</i><span class="m-op">=</span><i class="m-var">U</i><span class="m-thin"></span><i class="m-var">I</i></span> : tension fois courant._

### Niveau 1

```
Un ventilateur fonctionne sous 12 V et consomme 1 A. Quelle est sa puissance ?
  → 12
  pièges : ph_elec_divide

Un radiateur branché sur 230 V est traversé par un courant de 8 A. Quelle est sa puissance ?
  → 1840
  pièges : ph_elec_divide

Une perceuse fonctionne sous 230 V avec un courant de 3 A. Quelle est sa puissance ?
  → 690
  pièges : ph_elec_divide

```

### Niveau 2

```
Le moteur d'une trottinette électrique fonctionne sous 48 V et consomme 9,5 A. Quelle est sa puissance ?
  → 456
  pièges : ph_elec_divide

Un phare de voiture fonctionne sous 12 V et consomme 5,5 A. Quelle est sa puissance ?
  → 66
  pièges : ph_elec_divide

Un chargeur USB fournit 2,9 A sous 5 V. Quelle puissance fournit-il ?
  → 14,5
  pièges : ph_elec_divide

```

### Niveau 3

```
Un moteur de 288 W consomme un courant de 6 A. Sous quelle tension fonctionne-t-il ?
  → 48
  pièges : iso_wrong_inverse, ph_iso_flip

Une plaque de cuisson de 1200 W fonctionne sous 230 V. Quel courant la traverse ?
  → 5,22
  pièges : iso_wrong_inverse, ph_iso_flip

Une plaque de cuisson de 800 W fonctionne sous 230 V. Quel courant la traverse ?
  → 3,48
  pièges : iso_wrong_inverse, ph_iso_flip

```

### Niveau 4

```
Un four de 3 kW est branché sur 230 V. Quel courant le traverse ?
  → 13
  pièges : ph_not_si, ph_iso_flip

Une ampoule LED de 11 W fonctionne sous 230 V. Quel courant la traverse, en mA ?
  → 47,8
  pièges : ph_not_si, ph_iso_flip

Un four de 3 kW est branché sur 230 V. Quel courant le traverse ?
  → 13
  pièges : ph_not_si, ph_iso_flip

```

### Niveau 5

```
Sur une prise de 230 V, on branche une bouilloire de 2000 W et un grille-pain de 700 W. Quel courant total passe dans la prise ?
  → 11,7
  pièges : ph_iso_flip, iso_wrong_inverse

Sur une prise de 230 V, on branche une bouilloire de 2000 W et un grille-pain de 900 W. Quel courant total passe dans la prise ?
  → 12,6
  pièges : ph_iso_flip, iso_wrong_inverse

Une prise de 230 V est protégée par un fusible de 16 A. Peut-on y brancher en même temps un radiateur de 1000 W et une bouilloire de 1500 W ?
  · On ne peut pas savoir sans connaître la résistance des appareils   ✔ Oui : le courant total vaut 10,9 A, moins que 16 A   · Non : le courant total vaut 10,9 A, plus que 16 A

```

## Énergie électrique, Wh et Ah (`ph-elec-energy`, 10H)

_<span class="m"><i class="m-var">E</i><span class="m-op">=</span><i class="m-var">U</i><span class="m-thin"></span><i class="m-var">I</i><span class="m-thin"></span><i class="m-var">t</i></span>, les wattheures et les ampèreheures._

### Niveau 1

```
Une ampoule de 15 W reste allumée pendant 420 s. Quelle énergie consomme-t-elle ?
  → 6300
  pièges : iso_wrong_inverse, ph_iso_flip

Une ampoule de 10 W reste allumée pendant 180 s. Quelle énergie consomme-t-elle ?
  → 1800
  pièges : iso_wrong_inverse, ph_iso_flip

Un petit moteur fonctionne sous 6 V avec un courant de 3 A pendant 70 s. Quelle énergie consomme-t-il ?
  → 1260
  pièges : ph_elec_divide

```

### Niveau 2

```
Une batterie porte l'inscription « 12 V — 50 Ah ». Quelle énergie stocke-t-elle, en Wh ?
  → 600
  pièges : ph_elec_divide, ph_wh_forget_3600

Une ampoule de 5 W fonctionne 2,5 h. Quelle énergie consomme-t-elle, en Wh ?
  → 12,5
  pièges : ph_wh_forget_3600, iso_wrong_inverse

Une batterie porte l'inscription « 3,7 V — 4 Ah ». Quelle énergie stocke-t-elle, en Wh ?
  → 14,8
  pièges : ph_elec_divide, ph_wh_forget_3600

```

### Niveau 3

```
Une batterie porte l'inscription « 48 V — 10 Ah ». Quelle énergie stocke-t-elle, en joules ?
  → 1,728×10^6
  pièges : ph_wh_forget_3600

La batterie d'un vélo électrique stocke 250 Wh. Combien de joules cela fait-il ?
  → 900000
  pièges : ph_wh_forget_3600, convert_wrong_direction

Une batterie porte l'inscription « 36 V — 10 Ah ». Quelle énergie stocke-t-elle, en joules ?
  → 1,296×10^6
  pièges : ph_wh_forget_3600

```

### Niveau 4

```
Une batterie de vélo porte l'inscription « 36 V — 10 Ah ». Le moteur consomme 6 A. Combien de temps peut-on rouler, en heures ?
  → 1,67
  pièges : ph_iso_flip, iso_wrong_inverse

Une batterie de vélo porte l'inscription « 36 V — 10 Ah ». Le moteur consomme 8 A. Combien de temps peut-on rouler, en heures ?
  → 1,25
  pièges : ph_iso_flip, iso_wrong_inverse

Un radiateur de 2 kW fonctionne pendant 5 h. Quelle énergie consomme-t-il, en joules ?
  → 3,6×10^7
  pièges : ph_wh_forget_3600, ph_not_si

```

### Niveau 5

```
Un radiateur de 2 kW fonctionne 4 h par jour pendant 30 jours. Le kWh coûte 0,25 CHF. Combien coûte son électricité ?
  → 60
  pièges : ph_not_si

Une plaque de cuisson de 1,5 kW fonctionne 1 min. Combien de temps une ampoule de 10 W doit-elle briller pour consommer autant d'énergie ? Réponds en minutes.
  → 150
  pièges : ph_not_si, ph_iso_flip

Batterie A : « 12 V — 40 Ah ». Batterie B : « 48 V — 12 Ah ». Laquelle stocke le plus d'énergie ?
  ✔ B : 576 Wh contre 480 Wh   · Les deux autant : une batterie, c'est une batterie   · A : elle a plus d'ampèreheures [ph_ah_as_energy]
  pièges : ph_ah_as_energy

```

## Écart de température (`ph-deltaT`, 10H)

_<span class="m">Δ<i class="m-var">T</i></span> = arrivée − départ, en K ou en °C._

### Niveau 1

```
Une casserole d'eau passe de 18 °C à 60 °C. Quel est ΔT ?
  → 42
  pièges : ph_deltaT_add_273, ph_deltaT_order

Une casserole d'eau passe de 27 °C à 70 °C. Quel est ΔT ?
  → 43
  pièges : ph_deltaT_add_273, ph_deltaT_order

Une casserole d'eau passe de 29 °C à 100 °C. Quel est ΔT ?
  → 71
  pièges : ph_deltaT_add_273, ph_deltaT_order

```

### Niveau 2

```
Un produit sorti du congélateur passe de −15 °C à 22 °C. Quel est ΔT ?
  → 37
  pièges : sub_neg_subtracts, ph_deltaT_add_273, ph_deltaT_order

Au Chasseral, il fait −5 °C le matin et 7 °C l'après-midi. Quel est ΔT ?
  → 12
  pièges : sub_neg_subtracts, ph_deltaT_add_273, ph_deltaT_order

Au Chasseral, il fait −9 °C le matin et 6 °C l'après-midi. Quel est ΔT ?
  → 15
  pièges : sub_neg_subtracts, ph_deltaT_add_273, ph_deltaT_order

```

### Niveau 3

```
De l'eau à 17 °C se réchauffe : ΔT = 55 K. Quelle est sa température finale, en °C ?
  → 72
  pièges : ph_deltaT_order, ph_deltaT_add_273

Un gâteau sort du four à 95 °C et refroidit jusqu'à 40 °C. Quel est ΔT ?
  → -55
  pièges : ph_deltaT_order, ph_deltaT_add_273

De l'eau à 13 °C se réchauffe : ΔT = 50 K. Quelle est sa température finale, en °C ?
  → 63
  pièges : ph_deltaT_order, ph_deltaT_add_273

```

### Niveau 4

```
Après avoir gagné ΔT = 40 K, de l'eau est à 95 °C. Quelle était sa température de départ, en °C ?
  → 55
  pièges : ph_deltaT_order, ph_deltaT_add_273

Après avoir gagné ΔT = 70 K, de l'eau est à 70 °C. Quelle était sa température de départ, en °C ?
  → 0
  pièges : ph_deltaT_order, ph_deltaT_add_273

Un liquide refroidit de 55 °C à 266 K. Quel est ΔT, en kelvins ?
  → -62
  pièges : ph_not_si, ph_deltaT_order

```

### Niveau 5

```
Vrai ou faux : quand de l'eau refroidit de 75 °C à 28 °C, ΔT est négatif.
  · Faux : un écart est toujours positif [ph_deltaT_order]   ✔ Vrai : ΔT = −47 K   · Faux : ΔT = 226 K [ph_deltaT_add_273]
  pièges : ph_deltaT_order, ph_deltaT_add_273

Un écart de température de 85 °C, c'est un écart de combien de kelvins ?
  · On ne peut pas savoir sans les températures   ✔ 85 K : un degré Celsius et un kelvin ont la même taille   · 358 K : on ajoute 273 [ph_deltaT_add_273]
  pièges : ph_deltaT_add_273

Une recette demande de chauffer une préparation de 23 °C à 90 °C. Quel est ΔT ?
  · 340 K, car il faut ajouter 273 [ph_deltaT_add_273]   ✔ 67 K, c'est-à-dire aussi 67 °C : seul l'écart compte   · −67 K : départ moins arrivée [ph_deltaT_order]
  pièges : ph_deltaT_add_273, ph_deltaT_order

```

## Énergie thermique (`ph-heat`, 10H)

_<span class="m"><i class="m-var">E</i><span class="m-op">=</span><i class="m-var">m</i><span class="m-thin"></span><i class="m-var">c</i><span class="m-thin"></span>Δ<i class="m-var">T</i></span> : chauffer coûte de l'énergie._

### Niveau 1

```
Une casserole en aluminium de 3 kg passe de 20 °C à 80 °C sur le feu. Quelle énergie a-t-elle reçue ? (c = 900 J/(kg·K))
  → 162000
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

Quelle énergie faut-il pour chauffer 3 kg d'eau de 25 °C à 90 °C ? (c = 4200 J/(kg·K))
  → 819000
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

Quelle énergie faut-il pour chauffer 2 kg d'huile de friture de 20 °C à 170 °C ? (c = 2000 J/(kg·K))
  → 600000
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

```

### Niveau 2

```
Une casserole en aluminium de 0,4 kg passe de 12 °C à 60 °C sur le feu. Quelle énergie a-t-elle reçue ? (c = 900 J/(kg·K))
  → 17280
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

Quelle énergie faut-il pour chauffer 1,5 kg d'eau de 23 °C à 95 °C ? (c = 4200 J/(kg·K))
  → 453600
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

Quelle énergie faut-il pour chauffer 0,5 kg de lait de 10 °C à 70 °C ? (c = 3900 J/(kg·K))
  → 117000
  pièges : ph_heat_forget_mass, ph_heat_final_temp, ph_deltaT_add_273

```

### Niveau 3

```
Avec 315 000 J, on chauffe de l'eau de 20 °C à 70 °C. Quelle masse d'eau a-t-on chauffée ? (c = 4200 J/(kg·K))
  → 1,5
  pièges : ph_heat_final_temp, ph_iso_flip

Avec 420 000 J, on chauffe de l'eau de 15 °C à 40 °C. Quelle masse d'eau a-t-on chauffée ? (c = 4200 J/(kg·K))
  → 4
  pièges : ph_heat_final_temp, ph_iso_flip

On donne 195 300 J à 1,5 kg d'eau. De combien sa température monte-t-elle ? (c = 4200 J/(kg·K))
  → 31
  pièges : ph_heat_forget_mass, ph_iso_flip

```

### Niveau 4

```
On chauffe 200 mL de lait de 7 °C à 60 °C pour un chocolat chaud. Quelle énergie faut-il ? (1 mL de lait ≈ 1 g ; c = 3900 J/(kg·K))
  → 41340
  pièges : ph_gram_as_kg, ph_heat_final_temp

On chauffe 300 mL de lait de 4 °C à 65 °C pour un chocolat chaud. Quelle énergie faut-il ? (1 mL de lait ≈ 1 g ; c = 3900 J/(kg·K))
  → 71370
  pièges : ph_gram_as_kg, ph_heat_final_temp

Une cuillère en acier de 60 g passe de 18 °C à 60 °C dans une tasse de thé. Quelle énergie a-t-elle reçue ? (c = 450 J/(kg·K))
  → 1134
  pièges : ph_gram_as_kg, ph_heat_final_temp

```

### Niveau 5

```
Une bouilloire de 2000 W chauffe 0,8 L d'eau du robinet, de 12 °C jusqu'à ébullition (100 °C). Sans pertes, combien de temps lui faut-il, en secondes ?
  → 148
  pièges : ph_power_times, ph_heat_forget_mass, ph_heat_final_temp

2 kg d'eau (c = 4200 J/(kg·K)) et 2 kg d'huile (c = 2000 J/(kg·K)) reçoivent la même énergie. Lequel des deux chauffe le plus ?
  · L'eau : son c est plus grand [ph_iso_flip]   ✔ L'huile : avec un c plus petit, ΔT=E/mc est plus grand   · Les deux autant : même masse, même énergie
  pièges : ph_iso_flip

Un thermoplongeur de 500 W chauffe 15 kg d'eau pendant 17 min. Sans pertes, de combien la température monte-t-elle ? (c = 4200 J/(kg·K))
  → 8,1
  pièges : ph_not_si, ph_heat_forget_mass

```

## Chaleur latente (`ph-latent`, 10H)

_<span class="m"><i class="m-var">E</i><span class="m-op">=</span><i class="m-var">m</i><span class="m-thin"></span><i class="m-var">L</i><sub class="m-sub">f</sub></span> : fondre sans changer de température._

### Niveau 1

```
Un bloc de glace de 2 kg, à 0 °C, fond dans une glacière. Quelle énergie a-t-il reçue ? (Lf = 330 kJ/kg)
  → 660000
  pièges : ph_not_si, ph_iso_flip

On fait fondre 3 kg de neige à 0 °C dans une casserole, au camp. Quelle énergie faut-il ? (Lf = 330 kJ/kg)
  → 990000
  pièges : ph_not_si, ph_iso_flip

Quelle énergie faut-il pour faire fondre 1 kg de glace à 0 °C ? (Lf = 330 kJ/kg)
  → 330000
  pièges : ph_not_si

```

### Niveau 2

```
On fait fondre 1,1 kg de neige à 0 °C dans une casserole, au camp. Quelle énergie faut-il ? (Lf = 330 kJ/kg)
  → 363000
  pièges : ph_not_si, ph_iso_flip

On fait fondre 2 kg de neige à 0 °C dans une casserole, au camp. Quelle énergie faut-il ? (Lf = 330 kJ/kg)
  → 660000
  pièges : ph_not_si, ph_iso_flip

Un bloc de glace de 2,3 kg, à 0 °C, fond dans une glacière. Quelle énergie a-t-il reçue ? (Lf = 330 kJ/kg)
  → 759000
  pièges : ph_not_si, ph_iso_flip

```

### Niveau 3

```
Quelle masse de glace à 0 °C peut-on faire fondre avec 198 kJ ? (Lf = 330 kJ/kg)
  → 0,6
  pièges : ph_iso_flip, iso_wrong_inverse

Quelle masse de glace à 0 °C peut-on faire fondre avec 693 kJ ? (Lf = 330 kJ/kg)
  → 2,1
  pièges : ph_iso_flip, iso_wrong_inverse

Quelle masse de glace à 0 °C peut-on faire fondre avec 792 kJ ? (Lf = 330 kJ/kg)
  → 2,4
  pièges : ph_iso_flip, iso_wrong_inverse

```

### Niveau 4

```
Quelle énergie faut-il pour faire fondre 6 glaçons de 10 g chacun, à 0 °C ? (Lf = 330 kJ/kg)
  → 19800
  pièges : ph_gram_as_kg, ph_not_si, ph_phase_forgotten

Quelle masse de glace à 0 °C fond avec 165 kJ ? Réponds en grammes. (Lf = 330 kJ/kg)
  → 500
  pièges : ph_iso_flip, iso_wrong_inverse

Quelle énergie faut-il pour faire fondre 5 glaçons de 40 g chacun, à 0 °C ? (Lf = 330 kJ/kg)
  → 66000
  pièges : ph_gram_as_kg, ph_not_si, ph_phase_forgotten

```

### Niveau 5

```
Quelle énergie faut-il pour transformer 0,2 kg de glace à 0 °C en eau à 40 °C ? Réponds en kJ. (Lf = 330 kJ/kg ; c = 4200 J/(kg·K))
  → 99,6
  pièges : ph_phase_forgotten

Quelle énergie faut-il pour transformer 0,7 kg de glace à 0 °C en eau à 10 °C ? Réponds en kJ. (Lf = 330 kJ/kg ; c = 4200 J/(kg·K))
  → 260,4
  pièges : ph_phase_forgotten

Dans un verre de jus, on met soit un glaçon de 30 g à 0 °C, soit 30 g d'eau à 0 °C. Qu'est-ce qui refroidit le plus le jus ?
  ✔ Le glaçon : il prend en plus l'énergie pour fondre   · Les deux autant : même masse, même température [ph_latent_temperature]   · L'eau : elle se mélange mieux
  pièges : ph_latent_temperature

```

## Mélanges et équilibre (`ph-mix`, 11H)

_L'énergie perdue par le chaud est gagnée par le froid._

### Niveau 1

```
On verse 2 kg d'eau à 70 °C dans 4 kg d'eau à 10 °C, sans pertes. Quelle est la température finale ?
  → 30
  pièges : ph_mix_average

On verse 2 kg d'eau à 80 °C dans 3 kg d'eau à 20 °C, sans pertes. Quelle est la température finale ?
  → 44
  pièges : ph_mix_average

On verse 3 kg d'eau à 90 °C dans 1 kg d'eau à 30 °C, sans pertes. Quelle est la température finale ?
  → 75
  pièges : ph_mix_average

```

### Niveau 2

```
On verse 4 kg d'eau à 66 °C dans 2 kg d'eau à 21 °C, sans pertes. Quelle est la température finale ?
  → 51
  pièges : ph_mix_average

Dans une baignoire, on mélange 40 L d'eau à 91 °C et 80 L d'eau à 16 °C. Sans pertes, quelle est la température finale ?
  → 41
  pièges : ph_mix_average

On verse 4 kg d'eau à 95 °C dans 6 kg d'eau à 25 °C, sans pertes. Quelle est la température finale ?
  → 53
  pièges : ph_mix_average

```

### Niveau 3

```
On verse 4 kg d'eau chaude dans 1 kg d'eau à 25 °C. Le mélange est à 45 °C. Quelle était la température de l'eau chaude ?
  → 50
  pièges : ph_mix_average, ph_iso_flip

Quelle masse d'eau à 20 °C faut-il ajouter à 1,5 kg d'eau à 65 °C pour obtenir de l'eau à 35 °C ?
  → 3
  pièges : ph_iso_flip, ph_mix_average

On verse 2 kg d'eau chaude dans 1 kg d'eau à 20 °C. Le mélange est à 50 °C. Quelle était la température de l'eau chaude ?
  → 65
  pièges : ph_mix_average, ph_iso_flip

```

### Niveau 4

```
On verse 100 mL de thé à 85 °C dans une tasse, puis 150 mL de lait à 10 °C. Sans pertes, quelle est la température finale ? (On traite le thé et le lait comme de l'eau : 1 mL ↔ 1 g.)
  → 40
  pièges : ph_mix_average

On verse 400 g d'eau à 80 °C dans une bassine qui contient 4 kg d'eau à 25 °C. Sans pertes, quelle est la température finale ?
  → 30
  pièges : ph_gram_as_kg, ph_mix_average

On verse 300 mL de thé à 85 °C dans une tasse, puis 250 mL de lait à 19 °C. Sans pertes, quelle est la température finale ? (On traite le thé et le lait comme de l'eau : 1 mL ↔ 1 g.)
  → 55
  pièges : ph_mix_average

```

### Niveau 5

```
Pour un mélange d'eau à 85 °C et d'eau à 15 °C, un élève trouve une température finale de 10 °C. Sans refaire le calcul, que peut-on dire ?
  ✔ Il y a une erreur : la température finale est forcément entre 15 °C et 85 °C   · C'est possible : le chaud et le froid s'additionnent   · C'est possible si les masses sont très différentes

Pour un mélange d'eau à 70 °C et d'eau à 10 °C, un élève trouve une température finale de 85 °C. Sans refaire le calcul, que peut-on dire ?
  · C'est possible : le chaud et le froid s'additionnent   ✔ Il y a une erreur : la température finale est forcément entre 10 °C et 70 °C   · C'est possible si les masses sont très différentes

On veut de l'eau à 41 °C en mélangeant de l'eau à 55 °C et de l'eau à 15 °C. Faut-il plus d'eau chaude ou plus d'eau froide ? Réponds sans calcul.
  ✔ Plus d'eau chaude : 41 °C est plus près de 55 °C   · Autant des deux : le mélange est toujours à la moyenne [ph_mix_average]   · Plus d'eau froide : 41 °C est plus près de 15 °C
  pièges : ph_mix_average

```

## Masse volumique (`ph-density`, 10H)

_<span class="m"><i class="m-var">ρ</i><span class="m-op">=</span><span class="m-frac"><span class="m-n"><i class="m-var">m</i></span><span class="m-d"><i class="m-var">V</i></span></span></span> : la masse d'un litre, d'un mètre cube._

### Niveau 1

```
Un bloc de 27 kg occupe un volume de 0,01 m³. Quelle est sa masse volumique ?
  → 2700
  pièges : ph_density_inverted, iso_wrong_inverse

Un bloc de 48 kg occupe un volume de 0,02 m³. Quelle est sa masse volumique ?
  → 2400
  pièges : ph_density_inverted, iso_wrong_inverse

Une poutre de 120 kg a un volume de 0,05 m³. Quelle est sa masse volumique ?
  → 2400
  pièges : ph_density_inverted, iso_wrong_inverse

```

### Niveau 2

```
0,5 L de glycérine ont une masse de 0,63 kg. Quelle est la masse volumique de la glycérine, en kg/L ?
  → 1,26
  pièges : ph_density_inverted

2 L d'huile ont une masse de 1,84 kg. Quelle est la masse volumique de l'huile, en kg/L ?
  → 0,92
  pièges : ph_density_inverted

4,5 L de glycérine ont une masse de 5,67 kg. Quelle est la masse volumique de la glycérine, en kg/L ?
  → 1,26
  pièges : ph_density_inverted

```

### Niveau 3

```
Quel volume occupent 0,79 kg d'alcool ? Réponds en litres. (ρ = 0,79 kg/L)
  → 1
  pièges : ph_density_inverted

Quel volume occupent 2,765 kg d'alcool ? Réponds en litres. (ρ = 0,79 kg/L)
  → 3,5
  pièges : ph_density_inverted, ph_iso_flip

Quel volume occupent 1,58 kg d'alcool ? Réponds en litres. (ρ = 0,79 kg/L)
  → 2
  pièges : ph_density_inverted, ph_iso_flip

```

### Niveau 4

```
1000 mL d'huile d'olive ont une masse de 920 g. Quelle est la masse volumique de l'huile, en kg/m³ ?
  → 920
  pièges : ph_not_si, ph_density_inverted

Une bague de 7,72 g a un volume de 0,4 cm³. Quelle est sa masse volumique, en kg/m³ ?
  → 19300
  pièges : ph_not_si, ph_density_inverted

1000 mL d'huile d'olive ont une masse de 920 g. Quelle est la masse volumique de l'huile, en kg/m³ ?
  → 920
  pièges : ph_not_si, ph_density_inverted

```

### Niveau 5

```
Un aquarium de 70 cm × 40 cm × 40 cm est rempli d'eau. Quelle est la masse de l'eau ?
  → 112
  pièges : ph_gram_as_kg, ph_not_si

Vrai ou faux : 1 kg de fer est plus lourd que 1 kg de bois.
  ✔ Faux : 1 kg, c'est 1 kg ; seul le volume change   · Vrai : sa masse volumique est plus grande [ph_density_inverted]   · Vrai : il est plus dur
  pièges : ph_density_inverted

Vrai ou faux : 1 kg de pierres est plus lourd que 1 kg de coton.
  · Vrai : sa masse volumique est plus grande [ph_density_inverted]   · Vrai : il est plus dur   ✔ Faux : 1 kg, c'est 1 kg ; seul le volume change
  pièges : ph_density_inverted

```

## Rendement (`ph-efficiency`, 10H)

_<span class="m"><i class="m-var">η</i><span class="m-op">=</span><span class="m-frac"><span class="m-n"><i class="m-var">E</i><sub class="m-sub">u</sub></span><span class="m-d"><i class="m-var">E</i><sub class="m-sub">f</sub></span></span></span> : la part utile._

### Niveau 1

```
Un panneau solaire reçoit 500 W de lumière et fournit 200 W d'électricité. Quel est son rendement, en % ?
  → 40
  pièges : ph_efficiency_inverted

Un moteur reçoit 400 J d'énergie et fournit 160 J d'énergie utile. Quel est son rendement, en % ?
  → 40
  pièges : ph_efficiency_inverted

Un panneau solaire reçoit 500 W de lumière et fournit 150 W d'électricité. Quel est son rendement, en % ?
  → 30
  pièges : ph_efficiency_inverted

```

### Niveau 2

```
Un panneau solaire reçoit 550 W de lumière et fournit 209 W d'électricité. Quel est son rendement, en % ?
  → 38
  pièges : ph_efficiency_inverted

Une ampoule consomme 6 W et émet 0,72 W de lumière. Quel est son rendement, en % ?
  → 12
  pièges : ph_efficiency_inverted

Une ampoule consomme 14 W et émet 6,3 W de lumière. Quel est son rendement, en % ?
  → 45
  pièges : ph_efficiency_inverted

```

### Niveau 3

```
Un moteur a un rendement de 60 %. Il doit fournir 1500 J d'énergie utile. Quelle énergie faut-il lui fournir ?
  → 2500
  pièges : ph_efficiency_inverted, percent_as_amount

Un panneau solaire reçoit 1200 W de lumière ; son rendement est de 22 %. Quelle puissance électrique fournit-il ?
  → 264
  pièges : ph_efficiency_inverted, percent_as_amount

Un moteur a un rendement de 30 %. Il doit fournir 600 J d'énergie utile. Quelle énergie faut-il lui fournir ?
  → 2000
  pièges : ph_efficiency_inverted, percent_as_amount

```

### Niveau 4

```
Une petite centrale à gaz a un rendement de 35 %. Pour fournir 3 kWh d'électricité, quelle énergie le gaz doit-il apporter, en kWh ?
  → 8,57
  pièges : ph_efficiency_inverted, percent_as_amount

Une petite centrale à gaz a un rendement de 30 %. Pour fournir 8 kWh d'électricité, quelle énergie le gaz doit-il apporter, en kWh ?
  → 26,7
  pièges : ph_efficiency_inverted, percent_as_amount

Un moteur électrique consomme 1 kW et fournit une puissance utile de 800 W. Quel est son rendement, en % ?
  → 80
  pièges : ph_not_si, ph_efficiency_inverted

```

### Niveau 5

```
Un inventeur annonce un moteur de rendement 105 %. Est-ce possible ?
  · Oui, s'il est très bien construit   ✔ Non : il rendrait plus d'énergie qu'il n'en reçoit   · Oui, si on lui fournit beaucoup d'énergie [ph_efficiency_inverted]
  pièges : ph_efficiency_inverted

Un inventeur annonce un moteur de rendement 110 %. Est-ce possible ?
  · Oui, si on lui fournit beaucoup d'énergie [ph_efficiency_inverted]   ✔ Non : il rendrait plus d'énergie qu'il n'en reçoit   · Oui, s'il est très bien construit
  pièges : ph_efficiency_inverted

Un panneau solaire de 2 m² reçoit 1000 W par m² de soleil. Son rendement est de 18 %. Quelle puissance électrique fournit-il ?
  → 360
  pièges : ph_efficiency_inverted, percent_as_amount

```

## Conservation de l'énergie (`ph-conservation`, 11H)

_L'énergie de hauteur devient de la vitesse._

### Niveau 1

```
Une pomme tombe d'une branche à 3,2 m du sol. Sans frottement de l'air, à quelle vitesse touche-t-elle le sol ?
  → 8
  pièges : ph_forget_sqrt, ph_ec_forget_half, ph_ep_forget_g

Un bidon de lait dévale une rampe de 45 m de haut, sans frottement, en partant à l'arrêt. Quelle est sa vitesse en bas ?
  → 30
  pièges : ph_forget_sqrt, ph_ec_forget_half, ph_ep_forget_g

Une luge part à l'arrêt en haut d'une pente de 1,8 m de dénivelé. Sans frottement, quelle est sa vitesse en bas ?
  → 6
  pièges : ph_forget_sqrt, ph_ec_forget_half, ph_ep_forget_g

```

### Niveau 2

```
Un bidon de lait dévale une rampe de 21 m de haut, sans frottement, en partant à l'arrêt. Quelle est sa vitesse en bas ?
  → 20,5
  pièges : ph_forget_sqrt, ph_ec_forget_half, ph_ep_forget_g

Une balle de 2 kg tombe de 18 m. Sans frottement, quelle est son énergie cinétique juste avant de toucher le sol ?
  → 360
  pièges : ph_ep_forget_g, ph_ec_forget_half

Une balle de 0,5 kg tombe de 15 m. Sans frottement, quelle est son énergie cinétique juste avant de toucher le sol ?
  → 75
  pièges : ph_ep_forget_g, ph_ec_forget_half

```

### Niveau 3

```
De quelle hauteur faut-il lâcher un objet, sans frottement, pour qu'il arrive au sol à 10 m/s ?
  → 5
  pièges : ph_ec_forget_square, ph_iso_flip

Une skateuse arrive en bas d'une rampe à 6 m/s. Sans frottement, de quelle hauteur est-elle partie, à l'arrêt ?
  → 1,8
  pièges : ph_ec_forget_square, ph_ec_forget_half, ph_iso_flip

De quelle hauteur faut-il lâcher un objet, sans frottement, pour qu'il arrive au sol à 25 m/s ?
  → 31,25
  pièges : ph_ec_forget_square, ph_ec_forget_half, ph_iso_flip

```

### Niveau 4

```
Une bille posée au bord d'une table de 65 cm de haut tombe sans vitesse de départ. Sans frottement, à quelle vitesse touche-t-elle le sol ?
  → 3,61
  pièges : ph_not_si, ph_forget_sqrt

Un skieur part à l'arrêt et descend 5 m de dénivelé, sans frottement. Quelle est sa vitesse en bas, en km/h ?
  → 36
  pièges : ph_kmh_not_converted, speed_factor_wrong_way, ph_forget_sqrt

Une bille posée au bord d'une table de 100 cm de haut tombe sans vitesse de départ. Sans frottement, à quelle vitesse touche-t-elle le sol ?
  → 4,47
  pièges : ph_not_si, ph_forget_sqrt

```

### Niveau 5

```
On lâche un objet de 4 fois plus haut, sans frottement. Par combien sa vitesse à l'arrivée est-elle multipliée ?
  ✔ Par 2, car v=√(2gh   · Par 1 : la vitesse ne dépend que de la masse   · Par 4 : la vitesse est proportionnelle à la hauteur [ph_forget_sqrt]
  pièges : ph_forget_sqrt

Une luge part à 2 m/s en haut d'une pente de 13 m de dénivelé. Sans frottement, quelle est sa vitesse en bas ?
  → 16,2
  pièges : ph_speeds_added, ph_phase_forgotten

Deux sacs, l'un de 5 kg et l'autre de 25 kg, tombent de la même hauteur, sans frottement. Lequel touche le sol le plus vite ?
  · Le sac de 25 kg : il est plus lourd [ph_heavier_faster]   · Le sac de 5 kg : il est plus léger   ✔ Aucun : même vitesse, car la masse se simplifie
  pièges : ph_heavier_faster

```

## Pièges de cette unité

- **Wh pris pour des joules** (`ph_wh_forget_3600`, E) : 500 Wh = 500 J au lieu de 500 Wh = 1 800 000 J
- **273 ajouté à un écart de température** (`ph_deltaT_add_273`, E) : ΔT = 80 °C = 353 K au lieu de ΔT = 80 °C = 80 K
- **½ oublié dans l'énergie cinétique** (`ph_ec_forget_half`, E) : E_c = m v² au lieu de E_c = ½ m v²
- **Vitesse pas mise au carré** (`ph_ec_forget_square`, E) : E_c = ½ m v au lieu de E_c = ½ m v²
- **P = E × t au lieu de E / t** (`ph_power_times`, E) : P = E·t au lieu de P = E/t
- **P = U / I au lieu de U × I** (`ph_elec_divide`, E) : P = U/I au lieu de P = U·I
- **Masse oubliée dans m c ΔT** (`ph_heat_forget_mass`, E) : E = c ΔT au lieu de E = m c ΔT
- **Masse volumique à l'envers** (`ph_density_inverted`, E) : ρ = V/m au lieu de ρ = m/V
- **Rendement appliqué à l'envers** (`ph_efficiency_inverted`, E) : E_f = η E_u au lieu de E_f = E_u/η
- **Moyenne des températures sans les masses** (`ph_mix_average`, R) : 1 kg à 90 °C + 4 kg à 20 °C → 55 °C au lieu de 34 °C
- **La température monte pendant la fusion** (`ph_latent_temperature`, R) : le glaçon fond, donc il chauffe au lieu de pendant la fusion, il reste à 0 °C
- **Plus lourd, plus rapide** (`ph_heavier_faster`, R) : le sac de 50 kg arrive plus vite au lieu de même vitesse : m se simplifie
- **g oublié dans m g h** (`ph_ep_forget_g`, E) : E_p = m h au lieu de E_p = m g h
- **Altitude prise pour la hauteur** (`ph_height_altitude`, E) : h = 1607 m au lieu de h = 1607 m − 890 m = 717 m
- **Carré de la différence des vitesses** (`ph_ec_diff_square`, E) : ½ m (v₂ − v₁)² au lieu de ½ m v₂² − ½ m v₁²
- **Écart pris à l'envers** (`ph_deltaT_order`, E) : de 85 °C à 20 °C : ΔT = 65 K au lieu de ΔT = 20 − 85 = −65 K
- **Température finale au lieu de l'écart** (`ph_heat_final_temp`, E) : E = m c · 100 au lieu de E = m c · (100 − 20)
- **Une étape oubliée** (`ph_phase_forgotten`, E) : E = m L_f au lieu de E = m L_f + m c ΔT
- **Vitesses additionnées au lieu des énergies** (`ph_speeds_added`, E) : v = v₀ + √(2 g h) au lieu de v = √(v₀² + 2 g h)
- **Ampèreheures pris pour une énergie** (`ph_ah_as_energy`, E) : 50 Ah > 25 Ah, donc plus d'énergie au lieu de 12 V · 50 Ah = 600 Wh = 24 V · 25 Ah
