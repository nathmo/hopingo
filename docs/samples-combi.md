# Exemples de questions — Combinatoire et probabilités

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Principe multiplicatif (`g7-mult-principle`, Gymnase)

_Un choix en plusieurs étapes indépendantes (« et ») : on multiplie les nombres de possibilités._

### Niveau 1

```
Un restaurant propose 4 entrées, 7 plats et 5 desserts. Un menu est formé d'une entrée, d'un plat et d'un dessert. Combien de menus ?
  [guided]  N
    = □·7·□   (trous : 4·7·5)   ← Une case par étape, le nombre de choix dans chaque case
    = □   (trous : 140)   ← Résultat
  aides : Dessine 3 cases et écris dans chacune le nombre de choix. | 4×7×□ | 140
  pièges : g7_add_instead_multiply

Une plaque a 2 lettres (A à Z), puis 2 chiffres. Combien de plaques différentes ?
  [guided]  N
    = □·26·□·10   (trous : 26·26·10·10)   ← Une case par étape, le nombre de choix dans chaque case
    = 676·□   (trous : 676·100)   ← Calculer par morceaux
    = □   (trous : 67600)   ← Résultat
  aides : Dessine 4 cases et écris dans chacune le nombre de choix. | 26×26×10×□ | 67 600
  pièges : g7_add_instead_multiply

Lisa a 4 t-shirts, 3 pantalons et 6 paires de chaussures. Combien de tenues différentes peut-elle composer ?
  [guided]  N
    = □·3·□   (trous : 4·3·6)   ← Une case par étape, le nombre de choix dans chaque case
    = □   (trous : 72)   ← Résultat
  aides : Dessine 3 cases et écris dans chacune le nombre de choix. | 4×3×□ | 72
  pièges : g7_add_instead_multiply

```

### Niveau 2

```
Un code de 3 chiffres (0 à 9). Combien de codes possibles ?
  [guided]  N
    = □   (trous : 10·10·10)   ← Une case par étape, le nombre de choix dans chaque case
    = □   (trous : 1000)   ← Résultat
  aides : Dessine 3 cases et écris dans chacune le nombre de choix. | 10×10×□ | 1 000
  pièges : g7_add_instead_multiply

Un code de 5 chiffres (0 à 9), tous différents. Combien de codes possibles ?
  [guided]  N
    ? Toutes les cases ont-elles le même nombre de choix ? ✔ Non. Les chiffres doivent être tous différents : chaque case a un choix de moins que la précédente. / · Oui, chaque case a tous les choix
    = □   (trous : 10·9·8·7·6)   ← Une case par étape, le nombre de choix dans chaque case
    = 720·□   (trous : 720·42)   ← Calculer par morceaux
    = □   (trous : 30240)   ← Résultat
  aides : Dessine 5 cases et écris dans chacune le nombre de choix. | 10×9×8×7×□ | 30 240
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Un identifiant est formé soit de 2 lettres (A à Z), soit de 4 chiffres (0 à 9). Combien d'identifiants possibles ?
  [guided]  N
    ? Les deux sortes d'identifiants : × ou + ? ✔ Additionner : un identifiant est d'une sorte ou de l'autre, jamais des deux / · Multiplier les deux nombres
    = □   (trous : 26² + 10⁴)   ← Deux cas qui s'excluent : on additionne
    = 676 + □   (trous : 676 + 10000)   ← Calculer chaque cas
    = □   (trous : 10676)   ← Résultat
  aides : Les deux sortes d'identifiants s'excluent : compte chaque cas (en multipliant), puis additionne. | 26^2+□ | 10 676
  pièges : g7_add_instead_multiply

```

### Niveau 3

```
Une plaque a 2 lettres (A à Z), puis 2 chiffres, le premier chiffre non nul. Combien de plaques différentes ?
  [tap, suivre l'erreur, menu menu]  N
    = 26·26·9·10   ← Une case par étape, le nombre de choix dans chaque case
    = 676·90   ← Calculer par morceaux
    = 60840   ← Résultat
  aides : Dessine 4 cases et écris dans chacune le nombre de choix. | 26×26×9×□ | 60 840
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Une plaque a 1 lettre (A à Z), puis 4 chiffres, le premier chiffre non nul. Combien de plaques différentes ?
  [tap, suivre l'erreur, menu menu]  N
    = 26·9·10·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 2340·100   ← Calculer par morceaux
    = 234000   ← Résultat
  aides : Dessine 5 cases et écris dans chacune le nombre de choix. | 26×9×10×10×□ | 234 000
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Une plaque a 1 lettre (A à Z), puis 4 chiffres, le premier chiffre non nul. Combien de plaques différentes ?
  [tap, suivre l'erreur, menu menu]  N
    = 26·9·10·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 2340·100   ← Calculer par morceaux
    = 234000   ← Résultat
  aides : Dessine 5 cases et écris dans chacune le nombre de choix. | 26×9×10×10×□ | 234 000
  pièges : g7_add_instead_multiply, g7_constraint_ignored

```

### Niveau 4

```
Un identifiant est formé soit de 2 lettres (A à Z), soit de 3 chiffres (0 à 9). Combien d'identifiants possibles ?
  [free, suivre l'erreur]  N
    = 26² + 10³   ← Deux cas qui s'excluent : on additionne
    = 676 + 1000   ← Calculer chaque cas
    = 1676   ← Résultat
  aides : Les deux sortes d'identifiants s'excluent : compte chaque cas (en multipliant), puis additionne. | 26^2+□ | 1 676
  pièges : g7_add_instead_multiply

Une plaque a 1 lettre (A à Z), puis 3 chiffres, le premier chiffre non nul. Combien de plaques différentes ?
  [free, suivre l'erreur]  N
    = 26·9·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 234·100   ← Calculer par morceaux
    = 23400   ← Résultat
  aides : Dessine 4 cases et écris dans chacune le nombre de choix. | 26×9×10×□ | 23 400
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Un code de 4 chiffres (0 à 9). Combien de codes possibles ?
  [free, suivre l'erreur]  N
    = 10·10·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 100·100   ← Calculer par morceaux
    = 10000   ← Résultat
  aides : Dessine 4 cases et écris dans chacune le nombre de choix. | 10×10×10×□ | 10 000
  pièges : g7_add_instead_multiply

```

### Niveau 5

```
Un code de 5 chiffres (0 à 9), qui ne commence pas par 0. Combien de codes possibles ?
  [free, sans aide]  N
    = 9·10·10·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 900·100   ← Calculer par morceaux
    = 90000   ← Résultat
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Combien de « mots » de 3 lettres (A à Z), toutes distinctes, peut-on écrire (ils n'ont pas besoin d'avoir un sens) ?
  [free, sans aide]  N
    = 26·25·24   ← Une case par étape, le nombre de choix dans chaque case
    = 15600   ← Résultat
  pièges : g7_add_instead_multiply, g7_constraint_ignored

Un code de 3 chiffres (0 à 9). Combien de codes possibles ?
  [free, sans aide]  N
    = 10·10·10   ← Une case par étape, le nombre de choix dans chaque case
    = 1000   ← Résultat
  pièges : g7_add_instead_multiply

```

### Variantes d'examen

```
Combien de « mots » de 4 lettres (A à Z), toutes distinctes, peut-on écrire (ils n'ont pas besoin d'avoir un sens) ?
  · 456 976 [g7_constraint_ignored]   ✔ 358 800   · 3 588 000   · 98 [g7_add_instead_multiply]
  [examen mcq]
  pièges : g7_constraint_ignored, g7_add_instead_multiply

Vrai ou faux ?
  « Avec 6 entrées, 2 plats et 2 desserts, on compose 24 menus (une entrée, un plat, un dessert). » → VRAI
  [examen tf]

```

## Factorielles, permutations, arrangements, anagrammes (`g7-perm-arr`, Gymnase)

_Compter des rangements : n! pour n objets en ligne, A(n, k) pour k places ordonnées, n!/(n₁!·n₂!···) pour des anagrammes._

### Niveau 1

