# Exemples de questions — Isoler une variable

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Isoler une variable (`iso-formula`, 11H)

_De d = v·t à t = d/v, jusqu'à E = ½mv²._

### Niveau 1

```
Isole I dans P=UI. Écris I = …
  → I=P/U
  pièges : iso_wrong_inverse

Isole b dans abc=d. Écris b = …
  → b=d/(ac)
  pièges : iso_wrong_inverse

Isole a dans F=ma. Écris a = …
  → a=F/m
  pièges : iso_wrong_inverse

```

### Niveau 2

```
Isole t dans v=w+at. Écris t = …
  → t=(v-w)/a
  pièges : eq_divide_one_term, eq_move_no_sign

Isole l dans P=2(L+l). Écris l = …
  → l=P/2-L
  pièges : distribute_partial, eq_move_no_sign, iso_wrong_inverse

Isole x dans y=ax+b. Écris x = …
  → x=(y-b)/a
  pièges : eq_divide_one_term, eq_move_no_sign

```

### Niveau 3

```
Isole h dans A=(B+b)h/2. Écris h = …
  → h=2A/(B+b)
  pièges : iso_wrong_inverse

Isole V dans p=m/V. Écris V = …
  → V=m/p
  pièges : iso_wrong_inverse

Isole a dans 1/f=1/a+1/b. Écris a = …
  → a=bf/(b-f)
  pièges : iso_sum_invert

```

### Niveau 4

```
Isole r dans A=πr^2. Écris r = …
  → r=√(A/π)
  pièges : iso_forget_root

Isole r dans A=πr^2. Écris r = …
  → r=√(A/π)
  pièges : iso_forget_root

Isole v dans E=1/2mv^2. Écris v = …
  → v=√(2E/m)
  pièges : iso_forget_root, iso_wrong_inverse

```

### Niveau 5

```
Isole d dans u^2=w^2+2ad. Écris d = …
  → d=(u^2-w^2)/(2a)
  pièges : pow_distribute_sum, eq_move_no_sign

Isole h dans P=pgh. Écris h = …
  → h=P/(pg)
  pièges : iso_wrong_inverse

Isole x dans ax+b=cx. Écris x = …
  → x=b/(c-a)
  pièges : iso_var_both_sides, eq_move_no_sign

```

## Pièges de cette unité

- **Mauvaise opération pour isoler** (`iso_wrong_inverse`, E) : d = vt → t = dv au lieu de d = vt → t = d/v
- **Inverser une somme terme à terme** (`iso_sum_invert`, R) : 1/f = 1/a + 1/b → f = a + b au lieu de f = ab/(a + b)
- **Oublier la racine** (`iso_forget_root`, E) : A = πr² → r = A/π au lieu de r = √(A/π)
- **La lettre reste des deux côtés** (`iso_var_both_sides`, E) : ax + b = cx → x = (cx − b)/a au lieu de x = b/(c − a)
