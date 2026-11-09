# Index des catalogues universitaires

Cet index est tiré des huit catalogues de ce dossier après la passe de réconciliation (README §16.5). Il ne remplace pas les catalogues : en cas de différence, le catalogue fait foi. Toutes les compétences sont obligatoires sauf `c-conformal` (README §1, §8.2).

## 1. Effectifs par module

| Module | Unité | Titre | Fichier | Compétences | Pièges définis | Exemples d'examen |
|---|---|---|---|---|---|---|
| G9 | `logique` | Logique et langage | [G-gymnase-1.md](G-gymnase-1.md) | 10 | 14 | 5 |
| G0 | `polynomes` | Polynômes | [G-gymnase-1.md](G-gymnase-1.md) | 12 | 13 | 5 |
| G1 | `fonctions` | Fonctions et inéquations | [G-gymnase-1.md](G-gymnase-1.md) | 16 | 25 | 6 |
| G2 | `explog` | Exponentielles, logarithmes, hyperboliques | [G-gymnase-1.md](G-gymnase-1.md) | 10 | 13 | 6 |
| G3 | `trigo` | Trigonométrie | [G-gymnase-1.md](G-gymnase-1.md) | 12 | 18 | 6 |
| G5 | `recurrence` | Suites, sommes, récurrence | [G-gymnase-1.md](G-gymnase-1.md) | 7 | 9 | 4 |
| G4 | `geoan` | Géométrie analytique | [G-gymnase-2.md](G-gymnase-2.md) | 14 | 20 | 1 |
| G10 | `coniques` | Cercles et coniques | [G-gymnase-2.md](G-gymnase-2.md) | 15 | 21 | 2 |
| G6 | `analyse0` | Analyse de base | [G-gymnase-2.md](G-gymnase-2.md) | 16 | 25 | 2 |
| G7 | `combi` | Combinatoire et probabilités | [G-gymnase-2.md](G-gymnase-2.md) | 7 | 11 | 0 |
| G8 | `complexes` | Nombres complexes | [G-gymnase-2.md](G-gymnase-2.md) | 11 | 14 | 1 |
| A1 | `analyse1` | Analyse I | [A1-analyse-1.md](A1-analyse-1.md) | 65 | 108 | 6 |
| L | `alglin` | Algèbre linéaire | [L-M-algebre-lineaire.md](L-M-algebre-lineaire.md) | 54 | 90 | 6 |
| A2 | `analyse2` | Analyse II | [A2-analyse-2.md](A2-analyse-2.md) | 52 | 90 | 6 |
| V | `vecto` | Analyse vectorielle | [VCF-analyse-3-4.md](VCF-analyse-3-4.md) | 22 | 39 | 2 |
| C | `cplx` | Analyse complexe | [VCF-analyse-3-4.md](VCF-analyse-3-4.md) | 21 | 29 | 2 |
| P | `proba` | Probabilités et statistique | [P-probabilites.md](P-probabilites.md) | 55 | 151 | 6 |
| F | `fourier` | Fourier, Laplace, EDP | [VCF-analyse-3-4.md](VCF-analyse-3-4.md) | 27 | 49 | 4 |
| N | `numerique` | Analyse numérique | [N-analyse-numerique.md](N-analyse-numerique.md) | 45 | 91 | 6 |
| M | `matrices` | Analyse matricielle | [L-M-algebre-lineaire.md](L-M-algebre-lineaire.md) | 16 | 29 | 3 |
| **Total** | | | | **487** | **859** | **79** |

Liens de prérequis : 844 entre compétences universitaires, 62 vers le plan d'algèbre (`@alg:`), 5 vers des compétences de l'école déjà construites. Compétences optionnelles : `c-conformal`.

## 2. Compétences

Ordre : celui des catalogues. « Prérequis » liste les prérequis directs, y compris `@alg:` et les compétences de l'école.