```
Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot POMME ?
  [guided]  N
    = 5!/□   (trous : 5!/2!)   ← M 2 fois
    = 120/2   ← Calculer
    = □   (trous : 60)   ← Simplifier
  aides : 5 lettres : 5! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 5!/(□) | 60
  pièges : g7_anagram_repeats

Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot LETTRE ?
  [guided]  N
    = 6!/(□·□)   (trous : 6!/(2!·2!))   ← E 2 fois, T 2 fois
    = 720/□   (trous : 720/4)   ← Calculer
    = □   (trous : 180)   ← Simplifier
  aides : 6 lettres : 6! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 6!/(□) | 180
  pièges : g7_anagram_repeats

9 coureurs participent à une course. Combien de classements des 4 premières places sont possibles ?
  [guided]  N
    = A(□;□)   (trous : A(9;4))   ← Arrangement : ordre compté, pas de répétition
    = 9·8·7·□   (trous : 9·8·7·6)   ← 4 cases : 9 choix, puis un de moins
    = □   (trous : 3024)   ← Calculer
  aides : L'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k). | 9×8×7×□ | 3 024
  pièges : g7_order_confusion, g7_repetition_confusion

```

### Niveau 2

```
5 chevaux prennent le départ. Combien de tiercés dans l'ordre sont possibles ?
  [guided]  N
    ? Quelle formule ? ✔ A(n, k) : k places parmi n, ordre compté / · n! : tous les objets en ligne / · n!/(n₁!·n₂!…) : lettres répétées
    = □   (trous : A(5;3))   ← Arrangement : ordre compté, pas de répétition
    = 5·4·□   (trous : 5·4·3)   ← 3 cases : 5 choix, puis un de moins
    = □   (trous : 60)   ← Calculer
  aides : L'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k). | 5×4×□ | 60
  pièges : g7_order_confusion, g7_repetition_confusion

10 chevaux prennent le départ. Combien de tiercés dans l'ordre sont possibles ?
  [guided]  N
    ? Quelle formule ? ✔ A(n, k) : k places parmi n, ordre compté / · n! : tous les objets en ligne / · n!/(n₁!·n₂!…) : lettres répétées
    = □   (trous : A(10;3))   ← Arrangement : ordre compté, pas de répétition
    = 10·9·□   (trous : 10·9·8)   ← 3 cases : 10 choix, puis un de moins
    = □   (trous : 720)   ← Calculer
  aides : L'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k). | 10×9×□ | 720
  pièges : g7_order_confusion, g7_repetition_confusion

Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot CARAFE ?
  [guided]  N
    ? Quelle formule ? · A(n, k) : k places parmi n, ordre compté / · n! : tous les objets en ligne / ✔ n!/(n₁!·n₂!…) : lettres répétées
    = □/2!   (trous : 6!/2!)   ← A 2 fois
    = 720/2   ← Calculer
    = □   (trous : 360)   ← Simplifier
  aides : 6 lettres : 6! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 6!/(□) | 360
  pièges : g7_anagram_repeats

```

### Niveau 3

```
Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot TOMATE ?
  [tap, suivre l'erreur, menu menu]  N
    = 6!/2!   ← T 2 fois
    = 720/2   ← Calculer
    = 360   ← Simplifier
  aides : 6 lettres : 6! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 6!/(□) | 360
  pièges : g7_anagram_repeats

Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot POMME ?
  [tap, suivre l'erreur, menu menu]  N
    = 5!/2!   ← M 2 fois
    = 120/2   ← Calculer
    = 60   ← Simplifier
  aides : 5 lettres : 5! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 5!/(□) | 60
  pièges : g7_anagram_repeats

Un club de 10 membres élit un président, un secrétaire, un caissier et un vice-président (4 postes différents, une personne par poste). Combien de bureaux possibles ?
  [tap, suivre l'erreur, menu menu]  N
    = A(10;4)   ← Arrangement : ordre compté, pas de répétition
    = 10·9·8·7   ← 4 cases : 10 choix, puis un de moins
    = 5040   ← Calculer
  aides : L'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k). | 10×9×8×□ | 5 040
  pièges : g7_order_confusion, g7_repetition_confusion

```

### Niveau 4

```
Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot BANANE ?
  [free, suivre l'erreur]  N
    = 6!/(2!·2!)   ← A 2 fois, N 2 fois
    = 720/4   ← Calculer
    = 180   ← Simplifier
  aides : 6 lettres : 6! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 6!/(□) | 180
  pièges : g7_anagram_repeats

Combien d'anagrammes (mots avec les mêmes lettres, sans souci de sens) a le mot CHOCOLAT ?
  [free, suivre l'erreur]  N
    = 8!/(2!·2!)   ← C 2 fois, O 2 fois
    = 40320/4   ← Calculer
    = 10080   ← Simplifier
  aides : 8 lettres : 8! rangements, mais échanger deux lettres identiques donne le même mot. Divise par la factorielle de chaque lettre répétée. | 8!/(□) | 10 080
  pièges : g7_anagram_repeats

7 coureurs participent à une course. Combien de classements des 4 premières places sont possibles ?
  [free, suivre l'erreur]  N
    = A(7;4)   ← Arrangement : ordre compté, pas de répétition
    = 7·6·5·4   ← 4 cases : 7 choix, puis un de moins
    = 840   ← Calculer
  aides : L'ordre compte (or ≠ argent), et une personne ne peut pas occuper deux places : A(n, k). | 7×6×5×□ | 840
  pièges : g7_order_confusion, g7_repetition_confusion

```

### Niveau 5

```
Combien d'anagrammes du mot TERRASSE commencent par la lettre T ?
  [free, sans aide]  N
    = 7!/(2!·2!·2!)   ← On place T en tête ; il reste 7 lettres (ERRASSE)
    = 630   ← Calculer
  pièges : g7_anagram_repeats

Combien d'anagrammes du mot PAPILLON commencent par la lettre O ?
  [free, sans aide]  N
    = 7!/(2!·2!)   ← On place O en tête ; il reste 7 lettres (PAPILLN)
    = 1260   ← Calculer
  pièges : g7_anagram_repeats

Combien d'anagrammes du mot COCOTTE commencent par la lettre O ?
  [free, sans aide]  N
    = 6!/(2!·2!)   ← On place O en tête ; il reste 6 lettres (CCOTTE)
    = 180   ← Calculer
  pièges : g7_anagram_repeats

```

### Variantes d'examen

```
De combien de façons 8 coureurs peuvent-ils occuper les 3 marches du podium (or, argent, bronze) ?
  · 56 [g7_order_confusion]   ✔ 336   · 672   · 512 [g7_repetition_confusion]
  [examen mcq]
  pièges : g7_order_confusion, g7_repetition_confusion

Vrai ou faux ?
  « Il y a 15 façons d'attribuer 2 postes différents à 2 personnes choisies parmi 6. » → FAUX
    contre-exemple (refute) : N = 30
  [examen tf]
  pièges : g7_order_confusion

```

## Combinaisons, triangle de Pascal (`g7-combinations`, Gymnase)

_Choisir k objets parmi n sans ordre : C(n, k) = n!/(k!(n − k)!), puis multiplier les choix faits dans plusieurs groupes._

### Niveau 1

```
Un comité est formé de 4 femmes choisies parmi 10 et de 4 hommes choisis parmi 8. Combien de choix possibles ?
  [guided]  N
    = C(10;□)×C(8;□)   (trous : C(10;4)×C(8;4))   ← Choisir dans chaque groupe
    = □·70   (trous : 210·70)   ← C(10, 4) = 210 ; C(8, 4) = 70
    = □   (trous : 14700)   ← Multiplier
  aides : Dans un groupe choisi, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. | C(10;4)×C(□;□) | 14 700
  pièges : g7_order_confusion, g7_add_instead_multiply

Une délégation compte 2 élèves de 1re année (parmi 8) et 4 élèves de 2e année (parmi 5). Combien de choix possibles ?
  [guided]  N
    = C(8;□)×C(5;□)   (trous : C(8;2)×C(5;4))   ← Choisir dans chaque groupe
    = □·5   (trous : 28·5)   ← C(8, 2) = 28 ; C(5, 4) = 5
    = □   (trous : 140)   ← Multiplier
  aides : Dans un groupe choisi, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. | C(8;2)×C(□;□) | 140
  pièges : g7_order_confusion, g7_add_instead_multiply

On tire une main de 3 cartes d'un jeu de 32 cartes (4 dames). Combien de mains contiennent exactement 1 dame ?
  [guided]  N
    = C(4;□)×C(28;2)   (trous : C(4;1)×C(28;2))   ← Les dames, puis les 2 autres cartes
    = 4·□   (trous : 4·378)   ← Calculer
    = □   (trous : 1512)   ← Résultat
  aides : Choisis les dames parmi les 4, puis les autres cartes parmi les 28 qui restent : multiplie les deux comptes. | C(4;1)×C(□;2) | 1 512
  pièges : g7_order_confusion, g7_add_instead_multiply

```

