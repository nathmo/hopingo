# Catalogue G, partie 1 : G9, G0, G1, G2, G3, G5

Extensions du §16 utilisées : §16.1 complexes partout (`solset` sur ℂ, G0) ; §16.2 `solset` avec cas, substitution et paramètres (G1, G2, G3), `equiv` avec `rel` (lignes d'inégalités, `g1-bound`), `signs` (tableaux de signes), `value` avec `tol` (triangles), `poly` avec paramètre (G0), `logic` avec table de négation (G9) ; §16.3 échelle des niveaux `blocks` et `tokens`, compétences de l'école (`pow-rules`, `root-rules`), générateur qui suit les progrès, plan `cms-controle`, au moins 2 exemples d'examen par module ; §16.4 familles nouvelles (`logic`, `method`, `notation`), tag C, pièges partagés (`g9_proof_by_example`, `g9_quant_order`, `g1_ineq_not_flipped`, `g1_inverse_reciprocal`, `g2_log_power`, `g0_conj_missing` servent aussi plus loin).

Statut : G9 et G0 faits le 9 novembre 2026 (étape U1, partie a) ; G1, G2, G3 et G5 à faire (partie b). Ce catalogue est construit à l'étape **U1** ([README](README.md) §14).

Ce fichier contient six modules, dans l'ordre où le moteur les débloque : G9 (logique), G0 (polynômes), G1 (fonctions et inéquations), G2 (exponentielles, logarithmes, hyperboliques), G3 (trigonométrie), G5 (suites et récurrence). Chaque module suit le gabarit du README §15. Les conventions communes sont ici, une seule fois.

## Conventions communes

### Années et validation

| Valeur | Sens |
|---|---|
| `year: 12` | Niveau maturité. `needsSolo` garde la valeur par défaut du README §8.2 (faux). |
| `year: 12.5` | Niveau CMS. `needsSolo: true` (défaut). |
| `optional` | Tout est obligatoire par défaut (README §1, §8.2). Toutes les compétences de ces modules ont `optional: false`. |
| `tags` | `MAN` : la compétence apparaît dans les examens de la MAN. `CMS` : dans les séries ou contrôles du CMS. Informatif. |
| `examWeight` | « Poids d'examen » dans chaque entrée. Il sert aux plans `cms-controle` (README §10.1) et aux révisions. 1 = rare, 3 = presque à chaque contrôle. |

### Claviers par module

| Module | Claviers (`KEYSETS`, README §11) |
|---|---|
| G9 | `logic`, `set`, `rel` ; jetons de la palette (§ « Jetons ») |
| G0 | `calc` ; `cplx` pour `g0-factor-complex` et `g0-conditions` |
| G1 | `calc`, `rel`, `set` |
| G2 | `calc` (exp, Log, ln, sinh, cosh, tanh, argsh, argch), `rel`, `set` |
| G3 | `calc` (sin cos tan cot arcsin arccos Arctg), `rel`, `set` (avec `k`), `greek` (α, θ, φ) |
| G5 | `calcx` (Σ), `rel` |

### Ce que ce catalogue ajoute aux juges du README

Le README §5 ne décrit pas tout ce dont ces modules ont besoin. Les ajouts ci-dessous sont **proposés** ; ils sont repris dans la liste des points ouverts en fin de fichier.

1. **`solset` avec des cas** (`cfg.cases: true`). Une ligne de décision « Cas x ≥ a » (README §5.3) restreint le domaine dans `state.case`. Les lignes suivantes sont jugées sur ce domaine restreint. Une ligne « S₁ = … » ferme le cas : elle doit être égale à l'ensemble des solutions *sur le domaine du cas*. La ligne finale « S = S₁ ∪ S₂ » est jugée sur le domaine entier. Les cas proposés doivent recouvrir le domaine ; sinon `stay` : « Il manque le cas x < a. »
2. **`solset` avec une substitution** (`cfg.subst: true`). Une ligne de décision « Posons t = eˣ » range `state.subst = {t, expr, range}`. Les lignes en t sont comparées à l'ensemble des t tels que x(t) est solution, sur `range` (ici ]0 ; +∞[). La ligne de retour « eˣ = 3 » repasse en x. Le juge calcule la préimage par `sets.js` (bornes exactes pour exp, ln, x², sin, cos, tan, tan(x/2) ; grille de 400 points sinon).
3. **Ligne de domaine.** Dans `solset`, une ligne « D = … » n'est pas une transformation de l'équation. Elle est comparée au domaine de la ligne 0, calculé par `numeric.js`. Elle reste dans `state.domain`. Une ligne finale qui sort de D donne le diagnostic `g1_domain_partial` ou `g2_log_domain`.
4. **Chaînes d'inégalités** (`equiv` avec `cfg.rel: '≤' | '≥'`). Une ligne est juste si, pour tout x du domaine, prev ≤ ligne (ou ≥). Contrôle sur 400 points, plus les bornes du domaine. Forme finale : une constante. Sert à `g1-bound`.
5. **Tableau de signes** (type `table` avec `judge:{kind:'signs', f}`). Les colonnes sont les bornes que l'élève a placées. Une case vaut `+`, `−`, `0` ou `‖` (valeur interdite). Une colonne de bornes est juste si elle contient tous les zéros et pôles de f. Une case de signe est comparée au signe de f au milieu de l'intervalle. La dernière ligne (signe du produit) est jugée à partir des lignes de l'élève, comme `iter`.
6. **Valeurs approchées.** `value` avec `cfg.tol` (absolu) pour les angles d'un triangle : « 38,21° » est juste à 0,01° près. L'app accepte aussi la forme exacte `arccos(11/14)`.
7. **`poly` avec paramètre** (`cfg.params: ['λ']`). Le polynôme est sur ℚ(λ). La ligne « R(x) = … » est comparée au reste exact, coefficient par coefficient, dans ℚ(λ).
8. **Horner en tableau.** Le schéma de Horner est un `table` jugé par `iter` (README §5.2) : la ligne k est bₖ = aₖ + r·bₖ₋₁, calculée à partir de la case bₖ₋₁ **de l'élève**, avec `tol: 0` (exact sur ℚ). L'item `then` demande Q et R, jugés par `poly`.

### Jetons et blocs (G9, G1, G5)

- **Jetons** (`tokens`). La palette contient ∀ ∃ ¬ ⇒ ⇔ ∧ ∨ ∈ ∉ ⊂ ⊄ , des parenthèses, et des **morceaux** propres à l'item (« x ∈ ℝ », « ε > 0 », « |uₙ − L| < ε », « f(x) ≤ M »). Un morceau est un atome pour `logic.js`.
- **Négation des atomes.** `logic.js` connaît cette table. Tout autre atome est nié par ¬ devant lui (forme finale refusée : `form`).

| Atome | Négation |
|---|---|
| a < b | a ≥ b |
| a ≤ b | a > b |
| a = b | a ≠ b |
| x ∈ A | x ∉ A |
| A ⊂ B | ∃x ∈ A, x ∉ B (ou A ⊄ B, accepté) |
| A = B (ensembles) | A ≠ B |
| n est pair | n est impair (si l'item déclare n ∈ ℤ) |

- **Quantificateurs restreints.** « ∀ε > 0, P » se lit ∀ε (ε > 0 ⇒ P). Sa négation est « ∃ε > 0, ¬P ». La restriction ne se nie pas (piège `g9_neg_restriction`).
- **Blocs** (`blocks`). Chaque bloc a un `id`, un texte et `needs`. Les leurres portent `distractor: '<id du piège>'`. Toucher un leurre compte comme une ligne `wrong`, avec le diagnostic du piège.

### Niveaux des compétences sans lignes de calcul

Les compétences de lecture, de définition et de preuve (G9, `g1-injective`, `g1-surjective`, `g5-induction-frame`) suivent cette échelle à la place de celle du README §8.3 :

| Niveau | Ce que voit l'élève | Type |
|---|---|---|
| 1 | Blocs presque tous placés ; un trou, deux choix | `blocks` `mode:'order'` |
| 2 | Blocs à ordonner, avec 1 leurre | `blocks` |
| 3 | Jetons avec morceaux tout faits ; ou blocs avec 2 leurres | `tokens` ou `blocks` |
| 4 | Jetons libres (morceaux à écrire au clavier `rel`) ; ou charpente `mode:'frame'` | `tokens` ou `blocks` |
| 5 | Question d'examen complète, sans aide | `problem` |

### Prérequis

- Dans ces modules : ids réels.
- Autres modules universitaires : ids réels. La passe de réconciliation (README §16.5) a remplacé les marques `@<MODULE>:"…"`.
- Plan d'algèbre : `@alg:<lettre>-<sujet>`. L'agent qui implémente remplace la marque (README §8.2).
- Compétences de l'école déjà construites (`pow-rules`, `root-rules`, `prop-rule3`) : ids réels de `js/content/skills.js`.

### Sources

Mise à niveau (MAN) de l'EPFL : examens Math 1A et 1B de 2017, examens blancs 1A, 1B, 2A, 2B de 2018 avec un corrigé, formulaire M1A. Cours de mathématiques spéciales (CMS) de l'EPFL : séries d'Analyse I et II, de Géométrie analytique et d'Algèbre linéaire (langage ensembliste, logique), 2018–2019. Analyse I (GM) : série 0 de 2019 et corrigés de 2017. Les énoncés de ce fichier sont reformulés et leurs nombres changés.

---
# G9. Logique et langage mathématique

Unité `logique` · préfixe `g9-` · pièges `g9_` · Statut : fait le 9 novembre 2026 (étape U1, partie a). Le niveau 5 est l'item le plus difficile sans aide, en attendant le type `problem` (U4).

**Sources** : CMS, séries « Langage ensembliste » et « Logique et méthodes de preuve » (Algèbre linéaire, semestre 1, 2018–2019) ; MAN, examen Math 1A 2017 (Q1) et examen blanc 1A 2018 (Q5) ; Analyse I GM, corrigé de la série 3 (2017, irrationalité de √3).
**Notation** : ℕ = {0 ; 1 ; 2 ; …}, ℕ* = ℕ ∖ {0}. Intervalles `]a ; b[` avec un point-virgule. Ensemble fini `{1 ; 2 ; 3}`. Complémentaire de A dans B : C_B(A) = B ∖ A. Les énoncés quantifiés s'écrivent « ∀x ∈ ℝ, P(x) » avec une virgule après le quantificateur.
**Prérequis extérieurs** : `@alg:N-ensembles`. Crédit indirect seulement : `@alg:E-inconnue-deux-cotes`, `@alg:C-identites`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : aucun.

Le module se joue surtout avec les types `tokens`, `blocks`, `tf` et `example`. Les intervalles passent par `solset`.

## Compétences

### `g9-sets` — Ensembles : écrire et opérer
- **Année** 12 · **Prérequis** `@alg:N-ensembles` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `@alg:N-ensembles` : notation des ensembles de nombres ℕ, ℤ, ℚ, ℝ dans chaque énoncé.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : un ensemble se donne en extension {0 ; 2 ; 4} ou en compréhension {n ∈ ℕ | n < 5}. A ∩ B : dans les deux. A ∪ B : dans l'un ou l'autre. A ∖ B : dans A mais pas dans B. Exemple : A = {n ∈ ℕ | 2n + 1 < 12} ; 2n < 11, donc n ≤ 5 ; A = {0 ; 1 ; 2 ; 3 ; 4 ; 5}.
- **Juge** : `solset` `{v:'n', domain:'N'}` pour les ensembles d'entiers ; `mcq` pour les opérations · **Forme finale** : ensemble fini en extension, ou `∅`.
- **Niveaux** :
  - L1 (guidé) : la condition est déjà résolue (« n < 11/2 »), l'élève coche les éléments sur une rangée 0…10.
  - L2 : une ligne à trous « 2n < ? », puis l'ensemble.
  - L3 (choisir l'action) : « résoudre la condition », « lister », « intersecter avec ℕ ».
  - L4 (libre) : ensemble en compréhension → extension ; puis A ∩ B, A ∪ B, A ∖ B avec B donné.
  - L5 (seul) : trois ensembles, quatre opérations, dont un complémentaire C_B(A).
- **Générateur** : gabarit 1 « {n ∈ ℕ | an + b < c} » avec a ∈ [1 ; 4], b ∈ [−3 ; 5], c choisi pour que l'ensemble ait 3 à 8 éléments. Gabarit 2 « {an + b | n ∈ ℕ, n ≤ m} » (ensemble image ; piège `g9_set_builder`). Gabarit 3 « {x ∈ ℤ | x² ≤ k} », k ∈ [2 ; 20]. Pour les opérations, B = multiples de d ∈ {2 ; 3} ou intervalle d'entiers. On rejette les cas où une opération donne l'ensemble entier ou ∅ (sauf une fois sur cinq, pour enseigner ∅).
- **Corrigé type** : A = {n ∈ ℕ | 2n + 1 < 12}, B = {n ∈ ℕ | n pair}. Calculer A ∖ B.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 2n + 1 < 12 | Lire la condition |
  | 2 | n < 11/2 | Résoudre (→ `@alg:E-inconnue-deux-cotes`) |
  | 3 | A = {0 ; 1 ; 2 ; 3 ; 4 ; 5} | Lister dans ℕ |
  | 4 | A ∖ B = {1 ; 3 ; 5} | Opérer |
- **Aides** : 1 « Résous d'abord la condition, puis garde les entiers naturels. » · 2 « n < 11/2, donc n ∈ {0 ; … ; ?} » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (les distracteurs viennent de `g9_set_builder` et de 0 oublié ou ajouté) ; `tf` « {3n + 1 | n ∈ ℕ} contient 10 » (vrai) ; « A ∖ B = B ∖ A » (faux : A = {1}, B = ∅).
- **Pièges** : `g9_set_builder`, `g9_union_inter`.
- **Sous-buts → crédit** : résoudre → `@alg:E-inconnue-deux-cotes`.

### `g9-intervals` — Intervalles et parties de ℝ
- **Année** 12 · **Prérequis** `g9-sets` · **Étiquettes** CMS, MAN · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-sets` : intersection et réunion d'intervalles.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le sous-but « ôter la valeur absolue » sera crédité à `g1-abs-eq` quand G1 sera construit (U1, partie b).
- **Intro** : un crochet tourné vers le nombre l'inclut : [2 ; 5[ contient 2, pas 5. ∞ est toujours exclu. Exemple : {x ∈ ℝ | |x − 1| < 3 et x ≥ 0} = ]−2 ; 4[ ∩ [0 ; +∞[ = [0 ; 4[.
- **Juge** : `solset` `{v:'x', domain:'R'}` · **Forme finale** : union d'intervalles disjoints, triés, sans ∩.
- **Niveaux** :
  - L1 : la droite réelle est dessinée avec les deux morceaux ; l'élève choisit les crochets.
  - L2 : traduire une inégalité simple (« −1 < x ≤ 3 ») en intervalle.
  - L3 : choisir l'opération : « intersection », « union », « complémentaire ».
  - L4 : ensemble en compréhension avec « et », « ou », « non », à écrire en intervalles.
  - L5 : trois conditions, dont une valeur absolue et une négation.
- **Générateur** : bornes entières ou demi-entières dans [−6 ; 6], tirées distinctes. Gabarits : « a < x ≤ b et x ≥ c », « x < a ou x ≥ b », « non (a ≤ x < b) », « |x − m| < r et x ≥ c » (r ∈ [1 ; 4]). On exige que la réponse ait au moins une borne fermée et une ouverte.
- **Corrigé type** : écrire E = {x ∈ ℝ | |x − 1| < 3 et x ≥ 0}.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | −3 < x − 1 < 3 et x ≥ 0 | Ôter la valeur absolue |
  | 2 | −2 < x < 4 et x ≥ 0 | Isoler x |
  | 3 | ]−2 ; 4[ ∩ [0 ; +∞[ | Traduire en intervalles |
  | 4 | [0 ; 4[ | Intersecter |
- **Aides** : 1 « Écris chaque condition comme un intervalle, puis « et » = ∩. » · 2 « ]−2 ; 4[ ∩ [0 ; …[ » · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (distracteurs : `g9_bracket` sur chaque borne, `g9_union_inter`) ; `tf` « ℝ ∖ ]0 ; 1] = ]−∞ ; 0[ ∪ [1 ; +∞[ » (faux : 0 appartient au complémentaire, 1 non ; le bon est ]−∞ ; 0] ∪ ]1 ; +∞[).
- **Pièges** : `g9_bracket`, `g9_union_inter`.
- **Sous-buts → crédit** : ôter la valeur absolue → `g1-abs-eq`.

### `g9-connectives` — Connecteurs et tables de vérité
- **Année** 12 · **Prérequis** — · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le contre-exemple de « ¬(P ⇒ Q) ≡ ¬P ⇒ ¬Q » est P et Q vrais (ou faux tous les deux) : avec P faux et Q vrai, les deux côtés valent faux.
- **Intro** : P ⇒ Q est faux seulement quand P est vrai et Q faux. Donc P ⇒ Q ≡ ¬P ∨ Q. De Morgan : ¬(P ∧ Q) ≡ ¬P ∨ ¬Q et ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. Exemple : ¬(P ∧ ¬Q) ≡ ¬P ∨ Q ≡ P ⇒ Q.
- **Juge** : `logic` `{}` (lignes de formules) ; table de vérité en `table` avec `judge:{kind:'iter', phi: évaluation de la colonne, tol:0}` · **Forme finale** : la formule cible (`target`), ou la colonne complète.
- **Niveaux** :
  - L1 : table de vérité de P ⇒ Q à compléter (4 cases).
  - L2 : table de (P ⇒ Q) ∧ (Q ⇒ P) ; reconnaître ⇔.
  - L3 : transformer une formule en touchant la règle (De Morgan, double négation, ⇒ en ∨).
  - L4 : simplifier une formule de 3 variables en lignes `logic`.
  - L5 : prouver une équivalence par table **et** par transformations.
- **Générateur** : formules de 2 ou 3 variables tirées dans une grammaire bornée (profondeur ≤ 3, au moins un ¬ devant une parenthèse). La cible est la forme normale négative la plus courte (calculée par `logic.js`). On rejette les tautologies et les contradictions, sauf au niveau 5 où l'on demande « tautologie ? ».
- **Corrigé type** : simplifier ¬(P ∧ ¬Q).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ¬P ∨ ¬¬Q | De Morgan |
  | 2 | ¬P ∨ Q | Double négation |
  | 3 | P ⇒ Q | Reconnaître l'implication |
- **Aides** : 1 « Fais entrer la négation dans la parenthèse : ∧ devient ∨. » · 2 « ¬P ∨ ¬(…) » · 3 la ligne 1.
- **Variantes d'examen** : `tf` « ¬(P ⇒ Q) ≡ ¬P ⇒ ¬Q » (faux : P faux, Q vrai donne faux à gauche et vrai à droite) ; `mcq` (distracteurs `g9_demorgan`, `g9_neg_implication`).
- **Pièges** : `g9_demorgan`, `g9_neg_implication`.
- **Sous-buts → crédit** : aucun crédit externe.

### `g9-implication` — Implication, réciproque, contraposée
- **Année** 12 · **Prérequis** `g9-connectives` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-connectives` : la négation P ∧ ¬Q et l'équivalence se lisent sur la table de vérité.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : pour P ⇒ Q : la réciproque est Q ⇒ P ; la contraposée est ¬Q ⇒ ¬P et lui est équivalente ; la négation est P ∧ ¬Q. Exemple : « si n² est pair, n est pair » a pour contraposée « si n est impair, n² est impair ».
- **Juge** : `tokens` avec `judge:'logic'` (cible : la formule demandée) · **Forme finale** : pas de ¬ devant ⇒, ∧, ∨ ou un quantificateur.
- **Niveaux** :
  - L1 : `mcq` « Laquelle est la contraposée ? » (4 formules).
  - L2 : `tokens` avec morceaux « n² est pair », « n est pair » et leurs négations déjà prêts.
  - L3 : réciproque, contraposée et négation d'un même énoncé, avec quantificateur ∀ devant.
  - L4 : énoncés sur des ensembles (« A ∩ C = B ∩ C ⇒ A = B ») ; atomes à nier selon la table des conventions.
  - L5 : question MAN complète : négation, contraposée, laquelle de T ou nonT est vraie (avec contre-exemple saisi).
- **Générateur** : banque de 30 implications paramétrées : arithmétique (« n² multiple de k ⇒ n multiple de k », k ∈ {2 ; 3 ; 5}), réels (« x² > a² ⇒ x > a », a ∈ [1 ; 5]), ensembles (A, B, C ⊂ ℕ avec ∩, ∪, ⊂, ∖). Chaque énoncé porte sa vérité et un contre-exemple si faux (vérifié par `judges/examples.js`). On impose un ∀ en tête à partir de L3.
- **Corrigé type** : T : ∀x ∈ ℝ, x² > 9 ⇒ x > 3. Écrire la contraposée, puis la négation.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∀x ∈ ℝ, x ≤ 3 ⇒ x² ≤ 9 | Contraposée : nier et échanger |
  | 2 | ¬T : ∃x ∈ ℝ, ¬(x² > 9 ⇒ x > 3) | Nier le ∀ |
  | 3 | ∃x ∈ ℝ, x² > 9 ∧ x ≤ 3 | Négation d'une implication |
  | 4 | ¬T est vraie : x = −4 | Contre-exemple (→ `g9-counterexample`) |
- **Aides** : 1 « Contraposée : on nie les deux côtés et on les échange. Négation : « P et non Q ». » · 2 « ∃x ∈ ℝ, x² > 9 ∧ … » · 3 la ligne 3.
- **Variantes d'examen** : `open` (format MAN, 5 points, voir Exemples) ; `mcq` (distracteurs : réciproque, inverse ¬P ⇒ ¬Q, P ⇒ ¬Q) ; `tf` « La réciproque d'une implication vraie est vraie » (faux : x > 3 ⇒ x² > 9 est vraie, sa réciproque non, x = −4).
- **Pièges** : `g9_converse_contra`, `g9_neg_implication`, `g9_neg_strict`.
- **Sous-buts → crédit** : contre-exemple → `g9-counterexample`.

### `g9-quant-read` — Lire un énoncé quantifié
- **Année** 12 · **Prérequis** `g9-sets` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-sets` : chaque quantificateur porte sur un ensemble (x ∈ ℝ, n ∈ ℕ).
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Les énoncés faux en ∃y ∀x demandent un x qui fait échouer chaque y, éventuellement en fonction de y (x = 1 − y).
- **Intro** : ∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x. Exemple : « ∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0 » est vrai (y = −x) ; « ∃y ∈ ℝ ∀x ∈ ℝ, x + y = 0 » est faux.
- **Juge** : `tf` avec `counter` ; `mcq` (traduction en français) · **Forme finale** : vrai/faux, puis témoin ou contre-exemple.
- **Niveaux** :
  - L1 : domaine fini A = {1 ; 2 ; 3} affiché en tableau x × y ; l'élève coche les cases où P(x, y) est vraie, puis répond.
  - L2 : même chose sans tableau.
  - L3 : paire d'énoncés ∀∃ / ∃∀ sur ℝ ou ℕ ; vrai/faux pour chacun.
  - L4 : traduire une phrase (« toute suite bornée… ») en formule `tokens`, puis dire si elle est vraie.
  - L5 : quatre énoncés, vrai/faux avec témoin ou contre-exemple pour chacun, sans aide.
- **Générateur** : domaines finis A ⊂ {1 ; … ; 5} de 3 éléments ; prédicats x² + y < c, x + 2y < c, x·y ≥ c, c choisi pour que ∀x∃y et ∃y∀x aient des valeurs de vérité **différentes** une fois sur deux. Sur ℝ : banque de 12 paires classiques (x + y = 0, y > x, y² = x…).
- **Corrigé type** : A = {1 ; 2 ; 3}. P : ∀x ∈ A ∃y ∈ A, x² + y < 10. Vrai ou faux ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x = 1 : y = 1 donne 2 < 10 ✓ | Chercher un y pour chaque x |
  | 2 | x = 2 : y = 1 donne 5 < 10 ✓ | |
  | 3 | x = 3 : 9 + y ≥ 10 pour tout y ∈ A ✗ | Trouver le x qui bloque |
  | 4 | P est faux ; contre-exemple x = 3 | Conclure (→ `g9-counterexample`) |
- **Aides** : 1 « Pour ∀x ∃y : prends chaque x et cherche un y qui marche. » · 2 « Pour x = 3, le plus petit y donne 9 + 1 = … » · 3 la ligne 3.
- **Variantes d'examen** : `tf` (énoncés de la banque) ; `mcq` « Quelle phrase dit la même chose ? » (distracteur `g9_quant_order`).
- **Pièges** : `g9_quant_order`.
- **Sous-buts → crédit** : contre-exemple → `g9-counterexample`.

### `g9-quant-write` — Écrire une définition avec des quantificateurs
- **Année** 12 · **Prérequis** `g9-quant-read` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g9-quant-read` : relire la définition écrite : portée et ordre de ∀ et ∃.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Les leurres sont toujours faux : la « version stricte » |f(x)| < M n'est pas proposée, car elle définit aussi « bornée ».
- **Intro** : « f est majorée sur I » : ∃M ∈ ℝ ∀x ∈ I, f(x) ≤ M. L'ordre compte : M est choisi avant x. « f est croissante sur I » : ∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y).
- **Juge** : `tokens` avec `judge:'logic'` (L3–L4) ; `blocks` `mode:'define'` (L1–L2) · **Forme finale** : formule équivalente à la cible.
- **Niveaux** : échelle des conventions (blocs puis jetons). Définitions : majorée, minorée, bornée, croissante, décroissante, injective, paire, périodique, A ⊂ B, A = B, suite convergente vers L.
- **Générateur** : banque de 11 définitions ; chaque item tire une définition et 2 leurres construits par `g9_quant_order` et `g9_neg_strict`. Les morceaux sont adaptés à l'objet (f ou (uₙ), I ou ℕ).
- **Corrigé type** : écrire « f est bornée sur ℝ ».

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∃M ∈ ℝ | Choisir d'abord la borne |
  | 2 | ∃M ∈ ℝ ∀x ∈ ℝ | Puis tous les x |
  | 3 | ∃M ∈ ℝ ∀x ∈ ℝ, \|f(x)\| ≤ M | La propriété |
- **Aides** : 1 « Qui est choisi en premier : la borne ou x ? » · 2 « ∃M ∈ ℝ ∀x ∈ ℝ, … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (4 formules : la bonne, ∀x∃M, version stricte, version sans valeur absolue) ; `open` « Définir f injective sur I » (1 point).
- **Pièges** : `g9_quant_order`.
- **Sous-buts → crédit** : aucun.

### `g9-negate` — Nier un énoncé quantifié
- **Année** 12 · **Prérequis** `g9-quant-read`, `g9-implication` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g9-quant-read` : lire la portée de chaque quantificateur avant de nier.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le niveau 1 est un QCM « quelle est la ligne suivante ? ».
- **Intro** : on fait entrer ¬ de gauche à droite. Chaque ∀ devient ∃, chaque ∃ devient ∀, la restriction (ε > 0) ne change pas, et la propriété à la fin est niée. Exemple : ¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |uₙ − L| < ε) ≡ ∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |uₙ − L| ≥ ε.
- **Juge** : `logic` `{}` en lignes (L3–L4), `tokens` (L2) · **Forme finale** : aucun ¬ devant un quantificateur ou un connecteur ; les atomes niés selon la table.
- **Niveaux** :
  - L1 : le ¬ a déjà franchi le premier quantificateur ; l'élève choisit le suivant.
  - L2 : `tokens` avec morceaux niés et non niés dans la palette.
  - L3 : lignes : à chaque ligne, le ¬ franchit un symbole ; l'élève touche « franchir ∀ », « franchir ⇒ », « nier l'atome ».
  - L4 : ligne libre, énoncés à 3 quantificateurs et une implication (continuité en a, limite d'une suite, f non majorée).
  - L5 : nier, puis décider qui de P ou ¬P est vrai, avec témoin.
- **Générateur** : banque de gabarits paramétrés (définitions d'analyse, énoncés du CMS sur ℝ, ℕ, {1 ; 2 ; 3}). Chaque gabarit a entre 1 et 3 quantificateurs, au moins une restriction à partir de L3, et une implication à partir de L4. Les morceaux sont tirés pour que la négation de chaque atome soit dans la table.
- **Corrigé type** : nier P : ∀ε > 0 ∃δ > 0 ∀x ∈ ℝ, |x − a| < δ ⇒ |f(x) − f(a)| < ε.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ∃ε > 0, ¬(∃δ > 0 ∀x ∈ ℝ, …) | Franchir ∀ε |
  | 2 | ∃ε > 0 ∀δ > 0, ¬(∀x ∈ ℝ, …) | Franchir ∃δ |
  | 3 | ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, ¬(\|x − a\| < δ ⇒ \|f(x) − f(a)\| < ε) | Franchir ∀x |
  | 4 | ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, \|x − a\| < δ ∧ \|f(x) − f(a)\| ≥ ε | Nier l'implication (→ `g9-implication`) |
- **Aides** : 1 « Un symbole à la fois, de gauche à droite. La restriction ε > 0 reste. » · 2 « ∃ε > 0 ∀δ > 0 ∃x ∈ ℝ, … ∧ … » · 3 la ligne 4.
- **Variantes d'examen** : `open` (2 points, format MAN) ; `mcq` (distracteurs : `g9_neg_one_quant`, `g9_neg_pred_kept`, `g9_neg_restriction`, `g9_neg_strict`).
- **Pièges** : `g9_neg_one_quant`, `g9_neg_pred_kept`, `g9_neg_restriction`, `g9_neg_strict`, `g9_neg_implication`.
- **Sous-buts → crédit** : nier l'implication → `g9-implication`.

### `g9-counterexample` — Réfuter par un contre-exemple
- **Année** 12 · **Prérequis** `g9-negate` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-negate` : un contre-exemple réalise la négation ∃x, ¬P(x).
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : pour montrer qu'un énoncé « ∀x, P(x) » est faux, **un** x qui ne vérifie pas P suffit. Pour le montrer vrai, des exemples ne suffisent jamais. Exemple : « ∀x ∈ ℝ, x² ≥ x » est faux : x = 1/2 donne 1/4 < 1/2.
- **Juge** : `tf` avec `counter` ; `example` (`property:{kind:'refutes', statement}`) vérifié par `judges/examples.js` · **Forme finale** : vrai/faux, plus contre-exemple accepté.
- **Niveaux** :
  - L1 : trois valeurs proposées, l'élève touche celle qui réfute.
  - L2 : saisir un nombre qui réfute.
  - L3 : énoncés avec implication (« si x² > 4 alors x > 2 ») : le contre-exemple doit vérifier l'hypothèse.
  - L4 : énoncés sur des fonctions ou des ensembles ; saisir une fonction ou deux ensembles.
  - L5 : série de 5 vrai/faux, contre-exemple exigé pour chaque faux.
- **Générateur** : banque d'énoncés faux paramétrés (x² ≥ x, √(x²) = x, (a + b)² = a² + b², 1/x < 1, « n² + n + k premier » avec k ∈ {11 ; 17 ; 41}, A ∪ B = A ⇒ B = ∅) et autant d'énoncés vrais. Un vrai/faux sur deux est vrai. Le vérificateur accepte tout contre-exemple valide.
- **Corrigé type** : « ∀x ∈ ℝ, x² > 4 ⇒ x > 2 ». Vrai ou faux ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Faux | Décider |
  | 2 | Contre-exemple : x = −3 | Choisir x avec l'hypothèse vraie |
  | 3 | (−3)² = 9 > 4, mais −3 ≤ 2 | Vérifier hypothèse vraie, conclusion fausse |
- **Aides** : 1 « Cherche un x qui vérifie l'hypothèse mais pas la conclusion. » · 2 « Essaie un x négatif. » · 3 la ligne 2.
- **Variantes d'examen** : `tf` (c'est la variante principale) ; `mcq` « Lequel est un contre-exemple ? » (distracteur `g9_counter_not_hyp`).
- **Pièges** : `g9_proof_by_example`, `g9_counter_not_hyp`.
- **Sous-buts → crédit** : aucun.

### `g9-proof-contra` — Preuve directe et par contraposée
- **Année** 12 · **Prérequis** `g9-implication` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-implication` : la contraposée ¬Q ⇒ ¬P est équivalente à P ⇒ Q.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le niveau 1 est un QCM « quel bloc manque ? ». Le choix « preuve directe » est valide mais pauvre : la raison s'affiche après le bloc suivant.
- **Intro** : preuve directe : on suppose P, on arrive à Q. Par contraposée : on suppose ¬Q, on arrive à ¬P. On choisit la contraposée quand ¬Q donne une écriture utile (n impair : n = 2k + 1). Exemple : n² pair ⇒ n pair, prouvé par « n impair ⇒ n² impair ».
- **Juge** : `blocks` `mode:'order'` puis `'frame'`; les lignes de calcul dans un bloc à trous sont jugées par `equiv` `{vars:['k'], domain:{k:'Z'}}` · **Forme finale** : bloc conclusion placé, tous les `needs` satisfaits.
- **Niveaux** : échelle des conventions. L3 ajoute une **décision** « Preuve directe ou par contraposée ? » (`quality:'poor'` pour la directe sur « n² pair ⇒ n pair », avec message : « Depuis n² = 2m, on ne sait pas écrire n. »). L4 : charpente avec le calcul (2k + 1)² à écrire.
- **Générateur** : banque d'énoncés : « n² multiple de p ⇒ n multiple de p » (p ∈ {2 ; 3}, avec n = pk + r, r ≠ 0), « n + m impair ⇒ n ou m pair », « x ≠ 0 et y ≠ 0 ⇒ xy ≠ 0 », « x² < 1 ⇒ |x| < 1 », inclusions d'ensembles. Leurres tirés dans `g9_proof_by_example`, `g9_converse_contra`.
- **Corrigé type** : montrer « n² pair ⇒ n pair » (n ∈ ℤ).

  | # | Bloc | Sous-but |
  |---|---|---|
  | 1 | Montrons la contraposée : si n est impair, alors n² est impair. | Choisir la méthode |
  | 2 | Soit n impair : n = 2k + 1, avec k ∈ ℤ. | Traduire l'hypothèse |
  | 3 | n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 | Calculer (→ `@alg:C-identites`) |
  | 4 | Donc n² est impair. | Conclure la contraposée |
  | 5 | La contraposée est vraie, donc l'énoncé l'est aussi. | Revenir à l'énoncé |
  | — | Leurre : « 2² = 4 et 4² = 16 sont pairs, donc c'est vrai. » | `g9_proof_by_example` |
  | — | Leurre : « Soit n pair : n = 2k, donc n² = 4k² est pair. » | `g9_converse_contra` |
- **Aides** : 1 « Essaie la contraposée : que veut dire « n impair » en formule ? » · 2 « n = 2k + 1, donc n² = … » · 3 le bloc 3.
- **Variantes d'examen** : `open` (3 points : choix 0,5, traduction 0,5, calcul 1,5, conclusion 0,5).
- **Pièges** : `g9_proof_by_example`, `g9_converse_contra`.
- **Sous-buts → crédit** : calculer → `@alg:C-identites`.

### `g9-proof-absurd` — Preuve par l'absurde
- **Année** 12 · **Prérequis** `g9-negate` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g9-negate` : on suppose la négation de l'énoncé.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le niveau 1 est un QCM « quel bloc manque ? ».
- **Intro** : on suppose la **négation** de ce qu'on veut montrer, et on arrive à une contradiction. Exemple : √3 irrationnel. On suppose √3 = p/q avec pgcd(p, q) = 1 ; alors p² = 3q², donc 3 | p, puis 3 | q : contradiction.
- **Juge** : `blocks` ; les calculs internes par `equiv` · **Forme finale** : bloc « contradiction » puis conclusion.
- **Niveaux** : échelle des conventions. L3 : décision « Que suppose-t-on ? » (4 choix : la négation ✓, l'énoncé, la réciproque, un exemple). L4 : charpente avec p² = 3q² à écrire.
- **Générateur** : √p irrationnel (p ∈ {2 ; 3 ; 5 ; 7}) ; « il n'existe pas de plus grand entier » ; « √(7 + √17) est irrationnel » (en s'appuyant sur √17 irrationnel) ; « log₂ 3 est irrationnel » (2^p = 3^q impossible : pair contre impair). Leurres : `g9_absurd_wrong_assumption`, `g9_proof_by_example`.
- **Corrigé type** : montrer que √5 est irrationnel.

  | # | Bloc | Sous-but |
  |---|---|---|
  | 1 | Supposons √5 = p/q, p, q ∈ ℕ*, pgcd(p, q) = 1. | Supposer la négation |
  | 2 | Alors p² = 5q². | Calculer |
  | 3 | 5 divise p², et 5 est premier, donc 5 divise p : p = 5a. | Déduire |
  | 4 | 25a² = 5q², donc q² = 5a², donc 5 divise q. | Déduire encore |
  | 5 | 5 divise p et q : contradiction avec pgcd(p, q) = 1. | Contradiction |
  | 6 | Donc √5 est irrationnel. | Conclure |
  | — | Leurre : « Supposons √5 irrationnel. » | `g9_absurd_wrong_assumption` |
- **Aides** : 1 « Suppose le contraire : √5 s'écrit comme une fraction irréductible. » · 2 « Élève au carré : p² = … q² » · 3 le bloc 2.
- **Variantes d'examen** : `open` (3 points).
- **Pièges** : `g9_absurd_wrong_assumption`, `g9_proof_by_example`.
- **Sous-buts → crédit** : aucun.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g9_set_builder` | notation | E | `g9-sets` | `g9-sets` | {3n + 1 \| n ≤ 3} = {0 ; 1 ; 2 ; 3} → {1 ; 4 ; 7 ; 10} | Pour un ensemble image {f(n) \| n ∈ E}, renvoyer E au lieu de f(E). | « Les éléments sont les valeurs 3n + 1, pas les n : pour n = 2, on obtient 7. » |
| `g9_union_inter` | logic | E | `g9-intervals` | `g9-intervals` | x < −1 ou x > 2 : ]−∞ ; −1[ ∩ ]2 ; +∞[ = ∅ → ]−∞ ; −1[ ∪ ]2 ; +∞[ | Dans prev, remplacer chaque ∩ par ∪ et chaque ∪ par ∩ (un candidat par opérateur). | « « Ou » se traduit par ∪, « et » par ∩. Ici, x = 5 vérifie la condition mais n'est pas dans ton ensemble. » |
| `g9_bracket` | notation | E | `g9-intervals` | `g9-intervals` | −1 < x ≤ 3 : [−1 ; 3] → ]−1 ; 3] | Pour chaque borne finie de prev, inverser ouvert/fermé (un candidat par borne). | « −1 vérifie-t-il −1 < x ? Non : le crochet doit exclure −1. » |
| `g9_demorgan` | logic | E | `g9-connectives` | `g9-connectives` | ¬(P ∧ Q) ≡ ¬P ∧ ¬Q → ¬P ∨ ¬Q | Remplacer ¬(A ∧ B) par ¬A ∧ ¬B et ¬(A ∨ B) par ¬A ∨ ¬B. | « Avec P vrai et Q faux, ¬(P ∧ Q) est vrai mais ¬P ∧ ¬Q est faux. Le ∧ devient ∨. » |
| `g9_neg_implication` | logic | E | `g9-implication` | `g9-connectives` | ¬(P ⇒ Q) ≡ ¬P ⇒ ¬Q → P ∧ ¬Q | Remplacer ¬(A ⇒ B) par ¬A ⇒ ¬B, et par A ⇒ ¬B (deux candidats). | « Une implication est fausse seulement quand A est vrai et B faux. Sa négation est « A et non B », pas une implication. » |
| `g9_converse_contra` | logic | E | `g9-implication` | `g9-implication` | contraposée de P ⇒ Q : Q ⇒ P → ¬Q ⇒ ¬P | À partir de l'énoncé A ⇒ B, produire B ⇒ A (réciproque) et ¬A ⇒ ¬B (inverse). En `blocks`, leurre « Supposons B ». | « Tu as écrit la réciproque. Elle n'est pas équivalente : x > 3 ⇒ x² > 9 est vraie, mais x² > 9 ⇒ x > 3 est fausse. » |
| `g9_quant_order` | logic | R (Dubinsky & Yiparaki) | `g9-quant-read` | `g9-quant-read` | ∃y ∀x, x + y = 0 lu comme ∀x ∃y, x + y = 0 | Échanger deux quantificateurs voisins de sortes différentes ; en `tf`, renvoyer la valeur de vérité de l'énoncé échangé. | « Ici y vient d'abord : il doit marcher pour tous les x à la fois. y = −x dépend de x, ce n'est pas permis. » |
| `g9_neg_one_quant` | logic | R (Dubinsky & Yiparaki) | `g9-negate` | `g9-negate` | ¬(∀x ∃y, P) → ∃x ∃y, ¬P au lieu de ∃x ∀y, ¬P | Pour un préfixe Q₁…Qₖ, produire k candidats : seul Qᵢ est changé, la propriété est niée. | « Tu as changé ∀x mais pas ∃y. Chaque quantificateur que la négation franchit change. » |
| `g9_neg_pred_kept` | logic | E | `g9-negate` | `g9-negate` | ¬(∀x, x² ≥ 0) → ∃x, x² ≥ 0 | Changer tous les quantificateurs mais garder la propriété telle quelle. | « Les quantificateurs sont bien changés, mais la propriété à la fin doit être niée : x² < 0. » |
| `g9_neg_restriction` | logic | E | `g9-negate` | `g9-negate` | ¬(∀ε > 0, P) → ∃ε ≤ 0, ¬P | Nier aussi la restriction d'un quantificateur restreint. | « ε > 0 dit où l'on cherche, ce n'est pas la propriété. La négation cherche encore parmi les ε > 0. » |
| `g9_neg_strict` | logic | E | `g9-negate` | `g9-connectives` | ¬(x < 3) → x > 3 au lieu de x ≥ 3 | Table de négation fausse : < ↦ >, ≤ ↦ ≥, > ↦ <, ≥ ↦ ≤. | « x = 3 ne vérifie pas x < 3, donc il vérifie la négation. Il faut x ≥ 3. » |
| `g9_proof_by_example` | method | R (Harel & Sowder) | `g9-counterexample` | `g9-counterexample` | « vrai pour n = 1, 2, 3, donc pour tout n » | En `blocks`, leurre « On vérifie pour quelques valeurs ». En `tf`, `wrongValues` : répondre « vrai » à un ∀ faux dont les petits cas sont vrais (n² + n + 41 premier). | « Des exemples ne prouvent pas un « pour tout ». n² + n + 41 est premier jusqu'à n = 39, mais pas pour n = 40. » |
| `g9_counter_not_hyp` | logic | E | `g9-counterexample` | `g9-implication` | « x² > 4 ⇒ x > 2 » réfuté par x = 1 | `wrongValues` : valeurs qui rendent l'hypothèse fausse. | « Avec x = 1, l'hypothèse x² > 4 est fausse : l'implication est alors vraie. Il faut x² > 4 et x ≤ 2. » |
| `g9_absurd_wrong_assumption` | method | E | `g9-proof-absurd` | `g9-negate` | « Supposons √5 irrationnel » → « Supposons √5 rationnel » | En `blocks`, leurre qui suppose l'énoncé (ou sa réciproque) au lieu de sa négation. | « Par l'absurde, on suppose le contraire de ce qu'on veut montrer. » |

## Exemples de type examen

**E1 (5 points, d'après MAN 2017).** T : ∀A, B, C ⊂ ℕ, A ∩ C = B ∩ C ⇒ A = B.
(a) Écrire nonT. (b) Écrire la contraposée S de T. (c) Laquelle de T ou nonT est vraie ?

| Étape | Attendu | Points |
|---|---|---|
| a | ∃A, B, C ⊂ ℕ, A ∩ C = B ∩ C ∧ A ≠ B | 2 (1 pour les quantificateurs, 1 pour la propriété) |
| b | ∀A, B, C ⊂ ℕ, A ≠ B ⇒ A ∩ C ≠ B ∩ C | 2 |
| c | nonT ; témoin C = ∅, A = {1}, B = {2} | 1 |

**E2 (3 points, d'après l'examen blanc MAN 2018).** T : ∀x ∈ ℝ, x² > 9 ⇒ x > 3.
(a) Écrire nonT et montrer qu'elle est vraie. (b) Écrire la réciproque R. (c) Montrer R par contraposée.

| Étape | Attendu | Points |
|---|---|---|
| a | ∃x ∈ ℝ, x² > 9 ∧ x ≤ 3 ; x = −4 | 1,5 |
| b | ∀x ∈ ℝ, x > 3 ⇒ x² > 9 | 0,5 |
| c | x² ≤ 9 ⇒ −3 ≤ x ≤ 3 ⇒ x ≤ 3 | 1 |

**E3 (4 points, d'après la série « Logique » du CMS).** A = {1 ; 2 ; 3}. Pour chaque énoncé, écrire la négation et dire lequel de l'énoncé ou de sa négation est vrai. P : ∀x ∈ A ∃y ∈ A, x² + y < 10. Q : ∃y ∈ A ∀x ∈ A, x + 2y < 8.

| Étape | Attendu | Points |
|---|---|---|
| ¬P | ∃x ∈ A ∀y ∈ A, x² + y ≥ 10 | 1 |
| Vérité | ¬P vraie (x = 3) | 1 |
| ¬Q | ∀y ∈ A ∃x ∈ A, x + 2y ≥ 8 | 1 |
| Vérité | Q vraie (y = 1 : 3, 4, 5 < 8) | 1 |

**E4 (3 points).** Montrer par contraposée : si n² est multiple de 3, alors n est multiple de 3.

| Étape | Attendu | Points |
|---|---|---|
| Méthode | Contraposée : n non multiple de 3 ⇒ n² non multiple de 3 | 0,5 |
| Cas | n = 3k + 1 ou n = 3k + 2 | 0,5 |
| Calcul | n² = 3(3k² + 2k) + 1, ou n² = 3(3k² + 4k + 1) + 1 | 1,5 |
| Conclusion | Reste 1 dans les deux cas, donc n² non multiple de 3 | 0,5 |

**E5 (2 points).** Écrire avec des quantificateurs « f n'est pas croissante sur I ».

| Étape | Attendu | Points |
|---|---|---|
| Définition | ∀x, y ∈ I, x < y ⇒ f(x) ≤ f(y) | 1 |
| Négation | ∃x, y ∈ I, x < y ∧ f(x) > f(y) | 1 |

---
# G0. Polynômes

Unité `polynomes` · préfixe `g0-` · pièges `g0_` · Statut : fait le 9 novembre 2026 (étape U1, partie a). Les variantes `open` sont des `lines` sans aide, en attendant le type `problem` (U4).

**Sources** : MAN, examen Math 1A 2017 (Q4, polynôme défini par des conditions) et examen blanc 1A 2018 (Q2, divisibilité avec paramètre) ; CMS, Analyse II, séries 18 et 19 (racines communes, polynômes complexes) et Analyse I, série 20 (éléments simples) ; Analyse I GM, série 0 de 2019 (division polynomiale).
**Notation** : P(x) ordonné selon les puissances décroissantes. Division euclidienne : A = BQ + R avec deg R < deg B. Polynôme unitaire : coefficient dominant 1. Le PGCD est rendu unitaire.
**Prérequis extérieurs** : `@alg:C-developper`, `@alg:D-factoriser-completement`, `@alg:E-systemes`, `@alg:G-additionner`, `@alg:H-discriminant`, `g8-algebraic`. Crédit indirect seulement : `@alg:D-trinome`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g8-algebraic`.

## Compétences

### `g0-identify` — Identifier des coefficients
- **Année** 12 · **Prérequis** `@alg:C-developper`, `@alg:E-systemes` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : deux polynômes sont égaux pour tout x si et seulement si leurs coefficients sont égaux, degré par degré. On développe, on ordonne, puis on écrit une équation par puissance de x.
- **Juge** : `poly` `{v:'x', params:['a','b','c']}`. Une ligne d'identité doit être la même identité que la précédente (mêmes polynômes en x sur ℚ(a, b, c)). Une ligne « système » est jugée par `solset` `{vars:['a','b','c']}` contre le système des coefficients. La ligne finale « a = …, b = …, c = … » est juste si elle rend l'identité vraie. · **Forme finale** : valeurs de tous les paramètres.
- **Niveaux** :
  - L1 : le développement est donné ; l'élève remplit le système à trous.
  - L2 : développer et ordonner, puis système donné.
  - L3 : choisir l'action : « développer », « ordonner », « identifier le degré k », « résoudre ».
  - L4 : libre, 3 inconnues.
  - L5 : 4 inconnues, ou identité qui sert ensuite (division, éléments simples).
- **Générateur** : on tire d'abord la réponse a ∈ [1 ; 3], b, c ∈ [−4 ; 4], un facteur (x − r), r ∈ [−3 ; 3] ∖ {0}, puis on développe le membre de droite. Gabarit 2 : « a(x − 1)² + b(x − 1) + c = 2x² − 3x + 4 » (changement de base). On rejette les cas où un coefficient de droite est nul (sauf au niveau 5).
- **Corrigé type** : trouver a, b, c tels que (x − 2)(ax² + bx + c) = 2x³ − 3x² − 3x + 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ax³ + (b − 2a)x² + (c − 2b)x − 2c = 2x³ − 3x² − 3x + 2 | Développer et ordonner (→ `@alg:C-developper`) |
  | 2 | a = 2 ; b − 2a = −3 ; c − 2b = −3 ; −2c = 2 | Identifier degré par degré |
  | 3 | a = 2, b = 1, c = −1 | Résoudre le système (→ `@alg:E-systemes`) |
- **Aides** : 1 « Développe le membre de gauche et range-le selon les puissances de x. » · 2 « Coefficient de x² : b − 2a = … » · 3 la ligne 2.
- **Variantes d'examen** : `coef` (« que vaut b ? ») ; `mcq` (distracteurs : signes de r inversés).
- **Pièges** : aucun propre ; les pièges de développement du plan d'algèbre restent actifs.
- **Sous-buts → crédit** : développer → `@alg:C-developper` ; résoudre → `@alg:E-systemes`.

### `g0-horner` — Schéma de Horner : valeur et division par x − a
- **Année** 12 · **Prérequis** `@alg:C-developper` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:C-developper` : écrire P développé et ordonné pour lire tous les coefficients.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : on écrit **tous** les coefficients, 0 compris. On descend le premier. Ensuite : multiplier par a, ajouter au coefficient suivant. La dernière case est P(a) ; les autres sont les coefficients du quotient, de degré un de moins. Pour x + 2, a = −2.
- **Juge** : `table` (colonnes = coefficients aₙ…a₀ ; lignes « a·b » et « b »), jugé par `iter` `{phi: bₖ = aₖ + a·bₖ₋₁, tol:0}`, puis `then` : « Q(x) = … ; R = … » jugé par `poly` `{v:'x'}` (A = (x − a)Q + R). · **Forme finale** : Q et R donnés.
- **Niveaux** :
  - L1 : coefficients et a déjà placés ; une case sur deux à remplir.
  - L2 : l'élève place les coefficients (avec un 0) et a ; les produits sont donnés.
  - L3 : tableau vide ; l'élève choisit d'abord a parmi {2 ; −2} pour x + 2.
  - L4 : tableau libre, puis Q et R ; diviseur x + a ou x − a.
  - L5 : P(a) pour trois valeurs, ou division par (2x − 1) (on divise par x − 1/2, puis Q est divisé par 2).
- **Générateur** : deg P ∈ [3 ; 5], coefficients dans [−6 ; 6], au moins un coefficient nul à partir de L2 ; a ∈ [−3 ; 3] ∖ {0}. On tire Q et R d'abord, puis P = (x − a)Q + R, pour que |coefficients de P| ≤ 20. Gabarit 2 : « Calculer P(a) » sans parler de division.
- **Corrigé type** : diviser P(x) = 2x⁴ − 3x³ + 5x − 6 par x − 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Coefficients : 2, −3, 0, 5, −6 ; a = 2 | Écrire tous les coefficients |
  | 2 | b : 2 ; −3 + 4 = 1 ; 0 + 2 = 2 ; 5 + 4 = 9 ; −6 + 18 = 12 | Multiplier, ajouter |
  | 3 | Q(x) = 2x³ + x² + 2x + 9, R = 12 = P(2) | Lire Q et R |
- **Aides** : 1 « N'oublie pas le 0 pour x². Pour x − 2, on utilise 2. » · 2 « Case suivante : −3 + 2·2 = … » · 3 la ligne 2.
- **Variantes d'examen** : `coef` (« coefficient de x dans Q ») ; `mcq` (distracteurs `g0_horner_sign`, `g0_horner_zero`, `g0_horner_degree`).
- **Pièges** : `g0_horner_sign`, `g0_horner_zero`, `g0_horner_degree`.
- **Sous-buts → crédit** : aucun.

### `g0-long-div` — Division euclidienne
- **Année** 12 · **Prérequis** `@alg:C-developper` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:C-developper` : soustraire B multiplié par le terme du quotient, termes ordonnés.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : on divise le terme dominant de A par celui de B, on multiplie B par ce terme, on soustrait, et on recommence tant que deg R ≥ deg B. Chaque étape s'écrit A = BQ + R : c'est une identité qu'on peut vérifier.
- **Juge** : `poly` `{v:'x'}` · **Forme finale** : A = BQ + R avec deg R < deg B ; sinon `stay` « Le reste a encore un degré ≥ deg B : continue. »
- **Niveaux** :
  - L1 : la potence est dessinée ; le terme du quotient est donné, l'élève écrit le produit et la soustraction.
  - L2 : l'élève trouve le terme du quotient, le produit est donné.
  - L3 : lignes A = BQ + R, avec le choix « terme suivant du quotient » dans un menu de 3.
  - L4 : libre ; B de degré 2.
  - L5 : B de degré 2 avec un coefficient dominant ≠ 1 (quotient rationnel), ou deux divisions enchaînées.
- **Générateur** : on tire B (deg 2, unitaire jusqu'à L4), Q (deg 1 ou 2) et R (deg ≤ deg B − 1, R ≠ 0 trois fois sur quatre), coefficients dans [−5 ; 5], puis A = BQ + R. On impose un coefficient nul dans A une fois sur deux. Gabarit 2 : « Quel est le reste de A par B ? » (seul R est demandé à la fin).
- **Corrigé type** : diviser A = 2x⁴ + x³ − 3x + 1 par B = x² + x − 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | A = B·2x² + (−x³ + 2x² − 3x + 1) | Premier terme, soustraire |
  | 2 | A = B·(2x² − x) + (3x² − 4x + 1) | Deuxième terme |
  | 3 | A = B·(2x² − x + 3) + (−7x + 4) | Troisième terme ; deg R = 1 < 2 |
- **Aides** : 1 « Divise 2x⁴ par x² : c'est le premier terme du quotient. » · 2 « A − 2x²·B = −x³ + … » · 3 la ligne 1.
- **Variantes d'examen** : `coef` (« coefficient constant de R ») ; `mcq` (distracteurs `g0_div_subtract`).
- **Pièges** : `g0_div_subtract`.
- **Sous-buts → crédit** : aucun.

### `g0-factor-thm` — Théorème du reste, racine évidente
- **Année** 12 · **Prérequis** `g0-horner` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : le reste de P par x − a est P(a). Donc a est racine si et seulement si x − a divise P. Si P est à coefficients entiers et unitaire, une racine entière divise le terme constant : on essaie ±1, ±2… Exemple : P = x³ − 2x² − 5x + 6, P(1) = 0, donc x − 1 divise P.
- **Juge** : `value` pour P(a) ; `poly` `{v:'x'}` pour la factorisation · **Forme finale** : reste demandé, ou P écrit (x − a)·Q.
- **Niveaux** :
  - L1 : « Reste de P par x − 3 ? » ; P(3) à calculer avec des trous.
  - L2 : diviseur x + a (il faut P(−a)).
  - L3 : choisir les candidats racines dans la liste des diviseurs du terme constant.
  - L4 : trouver une racine évidente, puis diviser (Horner).
  - L5 : P de degré 3 ou 4 entièrement factorisé à partir d'une racine évidente.
- **Générateur** : on tire les racines entières dans [−4 ; 4] (2 ou 3 racines, éventuellement un facteur du 2e degré irréductible), puis P = produit. On garde |terme constant| ≤ 24 pour que la liste des diviseurs reste courte. Gabarit 2 : « Reste de P par x + a » avec P quelconque de degré 4.
- **Corrigé type** : P(x) = x³ − 2x² − 5x + 6. (a) Reste par x + 1 ? (b) Factoriser P.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | R = P(−1) = −1 − 2 + 5 + 6 = 8 | Théorème du reste |
  | 2 | Candidats : ±1, ±2, ±3, ±6 ; P(1) = 0 | Racine évidente |
  | 3 | P = (x − 1)(x² − x − 6) | Diviser (→ `g0-horner`) |
  | 4 | P = (x − 1)(x − 3)(x + 2) | Factoriser le trinôme (→ `@alg:D-trinome`) |
- **Aides** : 1 « Le reste par x + 1, c'est P(−1). » · 2 « Essaie les diviseurs de 6 : P(1) = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g0_rem_sign` : P(1) = 0 au lieu de P(−1) = 8) ; `tf` « Si P(2) = 0, alors x + 2 divise P » (faux : P = x − 2).
- **Pièges** : `g0_rem_sign`.
- **Sous-buts → crédit** : diviser → `g0-horner` ; factoriser le trinôme → `@alg:D-trinome`.

### `g0-multiplicity` — Multiplicité d'une racine
- **Année** 12 · **Prérequis** `g0-factor-thm` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g0-factor-thm` : a racine ⇔ (x − a) divise P.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : a est racine de multiplicité k si (x − a)ᵏ divise P mais pas (x − a)ᵏ⁺¹. On applique Horner en a plusieurs fois de suite, tant que le reste est nul.
- **Juge** : `table` Horner enchaîné (`iter`), puis `poly` pour la factorisation · **Forme finale** : multiplicité, et P = (x − a)ᵏ·Q avec Q(a) ≠ 0.
- **Niveaux** :
  - L1 : deux Horner déjà faits, l'élève fait le troisième et conclut.
  - L2 : Horner à faire, avec l'invite « encore ? » après chaque reste.
  - L3 : choisir : « encore Horner en a », « s'arrêter », « factoriser le quotient ».
  - L4 : libre.
  - L5 : P de degré 4 ou 5 ; donner toutes les racines avec leurs multiplicités.
- **Générateur** : racine a ∈ [−2 ; 2] ∖ {0} de multiplicité 2 ou 3, autre racine b ≠ a dans [−3 ; 3] ; P = (x − a)ᵏ(x − b)ᵐ, deg ≤ 5, coefficients ≤ 30.
- **Corrigé type** : multiplicité de 1 dans P = x⁴ − x³ − 3x² + 5x − 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Horner en 1 : 1, 0, −3, 2 \| 0 → Q₁ = x³ − 3x + 2 | Premier Horner |
  | 2 | Horner en 1 : 1, 1, −2 \| 0 → Q₂ = x² + x − 2 | Deuxième |
  | 3 | Horner en 1 : 1, 2 \| 0 → Q₃ = x + 2 | Troisième |
  | 4 | Q₃(1) = 3 ≠ 0 : multiplicité 3 ; P = (x − 1)³(x + 2) | Conclure |
- **Aides** : 1 « Refais Horner en 1 sur le quotient, tant que le reste vaut 0. » · 2 « Q₁ = x³ + 0x² − 3x + 2 : coefficients 1, 0, … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g0_mult_once`) ; `tf` « Si P(a) = 0 et que le quotient Q vérifie Q(a) = 0, alors a est racine double » (faux : elle peut être triple, x³).
- **Pièges** : `g0_mult_once`, `g0_horner_zero`.
- **Sous-buts → crédit** : Horner → `g0-horner`.

### `g0-factor-real` — Factoriser sur ℝ
- **Année** 12 · **Prérequis** `@alg:H-discriminant`, `@alg:D-factoriser-completement`, `g0-factor-thm` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:D-factoriser-completement` : facteur commun et groupements avant de chercher des racines.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : sur ℝ, un polynôme se factorise en facteurs du 1er degré et en trinômes à Δ < 0. On cherche d'abord un facteur commun ou un groupement, puis des racines évidentes, puis on teste Δ des trinômes restants.
- **Juge** : `poly` `{v:'x', target:'factored-R'}` · **Forme finale** : produit de facteurs unitaires du 1er degré (puissances regroupées), de trinômes à Δ < 0 et d'une constante. Un trinôme à Δ ≥ 0 restant donne `stay`.
- **Niveaux** :
  - L1 : groupement déjà indiqué, l'élève complète.
  - L2 : une racine évidente donnée.
  - L3 : choisir : « facteur commun », « groupement », « racine évidente », « identité remarquable », « Δ ».
  - L4 : libre, degré 4.
  - L5 : degré 4 ou 5, avec un trinôme irréductible et une racine double.
- **Générateur** : produit de 1 ou 2 facteurs linéaires (racines dans [−3 ; 3]), d'au plus un trinôme x² + px + q avec p² − 4q < 0, p ∈ [−3 ; 3], q ∈ [1 ; 6] ; développé. Gabarit 2 : polynôme en x² (x⁴ − 5x² + 4). On rejette les cas où le polynôme développé a un coefficient > 30.
- **Corrigé type** : factoriser P = x⁴ + x³ − x − 1 sur ℝ.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x³(x + 1) − (x + 1) | Grouper |
  | 2 | (x + 1)(x³ − 1) | Facteur commun |
  | 3 | (x + 1)(x − 1)(x² + x + 1) | Identité a³ − b³ (ou racine 1 et Horner) |
  | 4 | Δ = 1 − 4 = −3 < 0 : x² + x + 1 est irréductible sur ℝ | Tester Δ (→ `@alg:H-discriminant`) |
- **Aides** : 1 « Regroupe les deux premiers termes et les deux derniers. » · 2 « x³(x + 1) − 1·(x + 1) = (x + 1)(…) » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g0_irred_split`, facteur oublié) ; `tf` « Tout polynôme réel de degré 3 a une racine réelle » (vrai).
- **Pièges** : `g0_irred_split`, `g0_mult_once`.
- **Sous-buts → crédit** : tester Δ → `@alg:H-discriminant` ; racine évidente → `g0-factor-thm`.

### `g0-factor-complex` — Factoriser sur ℂ, racines conjuguées
- **Année** 12.5 · **Prérequis** `g0-factor-real`, `g8-algebraic`, `g0-long-div` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g0-factor-real` : on factorise sur ℝ, puis chaque trinôme à Δ < 0 sur ℂ.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Tant que `g8-algebraic` n'est pas construit (U4), le parcours le remplace par `lit-identities` (`UNBUILT`).
- **Intro** : si P est à coefficients **réels** et z une racine non réelle, alors z̄ est aussi racine, et (x − z)(x − z̄) = x² − 2Re(z)x + |z|² est un trinôme réel. Sur ℂ, tout polynôme de degré n a n racines comptées avec multiplicité.
- **Juge** : `poly` `{v:'x', complex:true, target:'factored-C'}` · **Forme finale** : produit de facteurs (x − zᵢ) et d'une constante.
- **Niveaux** :
  - L1 : racine 2i et sa conjuguée données ; l'élève forme x² + 4 et divise.
  - L2 : l'élève écrit la conjuguée et le trinôme réel.
  - L3 : choisir : « conjuguée », « produit (x − z)(x − z̄) », « division », « Δ < 0 → racines complexes ».
  - L4 : libre, degré 4 avec une racine donnée.
  - L5 : degré 4 sans racine donnée mais avec une indication (« P a une racine imaginaire pure »).
- **Générateur** : z = p + qi, p ∈ [−2 ; 2], q ∈ [1 ; 3] ; second facteur réel x² + sx + t à Δ < 0 ou deux racines réelles ; P développé, coefficients ≤ 30. Gabarit 2 (CMS) : « P admet une racine imaginaire pure » : on pose x = iy et on sépare parties réelle et imaginaire.
- **Corrigé type** : P = x⁴ − 2x³ + 6x² − 8x + 8 admet la racine 2i. Factoriser sur ℂ.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | −2i est aussi racine (P réel) | Conjuguée |
  | 2 | (x − 2i)(x + 2i) = x² + 4 | Trinôme réel |
  | 3 | P = (x² + 4)(x² − 2x + 2) | Diviser (→ `g0-long-div`) |
  | 4 | x² − 2x + 2 : Δ = −4, racines 1 ± i | Racines complexes |
  | 5 | P = (x − 2i)(x + 2i)(x − 1 − i)(x − 1 + i) | Factoriser sur ℂ |
- **Aides** : 1 « P est réel : la conjuguée de 2i est aussi racine. » · 2 « (x − 2i)(x + 2i) = x² + … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g0_conj_missing`) ; `tf` « Un polynôme de degré 3 à coefficients complexes a toujours une racine réelle » (faux : (x − i)³ n'a que la racine i).
- **Pièges** : `g0_conj_missing`, `g0_irred_split`.
- **Sous-buts → crédit** : diviser → `g0-long-div` ; racines complexes → `g8-algebraic`. Crédit indirect seulement : `@alg:D-trinome`.

### `g0-conditions` — Polynôme défini par des conditions
- **Année** 12.5 · **Prérequis** `g0-factor-complex`, `g0-factor-thm`, `g0-identify` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g0-identify` : les conditions restantes se traduisent par identification des coefficients.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : on écrit d'abord la **forme** que les conditions imposent (degré, unitaire, racines connues), avec des inconnues. Chaque condition restante donne une équation. Exemple : réel, unitaire, degré 3, racine 2 + i : P = (x² − 4x + 5)(x − c).
- **Juge** : `poly` `{v:'x', params:['c']}` pour les lignes de forme ; `solset` `{v:'c'}` pour l'équation en c ; `poly` pour le P final · **Forme finale** : P développé et ordonné.
- **Niveaux** :
  - L1 : la forme P = (x² − 4x + 5)(x − c) est donnée ; l'élève écrit l'équation du reste.
  - L2 : l'élève écrit la forme, la conjuguée étant rappelée.
  - L3 : choisir la forme parmi 3 (avec ou sans la conjuguée, unitaire ou non).
  - L4 : libre, MAN 2017 avec d'autres nombres.
  - L5 : 4 conditions (CMS série 19 : P(1) = 0, reste par x − i donné, produit des racines donné).
- **Générateur** : on tire la réponse : z = p + qi (p ∈ [−2 ; 3], q ∈ [1 ; 2]) et c ∈ [−4 ; 4] ; P = (x² − 2px + p² + q²)(x − c). On tire a ∈ [−3 ; 3] pour la condition « reste par x − a », et on affiche P(a). On rejette P(a) = 0 et |P(a)| > 60.
- **Corrigé type** : P réel, unitaire, de degré 3, admet 2 + i comme racine ; le reste de P par x − 1 vaut 6.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 2 − i est racine | Conjuguée |
  | 2 | (x − 2 − i)(x − 2 + i) = x² − 4x + 5 | Trinôme réel (→ `g0-factor-complex`) |
  | 3 | P = (x² − 4x + 5)(x − c) | Forme imposée |
  | 4 | P(1) = 2(1 − c) = 6 | Théorème du reste (→ `g0-factor-thm`) |
  | 5 | c = −2 | Résoudre |
  | 6 | P = x³ − 2x² − 3x + 10 | Développer |
- **Aides** : 1 « Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c. » · 2 « Reste par x − 1 = P(1) = (1 − 4 + 5)(1 − c) » · 3 la ligne 4.
- **Variantes d'examen** : `open` (6 points, voir Exemples) ; `mcq` (distracteurs `g0_conj_missing`, `g0_rem_sign`).
- **Pièges** : `g0_conj_missing`, `g0_rem_sign`.
- **Sous-buts → crédit** : trinôme réel → `g0-factor-complex` ; théorème du reste → `g0-factor-thm`.

### `g0-div-param` — Divisibilité avec un paramètre
- **Année** 12.5 · **Prérequis** `g0-factor-thm`, `g0-long-div`, `g0-factor-real` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g0-long-div` : quand B n'a pas de racines simples, on divise et on annule le reste.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : B divise P si et seulement si le reste est nul. Si B = (x − a)(x − b) avec a ≠ b, cela revient à P(a) = 0 **et** P(b) = 0. On résout les deux conditions et on garde les paramètres communs.
- **Juge** : `solset` `{v:'λ'}` pour les conditions ; ou `poly` `{v:'x', params:['λ']}` pour le chemin par la division ; `poly` pour la factorisation finale · **Forme finale** : valeurs de λ, puis racines de P.
- **Niveaux** :
  - L1 : P(1) est calculé ; l'élève calcule P(−1) et intersecte.
  - L2 : décision « par les racines de B » ou « par la division » (les deux justes).
  - L3 : choisir l'action à chaque ligne.
  - L4 : libre, avec la factorisation finale.
  - L5 : B de degré 2 avec racine double (il faut P(a) = 0 et une 2e condition par Horner), ou deux paramètres.
- **Générateur** : on fixe B = (x − a)(x − b), a, b ∈ [−2 ; 2] distincts ; on tire les deux équations en λ voulues (P(a) = (λ − r₁)(λ − r₂), P(b) = (λ − r₂)(λ − r₃), une seule racine commune r₂) ; on résout pour les coefficients de P (méthode : P(a) et P(b) fixent la somme et la différence de deux coefficients dépendant de λ). À λ = r₂, P doit se factoriser sur ℤ.
- **Corrigé type** : λ pour que x² − 1 divise P(x) = x⁴ + 2x³ − x² + (λ − 4)x + (λ − 2)². Donner alors les racines de P.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | P(1) = λ² − 3λ + 2 = 0, donc λ ∈ {1 ; 2} | Première condition (→ `g0-factor-thm`) |
  | 2 | P(−1) = λ² − 5λ + 6 = 0, donc λ ∈ {2 ; 3} | Deuxième condition |
  | 3 | λ = 2 | Intersecter |
  | 4 | P = x⁴ + 2x³ − x² − 2x = x(x + 2)(x² − 1) | Factoriser |
  | 5 | Racines : 0, −2, 1, −1 | Conclure |

  Chemin par la division (accepté) : R(x) = (λ − 2)x + (λ − 2)², nul si et seulement si λ = 2.
- **Aides** : 1 « x² − 1 = (x − 1)(x + 1) : P(1) et P(−1) doivent être nuls. » · 2 « P(−1) = 1 − 2 − 1 − (λ − 4) + (λ − 2)² = … » · 3 la ligne 2.
- **Variantes d'examen** : `open` (4 points) ; `mcq` (distracteur `g0_param_one_cond` : {1 ; 2}).
- **Pièges** : `g0_param_one_cond`, `g0_rem_sign`.
- **Sous-buts → crédit** : conditions → `g0-factor-thm` ; factoriser → `g0-factor-real`.

### `g0-gcd` — PGCD de polynômes, racines communes
- **Année** 12.5 · **Prérequis** `g0-long-div`, `g0-factor-real` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g0-factor-real` : les racines communes se lisent sur le PGCD factorisé.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Pas encore fait : le gabarit « PGCD = 1 » et le niveau 5 avec paramètre (CMS série 18).
- **Intro** : algorithme d'Euclide : on divise A par B, puis B par le reste, et ainsi de suite. Le dernier reste non nul, rendu unitaire, est le PGCD. Ses racines sont les racines communes de A et B.
- **Juge** : `poly` `{v:'x'}` pour chaque division ; `poly` `{target:'monic'}` pour le PGCD · **Forme finale** : PGCD unitaire.
- **Niveaux** :
  - L1 : la première division est faite ; l'élève fait la seconde.
  - L2 : l'élève fait les divisions, on lui dit quand s'arrêter.
  - L3 : choisir : « diviser A par B », « diviser B par R₁ », « s'arrêter, PGCD = … ».
  - L4 : libre.
  - L5 (CMS série 18) : paramètre a pour que A et B aient deux racines communes réelles.
- **Générateur** : on tire D (PGCD, unitaire, degré 1 ou 2, racines entières) et deux cofacteurs premiers entre eux de degré 1 ; A = D·U, B = D·V, coefficients ≤ 20. Gabarit 2 : PGCD = 1 (polynômes sans racine commune), une fois sur cinq.
- **Corrigé type** : PGCD de A = x³ − 2x² − x + 2 et B = x³ − x² − 4x + 4.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | A = B·1 + (−x² + 3x − 2) | Première division (→ `g0-long-div`) |
  | 2 | B = (−x² + 3x − 2)(−x − 2) + 0 | Deuxième division |
  | 3 | PGCD = x² − 3x + 2 = (x − 1)(x − 2) | Dernier reste non nul, unitaire |
  | 4 | Racines communes : 1 et 2 | Conclure |
- **Aides** : 1 « Divise A par B, puis B par le reste. » · 2 « A − B = … » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (distracteur `g0_gcd_last`) ; `open` (format CMS, 5 points, voir Exemples).
- **Pièges** : `g0_gcd_last`, `g0_div_subtract`.
- **Sous-buts → crédit** : division → `g0-long-div`.

### `g0-pfd-simple` — Éléments simples : facteurs du 1er degré distincts
- **Année** 12.5 · **Prérequis** `g0-identify`, `g0-factor-real`, `@alg:G-additionner` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g0-factor-real` : factoriser le dénominateur (degré 3 : racine évidente) ; `@alg:G-additionner` : vérifier la décomposition en remettant au même dénominateur.
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a). Le niveau 5 ne s'enchaîne pas encore avec une primitive (A1, étape U2).
- **Intro** : si deg N < deg D et D = (x − a)(x − b) avec a ≠ b, alors N/D = A/(x − a) + B/(x − b). A = N(a)/(a − b) : on « cache » le facteur x − a et on remplace x par a. Cette décomposition prépare les primitives (A1) et Laplace (F).
- **Juge** : décision « forme : A/(x − 2) + B/(x + 1) » (structure comparée à la forme attendue) ; puis `equiv` `{vars:['x'], target:'partial-fractions'}` · **Forme finale** : somme d'éléments simples à coefficients numériques.
- **Niveaux** :
  - L1 : D factorisé, forme donnée ; l'élève calcule A par la méthode du cache.
  - L2 : D à factoriser ; forme donnée.
  - L3 : choisir la méthode pour chaque coefficient : « cache », « identification », « valeur particulière ».
  - L4 : libre, 2 ou 3 facteurs.
  - L5 : 3 facteurs, puis enchaîné avec une primitive en A1 (si la compétence A1 est débloquée).
