# Exemples de questions — La recette en 6 étapes

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Étape 1 : trier (`ph6-trier`, 11H)

_Les formules utiles, les données en SI, l'inconnue._

### Niveau 1

```
Un cycliste (95 kg avec son vélo) descend un col de 400 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,7 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1 · live · pick] → ΔT = 1206.34920635 K
  pièges : ph_decoy_formula, ph_not_si

Chaque seconde, 2,6 m³ d'eau tombent de 35 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 1 · live · pick] → P = 910000 W
  pièges : ph_decoy_formula, ph_not_si

Léa (29 kg, avec sa luge) part sans vitesse du haut d'une pente. Le bas de la piste est 3,4 m plus bas que le départ. On néglige les frottements. À quelle vitesse la luge arrive-t-elle en bas ?
  [étapes 1 · live · pick] → v = 8.24621125124 m/s
  pièges : ph_decoy_formula, ph_not_si

```

### Niveau 2

```
Tu lâches une pomme de terre (c = 3500 J/(kg·K)) du haut d'une falaise : elle tombe de 900 m. Toute son énergie à l'impact devient de la chaleur en elle, et on néglige l'air. De combien se réchauffe-t-elle ?
  [étapes 1 · live · pick] → ΔT = 2.57142857143 K
  pièges : ph_decoy_formula, ph_not_si

Un cheval de trait fournit 750 W en tirant une charrue avec une force de 250 N. Combien de temps met-il pour labourer un sillon de 180 m ?
  [étapes 1 · live · pick] → t = 60 s
  pièges : ph_decoy_formula, ph_not_si

Un toboggan aquatique fait 7,1 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 1 · live · pick] → v = 11.9163752878 m/s
  pièges : ph_decoy_formula, ph_not_si

```

### Niveau 3

```
Un chauffe-eau de 4100 W contient 70 L d'eau (c = 4200 J/(kg·K)) à réchauffer de 34 K. Combien de minutes faut-il, sans pertes ?
  [étapes 1 · leave · pick] → t = 40.6341463415 min
  pièges : ph_decoy_formula, ph_not_si

Un chauffe-eau de 2700 W chauffe 2000 g d'eau (c = 4200 J/(kg·K)) pendant 1,92 min, sans pertes. De combien la température de l'eau monte-t-elle ?
  [étapes 1 · leave · pick] → ΔT = 37.0285714286 K
  pièges : ph_decoy_formula, ph_not_si, ph_gram_as_kg

Un cycliste (105 kg avec son vélo) descend un col de 500 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 1 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1 · leave · pick] → ΔT = 1166.66666667 K
  pièges : ph_decoy_formula, ph_not_si

```

### Niveau 4

```
Un toboggan aquatique fait 5,2 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 1 · end · remove] → v = 10.1980390272 m/s
  pièges : ph_decoy_formula, ph_not_si

Tu descends un col en vélo cargo, à vitesse constante : 120 kg en tout, 1150 m de dénivelé, en 50 min. Un frein régénératif envoie toute l'énergie dans la batterie. Quelle puissance moyenne la batterie doit-elle absorber ?
  [étapes 1 · end · remove] → P = 460 W
  pièges : ph_decoy_formula, ph_not_si

Chaque seconde, 800 L d'eau tombent de 27 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 1 · end · remove] → P = 216000 W
  pièges : ph_decoy_formula, ph_not_si

```

### Niveau 5

```
Un chauffe-eau de 5,1 kW contient 270 L d'eau (c = 4200 J/(kg·K)) à réchauffer de 23 K. Combien de minutes faut-il, sans pertes ?
  [étapes 1 · end · remove] → t = 85.2352941176 min
  pièges : ph_decoy_formula, ph_not_si

Un ventilateur de chambre froide (24 V, 3,5 A) tourne pendant 502 min. Quelle énergie consomme-t-il ?
  [étapes 1 · end · remove] → E = 2530080 J
  pièges : ph_decoy_formula, ph_not_si

Un chauffe-eau de 5,1 kW fonctionne pendant 1,55 h, sans pertes. Quel volume d'eau (c = 4200 J/(kg·K)) peut-il réchauffer de 37 K ?
  [étapes 1 · end · remove] → V = 0.183127413127 m^3
  pièges : ph_decoy_formula, ph_not_si

```

## Étape 2 : le chemin (`ph6-chemin`, 11H)

_Connues, inconnue, et la grandeur-pont._

### Niveau 1

```
Un cycliste (115 kg avec son vélo) descend un col de 500 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,9 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 2 · live · pick] → ΔT = 1419.75308642 K
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Une catapulte à ressort (raideur 1750 N/m) est comprimée de 0,22 m. Elle lance une balle de 0,08 kg. Toute l'énergie du ressort devient de l'énergie cinétique. À quelle vitesse part la balle ?
  [étapes 2 · live · pick] → v = 32.538438807 m/s
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Un monte-charge électrique, branché sur 230 V, consomme 26 A. Il monte 590 kg de 5 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 2 · live · pick] → t = 4.93311036789 s
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

```

