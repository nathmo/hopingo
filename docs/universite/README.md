# Spécification d'implémentation : du gymnase à la 2e année de l'EPFL

Ce dossier dit comment construire [plan-universite.md](../plan-universite.md). Il s'adresse aux agents et aux développeurs qui écrivent le code. Le plan dit **quoi** enseigner et **pourquoi**. Ce dossier dit **comment** le construire, avec assez de détails pour qu'un agent puisse implémenter une étape sans poser de questions.

| Fichier | Contenu |
|---|---|
| `README.md` (ce fichier) | Décisions, architecture, formats de données, moteur, juges, mode examen, tests, étapes U0 à U10 avec leurs critères de fin |
| `G-gymnase-1.md` | Catalogue des compétences G9, G0, G1, G2, G3, G5 |
| `G-gymnase-2.md` | Catalogue des compétences G4, G10, G6, G7, G8 |
| `A1-analyse-1.md` | Catalogue A1 |
| `L-M-algebre-lineaire.md` | Catalogue L et M |
| `A2-analyse-2.md` | Catalogue A2 |
| `VCF-analyse-3-4.md` | Catalogue V, C et F |
| `P-probabilites.md` | Catalogue P |
| `N-analyse-numerique.md` | Catalogue N |
| `INDEX.md` | Toutes les compétences en un tableau, les racines, les branches, la plus longue chaîne, les ids `@alg:` attendus |
| `check/check.py` | Vérifie la cohérence des catalogues : `python docs/universite/check/check.py`. À lancer après chaque modification d'un catalogue. |

En tout : 487 compétences et 859 pièges. Seule `c-conformal` est optionnelle.

Chaque catalogue suit le gabarit du §15. Une étape de construction (§14) implémente un ou plusieurs catalogues.

Les identifiants de code, les noms de fichiers et les commentaires sont en anglais, comme dans le reste du dépôt. Les textes affichés à l'élève sont en français.

---

## 1. Décisions fixées

| Sujet | Décision |
|---|---|
| Section EPFL | **Pas de section dans le profil.** Les contenus suivent Microtechnique (MT) en année normale. Les compétences propres à une section portent une étiquette (`GM`, `MT`, `MT/SV`), qui est **seulement informative**. |
| Obligatoire par défaut | **Tout est obligatoire par défaut**, y compris ce qui n'est enseigné qu'en GM ou qu'en MT. Apprendre plus que le strict nécessaire est voulu : le but est de rendre les maths agréables, pas de minimiser l'effort. `optional: true` est réservé aux contenus qu'aucun cours n'utilise : la liste est au §8.2. |
| Parcours en branches | Après le calcul de base, le parcours **se ramifie**. Une compétence s'ouvre dès que ses **vrais** prérequis sont acquis, et plusieurs branches sont ouvertes en même temps. L'année d'une compétence n'est qu'une indication (§8.4). |
| Analyse III et IV | Les modules V (analyse vectorielle) et C (analyse complexe) sont en BA3 (`year: 15`). Le module F (Fourier, Laplace, EDP, distributions) est en BA4 (`year: 16`). C'est l'ordre MT. |
| Probabilités et statistique | On couvre **les deux cours**, MATH-234 (GM) et EE-209 (MT). Le tronc commun et les ajouts des deux cours sont tous dans le parcours. Les étiquettes `MATH-234` et `EE-209` sont seulement informatives. |
| Mode examen | Il sert à **mesurer si l'élève est prêt** (§10) : il reprend le format des examens, avec les points négatifs, un minuteur et aucune aide, puis donne un bilan. |
| Langue | **Français partout**, BA3 et BA4 compris. Une traduction complète de l'app viendra plus tard : les textes affichés restent dans les fichiers de contenu et dans les chaînes de l'interface, jamais construits à partir de morceaux de phrases. |
| Code à compléter | **Python**, avec un petit interpréteur écrit à la main (§12). |
| Contenu de BA5 et plus | L'automatique, l'observabilité, Lyapunov, l'ACP et Kalman sont dans un plan séparé, [plan-ba5-et-plus.md](../plan-ba5-et-plus.md). Ils ne sont pas construits ici. |
| Notation | Celle des cours. Reste d'un DL : `xⁿ·ε(x)`, avec `o(xⁿ)` accepté en saisie. Courbes : `dl`. Surfaces : `ds`. Produit vectoriel : `∧`, avec `×` accepté. Transformée de Fourier avec 1/√(2π). Série de Fourier avec a₀/2. Logarithme `Log` ou `ln`, les deux acceptés. Arc tangente `Arctg` ou `arctan`, les deux acceptés. Intervalles `]a ; b[`, avec un **point-virgule**, parce que la virgule est le séparateur décimal. |
| Dépendances | Ce plan suppose construites les étapes 4 à 7 de [plan-calcul-algebre.md](../plan-calcul-algebre.md) : lettres et forme normale, lignes d'équations, repère interactif, fractions rationnelles. Si une pièce manque au moment de l'étape U0, U0 la construit avec l'API du §4. Les fonctions déjà écrites sont réutilisées, on ne les double pas. |
| Pas de dépendance | On garde la règle du dépôt : ni bibliothèque, ni build, ni serveur. Tout est en modules ES. L'affichage passe par MathML natif. |

---

## 2. Ce qui existe déjà

À lire avant de commencer : [README.md](../../README.md), puis les fichiers ci-dessous.

| Pièce | Fichier | Ce qu'on réutilise |
|---|---|---|
| Rationnels exacts | `js/math/rational.js` (`Q`) | Tous les calculs exacts sur ℚ |
| Expressions de l'école | `js/math/expr.js` | Ne pas casser : les unités 5H–11H en dépendent. Le noyau `js/cas/` est un **sur-ensemble** indépendant. |
| Juge de ligne | `js/math/judge.js` | Le modèle : une ligne est jugée par rapport à **la ligne précédente de l'élève** |
| Pièges | `js/math/malrules.js`, `diagnose.js` | Le format des règles (`id`, `family`, `tag`, `skill`, `repair`, `name`, `example`, `explain`) et `FAMILIES` |
| Vérificateurs spéciaux | `js/math/checkers.js` | Le modèle des réponses qui ne sont pas un nombre |
| Items | `js/content/items.js` | Les champs communs : `skill`, `level`, `type`, `prompt`, `baits`, `solution`, `expectedSec`, `key` |
| Compétences | `js/content/skills.js` | Le format d'une compétence, `UNITS`, `YEARS`, le tri du parcours par `year` |
| Générateurs | `js/content/generators.js` | `generate(skillId, level, rng, profile)` ; un fichier par unité qui exporte `GEN` |
| Moteur | `js/engine/learner.js`, `session.js` | BKT, échelle de niveaux, prérequis à réparer, révisions, pièges, `OP_SKILL` (crédit indirect) |
| Interface | `js/ui/exercises.js` (`MOUNTS[type]`), `keypad.js` (`KEYSETS`, `MathInput`) | Une fonction de montage par type d'item |
| Tests | `tests/*.test.js` (`node --test`) | Chaque générateur produit 200 items cohérents ; chaque piège pointe vers une compétence |
| Revue | `tools/samples.js` → `docs/samples-<unit>.md` | À étendre aux nouveaux types (`describe()` dans `generators.js`) |

---

## 3. Architecture cible

```
js/
  cas/                 noyau symbolique (pur, sans DOM, testé sous Node)
    ast.js             types de nœuds, constructeurs, walk, map, equalsStructural
    parse.js           texte du clavier → AST (sur-ensemble de expr.js)
    print.js           AST → texte clavier ; AST → texte lisible
    mathml.js          AST → chaîne MathML
    poly.js            polynômes à plusieurs variables sur ℚ (creux)
    ratfun.js          fractions rationnelles : forme normale, pgcd
    normal.js          simplification et forme normale ; equalExact(a, b)
    complex.js         ℚ(i) exact et complexes flottants
    numeric.js         évaluation flottante (réelle et complexe), domaines, sampler
    equiv.js           equivalent(a, b, {vars, domain}) : exact, sinon numérique
    diff.js            dérivation symbolique, dérivées partielles
    series.js          séries tronquées (DL, Laurent)
    limit.js           limites : séries, sinon suites numériques
    integrate.js       table de primitives (pour les corrigés), quadrature de contrôle
    matrix.js          matrices sur ℚ : rref avec journal des opérations, rang, det, polynôme caractéristique, noyau, inverse, LU, QR, Cholesky
    linalg-float.js    SVD, valeurs propres flottantes, exponentielle de matrice, normes, conditionnement
    sets.js            ensembles de réels (unions d'intervalles), familles périodiques (a + kπ)
    logic.js           formules logiques en jetons : forme normale négative, équivalence
    stats.js           Φ, Φ⁻¹, Student, χ², binomiale, Poisson, arrondi d'un IC
    fp.js              arithmétique flottante simulée à p chiffres
    rules/             pièges symboliques, un fichier par module (§7)
  judges/              juges de ligne (§5), un fichier par sorte, plus index.js (registre)
  py/                  interpréteur Python (§12) : lexer.js, parser.js, interp.js, builtins.js
  content/uni/         une paire de fichiers par module :
    <unit>.skills.js   les compétences du module (format du §8)
    <unit>.js          export const GEN = { skillId: (level, rng, profile, opts) => item }
    exams.js           plans d'examen (§10)
  engine/exam.js       mode examen
  ui/
    lines.js           montage des items `lines` (généralise `steps`)
    blocks.js          preuves en blocs, négations, définitions
    matrix-input.js    saisie d'une matrice case par case
    code-input.js      éditeur des trous de code
    table-input.js     tableaux d'itérations
    screens/exam.js    écran du mode examen
tests/
  cas.test.js  judges.test.js  py.test.js  uni-content.test.js  exam.test.js
```

