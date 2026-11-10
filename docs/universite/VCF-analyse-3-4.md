# V, C, F. Analyse III et IV : analyse vectorielle, analyse complexe, Fourier et Laplace

Extensions du §16 utilisées : §16.1 variables entières (coefficients de Fourier), intégrales dans `evalFloat`, complexes partout ; §16.2 `antideriv` avec `grad` (potentiels, conjuguées harmoniques), `boundary`, `series` de Laurent, `transform` (tables `mt2122` et `dt`), `ode` en mode EDP, `distrib` (comparaison sur des fonctions tests), `solset` sur ℂ ; §16.3 échelle des niveaux `blocks` et `tokens`, au moins 2 exemples d'examen par module ; §16.4 familles nouvelles (`calculus`, `geometry`, `method`, `notation`), tag C, réparation dans un autre module, pièges partagés (réutilise `g6_sqrt_x2_abs`).

Ce fichier regroupe trois catalogues, un par module, chacun au gabarit du §15 du [README](README.md). L'ordre est celui de Microtechnique en année normale : V et C en Analyse III (BA3, `year: 15`), F en Analyse IV (BA4, `year: 16`). L'étape de construction est **U10** (§14) : juges `param`, `boundary`, `transform`, résidus par séries de Laurent, plans d'examen `ba3-analyse3` et `ba4-analyse4`.

**Conventions communes aux trois modules**