| id | Module | Unité | Année | Titre | Prérequis | Étiquettes | Optionnelle | Poids d'examen |
|---|---|---|---|---|---|---|---|---|
| `g9-sets` | G9 | `logique` | 12 | Ensembles : écrire et opérer | `@alg:N-ensembles` | CMS | non | 1 |
| `g9-intervals` | G9 | `logique` | 12 | Intervalles et parties de ℝ | `g9-sets` | CMS, MAN | non | 2 |
| `g9-connectives` | G9 | `logique` | 12 | Connecteurs et tables de vérité | — | CMS | non | 1 |
| `g9-implication` | G9 | `logique` | 12 | Implication, réciproque, contraposée | `g9-connectives` | MAN, CMS | non | 2 |
| `g9-quant-read` | G9 | `logique` | 12 | Lire un énoncé quantifié | `g9-sets` | CMS | non | 2 |
| `g9-quant-write` | G9 | `logique` | 12 | Écrire une définition avec des quantificateurs | `g9-quant-read` | CMS | non | 1 |
| `g9-negate` | G9 | `logique` | 12 | Nier un énoncé quantifié | `g9-quant-read`, `g9-implication` | MAN, CMS | non | 3 |
| `g9-counterexample` | G9 | `logique` | 12 | Réfuter par un contre-exemple | `g9-negate` | CMS | non | 2 |
| `g9-proof-contra` | G9 | `logique` | 12 | Preuve directe et par contraposée | `g9-implication` | MAN, CMS | non | 2 |
| `g9-proof-absurd` | G9 | `logique` | 12 | Preuve par l'absurde | `g9-negate` | CMS | non | 1 |
| `g0-identify` | G0 | `polynomes` | 12 | Identifier des coefficients | `@alg:C-developper`, `@alg:E-systemes` | CMS | non | 1 |
| `g0-horner` | G0 | `polynomes` | 12 | Schéma de Horner : valeur et division par x − a | `@alg:C-developper` | MAN, CMS | non | 2 |
| `g0-long-div` | G0 | `polynomes` | 12 | Division euclidienne | `@alg:C-developper` | MAN, CMS | non | 2 |
| `g0-factor-thm` | G0 | `polynomes` | 12 | Théorème du reste, racine évidente | `g0-horner` | MAN, CMS | non | 2 |
| `g0-multiplicity` | G0 | `polynomes` | 12 | Multiplicité d'une racine | `g0-factor-thm` | CMS | non | 1 |
| `g0-factor-real` | G0 | `polynomes` | 12 | Factoriser sur ℝ | `@alg:H-discriminant`, `@alg:D-factoriser-completement`, `g0-factor-thm` | MAN, CMS | non | 2 |
| `g0-factor-complex` | G0 | `polynomes` | 12.5 | Factoriser sur ℂ, racines conjuguées | `g0-factor-real`, `g8-algebraic`, `g0-long-div` | MAN, CMS | non | 2 |
| `g0-conditions` | G0 | `polynomes` | 12.5 | Polynôme défini par des conditions | `g0-factor-complex`, `g0-factor-thm`, `g0-identify` | MAN | non | 2 |
| `g0-div-param` | G0 | `polynomes` | 12.5 | Divisibilité avec un paramètre | `g0-factor-thm`, `g0-long-div`, `g0-factor-real` | MAN | non | 2 |
| `g0-gcd` | G0 | `polynomes` | 12.5 | PGCD de polynômes, racines communes | `g0-long-div`, `g0-factor-real` | CMS | non | 1 |
| `g0-pfd-simple` | G0 | `polynomes` | 12.5 | Éléments simples : facteurs du 1er degré distincts | `g0-identify`, `g0-factor-real`, `@alg:G-additionner` | CMS | non | 2 |
| `g0-pfd-general` | G0 | `polynomes` | 12.5 | Éléments simples : facteurs répétés, trinômes irréductibles, partie entière | `g0-pfd-simple`, `g0-long-div` | CMS | non | 2 |
| `g1-domain` | G1 | `fonctions` | 12 | Domaine de définition | `g9-intervals`, `@alg:G-valeurs-interdites` | MAN, CMS | non | 2 |
| `g1-compose` | G1 | `fonctions` | 12 | Composition de fonctions | `g1-domain` | CMS | non | 1 |
| `g1-inverse` | G1 | `fonctions` | 12 | Fonction réciproque : l'expliciter | `g1-compose`, `@alg:F-isoler` | MAN, CMS | non | 2 |
| `g1-injective` | G1 | `fonctions` | 12 | Injectivité : prouver ou réfuter | `g9-counterexample`, `g9-proof-contra` | MAN | non | 2 |
| `g1-surjective` | G1 | `fonctions` | 12.5 | Surjectivité, bijection, ensemble d'arrivée | `g1-injective`, `g1-inverse`, `g1-irr-ineq` | MAN | non | 3 |
| `g1-parity-period` | G1 | `fonctions` | 12 | Parité et périodicité | `g1-domain`, `g9-counterexample`, `g3-reduce` | CMS | non | 1 |
| `g1-trinome-sign` | G1 | `fonctions` | 12 | Signe du trinôme, inéquation du 2e degré | `g9-intervals`, `@alg:H-discriminant` | MAN, CMS | non | 2 |
| `g1-sign-table` | G1 | `fonctions` | 12 | Tableau de signes | `g1-trinome-sign`, `@alg:D-factoriser-completement` | CMS | non | 2 |
| `g1-rational-ineq` | G1 | `fonctions` | 12 | Inéquations rationnelles | `g1-sign-table`, `@alg:G-additionner` | CMS | non | 2 |
| `g1-param` | G1 | `fonctions` | 12.5 | Équations et inéquations à paramètre | `g1-rational-ineq`, `@alg:I-param-1er-degre` | CMS | non | 2 |
| `g1-viete` | G1 | `fonctions` | 12.5 | Trinôme à paramètre : position des racines | `g1-trinome-sign`, `g1-param`, `@alg:I-param-2e-degre` | CMS | non | 2 |
| `g1-abs-eq` | G1 | `fonctions` | 12 | Valeur absolue : équations | `g9-intervals`, `@alg:H-discriminant` | MAN, CMS | non | 2 |
| `g1-abs-ineq` | G1 | `fonctions` | 12 | Valeur absolue : inéquations, y compris avec un 2e degré | `g1-abs-eq`, `g1-trinome-sign` | MAN | non | 3 |
| `g1-irr-eq` | G1 | `fonctions` | 12 | Équations irrationnelles | `g1-domain`, `@alg:H-discriminant` | CMS | non | 2 |
| `g1-irr-ineq` | G1 | `fonctions` | 12.5 | Inéquations irrationnelles | `g1-irr-eq`, `g1-abs-ineq` | MAN, CMS | non | 3 |
| `g1-bound` | G1 | `fonctions` | 12.5 | Majorer ou minorer une expression | `g1-abs-ineq` | — | non | 1 |
| `g2-real-powers` | G2 | `explog` | 12 | Puissances à exposant réel | `pow-rules`, `root-rules` | CMS | non | 1 |
| `g2-log-rules` | G2 | `explog` | 12 | Logarithmes : définition et règles | `g2-real-powers` | MAN, CMS | non | 2 |
| `g2-exp-eq` | G2 | `explog` | 12 | Équations exponentielles | `g2-log-rules`, `@alg:H-discriminant` | CMS | non | 2 |
| `g2-log-eq` | G2 | `explog` | 12 | Équations logarithmiques | `g2-log-rules`, `g1-domain` | MAN, CMS | non | 2 |
| `g2-ineq` | G2 | `explog` | 12.5 | Inéquations exponentielles et logarithmiques, base < 1 | `g2-log-eq`, `g2-exp-eq`, `g1-trinome-sign` | MAN, CMS | non | 3 |
| `g2-xx` | G2 | `explog` | 12.5 | Équations du type xˣ | `g2-log-eq` | CMS | non | 1 |
| `g2-hyp-def` | G2 | `explog` | 12.5 | sinh, cosh, tanh : définitions et graphes | `g2-log-rules`, `g1-parity-period` | MAN, CMS | non | 1 |
| `g2-hyp-formulas` | G2 | `explog` | 12.5 | Formules hyperboliques | `g2-hyp-def` | MAN, CMS | non | 1 |
| `g2-hyp-eq` | G2 | `explog` | 12.5 | Équations hyperboliques | `g2-hyp-def`, `g2-exp-eq` | MAN, CMS | non | 2 |
| `g2-arg` | G2 | `explog` | 12.5 | argsh, argch, argth | `g2-hyp-eq`, `g1-inverse` | MAN, CMS | non | 1 |
| `g3-radians` | G3 | `trigo` | 12 | Radians et degrés | `prop-rule3` | CMS | non | 1 |
| `g3-reduce` | G3 | `trigo` | 12 | Cercle trigonométrique, réduction d'angles | `g3-radians` | MAN, CMS | non | 2 |
| `g3-identities` | G3 | `trigo` | 12 | Formules d'addition, d'angle double, de bissection, somme-produit | `@alg:C-developper` | MAN, CMS | non | 2 |
| `g3-exact` | G3 | `trigo` | 12 | Valeurs exactes sans calculatrice | `g3-identities`, `root-rules` | MAN, CMS | non | 2 |
| `g3-basic-eq` | G3 | `trigo` | 12 | Équations de base : cos x = a, sin x = a, tan x = a | `g3-reduce`, `g9-intervals` | MAN, CMS | non | 2 |
| `g3-eq` | G3 | `trigo` | 12.5 | Équations trigonométriques | `g3-basic-eq`, `g3-identities`, `@alg:E-produit-nul` | MAN, CMS | non | 3 |
| `g3-asinbcos` | G3 | `trigo` | 12.5 | a sin x + b cos x : équations | `g3-basic-eq`, `g3-identities` | MAN, CMS | non | 3 |
| `g3-bioche` | G3 | `trigo` | 12.5 | Substitution t = tan(x/2) | `g3-basic-eq` | MAN, CMS | non | 1 |
| `g3-ineq` | G3 | `trigo` | 12.5 | Inéquations trigonométriques | `g3-asinbcos` | MAN | non | 3 |
| `g3-triangle` | G3 | `trigo` | 12 | Résoudre un triangle | `g3-exact` | MAN, CMS | non | 2 |
| `g3-arc-def` | G3 | `trigo` | 12 | Fonctions arc : définition et arccos(cos θ) | `g3-reduce`, `g1-inverse` | MAN, CMS | non | 2 |
| `g3-arc-comp` | G3 | `trigo` | 12.5 | Compositions : cos(2 arccos a), tan(arcsin a) | `g3-arc-def`, `g3-identities` | MAN, CMS | non | 2 |
| `g5-sigma` | G5 | `recurrence` | 12 | Notation Σ | `@alg:C-reduire` | CMS | non | 1 |
| `g5-reindex` | G5 | `recurrence` | 12 | Changement d'indice, sommes télescopiques | `g5-sigma`, `g0-pfd-simple` | — | non | 1 |
| `g5-arith` | G5 | `recurrence` | 12 | Suites arithmétiques | `g5-sigma` | — | non | 1 |
| `g5-geom` | G5 | `recurrence` | 12 | Suites géométriques | `pow-rules` | MAN | non | 2 |
| `g5-induction-frame` | G5 | `recurrence` | 12 | Charpente d'une récurrence | `g9-proof-contra` | — | non | 2 |
| `g5-induction-sum` | G5 | `recurrence` | 12 | Récurrence : formules de sommes | `g5-induction-frame`, `g5-sigma` | CMS | non | 2 |
| `g5-induction-more` | G5 | `recurrence` | 12.5 | Récurrence : inégalités, divisibilité, suites et itérées | `g1-compose`, `g5-induction-frame`, `g2-real-powers` | MAN | non | 2 |
| `g4-vectors` | G4 | `geoan` | 12 | Vecteurs : Chasles, combinaisons, colinéarité | `@alg:E-systemes-2x2` | — | non | 1 |
| `g4-line2` | G4 | `geoan` | 12 | Droite du plan : paramétrique, cartésienne, intersection | `g4-vectors`, `@alg:L-affine`, `@alg:E-systemes-2x2` | — | non | 1 |
| `g4-dot` | G4 | `geoan` | 12 | Produit scalaire, angles, projection d'un vecteur | `g4-vectors`, `@alg:M-pythagore`, `g3-arc-def` | — | non | 1 |
| `g4-bisectors` | G4 | `geoan` | 12 | Médiatrice et bissectrices | `g4-line2`, `g4-dot`, `g1-abs-eq` | — | non | 1 |
| `g4-line3` | G4 | `geoan` | 12 | Droite de l'espace : paramétrique et cartésienne | `g4-line2` | — | non | 1 |
| `g4-plane` | G4 | `geoan` | 12 | Plan : par trois points, paramétrique ↔ cartésienne | `g4-vectors` | — | non | 1 |
| `g4-relative-pos` | G4 | `geoan` | 12 | Positions relatives dans l'espace | `g4-plane`, `g4-line3` | — | non | 2 |
| `g4-cross` | G4 | `geoan` | 12.5 | Produit vectoriel, aires | `g4-dot` | — | non | 1 |
| `g4-triple` | G4 | `geoan` | 12.5 | Produit mixte, volumes, coplanarité | `g4-cross` | — | non | 1 |
| `g4-dist-point` | G4 | `geoan` | 12 | Distance d'un point à un plan ou à une droite, pied de la perpendiculaire | `g4-plane`, `g4-dot` | — | non | 2 |
| `g4-dist-skew` | G4 | `geoan` | 12.5 | Distance entre deux droites gauches | `g4-triple`, `g4-relative-pos` | — | non | 1 |
| `g4-common-perp` | G4 | `geoan` | 12.5 | Perpendiculaire commune à deux droites gauches | `g4-dist-skew` | — | non | 1 |
| `g4-line-two-skew` | G4 | `geoan` | 12.5 | Droite qui s'appuie sur deux droites gauches | `g4-relative-pos`, `g4-cross` | — | non | 1 |
| `g4-sphere` | G4 | `geoan` | 12.5 | Sphères : centre, rayon, plan tangent, section | `g4-dist-point`, `@alg:H-completer-carre` | — | non | 1 |
| `g10-circle-eq` | G10 | `coniques` | 12.5 | Cercle : centre, rayon, cercle par trois points | `g4-bisectors`, `@alg:H-completer-carre` | — | non | 1 |
| `g10-circle-tangent` | G10 | `coniques` | 12.5 | Tangentes à un cercle | `g10-circle-eq`, `@alg:H-discriminant` | — | non | 1 |
| `g10-power-radical` | G10 | `coniques` | 12.5 | Puissance d'un point, axe radical, cercles orthogonaux | `g10-circle-eq` | — | non | 1 |
| `g10-pole-polar` | G10 | `coniques` | 12.5 | Pôle et polaire par rapport à un cercle | `g10-circle-tangent` | — | non | 1 |
| `g10-ellipse` | G10 | `coniques` | 12.5 | Ellipse : axes, foyers, excentricité, directrices | `@alg:H-completer-carre` | — | non | 1 |
| `g10-hyperbola` | G10 | `coniques` | 12.5 | Hyperbole : foyers, asymptotes, directrices | `@alg:H-completer-carre` | — | non | 1 |
| `g10-parabola` | G10 | `coniques` | 12.5 | Parabole : sommet, foyer, directrice | `@alg:H-completer-carre` | — | non | 1 |
| `g10-conic-from-data` | G10 | `coniques` | 12.5 | Trouver l'équation d'une conique à partir de ses éléments | `g10-hyperbola`, `g10-parabola`, `g1-irr-eq`, `g10-ellipse` | — | non | 1 |
| `g10-conic-tangent` | G10 | `coniques` | 12.5 | Tangentes à une conique | `g10-pole-polar`, `g10-ellipse`, `g10-hyperbola`, `g10-parabola` | — | non | 1 |
| `g10-conic-nature` | G10 | `coniques` | 12.5 | Choisir la méthode : nature d'une conique | `g10-hyperbola`, `g10-parabola`, `g4-triple` | — | non | 2 |
| `g10-conic-reduce` | G10 | `coniques` | 12.5 | Réduire une conique avec un terme en xy | `g10-conic-nature`, `l-eig-charpoly`, `l-eig-space`, `@alg:E-systemes-2x2` | — | non | 2 |
| `g10-conic-frame-back` | G10 | `coniques` | 12.5 | Revenir au repère initial ; esquisser | `g10-conic-reduce`, `g10-ellipse` | — | non | 1 |
| `g10-conic-family` | G10 | `coniques` | 12.5 | Familles de coniques à paramètre, lieu des centres | `g10-conic-nature`, `@alg:I-second-degre-parametres` | — | non | 1 |
| `g10-locus` | G10 | `coniques` | 12.5 | Lieux géométriques qui donnent une conique | `g1-irr-eq`, `g10-ellipse` | — | non | 1 |
| `g10-homogeneous` | G10 | `coniques` | 12.5 | Coordonnées homogènes, points à l'infini | `g10-conic-nature` | opt | non | 0 |
| `g6-deriv-usual` | G6 | `analyse0` | 12 | Dérivées usuelles | `g2-real-powers`, `g3-radians` | — | non | 1 |
| `g6-deriv-rules` | G6 | `analyse0` | 12 | Règles de dérivation : produit, quotient, chaîne (pilote U0) | `g6-deriv-usual`, `g1-compose` | — | non | 2 |
| `g6-tangent` | G6 | `analyse0` | 12 | Tangente et approximation linéaire | `g6-deriv-rules`, `g4-line2` | — | non | 1 |
| `g6-limits` | G6 | `analyse0` | 12.5 | Limites de fonctions pour l'étude de fonction | `@alg:G-simplifier`, `g1-domain` | — | non | 1 |
| `g6-sign-variation` | G6 | `analyse0` | 12 | Signe de f′, tableau de variation, extrema locaux | `g6-deriv-rules`, `g1-sign-table` | — | non | 1 |
| `g6-convexity` | G6 | `analyse0` | 12 | Concavité et points d'inflexion | `g6-sign-variation`, `g6-tangent` | — | non | 1 |
| `g6-optim` | G6 | `analyse0` | 12 | Optimisation | `g6-sign-variation`, `g1-domain` | — | non | 1 |
| `g6-antideriv-usual` | G6 | `analyse0` | 12 | Primitives usuelles | `g6-deriv-usual` | — | non | 1 |
| `g6-area` | G6 | `analyse0` | 12 | Aire entre des courbes | `g6-antideriv-usual`, `@alg:H-discriminant` | — | non | 1 |
| `g6-deriv-implicit` | G6 | `analyse0` | 12.5 | Dérivée implicite, tangente à une courbe implicite | `g6-tangent`, `g0-factor-thm` | — | non | 1 |
| `g6-common-tangent` | G6 | `analyse0` | 12.5 | Tangente imposée à une courbe ; tangente commune à deux courbes | `g6-deriv-implicit`, `@alg:E-systemes-2x2` | — | non | 1 |
| `g6-angular-points` | G6 | `analyse0` | 12.5 | Points anguleux et de rebroussement | `g6-sign-variation`, `g6-limits`, `g1-abs-eq` | — | non | 2 |
| `g6-asymptotes` | G6 | `analyse0` | 12.5 | Asymptotes verticales, horizontales, obliques ; branches paraboliques | `g6-limits`, `g0-long-div` | — | non | 1 |
| `g6-study-full` | G6 | `analyse0` | 12.5 | Étude de fonction complète et esquisse | `g6-convexity`, `g6-asymptotes`, `g6-angular-points`, `g1-parity-period` | — | non | 2 |
| `g6-param-tangent` | G6 | `analyse0` | 12.5 | Arcs paramétrés : vitesse, tangente, points stationnaires | `g6-tangent`, `g6-limits` | — | non | 1 |
| `g6-param-branches` | G6 | `analyse0` | 12.5 | Arcs paramétrés : branches infinies et esquisse | `g6-param-tangent`, `g6-asymptotes` | — | non | 2 |
| `g7-mult-principle` | G7 | `combi` | 12 | Principe multiplicatif | — | — | non | 1 |
| `g7-perm-arr` | G7 | `combi` | 12 | Factorielles, permutations, arrangements, anagrammes | `g7-mult-principle` | — | non | 1 |
| `g7-combinations` | G7 | `combi` | 12 | Combinaisons, triangle de Pascal | `g7-perm-arr` | — | non | 2 |
| `g7-which-count` | G7 | `combi` | 12 | Ordonné ou pas ? Avec ou sans remise ? (exercice éclair) | `g7-combinations` | — | non | 1 |
| `g7-binomial` | G7 | `combi` | 12 | Binôme de Newton | `g7-combinations`, `g5-sigma`, `@alg:C-identites` | — | non | 1 |
| `g7-laplace` | G7 | `combi` | 12 | Probabilité de Laplace | `g7-which-count` | opt | non | 0 |
| `g7-tree` | G7 | `combi` | 12 | Arbres de probabilité | `g7-laplace` | opt | non | 0 |
| `g8-algebraic` | G8 | `complexes` | 12 | Forme algébrique : opérations, conjugué, module, division | `@alg:C-identites` | — | non | 1 |
| `g8-polar` | G8 | `complexes` | 12 | Forme polaire et exponentielle | `g8-algebraic`, `g3-exact` | — | non | 1 |
| `g8-moivre` | G8 | `complexes` | 12 | Puissances par la formule de Moivre | `g8-polar` | — | non | 1 |
| `g8-nth-roots` | G8 | `complexes` | 12.5 | Racines n-ièmes | `g8-moivre` | — | non | 1 |
| `g8-sqrt-alg` | G8 | `complexes` | 12.5 | Racine carrée sous forme algébrique | `g8-algebraic`, `@alg:E-systemes-2x2` | — | non | 1 |
| `g8-quadratic` | G8 | `complexes` | 12.5 | Équation du 2e degré à coefficients complexes | `g8-sqrt-alg`, `@alg:H-discriminant` | — | non | 2 |
| `g8-poly` | G8 | `complexes` | 12.5 | Polynômes complexes, théorème fondamental, racines conjuguées | `g8-quadratic`, `g0-long-div` | — | non | 1 |
| `g8-locus` | G8 | `complexes` | 12.5 | Lieux dans le plan complexe | `g8-algebraic`, `g4-bisectors`, `g10-circle-eq` | — | non | 1 |
| `g8-ratio-angle` | G8 | `complexes` | 12.5 | Rapport de longueurs et angle par un quotient | `g8-polar` | — | non | 1 |
| `g8-transform` | G8 | `complexes` | 12.5 | Translations, rotations, homothéties, similitudes | `g8-algebraic`, `g8-polar` | — | non | 1 |
| `g8-inversion` | G8 | `complexes` | 12.5 | Inversion z ↦ 1/z̄ et z ↦ 1/z | `g8-locus` | — | non | 1 |
| `a1-sup-inf` | A1 | `analyse1` | 13 | Inf, Sup, Min, Max d'un ensemble défini par une fonction | `g9-intervals`, `g3-arc-def`, `g1-sign-table` | — | non | 2 |
| `a1-sup-proof` | A1 | `analyse1` | 13 | Prouver que s = Sup A | `a1-sup-inf`, `g9-quant-write` | GM | non | 1 |
| `a1-cplx-exam` | A1 | `analyse1` | 13 | Simplifier un nombre complexe et l'élever à une puissance | `g8-algebraic`, `g8-polar`, `g8-moivre` | — | non | 2 |
| `a1-cplx-zn-conj` | A1 | `analyse1` | 13 | Équations zⁿ = z̄, zⁿ = 1/z̄, zⁿ = \|z\|, sans oublier r = 0 | `g8-polar` | — | non | 1 |
| `a1-seq-eps-n-def` | A1 | `analyse1` | 13 | Écrire la définition ε-N de la limite d'une suite | `g9-quant-write` | — | non | 1 |
| `a1-seq-eps-n` | A1 | `analyse1` | 13 | Trouver N(ε) pour une limite de suite | `a1-seq-eps-n-def`, `g1-bound` | — | non | 1 |
| `a1-seq-limits` | A1 | `analyse1` | 13 | Limites de suites : opérations et formes indéterminées | `@alg:G-simplifier`, `g2-log-rules` | — | non | 3 |
| `a1-seq-squeeze` | A1 | `analyse1` | 13 | Gendarmes : trouver les deux bornes | `a1-seq-limits`, `g1-bound` | — | non | 1 |
| `a1-seq-1inf` | A1 | `analyse1` | 13 | Formes 1^∞ : écrire e^(n·Log(…)) | `a1-seq-limits`, `g2-real-powers` | — | non | 2 |
| `a1-seq-ratio` | A1 | `analyse1` | 13 | Critère de d'Alembert pour les suites | `a1-seq-limits` | — | non | 1 |
| `a1-seq-monotone` | A1 | `analyse1` | 13 | Suites monotones et bornées ; suites de Cauchy | `a1-seq-limits`, `g5-induction-more`, `a1-ser-geo-tele` | — | non | 2 |
| `a1-seq-limsup` | A1 | `analyse1` | 13 | lim sup, lim inf et sous-suites | `a1-seq-limits` | — | non | 1 |
| `a1-seq-affine` | A1 | `analyse1` | 13 | Suites aₙ₊₁ = q·aₙ + c : formule explicite | `g5-geom` | — | non | 1 |
| `a1-seq-rec-fixed` | A1 | `analyse1` | 13 | Suite aₙ₊₁ = f(aₙ) : points fixes, signe de f(x) − x, intervalle stable | `a1-seq-monotone`, `g1-sign-table` | — | non | 2 |
| `a1-seq-rec-study` | A1 | `analyse1` | 13 | Suite récurrente par l'étude complète de f (problème long) | `a1-seq-rec-fixed`, `a1-fn-study` | — | non | 1 |
| `a1-ser-geo-tele` | A1 | `analyse1` | 13 | Séries géométriques et télescopiques : calculer la somme | `g5-reindex`, `g5-geom`, `g0-pfd-simple` | — | non | 1 |
| `a1-ser-necessary` | A1 | `analyse1` | 13 | Condition nécessaire : uₙ → 0 | `a1-seq-limits` | — | non | 1 |
| `a1-ser-compare` | A1 | `analyse1` | 13 | Critère de comparaison et de la limite du quotient | `a1-seq-limits` | — | non | 2 |
| `a1-ser-ratio-root` | A1 | `analyse1` | 13 | Critères de d'Alembert et de Cauchy pour les séries | `a1-seq-ratio`, `a1-seq-1inf`, `a1-ser-necessary` | — | non | 2 |
| `a1-ser-leibniz-abs` | A1 | `analyse1` | 13 | Leibniz, convergence absolue et semi-convergence | `a1-ser-compare` | — | non | 2 |
| `a1-ser-param` | A1 | `analyse1` | 13 | Séries à paramètre : ensemble de convergence | `a1-ser-ratio-root`, `a1-ser-leibniz-abs`, `g1-sign-table` | — | non | 2 |
| `a1-fn-limits` | A1 | `analyse1` | 13 | Limites de fonctions : formes indéterminées, croissances comparées, équivalents | `a1-seq-limits`, `g3-identities` | — | non | 3 |
| `a1-fn-onesided` | A1 | `analyse1` | 13 | Limites à gauche et à droite ; limite qui n'existe pas | `a1-fn-limits` | — | non | 1 |
| `a1-fn-extension` | A1 | `analyse1` | 13 | Prolongement par continuité, continuité d'une fonction par morceaux | `a1-fn-onesided`, `@alg:G-simplifier` | — | non | 2 |
| `a1-fn-epsdelta-def` | A1 | `analyse1` | 13 | Écrire la définition ε-δ d'une limite et de la continuité | `g9-quant-write` | — | non | 1 |
| `a1-fn-epsdelta` | A1 | `analyse1` | 13 | Trouver δ(ε) : prouver une limite par la définition | `a1-fn-epsdelta-def`, `g1-bound` | — | non | 1 |
| `a1-fn-ivt` | A1 | `analyse1` | 13 | Théorème de la valeur intermédiaire : existence d'une solution | `a1-fn-extension`, `a1-deriv-rules` | — | non | 2 |
| `a1-fn-image` | A1 | `analyse1` | 13 | Image d'un intervalle par une fonction continue | `a1-fn-ivt`, `g6-deriv-rules` | — | non | 1 |
| `a1-bisection-fixpoint` | A1 | `analyse1` | 13 | Bissection et méthode du point fixe (cours MT) | `a1-fn-ivt`, `a1-mvt` | MT | non | 1 |
| `a1-deriv-def` | A1 | `analyse1` | 13 | Dérivée par la définition ; dérivées à gauche et à droite | `a1-fn-onesided`, `a1-seq-squeeze` | — | non | 2 |
| `a1-deriv-rules` | A1 | `analyse1` | 13 | Dériver au niveau BA1 : produits, quotients, compositions, fonctions arc et hyperboliques | `g6-deriv-rules`, `g2-hyp-def`, `g3-arc-def` | — | non | 1 |
| `a1-deriv-inverse` | A1 | `analyse1` | 13 | Dérivée d'une fonction réciproque en un point | `a1-deriv-rules`, `g1-inverse` | — | non | 1 |
| `a1-deriv-log` | A1 | `analyse1` | 13 | Dérivée logarithmique : u(x)^(v(x)) | `a1-deriv-rules`, `g2-real-powers` | — | non | 1 |
| `a1-c1-def` | A1 | `analyse1` | 13 | Définir C¹(I) | `a1-deriv-def`, `a1-fn-extension` | GM | non | 1 |
| `a1-piecewise-ab` | A1 | `analyse1` | 13 | Fonction par morceaux : choisir a et b pour qu'elle soit dérivable | `a1-deriv-def`, `a1-fn-extension`, `@alg:E-systemes` | — | non | 2 |
| `a1-c1-proof` | A1 | `analyse1` | 13 | Montrer qu'une fonction définie par morceaux est C¹ | `a1-c1-def`, `a1-deriv-def`, `a1-deriv-rules`, `a1-seq-squeeze` | GM | non | 2 |
| `a1-mvt` | A1 | `analyse1` | 13 | Rolle et accroissements finis : encadrer un taux d'accroissement | `a1-deriv-rules`, `a1-fn-image` | — | non | 2 |
| `a1-bh` | A1 | `analyse1` | 13 | Règle de Bernoulli-l'Hôpital, avec ses conditions | `a1-fn-limits`, `a1-deriv-rules` | — | non | 1 |
| `a1-extrema-global` | A1 | `analyse1` | 13 | Extrema globaux sur [a ; b] : bornes, f′ = 0, f′ qui n'existe pas | `a1-fn-image`, `a1-deriv-rules`, `g6-sign-variation` | — | non | 2 |
| `a1-fn-study` | A1 | `analyse1` | 13 | Étude de fonction : convexité, asymptotes, graphe | `a1-extrema-global`, `a1-fn-limits`, `g6-study-full` | — | non | 1 |
| `a1-param-curve` | A1 | `analyse1` | 13 | Courbes paramétrées : tangentes, points doubles, asymptotes | `a1-deriv-rules`, `a1-fn-limits` | — | non | 1 |
| `a1-polar-curve` | A1 | `analyse1` | 13 | Courbe polaire ρ = f(φ) : limites, pente, tangentes (problème long) | `a1-param-curve`, `g3-identities` | — | non | 1 |
| `a1-dl-usual` | A1 | `analyse1` | 13 | DL usuels en 0, notation xⁿ·ε(x) | `a1-deriv-rules` | — | non | 1 |
| `a1-dl-ops` | A1 | `analyse1` | 13 | Somme, produit et quotient de DL | `a1-dl-usual`, `@alg:C-developper` | — | non | 2 |
| `a1-dl-compose` | A1 | `analyse1` | 13 | Composition de DL, y compris une constante intérieure non nulle | `a1-dl-ops` | — | non | 2 |
| `a1-dl-limits` | A1 | `analyse1` | 13 | Calculer une limite par DL | `a1-dl-ops`, `a1-bh` | — | non | 2 |
| `a1-dl-read` | A1 | `analyse1` | 13 | Lire f⁽ⁿ⁾(a) ou la nature d'un point critique sur un DL | `a1-dl-ops`, `a1-extrema-global` | — | non | 2 |
| `a1-taylor-rest` | A1 | `analyse1` | 13 | Reste de Taylor : majorer l'erreur | `a1-dl-usual`, `a1-mvt` | opt | non | 1 |
| `a1-pow-domain` | A1 | `analyse1` | 13 | Rayon de convergence et domaine, bornes comprises | `a1-ser-ratio-root`, `a1-ser-leibniz-abs` | — | non | 2 |
| `a1-pow-sums` | A1 | `analyse1` | 13 | Dériver une série entière ; sommes par MacLaurin | `a1-pow-domain`, `a1-dl-usual`, `g5-reindex` | — | non | 1 |
| `a1-int-direct` | A1 | `analyse1` | 13 | Primitives immédiates : u′/u, u′·uʳ, u′/(1 + u²), u′·eᵘ | `g6-antideriv-usual`, `a1-deriv-rules` | — | non | 2 |
| `a1-int-subst` | A1 | `analyse1` | 13 | Changement de variable : choisir φ, changer dx et les bornes | `a1-int-direct` | — | non | 2 |
| `a1-int-parts` | A1 | `analyse1` | 13 | Intégration par parties | `a1-int-direct` | — | non | 2 |
| `a1-int-reduction` | A1 | `analyse1` | 13 | Formules de récurrence Iₙ | `a1-int-parts`, `g5-induction-frame` | — | non | 1 |
| `a1-int-rational` | A1 | `analyse1` | 13 | Fractions rationnelles : DES, y compris avec un facteur irréductible | `g0-pfd-general`, `a1-int-direct`, `g0-long-div` | — | non | 2 |
| `a1-int-trig` | A1 | `analyse1` | 13 | Fractions rationnelles en sin et cos : Bioche et t = tan(x/2) | `a1-int-rational`, `a1-int-subst`, `g3-bioche` | — | non | 1 |
| `a1-int-hyper` | A1 | `analyse1` | 13 | sinh et cosh dans les intégrales | `a1-int-subst`, `g2-hyp-formulas` | — | non | 1 |
| `a1-int-estimate` | A1 | `analyse1` | 13 | Encadrer une intégrale ; parité et moyenne | `a1-int-direct`, `a1-fn-image` | — | non | 1 |
| `a1-ftc` | A1 | `analyse1` | 13 | Théorème fondamental ; dériver ∫ₐ^(g(x)) f(t) dt | `a1-deriv-rules` | — | non | 1 |
| `a1-improper-calc` | A1 | `analyse1` | 13 | Intégrale généralisée : calculer par une limite (bornes 0⁺, 1⁻, +∞) | `a1-int-subst`, `a1-int-parts`, `a1-fn-limits` | — | non | 2 |
| `a1-improper-compare` | A1 | `analyse1` | 13 | Convergence d'une intégrale généralisée par comparaison, sans la calculer | `a1-improper-calc`, `a1-ser-compare` | — | non | 2 |
| `a1-improper-rational` | A1 | `analyse1` | 13 | Intégrale généralisée d'une fraction rationnelle (problème long) | `a1-int-rational`, `a1-improper-compare`, `g0-horner` | — | non | 1 |
| `a1-int-applications` | A1 | `analyse1` | 13 | Applications : volumes, longueurs d'arc, aires de révolution | `a1-int-subst`, `a1-int-hyper` | — | non | 1 |
| `a1-defs` | A1 | `analyse1` | 13 | Définitions à écrire : Sup, continuité, dérivabilité, série convergente, suite de Cauchy | `a1-seq-eps-n-def`, `a1-fn-epsdelta-def`, `a1-c1-def` | GM | non | 1 |
| `a1-proofs` | A1 | `analyse1` | 13 | Preuves courtes d'examen : énoncer le théorème, vérifier ses hypothèses | `a1-ser-compare`, `a1-mvt`, `a1-fn-ivt`, `a1-seq-monotone`, `g9-proof-contra` | GM | non | 2 |
| `l-sys-augmented` | L | `alglin` | 13 | Matrice augmentée et opérations élémentaires | `@alg:E-systemes-2x2` | — | non | 0 |
| `l-sys-echelon` | L | `alglin` | 13 | Forme échelonnée, pivots | `l-sys-augmented` | — | non | 1 |
| `l-sys-rref` | L | `alglin` | 13 | Forme échelonnée réduite | `l-sys-echelon` | — | non | 1 |
| `l-sys-solution` | L | `alglin` | 13 | Variables libres, solution paramétrique | `l-sys-rref` | — | non | 1 |
| `l-sys-param` | L | `alglin` | 13 | Système à paramètre : aucune, une ou une infinité de solutions | `l-sys-echelon`, `l-sys-solution`, `@alg:I-equation-parametre`, `@alg:D-trinome` | — | non | 2 |
| `l-vec-span` | L | `alglin` | 13 | Combinaisons linéaires, Span, Ax comme combinaison des colonnes | `l-sys-echelon`, `g4-vectors` | — | non | 1 |
| `l-vec-indep` | L | `alglin` | 13 | Indépendance linéaire | `l-sys-solution`, `l-sys-param` | — | non | 2 |
| `l-sys-pivots-theory` | L | `alglin` | 13 | Existence et unicité lues sur les pivots | `l-sys-solution`, `l-vec-span`, `g9-implication` | — | non | 2 |
| `l-map-std-matrix` | L | `alglin` | 13 | Matrice canonique à partir d'images données | `l-vec-span` | — | non | 1 |
| `l-map-inj-surj` | L | `alglin` | 13 | Injective ou surjective, lu sur les pivots | `l-map-std-matrix`, `l-sys-pivots-theory` | — | non | 2 |
| `l-mat-product` | L | `alglin` | 13 | Produit, transposée, règles de calcul | — | — | non | 1 |
| `l-mat-inverse` | L | `alglin` | 13 | Inverse par [A \| I] | `l-mat-product`, `l-sys-rref` | — | non | 2 |
| `l-map-geom` | L | `alglin` | 13 | Géométrie dans ℝ² : rotation, projection, symétrie, affinité | `l-map-std-matrix`, `l-mat-inverse`, `g3-exact`, `g4-line2` | — | non | 1 |
| `l-mat-imt` | L | `alglin` | 13 | Théorème de la matrice inversible | `l-mat-inverse`, `l-map-inj-surj` | — | non | 2 |
| `l-mat-elementary` | L | `alglin` | 13 | Matrices élémentaires | `l-mat-inverse` | — | non | 1 |
| `l-mat-lu` | L | `alglin` | 13 | Factorisation LU | `l-mat-elementary`, `l-sys-echelon` | — | non | 1 |
| `l-mat-blocks` | L | `alglin` | 13 | Produit par blocs, inverse d'une matrice triangulaire par blocs | `l-mat-inverse` | `GM` | non | 0 |
| `l-det-cofactor` | L | `alglin` | 13 | Déterminant par cofacteurs | — | — | non | 1 |
| `l-det-rowops` | L | `alglin` | 13 | Déterminant par opérations sur les lignes | `l-det-cofactor`, `l-sys-echelon` | — | non | 2 |
| `l-det-props` | L | `alglin` | 13 | Propriétés : det(AB), det(kA), det(Aᵀ), det(A⁻¹) | `l-det-rowops`, `l-mat-imt` | — | non | 2 |
| `l-det-area` | L | `alglin` | 13 | Aire et volume | `l-det-cofactor` | — | non | 0 |
| `l-det-cramer` | L | `alglin` | 13 | Règle de Cramer | `l-det-cofactor` | `opt` | non | 0 |
| `l-vs-subspace` | L | `alglin` | 13 | Est-ce un sous-espace ? Dans ℝⁿ, Pₙ et M_{m×n} | `l-vec-span` | — | non | 2 |
| `l-vs-kernel` | L | `alglin` | 13 | Noyau : base de Ker A | `l-sys-solution` | — | non | 2 |
| `l-vs-col-row` | L | `alglin` | 13 | Image (Col A) et espace des lignes (Lgn A) | `l-vec-indep` | — | non | 2 |
| `l-vs-basis` | L | `alglin` | 13 | Base et dimension : extraire, compléter, reconnaître | `l-vs-col-row` | — | non | 2 |
| `l-vs-rank` | L | `alglin` | 13 | Rang et théorème du rang | `l-vs-basis` | — | non | 2 |
| `l-vs-coords` | L | `alglin` | 13 | Coordonnées dans une base | `l-vs-basis` | — | non | 1 |
| `l-vs-map-matrix` | L | `alglin` | 13 | Matrice d'une application entre Pₙ, M_{m×n} et ℝⁿ | `l-vs-coords`, `l-map-std-matrix` | — | non | 2 |
| `l-vs-change-basis` | L | `alglin` | 13 | Matrice de passage P_{C←B} | `l-vs-coords`, `l-mat-inverse` | — | non | 2 |
| `l-vs-similar` | L | `alglin` | 13 | Matrice de T dans une base B ; matrices semblables | `l-vs-change-basis`, `l-vs-map-matrix` | — | non | 1 |
| `l-eig-check` | L | `alglin` | 13 | Vérifier un vecteur propre ou une valeur propre | `l-mat-product`, `l-vs-kernel` | — | non | 1 |
| `l-eig-charpoly` | L | `alglin` | 13 | Polynôme caractéristique et valeurs propres | `l-det-cofactor`, `g0-factor-thm`, `@alg:H-discriminant` | — | non | 2 |
| `l-eig-space` | L | `alglin` | 13 | Espaces propres : base de E_λ | `l-eig-charpoly`, `l-vs-kernel` | — | non | 2 |
| `l-eig-related` | L | `alglin` | 13 | Valeurs propres de cA, Aᵏ, A⁻¹, Aᵀ, A + cI, BAB⁻¹ | `l-det-props` | — | non | 2 |
| `l-eig-diag` | L | `alglin` | 13 | Diagonaliser : A = PDP⁻¹ | `l-eig-space`, `l-mat-inverse` | — | non | 2 |
| `l-eig-diag-param` | L | `alglin` | 13 | Diagonalisable selon un paramètre ; multiplicités | `l-eig-diag`, `l-vs-rank` | — | non | 1 |
| `l-eig-powers` | L | `alglin` | 13 | Puissances Aᵏ et récurrences linéaires | `l-eig-diag`, `g5-geom` | — | non | 1 |
| `l-eig-markov` | L | `alglin` | 13 | Chaînes de Markov à 2 états, état stationnaire | `l-eig-powers`, `@alg:J-hausse-baisse` | — | non | 0 |
| `l-eig-complex` | L | `alglin` | 13 | Valeurs propres complexes, rotation et dilatation | `l-eig-charpoly`, `g8-algebraic`, `g8-polar` | `opt` | non | 0 |
| `l-orth-dot` | L | `alglin` | 13 | Produit scalaire, norme, distance, angle | `l-mat-product` | — | non | 1 |
| `l-orth-complement` | L | `alglin` | 13 | Complément orthogonal W⊥ | `l-orth-dot`, `l-vs-kernel` | — | non | 1 |
| `l-orth-proj` | L | `alglin` | 13 | Projection orthogonale sur un sous-espace, distance | `l-orth-complement` | — | non | 2 |
| `l-orth-matrices` | L | `alglin` | 13 | Familles orthonormées et matrices orthogonales | `l-orth-dot`, `l-mat-inverse` | — | non | 1 |
| `l-orth-gs` | L | `alglin` | 13 | Gram-Schmidt | `l-orth-proj` | — | non | 2 |
| `l-orth-qr` | L | `alglin` | 13 | Factorisation QR | `l-orth-gs`, `l-orth-matrices` | — | non | 1 |
| `l-orth-lsq` | L | `alglin` | 13 | Moindres carrés | `l-orth-proj`, `l-mat-inverse` | — | non | 3 |
| `l-orth-inner` | L | `alglin` | 13 | Produits scalaires non standards | `l-orth-proj`, `l-vs-coords` | `MT` | non | 0 |
| `l-sym-orthodiag` | L | `alglin` | 13 | Diagonalisation orthogonale A = QDQᵀ | `l-eig-diag`, `l-orth-gs`, `l-orth-matrices` | — | non | 3 |
| `l-sym-quadform` | L | `alglin` | 13 | Formes quadratiques et axes principaux | `l-sym-orthodiag` | `MT` | non | 0 |
| `l-svd-compute` | L | `alglin` | 13 | Décomposition en valeurs singulières à la main | `l-sym-orthodiag`, `l-vs-rank` | — | non | 1 |
| `l-svd-sphere` | L | `alglin` | 13 | Image de la sphère unité | `l-svd-compute`, `l-sym-quadform` | `MT` | non | 0 |
| `l-proof-matrices` | L | `alglin` | 13 | Preuves courtes : inverses, noyaux, matrice canonique | `l-mat-imt`, `l-det-props`, `g9-proof-contra` | — | non | 0 |
| `l-proof-spectral` | L | `alglin` | 13 | Preuves courtes : symétriques, orthogonales, projecteurs | `l-sym-orthodiag`, `l-proof-matrices` | — | non | 0 |
| `m-blocks-schur` | M | `matrices` | 16 | Blocs et complément de Schur | `l-mat-blocks`, `l-det-props` | — | non | 1 |
| `m-rank1-proj` | M | `matrices` | 16 | Matrices de rang 1 et projecteurs | `l-orth-proj`, `l-vs-rank` | — | non | 1 |
| `m-spectral` | M | `matrices` | 16 | Décomposition spectrale et fonctions de matrices symétriques | `l-sym-orthodiag`, `m-rank1-proj` | — | non | 1 |
| `m-posdef` | M | `matrices` | 16 | Matrices définies positives : critères | `l-sym-quadform`, `m-spectral` | — | non | 2 |
| `m-cholesky` | M | `matrices` | 16 | Factorisation de Cholesky pas à pas | `m-posdef`, `l-mat-lu` | — | non | 2 |
| `m-quad-gradient` | M | `matrices` | 16 | Gradient et hessienne d'une forme quadratique | `m-posdef`, `a2-partials`, `a2-hessian-2x2` | — | non | 1 |
| `m-normal-eq` | M | `matrices` | 16 | Équations normales, matrice de design, Var(β̂) | `l-orth-lsq`, `m-quad-gradient`, `p-lin-combo` | — | non | 1 |
| `m-rayleigh` | M | `matrices` | 16 | Quotient de Rayleigh | `m-spectral` | — | non | 1 |
| `m-power-method` | M | `matrices` | 16 | Méthode de la puissance et puissance inverse | `m-rayleigh`, `l-eig-powers` | — | non | 2 |
| `m-svd-lowrank` | M | `matrices` | 16 | SVD en somme de rangs 1, approximation de rang k, image de la sphère | `l-svd-compute`, `m-rank1-proj` | — | non | 1 |
| `m-norms` | M | `matrices` | 16 | Normes matricielles | `l-svd-compute` | — | non | 1 |
| `m-cond` | M | `matrices` | 16 | Conditionnement | `m-norms` | — | non | 1 |
| `m-gershgorin` | M | `matrices` | 16 | Disques de Gershgorin | `l-eig-charpoly` | `opt`, `GM` | non | 0 |
| `m-ode-modes` | M | `matrices` | 16 | Systèmes x′ = Ax : modes propres et stabilité | `l-eig-diag`, `a2-ode-const2`, `g8-polar` | — | non | 2 |
| `m-expm` | M | `matrices` | 16 | Exponentielle de matrice, y compris pour une valeur propre double | `m-ode-modes`, `a1-pow-sums` | — | non | 1 |
| `m-discrete` | M | `matrices` | 16 | Systèmes discrets x_{k+1} = Ax_k | `l-eig-powers` | — | non | 1 |
| `a2-rn-topology` | A2 | `analyse2` | 14 | Ouvert, fermé, borné, compact | `g10-circle-eq` | — | non | 3 |
| `a2-rn-boundary` | A2 | `analyse2` | 14 | Intérieur, adhérence, bord | `a2-rn-topology` | — | non | 2 |
| `a2-rn-sequences` | A2 | `analyse2` | 14 | Suites et sous-suites dans ℝⁿ | `a1-seq-limsup`, `g3-identities` | — | non | 1 |
| `a2-curve-param` | A2 | `analyse2` | 14 | Courbes paramétrées dans ℝ³ : continuité, tangente, courbe lisse | `a1-param-curve`, `g4-line3` | — | non | 1 |
| `a2-curve-length` | A2 | `analyse2` | 14 | Longueur d'arc | `a2-curve-param`, `a1-int-applications` | — | non | 1 |
| `a2-lim-paths` | A2 | `analyse2` | 14 | Limite qui n'existe pas : deux chemins | `a1-fn-limits`, `@alg:G-simplifier` | — | non | 3 |
| `a2-lim-polar` | A2 | `analyse2` | 14 | Limite qui existe : coordonnées polaires et gendarmes | `a1-seq-squeeze`, `g1-bound` | — | non | 3 |
| `a2-continuity` | A2 | `analyse2` | 14 | Continuité et prolongement par continuité | `a2-lim-polar`, `a1-fn-extension` | — | non | 2 |
| `a2-compact-extreme` | A2 | `analyse2` | 14 | Fonctions continues sur un compact (vrai/faux) | `a2-rn-topology`, `a2-continuity`, `g9-counterexample` | — | non | 3 |
| `a2-partials` | A2 | `analyse2` | 14 | Dérivées partielles, gradient, jacobienne, dérivées d'ordre 2 | `g6-deriv-rules` | — | non | 2 |
| `a2-dir-deriv-def` | A2 | `analyse2` | 14 | Dérivées partielles et directionnelles par la définition | `a2-partials`, `a1-deriv-def` | — | non | 3 |
| `a2-diff-def` | A2 | `analyse2` | 14 | Différentiabilité en un point par la définition | `a2-dir-deriv-def`, `a2-lim-paths`, `a2-lim-polar` | — | non | 2 |
| `a2-diff-implications` | A2 | `analyse2` | 14 | C¹, différentiable, dérivées partielles : qui implique quoi | `a2-diff-def`, `a2-continuity`, `g9-counterexample` | — | non | 3 |
| `a2-tangent-graph` | A2 | `analyse2` | 14 | Plan tangent au graphe | `a2-partials`, `g4-plane` | — | non | 1 |
| `a2-tangent-level` | A2 | `analyse2` | 14 | Plan tangent à une surface de niveau | `g4-dot`, `a2-partials`, `g4-plane` | — | non | 3 |
| `a2-chain` | A2 | `analyse2` | 14 | Règle de chaîne et jacobienne d'une composée | `a2-partials`, `l-mat-product` | — | non | 3 |
| `a2-chain-polar` | A2 | `analyse2` | 14 | Gradient et coordonnées polaires | `a2-chain`, `g3-identities` | — | non | 2 |
| `a2-laplacian-radial` | A2 | `analyse2` | 14 | Laplacien en coordonnées polaires et radiales | `a2-chain-polar` | — | non | 1 |
| `a2-taylor2` | A2 | `analyse2` | 14 | Polynôme de Taylor d'ordre 2 à deux variables | `a2-partials`, `a1-dl-ops`, `a1-dl-compose` | — | non | 3 |
| `a2-implicit-2var` | A2 | `analyse2` | 14 | Fonction implicite y = g(x) : g′ et g″ | `a2-partials`, `g6-deriv-implicit`, `a2-chain` | — | non | 1 |
| `a2-implicit-3var` | A2 | `analyse2` | 14 | Fonction implicite à 3 variables | `a2-implicit-2var` | — | non | 2 |
| `a2-crit-points` | A2 | `analyse2` | 14 | Points stationnaires : résoudre ∇f = 0 | `a2-partials`, `@alg:E-systemes-2x2`, `@alg:D-trinome` | — | non | 2 |
| `a2-hessian-2x2` | A2 | `analyse2` | 14 | Nature d'un point stationnaire (hessienne 2 × 2) | `a2-crit-points`, `l-det-cofactor` | — | non | 2 |
| `a2-hessian-3x3` | A2 | `analyse2` | 14 | Hessienne 3 × 3 : mineurs, trace, déterminant, valeurs propres | `a2-hessian-2x2`, `l-eig-charpoly` | — | non | 3 |
| `a2-extrema-compact` | A2 | `analyse2` | 14 | Extrema absolus sur un compact, bord compris | `a2-compact-extreme`, `a1-extrema-global`, `a2-crit-points` | — | non | 2 |
| `a2-lagrange` | A2 | `analyse2` | 14 | Multiplicateurs de Lagrange (une contrainte, deux variables) | `a2-crit-points`, `a2-tangent-level` | — | non | 3 |
| `a2-lagrange-3d` | A2 | `analyse2` | 14 | Lagrange dans ℝ³ ; formes quadratiques sur la sphère | `a2-lagrange`, `l-sym-quadform` | — | non | 1 |
| `a2-param-int` | A2 | `analyse2` | 14 | Intégrale à paramètre, bornes fixes : dériver sous l'intégrale | `a2-partials`, `a1-int-direct` | — | non | 1 |
| `a2-param-int-bounds` | A2 | `analyse2` | 14 | Intégrale à paramètre avec bornes variables (règle de Leibniz) | `a2-param-int`, `a1-ftc` | — | non | 3 |
| `a2-fubini-rect` | A2 | `analyse2` | 14 | Intégrale double sur un rectangle ; symétries | `a1-int-direct` | — | non | 2 |
| `a2-domain-describe` | A2 | `analyse2` | 14 | Décrire un domaine : types I et II, depuis les polaires | `a2-fubini-rect`, `g10-circle-eq` | — | non | 2 |
| `a2-fubini-swap` | A2 | `analyse2` | 14 | Changer l'ordre d'intégration | `a2-domain-describe` | — | non | 3 |
| `a2-triple-int` | A2 | `analyse2` | 14 | Intégrales triples par Fubini | `a2-domain-describe` | — | non | 1 |
| `a2-change-var` | A2 | `analyse2` | 14 | Changement de variables et jacobien | `a2-domain-describe`, `a2-partials`, `l-det-cofactor` | — | non | 1 |
| `a2-polar-int` | A2 | `analyse2` | 14 | Intégrales doubles en coordonnées polaires | `a2-change-var`, `g3-identities` | — | non | 2 |
| `a2-cyl-sph` | A2 | `analyse2` | 14 | Coordonnées cylindriques et sphériques | `a2-polar-int`, `a2-triple-int` | — | non | 3 |
| `a2-improper-multi` | A2 | `analyse2` | 14 | Intégrales impropres sur ℝ² et ℝ³ ; intégrale de Gauss | `a2-polar-int`, `a2-cyl-sph`, `a1-improper-calc` | — | non | 1 |
| `a2-volume` | A2 | `analyse2` | 14 | Volumes | `a2-polar-int` | — | non | 1 |
| `a2-mass-center` | A2 | `analyse2` | 14 | Masse et centre de masse | `a2-polar-int` | opt | non | 0 |
| `a2-ode-cauchy` | A2 | `analyse2` | 14 | Problème de Cauchy : existence, unicité, Lipschitz | `a2-partials` | — | non | 1 |
| `a2-ode-separable` | A2 | `analyse2` | 14 | Équations à variables séparables | `a1-int-direct`, `a1-int-rational`, `g2-hyp-def` | — | non | 3 |
| `a2-ode-linear1` | A2 | `analyse2` | 14 | Linéaires du 1er ordre : facteur intégrant | `a1-int-direct` | — | non | 3 |
| `a2-ode-homog-subst` | A2 | `analyse2` | 14 | Équations homogènes : y = x·v | `a2-ode-separable` | — | non | 1 |
| `a2-ode-structure` | A2 | `analyse2` | 14 | Structure des solutions des EDO linéaires | `l-vec-indep` | — | non | 1 |
| `a2-ode-const2` | A2 | `analyse2` | 14 | 2e ordre homogène à coefficients constants | `a2-ode-structure`, `@alg:H-discriminant`, `g8-polar` | — | non | 2 |
| `a2-ode-wronskian` | A2 | `analyse2` | 14 | Wronskien et réduction d'ordre | `a2-ode-linear1`, `a2-ode-structure` | — | non | 1 |
| `a2-ode-particular` | A2 | `analyse2` | 14 | Solution particulière, résonance, problème de Cauchy | `a2-ode-const2` | — | non | 3 |
| `a2-ode-choose` | A2 | `analyse2` | 14 | Choisir la méthode (organigramme des EDO) | `a2-ode-separable`, `a2-ode-linear1`, `a2-ode-homog-subst`, `a2-ode-particular` | — | non | 2 |
| `a2-ode-stability` | A2 | `analyse2` | 14 | Stabilité selon un paramètre | `a2-ode-const2`, `@alg:I-parametres` | — | non | 1 |
| `a2-ode-subst-other` | A2 | `analyse2` | 14 | Autres changements de variable : Bernoulli, Euler | `a2-ode-linear1`, `a2-ode-const2` | opt | non | 0 |
| `a2-ode-exact` | A2 | `analyse2` | 14 | Équations exactes | `a2-partials` | opt | non | 0 |
| `a2-ode-system` | A2 | `analyse2` | 14 | Systèmes linéaires X′ = AX | `a2-ode-const2`, `l-eig-diag` | opt | non | 0 |
| `v-ops` | V | `vecto` | 15 | Gradient, divergence, rotationnel, laplacien | `a2-partials`, `g4-cross` | — | non | 2 |
| `v-identities` | V | `vecto` | 15 | Identités des opérateurs | `v-ops` | — | non | 1 |
| `v-curve-param` | V | `vecto` | 15 | Paramétrer une courbe orientée | `a2-curve-param` | — | non | 1 |
| `v-line-scalar` | V | `vecto` | 15 | Intégrale curviligne d'un champ scalaire ∫ f dl | `v-curve-param`, `a1-int-direct` | — | non | 2 |
| `v-line-vector` | V | `vecto` | 15 | Travail ∫ F · dl et orientation | `v-curve-param`, `a1-int-direct` | — | non | 2 |
| `v-domain-topo` | V | `vecto` | 15 | Convexe, étoilé, simplement connexe | `a2-rn-topology` | — | non | 1 |
| `v-pot-test` | V | `vecto` | 15 | Le test rot F = 0 et son domaine | `v-ops`, `v-domain-topo` | — | non | 2 |
| `v-pot-find` | V | `vecto` | 15 | Trouver un potentiel pas à pas | `v-pot-test`, `a1-int-direct` | — | non | 2 |
| `v-pot-lambda` | V | `vecto` | 15 | Potentiel avec un paramètre λ | `v-pot-find` | — | non | 1 |
| `v-pot-none` | V | `vecto` | 15 | Prouver qu'il n'y a pas de potentiel | `v-line-vector`, `v-pot-test` | — | non | 2 |
| `v-pot-domain` | V | `vecto` | 15 | Problème : potentiel et discussion du domaine | `v-pot-none`, `v-pot-find` | — | non | 2 |
| `v-green` | V | `vecto` | 15 | Théorème de Green et calcul d'une aire | `v-line-vector`, `v-ops`, `a2-fubini-rect`, `a2-polar-int` | — | non | 3 |
| `v-green-flux` | V | `vecto` | 15 | Forme flux de Green : ∮ F · ν dl = ∬ div F | `v-green` | — | non | 2 |
| `v-surf-param` | V | `vecto` | 15 | Paramétrer une surface ; normale σ_u ∧ σ_v | `a2-cyl-sph`, `g4-cross` | — | non | 2 |
| `v-surf-area` | V | `vecto` | 15 | Aire d'une surface et intégrale ∬ f ds | `v-surf-param`, `a2-fubini-rect` | — | non | 1 |
| `v-flux` | V | `vecto` | 15 | Flux ∬ F · ds | `v-surf-param` | — | non | 2 |
| `v-boundary` | V | `vecto` | 15 | Bord orienté ∂Σ = σ(∂A) | `v-surf-param`, `v-curve-param` | — | non | 2 |
| `v-div-thm` | V | `vecto` | 15 | Théorème de la divergence | `v-flux`, `v-ops`, `a2-cyl-sph` | — | non | 2 |
| `v-stokes` | V | `vecto` | 15 | Théorème de Stokes | `v-flux`, `v-boundary`, `v-line-vector`, `v-ops` | — | non | 2 |
| `v-verify-stokes` | V | `vecto` | 15 | Problème : vérifier le théorème de Stokes | `v-stokes` | — | non | 3 |
| `v-verify-div` | V | `vecto` | 15 | Problème : vérifier le théorème de la divergence | `v-div-thm` | — | non | 1 |
| `v-proof-identity` | V | `vecto` | 15 | Petites preuves (3 points) | `v-identities`, `v-pot-test`, `a2-chain`, `g9-proof-contra` | — | non | 1 |
| `c-elem-fn` | C | `cplx` | 15 | Fonctions élémentaires : e^z, cos z, Log z, z^α | `g8-polar`, `g2-hyp-def` | — | non | 1 |
| `c-equations` | C | `cplx` | 15 | Équations dans ℂ | `c-elem-fn`, `g8-quadratic` | — | non | 1 |
| `c-cauchy-riemann` | C | `cplx` | 15 | Cauchy-Riemann et holomorphie | `c-elem-fn`, `a2-partials` | — | non | 2 |
| `c-harmonic-conj` | C | `cplx` | 15 | Construire f holomorphe à partir de v | `c-cauchy-riemann` | — | non | 1 |
| `c-contour-param` | C | `cplx` | 15 | Intégrales de contour par paramétrisation | `c-elem-fn`, `v-curve-param` | — | non | 1 |
| `c-cauchy-thm` | C | `cplx` | 15 | Théorème de Cauchy | `c-cauchy-riemann` | — | non | 2 |
| `c-cauchy-formula` | C | `cplx` | 15 | Formule intégrale de Cauchy | `c-cauchy-thm` | — | non | 1 |
| `c-taylor` | C | `cplx` | 15 | Série de Taylor et rayon de convergence | `a1-pow-domain`, `a1-ser-geo-tele` | — | non | 1 |
| `c-laurent` | C | `cplx` | 15 | Série de Laurent dans une couronne donnée | `c-taylor`, `g0-pfd-simple` | — | non | 2 |
| `c-singularities` | C | `cplx` | 15 | Classer les singularités | `c-laurent`, `a1-dl-usual` | — | non | 1 |
| `c-res-simple` | C | `cplx` | 15 | Résidu en un pôle simple | `c-singularities` | — | non | 2 |
| `c-res-multiple` | C | `cplx` | 15 | Résidu en un pôle multiple | `c-singularities` | — | non | 2 |
| `c-res-laurent` | C | `cplx` | 15 | Résidu par la série de Laurent (singularité essentielle) | `c-laurent`, `c-singularities` | — | non | 1 |
| `c-res-theorem` | C | `cplx` | 15 | Théorème des résidus sur un contour fermé | `c-res-simple`, `c-res-multiple`, `c-cauchy-thm` | — | non | 3 |
| `c-arc-estimate` | C | `cplx` | 15 | Montrer qu'une intégrale sur un arc tend vers 0 | `c-contour-param`, `g8-algebraic` | — | non | 2 |
| `c-int-rational` | C | `cplx` | 15 | Intégrales rationnelles sur ℝ | `c-res-theorem`, `c-arc-estimate` | — | non | 2 |
| `c-int-trig` | C | `cplx` | 15 | Intégrales trigonométriques sur [0 ; 2π] | `c-res-theorem` | — | non | 2 |
| `c-int-fourier` | C | `cplx` | 15 | Intégrales avec e^(iαx) | `c-res-theorem`, `c-arc-estimate` | — | non | 2 |
| `c-int-branch` | C | `cplx` | 15 | Intégrales avec coupure (GM) | `c-int-rational`, `c-elem-fn` | `GM` | non | 1 |
| `c-fourier-residues` | C | `cplx` | 15 | Transformée de Fourier calculée par les résidus (GM) | `c-int-fourier` | `GM` | non | 1 |
| `c-conformal` | C | `cplx` | 15 | Applications conformes (opt.) | `c-elem-fn` | `opt` | oui | 0 |
| `f-coef` | F | `fourier` | 16 | Coefficients de Fourier, parité, a₀ et petits indices | `a1-int-parts`, `g1-parity-period` | — | non | 3 |
| `f-coef-complex` | F | `fourier` | 16 | Coefficients complexes cₙ d'une somme d'exponentielles | `f-coef`, `g8-polar` | — | non | 1 |
| `f-sine-cosine` | F | `fourier` | 16 | Séries en sinus et en cosinus sur [0 ; L] | `f-coef` | — | non | 3 |
| `f-dirichlet` | F | `fourier` | 16 | Dirichlet : valeur aux sauts, puis une somme numérique | `f-coef`, `a1-fn-onesided`, `g5-reindex` | — | non | 3 |
| `f-parseval` | F | `fourier` | 16 | Parseval et sommes | `f-coef` | — | non | 2 |
| `f-coef-relations` | F | `fourier` | 16 | Relations entre coefficients ; dérivation terme à terme | `f-coef` | — | non | 1 |
| `f-series-problem` | F | `fourier` | 16 | Problème : série en sinus, Dirichlet, somme numérique | `f-sine-cosine`, `f-dirichlet` | — | non | 3 |
| `f-ft-direct` | F | `fourier` | 16 | Transformée de Fourier : définition et calcul direct | `a1-improper-calc`, `a1-int-parts`, `g8-polar` | — | non | 2 |
| `f-ft-table` | F | `fourier` | 16 | Transformée de Fourier par la table et les propriétés | `f-ft-direct` | — | non | 3 |
| `f-ft-eq` | F | `fourier` | 16 | Équations résolues par la transformée de Fourier | `f-ft-table`, `@alg:F-variable-deux-fois`, `@alg:G-additionner` | — | non | 3 |
| `f-plancherel` | F | `fourier` | 16 | Plancherel | `f-ft-table` | — | non | 1 |
| `f-periodic-ode` | F | `fourier` | 16 | EDO périodique par séries de Fourier | `f-coef-complex` | — | non | 1 |
| `f-sturm-liouville` | F | `fourier` | 16 | Problème de Sturm-Liouville (GM) | `f-sine-cosine`, `a2-ode-const2` | `GM` | non | 1 |
| `f-lap-table` | F | `fourier` | 16 | Transformée de Laplace par la table et les propriétés | `a1-improper-calc`, `g8-polar` | — | non | 2 |
| `f-lap-abscissa` | F | `fourier` | 16 | Abscisse de convergence | `f-lap-table` | — | non | 1 |
| `f-lap-inv-des` | F | `fourier` | 16 | Laplace inverse par éléments simples | `f-lap-table`, `g0-pfd-general` | — | non | 2 |
| `f-lap-inv-res` | F | `fourier` | 16 | Laplace inverse par les résidus | `c-res-multiple`, `c-res-theorem` | — | non | 2 |
| `f-lap-ode` | F | `fourier` | 16 | EDO avec conditions initiales par Laplace | `f-lap-inv-des` | — | non | 2 |
| `f-lap-integro` | F | `fourier` | 16 | Équations intégro-différentielles (GM) | `f-lap-ode` | `GM` | non | 1 |
| `f-lap-problem` | F | `fourier` | 16 | Problème : EDO par Laplace, puis inverse par les résidus | `f-lap-ode`, `f-lap-inv-res`, `c-arc-estimate` | — | non | 3 |
| `f-heat-sep` | F | `fourier` | 16 | Équation de la chaleur par séparation des variables | `f-sine-cosine`, `a2-ode-linear1` | — | non | 3 |
| `f-heat-source` | F | `fourier` | 16 | Problème : chaleur avec terme source | `f-heat-sep` | — | non | 2 |
| `f-wave` | F | `fourier` | 16 | Équation des ondes ; d'Alembert par Fourier en x | `f-heat-sep`, `f-ft-table` | — | non | 1 |
| `f-laplace-eq` | F | `fourier` | 16 | Équation de Laplace dans un disque, dans un demi-plan | `f-heat-sep`, `f-ft-table`, `a2-laplacian-radial` | — | non | 1 |
| `f-distrib-def` | F | `fourier` | 16 | Distributions : ⟨T_f, φ⟩, δ_a et f·δ_a (MT/SV) | `a1-improper-calc` | `MT/SV` | non | 1 |
| `f-distrib-deriv` | F | `fourier` | 16 | Dérivée au sens des distributions (MT/SV) | `f-distrib-def`, `a1-int-parts` | `MT/SV` | non | 1 |
| `f-distrib-eq` | F | `fourier` | 16 | Équations avec δ ; transformée de Fourier de cos (MT/SV) | `f-distrib-deriv`, `f-ft-table` | `MT/SV` | non | 1 |
| `p-desc-summary` | P | `proba` | 15 | Moyenne, médiane, variance empirique | `@alg:A-arrondir` | `MATH-234` | non | 1 |
| `p-desc-boxplot` | P | `proba` | 15 | Quartiles, résumé en 5 valeurs, boîte à moustaches | `p-desc-summary` | `MATH-234` | non | 1 |
| `p-events` | P | `proba` | 15 | Axiomes, complément, inclusion-exclusion | `g9-sets` | `MATH-234`, `EE-209` | non | 1 |
| `p-count` | P | `proba` | 15 | Équiprobabilité et dénombrement | `p-events`, `g7-combinations`, `g7-which-count` | `MATH-234` | non | 1 |
| `p-cond-total` | P | `proba` | 15 | Conditionnement et probabilités totales | `p-events` | `MATH-234`, `EE-209` | non | 1 |
| `p-bayes-freq` | P | `proba` | 15 | Bayes par les fréquences naturelles | `p-cond-total`, `@alg:J-pourcentage` | `MATH-234`, `EE-209` | non | 1 |
| `p-bayes-formula` | P | `proba` | 15 | Formule de Bayes, deux tests | `p-bayes-freq` | `MATH-234`, `EE-209` | non | 2 |
| `p-indep` | P | `proba` | 15 | Indépendance, incompatibilité, systèmes redondants | `p-cond-total` | `MATH-234`, `EE-209` | non | 1 |
| `p-disc-pmf` | P | `proba` | 15 | Variable discrète : fonction de masse, de répartition, quantile | `p-events`, `a1-ser-geo-tele` | `MATH-234`, `EE-209` | non | 1 |
| `p-binom` | P | `proba` | 15 | Bernoulli et binomiale | `p-disc-pmf`, `g7-binomial` | `MATH-234`, `EE-209` | non | 1 |
| `p-poisson` | P | `proba` | 15 | Loi de Poisson, lien avec la binomiale | `p-binom` | `MATH-234`, `EE-209` | non | 1 |
| `p-hypergeom` | P | `proba` | 15 | Loi hypergéométrique | `p-count`, `p-binom`, `p-cond-total` | `opt` | non | 1 |
| `p-cont-density` | P | `proba` | 15 | Densité : normaliser, F ↔ f, probabilités | `a1-int-direct`, `a1-improper-calc` | `MATH-234`, `EE-209` | non | 1 |
| `p-cont-quantile` | P | `proba` | 15 | Quantile d'une loi continue | `p-cont-density` | `MATH-234`, `EE-209` | non | 1 |
| `p-unif-exp` | P | `proba` | 15 | Uniforme et exponentielle, absence de mémoire | `p-cont-density`, `p-cond-total` | `MATH-234`, `EE-209` | non | 1 |
| `p-moments` | P | `proba` | 15 | Espérance et variance d'une loi | `p-disc-pmf`, `p-cont-density` | `MATH-234`, `EE-209` | non | 1 |
| `p-family` | P | `proba` | 15 | Reconnaître Gamma, Beta, Weibull, Pareto, χ² | `p-unif-exp`, `p-moments` | `MATH-234`, `EE-209` | non | 1 |
| `p-normal-std` | P | `proba` | 15 | Loi normale : standardiser, table de Φ | `p-cont-density` | `MATH-234`, `EE-209` | non | 1 |
| `p-normal-inverse` | P | `proba` | 15 | Quantiles normaux, retrouver μ ou σ | `p-normal-std` | `MATH-234`, `EE-209` | non | 1 |
| `p-transform` | P | `proba` | 15 | Loi de Y = g(X) ; échantillonnage par F⁻¹ | `p-cont-density`, `a1-deriv-inverse`, `a2-change-var`, `p-family` | `MATH-234`, `EE-209` | non | 1 |
| `p-joint-disc` | P | `proba` | 15 | Loi conjointe discrète | `p-disc-pmf`, `p-indep` | `MATH-234`, `EE-209` | non | 1 |
| `p-joint-cont` | P | `proba` | 15 | Densité conjointe : constante, marginales, indépendance | `p-cont-density`, `a2-fubini-rect`, `a2-domain-describe`, `a2-improper-multi` | `MATH-234`, `EE-209` | non | 1 |
| `p-lin-combo` | P | `proba` | 15 | Combinaisons linéaires : espérance, variance, covariance | `p-moments` | `MATH-234`, `EE-209` | non | 1 |
| `p-cov-corr` | P | `proba` | 15 | Covariance, corrélation ; corrélation et causalité | `p-lin-combo`, `p-joint-disc` | `MATH-234`, `EE-209` | non | 1 |
| `p-total-expect` | P | `proba` | 15 | Espérance et variance totales | `p-moments`, `p-cond-total`, `p-binom` | `MATH-234` | non | 1 |
| `p-sum-mixture` | P | `proba` | 16 | Densité d'une somme ; mélange de gaussiennes | `p-joint-cont`, `p-total-expect` | `EE-209` | non | 1 |
| `p-markov-cheb` | P | `proba` | 15 | Markov, Tchebychev, loi des grands nombres | `p-moments`, `p-normal-std` | `MATH-234`, `EE-209` | non | 1 |
| `p-clt-sum` | P | `proba` | 15 | Théorème central limite pour une somme ou une moyenne | `p-normal-std`, `p-lin-combo` | `MATH-234`, `EE-209` | non | 1 |
| `p-clt-binom` | P | `proba` | 15 | Approximation normale de la binomiale et de Poisson | `p-clt-sum`, `p-binom`, `p-poisson` | `MATH-234`, `EE-209` | non | 1 |
| `p-mom` | P | `proba` | 15 | Méthode des moments | `p-moments` | `MATH-234`, `EE-209` | non | 1 |
| `p-mle` | P | `proba` | 15 | Maximum de vraisemblance, étape par étape | `p-disc-pmf`, `p-cont-density`, `g2-log-rules`, `g6-deriv-rules` | `MATH-234`, `EE-209` | non | 3 |
| `p-mle-special` | P | `proba` | 15 | MLE au bord du support ; invariance | `p-mle` | `MATH-234`, `EE-209` | non | 1 |
| `p-bias-mse` | P | `proba` | 15 | Biais, variance, erreur quadratique moyenne, consistance | `p-mom`, `p-mle`, `p-lin-combo` | `MATH-234`, `EE-209` | non | 2 |
| `p-fisher-cr` | P | `proba` | 16 | Information de Fisher, Cramér-Rao | `p-mle`, `p-bias-mse` | `EE-209` | non | 1 |
| `p-ci-mean` | P | `proba` | 15 | IC pour une moyenne : z ou Student | `p-normal-inverse`, `p-clt-sum`, `p-desc-summary` | `MATH-234`, `EE-209` | non | 2 |
| `p-ci-wald` | P | `proba` | 15 | IC de Wald (avec −ℓ″) et de Wilson | `p-ci-mean`, `p-mle` | `MATH-234`, `EE-209` (le gabarit Wilson est EE-209) | non | 1 |
| `p-ci-round` | P | `proba` | 16 | Arrondir un IC (chiffres significatifs) | `p-ci-mean`, `@alg:A-arrondir` | `EE-209` | non | 1 |
| `p-max-sample` | P | `proba` | 15 | Maximum d'un échantillon ; IC exact | `p-cont-quantile`, `p-indep`, `p-mle-special` | `MATH-234` | non | 1 |
| `p-test-setup` | P | `proba` | 15 | Formuler un test : H₀, H₁, région critique, p-valeur | `p-normal-std` | `MATH-234`, `EE-209` | non | 1 |
| `p-test-power` | P | `proba` | 15 | Erreurs de type 1 et 2, puissance | `p-test-setup`, `p-normal-inverse` | `MATH-234`, `EE-209` | non | 2 |
| `p-test-z` | P | `proba` | 15 | Test z : σ connu, asymptotique, une proportion, Wald | `p-test-setup`, `p-clt-binom` | `MATH-234`, `EE-209` | non | 1 |
| `p-test-t1` | P | `proba` | 15 | Test t à un échantillon ; données appariées | `p-test-z`, `p-ci-mean`, `p-interpret` | `MATH-234`, `EE-209` | non | 1 |
| `p-test-t2` | P | `proba` | 15 | Test t à deux échantillons, variance poolée (et test F) | `p-test-t1` | `MATH-234` | non | 1 |
| `p-test-two-prop` | P | `proba` | 15 | Comparer deux proportions | `p-test-z` | `MATH-234` | non | 1 |
| `p-test-chi2-gof` | P | `proba` | 15 | Test χ² d'adéquation | `p-test-setup`, `p-family`, `p-binom` | `MATH-234` | non | 1 |
| `p-test-chi2-indep` | P | `proba` | 15 | Test χ² d'indépendance | `p-test-chi2-gof`, `p-joint-disc` | `MATH-234` | non | 1 |
| `p-test-chi2-var` | P | `proba` | 16 | χ² sur une variance : test et IC | `p-test-setup`, `p-family` | `EE-209` | non | 1 |
| `p-interpret` | P | `proba` | 15 | Interpréter une p-valeur ou un IC | `p-ci-mean`, `p-test-setup` | `MATH-234`, `EE-209` | non | 3 |
| `p-reg-ls` | P | `proba` | 15 | Droite des moindres carrés, r et R² | `p-cov-corr`, `l-orth-lsq`, `p-desc-summary` | `MATH-234`, `EE-209` | non | 1 |
| `p-reg-test` | P | `proba` | 15 | Tests t et IC sur les coefficients | `p-reg-ls`, `p-test-t1` | `MATH-234` | non | 1 |
| `p-reg-multi` | P | `proba` | 15 | Régression multiple, matrice de design, test F emboîté | `p-reg-test`, `l-orth-lsq` | `MATH-234`, `EE-209` | non | 1 |
| `p-reg-diag` | P | `proba` | 15 | Diagnostics d'une régression | `p-reg-ls` | `MATH-234` | non | 1 |
| `p-bayes-beta` | P | `proba` | 16 | Modèle Beta-Bernoulli : a posteriori, PM, MAP | `p-bayes-formula`, `p-family`, `p-mle` | `EE-209` | non | 1 |
| `p-bayes-gauss` | P | `proba` | 16 | Modèle gaussien-gaussien | `p-normal-std` | `EE-209` | non | 2 |
| `p-bayes-conjugate` | P | `proba` | 16 | Lois conjuguées ; Dirichlet-multinomiale | `p-bayes-beta`, `p-count` | `EE-209` | non | 1 |
| `n-err-abs-rel` | N | `numerique` | 16 | Erreurs absolue et relative ; arrondis | `@alg:A-arrondir`, `@alg:J-quel-pourcentage` | — | non | 1 |
| `n-err-float` | N | `numerique` | 16 | Virgule flottante, ε machine, annulation | `n-err-abs-rel` | — | non | 1 |
| `n-bisection` | N | `numerique` | 16 | Bissection : nombre d'itérations et intervalles | `a1-fn-ivt`, `g2-log-rules` | `GM` | non | 1 |
| `n-fp-converge` | N | `numerique` | 16 | Point fixe : convergence, choix de φ | `a1-seq-rec-fixed`, `a1-mvt` | — | non | 1 |
| `n-fp-order` | N | `numerique` | 16 | Ordre d'un point fixe, ordre selon un paramètre | `n-fp-converge`, `a1-dl-usual` | — | non | 1 |
| `n-newton` | N | `numerique` | 16 | Méthode de Newton pour une équation | `n-fp-converge`, `g6-deriv-rules` | — | non | 1 |
| `n-order-read` | N | `numerique` | 16 | Lire l'ordre sur les rapports d'incréments | `n-newton` | — | non | 2 |
| `n-newton-multiple` | N | `numerique` | 16 | Newton sur une racine multiple ; Newton modifié | `n-newton`, `n-order-read`, `g0-multiplicity` | — | non | 1 |
| `n-newton-system` | N | `numerique` | 16 | Newton pour les systèmes ; jacobienne à la main | `n-newton`, `a2-partials`, `l-sys-echelon` | — | non | 2 |
| `n-secant` | N | `numerique` | 16 | Méthode de la sécante | `n-newton`, `n-order-read` | `opt` | non | 0 |
| `n-interp-lagrange` | N | `numerique` | 16 | Interpolation : Vandermonde et Lagrange à la main | `l-sys-echelon` | — | non | 1 |
| `n-interp-error` | N | `numerique` | 16 | Erreur d'interpolation ; phénomène de Runge | `n-interp-lagrange`, `a1-extrema-global` | — | non | 1 |
| `n-divided-diff` | N | `numerique` | 16 | Différences divisées, forme de Newton | `n-interp-lagrange`, `g0-horner` | `opt` | non | 0 |
| `n-chebyshev` | N | `numerique` | 16 | Nœuds de Tchebychev | `n-interp-error` | `opt` | non | 0 |
| `n-interp-piecewise` | N | `numerique` | 16 | Interpolation linéaire par morceaux | `n-interp-error` | `GM` | non | 0 |
| `n-spline` | N | `numerique` | 16 | Splines cubiques naturelles | `n-interp-piecewise` | `GM` | non | 0 |
| `n-least-squares` | N | `numerique` | 16 | Moindres carrés : équations normales à la main | `l-orth-lsq` | — | non | 2 |
| `n-fd-basic` | N | `numerique` | 16 | Différences finies progressives, rétrogrades, centrées | `a1-dl-usual` | — | non | 1 |
| `n-fd-roundoff` | N | `numerique` | 16 | Compromis entre arrondi et troncature | `n-fd-basic`, `n-err-float`, `a1-extrema-global` | — | non | 1 |
| `n-fd-build` | N | `numerique` | 16 | Construire une formule de différences finies par Taylor | `n-fd-basic` | — | non | 1 |
| `n-fd-proof` | N | `numerique` | 16 | Prouver l'ordre d'une formule de différences finies, avec la constante | `n-fd-build` | — | non | 2 |
| `n-quad-composite` | N | `numerique` | 16 | Formules composites : rectangle, point milieu, trapèze, Simpson | `g5-sigma`, `a1-int-direct` | — | non | 1 |
| `n-quad-exactness` | N | `numerique` | 16 | Degré d'exactitude ; ramener à [−1 ; 1] | `n-quad-composite`, `a1-int-subst` | — | non | 2 |
| `n-quad-order` | N | `numerique` | 16 | Ordre d'une formule composite ; lire un tableau d'erreurs | `n-quad-exactness`, `@alg:L-fonction-affine` | — | non | 2 |
| `n-quad-proof` | N | `numerique` | 16 | Prouver l'ordre d'une formule composite par Taylor | `n-quad-order`, `a1-dl-usual` | — | non | 2 |
| `n-error-statements` | N | `numerique` | 16 | Lire une estimation d'erreur : quantificateurs, constante, régularité | `n-quad-order`, `g9-negate` | — | non | 2 |
| `n-richardson` | N | `numerique` | 16 | Extrapolation de Richardson, estimation a posteriori | `n-quad-order` | `GM` | non | 0 |
| `n-lu` | N | `numerique` | 16 | Factorisation LU, pivot, coût, déterminant | `l-mat-lu`, `l-det-props` | — | non | 1 |
| `n-thomas` | N | `numerique` | 16 | LU tridiagonale (algorithme de Thomas), en O(N) | `n-lu` | — | non | 4 |
| `n-iter-jacobi-gs` | N | `numerique` | 16 | Jacobi et Gauss-Seidel | `l-sys-augmented` | `GM` | non | 0 |
| `n-iter-convergence` | N | `numerique` | 16 | Convergence des méthodes itératives, critère d'arrêt | `n-iter-jacobi-gs`, `l-eig-charpoly`, `m-cond` | `GM` | non | 0 |
| `n-gradient-spd` | N | `numerique` | 16 | Méthode du gradient, à pas fixe ou optimal, pour A SDP | `m-posdef`, `m-quad-gradient` | `GM`, `MT` | non | 2 |
| `n-ode-euler` | N | `numerique` | 16 | Euler progressif et rétrograde | `a2-ode-cauchy`, `a2-ode-linear1` | — | non | 1 |
| `n-ode-rk` | N | `numerique` | 16 | Heun, Crank-Nicolson, Runge-Kutta | `n-ode-euler` | — | non | 1 |
| `n-ode-stability` | N | `numerique` | 16 | Stabilité absolue sur u′ = λu | `n-ode-rk`, `m-ode-modes` | — | non | 2 |
| `n-ode-euler-global` | N | `numerique` | 16 | Erreur globale d'Euler, par une preuve | `n-ode-euler`, `g5-geom`, `a1-extrema-global`, `a1-dl-usual` | — | non | 2 |
| `n-ode-implicit-newton` | N | `numerique` | 16 | Euler implicite sur un système, avec un pas de Newton | `n-ode-euler`, `n-newton-system` | — | non | 2 |
| `n-ode-stiff` | N | `numerique` | 16 | Problèmes raides | `n-ode-stability` | `opt` | non | 0 |
| `n-bvp-fd` | N | `numerique` | 16 | Problème aux limites −u″ = f : schéma, matrice, A SDP | `n-fd-basic`, `n-thomas`, `m-posdef` | — | non | 2 |
| `n-bvp-convergence` | N | `numerique` | 16 | Consistance, stabilité, convergence en Ch² | `n-bvp-fd`, `n-fd-proof` | — | non | 2 |
| `n-bvp-newton` | N | `numerique` | 16 | Problème non linéaire : différences finies, Newton, Cholesky tridiagonal | `n-bvp-fd`, `n-newton-system`, `m-cholesky` | `MT` | non | 3 |
| `n-heat-implicit` | N | `numerique` | 16 | Équation de la chaleur : Euler implicite et différences finies | `n-bvp-fd`, `n-ode-stability`, `n-thomas` | — | non | 4 |
| `n-pde-cfl` | N | `numerique` | 16 | Transport et ondes : schémas explicites, condition CFL | `n-heat-implicit` | `MT` | non | 2 |
| `n-fem-hat` | N | `numerique` | 16 | Forme faible et fonctions chapeau | `n-bvp-fd`, `a1-int-parts` | `MT` | non | 2 |
| `n-opt-kkt` | N | `numerique` | 16 | Optimisation sous contraintes : conditions KKT | `a2-lagrange`, `m-quad-gradient` | `MT` | non | 3 |

