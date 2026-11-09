# Plan : du gymnase à la 2e année de l'EPFL

Proposition du 9 novembre 2026, révisée le même jour. Rien n'est construit. Ce plan fait suite à [plan-calcul-algebre.md](plan-calcul-algebre.md) et suppose ses modules C à N terminés.

La révision s'appuie sur des notes de cours réelles :
- la mise à niveau (MAN) et le cours de mathématiques spéciales (CMS) ;
- les cours de BA1 à BA4 des sections Microtechnique (MT) et Génie mécanique (GM), entre 2017 et 2023 : séries, examens corrigés, résumés et formulaires ;
- le recueil d'exercices de Douchet (vol. 1 et 2) ;
- les cours de BA5 et du master qui utilisent les matrices. Ils servent à définir le module d'analyse matricielle.

**Pour construire :** la spécification d'implémentation est dans [universite/README.md](universite/README.md). Elle couvre l'architecture, les formats, les juges, le mode examen et les étapes avec leurs critères de fin. Elle est complétée par un catalogue détaillé par module, compétence par compétence, dans [universite/](universite/). Ce qui dépasse la 2e année est dans [plan-ba5-et-plus.md](plan-ba5-et-plus.md).

## 1. Le but, et le chemin

L'objectif est qu'un étudiant MT ou GM puisse faire, pas à pas et avec un retour à chaque ligne, les exercices de mathématiques des deux premières années de l'EPFL. Il doit aussi arriver prêt aux cours qui utilisent les matrices ensuite (automatique, signaux, robotique).

