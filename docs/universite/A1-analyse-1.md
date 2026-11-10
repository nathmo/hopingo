# A1. Analyse I

Extensions du §16 utilisées : §16.1 alias (`sh`, `ch`, `th`, `Arctg`, `o(xⁿ)`), nœud de borne `0⁺`, `1⁻`, variables entières (suites), intégrales dans `evalFloat`, complexes partout (`solset` sur ℂ) ; §16.2 `limit` avec `discrete: true`, `equiv` avec `rel` (encadrements, ε-N, Leibniz), `definite` avec `sums` et `param: 'n'`, `delta` avec `mode: 'sup'`, `solset` avec cas, `logic` avec table de négation ; §16.3 contre-exemples (`tf`), échelle des niveaux `blocks` et `tokens` ; §16.4 familles nouvelles (`logic`, `method`, `notation`), tag C (corrigés d'examen), réparation dans un autre module, pièges partagés (réutilise `g6_chain_forgot`, `g6_product_naive`, `g9_quant_order`, `g9_proof_by_example`… ; `a1_arc_length_no_sqrt` et `a1_ftc_no_chain` servent aussi en A2).

Unité `analyse1` · préfixe `a1-` · pièges `a1_` · Statut : à faire

**Sources** : cours d'Analyse I GM (S. Friedli, polycopiés 2019 et 2022) ; cours d'Analyse I MT (P. Wittwer, check-list finale 2018) ; examens GM de janvier 2018 à 2022 (S. Friedli) ; examen MT/MX de janvier 2014 (Ph. Chabloz) ; séries de révision 2012–2017 et QCM par chapitre 2014 (A. Quarteroni) ; corrigés détaillés des examens 2019 à 2022 (S. Najib) ; guide « Méthodes pour Analyse I » (T. Paris et S. Najib, 2021) ; résumés d'étudiants « Calcul de limites » et « Intégration » ; recueil de vrai/faux (J. Stubbe, 2014) ; J. Douchet, *Analyse, recueil d'exercices et aide-mémoire*, vol. 1 (PPUR, 3e éd.), chapitres 1 à 8. Le chapitre 9 de Douchet (équations différentielles) relève de A2 : **il n'y a pas d'équation différentielle dans ce catalogue**.

**Notation** :
- Reste d'un DL : `xⁿ·ε(x)` avec ε(x) → 0 ; `o(xⁿ)` est accepté en saisie et réaffiché en `xⁿ·ε(x)`. Autour de x₀ ≠ 0 : `(x − x₀)ⁿ·ε(x)`. « DL(n) » = développement limité d'ordre n.
- `Log` ou `ln`, `Arctg` ou `arctan`, `Arcsin`, `Arccos`, `sinh`/`cosh`/`tanh` (avec `sh`, `ch`, `th` acceptés en saisie : alias à ajouter à `parse.js`), `Argsh`, `Argch`.
- Intervalles `]a ; b[` avec point-virgule. Bornes d'une intégrale généralisée : `0⁺`, `1⁻`, `+∞` (nœud `{t:'side'}`), par exemple `∫ de 0⁺ à 1 de Log x dx`.
- BH = règle de Bernoulli-l'Hôpital ; DES = décomposition en éléments simples ; TAF = théorème des accroissements finis ; TVI = théorème de la valeur intermédiaire ; IPP = intégration par parties ; IPE = infiniment petits équivalents.
- Définitions du cours GM : les inégalités sont larges (`|f(x) − L| ≤ ε` dès que `0 < |x − x₀| ≤ δ`). Les versions strictes sont acceptées partout.
- Suites : indice `n` (ou `k`), toujours entier ; `aₙ` se tape `a_n`, `aₙ₊₁` se tape `a_(n+1)`.

**Prérequis extérieurs** :
- `g0-horner`, `g0-long-div`, `g0-pfd-simple`, `g0-pfd-general`
- `g1-inverse`, `g1-sign-table`, `g1-bound`
- `g2-real-powers`, `g2-hyp-def`, `g2-hyp-formulas`
- `g3-identities`, `g3-bioche`, `g3-arc-def`
- `g5-reindex`, `g5-sigma`, `g5-geom`, `g5-induction-more`, `g5-induction-frame`
- `g6-deriv-rules`, `g6-study-full`, `g6-antideriv-usual`
- `g8-algebraic`, `g8-polar`, `g8-moivre`
- `g9-intervals`, `g9-quant-write`, `g9-proof-contra`, `g9-counterexample`
- `@alg:G-simplifier`, `@alg:H-discriminant`, `@alg:E-systemes`, `@alg:C-developper`
- Liste exacte après réconciliation (prérequis directs des entrées, hors `@alg:`) : `g9-intervals`, `g9-proof-contra`, `g9-quant-write`, `g0-horner`, `g0-long-div`, `g0-pfd-general`, `g0-pfd-simple`, `g1-bound`, `g1-inverse`, `g1-sign-table`, `g2-hyp-def`, `g2-hyp-formulas`, `g2-log-rules`, `g2-real-powers`, `g3-arc-def`, `g3-bioche`, `g3-identities`, `g5-geom`, `g5-induction-frame`, `g5-induction-more`, `g5-reindex`, `g6-antideriv-usual`, `g6-deriv-rules`, `g6-sign-variation`, `g6-study-full`, `g8-algebraic`, `g8-moivre`, `g8-polar`.

**Conventions communes** : ces règles valent pour toutes les compétences ci-dessous ; une entrée ne les répète pas.

1. **Suites.** La variable est `n`, déclarée entière (`declares: {vars:['n'], domain:{n:'ℕ'}}`). Le juge `limit` reçoit `{v:'n', to:'+inf', discrete:true}` : l'échantillon numérique prend n = 10, 100, …, 10⁸ au lieu d'une suite réelle, voir l'extension E1 ci-dessous.
2. **Lignes d'encadrement.** Une ligne qui majore ou minore (« ≤ 5/n », « ≥ 2n/(3n + 1) ») est jugée par `equiv` avec `{rel:'≤'|'≥'|'<'|'>', vars, domain, from}` : la relation entre la ligne précédente et la nouvelle doit être vraie sur tout l'échantillon (pour une suite : n de `from` à `from + 200`, puis n = 10ᵏ). C'est l'extension E2 ci-dessous.
3. **Σ dans une ligne.** Une ligne qui contient une somme infinie est évaluée par `definite` avec `{value, sums:true}` : sommes partielles jusqu'à 10⁵ termes, puis accélération de Richardson ; une égalité exacte est tentée d'abord si la ligne est une série géométrique, télescopique ou exponentielle connue.
4. **Lignes de méthode.** Les intégrales commencent toujours par une ligne de décision (README §5.3) : décision prise et affichée au niveau 1, à choisir parmi 2 au niveau 2, parmi 4 au niveau 3, facultative aux niveaux 4 et 5. Les options marquées `quality:'poor'` sont justes mais mauvaises : l'app laisse continuer et affiche le `why` après la ligne suivante.
5. **Verdict de convergence.** Une série ou une intégrale généralisée finit par une ligne `{kind:'decision', prompt:'Nature ?', options:['converge absolument','converge, pas absolument','diverge']}` suivie d'une ligne `{kind:'rule', ask:'Quel critère ?'}`. Le verdict sans critère juste donne la moitié du crédit.
6. **Définitions.** Elles se construisent avec `blocks` (`mode:'define'`) ou `tokens` (juge `logic`). Les inégalités larges et strictes sont équivalentes pour le juge.
7. **Contre-exemples.** Un `tf` faux porte `counter: {kind, params, keys}` avec `kind` parmi `function`, `sequence`, `series`, `set`, `pair` (deux fonctions ou deux suites). Le vérificateur (`judges/examples.js`) teste la propriété sur un échantillon et, pour les suites, sur n ≤ 10⁶.
8. **QCM.** 4 options, une seule juste. Chaque distracteur est produit par un piège du tableau final, et l'option garde l'id du piège.
9. **Beaux nombres par défaut.** Coefficients entiers dans [−9 ; 9] privés de 0, réponses dans ℚ ou de la forme q₁ + q₂·c avec c parmi π, e, Log 2, Log 3, √2, √3. Dénominateurs ≤ 60. Un générateur qui n'y arrive pas après 200 essais prend l'exemple de secours, qui est le corrigé type de l'entrée.
10. **Durées.** `expectedSec` : 60 (L1), 90 (L2), 120 (L3), 180 (L4), 300 à 900 (L5 et `problem`). Variante `mcq` : 240 s ; `tf` : 60 s.
11. **Ordre.** Le catalogue suit le cours GM (Friedli) : réels, complexes, suites, séries, fonctions, dérivées, DL, séries entières, intégrales, intégrales généralisées, définitions et preuves. Les compétences marquées `MT` viennent du cours MT (Wittwer).
12. **Extensions de juges demandées par ce catalogue** (à ajouter au README §5.2 lors de l'étape U2 ou U4) :
    - E1. `limit` avec `discrete:true` : variable entière, échantillon n = 10ᵏ.
    - E2. `equiv` avec `rel` et `from` : lignes d'inégalité (majorer, minorer, décroissance de Leibniz).
    - E3. `definite` avec `sums:true` : lignes qui contiennent Σ (séries numériques, sommes de MacLaurin).
    - E4. `definite` avec `param:'n', nRange` : identités de récurrence Iₙ = … Iₙ₋₁ testées pour plusieurs n.
    - E5. `delta` avec `mode:'sup'` : x(ε) ∈ A et x(ε) > s − ε.
    - E6. `solset` sur ℂ (`domain:'ℂ', polar:true`) : ensembles finis de solutions complexes.

## Compétences

**— Réels —**

### `a1-sup-inf` — Inf, Sup, Min, Max d'un ensemble défini par une fonction
- **Année** 13 · **Prérequis** `g9-intervals`, `g3-arc-def`, `g1-sign-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `g9-intervals` : écrire l'ensemble en intervalles.
- **Intro** : on réécrit l'ensemble comme une réunion d'intervalles **en x**, en appliquant aux inégalités une fonction strictement monotone sur le bon domaine. Ensuite seulement on lit Inf, Sup, Min et Max. L'Inf et le Sup portent sur les éléments x, pas sur les valeurs f(x). Exemple : `A = {x > 0 : Log(x) < 2}` → `A = ]0 ; e²[` (note : exp est croissante) → `Inf A = 0`, pas de Min, `Sup A = e²`, pas de Max.
- **Juge** : `solset` `{v:'x', domain:'ℝ*'}` pour les lignes de réécriture ; puis quatre champs `answer` (Inf, Min, Sup, Max) jugés par `value`, avec les jetons `∄` et `+∞`, `−∞` · **Forme finale** : ensemble écrit en intervalles, puis les quatre champs remplis.
- **Niveaux** :
  - L1 (guidé) : la fonction monotone à appliquer est donnée (« applique tan, croissante sur ]−π/2 ; π/2[ ») ; les lignes ont des trous sur les bornes.
  - L2 : les lignes sont données sans les bornes ; l'élève choisit la fonction à appliquer parmi deux (tan / Arctg, exp / Log).
  - L3 (choisir l'action) : actions proposées : « appliquer tan », « appliquer exp », « inverser (attention au signe) », « résoudre l'inéquation », « lire Inf/Sup ».
  - L4 (libre) : lignes libres, puis les quatre champs.
  - L5 (seul) : QCM d'examen sans aide, ou deux ensembles à comparer (Inf A et Inf B).
- **Générateur** : on part de l'ensemble réponse `]α ; β[`, `[α ; β[`, `]α ; +∞[` ou d'une réunion de deux intervalles, avec α, β entiers ou de la forme 1/k, 2/π, π/2. Gabarits : (a) `{x ∈ ℝ* : c₁ < Arctg(k/x) < c₂}` avec c₁, c₂ ∈ {0, π/6, π/4, π/3} ; (b) `{x > 0 : 1/Log(x) < c}` ; (c) `{x > 0 : cos(1/x) > 0}` (réunion infinie, Inf = 0 seul calculable) ; (d) `{e^(−x) : x > 0}` (ensemble image, cas où l'Inf porte bien sur des valeurs) ; (e) `{sin(nπ/4) − sin(π/(4n)) : n ∈ ℕ*}` (ensemble indexé par n, au niveau 5 seulement). Contraintes : k ∈ {1, 2, 3, 4} ; tan(cᵢ) doit être dans {0, 1/√3, 1, √3} ; on exclut les cas où l'ensemble est vide ou réduit à un point.
- **Corrigé type** : `A = {x ∈ ℝ* : 0 < Arctg(2/x) < π/4}`.
  1. `0 < Arctg(2/x) < π/4` — *ligne de départ*
  2. `tan(0) < 2/x < tan(π/4)`, soit `0 < 2/x < 1` — *appliquer tan, strictement croissante de ]−π/2 ; π/2[ sur ℝ* (crédit `g3-arc-def`)
  3. `x > 0` et `2 < x` — *inverser en gardant le signe* (crédit `g1-sign-table`)
  4. `A = ]2 ; +∞[` — *écrire en intervalles*
  5. `Inf A = 2` ; `Min A ∄` ; `Sup A = +∞` (A non majoré) ; `Max A ∄` — *lire les bornes*
- **Aides** : 1 « Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[. » · 2 `0 < 2/x < ▢` · 3 `0 < 2/x < 1, donc x > 2`.
- **Variantes d'examen** : `mcq` (options « Inf A = … », « Sup A = … », « A n'est pas borné », « A = … » ; distracteurs : `a1_supinf_on_values`, `a1_tan_monotone_range`, `a1_sup_in_set`, `g1_ineq_not_flipped`) ; `tf` : « Si Inf A ∈ A et Sup A ∈ A, alors A est un intervalle fermé » (faux, A = {0 ; 1}) ; « Si A est majoré, B = {x : −x ∈ A} est majoré » (faux, A = ]−∞ ; 0]) ; « Si A ∩ B ≠ ∅, A et B bornés, alors Inf A ≤ Inf (A ∩ B) » (vrai) ; « A borné, B l'ensemble de ses majorants : Inf B ∈ B » (vrai).
- **Pièges** : `a1_supinf_on_values`, `a1_tan_monotone_range`, `a1_sup_in_set`, `g1_ineq_not_flipped`
- **Sous-buts → crédit** : appliquer une fonction monotone → `g3-arc-def` ; inverser une inégalité → `g1-sign-table` ; lire les bornes → `a1-sup-inf`.

### `a1-sup-proof` — Prouver que s = Sup A
- **Année** 13 · **Prérequis** `a1-sup-inf`, `g9-quant-write` · **Étiquettes** GM · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-sup-inf` : savoir ce que sont un majorant et le Sup.
- **Intro** : `s = Sup A` ⇔ (1) s est un majorant de A, et (2) pour tout ε > 0, il existe x ∈ A tel que x > s − ε. On montre (1), puis on **construit** x en fonction de ε. Exemple : A = ]1 ; 5[, s = 5 ; pour ε > 0, x = max(5 − ε/2 ; 3) est dans A et x > 5 − ε.
- **Juge** : type `blocks` (`mode:'frame'` aux niveaux 1 à 3, `'order'` aux niveaux 4 et 5) ; le bloc « x = … » est une saisie jugée par `delta` `{mode:'sup', set, s}` : pour ε dans ]0 ; 1] (échantillon dense) et pour ε grand, x(ε) ∈ A et x(ε) > s − ε (extension E5) · **Forme finale** : les blocs dans un ordre qui respecte `needs`, sans leurre, avec un x(ε) valide.
- **Niveaux** :
  - L1 (guidé) : la charpente est donnée ; l'élève choisit x(ε) parmi 3 propositions.
  - L2 : charpente avec deux trous (le majorant, le x(ε)).
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres.
  - L4 (libre) : blocs à ordonner, 3 leurres, x(ε) à saisir.
  - L5 (seul) : preuve complète en blocs pour un ensemble indexé (`{1 − 1/n : n ≥ 1}`) ; barème de l'examen (2 points).
- **Générateur** : A parmi `[a ; b[`, `]a ; b[`, `{b − c/n : n ∈ ℕ*}`, `{(bn − 1)/n : n ≥ 1}`, avec a < b entiers dans [−5 ; 5] et c ∈ {1, 2, 3}. Pour l'Inf, même gabarit en miroir. x(ε) attendu : `max(b − ε/2 ; (a + b)/2)` pour un intervalle, `b − c/n` avec `n > c/ε` pour l'ensemble indexé.
- **Corrigé type** : montrer `Sup [0 ; 3[ = 3` (blocs).
  1. « Pour tout x ∈ A, x < 3 : 3 est un majorant de A. » — *majorant*
  2. « Soit ε > 0. » — *fixer ε*
  3. « Posons x = max(3 − ε/2 ; 0). » — *construire x(ε)*
  4. « Alors x ∈ [0 ; 3[ et x > 3 − ε. » — *vérifier*
  5. « Aucun nombre < 3 n'est un majorant, donc 3 = Sup A. » — *conclure*
  Leurres : « 3 ∈ A, donc 3 = Sup A » (`a1_sup_in_set`) ; « Prenons ε = 0,1 : x = 2,95 convient » (`g9_proof_by_example`) ; « Il existe x ∈ A tel que pour tout ε > 0, x > 3 − ε » (`g9_quant_order`).
- **Aides** : 1 « Deux choses à montrer : 3 majore A, et on peut s'approcher de 3 autant qu'on veut. » · 2 « Soit ε > 0. Posons x = ▢ ; alors x ∈ A et x > 3 − ε. » · 3 « x = max(3 − ε/2 ; 0). »
- **Variantes d'examen** : `open` (2 points : majorant 0,5 ; construction de x(ε) 1 ; conclusion 0,5) ; `tf` : « Soit c = Sup A. Pour tout ε > 0, il existe x ∈ A tel que x + ε ≥ c » (vrai, examen 2018).
- **Pièges** : `a1_sup_in_set`, `g9_proof_by_example`, `g9_quant_order`
- **Sous-buts → crédit** : construire x(ε) → `a1-sup-proof` ; ordre des quantificateurs → `g9-quant-write`.

**— Complexes —**

### `a1-cplx-exam` — Simplifier un nombre complexe et l'élever à une puissance
- **Année** 13 · **Prérequis** `g8-algebraic`, `g8-polar`, `g8-moivre` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : on réduit les iᵏ modulo 4, on multiplie par le conjugué du dénominateur, puis on passe en forme r·e^(iφ) **avec r ≥ 0** pour la puissance. Exemple : `(1 + i)⁸ = (√2·e^(iπ/4))⁸ = 16·e^(2iπ) = 16`.
- **Juge** : `complex` `{}` (déclare `complex: true`) · **Forme finale** : forme demandée par l'item, `a + bi` ou `r·e^(iφ)` avec r ≥ 0 et φ ∈ ]−π ; π].
- **Niveaux** :
  - L1 (guidé) : lignes données, trous sur i⁹ et i¹⁵, puis sur r et φ.
  - L2 : trous plus larges ; l'élève choisit « conjugué » ou « forme polaire » pour le quotient.
  - L3 (choisir l'action) : « réduire iᵏ », « multiplier par le conjugué », « passer en polaire », « appliquer Moivre », « revenir en a + bi ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (z⁶, Re(z⁸) > 0 ?, z¹⁴ ∈ ℝ ?) sans aide.
- **Générateur** : on part de z = r·e^(iφ) avec r ∈ {1, √2, 2, 2√2, 3√2} et φ multiple de π/4 ou π/6 ; on écrit z = (α·i^p + β·i^q)/(1 ± i) avec p, q ∈ [5 ; 99], α, β entiers dans [−6 ; 6] choisis pour retomber sur z. Gabarits : (a) quotient puis z^m, m ∈ [4 ; 14] ; (b) `z = 1 + i√3`, quelle affirmation est vraie (|z⁶| > 7³ ? z¹⁴ ∈ ℝ ? Re(z⁸) > 0 ? Im(z¹¹) < 0 ?) ; (c) `Im((−1 + i√3)⁵)`. Contraintes : z^m doit avoir une forme a + bi avec a, b entiers.
- **Corrigé type** : `z = (3i⁷ + i¹³)/(1 + i)`, calculer z⁶.
  1. `= (−3i + i)/(1 + i)` — *réduire iᵏ : 7 ≡ 3, 13 ≡ 1 (mod 4)*
  2. `= −2i(1 − i)/2` — *multiplier par le conjugué*
  3. `= −1 − i` — *forme algébrique*
  4. `= √2·e^(−3iπ/4)` — *forme polaire, r > 0* (crédit `g8-polar`, `g8-moivre`)
  5. `z⁶ = 8·e^(−9iπ/2) = 8·e^(−iπ/2)` — *Moivre*
  6. `z⁶ = −8i` — *forme finale*
- **Aides** : 1 « Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. » · 2 `z = √2·e^(i·▢)` · 3 `z = −1 − i = √2·e^(−3iπ/4)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_cplx_ik_mod`, `a1_polar_r_negative`, `g8_arg_quadrant`) ; `tf` : « Pour tout y ≠ 0 réel, z⁴ = iy a exactement 4 racines distinctes » (vrai) ; « Si arg z = π/4, alors arg(1/z²) = −π/2 » (vrai) ; « Pour tout ω ≠ 0, il existe une infinité de z tels que Im(ωz) = 0 » (vrai).
- **Pièges** : `a1_cplx_ik_mod`, `a1_polar_r_negative`, `g8_arg_quadrant`
- **Sous-buts → crédit** : réduire iᵏ, conjugué → `g8-algebraic` ; polaire, Moivre → `g8-polar`, `g8-moivre`.

### `a1-cplx-zn-conj` — Équations zⁿ = z̄, zⁿ = 1/z̄, zⁿ = |z|, sans oublier r = 0
- **Année** 13 · **Prérequis** `g8-polar` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on pose z = r·e^(iφ) avec r ≥ 0. Avant de diviser par r, on regarde **r = 0**. Ce n'est pas un polynôme (à cause de z̄), donc le nombre de solutions n'est pas n. Exemple : `z⁵ = |z|` : r = 0 donne z = 0 ; sinon r⁴ = 1 et e^(5iφ) = 1, cinq solutions ; total **6**.
- **Juge** : `solset` `{v:'z', domain:'ℂ', polar:true}` : chaque ligne (équation en z, ou système en r et φ) est juste si toutes les solutions attendues la vérifient et si elle n'en a pas d'autre sur la grille r ∈ {0} ∪ ]0 ; 3], φ ∈ [0 ; 2π[ (720 × 300 points) ; la ligne finale est un ensemble fini comparé élément par élément avec `complex` (extension E6). Une ligne de décision « cas r = 0 / cas r > 0 » est obligatoire avant la division · **Forme finale** : ensemble fini `{0 ; e^(2ikπ/m), k = 0, …, m − 1}` ou liste explicite, et le nombre de solutions.
- **Niveaux** :
  - L1 (guidé) : substitution donnée, la ligne de cas est affichée, trous sur r et sur l'exposant de e^(iφ).
  - L2 : l'élève choisit « traiter r = 0 d'abord » ou « diviser par r » (la seconde est fausse si r = 0 est solution).
  - L3 (choisir l'action) : « poser z = re^(iφ) », « cas r = 0 », « identifier modules et arguments », « lister les k ».
  - L4 (libre) : lignes libres ; on demande l'ensemble et le cardinal.
  - L5 (seul) : QCM « l'équation a … solutions distinctes », ou intersection avec une droite (`{z : z²(|z| − 2) = 0} ∩ {Re z = 1}`).
- **Générateur** : on choisit la forme (zⁿ = z̄, zⁿ = 1/z̄, zⁿ = |z|, z² = z̄², zⁿ = c·z̄ avec c > 0) et n ∈ [2 ; 7] ; la réponse se construit : `zⁿ = z̄` → {0} ∪ racines (n + 1)-ièmes de 1 ; `zⁿ = 1/z̄` → racines (n − 1)-ièmes de 1, r = 1 (n ≥ 2) ; `zⁿ = |z|` → {0} ∪ racines n-ièmes de 1 ; `zⁿ = c·z̄` → r^(n−1) = c, avec c ∈ {1, 4, 8, 9, 27} pour que r soit entier. Gabarits : (a) résoudre et lister ; (b) seulement le nombre de solutions ; (c) intersection avec un lieu.
- **Corrigé type** : `z³ = z̄`.
  1. `r³·e^(3iφ) = r·e^(−iφ)` — *poser z = re^(iφ), r ≥ 0*
  2. Cas r = 0 : `z = 0` est solution — *cas r = 0*
  3. Cas r > 0 : `r² = 1` et `e^(4iφ) = 1` — *diviser par r ≠ 0, identifier*
  4. `r = 1`, `φ = kπ/2`, k = 0, 1, 2, 3 — *arguments*
  5. `S = {0 ; 1 ; i ; −1 ; −i}`, 5 solutions — *conclure*
- **Aides** : 1 « Pose z = re^(iφ). Avant de diviser par r, regarde si r = 0 marche. » · 2 « r > 0 : r^▢ = 1 et e^(i·▢·φ) = 1. » · 3 « r = 1 et φ = kπ/2 ; avec z = 0, cela fait 5 solutions. »
- **Variantes d'examen** : `mcq` (« a 5 / 1 / 2 / 6 solutions distinctes » ; distracteurs : `a1_zn_conj_r0`, `a1_zn_conj_polynomial_count`, `a1_conj_arg_sign`) ; `tf` : « z² = z̄² a exactement 4 solutions » (faux : tout z réel ou imaginaire pur est solution, contre-exemple z = 2) ; « zⁿ = z̄ a au plus n solutions » (faux, z³ = z̄ en a 5).
- **Pièges** : `a1_zn_conj_r0`, `a1_zn_conj_polynomial_count`, `a1_conj_arg_sign`
- **Sous-buts → crédit** : forme polaire → `g8-polar` ; cas r = 0 → `a1-cplx-zn-conj`.

**— Suites —**

### `a1-seq-eps-n-def` — Écrire la définition ε-N de la limite d'une suite
- **Année** 13 · **Prérequis** `g9-quant-write` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : `lim aₙ = ℓ` ⇔ `∀ε > 0 ∃N ∈ ℕ ∀n ≥ N : |aₙ − ℓ| ≤ ε`. N dépend de ε, jamais de n. Pour `lim aₙ = +∞` : `∀M > 0 ∃N ∀n ≥ N : aₙ ≥ M`.
- **Juge** : type `tokens`, juge `logic` ; palette : `∀`, `∃`, `ε > 0`, `N ∈ ℕ`, `n ≥ N`, `|aₙ − ℓ| ≤ ε`, `:`, `⇒`, plus des leurres (`n ∈ ℕ`, `|aₙ| ≤ ε`, `ε ≥ 0`, `M > 0`, `aₙ ≥ M`) · **Forme finale** : formule équivalente à la cible ; quantificateurs dans le bon ordre.
- **Niveaux** :
  - L1 (guidé) : la formule est donnée avec un trou (le dernier quantificateur ou l'inégalité).
  - L2 : deux trous, dont l'ordre ∃N / ∀n.
  - L3 (choisir l'action) : blocs `mode:'define'` à ordonner, 2 leurres.
  - L4 (libre) : toute la formule en jetons, palette complète.
  - L5 (seul) : définition et négation (« (aₙ) ne tend pas vers ℓ ») ; ou la limite +∞.
- **Générateur** : cible parmi « lim aₙ = ℓ », « lim aₙ = +∞ », « lim aₙ = −∞ », « (aₙ) est de Cauchy », « (aₙ) ne converge pas vers ℓ » (négation). Les leurres viennent des pièges `g9_quant_order` et `a1_n_depends_on_n`.
- **Corrigé type** : `lim aₙ = ℓ`.
  1. `∀ε > 0` — *quantifier ε*
  2. `∃N ∈ ℕ` — *N dépend de ε*
  3. `∀n ≥ N` — *pour tous les rangs suivants*
  4. `|aₙ − ℓ| ≤ ε` — *écart*
- **Aides** : 1 « On te donne ε d'abord ; tu dois trouver un rang N qui marche pour tous les n après. » · 2 `∀ε > 0 ∃▢ ∀▢ : |aₙ − ℓ| ≤ ε` · 3 la formule entière.
- **Variantes d'examen** : `open` (1 point, « Donner la définition précise de … ») ; `tf` : « La suite (aₙ) converge vers ℓ si ∃N ∀ε > 0 ∀n ≥ N : |aₙ − ℓ| ≤ ε » (faux : cette condition force aₙ = ℓ dès n ≥ N ; contre-exemple aₙ = 1/n qui converge vers 0 sans la vérifier).
- **Pièges** : `g9_quant_order`, `a1_n_depends_on_n`
- **Sous-buts → crédit** : ordre des quantificateurs → `g9-quant-write` ; définition → `a1-seq-eps-n-def`.

### `a1-seq-eps-n` — Trouver N(ε) pour une limite de suite
- **Année** 13 · **Prérequis** `a1-seq-eps-n-def`, `g1-bound` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-seq-eps-n-def` : la définition ε-N dit ce qu'il faut prouver.
- **Intro** : on simplifie |aₙ − ℓ|, on le **majore** par une expression simple qui tend vers 0 (c/n, c/√n), puis on résout « majorant ≤ ε ». Exemple : `aₙ = 1/(n² + 1)`, `|aₙ − 0| ≤ 1/n² ≤ ε` dès que `n ≥ 1/√ε`.
- **Juge** : lignes de calcul `equiv` `{vars:['n'], domain:{n:'ℕ*'}}` ; lignes de majoration `equiv` `{rel:'≤', from:1}` (convention 2) ; ligne finale `delta` `{f, a:'+inf', L, mode:'N'}` · **Forme finale** : `N(ε) = …`, expression en ε seul (pas de n), N(ε) ≥ 1 pour ε ∈ ]0 ; 1].
- **Niveaux** :
  - L1 (guidé) : |aₙ − ℓ| déjà simplifié, trou dans le majorant ; N(ε) à compléter.
  - L2 : simplification et majorant à trous.
  - L3 (choisir l'action) : « réduire au même dénominateur », « majorer le dénominateur par en dessous », « résoudre en n », « prendre la partie entière ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : définition + preuve complète (lignes et phrase de conclusion « pour n ≥ N, |aₙ − ℓ| ≤ ε »).
- **Générateur** : on part de ℓ et d'un reste simple : `aₙ = (ℓ(n + b) + c)/(n + b)` → |aₙ − ℓ| = |c|/(n + b) ; `aₙ = ℓ + c/(n² + b)` ; `aₙ = (ℓn² + c)/(n² + b)` ; `aₙ = ℓ + (−1)ⁿ·c/n`. ℓ ∈ [−5 ; 5] entier, b ∈ [1 ; 5], c ∈ [1 ; 9]. Au moins deux gabarits : quotient affine, quotient du 2e degré. On exclut c = 0.
- **Corrigé type** : `aₙ = (3n + 1)/(n + 2)`, ℓ = 3.
  1. `|aₙ − 3| = |3n + 1 − 3n − 6|/(n + 2)` — *réduire au même dénominateur*
  2. `= 5/(n + 2)` — *simplifier*
  3. `≤ 5/n` — *majorer* (crédit `g1-bound`)
  4. `5/n ≤ ε ⇔ n ≥ 5/ε` — *résoudre en n*
  5. `N(ε) = ⌈5/ε⌉` — *choisir N* ; toute valeur plus grande est acceptée
- **Aides** : 1 « Calcule |aₙ − 3|, puis remplace-le par plus grand et plus simple. » · 2 `|aₙ − 3| = ▢/(n + 2) ≤ ▢/n` · 3 `5/(n + 2) ≤ 5/n ≤ ε dès que n ≥ 5/ε`.
- **Variantes d'examen** : `open` (3 points : simplification 1, majoration 1, N et conclusion 1) ; `tf` : « Pour aₙ = 1/n, N(ε) = 1/n convient » (faux : N ne peut pas dépendre de n).
- **Pièges** : `a1_n_depends_on_n`, `a1_bound_wrong_direction`, `a1_limit_never_reached`
- **Sous-buts → crédit** : majorer → `g1-bound` ; N(ε) → `a1-seq-eps-n`.

### `a1-seq-limits` — Limites de suites : opérations et formes indéterminées
- **Année** 13 · **Prérequis** `@alg:G-simplifier`, `g2-log-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `g2-log-rules` : croissances comparées de ln n, nᵃ et qⁿ.
- **Intro** : on reconnaît la forme (∞/∞, ∞ − ∞, 0·∞), puis on lève l'indétermination : mettre en facteur le terme dominant, multiplier par la quantité conjuguée, ou comparer les croissances (Log n ≪ nᵃ ≪ qⁿ ≪ n! ≪ nⁿ). Exemple : `(2n³ − n)/(5n³ + 7) = (2 − 1/n²)/(5 + 7/n³) → 2/5`.
- **Juge** : `limit` `{v:'n', to:'+inf', discrete:true}` · **Forme finale** : nombre exact, `+∞`, `−∞` ou « n'existe pas ».
- **Niveaux** :
  - L1 (guidé) : la transformation est annoncée (« conjugué »), trous dans le numérateur obtenu.
  - L2 : l'élève choisit la transformation parmi 2.
  - L3 (choisir l'action) : « mettre nᵏ en facteur », « multiplier par le conjugué », « croissances comparées », « passer à la limite ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen, ou deux limites enchaînées.
- **Générateur** : gabarits (a) quotient de polynômes ou de puissances de n (degrés 1 à 4, coefficients ∈ [−9 ; 9]) ; (b) `√(n² + pn + q) − n` → p/2, avec p pair ; (c) `(√(n + a) − √n)·√(n + b)` → a/2 ; (d) `∛(n³ + pn² + q) − n` → p/3 ; (e) `n^(1/n)`, `(k)^(1/n)` → 1 ; (f) `Log(n + eⁿ)/(n + 1)` → 1. Contraintes : la limite est un rationnel de dénominateur ≤ 12, ou ±∞, ou 0.
- **Corrigé type** : `aₙ = √(n² + 4n) − n`.
  1. `= (n² + 4n − n²)/(√(n² + 4n) + n)` — *multiplier par le conjugué*
  2. `= 4n/(√(n² + 4n) + n)` — *simplifier*
  3. `= 4/(√(1 + 4/n) + 1)` — *diviser par n*
  4. `→ 4/2 = 2` — *passer à la limite*
- **Aides** : 1 « ∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée. » · 2 `= ▢/(√(n² + 4n) + n)` · 3 `= 4n/(√(n² + 4n) + n) = 4/(√(1 + 4/n) + 1)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_indet_inf_minus_inf`, `a1_sqrt_sum_split`, `a1_dominant_term_wrong`) ; `tf` : « (aₙ), (bₙ) convergentes, bₙ ≠ 0 pour tout n : lim aₙ/bₙ existe » (faux, aₙ = 1, bₙ = (−1)ⁿ/n) ; « (aₙ) non majorée ⇒ aₙ → +∞ » (faux, aₙ = n(1 + (−1)ⁿ)) ; « Si bₙ = cos(aₙ) converge, alors (aₙ) converge » (faux, aₙ = 2πn).
- **Pièges** : `a1_indet_inf_minus_inf`, `a1_sqrt_sum_split`, `a1_dominant_term_wrong`, `a1_lim_quotient_bn_nonzero`
- **Sous-buts → crédit** : conjugué, simplifier → `@alg:G-simplifier` ; passer à la limite → `a1-seq-limits`.

### `a1-seq-squeeze` — Gendarmes : trouver les deux bornes
- **Année** 13 · **Prérequis** `a1-seq-limits`, `g1-bound` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on minore et on majore aₙ par deux suites **qui ont la même limite**. Pour majorer une fraction positive : augmenter le numérateur, diminuer le dénominateur. Avec un Log : `2n = Log(e²ⁿ) ≤ Log(e²ⁿ + n²) ≤ Log(2e²ⁿ) = 2n + Log 2`. Si le majorant tend vers 0 et aₙ ≥ 0, un seul côté suffit.
- **Juge** : lignes d'encadrement `equiv` `{rel:'≤'|'≥', from:n₀}` (convention 2), chacune comparée à aₙ ; puis `limit` sur chaque borne · **Forme finale** : deux bornes de même limite, et la valeur de la limite.
- **Niveaux** :
  - L1 (guidé) : la borne inférieure est donnée, trou dans la borne supérieure.
  - L2 : les deux bornes à trous ; l'élève choisit « terme le plus petit / le plus grand » pour une somme.
  - L3 (choisir l'action) : « remplacer chaque terme par le plus petit », « majorer sin et cos par 1 », « encadrer le Log », « calculer la limite des bornes ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : somme Σ à n termes, ou suite avec Log, sans aide.
- **Générateur** : gabarits (a) `Σ_{k=1}^{n} a·n/(b·n² + k)` → a/b, bornes `a·n²/(b·n² + n)` et `a·n²/(b·n² + 1)` ; (b) `Log(e^(pn) + n^q)/(rn + s)` → p/r ; (c) `(n + c·sin n)/(dn − 1)` → 1/d ; (d) `(⌊nx⌋)/n` → x. a, b ∈ [1 ; 5], p, r ∈ [1 ; 4], q ∈ [1 ; 3], c ∈ [1 ; 5].
- **Corrigé type** : `Sₙ = Σ_{k=1}^{n} n/(n² + k)`.
  1. Pour 1 ≤ k ≤ n : `n/(n² + n) ≤ n/(n² + k) ≤ n/(n² + 1)` — *encadrer un terme* (crédit `g1-bound`)
  2. `n²/(n² + n) ≤ Sₙ ≤ n²/(n² + 1)` — *sommer les n termes*
  3. `n²/(n² + n) → 1` et `n²/(n² + 1) → 1` — *limites des bornes* (crédit `a1-seq-limits`)
  4. `lim Sₙ = 1` — *gendarmes*
- **Aides** : 1 « Chaque terme est entre le plus petit (k = n) et le plus grand (k = 1). Il y a n termes. » · 2 `n·n/(n² + ▢) ≤ Sₙ ≤ n·n/(n² + ▢)` · 3 `n²/(n² + n) ≤ Sₙ ≤ n²/(n² + 1)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_squeeze_different_limits`, `a1_squeeze_wrong_direction`, `a1_sum_n_terms_as_one`) ; `tf` : « Si aₙ ≤ bₙ ≤ cₙ et aₙ → 0, cₙ → 2, alors (bₙ) converge » (faux, bₙ = 1 + (−1)ⁿ) ; `open` (2 points).
- **Pièges** : `a1_squeeze_wrong_direction`, `a1_squeeze_different_limits`, `a1_sum_n_terms_as_one`, `a1_bounded_times_zero`
- **Sous-buts → crédit** : bornes → `g1-bound` ; limites des bornes → `a1-seq-limits` ; conclusion → `a1-seq-squeeze`.

### `a1-seq-1inf` — Formes 1^∞ : écrire e^(n·Log(…))
- **Année** 13 · **Prérequis** `a1-seq-limits`, `g2-real-powers` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : `uₙ^(vₙ) = e^(vₙ·Log uₙ)`. Si uₙ → 1 et vₙ → ∞, c'est une forme indéterminée : on utilise `Log(1 + h) = h + h·ε(h)` avec h → 0. Exemple : `(1 + 2/n)ⁿ = e^(n·Log(1 + 2/n)) → e²`.
- **Juge** : `limit` `{v:'n', to:'+inf', discrete:true}` ; la ligne « exposant → c » est jugée comme une limite séparée (sous-item) · **Forme finale** : `e^c` simplifié (c rationnel), ou 0, ou +∞.
- **Niveaux** :
  - L1 (guidé) : réécriture exponentielle donnée, trou dans h et dans la limite de l'exposant.
  - L2 : l'élève écrit 1 + h ; la limite de l'exposant est à trous.
  - L3 (choisir l'action) : « écrire e^(v·Log u) », « faire apparaître 1 + h », « Log(1 + h) ≈ h », « DL d'ordre 2 du Log » (nécessaire au gabarit c).
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou gabarit (c) sans aide.
- **Générateur** : gabarits (a) `((n + a)/(n + b))^(cn)` → e^(c(a − b)) ; (b) `(1 + p/n + q/n²)^(rn)` → e^(pr) ; (c) `e^(−pn)·e^(n²·Log(1 + p/n))` → e^(−p²/2) (demande un DL(2) du Log) ; (d) `((5n + 1)/(5n))ⁿ` → e^(1/5) ; (e) `(1 + (3 + 1/√n)/(5n))^(4n)` → e^(12/5). a, b ∈ [−4 ; 4] distincts, c, r ∈ {1, 2, 3}, p ∈ {1, 2}.
- **Corrigé type** : `aₙ = ((n + 1)/(n − 1))ⁿ`.
  1. `= e^(n·Log((n + 1)/(n − 1)))` — *écrire en exponentielle*
  2. `= e^(n·Log(1 + 2/(n − 1)))` — *faire apparaître 1 + h, h → 0*
  3. `n·Log(1 + 2/(n − 1)) = n·(2/(n − 1))·(1 + ε(n))` — *Log(1 + h) = h + h·ε(h)*
  4. `→ 2` — *limite de l'exposant*
  5. `lim aₙ = e²` — *continuité de exp*
- **Aides** : 1 « Base → 1, exposant → ∞ : c'est indéterminé. Passe en e^(n·Log(…)). » · 2 `Log(1 + h) avec h = ▢` · 3 `n·Log(1 + 2/(n − 1)) ~ 2n/(n − 1) → 2`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_indet_one_inf` donne 1, `a1_dl_order_too_low` donne 1 ou e^0 pour le gabarit c, erreur de signe e^(−c)) ; `tf` : « (1 + 1/n)ⁿ → 1 parce que 1 + 1/n → 1 » (faux, la limite est e).
- **Pièges** : `a1_indet_one_inf`, `a1_dl_order_too_low`
- **Sous-buts → crédit** : forme exponentielle → `g2-real-powers` ; limite de l'exposant → `a1-seq-limits`.

### `a1-seq-ratio` — Critère de d'Alembert pour les suites
- **Année** 13 · **Prérequis** `a1-seq-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-seq-limits` : calculer la limite du rapport.
- **Intro** : si `|aₙ₊₁/aₙ| → q < 1`, alors aₙ → 0 ; si q > 1, alors |aₙ| → +∞ ; si q = 1, on ne peut rien dire. Bon réflexe devant n!, qⁿ, q^(n²). Exemple : `n!/nⁿ` : rapport `(n/(n + 1))ⁿ → 1/e < 1`, donc → 0.
- **Juge** : `equiv` `{vars:['n'], domain:{n:'ℕ*'}}` pour la simplification du rapport ; `limit` pour sa limite ; décision « q < 1 / q > 1 / q = 1 » · **Forme finale** : verdict (« → 0 », « → +∞ », « critère non concluant ») et la limite.
- **Niveaux** :
  - L1 (guidé) : le rapport est écrit, trous dans la simplification des factorielles.
  - L2 : l'élève simplifie (n + 1)!/n! et 2^((n+1)²)/2^(n²).
  - L3 (choisir l'action) : « former aₙ₊₁/aₙ », « simplifier les factorielles », « simplifier les puissances », « limite du rapport », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : vrai/faux d'examen avec justification, ou QCM.
- **Générateur** : on part de q (0, une fraction < 1, > 1, ou ∞) et on assemble aₙ = nᵖ·cⁿ/n!, cⁿ·(n!)²/(2n)!, c^(n²)/(n!)², n!/nⁿ, (kn)!/c^(n²)... avec c ∈ [2 ; 7], p ∈ [0 ; 4]. Gabarits : (a) limite de la suite ; (b) vrai/faux « lim … = 0 ». On évite q = 1 sauf dans un item « critère non concluant ».
- **Corrigé type** : `aₙ = 3ⁿ·n²/n!`.
  1. `aₙ₊₁/aₙ = 3ⁿ⁺¹(n + 1)²·n!/((n + 1)!·3ⁿ·n²)` — *former le rapport*
  2. `= 3(n + 1)/n²` — *simplifier*
  3. `→ 0` — *limite du rapport*
  4. `0 < 1`, donc `aₙ → 0` — *conclure par d'Alembert*
- **Aides** : 1 « Il y a une factorielle : forme aₙ₊₁/aₙ, beaucoup de choses se simplifient. » · 2 `(n + 1)!/n! = ▢` · 3 `aₙ₊₁/aₙ = 3(n + 1)/n² → 0`.
- **Variantes d'examen** : `tf` : « lim 2^(n²)/(n!)² = 0 » (faux : rapport 2^(2n+1)/(n + 1)² → +∞) ; « lim 2^(2ⁿ)/(7n)! = 0 » (faux, la suite tend vers +∞) ; `mcq` (distracteurs : `a1_ratio_one`, `a1_factorial_ratio`).
- **Pièges** : `a1_ratio_one`, `a1_factorial_ratio`
- **Sous-buts → crédit** : simplifier → `@alg:G-simplifier` ; conclure → `a1-seq-ratio`.

### `a1-seq-monotone` — Suites monotones et bornées ; suites de Cauchy
- **Année** 13 · **Prérequis** `a1-seq-limits`, `g5-induction-more`, `a1-ser-geo-tele` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-seq-limits` : calculer la limite une fois la convergence établie.
- **Intro** : toute suite croissante et majorée converge (vers son Sup). Dans ℝ, une suite converge si et seulement si elle est de Cauchy. Une suite bornée n'est pas forcément convergente : (−1)ⁿ. Exemple : `uₙ = Σ_{k=1}^{n} 1/k²` est croissante et majorée par 2, donc converge.
- **Juge** : lignes `equiv` (calcul de uₙ₊₁ − uₙ), lignes d'encadrement (convention 2), décision finale « converge / diverge » avec la règle (« monotone et bornée ») · **Forme finale** : verdict justifié par les deux propriétés.
- **Niveaux** :
  - L1 (guidé) : uₙ₊₁ − uₙ est donné à trous, le majorant est donné.
  - L2 : majorant à trouver parmi 3 propositions (une fausse).
  - L3 (choisir l'action) : « signe de uₙ₊₁ − uₙ », « comparer à une somme télescopique », « récurrence », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : série de vrai/faux d'examen avec contre-exemples.
- **Générateur** : gabarits (a) `uₙ = Σ_{k=1}^{n} 1/k^p` (p = 2, 3) majorée via `1/k² ≤ 1/(k − 1) − 1/k` ; (b) `uₙ = Σ_{k=0}^{n} 1/k!` majorée par 3 via `1/k! ≤ 1/2^(k−1)` ; (c) `uₙ₊₁ = √(c + uₙ)` croissante majorée (lien avec `a1-seq-rec-fixed`) ; (d) vrai/faux sur Cauchy et sous-suites.
- **Corrigé type** : `uₙ = Σ_{k=1}^{n} 1/k²`.
  1. `uₙ₊₁ − uₙ = 1/(n + 1)² > 0` — *monotonie*
  2. `uₙ ≤ 1 + Σ_{k=2}^{n} (1/(k − 1) − 1/k)` — *majorer chaque terme*
  3. `= 2 − 1/n ≤ 2` — *télescoper* (crédit `a1-ser-geo-tele`)
  4. `(uₙ)` croissante et majorée, donc convergente — *conclure*
- **Aides** : 1 « Montre qu'elle croît, puis trouve un majorant qui ne dépend pas de n. » · 2 `1/k² ≤ 1/(k − 1) − ▢` · 3 `uₙ ≤ 1 + (1 − 1/n) ≤ 2`.
- **Variantes d'examen** : `tf` : « Toute suite définie par récurrence et bornée est convergente » (faux, aₙ₊₁ = −aₙ, a₀ = 1) ; « Si f : ℝ → ℝ est continue et aₙ = f(1/n), alors (aₙ) est de Cauchy » (vrai) ; « Si f est croissante et bornée, aₙ = f(n) est de Cauchy » (vrai) ; « x₀ = 2, xₙ = xₙ₋₁ − 1/n : (xₙ) converge » (faux, xₙ = 2 − Hₙ → −∞) ; `open` (2 points).
- **Pièges** : `a1_bounded_implies_convergent`, `a1_monotone_by_f_increasing`
- **Sous-buts → crédit** : télescoper → `a1-ser-geo-tele` ; récurrence → `g5-induction-more` ; conclure → `a1-seq-monotone`.

### `a1-seq-limsup` — lim sup, lim inf et sous-suites
- **Année** 13 · **Prérequis** `a1-seq-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : on sépare la suite en sous-suites (n pair, n impair, n modulo 4…) qui convergent chacune. lim sup = la plus grande de leurs limites, lim inf = la plus petite. La suite converge si et seulement si lim sup = lim inf (finie). Exemple : `(−1)ⁿ + 1/n` : lim sup = 1, lim inf = −1.
- **Juge** : `limit` `{v:'m', to:'+inf', discrete:true}` pour chaque sous-suite (`a₂ₘ`, `a₂ₘ₊₁`) ; deux champs `value` pour lim sup et lim inf · **Forme finale** : les deux valeurs.
- **Niveaux** :
  - L1 (guidé) : les sous-suites sont écrites, trous dans leurs limites.
  - L2 : l'élève choisit le découpage (pair/impair, modulo 4).
  - L3 (choisir l'action) : « séparer selon la parité », « séparer modulo 4 », « calculer la limite d'une sous-suite », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen.
- **Générateur** : gabarits (a) `(−1)ⁿ·pn/(n + q) + r/n` → ±p ; (b) `aₙ = ⁿ√c` si n pair, `1/n^c` si n impair → 1 et 0 ; (c) `sin(π/4 + nπ/2) + cos(π/4 + nπ/2)` (période 4) → √2 et −√2 ; (d) `√(n + (−1)ⁿ) − √n` → 0 et 0 ; (e) `Σ_{k=0}^{n} 2^k/k!` si n pair, `(Σ 1/k!)^c` si n impair (2021). p ∈ [1 ; 5], q, r ∈ [1 ; 4].
- **Corrigé type** : `aₙ = (−1)ⁿ·n/(n + 1) + 1/n`.
  1. `a₂ₘ = 2m/(2m + 1) + 1/(2m)` — *sous-suite paire*
  2. `a₂ₘ → 1` — *limite*
  3. `a₂ₘ₊₁ = −(2m + 1)/(2m + 2) + 1/(2m + 1) → −1` — *sous-suite impaire*
  4. `lim sup aₙ = 1`, `lim inf aₙ = −1` — *conclure* ; la suite diverge.
- **Aides** : 1 « (−1)ⁿ change selon la parité : regarde n pair et n impair séparément. » · 2 `a₂ₘ → ▢`, `a₂ₘ₊₁ → ▢` · 3 `lim sup = 1, lim inf = −1`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_limsup_as_sup`, échange lim sup/lim inf, une seule sous-suite) ; `tf` : « Si xₙ → +∞, (xₙ) n'a aucune sous-suite bornée » (vrai) ; « Toute suite bornée a une sous-suite convergente » (vrai, Bolzano-Weierstrass).
- **Pièges** : `a1_limsup_as_sup`
- **Sous-buts → crédit** : limites des sous-suites → `a1-seq-limits` ; conclusion → `a1-seq-limsup`.

### `a1-seq-affine` — Suites aₙ₊₁ = q·aₙ + c : formule explicite
- **Année** 13 · **Prérequis** `g5-geom` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : si q ≠ 1, on cherche le point fixe ℓ = c/(1 − q) ; la suite bₙ = aₙ − ℓ est géométrique de raison q, donc `aₙ = qⁿ(a₀ − ℓ) + ℓ`. Si q = 1, `aₙ = a₀ + nc`. Exemple : `a₀ = 1`, `aₙ₊₁ = 2aₙ + 1` : ℓ = −1, `aₙ = 2ⁿ⁺¹ − 1`.
- **Juge** : `equiv` `{vars:['n'], domain:{n:'ℕ'}}` : une ligne « aₙ = F(n) » est juste si F(0) = a₀ et F(n + 1) = q·F(n) + c pour n = 0 à 20 (exact sur ℚ) ; la limite finale par `limit` · **Forme finale** : formule explicite simplifiée, puis la limite (ou « diverge »).
- **Niveaux** :
  - L1 (guidé) : ℓ donné, trou dans b₀ et dans la formule.
  - L2 : l'élève calcule ℓ et b₀.
  - L3 (choisir l'action) : « chercher le point fixe », « poser bₙ = aₙ − ℓ », « écrire bₙ = qⁿb₀ », « revenir à aₙ », « limite ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen sur la limite, ou formule + limite.
- **Générateur** : on tire q ∈ {−1/2, 1/2, 1/3, 2/3, 3/4, 2, 3, −2, 1}, ℓ entier dans [−8 ; 8], a₀ entier ≠ ℓ ; on en déduit c = ℓ(1 − q). Gabarits : (a) formule explicite ; (b) limite seulement (`x₀ = 3`, `xₙ = ¾xₙ₋₁ + 2` → 8) ; (c) q = 1 (suite arithmétique, piège du point fixe inexistant).
- **Corrigé type** : `a₀ = 2`, `aₙ₊₁ = aₙ/3 + 4`.
  1. `ℓ = ℓ/3 + 4 ⇒ ℓ = 6` — *point fixe*
  2. `bₙ = aₙ − 6` vérifie `bₙ₊₁ = bₙ/3` — *suite géométrique*
  3. `bₙ = (1/3)ⁿ·(2 − 6) = −4/3ⁿ` — *formule de bₙ*
  4. `aₙ = 6 − 4/3ⁿ` — *formule de aₙ*
  5. `lim aₙ = 6` — *limite* (|q| < 1)
- **Aides** : 1 « Cherche le nombre ℓ qui ne bouge pas, puis regarde l'écart aₙ − ℓ. » · 2 `aₙ − 6 = (1/3)ⁿ·(▢)` · 3 `aₙ = 6 − 4/3ⁿ`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_affine_rec_no_fixed_point`, le point fixe pris pour limite quand |q| > 1, a₀ pris pour limite) ; `tf` : « Pour tout x₀, xₙ₊₁ = xₙ − 1/3ⁿ converge vers x₀ − 3/2 » (vrai, somme géométrique) .
- **Pièges** : `a1_affine_rec_no_fixed_point`, `a1_rec_limit_without_convergence`
- **Sous-buts → crédit** : point fixe → `a1-seq-affine` ; suite géométrique → `g5-geom`.

### `a1-seq-rec-fixed` — Suite aₙ₊₁ = f(aₙ) : points fixes, signe de f(x) − x, intervalle stable
- **Année** 13 · **Prérequis** `a1-seq-monotone`, `g1-sign-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : (1) si aₙ → ℓ et f est continue, alors ℓ = f(ℓ) : on trouve les **candidats**. (2) Le signe de g(x) = f(x) − x dit si la suite monte ou descend. (3) Un intervalle stable (f(I) ⊂ I) donne la borne. Résoudre ℓ = f(ℓ) ne prouve **pas** que la suite converge.
- **Juge** : `solset` `{v:'x'}` pour les points fixes et le signe de g ; `equiv` pour f(I) ; décision finale « converge vers … / diverge » · **Forme finale** : verdict et limite, avec monotonie et borne citées.
- **Niveaux** :
  - L1 (guidé) : points fixes donnés, trous dans le tableau de signes de g.
  - L2 : l'élève résout ℓ = f(ℓ) ; le tableau est à trous.
  - L3 (choisir l'action) : « résoudre ℓ = f(ℓ) », « signe de f(x) − x », « montrer f(I) ⊂ I », « monotone + bornée ⇒ converge », « calculer les premiers termes ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (« la suite converge pour g = … »), ou la même suite pour deux valeurs de a₀.
- **Générateur** : on choisit deux points fixes ℓ₁ < ℓ₂ entiers et une f croissante qui les a : `f(x) = √(sx − p)` avec s = ℓ₁ + ℓ₂, p = ℓ₁ℓ₂ ; `f(x) = (ax + b)/(cx + d)` homographique ; `f(x) = x²/4 + 1` (point fixe double 2) ; `f(x) = ½(x + c/x)` (Héron, limite √c). a₀ dans ]ℓ₁ ; ℓ₂[ ou au-delà de ℓ₂. Gabarits : (a) étude complète ; (b) « parmi ces g, laquelle donne une suite convergente avec a₀ = 1 ? » (2018) ; (c) premiers termes et encadrement 1/2 < uₙ ≤ 1 (2019).
- **Corrigé type** : `a₀ = 3`, `aₙ₊₁ = √(6aₙ − 8)`.
  1. `ℓ = √(6ℓ − 8) ⇒ ℓ² − 6ℓ + 8 = 0 ⇒ ℓ ∈ {2 ; 4}` — *candidats* (crédit `@alg:H-discriminant`)
  2. `f(x) − x > 0 ⇔ 2 < x < 4` — *signe de g* (crédit `g1-sign-table`)
  3. f est croissante et `f([2 ; 4]) = [2 ; 4]` — *intervalle stable*
  4. `a₀ ∈ ]2 ; 4[`, donc `2 < aₙ < 4` et `aₙ₊₁ > aₙ` pour tout n — *récurrence* (crédit `g5-induction-more`)
  5. Croissante et majorée par 4 : `aₙ → 4` — *conclure* (crédit `a1-seq-monotone`)
- **Aides** : 1 « Trouve d'abord les limites possibles, puis regarde si la suite monte ou descend. » · 2 `f(x) − x > 0 ⇔ ▢ < x < ▢` · 3 `2 < aₙ < 4 et aₙ₊₁ > aₙ, donc aₙ → 4`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_rec_limit_without_convergence` donne 2, `a1_monotone_by_f_increasing`) ; `tf` : « Si ℓ = f(ℓ) a une seule solution, la suite y converge » (faux, aₙ₊₁ = 2aₙ avec a₀ = 1 : ℓ = 0 est le seul candidat, et aₙ = 2ⁿ → +∞).
- **Pièges** : `a1_rec_limit_without_convergence`, `a1_monotone_by_f_increasing`, `a1_bounded_implies_convergent`
- **Sous-buts → crédit** : candidats → `@alg:H-discriminant` ; signe → `g1-sign-table` ; conclusion → `a1-seq-monotone`.

### `a1-seq-rec-study` — Suite récurrente par l'étude complète de f (problème long)
- **Année** 13 · **Prérequis** `a1-seq-rec-fixed`, `a1-fn-study` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : c'est le problème de 13 points de l'examen MT. On étudie f (dérivées, extrema, convexité, asymptotes), on compare son graphe à y = x, puis on discute la suite selon a₁. L'idée clé : un extremum local de f qui est aussi un point fixe borne la suite.
- **Juge** : type `problem` ; parties : (a) `solset` (limite possible), (b) `equiv` pour f′ et f″, `solset` pour les intervalles de monotonie et de convexité, `limit` pour les asymptotes, (c) `solset` pour f(x) > x et f(x) < x, (d) une décision par cas de a₁, chacune avec sa justification en blocs · **Forme finale** : l'ensemble des a₁ pour lesquels la suite converge, et la limite.
- **Niveaux** :
  - L1 (guidé) : les parties (a) et (b) sont faites, l'élève fait (c) avec un graphe affiché.
  - L2 : (a), (b) à trous ; (c) et (d) guidés par cas.
  - L3 (choisir l'action) : pour (d), l'élève choisit le cas et l'argument (« croissante et majorée », « un terme saute dans l'autre intervalle », « constante »).
  - L4 (libre) : toutes les parties, aides disponibles, `followError` actif.
  - L5 (seul) : le problème entier, `noHints`, barème 13 points, sauvegarde et reprise.
- **Générateur** : on part du point fixe p (entier dans [−3 ; 2]) et de γ ∈ {1, 2}. Gabarit 1 : `f(x) = x + (x − p)/(γ(x − v))` avec `v = p + 1/γ`. Alors `f′(x) = 1 − 1/(γ²(x − v)²)` s'annule en p et en p + 2/γ ; f(p) = p est un maximum local, f(p + 2/γ) = p + 4/γ un minimum local ; asymptote verticale x = v, oblique y = x + 1/γ. (L'examen MT 2014 est le cas p = −1, γ = 2.) Gabarit 2 : `f(x) = x − (x − p)/(γ(x − v))` avec `v = p − 1/γ` ; le point fixe devient un minimum local et la discussion change de sens. Avec γ ∈ {1, 2}, points et valeurs critiques sont entiers. Contraintes : l'asymptote v n'est pas 0 (graphe lisible), et on rejette un tirage dont le corrigé type coïncide avec celui de l'examen (p = −1, γ = 2).
- **Corrigé type** : `aₙ₊₁ = aₙ + (2 + aₙ)/(1 + aₙ)`, a₁ ≠ −1 (version modifiée de l'examen MT 2014).
  1. (a) `ℓ = ℓ + (2 + ℓ)/(1 + ℓ) ⇒ ℓ = −2` — *limite possible*
  2. (b) `f′(x) = 1 − 1/(1 + x)² = x(x + 2)/(1 + x)²` — *dériver* (crédit `a1-deriv-rules`)
  3. `f″(x) = 2/(1 + x)³` — *dériver encore*
  4. f croît sur ]−∞ ; −2] et sur [0 ; +∞[, décroît sur [−2 ; −1[ et ]−1 ; 0] ; max local f(−2) = −2, min local f(0) = 2 — *monotonie*
  5. Concave sur ]−∞ ; −1[, convexe sur ]−1 ; +∞[ — *convexité*
  6. `lim_{x→−1⁻} f = −∞`, `lim_{x→−1⁺} f = +∞` ; asymptote oblique `y = x + 1` — *asymptotes* (crédit `a1-fn-study`)
  7. (c) `f(x) > x ⇔ x < −2 ou x > −1` ; `f(x) < x ⇔ −2 < x < −1` — *position par rapport à y = x*
  8. (d) a₁ > −1 : suite croissante ; si elle convergeait, ce serait vers −2 < a₁, impossible ; `aₙ → +∞` — *cas 1*
  9. a₁ < −2 : `a₂ > a₁` et `a₂ < −2` (−2 est le max de f sur ]−∞ ; −1[) ; croissante, majorée par −2 : `aₙ → −2` — *cas 2*
  10. −2 < a₁ < −1 : `a₂ < −2`, on revient au cas 2 ; a₁ = −2 : suite constante — *cas 3 et 4*
  11. La suite converge (vers −2) si et seulement si `a₁ < −1` — *conclure*
- **Aides** : désactivées en L5 ; ailleurs : 1 « Compare le graphe de f à la droite y = x : c'est ce qui dit si la suite monte. » · 2 « Sur ]−∞ ; −1[, le maximum de f vaut ▢. » · 3 « f(x) ≤ −2 pour x < −1, donc la suite reste sous −2. »
- **Variantes d'examen** : `open` (13 points : (a) 1 ; (b) f′ et f″ 3, monotonie 1, convexité 1, asymptote verticale 1, oblique 1 ; (c) 2 ; (d) 3).
- **Pièges** : `a1_rec_limit_without_convergence`, `a1_monotone_by_f_increasing`, `a1_oblique_asymptote_slope_only`
- **Sous-buts → crédit** : dérivées → `a1-deriv-rules` ; asymptotes, convexité → `a1-fn-study` ; signe de f(x) − x → `a1-seq-rec-fixed` ; discussion → `a1-seq-rec-study`.

**— Séries numériques —**

### `a1-ser-geo-tele` — Séries géométriques et télescopiques : calculer la somme
- **Année** 13 · **Prérequis** `g5-reindex`, `g5-geom`, `g0-pfd-simple` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `g5-geom` : somme des termes d'une suite géométrique.
- **Intro** : `Σ_{n≥n₀} qⁿ = q^(n₀)/(1 − q)` si |q| < 1 (premier terme sur 1 − raison), diverge sinon. Une série télescopique se calcule par ses sommes partielles : `Σ_{k=1}^{N} (bₖ − bₖ₊ₚ)` ne garde que p termes au début et p à la fin. Exemple : `Σ_{k≥1} 1/(k(k + 1)) = Σ (1/k − 1/(k + 1)) = 1`.
- **Juge** : `definite` `{value, sums:true}` (convention 3) ; les sommes partielles `S_N` par `equiv` `{vars:['N'], domain:{N:'ℕ*'}}` ; la limite de S_N par `limit` · **Forme finale** : nombre exact simplifié, ou « diverge ».
- **Niveaux** :
  - L1 (guidé) : la DES ou le premier terme sont donnés ; trous dans S_N.
  - L2 : l'élève écrit la DES ; S_N à trous.
  - L3 (choisir l'action) : « reconnaître une géométrique », « changer d'indice », « décomposer (DES) », « écrire S_N », « passer à la limite ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : somme mêlant une géométrique et une télescopique, ou QCM.
- **Générateur** : géométrique : q ∈ {±1/2, ±1/3, ±2/3, 3/4, ±1/4}, n₀ ∈ [0 ; 3], coefficient entier ; combinaison `Σ (aⁿ + bⁿ)/cⁿ`. Télescopique : `Σ c/((k + a)(k + a + p))` avec a ∈ [0 ; 3], p ∈ {1, 2}, c = p (pour des coefficients 1), et `Σ Log((k + 1)/k)` (diverge). Contraintes : somme rationnelle de dénominateur ≤ 60.
- **Corrigé type** : `Σ_{k≥1} 2/((k + 1)(k + 3))`.
  1. `2/((k + 1)(k + 3)) = 1/(k + 1) − 1/(k + 3)` — *DES* (crédit `g0-pfd-simple`)
  2. `S_N = Σ_{k=1}^{N} (1/(k + 1) − 1/(k + 3))` — *somme partielle*
  3. `S_N = 1/2 + 1/3 − 1/(N + 2) − 1/(N + 3)` — *télescoper (écart de 2)*
  4. `S_N → 5/6` — *passer à la limite*
- **Aides** : 1 « Décompose en deux fractions, puis écris les premiers termes de S_N : beaucoup s'annulent. » · 2 `S_N = 1/2 + ▢ − 1/(N + 2) − ▢` · 3 `S_N = 1/2 + 1/3 − 1/(N + 2) − 1/(N + 3) → 5/6`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_geo_sum_start`, `a1_tele_wrong_terms`) ; `tf` : « Si lim s_n = 1 (sommes partielles), alors lim (s₂ₙ − sₙ) = 0 » (vrai, 2018).
- **Pièges** : `a1_geo_sum_start`, `a1_tele_wrong_terms`
- **Sous-buts → crédit** : DES → `g0-pfd-simple` ; changement d'indice → `g5-reindex` ; limite → `a1-ser-geo-tele`.

### `a1-ser-necessary` — Condition nécessaire : uₙ → 0
- **Année** 13 · **Prérequis** `a1-seq-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : si Σ uₙ converge, alors uₙ → 0. La réciproque est **fausse** : Σ 1/n diverge alors que 1/n → 0. Donc : si uₙ ne tend pas vers 0, la série diverge ; si uₙ → 0, il faut un autre critère.
- **Juge** : `limit` pour uₙ ; décision « diverge (terme général) / on ne sait pas encore » · **Forme finale** : verdict et, s'il diverge, la limite non nulle de uₙ.
- **Niveaux** :
  - L1 (guidé) : la limite de uₙ est à compléter, la conclusion est à choisir.
  - L2 : l'élève calcule la limite et choisit la conclusion.
  - L3 (choisir l'action) : « limite du terme général », « diverge », « critère non concluant, en chercher un autre ».
  - L4 (libre) : série de 4 séries à trier en « diverge par le terme général » ou « à étudier ».
  - L5 (seul) : vrai/faux d'examen avec contre-exemple.
- **Générateur** : uₙ parmi `n/(2n + 1)` (→ 1/2), `(1 + 1/n)ⁿ` (→ e), `cos(1/n)` (→ 1), `(−1)ⁿ·n/(n + 1)` (pas de limite), `n·sin(1/n)` (→ 1), et des leurres où uₙ → 0 (`1/n`, `1/√n`, `1/n²`). Gabarit (b) : la série à paramètre `Σ sin(πα/2)ⁿ`.
- **Corrigé type** : `Σ n/(2n + 1)`.
  1. `uₙ = n/(2n + 1) → 1/2` — *limite du terme général*
  2. `1/2 ≠ 0`, donc la série diverge — *condition nécessaire*
- **Aides** : 1 « Regarde d'abord si le terme général tend vers 0. » · 2 `uₙ → ▢` · 3 `uₙ → 1/2 ≠ 0 : la série diverge`.
- **Variantes d'examen** : `tf` : « Si aₙ → 0, alors Σ aₙ converge » (faux, aₙ = 1/n) ; « Si Σ aₙ converge, alors n·aₙ → 0 » (faux, aₙ = (−1)ⁿ/√n : la série converge par Leibniz, n·aₙ ne tend pas vers 0) ; « Si f(n) > n pour tout n ≥ 1, Σ 1/f(n) converge » (faux, f(n) = n + 1) ; « Σ aₙ divergente et bₙ → 0 ⇒ Σ aₙbₙ converge » (faux, aₙ = 1, bₙ = 1/n).
- **Pièges** : `a1_series_term_to_zero`
- **Sous-buts → crédit** : limite → `a1-seq-limits` ; verdict → `a1-ser-necessary`.

### `a1-ser-compare` — Critère de comparaison et de la limite du quotient
- **Année** 13 · **Prérequis** `a1-seq-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : séries à termes positifs. Référence : `Σ 1/nᵖ` converge si et seulement si p > 1. Si `aₙ/bₙ → L ∈ ]0 ; +∞[`, les deux séries ont la même nature. Si `0 ≤ aₙ ≤ bₙ` et Σ bₙ converge, Σ aₙ converge (on majore par une série **convergente**). Exemple : `Σ sin(1/n²)` : `sin(1/n²)/(1/n²) → 1`, et Σ 1/n² converge.
- **Juge** : décision « bₙ = … » (saisie jugée : `limit` de aₙ/bₙ doit être dans ]0 ; +∞[) ; `limit` pour le quotient ; verdict + critère (convention 5) · **Forme finale** : verdict, critère nommé, et p de la série de Riemann.
- **Niveaux** :
  - L1 (guidé) : bₙ est donné, trou dans le quotient simplifié.
  - L2 : l'élève choisit bₙ parmi 3 (dont un qui donne L = 0).
  - L3 (choisir l'action) : « garder le terme dominant », « remplacer sin u par u (u → 0) », « former aₙ/bₙ », « conclure par Riemann ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou série avec racines et sinus enchaînés.
- **Générateur** : on part de p (∈ {1/2, 1, 3/2, 2, 3}) et on habille 1/nᵖ : quotient de polynômes (`(n + a)/(n³ + bn)`), différence de racines (`√(n + 2) − √(n + 1)` ~ 1/(2√n)), sinus ou Log (`sin(1/n)`, `Log(1 + 1/n²)`), produit (`(√(n + 2) − √(n + 1))·sin(1/n)` ~ 1/(2n^(3/2))). Contraintes : L rationnel ou 1/2.
- **Corrigé type** : `Σ (n + 1)/(n³ + 2n)`.
  1. Termes positifs ; `aₙ ~ n/n³ = 1/n²` — *terme dominant*
  2. `bₙ = 1/n²` — *choisir la référence*
  3. `aₙ/bₙ = (n³ + n²)/(n³ + 2n) → 1` — *quotient*
  4. `1 ∈ ]0 ; +∞[` et Σ 1/n² converge (p = 2 > 1) : la série converge — *conclure*
- **Aides** : 1 « Garde les termes qui dominent en haut et en bas : à quelle série de Riemann cela ressemble-t-il ? » · 2 `aₙ/bₙ = ▢ → 1` · 3 `bₙ = 1/n², aₙ/bₙ → 1, p = 2 > 1 : converge`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_compare_wrong_direction`, `a1_riemann_p_boundary`, `a1_ipe_in_sum`) ; `tf` : « Σ sin(1/n²) converge » (vrai) ; « Si aₙ ≥ 0 et Σ aₙ converge, alors Σ aₙ² converge » (vrai) ; « Si 0 ≤ aₙ ≤ bₙ et Σ aₙ converge, alors Σ bₙ converge » (faux, aₙ = 0, bₙ = 1).
- **Pièges** : `a1_compare_wrong_direction`, `a1_riemann_p_boundary`, `a1_ipe_in_sum`, `a1_series_term_to_zero`
- **Sous-buts → crédit** : terme dominant, quotient → `a1-seq-limits` ; critère → `a1-ser-compare`.

### `a1-ser-ratio-root` — Critères de d'Alembert et de Cauchy pour les séries
- **Année** 13 · **Prérequis** `a1-seq-ratio`, `a1-seq-1inf`, `a1-ser-necessary` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-ser-necessary` : ρ > 1 : le terme général ne tend pas vers 0.
- **Intro** : d'Alembert : `|aₙ₊₁/aₙ| → ρ` ; Cauchy : `|aₙ|^(1/n) → ρ`. ρ < 1 : convergence absolue ; ρ > 1 : divergence ; ρ = 1 : **aucune conclusion**. Factorielles → d'Alembert ; puissance n-ième → Cauchy.
- **Juge** : décision « d'Alembert / Cauchy » (les deux sont valides, l'une est `quality:'poor'` selon le gabarit) ; `equiv` pour la simplification ; `limit` pour ρ ; verdict + critère · **Forme finale** : verdict et valeur de ρ.
- **Niveaux** :
  - L1 (guidé) : critère imposé, trous dans le rapport.
  - L2 : l'élève choisit le critère parmi 2 ; trous dans la simplification.
  - L3 (choisir l'action) : « d'Alembert », « Cauchy », « simplifier les factorielles », « limite 1^∞ », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (« absolument convergente / convergente mais pas absolument / divergente car |aₙ| → +∞ / divergente car |aₙ| → 1 »).
- **Générateur** : d'Alembert : `cⁿ(n!)²/(2n)!` (ρ = c/4, c ∈ {1, 2, 3, 5, 6}), `n!/(c·n)ⁿ` (ρ = 1/(ce)), `nᵖcⁿ/n!` ; Cauchy : `(an/(bn + 1))ⁿ` (ρ = a/b), `(1 + 1/n)^(n²)/cⁿ` (ρ = e/c), `n!/n^(cn)` avec paramètre (2018). Contraintes : ρ ≠ 1 sauf dans un item « critère non concluant ».
- **Corrigé type** : `Σ 3ⁿ(n!)²/(2n)!`.
  1. Décision : *d'Alembert* (factorielles)
  2. `aₙ₊₁/aₙ = 3·(n + 1)²/((2n + 2)(2n + 1))` — *former et simplifier*
  3. `= 3(n + 1)/(2(2n + 1))` — *simplifier*
  4. `→ 3/4` — *limite*
  5. `3/4 < 1` : la série converge absolument — *conclure*
- **Aides** : 1 « Des factorielles : d'Alembert. Attention, (2n + 2)! = (2n + 2)(2n + 1)·(2n)!. » · 2 `aₙ₊₁/aₙ = 3(n + 1)²/((2n + 2)(▢))` · 3 `→ 3/4 < 1`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_ratio_one`, `a1_factorial_ratio` pour (2n + 2)! = (2n)!·(2n + 2), « diverge car |aₙ| → 1 ») ; `tf` : « bₙ ≠ 0 et |bₙ₊₁/bₙ| ≥ 1 pour tout n ⇒ Σ bₙ diverge » (vrai, |bₙ| ne tend pas vers 0) ; « Si |aₙ₊₁/aₙ| < 1 pour tout n, Σ aₙ converge » (faux, aₙ = 1/n).
- **Pièges** : `a1_ratio_one`, `a1_factorial_ratio`, `a1_ratio_lt1_termwise`
- **Sous-buts → crédit** : simplifier → `a1-seq-ratio` ; limite 1^∞ → `a1-seq-1inf` ; verdict → `a1-ser-ratio-root`.

### `a1-ser-leibniz-abs` — Leibniz, convergence absolue et semi-convergence
- **Année** 13 · **Prérequis** `a1-ser-compare` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : on teste d'abord Σ |aₙ| (comparaison, d'Alembert). Si elle diverge et que la série est alternée, Leibniz : `aₙ = (−1)ⁿxₙ` avec xₙ ≥ 0, **décroissante** et **→ 0** ⇒ Σ aₙ converge. Converge sans converger absolument = semi-convergente. Exemple : `Σ (−1)ⁿ/n` est semi-convergente.
- **Juge** : décision « tester |aₙ| », `limit` et comparaison (`a1-ser-compare`), puis lignes Leibniz : `equiv` `{rel:'≥'}` pour la décroissance (xₙ ≥ xₙ₊₁ sur n ≥ n₀), `limit` pour xₙ → 0 ; verdict à trois issues · **Forme finale** : « converge absolument », « converge, pas absolument » ou « diverge », avec les critères.
- **Niveaux** :
  - L1 (guidé) : les deux étapes sont annoncées, trous dans l'équivalent et dans les hypothèses de Leibniz.
  - L2 : l'élève coche les trois hypothèses de Leibniz et en vérifie deux.
  - L3 (choisir l'action) : « étudier Σ |aₙ| », « Leibniz », « terme général », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou trois séries à classer.
- **Générateur** : `(−1)ⁿ/(nᵖ + c)` avec p ∈ {1/2, 1, 2}, `(−1)ⁿ·sin(1/nᵖ)`, `(−1)ⁿ·n/(n + 1)` (diverge), `(−1)ⁿ·Log(1 + 1/n)`, `(−1)ⁿ/(√n + (−1)ⁿ)` (Leibniz ne s'applique pas, niveau 5). c ∈ [1 ; 5].
- **Corrigé type** : `Σ_{n≥1} (−1)ⁿ/(√n + 1)`.
  1. `|aₙ| = 1/(√n + 1)`, et `|aₙ|/(1/√n) → 1` — *comparer* (crédit `a1-ser-compare`)
  2. Σ 1/√n diverge (p = 1/2), donc pas de convergence absolue — *conclure sur |aₙ|*
  3. `xₙ = 1/(√n + 1)` est positive et décroissante (√n croît) — *hypothèse 2 de Leibniz*
  4. `xₙ → 0` — *hypothèse 3*
  5. La série converge, mais pas absolument (semi-convergente) — *conclure*
- **Aides** : 1 « Commence par les valeurs absolues ; si ça diverge, essaie Leibniz et vérifie ses trois hypothèses. » · 2 `|aₙ| ~ 1/n^▢` · 3 « Pas absolument (p = 1/2), mais Leibniz : xₙ décroît vers 0. »
- **Variantes d'examen** : `mcq` (distracteurs : `a1_leibniz_no_decrease`, `a1_abs_conv_confused`, « diverge car Σ |aₙ| diverge ») ; `tf` : « aₙ ≥ 0 et Σ aₙ converge ⇒ Σ (−1)ⁿaₙ converge » (vrai) ; « Σ aₙ converge ⇒ Σ (−1)ⁿaₙ converge » (faux, aₙ = (−1)ⁿ/n) ; « Σ |bₖ| converge ⇒ Σ bₖᵖ converge absolument (p ≥ 1 entier) » (vrai) ; « Toute série convergente est absolument convergente » (faux, (−1)ⁿ/n).
- **Pièges** : `a1_leibniz_no_decrease`, `a1_abs_conv_confused`, `a1_series_term_to_zero`
- **Sous-buts → crédit** : comparaison → `a1-ser-compare` ; Leibniz → `a1-ser-leibniz-abs`.

### `a1-ser-param` — Séries à paramètre : ensemble de convergence
- **Année** 13 · **Prérequis** `a1-ser-ratio-root`, `a1-ser-leibniz-abs`, `g1-sign-table` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-ser-leibniz-abs` : aux valeurs limites, la série est souvent alternée.
- **Intro** : on applique le critère adapté **en gardant le paramètre**, on obtient une inéquation en λ, puis on traite **à part** les valeurs limites (ρ = 1), où le critère ne dit rien. Exemple : `Σ (λ/(1 − λ))ⁿ` est géométrique : converge si |λ| < |1 − λ|, soit λ < 1/2.
- **Juge** : `solset` `{v:'λ', domain:'ℝ'}` pour l'inéquation et l'ensemble final ; un sous-item par valeur limite (convention 5) · **Forme finale** : ensemble en intervalles, bornes justifiées.
- **Niveaux** :
  - L1 (guidé) : critère imposé et inéquation écrite, trous dans sa résolution et dans les cas limites.
  - L2 : l'élève écrit l'inéquation ; les cas limites sont listés.
  - L3 (choisir l'action) : « reconnaître une géométrique », « Cauchy », « résoudre l'inéquation », « traiter λ = borne », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (Σ (b + 1/k)ᵏ, Σ bₙ définie par parité) sans aide.
- **Générateur** : gabarits (a) géométrique `Σ (aλ/(λ + b))ⁿ`, bornes racines de `a²λ² = (λ + b)²` entières ; (b) `Σ (b + 1/k)ᵏ` → ]−1 ; 1[ ; (c) `Σ 1/n^(f(s))` par parité (2019) → condition s > 1 ; (d) `Σ n!/n^(cn)` → c ≥ 1 (2018) ; (e) `Σ (−1)ᵏ k^(2α)/(αᵏ + k³)` (problème ouvert, α > 0). Contraintes : bornes entières ou demi-entières.
- **Corrigé type** : `Σ_{n≥0} (2λ/(λ + 3))ⁿ`, λ ≠ −3.
  1. Série géométrique de raison `q = 2λ/(λ + 3)` — *reconnaître*
  2. `|q| < 1 ⇔ 4λ² < (λ + 3)² ⇔ 3λ² − 6λ − 9 < 0` — *inéquation* (crédit `@alg:H-discriminant`)
  3. `⇔ (λ − 3)(λ + 1) < 0 ⇔ −1 < λ < 3` — *résoudre* (crédit `g1-sign-table`)
  4. λ = −1 : q = −1, λ = 3 : q = 1 ; les deux divergent (terme général ↛ 0) — *bornes*
  5. Ensemble de convergence : `]−1 ; 3[` — *conclure*
- **Aides** : 1 « C'est une géométrique : elle converge si et seulement si |raison| < 1. » · 2 `(λ − 3)(λ + ▢) < 0` · 3 `]−1 ; 3[, bornes exclues (|q| = 1)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_param_bounds_untreated` (bornes incluses), `a1_ratio_one`, inégalité au carré sans valeur absolue) ; `open` (9 points, voir les exemples de type examen) ; `tf` : « Σ (b + 1/k)ᵏ converge pour b = 1 » (faux, terme → e).
- **Pièges** : `a1_param_bounds_untreated`, `a1_ratio_one`, `a1_abs_square_ineq`
- **Sous-buts → crédit** : inéquation → `@alg:H-discriminant`, `g1-sign-table` ; critère → `a1-ser-ratio-root` ; bornes → `a1-ser-param`.

**— Fonctions : limites et continuité —**

### `a1-fn-limits` — Limites de fonctions : formes indéterminées, croissances comparées, équivalents
- **Année** 13 · **Prérequis** `a1-seq-limits`, `g3-identities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 3
- **Pourquoi ces prérequis** : `a1-seq-limits` : mêmes techniques de levée d'indétermination.
- **Intro** : mêmes outils que pour les suites, plus les limites remarquables (`sin u/u → 1`, `(1 − cos u)/u² → 1/2`, `Log(1 + u)/u → 1`, `(eᵘ − 1)/u → 1` quand u → 0) et les croissances comparées (`xᵃ·|Log x|ᵇ → 0` en 0⁺). Un équivalent ne se remplace que dans un **produit ou un quotient**, jamais dans une somme. `0 × (borné)` n'est pas indéterminé : ça tend vers 0.
- **Juge** : `limit` `{v:'x', to, dir}` ; un remplacement par un équivalent est accepté s'il conserve la limite (README §5.2) · **Forme finale** : valeur exacte, ±∞ ou « n'existe pas ».
- **Niveaux** :
  - L1 (guidé) : la factorisation en produit de limites remarquables est donnée, trous dans les facteurs.
  - L2 : l'élève fait apparaître une limite remarquable sur deux.
  - L3 (choisir l'action) : « mettre en facteur », « conjugué », « limite remarquable », « croissances comparées », « écrire e^(v·Log u) ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou question ouverte de 2 points.
- **Générateur** : gabarits (a) `(1 − cos(ax))/(x·sin(bx))` → a²/(2b) ; (b) `Arctg(x²)/(x·sin x)` → 1 ; (c) `√(ax + b)/√(cx + d)` en +∞ → √(a/c) ; (d) `(x²)ˣ`, `x^x` en 0⁺ → 1 ; (e) `x·sin(1/x)` en 0 → 0, `sin(e^(1/x))/e^(1/x)` en 0⁺ ; (f) `(√(1 + ax) − 1)/x` → a/2. a, b ∈ [1 ; 6], résultat rationnel ou racine simple.
- **Corrigé type** : `lim_{x→0} (1 − cos 3x)/(x·sin 2x)`.
  1. `= [(1 − cos 3x)/(3x)²]·[(2x)/sin 2x]·(9x²/(2x²))` — *faire apparaître les limites remarquables* (produit seulement)
  2. `→ (1/2)·1·(9/2)` — *limites remarquables*
  3. `= 9/4` — *conclure*
- **Aides** : 1 « Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit. » · 2 `(1 − cos 3x)/(3x)² → ▢` · 3 `= (1/2)·(9/2) = 9/4`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_ipe_in_sum`, `a1_remarkable_limit_scale`, `a1_bh_not_indeterminate`) ; `open` (2 points : `lim √(2x + 1)/√(3x + 2)` en +∞) ; `tf` : « Il existe f continue de [0 ; 1] dans ℝ₊ telle que √(f(x)) → +∞ en 0⁺ » (faux : f est bornée sur [0 ; 1]) ; « S'il existe a avec lim_{x→a} f = +∞, f n'est pas continue sur ℝ » (vrai).
- **Pièges** : `a1_ipe_in_sum`, `a1_bounded_times_zero`, `a1_remarkable_limit_scale`, `a1_indet_one_inf`, `a1_indet_inf_minus_inf`
- **Sous-buts → crédit** : trigonométrie → `g3-identities` ; limites remarquables → `a1-fn-limits`.

### `a1-fn-onesided` — Limites à gauche et à droite ; limite qui n'existe pas
- **Année** 13 · **Prérequis** `a1-fn-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-limits` : calculer chaque limite latérale.
- **Intro** : la limite en x₀ existe si et seulement si les limites à gauche et à droite existent et sont égales. À calculer à part : |x − x₀|, e^(1/x), Arctg(1/x), fonctions par morceaux. Pour montrer qu'une limite n'existe pas : deux suites xₙ → x₀ avec f(xₙ) de limites différentes (sin(1/x)).
- **Juge** : `limit` `{v:'x', to:x₀, dir:'+'}` et `{dir:'-'}` ; verdict « existe et vaut … / n'existe pas » ; pour la méthode des deux suites : deux saisies de suites jugées par `limit` · **Forme finale** : les deux limites latérales et le verdict.
- **Niveaux** :
  - L1 (guidé) : la simplification de |x − 2| à droite est donnée, trou à gauche.
  - L2 : l'élève écrit les deux côtés.
  - L3 (choisir l'action) : « enlever la valeur absolue à droite », « … à gauche », « limite de e^(1/x) », « deux suites », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (`sin(e^(1/x))/e^(1/x)`).
- **Générateur** : gabarits (a) `(x² − a²)/|x − a|` → ±2a ; (b) `e^(1/x)`, `1/(1 + e^(1/x))` en 0 ; (c) `Arctg(1/x)` → ±π/2 ; (d) `sin(x)/|x|` → ±1 ; (e) `sin(1/x)` (deux suites `1/(2nπ)` et `1/(2nπ + π/2)`). a ∈ [1 ; 5].
- **Corrigé type** : `f(x) = (x² − 4)/|x − 2|` en 2.
  1. x > 2 : `f(x) = (x − 2)(x + 2)/(x − 2) = x + 2 → 4` — *limite à droite*
  2. x < 2 : `f(x) = −(x + 2) → −4` — *limite à gauche*
  3. `4 ≠ −4` : la limite en 2 n'existe pas — *conclure*
- **Aides** : 1 « Enlève la valeur absolue séparément pour x > 2 et x < 2. » · 2 `x < 2 : |x − 2| = ▢` · 3 `à droite 4, à gauche −4 : pas de limite`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_onesided_ignored`, `a1_abs_removed`) ; `tf` : « f monotone et lim_{x→x₀⁻} f = f(x₀) ⇒ f dérivable à gauche en x₀ » (faux, f(x) = ∛x en 0 : croissante, continue, mais la pente tend vers +∞).
- **Pièges** : `a1_onesided_ignored`, `a1_abs_removed`
- **Sous-buts → crédit** : limites latérales → `a1-fn-onesided`.

### `a1-fn-extension` — Prolongement par continuité, continuité d'une fonction par morceaux
- **Année** 13 · **Prérequis** `a1-fn-onesided`, `@alg:G-simplifier` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : f est continue en x₀ si `lim_{x→x₀} f(x) = f(x₀)`. Une fonction définie sur ℝ ∖ {x₀} se prolonge par continuité si sa limite en x₀ existe et est finie. Pour une fonction par morceaux, on égalise la limite de chaque morceau et la valeur au point.
- **Juge** : `limit` pour chaque morceau ; `solset` `{vars:['a','b']}` pour les paramètres · **Forme finale** : valeurs des paramètres (ou « pas de prolongement »).
- **Niveaux** :
  - L1 (guidé) : factorisation donnée, trou dans la limite et dans l'équation en b.
  - L2 : l'élève factorise et écrit les deux équations.
  - L3 (choisir l'action) : « factoriser et simplifier », « limite à droite », « limite à gauche », « égaler à f(x₀) », « résoudre ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (« parmi f, g, h, lesquelles sont continues en 0 ? »).
- **Générateur** : on part de la limite commune ℓ (rationnelle, dénominateur ≤ 9) au point c ∈ [1 ; 4]. Morceau droit : un quotient qui se simplifie par (x − c), par exemple `(x² − c²)/(x² − cx) = (x + c)/x` → 2, ou `p(x − c)(x + r)/((x − c)(x + s))` → p(c + r)/(c + s) ; valeur au point a = ℓ ; morceau gauche `bx² + 1`, `bx + d` ou `sin(bx)/x`, et b se déduit de ℓ. Gabarit (b) : prolongement de `Arctg(x²)/(x sin x)`, `√|x|·sin(1/x)`, `(1/x)·Arctg x`, `x·Log|x|`, `√x·Arctg(1/x)`. c ∈ [1 ; 4].
- **Corrigé type** : `f(x) = (x² − 9)/(x² − 3x)` si x > 3, `a` si x = 3, `bx² + 1` si 1 ≤ x < 3.
  1. x > 3 : `f(x) = (x − 3)(x + 3)/(x(x − 3)) = (x + 3)/x → 2` — *limite à droite* (crédit `@alg:G-simplifier`)
  2. `a = 2` — *continuité à droite*
  3. `lim_{x→3⁻} (bx² + 1) = 9b + 1 = 2` — *continuité à gauche*
  4. `b = 1/9` — *résoudre*
- **Aides** : 1 « Calcule la limite de chaque morceau en 3 ; elles doivent valoir f(3) = a. » · 2 `(x + 3)/x → ▢` · 3 `a = 2 et 9b + 1 = 2, donc b = 1/9`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_extension_wrong_branch`, une seule continuité latérale, erreur de factorisation) ; `tf` : « f(x) = sin((eˣ − 1)/x) se prolonge par continuité en 0 » (vrai, par sin 1) ; « f(x) = √|x|·sin(1/x), f(0) = 1, est continue en 0 » (faux, la limite vaut 0).
- **Pièges** : `a1_extension_wrong_branch`, `a1_onesided_ignored`
- **Sous-buts → crédit** : simplifier → `@alg:G-simplifier` ; limites → `a1-fn-onesided` ; paramètres → `a1-fn-extension`.

### `a1-fn-epsdelta-def` — Écrire la définition ε-δ d'une limite et de la continuité
- **Année** 13 · **Prérequis** `g9-quant-write` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : `lim_{x→x₀} f(x) = L` ⇔ `∀ε > 0 ∃δ > 0 ∀x ∈ D : 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε`. Continuité en x₀ : même chose avec L = f(x₀), sans le « 0 < ». δ dépend de ε (et de x₀), jamais de x.
- **Juge** : type `tokens`, juge `logic` ; palette : `∀`, `∃`, `ε > 0`, `δ > 0`, `x ∈ D`, `0 < |x − x₀| ≤ δ`, `|x − x₀| ≤ δ`, `|f(x) − L| ≤ ε`, `⇒`, leurres (`|f(x) − L| ≤ δ`, `|x − x₀| ≤ ε`, `δ = ε`) · **Forme finale** : formule équivalente à la cible.
- **Niveaux** :
  - L1 (guidé) : formule à un trou.
  - L2 : deux trous dont l'ordre ε / δ.
  - L3 (choisir l'action) : blocs `define`, 2 leurres.
  - L4 (libre) : formule entière en jetons.
  - L5 (seul) : définition et négation (« f n'est pas continue en x₀ »), ou limite +∞ en x₀.
- **Générateur** : cible parmi « lim f = L en x₀ », « f continue en x₀ », « lim f = +∞ en x₀ » (∀M > 0 ∃δ > 0 …), « lim f = L en +∞ » (∀ε > 0 ∃A …), « limite à droite », et leurs négations.
- **Corrigé type** : `lim_{x→x₀} f(x) = L`.
  1. `∀ε > 0` — *quantifier ε*
  2. `∃δ > 0` — *δ dépend de ε*
  3. `∀x ∈ D : 0 < |x − x₀| ≤ δ` — *x proche de x₀, x ≠ x₀*
  4. `⇒ |f(x) − L| ≤ ε` — *f(x) proche de L*
- **Aides** : 1 « Même structure que pour les suites : ε d'abord, puis δ, puis tous les x assez proches. » · 2 `∀ε > 0 ∃δ > 0 ∀x : 0 < |x − x₀| ≤ ▢ ⇒ |f(x) − L| ≤ ▢` · 3 la formule entière.
- **Variantes d'examen** : `open` (partie (a) de la question ε-δ, 1 point sur 4) ; `tf` : « f continue en x₀ ⇔ ∃δ > 0 ∀ε > 0 : |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε » (faux : seule une fonction constante près de x₀ vérifie cela ; contre-exemple f(x) = x).
- **Pièges** : `g9_quant_order`, `a1_epsdelta_swapped`
- **Sous-buts → crédit** : quantificateurs → `g9-quant-write` ; définition → `a1-fn-epsdelta-def`.

### `a1-fn-epsdelta` — Trouver δ(ε) : prouver une limite par la définition
- **Année** 13 · **Prérequis** `a1-fn-epsdelta-def`, `g1-bound` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-epsdelta-def` : la définition ε-δ dit ce qu'il faut prouver.
- **Intro** : on écrit |f(x) − L| en fonction de |x − x₀|. Affine : `|f(x) − L| = |a|·|x − x₀|`, donc δ = ε/|a|. Quadratique : on impose d'abord |x − x₀| ≤ 1 pour borner l'autre facteur, puis δ = min(1 ; ε/M).
- **Juge** : lignes `equiv` (factorisation de |f(x) − L|), `equiv` `{rel:'≤'}` (majoration sous |x − x₀| ≤ 1), ligne finale `delta` `{f, a:x₀, L, mode:'delta'}` · **Forme finale** : `δ(ε) = …` en ε seul, δ > 0 pour ε ∈ ]0 ; 1], et la phrase de conclusion.
- **Niveaux** :
  - L1 (guidé) : |f(x) − L| factorisé, trou dans δ.
  - L2 : factorisation à trous ; pour le cas quadratique, la contrainte |x − x₀| ≤ 1 est donnée.
  - L3 (choisir l'action) : « factoriser |x − x₀| », « imposer |x − x₀| ≤ 1 », « majorer l'autre facteur », « choisir δ », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : question ouverte complète (définition + preuve, 4 points).
- **Générateur** : affine : `f(x) = ax + b`, x₀ ∈ [−4 ; 4], a ∈ [−9 ; 9] ∖ {0}, L = ax₀ + b ; quadratique : `f(x) = x² + cx`, x₀ ∈ [1 ; 4], M = |2x₀ + c| + 1 ; racine (niveau 5) : `√x` en x₀ = 4 (δ = 2ε). Deux gabarits d'énoncé : « Montrer avec la définition que … », « Trouver un δ qui convient pour ε = 0,01, puis pour tout ε ».
- **Corrigé type** : `lim_{x→−1} (3 − 4x) = 7`.
  1. `|f(x) − 7| = |−4x − 4|` — *écrire l'écart*
  2. `= 4·|x + 1|` — *faire apparaître |x − x₀|*
  3. `4|x + 1| ≤ ε ⇔ |x + 1| ≤ ε/4` — *résoudre*
  4. `δ = ε/4` — *choisir δ*
  5. « Pour tout ε > 0, si 0 < |x + 1| ≤ ε/4, alors |f(x) − 7| ≤ ε. » — *conclure*
- **Aides** : 1 « Écris |f(x) − 7| et fais apparaître |x − (−1)| = |x + 1|. » · 2 `|f(x) − 7| = ▢·|x + 1|` · 3 `δ = ε/4`.
- **Variantes d'examen** : `open` (4 points, examen 2019 : définition 1, écart 1, δ 1, conclusion 1) ; `tf` : « Pour lim x² = 9 en 3, δ = ε/|x + 3| convient » (faux : δ dépend de x).
- **Pièges** : `a1_delta_depends_on_x`, `a1_delta_inverted`, `g9_quant_order`
- **Sous-buts → crédit** : majorer → `g1-bound` ; δ(ε) → `a1-fn-epsdelta`.

### `a1-fn-ivt` — Théorème de la valeur intermédiaire : existence d'une solution
- **Année** 13 · **Prérequis** `a1-fn-extension`, `a1-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-fn-extension` : vérifier la continuité sur [a ; b].
- **Intro** : si f est **continue sur [a ; b]** et que f(a) et f(b) sont de signes contraires, alors f s'annule sur ]a ; b[. Pour f(x) = g(x), on applique le TVI à h = f − g. On énonce le théorème, puis on vérifie ses hypothèses.
- **Juge** : type `blocks` (`mode:'frame'`) ; les valeurs f(a), f(b) sont des saisies `value` · **Forme finale** : blocs dans l'ordre (fonction auxiliaire, continuité, signes, conclusion), sans leurre.
- **Niveaux** :
  - L1 (guidé) : charpente donnée, trous dans f(a) et f(b).
  - L2 : l'élève choisit l'intervalle et la fonction auxiliaire parmi 3.
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres.
  - L4 (libre) : blocs à ordonner, 3 leurres, valeurs à saisir.
  - L5 (seul) : preuve d'examen (5 points, TAF puis TVI, voir `a1-proofs`) ou vrai/faux.
- **Générateur** : gabarits (a) `xᵖ + cx − d = 0` sur ]0 ; 1[ (p ∈ {3, 5, 7}, c, d choisis pour f(0) < 0 < f(1)) ; (b) `cos x = x` sur [0 ; π/2] ; (c) point fixe : f : [α ; β] → [0 ; 1] continue, [0 ; 1] ⊂ [α ; β], ∃x ∈ [0 ; 1] : f(x) = x ; (d) polynôme de degré impair (limites en ±∞).
- **Corrigé type** : `x⁵ + 3x − 1 = 0` a une solution dans ]0 ; 1[.
  1. « Soit f(x) = x⁵ + 3x − 1, continue sur [0 ; 1] (polynôme). » — *hypothèse de continuité*
  2. `f(0) = −1 < 0` et `f(1) = 3 > 0` — *signes aux bornes*
  3. « Par le TVI, il existe c ∈ ]0 ; 1[ tel que f(c) = 0. » — *conclure*
  4. (bonus) `f′(x) = 5x⁴ + 3 > 0` : la solution est unique — *unicité*
  Leurres : « f′(c) = 0 par Rolle » ; « f est dérivable donc continue, donc f(c) = 0 » (sans les signes) ; « f(0)·f(1) > 0 ».
- **Aides** : 1 « Il faut une fonction continue qui change de signe sur l'intervalle. » · 2 `f(0) = ▢, f(1) = ▢` · 3 « f(0) < 0 < f(1) et f continue : TVI. »
- **Variantes d'examen** : `tf` : « f : [−2 ; 20] → [0 ; 1] continue ⇒ ∃x ∈ [0 ; 1], f(x) = x » (vrai, TVI sur f(x) − x) ; « Si f([1 ; 2]) = ]1 ; 2[, alors f n'est pas continue sur [1 ; 2] » (vrai : l'image d'un segment par une fonction continue est un segment) ; « Il existe f continue et bijective de ]−1 ; 1[ sur ℝ » (vrai, f(x) = tan(πx/2)).
- **Pièges** : `a1_ivt_no_continuity`, `g9_proof_by_example`
- **Sous-buts → crédit** : hypothèses → `a1-fn-ivt` ; unicité → `a1-deriv-rules`.

### `a1-fn-image` — Image d'un intervalle par une fonction continue
- **Année** 13 · **Prérequis** `a1-fn-ivt`, `g6-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-ivt` : l'image d'un intervalle est un intervalle (TVI).
- **Intro** : l'image d'un segment [a ; b] par une fonction continue est le segment [m ; M] (min et max atteints). On les trouve aux bornes et aux points où f′ = 0. Sur un intervalle ouvert ou non borné, on remplace les valeurs aux bornes par des limites, et une borne peut ne pas être atteinte.
- **Juge** : `equiv` pour f′ ; `solset` pour les zéros de f′ dans l'intervalle ; `value` pour les valeurs ; `solset` pour l'image finale · **Forme finale** : intervalle exact, crochets justes.
- **Niveaux** :
  - L1 (guidé) : f′ donnée, trou dans son zéro et dans les valeurs.
  - L2 : l'élève dérive ; la liste des points à évaluer est donnée.
  - L3 (choisir l'action) : « dériver », « zéros de f′ dans l'intervalle », « valeurs aux bornes », « limites aux bornes ouvertes », « écrire l'image ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen.
- **Générateur** : gabarits (a) `e^(±x)·cos x`, `e^(−x)·sin x` sur [0 ; π/2] ou [0 ; π] ; (b) `x²·sin(x²)` sur ℝ → ℝ ; (c) `sin(Arctg(√x))` sur [1 ; +∞[ → [√2/2 ; 1[ ; (d) polynôme de degré 3 sur un segment à racines entières de f′. Contraintes : zéros de f′ en multiples de π/4 ou entiers.
- **Corrigé type** : `f(x) = e^(−x)·sin x` sur [0 ; π].
  1. `f′(x) = e^(−x)(cos x − sin x)` — *dériver* (crédit `g6-deriv-rules`)
  2. `f′(x) = 0 ⇔ x = π/4` dans [0 ; π] — *point critique*
  3. `f(0) = 0`, `f(π/4) = (√2/2)·e^(−π/4)`, `f(π) = 0` — *valeurs*
  4. Image : `[0 ; (√2/2)·e^(−π/4)]` — *conclure*
- **Aides** : 1 « Continue sur un segment : l'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0. » · 2 `f′(x) = e^(−x)(▢)` · 3 `max = f(π/4) = (√2/2)e^(−π/4), min = 0`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_image_endpoints_only`, borne ouverte/fermée échangée, `a1_extrema_bounds_forgotten`) ; `tf` : « Une fonction strictement croissante de [0 ; 1] dans [0 ; 1] est bijective » (faux, f(x) = x/2).
- **Pièges** : `a1_image_endpoints_only`, `a1_extrema_bounds_forgotten`
- **Sous-buts → crédit** : dériver → `g6-deriv-rules` ; image → `a1-fn-image`.

### `a1-bisection-fixpoint` — Bissection et méthode du point fixe (cours MT)
- **Année** 13 · **Prérequis** `a1-fn-ivt`, `a1-mvt` · **Étiquettes** MT · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : bissection : on coupe [a ; b] en deux et on garde la moitié où f change de signe ; après n étapes, l'erreur est ≤ (b − a)/2ⁿ. Point fixe : si g([a ; b]) ⊂ [a ; b] et |g′| ≤ k < 1 sur [a ; b], alors xₙ₊₁ = g(xₙ) converge vers l'unique point fixe.
- **Juge** : type `table` avec juge `iter` `{phi, cols:['a','b','m','f(m)'], tol:1e-9}` (chaque ligne recalculée depuis la ligne de l'élève) ; nombre d'étapes par `value` ; contraction par `equiv` `{rel:'≤'}` · **Forme finale** : tableau de 3 à 5 lignes, puis n minimal.
- **Niveaux** :
  - L1 (guidé) : première ligne remplie, colonnes m et f(m) calculées par l'app.
  - L2 : l'élève choisit la moitié gardée à chaque ligne.
  - L3 (choisir l'action) : « garder [a ; m] », « garder [m ; b] », « arrêter ».
  - L4 (libre) : tableau libre, puis n pour une précision donnée.
  - L5 (seul) : bissection + choix d'une fonction g contractante parmi 3.
- **Générateur** : f polynôme de degré 3 avec une seule racine dans [0 ; 1] ou [1 ; 2], valeurs aux milieux dyadiques jamais nulles ; précision 10⁻ᵏ, k ∈ [2 ; 4] ; g candidates obtenues en isolant x de trois façons, une seule contractante.
- **Corrigé type** : `f(x) = x³ + x − 1` sur [0 ; 1].
  1. `m = 0,5`, `f(m) = −0,375` : garder [0,5 ; 1] — *étape 1*
  2. `m = 0,75`, `f(m) = 0,171875` : garder [0,5 ; 0,75] — *étape 2*
  3. `m = 0,625`, `f(m) ≈ −0,1309` : garder [0,625 ; 0,75] — *étape 3*
  4. Erreur ≤ 1/2ⁿ ≤ 10⁻³ dès que `n ≥ 10` — *nombre d'étapes*
  5. `g(x) = 1/(1 + x²)` : `g([0,5 ; 1]) ⊂ [0,5 ; 1]`, `|g′(x)| = 2x/(1 + x²)² ≤ 0,65 < 1` — *point fixe contractant*
- **Aides** : 1 « Garde la moitié où f change de signe. » · 2 « f(0,5) < 0 et f(1) > 0 : on garde [▢ ; ▢]. » · 3 la ligne entière.
- **Variantes d'examen** : `mcq` (nombre d'étapes ; distracteurs : `a1_bisection_count`) ; `tf` : « La bissection converge pour toute f qui change de signe sur [a ; b] » (faux sans continuité : f(x) = 1/(x − 1/2) sur [0 ; 1]).
- **Pièges** : `a1_bisection_count`, `a1_ivt_no_continuity`
- **Sous-buts → crédit** : TVI → `a1-fn-ivt` ; contraction → `a1-mvt`.

**— Dérivées —**

### `a1-deriv-def` — Dérivée par la définition ; dérivées à gauche et à droite
- **Année** 13 · **Prérequis** `a1-fn-onesided`, `a1-seq-squeeze` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). En lignes (juge `limit` en h) : gabarits (a) c·x + xᵖ·sin(1/x) ou cos(1/x) avec p = 2 ou 3 (h·cos(1/h) seul n'étant pas décidé par le repli numérique des limites, p = 2 sans terme c·x prend sin), (b) x|x|, |x|·x², |x|³, c·x + x|x|, et un raccord de deux formules (dérivées à droite et à gauche, puis f′(0) ou f′(0⁺) − f′(0⁻) avec une décision « dérivable ? ») ; (c) |x|ᵖ·Log|x|, (d) x·sin(e^(1/x) − 1) et x·sin(1/x) seulement en QCM (niveau 5 et variante `mcq`) ; (e) x|cos x| en π/2 laissé de côté. La ligne des gendarmes est la note de la dernière ligne. Le V/F faux est un QCM Vrai/Faux (pas de vérificateur de contre-exemple pour la dérivabilité).
- **Intro** : `f′(x₀) = lim_{h→0} (f(x₀ + h) − f(x₀))/h`, si cette limite existe et est finie. Aux points de raccord, on calcule les dérivées à gauche et à droite séparément. Dérivable ⇒ continue, pas l'inverse (|x| en 0). Exemple : `f(x) = x|x|` : `(h|h|)/h = |h| → 0`, donc f′(0) = 0.
- **Juge** : `limit` `{v:'h', to:0, dir}` sur le taux d'accroissement ; une ligne « f′(x₀) = … » par `value` · **Forme finale** : valeur de f′(x₀), ou « pas dérivable » avec les deux dérivées latérales.
- **Niveaux** :
  - L1 (guidé) : le taux est écrit, trou dans la simplification.
  - L2 : l'élève écrit le taux ; la méthode de limite (gendarmes, simplification) est donnée.
  - L3 (choisir l'action) : « écrire le taux », « simplifier », « gendarmes », « séparer h > 0 et h < 0 », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (« f est C¹ / dérivable mais f′ non continue / dérivable à gauche seulement… »).
- **Générateur** : gabarits (a) `xᵖ·sin(1/x)`, f(0) = 0, p ∈ {1, 2, 3} ; (b) `x|x|`, `|x|·x²`, `|x|ᵖ` ; (c) `|x|ᵖ·Log|x|`, f(0) = 0, p ∈ {1/2, 2/3, 6/5, 3/2} (2019) ; (d) `x·sin(e^(1/x) − 1)` (2020, dérivable à gauche seulement) ; (e) `x·|cos x|` en π/2.
- **Corrigé type** : `f(x) = x²·sin(1/x)` si x ≠ 0, `f(0) = 0`.
  1. `(f(h) − f(0))/h = h²·sin(1/h)/h` — *taux d'accroissement*
  2. `= h·sin(1/h)` — *simplifier*
  3. `|h·sin(1/h)| ≤ |h| → 0` — *gendarmes* (crédit `a1-seq-squeeze`)
  4. `f′(0) = 0` — *conclure*
- **Aides** : 1 « Écris (f(0 + h) − f(0))/h et simplifie. » · 2 `|h·sin(1/h)| ≤ ▢` · 3 `|h·sin(1/h)| ≤ |h| → 0, donc f′(0) = 0`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_derivable_from_formula`, `a1_corner_missed`) ; `tf` : « f dérivable en x₀ ⇒ lim_{h→0} (f(x₀) − f(x₀ − 2h))/h = 2f′(x₀) » (vrai) ; « f dérivable en x₀ ⇒ sin(f(x)) dérivable en x₀ » (vrai) ; « g(x) = ∫₀^{|x|} 1 dt est dérivable en 0 » (faux, g = |x|).
- **Pièges** : `a1_corner_missed`, `a1_derivable_from_formula`, `a1_bounded_times_zero`
- **Sous-buts → crédit** : gendarmes → `a1-seq-squeeze` ; limites latérales → `a1-fn-onesided` ; dérivée → `a1-deriv-def`.

### `a1-deriv-rules` — Dériver au niveau BA1 : produits, quotients, compositions, fonctions arc et hyperboliques
- **Année** 13 · **Prérequis** `g6-deriv-rules`, `g2-hyp-def`, `g3-arc-def` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Domaine ]0 ; 1[ ; produits, quotients (sinh, cosh, eᵏˣ, sin sur un polynôme) et composées (Arctg, Arcsin, argsh, sinh, cosh de x, x², √x, x/2, 2x ; Arctg et argsh de eᵏˣ). Argsh s'écrit `argsh` (la saisie lit « Argsh » comme un produit de lettres). Niveau 5 : f′, puis f′(0) ou f′(1) exact, au lieu de f″. Le V/F faux est un QCM Vrai/Faux.
- **Intro** : `(uv)′ = u′v + uv′`, `(u/v)′ = (u′v − uv′)/v²`, `(f∘g)′ = f′(g)·g′`. À connaître : `Arctg′ = 1/(1 + x²)`, `Arcsin′ = 1/√(1 − x²)`, `sinh′ = cosh`, `cosh′ = sinh`, `Argsh′ = 1/√(1 + x²)`. On ne simplifie qu'à la fin.
- **Juge** : `equiv` `{vars:['x'], domain, target:'no-prime'}` · **Forme finale** : expression sans ′ ni d/dx (simplification non exigée sauf si l'item le demande).
- **Niveaux** :
  - L1 (guidé) : u, v et leurs dérivées sont donnés, trou dans la formule.
  - L2 : l'élève écrit u′ et v′ ; la règle est donnée.
  - L3 (choisir l'action) : « règle du produit », « du quotient », « de chaîne », « dérivée usuelle », « simplifier ». Ligne `{kind:'rule'}` après la première ligne juste.
  - L4 (libre) : lignes libres.
  - L5 (seul) : deux dérivées enchaînées (f′ puis f″), sans aide.
- **Générateur** : on assemble f = A·B ou A/B ou A(B) avec A, B tirés parmi `eᵃˣ`, `sin(ax)`, `Arctg(xᵖ)`, `Arcsin(x/a)`, `√(x² + a)`, `Log(1 + x²)`, `sinh(ax)`, `Argsh(x)` ; a ∈ [1 ; 4], p ∈ {1/2, 1, 2}. Deux gabarits : expression à dériver ; dérivée en un point (valeur exacte). Domaine déclaré : là où f est définie et dérivable.
- **Corrigé type** : `f(x) = Arctg(√x)·e^(2x)`, x > 0.
  1. `f′ = (Arctg √x)′·e^(2x) + Arctg(√x)·(e^(2x))′` — *règle du produit*
  2. `(Arctg √x)′ = 1/(1 + x)·1/(2√x)` — *chaîne*
  3. `f′(x) = e^(2x)/(2√x(1 + x)) + 2e^(2x)·Arctg √x` — *assembler*
- **Aides** : 1 « Produit de deux facteurs ; le premier est une composée. » · 2 `(Arctg √x)′ = 1/(1 + ▢)·▢` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (distracteurs : `g6_product_naive`, `g6_chain_forgot`, `a1_arc_deriv_table`) ; `tf` : « Si f est dérivable et f′ > 0 sur ]0 ; 1[, f est strictement croissante » (vrai) ; « Une fonction monotone, non constante et dérivable sur ]0 ; 1[ a f′ ≥ 0 partout ou f′ ≤ 0 partout » (vrai).
- **Pièges** : `g6_product_naive`, `g6_chain_forgot`, `a1_arc_deriv_table`, `g6_quotient_sign`
- **Sous-buts → crédit** : règles → `g6-deriv-rules` ; fonctions arc → `g3-arc-def` ; hyperboliques → `g2-hyp-def`.

### `a1-deriv-inverse` — Dérivée d'une fonction réciproque en un point
- **Année** 13 · **Prérequis** `a1-deriv-rules`, `g1-inverse` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Quatre parties : x₀ (`value`), f′ (`equiv`), f′(x₀), (f⁻¹)′(y₀) (`value`, avec `cfg.inv` pour le piège). Familles x³ + ax + b, ax + sin x, ax + cos x (x₀ multiple de π/2), eˣ + ax ; le gabarit 2018 2 + Log((2e + x)/x²) est laissé de côté. Niveau 2 : x₀ parmi 2 ou 3 candidats ; niveau 5 : QCM. Les V/F faux sont des QCM Vrai/Faux.
- **Intro** : si f est bijective, dérivable en x₀ avec f′(x₀) ≠ 0, et y₀ = f(x₀), alors `(f⁻¹)′(y₀) = 1/f′(x₀)`. On cherche d'abord **x₀** tel que f(x₀) = y₀ ; on n'a pas besoin de la formule de f⁻¹.
- **Juge** : `value` pour x₀ (vérifie f(x₀) = y₀), `value` pour f′(x₀), `value` pour le résultat · **Forme finale** : nombre exact.
- **Niveaux** :
  - L1 (guidé) : x₀ donné, trou dans f′(x₀).
  - L2 : l'élève trouve x₀ parmi 3 candidats.
  - L3 (choisir l'action) : « trouver x₀ avec f(x₀) = y₀ », « dériver f », « évaluer en x₀ », « inverser ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen.
- **Générateur** : on part de x₀ (entier ou multiple de π) et de f strictement monotone : `x³ + ax + b`, `ax + sin x` (a ≥ 2), `ax + cos x`, `2 + Log((2e + x)/x²)` (2018), `eˣ + x`. y₀ = f(x₀) calculé. Contrainte : f′(x₀) rationnel non nul.
- **Corrigé type** : `f(x) = x³ + 3x + 1`, calculer `(f⁻¹)′(5)`.
  1. `f(x₀) = 5 ⇒ x₀ = 1` — *trouver x₀*
  2. `f′(x) = 3x² + 3`, `f′(1) = 6` — *dériver et évaluer*
  3. `(f⁻¹)′(5) = 1/6` — *inverser*
- **Aides** : 1 « Cherche le x₀ dont l'image est 5 : c'est là qu'on dérive f. » · 2 `(f⁻¹)′(5) = 1/f′(▢)` · 3 `= 1/f′(1) = 1/6`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_inverse_deriv_wrong_point`, `g1_inverse_reciprocal`, « f⁻¹ n'est pas dérivable ») ; `tf` : « f bijective et continue sur ℝ ⇒ f⁻¹ dérivable partout » (faux, f(x) = x³ : f⁻¹ = ∛ n'est pas dérivable en 0) ; « Toute bijection de ℝ dans ℝ est strictement monotone » (faux, f(x) = 1/x pour x ≠ 0 et f(0) = 0).
- **Pièges** : `a1_inverse_deriv_wrong_point`, `g1_inverse_reciprocal`
- **Sous-buts → crédit** : x₀ → `g1-inverse` ; dérivée → `a1-deriv-rules`.

### `a1-deriv-log` — Dérivée logarithmique : u(x)^(v(x))
- **Année** 13 · **Prérequis** `a1-deriv-rules`, `g2-real-powers` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). u parmi x + a, 1 + x², x ; v parmi x, x², 1 + x², 2x, 3x ; x₀ ∈ {0, 1, 2}. La valeur f′(x₀) est jugée par `definite` (forme close : 8 Log 2 + 1 ; la réponse de référence écrit Log 4 = 2 Log 2). Niveau 5 et variante `open` : u^v puis f′(x₀) sans aide (pas de x^(xˣ)).
- **Intro** : `u^v = e^(v·Log u)` (u > 0), donc `(u^v)′ = u^v·(v′·Log u + v·u′/u)`. La règle `(xⁿ)′ = n·xⁿ⁻¹` ne vaut que pour un exposant constant. Exemple : `(xˣ)′ = xˣ(Log x + 1)`.
- **Juge** : `equiv` `{target:'no-prime'}` ; si une valeur est demandée, `value` · **Forme finale** : expression ou valeur exacte (Log simplifiés : Log 4 = 2 Log 2 accepté sous les deux formes).
- **Niveaux** :
  - L1 (guidé) : la forme e^(v·Log u) est donnée, trou dans la dérivée de l'exposant.
  - L2 : l'élève écrit la forme exponentielle.
  - L3 (choisir l'action) : « écrire en e^(v Log u) », « dériver l'exposant », « évaluer ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : `x^(xˣ)` ou QCM d'examen.
- **Générateur** : u, v parmi `x + a`, `1 + x²`, `x`, `sin x` (sur ]0 ; π[), `xˣ` ; point x₀ ∈ {0, 1, 2} avec u(x₀) entier > 0. Gabarits : valeur f′(x₀) ; expression générale.
- **Corrigé type** : `f(x) = (x + 3)ˣ`, calculer f′(1).
  1. `f(x) = e^(x·Log(x + 3))` — *forme exponentielle*
  2. `f′(x) = (x + 3)ˣ·(Log(x + 3) + x/(x + 3))` — *dériver l'exposant* (crédit `a1-deriv-rules`)
  3. `f′(1) = 4·(Log 4 + 1/4)` — *évaluer*
  4. `= 8 Log 2 + 1` — *simplifier*
- **Aides** : 1 « L'exposant dépend de x : écris f = e^(x·Log(x + 3)). » · 2 `f′ = f·(Log(x + 3) + ▢)` · 3 `f′(1) = 4(Log 4 + 1/4) = 8 Log 2 + 1`.
- **Variantes d'examen** : `mcq` (examen 2021 : dérivée de (1 + x²)^(1+x²) en 1 = 8(Log 2 + 1) ; distracteurs : `g6_power_rule_exp`, `a1_exp_rule_var_base`) ; `open` (2 points : (x + 2)ˣ, f′(0) = Log 2).
- **Pièges** : `g6_power_rule_exp`, `a1_exp_rule_var_base`
- **Sous-buts → crédit** : forme exponentielle → `g2-real-powers` ; dérivée → `a1-deriv-rules`.

### `a1-c1-def` — Définir C¹(I)
- **Année** 13 · **Prérequis** `a1-deriv-def`, `a1-fn-extension` · **Étiquettes** GM · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-deriv-def` : dérivabilité en chaque point de I ; `a1-fn-extension` : continuité de f′.
- **Statut** : fait le 10 novembre 2026 (étape U2). Variantes C¹, C², Cᵏ et « continûment dérivable » (pas C⁰) ; les quatre leurres portent `a1_c1_def_missing_cont`. Niveau 5 : la définition seule, sans aide (l'enchaînement avec `a1-c1-proof` est le niveau 5 de celle-ci, qui commence par le bloc de la définition). La variante `open` est l'item de blocs sans aide.
- **Intro** : soit I un intervalle ouvert. `f ∈ C¹(I)` si f est dérivable en tout point de I **et** si sa dérivée f′ : I → ℝ est continue sur I. Dérivable ne suffit pas : x²·sin(1/x) est dérivable sur ℝ, mais f′ n'est pas continue en 0.
- **Juge** : type `blocks` (`mode:'define'`) ; blocs : « Soit I ⊂ ℝ un intervalle ouvert », « f : I → ℝ », « f est dérivable en tout x ∈ I », « f′ : I → ℝ est continue sur I » ; leurres : « f est continue sur I » (insuffisant seul), « f′ existe en un point », « f′ est bornée », « lim f′ existe » · **Forme finale** : les 4 blocs, sans leurre.
- **Niveaux** :
  - L1 (guidé) : 3 blocs placés, choisir le 4e parmi 3.
  - L2 : 2 blocs à choisir parmi 4.
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres.
  - L4 (libre) : blocs à ordonner, 4 leurres ; puis Cᵏ(I) par analogie.
  - L5 (seul) : définition enchaînée avec `a1-c1-proof`.
- **Générateur** : variantes de cible : C¹(I), C²(I), C⁰(I), Cᵏ(I), « f continûment dérivable sur I » ; intervalle ]a ; b[ ou ℝ.
- **Corrigé type** :
  1. « Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ. » — *cadre*
  2. « f est dérivable en tout point de I. » — *dérivabilité*
  3. « La fonction f′ : I → ℝ est continue sur I. » — *continuité de f′*
  4. « On note C¹(I) l'ensemble de ces fonctions. » — *nom*
- **Aides** : 1 « Deux conditions : une sur f, une sur f′. » · 2 « f est ▢ sur I et f′ est ▢ sur I. » · 3 la définition entière.
- **Variantes d'examen** : `open` (1 ou 2 points, partie (a) de la question C¹ en 2020 et 2022) ; `mcq` : « f(x) = |x|·x² est de classe C¹ pas C² / C² pas C³ / … » (C² pas C³, examen MT 2014).
- **Pièges** : `a1_c1_def_missing_cont`
- **Sous-buts → crédit** : définition → `a1-c1-def`.

### `a1-piecewise-ab` — Fonction par morceaux : choisir a et b pour qu'elle soit dérivable
- **Année** 13 · **Prérequis** `a1-deriv-def`, `a1-fn-extension`, `@alg:E-systemes` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). Raccord en 0 : un morceau donné ((x − r₁)(x − r₂), e^(kx) + c ou sin(kx) + c) et l'autre ax + b, à gauche ou à droite. Une partie par équation (continuité par `limit`, b, dérivée latérale par `limit`, a, f en un point par `value`) au lieu d'un `solset` en a et b. Pas de (√(1 + x) − 1)/x ni de solutions avec √5 ; niveau 5 : QCM. Le V/F faux est un QCM Vrai/Faux.
- **Intro** : dans l'ordre : (1) continuité au raccord (une équation), (2) égalité des dérivées à gauche et à droite (une deuxième équation). On peut dériver chaque morceau et évaluer au raccord **seulement si** le morceau est dérivable jusqu'au point et que f est continue au raccord. Sinon, on revient au taux d'accroissement.
- **Juge** : `limit` (continuité, dérivées latérales) ; `solset` `{vars:['a','b']}` pour le système · **Forme finale** : couples (a ; b) solutions, puis la réponse demandée (f(2), f(−3)…).
- **Niveaux** :
  - L1 (guidé) : équation de continuité donnée, trou dans celle des dérivées.
  - L2 : l'élève écrit les deux équations ; résolution guidée.
  - L3 (choisir l'action) : « continuité au raccord », « dérivée à gauche », « dérivée à droite », « résoudre le système », « évaluer f ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (paramètres dans les deux morceaux, solutions avec √5).
- **Générateur** : on part de (α ; β) et du raccord x₀ = 0 ; morceau gauche g(x) polynôme de degré 2 à racines entières, ou `sin(a²x) − b` ; morceau droit `αx + β`, `(ax + 1)(bx − 1)`, `(√(1 + x) − 1)/x` (demande un DL : dérivée à droite −1/8). Contrainte : système à une ou deux solutions rationnelles, sauf le gabarit (ax + 1)(bx − 1) / sin(a²x) − b qui donne a = (−1 ± √5)/2.
- **Corrigé type** : `f(x) = (x − 1)(x + 3)` si x < 0, `f(x) = αx + β` si x ≥ 0.
  1. `lim_{x→0⁻} f(x) = −3 = f(0) = β` — *continuité*
  2. `f′₋(0) = lim_{h→0⁻} ((h − 1)(h + 3) + 3)/h = lim (h + 2) = 2` — *dérivée à gauche*
  3. `f′₊(0) = α` — *dérivée à droite*
  4. `α = 2`, `β = −3` — *résoudre*
  5. `f(2) = 2·2 − 3 = 1` — *réponse demandée*
- **Aides** : 1 « D'abord continue en 0, ensuite mêmes pentes des deux côtés. » · 2 `β = ▢ ; α = f′₋(0) = ▢` · 3 `β = −3, α = 2`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_piecewise_derivative_formula`, continuité oubliée, une seule des deux solutions) ; `tf` : « f(x) = x|cos x| est dérivable en 0 » (vrai).
- **Pièges** : `a1_piecewise_derivative_formula`, `a1_corner_missed`
- **Sous-buts → crédit** : continuité → `a1-fn-extension` ; dérivées latérales → `a1-deriv-def` ; système → `@alg:E-systemes`.

### `a1-c1-proof` — Montrer qu'une fonction définie par morceaux est C¹
- **Année** 13 · **Prérequis** `a1-c1-def`, `a1-deriv-def`, `a1-deriv-rules`, `a1-seq-squeeze` · **Étiquettes** GM · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). Blocs (`frame`) avec saisies : f′(x) hors de 0 par équivalence, f′(0) et lim f′ comme nombres (pas par le juge `limit`). Contre-gabarit p = 2 (« pas C¹ ») au niveau 4. La variante `open` (6 points) est un item `lines` sans aide en parties (`equiv`, puis `limit` sur le taux et sur f′), avec aussi le gabarit 2020 (E4) ; le type `problem` et son barème par étape arrivent en U4. Le V/F faux est un QCM Vrai/Faux.
- **Intro** : charpente en quatre temps : (1) hors du point x₀, f est C¹ comme somme, produit, composée de fonctions C¹ : on donne f′ ; (2) en x₀, f′(x₀) **par la définition** ; (3) `lim_{x→x₀} f′(x) = f′(x₀)` ; (4) conclusion. Le point (3) ne remplace pas le point (2).
- **Juge** : type `blocks` (`mode:'frame'`) avec saisies : f′(x) hors de x₀ par `equiv`, f′(x₀) par `limit` sur le taux, lim f′ par `limit` · **Forme finale** : les quatre parties, chacune juste.
- **Niveaux** :
  - L1 (guidé) : charpente et f′(x) donnés, trous dans les deux limites.
  - L2 : l'élève dérive hors de 0 ; charpente donnée.
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres (« f′(0) = lim f′(x) », « f est dérivable donc C¹ »).
  - L4 (libre) : charpente à écrire, aides disponibles.
  - L5 (seul) : question d'examen (6 points), avec la définition de C¹.
- **Générateur** : `f(x) = ax + xᵖ·sin(1/x)` ou `xᵖ·cos(1/x)` avec p ∈ {3, 4}, a ∈ [1 ; 6] (C¹) ; contre-gabarit p = 2 (dérivable mais pas C¹, « montrer que f n'est pas C¹ ») ; gabarit 2020 : `Arctg(1/x)` sur ]0 ; 1[ et `π/2 − x` sur ]−1 ; 0] (f′(0) = −1 des deux côtés). Intervalle ]−1 ; 1[.
- **Corrigé type** : `f(x) = 3x + x³·cos(1/x)` si x ≠ 0, `f(0) = 0`, sur ]−1 ; 1[.
  1. Pour x ≠ 0 : `f′(x) = 3 + 3x²·cos(1/x) + x·sin(1/x)`, continue sur ]−1 ; 0[ ∪ ]0 ; 1[ — *hors de 0* (crédit `a1-deriv-rules`)
  2. `(f(h) − f(0))/h = 3 + h²·cos(1/h) → 3`, car `|h²·cos(1/h)| ≤ h²` : `f′(0) = 3` — *en 0, par la définition* (crédit `a1-deriv-def`)
  3. `|3x²·cos(1/x) + x·sin(1/x)| ≤ 3x² + |x| → 0`, donc `f′(x) → 3 = f′(0)` — *continuité de f′ en 0* (crédit `a1-seq-squeeze`)
  4. f est dérivable sur ]−1 ; 1[ et f′ y est continue : `f ∈ C¹(]−1 ; 1[)` — *conclure* (crédit `a1-c1-def`)
- **Aides** : 1 « Quatre temps : hors de 0, en 0 par la définition, limite de f′ en 0, conclusion. » · 2 `|x·sin(1/x)| ≤ ▢` · 3 la ligne 3.
- **Variantes d'examen** : `open` (6 points : définition 1 ; f′ hors de 0 et sa continuité 1 ; f′(0) par la définition 1,5 ; continuité de f′ en 0 1,5 ; conclusion 1) ; `mcq` (examen 2022 : f′(x) = x·sin x/(√(x² + 1) − 1) pour x ≠ 0, f C¹ : f′(0) = 2) ; `tf` : « f(x) = x³·sin(1/x), f(0) = 0, est deux fois dérivable sur ℝ » (faux).
- **Pièges** : `a1_derivable_from_formula`, `a1_c1_from_lim_fprime_only`, `a1_c1_def_missing_cont`
- **Sous-buts → crédit** : f′ hors de 0 → `a1-deriv-rules` ; f′(0) → `a1-deriv-def` ; bornes → `a1-seq-squeeze` ; conclusion → `a1-c1-def`.

### `a1-mvt` — Rolle et accroissements finis : encadrer un taux d'accroissement
- **Année** 13 · **Prérequis** `a1-deriv-rules`, `a1-fn-image` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). Les bornes de f′ sont deux parties « minore f′(c) » et « majore f′(c) » (juge `equiv` avec `rel`, inégalités larges, borne la plus fine exigée) ; l'énoncé du TAF est une décision prise avant le calcul, l'encadrement strict final n'est pas saisi. Gabarits en lignes : polynômes de degré 2 et 3 (pas de c·e^((x + d)/c), d'Arctg ni de sin). V/F : « |f(x) − f(y)| ≤ K|x − y| » est un vrai `tf` avec contre-exemple (x, y) ; les énoncés sur des fonctions (Rolle avec |x|, f′ ≤ g′) sont des QCM Vrai/Faux, faute de vérificateur de contre-exemple « fonction ».
- **Intro** : TAF : f continue sur [a ; b], dérivable sur ]a ; b[ ⇒ il existe c ∈ ]a ; b[ tel que `(f(b) − f(a))/(b − a) = f′(c)`. Donc si `m ≤ f′ ≤ M` sur l'intervalle, `m ≤ (f(y) − f(x))/(y − x) ≤ M`. Rolle (f(a) = f(b) ⇒ f′(c) = 0) exige la dérivabilité : |x| sur [−1 ; 1] n'a pas de c.
- **Juge** : `equiv` pour f′ ; `solset` pour l'ensemble des valeurs de f′ sur l'intervalle (image) ; mcq ou saisie de l'encadrement (`value` sur m et M) · **Forme finale** : encadrement `m ≤ … ≤ M` (ou strict) juste et le plus fin possible.
- **Niveaux** :
  - L1 (guidé) : f′ donnée, trou dans son image.
  - L2 : l'élève dérive ; l'image de f′ est à trous.
  - L3 (choisir l'action) : « citer le TAF », « dériver », « image de f′ sur l'intervalle », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou preuve (TAF puis TVI, voir `a1-proofs`).
- **Générateur** : f polynôme de degré 2 (f′ affine) sur un intervalle ]p ; q[ entier ; `c·e^((x + d)/c) − k` sur [−d ; 0] (f′ ∈ [1 ; e]) ; `Arctg x` (|f′| ≤ 1) ; `sin x` (inégalité |sin x − sin y| ≤ |x − y|). Gabarit (b) : f′ ≥ k donnée, que peut-on dire de f(4) − f(0) ? (2021).
- **Corrigé type** : `f(x) = x² − 2x + 5` sur ]−1 ; 4[ ; encadrer `(f(x) − f(y))/(x − y)` pour x ≠ y.
  1. TAF : `(f(x) − f(y))/(x − y) = f′(c)` avec c entre x et y — *citer le théorème*
  2. `f′(c) = 2c − 2` — *dériver*
  3. `c ∈ ]−1 ; 4[ ⇒ 2c − 2 ∈ ]−4 ; 6[` — *image de f′*
  4. `−4 < (f(x) − f(y))/(x − y) < 6` — *conclure*
- **Aides** : 1 « Le taux d'accroissement est une valeur de f′ : encadre f′ sur l'intervalle. » · 2 `f′(c) = 2c − 2 ∈ ]▢ ; ▢[` · 3 `]−4 ; 6[`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_mvt_endpoints_values`, intervalle de f au lieu de f′, `a1_rolle_without_hyp`) ; `tf` : « f continue sur [−1 ; 1] avec f(−1) = f(1) ⇒ ∃x₀ ∈ ]−1 ; 1[, f′(x₀) = 0 » (faux, f(x) = |x|) ; « f, g continues sur [a ; b], dérivables, f′ ≤ g′ ⇒ f ≤ g » (faux, f = 1, g = 0) ; « f ∈ C¹ et f′ = 0 a une seule solution ⇒ f(x) = 1 a au plus deux solutions » (vrai).
- **Pièges** : `a1_rolle_without_hyp`, `a1_mvt_endpoints_values`
- **Sous-buts → crédit** : dériver → `a1-deriv-rules` ; image de f′ → `a1-fn-image` ; conclusion → `a1-mvt`.

### `a1-bh` — Règle de Bernoulli-l'Hôpital, avec ses conditions
- **Année** 13 · **Prérequis** `a1-fn-limits`, `a1-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). « Quelle forme ? » : note au niveau 1, décision (avec `a1_bh_not_indeterminate` sur l'option « 0/0 » d'une forme qui n'est pas indéterminée) avant chaque BH au niveau 2, ligne d'auto-explication aux niveaux 3 et 4 ; la solution par DL n'est pas montrée au niveau 4. V/F en QCM Vrai/Faux (pas de vérificateur de contre-exemple « fonction »).
- **Intro** : si f/g est de la forme **0/0 ou ∞/∞**, g′ ≠ 0 près du point et `lim f′/g′ = L`, alors `lim f/g = L`. On vérifie la forme **avant chaque application**. On dérive numérateur et dénominateur **séparément**, pas (f/g)′. Si lim f′/g′ n'existe pas, on ne peut rien conclure.
- **Juge** : `limit` `{v:'x', to, dir}` ; avant chaque ligne BH, une ligne `{kind:'rule', ask:'Quelle forme ?', options:['0/0','∞/∞','pas indéterminé','1^∞']}` (aux niveaux 2 à 4) · **Forme finale** : valeur exacte.
- **Niveaux** :
  - L1 (guidé) : la forme est indiquée, trous dans f′ et g′.
  - L2 : l'élève choisit la forme et écrit f′/g′.
  - L3 (choisir l'action) : « vérifier la forme », « appliquer BH », « simplifier », « substituer ».
  - L4 (libre) : lignes libres ; à la fin, l'app montre la solution par DL à côté.
  - L5 (seul) : QCM d'examen ou forme 0·∞ à réécrire d'abord.
- **Générateur** : on part de la limite L et du nombre d'applications k ∈ {1, 2, 3} : `(e^(ax) − 1 − ax)/x²` (k = 2, L = a²/2), `(x − sin x)/x³` (k = 3, L = 1/6), `Log(1 + ax)/x`, `x·Log x` réécrit en `Log x/(1/x)` (0·∞), `(1 − cos ax)/x²`. Gabarit « piège » : `(x + 1)/(x² + 3x + 1)` en 0 (pas indéterminé, L = 1).
- **Corrigé type** : `lim_{x→0} (e^(2x) − 1 − 2x)/x²`.
  1. Forme 0/0 — *vérifier*
  2. `= lim (2e^(2x) − 2)/(2x)` — *BH*
  3. Encore 0/0 — *vérifier*
  4. `= lim 4e^(2x)/2` — *BH*
  5. `= 2` — *substituer*
- **Aides** : 1 « Vérifie la forme ; si c'est 0/0, dérive le haut et le bas séparément. » · 2 `= lim (2e^(2x) − 2)/▢` · 3 « Deux fois BH : 4e^(2x)/2 → 2. »
- **Variantes d'examen** : `mcq` (distracteurs : `a1_bh_not_indeterminate`, `a1_bh_quotient_rule`) ; `tf` : « g(0) = h(0) = 0, h′ ≠ 0 ; si lim g′/h′ n'existe pas, alors lim g/h n'existe pas » (faux : g(x) = x²·sin(1/x), h(x) = x ; g/h → 0) .
- **Pièges** : `a1_bh_not_indeterminate`, `a1_bh_quotient_rule`, `a1_bh_converse`
- **Sous-buts → crédit** : dériver → `a1-deriv-rules` ; forme indéterminée → `a1-fn-limits` ; BH → `a1-bh`.

### `a1-extrema-global` — Extrema globaux sur [a ; b] : bornes, f′ = 0, f′ qui n'existe pas
- **Année** 13 · **Prérequis** `a1-fn-image`, `a1-deriv-rules`, `g6-sign-variation` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-fn-image` : min et max atteints sur un segment ; `g6-sign-variation` : confirmer les candidats par le signe de f′.
- **Statut** : fait le 10 novembre 2026 (étape U2). Gabarits (x² + s)/(x + r) (examen GM 2019), polynôme de degré 3 et (x² + px + q)/(x² + rx + s) (avec Δ du dénominateur) ; pas de gabarit avec valeur absolue (point anguleux) ni sin x·e^(−x). Le max et le min sont deux nombres (pas « atteint en … »). Variante `open` : item `lines` sans aide (7 points), en attendant le type `problem`.
- **Intro** : f continue sur [a ; b] atteint son min et son max (théorème du cours). Candidats : **les bornes**, les points où **f′ = 0**, les points où **f′ n'existe pas**. On compare les valeurs. f′(x₀) = 0 ne suffit pas pour un extremum (x³ en 0).
- **Juge** : `equiv` pour f′ ; `solset` pour les candidats intérieurs ; `value` pour chaque valeur ; deux champs finaux (min, max avec les points) · **Forme finale** : « max = … atteint en … ; min = … atteint en … ».
- **Niveaux** :
  - L1 (guidé) : f′ donnée, liste des candidats à compléter.
  - L2 : l'élève dérive ; il coche les candidats parmi une liste qui contient un leurre hors de [a ; b].
  - L3 (choisir l'action) : « vérifier que f est définie et continue », « dériver », « zéros de f′ dans [a ; b] », « points sans dérivée », « évaluer », « comparer ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : question d'examen (7 points).
- **Générateur** : quotient `(x² + px + q)/(x² + rx + s)` dont la dérivée a un numérateur `k(x − c₁)(x − c₂)` avec c₁ ∈ ]a ; b[ entier et c₂ hors de [a ; b] ; dénominateur sans racine dans [a ; b] ; gabarit avec valeur absolue `x·|x − c|` (point anguleux) ; gabarit `sin(x)·e^(−x)` sur [0 ; 2π] (2018). Contraintes : valeurs rationnelles de dénominateur ≤ 30, toutes distinctes.
- **Corrigé type** : `f(x) = (x² − x + 1)/(x² + x + 1)` sur [0 ; 2].
  1. `x² + x + 1 > 0` (Δ = −3 < 0) : f est définie et continue sur [0 ; 2] — *bien définie* (crédit `@alg:H-discriminant`)
  2. `f′(x) = 2(x² − 1)/(x² + x + 1)²` — *dériver* (crédit `a1-deriv-rules`)
  3. Candidat intérieur : `x = 1` (x = −1 est hors de [0 ; 2]) — *points critiques*
  4. `f(0) = 1`, `f(1) = 1/3`, `f(2) = 3/7` — *évaluer*
  5. Max global `1` en x = 0 ; min global `1/3` en x = 1 — *comparer*
- **Aides** : 1 « Trois sortes de candidats : les bornes, f′ = 0, f′ qui n'existe pas. » · 2 `f′(x) = ▢(x² − 1)/(x² + x + 1)²` · 3 « Compare f(0), f(1), f(2). »
- **Variantes d'examen** : `open` (7 points : (a) bien définie 1 ; (b) f′ 2, candidats 1, valeurs 2, conclusion 1) ; `mcq` (2018 : sin x·e^(−x) sur [0 ; 2π] ; distracteurs : `a1_extrema_bounds_forgotten`, `g6_critical_is_extremum`) ; `mcq` (2021 : minimum local en 0, f deux fois dérivable ⇒ f′(0) = 0 et f″(0) ≥ 0).
- **Pièges** : `a1_extrema_bounds_forgotten`, `g6_critical_is_extremum`, `a1_corner_missed`, `g6_quotient_sign`
- **Sous-buts → crédit** : bien définie → `@alg:H-discriminant` ; dériver → `a1-deriv-rules` ; comparer → `a1-extrema-global`.

### `a1-fn-study` — Étude de fonction : convexité, asymptotes, graphe
- **Année** 13 · **Prérequis** `a1-extrema-global`, `a1-fn-limits`, `g6-study-full` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-limits` : limites aux bornes pour les asymptotes ; `g6-study-full` : même plan d'étude qu'au gymnase.
- **Statut** : fait le 10 novembre 2026 (étape U2). Un gabarit (x² + bx + c)/(x − d) = x + m + K/(x − d), avec extrema (K > 0) ou sans (K < 0) ; pas de x·e^(1/x) ni de (1/x²)ˣ. L'asymptote oblique est une décision après la division ; f′ et f″ sont dérivées sous la forme divisée. L'esquisse est un QCM en mots (variante `mcq`), pas d'item `plot` avant U5.
- **Intro** : f″ > 0 : convexe ; f″ < 0 : concave ; changement de signe : inflexion. Asymptote verticale : limite infinie en un point. Oblique y = mx + p : `m = lim f(x)/x`, puis `p = lim (f(x) − mx)` ; pour une fraction rationnelle, la division euclidienne donne les deux d'un coup.
- **Juge** : `equiv` pour f′, f″ et la division ; `solset` pour les intervalles ; `limit` pour m, p et les asymptotes verticales ; item `plot` ou `mcq` pour l'esquisse · **Forme finale** : tableau (monotonie, convexité), asymptotes, et esquisse choisie.
- **Niveaux** :
  - L1 (guidé) : f′ et f″ donnés, trous dans les intervalles.
  - L2 : l'élève fait la division euclidienne ; les limites sont à trous.
  - L3 (choisir l'action) : « domaine », « limites aux bords », « division euclidienne », « signe de f′ », « signe de f″ », « choisir l'esquisse ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : étude complète (comme la partie (b) du problème de suite), ou étude de (1/x²)ˣ (examen MT 2014) avec termes dominants.
- **Générateur** : `(x² + c)/(x − d)` avec c + d² carré parfait pour des racines entières de f′ ; `x·e^(1/x)` (oblique y = x + 1 par DL) ; `x + (x − p)/(x − v)` (lien avec `a1-seq-rec-study`) ; `e^(−2x·Log x)` sur ]0 ; +∞[. Contraintes : extrema en des points entiers.
- **Corrigé type** : `f(x) = (x² + 3)/(x − 1)`.
  1. Domaine `ℝ ∖ {1}` ; `lim_{x→1⁺} f = +∞`, `lim_{x→1⁻} f = −∞` : asymptote verticale x = 1 — *asymptote verticale*
  2. `f(x) = x + 1 + 4/(x − 1)` : asymptote oblique `y = x + 1` en ±∞ — *division euclidienne* (crédit `g0-long-div`)
  3. `f′(x) = (x − 3)(x + 1)/(x − 1)²` : max local f(−1) = −2, min local f(3) = 6 — *monotonie*
  4. `f″(x) = 8/(x − 1)³` : concave sur ]−∞ ; 1[, convexe sur ]1 ; +∞[, pas d'inflexion — *convexité*
  5. Esquisse : choisir le graphe juste parmi 4 — *graphe*
- **Aides** : 1 « Divise x² + 3 par x − 1 : le quotient donne l'asymptote oblique. » · 2 `f(x) = x + 1 + ▢/(x − 1)` · 3 `f″(x) = 8/(x − 1)³`.
- **Variantes d'examen** : `mcq` (examen MT 2014 : « (x − 1)²(x − 3)⁴(x + 5)^(1/3) possède au moins 4 extrema locaux » ; raisonner sur le graphe) ; `tf` : « f(x) = e^(x⁴/4 + x²/2) a un seul minimum local » (vrai) ; « f′(x₀) = 0 ⇒ extremum local » (faux, x³).
- **Pièges** : `a1_oblique_asymptote_slope_only`, `g6_critical_is_extremum`, `g6_inflection_f2_zero`
- **Sous-buts → crédit** : division → `g0-long-div` ; monotonie → `a1-extrema-global` ; asymptotes, convexité → `a1-fn-study`.

### `a1-param-curve` — Courbes paramétrées : tangentes, points doubles, asymptotes
- **Année** 13 · **Prérequis** `a1-deriv-rules`, `a1-fn-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-fn-limits` : asymptotes : limites quand t → t₀.
- **Statut** : fait le 10 novembre 2026 (étape U2). Gabarit x = t² + a, y = t³ − 3b²t + e, et le même avec x et y échangés ; pas de folium ni de Lissajous, pas d'asymptote. Les points sont demandés coordonnée par coordonnée (`value`) ; pas d'esquisse. Variante `open` : item `lines` sans aide (4 points).
- **Intro** : `γ(t) = (x(t) ; y(t))`. Pente de la tangente : `y′ = ẏ/ẋ` (si ẋ ≠ 0). Tangente horizontale : ẏ = 0, ẋ ≠ 0 ; verticale : ẋ = 0, ẏ ≠ 0. Point double : deux valeurs t ≠ s avec γ(t) = γ(s). (Douchet, section 5.7.)
- **Juge** : `equiv` `{vars:['t']}` pour ẋ, ẏ et la pente ; `solset` `{v:'t'}` pour les valeurs de t ; `value` pour les points · **Forme finale** : liste des points demandés (coordonnées exactes).
- **Niveaux** :
  - L1 (guidé) : ẋ et ẏ donnés, trous dans la pente et les t.
  - L2 : l'élève dérive ; les conditions (ẏ = 0, ẋ ≠ 0) sont rappelées.
  - L3 (choisir l'action) : « dériver x et y », « tangente horizontale », « tangente verticale », « point double », « asymptote (t → t₀) ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : étude complète avec esquisse (mcq de 4 graphes).
- **Générateur** : `x = t² + a`, `y = t³ − 3b²t` (point double en t = ±b√3, horizontales en t = ±b) ; `x = 3t/(1 + t³)`, `y = 3t²/(1 + t³)` (folium de Descartes, asymptote x + y + 1 = 0, niveau 5) ; `x = cos t`, `y = sin 2t` (Lissajous). a ∈ [−3 ; 3], b ∈ {1, 2}.
- **Corrigé type** : `x(t) = t² − 1`, `y(t) = t³ − 3t`.
  1. `ẋ = 2t`, `ẏ = 3t² − 3` — *dériver*
  2. `y′ = (3t² − 3)/(2t)` — *pente*
  3. Horizontale : `t = ±1` → points `(0 ; −2)` et `(0 ; 2)` — *ẏ = 0, ẋ ≠ 0*
  4. Verticale : `t = 0` → point `(−1 ; 0)` — *ẋ = 0, ẏ ≠ 0*
  5. `γ(√3) = γ(−√3) = (2 ; 0)` : point double — *point double*
- **Aides** : 1 « La pente est ẏ/ẋ. Horizontale : le numérateur s'annule, pas le dénominateur. » · 2 `ẏ = 0 ⇔ t = ▢` · 3 `t = ±1 : (0 ; −2) et (0 ; 2)`.
- **Variantes d'examen** : `mcq` (distracteurs : `g6_param_slope_inverted`, point au lieu du paramètre) ; `open` (4 points).
- **Pièges** : `g6_param_slope_inverted`
- **Sous-buts → crédit** : dériver → `a1-deriv-rules` ; points → `a1-param-curve`.

### `a1-polar-curve` — Courbe polaire ρ = f(φ) : limites, pente, tangentes (problème long)
- **Année** 13 · **Prérequis** `a1-param-curve`, `g3-identities` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Statut** : fait le 10 novembre 2026 (étape U2). Problème long : au niveau 5 et en variante `open` (12 points), un item `lines` sans aide avec des parties, en attendant le type `problem`. Parties dans l'ordre (a) ρ̇, (b) limites de x et y en φ → π⁻ (juge `limit` en φ), (c) pente puis ẏ, (d) point sur Oy et pente, (e) tangentes horizontales ; l'asymptote, la formule de la pente et l'esquisse sont des décisions en mots. Gabarits a·tan(φ/2) et a/(1 + cos φ) (pas de cardioïde).
- **Intro** : `x = ρ(φ)·cos φ`, `y = ρ(φ)·sin φ`. Pente : `y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ)`. Une asymptote se lit sur les limites de x(φ) et y(φ) quand ρ → ∞. On simplifie beaucoup avec les formules de l'angle moitié.
- **Juge** : type `problem` ; parties : (a) `limit` `{v:'φ', to:'π', dir:'-'}` pour x et y ; (b) `equiv` `{vars:['φ'], domain:{φ:[0, 3]}}` pour ρ̇ ; (c) `equiv` pour y′ et ẏ ; (d) `value` pour le point et la pente ; (e) `solset` `{v:'φ', domain:[0, π[}` ; (f) `mcq` d'esquisses · **Forme finale** : réponses des six parties.
- **Niveaux** :
  - L1 (guidé) : formules x, y, y′ rappelées ; trous dans ρ̇ et dans les limites.
  - L2 : (a) et (b) à trous, (c) guidé.
  - L3 (choisir l'action) : « limite de x », « limite de y (0·∞) », « dériver ρ », « appliquer la formule de pente », « simplifier par 1 + cos φ ».
  - L4 (libre) : parties libres, aides disponibles.
  - L5 (seul) : problème entier (12 points), `noHints`.
- **Générateur** : ρ = a·tan(φ/2) sur [0 ; π[ avec a ∈ {2, 3, 4, 5} (a ≠ 1 pour changer les nombres) ; gabarit 2 : ρ = a/(1 + cos φ) (parabole, y′ simple) ; gabarit 3 : ρ = a(1 + cos φ) (cardioïde, tangentes horizontales en φ = π/3, π, 5π/3). Formule utile affichée : `tan(φ/2) = sin φ/(1 + cos φ)`.
- **Corrigé type** : `ρ = 3·tan(φ/2)`, φ ∈ [0 ; π[.
  1. (a) `x = 3 tan(φ/2)·cos φ → −∞` quand φ → π⁻ — *limite de x*
  2. `y = 3 sin²φ/(1 + cos φ) = 3(1 − cos φ) → 6` — *limite de y* ; asymptote horizontale `y = 6` quand x → −∞
  3. (b) `ρ̇ = (3/2)(1 + tan²(φ/2)) = 3/(1 + cos φ)` — *dériver ρ*
  4. (c) `y′ = sin φ(1 + cos φ)/(cos²φ + cos φ − 1)` — *pente* ; au passage `ẏ = 3 sin φ`
  5. (d) Sur l'axe Oy : φ = π/2, `P = (0 ; 3)`, `y′(P) = −1` — *point et pente*
  6. (e) Tangente horizontale : `ẏ = 0 ⇔ φ = 0` (l'origine) — *tangentes horizontales*
  7. (f) Esquisse : choisir parmi 4 — *graphe*
- **Aides** : désactivées en L5 ; ailleurs : 1 « Écris y = ρ sin φ et simplifie avec tan(φ/2) = sin φ/(1 + cos φ). » · 2 `y = 3(1 − ▢)` · 3 `y → 6 : asymptote y = 6`.
- **Variantes d'examen** : `open` (12 points : (a) 3 ; (b) 2 ; (c) 3 ; (d) 1 ; (e) 1 ; (f) 2).
- **Pièges** : `a1_polar_slope_naive`, `a1_bounded_times_zero`, `g6_param_slope_inverted`
- **Sous-buts → crédit** : trigonométrie → `g3-identities` ; pente → `a1-param-curve` ; limites → `a1-fn-limits`.

**— Développements limités —**

### `a1-dl-usual` — DL usuels en 0, notation xⁿ·ε(x)
- **Année** 13 · **Prérequis** `a1-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-deriv-rules` : coefficients f⁽ᵏ⁾(0)/k!.
- **Statut** : fait le 10 novembre 2026 (étape U2). Le niveau 1 rappelle la formule de référence dans l'énoncé. La ligne « substituer » non réduite n'est gardée qu'aux niveaux guidés (aux niveaux libres, le juge `series` demande des termes regroupés). Le V/F faux est un énoncé « pour tout a » qu'une valeur de a réfute.
- **Intro** : `f(x) = a₀ + a₁x + … + aₙxⁿ + xⁿ·ε(x)` avec ε(x) → 0. Si f est de classe Cⁿ, `aₖ = f⁽ᵏ⁾(0)/k!` (Taylor). À connaître à l'ordre n : `eˣ`, `sin x`, `cos x`, `Log(1 + x)`, `(1 + x)^α`, `1/(1 − x)`, `Arctg x`, `sinh x`, `cosh x`. On substitue ensuite `−x`, `2x`, `x²`.
- **Juge** : `series` `{v:'x', at:0, order:n}` · **Forme finale** : polynôme ordonné par degrés croissants, avec le reste `xⁿ·ε(x)` (ou o(xⁿ)) à l'ordre demandé.
- **Niveaux** :
  - L1 (guidé) : la formule générale est affichée, trous dans les coefficients.
  - L2 : l'élève écrit les coefficients ; le reste est donné.
  - L3 (choisir l'action) : « DL de référence », « substituer », « tronquer à l'ordre n », « écrire le reste ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : trois DL usuels en série rapide, sans aide.
- **Générateur** : fonction de référence parmi les 9, argument `ax` ou `ax²` (a ∈ {−3, −2, −1, 1/2, 2, 3}), ordre n ∈ [2 ; 6] ; pour `(1 + x)^α`, α ∈ {−1, −2, 1/2, −1/2, 1/3}. Contraintes : coefficients de dénominateur ≤ 720.
- **Corrigé type** : `√(1 + x)` à l'ordre 3.
  1. `(1 + x)^α = 1 + αx + α(α − 1)/2·x² + α(α − 1)(α − 2)/6·x³ + x³·ε(x)` — *formule de référence*
  2. `α = 1/2` : `α(α − 1)/2 = −1/8`, `α(α − 1)(α − 2)/6 = 1/16` — *coefficients*
  3. `√(1 + x) = 1 + x/2 − x²/8 + x³/16 + x³·ε(x)` — *DL*
- **Aides** : 1 « C'est (1 + x)^α avec α = 1/2. » · 2 `1 + x/2 + ▢·x² + ▢·x³ + x³·ε(x)` · 3 la ligne 3.
- **Variantes d'examen** : `mcq` (DL de 1/(4 + 3t) à l'ordre 2 = 1/4 − 3t/16 + 9t²/64 ; distracteurs : `a1_dl_factorial_missing`, `a1_dl_factor_out_constant`, signe alterné oublié) ; `tf` : « Le DL d'ordre n de f donne f⁽ᵏ⁾(0) = pₙ⁽ᵏ⁾(0) pour k ≤ n, si f est infiniment dérivable » (vrai, 2022).
- **Pièges** : `a1_dl_factorial_missing`, `a1_dl_factor_out_constant`, `a1_dl_remainder_wrong_order`
- **Sous-buts → crédit** : coefficients → `a1-dl-usual`.

### `a1-dl-ops` — Somme, produit et quotient de DL
- **Année** 13 · **Prérequis** `a1-dl-usual`, `@alg:C-developper` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). Un quotient s'écrit (1/c)·N·(1 − u + u² − …) ; la ligne « développer sans réduire » n'existe qu'aux niveaux guidés. Le niveau 5 est un `lines` sans aide (quotient d'ordre 4 ou 5), en attendant le type `problem`.
- **Intro** : on multiplie les parties polynomiales et on **ne garde que les termes de degré ≤ n**. Quotient : on écrit `1/(1 + u) = 1 − u + u² − …` avec u → 0, ou on divise selon les puissances croissantes. Si le dénominateur commence par x, on factorise x d'abord, et il faut un ordre de plus au numérateur.
- **Juge** : `series` `{v:'x', at:0, order:n}` ; une ligne peut annoncer un ordre plus petit que n (« DL(2) de … »), l'app vérifie qu'il est cohérent · **Forme finale** : DL d'ordre n ordonné.
- **Niveaux** :
  - L1 (guidé) : les deux DL sont donnés, trous dans le produit tronqué.
  - L2 : l'élève écrit les DL ; le produit est à trous.
  - L3 (choisir l'action) : « écrire les DL facteurs à l'ordre n », « développer et tronquer », « écrire 1/(1 + u) », « factoriser x au dénominateur ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : quotient à l'ordre 5 (type examen MT 2014, 7 points), ou QCM.
- **Générateur** : produit `eᵃˣ·sin(bx)`, `cos x·Log(1 + x)`, `(1 + x)^α·eˣ` ; quotient `1/(1 + e^(−x))` (ordre 3), `1/(2 + 3x)`, `tan x`, `sin x/(1 + x²)`, `Log(1 + x²)/sin x`. n ∈ [2 ; 5]. Contraintes : coefficients de dénominateur ≤ 360.
- **Corrigé type** : `eˣ·sin x` à l'ordre 3.
  1. `eˣ = 1 + x + x²/2 + x³/6 + x³·ε(x)` — *DL facteur*
  2. `sin x = x − x³/6 + x³·ε(x)` — *DL facteur*
  3. `eˣ·sin x = x + x² + x³/2 − x³/6 + x³·ε(x)` — *développer et tronquer* (crédit `@alg:C-developper`)
  4. `= x + x² + x³/3 + x³·ε(x)` — *réduire*
- **Aides** : 1 « Multiplie les deux DL et jette tout ce qui dépasse x³. » · 2 `x + x² + (▢ − 1/6)x³` · 3 `x + x² + x³/3 + x³·ε(x)`.
- **Variantes d'examen** : `mcq` (examen 2020 : 1/(1 + e^(−x)) à l'ordre 3 ; distracteurs : `a1_dl_truncate_early`, `a1_dl_cube_coeffs`, signe) ; `tf` : « Si f = a + bx + cx² + x²ε(x), alors f³ = a³ + b³x + c³x² + x²ε(x) » (faux, f = 1 + x : f³ = 1 + 3x + 3x² + …) ; « f = 1 + 2x + x² + x²ε(x) ⇒ f² = 1 + 4x² + x²ε(x) » (faux : f² = 1 + 4x + 6x² + …).
- **Pièges** : `a1_dl_truncate_early`, `a1_dl_cube_coeffs`, `a1_dl_order_too_low`
- **Sous-buts → crédit** : développer → `@alg:C-developper` ; DL facteurs → `a1-dl-usual` ; tronquer → `a1-dl-ops`.

### `a1-dl-compose` — Composition de DL, y compris une constante intérieure non nulle
- **Année** 13 · **Prérequis** `a1-dl-ops` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). La vérification « u → 0 » est une partie jugée par `limit` ; le recentrage n'est demandé que pour g(0) = 1 (e¹ en facteur, Log(1 + u), √(1 + u)). Le niveau 5 est un `lines` sans aide plutôt qu'un QCM ; `coef` est une réponse courte.
- **Intro** : pour f(g(x)), on a besoin de **u = g(x) → 0** pour utiliser le DL de f en 0. Si g(0) = c ≠ 0, on recentre : `e^(g(x)) = e^c·e^(g(x) − c)`, `Log(g(x)) = Log c + Log(1 + (g(x) − c)/c)`. Dans uᵏ, on garde **tous** les termes de degré ≤ n : dans `(x − x³/6)³`, le terme `−x⁵/2` compte à l'ordre 5.
- **Juge** : `series` `{v:'x', at:0, order:n}` ; une ligne « u = … → 0 » est jugée par `limit` · **Forme finale** : DL d'ordre n.
- **Niveaux** :
  - L1 (guidé) : u est donné, trous dans u², u³ tronqués.
  - L2 : l'élève recentre (e^c en facteur) ; la composition est à trous.
  - L3 (choisir l'action) : « vérifier que u → 0 », « recentrer », « calculer u², u³ tronqués », « substituer dans le DL de f ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (e^(1/(1 − x)) à l'ordre 2, sin(sin x) à l'ordre 5, e^(sin x) coefficient a₃).
- **Générateur** : extérieure f parmi `eᵘ`, `Log(1 + u)`, `cos u`, `sin u`, `1/(1 − u)`, `√(1 + u)` ; intérieure g parmi `sin x`, `x/(1 − x)`, `1/(1 ± x)` (constante 1), `cos x` (constante 1), `x + x²`. Ordre 2 à 5. Gabarits : DL complet ; un seul coefficient (`coef`).
- **Corrigé type** : `e^(1/(1 + x))` à l'ordre 2.
  1. `1/(1 + x) = 1 − x + x² + x²·ε(x) → 1`, pas 0 — *vérifier u → 0*
  2. `e^(1/(1 + x)) = e·e^(−x + x² + x²ε(x))` — *recentrer*
  3. `u = −x + x²`, `u² = x² + x²·ε(x)` — *puissances tronquées*
  4. `e^u = 1 + u + u²/2 = 1 − x + x² + x²/2 + x²·ε(x)` — *substituer*
  5. `e^(1/(1 + x)) = e − e·x + (3e/2)·x² + x²·ε(x)` — *DL*
- **Aides** : 1 « 1/(1 + x) tend vers 1 : sors e¹ avant d'utiliser le DL de l'exponentielle. » · 2 `e·(1 + u + u²/2) avec u = ▢` · 3 `e(1 − x + 3x²/2) + x²ε(x)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_dl_compose_nonzero_inner`, `a1_dl_truncate_inner`, `a1_dl_truncate_early`) ; `coef` (« a₃ du DL de e^(sin x) » = 0 ; « a₃ de sin(x/(1 − x)) » = 5/6).
- **Pièges** : `a1_dl_compose_nonzero_inner`, `a1_dl_truncate_inner`, `a1_dl_truncate_early`
- **Sous-buts → crédit** : recentrer → `a1-dl-compose` ; puissances tronquées → `a1-dl-ops`.

### `a1-dl-limits` — Calculer une limite par DL
- **Année** 13 · **Prérequis** `a1-dl-ops`, `a1-bh` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). BH n'est qu'une option de la décision « méthode » (niveaux 4 et 5, `poor` dès k ≥ 3) : la solution par BH n'est pas montrée à côté. Le niveau 5 est un `lines` sans aide, pas un QCM. Le QCM n'a pas le distracteur `a1_bh_quotient_rule` (piège d'une autre partie).
- **Intro** : on développe numérateur et dénominateur **jusqu'au premier terme non nul**. Si le dénominateur est en x³, le numérateur doit être développé à l'ordre 3 au moins, sinon il reste un ε(x)/x qui ne dit rien. À la fin, l'app montre la solution par BH à côté et demande laquelle était la plus rapide.
- **Juge** : décision « DL / BH » (les deux valides ; BH est `quality:'poor'` dès que k ≥ 3 applications) ; `series` pour chaque DL ; `limit` pour la fin · **Forme finale** : valeur exacte.
- **Niveaux** :
  - L1 (guidé) : l'ordre est imposé, trous dans les DL.
  - L2 : l'élève choisit l'ordre parmi 3 (un trop petit).
  - L3 (choisir l'action) : « DL du numérateur à l'ordre … », « DL du dénominateur », « diviser par xᵏ », « passer à la limite », « BH ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (Douchet ch. 5 : quotients de différences de fonctions usuelles).
- **Générateur** : on part de la limite L et de l'ordre k du premier terme : `(x − sin x)/(x(1 − cos x))` (k = 3, L = 1/3), `(eˣ − 1 − x)/x²`, `(Log(1 + x) − x + x²/2)/x³` (L = 1/3), `(cos x − 1 + x²/2)/x⁴` (1/24), `(e^(cos x − 1) − 1 + x²/2)/(x²·sin² x)`, `(6 Arctg x − 6 sin x + x³)/x⁵`. Contraintes : L rationnel non nul.
- **Corrigé type** : `lim_{x→0} (x − sin x)/(x(1 − cos x))`.
  1. Décision : *DL* (BH demanderait trois dérivations)
  2. `x − sin x = x³/6 + x³·ε(x)` — *DL du numérateur à l'ordre 3*
  3. `x(1 − cos x) = x³/2 + x³·ε(x)` — *DL du dénominateur*
  4. `= (1/6 + ε(x))/(1/2 + ε(x))` — *diviser par x³*
  5. `→ 1/3` — *limite*
- **Aides** : 1 « Le dénominateur commence en x³ : développe le numérateur jusqu'à x³. » · 2 `x − sin x = ▢·x³ + x³ε(x)` · 3 `(x³/6)/(x³/2) → 1/3`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_dl_order_too_low`, `a1_ipe_in_sum`, `a1_bh_quotient_rule`) ; `tf` : « f = x − 2x³ + x³ε(x) ⇒ lim (f(x) − x)/x² = 0 » (vrai, 2018).
- **Pièges** : `a1_dl_order_too_low`, `a1_ipe_in_sum`
- **Sous-buts → crédit** : DL → `a1-dl-ops` ; limite → `a1-dl-limits` ; BH → `a1-bh`.

### `a1-dl-read` — Lire f⁽ⁿ⁾(a) ou la nature d'un point critique sur un DL
- **Année** 13 · **Prérequis** `a1-dl-ops`, `a1-extrema-global` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Statut** : fait le 10 novembre 2026 (étape U2). La nature d'un point critique n'est demandée qu'au QCM d'examen, sans piège nommé (`g6_critical_is_extremum` est un piège de la partie g6a). Un V/F faux sur f′(0) + 3f″(0) + f‴(0) est un QCM Vrai/Faux (il n'y a rien à réfuter). `open` est un `lines` sans aide de 7 points.
- **Intro** : si `f(x) = Σ aₖ(x − a)ᵏ + (x − a)ⁿ·ε(x)` et f est Cⁿ, alors `f⁽ᵏ⁾(a) = k!·aₖ`. Si a₁ = 0 et a₂ ≠ 0 : min local (a₂ > 0) ou max local (a₂ < 0). Si a₂ = 0 et a₃ ≠ 0 : point d'inflexion à tangente horizontale (un « plat »). Une fonction impaire n'a que des puissances impaires.
- **Juge** : `series` pour le DL ; `value` pour f⁽ᵏ⁾(a) ; `mcq` pour la nature · **Forme finale** : valeurs exactes ou nature.
- **Niveaux** :
  - L1 (guidé) : DL donné, trou dans k!·aₖ.
  - L2 : DL donné ; l'élève choisit la formule (aₖ, k!·aₖ, aₖ/k!).
  - L3 (choisir l'action) : « calculer le DL », « lire aₖ », « multiplier par k! », « lire la nature ».
  - L4 (libre) : DL à calculer puis lecture.
  - L5 (seul) : problème « DL d'ordre 5 puis f⁽⁴⁾(0) et f⁽⁵⁾(0) » (7 points) ou vrai/faux.
- **Générateur** : on part d'un DL avec coefficients choisis (lecture directe), ou de f = quotient/produit de `a1-dl-ops` ; point a ∈ {0, 1} ; nature : on choisit (a₁, a₂, a₃) parmi (0, ±k, ·), (0, 0, ±k). Gabarits : f⁽ᵏ⁾(a) ; nature ; combinaison `f′(0) + 3f″(0) + f‴(0)`.
- **Corrigé type** : `f(x) = sin x/(1 + x²)` : DL à l'ordre 5, puis f⁽⁴⁾(0), f⁽⁵⁾(0) et f‴(0).
  1. `1/(1 + x²) = 1 − x² + x⁴ + x⁵·ε(x)` — *DL du facteur*
  2. `f(x) = (x − x³/6 + x⁵/120)(1 − x² + x⁴) + x⁵·ε(x)` — *produit* (crédit `a1-dl-ops`)
  3. `= x − (7/6)x³ + (47/40)x⁵ + x⁵·ε(x)` — *tronquer et réduire*
  4. `f⁽⁴⁾(0) = 4!·0 = 0` (f est impaire) — *lire a₄*
  5. `f⁽⁵⁾(0) = 5!·47/40 = 141` ; `f‴(0) = 3!·(−7/6) = −7` — *multiplier par k!*
- **Aides** : 1 « Le coefficient de xᵏ vaut f⁽ᵏ⁾(0)/k!. » · 2 `f⁽⁵⁾(0) = ▢·47/40` · 3 `= 120·47/40 = 141`.
- **Variantes d'examen** : `mcq` (examen MT 2014 : f = 5 − 3x² + 4x³ − 10x⁴ + o(x⁴) ⇒ maximum local ; f = 7 − 5(x − 1)² + 2(x − 1)³ + o((x − 1)³) ⇒ f″(1) = −10, f‴(1) = 12 ; distracteurs : `a1_dl_read_factorial`, `a1_dl_read_divide`) ; `tf` : « f ∈ C⁵, f = 1 + x − x² + x³ − x⁴ + x⁴ε(x) ⇒ f′(0) + 3f″(0) + f‴(0) = 1 » (vrai) ; « Toute fonction Cⁿ(]a ; b[) a un DL d'ordre n en tout point de ]a ; b[ » (vrai) ; `open` (7 points, sur le modèle de l'examen MT 2014 : DL d'ordre 5 d'un quotient comme Log(1 + 2x²)/sin x, puis f⁽⁴⁾(0) et f⁽⁵⁾(0) ; barème : DL des facteurs 1, quotient 4, lecture 2).
- **Pièges** : `a1_dl_read_factorial`, `a1_dl_read_divide`, `g6_critical_is_extremum`
- **Sous-buts → crédit** : DL → `a1-dl-ops` ; lecture → `a1-dl-read` ; nature → `a1-extrema-global`.

### `a1-taylor-rest` — Reste de Taylor : majorer l'erreur
- **Année** 13 · **Prérequis** `a1-dl-usual`, `a1-mvt` · **Étiquettes** opt · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-mvt` : le reste de Lagrange prolonge les accroissements finis (c entre a et x).
- **Statut** : fait le 10 novembre 2026 (étape U2). f parmi √(1 + x), Log(1 + x), eˣ (majorant M = 2 sur [0 ; x₀]) et sin x (n = 2 seulement) ; une majoration est acceptée si elle est valide et ≤ 2 fois la borne optimale (`equiv` avec `rel: '≤'` et `bound`). Le niveau 5 ajoute « le plus petit n pour une précision 10⁻ᵏ » (sauf pour √(1 + x)).
- **Intro** : `f(x) = Tₙ(x) + f⁽ⁿ⁺¹⁾(c)/(n + 1)!·(x − a)ⁿ⁺¹` pour un c entre a et x (Lagrange). Pour majorer l'erreur, on majore |f⁽ⁿ⁺¹⁾| **sur tout l'intervalle**, pas seulement en a.
- **Juge** : `series` pour Tₙ ; `equiv` `{rel:'≤'}` pour la majoration de |f⁽ⁿ⁺¹⁾| ; `value` pour la borne finale (toute borne valide ≤ 2 fois la borne optimale est acceptée) · **Forme finale** : approximation et majorant de l'erreur.
- **Niveaux** :
  - L1 (guidé) : Tₙ et f⁽ⁿ⁺¹⁾ donnés, trou dans le majorant.
  - L2 : l'élève dérive ; le maximum de |f⁽ⁿ⁺¹⁾| est à trous.
  - L3 (choisir l'action) : « polynôme de Taylor », « dérivée d'ordre n + 1 », « majorer sur l'intervalle », « borne de Lagrange ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : trouver n pour une précision donnée.
- **Générateur** : f parmi `√(1 + x)`, `eˣ`, `sin x`, `Log(1 + x)` ; x ∈ {0,1 ; 0,2 ; 0,5} ; n ∈ [1 ; 3]. Contrainte : majorant de la forme p/q avec q ≤ 10⁵.
- **Corrigé type** : approcher √1,1 par T₂ de √(1 + x) en 0.
  1. `T₂(0,1) = 1 + 0,05 − 0,00125 = 1,04875` — *polynôme de Taylor*
  2. `f‴(x) = (3/8)(1 + x)^(−5/2)` — *dérivée d'ordre 3*
  3. `|f‴(c)| ≤ 3/8` pour c ∈ [0 ; 0,1] — *majorer sur l'intervalle*
  4. `|R₂| ≤ (3/8)·(0,1)³/3! = 1/16 000` — *borne de Lagrange*
- **Aides** : 1 « Reste de Lagrange : majore la dérivée suivante entre 0 et 0,1. » · 2 `|R₂| ≤ ▢·(0,1)³/6` · 3 la ligne 4.
- **Variantes d'examen** : `tf` : « |eˣ − (1 + x)| ≤ x²/2 pour tout x ∈ [0 ; 1] » (faux : le bon majorant est e·x²/2 ; contre-exemple x = 1, e − 2 ≈ 0,718 > 1/2).
- **Pièges** : `a1_taylor_rest_at_a`
- **Sous-buts → crédit** : Taylor → `a1-dl-usual` ; majorer → `a1-taylor-rest`.

**— Séries entières —**

### `a1-pow-domain` — Rayon de convergence et domaine, bornes comprises
- **Année** 13 · **Prérequis** `a1-ser-ratio-root`, `a1-ser-leibniz-abs` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : pour `Σ aₙ(x − x₀)ⁿ`, d'Alembert ou Cauchy sur |aₙ| donnent ρ, et `R = 1/ρ` (R = +∞ si ρ = 0). La série converge absolument pour |x − x₀| < R, diverge pour |x − x₀| > R. **Les deux bornes x₀ ± R s'étudient à part** (séries numériques).
- **Juge** : `limit` pour ρ ; `value` pour R ; un sous-item « nature » par borne (convention 5) ; `solset` `{v:'x'}` pour le domaine · **Forme finale** : intervalle avec les bons crochets.
- **Niveaux** :
  - L1 (guidé) : ρ calculé, trous dans R et dans l'intervalle ouvert ; bornes guidées.
  - L2 : l'élève calcule ρ ; les deux séries aux bornes sont écrites, l'élève choisit leur nature.
  - L3 (choisir l'action) : « d'Alembert sur |aₙ| », « Cauchy », « R = 1/ρ », « étudier x = x₀ + R », « étudier x = x₀ − R ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen ou domaine avec deux bornes de natures différentes.
- **Générateur** : `aₙ = cⁿ/(nᵖ·dⁿ⁺ᵏ)`, `√n`, `(k + 1)²/5ᵏ⁺³`, `(1 + 1/n)^(n^b)`, centre x₀ ∈ [−3 ; 3], c/d ∈ {1/2, 2/3, 3/2, 2, 3}, p ∈ {0, 1/2, 1, 2}. On contrôle les bornes : p = 0 → deux divergences ; p = 1 → une divergence, une semi-convergence ; p = 2 → deux convergences absolues.
- **Corrigé type** : `Σ_{n≥1} 3ⁿ/(n·2ⁿ⁺¹)·(x − 1)ⁿ`.
  1. `|aₙ₊₁/aₙ| = (3/2)·n/(n + 1) → 3/2` — *d'Alembert*
  2. `R = 2/3` ; convergence absolue pour `|x − 1| < 2/3` — *rayon*
  3. `x = 5/3` : `Σ 1/(2n)` diverge — *borne droite*
  4. `x = 1/3` : `Σ (−1)ⁿ/(2n)` converge (Leibniz) — *borne gauche* (crédit `a1-ser-leibniz-abs`)
  5. Domaine : `[1/3 ; 5/3[` — *conclure*
- **Aides** : 1 « R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne. » · 2 `R = ▢ ; bornes 1 ± R` · 3 `[1/3 ; 5/3[`.
- **Variantes d'examen** : `mcq` (examen 2022 : Σ 2ⁿ/3ⁿ⁺⁴·(x + 1)ⁿ → ]−5/2 ; 1/2[ ; distracteurs : `a1_power_bounds_forgotten`, `a1_power_radius_inverse`, centre oublié) ; `tf` : « Σ aₖ(x − 3)ᵏ converge en x = 2,8 ⇒ elle converge en x = 3,1 » (vrai) ; « Le rayon de Σ (3x)ᵏ vaut 3 » (faux, 1/3) ; « aₖ ≠ 0 et |aₖ₊₁/aₖ| → 0 ⇒ Σ aₖxᵏ converge pour tout x » (vrai) ; « Σ_{k≥100} xᵏ/k! converge pour tout x » (vrai).
- **Pièges** : `a1_power_bounds_forgotten`, `a1_power_radius_inverse`, `a1_power_center_sign`
- **Sous-buts → crédit** : ρ → `a1-ser-ratio-root` ; bornes → `a1-ser-leibniz-abs`, `a1-ser-compare` ; domaine → `a1-pow-domain`.

### `a1-pow-sums` — Dériver une série entière ; sommes par MacLaurin
- **Année** 13 · **Prérequis** `a1-pow-domain`, `a1-dl-usual`, `g5-reindex` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-pow-domain` : dériver terme à terme à l'intérieur du domaine.
- **Intro** : à l'intérieur du domaine, on dérive et on intègre terme à terme (même rayon). Pour **sommer** une série numérique, on la reconnaît comme une série de MacLaurin en un point : `Σ xⁿ/n! = eˣ`, `Σ xⁿ = 1/(1 − x)`, `Σ (−1)ⁿx²ⁿ⁺¹/(2n + 1)! = sin x`… On change d'indice pour retrouver la forme exacte.
- **Juge** : `definite` `{value, sums:true}` (convention 3) pour les lignes avec Σ ; `equiv` pour les fonctions sommes · **Forme finale** : valeur exacte (en e, π, Log…), ou fonction somme avec son domaine.
- **Niveaux** :
  - L1 (guidé) : la série de référence est indiquée, trous dans le changement d'indice.
  - L2 : l'élève découpe la somme ; la référence est donnée.
  - L3 (choisir l'action) : « séparer la somme », « changer d'indice », « reconnaître eˣ / 1/(1 − x) / sin », « dériver terme à terme », « évaluer ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen.
- **Générateur** : gabarits (a) `Σ_{k≥k₀} (aᵏ + p·k)/(k − j)!` (a ∈ {2, 3}, j ∈ {0, 1}) ; (b) `Σ_{n≥2} tⁿ` puis f′(1/2) ; (c) `1/2! − 1/3! + 1/4! − …` → e^(−1) ; (d) `Σ n·xⁿ` = x/(1 − x)² ; (e) série de Taylor de `c/(a + bx)` autour de x₀ avec son domaine (2019). Contraintes : réponse en e^a, Log, ou rationnelle.
- **Corrigé type** : `Σ_{k≥1} (2ᵏ + k)/k!`.
  1. `= Σ_{k≥1} 2ᵏ/k! + Σ_{k≥1} k/k!` — *séparer (deux séries convergentes)*
  2. `Σ_{k≥1} 2ᵏ/k! = e² − 1` — *reconnaître e² sans le terme k = 0*
  3. `Σ_{k≥1} k/k! = Σ_{k≥1} 1/(k − 1)! = Σ_{j≥0} 1/j! = e` — *changer d'indice* (crédit `g5-reindex`)
  4. `= e² + e − 1` — *conclure*
- **Aides** : 1 « Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ. » · 2 `k/k! = 1/▢` · 3 `e² − 1 + e`.
- **Variantes d'examen** : `mcq` (examen MT 2014 : Σ_{k≥2} (3ᵏ − 2k)/(k − 1)! = 3e³ − 4e − 1 ; examen 2022 : f(t) = Σ_{n≥2} tⁿ, f′(1/2) = 3 ; distracteurs : `a1_pow_sum_index_shift`, `a1_geo_sum_start`) ; `tf` : « La série de Taylor de 4/(2 + 3x) en 2 converge sur ]−2/3 ; 14/3[ » (vrai).
- **Pièges** : `a1_pow_sum_index_shift`, `a1_geo_sum_start`
- **Sous-buts → crédit** : changement d'indice → `g5-reindex` ; série de référence → `a1-dl-usual` ; somme → `a1-pow-sums`.

**— Intégrales —**

### `a1-int-direct` — Primitives immédiates : u′/u, u′·uʳ, u′/(1 + u²), u′·eᵘ
- **Année** 13 · **Prérequis** `g6-antideriv-usual`, `a1-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : avant toute méthode, on cherche une dérivée cachée : `∫ u′/u = Log|u|`, `∫ u′·uʳ = uʳ⁺¹/(r + 1)` (r ≠ −1), `∫ u′/(1 + u²) = Arctg u`, `∫ u′·eᵘ = eᵘ`, `∫ u′/√(1 − u²) = Arcsin u`. Il manque souvent une constante : on l'ajuste.
- **Juge** : décision (convention 4) puis `antideriv` `{v:'x', f}` ; pour une intégrale définie, `definite` `{value}` · **Forme finale** : primitive sans ∫ avec `+ C`, ou valeur exacte.
- **Niveaux** :
  - L1 (guidé) : décision prise (« forme u′/(1 + u²) avec u = x² »), trou dans la constante.
  - L2 : l'élève choisit la forme parmi 2 ; trou dans u.
  - L3 (choisir l'action) : décision parmi 4 (ci-dessous), puis la ligne.
  - L4 (libre) : ligne directe.
  - L5 (seul) : 4 intégrales mélangées (immédiates et non immédiates) : décider lesquelles sont immédiates, puis calculer.
- **Décision** (gabarit u′/(1 + u²)) : `{id:'direct', label:'Forme u′/(1 + u²) avec u = x²', valid:true, quality:'good'}` ; `{id:'des', label:'DES de x/(1 + x⁴) sur ℝ', valid:true, quality:'poor', why:'Juste, mais 1 + x⁴ = (x² + √2x + 1)(x² − √2x + 1) : quatre éléments simples avec des √2, pour retrouver le même Arctg.'}` ; `{id:'parts', label:'Parties avec u = x', valid:false, why:'Il faudrait une primitive de 1/(1 + x⁴), plus difficile que l\'intégrale de départ.'}` ; `{id:'log', label:'Log(1 + x⁴)', valid:false, rule:'a1_int_arctg_as_log'}`.
- **Générateur** : on part de la primitive F = c·G(u(x)) avec G ∈ {Log|·|, puissance r ∈ {−2, −1/2, 1/2, 3/2, 2}, Arctg, exp, Arcsin} et u parmi `x² + a`, `sin x`, `Log x`, `eˣ`, `x³` ; f = F′ simplifiée. Deux gabarits : primitive ; intégrale définie (bornes où u est simple : 0, 1, π/2, e). Contraintes : c rationnel de dénominateur ≤ 6.
- **Corrigé type** : `∫ x/(1 + x⁴) dx`.
  1. Décision : *forme u′/(1 + u²), u = x², u′ = 2x*
  2. `= (1/2)∫ 2x/(1 + (x²)²) dx` — *ajuster la constante*
  3. `= (1/2)·Arctg(x²) + C` — *primitive*
- **Aides** : 1 « x⁴ = (x²)² et 2x est la dérivée de x². » · 2 `= (1/2)·Arctg(▢) + C` · 3 `= (1/2)Arctg(x²) + C`.
- **Variantes d'examen** : `mcq` (examen 2022 : ∫₀^(π/2) e^(sin x)·cos x dx = e − 1 ; 2021 : ∫₀¹ x√(x² + 1) dx = (2√2 − 1)/3 ; 2019 : ∫ de 0⁺ à π/6 de cos x/√(sin x) = √2 ; distracteurs : `a1_int_arctg_as_log`, `a1_int_missing_inner_factor`, `g6_antideriv_power_minus_one`) ; `tf` : « Toute fonction dérivable sur un intervalle a une primitive sur cet intervalle » (vrai).
- **Pièges** : `a1_int_arctg_as_log`, `a1_int_missing_inner_factor`, `g6_antideriv_power_minus_one`, `a1_int_no_constant`
- **Sous-buts → crédit** : reconnaître u′ → `a1-deriv-rules` ; primitive → `g6-antideriv-usual`.

### `a1-int-subst` — Changement de variable : choisir φ, changer dx et les bornes
- **Année** 13 · **Prérequis** `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : on pose t = φ⁻¹(x) (ou x = φ(t), φ bijective) ; on remplace **dx** (dx = φ′(t) dt) et, pour une intégrale définie, **les bornes**. La difficulté est de **choisir** φ : racine → t = √(…) ; Log x et 1/x → t = Log x ; √(1 − x²) → x = sin t ; √(1 + x²) → x = sinh t.
- **Juge** : décision avec saisie `then:{ask:'t =', judge:'equiv'}` (rangée dans `state`) ; ligne « dx = … » par `equiv` ; lignes en t par `definite` (même valeur) ou `antideriv` (dérivée par rapport à x après retour) ; bornes par `value` · **Forme finale** : valeur exacte, ou primitive en x avec `+ C`.
- **Niveaux** :
  - L1 (guidé) : t donné, trous dans dx et dans les bornes.
  - L2 : l'élève choisit t parmi 2 ; dx et bornes à trous.
  - L3 (choisir l'action) : décision parmi 4, puis « exprimer dx », « changer les bornes », « intégrer », « revenir à x » (pour une primitive).
  - L4 (libre) : lignes libres.
  - L5 (seul) : intégrale définie d'examen.
- **Décision** : `{id:'sqrt', label:'t = √x', valid:true, quality:'good', then:{ask:'t =', judge:'equiv', expect:'√x'}}` ; `{id:'x-t2', label:'x = t²', valid:true, quality:'good'}` (même changement) ; `{id:'parts', label:'Parties avec u = 1/(1 + √x)', valid:true, quality:'poor', why:'Juste, mais u′ contient encore √x : l\'intégrale obtenue n\'est pas plus simple.'}` ; `{id:'log', label:'Primitive 2·Log(1 + √x) sans changer dx', valid:false, rule:'a1_subst_dx_kept'}`.
- **Générateur** : on part de l'intégrale simple en t (`∫ 2/(1 + t)`, `∫ 2/(1 + t²)`, `∫ t² dt`) et de φ ; on reconstruit l'intégrale en x et on choisit des bornes où t est entier (x ∈ {1, 4, 9}, {1, 3} pour √3). Gabarits : `1/(√x(1 + √x))`, `1/(√x(1 + x))` (Arctg), `Log x/(x√(Log²x + 1))`, `x/√(1 + x)` (primitive). Contraintes : valeur en Log de rationnels ou multiple rationnel de π.
- **Corrigé type** : `∫₁⁴ dx/(√x·(1 + √x))`.
  1. Décision : *t = √x*, donc `x = t²`
  2. `dx = 2t dt` — *exprimer dx*
  3. x = 1 → t = 1, x = 4 → t = 2 — *changer les bornes*
  4. `= ∫₁² 2t/(t(1 + t)) dt = ∫₁² 2/(1 + t) dt` — *intégrale en t*
  5. `= 2[Log(1 + t)]₁² = 2 Log(3/2)` — *intégrer et évaluer*
- **Aides** : 1 « Pose t = √x ; n'oublie ni dx ni les bornes. » · 2 `dx = ▢ dt ; t va de ▢ à ▢` · 3 `∫₁² 2/(1 + t) dt`.
- **Variantes d'examen** : `mcq` (examen 2019 : ∫₁³ dx/(√x(1 + x)) = 2(Arctg √3 − π/4) ; 2018 : ∫₁^(e³) Log x/(x√(Log²x + 1)) dx = √10 − 1 ; distracteurs : `a1_subst_dx_kept`, `a1_subst_bounds_kept`) ; `tf` : « Avec t = x², ∫₋₁¹ x² dx = ∫₁¹ (√t/2) dt = 0 » (faux : t = x² n'est pas bijective sur [−1 ; 1] ; l'intégrale vaut 2/3).
- **Pièges** : `a1_subst_dx_kept`, `a1_subst_bounds_kept`, `a1_int_no_constant`
- **Sous-buts → crédit** : choisir φ → `a1-int-subst` ; intégrer en t → `a1-int-direct`.

### `a1-int-parts` — Intégration par parties
- **Année** 13 · **Prérequis** `a1-int-direct` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : `∫ u·v′ = u·v − ∫ u′·v`. On dérive ce qui se simplifie (polynôme, Log, Arctg) et on intègre ce qui reste stable (eᵃˣ, sin, cos). Avec eˣ·sin x, deux parties font revenir l'intégrale de départ : on la résout comme une équation.
- **Juge** : décision `{then:{ask:'u =', judge:'equiv'}}` ; `antideriv` `{v:'x', f}` (une ligne peut contenir des ∫ restantes) ; `definite` pour les bornes · **Forme finale** : primitive sans ∫ avec `+ C`, ou valeur.
- **Niveaux** :
  - L1 (guidé) : u, v′ donnés ; trous dans u′ et v.
  - L2 : l'élève choisit u parmi 2 ; formule à trous.
  - L3 (choisir l'action) : décision parmi 4, puis « dériver u, intégrer v′ », « appliquer la formule », « deuxième IPP », « résoudre en I ».
  - L4 (libre) : lignes libres ; la décision peut être sautée.
  - L5 (seul) : intégrale définie d'examen (4 points avec une limite).
- **Décision** : `{id:'u-poly', label:'u = x², v′ = e^(2x)', valid:true, quality:'good'}` ; `{id:'u-exp', label:'u = e^(2x), v′ = x²', valid:true, quality:'poor', why:'Juste, mais le degré du polynôme monte (x³/3, puis x⁴/12…) : l\'intégrale devient plus difficile.'}` ; `{id:'subst', label:'Substitution t = x²', valid:false, why:'Aucun facteur n\'est la dérivée de l\'autre à une constante près.'}` ; `{id:'split', label:'∫x² · ∫e^(2x)', valid:false, rule:'a1_int_product'}`.
- **Générateur** : on part de F = P(x)·eᵃˣ + C (P de degré 1 ou 2), F = P(x)·sin(ax), F = xⁿ⁺¹·(Log x)/(n + 1) − …, F = (x²/2 + 1/2)·Arctg x − x/2, F = eᵃˣ(α sin bx + β cos bx) ; f = F′ simplifiée. Gabarits : primitive ; définie (bornes 0, 1, π, −1). Contraintes : a ∈ {1, 2, −1}, coefficients de dénominateur ≤ 8.
- **Corrigé type** : `∫ x²·e^(2x) dx`.
  1. Décision : *u = x², v′ = e^(2x)* — *choisir la méthode*
  2. `u′ = 2x`, `v = e^(2x)/2` — *dériver u, intégrer v′*
  3. `= x²e^(2x)/2 − ∫ x·e^(2x) dx` — *appliquer la formule*
  4. `= x²e^(2x)/2 − (x·e^(2x)/2 − ∫ e^(2x)/2 dx)` — *deuxième IPP*
  5. `= e^(2x)·(2x² − 2x + 1)/4 + C` — *finir et réduire*
- **Aides** : 1 « Dérive le polynôme, intègre l'exponentielle. Deux fois. » · 2 `= x²e^(2x)/2 − ∫ ▢ dx` · 3 la ligne 4.
- **Variantes d'examen** : `mcq` (examen 2021 : ∫_{−π}^{π} x sin x dx = 2π ; 2020 : ∫₁² x Log(1 + x) dx ; 2018 : ∫₀¹ x·Arctg x dx = π/4 − 1/2 ; distracteurs : `a1_ibp_sign`, `a1_ibp_plus`, `a1_int_product`) ; `tf` : « ∫ₐᵇ f·g′ = −∫ₐᵇ f′·g pour f, g ∈ C¹ » (faux, il manque [f·g]ₐᵇ ; contre-exemple f = g = x sur [0 ; 1]) ; `open` (2 points : ∫_{−1}^{0} (x + 1)²eˣ dx).
- **Pièges** : `a1_ibp_sign`, `a1_ibp_plus`, `a1_int_product`, `a1_ibp_boundary_term`
- **Sous-buts → crédit** : choisir u → `a1-int-parts` ; intégrer v′ → `a1-int-direct`.

### `a1-int-reduction` — Formules de récurrence Iₙ
- **Année** 13 · **Prérequis** `a1-int-parts`, `g5-induction-frame` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : une IPP (parfois deux) exprime Iₙ en fonction de Iₙ₋₁ ou Iₙ₋₂. On calcule I₀ (et I₁), puis on remonte. Exemple : `Jₙ = ∫₀¹ xⁿeˣ dx = e − n·Jₙ₋₁`, J₀ = e − 1.
- **Juge** : décision « IPP avec u = xⁿ » ; la ligne de récurrence (« Iₙ = … Iₙ₋₁ ») est jugée par `definite` avec `{value, param:'n', nRange:[1, 6]}` : l'identité est testée pour n = 1 à 6 par quadrature (extension E4) ; I₀ et les valeurs par `definite` · **Forme finale** : formule de récurrence, I₀, et la valeur Iₖ demandée.
- **Niveaux** :
  - L1 (guidé) : IPP faite, trous dans le coefficient n et le terme de bord.
  - L2 : l'élève fait l'IPP ; I₀ est donné.
  - L3 (choisir l'action) : « IPP avec u = xⁿ », « deuxième IPP », « calculer I₀ », « remonter la récurrence ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : récurrence à deux pas (`∫ xⁿ sin 2x`, Wallis) et une valeur.
- **Générateur** : gabarits (a) `∫₀¹ xⁿe^(ax) dx` (a ∈ {1, −1, 2}) ; (b) `∫ xⁿ sin(bx) dx` (deux IPP, Iₙ en fonction de Iₙ₋₂) ; (c) Wallis `∫₀^(π/2) sinⁿ x dx = ((n − 1)/n)·Iₙ₋₂` ; (d) `∫₁^e (Log x)ⁿ dx = e − n·Iₙ₋₁`. Valeur demandée pour k ∈ [2 ; 4].
- **Corrigé type** : `Jₙ = ∫₀¹ xⁿ·eˣ dx`, calculer J₃.
  1. Décision : *IPP avec u = xⁿ, v′ = eˣ*
  2. `Jₙ = [xⁿeˣ]₀¹ − n∫₀¹ xⁿ⁻¹eˣ dx` — *IPP*
  3. `Jₙ = e − n·Jₙ₋₁` (n ≥ 1) — *récurrence*
  4. `J₀ = e − 1`, `J₁ = 1`, `J₂ = e − 2` — *remonter*
  5. `J₃ = e − 3(e − 2) = 6 − 2e` — *valeur*
- **Aides** : 1 « Une IPP qui fait baisser la puissance de x. » · 2 `Jₙ = [xⁿeˣ]₀¹ − ▢·Jₙ₋₁` · 3 `Jₙ = e − n·Jₙ₋₁`.
- **Variantes d'examen** : `mcq` (valeur J₃ ; distracteurs : `a1_reduction_index`, `a1_ibp_boundary_term`) ; `open` (3 points : récurrence 2, valeur 1).
- **Pièges** : `a1_reduction_index`, `a1_ibp_boundary_term`, `a1_ibp_sign`
- **Sous-buts → crédit** : IPP → `a1-int-parts` ; remonter → `g5-induction-frame`.

### `a1-int-rational` — Fractions rationnelles : DES, y compris avec un facteur irréductible
- **Année** 13 · **Prérequis** `g0-pfd-general`, `a1-int-direct`, `g0-long-div` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-int-direct` : primitives Log et Arctg des éléments simples.
- **Intro** : (1) si deg P ≥ deg Q, division euclidienne ; (2) factoriser Q sur ℝ ; (3) DES : `A/(x − a)`, `B/(x − a)²`, `(Cx + D)/(x² + px + q)` avec Δ < 0 ; (4) intégrer : Log pour les premiers, et pour le facteur irréductible on sépare `Cx + D = (C/2)(2x + p) + E`, ce qui donne un Log et un Arctg après avoir complété le carré.
- **Juge** : décision ; `equiv` pour la factorisation et la DES (identité de fractions) ; `antideriv` `{v:'x', f}` ou `definite` · **Forme finale** : primitive avec `+ C` (Log et Arctg), ou valeur exacte.
- **Niveaux** :
  - L1 (guidé) : factorisation et forme de la DES données ; trous dans les coefficients.
  - L2 : l'élève choisit la forme de la DES parmi 3 (une sans le terme en x au numérateur).
  - L3 (choisir l'action) : décision parmi 4, puis « factoriser Q », « écrire la forme de la DES », « trouver A (évaluation) », « identifier », « séparer dérivée + constante », « compléter le carré », « intégrer ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : intégrale généralisée rationnelle (voir `a1-improper-rational`).
- **Décision** : `{id:'des', label:'DES', valid:true, quality:'good'}` ; `{id:'subst-den', label:'t = x² + 2x + 5', valid:false, why:'Le numérateur n\'est pas proportionnel à la dérivée du dénominateur (x − 1)(x² + 2x + 5).'}` ; `{id:'parts', label:'Parties', valid:true, quality:'poor', why:'Juste en principe, mais chaque IPP laisse une fraction rationnelle aussi compliquée.'}` ; `{id:'log-den', label:'Log|dénominateur|', valid:false, rule:'a1_int_log_of_denominator'}`.
- **Générateur** : on part des éléments simples : A/(x − a) + (Bx + C)/(x² + px + q) (Δ < 0, p pair) avec A, B, C entiers ou demi-entiers ; ou A/(x − a) + B/(x − a)² + C/(x − b) ; on développe pour obtenir P/Q. Gabarits : primitive ; définie sur [1 ; 2] (2022 : ∫₁² dx/(x(x² + 3))) ; (x² − 2x + 1)/(x² + 2x + 1) sur [2 ; 3] (division d'abord, 2019). Contraintes : coefficients de la DES de dénominateur ≤ 8, q − p²/4 carré parfait ou 2, 3.
- **Corrigé type** : `∫ (x + 5)/((x − 1)(x² + 2x + 5)) dx`.
  1. Décision : *DES* ; `x² + 2x + 5` est irréductible (Δ = −16) — *choisir la méthode*
  2. `(x + 5)/((x − 1)(x² + 2x + 5)) = A/(x − 1) + (Bx + C)/(x² + 2x + 5)` — *forme de la DES*
  3. `A = 6/8 = 3/4` (évaluer en x = 1), `B = −3/4`, `C = −5/4` — *coefficients* (crédit `g0-pfd-general`)
  4. `= (3/4)·1/(x − 1) − (1/4)·(3x + 5)/(x² + 2x + 5)` — *réécrire*
  5. `3x + 5 = (3/2)(2x + 2) + 2` et `x² + 2x + 5 = (x + 1)² + 4` — *dérivée + constante, compléter le carré*
  6. `= (3/4)Log|x − 1| − (3/8)Log(x² + 2x + 5) − (1/4)Arctg((x + 1)/2) + C` — *intégrer*
- **Aides** : 1 « Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur. » · 2 `A = ▢ ; 3x + 5 = (3/2)(2x + 2) + ▢` · 3 la ligne 6.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_des_wrong_form`, `a1_int_arctg_as_log`, `a1_arctg_scale`) ; `open` (voir `a1-improper-rational`).
- **Pièges** : `a1_des_wrong_form`, `a1_int_arctg_as_log`, `a1_arctg_scale`, `a1_int_log_of_denominator`
- **Sous-buts → crédit** : division → `g0-long-div` ; DES → `g0-pfd-general` ; intégrer → `a1-int-rational`.

### `a1-int-trig` — Fractions rationnelles en sin et cos : Bioche et t = tan(x/2)
- **Année** 13 · **Prérequis** `a1-int-rational`, `a1-int-subst`, `g3-bioche` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-int-subst` : changer dx et les bornes avec t.
- **Intro** : règles de Bioche : si l'intégrande·dx est invariant par x → −x, poser t = cos x ; par x → π − x, t = sin x ; par x → π + x, t = tan x. Sinon, t = tan(x/2) marche toujours : `sin x = 2t/(1 + t²)`, `cos x = (1 − t²)/(1 + t²)`, `dx = 2 dt/(1 + t²)`, mais le calcul est plus long. Pour sin², cos² seuls : linéariser.
- **Juge** : décision ; `antideriv` `{v:'x', f}` (le retour en x est vérifié par dérivation) ; `definite` si bornes · **Forme finale** : primitive en x avec `+ C`, ou valeur.
- **Niveaux** :
  - L1 (guidé) : t donné, trous dans dt et dans la fraction en t.
  - L2 : l'élève teste l'invariance (x → −x) parmi 3 transformations.
  - L3 (choisir l'action) : décision parmi 4, puis « exprimer en t », « DES ou forme immédiate », « revenir en x ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : intégrale du CMS (type ∫ (1 + cos x)/(sin x − ⅕sin³x) dx) sans aide.
- **Décision** (gabarit invariant par x → −x) : `{id:'bioche-cos', label:'t = cos x', valid:true, quality:'good'}` ; `{id:'tan-half', label:'t = tan(x/2)', valid:true, quality:'poor', why:'Juste, mais on obtient une fraction de degré 6 en t ; Bioche donnait une fraction de degré 2.'}` ; `{id:'lin', label:'Linéariser sin³x', valid:true, quality:'poor', why:'Juste pour le numérateur, mais le dénominateur 1 + cos²x reste.'}` ; `{id:'parts', label:'Parties', valid:false, why:'Aucun facteur simple à dériver.'}`.
- **Générateur** : gabarits (a) Bioche cos : `sinᵐx·R(cos x)` avec m impair, R = 1/(a + cos²x) ou 1/(a + cos x) ; (b) `1/(a + b cos x)` (a > |b|) par t = tan(x/2) → Arctg ; (c) `1/(sin x)` → Log|tan(x/2)| ; (d) cos²x, sin²x·cos²x (linéariser). a ∈ {1, 2, 3}, b ∈ {1, 2}.
- **Corrigé type** : `∫ sin³x/(1 + cos²x) dx`.
  1. Décision : invariant par x → −x : *t = cos x*, `dt = −sin x dx`
  2. `= ∫ −(1 − t²)/(1 + t²) dt` — *exprimer en t* (sin²x = 1 − t²)
  3. `= ∫ (1 − 2/(1 + t²)) dt` — *diviser*
  4. `= t − 2 Arctg t + C` — *intégrer*
  5. `= cos x − 2 Arctg(cos x) + C` — *revenir en x*
- **Aides** : 1 « Teste x → −x : sin³x dx ne change pas. Pose t = cos x. » · 2 `sin³x dx = −(1 − ▢)dt` · 3 `∫ (t² − 1)/(t² + 1) dt = t − 2Arctg t`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_trig_subst_dx`, `a1_subst_dx_kept`, `a1_int_arctg_as_log`) ; `open` (4 points).
- **Pièges** : `a1_trig_subst_dx`, `a1_subst_dx_kept`
- **Sous-buts → crédit** : Bioche → `g3-bioche` ; fraction en t → `a1-int-rational`.

### `a1-int-hyper` — sinh et cosh dans les intégrales
- **Année** 13 · **Prérequis** `a1-int-subst`, `g2-hyp-formulas` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : `cosh² − sinh² = 1`. √(x² + a²) → x = a·sinh t ; √(x² − a²) → x = a·cosh t (t ≥ 0). `Argsh x = Log(x + √(x² + 1))`. Avec eˣ partout, poser t = eˣ ramène à une fraction rationnelle.
- **Juge** : décision ; `antideriv` `{v:'x', f}` ; `definite` · **Forme finale** : primitive en x (Argsh ou Log acceptés, comparés par dérivation), ou valeur.
- **Niveaux** :
  - L1 (guidé) : changement x = 2 sinh t donné, trous dans dx et dans la racine.
  - L2 : l'élève choisit entre sinh et cosh.
  - L3 (choisir l'action) : décision parmi 4, puis « dx = … », « simplifier la racine (cosh² − sinh² = 1) », « intégrer », « revenir en x (Argsh) ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : intégrale généralisée avec cosh (convergence, puis valeur par t = eˣ).
- **Décision** : `{id:'sinh', label:'x = 2 sinh t', valid:true, quality:'good'}` ; `{id:'tan', label:'x = 2 tan t', valid:true, quality:'poor', why:'Juste, mais on arrive à ∫ dt/cos t, qui demande encore une substitution.'}` ; `{id:'cosh', label:'x = 2 cosh t', valid:false, why:'cosh t ≥ 1 : x ne parcourt pas ℝ, et √(x² + 4) ne se simplifie pas.'}` ; `{id:'log', label:'Log(x² + 4)', valid:false, rule:'a1_int_log_of_denominator'}`.
- **Générateur** : gabarits (a) `1/√(x² + a²)`, `√(x² + a²)` ; (b) `1/√(x² − a²)` sur ]a ; +∞[ ; (c) `eˣ/(e^(2x) − 1)` sur [1 ; +∞[ (2018) ; (d) `cosh²x`, `sinh x·cosh²x` sur [0 ; Log 2] (valeurs en rationnels + Log 2) ; (e) `1/(2 + cosh x)` (convergence seulement). a ∈ {1, 2, 3}.
- **Corrigé type** : `∫ dx/√(x² + 4)`.
  1. Décision : *x = 2 sinh t* — *choisir*
  2. `dx = 2 cosh t dt` — *exprimer dx*
  3. `√(4 sinh²t + 4) = 2 cosh t` — *cosh² − sinh² = 1* (crédit `g2-hyp-formulas`)
  4. `= ∫ dt = t + C` — *intégrer*
  5. `= Argsh(x/2) + C = Log(x + √(x² + 4)) + C′` — *revenir en x*
- **Aides** : 1 « √(x² + 4) : pense à 4 sinh²t + 4 = 4 cosh²t. » · 2 `dx = ▢ dt` · 3 `∫ 2cosh t/(2cosh t) dt = t`.
- **Variantes d'examen** : `mcq` (examen 2018 : ∫₁^∞ eˣ/(e^(2x) − 1) dx = ½·Log((e + 1)/(e − 1)) ; distracteurs : `a1_hyper_identity_sign`, `a1_subst_bounds_kept`) ; `tf` : « ∫₀^∞ dx/(2 + cosh x) converge » (vrai : 1/(2 + cosh x) ≤ 2e^(−x)).
- **Pièges** : `a1_hyper_identity_sign`, `a1_subst_dx_kept`
- **Sous-buts → crédit** : identité hyperbolique → `g2-hyp-formulas` ; substitution → `a1-int-subst`.

### `a1-int-estimate` — Encadrer une intégrale ; parité et moyenne
- **Année** 13 · **Prérequis** `a1-int-direct`, `a1-fn-image` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-int-direct` : calculer l'intégrale de comparaison.
- **Intro** : si m ≤ f ≤ M sur [a ; b], alors `m(b − a) ≤ ∫ₐᵇ f ≤ M(b − a)` (théorème de la moyenne : la valeur moyenne est atteinte si f est continue). Si f est impaire, `∫₋ₐᵃ f = 0` ; si elle est paire, `∫₋ₐᵃ f = 2∫₀ᵃ f`. Pas besoin de primitive : e^(x²) n'en a pas d'élémentaire.
- **Juge** : `solset` pour l'image de f sur [a ; b] ; `definite` `{value}` pour les bornes m(b − a), M(b − a) ; `mcq` pour l'encadrement final · **Forme finale** : encadrement juste, ou valeur par symétrie.
- **Niveaux** :
  - L1 (guidé) : m et M donnés, trous dans les produits.
  - L2 : l'élève trouve m et M (fonction monotone).
  - L3 (choisir l'action) : « min et max de f sur [a ; b] », « multiplier par b − a », « parité », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen.
- **Générateur** : gabarits (a) `∫₀^b e^(x²)` ou `∫₀^b e^(−x²)`, b ∈ {1, 2} ; (b) `∫₀¹ dx/(1 + c·xᵖ)` ; (c) parité : `∫₋ₐᵃ x²·sin(x³)`, `∫₋π^π sin(x¹³)` ; (d) `∫ₐᵇ f` pour f bijective continue avec f(0) = 0 (vrai/faux).
- **Corrigé type** : encadrer `I = ∫₀¹ dx/(1 + 2x³)`.
  1. Sur [0 ; 1], `1 ≤ 1 + 2x³ ≤ 3` — *encadrer le dénominateur*
  2. `1/3 ≤ 1/(1 + 2x³) ≤ 1` — *encadrer f*
  3. `1/3 ≤ I ≤ 1` — *intégrer l'encadrement* ; strict car f n'est pas constante
- **Aides** : 1 « Pas de primitive simple : encadre f par ses valeurs extrêmes sur [0 ; 1]. » · 2 `▢ ≤ f(x) ≤ ▢` · 3 `1/3 ≤ I ≤ 1`.
- **Variantes d'examen** : `mcq` (examen 2020 : ∫₀² e^(x²) dx ; options « 2 ≤ I ≤ 200 », « I ≥ 200 », « I = e^(8/3) − 1 », « 0 ≤ I < 14/3 » ; distracteurs : `a1_int_exp_square_primitive`, `a1_int_product`) ; `tf` : « ∫_{−π}^{π} sin(x¹³) dx = 0 » (vrai) ; « f : [−1 ; 1] → [−1 ; 1] bijective et continue avec f(0) = 0 ⇒ ∫₋₁¹ f = 0 » (faux : f(x) = x pour x ≥ 0 et −√(−x) pour x < 0) ; « aₙ → 1, f continue, bₙ = ∫₀^(aₙ) f ⇒ (bₙ) converge » (vrai).
- **Pièges** : `a1_int_exp_square_primitive`, `a1_parity_misused`
- **Sous-buts → crédit** : min et max → `a1-fn-image` ; encadrement → `a1-int-estimate`.

### `a1-ftc` — Théorème fondamental ; dériver ∫ₐ^(g(x)) f(t) dt
- **Année** 13 · **Prérequis** `a1-deriv-rules` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : si f est continue, `F(x) = ∫ₐˣ f(t) dt` est dérivable et `F′ = f`. Avec des bornes variables : `d/dx ∫_{h(x)}^{g(x)} f(t) dt = f(g(x))·g′(x) − f(h(x))·h′(x)`. La variable d'intégration t est muette.
- **Juge** : `equiv` `{target:'no-prime'}` · **Forme finale** : expression sans ∫ ni ′.
- **Niveaux** :
  - L1 (guidé) : formule rappelée, trous dans f(g(x)) et g′(x).
  - L2 : une borne variable ; l'élève écrit les deux facteurs.
  - L3 (choisir l'action) : « primitive F de f (sans la calculer) », « composer », « règle de chaîne », « borne inférieure variable ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : deux bornes variables, ou limite de type `(1/x²)∫₀ˣ sin(t) dt` (BH + théorème fondamental).
- **Générateur** : f(t) sans primitive élémentaire (`e^(−t²)`, `sin(t)/t`, `Log(1 + t²)`, `√(1 + t⁴)`) ; g(x) parmi `x²`, `x³`, `sin x`, `eˣ` ; h(x) = constante ou x. Gabarits : dérivée ; tangente en un point ; vrai/faux sur g(x) = ∫₀^|x|.
- **Corrigé type** : `G(x) = ∫₁^(x³) Log(1 + t²) dt`.
  1. `G(x) = F(x³) − F(1)` avec `F′ = Log(1 + t²)` — *primitive abstraite*
  2. `G′(x) = F′(x³)·3x²` — *règle de chaîne*
  3. `G′(x) = 3x²·Log(1 + x⁶)` — *substituer*
- **Aides** : 1 « Appelle F une primitive : G(x) = F(x³) − F(1). » · 2 `G′(x) = Log(1 + ▢)·▢` · 3 `3x²·Log(1 + x⁶)`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_ftc_no_chain`, `a1_ftc_integrate_first`) ; `tf` : « g(x) = ∫₀^|x| 1 dt est dérivable en 0 » (faux, g = |x|).
- **Pièges** : `a1_ftc_no_chain`, `a1_ftc_integrate_first`
- **Sous-buts → crédit** : chaîne → `a1-deriv-rules` ; théorème → `a1-ftc`.

**— Intégrales généralisées —**

### `a1-improper-calc` — Intégrale généralisée : calculer par une limite (bornes 0⁺, 1⁻, +∞)
- **Année** 13 · **Prérequis** `a1-int-subst`, `a1-int-parts`, `a1-fn-limits` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-int-parts` : primitives par parties (x·e^(−x), Log x).
- **Intro** : on repère **chaque** point problème (borne infinie, f non bornée en une borne, ou **à l'intérieur**). On écrit `∫ de a⁺ à b = lim_{ε→a⁺} ∫_ε^b`, on calcule l'intégrale propre, puis la limite. Avec deux points problèmes, on coupe en deux et les deux morceaux doivent converger.
- **Juge** : ligne de repérage (`solset` des points problèmes sur [a ; b]) ; `definite` `{value}` pour les lignes avec bornes 0⁺, 1⁻, +∞ (nœud `side`) ; `limit` pour la limite finale · **Forme finale** : valeur exacte, ou « diverge » avec la limite infinie.
- **Niveaux** :
  - L1 (guidé) : point problème signalé, primitive donnée, trous dans la limite.
  - L2 : l'élève signale le point problème ; trous dans la primitive.
  - L3 (choisir l'action) : décision (méthode d'intégration) parmi 4, puis « écrire la limite », « primitive », « évaluer », « passer à la limite ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : QCM d'examen (« converge et vaut … / diverge »).
- **Décision** (gabarit x/√(2 − x)) : `{id:'subst', label:'t = 2 − x', valid:true, quality:'good'}` ; `{id:'subst-sqrt', label:'t = √(2 − x)', valid:true, quality:'good'}` ; `{id:'parts', label:'Parties avec u = x', valid:true, quality:'poor', why:'Juste : u = x, v = −2√(2 − x), mais il faut une deuxième primitive ; la substitution évite ce détour.'}` ; `{id:'ignore', label:'Primitive puis évaluer en 2 directement', valid:false, rule:'a1_improper_singularity_ignored'}`.
- **Générateur** : gabarits (a) `(px + q)/√(b − x)` sur [a ; b⁻[ ; (b) `Log x`, `x·Log x` sur ]0⁺ ; 1] ; (c) `(x^(3/2) + c)/x³` sur [1 ; +∞[ ; (d) `1/(1 − x)` sur [0 ; 1⁻[ (diverge) ; (e) `cos x/√(sin x)` sur ]0⁺ ; π/6] ; (f) piège `∫₋₁¹ dx/x²` (singularité intérieure). Contraintes : valeur rationnelle ou rationnelle + √2.
- **Corrigé type** : `∫ de 1 à 2⁻ de x/√(2 − x) dx`.
  1. Seul problème : x → 2⁻ (f non bornée) — *repérer*
  2. Décision : *t = 2 − x*, `dx = −dt` ; x = 1 → t = 1, x → 2⁻ → t → 0⁺ — *changer de variable et de bornes*
  3. `= ∫ de 0⁺ à 1 de (2 − t)/√t dt` — *intégrale en t*
  4. `= lim_{ε→0⁺} [4√t − (2/3)t^(3/2)]_ε^1` — *primitive et limite*
  5. `= 4 − 2/3 = 10/3` — *valeur* ; l'intégrale converge
- **Aides** : 1 « Le problème est en 2 : pose t = 2 − x, la borne devient 0⁺. » · 2 `∫ de 0⁺ à 1 de (2 − t)·t^(▢) dt` · 3 `[4√t − (2/3)t^(3/2)] de 0 à 1 = 10/3`.
- **Variantes d'examen** : `mcq` (examen 2021 : ∫ de 1 à 2⁻ de (x + 1)/√(2 − x) dx = 16/3 ; 2022 : ∫ de 0 à 1⁻ de dx/(1 − x) diverge ; 2020 : ∫₁^∞ (x^(3/2) + 3)/x³ dx = 7/2 ; distracteurs : `a1_improper_singularity_ignored`, `a1_improper_undefined_means_diverge`, `a1_subst_bounds_kept`) ; `tf` : « Si f est continue sur ]a ; b[, ∫ₐᵇ f converge » (faux, 1/x sur ]0 ; 1[).
- **Pièges** : `a1_improper_singularity_ignored`, `a1_improper_undefined_means_diverge`, `a1_subst_bounds_kept`
- **Sous-buts → crédit** : repérer → `a1-improper-calc` ; primitive → `a1-int-subst` ; limite → `a1-fn-limits`.

### `a1-improper-compare` — Convergence d'une intégrale généralisée par comparaison, sans la calculer
- **Année** 13 · **Prérequis** `a1-improper-calc`, `a1-ser-compare` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 2
- **Intro** : références : `∫ de 0⁺ à 1 de dx/xᵅ` converge ⇔ **α < 1** ; `∫₁^∞ dx/xᵅ` converge ⇔ **α > 1**. Pour f ≥ 0, si `f(x)/g(x) → L ∈ ]0 ; +∞[` au point problème, même nature. On traite chaque point problème séparément (couper l'intervalle). Ne pas confondre avec les séries : f peut ne pas tendre vers 0 et ∫ converger quand même.
- **Juge** : ligne de repérage (`solset`) ; décision « g = 1/(x − a)ᵅ » par point problème (saisie jugée par `limit` du quotient) ; verdict + critère (convention 5) · **Forme finale** : verdict global et α de chaque comparaison.
- **Niveaux** :
  - L1 (guidé) : points problèmes signalés, g donnée, trou dans α et dans le verdict.
  - L2 : l'élève choisit g parmi 3 ; le verdict est à choisir.
  - L3 (choisir l'action) : « repérer les points problèmes », « couper l'intervalle », « factoriser au point problème », « comparer à 1/(x − a)ᵅ », « conclure ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : intégrale à deux points problèmes, ou vrai/faux.
- **Générateur** : gabarits (a) `1/√((x − a)(b − x))` sur ]a⁺ ; b⁻[ (converge, valeur π) ; (b) `1/(√(x − a)·(x + c))` sur ]a⁺ ; +∞[ (α = 1/2 et 3/2) ; (c) `1/(x·Log x)` sur [e ; +∞[ (diverge, critère par primitive) ; (d) `sin(x)/x²` sur [1 ; +∞[ (convergence absolue) ; (e) `xᵖ·e^(−x)` ; (f) `1/(2 + cosh x)`. a, c ∈ [1 ; 4].
- **Corrigé type** : `∫ de 1⁺ à +∞ de dx/(√(x − 1)·(x + 2))`.
  1. Deux points problèmes : 1⁺ et +∞ ; on coupe en 2 — *repérer et couper*
  2. En 1⁺ : `f(x)·√(x − 1) → 1/3` ; α = 1/2 < 1 : converge — *comparer en 1⁺*
  3. En +∞ : `f(x)·x^(3/2) → 1` ; α = 3/2 > 1 : converge — *comparer en +∞*
  4. Les deux morceaux convergent : l'intégrale converge — *conclure*
  5. (L5) Valeur : t = √(x − 1) donne `∫₀^∞ 2/(t² + 3) dt = π/√3` — *bonus*
- **Aides** : 1 « Deux problèmes : près de 1 et à l'infini. Compare à 1/(x − 1)ᵅ puis à 1/xᵅ. » · 2 `en 1⁺, α = ▢ ; en +∞, α = ▢` · 3 « α = 1/2 < 1 et α = 3/2 > 1 : converge. »
- **Variantes d'examen** : `mcq` (distracteurs : `a1_alpha_criteria_swapped`, `a1_improper_one_end_only`, `a1_compare_wrong_direction`) ; `tf` : « Si lim_{x→+∞} f(x) = 0, alors ∫ₐ^∞ f converge » (faux, f = 1/x) ; « f ≥ 0 continue et ∫₁^∞ f converge ⇒ f(x) → 0 » (faux : pics de hauteur 1 et de largeur 1/n² en chaque entier n) ; « ∫₀^∞ dx/(2 + cosh x) converge » (vrai) ; `open` (2 points, partie (a) de `a1-improper-rational`).
- **Pièges** : `a1_alpha_criteria_swapped`, `a1_improper_lim_zero_converges`, `a1_improper_one_end_only`, `a1_compare_wrong_direction`
- **Sous-buts → crédit** : comparaison → `a1-ser-compare` ; repérage → `a1-improper-calc` ; verdict → `a1-improper-compare`.

### `a1-improper-rational` — Intégrale généralisée d'une fraction rationnelle (problème long)
- **Année** 13 · **Prérequis** `a1-int-rational`, `a1-improper-compare`, `g0-horner` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : c'est le problème de 12 points de l'examen MT. (a) Convergence : `deg Q − deg P ≥ 2` ⇒ converge en +∞ (comparaison à 1/x²), et Q sans racine sur [a ; +∞[. (b) Valeur : DES, primitives (Log et Arctg), puis **regrouper les Log avant la limite** : `−2Log(x + 1) + Log(x² + 2x + 2) = Log((x² + 2x + 2)/(x + 1)²) → 0`.
- **Juge** : type `problem` ; parties : (a) verdict + critère (convention 5) ; (b) `equiv` pour la factorisation et la DES, `antideriv` pour la primitive, `limit` pour la limite en +∞ (une ligne « Log(…) − Log(…) → » doit regrouper : `stay` si la ligne écrit ∞ − ∞), `definite` pour la valeur · **Forme finale** : verdict justifié et valeur exacte.
- **Niveaux** :
  - L1 (guidé) : factorisation donnée ; DES à trous ; limite guidée.
  - L2 : l'élève trouve la racine de Q (Horner) ; DES et primitive à trous.
  - L3 (choisir l'action) : « critère de convergence », « racine de Q », « DES », « séparer dérivée + constante », « regrouper les Log », « limite en +∞ », « évaluer en a ».
  - L4 (libre) : parties libres, aides disponibles, `followError`.
  - L5 (seul) : problème entier (12 points), `noHints`, sauvegarde.
- **Générateur** : on part de la DES : `A/(x + r) + (Bx + C)/(x² + 2rx + s)` avec r ∈ {1, 2}, s − r² ∈ {1, 2, 4} (facteur irréductible), A entier non nul, **B = −A** (le coefficient de x² du numérateur, A + B, est nul : l'intégrande est en 1/x² et converge), C entier tel que C + A·r ≠ 0 (c'est le coefficient de l'Arctg, puisque −Ax + C = (−A/2)(2x + 2r) + (C + Ar)) ; borne a ∈ {0, 1}. On développe pour obtenir P/Q (Q de degré 3 à coefficients entiers, P de degré 1). On rejette les tirages identiques à l'examen (7x − 2)/(x³ + 3x² + 5x + 3).
- **Corrigé type** : `∫₁^∞ (4x + 2)/(x³ + 3x² + 4x + 2) dx`.
  1. (a) `f(x) ~ 4/x²` en +∞, α = 2 > 1 ; Q > 0 sur [1 ; +∞[ : converge — *convergence*
  2. (b) `Q(−1) = 0`, `Q = (x + 1)(x² + 2x + 2)` — *factoriser* (crédit `g0-horner`)
  3. `f = −2/(x + 1) + (2x + 6)/(x² + 2x + 2)` — *DES* (crédit `g0-pfd-general`)
  4. `(2x + 6) = (2x + 2) + 4` et `x² + 2x + 2 = (x + 1)² + 1` — *dérivée + constante*
  5. Primitive : `−2Log(x + 1) + Log(x² + 2x + 2) + 4 Arctg(x + 1)` — *intégrer* (crédit `a1-int-rational`)
  6. `= Log((x² + 2x + 2)/(x + 1)²) + 4 Arctg(x + 1)` — *regrouper les Log*
  7. En +∞ : `Log(1) + 4·π/2 = 2π` — *limite*
  8. En 1 : `Log(5/4) + 4 Arctg 2` — *évaluer*
  9. Valeur : `2π − Log(5/4) − 4 Arctg 2 = 2π + Log(4/5) − 4 Arctg 2` (≈ 1,632) — *conclure*
- **Aides** : désactivées en L5 ; ailleurs : 1 « −1 est racine du dénominateur. » · 2 « Regroupe −2Log(x + 1) + Log(x² + 2x + 2) en un seul Log avant de faire tendre x vers +∞. » · 3 la ligne 6.
- **Variantes d'examen** : `open` (12 points : (a) 2 ; (b) factorisation 1, forme de la DES 1, coefficients 2, primitives 2 (Log 1, Arctg 1), regroupement des Log 1, limite en +∞ 2, valeur 1).
- **Pièges** : `a1_des_wrong_form`, `a1_improper_log_split_limit`, `a1_arctg_scale`, `a1_int_arctg_as_log`
- **Sous-buts → crédit** : convergence → `a1-improper-compare` ; factorisation → `g0-horner` ; DES → `g0-pfd-general` ; primitive → `a1-int-rational` ; limite → `a1-fn-limits`.

### `a1-int-applications` — Applications : volumes, longueurs d'arc, aires de révolution
- **Année** 13 · **Prérequis** `a1-int-subst`, `a1-int-hyper` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-int-subst` : changement de variable dans les intégrales de longueur et de volume.
- **Intro** : autour de l'axe Ox, pour y = f(x) sur [a ; b] : volume `V = π∫ₐᵇ f(x)² dx` ; longueur `L = ∫ₐᵇ √(1 + f′(x)²) dx` ; aire de révolution `A = 2π∫ₐᵇ |f(x)|·√(1 + f′(x)²) dx`. Les exercices sont construits pour que la racine se simplifie (cosh, carrés parfaits).
- **Juge** : décision (quelle formule) ; `equiv` pour 1 + f′² simplifié ; `definite` `{value}` · **Forme finale** : valeur exacte (multiple de π, rationnel, Log).
- **Niveaux** :
  - L1 (guidé) : formule donnée, trou dans f′ et dans la simplification.
  - L2 : l'élève choisit la formule parmi 3.
  - L3 (choisir l'action) : « formule du volume / de la longueur / de l'aire », « dériver », « simplifier la racine », « intégrer ».
  - L4 (libre) : lignes libres.
  - L5 (seul) : problème du CMS (aire de révolution de y = sinh²x ou cosh x).
- **Générateur** : gabarits (a) longueur : `cosh x`, `x^(3/2)`, `x²/8 − Log x` (carré parfait) ; (b) volume : `√x`, `sin x` sur [0 ; π], `e^(−x)` sur [0 ; +∞[ ; (c) aire : `cosh x`, `√(r² − x²)` (sphère, 4πr²), `x³` sur [0 ; 1]. Bornes : 0, 1, Log 2, π.
- **Corrigé type** : longueur de y = cosh x sur [0 ; Log 2].
  1. Décision : *L = ∫ √(1 + f′²) dx*
  2. `f′(x) = sinh x`, `1 + sinh²x = cosh²x` — *simplifier la racine*
  3. `L = ∫₀^(Log 2) cosh x dx = sinh(Log 2)` — *intégrer*
  4. `= (2 − 1/2)/2 = 3/4` — *valeur*
- **Aides** : 1 « 1 + sinh² = cosh² : la racine disparaît. » · 2 `L = ∫₀^(Log 2) ▢ dx` · 3 `sinh(Log 2) = 3/4`.
- **Variantes d'examen** : `mcq` (distracteurs : `a1_volume_no_square`, `a1_arc_length_no_sqrt`) ; `open` (4 points).
- **Pièges** : `a1_volume_no_square`, `a1_arc_length_no_sqrt`, `a1_hyper_identity_sign`
- **Sous-buts → crédit** : formule → `a1-int-applications` ; intégrer → `a1-int-hyper`.

**— Définitions et preuves —**

### `a1-defs` — Définitions à écrire : Sup, continuité, dérivabilité, série convergente, suite de Cauchy
- **Année** 13 · **Prérequis** `a1-seq-eps-n-def`, `a1-fn-epsdelta-def`, `a1-c1-def` · **Étiquettes** GM · **Optionnelle** non · **Poids d'examen** 1
- **Pourquoi ces prérequis** : `a1-seq-eps-n-def` : définition ε-N reprise mot à mot ; `a1-fn-epsdelta-def` : définition ε-δ reprise mot à mot ; `a1-c1-def` : définition de C¹(I) reprise mot à mot.
- **Intro** : une définition d'examen se juge mot à mot sur ses conditions : les quantificateurs dans le bon ordre, toutes les hypothèses (domaine, intervalle ouvert), aucune condition en trop. On l'écrit avec les mots du cours.
- **Juge** : type `blocks` (`mode:'define'`) pour les définitions en phrases ; type `tokens` (juge `logic`) pour celles qui sont des formules · **Forme finale** : définition équivalente à celle du cours, sans leurre.
- **Niveaux** :
  - L1 (guidé) : définition à un trou.
  - L2 : deux blocs à choisir parmi 4.
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres.
  - L4 (libre) : formule en jetons ou blocs avec 4 leurres.
  - L5 (seul) : tirage au hasard de 3 définitions, sans aide.
- **Générateur** : cibles et leurres :
  - `s = Sup A` : « s majore A » et « ∀ε > 0 ∃x ∈ A : x > s − ε » ; leurres « s ∈ A », « s = max A » (`a1_sup_in_set`).
  - « f continue en x₀ » : `∀ε > 0 ∃δ > 0 ∀x ∈ D : |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε` ; leurre « lim f existe » (sans égalité à f(x₀)).
  - « f dérivable en x₀ » : la limite du taux existe **et est finie** ; leurre « f continue en x₀ ».
  - « Σ aₙ converge » : la suite des sommes partielles sₙ converge ; leurre « aₙ → 0 » (`a1_series_term_to_zero`).
  - « Σ aₙ converge absolument » : Σ |aₙ| converge.
  - « (aₙ) de Cauchy » : `∀ε > 0 ∃N ∀m, n ≥ N : |aₘ − aₙ| ≤ ε` ; leurre `|aₙ₊₁ − aₙ| → 0` (contre-exemple : Log n).
  - « ∫ de a à +∞ de f converge » : `lim_{b→+∞} ∫ₐᵇ f` existe et est finie.
  - « f admet un DL(n) en x₀ » : il existe a₀, …, aₙ et ε(x) → 0 tels que f(x) = Σ aₖ(x − x₀)ᵏ + (x − x₀)ⁿ·ε(x).
- **Corrigé type** : « (aₙ) est une suite de Cauchy ».
  1. `∀ε > 0` — *quantifier ε*
  2. `∃N ∈ ℕ` — *rang qui dépend de ε*
  3. `∀m, n ≥ N` — *deux indices*
  4. `|aₘ − aₙ| ≤ ε` — *écart entre deux termes*
- **Aides** : 1 « Même charpente que la limite, mais on compare deux termes entre eux, pas à ℓ. » · 2 `∀ε > 0 ∃N ∀▢ ≥ N : |▢ − ▢| ≤ ε` · 3 la formule entière.
- **Variantes d'examen** : `open` (1 à 2 points, « Donner la définition précise de … ») ; `tf` : « (aₙ) est de Cauchy si aₙ₊₁ − aₙ → 0 » (faux, aₙ = Log n) ; « Si A est majoré, Sup A ∈ A » (faux, A = [0 ; 1[).
- **Pièges** : `g9_quant_order`, `a1_sup_in_set`, `a1_series_term_to_zero`, `a1_c1_def_missing_cont`, `a1_cauchy_consecutive`
- **Sous-buts → crédit** : quantificateurs → `g9-quant-write` ; définition → `a1-defs`.

### `a1-proofs` — Preuves courtes d'examen : énoncer le théorème, vérifier ses hypothèses
- **Année** 13 · **Prérequis** `a1-ser-compare`, `a1-mvt`, `a1-fn-ivt`, `a1-seq-monotone`, `g9-proof-contra` · **Étiquettes** GM · **Optionnelle** non · **Poids d'examen** 2
- **Pourquoi ces prérequis** : `a1-seq-monotone` : énoncer le théorème des suites monotones bornées.
- **Intro** : à l'examen, « si on utilise des résultats du cours, on les énoncera entièrement et on justifiera leur utilisation ». Une preuve courte, c'est : (1) l'hypothèse traduite en une propriété utilisable (convergente ⇒ bornée) ; (2) le théorème cité avec ses hypothèses ; (3) la vérification de chaque hypothèse ; (4) la conclusion.
- **Juge** : type `blocks` (`mode:'order'`) ; chaque bloc a ses `needs` ; les blocs « théorème » exigent le bloc « hypothèses vérifiées » avant la conclusion ; leurres tirés des pièges · **Forme finale** : ordre compatible avec `needs`, aucun leurre.
- **Niveaux** :
  - L1 (guidé) : charpente donnée, 1 bloc à choisir par trou.
  - L2 : blocs à ordonner, sans leurre.
  - L3 (choisir l'action) : blocs à ordonner, 2 leurres.
  - L4 (libre) : blocs à ordonner, 4 leurres, une saisie (la constante M, la borne).
  - L5 (seul) : preuve d'examen complète, barème par bloc.
- **Générateur** : gabarits (a) (bₙ) convergente ⇒ Σ bₙ/nᵖ converge (p ∈ {2, 3}) ; (b) f continue sur [a ; b], dérivable, f(a) = c > 0 et f′ ≤ −k < 0 ⇒ f s'annule sur ]a ; b[ (choisir a, b, c, k avec c − k(b − a) < 0 : TAF puis TVI) ; (c) Σ aₙ absolument convergente ⇒ a₂ₙ + … + a₃ₙ → 0 (reste de Cauchy) ; (d) Σ aₙ absolument convergente ⇒ Σ (−1)ⁿaₙe^(aₙ) absolument convergente (aₙ → 0 donc e^(aₙ) ≤ e à partir d'un rang).
- **Corrigé type** : (bₙ) convergente ⇒ Σ bₙ/n³ converge.
  1. « (bₙ) converge, donc elle est bornée : il existe M > 0 avec |bₙ| ≤ M pour tout n. » — *traduire l'hypothèse*
  2. « Donc |bₙ/n³| ≤ M/n³ pour tout n ≥ 1. » — *majorer* (crédit `a1-ser-compare`)
  3. « Σ M/n³ converge (série de Riemann, p = 3 > 1). » — *série de référence*
  4. « Par le critère de comparaison (termes positifs), Σ |bₙ/n³| converge. » — *citer le critère, hypothèses vérifiées*
  5. « Une série absolument convergente converge : Σ bₙ/n³ converge. » — *conclure*
  Leurres : « bₙ/n³ → 0, donc la série converge » (`a1_series_term_to_zero`) ; « bₙ/n³ ~ ℓ/n³ » (faux si ℓ = 0 : `a1_equiv_zero_limit`) ; « bₙ ≤ M, donc bₙ/n³ ≤ M/n³, donc Σ bₙ/n³ converge » (sans valeur absolue : `a1_compare_wrong_direction`).
- **Aides** : 1 « Qu'est-ce qu'une suite convergente a toujours ? Elle est bornée. » · 2 `|bₙ/n³| ≤ ▢/n³` · 3 la ligne 4.
- **Variantes d'examen** : `open` (4 points pour le gabarit (a) : bornée 1, majoration 1, critère énoncé et appliqué 1,5, conclusion 0,5 ; 5 points pour (b) : TAF énoncé 1, appliqué 1,5, TVI énoncé 1, appliqué 1, conclusion 0,5 ; 6 points pour (c) + (d)).
- **Pièges** : `a1_series_term_to_zero`, `a1_equiv_zero_limit`, `a1_compare_wrong_direction`, `a1_ivt_no_continuity`, `g9_proof_by_example`
- **Sous-buts → crédit** : majorer → `a1-ser-compare` ; TAF → `a1-mvt` ; TVI → `a1-fn-ivt` ; ordre de la preuve → `g9-proof-contra`.

## Pièges du module

Familles : celles de `FAMILIES` (`rule`, `sign`, `distribute`, `meaning`, `facts`) et trois des nouvelles familles du README §7 (`logic`, `method`, `notation`). On choisit la famille qui dit la nature de l'erreur plutôt que `calculus`. Tags : R recherche, C correction d'examen ou remarque d'un cours (la source est entre parenthèses), E expérience. Dans la colonne « transformation », `prev` est la ligne précédente de l'élève ; « wrongValues » désigne une règle qui ne produit que des réponses finales (QCM, V/F, champ final). Dans « explication », les accolades `{…}` sont remplacées par les nombres de l'élève (`ctx`).

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|
| `a1_supinf_on_values` | meaning | C (corrigé détaillé 2019) | `a1-sup-inf` | `a1-sup-inf` | A = {x > 0 : cos(1/x) > 0} : « Sup A = π/2 » → Sup A = +∞, Inf A = 0 | wrongValues : Inf et Sup de l'ensemble des valeurs u = g(x) (ici 1/x) ou f(x) qui satisfont la condition, au lieu de l'ensemble des x | « Tu as donné une borne des valeurs de {u}. L'Inf et le Sup portent sur les x de A : quand {u} parcourt {U}, x parcourt {X}. » |
| `a1_tan_monotone_range` | rule | C (corrigé détaillé 2021) | `a1-sup-inf` | `g3-arc-def` | Arctg(1/x) < 2π/3 ⇒ 1/x < tan(2π/3) = −√3 → la condition est toujours vraie | transform : appliquer tan à chaque membre de prev, même si une constante sort de ]−π/2 ; π/2[ | « tan n'est croissante que sur ]−π/2 ; π/2[, et {c} n'y est pas. Comme Arctg prend ses valeurs dans ]−π/2 ; π/2[, l'inégalité Arctg(…) < {c} est toujours vraie. » |
| `a1_sup_in_set` | meaning | E | `a1-sup-inf` | `a1-sup-proof` | Sup [0 ; 3[ = 3 = Max → pas de Max | wrongValues : Max A = Sup A, Min A = Inf A ; en blocs, le leurre « s ∈ A » | « Le Sup est le plus petit majorant ; il n'est pas forcément dans A. {s} ∉ A, donc A n'a pas de maximum. » |
| `a1_cplx_ik_mod` | facts | C (guide « Méthodes », 1.1.1) | `a1-cplx-exam` | `g8-algebraic` | i¹⁵ = i → −i | transform : remplacer chaque iᵏ de prev par i^(k mod 2), par i^(k mod 3) ou par −i^(k mod 4) | « 15 = 4·3 + 3, donc i¹⁵ = i³ = −i. On réduit l'exposant modulo 4. » |
| `a1_polar_r_negative` | notation | C (corrigé détaillé 2020) | `a1-cplx-exam` | `g8-polar` | −1 + i√3 = −2e^(−iπ/3) lu « r = 2, φ = −π/3 » → 2e^(2iπ/3) | transform : d'une ligne −r·e^(iφ), produire r·e^(iφ) (le signe − disparaît) | « Le module r est ≥ 0 : le signe − se met dans l'argument, −1 = e^(iπ). Ici −2e^(−iπ/3) = 2e^(2iπ/3). » |
| `a1_zn_conj_r0` | method | C (guide « Méthodes », 1.2) | `a1-cplx-zn-conj` | `a1-cplx-zn-conj` | z³ = z̄ : {1 ; i ; −1 ; −i} → {0 ; 1 ; i ; −1 ; −i} | transform : diviser par r sans ligne de cas ; wrongValues : l'ensemble sans 0 | « Avant de diviser par r, regarde r = 0 : z = 0 vérifie l'équation. Il manque cette solution. » |
| `a1_zn_conj_polynomial_count` | meaning | C (guide « Méthodes », 1.2) | `a1-cplx-zn-conj` | `a1-cplx-zn-conj` | z⁵ = \|z\| a 5 solutions → 6 | wrongValues : n (le degré apparent) | « z̄ et \|z\| ne sont pas des polynômes en z : le théorème fondamental de l'algèbre ne s'applique pas. Il faut compter. » |
| `a1_conj_arg_sign` | sign | E | `a1-cplx-zn-conj` | `g8-algebraic` | z̄ = re^(iφ) → re^(−iφ) | transform : dans prev, remplacer le nœud conj(z) par re^(iφ) | « Le conjugué change le signe de l'argument : z̄ = re^(−iφ). Avec ton signe, tu résous zⁿ = z. » |
| `a1_n_depends_on_n` | logic | E | `a1-seq-eps-n` | `a1-seq-eps-n-def` | N(ε) = 5/(εn) → ⌈5/ε⌉ | transform : ligne N(ε) = expression qui contient n ; `delta` répond `wrong` (variable libre n) | « N doit être fixé dès que ε est donné : il ne peut pas dépendre de n. Majore d'abord \|aₙ − ℓ\| par une expression plus simple. » |
| `a1_bound_wrong_direction` | sign | E | `a1-seq-eps-n` | `g1-bound` | 5/(n + 2) ≤ 5/(n + 3) → ≤ 5/n | transform : pour majorer une fraction positive, ajouter un terme positif au dénominateur (au lieu d'en retirer) | « Pour agrandir 5/(n + 2), il faut un dénominateur plus petit. Avec n = {n} : 5/(n + 2) = {a}, 5/(n + 3) = {b}, plus petit. » |
| `a1_limit_never_reached` | meaning | R (Cornu 1991 ; Tall & Vinner 1981) | `a1-seq-eps-n` | `a1-seq-eps-n-def` | « 0,999… < 1 » ; « la suite constante 3 ne tend pas vers 3 » → égalité, et lim = 3 | wrongValues : options « 0,999… < 1 », « une limite n'est jamais atteinte » | « Une limite peut être atteinte (suite constante) ou pas (1/n → 0). Ce qui compte : \|aₙ − ℓ\| finit sous tout ε > 0. » |
| `a1_indet_inf_minus_inf` | rule | E | `a1-seq-limits` | `a1-seq-limits` | √(n² + 4n) − n → 0 → 2 | transform : remplacer A − B par 0 quand A et B → +∞ avec le même terme dominant | « ∞ − ∞ n'est pas 0 : les deux termes grandissent presque à la même vitesse, et l'écart peut tendre vers n'importe quoi. Multiplie par le conjugué. » |
| `a1_sqrt_sum_split` | distribute | E | `a1-seq-limits` | `@alg:G-simplifier` | √(n² + 4n) = n + 2√n → conjugué | transform : √(A + B) → √A + √B dans prev | « Une racine ne se distribue pas sur une somme : teste n = {n}, √({A + B}) ≠ {√A + √B}. » |
| `a1_dominant_term_wrong` | rule | E | `a1-seq-limits` | `a1-seq-limits` | (2n³ − n)/(5n³ + 7) → −1/7 → 2/5 | transform : garder les termes de plus bas degré en haut et en bas | « En +∞, ce sont les plus grandes puissances qui dominent : n³ en haut et en bas. » |
| `a1_lim_quotient_bn_nonzero` | rule | C (corrigé détaillé 2021) | `a1-seq-limits` | `a1-seq-limits` | aₙ → 1, bₙ → 0 (bₙ ≠ 0) : « lim aₙ/bₙ = 1/0 existe » → n'existe pas forcément | transform : remplacer lim(a/b) par lim a / lim b même quand lim b = 0 ; wrongValues (V/F) « vrai » | « La règle du quotient demande lim bₙ ≠ 0. bₙ ≠ 0 pour chaque n ne suffit pas : bₙ = (−1)ⁿ/n et aₙ = 1 donnent un quotient sans limite. » |
| `a1_squeeze_wrong_direction` | sign | C (résumé « Calcul de limites ») | `a1-seq-squeeze` | `g1-bound` | Sₙ ≤ n²/(n² + n) → Sₙ ≥ n²/(n² + n) | transform : échanger ≤ et ≥ dans une ligne d'encadrement | « Chaque terme vaut au moins n/(n² + n) : c'est un minorant. Avec n = {n}, Sₙ = {s} > {b}. » |
| `a1_squeeze_different_limits` | method | C (résumé « Calcul de limites ») | `a1-seq-squeeze` | `a1-seq-squeeze` | 0 ≤ bₙ ≤ 2 ⇒ « bₙ converge » → bornes de même limite | transform : ligne de conclusion après deux bornes de limites {L1} ≠ {L2} | « Tes bornes tendent vers {L1} et {L2} : elles ne coincent pas la suite. Cherche des bornes plus serrées. » |
| `a1_sum_n_terms_as_one` | meaning | E | `a1-seq-squeeze` | `g5-sigma` | Σ_{k=1}^{n} n/(n² + k) ≤ n/(n² + 1) → n·n/(n² + 1) | transform : majorer une somme de n termes par le plus grand terme, sans facteur n | « Il y a n termes, chacun ≤ n/(n² + 1) : la somme est ≤ n·n/(n² + 1). » |
| `a1_bounded_times_zero` | rule | C (résumé « Calcul de limites ») | `a1-fn-limits` | `a1-seq-squeeze` | lim x·sin(1/x) « n'existe pas » → 0 | wrongValues : « n'existe pas » pour (→ 0)·(borné) ; transform : traiter 0·borné comme 0·∞ et appliquer BH | « 0 × (borné) n'est pas indéterminé : \|x·sin(1/x)\| ≤ \|x\| → 0. » |
| `a1_indet_one_inf` | rule | E | `a1-seq-1inf` | `a1-seq-1inf` | (1 + 2/n)ⁿ → 1 → e² | transform : remplacer uₙ^(vₙ) par (lim uₙ)^(vₙ) = 1 | « 1^∞ est indéterminé : la base tend vers 1 mais l'exposant explose. Écris e^(n·Log(1 + 2/n)). » |
| `a1_dl_order_too_low` | method | E | `a1-dl-limits` | `a1-dl-usual` | eˣ = 1 + x + x·ε(x) dans (eˣ − 1 − x)/x² → ordre 2 | transform : tronquer chaque DL de prev un ordre plus bas ; `series` accepte la ligne, puis la division donne `stay` (ε(x)/x) | « Avec un DL d'ordre {k}, il reste ε(x)/x^{m}, qui ne dit rien. Le dénominateur est en x^{d} : développe jusqu'à x^{d}. » |
| `a1_ratio_one` | rule | E | `a1-ser-ratio-root` | `a1-seq-ratio` | ρ = 1, donc « converge » → aucune conclusion | wrongValues : verdict « converge » ou « diverge » quand ρ = 1 | « Avec ρ = 1, le critère ne dit rien : Σ 1/n (diverge) et Σ 1/n² (converge) ont toutes deux ρ = 1. » |
| `a1_factorial_ratio` | facts | E | `a1-seq-ratio` | `a1-seq-ratio` | (2n + 2)!/(2n)! = 2n + 2 → (2n + 2)(2n + 1) | transform : simplifier (m + k)!/m! en un seul facteur (m + k) | « Entre (2n)! et (2n + 2)!, il y a deux facteurs : (2n + 1) et (2n + 2). » |
| `a1_bounded_implies_convergent` | meaning | C (examen MT 2014, V/F) | `a1-seq-monotone` | `a1-seq-monotone` | « bornée, donc convergente » → monotone et bornée | wrongValues (V/F) « vrai » ; blocs : leurre « (aₙ) est bornée, donc elle converge » | « (−1)ⁿ est bornée et ne converge pas. Il faut aussi la monotonie. » |
| `a1_monotone_by_f_increasing` | rule | E | `a1-seq-rec-fixed` | `a1-seq-rec-fixed` | f croissante, donc (aₙ) croissante → le sens dépend du signe de a₁ − a₀ | transform : conclusion « croissante » tirée de f′ > 0 seule | « f croissante dit seulement que la suite est monotone. Elle monte si a₁ > a₀ ; ici a₁ = {a1} et a₀ = {a0}. » |
| `a1_limsup_as_sup` | meaning | E | `a1-seq-limsup` | `a1-seq-limsup` | lim sup = sup des termes = {s} → limite de la plus haute sous-suite | wrongValues : sup et inf des termes | « Le sup peut être atteint au début ; la lim sup ne regarde que les n grands. » |
| `a1_affine_rec_no_fixed_point` | rule | E | `a1-seq-affine` | `a1-seq-affine` | aₙ = qⁿ·a₀ + c → qⁿ(a₀ − ℓ) + ℓ | transform : produire qⁿ·a₀ + c et qⁿ·a₀ + n·c | « Teste n = 1 : ta formule donne {v}, la suite donne {a1}. Passe par l'écart au point fixe ℓ = {l}. » |
| `a1_rec_limit_without_convergence` | logic | C (corrigé MT 2014) | `a1-seq-rec-fixed` | `a1-seq-monotone` | « ℓ = f(ℓ) ⇒ ℓ = 2, donc aₙ → 2 » → la convergence d'abord | blocs : conclusion avant « monotone et bornée » ; wrongValues : un point fixe quand la suite diverge | « ℓ = f(ℓ) donne les limites possibles si la suite converge. Avec a₀ = {a0}, elle tend vers {lim}. » |
| `a1_oblique_asymptote_slope_only` | rule | E | `a1-fn-study` | `a1-fn-study` | asymptote y = x → y = x + 1 | transform : remplacer y = mx + p par y = mx | « f(x)/x → {m} donne la pente ; il faut encore p = lim (f(x) − {m}x) = {p}. » |
| `a1_geo_sum_start` | rule | E | `a1-ser-geo-tele` | `g5-geom` | Σ_{n≥2} (1/3)ⁿ = 3/2 → 1/6 | transform : Σ_{n≥n₀} qⁿ → 1/(1 − q) en ignorant n₀ | « 1/(1 − q) vaut pour une somme qui commence à n = 0. Ici le premier terme est {t0} : premier terme sur (1 − raison). » |
| `a1_tele_wrong_terms` | rule | E | `a1-ser-geo-tele` | `a1-ser-geo-tele` | Σ (1/(k + 1) − 1/(k + 3)) = 1/2 → 1/2 + 1/3 | transform : garder un seul terme de tête quand le décalage p vaut 2 ou plus | « Le décalage est de {p} : les {p} premiers termes positifs ne sont jamais compensés. » |
| `a1_series_term_to_zero` | logic | R (plan ; Tall & Vinner 1981) | `a1-ser-necessary` | `a1-ser-necessary` | uₙ → 0, donc Σ uₙ converge → Σ 1/n diverge | wrongValues : verdict « converge » dès que uₙ → 0 ; blocs : leurre « bₙ/n³ → 0, donc la série converge » | « Σ 1/n diverge alors que 1/n → 0. uₙ → 0 est nécessaire, pas suffisant. » |
| `a1_compare_wrong_direction` | logic | E | `a1-ser-compare` | `a1-ser-compare` | aₙ ≥ 1/n², Σ 1/n² converge, donc Σ aₙ converge → il faut aₙ ≤ bₙ | transform : verdict « converge » depuis un minorant convergent, « diverge » depuis un majorant divergent, ou comparaison sans valeur absolue | « Être plus grand qu'une série convergente ne dit rien. Pour converger, il faut être plus petit (en valeur absolue) qu'une série convergente. » |
| `a1_riemann_p_boundary` | facts | E | `a1-ser-compare` | `a1-ser-compare` | Σ 1/n converge (p = 1) → diverge | wrongValues : « converge » pour p = 1, « diverge » pour 1 < p < 2 | « Σ 1/nᵖ converge si et seulement si p > 1 strictement. p = 1 : série harmonique, divergente. » |
| `a1_ipe_in_sum` | rule | C (résumé « Calcul de limites ») | `a1-fn-limits` | `a1-fn-limits` | (x − sin x)/x³ avec sin x ~ x : (x − x)/x³ = 0 → 1/6 | transform : remplacer une fonction par son équivalent dans un terme d'une somme ou d'une différence | « On ne remplace par un équivalent que dans un produit ou un quotient. Dans x − sin x, les x s'annulent : il faut le terme suivant du DL. » |
| `a1_ratio_lt1_termwise` | logic | E | `a1-ser-ratio-root` | `a1-ser-ratio-root` | aₙ₊₁/aₙ < 1 pour tout n ⇒ converge → il faut ≤ q < 1 fixe | wrongValues (V/F) « vrai » | « 1/n vérifie aₙ₊₁/aₙ < 1 et Σ 1/n diverge : il faut un q < 1 fixe, ou une limite < 1. » |
| `a1_leibniz_no_decrease` | method | C (guide « Méthodes », 3.1.2) | `a1-ser-leibniz-abs` | `a1-ser-leibniz-abs` | Σ (−1)ⁿ/(√n + (−1)ⁿ) « converge par Leibniz » → \|aₙ\| n'est pas décroissante | blocs : conclusion Leibniz sans le bloc « décroissante » ; wrongValues : « converge » pour une série alternée dont le terme → 0 | « Leibniz demande trois choses : signes alternés, \|aₙ\| décroissante, \|aₙ\| → 0. Ici \|a₂\| = {a2} < \|a₃\| = {a3}. » |
| `a1_abs_conv_confused` | meaning | E | `a1-ser-leibniz-abs` | `a1-ser-leibniz-abs` | Σ (−1)ⁿ/n « converge absolument » → semi-convergente | wrongValues : « absolument » dès que Leibniz s'applique ; « diverge » dès que Σ \|aₙ\| diverge | « Leibniz donne la convergence, pas la convergence absolue : Σ \|aₙ\| = Σ 1/n diverge. » |
| `a1_param_bounds_untreated` | method | E | `a1-ser-param` | `a1-ser-param` | [−1 ; 3] → ]−1 ; 3[ | wrongValues : bornes incluses, ou exclues sans étude | « Aux bornes, ρ = 1 et le critère ne dit rien : remplace λ = {b1} et λ = {b2} et étudie chaque série. » |
| `a1_abs_square_ineq` | sign | E | `a1-ser-param` | `g1-sign-table` | \|2λ\| < \|λ + 3\| ⇒ 2λ < λ + 3 → 4λ² < (λ + 3)² | transform : retirer les barres de valeur absolue des deux membres | « \|a\| < \|b\| équivaut à a² < b², pas à a < b. λ = {t} vérifie ta ligne mais pas la précédente. » |
| `a1_remarkable_limit_scale` | rule | E | `a1-fn-limits` | `a1-fn-limits` | sin(3x)/x → 1 → 3 | transform : remplacer sin(ax)/x, (1 − cos ax)/x², Log(1 + ax)/x par la limite sans le facteur a (ou a²) | « sin(u)/u → 1 avec u = {a}x : sin({a}x)/x = {a}·sin({a}x)/({a}x) → {a}. » |
| `a1_bh_not_indeterminate` | method | C (corrigé détaillé 2019) | `a1-bh` | `a1-bh` | (x + 1)/(x² + 3x + 1) en 0 « = 1/3 par BH » → 1 | transform : appliquer BH à prev quand ce n'est ni 0/0 ni ∞/∞ | « En 0, numérateur et dénominateur valent {n} et {d} : ce n'est pas indéterminé, la limite est {L}. BH ne s'applique qu'à 0/0 et ∞/∞. » |
| `a1_onesided_ignored` | method | E | `a1-fn-onesided` | `a1-fn-onesided` | lim e^(1/x) en 0 = +∞ → pas de limite | transform : une seule limite latérale donnée comme limite | « En 0⁻, 1/x → −∞ et e^(1/x) → 0 : les deux côtés diffèrent. » |
| `a1_abs_removed` | sign | E | `a1-fn-onesided` | `a1-fn-onesided` | \|x − 2\| = x − 2 pour x < 2 → −(x − 2) | transform : remplacer \|u\| par u des deux côtés | « Pour x < 2, x − 2 < 0, donc \|x − 2\| = −(x − 2). » |
| `a1_extension_wrong_branch` | rule | E | `a1-fn-extension` | `a1-fn-extension` | limite à gauche de 3 avec le morceau x > 3 → morceau de gauche | transform : utiliser la formule d'un autre morceau pour une limite latérale | « À gauche de {c}, c'est {g} qui définit f. » |
| `a1_epsdelta_swapped` | notation | E | `a1-fn-epsdelta-def` | `a1-fn-epsdelta-def` | \|x − x₀\| ≤ ε ⇒ \|f(x) − L\| ≤ δ → l'inverse | transform (`logic`) : échanger ε et δ dans les deux inégalités | « ε mesure l'écart des valeurs f(x) − L ; δ mesure celui des x. » |
| `a1_delta_depends_on_x` | logic | E (plan) | `a1-fn-epsdelta` | `a1-fn-epsdelta-def` | δ = ε/\|x + 3\| → min(1 ; ε/7) | transform : ligne δ(ε) qui contient x (variable libre), refusée par `delta` | « δ se choisit avant x : il ne peut pas en dépendre. Borne d'abord \|x + 3\| en imposant \|x − 3\| ≤ 1. » |
| `a1_delta_inverted` | rule | E | `a1-fn-epsdelta` | `a1-fn-epsdelta` | δ = 4ε → ε/4 | transform : δ = \|a\|·ε au lieu de ε/\|a\| | « Avec δ = {a}ε, \|f(x) − L\| = {a}\|x − x₀\| peut valoir {a²}ε. Il faut {a}δ ≤ ε. » |
| `a1_ivt_no_continuity` | logic | E | `a1-fn-ivt` | `a1-fn-ivt` | « f(0) < 0 < f(1), donc f s'annule » pour 1/(x − 1/2) → continuité exigée | blocs : leurre de conclusion sans le bloc « f continue sur [a ; b] » | « Sans continuité, f peut sauter par-dessus 0 : 1/(x − 1/2) change de signe sur [0 ; 1] sans s'annuler. » |
| `a1_image_endpoints_only` | method | E | `a1-fn-image` | `a1-fn-image` | image = [f(0) ; f(π)] = {0} → [0 ; (√2/2)e^(−π/4)] | wrongValues : intervalle entre f(a) et f(b) | « f n'est pas monotone sur [{a} ; {b}] : son maximum est atteint en {c}, à l'intérieur. » |
| `a1_extrema_bounds_forgotten` | method | E | `a1-extrema-global` | `a1-extrema-global` | max global seulement parmi les points f′ = 0 → aussi f(a), f(b) | wrongValues : extrema choisis parmi les seuls points critiques | « Sur un segment, les bornes sont candidates : f({a}) = {fa} dépasse f({c}) = {fc}. » |
| `a1_bisection_count` | facts | E | `a1-bisection-fixpoint` | `a1-bisection-fixpoint` | erreur ≤ 10⁻³ dès n = 3 → n = 10 | wrongValues : n avec 10ⁿ au lieu de 2ⁿ | « Chaque étape divise l'erreur par 2, pas par 10 : 2¹⁰ = 1024 ≥ 10³. » |
| `a1_derivable_from_formula` | method | C (guide « Méthodes », 5.1) | `a1-deriv-def` | `a1-deriv-def` | « f′(x) = 2x sin(1/x) − cos(1/x) n'a pas de limite en 0, donc f n'est pas dérivable en 0 » → f′(0) = 0 | transform : remplacer f′(x₀) par lim f′(x) ou par la formule de la branche évaluée en x₀ | « En x₀, la dérivée se calcule par le taux d'accroissement. lim f′(x) peut ne pas exister alors que f′({x0}) existe. » |
| `a1_corner_missed` | method | E (plan) | `a1-deriv-def` | `a1-deriv-def` | « \|x\| a pour dérivée 0 en 0 » → pas dérivable | wrongValues : la moyenne ou une seule des dérivées latérales | « À gauche la pente vaut {l}, à droite {r} : point anguleux, pas de dérivée. » |
| `a1_arc_deriv_table` | facts | E | `a1-deriv-rules` | `g3-arc-def` | Arctg′ = 1/√(1 − x²) → 1/(1 + x²) | transform : échanger les dérivées d'Arctg, Arcsin, Arccos, Argsh | « Arctg′(x) = 1/(1 + x²) ; Arcsin′(x) = 1/√(1 − x²) ; Argsh′(x) = 1/√(1 + x²). » |
| `a1_inverse_deriv_wrong_point` | rule | E | `a1-deriv-inverse` | `a1-deriv-inverse` | (f⁻¹)′(5) = 1/f′(5) → 1/f′(1) | transform : évaluer f′ en y₀ au lieu de x₀ = f⁻¹(y₀) | « On dérive f là où elle vaut {y0}, c'est-à-dire en x₀ = {x0}, pas en {y0}. » |
| `a1_exp_rule_var_base` | rule | E | `a1-deriv-log` | `a1-deriv-log` | ((x + 3)ˣ)′ = (x + 3)ˣ·Log(x + 3) → + x/(x + 3) | transform : (uᵛ)′ → uᵛ·Log u·v′ (le terme v·u′/u manque) | « La base dépend aussi de x : dérive e^(x·Log(x + 3)) en entier. » |
| `a1_c1_def_missing_cont` | logic | C (cours Friedli, exemple 9.34 ; examens 2020 et 2022) | `a1-c1-def` | `a1-c1-def` | « f ∈ C¹(I) si f est dérivable sur I » → et f′ continue sur I | blocs : définition sans le bloc « f′ est continue sur I » | « x²·sin(1/x) est dérivable sur ℝ, mais sa dérivée n'est pas continue en 0 : il faut les deux conditions. » |
| `a1_piecewise_derivative_formula` | method | C (guide « Méthodes », 5.1) | `a1-piecewise-ab` | `a1-deriv-def` | égaler les pentes des morceaux sans vérifier la continuité → continuité d'abord | transform : sauter la ligne de continuité, égaler g₁′(x₀) et g₂′(x₀) | « Si f n'est pas continue en {x0}, elle n'y est pas dérivable, même avec des pentes égales. » |
| `a1_c1_from_lim_fprime_only` | logic | C (check-list MT 2018, « attention à la logique ») | `a1-c1-proof` | `a1-deriv-def` | « lim f′(x) = 3, donc f′(0) = 3 » → f′(0) par la définition | blocs : leurre « f′(0) = lim_{x→0} f′(x) » à la place du taux | « Montre d'abord que f′(0) existe, avec le taux d'accroissement. Ensuite seulement, f′(x) → f′(0). » |
| `a1_rolle_without_hyp` | logic | C (examen 2022, V/F) | `a1-mvt` | `a1-mvt` | f(−1) = f(1) ⇒ ∃c : f′(c) = 0 pour f = \|x\| → hypothèse manquante | wrongValues (V/F) « vrai » | « Rolle demande f dérivable sur ]a ; b[ : \|x\| ne l'est pas en 0, et sa pente n'est jamais nulle. » |
| `a1_mvt_endpoints_values` | rule | E | `a1-mvt` | `a1-mvt` | encadrement par f(a) et f(b) → par les valeurs de f′ | wrongValues : encadrement par l'image de f | « Le taux d'accroissement est une valeur de f′, pas de f. » |
| `a1_bh_quotient_rule` | rule | E (plan) | `a1-bh` | `a1-bh` | lim f/g = lim (f/g)′ → lim f′/g′ | transform : remplacer f/g par (f′g − fg′)/g² | « BH dérive le haut et le bas séparément : f′/g′, pas (f/g)′. » |
| `a1_bh_converse` | logic | C (examen 2021, V/F) | `a1-bh` | `a1-bh` | lim g′/h′ n'existe pas ⇒ lim g/h n'existe pas → on ne peut rien dire | wrongValues (V/F) « vrai » | « BH va dans un seul sens. g = x²sin(1/x), h = x : g/h → 0, mais g′/h′ n'a pas de limite. » |
| `a1_polar_slope_naive` | rule | E | `a1-polar-curve` | `a1-param-curve` | y′ = ρ̇ → (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ) | transform : pente remplacée par ρ̇ ou ρ̇/ρ | « ρ̇ dit comment le rayon change, pas la pente dans le plan. Dérive x = ρ cos φ et y = ρ sin φ. » |
| `a1_dl_factorial_missing` | facts | E | `a1-dl-usual` | `a1-dl-usual` | eˣ = 1 + x + x² + x³ → x²/2 + x³/6 | transform : coefficient f⁽ᵏ⁾(0) au lieu de f⁽ᵏ⁾(0)/k! | « Les coefficients sont f⁽ᵏ⁾(0)/k! : x²/2!, x³/3!. » |
| `a1_dl_factor_out_constant` | rule | E | `a1-dl-usual` | `a1-dl-usual` | 1/(4 + 3t) = 1 − 3t + 9t² → (1/4)(1 − 3t/4 + 9t²/16) | transform : appliquer 1/(1 + u) avec u = 3t sans mettre 4 en facteur | « Écris d'abord 4 + 3t = 4(1 + 3t/4) : le DL de 1/(1 + u) demande un 1. » |
| `a1_dl_remainder_wrong_order` | notation | E | `a1-dl-usual` | `a1-dl-usual` | x − x³/6 + x·ε(x) → x³·ε(x) | transform : reste xᵏ·ε(x) avec k ≠ ordre annoncé (`stay`) | « Le reste se met à l'ordre du dernier terme gardé : x³·ε(x). » |
| `a1_dl_truncate_early` | method | E | `a1-dl-ops` | `a1-dl-ops` | eˣ·sin x avec eˣ = 1 + x : x + x² → x + x² + x³/3 | transform : tronquer un facteur à l'ordre n − 1 sans tenir compte de la valuation de l'autre | « sin x commence en x : pour avoir les x³ du produit, il faut eˣ jusqu'à x². » |
| `a1_dl_cube_coeffs` | distribute | C (examen 2021, V/F) | `a1-dl-ops` | `@alg:C-developper` | (a + bx + cx²)³ = a³ + b³x + c³x² → développer | transform : élever chaque coefficient à la puissance | « Une puissance ne se distribue pas sur une somme : (1 + x)³ = 1 + 3x + 3x² + x³. » |
| `a1_dl_compose_nonzero_inner` | rule | C (corrigé détaillé 2022) | `a1-dl-compose` | `a1-dl-compose` | e^(1/(1 − x)) = 5/2 + 2x + 5x²/2 → e(1 + x + 3x²/2) | transform : substituer u = g(x) dans le DL de f en 0 alors que g(0) ≠ 0 | « 1/(1 − x) tend vers 1, pas vers 0 : le DL de eᵘ en 0 ne s'applique pas. Sors e¹ : e^(1/(1 − x)) = e·e^(1/(1 − x) − 1). » |
| `a1_dl_truncate_inner` | method | C (corrigé détaillé 2021) | `a1-dl-compose` | `a1-dl-ops` | sin(sin x) = x − x³/3 + x⁵/60 → x − x³/3 + x⁵/10 | transform : dans uᵏ, ne garder que le terme dominant de u | « Dans (x − x³/6)³, le terme 3·x²·(−x³/6) = −x⁵/2 est d'ordre 5 : il compte. » |
| `a1_dl_read_factorial` | rule | C (examen MT 2014, distracteurs) | `a1-dl-read` | `a1-dl-read` | f″(1) = −5 → −10 | wrongValues : f⁽ᵏ⁾(a) = aₖ | « Le coefficient vaut f⁽ᵏ⁾(a)/k! : multiplie par {k}! = {kf}. » |
| `a1_dl_read_divide` | rule | E | `a1-dl-read` | `a1-dl-read` | f⁽⁵⁾(0) = (47/40)/120 → 141 | wrongValues : aₖ/k! | « Tu as divisé par k! au lieu de multiplier : f⁽ᵏ⁾(0) = k!·aₖ. » |
| `a1_taylor_rest_at_a` | method | E | `a1-taylor-rest` | `a1-taylor-rest` | \|R₂\| ≤ \|f‴(0)\|·x³/6 → max sur [0 ; x] | transform : remplacer max \|f⁽ⁿ⁺¹⁾\| sur l'intervalle par \|f⁽ⁿ⁺¹⁾(a)\| | « c est quelque part entre {a} et {x} : majore \|f⁽ⁿ⁺¹⁾\| sur tout l'intervalle. » |
| `a1_power_bounds_forgotten` | method | E (plan) | `a1-pow-domain` | `a1-pow-domain` | ]1/3 ; 5/3[ → [1/3 ; 5/3[ | wrongValues : ]x₀ − R ; x₀ + R[ par défaut | « En x = {b}, la série devient {s}, qui converge : cette borne est dans le domaine. » |
| `a1_power_radius_inverse` | rule | E | `a1-pow-domain` | `a1-pow-domain` | R = 3/2 → 2/3 | wrongValues : R = ρ au lieu de 1/ρ | « La condition est ρ·\|x − x₀\| < 1, donc R = 1/ρ = {R}. » |
| `a1_power_center_sign` | sign | E | `a1-pow-domain` | `a1-pow-domain` | (x + 1)ⁿ centrée en 1 → en −1 | wrongValues : intervalle centré en −x₀ | « (x + 1)ⁿ = (x − (−1))ⁿ : le centre est −1. » |
| `a1_pow_sum_index_shift` | notation | E | `a1-pow-sums` | `g5-reindex` | Σ_{k≥1} 2ᵏ/k! = e² → e² − 1 | transform : remplacer Σ_{k≥k₀} par la série complète (ou décaler l'indice d'un cran de trop) | « La série de e² commence à k = 0 ; ici le terme k = 0 (= 1) manque. » |
| `a1_int_arctg_as_log` | rule | E (plan) | `a1-int-direct` | `g6-antideriv-usual` | ∫ 1/(1 + x²) = Log(1 + x²) → Arctg x | transform : ∫ c/(u² + a) → c·Log(u² + a) | « Dérive Log(1 + x²) : 2x/(1 + x²), pas 1/(1 + x²). » |
| `a1_int_missing_inner_factor` | rule | E | `a1-int-direct` | `a1-int-direct` | ∫ x/(1 + x⁴) = Arctg(x²) → ½Arctg(x²) | transform : primitive G(u) sans diviser par la constante de u′ | « Dérive Arctg(x²) : 2x/(1 + x⁴). Il y a un facteur {k} de trop. » |
| `a1_int_no_constant` | notation | E (plan) | `a1-int-direct` | `a1-int-direct` | ∫ 2x dx = x² → x² + C | (pas de transformation : `antideriv` répond `stay`) | « N'oublie pas la constante : les primitives sont toutes de la forme x² + C. » |
| `a1_subst_dx_kept` | rule | E (plan) | `a1-int-subst` | `a1-int-subst` | t = √x : ∫ dt/(t(1 + t)) → ∫ 2 dt/(1 + t) | transform : remplacer x par φ(t) dans l'intégrande et dx par dt (sans φ′(t)) | « dx = {dphi} dt : ce facteur manque. » |
| `a1_subst_bounds_kept` | rule | E (plan) | `a1-int-subst` | `a1-int-subst` | ∫₁⁴ 2/(1 + t) dt → ∫₁² | transform : garder les bornes en x après le changement de variable | « Quand x va de {a} à {b}, t va de {ta} à {tb}. » |
| `a1_ibp_sign` | sign | E (plan) | `a1-int-parts` | `a1-int-parts` | x²e^(2x)/2 − x e^(2x)/2 − ∫ e^(2x)/2 → + ∫ e^(2x)/2 | transform : dans la 2e IPP, ne pas distribuer le − devant la parenthèse | « Le − devant la deuxième IPP porte sur toute la parenthèse. » |
| `a1_ibp_plus` | rule | E (plan) | `a1-int-parts` | `a1-int-parts` | ∫ uv′ = uv + ∫ u′v → uv − ∫ u′v | transform : remplacer le − de la formule par + | « Dérive uv : u′v + uv′. Donc ∫ uv′ = uv − ∫ u′v. » |
| `a1_int_product` | distribute | R (Orton 1983) | `a1-int-parts` | `a1-int-direct` | ∫ x²e^(2x) = (x³/3)(e^(2x)/2) → IPP | transform : ∫ f·g → (∫ f)·(∫ g) | « Dérive (x³/3)(e^(2x)/2) : c'est un produit, il y a deux termes, et aucun n'est x²e^(2x). » |
| `a1_ibp_boundary_term` | rule | C (examen 2022, V/F) | `a1-int-parts` | `a1-int-parts` | ∫ₐᵇ fg′ = −∫ₐᵇ f′g → + [fg]ₐᵇ | transform : omettre [uv]ₐᵇ dans une IPP définie | « Le terme [uv] entre {a} et {b} vaut {val} ici ; il ne disparaît que si uv prend la même valeur aux deux bornes. » |
| `a1_reduction_index` | rule | E | `a1-int-reduction` | `a1-int-reduction` | Jₙ = e − (n − 1)Jₙ₋₁ → e − n·Jₙ₋₁ | transform : coefficient décalé (n − 1 ou n + 1) | « u = xⁿ donne u′ = n·xⁿ⁻¹ : le coefficient est n. Teste n = 1 : J₁ = {j1}. » |
| `a1_des_wrong_form` | rule | E | `a1-int-rational` | `g0-pfd-general` | B/(x² + 2x + 5) → (Bx + C)/(x² + 2x + 5) | transform : numérateur constant sur un facteur irréductible de degré 2, ou terme B/(x − a)² oublié pour une racine double | « Sur un facteur de degré 2 sans racine, le numérateur est de degré 1 : Bx + C. Sans lui, le système n'a pas de solution. » |
| `a1_arctg_scale` | rule | E | `a1-int-rational` | `a1-int-direct` | ∫ dx/((x + 1)² + 4) = Arctg(x + 1) → ½Arctg((x + 1)/2) | transform : ∫ du/(u² + a²) → Arctg u | « ∫ du/(u² + a²) = (1/a)·Arctg(u/a). Ici a = {a}. » |
| `a1_int_log_of_denominator` | rule | E | `a1-int-rational` | `a1-int-direct` | ∫ (x + 5)/Q = Log\|Q\| → DES | transform : ∫ P/Q → Log\|Q\| quel que soit P | « Log\|Q\| a pour dérivée Q′/Q ; ici le numérateur n'est pas Q′. » |
| `a1_trig_subst_dx` | rule | E | `a1-int-trig` | `a1-int-trig` | t = tan(x/2), dx = dt → 2 dt/(1 + t²) | transform : substituer sans le facteur 2/(1 + t²) | « x = 2 Arctg t, donc dx = 2 dt/(1 + t²). » |
| `a1_hyper_identity_sign` | sign | E | `a1-int-hyper` | `g2-hyp-formulas` | 1 + sinh² t = −cosh² t, ou cosh² + sinh² = 1 → cosh² − sinh² = 1 | transform : appliquer l'identité trigonométrique (cos² + sin² = 1) aux hyperboliques | « Pour les hyperboliques : cosh² − sinh² = 1, donc 1 + sinh² = cosh². » |
| `a1_int_exp_square_primitive` | rule | C (examen 2020, distracteur) | `a1-int-estimate` | `a1-int-direct` | ∫₀² e^(x²) dx = e^(8/3) − 1 → encadrer | wrongValues : [e^(x³/3)]ₐᵇ, [e^(x²)/(2x)]ₐᵇ | « Dérive e^(x³/3) : x²·e^(x³/3) ≠ e^(x²). e^(x²) n'a pas de primitive élémentaire : on encadre. » |
| `a1_parity_misused` | logic | C (guide « Méthodes », 8.1.1) | `a1-int-estimate` | `a1-int-estimate` | f bijective, f(0) = 0 ⇒ ∫₋₁¹ f = 0 → seulement si f est impaire | wrongValues (V/F) « vrai » | « ∫₋ₐᵃ f = 0 demande f impaire. f(x) = x (x ≥ 0), −√(−x) (x < 0) ne l'est pas : l'intégrale vaut −1/6. » |
| `a1_ftc_no_chain` | rule | E | `a1-ftc` | `a1-deriv-rules` | (∫₁^(x³) f)′ = f(x³) → 3x²·f(x³) | transform : d/dx ∫ₐ^(g(x)) f → f(g(x)) sans g′(x) | « La borne est {g} : règle de chaîne, multiplie par ({g})′ = {g'}. » |
| `a1_ftc_integrate_first` | method | E | `a1-ftc` | `a1-ftc` | chercher une primitive de e^(−t²) → F abstraite | transform : ligne contenant une primitive fausse de f (testée par dérivation) | « Inutile de trouver F : seule F′ = f sert. Appelle-la F et dérive F(g(x)). » |
| `a1_improper_singularity_ignored` | rule | R (Orton 1983) | `a1-improper-calc` | `a1-improper-calc` | ∫₋₁¹ dx/x² = [−1/x]₋₁¹ = −2 → diverge | transform : théorème fondamental appliqué à travers un point où f n'est pas bornée | « 1/x² > 0 : l'intégrale ne peut pas être négative. f n'est pas bornée en 0 : coupe en 0 et calcule chaque limite. » |
| `a1_improper_undefined_means_diverge` | meaning | C (examen 2019, distracteur) | `a1-improper-calc` | `a1-improper-compare` | « f n'est pas définie en 0, donc ∫ de 0⁺ à π/6 diverge » → converge, vaut √2 | wrongValues : « diverge » dès qu'une borne est singulière | « Une borne où f n'est pas définie rend l'intégrale généralisée, pas divergente : ∫ de 0⁺ à 1 de dx/√x = 2. » |
| `a1_alpha_criteria_swapped` | facts | E | `a1-improper-compare` | `a1-improper-compare` | ∫ de 0⁺ à 1 de dx/√x « diverge (α < 1) » → converge | wrongValues : critère de +∞ utilisé en 0⁺, et l'inverse | « En 0⁺, dx/xᵅ converge si α < 1 ; en +∞, si α > 1. Les deux critères sont opposés. » |
| `a1_improper_lim_zero_converges` | logic | C (examen MT 2014, V/F) | `a1-improper-compare` | `a1-improper-compare` | f → 0 en +∞, donc ∫ converge → 1/x | wrongValues (V/F) « vrai » | « 1/x → 0 et ∫₁^∞ dx/x = +∞. » |
| `a1_improper_one_end_only` | method | E | `a1-improper-compare` | `a1-improper-compare` | verdict après le seul point 1⁺ → les deux points | transform : verdict « converge » après une seule comparaison quand le repérage a donné deux points problèmes | « Il y a deux points problèmes, {p1} et {p2} : chacun doit converger. » |
| `a1_improper_log_split_limit` | rule | C (corrigé MT 2014, exercice 20) | `a1-improper-rational` | `a1-improper-rational` | [−2Log(x + 1)]₁^∞ + [Log(x² + 2x + 2)]₁^∞ = −∞ + ∞ → Log((x² + 2x + 2)/(x + 1)²) → 0 | transform : limite terme à terme d'une somme de Log qui divergent chacun (`stay` : ∞ − ∞) | « Chaque Log part à l'infini, mais leur somme est Log((x² + 2x + 2)/(x + 1)²) → Log 1 = 0. Regroupe avant la limite. » |
| `a1_volume_no_square` | rule | E | `a1-int-applications` | `a1-int-applications` | V = π∫ f → π∫ f² | transform : formule sans le carré | « Chaque tranche est un disque de rayon f(x), d'aire π·f(x)². » |
| `a1_arc_length_no_sqrt` | rule | E | `a1-int-applications` | `a1-int-applications` | L = ∫ (1 + f′²) → ∫ √(1 + f′²) | transform : formule sans la racine | « Un petit bout de courbe mesure √(dx² + dy²) = √(1 + f′²)·dx. » |
| `a1_cauchy_consecutive` | logic | E | `a1-defs` | `a1-seq-monotone` | « Cauchy ⇔ aₙ₊₁ − aₙ → 0 » → \|aₘ − aₙ\| ≤ ε pour tous m, n ≥ N | blocs : leurre | « Log(n + 1) − Log n → 0, mais Log n → +∞ : Cauchy compare deux termes quelconques. » |
| `a1_equiv_zero_limit` | rule | E | `a1-proofs` | `a1-ser-compare` | bₙ → ℓ, donc bₙ/n³ ~ ℓ/n³ → faux si ℓ = 0 | blocs : leurre | « Si ℓ = 0, ℓ/n³ = 0 n'est équivalent à rien. Passe par la borne \|bₙ\| ≤ M. » |

## Exemples de type examen

Énoncés inspirés des examens GM 2019–2022 et MT 2014, reformulés et avec d'autres nombres. Chacun sert de modèle à un item `problem` (variante `open`) ; le barème est par étape, et chaque étape correspond à une ou plusieurs lignes jugées.

### E1. Suite récurrente par l'étude de f (13 points, modèle MT 2014) — `a1-seq-rec-study`

On étudie la suite `aₙ₊₁ = aₙ + (aₙ − 1)/(2aₙ − 3)`, avec a₁ ≠ 3/2 (gabarit 1, p = 1, γ = 2).

| Partie | Attendu | Points |
|---|---|---|
| (a) Seule limite possible | ℓ = ℓ + (ℓ − 1)/(2ℓ − 3) ⇒ ℓ = 1 | 1 |
| (b) f′ et f″ | f(x) = x + (x − 1)/(2x − 3) ; `f′(x) = 1 − 1/(2x − 3)² = 4(x − 1)(x − 2)/(2x − 3)²` ; `f″(x) = 4/(2x − 3)³` | 3 |
| (b) Monotonie | croît sur ]−∞ ; 1] et [2 ; +∞[, décroît sur [1 ; 3/2[ et ]3/2 ; 2] ; max local f(1) = 1, min local f(2) = 3 | 1 |
| (b) Convexité | concave sur ]−∞ ; 3/2[, convexe sur ]3/2 ; +∞[ | 1 |
| (b) Asymptote verticale | x = 3/2 ; −∞ à gauche, +∞ à droite | 1 |
| (b) Asymptote oblique | y = x + 1/2 en ±∞ | 1 |
| (c) Position de f par rapport à y = x | f(x) > x ⇔ x < 1 ou x > 3/2 ; f(x) < x ⇔ 1 < x < 3/2 | 2 |
| (d) Discussion selon a₁ | a₁ > 3/2 : croissante, ne peut pas tendre vers 1, donc → +∞ ; a₁ < 1 : croissante, majorée par 1 (1 est le max de f sur ]−∞ ; 3/2[), → 1 ; 1 < a₁ < 3/2 : a₂ < 1, on revient au cas précédent ; a₁ = 1 : constante. Converge (vers 1) si et seulement si a₁ < 3/2 | 3 |

### E2. Intégrale généralisée rationnelle (12 points, modèle MT 2014) — `a1-improper-rational`

`I = ∫₀^∞ (4x + 5)/(x³ + 3x² + 4x + 2) dx`.

| Partie | Attendu | Points |
|---|---|---|
| (a) Convergence | Q(x) > 0 sur [0 ; +∞[ ; f(x) ~ 4/x² en +∞ (deg Q − deg P = 2), α = 2 > 1 : converge | 2 |
| (b) Factoriser Q | Q(−1) = 0, Q = (x + 1)(x² + 2x + 2), facteur irréductible (Δ = −4) | 1 |
| (b) Forme de la DES | A/(x + 1) + (Bx + C)/(x² + 2x + 2) | 1 |
| (b) Coefficients | A = 1, B = −1, C = 3 | 2 |
| (b) Primitives | −x + 3 = −½(2x + 2) + 4 ; Log(x + 1) − ½Log(x² + 2x + 2) + 4 Arctg(x + 1) | 2 |
| (b) Regrouper les Log | Log((x + 1)/√(x² + 2x + 2)) | 1 |
| (b) Limite en +∞ | Log 1 + 4·π/2 = 2π | 2 |
| (b) Valeur | en 0 : −½Log 2 + π ; I = π + ½Log 2 | 1 |

### E3. Courbe polaire (12 points, modèle MT 2014) — `a1-polar-curve`

`ρ = 4·tan(φ/2)`, φ ∈ [0 ; π[. Formule donnée : tan(φ/2) = sin φ/(1 + cos φ).

| Partie | Attendu | Points |
|---|---|---|
| (a) Limites quand φ → π⁻ | x → −∞ ; y = 4(1 − cos φ) → 8 ; asymptote horizontale y = 8 | 3 |
| (b) ρ̇ simplifié | ρ̇ = 4/(1 + cos φ) | 2 |
| (c) Pente | y′ = sin φ(1 + cos φ)/(cos²φ + cos φ − 1) ; au passage ẏ = 4 sin φ | 3 |
| (d) Point sur Oy et pente | φ = π/2 : P = (0 ; 4), y′(P) = −1 | 1 |
| (e) Tangentes horizontales | ẏ = 0 ⇔ φ = 0 : l'origine | 1 |
| (f) Esquisse | choisir le bon graphe parmi 4 | 2 |

### E4. Définition de C¹ et fonction par morceaux (6 points, modèle GM 2020 et 2022) — `a1-c1-def`, `a1-c1-proof`

(a) Donner la définition de C¹(I) pour un intervalle ouvert I. (b) Soit f : ]−1 ; 1[ → ℝ, `f(x) = Arctg(1/x) + x²` si 0 < x < 1, `f(x) = π/2 − x` si −1 < x ≤ 0. Montrer que f ∈ C¹(]−1 ; 1[).

| Partie | Attendu | Points |
|---|---|---|
| (a) Définition | f dérivable en tout point de I et f′ continue sur I | 1 |
| (b) Hors de 0 | f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ ; f′(x) = −1/(1 + x²) + 2x si x > 0, f′(x) = −1 si x < 0 | 1 |
| (b) Continuité en 0 | Arctg(1/x) → π/2 quand x → 0⁺ ; f(0) = π/2 | 0,5 |
| (b) f′(0) par la définition | à droite : Arctg(1/h) = π/2 − Arctg h (h > 0), donc (f(h) − f(0))/h = (−Arctg h + h²)/h → −1 ; à gauche : −1 ; f′(0) = −1 | 2 |
| (b) Continuité de f′ en 0 | lim_{x→0⁺} f′(x) = −1 = lim_{x→0⁻} f′(x) = f′(0) | 1 |
| (b) Conclusion | f ∈ C¹(]−1 ; 1[) | 0,5 |

### E5. Extrema globaux sur un segment (7 points, modèle GM 2019) — `a1-extrema-global`

`f(x) = (x² + 3)/(x + 1)` sur [0 ; 3]. (a) Montrer que f est bien définie et continue sur [0 ; 3]. (b) Trouver ses extrema globaux.

| Partie | Attendu | Points |
|---|---|---|
| (a) Bien définie | x + 1 ≥ 1 > 0 sur [0 ; 3] ; quotient de fonctions continues | 1 |
| (b) Dérivée | f′(x) = (x² + 2x − 3)/(x + 1)² = (x + 3)(x − 1)/(x + 1)² | 2 |
| (b) Candidats | bornes 0 et 3 ; f′ = 0 en x = 1 (x = −3 hors de [0 ; 3]) ; f′ existe partout | 1 |
| (b) Valeurs | f(0) = 3, f(1) = 2, f(3) = 3 | 2 |
| (b) Conclusion | max global 3, atteint en 0 et en 3 ; min global 2, atteint en 1 | 1 |

### E6. Série à paramètre (9 points, modèle MT 2014) — `a1-ser-param`

Pour α > 0, nature de `Σ_{k≥1} (−1)ᵏ·k^(2α)/(αᵏ + k³)` : absolument convergente, semi-convergente ou divergente ?

| Partie | Attendu | Points |
|---|---|---|
| α > 1 | d'Alembert sur \|uₖ\| : ((k + 1)/k)^(2α)·(αᵏ + k³)/(αᵏ⁺¹ + (k + 1)³) → 1/α < 1 : absolument convergente | 4 |
| 0 < α < 1 | αᵏ → 0, \|uₖ\| ~ 1/k^(3 − 2α) avec 3 − 2α > 1 : absolument convergente (comparaison) | 3 |
| α = 1 | \|uₖ\| = k²/(1 + k³) ~ 1/k : pas absolument ; décroissante pour k ≥ 2 et → 0 : Leibniz, semi-convergente | 2 |