- **Générateur** : racines a, b (, c) distinctes dans [−3 ; 3], coefficients A, B (, C) dans [−4 ; 4] ∖ {0} ; N/D reconstruit et réduit. On rejette les cas où N et D ont un facteur commun.
- **Corrigé type** : décomposer (x + 7)/(x² − x − 2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (x + 7)/((x − 2)(x + 1)) | Factoriser D (→ `@alg:D-trinome`) |
  | 2 | = A/(x − 2) + B/(x + 1) | Forme |
  | 3 | A = (2 + 7)/(2 + 1) = 3 | Cache en x = 2 |
  | 4 | B = (−1 + 7)/(−1 − 2) = −2 | Cache en x = −1 |
  | 5 | = 3/(x − 2) − 2/(x + 1) | Écrire |
- **Aides** : 1 « Factorise le dénominateur, puis un terme par facteur. » · 2 « Pour A, cache (x − 2) et pose x = 2 : (2 + 7)/(2 + 1) » · 3 la ligne 3.
- **Variantes d'examen** : `coef` (« que vaut B ? ») ; `mcq` (distracteur `g0_coverup_sign`).
- **Pièges** : `g0_coverup_sign`.
- **Sous-buts → crédit** : factoriser D → `@alg:D-trinome` ; forme → `g0-identify`.

### `g0-pfd-general` — Éléments simples : facteurs répétés, trinômes irréductibles, partie entière
- **Année** 12.5 · **Prérequis** `g0-pfd-simple`, `g0-long-div` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 9 novembre 2026 (étape U1, partie a).
- **Intro** : si deg N ≥ deg D, on divise d'abord. Un facteur (x − a)² demande deux termes : A/(x − a) + B/(x − a)². Un trinôme irréductible demande (Bx + C)/(x² + px + q).
- **Juge** : comme `g0-pfd-simple` ; la forme est contrôlée terme par terme · **Forme finale** : partie entière + éléments simples.
- **Niveaux** :
  - L1 : forme donnée, un coefficient par le cache, les autres par identification avec trous.
  - L2 : forme à choisir parmi 3 (dont `g0_pfd_form`).
  - L3 : choisir : « diviser d'abord », « forme », « cache », « identifier ».
  - L4 : libre : un trinôme irréductible, ou une racine double.
  - L5 : partie entière + racine double + trinôme, ou CMS série 20.
- **Générateur** : on tire la décomposition (partie entière de degré ≤ 1, termes A/(x − a), B/(x − a)², (Bx + C)/(x² + q) avec q ∈ {1 ; 4}), coefficients dans [−4 ; 4], puis on réduit au même dénominateur. On rejette les numérateurs à coefficients > 30.
- **Corrigé type** : décomposer (5x² + 2x + 1)/((x − 1)(x² + 1)).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | = A/(x − 1) + (Bx + C)/(x² + 1) | Forme (trinôme : Bx + C) |
  | 2 | A = (5 + 2 + 1)/(1 + 1) = 4 | Cache en x = 1 (→ `g0-pfd-simple`) |
  | 3 | 5x² + 2x + 1 = 4(x² + 1) + (Bx + C)(x − 1) | Tout au même dénominateur |
  | 4 | x² : 5 = 4 + B ; constante : 1 = 4 − C | Identifier (→ `g0-identify`) |
  | 5 | = 4/(x − 1) + (x + 3)/(x² + 1) | Écrire |

  Exemple L4 avec division : (2x³ + x² + 3)/(x² − 1) = 2x + 1 + 3/(x − 1) − 1/(x + 1).
- **Aides** : 1 « Sur x² + 1, le numérateur est de la forme Bx + C. » · 2 « Coefficient de x² : 5 = A + B » · 3 la ligne 4.
- **Variantes d'examen** : `coef` ; `open` (4 points, voir Exemples).
- **Pièges** : `g0_pfd_form`, `g0_pfd_no_div`, `g0_coverup_sign`.
- **Sous-buts → crédit** : cache → `g0-pfd-simple` ; identifier → `g0-identify` ; diviser → `g0-long-div`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g0_horner_sign` | sign | E | `g0-horner` | `g0-horner` | x + 2 : Horner en 2 → Horner en −2 | Refaire le tableau de prev avec −a au lieu de a. | « Diviser par x + 2, c'est diviser par x − (−2) : on utilise −2. » |
| `g0_horner_zero` | rule | E | `g0-horner` | `g0-horner` | 2x⁴ − 3x³ + 5x − 6 : 2, −3, 5, −6 → 2, −3, 0, 5, −6 | Refaire Horner sur la liste des coefficients de P sans ses zéros. | « Il manque x² : son coefficient est 0, il faut une case pour lui. Sinon chaque coefficient glisse d'un degré. » |
| `g0_horner_degree` | rule | E | `g0-horner` | `g0-horner` | Q = 2x⁴ + x³ + 2x² + 9x + 12 → Q = 2x³ + x² + 2x + 9, R = 12 | Lire la ligne b de prev comme un polynôme de degré deg P (reste compris), ou multiplier Q par x. | « Le quotient a un degré de moins que P, et la dernière case est le reste. » |
| `g0_div_subtract` | sign | E | `g0-long-div` | `@alg:C-developper` | A − 2x²B = −x³ − 2x² + … → −x³ + 2x² + … | Dans l'étape R − t·B, ne changer que le signe du terme dominant de t·B (les autres termes sont ajoutés). | « On soustrait tout le produit 2x²·B = 2x⁴ + 2x³ − 2x² : −(−2x²) donne +2x². » |
| `g0_rem_sign` | sign | E | `g0-factor-thm` | `g0-factor-thm` | reste par x + 1 = P(1) → P(−1) | `wrongValues` : P(a) au lieu de P(−a) pour le diviseur x + a. | « x + 1 s'annule en −1 : le reste est P(−1) = … » |
| `g0_mult_once` | rule | E | `g0-multiplicity` | `g0-multiplicity` | (x − 1)(x + 2) → (x − 1)³(x + 2) | Dans la factorisation de prev, remplacer chaque (x − a)ᵏ par (x − a). | « Développe ta ligne : son degré est 2, celui de P est 4. Refais Horner en 1 sur le quotient. » |
| `g0_irred_split` | rule | E | `g0-factor-real` | `@alg:D-factoriser-completement` | x² + 4 = (x − 2)(x + 2) → irréductible sur ℝ | Remplacer x² + c² par (x − c)(x + c) ; pour x² + px + q à Δ < 0, mettre √\|Δ\| à la place de √Δ dans la formule. | « (x − 2)(x + 2) = x² − 4. Pour x² + 4, Δ = −16 < 0 : pas de racine réelle. » |
| `g0_conj_missing` | rule | E | `g0-factor-complex` | `g0-factor-complex` | P = (x − 2 − i)(x − c)(…) sans 2 − i | `wrongValues` : le polynôme unitaire construit avec la racine z et les autres conditions, sans z̄ (coefficients non réels). | « P est réel : si 2 + i est racine, 2 − i l'est aussi. Ton P a des coefficients avec i. » |
| `g0_param_one_cond` | logic | E | `g0-div-param` | `g0-factor-thm` | λ ∈ {1 ; 2} → λ = 2 | Renvoyer l'ensemble des solutions de la première condition seule. | « Avec λ = 1, P(−1) = 2 ≠ 0 : x + 1 ne divise pas P. Les deux conditions doivent tenir. » |
| `g0_gcd_last` | method | E | `g0-gcd` | `g0-gcd` | PGCD = B → dernier reste non nul | Renvoyer le diviseur de l'avant-dernière division, ou le reste nul. | « Le PGCD est le dernier reste non nul : −x² + 3x − 2, rendu unitaire. » |
| `g0_coverup_sign` | sign | E | `g0-pfd-simple` | `g0-pfd-simple` | A = (−2 + 7)/(−2 + 1) → (2 + 7)/(2 + 1) | Calculer chaque coefficient de prev en −a au lieu de a. | « On cache x − 2 et on pose x = 2, la valeur qui l'annule. » |
| `g0_pfd_form` | method | E | `g0-pfd-general` | `g0-pfd-general` | A/(x − 1)² → A/(x − 1) + B/(x − 1)² ; B/(x² + 1) → (Bx + C)/(x² + 1) | Dans la ligne de forme de prev, retirer le terme de puissance 1 d'un facteur répété, ou mettre une constante sur un trinôme. | « Avec ta forme, le numérateur commun a un degré trop faible : x² + 3x + 4 ne peut pas s'écrire ainsi. » |
| `g0_pfd_no_div` | method | E | `g0-pfd-general` | `g0-long-div` | (2x³ + x² + 3)/(x² − 1) = A/(x − 1) + B/(x + 1) → 2x + 1 + … | Écrire la forme sans partie entière quand deg N ≥ deg D. | « deg N = 3 ≥ deg D = 2 : divise d'abord, la partie entière est 2x + 1. » |

## Exemples de type examen

**E1 (6 points, d'après MAN 2017).** Déterminer le polynôme réel unitaire P de degré 3 qui admet 3 − i comme racine et dont le reste par x + 1 vaut 34.

| Étape | Attendu | Points |
|---|---|---|
| Conjuguée | 3 + i est racine | 1 |
| Trinôme | x² − 6x + 10 | 1,5 |
| Forme | P = (x² − 6x + 10)(x − c) | 1 |
| Condition | P(−1) = 17(−1 − c) = 34, donc c = −3 | 1,5 |
| Résultat | P = x³ − 3x² − 8x + 30 | 1 |

**E2 (4 points, d'après l'examen blanc MAN 2018).** P(x) = x⁴ + x³ − 3x² + (3λ − 7)x + 4λ² − 10λ + 2. Déterminer λ pour que x² − 4 divise P, puis donner toutes les racines de P dans ℂ.

| Étape | Attendu | Points |
|---|---|---|
| P(2) = 0 | 4λ² − 4λ = 0, donc λ ∈ {0 ; 1} | 1 |
| P(−2) = 0 | 4λ² − 16λ + 12 = 0, donc λ ∈ {1 ; 3} | 1 |
| λ | λ = 1 | 0,5 |
| Racines | P = (x² − 4)(x² + x + 1) : ±2 et (−1 ± i√3)/2 | 1,5 |

**E3 (4 points).** Montrer que −1 est racine de P = x⁴ + x³ − 3x² − 5x − 2, trouver sa multiplicité et factoriser P.

| Étape | Attendu | Points |
|---|---|---|
| Horner 1 | reste 0, Q₁ = x³ − 3x − 2 | 1 |
| Horner 2 et 3 | Q₂ = x² − x − 2, Q₃ = x − 2 | 1,5 |
| Arrêt | Q₃(−1) = −3 ≠ 0 : multiplicité 3 | 0,5 |
| Factorisation | P = (x + 1)³(x − 2) | 1 |

**E4 (5 points, d'après la série 18 du CMS).** Déterminer a ∈ ℝ pour que P = x³ − 2x² − (a + 2)x + 2a et Q = x² − 4x + a aient deux racines réelles communes.

| Étape | Attendu | Points |
|---|---|---|
| Idée | Deux racines communes et deg Q = 2 : Q divise P, P = Q·(x + b) | 1 |
| Identification | b − 4 = −2 ; a − 4b = −(a + 2) ; ab = 2a | 2 |
| Résolution | b = 2, a = 3 | 1 |
| Vérification | Q = (x − 1)(x − 3) : racines réelles | 1 |

**E5 (4 points, d'après la série 20 du CMS).** Décomposer en éléments simples (x² + 3x + 4)/((x − 1)(x + 1)²).

| Étape | Attendu | Points |
|---|---|---|
| Forme | A/(x − 1) + B/(x + 1) + C/(x + 1)² | 1 |
| A et C | A = 8/4 = 2 (cache en 1) ; C = 2/(−2) = −1 (cache en −1) | 1,5 |
| B | x² : 1 = A + B, donc B = −1 | 1 |
| Résultat | 2/(x − 1) − 1/(x + 1) − 1/(x + 1)² | 0,5 |

---
# G1. Fonctions et inéquations

Unité `fonctions` · préfixe `g1-` · pièges `g1_` · Statut : à faire. L'id `fonctions` est déjà celui d'une unité de l'école : prendre `fonctions-g` (README §8.1).

**Sources** : MAN, examen Math 1A 2017 (Q2, inéquation irrationnelle, 11 pts), examen Math 1B 2017 (Q3, bijection, 11 pts), examen blanc 1A 2018 (Q1, valeur absolue) et examen blanc 1B 2018 avec son corrigé (Q2, bijection, 7 pts) ; CMS, Analyse I, séries 1 à 4 (inéquations, paramètres, Viète, irrationnelles) et 7 (parité) ; Analyse I GM, série 0 de 2019 (ex. 11, 14, 19) et corrigé de la série 3 de 2017 (valeur absolue par cas).
**Notation** : D_f pour le domaine. Ensembles de solutions en intervalles `]a ; b]`, union `∪`, ensemble fini `{2/3 ; 4}`. Une ligne de cas s'écrit « Cas x ≥ 3/2 : ». Tableau de signes : `+`, `−`, `0`, `‖`.
**Prérequis extérieurs** : `@alg:D-factoriser-completement`, `@alg:F-isoler`, `@alg:G-valeurs-interdites`, `@alg:G-additionner`, `@alg:H-discriminant`, `@alg:I-param-1er-degre`, `@alg:I-param-2e-degre`. Crédit indirect seulement : `@alg:D-trinome`, `@alg:E-produit-en-croix`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-counterexample`, `g9-intervals`, `g9-proof-contra`, `g3-reduce`.