### Niveau 2

```
Léa monte un col à vélo : 71 kg avec le vélo, 950 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,26. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 2 · live · pick] → E_f = 620.629370629 kcal
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Un ascenseur et ses passagers (1280 kg) montent de 26 m en 63 s. Quelle puissance moyenne le moteur doit-il fournir, au minimum ?
  [étapes 2 · live · pick] → P = 5282.53968254 W
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Lila monte un col à vélo : 96 kg avec le vélo, 1650 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,23. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 2 · live · pick] → E_f = 1647.597254 kcal
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

```

### Niveau 3

```
Un vélo cargo (145 kg en tout) descend à vitesse constante pendant 720 s. Son frein régénératif envoie 620 W dans la batterie. Quel dénivelé a-t-il descendu ?
  [étapes 2 · leave · pick] → h = 307.862068966 m
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Un réchaud de 250 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 2356 s, sans pertes. Quelle masse de glace fond ?
  [étapes 2 · leave · pick] → m = 1.78484848485 kg
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Une voiture de 950 kg roule à 35 m/s. Elle doit s'arrêter sur 167 m. Quelle force de freinage, constante, faut-il ?
  [étapes 2 · leave · pick] → F = 3484.28143713 N
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

```

### Niveau 4

```
Sur la Lune (g = 1,6 N/kg), on lâche sans vitesse une pomme de terre (c = 3500 J/(kg·K)). Toute son énergie à l'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu'elle se réchauffe de 50 K ?
  [étapes 2 · end · remove] → h = 109375 m
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Une bouilloire de 2800 W contient 1,4 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 20 K. Combien de temps faut-il, sans pertes ?
  [étapes 2 · end · remove] → t = 42 s
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Une bouilloire réchauffe 2 kg d'eau (c = 4200 J/(kg·K)) de 75 K en 303 s, sans pertes. Quelle est sa puissance ?
  [étapes 2 · end · remove] → P = 2079.20792079 W
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

```

### Niveau 5

```
Un ventilateur de chambre froide (12 V, 4,5 A) tourne pendant 26 250 s. Quelle énergie consomme-t-il ?
  [étapes 2 · end · remove] → E = 1417608 J
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Un cycliste (90 kg avec son vélo) descend un col de 1000 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,8 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 2 · end · remove] → ΔT = 2500 K
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

Mathilde monte un col à vélo : 69 kg avec le vélo, 1600 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,26. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 2 · end · remove] → E_f = 1015.82627898 kcal
  pièges : ph_needed_removed, ph_bridge_missed, ph_decoy_formula

```

## Étape 3 : l'algèbre (`ph6-algebre`, 11H)

_Une seule ligne : inconnue = lettres uniquement._

### Niveau 1

```
Un réchaud de 1650 W fait fondre 1,3 kg de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 3 · live · pick] → t = 260 s
  pièges : ph_numbers_in_algebra, ph_iso_flip

Une voiture de 1500 kg roule à 23 m/s. Elle doit s'arrêter sur 127 m. Quelle force de freinage, constante, faut-il ?
  [étapes 3 · live · pick] → F = 3124.01574803 N
  pièges : ph_numbers_in_algebra, ph_iso_flip

Un chauffe-eau de 1200 W contient 0,05 m³ d'eau (c = 4200 J/(kg·K)) à réchauffer de 36 K. Combien de minutes faut-il, sans pertes ?
  [étapes 3 · live · pick] → t = 105 min
  pièges : ph_numbers_in_algebra, ph_iso_flip

```

### Niveau 2

```
Une voiture de 1500 kg roule à 31 m/s. Elle doit s'arrêter sur 117 m. Quelle force de freinage, constante, faut-il ?
  [étapes 3 · live · pick] → F = 6160.25641026 N
  pièges : ph_numbers_in_algebra, ph_iso_flip

Un monte-charge de 34 500 W doit monter 1360 kg de marchandises de 22 m. Combien de temps lui faut-il, au minimum ?
  [étapes 3 · live · pick] → t = 8.67246376812 s
  pièges : ph_numbers_in_algebra, ph_iso_flip

Chaque seconde, 2,6 m³ d'eau tombent de 49 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 3 · live · pick] → P = 1274000 W
  pièges : ph_numbers_in_algebra, ph_iso_flip

```

### Niveau 3

```
Un bœuf fournit 500 W en tirant une charrue avec une force de 300 N. Quelle longueur de sillon laboure-t-il en 230 s ?
  [étapes 3 · leave · pick] → d = 383.333333333 m
  pièges : ph_numbers_in_algebra, ph_iso_flip

Un réchaud de 200 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 909 s, sans pertes. Quelle masse de glace fond ?
  [étapes 3 · leave · pick] → m = 0.550909090909 kg
  pièges : ph_numbers_in_algebra, ph_iso_flip

Un treuil de 11 900 W monte des sacs de 29 m en 8 s. Quelle masse de sacs peut-il monter, au plus ?
  [étapes 3 · leave · pick] → m = 328.275862069 kg
  pièges : ph_numbers_in_algebra, ph_iso_flip

```

