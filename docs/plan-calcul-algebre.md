# Plan : livrets, arithmétique et algèbre

Proposition du 9 novembre 2026. L'étape 1 (livrets et calcul mental) est construite ; le reste est à venir.

## 1. Le but final, et ce qu'il demande

L'objectif est que l'élève résolve seul, pas à pas, une équation comme :

> a·x² + b·x / (3c·x) = (6x + 2)²  →  trouver x

Voici la résolution complète. Chaque ligne demande une compétence différente, ce qui donne la liste des modules :

| Étape | Ce qu'on écrit | Compétence (module) |
|---|---|---|
| 1 | Conditions : x ≠ 0 et c ≠ 0 | Valeurs interdites (fractions rationnelles) |
| 2 | b·x / (3c·x) = b / (3c) | Simplifier une fraction en factorisant, sans « barrer des termes » |
| 3 | (6x + 2)² = 36x² + 24x + 4 | Identités remarquables |
| 4 | a·x² + b/(3c) = 36x² + 24x + 4 | Recopier une équation en transformant un seul membre |
| 5 | (a − 36)·x² − 24x + b/(3c) − 4 = 0 | Tout passer d'un côté, réduire, ordonner selon x |
| 6 | Si a = 36 : équation du 1er degré, x = (b/(3c) − 4) / 24 | Discussion selon un paramètre |
| 7 | Sinon : Δ = 576 − 4(a − 36)(b/(3c) − 4) | Discriminant avec des lettres |
| 8 | x = (24 ± √Δ) / (2(a − 36)), si Δ ≥ 0 | Formule, avec paramètres |
| 9 | Retirer x = 0 s'il apparaît (cas b/(3c) = 4) | Vérifier les solutions par rapport aux conditions |

On voit qu'il faut, en plus de ce que tu as listé : les valeurs interdites, la réduction et l'ordre d'un polynôme, la discussion selon un paramètre et la vérification des solutions. Je les ai ajoutés aux modules.

## 2. Principes pédagogiques retenus

| Principe | Ce que dit la recherche | Ce que fait l'app |
|---|---|---|
| **Comprendre avant de mémoriser** (livrets) | Les faits numériques s'apprennent mieux à partir de stratégies (doubles, « +10 puis −1 », 9 × n = 10 × n − n) que par répétition pure ; la récupération en mémoire vient ensuite (Baroody 2006). | Chaque table commence par une carte « astuce » et quelques calculs guidés, puis passe en séries rapides. |
| **Peu de nouveau, beaucoup de connu** | La « répétition incrémentale » mêle un fait nouveau à plusieurs faits déjà sus. Elle donne une meilleure rétention que la répétition en bloc (MacQuarrie et al. 2002). Les méta-analyses sur la fluidité des faits concluent dans le même sens (Codding, Burns & Lukito 2011). | Dans une série, environ 1 fait nouveau ou fragile pour 3 à 5 faits connus. Un fait raté revient 2 à 3 questions plus tard, puis lors des sessions suivantes. |
| **La vitesse sans stress** | L'anxiété mathématique apparaît tôt et pèse sur la performance (Ramirez et al. 2013). Les chronos affichés et la compétition entre élèves l'augmentent. | Le temps de réponse est mesuré, mais aucun chrono n'est affiché. On compare l'élève seulement à son propre record. Un fait compte comme « automatisé » quand il est juste en moins de 3 s environ (seuil à régler). |
| **Erreurs voisines** | Les erreurs de tables sont surtout des résultats de faits voisins, par exemple 7 × 8 = 54 au lieu de 56 (Campbell & Graham 1985). | Le diagnostic reconnaît « résultat d'une table voisine » et propose ces valeurs comme pièges dans les QCM. |
| **Espacer et alterner** | La répétition espacée (Cepeda et al. 2006) et le fait de se tester (Roediger & Karpicke 2006) améliorent la mémoire. Mélanger les types de problèmes oblige à choisir la méthode et améliore les résultats en maths (Rohrer, Dedrick & Stershic 2015). | Déjà en place. Les révisions mélangent les modules, par exemple « développer » et « factoriser » dans la même série. |
| **Exemples résolus, puis estompés** | Un exemple résolu, puis des étapes à compléter, puis le calcul seul (Renkl & Atkinson 2003). Les élèves forts n'en profitent plus et doivent pouvoir les sauter (Kalyuga et al. 2003). | Le schéma de l'app reste le même : intro, étapes à trous, toucher l'opération, lignes libres. Le test rapide fait sauter ce qui est su. |
| **Le signe = est une relation** | Les élèves qui lisent « = » comme « donne le résultat » réussissent moins bien les équations (Knuth et al. 2006 ; Kieran 1981). | Avant les équations, des exercices courts : « 8 + 4 = … + 5 », « x = 3 est-il solution ? », « ces deux écritures sont-elles égales ? ». |
| **La balance a ses limites** | Le modèle de la balance aide pour ax + b = cx + d avec des nombres positifs, mais il ne marche plus avec les négatifs (Vlassis 2002). | La règle enseignée est « on fait la même opération des deux côtés », jamais « on change de côté, on change de signe ». Ce raccourci est traité comme un piège quand il est mal appliqué, par exemple 3x = 12 → x = 12 − 3. |
| **Voir la structure** | Les fausses règles d'algèbre viennent souvent de ce que l'écriture « ressemble » à une règle juste, comme (a+b)² = a²+b² (Kirshner & Awtry 2004). Des exercices très courts de reconnaissance rendent les élèves plus rapides et plus justes (Kellman et al. 2010). | Un nouveau type d'exercice éclair : « Égal ou pas ? » et « Quelle est la prochaine étape ? ». On répond en 2 à 5 s, et ces questions sont mélangées aux calculs. |
| **Comparer deux méthodes** | Voir côte à côte deux méthodes justes pour le même problème développe la flexibilité (Rittle-Johnson & Star 2007). C'est aussi une recommandation du guide IES sur l'algèbre (Star et al. 2015). | Pour le 2e degré, la même équation est résolue par factorisation et par la formule, puis on demande : « laquelle est la plus rapide ici ? ». |
| **Du concret vers le symbolique** | Les débutants réussissent mieux un problème en mots que la même équation écrite en symboles (Koedinger & Nathan 2004). | On commence par des énoncés en mots et des formules de physique (d = v·t), puis on passe aux lettres seules. Ces exercices préparent aussi le futur module de physique. |
| **Diagnostiquer les fausses règles** | Les erreurs d'algèbre sont souvent des règles cohérentes mais fausses : Matz 1982, Booth 1984, la lettre vue comme un objet chez Küchemann 1981, et le catalogue MalruleLib. | Même mécanique qu'aujourd'hui. Une ligne fausse est rejouée sous chaque fausse règle pour nommer l'erreur, et l'explication s'affiche en grand. |

