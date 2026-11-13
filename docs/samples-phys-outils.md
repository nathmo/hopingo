# Exemples de questions — Outils du physicien

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Les données en unités SI (`ph-si`, 10H)

_Chaque donnée : symbole = valeur + unité, en kg, m, s._

### Niveau 1

```
Écris cette donnée en unité SI. t = 20 min
  → 1200
  pièges : ph_not_si, convert_wrong_direction, time_decimal_minutes

Écris cette donnée en unité SI. t = 5 min
  → 300
  pièges : ph_not_si, convert_wrong_direction, time_decimal_minutes

Écris cette donnée en unité SI. d = 75 cm
  → 0,75
  pièges : ph_not_si, convert_wrong_direction

```

### Niveau 2

```
Écris cette donnée en unité SI. E = 2,5 kJ
  → 2500
  pièges : ph_not_si, convert_wrong_direction

Écris cette donnée en unité SI. m = 35 g
  → 0,035
  pièges : ph_gram_as_kg, convert_wrong_direction

Écris cette donnée en unité SI. P = 15 kW
  → 15000
  pièges : ph_not_si, convert_wrong_direction

```

### Niveau 3

```
Écris cette donnée en unité SI. V = 12 L
  → 0,012
  pièges : ph_not_si, convert_wrong_direction, volume_factor_10

Écris cette donnée en unité SI. V = 250 L
  → 0,25
  pièges : ph_not_si, convert_wrong_direction, volume_factor_10

Écris cette donnée en unité SI. E = 180 kJ
  → 180000
  pièges : ph_not_si, convert_wrong_direction

```

### Niveau 4

```
Écris cette donnée en unité SI. ΔT = 35 °C
  → 35
  pièges : ph_deltaT_add_273

Écris cette donnée en unité SI. ΔT = 15 °C
  → 15
  pièges : ph_deltaT_add_273

Écris cette donnée en unité SI. V = 2,5 L
  → 0,0025
  pièges : ph_not_si, convert_wrong_direction, volume_factor_10

```

### Niveau 5

```
Écris cette donnée en unité SI. V = 800 cm³
  → 8×10^-4
  pièges : volume_factor_10, ph_not_si

Écris cette donnée en unité SI. E = 2,5 Wh
  → 9000
  pièges : ph_wh_forget_3600

Pour appliquer Ec=1/2mv^2, on dispose de : m = 450 g ; v = 36 km/h ; h = 3 m. Quelle donnée ne sert à rien ?
  · m = 450 g   ✔ h = 3 m   · v = 36 km/h

```

## Conversions en chaîne (`ph-conv-chain`, 10H)

_Multiplier par des fractions qui valent 1, et voir les unités se simplifier._

### Niveau 1

```
Convertis en multipliant par des fractions qui valent 1. 12 Wh = … J
  → 43200
  pièges : convert_wrong_direction, ph_wh_forget_3600

Convertis en multipliant par des fractions qui valent 1. 500 Wh = … J
  → 1,8×10^6
  pièges : convert_wrong_direction, ph_wh_forget_3600

Convertis en multipliant par des fractions qui valent 1. 18 km/h = … m/s
  → 5
  pièges : convert_wrong_direction, ph_kmh_not_converted, ph_chain_half

```

### Niveau 2

```
Convertis en multipliant par des fractions qui valent 1. 12 Wh = … J
  → 43200
  pièges : convert_wrong_direction, ph_wh_forget_3600

Convertis en multipliant par des fractions qui valent 1. 5 400 000 J = … kWh
  → 1,5
  pièges : convert_wrong_direction, ph_wh_forget_3600

Convertis en multipliant par des fractions qui valent 1. 108 km/h = … m/s
  → 30
  pièges : convert_wrong_direction, ph_kmh_not_converted, ph_chain_half

```

### Niveau 3

```
Convertis en multipliant par des fractions qui valent 1. 1,2 MW = … J/h
  → 4,32×10^9
  pièges : convert_wrong_direction, ph_chain_half

Convertis en multipliant par des fractions qui valent 1. 1,5 m³/min = … L/s
  → 25
  pièges : convert_wrong_direction, ph_chain_half

Convertis en multipliant par des fractions qui valent 1. 12 W = … J/min
  → 720
  pièges : convert_wrong_direction

```