`js/content/skills.js` importe chaque `content/uni/<unit>.skills.js` et les ajoute à `ALL`. `js/content/generators.js` fusionne leurs `GEN`. `js/math/malrules.js` exporte `RULE_BY_ID`, qui doit aussi inclure les règles de `js/cas/rules/*.js`. On fusionne au même endroit.

---

## 4. Le noyau symbolique `js/cas/`

### 4.1 Nœuds

```js
{t:'num', v:Q, s}                 // nombre exact, s = écriture d'origine
{t:'float', x}                    // nombre décimal approché (statistique, numérique)
{t:'const', name}                 // 'pi' | 'e' | 'i' | 'inf'
{t:'sym', name, sub?}             // variable : x, y, λ, ε, x_k (sub = nœud ou texte)
{t:'neg', e}  {t:'paren', e}
{t:'add', terms:[…]}              // n-aire après normalisation ; le parseur produit d'abord des bin
{t:'bin', op:'+'|'-'|'×'|'÷', l, r}
{t:'frac', n, d}  {t:'pow', b, e}  {t:'sqrt', e}  {t:'root', n, e}
{t:'abs', e}
{t:'fn', name, args:[…]}          // sin cos tan cot exp Log ln sinh cosh tanh arcsin arccos Arctg argsh argch argth Re Im conj arg
{t:'deriv', e, v, n}              // dⁿe/dvⁿ ; y' se lit {t:'deriv', e:sym y, v:x, n:1}
{t:'pderiv', e, vs:[…]}
{t:'int', e, v, lo?, hi?}         // primitive ou intégrale définie (bornes 0⁺ et 1⁻ : {t:'side', e, dir:'+'|'-'})
{t:'sum', e, k, lo, hi}           // Σ
{t:'lim', e, v, to, dir?}
{t:'eps', v, at?}                 // ε(x), reste d'un DL ; o(xⁿ) est lu comme xⁿ·ε(x)
{t:'rel', op:'='|'<'|'≤'|'>'|'≥'|'≠', l, r}
{t:'mat', rows:[[…]]}  {t:'vec', items:[…]}
{t:'set', kind:'interval', lo, hi, loOpen, hiOpen} | {t:'set', kind:'union', parts} | {t:'set', kind:'finite', items}
{t:'family', base, period, k}     // x = π/6 + 2kπ
{t:'prob', event}                 // P(A), P(A | B) : symboles liés à des valeurs par l'item
{t:'cplx', re, im}                // a + bi exact (Q, Q)
```

### 4.2 Saisie (`parse.js`)

C'est un sur-ensemble de `expr.js`. La grammaire est écrite ici pour que le clavier et le parseur restent d'accord.