## 3. Les modules

Les années viennent de la progression bernoise du PER (cycle 3) quand elle en parle :
- 9H : critères de divisibilité, PGDC, PPMC, nombres premiers, décomposition en facteurs (niveaux B et A), valeur d'une expression littérale ;
- 10H : équations du 1er degré ;
- 11H : polynômes ; identités et factorisation (niveau A) ; isoler une variable dans une formule (B et A) ; systèmes et 2e degré (niveau A).

Ce qui dépasse le PER est marqué **Gym** (gymnase, 12H et plus). Les années des livrets sont celles du cycle 2, à confirmer avec le PER.

### A. Livrets et calcul mental (5H–8H, puis révision pour tous)

| Compétence | Contenu | Exemple |
|---|---|---|
| Additions jusqu'à 20 | Faire 10, doubles, presque doubles | 8 + 7 = 8 + 2 + 5 |
| Soustractions jusqu'à 20 | Penser à l'addition (« combien pour aller de 8 à 13 ? ») | 13 − 8 |
| Ajouter ou retirer un nombre à 1 chiffre | Avec passage de la dizaine | 47 + 8, 52 − 7 |
| Ajouter ou retirer un nombre à 2 chiffres | Décomposer, compenser | 47 + 38 = 47 + 40 − 2 |
| Livrets ×2, ×5, ×10 | Points d'appui | 5 × 7 = la moitié de 10 × 7 |
| Livrets ×3, ×4, ×9 | Double du double, 10n − n | 9 × 6 = 60 − 6 |
| Livrets ×6, ×7, ×8 | Derniers faits, à partir des faits connus | 7 × 8 = 7 × 4 × 2 |
| Divisions des livrets | Familles de faits | 56 : 8 |
| Livrets ×11 et ×12 | | 12 × 7 |
| Carrés jusqu'à 13² | Liés à 10 × 10 | 13 × 13 = 169 |
| Carrés de 14² à 25² | Astuces : (20 + k)² et les carrés en 5 | 15² = 225, 23² = 529 |
| Calcul mental mixte | Doubles, moitiés, ×25, ×50 | 36 × 25 = 9 × 100 |