## 3. Racines et branches

### 3.1 Racines

Une racine n'a aucun prérequis universitaire : elle ne demande que des compétences du plan d'algèbre ou de l'école, ou rien. Il y en a 21.

| Module | Racines |
|---|---|
| G9 | `g9-sets`, `g9-connectives` |
| G0 | `g0-identify`, `g0-horner`, `g0-long-div` |
| G2 | `g2-real-powers` |
| G3 | `g3-radians`, `g3-identities` |
| G5 | `g5-sigma`, `g5-geom` |
| G4 | `g4-vectors` |
| G10 | `g10-ellipse`, `g10-hyperbola`, `g10-parabola` |
| G7 | `g7-mult-principle` |
| G8 | `g8-algebraic` |
| L | `l-sys-augmented`, `l-mat-product`, `l-det-cofactor` |
| P | `p-desc-summary` |
| N | `n-err-abs-rel` |

### 3.2 Branches qui s'ouvrent après G9, G0 et G1

Une compétence d'entrée d'un module est une compétence dont tous les prérequis, directs et indirects, sont dans G9, G0 ou G1 (ou qui n'en a pas). Dès que l'élève a une étoile sur ces prérequis, la branche est ouverte.

| Module | Compétences d'entrée |
|---|---|
| G2 | `g2-real-powers` |
| G3 | `g3-radians`, `g3-identities` |
| G5 | `g5-sigma`, `g5-geom`, `g5-induction-frame` |
| G4 | `g4-vectors` |
| G10 | `g10-ellipse`, `g10-hyperbola`, `g10-parabola` |
| G6 | `g6-limits` |
| G7 | `g7-mult-principle` |
| G8 | `g8-algebraic` |
| A1 | `a1-seq-eps-n-def`, `a1-fn-epsdelta-def` |
| L | `l-sys-augmented`, `l-mat-product`, `l-det-cofactor` |
| P | `p-desc-summary`, `p-events` |
| N | `n-err-abs-rel` |

Modules sans compétence d'entrée de ce type (ils demandent d'abord un autre module) : A2, V, C, F, M.