Toutes les équations et inéquations de ce module sont jugées par `solset` `{v:'x', domain:'R'}`, avec les ajouts du début du fichier (cas, ligne de domaine). La forme finale est un ensemble en intervalles ou fini.

## Compétences

### `g1-domain` — Domaine de définition
- **Année** 12 · **Prérequis** `g9-intervals`, `@alg:G-valeurs-interdites` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:G-valeurs-interdites` : valeurs interdites d'un dénominateur.
- **Intro** : on écrit **toutes** les conditions : dénominateur ≠ 0, expression sous une racine carrée ≥ 0 (> 0 si elle est aussi au dénominateur). Puis on les combine avec « et ». Exemple : f(x) = √(x + 3)/(x² − 4) : x ≥ −3 et x ≠ ±2.
- **Juge** : `solset` (la ligne finale est comparée à D_f calculé par `numeric.js`) · **Forme finale** : union d'intervalles.
- **Niveaux** :
  - L1 : les conditions sont listées ; l'élève les résout.
  - L2 : l'élève écrit les conditions (cases « dénominateur », « racine ») puis les résout.
  - L3 : choisir les conditions à écrire parmi une liste (dont des leurres : « numérateur ≠ 0 »).
  - L4 : libre ; deux racines ou une racine au dénominateur.
  - L5 : domaine puis résolution d'une équation sur ce domaine (CMS série 4 : √(√(x² − 5x + 4) + 5x − 2) = 5).
- **Générateur** : on assemble 2 ou 3 briques : dénominateur (x − a)(x − b) ou x² − c², radicande linéaire px + q ou quadratique à racines entières, racine au dénominateur. Racines dans [−5 ; 5]. On rejette D_f = ∅ et les cas où une condition est inutile (incluse dans une autre), sauf au niveau 4 où c'est voulu une fois sur trois.
- **Corrigé type** : domaine de f(x) = √(x + 3)/(x² − 4).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x + 3 ≥ 0 et x² − 4 ≠ 0 | Écrire les conditions |
  | 2 | x ≥ −3 et x ≠ −2 et x ≠ 2 | Résoudre chacune |
  | 3 | D_f = [−3 ; −2[ ∪ ]−2 ; 2[ ∪ ]2 ; +∞[ | Combiner (→ `g9-intervals`) |
- **Aides** : 1 « Deux dangers : la racine et le dénominateur. » · 2 « x + 3 ≥ 0 et x² − 4 ≠ … » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (distracteurs `g1_domain_partial`, `g9_bracket`) ; `tf` « √(x²) est définie sur [0 ; +∞[ seulement » (faux : elle l'est sur ℝ).
- **Pièges** : `g1_domain_partial`, `g9_bracket`.
- **Sous-buts → crédit** : combiner → `g9-intervals`.

### `g1-compose` — Composition de fonctions
- **Année** 12 · **Prérequis** `g1-domain` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : (f ∘ g)(x) = f(g(x)) : on applique g **d'abord**. x est dans le domaine de f ∘ g si x ∈ D_g et g(x) ∈ D_f. Exemple : f(x) = √x, g(x) = 1 − x² : (f ∘ g)(x) = √(1 − x²) sur [−1 ; 1] ; (g ∘ f)(x) = 1 − x sur [0 ; +∞[ seulement.
- **Juge** : `equiv` `{vars:['x'], domain: D_{f∘g}}` pour l'expression ; `solset` pour le domaine · **Forme finale** : expression simplifiée **et** domaine.
- **Niveaux** :
  - L1 : « f(g(x)) = f( ? ) » avec g(x) à recopier dans la case.
  - L2 : expression de f ∘ g ; domaine donné.
  - L3 : choisir l'ordre (« g d'abord » ou « f d'abord ») puis écrire.
  - L4 : f ∘ g et g ∘ f, avec leurs domaines.
  - L5 : décomposer h(x) = √(1 + 1/x) en trois fonctions usuelles ; ou trouver g telle que f ∘ g = h.
- **Générateur** : f et g tirées dans {√x, 1/x, x², ax + b, 1/(x − a), |x|} (et sin, exp si G2 et G3 sont commencés) ; on rejette les paires où f ∘ g = g ∘ f, pour que l'ordre compte.
- **Corrigé type** : f(x) = √x, g(x) = 1 − x². Calculer g ∘ f et son domaine.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (g ∘ f)(x) = g(√x) | f d'abord |
  | 2 | = 1 − (√x)² = 1 − x | Simplifier |
  | 3 | D = {x ≥ 0} = [0 ; +∞[ | Domaine : x ∈ D_f |
- **Aides** : 1 « g ∘ f : on calcule f(x), puis on l'envoie dans g. » · 2 « g(√x) = 1 − (…)² » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g1_compose_order`, `g1_compose_domain`) ; `tf` « f ∘ g = g ∘ f pour toutes f et g » (faux : f(x) = x², g(x) = x + 1).
- **Pièges** : `g1_compose_order`, `g1_compose_domain`.
- **Sous-buts → crédit** : domaine → `g1-domain`.