Ce module utilise un nouveau mode « série rapide » :
- 10 à 20 faits d'affilée, sans bouton « Vérifier » : une bonne réponse passe directement à la suivante ;
- chaque fait a sa propre mémoire de répétition espacée, comme une carte de révision ;
- grâce à la commutativité, la table de 10 × 10 ne compte que 55 faits différents, plus les ×11, ×12 et les carrés jusqu'à 25.

### B. Arithmétique : diviseurs et nombres premiers (9H, niveaux B et A)

| Compétence | Contenu | Exemple |
|---|---|---|
| Critères de divisibilité | Par 2, 3, 4, 5, 9 et 10 | 4 152 est-il divisible par 3 ? |
| Multiples et diviseurs | Lister les diviseurs, multiples communs | Diviseurs de 36 |
| Nombres premiers | Jusqu'à 100 ; 1 n'est pas premier | 51 est-il premier ? |
| Décomposer en facteurs premiers | Arbre, écriture avec puissances | 360 = 2³ × 3² × 5 |
| PGDC et PPMC | Par la décomposition | PGDC(84, 126) |
| Application aux fractions | Simplifier d'un coup, dénominateur commun = PPMC | 84/126 = 2/3 |
| Application aux racines (11H A) | Sortir un carré de la racine | √72 = 6√2 |

La dernière ligne comble la limite actuelle de l'unité Racines, où √50 = 5√2 n'est pas couvert.

### C. Calcul littéral (9H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Écritures et conventions | 3·x = 3x, x·x = x², 1x = x | |
| Valeur d'une expression | Substituer, y compris un nombre négatif | 3x² − 7 pour x = −2 |
| Traduire en expression | À partir d'une figure ou d'une phrase | Périmètre d'un rectangle |
| Égal ou pas ? | Exercice éclair d'équivalence | 2(x + 3) et 2x + 6 ? |
| Réduire | Termes semblables | 3x + 5 − x + 2 = 2x + 7 |
| Multiplier des monômes | Puissances de x | 3x² · 4x = 12x³ |
| Développer : distributivité simple | Y compris le − devant une parenthèse | −2(x − 5) |
| Double distributivité | | (x + 3)(2x − 1) |
| Identités remarquables : développer (11H A) | (a ± b)², (a + b)(a − b) | (3x − 2)² |
| Développer, réduire et ordonner | Polynômes jusqu'au degré 3, avec plusieurs lettres | |

### D. Factorisation algébrique (11H A)

| Compétence | Contenu | Exemple |
|---|---|---|
| Facteur commun numérique | | 6x + 9 = 3(2x + 3) |
| Facteur commun littéral | | 4x² − 6x = 2x(2x − 3) |
| Parenthèse en facteur commun | | (x + 1)(x − 2) + 3(x + 1) |
| Identités remarquables à l'envers | a² − b², a² ± 2ab + b² | 9x² − 25 |
| Trinôme x² + bx + c | Somme et produit | x² − x − 6 = (x − 3)(x + 2) |
| Trinôme ax² + bx + c (Gym) | Méthode ac, regroupement | 6x² + x − 2 |
| Factoriser complètement | Enchaîner les méthodes | 2x³ − 8x = 2x(x − 2)(x + 2) |

### E. Équations (10H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Le sens de « = » | Nombre manquant, « x = 3 est-il solution ? » | 8 + 4 = … + 5 |
| Équation en une étape | +, −, ×, ÷ | x/4 = 3 |
| Équation en deux étapes | | 3x + 5 = 20 |
| Inconnue des deux côtés | | 5x − 3 = 2x + 9 |
| Avec parenthèses | | 3(x − 2) = x + 4 |
| Avec fractions | Multiplier par le PPMC des dénominateurs | x/3 + x/4 = 7 |
| Produit en croix, proportions | | (x + 1)/3 = 5/2 |
| Mettre en équation | Problèmes en mots | |
| Équation produit nul (11H A) | | (x − 2)(3x + 1) = 0 |
| Systèmes 2 × 2 (11H A) | Substitution, combinaison | 2x + y = 7 et x − y = 2 |

### F. Isoler une variable (11H B et A, puis Gym)