### 3.3 Dépendances entre modules

Nombre de liens de prérequis directs d'un module vers un autre. Les dépendances entre modules peuvent former des boucles (G0 → G8 → G10 → L → G0, par exemple) : le graphe des compétences, lui, n'a pas de cycle.

| Module | Dépend directement de |
|---|---|
| G9 | — |
| G0 | G8 (1) |
| G1 | G9 (6), G3 (1) |
| G2 | G1 (4) |
| G3 | G9 (1), G1 (1) |
| G5 | G9 (1), G0 (1), G1 (1), G2 (1) |
| G4 | G1 (1), G3 (1) |
| G10 | G1 (2), G4 (2), L (2) |
| G6 | G0 (2), G1 (6), G2 (1), G3 (1), G4 (1) |
| G7 | G5 (1) |
| G8 | G0 (1), G3 (1), G4 (1), G10 (1) |
| A1 | G9 (5), G0 (4), G1 (7), G2 (5), G3 (5), G5 (6), G6 (5), G8 (4) |
| L | G9 (2), G0 (1), G3 (1), G5 (1), G4 (2), G8 (2) |
| A2 | G9 (2), G1 (1), G2 (1), G3 (3), G4 (4), G10 (2), G6 (2), G8 (1), A1 (17), L (7) |
| V | G9 (1), G4 (2), A1 (3), A2 (9) |
| C | G0 (1), G2 (1), G8 (3), A1 (3), A2 (1), V (1) |
| P | G9 (1), G2 (1), G6 (1), G7 (3), A1 (4), L (2), A2 (4) |
| F | G0 (1), G1 (1), G5 (1), G8 (3), A1 (7), A2 (3), C (3) |
| N | G9 (1), G0 (2), G2 (1), G5 (2), G6 (1), A1 (13), L (7), A2 (4), M (7) |
| M | G8 (1), A1 (1), L (14), A2 (3), P (1) |

