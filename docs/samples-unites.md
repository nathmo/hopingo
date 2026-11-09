# Exemples de questions — Grandeurs et unités

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Longueurs (`u-length`, 6H)

_km, m, dm, cm, mm._

### Niveau 1

```
82 cm = … dm
  → 8,2   pièges attendus : 820 [convert_wrong_direction]
  pièges : convert_wrong_direction

60 dm = … m
  → 6   pièges attendus : 600 [convert_wrong_direction]
  pièges : convert_wrong_direction

19 m = … km
  → 0,019   pièges attendus : 19000 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 2

```
4 cm = … dm
  → 0,4   pièges attendus : 40 [convert_wrong_direction]
  pièges : convert_wrong_direction

5 m = … dm
  → 50   pièges attendus : 1/2 [convert_wrong_direction]
  pièges : convert_wrong_direction

62 dm = … m
  → 6,2   pièges attendus : 620 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 3

```
4,9 cm = … mm
  → 49   pièges attendus : 49/100 [convert_wrong_direction]
  pièges : convert_wrong_direction

6,5 km = … cm
  → 650000

9 mm = … dm
  → 0,09   pièges attendus : 900 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 4

```
9 m = … dm
  → 90   pièges attendus : 9/10 [convert_wrong_direction]
  pièges : convert_wrong_direction

50 mm = … m
  → 0,05   pièges attendus : 50000 [convert_wrong_direction]
  pièges : convert_wrong_direction

9,24 km = … mm
  → 9240000

```

### Niveau 5

```
7,56 m = … dm
  → 75,6   pièges attendus : 189/250 [convert_wrong_direction]
  pièges : convert_wrong_direction

9,01 mm = … cm
  → 0,901   pièges attendus : 901/10 [convert_wrong_direction]
  pièges : convert_wrong_direction

75 m = … km
  → 0,075   pièges attendus : 75000 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

## Masses et capacités (`u-mass`, 6H)

_t, kg, g, mg ; L, dL, cL, mL._

### Niveau 1

```
63 kg = … t
  → 0,063   pièges attendus : 63000 [convert_wrong_direction]
  pièges : convert_wrong_direction

71 kg = … t
  → 0,071   pièges attendus : 71000 [convert_wrong_direction]
  pièges : convert_wrong_direction

6 dL = … L
  → 0,6   pièges attendus : 60 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 2

```
27 cL = … dL
  → 2,7   pièges attendus : 270 [convert_wrong_direction]
  pièges : convert_wrong_direction

94 mg = … g
  → 0,094   pièges attendus : 94000 [convert_wrong_direction]
  pièges : convert_wrong_direction

33 g = … kg
  → 0,033   pièges attendus : 33000 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 3

```
32 cL = … L
  → 0,32   pièges attendus : 3200 [convert_wrong_direction]
  pièges : convert_wrong_direction

3,1 t = … g
  → 3100000

87 L = … dL
  → 870   pièges attendus : 87/10 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 4

```
2,88 t = … g
  → 2880000

8,1 dL = … mL
  → 810   pièges attendus : 81/1000 [convert_wrong_direction]
  pièges : convert_wrong_direction

8,67 mg = … g
  → 0,00867   pièges attendus : 8670 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 5

```
3,4 mg = … g
  → 0,0034   pièges attendus : 3400 [convert_wrong_direction]
  pièges : convert_wrong_direction

62 L = … dL
  → 620   pièges attendus : 31/5 [convert_wrong_direction]
  pièges : convert_wrong_direction

6,8 mL = … dL
  → 0,068   pièges attendus : 680 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

## Durées (`u-time`, 7H)

_Une heure a 60 minutes, pas 100._

### Niveau 1

```
2 h = … min
  → 120   pièges attendus : 200 [time_decimal_minutes]
  pièges : time_decimal_minutes

4 h = … min
  → 240   pièges attendus : 400 [time_decimal_minutes]
  pièges : time_decimal_minutes

5 h = … min
  → 300   pièges attendus : 500 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

### Niveau 2

```
45 min = … h (en nombre décimal)
  → 0,75   pièges attendus : 9/20 [time_decimal_minutes]
  pièges : time_decimal_minutes

75 min = … h (en nombre décimal)
  → 1,25   pièges attendus : 23/20 [time_decimal_minutes], 3/4 [time_decimal_minutes]
  pièges : time_decimal_minutes

75 min = … h (en nombre décimal)
  → 1,25   pièges attendus : 23/20 [time_decimal_minutes], 3/4 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

### Niveau 3

```
1,2 h = … min
  → 72   pièges attendus : 80 [time_decimal_minutes], 120 [time_decimal_minutes]
  pièges : time_decimal_minutes