### `g1-inverse` — Fonction réciproque : l'expliciter
- **Année** 12 · **Prérequis** `g1-compose`, `@alg:F-isoler` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-compose` : on vérifie f(f⁻¹(x)) = x ; `@alg:F-isoler` : isoler x dans y = f(x).
- **Intro** : pour f : A → B bijective, on résout y = f(x) en x, avec x ∈ A. S'il y a deux solutions, on garde celle qui est dans A. Puis on renomme : f⁻¹(x) = … Ce n'est pas 1/f.
- **Juge** : `solset` `{v:'x', domain:A, params:{y:B}}` pour les lignes « x = … » (6 valeurs de y tirées dans B) ; `equiv` `{vars:['x'], domain:B}` pour la ligne finale contre la vraie réciproque · **Forme finale** : « f⁻¹(x) = … » avec son ensemble de départ B.
- **Niveaux** :
  - L1 : f affine ; une ligne à trous.
  - L2 : f homographique (ax + b)/(cx + d).
  - L3 : f du 2e degré sur une demi-droite : décision « quelle racine garder ? ».
  - L4 : libre (racines, exponentielles si G2 est commencé).
  - L5 : enchaîné avec `g1-surjective`.
- **Générateur** : gabarit 1 : f(x) = ax + b. Gabarit 2 : f(x) = (ax + b)/(cx + d), ad − bc ≠ 0, coefficients dans [−4 ; 4]. Gabarit 3 : f(x) = (x − h)² + k sur [h ; +∞[ ou ]−∞ ; h], h, k ∈ [−3 ; 3]. On donne A et B ; B est l'image exacte de A.
- **Corrigé type** : f : [1 ; +∞[ → [−1 ; +∞[, f(x) = x² − 2x. Expliciter f⁻¹.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | y = x² − 2x, avec x ≥ 1 | Poser l'équation |
  | 2 | x² − 2x − y = 0 | Ordonner |
  | 3 | x = 1 + √(1 + y) ou x = 1 − √(1 + y) | Résoudre (→ `@alg:H-discriminant`) |
  | 4 | x = 1 + √(1 + y), car x ≥ 1 | Choisir la branche |
  | 5 | f⁻¹ : [−1 ; +∞[ → [1 ; +∞[, f⁻¹(x) = 1 + √(1 + x) | Renommer |
- **Aides** : 1 « Résous y = f(x) en x, puis garde la solution qui est dans [1 ; +∞[. » · 2 « x = 1 ± √(…) » · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (distracteurs `g1_inverse_branch`, `g1_inverse_reciprocal`) ; `open` (dans le problème de bijection).
- **Pièges** : `g1_inverse_branch`, `g1_inverse_reciprocal`.
- **Sous-buts → crédit** : résoudre → `@alg:H-discriminant`.

### `g1-injective` — Injectivité : prouver ou réfuter
- **Année** 12 · **Prérequis** `g9-counterexample`, `g9-proof-contra` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-counterexample` : réfuter : deux valeurs a ≠ b avec f(a) = f(b) ; `g9-proof-contra` : preuve directe f(a) = f(b) ⇒ a = b.
- **Intro** : f est injective sur A si f(a) = f(b) ⇒ a = b pour tous a, b ∈ A. Pour le prouver : on part de f(a) = f(b) et on arrive à a = b. Pour le réfuter : deux valeurs a ≠ b avec f(a) = f(b).
- **Juge** : `blocks` (charpente « Soient a, b ∈ A tels que f(a) = f(b) » … « donc a = b ») ; les lignes de calcul sont des relations en a et b jugées par `solset` `{vars:['a','b'], domain:A²}` (grille 40 × 40 plus la diagonale) ; réfutation par `example` · **Forme finale** : « a = b » (sur A²) puis conclusion, ou contre-exemple.
- **Niveaux** : échelle des conventions (blocs, puis lignes). L3 : décision « injective ou pas ? » avant de commencer. L4 : la factorisation (a − b)(…) = 0 est à trouver.
- **Générateur** : gabarit 1 homographique (toujours injective sur son domaine). Gabarit 2 : x² + px sur un intervalle (injective si l'intervalle est d'un côté de −p/2, sinon contre-exemple symétrique). Gabarit 3 (MAN) : x + c/x sur ]−∞ ; −√c] ou [√c ; +∞[, où l'on obtient (a − b)(ab − c) = 0. c ∈ {1 ; 4 ; 9}.
- **Corrigé type** : f(x) = (2x + 1)/(x − 3) est-elle injective sur ℝ ∖ {3} ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Soient a, b ≠ 3 avec (2a + 1)/(a − 3) = (2b + 1)/(b − 3) | Charpente |
  | 2 | (2a + 1)(b − 3) = (2b + 1)(a − 3) | Produit en croix |
  | 3 | −6a + b = −6b + a | Développer, simplifier 2ab et −3 |
  | 4 | a = b | Conclure le calcul |
  | 5 | Donc f est injective. | Conclure |
- **Aides** : 1 « Pars de f(a) = f(b) et cherche à obtenir a = b. » · 2 « 2ab − 6a + b − 3 = 2ab − 6b + … » · 3 la ligne 3.
- **Variantes d'examen** : `open` (dans le problème de bijection) ; `tf` « x ↦ x² est injective sur [−1 ; 2] » (faux : f(−1) = f(1)).
- **Pièges** : `g1_inj_square`, `g9_proof_by_example`.
- **Sous-buts → crédit** : produit en croix → `@alg:E-produit-en-croix`.

### `g1-surjective` — Surjectivité, bijection, ensemble d'arrivée
- **Année** 12.5 · **Prérequis** `g1-injective`, `g1-inverse`, `g1-irr-ineq` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g1-injective` : bijective = injective et surjective.
- **Intro** : f : A → B est surjective si tout y ∈ B a un antécédent **dans A**. On résout y = f(x) en x, on vérifie qu'une solution existe pour tout y ∈ B, **et** qu'elle est dans A. Injective et surjective : bijective, et la solution trouvée donne f⁻¹.
- **Juge** : `blocks` `mode:'frame'` ; calculs par `solset` avec paramètre y ; la condition « x ∈ A » par `solset` `{v:'y'}` (pour quels y la racine choisie est dans A) · **Forme finale** : conclusion « bijective » et f⁻¹ avec ses ensembles.
- **Niveaux** :
  - L1 : charpente remplie sauf la vérification x ∈ A.
  - L2 : charpente avec deux trous (Δ ≥ 0 ; x ∈ A).
  - L3 : choisir l'ensemble B parmi 3 propositions, puis prouver.
  - L4 : libre (charpente vide).
  - L5 : problème MAN entier (7 ou 11 points), sans aide.
- **Générateur** : gabarit 1 (MAN 2018) : x + c/x, c ∈ {1 ; 4}, sur une demi-droite où f est monotone ; B = image exacte. Gabarit 2 (MAN 2017) : (eˣ + p)/(eˣ − 1), p ∈ {2 ; 3 ; 5}, sur ℝ* (si G2 est commencé) ; B = ]−∞ ; −p[ ∪ ]1 ; +∞[. Gabarit 3 : homographique.
- **Corrigé type** : f : [1 ; +∞[ → [2 ; +∞[, f(x) = x + 1/x. Montrer que f est surjective et expliciter f⁻¹.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Soit y ≥ 2. On cherche x ≥ 1 avec x + 1/x = y. | Charpente |
  | 2 | x² − yx + 1 = 0 | Équation en x |
  | 3 | Δ = y² − 4 ≥ 0 car y ≥ 2 | Existence (→ `@alg:H-discriminant`) |
  | 4 | x = (y + √(y² − 4))/2 ou x = (y − √(y² − 4))/2 | Solutions |
  | 5 | (y + √(y² − 4))/2 ≥ y/2 ≥ 1 | La solution est dans A (→ `g1-irr-ineq`) |
  | 6 | f est surjective ; avec l'injectivité, bijective | Conclure |
  | 7 | f⁻¹(x) = (x + √(x² − 4))/2, x ≥ 2 | Réciproque (→ `g1-inverse`) |
- **Aides** : 1 « Il faut un antécédent **dans [1 ; +∞[**, pas seulement une solution. » · 2 « (y + √(y² − 4))/2 ≥ … » · 3 la ligne 5.
- **Variantes d'examen** : `open` (7 points, voir Exemples ; barème du corrigé MAN 2018 : injective 2,5, surjective 3,5, réciproque 1).
- **Pièges** : `g1_surj_domain`, `g1_inverse_branch`.
- **Sous-buts → crédit** : réciproque → `g1-inverse` ; la solution est dans A → `g1-irr-ineq` ; Δ → `@alg:H-discriminant`.

### `g1-parity-period` — Parité et périodicité
- **Année** 12 · **Prérequis** `g1-domain`, `g9-counterexample`, `g3-reduce` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g9-counterexample` : « ni paire ni impaire » se montre avec une valeur de x ; `g3-reduce` : période de sin(ax) et cos(ax), angles associés.
- **Intro** : f est paire si D_f est symétrique et f(−x) = f(x) pour tout x ; impaire si f(−x) = −f(x). Pour dire « ni paire ni impaire », une valeur x suffit. La période de sin(ax) est 2π/|a| ; une somme a pour période le plus petit multiple commun.
- **Juge** : `equiv` pour le calcul de f(−x) ; `mcq` pour la conclusion ; `example` pour le contre-exemple ; `value` pour la période · **Forme finale** : « paire », « impaire » ou « ni l'une ni l'autre » avec preuve ou contre-exemple ; période.
- **Niveaux** :
  - L1 : f(−x) est calculé ; l'élève compare.
  - L2 : calculer f(−x) puis conclure.
  - L3 : choisir : « calculer f(−x) », « tester une valeur », « vérifier le domaine ».
  - L4 : fonctions du CMS série 7 (x|x|, x(x² + px + q), |sin x| + cos(√2 x)) ; périodes de sommes.
  - L5 : série mixte, avec contre-exemples exigés.
- **Générateur** : banque de 20 fonctions paramétrées (polynômes à puissances choisies, x|x|, quotients, |·|, compositions avec sin, cos) ; un domaine non symétrique une fois sur cinq. Périodes : sin(ax) + cos(bx) avec a, b ∈ {1 ; 2 ; 3 ; 4 ; 1/2}.
- **Corrigé type** : f(x) = x|x|. Parité ? Puis : période de sin(2x) + cos(3x) ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D_f = ℝ, symétrique | Domaine |
  | 2 | f(−x) = (−x)·\|−x\| = −x\|x\| = −f(x) | Calculer f(−x) |
  | 3 | f est impaire | Conclure |
  | 4 | Périodes π et 2π/3 ; plus petit T multiple des deux : T = 2π | Période d'une somme |
- **Aides** : 1 « Calcule f(−x) et compare à f(x) et à −f(x). » · 2 « |−x| = |x|, donc f(−x) = … » · 3 la ligne 2.
- **Variantes d'examen** : `tf` « Si f(−1) = f(1), f est paire » (faux : f(x) = x³ − x donne f(−1) = f(1) = 0, mais f(−2) = −6 ≠ f(2) = 6) ; `mcq` (période ; distracteurs `g1_period_sum`).
- **Pièges** : `g1_parity_point`, `g1_period_sum`.
- **Sous-buts → crédit** : domaine → `g1-domain`.

### `g1-trinome-sign` — Signe du trinôme, inéquation du 2e degré
- **Année** 12 · **Prérequis** `g9-intervals`, `@alg:H-discriminant` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-intervals` : écrire l'ensemble solution en intervalles.
- **Intro** : si Δ > 0, ax² + bx + c a le signe de a **à l'extérieur** des racines et le signe contraire entre elles. Si Δ < 0, il a partout le signe de a. Exemple : −2x² + x + 3 ≥ 0 : racines −1 et 3/2, a < 0, donc [−1 ; 3/2].
- **Juge** : `solset` · **Forme finale** : intervalles.
- **Niveaux** :
  - L1 : racines données ; l'élève choisit « entre » ou « à l'extérieur ».
  - L2 : Δ et racines à calculer.
  - L3 : choisir : « Δ », « racines », « signe de a », « écrire S ».
  - L4 : libre, avec Δ = 0 ou Δ < 0 une fois sur quatre.
  - L5 : inéquation à mettre d'abord sous la forme ax² + bx + c ⋚ 0 (x² < 2x + 8).
- **Générateur** : racines rationnelles r₁ < r₂ (dénominateurs 1 ou 2, dans [−5 ; 5]), a ∈ {±1 ; ±2 ; ±3}, relation tirée parmi < ≤ > ≥. Cas Δ ≤ 0 tirés à part.
- **Corrigé type** : résoudre −2x² + x + 3 ≥ 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Δ = 1 + 24 = 25 | Discriminant (→ `@alg:H-discriminant`) |
  | 2 | Racines −1 et 3/2 | Racines |
  | 3 | a = −2 < 0 : positif entre les racines | Signe |
  | 4 | S = [−1 ; 3/2] | Conclure |
- **Aides** : 1 « Le trinôme a le signe de a à l'extérieur des racines. » · 2 « Ici a < 0 : ≥ 0 entre −1 et … » · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (distracteur `g1_trinome_sign_swap`) ; `tf` « x² + x + 1 > 0 pour tout x » (vrai).
- **Pièges** : `g1_trinome_sign_swap`, `g9_bracket`.
- **Sous-buts → crédit** : discriminant → `@alg:H-discriminant`.

### `g1-sign-table` — Tableau de signes
- **Année** 12 · **Prérequis** `g1-trinome-sign`, `@alg:D-factoriser-completement` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-trinome-sign` : signe de chaque facteur du 2e degré ; `@alg:D-factoriser-completement` : factoriser avant de faire le tableau.
- **Intro** : on factorise, on place tous les zéros et les valeurs interdites dans l'ordre, une ligne par facteur, puis la règle des signes. Un facteur au carré ne change pas de signe.
- **Juge** : `table` `{judge:{kind:'signs', f}}` (ajout 5 du début du fichier), puis `solset` pour lire l'inéquation · **Forme finale** : tableau complet et ensemble demandé.
- **Niveaux** :
  - L1 : bornes et lignes des facteurs remplies ; l'élève remplit la dernière ligne.
  - L2 : bornes données ; lignes à remplir.
  - L3 : l'élève place les bornes (touche les valeurs sur une droite).
  - L4 : tableau libre, puis S.
  - L5 : inéquation à factoriser d'abord (x(x − 1)(x + 2) > 0 développé), puis tableau.
- **Générateur** : 2 à 4 facteurs (x − rᵢ), une puissance paire une fois sur deux, un facteur au dénominateur, un facteur (r − x) une fois sur trois. rᵢ entiers dans [−4 ; 4] distincts.
- **Corrigé type** : signe de f(x) = (x − 1)(x + 2)²/(3 − x), puis f(x) ≥ 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Bornes : −2, 1, 3 | Zéros et pôle |
  | 2 | x − 1 : − − 0 + + ; (x + 2)² : + 0 + + + ; 3 − x : + + + 0 − | Une ligne par facteur |
  | 3 | f : − 0 − 0 + ‖ − | Règle des signes |
  | 4 | S = {−2} ∪ [1 ; 3[ | Lire (→ `g9-intervals`) |
- **Aides** : 1 « Un facteur au carré est toujours ≥ 0. » · 2 « Entre 1 et 3 : (+)(+)/(+) = … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g1_sign_even_root`, `g1_pole_closed`).
- **Pièges** : `g1_sign_even_root`, `g1_pole_closed`.
- **Sous-buts → crédit** : lire → `g9-intervals`.

### `g1-rational-ineq` — Inéquations rationnelles
- **Année** 12 · **Prérequis** `g1-sign-table`, `@alg:G-additionner` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : on ne multiplie **pas** par un dénominateur dont le signe dépend de x. On passe tout d'un côté, on réduit au même dénominateur, puis on fait le tableau de signes. Les valeurs interdites restent exclues.
- **Juge** : `solset` (avec la ligne de domaine) · **Forme finale** : intervalles, valeurs interdites exclues.
- **Niveaux** :
  - L1 : la forme N/D ≥ 0 est donnée ; tableau à remplir.
  - L2 : réduire au même dénominateur avec des trous.
  - L3 : décision « multiplier par x − 2 » (`valid:false`, `why` : « Le signe de x − 2 dépend de x. ») ou « tout passer à gauche ».
  - L4 : libre (CMS série 1).
  - L5 : deux fractions de chaque côté.
- **Générateur** : on tire la forme réduite (x − p)(x − q)/(x − r) ou (x − p)/(x − r) avec des racines entières distinctes dans [−5 ; 6], puis on la « déréduit » en A/(x − r) ⋚ k ou A/B ⋚ C/D. On impose qu'au moins une des réponses fausses (`g1_mult_denominator`) diffère de la bonne.
- **Corrigé type** : résoudre (x + 1)/(x − 2) ≥ 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D = ℝ ∖ {2} | Domaine |
  | 2 | (x + 1)/(x − 2) − 2 ≥ 0 | Tout d'un côté |
  | 3 | (5 − x)/(x − 2) ≥ 0 | Même dénominateur (→ `@alg:G-additionner`) |
  | 4 | Tableau : − ‖ + 0 − (bornes 2 et 5) | Signes (→ `g1-sign-table`) |
  | 5 | S = ]2 ; 5] | Lire |
- **Aides** : 1 « Ne multiplie pas par x − 2 : son signe change. Passe tout à gauche. » · 2 « (x + 1 − 2(x − 2))/(x − 2) = … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g1_mult_denominator` : ]−∞ ; 5] ∖ {2}, `g1_pole_closed`) ; `open` (3 points).
- **Pièges** : `g1_mult_denominator`, `g1_ineq_not_flipped`, `g1_pole_closed`.
- **Sous-buts → crédit** : même dénominateur → `@alg:G-additionner` ; signes → `g1-sign-table`.

### `g1-param` — Équations et inéquations à paramètre
- **Année** 12.5 · **Prérequis** `g1-rational-ineq`, `@alg:I-param-1er-degre` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-rational-ineq` : les cas selon m donnent des inéquations rationnelles ; `@alg:I-param-1er-degre` : équation du 1er degré à paramètre.
- **Intro** : avant de diviser par une expression en m, on traite à part les m qui l'annulent, et on regarde son signe (pour une inéquation). La réponse est un tableau « selon m ».
- **Juge** : `solset` `{v:'x', params:['m'], cases:true}` (les cas portent sur m ; chaque cas est jugé pour 4 valeurs de m tirées dedans, plus ses bornes) · **Forme finale** : un ensemble par cas, les cas recouvrant ℝ.
- **Niveaux** :
  - L1 : les cas sont donnés ; l'élève résout chacun.
  - L2 : l'élève trouve les valeurs critiques de m.
  - L3 : choisir : « cas m = 1 », « cas m > 1 », « cas m < 1 », « diviser ».
  - L4 : libre, 1er degré.
  - L5 : 2e degré à paramètre (nombre de solutions selon m, avec Δ(m)).
- **Générateur** : (m − a)x ⋚ (m − a)(m + b) ou (m − a)x = m² − a², a, b ∈ [−3 ; 3] ; au niveau 5 : x² − 2mx + m + c = 0, c ∈ [−2 ; 6] (Δ/4 = m² − m − c, à racines entières en m).
- **Corrigé type** : résoudre (m − 1)x ≤ m² − 1 selon m.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (m − 1)x ≤ (m − 1)(m + 1) | Factoriser |
  | 2 | Cas m > 1 : x ≤ m + 1 | Diviser par un positif |
  | 3 | Cas m < 1 : x ≥ m + 1 | Diviser par un négatif : retourner |
  | 4 | Cas m = 1 : 0 ≤ 0, S = ℝ | Cas critique |
- **Aides** : 1 « Que se passe-t-il si m − 1 = 0 ? Et si m − 1 < 0 ? » · 2 « Cas m < 1 : on divise par m − 1 < 0, donc x … m + 1 » · 3 la ligne 3.
- **Variantes d'examen** : `open` (4 points) ; `mcq` « Pour m = 0, S = ? » (distracteur `g1_param_case`).
- **Pièges** : `g1_param_case`, `g1_ineq_not_flipped`.
- **Sous-buts → crédit** : factoriser → `@alg:D-factoriser-completement`.

### `g1-viete` — Trinôme à paramètre : position des racines
- **Année** 12.5 · **Prérequis** `g1-trinome-sign`, `g1-param`, `@alg:I-param-2e-degre` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-param` : discussion selon les valeurs de m ; `@alg:I-param-2e-degre` : trinôme à paramètre, Δ en fonction de m.
- **Intro** : pour f(x) = ax² + bx + c et un nombre k : x₁ < k < x₂ si et seulement si a·f(k) < 0 (alors Δ > 0 automatiquement). Pour k à l'extérieur des racines : a·f(k) > 0 et Δ > 0, puis −b/(2a) compare k au milieu. Somme et produit : x₁ + x₂ = −b/a, x₁x₂ = c/a.
- **Juge** : `solset` `{v:'m'}` · **Forme finale** : ensemble des m.
- **Niveaux** :
  - L1 : « a·f(k) < 0 » est rappelé ; l'élève calcule f(k) et résout.
  - L2 : l'élève choisit la condition parmi 3 (a·f(k) < 0, f(k) < 0, Δ > 0).
  - L3 : deux nombres k₁ < k₂ (« k₁ < x₁ < k₂ < x₂ ») : deux conditions.
  - L4 : libre, avec le cas a = 0 à exclure.
  - L5 : CMS série 2 : (m − 1)x² − 2(m + 1)x + 2m − 1 = 0 avec −6 < x₁ < 4 < x₂, nombres changés.
- **Générateur** : on tire la réponse d'abord : a(m) = m − p, f(k) = m − q (affine en m), p < q entiers dans [−3 ; 6] ; on reconstruit b(m) et c(m) avec des coefficients entiers (une équation linéaire). Gabarit 2 : conditions sur la somme ou le produit (racines de même signe : c/a > 0).
- **Corrigé type** : pour quels m l'équation (m − 2)x² − 2mx + m + 3 = 0 a-t-elle deux racines x₁ < 2 < x₂ ?

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Condition : a·f(2) < 0, avec a = m − 2 | Choisir la condition |
  | 2 | f(2) = 4(m − 2) − 4m + m + 3 = m − 5 | Calculer f(2) |
  | 3 | (m − 2)(m − 5) < 0 | Écrire |
  | 4 | m ∈ ]2 ; 5[ | Résoudre (→ `g1-trinome-sign`) |
- **Aides** : 1 « 2 est entre les racines si et seulement si a·f(2) < 0. » · 2 « f(2) = 4(m − 2) − 2m·2 + m + 3 = … » · 3 la ligne 2.
- **Variantes d'examen** : `open` (6 points, voir Exemples) ; `mcq` (distracteurs `g1_viete_a` : ]−∞ ; 5[, `g1_viete_delta`).
- **Pièges** : `g1_viete_a`, `g1_viete_delta`.
- **Sous-buts → crédit** : résoudre en m → `g1-trinome-sign`.

### `g1-abs-eq` — Valeur absolue : équations
- **Année** 12 · **Prérequis** `g9-intervals`, `@alg:H-discriminant` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `@alg:H-discriminant` : chaque cas donne souvent une équation du 2e degré.
- **Intro** : |A| = A si A ≥ 0, et −A si A < 0. On découpe ℝ selon le signe de A, on résout dans chaque cas, et on garde les solutions **qui sont dans le cas**. Pour |A| = B avec B ≥ 0 : A = B ou A = −B.
- **Juge** : `solset` `{cases:true}` · **Forme finale** : ensemble fini ou intervalles.
- **Niveaux** :
  - L1 : les deux cas sont écrits ; l'élève résout chacun.
  - L2 : l'élève trouve la frontière des cas.
  - L3 : choisir : « cas A ≥ 0 », « cas A < 0 », « vérifier dans le cas », « réunir ».
  - L4 : libre, deux valeurs absolues (corrigé GM 2017 : |x − 2| − |x − 1| + |2x − 5| = 0).
  - L5 : valeur absolue d'un trinôme (|x² + x − 2| − |x − 1| − 3 = 0).
- **Générateur** : |px + q| = rx + s : on tire les deux solutions candidates, dont une seule valide une fois sur trois. Deux valeurs absolues : frontières entières distinctes. On rejette les cas où la frontière est solution (sauf exprès une fois sur cinq).
- **Corrigé type** : résoudre |2x − 3| = x + 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Cas x ≥ 3/2 : 2x − 3 = x + 1 | Découper |
  | 2 | x = 4 ; 4 ≥ 3/2 ✓ | Résoudre, vérifier le cas |
  | 3 | Cas x < 3/2 : −2x + 3 = x + 1 | Second cas |
  | 4 | x = 2/3 ; 2/3 < 3/2 ✓ | Résoudre, vérifier |
  | 5 | S = {2/3 ; 4} | Réunir |
- **Aides** : 1 « Coupe en x = 3/2, là où 2x − 3 change de signe. » · 2 « Cas x < 3/2 : |2x − 3| = −(2x − 3) » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g1_abs_dropped`, `g1_abs_one_case`) ; `tf` « |x − 1| = −2 a une solution » (faux).
- **Pièges** : `g1_abs_dropped`, `g1_abs_one_case`, `g1_abs_case_bounds`.
- **Sous-buts → crédit** : réunir → `g9-intervals`.

### `g1-abs-ineq` — Valeur absolue : inéquations, y compris avec un 2e degré
- **Année** 12 · **Prérequis** `g1-abs-eq`, `g1-trinome-sign` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g1-abs-eq` : même découpage en cas selon le signe de A.
- **Intro** : |A| < B ⇔ −B < A < B. |A| > B ⇔ A < −B **ou** A > B. Avec un 2e degré, on découpe en cas, on résout chaque inéquation du 2e degré, puis on **intersecte avec le cas** avant de réunir.
- **Juge** : `solset` `{cases:true}` · **Forme finale** : intervalles.
- **Niveaux** :
  - L1 : |x − a| < r, un seul encadrement.
  - L2 : |A| > B (« ou »).
  - L3 : avec un 2e degré, les cas sont proposés ; l'élève choisit l'action par ligne.
  - L4 : libre (MAN 2018 avec d'autres nombres).
  - L5 : deux valeurs absolues et un 2e degré ; ou l'inéquation de l'examen blanc MAN.
- **Générateur** : forme x² ± |px + q| ⋚ rx + s ; on cherche (p, q, r, s) dans des plages bornées (p ∈ [1 ; 3], q ∈ [−6 ; 6], r ∈ [−3 ; 3], s ∈ [−8 ; 8]) tels que les deux trinômes aient des racines rationnelles. Une fois sur deux, on impose que la réponse de `g1_abs_case_bounds` diffère de la bonne (signe + devant |·| ; le signe − ne la sépare jamais pour ≤).
- **Corrigé type** : résoudre x² + |x − 5| ≤ 7.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Cas x ≥ 5 : x² + x − 12 ≤ 0 | Découper |
  | 2 | x ∈ [−4 ; 3] ; avec x ≥ 5 : S₁ = ∅ | Résoudre (→ `g1-trinome-sign`), intersecter |
  | 3 | Cas x < 5 : x² − x − 2 ≤ 0 | Second cas |
  | 4 | x ∈ [−1 ; 2] ; avec x < 5 : S₂ = [−1 ; 2] | Résoudre, intersecter |
  | 5 | S = [−1 ; 2] | Réunir |
- **Aides** : 1 « Dans chaque cas, garde seulement les x du cas. » · 2 « Cas x ≥ 5 : [−4 ; 3] ∩ [5 ; +∞[ = … » · 3 la ligne 2.
- **Variantes d'examen** : `open` (5 points, voir Exemples) ; `mcq` (distracteurs `g1_abs_case_bounds` : [−4 ; 3], `g1_abs_and_or`).
- **Pièges** : `g1_abs_case_bounds`, `g1_abs_and_or`, `g1_abs_dropped`.
- **Sous-buts → crédit** : résoudre le trinôme → `g1-trinome-sign`.

### `g1-irr-eq` — Équations irrationnelles
- **Année** 12 · **Prérequis** `g1-domain`, `@alg:H-discriminant` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-domain` : condition A ≥ 0 sous la racine ; `@alg:H-discriminant` : A = B² est souvent du 2e degré.
- **Intro** : √A = B ⇔ B ≥ 0 et A = B². La condition B ≥ 0 remplace la vérification (et A ≥ 0 devient automatique). Sans elle, élever au carré ajoute des solutions.
- **Juge** : `solset` · **Forme finale** : ensemble fini.
- **Niveaux** :
  - L1 : condition et carré donnés ; l'élève résout et trie.
  - L2 : l'élève écrit la condition B ≥ 0.
  - L3 : décision « élever au carré directement » (`valid:true`, `quality:'poor'` : « juste si tu vérifies chaque solution à la fin ») ou « condition B ≥ 0 puis carré ».
  - L4 : libre ; deux racines (√(x + 5) + √x = 5 : isoler une racine d'abord).
  - L5 : CMS série 4 : domaine puis équation à racine imbriquée.
- **Générateur** : on tire la bonne racine x₀ et une racine parasite x₁, entières dans [−5 ; 5], et s ∈ [−3 ; 3] avec x₀ + s ≥ 0 et x₁ + s < 0. On pose B = x + s et A = (x + s)² − (x − x₀)(x − x₁) = (2s + x₀ + x₁)x + s² − x₀x₁, qui est affine. Alors A = B² ⇔ x ∈ {x₀ ; x₁}. On rejette les A constants et |coefficients| > 20. Gabarit 2 : B = −x + s (racine parasite à droite).
- **Corrigé type** : résoudre √(x + 7) = x + 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x + 1 ≥ 0 et x + 7 = (x + 1)² | Condition et carré |
  | 2 | x ≥ −1 et x² + x − 6 = 0 | Développer |
  | 3 | x ≥ −1 et (x = 2 ou x = −3) | Résoudre (→ `@alg:D-trinome`) |
  | 4 | S = {2} | Trier |
- **Aides** : 1 « Une racine carrée est ≥ 0 : il faut x + 1 ≥ 0. » · 2 « x + 7 = x² + 2x + 1, donc x² + x − … = 0 » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g1_irr_extraneous` : {−3 ; 2}) ; `tf` « Si a² = b², alors a = b » (faux : a = −2, b = 2).
- **Pièges** : `g1_irr_extraneous`.
- **Sous-buts → crédit** : résoudre → `@alg:D-trinome`.

### `g1-irr-ineq` — Inéquations irrationnelles
- **Année** 12.5 · **Prérequis** `g1-irr-eq`, `g1-abs-ineq` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g1-irr-eq` : même condition B ≥ 0 avant d'élever au carré.
- **Intro** : √A ≤ B ⇔ A ≥ 0 et B ≥ 0 et A ≤ B². √A ≥ B : deux cas. Si B < 0, c'est vrai dès que A ≥ 0. Si B ≥ 0, on élève au carré : A ≥ B². On réunit les deux cas.
- **Juge** : `solset` `{cases:true}` · **Forme finale** : intervalles.
- **Niveaux** :
  - L1 : √A ≤ B, les trois conditions sont écrites.
  - L2 : √A > B, les deux cas sont écrits.
  - L3 : choisir l'action ; décision « élever au carré directement » marquée `valid:false` (« les deux membres n'ont pas toujours le même signe »).
  - L4 : libre (série 4 du CMS : x − 3 > √(x² + 3x)).
  - L5 : MAN 2017 : √(trinôme) > |x + c| − d, 11 points.
- **Générateur** : √(x + q) ⋚ x + s et √(trinôme) ⋚ ax + b ; on tire les racines du trinôme et du carré pour qu'elles soient entières ; on impose que `g1_square_no_cond` donne un ensemble différent.
- **Corrigé type** : résoudre √(x + 12) ≤ x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x + 12 ≥ 0 et x ≥ 0 et x + 12 ≤ x² | Conditions |
  | 2 | x ≥ 0 et x² − x − 12 ≥ 0 | Simplifier |
  | 3 | x ≥ 0 et (x ≤ −3 ou x ≥ 4) | Signe du trinôme (→ `g1-trinome-sign`) |
  | 4 | S = [4 ; +∞[ | Intersecter |
- **Aides** : 1 « Une racine est ≥ 0 : si √(x + 12) ≤ x, alors x ≥ 0. » · 2 « x + 12 ≤ x², donc x² − x − 12 … 0 » · 3 la ligne 1.
- **Variantes d'examen** : `open` (11 points, voir Exemples) ; `mcq` (distracteur `g1_square_no_cond` : [−12 ; −3] ∪ [4 ; +∞[).
- **Pièges** : `g1_square_no_cond`, `g1_irr_extraneous`.
- **Sous-buts → crédit** : signe du trinôme → `g1-trinome-sign` ; cas de la valeur absolue → `g1-abs-ineq`.

### `g1-bound` — Majorer ou minorer une expression
- **Année** 12.5 · **Prérequis** `g1-abs-ineq` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g1-abs-ineq` : |x| ≤ 1 se traduit par −1 ≤ x ≤ 1.
- **Intro** : pour majorer |A·B|, on majore |A| et |B| séparément. Inégalité triangulaire : |a + b| ≤ |a| + |b|. Pour majorer une fraction positive, on majore le numérateur et on **minore** le dénominateur. Ces outils servent ensuite aux gendarmes et à ε-δ (A1).
- **Juge** : `equiv` `{vars:['x'], domain, rel:'≤'}` (ajout 4 du début du fichier) · **Forme finale** : une constante, et ≤ la borne demandée si l'énoncé en donne une.
- **Niveaux** :
  - L1 : la chaîne est écrite avec un trou.
  - L2 : choisir la majoration de chaque facteur dans un menu.
  - L3 : choisir l'outil : « factoriser », « inégalité triangulaire », « majorer chaque facteur », « minorer le dénominateur ».
  - L4 : libre, borne donnée.
  - L5 : sans borne donnée : « trouver une constante C telle que… ».
- **Générateur** : intervalles |x − a| ≤ r (r ∈ {1/2 ; 1 ; 2}) ; expressions : polynômes de degré 2 factorisables avec un facteur (x − a), quotients (polynôme)/(x + c) avec x + c > 0 sur l'intervalle. La borne demandée est la borne « naïve » du corrigé, arrondie à l'entier supérieur.
- **Corrigé type** : montrer que si |x − 1| ≤ 1, alors |x² − 1| ≤ 3.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | \|x² − 1\| = \|x − 1\|·\|x + 1\| | Factoriser |
  | 2 | ≤ 1·\|x + 1\| | Majorer \|x − 1\| |
  | 3 | ≤ 3, car x ∈ [0 ; 2] donne x + 1 ∈ [1 ; 3] | Majorer \|x + 1\| |
- **Aides** : 1 « Fais apparaître |x − 1|, que tu sais majorer. » · 2 « |x² − 1| = |x − 1|·|…| » · 3 la ligne 1.
- **Variantes d'examen** : `tf` « Si x ∈ [1 ; 3], alors 1/(x² + 1) ≤ 1/10 » (faux : x = 1 donne 1/2) ; `open` (4 points).
- **Pièges** : `g1_triangle_reverse`, `g1_bound_denominator`.
- **Sous-buts → crédit** : factoriser → `@alg:D-factoriser-completement`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g1_domain_partial` | method | E | `g1-domain` | `g1-domain` | √(x + 3)/(x² − 4) : x ≠ ±2 → x ≥ −3 et x ≠ ±2 | Calculer le domaine en retirant une des conditions (un candidat par condition). | « En x = −5, la racine √(−2) n'existe pas. Il manque la condition x + 3 ≥ 0. » |
| `g1_compose_order` | rule | E | `g1-compose` | `g1-compose` | g ∘ f = √(1 − x²) → 1 − x | Calculer f(g(x)) au lieu de g(f(x)). | « g ∘ f veut dire : f d'abord. On calcule g(√x). » |
| `g1_compose_domain` | method | E | `g1-compose` | `g1-domain` | D = ℝ → [0 ; +∞[ | Donner le domaine de l'expression simplifiée (1 − x) au lieu de D_{g∘f}. | « Pour x = −1, f(−1) = √(−1) n'existe pas : g ∘ f n'y est pas définie, même si 1 − x l'est. » |
| `g1_inverse_reciprocal` | notation | E | `g1-inverse` | `g1-inverse` | f⁻¹(x) = 1/(x² − 2x) → 1 + √(1 + x) | Renvoyer 1/f(x). | « f⁻¹ défait f : f⁻¹(f(x)) = x. Ce n'est pas l'inverse 1/f. » |
| `g1_inverse_branch` | method | C (corrigé MAN 2018, Math 1B, Q2) | `g1-inverse` | `g1-inverse` | x = 1 − √(1 + y) → x = 1 + √(1 + y) | Garder l'autre racine du 2e degré. | « Pour y = 3, 1 − √4 = −1 n'est pas dans [1 ; +∞[. Garde la racine qui est dans l'ensemble de départ. » |
| `g1_inj_square` | logic | E | `g1-injective` | `g9-implication` | a² = b² ⇒ a = b sur [−1 ; 2] | De a² = b² (ou (a − b)(a + b) = 0) produire « a = b » sans condition de signe. | « Sur [−1 ; 2], a = −1 et b = 1 donnent a² = b² avec a ≠ b. » |
| `g1_surj_domain` | method | C (corrigé MAN 2018, Math 1B, Q2) | `g1-surjective` | `g1-surjective` | « Δ ≥ 0, donc f est surjective » | En `blocks`, leurre qui conclut juste après « Δ ≥ 0 » sans le bloc « la solution est dans A ». | « Une solution existe, mais est-elle ≥ 1 ? Il faut un antécédent dans l'ensemble de départ. » |
| `g1_parity_point` | logic | E | `g1-parity-period` | `g9-counterexample` | f(−1) = f(1), donc f paire | `wrongValues` : conclure « paire » quand f(−x₀) = f(x₀) pour une valeur x₀ testée. | « Une valeur ne suffit pas. Pour x³ − x : f(−1) = f(1) = 0, mais f(−2) = −6 et f(2) = 6. » |
| `g1_period_sum` | rule | E | `g1-parity-period` | `g1-parity-period` | période de sin 2x + cos 3x : π ou 2π/3 → 2π | `wrongValues` : max des périodes, min des périodes, produit des périodes. | « Après π, sin 2x recommence, mais cos 3x non : cos 3(x + π) = −cos 3x. Il faut un multiple commun. » |
| `g1_sign_even_root` | sign | E | `g1-sign-table` | `g1-sign-table` | (x + 2)² change de signe en −2 → ne change pas | Dans la ligne d'un facteur de puissance paire, inverser le signe après sa racine. | « (x + 2)² est un carré : il est ≥ 0 des deux côtés de −2. » |
| `g1_trinome_sign_swap` | sign | E | `g1-trinome-sign` | `g1-trinome-sign` | −2x² + x + 3 ≥ 0 : ]−∞ ; −1] ∪ [3/2 ; +∞[ → [−1 ; 3/2] | Remplacer S par son complémentaire (bornes comprises). | « Teste x = 0 : −2·0 + 0 + 3 = 3 ≥ 0, et 0 n'est pas dans ton ensemble. » |
| `g1_ineq_not_flipped` | sign | E | `g1-rational-ineq` | `g1-param` | −2x ≥ 6 → x ≥ −3 au lieu de x ≤ −3 | Si la ligne de l'élève est prev multipliée (ou divisée) par c < 0, produire la même relation sans la retourner. | « Tu as divisé par −2, qui est négatif : l'inégalité se retourne. Teste x = 0 : −2·0 ≥ 6 est faux. » |
| `g1_mult_denominator` | method | E | `g1-rational-ineq` | `g1-rational-ineq` | (x + 1)/(x − 2) ≥ 2 → x + 1 ≥ 2(x − 2) | Remplacer A/D ⋚ B par A ⋚ B·D. | « x − 2 est négatif pour x < 2 : multiplier par lui retourne l'inégalité. Ta ligne garde x = 0, qui n'est pas solution. » |
| `g1_pole_closed` | notation | E | `g1-rational-ineq` | `g1-domain` | [2 ; 5] → ]2 ; 5] | Fermer chaque borne de prev qui est une valeur interdite. | « En x = 2, la fraction n'existe pas : 2 est exclu. » |
| `g1_param_case` | method | E | `g1-param` | `g1-param` | (m − 1)x ≤ … → x ≤ m + 1 pour tout m | Diviser par l'expression en m sans cas : garder la relation, ignorer m = 1. | « Pour m = 0, on divise par −1 : l'inégalité se retourne. Et pour m = 1, on ne peut pas diviser. » |
| `g1_viete_a` | rule | E | `g1-viete` | `g1-viete` | f(2) < 0 → a·f(2) < 0 | Remplacer la condition a·f(k) ⋚ 0 par f(k) ⋚ 0. | « Pour m = 0, f(2) = −5 < 0, mais a = −2 < 0 : la parabole est tournée vers le bas, 2 n'est pas entre les racines. » |
| `g1_viete_delta` | rule | E | `g1-viete` | `g1-trinome-sign` | k à gauche des racines : a·f(k) > 0 seul → avec Δ > 0 et −b/(2a) > k | Retirer une condition de la conjonction (un candidat par condition). | « a·f(k) > 0 dit seulement que k n'est pas entre les racines. Il faut aussi qu'il y ait deux racines, et qu'elles soient à droite de k. » |
| `g1_abs_dropped` | rule | E | `g1-abs-eq` | `g1-abs-eq` | \|2x − 3\| = x + 1 → 2x − 3 = x + 1 seul | Remplacer \|A\| par A dans prev. | « Si 2x − 3 < 0, \|2x − 3\| = −(2x − 3). Tu perds la solution 2/3. » |
| `g1_abs_one_case` | rule | E | `g1-abs-eq` | `g1-abs-eq` | \|A\| = B → A = ±B sans B ≥ 0 | Produire A = B ou A = −B, sans condition sur B. | « Avec B négatif, \|A\| = B n'a pas de solution : vérifie B ≥ 0. » |
| `g1_abs_case_bounds` | method | E | `g1-abs-ineq` | `g1-abs-eq` | x² + \|x − 5\| ≤ 7 : [−4 ; 3] → [−1 ; 2] | Réunir les solutions brutes des cas, sans les intersecter avec le domaine du cas. | « x = −3 est dans [−4 ; 3], mais ce cas exige x ≥ 5. Pour x = −3, 9 + 8 = 17 > 7. » |
| `g1_abs_and_or` | logic | E | `g1-abs-ineq` | `g9-intervals` | \|x − 1\| > 2 → −2 < x − 1 < 2 au lieu de x − 1 < −2 ou x − 1 > 2 | Échanger les formes « encadrement » et « ou ». | « \|x − 1\| > 2 veut dire : loin de 1 de plus de 2, d'un côté ou de l'autre. » |
| `g1_irr_extraneous` | method | E | `g1-irr-eq` | `g1-irr-eq` | √(x + 7) = x + 1 : {−3 ; 2} → {2} | Résoudre A = B² et garder toutes ses solutions. | « Pour x = −3 : √4 = 2, mais x + 1 = −2. Une racine carrée n'est jamais négative. » |
| `g1_square_no_cond` | method | E | `g1-irr-ineq` | `g1-irr-eq` | √(x + 12) ≤ x : [−12 ; −3] ∪ [4 ; +∞[ → [4 ; +∞[ | Remplacer √A ⋚ B par A ⋚ B² (domaine A ≥ 0 gardé). | « Pour x = −5, √7 ≤ −5 est faux. On ne peut élever au carré que si les deux membres sont ≥ 0. » |
| `g1_triangle_reverse` | rule | E | `g1-bound` | `g1-bound` | \|a + b\| ≤ \|a\| − \|b\| → ≤ \|a\| + \|b\| | Remplacer \|a ± b\| ≤ \|a\| + \|b\| par \|a\| − \|b\|. | « Avec a = 1, b = −1 : \|a − b\| = 2 mais \|a\| − \|b\| = 0. » |
| `g1_bound_denominator` | rule | E | `g1-bound` | `g1-bound` | 1/(x² + 1) ≤ 1/10 sur [1 ; 3] → ≤ 1/2 | Pour majorer 1/D, remplacer D par son maximum au lieu de son minimum. | « Plus le dénominateur est petit, plus la fraction est grande. Le plus petit x² + 1 est 2. » |

## Exemples de type examen

**E1 (5 points, d'après l'examen blanc MAN 2018).** Résoudre dans ℝ : x² − |3x + 5| ≤ 1 − 2x.

| Étape | Attendu | Points |
|---|---|---|
| Cas | x ≥ −5/3 et x < −5/3 | 1 |
| Cas 1 | x² − x − 6 ≤ 0 : [−2 ; 3] ; avec x ≥ −5/3 : [−5/3 ; 3] | 1,5 |
| Cas 2 | x² + 5x + 4 ≤ 0 : [−4 ; −1] ; avec x < −5/3 : [−4 ; −5/3[ | 1,5 |
| Réunion | S = [−4 ; 3] | 1 |

**E2 (11 points, d'après MAN 2017).** Résoudre dans ℝ : √(x² + 6x + 5) > |x + 1| − 3.

| Étape | Attendu | Points |
|---|---|---|
| Domaine | (x + 1)(x + 5) ≥ 0 : x ≤ −5 ou x ≥ −1 | 1 |
| Membre de droite < 0 | \|x + 1\| < 3 : −4 < x < 2 ; avec le domaine : [−1 ; 2[, tout est solution | 2 |
| Membre de droite ≥ 0 | x ≤ −5 ou x ≥ 2 | 1 |
| Carré | x² + 6x + 5 > x² + 2x + 10 − 6\|x + 1\|, soit 4x − 5 + 6\|x + 1\| > 0 | 1 |
| Sous-cas x ≥ 2 | 10x + 1 > 0 : toujours vrai, [2 ; +∞[ | 2 |
| Sous-cas x ≤ −5 | −2x − 11 > 0 : x < −11/2 | 2 |
| Réunion | S = ]−∞ ; −11/2[ ∪ [−1 ; +∞[ | 2 |

**E3 (7 points, d'après l'examen blanc MAN 2018 et son corrigé).** f : ]−∞ ; −2] → ]−∞ ; −5/2], x ↦ x + 1/x. (a) Montrer que f est injective. (b) Montrer que f est surjective. (c) Expliciter f⁻¹.

| Étape | Attendu | Points |
|---|---|---|
| a, mise en place | f(a) = f(b) ⇔ (a − b)(ab − 1) = 0 | 0,5 + 1 |
| a, conclusion | ab ≥ 4 sur ce domaine, donc ab ≠ 1 et a = b | 1 |
| b, définition | ∀y ≤ −5/2 ∃x ≤ −2, y = f(x) | 0,5 |
| b, existence | x² − yx + 1 = 0, Δ = y² − 4 > 0 | 1,5 |
| b, dans l'ensemble | (y − √(y² − 4))/2 ≤ −2 pour y ≤ −5/2 ; l'autre racine est dans [−1/2 ; 0[ | 1,5 |
| c | f⁻¹(x) = (x − √(x² − 4))/2, x ≤ −5/2 | 1 |

**E4 (11 points, d'après MAN 2017, mêle G1 et G2).** f : ℝ* → B, x ↦ (eˣ + 3)/(eˣ − 1). (a) Montrer que f est injective. (b) Déterminer B pour que f soit surjective. (c) Expliciter f⁻¹.

| Étape | Attendu | Points |
|---|---|---|
| a | (eᵃ + 3)(eᵇ − 1) = (eᵇ + 3)(eᵃ − 1) ⇒ 4eᵇ = 4eᵃ ⇒ a = b | 3 |
| b, réécriture | f(x) = 1 + 4/(eˣ − 1) | 1 |
| b, x < 0 | eˣ − 1 ∈ ]−1 ; 0[, donc f(x) ∈ ]−∞ ; −3[ | 2 |
| b, x > 0 | eˣ − 1 ∈ ]0 ; +∞[, donc f(x) ∈ ]1 ; +∞[ | 1 |
| b, conclusion | B = ]−∞ ; −3[ ∪ ]1 ; +∞[ | 1 |
| c | eˣ = (y + 3)/(y − 1) ; f⁻¹(x) = ln((x + 3)/(x − 1)), x ∈ B | 3 |

**E5 (6 points, d'après la série 2 du CMS).** Pour quels m l'équation (m − 2)x² − 2mx + m + 3 = 0 a-t-elle deux racines avec x₁ < 2 < x₂ < 6 ?

| Étape | Attendu | Points |
|---|---|---|
| Conditions | a·f(2) < 0 et a·f(6) > 0 (6 hors des racines, à droite car x₂ > 2) | 2 |
| f(2) | m − 5 ; (m − 2)(m − 5) < 0 : ]2 ; 5[ | 1,5 |
| f(6) | 25m − 69 ; (m − 2)(25m − 69) > 0 : m < 2 ou m > 69/25 | 1,5 |
| Conclusion | m ∈ ]69/25 ; 5[ | 1 |

**E6 (4 points).** Montrer que pour tout x ∈ [1 ; 3], |(x² − 4)/(x + 1)| ≤ 5/2.

| Étape | Attendu | Points |
|---|---|---|
| Numérateur | x² ∈ [1 ; 9], donc x² − 4 ∈ [−3 ; 5] et \|x² − 4\| ≤ 5 | 1,5 |
| Dénominateur | x + 1 ≥ 2 > 0 | 1 |
| Conclusion | quotient ≤ 5/2 (numérateur majoré, dénominateur minoré) | 1,5 |

---
# G2. Exponentielles, logarithmes, fonctions hyperboliques

Unité `explog` · préfixe `g2-` · pièges `g2_` · Statut : à faire

**Sources** : MAN, examen Math 1A 2017 (Q10, inéquation logarithmique avec base 1/10, 8 pts ; Q11d, nombre de solutions de cosh x = −x + 1) et formulaire M1A (trigonométrie hyperbolique) ; CMS, Analyse II, séries 11 (logarithmes), 12 (inéquations exp/log, équations du type xˣ) et 13 (formules et équations hyperboliques).
**Notation** : ln et Log acceptés (logarithme naturel) ; log_a pour une autre base ; log₁₀ écrit `log_10`. Puissance réelle aˣ seulement pour a > 0. Fonctions réciproques : argsh, argch, argth (arg sinh, arg cosh, arg tanh acceptés à la saisie).
**Prérequis extérieurs** : `pow-rules`, `root-rules` (unités de l'école), `@alg:H-discriminant`. Crédit indirect seulement : `@alg:E-produit-nul`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `pow-rules`, `root-rules`, `g1-domain`, `g1-inverse`, `g1-parity-period`, `g1-trinome-sign`.

Les équations et inéquations passent par `solset` `{v:'x', domain:'R', subst:true}` (ajouts 2 et 3 du début du fichier). Les simplifications passent par `equiv` avec un domaine où toutes les expressions sont définies.

## Compétences

### `g2-real-powers` — Puissances à exposant réel
- **Année** 12 · **Prérequis** `pow-rules`, `root-rules` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `root-rules` : a^(1/n) = ⁿ√a.
- **Intro** : pour a > 0 : aˣ·aʸ = aˣ⁺ʸ, (aˣ)ʸ = aˣʸ, a^(1/n) = ⁿ√a, a^(−x) = 1/aˣ, et aˣ = e^(x ln a). Exemple : 8^(2/3) = (∛8)² = 4.
- **Juge** : `equiv` `{vars:['a','b','x'], domain:{a:[0.2, 4], b:[0.2, 4]}}` ; `value` pour les nombres · **Forme finale** : une seule puissance par base, exposants réduits, pas d'exposant négatif si l'énoncé le demande.
- **Niveaux** :
  - L1 : nombres (16^(−3/4), 27^(2/3)) avec une ligne à trous.
  - L2 : une lettre, deux règles.
  - L3 : choisir la règle à appliquer à chaque ligne.
  - L4 : deux lettres, quotient de produits de puissances.
  - L5 : enchaîné avec une équation : 2^(3x) · 4^(x−1) = 8.
- **Générateur** : exposants rationnels de dénominateur 2, 3 ou 4 ; bases numériques 4, 8, 9, 16, 27, 32, 64 pour que le résultat soit rationnel ; expressions en a, b avec 3 ou 4 facteurs. La réponse est tirée d'abord (aᵖbᑫ, p, q ∈ [−2 ; 3]).
- **Corrigé type** : simplifier (a^(1/2) b^(−1/3))⁶ / (a² b^(−3)), a, b > 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | a³ b^(−2) / (a² b^(−3)) | Puissance d'un produit |
  | 2 | a^(3 − 2) b^(−2 + 3) | Quotient de puissances |
  | 3 | ab | Réduire |
- **Aides** : 1 « (xy)ⁿ = xⁿyⁿ, puis (aᵖ)ᑫ = aᵖᑫ. » · 2 « (a^(1/2))⁶ = a^(…) » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (distracteurs `g2_power_power`, `g2_exp_sum`) ; `tf` « (−8)^(1/3) est défini comme puissance réelle » (faux dans la convention du cours : aˣ demande a > 0 ; ∛(−8) = −2 existe comme racine).
- **Pièges** : `g2_power_power`, `g2_exp_sum`.
- **Sous-buts → crédit** : puissance d'un produit → `pow-rules`.

### `g2-log-rules` — Logarithmes : définition et règles
- **Année** 12 · **Prérequis** `g2-real-powers` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : log_a y = x ⇔ aˣ = y (a > 0, a ≠ 1, y > 0). ln(uv) = ln u + ln v, ln(u/v) = ln u − ln v, ln(uᵖ) = p·ln u, log_a y = ln y / ln a. Il n'y a **pas** de règle pour ln(u + v).
- **Juge** : `equiv` `{vars:['x'], domain:{x:[0.2, 5]}}` ; `value` pour les nombres · **Forme finale** : combinaison de ln de facteurs premiers ou de ln x, ou un seul logarithme (selon la consigne).
- **Niveaux** :
  - L1 : valeurs : log₂(1/16), log₄ 2, log₉ 27.
  - L2 : développer ln(x³√(x + 1)) avec trous.
  - L3 : choisir la règle par ligne ; `rule` « Quelle règle ? » une fois.
  - L4 : développer ou condenser, avec ln(e²) et racines.
  - L5 : changement de base, puis calcul (log₂ 3 · log₃ 8 = 3).
- **Générateur** : nombres : bases 2, 3, 4, 9, 10, 1/2 et arguments puissances rationnelles de la base. Expressions : produit de 2 à 4 facteurs parmi eᵏ, xⁿ, √(x + c), (x + c)ⁿ, quotient une fois sur deux. On garde un domaine x > max(0, −c).
- **Corrigé type** : écrire ln(e²·√x / x³) avec ln x seulement.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | ln(e²) + ln(√x) − ln(x³) | Produit et quotient |
  | 2 | 2 + (1/2) ln x − 3 ln x | Puissances |
  | 3 | 2 − (5/2) ln x | Réduire |
- **Aides** : 1 « ln d'un produit = somme des ln ; ln d'un quotient = différence. » · 2 « ln(√x) = ln(x^(1/2)) = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g2_log_sum`, `g2_log_power`, `g2_log_quotient`) ; `tf` « ln(a + b) = ln a · ln b » (faux : a = b = 1) ; « log₂ 8 · log₈ 2 = 1 » (vrai).
- **Pièges** : `g2_log_sum`, `g2_log_power`, `g2_log_quotient`.
- **Sous-buts → crédit** : puissances → `g2-real-powers`.

### `g2-exp-eq` — Équations exponentielles
- **Année** 12 · **Prérequis** `g2-log-rules`, `@alg:H-discriminant` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g2-log-rules` : prendre ln des deux membres.
- **Intro** : si les deux membres sont des puissances de la même base, on compare les exposants. Sinon on prend ln des deux côtés. Si e²ˣ et eˣ apparaissent, on pose t = eˣ > 0 : le t négatif est rejeté.
- **Juge** : `solset` `{subst:true}` · **Forme finale** : ensemble fini, valeurs exactes (ln 3, pas 1,0986).
- **Niveaux** :
  - L1 : même base (2^(x+1) = 8^(x−1)).
  - L2 : prendre ln (3^(x+1) = 2^(2x)).
  - L3 : décision « poser t = eˣ » ; la ligne en t est un trinôme.
  - L4 : libre, une racine t négative une fois sur deux.
  - L5 : 4ˣ − 3·2^(x+1) + 8 = 0 puis une inéquation associée (si `g2-ineq` est commencée).
- **Générateur** : substitution : racines t₁, t₂ tirées dans {−3 ; −2 ; −1 ; 1/2 ; 1 ; 2 ; 3 ; 4} avec au moins une positive, puis (t − t₁)(t − t₂) développé et écrit en e²ˣ, eˣ (ou 4ˣ, 2ˣ). Même base : exposants affines à coefficients entiers. ln : bases 2 et 3, solution écrite ln a / ln b.
- **Corrigé type** : résoudre e²ˣ − eˣ − 6 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Posons t = eˣ, t > 0 | Décision de substitution |
  | 2 | t² − t − 6 = 0 | Équation en t |
  | 3 | t = 3 ou t = −2 ; t > 0, donc t = 3 | Résoudre et trier (→ `@alg:H-discriminant`) |
  | 4 | eˣ = 3 | Revenir à x |
  | 5 | S = {ln 3} | Conclure |
- **Aides** : 1 « e²ˣ = (eˣ)² : pose t = eˣ. » · 2 « t² − t − 6 = (t − 3)(t + …) » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g2_exp_neg_t` : l'option « {ln 3 ; ln(−2)} ») ; `open` (3 points).
- **Pièges** : `g2_exp_neg_t`, `g2_exp_sum`.
- **Sous-buts → crédit** : résoudre en t → `@alg:H-discriminant`.

### `g2-log-eq` — Équations logarithmiques
- **Année** 12 · **Prérequis** `g2-log-rules`, `g1-domain` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g2-log-rules` : regrouper en un seul logarithme.
- **Intro** : on écrit **d'abord** le domaine (chaque argument > 0). Puis on regroupe en un seul logarithme de chaque côté, et log_a u = log_a v ⇔ u = v (sur le domaine). On garde seulement les solutions du domaine.
- **Juge** : `solset` avec ligne de domaine · **Forme finale** : ensemble fini.
- **Niveaux** :
  - L1 : domaine donné ; regrouper puis résoudre.
  - L2 : l'élève écrit le domaine.
  - L3 : choisir : « domaine », « regrouper », « passer à l'exponentielle », « trier ».
  - L4 : libre ; une solution parasite une fois sur deux.
  - L5 : bases différentes (log₂ et log₄), à ramener à une base.
- **Générateur** : log_a(x − p) + log_a(x − q) = k : on tire les racines de (x − p)(x − q) = aᵏ (une dans le domaine, une hors du domaine) avec a ∈ {2 ; 3 ; 10}, k ∈ {1 ; 2 ; 3}. Gabarit 2 : ln(x²) = 2 ln(x + c) (piège `g2_log_square_abs`).
- **Corrigé type** : résoudre log₂(x − 1) + log₂(x + 1) = 3.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D = ]1 ; +∞[ | Domaine (→ `g1-domain`) |
  | 2 | log₂((x − 1)(x + 1)) = 3 | Regrouper |
  | 3 | x² − 1 = 8 | Passer à l'exponentielle |
  | 4 | x = 3 ou x = −3 | Résoudre |
  | 5 | S = {3} | Trier selon D |
- **Aides** : 1 « Commence par le domaine : x − 1 > 0 et x + 1 > 0. » · 2 « log₂(…) = 3 ⇔ … = 2³ » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g2_log_domain`) ; `tf` « ln(x²) = 2 ln x pour tout x ≠ 0 » (faux : x = −1).
- **Pièges** : `g2_log_domain`, `g2_log_square_abs`, `g2_log_sum`.
- **Sous-buts → crédit** : domaine → `g1-domain`.

### `g2-ineq` — Inéquations exponentielles et logarithmiques, base < 1
- **Année** 12.5 · **Prérequis** `g2-log-eq`, `g2-exp-eq`, `g1-trinome-sign` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g2-log-eq` : domaine et regroupement des logarithmes, comme pour l'équation ; `g2-exp-eq` : substitution t = aˣ, comme pour l'équation.
- **Intro** : x ↦ aˣ et x ↦ log_a x sont croissantes si a > 1, **décroissantes** si 0 < a < 1. Avec une base < 1, on retourne l'inégalité. log_{1/a} u = −log_a u. Le domaine d'abord, comme pour les équations.
- **Juge** : `solset` avec ligne de domaine · **Forme finale** : intervalles.
- **Niveaux** :
  - L1 : base > 1, domaine donné.
  - L2 : base < 1 ; décision « retourner ? » (oui/non) avant la ligne.
  - L3 : bases 1/10 et 10 mêlées (MAN 2017), avec choix d'action.
  - L4 : libre.
  - L5 : CMS série 12 : e⁹·eˣ > e^(√(6 − x²)) ou log_a(4 − x) + a ≤ a·log_a(x + 2) − 1 pour a = 2 et a = 1/2.
- **Générateur** : log_b(px + q) ⋚ log_b(rx + s) avec b ∈ {1/2 ; 1/3 ; 1/10 ; 2 ; 3 ; 10} ; ou forme MAN log_{1/b}(x − p) ⋚ −k + log_b(x + q), où l'on tire les racines de (x − p)(x + q) = bᵏ pour qu'elles soient entières. On impose que `g2_base_lt1` donne un ensemble différent et non vide.
- **Corrigé type** : résoudre log_{1/3}(2x − 1) > log_{1/3}(x + 2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | D : 2x − 1 > 0 et x + 2 > 0, D = ]1/2 ; +∞[ | Domaine |
  | 2 | 2x − 1 < x + 2 | Base 1/3 < 1 : on retourne |
  | 3 | x < 3 | Résoudre |
  | 4 | S = ]1/2 ; 3[ | Intersecter avec D |
- **Aides** : 1 « log_{1/3} est décroissante : le plus grand log a le plus petit argument. » · 2 « 2x − 1 … x + 2 » · 3 la ligne 2.
- **Variantes d'examen** : `open` (8 points, voir Exemples) ; `mcq` (distracteurs `g2_base_lt1` : ]3 ; +∞[, `g2_log_domain` : ]−∞ ; 3[).
- **Pièges** : `g2_base_lt1`, `g2_log_domain`.
- **Sous-buts → crédit** : domaine → `g1-domain` ; inéquation du 2e degré → `g1-trinome-sign`.

### `g2-xx` — Équations du type xˣ
- **Année** 12.5 · **Prérequis** `g2-log-eq` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g2-log-eq` : prendre ln des deux membres, avec le domaine x > 0.
- **Intro** : pour x > 0, xᵃ = e^(a ln x). Donc x^f = x^g ⇔ (f − g)·ln x = 0 ⇔ f = g **ou** x = 1. Ne pas oublier x = 1.
- **Juge** : `solset` `{domain:']0 ; +∞['}` · **Forme finale** : ensemble fini.
- **Niveaux** :
  - L1 : e^(… ln x) donné ; l'élève factorise.
  - L2 : réécrire chaque membre avec e et ln.
  - L3 : choisir : « écrire avec e », « comparer les exposants », « factoriser par ln x ».
  - L4 : libre.
  - L5 : CMS série 12 : x^(xˣ) = x^(6/x).
- **Générateur** : x^(f(x)) = x^(g(x)) ou (xᵖ)^(f) = x^g, avec f − g qui se factorise en racines positives simples (2, 4, 9, 3√3) ; domaine x > 0.
- **Corrigé type** : résoudre (x²)ˣ = x^(x²), x > 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | e^(2x ln x) = e^(x² ln x) | Écrire avec e |
  | 2 | 2x ln x = x² ln x | Comparer les exposants |
  | 3 | x ln x (2 − x) = 0 | Factoriser |
  | 4 | x = 1 ou x = 2 (x = 0 exclu) | Produit nul (→ `@alg:E-produit-nul`) |
  | 5 | S = {1 ; 2} | Conclure |
- **Aides** : 1 « Pour x > 0 : (x²)ˣ = e^(x·ln(x²)). » · 2 « 2x ln x − x² ln x = x ln x(…) » · 3 la ligne 3.
- **Variantes d'examen** : `open` (5 points) ; `mcq` (distracteur `g2_xx_lost_one` : {2}).
- **Pièges** : `g2_xx_lost_one`.
- **Sous-buts → crédit** : produit nul → `@alg:E-produit-nul`.

### `g2-hyp-def` — sinh, cosh, tanh : définitions et graphes
- **Année** 12.5 · **Prérequis** `g2-log-rules`, `g1-parity-period` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g2-log-rules` : évaluer en ln a : e^(ln a) = a.
- **Intro** : sinh x = (eˣ − e⁻ˣ)/2 (impaire), cosh x = (eˣ + e⁻ˣ)/2 (paire, ≥ 1), tanh x = sinh x / cosh x ∈ ]−1 ; 1[. cosh²x − sinh²x = 1. Exemple : cosh(ln 2) = (2 + 1/2)/2 = 5/4.
- **Juge** : `value` ; `equiv` pour les identités ; `mcq` pour les graphes · **Forme finale** : fraction exacte.
- **Niveaux** :
  - L1 : sinh(ln a), cosh(ln a) avec la formule à trous.
  - L2 : tanh(ln a).
  - L3 : reconnaître les graphes ; choisir parité, image, monotonie.
  - L4 : démontrer cosh²x − sinh²x = 1 en lignes `equiv`.
  - L5 : série courte : valeurs, parité, image, une identité.
- **Générateur** : a ∈ {2 ; 3 ; 1/2 ; 4} ; résultats rationnels. Banque de 6 propriétés pour les `tf`.
- **Corrigé type** : calculer tanh(ln 2) et vérifier cosh²(ln 2) − sinh²(ln 2) = 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | sinh(ln 2) = (2 − 1/2)/2 = 3/4 | Définition de sinh |
  | 2 | cosh(ln 2) = (2 + 1/2)/2 = 5/4 | Définition de cosh |
  | 3 | tanh(ln 2) = 3/5 | Quotient |
  | 4 | 25/16 − 9/16 = 1 | Vérifier l'identité |
- **Aides** : 1 « e^(ln 2) = 2 et e^(−ln 2) = 1/2. » · 2 « sinh(ln 2) = (2 − …)/2 » · 3 la ligne 1.
- **Variantes d'examen** : `tf` « cosh est croissante sur ℝ » (faux : cosh(−1) > cosh(0)) ; « tanh x < 1 pour tout x » (vrai) ; `mcq`.
- **Pièges** : `g2_hyp_trig_sign`.
- **Sous-buts → crédit** : parité → `g1-parity-period`.

### `g2-hyp-formulas` — Formules hyperboliques
- **Année** 12.5 · **Prérequis** `g2-hyp-def` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on les retrouve depuis les exponentielles. sinh(x + y) = sinh x cosh y + cosh x sinh y ; cosh(x + y) = cosh x cosh y + sinh x sinh y (signe +, pas −) ; cosh 2x = cosh²x + sinh²x ; 1 − tanh²x = 1/cosh²x.
- **Juge** : `equiv` `{vars:['x','y'], domain:{x:[-2,2], y:[-2,2]}}` ; si l'énoncé impose une variable t = tanh x, la forme finale ne doit contenir que t · **Forme finale** : selon la consigne.
- **Niveaux** :
  - L1 : sinh 2x = 2 sinh x cosh x, à vérifier avec les exponentielles (trous).
  - L2 : cosh(x + y) depuis les exponentielles.
  - L3 : exprimer en tanh x, avec le choix de l'identité à utiliser.
  - L4 : libre : cosh 2x ou sinh 2x en fonction de t = tanh x.
  - L5 : CMS série 13 : simplifier une expression, puis une équation qui en découle.
- **Générateur** : banque de 10 identités ; pour « en fonction de t », cibles (1 + t²)/(1 − t²), 2t/(1 − t²), (1 + t)/(1 − t) (= e²ˣ).
- **Corrigé type** : exprimer cosh 2x en fonction de t = tanh x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | cosh 2x = cosh²x + sinh²x | Angle double |
  | 2 | = cosh²x (1 + tanh²x) | Mettre cosh²x en facteur |
  | 3 | cosh²x = 1/(1 − tanh²x) | Identité 1 − tanh² = 1/cosh² |
  | 4 | cosh 2x = (1 + t²)/(1 − t²) | Conclure |
- **Aides** : 1 « Fais apparaître tanh x = sinh x / cosh x en mettant cosh²x en facteur. » · 2 « 1 − tanh²x = 1/cosh²x, donc cosh²x = … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g2_hyp_trig_sign` : (1 − t²)/(1 + t²)) ; `open` (4 points).
- **Pièges** : `g2_hyp_trig_sign`.
- **Sous-buts → crédit** : définitions → `g2-hyp-def`.