## 4. Plus longue chaîne de prérequis

19 compétences, donc 18 liens :

`g9-sets` → `g9-quant-read` → `g9-negate` → `g9-counterexample` → `g1-parity-period` → `g2-hyp-def` → `a1-deriv-rules` → `a1-int-direct` → `a1-int-subst` → `a1-improper-calc` → `p-cont-density` → `p-moments` → `p-lin-combo` → `p-clt-sum` → `p-clt-binom` → `p-test-z` → `p-test-t1` → `p-reg-test` → `p-reg-multi`

## 5. Références `@alg:` restantes

Elles pointent vers le plan d'algèbre ([plan-calcul-algebre.md](../plan-calcul-algebre.md)), pas encore construit. L'étape qui implémente un catalogue les remplace par les ids réels de `skills.js` (README §8.2). La lettre est le module du plan d'algèbre. « Prérequis » : la marque est un prérequis de la compétence ; « crédit » : elle n'apparaît que dans un sous-but, un corrigé ou un texte.

### Module A

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:A-arrondir` | `n-err-abs-rel`, `p-ci-round`, `p-desc-summary` | en-tête N-analyse-numerique.md, en-tête P-probabilites.md |

### Module C

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:C-developper` | `a1-dl-ops`, `g0-horner`, `g0-identify`, `g0-long-div`, `g3-identities` | en-tête A1-analyse-1.md, en-tête G-gymnase-1.md |
| `@alg:C-identites` | `g7-binomial`, `g8-algebraic` | en-tête G-gymnase-1.md, en-tête G-gymnase-2.md, en-tête VCF-analyse-3-4.md, `g9-proof-contra` |
| `@alg:C-reduire` | `g5-sigma` | en-tête G-gymnase-1.md, en-tête VCF-analyse-3-4.md |

