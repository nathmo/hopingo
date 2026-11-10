# G-gymnase-2 : catalogue G4, G10, G6, G7, G8

Extensions du §16 utilisées : §16.1 nœuds `point`, `vecAB`, `fact`, `binom`, `arr`, dérivées à gauche et à droite, égalités enchaînées (droites de l'espace), domaine sur une courbe (dérivée implicite), complexes partout (G8) ; §16.2 juge par segment, `value` avec `form: 'point' | 'vector'`, `geom` avec `count: 2` et `complexVar`, `conic` (repère `state.frame`, lignes d'éléments), `solset` sur ℂ, `poly` à coefficients complexes ; §16.3 `plot` (`curve`, `conic`), au moins 2 exemples d'examen par module ; §16.4 familles nouvelles (`calculus`, `geometry`, `proba`, `method`), réparation dans un autre module, pièges partagés (`g4_proj_no_square`, `g4_square_constant`, `g6_chain_forgot`, `g6_product_naive`, `g6_quotient_sign`, `g7_order_confusion`, `g8_arg_quadrant`… servent aussi plus loin).

Ce catalogue couvre cinq modules du niveau maturité et CMS ([plan-universite.md](../plan-universite.md), §7 G). Il suit le gabarit du §15 du [README](README.md), une fois par module. Les exemples de type examen sont à la fin de chaque module.

| Module | `unit` | Étape (README §14) | Compétences |
|---|---|---|---|
| G4. Géométrie analytique | `geoan` | U5 | 14 |
| G10. Cercles et coniques | `coniques` | U5 | 15 |
| G6. Analyse de base | `analyse0` | U2 (la pilote `g6-deriv-rules` en U0) | 16 |
| G7. Combinatoire et probabilités | `combi` | U7 | 7 |
| G8. Nombres complexes | `complexes` | U4 | 11 |

## Conventions communes aux cinq modules