1,5 h = … min
  → 90   pièges attendus : 110 [time_decimal_minutes], 150 [time_decimal_minutes]
  pièges : time_decimal_minutes

0,75 h = … min
  → 45   pièges attendus : 75 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

### Niveau 4

```
3600 s = … min
  → 60   pièges attendus : 36 [time_decimal_minutes]
  pièges : time_decimal_minutes

210 s = … min
  → 3,5   pièges attendus : 21/10 [time_decimal_minutes]
  pièges : time_decimal_minutes

210 s = … min
  → 3,5   pièges attendus : 21/10 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

### Niveau 5

```
Un trajet dure 1 h 30 min, puis on fait une pause de 35 min. Durée totale, en minutes ?
  → 125   pièges attendus : 165 [time_decimal_minutes]
  pièges : time_decimal_minutes

Un trajet dure 1 h 15 min, puis on fait une pause de 40 min. Durée totale, en minutes ?
  → 115   pièges attendus : 155 [time_decimal_minutes]
  pièges : time_decimal_minutes

Un trajet dure 1 h 45 min, puis on fait une pause de 40 min. Durée totale, en minutes ?
  → 145   pièges attendus : 185 [time_decimal_minutes]
  pièges : time_decimal_minutes

```

## Aires (`u-area`, 8H)

_Facteur 100 entre unités voisines._

### Niveau 1

```
14 cm² = … dm²
  → 0,14   pièges attendus : 1400 [convert_wrong_direction], 7/5 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

68 dm² = … m²
  → 0,68   pièges attendus : 6800 [convert_wrong_direction], 34/5 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

53 cm² = … mm²
  → 5300   pièges attendus : 53/100 [convert_wrong_direction], 530 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

```

### Niveau 2

```
18 mm² = … cm²
  → 0,18   pièges attendus : 1800 [convert_wrong_direction], 9/5 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

65 m² = … dm²
  → 6500   pièges attendus : 13/20 [convert_wrong_direction], 650 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

82 dm² = … cm²
  → 8200   pièges attendus : 41/50 [convert_wrong_direction], 820 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

```

### Niveau 3

```
5,95 a = … m²
  → 595

64 mm² = … cm²
  → 0,64   pièges attendus : 6400 [convert_wrong_direction], 32/5 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

19 dm² = … cm²
  → 1900   pièges attendus : 19/100 [convert_wrong_direction], 190 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

```

### Niveau 4

```
37 km² = … ha
  → 3700   pièges attendus : 37/100 [convert_wrong_direction]
  pièges : convert_wrong_direction

27 cm² = … dm²
  → 0,27   pièges attendus : 2700 [convert_wrong_direction], 27/10 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

4,11 dm² = … mm²
  → 41100   pièges attendus : 411 [area_factor_10]
  pièges : area_factor_10

```

### Niveau 5

```
3,34 ha = … m²
  → 33400

66 m² = … dm²
  → 6600   pièges attendus : 33/50 [convert_wrong_direction], 660 [area_factor_10]
  pièges : convert_wrong_direction, area_factor_10

3,07 km² = … a
  → 30700

```

## Volumes (`u-volume`, 9H)

_Facteur 1 000 ; 1 dm³ = 1 L._

### Niveau 1

```
63 cm³ = … dm³
  → 0,063   pièges attendus : 63000 [convert_wrong_direction], 63/10 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

75 dm³ = … m³
  → 0,075   pièges attendus : 75000 [convert_wrong_direction], 15/2 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

9 dm³ = … m³
  → 0,009   pièges attendus : 9000 [convert_wrong_direction], 9/10 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

```

### Niveau 2

```
83 cm³ = … dm³
  → 0,083   pièges attendus : 83000 [convert_wrong_direction], 83/10 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

91 cm³ = … dm³
  → 0,091   pièges attendus : 91000 [convert_wrong_direction], 91/10 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

21 dm³ = … cm³
  → 21000   pièges attendus : 21/1000 [convert_wrong_direction], 210 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

```

### Niveau 3

```
0,6 dL = … cL
  → 6   pièges attendus : 3/50 [convert_wrong_direction]
  pièges : convert_wrong_direction

25 m³ = … dm³
  → 25000   pièges attendus : 1/40 [convert_wrong_direction], 250 [volume_factor_10]
  pièges : convert_wrong_direction, volume_factor_10

19 L = … hL
  → 0,19   pièges attendus : 1900 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 4