### Module D

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:D-factoriser-completement` | `g0-factor-real`, `g1-sign-table` | en-tête G-gymnase-1.md, en-tête G-gymnase-2.md, `g1-bound`, `g1-param`, `g5-induction-sum`, `g6-sign-variation` |
| `@alg:D-trinome` | `a2-crit-points`, `l-sys-param` | `a2-domain-describe`, en-tête A2-analyse-2.md, en-tête G-gymnase-1.md, en-tête L-M-algebre-lineaire.md, `g0-factor-complex`, `g0-factor-thm`, `g0-pfd-simple`, `g1-irr-eq`, `g3-eq` |

### Module E

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:E-inconnue-deux-cotes` | — | en-tête G-gymnase-1.md, `g9-sets` |
| `@alg:E-produit-en-croix` | — | en-tête G-gymnase-1.md, `g1-injective` |
| `@alg:E-produit-nul` | `g3-eq` | en-tête G-gymnase-1.md, `g2-xx` |
| `@alg:E-systemes` | `a1-piecewise-ab`, `g0-identify` | en-tête A1-analyse-1.md, en-tête G-gymnase-1.md, en-tête VCF-analyse-3-4.md |
| `@alg:E-systemes-2x2` | `a2-crit-points`, `g10-conic-reduce`, `g4-line2`, `g4-vectors`, `g6-common-tangent`, `g8-sqrt-alg`, `l-sys-augmented` | `a2-chain-polar`, `a2-lagrange`, `a2-ode-const2`, en-tête A2-analyse-2.md, en-tête G-gymnase-2.md, en-tête L-M-algebre-lineaire.md, `g4-common-perp`, `g4-plane`, `g4-relative-pos` |
| `@alg:E-une-etape` | — | en-tête VCF-analyse-3-4.md, `f-parseval` |