**Validation en solo.** Le README met `needsSolo` à vrai par défaut pour `year ≥ 12.5`. Ici, on le met **à vrai aussi pour `year: 12`**, parce que chaque compétence G finit par un problème sans aide (plan, §2, leçon d'AFlex). Seule exception : `g7-which-count` (exercice éclair), `needsSolo: false`.

**Points et vecteurs.** Un point s'écrit `A(2 ; 1)` ou `A(2 ; 1 ; 3)`, un vecteur `(1 ; −2 ; 3)`. Le vecteur AB se tape avec la touche « AB⃗ », qui produit `vec(A,B)`. Produit scalaire `·`, produit vectoriel `∧` (`×` accepté), norme `‖u‖` (touche `|·|` doublée).

**Extensions de juges utilisées ici.** Le README ne les décrit pas encore. Elles doivent y être ajoutées avant l'étape qui les utilise (U2 pour le juge par segment, U4 pour les formes de `complex`, U5 pour le reste, U7 pour `n!` et `C(n, k)`) :

| Extension | Où | Ce qu'elle fait |
|---|---|---|
| `value` avec `{form:'point'\|'vector', symbols}` | G4, G10, G8 | Comme `prob` : les noms déclarés (`A`, `M`, `u`) sont remplacés par leurs coordonnées. Une ligne est une expression en points et vecteurs (`2M − A`, `vec(A,B) ∧ vec(A,C)`). Elle est juste si elle a la même valeur, composante par composante, que la ligne précédente. Les racines passent par `normal.js`. |
| `geom` avec `count: 2` | bissectrices, tangentes issues d'un point | La ligne décrit une réunion de 2 objets (équation avec valeur absolue, ou deux équations séparées par « ou »). On compare les ensembles de zéros par échantillonnage : 20 points sur chaque objet attendu, 20 points tirés hors des objets. |
| `conic` avec `frame` | réduction | `state.frame = {Ω, u1, u2}` est rempli par les lignes « Ω = … », « u₁ = … ». Une équation en X, Y est ramenée en x, y par x = Ω + X·u₁ + Y·u₂, puis comparée à `equation` (proportionnelle). |
| `conic`, lignes d'éléments | G10 | Une ligne d'élément a la forme `<nom> = <valeur>` : `Ω`, `F`, `F'`, `S`, `a`, `b`, `c`, `e`, `p`, `asymptote`, `directrice`, `axe`, `tangente`. Chaque élément est comparé à celui que l'app calcule à partir de `equation` (`value` pour les nombres et les points, `geom` line2 pour les droites). L'ordre des deux foyers est libre. |
| Juge par segment | réductions, études de fonction | `script[i].judge` remplace le juge de l'item pour un segment de lignes (polynôme caractéristique avec `equiv`, vecteurs propres avec `eigvec`, centre avec `value`, équation réduite avec `conic`). |
| `plot` `task:'curve'` et `task:'conic'` | G6, G10 | Champs proposés au §« Items `plot` » ci-dessous. |
| Égalités en chaîne | droites de l'espace | `(x − 1)/2 = (y + 2)/1 = (z − 3)/(−1)` est lu comme deux équations. |
| `n!`, `C(n, k)`, `A(n, k)` | G7 | Factorielle postfixe et deux fonctions entières, évaluées exactement. `C(n, k)` s'affiche comme le coefficient binomial vertical. |

**Items `plot`.** On propose ces champs, qui complètent le « `…` » du README §6 :

```js
// Esquisse d'une courbe y = f(x) ou d'un arc paramétré
{type:'plot', task:'curve', view:{x:[-4, 6], y:[-8, 10]},
 expect:{
   asymptotes:[{kind:'vertical', x:1}, {kind:'oblique', m:1, h:1}],
   points:[{x:0, y:0, kind:'max'}, {x:2, y:4, kind:'min'}],   // kind : max min inflection angular cusp stationary
   halfTangents:[{x:2, side:'+', slope:0}],                   // optionnel : demi-tangentes aux points anguleux
   branches:[{near:'x→1+', to:'+inf'}]},                      // optionnel : position des branches
 tol:{pos:0.15, slope:0.2}}
// Esquisse d'une conique
{type:'plot', task:'conic', expect:{center:[1,-1], axes:[[2,1],[-1,2]], vertices:[…], foci:[…], asymptotes:[…]}, tol:{pos:0.15}}
```

L'élève place les éléments (points, droites) sur le repère, puis trace la courbe à main levée. Le juge vérifie chaque élément à `tol` près, et la courbe tracée seulement par sa position par rapport aux asymptotes et aux points placés (côté, monotonie entre deux points). Un élément manquant ou faux enlève sa part des points.

**Arbre « Choisir la méthode ».** Les arbres de décision sont écrits comme des suites de lignes `{kind:'decision'}` (README §5.3). Une option `valid:false` donne `why` tout de suite. Une option `quality:'poor'` laisse continuer, et `why` s'affiche après la ligne suivante.

---

# G4. Géométrie analytique du plan et de l'espace

Unité `geoan` · préfixe `g4-` · pièges `g4_` · Statut : à faire

**Sources** : MAN, Math 2A (examen blanc 2018 : droites et plans, tétraèdre, droite qui s'appuie sur deux droites gauches) ; CMS, Géométrie analytique, semestre 1 (séries 1 à 12, automne 2018 : vecteurs, droites et plans, produit scalaire, produit vectoriel, distances).
**Notation** : repère orthonormé direct sauf mention contraire. Une droite du plan : `ax + by + c = 0` ou `(x ; y) = (x₀ ; y₀) + t(v₁ ; v₂)`. Une droite de l'espace : paramétrique, ou deux équations cartésiennes, ou la forme `(x − x₀)/v₁ = (y − y₀)/v₂ = (z − z₀)/v₃`. Plan : `ax + by + cz + d = 0`. Le produit vectoriel s'écrit `∧`.
**Prérequis extérieurs** : `@alg:E-systemes-2x2`, `@alg:L-affine`, `@alg:M-pythagore`, `@alg:H-completer-carre`, `g1-abs-eq`, `g3-arc-def`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g1-abs-eq`, `g3-arc-def`.

## Compétences

### `g4-vectors` — Vecteurs : Chasles, combinaisons, colinéarité
- **Année** 12 · **Prérequis** `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : AB⃗ = B − A. Chasles : AB⃗ + BC⃗ = AC⃗. Le milieu de [AB] est (A + B)/2. Deux vecteurs du plan sont colinéaires si et seulement si u₁v₂ − u₂v₁ = 0. Exemple : parallélogramme ABCD de centre M, alors C = 2M − A.
- **Juge** : `value` `{form:'point', symbols:{A, B, M}}` · **Forme finale** : coordonnées numériques de chaque point demandé.
- **Niveaux** :
  - L1 (guidé) : la relation `C = 2M − A` est donnée ; trous dans les coordonnées.
  - L2 : la relation est à choisir parmi 3 (`C = 2M − A`, `C = M − A`, `C = A + M`) ; le calcul est à trous.
  - L3 (choisir l'action) : actions « milieu », « Chasles », « translation », « colinéarité (déterminant) », puis la ligne.
  - L4 (libre) : lignes libres ; aides disponibles.
  - L5 (seul) : `problem` de 3 parties : sommets manquants, vérification AB⃗ = DC⃗, décomposition d'un vecteur dans la base (AB⃗, AD⃗).
- **Générateur** : on tire d'abord les sommets entiers A, B, D dans [−6 ; 6]², avec AB⃗ et AD⃗ non colinéaires ; C = B + D − A ; M = (A + C)/2, accepté seulement si ses coordonnées sont entières ou des demi-entiers. Gabarit 1 : « A, B et le centre M sont donnés, trouver C et D ». Gabarit 2 : « A, B, C sont donnés, trouver D pour que ABCD soit un parallélogramme ». Gabarit 3 (L5) : « écrire w⃗ = αu⃗ + βv⃗ » avec α, β entiers dans [−4 ; 4], non nuls. On exclut les parallélogrammes aplatis.
- **Corrigé type** : A(2 ; 1), B(5 ; −3), centre M(4 ; 2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | C = 2M − A | Écrire la relation (M milieu de [AC]) |
  | 2 | C = (8 − 2 ; 4 − 1) = (6 ; 3) | Calculer |
  | 3 | D = 2M − B = (8 − 5 ; 4 + 3) = (3 ; 7) | Calculer |
  | 4 | vec(A,B) = (3 ; −4) = vec(D,C) | Vérifier |
- **Aides** : 1 « Le centre d'un parallélogramme est le milieu de chaque diagonale. » · 2 « C = 2M − □ » · 3 « C = 2M − A = (6 ; 3) ».
- **Variantes d'examen** : `mcq` (distracteurs par `g4_midpoint_half` et `g4_vector_reversed`) ; `tf` (« Si AB⃗ = DC⃗, alors ABCD est un parallélogramme » : faux, contre-exemple quatre points alignés, vérifié par le déterminant) ; `open`.
- **Pièges** : `g4_vector_reversed`, `g4_midpoint_half`.
- **Sous-buts → crédit** : relation → `g4-vectors` ; calcul → `@alg:E-systemes-2x2` (seulement pour la décomposition du gabarit 3).

### `g4-line2` — Droite du plan : paramétrique, cartésienne, intersection
- **Année** 12 · **Prérequis** `g4-vectors`, `@alg:L-affine`, `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-vectors` : A + t·v⃗ est une combinaison de vecteurs ; `@alg:L-affine` : pente et ordonnée à l'origine de y = mx + p.
- **Intro** : par A et de direction v⃗ : (x ; y) = A + t·v⃗. On élimine t pour la cartésienne. Dans ax + by + c = 0, le vecteur (a ; b) est **normal** et (−b ; a) est directeur. Intersection : on remplace la paramétrique dans la cartésienne.
- **Juge** : `geom` `{object:'line2'}` pour les équations ; `value` `{form:'point'}` pour l'intersection (juge par segment) · **Forme finale** : cartésienne à coefficients entiers premiers entre eux, puis un point.
- **Niveaux** :
  - L1 : paramétrique donnée ; trous dans la cartésienne et dans t.
  - L2 : une décision « éliminer t » ou « vecteur normal » ; calcul à trous.
  - L3 : actions « écrire la paramétrique », « éliminer t », « remplacer dans l'autre équation », « résoudre en t ».
  - L4 : libre.
  - L5 : position relative de deux droites (sécantes, parallèles, confondues) puis intersection, sans aide.
- **Générateur** : A entier dans [−5 ; 5]², v⃗ entier non nul dans [−4 ; 4]², pgcd(v₁, v₂) = 1. La 2e droite est construite à partir du point d'intersection I choisi entier (I = A + t₀v⃗, t₀ ∈ [−3 ; 3] non nul) et d'une normale entière non colinéaire à la normale de la 1re. Gabarit 1 : « par A, de direction v⃗ ». Gabarit 2 : « par A et B ». Gabarit 3 : « par A, parallèle à (ou perpendiculaire à) la droite g ».
- **Corrigé type** : d par A(1 ; −2), direction (3 ; 2) ; g : x + y − 4 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x ; y) = (1 ; −2) + t(3 ; 2) | Paramétrique |
  | 2 | 2x − 3y = 2 + 6 = 8 | Éliminer t (2x = 2 + 6t, 3y = −6 + 6t) |
  | 3 | 2x − 3y − 8 = 0 | Cartésienne |
  | 4 | (1 + 3t) + (−2 + 2t) − 4 = 0, donc t = 1 | Remplacer et résoudre |
  | 5 | I = (4 ; 0) | Point d'intersection |
- **Aides** : 1 « Multiplie x par 2 et y par 3 pour que t disparaisse. » · 2 « 2x − 3y = 2·1 − 3·(□) » · 3 « 2x − 3y − 8 = 0 ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_normal_as_direction`, `g4_line_constant`) ; `tf` (« Les droites 2x − 3y = 1 et 4x − 6y = 2 sont parallèles distinctes » : faux, elles sont confondues) ; `open`.
- **Pièges** : `g4_normal_as_direction`, `g4_line_constant`.
- **Sous-buts → crédit** : éliminer t → `g4-line2` ; résoudre en t → `@alg:E-systemes-2x2`.

### `g4-dot` — Produit scalaire, angles, projection d'un vecteur
- **Année** 12 · **Prérequis** `g4-vectors`, `@alg:M-pythagore`, `g3-arc-def` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-vectors` : composantes des vecteurs.
- **Intro** : u⃗·v⃗ = u₁v₁ + u₂v₂ + u₃v₃ = ‖u⃗‖‖v⃗‖cos θ. Projection de u⃗ sur v⃗ : (u⃗·v⃗ / ‖v⃗‖²)·v⃗. Angle de deux droites : on prend |cos θ|.
- **Juge** : `value` `{form:'vector'}` pour les vecteurs ; `value` `{form:'exact'}` pour cos θ et θ (θ en radians, valeur exacte ou `arccos(…)`) · **Forme finale** : θ exact ; projection en composantes.
- **Niveaux** :
  - L1 : u⃗·v⃗ et les normes à trous.
  - L2 : décision « angle de deux vecteurs » ou « angle de deux droites (|cos|) ».
  - L3 : actions « produit scalaire », « normes », « cos θ », « θ », « projection ».
  - L4 : libre.
  - L5 : angle d'un triangle et pied de la hauteur par projection, sans aide.
- **Générateur** : on part de θ ∈ {π/6, π/4, π/3, π/2, 2π/3, 3π/4, 5π/6} et de vecteurs entiers de normes √2, √3, 2, 3, √5 ou 5 qui donnent ce cos (table de 40 paires précalculées, tournées par des permutations et des changements de signe des coordonnées). Points du triangle entiers dans [−5 ; 5]³. 1 item sur 4 a un angle non remarquable (réponse `arccos(4/9)`). Gabarit 1 : angle en A du triangle ABC. Gabarit 2 : angle de deux droites données par leurs directions. Gabarit 3 : projection de u⃗ sur v⃗.
- **Corrigé type** : A(1 ; 2 ; 0), B(2 ; 3 ; 0), C(2 ; 2 ; 1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | vec(A,B) = (1 ; 1 ; 0), vec(A,C) = (1 ; 0 ; 1) | Vecteurs |
  | 2 | vec(A,B)·vec(A,C) = 1 | Produit scalaire |
  | 3 | ‖AB‖ = ‖AC‖ = √2 | Normes |
  | 4 | cos θ = 1/(√2·√2) = 1/2 | cos θ |
  | 5 | θ = π/3 | Angle |
  | 6 | proj = (1/2)(1 ; 1 ; 0) = (1/2 ; 1/2 ; 0) | Projection de AC⃗ sur AB⃗ |
- **Aides** : 1 « cos θ = u⃗·v⃗ / (‖u⃗‖‖v⃗‖). » · 2 « cos θ = □ / (√2·√2) » · 3 « cos θ = 1/2, donc θ = π/3 ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_angle_obtuse`, `g4_proj_no_square`) ; `tf` (« u⃗·v⃗ = 0 ⇒ u⃗ = 0⃗ ou v⃗ = 0⃗ » : faux, contre-exemple (1 ; 0) et (0 ; 1)) ; `coef` (une composante de la projection).
- **Pièges** : `g4_angle_obtuse`, `g4_proj_no_square`.
- **Sous-buts → crédit** : normes → `@alg:M-pythagore` ; θ → `g3-arc-def`.

### `g4-bisectors` — Médiatrice et bissectrices
- **Année** 12 · **Prérequis** `g4-line2`, `g4-dot`, `g1-abs-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-line2` : équations cartésiennes ax + by + c = 0 ; `g4-dot` : norme du vecteur normal ‖n⃗‖.
- **Intro** : distance d'un point à une droite du plan : |ax₀ + by₀ + c| / √(a² + b²). Les bissectrices de d₁ et d₂ sont les points à égale distance : |a₁x + b₁y + c₁|/‖n₁‖ = |a₂x + b₂y + c₂|/‖n₂‖, d'où deux droites (signe + et signe −). Médiatrice de [AB] : MA = MB, ou AB⃗·(X − I) = 0 avec I milieu.
- **Juge** : `geom` `{object:'line2', count:2}` (bissectrices) ; `geom` `{object:'line2'}` (médiatrice) · **Forme finale** : deux cartésiennes entières, ou une.
- **Niveaux** :
  - L1 : normes données ; trous dans les deux droites.
  - L2 : décision « diviser par les normes » ou « égaler directement » (`valid:false` si les normes diffèrent).
  - L3 : actions « normes », « égalité des distances », « cas + », « cas − ».
  - L4 : libre.
  - L5 : bissectrice **intérieure** de l'angle A d'un triangle (choisir le signe avec un point test), sans aide.
- **Générateur** : normales choisies parmi les vecteurs de norme entière ((3 ; 4), (5 ; 12), (6 ; 8), (1 ; 0)…), tournées et signées. Point d'intersection des droites entier dans [−4 ; 4]². Contrainte : les deux bissectrices ont des coefficients entiers après multiplication par le ppcm des normes. Gabarit 1 : bissectrices de deux droites. Gabarit 2 : médiatrice de [AB], A et B entiers avec milieu entier. Gabarit 3 (L5) : bissectrice intérieure dans le triangle ABC.
- **Corrigé type** : d₁ : 3x − 4y + 1 = 0, d₂ : 4x + 3y − 7 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ‖n₁‖ = ‖n₂‖ = 5 | Normes |
  | 2 | \|3x − 4y + 1\|/5 = \|4x + 3y − 7\|/5 | Égalité des distances |
  | 3 | 3x − 4y + 1 = 4x + 3y − 7, donc x + 7y − 8 = 0 | Cas + |
  | 4 | 3x − 4y + 1 = −(4x + 3y − 7), donc 7x − y − 6 = 0 | Cas − |
  | 5 | Contrôle : (1 ; 7)·(7 ; −1) = 0 | Les bissectrices sont perpendiculaires |
- **Aides** : 1 « Un point de la bissectrice est à la même distance des deux droites. » · 2 « 3x − 4y + 1 = ±(□) » · 3 les deux droites.
- **Variantes d'examen** : `mcq` (distracteur `g4_bisector_unnormalized`) ; `tf` (« Les deux bissectrices de deux droites sécantes sont perpendiculaires » : vrai) ; `open`.
- **Pièges** : `g4_bisector_unnormalized`, `g4_bisector_one_sign`.
- **Sous-buts → crédit** : égalité des distances → `g4-bisectors` ; cas ± → `g1-abs-eq`.

### `g4-line3` — Droite de l'espace : paramétrique et cartésienne
- **Année** 12 · **Prérequis** `g4-line2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-line2` : même passage paramétrique ↔ cartésienne, avec une coordonnée de plus.
- **Intro** : (x ; y ; z) = A + t·v⃗. Cartésienne : (x − x₀)/v₁ = (y − y₀)/v₂ = (z − z₀)/v₃, c'est-à-dire **deux** équations. Si une composante de v⃗ est nulle, la coordonnée correspondante est constante. Dans l'autre sens, on résout le système de deux plans avec une inconnue libre.
- **Juge** : `geom` `{object:'line3'}` · **Forme finale** : la forme demandée (paramétrique, ou deux équations).
- **Niveaux** :
  - L1 : paramétrique à trous.
  - L2 : passage à la cartésienne avec la forme à trous `(x − □)/□ = …`.
  - L3 : actions « paramétrique », « éliminer t (deux fois) », « poser z = t » (sens inverse).
  - L4 : libre, dans les deux sens.
  - L5 : droite par A, parallèle à une droite donnée par deux plans, sans aide.
- **Générateur** : A entier dans [−5 ; 5]³, v⃗ entier dans [−3 ; 3]³ avec pgcd 1 ; 1 item sur 4 a une composante nulle. Sens inverse : on part de la droite, on construit deux plans qui la contiennent avec des normales entières orthogonales à v⃗ (bases du noyau de v⃗ᵀ, coefficients ≤ 6). Gabarit 1 : par A, de direction v⃗. Gabarit 2 : par A et B. Gabarit 3 : intersection de deux plans → paramétrique.
- **Corrigé type** : A(1 ; −2 ; 3), v⃗ = (2 ; 1 ; −1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x ; y ; z) = (1 ; −2 ; 3) + t(2 ; 1 ; −1) | Paramétrique |
  | 2 | (x − 1)/2 = (y + 2)/1 = (z − 3)/(−1) | Forme symétrique |
  | 3 | x − 2y − 5 = 0 | 1re équation |
  | 4 | y + z − 1 = 0 | 2e équation |
- **Aides** : 1 « Isole t dans chaque coordonnée, puis égale. » · 2 « (x − 1)/2 = y + 2, donc x − 2y − □ = 0 » · 3 les deux équations.
- **Variantes d'examen** : `mcq` (distracteurs `g4_line3_one_equation`, `g4_normal_as_direction`) ; `tf` (« Une seule équation cartésienne suffit pour une droite de l'espace » : faux, elle décrit un plan ; contre-exemple : x − 2y − 5 = 0 contient le point (5 ; 0 ; 100), qui n'est pas sur la droite) ; `open`.
- **Pièges** : `g4_line3_one_equation`, `g4_normal_as_direction`.
- **Sous-buts → crédit** : éliminer t → `g4-line3`.

### `g4-plane` — Plan : par trois points, paramétrique ↔ cartésienne
- **Année** 12 · **Prérequis** `g4-vectors` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-vectors` : deux vecteurs directeurs AB⃗ et AC⃗.
- **Intro** : un plan est donné par un point et deux directions non colinéaires, ou par une normale n⃗ = (a ; b ; c) : ax + by + cz + d = 0. Sans produit vectoriel (comme à la MAN), on trouve n⃗ en résolvant n⃗·u⃗ = 0 et n⃗·v⃗ = 0. Après `g4-cross`, n⃗ = u⃗ ∧ v⃗ est accepté aussi.
- **Juge** : `geom` `{object:'plane'}` ; segment `value` `{form:'vector'}` pour n⃗ (tout multiple non nul accepté) · **Forme finale** : cartésienne entière.
- **Niveaux** :
  - L1 : AB⃗, AC⃗ donnés ; système à trous.
  - L2 : décision « système n⃗·u⃗ = n⃗·v⃗ = 0 » ou « produit vectoriel » (le second `valid:false` tant que `g4-cross` n'est pas vu, avec le message « Pas encore vu : résous le système »).
  - L3 : actions « directions », « conditions sur n⃗ », « choisir une solution », « constante d ».
  - L4 : libre.
  - L5 : plan contenant une droite et un point, ou deux droites parallèles, sans aide.
- **Générateur** : on tire n⃗ entier, pgcd 1, coordonnées dans [−5 ; 5], et A entier ; B et C = A + vecteurs entiers orthogonaux à n⃗ (petits, non colinéaires). Gabarit 1 : trois points. Gabarit 2 : un point et deux directions. Gabarit 3 : un point et une droite.
- **Corrigé type** : A(1 ; 0 ; 2), B(3 ; 1 ; 1), C(0 ; 2 ; 4).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | vec(A,B) = (2 ; 1 ; −1), vec(A,C) = (−1 ; 2 ; 2) | Directions |
  | 2 | 2a + b − c = 0 et −a + 2b + 2c = 0 | Conditions sur n⃗ |
  | 3 | c = 2a + b, donc 3a + 4b = 0, n⃗ = (4 ; −3 ; 5) | Résoudre |
  | 4 | 4·1 − 3·0 + 5·2 + d = 0, donc d = −14 | Constante |
  | 5 | 4x − 3y + 5z − 14 = 0 | Cartésienne |
- **Aides** : 1 « La normale est orthogonale aux deux directions. » · 2 « 3a + 4b = 0 : prends a = □, b = □. » · 3 « n⃗ = (4 ; −3 ; 5) ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_line_constant`, `g4_normal_sum`) ; `tf` (« Trois points définissent toujours un plan » : faux, contre-exemple trois points alignés, vérifié par la colinéarité) ; `open`.
- **Pièges** : `g4_line_constant`, `g4_normal_sum`.
- **Sous-buts → crédit** : résoudre → `@alg:E-systemes-2x2`.

### `g4-relative-pos` — Positions relatives dans l'espace
- **Année** 12 · **Prérequis** `g4-plane`, `g4-line3` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g4-plane` : équation cartésienne du plan ; `g4-line3` : paramétrique de la droite substituée dans le plan.
- **Intro** : droite et plan : on remplace la paramétrique dans le plan. On obtient 0·t = 0 (droite contenue), 0·t = k ≠ 0 (parallèle), ou une seule valeur de t (sécante). Deux droites : directions colinéaires (parallèles ou confondues) ; sinon on résout A + s·u⃗ = B + t·v⃗ avec **deux paramètres différents** : une solution (sécantes) ou aucune (gauches). Deux plans : normales colinéaires ou non.
- **Juge** : décisions (menu des positions) ; segments `value` pour le système et le point d'intersection ; `geom` `{object:'line3'}` pour l'intersection de deux plans · **Forme finale** : la position nommée, et l'intersection si elle existe.
- **Niveaux** : la décision « Choisir la méthode » suit l'arbre :

  ```js
  [{kind:'decision', prompt:'Deux droites : leurs directions sont-elles colinéaires ?', options:[
     {id:'col', label:'Oui', valid:/*selon l'item*/, then:{ask:'Un point de d₁ est-il sur d₂ ?', judge:'value'}},
     {id:'noncol', label:'Non', valid:/*selon l'item*/, then:{ask:'Système en s et t', judge:'value'}}]},
   {kind:'decision', prompt:'Le système a…', options:[
     {id:'one', label:'une solution : sécantes'}, {id:'none', label:'aucune solution : gauches'}]}]
  ```
  - L1 : droite et plan, substitution à trous ; décision prise.
  - L2 : droite et droite, décision à choisir, système à trous.
  - L3 : actions « comparer les directions », « substituer », « résoudre en s et t », « vérifier la 3e équation ».
  - L4 : libre, les trois cas mélangés.
  - L5 : MAN 2A Q1 modifié : « d passe-t-elle par P ? Est-elle contenue dans α ? », sans aide.
- **Générateur** : on choisit d'abord la position (5 cas : droite ⊂ plan, droite ∥ plan, sécante ; droites sécantes, gauches, parallèles), puis on construit à l'envers : pour « gauches », u⃗, v⃗ non colinéaires et AB⃗·(u⃗ ∧ v⃗) ≠ 0 ; pour « sécantes », B = A + s₀u⃗ − t₀v⃗ avec s₀, t₀ entiers. Coordonnées dans [−6 ; 6]. Gabarit 1 : droite paramétrique et plan cartésien. Gabarit 2 : deux droites paramétriques. Gabarit 3 : deux plans, donner la droite d'intersection.
- **Corrigé type** : d : (x ; y ; z) = (1 ; 2 ; 0) + λ(1 ; 3 ; −2) ; α : x + y + 2z − 3 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (1 + λ) + (2 + 3λ) + 2(−2λ) − 3 = 0 | Substituer |
  | 2 | 0·λ + 0 = 0 | Réduire |
  | 3 | Vrai pour tout λ : d ⊂ α | Conclure (décision) |
- **Aides** : 1 « Remplace x, y, z de la droite dans l'équation du plan. » · 2 « (1 + λ) + (2 + 3λ) + 2(□) − 3 = 0 » · 3 « 0 = 0 pour tout λ : la droite est dans le plan. »
- **Variantes d'examen** : `mcq` (4 positions ; distracteurs `g4_skew_as_secant`, `g4_param_same_letter`) ; `tf` (« Deux droites de l'espace non parallèles sont sécantes » : faux, contre-exemple deux droites gauches, vérifié par le système sans solution) ; `open`.
- **Pièges** : `g4_skew_as_secant`, `g4_param_same_letter`.
- **Sous-buts → crédit** : substituer → `g4-relative-pos` ; résoudre en s et t → `@alg:E-systemes-2x2`.

### `g4-cross` — Produit vectoriel, aires
- **Année** 12.5 · **Prérequis** `g4-dot` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : u⃗ ∧ v⃗ = (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁). Il est orthogonal à u⃗ et à v⃗, et ‖u⃗ ∧ v⃗‖ est l'aire du parallélogramme. v⃗ ∧ u⃗ = −u⃗ ∧ v⃗. Aire du triangle ABC : ½‖AB⃗ ∧ AC⃗‖.
- **Juge** : `value` `{form:'vector'}` puis `value` `{form:'exact'}` pour l'aire · **Forme finale** : vecteur ; aire simplifiée (racine réduite).
- **Niveaux** :
  - L1 : schéma des déterminants 2 × 2 avec trous.
  - L2 : composante du milieu à écrire seule (c'est elle qu'on rate).
  - L3 : actions « 1re composante », « 2e », « 3e », « contrôle par produit scalaire », « norme », « aire ».
  - L4 : libre.
  - L5 : aire d'un triangle de l'espace et hauteur relative à un côté, sans aide.
- **Générateur** : u⃗, v⃗ entiers dans [−4 ; 4]³, non colinéaires. Contrainte : ‖u⃗ ∧ v⃗‖² sans facteur carré supérieur à 50 après extraction (racine lisible). Gabarit 1 : u⃗ ∧ v⃗. Gabarit 2 : aire du triangle ABC. Gabarit 3 : (3u⃗ + 2v⃗) ∧ (u⃗ − v⃗) à simplifier par bilinéarité (= −5 u⃗ ∧ v⃗), comme dans la série CMS 11.
- **Corrigé type** : u⃗ = (2 ; −1 ; 3), v⃗ = (1 ; 0 ; −2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | u ∧ v = ((−1)(−2) − 3·0 ; 3·1 − 2·(−2) ; 2·0 − (−1)·1) | Écrire les trois déterminants |
  | 2 | = (2 ; 7 ; 1) | Calculer |
  | 3 | (2 ; 7 ; 1)·u = 4 − 7 + 3 = 0 | Contrôle |
  | 4 | Aire du triangle = ½√(4 + 49 + 1) = ½√54 = 3√6/2 | Aire |
- **Aides** : 1 « 2e composante : u₃v₁ − u₁v₃ (on tourne : 2, 3, 1). » · 2 « (2 ; □ ; 1) » · 3 « (2 ; 7 ; 1) ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_cross_middle_sign`, `g4_cross_commute`) ; `tf` (« u⃗ ∧ v⃗ = v⃗ ∧ u⃗ » : faux, contre-exemple u⃗ = (1 ; 0 ; 0), v⃗ = (0 ; 1 ; 0)) ; `coef` (une composante).
- **Pièges** : `g4_cross_middle_sign`, `g4_cross_commute`.
- **Sous-buts → crédit** : contrôle → `g4-dot` ; aire → `g4-cross`.

### `g4-triple` — Produit mixte, volumes, coplanarité
- **Année** 12.5 · **Prérequis** `g4-cross` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : [u⃗, v⃗, w⃗] = (u⃗ ∧ v⃗)·w⃗ = det(u⃗, v⃗, w⃗). Volume du parallélépipède : |[u⃗, v⃗, w⃗]|. Volume du tétraèdre ABCD : |[AB⃗, AC⃗, AD⃗]|/6. Quatre points sont coplanaires si et seulement si le produit mixte est nul.
- **Juge** : `value` `{form:'exact'}` · **Forme finale** : volume (fraction irréductible).
- **Niveaux** :
  - L1 : AB⃗ ∧ AC⃗ donné ; trous dans le produit scalaire et le 1/6.
  - L2 : décision « 1/6 », « 1/3 » ou « 1/2 » avec justification (aire de base × hauteur / 3).
  - L3 : actions « vecteurs », « produit vectoriel », « produit scalaire », « valeur absolue et 1/6 ».
  - L4 : libre.
  - L5 : « Pour quel m les points sont-ils coplanaires ? » (produit mixte du 1er degré en m), puis volume pour une valeur de m.
- **Générateur** : on tire A et trois vecteurs entiers dans [−3 ; 3]³ ; on garde si le produit mixte est non nul et divisible par 6 dans 2 items sur 3 (volume entier), sinon une fraction. Paramètre m : une coordonnée de D vaut m, et le produit mixte est am + b avec a ≠ 0 et −b/a entier. Gabarit 1 : volume du tétraèdre. Gabarit 2 : coplanarité. Gabarit 3 : volume du parallélépipède.
- **Corrigé type** : A(1 ; 1 ; 0), B(3 ; 2 ; 1), C(2 ; 4 ; 1), D(1 ; 2 ; 5).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | AB⃗ = (2 ; 1 ; 1), AC⃗ = (1 ; 3 ; 1), AD⃗ = (0 ; 1 ; 5) | Vecteurs |
  | 2 | AB⃗ ∧ AC⃗ = (−2 ; −1 ; 5) | Produit vectoriel |
  | 3 | (−2 ; −1 ; 5)·(0 ; 1 ; 5) = 24 | Produit mixte |
  | 4 | V = \|24\|/6 = 4 | Volume |
- **Aides** : 1 « Le volume du tétraèdre est le sixième du parallélépipède. » · 2 « V = □/6 » · 3 « V = 4 ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_tetra_factor`, `g4_cross_middle_sign`) ; `tf` (« Si [u⃗, v⃗, w⃗] = 0, alors deux des vecteurs sont colinéaires » : faux, contre-exemple (1 ; 0 ; 0), (0 ; 1 ; 0), (1 ; 1 ; 0)) ; `open`.
- **Pièges** : `g4_tetra_factor`, `g4_cross_middle_sign`.
- **Sous-buts → crédit** : produit vectoriel → `g4-cross` ; volume → `g4-triple`.

### `g4-dist-point` — Distance d'un point à un plan ou à une droite, pied de la perpendiculaire
- **Année** 12 · **Prérequis** `g4-plane`, `g4-dot` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g4-plane` : normale n⃗ lue sur l'équation du plan.
- **Intro** : point-plan : d = |ax₀ + by₀ + cz₀ + d| / ‖n⃗‖, et le pied H = P − ((ax₀ + by₀ + cz₀ + d)/‖n⃗‖²)·n⃗. Point-droite (A, v⃗) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖², puis d = PH ; ou d = ‖AP⃗ ∧ v⃗‖/‖v⃗‖ après `g4-cross`.
- **Juge** : `value` `{form:'exact'}` pour d ; `value` `{form:'point'}` pour H (juge par segment) · **Forme finale** : distance simplifiée et coordonnées de H.
- **Niveaux** :
  - L1 : formule point-plan avec trous.
  - L2 : décision « point-plan : formule » ou « point-droite : pied par projection ».
  - L3 : actions « évaluer l'équation en P », « diviser par ‖n⃗‖ », « pied H », « contrôle H dans le plan ».
  - L4 : libre, les deux cas mélangés.
  - L5 : MAN 2A Q1.2 modifié (vrai ou faux justifié : « la projection orthogonale de O sur d est-elle A ? »), sans aide.
- **Générateur** : à l'envers : H entier, n⃗ de norme entière ((1 ; 2 ; 2), (2 ; 3 ; 6), (2 ; −1 ; 2)…), P = H + k·n⃗ avec k entier non nul dans [−3 ; 3], d = |k|·‖n⃗‖. Pour la droite : H = A + t₀v⃗, P = H + w⃗ avec w⃗ ⟂ v⃗ entier de norme entière. Gabarit 1 : point-plan. Gabarit 2 : point-droite. Gabarit 3 : vrai ou faux sur un pied proposé (moitié des cas faux par `g4_proj_no_square`).
- **Corrigé type** : P(5 ; 0 ; 4), plan 2x − y + 2z − 9 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 2·5 − 0 + 2·4 − 9 = 9 | Évaluer en P |
  | 2 | d = \|9\|/√(4 + 1 + 4) = 9/3 = 3 | Distance |
  | 3 | H = P − (9/9)·(2 ; −1 ; 2) = (3 ; 1 ; 2) | Pied |
  | 4 | 2·3 − 1 + 2·2 − 9 = 0 | Contrôle |

  Second exemple (point-droite) : P(4 ; 3 ; 0), d : (1 ; 0 ; 0) + t(1 ; 2 ; 2). t = (3 + 6 + 0)/9 = 1, H = (2 ; 2 ; 2), PH⃗ = (−2 ; −1 ; 2), d = 3.
- **Aides** : 1 « Remplace P dans l'équation, puis divise par la norme de la normale. » · 2 « d = |□|/3 » · 3 « d = 3, H = (3 ; 1 ; 2) ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_dist_no_norm`, `g4_proj_no_square`) ; `tf` (énoncés du gabarit 3) ; `coef` (une coordonnée de H) ; `open`.
- **Pièges** : `g4_dist_no_norm`, `g4_proj_no_square`.
- **Sous-buts → crédit** : pied → `g4-dot` ; distance → `g4-dist-point`.

### `g4-dist-skew` — Distance entre deux droites gauches
- **Année** 12.5 · **Prérequis** `g4-triple`, `g4-relative-pos` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-relative-pos` : vérifier d'abord que les droites sont gauches.
- **Intro** : d₁ = (A, u⃗), d₂ = (B, v⃗), gauches. n⃗ = u⃗ ∧ v⃗ est orthogonal aux deux. d = |AB⃗·n⃗| / ‖n⃗‖ = |[AB⃗, u⃗, v⃗]| / ‖u⃗ ∧ v⃗‖. Si le produit mixte est nul, les droites ne sont pas gauches.
- **Juge** : `value` `{form:'vector'}` puis `{form:'exact'}` · **Forme finale** : distance simplifiée.
- **Niveaux** :
  - L1 : n⃗ donné ; trous dans AB⃗·n⃗ et la division.
  - L2 : décision « vérifier d'abord que les droites sont gauches » (produit mixte ≠ 0).
  - L3 : actions « n⃗ = u⃗ ∧ v⃗ », « AB⃗ », « produit scalaire », « diviser par ‖n⃗‖ ».
  - L4 : libre.
  - L5 : enchaînement avec `g4-common-perp` sur les mêmes droites.
- **Générateur** : à l'envers, comme pour `g4-common-perp` : on choisit n⃗ de norme entière, u⃗ et v⃗ entiers orthogonaux à n⃗ avec u⃗ ∧ v⃗ = n⃗ (ou un multiple), P = A + s₀u⃗ et Q = P + k·n⃗ ; les points de base affichés sont A et B = Q + t₀v⃗ (s₀, t₀ entiers non nuls, pour que les pieds ne soient pas les points donnés). Gabarit 1 : deux paramétriques. Gabarit 2 : une droite donnée par deux plans.
- **Corrigé type** : d₁ : (−1 ; 1 ; 0) + s(2 ; −1 ; 0) ; d₂ : (4 ; 2 ; 1) + t(2 ; 0 ; −1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | n⃗ = (2 ; −1 ; 0) ∧ (2 ; 0 ; −1) = (1 ; 2 ; 2) | Normale commune |
  | 2 | AB⃗ = (5 ; 1 ; 1) | Vecteur entre les droites |
  | 3 | AB⃗·n⃗ = 5 + 2 + 2 = 9 ≠ 0 : gauches | Produit mixte |
  | 4 | d = 9/‖n⃗‖ = 9/3 = 3 | Distance |
- **Aides** : 1 « Projette AB⃗ sur la direction perpendiculaire aux deux droites. » · 2 « d = |AB⃗·n⃗|/□ » · 3 « d = 3 ».
- **Variantes d'examen** : `mcq` (distracteurs `g4_dist_no_norm`, `g4_skew_any_points`) ; `tf` (« La distance entre deux droites gauches est la distance AB entre leurs points de base » : faux, contre-exemple de l'item, AB = √27 ≠ 3) ; `open`.
- **Pièges** : `g4_skew_any_points`, `g4_dist_no_norm`.
- **Sous-buts → crédit** : normale commune → `g4-cross` ; produit mixte → `g4-triple`.

### `g4-common-perp` — Perpendiculaire commune à deux droites gauches
- **Année** 12.5 · **Prérequis** `g4-dist-skew` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂. PQ⃗ est la perpendiculaire commune si PQ⃗·u⃗ = 0 **et** PQ⃗·v⃗ = 0. On résout ce système en s et t. Contrôle : ‖PQ⃗‖ est la distance de `g4-dist-skew`.
- **Juge** : `value` `{form:'vector', symbols:{s, t}}` pour PQ⃗(s, t) ; `value` pour s, t, P, Q ; `geom` `{object:'line3'}` pour la droite · **Forme finale** : P, Q et une équation de la droite (PQ).
- **Niveaux** :
  - L1 : PQ⃗(s, t) donné ; système à trous.
  - L2 : écrire PQ⃗(s, t) ; le système est à trous.
  - L3 : actions « point courant sur chaque droite », « PQ⃗ », « deux conditions », « résoudre », « droite (PQ) ».
  - L4 : libre.
  - L5 : distance puis perpendiculaire commune, sans aide.
- **Générateur** : comme `g4-dist-skew`. Contraintes : s₀, t₀ ∈ [−3 ; 3] non nuls, k ∈ {±1, ±2}, coordonnées des points de base dans [−8 ; 8]. Gabarit 1 : « Trouver la perpendiculaire commune ». Gabarit 2 : « Trouver les points P et Q les plus proches ».
- **Corrigé type** : mêmes droites que `g4-dist-skew`.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | PQ⃗ = (5 ; 1 ; 1) + t(2 ; 0 ; −1) − s(2 ; −1 ; 0) = (5 + 2t − 2s ; 1 + s ; 1 − t) | Vecteur PQ⃗ |
  | 2 | PQ⃗·u⃗ = 9 + 4t − 5s = 0 | 1re condition |
  | 3 | PQ⃗·v⃗ = 9 + 5t − 4s = 0 | 2e condition |
  | 4 | t = −s, puis 9 − 9s = 0 : s = 1, t = −1 | Résoudre |
  | 5 | P = (1 ; 0 ; 0), Q = (2 ; 2 ; 2) | Pieds |
  | 6 | (x ; y ; z) = (1 ; 0 ; 0) + k(1 ; 2 ; 2) ; ‖PQ⃗‖ = 3 | Droite et contrôle |
- **Aides** : 1 « Écris un point courant sur chaque droite, avec deux paramètres différents. » · 2 « PQ⃗·u⃗ = 2(5 + 2t − 2s) − (□) = 0 » · 3 « s = 1, t = −1 ».
- **Variantes d'examen** : `coef` (une coordonnée de P) ; `open`.
- **Pièges** : `g4_param_same_letter`, `g4_common_perp_one_condition`.
- **Sous-buts → crédit** : résoudre → `@alg:E-systemes-2x2` ; contrôle → `g4-dist-skew`.

### `g4-line-two-skew` — Droite qui s'appuie sur deux droites gauches
- **Année** 12.5 · **Prérequis** `g4-relative-pos`, `g4-cross` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on cherche n, de direction w⃗ donnée (par exemple normale à un plan α), qui coupe a et b. Méthode des plans : π contient a et la direction w⃗ (normale u⃗ ∧ w⃗) ; Q = π ∩ b ; n passe par Q avec la direction w⃗. Méthode des paramètres : Q(t) − P(s) = k·w⃗. Discussion : pas de solution si w⃗ est parallèle au plan qui contient b et la direction de a (π ∥ b) ; une infinité si b ⊂ π.
- **Juge** : `geom` `{object:'plane'}` pour π ; `value` pour Q ; `geom` `{object:'line3'}` pour n ; décisions pour la discussion · **Forme finale** : équation de n.
- **Niveaux** :
  - L1 : π donné ; trous dans l'intersection avec b.
  - L2 : décision « méthode des plans » ou « méthode des paramètres » (les deux `good`).
  - L3 : actions « normale de π », « équation de π », « π ∩ b », « droite n », « contrôle n ∩ a ».
  - L4 : libre.
  - L5 : MAN 2A Q3 modifié : marche à suivre, discussion du nombre de solutions (QCM), puis le cas numérique.
- **Générateur** : à l'envers : P, w⃗ entiers ; Q = P + k·w⃗ ; a passe par P avec u⃗, b par Q avec v⃗ ; on garde si a et b sont gauches et si u⃗, v⃗, w⃗ ne sont pas coplanaires. Points de base décalés d'un multiple entier de u⃗ et v⃗. Gabarit 1 : w⃗ donné directement. Gabarit 2 : « n normale au plan α ». Gabarit 3 : « n passe par un point M donné » (deux plans par M).
- **Corrigé type** : α : x − y + 2z = 5 (w⃗ = (1 ; −1 ; 2)) ; a : y = 2, x − z − 1 = 0 ; b : x = 2, y − z + 1 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | a : (−1 ; 2 ; −2) + s(1 ; 0 ; 1) ; b : (2 ; 2 ; 3) + t(0 ; 1 ; 1) | Paramétriques |
  | 2 | (1 ; 0 ; 1) ∧ (1 ; −1 ; 2) = (1 ; −1 ; −1) | Normale de π |
  | 3 | π : x − y − z + 1 = 0 | Plan qui contient a, de direction w⃗ |
  | 4 | 2 − (2 + t) − (3 + t) + 1 = 0, donc t = −1, Q = (2 ; 1 ; 2) | π ∩ b |
  | 5 | n : (x ; y ; z) = (2 ; 1 ; 2) + k(1 ; −1 ; 2) | Droite n |
  | 6 | k = −1 : (1 ; 2 ; 0) ∈ a | Contrôle |
- **Aides** : 1 « La droite n et la droite a sont dans un même plan, qui contient la direction w⃗. » · 2 « normale de π = u⃗ ∧ □ » · 3 « π : x − y − z + 1 = 0 ».
- **Variantes d'examen** : `mcq` (discussion : 0, 1 ou une infinité de solutions selon la position de b par rapport à π) ; `open`.
- **Pièges** : `g4_param_same_letter`, `g4_normal_as_direction`.
- **Sous-buts → crédit** : normale → `g4-cross` ; π ∩ b → `g4-relative-pos`.

### `g4-sphere` — Sphères : centre, rayon, plan tangent, section
- **Année** 12.5 · **Prérequis** `g4-dist-point`, `@alg:H-completer-carre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g4-dist-point` : section et tangence : distance du centre au plan.
- **Intro** : x² + y² + z² + Dx + Ey + Fz + G = 0 : on complète les carrés. Centre (−D/2 ; −E/2 ; −F/2), r² = (D² + E² + F²)/4 − G, si r² > 0. Plan tangent en T : (T − C)·(X − T) = 0. Section par un plan à distance δ < r : cercle de rayon √(r² − δ²), centré au pied de C.
- **Juge** : `geom` `{object:'sphere'}` ; segments `value` pour C et r, `geom` `{object:'plane'}` pour le plan tangent · **Forme finale** : C, r, puis l'objet demandé.
- **Niveaux** :
  - L1 : carrés complétés à trous.
  - L2 : décision « r² > 0, = 0 ou < 0 » (sphère, point, vide).
  - L3 : actions « compléter x », « y », « z », « rayon », « plan tangent », « section ».
  - L4 : libre.
  - L5 : sphère tangente à un plan, de centre sur une droite donnée, sans aide.
- **Générateur** : C entier dans [−5 ; 5]³, r ∈ {1, …, 7} ; T = C + w⃗ avec ‖w⃗‖ = r entier ((1 ; 2 ; 2)·k, (2 ; 3 ; 6), (0 ; 3 ; 4)…). 1 item sur 6 a r² ≤ 0 (réponse « point » ou « vide »). Gabarit 1 : centre et rayon. Gabarit 2 : plan tangent en T. Gabarit 3 : section par un plan.
- **Corrigé type** : x² + y² + z² − 2x + 4y − 6z + 5 = 0, T(2 ; 0 ; 5).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x − 1)² − 1 + (y + 2)² − 4 + (z − 3)² − 9 + 5 = 0 | Compléter les carrés |
  | 2 | (x − 1)² + (y + 2)² + (z − 3)² = 9 | Forme réduite |
  | 3 | C(1 ; −2 ; 3), r = 3 | Centre et rayon |
  | 4 | CT⃗ = (1 ; 2 ; 2) | Normale du plan tangent |
  | 5 | x + 2y + 2z − 12 = 0 | Plan tangent |
- **Aides** : 1 « Complète un carré par variable, comme pour un cercle. » · 2 « (x − 1)² − □ » · 3 la forme réduite.
- **Variantes d'examen** : `mcq` (distracteurs `g4_square_constant`, `g4_not_normalized`) ; `tf` (« x² + y² + z² + 2x + 5 = 0 est une sphère » : faux, r² = −4) ; `open`.
- **Pièges** : `g4_square_constant`, `g4_not_normalized`.
- **Sous-buts → crédit** : compléter les carrés → `@alg:H-completer-carre` ; plan tangent → `g4-plane`.

## Pièges du module

Tous les pièges G4 sont de tag E (expérience d'enseignement, à faire relire), sauf mention.

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g4_vector_reversed` | geometry | E | `g4-vectors` | `g4-vectors` | AB⃗ = A − B → B − A | Dans `prev`, chaque `vec(P,Q)` est remplacé par P − Q. | « Tu as calculé A − B = (…). Le vecteur AB⃗ va de A vers B : c'est B − A = (…), l'arrivée moins le départ. » |
| `g4_midpoint_half` | rule | E | `g4-vectors` | `g4-vectors` | M = (B − A)/2 → (A + B)/2 | Remplace chaque milieu (A + B)/2 de la solution par (B − A)/2 ; pour C = 2M − A, produit C = M − A et C = 2M + A. | « (B − A)/2 est la moitié du vecteur AB⃗, pas le milieu. Le milieu est la moyenne des coordonnées : ((…) + (…))/2. » |
| `g4_normal_as_direction` | geometry | E | `g4-line2` | `g4-line2` | 2x − 3y − 8 = 0 a la direction (2 ; −3) → (3 ; 2) | Pour une cartésienne ax + by + c = 0 (plan ou droite), produit la paramétrique A + t(a ; b) (resp. A + t(a ; b ; c) pour une droite orthogonale à un plan prise comme contenue). | « Dans ax + by + c = 0, (a ; b) = (2 ; −3) est **perpendiculaire** à la droite. Une direction est (−b ; a) = (3 ; 2). » |
| `g4_line_constant` | sign | E | `g4-line2` | `g4-line2` | 2x − 3y = 8 écrit 2x − 3y + 8 = 0 | Garde les coefficients a, b (ou a, b, c) et remplace la constante c par −c, puis par 0. | « Ta droite a la bonne direction, mais A(1 ; −2) n'est pas dessus : 2·1 − 3·(−2) + 8 = 16 ≠ 0. Calcule la constante en remplaçant A. » |
| `g4_bisector_unnormalized` | geometry | E | `g4-bisectors` | `g4-bisectors` | \|a₁x + b₁y + c₁\| = \|a₂x + b₂y + c₂\| sans les normes | Quand ‖n₁‖ ≠ ‖n₂‖, produit les deux droites (a₁x + b₁y + c₁) ∓ (a₂x + b₂y + c₂) = 0. | « Les normales n'ont pas la même longueur (‖n₁‖ = …, ‖n₂‖ = …). Une expression ax + by + c n'est une distance qu'après division par √(a² + b²). » |
| `g4_bisector_one_sign` | method | E | `g4-bisectors` | `g1-abs-eq` | une seule bissectrice → deux | Ne garde que le cas + de la ligne avec valeurs absolues. | « \|A\| = \|B\| donne A = B **ou** A = −B. Il y a deux bissectrices, perpendiculaires. » |
| `g4_line3_one_equation` | geometry | E | `g4-line3` | `g4-line3` | (x − 1)/2 = (y + 2)/1 seul → deux équations | Garde la première égalité de la chaîne et oublie la seconde. | « Une seule équation en x, y, z décrit un plan. Il en faut deux pour une droite. » |
| `g4_normal_sum` | geometry | E | `g4-plane` | `g4-dot` | n⃗ = AB⃗ + AC⃗ → solution de n⃗·AB⃗ = n⃗·AC⃗ = 0 | Produit le plan de normale AB⃗ + AC⃗ (puis AB⃗ − AC⃗) passant par A. | « (…) + (…) est dans le plan, pas perpendiculaire à lui : (…)·AB⃗ = … ≠ 0. La normale doit être orthogonale aux deux directions. » |
| `g4_skew_as_secant` | geometry | E | `g4-relative-pos` | `g4-relative-pos` | non parallèles ⇒ sécantes → gauches | `wrongValues` : la position « sécantes » quand la vérité est « gauches ». | « Dans l'espace, deux droites non parallèles peuvent ne jamais se couper. Ton système en s et t n'a pas de solution : la 3e équation donne … ≠ …. » |
| `g4_param_same_letter` | method | E | `g4-relative-pos` | `g4-relative-pos` | A + t·u⃗ = B + t·v⃗ → A + s·u⃗ = B + t·v⃗ | Dans le système de `prev`, remplace s par t ; produit sa solution (souvent « aucune ») ou le point obtenu. | « Avec le même paramètre t, tu cherches deux mobiles **au même instant**. Le point commun peut être atteint à des instants différents : prends s et t. » |
| `g4_angle_obtuse` | geometry | E | `g4-dot` | `g4-dot` | angle de deux droites 2π/3 → π/3 | `wrongValues` : π − θ quand l'item demande l'angle de deux droites. | « Deux droites font deux angles, θ et π − θ. On donne le plus petit, avec \|cos θ\| = …. » |
| `g4_proj_no_square` | geometry | E | `g4-dot` | `g4-dot` | (u⃗·v⃗/‖v⃗‖)·v⃗ → (u⃗·v⃗/‖v⃗‖²)·v⃗ | Dans la ligne de projection, remplace ‖v⃗‖² par ‖v⃗‖ (et produit aussi la version sans division). | « u⃗·v⃗/‖v⃗‖ est une longueur. Pour un vecteur, on multiplie par le vecteur **unitaire** v⃗/‖v⃗‖ : il faut diviser par ‖v⃗‖ deux fois, donc par ‖v⃗‖² = …. » |
| `g4_cross_middle_sign` | sign | E | `g4-cross` | `g4-cross` | (2 ; −7 ; 1) → (2 ; 7 ; 1) | Change le signe de la 2e composante du produit vectoriel calculé. | « La 2e composante est u₃v₁ − u₁v₃ = 3·1 − 2·(−2) = 7. Avec le développement par la 1re ligne, le cofacteur du milieu porte un signe −. Contrôle : (2 ; −7 ; 1)·u⃗ = … ≠ 0. » |
| `g4_cross_commute` | rule | E | `g4-cross` | `g4-cross` | v⃗ ∧ u⃗ = u⃗ ∧ v⃗ → −u⃗ ∧ v⃗ | Quand `prev` contient v ∧ u, produit la valeur de u ∧ v. | « Le produit vectoriel change de signe quand on échange les facteurs. v⃗ ∧ u⃗ = −(…). » |
| `g4_tetra_factor` | rule | E | `g4-triple` | `g4-triple` | V = 24 → 24/6 = 4 | `wrongValues` : \|[…]\|, \|[…]\|/2, \|[…]\|/3. | « \|24\| est le volume du parallélépipède. Le tétraèdre en est le sixième : ½ pour la base triangulaire, ⅓ pour la pyramide. » |
| `g4_dist_no_norm` | geometry | E | `g4-dist-point` | `g4-dist-point` | d = 9 → 9/3 | `wrongValues` : \|ax₀ + by₀ + cz₀ + d\| sans division, et la valeur signée. | « 9 est la valeur de l'équation en P, pas une distance. Elle devient une distance après division par ‖n⃗‖ = 3. » |
| `g4_skew_any_points` | geometry | E | `g4-dist-skew` | `g4-dist-skew` | d = ‖AB⃗‖ → \|AB⃗·n⃗\|/‖n⃗‖ | `wrongValues` : ‖AB⃗‖ entre les points de base. | « A et B sont des points quelconques des droites. La distance est la plus courte : c'est la projection de AB⃗ sur n⃗. » |
| `g4_common_perp_one_condition` | method | E | `g4-common-perp` | `g4-common-perp` | PQ⃗ ⟂ u⃗ seulement → ⟂ u⃗ et v⃗ | Résout PQ⃗·u⃗ = 0 avec t = 0 (ou s = 0) et produit le point obtenu. | « PQ⃗ doit être perpendiculaire aux **deux** droites. Ta ligne vérifie PQ⃗·u⃗ = 0 mais PQ⃗·v⃗ = … ≠ 0. » |
| `g4_square_constant` | rule | E | `g4-sphere`, `g10-circle-eq` | `@alg:H-completer-carre` | x² − 4x = (x − 2)² → (x − 2)² − 4 | Dans la ligne où l'élève complète les carrés, retire chaque terme −h² (et −k², −l² pour une sphère) ; produit le r² obtenu. Juges : `geom`, `conic`, `equiv`. | « (x − 2)² = x² − 4x + 4 : tu as ajouté 4 en écrivant le carré, il faut le retirer. Ton rayon² devient … au lieu de …. » |
| `g4_not_normalized` | rule | E | `g4-sphere`, `g10-circle-eq` | `g4-sphere` | 3x² + 3y² + 42x − 6y + 75 = 0 : Ω = (−21 ; 3) → (−7 ; 1) | Lit Ω = (−D/2 ; −E/2) et r² = h² + k² − F sur l'équation non divisée par le coefficient de x². | « Le centre se lit sur x² + y² + Dx + Ey + F = 0, avec 1 devant x². Divise d'abord tout par …. » |

`g4-sphere` et `g10-circle-eq` partagent deux pièges : `g4_square_constant` et `g4_not_normalized`. Ils sont définis une seule fois, ici, parce que G4 vient avant G10 dans l'ordre du graphe (README §16.4), et leurs `judges` comprennent `geom`.

## Exemples de type examen

### E1. Tétraèdre (d'après MAN Math 2A, 2018, 5 points)

On donne A(3 ; 1 ; 2), B(1 ; 2 ; 0), C(2 ; 4 ; 0), D(2 ; 2 ; −1).

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| 1. Montrer que B, C, D définissent un plan | BC⃗ = (1 ; 2 ; 0), BD⃗ = (1 ; 0 ; −1), BC⃗ ∧ BD⃗ = (−2 ; 1 ; −2) ≠ 0⃗ ; plan 2x − y + 2z = 0 | 1 | `g4-plane`, `g4-cross` |
| 2. Distance de A au plan BCD | \|6 − 1 + 4\|/3 = 3 | 1,5 | `g4-dist-point` |
| 3. Pied de la hauteur issue de B dans le triangle BCD | H = C + t·CD⃗, CD⃗ = (0 ; −2 ; −1), BH⃗·CD⃗ = 5t − 4 = 0, H = (2 ; 12/5 ; −4/5) | 1,5 | `g4-dot` |
| 4. Volume du tétraèdre ABCD | ⅓·(½·3)·3 = 3/2 ; contrôle \|(−2 ; 1 ; −2)·(2 ; −1 ; 2)\|/6 = 9/6 | 1 | `g4-triple` |

Item `problem` : 4 parties `lines`, `points: [[0.5, 0.5], [0.5, 1], [0.5, 0.5, 0.5], [0.5, 0.5]]`. La partie 4 accepte les deux méthodes (base × hauteur, ou produit mixte).

---

# G10. Cercles et coniques

Unité `coniques` · préfixe `g10-` · pièges `g10_` · Statut : à faire

**Sources** : CMS, Géométrie analytique, semestre 2 (séries 13 à 23 : cercles, polaires, axe radical, cercles orthogonaux, ellipse, hyperbole, parabole, familles, coordonnées homogènes, réduction) ; contrôles 3 et 4 (2018 : cercle tangent, ellipse et polaire, lieu, réduction d'une conique avec terme en xy, famille de coniques et lieu des centres, parabole et hyperbole orthogonales) ; organigramme personnel « nature d'une conique » (plan, §2).
**Notation** : équation générale ax² + bxy + cy² + dx + ey + f = 0. Matrice de la forme quadratique A = [[a, b/2], [b/2, c]], δ = det A = ac − b²/4. Matrice complète M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]], Δ = det M. Ellipse x²/a² + y²/b² = 1, hyperbole x²/a² − y²/b² = 1, c > 0 la demi-distance focale, e = c/a. Parabole (x − h)² = 2p(y − k) : sommet (h ; k), foyer (h ; k + p/2), directrice y = k − p/2 (convention du corrigé CMS 2018). Repère réduit Ru = (Ω, u₁, u₂), direct.
**Prérequis extérieurs** : `l-eig-charpoly`, `l-eig-space`, `@alg:H-completer-carre`, `@alg:H-discriminant`, `@alg:E-systemes-2x2`, `@alg:I-second-degre-parametres`, `g1-irr-eq`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g1-irr-eq`, `g4-bisectors`, `g4-triple`, `l-eig-charpoly`, `l-eig-space`.

## Compétences

### `g10-circle-eq` — Cercle : centre, rayon, cercle par trois points
- **Année** 12.5 · **Prérequis** `g4-bisectors`, `@alg:H-completer-carre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U5). Gabarit 1 (équation générale, multipliée par 1, 2, 3 ou 5 ; 1 item sur 8 a r² ≤ 0 aux niveaux 3 et 4, jugé par `conic` quand r² < 0) aux niveaux 1 à 3, gabarits 2 (trois points sur un cercle de rayon 5, 10 ou 13) et 3 (diamètre) au niveau 4. Ω est une partie `vector` (avec `circleEq` pour `g4_not_normalized`), r une partie `value`, la nature (cercle, point, vide) une décision. Le niveau 5 et la variante `open` sont le cercle par trois points, sans aide (pas d'enchaînement avec le cercle tangent du contrôle 3). Le V/F faux demande r² en contre-exemple.
- **Intro** : on divise par le coefficient de x² (qui doit être celui de y², sans terme en xy), puis on complète les carrés : (x − h)² + (y − k)² = r². Si le second membre est nul, c'est un point ; négatif, l'ensemble est vide. Par trois points : intersection de deux médiatrices.
- **Juge** : `geom` `{object:'circle'}` ; éléments `Ω`, `r` · **Forme finale** : Ω et r (ou « point », « vide »).
- **Niveaux** :
  - L1 : division faite ; carrés à trous.
  - L2 : décision « diviser d'abord par 2 » ; carrés à trous.
  - L3 : actions « normaliser », « compléter x », « compléter y », « lire Ω et r », « médiatrice ».
  - L4 : libre, les deux gabarits.
  - L5 : CMS contrôle 3 Q1 (a) : centres de cercles donnés, puis cercle par deux points et tangent à un autre (enchaîné avec `g10-circle-tangent`).
- **Générateur** : Ω entier dans [−8 ; 8]², r entier dans [1 ; 7] ; on multiplie l'équation développée par k ∈ {1, 2, 3, 5}. 1 item sur 8 a r² ≤ 0. Par trois points : A, B, C entiers sur un cercle de rayon 5, 10 ou 13 (triplets pythagoriciens), translatés. Gabarit 1 : équation générale. Gabarit 2 : trois points. Gabarit 3 : diamètre [AB].
- **Corrigé type** : 2x² + 2y² − 8x + 12y − 24 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x² + y² − 4x + 6y − 12 = 0 | Normaliser |
  | 2 | (x − 2)² − 4 + (y + 3)² − 9 − 12 = 0 | Compléter les carrés |
  | 3 | (x − 2)² + (y + 3)² = 25 | Forme réduite |
  | 4 | Ω = (2 ; −3), r = 5 | Lire |
- **Aides** : 1 « Divise par 2, puis complète un carré en x et un en y. » · 2 « (x − 2)² − □ + (y + 3)² − □ − 12 = 0 » · 3 la forme réduite.
- **Variantes d'examen** : `mcq` (distracteurs `g4_square_constant`, `g4_not_normalized`) ; `tf` (« x² + y² + 2x + 2 = 0 est un cercle » : faux, r² = −1) ; `open`.
- **Pièges** : `g4_square_constant`, `g4_not_normalized`.
- **Sous-buts → crédit** : compléter les carrés → `@alg:H-completer-carre` ; médiatrice → `g4-bisectors`.

### `g10-circle-tangent` — Tangentes à un cercle
- **Année** 12.5 · **Prérequis** `g10-circle-eq`, `@alg:H-discriminant` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g10-circle-eq` : centre et rayon du cercle.
- **Statut** : fait le 10 novembre 2026 (étape U5). Gabarits 1 (en T, dédoublement), 2 (depuis Q, toujours avec |ΩQ| > r et r = 5, une tangente verticale une fois sur trois) et 3 (tangentes parallèles à une droite, normale de norme entière). Depuis Q : ΩQ² (`value`), la décision « la verticale est-elle tangente ? », l'équation en m (`solset`), puis les deux tangentes (`geom` `count: 2`). La méthode du discriminant n'est qu'une option de la décision du niveau 3. Le niveau 5 : gabarit 3 ou 2, sans aide.
- **Intro** : en T du cercle : (x_T − h)(x − h) + (y_T − k)(y − k) = r². Depuis un point Q extérieur : une droite est tangente si sa distance au centre vaut r. **On teste d'abord la droite verticale** x = x_Q, puis y − y_Q = m(x − x_Q). Méthode équivalente : discriminant nul de l'intersection.
- **Juge** : `geom` `{object:'line2', count:2}` (ou une seule droite en T) ; segment `equiv` `{vars:['m']}` pour l'équation en m · **Forme finale** : toutes les tangentes.
- **Niveaux** :
  - L1 : tangente en un point, formule à trous.
  - L2 : depuis Q, droite verticale déjà testée ; équation en m à trous.
  - L3 : décision « en T : dédoublement » / « depuis Q : distance au centre » / « depuis Q : discriminant » (les deux dernières `good`) ; puis lignes.
  - L4 : libre.
  - L5 : tangentes parallèles à une direction donnée, ou cercle tangent à deux droites, sans aide.
- **Générateur** : Ω, r comme `g10-circle-eq`. Tangente en T : T = Ω + w⃗ avec w⃗ entier de norme r ((3 ; 4), (0 ; 5), (6 ; 8)…). Depuis Q : on choisit les deux points de contact sur des directions entières de norme r, puis Q = intersection des tangentes ; on garde si Q est entier. 1 item sur 3 a une tangente verticale. Gabarit 1 : en T. Gabarit 2 : depuis Q. Gabarit 3 : de pente donnée.
- **Corrigé type** : γ : (x − 2)² + (y + 3)² = 25, Q(−3 ; 7).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ΩQ² = 25 + 100 = 125 > 25 : Q est extérieur | Position de Q |
  | 2 | x = −3 : distance à Ω = \|−3 − 2\| = 5 = r : tangente | Tester la verticale |
  | 3 | y − 7 = m(x + 3), soit mx − y + 3m + 7 = 0 | Droites non verticales par Q |
  | 4 | \|2m + 3 + 3m + 7\|/√(m² + 1) = 5 | Distance au centre = r |
  | 5 | (5m + 10)² = 25(m² + 1), donc 100m = −75, m = −3/4 | Résoudre |
  | 6 | 3x + 4y − 19 = 0 et x = −3 | Les deux tangentes |
- **Aides** : 1 « Une tangente est à la distance r du centre. Pense à la droite verticale. » · 2 « |5m + 10| = 5√(□) » · 3 les deux tangentes.
- **Variantes d'examen** : `mcq` (distracteur `g10_vertical_tangent_lost`) ; `tf` (« Depuis un point extérieur, on trouve toujours deux pentes m » : faux, contre-exemple de l'item) ; `open`.
- **Pièges** : `g10_vertical_tangent_lost`, `g10_tangent_radius_direction`.
- **Sous-buts → crédit** : distance au centre → `g4-bisectors` ; résoudre → `@alg:H-discriminant`.

### `g10-power-radical` — Puissance d'un point, axe radical, cercles orthogonaux
- **Année** 12.5 · **Prérequis** `g10-circle-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U5). Gabarits 1 (axe radical ; une équation multipliée par 2 ou 3 à partir du niveau 2), 2 (puissance d'un point) et 3 (orthogonaux : γ₁ sous forme réduite, Ω₂ et r₂² lus sur γ₂, puis Ω₁Ω₂² − (r₁² + r₂²) ; la conclusion est dans la note, et `g10_orthogonal_sum` est une option de la décision « orthogonaux si… »). Niveau 5 et `open` : le cercle orthogonal à deux cercles, de centre sur une droite (axe radical ∩ d, r² = γ₁(Ω)).
- **Intro** : avec l'équation **normalisée** γ(x, y) = x² + y² + Dx + Ey + F, la puissance de P est γ(P) = ΩP² − r². Elle est négative à l'intérieur. Axe radical de γ₁ et γ₂ : γ₁(x, y) − γ₂(x, y) = 0, droite perpendiculaire à Ω₁Ω₂. γ₁ et γ₂ sont orthogonaux si Ω₁Ω₂² = r₁² + r₂².
- **Juge** : `value` pour les puissances ; `geom` `{object:'line2'}` pour l'axe ; décision pour l'orthogonalité · **Forme finale** : axe radical, et réponse oui/non justifiée.
- **Niveaux** :
  - L1 : soustraction à trous.
  - L2 : décision « les équations sont-elles normalisées ? ».
  - L3 : actions « normaliser », « soustraire », « centres et rayons », « comparer Ω₁Ω₂² et r₁² + r₂² ».
  - L4 : libre.
  - L5 : CMS série 16 modifiée : cercle orthogonal à deux cercles donnés et dont le centre est sur une droite donnée, sans aide.
- **Générateur** : Ω₁, Ω₂ entiers, r₁, r₂ entiers ; pour l'orthogonalité, on tire Ω₁Ω₂⃗ = (p ; q) puis r₁, r₂ avec p² + q² = r₁² + r₂² (table de décompositions, par exemple 13 = 9 + 4, 25 = 9 + 16, 50 = 1 + 49). Une équation sur deux est multipliée par k ∈ {2, 3}. Gabarit 1 : axe radical. Gabarit 2 : puissance d'un point et position. Gabarit 3 : orthogonaux ou non.
- **Corrigé type** : γ₁ : x² + y² − 4x − 2y − 4 = 0, γ₂ : x² + y² + 2x − 6y + 6 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | γ₁ − γ₂ : −6x + 4y − 10 = 0 | Soustraire |
  | 2 | 3x − 2y + 5 = 0 | Axe radical |
  | 3 | Ω₁ = (2 ; 1), r₁ = 3 ; Ω₂ = (−1 ; 3), r₂ = 2 | Centres et rayons |
  | 4 | Ω₁Ω₂² = 9 + 4 = 13 = r₁² + r₂² | Comparer |
  | 5 | Les cercles sont orthogonaux | Conclure |
- **Aides** : 1 « Normalise, puis soustrais les deux équations : les carrés disparaissent. » · 2 « (−4x − 2y − 4) − (□) = 0 » · 3 « 3x − 2y + 5 = 0 ».
- **Variantes d'examen** : `mcq` (distracteur `g10_radical_unnormalized`) ; `tf` (« L'axe radical de deux cercles est toujours leur corde commune » : faux, contre-exemple deux cercles disjoints, que l'axe ne coupe pas) ; `open`.
- **Pièges** : `g10_radical_unnormalized`, `g10_orthogonal_sum`.
- **Sous-buts → crédit** : centres et rayons → `g10-circle-eq`.

### `g10-pole-polar` — Pôle et polaire par rapport à un cercle
- **Année** 12.5 · **Prérequis** `g10-circle-tangent` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U5). Triplets (ΩP⃗, w⃗, w⃗′) énumérés une fois (r² ≤ 26, points de contact entiers). Gabarits 1 (polaire), 2 (pôle : P = Ω + λ·(a ; b), une ligne `vector`) et 3 (polaire, équation du 2e degré en x, ou en y si la polaire est verticale, T₁ et T₂, tangentes `count: 2`) ; niveau 5 et `open` : gabarit 3 sans aide.
- **Intro** : polaire de P(x₀ ; y₀) par rapport à (x − h)² + (y − k)² = r² : (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² (dédoublement). Si P est extérieur, c'est la droite des points de contact des tangentes issues de P. Le pôle d'une droite se trouve en identifiant les coefficients.
- **Juge** : `geom` `{object:'line2'}` pour la polaire ; `value` `{form:'point'}` pour le pôle et les points de contact · **Forme finale** : polaire, ou pôle.
- **Niveaux** :
  - L1 : dédoublement à trous.
  - L2 : décision « polaire » ou « pôle » ; identification à trous.
  - L3 : actions « dédoubler », « développer », « intersecter avec le cercle », « tangentes par les points de contact ».
  - L4 : libre.
  - L5 : tangentes issues de P par la polaire (méthode sans pente), sans aide.
- **Générateur** : Ω entier ; on tire ΩP⃗ entier et w⃗ entier avec w⃗·ΩP⃗ = ‖w⃗‖² = r², et w⃗' = 2(r²/‖ΩP⃗‖²)·ΩP⃗ − w⃗ entier, pour que les deux points de contact Ω + w⃗ et Ω + w⃗' soient entiers. Table précalculée de triplets (ΩP⃗, w⃗, w⃗'), par exemple ((3 ; 1), (1 ; 2), (2 ; −1)), tournés et signés. Gabarit 1 : polaire de P. Gabarit 2 : pôle d'une droite. Gabarit 3 : points de contact et tangentes.
- **Corrigé type** : γ : (x − 1)² + (y + 2)² = 5, P(4 ; −1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 3(x − 1) + 1·(y + 2) = 5 | Dédoubler |
  | 2 | 3x + y − 6 = 0 | Polaire |
  | 3 | y = 6 − 3x dans γ : (x − 1)² + (8 − 3x)² = 5, soit x² − 5x + 6 = 0 | Intersecter |
  | 4 | T₁ = (2 ; 0), T₂ = (3 ; −3) | Points de contact |
  | 5 | x + 2y − 2 = 0 et 2x − y − 9 = 0 | Tangentes PT₁ et PT₂ |
- **Aides** : 1 « Remplace un des deux x par x₀ et un des deux y par y₀ dans la forme réduite. » · 2 « (4 − 1)(x − 1) + (□)(y + 2) = 5 » · 3 « 3x + y − 6 = 0 ».
- **Variantes d'examen** : `mcq` (distracteur `g10_polar_origin_formula`) ; `tf` (« La polaire d'un point intérieur coupe le cercle » : faux, contre-exemple P = Ω + (1 ; 0) avec r = 2, polaire à distance 4 du centre) ; `open`.
- **Pièges** : `g10_polar_origin_formula`.
- **Sous-buts → crédit** : intersecter → `@alg:H-discriminant` ; tangentes → `g10-circle-tangent`.

### `g10-ellipse` — Ellipse : axes, foyers, excentricité, directrices
- **Année** 12.5 · **Prérequis** `@alg:H-completer-carre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:H-completer-carre` : compléter les carrés jusqu'à la forme réduite.
- **Statut** : fait le 10 novembre 2026 (étape U5). (a, b) dans (5, 4), (5, 3) deux fois sur trois, sinon (3, 2), (4, 2), (3, 1), (2, 1), (4, 3), (4, 1) ; (13, 12) et (10, 8) ne sont pas tirés (coefficients trop grands). Parties `conic` : forme réduite, puis Ω, a, b (décision « grand axe » au niveau 2), c et foyers, e et directrices. Gabarit 2 : foyers et excentricité. Gabarit 3 (esquisse) : un item `plot` sur quatre au niveau 4 (Ω, sommets du grand axe, foyers). Le niveau 5 n'enchaîne pas avec `g10-conic-from-data` : c'est l'étude complète sans aide. Le V/F « e > 1 possible » devient « 0 < e < 1 » (vrai) ou « foyers à √(a² + b²) » (faux, contre-exemple a, b).
- **Intro** : on complète les carrés jusqu'à (x − h)²/A + (y − k)²/B = 1. Le grand axe est du côté du **plus grand** dénominateur. c² = a² − b², e = c/a < 1, directrices à distance a²/c du centre, perpendiculaires au grand axe.
- **Juge** : `conic` `{equation}` avec lignes d'éléments · **Forme finale** : Ω, a, b, foyers, e, directrices (ceux que l'item demande).
- **Niveaux** :
  - L1 : forme réduite donnée ; éléments à trous.
  - L2 : complétion à trous ; décision « grand axe horizontal ou vertical ».
  - L3 : actions « compléter », « diviser par le second membre », « a, b, c », « foyers », « directrices ».
  - L4 : libre.
  - L5 : ellipse donnée par des éléments (enchaîne `g10-conic-from-data`), puis esquisse, sans aide.
- **Générateur** : Ω entier dans [−5 ; 5]², (a, b, c) avec c² = a² − b² ; 2 items sur 3 avec (a, b, c) pythagoricien (5, 4, 3), (5, 3, 4), (13, 12, 5), (10, 8, 6), sinon c irrationnel. Grand axe vertical 1 fois sur 2. Équation développée multipliée par a²b² (coefficients entiers). Gabarit 1 : tous les éléments. Gabarit 2 : seulement foyers et excentricité. Gabarit 3 : esquisse (`plot` `task:'conic'`).
- **Corrigé type** : 4x² + 9y² − 16x + 54y + 61 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 4(x − 2)² − 16 + 9(y + 3)² − 81 + 61 = 0 | Compléter |
  | 2 | (x − 2)²/9 + (y + 3)²/4 = 1 | Forme réduite |
  | 3 | Ω = (2 ; −3), a = 3, b = 2, grand axe horizontal | Éléments |
  | 4 | c = √5, F = (2 + √5 ; −3), F' = (2 − √5 ; −3) | Foyers |
  | 5 | e = √5/3 ; directrices x = 2 ± 9√5/5 | Excentricité, directrices |
- **Aides** : 1 « Mets 4 en facteur dans les x, 9 dans les y, puis complète. » · 2 « c² = a² − b² = □ » · 3 les foyers.
- **Variantes d'examen** : `mcq` (distracteurs `g10_c_wrong_formula`, `g10_axis_swap`) ; `tf` (« Une ellipse peut avoir une excentricité > 1 » : faux, c < a) ; `coef` (une coordonnée d'un foyer) ; `open`.
- **Pièges** : `g10_c_wrong_formula`, `g10_axis_swap`, `g4_square_constant`.
- **Sous-buts → crédit** : compléter → `@alg:H-completer-carre`.

### `g10-hyperbola` — Hyperbole : foyers, asymptotes, directrices
- **Année** 12.5 · **Prérequis** `@alg:H-completer-carre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:H-completer-carre` : compléter les carrés jusqu'à la forme réduite.
- **Statut** : fait le 10 novembre 2026 (étape U5). (a, b) dans (4, 3), (3, 4), (8, 6), (6, 8) trois fois sur quatre, sinon des c irrationnels ; (12, 5) n'est pas tiré. L'axe réel vertical donne toujours un second membre négatif avant division. Parties `conic` : forme réduite, Ω a b c (décision « axe réel » au niveau 2), foyers et e, asymptotes, directrices (niveaux 4 et 5). Gabarit 3 : a = b. Niveau 5 : une fois sur deux l'esquisse (`plot` : Ω, sommets, asymptotes, sans aide), sinon l'étude complète ; la question sur un point de l'hyperbole n'est pas posée. Le V/F est l'énoncé vrai du catalogue.
- **Intro** : forme réduite (x − h)²/a² − (y − k)²/b² = 1 (axe réel horizontal) ou (y − k)²/a² − (x − h)²/b² = 1 (axe réel vertical). On regarde **le terme positif quand le second membre vaut +1**. c² = a² + b², e = c/a > 1, asymptotes y − k = ±(b/a)(x − h) pour l'axe horizontal.
- **Juge** : `conic` `{equation}` avec lignes d'éléments · **Forme finale** : Ω, sommets, foyers, asymptotes (cartésiennes entières), e.
- **Niveaux** :
  - L1 : forme réduite donnée ; éléments à trous.
  - L2 : décision « axe réel horizontal ou vertical » après la complétion.
  - L3 : actions « compléter », « diviser », « a, b, c », « foyers », « asymptotes ».
  - L4 : libre ; 1 item sur 2 a un second membre négatif avant division (comme 9x² − 4y² − 54x + 117 = 0).
  - L5 : CMS contrôle 4 Q3 (a) : esquisse avec asymptotes (`plot`), puis question sur un point de l'hyperbole.
- **Générateur** : Ω entier, (a, b, c) pythagoricien ((4, 3, 5), (3, 4, 5), (12, 5, 13), (8, 6, 10)) pour 3 items sur 4. Axe vertical 1 fois sur 2. Gabarit 1 : tous les éléments. Gabarit 2 : asymptotes seulement. Gabarit 3 : hyperbole équilatère (a = b).
- **Corrigé type** : 9x² − 16y² − 18x − 64y − 199 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 9(x − 1)² − 9 − 16(y + 2)² + 64 − 199 = 0 | Compléter |
  | 2 | (x − 1)²/16 − (y + 2)²/9 = 1 | Forme réduite |
  | 3 | Ω = (1 ; −2), a = 4, b = 3, c = 5, axe réel horizontal | Éléments |
  | 4 | F = (6 ; −2), F' = (−4 ; −2), e = 5/4 | Foyers |
  | 5 | 3x − 4y − 11 = 0 et 3x + 4y + 5 = 0 | Asymptotes |
  | 6 | Directrices x = 21/5 et x = −11/5 | Directrices |
- **Aides** : 1 « Pour une hyperbole, c² = a² + b². » · 2 « y + 2 = ±(□/□)(x − 1) » · 3 les deux asymptotes.
- **Variantes d'examen** : `mcq` (distracteurs `g10_c_wrong_formula`, `g10_axis_swap`, `g10_asymptote_ratio`) ; `tf` (« Les asymptotes de x²/a² − y²/b² = 1 sont perpendiculaires si et seulement si a = b » : vrai) ; `open`.
- **Pièges** : `g10_c_wrong_formula`, `g10_axis_swap`, `g10_asymptote_ratio`.
- **Sous-buts → crédit** : compléter → `@alg:H-completer-carre`.

### `g10-parabola` — Parabole : sommet, foyer, directrice
- **Année** 12.5 · **Prérequis** `@alg:H-completer-carre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:H-completer-carre` : compléter le carré jusqu'à la forme réduite.
- **Statut** : fait le 10 novembre 2026 (étape U5). Gabarits 1 (équation développée), 2 (foyer et directrice : MF² = d(M, D)², puis forme réduite, sommet et axe) et 3 (axe et deux points : 2p, puis k (ou h), puis l'équation ; p = ±1 ou ±2 pour des points entiers). p est une partie `value` (signé, comme dans (x − h)² = 2p(y − k)). Le niveau 5 et `open` sont les gabarits 2 ou 3 sans aide ; la parabole qui coupe une hyperbole orthogonalement (contrôle 4, Q3 b) n'est pas faite.
- **Intro** : on met sous la forme (x − h)² = 2p(y − k) (axe vertical) ou (y − k)² = 2p(x − h) (axe horizontal). Le foyer est à **p/2** du sommet, la directrice à p/2 de l'autre côté. Tout point est à égale distance du foyer et de la directrice.
- **Juge** : `conic` `{equation}` avec lignes d'éléments · **Forme finale** : S, F, directrice, axe.
- **Niveaux** :
  - L1 : forme réduite donnée ; éléments à trous.
  - L2 : complétion à trous ; décision « axe vertical ou horizontal ».
  - L3 : actions « isoler le carré », « compléter », « mettre 2p en facteur », « S, F, d ».
  - L4 : libre.
  - L5 : parabole d'axe donné qui coupe une hyperbole orthogonalement en un point (CMS contrôle 4 Q3 b, nombres changés), sans aide.
- **Générateur** : S entier, p ∈ {±1, ±2, ±3, ±4, ±6} (foyer à coordonnées entières ou demi-entières). Axe vertical 1 fois sur 2. Gabarit 1 : équation développée. Gabarit 2 : foyer et directrice donnés, trouver l'équation. Gabarit 3 : axe et deux points donnés.
- **Corrigé type** : x² − 6x − 8y + 1 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x − 3)² − 9 − 8y + 1 = 0 | Compléter |
  | 2 | (x − 3)² = 8(y + 1) | Forme réduite |
  | 3 | 2p = 8, p = 4 ; S = (3 ; −1), axe x = 3 | Sommet, axe |
  | 4 | F = (3 ; 1), directrice y = −3 | Foyer, directrice |
- **Aides** : 1 « Isole le carré d'un côté et mets le coefficient de y en facteur de l'autre. » · 2 « F = (3 ; −1 + □) » · 3 F et la directrice.
- **Variantes d'examen** : `mcq` (distracteur `g10_parabola_p_half`) ; `tf` (« Le foyer de x² = 4y est (0 ; 4) » : faux, c'est (0 ; 1)) ; `open`.
- **Pièges** : `g10_parabola_p_half`, `g4_square_constant`.
- **Sous-buts → crédit** : compléter → `@alg:H-completer-carre`.