### Niveau 2

```
Pour les vacances, Léa emporte 2 romans parmi 9 et 2 BD parmi 10. Combien de choix possibles ?
  [guided]  N
    ? Un seul groupe ou plusieurs ? ✔ Plusieurs groupes : choisir dans chacun, puis multiplier / · Un seul groupe : C(total, total choisi) / · Plusieurs groupes : choisir dans chacun, puis additionner
    = C(9;2)×□   (trous : C(9;2)×C(10;2))   ← Choisir dans chaque groupe
    = □·45   (trous : 36·45)   ← C(9, 2) = 36 ; C(10, 2) = 45
    = □   (trous : 1620)   ← Multiplier
  aides : Dans un groupe choisi, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. | C(9;2)×C(□;□) | 1 620
  pièges : g7_order_confusion, g7_add_instead_multiply

On tire une main de 4 cartes d'un jeu de 32 cartes (4 as). Combien de mains contiennent exactement 2 as ?
  [guided]  N
    ? Un seul groupe ou plusieurs ? ✔ Plusieurs groupes : choisir dans chacun, puis multiplier / · Un seul groupe : C(total, total choisi) / · Plusieurs groupes : choisir dans chacun, puis additionner
    = C(4;2)×□   (trous : C(4;2)×C(28;2))   ← Les as, puis les 2 autres cartes
    = 6·□   (trous : 6·378)   ← Calculer
    = □   (trous : 2268)   ← Résultat
  aides : Choisis les as parmi les 4, puis les autres cartes parmi les 28 qui restent : multiplie les deux comptes. | C(4;2)×C(□;2) | 2 268
  pièges : g7_order_confusion, g7_add_instead_multiply

On tire une main de 4 cartes d'un jeu de 36 cartes (4 dames). Combien de mains contiennent exactement 3 dames ?
  [guided]  N
    ? Un seul groupe ou plusieurs ? ✔ Plusieurs groupes : choisir dans chacun, puis multiplier / · Un seul groupe : C(total, total choisi) / · Plusieurs groupes : choisir dans chacun, puis additionner
    = C(4;3)×□   (trous : C(4;3)×C(32;1))   ← Les dames, puis l'autre carte
    = 4·□   (trous : 4·32)   ← Calculer
    = □   (trous : 128)   ← Résultat
  aides : Choisis les dames parmi les 4, puis les autres cartes parmi les 32 qui restent : multiplie les deux comptes. | C(4;3)×C(□;1) | 128
  pièges : g7_order_confusion, g7_add_instead_multiply

```

### Niveau 3

```
On tire une main de 4 cartes d'un jeu de 36 cartes (4 dames). Combien de mains contiennent exactement 2 dames ?
  [tap, suivre l'erreur, menu menu]  N
    = C(4;2)×C(32;2)   ← Les dames, puis les 2 autres cartes
    = 6·496   ← Calculer
    = 2976   ← Résultat
  aides : Choisis les dames parmi les 4, puis les autres cartes parmi les 32 qui restent : multiplie les deux comptes. | C(4;2)×C(□;2) | 2 976
  pièges : g7_order_confusion, g7_add_instead_multiply

Un comité est formé de 2 femmes choisies parmi 7 et de 2 hommes choisis parmi 8. Combien de choix possibles ?
  [tap, suivre l'erreur, menu menu]  N
    = C(7;2)×C(8;2)   ← Choisir dans chaque groupe
    = 21·28   ← C(7, 2) = 21 ; C(8, 2) = 28
    = 588   ← Multiplier
  aides : Dans un groupe choisi, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. | C(7;2)×C(□;□) | 588
  pièges : g7_order_confusion, g7_add_instead_multiply

Trouve l'entier n tel que C(n, 2) = 15.
  [tap, suivre l'erreur, menu menu]  n(n − 1)
    (C(n, 2) = n(n − 1)/2 = 15)
    = 2·15   ← On multiplie par 2! = 2
    = 30   ← Calculer
  — n  [juge prob]  départ : n
    = 6   ← 6·5 = 30
  aides : C(n, 2) = n(n − 1)/2! : multiplie par 2, puis cherche des entiers consécutifs. | n(n − 1) = □ | n = 6

```

### Niveau 4

```
Un comité est formé de 3 femmes choisies parmi 9 et de 3 hommes choisis parmi 5. Combien de choix possibles ?
  [free, suivre l'erreur]  N
    = C(9;3)×C(5;3)   ← Choisir dans chaque groupe
    = 84·10   ← C(9, 3) = 84 ; C(5, 3) = 10
    = 840   ← Multiplier
  aides : Dans un groupe choisi, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. | C(9;3)×C(□;□) | 840
  pièges : g7_order_confusion, g7_add_instead_multiply

Trouve l'entier n tel que C(n, 3) = 286.
  [free, suivre l'erreur]  n(n − 1)(n − 2)
    (C(n, 3) = n(n − 1)(n − 2)/6 = 286)
    = 6·286   ← On multiplie par 3! = 6
    = 1716   ← Calculer
  — n  [juge prob]  départ : n
    = 13   ← 13·12·11 = 1716
  aides : C(n, 3) = n(n − 1)(n − 2)/3! : multiplie par 6, puis cherche des entiers consécutifs. | n(n − 1)(n − 2) = □ | n = 13

On tire une main de 5 cartes d'un jeu de 32 cartes (4 rois). Combien de mains contiennent exactement 2 rois ?
  [free, suivre l'erreur]  N
    = C(4;2)×C(28;3)   ← Les rois, puis les 3 autres cartes
    = 6·3276   ← Calculer
    = 19656   ← Résultat
  aides : Choisis les rois parmi les 4, puis les autres cartes parmi les 28 qui restent : multiplie les deux comptes. | C(4;2)×C(□;3) | 19 656
  pièges : g7_order_confusion, g7_add_instead_multiply

```

### Niveau 5

```
Un groupe compte 7 femmes et 5 hommes. On choisit un comité de 2 personnes. Combien de comités contiennent au moins une femme ?
  [free, sans aide]  N_tous
    = C(12;2)   ← Tous les comités
    = 66   ← Calculer
  — Comités sans femme  [juge prob]  départ : N_0
    = C(5;2)   ← Seulement des hommes
    = 10   ← Calculer
  — Au moins une femme  [juge prob]  départ : N
    = 66 − 10   ← Au moins une = tous − aucune
    = 56   ← Résultat
  pièges : g7_order_confusion

Un groupe compte 6 femmes et 7 hommes. On choisit un comité de 2 personnes. Combien de comités contiennent au moins une femme ?
  [free, sans aide]  N_tous
    = C(13;2)   ← Tous les comités
    = 78   ← Calculer
  — Comités sans femme  [juge prob]  départ : N_0
    = C(7;2)   ← Seulement des hommes
    = 21   ← Calculer
  — Au moins une femme  [juge prob]  départ : N
    = 78 − 21   ← Au moins une = tous − aucune
    = 57   ← Résultat
  pièges : g7_order_confusion

Un groupe compte 4 femmes et 6 hommes. On choisit un comité de 4 personnes. Combien de comités contiennent au moins une femme ?
  [free, sans aide]  N_tous
    = C(10;4)   ← Tous les comités
    = 210   ← Calculer
  — Comités sans femme  [juge prob]  départ : N_0
    = C(6;4)   ← Seulement des hommes
    = 15   ← Calculer
  — Au moins une femme  [juge prob]  départ : N
    = 210 − 15   ← Au moins une = tous − aucune
    = 195   ← Résultat
  pièges : g7_order_confusion

```

### Variantes d'examen