| Compétence | Contenu | Exemple |
|---|---|---|
| Produits et quotients | | a·b·c = d → b = d / (a·c) ; d = v·t → t |
| Sommes et produits | | P = 2(L + l) → l = P/2 − L |
| Fractions | | 1/f = 1/a + 1/b → a ; A = (B + b)h/2 → b |
| Puissances et racines | Avec la condition de signe | E = ½mv² → v ; A = πr² → r |
| Variable présente deux fois | On la met en facteur | ax + b = cx → x = b / (c − a), si c ≠ a |
| Formules de physique | Le pont vers le futur module de physique | P = U·I, ρ = m/V, v² = v₀² + 2ad |

### G. Fractions rationnelles (Gym)

| Compétence | Contenu | Exemple |
|---|---|---|
| Valeurs interdites | | (x + 1)/(x² − 4) |
| Simplifier | Factoriser d'abord, puis simplifier ; piège « barrer des termes » | (x² − 9)/(x + 3) = x − 3 |
| Multiplier et diviser | | |
| Additionner | Dénominateur commun | 1/x + 2/(x + 1) |
| Équations rationnelles | Multiplier par les dénominateurs, puis vérifier les valeurs interdites | |

### H. Équations du 2e degré (11H A, puis Gym)

| Compétence | Contenu | Exemple |
|---|---|---|
| x² = k | 2, 1 ou 0 solutions ; s'appuie sur l'unité Racines | x² = 49 |
| (x − p)² = k | | (x − 3)² = 16 |
| Par factorisation | Facteur commun, identités, somme et produit, puis produit nul | x² − 5x = 0 |
| Compléter le carré (Gym) | | x² + 6x + 2 = 0 |
| Discriminant et formule | Nombre de solutions selon Δ | 2x² − 3x − 5 = 0 |
| Choisir la méthode | Comparer factorisation et formule sur la même équation | |
| Ramener au 2e degré (Gym) | Équations rationnelles ou à paramètres | x + 6/x = 5 |

### I. Synthèse : équations avec paramètres (Gym)

| Compétence | Contenu |
|---|---|
| Isoler x dans une équation du 1er degré à paramètres | Avec discussion : a = 0 ? |
| Équation du 2e degré à paramètres | Δ et formule avec des lettres |
| Le problème final | Conditions, simplification, identité, réduction, discussion, formule, vérification (§1) |

### J. Proportionnalité et pourcentages (9H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Situation proportionnelle ou pas ? | Reconnaître ; piège de « l'illusion de linéarité » | L'aire double-t-elle si le côté double ? |
| Règle de trois, coefficient | Tableau, passage à l'unité, coefficient | 3 kg coûtent 7,50 CHF ; 5 kg ? |
| Échelle | Plan et carte, dans les deux sens | 1 : 25 000, 4 cm → ? km |
| Pourcentage d'une quantité | Calcul mental puis calcul exact | 15 % de 80 |
| Quel pourcentage ? | Part en % | 12 sur 48 = 25 % |
| Hausse et baisse en % | Coefficient multiplicateur (× 1,2 ; × 0,85) | Prix après −15 % |
| Retrouver la valeur de départ | Diviser par le coefficient | Après +20 %, 96 CHF : prix initial ? |
| Pourcentages successifs | + 10 % puis − 10 % ≠ 0 % | |
| Vitesse moyenne | d = v · t, avec unités | 150 km en 1 h 30 |
| Pente | En %, et comme rapport | 12 m de montée sur 200 m |

### K. Grandeurs et unités (cycle 2, puis 9H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Longueurs | km, m, dm, cm, mm | 3,4 km = … m |
| Masses et capacités | t, kg, g, mg ; L, dL, cL, mL | 250 mL = … L |
| Temps | h, min, s ; heures décimales | 1,5 h = 1 h 30 min |
| Aires | Facteur 100 entre unités voisines, ares et hectares | 1 m² = 10 000 cm² |
| Volumes | Facteur 1 000 ; 1 dm³ = 1 L | 2,5 m³ = … L |
| Vitesses | km/h ↔ m/s (÷ 3,6) | 90 km/h = … m/s |
| Aires et volumes avec unités non métriques | Pouce (2,54 cm), pied (30,48 cm), yard, mile, gallon : le facteur se met au carré ou au cube, on ne peut plus « décaler les zéros » | 1 pied² = 30,48² cm² ≈ 929 cm² ; 1 pied³ ≈ 28,3 L |
| Notation scientifique avec unités | Le pont vers la physique | 3 · 10⁸ m/s |