### `g10-conic-from-data` — Trouver l'équation d'une conique à partir de ses éléments
- **Année** 12.5 · **Prérequis** `g10-hyperbola`, `g10-parabola`, `g1-irr-eq`, `g10-ellipse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g10-hyperbola` : reconnaître une hyperbole (e > 1) ; `g10-parabola` : reconnaître une parabole (e = 1).
- **Intro** : définition par foyer, directrice et excentricité : MF = e·d(M, D). On élève au carré (les deux membres sont positifs), on développe, on reconnaît la conique. Ou bien : on écrit la forme réduite à paramètres (centre, a, b) et on traduit chaque condition en équation.
- **Juge** : `equiv` `{vars:['x','y']}` pour les lignes de calcul ; `conic` `{equation}` pour l'équation finale · **Forme finale** : forme réduite, nature nommée.
- **Niveaux** :
  - L1 : MF et d(M, D) écrits ; développement à trous.
  - L2 : décision « foyer-directrice » ou « forme réduite à paramètres ».
  - L3 : actions « écrire MF », « écrire d(M, D) », « élever au carré », « développer », « reconnaître ».
  - L4 : libre.
  - L5 : CMS contrôle 3 Q2 modifié : ellipse de grand axe vertical, dont le centre est sur une droite donnée, tangente à un axe et passant par un point (équation à un paramètre), puis condition sur une polaire, sans aide.
- **Générateur** : on part de la conique réduite (paramètres pythagoriciens comme `g10-ellipse` et `g10-hyperbola`), on calcule F, D, e et on donne les éléments. e ∈ {1/2, 3/5, 4/5, 5/4, 5/3, 1, 2}. Gabarit 1 : F, D, e. Gabarit 2 : centre, un foyer, e. Gabarit 3 : centre, un sommet, un point.
- **Corrigé type** : F(2 ; 0), directrice x = 8, e = 1/2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | √((x − 2)² + y²) = (1/2)·\|x − 8\| | Définition |
  | 2 | (x − 2)² + y² = (x − 8)²/4 | Élever au carré |
  | 3 | 4x² − 16x + 16 + 4y² = x² − 16x + 64 | Développer |
  | 4 | 3x² + 4y² − 48 = 0 | Réduire |
  | 5 | x²/16 + y²/12 = 1 : ellipse, a = 4, c = 2 | Reconnaître ; contrôle e = c/a = 1/2 |
- **Aides** : 1 « Écris la distance au foyer et la distance à la directrice, puis élève au carré. » · 2 « (x − 2)² + y² = (□)²/4 » · 3 « 3x² + 4y² = 48 ».
- **Variantes d'examen** : `mcq` (distracteur `g10_e_inverted`) ; `open`.
- **Pièges** : `g10_e_inverted`, `g10_locus_square_condition`.
- **Sous-buts → crédit** : élever au carré → `g1-irr-eq` ; reconnaître → `g10-ellipse`.

### `g10-conic-tangent` — Tangentes à une conique
- **Année** 12.5 · **Prérequis** `g10-pole-polar`, `g10-ellipse`, `g10-hyperbola`, `g10-parabola` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g10-hyperbola` : dédoubler l'équation d'une hyperbole ; `g10-parabola` : dédoubler l'équation d'une parabole.
- **Intro** : en T(x₀ ; y₀) de la conique, on **dédouble** : x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2, y → (y + y₀)/2. Depuis un point Q extérieur : la polaire de Q coupe la conique aux points de contact ; ou bien on écrit la condition « discriminant nul ».
- **Juge** : `geom` `{object:'line2'}` (une ou deux droites) ; `value` pour les points de contact · **Forme finale** : équations des tangentes.
- **Niveaux** :
  - L1 : dédoublement à trous sur une ellipse réduite.
  - L2 : conique non réduite ; dédoublement à trous terme par terme.
  - L3 : décision « en T : dédoubler » / « depuis Q : polaire puis intersection » / « depuis Q : discriminant » ; puis lignes.
  - L4 : libre.
  - L5 : tangente commune à une conique et à un cercle, ou tangentes de pente donnée, sans aide.
- **Générateur** : coniques réduites des trois compétences précédentes ; T choisi à coordonnées entières sur la conique (recherche dans [−10 ; 10]²) ; Q construit comme intersection des tangentes en deux points entiers, gardé s'il est entier ou demi-entier. Gabarit 1 : en T. Gabarit 2 : depuis Q. Gabarit 3 : conique avec terme en xy (dédoublement complet).
- **Corrigé type** : E : x² + 3y² − 28 = 0, au point d'abscisse −5 et d'ordonnée positive.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 25 + 3y² = 28, y = ±1 ; T = (−5 ; 1) | Point de contact |
  | 2 | (−5)·x + 3·1·y − 28 = 0 | Dédoubler |
  | 3 | 5x − 3y + 28 = 0 | Tangente |
  | 4 | −25 − 3 + 28 = 0 | Contrôle : T est sur la tangente |
- **Aides** : 1 « Dédouble : remplace un x par x₀ et un y par y₀. » · 2 « (□)x + 3(□)y − 28 = 0 » · 3 « 5x − 3y + 28 = 0 ».
- **Variantes d'examen** : `mcq` (distracteur `g10_doubling_wrong`) ; `open`.
- **Pièges** : `g10_doubling_wrong`, `g10_vertical_tangent_lost`.
- **Sous-buts → crédit** : point de contact → `g10-ellipse` ; polaire → `g10-pole-polar`.

### `g10-conic-nature` — Choisir la méthode : nature d'une conique
- **Année** 12.5 · **Prérequis** `g10-hyperbola`, `g10-parabola`, `g4-triple` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g10-hyperbola` : conclure au genre hyperbole ; `g10-parabola` : conclure au genre parabole.
- **Intro** : on écrit A (avec **b/2** hors de la diagonale) et M. Δ = det M ≠ 0 : conique non dégénérée. Puis δ = det A = λ₁λ₂ : δ > 0 genre ellipse, δ < 0 genre hyperbole, δ = 0 genre parabole. Une ellipse non dégénérée est réelle si (a + c)·Δ < 0, vide sinon. Les valeurs propres de A (λ² − (a + c)λ + δ = 0) disent la même chose : même signe, signes contraires, une nulle.
- **Juge** : décisions (arbre ci-dessous) ; segments `value` pour δ et Δ ; `equiv` `{vars:['λ']}` pour le polynôme caractéristique · **Forme finale** : la nature, avec δ et Δ justifiés.
- **Arbre « Choisir la méthode »** (suite de décisions de l'item ; `valid` dépend de l'item) :

  ```js
  [{kind:'decision', prompt:'Par quoi commencer ?', options:[
     {id:'matrices', label:'Écrire A et M, puis calculer Δ = det M', valid:true, quality:'good',
      then:{ask:'Δ =', judge:'value'}},
     {id:'eigen-first', label:'Calculer tout de suite les valeurs propres de A', valid:true, quality:'poor',
      why:'Juste, mais tu ne sais pas encore si la conique est dégénérée : il faudra calculer Δ de toute façon.'},
     {id:'complete', label:'Compléter les carrés', valid:/* b === 0 */, quality:'good',
      why:'Le terme en xy empêche de compléter les carrés séparément : il faut d\'abord tourner le repère.'}]},
   {kind:'decision', prompt:'Δ = … : la conique est…', options:[
     {id:'nondeg', label:'non dégénérée (Δ ≠ 0)'}, {id:'deg', label:'dégénérée (Δ = 0)'}]},
   {kind:'decision', prompt:'δ = det A = … (ou λ₁ et λ₂ = …) : genre ?', options:[
     {id:'ell', label:'δ > 0 (λ de même signe) : genre ellipse'},
     {id:'hyp', label:'δ < 0 (λ de signes contraires) : genre hyperbole'},
     {id:'par', label:'δ = 0 (une λ nulle) : genre parabole'}]},
   {kind:'decision', prompt:'Genre ellipse : réelle ou vide ?', when:'ell && nondeg', options:[
     {id:'real', label:'(a + c)·Δ < 0 : ellipse réelle'}, {id:'empty', label:'(a + c)·Δ > 0 : ensemble vide'}]},
   {kind:'decision', prompt:'Dégénérée : laquelle ?', when:'deg', options:[
     {id:'pt', label:'δ > 0 : un point'}, {id:'two', label:'δ < 0 : deux droites sécantes'},
     {id:'par2', label:'δ = 0 : deux droites parallèles, une droite double, ou vide'}]}]
  ```

  Le champ `when` (afficher la décision seulement si les décisions précédentes l'appellent) n'est pas dans le README §5.3 : il est proposé ici.
- **Niveaux** :
  - L1 : A et M écrites ; δ, Δ à trous ; décisions prises.
  - L2 : A et M à écrire (trous sur b/2, d/2, e/2) ; une décision à choisir.
  - L3 : toutes les décisions de l'arbre, avec les calculs.
  - L4 : libre : l'élève peut sauter l'arbre et écrire « Δ = …, δ = …, ellipse réelle ». La décision est alors déduite.
  - L5 : enchaîne avec `g10-conic-reduce`, ou nature selon un paramètre (`g10-conic-family`).
- **Générateur** : construit à l'envers comme `g10-conic-reduce` (valeurs propres entières, centre entier, constante entière), avec les proportions : 35 % ellipse réelle, 35 % hyperbole, 15 % parabole, 5 % ellipse vide, 10 % dégénérée (produit de deux droites entières). 1 item sur 5 sans terme en xy (l'option « compléter » devient valide). Gabarit 1 : « Nature de la conique ». Gabarit 2 : QCM « Laquelle de ces coniques est une parabole ? ».
- **Corrigé type** : 5x² − 6xy + 5y² − 4x − 4y − 4 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | A = [[5, −3], [−3, 5]], M = [[5, −3, −2], [−3, 5, −2], [−2, −2, −4]] | Écrire les matrices |
  | 2 | Δ = 5(−20 − 4) + 3(12 − 4) − 2(6 + 10) = −128 ≠ 0 | Non dégénérée |
  | 3 | δ = 25 − 9 = 16 > 0 | Genre ellipse |
  | 4 | (a + c)·Δ = 10·(−128) < 0 | Ellipse réelle |
  | 5 | λ² − 10λ + 16 = 0, λ = 2 et 8 (même signe) | Contrôle par les valeurs propres |