- **Nombres.** Virgule décimale : « 1,5 », avec « 1.5 » accepté et normalisé. `/` est la barre de fraction et lie plus fort que tout, comme dans `expr.js`.
- **Multiplication implicite.** `2x`, `3xy`, `x(x+1)`, `(x+1)(x−1)`, `2sin(x)`, `ab` (= a·b si a et b sont des variables déclarées par l'item). Une lettre suivie de `(` est un appel de fonction seulement si c'est le nom d'une fonction connue, ou une fonction déclarée par l'item (f, g, y…).
- **Fonctions.** On écrit `sin(x)`. `sin x` est accepté seulement si l'argument est un seul atome. `sin^2(x)` veut dire (sin x)². `sin^(-1)` est refusé avec le message « écris arcsin ».
- **Puissances.** `x^2`, `e^(x+1)` ; `e^x` est aussi lu comme `exp(x)`. Racines : `√x`, `√(x+1)`, `root(3, x)` (touche ∛).
- **Indices et primes.** `x_k`, `x_(k+1)`, `y'`, `y''`.
- **Modèles.** Les touches ∫, Σ, lim, d/dx ouvrent un modèle à cases : intégrande, variable, bornes. Le parseur lit la forme linéaire produite : `int(f, x)`, `int(f, x, a, b)`, `sum(f, k, 1, inf)`, `lim(f, x, 0, +)`, `d(f, x)`.
- **Relations et ensembles.**
  - Relations : `=`, `<`, `≤`, `>`, `≥`, `≠`.
  - Intervalles : `]2 ; 5[`, `[0 ; +∞[`. Union : `∪`. Ensemble fini : `{1 ; 2}`.
  - Familles : `π/6 + 2kπ`, avec `k` réservé aux entiers.
- **Matrices et vecteurs.** Ils viennent de la grille (`matrix-input.js`), qui produit `[[1,2],[3,4]]` avec la virgule entre les cases. Les nombres décimaux sont interdits dans la grille. On écrit 3/2, pas 1,5. Vecteur : `(1 ; −2 ; 3)`.
- **Constantes.** `π`, `e`, `i`. `i` est l'unité imaginaire seulement si l'item déclare `complex: true`. Sinon, c'est un indice possible.
- **Opérations de Gauss.** `L2 ← L2 − 3L1`, `L1 ↔ L3`, `L2 ← (1/2)L2`, que la touche ← aide à écrire. Elles sont lues par `judges/rowops.js`, pas par `parse.js`.
- **Erreurs.** Chaque erreur de lecture a un message en français qui dit où est le problème.

### 4.3 API attendue (signatures)

```js
// parse.js
parse(text, {vars, funcs, complex}) → Node          // lance ParseError(message, position)
tryParse(text, opts) → Node | null
// print.js, mathml.js
toText(node) → string          // revient exactement en entrée de parse
toMathML(node, {highlight}) → string   // '<math>…</math>'
// normal.js
normalize(node) → Node         // forme canonique pour les expressions rationnelles en les variables
equalExact(a, b) → true | false | null  // null : impossible de décider exactement
// numeric.js
evalFloat(node, env) → number | {re, im} | NaN
sample(vars, domain, rng, k) → env[]   // k points dans le domaine, loin des singularités
// equiv.js
equivalent(a, b, {vars, domain, rng}) → {equal: boolean, method: 'exact'|'numeric', witness?: env}
// diff.js
diff(node, v) → Node ;  pdiff(node, [v…]) → Node
// series.js
series(node, v, at, order) → {coeffs: (Q|float)[], exact: boolean, valuation}
seriesToNode(s, v, at) → Node            // P(x) + xⁿ·ε(x)
// limit.js
limit(node, v, to, dir) → {value: Q|float|'+inf'|'-inf'|'none', method}
// matrix.js (sur ℚ)
rref(A) → {R, pivots, ops:[{kind:'swap'|'scale'|'add', i, j, k}]}
rank(A)  det(A)  inverse(A)  kernel(A) → basis[]  charpoly(A) → coeffs (Q)
identifyRowOp(A, B) → op | null          // B = une opération élémentaire appliquée à A ?
rowEquivalent(A, B) → boolean
lu(A) → {L, U, P}   qrGS(A) → {Q, R}  (exact avec racines : Q est rendu en colonnes non normées + normes)
cholesky(A) → L | null                    // exact si les carrés tombent juste, sinon flottant
// linalg-float.js
eigSym(A)  svd(A) → {U, S, V}  expm(A, t)  norm(A, p)  cond(A, p)
// sets.js
solutionSet(relNode, v, domain) → Set ; setEqual(S1, S2, {tol}) ; fromFamilies(…)
// logic.js
nnf(formula) ; equivalentLogic(f, g) → boolean   // quantificateurs à portée finie de symboles
// stats.js
Phi(z) PhiInv(p) tCdf(t, ν) tInv(p, ν) chi2Inv(p, ν) binom(n, k, p) poisson(k, λ) roundCI(lo, hi, digits)
// fp.js
fl(x, digits) ; ops avec arrondi après chaque opération
```

### 4.4 Règles de décision

- **D'abord exact.** On utilise `equalExact` dès que les deux expressions sont rationnelles en leurs variables, matrices sur ℚ comprises.
- **Comparaison numérique** (`equiv.js`), quand l'exact ne décide pas :
  - 12 points tirés dans le domaine déclaré ;
  - un point est rejeté si l'une des deux expressions n'y est pas définie, ou si sa valeur dépasse 10⁸ ;
  - il faut au moins 8 points valides ;
  - deux valeurs sont égales si |a − b| ≤ 1e−9·(1 + |a| + |b|) ;
  - un seul point qui diffère suffit pour dire « différent », et l'app garde ce point comme témoin.
- **Domaine.** Chaque item déclare le domaine de ses variables (`domain: {x: [0.1, 3]}`). Par défaut, c'est [−3, 3] privé de ±0,05 autour des singularités détectées.
- **Constantes d'intégration.** Les primitives sont comparées par **dérivation**, jamais par égalité directe. Ainsi, F et F + 3 sont toutes deux justes.
- **Constantes des EDO.** C, C₁, C₂ sont des symboles libres. Une ligne « y = … » est juste si elle vérifie l'équation pour 3 tirages de constantes et que le nombre de constantes libres est le bon (§5, `ode`).
- **Déterminisme.** Tous les tirages passent par `makeRng` (`js/content/random.js`), avec une graine dérivée de `item.key`, pour que le même item soit toujours jugé de la même façon.

---

## 5. Les juges de ligne `js/judges/`

### 5.1 Interface commune

```js
// judges/index.js
export const JUDGES = { value, equiv, antideriv, definite, limit, series, ode, solset, logic, rowops,
  eigvec, span, factor, prob, stat, iter, param, boundary, complex, transform, delta, geom, conic, poly };

// chaque juge exporte :
judgeLine(cfg, prev, input, state) → Verdict
isFinal(cfg, node) → true | string        // string : message « juste, mais termine… »
start(cfg) → Node                        // la ligne 0 affichée
```

`Verdict` étend celui de `js/math/judge.js` :

```js
{kind: 'parse'|'same'|'ok'|'done'|'wrong'|'stay'|'form', node, message?, rule?, diag?, credit?:[skillId]}
```

| `kind` | Sens | Effet dans l'interface |
|---|---|---|
| `parse` | Illisible | Le champ vibre et affiche le message. La ligne n'est pas comptée. |
| `same` | Rien n'a changé | « Avance d'au moins une étape. » |
| `ok` | Ligne juste | La ligne est ajoutée et l'élève continue. |
| `done` | Juste, et la forme finale est atteinte | L'item est réussi. |
| `stay` | Juste mais incomplet ou mal présenté (pas irréductible, + C absent, ordre trop faible) | Message, et la ligne reste à corriger. |
| `form` | La forme demandée n'est pas respectée | Message. |
| `wrong` | L'invariant est cassé | Diagnostic (§7), puis « Corriger » ou « Continuer avec ma ligne » si `followError`. |

`state` garde ce que le juge doit retenir d'une ligne à l'autre : les décisions prises (par exemple « posons u = x² »), l'ordre annoncé, les constantes introduites.

### 5.2 Les sortes de juges

| Sorte | `cfg` | Une ligne est juste si… | Forme finale |
|---|---|---|---|
| `value` | `{form}` | Même valeur exacte que la précédente. Adaptateur de `js/math/judge.js`. | Celle de `form` |
| `equiv` | `{vars, domain, target?}` | `equivalent(prev, line)` | `target(node)` : par exemple « pas de ′ », « factorisé », « développé et ordonné » |
| `antideriv` | `{v, f}` | La ligne a la forme `G + ∫h dv [+ C]`, et d/dv G + h ≡ f. Une ligne intermédiaire peut contenir plusieurs ∫. | Aucune ∫ restante et `+ C` présent. Sinon `stay` : « N'oublie pas la constante. » |
| `definite` | `{value}` | Expression en nombres et ∫ définies, de même valeur (exacte, sinon quadrature à 1e−9) | Nombre exact simplifié |
| `limit` | `{v, to, dir}` | La ligne est une expression (sous-entendu « lim de … ») qui a la même limite. Si l'élève remplace par un équivalent, la limite doit être conservée. | Valeur, `±∞` ou « n'existe pas » |
| `series` | `{v, at, order}` | Les coefficients jusqu'à l'ordre que la ligne annonce sont justes, et cet ordre est ≤ l'ordre que les lignes précédentes permettent | Polynôme ordonné, avec un reste à l'ordre demandé |
| `ode` | `{eq, unknown, v, ic?, order}` | Ligne « y = … » : elle vérifie l'équation pour 3 tirages des constantes, et le nombre de constantes vaut l'ordre. Lignes d'étape « y_h = … » et « y_p = … » : chacune vérifie son équation (homogène, ou complète sans constantes). Ligne « facteur intégrant μ = … » : μ′/μ = coefficient attendu. | Solution générale, ou solution qui respecte `ic` |
| `solset` | `{v, domain, periodic?}` | La ligne est une relation ou un ensemble qui a le même ensemble de solutions sur le domaine (`sets.js`) : comparaison exacte aux bornes, puis sur une grille de 400 points | Ensemble écrit en intervalles ou en familles |
| `logic` | `{}` | La formule en jetons est équivalente à la cible (`logic.js`, forme normale négative) | Pas de ¬ devant un quantificateur ou un connecteur |
| `poly` | `{v}` | Même polynôme ; division euclidienne : la ligne A = BQ + R est une identité, avec deg R < deg B | Q et R donnés |
| `rowops` | `{A}` (matrice augmentée) | La ligne est une matrice, ou une opération annoncée (`L2 ← L2 − 3L1`) que l'app applique. Elle est juste si elle est équivalente à la précédente. Si une opération est annoncée, la matrice doit être son résultat exact. Si une matrice est donnée sans opération, l'app reconnaît l'opération (`identifyRowOp`) ou accepte plusieurs opérations si `cfg.multi`. | Forme échelonnée (réduite si `cfg.reduced`), puis solution paramétrique jugée par `span` et `equiv` |
| `eigvec` | `{A, λ}` | Le vecteur v est non nul et (A − λI)v = 0. Tout multiple est accepté. | Vecteur |
| `span` | `{basis, require:'basis'|'orthogonal'|'orthonormal'}` | Les vecteurs engendrent le même sous-espace et satisfont l'exigence | Liste de vecteurs |
| `factor` | `{A, kind:'LU'|'PLU'|'QR'|'cholesky'|'PDP'|'orthodiag'|'SVD'|'spectral'}` | Une ligne peut donner tout ou partie des facteurs. Chaque facteur donné doit avoir la bonne forme (triangulaire, diagonale unité selon la convention, orthogonal, diagonal positif), et le produit doit redonner A quand tous sont là. | Tous les facteurs ; `askCoef` (§6) pour l'examen |
| `prob` | `{symbols: {'P(M)': '1/100', …}}` | Même valeur exacte, les symboles remplacés par leurs valeurs | Fraction irréductible ou décimal à la précision demandée |
| `stat` | `{decimals, ciRule?}` | Même valeur à ½·10^(−decimals) près. Pour un IC, la borne inférieure est arrondie vers le bas et la supérieure vers le haut. | Valeur, décision et phrase d'interprétation (un QCM qui suit) |
| `iter` | `{phi, cols, tol}` | La ligne k + 1 est égale à Φ(**ligne k de l'élève**) à `tol` près (relatif 1e−6 par défaut). Les colonnes dérivées (erreur, incrément, rapport) sont recalculées à partir des valeurs de l'élève. | Critère d'arrêt atteint, ou nombre de lignes demandé |
| `param` | `{curve | surface, orientation}` | La paramétrisation couvre le bon objet. On le vérifie sur 20 points (chaque point sur l'objet, et l'image couvre l'objet), avec la bonne orientation (signe de γ′·t ou de σ_u ∧ σ_v·n) et des bornes justes. | Paramétrisation et bornes |
| `boundary` | `{surface}` | Liste de morceaux orientés. Ceux qui se réduisent à un point ou qui s'annulent sont retirés, et les autres sont dans le bon sens. | Bord orienté |
| `complex` | `{}` | Même valeur dans ℚ(i) quand c'est possible, sinon un complexe flottant | Forme demandée (a + bi, re^(iθ)) |
| `transform` | `{kind:'fourier'|'laplace', of, v, s}` | Par table, la ligne est la transformée de la ligne de départ, ou sa transformée inverse. Contrôle par l'intégrale numérique en 6 points de s. | Plus de 𝓕 ni de 𝓛 dans la ligne |
| `delta` | `{f, a, L, mode:'delta'|'N'}` | δ(ε) > 0 pour ε ∈ ]0 ; 1], et l'implication est vraie sur un échantillon dense, avec un contrôle par intervalles pour les familles affines et quadratiques | δ donné |
| `geom` | `{object:'line2'|'line3'|'plane'|'circle'|'sphere'}` | Même objet : équations proportionnelles, ou paramétrique et cartésienne qui décrivent le même ensemble | Forme demandée |
| `conic` | `{equation}` | Même conique : équations proportionnelles. Les éléments (centre, foyers, axes, asymptotes) sont comparés un par un. | Liste des éléments demandés |

### 5.3 Lignes de décision

Une ligne de décision n'est pas jugée par l'invariant. Elle est choisie dans un menu, par exemple :

```js
{kind:'decision', prompt:'Quelle méthode ?', options:[
  {id:'parts', label:'Intégration par parties', valid:true, quality:'good', then:{ask:'u =', judge:'equiv', expect:'x^2'}},
  {id:'parts-bad', label:'Parties avec u = eˣ', valid:true, quality:'poor', why:'Juste, mais le degré du polynôme monte : l\'intégrale devient plus difficile.'},
  {id:'subst', label:'Substitution', valid:false, why:'Aucune partie de l\'intégrande n\'est la dérivée d\'une autre.'}]}
```

- `then` demande une saisie, comme « u = … ». Elle est jugée par le juge indiqué et rangée dans `state`.
- `quality:'poor'` laisse continuer. Le message s'affiche **après** la ligne suivante, quand l'élève voit que le calcul se complique.
- Aux niveaux libres (4 et 5), l'élève peut sauter la décision et écrire directement la ligne de calcul. La décision est alors déduite. Si elle ne peut pas l'être, aucun crédit « méthode » n'est donné.

---

## 6. Les items

Les types existants restent tels quels : `steps`, `answer`, `mcq`, `fact`, `shade`, `numberline`, `match`. Les nouveaux types gardent les champs communs, avec en plus :

```js
hints: [{level:1, html}, {level:2, html}, {level:3, html}]   // méthode, ligne à trous, ligne entière
subgoals: [{id, label, skill}]                                  // crédit indirect (§9)
exam: false | {format:'mcq'|'tf'|'coef'|'open', points}         // variante d'examen
declares: {vars, funcs, complex, domain}                        // pour parse et equiv
```

| Type | Champs propres | Montage |
|---|---|---|
| `lines` | `start:{math}`, `judge:{kind, …cfg}`, `mode:'guided'|'tap'|'free'`, `script:[ScriptLine]`, `final:{form, askCoef?}`, `followError` | `ui/lines.js` |
| `tf` | `statement` (HTML), `truth`, `counter?: {kind, params, keys}`, `explanation` | Vrai/faux. Si l'élève répond « faux », on lui demande un contre-exemple quand `counter` existe. |
| `example` | `property:{kind, params}`, `keys`, `describe` | Saisie d'un objet (nombre, fonction, suite, matrice), vérifié par `judges/examples.js` |
| `blocks` | `blocks:[{id, html, needs:[ids], distractor?}]`, `goal`, `mode:'order'|'frame'|'define'` | `ui/blocks.js`. On accepte tout ordre qui respecte `needs`. Les leurres font perdre. |
| `tokens` | `palette:[jetons]`, `target` (formule), `judge:'logic'` | Construire une négation ou une définition avec ∀ ∃ ¬ ⇒ ∧ ∨ et des morceaux |
| `table` | `columns:[{id, label, derived?}]`, `rows`, `seed`, `judge:{kind:'iter', …}`, `then?: item` | `ui/table-input.js` |
| `readtable` | `table:{columns, rows}`, `question: item` (`mcq` ou `answer`) | Lecture d'un tableau d'erreurs |
| `code` | `lang:'python'`, `source` (avec des trous `???`), `tests:[{setup?, expr, expect, tol?}]`, `maxSteps` | `ui/code-input.js` ; jugé par `js/py/` |
| `matrix` | `rows`, `cols`, `judge:{…}` | Réponse en grille |
| `domain` | `region` (prédicat), `vars`, `answerShape:'typeI'|'typeII'|'polar'` | Bornes d'une intégrale. Jugé en échantillonnant la région. |
| `plot` | `task:'region'|'point'|'curve'|'conic'|'field'`, `…` | Le repère interactif du plan d'algèbre (étape 6) |
| `problem` | `parts:[item]`, `points:[[par étape]]`, `noHints:true`, `resumable:true` | Problème entier, avec barème par étape. Sauvegarde au milieu (§9). |

`ScriptLine` :

```js
{kind:'eq', math, subgoal, note?, blanks?:[indices de jetons]}   // ligne de calcul (blanks pour le mode guidé)
{kind:'decision', …}                                              // §5.3
{kind:'note', html}                                               // phrase de justification, sans saisie
{kind:'rule', ask:'Quelle règle ?', options:[…], correct}         // auto-explication (§9)
```

`final.askCoef = {label:'ℓ₄₂ de L', path:[3,1], factor:'L'}` : la dernière question ne demande qu'un coefficient. Ce format sert aux QCM « trouver un coefficient ».

**Variantes d'examen.** Chaque générateur accepte un 4e argument, `opts`. Avec `opts.exam = 'mcq'|'tf'|'coef'|'open'`, il produit la variante d'examen de la même compétence :
- `mcq` : quatre options. Les distracteurs sont produits par les pièges.
- `tf` : un énoncé, et un contre-exemple quand l'énoncé est faux.
- `coef` : un `lines` avec `askCoef`.
- `open` : un `problem`.

Le catalogue dit quelles variantes chaque compétence doit fournir.

---

## 7. Diagnostic des pièges

Les pièges des nouveaux modules sont dans `js/cas/rules/<unit>.js` :

```js
{
  id: 'a1_chain_forgot',            // préfixe = code du module + '_'
  family: 'calculus',               // FAMILIES existantes, plus : calculus, linear, proba, numeric, logic, notation, geometry, method
  tag: 'R' | 'C' | 'E',             // recherche, correction d'examen, expérience (à faire relire)
  skill: 'a1-deriv-chain',          // compétence où le piège est enseigné
  repair: 'g6-deriv-rules',         // compétence à réparer si le piège revient
  judges: ['equiv', 'antideriv'],   // juges qui essaient ce piège
  name: 'Règle de chaîne oubliée',
  example: ['(sin 2x)′ = cos 2x', '(sin 2x)′ = 2cos 2x'],
  // Produit les lignes qu'écrirait un élève qui suit ce piège, à partir de la ligne précédente.
  transform: (prev, ctx) => [Node…],
  // Ou, pour une réponse finale : les valeurs fausses que donne ce piège.
  wrongValues?: (item) => [{value, …}],
  explain: (ctx) => 'Tu as dérivé sin, mais pas ce qu\'il y a dedans : la dérivée de 2x, c\'est 2, et elle multiplie cos 2x.',
}
```

**Méthode.** Quand une ligne est `wrong`, `judges/diagnose.js` fait trois choses :
1. Il appelle `transform(prev)` sur chaque règle dont `judges` contient la sorte du juge.
2. Il compare chaque candidat à la ligne de l'élève avec **la même équivalence que le juge** (dérivée de la ligne pour `antideriv`, même polynôme pour `poly`…).
3. La première règle qui correspond nomme l'erreur, et `explain` reçoit les nombres de l'élève dans `ctx`.

C'est la méthode actuelle de `diagnose.js`, étendue aux expressions avec des lettres.

Les pièges de calcul de l'école (signes, fractions, priorités) restent actifs : avant les règles du module, `diagnose.js` essaie le diagnostic existant sur les sous-expressions numériques qui ont changé.

**Distracteurs de QCM.** Ce sont les candidats `transform` ou `wrongValues` appliqués à la question. Chaque option fausse porte la `rule` qui l'a produite.

---

## 8. Compétences et unités

### 8.1 Unités

| Module | `unit` | Titre | Préfixe des compétences | Préfixe des pièges | Années |
|---|---|---|---|---|---|
| G9 | `logique` | Logique et langage | `g9-` | `g9_` | 12 |
| G0 | `polynomes` | Polynômes | `g0-` | `g0_` | 12 |
| G1 | `fonctions` | Fonctions et inéquations | `g1-` | `g1_` | 12, 12.5 |
| G2 | `explog` | Exponentielles, logarithmes, hyperboliques | `g2-` | `g2_` | 12, 12.5 |
| G3 | `trigo` | Trigonométrie | `g3-` | `g3_` | 12, 12.5 |
| G5 | `recurrence` | Suites, sommes, récurrence | `g5-` | `g5_` | 12 |
| G4 | `geoan` | Géométrie analytique | `g4-` | `g4_` | 12, 12.5 |
| G10 | `coniques` | Cercles et coniques | `g10-` | `g10_` | 12.5 |
| G6 | `analyse0` | Analyse de base | `g6-` | `g6_` | 12, 12.5 |
| G7 | `combi` | Combinatoire et probabilités | `g7-` | `g7_` | 12 |
| G8 | `complexes` | Nombres complexes | `g8-` | `g8_` | 12, 12.5 |
| A1 | `analyse1` | Analyse I | `a1-` | `a1_` | 13 |
| L | `alglin` | Algèbre linéaire | `l-` | `l_` | 13 |
| A2 | `analyse2` | Analyse II | `a2-` | `a2_` | 14 |
| V | `vecto` | Analyse vectorielle | `v-` | `v_` | 15 |
| C | `cplx` | Analyse complexe | `c-` | `c_` | 15 |
| P | `proba` | Probabilités et statistique | `p-` | `p_` | 15, 16 |
| F | `fourier` | Fourier, Laplace, EDP | `f-` | `f_` | 16 |
| N | `numerique` | Analyse numérique | `n-` | `n_` | 16 |
| M | `matrices` | Analyse matricielle | `m-` | `m_` | 16 |

- `year` est un nombre : 12 = maturité, 12.5 = niveau CMS, 13 = BA1, 14 = BA2, 15 = BA3, 16 = BA4. C'est une indication pour le placement et pour départager deux compétences ouvertes, jamais un verrou (§8.4).
- On ajoute à `YEARS` : `{id:13, label:'BA1', age:'1re année uni / EPF'}`, `{id:14, label:'BA2', …}`, `{id:15, label:'BA3', …}`, `{id:16, label:'BA4', …}`.
- `hasTrack` reste faux pour ces années.
- Les couleurs des unités se choisissent dans la palette de `css/style.css`, une couleur distincte par module.

### 8.2 Format d'une compétence

```js
{
  id: 'a1-dl-ops', unit: 'analyse1', year: 13, prereqs: ['a1-dl-usual', 'g6-deriv-rules'], icon: 'DL',
  title: 'Opérations sur les DL',
  desc: 'Somme, produit, composition, quotient.',
  tags: ['MT', 'GM'],          // informatif ; 'opt' = peu présent dans les cours
  optional: false,             // true : hors du tronc commun, ne bloque pas le parcours
  needsSolo: true,             // par défaut, vrai pour year ≥ 12.5 (§9)
  exam: ['mcq', 'tf', 'open'], // variantes d'examen que le générateur sait produire
  intro: { rule: 'HTML court', example: [{ math, note }] } | { rule, solve: 'expression' },
}
```

- **Prérequis vers le plan d'algèbre.** Les catalogues les écrivent `@alg:<module>-<sujet>`, par exemple `@alg:H-discriminant`. L'agent qui implémente remplace cette marque par l'id réel trouvé dans `skills.js`. S'il n'existe pas, il prend la compétence existante la plus proche et le signale dans le message de commit.
- **Seulement de vrais prérequis.** Une compétence B est un prérequis de A seulement si les exercices de A **utilisent** B : une ligne du corrigé de A demande B, ou un piège de A se répare dans B. « B vient avant dans le cours » ne suffit pas. Chaque prérequis apparaît donc dans les sous-buts de A (crédit indirect), ou porte une raison dans `prereqWhy: {B: 'texte'}`. Le test `uni-content` le vérifie.
- **Compétences optionnelles.** C'est une petite liste, fixée ici : les contenus d'un livre qu'aucun cours ni examen n'utilise. Aujourd'hui, la liste ne contient que `c-conformal` (applications conformes). `frontier()` les saute. Elles restent jouables sur la carte. Aucune compétence obligatoire n'a de prérequis optionnel (test).
- **Champs ajoutés :** `prereqWhy` ; `examWeight` (0 = jamais tiré à l'examen ; 1 par défaut) ; `notes` (sources, conventions). Les ids sont en minuscules, avec des tirets (`a1-seq-eps-n`).

### 8.3 Contrat d'un générateur

`GEN[id] = (level, rng, profile, opts = {}) => item`. Les niveaux suivent l'échelle de l'app, de l'exemple estompé au travail seul :

| Niveau | Ce que voit l'élève | Mode |
|---|---|---|
| 1 | Lignes du corrigé avec des trous ; décisions déjà prises | `lines`, `guided` |
| 2 | Trous plus larges ; une décision à choisir | `guided` |
| 3 | Choisir l'action, puis écrire la ligne | `tap` |
| 4 | Lignes libres, aides disponibles | `free` |
| 5 | Problème entier sans aide, ou deux compétences enchaînées | `problem`, ou `lines` avec `noHints` |

Les compétences sans calcul en lignes (lecture, vrai/faux, définitions) gardent la même progression, mais avec leurs propres types d'item. Le catalogue le précise.

### 8.4 Parcours en branches

C'est un changement du moteur, fait à l'étape U0. Il vaut pour **toute l'app** à partir de l'unité de calcul mental, pas seulement pour l'université.

- **Ordre de la liste `SKILLS`.** C'est un **tri topologique** du graphe des prérequis (algorithme de Kahn). Quand plusieurs compétences sont disponibles, on prend la plus petite clé (`year`, ordre des unités, ordre dans l'unité). Un prérequis vient donc toujours avant. Le test actuel « prerequisites come earlier » reste vrai, même quand une compétence d'année 12.5 dépend d'une compétence d'année 13, comme la réduction des coniques qui demande les valeurs propres.
- **Ouverture.** Une compétence est ouverte quand tous ses prérequis ont au moins une étoile, comme `isUnlocked` aujourd'hui. L'année ne bloque rien.
- **Choix de « Continuer ».** `frontier()` est remplacé par `nextFocus(profile)` :
  1. une compétence en réparation, s'il y en a une ;
  2. sinon, la compétence suivante de la **branche épinglée** par l'élève sur la carte, s'il en a épinglé une ;
  3. sinon, l'app garde **au plus 3 branches actives**, c'est-à-dire des unités commencées et pas finies, et passe de l'une à l'autre d'une leçon à l'autre, ce qui mélange les sujets. Dans une branche, elle prend la compétence ouverte non maîtrisée de plus petite clé. Pour ouvrir une nouvelle branche, elle préfère la compétence qui **ouvre le plus d'autres compétences**, puis la plus petite année.
- **Carte.** Chaque unité est une branche. Une compétence fermée affiche le prérequis qui manque, et un toucher y mène. L'élève peut commencer n'importe quelle compétence ouverte, et épingler une branche.
- **Placement.** Pour les années BA1 à BA4, le test de placement se fait **par unité** : une recherche binaire dans l'ordre topologique de l'unité, en commençant par les unités des années antérieures. Sur la carte, un bouton « Je connais déjà ce module » lance le test de placement de cette unité seulement.
  - Les unités dépendent les unes des autres en boucle (G0 → G8 → G10 → L → G0), mais les compétences, elles, n'ont pas de cycle.
  - Le test d'une unité ne teste donc que ses propres compétences. Une compétence réussie au test compte comme acquise (`testedOut`) et ouvre les compétences qui en dépendent, même si un de ses prérequis d'une autre unité n'est pas encore travaillé.
- **Unités de l'école.** Leurs prérequis ont été écrits pour un parcours en ligne. À l'étape U0, on les relit : on retire ceux qui ne sont qu'un ordre de cours, on garde ceux que les exercices utilisent, et on le note dans le commit. On vérifie que le parcours d'un élève de 5H reste sensé : calcul mental d'abord, puis plusieurs branches.

**Beaux nombres.** Chaque générateur part de la réponse (§9.6 du plan). Il rejette un tirage tant que les contraintes du catalogue ne sont pas remplies : coefficients entiers bornés, valeurs propres entières, discriminant carré parfait, et ainsi de suite. Il abandonne après 200 essais et prend alors un exemple de secours fixe, dont le test vérifie qu'il est rarement utilisé (moins de 1 %).

---

## 9. Moteur pédagogique

1. **Aides sur demande.** Le bouton « Aide » donne `hints[0]`, puis `hints[1]`, puis `hints[2]`. La réponse enregistrée porte `hintsUsed`.
   - Dans `learner.recordAnswer` : une réponse juste avec `hintsUsed ≥ 1` ne compte pas comme rapide, donc ne fait pas monter de niveau. Avec `hintsUsed ≥ 2`, elle compte comme fausse pour le BKT, mais pas comme une erreur pour la descente de niveau.
   - Aucune aide n'est montrée sans demande.
2. **Validation en solo.** Une compétence avec `needsSolo` ne passe à `mastered` qu'après un item de niveau 5 réussi sans aide. Le moteur garde `st.solo = true`.
3. **Crédit par sous-but.** Une ligne `ok` dont le `subgoal` pointe vers une compétence donne un crédit indirect à cette compétence, comme `OP_SKILL` aujourd'hui. On généralise `OP_SKILL` en lisant `item.subgoals`.
4. **Suivre l'erreur** (`followError`). Après une ligne `wrong`, l'élève a deux boutons : « Corriger » et « Continuer avec ma ligne ».
   - S'il continue, la ligne fausse devient `prev`, et la suite est jugée à partir d'elle.
   - L'item compte comme raté pour sa compétence. Les lignes justes qui suivent donnent quand même leur crédit de sous-but.
5. **Auto-explication.** Les lignes `{kind:'rule'}` apparaissent au plus une fois par item, aux niveaux 2 à 4. L'élève touche la règle dans une liste de 4. Une erreur ici n'est pas une faute de calcul : on montre seulement la bonne règle.
6. **Sauvegarde.** Pour les items `problem` et les `lines` de plus de 8 lignes de corrigé, l'état est sauvé dans `profile.pending = {item, lines, state, at}` après chaque ligne. L'écran d'accueil propose « Reprendre ».
7. **Longueur des leçons.** Une leçon s'arrête après 10 items, ou quand la somme des `expectedSec` dépasse 900 secondes. Un `problem` compte pour une leçon entière.
8. **Révisions entre cours.** Une compétence `mastered` d'un module revient en révision dans les leçons d'un autre module dont elle est un prérequis. Le mécanisme `dueSkills` existe déjà ; on y ajoute une priorité pour les prérequis directs de la compétence travaillée.

---

## 10. Mode examen

### 10.1 Plans d'examen (`js/content/uni/exams.js`)

```js
{
  id: 'ba1-alglin', title: 'Algèbre linéaire (BA1)', year: 13, durationMin: 144,
  documents: 'none',              // 'none' | 'formulaire' | 'tables' ; un formulaire est un HTML statique dans docs/formulaires/
  sections: [
    {kind:'mcq', count:16, scoring:{right:3, wrong:-1, blank:0}, pool:{units:['alglin'], extraSkills:[]}},
    // QCM à plusieurs réponses : {kind:'mcq', multi:true, scoring:{perRight:'1/N', perWrong:'-1/M', floor:0}}
    {kind:'tf',  count:16, scoring:{right:1, wrong:-1, blank:0}, pool:{units:['alglin']}},
  ],
  passMark: 0.5,                  // part des points pour la note 4 (estimation)
  source: 'Format des examens 2018–2021',
}
```

Plans à créer. Les durées et barèmes viennent des notes ; quand ils sont incertains, ils sont marqués « à vérifier » dans `source`.

| id | Contenu | Format |
|---|---|---|
| `cms-controle` | Une unité G au choix | 105 min, 3 ou 4 problèmes `open` pour 20 points |
| `ba1-analyse1` | A1 | QCM (+3/0/−1), V/F (+1/0/−1), 2 ou 3 `open` de 2 à 7 points |
| `ba1-alglin` | L | 144 min, 16 QCM (+3/0/−1), 16 V/F (+1/0/−1) |
| `ba1-alglin-mt` | L, partie spécifique MT | 1 preuve courte de 4 points et 1 problème `open` de 14 points (SVD, orthodiagonalisation, récurrence) |
| `ba2-analyse2` | A2 | 144 min, 18 QCM (+3/0/−1), 10 V/F (+1/0/−1) |
| `ba3-analyse3` | V, C | 120 min, QCM à une réponse (+2/0), `open` de 3 à 14 points |
| `ba3-proba` | P (MATH-234) | Questions courtes de calcul, puis `open` |
| `ba4-analyse4` | F | 135 min, QCM à plusieurs réponses (+1/N par bonne case, −1/M par mauvaise), 3 `open` |
| `ba4-numerique` | N, plus `extraSkills` de M (SVD, puissance, Cholesky, conditionnement) | Papier, sans calculatrice : 14 à 33 QCM à plusieurs réponses (+1/N, −1/M) et V/F (+1/0/−1), avec du code et des tableaux, puis 2 `open` de preuve |
| `ba4-stat` | P (EE-209) | Sans calculatrice : QCM (+3/0/−1) et V/F (+1/0/−1) |

### 10.2 Déroulement (`js/engine/exam.js`, `ui/screens/exam.js`)

- **Construction.** Pour chaque section, `count` items sont produits avec `opts.exam = kind`, à partir de compétences tirées dans `pool`. Le poids d'une compétence est le nombre d'items d'examen que les notes lui attribuent (champ `examWeight` du catalogue, 1 par défaut). Il n'y a jamais deux items de la même compétence de suite.
- **Pendant l'examen :**
  - minuteur visible, parce que l'élève l'a demandé : c'est la seule exception à la règle « pas de chrono » ;
  - pas d'aide, pas de correction ;
  - on peut sauter et marquer une question ;
  - une réponse vide vaut `blank` ;
  - `documents: 'formulaire'` ajoute un bouton qui ouvre le formulaire.
- **Fin.** Quand le temps est écoulé ou que l'élève rend sa copie, l'app calcule le score avec le barème, points négatifs compris. Les questions `open` sont notées par étape, avec les `points` du `problem`.
- **Bilan :**
  - score, pourcentage, et **note estimée** = 1 + 5 · max(0, score)/max, arrondie au quart, avec la mention « estimation » ;
  - « Prêt », « Presque » ou « Pas encore », selon que la note estimée est ≥ 4,5, ≥ 4 ou < 4 ;
  - un tableau par compétence (justes, fausses, vides) ;
  - le piège nommé pour chaque erreur ;
  - la liste des compétences à travailler, triée dans l'ordre des prérequis ;
  - la **prédiction** = Σ (probabilité de maîtrise × points) sur les questions posées, comparée au score réel. Un grand écart signale une maîtrise surestimée.
- **Effets sur le moteur.** Chaque réponse passe par `recordAnswer` avec `kind:'exam'` : mise à jour BKT, mais pas de changement de niveau. Les pièges sont enregistrés. L'historique est gardé dans `profile.exams[]` : `{id, at, score, max, grade, perSkill}`.

---

## 11. Saisie et affichage

- **Claviers** (`KEYSETS` dans `keypad.js`) :
  - `calc` : chiffres, opérations, x, y, t, ^, √, ( ), fonctions dans un panneau (sin cos tan exp Log sinh cosh Arctg…), π, e ;
  - `calcx` : comme `calc`, plus ∫ Σ lim d/dx ′ ε ;
  - `greek` : ε δ λ θ φ α β μ σ ω ρ ;
  - `set` : ] [ ; ∪ ∞ k ∅ ;
  - `rel` : = < ≤ > ≥ ≠ ;
  - `logic` : ∀ ∃ ¬ ⇒ ⇔ ∧ ∨ ∈ ;
  - `cplx` : i, conj, Re, Im, arg, |·|.

  Chaque item déclare ses claviers. Un onglet passe de l'un à l'autre.
- **Grille de matrice** (`ui/matrix-input.js`). Les dimensions sont fixées par l'item, ou réglables par ± si l'item le permet. Le curseur passe de case en case avec ▶. Pour Gauss, une barre d'opération propose `Lᵢ ↔ Lⱼ`, `Lᵢ ← k·Lᵢ` et `Lᵢ ← Lᵢ + k·Lⱼ` ; l'élève choisit i, j et k, l'app calcule la nouvelle matrice et l'affiche pour qu'il la vérifie.
- **Affichage.** Le contenu universitaire passe par `cas/mathml.js` (`<math display="block">`). Les unités de l'école gardent leur rendu HTML. Une partie mise en valeur (la sous-expression qui a changé) reçoit `mathbackground` grâce au chemin de l'AST.
- **Code** (`ui/code-input.js`). Le code est affiché en police à chasse fixe. Chaque `???` devient un champ. Sur téléphone, un petit clavier ajoute `( ) [ ] : = + - * / ** < > ,` et les noms de variables du programme.
- **Tableaux** (`ui/table-input.js`). Une ligne s'ajoute à la fois. Les colonnes dérivées sont calculées par l'app à partir des valeurs saisies par l'élève.

---

## 12. Interpréteur Python (`js/py/`)

Pas d'`eval`, pas de `Function` : un interpréteur écrit à la main.

- **Langage accepté :**
  - entiers et flottants (`1e-6`), booléens, `None`, chaînes simples (pour `print` seulement) ;
  - opérateurs `+ - * / // % **`, comparaisons enchaînées, `and or not` ;
  - listes, `a[i]`, `a[i][j]`, `a[-1]`, tranches `a[i:j]`, `len`, `append` ;
  - affectation, `+=` et ses cousins, `a, b = b, a` ;
  - `if/elif/else`, `for x in range(…)`, `for x in liste`, `while`, `break`, `continue` ;
  - `def f(…): … return …`, sans fermeture qui modifie une variable extérieure.
- **Fonctions disponibles :** `range len abs min max sum float int round print`, et `math` (`sqrt exp log sin cos tan pi e fabs`). `import math` et `from math import *` sont acceptés. Tout autre `import` est refusé avec un message. Les matrices sont des listes de listes. L'item fournit en prélude les fonctions utiles (`zeros(n, m)`, `matvec(A, x)`) ; il n'y a pas de numpy.
- **Limites.** 200 000 opérations élémentaires, profondeur de récursion 100, listes de 10 000 éléments au plus. Le dépassement donne « Le programme ne s'arrête pas (boucle infinie ?) ».
- **Erreurs en français**, avec la ligne : « nom inconnu : x », « indice hors de la liste », « division par zéro », « indentation ».
- **Jugement d'un trou.** Le texte de l'élève remplace `???`, puis chaque test `{setup, expr, expect, tol}` s'exécute. Juste si tous passent (tolérance relative 1e−9 par défaut). Faux sinon. Le premier test raté est montré avec la valeur obtenue et la valeur attendue.

---

## 13. Tests et revue

| Fichier | Ce qu'il vérifie |
|---|---|
| `tests/cas.test.js` | Parse → toText → parse est stable. La forme normale égale les paires connues et sépare les paires différentes. `equiv` numérique : 0 faux positif sur 500 paires de différences connues (comme x et \|x\| sur [−3 ; 3]). Les dérivées sont comparées à des différences finies. Les séries sont comparées aux DL connus. `rref`, `det`, `charpoly` sont comparés au calcul brut sur 200 matrices aléatoires. `stats` : Φ(1,96) = 0,975 ± 1e−4 et quantiles de Student contre la table du cours. |
| `tests/judges.test.js` | Pour chaque sorte de juge : une ligne juste est acceptée, une ligne fausse typique est refusée, la forme finale est reconnue. Pour chaque piège : son `example[0]` est diagnostiqué comme ce piège. |
| `tests/py.test.js` | Programmes de référence (Newton, Horner, LU tridiagonale, Simpson). Messages d'erreur. Limite d'opérations. |
| `tests/uni-content.test.js` | Pour chaque compétence universitaire, chaque niveau de 1 à 5 et chaque variante d'examen déclarée, 40 items. Le **corrigé passe son propre juge ligne par ligne** et finit par `done`. Les `baits` existent dans `RULE_BY_ID`. Les beaux nombres sont respectés. Un QCM a exactement une bonne option, sauf s'il est marqué « plusieurs ». Un V/F faux a un contre-exemple accepté par son vérificateur. Un `code` passe ses tests avec la solution de référence. Le graphe de prérequis est sans cycle, et aucune compétence du tronc commun ne dépend d'une compétence optionnelle. |
| `tests/exam.test.js` | Chaque plan produit un examen complet. Les barèmes sont justes (points négatifs, QCM à plusieurs réponses). La note estimée est bornée entre 1 et 6. |

`python docs/universite/check/check.py` vérifie les catalogues eux-mêmes : ids uniques, prérequis existants et justifiés, pas de cycle, pièges définis une seule fois. Un catalogue modifié pendant une étape doit encore passer ce contrôle.

`npm run samples` écrit `docs/samples-<unit>.md` pour chaque nouvelle unité, avec 3 items par niveau et une variante d'examen. On étend `describe()` aux nouveaux types. C'est le fichier que l'utilisateur relit.

---

## 14. Étapes de construction

Chaque étape suit le même protocole :
1. Lire ce README, le ou les catalogues concernés et le code cité.
2. Implémenter le moteur de l'étape, puis les compétences du catalogue, dans l'ordre du catalogue.
3. Écrire les tests (§13), puis lancer `npm test`.
4. Lancer `npm run samples`, relire un échantillon et corriger les items laids ou faux.
5. Ouvrir l'app (`npm run serve`) et faire au moins une leçon de chaque nouvelle unité.
6. Mettre à jour `README.md` (tables des unités) et le statut dans le catalogue (`Statut : fait le …`).
7. Commit sur la branche `universite`, une étape par commit. Pas de push : l’utilisateur teste en local et décide quand fusionner.

| Étape | Contenu | Moteur à construire | Critères de fin |
|---|---|---|---|
| **U0** | Socle, plus une compétence pilote : `g6-deriv-rules` | `cas/` : ast, parse, print, mathml, poly, ratfun, normal, numeric, equiv, diff. `judges/` : index, value, equiv, diagnose. Type `lines` avec décisions, aides, sous-buts, `followError`. Claviers `calc`, `rel`, `greek`. MathML. Années 13–16. **Parcours en branches (§8.4)** : tri topologique, `nextFocus`, épinglage, carte, placement par unité, relecture des prérequis des unités de l'école. `optional`. `needsSolo`. Aides dans `learner`. | Tests existants verts (sauf ceux qui supposaient le parcours en ligne, qu'on adapte) ; `cas.test.js` et `judges.test.js` verts ; la compétence pilote jouable de bout en bout aux 5 niveaux ; un nouvel élève de 7H voit au moins 2 branches ouvertes après le calcul mental |
| **U1** | Catalogue `G-gymnase-1.md` : G9, G0, G1, G2, G3, G5 | `sets.js` et juge `solset` (inéquations, familles trigonométriques). `logic.js` avec le juge `logic` et les types `tokens` et `blocks`. Juge `poly` (Horner, division). Type `table` pour le schéma de Horner. | Toutes les compétences du catalogue, avec leurs pièges ; samples relus |
| **U2** | Catalogue `G-gymnase-2.md`, partie G6 ; `A1-analyse-1.md`, parties dérivées, DL et intégrales | `series.js`, juges `series`, `antideriv`, `definite`, `limit` (partie séries). Décisions `quality:'poor'`. | Idem, plus la vérification des primitives par dérivation sur tout le catalogue |
| **U3** | `L-M-algebre-lineaire.md`, partie L ; **mode examen** | `matrix.js`, `matrix-input.js`. Juges `rowops`, `eigvec`, `span`, `factor` (LU, QR, PDP, orthodiagonalisation, SVD sur des cas construits). Types `tf`, `example`, `matrix`, `askCoef`. `engine/exam.js`, écran examen, plan `ba1-alglin`. | Un examen blanc d'algèbre linéaire complet et noté ; `exam.test.js` vert |
| **U4** | `A1-analyse-1.md`, le reste (réels, suites, séries, limites, ε-δ, séries entières, définitions) ; `G-gymnase-2.md`, partie G8 | `limit.js` numérique, juge `delta`, `complex.js` et juge `complex`. Type `problem`, avec sauvegarde et reprise. Plan `ba1-analyse1`. | Problèmes longs (suite récurrente de 13 points) jouables et repris après fermeture de l'app |
| **U5** | `G-gymnase-2.md`, parties G4 et G10 | Juges `geom` et `conic`. Items `plot` (repère du plan d'algèbre). Arbre de décision des coniques. Plan `cms-controle`. | Réduction d'une conique jouable de bout en bout |
| **U6** | `A2-analyse-2.md` | `equiv` à plusieurs variables, juge `ode`, type `domain`. Plan `ba2-analyse2`. | |
| **U7** | `G-gymnase-2.md`, partie G7 ; `P-probabilites.md` | `stats.js`, juges `prob` et `stat`, simulation (lancer 10 000 fois). Plans `ba3-proba` et `ba4-stat`. | |
| **U8** | `L-M-algebre-lineaire.md`, partie M | `linalg-float.js` : SVD, exponentielle de matrice, normes, conditionnement ; Cholesky flottant (l'exact est dans `matrix.js` depuis U3). Juge `ode` vectoriel pour x′ = Ax. | M possède Cholesky, la puissance, Rayleigh, les normes et le conditionnement ; N s'en sert à U9 |
| **U9** | `N-analyse-numerique.md` | `js/py/`, types `code`, `table` et `readtable`, juge `iter` avec ses `phi` (§16), `fp.js`. Plan `ba4-numerique`, qui reprend des compétences de M grâce à `extraSkills`. | Chaque compétence N a au moins un item `code` ou `readtable` |
| **U10** | `VCF-analyse-3-4.md` | Juges `param`, `boundary`, `transform` ; résidus par séries de Laurent. Plans `ba3-analyse3` et `ba4-analyse4`. | |

U2 et U3 sont indépendantes et peuvent avancer en parallèle, chacune sur sa branche.

---

## 15. Gabarit des catalogues

Chaque catalogue (`docs/universite/<fichier>.md`) suit ce gabarit. Un agent doit pouvoir implémenter une compétence en lisant **seulement** son entrée et ce README.

```markdown
# <Code>. <Titre du module>

Unité `<unit>` · préfixe `<p>-` · pièges `<p>_` · Statut : à faire

**Sources** : cours et notes (nom du cours, année ; pas de chemin local).
**Notation** : conventions propres au module.
**Prérequis extérieurs** : `@alg:…` ou compétences d'autres modules.

## Compétences

### `<id>` — <Titre>
- **Année** 13 · **Prérequis** `…`, `…` · **Étiquettes** — · **Optionnelle** non · **Poids d'examen** 1
- **Intro** : règle (2 à 4 lignes) ; exemple résolu (2 à 6 lignes `math` + `note`).
- **Juge** : `<sorte>` `{cfg}` · **Forme finale** : …
- **Niveaux** :
  - L1 (guidé) : ce qui est donné, ce qui est à trous.
  - L2 : …
  - L3 (choisir l'action) : actions proposées.
  - L4 (libre) : …
  - L5 (seul) : problème ou enchaînement.
- **Générateur** : construction à l'envers, plages des paramètres, contraintes de beaux nombres, cas exclus. Au moins 2 gabarits d'énoncé différents.
- **Corrigé type** : un exemple concret, ligne par ligne, avec le sous-but de chaque ligne.
- **Aides** : 1 (méthode) · 2 (ligne à trous) · 3 (ligne entière).
- **Variantes d'examen** : `mcq` (d'où viennent les distracteurs), `tf` (2 ou 3 énoncés types, avec le contre-exemple quand l'énoncé est faux), `coef`, `open`. Seulement celles qui ont du sens.
- **Pièges** : `<p>_…`, …
- **Sous-buts → crédit** : sous-but → compétence.

## Pièges du module

| id | famille | tag | compétence | réparation | faux → juste | transformation (comment produire la ligne fautive) | explication (avec les nombres de l'élève) |
|---|---|---|---|---|---|---|---|

## Exemples de type examen

3 à 6 énoncés inspirés des examens (reformulés, nombres changés), avec leur barème par étape. Ils servent de modèle aux items `problem` et `open`.
```

Un catalogue peut ajouter, avant `## Compétences`, un bloc « Conventions communes du module » : notations, tables, extensions du §16 dont il a besoin. Un fichier qui regroupe plusieurs modules répète le gabarit pour chacun.

---

## 16. Extensions demandées par les catalogues

En écrivant les catalogues, les agents ont trouvé des cas que les §4 à §7 ne couvraient pas. Ces extensions font partie du contrat. L'étape qui construit la première compétence concernée les implémente. Chaque catalogue rappelle dans son en-tête celles dont il a besoin.

### 16.1 Saisie et nœuds (§4)

| Ajout | Détail |
|---|---|
| Nœuds | `{t:'det', e}`, `{t:'tr', e}`, `{t:'norm', e, p}` (‖·‖), `{t:'fact', e}` (n!), `{t:'binom', n, k}` (C(n, k)), `{t:'arr', n, k}` (A(n, k)), `{t:'point', name}`, `{t:'vecAB', a, b}` (AB⃗), dérivées à gauche et à droite `f′(a⁻)`, `f′(a⁺)` |
| Égalités enchaînées | `a = b = c` se lit comme une liste de relations. Chaque `=` est jugé. Sert à la forme symétrique d'une droite et aux corrigés compacts. |
| Alias | `sh`, `ch`, `th` (= sinh, cosh, tanh), `tg`, `Arctg`, `ln` ou `Log`, `o(xⁿ)` (= xⁿ·ε(x)) |
| Variables entières | `domain: {n: {int: [1, 40]}}`. Le tirage ne prend que des entiers. Indispensable pour (−1)ⁿ et les coefficients de Fourier. |
| Intégrales dans `evalFloat` | Une ∫ définie est évaluée par quadrature adaptative (Gauss-Kronrod, tolérance 1e−10), à chaque point tiré. Une `deriv` est d'abord calculée symboliquement par `diff`, puis évaluée. |
| Domaine sur une courbe | `domain: {curve: 'F(x,y)=0', param?}` : les points sont tirés sur la courbe (dérivées implicites). |
| Matrices à paramètres | `matrix.js` accepte des entrées dans ℚ(a, b), des fractions rationnelles en paramètres. Il découpe en cas quand un pivot s'annule pour certaines valeurs (`cases: [{when, R}]`). |
| Complexes partout | `solset {domain:'C'}` (familles z₀ + 2kπi/n) ; `eigvec {complex:true}` ; `equiv` avec arithmétique complexe ; `series` à coefficients complexes. |

### 16.2 Juges (§5)

| Juge | Extension |
|---|---|
| Tous | **Juge par segment.** Une `ScriptLine` peut porter son propre `judge`, qui remplace celui de l'item pour ce segment. Exemple : une réduction de conique enchaîne `equiv`, `eigvec`, `value` et `conic`. **Verdict avec remarque** : `{kind:'ok', note}` pour « juste, mais ce n'est pas la méthode du cours » (correction de continuité, Wald au lieu du test exact). |
| `steps` (nouveau) | **Lignes nommées** : chaque ligne définit une grandeur (`x̄ = …`, `t_obs = …`, `θ̂ = …`). `cfg.steps: [{name, from: [noms], compute, judge: 'value'|'stat'|'equiv', tol}]`. La valeur attendue est recalculée à partir **des valeurs de l'élève** aux lignes précédentes (report d'erreur automatique). On peut comparer `ℓ` à une constante additive près (`upToConstant: true`). Sert à P et aux applications. |
| `system` (nouveau) | Systèmes non linéaires (∇f = 0, Lagrange). La ligne est un système ou une liste de cas. Elle est juste si l'ensemble des solutions réelles est le même. Une ligne qui perd un cas est `wrong`. |
| `limit` | `{discrete: true}` pour les suites (n entier → ∞). À deux variables : ligne `path` (un chemin, puis une limite à une variable) et ligne `bound` (\|f − L\| ≤ g(r), vérifiée sur une grille (r, φ) ; `stay` si g dépend encore de φ). |
| `equiv` | `{rel: '≤'|'≥'|'<'|'>', from}` : **lignes d'inégalités**. Chaque ligne doit majorer, ou minorer, la précédente sur tout l'échantillon du domaine. Sert aux gendarmes, à ε-N, à Leibniz et aux majorations d'arcs. |
| `definite` | `{sums: true}` (lignes avec Σ, évaluées par sommes partielles avec accélération) ; `{param: 'n'}` (identités de récurrence Iₙ = … Iₙ₋₁, vérifiées pour n = 1 à 6). |
| `delta` | `mode: 'sup'` : preuve que s = Sup A. La ligne donne x(ε) ∈ A avec x > s − ε. |
| `ode` | Lignes implicites H(x, y) = C ; forme séparée P(y) dy = Q(x) dx ; équation après substitution (v = y/x, z = y^(1−n)) ; inconnue vectorielle (X′ = AX, e^(At)) ; mode EDP `{pde, bc, ic}`, jugé sur une série tronquée à 20 termes avec un résidu numérique de l'EDP < 1e−6. |
| `series` | Deux variables (Taylor d'ordre 2 en (x, y) : coefficients de X^i·Y^j) ; Laurent `{annulus: [r, R], at}`, avec puissances négatives et développement en 1/z ; fonctions abstraites f, f′(x₀), f‴(ξ) pour les preuves d'ordre (on vérifie la ligne en remplaçant f par 5 fonctions tests). |
| `antideriv` | `{grad: [F1, F2, F3], vars}` : potentiels et conjuguées harmoniques. Une ligne `φ = G + α(y, z)` est juste si ∂φ/∂x = F1 et que α ne dépend pas de x. |
| `transform` | `{dir: 'forward'|'inverse', table: 'mt2122'|'dt'}`. Les tables sont dans `js/cas/tables/fourier.js` et `laplace.js`, avec le numéro de ligne du formulaire, parce que les corrigés citent « ligne 7 ». |
| `distrib` (nouveau) | ⟨T, φ⟩ et dérivées au sens des distributions. Les lignes sont comparées sur 6 fonctions tests φ à support compact (bosses décalées). |
| `rowops` | `{params: ['a']}` (cas selon le paramètre) ; `{track: 'det'}` (le déterminant suit les opérations) ; `{track: 'lu'}` (on note les ℓᵢⱼ). |
| `span` | `{nested: true}` (Gram-Schmidt : span(v₁…v_k) = span(u₁…u_k) pour chaque k) ; `{affine: p}` (ensemble de solutions p + W). |
| `factor` | `askCoef.convention: {order, sign, normalized}` pour que le coefficient demandé soit unique (Q, U, V, P). |
| `value` | `{form: 'point'|'vector', symbols}` ; `{arith: 'fp', digits: 4}`, qui juge avec l'arithmétique simulée de `fp.js`. |
| `stat` | `{sig: k}` (chiffres significatifs) ; lecture de table : si z tombe entre deux lignes de la table de Φ, les deux voisines sont acceptées ; IC arrondi : borne inférieure vers le bas, supérieure vers le haut, au nombre de chiffres du cours (EE-209 3b). |
| `iter` | `phi: {kind: 'scalar'|'bisection'|'secant'|'jacobi'|'gauss-seidel'|'euler'|'heun'|'rk4'|'gradient', …}`. Chaque sorte définit comment la ligne k + 1 se calcule à partir des lignes de l'élève. |
| `geom` | `{count: 2}` (paire de bissectrices, deux tangentes par un point) ; `{complexVar: 'z'}` (lieux dans ℂ). |
| `conic` | Le repère de réduction est rangé dans `state.frame`. Les équations en X, Y sont comparées après retour au repère initial. Lignes d'éléments : `Ω = (0 ; −2)`, `F₁ = (…)`, `asymptote : y = …`, `a² = 2`. |
| `boundary` | Une ligne par morceau : `Γ₁ : γ(t) = (…), t de a à b` ; ou `Γ₂ : point`, ou `Γ₂ et Γ₄ : s'annulent`. |
| `solset` | **Cas** : une ligne de décision « Cas x ≥ a » restreint le domaine dans `state`. La ligne de conclusion réunit les cas. **Substitution** : `state.subst` (t = eˣ, X = cos x, t = tan(x/2)). L'ensemble en t est ramené en x par la préimage calculée dans `sets.js`. **Paramètres et plusieurs inconnues** : `{params: ['m'], vars: ['a', 'b']}`. Pour un paramètre, on compare la réponse cas par cas, sur une grille de valeurs. |
| `signs` (nouveau, pour `table`) | Tableau de signes : chaque ligne est un facteur, chaque colonne un intervalle. La case est juste si son signe est celui du facteur sur l'intervalle. La dernière ligne doit être le produit des signes de sa colonne. |
| `value` | `{tol}` pour les valeurs approchées (angles d'un triangle). |
| `poly` | Coefficients avec un paramètre (λ), et coefficients complexes. |
| `logic` | Une table de négation des atomes : ¬(a < b) = a ≥ b, ¬(A ⊂ B), ¬(x ∈ A). Les quantificateurs restreints (∀ε > 0, ∃N ∈ ℕ) sont traités comme des symboles : on compare la forme normale négative sans les développer. |

### 16.3 Items et examen (§6, §10)

| Ajout | Détail |
|---|---|
| QCM à plusieurs réponses | `mcq {multi: true}` ; barème +1/N par bonne case cochée, −1/M par mauvaise case (N bonnes, M mauvaises), plancher 0 par question. |
| QCM « réponse courte » | Un `coef` peut aussi porter une seule grandeur à calculer, sans `lines` (questions de calcul de MATH-234). |
| Distracteurs | Un distracteur égal à la bonne réponse est retiré, et le piège suivant le remplace. |
| Contre-exemples (`tf`, `example`) | On reconnaît d'abord une bibliothèque de contre-exemples connus, par catalogue (K1–K7 en A2 : différentiable mais pas C¹…). Sinon, on vérifie numériquement : différences finies à plusieurs échelles, échantillonnage. |
| Interpréter | `final.interpret: mcqItem`. Le QCM est posé après la dernière ligne. Il compte comme une réponse séparée pour la compétence `p-interpret`. La réussite du calcul ne dépend pas de lui. |
| `plot` | Tâches `curve`, `conic` (asymptotes, points, demi-tangentes, tolérances), `region`, `field`. Vues en lecture seule : `boxplot`, `scatter`, `qq`, `power`. `choose-graph` : un QCM de 4 graphes. |
| Simulation | `simulate: {model, n: 10000}` : un bouton qui lance le modèle et affiche l'histogramme, pour vérifier une probabilité. |
| `domain` | `answerShape` gagne `typeI3`, `cyl` et `sph`. |
| `matrix` | Cases symboliques (hessienne, jacobienne) : chaque case est jugée par `equiv`. |
| `code` | Tests avec `atol` en plus de `tol`. Python : `range(a, b, -1)`, fonctions passées en argument, `[0]*n` acceptés. |
| Variantes dans une compétence | Un gabarit de générateur peut porter ses propres `tags` et `year`, par exemple un gabarit Wilson tagué EE-209. |
| Exemples d'examen | Au moins 2 par module dans un fichier qui en regroupe plusieurs, quand les examens du module ont des problèmes longs. G7 (combinatoire) n'a que des questions courtes et n'en a pas besoin. G4 et G8 en ont un chacun : à compléter au moment de leur étape (U5, U4). |
| Échelle des niveaux | Les items `blocks` et `tokens` ont leur propre échelle de L1 à L5 : blocs déjà placés, puis moins de blocs, puis des leurres, puis une charpente vide, puis seul. Le catalogue la précise. |
| Compétences de l'école | Un catalogue peut citer directement l'id d'une compétence déjà construite (`pow-rules`, `prop-rule3`). |
| Générateur qui suit les progrès | Un générateur peut lire `profile` pour ajouter des gabarits, par exemple des équations avec exp une fois G2 commencé. Cela ne crée pas de prérequis. |
| `cms-controle` | Les problèmes sont tirés de plusieurs unités G, pas d'une seule. |

### 16.4 Pièges (§7)

- **Familles nouvelles**, avec `name` et `hint` à écrire dans `FAMILIES` :
  - `calculus` : dérivées, primitives, limites ;
  - `linear` : matrices et systèmes ;
  - `proba` : événements et lois ;
  - `stats` : tests et intervalles ;
  - `numeric` : erreurs et ordres ;
  - `logic` : quantificateurs et implications ;
  - `notation` : écriture mal lue ;
  - `geometry` : objets et repères ;
  - `method` : méthode juste mais mal choisie.
- `repair` peut viser une compétence d'un autre module.
- **Tag C.** Il couvre aussi les distracteurs officiels d'un examen, avec la source (« QCM 2019 Q5 »).
- **Pièges en double.** Un piège est défini une seule fois, dans le premier module où il apparaît. Les modules suivants le réutilisent par son id. Exemple : `g6_chain_forgot` sert aussi en A1.

### 16.5 Prérequis entre catalogues

Les catalogues ont été écrits en parallèle. Leurs prérequis vers d'autres modules utilisaient d'abord la forme `@<MODULE>:"<titre de la ligne du plan>"`. Une passe de réconciliation les a remplacés par les ids réels. Seuls les `@alg:…` restent : ils pointent vers le plan d'algèbre, pas encore construit, et sont résolus à l'implémentation (§8.2).