### Niveau 4

```
Un appareil de 10 W fonctionne pendant 4 h. Quelle énergie consomme-t-il, en kWh ?
  → 0,04
  pièges : convert_wrong_direction, ph_wh_forget_3600

Convertis en multipliant par des fractions qui valent 1. 2500 mm² = … m²
  → 0,0025
  pièges : convert_wrong_direction, area_factor_10

Convertis en multipliant par des fractions qui valent 1. 100 cm³ = … m³
  → 1×10^-4
  pièges : convert_wrong_direction, volume_factor_10

```

### Niveau 5

```
3000 kcal par jour = … W (1 kcal = 4180 J)
  → 145
  pièges : ph_chain_half, ph_not_si

12 livres = … kg (1 livre = 0,4536 kg)
  → 5,44
  pièges : convert_wrong_direction

5 miles = … m (1 mile = 1609 m)
  → 8050
  pièges : convert_wrong_direction

```

## Unités de base (`ph-base-units`, 10H)

_Écrire J, W, N en kg, m, s, et simplifier des unités._

### Niveau 1

```
Comment s'écrit 1 N en unités de base ?
  · kg/(m·s²)   · kg·m²/s² [ph_unit_power_lost]   · kg·m/s [ph_unit_power_lost]   ✔ kg·m/s²
  pièges : ph_unit_power_lost

Comment s'écrit 1 N en unités de base ?
  · kg·m²/s² [ph_unit_power_lost]   ✔ kg·m/s²   · kg/(m·s²)   · kg·m/s [ph_unit_power_lost]
  pièges : ph_unit_power_lost

Comment s'écrit 1 J en unités de base ?
  · kg·m/s   ✔ kg·m²/s²   · kg·m²/s³ [ph_watt_is_joule]   · kg/(m·s²)
  pièges : ph_watt_is_joule

```

### Niveau 2

```
Écris 1 W en unités de base (kg, m, s, K, A).
  → kg·m^2/s^3
  pièges : ph_watt_is_joule, ph_unit_power_lost

Écris 1 J en unités de base (kg, m, s, K, A).
  → kg·m^2/s^2
  pièges : ph_unit_power_lost, ph_watt_is_joule

Écris 1 N en unités de base (kg, m, s, K, A).
  → kg·m/s^2
  pièges : ph_unit_power_lost

```

### Niveau 3

```
Simplifie cette unité : C·V/s = ?
  · A   · Pa   ✔ W   · J [ph_watt_is_joule]
  pièges : ph_watt_is_joule

Simplifie cette unité : J/C = ?
  · Pa   ✔ V   · A   · s

Simplifie cette unité : J/s = ?
  · J [ph_watt_is_joule]   · N   ✔ W   · Pa
  pièges : ph_watt_is_joule

```

### Niveau 4

```
Écris 1 W·s en unités de base (kg, m, s, K, A).
  → kg·m^2/s^2
  pièges : ph_watt_is_joule

Écris 1 W·s en unités de base (kg, m, s, K, A).
  → kg·m^2/s^2
  pièges : ph_watt_is_joule

Écris 1 J/kg en unités de base (kg, m, s, K, A).
  → m^2/s^2
  pièges : ph_unit_power_lost

```

### Niveau 5

```
Écris 1 V en unités de base (kg, m, s, K, A).
  → kg·m^2/(s^3·A)
  pièges : ph_watt_is_joule

Écris 1 V en unités de base (kg, m, s, K, A).
  → kg·m^2/(s^3·A)
  pièges : ph_watt_is_joule

Écris 1 J/C en unités de base (kg, m, s, K, A).
  → kg·m^2/(s^3·A)
  pièges : ph_watt_is_joule

```

## Vérifier par les unités (`ph-dimcheck`, 10H)

_Une formule fausse se trahit par ses unités : la formule cassée._

### Niveau 1