```
2,91 m³ = … hL
  → 29,1   pièges attendus : 291/1000 [convert_wrong_direction]
  pièges : convert_wrong_direction

94 dL = … L
  → 9,4   pièges attendus : 940 [convert_wrong_direction]
  pièges : convert_wrong_direction

7,86 dm³ = … hL
  → 0,0786   pièges attendus : 786 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 5

```
8 dm³ = … dL
  → 80   pièges attendus : 4/5 [convert_wrong_direction]
  pièges : convert_wrong_direction

1,49 cm³ = … cL
  → 0,149   pièges attendus : 149/10 [convert_wrong_direction]
  pièges : convert_wrong_direction

4,6 L = … dL
  → 46   pièges attendus : 23/50 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

## Vitesses (`u-speed`, 10H)

_km/h ↔ m/s : ÷ 3,6 ou × 3,6._

### Niveau 1

```
108 km/h = … m/s
  → 30   pièges attendus : 1944/5 [speed_factor_wrong_way], 108000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

18 km/h = … m/s
  → 5   pièges attendus : 324/5 [speed_factor_wrong_way], 18000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

108 km/h = … m/s
  → 30   pièges attendus : 1944/5 [speed_factor_wrong_way], 108000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

```

### Niveau 2

```
10 m/s = … km/h
  → 36

15 m/s = … km/h
  → 54

30 m/s = … km/h
  → 108

```

### Niveau 3

```
144 km/h = … m/s
  → 40   pièges attendus : 2592/5 [speed_factor_wrong_way], 144000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

54 km/h = … m/s
  → 15   pièges attendus : 972/5 [speed_factor_wrong_way], 54000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

90 km/h = … m/s
  → 25   pièges attendus : 324 [speed_factor_wrong_way], 90000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

```

### Niveau 4

```
40 m/s = … km/h
  → 144

20 m/s = … km/h
  → 72

5 m/s = … km/h
  → 18

```

### Niveau 5

```
90 km/h = … m/s
  → 25   pièges attendus : 324 [speed_factor_wrong_way], 90000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

72 km/h = … m/s
  → 20   pièges attendus : 1296/5 [speed_factor_wrong_way], 72000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

72 km/h = … m/s
  → 20   pièges attendus : 1296/5 [speed_factor_wrong_way], 72000 [convert_wrong_direction]
  pièges : speed_factor_wrong_way, convert_wrong_direction

```

## Pieds et pouces (`u-imperial`, 10H)

_Le facteur se met au carré ou au cube._

### Niveau 1

```
Un écran mesure 32 pouces de diagonale (1 pouce = 2,54 cm). Combien en cm ? (arrondi au dixième)
  → 81,3
  pièges : convert_wrong_direction

Un écran mesure 55 pouces de diagonale (1 pouce = 2,54 cm). Combien en cm ? (arrondi au dixième)
  → 139,7
  pièges : convert_wrong_direction

Un écran mesure 12 pouces de diagonale (1 pouce = 2,54 cm). Combien en cm ? (arrondi au dixième)
  → 30,5
  pièges : convert_wrong_direction

```

### Niveau 2

```
Une chambre mesure 14 pieds sur 12 pieds (1 pied = 30,48 cm). Quelle est son aire en m² ? (arrondi au dixième)
  → 15,6
  pièges : imperial_linear_factor, convert_wrong_direction

Une chambre mesure 16 pieds sur 13 pieds (1 pied = 30,48 cm). Quelle est son aire en m² ? (arrondi au dixième)
  → 19,3
  pièges : imperial_linear_factor, convert_wrong_direction

Une chambre mesure 12 pieds sur 8 pieds (1 pied = 30,48 cm). Quelle est son aire en m² ? (arrondi au dixième)
  → 8,9
  pièges : imperial_linear_factor, convert_wrong_direction

```

### Niveau 3

```
Un réfrigérateur a un volume de 10 pieds³ (1 pied = 30,48 cm). Combien de litres ? (arrondi à l'unité)
  → 283
  pièges : imperial_linear_factor

Un réfrigérateur a un volume de 2 pieds³ (1 pied = 30,48 cm). Combien de litres ? (arrondi à l'unité)
  → 57
  pièges : imperial_linear_factor

Un réfrigérateur a un volume de 5 pieds³ (1 pied = 30,48 cm). Combien de litres ? (arrondi à l'unité)
  → 142
  pièges : imperial_linear_factor

```

### Niveau 4