```
Pour les vacances, Léa emporte 2 romans parmi 11 et 2 BD parmi 9. Combien de choix possibles ?
  · 3 960   · 91 [g7_add_instead_multiply]   · 7 920 [g7_order_confusion]   ✔ 1 980
  [examen mcq]
  pièges : g7_order_confusion, g7_add_instead_multiply

Vrai ou faux ?
  « Pour tous entiers 0 ≤ k ≤ n, C(n, k) = A(n, k). » → FAUX
    contre-exemple (refute) : n = 3, k = 2
  [examen tf]
  pièges : g7_order_confusion

Un groupe compte 7 femmes et 7 hommes. On choisit un comité de 3 personnes. Combien de comités contiennent au moins une femme ?
  [problème, examen open, 4 points]
  partie 1 (Au moins une femme : 1,5 ; Comités sans femme : 1,5 ; Au moins une femme : 1)
  Un groupe compte 7 femmes et 7 hommes. On choisit un comité de 3 personnes. Combien de comités contiennent au moins une femme ?
    [free, sans aide, suivre l'erreur, examen open]  N_tous
      = C(14;3)   ← Tous les comités
      = 364   ← Calculer
    — Comités sans femme  [juge prob]  départ : N_0
      = C(7;3)   ← Seulement des hommes
      = 35   ← Calculer
    — Au moins une femme  [juge prob]  départ : N
      = 364 − 35   ← Au moins une = tous − aucune
      = 329   ← Résultat
  pièges : g7_order_confusion

```

## Ordonné ou pas ? Avec ou sans remise ? (exercice éclair) (`g7-which-count`, Gymnase)

_Avant de calculer : l'ordre compte-t-il, peut-on reprendre le même objet ? Puis la bonne formule : nᵏ, A(n, k) ou C(n, k)._

### Niveau 1

```
On distribue une main de 4 cartes prises dans un paquet de 11. Combien de mains ? Échange deux éléments du résultat : obtiens-tu un autre résultat ? L'ordre compte-t-il ?
  · Oui, l'ordre compte [g7_order_confusion]   ✔ Non, l'ordre ne compte pas
  pièges : g7_order_confusion

8 coureurs, 5 places classées à la fin de la course (1er, 2e, …). Combien de classements des 5 premiers ? Échange deux éléments du résultat : obtiens-tu un autre résultat ? L'ordre compte-t-il ?
  ✔ Oui, l'ordre compte   · Non, l'ordre ne compte pas [g7_order_confusion]
  pièges : g7_order_confusion

On prend une poignée de 5 boules dans une urne de 7 boules numérotées. Combien de poignées ? Échange deux éléments du résultat : obtiens-tu un autre résultat ? L'ordre compte-t-il ?
  · Oui, l'ordre compte [g7_order_confusion]   ✔ Non, l'ordre ne compte pas
  pièges : g7_order_confusion

```

### Niveau 2

```
5 amis s'assoient sur 5 des 6 chaises numérotées d'une rangée. De combien de façons ? L'ordre compte-t-il ? Peut-on reprendre le même élément ?
  · Ordre : oui ; répétition : oui [g7_repetition_confusion]   ✔ Ordre : oui ; répétition : non   · Ordre : non ; répétition : non [g7_order_confusion]   · Ordre : non ; répétition : oui [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

Une urne contient 7 boules numérotées. On en tire 2, une à une, avec remise, en notant l'ordre. Combien de résultats ? L'ordre compte-t-il ? Peut-on reprendre le même élément ?
  ✔ Ordre : oui ; répétition : oui   · Ordre : oui ; répétition : non [g7_repetition_confusion]   · Ordre : non ; répétition : non [g7_order_confusion]   · Ordre : non ; répétition : oui [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

On lance 4 fois un dé à 9 faces et on note les résultats dans l'ordre. Combien de suites de résultats ? L'ordre compte-t-il ? Peut-on reprendre le même élément ?
  ✔ Ordre : oui ; répétition : oui   · Ordre : oui ; répétition : non [g7_repetition_confusion]   · Ordre : non ; répétition : non [g7_order_confusion]   · Ordre : non ; répétition : oui [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

```

### Niveau 3

```
À une loterie, on coche 3 numéros parmi 11. Combien de grilles ? Quelle formule ?
  · A(11;3) [g7_order_confusion]   · 11^3 [g7_order_confusion]   ✔ C(11;3)
  pièges : g7_order_confusion

Un QCM a 2 questions, chacune avec 5 réponses possibles. De combien de façons peut-on remplir la grille ? Quelle formule ?
  · A(5;2) [g7_repetition_confusion]   · C(5;2) [g7_order_confusion]   ✔ 5^2
  pièges : g7_repetition_confusion, g7_order_confusion

Combien de codes de 5 chiffres tous différents peut-on former avec 10 touches ? Quelle formule ?
  ✔ A(10;5)   · 10^5 [g7_repetition_confusion]   · C(10;5) [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

```

### Niveau 4

```
On forme un comité de 3 personnes dans un groupe de 8. Combien de comités ? Choisis la bonne formule, puis donne le nombre.
  → 56   pièges attendus : 512 [g7_order_confusion], 336 [g7_order_confusion], 120 [g7_repetition_confusion]
  pièges : g7_order_confusion, g7_repetition_confusion

Combien de codes de 3 chiffres tous différents peut-on former avec 7 touches ? Choisis la bonne formule, puis donne le nombre.
  → 210   pièges attendus : 343 [g7_repetition_confusion], 35 [g7_order_confusion], 84 [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

Une urne contient 8 boules numérotées. On en tire 3, une à une, avec remise, en notant l'ordre. Combien de résultats ?
  · C(10;3) = 120 [g7_order_confusion]   ✔ 8^3 = 512   · A(8;3) = 336 [g7_repetition_confusion]   · C(8;3) = 56 [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

```

### Niveau 5

```
Une urne contient 4 boules numérotées. On en tire 2, une à une, avec remise, en notant l'ordre. Combien de résultats ?
  · C(4;2) = 6 [g7_order_confusion]   · A(4;2) = 12 [g7_repetition_confusion]   ✔ 4^2 = 16   · C(5;2) = 10 [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

On tire 2 boules, une à une, sans remise, d'une urne de 8 boules numérotées, en notant l'ordre. Combien de résultats ?
  · 8^2 = 64 [g7_repetition_confusion]   · C(8;2) = 28 [g7_order_confusion]   ✔ A(8;2) = 56   · C(9;2) = 36 [g7_order_confusion]
  pièges : g7_repetition_confusion, g7_order_confusion

Un QCM a 4 questions, chacune avec 10 réponses possibles. De combien de façons peut-on remplir la grille ?
  · C(13;4) = 715 [g7_order_confusion]   · A(10;4) = 5 040 [g7_repetition_confusion]   · C(10;4) = 210 [g7_order_confusion]   ✔ 10^4 = 10 000
  pièges : g7_repetition_confusion, g7_order_confusion

```

### Variantes d'examen

```
On forme un comité de 4 personnes dans un groupe de 11. Combien de comités ?
  · A(11;4) = 7 920 [g7_order_confusion]   ✔ C(11;4) = 330   · 11^4 = 14 641 [g7_order_confusion]   · C(14;4) = 1 001 [g7_repetition_confusion]
  [examen mcq]
  pièges : g7_order_confusion, g7_repetition_confusion

```

## Binôme de Newton (`g7-binomial`, Gymnase)

_Développer (a + b)ⁿ avec les C(n, k), et trouver le coefficient d'une puissance de x par le terme général._

### Niveau 1