### `g2-hyp-eq` — Équations hyperboliques
- **Année** 12.5 · **Prérequis** `g2-hyp-def`, `g2-exp-eq` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g2-hyp-def` : remplacer sinh et cosh par leurs exponentielles.
- **Intro** : on remplace sinh et cosh par leurs exponentielles, on multiplie par eˣ (ou 2eˣ), et on pose t = eˣ > 0. On obtient un trinôme en t.
- **Juge** : `solset` `{subst:true}` · **Forme finale** : ensemble fini exact.
- **Niveaux** :
  - L1 : la ligne en exponentielles est donnée.
  - L2 : multiplier par 2eˣ, avec trous.
  - L3 : choisir : « exponentielles », « multiplier par eˣ », « poser t », « revenir à x ».
  - L4 : libre.
  - L5 : nombre de solutions sans calcul (cosh x = x + 1 : un dessin suffit), ou équation du CMS série 13.
- **Générateur** : a·cosh x + b·sinh x = c : on tire les racines t₁, t₂ > 0 (parmi 1/3, 1/2, 1, 2, 3) d'un trinôme pt² − 2ct + q = 0 avec p = a + b, q = a − b ; on en déduit a, b, c entiers. On rejette a = b (le trinôme dégénère).
- **Corrigé type** : résoudre 2 cosh x + sinh x = 2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | (eˣ + e⁻ˣ) + (eˣ − e⁻ˣ)/2 = 2 | Exponentielles |
  | 2 | 3e²ˣ − 4eˣ + 1 = 0 | Multiplier par 2eˣ |
  | 3 | t = eˣ : 3t² − 4t + 1 = 0, t = 1 ou t = 1/3 | Trinôme (→ `g2-exp-eq`) |
  | 4 | S = {0 ; −ln 3} | Revenir à x |
- **Aides** : 1 « Remplace cosh et sinh par leurs formules en eˣ. » · 2 « × 2eˣ : 2(e²ˣ + 1) + (e²ˣ − 1) = 4eˣ » · 3 la ligne 2.
- **Variantes d'examen** : `open` (5 points) ; `mcq` « Nombre de solutions de cosh x = x + 1 » (2 ; distracteurs 0, 1, 3).
- **Pièges** : `g2_exp_neg_t`, `g2_cosh_one_root`.
- **Sous-buts → crédit** : trinôme en t → `g2-exp-eq`.

### `g2-arg` — argsh, argch, argth
- **Année** 12.5 · **Prérequis** `g2-hyp-eq`, `g1-inverse` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g2-hyp-eq` : argsh y s'obtient en résolvant sinh x = y en t = eˣ.
- **Intro** : argsh y = ln(y + √(y² + 1)) sur ℝ ; argch y = ln(y + √(y² − 1)) pour y ≥ 1, à valeurs ≥ 0 ; argth y = ½ ln((1 + y)/(1 − y)) pour |y| < 1. cosh x = a (a > 1) a **deux** solutions : ±argch a.
- **Juge** : `solset` `{subst:true}` pour l'établissement de la formule (comme `g1-inverse`) ; `value` pour les valeurs · **Forme finale** : formule ou valeur exacte.
- **Niveaux** :
  - L1 : valeurs : argsh(3/4) = ln 2, argch(5/3) = ln 3.
  - L2 : établir argsh avec une charpente à trous (y = sinh u, trinôme en eᵘ).
  - L3 : choisir la racine positive en eᵘ, avec justification.
  - L4 : établir argth ; résoudre cosh x = a.
  - L5 : enchaîné avec `g1-surjective` (bijection sinh : ℝ → ℝ).