- **Aides** : 1 « Hors de la diagonale de A, on met **la moitié** du coefficient de xy. » · 2 « δ = 5·5 − (□)² » · 3 « δ = 16 > 0 : genre ellipse ».
- **Variantes d'examen** : `mcq` (distracteurs `g10_bhalf_matrix`, `g10_det_sign_nature`) ; `tf` (« Si δ > 0, la conique est une ellipse » : faux, contre-exemple x² + y² + 1 = 0, ensemble vide) ; `open`.
- **Pièges** : `g10_bhalf_matrix`, `g10_det_sign_nature`, `g10_degenerate_ignored`.
- **Sous-buts → crédit** : Δ → `g4-triple` (déterminant 3 × 3) ; valeurs propres → `l-eig-charpoly` (seulement si l'élève prend cette branche).

### `g10-conic-reduce` — Réduire une conique avec un terme en xy
- **Année** 12.5 · **Prérequis** `g10-conic-nature`, `l-eig-charpoly`, `l-eig-space`, `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : 1. Valeurs propres λ₁, λ₂ de A, vecteurs propres **normés** u₁, u₂ (repère direct). 2. Centre Ω : ∂f/∂x = ∂f/∂y = 0. 3. Constante f(Ω). 4. Dans Ru = (Ω, u₁, u₂) : λ₁X² + λ₂Y² + f(Ω) = 0. Sans centre (genre parabole), on tourne d'abord, puis on complète le carré.
- **Juge** : par segments : `equiv` `{vars:['λ']}` (polynôme), `eigvec` `{A, λ}` (vecteurs, normés à la fin), `value` `{form:'point'}` (Ω), `value` (f(Ω)), `conic` `{equation, frame}` (équation réduite) · **Forme finale** : équation réduite et repère Ru.
- **Niveaux** :
  - L1 : λ et Ω donnés ; vecteurs propres et équation réduite à trous.
  - L2 : polynôme caractéristique à trous ; décision « centre d'abord » ou « rotation d'abord » (les deux `good` si δ ≠ 0 ; « centre » `valid:false` si δ = 0).
  - L3 : actions « A », « polynôme caractéristique », « vecteur propre », « normer », « centre », « f(Ω) », « équation réduite ».
  - L4 : libre.
  - L5 : CMS contrôle 4 Q1 (a) avec d'autres nombres (voir E2), enchaîné avec `g10-conic-frame-back`.
- **Générateur** : à l'envers. On tire λ₁, λ₂ entiers non nuls dans [−6 ; 8], distincts. On tire u₁ dans {(1 ; 1)/√2, (2 ; 1)/√5, (1 ; 2)/√5, (3 ; 4)/5, (4 ; 3)/5} et un signe ; u₂ est u₁ tourné de +90°. A = P·diag(λ₁, λ₂)·Pᵀ doit être à coefficients entiers (on rejette sinon). Ω entier dans [−4 ; 4]², f(Ω) = −k avec k entier tel que les dénominateurs k/λᵢ de la forme réduite soient entiers ou de dénominateur ≤ 4. On développe f(x, y) = (x − Ω)ᵀA(x − Ω) + f(Ω). Gabarit 1 : hyperbole. Gabarit 2 : ellipse. Gabarit 3 : parabole (λ₂ = 0, sans centre) en L4–L5.
- **Corrigé type** : 2x² + 4xy − y² − 6y − 9 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | A = [[2, 2], [2, −1]] | Matrice de la forme quadratique |
  | 2 | det(A − λI) = λ² − λ − 6 = (λ − 3)(λ + 2) | Valeurs propres |
  | 3 | λ₁ = 3 : u₁ = (2 ; 1)/√5 | Vecteur propre normé |
  | 4 | λ₂ = −2 : u₂ = (−1 ; 2)/√5 | Vecteur propre normé, repère direct |
  | 5 | 4x + 4y = 0 et 4x − 2y − 6 = 0 : Ω = (1 ; −1) | Centre |
  | 6 | f(Ω) = 2 − 4 − 1 + 6 − 9 = −6 | Constante |
  | 7 | 3X² − 2Y² − 6 = 0, soit X²/2 − Y²/3 = 1 | Équation réduite dans Ru |
- **Aides** : 1 « Diagonalise A : les valeurs propres sont les coefficients de X² et Y². » · 2 « (2 − λ)(−1 − λ) − □ = 0 » · 3 la ligne entière demandée.
- **Variantes d'examen** : `coef` (le coefficient de X² ou la constante de l'équation réduite) ; `open` (E2).
- **Pièges** : `g10_eigvec_not_normed`, `g10_constant_not_updated`, `g10_bhalf_matrix`.
- **Sous-buts → crédit** : valeurs propres et vecteurs propres → `l-eig-charpoly`, `l-eig-space` ; centre → `@alg:E-systemes-2x2` ; nature → `g10-conic-nature`.

### `g10-conic-frame-back` — Revenir au repère initial ; esquisser
- **Année** 12.5 · **Prérequis** `g10-conic-reduce`, `g10-ellipse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g10-conic-reduce` : le repère Ru vient de la réduction.
- **Intro** : un point (X ; Y) de Ru est en x = Ω + X·u₁ + Y·u₂ dans Re. On calcule foyers, sommets, axes et asymptotes dans Ru, puis on les transporte. Une asymptote Y = mX devient la droite par Ω de direction u₁ + m·u₂.
- **Juge** : `value` `{form:'point'}` pour les points ; `geom` `{object:'line2'}` pour les droites ; `plot` `task:'conic'` pour l'esquisse · **Forme finale** : éléments demandés **dans Re**, puis esquisse.
- **Niveaux** :
  - L1 : éléments dans Ru donnés ; formule de passage à trous.
  - L2 : un élément à calculer dans Ru, puis à transporter.
  - L3 : actions « élément dans Ru », « transporter », « placer sur le repère ».
  - L4 : libre, puis esquisse (`plot`) : placer Ω, les axes, les sommets, les asymptotes, puis tracer.
  - L5 : enchaîné avec `g10-conic-reduce` (E2).
- **Générateur** : les coniques de `g10-conic-reduce`, filtrées pour que les foyers soient à coordonnées entières (c·u₁ entier, comme dans l'exemple : c = √5 et u₁ = (2 ; 1)/√5). Pour les asymptotes, on garde les cas où u₁ + m·u₂ a une direction rationnelle (m = ±b/a rationnel et u₁ rationnel à un facteur près). Gabarit 1 : foyers dans Re. Gabarit 2 : sommets et axes. Gabarit 3 : esquisse.
- **Corrigé type** : suite de l'exemple de `g10-conic-reduce` (X²/2 − Y²/3 = 1, Ω = (1 ; −1), u₁ = (2 ; 1)/√5, u₂ = (−1 ; 2)/√5).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | c² = 2 + 3 = 5, foyers (±√5 ; 0) dans Ru | Foyers dans Ru |
  | 2 | F = Ω + √5·u₁ = (1 ; −1) + (2 ; 1) = (3 ; 0) | Transporter |
  | 3 | F' = Ω − √5·u₁ = (−1 ; −2) | Transporter |
  | 4 | Axe réel : droite par Ω de direction (2 ; 1), soit x − 2y − 3 = 0 | Axe |
  | 5 | Esquisse : Ω, axe réel, sommets Ω ± √2·u₁, branches qui entourent F et F' | `plot` |
- **Aides** : 1 « Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂. » · 2 « F = (1 ; −1) + √5·(□) » · 3 « F = (3 ; 0) ».
- **Variantes d'examen** : `mcq` (distracteurs `g10_foci_reduced_frame`, `g10_frame_back_transpose`) ; `coef` (une coordonnée d'un foyer) ; `open` (E2 c).
- **Pièges** : `g10_foci_reduced_frame`, `g10_frame_back_transpose`.
- **Sous-buts → crédit** : foyers dans Ru → `g10-hyperbola` ou `g10-ellipse` ; esquisse → `g10-conic-frame-back`.

### `g10-conic-family` — Familles de coniques à paramètre, lieu des centres
- **Année** 12.5 · **Prérequis** `g10-conic-nature`, `@alg:I-second-degre-parametres` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : δ(m) donne le genre selon m (tableau de signes du trinôme en m). Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0. On élimine m entre ces deux équations pour obtenir le lieu des centres, puis on étudie sa nature avec `g10-conic-nature`. Les points du lieu qui ne sont le centre d'aucune conique sont à exclure.
- **Juge** : `equiv` `{vars:['m']}` pour δ(m) ; `solset` `{v:'m'}` pour les intervalles de chaque genre ; `equiv` `{vars:['x','y']}` puis `conic` pour le lieu (équation proportionnelle) · **Forme finale** : genre selon m ; équation du lieu et sa nature.
- **Niveaux** :
  - L1 : δ(m) donné ; tableau de signes à trous.
  - L2 : équations du centre données ; élimination à trous.
  - L3 : actions « δ(m) », « signe de δ(m) », « équations du centre », « isoler m », « remplacer », « nature du lieu ».
  - L4 : libre.
  - L5 : CMS contrôle 4 Q2 avec d'autres nombres (E3), sans aide.
- **Générateur** : on choisit des coefficients a(m), b(m), c(m), d(m), e(m), f(m) de degré ≤ 1 en m, entiers dans [−3 ; 3] ; on garde si δ(m) a des racines rationnelles ou aucune racine, et si l'élimination donne une conique non dégénérée à coefficients entiers ≤ 12. Gabarit 1 : genre selon m. Gabarit 2 : lieu des centres. Gabarit 3 : « pour quel m la conique est-elle un cercle, une hyperbole équilatère ? ».
- **Corrigé type** : F_m : x² + 2mxy + y² − 2x − 4y + 1 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | δ(m) = 1 − m² | δ(m) |
  | 2 | \|m\| < 1 : genre ellipse ; \|m\| = 1 : genre parabole ; \|m\| > 1 : genre hyperbole | Genre selon m |
  | 3 | x + my − 1 = 0 et mx + y − 2 = 0 | Équations du centre |
  | 4 | m = (1 − x)/y | Isoler m |
  | 5 | x(1 − x)/y + y = 2, soit x² − y² − x + 2y = 0 | Lieu des centres |
  | 6 | δ = −1 < 0 et Δ = −3/4 ≠ 0 : hyperbole | Nature du lieu |
- **Aides** : 1 « Isole m dans une des équations du centre et remplace dans l'autre. » · 2 « m = (1 − x)/□ » · 3 l'équation du lieu.
- **Variantes d'examen** : `mcq` (genre pour une valeur de m ; distracteur `g10_bhalf_matrix`) ; `open` (E3).
- **Pièges** : `g10_bhalf_matrix`, `g10_family_division_by_zero`.
- **Sous-buts → crédit** : signe de δ(m) → `@alg:I-second-degre-parametres` ; nature du lieu → `g10-conic-nature`.

### `g10-locus` — Lieux géométriques qui donnent une conique
- **Année** 12.5 · **Prérequis** `g1-irr-eq`, `g10-ellipse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on nomme le point courant M(x ; y), on traduit la condition en équation, on élimine les paramètres auxiliaires, on simplifie. Quand on élève au carré, on note la condition de signe et on vérifie à la fin quels points du lieu la respectent. On reconnaît la conique et on la décrit avec précision.
- **Juge** : `equiv` `{vars:['x','y'], domain}` pour les lignes (le domaine retient la condition de signe) ; `conic` pour l'équation finale ; décision pour la nature · **Forme finale** : équation réduite, nature, et éléments demandés.
- **Niveaux** :
  - L1 : condition traduite ; élévation au carré à trous.
  - L2 : traduction à trous ; décision « élever au carré maintenant » (`poor` : il reste une racine) ou « isoler une racine d'abord » (`good`).
  - L3 : actions « traduire », « isoler une racine », « élever au carré (avec condition) », « développer », « reconnaître ».
  - L4 : libre.
  - L5 : CMS contrôle 3 Q3 modifié : lieu de l'intersection de la polaire d'un point courant D d'une directrice et de la droite (AD), sans aide.
- **Générateur** : gabarits tirés d'une liste de constructions classiques, chacune avec paramètres entiers : (1) centres des cercles par A tangents intérieurement à un cercle (ellipse de foyers O et A) ; (2) centres des cercles tangents extérieurement à deux cercles (branche d'hyperbole) ; (3) points équidistants d'un point et d'une droite (parabole) ; (4) milieux des segments [PQ] avec P sur une conique et Q fixe (conique homothétique). Les paramètres sont tirés pour que la conique réduite ait des coefficients entiers.
- **Corrigé type** : lieu des centres M des cercles qui passent par A(3 ; 0) et sont tangents intérieurement à γ : x² + y² = 25.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | OM = 5 − MA | Traduire la tangence intérieure |
  | 2 | √(x² + y²) = 5 − √((x − 3)² + y²) | Coordonnées |
  | 3 | 10√((x − 3)² + y²) = 34 − 6x, avec 34 − 6x ≥ 0 | Isoler une racine |
  | 4 | 25((x − 3)² + y²) = (17 − 3x)² | Élever au carré |
  | 5 | 16x² − 48x + 25y² − 64 = 0 | Développer |
  | 6 | (x − 3/2)²/(25/4) + y²/4 = 1 : ellipse de foyers O et A ; x ≤ 4 sur l'ellipse, donc la condition est toujours vraie | Reconnaître ; condition |
- **Aides** : 1 « La tangence intérieure donne OM = R − r. » · 2 « 10√(…) = □ − 6x » · 3 l'équation développée.
- **Variantes d'examen** : `mcq` (nature du lieu ; distracteur `g10_locus_square_condition`) ; `open`.
- **Pièges** : `g10_locus_square_condition`.
- **Sous-buts → crédit** : élever au carré → `g1-irr-eq` ; reconnaître → `g10-ellipse`.

### `g10-homogeneous` — Coordonnées homogènes, points à l'infini
- **Année** 12.5 · **Prérequis** `g10-conic-nature` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Intro** : on remplace x par x/t et y par y/t, puis on multiplie par t² (par tⁿ pour un degré n). Les points à l'infini sont les solutions avec t = 0. Pour une conique : 2 points réels (genre hyperbole, directions des asymptotes), 1 point double (genre parabole, direction de l'axe), aucun point réel (genre ellipse).
- **Juge** : `equiv` `{vars:['x','y','t']}` pour l'équation homogène ; `value` pour les points (x : y : 0), à un facteur près · **Forme finale** : liste des points à l'infini.
- **Niveaux** :
  - L1 : équation homogène à trous.
  - L2 : t = 0 posé ; factorisation à trous.
  - L3 : actions « homogénéiser », « poser t = 0 », « factoriser », « lire les directions ».
  - L4 : libre.
  - L5 : courbe de degré 3 (x³ + y³ − 3xy = 0, CMS série 21) : point à l'infini et direction asymptotique.
- **Générateur** : partie quadratique produit de deux facteurs linéaires entiers (genre hyperbole), carré parfait (parabole), ou irréductible (ellipse) ; termes linéaires et constante entiers dans [−9 ; 9]. Gabarit 1 : conique. Gabarit 2 : droite (point à l'infini = direction).
- **Corrigé type** : x² − xy − 2y² + 3x − 5 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x² − xy − 2y² + 3xt − 5t² = 0 | Homogénéiser |
  | 2 | t = 0 : x² − xy − 2y² = 0 | Poser t = 0 |
  | 3 | (x − 2y)(x + y) = 0 | Factoriser |
  | 4 | (2 : 1 : 0) et (1 : −1 : 0) : genre hyperbole, asymptotes de directions (2 ; 1) et (1 ; −1) | Lire |
- **Aides** : 1 « Multiplie chaque terme par la puissance de t qui manque pour atteindre le degré 2. » · 2 « (x − 2y)(x + □) = 0 » · 3 les deux points.
- **Variantes d'examen** : `mcq` (nombre de points à l'infini réels).
- **Pièges** : `g10_homog_missing_t`.
- **Sous-buts → crédit** : nature → `g10-conic-nature`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g10_vertical_tangent_lost` | method | E | `g10-circle-tangent` | `g10-circle-tangent` | une seule tangente 3x + 4y − 19 = 0 → aussi x = −3 | `wrongValues` : l'ensemble des tangentes privé de la droite verticale x = x_Q. | « En écrivant y − 7 = m(x + 3), tu as exclu la droite verticale x = −3. Sa distance au centre est \|−3 − 2\| = 5 = r : c'est aussi une tangente. » |
| `g10_tangent_radius_direction` | geometry | E | `g10-circle-tangent` | `g4-line2` | droite par T de direction ΩT⃗ → de normale ΩT⃗ | Produit la droite par T de **direction** ΩT⃗ (le rayon prolongé). | « ΩT⃗ = (…) est le rayon : la tangente lui est **perpendiculaire**. ΩT⃗ est donc un vecteur normal de la tangente. » |
| `g10_radical_unnormalized` | rule | E | `g10-power-radical` | `g10-power-radical` | 2γ₁ − γ₂ garde un x² → normaliser d'abord | Soustrait les équations telles qu'écrites, sans diviser par les coefficients de x². | « Après ta soustraction, il reste … x² : ce n'est pas une droite. Divise chaque équation par son coefficient de x² avant de soustraire. » |
| `g10_orthogonal_sum` | geometry | E | `g10-power-radical` | `g10-power-radical` | Ω₁Ω₂ = r₁ + r₂ → Ω₁Ω₂² = r₁² + r₂² | `wrongValues` : « orthogonaux » quand Ω₁Ω₂ = r₁ + r₂ (tangents), « non orthogonaux » quand Ω₁Ω₂² = r₁² + r₂². | « Ω₁Ω₂ = r₁ + r₂ veut dire tangents extérieurement. Orthogonaux : les rayons aux points d'intersection sont perpendiculaires, donc Pythagore : Ω₁Ω₂² = r₁² + r₂² (ici … et …). » |
| `g10_polar_origin_formula` | rule | E | `g10-pole-polar` | `g10-pole-polar` | x₀x + y₀y = r² → (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² | Applique x₀x + y₀y = r² (formule du cercle centré en O) à un cercle de centre Ω ≠ O. | « x₀x + y₀y = r² ne vaut que si le centre est O. Ici Ω = (…) : dédouble la forme réduite (x − h)² + (y − k)² = r². » |
| `g10_c_wrong_formula` | rule | E | `g10-ellipse` | `g10-ellipse` | ellipse c² = a² + b² → a² − b² (et l'inverse pour l'hyperbole) | `wrongValues` : foyers et e calculés avec la formule de l'autre conique. | « Pour une ellipse, les foyers sont **à l'intérieur** : c < a, donc c² = a² − b² = …. C'est l'hyperbole qui a c² = a² + b². » |
| `g10_axis_swap` | geometry | E | `g10-ellipse` | `g10-hyperbola` | grand axe lu sur le petit dénominateur ; axe réel lu sur le mauvais terme | Échange les rôles de x et de y dans les éléments (a sur l'autre axe, foyers sur l'autre axe). | « Le grand axe (ou l'axe réel) est du côté du terme … : c'est là que le dénominateur est le plus grand (ou que le terme est positif quand le second membre vaut +1). » |
| `g10_asymptote_ratio` | rule | E | `g10-hyperbola` | `g10-hyperbola` | y − k = ±(a/b)(x − h) → ±(b/a)(x − h) | Remplace la pente b/a par a/b dans les asymptotes. | « Pour x²/a² − y²/b² = 1, les asymptotes sont x/a = ±y/b, donc y = ±(b/a)x = ±(…)x. » |
| `g10_parabola_p_half` | rule | E | `g10-parabola` | `g10-parabola` | F = (3 ; 3) → (3 ; 1) | Place le foyer à p (au lieu de p/2) du sommet, et la directrice à p de l'autre côté. | « Dans (x − h)² = 2p(y − k), le foyer est à p/2 du sommet. Ici 2p = 8, p = 4, donc F est à 2 du sommet. » |
| `g10_e_inverted` | rule | E | `g10-conic-from-data` | `g10-conic-from-data` | MF = e·d → e·MF = d | Produit l'équation obtenue avec e·MF = d(M, D) (donc excentricité 1/e). | « La définition est MF = e·d(M, D). Avec e et 1/e échangés, ton ellipse devient une hyperbole (e = … > 1). » |
| `g10_doubling_wrong` | rule | E | `g10-conic-tangent` | `g10-conic-tangent` | x → x₀ (au lieu de (x + x₀)/2) ; xy → x₀y₀ | Dans la ligne dédoublée, remplace chaque terme linéaire dx par d·x₀ (ou par d·x) et xy par x₀y₀. | « On dédouble chaque terme en gardant un x : x² → x₀x, xy → (x₀y + xy₀)/2, x → (x + x₀)/2. Ta ligne ne passe pas par T : … ≠ 0. » |
| `g10_bhalf_matrix` | linear | E | `g10-conic-nature` | `g10-conic-nature` | A = [[5, −6], [−6, 5]] → [[5, −3], [−3, 5]] | Écrit A (et M) avec b, d, e au lieu de b/2, d/2, e/2 ; recalcule δ, Δ, les valeurs propres. | « xᵀAx = ax² + 2a₁₂xy + cy² : le coefficient de xy est **deux fois** a₁₂. Avec −6 hors de la diagonale, tu obtiens −12xy. Mets b/2 = −3. » |
| `g10_det_sign_nature` | geometry | E | `g10-conic-nature` | `g10-conic-nature` | δ > 0 ⇒ hyperbole → ellipse | `wrongValues` : genres échangés (δ > 0 ↔ δ < 0). | « δ = λ₁λ₂. δ > 0 : les deux valeurs propres ont le même signe, comme dans X²/a² + Y²/b² = 1 : genre ellipse. » |
| `g10_degenerate_ignored` | method | E | `g10-conic-nature` | `g10-conic-nature` | « hyperbole » pour (x − y)(x + 2y) = 0 → deux droites | `wrongValues` : le genre lu sur δ seul quand Δ = 0. | « Ton Δ vaut 0 : la conique est dégénérée. Ici, deux droites sécantes. Calcule toujours Δ avant de nommer. » |
| `g10_eigvec_not_normed` | linear | E | `g10-conic-reduce` | `l-eig-space` | 15X² − 10Y² − 6 = 0 → 3X² − 2Y² − 6 = 0 | Substitue x = Ω + X·v₁ + Y·v₂ avec v₁, v₂ non normés : les coefficients de X² et Y² sont multipliés par ‖v₁‖², ‖v₂‖². | « Avec (2 ; 1) au lieu de (2 ; 1)/√5, ton repère n'est pas orthonormé : X² est multiplié par ‖(2 ; 1)‖² = 5. Norme les vecteurs propres. » |
| `g10_constant_not_updated` | rule | E | `g10-conic-reduce` | `g10-conic-reduce` | 3X² − 2Y² − 9 = 0 → − 6 | Garde la constante f de l'équation initiale au lieu de f(Ω). | « Après la translation au centre, la constante est f(Ω) = …, pas le f de départ (…). » |
| `g10_foci_reduced_frame` | geometry | E | `g10-conic-frame-back` | `g10-conic-frame-back` | F = (√5 ; 0) → (3 ; 0) | `wrongValues` : les éléments en coordonnées de Ru, rendus comme réponse dans Re. | « (√5 ; 0) sont les coordonnées dans Ru. La question demande Re : F = Ω + √5·u₁. » |
| `g10_frame_back_transpose` | linear | E | `g10-conic-frame-back` | `g10-conic-frame-back` | x = Ω + Pᵀ(X ; Y) → Ω + P(X ; Y) | Transporte avec Pᵀ (rotation dans l'autre sens). | « Les colonnes de P sont u₁ et u₂ : x = Ω + X·u₁ + Y·u₂ = Ω + P·(X ; Y). Avec Pᵀ, tu tournes dans le mauvais sens : ton foyer (…) n'est pas sur l'axe réel. » |
| `g10_family_division_by_zero` | method | E | `g10-conic-family` | `g10-conic-family` | m = (1 − x)/y sans y ≠ 0 | `wrongValues` : le lieu sans discussion des points exclus (y = 0, ou point jamais atteint). | « Tu as divisé par y : le cas y = 0 est à traiter à part. Vérifie aussi que chaque point du lieu est bien le centre d'une conique de la famille. » |
| `g10_locus_square_condition` | method | E | `g10-locus` | `g1-irr-eq` | lieu trop grand après élévation au carré | `wrongValues` : le lieu complet quand la condition de signe en retire une partie (gabarit 2 : une seule branche d'hyperbole). | « En élevant au carré, tu as ajouté les points où … < 0. Ici seule la branche … convient. » |
| `g10_homog_missing_t` | rule | E | `g10-homogeneous` | `g10-homogeneous` | 3x − 5 → 3xt − 5t² | Homogénéise sans multiplier les termes de degré < 2 par la bonne puissance de t. | « Chaque terme doit être de degré 2 : 3x devient 3xt, −5 devient −5t². » |

## Exemples de type examen

### E2. Réduction d'une conique (d'après CMS, contrôle 4, Q1, 7,5 points)

Dans un repère orthonormé Re, C : x² + 6xy + y² − 10x + 2y − 31 = 0. (a) Équation réduite et repère Ru. (b) Esquisse dans Re. (c) Foyers dans Re.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| a1. Nature | A = [[1, 3], [3, 1]], δ = −8 < 0 ; Δ = δ·f(Ω) = 192 ≠ 0 : hyperbole | 1 | `g10-conic-nature` |
| a2. Valeurs et vecteurs propres | λ² − 2λ − 8 = 0, λ₁ = 4, λ₂ = −2 ; u₁ = (1 ; 1)/√2, u₂ = (−1 ; 1)/√2 | 1 | `g10-conic-reduce` |
| a3. Centre | x + 3y − 5 = 0 et 3x + y + 1 = 0 : Ω = (−1 ; 2) | 1 | `g10-conic-reduce` |
| a4. Équation réduite et repère | f(Ω) = −24 ; 4X² − 2Y² − 24 = 0, soit X²/6 − Y²/12 = 1 ; Ru = (Ω, u₁, u₂) | 1 | `g10-conic-reduce` |
| b. Esquisse dans Re | Ω, axes, sommets Ω ± √6·u₁, asymptotes Y = ±√2·X, branches | 1,5 | `g10-conic-frame-back` |
| c. Foyers dans Re | c² = 6 + 12 = 18, c = 3√2 ; F = Ω ± 3√2·u₁ = (2 ; 5) et (−4 ; −1) | 2 | `g10-conic-frame-back` |

Item `problem`, `resumable:true`, `points: [[0.5, 0.5], [0.5, 0.5], [0.5, 0.5], [0.5, 0.5], [1.5], [1, 1]]`. La partie b est un `plot` `task:'conic'` noté par élément (Ω 0,25 ; axes 0,25 ; sommets 0,25 ; asymptotes 0,5 ; branches 0,25).

### E3. Famille de coniques et lieu des centres (d'après CMS, contrôle 4, Q2, 5 points)

F_m : (1 − m)x² + 2(m + 1)xy − y² + 2x − 2my + m = 0, m ∈ ℝ. (a) Genre selon m (sans les cas dégénérés). (b) Lieu des centres et sa nature.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| a1. δ(m) | δ = −(1 − m) − (m + 1)² = −(m² + m + 2) | 1 | `g10-conic-family` |
| a2. Genre | m² + m + 2 a un discriminant −7 < 0, donc δ < 0 pour tout m : toutes du genre hyperbole | 1 | `g10-conic-family` |
| b1. Équations du centre | (1 − m)x + (m + 1)y + 1 = 0 et (m + 1)x − y − m = 0 | 1 | `g10-conic-family` |
| b2. Élimination | m = (y − x)/(x − 1), puis (x + y + 1)(x − 1) + (y − x)² = 0, soit 2x² − xy + y² − y − 1 = 0 | 1,5 | `g10-conic-family` |
| b3. Nature du lieu | δ = 7/4 > 0, Δ = −9/4 ≠ 0, (a + c)·Δ < 0 : ellipse non dégénérée | 0,5 | `g10-conic-nature` |

`points: [[1], [0.5, 0.5], [0.5, 0.5], [0.5, 1], [0.5]]`. Le point (1 ; 1) du lieu n'est le centre d'aucune conique (x = 1 force y = 1, puis la 1re équation donne 3 = 0). Son exclusion n'est pas notée, comme dans le corrigé ; l'app la signale à la fin.

---

# G6. Analyse de base

Unité `analyse0` · préfixe `g6-` · pièges `g6_` · Statut : fait le 10 novembre 2026 (étape U2 ; la pilote `g6-deriv-rules` à l'étape U0). Chaque compétence a son statut ; `g4-line2` (G4, étape U5) passe par `UNBUILT`.

**Sources** : MAN, Math 1B (examens 2017 et examen blanc 2018 corrigé : dérivée implicite et tangente à paramètre, point anguleux à paramètre, branches infinies et points stationnaires d'arcs paramétrés, tangente et approximation linéaire) ; CMS, Analyse I, séries 8 à 23 (limites, tangente commune, optimisation, extrema et points remarquables, courbes paramétrées, primitives, aires) ; formulaires M1A et M1B (table des dérivées).
**Notation** : dérivée `f′(x)` ou `d(f, x)`. Dérivées à gauche et à droite `f′(a⁻)`, `f′(a⁺)` (touches dédiées). Limites `lim(f, x, a, +)`. Logarithme `ln` ou `Log`. Arc tangente `arctan` ou `Arctg`. La MAN dit « point stationnaire » pour un arc paramétré où ẋ = ẏ = 0.
**Prérequis extérieurs** : `g0-long-div`, `g0-factor-thm` (crédit seulement), `@alg:D-factoriser-completement` (crédit seulement), `g1-domain`, `g1-compose`, `g1-sign-table`, `g1-parity-period`, `g1-abs-eq`, `g2-real-powers`, `g3-reduce`, `@alg:G-simplifier`, `@alg:H-discriminant`, `@alg:E-systemes-2x2`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g0-factor-thm`, `g0-long-div`, `g1-abs-eq`, `g1-compose`, `g1-domain`, `g1-parity-period`, `g1-sign-table`, `g2-real-powers`, `g3-radians`, `g4-line2`.