### Module F

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:F-isoler` | `g1-inverse` | en-tête G-gymnase-1.md, en-tête P-probabilites.md, `p-mle`, `p-normal-inverse` |
| `@alg:F-variable-deux-fois` | `f-ft-eq` | en-tête VCF-analyse-3-4.md, `f-lap-ode` |

### Module G

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:G-additionner` | `f-ft-eq`, `g0-pfd-simple`, `g1-rational-ineq` | en-tête G-gymnase-1.md, en-tête VCF-analyse-3-4.md |
| `@alg:G-equations` | — | en-tête G-gymnase-1.md, `g3-bioche` |
| `@alg:G-simplifier` | `a1-fn-extension`, `a1-seq-limits`, `a2-lim-paths`, `g6-limits` | `a1-seq-ratio`, `a2-curve-length`, `a2-dir-deriv-def`, `a2-implicit-2var`, `a2-implicit-3var`, `a2-laplacian-radial`, `a2-lim-polar`, `a2-param-int-bounds`, en-tête A1-analyse-1.md, en-tête A2-analyse-2.md, en-tête G-gymnase-2.md, en-tête VCF-analyse-3-4.md, `g6-deriv-rules` |
| `@alg:G-valeurs-interdites` | `g1-domain` | en-tête G-gymnase-1.md |