### Niveau 4

```
Après un freinage, une voiture de 1300 kg a laissé des traces sur 81 m. Les freins exercent une force de 3000 N. À quelle vitesse roulait-elle ?
  [étapes 3 · end · remove] → v = 19.3351015991 m/s
  pièges : ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt

Une batterie de téléphone (3,7 V, 9720 C) se vide en 12 600 s. Quelle puissance moyenne le téléphone consomme-t-il ?
  [étapes 3 · end · remove] → P = 2.85428571429 W
  pièges : ph_numbers_in_algebra, ph_iso_flip

Chiara monte un col à vélo : 86 kg avec le vélo, 1050 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,29. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 3 · end · remove] → E_f = 744.926579772 kcal
  pièges : ph_numbers_in_algebra, ph_iso_flip

```

### Niveau 5

```
Un cheval tire une charrue avec une force de 600 N le long d'un sillon de 500 m. Il met 680 s. Quelle puissance moyenne fournit-il ?
  [étapes 3 · end · remove] → P = 441.176470588 W
  pièges : ph_numbers_in_algebra, ph_iso_flip

Une petite centrale doit recevoir 2,306·10⁶ W de l'eau. Le débit est de 4,8 m³ par seconde. De quelle hauteur l'eau doit-elle tomber ?
  [étapes 3 · end · remove] → h = 48.0416666667 m
  pièges : ph_numbers_in_algebra, ph_iso_flip

Un cycliste (100 kg avec son vélo) descend un col de 150 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,9 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 3 · end · remove] → ΔT = 370.37037037 K
  pièges : ph_numbers_in_algebra, ph_iso_flip

```

## Étape 4 : les unités (`ph6-unites`, 11H)

_Le détecteur de mensonge de l'algèbre._

### Niveau 1

```
Une équipe de chiens fournit 1000 W pour tirer un traîneau avec une force de 200 N. La traversée du lac fait 8500 m. Combien de minutes dure-t-elle ?
  [étapes 4 · live · pick] → t = 28.3333333333 min   (montré : (((d)×(F)))×(P) ✗, ≈ 2000000000)
  pièges : ph_units_lie

Un toboggan aquatique fait 6,9 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 4 · live · pick] → v = 11.7473401245 m/s   (montré : ((2)×(g))×(h) ✗, ≈ 100)
  pièges : ph_units_lie

Une équipe de chiens fournit 1000 W pour tirer un traîneau avec une force de 380 N. La traversée du lac fait 14 000 m. Combien de minutes dure-t-elle ?
  [étapes 4 · live · pick] → t = 88.6666666667 min   (montré : (((d)×(F)))×(P) ✗, ≈ 4000000000)
  pièges : ph_units_lie

```

### Niveau 2

```
Chaque seconde, 1,8 m³ d'eau tombent de 48 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 4 · live · pick] → P = 864000 W   (montré : (((((ρ)×(V))×(g))×(h)))×(t) ✗, ≈ 1000000)
  pièges : ph_units_lie

On construit une piste de luge pour que Lila (35 kg avec sa luge), partie sans vitesse, arrive en bas à 6,3 m/s. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 4 · live · pick] → h = 1.9845 m   (montré : ((v)^(2))/(((2)×(g))), ≈ 2)
  pièges : ph_units_lie

Un cycliste (85 kg avec son vélo) descend un col de 950 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,9 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 4 · live · pick] → ΔT = 1993.82716049 K   (montré : ((((m)×(g))×(h)))/(((m_f)×(c))), ≈ 2000)
  pièges : ph_units_lie

```

### Niveau 3

```
Une équipe de chiens fournit 500 W pour tirer un traîneau avec une force de 320 N. La traversée du lac fait 12 000 m. Combien de minutes dure-t-elle ?
  [étapes 4 · leave · pick] → t = 128 min   (montré : (((d)×(F)))/(P), ≈ 6000)
  pièges : ph_units_lie

Un réchaud de 650 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 444 s, sans pertes. Quelle masse de glace fond ?
  [étapes 4 · leave · pick] → m = 0.874545454545 kg   (montré : (((P)×(t)))×(L_f) ✗, ≈ 80000000000)
  pièges : ph_units_lie

La batterie d'un téléphone (3,7 V) contient une charge de 15 120 C. Le téléphone consomme en moyenne 3,5 W. Combien d'heures tient-il ?
  [étapes 4 · leave · pick] → t = 4.44 h   (montré : (((U)×(Q)))×(P) ✗, ≈ 300000)
  pièges : ph_units_lie

```

### Niveau 4