**Recouvrement avec A1.** Le plan enseigne une seule fois ce qui est à la fois dans la MAN et en Analyse I. Ici, G6 donne le niveau CMS (calculer, esquisser). A1 reprend avec les définitions, ε-δ, Bernoulli-l'Hôpital et les DL. Les compétences A1 voisines devraient avoir pour prérequis : `g6-deriv-rules` (dérivées), `g6-limits` (limites de fonctions), `g6-study-full` (étude de fonction), `g6-param-branches` (courbes paramétrées et polaires), `g6-antideriv-usual` (intégrales).

## Compétences

### `g6-deriv-usual` — Dérivées usuelles
- **Année** 12 · **Prérequis** `g2-real-powers`, `g3-radians` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g3-radians` : sin′ = cos seulement en radians.
- **Statut** : fait le 10 novembre 2026 (étape U2). Le niveau 2 demande « Quelle règle ? » par une décision (le mode guidé ne pose pas les lignes d'auto-explication). Le niveau 5 est une série de six dérivées, une partie par fonction, sans chronomètre ; arcsin n'est pas tiré.
- **Intro** : la table : (xⁿ)′ = nxⁿ⁻¹ (n réel), (√x)′ = 1/(2√x), (1/x)′ = −1/x², (eˣ)′ = eˣ, (aˣ)′ = aˣ·ln a, (ln x)′ = 1/x, sin′ = cos, cos′ = −sin, tan′ = 1 + tan² = 1/cos², arctan′ = 1/(1 + x²), arcsin′ = 1/√(1 − x²), sinh′ = cosh, cosh′ = sinh. La dérivée d'une somme est la somme des dérivées, et les constantes sortent.
- **Juge** : `equiv` `{vars:['x'], domain:{x:[0.2, 3]}, target:'no-prime'}` · **Forme finale** : plus de `′` ni de `d(…)` ; puissances négatives ou racines acceptées.
- **Niveaux** :
  - L1 : réécriture en puissances donnée (√x = x^(1/2), 5/x = 5x⁻¹) ; trous dans les exposants.
  - L2 : un terme à la fois ; « Quelle règle ? » (auto-explication) sur une ligne.
  - L3 : actions « réécrire en puissance », « dériver un terme », « simplifier ».
  - L4 : libre.
  - L5 : série chronométrée de 8 dérivées sans aide (format `answer` en ligne unique), mélange des 12 fonctions de la table.
- **Générateur** : somme de 2 à 4 termes c·g(x), c entier non nul dans [−6 ; 6] ou fraction simple, g tiré de la table (xⁿ avec n ∈ {−3, …, 5} ∪ {1/2, −1/2, 3/2}, √x, 1/x, eˣ, 2ˣ, ln x, sin, cos, tan, arctan, sinh, cosh). Pas deux g identiques. Gabarit 1 : polynôme et racines. Gabarit 2 : mélange transcendant. Gabarit 3 : « f′(a) = ? » en un point a qui donne une valeur exacte.
- **Corrigé type** : f(x) = 3x⁴ − 2√x + 5/x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 0 | d(3x⁴ − 2√x + 5/x, x) | Départ |
  | 1 | = 3·d(x⁴) − 2·d(x^(1/2)) + 5·d(x⁻¹) | Linéarité, réécrire en puissances |
  | 2 | = 12x³ − 2·(1/2)x^(−1/2) + 5·(−1)x⁻² | Table |
  | 3 | = 12x³ − 1/√x − 5/x² | Simplifier |
- **Aides** : 1 « Écris chaque terme comme une puissance de x, puis utilise (xⁿ)′ = nxⁿ⁻¹. » · 2 « 12x³ − □/√x − 5/x² » · 3 la dernière ligne.
- **Variantes d'examen** : `mcq` (distracteurs `g6_power_rule_exp`, `g6_cos_sign`) ; `tf` (« (2ˣ)′ = x·2ˣ⁻¹ » : faux, contre-exemple : en x = 0, la vraie dérivée vaut ln 2 ≠ 0).
- **Pièges** : `g6_power_rule_exp`, `g6_cos_sign`.
- **Sous-buts → crédit** : réécrire en puissances → `g2-real-powers`.

### `g6-deriv-rules` — Règles de dérivation : produit, quotient, chaîne (pilote U0)
- **Année** 12 · **Prérequis** `g6-deriv-usual`, `g1-compose` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-compose` : repérer les couches f∘g pour la règle de chaîne.
- **Statut** : fait le 9 novembre 2026 (étape U0). Ses prérequis `g6-deriv-usual` (étape U2) et `g1-compose` (étape U1) sont construits.
- **Intro** : (uv)′ = u′v + uv′. (u/v)′ = (u′v − uv′)/v². (f∘g)′ = f′(g)·g′. On dérive de l'extérieur vers l'intérieur, et chaque couche multiplie par la dérivée de ce qu'elle contient.
- **Juge** : `equiv` `{vars:['x'], domain:{x:[-2.5, 2.5]} (privé des zéros du dénominateur), target:'no-prime'}`. Les nœuds `deriv` d'une ligne sont d'abord remplacés par `diff()`, puis la ligne est comparée à la précédente. · **Forme finale** : plus de `′` ; produit simplifié (pas de « ·1 », pas de « 0· ») ; on n'exige pas de factoriser.
- **Niveaux** :
  - L1 : la ligne de la règle est donnée avec des trous (u′, v′) ; décisions prises.
  - L2 : une décision « Quelle règle d'abord ? » (produit, quotient, chaîne) ; trous plus larges.
  - L3 (choisir l'action) : actions « règle du produit », « règle du quotient », « règle de chaîne », « table », « simplifier », puis l'élève écrit la ligne.
  - L4 : libre, aides disponibles ; « Quelle règle ? » une fois par item.
  - L5 : enchaînement : dériver puis évaluer f′(a), ou dériver puis donner le signe de f′ (vers `g6-sign-variation`), sans aide.
- **Générateur** : on tire une structure dans un arbre de profondeur ≤ 3 : produit u·v, quotient u/v, ou composition f(g(x)), avec u, v, g pris dans {polynôme de degré ≤ 2 à coefficients entiers dans [−5 ; 5], kx avec k ∈ {2, 3, 4, −1}, x² + c} et f dans la table de `g6-deriv-usual`. Niveaux 1–2 : une seule règle plus une chaîne linéaire (sin 3x, e^(2x)). Niveaux 3–5 : deux règles imbriquées. On rejette si la dérivée simplifiée a plus de 6 termes. Gabarit 1 : « Dérive f(x) = … ». Gabarit 2 : « Calcule f′(a) » avec a qui donne une valeur exacte (0, 1, π/6, π/4…). Gabarit 3 : quotient (2x + 1)/(x² + 1).
- **Corrigé type** : f(x) = x²·sin(3x).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 0 | d(x²·sin(3x), x) | Départ |
  | 1 | = d(x²)·sin(3x) + x²·d(sin(3x)) | Règle du produit |
  | 2 | = 2x·sin(3x) + x²·cos(3x)·d(3x) | Table, puis règle de chaîne |
  | 3 | = 2x·sin(3x) + 3x²·cos(3x) | Simplifier |
- **Aides** : 1 « C'est un produit : (uv)′ = u′v + uv′, avec u = x², v = sin(3x). » · 2 « = 2x·sin(3x) + x²·cos(3x)·□ » · 3 « = 2x·sin(3x) + 3x²·cos(3x) ».
- **Variantes d'examen** : `mcq` (distracteurs `g6_product_naive`, `g6_chain_forgot`, `g6_quotient_sign`) ; `tf` (« Si f et g sont dérivables, (f/g)′ = f′/g′ » : faux, contre-exemple f = x, g = x², x = 1 : (1/x)′ = −1, f′/g′ = 1/2) ; `coef` (f′(a)) ; `open`.
- **Pièges** : `g6_product_naive`, `g6_chain_forgot`, `g6_quotient_sign`, `g6_quotient_no_square`.
- **Sous-buts → crédit** : table → `g6-deriv-usual` ; règle de chaîne → `g6-deriv-rules` ; simplifier → `@alg:G-simplifier`.

### `g6-tangent` — Tangente et approximation linéaire
- **Année** 12 · **Prérequis** `g6-deriv-rules`, `g4-line2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Pas encore de juge `geom` : la tangente est une partie « y = » jugée par `equiv` (y vaut la bonne droite), forme finale y = mx + p développée. Le niveau 5 enchaîne la tangente et f(a ± 0,1) approché par elle, au lieu de g∘f ; l'approximation du gabarit 3 porte sur √x seulement.
- **Intro** : la tangente au graphe de f en a est y = f(a) + f′(a)(x − a). L'approximation linéaire de f(a + h) est f(a) + f′(a)·h. On calcule f(a) et f′(a) **en a**, puis on écrit la droite.
- **Juge** : segments `value` pour f(a), f′(a) ; `geom` `{object:'line2'}` pour la tangente ; `value` pour l'approximation · **Forme finale** : y = mx + p (ou cartésienne), ou la valeur approchée exacte.
- **Niveaux** :
  - L1 : f′ donnée ; trous dans f(a), f′(a), la droite.
  - L2 : f′ à calculer ; droite à trous.
  - L3 : actions « f(a) », « f′(x) », « f′(a) », « écrire la tangente ».
  - L4 : libre.
  - L5 : MAN 2017 Q6 modifié : tangente de f donnée par son équation, puis approximation linéaire de g∘f en un point proche, sans aide.
- **Générateur** : f polynôme de degré 3 à coefficients entiers dans [−4 ; 4], ou f d'une table simple (e^(kx), ln(x + c), √(x + c)) avec a qui donne des valeurs exactes. Gabarit 1 : tangente en a. Gabarit 2 : tangente parallèle à une droite donnée (f′(x) = m à résoudre). Gabarit 3 : approximation linéaire de √(4,1) ou de f(a + 1/10).
- **Corrigé type** : f(x) = x³ − 2x + 1, a = 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f(2) = 8 − 4 + 1 = 5 | Valeur en a |
  | 2 | f′(x) = 3x² − 2 | Dériver |
  | 3 | f′(2) = 10 | Pente en a |
  | 4 | y = 5 + 10(x − 2) | Écrire la tangente |
  | 5 | y = 10x − 15 | Simplifier |
- **Aides** : 1 « y = f(a) + f′(a)(x − a). » · 2 « y = 5 + □(x − 2) » · 3 « y = 10x − 15 ».
- **Variantes d'examen** : `mcq` (distracteur `g6_tangent_slope_function`) ; `coef` (ordonnée à l'origine) ; `open`.
- **Pièges** : `g6_tangent_slope_function`.
- **Sous-buts → crédit** : dériver → `g6-deriv-rules` ; écrire la droite → `g4-line2`.

### `g6-limits` — Limites de fonctions pour l'étude de fonction
- **Année** 12.5 · **Prérequis** `@alg:G-simplifier`, `g1-domain` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g1-domain` : les bornes du domaine donnent les limites à étudier.
- **Statut** : fait le 10 novembre 2026 (étape U2). Le V/F est un QCM Vrai/Faux (aucun vérificateur de contre-exemple ne prend une limite). Un pôle commence par la valeur du numérateur, puis une partie par côté ; « n'existe pas » n'est pas demandé. Le niveau 5 prend un pôle simple ou double d'une fraction de degré 1 ou 2.
- **Intro** : compétence ajoutée pour la progression (le plan n'a pas de ligne « limites » en G). En ±∞ : on met en évidence le terme dominant. En un zéro du dénominateur : numérateur ≠ 0 donne ±∞, avec le signe à gauche et à droite. Forme ∞ − ∞ avec une racine : on multiplie par l'expression conjuguée. Bernoulli-l'Hôpital et les DL sont en A1.
- **Juge** : `limit` `{v:'x', to, dir}` · **Forme finale** : nombre, `+∞`, `−∞`, ou « n'existe pas » (avec les deux limites latérales).
- **Niveaux** :
  - L1 : mise en évidence donnée ; trous dans la simplification.
  - L2 : décision « terme dominant », « conjuguée », « signe du dénominateur » ; lignes à trous.
  - L3 : actions de la décision, puis « simplifier », « passer à la limite ».
  - L4 : libre.
  - L5 : les quatre limites d'une fonction rationnelle (en ±∞ et des deux côtés d'un pôle), sans aide.
- **Générateur** : fractions rationnelles construites à partir de leurs racines entières (numérateur et dénominateur de degré ≤ 3, coefficients ≤ 9) ; √(x² + bx + c) − x avec b pair (limite b/2) ; pôle simple ou double. Gabarit 1 : en ±∞. Gabarit 2 : à gauche et à droite d'un pôle. Gabarit 3 : conjuguée.
- **Corrigé type** : lim de √(x² + 4x) − x quand x → +∞.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 0 | √(x² + 4x) − x | Forme ∞ − ∞ |
  | 1 | = 4x/(√(x² + 4x) + x) | Conjuguée |
  | 2 | = 4/(√(1 + 4/x) + 1) | Diviser par x (x > 0) |
  | 3 | → 4/2 = 2 | Passer à la limite |
- **Aides** : 1 « ∞ − ∞ avec une racine : multiplie et divise par l'expression conjuguée. » · 2 « = 4x/(√(x² + 4x) + □) » · 3 « La limite vaut 2. »
- **Variantes d'examen** : `mcq` (distracteurs `g6_infinity_minus_infinity`, `g6_sqrt_x2_abs`) ; `tf` (« lim (√(x² + 4x) − x) en +∞ vaut 0, car √(x² + 4x) ≈ x » : faux, elle vaut 2).
- **Pièges** : `g6_infinity_minus_infinity`, `g6_sqrt_x2_abs`.
- **Sous-buts → crédit** : conjuguée → `@alg:G-simplifier`.

### `g6-sign-variation` — Signe de f′, tableau de variation, extrema locaux
- **Année** 12 · **Prérequis** `g6-deriv-rules`, `g1-sign-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g6-deriv-rules` : calculer f′.
- **Statut** : fait le 10 novembre 2026 (étape U2). Niveau 1 : le tableau de signes de f′ (item `table`), puis la valeur aux points critiques ; la ligne de variation (↗↘) n'est pas dans le tableau, et le niveau 4 est en lignes libres. Le V/F est un QCM Vrai/Faux (pas de contre-exemple de type fonction). Gabarit 3 : (x² + m²)/x seulement.
- **Intro** : on factorise f′, on fait son tableau de signes, et on lit la variation. Un extremum local en a demande que f′ **change de signe** en a (f′(a) = 0 ne suffit pas : x³ en 0).
- **Juge** : `equiv` pour f′ factorisée ; `solset` `{v:'x'}` pour {f′ > 0} ; `value` pour les extrema (x, f(x)) ; décisions « max », « min », « ni l'un ni l'autre » · **Forme finale** : liste des extrema avec leur nature, intervalles de croissance.
- **Niveaux** :
  - L1 : f′ factorisée donnée ; tableau à trous.
  - L2 : factoriser f′ ; tableau à trous ; une décision « max / min / ni l'un ni l'autre ».
  - L3 : actions « dériver », « factoriser », « signe de chaque facteur », « lire la variation », « valeurs aux extrema ».
  - L4 : libre (le tableau se remplit dans un `table` à colonnes x, f′, f).
  - L5 : polynôme de degré 4 avec un point critique sans extremum, sans aide.
- **Générateur** : f′ construite à partir de ses racines entières r₁ < r₂ (et parfois une racine double), f = primitive à coefficients entiers (multiplier par le ppcm), constante dans [−5 ; 5]. Gabarit 1 : polynôme de degré 3. Gabarit 2 : degré 4 avec racine double de f′ (point d'inflexion à tangente horizontale). Gabarit 3 : f(x) = x·e^(kx) ou (x² + c)/x (extrema exacts).
- **Corrigé type** : f(x) = x³ − 3x² − 9x + 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f′(x) = 3x² − 6x − 9 | Dériver |
  | 2 | = 3(x + 1)(x − 3) | Factoriser |
  | 3 | f′ > 0 sur ]−∞ ; −1[ ∪ ]3 ; +∞[, f′ < 0 sur ]−1 ; 3[ | Signe de f′ |
  | 4 | Max local en −1 : f(−1) = 7 ; min local en 3 : f(3) = −25 | Extrema |
- **Aides** : 1 « Factorise f′, puis fais le tableau de signes. » · 2 « f′(x) = 3(x + 1)(x − □) » · 3 la ligne des extrema.
- **Variantes d'examen** : `mcq` (distracteur `g6_critical_is_extremum`) ; `tf` (« Si f′(a) = 0, f a un extremum en a » : faux, contre-exemple f(x) = x³, a = 0) ; `open`.
- **Pièges** : `g6_critical_is_extremum`.
- **Sous-buts → crédit** : factoriser → `@alg:D-factoriser-completement` ; signe → `g1-sign-table`.

### `g6-convexity` — Concavité et points d'inflexion
- **Année** 12 · **Prérequis** `g6-sign-variation`, `g6-tangent` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g6-sign-variation` : même tableau de signes, appliqué à f″.
- **Statut** : fait le 10 novembre 2026 (étape U2). La tangente d'inflexion est une partie « y = » jugée par `equiv`. Le V/F est un QCM Vrai/Faux. Le QCM prend x⁵ − 5x⁴ + … (inflexion en 3 seulement) ou un zéro double de f″.
- **Intro** : f″ > 0 : convexe (le graphe est au-dessus de ses tangentes). f″ < 0 : concave. Un point d'inflexion est un point où **la concavité change** : f″ change de signe (f″(a) = 0 ne suffit pas : x⁴ en 0). La tangente d'inflexion traverse le graphe.
- **Juge** : `equiv` pour f″ ; `solset` pour {f″ > 0} ; `value` pour le point d'inflexion ; `geom` `{object:'line2'}` pour la tangente d'inflexion · **Forme finale** : intervalles de convexité, points d'inflexion, tangente demandée.
- **Niveaux** :
  - L1 : f″ donnée ; signe à trous.
  - L2 : f″ à calculer ; décision « inflexion ou non ».
  - L3 : actions « f″ », « signe de f″ », « point d'inflexion », « tangente d'inflexion ».
  - L4 : libre.
  - L5 : CMS série 14 modifiée : g de degré 3 à paramètres p, q qui a un point d'inflexion donné avec une tangente donnée, sans aide.
- **Générateur** : comme `g6-sign-variation` ; f″ à racines entières ; 1 item sur 4 avec f″(a) = 0 sans changement de signe (x⁴ + …). Gabarit 1 : convexité d'un polynôme. Gabarit 2 : tangente d'inflexion. Gabarit 3 : paramètres p, q.
- **Corrigé type** : f(x) = x³ − 3x² − 9x + 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f″(x) = 6x − 6 | Dériver deux fois |
  | 2 | f″ < 0 sur ]−∞ ; 1[, f″ > 0 sur ]1 ; +∞[ | Signe de f″ |
  | 3 | Inflexion en (1 ; −9) | Point d'inflexion |
  | 4 | f′(1) = −12 ; tangente y = −12x + 3 | Tangente d'inflexion |
- **Aides** : 1 « Cherche où f″ change de signe. » · 2 « f″(x) = 6x − □ » · 3 le point (1 ; −9).
- **Variantes d'examen** : `mcq` (distracteur `g6_inflection_f2_zero`) ; `tf` (« Si f″(a) = 0, le graphe a un point d'inflexion en a » : faux, contre-exemple x⁴ en 0) ; `open`.
- **Pièges** : `g6_inflection_f2_zero`.
- **Sous-buts → crédit** : tangente → `g6-tangent`.

### `g6-optim` — Optimisation
- **Année** 12 · **Prérequis** `g6-sign-variation`, `g1-domain` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g1-domain` : domaine de la variable (contraintes physiques).
- **Statut** : fait le 10 novembre 2026 (étape U2). Gabarits : boîte, rectangle sous la parabole y = 3k² − x², enclos le long d'un mur (pas de cylindre ni de demi-cercle : leurs optimums sont irrationnels). Le niveau 5 et la variante `open` sont des items `lines` sans aide (le type `problem` arrive en U4).
- **Intro** : 1. Nommer la variable et son domaine (contraintes physiques). 2. Écrire la grandeur à optimiser en fonction d'**une seule** variable. 3. Dériver, chercher les zéros **dans le domaine**. 4. Justifier le maximum (tableau, ou bornes du domaine). 5. Répondre à la question posée (souvent une longueur, pas la valeur optimale).
- **Juge** : segments `equiv` pour V(x) et V′(x) ; `solset` pour le domaine ; `value` pour x* et V(x*) · **Forme finale** : la réponse à la question, avec la justification du maximum (décision).
- **Niveaux** :
  - L1 : V(x) donnée ; dérivée et racines à trous.
  - L2 : V(x) à trous ; décision « garder ou rejeter cette racine ».
  - L3 : actions « variable et domaine », « V(x) », « V′(x) », « racines », « garder celles du domaine », « justifier le max ».
  - L4 : libre.
  - L5 : CMS série 3 ou 13 modifiée (secteur de couronne de périmètre fixé, boîte dans une feuille), sans aide.
- **Générateur** : gabarits (boîte ouverte dans une feuille L × l, enclos le long d'un mur, cylindre de volume fixé, rectangle inscrit dans un demi-cercle) dont les paramètres sont tirés pour que V′ ait une racine rationnelle dans le domaine et une hors du domaine. Boîte : V′(x) = 12x² − 4(L + l)x + Ll a des racines rationnelles si et seulement si L² − Ll + l² est un carré parfait ; on tire L > l entiers ≤ 30 avec cette condition (par exemple 16 et 10 : 256 − 160 + 100 = 196 = 14²). Gabarit 1 : boîte. Gabarit 2 : enclos ou cylindre. Gabarit 3 : rectangle inscrit.
- **Corrigé type** : boîte ouverte dans une feuille de 16 × 10, en découpant des carrés de côté x aux coins.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 0 < x < 5 | Variable et domaine |
  | 2 | V(x) = x(16 − 2x)(10 − 2x) = 4x³ − 52x² + 160x | Grandeur à optimiser |
  | 3 | V′(x) = 12x² − 104x + 160 = 4(3x − 20)(x − 2) | Dériver, factoriser |
  | 4 | x = 2 (x = 20/3 est hors du domaine) | Racines dans le domaine |
  | 5 | V′ > 0 sur ]0 ; 2[, V′ < 0 sur ]2 ; 5[ : max, V(2) = 144 | Justifier le maximum |
- **Aides** : 1 « Écris le volume avec la seule variable x, et note pour quels x la boîte existe. » · 2 « V(x) = x(16 − 2x)(□) » · 3 « x = 2 ».
- **Variantes d'examen** : `mcq` (distracteur `g6_optim_outside_domain`) ; `open`.
- **Pièges** : `g6_optim_outside_domain`, `g6_critical_is_extremum`.
- **Sous-buts → crédit** : racines → `@alg:H-discriminant` ; justifier → `g6-sign-variation`.

### `g6-antideriv-usual` — Primitives usuelles
- **Année** 12 · **Prérequis** `g6-deriv-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Chaque item commence par réécrire f comme une somme de termes de la table (juge `equiv`, cible `goal` : séparer une fraction sur x, développer, ou écrire en puissances), puis intègre (juge `antideriv`) ; la variante `tf` est un QCM Vrai/Faux (pas de contre-exemple vérifiable pour « ln x n'est pas une primitive sur ]−∞ ; 0[ »).
- **Intro** : une primitive se vérifie **en la dérivant**. ∫xⁿ dx = xⁿ⁺¹/(n + 1) (n ≠ −1), ∫dx/x = ln|x|, ∫eᵃˣ dx = eᵃˣ/a, ∫cos(ax) dx = sin(ax)/a, ∫dx/(1 + x²) = arctan x. On n'oublie pas + C. Substitution et parties sont en A1.
- **Juge** : `antideriv` `{v:'x', f}` · **Forme finale** : plus de ∫, `+ C` présent (sinon `stay` : « N'oublie pas la constante. »).
- **Niveaux** :
  - L1 : réécriture en puissances donnée ; trous dans les exposants.
  - L2 : un terme à la fois, avec les ∫ restantes dans la ligne.
  - L3 : actions « linéarité », « réécrire », « table », « + C », « contrôle par dérivation ».
  - L4 : libre.
  - L5 : primitive qui passe par un point donné (calculer C), sans aide.
- **Générateur** : on part de la primitive F (somme de 2 à 4 termes de la table, coefficients choisis pour que f = F′ ait des coefficients entiers), et on donne f. Gabarit 1 : polynôme et puissances. Gabarit 2 : mélange avec 1/x, eᵃˣ, cos, sin. Gabarit 3 : F(x₀) = y₀.
- **Corrigé type** : ∫(3x² − 4/x + 2eˣ + cos x) dx.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | = 3∫x² dx − 4∫dx/x + 2∫eˣ dx + ∫cos x dx | Linéarité |
  | 2 | = x³ − 4ln\|x\| + 2eˣ + sin x + C | Table, + C |
- **Aides** : 1 « Intègre terme par terme ; vérifie en dérivant. » · 2 « = x³ − 4ln|□| + 2eˣ + sin x + C » · 3 la ligne entière.
- **Variantes d'examen** : `mcq` (distracteurs `g6_ln_abs`, `g6_antideriv_power_minus_one`) ; `tf` (« Une primitive de 1/x sur ]−∞ ; 0[ est ln x » : faux, ln x n'y est pas définie ; ln|x| convient).
- **Pièges** : `g6_ln_abs`, `g6_antideriv_power_minus_one`.
- **Sous-buts → crédit** : contrôle par dérivation → `g6-deriv-usual`.

### `g6-area` — Aire entre des courbes
- **Année** 12 · **Prérequis** `g6-antideriv-usual`, `@alg:H-discriminant` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). L'aire part de ∫ₐᵇ |f − g| dx (une intégrale par morceau, pour que la quadrature reste exacte) ; l'élève enlève la valeur absolue avec (haut − bas). Pas de gabarit « aire sous y = f(x) ≥ 0 » séparé (courbe et axe Ox à la place) ; la variante `tf` est un QCM Vrai/Faux ; `open` est un item `lines` sans aide (le type `problem` arrive en U4).
- **Intro** : aire entre f et g sur [a ; b] = ∫ₐᵇ |f − g| dx. On cherche les points d'intersection, on regarde quelle courbe est au-dessus sur chaque morceau, puis on intègre (haut − bas). Une intégrale négative n'est pas une aire.
- **Juge** : `solset` pour les intersections ; `definite` `{value}` pour l'intégrale · **Forme finale** : aire exacte positive.
- **Niveaux** :
  - L1 : bornes et ordre des courbes donnés ; primitive à trous.
  - L2 : bornes à trouver ; décision « quelle courbe est au-dessus ? ».
  - L3 : actions « intersections », « courbe du haut », « primitive », « évaluer aux bornes ».
  - L4 : libre.
  - L5 : aire avec un changement de position (deux morceaux), ou CMS série 21 (aire sous y = f(x) ≥ 0), sans aide.
- **Générateur** : intersections entières a < b (f − g = k(x − a)(x − b), k ∈ {±1, ±2}), f et g polynômes de degré ≤ 2 à coefficients entiers ; 1 item sur 3 avec trois intersections (deux morceaux). Gabarit 1 : parabole et droite. Gabarit 2 : deux paraboles. Gabarit 3 : courbe et axe Ox.
- **Corrigé type** : aire entre y = x² et y = 2x + 3.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x² = 2x + 3 ⇔ (x − 3)(x + 1) = 0 : x = −1, x = 3 | Intersections |
  | 2 | Sur ]−1 ; 3[, 2x + 3 > x² (test en 0 : 3 > 0) | Courbe du haut |
  | 3 | ∫₋₁³ (2x + 3 − x²) dx = [x² + 3x − x³/3]₋₁³ | Primitive |
  | 4 | = 9 − (−5/3) = 32/3 | Évaluer |
- **Aides** : 1 « Trouve les intersections, puis intègre (haut − bas). » · 2 « [x² + 3x − x³/3] de □ à □ » · 3 « 32/3 ».
- **Variantes d'examen** : `mcq` (distracteur `g6_area_signed`) ; `tf` (« ∫₋₁¹ x³ dx = 0, donc l'aire entre x³ et Ox sur [−1 ; 1] est nulle » : faux, elle vaut 1/2) ; `open`.
- **Pièges** : `g6_area_signed`.
- **Sous-buts → crédit** : intersections → `@alg:H-discriminant` ; primitive → `g6-antideriv-usual`.

### `g6-deriv-implicit` — Dérivée implicite, tangente à une courbe implicite
- **Année** 12.5 · **Prérequis** `g6-tangent`, `g0-factor-thm` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). La ligne dérivée est jugée comme identité en x, y, y′ (`equiv` avec `implicit: {y: 'p'}`, ajout au juge) ; y′ est isolé par `solset` en p (x, y échantillonnés là où le coefficient de p ne s'annule pas), donc la comparaison « sur la courbe » n'est pas construite ; la tangente est « y = … » (`equiv`, pas de `geom`). Le gabarit 3 (points à tangente horizontale) n'est pas fait.
- **Intro** : y dépend de x. On dérive chaque membre par rapport à x : (y²)′ = 2y·y′, (xy)′ = y + x·y′. On isole y′. En un point (x₀ ; y₀) de la courbe, y′(x₀) est la pente de la tangente.
- **Juge** : `equiv` `{vars:['x','y','y′']}` pour la ligne dérivée (identité en x, y, y′ libres) ; `equiv` `{vars:['x','y'], domain:{curve:'F(x, y) = 0'}}` pour y′ isolé (comparé **sur la courbe**, voir la note) ; `value` pour la pente ; `geom` pour la tangente · **Forme finale** : y′ en fonction de x et y ; tangente.
- **Niveaux** :
  - L1 : ligne dérivée à trous (les facteurs y′).
  - L2 : isoler y′ à trous.
  - L3 : actions « trouver y₀ », « dériver chaque terme », « isoler y′ », « évaluer en (x₀ ; y₀) », « tangente ».
  - L4 : libre.
  - L5 : MAN 2017 Q5 modifiée (tangente au point d'abscisse donnée d'une courbe implicite de degré 3), sans aide.
- **Note sur le juge** : si l'élève simplifie y′ à l'aide de l'équation de la courbe, son expression n'est égale à la nôtre que **sur la courbe**. Le juge échantillonne donc des points de la courbe (résolution numérique de F(x, y) = 0 en y pour 12 valeurs de x), au lieu du pavé du README §4.4.
- **Générateur** : on choisit T(x₀ ; y₀) entier, puis F(x, y) = somme de 3 ou 4 monômes de degré ≤ 3 à coefficients entiers dans [−3 ; 3], constante ajustée pour que F(T) = 0 ; on garde si F_y(T) ≠ 0 et si, à x = x₀, l'équation en y n'a qu'une racine réelle simple à trouver (racine entière, facteur restant sans racine réelle). Gabarit 1 : tangente au point d'abscisse x₀. Gabarit 2 : y′ en général. Gabarit 3 : points à tangente horizontale.
- **Corrigé type** : Γ : x² + xy + y³ = 3, au point d'abscisse 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 1 + y + y³ = 3 ⇔ (y − 1)(y² + y + 2) = 0 : y₀ = 1 | Trouver le point |
  | 2 | 2x + y + x·y′ + 3y²·y′ = 0 | Dériver par rapport à x |
  | 3 | y′ = −(2x + y)/(x + 3y²) | Isoler y′ |
  | 4 | y′(1) = −3/4 | Pente en (1 ; 1) |
  | 5 | 3x + 4y − 7 = 0 | Tangente |
- **Aides** : 1 « Dérive chaque terme ; chaque fois que tu dérives une expression en y, multiplie par y′. » · 2 « 2x + y + x·y′ + □·y′ = 0 » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g6_implicit_yprime_forgot`, `g6_implicit_xy`) ; `coef` (pente) ; `open`.
- **Pièges** : `g6_implicit_yprime_forgot`, `g6_implicit_xy`.
- **Sous-buts → crédit** : trouver le point → `g0-factor-thm` ; dériver → `g6-deriv-rules` ; tangente → `g6-tangent`.

### `g6-common-tangent` — Tangente imposée à une courbe ; tangente commune à deux courbes
- **Année** 12.5 · **Prérequis** `g6-deriv-implicit`, `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Seul le gabarit 1 (paramètre, T à coordonnées entières) est construit, avec deux énoncés ; la tangente commune à deux paraboles (gabarit 2, CMS série 12) n'est pas faite. y′ = m et y = mx + h sont remplacés dans la ligne dérivée (`solset` en x avec `subst`), puis T ∈ Γ donne p. `open` est un item `lines` sans aide.
- **Intro** : une droite t est tangente à Γ en T si T ∈ Γ, T ∈ t, et la pente de Γ en T est celle de t. On écrit ces conditions, on trouve T, puis le paramètre. Tangente commune à deux graphes : la tangente en a à f et la tangente en b à g ont la même pente et la même ordonnée à l'origine.
- **Juge** : segments `equiv` pour la dérivée ; `value` pour T et le paramètre ; `geom` pour la tangente commune · **Forme finale** : valeur du paramètre (ou équation de la tangente commune).
- **Niveaux** :
  - L1 : y′ donnée ; système à trous.
  - L2 : décision « quelles conditions ? » (T ∈ Γ, T ∈ t, pente) ; calcul à trous.
  - L3 : actions « dériver implicitement », « égaler la pente », « T sur t », « résoudre », « trouver p ».
  - L4 : libre.
  - L5 : MAN 2018 Q6 modifiée (retenir la solution à coordonnées entières), ou CMS série 12 modifiée (tangente commune de pente négative), sans aide.
- **Générateur** : gabarit 1 (paramètre) : on choisit T entier et la pente m, puis F(x, y) = monômes + p avec la condition de pente vérifiée en T ; on garde si le système a une autre solution non entière (à écarter, comme dans le corrigé MAN). Gabarit 2 (tangente commune) : f(x) = k₁(x − α)² + β, g(x) = k₂(x − γ)² + δ avec des tangentes communes à coefficients entiers (recherche dans les paramètres ≤ 4).
- **Corrigé type** : Γ : x³ + y² + 2xy + p = 0, t : y = −x + 3 ; retenir T à coordonnées entières.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 3x² + 2y·y′ + 2y + 2x·y′ = 0 | Dériver implicitement |
  | 2 | y′ = −1 : 3x² + 2y = 2y + 2x, donc 3x² − 2x = 0 | Égaler la pente |
  | 3 | x₀ = 0 ou x₀ = 2/3 ; T ∈ t : T = (0 ; 3) ou (2/3 ; 7/3) | Trouver T |
  | 4 | T = (0 ; 3) (coordonnées entières) | Choisir |
  | 5 | 0 + 9 + 0 + p = 0, p = −9 | T ∈ Γ |
- **Aides** : 1 « Trois conditions : T est sur Γ, T est sur t, et les pentes sont égales en T. » · 2 « 3x² + 2y = 2y + □ » · 3 « T = (0 ; 3), p = −9 ».
- **Variantes d'examen** : `open`.
- **Pièges** : `g6_implicit_yprime_forgot`, `g6_tangent_slope_function`.
- **Sous-buts → crédit** : dériver → `g6-deriv-implicit` ; résoudre → `@alg:E-systemes-2x2`.

### `g6-angular-points` — Points anguleux et de rebroussement
- **Année** 12.5 · **Prérequis** `g6-sign-variation`, `g6-limits`, `g1-abs-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g6-sign-variation` : dire si le point anguleux est un extremum.
- **Statut** : fait le 10 novembre 2026 (étape U2). Le rebroussement n'est qu'une option des décisions et des QCM (pas de gabarit ∛, ni le |x + 4|·∛x du CMS : remplacé par |x − a|·(x − b)) ; pas d'esquisse locale (pas de `plot` avant U5). Niveau 5 et variante `open` (E4, |x³ − a³| ± 3b²x) : f′(a⁻) et f′(a⁺) se jugent par `equiv` (x remplacé par a), les cas limites sont des décisions, et la partie (b) (inflexion, esquisse) est laissée de côté. Le V/F « f′(a⁻) ≠ f′(a⁺) ⇒ extremum » devient « pour tout c, |x − a| + cx a un extremum en a » (contre-exemple c donné, sorte `refute`).
- **Intro** : on écrit f par morceaux (sans valeur absolue). Au point de raccord a, f doit être continue ; on calcule f′(a⁻) et f′(a⁺). Différentes et finies : point anguleux. Infinies de signes opposés : point de rebroussement. Le point anguleux est un extremum si f′ change de signe en a ; attention au cas limite où une des dérivées latérales est nulle.
- **Juge** : `equiv` pour les morceaux et leurs dérivées ; `value` (ou `limit`) pour f′(a⁻), f′(a⁺) ; décisions « anguleux / rebroussement / dérivable » et « extremum ou non » · **Forme finale** : nature du point, extremum ou non, avec les demi-tangentes.
- **Niveaux** :
  - L1 : morceaux donnés ; dérivées latérales à trous.
  - L2 : morceaux à écrire ; décision « anguleux ? ».
  - L3 : actions « écrire par morceaux », « dériver chaque morceau », « f′(a⁻) et f′(a⁺) », « comparer les signes », « cas limite ».
  - L4 : libre ; esquisse locale (`plot` `task:'curve'` avec `halfTangents`).
  - L5 : MAN 2018 Q7 avec un paramètre a (voir E4), sans aide.
- **Générateur** : f(x) = |p(x)| + q(x), p polynôme de degré 2 ou 3 à racines entières, q affine à coefficients entiers ; ou f(x) = |x − a|·g(x) ; ou rebroussement avec ∛((x − a)²) + … Gabarit 1 : sans paramètre. Gabarit 2 : « Pour quels a le point anguleux est-il un extremum ? » (dérivées latérales affines ou quadratiques en a, avec un cas limite qui annule une dérivée latérale). Gabarit 3 : CMS série 14 (|x + 4|·∛x).
- **Corrigé type** : f(x) = |x² − 4| + 3x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f(x) = x² + 3x − 4 si \|x\| ≥ 2 ; f(x) = −x² + 3x + 4 si \|x\| < 2 | Par morceaux |
  | 2 | f′(x) = 2x + 3 si \|x\| > 2 ; f′(x) = −2x + 3 si \|x\| < 2 | Dériver |
  | 3 | En 2 : f′(2⁻) = −1, f′(2⁺) = 7 : point anguleux, f′ passe de − à + : min local f(2) = 6 | Dérivées latérales en 2 |
  | 4 | En −2 : f′(−2⁻) = −1, f′(−2⁺) = 7 : point anguleux, min local f(−2) = −6 | Dérivées latérales en −2 |
  | 5 | Sur ]−2 ; 2[, f′ = 0 en 3/2 : max local f(3/2) = 25/4 | Autres extrema |
- **Aides** : 1 « Écris f sans valeur absolue sur chaque intervalle, puis compare les dérivées des deux côtés. » · 2 « f′(2⁻) = −2·2 + 3 = □ » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g6_abs_derivative`, `g6_angular_boundary`) ; `tf` (« Si f′(a⁻) ≠ f′(a⁺), f a un extremum en a » : faux, contre-exemple f(x) = |x| + 2x en 0, croissante) ; `open` (E4).
- **Pièges** : `g6_abs_derivative`, `g6_angular_boundary`, `g6_angular_not_seen`.
- **Sous-buts → crédit** : par morceaux → `g1-abs-eq` ; dérivées latérales → `g6-limits`.

### `g6-asymptotes` — Asymptotes verticales, horizontales, obliques ; branches paraboliques
- **Année** 12.5 · **Prérequis** `g6-limits`, `g0-long-div` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). La droite « y = mx + h » est jugée par `equiv`, m et h étant des lettres données (pas encore de `geom`) ; la position est une décision. Gabarits : fraction rationnelle, √(x² + 2βx + c) (+ x) des deux côtés, et mx + k√x ou mx + k ln x (branche parabolique) ; x·e^(1/x) n'est pas proposé, et la branche de direction Oy n'est qu'une option de décision.
- **Intro** : verticale x = a si f → ±∞ en a. Horizontale y = ℓ si f → ℓ en ±∞. Oblique y = mx + h : m = lim f(x)/x (fini, non nul), puis h = lim (f(x) − mx) (fini). Si f(x)/x → ±∞, ou si m est fini mais f(x) − mx → ±∞ : branche parabolique (de direction Oy, ou y = mx). Pour une fraction rationnelle, la division euclidienne donne tout d'un coup.
- **Juge** : `limit` pour m et h ; `geom` `{object:'line2'}` pour chaque asymptote ; décisions pour les branches · **Forme finale** : liste des asymptotes et branches, de chaque côté (±∞ séparément).
- **Niveaux** :
  - L1 : m donné ; h à trous.
  - L2 : décision « division euclidienne » ou « m puis h » (les deux `good` pour une fraction rationnelle ; « division » `valid:false` sinon).
  - L3 : actions « domaine », « limites aux bornes », « m », « h », « position par rapport à l'asymptote ».
  - L4 : libre.
  - L5 : f avec √ (asymptotes différentes en +∞ et −∞, comme √(x² + 4x) + x), sans aide.