- **Générateur** : valeurs y = (k − 1/k)/2 (argsh) ou (k + 1/k)/2 (argch), k ∈ {2 ; 3 ; 4} ; formules en banque.
- **Corrigé type** : résoudre cosh x = 5/3.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | eˣ + e⁻ˣ = 10/3 | Exponentielles |
  | 2 | t = eˣ : 3t² − 10t + 3 = 0 | Trinôme |
  | 3 | t = 3 ou t = 1/3 | Résoudre |
  | 4 | S = {ln 3 ; −ln 3} = {±argch(5/3)} | Revenir à x |
- **Aides** : 1 « cosh est paire : si x est solution, −x aussi. » · 2 « 3t² − 10t + 3 = (3t − 1)(t − …) » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteur `g2_cosh_one_root`) ; `tf` « argch(cosh x) = x pour tout x » (faux : x = −1).
- **Pièges** : `g2_cosh_one_root`, `g2_argsh_sign`.
- **Sous-buts → crédit** : réciproque → `g1-inverse`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g2_exp_sum` | distribute | E | `g2-real-powers` | `g2-real-powers` | e^(x+2) = eˣ + e² → eˣ·e² | Remplacer e^(A + B) par e^A + e^B, et a^A·a^B par a^(A·B). | « Avec x = 0 : e² ≈ 7,4, mais 1 + e² ≈ 8,4. Une somme dans l'exposant donne un produit. » |
| `g2_power_power` | rule | E | `g2-real-powers` | `pow-rules` | (a^(1/2))⁶ = a^(13/2) → a³ | Remplacer (a^p)^q par a^(p+q). | « (a^(1/2))⁶ = a^(1/2)·…·a^(1/2), six fois : on multiplie les exposants. » |
| `g2_log_sum` | distribute | R (Matz) | `g2-log-rules` | `g2-log-rules` | ln(a + b) = ln a + ln b | Remplacer ln(A + B) par ln A + ln B (et log_a de même). | « Avec a = b = 1 : ln 2 ≈ 0,69, mais ln 1 + ln 1 = 0. La règle vaut pour un produit, pas pour une somme. » |
| `g2_log_power` | rule | E | `g2-log-rules` | `g2-log-rules` | ln(x³) = (ln x)³ → 3 ln x | Remplacer ln(Aᵖ) par (ln A)ᵖ. | « Avec x = e : ln(e³) = 3, mais (ln e)³ = 1. L'exposant sort devant. » |
| `g2_log_quotient` | rule | E | `g2-log-rules` | `g2-log-rules` | ln a / ln b = ln(a/b) → ln(a/b) = ln a − ln b | Remplacer ln A − ln B par ln A / ln B, ou l'inverse. | « ln(8)/ln(2) = 3, mais ln(8/2) = ln 4 ≈ 1,39. » |
| `g2_exp_neg_t` | method | E | `g2-exp-eq` | `g2-exp-eq` | t = −2 gardé : eˣ = −2 → rejeté | Garder toutes les racines du trinôme en t et écrire eˣ = tᵢ pour chacune. | « eˣ est toujours > 0 : eˣ = −2 n'a pas de solution. » |
| `g2_log_domain` | method | E | `g2-log-eq` | `g1-domain` | S = {−3 ; 3} → {3} | Renvoyer les solutions de l'équation sans log, sans intersection avec D. | « Pour x = −3, log₂(x − 1) = log₂(−4) n'existe pas. » |
| `g2_log_square_abs` | rule | E | `g2-log-eq` | `g2-log-rules` | ln(x²) = 2 ln x → 2 ln\|x\| | Remplacer ln(A²) par 2 ln A (le domaine se réduit à A > 0). | « ln((−2)²) = ln 4 existe, mais 2 ln(−2) non. ln(x²) = 2 ln\|x\|. » |
| `g2_base_lt1` | sign | E | `g2-ineq` | `g2-ineq` | log_{1/3}(2x − 1) > log_{1/3}(x + 2) → 2x − 1 > x + 2 | Si la base b de prev est < 1, enlever les log sans retourner la relation. | « log_{1/3} est décroissante : log_{1/3} 9 = −2 < log_{1/3} 3 = −1 alors que 9 > 3. » |
| `g2_xx_lost_one` | method | E | `g2-xx` | `@alg:E-produit-nul` | S = {2} → {1 ; 2} | De f·ln x = g·ln x, garder seulement f = g. | « x = 1 : 1 à n'importe quelle puissance vaut 1. C'est le facteur ln x = 0. » |
| `g2_hyp_trig_sign` | sign | E | `g2-hyp-formulas` | `g2-hyp-def` | cosh 2x = cosh²x − sinh²x → cosh²x + sinh²x | Inverser le signe du terme en sinh² (ou sinh·sinh) dans la formule utilisée. | « cosh²x − sinh²x vaut 1, pas cosh 2x. Les formules hyperboliques ont un + là où la trigonométrie a un −. » |
| `g2_cosh_one_root` | method | E | `g2-hyp-eq` | `g2-arg` | cosh x = 5/3 : {ln 3} → {±ln 3} | Garder seulement la racine t ≥ 1 du trinôme en t. | « cosh est paire : cosh(−ln 3) = cosh(ln 3). La racine t = 1/3 donne −ln 3. » |
| `g2_argsh_sign` | sign | E | `g2-arg` | `g2-arg` | eᵘ = y − √(y² + 1) → y + √(y² + 1) | Garder la racine négative du trinôme en eᵘ. | « y − √(y² + 1) < 0 pour tout y, et eᵘ > 0. » |

## Exemples de type examen

**E1 (8 points, d'après MAN 2017).** Résoudre dans ℝ : log_{1/2}(x − 2) ≥ −3 + log₂(x + 5).

| Étape | Attendu | Points |
|---|---|---|
| Domaine | x > 2 | 2 |
| Base | log_{1/2}(x − 2) = −log₂(x − 2) | 2 |
| Regrouper | 3 ≥ log₂((x − 2)(x + 5)), donc (x − 2)(x + 5) ≤ 8 | 2 |
| Trinôme | x² + 3x − 18 ≤ 0 : [−6 ; 3] | 1 |
| Conclusion | S = ]2 ; 3] | 1 |

**E2 (5 points, d'après la série 12 du CMS).** Résoudre (∛x)ˣ = x^(∛x), x > 0.

| Étape | Attendu | Points |
|---|---|---|
| Exponentielles | e^((x/3) ln x) = e^(x^(1/3) ln x) | 1 |
| Factoriser | ln x·(x/3 − x^(1/3)) = 0 | 1,5 |
| Cas ln x = 0 | x = 1 | 1 |
| Cas x/3 = x^(1/3) | x^(2/3) = 3, x = 3√3 | 1,5 |

**E3 (5 points, d'après la série 13 du CMS).** Résoudre 3 cosh x − sinh x = 3.

| Étape | Attendu | Points |
|---|---|---|
| Exponentielles | (3/2)(eˣ + e⁻ˣ) − (1/2)(eˣ − e⁻ˣ) = 3 | 1 |
| Trinôme | t = eˣ : t² − 3t + 2 = 0 | 2 |
| Racines | t = 1, t = 2 (toutes deux > 0) | 1 |
| Conclusion | S = {0 ; ln 2} | 1 |

**E4 (4 points, d'après la série 13 du CMS).** Exprimer sinh 2x en fonction de t = tanh x.

| Étape | Attendu | Points |
|---|---|---|
| Angle double | sinh 2x = 2 sinh x cosh x = 2 tanh x · cosh²x | 2 |
| cosh² | cosh²x = 1/(1 − t²) | 1 |
| Conclusion | sinh 2x = 2t/(1 − t²) | 1 |

**E5 (2 points, d'après MAN 2017, réponse sans justification).** Nombre de solutions de cosh x = x + 1.

| Étape | Attendu | Points |
|---|---|---|
| Réponse | N = 2 (x = 0, et une solution vers 1,6) | 2 |

**E6 (5 points, d'après la série 12 du CMS).** Résoudre e^(x + 4) ≥ e^(√(10 − x²)).

| Étape | Attendu | Points |
|---|---|---|
| Domaine | x ∈ [−√10 ; √10] | 1 |
| Exponentielle croissante | x + 4 ≥ √(10 − x²) | 1 |
| Signe | x + 4 > 0 sur le domaine, on peut élever au carré | 1 |
| Trinôme | 2x² + 8x + 6 ≥ 0 : x ≤ −3 ou x ≥ −1 | 1 |
| Conclusion | S = [−√10 ; −3] ∪ [−1 ; √10] | 1 |

---
# G3. Trigonométrie

Unité `trigo` · préfixe `g3-` · pièges `g3_` · Statut : à faire

**Sources** : MAN, examen Math 1A 2017 (Q7 triangle, Q8 équation, Q9 inéquation a·sin + b·cos, 11 pts, Q11 valeurs exactes et fonctions arc) et examen blanc 1A 2018 (Q3 équation, Q4 inéquation, Q6 vrai/faux sur tan et arccot), formulaire M1A ; CMS, Analyse II, séries 1 (radians) à 9 (fonctions arc et bijections) ; Analyse I GM, série 0 de 2019 (ex. 15 à 17).
**Notation** : angles en radians, sauf pour les triangles (degrés, « ° » obligatoire). Familles « π/6 + 2kπ, k ∈ ℤ » ; `k` est réservé. Arctg et arctan acceptés. Le formulaire M1A (addition, bissection, t = tan(x/2), somme-produit, sinus et cosinus) est disponible dans les items `problem` (bouton « Formulaire »), comme à l'examen.
**Prérequis extérieurs** : `prop-rule3`, `root-rules` (unités de l'école), `@alg:C-developper`, `@alg:E-produit-nul`. Crédit indirect seulement : `@alg:D-trinome`, `@alg:G-equations`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `prop-rule3`, `root-rules`, `g9-intervals`, `g1-inverse`.

Équations et inéquations : `solset` `{v:'x', domain, periodic:true}`. Le domaine est ℝ (forme finale en familles) ou un intervalle donné (forme finale en intervalles ou ensemble fini). Les familles sont comparées par `sets.js` (`fromFamilies`) sur [−4π ; 4π].

## Compétences

### `g3-radians` — Radians et degrés
- **Année** 12 · **Prérequis** `prop-rule3` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : π rad = 180°. Pour passer en radians, on multiplie par π/180. Longueur d'arc : L = rθ, avec θ en radians. Exemple : 240° = 240·π/180 = 4π/3.
- **Juge** : `value` (exact, multiples rationnels de π) ; `value` avec `tol` pour les approximations en degrés et minutes · **Forme finale** : fraction de π irréductible, ou degrés.
- **Niveaux** :
  - L1 : angles remarquables (30°, 45°, 60°, 90°) avec la règle de trois à trous.
  - L2 : multiples (210°, 240°, 330°).
  - L3 : dans les deux sens, choix de l'opération (× π/180 ou × 180/π).
  - L4 : longueur d'arc et secteur (CMS série 1 ; série 0 GM : arc de 30° sur un rayon de 12 cm).
  - L5 : angles d'un polygone régulier en radians (CMS série 1).
- **Générateur** : multiples de 15° dans [−360 ; 720] ; rayons entiers dans [2 ; 20] ; 1 rad en degrés et minutes avec π ≈ 22/7 (CMS).
- **Corrigé type** : longueur de l'arc d'un cercle de rayon 12 cm sous-tendu par un angle de 30°.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | θ = 30·π/180 = π/6 | Convertir en radians |
  | 2 | L = 12·π/6 | L = rθ |
  | 3 | L = 2π cm | Calculer |
- **Aides** : 1 « L = rθ demande θ en radians. » · 2 « 30° = 30·π/180 = … » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (distracteur `g3_deg_rad` : L = 360 cm).
- **Pièges** : `g3_deg_rad`.
- **Sous-buts → crédit** : convertir → `prop-rule3`.

### `g3-reduce` — Cercle trigonométrique, réduction d'angles
- **Année** 12 · **Prérequis** `g3-radians` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g3-radians` : angles en radians, tours de 2π.
- **Intro** : on retire des tours entiers (2π pour sin et cos, π pour tan), puis on lit le quadrant. Angles associés : cos(π − x) = −cos x, sin(π − x) = sin x, cos(π/2 − x) = sin x, sin(π/2 + x) = cos x. Exemple : cos(53π/6) = cos(5π/6) = −√3/2.
- **Juge** : `equiv` (nombres avec radicaux, et expressions en x) · **Forme finale** : valeur exacte ; ou une seule fonction de x.
- **Niveaux** :
  - L1 : cercle dessiné, angle déjà réduit ; lire la valeur.
  - L2 : réduire (retirer des multiples de 2π), puis lire.
  - L3 : choisir l'angle associé dans un menu (π − x, π + x, π/2 − x…).
  - L4 : libre (CMS série 2 : cos(179π/3), tan(163π/4)…) ; expressions (CMS série 3 : cos(7π − x), cot(−5π/2 − x)).
  - L5 : sin(x + nπ/2) selon n (CMS série 3), ou une série mixte.
- **Générateur** : angles pπ/q, q ∈ {2 ; 3 ; 4 ; 6}, p tiré pour que |pπ/q| ∈ [4π ; 30π] ; fonction tirée dans {sin, cos, tan, cot}. Expressions : kπ/2 ± x, k ∈ [−9 ; 9].
- **Corrigé type** : calculer cos(53π/6), puis écrire cos(7π − x) avec cos x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 53π/6 = 8π + 5π/6 | Retirer des tours |
  | 2 | cos(53π/6) = cos(5π/6) = −cos(π/6) | Angle associé π − π/6 |
  | 3 | = −√3/2 | Valeur |
  | 4 | cos(7π − x) = cos(π − x) = −cos x | Réduire l'expression |
- **Aides** : 1 « 8π fait 4 tours : on peut l'enlever. » · 2 « 5π/6 = π − π/6, donc cos(5π/6) = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g3_reduce_sign`, `g3_reduce_swap`) ; `tf` « tan(x + π) = −tan x » (faux : x = π/4).
- **Pièges** : `g3_reduce_sign`, `g3_reduce_swap`.
- **Sous-buts → crédit** : aucun.