```
Chiara monte un col à vélo : 62 kg avec le vélo, 1250 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,26. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 4 · end · remove] → E_f = 713.102686787 kcal   (montré : ((((m)×(g))×(h)))/(η), ≈ 2000000)
  pièges : ph_units_lie

Des chiens de traîneau fournissent 800 W et tirent avec une force de 360 N. Quelle distance parcourent-ils en 9939 s ?
  [étapes 4 · end · remove] → d = 22086.6666667 m   (montré : (((P)×(t)))/(F), ≈ 20000)
  pièges : ph_units_lie

Une bouilloire de 3000 W contient 0,8 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 85 K. Combien de temps faut-il, sans pertes ?
  [étapes 4 · end · remove] → t = 95.2 s   (montré : ((((m)×(c))×(ΔT)))×(P) ✗, ≈ 900000000)
  pièges : ph_units_lie

```

### Niveau 5

```
Une batterie de vélo électrique de 24 V stocke 800 000 J. Le moteur consomme un courant de 2,5 A. Pendant combien d'heures peut-on rouler ?
  [étapes 4 · end · remove] → t = 3.7037037037 h   (montré : (E)×(((U)×(I))) ✗, ≈ 50000000)
  pièges : ph_units_lie

Un réchaud de 1050 W fait fondre 1 kg de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 4 · end · remove] → t = 314.285714286 s   (montré : (((m)×(L_f)))/(P), ≈ 300)
  pièges : ph_units_lie

Chaque seconde, 4,4 m³ d'eau tombent de 6 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 4 · end · remove] → P = 264000 W   (montré : (((((ρ)×(V))×(g))×(h)))/(t), ≈ 200000)
  pièges : ph_units_lie

```

## Étape 5 : l'approximation (`ph6-approx`, 11H)

_Une réponse à la main, avant la machine._

### Niveau 1

```
Un cheval de trait fournit 800 W en tirant une charrue avec une force de 400 N. Combien de temps met-il pour labourer un sillon de 290 m ?
  [étapes 5 · live · pick] → t = 145 s   (montré : (((F)×(d)))/(P), ≈ 200)
  pièges : ph_estimate_power10

Tu descends un col en vélo cargo, à vitesse constante : 140 kg en tout, 800 m de dénivelé, en 960 s. Un frein régénératif envoie toute l'énergie dans la batterie. Quelle puissance moyenne la batterie doit-elle absorber ?
  [étapes 5 · live · pick] → P = 1166.66666667 W   (montré : ((((m)×(g))×(h)))/(t), ≈ 800)
  pièges : ph_estimate_power10

Un chauffe-eau de 1900 W contient 0,27 m³ d'eau (c = 4200 J/(kg·K)) à réchauffer de 31 K. Combien de minutes faut-il, sans pertes ?
  [étapes 5 · live · pick] → t = 308.368421053 min   (montré : (((((ρ)×(V))×(c))×(ΔT)))/(P), ≈ 20000)
  pièges : ph_estimate_power10

```

### Niveau 2

```
Un cheval de trait fournit 550 W en tirant une charrue avec une force de 150 N. Combien de temps met-il pour labourer un sillon de 180 m ?
  [étapes 5 · live · pick] → t = 49.0909090909 s   (montré : (((F)×(d)))/(P), ≈ 70)
  pièges : ph_estimate_power10

Lila monte un col à vélo : 96 kg avec le vélo, 850 m de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,26. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 5 · live · pick] → E_f = 750.828119249 kcal   (montré : ((((m)×(g))×(h)))/(η), ≈ 3000000)
  pièges : ph_estimate_power10

Un monte-charge électrique, branché sur 230 V, consomme 11,5 A. Il monte 760 kg de 19,5 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 5 · live · pick] → t = 56.0302457467 s   (montré : ((((m)×(g))×(h)))/(((U)×(I))), ≈ 80)
  pièges : ph_estimate_power10

```

### Niveau 3

```
Léa (90 kg avec son vélo) mange un croissant de 444 kcal. Ses muscles en tirent de l'énergie mécanique avec un rendement de 0,29. De quel dénivelé ce croissant lui permet-il de monter ?
  [étapes 5 · leave · pick] → h = 598.018666667 m   (montré : (((η)×(E_f)))/(((m)×(g))), ≈ 700)
  pièges : ph_estimate_power10

Un réchaud de 300 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 298 s, sans pertes. Quelle masse de glace fond ?
  [étapes 5 · leave · pick] → m = 0.270909090909 kg   (montré : (((P)×(t)))/(L_f), ≈ 0.3)
  pièges : ph_estimate_power10

Malik (41 kg, avec sa luge) part sans vitesse du haut d'une pente. Le bas de la piste est 11,4 m plus bas que le départ. On néglige les frottements. À quelle vitesse la luge arrive-t-elle en bas ?
  [étapes 5 · leave · pick] → v = 15.0996688705 m/s   (montré : √((((2)×(g))×(h))), ≈ 10)
  pièges : ph_estimate_power10

```

### Niveau 4