### L. Fonctions (9H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Lire un graphique | Coordonnées, lire une valeur | Que vaut f(3) ? |
| Tableau de valeurs | Depuis une « machine » ou une expression | x ↦ 2x − 1 |
| Placer des points | Sur un repère | |
| Fonction linéaire x ↦ ax | Proportionnalité, droite par l'origine | |
| Fonction affine x ↦ ax + b | Pente et ordonnée à l'origine | |
| Passer d'une représentation à l'autre | Expression ↔ tableau ↔ graphique | |
| Retrouver l'expression depuis le graphique (11H) | Lire la pente et b | |
| Intersection de deux droites | Lien avec les systèmes 2 × 2 | |

### M. Géométrie calculée (9H–11H)

| Compétence | Contenu | Exemple |
|---|---|---|
| Aires par formule | Rectangle, triangle, trapèze, disque | A = (B + b)h/2 |
| Volumes par formule | Prisme, cylindre, pyramide, cône (Niv. A) | V = πr²h |
| Cercle et π | Périmètre et aire, sans confondre 2πr et πr² | |
| Grandeur manquante | Réutilise « isoler une variable » | A = πr² → r |
| Pythagore (10H B et A) | Hypoténuse, côté de l'angle droit, réciproque | 6, 8 → 10 |
| Thalès et figures semblables (11H B et A) | Rapports, longueur manquante | |
| Agrandir et réduire | Longueurs × k, aires × k², volumes × k³ | |

### N. Écritures d'un nombre (9H–11H)

Ces compétences complètent les unités existantes plutôt que de former une unité à part.

| Compétence | Unité d'accueil | Exemple |
|---|---|---|
| Décimal ↔ fraction ↔ pourcentage | Fractions | 0,375 = 3/8 = 37,5 % |
| Fractions décimales périodiques | Fractions | 1/3 = 0,333… |
| Ensembles ℕ, ℤ, ℚ, ℝ | Racines | −4/2 est-il entier ? |
| Rationnel ou irrationnel ? | Racines | √49, √50, π, 0,25 |
| Racines cubiques (11H) | Racines | ∛64, ∛−8 |

### Arrondir, estimer, ordre de grandeur

