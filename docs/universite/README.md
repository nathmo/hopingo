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
| G1 | `fonctions-g` ⚠ | Fonctions et inéquations | `g1-` | `g1_` | 12, 12.5 |
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

- ⚠ L'id `fonctions` est déjà celui d'une unité de l'école (`js/content/skills.js`) : G1 a pris `fonctions-g` (étape U1, partie b).
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
  4. (Ajouté en U0.) Une nouvelle branche ne s'ouvre que sur une compétence du **niveau actuel** de l'élève : la plus petite année parmi les compétences ouvertes. Sans cette limite, un élève de 5H commencerait les relatifs (9H) avant les livrets. Ainsi, le calcul mental vient d'abord, puis les fractions et les longueurs le rejoignent au niveau 6H.
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
  - `calc` : chiffres, opérations, x, y, t, ^, √, ( ), π, e ; les fonctions sont dans le panneau `calcfn` (sin cos tan exp ln Log sinh cosh tanh arctan arcsin arccos √( |) ;
  - `calcx` : comme `calc`, plus ∫ Σ lim d/dx ′ ε ;
  - `greek` : ε δ λ θ φ α β μ σ ω ρ ;
  - `set` : ] [ ; ∪ ∞ k ∅ ;
  - `relation` : = < ≤ > ≥ ≠ (`rel` est déjà le clavier des nombres relatifs de l'école) ;
  - `logic` : ∀ ∃ ¬ ⇒ ⇔ ∧ ∨ ∈ ;
  - `cplx` : i, conj, Re, Im, arg, |·|.

  Chaque item déclare ses claviers dans `keys` (une liste de noms, par exemple `['calcx', 'calcfn']`). Un onglet passe de l'un à l'autre. Une touche peut écrire plusieurs caractères d'un coup (« sin( ») : c'est un seul morceau pour le curseur et pour ⌫.
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
| **U0** (fait le 9 novembre 2026, voir §17) | Socle, plus une compétence pilote : `g6-deriv-rules` | `cas/` : ast, parse, print, mathml, poly, ratfun, normal, numeric, equiv, diff. `judges/` : index, value, equiv, diagnose. Type `lines` avec décisions, aides, sous-buts, `followError`. Claviers `calc`, `rel`, `greek`. MathML. Années 13–16. **Parcours en branches (§8.4)** : tri topologique, `nextFocus`, épinglage, carte, placement par unité, relecture des prérequis des unités de l'école. `optional`. `needsSolo`. Aides dans `learner`. | Tests existants verts (sauf ceux qui supposaient le parcours en ligne, qu'on adapte) ; `cas.test.js` et `judges.test.js` verts ; la compétence pilote jouable de bout en bout aux 5 niveaux ; un nouvel élève de 7H voit au moins 2 branches ouvertes après le calcul mental |
| **U1** (partie a, G9 et G0, faite le 9 novembre 2026 ; partie b, G1, G2, G3 et G5, faite le 10 novembre 2026 ; voir §17) | Catalogue `G-gymnase-1.md` : G9, G0, G1, G2, G3, G5 | `sets.js` et juge `solset` (inéquations, familles trigonométriques). `logic.js` avec le juge `logic` et les types `tokens` et `blocks`. Juge `poly` (Horner, division). Type `table` pour le schéma de Horner. | Toutes les compétences du catalogue, avec leurs pièges ; samples relus |
| **U2** (fait le 10 novembre 2026, voir §17) | Catalogue `G-gymnase-2.md`, partie G6 ; `A1-analyse-1.md`, parties dérivées, DL et intégrales | `series.js`, juges `series`, `antideriv`, `definite`, `limit` (partie séries). Décisions `quality:'poor'`. | Idem, plus la vérification des primitives par dérivation sur tout le catalogue |
| **U3** (fait le 10 novembre 2026, voir §17) | `L-M-algebre-lineaire.md`, partie L ; **mode examen** | `matrix.js`, `matrix-input.js`. Juges `rowops`, `eigvec`, `span`, `factor` (LU, QR, PDP, orthodiagonalisation, SVD sur des cas construits). Types `tf`, `example`, `matrix`, `askCoef`. `engine/exam.js`, écran examen, plan `ba1-alglin`. | Un examen blanc d'algèbre linéaire complet et noté ; `exam.test.js` vert |
| **U4** | `A1-analyse-1.md`, le reste (réels, suites, séries, limites, ε-δ, séries entières, définitions) ; `G-gymnase-2.md`, partie G8 | `limit.js` numérique, juge `delta`, `complex.js` et juge `complex`. Type `problem`, avec sauvegarde et reprise. Plan `ba1-analyse1`. | Problèmes longs (suite récurrente de 13 points) jouables et repris après fermeture de l'app |
| **U5** (fait le 10 novembre 2026, voir §17) | `G-gymnase-2.md`, parties G4 et G10 | Juges `geom` et `conic`. Items `plot` (repère du plan d'algèbre). Arbre de décision des coniques. Plan `cms-controle`. | Réduction d'une conique jouable de bout en bout |
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

---

## 17. Ce que U0 a construit (interfaces pour les étapes suivantes)

Cette section décrit le code tel qu'il est, là où il précise ou corrige les §4 à §9.

**Noyau `js/cas/`.** `ast.js` (nœuds, constructeurs qui replient les nombres et retirent ·1 et +0, `rebuild`, `walk`, `mapNode`, `equalsStructural`, `canonFn` pour les alias Arctg, Log, sh…), `parse.js` (`parse`, `tryParse`, `tokenize`, `ParseError` avec `pos`), `print.js` (`toText`, `toReadable`), `mathml.js` (`toMathML`, avec `alttext` = texte lisible), `poly.js`, `ratfun.js`, `normal.js` (`equalExact`, `normalize`, `canonKey`, `exactValue`, `pretty` pour l'affichage), `numeric.js` (`evalFloat`, `sample`), `equiv.js` (`equivalent`, `seedOf`), `diff.js` (`diff`, `pdiff`, `expandDerivs`, `ruleOf`, `stepDeriv` : une règle à la fois, les dérivées intérieures restent en `d(…)`).
- Les sous-expressions non rationnelles (sin 3x, e^(2x), √x) sont des variables opaques nommées par leur propre forme normale : `equalExact` décide alors « égal », mais répond `null` (et non `false`) quand la différence ne s'annule pas.
- `diff(node, v, hooks)` accepte des règles fausses (`product`, `quotient`, `chain`) : c'est ainsi que les pièges rejouent l'erreur.
- Dans les arguments de `d` et de `root`, la virgule sépare les arguments ; ailleurs, elle est décimale.

**Juges `js/judges/`.** `index.js` exporte `JUDGES = {value, equiv}` et `judgeFor(cfg)`. `isFinal(cfg, node)` rend `true`, `false` (pas encore fini : la ligne est `ok`) ou un message (juste, mais à finir : `stay`). Un verdict `wrong` d'`equiv` porte `witness` (le point où les lignes diffèrent) et un message qui le cite. `diagnose.js` : `diagnoseLine(kind, prev, node, cfg, same)` et `trapAnswers` (distracteurs de QCM). `actions.js` : menus du mode « choisir l'action » calculés sur la ligne de l'élève (`ACTIONS.deriv`). `lines.js` : `LinesRun` (moteur sans DOM d'un item `lines`), `checkScript` (rejoue le corrigé), `blankLine`, `templateOf`, `fillBlanks`, `blankAnswers`.

**Pièges.** `transform(prev, ctx)` rend `[{node, ctx}]` : le `ctx` de chaque candidat (u, v, la fonction extérieure…) est donné à `explain(ctx)`. `explain()` sans argument doit rester lisible. Les règles de `js/cas/rules/*.js` sont listées dans `rules/index.js`, puis ajoutées à `RULES` et `RULE_BY_ID` par `js/math/malrules.js`. Les familles du §16.4 sont dans `FAMILIES`.

**Item `lines`.** Champs du §6, plus :
- `script` peut contenir `{kind:'segment', html, ask, start:{math}, judge:{kind, …}}` : une nouvelle partie avec son propre juge (le « juge par segment » du §16.2). Exemple : dériver (`equiv`), puis `f′(0) =` (`value`).
- `blanks` est une liste d'intervalles de jetons `[i, j]` de `math` (jetons de `tokenize`). Les générateurs les produisent avec `blankLine(node, trous)`.
- `keys` : la liste des claviers ; `answerHtml` : la bonne réponse affichée en cas d'échec ; `tapActions` : le nom du menu d'actions (`'deriv'`).
- En mode guidé, une ligne juste mais pas finie (`stay`) est acceptée : la ligne suivante du corrigé la termine.
- Crédit des sous-buts : ligne par ligne en mode guidé ; à la fin de chaque partie en modes libres, car les lignes de l'élève ne correspondent pas une à une au corrigé.
- L'issue envoyée au moteur : `{correct, rules, ambiguous, hintsUsed, subgoals: [skillId], solo}`.

**Enregistrer un module.** `js/content/uni/<unit>.skills.js` exporte `UNIT` et `SKILLS` ; `js/content/uni/<unit>.js` exporte `GEN` (`(level, rng, profile, opts) => item`). On ajoute le module à `MODULES` dans `js/content/uni/index.js` et son `GEN` dans `js/content/uni/generators.js`. Les prérequis vers des compétences pas encore construites passent par `UNBUILT` (même fichier) : chacune est remplacée par ses propres prérequis déjà construits. Une étape qui construit une de ces compétences retire sa ligne de `UNBUILT`. Un prérequis ni construit ni listé fait échouer le chargement.

**Moteur.** `nextFocus(profile, {unit})` remplace `frontier` (gardé comme alias) ; `profile.path = {pinned, last}` ; `pinBranch`, `activeBranches`, `missingPrereqs`. Placement : `new Skim(profile, rng, {unit})`, `placementPlan(profile)`, `applyUnitPlacement` (`profile.placement.units[unit]`). `recordAnswer` lit `hintsUsed` et `solo`. Une leçon s'arrête à 900 s de `expectedSec` cumulés (`MAX_LESSON_SEC`).

**Prérequis de l'école revus en U0** (ordre de cours retiré, prérequis utilisés gardés) : `tab-1112` ← `tab-2510` ; `cm-round` sans prérequis ; `pow-def` ← `tab-678` ; `rel-mul` ← `rel-read`, `tab-div` ; `pct-successive` ← `pct-change` ; `nb-sets` ← `rel-read`, `frac-decimal` ; `lit-write` sans prérequis ; `fac-trinomial` ← `lit-expand2` ; `quad-formula` ← `quad-xk`, `pow-sign` ; `geo-pythagore` ← `root-squares` ; `geo-thales` ← `prop-rule3`.

**Pas encore fait après U0** : voir la fin de la partie U1 ci-dessous.

### Ce que U1, partie a (G9 et G0), a construit

**Saisie (`parse.js`, `print.js`, `mathml.js`).** Nouveaux nœuds (déclarés dans `ast.js`, avec `children`, `equalsStructural`, `getAt` et `replaceAt` sur les listes `items.i`) :
- `{t:'set', kind:'interval'|'finite'|'named'|'builder', …}` : `]a ; b]`, `{1 ; 2}`, `ℝ ℕ ℤ ℚ ℂ ∅`, `{n ∈ ℕ | 2n + 1 < 12}` (en compréhension, `head` est un nœud `in`) et `{3n + 1 | n ∈ ℕ ∧ n ≤ 3}` (ensemble image) ;
- `{t:'setop', op:'∪'|'∩'|'∖'}`, `{t:'in', op:'∈'|'∉'}`, `{t:'chain', items, ops}` (inégalités dans un seul sens ; `x = y = z` reste refusé) ;
- `{t:'not'}`, `{t:'logic', op:'and'|'or'|'imp'|'iff'}` ; « et », « ou », « non(…) » sont lus comme ∧ ∨ ¬ ; à l'écran, `et`/`ou` en mots ;
- `{t:'list', items}` : une ligne « a = 2 ; b = 1 » (système, plusieurs réponses).
Les parenthèses contiennent une formule entière : `¬(−1 ≤ x < 3)`.

**Noyau.**
- `sets.js` : `solutionSet(node, {v, domain, sets})` → `RSet` (intervalles disjoints, bornes `{x, q?, node?}`), `setEqual`, `setWitness` (un nombre dans un seul des deux ensembles), `setToNode` (forme finale), `finalForm(node, cfg)`, `setValue`, `closedHolds` (condition sans variable, ensembles nommés compris). `domain` : `'R'`, `'N'`, `'Z'` (entiers de −60 à 60) ou un ensemble de ℝ. Les bornes sont exactes pour les fractions rationnelles (racines rationnelles, puis Δ avec √ simplifiée), numériques sinon (balayage, bissection, arrondi à une fraction simple).
- `logic.js` : `lexicon({pieces, letters})` et `lexFor(cfg)` (en cache), `parseFormula`, `formulaText`, `formulaML`, `pieceML`, `nnf`, `equivalentLogic` (table de vérité ; un bloc de quantificateurs de même sorte est comparé comme un ensemble de liaisons, sans développer les restrictions), `finalIssue`, `size`, `truthOf`, `strictNeg`, `negBind`, et `walkF`/`replaceF` pour les pièges. Un morceau est un atome, ou la liaison après ∀/∃ ; la table de négation (< ↔ ≥, = ↔ ≠, ∈ ↔ ∉, ⊂ ↔ ⊄) est appliquée aux morceaux, une paire explicite (`{text: 'n est pair', neg: 'n est impair'}`) sinon.
- `polyx.js` : polynômes en x sur ℚ, avec paramètres (λ, a, b) ou coefficients complexes (`i` lu comme `I_`, I_² = −1) : `polyOf`, `coeffs`, `qCoeffs`, `divide`, `horner`, `rationalRoots`, `factorQ`, `discriminant`, `productFactors`, `sumTerms`, `isExpanded`, `splitByDivisor` (lit B·Q + R, B écrit ou nommé, au signe près), `polyNode`, `qNode`, `linNode`, `productNode`.
- `Poly.variable(v, 0)` vaut maintenant 1 (une clé x⁰ faussait les divisions).

**Juges.** `JUDGES = {value, equiv, solset, logic, poly}`. Un juge peut exporter `parseLine`, `show` et `text` ; `readWith`, `showWith`, `textWith` (`judges/index.js`) les utilisent, sinon le noyau. `LinesRun` lit le départ et les lignes montrées avec `readWith`.
- `solset` `{v, domain, sets}` : même ensemble ; message avec un témoin ; forme finale : réunion triée d'intervalles disjoints, ensemble fini calculé, ∅, ou `v = 3` (et `v = 1 ou v = 2`). « [1 ; +∞] », des morceaux qui se touchent ou mal rangés donnent `stay`.
- `logic` `{pieces, letters, maxSize?}` : forme finale sans ¬ devant un quantificateur ou un connecteur ; ¬ devant un morceau de la table donne `stay` ; `maxSize` impose la forme la plus courte. La saisie est une palette de jetons (`ui/tokens.js`).
- `poly` `{v, mode, target, complex, params, names, dividend, divisor, divisorName, solution}` : `mode` `same` (défaut), `div` (A = BQ + R, `done` quand deg R < deg B ; « A = B·… » avec `names`), `monic` (au facteur près), `identity` (la solution donnée vérifie la ligne et la ligne fixe encore les paramètres ; « a = 2 ; b = 1 » final). `target` : `expanded` (`realCoeffs`), `factored-R` (facteurs de degré 1 ou trinômes à Δ < 0, facteurs égaux regroupés), `factored-C`, `monic`.
- `value` : `cfg.expect` (texte) demande un nombre, quelle que soit la ligne précédente (départ « A », « B »…). Quand le juge de l'école ne nomme rien, les pièges des modules qui listent `value` sont essayés (`g0_rem_sign` avec `cfg.remSign`, `g0_coverup_sign` avec `cfg.coverup`).
- `equiv` : cibles `partial-fractions` et `factored-den`.
- Tableaux (`judges/iter.js`, `checkTable(item, values)`) : `phi` `horner`, `horner-repeat`, `truth`, `grid` ; chaque case est jugée à partir des cases de l'élève. Blocs (`judges/blocks.js`, `placeBlock`, `checkBlocks`) : `early` pour un bloc placé avant ce dont il a besoin (avec `orderRule`), leurres nommés, `input` en mode charpente (`expr` avec `mod`/`rem`, ou `rel`). Jetons (`judges/logic.js`, `judgeTokens`) : `target`, `start` pour le diagnostic, `sides` pour exiger la forme « … ⇒ … » d'une contraposée ou d'une réciproque. Contre-exemples (`judges/examples.js`, `checkCounter`, `judgeTf`) : `refute` (quantificateurs, `pred`, `hyp`, domaines `R`, `R+`, `N`, `N*`, `Z`, liste, `sets`), `truth`, `poly` (`at/eq`, `at/ne`, `degree`, `noRealRoot`, `mult`, `minMult`, `notMult`), `composite`.
- Menus du mode « choisir l'action » (`judges/actions.js`) : `logic`, `solset`, `factor`, `identify`, `polydiv`, et `menu` (le menu écrit par le générateur pour chaque partie, `cfg.menu`). `ui/lines.js` les propose pour tout juge.
- Décisions : une option fausse peut porter `rule` (le piège est enregistré) ; `quality:'poor'` laisse continuer et sa raison (`why`) arrive avec la ligne acceptée suivante (`verdict.later`). Les notes et décisions d'avant la première ligne d'une partie sont montrées dans tous les modes.

**Items.** `kit.js` (`js/content/uni/`) : `linesItem`, `mcq`, `tfItem`, `tokensItem`, `blocksItem`, `tableItem`, `answerItem` (variante `coef` « réponse courte », type `answer` de l'école). Une variante d'examen n'a pas d'aide. Types et écrans : `tf` (`ui/tf.js` ; `decided` : seulement le contre-exemple), `tokens` (`ui/tokens.js`), `blocks` (`ui/blocks.js`, `decision` avant les blocs), `table` (`ui/table-input.js`, puis `then`, un item posé au même endroit). Claviers `set`, `logic`, `cplx`, `letters`.

**Pièges.** Une règle porte `check`, que `tests/judges.test.js` rejoue : `{judge, prev, line}` (une ligne fausse diagnostiquée), `{counter, answers}` (un contre-exemple refusé avec ce piège), ou `{bait: {skill, level?, exam?}}` (les items de la compétence le proposent comme leurre ou option).

**Unités.** `logique` (G9, `#4c6ef5`) et `polynomes` (G0, `#d9480f`). G1 prendra `fonctions-g`. Prérequis du plan d'algèbre : `@alg:N-ensembles` = `nb-sets`, `C-developper` = `lit-polynomial`, `E-systemes` = `eq-systems`, `H-discriminant` = `quad-formula`, `D-factoriser-completement` = `fac-complete`, `G-additionner` = `rat-operations` ; crédits `E-inconnue-deux-cotes` = `eq-both-sides`, `C-identites` = `lit-identities`, `D-trinome` = `fac-trinomial`. `UNBUILT` : `g8-algebraic` ← `lit-identities`.

**Pas encore fait après la partie a** (la partie b, ci-dessous, a fait `then`, les familles, les cas, la substitution et les paramètres) : `then` des décisions (une saisie après le choix) ; les pièges de l'école sur les sous-expressions numériques d'une ligne avec des lettres ; la sauvegarde en cours d'item (`profile.pending`) ; le type `problem` (le niveau 5 et les variantes `open` sont des items sans aide) ; les familles périodiques de `solset`, les cas, la substitution et les paramètres (§16.2, pour G1, G2, G3) ; le chronométrage de l'examen.

### Ce que U1, partie b (G1, G2, G3 et G5), a construit

Quatre unités : `fonctions-g` (G1, `#e64980`), `explog` (G2, `#9c36b5`), `trigo` (G3, `#0ca678`) et `recurrence` (G5, `#5f3dc4`). Générateurs : `fonctions-g.js` (du domaine au tableau de signes) et `fonctions-g-ineq.js` (inéquations, bornes) ; `explog.js` ; `trigo.js`, `trigo-eq.js` (équations et inéquations) et `trigo-tri.js` (triangles, fonctions arc) ; `recurrence.js`. Pièges : `rules/g1.js` (deux listes : `EARLY`, les inéquations, placée avant G9 dans `CAS_RULES` pour que `g1_pole_closed` passe avant `g9_bracket` ; `RULES`, le reste), `g2.js`, `g3.js`, `g5.js`.

**Saisie (`parse.js`, `print.js`, `mathml.js`).**
- `log_2(x)`, `log_10(x)`, `log_(1/3)(x)`, `log_a(x)` : nœud `{t:'fn', name:'logb', args:[base, x]}`, affiché log₂. `log` seul reste ln. `normal.js` donne la valeur exacte quand elle est rationnelle (log₄ 8 = 3/2), sinon un atome opaque.
- Chiffres en indice : S₁ est lu `S_1`.
- Σ : `{t:'sum', e, k, lo, hi}`, tapé `sum(terme, k, début, fin)` (la touche Σ écrit `sum(` ; `Σ(` est aussi lu). L'indice est lié (`symbolsIn` ne le compte pas). Affiché avec `munderover`. `normal.js` additionne exactement une somme à bornes entières (400 termes au plus) ; `atIndex(somme, j)`. `numeric.js` l'évalue terme à terme (somme vide : 0).
- Degrés : `30°` est un produit marqué `deg: true` (valeur 30·π/180), réaffiché avec °.
- La lettre k (entier) dans une expression de x écrit une famille : `x = π/6 + 2kπ`, `{π/6 + 2kπ ; 5π/6 + 2kπ}`, `]π/6 + 2kπ ; 5π/6 + 2kπ[`, avec `k ∈ ℤ` facultatif. Il n'y a pas de nœud `family` : une famille est une expression qui contient k.
- Claviers : `explog` (eˣ, ln, log_, sinh… argth), `trig` (k, °, π, cot, X, t, ∨), `seq` (n, k, j, Σ, u, q, r), `ineq` (|, √, m, S, _, D).

**Noyau.**
- `numeric.js` : `compileFloat(node)` → `(env) => nombre`, l'arbre compilé une fois en fermetures (sans `eval`). Les balayages de `sets.js` l'utilisent : 4 à 6 fois plus rapides.
- `sets.js` :
  - `domainConds(node, v)`, `domainNode`, `domainOf(node, cfg)` : là où une expression est définie (dénominateurs ≠ 0, radicandes ≥ 0, logarithmes > 0, tan et cot hors de leurs pôles, arcsin et arccos dans [−1 ; 1], argch, argth, puissances réelles d'une base > 0) ;
  - `substSyms(node, {t: node})`, `expandFns(node, defs, v)` (f(a) remplacé par sa définition), `piNode(k)` (k·π écrit π/2, −3π/4), `hasK` ;
  - racines numériques : pas de 0,04 sur [−120 ; 120] (0,02 sur un domaine borné), puis bissection ; racines doubles (sin x = 1) par le changement de signe de f′ ; bornes arrondies à une fraction ou à un multiple rationnel de π ; trinômes à coefficients en π ou √ résolus par échantillonnage ;
  - `signAt` : un facteur exactement nul ne cache plus un point où la ligne n'est pas définie ;
  - un cache des ensembles (600 lignes) ; `setName` (S₁).
- `exactform.js` : `exactForm(node)` (nombre écrit avec radicaux et π) et `trigForm(node, v)` (une seule fonction trigonométrique de x).

**Juges.**
- `solset`, champs ajoutés (en-tête de `judges/solset.js`) :
  - `subst: {t: 'e^x'}` : les lettres valent une expression de v ; une ligne en t est lue t remplacé (« t = 3 ou t = −2 » est la même ligne que « eˣ = 3 »). Sert aussi à X = cos x et t = tan(x/2).
  - `onDomain: true` : les lignes intermédiaires sont comparées sur D₀, le domaine de la première ligne de la partie (regrouper deux logarithmes élargit le domaine) ; une ligne finale doit donner le vrai ensemble ; « x = 3 ou x = −3 », juste sur D₀, est `ok` avec la note « garde les solutions du domaine ». Une ligne « D = … » est comparée à D₀ et ne remplace pas l'équation. `onDomainOf: 'tan(x/2)'` : comparaison là où cette expression existe (Bioche). `logs: true` réserve le piège `g2_log_domain` aux items de logarithmes.
  - `exprDomain: true` : une ligne qui est une expression vaut son domaine (`g1-domain`, domaine de g ∘ f avant simplification).
  - `params: {m: ensemble}` : un paramètre ; chaque ligne est comparée pour 5 valeurs de m tirées dans l'ensemble (entiers répartis, puis demis) ; les bornes d'un ensemble final peuvent contenir m. `paramSamples(cfg)` est exporté.
  - `defs: {f: texte}` avec `funcs` : les fonctions de l'item sont développées avant le calcul.
  - `periodic: true` (k entier) : une ligne avec k est la réunion sur k ; comparaison sur la fenêtre [−13 ; 13] (`window`) ou sur `domain` ; forme finale en familles sur ℝ, en intervalles sur un domaine borné (une famille y est `stay`).
  - `inCase: true` avec `domain` = le cas : une ligne finale ne termine la partie que si elle est dans le cas.
  - État d'une partie : `start`, `ref` (vrai ensemble), `lastEq`, et ce qu'une décision y met : `superset` (élever au carré sans condition : une ligne peut garder des solutions en trop ; la ligne finale doit être exacte).
  - Un nombre qui n'existe pas (ln(−2), √(−4)) rend la ligne fausse et le message le nomme ; un piège ne la nomme que si son candidat en contient un aussi.
  - **Cas** : une partie (`segment`) par cas, avec `domain` (ou `params`) ; puis une partie qui réunit les cas avec `sets: {S_1: …, S_2: …}`. C'est la forme retenue pour l'« ajout 1 » du catalogue G.
- `equiv` : cibles `goal` (atteindre `cfg.goal` : exactement égal, même opération en tête, même nombre de termes, mêmes fonctions), `only` (seules les lettres `finalVars`), `powers`, `log-expanded`, `log-single`, `constant`, `exact`, `one-trig`, `no-sum` (avec `factored` ou `expanded`), `expanded`, `short` (plus d'appel f, g, et pas plus long que `goal` + `slack`) ; `subst` ; `defs` ; **lignes d'inégalités** `rel: '≤' | '≥'` (chaque ligne majore ou minore la précédente en 401 points du domaine ; forme finale : un nombre, `stay` s'il dépasse `cfg.bound` ; `boundWitness`).
- `value` : formes `log` (ln d'un entier), `exact`, `deg` ; `tol` et `tolDeg` ; `terms` (la ligne est une Σ qui a exactement ces termes ; `sumTerms`) ; `arith` et `geom` pour les pièges des suites. Quand l'évaluateur de l'école ne sait pas calculer (8^(1/3)), le noyau décide.
- Tableaux (`judges/iter.js`) : `phi {kind:'signs', v, bounds, factors:[{id, f, den?, even?}]}` ; colonnes alternées intervalle, borne ; une ligne de bornes peut être à remplir ; la ligne de f est jugée à partir des lignes de l'élève ; ‖ là où un dénominateur s'annule ; `sign()` exporté. Une case `kind: 'sign'` tourne entre + − 0 ‖ (`ui/table-input.js`).
- Blocs : une saisie `rel` en plusieurs lettres est acceptée à un facteur près ; une saisie `expr` peut porter son `domain` (`{n: {int: [1, 6]}}`).
- Contre-exemples : sorte `heredity` (`{v, from}`, réponse `{P}` : P héréditaire de `from` à `from + 40` et fausse quelque part).
- Menus du mode « choisir l'action » : `steps` (`cfg.menus: [{at, options}]` : le menu de la ligne précédente de l'élève), `sigma`, `telescope`, `induction`, `trig`, `exact`.
- `diagnose.js` : la variable du contexte retombe sur `cfg.v` (pièges en m).

**Lignes (`judges/lines.js`, `ui/lines.js`).**
- Une option de décision valide peut porter `state` (fusionné dans l'état du juge) et `then: {ask, expect, vars, store?, why?}` : l'élève tape ensuite ce que le choix demande, jugé par équivalence (`LinesRun.answerThen`) et rangé dans `state[store]`. `ref: true` marque l'option du corrigé. `checkScript` rejoue maintenant les décisions et leurs `then`.
- En mode guidé, une ligne du corrigé sans trou, tapée en entier, est jugée comme guidée : le curseur avance et la ligne à trous suivante s'affiche.

**Tests.** `tests/uni-check.js` contient les contrôles des items ; un fichier par unité (`tests/uni-<unit>.test.js`, G1 en deux moitiés) les lance, pour que `node --test` les fasse tourner en parallèle. `COUNT` baisse le nombre d'items de quelques compétences lourdes (25 ou 20 par niveau, jamais moins de 15).

**Parcours.** `UNBUILT` ne garde que `g6-deriv-usual` ← `g2-real-powers`, `g3-radians` et `g8-algebraic` ← `lit-identities`. `g6-deriv-rules` dépend à nouveau de `g1-compose`. Le sous-but « ôter la valeur absolue » de `g9-intervals` crédite `g1-abs-eq`. Prérequis du plan d'algèbre : `@alg:G-valeurs-interdites` = `rat-domain`, `F-isoler` = `iso-formula`, `I-param-1er-degre` = `param-linear`, `I-param-2e-degre` = `param-quadratic`, `C-reduire` = `lit-reduce` ; crédits `E-produit-en-croix` = `eq-proportion`, `E-produit-nul` = `eq-product`.

**Pas encore fait** (pour les étapes suivantes) : le type `problem` (les niveaux 5 et les variantes `open` sont des items sans aide) et le bouton « Formulaire » ; les items `plot` (les graphes de G1, G2 et G3 sont des QCM en mots) ; la sauvegarde en cours d'item ; les pièges de l'école sur les sous-expressions numériques d'une ligne avec des lettres ; aucun générateur n'utilise encore `then` (testé au niveau du juge). Les simplifications propres à chaque compétence sont dans son statut, dans le catalogue.

### Ce que U2 a construit

Deux unités : `analyse0` (G6, les 16 compétences) et `analyse1` (A1, `#5c940d` : les 32 compétences des dérivées, des développements limités et des intégrales). Chacune est découpée en parties, une paire de fichiers par partie : `analyse0-a|b|c.skills.js` et `.js`, `analyse1-a|b|c|d|e.skills.js` et `.js` (plus des fichiers d'aide comme `analyse1-d-kit.js` ou `analyse0-c-param.js`), réunies par `analyse0.skills.js` et `analyse1.skills.js`. Pièges : `rules/g6a.js`, `g6b.js`, `g6c.js`, `a1a.js` … `a1e.js` ; dans `CAS_RULES`, les pièges des DL (`a1c`) passent avant ceux de l'Hôpital (`a1b`).

**Saisie (`parse.js`, `print.js`, `mathml.js`).** Nouveaux nœuds (`ast.js`) :
- `{t:'int', e, v, lo?, hi?}`, tapé `int(f, x)` ou `int(f, x, a, b)` (« ∫( » est lu aussi) ; `{t:'bracket', e, v, lo, hi}`, tapé `bracket(F, x, a, b)`, affiché [F]ₐᵇ ; `{t:'lim', e, v, to}`, tapé `lim(f, x, a)`. Ces trois mots ne sont lus comme des appels que devant « ( » (« point » reste un produit de lettres). La variable d'une intégrale définie, d'un crochet ou d'une limite est liée (`symbolsIn`, `dependsOn`) ; celle d'une primitive reste libre.
- `{t:'side', e, dir}` : une borne 0⁺, 1⁻ (caractères ⁺ ⁻ après un atome) ; `{t:'eps', v}` : ε(x), le reste d'un DL ; `o(x^n)` est lu xⁿ·ε(x).
- Alias `Argsh`, `Argch`, `Argth`. Clavier `anal` (∫, [F], lim, C, ε(x), o(, ⁺, ⁻, ∞, t).

**Noyau.**
- `series.js` : `series(node, v, at, order, {dir, env})` → `{lo, coeffs, order, remainder, exact, valuation, coef(k)}` ; séries de Laurent tronquées en h = v − at (h = 1/v en ±∞), coefficients exacts (Q) ou flottants (e, π, ln 2). Le reste est suivi : ε(x) vaut 0 + o(1), un produit est connu à min(oA + vB, oB + vA), un quotient par une série de valuation v perd 2v, f(u) garde l'ordre de u. exp, sin, cos et les puissances réelles par leurs formules ; ln et les fonctions arc et arg par l'intégrale de la série de leur dérivée. `NotSeries` quand il n'y a pas de développement (ln x en 0). `seriesToNode`, `coefEqual`.
- `limit.js` : `limit(node, v, to, dir)` → `{value: Q | flottant | '+inf' | '-inf' | 'none' | null, method: 'series' | 'numeric' | 'none'}` : par les séries d'abord, sinon par une suite de valeurs qui s'approche du point, accélérée par Aitken (assez pour x·ln x en 0⁺ ou ln x en +∞, pas pour h·cos(1/h) : c'est la partie numérique de U4). `targetOf` lit une borne ; `sameLimit`, `limitNumber`.
- `integrate.js` : `quad(f, a, b)`, quadrature double exponentielle (tanh-sinh sur un segment, exp-sinh sur une demi-droite, sinh-sinh sur ℝ). Une extrémité singulière intégrable coûte environ 1e−8 en double précision ; NaN si la valeur ne se stabilise pas (intégrale divergente, intégrande oscillante à l'infini).
- `closedform.js` : `closedNumber(node)` → `true | false | message` : un nombre exact écrit comme somme de q·(produit d'atomes π, e, eᵠ, √m, ln q, arctan q, arcsin q…), chaque produit une fois (« Calcule arctan(1) », « Regroupe les termes semblables »).
- `numeric.js` évalue `int` (quadrature), `bracket` et `lim` (par `limit.js` aux bornes 0⁺ et ±∞), `side`. `diff.js` dérive ∫ f dv (= f), une intégrale à bornes variables (théorème fondamental : f(g)·g′ − f(h)·h′), un crochet, et xⁿ avec une lettre n. `normal.js` : une intégrale est un atome opaque, un crochet vaut F(b) − F(a).

**Juges.** `JUDGES` gagne `series`, `antideriv`, `definite` et `limit` (ajoutés en fin de `judges/index.js`). Chaque juge peut exporter `sign`, le signe affiché devant une ligne ; `signOf(cfg)` le lit (et donne ≤ ou ≥ pour une ligne d'inégalité `equiv` avec `rel`), pour `ui/lines.js` et `kit.js`.
- `series` `{v, at, order, dir?}` : les coefficients de la ligne et de la précédente sont égaux jusqu'à l'ordre que les deux connaissent ; une ligne qui annonce plus que la précédente ne le permet est `wrong` ; une ligne sans reste après une ligne avec reste est `stay`. Forme finale : polynôme en (x − at) par puissances croissantes (`stay` sinon), puis le reste xⁿ·ε(x) à l'ordre demandé (`stay` si l'ordre diffère). Une ligne non réduite est `ok` (en chemin).
- `antideriv` `{v, domain, subst?: {t: 'sqrt(x)'}, params?}` : la dérivée de la ligne égale celle de la précédente (la ligne 0 est `int(f, x)`), donc F et F + 3 sont justes ; une ligne peut garder des `int(…, x)` ; une ligne sans ∫ doit être définie là où l'intégrande l'est (ln x n'est pas une primitive de 1/x sur [−3 ; 3]). Avec `subst`, une ligne en t est dérivée en t, ramenée en x et multipliée par φ′(x) ; `state.subst` peut aussi venir d'une décision. Forme finale : pas de ∫, pas de t, et `+ C` seul (`stay` « N'oublie pas la constante »).
- `definite` `{vars?, seq?: {J: 'int(x^n×e^x,x,0,1)'}, param?: 'n', nRange?, recurrence?}` : même valeur, exacte si possible, sinon par quadrature (relatif 1e−7). Avec `seq` et `param`, `J_n` et `J_(n-1)` valent l'intégrale à l'indice dit, et une ligne en n est comparée pour chaque n de `nRange` ; `recurrence: true` rend finale la formule « Jₙ = … Jₙ₋₁ ». Forme finale : `closedNumber`. Les seules lettres permises sont celles de `vars`, `param` et `seq`.
- `limit` `{v, to, dir?}` : même limite que la ligne précédente ; une ligne dont la limite est incalculable est `stay` (« écris-la autrement »). Forme finale : un nombre fermé, `+∞` ou `-∞`. `show` affiche dans « lim » une ligne qui dépend encore de v.
- `equiv` : `implicit: {y: 'p'}` pour la dérivée implicite (chaque d(…) devient ∂/∂x + p·∂/∂y, et `no-prime` accepte y′ dans la ligne finale).
- Des pièges lisent des champs que le générateur met dans la configuration du juge : `tangent`, `other`, `slope`, `ratio` (G6), `inv`, `extrema`, `read`, `taylorAt`, `prims`, `change` (A1). L'en-tête de chaque fichier de règles les décrit.

**Contenu.** 48 compétences (G6 complet ; A1 : dérivées, DL, intégrales), chacune avec ses 5 niveaux, ses variantes d'examen et ses pièges (82 pièges : les 25 de G6, dont les 4 de la pilote, et 57 de A1). `UNBUILT` : `g6-deriv-usual` est retiré ; ajoutés `g4-line2` (← `g4-vectors`, `fn-affine`, `eq-systems`) pour `g6-tangent`, et les compétences A1 de l'étape U4 dont U2 a besoin (`a1-seq-limits`, `a1-seq-squeeze`, `a1-fn-limits`, `a1-fn-onesided`, `a1-fn-extension`, `a1-fn-ivt`, `a1-fn-image`, `a1-ser-compare`). Les pièges `a1_bounded_times_zero`, `a1_ipe_in_sum` et `a1_compare_wrong_direction` ont pour l'instant une compétence de U2 ; U4 les ramènera vers `a1-fn-limits` et `a1-ser-compare`. Prérequis du plan d'algèbre : `@alg:G-simplifier` = `rat-simplify`, `@alg:E-systemes-2x2` = `eq-systems`.

**Tests.** `tests/calculus.test.js` : séries contre les DL connus, limites, quadrature, chaque juge (ligne juste, ligne fausse typique, forme finale), et le critère de U2 : **chaque primitive écrite dans les catalogues G6 et A1 est vérifiée par dérivation**, et chaque valeur d'intégrale définie est vérifiée par quadrature. Un fichier de test par partie (`tests/uni-analyse0-a.test.js` …). `checkSkills(ids, seed, counts)` accepte un nombre d'items par compétence. La ligne fausse d'une partie `antideriv` est « F + x », puisque F + 1 est encore une primitive.

**Pas encore fait** :
- le type `problem` : les problèmes longs `a1-polar-curve`, `a1-improper-rational` et `g6-study-full` sont des items `lines` sans aide, en parties ;
- `plot` (les esquisses sont des questions en mots) et le juge `geom` (une tangente est une partie « y = » jugée par `equiv`) ;
- la comparaison « sur la courbe » de la dérivée implicite ;
- la partie numérique des limites (h·cos(1/h)) et les sommes infinies dans `definite` (U4) ;
- les V/F dont le contre-exemple est une fonction : ce sont des QCM Vrai/Faux, faute de vérificateur de fonctions ;
- quelques leurres de QCM sans piège : `g6_antideriv_power_minus_one` dans `a1-int-direct`, `a1_int_product` dans `a1-int-estimate`, `a1_subst_bounds_kept` dans `a1-improper-calc`, `g6_tangent_slope_function` dans `g6-common-tangent`.

Les simplifications propres à chaque compétence sont dans son statut, dans le catalogue.

### Ce que U3 (algèbre linéaire L et mode examen) a construit

Une unité, `alglin` (L, `#1971c2`) : les 54 compétences du catalogue L et ses 90 pièges, plus `g4_proj_no_square` (pièges partagés, §16.4 : défini dans L, premier module construit qui s'en sert ; l'étape U5 le rattachera à `g4-dot`). Les compétences sont dans `alglin.skills.js` ; les générateurs, une section du catalogue par fichier : `alglin-sys.js` (Lay 1), `alglin-mat.js` (Lay 2), `alglin-det.js` (Lay 3), `alglin-vs.js` (Lay 4), `alglin-eig.js` (Lay 5), `alglin-orth.js` (Lay 6), `alglin-sym.js` (Lay 7 et preuves), réunis par `alglin.js`. Outils communs : `alglin-kit.js`. Les pièges : la table du catalogue dans `rules/l.js` (`META`), ce qui les fait marcher dans `rules/l-<section>.js`. Les simplifications de chaque compétence sont dans son statut, dans le catalogue.

**Noyau.**
- `matrix.js` : matrices exactes sur ℚ (lignes de `Q`, indices à partir de 0). `rref(A, {cols})` → `{R, pivots, ops}`, `echelon`, `rank`, `det`, `inverse` (null si singulière), `kernel` (un vecteur par variable libre), `charpoly` (coefficients de det(A − λI) depuis λ⁰), `rationalEigen`, `identifyRowOp(A, B)`, `rowEquivalent`, `applyOp(s)`, `detFactor`, `lu` (sans échange), `plu`, `qrGS` (colonnes vⱼ non normées, coefficients cᵢⱼ, ‖vⱼ‖² exacts), `cholesky` (exact si les racines tombent juste, sinon flottant), formes (`isEchelon`, `isRref`, `isUpper`…). Opérations : `{kind: 'swap'|'scale'|'add'|'combo', i, j, k, c}` (combo : Lᵢ ← cLᵢ + kLⱼ).
- `matexpr.js` : la langue des lignes des juges matriciels, et les calculs sur des matrices dont les cases sont des nœuds du CAS (ℚ, ℚ(a), racines). Matrice `[[1,2,-1|3],[2,5,1|7]]` (« | » avant le second membre), vecteur `(1 ; -2 ; 3)`, famille `(1 ; 0), (0 ; 1)` ou `Span{…}`, opérations `L2 ← L2 - 2L1 ; L1 ↔ L3`, opérations puis résultat `L2 ← L2 - 2L1 : [[…]]`, facteurs nommés `L = [[…]] ; U = [[…]]`, expressions avec des matrices nommées par l'item (`P·D·P^(-1)`, `Aᵀ`, `A⁻¹`, `2A - I`, `diag(1, 3)`, `I`), déterminants `-4·det[[…]]`, `det(A - λI)`, et une étiquette avant « = » (`T(e_2) = …`). `parseMatLine(text, {vars, complex})` → `{ops, assigns, body, label}` ; `evalAst(ast, env, opts)` → valeur `{k:'s', n}` | `{k:'m', rows, aug?, vec?}` | `{k:'list', items}` ; `envOf(cfg)` (les `names` de l'item) ; `sameScalar` (exact, sinon flottant en des valeurs des paramètres ; `opts.ints` : lettres entières, comme k dans 3ᵏ ; `complex` : par `polyOf`), `sameValue`, `simp` (forme normale, ou ±(a/b)√c reconnu pour les racines), `applyRowOp`, `identifyOp`, `ndet` (cofacteurs), `ninverse`, `nIsEchelon`, `nIsRref`, `lineText`, `lineML` (avec `alttext`), `opText`, `exprML`.

**Juges** (`JUDGES` : `rowops`, `mat`, `det`, `eigvec`, `span`, `factor`, en plus de ceux de U1). Leurs lignes sont des nœuds `{t: 'mline', ops, assigns, label, body, value}` lus par `judges/matcommon.js` (`readMat`, `buildLine` ; `parseLine` accepte une ligne de départ qui ne s'évalue pas, « A⁻¹ = ? », et la montre telle quelle). Un juge qui exporte `input = 'matrix'` est saisi dans la grille. `showWith` et `textWith` montrent une ligne `mline` avec son propre imprimeur, quel que soit le juge de la partie.
- `rowops` `{goal: 'echelon'|'rref'|'col1'|'triangular', cols, multi, lowerOnly, vars, track}` : une opération (l'app l'applique), une opération et sa matrice (exacte), ou une matrice seule (une opération reconnue ; avec `multi`, toute matrice équivalente). Avec `vars: ['a']`, multiplier une ligne par une expression de a est refusé (`l_param_divide_zero`). `track: 'det'` : lignes `k·det[[…]]`, le facteur doit suivre les opérations ; un nombre égal à det A termine (`factored` : factorisé). Les pièges reçoivent les opérations annoncées dans `ctx.cfg._ops` ; `candidateOps(rows)` donne les opérations probables. Menu `rowops` du mode « choisir l'action ».
- `mat` `{names, vars, ints, expect, form}` : même valeur que la ligne précédente (ou que `expect`) ; forme finale : un littéral aux cases calculées.
- `det` `{vars, names, target: 'number'|'factored'|'expanded'}` : lignes avec des det(…), montrées telles qu'écrites, même valeur exacte ; `detsOf(node)` pour les pièges.
- `eigvec` `{A, lambda, complex}` : v ≠ 0 et (A − λI)v = 0, tout multiple accepté.
- `span` `{basis, require: 'span'|'basis'|'orthogonal'|'orthonormal', nested, affine, params}` : même sous-espace (exact, sinon flottant) ; famille liée, non orthogonale ou non normée : `stay` ; `nested` (Gram-Schmidt) : les k premiers vecteurs engendrent l'espace des k premiers de `basis`, une ligne partielle est `ok` ; `affine` : « p + t·v + s·w », p − p₀ dans W.
- `factor` `{A, of: 'LU'|'PLU'|'QR'|'cholesky'|'PDP'|'orthodiag'|'SVD'}` : les facteurs donnés s'accumulent dans l'état ; chacun est contrôlé seul (forme, et valeur quand la convention la rend unique) ; fini quand tous sont là et que le produit redonne A (en flottant). Les pièges reçoivent le nom du facteur dans `ctx.cfg._name`.
- Contre-exemples (`judges/linalg-examples.js`, appelés par `checkCounter`) : `matPair` (`TESTS_PAIR`), `matOne` (`WANT_ONE`), `vecFamily` (`WANT_FAMILY`), `setWitness` (`member` : une relation en x_1 … x_n, sur les cases d'un vecteur, d'une matrice ligne par ligne, ou les coefficients d'un polynôme en t), `mapWitness`, `dims`. Une nouvelle propriété s'ajoute à la table voulue.
- `judges/matrix-item.js` : `judgeMatrixItem(item, text)`.

**Items.**
- `alglin-kit.js` : `unimodular`, `rrefWith`, `luPair`, `pdp`, `orthRational`, `orthIntBasis`, `gsReverse`, `lsqReverse`, `polyBasis` (les générateurs à l'envers du catalogue) ; textes `mt`, `aug`, `vt`, `famT`, `polyT`, `qt`, `fq`, `ML`, `MLm` ; `opLines(A, ops)` (lignes « op : [[…]] » du corrigé), `pickCells`/`withCells`, `rowHoles` ; `matLines`, `coefItem` (`askCoef = {label, path, convention?}` : un `lines` dont la seule ligne est la valeur, juge `value` avec `expect`), `matrixItem` (type `matrix`), `exampleItem` (type `example`, propriété = un contre-exemple), `mcqDistinct` (quatre options distinctes, §16.3), `tfL`.
- Ligne guidée d'un juge matriciel : `cells: [[ligne, colonne]]`, les cases à remplir de la grille (le reste est affiché et fixé). `blanks` reste réservé aux lignes lues par le CAS.
- Clavier `mat`. Les variantes `open` (`l-eig-powers`, `l-sym-orthodiag`, `l-svd-compute`, `l-svd-sphere`, preuves) sont des items sans aide, en attendant `problem` (U4).

**Écrans.** `ui/matrix-input.js` : `MatrixInput` (même interface que `MathInput`) : un champ de texte et une grille (matrice avec sa barre, vecteurs en colonnes, facteurs nommés), taille réglable, barre d'opérations (Lᵢ ↔ Lⱼ, Lᵢ ← k·Lᵢ, Lᵢ ← Lᵢ + k·Lⱼ) ; en mode « choisir l'action », elle remplit aussi la grille avec le résultat, que l'élève vérifie (§11). `ui/lines.js` l'utilise pour les juges matriciels (lignes libres, et lignes guidées avec `cells`). `ui/matrix-items.js` : montages `matrix` et `example`, et les contre-exemples en grille des vrai/faux (`ui/tf.js`). Styles : `css/alglin.css`.

**Mode examen** (§10).
- `content/uni/exams.js` : `EXAMS`, `EXAM_BY_ID`. Plan `ba1-alglin` (144 min, 16 QCM +3/0/−1, 16 V/F +1/0/−1, sans document). Un plan des étapes suivantes s'ajoute à cette liste : `{id, title, year, durationMin, documents, sections: [{kind, count, multi?, scoring, pool: {units, extraSkills}}], passMark, source}`.
- `engine/exam.js` :
  - `sectionPool(section)` : les compétences du pool dont `exam` contient la sorte de la section, pesées par `examWeight` (0 : jamais tirée) ;
  - `buildExam(plan, {rng, profile, now})` → `{id, title, durationMin, documents, startedAt, endsAt, sections, questions: [{n, section, kind, skill, item, max}]}` : tirage pondéré, jamais deux fois de suite la même compétence, au plus ⌈count·w/W⌉ + 1 questions par compétence ; chaque item est produit au niveau 4 avec `opts.exam = kind` ;
  - `scoreQuestion(q, scoring, réponse)` : QCM (indice de l'option ; liste d'indices si `multi`, +1/N, −1/M, plancher), V/F (`true`/`false`), `coef` (le texte, jugé par le juge de l'item), vide = `blank` ; `open` vaut 0 jusqu'à U4 ;
  - `scoreExam(exam, réponses, profile)` → `{score, max, pct, grade, verdict, perSkill, traps, toWork, questions, prediction, overestimated}` ; `gradeOf(score, max)` = 1 + 5·max(0, score)/max au quart, entre 1 et 6 ; `verdictOf` : Prêt (≥ 4,5), Presque (≥ 4), Pas encore ; prédiction = Σ p(compétence)·points (§10.2) ; `toWork` dans l'ordre des prérequis ;
  - `startRun`, `answerRun`, `finishRun`, `timeLeft` : la copie est dans `profile.examRun` (reprise après rechargement), puis `recordAnswer(…, kind: 'exam')` pour chaque question (maîtrise mise à jour, niveau inchangé), l'historique dans `profile.exams` `{id, at, score, max, grade, perSkill, predicted}`, la dernière copie dans `profile.lastExam`.
- `examsForUnit(unit)` : sur la carte, une unité dont un plan tire ses questions a un bouton « 📝 Examen blanc » ; un examen en cours se reprend depuis l'accueil. Écran `ui/screens/exam.js` (route `exam`) : présentation et historique, minuteur, navigation, questions marquées, QCM à plusieurs réponses, copie rendue (ou temps écoulé), puis le bilan : note estimée, verdict, prédiction, tableau par compétence, pièges, compétences à retravailler (bouton vers la leçon) et corrections.

**Tests.** `tests/matrix.test.js` (rref, det et charpoly contre le calcul brut sur 200 matrices), `tests/linalg-judges.test.js` (chaque juge, les contre-exemples, et le module L complet), `tests/exam.test.js`, un fichier par section de L (`uni-alglin-<section>.test.js`, eig et sym en deux moitiés). `checkSkills(ids, seed, counts)` prend un nombre d'items par compétence ; les items de L ne passent plus dans le test de l'école (`content.test.js`), qui les répétait. Dans `uni-check.js`, la ligne fausse d'un juge matriciel change le premier nombre de la ligne finale (un vecteur hors de l'espace pour `span`, le vecteur nul pour `eigvec`).

**Parcours.** `UNBUILT` : `g4-vectors` ← `eq-systems` ; `g4-line2` ← `eq-systems`, `fn-affine` ; `g8-polar` ← `lit-identities`, `g3-exact`. Prérequis du plan d'algèbre : `@alg:E-systemes-2x2` = `eq-systems`, `H-discriminant` = `quad-formula`, `D-trinome` = `fac-trinomial`, `I-equation-parametre` = `param-linear`, `J-hausse-baisse` = `pct-change`.

**Pas encore fait** : le type `problem` (les variantes `open` sont des items sans aide, notées 0 à l'examen) ; le plan `ba1-alglin-mt` (lacune 5 du catalogue L) ; `track: 'lu'` ; le type `match` (l-mat-imt) ; les esquisses `plot` (l-map-geom, l-svd-sphere) ; un QCM à plusieurs réponses dans les leçons (l'examen le sait) ; le module M (U8).

### Ce que U5 (géométrie analytique G4, cercles et coniques G10) a construit

Deux unités : `geoan` (G4, `#f08c00`, 14 compétences) et `coniques` (G10, `#a61e4d`, 15 compétences), chacune en deux parties : `geoan-a|b.skills.js` et `.js`, `coniques-a|b.skills.js` et `.js`, réunies par `geoan.skills.js`/`geoan.js` et `coniques.skills.js`/`coniques.js` (avec des fichiers d'aide : `geoan-a-kit.js`, `geoan-a-line2.js`, `geoan-a-dot.js`, `geoan-a-space.js`, `geoan-b-kit.js`, `coniques-a-kit.js`, `coniques-b-kit.js`, `coniques-b-nature.js`, `coniques-b-frame.js`, `coniques-b-data.js`, `coniques-b-family.js`). Outils communs : `geo-kit.js`. Pièges : `rules/g4a.js`, `g4b.js`, `g10a.js`, `g10b.js` (20 + 21). Les simplifications de chaque compétence sont dans son statut, dans le catalogue.

**Langues des lignes** (pas de nouveau nœud du CAS : chaque juge lit ses lignes lui-même).
- `cas/vecexpr.js` : points et vecteurs. `(6 ; 3)`, `2M − A`, `(A + B)/2`, `vec(A,B)` ou `AB` (deux points nommés côte à côte), `u·v` (un nombre), `u ∧ v` (`×` accepté entre deux vecteurs), `‖u‖`, `‖AB‖²`, `|k|`, `√5`, `arccos(1/3)`, paramètres `t`, `s`… ; une étiquette puis des membres séparés par « = » (`C = 2M − A = (6 ; 3)`), chacun calculé. `parseVec`, `evalVec` → `{k:'s', n} | {k:'v', items}` (nœuds du CAS), `envFrom(symbols)`, `sameVal`, `isMultiple`, `astML`, `labelML`. `□` est une case de ligne guidée.
- `cas/geomobj.js` : droites, plans, cercles, sphères, coniques et réunions de deux objets. Cartésienne, `y = 2x + 1`, `x = −3`, paramétrique `(x ; y) = (1 ; −2) + t(3 ; 2)` ou `x = 1 + 3t ; y = …`, égalités enchaînées `(x − 1)/2 = (y + 2)/1 = (z − 3)/(−1)`, système (« ; » ou « et »), réunion (« ou », ou `|A|/5 = |B|/5`, élevée au carré). `readObject(text, {dim})` → `{kind: 'affine', rows}` (rref exacte sur ℚ) ou `{kind: 'poly', coefs}` (coefficients flottants de degré ≤ 2, ajustés sur des points) ; `sameObject` : mêmes lignes réduites, ou coefficients proportionnels (une réunion est le produit de ses morceaux).
- `cas/conic.js` : `analyzeConic([a, b, c, d, e, f])` → nature (ellipse, cercle, hyperbole, parabole, vide, point, deux droites…), δ, Δ, valeurs et vecteurs propres, centre, f(Ω), a, b, c, e, p, foyers, sommets, asymptotes, directrices, axes, repère réduit ; `conicIn(coefs, {O, u1, u2})` (l'équation dans un repère quelconque), `candidateFrames` (les 8 repères des axes).

**Juges** (`JUDGES` gagne `vector`, `geom`, `conic`).
- `vector` `{symbols, params, expect?, multiple?, signed?, form?, angle?}` : c'est la « `value` avec `form: 'point' | 'vector'` » du catalogue G, en juge à part (ses lignes ne sont pas lues par le CAS). Même valeur, composante par composante, que `expect` ou que la ligne précédente ; `multiple` : tout multiple non nul (une normale, une direction) ; `signed` : ± (un vecteur d'un repère). Forme finale : un point ou un vecteur écrit, ou un nombre en forme exacte (`arccos(…)` avec `angle`). Les membres d'une ligne doivent être égaux.
- `geom` `{object: 'line2'|'line3'|'plane'|'circle'|'sphere', ref, count?: 2, form?: 'cartesian'|'explicit'|'param'|'reduced'|'any'}` : le même ensemble de points que `ref` (ou que la ligne précédente). Forme finale : cartésienne à coefficients entiers premiers entre eux (`stay` sinon), deux équations ou une paramétrique pour une droite de l'espace, forme réduite pour un cercle ou une sphère (second membre négatif compris), et avec `count: 2` les deux objets joints par « ou ». Une forme juste mais autre que celle demandée (paramétrique quand on veut la cartésienne) est une étape (`ok`). `complexVar` (lieux dans ℂ) n'est pas fait.
- `conic` `{equation, ask?, target?: 'standard'|'reduced'|'none', frame?: {O, u1, u2}}` : une équation en x, y proportionnelle à `equation` ; une équation en X, Y égale à la conique dans `frame` ou dans un des repères de ses axes (les axes dans l'autre ordre, ou orientés autrement, sont acceptés) ; des lignes d'éléments `Ω = …`, `F = …`, `F' = …`, `S = …`, `a = …`, `e = …`, `p = …`, `u₁ = …`, `asymptotes : … ou …`, `directrice : …`, `axe : …`, plusieurs sur une ligne avec « ; », comparés aux éléments calculés (les foyers et les sommets dans n'importe quel ordre ; une droite à coefficients irrationnels comme `x = 2 + 9√5/5` est acceptée). Finale : tous les éléments de `ask` donnés (`state.given`), sinon une équation de la forme `target`. Les pièges reçoivent l'analyse dans `ctx.cfg._an`.
- Lignes guidées : un juge à langue propre exporte `templateML(cfg, template, blanks)`, que `ui/lines.js` utilise pour dessiner les cases (les trous restent des intervalles de jetons du tokenizer du CAS, posés par `blanks(math, [textes])` de `geo-kit.js`, qui ne touche jamais une étiquette « u_2 = »). Les juges matriciels gardent leurs `cells`.
- Contre-exemples : sorte `geo` (`judges/geo-examples.js`, une table par partie : `geo-examples-g4a.js`…), réponses lues par `vecexpr.js` ; par exemple `flatParallelogram`, `orthNonzero`, `skewLines`, `r2Negative`, `verticalTangent`, `deltaPosNotEllipse`.

**Items.**
- `plot` (`judges/plot.js`, montage `ui/plot.js`, styles `css/geo.css`) : `{task: 'conic', view, place: [{id, label, kind: 'point'|'line', count}], expect, tol: {pos: 0.15, line: 0.25}, equation, answer}`. L'élève choisit un élément, touche le repère (points arrondis au quart), deux points pour une droite ; `checkPlot` juge chaque élément à `tol` près et donne la part juste ; puis l'app trace la courbe (`implicitSegments`, carrés marchants) et les éléments attendus. Le tracé à main levée (`task: 'curve'`, côté et monotonie entre les points) n'est pas fait : la courbe est dessinée par l'app après coup. Sert aux esquisses de `g10-ellipse`, `g10-hyperbola` et `g10-conic-frame-back`.
- `geo-kit.js` : `partsItem` (un item en parties, chacune avec son juge, ses notes, ses décisions — en note au niveau 1 —, son menu au niveau 3, ses trous ou ses cases de grille aux niveaux 1 et 2), textes (`vt`, `linT`, `eqT`, `paramT`, `rootT`, `readable`), MathML (`VML`, `GML`, `CML`, `LML`).
- Claviers `geo` (x y z = ; t s AB⃗ · ∧ ‖ X Y Ω F : ou λ) et `pts` (noms de points et de vecteurs).
- **Arbre de décision des coniques** (`g10-conic-nature`) : une suite de lignes `decision` (§5.3) ; seules les décisions du vrai chemin de l'item sont posées, puisqu'un mauvais choix est refusé (avec sa raison et son piège) : le champ `when` proposé par le catalogue n'est pas nécessaire.
- **Réduction de bout en bout** (`g10-conic-reduce`) : det(A − λI) (juge `det`), un vecteur propre (`eigvec`), normé (`vector`, `signed`), u₂, Ω, f(Ω) (`value`), l'équation réduite (`conic` avec le repère), puis, au niveau 5 et en variante `open`, les foyers dans Re ; `g10-conic-frame-back` transporte les éléments et esquisse (`plot`).

**Mode examen.** Plan `cms-controle` : 105 min, 4 problèmes `open` de 5 points, tirés des unités G (`geoan`, `coniques`, `analyse0`, `fonctions-g`, `explog`, `trigo`, `polynomes`, `recurrence`, `complexes`). Les problèmes sont notés 0 tant que le type `problem` (U4) n'est pas là. Exemples d'examen : E7 ajouté à G4 (distance et perpendiculaire commune), pour en avoir deux par module.

**Pièges.** `g4_proj_no_square` appartient maintenant à G4 (`rules/g4a.js`, compétence `g4-dot`) ; ce qui le fait marcher sur les lignes de L reste dans `rules/l-orth.js` (`PROJ_NO_SQUARE_L`). `g4_square_constant` et `g4_not_normalized` (`rules/g4b.js`) servent aussi à `g10-circle-eq`.

**Parcours.** `UNBUILT` perd `g4-vectors` et `g4-line2`. Prérequis du plan d'algèbre : `@alg:E-systemes-2x2` = `eq-systems`, `L-affine` = `fn-affine`, `M-pythagore` = `geo-pythagore`, `H-completer-carre` = `quad-complete`, `H-discriminant` = `quad-formula`, `I-second-degre-parametres` = `param-quadratic`.

**Tests.** `tests/geo-judges.test.js` (chaque juge : ligne juste, ligne fausse typique, forme finale ; l'analyse des coniques du catalogue ; `plot` ; contre-exemples), un fichier par partie (`uni-geoan-a|b.test.js`, `uni-coniques-a|b.test.js`), `tests/uni-check-geo.js` (ligne fausse, cases dessinées, items `plot`), et `cms-controle` dans `exam.test.js`.

**Pas encore fait** : le type `problem` (niveaux 5 et variantes `open` en items `lines` sans aide, en parties) ; le tracé à main levée des items `plot` et la tâche `curve` (les esquisses de G6 restent des questions en mots) ; `geom` avec `complexVar` (G8) ; la comparaison « sur la courbe » des lieux (une ligne avec une racine est montrée en note) ; quelques gabarits du catalogue, nommés dans les statuts.