```
Dans le développement de (x² − 1/x²)⁴, trouve le terme indépendant de x.
  [guided]  exposant de x
    (Terme général : C(4;k) · (x²)^(4 − k) · (−1/x²)^(k) = C(4;k)×(-1)^k×x^(8-4k))
    = 8 − □k   (trous : 8 − 4k)   ← Puissance de x : 2(4 − k) − 2k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 2)   ← 8 − 4k = 0
  — Coefficient  [juge prob]  départ : coefficient
    = C(4;□)×(-1)^□   (trous : C(4;2)×(-1)^2)   ← Remplacer k dans le terme général
    = □·1   (trous : 6·1)   ← C(4, 2) = 6
    = □   (trous : 6)   ← Calculer
  aides : Écris le terme général avec (x²) et (−1/x²) entiers, signe compris ; la puissance de x vaut 2(4 − k) − 2k. | 8 − 4k = 0, donc k = □ | 6
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Dans le développement de (x + 2/x)¹⁰, trouve le coefficient de x⁻⁸.
  [guided]  exposant de x
    (Terme général : C(10;k) · (x)^(10 − k) · (2/x)^(k) = C(10;k)×2^k×x^(10-2k))
    = 10 − □k   (trous : 10 − 2k)   ← Puissance de x : (10 − k) − k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 9)   ← 10 − 2k = −8
  — Coefficient  [juge prob]  départ : coefficient
    = C(10;□)×2^9   (trous : C(10;9)×2^9)   ← Remplacer k dans le terme général
    = □·512   (trous : 10·512)   ← C(10, 9) = 10
    = □   (trous : 5120)   ← Calculer
  aides : Écris le terme général avec (x) et (2/x) entiers, signe compris ; la puissance de x vaut (10 − k) − k. | 10 − 2k = −8, donc k = □ | 5 120
  pièges : g7_binomial_coef_power, g7_binomial_index

Dans le développement de (−2x + 1/x)⁵, trouve le coefficient de x⁻⁵.
  [guided]  exposant de x
    (Terme général : C(5;k) · (−2x)^(5 − k) · (1/x)^(k) = C(5;k)×(-2)^(5-k)×x^(5-2k))
    = 5 − □k   (trous : 5 − 2k)   ← Puissance de x : (5 − k) − k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 5)   ← 5 − 2k = −5
  — Coefficient  [juge prob]  départ : coefficient
    = C(□;5)×(-2)^□   (trous : C(5;5)×(-2)^0)   ← Remplacer k dans le terme général
    = □·1   (trous : 1·1)   ← C(5, 5) = 1
    = □   (trous : 1)   ← Calculer
  aides : Écris le terme général avec (−2x) et (1/x) entiers, signe compris ; la puissance de x vaut (5 − k) − k. | 5 − 2k = −5, donc k = □ | 1
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

```

### Niveau 2

```
Dans le développement de (−x − 1/x)⁸, trouve le coefficient de x⁻⁴.
  [guided]  exposant de x
    (Terme général : C(8;k) · (−x)^(8 − k) · (−1/x)^(k) = C(8;k)×(-1)^(8-k)×(-1)^k×x^(8-2k))
    = □   (trous : 8 − 2k)   ← Puissance de x : (8 − k) − k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 6)   ← 8 − 2k = −4
  — Coefficient  [juge prob]  départ : coefficient
    = C(8;6)×□×□   (trous : C(8;6)×(-1)^2×(-1)^6)   ← Remplacer k dans le terme général
    = □·1   (trous : 28·1)   ← C(8, 6) = 28
    = □   (trous : 28)   ← Calculer
  aides : Écris le terme général avec (−x) et (−1/x) entiers, signe compris ; la puissance de x vaut (8 − k) − k. | 8 − 2k = −4, donc k = □ | 28
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Dans le développement de (−x² − 2/x²)⁸, trouve le coefficient de x⁻⁸.
  [guided]  exposant de x
    (Terme général : C(8;k) · (−x²)^(8 − k) · (−2/x²)^(k) = C(8;k)×(-1)^(8-k)×(-2)^k×x^(16-4k))
    = □   (trous : 16 − 4k)   ← Puissance de x : 2(8 − k) − 2k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 6)   ← 16 − 4k = −8
  — Coefficient  [juge prob]  départ : coefficient
    = C(8;6)×□×□   (trous : C(8;6)×(-1)^2×(-2)^6)   ← Remplacer k dans le terme général
    = □·64   (trous : 28·64)   ← C(8, 6) = 28
    = □   (trous : 1792)   ← Calculer
  aides : Écris le terme général avec (−x²) et (−2/x²) entiers, signe compris ; la puissance de x vaut 2(8 − k) − 2k. | 16 − 4k = −8, donc k = □ | 1 792
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Dans le développement de (2x + 1/x²)⁸, trouve le coefficient de x².
  [guided]  exposant de x
    (Terme général : C(8;k) · (2x)^(8 − k) · (1/x²)^(k) = C(8;k)×2^(8-k)×x^(8-3k))
    = □   (trous : 8 − 3k)   ← Puissance de x : (8 − k) − 2k
  — Équation en k  [juge prob]  départ : k
    = □   (trous : 2)   ← 8 − 3k = 2
  — Coefficient  [juge prob]  départ : coefficient
    = C(8;2)×□   (trous : C(8;2)×2^6)   ← Remplacer k dans le terme général
    = □·64   (trous : 28·64)   ← C(8, 2) = 28
    = □   (trous : 1792)   ← Calculer
  aides : Écris le terme général avec (2x) et (1/x²) entiers, signe compris ; la puissance de x vaut (8 − k) − 2k. | 8 − 3k = 2, donc k = □ | 1 792
  pièges : g7_binomial_coef_power, g7_binomial_index

```

### Niveau 3

```
Dans le développement de (−x − 1/x²)⁶, trouve le coefficient de x⁻⁶ (0 s'il n'y en a pas).
  [tap, suivre l'erreur, menu menu]  exposant de x
    = 6 − 3k   ← Puissance de x : (6 − k) − 2k
  — Équation en k  [juge prob]  départ : k
    = 4   ← 6 − 3k = −6
  — Coefficient  [juge prob]  départ : coefficient
    = C(6;4)×(-1)^2×(-1)^4   ← Remplacer k dans le terme général
    = 15·1   ← C(6, 4) = 15
    = 15   ← Calculer
  aides : Écris le terme général avec (−x) et (−1/x²) entiers, signe compris ; la puissance de x vaut (6 − k) − 2k. | 6 − 3k = −6, donc k = □ | 15
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Dans le développement de (−2x − 2/x)⁶, trouve le terme indépendant de x (0 s'il n'y en a pas).
  [tap, suivre l'erreur, menu menu]  exposant de x
    = 6 − 2k   ← Puissance de x : (6 − k) − k
  — Équation en k  [juge prob]  départ : k
    = 3   ← 6 − 2k = 0
  — Coefficient  [juge prob]  départ : coefficient
    = C(6;3)×(-2)^3×(-2)^3   ← Remplacer k dans le terme général
    = 20·64   ← C(6, 3) = 20
    = 1280   ← Calculer
  aides : Écris le terme général avec (−2x) et (−2/x) entiers, signe compris ; la puissance de x vaut (6 − k) − k. | 6 − 2k = 0, donc k = □ | 1 280
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Dans le développement de (x² − 1/x)⁹, trouve le coefficient de x⁶ (0 s'il n'y en a pas).
  [tap, suivre l'erreur, menu menu]  exposant de x
    = 18 − 3k   ← Puissance de x : 2(9 − k) − k
  — Équation en k  [juge prob]  départ : k
    = 4   ← 18 − 3k = 6
  — Coefficient  [juge prob]  départ : coefficient
    = C(9;4)×(-1)^4   ← Remplacer k dans le terme général
    = 126·1   ← C(9, 4) = 126
    = 126   ← Calculer
  aides : Écris le terme général avec (x²) et (−1/x) entiers, signe compris ; la puissance de x vaut 2(9 − k) − k. | 18 − 3k = 6, donc k = □ | 126
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

```

### Niveau 4

```
Développe et réduis (x − 3)⁴.
  [free, suivre l'erreur]  (x − 3)⁴
    = x⁴ − 12x³ + 54x² − 108x + 81   ← Σ C(4, k)·x^(4 − k)·(-3)^k
  aides : (x + b)ⁿ = Σ C(n, k)·xⁿ⁻ᵏ·bᵏ avec b = -3 : le signe de b est dans bᵏ. | Coefficients C(4, k) : 1, 4, 6, 4, 1 | x⁴ − 12x³ + 54x² − 108x + 81
  pièges : g7_binomial_sign

Dans le développement de (3x − 2/x)⁸, trouve le coefficient de x⁸ (0 s'il n'y en a pas).
  [free, suivre l'erreur]  exposant de x
    = 8 − 2k   ← Puissance de x : (8 − k) − k
  — Équation en k  [juge prob]  départ : k
    = 0   ← 8 − 2k = 8
  — Coefficient  [juge prob]  départ : coefficient
    = C(8;0)×3^8×(-2)^0   ← Remplacer k dans le terme général
    = 1·6561   ← C(8, 0) = 1
    = 6561   ← Calculer
  aides : Écris le terme général avec (3x) et (−2/x) entiers, signe compris ; la puissance de x vaut (8 − k) − k. | 8 − 2k = 8, donc k = □ | 6 561
  pièges : g7_binomial_coef_power, g7_binomial_index, g7_binomial_sign

Développe et réduis (x − 2)⁴.
  [free, suivre l'erreur]  (x − 2)⁴
    = x⁴ − 8x³ + 24x² − 32x + 16   ← Σ C(4, k)·x^(4 − k)·(-2)^k
  aides : (x + b)ⁿ = Σ C(n, k)·xⁿ⁻ᵏ·bᵏ avec b = -2 : le signe de b est dans bᵏ. | Coefficients C(4, k) : 1, 4, 6, 4, 1 | x⁴ − 8x³ + 24x² − 32x + 16
  pièges : g7_binomial_sign

```