| Étape | Cours (MT/GM) | Modules de ce plan |
|---|---|---|
| Avant | Maturité ; MAN et CMS pour qui passe par là | G0–G10 |
| BA1 | Analyse I ; Algèbre linéaire (manuel de Lay) | A1, L |
| BA2 | Analyse II, avec les équations différentielles | A2 |
| BA3 | Analyse III ; Probabilités et statistique (GM, MATH-234) | V, C, F (selon l'année), P |
| BA4 | Analyse IV ; Analyse numérique (MT : « et optimisation ») ; Statistique pour data science (MT, EE-209) | V, C, F ; N ; P |
| BA4, transversal | Ce que l'analyse numérique, la statistique et les systèmes dynamiques utilisent sur les matrices | **M. Analyse matricielle** |
| BA5 et plus | Automatique, signaux et systèmes, MPC, robotique, apprentissage automatique | Plan séparé : [plan-ba5-et-plus.md](plan-ba5-et-plus.md) |

**Analyse III et IV changent selon la section et l'année.** C'est pourquoi le plan les découpe par thème plutôt que par cours :
- **V** : analyse vectorielle ;
- **C** : analyse complexe ;
- **F** : Fourier, Laplace, EDP, distributions.

| Version | Analyse III | Analyse IV |
|---|---|---|
| MT, année normale (résumé du cours Cibils) | V + C | F, avec les distributions |
| MT 2021-22 (cours en anglais) | V + séries et transformée de Fourier, applications | C + Laplace + EDP + distributions |
| GM (livre de Dacorogna et Tanteri, 2020 et après) | V + Fourier + Laplace + EDO/EDP (Sturm-Liouville) | C + transformées |

**L'app ne demande pas la section.** Les contenus suivent MT en année normale : V et C en BA3, F en BA4. Ce qui est propre à une section porte une étiquette (`GM`, `MT/SV`) mais reste obligatoire, par exemple les distributions et Sturm-Liouville.

Les deux cours de probabilités et statistique sont couverts : MATH-234 (GM) et EE-209 (MT).

Le chemin dans l'app :

```
Hopingo aujourd'hui (5H–11H) → plan calcul-algèbre (C–N, jusqu'au Gym)
  → G. Niveau maturité + CMS : polynômes, fonctions, exp/log/hyperboliques, trigo, géométrie analytique,
       coniques, suites, analyse de base, combinatoire, complexes, logique
    → BA1 : A1 Analyse I, L Algèbre linéaire
      → BA2 : A2 Analyse II (avec les EDO)
        → BA3–BA4 : V, C, F, P, N
          → M Analyse matricielle (niveau BA4)
            → plan séparé BA5 et plus
```

Cela fait **487 nouvelles compétences** et 859 pièges, résumés au §7 et détaillés un par un dans les catalogues de [universite/](universite/) (tableau complet : [universite/INDEX.md](universite/INDEX.md)).

## 2. Ce que montrent les notes de cours

Ces constats changent la forme des exercices autant que leur contenu.

| Constat | Source | Conséquence pour l'app |
|---|---|---|
| **Les examens de BA1–BA2 sont surtout des QCM et des vrai/faux, avec des points négatifs.** Algèbre linéaire 2021 : 16 QCM (+3/0/−1) et 16 vrai/faux (+1/0/−1), aucune partie ouverte. Analyse I GM : QCM et vrai/faux, plus 2 ou 3 questions ouvertes de 2 à 7 points. Analyse II 2019–2021 : seulement des QCM et des vrai/faux. | Examens GM et MT 2018–2022 | L'app entraîne aux deux : le calcul pas à pas pour comprendre, puis le format d'examen. Un vrai/faux demande un contre-exemple, parce qu'un tiers des points se perd sur ces questions. Un **mode examen** reprend le format de chaque cours : barème avec points négatifs, minuteur, aucune aide. Il dit ensuite si l'élève est prêt (spécification, §10). |
| **Un QCM demande souvent *un seul coefficient* d'un long calcul.** « b₃₂ de A⁻¹ », « ℓ₄₂ de L », « r₃₃ de QR », « x₁ de la solution des moindres carrés ». | Algèbre linéaire 2021 ; les notes de révision personnelles « Pool Question Examen » | Nouveau type d'exercice, « Trouver un coefficient ». Les lignes pas à pas restent les mêmes, seule la dernière ligne change (§6). |
| **Les problèmes longs existent encore**, avec des points par étape (0,5 à 2 points). Exemples : suite récurrente par l'étude de fonction (Analyse I MT 2014, 13 pts) ; SVD complète (Algèbre linéaire MT 2017, 14 pts) ; vérifier le théorème de Stokes (Analyse III 2021, 14 pts). | MAN, CMS, partie spécifique MT, Analyse III et IV | Le barème par étape correspond exactement au jugement ligne par ligne. |
| **En analyse numérique, l'examen ne fait presque jamais faire de tableaux d'itérations à la main.** Il demande de lire un tableau d'erreurs, de compléter des lignes de Matlab, et de prouver l'ordre d'une formule par Taylor. | Examens 2019–2022 (sur papier, sans calculatrice) | Le module N mise sur la lecture de tableaux, le code à compléter et les preuves d'ordre. Les itérations à la main servent à comprendre, pas à préparer l'examen. |
| **Les corrections d'examen listent les erreurs fréquentes.** | Corrections d'Analyse III 2022, astuces d'Analyse IV GM | Elles deviennent des pièges du §8, avec l'étiquette [C] pour « correction d'examen ». |
| **Le CMS avait déjà un outil pas à pas (AFlex)**, avec des aides et des corrigés rédigés. La consigne officielle était : *« éviter de copier bêtement et pas à pas (il faut maîtriser un problème dans son ensemble) »* et faire d'abord les séries *sans* AFlex. | Page d'accueil du CMS | Les aides sont **demandées par l'élève**, jamais affichées d'avance, et chaque aide est notée. Chaque compétence finit par un **problème entier sans aide**. C'est le contraire d'un tuteur qui tient la main jusqu'au bout. |
| **Le CMS et la MAN partagent leur format** : contrôles de 105 minutes, 3 ou 4 problèmes à paramètre (« en fonction de a »), sous-questions enchaînées, réponses finales imprimées. MAN : un mémo d'une page par cours. | MAN, CMS | Le mémo d'une page devient le modèle des cartes « astuce » de chaque compétence. |
| **Les séries d'exercices sont regroupées par chapitre**, et le recueil de Douchet (1 571 exercices corrigés) l'est aussi. | Douchet vol. 1 | Le recueil sert de **modèle** pour les générateurs. On ne recopie pas ses énoncés. Les révisions mélangent les chapitres (§3). |
| **Les étudiants font leurs propres organigrammes de méthode** : nature d'une conique, type d'équation différentielle. | Notes personnelles (fichiers Visio) | Ils deviennent des exercices « Choisir la méthode » en arbre : d'abord det A, puis les valeurs propres, puis le type de conique. |

## 3. Pourquoi c'est dur aujourd'hui, et ce qu'on fait autrement

| Problème | Ce que dit la recherche | Ce que fait l'app |
|---|---|---|
| **Le retour arrive une semaine trop tard, et sur la réponse finale** | Les tuteurs qui jugent *chaque étape* sont presque aussi efficaces qu'un tuteur humain (effet ≈ 0,76). Ceux qui ne jugent que la réponse le sont nettement moins (≈ 0,31) (VanLehn 2011). L'apprentissage actif fait mieux que le cours magistral seul (Freeman et al. 2014). | C'est le cœur d'Hopingo : chaque ligne est jugée tout de suite, et une erreur connue est nommée. Ce plan étend ce jugement à toutes les matières (§4). |
| **La plupart des erreurs en analyse sont des erreurs d'algèbre** | Une grande partie des erreurs en dérivation et en intégration viennent de la manipulation, pas du concept (Orton 1983). | Les lignes de calcul passent par les règles d'erreur du plan d'algèbre. Si une erreur d'algèbre revient, l'app répare la compétence d'algèbre concernée. |
| **Les solutions sautent des étapes** | Nommer les sous-buts (« poser u », « calculer du », « changer les bornes ») améliore le transfert (Catrambone 1998 ; Margulieux et al. 2012). | Chaque ligne d'un exemple porte une étiquette de sous-but. Les étiquettes disparaissent quand le niveau monte. |
| **On ne choisit jamais la méthode** | Une série porte sur un seul chapitre, donc la méthode est connue d'avance. Mélanger les types de problèmes oblige à choisir (Rohrer, Dedrick & Stershic 2015). Selon le résumé d'intégration, la difficulté de la substitution est de *choisir* φ. | La première ligne est souvent un **choix de méthode**. Les révisions mélangent les chapitres et les cours. |
| **Le calcul sans le sens** | L'« image du concept » ne correspond pas à la définition (Tall & Vinner 1981), et la limite est vue comme une borne jamais atteinte (Cornu 1991 ; Williams 1991). La fiche d'Analyse II rappelle que les droites ne suffisent pas pour une limite. | Exercices éclair « Vrai ou faux ? », avec un contre-exemple que l'app vérifie, et « Donne un exemple ». |
| **Les quantificateurs et les preuves** | Les étudiants confondent ∀∃ et ∃∀ (Dubinsky & Yiparaki 2000), et les QCM d'analyse numérique piègent justement « ∃C ∀f » contre « ∀f ∃C ». La charpente logique d'une preuve s'écrit en premier (Selden & Selden 1995). Beaucoup prouvent « par l'exemple » (Harel & Sowder 1998). | Un module de logique (G9). Pour les preuves : remettre des blocs en ordre (Poulsen et al. 2022), compléter une charpente, trouver δ. Pour les définitions, on les reconstruit avec des blocs, comme dans « Définir C¹(I) », qui est une question d'examen. |
| **Trouver les bornes** | Le résumé « Calcul de limites » note que beaucoup comprennent le théorème des gendarmes mais ne trouvent pas les deux bornes. | Exercices dédiés « Majorer ou minorer », à partir de G1, avant les gendarmes et ε-δ. |
| **L'algèbre linéaire est trop formelle, trop tôt** | L'« obstacle du formalisme » (Dorier 2000). Les recommandations du LACSG sont de commencer par les matrices et ℝⁿ, et de montrer la géométrie (Carlson 1993 ; Carlson et al. 1993). | On calcule d'abord dans ℝ² et ℝ³, avec un dessin pour chaque notion. Les espaces abstraits (Pₙ, M₂ₓ₂) viennent ensuite. |
| **Les probabilités vont contre l'intuition** | Le taux de base oublié, P(A\|B) confondu avec P(B\|A), l'erreur de conjonction (Tversky & Kahneman 1974, 1983 ; Eddy 1982). Les **fréquences naturelles** aident beaucoup (Gigerenzer & Hoffrage 1995). | On commence par un tableau d'effectifs sur 1 000 personnes, puis la formule, et on montre que les deux donnent le même nombre. La simulation sert à vérifier. |
| **Les tests statistiques sont récités sans être compris** | La p-valeur et l'intervalle de confiance sont mal interprétés (Haller & Krauss 2002 ; Hoekstra et al. 2014). L'examen MATH-234 et le QCM EE-209 testent justement ces contresens. | Après chaque test, l'élève choisit une phrase d'interprétation parmi des contresens connus. |
| **On oublie entre deux semestres** | La répétition espacée et le fait de se tester (Cepeda et al. 2006 ; Roediger & Karpicke 2006). | Les révisions passent d'un cours à l'autre. Une compétence est révisée juste avant de servir de prérequis. |
| **Expliquer ce qu'on fait** | Expliquer ses étapes aide (Chi et al. 1989). **Choisir la règle dans un glossaire** suffit à obtenir l'effet (Aleven & Koedinger 2002). | Après certaines lignes justes : « Quelle règle ? », et l'élève touche la règle. |
| **Le niveau de détail** | Effet de renversement de l'expertise (Kalyuga et al. 2003). | Le juge accepte les grands sauts quand ils sont justes. Une calculatrice intégrée fait ce qui est déjà maîtrisé. |
| **Trop d'aide empêche d'apprendre** | C'est la leçon d'AFlex (§2). L'aide ne profite que si l'élève a d'abord cherché. | Les aides sont demandées, jamais montrées d'office. Chaque compétence finit par un problème entier sans aide. |

## 4. Étendre le mécanisme « une ligne à la fois »

Le juge actuel ([judge.js](../js/math/judge.js)) fait trois choses :
- il compare une ligne à **la ligne précédente de l'élève** : même valeur, donc juste ;
- si la valeur change, il rejoue les règles d'erreur pour nommer l'erreur ;
- il vérifie la forme finale.

Pour l'université, chaque type d'exercice définit quatre choses :
- **la ligne** : ce que l'élève écrit ;
- **l'invariant** : ce qui doit rester vrai d'une ligne à l'autre ;
- **la vérification** : comment l'app le contrôle ;
- **la forme finale** : quand l'exercice est fini.

| Domaine | Une ligne | Invariant | Vérification | Forme finale |
|---|---|---|---|---|
| Dérivée | Expression | Même fonction | Forme normale si l'expression est rationnelle, sinon valeurs en plusieurs points tirés au hasard dans le domaine (méthode STACK, Sangwin 2013) | Plus de « ′ » ni de d/dx |
| Primitive | `G(x) + ∫ h(x) dx` | G′ + h = f | On **dérive** la ligne de l'élève, ce qui est facile, puis on compare | Plus de ∫, « + C » présent |
| Intégrale définie ou généralisée | Expression avec bornes, puis nombre | Même valeur ; convergence justifiée | Exacte, sinon numérique | Valeur exacte, ou « diverge » avec le critère |
| Limite | Expression, ou « lim … = lim … » | Même limite | Séries tronquées, sinon suites numériques | Nombre, ±∞, ou « n'existe pas » avec deux chemins |
| Développement limité | `P(x) + xⁿ·ε(x)` (notation du cours ; o(xⁿ) accepté) | Mêmes coefficients jusqu'à l'ordre annoncé | Arithmétique exacte de séries tronquées ; l'ordre annoncé est contrôlé | Polynôme ordonné, reste au bon ordre |
| Série numérique ou entière | Étapes d'un critère | Valeurs et limites justes | Comme les limites | « Converge » ou « diverge », critère nommé ; domaine bornes comprises |
| Équation différentielle | `y = …` ou une étape (facteur intégrant, solution homogène, solution particulière) | La ligne vérifie l'équation, ou en est une transformation équivalente | Substitution symbolique ou numérique dans l'équation | Solution générale, ou solution du problème de Cauchy |
| Système linéaire (Gauss) | Matrice augmentée et opération (`L2 ← L2 − 3L1`) | Même ensemble de solutions | Calcul exact sur ℚ ; l'app reconnaît l'opération faite | Forme échelonnée (réduite), solution paramétrique |
| Déterminant, polynôme caractéristique | Expression | Même valeur ou même polynôme | Exacte | Nombre ou polynôme factorisé |
| Vecteurs propres, base, noyau, W⊥ | Vecteurs | Av = λv, v ≠ 0 ; même sous-espace | Rang exact ; **tout multiple ou toute base juste est acceptée** | Liste de vecteurs |
| Factorisation (LU, QR, Cholesky, SVD, PDP⁻¹) | Les facteurs, éventuellement partiels | Le produit redonne A, et chaque facteur a la bonne forme (triangulaire, orthogonale…) | Exacte, ou flottants avec tolérance | Facteurs complets, ou **le coefficient demandé** |
| Probabilité | Expression avec des P(…), des effectifs, des C(n, k) | Même valeur | ℚ exact | Fraction ou décimal |
| Statistique | Valeur avec tolérance | Même valeur | Numérique ; Φ et t calculés par l'app | Décision, phrase d'interprétation, IC arrondi selon la règle des chiffres significatifs |
| Itérations numériques | Ligne d'un tableau | x(k+1) = Φ(x_k), **calculé à partir de la ligne de l'élève** | Flottants avec tolérance | Critère d'arrêt atteint |
| Tableau d'erreurs à lire | Ordre, constante, stabilité | Cohérent avec les données | Pente en échelle log-log, rapports | Réponse justifiée par deux lignes du tableau |
| Ligne de code à compléter | Une expression ou une ligne Python | Le programme produit le bon résultat | L'app l'exécute sur des cas tests, avec un petit interpréteur Python écrit à la main | Tous les tests passent |
| Intégrale curviligne ou de surface | Paramétrisation, puis intégrale en t (ou u, v), puis valeur | Même valeur ; paramétrisation valide (bonne courbe, bon sens, bonnes bornes) | Numérique, et contrôle de quelques points | Valeur exacte |
| Bord d'une surface | Liste de morceaux de courbe orientés | Les morceaux qui se réduisent à un point ou qui s'annulent sont retirés | Comparaison géométrique | Bord orienté |
| Analyse complexe | Expression complexe, pôles, résidus | Même valeur | ℚ(i) exact, contrôle numérique | Valeur |
| Transformée (Fourier, Laplace) | Expression en α ou en z | Égale à la transformée de la ligne de départ | Table, et contrôle numérique de l'intégrale | Table appliquée, puis inversion |
| Preuve | Blocs dans l'ordre | Chaque bloc dépend seulement des blocs déjà placés | Graphe de dépendances (*Proof Blocks*) | Conclusion atteinte |
| ε-δ, ε-N | δ(ε) ou N(ε) | Si 0 < \|x − a\| < δ, alors \|f(x) − L\| < ε | Échantillonnage dense et arithmétique d'intervalles | δ > 0 pour tout ε > 0 |

Quatre ajouts communs :

1. **Lignes de décision.** Certaines lignes ne sont pas des égalités, mais des choix : « posons u = x² », « critère de d'Alembert », « X ~ Bin(10 ; 0,3) », « L2 ← L2 − 3L1 », « résonance, donc u_p = x(A cos 3x + B sin 3x) ». On les choisit dans un menu aux niveaux guidés, et on les écrit aux niveaux libres. Un choix peut être **juste mais mauvais** : l'app laisse continuer, puis montre que le calcul devient plus difficile.
2. **Suivre l'erreur.** Dans un tableau ou un long problème, une erreur est signalée. Si l'élève continue, les lignes suivantes sont jugées à partir de sa ligne fausse, comme dans un barème « avec report d'erreur ».
3. **Sous-buts et sauvegarde.** Un long problème (15 à 30 lignes) est découpé en sous-buts nommés. On peut s'arrêter et reprendre.
4. **Aides sur demande.** Le premier niveau d'aide est le nom de la méthode, le deuxième la ligne à trous, le troisième la ligne entière. Chaque aide utilisée compte, et la compétence n'est validée qu'après un problème fait sans aide.

## 5. À quoi ça ressemble : exemples

### Analyse I : ∫ x²·eˣ dx

| # | L'élève écrit | Sous-but | Le juge vérifie |
|---|---|---|---|
| 1 | Parties : u = x², v′ = eˣ | Choisir la méthode | Choix possible. Si u = eˣ : « juste, mais le degré monte » |
| 2 | u′ = 2x, v = eˣ | Dériver u, intégrer v′ | ✓ |
| 3 | = x²eˣ − ∫ 2x·eˣ dx | Appliquer la formule | Dérivée de x²eˣ, moins 2x·eˣ, = x²eˣ ✓ |
| 4 | Parties : u = 2x, v′ = eˣ | Choisir encore | |
| 5 | = x²eˣ − (2x·eˣ − ∫ 2eˣ dx) | | Même contrôle par dérivation |
| 6 | = (x² − 2x + 2)·eˣ + C | Finir, réduire | Dérivée = x²eˣ ✓ ; « + C » présent |

Erreurs reconnues :
- le signe de la 2e intégration par parties ;
- la formule appliquée sous la forme u·v + ∫ u′v ;
- le « + C » oublié ;
- « intégrer chaque facteur ».

### Analyse I : lim (eˣ − 1 − x) / x² quand x → 0

La notation suit le cours : le reste s'écrit xⁿ·ε(x), avec ε(x) → 0.

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | DL(2) en 0 | Choix. L'autre méthode juste est Bernoulli-l'Hôpital, deux fois |
| 2 | eˣ = 1 + x + x²/2 + x²·ε(x) | Coefficients ✓ |
| 3 | eˣ − 1 − x = x²/2 + x²·ε(x) | ✓ |
| 4 | (eˣ − 1 − x)/x² = 1/2 + ε(x) | Division par x² ✓ |
| 5 | La limite vaut 1/2 | ✓ |

Erreur reconnue : un DL d'ordre insuffisant. Avec eˣ = 1 + x + x·ε(x), la ligne 4 donne ε(x)/x, qui ne dit rien. À la fin, l'app montre la solution par Bernoulli-l'Hôpital à côté et demande laquelle était la plus rapide (Rittle-Johnson & Star 2007).

### Algèbre linéaire : diagonaliser A = [[4, 1], [2, 3]]

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | det(A − λI) = (4 − λ)(3 − λ) − 2 | Même polynôme ✓ |
| 2 | = λ² − 7λ + 10 = (λ − 2)(λ − 5) | ✓ ; valeurs propres 2 et 5 |
| 3 | λ = 2 : A − 2I = [[2, 1], [2, 1]] → [[2, 1], [0, 0]] (L2 ← L2 − L1) | Matrice ✓, l'opération faite est bien celle annoncée ✓ |
| 4 | v₁ = (1, −2) | Av₁ = 2v₁ et v₁ ≠ 0 ✓ ; (−2, 4) serait aussi accepté |
| 5 | λ = 5 : v₂ = (1, 1) | ✓ |
| 6 | P = [[1, 1], [−2, 1]], D = diag(2, 5) | AP = PD et P inversible ✓ |

Variante au format de l'examen : mêmes lignes, mais la dernière question est « Que vaut le coefficient p₂₁ si les colonnes sont normées et que λ₁ < λ₂ ? ».

Erreurs reconnues :
- « + 2 » au lieu de « − 2 » ;
- λ soustrait à une seule case de la diagonale ;
- v = 0 ;
- les colonnes de P dans un autre ordre que celles de D.

### Probabilités : un test médical

Énoncé : 1 % des gens ont la maladie. Le test détecte 90 % des malades et donne un faux positif chez 10 % des gens sains. Quelle est la probabilité qu'une personne testée positive soit malade ?

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | Sur 1 000 personnes : 10 malades, 990 saines | ✓ |
| 2 | Malades et positifs : 9 ; sains et positifs : 99 | ✓ |
| 3 | P(M \| +) = 9 / (9 + 99) = 1/12 ≈ 8,3 % | ✓ |
| 4 | Avec la formule : 0,9 · 0,01 / (0,9 · 0,01 + 0,1 · 0,99) | Même valeur ✓ |
| 5 | Avec un 2e test indépendant, positif lui aussi : 0,9² · 0,01 / (0,9² · 0,01 + 0,1² · 0,99) | = 9/20 = 45 % ✓. C'est la suite posée dans l'examen type MATH-234 |

Erreurs reconnues : répondre 90 %, qui confond P(+ \| M) et P(M \| +), et oublier le taux de base.

### Analyse numérique : Newton pour x² = 2, avec x₀ = 1

On utilise la convention du cours : l'ordre se lit sur les **incréments** |x(k+1) − x_k|, parce que l'erreur exacte est inconnue.

| k | x_k (l'élève) | \|x(k+1) − x_k\| | rapport au carré |
|---|---|---|---|
| 0 | 1 | 0,5 | |
| 1 | 1,5 | 0,0833 | 0,33 |
| 2 | 1,41667 (17/12) | 0,00245 | 0,35 |
| 3 | 1,414216 (577/408) | | |

Chaque ligne est recalculée à partir de la ligne précédente de l'élève. Le rapport se stabilise, donc l'ordre est 2.

La 2e partie a le format de l'examen : un tableau produit par un programme pour f(x) = (x − 1)². L'élève doit voir que l'ordre tombe à 1, parce que la racine est double. Il complète ensuite la ligne Python `x = x - ???`.

Erreurs reconnues :
- x − f′/f ;
- l'ordre lu sur le rapport simple ;
- « Newton est toujours d'ordre 2 ».

### Analyse III : vérifier le théorème de Green pour F = (−y, x) sur le disque unité

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | γ(t) = (cos t, sin t), t de 0 à 2π | Points sur le cercle, sens positif (domaine à gauche) ✓ |
| 2 | γ′(t) = (−sin t, cos t) | ✓ |
| 3 | F(γ(t)) · γ′(t) = sin²t + cos²t = 1 | ✓ |
| 4 | ∫_∂D F · dl = ∫ de 0 à 2π de 1 dt = 2π | ✓ |
| 5 | rot F = ∂F₂/∂x − ∂F₁/∂y = 1 − (−1) = 2 | ✓ |
| 6 | ∬_D 2 dx dy = 2π | ✓ ; les deux membres sont égaux |

Erreurs reconnues :
- sens de parcours inversé ;
- γ′ oublié ;
- Green cité sans calculer rot F ;
- Green appliqué à −y/(x² + y²), qui a une singularité dans le disque.

### Analyse IV : ∫ de −∞ à +∞ de dx / (1 + x²), par les résidus

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | f(z) = 1/(1 + z²), pôles ±i | ✓ |
| 2 | Seul i est dans le demi-plan supérieur | ✓ |
| 3 | Res(f, i) = 1/(2i) | ✓ |
| 4 | Sur l'arc, \|∫\| ≤ πR/(R² − 1) → 0 | Bloc de justification ✓ |
| 5 | = 2πi · 1/(2i) = π | ✓ |

### Analyse matricielle : ÿ + 3ẏ + 2y = 0, forme d'état et stabilité

| # | L'élève écrit | Le juge vérifie |
|---|---|---|
| 1 | x = (y, ẏ), ẋ = Ax avec A = [[0, 1], [−2, −3]] | Le système redonne l'équation ✓ |
| 2 | det(A − λI) = λ² + 3λ + 2 = (λ + 1)(λ + 2) | ✓ |
| 3 | λ = −1 et λ = −2 : Re λ < 0, donc le système est stable | ✓ |
| 4 | e^(At) = P·diag(e^(−t), e^(−2t))·P⁻¹ avec P = [[1, 1], [−1, −2]] | Dérivée de e^(At) = A·e^(At), et vaut I en t = 0 ✓ |

Erreurs reconnues :
- e^(At) calculé case par case ;
- « |λ| < 1 », qui est le critère des systèmes discrets, utilisé pour un système continu.

## 6. Nouveaux types d'exercice

En plus de ceux du plan d'algèbre :

| Type | Ce que fait l'élève | Exemple |
|---|---|---|
| **Choisir la méthode** | Touche une méthode, ou suit un arbre de décision | Nature d'une conique : d'abord det, puis les valeurs propres |
| **Trouver un coefficient** | Fait le calcul pas à pas, mais ne rend qu'une case | « ℓ₄₂ de L », « r₃₃ de QR » |
| **Quelle règle ?** | Justifie une ligne juste | « Règle de chaîne » |
| **Vrai ou faux, avec contre-exemple** | Si c'est faux, entre un contre-exemple que l'app vérifie | « Si uₙ → 0, Σ uₙ converge » → 1/n |
| **Donne un exemple** | Entre un objet qui a la propriété | A ≠ 0 avec A² = 0 |
| **Remets la preuve dans l'ordre** | Ordonne des blocs, dont certains sont des pièges | « Les espaces propres d'une matrice symétrique sont orthogonaux » |
| **Écrire une définition** | Construit la définition avec des blocs | « f ∈ C¹(I) » ; « lim f = L » en ε-δ |
| **Charpente de preuve** | Écrit le début et la fin, puis complète | Montrer f ∈ C¹ pour une fonction définie par morceaux |
| **Trouver δ ou N** | Donne δ(ε) ou N(ε) | lim 5x + 1 = 11 en 2 |
| **Nier un énoncé** | Assemble ∀, ∃, ¬ | Nier « f est continue en a » |
| **Discuter selon un paramètre** | Découpe les cas, puis traite chacun | Système en a ; Σ (λ/(1 − λ))ⁿ ; diagonalisable selon b |
| **Tableau d'itérations** | Remplit, puis lit l'ordre | Newton, Jacobi, Euler |
| **Lire un tableau d'erreurs** | Déduit l'ordre ou la stabilité à partir des lignes données | h divisé par 2 → erreur divisée par 4 |
| **Compléter le code** | Remplace « ??? » dans un court programme | LU tridiagonale, Simpson composite |
| **Prédire puis calculer** | Estime d'abord | Nombre d'itérations de bissection |
| **Lire ou esquisser** | Sur le repère interactif : courbes de niveau, champs de vecteurs, régions, coniques, courbes paramétrées | « Quelle région décrit 0 ≤ y ≤ x ≤ 1 ? » |
| **Décrire le domaine** | Écrit les bornes à partir du dessin, ou dessine à partir des bornes | Changer l'ordre d'intégration |
| **Interpréter** | Choisit une phrase parmi des contresens connus | Sens d'une p-valeur |
| **Problème entier** | Un problème d'examen complet, sans aide, avec un barème par étape | Suite récurrente (13 pts) ; SVD (14 pts) |

## 7. Les modules

Chaque ligne d'un tableau est une compétence, ou un petit groupe de compétences proches, à exercer en 5 à 10 minutes. La colonne « Source » renvoie aux notes ; « Douchet » désigne le recueil d'exercices. Les étiquettes **MT** et **GM** disent dans quelle section le sujet est enseigné, et **opt.** qu'il est peu présent dans les cours. Ces étiquettes sont informatives. Tout reste obligatoire, sauf les applications conformes, qu'aucun cours n'exerce. Le catalogue détaillé de chaque module est dans [universite/](universite/).

### G. Niveau maturité et CMS

La MAN se présente comme *« un cours de transition 1er échec / succès »*, pas comme une transition gymnase-EPFL. Elle couvre une bonne partie de l'Analyse I. Le niveau visé ici est donc celui du **CMS**. Ce qui est aussi dans la MAN est enseigné une seule fois, dans le module de l'Analyse I.

**G0. Polynômes**

| Compétence | Exemple |
|---|---|
| Schéma de Horner, valeur et division par x − a | |
| Division euclidienne | |
| Racines, multiplicité, factorisation sur ℝ et sur ℂ | |
| Polynôme défini par des conditions | Réel unitaire de degré 3, racine 1 + i, reste par x + 1 égal à 5 (MAN 2017) |
| Divisibilité avec un paramètre | λ pour que x² − 1 divise x⁴ + 5x³ + 5x² − 5x + λ³ − 3λ − 4 (MAN 2018) |
| PGCD de polynômes | |
| Décomposition en éléments simples (DES) | Prépare les primitives et Laplace |

**G1. Fonctions et inéquations**

| Compétence | Exemple |
|---|---|
| Domaine de définition | |
| Composition, réciproque | |
| Injective, surjective, bijective : le prouver | f : ]−∞, −1] → ]−∞, −2], x ↦ (x² + 1)/x, puis expliciter f⁻¹ (MAN 2018, 7 pts) |
| Parité, périodicité | |
| Tableau de signes | |
| Inéquations rationnelles avec paramètre | |
| Trinôme à paramètre : position des racines (Viète) | (m − 1)x² − 2(m + 1)x + 2m − 1 = 0 avec −6 < x₁ < 4 < x₂ (CMS) |
| Valeur absolue : équations et inéquations, y compris mêlées au 2e degré | x² − \|3x + 4\| ≤ x − 2 (MAN 2018) |
| Équations et inéquations irrationnelles | √(x² + 10x + 9) > \|x + 2\| − 5 (MAN 2017, 11 pts) |
| Majorer ou minorer une expression | Si \|x\| ≤ 1, alors \|x² + 3x\| ≤ 4. Prépare les gendarmes et ε-δ |