Pas d'unité séparée :
- **Calcul mental (A)** : deux compétences, « Arrondir » (à l'unité, au dixième, à la dizaine) et « Estimer un résultat » (49 × 21 ≈ 1 000).
- **Ailleurs** : questions d'estimation glissées dans la proportionnalité, les unités, la géométrie et les racines (√50 ≈ 7,1). Par exemple : « avant de calculer, quel ordre de grandeur ? ».

Au total, environ 110 nouvelles compétences, contre 35 aujourd'hui.

## 4. Pièges à reconnaître

Même format que [error-catalogue.md](error-catalogue.md). Les étiquettes : [R] recherche, [E] expérience de classe, à faire vérifier par un enseignant.

| Module | Piège | Faux → juste | Tag |
|---|---|---|---|
| Livrets | Résultat d'une table voisine | 7 × 8 = 54 → 56 | R (Campbell & Graham) |
| Livrets | Addition à la place de ×, ou l'inverse | 3 × 4 = 7 | R |
| Livrets | n × 0 = n, n × 1 = n + 1 | | E |
| Calcul mental | Compensation dans le mauvais sens | 47 + 38 = 47 + 40 + 2 | E |
| Carrés | Élever chaque chiffre au carré | 23² = 49 au lieu de 529 | E |
| Arithmétique | 1 est premier, 9 est premier, 2 ne l'est pas | | E |
| Arithmétique | Décomposition incomplète | 12 = 2 × 6 | E |
| Arithmétique | Confondre PGDC et PPMC | | E |
| Littéral | Coller les termes | 2x + 3 = 5x | R (Booth) |
| Littéral | x · x = 2x, x + x = x² | | R |
| Littéral | Substituer par juxtaposition | 3x pour x = 4 → 34 | R (Küchemann) |
| Littéral | 2x² lu (2x)² | | E |
| Littéral | Distribution partielle | 3(x + 2) = 3x + 2 | R (Matz) |
| Littéral | − devant une parenthèse | −(x − 3) = −x − 3 | R |
| Littéral | (a + b)² = a² + b² | | R (Matz ; Kirshner & Awtry) |
| Littéral | (a + b)(c + d) = ac + bd | | R |
| Factorisation | Oublier le 1 | x² + x = x(x) | E |
| Factorisation | Pas complètement factorisé | 4x + 8 = 2(2x + 4) | E |
| Factorisation | a² − b² = (a − b)² | | E |
| Factorisation | x² + 9 = (x + 3)(x − 3) | | E |
| Factorisation | Signes de la somme et du produit inversés | | E |
| Équations | Mauvaise opération inverse | 3x = 12 → x = 12 − 3, ou x = 3/12 | R (Kieran) |
| Équations | « Changer de côté, changer de signe » appliqué au × | 3x = 12 → x = −12/3 | E |
| Équations | Opérer d'un seul côté | | R |
| Équations | Diviser un seul terme | 2x + 6 = 10 → x + 6 = 5 | R |
| Équations | Multiplier une partie seulement en chassant les dénominateurs | | R |
| Équations | Diviser par x et perdre la solution x = 0 | | R |
| 2e degré | Produit nul utilisé quand le produit vaut autre chose que 0 | (x − 2)(x + 3) = 5 → x = 7 ou x = 2 | R (Vaiyavutjamai & Clements) |
| 2e degré | x² = 9 → x = 3 seulement | | Existe déjà |
| 2e degré | Erreurs dans la formule : −b, 2a seulement sous b, (−b)² | | E |
| Rationnelles | Barrer des termes | (x + 3)/3 = x | R (Matz) |
| Rationnelles | Oublier les valeurs interdites | | R |
| Isoler | Mauvaise opération inverse | abc = d → b = d − ac ; d = vt → t = v/d | E |
| Isoler | Inverser une somme terme à terme | 1/f = 1/a + 1/b → f = a + b | R |
| Isoler | Oublier la racine | E = ½mv² → v = 2E/m | E |
| Isoler | La variable reste des deux côtés | x = (cx − b)/a | E |
| Proportionnalité | Raisonnement additif | 3 → 5, donc 6 → 8 | R (Hart) |
| Proportionnalité | Illusion de linéarité : côté × 2, donc aire × 2 | | R (De Bock et al.) |
| Pourcentages | + 10 % puis − 10 % = 0 % | | E |
| Pourcentages | Retirer 20 % pour annuler une hausse de 20 % | 96 − 20 % au lieu de 96 / 1,2 | E |
| Unités | Facteur 10 pour les aires ou les volumes | 1 m² = 100 cm² | E |
| Unités | Facteur linéaire non mis au carré ou au cube | 1 pied² = 30,48 cm² | E |
| Unités | Heures décimales lues comme des minutes | 1,5 h = 1 h 50 | E |
| Unités | Conversion dans le mauvais sens | 3 km = 0,003 m | E |
| Unités | × 3,6 au lieu de ÷ 3,6 | 90 km/h = 324 m/s | E |
| Fonctions | Graphique lu comme un dessin de la situation | | R (Leinhardt et al.) |
| Fonctions | x et y inversés en lisant un point | | R (Leinhardt et al.) |
| Fonctions | Pente calculée comme y/x au lieu de Δy/Δx | | E |
| Géométrie | Hypoténuse mal choisie | 6² + 10² au lieu de 10² − 6² | E |
| Géométrie | Racine de la somme prise terme à terme | √(36 + 64) = 6 + 8 | Existe déjà |
| Géométrie | 2πr et πr² confondus | | E |
| Écritures | 1/4 = 0,4 ; 0,3 = 1/3 | | E |
| Écritures | √4 irrationnel parce que « c'est une racine » | | E |
| Écritures | ∛27 = 9 | | E |
| Arrondir | Troncature au lieu d'arrondi | 3,47 → 3,4 | E |

## 5. Ce qu'il faut changer dans le moteur

Aujourd'hui, l'app ne calcule qu'avec des nombres exacts. L'algèbre demande un petit moteur de calcul formel, écrit à la main pour rester sans serveur et sans bibliothèque :

1. **Lettres et équations.**
   - Le clavier gagne x, y, a, b, c, n, =, ±, plus un onglet « lettres ».
   - La multiplication sans signe se lit : 3x, 2(x + 1), ab.
   - L'affichage écrit 3x et non 3 × x.
2. **Forme normale exacte.** Les polynômes à plusieurs lettres et à coefficients fractionnaires, ainsi que les quotients de polynômes, sont ramenés à une forme unique. Deux expressions sont égales si leurs formes normales le sont. C'est exact et rapide.
3. **Expressions avec racine.** Ce sont les expressions avec √, comme la formule à paramètres. On compare les valeurs en plusieurs points tirés au hasard, comme le font les outils d'évaluation en ligne (STACK, Sangwin 2013).
4. **Juger une ligne d'équation.**
   - Une ligne est juste si l'équation garde les mêmes solutions.
   - Diviser par une expression qui contient x, ou élever au carré, déclenche un message qui nomme la solution perdue ou ajoutée.
5. **Juger la forme finale.** Chaque type d'exercice exige une forme :
   - « factorisé complètement » ;
   - « développé, réduit, ordonné » ;
   - « x isolé », c'est-à-dire x d'un côté et pas de x de l'autre ;
   - « ensemble de solutions », par exemple x = 2 ou x = −3, ou « pas de solution ».
6. **Nouveaux modes d'exercice.**
   - *Choisir l'action* (équations, niveau guidé) : on touche « −3 des deux côtés », « ÷ 2 », « développer »…, puis on écrit le résultat.
   - *Égal ou pas ?* et *Prochaine étape ?* : exercices éclair.
   - *Série rapide* : pour les livrets.
7. **Mémoire par fait.** Pour les livrets, chaque fait (7 × 8) a sa propre répétition espacée, en plus de la compétence.
8. **Diagnostic.** C'est la même méthode qu'aujourd'hui, appliquée à des expressions avec lettres. Les pièges du §4 sont ajoutés aux 76 existants.
9. **Unités.** Une réponse peut porter une unité (« 2,5 km »). Le clavier propose les unités de l'exercice, et le juge compare la grandeur, pas seulement le nombre.
10. **Graphiques.** Un repère interactif, où l'on peut placer un point, tracer une droite par deux points ou lire une valeur. Il sert aux fonctions (L), aux pentes (J) et aux systèmes 2 × 2 (E).

## 6. Ordre de construction

Chaque étape est utilisable seule, testée, puis publiée sur GitHub Pages.

| Étape | Contenu | Taille | Moteur |
|---|---|---|---|
| 1 ✅ | A. Livrets et calcul mental, avec arrondir et estimer (fait le 9 novembre 2026) | Moyenne | Série rapide, mémoire par fait |
| 1b ✅ | Mélanges : puissances de fractions et exposants négatifs, racines de fractions, unité « Calculs mélangés » 9H–11H | Petite | Aucun |
| 2 ✅ | B. Arithmétique (avec √72 = 6√2) et N. Écritures d'un nombre (fait le 9 novembre 2026) | Petite | Peu de changements |
| 3 | J. Proportionnalité et pourcentages, K. Grandeurs et unités | Moyenne | Réponses avec unités |
| 4 | C. Calcul littéral et D. Factorisation | Grande | Lettres, forme normale, clavier, affichage |
| 5 | E. Équations (avec systèmes 2 × 2), F. Isoler une variable, M. Géométrie calculée | Grande | Lignes d'équation, mode « choisir l'action » |
| 6 | L. Fonctions | Moyenne | Repère interactif |
| 7 | G. Rationnelles, H. 2e degré et I. Synthèse | Grande | Valeurs interdites, ±, comparaison par valeurs |

Proportionnalité et unités viennent tôt (étape 3) : ils n'ont pas besoin des lettres, ils servent dès 9H et ils préparent la physique. La géométrie calculée vient avec « isoler une variable », parce qu'elle s'en sert (A = πr² → r).

## 7. Ce que le PER contient encore

Relu dans la progression bernoise du cycle 3. Les thèmes de priorité haute et moyenne sont maintenant les modules J à N et les compétences « arrondir et estimer ». Restent hors du plan :

| Thème du PER | Années | Pourquoi pas maintenant |
|---|---|---|
| Le calcul littéral comme preuve (« la somme de 3 entiers consécutifs est un multiple de 3 ») | 11H A | Facile à ajouter une fois le module C prêt |
| Situations aléatoires et statistiques | 10H–11H | Autre domaine, loin de l'objectif algébrique |
| Cycle 2 (5H–8H, à vérifier) : numération jusqu'au million, calcul écrit posé, premiers décimaux | 5H–8H | Pas de progression officielle trouvée ; le calcul posé passe mal sur téléphone |
| Géométrie de construction, transformations, solides, systèmes de numération, calculatrice | | Dessin et manipulation, hors du format de l'app |

## 8. Décisions

Prises le 9 novembre 2026 :
- **Années du profil** : 5H, 6H et Gymnase sont ajoutés au profil (fait). Au Gymnase, la question du niveau (A/B/C) n'est plus posée.
- **Systèmes 2 × 2** : inclus dans l'étape 5.
- **Chrono des séries rapides** : caché. Le temps est mesuré, jamais affiché ; la page Progrès montre seulement combien de faits sont automatiques (« 32 / 55 »).
- **Thèmes du PER ajoutés** : proportionnalité et pourcentages, unités, fonctions, géométrie calculée, écritures d'un nombre, arrondir et estimer.

## Références

Citées de mémoire. Les références bibliographiques sont à vérifier, et les liens à ajouter avant de publier ce document.

- Baroody, A. J. (2006). Why children have difficulties mastering the basic number combinations and how to help them. *Teaching Children Mathematics*, 13(1).
- De Bock, D., Van Dooren, W., Janssens, D., & Verschaffel, L. (2002). Improper use of linear reasoning. *Educational Studies in Mathematics*, 50(3).
- Booth, L. R. (1984). *Algebra: Children's strategies and errors*. NFER-Nelson.
- Campbell, J. I. D., & Graham, D. J. (1985). Mental multiplication skill: Structure, process, and acquisition. *Canadian Journal of Psychology*, 39(2).
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*, 132(3).
- Codding, R. S., Burns, M. K., & Lukito, G. (2011). Meta-analysis of mathematic basic-fact fluency interventions. *Learning Disabilities Research & Practice*, 26(1).
- Hart, K. M. (1984). *Ratio: Children's strategies and errors*. NFER-Nelson.
- Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist*, 38(1).
- Kellman, P. J., Massey, C. M., & Son, J. Y. (2010). Perceptual learning modules in mathematics. *Topics in Cognitive Science*, 2(2).
- Kieran, C. (1981). Concepts associated with the equality symbol. *Educational Studies in Mathematics*, 12.
- Kirshner, D., & Awtry, T. (2004). Visual salience of algebraic transformations. *Journal for Research in Mathematics Education*, 35(4).
- Knuth, E. J., Stephens, A. C., McNeil, N. M., & Alibali, M. W. (2006). Does understanding the equal sign matter? *Journal for Research in Mathematics Education*, 37(4).
- Koedinger, K. R., & Nathan, M. J. (2004). The real story behind story problems. *Journal of the Learning Sciences*, 13(2).
- Küchemann, D. (1981). Algebra. In K. Hart (Ed.), *Children's Understanding of Mathematics: 11–16*.
- Leinhardt, G., Zaslavsky, O., & Stein, M. K. (1990). Functions, graphs, and graphing: Tasks, learning, and teaching. *Review of Educational Research*, 60(1).
- MacQuarrie, L. L., Tucker, J. A., Burns, M. K., & Hartman, B. (2002). Comparison of retention rates using traditional, drill sandwich, and incremental rehearsal flash card methods. *School Psychology Review*, 31(4).
- Matz, M. (1982). Towards a process model for high school algebra errors. In D. Sleeman & J. S. Brown (Eds.), *Intelligent Tutoring Systems*.
- Ramirez, G., Gunderson, E. A., Levine, S. C., & Beilock, S. L. (2013). Math anxiety, working memory, and math achievement in early elementary school. *Journal of Cognition and Development*, 14(2).
- Renkl, A., & Atkinson, R. K. (2003). Structuring the transition from example study to problem solving. *Educational Psychologist*, 38(1).
- Rittle-Johnson, B., & Star, J. R. (2007). Does comparing solution methods facilitate conceptual and procedural knowledge? *Journal of Educational Psychology*, 99(3).
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*, 17(3).
- Rohrer, D., Dedrick, R. F., & Stershic, S. (2015). Interleaved practice improves mathematics learning. *Journal of Educational Psychology*, 107(3).
- Sangwin, C. (2013). *Computer Aided Assessment of Mathematics*. Oxford University Press.
- Star, J. R., et al. (2015). *Teaching strategies for improving algebra knowledge in middle and high school students* (NCEE 2015-4010). IES What Works Clearinghouse.
- Vaiyavutjamai, P., & Clements, M. A. (2006). Effects of classroom instruction on students' understanding of quadratic equations. *Mathematics Education Research Journal*, 18(1).
- Vlassis, J. (2002). The balance model: Hindrance or support for the solving of linear equations with one unknown. *Educational Studies in Mathematics*, 49(3).
- [Progression bernoise du PER, mathématiques cycle 3 (2016)](https://www.faechernet.bkd.be.ch/content/dam/faechernet_bkd/dokumente-bilder/fr/comeo/mathematiques/Maths-cycle3-Progression-2016.pdf)
- [MalruleLib](https://arxiv.org/html/2601.03217)