### Niveau 5

```
Dans le développement de (2x + 1/x)¹⁰, trouve le terme indépendant de x (0 s'il n'y en a pas).
  [free, sans aide]  exposant de x
    = 10 − 2k   ← Puissance de x : (10 − k) − k
  — Équation en k  [juge prob]  départ : k
    = 5   ← 10 − 2k = 0
  — Coefficient  [juge prob]  départ : coefficient
    = C(10;5)×2^5   ← Remplacer k dans le terme général
    = 252·32   ← C(10, 5) = 252
    = 8064   ← Calculer
  pièges : g7_binomial_coef_power, g7_binomial_index

Dans le développement de (x + 1/x)¹⁰, trouve le terme indépendant de x (0 s'il n'y en a pas).
  [free, sans aide]  exposant de x
    = 10 − 2k   ← Puissance de x : (10 − k) − k
  — Équation en k  [juge prob]  départ : k
    = 5   ← 10 − 2k = 0
  — Coefficient  [juge prob]  départ : coefficient
    = C(10;5)   ← Remplacer k dans le terme général
    = 252·1   ← C(10, 5) = 252
    = 252   ← Calculer
  pièges : g7_binomial_coef_power, g7_binomial_index

Dans le développement de (2x² + 1/x²)⁶, trouve le terme indépendant de x (0 s'il n'y en a pas).
  [free, sans aide]  exposant de x
    = 12 − 4k   ← Puissance de x : 2(6 − k) − 2k
  — Équation en k  [juge prob]  départ : k
    = 3   ← 12 − 4k = 0
  — Coefficient  [juge prob]  départ : coefficient
    = C(6;3)×2^3   ← Remplacer k dans le terme général
    = 20·8   ← C(6, 3) = 20
    = 160   ← Calculer
  pièges : g7_binomial_coef_power, g7_binomial_index

```

### Variantes d'examen

```
Dans le développement de (x − 1/x)⁶, quel est le coefficient de x⁶ ?
  ✔ 1   · −6 [g7_binomial_index]   · −1 [g7_binomial_sign]   · 2
  [examen mcq]
  pièges : g7_binomial_sign, g7_binomial_index

Vrai ou faux ?
  « Le coefficient de x^3 dans (1 + x)^7 est 7. » → FAUX
    contre-exemple (refute) : c = 35
  [examen tf]
  pièges : g7_binomial_coef_power

```

## Probabilité de Laplace (`g7-laplace`, Gymnase)

_Si toutes les issues sont équiprobables, P(A) = (nombre de cas favorables)/(nombre de cas possibles)._

### Niveau 1

```
Une urne contient 2 boules rouges et 5 bleues. On tire 3 boules à la fois. Quelle est la probabilité d'avoir exactement 0 rouge ?
  [guided]  |Ω|
    = C(□;3)   (trous : C(7;3))   ← Tirage simultané : sans ordre
    = □   (trous : 35)
  — |A|  [juge prob]  départ : |A|
    = C(2;□)×C(5;□)   (trous : C(2;0)×C(5;3))   ← 0 rouge parmi 2, 3 autres parmi 5
    = □   (trous : 10)
  — P(A)  [juge prob]  départ : P(A)
    = 10/□   (trous : 10/35)   ← Favorables / possibles
    = □   (trous : 2/7)   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(2;0)×C(5;3)/C(□;3) | 2/7
  pièges : g7_order_confusion

On tire 2 cartes d'un jeu de 32 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [guided]  |Ω|
    = C(□;2)   (trous : C(32;2))   ← Tirage simultané : sans ordre
    = □   (trous : 496)
  — |A|  [juge prob]  départ : |A|
    = C(4;□)×C(28;□)   (trous : C(4;1)×C(28;1))   ← 1 dame parmi 4, 1 autre parmi 28
    = □   (trous : 112)
  — P(A)  [juge prob]  départ : P(A)
    = 112/□   (trous : 112/496)   ← Favorables / possibles
    = □   (trous : 7/31)   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(28;1)/C(□;2) | 7/31
  pièges : g7_order_confusion

On tire 2 cartes d'un jeu de 36 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [guided]  |Ω|
    = C(□;2)   (trous : C(36;2))   ← Tirage simultané : sans ordre
    = □   (trous : 630)
  — |A|  [juge prob]  départ : |A|
    = C(4;□)×C(32;□)   (trous : C(4;1)×C(32;1))   ← 1 dame parmi 4, 1 autre parmi 32
    = □   (trous : 128)
  — P(A)  [juge prob]  départ : P(A)
    = 128/□   (trous : 128/630)   ← Favorables / possibles
    = □   (trous : 64/315)   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(32;1)/C(□;2) | 64/315
  pièges : g7_order_confusion

```

### Niveau 2

```
On tire 2 cartes d'un jeu de 36 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [guided]  |Ω|
    ? Comment compter ? ✔ Sans ordre, en haut et en bas / · Avec ordre pour les cas possibles, sans ordre pour les favorables
    = C(□;2)   (trous : C(36;2))   ← Tirage simultané : sans ordre
    = □   (trous : 630)
  — |A|  [juge prob]  départ : |A|
    = C(4;1)×□   (trous : C(4;1)×C(32;1))   ← 1 dame parmi 4, 1 autre parmi 32
    = □   (trous : 128)
  — P(A)  [juge prob]  départ : P(A)
    = 128/□   (trous : 128/630)   ← Favorables / possibles
    = □   (trous : 64/315)   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(32;1)/C(□;2) | 64/315
  pièges : g7_order_confusion

On tire 2 cartes d'un jeu de 32 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [guided]  |Ω|
    ? Comment compter ? ✔ Sans ordre, en haut et en bas / · Avec ordre pour les cas possibles, sans ordre pour les favorables
    = C(□;2)   (trous : C(32;2))   ← Tirage simultané : sans ordre
    = □   (trous : 496)
  — |A|  [juge prob]  départ : |A|
    = C(4;1)×□   (trous : C(4;1)×C(28;1))   ← 1 dame parmi 4, 1 autre parmi 28
    = □   (trous : 112)
  — P(A)  [juge prob]  départ : P(A)
    = 112/□   (trous : 112/496)   ← Favorables / possibles
    = □   (trous : 7/31)   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(28;1)/C(□;2) | 7/31
  pièges : g7_order_confusion

On lance deux dés équilibrés. Quelle est la probabilité que la somme vaille 9 ?
  [guided]  |Ω|
    ? Quelles issues sont équiprobables ? ✔ Les 36 couples (dé 1 ; dé 2) / · Les 11 sommes de 2 à 12
    = □·6   (trous : 6·6)   ← Couples (dé 1 ; dé 2), tous équiprobables
    = □   (trous : 36)
  — |A|  [juge prob]  départ : |A|
    = □   (trous : 4)   ← (3 ; 6), (4 ; 5), (5 ; 4), (6 ; 3)
  — P(A)  [juge prob]  départ : P(A)
    = 4/□   (trous : 4/36)   ← Favorables / possibles
    = □   (trous : 1/9)   ← Simplifier
  aides : Les issues équiprobables sont les couples (dé 1 ; dé 2) : il y en a 36. Compte ceux qui donnent la somme. | □/36 | 1/9
  pièges : g7_laplace_not_equiprobable

```

### Niveau 3