| Sujet | Règle du catalogue |
|---|---|
| Variantes d'examen V et C | Plan `ba3-analyse3` : `mcq` **à une réponse** (+2 / 0, pas de point négatif ; 0 aussi si plusieurs cases), `open` de 3 à 14 points (un `problem` avec barème par étape). Pas de vrai/faux en Analyse III MT. |
| Variantes d'examen F | Plan `ba4-analyse4` : `mcq` **à plusieurs réponses** (marqué « plusieurs », `opts.multi = true` ; +1/N par bonne case cochée, −1/M par mauvaise), et 3 `open`. Les compétences C ont aussi une variante `mcq` multi, parce que l'examen MT/SV d'Analyse IV 2021 posait des QCM sur Cauchy, Laurent et les résidus. |
| `coef` | Utilisé quand l'examen demande une seule valeur d'un long calcul : un coefficient de Fourier, a₋₂ d'une série de Laurent, un résidu. |
| Notation des saisies | Variables déclarées par l'item (`declares.vars`). `∧` (touche dédiée, `×` accepté) pour le produit vectoriel. `dl` sur une courbe, `ds` sur une surface. `i` n'est l'unité imaginaire que si `complex: true` ; dans le module C, c'est toujours le cas. |
| Entiers n, k | Les coefficients de Fourier et les termes de séries contiennent n ∈ ℕ*. Le juge `equiv` reçoit `domain: {n: {int: [1, 40]}}` : on échantillonne des **entiers** (voir les lacunes signalées en fin de rapport). |
| Points de contrôle numérique | Paramétrisations : 20 points (juge `param`). Transformées : 6 valeurs de s (juge `transform`), choisies dans le demi-plan de convergence pour Laplace. |
| Problèmes longs | Type `problem`, `noHints: true`, `resumable: true`, barème par étape dans `points`. Chaque partie est un `lines` jugé normalement ; `followError: true` partout (report d'erreur, comme dans les barèmes d'examen). |
| Tags des pièges | **C** : remarque d'une correction d'examen ou du cours (« Common mistakes » du corrigé d'Analyse III du 18.01.2022, remarques du corrigé de janvier 2021, plan §8) ; **E** : expérience, à faire relire ; **R** : recherche. |

---

# V. Analyse vectorielle

Unité `vecto` · préfixe `v-` · pièges `v_` · Statut : fait le 10 novembre 2026 (étape U10, voir README §17)

**Sources** : Analyse III MT/SV 2021-22 (cours, séries, série de révision, examen blanc de décembre 2021, examen du 18.01.2022 et son corrigé avec les « Common mistakes ») ; Analyse III MT/SV janvier 2021 (cours du Dr Strütt, énoncé reconstitué et corrigé d'étudiants) ; Analyse III GM (résumés, examens 2013–2015) ; Dacorogna et Tanteri, *Analyse avancée pour ingénieurs*, chapitres 1 à 7 et appendice (courbes, surfaces).

**Notation** :
- ∫_Γ f dl (champ scalaire) et ∫_Γ F · dl (champ vectoriel) sur une courbe ; ∬_Σ f ds et ∬_Σ F · ds sur une surface.
- Produit vectoriel `∧`. rot F en 2D est un **scalaire** : rot F = ∂F₂/∂x − ∂F₁/∂y. En 3D, rot F = (∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y).
- « F dérive d'un potentiel sur Ω » : il existe φ ∈ C¹(Ω) avec **F = ∇φ** (pas de signe moins).
- Courbe régulière γ : [a ; b] → ℝⁿ, injective sur [a ; b[, γ′ ≠ 0. ∫_Γ f dl = ∫ₐᵇ f(γ(t)) |γ′(t)| dt ; ∫_Γ F · dl = ∫ₐᵇ F(γ(t)) · γ′(t) dt.
- Bord d'un domaine du plan orienté positivement : le domaine est à gauche. Normale extérieure unité : **ν = (γ₂′, −γ₁′)/|γ′|**.
- Surface σ : A → ℝ³, normale σ_u ∧ σ_v ; ∬_Σ f ds = ∬_A f(σ) |σ_u ∧ σ_v| du dv ; ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv. Le cours n'exige **pas** de rendre la normale extérieure pour Stokes : il faut seulement que le sens du bord soit celui de σ(∂A) (corrigé 2022).
- Sphériques : θ mesuré depuis l'axe z, σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ), σ_θ ∧ σ_φ = R² sin θ · (sin θ cos φ, sin θ sin φ, cos θ) (extérieure).
- Green : ∬_A rot F dx dy = ∮_∂A F · dl ; forme flux : ∬_A div F dx dy = ∮_∂A F · ν dl ; aire(A) = ½ ∮_∂A (x dy − y dx).

**Prérequis extérieurs** :
`a2-curve-param`, `a2-curve-length`, `a2-partials`, `a2-chain`, `a2-rn-topology`, `a2-fubini-rect`, `a2-domain-describe`, `a2-cyl-sph`, `a1-int-direct`, `g4-cross`, `g3-identities`, `g9-counterexample`, `@alg:C-reduire`, `@alg:E-systemes`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-proof-contra`, `g4-cross`, `a1-int-direct`, `a2-chain`, `a2-curve-param`, `a2-cyl-sph`, `a2-fubini-rect`, `a2-partials`, `a2-polar-int`, `a2-rn-topology`.

## Compétences

### `v-ops` — Gradient, divergence, rotationnel, laplacien
- **Année** 15 · **Prérequis** `a2-partials`, `g4-cross` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g4-cross` : rot F s'écrit comme le déterminant symbolique de u ∧ v.
- **Statut** : fait le 10 novembre 2026 (étape U10). Une partie `equiv` par nombre (chaque composante de rot F, div F, Δf), du départ écrit avec ∂ (∂F₃/∂y − ∂F₂/∂z) au résultat développé (cible `goal`) ; la formule de rot est donc donnée par le départ, y compris en L2. L1 : rot F, dérivées à trous ; L2 : rot F ou Δf puis sa valeur en un point ; L3 : décision « quel opérateur ? » (irrotationnel, à divergence nulle, Δf), menus avec l'ordre inversé (`v_rot_sign`) ; L4 : rot F et div F avec un terme sin ou exp d'un monôme de degré 2, ou div F, Δf en un point ; L5 : rot F, div F, puis div(rot F) = 0. Les dérivées partielles créditent `a2-partials`. QCM : Δf (2022, `v_lap_mixed` ajoute les dérivées croisées une ou deux fois) ou rot F (composantes de signe changé).
- **Intro** : grad f = ∇f est un vecteur, div F = ∇ · F un scalaire, rot F = ∇ ∧ F un vecteur en 3D et un scalaire en 2D, Δf = div grad f. On écrit rot F comme un déterminant symbolique, puis on développe **composante par composante**. Exemple : F = (x²y, yz, xz²) ; `math: rot F = (∂_y(xz²) − ∂_z(yz), ∂_z(x²y) − ∂_x(xz²), ∂_x(yz) − ∂_y(x²y))`, `note: une ligne par composante` ; `math: = (−y, −z², −x²)`, `note: trois nombres, pas une somme`.
- **Juge** : `equiv` `{vars:['x','y','z'], domain:{x:[-3,3], y:[-3,3], z:[-3,3]}, target:'no-operator'}`, composante par composante quand la ligne est un vecteur · **Forme finale** : vecteur (ou scalaire) sans ∇ ni ∂, chaque composante développée.
- **Niveaux** :
  - L1 (guidé) : la formule de rot écrite, les 6 dérivées partielles à trous.
  - L2 : la formule de rot à compléter (quel ∂, quel Fᵢ), puis les dérivées.
  - L3 (choisir l'action) : « gradient, divergence, rotationnel ou laplacien ? » selon ce qui est demandé (« le champ est-il à divergence nulle ? »), puis l'ordre ∂_yF₃ − ∂_zF₂ ou ∂_zF₂ − ∂_yF₃.
  - L4 (libre) : deux opérateurs sur le même champ, avec un terme transcendant (sin(x + z²), e^(xy)).
  - L5 (seul) : calculer rot F et div F, puis vérifier div rot F = 0 sur ce champ.
- **Générateur** : champs polynomiaux de 2 ou 3 monômes par composante, x^a y^b z^c avec a + b + c ≤ 3, coefficients dans {−3, …, 3} \ {0} ; à partir de L4, un terme sin(u) ou e^u avec u monôme de degré 2. Rejeter si une composante de rot F est identiquement nulle à L1–L2 (trop facile) et si rot F = 0 partout (réservé à `v-pot-test`). Gabarits : « Calculer rot F » ; « Calculer Δf au point (1 ; −1 ; 2) » (valeur entière) ; « div F en P ». Champs 2D : rot scalaire.
- **Corrigé type** (F = (x²y, yz, xz²)) :
  1. `rot F = (∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y)` — sous-but `rot-formula`
  2. `= (0 − y, 0 − z², 0 − x²)` — sous-but `partials`
  3. `= (−y, −z², −x²)` — sous-but `simplify`
  4. `div F = 2xy + z + 2xz` — sous-but `div`
- **Aides** : 1 « rot F est un vecteur : écris ses trois composantes, chacune est une différence de deux dérivées » · 2 `rot F = (∂_y(…) − ∂_z(…), ∂_z(…) − ∂_x(…), ∂_x(…) − ∂_y(…))` · 3 la ligne 2 du corrigé.
- **Variantes d'examen** : `mcq` (une réponse) « Δ(x² + y³ + xy) = ? » (2022) : bonne 2 + 6y ; distracteurs de `v_lap_mixed` (2 + 6y + 1), du gradient pris pour Δ, de `v_rot_sign`. `open` : jamais seul, sert de première étape.
- **Pièges** : `v_rot_sign`, `v_rot_scalar_sum`, `v_lap_mixed`, `v_div_rot_confuse`.
- **Sous-buts → crédit** : `rot-formula`, `partials`, `simplify`, `div` → `v-ops` ; dérivées partielles fausses répétées → réparation `a2-partials`.

### `v-identities` — Identités des opérateurs
- **Année** 15 · **Prérequis** `v-ops` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Seule l'identité div(fF) = f div F + F · ∇f est vérifiée en lignes : trois parties `equiv` (div(fF) après le produit fF, puis f div F + F · ∇f, puis leur différence = 0) ; L3 : décision « quelle identité ? » ; L5 : la moitié des items est le QCM « laquelle de ces identités est fausse ? ». Le gabarit G = ∇f ∧ ∇g et rot(fF) en lignes ne sont pas faits. QCM d'examen : F = g(|x|)·x (série de révision) ou div(fF) sur un exemple.
- **Intro** : rot(grad f) = 0 ; div(rot F) = 0 ; div(fF) = f div F + F · ∇f ; rot(fF) = f rot F + ∇f ∧ F ; div(∇f) = Δf. On les vérifie sur un exemple avant de s'en servir. Exemple : f = xy, F = (x, y, z) ; `math: div(fF) = div(x²y, xy², xyz) = 5xy`, `note: calcul direct` ; `math: f div F + F · ∇f = 3xy + (x, y, z)·(y, x, 0) = 5xy`, `note: même résultat`.
- **Juge** : `equiv` `{vars:['x','y','z']}` sur chaque membre ; la ligne finale est une égalité dont les deux membres sont équivalents · **Forme finale** : les deux membres développés et égaux.
- **Niveaux** :
  - L1 : les deux membres posés, les produits à trous.
  - L2 : un membre à calculer seul.
  - L3 : « Quelle identité ? » (4 choix), puis les deux membres.
  - L4 : vérifier une identité donnée sur un champ tiré.
  - L5 : montrer qu'un champ G = ∇f ∧ ∇g est à divergence nulle (avec l'identité div(a ∧ b) = b · rot a − a · rot b donnée) ; ou repérer l'identité fausse parmi quatre.
- **Générateur** : f monôme ou somme de 2 monômes de degré ≤ 2 ; F polynomial de degré ≤ 1 par composante, coefficients dans {−2, …, 3}. Gabarits : « Vérifier div(fF) = … sur cet exemple » ; « Laquelle de ces identités est fausse ? » (div(fF) = f div F, rot(fF) = f rot F, rot grad f = 0, div rot F = 0).
- **Corrigé type** (f = xy, F = (x, y, z)) :
  1. `fF = (x²y, xy², xyz)` — sous-but `product`
  2. `div(fF) = 2xy + 2xy + xy = 5xy` — sous-but `lhs`
  3. `f div F + F · ∇f = xy · 3 + (x·y + y·x + 0)` — sous-but `rhs`
  4. `= 5xy`, les deux membres sont égaux — sous-but `conclude`
- **Aides** : 1 « Calcule chaque membre séparément, puis compare » · 2 `∇f = (…, …, 0)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « Soit F = g(|x|)·x avec g ∈ C¹ ; alors… » (série de révision 2021-22) : div F = 0 pour tout g, ∮ F · dl = 1 pour un g, F dérive d'un potentiel donné par ∫ t g(t) dt, aucune ; distracteurs de `v_identity_drop_term`. `open` : non.
- **Pièges** : `v_identity_drop_term`, `v_div_rot_confuse`.
- **Sous-buts → crédit** : `product`, `lhs`, `rhs` → `v-ops` ; `conclude` → `v-identities`.

### `v-curve-param` — Paramétrer une courbe orientée
- **Année** 15 · **Prérequis** `a2-curve-param` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `param` pour γ et ses bornes (la première partie d'un item écrit « γ = (…), t ∈ […] », sans « (t) »), `vector` pour γ′(t), `equiv` en t pour |γ′(t)| quand elle est simple (segment, cercle, hélice). L1–L2 : la paramétrisation, puis la ligne avec ses bornes à trous ; L2 : décision « quel type de courbe ? » ; L3 : menu des quatre paramétrisations (sens inversé, bornes doublées, rayon R²) ; L4 : bord d'un triangle (trois segments), arc d'ellipse, graphe ou hélice ; L5 : bord orienté d'un demi-disque, d'un triangle ou d'un quart de couronne, morceau par morceau avec γ′. Arcs de cercle par quarts de tour, dans les deux sens ; pas de repère interactif.
- **Intro** : une courbe se paramètre par γ : [a ; b] → ℝⁿ, avec un sens. Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1]. Cercle de centre c et rayon R, sens positif : γ(t) = c + R(cos t, sin t), t ∈ [0 ; 2π]. Graphe y = g(x) : γ(t) = (t, g(t)). Le sens inverse : γ(a + b − t). Exemple : `math: γ(t) = (2 cos t, 2 sin t), t ∈ [0 ; π]`, `note: demi-cercle supérieur, de (2, 0) à (−2, 0)` ; `math: γ′(t) = (−2 sin t, 2 cos t), |γ′(t)| = 2`, `note: γ′ ≠ 0, courbe régulière`.
- **Juge** : `param` `{curve:{implicit:'x^2+y^2=4', where:'y>=0'}, orientation:{from:[2,0], to:[-2,0]}}` pour la ligne γ ; puis `equiv` `{vars:['t']}` pour γ′ et |γ′| · **Forme finale** : γ(t), l'intervalle de t, γ′(t), |γ′(t)| simplifié.
- **Niveaux** :
  - L1 : le type de courbe donné (« cercle de rayon 2 »), γ à trous.
  - L2 : choisir le type (segment, cercle, graphe, ellipse), puis remplir.
  - L3 : choisir la paramétrisation parmi 4 (dont une dans le mauvais sens, une avec les mauvaises bornes), puis calculer γ′.
  - L4 : libre, avec un bord de triangle (3 morceaux) ou un arc d'ellipse.
  - L5 : bord orienté d'un domaine (demi-disque, triangle, quart de couronne) : liste des morceaux, sens positif, γ′ de chacun.
- **Générateur** : cercles de centre entier dans [−2 ; 2]² et de rayon 1 à 3 ; ellipses de demi-axes entiers distincts dans {1, 2, 3} ; segments entre points entiers ; graphes y = x², y = x³, y = √x sur [0 ; 1] ; arcs de quart ou de demi-cercle. Courbe de l'espace : hélice (cos t, sin t, kt), k ∈ {1, 2}. Le sens est donné par deux points ou par « le domaine à gauche ». Exclure les arcs qui passent deux fois au même point.
- **Corrigé type** (demi-cercle supérieur de rayon 2, de (2, 0) à (−2, 0)) :
  1. `γ(t) = (2 cos t, 2 sin t)` — sous-but `param`
  2. `t ∈ [0 ; π]` — sous-but `bounds`
  3. `γ′(t) = (−2 sin t, 2 cos t)` — sous-but `deriv`
  4. `|γ′(t)| = 2` — sous-but `speed`
- **Aides** : 1 « Quel est le type de courbe ? Cercle : (R cos t, R sin t) » · 2 `γ(t) = (2 cos t, 2 sin t), t ∈ [0 ; …]` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` « Quelle paramétrisation décrit Γ parcourue de A à B ? » ; distracteurs : sens inversé (`v_orientation_reversed`), mauvaises bornes, rayon au carré. `open` : première étape d'un problème.
- **Pièges** : `v_orientation_reversed`, `v_param_bounds`, `v_radius_squared`.
- **Sous-buts → crédit** : `param`, `bounds` → `v-curve-param` ; `deriv`, `speed` → `a2-curve-param`.

### `v-line-scalar` — Intégrale curviligne d'un champ scalaire ∫ f dl
- **Année** 15 · **Prérequis** `v-curve-param`, `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). La partie `definite` part d'une lettre de valeur connue (I, L ; `cfg.known`) : l'élève écrit lui-même ∫ f(γ(t))·|γ′(t)| dt. Gabarits : segment de longueur entière (3-4-5), cercle centré en 0 avec f polynôme de degré ≤ 2 (valeurs exactes par Wallis), courbe γ′ = (t² ; c ; √(2c)t) à carré parfait caché (c = 1/2, 2, 8 ; en L4, L5 et variante `open` de 4 points), avec ∫ f dl pour f = z/s en L5. L1 : γ donnée ; L3 : décision « |γ′(t)| ou γ′(t) ? ». Le piège `g6_sqrt_x2_abs` n'est pas proposé.
- **Intro** : ∫_Γ f dl = ∫ₐᵇ f(γ(t)) |γ′(t)| dt ; avec f = 1, c'est la longueur. Le résultat ne dépend ni du sens ni de la paramétrisation. Exemple : longueur de γ(t) = (t³/3, 3t, (√6/2) t²), t ∈ [−1 ; 1] (examen 2021) ; `math: |γ′(t)|² = t⁴ + 6t² + 9 = (t² + 3)²`, `note: carré parfait, c'est voulu` ; `math: long(Γ) = ∫₋₁¹ (t² + 3) dt = 20/3`.
- **Juge** : `param` pour la ligne γ ; puis `definite` `{value}` pour les lignes en t et la valeur · **Forme finale** : nombre exact simplifié.
- **Niveaux** :
  - L1 : γ donné, |γ′| et l'intégrande en t à trous.
  - L2 : γ à trouver (cercle), le reste à trous.
  - L3 : « faut-il |γ′(t)| ou γ′(t) ? », puis les lignes.
  - L4 : libre.
  - L5 : longueur d'une courbe dont |γ′|² est un carré parfait caché, puis ∫ f dl sur la même courbe.
- **Générateur** : construction à l'envers de |γ′| : γ′ = (t², c, √(2c)·t) donne |γ′| = t² + c ; c ∈ {1, 2, 3, 4, 8} pour que √(2c) soit simple ou entier (c = 2 ou 8 donnent 2 ou 4) ; intervalle [−1 ; 1] ou [0 ; 2]. Deuxième gabarit : f polynôme de degré ≤ 2 sur un cercle de rayon R ∈ {1, 2, 3} (réponse multiple de π, termes impairs nuls), comme ∫ (xy + x + 1) dl = 2πR (examen blanc 2021). Troisième : segment entre points entiers avec |B − A| entier (triplets 3-4-5, 6-8-10, 5-12-13).
- **Corrigé type** (Γ segment de (0, 0) à (3, 4), f = x + y) :
  1. `γ(t) = (3t, 4t), t ∈ [0 ; 1]` — sous-but `param`
  2. `|γ′(t)| = |(3, 4)| = 5` — sous-but `speed`
  3. `∫_Γ f dl = ∫₀¹ (3t + 4t) · 5 dt` — sous-but `integrand`
  4. `= 35 ∫₀¹ t dt = 35/2` — sous-but `value`
- **Aides** : 1 « Paramètre, puis multiplie f(γ(t)) par la **vitesse** |γ′(t)| » · 2 `∫₀¹ (3t + 4t) · … dt` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∫_Γ (xy + x + 1) dl sur le cercle de rayon R » : 2πR ; distracteurs de `v_speed_forgot` (2π), de `v_radius_squared` (2πR²), et 2R² + R + 1 (f évalué en un point). `open` (4 pts, 2021) : longueur de la courbe à carré parfait.
- **Pièges** : `v_speed_forgot`, `g6_sqrt_x2_abs`, `v_radius_squared`.
- **Sous-buts → crédit** : `param` → `v-curve-param` ; `speed`, `integrand` → `v-line-scalar` ; `value` → `a1-int-direct`.

### `v-line-vector` — Travail ∫ F · dl et orientation
- **Année** 15 · **Prérequis** `v-curve-param`, `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `param`, `vector` (γ′) et `definite` (départ W de valeur connue). Gabarits : champ polynomial de degré ≤ 2 sur un segment, un graphe y = x² ou x³ (dans les deux sens) ou un arc de cercle partant de l'angle 0 ; gabarit trigonométrique F = (ax² + cy ; bxy + dx) sur un quart, un demi ou un cercle entier (sin t cos²t, `v_sincos_sign`). L1 : γ et γ′ donnés ; L2 : γ donnée ; L3 : décision « paramétrer / potentiel / |γ′| en trop » (le champ n'est pas conservatif) ; L5 : bord d'un demi-disque en deux morceaux, puis la somme. Le gabarit γ(t) = (cos 2t ; cos t) n'est pas fait ; le cas « courbe compliquée, F = ∇φ » est dans `v-pot-find` (L5). Variante `open` : 3 points.
- **Intro** : ∫_Γ F · dl = ∫ₐᵇ F(γ(t)) · γ′(t) dt. Changer de sens change le signe. Pas de |γ′| ici. Exemple : F = (y², x), Γ : y = x² de (0, 0) à (1, 1) ; `math: γ(t) = (t, t²), γ′(t) = (1, 2t)`, `note: t de 0 à 1` ; `math: F(γ(t)) · γ′(t) = t⁴ + 2t²` ; `math: ∫₀¹ (t⁴ + 2t²) dt = 13/15`.
- **Juge** : `param` `{curve, orientation}` ; puis `definite` `{value}` · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : γ et γ′ donnés, le produit scalaire à trous.
  - L2 : γ′ à calculer, produit scalaire à trous.
  - L3 : choisir « paramétrer » ou « chercher un potentiel » (décision `quality:'poor'` si F dérive d'un potentiel et que la courbe est compliquée), puis les lignes.
  - L4 : libre, avec des intégrales trigonométriques (sin t cos² t).
  - L5 : circulation sur un bord fermé en plusieurs morceaux.
- **Générateur** : F polynomial de degré ≤ 2 en x, y ; courbes de `v-curve-param` ; réponses rationnelles ou rationnel·π. Gabarit trigonométrique : γ(t) = (cos 2t, cos t) ou (cos t, sin t), intégrandes en sin³, sin t cos² t (corrigé 2022). Gabarit « courbe compliquée, F = ∇φ » : γ(t) = (t, 2t³, t⁹) et F conservatif (série de révision) ; la décision « potentiel » est `good`, « paramétrer » est `poor`.
- **Corrigé type** (F = (y², x), y = x² de (0, 0) à (1, 1)) :
  1. `γ(t) = (t, t²), t ∈ [0 ; 1]` — sous-but `param`
  2. `γ′(t) = (1, 2t)` — sous-but `deriv`
  3. `F(γ(t)) · γ′(t) = t⁴ · 1 + t · 2t = t⁴ + 2t²` — sous-but `integrand`
  4. `∫₀¹ (t⁴ + 2t²) dt = 1/5 + 2/3 = 13/15` — sous-but `value`
- **Aides** : 1 « Remplace x et y par γ(t), puis fais le produit scalaire avec γ′(t) » · 2 `F(γ(t)) = (t⁴, …)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∮_Γ (x, y) · dl sur le cercle de rayon R » : 0 (examen 2022) ; distracteurs 2πR, πR², 2πR² (`v_speed_forgot`, confusion avec l'aire). `open` (2022, 3 pts sur 5) : circulation de F le long de γ(t) = (cos 2t, cos t).
- **Pièges** : `v_gamma_prime_forgot`, `v_orientation_reversed`, `v_sincos_sign`, `v_speed_in_work`.
- **Sous-buts → crédit** : `param`, `deriv` → `v-curve-param` ; `integrand` → `v-line-vector` ; `value` → `a1-int-direct`.

### `v-domain-topo` — Convexe, étoilé, simplement connexe
- **Année** 15 · **Prérequis** `a2-rn-topology` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a2-rn-topology` : ouverts de ℝ² et ℝ³.
- **Statut** : fait le 10 novembre 2026 (étape U10). Une banque de 15 domaines (rectangle, disque, demi-plan, intérieur d'une parabole, disque pointé, couronne, ℝ² \ {0}, extérieur d'un disque, plan fendu, disque privé d'un quart, L, deux disques, ℝ³ \ {0}, ℝ³ \ axe z, boule pointée). L1 : une propriété, avec un dessin (SVG du domaine) ; L2 : le profil des quatre propriétés en QCM à une réponse, avec le dessin ; L3 : le même sans dessin (pas de « tracer Ω » au repère interactif) ; L4 : item `example` (deux points dont le segment sort de Ω, `setNotConvex` ; ou une courbe fermée qui entoure le trou, `loopAroundHole` ; vérifiés par échantillonnage, `vcf-examples-va.js`) ; L5 : la question d'examen (sur quel domaine (−y ; x)/(x² + y²) a-t-il un potentiel ?).
- **Intro** : convexe ⇒ étoilé ⇒ simplement connexe ⇒ connexe, et aucune réciproque. Dans ℝ², simplement connexe = « sans trou ». ℝ² \ {0} et une couronne ne le sont pas ; ℝ³ \ {0} l'est, ℝ³ privé d'un axe ne l'est pas. Exemple : `math: Ω = {1 ≤ x ≤ 3, 2 ≤ y ≤ 10}`, `note: rectangle : convexe` ; `math: Ω = {2 ≤ x² + y² ≤ 4}`, `note: couronne : connexe, pas simplement connexe`.
- **Juge** : item `mcq` par propriété (cases « convexe », « étoilé », « simplement connexe », « connexe »), puis `example` (`property:{kind:'set-not-convex'}`) : l'élève donne deux points de Ω dont le segment sort de Ω, vérifié par échantillonnage · **Forme finale** : les quatre cases justes ; un contre-exemple vérifié si « non convexe ».
- **Niveaux** :
  - L1 : un dessin du domaine, une seule propriété à cocher.
  - L2 : les quatre propriétés, avec le dessin.
  - L3 : sans dessin ; l'élève choisit d'abord « tracer Ω » (repère du plan d'algèbre).
  - L4 : donner deux points dont le segment sort de Ω, ou une courbe fermée de Ω qui entoure le trou.
  - L5 : enchaîner avec `v-pot-test` : sur quel domaine le théorème s'applique-t-il ?
- **Générateur** : liste de domaines types avec leurs propriétés : rectangles, disques (avec ou sans l'origine), couronnes, demi-plans, ℝ² \ {0}, ℝ² \ demi-droite (étoilé, pas convexe), ℝ³ \ {0}, ℝ³ \ axe z, boule trouée, secteur. Paramètres entiers ; rejeter les doublons d'une série.
- **Corrigé type** (Ω = {2 ≤ x² + y² ≤ 4}) :
  1. `(√2, 0) et (−√2, 0) ∈ Ω, (0, 0) ∉ Ω` — sous-but `counterexample`
  2. non convexe, non étoilé — sous-but `convex`
  3. le cercle x² + y² = 3 ne se réduit pas à un point dans Ω : non simplement connexe — sous-but `simply`
  4. connexe — sous-but `connected`
- **Aides** : 1 « Y a-t-il un trou ? Un segment qui sort ? » · 2 « Essaie le segment entre (√2, 0) et (−√2, 0) » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (examen blanc 2021) « F = (−y, x)/(x² + y²) dérive d'un potentiel sur : le rectangle [1 ; 3] × [2 ; 10] / la couronne 2 ≤ x² + y² ≤ 4 / le disque x² + y² ≤ 10 / tout domaine » : bonne réponse le rectangle ; distracteurs de `v_simply_connected_wrong` et `v_pot_no_domain`. `open` : non.
- **Pièges** : `v_simply_connected_wrong`, `v_convex_star_confuse`.
- **Sous-buts → crédit** : tous → `v-domain-topo`.

### `v-pot-test` — Le test rot F = 0 et son domaine
- **Année** 15 · **Prérequis** `v-ops`, `v-domain-topo` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Les composantes de rot F (`equiv`), puis une partie « Conclusion » : deux décisions (le domaine est-il simplement connexe ? que dit le critère : oui, non, ou il ne conclut pas ?) et rot F écrit comme un vecteur (juge `vector`). Champs : ∇φ polynomial sur ℝ³ ou un domaine convexe, le même perturbé (rot F ≠ 0), ou (a(x, y) + b(−y, x))/(x² + y²) sur un domaine troué ou un demi-plan. Pas de `blocks` de justification ; L5 : problème de trois QCM (trois champs, trois domaines). QCM d'examen : (ax ; b/y) sur {y > 0} (format 2022), ou (ay ; b/y).
- **Intro** : si F = ∇φ et F ∈ C¹, alors rot F = 0 (condition **nécessaire**). Si de plus Ω est **simplement connexe** (en particulier convexe), rot F = 0 suffit. Si Ω n'est pas simplement connexe, le théorème ne dit rien. Exemple : F = (2xy + z, x², x + 2z) sur ℝ³ ; `math: rot F = (0 − 0, 1 − 1, 2x − 2x) = (0, 0, 0)` ; `note: ℝ³ est convexe, donc F dérive d'un potentiel`.
- **Juge** : `equiv` pour rot F (comme `v-ops`) ; puis une ligne de décision `{kind:'decision', prompt:'Que peut-on conclure ?', options:[oui (Ω simplement connexe), on ne sait pas encore (Ω non simplement connexe), non (rot F ≠ 0)]}` ; puis un `blocks` de justification à L4–L5 · **Forme finale** : rot F, la propriété du domaine nommée, la conclusion.
- **Niveaux** :
  - L1 : rot F à trous, domaine ℝ³, conclusion à choisir.
  - L2 : rot F seul ; la propriété du domaine à choisir.
  - L3 : décision : « calculer rot », « étudier le domaine », « chercher une courbe fermée » ; ordre libre, les trois doivent apparaître si besoin.
  - L4 : libre, domaines variés (ℝ² \ {0}, demi-plan, couronne).
  - L5 : trois champs, trois domaines : conclure pour chaque paire.
- **Générateur** : à l'envers : φ tiré (polynôme de degré ≤ 3, plus éventuellement Arctg(y/x) ou ln(x² + y²)), F = ∇φ, puis une perturbation pour les cas « non » (on ajoute (0, x, 0) ou on change un coefficient). Domaines : ceux de `v-domain-topo`. Les champs singuliers en 0 vont avec ℝ² \ {0} ou une couronne.
- **Corrigé type** (F = (2xy + z, x², x + 2z) sur ℝ³) :
  1. `rot F = (∂_y(x + 2z) − ∂_z(x²), ∂_z(2xy + z) − ∂_x(x + 2z), ∂_x(x²) − ∂_y(2xy + z))` — sous-but `rot-formula`
  2. `= (0, 0, 0)` — sous-but `rot-zero`
  3. ℝ³ est convexe, donc simplement connexe — sous-but `domain`
  4. donc F dérive d'un potentiel sur ℝ³ — sous-but `conclude`
- **Aides** : 1 « Deux choses à vérifier : rot F = 0, et la forme du domaine » · 2 « rot F = (…, …, …) ; ℝ³ est-il convexe ? » · 3 les lignes 3 et 4.
- **Variantes d'examen** : `mcq` « F(x, y) = (x, 4/y) sur Ω = {y > 0} dérive-t-il d'un potentiel ? » (format 2022) ; distracteurs de `v_pot_no_domain` et `v_rot_closed_zero`. `open` : 1 pt de rédaction dans chaque problème de potentiel (« mentionner la convexité »).
- **Pièges** : `v_pot_no_domain`, `v_rot_closed_zero`, `v_rot_sign`, `v_rot_scalar_sum`.
- **Sous-buts → crédit** : `rot-formula`, `rot-zero` → `v-ops` ; `domain` → `v-domain-topo` ; `conclude` → `v-pot-test`.

### `v-pot-find` — Trouver un potentiel pas à pas
- **Année** 15 · **Prérequis** `v-pot-test`, `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-pot-test` : vérifier rot F = 0 sur un domaine adapté avant de chercher φ.
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `antideriv` avec `grad` ; les comparaisons ∂α/∂y = … sont des notes, les lignes jugées sont les potentiels successifs (φ = G₁ + α(y, z), G₁ + G₂ + β(z), φ + C, C = …, φ final). L2 : décision « par quelle variable commencer ? » ; L3 : menu (intégrer, comparer, fixer la constante ; une constante au lieu de α, les trois primitives additionnées) ; L4 : en 2D ou 3D, avec sin(xz) ou e^(xy), parfois avec φ(P) = 0 ; L5 : φ(P) = 0, puis ∫ F · dl = φ(B) − φ(A) le long de (t ; 2t³ ; t⁹) (décision : potentiel, ou paramétrer `poor`). Variante `open` : 4 points, avec φ(P) = 0.
- **Intro** : on intègre F₁ en x, avec une « constante » qui dépend des **autres** variables : φ = ∫ F₁ dx + α(y, z). On dérive en y, on compare à F₂, ce qui donne α en fonction de y et z, et ainsi de suite. À la fin, une seule constante C ; on la fixe si une valeur φ(P) est imposée. Exemple : `math: φ = x²y + xz + α(y, z)`, `note: ∫ (2xy + z) dx` ; `math: ∂_yφ = x² + α_y = x²`, `note: donc α = β(z)` ; `math: ∂_zφ = x + β′(z) = x + 2z`, `note: β = z² + C`.
- **Juge** : `antideriv` étendu au gradient `{grad:['2xy+z','x^2','x+2z'], vars:['x','y','z']}` : une ligne `φ = G + α(variables restantes)` est juste si ∂G/∂v = Fᵥ pour chaque variable v absente des arguments de α ; une ligne `α_y = …` est jugée par `equiv` contre Fᵧ − ∂_yG ; la condition φ(P) = 0 par `value` · **Forme finale** : φ explicite, sans fonction inconnue ; une seule constante, fixée si une condition est donnée. Sinon `stay` : « Il reste une fonction inconnue » ou « La constante n'est pas fixée ».
- **Niveaux** :
  - L1 : les 4 lignes du corrigé, les primitives à trous.
  - L2 : choisir par quelle variable commencer, puis les lignes à trous.
  - L3 : à chaque étape, choisir « intégrer en … », « dériver en … et comparer », « fixer la constante ».
  - L4 : libre, en 2D puis en 3D.
  - L5 : potentiel avec condition φ(P) = 0, puis ∫_Γ F · dl = φ(B) − φ(A) sur une courbe compliquée.
- **Générateur** : à l'envers : φ = somme de 3 ou 4 termes parmi x^a y^b z^c (degré ≤ 3, coefficients dans {−3, …, 5} \ {0}), sin(xz), e^(xy), z² ; F = ∇φ. Point P à coordonnées dans {−2, …, 3} ; la constante C = −φ₀(P) est un entier de valeur absolue ≤ 30. Rejeter si un Fᵢ est nul (trop facile) ou si un terme ne dépend que d'une variable déjà épuisée à L1. Gabarits : « Trouver φ telle que F = ∇φ » ; « … et φ(P) = 0 » ; « En déduire ∫_Γ F · dl pour γ(t) = (t, 2t³, t⁹) ».
- **Corrigé type** (F = (2xy + z, x², x + 2z), φ(1, 2, −1) = 0) :
  1. `φ = ∫ (2xy + z) dx = x²y + xz + α(y, z)` — sous-but `integrate-x`
  2. `∂_yφ = x² + ∂_yα = x², donc ∂_yα = 0 et α = β(z)` — sous-but `compare-y`
  3. `∂_zφ = x + β′(z) = x + 2z, donc β(z) = z² + C` — sous-but `compare-z`
  4. `φ = x²y + xz + z² + C` — sous-but `assemble`
  5. `φ(1, 2, −1) = 2 − 1 + 1 + C = 0, donc C = −2` — sous-but `constant`
  6. `φ = x²y + xz + z² − 2` — sous-but `final`
- **Aides** : 1 « Intègre F₁ en x ; la "constante" dépend de y et z » · 2 `φ = x²y + xz + α(…, …)` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` « Une fonction potentiel de F est : » (4 options, distracteurs de `v_pot_double_count` et `v_pot_const_fn`). `open` (2022, 2e partie, 4 pts) : potentiel avec φ(P) = 0.
- **Pièges** : `v_pot_const_fn`, `v_pot_double_count`, `v_pot_final_const`, `v_pot_poly_integral`, `v_potential_sign`.
- **Sous-buts → crédit** : `integrate-x`, `compare-y`, `compare-z`, `assemble` → `v-pot-find` ; `constant`, `final` → `v-pot-find` ; erreur de primitive → `a1-int-direct`.

### `v-pot-lambda` — Potentiel avec un paramètre λ
- **Année** 15 · **Prérequis** `v-pot-find` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `v-pot-find` : une fois λ trouvé, on construit φ.
- **Statut** : fait le 10 novembre 2026 (étape U10). λ entre dans une ou deux contributions a·m de ∇φ, devenues (kλ + a − kλ₀)·m, de sorte que rot F = (λ − λ₀)·rot B (au moins deux composantes dépendent de λ). Parties : les composantes de rot F (`equiv` en x, y, z, λ, cible `no-int`), puis λ par `solset` à partir des équations des coefficients, avec la décision « composante par composante / additionner » (`v_rot_scalar_sum`) ; φ (avec φ(P) = 0 en L5) en L4 une fois sur deux et en L5. Variante `open` : problème de 6 points (rot 3, λ 1, φ 2) ; le point « domaine » est dans la note de la ligne λ.
- **Intro** : rot F = 0 est un **système de trois équations**, vraies pour tout (x, y, z). Chacune donne une condition sur λ ; on garde les λ qui les vérifient toutes. Exemple : F = (2xy + λz, λx², x + 2z) ; `math: rot F = (0, λ − 1, 2(λ − 1)x)` ; `math: λ − 1 = 0 et 2(λ − 1)x = 0 pour tout x`, `note: donc λ = 1`.
- **Juge** : `equiv` pour rot F ; `solset` `{v:'λ', domain:'R'}` pour la ligne « λ ∈ {1} » ; puis le juge de `v-pot-find` · **Forme finale** : la valeur de λ, puis φ.
- **Niveaux** :
  - L1 : rot F à trous, les trois équations écrites.
  - L2 : écrire les trois équations, les résoudre.
  - L3 : choisir entre « écrire rot F = 0 composante par composante » et « additionner les composantes » (`valid:false`, `why`: une somme nulle ne dit pas que chaque terme est nul).
  - L4 : libre.
  - L5 : λ puis φ avec φ(P) = 0 (problème de 6 pts, 2022).
- **Générateur** : à l'envers : φ tiré comme dans `v-pot-find`, F = ∇φ ; on remplace un ou deux coefficients c par λc ou par (λ + 1)c/2, de sorte que rot F = 0 ⟺ λ = λ₀ avec λ₀ ∈ {−2, −1, 1, 2, 3}. Au moins deux composantes de rot F doivent dépendre de λ (pour le piège « une seule équation »). Gabarits : « Pour quelles valeurs de λ… ? » ; « … puis trouver φ avec φ(P) = 0 ».
- **Corrigé type** (F = (2xy + λz, λx², x + 2z) sur ℝ³) :
  1. `rot F = (0 − 0, λ − 1, 2λx − 2x)` — sous-but `rot`
  2. `λ − 1 = 0 et 2(λ − 1)x = 0 pour tout x` — sous-but `system`
  3. `λ = 1` — sous-but `solve`
  4. ℝ³ convexe : pour λ = 1, F dérive d'un potentiel, et pour λ ≠ 1, non — sous-but `conclude`
- **Aides** : 1 « rot F = 0 veut dire trois équations, pour tout point » · 2 `(λ − 1)·(…) = 0 pour tout x` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` « F dérive d'un potentiel si et seulement si λ = » ; distracteurs de `v_rot_scalar_sum` (la somme des composantes) et `v_rot_sign`. `open` (2022, 6 pts) : 1 pt domaine, 2 pts rot, 1 pt λ, 2 pts φ.
- **Pièges** : `v_rot_scalar_sum`, `v_rot_sign`, `v_pot_no_domain`.
- **Sous-buts → crédit** : `rot` → `v-ops` ; `system`, `solve` → `v-pot-lambda` ; `conclude` → `v-pot-test`.

### `v-pot-none` — Prouver qu'il n'y a pas de potentiel
- **Année** 15 · **Prérequis** `v-line-vector`, `v-pot-test` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-pot-test` : rot F = 0 ne suffit pas sur un domaine troué.
- **Statut** : fait le 10 novembre 2026 (étape U10). Champ (a(x, y) + b(−y, x))/(x² + y²), ou centré en (c ; 0) ; cercle de rayon 1 ou 2 autour du trou, ∮ = 2πb. L1 : le cercle donné, l'intégrale à trous ; L2–L4 : rot F, puis des décisions (le critère conclut-il ? quelle courbe ?), la paramétrisation, ∮, et une partie « Conclusion » (décision, puis la valeur rappelée) ; L5 : `blocks` de la preuve avec deux leurres (`v_rot_closed_zero`, `v_pot_no_domain`). Variante `open` : 6 points (conversion en problème).
- **Intro** : si F = ∇φ sur Ω, alors ∮_Γ F · dl = 0 pour **toute** courbe fermée Γ ⊂ Ω. Une seule courbe fermée avec ∮ ≠ 0 suffit donc à prouver « pas de potentiel ». La réciproque avec une seule courbe est fausse. Exemple : F = (−y, x)/(x² + y²) sur ℝ² \ {0} ; `math: rot F = 0`, `note: mais le domaine a un trou` ; `math: ∮_{cercle unité} F · dl = ∫₀^{2π} (sin²t + cos²t) dt = 2π ≠ 0`, `note: donc pas de potentiel`.
- **Juge** : `param` (la courbe doit être fermée et contenue dans Ω), `definite` pour ∮, puis une décision ; `blocks` à L5 · **Forme finale** : une courbe fermée de Ω, la valeur ∮ ≠ 0, la conclusion.
- **Niveaux** :
  - L1 : le cercle unité donné, l'intégrale à trous.
  - L2 : choisir la courbe (cercle autour du trou, cercle qui ne l'entoure pas).
  - L3 : décision « rot F = 0 suffit-il ici ? », puis la courbe.
  - L4 : libre.
  - L5 : remettre en ordre les blocs de la preuve, avec deux leurres (« ∮ = 0 sur un cercle, donc potentiel » ; « rot F = 0, donc potentiel »).
- **Générateur** : F = a·(x, y)/r² + b·(−y, x)/r² avec a ∈ {0, 1, 2}, b ∈ {1, 2, 3} (rot = 0, ∮ cercle = 2πb) ; variante (−y, x)/((x − c)² + y²) centrée en (c, 0), c ∈ {1, 2}, avec un cercle centré en (c, 0). Cas « piège » : cercle qui n'entoure pas le trou (∮ = 0, rien à conclure).
- **Corrigé type** (F = ((x − y)/(x² + y²), (x + y)/(x² + y²)) sur ℝ² \ {0}, examen 2021) :
  1. `rot F = 0 sur Ω` — sous-but `rot`
  2. Ω n'est pas simplement connexe : le théorème ne conclut pas — sous-but `domain`
  3. `γ(θ) = (cos θ, sin θ), θ ∈ [0 ; 2π]` — sous-but `param`
  4. `F(γ) · γ′ = (cos θ − sin θ)(−sin θ) + (cos θ + sin θ) cos θ = 1` — sous-but `integrand`
  5. `∮ F · dl = 2π ≠ 0` — sous-but `value`
  6. donc F ne dérive pas d'un potentiel sur Ω — sous-but `conclude`
- **Aides** : 1 « Cherche une courbe fermée qui entoure le trou » · 2 `γ(θ) = (cos θ, sin θ) ; F(γ(θ)) · γ′(θ) = …` · 3 la ligne 4.
- **Variantes d'examen** : `mcq` « Le champ (x, 4/y)… » ou « F = (−y, x)/(x² + y²) est conservatif sur… » (2021, 2022). `open` (2021, 6 pts) : voir `v-pot-domain`.
- **Pièges** : `v_rot_closed_zero`, `v_green_singular`, `v_pot_on_restricted`.
- **Sous-buts → crédit** : `rot` → `v-ops` ; `domain` → `v-domain-topo` ; `param`, `integrand`, `value` → `v-line-vector` ; `conclude` → `v-pot-none`.

### `v-pot-domain` — Problème : potentiel et discussion du domaine
- **Année** 15 · **Prérequis** `v-pot-none`, `v-pot-find` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). L1–L4 : un item `lines` (les QCM du problème deviennent des décisions) : rot F, décision sur le domaine, cercle et ∮, potentiel sur {x > 0} (Arctg(y/x)), puis ∂φ/∂y = F₂ avec la décision « est-ce un potentiel sur Ω ? » (`v_pot_on_restricted`) ; ou le second gabarit (F = ∇(p + (a/2) ln(x² + y²)) sur {x² + y² > 1} : un potentiel malgré le trou). L5 et variante `open` : `problem` de 8 points (barème V2 : rot 2, domaine 1, ∮ 2, conclusion 1, potentiel 1,5, pourquoi pas sur Ω 0,5 ; second gabarit : rot 2, domaine 1, potentiel 3, conclusion 2) ; variante `open` de 6 points (2021) sans le demi-plan. Pas de L4 « problème avec aides » : un `problem` n'a pas d'aide.
- **Intro** : un même champ peut dériver d'un potentiel sur un domaine et pas sur un autre. Méthode : rot F ; propriété du domaine ; si le domaine n'est pas simplement connexe, ∮ sur une courbe autour du trou ; sur un domaine plus petit (demi-plan), on trouve φ et on vérifie qu'elle y est **définie**. Exemple : `math: φ = Arctg(y/x) + ½ ln(x² + y²)`, `note: n'est définie que pour x ≠ 0 : potentiel sur {x > 0}, pas sur ℝ² \ {0}`.
- **Juge** : item `problem` dont les parties sont des `lines` jugés par `equiv` (rot), `mcq` (domaine), `definite` (∮), `antideriv` grad (φ), plus un `blocks` de conclusion · **Forme finale** : conclusion pour chaque domaine.
- **Niveaux** :
  - L1 à L3 : les parties séparées, avec les juges de `v-pot-test`, `v-pot-none` et `v-pot-find`.
  - L4 : le problème entier, avec aides.
  - L5 : `problem` sans aide, `noHints`.
- **Générateur** : F = a·(x, y)/r² + b·(−y, x)/r² (a ∈ {0, 1, 2}, b ∈ {1, 2, 3}) ; φ = (a/2) ln(x² + y²) + b·Arctg(y/x) sur {x > 0} ; deuxième domaine au choix : {x > 0}, {y > 0} (avec φ = (a/2) ln r² − b·Arctg(x/y)), {x² + y² > 1} (couronne non bornée : non simplement connexe). Deuxième gabarit (dans l'esprit de la série de révision) : F = ∇(p(x, y) + (a/2) ln(x² + y²)) avec p polynôme de degré ≤ 3, sur {x² + y² > 1} : rot F = 0, le domaine a un trou, mais on trouve un potentiel défini sur **tout** le domaine, donc la réponse est « oui » malgré le trou (∮ autour du trou vaut 0, ce qui ne prouve rien à lui seul).
- **Corrigé type** (F = ((x − 2y)/r², (2x + y)/r²), r² = x² + y²) :
  1. `rot F = ∂_x((2x + y)/r²) − ∂_y((x − 2y)/r²) = 0` — sous-but `rot` (1,5 pt)
  2. Ω = ℝ² \ {0} n'est pas simplement connexe — sous-but `domain` (1 pt)
  3. `∮_{cercle unité} F · dl = ∫₀^{2π} 2 dθ = 4π ≠ 0`, pas de potentiel sur Ω — sous-but `circulation` (2,5 pts)
  4. sur {x > 0} (convexe) : `φ = ½ ln(x² + y²) + 2 Arctg(y/x) + C` — sous-but `potential` (2 pts)
  5. φ est définie et C¹ sur {x > 0} et ∇φ = F — sous-but `check` (1 pt)
- **Aides** : aucune en L5 ; en L4, celles des compétences des parties.
- **Variantes d'examen** : `open` (2021 et examen blanc 2021, 6 pts ; variante 8 pts avec le demi-plan). `mcq` : non (voir les parties).
- **Pièges** : `v_pot_no_domain`, `v_rot_closed_zero`, `v_pot_on_restricted`, `v_rot_sign`.
- **Sous-buts → crédit** : `rot` → `v-ops` ; `domain` → `v-domain-topo` ; `circulation` → `v-pot-none` ; `potential`, `check` → `v-pot-find` ; l'item entier → `v-pot-domain`.

### `v-green` — Théorème de Green et calcul d'une aire
- **Année** 15 · **Prérequis** `v-line-vector`, `v-ops`, `a2-fubini-rect`, `a2-polar-int` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `v-line-vector` : le membre ∮ F · dl est un travail ; `v-ops` : rot F scalaire en 2D ; `a2-polar-int` : domaines en disque : ∬ en polaires.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `equiv` (rot F, à partir de ∂F₂/∂x − ∂F₁/∂y écrits avec `pd`) et `definite` (∬_D rot F en cartésiennes, en polaires, ou en coordonnées elliptiques pour l'ellipse) ; L1 : ces deux lignes à trous (pas le tableau entier du plan) ; L2 à L4 : décision « Green, paramétrer le bord (`poor`), ou aire » ; L4 tire aussi l'aire d'une ellipse par ½∮(x dy − y dx) (juge `param` pour le bord) et le champ (−y, x)/(x² + y²) (décision « Green s'applique-t-il ? », piège `v_green_singular`) ; L5 : vérifier Green sur un demi-disque pour F = (−by, ax), le diamètre étant une note (F · γ′ = 0) ; pas de triangle en L5. Variante `open` : 3 points (rot F, puis ∮ = rot F × aire) au lieu de 2, le plan `ba3-analyse3` demandant 3 à 14 points.
- **Intro** : A domaine régulier, ∂A orienté positivement (A à gauche), F ∈ C¹ sur Ā : ∬_A rot F dx dy = ∮_∂A F · dl. Il faut **calculer** rot F : s'il est constant (rot F = 2), ∮ = 2 · aire(A). Aire : ½∮(x dy − y dx). Pas de Green si F a une singularité dans A. Exemple (plan, §5) : F = (−y, x) sur le disque unité ; `math: ∮ F · dl = ∫₀^{2π} 1 dt = 2π` ; `math: rot F = 1 − (−1) = 2, ∬_D 2 dx dy = 2π`, `note: les deux membres sont égaux`.
- **Juge** : `param` pour le bord ; `definite` `{value}` pour chaque membre ; une ligne de décision « Green s'applique-t-il ? » (singularité, régularité) · **Forme finale** : la valeur, avec rot F calculé.
- **Niveaux** :
  - L1 : le tableau du plan (§5) avec des trous : γ, γ′, F · γ′, ∫, rot F, ∬.
  - L2 : un seul membre à calculer, l'autre donné.
  - L3 : décision « paramétrer le bord » ou « Green » (`quality:'poor'` pour le bord quand celui-ci a 3 morceaux et rot F est constant).
  - L4 : libre : aire d'une ellipse par Green, ou une circulation par Green.
  - L5 : vérifier Green (les deux membres) sur un demi-disque ou un triangle.
- **Générateur** : F = (−by + p(x), ax + q(y)), a, b ∈ {1, 2, 3}, p et q polynômes de degré ≤ 2 (ils ne changent pas rot F = a + b) ; domaines : disque de rayon R ∈ {1, 2, 3}, ellipse de demi-axes entiers, carré, triangle à sommets entiers, demi-disque. Cas « Green interdit » : F = (−y, x)/(x² + y²) avec un disque qui contient 0. Gabarit d'aire : ellipse x²/a² + y²/b² ≤ 1, a ≠ b dans {2, 3, 4}.
- **Corrigé type** (aire de l'ellipse x²/9 + y²/4 ≤ 1) :
  1. `γ(t) = (3 cos t, 2 sin t), t ∈ [0 ; 2π]`, sens positif — sous-but `param`
  2. `aire = ½ ∮ (x dy − y dx)` — sous-but `formula`
  3. `= ½ ∫₀^{2π} (3 cos t · 2 cos t − 2 sin t · (−3 sin t)) dt` — sous-but `integrand`
  4. `= ½ ∫₀^{2π} 6 dt = 6π` — sous-but `value`
- **Aides** : 1 « Calcule d'abord rot F : est-il constant ? » · 2 `∮ F · dl = ∬_A (…) dx dy` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∮_∂A F · ν dl ou ∮ F · dl pour F = (x², y)… sur le disque de rayon R » (examen blanc). `open` (2022, 2 pts) : « montrer que l'intégrale de la partie 1 vaut le double de l'aire de R » — le point exige rot F = 2 écrit.
- **Pièges** : `v_green_no_rot`, `v_green_singular`, `v_orientation_reversed`, `v_rot_sign`.
- **Sous-buts → crédit** : `param` → `v-curve-param` ; `formula`, `integrand` → `v-green` ; `value` → `a2-fubini-rect`.

### `v-green-flux` — Forme flux de Green : ∮ F · ν dl = ∬ div F
- **Année** 15 · **Prérequis** `v-green` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-green` : même théorème, sous forme de flux.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `equiv` (div F, décision « ∬ div F ou ∬ rot F »), `domain` (bornes de type I du triangle ou du carré, dès L2) et `definite` (décision sur l'ordre des intégrales du triangle, piège `v_fubini_bounds`) ; disque en polaires. Gabarit de l'examen 2021 avec a² = π seulement : avec a² = π/2, la valeur ½ + π√(2π)/6 n'est pas une forme close du juge `definite`. L5 : le carré, ∬ div F puis le bord côté par côté (ν du côté x = a par le juge `vector`, piège `v_nu_formula`), les côtés où F · ν = 0 en note. Variante `open` : le problème de L4 (5 points).
- **Intro** : ν est la normale **extérieure unité** au bord : ν = (γ₂′, −γ₁′)/|γ′| pour un bord orienté positivement. Alors ∮_∂A F · ν dl = ∬_A div F dx dy. Sur un triangle ou un carré, Green évite de découper le bord. Exemple : F = (x², y) sur [0 ; 1]² ; `math: div F = 2x + 1` ; `math: ∬ (2x + 1) dx dy = 1 + 1 = 2`.
- **Juge** : `equiv` pour div F, `definite` pour l'intégrale double et pour la somme sur les côtés · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : div F à trous, bornes données.
  - L2 : les bornes du triangle à écrire (type I).
  - L3 : décision « 3 côtés à la main » ou « forme flux de Green » (`poor` pour les côtés).
  - L4 : libre.
  - L5 : vérifier les deux membres sur le carré (4 côtés, ν de chacun).
- **Générateur** : F = (p(x), y·q(x)) avec p polynôme de degré ≤ 2 et q ∈ {1, cos(x²), x} : le terme y cos(x²) se dérive en cos(x²) et s'intègre grâce au facteur x de la borne (triangle (0, 0), (a, 0), (a, a), a² ∈ {π/2, π}, examen 2021). Domaines : carré [0 ; a]², triangle rectangle à sommets entiers, disque.
- **Corrigé type** (F = (x², y cos(x²)), triangle (0, 0), (a, 0), (a, a) avec a = √(π/2), examen 2021) :
  1. A est régulier, F ∈ C¹ : `∮_∂A F · ν dl = ∬_A div F dx dy` — sous-but `theorem`
  2. `div F = 2x + cos(x²)` — sous-but `div`
  3. `∬_A div F = ∫₀ᵃ ∫₀ˣ (2x + cos x²) dy dx = ∫₀ᵃ (2x² + x cos x²) dx` — sous-but `bounds`
  4. `= 2a³/3 + ½ sin(a²) = ½ + (π/6)√(2π)` — sous-but `value`
- **Aides** : 1 « ν est la normale : c'est la forme "divergence" de Green » · 2 `∫₀ᵃ ∫₀^{…} (2x + cos x²) dy dx` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∮_∂A F · ν dl, F = (x, y), disque de rayon R » : 2πR² ; distracteurs : 0 (rot pris pour div, `v_div_rot_confuse`), πR², 2πR. `open` (2021, 5 pts sur 9).
- **Pièges** : `v_div_rot_confuse`, `v_nu_formula`, `v_fubini_bounds`.
- **Sous-buts → crédit** : `theorem`, `div` → `v-green-flux` ; `bounds`, `value` → `a2-domain-describe`.

### `v-surf-param` — Paramétrer une surface ; normale σ_u ∧ σ_v
- **Année** 15 · **Prérequis** `a2-cyl-sph`, `g4-cross` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a2-cyl-sph` : sphère et cylindre paramétrés par les coordonnées sphériques et cylindriques.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `param` (σ et A sur une ligne, sans étiquette : l'aide de test `wrongVcf` déplace la parenthèse de l'étiquette σ(r, φ)), `vector` pour σ_u, σ_v et σ_u ∧ σ_v (forme `any`), décision sur le sens de la normale avant σ_u ∧ σ_v ; L3 : décision du type de paramétrisation ; surfaces : révolution (r + p)(q − r) coupée par y ≥ 0, paraboloïdes, calottes, cônes, sphères et hémisphères ; pas de coupe x ≥ 0 ni de cylindre (pas de lettre z parmi les paramètres du juge `param`).
- **Intro** : graphe z = g(x, y) : σ(x, y) = (x, y, g), σ_x ∧ σ_y = (−g_x, −g_y, 1). Surface de révolution z = h(r) : σ(r, φ) = (r cos φ, r sin φ, h(r)). Sphère de rayon R : σ(θ, φ) avec θ depuis l'axe z ; σ_θ ∧ σ_φ = R² sin θ (sin θ cos φ, sin θ sin φ, cos θ). L'ordre des paramètres fixe le sens de la normale. Exemple : `math: σ(r, φ) = (r cos φ, r sin φ, −r² + 2r + 3), (r, φ) ∈ [0 ; 3] × [0 ; π]`, `note: z = (r + 1)(3 − r), y ≥ 0, z ≥ 0` ; `math: σ_r ∧ σ_φ = ((2r − 2) r cos φ, (2r − 2) r sin φ, r)`.
- **Juge** : `param` `{surface:{implicit, where}, orientation:'up'|'out'|null}` pour σ et A ; `equiv` `{vars:['u','v']}` pour σ_u, σ_v, σ_u ∧ σ_v · **Forme finale** : σ, A, σ_u ∧ σ_v développé, et le sens de la normale nommé (« vers le haut », « extérieure »).
- **Niveaux** :
  - L1 : le type donné (graphe, révolution, sphère), σ à trous ; le produit vectoriel en déterminant à trous.
  - L2 : le domaine A à trouver (r ∈ [0 ; 3] parce que z ≥ 0).
  - L3 : choisir le type de paramétrisation, puis « normale vers le haut ou vers le bas ? ».
  - L4 : libre.
  - L5 : surface coupée par deux conditions (y ≥ 0 et z ≥ 0) : σ, A, normale, et dire si elle est extérieure.
- **Générateur** : surfaces types : graphes z = a(x² + y²), z = c − x² − y² ; révolution z = (r + p)(q − r) avec p ∈ {0, 1}, q ∈ {2, 3} (racine positive entière) ; sphère et hémisphère de rayon R ∈ {1, 2, 3} ; cône z = k r, k ∈ {1, 2} ; cylindre x² + y² = R². Coupes : y ≥ 0, x ≥ 0, z ≥ 0, z ≤ c. Le domaine A est un rectangle en (r, φ) ou (θ, φ).
- **Corrigé type** (hémisphère supérieur de rayon 3) :
  1. `σ(θ, φ) = (3 sin θ cos φ, 3 sin θ sin φ, 3 cos θ)` — sous-but `param`
  2. `(θ, φ) ∈ [0 ; π/2] × [0 ; 2π]` — sous-but `domain`
  3. `σ_θ = (3 cos θ cos φ, 3 cos θ sin φ, −3 sin θ), σ_φ = (−3 sin θ sin φ, 3 sin θ cos φ, 0)` — sous-but `partials`
  4. `σ_θ ∧ σ_φ = 9 sin θ (sin θ cos φ, sin θ sin φ, cos θ)`, extérieure — sous-but `normal`
- **Aides** : 1 « Quelle forme ? Sphère : θ depuis l'axe z, φ autour » · 2 `σ_θ ∧ σ_φ = 9 sin θ (…, …, cos θ)` · 3 la ligne 4.
- **Variantes d'examen** : `mcq` « Quel vecteur est normal à Σ en σ(r, φ) ? » ; distracteurs : produit dans l'autre ordre (signe), oubli du facteur r, `v_sphere_theta`. `open` : étape de Stokes et de la divergence.
- **Pièges** : `v_cross_order`, `v_sphere_theta`, `v_surf_domain`.
- **Sous-buts → crédit** : `param`, `domain`, `normal` → `v-surf-param` ; `partials` → `a2-partials` ; le déterminant → `g4-cross`.

### `v-surf-area` — Aire d'une surface et intégrale ∬ f ds
- **Année** 15 · **Prérequis** `v-surf-param`, `a2-fubini-rect` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 : |σ_u ∧ σ_v| (juge `equiv`, départ √(N₁² + N₂² + N₃²)) et l'intégrale, σ et la normale donnés ; L2 : la normale puis la norme (décision « norme, vecteur ou 3e composante ») ; L3 et plus : σ et A d'abord ; L5 : ∬ z ds sur un hémisphère (sans l'aire qui suit) ; familles : paraboloïdes à 1 + 4a²ρ² carré parfait, cônes, sphères ; pas de ∬ (x² + y²) ds sur un cylindre.
- **Intro** : ∬_Σ f ds = ∬_A f(σ(u, v)) |σ_u ∧ σ_v| du dv ; aire = ∬_A |σ_u ∧ σ_v|. Le sens de la normale ne compte pas. Exemple : aire du paraboloïde z = x² + y², z ≤ 2 ; `math: |σ_r ∧ σ_φ| = r √(1 + 4r²)` ; `math: aire = 2π ∫₀^{√2} r √(1 + 4r²) dr = 13π/3`.
- **Juge** : `param` pour σ, `equiv` pour |σ_u ∧ σ_v|, `definite` ensuite · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : σ et la normale donnés, la norme à trous.
  - L2 : σ donné.
  - L3 : choisir la paramétrisation (graphe ou révolution) ; choisir « norme du produit » ou « produit » (`v_normal_not_norm`).
  - L4 : libre.
  - L5 : ∬_Σ z ds sur un hémisphère, puis une aire.
- **Générateur** : à l'envers : |σ_r ∧ σ_φ| = r√(1 + 4a²r²) et borne R avec 1 + 4a²R² carré parfait (a = 1, R = √2 → 9 ; a = 1, R² = 6 → 25 ; a = 2, R² = 3/2 → 25) ; sphères (aire 4πR²) ; ∬ z ds sur l'hémisphère = πR³ ; ∬ (x² + y²) ds sur un cylindre.
- **Corrigé type** (∬_Σ z ds, Σ hémisphère supérieur de rayon 2) :
  1. `σ(θ, φ) = (2 sin θ cos φ, 2 sin θ sin φ, 2 cos θ), [0 ; π/2] × [0 ; 2π]` — sous-but `param`
  2. `|σ_θ ∧ σ_φ| = 4 sin θ` — sous-but `norm`
  3. `∬ z ds = ∫₀^{2π} ∫₀^{π/2} 2 cos θ · 4 sin θ dθ dφ` — sous-but `integrand`
  4. `= 2π · 4 = 8π` — sous-but `value`
- **Aides** : 1 « ds = |σ_u ∧ σ_v| du dv » · 2 `|σ_θ ∧ σ_φ| = 4 · …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « Aire de Σ = » ; distracteurs de `v_jacobian_surface` (aire du disque projeté), de `v_normal_not_norm`. `open` : non (étape).
- **Pièges** : `v_jacobian_surface`, `v_normal_not_norm`, `v_sphere_theta`.
- **Sous-buts → crédit** : `param` → `v-surf-param` ; `norm`, `integrand` → `v-surf-area` ; `value` → `a2-fubini-rect`.

### `v-flux` — Flux ∬ F · ds
- **Année** 15 · **Prérequis** `v-surf-param` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `param`, `vector` (σ_u ∧ σ_v, puis F(σ) · N), `definite` ; L3 et plus : décision « garder ou échanger l'ordre (r, φ) » quand la normale demandée est vers le bas ; L5 : surface fermée faite d'un cône (normale extérieure) et du disque du haut. Le piège `v_curl_eval` sert dans `v-stokes`, pas ici.
- **Intro** : ∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Changer l'ordre de u et v change le signe. Si l'énoncé impose une normale (extérieure, vers le haut), on vérifie le sens de σ_u ∧ σ_v. Exemple : F = (0, 0, z), Σ : z = x² + y², z ≤ 1, normale vers le haut ; `math: σ_r ∧ σ_φ = (−2r² cos φ, −2r² sin φ, r)`, `note: troisième composante > 0 : vers le haut` ; `math: ∬ F · ds = ∫₀^{2π} ∫₀¹ r² · r dr dφ = π/2`.
- **Juge** : `param` `{surface, orientation}`, `equiv` pour F(σ) · N, `definite` · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : σ et N donnés, F(σ) · N à trous.
  - L2 : N à calculer, sens à vérifier.
  - L3 : décision « la normale est-elle dans le bon sens ? garder / changer l'ordre ».
  - L4 : libre.
  - L5 : flux à travers une surface fermée en deux morceaux (cône + disque).
- **Générateur** : F à composantes polynomiales de degré ≤ 2 ; surfaces de `v-surf-param` ; réponses rationnel·π. Paires (F, Σ) choisies pour que les intégrales en φ de cos, sin, cos³ s'annulent et laissent une intégrale en r polynomiale.
- **Corrigé type** (F = (0, 0, z), z = x² + y², z ≤ 1, vers le haut) :
  1. `σ(r, φ) = (r cos φ, r sin φ, r²), [0 ; 1] × [0 ; 2π]` — sous-but `param`
  2. `σ_r ∧ σ_φ = (−2r² cos φ, −2r² sin φ, r)`, vers le haut — sous-but `normal`
  3. `F(σ) · (σ_r ∧ σ_φ) = r² · r = r³` — sous-but `integrand`
  4. `∬ F · ds = 2π ∫₀¹ r³ dr = π/2` — sous-but `value`
- **Aides** : 1 « Produit scalaire de F(σ) avec σ_u ∧ σ_v, sans norme » · 2 `F(σ(r, φ)) = (0, 0, …)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « Flux de F = (x, y, z) sortant de la sphère de rayon R » : 4πR³ ; distracteurs : 4πR² (`v_normal_unit_twice`), −4πR³ (`v_normal_flip`), 4πR³/3. `open` : étape.
- **Pièges** : `v_normal_flip`, `v_normal_unit_twice`, `v_cross_order`, `v_curl_eval`.
- **Sous-buts → crédit** : `param`, `normal` → `v-surf-param` ; `integrand`, `value` → `v-flux`.

### `v-boundary` — Bord orienté ∂Σ = σ(∂A)
- **Année** 15 · **Prérequis** `v-surf-param`, `v-curve-param` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-surf-param` : σ et le domaine A des paramètres ; `v-curve-param` : paramétrer chaque morceau du bord.
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `boundary`, un côté par ligne (points et paires qui s'annulent d'abord) ; une décision par côté de L1 à L3 (en note au niveau 1) ; dans les lignes guidées, les morceaux sont écrits sans leur nom (le tokenizer du noyau lit « : » comme une division, ce qui casserait les trous) ; la ligne d'union « ∂Σ = … » n'est pas demandée. Surfaces : hémisphère en (θ, φ) ou (φ, θ), révolution (r + p)(q − r) coupée par y ≥ 0 (trois morceaux restants), calotte, en (r, φ) ou (φ, r). L5 et variante `open` (4 points) : le bord, puis ∮ F · dl pour F = c(−y, x, 0) sur un hémisphère ou une calotte.
- **Intro** : on parcourt ∂A dans le sens positif (A à gauche dans le plan (u, v)), on applique σ à chaque côté, puis on **retire** les côtés dont l'image est un point et les paires parcourues deux fois en sens contraires. Ce qui reste est ∂Σ, avec le sens qui va avec σ_u ∧ σ_v. Exemple (hémisphère, 2022) : `math: θ = 0 ↦ pôle nord`, `note: un point, on le retire` ; `math: φ = 0 et φ = 2π ↦ même méridien, sens contraires`, `note: ils s'annulent` ; `math: θ = π/2 ↦ équateur (3 cos φ, 3 sin φ, 0), φ de 0 à 2π`, `note: c'est le bord`.
- **Juge** : `boundary` `{surface:{σ, A}}` ; chaque morceau est une ligne `paramètre ↦ courbe, sens` ; les lignes « retiré : point » ou « retirés : s'annulent » sont des décisions · **Forme finale** : liste des morceaux restants, orientés.
- **Niveaux** :
  - L1 : le rectangle A dessiné avec ses 4 côtés fléchés ; l'image de chaque côté à choisir (point, méridien, cercle).
  - L2 : les images à écrire, les retraits à décider.
  - L3 : décision par côté : « garder », « point », « s'annule avec … ».
  - L4 : libre, pour une surface de révolution coupée (y ≥ 0).
  - L5 : bord d'une surface, puis ∮_∂Σ F · dl (enchaîne avec `v-line-vector`).
- **Générateur** : surfaces de `v-surf-param` avec leur A rectangulaire ; ordre des paramètres tiré ((θ, φ) ou (φ, θ)) pour que le sens du bord change avec lui. Cas avec 2 morceaux restants (demi-pomme : deux arcs de parabole et un demi-cercle, 2021) et avec 1 seul (hémisphère, 2022).
- **Corrigé type** (Σ : z = (r + 1)(3 − r), y ≥ 0, z ≥ 0 ; σ(r, φ), A = [0 ; 3] × [0 ; π]) :
  1. `r = 0 : σ = (0, 0, 3)`, un point, retiré — sous-but `point`
  2. `φ = 0, r : 0 → 3 : (t, 0, −t² + 2t + 3)`, arc de parabole (x ≥ 0) — sous-but `piece`
  3. `r = 3, φ : 0 → π : (3 cos t, 3 sin t, 0)`, demi-cercle — sous-but `piece`
  4. `φ = π, r : 3 → 0 : (t − 3, 0, 4t − t²)`, arc de parabole (x ≤ 0) — sous-but `piece`
  5. `∂Σ = σ(Γ₂) ∪ σ(Γ₃) ∪ σ(Γ₄)`, orienté comme ci-dessus — sous-but `orient`
- **Aides** : 1 « Fais le tour de A dans le sens positif ; regarde l'image de chaque côté » · 2 `r = 0 ↦ (0, 0, …)` · 3 la ligne 1.
- **Variantes d'examen** : `mcq` « Le bord orienté de Σ est : » ; distracteurs : le même cercle dans l'autre sens (`v_boundary_orient`), avec le méridien en plus (`v_boundary_pieces`). `open` : 3 à 4 pts dans un Stokes.
- **Pièges** : `v_boundary_orient`, `v_boundary_pieces`, `v_normal_flip`.
- **Sous-buts → crédit** : `point`, `piece`, `orient` → `v-boundary`.

### `v-div-thm` — Théorème de la divergence
- **Année** 15 · **Prérequis** `v-flux`, `v-ops`, `a2-cyl-sph` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-flux` : le membre de droite est un flux.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `equiv` (div F), `domain` (bornes en cylindriques z, φ, r, dès L2), `definite` (intégrale triple, valeur connue du générateur, puis la ligne en z après la symétrie, décision « termes impairs nuls ») ; domaines : cylindre et cône (pas de boule ni de demi-boule) ; F = (a x², b y², k z^m) ; L5 : la calotte z = ρ² − r² fermée par le disque z = 0 (normale (0, 0, −1) par le juge `vector`).
- **Intro** : Ω borné régulier, ν normale extérieure unité, F ∈ C¹ : ∭_Ω div F dx dy dz = ∬_∂Ω F · ν ds. Le côté « volume » est souvent plus simple. Exemple : F = (x, y, z), cylindre x² + y² ≤ 1, 0 ≤ z ≤ 2 ; `math: div F = 3` ; `math: ∭ 3 = 3 · 2π = 6π`.
- **Juge** : `equiv` pour div F, `definite` pour l'intégrale triple et sa valeur · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : div F et les bornes cylindriques à trous.
  - L2 : les bornes à écrire (cône : r ≤ z/2).
  - L3 : décision « calcul du flux face par face » ou « divergence » (`poor` pour les faces quand div F est simple).
  - L4 : libre.
  - L5 : flux à travers une surface **non fermée** en la fermant par un disque (divergence moins le flux du disque).
- **Générateur** : F polynomial de degré ≤ 3 ; domaines : boule, cylindre, cône Ω = {k²(x² + y²) < z², 0 < z < h} avec k ∈ {1, 2}, h ∈ {1, 2}, demi-boule. Les termes impairs en x ou y doivent s'annuler par symétrie (on le signale à L1–L2, on le laisse trouver à L4).
- **Corrigé type** (F = (x², y², z³), Ω = {4(x² + y²) < z², 0 < z < 2}, série de révision) :
  1. `div F = 2x + 2y + 3z²` — sous-but `div`
  2. `Ω : 0 < z < 2, r < z/2, φ ∈ [0 ; 2π]` — sous-but `bounds`
  3. `∭ (2x + 2y) = 0` par symétrie — sous-but `symmetry`
  4. `∭ 3z² = ∫₀² 3z² · π(z/2)² dz = (3π/4) · 32/5 = 24π/5` — sous-but `value`
- **Aides** : 1 « Calcule div F, puis intègre sur le volume, en cylindriques » · 2 `∫₀² 3z² · π(…)² dz` · 3 la ligne 4.
- **Variantes d'examen** : `mcq` « ∬_∂Ω F · ν ds pour F = (y + cos z, x e^z, xy) sur le cylindre » : 0 (div F = 0, série de révision) ; distracteurs de `v_div_rot_confuse`, `v_flux_normal_outward`. `open` : voir `v-verify-div`.
- **Pièges** : `v_div_rot_confuse`, `v_flux_normal_outward`, `v_jacobian_volume`.
- **Sous-buts → crédit** : `div` → `v-ops` ; `bounds`, `value` → `a2-cyl-sph` ; `symmetry` → `v-div-thm`.

### `v-stokes` — Théorème de Stokes
- **Année** 15 · **Prérequis** `v-flux`, `v-boundary`, `v-line-vector`, `v-ops` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `v-boundary` : le bord σ(∂A) et son orientation.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties `vector` (rot F, rot F(σ), σ_u ∧ σ_v) et `definite` ; F = (−ay, bx, g(z)) sur un hémisphère ou une calotte ; L1 : rot F donné ; L3 : décision du membre (le disque de même bord est `ref`) ; L4 : en plus, le bord par le juge `boundary` et la circulation ; L5 : la courbe intersection d'un cylindre et d'un plan, par le morceau de plan. Pas de F = (0, 0, x² − y²).
- **Intro** : Σ orientable régulière par morceaux, F ∈ C¹ : ∬_Σ rot F · ds = ∮_∂Σ F · dl, le bord étant σ(∂A) orienté avec σ_u ∧ σ_v. On choisit le membre le plus simple, ou une autre surface de même bord. Exemple : F = (−y, x, z), hémisphère supérieur unité ; `math: rot F = (0, 0, 2)` ; `math: ∬ rot F · ds = 2 · π = 2π`, `note: même valeur que ∮ sur l'équateur`.
- **Juge** : `equiv` pour rot F ; `boundary` pour ∂Σ ; `definite` pour les intégrales · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 : rot F donné, un membre à trous.
  - L2 : rot F à calculer, un membre.
  - L3 : décision « membre de gauche », « membre de droite », « autre surface de même bord » (`good` quand on remplace un hémisphère par un disque).
  - L4 : libre.
  - L5 : circulation sur une courbe de l'espace (intersection cylindre-plan) par Stokes.
- **Générateur** : F = (−ay, bx, g(z)) ou (0, x, 0), (0, 0, x² − y²) ; surfaces de `v-surf-param` ; on garde les paires où rot F · N s'intègre en polynôme de r.
- **Corrigé type** (F = (−y, x, z), Σ hémisphère supérieur unité, normale extérieure) :
  1. `rot F = (0 − 0, 0 − 0, 1 − (−1)) = (0, 0, 2)` — sous-but `rot`
  2. `σ_θ ∧ σ_φ = sin θ (sin θ cos φ, sin θ sin φ, cos θ)` — sous-but `normal`
  3. `∬ rot F · ds = ∫₀^{2π} ∫₀^{π/2} 2 sin θ cos θ dθ dφ = 2π` — sous-but `flux`
  4. `∮_∂Σ F · dl` sur l'équateur (cos t, sin t, 0) : `∫₀^{2π} 1 dt = 2π` — sous-but `circulation`
- **Aides** : 1 « Calcule rot F, puis choisis le membre le plus simple » · 2 `∬ (0, 0, 2) · (…) dθ dφ` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∮_Γ F · dl où Γ = ∂Σ » avec distracteurs de `v_curl_eval`, `v_boundary_orient`, `v_normal_flip`. `open` : voir `v-verify-stokes`.
- **Pièges** : `v_curl_eval`, `v_rot_sign`, `v_boundary_orient`, `v_normal_flip`.
- **Sous-buts → crédit** : `rot` → `v-ops` ; `normal` → `v-surf-param` ; `flux` → `v-flux` ; `circulation` → `v-line-vector`.

### `v-verify-stokes` — Problème : vérifier le théorème de Stokes
- **Année** 15 · **Prérequis** `v-stokes` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 : rot F et le flux ; L2 : le bord (juge `boundary`) et la circulation ; L3 : σ, la normale et le flux ; L4 : le problème entier en lignes avec aides, hypothèses et sens en décisions ; L5 et `open` : `problem` de 14 points (révolution (r + p)(q − r), y ≥ 0, F ∈ {(0, cx, 0), (−cy, 0, 0)}) ou de 9 points (hémisphère, F = c(−y, x, 0) ou c(y, −x, 0)) ; hypothèses, sens et conclusion sont des QCM ; le flux et la circulation ont deux étapes chacun. Pas de variante en quart de surface.
- **Intro** : « Vérifier » veut dire calculer **les deux membres** séparément et constater qu'ils sont égaux. On écrit les hypothèses du théorème, rot F, σ, la normale, le flux, puis le bord morceau par morceau. Exemple : la demi-pomme de 2021 donne 9π/2 des deux côtés.
- **Juge** : `problem` ; parties `lines` jugées par `equiv` (rot F, normale), `param`, `boundary`, `definite` (flux, chaque intégrale du bord), plus une ligne finale « les deux membres valent … » · **Forme finale** : les deux valeurs égales, écrites.
- **Niveaux** :
  - L1 à L3 : les parties séparées (rot, σ et normale, flux, bord, circulation), aux niveaux des compétences concernées.
  - L4 : le problème entier, avec aides.
  - L5 : `problem` de 14 points, sans aide.
- **Générateur** : surface de révolution z = (r + p)(q − r) coupée par y ≥ 0 (ou x ≥ 0) et z ≥ 0, p ∈ {0, 1}, q ∈ {2, 3} ; F ∈ {(0, x, 0), (−y, 0, 0), (0, 0, x² − y²) avec un quart de surface (série de révision)} ; hémisphère de rayon R ∈ {1, 2, 3} avec F = (−y, x, 0)·c ou (y, −x, 0) (2022). Les formules cos² = ½ + ½ cos 2t, sin² = ½ − ½ cos 2t sont données dans l'énoncé, comme à l'examen.
- **Corrigé type** (Σ : z = (r + 1)(2 − r), y ≥ 0, z ≥ 0 ; F = (0, x, 0)) :
  1. hypothèses : Σ orientable régulière par morceaux, F ∈ C¹(ℝ³) — sous-but `hyp` (1 pt)
  2. `rot F = (0, 0, 1)` — sous-but `rot` (1 pt)
  3. `σ(r, φ) = (r cos φ, r sin φ, −r² + r + 2), A = [0 ; 2] × [0 ; π]` — sous-but `param` (2 pts)
  4. `σ_r ∧ σ_φ = ((2r − 1) r cos φ, (2r − 1) r sin φ, r)` — sous-but `normal` (2 pts)
  5. `∬ rot F · ds = ∫₀^π ∫₀² r dr dφ = 2π` — sous-but `flux` (2 pts)
  6. bord : r = 0 ↦ point (0, 0, 2) ; φ = 0 et φ = π ↦ arcs de parabole dans le plan y = 0 ; r = 2 ↦ demi-cercle (2 cos t, 2 sin t, 0), t : 0 → π — sous-but `boundary` (2 pts)
  7. sens : celui de σ(∂A), parcouru positivement — sous-but `orient` (1 pt)
  8. `∫` sur les paraboles : F · γ′ = (0, t, 0) · (1, 0, −2t + 1) = 0 ; sur le demi-cercle : `∫₀^π 4 cos² t dt = 2π` — sous-but `circulation` (2 pts)
  9. les deux membres valent 2π — sous-but `conclude` (1 pt)
- **Aides** : aucune en L5 ; en L4, celles des parties.
- **Variantes d'examen** : `open` (2021 et examen blanc 2021, 14 pts ; 2022 avec l'hémisphère, 9 pts). `mcq` : non.
- **Pièges** : `v_curl_eval`, `v_boundary_pieces`, `v_boundary_orient`, `v_normal_flip`, `v_rot_sign`, `v_sincos_sign`.
- **Sous-buts → crédit** : `rot` → `v-ops` ; `param`, `normal` → `v-surf-param` ; `flux` → `v-flux` ; `boundary`, `orient` → `v-boundary` ; `circulation` → `v-line-vector` ; `hyp`, `conclude` → `v-stokes` ; l'item → `v-verify-stokes`.

### `v-verify-div` — Problème : vérifier le théorème de la divergence
- **Année** 15 · **Prérequis** `v-div-thm` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Le cône du catalogue seulement, F = (a x², b y², z^m) ; L1 : le disque du haut et la somme ; L2 : la normale extérieure du cône et son flux ; L3 : toutes les faces ; L4 : tout, en lignes avec aides ; L5 et `open` : `problem` de 9 points (∭ div F en deux étapes 1 + 2, disque 2, normale 1,5, flux du cône 1,5, conclusion 1 en QCM).
- **Intro** : on calcule ∭ div F, puis le flux sortant par **chaque face** du bord (cône et disque, cylindre et deux disques), avec la normale extérieure de chaque face.
- **Juge** : `problem` ; `equiv`, `param` (orientation `'out'` par face), `definite` · **Forme finale** : les deux valeurs égales.
- **Niveaux** :
  - L1 à L3 : les faces une à une, avec la normale extérieure à choisir.
  - L4 : le problème avec aides.
  - L5 : `problem` sans aide (9 pts).
- **Générateur** : domaines de `v-div-thm` dont le bord a 2 ou 3 faces ; F polynomial pour que chaque flux de face soit rationnel·π.
- **Corrigé type** (F = (x², y², z³), Ω = {4(x² + y²) < z², 0 < z < 2}) :
  1. `∭ div F = 24π/5` (voir `v-div-thm`) — sous-but `volume` (3 pts)
  2. disque z = 2, r ≤ 1, ν = (0, 0, 1) : `∬ z³ ds = 8π` — sous-but `face-top` (2 pts)
  3. cône σ(r, φ) = (r cos φ, r sin φ, 2r), r ∈ [0 ; 1] ; normale extérieure `(2r cos φ, 2r sin φ, −r)` (l'opposé de σ_r ∧ σ_φ) — sous-but `face-normal` (1,5 pt)
  4. `F(σ) · N = 2r³(cos³φ + sin³φ) − 8r⁴`, flux du cône `= −8 · 2π/5 = −16π/5` — sous-but `face-cone` (1,5 pt)
  5. `8π − 16π/5 = 24π/5` : les deux membres sont égaux — sous-but `conclude` (1 pt)
- **Aides** : aucune en L5.
- **Variantes d'examen** : `open` (série de révision, format examen, 9 pts).
- **Pièges** : `v_flux_normal_outward`, `v_normal_flip`, `v_div_rot_confuse`.
- **Sous-buts → crédit** : `volume` → `v-div-thm` ; `face-top`, `face-normal`, `face-cone` → `v-flux` ; `conclude` → `v-verify-div`.

### `v-proof-identity` — Petites preuves (3 points)
- **Année** 15 · **Prérequis** `v-identities`, `v-pot-test`, `a2-chain`, `g9-proof-contra` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `v-identities` : identités rot grad = 0 et div rot = 0 ; `v-pot-test` : citer : rot F = 0 sur un convexe ⇒ potentiel ; `g9-proof-contra` : rédiger une preuve directe.
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 : blocs sans leurre ; L2 : un leurre (`v_chain_sign` si le gabarit a une règle de chaîne) ; L3 : les lignes de calcul en mode « choisir l'action », avec un champ tiré F = (∂ψ/∂y, −∂ψ/∂x) à la place de F₁, F₂ abstraites (au lieu de compléter le bloc de la règle de chaîne) ; L4 : la ligne rot G libre et les décisions (définition, conclusion), sans les blocs ensuite ; L5 et `open` (3 points) : blocs avec deux leurres, gabarits G = (F₂(x, −y), F₁(x, −y)), G = (F₂, −F₁) et G = (−F₂, F₁) avec rot F = 0 ⇒ div G = 0.
- **Intro** : une preuve courte enchaîne : écrire la définition (rot G, div F), dériver avec la règle de chaîne, reconnaître l'hypothèse, citer le théorème avec ses hypothèses (ℝ² convexe). Exemple (2021) : div F = 0 et G(x, y) = (F₂(−x, y), F₁(−x, y)) ; `math: rot G = ∂_x[F₁(−x, y)] − ∂_y[F₂(−x, y)] = −∂₁F₁(−x, y) − ∂₂F₂(−x, y)` ; `math: = −div F(−x, y) = 0`, `note: ℝ² convexe, donc G dérive d'un potentiel`.
- **Juge** : `blocks` `{mode:'order'}` avec `needs` ; à L4, une ligne de calcul jugée par `equiv` avec des fonctions abstraites (F₁, F₂ remplacées par des fonctions tirées au hasard, div F = 0 imposé par construction) · **Forme finale** : la conclusion placée après tous ses blocs nécessaires.
- **Niveaux** :
  - L1 : blocs dans le désordre, sans leurre.
  - L2 : avec un leurre (« rot G = div F »).
  - L3 : compléter la ligne de règle de chaîne.
  - L4 : écrire la ligne de calcul librement, puis les blocs.
  - L5 : preuve entière, nouvelle identité (G = (F₂(x, −y), F₁(x, −y)), pour laquelle rot G = div F(x, −y), ou G = (−F₂, F₁) avec rot F = 0 ⇒ div G = 0).
- **Générateur** : gabarits de G construits à partir de F par symétrie (x ↦ −x, y ↦ −y) et échange de composantes ; on garde ceux où rot G ou div G se ramène à ±(div F ou rot F)(point symétrique). Pour le contrôle `equiv`, F est tiré dans la famille F = (∂_yψ, −∂_xψ) (div F = 0) avec ψ polynôme aléatoire.
- **Corrigé type** (énoncé 2021) :
  1. `rot G(x, y) = ∂G₂/∂x − ∂G₁/∂y` — sous-but `definition` (0,5 pt)
  2. `∂_x[F₁(−x, y)] = −(∂F₁/∂x)(−x, y)` (règle de chaîne) — sous-but `chain` (1 pt)
  3. `rot G(x, y) = −div F(−x, y) = 0` — sous-but `hyp` (0,5 pt)
  4. ℝ² est convexe et G ∈ C¹, donc G dérive d'un potentiel — sous-but `conclude` (1 pt)
- **Aides** : 1 « Écris rot G avec la définition » · 2 `∂_x[F₁(−x, y)] = … (∂F₁/∂x)(−x, y)` · 3 la ligne 3.
- **Variantes d'examen** : `open` (2021 et examen blanc, 3 pts). `mcq` : non.
- **Pièges** : `v_chain_sign`, `v_pot_no_domain`, `v_rot_sign`.
- **Sous-buts → crédit** : `definition` → `v-ops` ; `chain` → `a2-chain` ; `hyp`, `conclude` → `v-proof-identity`.

## Pièges du module

Familles : `calculus`, `geometry`, `method`, `notation`, `sign` (existante). Les `{…}` de la colonne « explication » sont remplis avec les valeurs de l'élève (`ctx`).

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `v_rot_sign` | sign | C | `v-ops` | `v-ops` | rot F = (0, 0, 2) → (0, 0, −2) pour F = (y, −x, 0) | Pour chaque composante i, remplacer ∂_aF_b − ∂_bF_a par son opposé (3 candidats), plus le vecteur entier opposé ; en 2D, ∂_yF₁ − ∂_xF₂. | « Ta composante {i} vaut {got}. L'ordre est ∂F₂/∂x − ∂F₁/∂y (on suit x, y, z en tournant) : cela donne {want}. » (Corrigé 2022 : erreur de signe dans rot, la plus fréquente.) |
| `v_rot_scalar_sum` | method | C | `v-pot-lambda` | `v-ops` | « rot F = (λ − 1) + 2(λ − 1)x + 0 = 0 » → trois équations | Remplacer le vecteur rot F par la somme de ses composantes et l'égaler à 0 ; `solset` en λ donne alors un autre ensemble (ou une équation en x). | « rot F est un vecteur : rot F = 0 veut dire que **chaque** composante est nulle, pour tout point. Tu as additionné les composantes : {sum} = 0 n'oblige pas chacune à valoir 0. » (Corrigé 2022.) |
| `v_lap_mixed` | calculus | E | `v-ops` | `a2-partials` | Δ(x² + y³ + xy) = 3 + 6y → 2 + 6y | Ajouter 2∂²f/∂x∂y (et les autres paires) à Δf. | « Le laplacien ne contient que ∂²/∂x², ∂²/∂y², ∂²/∂z². Le terme {mixed} vient d'une dérivée croisée : il ne fait pas partie de Δf. » |
| `v_div_rot_confuse` | rule | E | `v-green-flux` | `v-ops` | ∮ F · ν dl = ∬ rot F → ∬ div F | Remplacer div F par rot F (scalaire en 2D), ou l'inverse, dans la ligne de théorème. | « Avec la normale ν, c'est la **divergence** (flux qui sort) ; avec dl le long de la courbe, c'est le rotationnel. Ici tu as {used}. » |
| `v_identity_drop_term` | rule | E | `v-identities` | `v-ops` | div(fF) = f div F → f div F + F · ∇f | Supprimer le terme F · ∇f (ou ∇f ∧ F pour rot). | « C'est une règle du produit : comme (fg)′ = f′g + fg′, il y a deux termes. Il manque {missing}. » |
| `v_orientation_reversed` | sign | E | `v-line-vector` | `v-curve-param` | ∮ = −2π → 2π | Candidat γ(a + b − t) pour `param` ; opposé de la valeur pour `definite`. | « Ta courbe est parcourue dans l'autre sens : de {to} vers {from}. Changer de sens change le signe du travail. Pour un bord, le domaine doit rester à gauche. » (Plan §5.) |
| `v_param_bounds` | geometry | E | `v-curve-param` | `v-curve-param` | demi-cercle avec t ∈ [0 ; 2π] → [0 ; π] | Doubler ou diviser par 2 l'intervalle du paramètre. | « Avec t ∈ [{a} ; {b}], ta courbe fait {fraction} tour. L'énoncé ne demande que {wanted}. » |
| `v_radius_squared` | geometry | E | `v-line-scalar` | `a2-curve-length` | γ(t) = (R² cos t, R² sin t) → (R cos t, R sin t) | Remplacer R par R² dans γ (ou \|γ′\| = R²). | « Le cercle x² + y² = {R2} a pour rayon √{R2} = {R}, pas {R2}. » |
| `v_speed_forgot` | calculus | E | `v-line-scalar` | `v-line-scalar` | ∫₀¹ 7t dt = 7/2 → ∫₀¹ 7t · 5 dt = 35/2 | Supprimer le facteur \|γ′(t)\| de l'intégrande. | « Pour ∫ f dl, chaque morceau de courbe a la longueur \|γ′(t)\| dt. Ici \|γ′(t)\| = {speed} : il multiplie {integrand}. » (Plan §8.) |
| `v_speed_in_work` | calculus | E | `v-line-vector` | `v-line-vector` | ∫ F(γ) · γ′ · \|γ′\| dt → ∫ F(γ) · γ′ dt | Multiplier l'intégrande par \|γ′(t)\| en plus. | « Pour le travail, γ′(t) contient déjà la longueur : on ne multiplie pas encore par \|γ′(t)\| = {speed}. » |
| `v_gamma_prime_forgot` | calculus | E | `v-line-vector` | `v-curve-param` | ∫ F(γ(t)) dt → ∫ F(γ(t)) · γ′(t) dt | Deux candidats : F(γ) · γ au lieu de F(γ) · γ′ ; F₁(γ) + F₂(γ) (γ′ remplacé par (1, 1)). | « Le travail se fait **le long** de la courbe : on fait le produit scalaire avec la vitesse γ′(t) = {gp}, pas avec {used}. » (Plan §5.) |
| `v_sincos_sign` | sign | C | `v-line-vector` | `a1-int-direct` | ∫₀^π sin t cos²t dt = −2/3 → 2/3 | Dans chaque primitive de sin t cosᵏt (ou cos t sinᵏt), changer le signe : +cosᵏ⁺¹t/(k + 1). | « Avec u = cos t, du = −sin t dt : ∫ sin t cos²t dt = −cos³t/3. Ton signe donne {got} au lieu de {want}. » (Corrigé 2022 : erreur la plus fréquente de la question 6.) |
| `v_simply_connected_wrong` | geometry | E | `v-domain-topo` | `v-domain-topo` | ℝ² \ {0} « simplement connexe » → non | `wrongValues` : inverser la case « simplement connexe » pour ℝ² \ {0}, la couronne, ℝ³ \ axe, ℝ³ \ {0}. | « Le cercle autour de {hole} ne peut pas se réduire à un point sans sortir du domaine. » (ℝ³ \ {0} : la sphère n'est pas un obstacle pour une courbe, il est simplement connexe.) |
| `v_convex_star_confuse` | logic | E | `v-domain-topo` | `g9-implication` | « étoilé, donc convexe » → convexe ⇒ étoilé seulement | `wrongValues` : cocher « convexe » quand seul « étoilé » est vrai. | « Convexe ⇒ étoilé, mais pas l'inverse : le segment entre {p} et {q} sort du domaine. » |
| `v_pot_no_domain` | method | C | `v-pot-test` | `v-domain-topo` | « rot F = 0, donc F dérive d'un potentiel » (sans parler de Ω) | Ligne de conclusion acceptée par l'invariant mais sans bloc `domain` avant : `stay` aux niveaux libres ; en `mcq`, `wrongValues` « oui » pour une couronne. | « rot F = 0 ne suffit que sur un domaine **simplement connexe** (ou convexe). Dis pourquoi {domain} l'est. » (Corrigé 2022 : convexité ou simple connexité non mentionnée.) |
| `v_rot_closed_zero` | logic | C | `v-pot-none` | `v-pot-test` | « ∮_cercle F · dl = 0, donc potentiel » → aucune conclusion | `wrongValues` « oui » quand une seule courbe fermée donne 0 ; leurre du `blocks`. | « Une seule courbe avec ∮ = 0 ne prouve rien : il faudrait **toutes** les courbes fermées. À l'inverse, une seule courbe avec ∮ ≠ 0 prouve qu'il n'y a pas de potentiel. » (Remarque du résumé de cours.) |
| `v_pot_const_fn` | method | C | `v-pot-find` | `v-pot-find` | φ = x²y + xz + C → x²y + xz + α(y, z) | Remplacer la fonction inconnue α(y, z) par une constante C ; ou introduire C₁, C₂, C₃ qui restent tous à la fin. | « Après avoir intégré en x, ce qui ne dépend pas de x peut encore dépendre de y et z : écris α(y, z). Une seule constante reste à la fin. » (Corrigé 2022.) |
| `v_pot_double_count` | method | E | `v-pot-find` | `v-pot-find` | φ = ∫F₁ dx + ∫F₂ dy + ∫F₃ dz → termes en double | Somme des trois primitives partielles (x²y + xz) + (x²y) + (xz + z²). | « Le terme {term} apparaît dans deux primitives : en additionnant les trois, tu le comptes deux fois. Vérifie : ∂_x de ton φ vaut {got}, pas {F1}. » (Plan §8.) |
| `v_pot_final_const` | calculus | C | `v-pot-find` | `@alg:E-une-etape` | φ(1, 2, −1) = 0 donne C = 2 → C = −2 | Prendre C = +φ₀(P) au lieu de −φ₀(P), ou garder C sans le fixer. | « φ(P) = {phi0} + C doit valoir 0, donc C = {C}. » (Corrigé 2022 : constante finale oubliée ou mal calculée.) |
| `v_pot_poly_integral` | calculus | C | `v-pot-find` | `a1-int-direct` | ∫ −4z dz = −4z² → −2z² | Pour chaque monôme c·vᵏ intégré, produire c·vᵏ⁺¹ (division par k + 1 oubliée). | « La primitive de {term} est {want} : on divise par le nouvel exposant. » (Corrigé 2022 : erreurs sur les termes −2y, −2z².) |
| `v_potential_sign` | notation | E | `v-pot-find` | `v-pot-find` | F = −∇φ → F = ∇φ | Candidat −φ. | « Dans ce cours, "F dérive d'un potentiel" veut dire F = ∇φ, sans signe moins (ce n'est pas la convention de la physique). » |
| `v_green_singular` | method | C | `v-green` | `v-domain-topo` | Green pour (−y, x)/(x² + y²) sur le disque unité : 0 → 2π | `wrongValues` : ∬_A rot F = 0 pris comme valeur de ∮. | « F n'est pas défini en (0, 0), qui est dans le disque : Green ne s'applique pas. Le calcul direct donne {direct}. » (Plan §5 et §8.) |
| `v_green_no_rot` | method | C | `v-green` | `v-ops` | « par Green, ∮ = aire » → ∮ = ∬ rot F = 2 · aire | Remplacer rot F par 1 dans ∬_A rot F (on obtient l'aire) ; ou ligne « par Green » sans ligne rot : `stay`. | « Green dit ∮ F · dl = ∬ rot F. Il faut écrire rot F = {rot} : c'est parce qu'il vaut une constante que ∮ = {rot} × aire. » (Corrigé 2022 : citer Green sans calculer rot F = 2 ne donne pas les points.) |
| `v_pot_on_restricted` | method | C | `v-pot-domain` | `v-domain-topo` | « φ = Arctg(y/x) + ½ ln(x² + y²) est un potentiel sur ℝ² \ {0} » → seulement là où x ≠ 0 | Leurre du `blocks` ; `wrongValues` « oui » pour ℝ² \ {0}. | « Ton φ n'est pas défini sur l'axe x = 0, qui fait partie de Ω. C'est un potentiel sur {x > 0}, pas sur Ω. » (Corrigé 2021.) |
| `v_nu_formula` | sign | E | `v-green-flux` | `v-curve-param` | ν = (−γ₂′, γ₁′)/\|γ′\| → (γ₂′, −γ₁′)/\|γ′\| | Rotation dans l'autre sens : flux opposé ; ou ν non normé (facteur \|γ′\|). | « Pour un bord parcouru avec le domaine à gauche, la normale extérieure est (γ₂′, −γ₁′)/\|γ′\|. Ta normale pointe vers l'intérieur. » |
| `v_fubini_bounds` | calculus | E | `v-green-flux` | `a2-domain-describe` | ∫₀ˣ ∫₀ᵃ … dx dy → ∫₀ᵃ ∫₀ˣ … dy dx | Échanger l'ordre des intégrales sans changer les bornes. | « La borne {inner} dépend de x : l'intégrale en y doit être à l'intérieur. » (Plan §8, A2.) |
| `v_cross_order` | sign | E | `v-surf-param` | `g4-cross` | σ_φ ∧ σ_r au lieu de σ_r ∧ σ_φ ; 2e composante sans le signe − | Candidats −N et N avec la 2e composante opposée. | « Le produit vectoriel change de signe si on échange les facteurs. La 2e composante est a₃b₁ − a₁b₃ : vérifie {second}. » |
| `v_sphere_theta` | notation | E | `v-surf-param` | `a2-cyl-sph` | z = R sin θ → z = R cos θ (θ depuis l'axe z) | Échanger sin θ et cos θ dans σ (latitude au lieu de colatitude), en gardant R² sin θ. | « Dans ce cours, θ se mesure depuis l'axe z : z = R cos θ et le facteur est R² sin θ. » |
| `v_surf_domain` | geometry | E | `v-surf-param` | `v-surf-param` | φ ∈ [0 ; 2π] avec y ≥ 0 → [0 ; π] | Doubler l'intervalle de φ ; prendre r jusqu'à l'autre racine de z = 0 (r = −1). | « y ≥ 0 veut dire sin φ ≥ 0, donc φ ∈ [0 ; π]. z ≥ 0 donne {r-range}, avec r ≥ 0. » |
| `v_jacobian_surface` | calculus | E | `v-surf-area` | `v-surf-area` | aire = ∬_A du dv → ∬_A \|σ_u ∧ σ_v\| du dv | Supprimer \|σ_u ∧ σ_v\| (on obtient l'aire du domaine A). | « Le domaine A n'a pas la même aire que Σ : chaque petit rectangle du dv devient un parallélogramme d'aire \|σ_u ∧ σ_v\| du dv = {norm} du dv. » |
| `v_normal_not_norm` | calculus | E | `v-surf-area` | `v-surf-area` | ∬ f · (σ_u ∧ σ_v)₃ → ∬ f \|σ_u ∧ σ_v\| | Garder seulement la 3e composante de N (ou N sans norme). | « Pour ∬ f ds, il faut la **norme** de σ_u ∧ σ_v, pas une de ses composantes. » |
| `v_normal_flip` | sign | C | `v-flux` | `v-boundary` | ∬ rot F · ds = −18π → 18π (la normale « corrigée » alors que le bord n'a pas été changé) | Opposé du flux. | « Le cours n'exige pas une normale extérieure pour Stokes : il faut que le bord soit σ(∂A) parcouru avec **la même** paramétrisation. Tu as changé {which} sans changer l'autre. » (Corrigé 2022.) |
| `v_normal_unit_twice` | calculus | E | `v-flux` | `v-flux` | ∬ F · N/\|N\| du dv → ∬ F · N du dv | Diviser l'intégrande par \|N\|. | « Dans ∬ F · ds = ∬ F · (σ_u ∧ σ_v) du dv, la norme se simplifie : ν ds = (σ_u ∧ σ_v) du dv. » |
| `v_curl_eval` | calculus | C | `v-stokes` | `v-ops` | rot F(σ(θ, φ)) = (0, 0, −6 cos θ) → (0, 0, −2) | Pour rot F constant c, multiplier une composante de c par une composante de σ (candidats c·σ₁, c·σ₂, c·σ₃). | « rot F = {c} ne dépend pas du point : en σ(θ, φ), il vaut encore {c}. » (Corrigé 2022.) |
| `v_boundary_orient` | sign | C | `v-boundary` | `v-boundary` | (3 cos t, 3 sin t, 0) → (3 cos t, −3 sin t, 0) | Bord parcouru dans l'autre sens : opposé de ∮. | « Avec ta paramétrisation σ(φ, θ), le bord σ(∂A) tourne dans le sens {sense}. Ton cercle tourne dans l'autre sens. » (Corrigé 2022.) |
| `v_boundary_pieces` | geometry | C | `v-boundary` | `v-boundary` | ∂Σ = méridien + équateur → équateur | Ajouter l'intégrale sur un seul des deux côtés qui s'annulent, ou donner une contribution non nulle au côté réduit à un point. | « Les côtés φ = 0 et φ = 2π ont la même image, parcourue dans les deux sens : ils s'annulent. Le côté θ = 0 devient un point. » (Plan §8.) |
| `v_flux_normal_outward` | sign | E | `v-div-thm` | `v-flux` | disque du bas avec ν = (0, 0, 1) → (0, 0, −1) | Changer le signe du flux d'une des faces. | « Sur la face {face}, la normale extérieure pointe vers {dir}. » |
| `v_jacobian_volume` | calculus | E | `v-div-thm` | `a2-cyl-sph` | dr dθ dz → r dr dθ dz | Supprimer le jacobien r (ou r² sin θ). | « En cylindriques, dx dy dz = r dr dθ dz. » (Plan §8, A2.) |
| `v_chain_sign` | calculus | E | `v-proof-identity` | `a2-chain` | ∂_x[F₁(−x, y)] = ∂₁F₁(−x, y) → −∂₁F₁(−x, y) | Oublier le facteur −1 de la dérivée intérieure. | « La dérivée de −x vaut −1 : elle multiplie (∂F₁/∂x)(−x, y). » |

## Exemples de type examen

Format `ba3-analyse3` : 120 min, sans document ni calculatrice ; QCM à une réponse (+2/0) puis questions ouvertes. Les formules cos² = ½ + ½ cos 2t et sin² = ½ − ½ cos 2t sont données dans l'énoncé quand elles servent.

**V1. Vérifier le théorème de Stokes (14 pts).** Soit Σ = {z = (√(x² + y²) + 1)(2 − √(x² + y²)), y ≥ 0, z ≥ 0} et F = (0, x, 0). Vérifier le théorème de Stokes sur Σ.
- Hypothèses (Σ orientable, régulière par morceaux ; F ∈ C¹) : 1 pt.
- rot F = (0, 0, 1) : 1 pt.
- σ(r, φ) = (r cos φ, r sin φ, −r² + r + 2), A = [0 ; 2] × [0 ; π] : 2 pts.
- σ_r ∧ σ_φ = ((2r − 1) r cos φ, (2r − 1) r sin φ, r) : 2 pts.
- ∬ rot F · ds = ∫₀^π ∫₀² r dr dφ = 2π : 2 pts.
- Bord : r = 0 donne un point ; φ = 0 et φ = π donnent deux arcs de parabole dans y = 0 ; r = 2 donne le demi-cercle : 2 pts.
- Sens de parcours cohérent avec σ(∂A) : 1 pt.
- ∫ sur les arcs = 0, ∫ sur le demi-cercle = ∫₀^π 4 cos²t dt = 2π : 2 pts.
- Conclusion « les deux membres valent 2π » : 1 pt.

**V2. Potentiel et domaine (8 pts).** Soit Ω = ℝ² \ {(0, 0)} et F(x, y) = ((x − 2y)/(x² + y²), (2x + y)/(x² + y²)).
- (i) rot F = 0 sur Ω : 2 pts.
- (ii) Ω n'est pas simplement connexe, le critère ne conclut pas : 1 pt ; ∮ sur le cercle unité = 4π ≠ 0 : 2 pts ; donc F ne dérive pas d'un potentiel sur Ω : 1 pt.
- (iii) Sur {x > 0}, trouver un potentiel : φ = ½ ln(x² + y²) + 2 Arctg(y/x) : 1,5 pt ; dire pourquoi ce n'est pas un potentiel sur Ω : 0,5 pt.

---

# C. Analyse complexe

Unité `cplx` · préfixe `c-` · pièges `c_` · Statut : fait le 10 novembre 2026 (étape U10, voir README §17)

**Sources** : Analyse III MT (programme normal : analyse complexe au semestre d'automne) ; Analyse IV MT/SV 2021 (Prof. Picasso : QCM à plusieurs réponses sur Cauchy, Laurent, résidus, intégrale trigonométrique, Laplace inverse par résidus ; corrigé d'étudiants) ; Analyse IV GC/IN/SC/SIE 2022 (Cauchy-Riemann, conjuguée harmonique, Laurent, résidus, intégrales réelles) ; Analyse IV GM (astuces du cours, examens 2015–2016 de P. Metzener : Taylor, couronnes de Laurent) ; Dacorogna et Tanteri, chapitres 9 à 13.

**Notation** :
- z = x + iy, f = u + iv. `complex: true` dans tous les items.
- Argument principal Arg z ∈ ]−π ; π] ; Log z = ln|z| + i Arg z (holomorphe sur ℂ \ ]−∞ ; 0]) ; z^α = e^(α Log z). `Log` ou `ln` acceptés à la saisie, comme ailleurs.
- Cauchy-Riemann : u_x = v_y et u_y = −v_x ; alors f′ = u_x + i v_x.
- Résidus : pôle simple Res(p/q, z₀) = p(z₀)/q′(z₀) = lim (z − z₀) f(z) ; pôle d'ordre m : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)] ; sinon le coefficient a₋₁ de la série de Laurent.
- Théorème des résidus : ∮_Γ f dz = 2πi Σ Res(f, z_k), somme sur les singularités **à l'intérieur** de Γ (Γ simple fermée, orientée positivement, sans singularité dessus).
- Intégrales réelles : ∫_ℝ R(x) dx = 2πi Σ_{Im z_k > 0} Res ; ∫_ℝ R(x) e^(iαx) dx avec α > 0 : demi-plan supérieur ; ∫₀^{2π} R(cos θ, sin θ) dθ avec z = e^(iθ), cos θ = (z + 1/z)/2, sin θ = (z − 1/z)/(2i), dθ = dz/(iz).

**Prérequis extérieurs** :
`g8-algebraic`, `g8-polar`, `g8-quadratic`, `g2-hyp-def`, `g0-pfd-simple`, `a1-ser-geo-tele`, `a1-pow-domain`, `a1-dl-usual`, `a2-partials`, et dans ce catalogue `v-curve-param`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g0-pfd-simple`, `g2-hyp-def`, `g8-algebraic`, `g8-polar`, `g8-quadratic`, `a1-dl-usual`, `a1-pow-domain`, `a1-ser-geo-tele`, `a2-partials`, `v-curve-param`.

## Compétences

### `c-elem-fn` — Fonctions élémentaires : e^z, cos z, Log z, z^α
- **Année** 15 · **Prérequis** `g8-polar`, `g2-hyp-def` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g2-hyp-def` : cos(iy) = cosh y.
- **Statut** : fait le 10 novembre 2026 (étape U10). Parties jugées par `cvalue` (nouveau juge, `js/judges/cplx-ca.js` : même valeur que `complex`, formes finales du cours comme e^(−π/2), ln √2 − 3πi/4, cosh 2). L'argument se saisit `arg(…)` (le noyau ne lit pas `Arg`). Gabarits : Log z (|z|, Arg z, puis Log), z^α, cos(bi), sin(bi), |e^z| ; pas de dérivées (Log(z² + 1))′ au niveau 4. L5 : un problème (|cos(x + iy)|² ou |sin(x + iy)|² jugé par `cvalue` en x, y, puis un QCM « borné ? ») ou des lignes sans aide. QCM multi : 5 affirmations.
- **Intro** : e^(x+iy) = eˣ(cos y + i sin y), |e^z| = e^(Re z), e^z est 2πi-périodique. cos z = (e^(iz) + e^(−iz))/2 n'est **pas borné** : cos(iy) = cosh y. Log z = ln|z| + i Arg z avec Arg ∈ ]−π ; π] ; z^α = e^(α Log z) ; (z^α)′ = αz^(α−1) hors de ]−∞ ; 0]. Exemple : `math: Log(−1 − i) = ln √2 + i·(−3π/4)`, `note: Arg dans ]−π ; π]` ; `math: i^i = e^(i·Log i) = e^(i·iπ/2) = e^(−π/2)`, `note: un nombre réel`.
- **Juge** : `complex` `{form:'a+bi'}` (valeurs exactes avec ln, π, e) · **Forme finale** : a + bi, ou r·e^(iθ) si demandé.
- **Niveaux** :
  - L1 : module et argument donnés, Log à compléter.
  - L2 : |z| et Arg z à calculer.
  - L3 : choisir la formule (définition de cos z, de z^α, de Log), puis calculer.
  - L4 : libre ; dérivées (Log(z² + 1))′, (z^(1/2))′.
  - L5 : enchaîner : |cos(x + iy)|² = cos²x + sinh²y, puis « cos z est-il borné sur ℂ ? ».
- **Générateur** : z = a + bi avec a, b ∈ {−2, …, 2}, non nul, d'argument multiple de π/4 ou π/6 (|z| ∈ {1, √2, 2, √3 + 1…} choisi pour que ln|z| soit simple) ; α ∈ {i, 1/2, 1 + i, 2i}. Exclure les réels négatifs pour Log à L1–L3. Gabarits : « Log z = ? », « z^α = ? (forme a + bi) », « |e^z| = ? », « cos(iy) = ? ».
- **Corrigé type** (Log(−1 − i)) :
  1. `|−1 − i| = √2` — sous-but `modulus`
  2. `Arg(−1 − i) = −3π/4` — sous-but `arg`
  3. `Log(−1 − i) = ln √2 − (3π/4) i` — sous-but `log`
- **Aides** : 1 « Log z = ln|z| + i Arg z, avec Arg dans ]−π ; π] » · 2 `Arg(−1 − i) = −…π/4` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (une réponse) « Log(−1 − i) = ? » ; distracteurs de `c_log_branch` (5π/4), de `c_exp_periodic` ; `mcq` multi « Cochez les affirmations vraies : cos z est borné sur ℂ ; |e^z| = e^(Re z) ; … ». `open` : non.
- **Pièges** : `c_log_branch`, `c_cos_bounded`, `c_sqrt_i`.
- **Sous-buts → crédit** : `modulus`, `arg` → `g8-polar` ; `log` → `c-elem-fn`.

### `c-equations` — Équations dans ℂ
- **Année** 15 · **Prérequis** `c-elem-fn`, `g8-quadratic` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Nouveau juge `cfamily` (`js/judges/cplx-ca.js`) pour l'équation en w (« multiplier par 2w ») et pour les familles z₀ + 2kπi (« ; k ∈ ℤ » ou « , k ∈ ℤ ») ; les racines w par `complex` (ensemble). Gabarits : a cosh z + b sinh z = c (racines parmi ±1, ±i, ±2, ±1/2, ±i/2, ±1/3, ±i/3, ±3, ±3i, ±1 ± i) et q cos z = p, q sin z = p (racines réelles ou imaginaires) ; pas de mélange a cos z + b sin z. L3 : décision w = e^z ou w = e^(iz). L5 et `open` : le même calcul en problème de 3 points (2 au catalogue : le plan `ba3-analyse3` tire de 3 à 14 points), sans l'enchaînement avec la série de Taylor de GM 2015.
- **Intro** : pour une équation en cosh, sinh, cos, sin, on pose w = e^z (ou w = e^(iz)), on résout un polynôme en w, puis e^z = w donne z = Log w + 2kπi. Exemple : 2 cosh z + sinh z = i ; `math: 3w² − 2iw + 1 = 0`, `note: après multiplication par 2w` ; `math: w = i ou w = −i/3`.
- **Juge** : `equiv` pour la ligne polynomiale en w (multiplication par w ≠ 0 annoncée) ; `complex` pour les racines ; `solset` `{v:'z', domain:'C', periodic:'2πi'}` pour l'ensemble final (familles) · **Forme finale** : ensemble écrit en familles z = z₀ + 2kπi, k ∈ ℤ.
- **Niveaux** :
  - L1 : le changement w = e^z donné, le polynôme à trous.
  - L2 : le polynôme seul, puis les racines.
  - L3 : choisir le changement (w = e^z ou w = e^(iz)) selon cosh ou cos.
  - L4 : libre.
  - L5 : sin z + 2 cos z = 3 (GM 2015), puis la série de Taylor de 1/(sin z + 2 cos z − 3) (enchaîne avec `c-taylor`).
- **Générateur** : à l'envers : deux racines w₁, w₂ choisies parmi {±1, ±i, ±2, ±i/2, ±i/3, 1 ± i}, produit et somme ⇒ coefficients ; on reconstruit a cosh z + b sinh z = c (ou a cos z + b sin z = c) en vérifiant que les coefficients sont des entiers ou i·entiers. Rejeter si w = 0. Gabarits : cosh/sinh avec second membre imaginaire ; cos/sin avec second membre réel > 1 (solutions non réelles : surprise utile).
- **Corrigé type** (2 cosh z + sinh z = i) :
  1. `(w + 1/w) + (w − 1/w)/2 = i` avec w = e^z ≠ 0 — sous-but `substitute`
  2. `3w² − 2iw + 1 = 0` — sous-but `polynomial`
  3. `Δ = −4 − 12 = −16, w = (2i ± 4i)/6` donc `w = i ou w = −i/3` — sous-but `roots`
  4. `z = iπ/2 + 2kπi ou z = −ln 3 − iπ/2 + 2kπi, k ∈ ℤ` — sous-but `log`
- **Aides** : 1 « Pose w = e^z ; cosh z = (w + 1/w)/2 » · 2 `3w² − …w + 1 = 0` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « L'ensemble des solutions de … est » ; distracteurs de `c_exp_periodic` (pas de 2kπi), de `c_log_branch`. `open` (GM 2015, 2 pts).
- **Pièges** : `c_exp_periodic`, `c_log_branch`, `c_sqrt_i`.
- **Sous-buts → crédit** : `substitute`, `polynomial` → `c-equations` ; `roots` → `g8-quadratic` ; `log` → `c-elem-fn`.

### `c-cauchy-riemann` — Cauchy-Riemann et holomorphie
- **Année** 15 · **Prérequis** `c-elem-fn`, `a2-partials` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-elem-fn` : u et v de e^z, z² et Log z.
- **Statut** : fait le 10 novembre 2026 (étape U10). u + iv par `cvalue` (z = x + iy, finale : un seul terme en i), les quatre dérivées par `equiv`, puis f′(z) en z (fonction holomorphe) ou le système de Cauchy-Riemann résolu par `system` (un seul point : holomorphe sur aucun ouvert) ; la comparaison est une décision (piège `c_cr_sign`). Fonctions : z² + pz, z³, e^z, sinh z, cosh z ; |z − c|², z·Re z, |z|² + i(px + qy), z̄². z/|z|² et z̄ (aucun point) restent dans les QCM. L5 et `open` : deux fonctions, 3 points chacune (2,5 au catalogue : une étape par dérivée, au moins un demi-point chacune).
- **Intro** : f = u + iv, avec u, v ∈ C¹, est holomorphe sur un ouvert si et seulement si u_x = v_y et u_y = −v_x partout sur cet ouvert. On écrit u et v, on calcule les quatre dérivées, on compare. Exemple : `math: f(z) = sinh z : u = sinh x cos y, v = cosh x sin y` ; `math: u_x = cosh x cos y = v_y ; u_y = −sinh x sin y = −v_x`, `note: holomorphe sur ℂ`.
- **Juge** : `equiv` `{vars:['x','y']}` pour u, v et les dérivées ; décision finale (holomorphe partout, nulle part, sur un ensemble) jugée comme un `mcq` · **Forme finale** : u, v, les 4 dérivées, la comparaison, la conclusion.
- **Niveaux** :
  - L1 : u et v donnés, dérivées à trous.
  - L2 : u et v à extraire (z = x + iy).
  - L3 : décision « écrire u et v » ou « reconnaître une composition de fonctions holomorphes » (`good` pour sinh z, `poor` pour z/|z|²).
  - L4 : libre.
  - L5 : deux fonctions, une holomorphe et une non holomorphe (2022, 5 pts).
- **Générateur** : liste de fonctions : polynômes en z, z̄, |z|², 1/z̄ = z/|z|², e^z̄, sinh z, z·Re z, x² − y² + i(2xy + λy) avec un paramètre λ ; on garde les u, v qui ont des dérivées polynomiales ou trigonométriques simples.
- **Corrigé type** (f(z) = z/|z|², z ≠ 0) :
  1. `u = x/(x² + y²), v = y/(x² + y²)` — sous-but `uv`
  2. `u_x = (y² − x²)/(x² + y²)², v_y = (x² − y²)/(x² + y²)²` — sous-but `partials`
  3. `u_x = v_y ⟺ x² = y² ; u_y = −2xy/r⁴, v_x = −2xy/r⁴, donc u_y = −v_x ⟺ xy = 0` — sous-but `compare`
  4. les deux ensemble ⟹ x = y = 0, exclu : f n'est holomorphe sur aucun ouvert — sous-but `conclude`
- **Aides** : 1 « Écris u = Re f et v = Im f en x et y » · 2 `u_x = …, v_y = …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « Laquelle de ces fonctions est holomorphe sur ℂ ? » ; distracteurs : z̄, |z|², z·Re z (`c_conj_not_holo`). `open` (2022, 5 pts : 2,5 par fonction).
- **Pièges** : `c_cr_sign`, `c_conj_not_holo`.
- **Sous-buts → crédit** : `uv`, `compare`, `conclude` → `c-cauchy-riemann` ; `partials` → `a2-partials`.

### `c-harmonic-conj` — Construire f holomorphe à partir de v
- **Année** 15 · **Prérequis** `c-cauchy-riemann` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-cauchy-riemann` : u_x = v_y et u_y = −v_x.
- **Statut** : fait le 10 novembre 2026 (étape U10). Δv par `equiv` (cible `constant`), u par `antideriv` avec `grad` (`name: 'u'`), f en z par `cvalue` (z = x + iy, la constante C est une lettre réelle échantillonnée) après la décision « C réelle » (`c_harmonic_const_imag`). La ligne f(x) = u(x, 0) + i v(x, 0) est dans la note, pas une ligne jugée ; pas de gabarit « u donné ». L5 et `open` : v = 3x²y − y³ + e^(x² − y²) sin 2xy (+ cy), 5 points (1 + 2 + 2).
- **Intro** : v doit être harmonique (Δv = 0). On trouve u par u_x = v_y, puis u_y = −v_x fixe la « constante » α(y). Pour écrire f en z : f(x) = u(x, 0) + i v(x, 0) sur l'axe réel, puis on remplace x par z. La constante est **réelle** si v est imposée. Exemple (2022) : `math: v = 3x²y − y³ + e^(x² − y²) sin(2xy)` ; `math: f(z) = z³ + e^(z²) + c, c ∈ ℝ`, `note: Im(z³) = 3x²y − y³, Im(e^(z²)) = e^(x²−y²) sin 2xy`.
- **Juge** : `antideriv` gradient (comme `v-pot-find`) pour u à partir de (v_y, −v_x) ; `equiv` pour la forme en z (comparaison de f(x + iy) avec u + iv sur 12 points) · **Forme finale** : f(z) explicite en z, plus une constante réelle.
- **Niveaux** :
  - L1 : Δv = 0 vérifié, u_x = v_y à intégrer, à trous.
  - L2 : les deux étapes, puis l'écriture en z à trous.
  - L3 : décision « intégrer CR » ou « reconnaître Im de z^n, e^(z²) » (les deux `good`).
  - L4 : libre.
  - L5 : v avec un terme exponentiel (2022, 5 pts).
- **Générateur** : à l'envers : f(z) = somme de 1 à 3 termes parmi a·z², b·z³, c·z, e^(z²), e^z, i·z² ; v = Im f. Rejeter si v ne dépend que d'une variable. Gabarit « u donné » : trouver v (constante réelle) puis f.
- **Corrigé type** (v = 2xy + 3y) :
  1. `Δv = 0` : v est harmonique — sous-but `harmonic`
  2. `u_x = v_y = 2x + 3, donc u = x² + 3x + α(y)` — sous-but `integrate`
  3. `u_y = α′(y) = −v_x = −2y, donc α = −y² + c` — sous-but `compare`
  4. `f(x) = u(x, 0) + i v(x, 0) = x² + 3x + c`, donc `f(z) = z² + 3z + c, c ∈ ℝ` — sous-but `in-z`
- **Aides** : 1 « u_x = v_y donne u à une fonction de y près » · 2 `u = x² + 3x + α(y)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « f holomorphe avec Im f = 2xy + 3y : f(z) = ? » ; distracteurs de `c_cr_sign` (z̄² + 3z), de `c_harmonic_const_imag`. `open` (2022, 5 pts).
- **Pièges** : `c_cr_sign`, `c_harmonic_const_imag`.
- **Sous-buts → crédit** : `harmonic`, `integrate`, `compare` → `c-harmonic-conj` ; `in-z` → `c-harmonic-conj`.

### `c-contour-param` — Intégrales de contour par paramétrisation
- **Année** 15 · **Prérequis** `c-elem-fn`, `v-curve-param` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-elem-fn` : e^(it) et fonctions de z évaluées sur le contour.
- **Statut** : fait le 10 novembre 2026 (étape U10). γ par `param` (courbe complexe, segment ou cercle), puis γ′(t), f(γ(t))γ′(t) (`cvalue` en t, la valeur demandée quelle que soit la ligne : une ligne sans γ′ nomme `c_contour_dz_forgot`) et l'intégrale (`cvalue`, ∫ calculée numériquement). Fonctions z̄, Re z, Im z, |z|², z², 1/z ; pas de (z − z₀)ⁿ. L1 : γ donné. L5 : un problème (z̄ sur le demi-cercle et sur le segment de 2a à 0, puis un QCM « pourquoi ? ») ou des lignes sans aide.
- **Intro** : ∫_γ f(z) dz = ∫ₐᵇ f(γ(t)) γ′(t) dt, avec γ à valeurs complexes. Cercle de centre z₀ et rayon R : γ(t) = z₀ + R e^(it), γ′ = iRe^(it). Exemple : `math: ∮_{|z|=1} z̄ dz = ∫₀^{2π} e^(−it) · i e^(it) dt = 2πi`, `note: z̄ n'est pas holomorphe, ∮ ≠ 0`.
- **Juge** : `param` (courbe dans ℂ ≅ ℝ²) ; `complex` pour la valeur · **Forme finale** : a + bi exact.
- **Niveaux** :
  - L1 : γ donné, f(γ(t))γ′(t) à trous.
  - L2 : γ à écrire (cercle, segment).
  - L3 : choisir la paramétrisation, puis l'intégrande.
  - L4 : libre, fonctions non holomorphes (Re z, |z|², z̄).
  - L5 : comparer ∫ z² dz sur deux chemins de mêmes extrémités (même valeur) et ∫ z̄ dz (valeurs différentes).
- **Générateur** : f ∈ {z̄, Re z, Im z, |z|², z², 1/z, (z − z₀)^n} ; chemins : segments entre points de {0, 1, i, 1 + i, 2}, cercles |z − z₀| = R avec z₀ ∈ {0, 1, i}, R ∈ {1, 2}. Réponses dans ℚ(i) ou ℚ(i)·π.
- **Corrigé type** (∫_γ Re(z) dz, γ segment de 0 à 1 + i) :
  1. `γ(t) = (1 + i) t, t ∈ [0 ; 1]` — sous-but `param`
  2. `γ′(t) = 1 + i, Re(γ(t)) = t` — sous-but `deriv`
  3. `∫₀¹ t (1 + i) dt = (1 + i)/2` — sous-but `value`
- **Aides** : 1 « dz = γ′(t) dt » · 2 `∫₀¹ t · (…) dt` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∮_{|z|=R} z̄ dz = ? » : 2πiR² ; distracteurs : 0 (`c_conj_not_holo`), 2πi, 2πR. `open` : non.
- **Pièges** : `c_contour_dz_forgot`, `c_conj_not_holo`.
- **Sous-buts → crédit** : `param` → `v-curve-param` ; `deriv`, `value` → `c-contour-param`.

### `c-cauchy-thm` — Théorème de Cauchy
- **Année** 15 · **Prérequis** `c-cauchy-riemann` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-cauchy-riemann` : f holomorphe sur Ω.
- **Statut** : fait le 10 novembre 2026 (étape U10). Singularités par `complex` (ensemble) ou `cfamily` (cos z = 0, période π), place de chacune et conclusion par des décisions (`c_pole_outside_counted`, `c_pole_on_contour`), puis ∮ = 0 (`cvalue`). Les leçons n'ont que des fonctions dont toutes les singularités sont hors du disque fermé ; « sur Γ » et « dedans » sont des QCM (L5 : un problème de 4 QCM, examen). Pas de dessin au niveau 1.
- **Intro** : si f est holomorphe sur un ouvert simplement connexe Ω qui contient la courbe fermée Γ, alors ∮_Γ f dz = 0. On vérifie donc où sont les singularités : à l'intérieur, sur Γ (intégrale non définie), ou dehors. Exemple : `math: ∮_{|z|=1} dz/(z + 2)² = 0`, `note: la seule singularité, −2, est hors du disque`.
- **Juge** : décision par fonction (`mcq`) : « singularités dans / sur / hors de Γ », puis valeur `complex` · **Forme finale** : 0 justifié, ou « non défini », ou renvoi aux résidus.
- **Niveaux** :
  - L1 : singularités données, les placer par rapport au cercle (dessin).
  - L2 : trouver les singularités, les placer.
  - L3 : conclure « 0 par Cauchy », « non défini », « il faut les résidus ».
  - L4 : libre, avec des contours décalés (cercle de centre i, rayon 2).
  - L5 : QCM multi de 5 fonctions (2021).
- **Générateur** : fonctions rationnelles ou e^z, cos z divisés par un polynôme ; singularités dans {0, ±1, ±2, ±i, ±2i, 3, ±π/2} ; contours |z − z₀| = R. Dosage : au moins une singularité exactement sur Γ dans un item sur cinq.
- **Corrigé type** (∮_{|z|=1} e^z/cos z dz, 2022) :
  1. singularités : cos z = 0 ⟺ z = π/2 + kπ — sous-but `singularities`
  2. |π/2| > 1 : aucune n'est dans le disque fermé — sous-but `locate`
  3. f est holomorphe sur le disque |z| < π/2, qui est simplement connexe et contient Γ — sous-but `hyp`
  4. `∮ f dz = 0` — sous-but `conclude`
- **Aides** : 1 « Où sont les zéros du dénominateur ? » · 2 `cos z = 0 ⟺ z = … + kπ` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2021) « Pour quelles fonctions ∮_{|z|=1} f dz = 0 ? 1/z ; cos z/z² ; 1/(z(z + 1)) ; 1/(z + 2)² ; cos z/z³ » : bonnes cos z/z² et 1/(z + 2)² ; pièges `c_pole_on_contour` (1/(z(z + 1))), `c_pole_outside_counted`. `mcq` une réponse pour ba3. `open` (2022, 2 pts sur 5).
- **Pièges** : `c_pole_on_contour`, `c_pole_outside_counted`, `c_cos_bounded`.
- **Sous-buts → crédit** : `singularities`, `locate` → `c-cauchy-thm` ; `hyp`, `conclude` → `c-cauchy-thm`.

### `c-cauchy-formula` — Formule intégrale de Cauchy
- **Année** 15 · **Prérequis** `c-cauchy-thm` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-cauchy-thm` : placer les singularités par rapport à Γ.
- **Statut** : fait le 10 novembre 2026 (étape U10). n par une décision (`c_cauchy_n_factor`), g⁽ⁿ⁾(z) par `cvalue` (z échantillonné dans ℂ), puis la valeur 2πi g⁽ⁿ⁾(z₀)/n! (`cvalue`, les fausses valeurs du piège dans la configuration). g parmi e^(az), cos z, sin z, z^k, 1/(z − b) ; z₀ ∈ {0, 1, i}. L5 : un problème (QCM sur la formule, puis un calcul).
- **Intro** : f holomorphe, z₀ à l'intérieur de Γ : f^(n)(z₀) = n!/(2πi) ∮_Γ f(z)/(z − z₀)^(n+1) dz. On lit donc ∮ g/(z − z₀)^(n+1) = 2πi g^(n)(z₀)/n!. Exemple : `math: ∮_{|z|=1} e^(2z)/z³ dz = 2πi · (e^(2z))″(0)/2!`, `note: n = 2, puissance n + 1 = 3` ; `math: = 2πi · 4/2 = 4πi`.
- **Juge** : `complex` · **Forme finale** : valeur exacte.
- **Niveaux** :
  - L1 : g et n donnés, la dérivée à trous.
  - L2 : identifier g et n.
  - L3 : choisir « Cauchy (0) », « formule de Cauchy », « résidus ».
  - L4 : libre.
  - L5 : QCM multi sur les énoncés (2021) + un calcul.
- **Générateur** : g ∈ {e^(az), cos z, sin z, z^k, 1/(z − b)} avec a ∈ {1, 2, 3}, b hors du contour ; n ∈ {0, 1, 2, 3} ; z₀ ∈ {0, 1, i}.
- **Corrigé type** (∮_{|z|=2} e^z/(z − 1) dz) :
  1. g(z) = e^z holomorphe, z₀ = 1 intérieur, n = 0 — sous-but `identify`
  2. `∮ = 2πi g(1) = 2πie` — sous-but `value`
- **Aides** : 1 « Écris l'intégrande g(z)/(z − z₀)^(n+1) » · 2 `n = …, g = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2021) « Cochez : f^(n)(z₀) = n!/(2πi)∮ f/(z − z₀)ⁿ ; ∮ dz/(z − z₀) = 2πi ; ∮ f/(z − z₀) dz = 0 ; … » ; pièges `c_cauchy_n_factor`. `open` : non.
- **Pièges** : `c_cauchy_n_factor`, `c_residue_2pii`.
- **Sous-buts → crédit** : `identify`, `value` → `c-cauchy-formula`.

### `c-taylor` — Série de Taylor et rayon de convergence
- **Année** 15 · **Prérequis** `a1-pow-domain`, `a1-ser-geo-tele` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-ser-geo-tele` : série géométrique 1/(1 − u).
- **Statut** : fait le 10 novembre 2026 (étape U10). Les Σ sont jugées par `cvalue` sur l'axe réel, dans le disque (le juge `series` n'a que des coefficients réels et pas de Σ) ; une série fausse est refusée avec un témoin. Rayon : une valeur (`c_taylor_radius`). Gabarits 1/(a ± z²), 1/(a ± z), 1/(1 + bz), z/(1 − z)² ; au niveau 4 aussi a₀…a₃ d'un quotient (dont 1/(sin z + 2 cos z − 3), GM 2015) par `series`. `coef` : a₂ ou a₃ d'un quotient. Pas de e^z/(1 − z) en terme général ; L5 : des lignes sans aide.
- **Intro** : une fonction holomorphe sur le disque |z − z₀| < R est égale à sa série de Taylor sur ce disque ; le rayon est la **distance de z₀ à la singularité la plus proche**. Pour une fraction, on se ramène à 1/(1 − w) = Σ wⁿ, |w| < 1. Exemple (2022) : `math: 1/(3 + z²) = (1/3) · 1/(1 + z²/3) = Σ (−1)ⁿ z^(2n)/3^(n+1)` ; `math: rayon √3`, `note: singularités ±i√3`.
- **Juge** : `series` `{v:'z', at:0, order:k}` (coefficients complexes) ; `value` pour le rayon · **Forme finale** : terme général (ou premiers coefficients demandés) et rayon.
- **Niveaux** :
  - L1 : la mise en forme 1/(1 − w) donnée, le terme général à trous.
  - L2 : trouver w.
  - L3 : choisir « série géométrique », « DL usuel », « dérivées en 0 ».
  - L4 : libre, a₀ à a₃ d'un quotient (GM 2015).
  - L5 : coefficients puis rayon, avec justification.
- **Générateur** : 1/(a + z²), 1/(a − z), z/(1 − z)², 1/((z − a)(z − b)) (Taylor en 0), e^z/(1 − z) ; a ∈ {2, 3, 4}. Gabarit GM : 1/(sin z + 2 cos z − 3) : a₀ = −1, a₁ = −1, a₂ = 0, a₃ = 7/6 (DL des deux fonctions).
- **Corrigé type** (1/(3 + z²) en 0) :
  1. `1/(3 + z²) = (1/3) · 1/(1 − (−z²/3))` — sous-but `geometric`
  2. `= (1/3) Σ (−z²/3)ⁿ = Σ (−1)ⁿ z^(2n)/3^(n+1)` — sous-but `general-term`
  3. `|z²/3| < 1 ⟺ |z| < √3`, et ±i√3 sont des singularités : rayon √3 — sous-but `radius`
- **Aides** : 1 « Fais apparaître 1/(1 − w) » · 2 `w = −z²/…` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2021) « Cochez les développements justes : 1/(1 − z) = Σ zⁿ, |z| < 1 ; sin z/z = Σ z^(2n)/(2n + 1)! ; 1/(z(1 + z)) = Σ z^(n−1) » ; pièges `c_laurent_sign`. `coef` « a₃ = ? ». `open` (2022, 3 pts).
- **Pièges** : `c_laurent_sign`, `c_taylor_radius`.
- **Sous-buts → crédit** : `geometric`, `general-term` → `c-taylor` ; `radius` → `a1-pow-domain`.

### `c-laurent` — Série de Laurent dans une couronne donnée
- **Année** 15 · **Prérequis** `c-taylor`, `g0-pfd-simple` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-taylor` : développer en série autour de z₀.
- **Statut** : fait le 10 novembre 2026 (étape U10). Pôles réels seulement (a, b ∈ {0, ±1, ±2, ±3}) : chaque série est comparée par `cvalue` sur un segment réel de la couronne ; une série de l'autre couronne y diverge et est comparée là où elle converge (`c_laurent_wrong_annulus`). Éléments simples par `cvalue` (finale « éléments simples »). L4 : aussi autour de z₀ = 1. L5 : un problème (les trois régions, puis a₋₃ ou a₋₄ : a₋₂ vaut toujours 1 hors des deux pôles). `coef` : un coefficient, ou e^(1/z), z² sin(1/z), cos(1/z). Pas de e^(1/z) en lignes.
- **Intro** : dans une couronne r < |z − z₀| < R, f = Σ_{n∈ℤ} aₙ(z − z₀)ⁿ. On décompose en éléments simples, puis chaque terme 1/(z − a) se développe selon la couronne : si |z| < |a|, en puissances de z/a ; si |z| > |a|, en puissances de a/z. Exemple : `math: 1/(1 − z) = Σ_{n≥0} zⁿ (|z| < 1)` ; `math: 1/(1 − z) = −Σ_{n≥1} z^(−n) (|z| > 1)`, `note: même fonction, deux séries`.
- **Juge** : `series` `{v:'z', at:z0, annulus:[r, R]}` (Laurent : puissances négatives admises ; contrôle numérique en 6 points de la couronne) · **Forme finale** : Σ avec terme général, ou les coefficients demandés.
- **Niveaux** :
  - L1 : DES donnée, chaque développement à trous.
  - L2 : DES à faire, la couronne dit quel développement prendre.
  - L3 : pour chaque terme, décision « puissances de z » ou « puissances de 1/z ».
  - L4 : libre, couronne centrée hors de 0 (z₀ = 1).
  - L5 : trois couronnes pour la même fonction (|z| < 1, 1 < |z| < 2, |z| > 2), et a₋₂ dans la dernière (GM 2016).
- **Générateur** : f = 1/((z − a)(z − b)) avec a, b ∈ {1, 2, 3, −1, i} distincts ; f = 1/(z(z − a)) ; f = e^(1/z), z² sin(1/z) ; couronnes déterminées par |a| et |b|. Gabarit `coef` : « dans 2 < |z|, a₋₂ = ? ».
- **Corrigé type** (f = 1/((z − 1)(z − 2)), 1 < |z| < 2) :
  1. `f = 1/(z − 2) − 1/(z − 1)` — sous-but `des`
  2. `|z| < 2 : 1/(z − 2) = −(1/2) · 1/(1 − z/2) = −Σ_{n≥0} zⁿ/2^(n+1)` — sous-but `inner`
  3. `|z| > 1 : 1/(z − 1) = (1/z) · 1/(1 − 1/z) = Σ_{n≥1} z^(−n)` — sous-but `outer`
  4. `f = −Σ_{n≥0} zⁿ/2^(n+1) − Σ_{n≥1} z^(−n)` — sous-but `assemble`
- **Aides** : 1 « Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle » · 2 `1/(z − 1) = (1/z) · 1/(1 − …)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (une réponse) « La série de Laurent de f dans 1 < |z| < 2 est » ; distracteurs de `c_laurent_wrong_annulus`, `c_laurent_sign`. `coef` « a₋₂ ». `open` (2022, 3 pts).
- **Pièges** : `c_laurent_wrong_annulus`, `c_laurent_sign`.
- **Sous-buts → crédit** : `des` → `g0-pfd-simple` ; `inner`, `outer`, `assemble` → `c-laurent`.

### `c-singularities` — Classer les singularités
- **Année** 15 · **Prérequis** `c-laurent`, `a1-dl-usual` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-laurent` : lire la plus basse puissance de la série de Laurent.
- **Statut** : fait le 10 novembre 2026 (étape U10). Ordres des zéros par `series` (en h = z − a quand z₀ = a ≠ 0, le juge `series` ne finissant pas une ligne « (z − a) + o(z − a) »), nature par une décision (`c_removable_as_pole`), ordre du pôle par `cvalue` (`c_order_pole_numerator`) ; toutes les réponses vérifiées par `singularityType`. Pas de z₀ = π dans les lignes. Essentielles (e^(1/z), z² sin(1/z), sin(1/(1 − 2z)), cos(1/z)) en QCM. L5 : un problème de QCM (les deux singularités d'une fonction) ; `open` : deux fonctions, 1,5 point chacune.
- **Intro** : singularité isolée z₀ : **apparente** (pas de puissance négative ; lim finie), **pôle d'ordre m** (la plus basse puissance est (z − z₀)^(−m)), **essentielle** (une infinité de puissances négatives). Pour un quotient, ordre du pôle = ordre du zéro du dénominateur − ordre du zéro du numérateur. Exemple : `math: g = (e^(z−π) − 1)/sin²z en π`, `note: numérateur : zéro d'ordre 1 ; dénominateur : zéro d'ordre 2` ; `math: pôle simple`.
- **Juge** : item `mcq` (type de singularité) suivi d'un `answer` pour l'ordre ; lignes d'ordre des zéros jugées par `series` (premier coefficient non nul) · **Forme finale** : type, et ordre si pôle.
- **Niveaux** :
  - L1 : séries des numérateur et dénominateur données ; choisir le type.
  - L2 : ordres des zéros à trouver.
  - L3 : choisir la méthode : « ordres des zéros », « série de Laurent », « limite ».
  - L4 : libre.
  - L5 : toutes les singularités d'une fonction, avec type et ordre.
- **Générateur** : quotients p(z)/q(z) avec p ∈ {sin z, e^(z−a) − 1, 1 − cos z, z^k}, q ∈ {z^m, sin^m z, (z − a)^m} ; fonctions à singularité essentielle : e^(1/z), sin(1/(a − bz)), z² sin(1/z). Équilibrer les trois types.
- **Corrigé type** ((e^(z−π) − 1)/sin²z en z₀ = π, 2022) :
  1. `e^(z−π) − 1 = (z − π) + …` : zéro d'ordre 1 — sous-but `zero-num`
  2. `sin z = −(z − π) + …`, donc sin²z a un zéro d'ordre 2 — sous-but `zero-den`
  3. 2 − 1 = 1 : pôle simple — sous-but `classify`
- **Aides** : 1 « Compte l'ordre du zéro en haut et en bas » · 2 `sin z = −(z − π) + …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « En z₀, g a : une singularité apparente / un pôle simple / un pôle double / une singularité essentielle » ; distracteurs de `c_order_pole_numerator`, `c_removable_as_pole`. `open` (2022, 1,5 pt par fonction).
- **Pièges** : `c_order_pole_numerator`, `c_removable_as_pole`.
- **Sous-buts → crédit** : `zero-num`, `zero-den` → `a1-dl-usual` ; `classify` → `c-singularities`.

### `c-res-simple` — Résidu en un pôle simple
- **Année** 15 · **Prérequis** `c-singularities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-singularities` : vérifier que le pôle est simple.
- **Statut** : fait le 10 novembre 2026 (étape U10). Les valeurs sont jugées par le nouveau juge `cval` (js/judges/cplx-cb.js : une valeur complexe nommée par son étiquette, « Res(f ; z₀) », comparée à la valeur de référence, puis ligne à ligne comme `complex`) ; q′ et q′(z₀) sont deux parties `cval` (q′ comparée en 6 points réels). Gabarits : z² + a², z⁴ + 4, (z − a)(z − b), z³ − 1 en 1, sin z, cos z ; pas de z⁴ + 1 (racines d'ordre 8). L2 et L3 : décision de méthode ; L3 : menus ; L5 : les résidus d'un demi-plan (z⁴ + 4 ou (z² + a²)(z² + b²)). `coef` : la seule partie « Res ». QCM : 1/q′(z₀) (`c_essential_factor`, comme le catalogue), l'opposé, l'inverse, le double ; QCM multi : la forme p(z₀)/q′(z₀) est aussi juste. `c_sqrt_i` n'est pas proposé.
- **Intro** : en un pôle simple, Res(f, z₀) = lim (z − z₀) f(z) ; si f = p/q avec q(z₀) = 0, q′(z₀) ≠ 0, p(z₀) ≠ 0 : Res = p(z₀)/q′(z₀). Exemple : `math: Res(1/(z⁴ + 4), 1 + i) = 1/(4(1 + i)³)`, `note: q′ = 4z³` ; `math: (1 + i)³ = −2 + 2i, donc Res = −(1 + i)/16`.
- **Juge** : `complex` (exact dans ℚ(i), avec e^(…) et sinh si besoin) · **Forme finale** : a + bi simplifié.
- **Niveaux** :
  - L1 : p, q′ donnés ; la valeur à trous.
  - L2 : q′ à calculer.
  - L3 : choisir « lim (z − z₀)f », « p/q′ », « Laurent » ; `poor` pour la limite quand q est de degré 4.
  - L4 : libre.
  - L5 : les résidus de tous les pôles d'une fraction dans un demi-plan.
- **Générateur** : q ∈ {z² + a², z⁴ + 4, z⁴ + 1, z³ − 1, (z − a)(z − b), sin z, cos z} ; p ∈ {1, z, e^(iαz), z²}. Pôles exacts dans ℚ(i) ou racines de l'unité d'ordre 4 ou 8.
- **Corrigé type** (Res(e^(2iz)/(z² + 1), i)) :
  1. `q = z² + 1, q′ = 2z, q′(i) = 2i` — sous-but `derivative`
  2. `Res = e^(2i·i)/(2i) = e^(−2)/(2i)` — sous-but `value`
- **Aides** : 1 « Pôle simple : p(z₀)/q′(z₀) » · 2 `q′(i) = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` « Res(f, z₀) = » ; distracteurs : 1/(2i) (`c_essential_factor` sans le e), signe, i/2. `coef` (résidu seul). `open` : étape.
- **Pièges** : `c_simple_formula_double`, `c_sqrt_i`.
- **Sous-buts → crédit** : `derivative`, `value` → `c-res-simple`.

### `c-res-multiple` — Résidu en un pôle multiple
- **Année** 15 · **Prérequis** `c-singularities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). φ = (z − z₀)^m f, φ^(m−1) et la valeur sont des parties `cval` (variables z, et t pour la Laplace inverse). L5 : e^(zt)/((z − a)²(z − b)) : résidu double, résidu simple, puis y(t), en `cval` avec la variable t (au lieu de `equiv`). `c_simple_formula_double` : la valeur φ(z₀) (la dérivée oubliée), et l'option fausse de la décision ; `c_multiple_factorial` : sans 1/(m − 1)! ou avec 1/m!.
- **Intro** : pôle d'ordre m : Res = 1/(m − 1)! · lim_{z→z₀} d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)]. La formule du pôle simple donne une limite infinie. Exemple (2021) : `math: Res(e^(zt)/((z + 1)²(z + 2)), −1) = d/dz[e^(zt)/(z + 2)] en −1`, `note: m = 2, 1/1! = 1` ; `math: = (t e^(zt)(z + 2) − e^(zt))/(z + 2)² en −1 = t e^(−t) − e^(−t)`.
- **Juge** : `complex` si la valeur est un nombre ; `equiv` `{vars:['t']}` si elle contient t (Laplace inverse) · **Forme finale** : valeur simplifiée.
- **Niveaux** :
  - L1 : m et (z − z₀)^m f donnés ; la dérivée à trous.
  - L2 : m à trouver.
  - L3 : choisir la formule (simple ou multiple) — `valid:false` pour la simple, avec le message « la limite est infinie ».
  - L4 : libre.
  - L5 : un pôle double et un pôle simple dans la même fonction (Laplace inverse, 2021).
- **Générateur** : f = g(z)/((z − a)^m h(z)) avec m ∈ {2, 3}, g ∈ {1, z, e^(zt), e^z}, h ∈ {1, z − b} ; a, b entiers.
- **Corrigé type** (Res(1/(z²(z − 1)), 0)) :
  1. pôle d'ordre 2 : `z² f = 1/(z − 1)` — sous-but `order`
  2. `d/dz [1/(z − 1)] = −1/(z − 1)²` — sous-but `derivative`
  3. en 0 : `Res = −1` — sous-but `value`
- **Aides** : 1 « Ordre m = 2 : on dérive une fois (z − z₀)² f » · 2 `d/dz[1/(z − 1)] = …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « Res(f, z₀) = » ; distracteurs de `c_simple_formula_double`, `c_multiple_factorial`. `coef`. `open` : étape de `f-lap-inv-res`.
- **Pièges** : `c_simple_formula_double`, `c_multiple_factorial`.
- **Sous-buts → crédit** : `order` → `c-singularities` ; `derivative`, `value` → `c-res-multiple`.

### `c-res-laurent` — Résidu par la série de Laurent (singularité essentielle)
- **Année** 15 · **Prérequis** `c-laurent`, `c-singularities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-singularities` : reconnaître une singularité essentielle.
- **Statut** : fait le 10 novembre 2026 (étape U10). Le changement w = z − z₀ est une partie `cval` en w ; les développements en puissances de 1/w ou de 1/z sont jugés par le nouveau juge `laur` (le juge `series` en v → +∞, avec sa propre forme finale : des monômes, chaque puissance une fois, et un reste o(1/vⁿ)), parce que `series` ne développe pas en un point complexe ; le résidu est une partie `cval`. Gabarits : g(1/(a − bz)) avec g ∈ {sin, sinh, exp, cos}, et z^k g(1/z) avec g ∈ {sin, cos, exp, sinh, cosh}. L5 et `open` : un problème de 4 points (nature en QCM, 1 pt ; série, 1 pt ; résidu, 2 pts).
- **Intro** : le résidu est toujours a₋₁, le coefficient de 1/(z − z₀). Pour une singularité essentielle, c'est la seule méthode. Exemple (2022) : h = sin(1/(2i − 3z)) en z₀ = 2i/3 ; `math: 1/(2i − 3z) = −1/(3(z − 2i/3))` ; `math: h = −1/(3(z − z₀)) + 1/(162 (z − z₀)³) − …`, `note: Res = −1/3`.
- **Juge** : `series` (Laurent en z₀) pour le développement ; `complex` pour a₋₁ · **Forme finale** : a₋₁, avec la série jusqu'au terme utile.
- **Niveaux** :
  - L1 : le changement w = z − z₀ fait, le DL de sin à trous.
  - L2 : écrire 1/(2i − 3z) en fonction de w.
  - L3 : choisir « formule de pôle » (`valid:false` : singularité essentielle) ou « Laurent ».
  - L4 : libre.
  - L5 : nature, résidu et série de Laurent (2022, 3 pts).
- **Générateur** : g(1/(a − bz)) avec g ∈ {sin, cos, exp, sinh}, a ∈ {1, 2i, 3}, b ∈ {1, 2, 3} ; z^k g(1/z) avec k ∈ {0, 1, 2}. Résidus rationnels.
- **Corrigé type** (z² sin(1/z) en 0) :
  1. `sin(1/z) = 1/z − 1/(6z³) + 1/(120 z⁵) − …` — sous-but `expand`
  2. `z² sin(1/z) = z − 1/(6z) + 1/(120 z³) − …` — sous-but `multiply`
  3. `Res = a₋₁ = −1/6` — sous-but `read`
- **Aides** : 1 « Développe sin(w) avec w = 1/z, puis multiplie par z² » · 2 `z² · (1/z − 1/(6z³) + …)` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` « Res = » ; distracteurs de `c_essential_lim` (limite prise comme pôle), `c_essential_factor` (−1/3 oublié : 1). `coef`. `open` (2022).
- **Pièges** : `c_essential_lim`, `c_essential_factor`.
- **Sous-buts → crédit** : `expand`, `multiply` → `c-laurent` ; `read` → `c-res-laurent`.

### `c-res-theorem` — Théorème des résidus sur un contour fermé
- **Année** 15 · **Prérequis** `c-res-simple`, `c-res-multiple`, `c-cauchy-thm` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). Une décision « à l'intérieur / à l'extérieur / sur Γ » par pôle (L2 et L3), les résidus intérieurs et la somme en parties `cval` ; le sous-but `locate` est la ligne 2πi(…), qui choisit les résidus. Contours : cercles |z − c| = R (c ∈ {0, i, 1}) ; L5 : carré ou ellipse, 3 ou 4 pôles. Pôles dans ℤ, ℤi et 1 + i (un pôle double possible), numérateurs de degré ≤ 1, dénominateurs ≤ 12. Pas de gabarit « non défini » ni de sin z/z² dans les lignes : le QCM multi « ∮ = 0 ? » (C2) les contient. `open` : le même f sur deux contours, 5 points.
- **Intro** : on liste les singularités, on garde celles **à l'intérieur** de Γ, on calcule leurs résidus, ∮ = 2πi Σ. Une singularité sur Γ rend l'intégrale non définie. Exemple : `math: ∮_{|z|=2} (z + 1)/(z(z − 1)(z − 3)) dz`, `note: 0 et 1 dedans, 3 dehors` ; `math: = 2πi (1/3 − 1) = −4πi/3`.
- **Juge** : décision « dedans / dehors / sur » par singularité (`mcq`), `complex` pour chaque résidu et pour la somme · **Forme finale** : valeur exacte.
- **Niveaux** :
  - L1 : singularités et positions données ; résidus à trous.
  - L2 : positions à décider.
  - L3 : décision par singularité, puis formule de résidu à choisir.
  - L4 : libre, contour décalé (cercle de centre i, rayon 2 : 0 et 2i dedans, −2i et 3 dehors, 2022).
  - L5 : contour elliptique ou carré, 3 ou 4 singularités.
- **Générateur** : f rationnelle de degré du dénominateur 2 à 4, pôles entiers ou ±i, ±2i ; contours |z − z₀| = R avec z₀ ∈ {0, i, 1}, R ∈ {1, 3/2, 2, 5/2} ; on rejette les tirages où une singularité est à distance < 0,2 du contour, sauf dans le gabarit « non défini ». Gabarit avec sin z/z² (pôle simple, pas double).
- **Corrigé type** (∮_{|z|=2} (z + 1)/(z(z − 1)(z − 3)) dz) :
  1. singularités 0, 1, 3 ; dans |z| < 2 : 0 et 1 — sous-but `locate`
  2. `Res(f, 0) = 1/((−1)(−3)) = 1/3` — sous-but `residue`
  3. `Res(f, 1) = 2/(1 · (−2)) = −1` — sous-but `residue`
  4. `∮ = 2πi (1/3 − 1) = −4πi/3` — sous-but `sum`
- **Aides** : 1 « Seuls les pôles à l'intérieur comptent » · 2 `∮ = 2πi (Res(f, 0) + Res(f, 1))` · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (une réponse) et `mcq` multi ; distracteurs de `c_pole_outside_counted` (on ajoute Res en 3), `c_residue_2pii`. `open` (2022, 5 pts : deux contours).
- **Pièges** : `c_pole_outside_counted`, `c_pole_on_contour`, `c_residue_2pii`, `c_removable_as_pole`.
- **Sous-buts → crédit** : `locate` → `c-cauchy-thm` ; `residue` → `c-res-simple` ou `c-res-multiple` selon l'ordre ; `sum` → `c-res-theorem`.

### `c-arc-estimate` — Montrer qu'une intégrale sur un arc tend vers 0
- **Année** 15 · **Prérequis** `c-contour-param`, `g8-algebraic` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-contour-param` : longueur de l'arc paramétré ; `g8-algebraic` : modules et inégalité triangulaire.
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 à L3 en blocs (L2 et L3 avec les leurres de `c_cos_bounded`, `c_arc_triangle` et `c_jordan_alpha_sign` ; L3 : la minoration du dénominateur à écrire). L4 : le nouveau juge `arcb` (chaque ligne doit majorer, ou minorer, la précédente en tout point de l'arc : 8 rayons de 3 à 50, 33 angles) au lieu de `equiv` avec `rel`, qui ne connaît qu'une variable ; puis la limite en R (`limit`). L5 : le demi-cercle gauche de la Laplace inverse, t échantillonné. Gabarits : z² + a², z⁴ + 4 (avec ou sans z au numérateur), e^(iαz) avec α ∈ {0, ±1, ±2, 3}. `open` : la version L4 en problème de 3 points.
- **Intro** : |∫_{C_R} f dz| ≤ longueur(C_R) · max_{C_R} |f|. On majore le numérateur (|e^(iαz)| = e^(−α Im z) ≤ 1 si α > 0 et Im z ≥ 0), on **minore** le dénominateur par l'inégalité triangulaire inverse |z² + 1| ≥ R² − 1, et la longueur vaut πR. Exemple : `math: |∫_{C_R} e^(2iz)/(z² + 1) dz| ≤ πR · 1/(R² − 1)` ; `math: → 0 quand R → ∞`.
- **Juge** : `blocks` `{mode:'order'}` avec des blocs-inégalités ; à L4, chaque inégalité est vérifiée par `equiv` sur un échantillon (z sur l'arc, R ∈ [3 ; 50]) : l'inégalité doit être vraie partout ; la borne finale par `limit` `{v:'R', to:'inf'}` · **Forme finale** : une borne explicite qui tend vers 0.
- **Niveaux** :
  - L1 : blocs dans le désordre, sans leurre.
  - L2 : avec leurres (« |cos z| ≤ 1 », « |z² + 1| ≤ R² + 1 donc 1/|z² + 1| ≤ 1/(R² + 1) »).
  - L3 : compléter la minoration du dénominateur.
  - L4 : écrire la majoration librement.
  - L5 : l'arc C_r du demi-plan gauche pour la Laplace inverse (2021 : |e^(zt)| = e^(t r cos θ) ≤ 1 pour θ ∈ [π/2 ; 3π/2]).
- **Générateur** : f = p(z)e^(iαz)/q(z) avec deg q ≥ deg p + 2 (la majoration longueur × max ne tend vers 0 que dans ce cas ; avec deg q = deg p + 1 et α > 0, il faut le lemme de Jordan) ; q = z² + a², z⁴ + 4, (z + 1)²(z + 2) ; arc supérieur, inférieur (α < 0) ou gauche (Laplace).
- **Corrigé type** (∫_{C_R} e^(2iz)/(z² + 1) dz, C_R demi-cercle supérieur) :
  1. sur C_R : `|e^(2iz)| = e^(−2 Im z) ≤ 1` — sous-but `numerator`
  2. `|z² + 1| ≥ |z|² − 1 = R² − 1` — sous-but `denominator`
  3. `|∫_{C_R}| ≤ πR/(R² − 1)` — sous-but `ml-bound`
  4. `πR/(R² − 1) → 0` quand R → ∞ — sous-but `limit`
- **Aides** : 1 « Majore |f| sur l'arc, multiplie par la longueur πR » · 2 `|z² + 1| ≥ R² − …` · 3 la ligne 2.
- **Variantes d'examen** : `open` (2021 Analyse IV, partie 2 d'un problème, 2 à 3 pts ; plan §5). `mcq` : non.
- **Pièges** : `c_cos_bounded`, `c_arc_triangle`, `c_eiax_cos`.
- **Sous-buts → crédit** : tous → `c-arc-estimate`.

### `c-int-rational` — Intégrales rationnelles sur ℝ
- **Année** 15 · **Prérequis** `c-res-theorem`, `c-arc-estimate` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Résidus en `cval`, arc en `arcb` (L4 et L5), 2πi Σ Res en `cval`, puis la conclusion en `definite` (valeur contrôlée par quadrature). L2 et L3 : décision « quels pôles ? ». L5 : ∫₀^∞ par parité, en `definite`. Gabarits du catalogue, plus 1/(x² + a²) et x²/((x² + a²)(x² + b²)) ; x²/(x⁴ + 1) est remplacé par x²/(x⁴ + 4) (pôles dans ℚ(i)). `open` : la version L4, 7 points.
- **Intro** : si deg q ≥ deg p + 2 et q sans racine réelle, ∫_ℝ p/q dx = 2πi Σ_{Im z_k > 0} Res(p/q, z_k). Exemple (plan, §5) : `math: ∫_ℝ dx/(1 + x²) = 2πi · Res(1/(1 + z²), i) = 2πi/(2i) = π`.
- **Juge** : `complex` pour les résidus ; `definite` `{value}` pour la valeur réelle (contrôle par quadrature) · **Forme finale** : nombre réel exact.
- **Niveaux** :
  - L1 : pôles du demi-plan supérieur donnés, résidus à trous.
  - L2 : pôles à trier.
  - L3 : choisir le demi-plan, la formule de résidu.
  - L4 : libre, justification de l'arc comprise (bloc de `c-arc-estimate`).
  - L5 : intégrale paire sur [0 ; +∞[ ramenée à ℝ.
- **Générateur** : 1/((x² + a²)(x² + b²)) avec a ≠ b dans {1, 2, 3} (valeur π/(ab(a + b))) ; 1/(x² + a²)² (π/(2a³)) ; 1/(x⁴ + 4) (π/4) ; x²/(x⁴ + 1).
- **Corrigé type** (∫_ℝ dx/((x² + 1)(x² + 4))) :
  1. pôles dans Im z > 0 : i et 2i — sous-but `poles`
  2. `Res(f, i) = 1/(2i · 3) = 1/(6i)` ; `Res(f, 2i) = 1/(−3 · 4i) = −1/(12i)` — sous-but `residues`
  3. arc : `|∫_{C_R}| ≤ πR/((R² − 1)(R² − 4)) → 0` — sous-but `arc`
  4. `∫ = 2πi · 1/(12i) = π/6` — sous-but `value`
- **Aides** : 1 « Ferme par un demi-cercle en haut ; seuls les pôles d'Im > 0 » · 2 `2πi (Res(f, i) + Res(f, 2i))` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (une réponse) « ∫_ℝ … = » ; distracteurs de `c_upper_half_lower_pole` (−π/6), `c_pole_outside_counted` (0). `open` (6 à 8 pts).
- **Pièges** : `c_upper_half_lower_pole`, `c_pole_outside_counted`, `c_residue_2pii`.
- **Sous-buts → crédit** : `poles` → `c-res-theorem` ; `residues` → `c-res-simple` ; `arc` → `c-arc-estimate` ; `value` → `c-int-rational`.

### `c-int-trig` — Intégrales trigonométriques sur [0 ; 2π]
- **Année** 15 · **Prérequis** `c-res-theorem` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). L'intégrande en z est une partie `cval` en z (comparaison en 6 points réels de ]−1 ; 1[, forme finale : une seule fraction P(z)/Q(z)) au lieu de `equiv`, qui ne calcule pas avec i ; puis le pôle intérieur (`cval`, l'autre racine nomme `c_pole_outside_counted`), son résidu, 2πi Res, et la conclusion en `definite`. L3 : décision sur la racine à garder. L5 : la moitié des items avec les paramètres a et b (∫₀^{2π} dθ/(a + b sin θ)) ; pas de cos²θ/(a + cos θ). QCM multi au format 2021, avec `c_trig_sub`. `open` : 5 points.
- **Intro** : z = e^(iθ) transforme ∫₀^{2π} R(cos θ, sin θ) dθ en une intégrale sur le cercle unité : cos θ = (z + 1/z)/2, sin θ = (z − 1/z)/(2i), dθ = dz/(iz). On garde les pôles de |z| < 1. Exemple (2022) : `math: ∫₀^{2π} dθ/(2 − cos θ) = ∮ 2i/(z² − 4z + 1) dz` ; `math: pôle intérieur 2 − √3, résidu −i/√3, donc 2π/√3`.
- **Juge** : `equiv` `{vars:['z'], complex:true}` pour l'intégrande en z ; `complex` pour les résidus ; `definite` pour la valeur · **Forme finale** : nombre réel exact.
- **Niveaux** :
  - L1 : la substitution faite, l'intégrande en z à trous.
  - L2 : la substitution à faire.
  - L3 : choisir les pôles intérieurs.
  - L4 : libre.
  - L5 : ∫₀^{2π} dθ/(a + b sin θ) avec paramètres (résultat 2π/√(a² − b²)).
- **Générateur** : 1/(a ± b cos θ), 1/(a ± b sin θ) avec a > |b|, a² − b² carré parfait ou 3, 5 ; (√5, 1) comme en 2021 ; cos²θ/(a + cos θ) à L5.
- **Corrigé type** (∫₀^{2π} dθ/(2 − cos θ)) :
  1. `z = e^(iθ) : cos θ = (z + 1/z)/2, dθ = dz/(iz)` — sous-but `substitute`
  2. intégrande `= 1/(2 − (z + 1/z)/2) · 1/(iz) = 2i/(z² − 4z + 1)` — sous-but `rewrite`
  3. pôles 2 ± √3 ; seul 2 − √3 est dans |z| < 1 — sous-but `poles`
  4. `Res = 2i/(2(2 − √3) − 4) = −i/√3` — sous-but `residue`
  5. `∫ = 2πi · (−i/√3) = 2π/√3` — sous-but `value`
- **Aides** : 1 « Pose z = e^(iθ) ; dθ = dz/(iz) » · 2 `1/(2 − (z + 1/z)/2) · 1/(iz) = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2021) « I = ∫₀^{2π} dθ/(√5 − sin θ) : I = ∮ 2 dz/(−z² + iz√5 + 1) ; I = π ; I = 2πi Res_{z₂} … ; I = 2π » ; piège `c_trig_sub` (facteur 2 devant √5). `open` (2022, 5 pts).
- **Pièges** : `c_trig_sub`, `c_pole_outside_counted`.
- **Sous-buts → crédit** : `substitute`, `rewrite` → `c-int-trig` ; `poles`, `residue` → `c-res-theorem` ; `value` → `c-int-trig`.

### `c-int-fourier` — Intégrales avec e^(iαx)
- **Année** 15 · **Prérequis** `c-res-theorem`, `c-arc-estimate` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). R ∈ {1/(x² + a²), x/(x² + a²), x/(x⁴ + 4), 1/((x² + 1)(x² + 4))} ; α < 0 seulement pour les R paires. Résidus et J en `cval` ; arc en `arcb` (pas pour x/(x² + a²), où il faut le lemme de Jordan, cité dans l'énoncé de la partie) ; la partie réelle ou imaginaire en `definite`, avec la valeur exacte donnée (`known` : la quadrature ne calcule pas une intégrale oscillante sur ℝ). L2 et L3 : décisions « e^(iαz) ou cos(αz) ? » et « quel demi-plan ? ». L5 et `open` : l'exemple d'examen C1 (11 points) en `problem` : contour (QCM, 1 pt), pôles (QCM, 1,5 pt), résidus (3), somme et J (1,5), arc (3), conclusion (1), avec α ∈ {1, 2, 3}.
- **Intro** : pour ∫_ℝ R(x) cos(αx) dx ou sin(αx), on calcule ∫_ℝ R(x) e^(iαx) dx et on prend la partie réelle ou imaginaire. On ne met **pas** cos(αz) dans le contour : il n'est pas borné. Pour α > 0, on ferme en haut. Exemple : `math: ∫_ℝ cos(2x)/(x² + 1) dx = Re(2πi · e^(−2)/(2i)) = π e^(−2)`.
- **Juge** : `complex` (résidus avec exponentielles) ; `definite` pour la valeur · **Forme finale** : nombre réel exact.
- **Niveaux** :
  - L1 : la fonction e^(iαz)R(z) donnée, résidus à trous.
  - L2 : choisir e^(iαz), le demi-plan.
  - L3 : décision « cos(αz) dans le contour » (`valid:false`, `why` : |cos(αz)| croît comme e^(α|Im z|)) ou « e^(iαz) puis Re ».
  - L4 : libre, avec la borne de l'arc.
  - L5 : ∫ x e^(3ix)/(x⁴ + 4) dx (2022, 11 pts).
- **Générateur** : R ∈ {1/(x² + a²), x/(x² + a²), x/(x⁴ + 4), 1/((x² + 1)(x² + 4))}, α ∈ {1, 2, 3} ; parfois α < 0 (fermer en bas, signe −).
- **Corrigé type** (∫_ℝ x e^(3ix)/(x⁴ + 4) dx, 2022) :
  1. pôles de z⁴ + 4 dans Im z > 0 : 1 + i et −1 + i — sous-but `poles`
  2. `Res(f, z_k) = z_k e^(3iz_k)/(4z_k³) = e^(3iz_k)/(4z_k²)` — sous-but `formula`
  3. `Res(f, 1 + i) = e^(−3)e^(3i)/(8i)`, `Res(f, −1 + i) = −e^(−3)e^(−3i)/(8i)` — sous-but `residues`
  4. somme `= e^(−3) sin 3/4` — sous-but `sum`
  5. arc : `|∫_{C_R}| ≤ πR · R/(R⁴ − 4) → 0` — sous-but `arc`
  6. `∫ = 2πi e^(−3) sin 3/4 = (iπ/2) e^(−3) sin 3` — sous-but `value`
- **Aides** : 1 « Ferme en haut : |e^(3iz)| ≤ 1 quand Im z ≥ 0 » · 2 `Res = e^(3iz_k)/(4 z_k²)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` « ∫_ℝ cos(αx)/(x² + 1) dx = » ; distracteurs : π e^α (`c_jordan_alpha_sign`), π (α oublié), π cosh α (`c_eiax_cos`). `open` (2022, 11 pts).
- **Pièges** : `c_eiax_cos`, `c_jordan_alpha_sign`, `c_cos_bounded`, `c_upper_half_lower_pole`.
- **Sous-buts → crédit** : `poles` → `c-res-theorem` ; `formula`, `residues` → `c-res-simple` ; `arc` → `c-arc-estimate` ; `sum`, `value` → `c-int-fourier`.

### `c-int-branch` — Intégrales avec coupure (GM)
- **Année** 15 · **Prérequis** `c-int-rational`, `c-elem-fn` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `c-int-rational` : mêmes résidus de R(z) que pour une intégrale rationnelle ; `c-elem-fn` : z^a avec la coupure, argument dans ]0 ; 2π[.
- **Statut** : fait le 10 novembre 2026 (étape U10). Le facteur 1 − e^(2πia), les résidus écrits avec des exponentielles explicites et I sont des parties `cval`, puis la conclusion en `definite` (quadrature). L3 : décision sur la détermination de l'argument (`c_log_branch`). Gabarits : 1/(1 + x) et 1/(x + 2) avec a < 0 seulement (convergence), 1/(1 + x²) avec a = ±1/2, ±1/3 ; L5 : 1/(1 + x²). Le contour n'est pas dessiné. `open` : 6 points.
- **Intro** : pour ∫₀^∞ x^a R(x) dx (−1 < a < 1, a ∉ ℤ), on prend z^a avec l'argument dans ]0 ; 2π[ (coupure sur ℝ₊) et un contour en trou de serrure. Les deux bords de la coupure donnent (1 − e^(2πia)) ∫₀^∞ x^a R(x) dx = 2πi Σ Res. Exemple : `math: ∫₀^∞ dx/(√x (1 + x))`, `note: a = −1/2` ; `math: (1 − e^(−iπ)) I = 2πi · e^(−iπ/2) = 2π, donc I = π`.
- **Juge** : `complex` (résidus avec z^a, argument dans ]0 ; 2π[) ; `definite` · **Forme finale** : nombre réel exact.
- **Niveaux** :
  - L1 : contour dessiné, facteur (1 − e^(2πia)) donné.
  - L2 : facteur à trouver.
  - L3 : choisir la détermination de l'argument.
  - L4 : libre.
  - L5 : ∫₀^∞ x^(1/3)/(1 + x²) dx = π/√3.
- **Générateur** : a ∈ {−1/2, 1/3, −1/3, 1/2}, R ∈ {1/(1 + x), 1/(1 + x²), 1/(x + 2)}, avec −1 < a < 0 pour 1/(1 + x) et 1/(x + 2) (sinon l'intégrale diverge en +∞) ; valeurs connues (π/sin(πs) et variantes).
- **Corrigé type** (I = ∫₀^∞ dx/(√x (1 + x))) :
  1. `f(z) = z^(−1/2)/(1 + z)`, arg z ∈ ]0 ; 2π[ — sous-but `branch`
  2. bord inférieur : `z^(−1/2) = x^(−1/2) e^(−iπ)` — sous-but `factor`
  3. `(1 − e^(−iπ)) I = 2πi · Res(f, −1) = 2πi · e^(−iπ/2)` — sous-but `residue`
  4. `2I = 2π`, `I = π` — sous-but `value`
- **Aides** : 1 « Trou de serrure ; sur le bord du bas, l'argument vaut 2π » · 2 `(1 − e^(2πia)) I = …` · 3 la ligne 3.
- **Variantes d'examen** : `open` (GM, 6 pts). `mcq` : non.
- **Pièges** : `c_branch_factor`, `c_log_branch`.
- **Sous-buts → crédit** : tous → `c-int-branch`.

### `c-fourier-residues` — Transformée de Fourier calculée par les résidus (GM)
- **Année** 15 · **Prérequis** `c-int-fourier` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Les résidus de e^(−iαz)f et f̂(α) pour α > 0 sont des parties `cval` (variable α) ; f̂ pour tout α, avec |α|, est jugée par `transform`. L2 et L3 : décision « quel demi-plan pour α > 0 ? ». Gabarits : 1/(x² + a²), 1/((x² + a²)(x² + b²)) ; L5 : 1/((x² + 4)(x² + 9)) ou 1/(x⁴ + 4) ; pas de x/(x² + a²)². `open` : la version L4, 5 points.
- **Intro** : f̂(α) = (1/√(2π)) ∫_ℝ f(x) e^(−iαx) dx. Pour α < 0, e^(−iαz) est borné en haut ; pour α > 0, on ferme **en bas**, avec −2πi Σ Res. On traite les deux cas, puis on écrit avec |α|. Exemple : `math: F(1/(1 + x²))(α) = (1/√(2π)) · π e^(−|α|) = √(π/2) e^(−|α|)`, `note: même ligne que la table`.
- **Juge** : `transform` `{kind:'fourier', of, v:'x', s:'α', dir:'forward'}` pour la ligne finale ; `complex` pour les résidus · **Forme finale** : expression en α avec |α|, sans 𝓕.
- **Niveaux** :
  - L1 : cas α > 0 guidé (demi-plan inférieur), α < 0 par parité.
  - L2 : les deux cas.
  - L3 : choisir le demi-plan selon le signe de α.
  - L4 : libre.
  - L5 : F(1/((x² + 4)(x² + 9))) (test 2017) ou F(1/(4 + x⁴)) (plan).
- **Générateur** : f = 1/(x² + a²), 1/((x² + a²)(x² + b²)), x/(x² + a²)² ; a, b ∈ {1, 2, 3}.
- **Corrigé type** (f = 1/((x² + 4)(x² + 9)), α ≥ 0) :
  1. α ≥ 0 : fermer en bas, pôles −2i, −3i — sous-but `half-plane`
  2. `Res(g, −2i) = e^(−2α)/(−4i · 5)`, `Res(g, −3i) = e^(−3α)/(−5 · (−6i))` avec g = e^(−iαz) f — sous-but `residues`
  3. `f̂(α) = (1/√(2π)) · (−2πi)(Res₁ + Res₂) = √(2π)(3e^(−2α) − 2e^(−3α))/60` — sous-but `value`
  4. f paire : `f̂(α) = √(2π)(3e^(−2|α|) − 2e^(−3|α|))/60` — sous-but `all-alpha`
- **Aides** : 1 « α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0 » · 2 `−2πi (Res(g, −2i) + Res(g, −3i))` · 3 la ligne 2.
- **Variantes d'examen** : `open` (GM et test MT 2017, 5 pts). `mcq` : non.
- **Pièges** : `c_fourier_res_sign`, `c_jordan_alpha_sign`.
- **Sous-buts → crédit** : `half-plane`, `residues` → `c-int-fourier` ; `value`, `all-alpha` → `c-fourier-residues`.

### `c-conformal` — Applications conformes (opt.)
- **Année** 15 · **Prérequis** `c-elem-fn` · **Étiquettes** `opt` · **Optionnelle** oui · **Poids d'examen** 0
- **Pourquoi ces prérequis** : `c-elem-fn` : homographies et fonctions élémentaires.
- **Statut** : fait le 10 novembre 2026 (étape U10). Images de points en `cval` (`c_mobius_point` : la division terme à terme) ; L2 : les mêmes calculs, trous plus larges ; L3 : décision « cercle ou droite » et menus ; L4 : l'homographie qui envoie trois points donnés (`cval` en z, une seule fraction) ; L5 et l'examen : QCM d'images de droites et de régions (e^z, z², homographies). L'image d'une droite n'est pas jugée par `geom` (QCM).
- **Intro** : f holomorphe avec f′ ≠ 0 conserve les angles. Une homographie w = (az + b)/(cz + d) envoie cercles et droites sur des cercles et droites ; on la détermine par l'image de trois points. Exemple : `math: w = (z − i)/(z + i)`, `note: envoie le demi-plan Im z > 0 sur le disque |w| < 1` ; `math: z = 0 ↦ −1, z = 1 ↦ −i, z = ∞ ↦ 1`.
- **Juge** : `complex` pour les images de points ; `geom` `{object:'circle'}` pour l'image d'une droite ou d'un cercle · **Forme finale** : la transformation, ou l'image demandée.
- **Niveaux** :
  - L1 : images de trois points à calculer.
  - L2 : image d'une droite (trois points, puis le cercle).
  - L3 : choisir entre « cercle » et « droite » pour l'image.
  - L4 : trouver l'homographie qui envoie trois points donnés.
  - L5 : image d'une région (demi-plan, bande) par e^z ou par une homographie.
- **Générateur** : homographies à coefficients dans {0, ±1, ±i, 2} ; points 0, 1, i, −1, ∞.
- **Corrigé type** (image de l'axe réel par w = (z − i)/(z + i)) :
  1. `0 ↦ −1, 1 ↦ (1 − i)/(1 + i) = −i, ∞ ↦ 1` — sous-but `points`
  2. trois points du cercle unité : l'image est |w| = 1 — sous-but `image`
- **Aides** : 1 « Calcule l'image de trois points » · 2 `(1 − i)/(1 + i) = …` · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (une réponse). `open` : non.
- **Pièges** : `c_mobius_point`.
- **Sous-buts → crédit** : tous → `c-conformal`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `c_log_branch` | notation | E | `c-elem-fn` | `g8-polar` | Log(−1 − i) = ln √2 + 5πi/4 → ln √2 − 3πi/4 | Ajouter ou retirer 2π à Arg pour sortir de ]−π ; π]. | « L'argument principal est dans ]−π ; π] : {got} n'y est pas, il faut {want}. » |
| `c_exp_periodic` | rule | E | `c-equations` | `c-elem-fn` | e^z = i ⟹ z = iπ/2 → z = iπ/2 + 2kπi | Supprimer la famille + 2kπi (une seule solution). | « e^z est périodique de période 2πi : toutes les solutions sont {z0} + 2kπi, k ∈ ℤ. » |
| `c_sqrt_i` | rule | C | `c-equations` | `g8-algebraic` | √(−16) = −4 ou √(z₁z₂) = √z₁ √z₂ → ±4i, et pas de règle de produit | Remplacer √(−a) par −√a, ou appliquer √(ab) = √a√b à des nombres non positifs. | « Dans ℂ, "√" n'a pas de règle de produit : √(−1)·√(−1) ≠ √1. Écris Δ = (4i)², donc les racines carrées de Δ sont ±4i. » (Plan §8 : i sous une racine.) |
| `c_cr_sign` | sign | E | `c-cauchy-riemann` | `c-cauchy-riemann` | u_y = v_x → u_y = −v_x | Comparer u_y à +v_x (ou u_x à −v_y). | « Les équations sont u_x = v_y et u_y = **−** v_x. Avec le bon signe, {got} devient {want}. » |
| `c_conj_not_holo` | rule | E | `c-cauchy-riemann` | `c-cauchy-riemann` | ∮_{\|z\|=1} z̄ dz = 0 → 2πi | `wrongValues` : 0 pour les intégrales de z̄, \|z\|², Re z sur un contour fermé ; « holomorphe » pour z̄. | « z̄ ne vérifie pas Cauchy-Riemann (u_x = 1, v_y = −1) : le théorème de Cauchy ne s'applique pas. » |
| `c_harmonic_const_imag` | rule | E | `c-harmonic-conj` | `c-harmonic-conj` | f = z² + 3z + c avec c ∈ ℂ → c ∈ ℝ | Constante c complexe (partie imaginaire libre). | « Im f = v est imposée : une constante ic changerait v. La constante est réelle. » |
| `c_contour_dz_forgot` | calculus | E | `c-contour-param` | `c-contour-param` | ∫₀¹ t dt = 1/2 → ∫₀¹ t (1 + i) dt | Supprimer γ′(t) de l'intégrande. | « dz = γ′(t) dt = {gp} dt : ce facteur manque. » |
| `c_pole_on_contour` | method | C | `c-cauchy-thm` | `c-cauchy-thm` | ∮_{\|z\|=1} dz/(z(z + 1)) = 2πi → non définie | `wrongValues` : appliquer les résidus en ignorant la singularité située sur Γ. | « −1 est **sur** le cercle \|z\| = 1 : l'intégrale n'est pas définie. » (Corrigé MT/SV 2021.) |
| `c_pole_outside_counted` | method | C | `c-res-theorem` | `c-cauchy-thm` | 2πi(Res₀ + Res₁ + Res₃) → 2πi(Res₀ + Res₁) | Ajouter les résidus des singularités extérieures à Γ. | « {z} est à distance {d} du centre, plus que le rayon {R} : il est dehors et ne compte pas. » (Astuces d'Analyse IV GM ; plan §8.) |
| `c_cos_bounded` | rule | C | `c-arc-estimate` | `c-elem-fn` | « \|cos z\| ≤ 1 sur l'arc » → \|cos(x + iy)\|² = cos²x + sinh²y | Leurre du `blocks` ; `wrongValues` : arc → 0 pour une fonction en cos(αz). | « cos z n'est pas borné sur ℂ : cos(iy) = cosh y → ∞. Utilise e^(iαz), borné dans le demi-plan supérieur. » (Plan §8.) |
| `c_eiax_cos` | method | C | `c-int-fourier` | `c-arc-estimate` | ∮ cos(2z)/(z² + 1) → ∮ e^(2iz)/(z² + 1), puis Re | Remplacer e^(iαz) par cos(αz) dans le contour ; valeur produite π cosh α /… (résidu de cos(αz)/(z² + 1) en i). | « Sur l'arc, cos(αz) contient e^(−iαz), qui explose en haut : l'arc ne tend pas vers 0. » (Même remarque que `c_cos_bounded`.) |
| `c_cauchy_n_factor` | rule | C | `c-cauchy-formula` | `c-cauchy-formula` | f^(n)(z₀) = n!/(2πi) ∮ f/(z − z₀)ⁿ → (z − z₀)^(n+1) | Puissance n au lieu de n + 1, ou n! oublié. | « Pour la dérivée n-ième, la puissance est n + 1 : avec n = {n}, on divise par (z − z₀)^{n+1}. » (Corrigé MT/SV 2021, QCM.) |
| `c_laurent_sign` | sign | C | `c-taylor` | `a1-ser-geo-tele` | 1/(1 + z) = Σ zⁿ → Σ (−1)ⁿ zⁿ | Supprimer le facteur (−1)ⁿ (ou les signes alternés du DL de sin). | « 1/(1 + z) = 1/(1 − (−z)) : la raison est −z, d'où (−1)ⁿ. » (Corrigé MT/SV 2021, QCM.) |
| `c_laurent_wrong_annulus` | method | E | `c-laurent` | `c-laurent` | dans \|z\| > 1 : 1/(z − 1) = −Σ zⁿ → Σ_{n≥1} z^(−n) | Prendre le développement en puissances de z quand il faut celui en 1/z (ou l'inverse). | « Dans {annulus}, \|z\| > {a} : \|z/a\| > 1 et la série en z/a diverge. Écris 1/(z − a) = (1/z) · 1/(1 − a/z). » |
| `c_taylor_radius` | method | E | `c-taylor` | `c-taylor` | rayon de 1/(3 + z²) = 3 → √3 | Prendre \|z₀ − singularité\|² ou la constante au lieu de la distance. | « Le rayon est la distance de {z0} à la singularité la plus proche, ici {pole} : \|{pole}\| = {R}. » |
| `c_removable_as_pole` | method | E | `c-singularities` | `c-singularities` | sin z/z a un pôle en 0 → singularité apparente | Classer « pôle d'ordre m » sans tenir compte du zéro du numérateur. | « sin z/z → 1 quand z → 0 : la singularité est apparente, son résidu est 0. » |
| `c_order_pole_numerator` | method | E | `c-singularities` | `c-singularities` | (e^(z−π) − 1)/sin²z : pôle double → pôle simple | Ordre = ordre du zéro du dénominateur seulement. | « Le numérateur s'annule aussi en π (ordre 1) : l'ordre du pôle est 2 − 1 = 1. » |
| `c_simple_formula_double` | rule | E | `c-res-multiple` | `c-res-simple` | Res(1/(z²(z − 1)), 0) = lim z · f → limite infinie | Appliquer lim (z − z₀) f ou p/q′ en un pôle d'ordre ≥ 2 (q′(z₀) = 0 : `wrongValues` « ∞ » ou un nombre obtenu en simplifiant mal). | « 0 est un pôle **double** : la formule du pôle simple donne une limite infinie. Multiplie par z² puis dérive une fois. » (Plan §8.) |
| `c_multiple_factorial` | calculus | E | `c-res-multiple` | `c-res-multiple` | pôle d'ordre 3 : Res = d²/dz²[…] → (1/2!) d²/dz²[…] | Oublier 1/(m − 1)!, ou écrire 1/m!. | « Pour un pôle d'ordre m = {m}, on dérive m − 1 fois et on divise par (m − 1)! = {f}. » |
| `c_essential_lim` | method | E | `c-res-laurent` | `c-singularities` | Res(sin(1/z), 0) = lim z sin(1/z) → a₋₁ = 1 | Appliquer une formule de pôle à une singularité essentielle. | « 0 est une singularité essentielle (une infinité de puissances négatives) : seul a₋₁ de la série de Laurent donne le résidu. » |
| `c_essential_factor` | calculus | E | `c-res-laurent` | `c-laurent` | Res(sin(1/(2i − 3z)), 2i/3) = 1 → −1/3 | Oublier le facteur −1/3 de 1/(2i − 3z) = −1/(3(z − z₀)). | « 1/(2i − 3z) = −1/(3(z − 2i/3)) : le coefficient de 1/(z − z₀) est −1/3. » |
| `c_residue_2pii` | calculus | E | `c-res-theorem` | `c-res-theorem` | ∮ = Σ Res → 2πi Σ Res | Oublier 2πi, ou mettre πi. | « Le théorème des résidus : ∮ = **2πi** × somme des résidus. » |
| `c_upper_half_lower_pole` | method | E | `c-int-rational` | `c-int-rational` | garder −i au lieu de i → valeur opposée | Prendre les pôles du demi-plan inférieur avec +2πi. | « Le contour ferme en **haut** : seuls les pôles d'Im > 0 sont dedans. » |
| `c_jordan_alpha_sign` | sign | E | `c-int-fourier` | `c-arc-estimate` | α < 0 et fermeture en haut → fermer en bas | Fermer dans le mauvais demi-plan pour le signe de α. | « \|e^(iαz)\| = e^(−α Im z) : avec α = {alpha}, il est borné quand Im z {sign} 0. » |
| `c_trig_sub` | calculus | C | `c-int-trig` | `c-int-trig` | 1/(√5 − sin θ) ↦ 2/(−z² + iz√5 + 1) → 2/(−z² + 2iz√5 + 1) | Oublier dθ = dz/(iz), ou le facteur 2 de sin θ = (z − 1/z)/(2i) en multipliant. | « En multipliant par 2iz, le terme √5 devient 2i√5 z : il manque {missing}. » (Corrigé MT/SV 2021, QCM.) |
| `c_arc_triangle` | rule | E | `c-arc-estimate` | `g8-algebraic` | 1/\|z² + 1\| ≤ 1/(R² + 1) → ≤ 1/(R² − 1) | Majorer 1/\|q\| avec la majoration de \|q\| (sens inverse). | « Pour majorer 1/\|q\|, il faut **minorer** \|q\| : \|z² + 1\| ≥ R² − 1. » |
| `c_branch_factor` | calculus | E | `c-int-branch` | `c-elem-fn` | (1 + e^(2πia)) I → (1 − e^(2πia)) I | Signe du bord inférieur, ou argument π au lieu de 2π. | « Sous la coupure, l'argument vaut 2π, donc z^a = x^a e^(2πia), parcouru dans l'autre sens. » |
| `c_fourier_res_sign` | sign | E | `c-fourier-residues` | `c-int-fourier` | fermer en bas avec +2πi → −2πi | Ne pas changer le signe quand le contour est parcouru dans le sens négatif. | « Le demi-cercle du bas est parcouru dans le sens négatif : ∮ = −2πi Σ Res. » |
| `c_mobius_point` | calculus | E | `c-conformal` | `g8-algebraic` | (1 − i)/(1 + i) = 1 → −i | Division complexe fausse (numérateurs et dénominateurs divisés terme à terme). | « Multiplie par le conjugué : (1 − i)(1 − i)/2 = −i. » |

## Exemples de type examen

**C1. Résidus et intégrale réelle (11 pts, format 2022).** Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ x e^(2ix)/(x⁴ + 4) dx.
- Fonction f(z) = z e^(2iz)/(z⁴ + 4) et contour (segment [−R ; R] + demi-cercle supérieur) : 1 pt.
- Pôles ±1 ± i ; ceux du demi-plan supérieur : 1 + i, −1 + i : 1,5 pt.
- Résidus : Res = e^(2iz_k)/(4z_k²), soit e^(−2)e^(2i)/(8i) et −e^(−2)e^(−2i)/(8i) : 3 pts.
- Somme e^(−2) sin 2/4, puis ∮ = (iπ/2) e^(−2) sin 2 : 1,5 pt.
- Arc : |∫_{C_R}| ≤ πR · R/(R⁴ − 4) → 0, avec |e^(2iz)| ≤ 1 justifié : 3 pts.
- Conclusion ∫_ℝ = (iπ/2) e^(−2) sin 2, donc ∫_ℝ x sin(2x)/(x⁴ + 4) dx = (π/2) e^(−2) sin 2 et la partie en cos vaut 0 : 1 pt.

**C2. Holomorphie, Laurent, résidus (QCM multi et ouvert, format MT/SV 2021 et 2022).**
- QCM multi : « Pour quelles fonctions ∮_{|z|=1} f dz = 0 ? 1/z ; cos z/z² ; 1/(z(z − 1)) ; 1/(z − 3)² ; sin z/z³ » (bonnes : cos z/z², 1/(z − 3)², sin z/z³ ; 1/(z(z − 1)) n'est pas définie). Barème +1/N, −1/M.
- Ouvert (5 pts) : construire f holomorphe avec Im f = 3x²y − y³ + 2y et l'écrire en z (f = z³ + 2z + c, c ∈ ℝ) : Δv = 0 (1 pt), u par CR (2 pts), écriture en z (1,5 pt), constante réelle (0,5 pt).
- Ouvert (4 pts) : pour h(z) = sin(1/(1 − 2z)) en z₀ = 1/2 : nature (essentielle, 1 pt), résidu −1/2 (2 pts), série de Laurent (1 pt).

---

# F. Fourier, Laplace, EDP, distributions

Unité `fourier` · préfixe `f-` · pièges `f_` · Statut : fait le 10 novembre 2026 (étape U10, voir README §17)

**Sources** : Analyse IV MT/SV (examens 2016, 2017, test blanc 2017, juin 2019, juin 2021 et son corrigé d'étudiants, souvenirs d'examen) ; Analyse III MT/SV 2021-22, qui contenait exceptionnellement les séries et la transformée de Fourier (examen blanc, examen du 18.01.2022 et son corrigé avec les « Common mistakes », série de révision, série 13) ; Analyse III MT/SV janvier 2021 et son corrigé ; Analyse IV GC/IN/SC/SIE 2022 (Laplace, intégro-différentielle, chaleur avec Neumann, Laplace dans un demi-plan) ; Analyse IV GM (examens 2015–2016 de P. Metzener ; Sturm-Liouville) ; fiches « Propriétés de la transformée de Fourier » et « … de Laplace » ; formulaires des transformées (Dacorogna et Tanteri p. 118 et 126, et formulaire MT 2021-22) ; Dacorogna et Tanteri, chapitres 14 à 18.

**Notation** :
- Série de Fourier d'une fonction T-périodique, ω = 2π/T : F f(x) = **a₀/2** + Σ_{n≥1} (aₙ cos(nωx) + bₙ sin(nωx)), aₙ = (2/T) ∫₀^T f(x) cos(nωx) dx, bₙ = (2/T) ∫₀^T f(x) sin(nωx) dx. Forme complexe : cₙ = (1/T) ∫₀^T f(x) e^(−inωx) dx ; aₙ = cₙ + c₋ₙ, bₙ = i(cₙ − c₋ₙ), cₙ = (aₙ − ibₙ)/2.
- Parité : f paire ⟹ **bₙ = 0** ; f impaire ⟹ aₙ = 0.
- Séries en sinus et en cosinus de f sur [0 ; L] : F_s f = Σ bₙ sin(nπx/L), bₙ = (2/L) ∫₀^L f sin(nπx/L) dx (prolongement impair, période 2L) ; F_c f = a₀/2 + Σ aₙ cos(nπx/L).
- Dirichlet : f 2L-périodique, C¹ par morceaux : F f(x) = (f(x + 0) + f(x − 0))/2 en tout x.
- Parseval : (2/T) ∫₀^T f² dx = a₀²/2 + Σ (aₙ² + bₙ²) ; forme complexe (1/T) ∫₀^T |f|² = Σ_{n∈ℤ} |cₙ|².
- Transformée de Fourier : pour f continue par morceaux et absolument intégrable, **f̂(α) = F(f)(α) = (1/√(2π)) ∫_ℝ f(y) e^(−iαy) dy** ; inversion f(x) = (1/√(2π)) ∫_ℝ f̂(α) e^(iαx) dα là où f est continue et f̂ intégrable.
- Convolution (f ∗ g)(x) = ∫_ℝ f(t) g(x − t) dt ; **F(f ∗ g) = √(2π) f̂ ĝ**.
- Laplace : **F(z) = L(f)(z) = ∫₀^∞ f(t) e^(−tz) dt**, défini pour **Re z > γ₀** (abscisse de convergence). Inversion par les résidus : si F est rationnelle de degré < 0, f(t) = Σ_k Res(F(z) e^(zt), z_k) pour t > 0.
- Distributions (MT/SV) : D = fonctions C^∞ à support compact ; ⟨T_f, φ⟩ = ∫ f φ ; ⟨δ_a, φ⟩ = φ(a) ; ⟨DT, φ⟩ = −⟨T, φ′⟩ ; ⟨gT, φ⟩ = ⟨T, gφ⟩ ; distributions tempérées et ⟨T̂, φ⟩ = ⟨T, φ̂⟩.

### Tables à embarquer (`js/content/uni/fourier-tables.js`)

Les examens donnent les tables (« Matériel autorisé : les tables de transformées de Fourier et de Laplace »). L'app les affiche dans un panneau « Table » pendant les items `transform`, et le mode examen les ouvre comme `documents: 'tables'`. Chaque ligne a un id stable ; la colonne « ligne » donne le numéro dans chaque formulaire, parce que les corrigés citent les numéros (« ligne 3 au lieu de ligne 7 »). Le formulaire affiché par défaut est celui de MT 2021-22 ; l'autre est une option de l'item (`table: 'dt'`).

**Transformées de Fourier**

| id | f(y) | f̂(α) | ligne MT 2021-22 | ligne Dacorogna-Tanteri (Analyse IV) |
|---|---|---|---|---|
| `F1` | 1 si \|y\| < \|b\|, 0 sinon | √(2/π) · sin(\|b\|α)/α | 1 | 1 |
| `F2` | 1 si b < y < c, 0 sinon | (1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα) | 2 | 2 |
| `F3` | e^(−wy) si y > 0, 0 sinon (w > 0) | (1/√(2π)) · 1/(w + iα) | 3 | 4 |
| `F4` | e^(−wy) si b < y < c, 0 sinon | (1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα) | 4 | 5 (avec a = −w) |
| `F5` | e^(−iwy) si b < y < c, 0 sinon | (1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α) | 5 | 7 (avec a = −w) |
| `F6` | 1/(y² + w²) (w ≠ 0) | √(π/2) · e^(−\|wα\|)/\|w\| | 6 | 3 |
| `F7` | e^(−\|wy\|)/\|w\| (w ≠ 0) | √(2/π) · 1/(α² + w²) | 7 | 10 |
| `F8` | e^(−w²y²) (w ≠ 0) | (1/(√2 \|w\|)) · e^(−α²/(4w²)) | 8 | 8 (avec a = w²) |
| `F9` | y e^(−w²y²) (w ≠ 0) | (−iα/(2√2 \|w\|³)) · e^(−α²/(4w²)) | 9 | 12 |
| `F10` | 4y²/(y² + w²)² (w ≠ 0) | √(2π) · (1/\|w\| − \|α\|) · e^(−\|wα\|) | 10 | 11 |
| `F11` | e^(iay) si \|y\| < b, 0 sinon | √(2/π) · sin(b(α − a))/(α − a) | — | 6 |
| `F12` | sin(ay)/y (a > 0) | √(π/2) si \|α\| < a ; 0 si \|α\| > a | — | 9 |
| `D1` | δ_a | e^(−iaα)/√(2π) | donné dans l'énoncé | id. |
| `D2` | 1 | √(2π) δ | id. | id. |
| `D3` | cos(ay) | √(π/2) (δ_(−a) + δ_a) | id. (indice de 2019) | id. |
| `D4` | sin(ay) | i √(π/2) (δ_(−a) − δ_a) | id. | id. |

**Propriétés de Fourier** (fiche officielle : FP1 à FP7 ; FP8 à FP11 viennent des notes et des indices d'examen, à vérifier avant de les montrer comme « fiche ») :
FP1 linéarité ; FP2 f paire ⟹ f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx ; FP3 f impaire ⟹ f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx ; FP4 F(f^(n))(α) = (iα)ⁿ f̂(α) ; FP5 g(x) = e^(−ibx) f(x) ⟹ ĝ(α) = f̂(α + b) ; FP6 F(f ∗ g) = √(2π) f̂ ĝ ; FP7 Plancherel ∫ f² = ∫ |f̂|² ; FP8 F(f(x + a))(α) = e^(iaα) f̂(α) (indice de l'examen 2021) ; FP9 F(f(ax))(α) = f̂(α/a)/|a| ; FP10 F(x f(x)) = i (f̂)′ ; FP11 F(F f)(x) = f(−x) (réciprocité).

**Transformées de Laplace**

| id | f(t) | F(z) | Re z > |
|---|---|---|---|
| `L1` | 1/α si t ∈ [0 ; α], 0 sinon (α > 0) | (1 − e^(−αz))/(αz) | tout z |
| `L2` | ε(t) = 1 si t ≥ 0 (Heaviside) | 1/z | 0 |
| `L3` | e^(−αt) | 1/(z + α) | −α |
| `L4` | sin(ωt) | ω/(z² + ω²) | 0 |
| `L5` | cos(ωt) | z/(z² + ω²) | 0 |
| `L6` | e^(αt) sin(ωt) | ω/((z − α)² + ω²) | α |
| `L7` | e^(αt) cos(ωt) | (z − α)/((z − α)² + ω²) | α |
| `L8` | tⁿ/n! | 1/z^(n+1) | 0 |
| `L9` | t e^(−αt) | 1/(z + α)² | −α |
| `L10` | cosh(ωt) | z/(z² − ω²) | \|ω\| |
| `L11` | sinh(ωt) | ω/(z² − ω²) | \|ω\| |
| `L12` | e^(αt) cosh(ωt) | (z − α)/((z − α)² − ω²) | α + \|ω\| |
| `L13` | e^(αt) sinh(ωt) | ω/((z − α)² − ω²) | α + \|ω\| |
| `L14` | t cos(ωt) | (z² − ω²)/(z² + ω²)² | 0 |

**Propriétés de Laplace** (fiche officielle LP1 à LP6 ; LP7 utilisé au test blanc 2017, à vérifier) : LP1 linéarité ; LP2 L(f′) = zF − f(0), L(f″) = z²F − zf(0) − f′(0), L(f^(n)) = zⁿF − z^(n−1)f(0) − … − f^(n−1)(0) ; LP3 L(∫₀ᵗ f(s) ds) = F(z)/z ; LP4 g = e^(−bt) f ⟹ L(g)(z) = F(z + b) ; LP5 L(t f(t)) = −F′(z) ; LP6 L(f ∗ g) = F·G avec (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) ds ; LP7 retard : L(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0. Abscisse d'une somme : le maximum des abscisses.

**Prérequis extérieurs** :
`a1-int-parts`, `a1-improper-compare`, `a1-fn-limits`, `a1-ser-geo-tele`, `g1-parity-period`, `g5-reindex`, `g8-polar`, `g0-pfd-general`, `g0-pfd-simple`, `a2-ode-linear1`, `a2-ode-const2`, `a2-laplacian-radial`, `@alg:G-additionner`, `@alg:G-simplifier`, `@alg:F-variable-deux-fois`, `@alg:E-systemes` ; dans ce catalogue : `c-res-multiple`, `c-res-theorem`, `c-arc-estimate`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g0-pfd-general`, `g1-parity-period`, `g5-reindex`, `g8-polar`, `a1-fn-onesided`, `a1-improper-calc`, `a1-int-parts`, `a2-laplacian-radial`, `a2-ode-const2`, `a2-ode-linear1`, `c-arc-estimate`, `c-res-multiple`, `c-res-theorem`.

## Compétences

### `f-coef` — Coefficients de Fourier, parité, a₀ et petits indices
- **Année** 16 · **Prérequis** `a1-int-parts`, `g1-parity-period` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). Familles c·x, c·x², c·|x| et la marche ±c sur ]−π ; π[ (c ∈ {1, 2, 3}) ; au niveau 4, c·x, c·x², c·|x| sur ]−L ; L[ (L ∈ {1, 2}, T = 2L) avec une décision « ω = 2π/T » (`f_period_omega`). Parité et « a₀ à part » sont des décisions (des notes au niveau 1) ; a₀ par `definite` ; aₙ ou bₙ par `equiv` en n (domaine entier, ∫ par quadrature), lignes d'intégration par parties calculées exactement (`fourier-a-kit.js`, valeurs q·π^e·(−1)ⁿˢ/nᵏ) ; puis n = 2k + 1 (`equiv` en k) quand les termes pairs s'annulent. Niveau 5 : p + q cos(mx) + c|x| ou c·x² (indice spécial m par `value`, `f_a0_separate`). Variantes : `mcq` à plusieurs réponses (affirmations sur a₀, aₘ, bₙ), `coef` (aₙ ou bₙ pour un n donné, `value`), `open` (5 points). Pas de famille « ni paire ni impaire » ici (elle est dans `f-dirichlet`) ; |x| est intégré sur [0 ; π] (la quadrature ne passe pas le coin en 0).
- **Intro** : d'abord la période T et la parité : f paire ⟹ bₙ = 0 et aₙ = (4/T)∫₀^{T/2} f cos ; f impaire ⟹ aₙ = 0. a₀ se calcule **à part** (la formule générale contient souvent un 1/n²). Si f contient un polynôme trigonométrique (1 + cos 2x), ses coefficients se lisent, et les indices concernés (a₂) se traitent à part. Exemple : f(x) = x² sur [−π ; π] ; `math: f paire : bₙ = 0` ; `math: a₀ = (2/π)∫₀^π x² dx = 2π²/3` ; `math: aₙ = (2/π)∫₀^π x² cos(nx) dx = 4(−1)ⁿ/n²`.
- **Juge** : `equiv` `{vars:['n'], domain:{n:{int:[1,40]}}}` pour les lignes en n (les ∫ définies sont évaluées par quadrature à chaque n tiré) ; `value` pour a₀ ; une ligne de décision pour la parité · **Forme finale** : a₀, aₙ, bₙ explicites (cas n pair et impair séparés si besoin), sans ∫.
- **Niveaux** :
  - L1 : parité et formules données ; intégrations par parties à trous.
  - L2 : parité à décider ; a₀ à part.
  - L3 : décisions : « paire / impaire / ni l'un ni l'autre », « a₀ à part ? », « intégrer par parties : u = … ».
  - L4 : libre, période T ≠ 2π (f(x) = 2x sur [−1 ; 1[).
  - L5 : f = 1 + cos 2x + |x| sur [−π ; π] (2022), avec a₀, a₂ et les impairs.
- **Générateur** : familles : xᵏ (k ≤ 3) sur ]−π ; π[ ou ]−L ; L[ avec L ∈ {1, 2} ; |x| ; fonctions constantes par morceaux (−1, 1) ; sommes p(x) + trig(x) avec un trig de fréquence 1 à 3 (crée l'indice spécial). Valeurs aₙ, bₙ de la forme c(−1)ⁿ/nᵏ ou c((−1)ⁿ − 1)/(πnᵏ). Gabarits : « Calculer la série de Fourier de f » ; « Donner a₀ et a₃ » (`coef`).
- **Corrigé type** (f = 1 + cos 2x + |x| sur [−π ; π], 2022) :
  1. f est paire : bₙ = 0 — sous-but `parity`
  2. `a₀ = (1/π)∫_{−π}^{π} (1 + cos 2x + |x|) dx = 2 + π` — sous-but `a0`
  3. pour |x| : `ãₙ = (2/π)∫₀^π x cos(nx) dx = 2((−1)ⁿ − 1)/(πn²)` — sous-but `an`
  4. 1 + cos 2x est son propre développement : il ajoute 1 à a₂ — sous-but `special`
  5. `a₂ = 1 + ã₂ = 1 ; a₂ₖ = 0 (k ≥ 2) ; a₂ₖ₊₁ = −4/(π(2k + 1)²)` — sous-but `assemble`
- **Aides** : 1 « Parité d'abord ; a₀ à part ; la partie 1 + cos 2x se lit » · 2 `aₙ = (2/π) ∫₀^π x cos(nx) dx = …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi « Cochez les coefficients non nuls de f » (format examen blanc) ; distracteurs de `f_even_an_zero`, `f_a0_separate`. `coef` « a₃ = ? ». `open` (2022, 5 pts).
- **Pièges** : `f_even_an_zero`, `f_a0_separate`, `f_interval_02pi`, `f_period_omega`.
- **Sous-buts → crédit** : `parity` → `g1-parity-period` ; `a0`, `special`, `assemble` → `f-coef` ; `an` → `a1-int-parts`.

### `f-coef-complex` — Coefficients complexes cₙ d'une somme d'exponentielles
- **Année** 16 · **Prérequis** `f-coef`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-coef` : passage aₙ, bₙ ↔ cₙ ; `g8-polar` : e^(ikx) = cos kx + i sin kx.
- **Statut** : fait le 10 novembre 2026 (étape U10). Polynômes trigonométriques réels : c₀ et deux fréquences k ≤ 7, (aₖ, bₖ) entiers ou demis ; donnés en cos/sin (sens « vers les cₖ ») ou en exponentielles (sens « vers les aₖ, bₖ »). Chaque valeur demandée est une partie du juge `fcomplex` (nouveau, `js/judges/fourier-a-judges.js` : `complex` avec une valeur attendue et une forme finale réduite). Niveau 1 : formules en note ; niveaux 2 à 4 : décision « dans quel sens » (avec `f_coef_complex_convert`) ; niveau 5 : les deux sens dans le même item. Variante `mcq` à plusieurs réponses. La liste « coefficients non nuls » est faite par le QCM, pas par une ligne.
- **Intro** : cos(kx) = (e^(ikx) + e^(−ikx))/2, sin(kx) = (e^(ikx) − e^(−ikx))/(2i). On lit les cₖ sans intégrer. Passage aux réels : aₙ = cₙ + c₋ₙ, bₙ = i(cₙ − c₋ₙ). Exemple (2022) : `math: g = cos x + 3 sin 3x` ; `math: c₁ = c₋₁ = 1/2, c₃ = 3/(2i) = −3i/2, c₋₃ = 3i/2`, `note: les autres sont nuls`.
- **Juge** : `complex` par coefficient ; item `mcq` multi pour « lesquels sont non nuls » · **Forme finale** : liste des cₖ non nuls avec leur valeur.
- **Niveaux** :
  - L1 : formules d'Euler données, coefficients à trous.
  - L2 : lire les cₖ.
  - L3 : choisir le sens de conversion (réels → complexes ou l'inverse).
  - L4 : libre, avec des coefficients complexes (1 − 2i)e^(3ix) + (1 + 2i)e^(−3ix).
  - L5 : convertir dans les deux sens et dire quels aₙ, bₙ sont non nuls (examen blanc 2021).
- **Générateur** : sommes de 2 à 4 termes cos(kx), sin(kx), e^(±ikx) avec k ∈ {1, …, 7} et coefficients dans {1, 2, 3, 1 ± i, 1 ± 2i, 3/2} ; garantir la symétrie c₋ₖ = c̄ₖ pour une fonction réelle.
- **Corrigé type** (f = 5 + (1 − 2i)e^(3ix) + (1 + 2i)e^(−3ix) + (3/2)(e^(7ix) + e^(−7ix))) :
  1. `c₀ = 5, c₃ = 1 − 2i, c₋₃ = 1 + 2i, c₇ = c₋₇ = 3/2` — sous-but `read`
  2. `a₀ = 2c₀ = 10, a₃ = c₃ + c₋₃ = 2, b₃ = i(c₃ − c₋₃) = 4` — sous-but `convert`
  3. `a₇ = 3, b₇ = 0` ; non nuls : a₀, a₃, b₃, a₇ — sous-but `list`
- **Aides** : 1 « aₙ = cₙ + c₋ₙ et bₙ = i(cₙ − c₋ₙ) » · 2 `b₃ = i((1 − 2i) − (1 + 2i)) = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2022, examen blanc) « Les coefficients non nuls sont : c₁, c₋₁, c₃, c₋₃ / … » ; distracteurs de `f_coef_complex_convert`. `open` : non.
- **Pièges** : `f_coef_complex_convert`, `f_a0_separate`.
- **Sous-buts → crédit** : `read`, `convert`, `list` → `f-coef-complex`.

### `f-sine-cosine` — Séries en sinus et en cosinus sur [0 ; L]
- **Année** 16 · **Prérequis** `f-coef` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `f-coef` : même calcul de coefficients, sur le prolongement.
- **Statut** : fait le 10 novembre 2026 (étape U10). Séries en sinus de c·x, c, c·x², c·x(L − x) sur [0 ; L] (L ∈ {π, 1, 2}), c(2πx − x²) et le triangle 2x / 2π − 2x (2019) sur [0 ; π] ; séries en cosinus (≈ 30 % aux niveaux 1 à 4) de c·x, c·x², c·x(L − x) avec a₀ par `definite`. Décisions « quel prolongement » (niveau 3) et « quelle formule » (avec `f_sine_wrong_factor`, `f_interval_02pi`) ; bₙ par `equiv` en n, puis n = 2k + 1. Variantes `mcq` à plusieurs réponses (deux écritures justes, les valeurs des pièges) et `open` (5 points). x cos(x/2) (2016, produit en somme) n'est pas fait.
- **Intro** : F_s f est la série de Fourier du prolongement **impair** de f, 2L-périodique : bₙ = (2/L)∫₀^L f(x) sin(nπx/L) dx. F_c f, celle du prolongement **pair**. On intègre sur [0 ; L] seulement. Exemple : `math: f(x) = x(π − x) sur [0 ; π]` ; `math: bₙ = (2/π)∫₀^π x(π − x) sin(nx) dx = 4(1 − (−1)ⁿ)/(πn³)`, `note: 8/(πn³) si n impair, 0 si n pair`.
- **Juge** : `equiv` `{vars:['n'], domain:{n:{int:[1,40]}}}` · **Forme finale** : bₙ (ou aₙ) explicite, cas pair et impair séparés.
- **Niveaux** :
  - L1 : formule de bₙ donnée, IPP à trous.
  - L2 : formule à écrire (2/L, nπx/L).
  - L3 : décision « prolongement impair (sinus) / pair (cosinus) » selon ce qui est demandé ; choix de u dans l'IPP.
  - L4 : libre ; fonctions par morceaux (2x sur [0 ; π/2], 2π − 2x sur [π/2 ; π], 2019).
  - L5 : F_s de f(x) = −x² + 2πx (2021 et examen blanc), presque toujours en examen MT.
- **Générateur** : f polynôme de degré ≤ 2 sur [0 ; π] ou [0 ; L] (L ∈ {1, 2}) ; fonctions « triangle » (pente ±a) ; x cos(x/2) (2016, produit qui donne des fractions en n) ; constante 1 (série de la condition initiale de l'EDP). Gabarit : « Calculer F_s f » ; « … F_c f ».
- **Corrigé type** (F_s de f(x) = −x² + 2πx sur [0 ; π]) :
  1. `bₙ = (2/π)∫₀^π (−x² + 2πx) sin(nx) dx` — sous-but `formula`
  2. `−(2/π)∫₀^π x² sin(nx) dx = 2π(−1)ⁿ/n + 4((−1)ⁿ − 1)/(πn³)` (deux IPP) — sous-but `ipp`
  3. `4∫₀^π x sin(nx) dx = −4π(−1)ⁿ/n` — sous-but `ipp`
  4. `bₙ = −2π(−1)ⁿ/n − 4((−1)ⁿ − 1)/(πn³)` — sous-but `assemble`
- **Aides** : 1 « Prolongement impair : seulement des bₙ, intégrale sur [0 ; π] avec le facteur 2/π » · 2 `∫ x² sin(nx) dx = −x² cos(nx)/n + (2/n)∫ x cos(nx) dx` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi « bₙ = ? » ; distracteurs de `f_interval_02pi`, IPP avec signe. `open` (2021 et examen blanc, 5 pts sur 9).
- **Pièges** : `f_sine_wrong_factor`, `f_ipp_sign`, `f_interval_02pi`.
- **Sous-buts → crédit** : `formula`, `assemble` → `f-sine-cosine` ; `ipp` → `a1-int-parts`.

### `f-dirichlet` — Dirichlet : valeur aux sauts, puis une somme numérique
- **Année** 16 · **Prérequis** `f-coef`, `a1-fn-onesided`, `g5-reindex` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a1-fn-onesided` : f(x + 0) et f(x − 0).
- **Statut** : fait le 10 novembre 2026 (étape U10). Scénarios : x² en π et en 0, |x| en 0, −x/π (exemple du catalogue) en 0 (Σ 1/(2k − 1)², ou Σ 1/(k − ½)² au niveau 5), la rampe en π, x et la marche en π/2 (Σ (−1)ᵏ/(2k + 1)), et des sauts sans somme (marche en 0, x en π, série en sinus de c en π). F(x₀) par `value` (`f_dirichlet_skip`, `f_sine_endpoint`), le terme en x₀ pour n = 2k ± 1 par `equiv` en k (décision « k ≥ ? » avec `f_sum_reindex`), S par `value`. La continuité est une décision. L'équation de Dirichlet en S est donnée dans l'énoncé de la dernière partie (la ligne « F(x₀) = a₀/2 + Σ … » n'est pas écrite par l'élève). Niveau 5 : série en sinus de c, F_s f(π), puis π/2. Variantes `mcq` à plusieurs réponses (le catalogue dit « une réponse » : le format F est multiple) et `open` (4 points).
- **Intro** : si f est C¹ par morceaux, F f(x) = (f(x + 0) + f(x − 0))/2 partout. On compare donc F f et f point par point (sauts, bords de [0 ; L] pour F_s : le prolongement impair vaut 0 en 0 et en L). Pour une somme numérique, on choisit un x où les cos ou sin deviennent ±1 ou 0, on écrit Dirichlet, on isole la somme. Exemple (2021) : `math: F f(0) = (π + 0)/2 = π/2`, `note: f saute en 0 : on ne prend pas f(0)` ; `math: π/2 = 3π/4 − (2/π) Σ_{n impair} 1/n²`, `note: donc Σ 1/(2k − 1)² = π²/8`.
- **Juge** : `value` pour F f(x₀) (exact) ; `equiv` pour la ligne qui isole la somme ; `value` pour la somme · **Forme finale** : comparaison écrite (F f = f sur … ; en … F f vaut …), puis la somme exacte.
- **Niveaux** :
  - L1 : le point x₀ donné, limites à gauche et à droite à trous.
  - L2 : x₀ à choisir parmi trois.
  - L3 : décision « f est continue en x₀ ? » ; réindexation n = 2k − 1 à choisir.
  - L4 : libre.
  - L5 : comparer F_s f et f sur [0 ; π] (bord compris), puis une somme.
- **Générateur** : réutilise les fonctions et coefficients de `f-coef` et `f-sine-cosine` ; sommes cibles : Σ 1/n², Σ (−1)ⁿ⁺¹/n², Σ 1/(2k + 1)², Σ 1/(k − ½)², Σ (−1)ᵏ/(2k + 1)³. Exclure les x₀ où la série ne donne pas la somme voulue.
- **Corrigé type** (f = −x sur [−π ; 0], π sur ]0 ; π[ ; a₀ = 3π/2, aₙ = −2/(πn²) si n impair, 0 sinon ; bₙ = 1/n ; calculer Σ_{k≥1} 1/(k − ½)²) :
  1. `F f(0) = (f(0 + 0) + f(0 − 0))/2 = (π + 0)/2 = π/2` (Dirichlet, f discontinue en 0) — sous-but `dirichlet`
  2. `F f(0) = 3π/4 − (2/π) Σ_{n impair} 1/n²` (les sinus s'annulent) — sous-but `evaluate`
  3. `n = 2k − 1 : 1/n² = 1/(4(k − ½)²)` — sous-but `reindex`
  4. `π/2 = 3π/4 − (1/(2π)) Σ 1/(k − ½)²`, donc `Σ 1/(k − ½)² = π²/2` — sous-but `solve`
- **Aides** : 1 « Choisis x = 0 ; f y est-elle continue ? » · 2 `F f(0) = (f(0⁺) + f(0⁻))/2 = …` · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (une réponse) « F f(1/2) = 7/8 ? » (série de révision) ; distracteurs de `f_dirichlet_skip`, `f_sine_endpoint`. `open` (2021, 4 pts ; 2019).
- **Pièges** : `f_dirichlet_skip`, `f_sine_endpoint`, `f_sum_reindex`.
- **Sous-buts → crédit** : `dirichlet` → `f-dirichlet` ; `evaluate` → `f-coef` ; `reindex` → `g5-reindex` ; `solve` → `f-dirichlet`.

### `f-parseval` — Parseval et sommes
- **Année** 16 · **Prérequis** `f-coef` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `f-coef` : les aₙ et bₙ à substituer.
- **Statut** : fait le 10 novembre 2026 (étape U10). x → Σ 1/n², x² → Σ 1/n⁴, |x| → Σ 1/(2k + 1)⁴, la marche → Σ 1/(2k + 1)² (f multipliée par c ∈ {1, 2, 3}) ; niveau 5 : x³ → Σ 1/n⁶ (2022). Le membre de gauche G est écrit par l'élève (juge `definite`, valeur de G connue ; `f_parseval_factor`, `_bounds`, `_square`), a₀²/2 (`value`, `f_parseval_a0`), le carré du coefficient (`equiv` en n ou k ; `f_parseval_expand` pour x³), les sommes données substituées (`equiv` en S), puis S (`value`). Niveau 3 : décision « Parseval ou Dirichlet ». Variantes `mcq` à plusieurs réponses et `open` (5 points). Les séries Σ cos(2πnx)/qⁿ (série de révision) ne sont pas faites.
- **Intro** : (2/T) ∫₀^T f² dx = a₀²/2 + Σ (aₙ² + bₙ²), avec les **bornes de la période où f est définie** (]−π ; π[, pas [0 ; 2π] si f est donnée sur ]−π ; π[), le **carré** de f, et le facteur 2/T. Exemple : f(x) = x sur ]−π ; π[, bₙ = 2(−1)ⁿ⁺¹/n ; `math: (1/π)∫_{−π}^{π} x² dx = 2π²/3 = Σ 4/n²`, `note: donc Σ 1/n² = π²/6`.
- **Juge** : `definite` pour le membre intégral ; `equiv` pour le membre série (développement de bₙ²) ; `value` pour la somme · **Forme finale** : somme exacte.
- **Niveaux** :
  - L1 : les deux membres posés, à trous.
  - L2 : le membre intégral à écrire (bornes, facteur, carré).
  - L3 : choisir Parseval ou Dirichlet pour la somme demandée (Σ 1/n⁴ : Parseval avec x² ; Σ 1/n² : les deux).
  - L4 : libre.
  - L5 : Σ 1/n⁶ = π⁶/945 à partir des bₙ de x³ et des sommes Σ 1/n², Σ 1/n⁴ données (2022).
- **Générateur** : fonctions xᵏ (k ≤ 3), |x|, constantes par morceaux, et sommes Σ cos(2πnx)/qⁿ (q ∈ {2, 3}) dont ∫₀¹ f² est une série géométrique (série de révision : 5/4). Les sommes Σ 1/n², Σ 1/n⁴ sont données quand elles servent.
- **Corrigé type** (x³ sur ]−π ; π[, bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³), Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90 donnés) :
  1. `(1/π)∫_{−π}^{π} x⁶ dx = 2π⁶/7` — sous-but `lhs`
  2. `Σ bₙ² = 4π⁴ Σ 1/n² − 48π² Σ 1/n⁴ + 144 Σ 1/n⁶` — sous-but `rhs`
  3. `= 2π⁶/3 − 8π⁶/15 + 144 Σ 1/n⁶ = 2π⁶/15 + 144 Σ 1/n⁶` — sous-but `substitute`
  4. `Σ 1/n⁶ = (2π⁶/7 − 2π⁶/15)/144 = π⁶/945` — sous-but `solve`
- **Aides** : 1 « (2/T)∫ f² = a₀²/2 + Σ(aₙ² + bₙ²), sur la période où f est donnée » · 2 `(1/π)∫_{−π}^{π} x⁶ dx = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (une réponse) « ∫₀¹ f² dx = 5/4 » (série de révision) ; `mcq` multi ; distracteurs de `f_parseval_factor`, `f_parseval_a0`. `open` (2022, 5 pts).
- **Pièges** : `f_parseval_bounds`, `f_parseval_factor`, `f_parseval_square`, `f_parseval_expand`, `f_parseval_a0`.
- **Sous-buts → crédit** : `lhs` → `f-parseval` ; `rhs`, `substitute` → `f-parseval` ; `solve` → `@alg:E-une-etape`.

### `f-coef-relations` — Relations entre coefficients ; dérivation terme à terme
- **Année** 16 · **Prérequis** `f-coef` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Paires f = x → g = m·x², x³ → m·x⁴ (2022), 2x sur [−1 ; 1[ → m·x² (test blanc 2017), m ∈ {1/4, 1/2, 1, 2, 4}. La relation et ses hypothèses sont une décision (« tout recalculer » est juste mais `poor`) ; aₙ(h) puis aₙ(g) par le juge `prob` (valeur attendue en n, domaine entier ; `f_coef_relation_factor`), a₀ par `definite`. La question réciproque (niveaux 3 et 5) est une décision « dériver terme à terme ? » (`f_termwise_deriv`). Variantes `mcq` à plusieurs réponses et `open` (4 points).
- **Intro** : si h est continue, 2π-périodique, C¹ par morceaux, et h′ = f, alors (IPP) aₙ(f) = n bₙ(h) et bₙ(f) = −n aₙ(h), donc aₙ(h) = −bₙ(f)/n et bₙ(h) = aₙ(f)/n ; a₀(h) se calcule à part. On ne dérive terme à terme que la série d'une fonction **continue** périodique. Exemple : `math: x a bₙ = 2(−1)ⁿ⁺¹/n ; h = x²/2 a h′ = x` ; `math: aₙ(x²/2) = −bₙ(x)/n = 2(−1)ⁿ/n²`, `note: donc aₙ(x²) = 4(−1)ⁿ/n²`.
- **Juge** : `equiv` en n (domaine entier) ; décision « dérivation terme à terme permise ? » · **Forme finale** : coefficients de la nouvelle fonction, a₀ compris.
- **Niveaux** :
  - L1 : la relation donnée, à appliquer.
  - L2 : la relation à retrouver par IPP.
  - L3 : décision « intégrer la relation » ou « tout recalculer » (`poor`) ; « dériver terme à terme : oui / non (f discontinue) ».
  - L4 : libre.
  - L5 : du coefficient de 2x sur [−1 ; 1[ à celui de x² (test blanc 2017), avec la question réciproque (« pourrait-on déduire ceux de f de ceux de g ? »).
- **Générateur** : paires (f, h) avec h′ = f : (x, x²/2), (x³, x⁴/4), (2x, x²) sur [−1 ; 1[, (|x|, …) ; la constante multiplicative est tirée dans {1/4, 1/2, 2, 4} (piège du facteur 4).
- **Corrigé type** (h = x⁴/4 sur ]−π ; π[, à partir de x³ dont bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³), 2022) :
  1. h est paire, continue, et h′ = x³ — sous-but `hyp`
  2. `aₙ(h) = −bₙ(x³)/n` (IPP) — sous-but `relation`
  3. `aₙ(x⁴) = 4aₙ(h) = −4bₙ(x³)/n` — sous-but `factor`
  4. `a₀(x⁴) = (2/π)∫₀^π x⁴ dx = 2π⁴/5` — sous-but `a0`
- **Aides** : 1 « Intègre par parties aₙ(h) : la dérivée h′ = f apparaît » · 2 `aₙ(h) = −(1/n) bₙ(…)` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi. `open` (2022, 4 pts ; test blanc 2017).
- **Pièges** : `f_coef_relation_factor`, `f_a0_separate`, `f_termwise_deriv`.
- **Sous-buts → crédit** : `hyp`, `relation`, `factor` → `f-coef-relations` ; `a0` → `f-coef`.

### `f-series-problem` — Problème : série en sinus, Dirichlet, somme numérique
- **Année** 16 · **Prérequis** `f-sine-cosine`, `f-dirichlet` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). Exemple F1 du catalogue : f ∈ {c·x(π − x), c(2πx − x²), triangle}, c ∈ {1, 2, 3}. Niveaux 1 à 3 : une des trois parties ; niveau 4 : le problème entier en un item avec aides ; niveau 5 et `open` : `problem` de 9 points (a : 3 + 1, ou 4 sans séparation pair / impair ; b : 2 ; c : 2 + 1). La comparaison (b) est une décision suivie de F_s f(π) par `value` ; en (c), l'équation de Dirichlet en π/2 est donnée et la somme Σ (−1)ᵏ/(2k + 1) = π/4 est fournie pour 2πx − x². x cos(x/2) (2016) n'est pas fait.
- **Intro** : le problème d'examen le plus fréquent en MT : (a) F_s f ; (b) comparer F_s f et f sur [0 ; π] (Dirichlet, bords compris) ; (c) en déduire une somme numérique.
- **Juge** : `problem` ; parties jugées comme dans `f-sine-cosine` et `f-dirichlet` · **Forme finale** : les trois réponses.
- **Niveaux** :
  - L1 à L3 : les parties une à une.
  - L4 : le problème avec aides.
  - L5 : `problem` sans aide (9 pts).
- **Générateur** : f ∈ {x(π − x), triangle 2x / 2π − 2x (2019), −x² + 2πx (2021), x cos(x/2) (2016)} avec des coefficients multipliés par a ∈ {1, 2, 3} ; la somme cible dépend du point (π/2 en général).
- **Corrigé type** (f(x) = x(π − x) sur [0 ; π]) :
  1. `bₙ = 4(1 − (−1)ⁿ)/(πn³)`, donc `b₂ₖ = 0, b₂ₖ₊₁ = 8/(π(2k + 1)³)` — sous-but `coefficients` (4 pts)
  2. le prolongement impair est continu (f(0) = f(π) = 0) et C¹ par morceaux : `F_s f = f` sur [0 ; π] — sous-but `compare` (2 pts)
  3. `x = π/2 : π²/4 = Σ 8/(π(2k + 1)³) sin((2k + 1)π/2) = (8/π) Σ (−1)ᵏ/(2k + 1)³` — sous-but `evaluate` (2 pts)
  4. `Σ_{k≥0} (−1)ᵏ/(2k + 1)³ = π³/32` — sous-but `solve` (1 pt)
- **Aides** : aucune en L5.
- **Variantes d'examen** : `open` (MT 2016, 2019, 2021, examen blanc 2021 : 9 pts).
- **Pièges** : `f_sine_endpoint`, `f_dirichlet_skip`, `f_sum_reindex`, `f_ipp_sign`.
- **Sous-buts → crédit** : `coefficients` → `f-sine-cosine` ; `compare`, `evaluate`, `solve` → `f-dirichlet` ; l'item → `f-series-problem`.

### `f-ft-direct` — Transformée de Fourier : définition et calcul direct
- **Année** 16 · **Prérequis** `a1-improper-calc`, `a1-int-parts`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-improper-calc` : ∫ sur ℝ calculée comme une limite ; `g8-polar` : e^(−iαy) = cos αy − i sin αy.
- **Statut** : fait le 10 novembre 2026 (étape U10). Gabarits c(b² − x²) et c(b − |x|) sur [−b ; b] (pairs, deux intégrations par parties), c·x (impair, FP3), c·e^(−w|x|) ; les fonctions sans parité (e^(−x) sin x · 1_{x>0}, sin x · 1_[0 ; π]) ne sont pas faites. Parties : la forme par parité (`transform`), l'intégrale (`equiv` en α, cible `no-int`), f̂(α) (`transform`), f̂(0) (`definite`, avec une décision pour `f_ft_alpha_zero`). L1 et L2 : la définition en blocs (`define`, échelle du §16.3) ou le calcul à trous. L5 et `open` : définition (2 pts) puis calcul (3 ou 4 pts). `f_ipp_sign` (partie a) n'est qu'une option du QCM.
- **Intro** : définition à savoir écrire (examens 2021) : f : ℝ → ℝ continue par morceaux et ∫_ℝ |f| < ∞ ; f̂(α) = (1/√(2π)) ∫_ℝ f(y) e^(−iαy) dy. Si f est paire, f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx. α = 0 se traite à part. Exemple : `math: f = e^(−|x|) : f̂(α) = (1/√(2π)) (1/(1 − iα) + 1/(1 + iα))` ; `math: = √(2/π) · 1/(1 + α²)`.
- **Juge** : `blocks` `{mode:'define'}` pour la définition ; `transform` `{kind:'fourier', of, v:'y', s:'α', dir:'forward'}` pour les lignes de calcul (contrôle numérique en 6 valeurs de α, α = 0 compris si l'item le demande) · **Forme finale** : expression en α sans ∫ ni 𝓕 ; f̂(0) donné à part si la formule a un α au dénominateur.
- **Niveaux** :
  - L1 : la définition par blocs (hypothèses, formule) ; un calcul à trous.
  - L2 : choisir FP2 (parité), puis l'IPP à trous.
  - L3 : décision « parité », « table », « calcul direct ».
  - L4 : libre.
  - L5 : définition avec hypothèses + calcul (1 − x² sur [−1 ; 1], série de révision).
- **Générateur** : fonctions à support borné : 1 − x², 1 − |x|, x sur [−1 ; 1], e^(−|x|), e^(−x) sin x · 1_{x>0} (GM 2016), sin x · 1_{[0 ; π]} (GM 2015) ; paramètres entiers.
- **Corrigé type** (f = 1 − x² si |x| ≤ 1, 0 sinon) :
  1. f paire : `f̂(α) = √(2/π) ∫₀¹ (1 − x²) cos(αx) dx` — sous-but `parity`
  2. IPP deux fois (α ≠ 0) : `∫₀¹ (1 − x²) cos(αx) dx = 2(sin α − α cos α)/α³` — sous-but `ipp`
  3. `f̂(α) = 2√(2/π) (sin α − α cos α)/α³` (α ≠ 0) — sous-but `value`
  4. `f̂(0) = √(2/π) · 2/3` — sous-but `zero`
- **Aides** : 1 « f est paire : on peut prendre la forme en cos sur [0 ; ∞[ » · 2 `√(2/π) ∫₀¹ (1 − x²) cos(αx) dx` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi « Cochez les égalités vraies : F(e^(−|x|)) = … ». `open` (2021 : définition 2 pts ; série de révision).
- **Pièges** : `f_ft_norm`, `f_ft_alpha_zero`, `f_ipp_sign`.
- **Sous-buts → crédit** : `parity` → `f-ft-direct` ; `ipp` → `a1-int-parts` ; `value`, `zero` → `f-ft-direct`.

### `f-ft-table` — Transformée de Fourier par la table et les propriétés
- **Année** 16 · **Prérequis** `f-ft-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `f-ft-direct` : définition de f̂ et convention 1/√(2π).
- **Statut** : fait le 10 novembre 2026 (étape U10). Gabarits : carré complété + translation + F8, e^(−w|x − a|) (F7), (x − a)e^(−k(x − a)²) (F9), g′ (FP4), H(x − a)e^(−w(x − a)) (F3) ; inverses au niveau 4 : c/(α² + w²) (F7), e^(−w|α|) (F6), c/(w + iα) (F3). Pas de changement d'échelle, ni de 𝓕(x f), ni de 𝓕((x g)″) (2019). Les lignes avec 𝓕(…) n'ont pas de trous (le noyau ne lit pas 𝓕). La ligne de la table est une décision (L2 à L5) ou une note (L1), pas une citation « F8, w = √3 » vérifiée. L5 et `open` : deux fonctions (7 pts) ou une (3 ou 4 pts). QCM d'examen : 𝓕(g ∗ h)(0) et ĝ.
- **Intro** : on ramène f à une ligne de la table avec les propriétés : linéarité, translation F(f(x − a)) = e^(−iaα) f̂, modulation, dérivée F(f′) = iα f̂, F(x f) = i f̂′, changement d'échelle. Chaque ligne de la table a un **domaine** (« si y > 0 », |w|). Exemple (série de révision) : `math: e^(−3x² + 6x + 6) = e⁹ e^(−3(x − 1)²)` ; `math: F(e^(−3x²)) = e^(−α²/12)/√6`, `note: ligne F8, w² = 3` ; `math: F(f) = e⁹ e^(−iα) e^(−α²/12)/√6`, `note: translation de 1`.
- **Juge** : `transform` `{kind:'fourier', of, v:'x', s:'α', dir:'forward'|'inverse', table:'mt2122'}` ; chaque ligne qui cite une ligne de table (« F8, w = √3 ») est vérifiée · **Forme finale** : expression sans 𝓕 ; pour une inverse, une fonction de x définie **sur tout ℝ** (cas x < 0 compris).
- **Niveaux** :
  - L1 : la ligne de table indiquée, paramètres à trous.
  - L2 : la ligne à choisir parmi 3.
  - L3 : choisir les propriétés dans l'ordre (compléter le carré, translation, table).
  - L4 : libre, inverses comprises (trouver f telle que f̂ = e^(−2|α|) sin 3α… ou 2√2 α² e^(−α²)).
  - L5 : F((x g(x))″) à partir de ĝ (2019), ou F(h) pour h = (x − 1) e^(−5(x − 1)²) (2016).
- **Générateur** : compositions d'une ligne de la table avec 1 ou 2 propriétés : translation a ∈ {±1, ±2}, échelle, multiplication par x, dérivée ; paramètres w ∈ {1, 2, 3, √2} ; inverses construites en appliquant la table à l'envers.
- **Corrigé type** (f(x) = e^(−3x² + 6x + 6)) :
  1. `−3x² + 6x + 6 = −3(x − 1)² + 9` — sous-but `complete-square`
  2. `f(x) = e⁹ g(x − 1)` avec `g(x) = e^(−3x²)` — sous-but `rewrite`
  3. `ĝ(α) = (1/√6) e^(−α²/12)` (F8, w = √3) — sous-but `table`
  4. `f̂(α) = e⁹ e^(−iα) e^(−α²/12)/√6` (translation) — sous-but `property`
- **Aides** : 1 « Complète le carré, puis translation et ligne F8 » · 2 `ĝ(α) = (1/(√2·√3)) e^(−α²/(4·3))` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi (série de révision : F(g ∗ h)(0) pour g = e^(−b|x|), h = e^(−a|x|)) ; distracteurs de `f_table_line`, `f_ft_shift_sign`, `f_sqrt2pi_conv`. `open` (2016, 2017, 2019 : 2 à 4 pts par fonction).
- **Pièges** : `f_table_line`, `f_table_half_line`, `f_abs_dropped`, `f_ft_shift_sign`, `f_ft_deriv_sign`, `f_ft_scale`.
- **Sous-buts → crédit** : `complete-square` → `@alg:H-completer-carre` ; `rewrite`, `table`, `property` → `f-ft-table`.

### `f-ft-eq` — Équations résolues par la transformée de Fourier
- **Année** 16 · **Prérequis** `f-ft-table`, `@alg:F-variable-deux-fois`, `@alg:G-additionner` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). Seulement a·u + b·(f ∗ u) = f avec f = e^(−w|x|) (10 triplets (a, b, w) qui donnent W entier) ; le gabarit avec u″ dans la convolution (2021) n'est pas fait. Parties : f̂ (F7), l'équation transformée puis û isolé (`transform` avec l'inconnue û et le symbole f̂), la fraction simplifiée (`equiv` en α, cible `short` avec le but), le retour en x (`transform`, inverse). Le juge `transform` ne nomme pas une équation transformée fausse : `f_sqrt2pi_conv` et `f_conv_coef_dropped` sont nommés sur la ligne suivante, û = …. `f_no_inverse` et `f_table_half_line` sont des options d'une décision. L5 et `open` : l'exemple F2 (8 pts, définition comprise).
- **Intro** : on transforme les deux membres (linéarité, F(f ∗ u) = √(2π) f̂ û, F(u″) = −α² û), on isole û, on simplifie la fraction, on reconnaît une ligne de la table, on revient en x. On suppose u et ses dérivées intégrables. Exemple (2022) : `math: 2u + 3 f ∗ u = f, f = e^(−|x|)` ; `math: û = f̂/(2 + 3√(2π) f̂) = (1/2) √(2/π)/(α² + 4)`, `note: f̂ = √(2/π)/(1 + α²)` ; `math: u = e^(−2|x|)/4`, `note: ligne F7, w = 2`.
- **Juge** : `transform` `{kind:'fourier', of:'u', v:'x', s:'α'}` pour la ligne transformée de l'équation (l'équation en α doit être équivalente à F(équation)) ; `equiv` `{vars:['α']}` pour isoler et simplifier û ; `transform` `dir:'inverse'` pour le retour · **Forme finale** : u(x) explicite sur tout ℝ, sans 𝓕.
- **Niveaux** :
  - L1 : l'équation transformée à trous (où va √(2π), où va le 3).
  - L2 : isoler û, simplification à trous.
  - L3 : décisions : « appliquer F », « isoler û », « mettre au même dénominateur », « reconnaître la ligne ».
  - L4 : libre.
  - L5 : `problem` avec u″ dans la convolution : −10u + ∫ (9u − 4u″)(t) e^(−(3/2)|x − t|) dt = 4x²/(2π + x²)² (2021) ; la définition de F est demandée en (i).
- **Générateur** : à l'envers : a·u + b·(f ∗ u) = f avec f = e^(−w|x|) donne û = (√(2/π) w/a)/(α² + W²) avec W² = w² + 2bw/a ; on garde (a, b, w) tels que W soit entier : (2, 3, 1) → W = 2 ; (1, 4, 1) → W = 3 ; (1, 3/2, 1) → W = 2 ; (2, 4, 2) → W = √(4 + 8) rejeté. Alors u = (w/(aW)) e^(−W|x|). Gabarit avec u″ : coefficients choisis pour que √(2π) ĝ (b + cα²) soit une constante (b/c = w²), qui simplifie l'équation en û = ĥ/k.
- **Corrigé type** (2u + 3 f ∗ u = f, f = e^(−|x|), 2022) :
  1. `2û + 3√(2π) f̂ û = f̂` — sous-but `transform`
  2. `f̂ = √(2/π)/(1 + α²)` (F7, w = 1) — sous-but `table`
  3. `û = f̂/(2 + 3√(2π) f̂) = √(2/π)/(2(1 + α²) + 6)` — sous-but `isolate`
  4. `= (1/2) √(2/π)/(α² + 4)` — sous-but `simplify`
  5. `u(x) = (1/2) · e^(−2|x|)/2 = e^(−2|x|)/4` (F7, w = 2) — sous-but `inverse`
- **Aides** : 1 « Transforme : la convolution devient √(2π) f̂ û » · 2 `û (2 + 3√(2π) · √(2/π)/(1 + α²)) = …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi (série de révision : « si ŵ(√2) = 2, alors v̂(√2) = 0… ») ; `open` (2022, 2021 : 6 à 8 pts).
- **Pièges** : `f_sqrt2pi_conv`, `f_conv_coef_dropped`, `f_abs_dropped`, `f_table_line`, `f_table_half_line`, `f_no_inverse`, `f_rat_simplify`.
- **Sous-buts → crédit** : `transform` → `f-ft-eq` ; `table` → `f-ft-table` ; `isolate`, `simplify` → `@alg:F-variable-deux-fois` et `@alg:G-additionner` ; `inverse` → `f-ft-table`.

### `f-plancherel` — Plancherel
- **Année** 16 · **Prérequis** `f-ft-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U10). Gabarits F1 (∫ sin²(bα)/α²), F7 (∫ dα/(α² + w²)²), F9 (∫ α² e^(−α²/2), avec ∫ x² e^(−2x²) dx donnée), F6 (dans l'autre sens : ∫ dx/(x² + w²)²). Les intégrales sur ℝ d'une fonction de |x| s'écrivent 2∫₀^∞ (la quadrature du juge `definite` ne converge pas sur ℝ avec un point anguleux) ; la valeur du départ est donnée au juge (`known`). L3 : décision Plancherel ou résidus (les deux justes). L5 : la preuve par f ∗ f̃ en 0 (blocs) ou le calcul sans aide. `open` : 3 pts.
- **Intro** : ∫_ℝ |f(x)|² dx = ∫_ℝ |f̂(α)|² dα (pas de facteur 2π avec cette convention). Sert à calculer une intégrale en α difficile à partir d'une intégrale en x facile. Exemple : `math: f = e^(−|x|) : ∫ e^(−2|x|) dx = 1` ; `math: ∫ (2/π)/(1 + α²)² dα = 1`, `note: donc ∫ dα/(1 + α²)² = π/2`.
- **Juge** : `definite` · **Forme finale** : valeur exacte.
- **Niveaux** :
  - L1 : f et f̂ donnés, les deux membres à trous.
  - L2 : f à reconnaître dans la table.
  - L3 : choisir « Plancherel » ou « résidus » (les deux `good`).
  - L4 : libre.
  - L5 : prouver Plancherel à partir de la convolution (2016 : f ∗ f̃ en 0).
- **Générateur** : intégrales cibles ∫ dα/(α² + w²)², ∫ sin²(bα)/α², ∫ α² e^(−α²/2) ; paires de la table F1, F6, F7, F8, F9.
- **Corrigé type** (∫_ℝ sin²α/α² dα) :
  1. f = 1 sur ]−1 ; 1[ : `f̂ = √(2/π) sin α/α` (F1) — sous-but `table`
  2. `∫ f² = 2` — sous-but `lhs`
  3. `(2/π) ∫ sin²α/α² dα = 2`, donc `∫ sin²α/α² dα = π` — sous-but `solve`
- **Aides** : 1 « Quelle fonction a pour transformée sin α/α ? » · 2 `∫ f² dx = ∫ |√(2/π) sin α/α|² dα` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi ; distracteurs de `f_plancherel_factor`. `open` (2016, 3 pts).
- **Pièges** : `f_plancherel_factor`, `f_parseval_square`.
- **Sous-buts → crédit** : `table` → `f-ft-table` ; `lhs`, `solve` → `f-plancherel`.

### `f-periodic-ode` — EDO périodique par séries de Fourier
- **Année** 16 · **Prérequis** `f-coef-complex` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-coef-complex` : u = Σ cₙe^(int).
- **Statut** : fait le 10 novembre 2026 (étape U10). Opérateurs u′ + au, u″ + ku (k ≠ m²) et u′(t) + b·u(t − π) (fréquence impaire, pour que `f_ode_shift_phase` change la valeur), second membre c₀ + A cos(mt) + B sin(mt). Parties `fcomplex` : cₘ(f), cₘ(u) = cₘ(f)/P(m), c₀(u), puis u assemblée (forme finale réelle, sans i) ; le facteur de u′, u″ ou du retard est une décision, la forme réelle ou complexe une décision du niveau 3. La solution est jugée contre c₀ + cₘe^(imt) + c₋ₘe^(−imt), pas par le juge `ode` (qui ne lit pas le retard). Niveau 5 : comme le niveau 4, sans aide ; « f quelconque » (forme générale) n'est pas demandé. Variante `open` (4 points).
- **Intro** : on cherche u périodique sous la forme Σ cₙ e^(int) ; u′ a pour coefficients in cₙ, u(t − τ) a pour coefficients e^(−inτ) cₙ ; on égale coefficient par coefficient avec ceux du second membre. Exemple : `math: u′ + u = sin t` ; `math: (i + 1) c₁ = 1/(2i)`, `note: n = ±1 seulement` ; `math: u = (sin t − cos t)/2`.
- **Juge** : `complex` pour chaque cₙ ; `ode` `{eq, unknown:'u', v:'t'}` pour la solution (vérifie l'équation) · **Forme finale** : u(t) réelle explicite.
- **Niveaux** :
  - L1 : coefficients du second membre donnés, équation pour cₙ à trous.
  - L2 : équation pour cₙ à écrire.
  - L3 : choisir la forme (réelle ou complexe).
  - L4 : libre, avec retard u(t − π) (série de révision).
  - L5 : solution générale pour f quelconque, puis cas f = 1 + 4 sin 6t.
- **Générateur** : opérateurs u′ + au, u″ + ku (k non carré d'un entier présent dans f), u′ + b u(t − π) ; seconds membres trigonométriques de 1 à 3 fréquences, f(t) = 1 + 4 sin 6t.
- **Corrigé type** (u′ + 2u(t − π) = 1 + 4 sin 6t, 2π-périodique) :
  1. coefficients : `(in + 2(−1)ⁿ) cₙ(u) = cₙ(f)` — sous-but `relation`
  2. `c₀(f) = 1 ⟹ c₀ = 1/2` ; `c₆(f) = −2i ⟹ c₆ = −2i/(2 + 6i) = (−3 − i)/10`, `c₋₆ = c̄₆` — sous-but `coefficients`
  3. `u = 1/2 + 2 Re(c₆ e^(6it)) = 1/2 − (3/5) cos 6t + (1/5) sin 6t` — sous-but `assemble`
- **Aides** : 1 « Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ » · 2 `(6i + 2) c₆ = −2i` · 3 la ligne 2.
- **Variantes d'examen** : `open` (série de révision, format examen, 4 pts). `mcq` : non.
- **Pièges** : `f_ode_shift_phase`, `f_coef_complex_convert`.
- **Sous-buts → crédit** : `relation`, `coefficients`, `assemble` → `f-periodic-ode`.

### `f-sturm-liouville` — Problème de Sturm-Liouville (GM)
- **Année** 16 · **Prérequis** `f-sine-cosine`, `a2-ode-const2` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-sine-cosine` : les solutions sin(nπx/L) donnent une série en sinus ; `a2-ode-const2` : −u″ = λu : équation caractéristique selon le signe de λ.
- **Statut** : fait le 10 novembre 2026 (étape U10). Conditions (D, D), (D, N), (N, D), (N, N) sur [0 ; π] (et [0 ; L], L ∈ {1, 2}, au niveau 4). Les cas λ < 0, λ = 0 (`f_sl_eigen_zero`), λ = k² > 0, la condition au bord et « n ≥ ? » sont des décisions (des notes au niveau 1) ; λₙ par `prob` (valeur attendue en n) ; uₙ par le juge `eigen` (nouveau : −u″ = λₙu et les deux conditions pour six valeurs de n, tout multiple non nul). La solution générale A cos kx + B sin kx est choisie, pas écrite. Niveau 5 (Dirichlet en 0) : −u″ = f sur les fonctions propres, par `ode` avec u(0) et u′(0). Variante `open` (5 ou 6 points).
- **Intro** : −u″ = λu sur ]0 ; L[ avec des conditions aux bords : on cherche les λ pour lesquels il existe u ≠ 0. On traite λ < 0, λ = 0, λ > 0 ; seul λ > 0 donne des solutions pour Dirichlet. Exemple : `math: −u″ = λu, u(0) = 0, u′(π) = 0` ; `math: λₙ = (n + ½)², uₙ = sin((n + ½)x), n ≥ 0`.
- **Juge** : `ode` pour chaque uₙ (vérifie l'équation et les conditions) ; `equiv` en n (domaine entier) pour λₙ · **Forme finale** : λₙ et uₙ, avec les cas λ ≤ 0 écartés.
- **Niveaux** :
  - L1 : cas λ > 0 guidé, condition à trous.
  - L2 : les trois cas, guidés.
  - L3 : choisir la forme de la solution selon le signe de λ.
  - L4 : libre.
  - L5 : valeurs propres, puis résoudre −u″ = f par développement sur les uₙ.
- **Générateur** : conditions (D, D), (D, N), (N, N) sur [0 ; π] ou [0 ; L] ; second membre f trigonométrique.
- **Corrigé type** (−u″ = λu, u(0) = 0, u′(π) = 0) :
  1. λ < 0 et λ = 0 : seulement u = 0 — sous-but `cases`
  2. λ = k² > 0 : `u = A cos kx + B sin kx`, u(0) = 0 donne A = 0 — sous-but `general`
  3. `u′(π) = Bk cos(kπ) = 0 ⟹ k = n + ½` — sous-but `condition`
  4. `λₙ = (n + ½)², uₙ = sin((n + ½)x)` — sous-but `eigen`
- **Aides** : 1 « Trois cas selon le signe de λ » · 2 `cos(kπ) = 0 ⟹ k = …` · 3 la ligne 3.
- **Variantes d'examen** : `open` (GM, 4 à 6 pts).
- **Pièges** : `f_sl_eigen_zero`.
- **Sous-buts → crédit** : tous → `f-sturm-liouville`.

### `f-lap-table` — Transformée de Laplace par la table et les propriétés
- **Année** 16 · **Prérequis** `a1-improper-calc`, `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-improper-calc` : F(z) = ∫₀^∞ f(t)e^(−tz) dt ; `g8-polar` : e^(iωt), cos ωt et sin ωt dans la table.
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 à L3 : deux parties, la parenthèse (ou g) par la table, puis la propriété (décalage LP4 ou −F′ pour t·g, LP5) ; le choix de la ligne et de la propriété sont des décisions (aux niveaux 2 et 3), pas des menus. Le demi-plan est une ligne « Re z > γ₀ » avant F(z), ou sur la même ligne (`halfPlane` du juge `transform`). L4 : décalage, t·g, somme de 2 ou 3 lignes de la table, ou carré à développer ((t² + e^(at))²…). L5 : fonction retardée (LP7) ou carré ; (1 − e^(−t))/t n'est pas fait (il demande ∫ F). `open` : problème de 4 points (un item de niveau 4). QCM d'examen à plusieurs réponses (F(z), demi-plan ; distracteurs `f_lap_shift_sign`, `f_lap_tf_sign`, `f_lap_abscissa`).
- **Intro** : on décompose f en lignes de la table (L1 à L14) et on applique les propriétés : décalage e^(−bt) f ↦ F(z + b), L(t f) = −F′(z), primitive, retard. Chaque ligne a son demi-plan. Exemple (2022) : `math: L(sin ωt) = ω/(z² + ω²)` (L4) ; `math: L(t sin ωt) = −d/dz [ω/(z² + ω²)] = 2ωz/(z² + ω²)²`, `note: LP5`.
- **Juge** : `transform` `{kind:'laplace', of, v:'t', s:'z', dir:'forward'}` (contrôle numérique en 6 valeurs réelles de z > γ₀ + 1) · **Forme finale** : F(z) sans 𝓛, simplifiée, avec son demi-plan (voir `f-lap-abscissa`).
- **Niveaux** :
  - L1 : la ligne et la propriété indiquées, paramètres à trous.
  - L2 : la ligne à choisir.
  - L3 : choisir les propriétés (développer, décaler, dériver).
  - L4 : libre : e^(−2t)(4 cos 3t − 7 sin 5t), (t² + e^(−t))² (test blanc 2017).
  - L5 : fonction retardée e^(3(t−2)) sin(4(t − 2)) pour t ≥ 2 (LP7), ou (1 − e^(−t))/t.
- **Générateur** : combinaisons linéaires de 1 à 3 lignes (L2 à L14) avec ω ∈ {1, 2, 3, 4, 5}, α ∈ {−3, …, 3} ; multiplication par t ou par e^(bt) ; carrés à développer.
- **Corrigé type** (f(t) = e^(−2t)(4 cos 3t − 7 sin 5t)) :
  1. `L(4 cos 3t − 7 sin 5t) = 4z/(z² + 9) − 35/(z² + 25)` (L5, L4) — sous-but `table`
  2. `décalage b = 2 : F(z) = 4(z + 2)/((z + 2)² + 9) − 35/((z + 2)² + 25)` — sous-but `property`
  3. `Re z > −2` — sous-but `abscissa`
- **Aides** : 1 « Transforme d'abord la parenthèse, puis remplace z par z + 2 » · 2 `4·z/(z² + 9) − 7·5/(z² + 25)` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi « L(t sin 3t) = 6z/(z² + 9)² ; Re z > 0 ; … » ; distracteurs de `f_lap_tf_sign`, `f_lap_shift_sign`. `open` (2022, 4 pts ; test blanc 2017, 4 × 2 pts).
- **Pièges** : `f_lap_shift_sign`, `f_lap_tf_sign`, `f_lap_abscissa`.
- **Sous-buts → crédit** : `table`, `property` → `f-lap-table` ; `abscissa` → `f-lap-abscissa`.

### `f-lap-abscissa` — Abscisse de convergence
- **Année** 16 · **Prérequis** `f-lap-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-lap-table` : demi-plan de chaque ligne de la table.
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `value` pour γ₀, avec une ligne « max(… ; …) » des abscisses des termes (ou des parties réelles des pôles). Les lignes de preuve du corrigé type (majoration de |t sin ωt|e^(−γt), divergence pour γ ≤ 0) ne sont pas demandées. L1 : abscisses données en note ; L2 : à lire, décision « maximum / minimum / toujours 0 » ; L3 : décision « par les termes » ou « par les pôles » ; L4 : somme de termes ou F rationnelle (pôles par le juge `complex`, forme `set`, puis γ₀) ; L5 : F rationnelle sans aide, ou un QCM à une réponse. QCM d'examen à plusieurs réponses (`f_lap_abscissa` sur les mauvaises options).
- **Intro** : γ₀ = inf des γ tels que ∫₀^∞ |f(t)| e^(−γt) dt < ∞. Pour une somme, c'est le maximum des abscisses des termes ; e^(αt) déplace de α ; tⁿ ne change rien ; cosh(ωt) donne |ω|. Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles. Exemple : `math: f = (t² + e^(−t))² = t⁴ + 2t² e^(−t) + e^(−2t)` ; `math: abscisses 0, −1, −2 : γ₀ = 0`.
- **Juge** : `value` pour γ₀ ; item `mcq` pour la justification · **Forme finale** : γ₀ et « Re z > γ₀ ».
- **Niveaux** :
  - L1 : abscisses des termes données, le maximum à prendre.
  - L2 : abscisses à lire dans la table.
  - L3 : choisir « par les termes » ou « par les pôles de F ».
  - L4 : libre.
  - L5 : γ₀ de f et de F donnée par résidus (2019 : F = 1/(z⁴ − 2z³ + 2z²), γ₀ = 1).
- **Générateur** : sommes de termes de la table ; F rationnelles à pôles entiers ou a ± bi ; t sin(ωt) avec ω = 0 comme cas limite (f = 0).
- **Corrigé type** (f(t) = t sin(ωt), ω ≠ 0, 2022) :
  1. `|t sin ωt| e^(−γt) ≤ t e^(−γt)`, intégrable pour γ > 0 — sous-but `bound`
  2. pour γ ≤ 0, ∫ |t sin ωt| e^(−γt) dt diverge — sous-but `diverge`
  3. `γ₀ = 0` — sous-but `value`
- **Aides** : 1 « Quelle est l'abscisse de chaque terme ? » · 2 `t sin ωt : γ₀ = …` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi « Les abscisses de convergence possibles sont » (2019). `open` (2022, 1 pt).
- **Pièges** : `f_lap_abscissa`.
- **Sous-buts → crédit** : tous → `f-lap-abscissa`.

### `f-lap-inv-des` — Laplace inverse par éléments simples
- **Année** 16 · **Prérequis** `f-lap-table`, `g0-pfd-general` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `f-lap-table` : reconnaître chaque terme dans la table.
- **Statut** : fait le 10 novembre 2026 (étape U10). La décomposition est une ligne « F(z) = … » du juge `transform` (inverse), pas du juge `equiv` : la cible `partial-fractions` ne connaît que la variable x. Le système des coefficients (lignes 2 et 3 du corrigé type) n'est pas demandé : la décomposition s'écrit directement, sa forme est une décision aux niveaux 2 et 3 (`g0_pfd_form`), puis une ligne « forme de la table » (A(z − a) + Bω) aux niveaux 1 à 4. Gabarits : deux trinômes z² + ω², pôles réels simples, carré complété avec un pôle réel ; L5 : pôle double et trinôme. `open` : problème de 4 points. QCM d'examen à plusieurs réponses (`f_sin_omega_factor`, `f_lap_shift_sign`).
- **Intro** : on décompose F en éléments simples réels, on reconnaît chaque terme dans la table (en complétant le carré si besoin), on additionne. Exemple (test blanc 2017) : `math: (z³ + 4z − 5)/((z² + 4)(z² + 9)) = −1/(z² + 4) + (z + 1)/(z² + 9)` ; `math: f(t) = −½ sin 2t + cos 3t + ⅓ sin 3t`.
- **Juge** : `equiv` `{vars:['z']}` pour la DES ; `transform` `{kind:'laplace', dir:'inverse'}` pour f · **Forme finale** : f(t) réelle explicite.
- **Niveaux** :
  - L1 : forme de la DES donnée, coefficients à trous.
  - L2 : forme à choisir.
  - L3 : décisions « DES », « compléter le carré », « ligne de la table ».
  - L4 : libre.
  - L5 : DES avec pôle double et facteur irréductible.
- **Générateur** : à l'envers : f = somme de 2 ou 3 termes de la table à coefficients entiers ; F = sa transformée réduite au même dénominateur ; rejeter si le numérateur a des coefficients > 20.
- **Corrigé type** (F = (z³ + 4z − 5)/((z² + 4)(z² + 9))) :
  1. `F = (Az + B)/(z² + 4) + (Cz + D)/(z² + 9)` — sous-but `form`
  2. `A + C = 1, B + D = 0, 9A + 4C = 4, 9B + 4D = −5` — sous-but `system`
  3. `A = 0, C = 1, B = −1, D = 1` — sous-but `solve`
  4. `f = −½ sin 2t + cos 3t + ⅓ sin 3t` (L4, L5) — sous-but `inverse`
- **Aides** : 1 « Deux facteurs irréductibles : numérateurs Az + B et Cz + D » · 2 `z³ + 4z − 5 = (Az + B)(z² + 9) + (Cz + D)(z² + 4)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi. `open` (test blanc 2017, 4 pts ; 2019).
- **Pièges** : `f_lap_shift_sign`, `f_sin_omega_factor`.
- **Sous-buts → crédit** : `form`, `system`, `solve` → `g0-pfd-general` ; `inverse` → `f-lap-inv-des`.

### `f-lap-inv-res` — Laplace inverse par les résidus
- **Année** 16 · **Prérequis** `c-res-multiple`, `c-res-theorem` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `c-res-theorem` : f(t) est la somme de tous les résidus de F(z)e^(zt).
- **Statut** : fait le 10 novembre 2026 (étape U10). Pôles par le juge `complex` (forme `set`) ; chaque résidu par un nouveau juge `lapres` (`js/judges/lapres.js`) : une ligne est une fonction de t comparée au résidu en 6 valeurs de t, une ligne qui contient encore z est lue en z = z₀ (après ses d(…, z)), d'où la formule du pôle simple, (z − z₀)F(z)e^(zt), et celle du pôle double, d/dz[(z − z₀)²F(z)e^(zt)] ; la somme par le juge `transform` (inverse). Les résidus sont exacts (décomposition dans ℚ(i)) et le test de la partie les compare aux coefficients de Laurent numériques. L3 : décisions « quelle formule » (`c_simple_formula_double`) et « quels résidus » (`f_lap_conj_pole`). L5 : niveau 4 sans aide ; le contour de Bromwich est dans `f-lap-problem`. γ₀ n'est demandé que dans le QCM. `open` : problème de 5 points.
- **Intro** : pour F rationnelle de degré < 0, f(t) = Σ Res(F(z) e^(zt), z_k), sur **tous** les pôles (les pôles conjugués donnent des termes conjugués). Exemple (2019) : `math: F = 1/(z²(z² − 2z + 2))`, `note: pôles 0 (double), 1 ± i` ; `math: f(t) = (t + 1)/2 − e^t cos t/2`.
- **Juge** : `equiv` `{vars:['t'], complex:true}` pour chaque résidu (fonction de t) ; `transform` `dir:'inverse'` pour f · **Forme finale** : f(t) réelle.
- **Niveaux** :
  - L1 : pôles et ordres donnés, résidus à trous.
  - L2 : pôles à trouver.
  - L3 : choisir la formule de résidu par pôle.
  - L4 : libre.
  - L5 : avec le contour de Bromwich et l'arc (voir `f-lap-problem`).
- **Générateur** : F = 1/(z^m q(z)) avec q de degré 2 à racines a ± bi (a, b ∈ {1, 2}) ou réelles ; F = 1/((z + 1)²(z + 2)) (2021).
- **Corrigé type** (F = 1/(z⁴ − 2z³ + 2z²)) :
  1. `z⁴ − 2z³ + 2z² = z²(z − 1 − i)(z − 1 + i)` — sous-but `poles`
  2. `Res₀ = d/dz [e^(zt)/(z² − 2z + 2)] en 0 = (2t + 2)/4 = (t + 1)/2` — sous-but `residue`
  3. `Res_(1+i) = e^((1+i)t)/((2i)(2i)) = −e^((1+i)t)/4` ; `Res_(1−i) = −e^((1−i)t)/4` — sous-but `residue`
  4. `f(t) = (t + 1)/2 − e^t cos t/2` ; `γ₀ = 1` — sous-but `assemble`
- **Aides** : 1 « f(t) = somme des résidus de F(z)e^(zt), y compris le conjugué » · 2 `Res₀ = (1/1!) d/dz[…]` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi. `open` (2016, 2019, 2021 : 4 à 6 pts).
- **Pièges** : `f_lap_conj_pole`, `c_simple_formula_double`, `f_lap_abscissa`.
- **Sous-buts → crédit** : `poles` → `c-singularities` ; `residue` → `c-res-multiple` ou `c-res-simple` ; `assemble` → `f-lap-inv-res`.

### `f-lap-ode` — EDO avec conditions initiales par Laplace
- **Année** 16 · **Prérequis** `f-lap-inv-des` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Un seul juge, `transform` avec l'inconnue Y, en deux parties (transformer et isoler Y ; décomposer et inverser) ; y est comparée à la solution en 8 points au lieu du juge `ode`. Le juge ne diagnostique pas une ligne d'équation : `f_lap_deriv_ic` est reconnu sur la ligne Y = … (ou y = …) qui suit l'erreur, et par une décision au niveau 3. Gabarits des leçons : racines caractéristiques réelles distinctes, double ou complexes, second membre constant, e^(ct) ou cos ωt, sans résonance. L5 : ordre 3 avec résonance ((z + c)⁴) ou y⁽⁴⁾ − ω⁴y = 0. `open` : problème de 6 points. QCM d'examen à plusieurs réponses.
- **Intro** : on transforme l'équation avec LP2 (les conditions initiales entrent ici), on isole Y(z), on inverse. Exemple (2021) : `math: y″ + 2y′ + y = 1, y(0) = y′(0) = 1` ; `math: Y = (z² + 3z + 1)/(z(z + 1)²) = 1/z + 1/(z + 1)²` ; `math: y = 1 + t e^(−t)`.
- **Juge** : `equiv` `{vars:['z']}` pour l'équation transformée et Y ; `ode` `{eq, unknown:'y', v:'t', ic}` pour la solution · **Forme finale** : y(t) qui vérifie l'équation et les conditions.
- **Niveaux** :
  - L1 : la transformée de y″ à trous.
  - L2 : isoler Y.
  - L3 : choisir « DES » ou « résidus » pour l'inversion.
  - L4 : libre.
  - L5 : ordre 3 ou 4 (y⁽⁴⁾ − 16y = 0, 2016 ; y‴ + 3y″ + 3y′ + y = 2e^(−t), 2017).
- **Générateur** : à l'envers : y = somme de 2 termes de la table ; on calcule le second membre et les conditions ; on garde les seconds membres simples (constante, e^(βt), cos ωt).
- **Corrigé type** (y″ + 2y′ + y = 1, y(0) = y′(0) = 1) :
  1. `z²Y − z − 1 + 2(zY − 1) + Y = 1/z` — sous-but `transform`
  2. `Y(z + 1)² = (z² + 3z + 1)/z` — sous-but `isolate`
  3. `Y = 1/z + 1/(z + 1)²` — sous-but `des`
  4. `y = 1 + t e^(−t)` (L2, L9) ; vérification — sous-but `inverse`
- **Aides** : 1 « L(y″) = z²Y − z y(0) − y′(0) » · 2 `z²Y − z·1 − 1 + 2(zY − 1) + Y = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi. `open` (2021, 2019, 2017 : 5 à 6 pts).
- **Pièges** : `f_lap_deriv_ic`, `f_lap_shift_sign`.
- **Sous-buts → crédit** : `transform` → `f-lap-ode` ; `isolate` → `@alg:F-variable-deux-fois` ; `des` → `g0-pfd-simple` ; `inverse` → `f-lap-inv-des`.

### `f-lap-integro` — Équations intégro-différentielles (GM)
- **Année** 16 · **Prérequis** `f-lap-ode` · **Étiquettes** `GM` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-lap-ode` : même méthode : transformer, isoler, inverser.
- **Statut** : fait le 10 novembre 2026 (étape U10). Trois parties : le noyau (juge `transform`, ℒ(e^(at))), l'équation transformée et U (juge `transform` avec l'inconnue U), l'inverse. L'équation intégrale est contrôlée numériquement en 6 valeurs de t (`integroResidual` de `fourier-c-kit.js`, dans le générateur et le test de la partie). L2 et L3 : décisions « quel noyau » (`f_lap_integro_kernel`) et « LP6 ou LP3 ». L5 et `open` : problème de 3 points.
- **Intro** : ∫₀ᵗ u(s) g(t − s) ds = (u ∗ g)(t) se transforme en U(z) G(z) (LP6). Exemple (2022) : `math: u′ + 2u + 20 ∫₀ᵗ u(s) e^(2(t−s)) ds = 10 e^(2t), u(0) = 1` ; `math: zU − 1 + 2U + 20U/(z − 2) = 10/(z − 2)` ; `math: U = (z + 8)/(z² + 16), u = cos 4t + 2 sin 4t`.
- **Juge** : comme `f-lap-ode` ; `ode` remplacé par un contrôle numérique de l'équation intégrale en 6 valeurs de t · **Forme finale** : u(t) explicite.
- **Niveaux** :
  - L1 : le noyau g(t) = e^(2t) identifié, sa transformée à trous.
  - L2 : identifier le noyau.
  - L3 : choisir LP6.
  - L4 : libre.
  - L5 : problème complet (3 pts, 2022).
- **Générateur** : à l'envers : u = A cos ωt + B sin ωt ; noyau e^(at) ; coefficient c tel que (z − a)(z + b) + c = z² + ω².
- **Corrigé type** : les trois lignes de l'intro, puis `u = cos 4t + 2 sin 4t` (sous-buts `kernel`, `transform`, `isolate`, `inverse`).
- **Aides** : 1 « L'intégrale est une convolution » · 2 `L(e^(2t)) = 1/(z − 2)` · 3 la deuxième ligne.
- **Variantes d'examen** : `open` (GC 2022, 3 pts).
- **Pièges** : `f_lap_integro_kernel`, `f_lap_deriv_ic`.
- **Sous-buts → crédit** : tous → `f-lap-integro`.

### `f-lap-problem` — Problème : EDO par Laplace, puis inverse par les résidus
- **Année** 16 · **Prérequis** `f-lap-ode`, `f-lap-inv-res`, `c-arc-estimate` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). L1 à L4 : un item `lines` en quatre parties (transformée et Y, résidu simple, résidu double, somme), l'arc de Bromwich étant une décision (`c_arc_triangle`, et l'estimation ML insuffisante). L5 et `open` : `problem` de 10 points en trois parties : lignes (transformée et Y : 4 points, car une ligne d'équation ne peut pas finir une partie du juge `transform` ; résidus : 1 + 2), blocs de l'arc avec un leurre `c_arc_triangle` (2 points), y(t) jugée par `ode` avec les conditions initiales (1 point). L'estimation de l'arc passe par le lemme de Jordan (voir la correction de la ligne 4).
- **Intro** : le problème complet : transformer, isoler Y, inverser par résidus en justifiant (contour de Bromwich : droite Re z = γ > γ₀ fermée à gauche par un arc, dont l'intégrale tend vers 0), vérifier.
- **Juge** : `problem` ; parties comme `f-lap-ode`, `f-lap-inv-res`, `c-arc-estimate` · **Forme finale** : y(t) vérifiée.
- **Niveaux** :
  - L1 à L3 : les parties séparées.
  - L4 : problème avec aides.
  - L5 : `problem` sans aide (10 pts).
- **Générateur** : à l'envers : y = e^(−at) + c t e^(−bt) avec un second membre résonnant (pôle double) ; a, b ∈ {1, 2, 3} distincts.
- **Corrigé type** (y″ + 3y′ + 2y = 2e^(−t), y(0) = 1, y′(0) = 0) :
  1. `z²Y − z + 3(zY − 1) + 2Y = 2/(z + 1)` — sous-but `transform` (2 pts)
  2. `Y = (z² + 4z + 5)/((z + 1)²(z + 2))` — sous-but `isolate` (2 pts)
  3. `Res_(−2) = e^(−2t)` ; `Res_(−1) = d/dz[(z² + 4z + 5)e^(zt)/(z + 2)] en −1 = 2t e^(−t)` — sous-but `residues` (3 pts)
  4. arc gauche z = γ + Re^(iθ), θ ∈ [π/2 ; 3π/2] : |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R ; la longueur πR seule ne suffit pas (πR · C/R ne tend pas vers 0), mais le lemme de Jordan ∫ e^(tR cos θ) dθ ≤ π/(tR) donne une borne en 1/R : l'intégrale tend vers 0 pour t > 0 — sous-but `arc` (2 pts)
  5. `y = e^(−2t) + 2t e^(−t)`, y(0) = 1, y′(0) = 0 — sous-but `check` (1 pt)
- **Aides** : aucune en L5.
- **Variantes d'examen** : `open` (2021, 2019 : 8 à 10 pts).
- **Pièges** : `f_lap_deriv_ic`, `c_simple_formula_double`, `f_lap_conj_pole`, `c_arc_triangle`.
- **Sous-buts → crédit** : `transform`, `isolate` → `f-lap-ode` ; `residues` → `f-lap-inv-res` ; `arc` → `c-arc-estimate` ; `check` → `f-lap-problem`.

### `f-heat-sep` — Équation de la chaleur par séparation des variables
- **Année** 16 · **Prérequis** `f-sine-cosine`, `a2-ode-linear1` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Statut** : fait le 10 novembre 2026 (étape U10). Les lignes sont des grandeurs nommées (juge `prob` avec variables, comparées par `equivalent` à la référence) : les modes Xₙ(x) (en x et n entier), le taux λₙ (en n ; la ligne « EDO de chaque coefficient » est λₙ, ou A(t) = ∫₀ᵗ a pour un coefficient a(t)), puis u(x, t) (en x et t ∈ [0 ; ½]). Le juge `ode` n'a pas de mode EDP : `fourier-d-pde.js` vérifie numériquement que chaque u de référence satisfait l'EDP, les conditions aux bords et la condition initiale (test de la partie). Conditions initiales trigonométriques de 2 ou 3 modes aux niveaux 1 à 4 (Dirichlet ou Neumann sur ]0 ; π[, ]0 ; 1[, ]0 ; 2[, coefficient k = 1 ou 2, terme −cu) ; L4 : Neumann avec −cu (GC 2022) ou a(t) (2019) ; L5 et `open` (6 points) : condition initiale 1, x(π − x), x ou π − x (série en sinus : l'intégrale Iₙ par `equiv` jusqu'à une forme sans ∫, puis bₙ(0) = (2/L)Iₙ, puis u en série). Décisions « sinus ou cosinus », « mode n = 0 ? » (L3), « condition initiale déjà développée ? ». Le crédit `initial` → `f-sine-cosine` n'est donné que par les items à série (d'où un `prereqWhy`). `mcq` multi : u juste, limite en t → ∞ ou EDO du mode, contre u avec e^(−nt), des sinus pour Neumann.
- **Intro** : u = X(x) T(t) ; les conditions aux bords choisissent les modes : Dirichlet → sin(nπx/L), Neumann → cos(nπx/L) (avec n = 0). Chaque coefficient vérifie une EDO en t : bₙ′ = −(nπ/L)² bₙ. La condition initiale donne bₙ(0) (série en sinus ou cosinus). Exemple : `math: u_t = u_xx, u(0, t) = u(π, t) = 0, u(x, 0) = 3 sin x − sin 4x` ; `math: u = 3e^(−t) sin x − e^(−16t) sin 4x`.
- **Juge** : `ode` pour chaque bₙ(t) ; `equiv` `{vars:['x','t']}` (somme tronquée à 40 termes) pour u ; contrôle numérique de l'EDP et des conditions · **Forme finale** : u(x, t) explicite (somme finie ou série).
- **Niveaux** :
  - L1 : modes donnés, bₙ(t) à trous.
  - L2 : modes à choisir selon les conditions.
  - L3 : décisions « sinus ou cosinus », « mode n = 0 ? », « condition initiale déjà développée ? ».
  - L4 : libre, avec terme −cu (Neumann, GC 2022) ou coefficient en t (2 + sin t + 3t², 2019).
  - L5 : condition initiale non trigonométrique (série en sinus à calculer).
- **Générateur** : conditions initiales trigonométriques (2 ou 3 modes) ou polynomiales (1, x(π − x)) ; intervalles ]0 ; π[, ]0 ; 1[, ]0 ; 2[ ; termes ±cu ; coefficient a(t) > 0 polynomial ou trigonométrique.
- **Corrigé type** (u_t = u_xx − cu sur ]0 ; 2[, u_x(0, t) = u_x(2, t) = 0, u(x, 0) = −3 + π cos(πx) − 2 cos(5πx/2), GC 2022) :
  1. Neumann : modes cos(nπx/2), n ≥ 0 — sous-but `modes`
  2. `aₙ′ = −((nπ/2)² + c) aₙ` — sous-but `ode`
  3. `a₀/2 = −3, a₂(0) = π, a₅(0) = −2`, les autres nuls — sous-but `initial`
  4. `u = −3e^(−ct) + π e^(−(π² + c)t) cos(πx) − 2 e^(−(25π²/4 + c)t) cos(5πx/2)` — sous-but `assemble`
- **Aides** : 1 « Neumann : des cosinus, n = 0 compris » · 2 `aₙ(t) = aₙ(0) e^(−((nπ/2)² + c)t)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi. `open` (2016, 2017, 2019, 2022 : 6 pts).
- **Pièges** : `f_heat_rate`, `f_neumann_sine`, `f_heat_bc_coef`.
- **Sous-buts → crédit** : `modes` → `f-heat-sep` ; `ode` → `a2-ode-linear1` ; `initial` → `f-sine-cosine` ; `assemble` → `f-heat-sep`.

### `f-heat-source` — Problème : chaleur avec terme source
- **Année** 16 · **Prérequis** `f-heat-sep` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U10). Grandeurs nommées (juge `prob` avec variables) : Iₙ (`equiv` jusqu'à une forme sans ∫) et bₙ(0) (série en sinus), β_k (source), λₙ (EDO bₙ′ + λₙbₙ = βₙ), bₙ(t) pour n ≠ k (en n et t), b_k(t), puis u en série. Sources s·sin(kx), k ∈ {1, 2, 3}, s ∈ {1, 2, 3} sur ]0 ; π[, ou sin(πx), sin(2πx) sur ]0 ; 1[ ; conditions initiales 1, x(π − x), x(1 − x). L1 : β, λₙ et le mode forcé (b_k(0) donné) ; L2 : λₙ, la série de la condition initiale et les modes libres ; L3 : tout sauf u ; L4 : la chaîne entière avec aides ; L5 et `open` : `problem` de 8 points (F4 : 1 + 1 pour la série, 1 source, 1 EDO, 1,5 + 1,5 pour les modes, 1 pour u). Vérification numérique de u (EDP, bords, condition initiale) dans le test de la partie.
- **Intro** : on développe aussi le terme source sur les modes : bₙ′ + n²bₙ = βₙ, avec bₙ(t) = bₙ(0) e^(−n²t) + (βₙ/n²)(1 − e^(−n²t)). Exemple : `math: u_t − u_xx = sin 2x, u(0, t) = u(π, t) = 0, u(x, 0) = 1`.
- **Juge** : `problem` ; `ode` par mode ; `equiv` pour u · **Forme finale** : u(x, t) explicite.
- **Niveaux** :
  - L1 à L3 : parties séparées (série de la condition initiale, EDO par mode).
  - L4 : problème avec aides.
  - L5 : `problem` sans aide (8 pts).
- **Générateur** : source sin(kx) avec k ∈ {1, 2, 3} ou sin(2πx) sur ]0 ; 1[ (2021) ; condition initiale 1 ou x(π − x).
- **Corrigé type** :
  1. `1 = Σ bₙ(0) sin(nx)` avec `bₙ(0) = 2(1 − (−1)ⁿ)/(nπ)` : 4/(nπ) si n impair, 0 sinon — sous-but `initial` (2 pts)
  2. source : β₂ = 1, les autres nuls — sous-but `source` (1 pt)
  3. `bₙ′ + n² bₙ = βₙ` — sous-but `ode` (1 pt)
  4. n impair : `bₙ = 4e^(−n²t)/(nπ)` ; n = 2 : `b₂ = (1 − e^(−4t))/4` ; autres : 0 — sous-but `solve` (3 pts)
  5. `u = Σ_k 4e^(−(2k+1)²t) sin((2k + 1)x)/((2k + 1)π) + (1 − e^(−4t)) sin 2x/4` — sous-but `assemble` (1 pt)
- **Aides** : aucune en L5.
- **Variantes d'examen** : `open` (MT/SV 2021, 6 à 8 pts).
- **Pièges** : `f_heat_source_steady`, `f_heat_rate`, `f_heat_bc_coef`.
- **Sous-buts → crédit** : `initial` → `f-sine-cosine` ; `source`, `ode`, `solve` → `f-heat-source` ; `assemble` → `f-heat-sep`.

### `f-wave` — Équation des ondes ; d'Alembert par Fourier en x
- **Année** 16 · **Prérequis** `f-heat-sep`, `f-ft-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-heat-sep` : séparation des variables sur ]0 ; L[ ; `f-ft-table` : transformée en x (FP8).
- **Statut** : fait le 10 novembre 2026 (étape U10). Grandeurs nommées (juge `prob` avec variables). Sur ℝ : c, puis ûₜₜ en α et û (ûₜₜ = −c²α²û), puis û(α, t) = û₀(α)cos(cαt) avec u₀ ∈ {e^(−x²), 1/(1 + x²), e^(−|x|)} (lignes F8, F6, F7 de la table, jointe à l'énoncé), puis d'Alembert ; la décision « ℱ(u_xx) = ? » porte `f_ft_deriv_sign`. Sur ]0 ; π[ avec Dirichlet : ωₙ = cn, puis b_p(t), b_q(t), puis u. L1 : intervalle, L2 : ℝ, L3 et L4 : l'un ou l'autre (décision « séparation ou Fourier » au L3) ; L5 : `problem` (un QCM à une réponse sur û, puis l'intervalle avec u_t(x, 0) ≠ 0), au lieu du QCM multi des leçons. `open` : l'intervalle, 6 points. `mcq` multi : les affirmations de 2021 (EDO transformée, û, d'Alembert) contre c pour c², ¼ pour ½ et le signe de (iα)².
- **Intro** : sur ℝ, u_tt = c²u_xx : la transformée en x donne û_tt + c²α² û = 0, donc û = û₀(α) cos(cαt) si u_t(x, 0) = 0, puis u = (u₀(x + ct) + u₀(x − ct))/2 (FP8). Sur ]0 ; L[ avec Dirichlet : modes sin(nπx/L), bₙ″ + (cnπ/L)² bₙ = 0. Exemple (2021) : `math: u_tt − ¼ u_xx = 0` ; `math: û_tt + (α²/4) û = 0, û = û₀ cos(αt/2)` ; `math: u = (u₀(x + t/2) + u₀(x − t/2))/2`.
- **Juge** : `ode` pour û(α, t) ; `equiv` pour u · **Forme finale** : u(x, t).
- **Niveaux** :
  - L1 : EDO en t à trous.
  - L2 : transformer l'EDP.
  - L3 : choisir « Fourier en x » (ℝ) ou « séparation » (intervalle).
  - L4 : libre.
  - L5 : QCM multi (2021) puis cas u_t(x, 0) ≠ 0 sur un intervalle.
- **Générateur** : c ∈ {1/2, 1, 2, 3} ; sur intervalle : u(x, 0) et u_t(x, 0) à 1 ou 2 modes.
- **Corrigé type** (u_tt = u_xx sur ]0 ; π[, Dirichlet, u(x, 0) = sin 2x, u_t(x, 0) = 3 sin x) :
  1. modes sin(nx), `bₙ″ + n² bₙ = 0` — sous-but `modes`
  2. `b₂ = cos 2t` ; `b₁ = 3 sin t` — sous-but `solve`
  3. `u = cos 2t sin 2x + 3 sin t sin x` — sous-but `assemble`
- **Aides** : 1 « Chaque mode est un oscillateur » · 2 `b₁(0) = 0, b₁′(0) = 3` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi (2021). `open` (GM 2015–2016, 6 pts).
- **Pièges** : `f_wave_factor`, `f_ft_deriv_sign`.
- **Sous-buts → crédit** : tous → `f-wave`.

### `f-laplace-eq` — Équation de Laplace dans un disque, dans un demi-plan
- **Année** 16 · **Prérequis** `f-heat-sep`, `f-ft-table`, `a2-laplacian-radial` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-heat-sep` : séparation des variables ; `f-ft-table` : demi-plan : transformée de Fourier en y ; `a2-laplacian-radial` : laplacien en polaires dans le disque.
- **Statut** : fait le 10 novembre 2026 (étape U10). Grandeurs nommées (juge `prob` avec variables). Disque unité : Rₙ(r) = rⁿ (décision rⁿ ou r⁻ⁿ), u(r, θ), puis u(x, y) développé (à partir du L3) ; bord m + a cos pθ + b sin qθ, p, q ≤ 3 ; L5 : bord sin³θ ou cos³θ (+ constante), linéarisé par deux parties b₁, b₃ (ou a₁, a₃). Demi-plan x > 0 (GC 2022) : ûₓₓ = α²û, ĝ par le juge `transform` (F6, bord A/(y² + w²), w ∈ {1, 2, 3}), la décision « solution bornée » (`f_half_plane_abs`), û(x, α), puis u par F6 avec w = x + w₀ ; la table est jointe à l'énoncé. Bord en F7 non tiré (l'inverse de e^(−|α|x)/(α² + w²) n'est pas dans la table). `open` : le demi-plan, 4 points. Δu = 0 et le bord sont vérifiés numériquement dans le test de la partie.
- **Intro** : disque unité : u(r, θ) = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ), les coefficients venant de u(1, θ). Demi-plan x > 0 : Fourier en y, û_xx − α²û = 0, la solution bornée est û = û(0, α) e^(−|α|x). Exemple (GC 2022) : `math: u(0, y) = 2/(y² + 4)` ; `math: û = √(π/2) e^(−(x + 2)|α|)` ; `math: u = (x + 2)/(y² + (x + 2)²)`, `note: F6 avec w = x + 2`.
- **Juge** : `equiv` `{vars:['x','y']}` ; contrôle numérique de Δu = 0 et du bord · **Forme finale** : u explicite.
- **Niveaux** :
  - L1 : forme de la solution donnée.
  - L2 : coefficients à lire sur le bord.
  - L3 : choisir e^(−|α|x) (borné) plutôt que e^(|α|x).
  - L4 : libre.
  - L5 : bord en sin³θ (linéariser d'abord).
- **Générateur** : disque : bord trigonométrique de degré ≤ 3 ; demi-plan : bord F6 ou F7 avec w ∈ {1, 2, 3}.
- **Corrigé type** (Δu = 0 dans le disque unité, u(1, θ) = 1 + 3 cos 2θ) :
  1. forme `u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ)` — sous-but `form`
  2. `a₀/2 = 1, a₂ = 3` — sous-but `coefficients`
  3. `u = 1 + 3r² cos 2θ = 1 + 3(x² − y²)` — sous-but `assemble`
- **Aides** : 1 « Le bord se lit comme une série de Fourier en θ » · 2 `u = 1 + 3 r^… cos 2θ` · 3 la ligne 3.
- **Variantes d'examen** : `open` (GC 2022, 4 pts).
- **Pièges** : `f_half_plane_abs`.
- **Sous-buts → crédit** : tous → `f-laplace-eq`.

### `f-distrib-def` — Distributions : ⟨T_f, φ⟩, δ_a et f·δ_a (MT/SV)
- **Année** 16 · **Prérequis** `a1-improper-calc` · **Étiquettes** `MT/SV` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-improper-calc` : ⟨T_f, φ⟩ = ∫ fφ sur ℝ.
- **Statut** : fait le 10 novembre 2026 (étape U10). Nouveau juge `distrib` (`js/judges/distrib.js`) : chaque membre d'une ligne est comparé sur 6 fonctions test (des gaussiennes fois des polynômes, pas des bosses à support compact). Gabarits : ⟨T_f + g δ_a, φ⟩ pour f en morceaux (kx puis m/x ; k puis e^(−wx)), et la preuve g δ_a = g(a) δ_a. Les lignes avec ⟨ ⟩ n'ont pas de trous (le noyau ne lit pas les crochets). L5 : enchaîné avec la dérivée (`f-distrib-deriv`). `open` : 3 pts (le catalogue dit 2 : le plan `ba4-analyse4` demande au moins 3).
- **Intro** : ⟨T_f, φ⟩ = ∫ f φ ; ⟨δ_a, φ⟩ = φ(a) ; ⟨g T, φ⟩ = ⟨T, g φ⟩, donc g δ_a = g(a) δ_a. Exemple (2019) : f = 0 (x < 0), 2x (0 ≤ x ≤ 1), 1/x (x > 1) ; `math: ⟨T_f + δ₁, φ⟩ = ∫₀¹ 2x φ(x) dx + ∫₁^∞ φ(x)/x dx + φ(1)`.
- **Juge** : `equiv` avec une fonction test : l'expression est évaluée sur 8 fonctions φ tirées (gaussiennes fois polynômes, bosses C^∞) · **Forme finale** : expression en φ sans crochet.
- **Niveaux** :
  - L1 : intégrales découpées, bornes à trous.
  - L2 : découpage à faire.
  - L3 : choisir la règle (définition, produit, dérivée).
  - L4 : libre ; prouver f δ_a = f(a) δ_a.
  - L5 : enchaîner avec `f-distrib-deriv`.
- **Générateur** : fonctions par morceaux à 2 ou 3 morceaux (polynômes, 1/x, e^(−x)) ; points a ∈ {0, 1, 2}.
- **Corrigé type** (prouver x² δ₁ = δ₁) :
  1. `⟨x² δ₁, φ⟩ = ⟨δ₁, x² φ⟩` — sous-but `definition`
  2. `= 1² φ(1) = φ(1) = ⟨δ₁, φ⟩` — sous-but `evaluate`
- **Aides** : 1 « Le produit passe sur la fonction test » · 2 `⟨δ₁, x²φ⟩ = …` · 3 la ligne 2.
- **Variantes d'examen** : `mcq` multi. `open` (2019, 2 pts).
- **Pièges** : `f_fdelta`.
- **Sous-buts → crédit** : tous → `f-distrib-def`.

### `f-distrib-deriv` — Dérivée au sens des distributions (MT/SV)
- **Année** 16 · **Prérequis** `f-distrib-def`, `a1-int-parts` · **Étiquettes** `MT/SV` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-distrib-def` : ⟨T, φ⟩ et δ_a.
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `distrib`. Gabarits : H(t)e^(−wt) (2021), kx puis m/x (2019), k puis e^(−wx), l'indicatrice c·1_[a ; b] ; pas |x| (D|x| = sgn). L3 : décision « par la définition » ou « par la formule des sauts » (les deux justes). L5 et `open` : un problème de 3 pts (L5 : la fonction de 2019).
- **Intro** : ⟨DT, φ⟩ = −⟨T, φ′⟩. Pour f C¹ par morceaux : D T_f = T_(f′) + Σ (f(a + 0) − f(a − 0)) δ_a. Exemple (2021) : `math: f = e^(−t) pour t > 0, 0 sinon` ; `math: ⟨Df, φ⟩ = −∫₀^∞ e^(−t) φ′ dt = φ(0) − ∫₀^∞ e^(−t) φ dt` ; `math: Df = −f + δ`.
- **Juge** : `equiv` avec fonctions test (comme `f-distrib-def`) · **Forme finale** : T_(g) + Σ cδ_a.
- **Niveaux** :
  - L1 : IPP à trous.
  - L2 : IPP seule.
  - L3 : choisir « par la définition » ou « par la formule des sauts ».
  - L4 : libre.
  - L5 : 2019 : D T_f = T_(f′) − δ₁ pour la fonction 0 / 2x / 1/x.
- **Générateur** : fonctions par morceaux avec 1 ou 2 sauts de hauteur entière ; |x| (D|x| = sgn), Heaviside.
- **Corrigé type** (f de 2019) :
  1. `⟨DT_f, φ⟩ = −∫₀¹ 2x φ′ dx − ∫₁^∞ φ′/x dx` — sous-but `definition`
  2. IPP : `= −2φ(1) + ∫₀¹ 2φ dx + φ(1) − ∫₁^∞ φ/x² dx` — sous-but `ipp`
  3. `DT_f = T_(f′) − δ₁` avec f′ = 2 sur ]0 ; 1[, −1/x² sur ]1 ; ∞[ — sous-but `conclude`
- **Aides** : 1 « Saut en 1 : de 2 à 1, hauteur −1 » · 2 `DT_f = T_(f′) + (1 − 2) δ₁` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` multi (2021 : Df = −f + δ / f / f + δ / −f). `open` (2017, 2019 : 3 pts).
- **Pièges** : `f_distrib_jump`, `f_distrib_sign`.
- **Sous-buts → crédit** : `definition`, `conclude` → `f-distrib-deriv` ; `ipp` → `a1-int-parts`.

### `f-distrib-eq` — Équations avec δ ; transformée de Fourier de cos (MT/SV)
- **Année** 16 · **Prérequis** `f-distrib-deriv`, `f-ft-table` · **Étiquettes** `MT/SV` · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `f-distrib-deriv` : dérivées avec les δ des sauts ; `f-ft-table` : tables de Fourier D1 à D4.
- **Statut** : fait le 10 novembre 2026 (étape U10). Juge `distrib` en mode équation (⟨Ly, φ⟩ = ⟨y, L*φ⟩ sur les fonctions test, constantes tirées 3 fois) pour l'essai et la solution générale, en mode distribution pour la dérivée ; `transform` avec l'inconnue ŷ pour la voie de Fourier. Gabarits : y′ + ay = δ_b, y″ + ω²y = δ (solution fondamentale), y″ − ω²y = δ (Fourier) ; L5 et `open` : y″ − ω²y = δ + 1 (2016) ou un gabarit sans aide. La transformée de cos et de g₁ ∗ g₂ (2019) n'est pas faite.
- **Intro** : y′ + y = δ a pour solution y = H(t) e^(−t) (+ C e^(−t)) ; y″ + y = δ : y = H(x) sin x. Avec les tables D1 à D4 : F(cos x) = √(π/2)(δ₋₁ + δ₁). Exemple (2019) : `math: g₁ = e^(−|x|), g₂ = cos x` ; `math: F(g₁ ∗ g₂) = √(2π) · √(2/π)/(1 + α²) · √(π/2)(δ₋₁ + δ₁)` ; `math: = √(π/2)(δ₋₁ + δ₁) = F(g₂)`, `note: (1/(1 + α²)) δ_(±1) = ½ δ_(±1)`.
- **Juge** : `equiv` avec fonctions test ; `ode` au sens des distributions pour les solutions (vérifie DT + T = δ sur les fonctions test) · **Forme finale** : solution explicite.
- **Niveaux** :
  - L1 : solution proposée, vérification à trous.
  - L2 : dériver H(t) e^(−t).
  - L3 : choisir « solution fondamentale » ou « Fourier ».
  - L4 : libre.
  - L5 : y″ − 4y = δ + 1 (2016) : y = −e^(−2|x|)/4 − 1/4.
- **Générateur** : opérateurs y′ + ay, y″ + ω²y, y″ − ω²y ; seconds membres δ, δ_a, δ + 1.
- **Corrigé type** (y′ + y = δ) :
  1. essai `y = H(t) e^(−t)` — sous-but `ansatz`
  2. `Dy = −H e^(−t) + e^0 δ = −y + δ` — sous-but `derivative`
  3. `y′ + y = δ` ; solutions `H(t) e^(−t) + C e^(−t)` — sous-but `conclude`
- **Aides** : 1 « Essaie H(t) e^(−t) » · 2 `D(H e^(−t)) = … + δ` · 3 la ligne 2.
- **Variantes d'examen** : `open` (2016, 2017, 2019 : 2 à 4 pts).
- **Pièges** : `f_distrib_jump`, `f_fdelta`, `f_ft_delta_const`.
- **Sous-buts → crédit** : tous → `f-distrib-eq`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `f_even_an_zero` | rule | C | `f-coef` | `g1-parity-period` | f paire ⟹ aₙ = 0 → bₙ = 0 | Annuler les aₙ au lieu des bₙ (ou l'inverse pour f impaire). | « f paire : f(x) sin(nx) est impaire, son intégrale est nulle : ce sont les **bₙ** qui valent 0. » (Corrigé 2022.) |
| `f_a0_separate` | calculus | C | `f-coef` | `f-coef` | a₀ = formule aₙ en n = 0 ; a₂ de cos 2x oublié → a₀ et a₂ à part | Remplacer n par 0 dans la formule générale (division par 0 ou valeur fausse) ; oublier l'apport du polynôme trigonométrique à a₂. | « La formule de aₙ a été obtenue pour n ≥ 1 : a₀ se calcule à part. Le terme cos 2x ajoute {c} à a₂. » (Corrigé 2022.) |
| `f_interval_02pi` | notation | C | `f-coef` | `f-coef` | \|x\| sur [0 ; 2π] → \|x\| sur [−π ; π] | Intégrer la formule de f sur [0 ; 2π] au lieu de la période donnée. | « f = \|x\| est donnée sur [−π ; π] puis prolongée : sur [π ; 2π], f(x) = 2π − x, pas x. » (Corrigé 2022.) |
| `f_period_omega` | notation | E | `f-coef` | `f-coef` | période 2 : cos(nx) → cos(nπx) | Garder cos(nx) quand T ≠ 2π. | « Avec T = {T}, ω = 2π/T = {omega} : les modes sont cos(nωx). » |
| `f_coef_complex_convert` | rule | E | `f-coef-complex` | `f-coef-complex` | bₙ = cₙ − c₋ₙ → bₙ = i(cₙ − c₋ₙ) | Oublier le facteur i ou l'échanger avec aₙ. | « cₙ = (aₙ − ibₙ)/2 donne bₙ = i(cₙ − c₋ₙ). » |
| `f_sine_wrong_factor` | calculus | E | `f-sine-cosine` | `f-sine-cosine` | bₙ = (1/π)∫₀^π → (2/π)∫₀^π | Facteur 1/L au lieu de 2/L. | « Sur [0 ; L], le prolongement impair double l'intégrale : bₙ = (2/L)∫₀^L. » |
| `f_ipp_sign` | sign | E | `f-sine-cosine` | `a1-int-parts` | ∫ x sin nx = x cos nx/n + … → −x cos nx/n + … | Signe du terme tout intégré dans une IPP. | « La primitive de sin(nx) est −cos(nx)/n. » |
| `f_dirichlet_skip` | method | C | `f-dirichlet` | `f-dirichlet` | F f(0) = f(0) = 0 → (f(0⁺) + f(0⁻))/2 = π/2 | Remplacer F f(x₀) par f(x₀) en un point de discontinuité. | « f saute en {x0} : Dirichlet donne la moyenne des limites, {mean}. » (Corrigé 2021 : « étape à ne surtout pas ignorer ».) |
| `f_sine_endpoint` | method | C | `f-dirichlet` | `f-dirichlet` | F_s f(π) = f(π) = π² → 0 | Prendre f(L) aux bords pour une série en sinus. | « Le prolongement impair et 2π-périodique vaut 0 en 0 et en π : F_s f(π) = 0 ≠ f(π). » (Corrigé 2021.) |
| `f_sum_reindex` | calculus | E | `f-dirichlet` | `g5-reindex` | n = 2k − 1 avec k ≥ 0 → k ≥ 1 | Décaler les bornes lors du changement d'indice. | « Avec n = 2k − 1, n = 1 correspond à k = 1. » |
| `f_parseval_bounds` | notation | C | `f-parseval` | `f-parseval` | ∫₀^{2π} x⁶ → ∫_{−π}^{π} x⁶ | Intégrer sur [0 ; 2π] la formule donnée sur ]−π ; π[. | « f est donnée sur ]−π ; π[ : c'est sur cette période qu'on intègre. » (Corrigé 2022.) |
| `f_parseval_factor` | calculus | C | `f-parseval` | `f-parseval` | ∫ f² = Σ → (2/T)∫ f² = Σ | Supprimer le facteur 2/T. | « Avec T = {T}, le membre de gauche est (2/T)∫ f² = {want}. » (Corrigé 2022.) |
| `f_parseval_square` | calculus | C | `f-parseval` | `f-parseval` | ∫ f → ∫ f² ; Σ bₙ → Σ bₙ² | Oublier le carré dans un des membres. | « Parseval porte sur les **carrés** : f² et aₙ², bₙ². » (Corrigé 2022.) |
| `f_parseval_expand` | calculus | C | `f-parseval` | `@alg:C-identites` | (2π²/n − 12/n³)² = 4π⁴/n² − 144/n⁶ → + double produit | Développer (a − b)² en a² − b². | « (a − b)² = a² − 2ab + b² : il manque −48π²/n⁴. » (Corrigé 2022 : calcul de bₙ² faux.) |
| `f_parseval_a0` | calculus | E | `f-parseval` | `f-parseval` | a₀² → a₀²/2 | Utiliser a₀² au lieu de a₀²/2. | « Avec la convention a₀/2, le terme constant de Parseval est a₀²/2. » |
| `f_coef_relation_factor` | calculus | C | `f-coef-relations` | `f-coef-relations` | aₙ(x⁴) = −bₙ(x³)/n → −4bₙ(x³)/n | Oublier la constante multiplicative entre h et la fonction voulue. | « Tu as les coefficients de x⁴/4 ; ceux de x⁴ sont 4 fois plus grands. » (Corrigé 2022.) |
| `f_termwise_deriv` | method | E | `f-coef-relations` | `f-coef-relations` | dériver terme à terme la série de x (discontinue) | Accepter la dérivation terme à terme d'une série de fonction discontinue. | « Le prolongement de {f} saute en ±π : la série dérivée ne converge pas vers f′. » |
| `f_ft_norm` | notation | E | `f-ft-direct` | `f-ft-direct` | f̂ = ∫ f e^(−iαx) → (1/√(2π))∫ | Supprimer 1/√(2π) ou le remplacer par 1/(2π). | « Dans ce cours, f̂ = (1/√(2π))∫ f e^(−iαx) dx. » |
| `f_ft_alpha_zero` | calculus | E | `f-ft-direct` | `f-ft-direct` | f̂(0) = formule en α = 0 (division par 0) → calcul direct | Évaluer la formule générale en α = 0. | « La formule contient α³ au dénominateur : f̂(0) = (1/√(2π))∫ f = {want}. » |
| `f_sqrt2pi_conv` | calculus | C | `f-ft-eq` | `f-ft-table` | F(f ∗ u) = f̂ û → √(2π) f̂ û | Supprimer √(2π) dans la ligne transformée. | « Avec la convention 1/√(2π), F(f ∗ g) = √(2π) f̂ ĝ. » (Corrigé 2022 ; plan §8.) |
| `f_conv_coef_dropped` | calculus | C | `f-ft-eq` | `@alg:C-reduire` | 2û + √(2π) f̂ û → 2û + 3√(2π) f̂ û | Perdre le coefficient numérique devant la convolution. | « Le 3 devant f ∗ u reste devant sa transformée. » (Corrigé 2022.) |
| `f_abs_dropped` | notation | C | `f-ft-eq` | `f-ft-table` | u = e^(−2x)/4 → e^(−2\|x\|)/4 | Remplacer \|x\| par x dans le résultat d'une ligne paire. | « La ligne F7 donne e^(−w\|y\|) : sans la valeur absolue, ta fonction explose pour x < 0. » (Corrigé 2022 : erreur la plus fréquente.) |
| `f_table_line` | method | C | `f-ft-table` | `f-ft-table` | ligne 3 (e^(−wy), y > 0) au lieu de ligne 7 (e^(−\|wy\|)) | Appliquer la ligne voisine : F3 au lieu de F7, F6 au lieu de F7, F1 au lieu de F2. | « Ta transformée {got} n'est pas paire en α ; celle d'une fonction paire l'est. C'est la ligne {want}. » (Corrigé 2022.) |
| `f_table_half_line` | method | C | `f-ft-eq` | `f-ft-table` | u = e^(−wx) partout → e^(−wx) si x > 0, 0 sinon | Oublier le « 0 sinon » d'une ligne à support demi-droite. | « La ligne F3 décrit une fonction nulle pour x < 0 : écris les deux cas. » (Corrigé 2022.) |
| `f_no_inverse` | method | C | `f-ft-eq` | `f-ft-table` | réponse û(α) = … → u(x) = … | Arrêter à û (ligne finale contenant encore α). | « On demande u(x) : reviens en x avec la table. » (Corrigé 2022.) Le juge renvoie `stay`. |
| `f_rat_simplify` | calculus | C | `f-ft-eq` | `@alg:G-additionner` | 2 + 6/(1 + α²) = (2α² + 7)/(1 + α²) → (2α² + 8)/(1 + α²) ; 1/(2α² + 8) = ½/(α² + 8) → ½/(α² + 4) | Ajouter un entier au numérateur sans multiplier par le dénominateur ; mettre en facteur sur un seul terme. | « 2 = 2(1 + α²)/(1 + α²) ; et 2α² + 8 = 2(α² + 4). » (Corrigé 2022 : erreurs de calcul fréquentes.) |
| `f_ft_shift_sign` | sign | E | `f-ft-table` | `f-ft-table` | F(g(x − 1)) = e^(iα) ĝ → e^(−iα) ĝ | Signe de l'exponentielle de translation. | « Décaler de +a à droite multiplie par e^(−iaα). » |
| `f_ft_deriv_sign` | sign | E | `f-ft-table` | `f-ft-table` | F(u″) = α² û → −α² û | Oublier i² = −1, ou écrire −iα pour la dérivée première. | « F(f′) = iα f̂, donc F(f″) = (iα)² f̂ = −α² f̂. » |
| `f_ft_scale` | calculus | E | `f-ft-table` | `f-ft-table` | e^(−3x²) : w = 3 → w = √3 | Lire w au lieu de w² dans une ligne en w²y². | « La ligne F8 est e^(−w²y²) : ici w² = 3. » |
| `f_plancherel_factor` | calculus | E | `f-plancherel` | `f-plancherel` | ∫ f² = 2π ∫ \|f̂\|² → ∫ f² = ∫ \|f̂\|² | Ajouter un facteur 2π ou 1/(2π). | « Avec la convention 1/√(2π), Plancherel n'a pas de facteur. » |
| `f_ode_shift_phase` | calculus | E | `f-periodic-ode` | `f-coef-complex` | u(t − π) ↦ cₙ → (−1)ⁿ cₙ | Ignorer le facteur e^(−inπ). | « Décaler de π multiplie cₙ par e^(−inπ) = (−1)ⁿ. » |
| `f_sl_eigen_zero` | method | E | `f-sturm-liouville` | `f-sturm-liouville` | λ = 0 oublié (Neumann) ou retenu à tort (Dirichlet) | Ajouter ou retirer le cas λ = 0. | « Pour λ = 0, u = A + Bx : vérifie les conditions aux bords. » |
| `f_lap_abscissa` | notation | C | `f-lap-table` | `f-lap-abscissa` | L(e^(2t)) = 1/(z − 2) sans domaine → Re z > 2 | Ligne finale sans demi-plan, ou Re z > 0 pour tout terme. | « La transformée n'existe que pour Re z > {g0}. » (Plan §8.) Le juge renvoie `stay`. |
| `f_lap_shift_sign` | sign | E | `f-lap-table` | `f-lap-table` | e^(−2t) f ↦ F(z − 2) → F(z + 2) | Décalage dans le mauvais sens. | « e^(−bt) f(t) a pour transformée F(z + b). » |
| `f_lap_tf_sign` | sign | E | `f-lap-table` | `f-lap-table` | L(t f) = F′ → −F′ | Oublier le signe moins. | « L(t f) = −F′(z). » |
| `f_sin_omega_factor` | calculus | E | `f-lap-inv-des` | `f-lap-table` | 1/(z² + 4) ↦ sin 2t → ½ sin 2t | Oublier de diviser par ω. | « L(sin ωt) = ω/(z² + ω²) : 1/(z² + 4) = ½ · 2/(z² + 4). » |
| `f_lap_conj_pole` | method | E | `f-lap-inv-res` | `c-res-theorem` | Res en 1 + i seulement → les deux pôles conjugués | Oublier le résidu du pôle conjugué (résultat complexe). | « Ton f(t) n'est pas réel : le pôle conjugué {zbar} donne le terme conjugué. » |
| `f_lap_deriv_ic` | calculus | E | `f-lap-ode` | `f-lap-table` | L(y″) = z²Y − y(0) − zy′(0) → z²Y − zy(0) − y′(0) | Échanger y(0) et y′(0), ou les oublier. | « L(y″) = z²Y − z y(0) − y′(0). » |
| `f_lap_integro_kernel` | sign | E | `f-lap-integro` | `f-lap-table` | L(e^(2t)) = 1/(z + 2) → 1/(z − 2) | Signe du noyau exponentiel. | « e^(2t) donne 1/(z − 2), avec Re z > 2. » |
| `f_heat_rate` | calculus | E | `f-heat-sep` | `f-heat-sep` | e^(−nt) → e^(−(nπ/L)²t) | Exposant linéaire en n, ou sans (π/L)². | « Le mode n décroît comme e^(−(nπ/L)² t). » |
| `f_heat_bc_coef` | calculus | E | `f-heat-sep` | `f-sine-cosine` | bₙ(0) = (1/L)∫ → (2/L)∫ | Facteur de la série en sinus de la condition initiale. | Voir `f_sine_wrong_factor`. |
| `f_neumann_sine` | method | E | `f-heat-sep` | `f-heat-sep` | Neumann avec sin(nπx/L) → cos(nπx/L) | Choisir les sinus pour u_x = 0 aux bords. | « u_x = 0 aux bords : ce sont les cosinus qui vérifient cette condition. » |
| `f_heat_source_steady` | method | E | `f-heat-source` | `f-heat-source` | b₂ = 1/4 → (1 − e^(−4t))/4 | Prendre seulement la solution stationnaire, sans la condition initiale du mode. | « b₂(0) = 0 : la partie stationnaire 1/4 doit être corrigée par −e^(−4t)/4. » |
| `f_wave_factor` | calculus | C | `f-wave` | `f-wave` | û_tt + α² û = 0 → + (α²/4) û ; u = (…)/4 → (…)/2 | Oublier c² ou mettre un facteur 1/4 dans la formule de d'Alembert. | « Le coefficient ¼ devant u_xx donne c = ½. » (Corrigé MT/SV 2021.) |
| `f_half_plane_abs` | method | E | `f-laplace-eq` | `f-laplace-eq` | û = A e^(\|α\|x) + B e^(−\|α\|x) gardé → B e^(−\|α\|x) | Garder la solution non bornée. | « e^(\|α\|x) explose quand x → ∞ : il faut A = 0. » |
| `f_distrib_jump` | rule | C | `f-distrib-deriv` | `f-distrib-deriv` | Df = −f → −f + δ | Oublier les δ des sauts. | « f saute de {h} en {a} : la dérivée contient {h}δ_{a}. » (Options du QCM MT/SV 2021.) |
| `f_distrib_sign` | sign | E | `f-distrib-deriv` | `f-distrib-deriv` | ⟨DT, φ⟩ = ⟨T, φ′⟩ → −⟨T, φ′⟩ | Oublier le signe moins. | « ⟨DT, φ⟩ = −⟨T, φ′⟩. » |
| `f_fdelta` | rule | E | `f-distrib-def` | `f-distrib-def` | f δ_a = f(0) δ_a ou f(x) δ_a → f(a) δ_a | Évaluer en 0 au lieu de a, ou ne pas évaluer. | « ⟨f δ_a, φ⟩ = f(a)φ(a). » |
| `f_ft_delta_const` | notation | E | `f-distrib-eq` | `f-ft-direct` | F(δ) = 1 → 1/√(2π) | Oublier 1/√(2π). | « Avec cette convention, F(δ) = 1/√(2π). » |

## Exemples de type examen

Format `ba4-analyse4` : 135 min, tables de transformées autorisées ; QCM à plusieurs réponses puis 3 questions ouvertes.

**F1. Série en sinus, Dirichlet, somme (9 pts).** f(x) = x(π − x) sur [0 ; π].
- (a) F_s f : formule (1 pt), IPP (2 pts), bₙ = 8/(πn³) si n impair, 0 sinon (1 pt).
- (b) Comparer F_s f et f sur [0 ; π] : prolongement impair continu et C¹ par morceaux, donc égalité partout, bords compris (2 pts).
- (c) En x = π/2 : Σ_{k≥0} (−1)ᵏ/(2k + 1)³ = π³/32 (évaluation 2 pts, résultat 1 pt).

**F2. Équation par la transformée de Fourier (8 pts).** (i) Définition de F avec hypothèses (2 pts). (ii) Trouver u : u + 4 (f ∗ u) = f, f = e^(−|x|).
- Transformée de l'équation avec √(2π) : 2 pts ; f̂ = √(2/π)/(1 + α²) : 1 pt.
- û = √(2/π)/(α² + 9) : 2 pts.
- u = e^(−3|x|)/3 (ligne F7, w = 3, sur tout ℝ) : 1 pt.

**F3. Laplace puis résidus (10 pts).** y″ + 3y′ + 2y = 2e^(−t), y(0) = 1, y′(0) = 0.
- Transformée : 2 pts ; Y = (z² + 4z + 5)/((z + 1)²(z + 2)) : 2 pts.
- Résidus : Res_(−2) = e^(−2t) (1 pt), Res_(−1) = 2t e^(−t) (2 pts).
- Arc de Bromwich → 0 : 2 pts ; y = e^(−2t) + 2t e^(−t) et vérification : 1 pt.

**F4. Chaleur avec terme source (8 pts).** u_t − u_xx = sin 2x sur ]0 ; π[, u(0, t) = u(π, t) = 0, u(x, 0) = 1.
- Série de la condition initiale : 2 pts ; EDO par mode : 1 pt ; source : 1 pt.
- bₙ(t) (n impair et n = 2) : 3 pts ; u(x, t) : 1 pt.