```
Une batterie de vélo électrique de 24 V stocke 1,7·10⁶ J. Le moteur consomme un courant de 10 A. Pendant combien d'heures peut-on rouler ?
  [étapes 5 · end · remove] → t = 1.96759259259 h   (montré : (E)/(((U)×(I))), ≈ 10000)
  pièges : ph_estimate_power10

La batterie d'un téléphone (3,7 V) contient une charge de 9720 C. Le téléphone consomme en moyenne 1,2 W. Combien d'heures tient-il ?
  [étapes 5 · end · remove] → t = 8.325 h   (montré : (((U)×(Q)))/(P), ≈ 40000)
  pièges : ph_estimate_power10

Une bouilloire branchée sur 230 V est traversée par un courant de 4 A. Elle contient 0,9 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 35 K. Combien de temps faut-il, sans pertes ?
  [étapes 5 · end · remove] → t = 143.804347826 s   (montré : ((((m)×(c))×(ΔT)))/(((U)×(I))), ≈ 200)
  pièges : ph_estimate_power10

```

### Niveau 5

```
Un chauffe-eau de 3600 W contient 0,23 m³ d'eau (c = 4200 J/(kg·K)) à réchauffer de 45 K. Combien de minutes faut-il, sans pertes ?
  [étapes 5 · end · remove] → t = 201.25 min   (montré : (((((ρ)×(V))×(c))×(ΔT)))/(P), ≈ 10000)
  pièges : ph_estimate_power10

Sur la Lune (g = 1,6 N/kg), on lâche sans vitesse une pomme de terre (c = 3500 J/(kg·K)). Toute son énergie à l'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu'elle se réchauffe de 50 K ?
  [étapes 5 · end · remove] → h = 109375 m   (montré : (((c)×(ΔT)))/(g), ≈ 100000)
  pièges : ph_estimate_power10

Des chiens de traîneau fournissent 750 W et tirent avec une force de 260 N. Quelle distance parcourent-ils en 3801 s ?
  [étapes 5 · end · remove] → d = 10964.4230769 m   (montré : (((P)×(t)))/(F), ≈ 10000)
  pièges : ph_estimate_power10

```

## Étape 6 : nombres et verdict (`ph6-verdict`, 11H)

_Comparer avec l'approximation, arrondir, conclure._

### Niveau 1

```
Un monte-charge électrique, branché sur 230 V, consomme 19,5 A. Il monte 420 kg de 17 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 6 · live · pick] → t = 15.9197324415 s   (montré : ((((m)×(g))×(h)))/(((U)×(I))), ≈ 20)
  pièges : ph_verdict_ignored

Un cycliste (80 kg avec son vélo) descend un col de 200 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 1 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 6 · live · pick] → ΔT = 355.555555556 K   (montré : ((((m)×(g))×(h)))/(((m_f)×(c))), ≈ 300)
  pièges : ph_verdict_ignored

Une équipe de chiens fournit 950 W pour tirer un traîneau avec une force de 340 N. La traversée du lac fait 2000 m. Combien de minutes dure-t-elle ?
  [étapes 6 · live · pick] → t = 11.9298245614 min   (montré : (((d)×(F)))/(P), ≈ 600)
  pièges : ph_verdict_ignored

```

### Niveau 2

```
Une catapulte à ressort (raideur 1250 N/m) est comprimée de 0,03 m. Elle lance une balle de 0,47 kg. Toute l'énergie du ressort devient de l'énergie cinétique. À quelle vitesse part la balle ?
  [étapes 6 · live · pick] → v = 1.54713186939 m/s   (montré : √(((((k)×((x)^(2))))/(m))), ≈ 1)
  pièges : ph_verdict_ignored

Chaque seconde, 0,6 m³ d'eau tombent de 26 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 6 · live · pick] → P = 156000 W   (montré : (((((ρ)×(V))×(g))×(h)))/(t), ≈ 200000)
  pièges : ph_verdict_ignored

Une voiture de 800 kg roule à 29 m/s. Elle freine avec une force constante de 3500 N. Sur quelle distance s'arrête-t-elle ?
  [étapes 6 · live · pick] → d = 96.1142857143 m   (montré : (((m)×((v)^(2))))×(((2)×(F))) ✗, ≈ 6000000000)
  pièges : ph_verdict_ignored

```

### Niveau 3

```
Sur Mars (g = 3,7 N/kg), on lâche sans vitesse une pomme de terre (c = 3500 J/(kg·K)). Toute son énergie à l'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu'elle se réchauffe de 40 K ?
  [étapes 6 · leave · pick] → h = 37837.8378378 m   (montré : (((c)×(ΔT)))×(g) ✗, ≈ 60000000 ✗)
  pièges : ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 5,5 A. Elle contient 1,1 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 70 K. Combien de temps faut-il, sans pertes ?
  [étapes 6 · leave · pick] → t = 255.652173913 s   (montré : ((((m)×(c))×(ΔT)))×(((U)×(I))) ✗, ≈ 300000000)
  pièges : ph_verdict_ignored

Un réchaud de 1000 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 324 s, sans pertes. Quelle masse de glace fond ?
  [étapes 6 · leave · pick] → m = 0.981818181818 kg   (montré : (((P)×(t)))/(L_f), ≈ 1)
  pièges : ph_verdict_ignored

```