```
Une urne contient 7 boules rouges et 4 bleues. On tire 2 boules à la fois. Quelle est la probabilité d'avoir exactement 1 rouge ?
  [tap, suivre l'erreur, menu menu]  |Ω|
    = C(11;2)   ← Tirage simultané : sans ordre
    = 55
  — |A|  [juge prob]  départ : |A|
    = C(7;1)×C(4;1)   ← 1 rouge parmi 7, 1 autre parmi 4
    = 28
  — P(A)  [juge prob]  départ : P(A)
    = 28/55   ← Favorables / possibles
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(7;1)×C(4;1)/C(□;2) | 28/55
  pièges : g7_order_confusion

On tire 4 cartes d'un jeu de 32 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [tap, suivre l'erreur, menu menu]  |Ω|
    = C(32;4)   ← Tirage simultané : sans ordre
    = 35960
  — |A|  [juge prob]  départ : |A|
    = C(4;1)×C(28;3)   ← 1 dame parmi 4, 3 autres parmi 28
    = 13104
  — P(A)  [juge prob]  départ : P(A)
    = 13104/35960   ← Favorables / possibles
    = 1638/4495   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(28;3)/C(□;4) | 1638/4495
  pièges : g7_order_confusion

Une urne contient 7 boules rouges et 3 bleues. On tire 2 boules à la fois. Quelle est la probabilité d'avoir exactement 1 rouge ?
  [tap, suivre l'erreur, menu menu]  |Ω|
    = C(10;2)   ← Tirage simultané : sans ordre
    = 45
  — |A|  [juge prob]  départ : |A|
    = C(7;1)×C(3;1)   ← 1 rouge parmi 7, 1 autre parmi 3
    = 21
  — P(A)  [juge prob]  départ : P(A)
    = 21/45   ← Favorables / possibles
    = 7/15   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(7;1)×C(3;1)/C(□;2) | 7/15
  pièges : g7_order_confusion

```

### Niveau 4

```
On tire 4 cartes d'un jeu de 32 cartes (4 dames). Quelle est la probabilité d'avoir exactement 1 dame ?
  [free, suivre l'erreur]  |Ω|
    = C(32;4)   ← Tirage simultané : sans ordre
    = 35960
  — |A|  [juge prob]  départ : |A|
    = C(4;1)×C(28;3)   ← 1 dame parmi 4, 3 autres parmi 28
    = 13104
  — P(A)  [juge prob]  départ : P(A)
    = 13104/35960   ← Favorables / possibles
    = 1638/4495   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;1)×C(28;3)/C(□;4) | 1638/4495
  pièges : g7_order_confusion

On lance deux dés équilibrés. Quelle est la probabilité que la somme vaille 10 ?
  [free, suivre l'erreur]  |Ω|
    = 6·6   ← Couples (dé 1 ; dé 2), tous équiprobables
    = 36
  — |A|  [juge prob]  départ : |A|
    = 3   ← (4 ; 6), (5 ; 5), (6 ; 4)
  — P(A)  [juge prob]  départ : P(A)
    = 3/36   ← Favorables / possibles
    = 1/12   ← Simplifier
  aides : Les issues équiprobables sont les couples (dé 1 ; dé 2) : il y en a 36. Compte ceux qui donnent la somme. | □/36 | 1/12
  pièges : g7_laplace_not_equiprobable

On tire 3 cartes d'un jeu de 32 cartes (4 dames). Quelle est la probabilité d'avoir exactement 2 dames ?
  [free, suivre l'erreur]  |Ω|
    = C(32;3)   ← Tirage simultané : sans ordre
    = 4960
  — |A|  [juge prob]  départ : |A|
    = C(4;2)×C(28;1)   ← 2 dames parmi 4, 1 autre parmi 28
    = 168
  — P(A)  [juge prob]  départ : P(A)
    = 168/4960   ← Favorables / possibles
    = 21/620   ← Simplifier
  aides : Compte sans ordre en haut et en bas : C(N, k) cas possibles. | C(4;2)×C(28;1)/C(□;3) | 21/620
  pièges : g7_order_confusion

```

### Niveau 5

```
Une urne contient 4 boules rouges et 5 bleues. On tire 2 boules à la fois. Quelle est la probabilité d'avoir au moins une rouge ?
  [free, sans aide]  P(Aᶜ)
    (A = « au moins une rouge » ; son contraire Aᶜ = « aucune rouge ».)
    = C(5;2)/C(9;2)   ← Seulement des bleues
    = 5/18   ← Simplifier
  — Au moins une rouge  [juge prob]  départ : P(A)
    = 1 − 5/18   ← Complément
    = 13/18   ← Résultat
  pièges : g7_order_confusion

Une urne contient 4 boules rouges et 3 bleues. On tire 3 boules à la fois. Quelle est la probabilité d'avoir au moins une rouge ?
  [free, sans aide]  P(Aᶜ)
    (A = « au moins une rouge » ; son contraire Aᶜ = « aucune rouge ».)
    = C(3;3)/C(7;3)   ← Seulement des bleues
    = 1/35   ← Simplifier
  — Au moins une rouge  [juge prob]  départ : P(A)
    = 1 − 1/35   ← Complément
    = 34/35   ← Résultat
  pièges : g7_order_confusion

Une urne contient 3 boules rouges et 5 bleues. On tire 2 boules à la fois. Quelle est la probabilité d'avoir au moins une rouge ?
  [free, sans aide]  P(Aᶜ)
    (A = « au moins une rouge » ; son contraire Aᶜ = « aucune rouge ».)
    = C(5;2)/C(8;2)   ← Seulement des bleues
    = 5/14   ← Simplifier
  — Au moins une rouge  [juge prob]  départ : P(A)
    = 1 − 5/14   ← Complément
    = 9/14   ← Résultat
  pièges : g7_order_confusion

```

### Variantes d'examen

```
Une urne contient 2 boules rouges et 5 bleues. On tire 2 boules à la fois. Quelle est la probabilité d'avoir exactement 2 rouges ?
  ✔ 1/21   · 20/21   · 1/42 [g7_order_confusion]   · 1/11
  [examen mcq]
  pièges : g7_order_confusion

```

## Arbres de probabilité (`g7-tree`, Gymnase)

_On multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement._

### Niveau 1

```
Une urne contient 4 boules rouges et 4 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [guided]  P(BB)
    = 4/8·□   (trous : 4/8·3/7)   ← Chemin B puis B (sans remise)
    = □   (trous : 3/14)   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 3/14   ← « Au moins une rouge » = contraire de « BB »
    = □   (trous : 11/14)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 1/2×□ | 11/14
  pièges : g7_tree_with_replacement

Une urne contient 4 boules rouges et 4 bleues. On tire deux boules, l'une après l'autre, avec remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [guided]  P(BB)
    = □·4/8   (trous : 4/8·4/8)   ← Chemin B puis B
    = □   (trous : 1/4)   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 1/4   ← « Au moins une rouge » = contraire de « BB »
    = □   (trous : 3/4)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 1/2×□ | 3/4

Une urne contient 5 boules rouges et 2 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité que la 2e boule soit rouge ?
  [guided]  P(RR)
    = 5/7·□   (trous : 5/7·4/6)   ← Chemin R puis R (sans remise)
    = □   (trous : 10/21)   ← Calculer
  — P(BR)  [juge prob]  départ : P(BR)
    = 2/7·□   (trous : 2/7·5/6)   ← Chemin B puis R (sans remise)
    = □   (trous : 5/21)   ← Calculer
  — Additionner les chemins  [juge prob]  départ : P
    = 10/21 + 5/21   ← Additionner les chemins
    = □   (trous : 5/7)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 5/7×□ | 5/7
  pièges : g7_tree_with_replacement

```

### Niveau 2

```
Une urne contient 3 boules rouges et 5 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité que la 2e boule soit rouge ?
  [guided]  P(RR)
    ? Au 2e tirage, les probabilités… ✔ changent : il reste une boule de moins / · restent celles du 1er tirage
    = 3/8·□   (trous : 3/8·2/7)   ← Chemin R puis R (sans remise)
    = □   (trous : 3/28)   ← Calculer
  — P(BR)  [juge prob]  départ : P(BR)
    = 5/8·□   (trous : 5/8·3/7)   ← Chemin B puis R (sans remise)
    = □   (trous : 15/56)   ← Calculer
  — Additionner les chemins  [juge prob]  départ : P
    = 3/28 + 15/56   ← Additionner les chemins
    = □   (trous : 3/8)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 3/8×□ | 3/8
  pièges : g7_tree_with_replacement

Une urne contient 5 boules rouges et 5 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [guided]  P(BB)
    ? Au 2e tirage, les probabilités… ✔ changent : il reste une boule de moins / · restent celles du 1er tirage
    = 5/10·□   (trous : 5/10·4/9)   ← Chemin B puis B (sans remise)
    = □   (trous : 2/9)   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 2/9   ← « Au moins une rouge » = contraire de « BB »
    = □   (trous : 7/9)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 1/2×□ | 7/9
  pièges : g7_tree_with_replacement

Une urne contient 4 boules rouges et 4 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [guided]  P(BB)
    ? Au 2e tirage, les probabilités… ✔ changent : il reste une boule de moins / · restent celles du 1er tirage
    = 4/8·□   (trous : 4/8·3/7)   ← Chemin B puis B (sans remise)
    = □   (trous : 3/14)   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 3/14   ← « Au moins une rouge » = contraire de « BB »
    = □   (trous : 11/14)   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 1/2×□ | 11/14
  pièges : g7_tree_with_replacement

```