**G2. Exponentielles, logarithmes, fonctions hyperboliques**

| Compétence | Exemple |
|---|---|
| Puissances à exposant réel, règles du logarithme | Piège : ln(a + b) |
| Équations et inéquations exponentielles et logarithmiques, avec une base < 1 | log₁/₁₀(x − 1) ≥ −1 + log₁₀(x + 1) (MAN 2017) |
| Équations du type xˣ | (√x)ˣ = x^√x (CMS) |
| sinh, cosh, tanh : définitions, formules, graphes | cosh 2x en fonction de tanh x (CMS) |
| Équations hyperboliques ; arg sinh et arg cosh | cosh x + 2 sinh x = 3 (CMS) |

**G3. Trigonométrie**

| Compétence | Exemple |
|---|---|
| Radians, cercle trigonométrique, réduction d'angles | |
| Valeurs exactes sans calculatrice | cos(7π/12), tan(π/8) (CMS) |
| Formules d'addition, d'angle double, de demi-angle, somme-produit | |
| a·sin x + b·cos x : équations et inéquations | √12 cos 2x − 2 sin 2x ≥ −2 sur [0, 2π] (MAN 2018) |
| Équations trigonométriques ; substitution t = tan(x/2) (Bioche) | |
| Résoudre un triangle (sinus, cosinus) | a = 12, b = 18, γ = 53° (CMS) |
| Fonctions arc et leurs compositions | arccos(cos(17π/3)) ; cos(2 arccos(2/5)) (CMS) |