### Niveau 4

```
Une bouilloire branchée sur 230 V est traversée par un courant de 10 A. Elle contient 1,6 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 80 K. Combien de temps faut-il, sans pertes ?
  [étapes 6 · end · remove] → t = 233.739130435 s   (montré : ((((m)×(c))×(ΔT)))/(((U)×(I))), ≈ 300)
  pièges : ph_verdict_ignored

Une voiture de 1000 kg roule à 28 m/s. Elle doit s'arrêter sur 113 m. Quelle force de freinage, constante, faut-il ?
  [étapes 6 · end · remove] → F = 3469.02654867 N   (montré : (((m)×((v)^(2))))/(((2)×(d))), ≈ 5000)
  pièges : ph_verdict_ignored

Chaque seconde, 2,3 m³ d'eau tombent de 14 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 6 · end · remove] → P = 322000 W   (montré : (((((ρ)×(V))×(g))×(h)))×(t) ✗, ≈ 200000)
  pièges : ph_verdict_ignored

```

### Niveau 5

```
Des chiens de traîneau fournissent 300 W et tirent avec une force de 220 N. Quelle distance parcourent-ils en 4976 s ?
  [étapes 6 · end · remove] → d = 6785.45454545 m   (montré : (((P)×(t)))/(F), ≈ 8000)
  pièges : ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 12,5 A. Elle contient 1,9 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 20 K. Combien de temps faut-il, sans pertes ?
  [étapes 6 · end · remove] → t = 55.5130434783 s   (montré : ((((m)×(c))×(ΔT)))/(((U)×(I))), ≈ 80)
  pièges : ph_verdict_ignored

Un monte-charge électrique, branché sur 230 V, consomme 7,5 A. Il monte 280 kg de 7,5 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 6 · end · remove] → t = 12.1739130435 s   (montré : ((((m)×(g))×(h)))×(((U)×(I))) ✗, ≈ 4000000000 ✗)
  pièges : ph_verdict_ignored

```

## Problèmes : mécanique (`ph6-meca`, 11H)

_Les 6 étapes avec hauteurs, vitesses, forces et puissances._

### Niveau 1

```
Un ascenseur et ses passagers (1150 kg) montent de 8,5 m en 81 s. Quelle puissance moyenne le moteur doit-il fournir, au minimum ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → P = 1206.79012346 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un toboggan aquatique fait 6,9 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → v = 11.7473401245 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_not_simplified, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un cheval de trait fournit 250 W en tirant une charrue avec une force de 200 N. Combien de temps met-il pour labourer un sillon de 190 m ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 152 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 2

```
Une voiture de 1550 kg roule à 24 m/s. Elle freine avec une force constante de 11 500 N. Sur quelle distance s'arrête-t-elle ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → d = 38.8173913043 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un toboggan aquatique fait 6,4 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → v = 11.313708499 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_not_simplified, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

On construit une piste de luge pour que Lila (81 kg avec sa luge), partie sans vitesse, arrive en bas à 9,7 m/s. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → h = 4.7045 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 3

```
Inès monte un col à vélo : 57 kg avec le vélo, 1,3 km de dénivelé. Ses muscles transforment l'énergie de la nourriture en énergie mécanique avec un rendement de 0,22. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → E_f = 805.785123967 kcal
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Après un freinage, une voiture de 1,95 t a laissé des traces sur 196 m. Les freins exercent une force de 5000 N. À quelle vitesse roulait-elle ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → v = 31.703756956 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Chaque seconde, 0,5 m³ d'eau tombent de 49 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → P = 245000 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 4

```
Une pompe propulse 1280 L d'eau par seconde, qui sort du tuyau à 3,5 m/s. Quelle est la puissance de la pompe ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 7840 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Chiara (86 kg, avec sa luge) part sans vitesse du haut d'une pente. Le bas de la piste est 1,9 m plus bas que le départ. On néglige les frottements. À quelle vitesse la luge arrive-t-elle en bas ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → v = 6.16441400297 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Yanis (85 kg avec son vélo) mange un croissant de 430 kcal. Ses muscles en tirent de l'énergie mécanique avec un rendement de 0,24. De quel dénivelé ce croissant lui permet-il de monter ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → h = 507.501176471 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 5