- **Générateur** : fraction rationnelle (degré du numérateur = degré du dénominateur + 1) construite à partir du quotient mx + h et du reste (entiers) ; √(x² + bx + c) avec b pair ; x·e^(1/x) (CMS série 15) ; x + ln x (branche parabolique). Gabarit 1 : rationnelle. Gabarit 2 : avec racine, deux côtés. Gabarit 3 : branche parabolique à reconnaître.
- **Corrigé type** : f(x) = (x² + x − 1)/(x − 1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D = ℝ \ {1} ; en 1 le numérateur vaut 1 ≠ 0 : x = 1 asymptote verticale | Verticale |
  | 2 | m = lim f(x)/x = lim (x² + x − 1)/(x² − x) = 1 | Pente |
  | 3 | h = lim (f(x) − x) = lim (2x − 1)/(x − 1) = 2 | Ordonnée à l'origine |
  | 4 | y = x + 2 en ±∞ | Oblique |
  | 5 | f(x) − (x + 2) = 1/(x − 1) : au-dessus pour x > 1, en dessous pour x < 1 | Position |
- **Aides** : 1 « m = lim f(x)/x, puis h = lim (f(x) − mx). » · 2 « h = lim (□)/(x − 1) » · 3 « y = x + 2 ».
- **Variantes d'examen** : `mcq` (distracteurs `g6_oblique_h_forgot`, `g6_vertical_any_zero`) ; `tf` (« Si lim f(x)/x = 1 en +∞, alors y = x est asymptote » : faux, contre-exemple x + √x : f(x) − x → +∞, branche parabolique) ; `open`.
- **Pièges** : `g6_oblique_h_forgot`, `g6_vertical_any_zero`, `g6_sqrt_x2_abs`.
- **Sous-buts → crédit** : limites → `g6-limits` ; division → `g0-long-div`.

### `g6-study-full` — Étude de fonction complète et esquisse
- **Année** 12.5 · **Prérequis** `g6-convexity`, `g6-asymptotes`, `g6-angular-points`, `g1-parity-period` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-parity-period` : les symétries réduisent l'étude.
- **Statut** : fait le 10 novembre 2026 (étape U2). Pas de tableau ni d'esquisse (`plot` en U5) : symétrie, position par rapport à l'asymptote, nature des extrema, concavité et inflexion sont des décisions, les valeurs du tableau des lignes `value`. Gabarit (1) aux niveaux 1 à 4 ; au niveau 5, une variante du (2), |x − a| + k/x (point anguleux, deux asymptotes obliques, une verticale), sans f″ ; gabarits (3) et (4) absents. Le niveau 5 et la variante `open` sont des items `lines` sans aide (le type `problem` arrive en U4).
- **Intro** : l'ordre : domaine et symétries ; limites et asymptotes ; f′, variation, extrema, points anguleux ; f″, concavité, inflexions ; tableau récapitulatif ; esquisse. L'esquisse place d'abord les asymptotes et les points remarquables, puis relie en respectant les variations.
- **Juge** : par segments (les juges des compétences prérequises), puis `plot` `task:'curve'` pour l'esquisse · **Forme finale** : tableau de variation complet et esquisse acceptée.
- **Niveaux** :
  - L1 : tous les calculs donnés ; l'élève remplit le tableau récapitulatif et place les éléments sur le repère.
  - L2 : un des calculs (f′ ou f″) à faire ; esquisse avec les asymptotes déjà tracées.
  - L3 : actions « domaine », « asymptotes », « f′ et variation », « f″ et concavité », « tableau », « esquisse ».
  - L4 : libre, aides disponibles.
  - L5 : `problem` complet (une fonction avec valeur absolue, asymptote oblique et un point anguleux), sans aide.
- **Générateur** : gabarits construits à l'envers : (1) f(x) = mx + h + k/(x − a) (extrema entiers si k > 0 est un carré, k ∈ {1, 4, 9}) ; (2) f(x) = |x − a|·(x − b)/(x − c) ; (3) f(x) = (x² + bx + c)·e^(−x) ; (4) f(x) = √(x² + bx) + x. Les extrema et inflexions sont contraints à des abscisses entières ou demi-entières, et la fenêtre de `view` est calculée pour les montrer tous.
- **Corrigé type** : f(x) = x²/(x − 1).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D = ℝ \ {1} ; ni paire ni impaire | Domaine, symétries |
  | 2 | f(x) = x + 1 + 1/(x − 1) : AV x = 1, AO y = x + 1 | Asymptotes |
  | 3 | f′(x) = x(x − 2)/(x − 1)² : max local (0 ; 0), min local (2 ; 4) | Variation |
  | 4 | f″(x) = 2/(x − 1)³ : concave sur ]−∞ ; 1[, convexe sur ]1 ; +∞[, pas d'inflexion | Concavité |
  | 5 | Esquisse : AV, AO, (0 ; 0), (2 ; 4), branches de chaque côté de l'AV | `plot` |
- **Aides** : 1 « Fais la division : f(x) = x + 1 + 1/(x − 1). Tout se lit mieux. » · 2 « f′(x) = 1 − 1/(x − 1)² = □/(x − 1)² » · 3 la ligne demandée.
- **Variantes d'examen** : `open` (barème par étape : domaine 0,5 ; asymptotes 1,5 ; variation 1,5 ; concavité 1 ; esquisse 1,5).
- **Pièges** : `g6_critical_is_extremum`, `g6_inflection_f2_zero`, `g6_oblique_h_forgot`, `g6_sketch_crosses_asymptote`.
- **Sous-buts → crédit** : asymptotes → `g6-asymptotes` ; variation → `g6-sign-variation` ; concavité → `g6-convexity` ; point anguleux → `g6-angular-points`.

### `g6-param-tangent` — Arcs paramétrés : vitesse, tangente, points stationnaires
- **Année** 12.5 · **Prérequis** `g6-tangent`, `g6-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). La tangente est une ligne « y = » développée (`equiv`, pas de `geom`) ; pas de tableau de variation conjoint ni de gabarit avec arctan et ln. Niveau 5 : soit l'étude complète sans aide, soit le gabarit 3 (a, b, c pour un point stationnaire à tangente verticale, résolus par `solset`).
- **Intro** : M(t) = (x(t) ; y(t)), vecteur vitesse (ẋ ; ẏ). Pente de la tangente : ẏ/ẋ. ẋ = 0 et ẏ ≠ 0 : tangente verticale. ẏ = 0 et ẋ ≠ 0 : tangente horizontale. ẋ = ẏ = 0 : point stationnaire ; la pente est la limite de ẏ/ẋ.
- **Juge** : `equiv` `{vars:['t']}` pour ẋ, ẏ ; `solset` `{v:'t'}` pour les zéros ; `limit` `{v:'t'}` pour la pente au point stationnaire ; `geom` `{object:'line2'}` pour la tangente · **Forme finale** : points à tangente horizontale, verticale, stationnaires, avec leurs tangentes.
- **Niveaux** :
  - L1 : ẋ, ẏ donnés ; zéros à trous.
  - L2 : ẋ, ẏ à calculer ; décision « horizontale / verticale / stationnaire » pour chaque zéro.
  - L3 : actions « ẋ », « ẏ », « zéros », « classer », « pente limite », « tangente ».
  - L4 : libre ; tableau de variation conjoint x(t), y(t) (`table`).
  - L5 : MAN 2018 Q9 modifiée : trouver a, b, c pour un point stationnaire à tangente verticale en t₀ donné, sans aide.
- **Générateur** : x(t), y(t) polynômes de degré ≤ 3 à coefficients entiers, construits à partir des zéros voulus de ẋ et ẏ (un zéro commun pour le point stationnaire) ; ou avec arctan t et ln(1 + t²) (gabarit MAN). Gabarit 1 : points remarquables. Gabarit 2 : tangente en t₀. Gabarit 3 : paramètres pour imposer un point stationnaire.
- **Corrigé type** : x(t) = t³ − 3t, y(t) = t² − 2t.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ẋ = 3t² − 3 = 3(t − 1)(t + 1), ẏ = 2t − 2 | Vitesse |
  | 2 | t = −1 : ẋ = 0, ẏ = −4 : tangente verticale en (2 ; 3) | Classer |
  | 3 | t = 1 : ẋ = ẏ = 0 : point stationnaire (−2 ; −1) | Classer |
  | 4 | ẏ/ẋ = 2(t − 1)/(3(t − 1)(t + 1)) = 2/(3(t + 1)) → 1/3 | Pente limite |
  | 5 | Tangente en (−2 ; −1) : x − 3y − 1 = 0 | Tangente |
- **Aides** : 1 « Cherche où ẋ et ẏ s'annulent, puis classe chaque valeur de t. » · 2 « ẏ/ẋ = 2/(3(t + □)) » · 3 la tangente.
- **Variantes d'examen** : `mcq` (distracteur `g6_param_slope_inverted`) ; `open`.
- **Pièges** : `g6_param_slope_inverted`.
- **Sous-buts → crédit** : pente limite → `g6-limits` ; tangente → `g6-tangent`.