**G4. Géométrie analytique du plan et de l'espace**

| Compétence | Exemple |
|---|---|
| Vecteurs, relation de Chasles, combinaisons | |
| Droites : équations paramétriques et cartésiennes ; bissectrices, médiatrices | |
| Plans et droites de l'espace, positions relatives | |
| Produit scalaire, projections, angles | |
| Produit vectoriel, aires ; produit mixte, volumes | Tétraèdre A(2,4,2), B(−4,1,2), C(0,3,8), D(2,−1,6) (MAN 2018) |
| Distances : point-plan, point-droite, entre droites gauches | |
| Perpendiculaire commune, droite qui s'appuie sur deux droites gauches | MAN 2018, Q3 |
| Sphères | |

**G10. Cercles et coniques** (CMS)

| Compétence | Exemple |
|---|---|
| Cercle : centre, rayon, tangentes | 3x² + 3y² + 42x − 6y + 75 = 0 |
| Puissance d'un point, axe radical, pôle et polaire, cercles orthogonaux | |
| Ellipse, hyperbole, parabole : foyers, directrices, excentricité, asymptotes | 9x² − 4y² − 54x + 117 = 0 |
| Tangentes à une conique | |
| Réduire une conique avec un terme en xy | x² + 4xy + y² + 8x + 4y − 2 = 0 (CMS 2018, 7,5 pts). Demande les valeurs propres (L) |
| Familles de coniques à paramètre, lieu des centres | |
| Coordonnées homogènes (opt.) | |

**G5. Suites, sommes, récurrence**

| Compétence | Exemple |
|---|---|
| Notation Σ, changement d'indice | |
| Suites arithmétiques et géométriques | |
| Preuve par récurrence | fₙ = f∘fₙ₋₁ avec f(x) = x³, donc fₙ(x) = x^(3ⁿ) (Analyse I 2021) |

**G6. Analyse de base**

| Compétence | Exemple |
|---|---|
| Dérivées usuelles, règles, tangente | |
| Dérivée implicite ; tangente commune à deux courbes | −2x³ + 3y² + 2x + p = 0 tangente à y = −2x + 1 (MAN 2018) |
| Étude de fonction complète : extrema, inflexion, points anguleux et de rebroussement, asymptotes obliques, branches paraboliques | \|x³ − a³\| + 3x : a pour que le point anguleux soit un extremum (MAN et CMS 2018) |
| Optimisation | |
| Primitives usuelles ; aire | |

**G7. Combinatoire et probabilités élémentaires**

| Compétence | Exemple |
|---|---|
| Principe multiplicatif, arrangements, permutations, combinaisons | |
| Binôme de Newton | |
| Ordonné ou pas ? Avec ou sans remise ? | Exercice éclair |
| Probabilité de Laplace, arbres (opt. : absent du CMS) | |

**G8. Nombres complexes**

| Compétence | Exemple |
|---|---|
| Forme algébrique, conjugué, module, division | |
| Forme polaire et exponentielle, Moivre, racines n-ièmes | |
| 2e degré à coefficients complexes | (1 + i)z² + 2(2 + i)z + 4(3 + i) = 0 (MAN 2017) |
| Lieux dans le plan complexe | \|z − i\| = \|z + 4 + 7i\| |
| Transformations : translation, rotation, homothétie, similitude, inversion | Rapport AC/AB et angle BAC (MAN 2017) |
| Polynômes complexes, théorème fondamental | |

**G9. Logique et langage mathématique**