### Module H

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:H-completer-carre` | `g10-circle-eq`, `g10-ellipse`, `g10-hyperbola`, `g10-parabola`, `g4-sphere` | en-tête G-gymnase-2.md, `f-ft-table` |
| `@alg:H-discriminant` | `a2-ode-const2`, `g0-factor-real`, `g1-abs-eq`, `g1-irr-eq`, `g1-trinome-sign`, `g10-circle-tangent`, `g2-exp-eq`, `g6-area`, `g8-quadratic`, `l-eig-charpoly` | `a1-extrema-global`, `a1-seq-rec-fixed`, `a1-ser-param`, en-tête A1-analyse-1.md, en-tête A2-analyse-2.md, en-tête G-gymnase-1.md, en-tête G-gymnase-2.md, en-tête L-M-algebre-lineaire.md, `g1-inverse`, `g1-surjective`, `g10-pole-polar`, `g6-optim` |

### Module I

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:I-equation-parametre` | `l-sys-param` | en-tête L-M-algebre-lineaire.md |
| `@alg:I-param-1er-degre` | `g1-param` | en-tête G-gymnase-1.md |
| `@alg:I-param-2e-degre` | `g1-viete` | en-tête G-gymnase-1.md |
| `@alg:I-parametres` | `a2-ode-stability` | en-tête A2-analyse-2.md |
| `@alg:I-second-degre-parametres` | `g10-conic-family` | en-tête G-gymnase-2.md |

### Module J

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:J-hausse-baisse` | `l-eig-markov` | en-tête L-M-algebre-lineaire.md |
| `@alg:J-pourcentage` | `p-bayes-freq` | en-tête P-probabilites.md |
| `@alg:J-quel-pourcentage` | `n-err-abs-rel` | en-tête N-analyse-numerique.md |

### Module L

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:L-affine` | `g4-line2` | en-tête G-gymnase-2.md |
| `@alg:L-fonction-affine` | `n-quad-order` | en-tête N-analyse-numerique.md |

### Module M

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:M-pythagore` | `g4-dot` | en-tête G-gymnase-2.md |

### Module N

| Id attendu | Prérequis de | Crédit ou texte dans |
|---|---|---|
| `@alg:N-ensembles` | `g9-sets` | en-tête G-gymnase-1.md |