### `g3-identities` — Formules d'addition, d'angle double, de bissection, somme-produit
- **Année** 12 · **Prérequis** `@alg:C-developper` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b. D'où sin 2x = 2 sin x cos x et cos 2x = 2cos²x − 1 = 1 − 2sin²x. Bissection : cos²x = (1 + cos 2x)/2. Somme-produit : sin p + sin q = 2 sin((p + q)/2) cos((p − q)/2). Ce sont les formules du formulaire M1A.
- **Juge** : `equiv` `{vars:['x'], domain:{x:[-3,3]}}` (points où une expression n'est pas définie retirés) · **Forme finale** : selon la consigne (« une seule fonction trigonométrique de x », « produit »…).
- **Niveaux** :
  - L1 : formule donnée, appliquer avec trous.
  - L2 : choisir la formule parmi 4, puis l'appliquer.
  - L3 : `rule` « Quelle formule ? » après une ligne juste ; simplification en 2 ou 3 lignes.
  - L4 : libre : démontrer une identité (on transforme un membre jusqu'à l'autre).
  - L5 : transformer une somme en produit pour résoudre (sin 3x + sin x = 0).
- **Générateur** : banque de 25 identités paramétrées (tan x = sin 2x/(1 + cos 2x), cos⁴x − sin⁴x = cos 2x, sin 3x = 3 sin x − 4 sin³x…), avec des multiples kx, k ∈ {1 ; 2 ; 3}. Pour L5, sommes sin(px) ± sin(qx), p, q ∈ [1 ; 5].
- **Corrigé type** : montrer que sin 2x / (1 + cos 2x) = tan x.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 2 sin x cos x / (1 + cos 2x) | Angle double au numérateur |
  | 2 | 2 sin x cos x / (2cos²x) | cos 2x = 2cos²x − 1 |
  | 3 | sin x / cos x | Simplifier |
  | 4 | tan x | Conclure |
- **Aides** : 1 « Choisis la forme de cos 2x qui annule le 1. » · 2 « 1 + cos 2x = 1 + (2cos²x − 1) = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g3_linear`, `g3_add_sign`) ; `tf` « sin(a + b) = sin a + sin b » (faux : a = b = π/2).
- **Pièges** : `g3_linear`, `g3_add_sign`.
- **Sous-buts → crédit** : développer → `@alg:C-developper`.

### `g3-exact` — Valeurs exactes sans calculatrice
- **Année** 12 · **Prérequis** `g3-identities`, `root-rules` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : on écrit l'angle comme somme, différence ou moitié d'angles connus. 7π/12 = π/3 + π/4 ; π/8 = (π/4)/2. Pour une moitié, le signe se lit sur le quadrant. tan(x/2) = (1 − cos x)/sin x évite le signe.
- **Juge** : `equiv` (valeurs exactes avec radicaux) · **Forme finale** : radicaux simplifiés, dénominateur sans racine.
- **Niveaux** :
  - L1 : la décomposition est donnée.
  - L2 : choisir la décomposition (somme ou moitié).
  - L3 : choisir la formule (addition, bissection, tan(x/2)).
  - L4 : libre (CMS série 4 : cos(7π/12), sin(π/12), tan(5π/12), tan(π/8)).
  - L5 : sin x et cos x de 2x connaissant sin x et le quadrant (CMS série 4, MAN 2017 Q11a).
- **Générateur** : angles kπ/12 et kπ/8 (k impair), fonction tirée ; données « sin x = ±3/5 ou cot x = ±2√2 avec x dans un quadrant donné ».
- **Corrigé type** : calculer cos(11π/12).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 11π/12 = 2π/3 + π/4 | Décomposer |
  | 2 | cos(2π/3)cos(π/4) − sin(2π/3)sin(π/4) | Formule d'addition (→ `g3-identities`) |
  | 3 | (−1/2)(√2/2) − (√3/2)(√2/2) | Valeurs connues |
  | 4 | −(√2 + √6)/4 | Simplifier (→ `root-rules`) |
- **Aides** : 1 « 11π/12 = 8π/12 + 3π/12. » · 2 « cos(a + b) = cos a cos b − … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g3_add_sign` : (√6 − √2)/4, `g3_half_sign`) ; `open` (2 points, réponse seule).
- **Pièges** : `g3_add_sign`, `g3_half_sign`, `g3_linear`.
- **Sous-buts → crédit** : formule d'addition → `g3-identities` ; simplifier → `root-rules`.