```
Par les unités seulement, sans calculer : laquelle de ces formules peut donner ρ ?
  · ρ=V/m [ph_density_inverted]   · ρ=mV [ph_dim_not_checked]   ✔ ρ=m/V
  pièges : ph_density_inverted, ph_dim_not_checked

Par les unités seulement, sans calculer : laquelle de ces formules peut donner m ?
  · m=cΔT/E [ph_iso_flip]   · m=E/c [ph_dim_not_checked]   · m=EcΔT [iso_wrong_inverse]   ✔ m=E/cΔT
  pièges : iso_wrong_inverse, ph_iso_flip, ph_dim_not_checked

Par les unités seulement, sans calculer : laquelle de ces formules peut donner Ep ?
  ✔ Ep=mgh   · Ep=mh [ph_dim_not_checked]   · Ep=mg [ph_dim_not_checked]   · Ep=mg/h [ph_dim_not_checked]
  pièges : ph_dim_not_checked

```

### Niveau 2

```
Remplace chaque lettre par son unité et simplifie. Quelle unité donne mgh/P ?
  ✔ s   · K [ph_units_lie]   · m/s [ph_units_lie]   · m [ph_units_lie]
  pièges : ph_units_lie

Remplace chaque lettre par son unité et simplifie. Quelle unité donne Et ?
  ✔ kg·m²/s   · s [ph_units_lie]   · m [ph_units_lie]   · 1/s [ph_units_lie]
  pièges : ph_units_lie

Remplace chaque lettre par son unité et simplifie. Quelle unité donne E/mc ?
  · m/s² [ph_units_lie]   ✔ K   · 1/kg [ph_units_lie]   · kg²·m⁴/s⁵ [ph_units_lie]
  pièges : ph_units_lie

```

### Niveau 3

```
Quelle est l'unité de mgh ? Écris-la en unités de base (kg, m, s, K, A).
  → kg·m^2/s^2

Quelle est l'unité de E/mg ? Écris-la en unités de base (kg, m, s, K, A).
  → m

Quelle est l'unité de vt ? Écris-la en unités de base (kg, m, s, K, A).
  → m

```

### Niveau 4

```
Un seul de ces résultats d'élèves peut être juste. Décide par les unités : lequel ?
  · F=d/E [ph_iso_flip]   · F=Ed [iso_wrong_inverse]   ✔ F=E/d
  pièges : iso_wrong_inverse, ph_iso_flip

Un seul de ces résultats d'élèves peut être juste. Décide par les unités : lequel ?
  ✔ h=v^2/2g   · h=v/2g [ph_dim_not_checked]   · h=2g/v^2 [ph_iso_flip]
  pièges : ph_dim_not_checked, ph_iso_flip

Un seul de ces résultats d'élèves peut être juste. Décide par les unités : lequel ?
  ✔ v=√(2Ec/m   · v=2Ec/m [ph_forget_sqrt]   · v=√(2m/Ec [ph_iso_flip]
  pièges : ph_forget_sqrt, ph_iso_flip

```

### Niveau 5

```
Quelle est l'unité de E/UI ? Écris-la en unités de base (kg, m, s, K, A).
  → s

Quelle est l'unité de v/2g ? Écris-la en unités de base (kg, m, s, K, A).
  → s
  pièges : ph_units_lie

Quelle est l'unité de mghP ? Écris-la en unités de base (kg, m, s, K, A).
  → kg^2·m^4/s^5
  pièges : ph_units_lie

```

## De l'unité à la formule (`ph-unit-formula`, 10H)

_L'usine à formules : « joules par seconde » donne P = E/t._

### Niveau 1

```
Une grandeur se mesure en newtons fois mètres. Quelle formule la donne ?
  · E=F/d [ph_dim_not_checked]   ✔ E=Fd   · E=d/F [ph_dim_not_checked]
  pièges : ph_dim_not_checked

Une grandeur se mesure en volts fois ampères. Quelle formule la donne ?
  ✔ P=UI   · P=I/U [ph_dim_not_checked]   · P=U/I [ph_elec_divide]
  pièges : ph_elec_divide, ph_dim_not_checked

Une grandeur se mesure en joules par kilogramme. Quelle formule la donne ?
  · Lf=Em [ph_dim_not_checked]   ✔ Lf=E/m   · Lf=m/E [ph_per_inverted]
  pièges : ph_per_inverted, ph_dim_not_checked

```

### Niveau 2