```
On construit une piste de luge pour que Elio (78 kg avec sa luge), partie sans vitesse, arrive en bas à 21,6 km/h. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → h = 1.8 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_kmh_not_converted

Un cheval tire une charrue avec une force de 600 N le long d'un sillon de 500 m. Il met 870 s. Quelle puissance moyenne fournit-il ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 344.827586207 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une pompe propulse 1330 L d'eau par seconde, qui sort du tuyau à 11 m/s. Quelle est la puissance de la pompe ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 80465 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

## Problèmes : chaleur (`ph6-thermo`, 11H)

_Les 6 étapes avec chauffer, fondre, refroidir._

### Niveau 1

```
Sur Mars (g = 3,7 N/kg), on lâche sans vitesse une pomme de terre (c = 3500 J/(kg·K)). Toute son énergie à l'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu'elle se réchauffe de 85 K ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → h = 80405.4054054 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_not_simplified, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire réchauffe 1,3 kg d'eau (c = 4200 J/(kg·K)) de 40 K en 135 s, sans pertes. Quelle est sa puissance ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → P = 1617.77777778 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un cycliste (75 kg avec son vélo) descend un col de 1100 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 1 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → ΔT = 1833.33333333 K
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 2

```
Un réchaud de 800 W fait fondre 1,05 kg de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 433.125 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Tu lâches une pomme de terre (c = 3500 J/(kg·K)) du haut d'une falaise : elle tombe de 900 m. Toute son énergie à l'impact devient de la chaleur en elle, et on néglige l'air. De combien se réchauffe-t-elle ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → ΔT = 2.57142857143 K
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_not_simplified, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire de 1900 W contient 1,6 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 75 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 265.263157895 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 3

```
Un réchaud de 500 W chauffe de la glace à 0 °C (Lf = 330 000 J/kg) pendant 7,33 min, sans pertes. Quelle masse de glace fond ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → m = 0.666363636364 kg
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un chauffe-eau de 5,8 kW fonctionne pendant 6900 s, sans pertes. Quel volume d'eau (c = 4200 J/(kg·K)) peut-il réchauffer de 47 K ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → V = 0.20273556231 m^3
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un réchaud de 1700 W fait fondre 850 g de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → t = 165 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

```

### Niveau 4

```
Un réchaud de 500 W fait fondre 450 g de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 297 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

Un cycliste (95 kg avec son vélo) descend un col de 850 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 600 g en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → ΔT = 2990.74074074 K
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

Un réchaud de 1250 W fait fondre 1950 g de glace à 0 °C (Lf = 330 000 J/kg). Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 514.8 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

```

### Niveau 5

```
Un cycliste (120 kg avec son vélo) descend un col de 500 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 500 g en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → ΔT = 2666.66666667 K
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

Une bouilloire réchauffe 1800 g d'eau (c = 4200 J/(kg·K)) de 50 K en 4,95 min, sans pertes. Quelle est sa puissance ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 1272.72727273 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

Une bouilloire de 1400 W contient 1900 g d'eau (c = 4200 J/(kg·K)) à réchauffer de 25 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 142.5 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_gram_as_kg

```

## Problèmes : électricité (`ph6-elec`, 11H)

_Les 6 étapes avec batteries, bouilloires, moteurs._

### Niveau 1

```
Un ventilateur de chambre froide (12 V, 4,5 A) tourne pendant 27 090 s. Quelle énergie consomme-t-il ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → E = 1462752 J
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un monte-charge électrique, branché sur 230 V, consomme 29 A. Il monte 400 kg de 10,5 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 6.29685157421 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

La batterie d'un téléphone (3,7 V) contient une charge de 14 760 C. Le téléphone consomme en moyenne 2,4 W. Combien d'heures tient-il ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 6.32083333333 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 2

```
Une bouilloire branchée sur 230 V est traversée par un courant de 10,5 A. Elle contient 0,5 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 25 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 21.7391304348 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 11 A. Elle contient 0,5 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 50 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 41.5019762846 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 5 A. Elle contient 1,8 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 55 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · live · pick] → t = 361.565217391 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 3

```
Un monte-charge électrique, branché sur 230 V, consomme 17,5 A. Il monte 0,75 t de 16 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → t = 29.8136645963 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un treuil électrique branché sur 230 V doit monter 0,51 t de 7,5 m en 48 s. Quel courant consomme-t-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → I = 3.46467391304 A
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une batterie de téléphone (3,7 V, 3,1 Ah) se vide en 34 200 s. Quelle puissance moyenne le téléphone consomme-t-il ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · pick] → P = 1.20736842105 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 4

```
Une batterie de téléphone (3,7 V, 3,5 Ah) se vide en 48 600 s. Quelle puissance moyenne le téléphone consomme-t-il ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 0.959259259259 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 9 A. Elle contient 2 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 75 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 304.347826087 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une bouilloire branchée sur 230 V est traversée par un courant de 9 A. Elle contient 1,6 kg d'eau (c = 4200 J/(kg·K)) à réchauffer de 50 K. Combien de temps faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 162.31884058 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 5

```
La batterie d'un téléphone (3,7 V) contient une charge de 14 040 C. Le téléphone consomme en moyenne 2,9 W. Combien d'heures tient-il ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 4.97586206897 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un monte-charge électrique, branché sur 230 V, consomme 12,5 A. Il monte 80 kg de 13 m. Combien de temps lui faut-il, sans pertes ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 3.61739130435 s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une batterie de vélo électrique de 12 V stocke 600 000 J. Le moteur consomme un courant de 3 A. Pendant combien d'heures peut-on rouler ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 4.62962962963 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

