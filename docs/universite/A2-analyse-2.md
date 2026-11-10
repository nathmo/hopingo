# A2. Analyse II

Extensions du §16 utilisées : §16.1 intégrales dans `evalFloat`, complexes partout ; §16.2 `limit` à deux variables (lignes `path` et `bound`), `system` (∇f = 0, Lagrange), `ode` (lignes implicites, forme séparée, substitution), `series` à deux variables (Taylor d'ordre 2), `solset` ; §16.3 contre-exemples (bibliothèque K1 à K7), `domain` avec `typeI3`, `cyl`, `sph`, `matrix` à cases symboliques (hessienne, jacobienne), `plot` ; §16.4 familles nouvelles (`calculus`, `linear`, `logic`, `geometry`), tag C (distracteurs des QCM officiels), réparation dans un autre module, pièges partagés (réutilise `a1_arc_length_no_sqrt`, `a1_ftc_no_chain`, `l_compose_order` ; `a2_jacobian_transposed` sert aussi en N).

Unité `analyse2` · préfixe `a2-` · pièges `a2_` · Statut : à faire

**Sources** :
- Analyse II (MATH-106), cours de T. Mountford (2022), qui suit les notes de J. Stubbe ; cours de P. Wittwer (2017 à 2019) ;
- séries et QCM hebdomadaires (2015 à 2022), série de révision 2018 ;
- tests intermédiaires (2016 à 2022) ;
- examens 2014 à 2021. De 2019 à 2021, le format est fixe : 144 minutes, 18 QCM (+3/0/−1) et 10 vrai/faux (+1/0/−1), sans partie ouverte ;
- fiche « Fonctions de plusieurs variables » (limites, chemins, contre-exemples) ;
- J. Douchet, *Analyse, recueil d'exercices et aide-mémoire*, vol. 2 (ℝⁿ, limites, dérivées partielles, fonctions implicites, formes différentielles, intégrales multiples) ;
- organigramme personnel « type d'équation différentielle » : séparable → linéaire du 1er ordre → ordre n à coefficients constants. Il devient la compétence `a2-ode-choose`.

**Notation** :
- Variables `x, y, z` ; paramètre `t` ; dérivées partielles `∂f/∂x` ou `f_x` (les deux sont acceptées en saisie, `f_x` à l'affichage des indications) ; dérivée directionnelle `D_v f(a)` ; gradient `∇f` ; matrice jacobienne `J_f` ; matrice hessienne `Hess f` (affichage `H_f`).
- Le cours définit la dérivée directionnelle pour tout v ≠ 0 par `lim_{t→0} (f(a + tv) − f(a))/t`, sans normer v. Les examens donnent toujours un v unitaire. L'app suit le cours et donne v unitaire par défaut.
- Coordonnées polaires `(r, φ)`, `x = r cos φ`, `y = r sin φ`, `dx dy = r dr dφ`. La fonction composée s'écrit `f̃(r, φ) = f(r cos φ, r sin φ)`, comme dans les examens.
- Cylindriques `(r, φ, z)`, `dV = r dr dφ dz`. Sphériques `(r, θ, φ)` avec **θ ∈ [0 ; π] mesuré depuis l'axe z** et φ ∈ [0 ; 2π[ : `x = r sin θ cos φ`, `y = r sin θ sin φ`, `z = r cos θ`, `dV = r² sin θ dr dθ dφ`.
- `Log` ou `ln` ; `Arctg` ou `arctan` ; `tg` ou `tan` (les examens écrivent tg). Intervalles `]a ; b[`.
- EDO : la variable est `x` (ou `t` si l'énoncé le dit). Les constantes sont `C`, `C₁`, `C₂`. Une solution générale d'ordre n a exactement n constantes.
- Domaines : `D` dans les variables d'origine, `D̃` dans les nouvelles variables, comme dans les examens.

**Prérequis extérieurs** :
- A1 : `a1-int-direct`, `a1-int-rational`, `a1-ftc`, `a1-improper-calc`, `a1-improper-compare`, `a1-int-applications`, `a1-dl-usual`, `a1-dl-ops`, `a1-dl-compose`, `a1-fn-extension`, `a1-fn-limits`, `a1-seq-squeeze`, `a1-seq-monotone`, `a1-deriv-rules`, `a1-param-curve`, `a1-fn-ivt`, `a1-extrema-global`.
- L : `l-mat-product`, `l-det-cofactor`, `l-eig-charpoly`, `l-eig-space`, `l-sym-orthodiag`, `l-sym-quadform`, `l-eig-diag`, `l-vec-indep`.
- G : `g1-bound`, `g2-hyp-def`, `g3-identities`, `g4-plane`, `g4-dot`, `g6-deriv-rules`, `g6-deriv-implicit`, `g8-polar`, `g9-counterexample`, `g10-circle-eq`.
- Plan d'algèbre : `@alg:E-systemes-2x2`, `@alg:H-discriminant`, `@alg:D-trinome`, `@alg:G-simplifier`, `@alg:I-parametres`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-counterexample`, `g1-bound`, `g2-hyp-def`, `g3-identities`, `g4-dot`, `g4-line3`, `g4-plane`, `g10-circle-eq`, `g6-deriv-implicit`, `g6-deriv-rules`, `g8-polar`, `a1-deriv-def`, `a1-dl-compose`, `a1-dl-ops`, `a1-extrema-global`, `a1-fn-extension`, `a1-fn-limits`, `a1-ftc`, `a1-improper-calc`, `a1-int-applications`, `a1-int-direct`, `a1-int-rational`, `a1-param-curve`, `a1-seq-limsup`, `a1-seq-squeeze`, `l-det-cofactor`, `l-eig-charpoly`, `l-eig-diag`, `l-mat-product`, `l-sym-quadform`, `l-vec-indep`.

**Lignes d'étape propres à A2.** Le README ne les couvre pas encore. Chaque entrée renvoie ici, et l'étape U6 les construit :
1. **Chemin** (`path`). La ligne `y = φ(x)` (ou `(x, y) = γ(t)`) choisit un chemin vers le point. Elle est juste si γ(t) → a quand t → 0 et si γ(t) ≠ a pour t ≠ 0. La ligne suivante, « f(x, φ(x)) = … », est jugée par `equiv` à une variable, puis par `limit`.
2. **Majoration** (`bound`). La ligne `|f(x, y) − L| ≤ g(r)` est jugée par échantillonnage : 400 points (r, φ) dans ]0 ; 0,5] × [0 ; 2π[. La ligne est juste si l'inégalité tient partout (marge relative 1e−9) **et** si `limit(g, r, 0⁺) = 0`. Si g dépend encore de φ, la réponse est `stay` : « Ta borne dépend encore de φ : majore |cos φ| et |sin φ| par 1. »
3. **Système** (`system`). Les lignes « ∇f = 0 » et « ∇f = λ∇g, g = 0 » sont comparées par l'ensemble fini des solutions réelles. Le générateur le connaît, puisqu'il a choisi les points d'abord. Une ligne de cas, « x = 0 ou y = 2λ », est juste si l'union des sous-systèmes a les mêmes solutions. Une ligne qui perd des solutions est `wrong` ; le diagnostic essaie alors `a2_crit_divide` et `a2_lagrange_divide`.
4. **Relation implicite d'EDO** (`ode`, extension). Une ligne `H(x, y) = C` est juste si `H_x + H_y·f(x, y) ≡ 0` (`equiv` en x, y, sur le domaine de l'item). La ligne séparée `P(y) dy = Q(x) dx` est juste si `Q(x)/P(y) ≡ f(x, y)`. La ligne `∫ P(y) dy = ∫ Q(x) dx` est jugée comme deux primitives (`antideriv`, une constante suffit).
5. **Domaine en coordonnées** (`domain`, extension de `answerShape`). En plus de `typeI`, `typeII` et `polar`, on ajoute `typeI3` (bornes de z, puis de y, puis de x), `cyl` et `sph`. Le juge échantillonne la région dans les deux systèmes (500 points) et compare l'appartenance.

## Compétences

Ordre du parcours (les compétences peu présentes dans les cours sont marquées *opt.* ; l'étiquette est informative, elles sont obligatoires comme les autres) :

| Bloc | Compétences |
|---|---|
| ℝⁿ et courbes | `a2-rn-topology`, `a2-rn-boundary`, `a2-rn-sequences`, `a2-curve-param`, `a2-curve-length` |
| Limites et continuité | `a2-lim-paths`, `a2-lim-polar`, `a2-continuity`, `a2-compact-extreme` |
| Différentiabilité | `a2-partials`, `a2-dir-deriv-def`, `a2-diff-def`, `a2-diff-implications`, `a2-tangent-graph`, `a2-tangent-level`, `a2-chain`, `a2-chain-polar`, `a2-laplacian-radial`, `a2-taylor2`, `a2-implicit-2var`, `a2-implicit-3var` |
| Extrema | `a2-crit-points`, `a2-hessian-2x2`, `a2-hessian-3x3`, `a2-extrema-compact`, `a2-lagrange`, `a2-lagrange-3d` |
| Intégrales à paramètre | `a2-param-int`, `a2-param-int-bounds` |
| Intégrales multiples | `a2-fubini-rect`, `a2-domain-describe`, `a2-fubini-swap`, `a2-triple-int`, `a2-change-var`, `a2-polar-int`, `a2-cyl-sph`, `a2-improper-multi`, `a2-volume`, `a2-mass-center` (*opt.*) |
| EDO | `a2-ode-cauchy`, `a2-ode-separable`, `a2-ode-linear1`, `a2-ode-homog-subst`, `a2-ode-structure`, `a2-ode-const2`, `a2-ode-wronskian`, `a2-ode-particular`, `a2-ode-choose`, `a2-ode-stability`, `a2-ode-subst-other` (*opt.*), `a2-ode-exact` (*opt.*), `a2-ode-system` (*opt.*) |

Le poids d'examen (`examWeight`) vient du décompte des examens 2019, 2020 et 2021 (84 questions) : 3 pour un thème posé chaque année, parfois deux fois ; 2 pour un thème posé deux années sur trois ; 1 sinon ; 0 pour les compétences étiquetées *opt.* et absentes des examens, que le mode examen ne tire jamais.

---

### `a2-rn-topology` — Ouvert, fermé, borné, compact
- **Année** 14 · **Prérequis** `g10-circle-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g10-circle-eq` : disques et boules (x − a)² + (y − b)² < r².
- **Intro** : Un ensemble défini par des inégalités **larges** entre fonctions continues est fermé. Avec des inégalités **strictes**, il est ouvert. Avec un mélange, il n'est en général ni l'un ni l'autre. On vérifie d'abord si une inégalité est toujours vraie : elle ne compte alors pas. Borné : contenu dans une boule. Compact : fermé **et** borné. Les normes ‖·‖₁, ‖·‖₂ et ‖·‖∞ donnent les mêmes ouverts.
  Exemple : `E = {(x, y, z) : x² + y² ≤ 4, z > 0}` — note « ≤ seul donnerait un fermé ; z > 0 rend le bord z = 0 absent » ; `(1, 0, 0) ∈ ∂E mais ∉ E` — note « donc E n'est pas fermé » ; `(2, 0, 1) ∈ E ∩ ∂E` — note « donc E n'est pas ouvert » ; `z` libre vers +∞ — note « non borné ».
- **Juge** : pas de ligne de calcul. Item `mcq` « plusieurs » à quatre cases : ouvert, fermé, borné, compact. L'item est juste si les quatre cases sont justes. Contrôle : la vérité est calculée par le générateur à partir des atomes (voir Générateur), puis confirmée par échantillonnage du bord (points de ∂E dans E ou pas). · **Forme finale** : les quatre cases.
- **Niveaux** :
  - L1 (guidé) : l'ensemble est dessiné (`plot`, `task:'region'`, bord plein ou pointillé). Les atomes sont déjà classés « large » ou « strict ». L'élève coche.
  - L2 : dessin, mais les atomes ne sont pas classés. Une ligne `rule` : « Pourquoi n'est-il pas fermé ? » (un point du bord manque / une inégalité stricte / non borné).
  - L3 (choisir l'action) : sans dessin. L'élève choisit pour chaque atome : « large », « stricte », « toujours vraie », « jamais vraie ». Puis il coche.
  - L4 (libre) : intersections et unions de deux ensembles (A ∩ B, comme en 2021), dans ℝ² ou ℝ³. Il coche et donne un point de ∂E \ E s'il dit « pas fermé » (`example`).
  - L5 (seul) : 4 ensembles de suite, format examen, sans aide.
- **Générateur** : on part de la réponse (O, F, B, C). Un ensemble est une conjonction de 1 à 3 atomes `g(x) ⋄ c`, avec ⋄ ∈ {<, ≤, >, ≥} et g dans une liste : x² + y², x² + y² + z², |x| + |y|, max(|x|, |y|), ax + by + cz, x² − y², xy, z − x² − y². Pour chaque atome, on connaît : le type (ouvert ou fermé), « borne les variables {…} » (par exemple x² + y² ≤ 4 borne x et y, pas z), et la vacuité ou la trivialité selon c. Règles : ouvert si tous les atomes non triviaux sont stricts ; fermé s'ils sont tous larges ; sinon « ni l'un ni l'autre », **après** vérification par échantillonnage qu'un point du bord manque et qu'un autre est présent (sinon on rejette le tirage). Borné si chaque variable est bornée par un atome. Un atome trivial (« 1 ≥ −25x² − 15y² ») est glissé dans 30 % des items de L3 et plus. Gabarits : « E = {…} est : » (cases) ; « A ∩ B est : » ; « Pour a < −16, l'ensemble {1 ≥ −25x² − 15y² > a} est ouvert. V/F ». Cas exclus : ensemble vide, ou ℝⁿ entier. Secours : `{x² + y² ≤ 1} ⊂ ℝ³` (fermé, non borné).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Atome 1 : x² + y² ≤ 4, large ; il borne x et y | `atoms` |
  | 2 | Atome 2 : z > 0, strict ; il ne borne pas z par le haut | `atoms` |
  | 3 | Point (2, 0, 1) : dans E et sur le bord, donc E n'est pas ouvert | `witness` |
  | 4 | Point (0, 0, 0) : sur le bord, pas dans E, donc E n'est pas fermé | `witness` |
  | 5 | z peut être aussi grand qu'on veut, donc E n'est pas borné ; ni fermé ni borné, donc pas compact | `bounded` |
- **Aides** : 1 « Classe chaque inégalité : large, stricte, ou toujours vraie. » · 2 « Un point du bord qui manque : (…, …, 0). Un point du bord qui est dans E : (2, 0, …). » · 3 La ligne 3 ou 4 entière.
- **Variantes d'examen** : `mcq` (les 4 phrases « ouvert », « borné », « fermé », « non borné » de 2021 ; distracteurs : `a2_topo_not_open_closed`, `a2_topo_trivial_atom`, `a2_topo_cylinder`). `tf` : « {x² + y² ≤ 1, x ≠ 0} est fermé » (F : (0, 1/2) est un point du bord qui manque) ; « {1 ≥ −25x² − 15y² > a} est ouvert pour a < −16 » (V : la première inégalité est toujours vraie) ; « L'intersection de deux fermés est fermée » (V).
- **Pièges** : `a2_topo_not_open_closed`, `a2_topo_trivial_atom`, `a2_topo_cylinder`.
- **Sous-buts → crédit** : `atoms` → `a2-rn-topology` ; `witness` → `a2-rn-boundary` ; `bounded` → `a2-rn-topology`.

### `a2-rn-boundary` — Intérieur, adhérence, bord
- **Année** 14 · **Prérequis** `a2-rn-topology` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-rn-topology` : ouverts, fermés et boules.
- **Intro** : x est dans le bord ∂E si chaque boule autour de x touche E **et** le complémentaire de E. Intérieur : E sans son bord. Adhérence : E avec son bord. Un point isolé de E est dans le bord. Les phrases « ∂(A ∪ B) = ∂A ∪ ∂B » et « E ⊂ F ⇒ ∂E ⊂ ∂F » sont fausses.
  Exemple : `E = {1 < x² + y² ≤ 4} ∪ {(3, 0)}` ; `∂E = {r = 1} ∪ {r = 2} ∪ {(3, 0)}` — note « le point isolé est dans le bord » ; `int E = {1 < r < 2}` ; `adh E = {1 ≤ r ≤ 2} ∪ {(3, 0)}`.
- **Juge** : `plot` `{task:'region'}` pour dessiner ∂E (morceaux de courbes et points), comparé par échantillonnage : 300 points près de chaque morceau attendu et de chaque morceau dessiné. Les ensembles écrits sont comparés par `solset` à deux variables, avec le même échantillonnage. Vrai/faux : type `tf`. · **Forme finale** : ∂E, int E, adh E.
- **Niveaux** :
  - L1 (guidé) : E dessiné ; l'élève touche les morceaux du bord dans une liste.
  - L2 : E dessiné ; il trace ∂E sur le repère.
  - L3 (choisir l'action) : E donné par des inégalités ; pour 4 points, il choisit « intérieur », « bord et dans E », « bord, hors de E », « extérieur ».
  - L4 (libre) : il écrit ∂E, int E et adh E.
  - L5 (seul) : 3 vrai/faux sur les opérations (union, inclusion, complémentaire), avec contre-exemple.
- **Générateur** : réponse d'abord. On choisit 1 à 3 morceaux : un anneau, un disque, un demi-plan, un segment, un point isolé ; chacun ouvert, fermé ou mixte. ∂E est l'union des bords des morceaux, moins les parties intérieures quand deux morceaux se touchent. On rejette les tirages où deux morceaux se chevauchent partiellement, parce que ∂E serait difficile à décrire. Rayons entiers de 1 à 4. Gabarits : « Dessine ∂E » ; « Le point P est-il dans ∂E ? ». Secours : `E = ]0 ; 1] × [0 ; 1[`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Cercle r = 1 : chaque boule touche E (r un peu plus grand) et le complémentaire | `bd-piece` |
  | 2 | Cercle r = 2 : idem | `bd-piece` |
  | 3 | (3, 0) : chaque boule le contient (il est dans E) et touche le complémentaire | `bd-isolated` |
  | 4 | ∂E = {r = 1} ∪ {r = 2} ∪ {(3, 0)} | `bd-final` |
- **Aides** : 1 « Pour chaque morceau, regarde ses bords, puis les points isolés. » · 2 « ∂E = {r = …} ∪ {r = …} ∪ … » · 3 La ligne 4.
- **Variantes d'examen** : `tf` : « E ⊂ F ⇒ ∂E ⊂ ∂F » (F : E = ]0 ; 1[, F = ]−1 ; 2[, 0 ∈ ∂E mais 0 ∉ ∂F) ; « ∂(A ∪ B) = ∂A ∪ ∂B » (F : dans ℝ², A = [0 ; 1] × [0 ; 1] et B = [1 ; 2] × [0 ; 1] ; le point (1, 1/2) est dans ∂A, mais il est intérieur à A ∪ B) ; « ∂E est fermé » (V). `mcq` : « Lequel des points est dans ∂E ? ».
- **Pièges** : `a2_bd_union`, `a2_bd_isolated`.
- **Sous-buts → crédit** : `bd-piece`, `bd-isolated`, `bd-final` → `a2-rn-boundary`.

### `a2-rn-sequences` — Suites et sous-suites dans ℝⁿ
- **Année** 14 · **Prérequis** `a1-seq-limsup`, `g3-identities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-seq-limsup` : sous-suites et Bolzano-Weierstrass à une variable.
- **Intro** : Une suite de ℝⁿ converge si et seulement si **chaque composante** converge. Une suite bornée a une sous-suite convergente (Bolzano-Weierstrass). Pour une sous-suite a_{pk+q}, on remplace n par pk + q dans chaque composante et on simplifie avec la période.
  Exemple : `aₙ = ((−1)ⁿ, cos(nπ/3))` ; `a_{3k} = ((−1)^k, cos(kπ)) = ((−1)^k, (−1)^k)` — note « diverge » ; `(−1)^k·a_{3k} = (1, 1)` — note « converge vers (1, 1) ».
- **Juge** : `equiv` `{vars:['k'], domain:{k:'entiers 0..40'}}` pour chaque composante simplifiée (comparaison sur les 41 premiers entiers, en exact quand c'est possible), puis `mcq` « converge / diverge ». · **Forme finale** : composantes sans n, puis décision.
- **Niveaux** :
  - L1 (guidé) : les valeurs de cos(nπ/2) sont données dans un tableau sur une période ; l'élève remplit la sous-suite.
  - L2 : il complète la ligne « a_{4k+1} = (…, …) ».
  - L3 (choisir l'action) : il choisit « composante constante », « alterne », « oscille » pour chaque composante.
  - L4 (libre) : il écrit la sous-suite simplifiée et décide.
  - L5 (seul) : QCM à 4 sous-suites (format 2021).
- **Générateur** : composantes dans {cos(nπ/p), sin(nπ/p), (−1)ⁿ, 1/n, n/(n + 1)} avec p ∈ {2, 3, 4, 6}. Sous-suites a_{pk+q} et (−1)^k·a_{pk+q}. On calcule la limite sur k = 0..40 (on part de la réponse : on choisit d'abord quelle option converge, puis on rejette les tirages où 0 ou plus de 1 option convergent). Secours : celui de 2021, `(cos(nπ/2), sin(nπ/4))`, option `(−1)^k a_{4k+1}`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | a_{3k} = ((−1)^{3k}, cos(3kπ/3)) | `subst` |
  | 2 | = ((−1)^k, (−1)^k) : diverge | `simplify` |
  | 3 | (−1)^k·a_{3k} = (1, 1) : converge vers (1, 1) | `decide` |
- **Aides** : 1 « Remplace n par 3k, puis simplifie avec la période. » · 2 « cos(kπ) = (…)^k » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (format 2021 ; distracteurs : sous-suites voisines, `a2_seq_one_component`). `tf` : « Toute suite bornée de ℝ³ converge » (F : ((−1)ⁿ, 0, 0)) ; « Toute suite bornée de ℝ³ a une sous-suite convergente » (V).
- **Pièges** : `a2_seq_one_component`.
- **Sous-buts → crédit** : `subst`, `simplify` → `g3-identities` ; `decide` → `a2-rn-sequences`.

### `a2-curve-param` — Courbes paramétrées dans ℝ³ : continuité, tangente, courbe lisse
- **Année** 14 · **Prérequis** `a1-param-curve`, `g4-line3` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-param-curve` : courbes planes paramétrées et leur tangente ; `g4-line3` : la tangente γ(t₀) + s·γ′(t₀) est une droite paramétrique.
- **Intro** : γ : I → ℝⁿ est continue (dérivable) si chaque composante l'est. γ′(t) est tangent à la courbe ; la courbe est lisse si γ′(t) ≠ 0. Tangente en t₀ : `γ(t₀) + s·γ′(t₀)`. Un facteur discontinu ne rend pas forcément la composante discontinue : sign(t)·(eᵗ − 1) est continue.
  Exemple : `γ(t) = (t cos t, t sin t, t)` ; `γ′(t) = (cos t − t sin t, sin t + t cos t, 1)` ; `‖γ′(t)‖² = t² + 2 ≠ 0` — note « lisse » ; tangente en t = π : `(−π, 0, π) + s(−1, −π, 1)`.
- **Juge** : `equiv` `{vars:['t'], domain:{t:[-3,3]}}` composante par composante pour γ′ ; `geom` `{object:'line3'}` pour la tangente ; `mcq` pour la reconnaissance d'un dessin (2016) ou d'une discontinuité (2020). · **Forme finale** : γ′ en t₀, droite tangente.
- **Niveaux** :
  - L1 (guidé) : γ′ à trous, une composante à la fois.
  - L2 : γ′ entier, puis le point γ(t₀).
  - L3 (choisir l'action) : « Quelle courbe correspond au dessin ? » parmi 4 paramétrisations (hélice, ellipse, rayon variable).
  - L4 (libre) : tangente et caractère lisse ; continuité d'une courbe définie avec sign(t) ou |t|.
  - L5 (seul) : QCM « laquelle a un point de discontinuité ? » (format 2020).
- **Générateur** : composantes dans {t, t², a cos(bt), a sin(bt), t cos t, eᵗ, sign(t)·g(t) avec g(0) = 0 ou g(0) ≠ 0, |t|, e^{1/(t − c)}}. On choisit d'abord la composante discontinue (sign(t)·cos t en 0, e^{1/(t − 2)} si 2 ∈ I) pour le QCM, et les trois autres sont continues. t₀ ∈ {0, π/2, π, 1}. Secours : l'hélice `(cos t, sin t, t)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | γ′(t) = (cos t − t sin t, sin t + t cos t, 1) | `deriv` |
  | 2 | γ(π) = (−π, 0, π), γ′(π) = (−1, −π, 1) | `evaluate` |
  | 3 | Tangente : (−π, 0, π) + s(−1, −π, 1) | `tangent` |
- **Aides** : 1 « Dérive chaque composante. » · 2 « γ′(π) = (cos π − π sin π, …, 1) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (dessin 2016, discontinuité 2020 ; distracteurs : `a2_curve_sign_factor`). `tf` : « Si chaque composante est continue, γ est continue » (V).
- **Pièges** : `a2_curve_sign_factor`.
- **Sous-buts → crédit** : `deriv` → `g6-deriv-rules` ; `evaluate`, `tangent` → `a2-curve-param`.

### `a2-curve-length` — Longueur d'arc
- **Année** 14 · **Prérequis** `a2-curve-param`, `a1-int-applications` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-int-applications` : longueur d'arc d'une courbe plane.
- **Intro** : `L = ∫_a^b ‖γ′(t)‖ dt`. Le calcul n'est possible que si ‖γ′‖² est un carré parfait ou une constante : on cherche ce carré.
  Exemple : `γ(t) = (2t, t², ln t)`, t ∈ [1 ; e] ; `γ′ = (2, 2t, 1/t)` ; `‖γ′‖² = 4 + 4t² + 1/t² = (2t + 1/t)²` ; `L = ∫₁^e (2t + 1/t) dt = e²`.
- **Juge** : `equiv` `{vars:['t'], domain:{t:[a,b]}}` pour γ′ et ‖γ′‖ (la racine d'un carré est acceptée sous la forme |…| ou sans valeur absolue si le signe est constant sur [a ; b]) ; `definite` `{value}` pour L. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : γ′ donné ; à trous : ‖γ′‖² puis le carré.
  - L2 : l'élève reconnaît le carré (choix parmi 3 formes).
  - L3 (choisir l'action) : « ‖γ′‖ = … » à choisir (le carré, la somme des composantes, le carré de la norme), puis l'intégrale.
  - L4 (libre) : tout le calcul.
  - L5 (seul) : longueur d'une hélice ou d'une cycloïde, sans aide.
- **Générateur** : familles à vitesse « belle » : hélice `(a cos t, a sin t, bt)` avec (a, b, c) pythagoricien (vitesse c) ; `k(2t, t², ln t)` (vitesse k(2t + 1/t)) ; `(eᵗ cos t, eᵗ sin t, eᵗ)` (vitesse √3 eᵗ) ; cycloïde `a(t − sin t, 1 − cos t)` (vitesse 2a|sin(t/2)|) ; astroïde `(cos³t, sin³t)` (3|sin t cos t|, sur [0 ; π/2]) ; `(t², t³)` (t√(4 + 9t²)). Bornes choisies pour que la primitive tombe sur des valeurs exactes (ln aux puissances de e, cos aux multiples de π/2). Secours : hélice (3, 4, 5) sur [0 ; 2π], L = 10π.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | γ′(t) = (2, 2t, 1/t) | `deriv` |
  | 2 | ‖γ′‖² = 4 + 4t² + 1/t² = (2t + 1/t)² | `square` |
  | 3 | L = ∫₁^e (2t + 1/t) dt | `setup` |
  | 4 | = [t² + ln t]₁^e = e² | `integrate` |
- **Aides** : 1 « Longueur = intégrale de la norme de la vitesse. » · 2 « ‖γ′‖² = (2t + …)² » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_arc_length_no_sqrt`, `a2_arc_sum_components`). `tf` : « La longueur ne dépend pas de la paramétrisation » (V, pour une paramétrisation injective et régulière).
- **Pièges** : `a1_arc_length_no_sqrt`, `a2_arc_sum_components`.
- **Sous-buts → crédit** : `deriv` → `a2-curve-param` ; `square` → `@alg:G-simplifier` ; `integrate` → `a1-int-direct`.

### `a2-lim-paths` — Limite qui n'existe pas : deux chemins
- **Année** 14 · **Prérequis** `a1-fn-limits`, `@alg:G-simplifier` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a1-fn-limits` : limite à une variable le long d'un chemin.
- **Intro** : Si deux chemins vers a donnent deux limites différentes, la limite n'existe pas. **Les droites ne suffisent pas** : si le numérateur et le dénominateur ont des poids différents en x et en y, on essaie y = k·x^p, avec p choisi pour que les termes du dénominateur aient le même ordre.
  Exemple : `f(x, y) = 3x²y/(x⁴ + 2y²)` ; droites `y = mx` : `3m x³/(x⁴ + 2m²x²) = 3mx/(x² + 2m²) → 0` ; chemin `y = x²` : `3x⁴/(3x⁴) = 1` — note « deux valeurs : 0 et 1 » ; la limite n'existe pas.
- **Juge** : ligne `path` (voir « Lignes d'étape »), puis `equiv` à une variable `{vars:['x'], domain:{x:[-1,1]\{0}}}` pour f restreinte, puis `limit` `{v:'x', to:0}`. La décision finale « n'existe pas » demande **deux** lignes `path` dont les limites diffèrent. · **Forme finale** : « n'existe pas » avec deux chemins, ou un chemin dont la limite dépend de k (y = kx² donne 3k/(1 + 2k²)).
- **Niveaux** :
  - L1 (guidé) : les deux chemins sont donnés ; à trous : f restreinte et sa limite.
  - L2 : le premier chemin est donné ; le deuxième est à choisir parmi 3 (droite, y = x², y = x³).
  - L3 (choisir l'action) : décision « droites y = mx », « courbes y = kx^p (p = ?) », « polaires ». Le choix « polaires » est `quality:'poor'` : l'élève voit que la borne dépend de φ.
  - L4 (libre) : il choisit ses chemins et conclut.
  - L5 (seul) : QCM « vaut 0 / vaut 1 / vaut 1/2 / n'existe pas » mêlé à des fonctions dont la limite existe (`a2-lim-polar`).
- **Générateur** : on part de « n'existe pas ». Dénominateur `x^{2a} + c·y^{2b}`, avec a, b ∈ {1, 2, 3, 4}, a ≠ b dans 70 % des cas (sinon les droites suffisent), c ∈ {1, 2, 3}. Numérateur `K·x^i·y^j`, avec i/(2a) + j/(2b) = 1 (poids critique), K ∈ {1, 2, 3, 5}. Chemin révélateur : y = k·x^{a/b} si a/b est entier, sinon x = k·y^{b/a}. On calcule la limite le long des droites (souvent 0) et le long de la courbe : elle doit différer. Variante (2019 Q18) : somme d'un terme critique homogène de degré 0 et d'un terme qui tend vers 0, comme (x³y − 3xy³ + x⁵)/(x² + y²)². Gabarits : « Calcule la limite » (QCM) ; « Montre que la limite n'existe pas ». Secours : `x²y/(x⁴ + y²)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Chemin y = mx | `path` |
  | 2 | f(x, mx) = 3mx/(x² + 2m²) → 0 | `restrict` |
  | 3 | Chemin y = x² | `path-curve` |
  | 4 | f(x, x²) = 3x⁴/(x⁴ + 2x⁴) = 1 → 1 | `restrict` |
  | 5 | 0 ≠ 1 : la limite n'existe pas | `conclude` |
- **Aides** : 1 « Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁴ et y². » · 2 « Prends y = x^… : alors y² = x⁴. » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (2019 Q1 et Q18, 2020 Q3, 2021 Q3 ; distracteurs : `a2_lim_lines_only` donne la valeur des droites, `a2_lim_iterated` la limite itérée, `a2_lim_function_answer` une « limite » qui contient encore y, comme « = y² » en 2020). `tf` : « Si la limite le long de toute droite par l'origine vaut 2, la limite vaut 2 » (F : contre-exemple `2 + x²y/(x⁴ + y²)`, chemin y = x²) ; « Si lim_x lim_y f = lim_y lim_x f, la limite existe » (F : xy/(x² + y²)).
- **Pièges** : `a2_lim_lines_only`, `a2_lim_iterated`, `a2_lim_function_answer`.
- **Sous-buts → crédit** : `path`, `path-curve`, `conclude` → `a2-lim-paths` ; `restrict` → `@alg:G-simplifier`.

### `a2-lim-polar` — Limite qui existe : coordonnées polaires et gendarmes
- **Année** 14 · **Prérequis** `a1-seq-squeeze`, `g1-bound` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a1-seq-squeeze` : principe des gendarmes.
- **Intro** : On pose x = r cos φ, y = r sin φ. Si |f − L| ≤ g(r) avec g(r) → 0 et **g indépendante de φ**, la limite vaut L. Un équivalent à une variable aide : sin u ~ u, e^u − 1 ~ u, avec u = x² + y². Si l'expression polaire dépend encore de φ quand r → 0, la limite n'existe pas.
  Exemple : `f = (2x³ − xy² + y⁴)/(x² + y²)` ; `= r(2cos³φ − cos φ sin²φ) + r² sin⁴φ` ; `|f| ≤ 3r + r²` — note « |cos|, |sin| ≤ 1 » ; `→ 0`, donc `lim = 0`.
- **Juge** : `equiv` `{vars:['r','φ'], domain:{r:[0.01,1], φ:[0,6.28]}}` pour l'écriture polaire ; ligne `bound` (voir « Lignes d'étape ») ; `limit` `{v:'r', to:0, dir:'+'}`. · **Forme finale** : valeur de L, avec une ligne `bound` juste.
- **Niveaux** :
  - L1 (guidé) : l'écriture polaire est donnée ; à trous : la borne.
  - L2 : il écrit la forme polaire ; la borne est à choisir parmi 3 (une dépend de φ, une ne tend pas vers 0).
  - L3 (choisir l'action) : « polaires », « équivalent à une variable (u = x² + y²) », « deux chemins ». Si la limite n'existe pas et qu'il choisit les polaires, il doit reconnaître la dépendance en φ.
  - L4 (libre) : calcul complet, y compris les cas où la limite vaut 1 (sin(x² + y²)/(x² + y²)).
  - L5 (seul) : 4 limites au format QCM, mêlées à celles de `a2-lim-paths`.
- **Générateur** : on part de L ∈ {0, 1, 2, « n'existe pas »}. Pour L = 0 : numérateur homogène de degré d + 1 (ou plus) sur un dénominateur homogène défini positif de degré d (x² + y², x² + 2y², (x² + y²)²), coefficients entiers de −3 à 3. Pour L ≠ 0 : `sin(u)/u`, `(e^u − 1)/u`, `(1 − cos u)/u²` avec u = x² + y², plus éventuellement un terme qui tend vers 0. Pour « n'existe pas » : terme homogène de degré 0 qui dépend de φ (piège pour qui ne regarde que r). Contrainte : la borne naturelle (somme des |coefficients| fois r^k) suffit. Secours : `x³/(x² + y²)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f = (r³(2cos³φ − cos φ sin²φ) + r⁴ sin⁴φ)/r² | `polar` |
  | 2 | = r(2cos³φ − cos φ sin²φ) + r² sin⁴φ | `simplify` |
  | 3 | \|f\| ≤ r(2 + 1) + r² = 3r + r² | `bound` |
  | 4 | 3r + r² → 0, donc lim f = 0 | `squeeze` |
- **Aides** : 1 « Passe en polaires, puis majore tout ce qui dépend de φ par une constante. » · 2 « |f| ≤ (…)·r + r² » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_lim_polar_theta` donne 0 quand la limite n'existe pas, `a2_lim_lines_only`). `tf` : « Si pour tout φ, lim_{r→0} f(r cos φ, r sin φ) = 1 et f(0, 0) = 1, f est continue en (0, 0) » (F : `1 + x²y/(x⁴ + y²)`) ; « Si |f(x, y)| ≤ x² + y², alors f → 0 » (V).
- **Pièges** : `a2_lim_polar_theta`, `a2_lim_polar_r_forgot`, `a2_lim_lines_only`.
- **Sous-buts → crédit** : `polar`, `simplify` → `@alg:G-simplifier` ; `bound` → `g1-bound` ; `squeeze` → `a2-lim-polar`.

### `a2-continuity` — Continuité et prolongement par continuité
- **Année** 14 · **Prérequis** `a2-lim-polar`, `a1-fn-extension` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : f est continue en a si lim_{x→a} f(x) = f(a). Une fonction définie hors de a se prolonge par continuité si la limite en a existe ; on pose alors f(a) = cette limite. Les sommes, produits et compositions de fonctions continues sont continus ; seuls les points où la formule change sont à étudier.
  Exemple : `f(x, y) = sin(x² + y²)/(x² + y²)` si (x, y) ≠ (0, 0), `f(0, 0) = a` ; `u = x² + y² → 0`, `sin u/u → 1` ; `a = 1`.
- **Juge** : `limit` (via `a2-lim-polar` ou `a2-lim-paths`), puis `value` pour a. Pour « f est-elle continue sur ℝ² ? », `mcq`. · **Forme finale** : a, ou « impossible » avec deux chemins.
- **Niveaux** :
  - L1 (guidé) : la limite est à trous, a s'en déduit.
  - L2 : il calcule la limite ; il choisit a.
  - L3 (choisir l'action) : « Où faut-il étudier la continuité ? » (points où la formule change, points où le dénominateur s'annule).
  - L4 (libre) : fonctions par morceaux le long d'une droite (x = 0, comme en 2018 Q6) ou en un point.
  - L5 (seul) : QCM « f continue en (0, 0) / continue sauf en … » et vrai/faux.
- **Générateur** : on choisit d'abord la réponse (prolongeable ou non). Prolongeable : formules de `a2-lim-polar` avec L entier. Non prolongeable : formules de `a2-lim-paths`. Fonctions par morceaux sur une droite : `y/(2 + sin(1/x))` si x ≠ 0, 0 sinon (continue en (0, 0), pas en (0, 1)). Secours : `(x³ + y³)/(x² + y²)`, a = 0.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Hors de (0, 0), f est continue (quotient de fonctions continues, dénominateur ≠ 0) | `where` |
  | 2 | u = x² + y² → 0, sin u/u → 1 | `limit` |
  | 3 | a = 1 | `extend` |
- **Aides** : 1 « Calcule la limite en (0, 0) ; a doit lui être égal. » · 2 « Pose u = x² + y². » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2018 Q6). `tf` : « Si lim_{t→0} f(t cos θ, t sin θ) = 2 pour tout θ, f se prolonge par continuité » (F : `2 + x²y/(x⁴ + y²)`) ; « Si les fonctions partielles x ↦ f(x, 0) et y ↦ f(0, y) sont continues, f est continue en (0, 0) » (F : xy/(x² + y²)).
- **Pièges** : `a2_lim_lines_only`, `a2_cont_partial_functions`.
- **Sous-buts → crédit** : `where` → `a2-continuity` ; `limit` → `a2-lim-polar` ; `extend` → `a1-fn-extension`.

### `a2-compact-extreme` — Fonctions continues sur un compact (vrai/faux)
- **Année** 14 · **Prérequis** `a2-rn-topology`, `a2-continuity`, `g9-counterexample` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-rn-topology` : reconnaître un compact ; `a2-continuity` : vérifier la continuité de f.
- **Intro** : Une fonction continue sur un compact non vide est bornée et **atteint** son minimum et son maximum. Si en plus le compact est connexe par arcs, l'image est l'intervalle [m ; M]. Rien de cela ne vaut sur un ouvert ou un ensemble non borné. L'image d'un ouvert par une fonction continue n'est pas forcément ouverte.
  Exemple : `f(x, y) = 1/(x² + y²)` sur `D \ {(0, 0)}` — note « continue et non bornée : l'ensemble n'est pas fermé » ; `f = cos(cos(x − y²))` sur un compact — note « continue, donc elle atteint son max ».
- **Juge** : type `tf` avec `counter: {kind:'function'|'set', …}`. Le contre-exemple de l'élève (`example`) est vérifié numériquement : ensemble dans la bonne classe (échantillonnage), fonction continue sur un échantillon dense, et propriété contredite (sup non atteint sur une grille fine, image non ouverte…). · **Forme finale** : V/F, et un contre-exemple si F.
- **Niveaux** :
  - L1 (guidé) : énoncé et réponse donnés ; l'élève choisit l'hypothèse qui fait tout marcher (fermé, borné, continu).
  - L2 : V/F, avec trois contre-exemples proposés si F.
  - L3 (choisir l'action) : « Quelle hypothèse manque ? » parmi 4.
  - L4 (libre) : V/F, et il écrit le contre-exemple (fonction ou ensemble).
  - L5 (seul) : 5 V/F de suite au format examen.
- **Générateur** : banque d'énoncés paramétrés. On part de la vérité : on prend un théorème juste (vrai) ou on retire une hypothèse (faux). Ensembles tirés de `a2-rn-topology`. Énoncés : « continue sur D borné et fermé ⇒ atteint son minimum » (V) ; « continue sur D ouvert ⇒ non bornée » (F : constante) ; « continue sur D ouvert ⇒ bornée » (F : 1/x sur ]0 ; 1[) ; « il existe f continue non bornée sur le disque épointé » (V : 1/(x² + y²)) ; « f(U) ouvert si U ouvert » (F : f = 0) ; « image du disque fermé = [m ; M] » (V) ; « f de classe C² sur D borné fermé atteint son minimum absolu » (V). Secours : l'énoncé de 2020 Q23.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | « Soit D ouvert et f continue. Alors f est non bornée. » | — |
  | 2 | Hypothèse qui manquerait pour un théorème : aucune ; on cherche un contre-exemple | `hyp` |
  | 3 | f ≡ 0 sur D = ℝⁿ : continue, bornée. Donc FAUX | `counter` |
- **Aides** : 1 « Le théorème des bornes atteintes demande quoi sur D ? » · 2 « Essaie une fonction constante. » · 3 Ligne 3.
- **Variantes d'examen** : `tf` seulement (2016 Q10 ; 2019 Q24 ; 2020 Q23, Q25, Q26 ; 2021 Q20, Q22).
- **Pièges** : `a2_compact_open`, `a2_open_image`.
- **Sous-buts → crédit** : `hyp` → `a2-compact-extreme` ; `counter` → `g9-counterexample`.

### `a2-partials` — Dérivées partielles, gradient, jacobienne, dérivées d'ordre 2
- **Année** 14 · **Prérequis** `g6-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : ∂f/∂x : on dérive en x, les autres variables étant des constantes. ∇f est le vecteur des dérivées partielles. Pour u : ℝⁿ → ℝᵐ, J_u a m lignes (une par composante) et n colonnes (une par variable). Schwarz : si f ∈ C², ∂²f/∂x∂y = ∂²f/∂y∂x.
  Exemple : `u(x, y, z) = (x² + yz², y/x)` ; `J_u = [[2x, z², 2yz], [−y/x², 1/x, 0]]` ; en (1, 2, 1) : `[[2, 1, 4], [−2, 1, 0]]` — note « 2 lignes, 3 colonnes ».
- **Juge** : `equiv` `{vars:['x','y','z'], domain:{x:[0.2,3], y:[-3,3], z:[-3,3]}}` pour chaque dérivée partielle ; `matrix` `{rows:m, cols:n, judge:{kind:'value'}}` pour la jacobienne évaluée. · **Forme finale** : expressions sans ∂, ou matrice de nombres.
- **Niveaux** :
  - L1 (guidé) : une dérivée partielle à la fois, la variable « constante » est grisée.
  - L2 : gradient complet ; jacobienne avec la grille à la bonne taille.
  - L3 (choisir l'action) : « Quelle taille a J_u ? » (2 × 3, 3 × 2), puis remplir.
  - L4 (libre) : jacobienne d'une fonction ℝ³ → ℝ² avec une puissance variable, comme (1 + x²)^y (2018 Q9) ; dérivées d'ordre 2 et vérification de Schwarz.
  - L5 (seul) : QCM « J_u(1, 0, 1) vaut » avec des matrices transposées ou de mauvaise taille.
- **Générateur** : composantes tirées dans {polynômes de degré ≤ 3, sin(produit), e^{produit}, quotient simple, (1 + x²)^y}. Le point est choisi pour que toutes les valeurs soient entières (sin et cos en 0, e^0, quotients exacts). On rejette les tirages où une colonne est nulle. Gabarits : « J_u(a) » ; « ∂²f/∂x∂y ». Secours : `u = (xy, x + z)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Ligne 1 : (∂/∂x, ∂/∂y, ∂/∂z)(x² + yz²) = (2x, z², 2yz) | `row` |
  | 2 | Ligne 2 : (∂/∂x, ∂/∂y, ∂/∂z)(y/x) = (−y/x², 1/x, 0) | `row` |
  | 3 | En (1, 2, 1) : [[2, 1, 4], [−2, 1, 0]] | `evaluate` |
- **Aides** : 1 « Une ligne par composante, une colonne par variable. » · 2 « Ligne 2 : (−y/x², …, 0) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2018 Q9, 2019 Q6 ; distracteurs : `a2_jacobian_transposed`, colonne d'une variable absente oubliée). `tf` : « Si f ∈ C², ∂/∂y(∂f/∂x) = ∂/∂x(∂f/∂y) » (V) ; « Si f ∈ C², ∂²f/∂x² = ∂²f/∂y² » (F : f = x²) ; « Pour f ∈ C², ∂f/∂x est différentiable » (V, 2019 Q28).
- **Pièges** : `a2_jacobian_transposed`, `a2_schwarz_no_c2`.
- **Sous-buts → crédit** : `row` → `g6-deriv-rules` ; `evaluate` → `a2-partials`.

### `a2-dir-deriv-def` — Dérivées partielles et directionnelles par la définition
- **Année** 14 · **Prérequis** `a2-partials`, `a1-deriv-def` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-partials` : comparer avec ∇f·v ; `a1-deriv-def` : taux d'accroissement et limite quand t → 0.
- **Intro** : `D_v f(a) = lim_{t→0} (f(a + tv) − f(a))/t`. Pour une fonction définie par morceaux, en a, on **doit** utiliser la définition : la formule ∇f(a)·v ne vaut que si f est différentiable en a. Les dérivées partielles sont les cas v = e₁, e₂.
  Exemple : `f = x²y/(x⁴ + y²)`, `f(0, 0) = 0`, `v = (3/5, 4/5)` ; `f(tv)/t = (36/125)/(81t²/625 + 16/25)` ; `→ 9/20` ; `∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 0`, donc `∇f·v = 0 ≠ 9/20` — note « f n'est pas différentiable en (0, 0) ».
- **Juge** : `equiv` `{vars:['t'], domain:{t:[-0.5,0.5]\{0}}}` pour le quotient simplifié, puis `limit` `{v:'t', to:0}`. · **Forme finale** : nombre, ou « n'existe pas » (limites différentes à gauche et à droite).
- **Niveaux** :
  - L1 (guidé) : la ligne « f(tv) = … » est à trous ; la limite est guidée.
  - L2 : il écrit f(tv) et le quotient ; il choisit la limite.
  - L3 (choisir l'action) : « définition » ou « ∇f·v ». Le choix « ∇f·v » est `valid:false` si f n'est pas différentiable en a, avec `why` : « La formule demande que f soit différentiable. Ici, on ne le sait pas encore. »
  - L4 (libre) : dérivée directionnelle à paramètre (|x|^β y/(x² + y²), selon β, comme en 2020 Q12).
  - L5 (seul) : QCM au format examen, sans aide.
- **Générateur** : on part de la valeur. Fonctions par morceaux en (0, 0) : `x^i y^j/(x^{2a} + c y^{2b})` (de `a2-lim-paths`) et `|x|^β y/(x² + y²)`. Vecteurs unitaires « beaux » : (3/5, 4/5), (4/5, −3/5), (1/2, √3/2), (1/√2, 1/√2), e₁, e₂. On calcule la limite exacte ; on rejette les tirages où elle n'est pas rationnelle ou rationnelle fois √2 ou √3. Pour la variante à paramètre, β ∈ {1, 3/2, 2, 3} et les quatre phrases du QCM sont construites à partir des trois régimes (β < 2, β = 2, β > 2). Secours : 2021 Q16, `xy⁴/(x⁴ + y⁸)`, v = (1/2, √3/2), réponse 9/2.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D_v f(0, 0) = lim_{t→0} (f(3t/5, 4t/5) − 0)/t | `definition` |
  | 2 | f(3t/5, 4t/5) = (9t²/25)(4t/5)/(81t⁴/625 + 16t²/25) | `substitute` |
  | 3 | f(tv)/t = (36/125)/(81t²/625 + 16/25) | `simplify` |
  | 4 | → (36/125)/(16/25) = 9/20 | `limit` |
- **Aides** : 1 « Applique la définition : remplace (x, y) par t·v. » · 2 « f(tv)/t = (36/125)/(… t² + 16/25) » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (2020 Q12, 2021 Q16 ; distracteurs : `a2_dirderiv_gradient` donne ∇f·v = 0, `a2_dirderiv_power` se trompe d'exposant de t). `tf` : « Si ∇f(1, 0) = (2, −1) et D_v f(1, 0) = 1 pour v = (1/√2, 1/√2), f n'est pas différentiable en (1, 0) » (V, car ∇f·v = 1/√2 ≠ 1, 2021 Q21) ; « La dérivée directionnelle de f ∈ C¹ en (0, 0) suivant (1, 1) vaut lim (f(h, k) − f(0, 0))/√(h² + k²) » (F, 2016 Q14 : ce n'est même pas une limite qui existe en général).
- **Pièges** : `a2_dirderiv_gradient`, `a2_dirderiv_power`.
- **Sous-buts → crédit** : `definition` → `a2-dir-deriv-def` ; `substitute`, `simplify` → `@alg:G-simplifier` ; `limit` → `a1-fn-limits`.

### `a2-diff-def` — Différentiabilité en un point par la définition
- **Année** 14 · **Prérequis** `a2-dir-deriv-def`, `a2-lim-paths`, `a2-lim-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-lim-paths` : le reste divisé par ‖h‖ peut ne pas tendre vers 0 le long d'un chemin.
- **Intro** : f est différentiable en a si `R(h) = f(a + h) − f(a) − ∇f(a)·h` vérifie `R(h)/‖h‖ → 0`. Méthode : (1) dérivées partielles par la définition ; (2) reste ; (3) limite du reste divisé par ‖h‖, en polaires.
  Exemple : `f = (x³ + y³)/(x² + y²)`, `f(0, 0) = 0` ; `∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 1` ; `R/‖h‖ = −hk(h + k)/(h² + k²)^{3/2}` ; en polaires `= −cos φ sin φ (cos φ + sin φ)` — note « dépend de φ » ; f n'est pas différentiable en (0, 0).
- **Juge** : `limit` pour les dérivées partielles ; `equiv` `{vars:['h','k'], domain:{h:[-1,1], k:[-1,1]}}` pour R ; `equiv` `{vars:['r','φ']}` pour la forme polaire ; ligne `bound` si la conclusion est « différentiable », ligne `path` si c'est « non différentiable ». · **Forme finale** : « différentiable » (avec une ligne `bound` juste) ou « pas différentiable » (avec un chemin ou une dépendance en φ).
- **Niveaux** :
  - L1 (guidé) : les dérivées partielles sont données ; R est à trous.
  - L2 : il calcule les dérivées partielles ; la forme polaire est donnée.
  - L3 (choisir l'action) : pour conclure, « majorer en r », « un chemin (φ fixé) », « critère C¹ ». Le critère C¹ est juste quand les dérivées partielles sont continues en a, mais le générateur l'utilise seulement si c'est vrai.
  - L4 (libre) : tout le calcul.
  - L5 (seul) : problème « f est-elle continue, a-t-elle des dérivées partielles, est-elle différentiable en (0, 0) ? » (3 sous-questions, comme les QCM 2018 Q7, 2020 Q14, 2021 Q14).
- **Générateur** : on part de la classe voulue : « différentiable, pas C¹ » (`(x² + y²) sin(1/√(x² + y²))`) ; « dérivées partielles, pas différentiable » (homogène de degré 1 non linéaire : `(x³ + y³)/(x² + y²)`, `xy²/(x² + y²)`, `√|xy|`) ; « C¹ » (polynôme plus un terme d'ordre ≥ 2 en r, comme x + y + xy sin(1/r), 2016 Q6). Coefficients de −3 à 3. Pour les termes homogènes de degré 1, on vérifie que la forme polaire n'est pas linéaire en (cos φ, sin φ). Secours : `xy²/(x² + y²)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∂f/∂x(0, 0) = lim f(h, 0)/h = lim h³/h³ = 1 ; de même ∂f/∂y(0, 0) = 1 | `partials` |
  | 2 | R(h, k) = (h³ + k³)/(h² + k²) − h − k = −hk(h + k)/(h² + k²) | `remainder` |
  | 3 | R/‖(h, k)‖ = −hk(h + k)/(h² + k²)^{3/2} | `ratio` |
  | 4 | En polaires : −cos φ sin φ (cos φ + sin φ), qui vaut −√2/2 pour φ = π/4 | `polar` |
  | 5 | La limite n'est pas 0 : f n'est pas différentiable en (0, 0) | `conclude` |
- **Aides** : 1 « Calcule les dérivées partielles par la définition, puis le reste R. » · 2 « R(h, k) = (h³ + k³)/(h² + k²) − … » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (les 4 phrases de 2018 Q7, 2020 Q14 et 2021 Q14 ; distracteurs : `a2_partials_imply_diff`, `a2_diff_imply_c1`). `tf` : voir `a2-diff-implications`.
- **Pièges** : `a2_partials_imply_diff`, `a2_diff_no_norm`.
- **Sous-buts → crédit** : `partials` → `a2-dir-deriv-def` ; `remainder`, `ratio` → `a2-diff-def` ; `polar` → `a2-lim-polar` ; `conclude` → `a2-diff-def`.

### `a2-diff-implications` — C¹, différentiable, dérivées partielles : qui implique quoi
- **Année** 14 · **Prérequis** `a2-diff-def`, `a2-continuity`, `g9-counterexample` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-diff-def` : définition de la différentiabilité ; `a2-continuity` : différentiable ⇒ continue ; `g9-counterexample` : réfuter une implication par un contre-exemple.
- **Intro** : C¹ ⇒ différentiable ⇒ (continue, et D_v f = ∇f·v pour tout v) ⇒ dérivées partielles. **Aucune réciproque n'est vraie**, et « dérivées partielles en a » n'implique même pas « continue en a ». Chaque flèche refusée a un contre-exemple à connaître.
  Bibliothèque de contre-exemples, tous valant 0 en (0, 0) :
  - **K1** `xy/(x² + y²)` : dérivées partielles nulles en (0, 0), pas continue (y = x donne 1/2) ; limites itérées égales, pas de limite.
  - **K2** `x²y/(x⁴ + y²)` : toutes les dérivées directionnelles existent (D_v f = v₁²/v₂ si v₂ ≠ 0), limite 0 sur les droites, pas continue (y = x² donne 1/2).
  - **K3** `(x² + y²) sin(1/√(x² + y²))` : différentiable, pas C¹.
  - **K4** `xy²/(x² + y²)` : continue, D_v f = v₁v₂² pour v unitaire, mais v ↦ D_v f n'est pas linéaire, donc pas différentiable.
  - **K5** `√|xy|` : continue, dérivées partielles nulles, pas de dérivée suivant (1, 1)/√2.
  - **K6** `2 + x²y/(x⁴ + y²)` (en (0, 0), valeur 2) : limite 2 le long de chaque droite, pas de limite.
  - **K7** `xy(x² − y²)/(x² + y²)` : C¹, mais ∂/∂y(∂f/∂x)(0, 0) = −1 et ∂/∂x(∂f/∂y)(0, 0) = 1.
- **Juge** : type `tf` avec `counter: {kind:'function'}`. Le contre-exemple saisi est vérifié numériquement : hypothèses (dérivées partielles par différences finies à h = 1e−6, 1e−7, 1e−8 stables ; différentiabilité testée par R/‖h‖ sur 200 directions et 3 échelles) et conclusion contredite. Les fonctions K1 à K7 sont reconnues directement. Au niveau L3, item `match` : chaque flèche ↔ « vraie » ou un contre-exemple. · **Forme finale** : V/F, et un contre-exemple si F.
- **Niveaux** :
  - L1 (guidé) : le diagramme des implications est affiché ; l'élève place les 4 notions.
  - L2 : V/F, avec le diagramme visible et trois contre-exemples proposés.
  - L3 (choisir l'action) : `match` entre 5 flèches et {vraie, K1, …, K7}.
  - L4 (libre) : V/F, et il tape le contre-exemple (une des K ou une autre fonction qui convient).
  - L5 (seul) : 5 V/F de suite, sans diagramme.
- **Générateur** : banque d'énoncés construits à partir du diagramme. On choisit une flèche (vraie ou réciproque fausse), les dimensions (ℝ² ou ℝ³) et la formulation (« en tout point », « en (0, 0) »). Énoncés d'examen : « dérivées partielles en (0, 0) ⇒ continue » (F, K1, 2020 Q20) ; « dérivées partielles nulles en (0, 0) ⇒ continue en (0, 0) » (F, K1, 2021 Q26) ; « différentiable partout ⇒ dérivées partielles continues » (F, K3, 2020 Q21) ; « différentiable partout ⇒ C¹ » (F, K3, 2016 Q12) ; « toutes les dérivées directionnelles existent ⇒ différentiable » (F, K2, 2019 Q25) ; « C² ⇒ ∂f/∂x différentiable » (V, 2019 Q28) ; « différentiable en a ⇒ continue en a » (V). Secours : 2019 Q25.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | « Si D_v f(p) existe pour tout v ≠ 0, alors f est différentiable en p. » | — |
  | 2 | C'est la réciproque de « différentiable ⇒ dérivées directionnelles » : on s'attend à FAUX | `arrow` |
  | 3 | K2 = x²y/(x⁴ + y²) : D_v f(0, 0) = v₁²/v₂ (v₂ ≠ 0), 0 sinon : elles existent toutes | `counter-hyp` |
  | 4 | f(x, x²) = 1/2 ↛ 0 : pas continue, donc pas différentiable. FAUX | `counter-concl` |
- **Aides** : 1 « Place les deux notions sur le diagramme : la flèche va-t-elle dans ce sens ? » · 2 « Pense à une fonction dont toutes les dérivées directionnelles existent, mais qui n'est pas continue. » · 3 Ligne 3.
- **Variantes d'examen** : `tf` (les 7 énoncés ci-dessus) ; `mcq` (« Alors : f est C¹ / différentiable mais pas C¹ / … », partagé avec `a2-diff-def`).
- **Pièges** : `a2_partials_imply_cont`, `a2_partials_imply_diff`, `a2_diff_imply_c1`, `a2_dirderiv_imply_diff`.
- **Sous-buts → crédit** : `arrow` → `a2-diff-implications` ; `counter-hyp` → `a2-dir-deriv-def` ; `counter-concl` → `a2-lim-paths`.

### `a2-tangent-graph` — Plan tangent au graphe
- **Année** 14 · **Prérequis** `a2-partials`, `g4-plane` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : Pour f différentiable en (a, b), le plan tangent au graphe en (a, b, f(a, b)) est `z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)`.
  Exemple : `f = x²y − 3y² + x`, point (1, −1) ; `f(1, −1) = −3`, `f_x = 2xy + 1 = −1`, `f_y = x² − 6y = 7` ; `z = −3 − (x − 1) + 7(y + 1) = −x + 7y + 5`.
- **Juge** : `value` pour f(a, b) et les dérivées ; `geom` `{object:'plane'}` pour le plan (toute équation proportionnelle est acceptée). · **Forme finale** : équation du plan.
- **Niveaux** :
  - L1 (guidé) : la formule est écrite, les trois nombres sont à trous.
  - L2 : il calcule les trois nombres et écrit le plan.
  - L3 (choisir l'action) : « Quel point ? » (a, b, f(a, b)) parmi 3 (signe de b inversé).
  - L4 (libre) : plan complet ; ou « en quel point le plan tangent est-il horizontal ? ».
  - L5 (seul) : QCM au format 2016 Q4.
- **Générateur** : f polynôme de degré ≤ 3 à 2 variables, avec 3 à 4 monômes, coefficients de −3 à 3 ; point (a, b) avec a, b ∈ {−2, …, 2}. On rejette les tirages où f_x = f_y = 0 (plan horizontal), sauf pour la question dédiée. Secours : `f = x² + y²` en (1, 1).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f(1, −1) = −1 − 3 + 1 = −3 | `value` |
  | 2 | f_x(1, −1) = −1, f_y(1, −1) = 7 | `partials` |
  | 3 | z = −3 − (x − 1) + 7(y + 1) | `plane` |
  | 4 | z = −x + 7y + 5 | `simplify` |
- **Aides** : 1 « Il faut f(a, b), f_x(a, b) et f_y(a, b). » · 2 « z = −3 + (…)(x − 1) + (…)(y + 1) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_tangent_point_sign`, plan sans le terme f(a, b)). `tf` : « Si f ∈ C¹, f(0, 0) = 3 et f a un minimum local en (0, 0), le plan tangent au graphe en (0, 0, 3) est z = 3 » (V, 2019 Q23).
- **Pièges** : `a2_tangent_point_sign`.
- **Sous-buts → crédit** : `value`, `partials` → `a2-partials` ; `plane`, `simplify` → `g4-plane`.

### `a2-tangent-level` — Plan tangent à une surface de niveau
- **Année** 14 · **Prérequis** `g4-dot`, `a2-partials`, `g4-plane` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g4-dot` : ∇F(p)·(x − p) = 0 : ∇F(p) est un vecteur normal.
- **Intro** : Si S = {F = c} et ∇F(p) ≠ 0, ∇F(p) est normal à S en p, et le plan tangent est `∇F(p)·(x − p) = 0`. Une courbe tracée sur S a sa vitesse orthogonale à ∇F. En 2D, ∇F est perpendiculaire à la ligne de niveau.
  Exemple : `F = x²y + yz³ + 2e^{xz} = 10`, p = (0, 1, 2) ; `∇F = (2xy + 2ze^{xz}, x² + z³, 3yz² + 2xe^{xz})` ; `∇F(p) = (4, 8, 12)` ; `4x + 8(y − 1) + 12(z − 2) = 0`, soit `x + 2y + 3z = 8`.
- **Juge** : `equiv` pour ∇F, `value` pour ∇F(p) ; `geom` `{object:'plane'}` pour le plan. · **Forme finale** : équation du plan.
- **Niveaux** :
  - L1 (guidé) : ∇F donné ; à trous : ∇F(p), puis le plan.
  - L2 : il calcule ∇F ; le plan est à trous.
  - L3 (choisir l'action) : « Graphe ou surface de niveau ? » : si S est donnée par F(x, y, z) = c, on prend ∇F ; si on résout en z, c'est `quality:'poor'` (calcul plus long).
  - L4 (libre) : calcul complet, y compris avec une simplification par un facteur commun.
  - L5 (seul) : QCM au format 2019 Q14, 2020 Q7, 2021 Q6.
- **Générateur** : on part du point p (coordonnées entières de −3 à 3) et de la normale voulue (petits entiers, pas tous nuls). F est une somme de 3 ou 4 monômes ou termes du type `e^{xz}`, `cos(πx)`, `x⁴`, `z⁸` ; on calcule c = F(p). On rejette les tirages où ∇F(p) = 0 ou a une composante non entière. Secours : `x² + y² + z² = 3` en (1, 1, 1).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∇F = (2xy + 2ze^{xz}, x² + z³, 3yz² + 2xe^{xz}) | `gradient` |
  | 2 | ∇F(0, 1, 2) = (4, 8, 12) | `evaluate` |
  | 3 | 4(x − 0) + 8(y − 1) + 12(z − 2) = 0 | `plane` |
  | 4 | x + 2y + 3z = 8 | `simplify` |
- **Aides** : 1 « Le gradient de F au point est normal à la surface. » · 2 « 4(x − 0) + 8(y − …) + 12(z − …) = 0 » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_tangent_level_rhs`, `a2_tangent_point_sign`, gradient d'un autre point). `tf` : « ∇F en (0, f(0)), avec F = y − f(x), est orthogonal à la tangente au graphe de f » (V, 2020 Q19) ; « Si F(g(t)) = c pour tout t, alors ∇F(g(t₀))·g′(t₀) = 0 » (V, 2021 Q25) ; « ∇F(p) est tangent à la surface » (F).
- **Pièges** : `a2_tangent_level_rhs`, `a2_tangent_point_sign`.
- **Sous-buts → crédit** : `gradient`, `evaluate` → `a2-partials` ; `plane` → `a2-tangent-level` ; `simplify` → `g4-plane`.

### `a2-chain` — Règle de chaîne et jacobienne d'une composée
- **Année** 14 · **Prérequis** `a2-partials`, `l-mat-product` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : `J_{f∘g}(a) = J_f(g(a))·J_g(a)`. On évalue J_f **au point g(a)**, pas en a. Pour une courbe : `(f∘γ)′(t) = ∇f(γ(t))·γ′(t)`.
  Exemple : `g(u, v) = (uv, u² − v)`, `J_f(x, y) = (2x + y, xe^y)`, h = f∘g, en (1, 1) ; `g(1, 1) = (1, 0)` ; `J_f(1, 0) = (2, 1)` ; `J_g(1, 1) = [[1, 1], [2, −1]]` ; `J_h(1, 1) = (4, 1)`.
- **Juge** : `value` pour g(a) ; `matrix` pour J_f(g(a)), J_g(a) et le produit. · **Forme finale** : la matrice J_h(a), ou le coefficient demandé (`askCoef`, par exemple ∂h/∂v).
- **Niveaux** :
  - L1 (guidé) : les trois étapes sont nommées (« point image », « J_f là-bas », « J_g ici ») ; les cases sont à trous.
  - L2 : il calcule g(a) et les deux jacobiennes ; le produit est guidé.
  - L3 (choisir l'action) : « Où évaluer J_f ? » en a ou en g(a), puis l'ordre du produit.
  - L4 (libre) : calcul complet ; variante f∘f (2020 Q6) avec J en fonction de (x, y, z).
  - L5 (seul) : QCM « ∂h/∂v(1, 0) vaut » (2018 Q10, 2021 Q5).
- **Générateur** : on choisit g (2 composantes polynomiales simples) et a (entiers de −2 à 2), puis J_f avec des entrées dans {polynômes, e^y, sin x, cos x} qui donnent des entiers en g(a). On exige que J_f(a) ≠ J_f(g(a)), pour que le piège `a2_chain_wrong_point` donne une valeur différente. Secours : `g = (u + v, u − v)`, `J_f = (2x, 2y)`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | g(1, 1) = (1·1, 1 − 1) = (1, 0) | `image` |
  | 2 | J_f(1, 0) = (2·1 + 0, 1·e⁰) = (2, 1) | `outer` |
  | 3 | J_g(u, v) = [[v, u], [2u, −1]], J_g(1, 1) = [[1, 1], [2, −1]] | `inner` |
  | 4 | J_h(1, 1) = (2, 1)·[[1, 1], [2, −1]] = (4, 1) | `product` |
- **Aides** : 1 « J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). » · 2 « J_f(1, 0) = (…, …) » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` / `coef` (distracteurs : `a2_chain_wrong_point`, `l_compose_order`, `a2_chain_no_inner`). `tf` : « J_{f∘g}(a) = J_g(a)·J_f(g(a)) » (F : pour g : ℝ² → ℝ² et f : ℝ² → ℝ, le produit J_g·J_f, 2 × 2 fois 1 × 2, n'a même pas de sens) ; « (f∘γ)′(t) = ∇f(γ(t))·γ′(t) si f est différentiable » (V).
- **Pièges** : `a2_chain_wrong_point`, `l_compose_order`, `a2_chain_no_inner`.
- **Sous-buts → crédit** : `image`, `outer`, `inner` → `a2-partials` ; `product` → `l-mat-product`.

### `a2-chain-polar` — Gradient et coordonnées polaires
- **Année** 14 · **Prérequis** `a2-chain`, `g3-identities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : Avec `f̃(r, φ) = f(r cos φ, r sin φ)`, la règle de chaîne donne `f̃_r = cos φ·f_x + sin φ·f_y` et `f̃_φ = −r sin φ·f_x + r cos φ·f_y`. On inverse ce système 2 × 2 pour trouver f_x et f_y. On en tire `f_x² + f_y² = f̃_r² + f̃_φ²/r²`.
  Exemple : `J_{f̃}(r, φ) = (3r² cos φ + 2r, −r³ sin φ)` ; en (x, y) = (0, 2) : r = 2, φ = π/2 ; `f̃_r = 4 = f_y`, `f̃_φ = −8 = −2f_x` ; `∇f(0, 2) = (4, 4)`.
- **Juge** : `value` pour (r, φ) ; `equiv` `{vars:['r','φ']}` pour le système de la règle de chaîne ; ligne `system` pour l'inversion ; `value` pour le résultat. · **Forme finale** : f_x(a) et f_y(a), ou l'identité demandée.
- **Niveaux** :
  - L1 (guidé) : (r, φ) donné ; les deux équations de la chaîne sont écrites à trous.
  - L2 : il écrit les deux équations ; l'inversion est guidée.
  - L3 (choisir l'action) : « Quelle identité est juste ? » parmi les 4 de 2019 Q5 ; il justifie par le calcul guidé.
  - L4 (libre) : calcul complet à partir de J_{f̃} (2019 Q16).
  - L5 (seul) : QCM sans aide.
- **Générateur** : on choisit une fonction cachée f̃(r, φ) = r^m·trig(kφ) + r^p (m, p ∈ {1, 2, 3}, k ∈ {1, 2}) pour que J_{f̃} soit cohérente (Schwarz). Le point est tel que φ ∈ {0, π/6, π/4, π/3, π/2, π} et r ∈ {1, 2}. On donne J_{f̃}, pas f̃. Secours : 2019 Q16.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (0, 2) : r = 2, φ = π/2 | `coords` |
  | 2 | f̃_r = cos φ·f_x + sin φ·f_y ; f̃_φ = −r sin φ·f_x + r cos φ·f_y | `chain` |
  | 3 | En (2, π/2) : 4 = f_y ; −8 = −2f_x | `evaluate` |
  | 4 | f_x(0, 2) = 4, f_y(0, 2) = 4 | `solve` |
- **Aides** : 1 « Écris f̃_r et f̃_φ avec la règle de chaîne, puis résous pour f_x et f_y. » · 2 « En φ = π/2 : f̃_r = f_y et f̃_φ = −r·… » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2019 Q5 : distracteurs `a2_polar_grad_factor` ; 2019 Q16 : distracteur `a2_chain_wrong_point` avec φ mal lu). `tf` : « f_x² + f_y² = f̃_r² + f̃_φ² » (F : f = x, f̃ = r cos φ, en r = 2, φ = π/2 : 1 ≠ 0 + 4).
- **Pièges** : `a2_polar_grad_factor`.
- **Sous-buts → crédit** : `coords` → `g3-identities` ; `chain` → `a2-chain` ; `evaluate`, `solve` → `@alg:E-systemes-2x2`.

### `a2-laplacian-radial` — Laplacien en coordonnées polaires et radiales
- **Année** 14 · **Prérequis** `a2-chain-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-chain-polar` : dérivées en coordonnées polaires.
- **Intro** : Pour f(x) = g(r) avec r = ‖x‖ dans ℝⁿ : `Δf = g″(r) + (n − 1)/r·g′(r)`. En polaires dans ℝ² : `Δf = f̃_rr + f̃_r/r + f̃_φφ/r²`. r^α est harmonique hors de 0 si et seulement si α(α + n − 2) = 0.
  Exemple : `f = (x² + y² + z²)² = r⁴` dans ℝ³ ; `g′ = 4r³`, `g″ = 12r²` ; `Δf = 12r² + (2/r)·4r³ = 20r²`.
- **Juge** : `equiv` `{vars:['r'], domain:{r:[0.1,3]}}` pour g′, g″ et Δf ; pour la vérification en cartésiennes, `equiv` en (x, y, z). Pour « trouve α », `solset` `{v:'α'}`. · **Forme finale** : expression en r, ou ensemble des α.
- **Niveaux** :
  - L1 (guidé) : la formule est affichée ; g′ et g″ sont à trous.
  - L2 : il choisit la formule (n − 1 ou n ou 1) selon la dimension, puis calcule.
  - L3 (choisir l'action) : « cartésiennes » (`quality:'poor'` : long), « formule radiale », « polaires ».
  - L4 (libre) : trouver α pour que r^α (ou ln r en dimension 2) soit harmonique ; Laplacien polaire d'une fonction qui dépend de φ.
  - L5 (seul) : « Pour quelles valeurs de α la fonction (x² + y² + z²)^{α/2} vérifie-t-elle Δf = 0 ? », avec la vérification en cartésiennes en deuxième partie.
- **Générateur** : g ∈ {r^α, ln r, e^{−r²}, 1/r}, α ∈ {−2, −1, 1, 2, 3, 4} ; n ∈ {2, 3}. Pour la forme polaire, `f̃ = r^m cos(kφ)` (harmonique si m = ±k). Secours : `1/r` dans ℝ³ (harmonique).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | n = 3 : Δf = g″ + (2/r)g′ | `formula` |
  | 2 | g = r⁴ : g′ = 4r³, g″ = 12r² | `derivs` |
  | 3 | Δf = 12r² + 8r² = 20r² | `combine` |
- **Aides** : 1 « f dépend seulement de r : utilise Δf = g″ + (n − 1)/r·g′. » · 2 « Ici n − 1 = … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_laplacian_n`). `tf` : « 1/r est harmonique sur ℝ² \ {0} » (F : Δ = 1/r³ ; c'est ln r qui l'est) ; « 1/r est harmonique sur ℝ³ \ {0} » (V).
- **Pièges** : `a2_laplacian_n`.
- **Sous-buts → crédit** : `formula` → `a2-laplacian-radial` ; `derivs` → `g6-deriv-rules` ; `combine` → `@alg:G-simplifier`.

### `a2-taylor2` — Polynôme de Taylor d'ordre 2 à deux variables
- **Année** 14 · **Prérequis** `a2-partials`, `a1-dl-ops`, `a1-dl-compose` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-partials` : dérivées partielles d'ordre 1 et 2 en (a, b).
- **Intro** : `p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²)`, avec X = x − a, Y = y − b, toutes les dérivées étant prises en (a, b). Le terme croisé a pour coefficient **f_xy** (le ½ et le 2 se simplifient). Autre méthode, souvent plus rapide : un DL à une variable de la fonction extérieure, en gardant les termes de degré ≤ 2.
  Exemple : `f = ln(1 + 2x − y + xy)` en (0, 0) ; `u = 2x − y + xy`, `ln(1 + u) = u − u²/2 + …` ; `p₂ = 2x − y + xy − (2x − y)²/2` ; `= 2x − y − 2x² + 3xy − y²/2`.
- **Juge** : `series` à deux variables : les coefficients des monômes de degré ≤ 2 en (X, Y) doivent être justes ; les termes de degré > 2 donnent `stay` (« Tronque : garde le degré ≤ 2 »). En pratique, `equiv` `{vars:['x','y']}` sur les lignes intermédiaires, et contrôle final des 6 coefficients exacts. · **Forme finale** : polynôme développé en (x − a), (y − b), sans terme de degré > 2.
- **Niveaux** :
  - L1 (guidé) : les 6 dérivées sont demandées une à une, puis la formule à trous.
  - L2 : il calcule les dérivées ; la formule est à trous pour les coefficients ½ et 2.
  - L3 (choisir l'action) : « dérivées partielles » ou « DL à une variable (u = …) » ; les deux sont `good` quand la fonction est composée.
  - L4 (libre) : calcul complet, en (0, 0) ou en un point (1, 1) (2019 Q11).
  - L5 (seul) : QCM ; puis « que vaut ∂²f/∂x∂y(0, 0) ? » lu sur p₂ (`askCoef`).
- **Générateur** : f = φ(u) avec φ ∈ {cos, sin, e^·, ln(1 + ·), 1/(1 − ·)} et u un polynôme de degré ≤ 2 sans terme constant (avec terme constant pour un point autre que l'origine, où on recentre). Coefficients de u de −3 à 3. On rejette les tirages où un coefficient de p₂ dépasse 20 en valeur absolue, ou dont le dénominateur dépasse 4. Variante produit : cos(x + y)·cos(x − y) (2021 Q11). Secours : 2020 Q11, `cos(2x + 3y + y²)` → `1 − 2x² − 6xy − 9y²/2`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | u = 2x − y + xy, u(0, 0) = 0 | `inner` |
  | 2 | ln(1 + u) = u − u²/2 + (termes de degré ≥ 3) | `outer-dl` |
  | 3 | u² = (2x − y)² + (degré ≥ 3) | `truncate` |
  | 4 | p₂ = 2x − y + xy − (4x² − 4xy + y²)/2 | `compose` |
  | 5 | p₂ = 2x − y − 2x² + 3xy − y²/2 | `collect` |
- **Aides** : 1 « Écris f = ln(1 + u) avec u petit, et utilise le DL de ln(1 + u) à l'ordre 2. » · 2 « u² ne garde que (2x − y)² » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_taylor_cross`, `a2_taylor_no_half`, `a2_taylor_no_truncate`, polynôme d'ordre 1). `coef` (lire f_xy(0, 0) = coefficient de xy). `tf` : « Si p₂ = 2 + x² + 2y², alors ∇f(0, 0) = (0, 0) » (V, 2021 Q27) ; « Le polynôme de Taylor d'ordre 2 de 4 sin x cos x en (0, 0) est 4x » (V, 2019 Q19, car 2 sin 2x = 4x + O(x³)) ; « p₂ = 1 + x² − y² en un point stationnaire ⇒ minimum local » (F : selle).
- **Pièges** : `a2_taylor_cross`, `a2_taylor_no_half`, `a2_taylor_no_truncate`.
- **Sous-buts → crédit** : `inner`, `outer-dl`, `truncate` → `a1-dl-ops`, `a1-dl-compose` ; `compose`, `collect` → `a2-taylor2`.

### `a2-implicit-2var` — Fonction implicite y = g(x) : g′ et g″
- **Année** 14 · **Prérequis** `a2-partials`, `g6-deriv-implicit`, `a2-chain` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-partials` : F_x et F_y ; `g6-deriv-implicit` : même calcul de y′ qu'au gymnase.
- **Intro** : Si F(a, b) = 0, F ∈ C¹ et F_y(a, b) ≠ 0, alors près de a il existe une unique g avec g(a) = b et F(x, g(x)) = 0. On a `g′ = −F_x/F_y`. Pour g″, on dérive l'identité `F_x + F_y·g′ = 0` encore une fois **en se souvenant que y = g(x)**.
  Exemple : `F = x² + xy + y³ − 3`, (1, 1) ; `F_x = 2x + y = 3`, `F_y = x + 3y² = 4` ; `g′(1) = −3/4` ; `F_xx + 2F_xy g′ + F_yy g′² + F_y g″ = 0` ; `2 − 3/2 + 27/8 + 4g″ = 0`, d'où `g″(1) = −31/32`.
- **Juge** : `value` (exact) pour F_x(a, b), F_y(a, b), g′(a), g″(a) ; `equiv` pour l'identité dérivée (vars x, y, g′, g″ traités comme symboles). · **Forme finale** : nombres exacts.
- **Niveaux** :
  - L1 (guidé) : hypothèse F_y(a, b) ≠ 0 vérifiée à trous, puis g′.
  - L2 : g′ seul ; g″ guidé par la formule à trous.
  - L3 (choisir l'action) : « Résoudre en y » (`valid:false` si impossible, `quality:'poor'` sinon) ou « dérivation implicite ».
  - L4 (libre) : g′ et g″.
  - L5 (seul) : QCM au format 2018 Q11 ; V/F sur les hypothèses du théorème (2020 Q24).
- **Générateur** : on choisit (a, b) entiers et F polynôme (3 ou 4 monômes) avec F(a, b) = 0 par le choix de la constante. Exiger F_y(a, b) ≠ 0 et |F_x/F_y| de dénominateur ≤ 6. Variante trigonométrique : `sin(x²) + cos(y²) = 0` en (√(π/6), √(2π/3)). Secours : `x² + y² = 2` en (1, 1).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | F(1, 1) = 0 ; F_y(1, 1) = 4 ≠ 0 : le théorème s'applique | `hyp` |
  | 2 | g′(1) = −F_x/F_y = −3/4 | `first` |
  | 3 | Dérivée de F_x + F_y·g′ = 0 : F_xx + 2F_xy·g′ + F_yy·g′² + F_y·g″ = 0 | `second-id` |
  | 4 | 2 + 2·1·(−3/4) + 6·(9/16) + 4g″ = 0 | `substitute` |
  | 5 | g″(1) = −31/32 | `solve` |
- **Aides** : 1 « Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. » · 2 « 2 + 2·(…)·(−3/4) + 6·(…)² + 4g″ = 0 » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_implicit_sign`, `a2_implicit_inverted`, `a2_implicit_second_const`). `tf` : « Si F ∈ C¹, F(1, 0) = 0 et F_x(1, 0) ≠ 0, il existe f avec f(0) = 1 et F(f(y), y) = 0 près de 0 » (V, 2020 Q24).
- **Pièges** : `a2_implicit_sign`, `a2_implicit_inverted`, `a2_implicit_second_const`.
- **Sous-buts → crédit** : `hyp`, `first` → `a2-implicit-2var` ; `second-id` → `a2-chain` ; `substitute`, `solve` → `@alg:G-simplifier`.

### `a2-implicit-3var` — Fonction implicite à 3 variables
- **Année** 14 · **Prérequis** `a2-implicit-2var` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : Si F(x, y, z) = 0 en p et F_z(p) ≠ 0, z = g(x, y) près de p, avec `g_x = −F_x/F_z` et `g_y = −F_y/F_z`. On peut aussi résoudre pour y ou pour x : c'est toujours la dérivée de la variable **éliminée** qui va au dénominateur. Pour g_xx, on dérive `F_x + F_z·g_x = 0` en x, avec z = g(x, y).
  Exemple : `F = xz² + ye^z − 2xy = −1`, p = (1, 1, 0) ; `F_x = z² − 2y = −2`, `F_y = e^z − 2x = −1`, `F_z = 2xz + ye^z = 1` ; `g_x = 2`, `g_y = 1` ; `F_xx + 2F_xz g_x + F_zz g_x² + F_z g_xx = 0`, soit `0 + 0 + 3·4 + g_xx = 0`, `g_xx = −12`.
- **Juge** : `value` exact. · **Forme finale** : nombres.
- **Niveaux** :
  - L1 (guidé) : la variable éliminée est indiquée ; à trous : F_z(p), puis g_x.
  - L2 : il calcule les trois dérivées de F ; g_x et g_y à trous.
  - L3 (choisir l'action) : « Quelle variable est la fonction ? » (lue dans l'énoncé : y = g(x, z) en 2019, z = g(x, y) en 2021), puis le dénominateur.
  - L4 (libre) : dérivées premières et une dérivée seconde.
  - L5 (seul) : QCM au format 2019 Q12 (deux dérivées à la fois).
- **Générateur** : p entier ; F = somme de 3 ou 4 termes parmi {monômes, e^{z−x}, sin(xy), y⁵z} ; constante ajustée pour F(p) = 0 (ou F(p) = c donné). On exige que la dérivée de la variable éliminée soit non nulle et que les quotients aient un dénominateur ≤ 10. Secours : 2021 Q12, `zy⁵ + 4e^{z−x} − 2 = 0` en (2, −1, 2), g_y = −10/3.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | F_z(1, 1, 0) = 1 ≠ 0 : z = g(x, y) existe près de (1, 1) | `hyp` |
  | 2 | F_x(p) = −2, F_y(p) = −1 | `partials` |
  | 3 | g_x(1, 1) = 2, g_y(1, 1) = 1 | `first` |
  | 4 | F_xx + 2F_xz·g_x + F_zz·g_x² + F_z·g_xx = 0 ; en p : 0 + 0 + 3·4 + g_xx = 0 | `second-id` |
  | 5 | g_xx(1, 1) = −12 | `solve` |
- **Aides** : 1 « La dérivée de la variable éliminée va au dénominateur, avec un signe moins. » · 2 « g_x = −F_x/F_z = −(…)/1 » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_implicit_sign`, `a2_implicit_inverted`, `a2_implicit_wrong_var`, `a2_implicit_second_const`).
- **Pièges** : `a2_implicit_sign`, `a2_implicit_inverted`, `a2_implicit_wrong_var`, `a2_implicit_second_const`.
- **Sous-buts → crédit** : `hyp`, `first` → `a2-implicit-3var` ; `partials` → `a2-partials` ; `second-id` → `a2-implicit-2var` ; `solve` → `@alg:G-simplifier`.

### `a2-crit-points` — Points stationnaires : résoudre ∇f = 0
- **Année** 14 · **Prérequis** `a2-partials`, `@alg:E-systemes-2x2`, `@alg:D-trinome` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:D-trinome` : factoriser les équations de ∇f = 0.
- **Intro** : On résout ∇f = 0 **sans diviser par une expression qui peut s'annuler** : on factorise et on sépare les cas (« x = 0 ou … »). On vérifie à la fin que chaque point annule bien les deux dérivées.
  Exemple : `f = x³ + 3xy² − 15x − 12y` ; `x² + y² = 5` et `xy = 2` ; `(x + y)² = 9`, `(x − y)² = 1` ; points `(2, 1), (1, 2), (−1, −2), (−2, −1)`.
- **Juge** : `equiv` pour ∇f ; ligne `system` (voir « Lignes d'étape ») pour chaque transformation du système et pour les lignes de cas ; la liste finale est un ensemble fini de points comparé à celui du générateur. · **Forme finale** : liste complète des points stationnaires.
- **Niveaux** :
  - L1 (guidé) : ∇f donné ; le système est factorisé à trous (3x(x + 2) = 0).
  - L2 : il factorise ; les cas sont proposés.
  - L3 (choisir l'action) : « factoriser une équation », « exprimer une variable », « somme et produit », « diviser par x » (`valid:true`, `quality:'poor'` si x = 0 est une solution perdue ; le message vient quand la liste finale est incomplète).
  - L4 (libre) : tout le système.
  - L5 (seul) : enchaîné avec `a2-hessian-2x2` (classer chaque point).
- **Générateur** : on choisit d'abord les points. Famille A (séparable) : f = p(x) + q(y) avec p′ = k(x − a₁)(x − a₂) et q′ = k′(y − b₁)(y − b₂), racines entières de −3 à 6 ; on intègre et on multiplie par le PPCM pour des coefficients entiers ; 4 points. Famille B (couplée) : f = x³ + 3xy² − 3sx − 6ty avec s = a² + b², t = ab, (a, b) entiers, ce qui donne les points (a, b), (b, a), (−a, −b), (−b, −a). Famille C : f = x³ + y³ + cxy (points (0, 0) et (−c/3, −c/3)). On rejette les tirages avec plus de 4 points ou des coordonnées non rationnelles. Secours : 2019 Q17, `x³ + y³ + 3x² − 9y² − 8`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f_x = 3x² + 3y² − 15, f_y = 6xy − 12 | `gradient` |
  | 2 | x² + y² = 5 et xy = 2 | `system` |
  | 3 | (x + y)² = 5 + 4 = 9, (x − y)² = 5 − 4 = 1 | `transform` |
  | 4 | x + y = ±3, x − y = ±1 : 4 cas | `cases` |
  | 5 | Points : (2, 1), (1, 2), (−1, −2), (−2, −1) | `list` |
- **Aides** : 1 « Simplifie chaque équation, puis cherche une combinaison qui donne x + y ou x − y. » · 2 « (x + y)² = x² + y² + 2xy = … » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (« f a exactement deux points stationnaires », 2021 Q17 ; distracteurs : `a2_crit_divide`). `tf` : « Si ∇f(a) = 0, a est un extremum local » (F : x² − y² en (0, 0), 2021 Q24) ; « Si f ∈ C¹ a un extremum local en p (point intérieur), ∇f(p) = 0 » (V, 2016 Q17).
- **Pièges** : `a2_crit_divide`, `a2_stationary_is_extremum`.
- **Sous-buts → crédit** : `gradient` → `a2-partials` ; `system`, `transform`, `cases` → `@alg:E-systemes-2x2` ; `list` → `a2-crit-points`.

### `a2-hessian-2x2` — Nature d'un point stationnaire (hessienne 2 × 2)
- **Année** 14 · **Prérequis** `a2-crit-points`, `l-det-cofactor` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-crit-points` : les points stationnaires à classer.
- **Intro** : En un point stationnaire, avec `H = [[f_xx, f_xy], [f_xy, f_yy]]` : det H > 0 et f_xx > 0 : minimum local ; det H > 0 et f_xx < 0 : maximum local ; det H < 0 : point selle ; det H = 0 : on ne peut pas conclure avec H.
  Exemple : `f = x³ + 3xy² − 15x − 12y` ; `H = [[6x, 6y], [6y, 6x]]`, `det H = 36(x² − y²)` ; (2, 1) : det = 108 > 0, f_xx = 12 > 0, minimum ; (1, 2) : det < 0, selle ; (−2, −1) : maximum ; (−1, −2) : selle.
- **Juge** : `matrix` `{judge:{kind:'equiv'}}` pour H en fonction de (x, y) ; `value` pour H au point ; `mcq` à 4 choix (min, max, selle, on ne peut pas conclure) pour chaque point. · **Forme finale** : une nature pour chaque point.
- **Niveaux** :
  - L1 (guidé) : H donné ; det et f_xx à trous ; l'arbre de décision est affiché.
  - L2 : il calcule H ; l'arbre est affiché.
  - L3 (choisir l'action) : il parcourt l'arbre : « signe de det H », puis « signe de f_xx ».
  - L4 (libre) : calcul complet ; cas det = 0 avec étude directe (x⁴ + y⁴ : minimum ; x³ + y² : ni l'un ni l'autre, sur la droite y = 0).
  - L5 (seul) : enchaînement points stationnaires + nature, QCM au format 2019 Q17 et 2021 Q17.
- **Générateur** : les points de `a2-crit-points` ; on garde les tirages avec au moins un minimum ou maximum et au moins une selle. Pour les cas dégénérés : banque {x⁴ + y⁴, x⁴ − y⁴, x³ + y², x²y², x² + y⁴} avec la conclusion et la méthode (restriction à une droite ou à une courbe). Secours : `x² − y²` (selle).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f_xx = 6x, f_xy = 6y, f_yy = 6x | `hessian` |
  | 2 | det H = 36(x² − y²) | `det` |
  | 3 | (2, 1) : det = 108 > 0 ; f_xx = 12 > 0 : minimum local | `classify` |
  | 4 | (1, 2) : det = −108 < 0 : point selle | `classify` |
  | 5 | (−2, −1) : det = 108, f_xx = −12 < 0 : maximum local ; (−1, −2) : selle | `classify` |
- **Aides** : 1 « Calcule det H au point ; s'il est positif, regarde le signe de f_xx. » · 2 « (2, 1) : det H = 36(4 − …) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (les 4 phrases de 2019 Q17 ; distracteurs : `a2_hess_det_only`, `a2_hess_degenerate`). `tf` : « det H(a) > 0 ⇒ extremum local » (V en 2 × 2 si a est stationnaire et f ∈ C² ; FAUX en 3 × 3, voir `a2-hessian-3x3`) ; « det H(a) = 0 ⇒ pas d'extremum » (F : x⁴ + y⁴).
- **Pièges** : `a2_hess_det_only`, `a2_hess_degenerate`, `a2_stationary_is_extremum`.
- **Sous-buts → crédit** : `hessian` → `a2-partials` ; `det` → `l-det-cofactor` ; `classify` → `a2-hessian-2x2`.

### `a2-hessian-3x3` — Hessienne 3 × 3 : mineurs, trace, déterminant, valeurs propres
- **Année** 14 · **Prérequis** `a2-hessian-2x2`, `l-eig-charpoly` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-hessian-2x2` : même classification, avec une variable de plus ; `l-eig-charpoly` : valeurs propres de H.
- **Intro** : H est symétrique ; ses valeurs propres sont réelles. Toutes > 0 : minimum ; toutes < 0 : maximum ; des deux signes (et aucune nulle) : selle. Mineurs principaux Δ₁, Δ₂, Δ₃ : tous > 0 ⇔ définie positive ; signes −, +, − ⇔ définie négative. Avec la trace (somme des λ) et le déterminant (produit des λ) seulement, on raisonne sur les signes possibles. **det H > 0 seul ne dit rien** en dimension 3 : (−, −, +) a aussi un produit positif.
  Exemple : `f = x² + 2y² + 3z² + 2xy − 2yz − 4x` ; point stationnaire (5, −3, −1) ; `H = [[2, 2, 0], [2, 4, −2], [0, −2, 6]]` ; `Δ₁ = 2, Δ₂ = 4, Δ₃ = 16` — note « tous > 0 » ; minimum local.
- **Juge** : `matrix` pour H ; `value` pour les mineurs ; `mcq` pour la nature. Pour les V/F « trace et déterminant », `tf`. · **Forme finale** : nature du point.
- **Niveaux** :
  - L1 (guidé) : H donné ; mineurs à trous ; règle affichée.
  - L2 : il calcule H et les mineurs.
  - L3 (choisir l'action) : « mineurs », « valeurs propres » (quand H est diagonale par blocs, comme 2018 Q13), « trace et déterminant » (V/F).
  - L4 (libre) : point stationnaire (système linéaire 3 × 3), H, nature.
  - L5 (seul) : 2 V/F au format examen et un QCM, sans aide.
- **Générateur** : on part de la nature. On tire une matrice symétrique S à coefficients entiers de −3 à 3 dont la signature est voulue (vérifiée par les mineurs, ou par les valeurs propres exactes si S est diagonale par blocs), et un point stationnaire p entier. f = ½(x − p)ᵀS(x − p) développé, avec des coefficients entiers (on garde S à diagonale paire, sinon on multiplie par 2). Pour les V/F : on tire (trace, det) et on décide si les signes des valeurs propres sont forcés (par exemple trace = 2 et det = −1 forcent (+, +, −), donc selle : VRAI pour « n'est pas un extremum », 2021 Q23). Secours : 2018 Q13, `x² + y² + 3z² − 5xy` (selle).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∇f = (2x + 2y − 4, 2x + 4y − 2z, 6z − 2y) = 0 | `gradient` |
  | 2 | y = 3z, x = 2 − 3z, puis 4z + 4 = 0 : (5, −3, −1) | `solve` |
  | 3 | H = [[2, 2, 0], [2, 4, −2], [0, −2, 6]] | `hessian` |
  | 4 | Δ₁ = 2, Δ₂ = 8 − 4 = 4, Δ₃ = 2(24 − 4) − 2·12 = 16 | `minors` |
  | 5 | Tous > 0 : H définie positive, minimum local | `classify` |
- **Aides** : 1 « Calcule les trois mineurs principaux en haut à gauche. » · 2 « Δ₂ = 2·4 − 2·2 = … » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (2018 Q13). `tf` : « f_xx(a) = −2 et det H(a) = −3 ⇒ maximum local » (F : Δ₂ n'est pas connu ; contre-exemple H = diag(−2, 3, 1/2), qui a Δ₁ = −2 et det = −3 mais Δ₂ = −6 < 0 : selle, 2019 Q21) ; « det H(0) > 0 en un point stationnaire ⇒ minimum local » (F : diag(−1, −1, 1), 2020 Q27) ; « λ₁ + λ₂ + λ₃ = 2 et λ₁λ₂λ₃ = −1 ⇒ pas un extremum » (V, 2021 Q23).
- **Pièges** : `a2_hess_det_only`, `a2_hess_partial_minors`.
- **Sous-buts → crédit** : `gradient`, `solve` → `a2-crit-points` ; `hessian` → `a2-partials` ; `minors` → `l-det-cofactor` ; `classify` → `a2-hessian-3x3`.

### `a2-extrema-compact` — Extrema absolus sur un compact, bord compris
- **Année** 14 · **Prérequis** `a2-compact-extreme`, `a1-extrema-global`, `a2-crit-points` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-compact-extreme` : min et max atteints sur un compact.
- **Intro** : f continue sur un compact atteint son min et son max. Candidats : (1) points stationnaires **intérieurs** ; (2) extrema sur chaque morceau du bord (paramétrer, ou Lagrange) ; (3) **coins** du bord. On compare les valeurs ; inutile de classer avec la hessienne.
  Exemple : `f = x² + 2y² − 2x` sur `x² + y² ≤ 4` ; intérieur : (1, 0), f = −1 ; bord : y² = 4 − x², `f = −x² − 2x + 8`, x ∈ [−2 ; 2] : x = −1 donne 9, x = ±2 donne 0 et 8 ; max 9 en (−1, ±√3), min −1 en (1, 0).
- **Juge** : `system` pour les points intérieurs ; `equiv` à une variable pour la restriction au bord ; `value` pour chaque valeur ; liste finale de candidats comparée à celle du générateur (il faut **tous** les candidats où l'extremum est atteint). · **Forme finale** : max et min, avec les points où ils sont atteints.
- **Niveaux** :
  - L1 (guidé) : un tableau de candidats avec 3 lignes (intérieur, bord, coins), à remplir.
  - L2 : il remplit le tableau ; la paramétrisation du bord est donnée.
  - L3 (choisir l'action) : pour chaque morceau du bord : « substituer y² = … », « paramétrer (cos t, sin t) », « Lagrange ».
  - L4 (libre) : demi-disque (2 morceaux de bord et 2 coins), triangle (3 côtés), disque.
  - L5 (seul) : problème complet (voir « Exemples de type examen »).
- **Générateur** : domaines : disque de rayon R ∈ {1, 2, 3}, demi-disque (x ≥ 0 ou y ≥ 0), quart de disque, triangle à sommets entiers, carré. f : polynôme de degré ≤ 3 avec point stationnaire intérieur entier (construit comme dans `a2-crit-points`), ou linéaire (ax + by, comme le test 2015). Contraintes : la restriction au bord est un polynôme de degré ≤ 3 en x (ou en cos t) avec des racines rationnelles ; les valeurs finales sont des entiers ou a√b. On rejette si le max ou le min est atteint en un point non rationnel autre que (r cos, r sin) d'un angle remarquable. Secours : test 2016 Q5, `y + 2x` sur le demi-disque x ≥ 0 : M = √5, m = −1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∇f = (2x − 2, 4y) = 0 : (1, 0), intérieur, f(1, 0) = −1 | `interior` |
  | 2 | Bord : y² = 4 − x², f = x² + 8 − 2x² − 2x = −x² − 2x + 8, x ∈ [−2 ; 2] | `boundary` |
  | 3 | Dérivée −2x − 2 = 0 : x = −1, y = ±√3, f = 9 | `boundary-crit` |
  | 4 | Bouts : x = 2 (y = 0) : f = 0 ; x = −2 : f = 8 | `corners` |
  | 5 | Max 9 en (−1, ±√3) ; min −1 en (1, 0) | `compare` |
- **Aides** : 1 « Candidats : points stationnaires intérieurs, points critiques sur le bord, extrémités. » · 2 « Sur le bord, remplace y² par 4 − x² : f = … » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (2020 Q17, test 2016 Q5 ; distracteurs : `a2_compact_boundary_forgot`, `a2_compact_corner_forgot`). `tf` : « f continue sur D compact non vide atteint son max » (V).
- **Pièges** : `a2_compact_boundary_forgot`, `a2_compact_corner_forgot`, `a2_crit_divide`.
- **Sous-buts → crédit** : `interior` → `a2-crit-points` ; `boundary`, `boundary-crit`, `corners` → `a1-extrema-global` ; `compare` → `a2-extrema-compact`.

### `a2-lagrange` — Multiplicateurs de Lagrange (une contrainte, deux variables)
- **Année** 14 · **Prérequis** `a2-crit-points`, `a2-tangent-level` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-crit-points` : résoudre un système non linéaire par cas ; `a2-tangent-level` : ∇g est normal à la courbe g = 0.
- **Intro** : Sur la courbe g = 0 (compacte), si ∇g ≠ 0 sur la courbe, les extrema de f vérifient `∇f = λ∇g` et `g = 0`. On résout ce système **sans diviser par une variable qui peut être nulle**, puis on compare les valeurs de f.
  Exemple : `f = xy` sous `x² + 4y² = 8` ; `y = 2λx`, `x = 8λy` ; x = 0 donne y = 0, pas sur la contrainte ; sinon `1 = 16λ²`, `y = ±x/2`, `x² = 4` ; candidats (±2, ±1) ; max 2 en (2, 1) et (−2, −1), min −2 en (2, −1) et (−2, 1).
- **Juge** : `equiv` pour ∇f et ∇g ; ligne `system` pour le système et les cas ; `value` pour les valeurs. · **Forme finale** : max et min avec leurs points.
- **Niveaux** :
  - L1 (guidé) : le système est écrit ; les cas sont donnés ; il remplit les points et les valeurs.
  - L2 : il écrit le système ; les cas sont à choisir.
  - L3 (choisir l'action) : « éliminer λ en divisant » (`valid:true`, mais `quality:'poor'` si une solution x = 0 ou y = 0 existe), « séparer les cas (x = 0 ou …) », « paramétrer la contrainte » (juste pour une ellipse).
  - L4 (libre) : système complet ; vérification ∇g ≠ 0.
  - L5 (seul) : QCM au format 2018 Q14, 2019 Q2 et 2020 Q2 (« f atteint son maximum en exactement un point »…), sans aide.
- **Générateur** : contraintes : ellipses `ax² + by² = c` (a, b ∈ {1, 2, 3, 4}), cercles, `x⁴ + 16y⁴ = 32`, courbes `x² + xy + y² = c`. f ∈ {xy, x + ky, xy², x²y, x³y³, ax + by²}. On part des points : on choisit les solutions (petits entiers ou ±√2, ±√3) et on ajuste c. On rejette les tirages où ∇g s'annule sur la courbe, et ceux où le nombre de points de max n'est pas lisible (on veut un QCM « en exactement un / deux / quatre points »). Secours : test 2016 Q2, `xy` sous `2x² + y² = 4`, max √2.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∇f = (y, x), ∇g = (2x, 8y) ; ∇g ≠ 0 sur la courbe | `setup` |
  | 2 | y = 2λx, x = 8λy, x² + 4y² = 8 | `system` |
  | 3 | Cas x = 0 : y = 0, pas sur la contrainte | `case` |
  | 4 | Cas x ≠ 0 : x = 16λ²x, donc λ = ±1/4 et y = ±x/2 | `case` |
  | 5 | x² + x² = 8 : x = ±2 ; points (2, 1), (−2, −1), (2, −1), (−2, 1) | `points` |
  | 6 | f = 2, 2, −2, −2 : max 2 (deux points), min −2 (deux points) | `compare` |
- **Aides** : 1 « Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0. » · 2 « x = 8λ·(2λx) = …·x » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_lagrange_divide` perd des points, `a2_lagrange_no_constraint` donne des points hors de la courbe, `a2_lagrange_count` compte mal les points). `tf` : « Si ∇f(p) = λ∇g(p) et g(p) = 0, p est un extremum de f sur g = 0 » (F : f = y³, g = y − x, p = (0, 0) : x = y, f = x³, pas d'extremum).
- **Pièges** : `a2_lagrange_divide`, `a2_lagrange_no_constraint`, `a2_lagrange_count`, `a2_lagrange_no_compare`.
- **Sous-buts → crédit** : `setup` → `a2-partials` ; `system`, `case` → `@alg:E-systemes-2x2` ; `points`, `compare` → `a2-lagrange`.

### `a2-lagrange-3d` — Lagrange dans ℝ³ ; formes quadratiques sur la sphère
- **Année** 14 · **Prérequis** `a2-lagrange`, `l-sym-quadform` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-sym-quadform` : f = xᵀAx sur la sphère : extrema = valeurs propres.
- **Intro** : Même méthode avec trois variables : `∇f = λ∇g`, `g = 0`. Pour f linéaire sur une sphère, ∇f est constant : les extrema sont aux points ±R·∇f/‖∇f‖. Pour f = xᵀAx (A symétrique) sur la sphère unité, le système devient Ax = λx : les extrema sont la plus grande et la plus petite valeur propre de A.
  Exemple : `f = x + 2y − 2z` sous `x² + y² + z² = 9` ; `(1, 2, −2) = 2λ(x, y, z)` ; points `±(1, 2, −2)` ; f = ±9.
- **Juge** : `system` ; `value` ; pour la version quadratique, `value` pour les valeurs propres. · **Forme finale** : max et min.
- **Niveaux** :
  - L1 (guidé) : f linéaire ; le point est ∝ ∇f, à trous.
  - L2 : f linéaire ; il normalise.
  - L3 (choisir l'action) : « Lagrange direct » ou « valeurs propres de A » quand f est quadratique (`quality:'poor'` pour Lagrange direct : 4 équations non linéaires).
  - L4 (libre) : f = xy + 2yz (2021 Q2) par la matrice A.
  - L5 (seul) : QCM au format 2021 Q2.
- **Générateur** : f linéaire à coefficients (a, b, c) avec a² + b² + c² carré parfait (1, 2, 2), (2, 3, 6), (1, 4, 8) ; sphère de rayon R. Quadratique : A symétrique 3 × 3 de polynôme caractéristique λ³ − pλ = 0 ou à racines entières ; on part des valeurs propres et d'une base orthogonale entière. Secours : 2021 Q2, `xy + 2yz` sur la sphère unité, max √5/2.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (1, 2, −2) = 2λ(x, y, z) | `system` |
  | 2 | (x, y, z) = (1/(2λ))(1, 2, −2) | `solve` |
  | 3 | x² + y² + z² = 9/(4λ²) = 9 : λ = ±1/2, points ±(1, 2, −2) | `points` |
  | 4 | f = ±9 : max 9 en (1, 2, −2), min −9 en (−1, −2, 2) | `compare` |
- **Aides** : 1 « Le point est un multiple de ∇f. » · 2 « (x, y, z) = t(1, 2, −2) avec 9t² = … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2021 Q2 ; distracteurs : `a2_quadform_matrix_half` met 1 au lieu de ½ hors de la diagonale).
- **Pièges** : `a2_quadform_matrix_half`, `a2_lagrange_divide`.
- **Sous-buts → crédit** : `system`, `solve` → `a2-lagrange` ; `points` → `a2-lagrange-3d` ; `compare` → `a2-lagrange-3d`.

### `a2-param-int` — Intégrale à paramètre, bornes fixes : dériver sous l'intégrale
- **Année** 14 · **Prérequis** `a2-partials`, `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-partials` : dériver f(x, t) par rapport à t.
- **Intro** : Si f et ∂f/∂t sont continues sur [a ; b] × I, alors `F(t) = ∫_a^b f(x, t) dx` est dérivable et `F′(t) = ∫_a^b ∂f/∂t(x, t) dx`. On dérive d'abord, on intègre ensuite : c'est souvent plus facile que de calculer F.
  Exemple : `F(t) = ∫₀¹ Arctg(tx) dx` ; `∂/∂t Arctg(tx) = x/(1 + t²x²)` ; `F′(t) = ∫₀¹ x/(1 + t²x²) dx = ln(1 + t²)/(2t²)` ; `F′(1) = ln 2/2`.
- **Juge** : `equiv` `{vars:['x','t'], domain:{x:[a,b], t:[0.5,2]}}` pour ∂f/∂t ; `antideriv` `{v:'x'}` pour la primitive ; `definite` pour la valeur. · **Forme finale** : F′(t) en t, ou F′(t₀) exact.
- **Niveaux** :
  - L1 (guidé) : les hypothèses sont cochées ; ∂f/∂t à trous.
  - L2 : il dérive ; l'intégrale est guidée (substitution u = 1 + t²x²).
  - L3 (choisir l'action) : « calculer F puis dériver » (`quality:'poor'` : primitive de Arctg plus longue) ou « dériver sous l'intégrale ».
  - L4 (libre) : calcul complet ; vérification des hypothèses.
  - L5 (seul) : astuce de Feynman : `F(t) = ∫₀¹ (x^t − 1)/ln x dx` ; F′(t) = 1/(t + 1), F(0) = 0, donc F(t) = ln(1 + t).
- **Générateur** : f(x, t) ∈ {Arctg(tx), e^{−tx²}·x, ln(1 + tx), sin(tx)/x, (x^t − 1)/ln x}, bornes [0 ; 1] ou [0 ; π] ; t₀ ∈ {1, 2}. On garde les tirages dont l'intégrale de ∂f/∂t a une primitive élémentaire (table de `integrate.js`). Secours : `F(t) = ∫₀^π cos(tx) dx`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f et ∂f/∂t continues sur [0 ; 1] × ℝ : on peut dériver sous ∫ | `hyp` |
  | 2 | F′(t) = ∫₀¹ x/(1 + t²x²) dx | `differentiate` |
  | 3 | = [ln(1 + t²x²)/(2t²)]₀¹ = ln(1 + t²)/(2t²) | `integrate` |
  | 4 | F′(1) = ln 2/2 | `evaluate` |
- **Aides** : 1 « Dérive l'intégrande par rapport à t, puis intègre en x. » · 2 « ∫ x/(1 + t²x²) dx = (1/(2t²))·ln(…) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_leibniz_wrong_var`, dérivée en x au lieu de t). `tf` : « Si f est continue, F est dérivable » (F : f(x, t) = |t|, F(t) = |t| sur [0 ; 1]).
- **Pièges** : `a2_leibniz_wrong_var`.
- **Sous-buts → crédit** : `hyp`, `differentiate` → `a2-param-int` ; `integrate` → `a1-int-direct` ; `evaluate` → `a2-param-int`.

### `a2-param-int-bounds` — Intégrale à paramètre avec bornes variables (règle de Leibniz)
- **Année** 14 · **Prérequis** `a2-param-int`, `a1-ftc` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : `F(t) = ∫_{a(t)}^{b(t)} f(x, t) dx` donne **trois termes** : `F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫_{a(t)}^{b(t)} ∂f/∂t(x, t) dx`.
  Exemple : `F(t) = ∫_t^{t²} sin(tx)/x dx` ; bornes : `sin(t³)/t²·2t − sin(t²)/t·1` ; intégrale : `∫_t^{t²} cos(tx) dx = (sin t³ − sin t²)/t` ; `F′(t) = (3 sin t³ − 2 sin t²)/t`.
- **Juge** : `equiv` `{vars:['t'], domain:{t:[0.3,2]}}`. Chaque terme est une ligne avec son sous-but. Une ligne finale fausse est diagnostiquée par `a2_leibniz_no_integral`, `a1_ftc_no_chain` et `a2_leibniz_sign`. · **Forme finale** : expression simplifiée en t, ou valeur en t₀.
- **Niveaux** :
  - L1 (guidé) : la formule à trois termes est écrite ; chaque terme est à trous.
  - L2 : il écrit les trois termes ; l'intégrale du 3e est guidée.
  - L3 (choisir l'action) : il touche les termes à écrire dans une liste de 5 (dont deux leurres : « f(b)·b » et « ∫ ∂f/∂x »).
  - L4 (libre) : F′(t) complète et simplifiée.
  - L5 (seul) : QCM au format 2019 Q7, 2020 Q5 et 2021 Q7, sans aide ; ou la variante « F′(2) vaut ».
- **Générateur** : bornes (a(t), b(t)) ∈ {(t, t²), (t², t), (t, t³), (t − 1/2, t^{3/2}), (0, t), (t, 2t)} ; intégrande `φ(tx)/x` avec φ ∈ {sin, sin², 1 − cos, 1 − e^{−·}} (le 3e terme a alors une primitive simple : ∂/∂t (φ(tx)/x) = φ′(tx)). On simplifie le résultat et on rejette les tirages où il a plus de 4 termes. Pour le QCM, les distracteurs sont produits par les 3 pièges. Contrôle : différence finie centrée de F (quadrature) en 3 valeurs de t, à 1e−8. Secours : 2020 Q5, `∫_t^{t²} (1 − e^{−xt})/x dx` → `(1 − 3e^{−t³} + 2e^{−t²})/t`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | F′(t) = f(t², t)·2t − f(t, t)·1 + ∫_t^{t²} ∂/∂t (sin(tx)/x) dx | `leibniz` |
  | 2 | f(t², t)·2t = sin(t³)/t²·2t = 2 sin(t³)/t | `upper` |
  | 3 | f(t, t)·1 = sin(t²)/t | `lower` |
  | 4 | ∫_t^{t²} cos(tx) dx = [sin(tx)/t]_t^{t²} = (sin t³ − sin t²)/t | `inner` |
  | 5 | F′(t) = (3 sin t³ − 2 sin t²)/t | `collect` |
- **Aides** : 1 « Trois termes : borne du haut, borne du bas, et l'intégrale de la dérivée en t. » · 2 « Borne du haut : f(t², t)·(t²)′ = … » · 3 Ligne 1.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_leibniz_no_integral`, `a1_ftc_no_chain`, `a2_leibniz_sign`). `coef` : « F′(2) vaut » (2019 Q7). `tf` : « F(t) = ∫₀^t f(x) dx ⇒ F′(t) = f(t) si f est continue » (V).
- **Pièges** : `a2_leibniz_no_integral`, `a1_ftc_no_chain`, `a2_leibniz_sign`.
- **Sous-buts → crédit** : `leibniz` → `a2-param-int-bounds` ; `upper`, `lower` → `a1-ftc` ; `inner` → `a2-param-int` ; `collect` → `@alg:G-simplifier`.

### `a2-fubini-rect` — Intégrale double sur un rectangle ; symétries
- **Année** 14 · **Prérequis** `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : Sur un rectangle, Fubini permet d'intégrer dans l'ordre qu'on veut. Si f(x, y) = g(x)·h(y), l'intégrale est le produit des deux intégrales. Si le domaine est symétrique par rapport à y = 0 et f impaire en y (f(x, −y) = −f(x, y)), l'intégrale est nulle. **Les deux conditions sont nécessaires.**
  Exemple : `∬_{[0 ; π/2] × [0 ; 1]} y cos x·e^{y²} dx dy` ; `= (∫₀^{π/2} cos x dx)(∫₀¹ y e^{y²} dy)` ; `= 1·(e − 1)/2`.
- **Juge** : `definite` `{value}` ; lignes avec des ∫ itérées acceptées (même valeur, quadrature à 1e−9). Décision « symétrie » : `rule` avec les deux conditions. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : l'intégrale est déjà séparée en produit ; à trous.
  - L2 : il sépare ; puis il calcule.
  - L3 (choisir l'action) : « produit », « intégrer d'abord en x », « d'abord en y », « symétrie : vaut 0 ». Un ordre peut être `quality:'poor'` (∫ x e^{xy} dx demande des parties ; en y d'abord, c'est immédiat).
  - L4 (libre) : calcul complet, y compris un ordre imposé par la difficulté.
  - L5 (seul) : 3 V/F de symétrie et un calcul.
- **Générateur** : rectangle à bornes entières ou multiples de π/2 ; f = g(x)h(y) avec g, h ∈ {xᵏ, cos, sin, e^{ax}, y e^{y²}} ; ou f non séparable avec un bon ordre (x e^{xy}, y cos(xy)). Pour les V/F, on choisit d'abord la vérité, puis f (impaire, paire ou ni l'un ni l'autre en y) et le domaine (symétrique ou pas). Secours : `∬_{[0 ; 1]²} xy = 1/4`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f = cos x·(y e^{y²}), rectangle : produit de deux intégrales | `separate` |
  | 2 | ∫₀^{π/2} cos x dx = 1 | `integrate` |
  | 3 | ∫₀¹ y e^{y²} dy = [e^{y²}/2]₀¹ = (e − 1)/2 | `integrate` |
  | 4 | Résultat : (e − 1)/2 | `combine` |
- **Aides** : 1 « f est un produit g(x)·h(y) sur un rectangle. » · 2 « = (∫₀^{π/2} cos x dx)·(∫₀¹ … dy) » · 3 Ligne 3.
- **Variantes d'examen** : `tf` : « ∬_{[0 ; 1] × [−1 ; 1]} sin(xy) = 0 » (V, 2019 Q20 : impaire en y, domaine symétrique en y) ; « ∬_{disque unité} (x + y) = 0 » (V, 2020 Q28) ; « ∭_{boule unité} z/(x² + y² + z² + 1) ≥ π/8 » (F : l'intégrale vaut 0, 2021 Q19) ; « ∬_{[0 ; 1] × [0 ; 2]} sin(xy) = 0 » (F : domaine pas symétrique, l'intégrande est > 0). `mcq` : valeur exacte.
- **Pièges** : `a2_symmetry_wrong`.
- **Sous-buts → crédit** : `separate` → `a2-fubini-rect` ; `integrate` → `a1-int-direct` ; `combine` → `a2-fubini-rect`.

### `a2-domain-describe` — Décrire un domaine : types I et II, depuis les polaires
- **Année** 14 · **Prérequis** `a2-fubini-rect`, `g10-circle-eq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-fubini-rect` : intégrale itérée ; `g10-circle-eq` : disques et cercles dans les bornes.
- **Intro** : Type I : `a ≤ x ≤ b`, `φ₁(x) ≤ y ≤ φ₂(x)` (des bornes en y qui dépendent de x). Type II : `c ≤ y ≤ d`, `ψ₁(y) ≤ x ≤ ψ₂(y)`. Les bornes extérieures sont **des nombres**. On dessine d'abord, on lit les courbes qui bordent, on trouve leurs intersections.
  Exemple : D entre `y = x²` et `y = 2x` ; intersections x = 0 et x = 2 ; type I : `0 ≤ x ≤ 2`, `x² ≤ y ≤ 2x` ; type II : `0 ≤ y ≤ 4`, `y/2 ≤ x ≤ √y`.
- **Juge** : type `domain` `{region, vars:['x','y'], answerShape:'typeI'|'typeII'|'polar'}` ; la région est comparée par échantillonnage (voir « Lignes d'étape », point 5). Dessin : `plot` `{task:'region'}`. · **Forme finale** : bornes complètes dans la forme demandée.
- **Niveaux** :
  - L1 (guidé) : le dessin est donné, les intersections aussi ; bornes à trous.
  - L2 : dessin donné ; il calcule les intersections.
  - L3 (choisir l'action) : « Quelle variable à l'extérieur ? » puis « quelle courbe en bas ? ».
  - L4 (libre) : il dessine à partir des inégalités, puis écrit les deux types ; ou il passe d'un domaine en (r, φ) à un domaine en (x, y) (2019 Q10).
  - L5 (seul) : QCM « l'intégrale est égale à » (4 écritures avec bornes).
- **Générateur** : on choisit deux ou trois courbes parmi {y = xᵏ (k = 1/3, 1/2, 1, 2, 3), y = mx + p, x² + y² = R², x = c, y = c} dont les intersections sont rationnelles. On vérifie que la région est d'un seul tenant et décrite en un seul morceau dans au moins un des deux types. Pour la version polaire : D̃ = {α ≤ φ ≤ β, r₁(φ) ≤ r ≤ r₂(φ)} avec des bornes qui deviennent des courbes simples (r cos φ ≤ 1 ⇔ x ≤ 1 ; tg φ ≤ r cos φ ⇔ y ≤ x²). Secours : triangle 0 ≤ y ≤ x ≤ 1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x² = 2x : x = 0 ou x = 2 | `intersect` |
  | 2 | Entre 0 et 2, 2x ≥ x² : y va de x² à 2x | `order` |
  | 3 | Type I : 0 ≤ x ≤ 2, x² ≤ y ≤ 2x | `typeI` |
  | 4 | Type II : 0 ≤ y ≤ 4, y/2 ≤ x ≤ √y | `typeII` |
- **Aides** : 1 « Dessine les deux courbes et trouve leurs points d'intersection. » · 2 « x va de 0 à … ; y va de … à 2x » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2019 Q10, 2020 Q10 ; distracteurs : `a2_fubini_outer_var`, `a2_fubini_swap_same`, `a2_domain_curve_order`).
- **Pièges** : `a2_fubini_outer_var`, `a2_domain_curve_order`.
- **Sous-buts → crédit** : `intersect` → `@alg:D-trinome` ; `order`, `typeI`, `typeII` → `a2-domain-describe`.

### `a2-fubini-swap` — Changer l'ordre d'intégration
- **Année** 14 · **Prérequis** `a2-domain-describe` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : Quand l'intégrale intérieure n'a pas de primitive élémentaire (e^{y³}, sin(y²), 1/(1 + y²⁰)), on change l'ordre. Méthode : écrire D par ses inégalités, le dessiner, le décrire dans l'autre type. La nouvelle variable extérieure a des bornes **numériques**.
  Exemple : `∫₀¹ ∫_{√x}^1 e^{y³} dy dx` ; D : `0 ≤ x ≤ 1`, `√x ≤ y ≤ 1` ⇔ `0 ≤ y ≤ 1`, `0 ≤ x ≤ y²` ; `= ∫₀¹ y² e^{y³} dy = (e − 1)/3`.
- **Juge** : `domain` pour la nouvelle description ; `definite` pour la suite. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : D est dessiné ; nouvelles bornes à trous.
  - L2 : il dessine ; puis les bornes.
  - L3 (choisir l'action) : « intégrer tel quel » (`valid:false`, `why` : « e^{y³} n'a pas de primitive élémentaire ») ou « changer l'ordre ».
  - L4 (libre) : calcul complet.
  - L5 (seul) : QCM au format 2018 Q16, 2019 Q8, 2021 Q4 ; ou « laquelle des 4 écritures est égale ? » (2020 Q10).
- **Générateur** : on part de l'intégrande intérieure sans primitive g(y) ∈ {e^{y³}, e^{y²}, sin(y²), cos(y³), 1/(1 + y⁴)} et d'une borne φ(y) telle que φ(y)·g(y) ait une primitive (y² e^{y³}, y e^{y²}, y sin(y²)). Le domaine est 0 ≤ x ≤ φ(y), y ∈ [0 ; c], écrit dans l'ordre « difficile » pour l'énoncé. On peut multiplier par x^k (2018 Q16 : x³⁷/(1 + y²⁰)) pour que l'intégrale en x soit simple. Variante à deux termes (2021 Q4) : une partie se calcule directement, l'autre après le changement d'ordre. Secours : `∫₀¹ ∫_x^1 e^{y²} dy dx = (e − 1)/2`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D = {0 ≤ x ≤ 1, √x ≤ y ≤ 1} | `read` |
  | 2 | D = {0 ≤ y ≤ 1, 0 ≤ x ≤ y²} | `swap` |
  | 3 | = ∫₀¹ (∫₀^{y²} e^{y³} dx) dy = ∫₀¹ y² e^{y³} dy | `inner` |
  | 4 | = [e^{y³}/3]₀¹ = (e − 1)/3 | `outer` |
- **Aides** : 1 « e^{y³} n'a pas de primitive : change l'ordre. Dessine D. » · 2 « y va de 0 à 1 ; x va de 0 à … » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_fubini_outer_var`, `a2_fubini_swap_same`, et la valeur obtenue avec un mauvais domaine).
- **Pièges** : `a2_fubini_outer_var`, `a2_fubini_swap_same`.
- **Sous-buts → crédit** : `read`, `swap` → `a2-domain-describe` ; `inner`, `outer` → `a1-int-direct`.

### `a2-triple-int` — Intégrales triples par Fubini
- **Année** 14 · **Prérequis** `a2-domain-describe` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-domain-describe` : la projection se décrit comme en 2D.
- **Intro** : On décrit D par des « tranches » : z entre deux surfaces qui dépendent de (x, y), puis (x, y) dans la projection de D, décrite comme en 2D.
  Exemple : `T = {x, y, z ≥ 0, x + y + z ≤ 1}`, `∭_T z dV` ; `0 ≤ z ≤ 1 − x − y`, `0 ≤ y ≤ 1 − x`, `0 ≤ x ≤ 1` ; `= 1/24`.
- **Juge** : `domain` `{answerShape:'typeI3'}` ; `definite` pour les intégrales itérées et la valeur. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : les bornes sont données ; à trous : les intégrales successives.
  - L2 : il écrit les bornes de z ; la projection est donnée.
  - L3 (choisir l'action) : « Quelle variable à l'intérieur ? » (celle qui est bornée par deux surfaces simples).
  - L4 (libre) : simplexe de côté a (résultat en a⁵, 2019 Q4), prisme, domaine sous un plan.
  - L5 (seul) : QCM au format 2019 Q4.
- **Générateur** : D ∈ {simplexe x/a + y/b + z/c ≤ 1, prisme sur un triangle, domaine entre z = 0 et un plan au-dessus d'un rectangle} ; intégrande monôme xⁱyʲzᵏ (i + j + k ≤ 2) ; paramètre a symbolique dans 30 % des cas (le résultat est alors c·a^{n}, et les distracteurs changent l'exposant ou la constante). Secours : volume du simplexe unité, 1/6.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 0 ≤ z ≤ 1 − x − y ; projection : 0 ≤ y ≤ 1 − x, 0 ≤ x ≤ 1 | `bounds` |
  | 2 | ∫₀^{1−x−y} z dz = (1 − x − y)²/2 | `inner` |
  | 3 | ∫₀^{1−x} (1 − x − y)²/2 dy = (1 − x)³/6 | `middle` |
  | 4 | ∫₀¹ (1 − x)³/6 dx = 1/24 | `outer` |
- **Aides** : 1 « z va du sol au plan x + y + z = 1 ; ensuite, c'est un triangle dans le plan (x, y). » · 2 « ∫₀^{1−x} (1 − x − y)²/2 dy = (1 − x)^…/6 » · 3 Ligne 1.
- **Variantes d'examen** : `mcq` (distracteurs : exposant ou constante faux, `a2_fubini_outer_var` en 3D).
- **Pièges** : `a2_fubini_outer_var`.
- **Sous-buts → crédit** : `bounds` → `a2-triple-int` ; `inner`, `middle`, `outer` → `a1-int-direct`.

### `a2-change-var` — Changement de variables et jacobien
- **Année** 14 · **Prérequis** `a2-domain-describe`, `a2-partials`, `l-det-cofactor` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-domain-describe` : décrire le nouveau domaine ; `l-det-cofactor` : det J_G.
- **Intro** : Si G : D̃ → D est une bijection C¹ (avec det J_G ≠ 0), `∬_D f(x, y) dx dy = ∬_{D̃} f(G(u, v))·|det J_G(u, v)| du dv`. Valeur absolue, et jacobien de G (nouvelles → anciennes variables). Si on connaît plutôt u(x, y), v(x, y) : |det J_G| = 1/|det J_{G⁻¹}|. D̃ s'obtient en écrivant les inégalités de D avec u et v.
  Exemple : `D = {1 ≤ xy ≤ 4, x ≤ y ≤ 3x, x > 0}` ; `u = xy`, `v = y/x` : `D̃ = [1 ; 4] × [1 ; 3]` ; `∂(u, v)/∂(x, y) = 2y/x = 2v`, donc `dx dy = du dv/(2v)` ; `∬_D xy dx dy = ∫₁⁴∫₁³ u/(2v) dv du = 15 ln 3/4`.
- **Juge** : `domain` pour D̃ ; `equiv` pour le jacobien ; `definite` pour la valeur. · **Forme finale** : nombre exact ; ou D̃ (QCM 2020 Q16).
- **Niveaux** :
  - L1 (guidé) : u, v donnés ; D̃ et le jacobien à trous.
  - L2 : il calcule D̃ et le jacobien.
  - L3 (choisir l'action) : « Quel changement ? » parmi u = x + y / v = x − y, u = xy / v = y/x, polaires, en lisant les inégalités de D.
  - L4 (libre) : calcul complet, avec le jacobien de G⁻¹ inversé.
  - L5 (seul) : QCM au format 2020 Q16 (trouver D̃) ; V/F sur la formule (2016 Q15 : « |det J_G| » sans valeur absolue, bijection sur des fermés…).
- **Générateur** : changements : linéaires (u = ax + by, v = cx + dy, det entier non nul), (xy, y/x), (x² − y², xy) pour des régions hyperboliques. On choisit d'abord D̃ = rectangle à bornes entières, puis on exprime D en (x, y). f choisie pour que l'intégrale en (u, v) soit élémentaire. Secours : u = x + y, v = x − y sur un carré tourné.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | u = xy ∈ [1 ; 4], v = y/x ∈ [1 ; 3] | `new-domain` |
  | 2 | det ∂(u, v)/∂(x, y) = det [[y, x], [−y/x², 1/x]] = 2y/x = 2v | `jacobian` |
  | 3 | dx dy = du dv/(2v) | `invert` |
  | 4 | ∬ xy dx dy = ∫₁⁴∫₁³ u/(2v) dv du | `rewrite` |
  | 5 | = (15/2)·(ln 3)/2 = 15 ln 3/4 | `compute` |
- **Aides** : 1 « Les inégalités de D parlent de xy et de y/x : pose u et v. » · 2 « |det J_G| = 1/|det ∂(u, v)/∂(x, y)| = 1/(…) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2020 Q16 ; distracteurs : `a2_changevar_domain_direction`, `a2_jacobian_inverse`). `tf` : « ∬_D f = ∬_{D̃} f∘G·det J_G » (F sans valeur absolue : G(u, v) = (−u, v)).
- **Pièges** : `a2_jacobian_inverse`, `a2_changevar_domain_direction`, `a2_jacobian_forgot`.
- **Sous-buts → crédit** : `new-domain` → `a2-change-var` ; `jacobian` → `a2-partials` ; `invert`, `rewrite` → `a2-change-var` ; `compute` → `a2-fubini-rect`.

### `a2-polar-int` — Intégrales doubles en coordonnées polaires
- **Année** 14 · **Prérequis** `a2-change-var`, `g3-identities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g3-identities` : ∫ cos²φ et sin²φ par l'angle double.
- **Statut** : fait le 10 novembre 2026 (étape U6). Trois parties : les bornes en (r, φ) (juge `domain`), l'intégrande avec son jacobien (`equiv` avec `jac` : la ligne de départ f(x, y) vaut f·r, la ligne suivante est l'intégrande en r, φ), la valeur (`definite` : l'intégrale itérée, le produit de deux intégrales, les crochets, le nombre). Domaines : disque, demi-disques, quarts, secteurs 0 ≤ y ≤ x et 0 ≤ x ≤ y, secteurs π/6 et π/3 (intégrandes radiales seulement), anneaux ; rayons entiers ou e. Intégrandes : x, y, x², y², xy, x(x² + y²), y(x² + y²), x² + y², √(x² + y²), 1, Log(x² + y²), e^(−(x² + y²)), 1/(1 + x² + y²) ; une valeur nulle est rejetée. Niveau 1 : bornes données dans l'énoncé, jacobien et primitives à trous ; niveau 2 : bornes et jacobien à trous ; niveau 3 : décision « polaires ou cartésiennes », puis menus. Niveau 5 : le problème E5 (8 points, barème du catalogue), Log(x² + y²) sur 1 ≤ r ≤ R (R = 2, 3 ou e) et cinq secteurs. Variante `mcq` : la version QCM de E5 la moitié du temps, sinon une autre intégrande ; leurres `a2_jacobian_forgot`, `a2_polar_angle_bounds` (borne de φ voisine), `g2_log_power` (E5), puis le double ou la moitié de la valeur (angle mal lu), chacun gardé seulement si sa valeur diffère.
- **Intro** : `dx dy = r dr dφ` (le **r** est le jacobien). Domaines naturels : disques, anneaux, secteurs (0 ≤ y ≤ x donne 0 ≤ φ ≤ π/4).
  Exemple : `∬_{x² + y² ≤ 4, y ≥ 0} y dx dy` ; `= ∫₀^π ∫₀² r sin φ·r dr dφ` ; `= (8/3)·2 = 16/3`.
- **Juge** : `domain` `{answerShape:'polar'}` pour les bornes ; `equiv` `{vars:['r','φ']}` pour l'intégrande transformé (avec le facteur r) ; `definite` pour la valeur. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : bornes en (r, φ) données ; intégrande à trous, avec la case du jacobien en évidence.
  - L2 : il écrit les bornes ; puis l'intégrande.
  - L3 (choisir l'action) : « polaires » ou « cartésiennes » selon le domaine et l'intégrande.
  - L4 (libre) : quart d'anneau avec Log(x² + y²) (2020 Q4), secteur 0 ≤ y ≤ x (2021 Q10).
  - L5 (seul) : QCM, ou problème (voir « Exemples de type examen »).
- **Générateur** : domaine : disque, demi-disque, quart, anneau, secteur d'angle π/4 ou π/6, rayons entiers ou 1 ≤ r ≤ e. Intégrande : xᵃyᵇ(x² + y²)ᶜ, Log(x² + y²), e^{−(x² + y²)}, 1/(1 + x² + y²). On garde les tirages où l'intégrale en φ est une intégrale de puissances de cos et sin aux angles remarquables. Secours : `∬_{disque R = 2} (x² + y²) = 8π`.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D : 0 ≤ r ≤ 2, 0 ≤ φ ≤ π | `bounds` |
  | 2 | y dx dy = r sin φ·r dr dφ | `jacobian` |
  | 3 | = (∫₀² r² dr)(∫₀^π sin φ dφ) | `separate` |
  | 4 | = (8/3)·2 = 16/3 | `compute` |
- **Aides** : 1 « Domaine en forme de disque : passe en polaires, sans oublier r. » · 2 « ∫₀² r^… dr · ∫₀^π sin φ dφ » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_jacobian_forgot`, `a2_polar_angle_bounds`).
- **Pièges** : `a2_jacobian_forgot`, `a2_polar_angle_bounds`.
- **Sous-buts → crédit** : `bounds` → `a2-domain-describe` ; `jacobian` → `a2-change-var` ; `separate` → `a2-fubini-rect` ; `compute` → `a1-int-direct`.

### `a2-cyl-sph` — Coordonnées cylindriques et sphériques
- **Année** 14 · **Prérequis** `a2-polar-int`, `a2-triple-int` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a2-polar-int` : r dr dφ en cylindriques ; `a2-triple-int` : bornes d'une intégrale triple.
- **Statut** : fait le 10 novembre 2026 (étape U6). Les bornes (juge `domain` : coordonnées `sph` dans l'ordre r, θ, φ, ou `cyl` dans l'ordre φ, r, z), l'intégrande avec le jacobien (`equiv` avec `jac`), la valeur (`definite` ; le générateur donne au juge la valeur exacte de l'intégrale triple de départ, `known`, la ligne suivante lui est comparée). Sphériques : boule, coquille 1 ≤ r ≤ 2, demi-boules, cornet θ ≤ π/4, extérieur du cône (z ≥ 0), octant, cornet ∩ octant ; intégrandes 1, z, z², x² + y², x² + y² + z², √(x² + y² + z²), 1/√(x² + y² + z²) (pas de xyz·√(…)). Cylindriques : cylindre (entier, demi, quart), sous un paraboloïde, entre un cône et un plan (on intègre d'abord en z) ; intégrandes 1, z, x² + y². Niveau 1 : coordonnées données, bornes, jacobien et une primitive à trous ; niveau 2 : jacobien à trous ; niveau 3 : décision « cylindriques ou sphériques ». Niveau 5 et variante `mcq` : « l'intégrale est égale à » (quatre intégrales itérées en sphériques ; leurres θ depuis le plan, r² sin θ oublié ou r à sa place, borne de θ ou de φ voisine, gardés seulement si leur valeur diffère). Variante `tf` : douze énoncés sur dV, z, les cônes et les octants, en QCM Vrai/Faux (le contre-exemple serait une formule, sans vérificateur).
- **Intro** : Cylindriques : `dV = r dr dφ dz`. Sphériques, avec **θ mesuré depuis l'axe z** : `x = r sin θ cos φ`, `y = r sin θ sin φ`, `z = r cos θ`, `dV = r² sin θ dr dθ dφ`. Le cône z ≥ √(x² + y²) devient θ ≤ π/4 ; z ≥ 0 devient θ ≤ π/2.
  Exemple : `∭ z dV` sur `{x² + y² + z² ≤ 4, z ≥ 0}` ; `= ∫₀^{2π}∫₀^{π/2}∫₀² r cos θ·r² sin θ dr dθ dφ` ; `= 2π·(1/2)·4 = 4π`.
- **Juge** : `domain` `{answerShape:'cyl'|'sph'}` ; `equiv` `{vars:['r','θ','φ']}` pour l'intégrande avec le jacobien ; `definite` pour la valeur. · **Forme finale** : nombre exact, ou l'intégrale itérée demandée (QCM 2021 Q8 : choisir la bonne écriture).
- **Niveaux** :
  - L1 (guidé) : le système de coordonnées est choisi ; bornes à trous.
  - L2 : il écrit les bornes ; le jacobien est à trous.
  - L3 (choisir l'action) : « cylindriques » (cylindre, paraboloïde) ou « sphériques » (boule, cône depuis l'origine).
  - L4 (libre) : boule ∩ cône (2020 Q8), coquille ∩ cône ∩ octant (2021 Q8, 2018 Q17).
  - L5 (seul) : QCM « l'intégrale est égale à » (4 intégrales itérées).
- **Générateur** : domaines : boule ou coquille (rayons 1, 2), coupée par z ≥ 0, par un cône θ ≤ π/4 ou θ ≥ π/4 (x² + y² ≤ z²), par des octants (φ ∈ [0 ; π/2]) ; cylindre r ≤ R, 0 ≤ z ≤ h ; sous un paraboloïde. Intégrande : 1, z, z², 1/√(x² + y² + z²), xyz·√(…). Les distracteurs du QCM sont produits par `a2_sph_theta_from_plane`, `a2_jacobian_forgot` (r² sin θ oublié ou r au lieu de r²) et des bornes de θ ou φ fausses. Secours : volume de la boule unité, 4π/3.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 0 ≤ r ≤ 2, 0 ≤ θ ≤ π/2 (z ≥ 0), 0 ≤ φ ≤ 2π | `bounds` |
  | 2 | z dV = r cos θ·r² sin θ dr dθ dφ | `jacobian` |
  | 3 | = (∫₀² r³ dr)(∫₀^{π/2} cos θ sin θ dθ)(∫₀^{2π} dφ) | `separate` |
  | 4 | = 4·(1/2)·2π = 4π | `compute` |
- **Aides** : 1 « Une boule : sphériques, avec dV = r² sin θ dr dθ dφ. » · 2 « z ≥ 0 veut dire θ entre 0 et … » · 3 Ligne 1.
- **Variantes d'examen** : `mcq` (2018 Q17, 2020 Q8, 2021 Q8). `tf` : « En sphériques, dV = r² cos θ dr dθ dφ » (F avec la convention du cours : θ est mesuré depuis l'axe z, donc sin θ).
- **Pièges** : `a2_jacobian_forgot`, `a2_sph_theta_from_plane`, `a2_polar_angle_bounds`.
- **Sous-buts → crédit** : `bounds` → `a2-cyl-sph` ; `jacobian` → `a2-change-var` ; `separate`, `compute` → `a2-fubini-rect`.

### `a2-improper-multi` — Intégrales impropres sur ℝ² et ℝ³ ; intégrale de Gauss
- **Année** 14 · **Prérequis** `a2-polar-int`, `a2-cyl-sph`, `a1-improper-calc` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-cyl-sph` : boules de ℝ³ en sphériques.
- **Statut** : fait le 10 novembre 2026 (étape U6). f radiale sur ‖x‖ ≥ 1 ou 0 < ‖x‖ ≤ 1 (‖x‖^(−α), α ∈ {1, 3/2, 2, 5/2, 3, 4}), ou sur tout ℝⁿ ((1 + ‖x‖²)^(−k), e^(−‖x‖²), ‖x‖e^(−‖x‖²)), n = 2 ou 3. Parties : l'intégrande avec le jacobien (`equiv` avec `jac`), l'intégrale sur B_R (ou ε ≤ ‖x‖ ≤ 1) en fonction de R (`equiv` en R, cible `no-int` ajoutée : plus de ∫ ni de crochet), la limite R → +∞ ou ε → 0⁺ (`limit` ; « diverge » s'écrit +∞). Pas de quadrature à R = 10, 20, 40 : la limite est exacte. En ℝ³, le facteur 4π des angles est donné en note. « Diverge » vient dans environ un tiers des items (le catalogue en demande 30 %). Gauss : une partie `definite` « ∫_ℝ e^(−x²) dx = √π » après ∬_{ℝ²} e^(−(x² + y²)) = π (√π devient un atome de `closedform`). Niveaux 2 et 3 : décision « converge ? » avant le calcul (piège `a2_improper_exponent` quand la règle de dimension 1 donne l'autre réponse). Niveau 5 : Gauss seul (∫ x² e^(−x²) par parties sur ℝ ou sur [0 ; ∞[, ∭_{ℝ³} e^(−‖x‖²) = π√π comme produit, e^(−4x²), e^(−x² + 2x), ∬ (x² + y²)e^(−(x² + y²))). Variante `mcq` : convergence et valeur de ∫ ‖x‖^(−α) (leurres jacobien oublié, seuil de dimension 1, formule appliquée sans vérifier), ou Gauss (leurres `a2_gauss_sqrt`). Variante `tf` : « ∫ ‖x‖^(−α) converge », en QCM Vrai/Faux.
- **Intro** : Pour f ≥ 0, on intègre sur des boules B_R et on fait R → ∞ (ou ε → 0 près d'une singularité). En polaires ou en sphériques, le jacobien change le critère : `∫_{‖x‖ ≥ 1} ‖x‖^{−α}` converge si et seulement si **α > n** ; `∫_{‖x‖ ≤ 1} ‖x‖^{−α}` converge si et seulement si **α < n**. Gauss : `∬_{ℝ²} e^{−(x² + y²)} = π`, donc `∫_ℝ e^{−x²} dx = √π`.
  Exemple : `∬_{ℝ²} e^{−(x² + y²)} dx dy = ∫₀^{2π}∫₀^∞ e^{−r²} r dr dφ = 2π·1/2 = π` ; `(∫_ℝ e^{−x²} dx)² = π`, donc `∫_ℝ e^{−x²} dx = √π`.
- **Juge** : `definite` (bornes ∞ autorisées, quadrature sur [0 ; R] pour R = 10, 20, 40) ; décision « converge/diverge » avec la règle des exposants (`mcq` + `rule`). · **Forme finale** : nombre exact ou « diverge ».
- **Niveaux** :
  - L1 (guidé) : polaires données ; limite R → ∞ à trous.
  - L2 : il passe en polaires et calcule.
  - L3 (choisir l'action) : « Converge ? » selon α et n, avant tout calcul.
  - L4 (libre) : ∬ dx dy/(1 + x² + y²)² = π ; ∭_{‖x‖ ≥ 1} ‖x‖^{−4} = 4π ; Gauss.
  - L5 (seul) : « Calcule ∫_ℝ x² e^{−x²} dx » à partir de Gauss (par parties) ou ∫_{ℝ³} e^{−‖x‖²} = π^{3/2}.
- **Générateur** : f radiale : (1 + r²)^{−k} (k = 2, 3), r^{−α}·1_{r ≥ 1}, r^{−α}·1_{r ≤ 1}, e^{−r²}, r e^{−r²} ; n ∈ {2, 3} ; α ∈ {1, 3/2, 2, 5/2, 3, 4}. La réponse « diverge » apparaît dans 30 % des items. Secours : Gauss.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∬_{B_R} e^{−(x² + y²)} = ∫₀^{2π}∫₀^R e^{−r²} r dr dφ | `polar` |
  | 2 | = 2π·(1 − e^{−R²})/2 = π(1 − e^{−R²}) | `compute` |
  | 3 | R → ∞ : π | `limit` |
  | 4 | ∬_{ℝ²} e^{−x²}e^{−y²} = (∫ e^{−x²} dx)² = π, donc ∫ e^{−x²} dx = √π | `gauss` |
- **Aides** : 1 « Intègre sur le disque de rayon R en polaires, puis fais R → ∞. » · 2 « ∫₀^R e^{−r²} r dr = (1 − e^{…})/2 » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_improper_exponent`, `a2_gauss_sqrt`, `a2_jacobian_forgot`). `tf` : « ∬_{x² + y² ≥ 1} (x² + y²)^{−1} dx dy converge » (F : α = 2 = n) ; « ∭_{‖x‖ ≤ 1} ‖x‖^{−2} dV converge » (V : 2 < 3).
- **Pièges** : `a2_improper_exponent`, `a2_gauss_sqrt`, `a2_jacobian_forgot`.
- **Sous-buts → crédit** : `polar` → `a2-polar-int` ; `compute`, `limit` → `a1-improper-calc` ; `gauss` → `a2-improper-multi`.

### `a2-volume` — Volumes
- **Année** 14 · **Prérequis** `a2-polar-int` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U6). Parties : la projection R (`domain` en polaires, ou en cartésiennes pour le tétraèdre), le solide D entre les deux surfaces (`domain` en cylindriques ou en cartésiennes de ℝ³ : z va du dessous au dessus ; surfaces échangées : piège `a2_volume_surfaces_swapped`), la hauteur fois r (`equiv` avec `jac`), la valeur (`definite`). Solides : paraboloïde sur z = 0, deux paraboloïdes, paraboloïde sous un plan, cône sous un plan, cornet de glace (cône et sphère x² + y² + z² = 2R²), boule, tétraèdre sous un plan à intercepts entiers ; rayons 1, 2, 3. Niveau 1 : R et la surface du dessus donnés, l'intégrale à trous ; niveau 2 : R, D et une primitive à trous ; niveau 3 : décisions « coordonnées » et « surface du dessus ». Variante `mcq` : leurres jacobien oublié, volume négatif (surfaces échangées), puis le double ou la moitié.
- **Intro** : Le volume de D est ∭_D 1 dV. Si D est entre deux surfaces z = g(x, y) ≤ z = h(x, y) au-dessus de la région R, `Vol = ∬_R (h − g) dx dy`. On trouve R en égalant les deux surfaces.
  Exemple : sous `z = 4 − x² − y²`, au-dessus de `z = 0` ; R : `x² + y² ≤ 4` ; `Vol = ∫₀^{2π}∫₀² (4 − r²) r dr dφ = 8π`.
- **Juge** : `domain` pour R ; `definite` pour la valeur. · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : R donné ; l'intégrale est à trous.
  - L2 : il trouve R ; l'intégrale est guidée.
  - L3 (choisir l'action) : « surface du dessus », « surface du dessous », « système de coordonnées ».
  - L4 (libre) : deux paraboloïdes, cône et sphère (« cornet de glace »), tétraèdre.
  - L5 (seul) : volume complet sans aide.
- **Générateur** : paires de surfaces {plan, paraboloïde z = a ± (x² + y²), cône z = √(x² + y²), sphère} dont l'intersection est un cercle de rayon entier ; ou tétraèdre défini par un plan à intercepts entiers. Secours : boule unité, 4π/3.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 4 − x² − y² = 0 : R = {x² + y² ≤ 4} | `region` |
  | 2 | Vol = ∬_R (4 − x² − y²) dx dy | `setup` |
  | 3 | = ∫₀^{2π}∫₀² (4 − r²) r dr dφ | `polar` |
  | 4 | = 2π·(8 − 4) = 8π | `compute` |
- **Aides** : 1 « Volume = ∬ (dessus − dessous) sur la projection. » · 2 « La projection est le disque où 4 − x² − y² ≥ … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_jacobian_forgot`, surfaces inversées, ce qui donne un volume négatif ou faux).
- **Pièges** : `a2_jacobian_forgot`, `a2_volume_surfaces_swapped`.
- **Sous-buts → crédit** : `region` → `a2-domain-describe` ; `setup` → `a2-volume` ; `polar` → `a2-polar-int` ; `compute` → `a2-fubini-rect`.

### `a2-mass-center` — Masse et centre de masse
- **Année** 14 · **Prérequis** `a2-polar-int` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Statut** : fait le 10 novembre 2026 (étape U6). Plaques : demi-disque (ρ = 1, y ou √(x² + y²)) et quart de disque (ρ = 1 ou √(x² + y²)) en polaires, triangle 0 ≤ y ≤ x ≤ a (ρ = 1 ou x) en cartésiennes. Parties : la masse M (`definite`), une décision de symétrie (x̄ = 0 ; x̄ = ȳ ; aucune pour le triangle), l'intégrande du moment avec le jacobien (`equiv` avec `jac`), le moment (`definite`), puis ȳ (ou x̄) = moment / masse. La réponse est la coordonnée calculée, pas le couple (x̄, ȳ). Niveau 5 : la demi-boule (z̄ = 3R/8, en sphériques) ou une plaque, sans aide. Pas de variante d'examen ; poids d'examen 0.
- **Intro** : Masse `M = ∬_D ρ`. Centre de masse `x̄ = (1/M)∬_D x ρ`, `ȳ = (1/M)∬_D y ρ`. Par symétrie, une coordonnée est souvent nulle ou évidente.
  Exemple : demi-disque `x² + y² ≤ 9, y ≥ 0`, ρ = 1 ; `M = 9π/2`, `x̄ = 0` (symétrie) ; `∬ y = 2·27/3 = 18` ; `ȳ = 18/(9π/2) = 4/π`.
- **Juge** : `definite` et `value`. · **Forme finale** : (x̄, ȳ).
- **Niveaux** :
  - L1 (guidé) : M donnée ; ∬ y à trous.
  - L2 : il calcule M et ∬ y.
  - L3 (choisir l'action) : « Quelle coordonnée est nulle par symétrie ? »
  - L4 (libre) : densité variable ρ = y ou ρ = r.
  - L5 (seul) : centre de masse d'une demi-boule (3R/8).
- **Générateur** : demi-disques, quarts de disque, triangles, demi-boules ; ρ ∈ {1, x, y, r}. Secours : demi-disque unité, ȳ = 4/(3π).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | M = aire = 9π/2 ; x̄ = 0 par symétrie | `mass` |
  | 2 | ∬ y = ∫₀^π∫₀³ r sin φ·r dr dφ = 9·2 = 18 | `moment` |
  | 3 | ȳ = 18/(9π/2) = 4/π | `divide` |
- **Aides** : 1 « Centre = moment divisé par la masse. » · 2 « ∬ y en polaires = (∫₀³ r² dr)(∫₀^π sin φ dφ) » · 3 Ligne 2.
- **Variantes d'examen** : aucune (absent des examens 2019–2021).
- **Pièges** : `a2_jacobian_forgot`.
- **Sous-buts → crédit** : `mass`, `divide` → `a2-mass-center` ; `moment` → `a2-polar-int`.

### `a2-ode-cauchy` — Problème de Cauchy : existence, unicité, Lipschitz
- **Année** 14 · **Prérequis** `a2-partials` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : Problème de Cauchy : `y′ = f(t, y)`, `y(t₀) = y₀`. Si f est continue sur `R = {|t − t₀| ≤ a, |y − y₀| ≤ b}`, bornée par K, et M-Lipschitz en y (par exemple si |∂f/∂y| ≤ M sur R), il existe une **unique** solution sur `|t − t₀| ≤ min(a, b/K)`. Continue seule ne suffit pas pour l'unicité. Une solution locale n'est pas forcément globale (y′ = y² explose). Une équation d'ordre r se ramène à un système d'ordre 1 ; elle demande r conditions initiales.
  Exemple : `f(t, y) = t sin y + y²` sur `|t| ≤ 1, |y| ≤ 2` ; `|∂f/∂y| = |t cos y + 2y| ≤ 5`, donc M = 5 ; `|f| ≤ 1 + 4 = 5 = K` ; solution unique sur `|t| ≤ min(1, 2/5) = 2/5`.
- **Juge** : `value` pour M, K et l'intervalle ; `tf` avec `counter: {kind:'ode'}` : le contre-exemple est une équation et deux solutions distinctes, vérifiées par le juge `ode` (substitution et condition initiale). · **Forme finale** : nombre, ou V/F avec contre-exemple.
- **Niveaux** :
  - L1 (guidé) : majorations à trous (|cos y| ≤ 1, |y| ≤ b).
  - L2 : il majore ∂f/∂y et f ; l'intervalle est guidé.
  - L3 (choisir l'action) : « f continue », « f Lipschitz en y », « f C¹ » : quelle hypothèse donne quoi (existence, unicité locale) ?
  - L4 (libre) : V/F avec contre-exemple à écrire (y′ = 3y^{2/3}, y(0) = 0 : y ≡ 0 et y = t³).
  - L5 (seul) : 4 V/F au format des QCM hebdomadaires (QCM 12, 2022).
- **Générateur** : f(t, y) ∈ {t sin y + y², e^{−t}y, ty², √|y|, y^{2/3}, cos(t)·e^{−y}} ; rectangle avec a, b ∈ {1, 2} ; on garde les tirages où les majorations naturelles (|sin|, |cos| ≤ 1, |t| ≤ a, |y| ≤ |y₀| + b) donnent des entiers. Énoncés V/F : « f continue bornée, y′ = f(x) : solution unique » (V, on intègre) ; « f continue bornée, y′ = f(y) : solution locale unique » (F : 3y^{2/3} tronquée) ; « f ∈ C¹(ℝ²) : solution locale unique » (V) ; « f ∈ C¹(ℝ²) : solution globale » (F : y′ = y², y(0) = 1, y = 1/(1 − t)). Secours : y′ = y, y(0) = 1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∂f/∂y = t cos y + 2y | `partial` |
  | 2 | Sur R : \|t cos y + 2y\| ≤ 1 + 4 = 5 : f est 5-Lipschitz en y | `lipschitz` |
  | 3 | \|f\| ≤ \|t\|·\|sin y\| + y² ≤ 1 + 4 = 5 = K | `bound` |
  | 4 | Solution unique sur \|t\| ≤ min(1, 2/5) = 2/5 | `interval` |
- **Aides** : 1 « Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). » · 2 « |t cos y + 2y| ≤ 1·1 + 2·… » · 3 Ligne 2.
- **Variantes d'examen** : `tf` (énoncés ci-dessus) ; `mcq` : « Une condition suffisante pour une solution unique de y‴ = y″f₂(x) + f₀(y) est » (QCM 12 : f₂ continue, f₀ Lipschitz).
- **Pièges** : `a2_ode_continuity_unique`, `a2_ode_local_global`.
- **Sous-buts → crédit** : `partial` → `a2-partials` ; `lipschitz`, `bound`, `interval` → `a2-ode-cauchy`.

### `a2-ode-separable` — Équations à variables séparables
- **Année** 14 · **Prérequis** `a1-int-direct`, `a1-int-rational`, `g2-hyp-def` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g2-hyp-def` : solutions en tanh (y′ = 4 − y²).
- **Intro** : `y′ = g(x)·h(y)`. (1) Les zéros de h donnent des **solutions constantes** : on les note avant de diviser. (2) Ailleurs, `dy/h(y) = g(x) dx`, on intègre des deux côtés, **une seule constante**. (3) On applique la condition initiale, puis on isole y si possible.
  Exemple : `y′ = 9 − y²`, `y(0) = 0` ; solutions constantes y = ±3 ; `(1/6) ln|(3 + y)/(3 − y)| = x + C` ; C = 0 ; `y = 3(e^{6x} − 1)/(e^{6x} + 1) = 3 th(3x)`.
- **Juge** : `ode` `{eq:"y'=9-y^2", unknown:'y', v:'x', ic:{x:0, y:0}, order:1}`, avec les lignes d'étape de « Lignes d'étape », point 4 : ligne séparée, ligne intégrée, relation implicite H(x, y) = C. · **Forme finale** : y = … explicite qui vérifie `ic` (ou relation implicite si l'énoncé le permet).
- **Niveaux** :
  - L1 (guidé) : solutions constantes données ; séparation et primitives à trous.
  - L2 : il sépare ; la décomposition en éléments simples est guidée.
  - L3 (choisir l'action) : « séparer », « solution constante ? », « appliquer la condition initiale maintenant ou après avoir isolé y ? » (les deux sont justes ; avant est plus simple).
  - L4 (libre) : calcul complet, y compris les cas e^{x−y} (2020 Q13), 6x⁵y² (2018 Q1), ((a + x)/a)·y (2021 Q13).
  - L5 (seul) : QCM « la solution vérifie aussi : y(…) = » au format examen, sans aide.
- **Générateur** : on part de la solution. Familles : h(y) ∈ {y, y², 1 + y², a² − y², e^{−y}, cos²y} et g(x) ∈ {1, x, xᵏ, e^x, cos x, (a + x)/a}. On choisit (x₀, y₀) avec x₀ = 0 en général et y₀ hors des zéros de h (sauf dans 15 % des items, où la réponse est la solution constante : piège `a2_ode_sep_lost_constant`). On calcule la solution exacte, puis le point d'évaluation x₁ où la valeur est « belle » (−1/4 pour th, ln 2, √2). On rejette si x₁ sort de l'intervalle d'existence. Distracteurs : `a2_ode_sep_constant_late`, `a2_ode_sep_lost_constant`, `a2_ode_sign_abs`. Secours : y′ = y, y(0) = 1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 9 − y² = 0 : y = ±3 sont des solutions ; y(0) = 0 n'en est pas une | `constant-sol` |
  | 2 | dy/(9 − y²) = dx | `separate` |
  | 3 | 1/(9 − y²) = (1/6)(1/(3 − y) + 1/(3 + y)) | `partial-frac` |
  | 4 | (1/6) ln\|(3 + y)/(3 − y)\| = x + C | `integrate` |
  | 5 | y(0) = 0 : C = 0 | `ic` |
  | 6 | (3 + y)/(3 − y) = e^{6x} (positif en x = 0, et y reste entre −3 et 3) | `solve` |
  | 7 | y = 3(e^{6x} − 1)/(e^{6x} + 1) | `solve` |
- **Aides** : 1 « Repère les solutions constantes, puis mets les y d'un côté et les x de l'autre. » · 2 « ∫ dy/(9 − y²) = (1/6) ln|…| » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (2018 Q1, 2019 Q13, 2020 Q13, 2021 Q13 ; QCM 12 et 13). `tf` : « La solution générale de y′ = cos t·e^{−y} est ln(sin t + C) » (V, QCM 13) ; « Toute solution de y′ = y/x² sur ]0 ; ∞[ avec y(1) = 0 est nulle » (V : unicité).
- **Pièges** : `a2_ode_sep_constant_late`, `a2_ode_sep_lost_constant`, `a2_ode_sign_abs`.
- **Sous-buts → crédit** : `constant-sol`, `separate` → `a2-ode-separable` ; `partial-frac` → `a1-int-rational` ; `integrate` → `a1-int-direct` ; `ic`, `solve` → `a2-ode-separable`.

### `a2-ode-linear1` — Linéaires du 1er ordre : facteur intégrant
- **Année** 14 · **Prérequis** `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : On écrit d'abord l'équation **avec coefficient 1 devant y′** : `y′ + a(x)y = b(x)`. Avec A une primitive de a, `μ = e^{A}` donne `(μy)′ = μb`, donc `y = e^{−A}(∫ b e^{A} dx + C)`. Raccourcis de l'organigramme : si b = 0, `y = Ce^{−A}` ; si a et b sont constants, on décale vers l'équilibre `y* = b/a` : `y = b/a + Ce^{−ax}`.
  Exemple : `xy′ + 2y = 4x²`, `y(1) = 2`, x > 0 ; `y′ + (2/x)y = 4x` ; `μ = x²` ; `(x²y)′ = 4x³` ; `x²y = x⁴ + C`, C = 1 ; `y = x² + 1/x²`.
- **Juge** : `ode` `{eq:"x*y'+2y=4x^2", unknown:'y', v:'x', ic:{x:1, y:2}, order:1, domain:{x:[0.2,4]}}`. Ligne « μ = … » : μ′/μ = a(x) (README §5). Ligne « (μy)′ = μb » : `equiv` après développement. · **Forme finale** : y = … qui vérifie `ic`.
- **Niveaux** :
  - L1 (guidé) : forme normalisée donnée ; μ et la ligne (μy)′ à trous.
  - L2 : il normalise ; il calcule μ.
  - L3 (choisir l'action) : « normaliser (diviser par cos x) » d'abord, puis « facteur intégrant », « décalage » (coefficients constants), « séparable » (si b = 0).
  - L4 (libre) : calcul complet (2019 Q9 : (x² + 1)y′ + y = 1 ; 2020 Q9 : y′ − 2y = −x² ; 2021 Q9 : cos x·y′ + sin x·y = cos²x).
  - L5 (seul) : QCM « la solution vérifie aussi », sans aide.
- **Générateur** : on part de la solution y = e^{−A}(F + C) : on choisit A ∈ {kx, ln(x^k), −ln cos x, Arctg x, x²/2} et F ∈ {polynôme, x, e^{mx}, sin x}, et on calcule b = (F′)·e^{−A}. On multiplie par un coefficient de tête (x, cos x, x² + 1) dans 60 % des items, pour forcer la normalisation. Condition initiale entière ; point d'évaluation où la valeur est exacte (π/3, tg(1), 1). Distracteurs : `a2_ode_if_not_normalized`, `a2_ode_if_sign`, `a2_ode_if_rhs`, `a2_ode_ic_before_particular`. Secours : y′ + y = x (cours, `y = x − 1 + Ce^{−x}`).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | y′ + (2/x)y = 4x | `normalize` |
  | 2 | μ = e^{∫ 2/x dx} = x² | `mu` |
  | 3 | (x²y)′ = 4x³ | `exact-deriv` |
  | 4 | x²y = x⁴ + C | `integrate` |
  | 5 | y(1) = 2 : 2 = 1 + C, C = 1 | `ic` |
  | 6 | y = x² + 1/x² | `final` |
- **Aides** : 1 « Divise par x pour avoir y′ seul, puis multiplie par μ = e^{∫ a}. » · 2 « μ = e^{2 ln x} = … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2018 Q2, 2019 Q9, 2020 Q9, 2021 Q9 ; QCM 12). `tf` : voir `a2-ode-structure`.
- **Pièges** : `a2_ode_if_not_normalized`, `a2_ode_if_sign`, `a2_ode_if_rhs`, `a2_ode_ic_before_particular`.
- **Sous-buts → crédit** : `normalize`, `mu`, `exact-deriv` → `a2-ode-linear1` ; `integrate` → `a1-int-direct` ; `ic`, `final` → `a2-ode-linear1`.

### `a2-ode-homog-subst` — Équations homogènes : y = x·v
- **Année** 14 · **Prérequis** `a2-ode-separable` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : Si y′ = F(y/x), on pose `y = x·v(x)`. Alors **y′ = v + x·v′** (règle du produit), et l'équation devient séparable : `x v′ = F(v) − v`.
  Exemple : `xy′ = y + x e^{−y/x}`, `y(1) = 0` ; `x(v + xv′) = xv + x e^{−v}` ; `x v′ = e^{−v}` ; `e^{v} = ln x + C`, C = 1 ; `y = x ln(1 + ln x)`.
- **Juge** : `ode` pour l'équation en y ; une ligne en v est jugée avec l'équation transformée (le générateur la fournit : `{eq:"x*v'=e^(-v)", unknown:'v'}`). La ligne « y′ = v + xv′ » est jugée par `equiv` avec y = xv. · **Forme finale** : y = … qui vérifie `ic`.
- **Niveaux** :
  - L1 (guidé) : la substitution est faite ; l'équation en v est à trous.
  - L2 : il écrit y′ en fonction de v ; l'équation en v est guidée.
  - L3 (choisir l'action) : « Est-ce une fonction de y/x ? » (oui, non) ; puis « séparer ».
  - L4 (libre) : calcul complet (2018 : xy′ − y = x cos²(y/x), y(1) = π/4, donc y = x Arctg(ln x + 1)).
  - L5 (seul) : QCM au format examen.
- **Générateur** : on part de F(v) − v ∈ {cos²v, e^{−v}, v², 1 + v², sin v} pour que ∫ dv/(F(v) − v) soit simple ; la solution est y = x·G⁻¹(ln x + C). Condition initiale en x = 1. Secours : xy′ = y + x (y = x ln x + Cx).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | y′ = y/x + e^{−y/x} : c'est une fonction de y/x | `recognize` |
  | 2 | y = xv, y′ = v + xv′ | `substitute` |
  | 3 | v + xv′ = v + e^{−v}, soit xv′ = e^{−v} | `reduce` |
  | 4 | e^{v} dv = dx/x, puis e^{v} = ln x + C | `separate` |
  | 5 | y(1) = 0 : v(1) = 0, donc C = 1 | `ic` |
  | 6 | y = x ln(1 + ln x) | `back` |
- **Aides** : 1 « Pose y = xv et dérive avec la règle du produit. » · 2 « y′ = v + x·… » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_ode_homog_derivative`, constante mal placée).
- **Pièges** : `a2_ode_homog_derivative`.
- **Sous-buts → crédit** : `recognize`, `substitute`, `reduce` → `a2-ode-homog-subst` ; `separate` → `a2-ode-separable` ; `ic`, `back` → `a2-ode-homog-subst`.

### `a2-ode-structure` — Structure des solutions des EDO linéaires
- **Année** 14 · **Prérequis** `l-vec-indep` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `l-vec-indep` : une base de l'espace des solutions est faite de solutions indépendantes.
- **Intro** : Pour une EDO linéaire L(y) = b : les solutions de L(y) = 0 forment un espace vectoriel de dimension égale à l'ordre ; la solution générale est `y = y_h + y_p`. **Superposition** : si L(y₁) = b₁ et L(y₂) = b₂, alors L(y₁ + y₂) = b₁ + b₂. Une combinaison y₀ + C·y₁ de deux solutions de L(y) = b n'est en général pas une solution.
  Exemple : `y″ + y = 2 + 3eˣ` ; `y_{p1} = 2` (pour 2) ; `y_{p2} = (3/2)eˣ` (pour 3eˣ) ; `y = C₁ cos x + C₂ sin x + 2 + (3/2)eˣ`.
- **Juge** : `ode` (lignes y_h, y_p, y) ; `tf` avec contre-exemple numérique. · **Forme finale** : solution générale avec le bon nombre de constantes.
- **Niveaux** :
  - L1 (guidé) : y_h donné ; les deux y_p à trous.
  - L2 : il trouve les deux y_p et les additionne.
  - L3 (choisir l'action) : « Est-ce une solution ? » pour des combinaisons proposées (y_h + y_p, 2y_p, y_p + y_p′…).
  - L4 (libre) : V/F avec contre-exemple : y₀ + C·y₁ (2020 Q22).
  - L5 (seul) : 3 V/F de structure.
- **Générateur** : équations y′ + ay = b₁ + b₂ ou y″ + py′ + qy = b₁ + b₂ avec b₁, b₂ ∈ {constante, eᵐˣ, polynôme de degré 1}, sans résonance. Énoncés V/F : « y₀ + Cy₁ résout y′ + y = 1 si y₀ résout y′ + y = 0 et y₁ résout y′ + y = 1 » (F : C = 2 donne 2) ; « y_h + y_p est solution pour tout y_h » (V) ; « la différence de deux solutions de L(y) = b résout L(y) = 0 » (V). Secours : y′ + y = 1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | y_h = C₁ cos x + C₂ sin x | `homog` |
  | 2 | Pour 2 : y_{p1} = 2 | `particular` |
  | 3 | Pour 3eˣ : y_{p2} = Aeˣ, 2A = 3, y_{p2} = (3/2)eˣ | `particular` |
  | 4 | y = C₁ cos x + C₂ sin x + 2 + (3/2)eˣ | `superpose` |
- **Aides** : 1 « Une solution particulière par morceau du second membre, puis on additionne. » · 2 « (Aeˣ)″ + Aeˣ = …·Aeˣ » · 3 Ligne 3.
- **Variantes d'examen** : `tf` (2020 Q22 et énoncés ci-dessus).
- **Pièges** : `a2_ode_superposition_nonhom`, `a2_ode_constant_count`.
- **Sous-buts → crédit** : `homog` → `a2-ode-const2` ; `particular` → `a2-ode-particular` ; `superpose` → `a2-ode-structure`.

### `a2-ode-const2` — 2e ordre homogène à coefficients constants
- **Année** 14 · **Prérequis** `a2-ode-structure`, `@alg:H-discriminant`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-ode-structure` : y = C₁y₁ + C₂y₂ : espace de dimension 2 ; `g8-polar` : e^{(α+iβ)x} = e^{αx}(cos βx + i sin βx).
- **Intro** : `ay″ + by′ + cy = 0` → équation caractéristique `ar² + br + c = 0`. Deux racines réelles r₁ ≠ r₂ : `C₁e^{r₁x} + C₂e^{r₂x}`. Racine double r : `(C₁ + C₂x)e^{rx}`. Racines α ± iβ : `e^{αx}(C₁ cos βx + C₂ sin βx)`. Deux conditions initiales fixent C₁ et C₂.
  Exemple : `y″ − 4y′ + 13y = 0`, `y(0) = 1`, `y′(0) = 0` ; `r = 2 ± 3i` ; `y = e^{2x}(C₁ cos 3x + C₂ sin 3x)` ; C₁ = 1, 2C₁ + 3C₂ = 0 ; `y = e^{2x}(cos 3x − (2/3) sin 3x)`.
- **Juge** : `solset` `{v:'r', complex:true}` pour les racines ; `ode` `{order:2}` pour y_h et la solution ; `system` (2 × 2 linéaire) pour les constantes. · **Forme finale** : solution générale (2 constantes) ou solution du problème de Cauchy.
- **Niveaux** :
  - L1 (guidé) : équation caractéristique donnée ; racines et forme à trous.
  - L2 : il écrit l'équation caractéristique ; la forme est à choisir parmi 3 (réelles, double, complexes).
  - L3 (choisir l'action) : arbre « Δ > 0 / Δ = 0 / Δ < 0 », puis forme.
  - L4 (libre) : solution du problème de Cauchy.
  - L5 (seul) : QCM au format QCM 13 (« la solution générale de y″ − 4y′ + 4y = 0 est »).
- **Générateur** : on part des racines : (r₁, r₂) entiers distincts de −4 à 4, racine double entière, ou α ± iβ avec α ∈ {−2, …, 2}, β ∈ {1, 2, 3}. On construit l'équation (coefficient a ∈ {1, 2, 3}). Conditions initiales entières ; on rejette si C₁ ou C₂ a un dénominateur > 6. Secours : y″ + y = 0, y(0) = 0, y′(0) = 1.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | r² − 4r + 13 = 0 ; Δ = 16 − 52 = −36 | `char` |
  | 2 | r = 2 ± 3i | `roots` |
  | 3 | y = e^{2x}(C₁ cos 3x + C₂ sin 3x) | `form` |
  | 4 | y(0) = C₁ = 1 ; y′(0) = 2C₁ + 3C₂ = 0, C₂ = −2/3 | `ic` |
  | 5 | y = e^{2x}(cos 3x − (2/3) sin 3x) | `final` |
- **Aides** : 1 « Remplace y par e^{rx} : tu obtiens r² − 4r + 13 = 0. » · 2 « r = 2 ± …i, donc y = e^{2x}(C₁ cos …x + C₂ sin …x) » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `a2_ode_double_root`, `a2_ode_complex_swap`, `a2_ode_char_sign`). `tf` : « Les solutions de y″ + 4y = 0 sont bornées » (V).
- **Pièges** : `a2_ode_double_root`, `a2_ode_complex_swap`, `a2_ode_char_sign`.
- **Sous-buts → crédit** : `char`, `roots` → `@alg:H-discriminant` ; `form` → `a2-ode-const2` ; `ic` → `@alg:E-systemes-2x2` ; `final` → `a2-ode-const2`.

### `a2-ode-wronskian` — Wronskien et réduction d'ordre
- **Année** 14 · **Prérequis** `a2-ode-linear1`, `a2-ode-structure` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-ode-linear1` : réduction d'ordre : l'équation en v′ est linéaire du 1er ordre.
- **Intro** : Pour y″ + p(t)y′ + q(t)y = 0 : `W = y₁y₂′ − y₁′y₂`. Si y₁ et y₂ sont des solutions, W est soit identiquement nul (solutions dépendantes), soit jamais nul. **Formule d'Abel** : `W(t) = W(t₀)·e^{−∫_{t₀}^t p}`. Réduction d'ordre : si on connaît y₁, `(y₂/y₁)′ = W/y₁²`, donc `y₂ = y₁·∫ W/y₁²`. Attention : p est le coefficient de y′ **après** division par le coefficient de y″.
  Exemple : `ty″ + (1 − 2t)y′ + (t − 1)y = 0`, t > 0, y₁ = eᵗ ; `p = 1/t − 2` ; `W = e^{2t}/t` ; `(y₂/y₁)′ = 1/t` ; `y₂ = eᵗ ln t`.
- **Juge** : `ode` (vérifier y₁, puis y₂) ; `equiv` `{vars:['t'], domain:{t:[0.2,4]}}` pour p, W et (y₂/y₁)′ (W est accepté à une constante multiplicative près : on compare W′/W). · **Forme finale** : y₂ (à constante près) et la solution générale.
- **Niveaux** :
  - L1 (guidé) : vérification de y₁ guidée ; W donné ; y₂ à trous.
  - L2 : il normalise et calcule W par Abel.
  - L3 (choisir l'action) : « Abel », « poser y = y₁·u et remplacer » (les deux sont justes ; Abel est plus court).
  - L4 (libre) : calcul complet ; V/F sur le Wronskien.
  - L5 (seul) : QCM au format QCM 13 (« A : eᵗ est solution. B : la solution générale est (λ ln t + μ)eᵗ »).
- **Générateur** : on part de y₁ et y₂ : paires {(eᵗ, eᵗ ln t), (t, t ln t), (t, t²), (eᵗ, teᵗ), (t, 1/t), (cos t, sin t)} ; on reconstruit l'équation `y″ + py′ + qy = 0` avec p = −W′/W et q = −(y₁″ + py₁′)/y₁, et on multiplie par un facteur (t, t²) pour la rendre polynomiale. Secours : y″ − 2y′ + y = 0, y₁ = eᵗ.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | y₁ = eᵗ : eᵗ(t + 1 − 2t + t − 1) = 0 : c'est une solution | `check` |
  | 2 | y″ + (1/t − 2)y′ + … = 0 : p = 1/t − 2 | `normalize` |
  | 3 | W = e^{−∫ p} = e^{2t − ln t} = e^{2t}/t | `abel` |
  | 4 | (y₂/y₁)′ = W/y₁² = 1/t | `reduce` |
  | 5 | y₂ = eᵗ ln t ; y = (C₁ + C₂ ln t)eᵗ | `final` |
- **Aides** : 1 « Divise par t pour lire p, puis W = e^{−∫ p}. » · 2 « (y₂/y₁)′ = W/y₁² = (e^{2t}/t)/e^{…} » · 3 Ligne 4.
- **Variantes d'examen** : `mcq` (QCM 13). `tf` : « Si W(y₁, y₂)(t₀) = 0 pour des solutions y₁, y₂, alors W ≡ 0 » (V) ; « W = W(t₀)·e^{+∫ p} » (F) ; « x² et x|x| ont un Wronskien nul, donc elles sont dépendantes » (F : elles ne sont pas solutions d'une même équation à coefficients continus, et elles sont indépendantes sur [−1 ; 1]).
- **Pièges** : `a2_wronskian_abel_sign`, `a2_ode_if_not_normalized`.
- **Sous-buts → crédit** : `check` → `a2-ode-structure` ; `normalize`, `abel`, `reduce` → `a2-ode-wronskian` ; `final` → `a2-ode-structure`.

### `a2-ode-particular` — Solution particulière, résonance, problème de Cauchy
- **Année** 14 · **Prérequis** `a2-ode-const2` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : Pour `ay″ + by′ + cy = P(x)e^{mx}` (ou cos/sin kx), on essaie `y_p = Q(x)e^{mx}` avec deg Q = deg P. **Résonance** : si m (ou ik) est racine de l'équation caractéristique, on multiplie par x (par x² si la racine est double). Pour cos kx **ou** sin kx, on prend **les deux** : A cos kx + B sin kx. Ensuite, y = y_h + y_p, et **seulement à la fin** on applique les conditions initiales.
  Exemple : `y″ − 3y′ + 2y = 4e^{2x}` ; racines 1 et 2 : 2 est racine, résonance ; `y_p = Axe^{2x}`, `y_p″ − 3y_p′ + 2y_p = Ae^{2x}`, A = 4 ; `y = C₁eˣ + C₂e^{2x} + 4xe^{2x}`.
- **Juge** : `ode` `{order:2}` : ligne « y_p = … » sans constante (vérifie l'équation complète), ligne y_h, ligne y, ligne de Cauchy. Ligne de décision « forme de y_p » : `decision` avec les formes candidates ; la bonne forme est celle qui contient une solution. · **Forme finale** : solution générale, ou solution qui respecte `ic`, ou la valeur u(x₁) demandée.
- **Niveaux** :
  - L1 (guidé) : forme de y_p donnée (avec x) ; coefficients à trous.
  - L2 : forme à choisir parmi 3 (sans x, avec x, avec x²) ; puis les coefficients.
  - L3 (choisir l'action) : arbre « m racine ? simple ou double ? », puis forme, puis calcul.
  - L4 (libre) : problème de Cauchy complet (2019 Q15 : u″ − 6u′ + 9u = 27t ; 2018 Q3 : u″ − 2u′ + 5u = 17 sin 2t ; 2021 Q15 : u″ + 9u = sin 3x).
  - L5 (seul) : QCM « u(π) = » sans aide ; ou problème (voir « Exemples de type examen »).
- **Générateur** : on part des racines (comme `a2-ode-const2`) et du second membre : P(x) de degré 0 ou 1, eᵐˣ, cos kx ou sin kx, avec m ou ik racine dans 50 % des items. On choisit y_p à coefficients entiers ou de petits dénominateurs (≤ 6), on calcule le second membre, on choisit les conditions initiales pour que C₁, C₂ soient simples, et le point x₁ ∈ {π, 2/3, 1, π/2} où la valeur est exacte. Distracteurs : `a2_ode_resonance_no_x`, `a2_ode_yp_incomplete`, `a2_ode_ic_before_particular`. Secours : 2021 Q15, `u″ + 9u = sin 3x`, u(0) = π/6, u′(0) = −1/6, u(π) = 0.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | r² − 3r + 2 = 0 : r = 1, r = 2 ; y_h = C₁eˣ + C₂e^{2x} | `homog` |
  | 2 | Second membre 4e^{2x}, m = 2 est racine simple : y_p = Axe^{2x} | `form` |
  | 3 | y_p′ = A(1 + 2x)e^{2x}, y_p″ = A(4 + 4x)e^{2x} | `derive` |
  | 4 | A[(4 + 4x) − 3(1 + 2x) + 2x]e^{2x} = Ae^{2x} = 4e^{2x} : A = 4 | `coeffs` |
  | 5 | y = C₁eˣ + C₂e^{2x} + 4xe^{2x} | `general` |
- **Aides** : 1 « 2 est-il racine de l'équation caractéristique ? Si oui, multiplie la forme habituelle par x. » · 2 « y_p = A·x·e^{…} » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (2018 Q3, 2019 Q15, 2021 Q15 ; QCM 13 Q8). `tf` : « Pour y″ + 9y = sin 3x, il existe une solution particulière de la forme A sin 3x » (F : résonance ; A sin 3x donne 0).
- **Pièges** : `a2_ode_resonance_no_x`, `a2_ode_yp_incomplete`, `a2_ode_ic_before_particular`, `a2_ode_constant_count`.
- **Sous-buts → crédit** : `homog` → `a2-ode-const2` ; `form`, `derive`, `coeffs` → `a2-ode-particular` ; `general` → `a2-ode-structure`.

### `a2-ode-choose` — Choisir la méthode (organigramme des EDO)
- **Année** 14 · **Prérequis** `a2-ode-separable`, `a2-ode-linear1`, `a2-ode-homog-subst`, `a2-ode-particular` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : L'organigramme se lit de haut en bas.
  1. **Ordre ?** Ordre 1 : étape 2. Ordre n linéaire à coefficients constants : étape 6.
  2. **Séparable ?** Peut-on écrire y′ = g(x)·h(y) ? Si oui : noter les zéros de h (solutions « singulières » constantes), diviser, intégrer.
  3. **Linéaire ?** y′ = a(x)y + b(x) ? Si b = 0 : raccourci exponentiel `y = Ce^{∫a}`. Si a et b sont constants : décaler `y = y* + z` pour que le second membre disparaisse. Sinon : facteur intégrant, `y = Ce^{G} + e^{G}∫ b e^{−G}`, avec G = ∫a.
  4. **Homogène ?** y′ = F(y/x) ? Si oui : y = xv.
  5. (*opt.*) Bernoulli (y′ + ay = by^α, z = y^{1−α}) ; forme exacte (M dx + N dy avec M_y = N_x).
  6. **Ordre n à coefficients constants** : équation caractéristique, puis y_p selon le second membre (résonance ?), puis conditions initiales. Coefficients variables et une solution connue : réduction d'ordre (Wronskien).

  Une équation peut entrer dans plusieurs cases : y′ = xy est séparable **et** linéaire. Les deux chemins sont justes ; on prend le plus court.
  Exemple : `y′ = 2y − 6` ; ordre 1 ; séparable (y′ = 2(y − 3)) **et** linéaire à coefficients constants ; décalage : `y = 3 + z`, `z′ = 2z` ; `y = 3 + Ce^{2x}`.
- **Juge** : suite de lignes `decision` (§5.3) qui suivent l'organigramme, puis le juge de la méthode choisie (`ode`). Les options ont `valid` et `quality` ; une option `valid:false` donne son `why` tout de suite. · **Forme finale** : la méthode (au niveau L1 à L3), puis la solution (L4 et L5).
- **Niveaux** :
  - L1 (guidé) : l'organigramme est affiché, la case active est en évidence ; l'élève répond oui/non à chaque question.
  - L2 : organigramme affiché ; il choisit la case finale directement.
  - L3 (choisir l'action) : série éclair de 6 équations mélangées : il touche la méthode (séparable, linéaire, y = xv, coefficients constants, réduction d'ordre) en moins de 20 s chacune.
  - L4 (libre) : méthode, puis la première ligne de calcul (μ = …, y = xv, r² + … = 0).
  - L5 (seul) : équation mélangée résolue en entier, sans organigramme.
- **Générateur** : on tire la case d'arrivée, puis une équation de la compétence correspondante (son générateur). Dans 30 % des items, l'équation est dans deux cases (séparable et linéaire : y′ = a(x)y ; linéaire à coefficients constants et séparable : y′ = ay + b) ; les deux options sont `valid:true`, la plus courte a `quality:'good'`. Leurres : « séparable » pour y′ = x + y (`valid:false`, `why` : « x + y n'est pas un produit g(x)·h(y) ») ; « linéaire » pour y′ = y² (`valid:false`). Secours : y′ = y.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Ordre 1 | `order` |
  | 2 | y′ = 2(y − 3) : séparable, et aussi linéaire à coefficients constants | `classify` |
  | 3 | Choix : décalage, y = 3 + z (3 est la solution constante) | `method` |
  | 4 | z′ = 2z, donc z = Ce^{2x} | `solve` |
  | 5 | y = 3 + Ce^{2x} | `final` |
- **Aides** : 1 « Suis l'organigramme : ordre, puis séparable ?, puis linéaire ? » · 2 « Cherche la solution constante : 2y − 6 = 0 donne y = … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` « Quelle méthode ? » (sans valeur d'examen directe : les examens donnent l'équation, et l'élève doit choisir seul). Le poids d'examen compte les questions d'EDO où le type n'est pas dit (2019 Q9, Q13 ; 2020 Q9, Q13 ; 2021 Q9, Q13).
- **Pièges** : `a2_ode_method_separable_sum`, `a2_ode_method_linear_nonlinear`.
- **Sous-buts → crédit** : `order`, `classify`, `method` → `a2-ode-choose` ; `solve`, `final` → compétence de la méthode choisie (`a2-ode-separable`, `a2-ode-linear1`, `a2-ode-homog-subst`, `a2-ode-particular`).

### `a2-ode-stability` — Stabilité selon un paramètre
- **Année** 14 · **Prérequis** `a2-ode-const2`, `@alg:I-parametres` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : Toutes les solutions de `y″ + py′ + qy = 0` tendent vers 0 en +∞ si et seulement si les deux racines ont une **partie réelle < 0**. Pour le 2e ordre, c'est équivalent à **p > 0 et q > 0** (somme −p < 0 et produit q > 0 ; en cas de racines complexes, la partie réelle vaut −p/2). Les bornes ne sont pas comprises : une racine nulle donne les constantes, une racine imaginaire pure donne des oscillations qui ne s'amortissent pas.
  Exemple : `y″ + (a − 1)y′ + (4 − a²)y = 0` ; `a − 1 > 0` et `4 − a² > 0` ; `a ∈ ]1 ; 2[` ; en a = 2, r = 0 est racine : y = 1 est une solution qui ne tend pas vers 0.
- **Juge** : `solset` `{v:'a', domain:[-10,10]}` pour l'ensemble final ; `equiv` pour l'équation caractéristique. · **Forme finale** : intervalle (ou union) de valeurs du paramètre.
- **Niveaux** :
  - L1 (guidé) : critère p > 0, q > 0 affiché ; inégalités à trous.
  - L2 : il écrit les deux inégalités ; il les résout.
  - L3 (choisir l'action) : « critère des coefficients », « calculer les racines selon Δ » (`quality:'poor'` : trois cas à traiter).
  - L4 (libre) : ensemble complet avec la discussion des bornes.
  - L5 (seul) : QCM au format 2020 Q15 (« X = ]−1 ; +∞[ »).
- **Générateur** : p(a) et q(a) affines ou quadratiques en a avec des racines entières ; on calcule l'ensemble {p > 0, q > 0}, qui doit être un intervalle non vide et non égal à ℝ. Distracteurs : intervalle fermé (`a2_ode_stability_boundary`), seulement p > 0 ou seulement q > 0 (`a2_ode_stability_one_coef`), Δ < 0 (`a2_ode_stability_discriminant`). Secours : 2020 Q15, `y″ + (α + 1)y′ + y/4 = 0`, X = ]−1 ; +∞[.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | r² + (a − 1)r + (4 − a²) = 0 | `char` |
  | 2 | Toutes les solutions → 0 ⇔ Re r₁ < 0 et Re r₂ < 0 ⇔ a − 1 > 0 et 4 − a² > 0 | `criterion` |
  | 3 | a > 1 et −2 < a < 2 | `solve` |
  | 4 | a ∈ ]1 ; 2[ ; en a = 1 (r = ±i√3) et en a = 2 (r = 0), certaines solutions ne tendent pas vers 0 | `boundary` |
- **Aides** : 1 « Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0. » · 2 « a − 1 > 0 et 4 − a² … 0 » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (2020 Q15). `tf` : « Si p > 0, toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 » (F : q = −1, p = 1 donne une racine positive).
- **Pièges** : `a2_ode_stability_boundary`, `a2_ode_stability_one_coef`, `a2_ode_stability_discriminant`.
- **Sous-buts → crédit** : `char` → `a2-ode-const2` ; `criterion` → `a2-ode-stability` ; `solve` → `@alg:I-parametres` ; `boundary` → `a2-ode-stability`.

### `a2-ode-subst-other` — Autres changements de variable : Bernoulli, Euler
- **Année** 14 · **Prérequis** `a2-ode-linear1`, `a2-ode-const2` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `a2-ode-const2` : Euler : x = eᵗ donne des coefficients constants.
- **Intro** : Bernoulli `y′ + a(x)y = b(x)y^α` (α ≠ 0, 1) : on pose `z = y^{1−α}` ; l'équation en z est linéaire. Euler `x²y″ + bxy′ + cy = f(x)` (x > 0) : on pose `x = eᵗ` (ou on essaie y = x^m) ; l'équation devient à coefficients constants.
  Exemple : `y′ + y = eˣy²` ; `z = 1/y`, `z′ = −y′/y² = −eˣ + z` ; `z′ − z = −eˣ`, `z = (C − x)eˣ` ; `y = e^{−x}/(C − x)`.
- **Juge** : `ode` (équation en y, puis équation transformée fournie par le générateur). · **Forme finale** : y = ….
- **Niveaux** :
  - L1 (guidé) : la substitution est donnée ; l'équation en z à trous.
  - L2 : il calcule z′ ; puis il résout (`a2-ode-linear1`).
  - L3 (choisir l'action) : « Bernoulli (α = ?) », « Euler », « aucun ».
  - L4 (libre) : calcul complet (QCM 13 : y′ − y/t − y² = 0 avec y = −1/z ; x²y″ + xy′ − y = x²).
  - L5 (seul) : un exercice de chaque type.
- **Générateur** : Bernoulli : α ∈ {2, 3, 1/2}, a constant ou 1/x, b ∈ {1, eˣ, x} ; on part de z (solution de l'équation linéaire) et on vérifie que y = z^{1/(1−α)} reste réel sur l'intervalle. Euler : racines de m(m − 1) + bm + c = 0 entières ; second membre x^k sans résonance. Secours : y′ = y + y².
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | α = 2 : z = y^{−1} | `substitute` |
  | 2 | z′ = −y′/y² = −(eˣy² − y)/y² = −eˣ + z | `transform` |
  | 3 | z′ − z = −eˣ : μ = e^{−x}, (ze^{−x})′ = −1, z = (C − x)eˣ | `linear` |
  | 4 | y = e^{−x}/(C − x) | `back` |
- **Aides** : 1 « Bernoulli avec α = 2 : pose z = 1/y. » · 2 « z′ = −y′/y² = … » · 3 Ligne 2.
- **Variantes d'examen** : `mcq` (QCM 13 Q4 et Q9).
- **Pièges** : `a2_ode_homog_derivative` (même erreur de dérivée composée : z′ = 1/y′).
- **Sous-buts → crédit** : `substitute`, `transform` → `a2-ode-subst-other` ; `linear` → `a2-ode-linear1` ; `back` → `a2-ode-subst-other`.

### `a2-ode-exact` — Équations exactes
- **Année** 14 · **Prérequis** `a2-partials` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Intro** : `M(x, y) dx + N(x, y) dy = 0` est exacte si `∂M/∂y = ∂N/∂x` (sur un domaine simplement connexe). Il existe alors H avec `H_x = M`, `H_y = N`, et les solutions vérifient `H(x, y) = C`. On trouve H en intégrant M en x, puis on ajuste la « constante » φ(y) avec N.
  Exemple : `(2xy + 3) dx + (x² + 4y) dy = 0`, `y(0) = 1` ; `M_y = 2x = N_x` ; `H = x²y + 3x + φ(y)`, `H_y = x² + φ′(y) = x² + 4y`, `φ = 2y²` ; `x²y + 3x + 2y² = 2`.
- **Juge** : `equiv` pour M_y et N_x ; `equiv` `{vars:['x','y']}` pour H (comparé par ses dérivées, à une constante près) ; relation implicite de « Lignes d'étape », point 4. · **Forme finale** : H(x, y) = C avec C fixé par la condition initiale.
- **Niveaux** :
  - L1 (guidé) : test d'exactitude à trous ; H à trous.
  - L2 : il teste ; il intègre M ; φ est guidée.
  - L3 (choisir l'action) : « Exacte ? » ; « intégrer M en x » ou « N en y ».
  - L4 (libre) : calcul complet (QCM 13 Q3 : 2x/(1 + (x² + y)²) + y′/(1 + (x² + y)²) = 0, H = Arctg(x² + y)).
  - L5 (seul) : exercice complet.
- **Générateur** : on part de H (polynôme en x, y de degré ≤ 3, ou Arctg(x² + y), e^{xy}) ; M = H_x, N = H_y ; condition initiale entière. Secours : x dx + y dy = 0.
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | M_y = 2x, N_x = 2x : exacte | `test` |
  | 2 | H = ∫ M dx = x²y + 3x + φ(y) | `integrate` |
  | 3 | H_y = x² + φ′(y) = x² + 4y, donc φ = 2y² | `adjust` |
  | 4 | x²y + 3x + 2y² = C ; y(0) = 1 donne C = 2 | `ic` |
- **Aides** : 1 « Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M. » · 2 « H = x²y + 3x + φ(y), et H_y doit valoir … » · 3 Ligne 3.
- **Variantes d'examen** : `mcq` (QCM 13 Q3).
- **Pièges** : `a2_exact_phi_forgot`.
- **Sous-buts → crédit** : `test` → `a2-partials` ; `integrate`, `adjust`, `ic` → `a2-ode-exact`.

### `a2-ode-system` — Systèmes linéaires X′ = AX
- **Année** 14 · **Prérequis** `a2-ode-const2`, `l-eig-diag` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `a2-ode-const2` : une équation d'ordre 2 s'écrit comme un système ; `l-eig-diag` : A = PDP⁻¹.
- **Intro** : Si A est diagonalisable, de valeurs propres λᵢ et vecteurs propres vᵢ, `X(t) = Σ Cᵢ e^{λᵢt} vᵢ`. Les constantes viennent de X(0) = Σ Cᵢvᵢ. Une équation d'ordre 2 s'écrit comme un système (x₁ = y, x₂ = y′).
  Exemple : `X′ = [[1, 2], [2, 1]]X`, `X(0) = (2, 0)` ; λ = 3, v = (1, 1) ; λ = −1, v = (1, −1) ; `C₁ = C₂ = 1` ; `X = (e^{3t} + e^{−t}, e^{3t} − e^{−t})`.
- **Juge** : `eigvec` pour les vecteurs propres ; `ode` vectoriel (chaque composante vérifie X′ = AX, 3 tirages de constantes) ; `rowops` ou `value` pour les constantes. · **Forme finale** : X(t) explicite.
- **Niveaux** :
  - L1 (guidé) : valeurs propres données ; vecteurs propres et constantes à trous.
  - L2 : il calcule les valeurs propres et les vecteurs propres.
  - L3 (choisir l'action) : « diagonaliser », « éliminer une variable » (`quality:'poor'` en 2 × 2 : juste mais plus long à écrire).
  - L4 (libre) : calcul complet ; réécrire y″ + 3y′ + 2y = 0 en système.
  - L5 (seul) : système 2 × 2 avec condition initiale.
- **Générateur** : on part de P (vecteurs propres entiers, det ±1 ou ±2) et de D (valeurs propres entières distinctes), A = PDP⁻¹ entière ; X(0) combinaison entière des colonnes de P. Secours : A = diag(1, −1).
- **Corrigé type** :

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | det(A − λI) = (1 − λ)² − 4 = 0 : λ = 3, λ = −1 | `eigval` |
  | 2 | v₁ = (1, 1), v₂ = (1, −1) | `eigvec` |
  | 3 | X = C₁e^{3t}(1, 1) + C₂e^{−t}(1, −1) | `general` |
  | 4 | X(0) = (2, 0) : C₁ + C₂ = 2, C₁ − C₂ = 0 ; C₁ = C₂ = 1 | `ic` |
- **Aides** : 1 « Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. » · 2 « (1 − λ)² = 4 » · 3 Ligne 3.
- **Variantes d'examen** : aucune (absent des examens 2019–2021) ; sert de pont vers le module M.
- **Pièges** : `a2_ode_system_order`.
- **Sous-buts → crédit** : `eigval`, `eigvec` → `l-eig-charpoly`, `l-eig-space` ; `general`, `ic` → `a2-ode-system`.

## Pièges du module

Conventions de la colonne « transformation » : `prev` est la ligne précédente de l'élève, `item` les données du générateur. « wrongValues » veut dire que le piège produit des réponses finales fausses (QCM, V/F, dernière ligne), et pas une ligne intermédiaire. Les sources marquées « QCM 20xx Qn » sont des distracteurs d'examens officiels : l'équipe du cours les a choisis parce que des étudiants les donnent.

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `a2_topo_not_open_closed` | logic | E | `a2-rn-topology` | `a2-rn-boundary` | « pas ouvert, donc fermé » → ni l'un ni l'autre | wrongValues : on remplace la case « fermé » par la négation de la case « ouvert » | « Ouvert et fermé ne sont pas contraires. Ton ensemble contient le point {p₁} du bord, mais pas {p₂} : il n'est ni ouvert ni fermé. » |
| `a2_topo_trivial_atom` | logic | E | `a2-rn-topology` | `g1-bound` | {1 ≥ −25x² − 15y² > a} « ni ouvert ni fermé » → ouvert | wrongValues : on classe l'ensemble en comptant aussi l'atome toujours vrai (mélange large + strict) | « L'inégalité {atome} est toujours vraie : elle n'enlève aucun point. Il reste seulement {reste}, qui est strict : l'ensemble est ouvert. » |
| `a2_topo_cylinder` | geometry | E | `a2-rn-topology` | `a2-rn-topology` | {x² + y² ≤ 1} ⊂ ℝ³ « borné » → non borné | wrongValues : « borné » calculé en ne regardant que les variables présentes dans les atomes | « Dans ℝ³, z n'apparaît pas : (0, 0, {z}) est dans l'ensemble pour tout z. C'est un cylindre infini. » |
| `a2_bd_union` | logic | E | `a2-rn-boundary` | `a2-rn-boundary` | ∂(A ∪ B) = ∂A ∪ ∂B → seulement ⊂ | wrongValues : V au lieu de F ; contre-exemple affiché : deux carrés qui se touchent | « Le point {p} est dans ∂A, mais il est à l'intérieur de A ∪ B : B comble le trou. » |
| `a2_bd_isolated` | geometry | E | `a2-rn-boundary` | `a2-rn-boundary` | point isolé oublié dans ∂E | transform : la liste des morceaux de `prev` moins les points isolés | « Toute boule autour de {p} contient {p} (dans E) et des points hors de E : {p} est dans le bord. » |
| `a2_seq_one_component` | calculus | E | `a2-rn-sequences` | `a1-seq-monotone` | « une composante converge, donc la suite converge » | wrongValues : on déclare convergente toute option dont au moins une composante converge | « La 1re composante converge, mais la 2e vaut {valeurs} et alterne : une suite de ℝ² converge seulement si **chaque** composante converge. » |
| `a2_curve_sign_factor` | calculus | E | `a2-curve-param` | `a1-fn-ivt` | sign(t)·(eᵗ − 1) « discontinue » → continue | wrongValues : on marque discontinue toute composante qui contient sign(t) | « sign(t) saute en 0, mais eᵗ − 1 vaut 0 en 0 : le produit tend vers 0 des deux côtés. La composante est continue. » |
| `a2_arc_sum_components` | calculus | E | `a2-curve-length` | `a2-curve-length` | ∫ (x′ + y′ + z′) dt → ∫ √(x′² + y′² + z′²) dt | transform : remplace ‖γ′‖ par la somme des composantes de γ′ | « La vitesse est la norme du vecteur γ′, pas la somme de ses composantes. » |
| `a2_lim_lines_only` | calculus | C (fiche d'Analyse II) | `a2-lim-paths` | `a2-lim-paths` | « toutes les droites donnent 0, donc la limite vaut 0 » → n'existe pas (chemin y = x²) | wrongValues : la limite le long de y = mx (la même pour tout m) quand la vraie réponse est « n'existe pas » | « Toutes les droites donnent {L}, mais le long de y = {chemin}, f vaut {valeur}. Une limite doit être la même sur **tous** les chemins, pas seulement sur les droites. » |
| `a2_lim_iterated` | calculus | E | `a2-lim-paths` | `a2-lim-paths` | lim_x lim_y f = lim_y lim_x f → la limite n'existe pas forcément | wrongValues : lim_{x→0} lim_{y→0} f | « Les limites itérées ne regardent que deux chemins, les axes. Avec y = x, on trouve {valeur}. » |
| `a2_lim_function_answer` | notation | C (QCM 2020 Q3) | `a2-lim-paths` | `a2-lim-polar` | « lim = y² » → une limite est un nombre | wrongValues : la limite en x seul, y gardé comme variable | « Une limite en (0, 0) ne peut pas contenir y : x et y tendent vers 0 en même temps. » |
| `a2_lim_polar_theta` | calculus | E | `a2-lim-polar` | `g1-bound` | « r → 0, donc l'expression → 0 » alors qu'un terme dépend de φ seul | transform : dans la forme polaire de `prev`, on remplace chaque facteur qui dépend de φ par sa valeur en φ = 0, puis on prend la limite r → 0 | « Le terme {terme} ne contient pas r : il vaut {v₁} pour φ = 0 et {v₂} pour φ = π/4. La limite dépend de la direction : elle n'existe pas. » |
| `a2_lim_polar_r_forgot` | calculus | E | `a2-lim-polar` | `a2-lim-polar` | r·cos²φ sin φ « dépend de φ, donc pas de limite » → tend vers 0 | wrongValues : « n'existe pas » quand la forme polaire est r^k·g(φ) avec k ≥ 1 et g bornée | « Ton expression dépend de φ, mais elle est multipliée par r^{k} : \|f\| ≤ {M}·r^{k} → 0. La dépendance en φ ne gêne que si elle reste quand r → 0. » |
| `a2_cont_partial_functions` | calculus | E | `a2-continuity` | `a2-lim-paths` | x ↦ f(x, 0) et y ↦ f(0, y) continues ⇒ f continue → faux | wrongValues : V au lieu de F | « Les fonctions partielles ne regardent que les axes. xy/(x² + y²) vaut 0 sur les axes et 1/2 sur y = x. » |
| `a2_compact_open` | logic | E | `a2-compact-extreme` | `a2-rn-topology` | « continue sur un ouvert ⇒ (non) bornée » | wrongValues : la conclusion du théorème des bornes atteintes appliquée sans « fermé et borné » | « Le théorème demande D fermé **et** borné. Sur {D}, la fonction {f} est un contre-exemple. » |
| `a2_open_image` | logic | E | `a2-compact-extreme` | `a2-compact-extreme` | f(U) ouvert si U ouvert → faux | wrongValues : V au lieu de F | « f = 0 est continue, et f(ℝⁿ) = {0} n'est pas ouvert. C'est l'**image réciproque** d'un ouvert qui est ouverte. » |
| `a2_jacobian_transposed` | linear | C (QCM 2019 Q6) | `a2-partials` | `l-mat-product` | J_u de taille n × m → m × n | transform : transposée de la matrice de `prev` (proposée seulement si m ≠ n ou si elle diffère) | « J_u a une ligne par composante ({m}) et une colonne par variable ({n}). Tu as écrit la transposée. » |
| `a2_schwarz_no_c2` | calculus | E | `a2-partials` | `a2-diff-implications` | ∂²f/∂x∂y = ∂²f/∂y∂x toujours → seulement si f ∈ C² | wrongValues : V pour l'énoncé sans hypothèse C² ; contre-exemple K7 | « Schwarz demande f ∈ C². Pour K7, ∂/∂y(∂f/∂x)(0, 0) = −1 et ∂/∂x(∂f/∂y)(0, 0) = 1. » |
| `a2_dirderiv_gradient` | calculus | C (QCM 2021 Q16) | `a2-dir-deriv-def` | `a2-diff-implications` | D_v f(0, 0) = ∇f(0, 0)·v = 0 → limite de la définition | wrongValues : ∇f(a)·v avec ∇f calculé par la définition | « ∇f·v = {produit} suppose f différentiable en (0, 0). La définition donne {vraie} : c'est la preuve que f n'y est **pas** différentiable. » |
| `a2_dirderiv_power` | calculus | E | `a2-dir-deriv-def` | `@alg:G-simplifier` | puissance de t mal simplifiée dans f(tv)/t | transform : dans `prev`, on remplace t^k par t^{k±1} au numérateur, puis on prend la limite | « Compte les puissances de t : le numérateur a t^{a}, le dénominateur t^{b}, et tu divises encore par t. » |
| `a2_partials_imply_diff` | logic | C (QCM 2018 Q7, 2020 Q14) | `a2-diff-def` | `a2-diff-implications` | « dérivées partielles existent ⇒ différentiable » | wrongValues : « différentiable » quand R/‖h‖ ne tend pas vers 0 | « Les dérivées partielles regardent deux directions. Ici R/‖h‖ vaut {valeur} pour φ = {φ} : f n'est pas différentiable. » |
| `a2_diff_no_norm` | calculus | E | `a2-diff-def` | `a2-diff-def` | R(h, k) → 0 suffit → il faut R/‖(h, k)‖ → 0 | transform : la ligne `ratio` remplacée par R seul | « R tend toujours vers 0 si f est continue. La différentiabilité demande plus : R divisé par ‖(h, k)‖ doit tendre vers 0. » |
| `a2_diff_imply_c1` | logic | C (QCM 2016 Q12, 2020 Q21) | `a2-diff-implications` | `a2-diff-implications` | différentiable partout ⇒ C¹ | wrongValues : V au lieu de F ; contre-exemple K3 | « K3 = (x² + y²) sin(1/r) est différentiable en (0, 0), mais ∂f/∂x oscille près de 0 : pas C¹. » |
| `a2_partials_imply_cont` | logic | C (QCM 2020 Q20, 2021 Q26) | `a2-diff-implications` | `a2-lim-paths` | dérivées partielles en (0, 0) ⇒ continue en (0, 0) | wrongValues : V au lieu de F ; contre-exemple K1 | « K1 = xy/(x² + y²) : f(h, 0) = f(0, k) = 0 donc les dérivées partielles valent 0, mais f(t, t) = 1/2. » |
| `a2_dirderiv_imply_diff` | logic | C (QCM 2019 Q25) | `a2-diff-implications` | `a2-dir-deriv-def` | toutes les D_v f existent ⇒ différentiable | wrongValues : V au lieu de F ; contre-exemple K2 | « K2 = x²y/(x⁴ + y²) a toutes ses dérivées directionnelles, mais f(x, x²) = 1/2 : elle n'est même pas continue. » |
| `a2_tangent_point_sign` | geometry | C (QCM 2020 Q7) | `a2-tangent-graph` | `g4-plane` | (x + a) au lieu de (x − a) | transform : dans la ligne `plane`, chaque (xᵢ − pᵢ) devient (xᵢ + pᵢ) | « Le plan doit passer par p = {p}. Remplace x par {p₁} dans ta ligne : tu n'obtiens pas 0. » |
| `a2_tangent_level_rhs` | geometry | E | `a2-tangent-level` | `a2-tangent-level` | ∇F(p)·(x − p) = c → = 0 | transform : membre de droite de la ligne `plane` remplacé par c = F(p) | « ∇F(p)·(x − p) mesure l'écart au plan ; il vaut 0 au point p. La constante c de la surface n'apparaît pas. » |
| `a2_chain_wrong_point` | calculus | C (QCM 2018 Q10, 2021 Q5) | `a2-chain` | `a2-chain` | J_f(a)·J_g(a) → J_f(g(a))·J_g(a) | transform : la ligne `outer` évaluée en a au lieu de g(a) ; le produit est recalculé | « f reçoit g(a) = {g(a)}, pas {a}. Évalue J_f en {g(a)}. » |
| `a2_chain_no_inner` | calculus | E | `a2-chain` | `g6-deriv-rules` | ∂h/∂v = ∂f/∂y(g(a)) → somme de deux produits | transform : on garde seulement le terme où la variable de f a le même nom que la variable de h | « h dépend de v à travers les **deux** composantes de g : ∂h/∂v = f_x·∂g₁/∂v + f_y·∂g₂/∂v. » |
| `a2_polar_grad_factor` | calculus | C (QCM 2019 Q5) | `a2-chain-polar` | `a2-chain` | f̃_r² + f̃_φ² ou f̃_r² + r²f̃_φ² → f̃_r² + f̃_φ²/r² | transform : le facteur 1/r² devant f̃_φ² remplacé par 1, r² ou r² sin φ | « f̃_φ = r·(…) : il contient un facteur r. Pour retrouver f_x² + f_y², il faut diviser f̃_φ² par r². » |
| `a2_laplacian_n` | calculus | E | `a2-laplacian-radial` | `a2-laplacian-radial` | Δg(r) = g″ + g′/r en dimension 3 → g″ + 2g′/r | transform : (n − 1) remplacé par 1, n ou n − 2 dans la ligne `formula` | « En dimension {n}, le coefficient de g′/r est n − 1 = {n−1}. g″ + g′/r, c'est la dimension 2. » |
| `a2_taylor_cross` | calculus | C (QCM 2019 Q11) | `a2-taylor2` | `a2-taylor2` | 2f_xy·XY ou ½f_xy·XY → f_xy·XY | transform : le coefficient de XY dans `prev` multiplié par 2 ou par ½ | « Dans ½(f_xx X² + 2f_xy XY + f_yy Y²), le ½ et le 2 se simplifient : le coefficient de XY est f_xy = {fxy}. » |
| `a2_taylor_no_half` | calculus | C (QCM 2020 Q11) | `a2-taylor2` | `a1-dl-usual` | 1 − (2x + 3y)² → 1 − (2x + 3y)²/2 | transform : les coefficients de X² et Y² (et XY) de `prev` multipliés par 2 | « cos u = 1 − u²/2 + … : tu as oublié le 1/2 du DL, ou le ½ devant les dérivées secondes. » |
| `a2_taylor_no_truncate` | calculus | E | `a2-taylor2` | `a1-dl-ops` | des termes de degré 3 ou 4 gardés dans p₂ | transform : `prev` développé sans troncature (u² entier) | « p₂ ne garde que le degré ≤ 2. Le terme {terme} est de degré {d} : il va dans le reste. » |
| `a2_implicit_sign` | calculus | C (QCM 2021 Q12) | `a2-implicit-2var` | `a2-implicit-2var` | g′ = F_x/F_y → −F_x/F_y | transform : la ligne `first` sans le signe moins | « Dérive F(x, g(x)) = 0 : F_x + F_y·g′ = 0, donc g′ = −F_x/F_y = {valeur}. » |
| `a2_implicit_inverted` | calculus | C (QCM 2021 Q12) | `a2-implicit-2var` | `a2-implicit-2var` | g′ = −F_y/F_x → −F_x/F_y | transform : la fraction de `first` inversée | « Au dénominateur : la dérivée de la variable qui devient la fonction, ici {var}. » |
| `a2_implicit_second_const` | calculus | E | `a2-implicit-2var` | `a2-chain` | g″ = −d/dx(F_x/F_y) avec y gardé constant | transform : dérivée de −F_x/F_y en x seulement (sans le terme en g′), évaluée au point | « y = g(x) dépend de x : en dérivant F_x/F_y, il faut aussi dériver par rapport à y, fois g′. » |
| `a2_implicit_wrong_var` | calculus | E | `a2-implicit-3var` | `a2-implicit-3var` | y = g(x, z) : dénominateur F_z au lieu de F_y | transform : dénominateur remplacé par la dérivée d'une autre variable | « La fonction est {var} = g(…) : c'est F_{var} qui va au dénominateur. » |
| `a2_crit_divide` | method | E | `a2-crit-points` | `@alg:E-systemes-2x2` | x(3x + 6) = 0 → « 3x + 6 = 0 » seulement | transform : pour chaque facteur de `prev` qui est une variable seule, on le supprime (division) et on résout le reste | « Tu as divisé par {facteur}. Il peut valoir 0 : le cas {facteur} = 0 donne aussi {points}. » |
| `a2_stationary_is_extremum` | logic | C (QCM 2021 Q24) | `a2-crit-points` | `a2-hessian-2x2` | ∇f = 0 ⇒ extremum → x² − y² | wrongValues : V au lieu de F | « ∇f = 0 donne un candidat. x² − y² a ∇f(0, 0) = 0, mais (0, 0) est un point selle. » |
| `a2_hess_det_only` | calculus | E | `a2-hessian-2x2` | `a2-hessian-2x2` | det H > 0 ⇒ minimum, sans regarder f_xx (ou, en 3 × 3, sans Δ₁, Δ₂) | wrongValues : « minimum » dès que det H > 0 | « det H = {det} > 0 dit seulement que les deux valeurs propres ont le même signe. f_xx = {fxx} < 0 : c'est un maximum. » |
| `a2_hess_degenerate` | calculus | E | `a2-hessian-2x2` | `a2-hessian-2x2` | det H = 0 ⇒ « selle » ou « pas d'extremum » | wrongValues : « selle » quand det H = 0 | « Avec det H = 0, la hessienne ne décide pas. x⁴ + y⁴ et x⁴ − y⁴ ont la même hessienne nulle en (0, 0). » |
| `a2_hess_partial_minors` | calculus | C (QCM 2019 Q21, 2020 Q27) | `a2-hessian-3x3` | `l-sym-orthodiag` | Δ₁ < 0 et Δ₃ < 0 ⇒ maximum (Δ₂ ignoré) | wrongValues : la nature déduite de Δ₁ et Δ₃ seulement | « Il faut les trois mineurs : −, +, −. Ici Δ₂ = {d2} < 0 : H n'est pas définie négative. » |
| `a2_compact_boundary_forgot` | method | E | `a2-extrema-compact` | `a2-extrema-compact` | max = valeur au point stationnaire intérieur | wrongValues : max et min sur les seuls candidats intérieurs | « Sur un compact, le max peut être sur le bord. Au point {p} du bord, f vaut {v}, plus que {v₀}. » |
| `a2_compact_corner_forgot` | method | E | `a2-extrema-compact` | `a1-extrema-global` | coins du demi-disque oubliés | wrongValues : candidats sans les extrémités des morceaux du bord | « Sur chaque morceau du bord, les extrémités comptent, comme a et b sur [a ; b]. En {coin}, f = {v}. » |
| `a2_lagrange_divide` | method | E | `a2-lagrange` | `@alg:E-systemes-2x2` | 2xy = 4λy → « x = 2λ » seulement | transform : la ligne `case` de `prev` sans le cas « variable = 0 » | « Diviser par y suppose y ≠ 0. Le cas y = 0 donne les points {points}, à comparer aussi. » |
| `a2_lagrange_no_constraint` | method | E | `a2-lagrange` | `a2-lagrange` | points de ∇f = λ∇g qui ne vérifient pas g = 0 | transform : solutions du système sans l'équation de contrainte (λ fixé à une valeur trouvée) | « Le point {p} ne vérifie pas {g} = 0 : g({p}) = {valeur}. » |
| `a2_lagrange_count` | method | C (QCM 2019 Q2, 2018 Q14) | `a2-lagrange` | `a2-lagrange` | « max atteint en un seul point » quand il y en a deux | wrongValues : nombre de points de max ou de min diminué de moitié (symétries oubliées) | « f prend la même valeur {v} en {p₁} et en {p₂} (symétrie). Le max est atteint en {n} points. » |
| `a2_lagrange_no_compare` | method | E | `a2-lagrange` | `a2-extrema-compact` | premier candidat trouvé pris comme extremum | wrongValues : la valeur de f aux points du premier cas résolu, donnée comme max ou min | « Lagrange donne des **candidats**. En {p₁}, f vaut {v₁} ; en {p₂}, f vaut {v₂}. Compare toutes les valeurs avant de conclure. » |
| `a2_quadform_matrix_half` | linear | E | `a2-lagrange-3d` | `l-sym-quadform` | matrice de xy + 2yz avec 1 et 2 hors de la diagonale → ½ et 1 | transform : la matrice A de `prev` avec les coefficients hors diagonale doublés ; valeurs propres recalculées | « xᵀAx compte chaque terme croisé deux fois (aᵢⱼ et aⱼᵢ) : le coefficient de xy se partage en ½ et ½. » |
| `a2_leibniz_wrong_var` | calculus | E | `a2-param-int` | `a2-param-int` | ∂f/∂x au lieu de ∂f/∂t sous l'intégrale | transform : la ligne `differentiate` avec la dérivée en x | « F dépend de t : on dérive l'intégrande par rapport à t, x reste la variable d'intégration. » |
| `a2_leibniz_no_integral` | calculus | E | `a2-param-int-bounds` | `a2-param-int` | F′ = f(b, t)b′ − f(a, t)a′ seulement | transform : la ligne finale sans le 3e terme | « t est aussi dans l'intégrande : il manque ∫ ∂f/∂t dx = {terme}. » |
| `a2_leibniz_sign` | calculus | E | `a2-param-int-bounds` | `a1-ftc` | + f(a, t)a′ → − f(a, t)a′ | transform : signe du terme de la borne inférieure inversé | « La borne du bas compte avec un signe moins : ∫_a^b = F(b) − F(a). » |
| `a2_symmetry_wrong` | calculus | E | `a2-fubini-rect` | `a2-fubini-rect` | « f impaire, donc 0 » sur un domaine non symétrique | wrongValues : 0 quand f est impaire en une variable mais D n'est pas symétrique en cette variable | « {f} est impaire en {v}, mais D va de {a} à {b} en {v} : ce n'est pas symétrique. » |
| `a2_fubini_outer_var` | method | C (QCM 2020 Q10) | `a2-domain-describe` | `a2-domain-describe` | bornes extérieures qui contiennent la variable intérieure | transform : après inversion de l'ordre, on garde les anciennes bornes (fonctions) à l'extérieur | « L'intégrale extérieure doit donner un nombre : ses bornes ne peuvent pas dépendre de {v}. » |
| `a2_fubini_swap_same` | method | E | `a2-fubini-swap` | `a2-domain-describe` | ∫₀¹∫_{x²}^1 dy dx → ∫₀¹∫_{y²}^1 dx dy | transform : on échange dx et dy et on renomme les variables dans les bornes | « Renommer ne suffit pas : dessine D. Pour y fixé, x va de {a} à {b}. » |
| `a2_domain_curve_order` | geometry | E | `a2-domain-describe` | `a2-domain-describe` | courbes du haut et du bas inversées | transform : bornes intérieures de `prev` échangées | « Entre {x₁} et {x₂}, {haut} ≥ {bas} : la borne du bas est {bas}. Teste x = {xt}. » |
| `a2_jacobian_inverse` | calculus | E | `a2-change-var` | `a2-change-var` | dx dy = \|J\| du dv, avec J = det ∂(u, v)/∂(x, y) → dx dy = du dv/\|J\| | transform : facteur jacobien de `prev` remplacé par son inverse | « Tu as calculé ∂(u, v)/∂(x, y) = {J}. La formule demande l'inverse : dx dy = du dv/\|{J}\|. » |
| `a2_changevar_domain_direction` | geometry | C (QCM 2020 Q16) | `a2-change-var` | `a2-change-var` | D̃ = G(D) au lieu de G⁻¹(D) | wrongValues : l'image de D par G au lieu de l'image réciproque | « D̃ est l'ensemble des (u, v) **envoyés** dans D par G : écris les inégalités de D avec G(u, v). » |
| `a2_jacobian_forgot` | calculus | C (plan §8) | `a2-polar-int` | `a2-change-var` | dx dy = dr dφ ; dV = dr dθ dφ ; r au lieu de r² sin θ | transform : facteur r (polaires, cylindriques) ou r² sin θ (sphériques) supprimé, ou remplacé par r | « Une petite case en polaires a pour aire r dr dφ, pas dr dφ. Sans le r, tu trouves {faux} au lieu de {juste}. » |
| `a2_polar_angle_bounds` | geometry | E | `a2-polar-int` | `g3-identities` | 0 ≤ y ≤ x → φ ∈ [0 ; π/2] au lieu de [0 ; π/4] | transform : borne de φ remplacée par la borne voisine (π/2 ↔ π/4, π ↔ 2π) | « y ≤ x veut dire tg φ ≤ 1, donc φ ≤ π/4. » |
| `a2_sph_theta_from_plane` | notation | E | `a2-cyl-sph` | `a2-cyl-sph` | θ mesuré depuis le plan xy : z = r sin θ, dV = r² cos θ… | transform : sin θ ↔ cos θ dans l'intégrande et bornes de θ complémentaires | « Dans ce cours, θ part de l'axe z : z = r cos θ et dV = r² sin θ dr dθ dφ. » |
| `a2_improper_exponent` | calculus | E | `a2-improper-multi` | `a1-improper-compare` | ∫_{‖x‖≥1} ‖x‖^{−α} converge si α > 1 (règle de dimension 1) | wrongValues : décision prise avec le seuil 1 au lieu de n | « En dimension {n}, le jacobien ajoute r^{n−1} : on intègre r^{n−1−α}. Il faut α > {n}. » |
| `a2_gauss_sqrt` | calculus | E | `a2-improper-multi` | `a2-improper-multi` | ∫_ℝ e^{−x²} = π → √π | wrongValues : π, √π/2 ou 2√π | « π, c'est l'intégrale double. L'intégrale simple est sa racine : √π. » |
| `a2_volume_surfaces_swapped` | geometry | E | `a2-volume` | `a2-domain-describe` | ∬ (dessous − dessus) | transform : intégrande de `setup` changé de signe | « Ton volume est négatif ({v}) : la surface du dessus est {haut}. » |
| `a2_ode_continuity_unique` | logic | C (QCM 12, 2022) | `a2-ode-cauchy` | `a2-ode-cauchy` | « f continue, donc solution unique » | wrongValues : V au lieu de F | « y′ = 3y^{2/3}, y(0) = 0 a deux solutions : y = 0 et y = t³. Il faut Lipschitz en y. » |
| `a2_ode_local_global` | logic | C (QCM 12, 2022) | `a2-ode-cauchy` | `a2-ode-cauchy` | « f ∈ C¹, donc solution globale » | wrongValues : V au lieu de F | « y′ = y², y(0) = 1 donne y = 1/(1 − t), qui explose en t = 1. » |
| `a2_ode_sep_constant_late` | calculus | E | `a2-ode-separable` | `a1-int-direct` | ln\|y\| = x² + C ⇒ y = e^{x²} + C → y = Ke^{x²} | transform : dans la ligne `solve`, la constante est ajoutée après l'exponentielle au lieu d'être multiplicative | « e^{x² + C} = e^C·e^{x²} : la constante multiplie. Vérifie : (e^{x²} + C)′ = 2xe^{x²}, pas 2x(e^{x²} + C). » |
| `a2_ode_sep_lost_constant` | method | E (organigramme personnel) | `a2-ode-separable` | `a2-ode-separable` | y′ = 4 − y², y(0) = 2 : formule générale → y ≡ 2 | wrongValues : la formule générale appliquée quand y₀ annule h | « h({y₀}) = 0 : y ≡ {y₀} est solution, et c'est la seule (unicité). La division par h l'avait perdue. » |
| `a2_ode_sign_abs` | calculus | E | `a2-ode-separable` | `a2-ode-separable` | ln\|(3 + y)/(3 − y)\| : signe faux en enlevant la valeur absolue | transform : en enlevant \|…\|, on garde le signe opposé à celui qui vérifie la condition initiale | « En x = {x₀}, (3 + y)/(3 − y) = {valeur} > 0 : on garde le signe +. » |
| `a2_ode_if_not_normalized` | method | E | `a2-ode-linear1` | `a2-ode-linear1` | μ calculé avec le coefficient de y avant de diviser par celui de y′ | transform : μ = e^{∫ a dx} avec a pris dans l'équation non normalisée | « Le facteur intégrant suppose y′ seul. Divise d'abord par {coef} : a(x) = {a}. » |
| `a2_ode_if_sign` | calculus | E | `a2-ode-linear1` | `a2-ode-linear1` | μ = e^{−∫ a} pour y′ + ay = b | transform : μ remplacé par 1/μ | « Avec μ = e^{∫ a}, μ′ = aμ, et (μy)′ = μ(y′ + ay). Avec e^{−∫ a}, ça ne marche pas. » |
| `a2_ode_if_rhs` | calculus | E | `a2-ode-linear1` | `a2-ode-linear1` | (μy)′ = b au lieu de μb | transform : membre de droite de `exact-deriv` sans le facteur μ | « On a multiplié toute l'équation par μ : le second membre devient μ·b = {μb}. » |
| `a2_ode_ic_before_particular` | method | E | `a2-ode-particular` | `a2-ode-structure` | constantes fixées sur y_h, puis y_p ajoutée | wrongValues : C₁, C₂ calculés avec y_h(x₀) = y₀ (et y_h′(x₀) = y₁), puis y = y_h + y_p évaluée en x₁ | « Les conditions initiales portent sur la solution entière y = y_h + y_p. Avec ta solution, y({x₀}) = {valeur} ≠ {y₀}. » |
| `a2_ode_homog_derivative` | calculus | E | `a2-ode-homog-subst` | `g6-deriv-rules` | y = xv ⇒ y′ = v (ou xv′) → v + xv′ | transform : la ligne `substitute` avec y′ = v ou y′ = xv′ | « y = x·v est un produit : y′ = 1·v + x·v′. » |
| `a2_ode_superposition_nonhom` | logic | C (QCM 2020 Q22) | `a2-ode-structure` | `a2-ode-structure` | y₀ + C·y₁ solution de L(y) = b | wrongValues : V au lieu de F | « L(y₀ + Cy₁) = 0 + C·b. C'est égal à b seulement pour C = 1. » |
| `a2_ode_constant_count` | notation | E | `a2-ode-structure` | `a2-ode-const2` | solution générale d'ordre 2 avec une seule constante | transform : `prev` avec C₂ = C₁ ou C₂ = 0 | « Une équation d'ordre 2 a un espace de solutions de dimension 2 : il faut deux constantes indépendantes. » |
| `a2_ode_double_root` | calculus | E | `a2-ode-const2` | `a2-ode-const2` | C₁e^{rx} + C₂e^{rx} → (C₁ + C₂x)e^{rx} | transform : la ligne `form` sans le facteur x | « C₁e^{{r}x} + C₂e^{{r}x} = (C₁ + C₂)e^{{r}x} : une seule constante en réalité. La 2e solution est xe^{{r}x}. » |
| `a2_ode_complex_swap` | calculus | E | `a2-ode-const2` | `g8-polar` | r = α ± iβ ⇒ e^{βx}(cos αx …) | transform : α et β échangés dans la ligne `form` | « e^{(α + iβ)x} = e^{αx}(cos βx + i sin βx) : la partie réelle {α} va dans l'exponentielle. » |
| `a2_ode_char_sign` | calculus | E | `a2-ode-const2` | `@alg:H-discriminant` | racines de signe opposé (r = 1, 3 au lieu de −1, −3) | transform : racines de `prev` changées de signe | « Vérifie : ({r})² + {p}·({r}) + {q} = {valeur} ≠ 0. » |
| `a2_wronskian_abel_sign` | calculus | E | `a2-ode-wronskian` | `a2-ode-linear1` | W = W₀e^{+∫ p} | transform : exposant de `abel` changé de signe | « W vérifie W′ = −pW : la solution est W₀e^{−∫ p}. » |
| `a2_ode_resonance_no_x` | method | C (plan §8) | `a2-ode-particular` | `a2-ode-particular` | u_p = A cos 3x + B sin 3x pour u″ + 9u = sin 3x → x(A cos 3x + B sin 3x) | transform : la ligne `form` sans le facteur x ; l'identification donne 0 = second membre (`wrong`) | « A cos 3x + B sin 3x est une solution de l'équation **homogène** : elle donne 0. Comme 3i est racine, multiplie par x. » |
| `a2_ode_yp_incomplete` | method | E | `a2-ode-particular` | `a2-ode-particular` | y_p = At pour 27t (sans B) ; A sin 2t seul pour sin 2t | transform : forme de `prev` privée d'un terme (constante du polynôme, ou cos à côté de sin) | « Le terme y′ crée un cos à partir d'un sin (ou une constante à partir de t) : il faut les deux termes dans la forme. » |
| `a2_ode_method_separable_sum` | method | E | `a2-ode-choose` | `a2-ode-choose` | y′ = x + y traité comme séparable | transform : décision « séparable » acceptée, puis la ligne `separate` dy/y = x dx (fausse) | « x + y n'est pas un produit g(x)·h(y). C'est une équation linéaire : y′ − y = x. » |
| `a2_ode_method_linear_nonlinear` | method | E | `a2-ode-choose` | `a2-ode-choose` | y′ = y² traité comme linéaire | transform : décision « linéaire », puis μ calculé avec a = y | « y² n'est pas linéaire en y. Ici, c'est séparable : dy/y² = dx. » |
| `a2_ode_stability_boundary` | calculus | C (QCM 2020 Q15) | `a2-ode-stability` | `a2-ode-stability` | intervalle fermé [−1 ; +∞[ → ]−1 ; +∞[ | wrongValues : l'intervalle avec ses bornes | « En a = {borne}, r = {racine} est racine : la solution {sol} ne tend pas vers 0. » |
| `a2_ode_stability_one_coef` | calculus | E | `a2-ode-stability` | `a2-ode-stability` | seulement p > 0 (ou seulement q > 0) | wrongValues : l'ensemble {p > 0} ou {q > 0} | « Si q < 0, une racine est positive même si p > 0 : il faut les deux conditions. » |
| `a2_ode_stability_discriminant` | calculus | E | `a2-ode-stability` | `@alg:H-discriminant` | stabilité ⇔ Δ < 0 | wrongValues : l'ensemble {Δ < 0} | « Δ < 0 donne des oscillations, amorties ou non. C'est le signe de la partie réelle qui compte. » |
| `a2_exact_phi_forgot` | calculus | E | `a2-ode-exact` | `a2-ode-exact` | H = ∫ M dx sans φ(y) | transform : la ligne `integrate` sans φ(y), puis H_y comparé à N | « H_y doit valoir N = {N}. Avec ton H, H_y = {Hy} : il manque φ(y) = {phi}. » |
| `a2_ode_system_order` | linear | E | `a2-ode-system` | `l-eig-diag` | e^{3t} associé au vecteur propre de −1 | transform : vecteurs propres de `prev` échangés entre les deux valeurs propres | « (1, −1) est vecteur propre pour −1 : il va avec e^{−t}. Vérifie : A(1, −1) = {Av}. » |

## Exemples de type examen

Les examens 2019 à 2021 ne contiennent que des QCM et des vrai/faux. Ces problèmes reprennent leurs calculs sous forme ouverte, pour les items `problem` (niveau 5) et les variantes `open`. Chacun a aussi sa version QCM : la dernière ligne devient « … vaut », avec les distracteurs donnés.

### E1. Résonance (modèle : 2021 Q15) — 10 points

Trouver la solution de `u″ + 4u = 8 sin 2x` avec `u(0) = 1`, `u′(0) = 0`, puis calculer u(π).

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| Équation caractéristique et racines | r² + 4 = 0, r = ±2i | 1 | `a2-ode-const2` |
| Solution homogène | u_h = C₁ cos 2x + C₂ sin 2x | 1 | `a2-ode-const2` |
| Forme de u_p, avec la justification | 2i est racine : u_p = x(A cos 2x + B sin 2x) | 2 | `a2-ode-particular` |
| Coefficients | L[x cos 2x] = −4 sin 2x, L[x sin 2x] = 4 cos 2x ; A = −2, B = 0 ; u_p = −2x cos 2x | 2 | `a2-ode-particular` |
| Solution générale | u = C₁ cos 2x + C₂ sin 2x − 2x cos 2x | 1 | `a2-ode-structure` |
| Conditions initiales | u(0) = C₁ = 1 ; u′(0) = 2C₂ − 2 = 0, C₂ = 1 | 2 | `a2-ode-particular` |
| Valeur | u(π) = 1 − 2π | 1 | — |

Version QCM : u(π) ∈ {1 − 2π (juste) ; 1 (`a2_ode_resonance_no_x` : sans le facteur x, aucun A, B ne convient ; l'élève garde u_h avec les conditions initiales) ; 1 + 2π (signe de A inversé, piège de calcul de l'école) ; 1 − π (A = −1 : le facteur 2 de (cos 2x)′ oublié)}. Remarque pour le générateur : ici, `a2_ode_ic_before_particular` donne aussi 1 − 2π, parce que u_p(0) = 0 et sin 2π = 0. Un distracteur égal à la bonne réponse est retiré, et on prend le piège suivant.

### E2. Lagrange sur une ellipse (modèle : test 2016 Q2, 2019 Q2) — 10 points

Trouver le maximum et le minimum de `f(x, y) = xy²` sous la contrainte `x² + 2y² = 6`, et les points où ils sont atteints.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| Existence et hypothèse | La courbe est compacte, f continue ; ∇g = (2x, 4y) ≠ 0 sur la courbe | 1 | `a2-compact-extreme` |
| Système | y² = 2λx ; 2xy = 4λy ; x² + 2y² = 6 | 1 | `a2-lagrange` |
| Cas y = 0 | x = ±√6, λ = 0, f = 0 | 2 | `a2-lagrange` |
| Cas y ≠ 0 | x = 2λ, donc y² = x² ; 3x² = 6, x = ±√2, y = ±√2 | 3 | `a2-lagrange` |
| Valeurs | f(√2, ±√2) = 2√2 ; f(−√2, ±√2) = −2√2 ; f(±√6, 0) = 0 | 1 | `a2-lagrange` |
| Conclusion | max 2√2 en (√2, √2) et (√2, −√2) ; min −2√2 en (−√2, √2) et (−√2, −√2) | 2 | `a2-lagrange` |

Version QCM (phrases au format 2019 Q2) : « f atteint son maximum en exactement deux points » (juste) ; « … en exactement un point » (`a2_lagrange_count`) ; « le minimum de f vaut 0 » (`a2_lagrange_no_compare` : les points du cas y = 0, trouvés en premier, sont pris sans comparer) ; « f n'atteint pas de maximum sur la contrainte » (`a2_compact_open`). Le piège `a2_lagrange_divide` (division par y) ne change pas la réponse ici ; il coûte les 2 points du cas y = 0 dans la version ouverte.

### E3. Extrema sur un demi-disque (modèle : test 2016 Q5, 2020 Q17) — 10 points

Trouver le maximum et le minimum absolus de `f(x, y) = 2x² + y² − 2y` sur `D = {x² + y² ≤ 4, y ≥ 0}`.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| Existence | D compact, f continue | 0,5 | `a2-compact-extreme` |
| Intérieur | ∇f = (4x, 2y − 2) = 0 : (0, 1), intérieur ; f = −1 | 2 | `a2-crit-points` |
| Segment y = 0, x ∈ [−2 ; 2] | f = 2x² : x = 0 donne 0 | 2 | `a2-extrema-compact` |
| Arc x = 2cos t, y = 2sin t, t ∈ [0 ; π] | f = 8 − 4sin²t − 4sin t ; dérivée (−8 sin t − 4) cos t = 0 : t = π/2, point (0, 2), f = 0 | 3 | `a2-extrema-compact` |
| Coins | (±2, 0) : f = 8 | 1 | `a2-extrema-compact` |
| Comparaison | max 8 en (2, 0) et (−2, 0) ; min −1 en (0, 1) | 1,5 | `a2-extrema-compact` |

Version QCM : « le maximum absolu vaut 8 » (juste) ; « le maximum absolu vaut 0 » (`a2_compact_corner_forgot` : sans les coins, les candidats valent −1, 0 et 0) ; « le maximum absolu vaut −1 » (`a2_compact_boundary_forgot` : seul le point intérieur) ; « f n'a pas de minimum absolu » (`a2_compact_open`).

### E4. Dérivée d'une intégrale à paramètre (modèle : 2020 Q5, 2021 Q7) — 8 points

Soit `F(t) = ∫_t^{t³} (1 − cos(xt))/x dx` pour t > 0. Calculer F′(t), puis F′(1).

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| Hypothèses et formule | f(x, t) = (1 − cos(xt))/x et ∂f/∂t = sin(xt) continues pour x > 0 ; formule à trois termes | 1 | `a2-param-int-bounds` |
| Borne du haut | f(t³, t)·3t² = 3(1 − cos t⁴)/t | 2 | `a2-param-int-bounds` |
| Borne du bas | f(t, t)·1 = (1 − cos t²)/t | 1 | `a2-param-int-bounds` |
| Intégrale | ∫_t^{t³} sin(xt) dx = (cos t² − cos t⁴)/t | 2 | `a2-param-int` |
| Somme | F′(t) = (2 + 2cos t² − 4cos t⁴)/t | 1 | `a2-param-int-bounds` |
| Valeur | F′(1) = 2 − 2cos 1 | 1 | — |

Version QCM : F′(t) ∈ {(2 + 2cos t² − 4cos t⁴)/t (juste) ; (2 + cos t² − 3cos t⁴)/t (`a2_leibniz_no_integral`) ; (1 − cos t⁴)/t³ + (2cos t² − cos t⁴ − 1)/t (`a1_ftc_no_chain`) ; (4 − 4cos t⁴)/t (`a2_leibniz_sign`)}. Le générateur vérifie que les 4 options sont différentes en 3 valeurs de t.

### E5. Changement de variables polaires (modèle : 2020 Q4, 2021 Q10) — 8 points

Calculer `∬_D Log(x² + y²) dx dy` avec `D = {(x, y) : 1 ≤ x² + y² ≤ 4, y ≥ 0}`.

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| Bornes | 1 ≤ r ≤ 2, 0 ≤ φ ≤ π | 1,5 | `a2-polar-int` |
| Intégrande et jacobien | Log(r²)·r = 2r ln r | 1,5 | `a2-change-var` |
| Séparation | π·∫₁² 2r ln r dr | 1 | `a2-fubini-rect` |
| Primitive (par parties) | ∫ 2r ln r dr = r² ln r − r²/2 | 2 | `a1-int-parts` |
| Valeur | π(4 ln 2 − 3/2) = 4π ln 2 − 3π/2 | 2 | `a2-polar-int` |

Version QCM : {4π ln 2 − 3π/2 (juste) ; π(4 ln 2 − 2) (`a2_jacobian_forgot` : π∫₁² 2 ln r dr) ; 2π ln 2 − 3π/4 (`a2_polar_angle_bounds` : φ ∈ [0 ; π/2]) ; π(2 ln 2 − 3/4) (Log(r²) écrit Log r : piège de la règle du logarithme, module G2)}. Le générateur calcule chaque distracteur avec son piège et rejette les doublons.

### E6. Fonction définie par morceaux (modèle : 2018 Q7, 2020 Q14, 2021 Q14) — 9 points

Soit `f(x, y) = x²y/(x² + y²)` si (x, y) ≠ (0, 0), et `f(0, 0) = 0`. (a) f est-elle continue en (0, 0) ? (b) Calculer ∂f/∂x(0, 0), ∂f/∂y(0, 0). (c) Calculer D_v f(0, 0) pour v = (1/√2, 1/√2). (d) f est-elle différentiable en (0, 0) ?

| Étape | Attendu | Points | Compétence |
|---|---|---|---|
| (a) Majoration | \|f\| = r\|cos²φ sin φ\| ≤ r → 0 : f est continue | 2 | `a2-lim-polar` |
| (b) Dérivées partielles | f(h, 0) = 0 et f(0, k) = 0 : les deux valent 0 | 2 | `a2-dir-deriv-def` |
| (c) Dérivée directionnelle | f(tv) = t/(2√2), donc D_v f(0, 0) = 1/(2√2) | 2 | `a2-dir-deriv-def` |
| (d) Conclusion | Si f était différentiable, D_v f = ∇f·v = 0 ≠ 1/(2√2) : f n'est pas différentiable | 3 | `a2-diff-implications` |

Version QCM (phrases de 2020 Q14) : « les dérivées partielles existent en (0, 0), mais f n'est pas différentiable » (juste) ; « f est différentiable en (0, 0) » (`a2_dirderiv_gradient` : D_v f calculée par ∇f·v = 0, donc rien ne semble clocher) ; « f est différentiable, mais pas C¹ » (`a2_partials_imply_diff`) ; « f n'est pas continue en (0, 0) » (`a2_lim_polar_r_forgot`).