```
Quelle grandeur se mesure en N/kg ?
  ✔ l'intensité de la pesanteur   · la température   · la masse volumique   · la force

Quelle grandeur se mesure en V·A ?
  ✔ la puissance   · l'intensité de la pesanteur   · la température   · l'énergie

Quelle grandeur se mesure en m/s ?
  ✔ la vitesse   · la chaleur latente   · l'énergie   · la durée

```

### Niveau 3

```
Un boulanger compte en « kilogrammes de pain par boulanger et par jour ». Avec la masse de pain m, le nombre de boulangers N et la durée t, quelle formule donne cette grandeur r ?
  · r=mN/t [ph_per_and_numerator]   ✔ r=m/Nt   · r=Nt/m [ph_per_inverted]   · r=mt/N [ph_per_and_numerator]
  pièges : ph_per_and_numerator, ph_per_inverted

Une ville grandit de tant de « personnes par année ». Avec le nombre de personnes N et la durée t, quelle formule donne cette grandeur r ?
  · r=t/N [ph_per_inverted]   ✔ r=N/t   · r=Nt [ph_dim_not_checked]
  pièges : ph_per_inverted, ph_dim_not_checked

Une grandeur se mesure en « joules par kilogramme et par kelvin ». Avec l'énergie E, la masse m et l'écart de température ΔT, quelle formule donne cette grandeur r ?
  · r=EΔT/m [ph_per_and_numerator]   ✔ r=E/mΔT   · r=Em/ΔT [ph_per_and_numerator]   · r=mΔT/E [ph_per_inverted]
  pièges : ph_per_and_numerator, ph_per_inverted

```

### Niveau 4

```
Une grandeur se mesure en « joules par kilogramme et par kelvin ». Avec l'énergie E, la masse m et l'écart de température ΔT, quelle formule donne cette grandeur r ? Écris la formule.
  → r = E/(m ΔT)
  pièges : ph_per_and_numerator, ph_per_inverted

Une ville grandit de tant de « personnes par année ». Avec le nombre de personnes N et la durée t, quelle formule donne cette grandeur r ? Écris la formule.
  → r = N/t
  pièges : ph_per_inverted, ph_dim_not_checked

Une pompe débite des « litres par seconde ». Avec le volume V et la durée t, quelle formule donne cette grandeur r ? Écris la formule.
  → r = V/t
  pièges : ph_per_inverted, ph_dim_not_checked

```

### Niveau 5

```
Un troupeau de 20 moutons broute 20 m² d'herbe par mouton et par jour. Combien de jours lui faut-il pour brouter un pré de 1,5 ha (1 ha = 10 000 m²) ?
  → 37,5
  pièges : ph_not_si, area_factor_10, iso_wrong_inverse

Un troupeau de 40 moutons broute 20 m² d'herbe par mouton et par jour. Combien de jours lui faut-il pour brouter un pré de 2,4 ha (1 ha = 10 000 m²) ?
  → 30
  pièges : ph_not_si, area_factor_10, iso_wrong_inverse

Un troupeau de 20 moutons broute 20 m² d'herbe par mouton et par jour. Combien de jours lui faut-il pour brouter un pré de 2,4 ha (1 ha = 10 000 m²) ?
  → 60
  pièges : ph_not_si, area_factor_10, iso_wrong_inverse

```

## Isoler dans une formule de physique (`ph-isolate`, 11H)

_De <span class="m"><i class="m-var">E</i><sub class="m-sub">c</sub><span class="m-op">=</span><span class="m-frac"><span class="m-n"><span>1</span></span><span class="m-d"><span>2</span></span></span><span class="m-thin"></span><i class="m-var">m</i><span class="m-thin"></span><i class="m-var">v</i><sup class="m-sup"><span>2</span></sup></span> à v, que des lettres._

### Niveau 1

```
Isole F dans E=Fd.
  → F = E/d
  pièges : ph_iso_flip, iso_wrong_inverse

Isole v dans P=Fv.
  → v = P/F
  pièges : ph_iso_flip, iso_wrong_inverse

Isole v dans P=Fv.
  → v = P/F
  pièges : ph_iso_flip, iso_wrong_inverse

```

### Niveau 2