```
Un appartement fait 25 m². Combien de pieds² (1 pied = 30,48 cm) ? (arrondi à l'unité)
  → 269
  pièges : imperial_linear_factor, convert_wrong_direction

Un appartement fait 50 m². Combien de pieds² (1 pied = 30,48 cm) ? (arrondi à l'unité)
  → 538
  pièges : imperial_linear_factor, convert_wrong_direction

Un appartement fait 25 m². Combien de pieds² (1 pied = 30,48 cm) ? (arrondi à l'unité)
  → 269
  pièges : imperial_linear_factor, convert_wrong_direction

```

### Niveau 5

```
Un aquarium mesure 30 × 15 × 16 pouces (1 pouce = 2,54 cm). Combien de litres contient-il ? (arrondi à l'unité)
  → 118
  pièges : imperial_linear_factor, convert_wrong_direction

Un aquarium mesure 36 × 15 × 18 pouces (1 pouce = 2,54 cm). Combien de litres contient-il ? (arrondi à l'unité)
  → 159
  pièges : imperial_linear_factor, convert_wrong_direction

Un aquarium mesure 36 × 15 × 18 pouces (1 pouce = 2,54 cm). Combien de litres contient-il ? (arrondi à l'unité)
  → 159
  pièges : imperial_linear_factor, convert_wrong_direction

```

## Notation scientifique et unités (`u-sci`, 11H)

_Changer d'unité en jouant sur l'exposant._

### Niveau 1

```
La Terre est à 1,5 × 10⁸ km du Soleil. En mètres : 1,5 × 10^? m
  → 11   pièges attendus : 5 [convert_wrong_direction]
  pièges : convert_wrong_direction

La Terre est à 1,5 × 10⁸ km du Soleil. En mètres : 1,5 × 10^? m
  → 11   pièges attendus : 5 [convert_wrong_direction]
  pièges : convert_wrong_direction

La lumière va à 3 × 10⁸ m/s. En km/s : 3 × 10^? km/s
  → 5   pièges attendus : 11 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 2

```
Un virus mesure 1 × 10⁻⁷ m. En mm : 1 × 10^? mm
  → -4   pièges attendus : -10 [convert_wrong_direction]
  pièges : convert_wrong_direction

La lumière va à 3 × 10⁸ m/s. En km/s : 3 × 10^? km/s
  → 5   pièges attendus : 11 [convert_wrong_direction]
  pièges : convert_wrong_direction

Un grain de sable pèse 4 × 10⁻⁵ kg. En g : 4 × 10^? g
  → -2   pièges attendus : -8 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 3

```
Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm
  → 1   pièges attendus : -11 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm
  → 1   pièges attendus : -11 [convert_wrong_direction]
  pièges : convert_wrong_direction

La lumière va à 3 × 10⁸ m/s. En km/s : 3 × 10^? km/s
  → 5   pièges attendus : 11 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 4

```
Une piscine contient 2,5 × 10³ m³. En litres : 2,5 × 10^? L
  → 6   pièges attendus : 0 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm
  → 1   pièges attendus : -11 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une piscine contient 2,5 × 10³ m³. En litres : 2,5 × 10^? L
  → 6   pièges attendus : 0 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

### Niveau 5

```
Une piscine contient 2,5 × 10³ m³. En litres : 2,5 × 10^? L
  → 6   pièges attendus : 0 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm
  → 1   pièges attendus : -11 [convert_wrong_direction]
  pièges : convert_wrong_direction

Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm
  → 1   pièges attendus : -11 [convert_wrong_direction]
  pièges : convert_wrong_direction

```

## Pièges de cette unité

- **Convertir dans le mauvais sens** (`convert_wrong_direction`, E) : 3 km = 0,003 m au lieu de 3 km = 3 000 m
- **Heures décimales lues comme des minutes** (`time_decimal_minutes`, E) : 1,5 h = 1 h 50 min au lieu de 1,5 h = 1 h 30 min
- **Facteur 10 pour les aires** (`area_factor_10`, E) : 1 m² = 100 cm² au lieu de 1 m² = 10 000 cm²
- **Facteur 10 pour les volumes** (`volume_factor_10`, E) : 1 m³ = 10 dm³ au lieu de 1 m³ = 1 000 dm³ = 1 000 L
- **× 3,6 au lieu de ÷ 3,6** (`speed_factor_wrong_way`, E) : 90 km/h = 324 m/s au lieu de 90 km/h = 25 m/s
- **Facteur de longueur pour une aire ou un volume** (`imperial_linear_factor`, E) : 1 pied² = 30,48 cm² au lieu de 1 pied² = 30,48² cm² ≈ 929 cm²