## Problèmes ouverts (`ph6-ouvert`, 11H)

_Situations nouvelles, feuille de données avec des leurres._

### Niveau 1

```
On construit une piste de luge pour que Malik (52 kg avec sa luge), partie sans vitesse, arrive en bas à 54 km/h. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → h = 11.25 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_kmh_not_converted

La batterie d'un téléphone (3,7 V) contient une charge de 2,8 Ah. Le téléphone consomme en moyenne 3,3 W. Combien d'heures tient-il ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → t = 3.13939393939 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

On construit une piste de luge pour que Sara (77 kg avec sa luge), partie sans vitesse, arrive en bas à 10,8 m/s. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → h = 5.832 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 2

```
Une voiture de 1 t roule à 93,6 km/h. Elle freine avec une force constante de 4,5 kN. Sur quelle distance s'arrête-t-elle ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → d = 75.1111111111 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored, ph_kmh_not_converted

Un cycliste (100 kg avec son vélo) descend un col de 350 m de dénivelé à vitesse constante. Toute l'énergie part en chaleur dans ses freins en acier : 0,3 kg en tout (c = 450 J/(kg·K)). De combien les freins se réchaufferaient-ils, sans refroidir ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → ΔT = 2592.59259259 K
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

On construit une piste de luge pour que Yanis (82 kg avec sa luge), partie sans vitesse, arrive en bas à 10,4 m/s. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l'arrivée ?
  [étapes 1, 2, 3, 4, 5, 6 · live · remove] → h = 5.408 m
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 3

```
Une pompe propulse 1,79 m³ d'eau par seconde, qui sort du tuyau à 19,5 m/s. Quelle est la puissance de la pompe ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · remove] → P = 340323.75 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Une catapulte à ressort (raideur 1250 N/m) est comprimée de 0,12 m. Elle lance une balle de 0,47 kg. Toute l'énergie du ressort devient de l'énergie cinétique. À quelle vitesse part la balle ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · remove] → v = 6.18852747755 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un ventilateur de chambre froide (12 V, 3,5 A) tourne pendant 25 150 s. Quelle énergie consomme-t-il ?
  [étapes 1, 2, 3, 4, 5, 6 · leave · remove] → E = 1056468 J
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 4

```
La batterie d'un téléphone (3,7 V) contient une charge de 2,3 Ah. Le téléphone consomme en moyenne 3,7 W. Combien d'heures tient-il ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 2.3 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un ventilateur de chambre froide (48 V, 4,5 A) tourne pendant 4409 s. Quelle énergie consomme-t-il ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → E = 952344 J
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Un toboggan aquatique fait 6,4 m de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l'eau ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → v = 11.313708499 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_not_simplified, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

### Niveau 5

```
Une batterie de vélo électrique de 24 V stocke 700 000 J. Le moteur consomme un courant de 4 A. Pendant combien d'heures peut-on rouler ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → t = 2.02546296296 h
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Chaque seconde, 2100 L d'eau tombent de 22 m sur une turbine. Quelle puissance l'eau apporte-t-elle à la turbine ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → P = 462000 W
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

Sara (81 kg, avec sa luge) part sans vitesse du haut d'une pente. Le bas de la piste est 940 cm plus bas que le départ. On néglige les frottements. À quelle vitesse la luge arrive-t-elle en bas ?
  [étapes 1, 2, 3, 4, 5, 6 · end · remove] → v = 13.7113092008 m/s
  pièges : ph_decoy_formula, ph_not_si, ph_needed_removed, ph_bridge_missed, ph_numbers_in_algebra, ph_iso_flip, ph_forget_sqrt, ph_units_lie, ph_estimate_power10, ph_verdict_ignored

```

## Pièges de cette unité

- **Formule qui ne relie rien** (`ph_decoy_formula`, E) : E = m c ΔT gardée pour une luge au lieu de aucune température dans l'énoncé
- **Formule nécessaire retirée** (`ph_needed_removed`, E) : E = m g h retirée au lieu de c'est elle qui donne le pont E
- **Grandeur-pont pas reconnue** (`ph_bridge_missed`, E) : E notée comme donnée au lieu de E est le pont : personne ne la donne
- **Nombres dans l'étape d'algèbre** (`ph_numbers_in_algebra`, E) : h = 3500 · 80 / 1,6 au lieu de h = c ΔT/g
- **Lettre qui devait se simplifier** (`ph_not_simplified`, E) : h = m c ΔT/(m g) au lieu de h = c ΔT/g
- **Unités « vérifiées » sans les calculer** (`ph_units_lie`, E) : [v] = m/s ✓ pour v = 2 g h au lieu de [2 g h] = m²/s² ✗
- **Écart avec l'approximation ignoré** (`ph_verdict_ignored`, E) : approximation 2·10⁵, calcul 2·10³ : « cohérent » au lieu de facteur 100 : une des deux est fausse