### `g3-basic-eq` — Équations de base : cos x = a, sin x = a, tan x = a
- **Année** 12 · **Prérequis** `g3-reduce`, `g9-intervals` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g3-reduce` : lire l'angle α sur le cercle trigonométrique.
- **Intro** : cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ. sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ. tan u = tan α ⇔ u = α + kπ. Si u = 2x, on divise **aussi** la période par 2.
- **Juge** : `solset` `{periodic:true}` · **Forme finale** : familles (domaine ℝ) ou liste (intervalle donné).
- **Niveaux** :
  - L1 : u = x, a remarquable ; une famille donnée, l'autre à trous.
  - L2 : u = x − φ.
  - L3 : u = kx − φ, avec le choix de la formule (cos, sin, tan).
  - L4 : libre, puis restriction à un intervalle ([0 ; 2π[ ou [−π ; π]).
  - L5 : sin(2x) = sin(x) sur [0 ; 2π] (série 0 GM) ou cos u = −sin v (à ramener à cos u = cos w).
- **Générateur** : u = kx + φ, k ∈ {1 ; 2 ; 3 ; 1/2}, φ multiple de π/6 ou π/4 ; a ∈ {0 ; ±1/2 ; ±√2/2 ; ±√3/2 ; ±1} (et ±1, ±√3, ±1/√3 pour tan). Les cas a = ±1 (une seule famille) sont tirés une fois sur six.
- **Corrigé type** : résoudre cos(2x − π/3) = 1/2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 2x − π/3 = π/3 + 2kπ ou 2x − π/3 = −π/3 + 2kπ | Deux familles |
  | 2 | 2x = 2π/3 + 2kπ ou 2x = 2kπ | Isoler 2x |
  | 3 | x = π/3 + kπ ou x = kπ | Diviser aussi la période |
- **Aides** : 1 « cos u = 1/2 : u = ±π/3 + 2kπ. » · 2 « 2x = 2π/3 + 2kπ, donc x = π/3 + … » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g3_family_missing`, `g3_period_divide`, `g3_sin_family`) ; `tf` « sin x = 1/2 a exactement deux solutions dans [0 ; 2π[ » (vrai).
- **Pièges** : `g3_family_missing`, `g3_sin_family`, `g3_period_divide`, `g3_deg_rad`.
- **Sous-buts → crédit** : restriction à un intervalle → `g9-intervals`.

### `g3-eq` — Équations trigonométriques
- **Année** 12.5 · **Prérequis** `g3-basic-eq`, `g3-identities`, `@alg:E-produit-nul` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g3-identities` : cos²x = 1 − sin²x, angle double ; `@alg:E-produit-nul` : factoriser puis appliquer le produit nul.
- **Intro** : on ramène à des équations de base. Outils : une seule fonction (cos²x = 1 − sin²x) puis substitution ; factorisation et produit nul ; équation homogène en sin et cos : on divise par cos²x **après avoir vérifié** que cos x = 0 ne donne pas de solution.
- **Juge** : `solset` `{periodic:true, subst:true}` · **Forme finale** : familles, ou liste sur l'intervalle.
- **Niveaux** :
  - L1 : la substitution X = cos x est faite ; trinôme à résoudre.
  - L2 : réécrire en une seule fonction.
  - L3 : décision « méthode » : « une seule fonction », « factoriser », « diviser par cos²x » (avec message si le cas cos x = 0 n'est pas vu).
  - L4 : libre (CMS série 6 : tan x + 3 sin²x − cos²x = 0, 2 sin²x + √3 sin 2x − 3 = 0).
  - L5 : MAN 2017 Q8 ou examen blanc 2018 Q3, nombres changés, avec domaine imposé.
- **Générateur** : on tire les valeurs de base (deux parmi {0 ; ±1/2 ; ±√2/2 ; ±1} pour cos ou sin, ou deux valeurs entières de tan) et on construit le trinôme (X − v₁)(X − v₂) ; on le réécrit en sin et cos, éventuellement avec cos 2x ou sin 2x. Homogène : a sin²x + b sin x cos x + c cos²x avec tan-racines entières.
- **Corrigé type** : résoudre 2cos²x − 3cos x + 1 = 0.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Posons X = cos x : 2X² − 3X + 1 = 0 | Substitution |
  | 2 | (2X − 1)(X − 1) = 0 | Factoriser (→ `@alg:D-trinome`) |
  | 3 | cos x = 1/2 ou cos x = 1 | Revenir à x |
  | 4 | x = ±π/3 + 2kπ ou x = 2kπ | Équations de base (→ `g3-basic-eq`) |
- **Aides** : 1 « C'est un trinôme en cos x. » · 2 « 2X² − 3X + 1 = (2X − 1)(X − …) » · 3 la ligne 2.
- **Variantes d'examen** : `open` (4 points, voir Exemples) ; `mcq` (distracteurs `g3_divide_zero`, `g3_family_missing`).
- **Pièges** : `g3_divide_zero`, `g3_family_missing`, `g3_period_divide`.
- **Sous-buts → crédit** : factoriser → `@alg:D-trinome` ; équations de base → `g3-basic-eq`.

### `g3-asinbcos` — a sin x + b cos x : équations
- **Année** 12.5 · **Prérequis** `g3-basic-eq`, `g3-identities` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : a sin x + b cos x = R sin(x + φ) avec R = √(a² + b²), cos φ = a/R, sin φ = b/R. On divise par R, on reconnaît une formule d'addition, puis on résout l'équation de base. Si |c| > R, pas de solution.
- **Juge** : `equiv` pour la mise sous forme R sin(x + φ) (ou R cos(x − φ)) ; `solset` `{periodic:true}` ensuite · **Forme finale** : familles.
- **Niveaux** :
  - L1 : R et φ donnés ; l'élève écrit l'équation de base et la résout.
  - L2 : R donné ; l'élève trouve φ.
  - L3 : choisir la forme (R sin(x + φ) ou R cos(x − φ)) ; les deux sont justes.
  - L4 : libre (CMS série 5 : sin x − √3 cos x = √2 ; sin x + 2 cos x = 9 sans solution).
  - L5 : avec 2x ou 3x et un intervalle (CMS série 5 : sin 2x − cos 2x + 1 = 0 sur [−5π ; −3π]).
- **Générateur** : (a, b) ∈ {(1, √3), (√3, 1), (1, 1), (√3, −1), (2, 2√3), (√12, −2)…} pour un φ remarquable ; c/R ∈ {0 ; ±1/2 ; ±√2/2 ; ±√3/2 ; ±1} ; argument kx, k ∈ {1 ; 2 ; 3}. Une fois sur huit, |c| > R.
- **Corrigé type** : résoudre √3 sin x + cos x = √2.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | R = √(3 + 1) = 2 : (√3/2) sin x + (1/2) cos x = √2/2 | Diviser par R |
  | 2 | sin(x + π/6) = √2/2 | Formule d'addition, φ = π/6 |
  | 3 | x + π/6 = π/4 + 2kπ ou x + π/6 = 3π/4 + 2kπ | Équation de base (→ `g3-basic-eq`) |
  | 4 | x = π/12 + 2kπ ou x = 7π/12 + 2kπ | Isoler x |
- **Aides** : 1 « Divise par √(a² + b²) = 2. » · 2 « cos(π/6) sin x + sin(π/6) cos x = sin(x + …) » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g3_rphi`) ; `open` (dans les inéquations de type MAN).
- **Pièges** : `g3_rphi`, `g3_sin_family`.
- **Sous-buts → crédit** : équation de base → `g3-basic-eq` ; formule d'addition → `g3-identities`.

### `g3-bioche` — Substitution t = tan(x/2)
- **Année** 12.5 · **Prérequis** `g3-basic-eq` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g3-basic-eq` : revenir de tan(x/2) = t à x.
- **Intro** : avec t = tan(x/2) : sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), tan x = 2t/(1 − t²). L'équation devient rationnelle en t. Cette substitution n'existe pas pour x = π + 2kπ : on teste ces valeurs à part.
- **Juge** : `solset` `{periodic:true, subst:true}` (substitution t = tan(x/2), `range` ℝ, valeurs x = π + 2kπ hors substitution) · **Forme finale** : familles, y compris π + 2kπ si c'est une solution.
- **Niveaux** :
  - L1 : les expressions en t sont écrites ; l'élève résout en t.
  - L2 : l'élève substitue, avec le formulaire ouvert.
  - L3 : décision « tester x = π + 2kπ » avant ou après ; message si oublié.
  - L4 : libre.
  - L5 : CMS série 6 : 1 + 2 sin x + cos x + 2 tan x = 0, ou MAN 2017 Q8 (domaine qui exclut π + 2kπ).
- **Générateur** : a sin x + b cos x = c avec c = −b une fois sur deux (alors x = π est solution et l'équation en t perd son t²) ; t-racines rationnelles simples (±1, ±2, ±1/2, ±3) pour que les familles s'écrivent 2 arctan(r) + 2kπ.
- **Corrigé type** : résoudre 2 sin x − cos x = 1.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | x = π + 2kπ : 2·0 − (−1) = 1 ✓, ce sont des solutions | Tester les valeurs hors substitution |
  | 2 | t = tan(x/2) : 4t/(1 + t²) − (1 − t²)/(1 + t²) = 1 | Substituer |
  | 3 | 4t − 1 + t² = 1 + t², donc t = 1/2 | Résoudre en t |
  | 4 | x = 2 arctan(1/2) + 2kπ ou x = π + 2kπ | Revenir à x |
- **Aides** : 1 « La substitution oublie x = π + 2kπ : teste-les d'abord. » · 2 « × (1 + t²) : 4t − (1 − t²) = 1 + t² » · 3 la ligne 3.
- **Variantes d'examen** : `open` (dans un problème de 6 à 13 points) ; `mcq` (distracteur `g3_bioche_pi`).
- **Pièges** : `g3_bioche_pi`.
- **Sous-buts → crédit** : équation en t → `@alg:G-equations`.

### `g3-ineq` — Inéquations trigonométriques
- **Année** 12.5 · **Prérequis** `g3-asinbcos` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 3
- **Intro** : on se ramène à cos u ≥ c (ou sin, tan). Sur le cercle, on lit l'arc solution, on l'écrit comme intervalle + 2kπ, on revient à x, puis on garde les morceaux qui tombent dans l'intervalle donné, k par k.
- **Juge** : `solset` `{domain:'[a ; b]', periodic:true}` · **Forme finale** : union d'intervalles (et points isolés) dans [a ; b].
- **Niveaux** :
  - L1 : cos x ≥ 1/2 sur [0 ; 2π], cercle dessiné.
  - L2 : u = x + φ, intervalle [0 ; 2π].
  - L3 : a sin x + b cos x ≥ c, choix d'action ; la restriction est faite avec un tableau des k.
  - L4 : libre, argument 2x.
  - L5 : MAN 2017 Q9 (argument 4x, intervalle [π/2 ; 3π/2]) ou examen blanc 2018 Q4, nombres changés.
- **Générateur** : comme `g3-asinbcos`, avec une relation tirée parmi < ≤ > ≥ et un intervalle [0 ; 2π], [0 ; π] ou [π/2 ; 3π/2]. On impose qu'au moins une borne de l'intervalle coupe un arc (les morceaux tronqués sont ce qui coûte des points).
- **Corrigé type** : résoudre 2 cos x − 2√3 sin x ≥ 2 sur [0 ; 2π].

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 4 cos(x + π/3) ≥ 2 | Forme R cos(x + φ) (→ `g3-asinbcos`) |
  | 2 | cos(x + π/3) ≥ 1/2 | Diviser par R |
  | 3 | −π/3 + 2kπ ≤ x + π/3 ≤ π/3 + 2kπ | Arc solution |
  | 4 | −2π/3 + 2kπ ≤ x ≤ 2kπ | Isoler x |
  | 5 | k = 0 : {0} ; k = 1 : [4π/3 ; 2π] | Restreindre à [0 ; 2π] |
  | 6 | S = {0} ∪ [4π/3 ; 2π] | Conclure |
- **Aides** : 1 « cos u ≥ 1/2 : u est dans l'arc entre −π/3 et π/3. » · 2 « −π/3 ≤ x + π/3 ≤ π/3, donc x ∈ [… ; 0] (+ 2kπ) » · 3 la ligne 4.
- **Variantes d'examen** : `open` (3,5 ou 11 points, voir Exemples) ; `mcq` (distracteurs `g3_ineq_arc`, `g3_ineq_window`).
- **Pièges** : `g3_ineq_arc`, `g3_ineq_window`, `g3_rphi`.
- **Sous-buts → crédit** : forme R cos → `g3-asinbcos` ; restreindre → `g9-intervals`.

### `g3-triangle` — Résoudre un triangle
- **Année** 12 · **Prérequis** `g3-exact` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : théorème du cosinus a² = b² + c² − 2bc cos α : deux côtés et l'angle compris, ou trois côtés. Théorème du sinus a/sin α = b/sin β : un côté et deux angles, ou deux côtés et un angle opposé. Dans ce dernier cas, sin β = s a deux solutions β et 180° − β : on teste les deux.
- **Juge** : `value` (exact) ; `value` avec `tol: 0.01` pour les angles en degrés (ajout 6 du début du fichier) · **Forme finale** : tous les côtés et angles demandés.
- **Niveaux** :
  - L1 : le théorème est choisi ; l'élève remplit.
  - L2 : choisir le théorème selon les données.
  - L3 : arbre de décision (« quelles données ? » → théorème).
  - L4 : libre ; cas ambigu (CMS série 7 : a = 7, c = 10, α = 30°).
  - L5 : MAN 2017 Q7 : angle d'un triangle donné par ses côtés, puis un point sur un côté.
- **Générateur** : triangles à valeurs exactes (côtés entiers avec cos remarquable : 5, 8, γ = 60° → 7 ; 7, 5, 8 → α = 60° ; 3, 5, 7 → 120°) pour MAN (sans calculatrice) ; triangles quelconques avec angles en degrés entiers pour CMS (calculatrice).
- **Corrigé type** : a = 5, b = 8, γ = 60°. Calculer c, puis α et β.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | c² = 25 + 64 − 2·5·8·(1/2) = 49 | Théorème du cosinus |
  | 2 | c = 7 | Racine |
  | 3 | cos α = (64 + 49 − 25)/(2·8·7) = 11/14 | Cosinus pour α |
  | 4 | α ≈ 38,21° | Arccos |
  | 5 | β = 180° − 60° − 38,21° ≈ 81,79° | Somme des angles |
- **Aides** : 1 « Deux côtés et l'angle entre eux : théorème du cosinus. » · 2 « c² = a² + b² − 2ab cos γ = … » · 3 la ligne 1.
- **Variantes d'examen** : `open` (3 à 8 points, voir Exemples) ; `mcq` (distracteurs `g3_cos_law_sign` : c = √129, `g3_ssa_lost`).
- **Pièges** : `g3_cos_law_sign`, `g3_ssa_lost`, `g3_deg_rad`.
- **Sous-buts → crédit** : valeurs exactes → `g3-exact`.

### `g3-arc-def` — Fonctions arc : définition et arccos(cos θ)
- **Année** 12 · **Prérequis** `g3-reduce`, `g1-inverse` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g1-inverse` : un arc est la réciproque d'une restriction bijective.
- **Intro** : arcsin : [−1 ; 1] → [−π/2 ; π/2] ; arccos : [−1 ; 1] → [0 ; π] ; arctan : ℝ → ]−π/2 ; π/2[. arccos(cos θ) = θ **seulement si** θ ∈ [0 ; π]. Sinon on cherche l'angle de [0 ; π] qui a le même cosinus.
- **Juge** : `value` (multiples rationnels de π) · **Forme finale** : angle dans l'image de la fonction arc.
- **Niveaux** :
  - L1 : arcsin(1/2), arccos(−√2/2), arctan(−1).
  - L2 : arccos(cos θ) avec θ ∈ [−π ; 2π].
  - L3 : choisir l'angle associé qui tombe dans l'image.
  - L4 : libre (CMS série 8 : arccos(cos(17π/3)), arcsin(sin(…)), arctan(tan(…))).
  - L5 : vrai/faux de l'examen blanc MAN 2018 Q6 (monotonie de tan et cot, nombre de solutions de arctan x = arccot x).
- **Générateur** : θ = pπ/q, q ∈ {3 ; 4 ; 6}, |θ| ≤ 8π ; fonction tirée ; on rejette θ déjà dans l'image (sauf au niveau 1).
- **Corrigé type** : calculer arccos(cos(13π/4)).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 13π/4 = 4π − 3π/4 | Réduire |
  | 2 | cos(13π/4) = cos(−3π/4) = cos(3π/4) | cos est paire |
  | 3 | 3π/4 ∈ [0 ; π] | Vérifier l'image |
  | 4 | arccos(cos(13π/4)) = 3π/4 | Conclure |
- **Aides** : 1 « Le résultat doit être dans [0 ; π]. » · 2 « cos(−3π/4) = cos(…) » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g3_arc_cancel` : 13π/4) ; `tf` (examen blanc MAN 2018 Q6, voir Exemples).
- **Pièges** : `g3_arc_cancel`, `g3_reduce_sign`.
- **Sous-buts → crédit** : réduire → `g3-reduce`.

### `g3-arc-comp` — Compositions : cos(2 arccos a), tan(arcsin a)
- **Année** 12.5 · **Prérequis** `g3-arc-def`, `g3-identities` · **Étiquettes** MAN, CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g3-arc-def` : poser θ = arcsin a avec θ dans le bon intervalle.
- **Intro** : on pose θ = arcsin a (ou arccos a, arctan a), on écrit ce qu'on sait (sin θ = a, θ ∈ [−π/2 ; π/2]), on en déduit les autres valeurs avec le **signe** donné par l'intervalle, puis on applique une formule. Exemple : cos(arcsin a) = √(1 − a²) ≥ 0.
- **Juge** : `equiv` (valeurs exactes) · **Forme finale** : valeur exacte simplifiée.
- **Niveaux** :
  - L1 : θ et son intervalle sont écrits ; l'élève calcule cos θ.
  - L2 : signe à choisir (+ ou −) avec justification par l'intervalle.
  - L3 : choisir la formule (angle double, addition).
  - L4 : libre (CMS série 8 : cos(arcsin(−3/5))… nombres changés).
  - L5 : expression en x : cos(2 arctan x) = (1 − x²)/(1 + x²), puis une équation qui l'utilise (CMS série 9).
- **Générateur** : a tiré parmi les fractions de triplets pythagoriciens (3/5, 4/5, 5/13, 12/13, 8/17) avec un signe, ou a ∈ {1/3 ; 1/4 ; 2/5} (radicaux) ; fonctions intérieure et extérieure tirées ; argument 1 ou 2 fois l'arc.
- **Corrigé type** : calculer tan(arcsin(−3/5)).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | θ = arcsin(−3/5) : sin θ = −3/5, θ ∈ [−π/2 ; π/2] | Poser θ |
  | 2 | cos θ = +√(1 − 9/25) = 4/5 | cos ≥ 0 sur [−π/2 ; π/2] |
  | 3 | tan θ = (−3/5)/(4/5) = −3/4 | Quotient |
- **Aides** : 1 « Sur [−π/2 ; π/2], le cosinus est positif. » · 2 « cos θ = √(1 − sin²θ) = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g3_arc_root_sign` : 3/4) ; `open` (2 points, réponse seule, format MAN Q11).
- **Pièges** : `g3_arc_root_sign`, `g3_arc_cancel`.
- **Sous-buts → crédit** : formule → `g3-identities`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g3_deg_rad` | notation | E | `g3-radians` | `g3-radians` | L = 12·30 = 360 cm → 2π cm ; x = 30° + 2kπ → π/6 + 2kπ | Remplacer chaque angle de prev par sa valeur dans l'autre unité sans conversion ; dans une famille, mélanger 360 et 2π. | « L = rθ demande θ en radians : 30° = π/6. Et une famille ne mélange pas degrés et radians. » |
| `g3_reduce_sign` | sign | E | `g3-reduce` | `g3-reduce` | cos(5π/6) = cos(π/6) → −cos(π/6) | Dans la ligne d'angle associé, garder le signe + quel que soit le quadrant. | « 5π/6 est dans le 2e quadrant, où le cosinus est négatif. » |
| `g3_reduce_swap` | rule | E | `g3-reduce` | `g3-reduce` | cos(π/2 + x) = cos x → −sin x | Pour un angle associé en π/2 ± x, garder la même fonction au lieu d'échanger sin et cos. | « Avec x = 0 : cos(π/2) = 0, mais cos 0 = 1. Autour de π/2, sin et cos s'échangent. » |
| `g3_linear` | distribute | E | `g3-identities` | `g3-identities` | sin(a + b) = sin a + sin b ; cos 2x = 2cos x | Remplacer f(A + B) par f(A) + f(B), et f(kA) par k·f(A). | « Avec a = b = π/2 : sin π = 0, mais sin(π/2) + sin(π/2) = 2. sin n'est pas linéaire. » |
| `g3_add_sign` | sign | E | `g3-identities` | `g3-identities` | cos(a + b) = cos a cos b + sin a sin b → − | Inverser le signe entre les deux produits de la formule d'addition utilisée. | « Avec a = b = π/4 : cos(π/2) = 0, mais 1/2 + 1/2 = 1. Pour cos(a + b), c'est un moins. » |
| `g3_half_sign` | sign | E | `g3-exact` | `g3-exact` | cos(7π/8) = +√((1 + cos(7π/4))/2) → − | Prendre le signe + devant la racine de la formule de bissection. | « 7π/8 est dans le 2e quadrant : son cosinus est négatif. » |
| `g3_family_missing` | method | E | `g3-basic-eq` | `g3-basic-eq` | cos x = 1/2 : x = π/3 + 2kπ → ±π/3 + 2kπ | Retirer la seconde famille de prev. | « −π/3 a le même cosinus que π/3. Sur le cercle, il y a deux points. » |
| `g3_sin_family` | rule | E | `g3-basic-eq` | `g3-basic-eq` | sin x = 1/2 : x = −π/6 + 2kπ → 5π/6 + 2kπ | Pour sin, écrire −α + 2kπ au lieu de π − α + 2kπ. | « sin(−π/6) = −1/2. Pour sin, le second point est π − α. » |
| `g3_period_divide` | rule | E | `g3-basic-eq` | `g3-basic-eq` | 2x = α + 2kπ → x = α/2 + 2kπ au lieu de α/2 + kπ | Diviser α mais pas la période ; ou tan avec 2kπ au lieu de kπ. | « x = α/2 + π est aussi solution : 2x = α + 2π. Divise aussi 2kπ par 2. » |
| `g3_divide_zero` | method | E | `g3-eq` | `@alg:E-produit-nul` | ÷ cos x : π/2 + kπ perdus | Retirer de la solution les familles où le diviseur de prev s'annule. | « Tu as divisé par cos x. Pour x = π/2, cos x = 0 : vérifie à part si ces x sont solutions. » |
| `g3_rphi` | rule | E | `g3-asinbcos` | `g3-asinbcos` | √3 sin x + cos x = (√3 + 1) sin(x + …) → 2 sin(x + π/6) | Prendre R = \|a\| + \|b\|, ou φ = arctan(b/a) ± π (mauvais quadrant). | « R = √(a² + b²) = 2. Vérifie avec x = 0 : 2 sin(π/6) = 1 = b. » |
| `g3_bioche_pi` | method | E | `g3-bioche` | `g3-bioche` | S = {2 arctan(1/2) + 2kπ} → ∪ {π + 2kπ} | Retirer de S la famille π + 2kπ. | « tan(x/2) n'existe pas pour x = π. Or 2 sin π − cos π = 1 : x = π est solution. » |
| `g3_ineq_arc` | sign | E | `g3-ineq` | `g3-basic-eq` | cos u ≥ 1/2 : [π/3 ; 5π/3] → [−π/3 ; π/3] | Remplacer l'arc de prev par l'arc complémentaire sur une période. | « Teste u = π : cos π = −1, pas ≥ 1/2. L'arc solution entoure 0. » |
| `g3_ineq_window` | method | E | `g3-ineq` | `g9-intervals` | S = [−2π/3 ; 0] → {0} ∪ [4π/3 ; 2π] | Garder seulement k = 0, sans couper à [a ; b] ; ou oublier un k. | « Ta solution sort de [0 ; 2π] et oublie k = 1. Teste chaque k et coupe à l'intervalle. » |
| `g3_cos_law_sign` | sign | E | `g3-triangle` | `g3-triangle` | c² = a² + b² + 2ab cos γ → − | Inverser le signe du terme 2ab cos γ. | « Avec γ = 90°, on doit retrouver Pythagore. Avec γ = 60°, c doit être plus petit que pour 90°. » |
| `g3_ssa_lost` | method | E | `g3-triangle` | `g3-triangle` | sin β = s : β seul → β ou 180° − β | Garder seulement β = arcsin(s). | « 180° − β a le même sinus. Vérifie si la somme des angles le permet. » |
| `g3_arc_cancel` | rule | E | `g3-arc-def` | `g3-arc-def` | arccos(cos(13π/4)) = 13π/4 → 3π/4 | Remplacer arc(f(θ)) par θ. | « arccos donne un angle de [0 ; π]. 13π/4 n'y est pas. » |
| `g3_arc_root_sign` | sign | E | `g3-arc-comp` | `g3-arc-def` | cos(arcsin(−3/5)) = −4/5 → 4/5 | Donner à la racine le signe de l'argument a. | « θ = arcsin(−3/5) est dans [−π/2 ; 0] : son cosinus est positif. » |

## Exemples de type examen

**E1 (3,5 points, d'après l'examen blanc MAN 2018).** Résoudre √12 cos 2x + 2 sin 2x ≥ 2 sur [0 ; π].

| Étape | Attendu | Points |
|---|---|---|
| Forme | 4 cos(2x − π/6) ≥ 2 | 1,5 |
| Base | −π/12 + kπ ≤ x ≤ π/4 + kπ | 1 |
| Restriction | S = [0 ; π/4] ∪ [11π/12 ; π] | 1 |

**E2 (11 points, d'après MAN 2017).** Résoudre √3 sin 2x + cos 2x > 1 sur [0 ; 2π].

| Étape | Attendu | Points |
|---|---|---|
| Forme | 2 sin(2x + π/6) > 1 | 3 |
| Arc | π/6 + 2kπ < 2x + π/6 < 5π/6 + 2kπ | 2 |
| Isoler | kπ < x < π/3 + kπ | 2 |
| Restriction | k = 0 : ]0 ; π/3[ ; k = 1 : ]π ; 4π/3[ ; k = 2 : vide dans [0 ; 2π] | 3 |
| Conclusion | S = ]0 ; π/3[ ∪ ]π ; 4π/3[ | 1 |

**E3 (4 points, d'après l'examen blanc MAN 2018).** Résoudre sin²x − 3 sin x cos x + 2 cos²x = 0.

| Étape | Attendu | Points |
|---|---|---|
| Cas cos x = 0 | sin²x = 1 ≠ 0 : pas de solution | 1 |
| Diviser | tan²x − 3 tan x + 2 = 0 | 1 |
| Racines | tan x = 1 ou tan x = 2 | 1 |
| Familles | x = π/4 + kπ ou x = arctan 2 + kπ | 1 |

**E4 (8 points, d'après MAN 2017).** Triangle ABC avec a = 7, b = 5, c = 8. (a) Calculer α. (b) D est sur le segment AB et CD = 5√6/2. Calculer δ = ∠ADC.

| Étape | Attendu | Points |
|---|---|---|
| a | cos α = (25 + 64 − 49)/80 = 1/2, α = 60° | 3 |
| b, sinus | Dans ADC : sin δ = 5 sin 60° / (5√6/2) = √2/2 | 2 |
| b, deux cas | δ = 45° ou δ = 135° | 1 |
| b, tri | 135° + 60° > 180° : δ = 45° | 2 |

**E5 (4 points, d'après MAN 2017, réponses seules).** (a) α ∈ [π ; 3π/2] et tan α = 3/4 : donner sin α. (b) Calculer cos(arcsin(−1/3)).

| Étape | Attendu | Points |
|---|---|---|
| a | sin α = −3/5 | 2 |
| b | 2√2/3 | 2 |

**E6 (2,5 points, d'après l'examen blanc MAN 2018, sans justification).**

| Question | Attendu | Points |
|---|---|---|
| Vrai ou faux : ∀α, β ∈ ]−π/2 ; π/2[, tan α > tan β ⇔ α > β | Vrai | 0,5 |
| Vrai ou faux : cot est décroissante sur ]−π/2 ; 0[ ∪ ]0 ; π/2[ | Faux (cot(−π/4) = −1 < cot(π/4) = 1) | 0,5 |
| Valeurs de p pour lesquelles tan α = p a exactement 2 solutions dans [0 ; 2π[ | p ∈ ℝ | 0,5 |
| Nombre de solutions de arctan x = arccot x | 1 (x = 1) | 0,5 |
| Valeurs de p pour lesquelles arccot x = p a exactement 2 solutions | aucune (∅) | 0,5 |

---
# G5. Suites, sommes, récurrence

Unité `recurrence` · préfixe `g5-` · pièges `g5_` · Statut : à faire

**Sources** : MAN, examen blanc Math 1B 2018 avec son corrigé (Q1, chemin de projections et somme géométrique, 6 pts) ; Analyse I 2021 (récurrence fₙ = f ∘ fₙ₋₁) ; cours d'Analyse I (principe de récurrence, exemple n ≤ n²) ; CMS, Analyse I, séries sur les suites.
**Notation** : Σ_{k=p}^{n} uₖ ; suites indexées à partir de 0 ou de 1, comme l'énoncé le dit. Récurrence : « Initialisation », « Hérédité », « Conclusion » ; P(n) désigne la propriété au rang n.
**Prérequis extérieurs** : `pow-rules`, `@alg:C-reduire`, `@alg:G-additionner`. Crédit indirect seulement : `@alg:D-factoriser-completement`. Lu dans `profile` sans être un prérequis : `a1-seq-limits`.
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `pow-rules`, `g9-proof-contra`, `g0-pfd-simple`, `g1-compose`, `g2-real-powers`.

Les lignes de calcul sont jugées par `equiv` `{vars:['n'], domain:{n:'N*'}}` (forme normale exacte quand c'est possible ; sinon évaluation pour n = 1 à 12). Une somme Σ avec des bornes en n est évaluée terme à terme pour ces n. Les récurrences combinent `blocks` (charpente) et lignes `equiv` dans les blocs.

## Compétences

### `g5-sigma` — Notation Σ
- **Année** 12 · **Prérequis** `@alg:C-reduire` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : Σ_{k=p}^{n} uₖ = u_p + … + u_n : il y a n − p + 1 termes. Linéarité : Σ(a·uₖ + vₖ) = a·Σuₖ + Σvₖ. Formules du cours : Σ_{k=1}^{n} k = n(n + 1)/2 ; Σ_{k=1}^{n} k² = n(n + 1)(2n + 1)/6.
- **Juge** : `value` (n numérique) ; `equiv` (n symbolique) ; `tokens` pour écrire une somme avec Σ · **Forme finale** : nombre, ou polynôme en n réduit.
- **Niveaux** :
  - L1 : développer Σ_{k=1}^{4}(2k − 1) terme à terme.
  - L2 : écrire 2 + 5 + 8 + … + 29 avec Σ (bornes et terme général).
  - L3 : linéarité, choix de la formule du cours.
  - L4 : libre, n symbolique.
  - L5 : Σ d'un polynôme de degré 2, puis valeur pour un n donné.
- **Générateur** : terme général ak + b ou ak² + bk + c, a ∈ [1 ; 4], b, c ∈ [−3 ; 5] ; bornes p ∈ {0 ; 1 ; 2}, n ∈ [5 ; 30]. Pour l'écriture avec Σ, on affiche les 3 premiers termes et le dernier.
- **Corrigé type** : calculer Σ_{k=1}^{20}(3k + 2).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | 3·Σ_{k=1}^{20} k + Σ_{k=1}^{20} 2 | Linéarité |
  | 2 | 3·(20·21/2) + 2·20 | Formules ; 20 termes |
  | 3 | 630 + 40 = 670 | Calculer |
- **Aides** : 1 « Sépare la somme en deux. Σ de la constante 2 vaut 2 × (nombre de termes). » · 2 « 3·(20·21)/2 + 2·… » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteurs `g5_count_terms`, `g5_sum_product`) ; `tf` « Σ_{k=1}^{n} k² = (Σ_{k=1}^{n} k)² » (faux : n = 2 donne 5 et 9).
- **Pièges** : `g5_count_terms`, `g5_sum_product`.
- **Sous-buts → crédit** : réduire → `@alg:C-reduire`.

### `g5-reindex` — Changement d'indice, sommes télescopiques
- **Année** 12 · **Prérequis** `g5-sigma`, `g0-pfd-simple` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g5-sigma` : lire les bornes et le terme d'une somme Σ.
- **Intro** : poser j = k − 1 change le terme **et** les bornes : Σ_{k=2}^{n+1}(k − 1)² = Σ_{j=1}^{n} j². Somme télescopique : Σ_{k=1}^{n}(aₖ − aₖ₊₁) = a₁ − aₙ₊₁ ; il reste le premier et le dernier.
- **Juge** : `equiv` `{vars:['n']}` · **Forme finale** : expression en n sans Σ.
- **Niveaux** :
  - L1 : changement d'indice avec bornes à trous.
  - L2 : la décomposition 1/k − 1/(k + 1) est donnée ; écrire les premiers et derniers termes.
  - L3 : choisir : « décomposer », « écrire les termes », « simplifier ».
  - L4 : libre.
  - L5 : télescopage puis limite quand n → ∞ si `a1-seq-limits` est commencée (lu dans `profile`, ce n'est pas un prérequis) ; sinon valeur pour un n donné.
- **Générateur** : décalages j = k ± c, c ∈ {1 ; 2} ; télescopiques 1/(k(k + c)) (c ∈ {1 ; 2}), ln(1 + 1/k), √(k + 1) − √k.
- **Corrigé type** : calculer Σ_{k=1}^{n} 1/(k(k + 1)).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Σ_{k=1}^{n} (1/k − 1/(k + 1)) | Décomposer ; on vérifie en réduisant au même dénominateur (→ `g0-pfd-simple` si elle est commencée) |
  | 2 | (1 − 1/2) + (1/2 − 1/3) + … + (1/n − 1/(n + 1)) | Écrire les termes |
  | 3 | 1 − 1/(n + 1) | Télescoper |
  | 4 | n/(n + 1) | Réduire |
- **Aides** : 1 « Décompose 1/(k(k + 1)) en deux fractions simples. » · 2 « Les −1/2 et +1/2 s'annulent, puis… » · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs `g5_telescope_ends`, `g5_reindex_half`) ; `open` (4 points, voir Exemples).
- **Pièges** : `g5_reindex_half`, `g5_telescope_ends`.
- **Sous-buts → crédit** : décomposer → `g0-pfd-simple`.

### `g5-arith` — Suites arithmétiques
- **Année** 12 · **Prérequis** `g5-sigma` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g5-sigma` : somme de termes consécutifs écrite avec Σ.
- **Intro** : uₙ₊₁ = uₙ + r. Terme général : uₙ = u₁ + (n − 1)r (ou u₀ + nr). Somme de termes consécutifs : (nombre de termes) × (premier + dernier)/2.
- **Juge** : `value` ; `equiv` en n · **Forme finale** : nombre ou expression en n.
- **Niveaux** :
  - L1 : u₁ et r donnés ; uₙ pour un n donné.
  - L2 : retrouver r à partir de deux termes (u₃ = 11, u₇ = 27).
  - L3 : somme ; choisir le nombre de termes.
  - L4 : libre, problème en mots.
  - L5 : enchaîné avec `g5-geom` (comparer deux placements).
- **Générateur** : u₁ ∈ [−10 ; 10], r ∈ [−5 ; 7] ∖ {0}, n ∈ [8 ; 40] ; termes connus à des rangs distincts.
- **Corrigé type** : u₁ = 3, r = 4. Calculer u₂₀ et S = u₁ + … + u₂₀.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | u₂₀ = 3 + 19·4 = 79 | Terme général |
  | 2 | S = 20·(3 + 79)/2 | Nombre de termes × moyenne |
  | 3 | S = 820 | Calculer |
- **Aides** : 1 « De u₁ à u₂₀, on ajoute 19 fois r. » · 2 « S = 20·(u₁ + u₂₀)/2 » · 3 la ligne 1.
- **Variantes d'examen** : `mcq` (distracteurs `g5_arith_half`, `g5_count_terms`).
- **Pièges** : `g5_arith_half`, `g5_count_terms`.
- **Sous-buts → crédit** : aucun.

### `g5-geom` — Suites géométriques
- **Année** 12 · **Prérequis** `pow-rules` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : uₙ₊₁ = q·uₙ. Terme général : uₙ = u₀qⁿ. Somme de n termes à partir de u₀ : u₀(1 − qⁿ)/(1 − q) si q ≠ 1. Si |q| < 1, la somme infinie vaut u₀/(1 − q).
- **Juge** : `value` ; `equiv` en n · **Forme finale** : nombre ou expression en n.
- **Niveaux** :
  - L1 : terme général avec trous.
  - L2 : somme de n termes, n donné.
  - L3 : choisir l'exposant (n ou n + 1) en comptant les termes.
  - L4 : libre ; somme infinie avec |q| < 1.
  - L5 : MAN 2018 Q1 : longueur d'un chemin (termes à reconnaître, somme partielle, limite).
- **Générateur** : u₀ ∈ [1 ; 6], q ∈ {2 ; 3 ; −2 ; 1/2 ; 1/3 ; 2/3 ; −1/2}, n ∈ [4 ; 8] ; résultats entiers ou fractions de dénominateur ≤ 729.
- **Corrigé type** : u₀ = 5, q = 2. Somme des 6 premiers termes, puis des n premiers.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | S = 5 + 10 + … + 5·2⁵ | 6 termes : de 2⁰ à 2⁵ |
  | 2 | S = 5(2⁶ − 1)/(2 − 1) = 315 | Formule |
  | 3 | Sₙ = 5(2ⁿ − 1) | Cas général |
- **Aides** : 1 « Compte les termes : de q⁰ à q⁵, il y en a 6. » · 2 « S = u₀(qⁿ − 1)/(q − 1) avec n = … » · 3 la ligne 2.
- **Variantes d'examen** : `mcq` (distracteur `g5_geom_offset`) ; `open` (6 points, voir Exemples).
- **Pièges** : `g5_geom_offset`, `g5_count_terms`.
- **Sous-buts → crédit** : puissances → `pow-rules`.

### `g5-induction-frame` — Charpente d'une récurrence
- **Année** 12 · **Prérequis** `g9-proof-contra` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-proof-contra` : l'hérédité est une preuve directe P(n) ⇒ P(n + 1).
- **Intro** : pour montrer P(n) pour tout n ≥ n₀ : (1) initialisation : P(n₀) est vraie ; (2) hérédité : **on suppose** P(n) pour un n ≥ n₀ et on montre P(n + 1) ; (3) conclusion. On ne suppose jamais P(n + 1).
- **Juge** : `blocks` `mode:'frame'` ; les calculs dans les blocs par `equiv` · **Forme finale** : tous les blocs, dans un ordre qui respecte `needs`.
- **Niveaux** : échelle des conventions (blocs). L4 : charpente vide à remplir avec les phrases-types et le calcul de l'hérédité.
- **Générateur** : banque d'énoncés courts (Σ(2k − 1) = n², Σ k = n(n + 1)/2, 2ⁿ ≥ n + 1, n ≤ n² du cours) ; leurres `g5_induction_circular`, `g5_induction_no_base`, `g9_proof_by_example`.
- **Corrigé type** : montrer Σ_{k=1}^{n}(2k − 1) = n² pour tout n ≥ 1.

  | # | Bloc | Sous-but |
  |---|---|---|
  | 1 | Initialisation : n = 1 : 1 = 1² ✓ | Initialisation |
  | 2 | Hérédité : supposons Σ_{k=1}^{n}(2k − 1) = n² pour un n ≥ 1. | Hypothèse de récurrence |
  | 3 | Σ_{k=1}^{n+1}(2k − 1) = n² + (2n + 1) | Utiliser l'hypothèse |
  | 4 | = (n + 1)² : P(n + 1) est vraie | Arriver à P(n + 1) |
  | 5 | Conclusion : P(n) est vraie pour tout n ≥ 1. | Conclure |
  | — | Leurre : « Supposons Σ_{k=1}^{n+1}(2k − 1) = (n + 1)². » | `g5_induction_circular` |
  | — | Leurre : « Vrai pour n = 1, 2, 3, donc pour tout n. » | `g9_proof_by_example` |
- **Aides** : 1 « On suppose P(n), pas P(n + 1). » · 2 « La somme jusqu'à n + 1 = la somme jusqu'à n + le terme 2(n + 1) − 1. » · 3 le bloc 3.
- **Variantes d'examen** : `open` (dans les problèmes de récurrence) ; `mcq` « Quelle phrase commence l'hérédité ? ».
- **Pièges** : `g5_induction_circular`, `g5_induction_no_base`, `g9_proof_by_example`.
- **Sous-buts → crédit** : aucun.

### `g5-induction-sum` — Récurrence : formules de sommes
- **Année** 12 · **Prérequis** `g5-induction-frame`, `g5-sigma` · **Étiquettes** CMS · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g5-induction-frame` : même charpente initialisation, hérédité, conclusion.
- **Intro** : dans l'hérédité, on sépare le dernier terme : Σ_{k=1}^{n+1} uₖ = Σ_{k=1}^{n} uₖ + uₙ₊₁. On remplace la somme jusqu'à n par la formule supposée, puis on factorise pour faire apparaître la formule au rang n + 1.
- **Juge** : `blocks` pour la charpente ; lignes de l'hérédité par `equiv` `{vars:['n']}` ; cible : la formule au rang n + 1 · **Forme finale** : expression égale à f(n + 1), écrite factorisée comme f(n + 1).
- **Niveaux** :
  - L1 : séparer le dernier terme est fait ; l'élève remplace et factorise.
  - L2 : l'élève sépare le dernier terme (choix entre uₙ et uₙ₊₁).
  - L3 : choisir l'action : « séparer », « hypothèse », « factoriser par (n + 1) ».
  - L4 : libre.
  - L5 : conjecturer la formule à partir des premières valeurs, puis la prouver.
- **Générateur** : sommes de polynômes de degré 1 à 3 en k, de k(k + 1), de 1/(k(k + 1)), de k·2ᵏ ; la formule fermée est calculée d'abord (polynôme de degré + 1 en n, coefficients rationnels) et affichée factorisée.
- **Corrigé type** : montrer Σ_{k=1}^{n} k(k + 1) = n(n + 1)(n + 2)/3. Hérédité.

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | Σ_{k=1}^{n+1} k(k + 1) = Σ_{k=1}^{n} k(k + 1) + (n + 1)(n + 2) | Séparer le dernier terme |
  | 2 | = n(n + 1)(n + 2)/3 + (n + 1)(n + 2) | Hypothèse de récurrence |
  | 3 | = (n + 1)(n + 2)(n/3 + 1) | Facteur commun (→ `@alg:D-factoriser-completement`) |
  | 4 | = (n + 1)(n + 2)(n + 3)/3 | C'est la formule au rang n + 1 |
- **Aides** : 1 « Sépare le terme k = n + 1. » · 2 « … + (n + 1)(n + 2) : mets (n + 1)(n + 2) en facteur. » · 3 la ligne 3.
- **Variantes d'examen** : `open` (4 points, voir Exemples).
- **Pièges** : `g5_hered_wrong_term`, `g5_induction_circular`.
- **Sous-buts → crédit** : facteur commun → `@alg:D-factoriser-completement` ; séparer → `g5-sigma`.

### `g5-induction-more` — Récurrence : inégalités, divisibilité, suites et itérées
- **Année** 12.5 · **Prérequis** `g1-compose`, `g5-induction-frame`, `g2-real-powers` · **Étiquettes** MAN · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g5-induction-frame` : même charpente initialisation, hérédité, conclusion.
- **Intro** : même charpente, autres hérédités. Inégalité : partir de P(n) et majorer ou minorer (2ⁿ⁺¹ = 2·2ⁿ ≥ 2(n + 1) ≥ n + 2). Divisibilité : écrire le terme n + 1 avec le terme n (8ⁿ⁺¹ − 1 = 8(8ⁿ − 1) + 7). Itérées : fₙ₊₁ = f ∘ fₙ.
- **Juge** : `blocks` ; lignes `equiv` (`rel:'≥'` pour les inégalités, ajout 4 du début du fichier) · **Forme finale** : P(n + 1) atteint.
- **Niveaux** :
  - L1 : charpente remplie, une ligne de l'hérédité à trous.
  - L2 : choisir la ligne de l'hérédité parmi 3.
  - L3 : choisir l'outil : « majorer », « factoriser », « composer ».
  - L4 : libre.
  - L5 : Analyse I 2021 : conjecturer fₙ, puis la prouver ; ou suite récurrente uₙ₊₁ = auₙ + b, formule fermée à prouver.
- **Générateur** : inégalités aⁿ ≥ 1 + (a − 1)n (Bernoulli, a ∈ {2 ; 3}), n! ≥ 2ⁿ⁻¹ ; divisibilité (aⁿ − 1 par a − 1, a ∈ {4 ; 5 ; 8 ; 10}, ou n³ − n par 6) ; itérées de f(x) = xᵖ (p ∈ {2 ; 3}), f(x) = ax + b (a ∈ {2 ; 3}, b ∈ {1 ; 2}) ; suites uₙ₊₁ = 2uₙ + 1, u₀ = 1 → uₙ = 2ⁿ⁺¹ − 1.
- **Corrigé type** : f(x) = x², f₁ = f et fₙ = f ∘ fₙ₋₁. Montrer fₙ(x) = x^(2ⁿ).

  | # | Ligne | Sous-but |
  |---|---|---|
  | 1 | f₁(x) = x² = x^(2¹) ✓ | Initialisation |
  | 2 | Supposons fₙ(x) = x^(2ⁿ). | Hypothèse |
  | 3 | fₙ₊₁(x) = f(fₙ(x)) = (x^(2ⁿ))² | Composer (→ `g1-compose`) |
  | 4 | = x^(2·2ⁿ) = x^(2ⁿ⁺¹) ✓ | Puissance de puissance (→ `g2-real-powers`) |
  | 5 | Donc fₙ(x) = x^(2ⁿ) pour tout n ≥ 1. | Conclure |
- **Aides** : 1 « fₙ₊₁ = f ∘ fₙ : applique f à x^(2ⁿ). » · 2 « (x^(2ⁿ))² = x^(… · 2ⁿ) » · 3 la ligne 3.
- **Variantes d'examen** : `open` (5 points, voir Exemples) ; `tf` « Si P(n) ⇒ P(n + 1) pour tout n, alors P(n) est vraie pour tout n » (faux : P(n) : « n > n + 1 »).
- **Pièges** : `g5_induction_circular`, `g5_induction_no_base`, `g2_power_power`.
- **Sous-buts → crédit** : composer → `g1-compose` ; puissances → `g2-real-powers`.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `g5_count_terms` | facts | E | `g5-sigma` | `g5-sigma` | Σ_{k=1}^{20} 2 = 2·19 → 2·20 ; Σ_{k=0}^{n} 1 = n → n + 1 | Remplacer le nombre de termes n − p + 1 par n − p (ou n − p + 2). | « De k = 1 à k = 20, il y a 20 valeurs. Compte : 1, 2, …, 20. » |
| `g5_sum_product` | distribute | E | `g5-sigma` | `g5-sigma` | Σ k² = (Σ k)² ; Σ aₖbₖ = Σaₖ·Σbₖ | Remplacer Σ(A·B) par ΣA·ΣB, et Σ(A²) par (ΣA)². | « Pour n = 2 : 1 + 4 = 5, mais (1 + 2)² = 9. Σ se distribue sur +, pas sur ×. » |
| `g5_reindex_half` | rule | E | `g5-reindex` | `g5-reindex` | Σ_{k=2}^{n+1}(k − 1)² = Σ_{j=2}^{n+1} j² → Σ_{j=1}^{n} j² | Changer le terme général sans changer les bornes, ou l'inverse. | « Pour k = 2, j = k − 1 = 1 : la nouvelle somme commence à 1. » |
| `g5_telescope_ends` | rule | E | `g5-reindex` | `g5-reindex` | Σ_{k=1}^{n}(1/k − 1/(k + 1)) = 1 − 1/n → 1 − 1/(n + 1) | Garder a₁ − aₙ (ou a₀ − aₙ₊₁) au lieu de a₁ − aₙ₊₁. | « Écris le dernier terme : 1/n − 1/(n + 1). C'est −1/(n + 1) qui reste. Vérifie avec n = 1 : 1/2. » |
| `g5_arith_half` | rule | E | `g5-arith` | `g5-arith` | S = 20·(3 + 79) → 20·(3 + 79)/2 ; u₂₀ = 3 + 20·4 → 3 + 19·4 | Retirer le /2 de la formule de somme ; ou utiliser n au lieu de n − 1 dans le terme général. | « Avec 2 termes, 3 + 7 = 10 = 2·(3 + 7)/2. Sans le /2, on compte tout deux fois. » |
| `g5_geom_offset` | rule | E | `g5-geom` | `g5-geom` | 5(2⁷ − 1) → 5(2⁶ − 1) pour 6 termes | Décaler l'exposant de la formule de ±1. | « De 2⁰ à 2⁵, il y a 6 termes, donc 2⁶ dans la formule. Vérifie avec 1 terme : 5(2¹ − 1) = 5. » |
| `g5_induction_circular` | logic | E | `g5-induction-frame` | `g5-induction-frame` | « Supposons P(n + 1) » → « Supposons P(n) » | En `blocks`, leurre qui suppose P(n + 1) ; en lignes, une ligne qui part de la formule au rang n + 1 comme d'un fait. | « P(n + 1) est ce qu'on veut montrer : on ne peut pas le supposer. On part de P(n). » |
| `g5_induction_no_base` | logic | E | `g5-induction-frame` | `g5-induction-frame` | hérédité seule → initialisation + hérédité | En `blocks`, leurre « L'hérédité suffit » ; ou conclusion placée sans le bloc d'initialisation. | « « n > n + 1 » a une hérédité vraie, mais n'est vraie pour aucun n. Il faut un point de départ. » |
| `g5_hered_wrong_term` | rule | E | `g5-induction-sum` | `g5-sigma` | Σ_{k=1}^{n+1} = f(n) + n(n + 1) → + (n + 1)(n + 2) | Ajouter uₙ au lieu de uₙ₊₁ en séparant le dernier terme. | « Le dernier terme de la somme jusqu'à n + 1 est celui de k = n + 1 : (n + 1)(n + 2). » |

## Exemples de type examen

**E1 (6 points, d'après l'examen blanc MAN 2018 et son corrigé).** Une balle tombe d'une hauteur de 3 m. Après chaque rebond, elle remonte aux 2/3 de la hauteur précédente. (a) Distance parcourue jusqu'au n-ième contact avec le sol. (b) Distance totale.

| Étape | Attendu | Points |
|---|---|---|
| Termes | Descente 3, puis montée et descente de 3(2/3)ᵏ pour k = 1, …, n − 1 | 3 |
| Somme partielle | Dₙ = 3 + 2·Σ_{k=1}^{n−1} 3(2/3)ᵏ = 3 + 12(1 − (2/3)ⁿ⁻¹) | 2 |
| Limite | \|2/3\| < 1 : D = 15 m | 1 |

**E2 (5 points, d'après Analyse I 2021).** f(x) = 2x + 1, f₁ = f, fₙ = f ∘ fₙ₋₁. Conjecturer fₙ(x), puis le prouver.

| Étape | Attendu | Points |
|---|---|---|
| Conjecture | f₂(x) = 4x + 3, f₃(x) = 8x + 7 ; fₙ(x) = 2ⁿx + 2ⁿ − 1 | 1 |
| Initialisation | f₁(x) = 2x + 1 ✓ | 1 |
| Hérédité | fₙ₊₁(x) = 2(2ⁿx + 2ⁿ − 1) + 1 = 2ⁿ⁺¹x + 2ⁿ⁺¹ − 1 | 2 |
| Conclusion | Vrai pour tout n ≥ 1 | 1 |

**E3 (4 points).** Montrer Σ_{k=1}^{n} k³ = (n(n + 1)/2)² pour tout n ≥ 1.

| Étape | Attendu | Points |
|---|---|---|
| Initialisation | 1 = 1 | 0,5 |
| Séparer | (n(n + 1)/2)² + (n + 1)³ | 1 |
| Factoriser | (n + 1)²(n² + 4n + 4)/4 = ((n + 1)(n + 2)/2)² | 2 |
| Conclusion | | 0,5 |

**E4 (4 points).** Calculer Sₙ = Σ_{k=1}^{n} 2/(k(k + 2)), puis sa limite.

| Étape | Attendu | Points |
|---|---|---|
| Décomposer | 2/(k(k + 2)) = 1/k − 1/(k + 2) | 1 |
| Télescoper | Sₙ = 1 + 1/2 − 1/(n + 1) − 1/(n + 2) | 2 |
| Limite | 3/2 | 1 |

---

# Points ouverts pour le README

Ces points manquent ou sont ambigus dans le README pour les modules de ce fichier. Les choix proposés sont ceux utilisés plus haut.

| # | Point | Choix proposé dans ce catalogue |
|---|---|---|
| 1 | `solset` ne dit rien des **cas** (valeur absolue, paramètre, irrationnelles). | Lignes de décision « Cas … » qui restreignent le domaine dans `state` ; « S = S₁ ∪ S₂ » jugée sur le domaine entier (conventions, ajout 1). |
| 2 | `solset` ne dit rien des **substitutions** (t = eˣ, X = cos x, t = tan(x/2)). | `state.subst` et préimage par `sets.js` (ajout 2). |
| 3 | `solset` avec **paramètres** (y dans une réciproque, m dans une discussion) et avec **plusieurs variables** (a, b pour l'injectivité ; a, b, c pour un système de coefficients). | `cfg.params` (valeurs tirées), `cfg.vars` (grille 2D ou substitution) ; à valider. |
| 4 | Pas de juge pour un **tableau de signes**. | `table` avec `judge:{kind:'signs'}` (ajout 5). |
| 5 | Pas de juge pour une **chaîne d'inégalités** (majorer, hérédité d'une inégalité). | `equiv` avec `cfg.rel` (ajout 4). |
| 6 | `value` est exact ; les **angles approchés** d'un triangle demandent une tolérance. | `value` avec `cfg.tol` (ajout 6). |
| 7 | `poly` ne prévoit pas de **paramètre** (λ) ni de coefficients complexes. | `cfg.params`, `cfg.complex` (ajout 7). |
| 8 | `logic.js` : la table de **négation des atomes** et les atomes d'ensembles (⊂, ∩, =) ne sont pas définis ; « quantificateurs à portée finie » ne couvre pas ∀ε > 0 sur ℝ. | Table des conventions ; équivalence par forme normale négative avec quantificateurs restreints, sans évaluation sur ℝ. |
| 9 | L'échelle L1–L5 du §8.3 est faite pour les lignes ; le README dit seulement que les autres compétences « gardent la même progression ». | Échelle des conventions pour `blocks` et `tokens`. |
| 10 | Le README ne dit pas comment référencer les **compétences de l'école** déjà construites (`pow-rules`, `root-rules`, `prop-rule3`). | Ids réels de `skills.js`. |
| 11 | Un générateur peut-il varier selon l'état d'une compétence d'un **autre** module, sans en faire un prérequis ? (`g5-reindex` L5 avec une limite d'A1 ; `g1-compose` et `g1-surjective` qui ajoutent exp et sin si G2 ou G3 sont commencés.) | Oui : le générateur lit `profile` ; le graphe de prérequis ne change pas. |
| 12 | Plan d'examen `cms-controle` : « une unité G au choix », mais G9 et G5 n'ont presque pas de problèmes longs. | Les problèmes de G9 et G5 sont courts (2 à 6 points) ; le plan devrait tirer 3 ou 4 problèmes dans **plusieurs** unités G. |