### `g6-param-branches` — Arcs paramétrés : branches infinies et esquisse
- **Année** 12.5 · **Prérequis** `g6-param-tangent`, `g6-asymptotes` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g6-param-tangent` : dérivées x′(t), y′(t) et tableau des variations conjointes.
- **Statut** : fait le 10 novembre 2026 (étape U2). Pas d'esquisse ni de tableau conjoint (`plot` en U5). Gabarit 1 sans paramètre, gabarit 3 avec logarithmes (MAN 2017 Q7, asymptote oblique y = (k + 1)x, verticale x = ln c). E5 (niveau 5 et variante `open`) : le juge `limit` ne connaît pas de paramètre, donc les limites quand t → −1 sont des lignes `equiv` en t et a où t est remplacé par −1 ; les cas a = 0 et a = −1 sont des décisions. Item `lines` sans aide (pas encore de `problem`).
- **Intro** : on regarde chaque borne t₀ du domaine (et ±∞). x → ∞ et y → ℓ : asymptote horizontale. x → k et y → ∞ : verticale. Les deux → ∞ : m = lim y/x, puis h = lim (y − mx) ; si les deux sont finis, asymptote oblique ; sinon branche parabolique. x et y finis : pas de branche infinie (le point tend vers un point).
- **Juge** : `limit` `{v:'t', to, dir}` ; `geom` pour les asymptotes ; décisions pour chaque borne ; `plot` `task:'curve'` pour l'esquisse · **Forme finale** : liste des branches infinies par borne, puis esquisse.
- **Niveaux** :
  - L1 : limites de x et y données ; décision et asymptote à trous.
  - L2 : limites à calculer ; m et h à trous.
  - L3 : actions « domaine en t », « limites aux bornes », « m », « h », « conclure », « esquisser ».
  - L4 : libre ; esquisse avec le tableau de variation conjoint.
  - L5 : MAN 2018 Q8 avec un paramètre a (voir E5), ou MAN 2017 Q7 (x = ln(t² + 1), y = ln(t⁴ + t²)), sans aide.
- **Générateur** : x(t) = P(t)/(t − t₀), y(t) = Q(t)/(t − t₀) avec P, Q de degré ≤ 2 à coefficients entiers ; on garde si m et h sont rationnels simples (dénominateurs ≤ 6) et qu'une autre borne donne une asymptote horizontale ou verticale. Gabarit 1 : sans paramètre. Gabarit 2 : avec un paramètre a qui change la nature (comme MAN 2018 Q8). Gabarit 3 : logarithmes (branche parabolique).
- **Corrigé type** : x(t) = t²/(t − 2), y(t) = (t + 1)/(t − 2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Domaine : t ≠ 2 | Bornes à étudier : ±∞ et 2 |
  | 2 | t → ±∞ : x → ±∞, y → 1 : asymptote horizontale y = 1 | Borne ±∞ |
  | 3 | t → 2 : x → ∞ et y → ∞ | Borne 2 |
  | 4 | m = lim y/x = lim (t + 1)/t² = 3/4 | Pente |
  | 5 | h = lim (y − (3/4)x) = lim (−3t² + 4t + 4)/(4(t − 2)) = lim −(3t + 2)/4 = −2 | Ordonnée à l'origine |
  | 6 | Asymptote oblique y = (3/4)x − 2 | Conclure |
- **Aides** : 1 « Pour chaque borne, calcule les limites de x et de y, puis choisis le cas. » · 2 « h = lim −(3t + 2)(t − 2)/(4(t − □)) » · 3 « y = (3/4)x − 2 ».
- **Variantes d'examen** : `mcq` (nature de la branche ; distracteur `g6_oblique_h_forgot`) ; `open` (E5).
- **Pièges** : `g6_oblique_h_forgot`, `g6_param_ratio_inverted`.
- **Sous-buts → crédit** : limites → `g6-limits` ; asymptote → `g6-asymptotes`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g6_power_rule_exp` | calculus | E | `g6-deriv-usual` | `g6-deriv-usual` | (2ˣ)′ = x·2ˣ⁻¹ → 2ˣ·ln 2 | Dans `prev`, remplace `d(a^x)` (exposant variable) par x·a^(x−1), et `d(e^x)` par x·e^(x−1). | « La règle nxⁿ⁻¹ vaut quand **l'exposant** est constant. Ici c'est la base qui est constante : (aˣ)′ = aˣ·ln a. » |
| `g6_cos_sign` | sign | E | `g6-deriv-usual` | `g6-deriv-usual` | (cos x)′ = sin x → −sin x | Remplace `d(cos u)` par sin u·u′ (signe perdu) ; et `d(sin u)` par −cos u·u′. | « cos descend quand x passe de 0 à π/2 : sa dérivée y est négative. (cos x)′ = −sin x. » |
| `g6_product_naive` | calculus | R | `g6-deriv-rules` | `g6-deriv-rules` | (x²·sin 3x)′ = 2x·3cos 3x → 2x·sin 3x + 3x²·cos 3x | Remplace chaque `d(u·v)` de `prev` par `d(u)·d(v)`. Source : Orton (1983). | « La dérivée d'un produit n'est pas le produit des dérivées. Contrôle avec x·x = x² : ta règle donne 1·1 = 1, la vraie dérivée est 2x. Ici : (uv)′ = u′v + uv′. » |
| `g6_chain_forgot` | calculus | R | `g6-deriv-rules` | `g6-deriv-rules` | (sin 3x)′ = cos 3x → 3cos 3x | Remplace chaque `d(f(g))` avec g non identique à x par f′(g) sans le facteur g′. Source : Orton (1983). | « Tu as dérivé sin, mais pas ce qu'il y a dedans : la dérivée de 3x est 3, et elle multiplie cos 3x. » |
| `g6_quotient_sign` | calculus | E | `g6-deriv-rules` | `g6-deriv-rules` | (u/v)′ = (u′v + uv′)/v² → (u′v − uv′)/v² | Dans la ligne du quotient, remplace − par + au numérateur, puis produit aussi (uv′ − u′v)/v². | « Dans la règle du quotient, c'est u′v **moins** uv′, dans cet ordre. Contrôle avec 1/x : ta formule donne +1/x², la vraie dérivée est −1/x². » |
| `g6_quotient_no_square` | calculus | E | `g6-deriv-rules` | `g6-deriv-rules` | (u′v − uv′)/v → /v² | Remplace v² par v au dénominateur. | « Le dénominateur de la règle du quotient est v², ici (…)². » |
| `g6_tangent_slope_function` | calculus | E | `g6-tangent` | `g6-tangent` | y = f(a) + f′(x)(x − a) → f′(a) | Garde f′(x) (non évalué en a) dans l'équation de la tangente. | « Une tangente est une droite : sa pente est un **nombre**, f′(2) = 10, pas la fonction f′(x) = 3x² − 2. » |
| `g6_infinity_minus_infinity` | calculus | E | `g6-limits` | `g6-limits` | √(x² + 4x) − x → 0 → 2 | `wrongValues` : 0 pour toute forme ∞ − ∞. | « ∞ − ∞ n'est pas 0 : les deux termes grandissent, mais l'un peut rester en avance de 2. Multiplie par la conjuguée pour le voir. » |
| `g6_sqrt_x2_abs` | calculus | E | `g6-limits` | `g1-abs-eq` | √(x²) = x en −∞ → \|x\| = −x | Remplace √(x²·u) par x·√u (au lieu de \|x\|·√u) quand x → −∞. | « √(x²) = \|x\|, et pour x < 0, \|x\| = −x. Le signe de ta limite change. » |
| `g6_critical_is_extremum` | calculus | E | `g6-sign-variation` | `g6-sign-variation` | f′(0) = 0 pour x³ ⇒ extremum → non | `wrongValues` : chaque zéro de f′ déclaré extremum, même sans changement de signe. | « f′(…) = 0, mais f′ a le même signe des deux côtés : f continue de monter (ou de descendre). Il faut que f′ **change de signe**. » |
| `g6_inflection_f2_zero` | calculus | E | `g6-convexity` | `g6-convexity` | f″(0) = 0 pour x⁴ ⇒ inflexion → non | `wrongValues` : chaque zéro de f″ déclaré point d'inflexion. | « f″(…) = 0, mais f″ garde le même signe des deux côtés : la concavité ne change pas. » |
| `g6_optim_outside_domain` | method | E | `g6-optim` | `g6-optim` | x = 20/3 retenu → x = 2 | `wrongValues` : la racine de V′ hors du domaine, et la valeur de V en ce point. | « Avec x = 20/3, la feuille de largeur 10 serait coupée de 2·20/3 > 10 : la boîte n'existe pas. Reste dans 0 < x < 5. » |
| `g6_ln_abs` | calculus | E | `g6-antideriv-usual` | `g6-antideriv-usual` | ∫dx/x = ln x → ln\|x\| | Dans la primitive de l'élève, remplace ln\|u\| par ln u (le juge `antideriv` compare par dérivation sur un domaine qui contient des x < 0). | « ln x n'existe que pour x > 0. Pour une primitive valable aussi quand x < 0, écris ln\|x\|. » |
| `g6_antideriv_power_minus_one` | calculus | E | `g6-antideriv-usual` | `g6-antideriv-usual` | ∫x⁻¹ dx = x⁰/0 ; ∫x³ dx = 3x² → x⁴/4 | Applique la règle de **dérivation** nxⁿ⁻¹ à la place de la primitive, ou xⁿ⁺¹/(n + 1) avec n = −1. | « Pour intégrer, on **monte** l'exposant et on divise : x³ → x⁴/4. Contrôle en dérivant ta ligne : tu dois retrouver x³. » |
| `g6_area_signed` | calculus | E | `g6-area` | `g6-area` | aire = ∫(bas − haut) = −32/3 → 32/3 | `wrongValues` : ∫(g − f) (ordre inversé), et ∫ sur tout l'intervalle sans couper aux changements de signe. | « Une aire est positive. Ton intégrale vaut … : tu as soustrait la courbe du haut à celle du bas (ou mélangé deux morceaux). » |
| `g6_implicit_yprime_forgot` | calculus | E | `g6-deriv-implicit` | `g6-deriv-rules` | (y³)′ = 3y² → 3y²·y′ | Dérive chaque terme en y comme si y était x : supprime le facteur y′ des termes où y est dérivé. | « y dépend de x : (y³)′ = 3y²·y′ par la règle de chaîne, comme (sin 3x)′ = 3cos 3x. » |
| `g6_implicit_xy` | calculus | E | `g6-deriv-implicit` | `g6-deriv-rules` | (xy)′ = y′ → y + x·y′ | Remplace la dérivée de x·y par x·y′ seul, puis par y′. | « xy est un produit : (xy)′ = 1·y + x·y′. » |
| `g6_abs_derivative` | calculus | E | `g6-angular-points` | `g6-angular-points` | (\|x² − 4\|)′ = \|2x\| → selon le signe de x² − 4 | Remplace `d(|u|)` par \|u′\|. | « La dérivée de \|u\| dépend du **signe de u**, pas de celui de u′ : c'est u′ si u > 0, −u′ si u < 0. Écris f par morceaux. » |
| `g6_angular_boundary` | method | C | `g6-angular-points` | `g6-angular-points` | a ∈ ]−∞ ; −1[ ∪ ]1 ; +∞[ → ]−∞ ; −1] ∪ ]1 ; +∞[ | `wrongValues` : l'ensemble des paramètres sans les cas limites (dérivée latérale nulle) traités, ou avec les deux cas ajoutés sans vérification. Source : barème du corrigé MAN 1B 2018 (1 point pour « le cas a = ±1 »). | « Quand f′(a⁻) = 0, le signe des dérivées latérales ne décide pas. Regarde le signe de f′ juste à gauche de a : pour a = …, f′ y vaut … . » |
| `g6_angular_not_seen` | calculus | E | `g6-angular-points` | `g6-angular-points` | « f est dérivable en 2, f′(2) = 3 » → anguleux | Calcule f′ avec la formule d'un seul morceau et l'évalue au point de raccord. (Recoupe le piège A1 « Point anguleux non vu ».) | « En 2, f change de formule. Il faut comparer f′(2⁻) = … et f′(2⁺) = … : elles diffèrent, donc f n'est pas dérivable en 2. » |
| `g6_oblique_h_forgot` | calculus | E | `g6-asymptotes` | `g6-asymptotes` | asymptote y = x → y = x + 2 | `wrongValues` : y = mx (h oublié), et y = mx + lim f(x)/x. | « m donne la direction. Il faut encore h = lim (f(x) − mx) = … : l'asymptote est décalée. » |
| `g6_vertical_any_zero` | calculus | E | `g6-asymptotes` | `@alg:G-simplifier` | x = 2 asymptote de (x² − 4)/(x − 2) → trou | `wrongValues` : une asymptote verticale à chaque zéro du dénominateur, même quand le numérateur s'y annule aussi. | « En x = 2, le numérateur vaut aussi 0 : après simplification, f = x + 2, qui tend vers 4. Pas d'asymptote : un trou. » |
| `g6_sketch_crosses_asymptote` | geometry | E | `g6-study-full` | `g6-asymptotes` | branche du mauvais côté de l'asymptote | Pour l'item `plot` : la branche tracée du côté opposé au signe de f(x) − (mx + h). | « f(x) − (x + 1) = 1/(x − 1) > 0 pour x > 1 : la branche est **au-dessus** de l'asymptote de ce côté. » |
| `g6_param_slope_inverted` | calculus | E | `g6-param-tangent` | `g6-param-tangent` | pente ẋ/ẏ → ẏ/ẋ | Remplace ẏ/ẋ par ẋ/ẏ dans la ligne de pente ; échange « horizontale » et « verticale ». | « La pente est dy/dx = ẏ/ẋ. Avec ẋ = 0 et ẏ ≠ 0, la tangente est **verticale**. » |
| `g6_param_ratio_inverted` | calculus | E | `g6-param-branches` | `g6-param-branches` | m = lim x/y → lim y/x | Calcule m = lim x/y et l'asymptote correspondante. | « m est la pente : lim y/x. Avec x/y, tu obtiens 1/m = … . » |

## Exemples de type examen

### E4. Point anguleux à paramètre (d'après MAN Math 1B, examen blanc 2018, Q7, 6 points)

f(x) = |x³ − a³| − 12x, a ∈ ℝ. (a) Pour quels a le graphe a-t-il un point anguleux qui est un extremum ? (b) Ce point est-il un point d'inflexion ? Esquisse locale pour a = 2.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| 1. f par morceaux, domaine, candidat | f = a³ − x³ − 12x si x < a ; x³ − a³ − 12x si x ≥ a ; D = ℝ, f continue ; seul candidat x = a | 1,5 | `g6-angular-points` |
| 2. Dérivées latérales | f′(a⁻) = −3a² − 12, f′(a⁺) = 3a² − 12 ; différentes si a ≠ 0 | 0,5 | `g6-angular-points` |
| 3. Signes | f′(a⁻) < 0 toujours ; extremum si f′(a⁺) > 0 : \|a\| > 2 | 1 | `g6-angular-points` |
| 4. Cas limites | a = 2 : f′ = 3x² − 12 > 0 pour x > 2, extremum (min) ; a = −2 : f′ < 0 juste à droite, pas d'extremum. Réponse : a ∈ ]−∞ ; −2[ ∪ [2 ; +∞[ | 1 | `g6-angular-points` |
| 5. Inflexion et esquisse | f″ = −6x à gauche, 6x à droite : signes opposés en a ≠ 0, donc inflexion. Pour a = 2, A(2 ; −24) : à gauche demi-tangente de pente −24, concave ; à droite demi-tangente horizontale, convexe | 2 | `g6-convexity`, `g6-angular-points` |

`points: [[0.5, 0.5, 0.5], [0.5], [1], [0.5, 0.5], [1, 1]]`. L'étape 5 est un `plot` `task:'curve'` avec `halfTangents:[{x:2, side:'-', slope:-24}, {x:2, side:'+', slope:0}]`.

### E5. Branches infinies d'un arc à paramètre (d'après MAN Math 1B, examen blanc 2018, Q8, 6 points)

Γ : x(t) = (at² − t)/(t + 1), y(t) = 2t/(t + 1), a ∈ ℝ. Déterminer, en fonction de a, les branches infinies de Γ.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| 1. t → ±∞ | y → 2 ; x → ∞ si a ≠ 0, x → −1 si a = 0 | 1 | `g6-param-branches` |
| 2. Conclure en ±∞ | a = 0 : pas de branche infinie, M(t) → (−1 ; 2) ; a ≠ 0 : asymptote horizontale y = 2 | 1 | `g6-param-branches` |
| 3. t → −1 | y → ∞ ; si a = −1, x = −t → 1 : asymptote verticale x = 1 | 1,5 | `g6-param-branches` |
| 4. a ≠ −1 : pente | m = lim y/x = lim 2/(at − 1) = −2/(a + 1) | 1 | `g6-param-branches` |
| 5. a ≠ −1 : ordonnée | h = lim (y − mx) = lim 2at(t + 1)/((a + 1)(t + 1)) = −2a/(a + 1) ; asymptote y = −2(x + a)/(a + 1) | 1,5 | `g6-param-branches` |

`points: [[1], [0.5, 0.5], [1, 0.5], [1], [1, 0.5]]`. Chaque cas de a est une ligne de décision ; l'élève doit les nommer tous (a = 0, a = −1, les autres).

---

# G7. Combinatoire et probabilités élémentaires

Unité `combi` · préfixe `g7-` · pièges `g7_` · Statut : à faire

**Sources** : CMS, Algèbre linéaire, semestre 1, chapitre « Analyse combinatoire » (calculs de factorielles, simplifications, identités sur les C(n, k), équations dans ℕ) ; CMS, Analyse I, chapitre 1 (binôme de Newton) ; plan, module P (« 4 cartes parmi 32, exactement 2 dames », réutilisé ici). Les probabilités de Laplace et les arbres sont absents du CMS : ces deux compétences portent l'étiquette `opt`, qui est seulement informative. Elles restent obligatoires (README §1).
**Notation** : factorielle `n!` ; combinaisons `C(n, k)`, affichées comme le coefficient binomial vertical (le CMS écrit aussi Cₙᵏ) ; arrangements `A(n, k)` = n!/(n − k)! ; permutations `P(n) = n!`. Probabilités : `P(A)`, fractions irréductibles.
**Prérequis extérieurs** : `g5-sigma`, `@alg:C-identites`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g5-sigma`.

Le juge `value` reçoit ici l'extension `n!`, `C(n, k)`, `A(n, k)` (voir les conventions communes) : une ligne comme `C(7, 3)·C(5, 2)` est évaluée exactement et comparée à la précédente.

## Compétences

### `g7-mult-principle` — Principe multiplicatif
- **Année** 12 · **Prérequis** — · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : un choix en plusieurs étapes indépendantes (« et ») : on **multiplie** les nombres de possibilités. Des cas qui s'excluent (« ou ») : on **additionne**. Un arbre ou des cases à remplir aident à compter.
- **Juge** : `value` `{form:'integer'}` · **Forme finale** : un entier (la ligne `26²·9·10²` est acceptée comme étape, la forme finale est le nombre).
- **Niveaux** :
  - L1 : cases dessinées (une par étape) ; trous dans le nombre de choix par case.
  - L2 : cases à dessiner (nombre de cases donné) ; décision « × ou + » entre deux sous-cas.
  - L3 : actions « une case par étape », « nombre de choix », « multiplier », « séparer en cas », « additionner ».
  - L4 : libre.
  - L5 : comptage avec une contrainte (premier chiffre non nul, lettres distinctes, au moins une voyelle par le complémentaire), sans aide.
- **Générateur** : gabarits (plaques, codes, menus, mots de passe, tenues) ; nombres de choix entre 2 et 26 ; une contrainte tirée parmi 4 (aucune, premier non nul, tous distincts, au moins un). Gabarit 1 : produit simple. Gabarit 2 : somme de deux cas. Gabarit 3 : complémentaire (total − aucun).
- **Corrigé type** : une plaque a 2 lettres (A–Z), puis 3 chiffres, le premier chiffre non nul. Combien de plaques ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 26 · 26 · 9 · 10 · 10 | Une case par étape |
  | 2 | = 676 · 900 | Calculer |
  | 3 | = 608 400 | Résultat |
- **Aides** : 1 « Dessine 5 cases et écris dans chacune le nombre de choix. » · 2 « 26 · 26 · □ · 10 · 10 » · 3 « 608 400 ».
- **Variantes d'examen** : `mcq` (distracteurs `g7_add_instead_multiply`, `g7_constraint_ignored`) ; `tf` (« Avec 3 entrées, 4 plats et 2 desserts, on compose 9 menus » : faux, 24).
- **Pièges** : `g7_add_instead_multiply`, `g7_constraint_ignored`.
- **Sous-buts → crédit** : une case par étape → `g7-mult-principle` (le calcul final n'a pas de crédit propre : la calculatrice intégrée est permise ici).

### `g7-perm-arr` — Factorielles, permutations, arrangements, anagrammes
- **Année** 12 · **Prérequis** `g7-mult-principle` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g7-mult-principle` : n! et A(n, k) viennent du principe multiplicatif.
- **Intro** : n objets distincts en ligne : n! façons. k places parmi n, ordre compté, sans répétition : A(n, k) = n·(n − 1)···(n − k + 1) = n!/(n − k)!. Anagrammes d'un mot avec des lettres répétées : n!/(n₁!·n₂!···). Simplifier : (n + 1)! = (n + 1)·n!.
- **Juge** : `value` `{form:'integer'}` ; `equiv` `{vars:['n'], domain:{n:'entiers ≥ 2'}}` pour les simplifications littérales · **Forme finale** : entier, ou polynôme en n développé.
- **Niveaux** :
  - L1 : formule écrite ; trous dans n et k.
  - L2 : décision « n! », « A(n, k) » ou « anagrammes » ; calcul à trous.
  - L3 : actions « reconnaître », « écrire la formule », « simplifier les factorielles », « calculer ».
  - L4 : libre ; simplifications du CMS ((n + 1)!/(n − 1)!, (n + 2)! − (n + 1)!).
  - L5 : anagrammes avec une contrainte (voyelles ensemble, mot qui commence par une lettre donnée), sans aide.
- **Générateur** : n ∈ [4 ; 10], k ∈ [2 ; 4] ; mots de 5 à 8 lettres avec 1 ou 2 lettres répétées (liste de mots français courants : RADAR, BANANE, ANANAS, COCOTTE…) ; simplifications : quotient ou différence de deux factorielles d'arguments n + a, n + b avec |a − b| ≤ 2. Gabarit 1 : podium. Gabarit 2 : anagrammes. Gabarit 3 : simplification littérale.
- **Corrigé type** : (a) de combien de façons 8 coureurs peuvent-ils occuper les 3 marches du podium ? (b) Combien d'anagrammes a RADAR ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | A(8, 3) = 8 · 7 · 6 | Arrangement : ordre compté, pas de répétition |
  | 2 | = 336 | Calculer |
  | 3 | 5!/(2!·2!) | Anagrammes : R et A deux fois chacun |
  | 4 | = 120/4 = 30 | Calculer |
- **Aides** : 1 « Le podium : l'ordre compte, et un coureur ne peut pas être deux fois sur le podium. » · 2 « 8 · 7 · □ » · 3 « 336 ».
- **Variantes d'examen** : `mcq` (distracteurs `g7_factorial_quotient`, `g7_anagram_repeats`) ; `tf` (« (2n)! = 2·n! » : faux, contre-exemple n = 2 : 24 ≠ 4).
- **Pièges** : `g7_factorial_quotient`, `g7_anagram_repeats`.
- **Sous-buts → crédit** : simplifier → `g7-perm-arr`.

### `g7-combinations` — Combinaisons, triangle de Pascal
- **Année** 12 · **Prérequis** `g7-perm-arr` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g7-perm-arr` : C(n, k) = A(n, k)/k!.
- **Intro** : choisir k objets parmi n, sans ordre : C(n, k) = n!/(k!(n − k)!) = A(n, k)/k!. C(n, k) = C(n, n − k). Pascal : C(n, k) = C(n − 1, k − 1) + C(n − 1, k). Choix dans plusieurs groupes : on multiplie les C.
- **Juge** : `value` `{form:'integer'}` ; `solset` `{v:'n', domain:'entiers'}` pour les équations en n · **Forme finale** : entier ; ou ensemble des n solutions.
- **Niveaux** :
  - L1 : C(n, k) écrit ; calcul à trous (simplifier avant de multiplier).
  - L2 : décision « un groupe ou plusieurs groupes ? » ; produit à trous.
  - L3 : actions « choisir dans chaque groupe », « multiplier », « simplifier la factorielle », « calculer ».
  - L4 : libre, y compris équations du CMS (C(n, 2) = 45).
  - L5 : « exactement » et « au moins » (complémentaire), sans aide.
- **Générateur** : groupes de tailles 3 à 12, choix de 1 à 4 dans chaque groupe ; équation C(n, 2) = m ou C(n, 3) = m avec n entier dans [5 ; 15] (m calculé) ; « au moins un » : total − aucun. Gabarit 1 : comité dans deux groupes. Gabarit 2 : cartes (32 ou 36 cartes, « exactement 2 dames »). Gabarit 3 : équation en n.
- **Corrigé type** : un comité de 3 femmes parmi 7 et 2 hommes parmi 5.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | C(7, 3) · C(5, 2) | Choisir dans chaque groupe |
  | 2 | = (7·6·5)/(3·2·1) · (5·4)/(2·1) | Écrire |
  | 3 | = 35 · 10 = 350 | Calculer |
- **Aides** : 1 « Dans un comité, l'ordre ne compte pas : C(n, k) dans chaque groupe, puis on multiplie. » · 2 « C(7, 3) · C(□, □) » · 3 « 350 ».
- **Variantes d'examen** : `mcq` (distracteurs `g7_order_confusion`, `g7_add_instead_multiply`) ; `tf` (« C(10, 7) = C(10, 3) » : vrai ; « C(n, k) = A(n, k) » : faux, contre-exemple n = 3, k = 2 : 3 ≠ 6) ; `open`.
- **Pièges** : `g7_order_confusion`, `g7_add_instead_multiply`.
- **Sous-buts → crédit** : choisir dans chaque groupe → `g7-mult-principle`.

### `g7-which-count` — Ordonné ou pas ? Avec ou sans remise ? (exercice éclair)
- **Année** 12 · **Prérequis** `g7-combinations` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1 · **needsSolo** false
- **Intro** : deux questions avant tout calcul. L'ordre compte-t-il (podium, code) ou non (main de cartes, comité) ? Peut-on reprendre le même objet (code, dé lancé plusieurs fois) ou non (tirage sans remise, personnes) ? Quatre cases : nᵏ (ordre, avec remise), A(n, k) (ordre, sans remise), C(n, k) (sans ordre, sans remise), C(n + k − 1, k) (sans ordre, avec remise ; seulement en L4–L5).
- **Juge** : `mcq` (pas de lignes) ; en L3 et plus, `answer` jugé par `value` · **Forme finale** : la bonne case, puis le nombre.
- **Niveaux** (exercice éclair, séries de 8 énoncés courts) :
  - L1 : la question « l'ordre compte-t-il ? » seule, avec un indice dans l'énoncé (« dans l'ordre », « une poignée »).
  - L2 : les deux questions, sans indice.
  - L3 : choisir la case du tableau 2 × 2, puis la formule.
  - L4 : choisir et calculer ; la 4e case apparaît (combinaisons avec répétition).
  - L5 : série de 8 sans aide, en temps limité, les quatre cases mélangées.
- **Générateur** : banque de 40 situations (code de cadenas, podium, main de poker, comité, tirage de boules avec ou sans remise, lancer de dés, glaces de 3 boules parmi 8 parfums…) paramétrées par n ∈ [4 ; 12], k ∈ [2 ; 5]. Chaque situation porte sa case. Gabarit 1 : énoncé → case. Gabarit 2 : énoncé → nombre. Gabarit 3 : paire d'énoncés presque identiques qui diffèrent seulement par l'ordre (ou la remise).
- **Corrigé type** : « Un cadenas a 4 molettes de 0 à 9. Combien de codes ? »

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | L'ordre compte (1234 ≠ 4321) | Ordre ? |
  | 2 | Avec répétition (1111 est un code) | Remise ? |
  | 3 | 10⁴ = 10 000 | Case nᵏ, calculer |
- **Aides** : 1 « Échange deux éléments : obtiens-tu un autre résultat ? » · 2 « Peut-on choisir deux fois le même chiffre ? » · 3 la case.
- **Variantes d'examen** : `mcq` (les quatre formules ; chaque mauvaise case porte `g7_order_confusion` ou `g7_repetition_confusion`).
- **Pièges** : `g7_order_confusion`, `g7_repetition_confusion`.
- **Sous-buts → crédit** : calcul → `g7-perm-arr` ou `g7-combinations` selon la case.

### `g7-binomial` — Binôme de Newton
- **Année** 12 · **Prérequis** `g7-combinations`, `g5-sigma`, `@alg:C-identites` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:C-identites` : (a + b)² et (a − b)² sont les cas n = 2.
- **Intro** : (a + b)ⁿ = Σₖ₌₀ⁿ C(n, k)·aⁿ⁻ᵏ·bᵏ. Pour un terme précis : on écrit le terme général, avec **tous** ses facteurs (coefficients et signes de a et b), on cherche k qui donne la bonne puissance de x, puis on calcule.
- **Juge** : `equiv` `{vars:['x','k']}` pour le terme général ; `value` pour k et le coefficient · **Forme finale** : le coefficient (entier ou fraction).
- **Niveaux** :
  - L1 : terme général donné ; trous dans l'exposant de x et dans k.
  - L2 : terme général à trous (signe et puissance de 2) ; équation en k à écrire.
  - L3 : actions « terme général », « puissance de x », « équation en k », « coefficient ».
  - L4 : libre ; développement complet pour n ≤ 5.
  - L5 : terme indépendant de x, ou somme Σ C(n, k)·2ᵏ = 3ⁿ à reconnaître, sans aide.
- **Générateur** : (αx^p + β/x^q)ⁿ avec n ∈ [4 ; 10], α, β ∈ {±1, ±2, ±3}, p, q ∈ {1, 2} ; puissance demandée choisie pour que k soit entier dans [0 ; n] (on la tire à partir de k). 1 item sur 4 demande une puissance impossible (réponse 0). Gabarit 1 : coefficient de xᵐ. Gabarit 2 : terme indépendant. Gabarit 3 : développement complet.
- **Corrigé type** : coefficient de x⁴ dans (2x − 1/x)⁸.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | C(8, k)·(2x)^(8 − k)·(−1/x)^k = C(8, k)·2^(8 − k)·(−1)^k·x^(8 − 2k) | Terme général |
  | 2 | 8 − 2k = 4, donc k = 2 | Équation en k |
  | 3 | C(8, 2)·2⁶·(−1)² = 28·64 | Coefficient |
  | 4 | = 1792 | Calculer |
- **Aides** : 1 « Écris le terme général avec (2x) et (−1/x) entiers, signe compris. » · 2 « x^(8 − 2k) = x⁴, donc k = □ » · 3 « 28·64 = 1792 ».
- **Variantes d'examen** : `mcq` (distracteurs `g7_binomial_sign`, `g7_binomial_coef_power`, `g7_binomial_index`) ; `tf` (« Le coefficient de x³ dans (1 + x)⁵ est 5 » : faux, C(5, 3) = 10).
- **Pièges** : `g7_binomial_sign`, `g7_binomial_coef_power`, `g7_binomial_index`.
- **Sous-buts → crédit** : terme général → `g5-sigma` ; coefficient → `g7-combinations`.

### `g7-laplace` — Probabilité de Laplace
- **Année** 12 · **Prérequis** `g7-which-count` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `g7-which-count` : même modèle (ordre, remise) pour les cas favorables et possibles.
- **Intro** : si toutes les issues sont **équiprobables**, P(A) = (nombre de cas favorables)/(nombre de cas possibles). On compte les deux de la même façon (avec ou sans ordre, mais pareil en haut et en bas). P(non A) = 1 − P(A).
- **Juge** : `prob` `{symbols:{}}` (valeurs exactes avec `C(n, k)`) · **Forme finale** : fraction irréductible.
- **Niveaux** :
  - L1 : cas possibles donnés ; cas favorables à trous.
  - L2 : décision « compter avec ou sans ordre » ; les deux comptages à trous.
  - L3 : actions « cas possibles », « cas favorables », « diviser », « simplifier ».
  - L4 : libre.
  - L5 : « au moins un » par le complémentaire, sans aide.
- **Générateur** : urnes (r rouges, b bleues, r, b ∈ [2 ; 7]), tirages de k ∈ {2, 3} ; cartes (32 ou 36) ; dés (somme, double). Gabarit 1 : « exactement j rouges ». Gabarit 2 : cartes. Gabarit 3 : deux dés (piège de l'équiprobabilité des sommes).
- **Corrigé type** : on tire 3 boules parmi 5 rouges et 3 bleues. P(exactement 2 rouges) ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Cas possibles : C(8, 3) = 56 | Compter (sans ordre) |
  | 2 | Cas favorables : C(5, 2)·C(3, 1) = 10·3 = 30 | Compter (sans ordre) |
  | 3 | P = 30/56 = 15/28 | Diviser, simplifier |
- **Aides** : 1 « Compte sans ordre en haut et en bas. » · 2 « P = C(5, 2)·C(3, 1)/C(□, 3) » · 3 « 15/28 ».
- **Variantes d'examen** : `mcq` (distracteur `g7_laplace_not_equiprobable`).
- **Pièges** : `g7_laplace_not_equiprobable`, `g7_order_confusion`.
- **Sous-buts → crédit** : compter → `g7-combinations`.

### `g7-tree` — Arbres de probabilité
- **Année** 12 · **Prérequis** `g7-laplace` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `g7-laplace` : probabilité de chaque branche par équiprobabilité.
- **Intro** : on multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement. Sans remise, les probabilités du 2e niveau **changent** (il reste une boule de moins). Les branches issues d'un même nœud ont une somme 1. Prépare Bayes (module P).
- **Juge** : `prob` · **Forme finale** : fraction irréductible.
- **Niveaux** :
  - L1 : arbre dessiné ; probabilités des branches à trous.
  - L2 : arbre à compléter ; décision « quels chemins ? ».
  - L3 : actions « 1er niveau », « 2e niveau », « multiplier », « additionner les chemins ».
  - L4 : libre.
  - L5 : trois tirages, ou « sachant que » lu sur l'arbre (passerelle vers `P`), sans aide.
- **Générateur** : urne de r et b boules (r + b ≤ 10), 2 tirages avec ou sans remise (moitié-moitié) ; événement « même couleur », « au moins une rouge », « la 2e est rouge ». Gabarit 1 : sans remise. Gabarit 2 : avec remise. Gabarit 3 : test (malade, positif) avec des pourcentages ronds.
- **Corrigé type** : urne de 3 rouges et 2 bleues, deux tirages sans remise. P(même couleur) ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | P(RR) = 3/5 · 2/4 = 6/20 | Chemin RR (sans remise) |
  | 2 | P(BB) = 2/5 · 1/4 = 2/20 | Chemin BB |
  | 3 | P = 6/20 + 2/20 = 8/20 = 2/5 | Additionner les chemins |
- **Aides** : 1 « Multiplie le long d'un chemin, additionne les chemins. » · 2 « P(RR) = 3/5 · □/4 » · 3 « 2/5 ».
- **Variantes d'examen** : `mcq` (distracteur `g7_tree_with_replacement`).
- **Pièges** : `g7_tree_with_replacement`.
- **Sous-buts → crédit** : chemins → `g7-tree`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g7_add_instead_multiply` | proba | E | `g7-mult-principle` | `g7-mult-principle` | 26 + 26 + 9 + 10 + 10 → 26·26·9·10·10 | Remplace chaque × entre facteurs de comptage par + (et inversement entre des cas disjoints). | « Pour chaque choix de la 1re case, il y a … choix pour la 2e : on multiplie. On n'additionne que des cas qui s'excluent. » |
| `g7_constraint_ignored` | proba | E | `g7-mult-principle` | `g7-mult-principle` | 26²·10³ → 26²·9·10² | `wrongValues` : le comptage sans la contrainte de l'énoncé. | « Le premier chiffre ne peut pas être 0 : il n'y a que 9 choix dans cette case. » |
| `g7_factorial_quotient` | rule | E | `g7-perm-arr` | `g7-perm-arr` | (n + 1)!/(n − 1)! = (n + 1)/(n − 1) → n(n + 1) | Simplifie a!/b! en a/b (ou en (a − b)!). | « (n + 1)! = (n + 1)·n·(n − 1)! : après simplification il reste n(n + 1). Les factorielles ne se divisent pas comme des fractions. » |
| `g7_anagram_repeats` | proba | E | `g7-perm-arr` | `g7-perm-arr` | RADAR : 5! = 120 → 30 | `wrongValues` : n! sans diviser par les factorielles des lettres répétées ; et en divisant par une seule. | « Échanger les deux R donne le même mot : chaque anagramme est comptée 2!·2! = 4 fois dans 5!. » |
| `g7_order_confusion` | proba | R | `g7-which-count` | `g7-which-count` | comité : A(7, 3) = 210 → C(7, 3) = 35 | `wrongValues` : A(n, k) à la place de C(n, k) et l'inverse (pour chaque facteur du produit). Source : Batanero, Godino & Navarro-Pelayo (1997), « erreur d'ordre ». | « Dans un comité, {Ana, Bea, Carl} et {Carl, Ana, Bea} sont le même comité. A(7, 3) compte chaque comité 3! = 6 fois. » |
| `g7_repetition_confusion` | proba | R | `g7-which-count` | `g7-which-count` | code : A(10, 4) → 10⁴ | `wrongValues` : nᵏ ↔ A(n, k), et C(n, k) ↔ C(n + k − 1, k). Source : Batanero, Godino & Navarro-Pelayo (1997), « erreur de répétition ». | « 1111 est un code valable : on peut reprendre le même chiffre. Chaque molette a 10 choix, donc 10⁴. » |
| `g7_binomial_sign` | sign | E | `g7-binomial` | `g7-binomial` | +1792 avec (−1)^k oublié → selon k | Supprime le facteur (−1)^k du terme général ; ou le met toujours à −1. | « b = −1/x : son signe est dans (−1/x)^k = (−1)^k·x^(−k). Avec k = …, le signe est … . » |
| `g7_binomial_coef_power` | rule | E | `g7-binomial` | `g7-binomial` | C(8, 2) = 28 → 28·2⁶ | Remplace (αx)^(n − k) par x^(n − k) (le coefficient α n'est pas élevé à la puissance). | « (2x)⁶ = 2⁶·x⁶ = 64x⁶ : le 2 est aussi élevé à la puissance 6. » |
| `g7_binomial_index` | rule | E | `g7-binomial` | `g7-binomial` | « 3e terme » avec k = 3 → k = 2 | `wrongValues` : le coefficient obtenu avec k ± 1. | « Le terme général commence à k = 0 : le 3e terme a k = 2. » |
| `g7_laplace_not_equiprobable` | proba | R | `g7-laplace` | `g7-laplace` | P(somme 7) = 1/11 → 6/36 | `wrongValues` : 1/(nombre de valeurs possibles) quand les valeurs ne sont pas équiprobables. Source : Lecoutre (1992), biais d'équiprobabilité. | « Les 11 sommes de 2 à 12 ne sont pas également probables : 7 s'obtient de 6 façons sur 36, 2 d'une seule. Compte les couples (dé 1, dé 2). » |
| `g7_tree_with_replacement` | proba | E | `g7-tree` | `g7-tree` | 3/5·3/5 sans remise → 3/5·2/4 | Remplace les probabilités du 2e niveau par celles du 1er niveau. | « Sans remise, après une rouge il reste 2 rouges sur 4 boules : la 2e branche vaut 2/4, pas 3/5. » |

## Exemples de type examen

Pas de problème long : au CMS, la combinatoire est évaluée en questions courtes à l'intérieur d'autres problèmes, et en BA3 (module P) elle sert d'outil. Les variantes `mcq` et `tf` des compétences ci-dessus alimentent la section « dénombrement » du plan `ba3-proba`. Le problème type de probabilité (cartes, « exactement 2 dames ») est dans le catalogue P.

---

# G8. Nombres complexes

Unité `complexes` · préfixe `g8-` · pièges `g8_` · Statut : à faire

**Sources** : MAN, Math 1A (examen 2017 : polynôme réel avec une racine complexe, rapport et angle dans le plan complexe, équation du 2e degré à coefficients complexes) ; CMS, Analyse II, séries 14 à 16, 19 et 21 (forme algébrique, carré parfait, module et argument, forme trigonométrique, lieux, triangle équilatéral, polynômes complexes, sin i et cos i).
**Notation** : i est l'unité imaginaire (l'item déclare `complex: true`). Conjugué `z̄` (touche `conj`). Module `|z|`, argument `arg z` dans ]−π ; π] (une valeur dans [0 ; 2π[ est acceptée et ramenée). Forme exponentielle `r·e^(iθ)` ; forme trigonométrique `r(cos θ + i sin θ)` acceptée. Point du plan d'affixe z = x + iy : (x ; y).
**Prérequis extérieurs** : `@alg:C-identites`, `@alg:E-systemes-2x2`, `@alg:H-discriminant`, `@alg:M-pythagore` (réparation seulement), `g0-long-div`, `g3-exact`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g0-long-div`, `g3-exact`, `g4-bisectors`, `g10-circle-eq`.

**Juge `complex` : extensions utilisées ici.** `form` vaut `'algebraic'` (a + bi, a et b simplifiés), `'exponential'` (r·e^(iθ), r > 0), ou `'set'` (liste de n valeurs, ordre libre, pour les racines n-ièmes et les solutions d'équations). Le README ne nomme pas ces formes ; elles sont à fixer en U4. Pour les lieux, le juge `geom` reçoit `complexVar:'z'` : une ligne en z (|z − 2i| = |z + 4|) est traduite en x, y par z = x + iy avant la comparaison.

## Compétences

### `g8-algebraic` — Forme algébrique : opérations, conjugué, module, division
- **Année** 12 · **Prérequis** `@alg:C-identites` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on calcule comme avec des polynômes en i, puis i² = −1. Puissances de i : cycle de 4 (i, −1, −i, 1). Conjugué de a + bi : a − bi. |a + bi| = √(a² + b²), et z·z̄ = |z|². Pour diviser, on multiplie en haut et en bas par le conjugué du dénominateur.
- **Juge** : `complex` `{form:'algebraic'}` · **Forme finale** : a + bi avec a, b rationnels simplifiés (b = 0 ou a = 0 acceptés sous forme courte).
- **Niveaux** :
  - L1 : développement écrit ; trous dans le remplacement i² = −1.
  - L2 : décision « multiplier par le conjugué » pour une division ; calcul à trous.
  - L3 : actions « développer », « i² = −1 », « regrouper », « conjugué du dénominateur », « module ».
  - L4 : libre.
  - L5 : CMS série 14 : expressions combinées et iⁿ pour n grand, sans aide.
- **Générateur** : z₁, z₂ avec parties entières dans [−5 ; 5], non nulles. Division : on part du quotient q (entiers) et du dénominateur d, on donne q·d / d. Module : parties formant un triplet pythagoricien (3 + 4i, 5 − 12i, 8 + 6i). Gabarit 1 : z₁·z₂ + z₃. Gabarit 2 : quotient. Gabarit 3 : iⁿ avec n ∈ [10 ; 2030].
- **Corrigé type** : (3 + 2i)(1 − 2i) + (−1 + i), puis (4 + 7i)/(2 + i).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 3 − 6i + 2i − 4i² − 1 + i | Développer |
  | 2 | = 3 − 6i + 2i + 4 − 1 + i | i² = −1 |
  | 3 | = 6 − 3i | Regrouper |
  | 4 | (4 + 7i)(2 − i)/((2 + i)(2 − i)) | Conjugué du dénominateur |
  | 5 | = (8 − 4i + 14i + 7)/5 = (15 + 10i)/5 = 3 + 2i | Calculer |
- **Aides** : 1 « Pour diviser, multiplie en haut et en bas par le conjugué du dénominateur. » · 2 « (4 + 7i)(□)/5 » · 3 « 3 + 2i ».
- **Variantes d'examen** : `mcq` (distracteurs `g8_i_squared`, `g8_div_componentwise`, `g8_modulus_no_square`) ; `tf` (« |z₁ + z₂| = |z₁| + |z₂| » : faux, contre-exemple z₁ = 1, z₂ = −1) ; `coef` (partie réelle).
- **Pièges** : `g8_i_squared`, `g8_div_componentwise`, `g8_modulus_no_square`.
- **Sous-buts → crédit** : développer → `@alg:C-identites`.

### `g8-polar` — Forme polaire et exponentielle
- **Année** 12 · **Prérequis** `g8-algebraic`, `g3-exact` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-algebraic` : module r = |z| et parties a, b.
- **Intro** : z = r·e^(iθ) = r(cos θ + i sin θ), avec r = |z|. On trouve θ avec cos θ = a/r **et** sin θ = b/r (les deux, pour le bon quadrant). arctan(b/a) ne suffit pas quand a < 0. e^(iθ)·e^(iφ) = e^(i(θ + φ)).
- **Juge** : `complex` `{form:'exponential'}` ; segments `value` pour r et θ · **Forme finale** : r·e^(iθ) avec r > 0 et θ exact.
- **Niveaux** :
  - L1 : r donné ; cos θ et sin θ à trous.
  - L2 : décision « quel quadrant ? » ; θ à trous.
  - L3 : actions « module », « cos θ et sin θ », « quadrant », « θ », « forme exponentielle » (et le sens inverse).
  - L4 : libre, dans les deux sens.
  - L5 : CMS série 15 : z = (1 + i·tan α)/(1 − i·tan α) en fonction de α, sans aide.
- **Générateur** : r ∈ {1, 2, 3, 4, √2, 2√2, 2√3} et θ parmi les multiples de π/6 et π/4 dans ]−π ; π] ; on donne a + bi exact. 1 item sur 3 dans le sens inverse. Gabarit 1 : algébrique → exponentielle. Gabarit 2 : exponentielle → algébrique. Gabarit 3 : produit et quotient sous forme exponentielle.
- **Corrigé type** : z = −1 + i√3.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | r = √(1 + 3) = 2 | Module |
  | 2 | cos θ = −1/2, sin θ = √3/2 | cos et sin |
  | 3 | 2e quadrant : θ = 2π/3 | Quadrant, angle |
  | 4 | z = 2e^(i2π/3) | Forme exponentielle |
- **Aides** : 1 « Le signe de a et celui de b disent le quadrant. » · 2 « cos θ = −1/2 et sin θ > 0 : θ = □ » · 3 « 2e^(i2π/3) ».
- **Variantes d'examen** : `mcq` (distracteur `g8_arg_quadrant`) ; `tf` (« arg(−1 − i) = π/4 » : faux, −3π/4) ; `coef` (θ).
- **Pièges** : `g8_arg_quadrant`.
- **Sous-buts → crédit** : cos et sin → `g3-exact`.

### `g8-moivre` — Puissances par la formule de Moivre
- **Année** 12 · **Prérequis** `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : (r·e^(iθ))ⁿ = rⁿ·e^(inθ). On met z sous forme exponentielle, on élève **le module et l'argument**, puis on ramène l'argument dans ]−π ; π] et on revient à la forme algébrique.
- **Juge** : `complex` `{form:'algebraic'}` (la forme exponentielle est une étape) · **Forme finale** : a + bi.
- **Niveaux** :
  - L1 : forme exponentielle donnée ; rⁿ et nθ à trous.
  - L2 : réduction de l'argument à trous.
  - L3 : actions « forme exponentielle », « élever », « réduire l'argument », « forme algébrique ».
  - L4 : libre (le calcul direct par le binôme est accepté s'il est juste).
  - L5 : CMS série 14 : (1 + i)⁹/(1 − i)⁷, ou « pour quels n zⁿ est réel ? », sans aide.
- **Générateur** : z de module √2, 2 ou 1 et d'argument multiple de π/4 ou π/6 ; n ∈ [5 ; 12] ; on rejette si |zⁿ| > 1024. Gabarit 1 : zⁿ. Gabarit 2 : quotient de deux puissances. Gabarit 3 : n tel que zⁿ soit réel positif.
- **Corrigé type** : (−1 + i)¹⁰.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | −1 + i = √2·e^(i3π/4) | Forme exponentielle |
  | 2 | (−1 + i)¹⁰ = (√2)¹⁰·e^(i30π/4) = 32·e^(i15π/2) | Élever module et argument |
  | 3 | 15π/2 − 8π = −π/2 | Réduire l'argument |
  | 4 | = 32·e^(−iπ/2) = −32i | Forme algébrique |
- **Aides** : 1 « Passe en forme exponentielle : la puissance multiplie l'argument. » · 2 « (√2)¹⁰ = □ » · 3 « −32i ».
- **Variantes d'examen** : `mcq` (distracteur `g8_moivre_modulus`) ; `tf` (« (1 + i)⁴ est réel » : vrai, −4) ; `coef` (partie imaginaire).
- **Pièges** : `g8_moivre_modulus`, `g8_arg_quadrant`.
- **Sous-buts → crédit** : forme exponentielle → `g8-polar`.

### `g8-nth-roots` — Racines n-ièmes
- **Année** 12.5 · **Prérequis** `g8-moivre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-moivre` : zⁿ en forme exponentielle par Moivre.
- **Intro** : zⁿ = w avec w = ρ·e^(iφ) : |z| = ρ^(1/n) et arg z = φ/n + 2kπ/n, pour k = 0, …, n − 1. Il y a **n** racines, aux sommets d'un polygone régulier centré en 0.
- **Juge** : `complex` `{form:'set', count:n}` ; segments `value` pour le module et les arguments · **Forme finale** : les n racines (forme algébrique si les valeurs sont remarquables, sinon exponentielle).
- **Niveaux** :
  - L1 : w sous forme exponentielle ; formule à trous.
  - L2 : liste des k à compléter.
  - L3 : actions « forme exponentielle de w », « module des racines », « arguments », « forme algébrique », « contrôle ».
  - L4 : libre ; esquisse du polygone (`plot` `task:'point'`).
  - L5 : z⁴ = −8 + 8i√3, ou une équation qui se ramène à zⁿ = w, sans aide.
- **Générateur** : n ∈ {2, 3, 4, 6}, |w| = ρ parfait à la puissance n (1, 8, 16, 27, 64), arg w multiple de π/2, π/3 ou π/4 choisi pour que φ/n soit un angle remarquable. Gabarit 1 : zⁿ = w. Gabarit 2 : racines de l'unité. Gabarit 3 : (z − a)ⁿ = w.
- **Corrigé type** : z³ = −8i.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | −8i = 8e^(−iπ/2) | Forme exponentielle de w |
  | 2 | \|z\| = 2, arg z = −π/6 + 2kπ/3, k = 0, 1, 2 | Module et arguments |
  | 3 | z₀ = 2e^(−iπ/6) = √3 − i | k = 0 |
  | 4 | z₁ = 2e^(iπ/2) = 2i | k = 1 |
  | 5 | z₂ = 2e^(i7π/6) = −√3 − i | k = 2 |
  | 6 | Contrôle : (2i)³ = 8i³ = −8i | Contrôle |
- **Aides** : 1 « Il y a 3 racines, d'arguments espacés de 2π/3. » · 2 « arg z = −π/6 + 2kπ/□ » · 3 les trois racines.
- **Variantes d'examen** : `mcq` (distracteurs `g8_roots_spacing`, `g8_roots_only_one`) ; `tf` (« z⁴ = 1 a 2 solutions dans ℂ » : faux, 4 : ±1, ±i) ; `open`.
- **Pièges** : `g8_roots_spacing`, `g8_roots_only_one`.
- **Sous-buts → crédit** : forme exponentielle → `g8-polar` ; forme algébrique → `g3-exact`.

### `g8-sqrt-alg` — Racine carrée sous forme algébrique
- **Année** 12.5 · **Prérequis** `g8-algebraic`, `@alg:E-systemes-2x2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-algebraic` : développer (x + iy)² et calculer un module.
- **Intro** : on cherche z = x + iy avec z² = a + bi. Trois équations : x² − y² = a, 2xy = b, et x² + y² = |a + bi|. Les deux premières et la troisième donnent x² et y². Le signe de xy est celui de b : il reste **deux** racines opposées. On n'écrit pas √(a + bi) : le symbole √ est réservé aux réels positifs.
- **Juge** : `equiv` pour le système ; `complex` `{form:'set', count:2}` pour les racines · **Forme finale** : ±(x + iy).
- **Niveaux** :
  - L1 : système écrit ; x² et y² à trous.
  - L2 : système à trous ; décision « signes de x et y ».
  - L3 : actions « poser z = x + iy », « parties réelle et imaginaire », « module », « x² et y² », « signes ».
  - L4 : libre.
  - L5 : enchaîné avec `g8-quadratic`.
- **Générateur** : on part de z = x + iy avec x, y entiers non nuls dans [−6 ; 6], on donne z². Gabarit 1 : racines carrées de w. Gabarit 2 : « résoudre z² = w ». Gabarit 3 : w imaginaire pur (x = ±y).
- **Corrigé type** : racines carrées de −5 + 12i.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x + iy)² = −5 + 12i ⇔ x² − y² = −5 et 2xy = 12 | Parties réelle et imaginaire |
  | 2 | x² + y² = \|−5 + 12i\| = 13 | Module |
  | 3 | x² = 4, y² = 9 | Résoudre |
  | 4 | xy = 6 > 0 : z = ±(2 + 3i) | Signes |
- **Aides** : 1 « Ajoute l'équation des modules : x² + y² = |w|. » · 2 « x² = (−5 + 13)/2 = □ » · 3 « ±(2 + 3i) ».
- **Variantes d'examen** : `mcq` (distracteur `g8_sqrt_signs`) ; `tf` (« −5 + 12i a quatre racines carrées : ±2 ± 3i » : faux, (2 − 3i)² = −5 − 12i).
- **Pièges** : `g8_sqrt_signs`, `g8_sqrt_symbol_complex`.
- **Sous-buts → crédit** : résoudre → `@alg:E-systemes-2x2`.

### `g8-quadratic` — Équation du 2e degré à coefficients complexes
- **Année** 12.5 · **Prérequis** `g8-sqrt-alg`, `@alg:H-discriminant` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ est **une** racine carrée de Δ (par `g8-sqrt-alg`). Contrôle : z₁ + z₂ = −b/a et z₁z₂ = c/a.
- **Juge** : par segments : `complex` pour Δ, `complex` `{form:'set', count:2}` pour δ (±), `complex` `{form:'set', count:2}` pour les racines · **Forme finale** : les deux racines sous forme algébrique.
- **Niveaux** :
  - L1 : Δ calculé ; δ et la formule à trous.
  - L2 : Δ à trous ; décision « diviser d'abord par a » ou « formule directe » (les deux `good`).
  - L3 : actions « Δ », « racine carrée de Δ », « formule », « simplifier les divisions », « contrôle par Viète ».
  - L4 : libre.
  - L5 : MAN 2017 Q6 avec d'autres nombres (voir E6), sans aide.
- **Générateur** : à l'envers : racines z₁, z₂ à parties entières dans [−3 ; 3], coefficient dominant a ∈ {1, 1 + i, 2, i, 1 − i} ; on développe a(z − z₁)(z − z₂). On rejette si Δ est réel négatif (cas du gymnase) dans plus de 1 item sur 5. Gabarit 1 : a = 1. Gabarit 2 : a complexe. Gabarit 3 : coefficients réels avec Δ < 0 (racines conjuguées).
- **Corrigé type** : z² − (3 + i)z + 4 + 3i = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Δ = (3 + i)² − 4(4 + 3i) = 8 + 6i − 16 − 12i = −8 − 6i | Discriminant |
  | 2 | δ² = −8 − 6i : x² − y² = −8, 2xy = −6, x² + y² = 10 : δ = 1 − 3i | Racine carrée de Δ |
  | 3 | z = ((3 + i) ± (1 − 3i))/2 | Formule |
  | 4 | z₁ = 2 − i, z₂ = 1 + 2i | Simplifier |
  | 5 | z₁ + z₂ = 3 + i ; z₁z₂ = 4 + 3i | Contrôle par Viète |
- **Aides** : 1 « Même formule que dans ℝ ; la racine de Δ se trouve avec x + iy. » · 2 « z = ((3 + i) ± (□))/2 » · 3 « 2 − i et 1 + 2i ».
- **Variantes d'examen** : `mcq` (distracteurs `g8_sqrt_symbol_complex`, `g8_i_squared`) ; `coef` (partie réelle d'une racine) ; `open` (E6).
- **Pièges** : `g8_sqrt_symbol_complex`, `g8_i_squared`, `g8_div_componentwise`.
- **Sous-buts → crédit** : racine carrée de Δ → `g8-sqrt-alg` ; formule → `@alg:H-discriminant`.