| Compétence | Exemple |
|---|---|
| Ensembles, intervalles ]a, b[ | |
| Implication, réciproque, contraposée | |
| Quantificateurs : lire, écrire, nier | |
| Types de preuve : directe, absurde, contraposée, récurrence, contre-exemple | |

### A1. Analyse I

L'ordre suit le cours GM (Friedli). Le cours MT (Wittwer) est voisin, avec en plus des notions de base, la bissection et le point fixe. **Il n'y a pas d'équations différentielles en Analyse I** : elles sont en Analyse II.

| Compétence | Exemple |
|---|---|
| **Réels** : Inf, Sup, Max, Min d'ensembles définis par des fonctions | A = {x : 0 < Arctan(1/x) < π/4} (2021) |
| **Complexes au niveau de l'examen** : zⁿ = z̄, zⁿ = 1/z̄, sans oublier r = 0 | z = (2i⁹ − 4i¹⁵)/(1 − i) ; z⁶ ? (2022) |
| **Suites** : définition ε-N, choix de N | |
| Limites : opérations, formes indéterminées | |
| Gendarmes : trouver les deux bornes | |
| Formes 1^∞ : écrire e^(n·Log(…)) | aₙ = e^(−n)·e^(n²·Log(1 + 1/n)) → 1/√e (2022) |
| Critère de d'Alembert pour les suites | lim 2^(n²)/(n!)² (2014) |
| Suites monotones et bornées ; Cauchy ; lim sup, lim inf ; sous-suites | |
| aₙ₊₁ = q·aₙ + c → formule explicite | a₀ = 1, aₙ₊₁ = 2aₙ + 1 |
| Suites récurrentes aₙ₊₁ = f(aₙ) par l'étude de f | Problème long (MT 2014, 13 pts) |
| **Séries** : géométrique, télescopique, condition uₙ → 0 | |
| Comparaison, critère de la limite du quotient | |
| Critères de d'Alembert et de Cauchy ; Leibniz ; convergence absolue | |
| Séries à paramètre : trouver l'ensemble de convergence | Σ (λ/(1 − λ))ⁿ ; Σ (b + 1/k)^k (2021) |
| **Fonctions** : limites, limites à gauche et à droite, prolongement par continuité | |
| Continuité, théorème des valeurs intermédiaires, image d'un intervalle | Image de [0, π/2] par eˣ cos x (2022) |
| Définition ε-δ | lim de 5x + 1 = 11 en 2 (2019) |
| **Dérivées** : par la définition, règles, dérivée d'une réciproque | |
| Dérivée logarithmique | (x + 2)ˣ, x^(xˣ) |
| Fonctions par morceaux : choisir a et b, montrer f ∈ C¹ | f(x) = 5x + x³ sin(1/x), f(0) = 0 (2022, 6 pts) |
| Accroissements finis | |
| Bernoulli-l'Hôpital, avec ses conditions | |
| Extrema globaux sur [a, b] : bornes, f′ = 0, f′ qui n'existe pas | 2019, 7 pts |
| Étude de fonction : convexité, asymptotes | |
| Courbes paramétrées et polaires | ρ = a·tan(φ/2) : asymptote, tangentes (MT 2014, 12 pts) ; Douchet 5.7 |
| **DL** : DL usuels, notation xⁿ·ε(x) | |
| Opérations sur les DL, y compris une composition dont la constante intérieure n'est pas nulle | e^(1/(1 − x)) à l'ordre 2 (2022) |
| Limites par DL | |
| Lire f⁽ⁿ⁾(0) ou la nature d'un extremum sur un DL | ln(1 + x²)/sin x, f⁽⁵⁾(0) (2014) |
| Reste de Taylor (opt.) | |
| **Séries entières** : rayon, domaine bornes comprises | Σ 2ⁿ/3ⁿ⁺⁴ (x + 1)ⁿ |
| Dériver une série entière, sommes par MacLaurin | 1/2! − 1/3! + 1/4! − … |
| **Intégrales** : primitives, substitution (choisir φ), parties | |
| Formules de récurrence | Iₙ = ∫ xⁿ sin 2x dx |
| Fractions rationnelles (DES), y compris avec des facteurs irréductibles | ∫₁^∞ (7x − 2)/(x³ + 3x² + 5x + 3) dx (MT 2014, 12 pts) |
| Fractions rationnelles en sin et cos | ∫ (1 + cos x)/(sin x − ⅕ sin³x) dx (CMS 2018) |
| Théorème fondamental ; dérivée de ∫ de a à g(x) | |
| Intégrales généralisées par comparaison, sans les calculer ; bornes notées 0⁺, 1⁻ | ∫ de 2⁺ à 5⁻ de dx/√(7x − 10 − x²) |
| Applications : volumes, longueurs d'arc, aires de révolution | y = sinh²x (CMS 2018) |
| **sinh, cosh dans les intégrales** | ∫₀^∞ dx/(2 + cosh x) converge ? |
| **Définitions à écrire** | « Définir C¹(I) » |

### L. Algèbre linéaire

Le cours suit le manuel de Lay : chapitres 1 à 6, plus 7.1 et 7.4. L'examen final est fait de QCM et de vrai/faux. En MT, une partie spécifique contient des problèmes longs.

| Compétence | Exemple |
|---|---|
| **Systèmes** : matrice augmentée, opérations élémentaires | |
| Formes échelonnée et échelonnée réduite, pivots, variables libres, solution paramétrique | |
| Système à paramètre : aucune, une ou une infinité de solutions | Au moins une solution ssi a ∈ {−2, 3} (2021) |
| **Vecteurs** : combinaisons, Span, Ax vu comme combinaison des colonnes | |
| Indépendance linéaire | |
| **Applications linéaires** : matrice canonique à partir d'images données | T(e₁) = 4e₁ − 3e₂ + 5e₃, T(2e₂) = …, T(e₂ + e₃) = … (révision MT) |
| Injective ou surjective, lu sur les pivots | T(x) = Ax avec A de taille 3 × 4 (2021) |
| Géométrie dans ℝ² : rotation, projection, symétrie, affinité | Affinité d'axe x + 2y = 0, de direction x − 3y = 0, de rapport −2/3 (CMS) |
| **Matrices** : produit, transposée, inverse par [A \| I] | b₃₂ de A⁻¹ |
| Matrices élémentaires, factorisation LU | ℓ₄₂ de L |
| Produit par blocs, complément de Schur | Série GM 14 |
| **Déterminant** : cofacteurs, opérations sur les lignes, det(AB), det(kA) | Vandermonde par opérations sur les lignes |
| Aire et volume ; Cramer (opt.) | |
| **Espaces vectoriels** : est-ce un sous-espace ? Y compris dans Pₙ et M_{m×n} | |
| Ker A, Col A, espace des lignes | |
| Base, dimension, rang, théorème du rang | |
| Coordonnées dans une base | |
| Matrice d'une application entre Pₙ ou M_{m×n} | T : P₃ → ℝ⁴ dans la base B, coefficient a₃₄ (2021) |
| Matrice de passage P_{C←B} entre deux bases non canoniques | Bases de P₂ (quiz MT 2017) |
| **Valeurs propres** : polynôme caractéristique, espaces propres | |
| Valeurs propres de cA, Aᵏ, A⁻¹, Aᵀ, BAB⁻¹ | |
| Diagonaliser ; diagonalisable selon un paramètre | |
| Puissances Aᵏ, récurrences linéaires, chaîne de Markov à 2 états | « 80 % reprennent un café… et à la longue ? » (série MT) |
| **Orthogonalité** : produit scalaire, norme, projection, W⊥ | Base de W⊥ dans ℝ⁴ (2021) |
| Gram-Schmidt, QR | r₃₃ de QR |
| Moindres carrés | x₁ de la solution |
| Produits scalaires non standards | (u \| v) = uᵀAᵀAv ; ⟨A, B⟩ sur M₂ₓ₂ |
| **Matrices symétriques** : diagonalisation orthogonale | |
| Formes quadratiques, axes principaux | Q = 3(x₁² + x₂² + x₃²) + 2(x₁x₂ + x₁x₃ + x₂x₃) |
| **SVD**, y compris l'image de la sphère unité (MT) | A = [[3, 1, 1], [−1, 3, 1]] (série MT 14 ; examen MT 2017, 14 pts) |
| **Preuves courtes** | Les espaces propres d'une matrice symétrique sont orthogonaux ; la matrice canonique est unique |

### A2. Analyse II

| Compétence | Exemple |
|---|---|
| **ℝⁿ** : normes, ouvert, fermé, borné, compact, bord ; suites et sous-suites | |
| Courbes : paramétrisation, longueur d'arc | γ(t) = (t cos t, t sin t, t) |
| **Limites** : non-existence par deux chemins ; existence par les coordonnées polaires et les gendarmes | Les droites ne suffisent pas : chemin y = x² |
| **Dérivées partielles**, gradient | |
| Dérivée directionnelle par la définition | xy⁴/(x⁴ + y⁸) suivant v = (1/2, √3/2) (2021) |
| Différentiable, C¹, dérivées partielles : quelle propriété implique quelle autre ? | Vrai/faux |
| Plan tangent à un graphe ; plan tangent à une surface de niveau via ∇F | x⁴ + y⁴ + z⁸ = 3 en (1, −1, 1) (2021) |
| **Règle de chaîne**, jacobienne | |
| Laplacien en coordonnées polaires ou radiales | Δf(r) = f″ + (n − 1)/r·f′ |
| Schwarz ; polynôme de Taylor d'ordre 2 à deux variables | cos(2x + 3y + y²) (2020) |
| **Fonctions implicites**, y compris à 3 variables | ∂g/∂y = −F_y/F_z |
| **Extrema** : points stationnaires, hessienne (2 × 2 puis 3 × 3, par la trace, le déterminant ou les valeurs propres) | |
| Extrema sur un compact, bord compris | y + 2x sur un demi-disque (test 2015) |
| Multiplicateurs de Lagrange | max de xy sous 2x² + y² = 4 |
| **Intégrales à paramètre**, dérivée avec des bornes variables | F(t) = ∫ de t à t² de (1 − e^(−xt))/x dx (2020) |
| **Intégrales multiples** : Fubini, décrire un domaine, changer l'ordre | |
| Changement de variables, jacobien, polaires, cylindriques, sphériques (θ mesuré depuis l'axe z) | |
| Intégrales impropres sur ℝ² et ℝ³, intégrale de Gauss | ∬ dx dy/(1 + x² + y²)² = π |
| Volumes ; masse et centre de masse (opt.) | |
| **EDO** : problème de Cauchy, existence et unicité (Lipschitz) | |
| À variables séparables | y′ = e^(x − y) ; y′ = 4 − y² |
| Linéaires du 1er ordre, facteur intégrant | cos x·y′ + sin x·y = cos²x, y(0) = 2 |
| Changement de variable y = x·v | xy′ − y = x cos²(y/x) (2018) |
| 2e ordre à coefficients constants ; Wronskien, réduction d'ordre | |
| Solution particulière, résonance | u″ + 9u = sin 3x |
| Stabilité selon un paramètre | y″ + (α + 1)y′ + y/4 = 0 : lim y = 0 ? (2020) |
| Équations exactes, systèmes linéaires (opt.) | |

### V. Analyse vectorielle

Notations du cours : ∫ f dl et ∫ F · dl sur les courbes, ds sur les surfaces, ∧ pour le produit vectoriel, rot scalaire en 2D. « F dérive d'un potentiel » signifie F = ∇φ, sans signe moins.

| Compétence | Exemple |
|---|---|
| grad, div, rot, laplacien ; identités | rot grad = 0 ; div(fF) = f div F + F · ∇f |
| Paramétrer une courbe ; ∫ f dl ; ∫ F · dl ; orientation | |
| Topologie du domaine : convexe, étoilé, simplement connexe | F = (−y, x)/(x² + y²) dérive-t-elle d'un potentiel sur un rectangle ? Une couronne ? |
| Potentiel : test rot F = 0, sur quel domaine | |
| Trouver un potentiel pas à pas, y compris avec un paramètre | λ pour que rot F = 0, puis φ avec φ(3, 2, −1) = 0 (2022) |
| Montrer qu'il n'y a pas de potentiel : ∮ sur le cercle ≠ 0 | |
| Green, y compris sa forme flux ∮ F · ν dl = ∬ div F, et le calcul d'une aire | |
| Paramétrer une surface ; normale σ_u ∧ σ_v ; aire | |
| Intégrale de surface, flux | |
| Bord ∂Σ = σ(∂A) : retirer les morceaux qui se réduisent à un point ou qui s'annulent ; sens de parcours | Hémisphère (2022) |
| Théorème de la divergence | Ω = {4(x² + y²) < z², 0 < z < 2} |
| Théorème de Stokes | |
| **Vérifier un théorème en calculant les deux membres** | Stokes pour F = (0, x, 0) (2021, 14 pts) |
| Petites preuves d'identités | div F = 0 ⇒ G dérive d'un potentiel (3 pts) |

### C. Analyse complexe

| Compétence | Exemple |
|---|---|
| Équations dans ℂ ; Log, z^α et leurs dérivées | 2 cosh z + sinh z = i |
| Cauchy-Riemann, holomorphie | |
| Construire f holomorphe à partir de v ; l'écrire en fonction de z | v = 3x²y − y³ + e^(x² − y²) sin(2xy) |
| Intégrales de contour par paramétrisation | |
| Théorème de Cauchy, formule intégrale de Cauchy | |
| Séries de Taylor et de Laurent dans une couronne donnée | 1/(1 − z) pour \|z\| < 1, puis pour \|z\| > 1 |
| Classer les singularités | |
| Résidus : pôle simple, pôle multiple, à partir de la série de Laurent | sin(1/(2i − 3z)) |
| Intégrales rationnelles sur ℝ, intégrales trigonométriques sur [0, 2π] | |
| Intégrales avec e^(iαx) ; montrer à la main que l'arc tend vers 0 | |
| Intégrales avec coupure (GM) | ∫₀^∞ x^(1/3)/(1 + x²) dx |
| Transformée de Fourier calculée par les résidus (GM) | F(1/(4 + x⁴)) |
| Applications conformes (opt.) | |

### F. Fourier, Laplace, EDP, distributions

Conventions du cours :
- a₀/2 dans la série ;
- f̂(α) = (1/√(2π)) ∫ f(y)·e^(−iαy) dy ;
- F(f ∗ g) = √(2π)·f̂·ĝ ;
- Laplace : F(z) = ∫₀^∞ f(t)·e^(−tz) dt, sur Re z > γ₀.

Les tables du cours sont données à l'examen.

| Compétence | Exemple |
|---|---|
| Coefficients de Fourier ; raccourcis de parité ; a₀ et les petits indices traités à part | f = 1 + cos 2x + \|x\| (2022) |
| Lire les c_k d'une somme d'exponentielles | cos x + 3 sin 3x |
| Séries en sinus et en cosinus sur [0, L] (prolongement impair ou pair) | f(x) = −x² + 2πx sur [0, π] (dans presque tous les examens MT) |
| Dirichlet : valeur aux sauts, puis en déduire une somme numérique | Σ 1/(2n + 1)² |
| Parseval, et autres sommes | Σ 1/n⁶ = π⁶/945 |
| Relations entre coefficients par intégration par parties ; dérivation terme à terme | |
| Transformée de Fourier : calcul direct, table, propriétés | f = 1 − x² si \|x\| ≤ 1 |
| Équations de convolution résolues par la transformée de Fourier | 2u + 3·f ∗ u = f, f = e^(−\|x\|) (2022) |
| Plancherel | |
| EDO périodique par séries de Fourier ; Sturm-Liouville (GM) | |
| Laplace : table, propriétés, abscisse de convergence | |
| Laplace inverse par éléments simples, puis par les résidus | F = 1/(z⁴ − 2z³ + 2z²) (2019) |
| EDO avec conditions initiales par Laplace ; équations intégro-différentielles (GM) | |
| EDP : séparation des variables, équation de la chaleur (Dirichlet, Neumann, terme source) | |
| Équation des ondes ; d'Alembert par la transformée de Fourier en x | |
| Laplace dans un disque, dans un demi-plan | |
| **Distributions** (MT/SV) : ⟨T_f, φ⟩, dérivée au sens des distributions, f·δ_a | f = e^(−t) pour t > 0, 0 sinon : Df = −f + δ |
| Équations avec δ ; transformée de Fourier de cos | y′ + y = δ |

### P. Probabilités et statistique

GM suit MATH-234 (Wilhelm 2022), et MT suit EE-209 (statistique pour data science, en anglais, que des QCM). Les deux ont un tronc commun.

| Compétence | Exemple | Cours |
|---|---|---|
| Statistique descriptive : médiane, quartiles, boîte à moustaches, résumé en 5 valeurs | | GM |
| Axiomes, événements ; inclusion-exclusion à 2 événements | | |
| Équiprobabilité, dénombrement (réutilise G7) | 4 cartes parmi 32, exactement 2 dames | |
| Conditionnement, probabilités totales, Bayes (fréquences naturelles, puis formule) | | |
| Indépendance, et sa différence avec « incompatibles » ; systèmes redondants | | |
| Variables discrètes : fonction de masse, fonction de répartition, fonction quantile ; Bernoulli, binomiale, Poisson, lien Poisson-binomiale | | |
| Variables continues : normaliser une densité, calculer un quantile | f(x) = 3x² sur [0, 1] : quartile supérieur | |
| Uniforme, exponentielle ; Gamma, Beta, Weibull, Pareto, à reconnaître pour éviter un calcul | f ∝ y²·e^(−y/θ), donc Γ(3, θ) | |
| Loi normale : standardiser, table de Φ | | |
| Transformation Y = g(X) ; densité d'une somme ; mélange de gaussiennes | | EE-209 |
| Lois conjointes : constante de normalisation, marginales, indépendance | f(w, z) = c·w(w + z) sur [0, 3]² | |
| Espérance, variance, covariance, corrélation ; corrélation n'est pas causalité | | |
| Espérance et variance totales | Examinateur Mary ou Frank (examen type) | GM |
| Markov, Tchebychev, loi des grands nombres, TCL, approximation de la binomiale | L'ascenseur : 16 personnes, 1 280 kg | |
| Maximum d'un échantillon : F(x)ⁿ, puis un IC exact | | GM |
| Méthode des moments | | |
| Maximum de vraisemblance, étape par étape : L, ln L, ℓ′ = 0, vérifier le maximum | | |
| Biais, variance, erreur quadratique moyenne ; consistance | | |
| Information de Fisher, Cramér-Rao | | EE-209 |
| Intervalles de confiance : pivot, Student, Wald (avec −ℓ″), Wilson | | |
| Arrondir un IC selon les chiffres significatifs | | EE-209 |
| Tests : H₀ et H₁, uni- ou bilatéraux, p-valeur, erreurs de type 1 et 2, puissance | | |
| Test t à un échantillon ; test t à deux échantillons avec variance poolée ; deux proportions | | GM |
| Test χ² d'adéquation et d'indépendance ; χ² sur une variance | | GM ; EE-209 |
| Interpréter une p-valeur ou un IC | | |
| Régression : moindres carrés (réutilise L), tests t sur les coefficients, R², test F pour modèles emboîtés, diagnostics | | GM |
| Statistique bayésienne : Beta-Bernoulli, gaussien-gaussien, MAP, lois conjuguées | Loi a priori uniforme, 2 réussites → Beta(3, 1) | EE-209 |
| Loi hypergéométrique (opt.) | | |

### N. Analyse numérique

GM suit le cours de Nobile, avec des TP Matlab. MT suit le MOOC de Picasso, qui suit le livre de Rappaz et Picasso, et s'appelle en 2020–2021 « Analyse numérique et optimisation ». Les examens 2019–2022 sont sur papier : QCM, vrai/faux, lignes de code à compléter, tableaux à lire, 2 questions de preuve.

| Compétence | Exemple | Cours |
|---|---|---|
| Erreurs absolue et relative ; arrondis | | |
| Point fixe : condition \|φ′\| < 1, ordre, ordre selon un paramètre | Pour quels ω l'ordre est-il 2 ? | |
| Bissection : nombre d'itérations k > log₂((b − a)/tol) − 1 | | GM |
| Newton ; Newton sur une racine multiple (ordre 1) ; Newton pour les systèmes, avec la jacobienne à la main | | |
| Lire l'ordre sur les rapports d'incréments | | |
| Interpolation : Lagrange, Vandermonde à la main, erreur, Runge | Points (0, 12), (1, 18), (2, 6) | |
| Linéaire par morceaux, splines | | GM |
| Moindres carrés : équations normales à la main | 3 points | |
| Différences finies : progressives, rétrogrades, centrées ; compromis entre arrondi et troncature | | |
| Construire une formule de différences finies par Taylor | (αf(x̄) + βf(x̄ − h) + γf(x̄ − 2h))/h d'ordre 2 | |
| Prouver l'ordre d'une formule | \|f′(x₀) − (−3f(x₀) + 4f(x₀ + h) − f(x₀ + 2h))/(2h)\| ≤ C·h²·max\|f‴\| (2019) | |
| Quadrature : rectangle, point milieu, trapèze, Simpson en h/6 sur chaque sous-intervalle | | |
| Degré d'exactitude ; ramener à [−1, 1] ; erreur d'une formule composite | J(g) = g(−α) + g(α) est exacte sur P₃ pour α = 1/√3 | |
| Richardson, estimation a posteriori | | GM |
| LU, pivot, coût O(n³) et O(n²), déterminant par LU | | |
| LU tridiagonale (Thomas), en O(N) | Ligne de code à compléter, dans chaque examen MT | |
| Méthodes itératives : Jacobi, Gauss-Seidel, gradient, critère d'arrêt | | GM |
| EDO : Euler explicite et implicite, Heun, Runge-Kutta, Crank-Nicolson | | |
| Stabilité absolue sur u′ = λu ; stable sans condition ou avec condition | | |
| Erreur globale d'Euler | u(t_N) − u_N = e^(−Nh) − (1 − h)^N ≤ 50h (2022) | |
| Euler implicite sur un système, avec un pas de Newton | | |
| Problèmes aux limites −u″ = f : matrice tridiag(−1, 2, −1)/h² ; symétrique définie positive ; consistance, stabilité, convergence en Ch² | Examens 2014 et 2022 | |
| Équation de la chaleur : Euler implicite et différences finies ; lire l'erreur O(h² + τ) | | |
| Forme faible avec une fonction chapeau (éléments finis) | −u″ = 1 → α = 1/8 (2021, 2022) | MT |
| Optimisation : gradient à pas fixe ou optimal, KKT | | MT 2020–21 |
| Sécante, différences divisées, Tchebychev, raideur (opt.) | | |

Cholesky, le conditionnement et la méthode de la puissance sont dans le module M. Le module N y renvoie.

### M. Analyse matricielle (nouveau)

Aucun cours ne porte ce nom. Ce module rassemble ce que les cours de BA4 utilisent sans le réenseigner : analyse numérique et optimisation, statistique pour data science, systèmes dynamiques (ME-221). Les usages de BA5 et plus sont dans [plan-ba5-et-plus.md](plan-ba5-et-plus.md) : forme d'état, fonction de transfert, commandabilité, placement de pôles, Lyapunov, ACP, Kalman.

Prérequis : L et les EDO de A2.

| Compétence | Exemple | Utilisé dans |
|---|---|---|
| Calcul par blocs, complément de Schur | S = A₂₂ − A₂₁·A₁₁⁻¹·A₁₂ | Algèbre linéaire GM, systèmes KKT |
| Matrice de rang 1, projecteur uuᵀ | u = (1, 1)/√2 → P = ½[[1, 1], [1, 1]], P² = P | Algèbre linéaire MT 2016 |
| Décomposition spectrale A = Σ λᵢ·uᵢ·uᵢᵀ | | Algèbre linéaire, signaux |
| Matrice définie positive : critères (valeurs propres, xᵀAx > 0) | [[2, −1], [−1, 2]] : λ = 1 et 3 | Analyse numérique, MPC |
| Cholesky pas à pas | [[4, 2], [2, 5]] → L = [[2, 0], [1, 2]] | Analyse numérique |
| Gradient et hessienne d'une forme quadratique | ∇(½xᵀAx − bᵀx) = Ax − b | Optimisation, régression |
| Équations normales, matrice de design, Var(β̂) = σ²(XᵀX)⁻¹ | | Statistique, régression |
| Quotient de Rayleigh, méthode de la puissance et puissance inverse | A = [[2, 1], [1, 2]], x⁰ = (1, 0) → 14/5 → 3 | Analyse numérique |
| SVD à la main ; image de la sphère ; approximation de rang k | A = [[3, 1, 1], [−1, 3, 1]] → σ = √12 et √10 | Algèbre linéaire MT, compression |
| Normes matricielles, conditionnement κ | κ₂([[2, −1], [−1, 2]]) = 3 | Analyse numérique |
| Disques de Gershgorin (opt.) | | Analyse numérique GM |
| Système x′ = Ax obtenu à partir d'une EDO d'ordre 2 | ÿ + 3ẏ + 2y = 0 → A = [[0, 1], [−2, −3]] | Systèmes dynamiques, analyse numérique |
| Solution par modes propres ; stabilité par Re λ < 0 | | Systèmes dynamiques, analyse numérique |
| Exponentielle de matrice, y compris pour une valeur propre double | [[−1, 1], [0, −1]] → e^(−t)·[[1, t], [0, 1]] | Systèmes dynamiques |
| Systèmes discrets x⁺ = Ax : stables si \|λ\| < 1 ; Aᵏ | | Chaînes de Markov, schémas numériques |

## 8. Pièges à reconnaître

Même format que [error-catalogue.md](error-catalogue.md). Les étiquettes :
- [R] recherche ;
- [C] correction d'examen ou remarque d'un cours ;
- [E] expérience d'enseignement, à faire vérifier par un enseignant.

| Module | Piège | Faux → juste | Tag |
|---|---|---|---|
| G0 | Racine complexe sans sa conjuguée, pour un polynôme réel | | E |
| G1 | Élever au carré une inéquation irrationnelle sans conditions | | E |
| G1 | Valeur absolue « enlevée » ; inégalité non retournée | | E |
| G2 | Logarithme d'une somme | ln(a + b) = ln a + ln b | R (Matz) |
| G2 | Base < 1 : sens de l'inégalité non retourné | | E |
| G3 | Degrés et radians mélangés | | E |
| G9 | Négation qui change un seul quantificateur | | R (Dubinsky & Yiparaki) |
| G9 | Preuve par des exemples | | R (Harel & Sowder) |
| A1 | Gendarmes : bornes introuvables, ou dans le mauvais sens | | C (résumé « Calcul de limites ») |
| A1 | zⁿ = z̄ : le cas r = 0 oublié (division par zéro) | | C (guide « Méthodes ») |
| A1 | (fg)′ = f′g′ ; règle de chaîne oubliée | | R (Orton) |
| A1 | ∫ fg = ∫f · ∫g | | R (Orton) |
| A1 | ∫ 1/(1 + x²) = ln(1 + x²) | | E |
| A1 | « + C » oublié ; substitution sans changer dx ou les bornes | | E |
| A1 | Singularité ignorée | ∫ de −1 à 1 de dx/x² = −2 | R (Orton) |
| A1 | Formes indéterminées « calculées » : 1^∞ = 1, ∞ − ∞ = 0 | | E |
| A1 | Bernoulli-l'Hôpital sans forme indéterminée, ou appliqué à (f/g)′ | | E |
| A1 | DL d'ordre insuffisant | | E |
| A1 | uₙ → 0, donc la série converge | Σ 1/n | R |
| A1 | Rapport de d'Alembert = 1, donc « converge » | | E |
| A1 | Domaine d'une série entière : bornes oubliées | | E |
| A1 | Limite vue comme une borne jamais atteinte ; 0,999… < 1 | | R (Cornu ; Tall & Vinner) |
| A1 | δ qui dépend de x | | E |
| A1 | Point anguleux non vu (dérivées à gauche et à droite différentes) | | E |
| L | Opération faite sur la matrice mais pas sur le second membre | | E |
| L | Variable libre mise à 0, donc une seule solution | | E |
| L | Injectivité lue sur les lignes au lieu des colonnes | | E |
| L | AB = BA ; (AB)⁻¹ = A⁻¹B⁻¹ | | R (Harel) |
| L | det(A + B) = det A + det B ; det(kA) = k·det A | | E |
| L | Vecteur nul comme vecteur propre ; λ soustrait à une seule case | | E |
| L | Colonnes de P ou de U dans un autre ordre que celles de D | | C (corrigé MT 2016) |
| L | Gram-Schmidt sans diviser par la norme au carré | | E |
| L | SVD : uᵢ = Avᵢ sans diviser par σᵢ | | E |
| A2 | Limite qui existe parce que les droites donnent la même valeur | Chemin y = x² | C (fiche d'Analyse II) |
| A2 | Jacobien oublié (r dr dθ, r² sin θ) | | E |
| A2 | Bornes de Fubini : variable intérieure dans les bornes extérieures | | E |
| A2 | det hessienne > 0, donc minimum, sans regarder f_xx | | E |
| A2 | Lagrange : bord ou contrainte oubliés | | E |
| A2 | Résonance : u_p = A cos 3x + B sin 3x sans facteur x | | E |
| A2 | Dérivée d'une intégrale à paramètre : un des trois termes oublié | | E |
| V | Signe faux dans rot ; rot écrit comme une seule équation | | C (Analyse III 2022) |
| V | Convexité ou simple connexité non mentionnée | | C |
| V | Potentiel : « constantes » α(y, z) mal traitées, constante finale oubliée | | C |
| V | Potentiel : intégrale en x plus intégrale en y, termes comptés deux fois | | E |
| V | Sens du bord faux ; morceaux du bord mal retirés | | C |
| V | Green cité sans calculer rot = 2 ; Green avec une singularité dans le domaine | | C |
| V | \|γ′(t)\| oublié dans ∫ f dl | | E |
| F | « f paire ⇒ aₙ = 0 » | Ce sont les bₙ qui s'annulent | C |
| F | a₀ ou a₂ pas traités à part | | C |
| F | Parseval : bornes fausses, carré ou facteur 2/T oublié | | C |
| F | √(2π) oublié dans la convolution | | C |
| F | e^(−2\|x\|) écrit e^(−2x) ; mauvaise ligne de la table | | C |
| F | [0, 2π] et [−π, π] confondus pour \|x\| | | C |
| C | Pôle hors du contour compté | | C (astuces d'Analyse IV GM) |
| C | cos z et sin z traités comme bornés | | C |
| C | Formule du pôle simple utilisée pour un pôle double | | E |
| C | i sous une racine carrée | | C |
| F | Laplace : Re z > α oublié | | C |
| P | P(A \| B) pris pour P(B \| A) ; taux de base oublié | | R (Eddy ; Tversky & Kahneman) |
| P | Erreur de conjonction ; erreur du joueur | | R |
| P | « Indépendants » et « incompatibles » confondus | | E |
| P | Var(X + Y) = Var X + Var Y sans indépendance ; Var(aX) = a·Var X | | E |
| P | Maximum de vraisemblance : point stationnaire non vérifié comme maximum | | C (cours MATH-234) |
| P | « Ne pas rejeter H₀ » lu comme « H₀ est vraie » | | C |
| P | Corrélation lue comme causalité | | C |
| P | Condition du TCL lue sur la population au lieu de l'échantillon | | C (QCM EE-209) |
| P | p-valeur = P(H₀ vraie) ; « 95 % de chances que μ soit dans l'IC » | | R (Haller & Krauss ; Hoekstra et al.) |
| P | Rejeté à 10 %, donc rejeté à 5 % | | C (QCM EE-209) |
| N | Newton écrit x − f′/f ; « Newton est toujours d'ordre 2 » | | E ; C |
| N | Ordre lu sur le rapport simple au lieu de la puissance p | | E |
| N | Simpson : h/3 et h/6 mélangés | | C (convention du cours) |
| N | LU sans pivot sur un pivot nul | | C (série GM 8) |
| N | Stabilité et ordre de convergence confondus en lisant un tableau | | C |
| N | ∃C ∀f et ∀f ∃C confondus | | C (QCM d'analyse numérique) |
| N | Euler implicite calculé comme Euler explicite | | E |
| M | e^(A + B) = e^A·e^B quand AB ≠ BA ; e^(At) calculé case par case | | E |
| M | Critère discret \|λ\| < 1 utilisé en continu, ou l'inverse | | E |
| M | Matrice de commandabilité dans le mauvais ordre | | E |

## 9. Ce qu'il faut changer dans le moteur

Le plan d'algèbre prévoit déjà :
- les lettres et une forme normale exacte des polynômes et des fractions rationnelles ;
- la comparaison numérique des expressions qui contiennent des racines ;
- le jugement des lignes d'équations ;
- un repère interactif.

Ce plan ajoute :

1. **Les fonctions.**
   - sin, cos, tan, exp, Log, sinh, cosh, arc et arg, avec leurs domaines, en réel et en complexe.
   - Dérivation symbolique écrite à la main, pour vérifier les primitives, les potentiels et les solutions d'EDO.
2. **Deux juges, exact d'abord.**
   - Exact : polynômes et fractions rationnelles sur ℚ, ℚ(i), matrices sur ℚ, séries tronquées.
   - Numérique : évaluation en plusieurs points pris dans le domaine (méthode STACK).
3. **Séries tronquées**, pour les DL, les limites, les résidus et Laurent.
4. **Moteur matriciel exact.** Il calcule :
   - la forme échelonnée, le rang, le déterminant, le polynôme caractéristique, le noyau ;
   - les factorisations LU, QR, Cholesky et la SVD, sur des exemples construits pour tomber juste ;
   - l'exponentielle de matrice.

   Il reconnaît aussi l'opération élémentaire faite entre deux lignes.
5. **Probabilités et statistique.** Rationnels exacts, Φ et la loi de Student calculées par l'app, simulation, règle d'arrondi des IC.
6. **Flottants.** Ceux du navigateur, plus une arithmétique simulée à 4 chiffres.
7. **Petit interpréteur Python.** Un sous-ensemble de Python écrit à la main, sans `eval` : listes, boucles, fonctions, module `math`. Il sert aux exercices « compléter le code ». L'app exécute la ligne de l'élève sur des cas tests.
8. **Saisie et affichage.**
   - Le clavier gagne ∫, Σ, lim, d/dx, ∂, ∧, les lettres grecques, une grille de matrice et des indices.
   - L'affichage passe par **MathML**, que les navigateurs affichent sans bibliothèque.
   - Une ligne de Gauss se saisit comme « L2 ← L2 − 3L1 ».
9. **Lignes de décision, report d'erreur, sous-buts, aides sur demande, problème entier sans aide** (§4).
10. **Mode examen.** Un examen blanc par cours, au format réel : QCM, vrai/faux et questions ouvertes, barème avec points négatifs, minuteur, aucune aide. Le bilan donne une note estimée, dit si l'élève est « prêt », « presque » ou « pas encore », et liste les compétences à reprendre. En dehors du mode examen, il n'y a jamais de points négatifs.
11. **Profil.** Les années BA1 à BA4 s'ajoutent. Il n'y a pas de question sur la section.
12. **Générateurs « à l'envers ».** On part de la réponse pour que les nombres tombent juste :
    - P et D choisis d'abord, puis A = PDP⁻¹ ;
    - les racines d'abord, puis le polynôme ;
    - la primitive d'abord, puis sa dérivée ;
    - la solution de l'EDO d'abord, puis l'équation.

    Le recueil de Douchet et les séries servent de modèles de **types** d'exercices, sans recopier leurs énoncés.
13. **Graphe de compétences entre cours.** Exemples de dépendances :
    - coniques (G10) → valeurs propres (L) ;
    - hessienne → matrices définies positives (M) ;
    - Fourier → intégration par parties ;
    - Laplace → éléments simples (G0) ;
    - Newton → dérivées ;
    - moindres carrés → L, P, N et M ;
    - systèmes x′ = Ax (M) → EDO (A2) et valeurs propres (L).

## 10. Ordre de construction

Ces étapes viennent après l'étape 7 du plan d'algèbre. Chaque étape est utilisable seule, testée, puis publiée.

| Étape | Contenu | Taille | Moteur |
|---|---|---|---|
| U0 | Fonctions, juge numérique, dérivation symbolique, MathML, nouveau clavier, aides sur demande | Grande | Le socle |
| U1 | G9 Logique, G0 Polynômes, G1 Fonctions et inéquations, G2 Exp, log, hyperboliques, G3 Trigonométrie, G5 Suites | Grande | |
| U2 | G6, puis A1 : dérivées, DL, intégrales | Grande | Séries tronquées ; primitives vérifiées par dérivation |
| U3 | L Algèbre linéaire, et le mode examen | Grande | Moteur matriciel ; QCM « trouver un coefficient » ; examens blancs |
| U4 | A1 : réels, complexes (G8), suites, séries, limites, ε-δ, séries entières ; preuves en blocs ; définitions | Grande | Limites ; *Proof Blocks* ; trouver δ |
| U5 | G4 Géométrie analytique, G10 Coniques | Moyenne | Repère : coniques, courbes paramétrées |
| U6 | A2 Analyse II, avec les EDO | Grande | Plusieurs variables ; « décrire le domaine » ; juge d'EDO |
| U7 | G7, puis P | Grande | Lois, simulation |
| U8 | M Analyse matricielle | Moyenne | Factorisations, exponentielle de matrice |
| U9 | N Analyse numérique | Moyenne | Tableaux ; interpréteur Python |
| U10 | V, C, F | Grande | Paramétrisations, bord orienté, ℚ(i), transformées |

Raisons de cet ordre :
- Les dérivées et les intégrales viennent en premier (U2), parce que tout le reste s'en sert et qu'elles sont faciles à vérifier.
- L'algèbre linéaire (U3) peut être construite en parallèle de U2.
- Les coniques (U5) viennent après L, parce qu'il faut les valeurs propres pour réduire une conique.
- M (U8) vient avant N (U9) : M possède Cholesky, la méthode de la puissance et le conditionnement, et N s'en sert.

**Un parcours en branches, pas une ligne.** Les étapes de construction ont un ordre ; le parcours de l'élève n'en a pas. Après le calcul de base, une compétence s'ouvre dès que ses vrais prérequis sont acquis, c'est-à-dire ceux que ses exercices utilisent. Plusieurs branches sont ouvertes en même temps, et « Continuer » passe de l'une à l'autre. L'année n'est qu'une indication. Tout est obligatoire par défaut, y compris ce qui n'est enseigné que dans une autre section : apprendre plus que le strict nécessaire est voulu.

## 11. Limites, et décisions à prendre

**Ce que l'app ne fera pas :**
- Corriger une preuve écrite librement. Les preuves restent limitées aux blocs, aux charpentes, aux définitions, aux négations, aux δ et aux contre-exemples.
- Faire écrire des programmes complets. Seulement compléter des lignes.
- L'intégrale de Lebesgue et l'analyse de la section de mathématiques.
- Remplacer le cours. L'app remplace les séries d'exercices et leur corrigé tardif.

**Décisions prises le 9 novembre 2026 :**
- **Section.** L'app ne pose pas la question. Les contenus suivent MT. Ce qui est propre à une section est étiqueté, mais reste **obligatoire** : le but est que les maths soient agréables, pas d'en faire le minimum.
- **Parcours.** Il se ramifie après le calcul de base, avec seulement de vrais prérequis (§10).
- **Probabilités et statistique.** Les deux cours sont couverts, MATH-234 et EE-209.
- **Points négatifs.** Seulement dans le mode examen, qui sert à mesurer si l'élève est prêt.
- **Code à compléter.** Python.
- **Étendue de M.** M s'arrête au niveau BA4. L'automatique, Lyapunov, l'ACP et Kalman vont dans [plan-ba5-et-plus.md](plan-ba5-et-plus.md).
- **Notation.** On suit les cours, et on accepte aussi les autres écritures en saisie : o(xⁿ), × pour ∧, ln pour Log, arctan pour Arctg.
- **Suivre l'erreur.** Chaque catalogue dit, item par item, où c'est permis. Par défaut : dans les tableaux et les problèmes longs.

**Encore ouvert :**
- **Langue.** L'Analyse III MT 2021-22 et EE-209 sont en anglais. Faut-il traduire l'app vers l'anglais à partir de BA3 ?

## Références

Citées de mémoire. Les références sont à vérifier, et les liens à ajouter avant de publier ce document. Les références déjà listées dans [plan-calcul-algebre.md](plan-calcul-algebre.md) ne sont pas répétées ici.

**Recherche**
- Aleven, V., & Koedinger, K. R. (2002). An effective metacognitive strategy: Learning by doing and explaining with a computer-based Cognitive Tutor. *Cognitive Science*, 26(2).
- Carlson, D. (1993). Teaching linear algebra: Must the fog always roll in? *College Mathematics Journal*, 24(1).
- Carlson, D., Johnson, C. R., Lay, D. C., & Porter, A. D. (1993). The Linear Algebra Curriculum Study Group recommendations for the first course in linear algebra. *College Mathematics Journal*, 24(1).
- Catrambone, R. (1998). The subgoal learning model. *Journal of Experimental Psychology: General*, 127(4).
- Chi, M. T. H., Bassok, M., Lewis, M. W., Reimann, P., & Glaser, R. (1989). Self-explanations. *Cognitive Science*, 13(2).
- Cornu, B. (1991). Limits. In D. Tall (Ed.), *Advanced Mathematical Thinking*. Kluwer.
- Dorier, J.-L. (Ed.) (2000). *On the Teaching of Linear Algebra*. Kluwer.
- Dubinsky, E., & Yiparaki, O. (2000). On student understanding of AE and EA quantification. *Research in Collegiate Mathematics Education IV*.
- Eddy, D. M. (1982). Probabilistic reasoning in clinical medicine. In Kahneman, Slovic & Tversky (Eds.), *Judgment under Uncertainty*.
- Freeman, S., et al. (2014). Active learning increases student performance in science, engineering, and mathematics. *PNAS*, 111(23).
- Gigerenzer, G., & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: Frequency formats. *Psychological Review*, 102(4).
- Haller, H., & Krauss, S. (2002). Misinterpretations of significance. *Methods of Psychological Research Online*, 7(1).
- Harel, G., & Sowder, L. (1998). Students' proof schemes. *Research in Collegiate Mathematics Education III*.
- Hoekstra, R., Morey, R. D., Rouder, J. N., & Wagenmakers, E.-J. (2014). Robust misinterpretation of confidence intervals. *Psychonomic Bulletin & Review*, 21(5).
- Margulieux, L. E., Guzdial, M., & Catrambone, R. (2012). Subgoal-labeled instructional material improves performance and transfer. *ICER 2012*.
- Orton, A. (1983). Students' understanding of integration ; of differentiation. *Educational Studies in Mathematics*, 14(1) et 14(3).
- Poulsen, S., Viswanathan, M., Herman, G. L., & West, M. (2022). Proof Blocks: Autogradable scaffolding activities for learning to write proofs. *ITiCSE 2022*.
- Selden, J., & Selden, A. (1995). Unpacking the logic of mathematical statements. *Educational Studies in Mathematics*, 29(2).
- Tall, D., & Vinner, S. (1981). Concept image and concept definition. *Educational Studies in Mathematics*, 12(2).
- Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty. *Science*, 185 ; (1983). The conjunction fallacy. *Psychological Review*, 90(4).
- VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. *Educational Psychologist*, 46(4).
- Williams, S. R. (1991). Models of limit held by college calculus students. *Journal for Research in Mathematics Education*, 22(3).

**Livres et cours utilisés comme sources**
- Douchet, J. *Analyse : recueil d'exercices et aide-mémoire*, vol. 1 et 2. PPUR.
- Dacorogna, B., & Tanteri, C. *Analyse avancée pour ingénieurs*. PPUR.
- Lay, D. C. *Linear Algebra and Its Applications* (algèbre linéaire MT 2021-22).
- Rappaz, J., & Picasso, M. *Introduction à l'analyse numérique*. PPUR.
- Agresti, A., & Kateri, M. *Foundations of Statistics for Data Scientists* (EE-209).
- Cours EPFL : MAN (mathématiques 1A–2B, 2017-18) ; CMS (analyse I et II, algèbre linéaire, géométrie analytique, 2018-19) ; MATH-101 Analyse I (GM et MT) ; MATH-111 Algèbre linéaire ; MATH-106 Analyse II ; MATH-202/203 Analyse III ; MATH-207 Analyse IV ; MATH-234 Probabilités et statistique ; EE-209 Statistique pour data science ; MATH-251 Analyse numérique ; ME-326 Automatique ; ME-221 Systèmes dynamiques.
- Coursebook EPFL : [Analyse III (SV, MT)](https://edu.epfl.ch/coursebook/en/analysis-iii-for-sv-mt-MATH-203-A), [Analyse IV (EL, GM, MX)](https://edu.epfl.ch/coursebook/en/analysis-iv-for-el-gm-mx-MATH-207-C), [Analyse IV (SV, MT)](https://edu.epfl.ch/coursebook/fr/analyse-iv-pour-sv-mt-MATH-207-A), [Analyse numérique (c)](https://edu.epfl.ch/coursebook/fr/analyse-numerique-MATH-251-C). Les codes et les contenus changent d'une année à l'autre.