### Niveau 3

```
Une urne contient 5 boules rouges et 2 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité que la 2e boule soit rouge ?
  [tap, suivre l'erreur, menu menu]  P(RR)
    = 5/7·4/6   ← Chemin R puis R (sans remise)
    = 10/21   ← Calculer
  — P(BR)  [juge prob]  départ : P(BR)
    = 2/7·5/6   ← Chemin B puis R (sans remise)
    = 5/21   ← Calculer
  — Additionner les chemins  [juge prob]  départ : P
    = 10/21 + 5/21   ← Additionner les chemins
    = 5/7   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 5/7×□ | 5/7
  pièges : g7_tree_with_replacement

Une urne contient 6 boules rouges et 4 bleues. On tire deux boules, l'une après l'autre, avec remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [tap, suivre l'erreur, menu menu]  P(BB)
    = 4/10·4/10   ← Chemin B puis B
    = 4/25   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 4/25   ← « Au moins une rouge » = contraire de « BB »
    = 21/25   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 2/5×□ | 21/25

Une urne contient 6 boules rouges et 2 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [tap, suivre l'erreur, menu menu]  P(BB)
    = 2/8·1/7   ← Chemin B puis B (sans remise)
    = 1/28   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 1/28   ← « Au moins une rouge » = contraire de « BB »
    = 27/28   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 1/4×□ | 27/28
  pièges : g7_tree_with_replacement

```

### Niveau 4

```
Une urne contient 5 boules rouges et 4 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  [free, suivre l'erreur]  P(BB)
    = 4/9·3/8   ← Chemin B puis B (sans remise)
    = 1/6   ← Calculer
  — Complément  [juge prob]  départ : P
    = 1 − 1/6   ← « Au moins une rouge » = contraire de « BB »
    = 5/6   ← Résultat
  aides : Multiplie le long d'un chemin, additionne les chemins. | 4/9×□ | 5/6
  pièges : g7_tree_with_replacement

20 % d'une population est malade. Un test est positif chez 95 % des malades et chez 20 % des personnes saines. Quelle est la probabilité qu'une personne prise au hasard ait un test positif ?
  [free, suivre l'erreur]  P(M∩+)
    = 0,2·0,95   ← Chemin malade → positif
    = 0,19
  — P(S∩+)  [juge prob]  départ : P(S∩+)
    = 0,8·0,2   ← Chemin sain → positif
    = 0,16
  — P(+)  [juge prob]  départ : P(+)
    = 0,19 + 0,16   ← Additionner les chemins
    = 0,35   ← Résultat
  aides : Deux chemins mènent à « positif » : malade puis positif, sain puis positif. | 0,2×0,95+□ | 0,35

30 % d'une population est malade. Un test est positif chez 95 % des malades et chez 20 % des personnes saines. Quelle est la probabilité qu'une personne prise au hasard ait un test positif ?
  [free, suivre l'erreur]  P(M∩+)
    = 0,3·0,95   ← Chemin malade → positif
    = 0,285
  — P(S∩+)  [juge prob]  départ : P(S∩+)
    = 0,7·0,2   ← Chemin sain → positif
    = 0,14
  — P(+)  [juge prob]  départ : P(+)
    = 0,285 + 0,14   ← Additionner les chemins
    = 0,425   ← Résultat
  aides : Deux chemins mènent à « positif » : malade puis positif, sain puis positif. | 0,3×0,95+□ | 0,425

```

### Niveau 5

```
Une urne contient 3 boules rouges et 3 bleues. On tire trois boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'elles soient toutes de la même couleur ?
  [free, sans aide]  P(RRR)
    = 3/6·2/5·1/4   ← Chemin RRR
    = 1/20   ← Calculer
  — P(BBB)  [juge prob]  départ : P(BBB)
    = 3/6·2/5·1/4   ← Chemin BBB
    = 1/20   ← Calculer
  — P  [juge prob]  départ : P
    = 1/20 + 1/20   ← Additionner les chemins
    = 1/10   ← Résultat
  pièges : g7_tree_with_replacement

Une urne contient 6 boules rouges et 3 bleues. On tire trois boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'elles soient toutes de la même couleur ?
  [free, sans aide]  P(RRR)
    = 6/9·5/8·4/7   ← Chemin RRR
    = 5/21   ← Calculer
  — P(BBB)  [juge prob]  départ : P(BBB)
    = 3/9·2/8·1/7   ← Chemin BBB
    = 1/84   ← Calculer
  — P  [juge prob]  départ : P
    = 5/21 + 1/84   ← Additionner les chemins
    = 1/4   ← Résultat
  pièges : g7_tree_with_replacement

Une urne contient 4 boules rouges et 6 bleues. On tire trois boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'elles soient toutes de la même couleur ?
  [free, sans aide]  P(RRR)
    = 4/10·3/9·2/8   ← Chemin RRR
    = 1/30   ← Calculer
  — P(BBB)  [juge prob]  départ : P(BBB)
    = 6/10·5/9·4/8   ← Chemin BBB
    = 1/6   ← Calculer
  — P  [juge prob]  départ : P
    = 1/30 + 1/6   ← Additionner les chemins
    = 1/5   ← Résultat
  pièges : g7_tree_with_replacement

```

### Variantes d'examen

```
Une urne contient 5 boules rouges et 3 bleues. On tire deux boules, l'une après l'autre, sans remise. Quelle est la probabilité qu'au moins une boule soit rouge ?
  ✔ 25/28   · 25/29   · 3/28   · 55/64 [g7_tree_with_replacement]
  [examen mcq]
  pièges : g7_tree_with_replacement

```

## Pièges de cette unité

- **Additionner au lieu de multiplier** (`g7_add_instead_multiply`, E) : 26 + 26 + 9 + 10 + 10 au lieu de 26 · 26 · 9 · 10 · 10
- **Contrainte de l'énoncé oubliée** (`g7_constraint_ignored`, E) : 26² · 10³ au lieu de 26² · 9 · 10²
- **Factorielles simplifiées comme des fractions** (`g7_factorial_quotient`, E) : (n + 1)!/(n − 1)! = (n + 1)/(n − 1) au lieu de (n + 1)!/(n − 1)! = n(n + 1)
- **Lettres répétées comptées comme différentes** (`g7_anagram_repeats`, E) : RADAR : 5! = 120 au lieu de 5!/(2!·2!) = 30
- **Ordre compté à tort (ou oublié)** (`g7_order_confusion`, R) : comité : A(7, 3) = 210 au lieu de C(7, 3) = 35
- **Répétition permise ou interdite confondue** (`g7_repetition_confusion`, R) : code : A(10, 4) = 5040 au lieu de 10⁴ = 10 000
- **Signe du binôme oublié** (`g7_binomial_sign`, E) : coefficient de x⁴ dans (2x − 1/x)⁸ avec (−1)ᵏ oublié au lieu de (−1)² · C(8, 2) · 2⁶ = 1792
- **Coefficient de x pas élevé à la puissance** (`g7_binomial_coef_power`, E) : C(8, 2) = 28 au lieu de 28 · 2⁶ = 1792
- **Rang du terme décalé d'un cran** (`g7_binomial_index`, E) : « 3e terme » avec k = 3 au lieu de k = 2
- **Issues supposées équiprobables** (`g7_laplace_not_equiprobable`, R) : P(somme 7) = 1/11 au lieu de 6/36 = 1/6
- **Deuxième tirage comme s'il y avait remise** (`g7_tree_with_replacement`, E) : 3/5 · 3/5 sans remise au lieu de 3/5 · 2/4