```
Isole Ef dans η=Eu/Ef.
  → E_f = E_u/η
  pièges : ph_efficiency_inverted, ph_iso_flip

Isole Ef dans η=Eu/Ef.
  → E_f = E_u/η
  pièges : ph_efficiency_inverted, ph_iso_flip

Isole Eu dans η=Eu/Ef.
  → E_u = η E_f
  pièges : ph_efficiency_inverted, iso_wrong_inverse

```

### Niveau 3

```
Isole I dans E=UIt.
  → I = E/(U t)
  pièges : ph_iso_flip, iso_wrong_inverse

Isole t dans E=UIt.
  → t = E/(U I)
  pièges : ph_iso_flip, iso_wrong_inverse

Isole c dans E=mcΔT.
  → c = E/(m ΔT)
  pièges : ph_iso_flip, iso_wrong_inverse, ph_heat_forget_mass

```

### Niveau 4

```
Isole v dans Ec=1/2mv^2.
  → v = √(2 E_c/m)
  pièges : ph_forget_sqrt, ph_half_inverted, ph_iso_flip

Isole v dans Ec=1/2mv^2.
  → v = √(2 E_c/m)
  pièges : ph_forget_sqrt, ph_half_inverted, ph_iso_flip

Isole h dans V=Ah.
  → h = V/A
  pièges : ph_iso_flip, iso_wrong_inverse

```

### Niveau 5

```
On sait que P=E/t et que E=mgh. Exprime t en fonction de m, g, h, P. Aucun nombre : seulement des lettres.
  → t = m g h/P
  pièges : ph_iso_flip, iso_wrong_inverse

On sait que P=E/t et que E=mgh. Exprime t en fonction de m, g, h, P. Aucun nombre : seulement des lettres.
  → t = m g h/P
  pièges : ph_iso_flip, iso_wrong_inverse

On sait que E=UIt et que E=mcΔT. Exprime t en fonction de m, c, ΔT, U, I. Aucun nombre : seulement des lettres.
  → t = m c ΔT/(U I)
  pièges : ph_iso_flip, iso_wrong_inverse

```

## Ordre de grandeur (`ph-estimate`, 10H)

_Arrondir brutalement, calculer de tête, un chiffre significatif._

### Niveau 1

```
Sans calculatrice : 810 × 740 ≈ ?
  · 6·10⁶ [ph_estimate_power10]   ✔ 6·10⁵   · 6·10⁷ [ph_estimate_power10]   · 6·10⁴ [ph_estimate_power10]
  pièges : ph_estimate_power10

Sans calculatrice : 610 × 30 ≈ ?
  · 2000 [ph_estimate_power10]   ✔ 2·10⁴   · 200 [ph_estimate_power10]   · 2·10⁶ [ph_estimate_power10]
  pièges : ph_estimate_power10

Sans calculatrice : 700 × 6000 ≈ ?
  ✔ 4·10⁶   · 4·10⁷ [ph_estimate_power10]   · 4·10⁵ [ph_estimate_power10]   · 4·10⁸ [ph_estimate_power10]
  pièges : ph_estimate_power10

```

### Niveau 2

```
Quelle valeur est plausible pour la puissance d'une ampoule LED ?
  · 8·10⁻³ W [ph_estimate_power10]   · 8000 W [ph_estimate_power10]   ✔ 8 W   · 0,8 W [ph_estimate_power10]
  pièges : ph_estimate_power10

Quelle valeur est plausible pour la puissance d'une bouilloire ?
  · 2·10⁶ W [ph_estimate_power10]   ✔ 2000 W   · 2 W [ph_estimate_power10]   · 2·10⁴ W [ph_estimate_power10]
  pièges : ph_estimate_power10

Quelle valeur est plausible pour l'énergie pour chauffer un litre d'eau de 20 à 100 °C ?
  · 3·10⁷ J [ph_estimate_power10]   ✔ 3·10⁵ J   · 3000 J [ph_estimate_power10]   · 300 J [ph_estimate_power10]
  pièges : ph_estimate_power10

```

### Niveau 3

```
Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif. 220 × 3,5 ≈ …
  → 800
  pièges : ph_estimate_power10

Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif. 330 × 0,5 × 65 ≈ …
  → 1×10^4
  pièges : ph_estimate_power10

Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif. 2000 × 0,8 × 20 ≈ …
  → 3×10^4
  pièges : ph_estimate_power10

```

### Niveau 4