### `g8-poly` — Polynômes complexes, théorème fondamental, racines conjuguées
- **Année** 12.5 · **Prérequis** `g8-quadratic`, `g0-long-div` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-quadratic` : racines des facteurs du 2e degré.
- **Intro** : un polynôme de degré n a n racines dans ℂ, comptées avec multiplicité. Si ses coefficients sont **réels**, la conjuguée d'une racine est aussi racine, et (z − w)(z − w̄) = z² − 2Re(w)z + |w|² est un facteur réel. Si les coefficients ne sont pas réels, cette règle ne vaut pas.
- **Juge** : `poly` `{v:'x'}` (division, identité) ; `complex` `{form:'set'}` pour les racines ; `equiv` pour le polynôme final · **Forme finale** : polynôme développé, ou liste des racines.
- **Niveaux** :
  - L1 : facteur quadratique réel donné ; condition sur le reste à trous.
  - L2 : facteur à construire à trous ; décision « la conjuguée est-elle racine ? ».
  - L3 : actions « racine conjuguée », « facteur réel », « troisième facteur », « condition », « développer ».
  - L4 : libre.
  - L5 : MAN 2017 Q4 modifiée ; ou CMS série 19 : équation dont on sait qu'elle a une racine imaginaire pure, sans aide.
- **Générateur** : racine w = p + qi (p, q entiers, q ≠ 0, |p|, |q| ≤ 3), racine réelle r entière dans [−4 ; 4] ; condition donnée par P(x₀) = valeur (x₀ ∈ {−1, 1, 2}), calculée à partir de r. Gabarit 1 : polynôme unitaire de degré 3 avec une racine complexe et une condition. Gabarit 2 : toutes les racines connaissant une racine complexe. Gabarit 3 : coefficients non réels, une racine imaginaire pure à trouver.
- **Corrigé type** : P réel, unitaire, de degré 3, de racine 2 − i, et le reste de sa division par x − 1 vaut 4.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Coefficients réels : 2 + i est aussi racine | Racine conjuguée |
  | 2 | (x − (2 − i))(x − (2 + i)) = x² − 4x + 5 | Facteur réel |
  | 3 | P(x) = (x² − 4x + 5)(x − r) | Troisième facteur |
  | 4 | P(1) = 2(1 − r) = 4, donc r = −1 | Condition (reste = P(1)) |
  | 5 | P(x) = x³ − 3x² + x + 5 | Développer |
- **Aides** : 1 « Pour un polynôme réel, la conjuguée d'une racine est racine. » · 2 « (x − 2)² + 1 = x² − 4x + □ » · 3 « P(x) = (x² − 4x + 5)(x + 1) ».
- **Variantes d'examen** : `mcq` (distracteurs `g8_conj_root_nonreal`, `g0_conj_missing`) ; `tf` (« Si i est racine de P, alors −i aussi » : faux, contre-exemple P(z) = z − i) ; `open`.
- **Pièges** : `g0_conj_missing`, `g8_conj_root_nonreal`.
- **Sous-buts → crédit** : condition → `g0-long-div` (théorème du reste).

### `g8-locus` — Lieux dans le plan complexe
- **Année** 12.5 · **Prérequis** `g8-algebraic`, `g4-bisectors`, `g10-circle-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-algebraic` : écrire |z − a| en x et y.
- **Intro** : on pose z = x + iy et on traduit. |z − a| = |z − b| : médiatrice de [AB]. |z − a| = r : cercle. |z − a| = k|z − b| (k ≠ 1) : cercle (d'Apollonius). Re, Im, et z·z̄ = x² + y² donnent des droites et des cercles. On peut souvent lire le lieu sans calcul.
- **Juge** : `geom` `{object:'line2'|'circle', complexVar:'z'}` · **Forme finale** : équation cartésienne et nom du lieu.
- **Niveaux** :
  - L1 : lecture géométrique proposée en QCM (médiatrice, cercle, droite) ; équation à trous.
  - L2 : traduction en x, y à trous.
  - L3 : actions « poser z = x + iy », « module au carré », « développer », « reconnaître ».
  - L4 : libre.
  - L5 : CMS série 16 : z(z̄ − 3) < 6Re(z) + 3z̄ + 5 (région, `plot` `task:'region'`), ou un cercle d'Apollonius, sans aide.
- **Générateur** : points A, B d'affixes entières dans [−6 ; 6]² ; k ∈ {2, 3} pour Apollonius (centre et rayon calculés, gardés si rationnels) ; inégalités qui donnent un disque ou un demi-plan. Gabarit 1 : médiatrice. Gabarit 2 : cercle. Gabarit 3 : région.
- **Corrigé type** : |z − 2i| = |z + 4|.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Points équidistants de A(0 ; 2) et B(−4 ; 0) : médiatrice de [AB] | Lecture géométrique |
  | 2 | x² + (y − 2)² = (x + 4)² + y² | Module au carré |
  | 3 | −4y + 4 = 8x + 16 | Développer |
  | 4 | 2x + y + 3 = 0 | Équation du lieu |
- **Aides** : 1 « |z − a| est la distance de z au point d'affixe a. » · 2 « |z + 4| = |z − (□)| » · 3 « 2x + y + 3 = 0 ».
- **Variantes d'examen** : `mcq` (distracteur `g8_locus_sign`) ; `tf` (« |z − 1| = 2|z + 1| est une droite » : faux, c'est un cercle) ; `open`.
- **Pièges** : `g8_locus_sign`, `g8_modulus_no_square`.
- **Sous-buts → crédit** : lecture géométrique → `g4-bisectors` ; cercle → `g10-circle-eq`.

### `g8-ratio-angle` — Rapport de longueurs et angle par un quotient
- **Année** 12.5 · **Prérequis** `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : avec A, B, C d'affixes a, b, c : q = (c − a)/(b − a). |q| = AC/AB, et arg q est l'angle orienté de AB⃗ vers AC⃗. q réel : A, B, C alignés. q = e^(±iπ/3) : triangle équilatéral.
- **Juge** : `complex` `{form:'algebraic'}` pour q ; `value` pour |q| et arg q · **Forme finale** : rapport et angle.
- **Niveaux** :
  - L1 : q écrit ; division à trous.
  - L2 : décision « (c − a)/(b − a) ou (b − a)/(c − a) ? » selon l'angle demandé.
  - L3 : actions « différences », « quotient », « module », « argument », « interpréter ».
  - L4 : libre.
  - L5 : CMS série 16 : troisième sommet d'un triangle équilatéral d'orientation positive, sans aide.
- **Générateur** : a entier, b − a entier non nul, q choisi dans {1 + i, 2i, 1 − i, √3 + i, (1 + i√3)/2, 2, −1 + i…}, c = a + q(b − a) (on garde si c est entier, ou à coordonnées en ℚ(√3) pour l'équilatéral). Gabarit 1 : rapport et angle. Gabarit 2 : alignement. Gabarit 3 : triangle équilatéral.
- **Corrigé type** : a = 1 + i, b = 5 + 3i, c = 3 + 7i.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | c − a = 2 + 6i, b − a = 4 + 2i | Différences |
  | 2 | q = (2 + 6i)/(4 + 2i) = (2 + 6i)(4 − 2i)/20 = (20 + 20i)/20 = 1 + i | Quotient |
  | 3 | \|q\| = √2 : AC/AB = √2 | Rapport |
  | 4 | arg q = π/4 : angle (AB⃗, AC⃗) = π/4 | Angle |
- **Aides** : 1 « Le quotient (c − a)/(b − a) contient le rapport (module) et l'angle (argument). » · 2 « q = (2 + 6i)(□)/20 » · 3 « q = 1 + i ».
- **Variantes d'examen** : `mcq` (distracteur `g8_ratio_order`) ; `tf` (« Si (c − a)/(b − a) est imaginaire pur, l'angle en A est droit » : vrai) ; `open`.
- **Pièges** : `g8_ratio_order`, `g8_div_componentwise`.
- **Sous-buts → crédit** : quotient → `g8-algebraic` ; argument → `g8-polar`.

### `g8-transform` — Translations, rotations, homothéties, similitudes
- **Année** 12.5 · **Prérequis** `g8-algebraic`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : z ↦ z + b : translation. z ↦ az + b avec a ≠ 1 : similitude de centre ω (ω = aω + b), de rapport |a| et d'angle arg a ; c'est une rotation si |a| = 1, une homothétie si a est réel. Écrire une rotation de centre ω et d'angle θ : z′ − ω = e^(iθ)(z − ω).
- **Juge** : `complex` pour ω, a, b ; `value` pour le rapport et l'angle ; `equiv` `{vars:['z'], complex:true}` pour l'expression de la transformation · **Forme finale** : nature, centre, rapport, angle (ou l'expression z′ = …).
- **Niveaux** :
  - L1 : équation du point fixe écrite ; résolution à trous.
  - L2 : décision « translation / rotation / homothétie / similitude » à partir de a.
  - L3 : actions « point fixe », « |a| », « arg a », « nommer » (et le sens inverse : écrire z′).
  - L4 : libre, dans les deux sens.
  - L5 : composée de deux transformations, ou image d'une figure, sans aide.
- **Générateur** : a dans {i, −1, 2, 1 + i, √3 + i, −2i, (1 + i)/2…}, ω à parties entières, b = ω − aω. Gabarit 1 : z ↦ az + b → éléments. Gabarit 2 : éléments → z′ = …. Gabarit 3 : composée.
- **Corrigé type** : z ↦ (1 + i)z + 2 − i.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ω = (1 + i)ω + 2 − i ⇔ −iω = 2 − i | Point fixe |
  | 2 | ω = (2 − i)/(−i) = (2 − i)·i = 1 + 2i | Résoudre |
  | 3 | \|1 + i\| = √2, arg(1 + i) = π/4 | Rapport, angle |
  | 4 | Similitude de centre 1 + 2i, de rapport √2 et d'angle π/4 | Nommer |
- **Aides** : 1 « Le centre est le point fixe : résous ω = aω + b. » · 2 « −iω = 2 − i, donc ω = □ » · 3 « ω = 1 + 2i ».
- **Variantes d'examen** : `mcq` (distracteur `g8_rotation_about_origin`) ; `tf` (« z ↦ iz + 1 est une rotation de centre 0 » : faux, son centre est (1 + i)/2) ; `open`.
- **Pièges** : `g8_rotation_about_origin`.
- **Sous-buts → crédit** : résoudre → `g8-algebraic` ; rapport et angle → `g8-polar`.

### `g8-inversion` — Inversion z ↦ 1/z̄ et z ↦ 1/z
- **Année** 12.5 · **Prérequis** `g8-locus` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g8-locus` : image d'une droite ou d'un cercle : traduire en x et y.
- **Intro** : z ↦ 1/z̄ est l'inversion de centre 0 et de rayon 1 : même argument, module inversé. z ↦ 1/z la compose avec la symétrie par rapport à l'axe réel. Image d'une droite ou d'un cercle : on pose w = 1/z̄, donc z = 1/w̄, et on remplace dans l'équation du lieu. Une droite qui ne passe pas par 0 devient un cercle qui passe par 0 (privé de 0).
- **Juge** : `geom` `{object:'circle'|'line2', complexVar:'w'}` · **Forme finale** : équation de l'image, nature, et le point exclu.
- **Niveaux** :
  - L1 : z = 1/w̄ écrit ; substitution à trous.
  - L2 : décision « image : droite ou cercle ? » avant le calcul.
  - L3 : actions « exprimer z en w », « remplacer », « multiplier par |w|² », « reconnaître », « point exclu ».
  - L4 : libre.
  - L5 : image d'un cercle qui passe par 0 (une droite), sans aide.
- **Générateur** : droites Re z = k ou Im z = k (k ∈ {±1, ±2, ±1/2}), droites ax + by = c ; cercles passant ou non par 0, de centre et rayon entiers. Gabarit 1 : droite → cercle. Gabarit 2 : cercle par 0 → droite. Gabarit 3 : image d'un point.
- **Corrigé type** : image de la droite Re z = 1 par w = 1/z̄.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | z = 1/w̄ = w/\|w\|² | Exprimer z en w |
  | 2 | Re z = u/(u² + v²) = 1, avec w = u + iv | Remplacer |
  | 3 | u² + v² − u = 0 | Multiplier par \|w\|² |
  | 4 | Cercle de centre 1/2 et de rayon 1/2, privé de 0 | Reconnaître, point exclu |
- **Aides** : 1 « Exprime z en fonction de w, puis remplace dans Re z = 1. » · 2 « u/(u² + v²) = 1, donc u² + v² = □ » · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (distracteur `g8_inversion_conj`) ; `open`.
- **Pièges** : `g8_inversion_conj`.
- **Sous-buts → crédit** : reconnaître → `g10-circle-eq`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g8_i_squared` | sign | E | `g8-algebraic` | `g8-algebraic` | −4i² = −4 → +4 | Dans `prev`, remplace chaque i² par 1 (et i³ par i, i⁴ par 1). | « i² = −1, donc −4i² = −4·(−1) = +4. » |
| `g8_div_componentwise` | rule | E | `g8-algebraic` | `g8-algebraic` | (4 + 7i)/(2 + i) = 2 + 7i → 3 + 2i | Remplace (a + bi)/(c + di) par a/c + (b/d)i. | « On ne divise pas partie par partie. Contrôle : (2 + 7i)(2 + i) = −3 + 16i ≠ 4 + 7i. Multiplie par le conjugué 2 − i. » |
| `g8_modulus_no_square` | rule | E | `g8-algebraic` | `@alg:M-pythagore` | \|3 + 4i\| = 7 → 5 | `wrongValues` : a + b, \|a\| + \|b\|, √(a + b), √(a² − b²). | « Le module est une longueur : Pythagore donne √(3² + 4²) = 5. » |
| `g8_arg_quadrant` | geometry | E | `g8-polar` | `g8-polar` | arg(−1 + i√3) = −π/3 → 2π/3 | `wrongValues` : arctan(b/a) sans correction de quadrant. | « arctan(b/a) donne un angle de ]−π/2 ; π/2[. Ici a < 0 : le point (−1 ; √3) est dans le 2e quadrant, donc θ = arctan(b/a) + π = 2π/3. » |
| `g8_moivre_modulus` | rule | E | `g8-moivre` | `g8-moivre` | (√2·e^(i3π/4))¹⁰ = √2·e^(i30π/4) → 32·e^(i30π/4) | Élève l'argument mais garde le module tel quel (ou le multiplie par n). | « On élève **tout** z à la puissance 10 : le module devient (√2)¹⁰ = 32. » |
| `g8_roots_spacing` | rule | E | `g8-nth-roots` | `g8-nth-roots` | arg = −π/6 + 2kπ → −π/6 + 2kπ/3 | Utilise φ/n + 2kπ (une seule racine répétée) ou (φ + 2kπ) sans diviser 2kπ par n. | « Les racines sont espacées de 2π/n = 2π/3. Avec + 2kπ, tu retrouves trois fois la même racine. » |
| `g8_roots_only_one` | method | E | `g8-nth-roots` | `g8-nth-roots` | z³ = −8i : z = 2i seulement → trois racines | `wrongValues` : la seule racine k = 0 (ou la racine « évidente »). | « Une équation zⁿ = w a n solutions dans ℂ. Il en manque … . » |
| `g8_sqrt_signs` | sign | E | `g8-sqrt-alg` | `g8-sqrt-alg` | ±2 ± 3i (4 valeurs) → ±(2 + 3i) | `wrongValues` : les quatre combinaisons de signes, ou un couple de signes contraires. | « 2xy = 12 > 0 : x et y ont le même signe. (2 − 3i)² = −5 − 12i, ce n'est pas une racine. » |
| `g8_sqrt_symbol_complex` | notation | E | `g8-quadratic` | `g8-sqrt-alg` | √(−8 − 6i) = i√(8 + 6i) → δ = 1 − 3i | Remplace √Δ par i√(−Δ) comme si Δ était un réel négatif. | « La règle √(−a) = i√a ne vaut que pour a réel positif. Ici Δ = −8 − 6i n'est pas réel : cherche δ = x + iy avec δ² = Δ. » |
| `g8_conj_root_nonreal` | method | E | `g8-poly` | `g8-poly` | « i racine de z − i, donc −i aussi » → non | `wrongValues` : la conjuguée ajoutée aux racines d'un polynôme à coefficients non réels. | « La règle de la conjuguée demande des coefficients **réels**. Ici le coefficient … n'est pas réel : vérifie P(…) = … ≠ 0. » |
| `g8_locus_sign` | sign | E | `g8-locus` | `g8-locus` | \|z + 4\|² = (x − 4)² + y² → (x + 4)² + y² | Dans la traduction en x, y, remplace |z + a| par la distance au point d'affixe +a au lieu de −a. | « \|z + 4\| = \|z − (−4)\| : c'est la distance au point (−4 ; 0). » |
| `g8_ratio_order` | geometry | E | `g8-ratio-angle` | `g8-ratio-angle` | angle (AB⃗, AC⃗) = −π/4 → π/4 | Calcule (b − a)/(c − a) au lieu de (c − a)/(b − a) : rapport inversé, angle opposé. | « (c − a)/(b − a) mesure l'angle **de** AB⃗ **vers** AC⃗. Ton quotient inversé donne le rapport AB/AC = 1/√2 et l'angle opposé. » |
| `g8_rotation_about_origin` | geometry | E | `g8-transform` | `g8-transform` | z′ = e^(iθ)z + ω → z′ − ω = e^(iθ)(z − ω) | Pour une rotation de centre ω, produit z′ = e^(iθ)z + ω (ou e^(iθ)(z + ω)). | « Avec ta formule, le point ω n'est pas fixe : e^(iθ)ω + ω ≠ ω. On tourne z − ω, puis on rajoute ω. » |
| `g8_inversion_conj` | rule | E | `g8-inversion` | `g8-inversion` | w = 1/z̄ traité comme 1/z | Résout avec z = 1/w au lieu de z = 1/w̄ : l'image est symétrique par rapport à l'axe réel. | « 1/z̄ et 1/z sont symétriques par rapport à l'axe réel. Pour w = 1/z̄, z = 1/w̄. Ici, la différence change … . » |

## Exemples de type examen

### E6. Équation du 2e degré à coefficients complexes (d'après MAN Math 1A, 2017, Q6, 7 points)

Donner, sous forme algébrique simplifiée, les racines de P(z) = (1 + i)z² + (3 − i)z − (2 + 4i).

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| 1. Discriminant | Δ = (3 − i)² + 4(1 + i)(2 + 4i) = (8 − 6i) + 4(−2 + 6i) = 18i | 2 | `g8-quadratic` |
| 2. Racine carrée de Δ | x² − y² = 0, 2xy = 18, x² + y² = 18 : δ = ±(3 + 3i) | 2 | `g8-sqrt-alg` |
| 3. Formule | z = (−(3 − i) ± (3 + 3i))/(2(1 + i)) | 1 | `g8-quadratic` |
| 4. Simplifier | z₁ = 4i/(2 + 2i) = 1 + i ; z₂ = (−6 − 2i)/(2 + 2i) = −2 + i | 2 | `g8-algebraic` |

`points: [[1, 1], [1, 1], [1], [1, 1]]`. Contrôle accepté à la place d'une étape de simplification : z₁ + z₂ = −(3 − i)/(1 + i) = −1 + 2i.