```
Sans calculatrice : on chauffe 750 mL d'eau de 71 K (c = 4200 J/(kg·K)). Il faut environ combien de joules ? Un seul chiffre significatif.
  → 2×10^5
  pièges : ph_gram_as_kg, ph_estimate_power10

Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif. 4200 × 2 × 58 ≈ …
  → 5×10^5
  pièges : ph_estimate_power10

Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif. 460 000 ÷ 2500 ≈ …
  → 200
  pièges : ph_estimate_power10

```

### Niveau 5

```
Un élève calcule l'énergie potentielle d'un sac de 450 g monté de 2,5 m. Il trouve 11 300 J, mais ton approximation donne environ 10 J. Quelle erreur a-t-il probablement faite ?
  ✔ Il a laissé les grammes au lieu des kilogrammes.   · Il a laissé la vitesse en km/h.   · Il a laissé des heures au lieu de secondes.   · Il a laissé les centimètres au lieu des mètres.

Un élève calcule l'énergie d'un radiateur de 500 W qui fonctionne 2 h, en joules. Il trouve 1000 J, mais ton approximation donne environ 4·10⁶ J. Quelle erreur a-t-il probablement faite ?
  · Il a laissé la vitesse en km/h.   ✔ Il a laissé des heures au lieu de secondes.   · Il a laissé les minutes au lieu de les convertir en secondes.   · Il a laissé les centimètres au lieu des mètres.

Un élève calcule l'énergie potentielle d'un carton de 25 kg monté de 90 cm. Il trouve 22 500 J, mais ton approximation donne environ 200 J. Quelle erreur a-t-il probablement faite ?
  ✔ Il a laissé les centimètres au lieu des mètres.   · Il a oublié le ½ de l'énergie cinétique.   · Il a laissé les grammes au lieu des kilogrammes.   · Il a laissé la vitesse en km/h.

```

## Pièges de cette unité

- **Donnée pas convertie en SI** (`ph_not_si`, E) : t = 3 min → P = E/3 au lieu de t = 180 s → P = E/180
- **Grammes utilisés comme des kilogrammes** (`ph_gram_as_kg`, E) : 450 g → m = 450 au lieu de m = 0,45 kg
- **km/h pas converti en m/s** (`ph_kmh_not_converted`, E) : v = 72 km/h → E_c = ½·m·72² au lieu de v = 20 m/s
- **Minutes lues comme une partie décimale** (`ph_minutes_decimal`, E) : 1 h 30 = 1,30 h au lieu de 1 h 30 = 1,5 h = 5400 s
- **Fraction retournée en isolant** (`ph_iso_flip`, E) : h = g/(c ΔT) au lieu de h = c ΔT/g
- **Racine oubliée** (`ph_forget_sqrt`, E) : v = 2 g h au lieu de v = √(2 g h)
- **Approximation fausse d'une puissance de 10** (`ph_estimate_power10`, E) : 3500 × 80 ≈ 30 000 au lieu de 3500 × 80 ≈ 300 000
- **Une seule des deux unités convertie** (`ph_chain_half`, E) : 4 t/h = 4000 kg/h au lieu de 4 t/h = 4000 kg / 3600 s ≈ 1,1 kg/s
- **Exposant perdu dans les unités** (`ph_unit_power_lost`, E) : 1 J = 1 N·m = 1 kg·m/s² au lieu de 1 J = 1 kg·m/s² · m = 1 kg·m²/s²
- **Watt et joule confondus** (`ph_watt_is_joule`, E) : 1 W = 1 kg·m²/s² au lieu de 1 W = 1 J/s = 1 kg·m²/s³
- **Formule choisie sans vérifier les unités** (`ph_dim_not_checked`, E) : t = E·P au lieu de t = E/P : J/W = J/(J/s) = s
- **« Par » mis à l'envers** (`ph_per_inverted`, E) : kilogrammes par litre → V/m au lieu de kilogrammes par litre → m/V
- **« Et par » mis au numérateur** (`ph_per_and_numerator`, E) : kg par boulanger et par jour → m·N/t au lieu de m/(N·t)
- **½ défait du mauvais côté** (`ph_half_inverted`, E) : E_c = ½ m v² → m = E_c/(2 v²) au lieu de m = 2 E_c/v²
