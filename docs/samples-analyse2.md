# Exemples de questions — Analyse II

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Ouvert, fermé, borné, compact (`a2-rn-topology`, BA2)

_Inégalités larges ou strictes, coordonnée libre : ouvert, fermé, borné, compact._

### Niveau 1

```
E = {(x, y, z) ∈ ℝ³ : 2x + 3y + 2z > 1}. 2x + 3y + 2z > 1 : stricte ; elle ne borne rien L'ensemble E est :
  · ouvert, borné   · ni ouvert ni fermé, borné   · fermé, borné : compact   ✔ ouvert, non borné

E = {(x, y, z) ∈ ℝ³ : x² + 4y² < 16}. x² + 4y² < 16 : stricte ; elle borne x et y L'ensemble E est :
  · ouvert, borné [a2_topo_cylinder]   · fermé, borné : compact   · ni ouvert ni fermé, non borné   ✔ ouvert, non borné
  pièges : a2_topo_cylinder

E = {(x, y, z) ∈ ℝ³ : x² + y² < 9, z > 0}. x² + y² < 9 : stricte ; elle borne x et y z > 0 : stricte ; elle borne z par en bas L'ensemble E est :
  · fermé, borné : compact   · ni ouvert ni fermé, borné   ✔ ouvert, non borné   · ni ouvert ni fermé, non borné

```

### Niveau 2

```
E₁ = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) ≤ 1, x + y + z ≤ −2}. E₂ = {(x, y, z) ∈ ℝ³ : x² + y² ≥ 4, x² + y² < 5, z ≤ −1}. Remplis le tableau : V (vrai) ou F (faux).
  [tableau truth]  colonnes : ouvert | fermé | borné | compact
    E₁       (F)  (V)  (F)  (F)
    E₂       (F)  (F)  (F)  (F)
  puis : Pourquoi E₂ n'est-il pas fermé ?
      · Il n'est pas ouvert. [a2_topo_not_open_closed]   ✔ Le point (1 ; 2 ; −1) est sur le bord de E₂, mais pas dans E₂.   · Le point (0 ; 2 ; −1) est sur le bord et dans E₂.   · Il n'est pas borné.
      pièges : a2_topo_not_open_closed
  pièges : a2_topo_not_open_closed

E₁ = {(x, y, z) ∈ ℝ³ : z − x² − y² ≤ −1}. E₂ = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) ≤ 3, z < −1}. Remplis le tableau : V (vrai) ou F (faux).
  [tableau truth]  colonnes : ouvert | fermé | borné | compact
    E₁       (F)  (V)  (F)  (F)
    E₂       (F)  (F)  (F)  (F)
  puis : Pourquoi E₂ n'est-il pas fermé ?
      · Le point (0 ; 3 ; −2) est sur le bord et dans E₂.   · Il n'est pas ouvert. [a2_topo_not_open_closed]   ✔ Le point (0 ; 0 ; −1) est sur le bord de E₂, mais pas dans E₂.   · Il n'est pas borné.
      pièges : a2_topo_not_open_closed
  pièges : a2_topo_not_open_closed

E₁ = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) < 3}. E₂ = {(x, y, z) ∈ ℝ³ : x² + y² ≤ 4}. Remplis le tableau : V (vrai) ou F (faux).
  [tableau truth]  colonnes : ouvert | fermé | borné | compact
    E₁       (V)  (F)  (F)  (F)
    E₂       (F)  (V)  (F)  (F)
  puis : Pourquoi E₁ n'est-il pas fermé ?
      · Il n'est pas borné.   · Il est ouvert. [a2_topo_not_open_closed]   ✔ Le point (0 ; 3 ; 0) est sur le bord de E₁, mais pas dans E₁.   · Le point (0 ; 0 ; 0) n'est pas sur le bord.
      pièges : a2_topo_not_open_closed
  pièges : a2_topo_not_open_closed

```

### Niveau 3

```
E = {(x, y, z) ∈ ℝ³ : x² + y² + z² > 2}. Pour chaque inégalité : est-elle large, stricte, toujours vraie ? (V ou F)
  [tableau truth]  colonnes : large | stricte | toujours vraie
    x² + y² + z² > 2 (F)  (V)  (F)
  puis : E = {(x, y, z) ∈ ℝ³ : x² + y² + z² > 2}. L'ensemble E est :
      · ouvert, borné   · ni ouvert ni fermé, non borné   · fermé, non borné   ✔ ouvert, non borné

E = {(x, y, z) ∈ ℝ³ : x² + y² + z² < 4}. Pour chaque inégalité : est-elle large, stricte, toujours vraie ? (V ou F)
  [tableau truth]  colonnes : large | stricte | toujours vraie
    x² + y² + z² < 4 (F)  (V)  (F)
  puis : E = {(x, y, z) ∈ ℝ³ : x² + y² + z² < 4}. L'ensemble E est :
      · fermé, non borné   ✔ ouvert, borné   · ni ouvert ni fermé, borné   · ni ouvert ni fermé, non borné

E = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) < 1, x² + y² ≥ −3}. Pour chaque inégalité : est-elle large, stricte, toujours vraie ? (V ou F)
  [tableau truth]  colonnes : large | stricte | toujours vraie
    max(|x| ; |y|) < 1 (F)  (V)  (F)
    x² + y² ≥ −3 (V)  (F)  (V)
  puis : E = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) < 1, x² + y² ≥ −3}. L'ensemble E est :
      · ni ouvert ni fermé, non borné [a2_topo_trivial_atom]   ✔ ouvert, non borné   · ouvert, borné [a2_topo_cylinder]   · fermé, non borné
      pièges : a2_topo_trivial_atom, a2_topo_cylinder
  pièges : a2_topo_trivial_atom, a2_topo_cylinder

```

### Niveau 4

```
Vrai ou faux ?
  « A = {(x, y) ∈ ℝ² : max(|x|,|y|) < 2} et B = {(x, y) ∈ ℝ² : x² + 4y² > 4, x² + 4y² < 16}, E = A ∩ B. L'ensemble E est fermé. » → FAUX
    contre-exemple (a2) : p = (0 ; 1)
  aides : E n'est pas fermé s'il lui manque un point de son bord. | Regarde le point (0 ; 1). | E est ouvert, borné.

Vrai ou faux ?
  « E = {(x, y, z) ∈ ℝ³ : x² + y² ≥ 2, x² + y² ≤ 9}. L'ensemble E est fermé. » → VRAI
  aides : E n'est pas fermé s'il lui manque un point de son bord. | Classe chaque inégalité : large ou stricte. | E est fermé, non borné.

Vrai ou faux ?
  « A = {(x, y, z) ∈ ℝ³ : x² + 4y² ≤ 16, z ≤ −1} et B = {(x, y, z) ∈ ℝ³ : |x| + |y| ≤ 2, z − x² − y² ≥ −1}, E = A ∪ B. L'ensemble E est fermé. » → VRAI
  aides : E n'est pas fermé s'il lui manque un point de son bord. | Classe chaque inégalité : large ou stricte. | E est fermé, non borné.

```

### Niveau 5

```
Pour chacun des quatre ensembles, choisis ce qu'il est.
  [problème, 4 points]
  partie 1 (Ensemble 1 : 1)
  E = {(x, y) ∈ ℝ² : x² + y² ≥ 1, x² + y² < 2}. L'ensemble E est :
    · ouvert, non borné   · fermé, borné : compact [a2_topo_not_open_closed]   · fermé, non borné   ✔ ni ouvert ni fermé, borné
  partie 2 (Ensemble 2 : 1)
  E = {(x, y, z) ∈ ℝ³ : xy > −1, 0 < z ≤ 3}. L'ensemble E est :
    ✔ ni ouvert ni fermé, non borné   · fermé, borné : compact   · ouvert, borné   · fermé, non borné [a2_topo_not_open_closed]
  partie 3 (Ensemble 3 : 1)
  E = {(x, y) ∈ ℝ² : max(|x|,|y|) < 1, x ≠ 0}. L'ensemble E est :
    · ni ouvert ni fermé, non borné   ✔ ouvert, borné   · ouvert, non borné   · fermé, non borné
  partie 4 (Ensemble 4 : 1)
  E = {(x, y, z) ∈ ℝ³ : x² + y² + z² > −2, max(|x|,|y|) ≤ 3, z > 0}. L'ensemble E est :
    · fermé, non borné [a2_topo_not_open_closed]   · ni ouvert ni fermé, borné   · fermé, borné : compact   ✔ ni ouvert ni fermé, non borné
  pièges : a2_topo_not_open_closed

Pour chacun des quatre ensembles, choisis ce qu'il est.
  [problème, 4 points]
  partie 1 (Ensemble 1 : 1)
  E = {(x, y) ∈ ℝ² : x² + 4y² ≤ 16}. L'ensemble E est :
    · ni ouvert ni fermé, non borné   · fermé, non borné   · ni ouvert ni fermé, borné   ✔ fermé, borné : compact
  partie 2 (Ensemble 2 : 1)
  E = {(x, y, z) ∈ ℝ³ : max(|x|,|y|) < 3, −1 ≤ z < 0}. L'ensemble E est :
    ✔ ni ouvert ni fermé, borné   · ouvert, non borné   · fermé, borné : compact [a2_topo_not_open_closed]   · ni ouvert ni fermé, non borné
  partie 3 (Ensemble 3 : 1)
  E = {(x, y) ∈ ℝ² : max(|x|,|y|) ≥ 1}. L'ensemble E est :
    · fermé, borné : compact   · ni ouvert ni fermé, non borné   ✔ fermé, non borné   · ni ouvert ni fermé, borné
  partie 4 (Ensemble 4 : 1)
  E = {(x, y, z) ∈ ℝ³ : x² − y² > 4}. L'ensemble E est :
    · fermé, borné : compact   ✔ ouvert, non borné   · fermé, non borné   · ni ouvert ni fermé, non borné
  pièges : a2_topo_not_open_closed

Pour chacun des quatre ensembles, choisis ce qu'il est.
  [problème, 4 points]
  partie 1 (Ensemble 1 : 1)
  E = {(x, y) ∈ ℝ² : x² + y² ≤ 5, x ≠ 0}. L'ensemble E est :
    · fermé, borné : compact [a2_topo_not_open_closed]   · ouvert, non borné   · ouvert, borné   ✔ ni ouvert ni fermé, borné
  partie 2 (Ensemble 2 : 1)
  E = {(x, y, z) ∈ ℝ³ : xy > 1, z > 1}. L'ensemble E est :
    · ni ouvert ni fermé, non borné   ✔ ouvert, non borné   · fermé, non borné   · ni ouvert ni fermé, borné
  partie 3 (Ensemble 3 : 1)
  E = {(x, y) ∈ ℝ² : xy < −1, x² + y² + 1 ≥ 0}. L'ensemble E est :
    · fermé, borné : compact   · ouvert, borné   · ni ouvert ni fermé, non borné [a2_topo_trivial_atom]   ✔ ouvert, non borné
  partie 4 (Ensemble 4 : 1)
  E = {(x, y, z) ∈ ℝ³ : xy ≥ 1, −1 ≤ z ≤ 1, x² + y² > −2}. L'ensemble E est :
    ✔ fermé, non borné   · ni ouvert ni fermé, non borné [a2_topo_trivial_atom]   · ouvert, non borné   · ni ouvert ni fermé, borné
  pièges : a2_topo_not_open_closed, a2_topo_trivial_atom

```

### Variantes d'examen

```
E = {(x, y, z) ∈ ℝ³ : x² + 4y² < 4, 0 ≤ z < 3}. L'ensemble E est :
  · fermé, borné : compact [a2_topo_not_open_closed]   · ouvert, non borné   ✔ ni ouvert ni fermé, borné   · ni ouvert ni fermé, non borné
  [examen mcq]
  pièges : a2_topo_not_open_closed

Vrai ou faux ?
  « E = {(x, y, z) ∈ ℝ³ : x² + y² ≥ 1, x² + y² ≤ 4}. L'ensemble E est fermé. » → VRAI
  [examen tf]

```

## Intérieur, adhérence, bord (`a2-rn-boundary`, BA2)

_Le bord : chaque boule touche E et son complémentaire. Point isolé, réunion, inclusion._

### Niveau 1

```
E = {1 ≤ x² + y² ≤ 9} ∪ {(0 ; −5)} ⊂ ℝ². Chaque morceau est-il dans le bord ∂E ? (V ou F)
  [tableau truth]  colonnes : dans ∂E
    le cercle x² + y² = 2 (F)
    l'anneau ouvert 1 < x² + y² < 9 (F)
    le cercle x² + y² = 9 (V)
    le cercle x² + y² = 1 (V)
    le point (0 ; −5) (V)
  pièges : a2_bd_isolated

E = {1 ≤ x² + y² < 9} ∪ {(0 ; 0)} ⊂ ℝ². Chaque morceau est-il dans le bord ∂E ? (V ou F)
  [tableau truth]  colonnes : dans ∂E
    l'anneau ouvert 1 < x² + y² < 9 (F)
    le cercle x² + y² = 9 (V)
    le cercle x² + y² = 2 (F)
    le point (0 ; 0) (V)
    le cercle x² + y² = 1 (V)
  pièges : a2_bd_isolated

E = {1 ≤ x² + y² ≤ 9} ∪ {(0 ; 0)} ∪ {x² + y² = 25} ⊂ ℝ². Chaque morceau est-il dans le bord ∂E ? (V ou F)
  [tableau truth]  colonnes : dans ∂E
    le point (0 ; 0) (V)
    le cercle x² + y² = 25 (V)
    le cercle x² + y² = 9 (V)
    le cercle x² + y² = 2 (F)
    le cercle x² + y² = 1 (V)
    l'anneau ouvert 1 < x² + y² < 9 (F)
  pièges : a2_bd_isolated

```

### Niveau 2

```
E = {1 < x² + y² < 9} ∪ {x² + y² = 25} ⊂ ℝ². Que vaut le bord ∂E ?
  · le cercle x² + y² = 1 ∪ le cercle x² + y² = 9 ∪ le cercle x² + y² = 25 ∪ l'anneau ouvert 1 < x² + y² < 9   · le cercle x² + y² = 1 ∪ le cercle x² + y² = 25   ✔ le cercle x² + y² = 1 ∪ le cercle x² + y² = 9 ∪ le cercle x² + y² = 25   · le cercle x² + y² = 25

E = {1 ≤ x² + y² ≤ 4} ∪ {x² + y² = 16} ⊂ ℝ². Que vaut le bord ∂E ?
  ✔ le cercle x² + y² = 1 ∪ le cercle x² + y² = 4 ∪ le cercle x² + y² = 16   · le cercle x² + y² = 4 ∪ le cercle x² + y² = 16   · le cercle x² + y² = 1 ∪ le cercle x² + y² = 4 ∪ le cercle x² + y² = 16 ∪ l'anneau ouvert 1 < x² + y² < 4   · le cercle x² + y² = 1 ∪ le cercle x² + y² = 16

E = {1 < x² + y² < 9} ∪ {(0 ; −4)} ⊂ ℝ². Que vaut le bord ∂E ?
  · le point (0 ; −4)   ✔ le cercle x² + y² = 1 ∪ le cercle x² + y² = 9 ∪ le point (0 ; −4)   · le cercle x² + y² = 1 ∪ le cercle x² + y² = 9 ∪ le point (0 ; −4) ∪ l'anneau ouvert 1 < x² + y² < 9   · le cercle x² + y² = 1 ∪ le cercle x² + y² = 9 [a2_bd_isolated]
  pièges : a2_bd_isolated

```

### Niveau 3

```
E = {1 ≤ x² + y² ≤ 16} ∪ {(0 ; −6)} ⊂ ℝ². Pour chaque point, une seule case est V : intérieur, sur le bord et dans E, sur le bord et hors de E, ou extérieur.
  [tableau truth]  colonnes : intérieur | bord, dans E | bord, hors de E | extérieur
    (−3 ; 0) (V)  (F)  (F)  (F)
    (0 ; 5)  (F)  (F)  (F)  (V)
    (1 ; 0)  (F)  (V)  (F)  (F)
    (0 ; −6) (F)  (V)  (F)  (F)
  pièges : a2_bd_isolated

E = {1 ≤ x² + y² ≤ 16} ∪ {(0 ; 5)} ⊂ ℝ². Pour chaque point, une seule case est V : intérieur, sur le bord et dans E, sur le bord et hors de E, ou extérieur.
  [tableau truth]  colonnes : intérieur | bord, dans E | bord, hors de E | extérieur
    (0 ; 1)  (F)  (V)  (F)  (F)
    (0 ; 5)  (F)  (V)  (F)  (F)
    (2 ; 2)  (V)  (F)  (F)  (F)
    (5 ; 0)  (F)  (F)  (F)  (V)
  pièges : a2_bd_isolated

E = {4 < x² + y² < 16} ⊂ ℝ². Pour chaque point, une seule case est V : intérieur, sur le bord et dans E, sur le bord et hors de E, ou extérieur.
  [tableau truth]  colonnes : intérieur | bord, dans E | bord, hors de E | extérieur
    (0 ; −2) (F)  (F)  (V)  (F)
    (1 ; 2)  (V)  (F)  (F)  (F)
    (−4 ; 0) (F)  (F)  (V)  (F)
    (0 ; 3/2) (F)  (F)  (F)  (V)

```

### Niveau 4

```
E = {1 ≤ x² + y² ≤ 9} ∪ {(0 ; 4)} ⊂ ℝ². Chaque morceau est-il contenu dans ∂E, dans int E, dans adh E ? (V ou F)
  [tableau truth]  colonnes : dans ∂E | dans int E | dans adh E
    le cercle x² + y² = 9 (V)  (F)  (V)
    le cercle x² + y² = 2 (F)  (V)  (V)
    le cercle x² + y² = 1 (V)  (F)  (V)
    le cercle x² + y² = 25 (F)  (F)  (F)
    le point (0 ; 4) (V)  (F)  (V)
  pièges : a2_bd_isolated

E = {x² + y² < 1} ∪ {x² + y² = 9} ⊂ ℝ². Chaque morceau est-il contenu dans ∂E, dans int E, dans adh E ? (V ou F)
  [tableau truth]  colonnes : dans ∂E | dans int E | dans adh E
    le cercle x² + y² = 16 (F)  (F)  (F)
    le cercle x² + y² = 1 (V)  (F)  (V)
    le cercle x² + y² = 9 (V)  (F)  (V)
    le disque ouvert x² + y² < 1 (F)  (V)  (V)

Vrai ou faux ?
  « Pour toute partie E de ℝⁿ : on a adh E = E ∪ ∂E et int E = E ∖ ∂E. » → VRAI
  aides : Essaie avec des intervalles de ℝ qui se touchent, ou un intervalle ouvert. | Pense à la définition : chaque boule touche E et son complémentaire. | Vrai : ce sont les définitions du cours.

```

### Niveau 5

```
Trois énoncés sur le bord : vrai ou faux ? Donne un contre-exemple dans ℝ quand c'est faux.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Pour toute partie E de ℝⁿ : si E est ouvert, alors E ∩ ∂E = ∅. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toutes parties E, F de ℝⁿ : si E ⊂ F, alors ∂E ⊂ ∂F. » → FAUX
      contre-exemple (a2) : E = ]0 ; 1[, F = ]-1 ; 2[, p = 0
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toute partie E de ℝⁿ : on a ∂E ⊂ E. » → FAUX
      contre-exemple (a2) : E = ]0 ; 1[, p = 0

Trois énoncés sur le bord : vrai ou faux ? Donne un contre-exemple dans ℝ quand c'est faux.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toutes parties A, B de ℝⁿ : on a int(A ∪ B) = int A ∪ int B. » → FAUX
      contre-exemple (a2) : A = [0 ; 1], B = [1 ; 2], p = 1
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toutes parties A, B de ℝⁿ : on a ∂(A ∩ B) = ∂A ∩ ∂B. » → FAUX
      contre-exemple (a2) : A = [0 ; 2], B = [1 ; 3], p = 1
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Pour toute partie E de ℝⁿ : E et son complémentaire ℝⁿ ∖ E ont le même bord. » → VRAI

Trois énoncés sur le bord : vrai ou faux ? Donne un contre-exemple dans ℝ quand c'est faux.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toute partie E de ℝⁿ : on a ∂E ⊂ E. » → FAUX
      contre-exemple (a2) : E = ]0 ; 1[, p = 0
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
    « Pour toutes parties A, B de ℝⁿ : on a int(A ∪ B) = int A ∪ int B. » → FAUX
      contre-exemple (a2) : A = [0 ; 1], B = [1 ; 2], p = 1
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Pour toute partie E de ℝⁿ : si E est ouvert, alors E ∩ ∂E = ∅. » → VRAI

```

### Variantes d'examen

```
E = {x² + y² ≤ 1} ∪ {x² + y² = 9} ⊂ ℝ². Lequel de ces points est dans le bord ∂E ?
  · (0 ; 0)   · (−2 ; 0)   · (1/2 ; 0)   ✔ (0 ; −3)
  [examen mcq]

Vrai ou faux ? Si c'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.
  « Pour toutes parties E, F de ℝⁿ : si E ⊂ F, alors ∂E ⊂ ∂F. » → FAUX
    contre-exemple (a2) : E = ]0 ; 1[, F = ]-1 ; 2[, p = 0
  [examen tf]

```

## Suites et sous-suites dans ℝⁿ (`a2-rn-sequences`, BA2)

_Composante par composante : une sous-suite a_{pk+q} se simplifie avec la période._

### Niveau 1

```
an = ((−1)^n ; cos(nπ/3)). Simplifie chaque composante de la sous-suite a_(6k + 4) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(6k + 4) ou (−1)^k·a_(6k + 4) qui converge.
  [guided]  (−1)^n
    = (−1)^(□)   (trous : (−1)^(6k + 4))   ← n = 6k+4
    = 1   ← Valeur exacte
  — 2e composante de a_(6k + 4) :  [juge equiv]  départ : cos(nπ/3)
    = cos((□)π/3)   (trous : cos((6k + 4)π/3))   ← n = 6k+4
    = cos(2kπ + 4π/3)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : −1/2)   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    (a_(6k + 4) converge : chaque composante converge.)
    = (1;□)   (trous : (1 ; -1/2))   ← Chaque composante converge
  aides : Remplace n par 6k+4, puis simplifie avec la période : cos(nπ/3) est de période 6. | (−1)^(6k + 4) = 1 | a_(6k + 4) = (1 ; −1/2) ; elle converge.
  pièges : a2_seq_one_component

an = (cos(nπ/4) ; sin(nπ/2)). Simplifie chaque composante de la sous-suite a_(8k + 4) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(8k + 4) ou (−1)^k·a_(8k + 4) qui converge. Valeurs de cos(nπ/4) pour n = 0, 1, …, 7 : 1 ; √2/2 ; 0 ; −√2/2 ; −1 ; −√2/2 ; 0 ; √2/2.
  [guided]  cos(nπ/4)
    = cos((□)π/4)   (trous : cos((8k + 4)π/4))   ← n = 8k+4
    = cos(2kπ + π)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : −1)   ← Valeur exacte
  — 2e composante de a_(8k + 4) :  [juge equiv]  départ : sin(nπ/2)
    = sin((□)π/2)   (trous : sin((8k + 4)π/2))   ← n = 8k+4
    = sin(4kπ + 2π)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : 0)   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    (a_(8k + 4) converge : chaque composante converge.)
    = (-1;□)   (trous : (-1 ; 0))   ← Chaque composante converge
  aides : Remplace n par 8k+4, puis simplifie avec la période : cos(nπ/4) est de période 8, sin(nπ/2) est de période 4. | cos((8k + 4)π/4) = −1 | a_(8k + 4) = (−1 ; 0) ; elle converge.
  pièges : a2_seq_one_component

an = (sin(nπ/2) ; sin(nπ/6)). Simplifie chaque composante de la sous-suite a_(12k + 1) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(12k + 1) ou (−1)^k·a_(12k + 1) qui converge. Valeurs de sin(nπ/2) pour n = 0, 1, …, 3 : 0 ; 1 ; 0 ; −1.
  [guided]  sin(nπ/2)
    = sin((□)π/2)   (trous : sin((12k + 1)π/2))   ← n = 12k+1
    = sin(6kπ + π/2)   ← Séparer les tours (ou demi-tours) complets
    = 1   ← Valeur exacte
  — 2e composante de a_(12k + 1) :  [juge equiv]  départ : sin(nπ/6)
    = sin((□)π/6)   (trous : sin((12k + 1)π/6))   ← n = 12k+1
    = sin(2kπ + π/6)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : 1/2)   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    (a_(12k + 1) converge : chaque composante converge.)
    = (1;□)   (trous : (1 ; 1/2))   ← Chaque composante converge
  aides : Remplace n par 12k+1, puis simplifie avec la période : sin(nπ/2) est de période 4, sin(nπ/6) est de période 12. | sin((12k + 1)π/2) = 1 | a_(12k + 1) = (1 ; 1/2) ; elle converge.
  pièges : a2_seq_one_component

```

### Niveau 2

```
an = ((−1)^n ; sin(nπ/4)). Simplifie chaque composante de la sous-suite a_(8k + 2) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(8k + 2) ou (−1)^k·a_(8k + 2) qui converge.
  [guided]  (−1)^n
    = (−1)^(□)   (trous : (−1)^(8k + 2))   ← n = 8k+2
    = 1   ← Valeur exacte
  — 2e composante de a_(8k + 2) :  [juge equiv]  départ : sin(nπ/4)
    = sin((□)π/4)   (trous : sin((8k + 2)π/4))   ← n = 8k+2
    = sin(2kπ + π/2)   ← Séparer les tours (ou demi-tours) complets
    = 1   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₈ₖ₊₂ ou (−1)ᵏ·a₈ₖ₊₂ ? ✔ a₈ₖ₊₂ : chaque composante converge / · (−1)ᵏ·a₈ₖ₊₂ : une composante de a₈ₖ₊₂ alterne / · a₈ₖ₊₂ : il suffit qu'une composante converge
    = (□;1)   (trous : (1 ; 1))   ← Chaque composante converge
  aides : Remplace n par 8k+2, puis simplifie avec la période : sin(nπ/4) est de période 8. | (−1)^(8k + 2) = 1 | a_(8k + 2) = (1 ; 1) ; elle converge.
  pièges : a2_seq_one_component

an = (1/n ; sin(nπ/6)). Simplifie chaque composante de la sous-suite a_(12k + 5) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(12k + 5) ou (−1)^k·a_(12k + 5) qui converge.
  [guided]  1/n
    = 1/(□)   (trous : 1/(12k + 5))   ← n = 12k+5
  — 2e composante de a_(12k + 5) :  [juge equiv]  départ : sin(nπ/6)
    = sin((□)π/6)   (trous : sin((12k + 5)π/6))   ← n = 12k+5
    = sin(2kπ + 5π/6)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : 1/2)   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₁₂ₖ₊₅ ou (−1)ᵏ·a₁₂ₖ₊₅ ? ✔ a₁₂ₖ₊₅ : chaque composante converge / · (−1)ᵏ·a₁₂ₖ₊₅ : une composante de a₁₂ₖ₊₅ alterne / · a₁₂ₖ₊₅ : il suffit qu'une composante converge
    = (0;□)   (trous : (0 ; 1/2))   ← Chaque composante converge
  aides : Remplace n par 12k+5, puis simplifie avec la période : sin(nπ/6) est de période 12. | sin((12k + 5)π/6) = 1/2 | a_(12k + 5) = (1/(12k+5) ; 1/2) ; elle converge.
  pièges : a2_seq_one_component

an = (cos(nπ/2) ; (−1)^n). Simplifie chaque composante de la sous-suite a_(4k + 1) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(4k + 1) ou (−1)^k·a_(4k + 1) qui converge.
  [guided]  cos(nπ/2)
    = cos((□)π/2)   (trous : cos((4k + 1)π/2))   ← n = 4k+1
    = cos(2kπ + π/2)   ← Séparer les tours (ou demi-tours) complets
    = □   (trous : 0)   ← Valeur exacte
  — 2e composante de a_(4k + 1) :  [juge equiv]  départ : (−1)^n
    = (−1)^(□)   (trous : (−1)^(4k + 1))   ← n = 4k+1
    = □   (trous : −1)   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₄ₖ₊₁ ou (−1)ᵏ·a₄ₖ₊₁ ? ✔ a₄ₖ₊₁ : chaque composante converge / · (−1)ᵏ·a₄ₖ₊₁ : une composante de a₄ₖ₊₁ alterne / · a₄ₖ₊₁ : il suffit qu'une composante converge
    = (0;□)   (trous : (0 ; -1))   ← Chaque composante converge
  aides : Remplace n par 4k+1, puis simplifie avec la période : cos(nπ/2) est de période 4. | cos((4k + 1)π/2) = 0 | a_(4k + 1) = (0 ; −1) ; elle converge.
  pièges : a2_seq_one_component

```

### Niveau 3

```
an = (cos(nπ/2) ; (−1)^n). Simplifie chaque composante de la sous-suite a_(4k + 2) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(4k + 2) ou (−1)^k·a_(4k + 2) qui converge.
  [tap, suivre l'erreur, menu steps]  cos(nπ/2)
    = cos((4k + 2)π/2)   ← n = 4k+2
    = cos(2kπ + π)   ← Séparer les tours (ou demi-tours) complets
    = −1   ← Valeur exacte
  — 2e composante de a_(4k + 2) :  [juge equiv]  départ : (−1)^n
    = (−1)^(4k + 2)   ← n = 4k+2
    = 1   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₄ₖ₊₂ ou (−1)ᵏ·a₄ₖ₊₂ ? ✔ a₄ₖ₊₂ : chaque composante converge / · (−1)ᵏ·a₄ₖ₊₂ : une composante de a₄ₖ₊₂ alterne / · a₄ₖ₊₂ : il suffit qu'une composante converge
    = (-1 ; 1)   ← Chaque composante converge
  aides : Remplace n par 4k+2, puis simplifie avec la période : cos(nπ/2) est de période 4. | cos((4k + 2)π/2) = −1 | a_(4k + 2) = (−1 ; 1) ; elle converge.
  pièges : a2_seq_one_component

an = (sin(nπ/3) ; cos(nπ/6)). Simplifie chaque composante de la sous-suite a_(6k) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(6k) ou (−1)^k·a_(6k) qui converge.
  [tap, suivre l'erreur, menu steps]  sin(nπ/3)
    = sin((6k)π/3)   ← n = 6k
    = sin(2kπ)   ← Séparer les tours (ou demi-tours) complets
    = 0   ← Valeur exacte
  — 2e composante de a_(6k) :  [juge equiv]  départ : cos(nπ/6)
    = cos((6k)π/6)   ← n = 6k
    = cos(kπ)   ← Séparer les tours (ou demi-tours) complets
    = (−1)^k   ← Un demi-tour change le signe : (−1)ᵏ
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₆ₖ ou (−1)ᵏ·a₆ₖ ? · a₆ₖ : chaque composante converge / ✔ (−1)ᵏ·a₆ₖ : une composante de a₆ₖ alterne / · a₆ₖ : il suffit qu'une composante converge
    = (0 ; 1)   ← (−1)ᵏ·(−1)ᵏ = 1 : chaque composante devient constante
  aides : Remplace n par 6k, puis simplifie avec la période : sin(nπ/3) est de période 6, cos(nπ/6) est de période 12. | sin((6k)π/3) = 0 | a_(6k) = (0 ; (−1)^k) ; elle diverge, et (−1)^k·a_(6k) → (0 ; 1).
  pièges : a2_seq_one_component

an = (cos(nπ/3) ; cos(nπ/6)). Simplifie chaque composante de la sous-suite a_(6k + 3) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(6k + 3) ou (−1)^k·a_(6k + 3) qui converge.
  [tap, suivre l'erreur, menu steps]  cos(nπ/3)
    = cos((6k + 3)π/3)   ← n = 6k+3
    = cos(2kπ + π)   ← Séparer les tours (ou demi-tours) complets
    = −1   ← Valeur exacte
  — 2e composante de a_(6k + 3) :  [juge equiv]  départ : cos(nπ/6)
    = cos((6k + 3)π/6)   ← n = 6k+3
    = cos(kπ + π/2)   ← Séparer les tours (ou demi-tours) complets
    = 0   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₆ₖ₊₃ ou (−1)ᵏ·a₆ₖ₊₃ ? ✔ a₆ₖ₊₃ : chaque composante converge / · (−1)ᵏ·a₆ₖ₊₃ : une composante de a₆ₖ₊₃ alterne / · a₆ₖ₊₃ : il suffit qu'une composante converge
    = (-1 ; 0)   ← Chaque composante converge
  aides : Remplace n par 6k+3, puis simplifie avec la période : cos(nπ/3) est de période 6, cos(nπ/6) est de période 12. | cos((6k + 3)π/3) = −1 | a_(6k + 3) = (−1 ; 0) ; elle converge.
  pièges : a2_seq_one_component

```

### Niveau 4

```
an = (1/n ; (−1)^n). Simplifie chaque composante de la sous-suite a_(3k + 2) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(3k + 2) ou (−1)^k·a_(3k + 2) qui converge.
  [free, suivre l'erreur]  1/n
    = 1/(3k + 2)   ← n = 3k+2
  — 2e composante de a_(3k + 2) :  [juge equiv]  départ : (−1)^n
    = (−1)^(3k + 2)   ← n = 3k+2
    = (−1)^k   ← Un demi-tour change le signe : (−1)ᵏ
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₃ₖ₊₂ ou (−1)ᵏ·a₃ₖ₊₂ ? · a₃ₖ₊₂ : chaque composante converge / ✔ (−1)ᵏ·a₃ₖ₊₂ : une composante de a₃ₖ₊₂ alterne / · a₃ₖ₊₂ : il suffit qu'une composante converge
    = (0 ; 1)   ← (−1)ᵏ·(−1)ᵏ = 1 : chaque composante devient constante
  aides : Remplace n par 3k+2, puis simplifie avec la période : (−1)ⁿ change de signe à chaque pas. | (−1)^(3k + 2) = (−1)^k | a_(3k + 2) = (1/(3k+2) ; (−1)^k) ; elle diverge, et (−1)^k·a_(3k + 2) → (0 ; 1).
  pièges : a2_seq_one_component

an = (1/n ; sin(nπ/2)). Simplifie chaque composante de la sous-suite a_(2k + 1) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(2k + 1) ou (−1)^k·a_(2k + 1) qui converge.
  [free, suivre l'erreur]  1/n
    = 1/(2k + 1)   ← n = 2k+1
  — 2e composante de a_(2k + 1) :  [juge equiv]  départ : sin(nπ/2)
    = sin((2k + 1)π/2)   ← n = 2k+1
    = sin(kπ + π/2)   ← Séparer les tours (ou demi-tours) complets
    = (−1)^k   ← Un demi-tour change le signe : (−1)ᵏ
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₂ₖ₊₁ ou (−1)ᵏ·a₂ₖ₊₁ ? · a₂ₖ₊₁ : chaque composante converge / ✔ (−1)ᵏ·a₂ₖ₊₁ : une composante de a₂ₖ₊₁ alterne / · a₂ₖ₊₁ : il suffit qu'une composante converge
    = (0 ; 1)   ← (−1)ᵏ·(−1)ᵏ = 1 : chaque composante devient constante
  aides : Remplace n par 2k+1, puis simplifie avec la période : sin(nπ/2) est de période 4. | sin((2k + 1)π/2) = (−1)^k | a_(2k + 1) = (1/(2k+1) ; (−1)^k) ; elle diverge, et (−1)^k·a_(2k + 1) → (0 ; 1).
  pièges : a2_seq_one_component

an = (cos(nπ/2) ; sin(nπ/4)). Simplifie chaque composante de la sous-suite a_(8k + 5) (une expression en k, sans n), puis donne la limite de celle des deux suites a_(8k + 5) ou (−1)^k·a_(8k + 5) qui converge.
  [free, suivre l'erreur]  cos(nπ/2)
    = cos((8k + 5)π/2)   ← n = 8k+5
    = cos(4kπ + 5π/2)   ← Séparer les tours (ou demi-tours) complets
    = 0   ← Valeur exacte
  — 2e composante de a_(8k + 5) :  [juge equiv]  départ : sin(nπ/4)
    = sin((8k + 5)π/4)   ← n = 8k+5
    = sin(2kπ + 5π/4)   ← Séparer les tours (ou demi-tours) complets
    = −√2/2   ← Valeur exacte
  — Limite ℓ de celle qui converge :  [juge vector]  départ : ℓ
    ? Laquelle converge : a₈ₖ₊₅ ou (−1)ᵏ·a₈ₖ₊₅ ? ✔ a₈ₖ₊₅ : chaque composante converge / · (−1)ᵏ·a₈ₖ₊₅ : une composante de a₈ₖ₊₅ alterne / · a₈ₖ₊₅ : il suffit qu'une composante converge
    = (0 ; -√2/2)   ← Chaque composante converge
  aides : Remplace n par 8k+5, puis simplifie avec la période : cos(nπ/2) est de période 4, sin(nπ/4) est de période 8. | cos((8k + 5)π/2) = 0 | a_(8k + 5) = (0 ; −√2/2) ; elle converge.
  pièges : a2_seq_one_component

```

### Niveau 5

```
an = (sin(nπ/3) ; (−1)^n). Laquelle de ces sous-suites converge ?
  · (−1)^k·a_(6k + 1)   · (−1)^k·a_(6k) [a2_seq_one_component]   ✔ a_(6k)   · (−1)^k·a_(6k + 2)
  pièges : a2_seq_one_component

an = (sin(nπ/2) ; sin(nπ/6)). Laquelle de ces sous-suites converge ?
  · (−1)^k·a_(12k + 2) [a2_seq_one_component]   ✔ a_(12k + 11)   · a_(6k + 3)   · (−1)^k·a_(12k + 11)
  pièges : a2_seq_one_component

an = (cos(nπ/4) ; sin(nπ/4)). Laquelle de ces sous-suites converge ?
  · (−1)^k·a_(8k + 1)   · (−1)^k·a_(8k + 4) [a2_seq_one_component]   ✔ a_(8k + 7)   · (−1)^k·a_(8k + 5)
  pièges : a2_seq_one_component

```

### Variantes d'examen

```
an = (cos(nπ/6) ; cos(nπ/2)). Laquelle de ces sous-suites converge ?
  ✔ (−1)^k·a_(6k + 2)   · a_(6k + 5) [a2_seq_one_component]   · (−1)^k·a_(12k + 4)   · (−1)^k·a_(12k + 6)
  [examen mcq]
  pièges : a2_seq_one_component

Vrai ou faux ?
  « Une suite de ℝ² converge si et seulement si chacune de ses composantes converge. » → VRAI
  [examen tf]

```

## Courbes paramétrées dans ℝ³ : continuité, tangente, courbe lisse (`a2-curve-param`, BA2)

_Dériver composante par composante ; tangente γ(t₀) + s·γ′(t₀) ; sign(t)·g(t) continue si g(0) = 0._

### Niveau 1

```
γ(t) = (cos(t) ; 2t ; t). Calcule γ′(t), composante par composante, puis γ′(π).
  [guided]  (cos(t))′
    = −□   (trous : −sin(t))   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : (2t)′
    = 2   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : t′
    = 1   ← Dérivée usuelle
  — Le vecteur γ′(π) :  [juge vector]  départ : γ′(π)
    = (□;2;1)   (trous : (0 ; 2 ; 1))   ← t = π dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (−sin(t) ; 2 ; 1) | γ′(π) = (0 ; 2 ; 1)
  pièges : g6_cos_sign

γ(t) = (t² ; t ; 3sin(t)). Calcule γ′(t), composante par composante, puis γ′(π/2).
  [guided]  (t²)′
    = 2t   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : t′
    = 1   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (3sin(t))′
    = 3□   (trous : 3cos(t))   ← Dérivée usuelle
  — Le vecteur γ′(π/2) :  [juge vector]  départ : γ′(π/2)
    = (□;1;0)   (trous : (π ; 1 ; 0))   ← t = π/2 dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (2t ; 1 ; 3cos(t)) | γ′(π/2) = (π ; 1 ; 0)

γ(t) = (t·cos(t) ; t·sin(t) ; 3cos(t)). Calcule γ′(t), composante par composante, puis γ′(π).
  [guided]  (t·cos(t))′
    = t′·cos(t) + t·(cos(t))′   ← Règle du produit
    = □ − t·sin(t)   (trous : cos(t) − t·sin(t))   ← Simplifier
  — γ′ : composante 2  [juge equiv]  départ : (t·sin(t))′
    = t′·sin(t) + t·(sin(t))′   ← Règle du produit
    = □ + t·cos(t)   (trous : sin(t) + t·cos(t))   ← Simplifier
  — γ′ : composante 3  [juge equiv]  départ : (3cos(t))′
    = −3□   (trous : −3sin(t))   ← Dérivée usuelle
  — Le vecteur γ′(π) :  [juge vector]  départ : γ′(π)
    = (□;-π;0)   (trous : (-1 ; -π ; 0))   ← t = π dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (cos(t) − t·sin(t) ; sin(t) + t·cos(t) ; −3sin(t)) | γ′(π) = (−1 ; −π ; 0)
  pièges : g6_product_naive

```

### Niveau 2

```
γ(t) = (t² ; t·sin(t) ; 2cos(2t)). Calcule γ′(t), composante par composante, le point γ(π/2) et γ′(π/2).
  [guided]  (t²)′
    = 2t   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : (t·sin(t))′
    = t′·sin(t) + t·(sin(t))′   ← Règle du produit
    = sin(t) + t·cos(t)   ← Simplifier
  — γ′ : composante 3  [juge equiv]  départ : (2cos(2t))′
    = (2)·(−sin(2t))·(2t)′   ← Règle de chaîne
    = −4sin(2t)   ← Simplifier
  — Le point γ(π/2) :  [juge vector]  départ : γ(π/2)
    = (□;π/2;-2)   (trous : (π^2/4 ; π/2 ; -2))   ← t = π/2
  — Le vecteur γ′(π/2) :  [juge vector]  départ : γ′(π/2)
    = (π;□;0)   (trous : (π ; 1 ; 0))   ← t = π/2 dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (2t ; sin(t) + t·cos(t) ; −4sin(2t)) | γ′(π/2) = (π ; 1 ; 0)

γ(t) = (t² ; −2t ; t³). Calcule γ′(t), composante par composante, le point γ(1) et γ′(1).
  [guided]  (t²)′
    = 2t   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : (−2t)′
    = −2   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (t³)′
    = 3t²   ← Dérivée usuelle
  — Le point γ(1) :  [juge vector]  départ : γ(1)
    = (□;-2;1)   (trous : (1 ; -2 ; 1))   ← t = 1
  — Le vecteur γ′(1) :  [juge vector]  départ : γ′(1)
    = (2;□;3)   (trous : (2 ; -2 ; 3))   ← t = 1 dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (2t ; −2 ; 3t²) | γ′(1) = (2 ; −2 ; 3)

γ(t) = (cos(t) ; t·cos(t) ; sin(t)). Calcule γ′(t), composante par composante, le point γ(π) et γ′(π).
  [guided]  (cos(t))′
    = −sin(t)   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : (t·cos(t))′
    = t′·cos(t) + t·(cos(t))′   ← Règle du produit
    = cos(t) − t·sin(t)   ← Simplifier
  — γ′ : composante 3  [juge equiv]  départ : (sin(t))′
    = cos(t)   ← Dérivée usuelle
  — Le point γ(π) :  [juge vector]  départ : γ(π)
    = (□;-π;0)   (trous : (-1 ; -π ; 0))   ← t = π
  — Le vecteur γ′(π) :  [juge vector]  départ : γ′(π)
    = (0;□;-1)   (trous : (0 ; -1 ; -1))   ← t = π dans γ′
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (−sin(t) ; cos(t) − t·sin(t) ; cos(t)) | γ′(π) = (0 ; −1 ; −1)
  pièges : g6_cos_sign

```

### Niveau 3

```
γ(t) = (−sin(t) ; t ; 3cos(t)). Calcule γ′(t), composante par composante, γ(π/2), γ′(π/2) et la tangente T(s) = γ(π/2) + s·γ′(π/2).
  [tap, suivre l'erreur, menu steps]  (−sin(t))′
    = −cos(t)   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : t′
    = 1   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (3cos(t))′
    = −3sin(t)   ← Dérivée usuelle
  — Le point γ(π/2) :  [juge vector]  départ : γ(π/2)
    = (-1 ; π/2 ; 0)   ← t = π/2
  — Le vecteur γ′(π/2) :  [juge vector]  départ : γ′(π/2)
    = (0 ; 1 ; -3)   ← t = π/2 dans γ′
  — La tangente en t = π/2 :  [juge vector]  départ : T(s)
    = (-1 ; π/2 ; 0) + s(0 ; 1 ; -3)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (−cos(t) ; 1 ; −3sin(t)) | T(s) = (−1 ; π/2 ; 0) + s·(0 ; 1 ; −3)
  pièges : g6_cos_sign

γ(t) = (t·sin(t) ; e^t ; t·cos(t)). Calcule γ′(t), composante par composante, γ(0), γ′(0) et la tangente T(s) = γ(0) + s·γ′(0).
  [tap, suivre l'erreur, menu steps]  (t·sin(t))′
    = t′·sin(t) + t·(sin(t))′   ← Règle du produit
    = sin(t) + t·cos(t)   ← Simplifier
  — γ′ : composante 2  [juge equiv]  départ : (e^t)′
    = e^t   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (t·cos(t))′
    = t′·cos(t) + t·(cos(t))′   ← Règle du produit
    = cos(t) − t·sin(t)   ← Simplifier
  — Le point γ(0) :  [juge vector]  départ : γ(0)
    = (0 ; 1 ; 0)   ← t = 0
  — Le vecteur γ′(0) :  [juge vector]  départ : γ′(0)
    = (0 ; 1 ; 1)   ← t = 0 dans γ′
  — La tangente en t = 0 :  [juge vector]  départ : T(s)
    = (0 ; 1 ; 0) + s(0 ; 1 ; 1)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (sin(t) + t·cos(t) ; e^t ; cos(t) − t·sin(t)) | T(s) = (0 ; 1 ; 0) + s·(0 ; 1 ; 1)
  pièges : g6_product_naive

γ(t) = (t·sin(t) ; 2cos(t) ; −t). Calcule γ′(t), composante par composante, γ(0), γ′(0) et la tangente T(s) = γ(0) + s·γ′(0).
  [tap, suivre l'erreur, menu steps]  (t·sin(t))′
    = t′·sin(t) + t·(sin(t))′   ← Règle du produit
    = sin(t) + t·cos(t)   ← Simplifier
  — γ′ : composante 2  [juge equiv]  départ : (2cos(t))′
    = −2sin(t)   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (−t)′
    = −1   ← Dérivée usuelle
  — Le point γ(0) :  [juge vector]  départ : γ(0)
    = (0 ; 2 ; 0)   ← t = 0
  — Le vecteur γ′(0) :  [juge vector]  départ : γ′(0)
    = (0 ; 0 ; -1)   ← t = 0 dans γ′
  — La tangente en t = 0 :  [juge vector]  départ : T(s)
    = (0 ; 2 ; 0) + s(0 ; 0 ; -1)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (sin(t) + t·cos(t) ; −2sin(t) ; −1) | T(s) = (0 ; 2 ; 0) + s·(0 ; 0 ; −1)
  pièges : g6_product_naive

```

### Niveau 4

```
γ(t) = (t·sin(t) ; t² ; t·cos(t)). Calcule γ′(t), composante par composante, γ(π), γ′(π) et la tangente T(s) = γ(π) + s·γ′(π).
  [free, suivre l'erreur]  (t·sin(t))′
    = t′·sin(t) + t·(sin(t))′   ← Règle du produit
    = sin(t) + t·cos(t)   ← Simplifier
  — γ′ : composante 2  [juge equiv]  départ : (t²)′
    = 2t   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (t·cos(t))′
    = t′·cos(t) + t·(cos(t))′   ← Règle du produit
    = cos(t) − t·sin(t)   ← Simplifier
  — Le point γ(π) :  [juge vector]  départ : γ(π)
    = (0 ; π^2 ; -π)   ← t = π
  — Le vecteur γ′(π) :  [juge vector]  départ : γ′(π)
    = (-π ; 2π ; -1)   ← t = π dans γ′
  — La tangente en t = π :  [juge vector]  départ : T(s)
    = (0 ; π^2 ; -π) + s(-π ; 2π ; -1)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (sin(t) + t·cos(t) ; 2t ; cos(t) − t·sin(t)) | T(s) = (0 ; π² ; −π) + s·(−π ; 2π ; −1)
  pièges : g6_product_naive

γ(t) = (t·cos(t) ; −t ; t²). Calcule γ′(t), composante par composante, γ(0), γ′(0) et la tangente T(s) = γ(0) + s·γ′(0).
  [free, suivre l'erreur]  (t·cos(t))′
    = t′·cos(t) + t·(cos(t))′   ← Règle du produit
    = cos(t) − t·sin(t)   ← Simplifier
  — γ′ : composante 2  [juge equiv]  départ : (−t)′
    = −1   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : (t²)′
    = 2t   ← Dérivée usuelle
  — Le point γ(0) :  [juge vector]  départ : γ(0)
    = (0 ; 0 ; 0)   ← t = 0
  — Le vecteur γ′(0) :  [juge vector]  départ : γ′(0)
    = (1 ; -1 ; 0)   ← t = 0 dans γ′
  — La tangente en t = 0 :  [juge vector]  départ : T(s)
    = (0 ; 0 ; 0) + s(1 ; -1 ; 0)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (cos(t) − t·sin(t) ; −1 ; 2t) | T(s) = (0 ; 0 ; 0) + s·(1 ; −1 ; 0)
  pièges : g6_product_naive

γ(t) = (−t ; t² ; t). Calcule γ′(t), composante par composante, γ(1), γ′(1) et la tangente T(s) = γ(1) + s·γ′(1).
  [free, suivre l'erreur]  (−t)′
    = −1   ← Dérivée usuelle
  — γ′ : composante 2  [juge equiv]  départ : (t²)′
    = 2t   ← Dérivée usuelle
  — γ′ : composante 3  [juge equiv]  départ : t′
    = 1   ← Dérivée usuelle
  — Le point γ(1) :  [juge vector]  départ : γ(1)
    = (-1 ; 1 ; 1)   ← t = 1
  — Le vecteur γ′(1) :  [juge vector]  départ : γ′(1)
    = (-1 ; 2 ; 1)   ← t = 1 dans γ′
  — La tangente en t = 1 :  [juge vector]  départ : T(s)
    = (-1 ; 1 ; 1) + s(-1 ; 2 ; 1)   ← Le point, plus s fois le vecteur tangent
  aides : Dérive chaque composante séparément ; puis remplace t par t₀. | γ′(t) = (−1 ; 2t ; 1) | T(s) = (−1 ; 1 ; 1) + s·(−1 ; 2 ; 1)

```

### Niveau 5

```
sign(t) vaut 1 si t > 0, −1 si t < 0 et 0 si t = 0. Laquelle de ces courbes γ : ℝ → ℝ³ a un point de discontinuité ?
  ✔ γ(t) = (|t| ; sign(t)·cos t ; cos t)   · γ(t) = (t·sign(t) ; eᵗ ; |t|) [a2_curve_sign_factor]   · γ(t) = (sign(t)·sin t ; eᵗ ; sin 2t) [a2_curve_sign_factor]   · γ(t) = (cos t ; t³ − t ; sign(t)·t²) [a2_curve_sign_factor]
  pièges : a2_curve_sign_factor

sign(t) vaut 1 si t > 0, −1 si t < 0 et 0 si t = 0. Laquelle de ces courbes γ : ℝ → ℝ³ a un point de discontinuité ?
  ✔ γ(t) = (sign(t)·(t + 2) ; cos t ; eᵗ)   · γ(t) = (sin 2t ; t·sign(t) ; cos t) [a2_curve_sign_factor]   · γ(t) = (|t| ; sin 2t ; sign(t)·sin t) [a2_curve_sign_factor]   · γ(t) = (sign(t)·(eᵗ − 1) ; eᵗ ; cos t) [a2_curve_sign_factor]
  pièges : a2_curve_sign_factor

sign(t) vaut 1 si t > 0, −1 si t < 0 et 0 si t = 0. Laquelle de ces courbes γ : ℝ → ℝ³ a un point de discontinuité ?
  · γ(t) = (sign(t)·t² ; |t| ; t³ − t) [a2_curve_sign_factor]   · γ(t) = (|t| ; sin 2t ; sign(t)·sin t) [a2_curve_sign_factor]   ✔ γ(t) = (sin 2t ; t³ − t ; sign(t)·(t + 2))   · γ(t) = (sign(t)·(eᵗ − 1) ; t³ − t ; cos t) [a2_curve_sign_factor]
  pièges : a2_curve_sign_factor

```

### Variantes d'examen

```
sign(t) vaut 1 si t > 0, −1 si t < 0 et 0 si t = 0. Laquelle de ces courbes γ : ℝ → ℝ³ a un point de discontinuité ?
  · γ(t) = (eᵗ ; sin 2t ; sign(t)·t²) [a2_curve_sign_factor]   · γ(t) = (sign(t)·(eᵗ − 1) ; sin 2t ; cos t) [a2_curve_sign_factor]   · γ(t) = (sin 2t ; sign(t)·sin t ; eᵗ) [a2_curve_sign_factor]   ✔ γ(t) = (t² ; eᵗ ; sign(t − 1)·t)
  [examen mcq]
  pièges : a2_curve_sign_factor

Vrai ou faux ?
  « Une courbe γ : ℝ → ℝ² de classe C¹ est lisse : γ′(t) ≠ 0 pour tout t. » → FAUX
    contre-exemple (a2) : x = t^2, y = t^3
  [examen tf]

```

## Longueur d'arc (`a2-curve-length`, BA2)

_L = ∫ ‖γ′(t)‖ dt : chercher le carré parfait sous la racine._

### Niveau 1

```
γ(t) = (e^t·cos(t) ; e^t·sin(t) ; e^t), t ∈ [0 ; ln(2)]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [guided]  (e^t·cos(t))′² + (e^t·sin(t))′² + (e^t)′²
    = (e^t·(cos(t) − sin(t)))² + (e^t·(sin(t) + cos(t)))² + (e^t)²   ← Dériver chaque composante
    = 2e^(2t) + e^(2t)   ← Développer
    = 3e^(2t)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{ln(2)} √(2e^(2t) + e^(2t)) dt
    (‖γ′(t)‖ = √(3e^(2t)) = √3·e^t)
    = ∫_{0}^{ln(2)} □ dt   (trous : ∫_{0}^{ln(2)} √3·e^t dt)   ← ‖γ′(t)‖ = √3·e^t
    = [√3·e^t]_{0}^{ln(2)}   ← Une primitive
    = □   (trous : √3)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 2e^(2t) + e^(2t) = 3e^(2t) | L = ∫_{0}^{ln(2)} √3·e^t dt = √3
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (2t ; t² ; ln(t)), t ∈ [1 ; e²]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [guided]  (2t)′² + (t²)′² + (ln(t))′²
    = (2)² + (2t)² + (1/t)²   ← Dériver chaque composante
    = 4 + 4t² + 1/t²   ← Développer
    = (□ + 1/t)²   (trous : (2t + 1/t)²)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{1}^{e²} √(4 + 4t² + 1/t²) dt
    (‖γ′(t)‖ = √((2t + 1/t)²) = 2t + 1/t)
    = ∫_{1}^{e²} □ dt   (trous : ∫_{1}^{e²} (2t + 1/t) dt)   ← ‖γ′(t)‖ = 2t+1/t
    = [t² + ln(t)]_{1}^{e²}   ← Une primitive
    = □   (trous : e⁴ + 1)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 4 + 4t² + 1/t² = (2t + 1/t)² | L = ∫_{1}^{e²} (2t + 1/t) dt = e⁴ + 1
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (e^t·cos(t) ; e^t·sin(t) ; e^t), t ∈ [0 ; ln(3)]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [guided]  (e^t·cos(t))′² + (e^t·sin(t))′² + (e^t)′²
    = (e^t·(cos(t) − sin(t)))² + (e^t·(sin(t) + cos(t)))² + (e^t)²   ← Dériver chaque composante
    = 2e^(2t) + e^(2t)   ← Développer
    = 3e^(2t)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{ln(3)} √(2e^(2t) + e^(2t)) dt
    (‖γ′(t)‖ = √(3e^(2t)) = √3·e^t)
    = ∫_{0}^{ln(3)} □ dt   (trous : ∫_{0}^{ln(3)} √3·e^t dt)   ← ‖γ′(t)‖ = √3·e^t
    = [√3·e^t]_{0}^{ln(3)}   ← Une primitive
    = □   (trous : 2√3)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 2e^(2t) + e^(2t) = 3e^(2t) | L = ∫_{0}^{ln(3)} √3·e^t dt = 2√3
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

```

### Niveau 2

```
γ(t) = (3(t − sin(t)) ; 3(1 − cos(t))), t ∈ [0 ; π]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [guided]  (3(t − sin(t)))′² + (3(1 − cos(t)))′²
    = (3(1 − cos(t)))² + (3sin(t))²   ← Dériver chaque composante
    = 9(1 − cos(t))² + 9sin(t)²   ← Développer
    = 36sin(t/2)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{π} √(9(1 − cos(t))² + 9sin(t)²) dt
    ? La vitesse ‖γ′(t)‖ vaut : ✔ 6sin(t/2) / · 3(1−cos(t))+3sin(t) / · 36sin(t/2)²
    = ∫_{0}^{π} 6sin(t/2) dt   ← ‖γ′(t)‖ = 6sin(t/2) (sin(t/2) ≥ 0 sur l'intervalle)
    = [−12cos(t/2)]_{0}^{π}   ← Une primitive
    = □   (trous : 12)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 9(1 − cos(t))² + 9sin(t)² = 36sin(t/2)² | L = ∫_{0}^{π} 6sin(t/2) dt = 12
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (2t ; t² ; t³/3), t ∈ [0 ; 3]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [guided]  (2t)′² + (t²)′² + (t³/3)′²
    = (2)² + (2t)² + (t²)²   ← Dériver chaque composante
    = 4 + 4t² + t⁴   ← Développer
    = (t² + 2)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{3} √(4 + 4t² + t⁴) dt
    ? La vitesse ‖γ′(t)‖ vaut : ✔ t²+2 / · 2+2t+t² / · (t²+2)²
    = ∫_{0}^{3} (t² + 2) dt   ← ‖γ′(t)‖ = t²+2
    = [t³/3 + 2t]_{0}^{3}   ← Une primitive
    = □   (trous : 15)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 4 + 4t² + t⁴ = (t² + 2)² | L = ∫_{0}^{3} (t² + 2) dt = 15
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (t² ; t³), t ∈ [0 ; 1]. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici t² fois un facteur), puis la longueur L de la courbe.
  [guided]  (t²)′² + (t³)′²
    = (2t)² + (3t²)²   ← Dériver chaque composante
    = 4t² + 9t⁴   ← Développer
    = t²(4 + 9t²)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{1} √(4t² + 9t⁴) dt
    ? La vitesse ‖γ′(t)‖ vaut : ✔ t√(4+9t²) / · 2t+3t² / · t²(4+9t²)
    = ∫_{0}^{1} t√(4 + 9t²) dt   ← ‖γ′(t)‖ = t√(4+9t²) (positif sur l'intervalle)
    = [(4 + 9t²)^(3/2)/27]_{0}^{1}   ← Une primitive
    = □   (trous : (13√13 − 8)/27)   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 4t² + 9t⁴ = t²(4 + 9t²) | L = ∫_{0}^{1} t√(4 + 9t²) dt = (13√13 − 8)/27
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

```

### Niveau 3

```
γ(t) = (cos(t)³ ; sin(t)³), t ∈ [0 ; π/2]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [tap, suivre l'erreur, menu steps]  (cos(t)³)′² + (sin(t)³)′²
    = (−3cos(t)²·sin(t))² + (3sin(t)²·cos(t))²   ← Dériver chaque composante
    = 9cos(t)⁴·sin(t)² + 9sin(t)⁴·cos(t)²   ← Développer
    = 9sin(t)²·cos(t)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{π/2} √(9cos(t)⁴·sin(t)² + 9sin(t)⁴·cos(t)²) dt
    = ∫_{0}^{π/2} 3sin(t)·cos(t) dt   ← ‖γ′(t)‖ = 3sin(t)·cos(t) (positif sur l'intervalle)
    = [3/2sin(t)²]_{0}^{π/2}   ← Une primitive
    = 3/2   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 9cos(t)⁴·sin(t)² + 9sin(t)⁴·cos(t)² = 9sin(t)²·cos(t)² | L = ∫_{0}^{π/2} 3sin(t)·cos(t) dt = 3/2
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (2t ; t² ; t³/3), t ∈ [0 ; 3]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [tap, suivre l'erreur, menu steps]  (2t)′² + (t²)′² + (t³/3)′²
    = (2)² + (2t)² + (t²)²   ← Dériver chaque composante
    = 4 + 4t² + t⁴   ← Développer
    = (t² + 2)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{3} √(4 + 4t² + t⁴) dt
    = ∫_{0}^{3} (t² + 2) dt   ← ‖γ′(t)‖ = t²+2
    = [t³/3 + 2t]_{0}^{3}   ← Une primitive
    = 15   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 4 + 4t² + t⁴ = (t² + 2)² | L = ∫_{0}^{3} (t² + 2) dt = 15
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (5cos(t) ; 5sin(t) ; 12t), t ∈ [0 ; 4π]. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici une constante), puis la longueur L de la courbe.
  [tap, suivre l'erreur, menu steps]  (5cos(t))′² + (5sin(t))′² + (12t)′²
    = (−5sin(t))² + (5cos(t))² + (12)²   ← Dériver chaque composante
    = 25sin(t)² + 25cos(t)² + 144   ← Développer
    = 169   ← cos² + sin² = 1 : une constante
  — La longueur L :  [juge definite]  départ : ∫_{0}^{4π} √(25sin(t)² + 25cos(t)² + 144) dt
    = ∫_{0}^{4π} 13 dt   ← ‖γ′(t)‖ = 13
    = [13t]_{0}^{4π}   ← Une primitive
    = 52π   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 25sin(t)² + 25cos(t)² + 144 = 169 | L = ∫_{0}^{4π} 13 dt = 52π
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

```

### Niveau 4

```
γ(t) = (e^t·cos(t) ; e^t·sin(t) ; e^t), t ∈ [0 ; ln(2)]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [free, suivre l'erreur]  (e^t·cos(t))′² + (e^t·sin(t))′² + (e^t)′²
    = (e^t·(cos(t) − sin(t)))² + (e^t·(sin(t) + cos(t)))² + (e^t)²   ← Dériver chaque composante
    = 2e^(2t) + e^(2t)   ← Développer
    = 3e^(2t)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{ln(2)} √(2e^(2t) + e^(2t)) dt
    = ∫_{0}^{ln(2)} √3·e^t dt   ← ‖γ′(t)‖ = √3·e^t
    = [√3·e^t]_{0}^{ln(2)}   ← Une primitive
    = √3   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 2e^(2t) + e^(2t) = 3e^(2t) | L = ∫_{0}^{ln(2)} √3·e^t dt = √3
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = ((t − sin(t)) ; (1 − cos(t))), t ∈ [0 ; π]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [free, suivre l'erreur]  (t − sin(t))′² + (1 − cos(t))′²
    = ((1 − cos(t)))² + (sin(t))²   ← Dériver chaque composante
    = 1(1 − cos(t))² + 1sin(t)²   ← Développer
    = 4sin(t/2)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{π} √(1(1 − cos(t))² + 1sin(t)²) dt
    = ∫_{0}^{π} 2sin(t/2) dt   ← ‖γ′(t)‖ = 2sin(t/2) (sin(t/2) ≥ 0 sur l'intervalle)
    = [−4cos(t/2)]_{0}^{π}   ← Une primitive
    = 4   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 1(1 − cos(t))² + 1sin(t)² = 4sin(t/2)² | L = ∫_{0}^{π} 2sin(t/2) dt = 4
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (e^t·cos(t) ; e^t·sin(t) ; e^t), t ∈ [0 ; ln(3)]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [free, suivre l'erreur]  (e^t·cos(t))′² + (e^t·sin(t))′² + (e^t)′²
    = (e^t·(cos(t) − sin(t)))² + (e^t·(sin(t) + cos(t)))² + (e^t)²   ← Dériver chaque composante
    = 2e^(2t) + e^(2t)   ← Développer
    = 3e^(2t)   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{ln(3)} √(2e^(2t) + e^(2t)) dt
    = ∫_{0}^{ln(3)} √3·e^t dt   ← ‖γ′(t)‖ = √3·e^t
    = [√3·e^t]_{0}^{ln(3)}   ← Une primitive
    = 2√3   ← Les bornes
  aides : L = ∫ ‖γ′(t)‖ dt : dérive chaque composante, additionne les carrés, cherche un carré parfait. | ‖γ′(t)‖² = 2e^(2t) + e^(2t) = 3e^(2t) | L = ∫_{0}^{ln(3)} √3·e^t dt = 2√3
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

```

### Niveau 5

```
γ(t) = (4cos(t) ; 4sin(t) ; 3t), t ∈ [0 ; 4π]. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici une constante), puis la longueur L de la courbe.
  [free, sans aide]  (4cos(t))′² + (4sin(t))′² + (3t)′²
    = (−4sin(t))² + (4cos(t))² + (3)²   ← Dériver chaque composante
    = 16sin(t)² + 16cos(t)² + 9   ← Développer
    = 25   ← cos² + sin² = 1 : une constante
  — La longueur L :  [juge definite]  départ : ∫_{0}^{4π} √(16sin(t)² + 16cos(t)² + 9) dt
    = ∫_{0}^{4π} 5 dt   ← ‖γ′(t)‖ = 5
    = [5t]_{0}^{4π}   ← Une primitive
    = 20π   ← Les bornes
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = ((t − sin(t)) ; (1 − cos(t))), t ∈ [0 ; π]. Calcule ‖γ′(t)‖² et écris-le comme un carré, puis la longueur L de la courbe.
  [free, sans aide]  (t − sin(t))′² + (1 − cos(t))′²
    = ((1 − cos(t)))² + (sin(t))²   ← Dériver chaque composante
    = 1(1 − cos(t))² + 1sin(t)²   ← Développer
    = 4sin(t/2)²   ← Un carré
  — La longueur L :  [juge definite]  départ : ∫_{0}^{π} √(1(1 − cos(t))² + 1sin(t)²) dt
    = ∫_{0}^{π} 2sin(t/2) dt   ← ‖γ′(t)‖ = 2sin(t/2) (sin(t/2) ≥ 0 sur l'intervalle)
    = [−4cos(t/2)]_{0}^{π}   ← Une primitive
    = 4   ← Les bornes
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

γ(t) = (6cos(t) ; 6sin(t) ; 8t), t ∈ [0 ; π]. Calcule ‖γ′(t)‖² et écris-le comme un carré (ici une constante), puis la longueur L de la courbe.
  [free, sans aide]  (6cos(t))′² + (6sin(t))′² + (8t)′²
    = (−6sin(t))² + (6cos(t))² + (8)²   ← Dériver chaque composante
    = 36sin(t)² + 36cos(t)² + 64   ← Développer
    = 100   ← cos² + sin² = 1 : une constante
  — La longueur L :  [juge definite]  départ : ∫_{0}^{π} √(36sin(t)² + 36cos(t)² + 64) dt
    = ∫_{0}^{π} 10 dt   ← ‖γ′(t)‖ = 10
    = [10t]_{0}^{π}   ← Une primitive
    = 10π   ← Les bornes
  pièges : a2_arc_sum_components, a1_arc_length_no_sqrt

```

### Variantes d'examen

```
γ(t) = (t² ; t³), t ∈ [0 ; 1]. Quelle intégrale donne la longueur de la courbe ?
  · ∫_{0}^{1} √(2t + 3t²) dt   · ∫_{0}^{1} (2t + 3t²) dt [a2_arc_sum_components]   ✔ ∫_{0}^{1} t√(4 + 9t²) dt   · ∫_{0}^{1} t²(4 + 9t²) dt [a1_arc_length_no_sqrt]
  [examen mcq]
  pièges : a1_arc_length_no_sqrt, a2_arc_sum_components

Vrai ou faux ?
  « La longueur de γ = (x, y, z) sur [0 ; 1] vaut ∫₀¹ (x′(t) + y′(t) + z′(t)) dt. » → FAUX
    contre-exemple (a2) : x = t, y = -t, z = 0
  [examen tf]
  pièges : a2_arc_sum_components

```

## Limite qui n'existe pas : deux chemins (`a2-lim-paths`, BA2)

_Les droites y = mx, puis une courbe y = xᵖ : deux valeurs, pas de limite._

### Niveau 1

```
Soit f(x, y) = 5x⁴y²/(x⁸ + 2y⁴) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas, avec les droites y = mx puis la courbe y = x².
  [guided]  5x⁴(mx)²/(x⁸ + 2(mx)⁴)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 5m²x²/(□)   (trous : 5m²x²/(x⁴ + 2m⁴))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 5m²x²/(x⁴ + 2m⁴)  [juge limit]  départ : 5m²x²/(x⁴ + 2m⁴)
    = □   (trous : 0)   ← Le numérateur tend vers 0, pas le dénominateur
  — Deuxième chemin :  [juge equiv]  départ : 5x⁴(x²)²/(x⁸ + 2(x²)⁴)
    (Le long de y = x² : f(x, x²) = 5x⁴(x²)²/(x⁸ + 2(x²)⁴))
    = 5x⁸/(□)   (trous : 5x⁸/(3x⁸))   ← y = x² : les deux termes du dénominateur ont la même puissance
    = □   (trous : 5/3)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 5/3 − 0
    (Les droites donnent 0, la courbe y = x² donne 5/3 : la limite n'existe pas.)
    = 5/3   ← 5/3 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁸ et y⁴. | Prends y = x^… : alors les deux termes du dénominateur ont la même puissance. | f(x, x²) = 5x⁸/(3x⁸) = 5/3 ≠ 0 : la limite n'existe pas.

Soit f(x, y) = 2x²y⁴/(x⁴ + y⁸) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas, avec les droites y = mx puis la courbe x = y².
  [guided]  2x²(mx)⁴/(x⁴ + (mx)⁸)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 2m⁴x²/(□)   (trous : 2m⁴x²/(1 + m⁸x⁴))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 2m⁴x²/(1 + m⁸x⁴)  [juge limit]  départ : 2m⁴x²/(1 + m⁸x⁴)
    = □   (trous : 0)   ← Le numérateur tend vers 0, pas le dénominateur
  — Deuxième chemin :  [juge equiv]  départ : 2(y²)²y⁴/((y²)⁴ + y⁸)
    (Le long de x = y² : f(y², y) = 2(y²)²y⁴/((y²)⁴ + y⁸))
    = 2y⁸/(2y⁸)   ← x = y² : les deux termes du dénominateur ont la même puissance
    = □   (trous : 1)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1 − 0
    (Les droites donnent 0, la courbe x = y² donne 1 : la limite n'existe pas.)
    = 1   ← 1 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁴ et y⁸. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y², y) = 2y⁸/(2y⁸) = 1 ≠ 0 : la limite n'existe pas.

Soit f(x, y) = 5xy³/(x² + 2y⁶) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas, avec les droites y = mx puis la courbe x = y³.
  [guided]  5x(mx)³/(x² + 2(mx)⁶)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 5m³x²/(□)   (trous : 5m³x²/(1 + 2m⁶x⁴))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 5m³x²/(1 + 2m⁶x⁴)  [juge limit]  départ : 5m³x²/(1 + 2m⁶x⁴)
    = □   (trous : 0)   ← Le numérateur tend vers 0, pas le dénominateur
  — Deuxième chemin :  [juge equiv]  départ : 5(y³)y³/((y³)² + 2y⁶)
    (Le long de x = y³ : f(y³, y) = 5(y³)y³/((y³)² + 2y⁶))
    = 5y⁶/(□)   (trous : 5y⁶/(3y⁶))   ← x = y³ : les deux termes du dénominateur ont la même puissance
    = □   (trous : 5/3)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 5/3 − 0
    (Les droites donnent 0, la courbe x = y³ donne 5/3 : la limite n'existe pas.)
    = 5/3   ← 5/3 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x² et y⁶. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y³, y) = 5y⁶/(3y⁶) = 5/3 ≠ 0 : la limite n'existe pas.

```

### Niveau 2

```
Soit f(x, y) = 5xy³/(x² + 2y⁶) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [guided]  5x(mx)³/(x² + 2(mx)⁶)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 5m³x²/(□)   (trous : 5m³x²/(1 + 2m⁶x⁴))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 5m³x²/(1 + 2m⁶x⁴)  [juge limit]  départ : 5m³x²/(1 + 2m⁶x⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : 5(y³)y³/((y³)² + 2y⁶)
    ? Quel deuxième chemin ? · y = 2x / ✔ x = y³ / · x = y⁴
    (Le long de x = y³ : f(y³, y) = 5(y³)y³/((y³)² + 2y⁶))
    = 5y⁶/(□)   (trous : 5y⁶/(3y⁶))   ← x = y³ : les deux termes du dénominateur ont la même puissance
    = □   (trous : 5/3)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 5/3 − 0
    ? Conclusion ? · La courbe est plus précise : la limite vaut 5/3 / ✔ 0 ≠ 5/3 : la limite n'existe pas / · Toutes les droites donnent 0 : la limite vaut 0
    = 5/3   ← 5/3 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x² et y⁶. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y³, y) = 5y⁶/(3y⁶) = 5/3 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

Soit f(x, y) = x²y⁴/(x⁴ + 2y⁸) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [guided]  x²(mx)⁴/(x⁴ + 2(mx)⁸)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = m⁴x²/(□)   (trous : m⁴x²/(1 + 2m⁸x⁴))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} m⁴x²/(1 + 2m⁸x⁴)  [juge limit]  départ : m⁴x²/(1 + 2m⁸x⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : (y²)²y⁴/((y²)⁴ + 2y⁸)
    ? Quel deuxième chemin ? · y = 2x / ✔ x = y² / · x = y³
    (Le long de x = y² : f(y², y) = (y²)²y⁴/((y²)⁴ + 2y⁸))
    = y⁸/(□)   (trous : y⁸/(3y⁸))   ← x = y² : les deux termes du dénominateur ont la même puissance
    = □   (trous : 1/3)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1/3 − 0
    ? Conclusion ? ✔ 0 ≠ 1/3 : la limite n'existe pas / · Toutes les droites donnent 0 : la limite vaut 0 / · La courbe est plus précise : la limite vaut 1/3
    = 1/3   ← 1/3 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁴ et y⁸. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y², y) = y⁸/(3y⁸) = 1/3 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

Soit f(x, y) = 2x³y/(x⁶ + y²) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [guided]  2x³(mx)/(x⁶ + (mx)²)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 2mx²/(□)   (trous : 2mx²/(x⁴ + m²))   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 2mx²/(x⁴ + m²)  [juge limit]  départ : 2mx²/(x⁴ + m²)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : 2x³(x³)/(x⁶ + (x³)²)
    ? Quel deuxième chemin ? · y = x⁴ / ✔ y = x³ / · y = 2x
    (Le long de y = x³ : f(x, x³) = 2x³(x³)/(x⁶ + (x³)²))
    = 2x⁶/(2x⁶)   ← y = x³ : les deux termes du dénominateur ont la même puissance
    = □   (trous : 1)   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1 − 0
    ? Conclusion ? ✔ 0 ≠ 1 : la limite n'existe pas / · Toutes les droites donnent 0 : la limite vaut 0 / · La courbe est plus précise : la limite vaut 1
    = 1   ← 1 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁶ et y². | Prends y = x^… : alors les deux termes du dénominateur ont la même puissance. | f(x, x³) = 2x⁶/(2x⁶) = 1 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

```

### Niveau 3

```
Soit f(x, y) = x⁴y²/(x⁸ + 3y⁴) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [tap, suivre l'erreur, menu steps]  x⁴(mx)²/(x⁸ + 3(mx)⁴)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = m²x²/(x⁴ + 3m⁴)   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} m²x²/(x⁴ + 3m⁴)  [juge limit]  départ : m²x²/(x⁴ + 3m⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : x⁴(x²)²/(x⁸ + 3(x²)⁴)
    ? Toutes les droites donnent 0. Que faire ? ✔ Essayer une courbe : y = x² / · Essayer une autre droite, y = 2x / ✔ Passer en polaires
    (Le long de y = x² : f(x, x²) = x⁴(x²)²/(x⁸ + 3(x²)⁴))
    = x⁸/(4x⁸)   ← y = x² : les deux termes du dénominateur ont la même puissance
    = 1/4   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1/4 − 0
    ? Conclusion ? · La courbe est plus précise : la limite vaut 1/4 / · Toutes les droites donnent 0 : la limite vaut 0 / ✔ 0 ≠ 1/4 : la limite n'existe pas
    = 1/4   ← 1/4 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁸ et y⁴. | Prends y = x^… : alors les deux termes du dénominateur ont la même puissance. | f(x, x²) = x⁸/(4x⁸) = 1/4 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

Soit f(x, y) = xy/(x² + y²) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [tap, suivre l'erreur, menu steps]  x(mx)/(x² + (mx)²)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = m/(1 + m²)   ← Simplifier par la plus petite puissance de x
  — Conclusion, et l'écart entre les valeurs pour m = 1 et m = 0 :  [juge value]  départ : 1/2 − 0
    ? La valeur le long de y = mx dépend de m. Conclusion ? ✔ Deux droites donnent deux valeurs : la limite n'existe pas / · Sur l'axe y = 0, f vaut 0 : la limite vaut 0 / · Sur y = x, f vaut 1/2 : la limite vaut 1/2
    = 1/2   ← m = 1 : 1/2 ; m = 0 : 0
  aides : Le long de y = mx, x se simplifie : la valeur dépend-elle de m ? | f(x, mx) = m/(1 + m²) | m = 0 donne 0, m = 1 donne 1/2 : pas de limite.
  pièges : a2_lim_iterated

Soit f(x, y) = x²y/(x⁴ + 3y²) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [tap, suivre l'erreur, menu steps]  x²(mx)/(x⁴ + 3(mx)²)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = mx/(x² + 3m²)   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} mx/(x² + 3m²)  [juge limit]  départ : mx/(x² + 3m²)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : x²(x²)/(x⁴ + 3(x²)²)
    ? Toutes les droites donnent 0. Que faire ? ✔ Essayer une courbe : y = x² / · Essayer une autre droite, y = 2x / ✔ Passer en polaires
    (Le long de y = x² : f(x, x²) = x²(x²)/(x⁴ + 3(x²)²))
    = x⁴/(4x⁴)   ← y = x² : les deux termes du dénominateur ont la même puissance
    = 1/4   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1/4 − 0
    ? Conclusion ? · Toutes les droites donnent 0 : la limite vaut 0 / ✔ 0 ≠ 1/4 : la limite n'existe pas / · La courbe est plus précise : la limite vaut 1/4
    = 1/4   ← 1/4 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁴ et y². | Prends y = x^… : alors les deux termes du dénominateur ont la même puissance. | f(x, x²) = x⁴/(4x⁴) = 1/4 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

```

### Niveau 4

```
Soit f(x, y) = 3x²y⁴/(x⁴ + y⁸) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [free, suivre l'erreur]  3x²(mx)⁴/(x⁴ + (mx)⁸)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 3m⁴x²/(1 + m⁸x⁴)   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 3m⁴x²/(1 + m⁸x⁴)  [juge limit]  départ : 3m⁴x²/(1 + m⁸x⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : 3(y²)²y⁴/((y²)⁴ + y⁸)
    ? Quel deuxième chemin ? · Une courbe y = xᵖ / ✔ Une courbe x = yᵖ / · Une autre droite, y = 2x
    (Le long de x = y² : f(y², y) = 3(y²)²y⁴/((y²)⁴ + y⁸))
    = 3y⁸/(2y⁸)   ← x = y² : les deux termes du dénominateur ont la même puissance
    = 3/2   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 3/2 − 0
    ? Conclusion ? ✔ 0 ≠ 3/2 : la limite n'existe pas / · La courbe est plus précise : la limite vaut 3/2 / · Toutes les droites donnent 0 : la limite vaut 0
    = 3/2   ← 3/2 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x⁴ et y⁸. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y², y) = 3y⁸/(2y⁸) = 3/2 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

Soit f(x, y) = 2xy³/(x² + 2y⁶) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [free, suivre l'erreur]  2x(mx)³/(x² + 2(mx)⁶)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 2m³x²/(1 + 2m⁶x⁴)   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 2m³x²/(1 + 2m⁶x⁴)  [juge limit]  départ : 2m³x²/(1 + 2m⁶x⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : 2(y³)y³/((y³)² + 2y⁶)
    ? Quel deuxième chemin ? · Une autre droite, y = 2x / · Une courbe y = xᵖ / ✔ Une courbe x = yᵖ
    (Le long de x = y³ : f(y³, y) = 2(y³)y³/((y³)² + 2y⁶))
    = 2y⁶/(3y⁶)   ← x = y³ : les deux termes du dénominateur ont la même puissance
    = 2/3   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 2/3 − 0
    ? Conclusion ? ✔ 0 ≠ 2/3 : la limite n'existe pas / · Toutes les droites donnent 0 : la limite vaut 0 / · La courbe est plus précise : la limite vaut 2/3
    = 2/3   ← 2/3 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x² et y⁶. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y³, y) = 2y⁶/(3y⁶) = 2/3 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

Soit f(x, y) = 3xy³/(x² + 2y⁶) pour (x, y) ≠ (0, 0). Montre que lim(x, y) → (0, 0) f(x, y) n'existe pas.
  [free, suivre l'erreur]  3x(mx)³/(x² + 2(mx)⁶)
    (Le long des droites y = mx (m fixé), on remplace y par mx :)
    = 3m³x²/(1 + 2m⁶x⁴)   ← Simplifier par la plus petite puissance de x
  — Quand x → 0 : lim_{x→0} 3m³x²/(1 + 2m⁶x⁴)  [juge limit]  départ : 3m³x²/(1 + 2m⁶x⁴)
    = 0   ← Le numérateur tend vers 0, pas le dénominateur
  — Toutes les droites donnent 0. Un autre chemin :  [juge equiv]  départ : 3(y³)y³/((y³)² + 2y⁶)
    ? Quel deuxième chemin ? · Une autre droite, y = 2x / ✔ Une courbe x = yᵖ / · Une courbe y = xᵖ
    (Le long de x = y³ : f(y³, y) = 3(y³)y³/((y³)² + 2y⁶))
    = 3y⁶/(3y⁶)   ← x = y³ : les deux termes du dénominateur ont la même puissance
    = 1   ← Simplifier
  — Conclusion, et l'écart entre les deux valeurs :  [juge value]  départ : 1 − 0
    ? Conclusion ? · Toutes les droites donnent 0 : la limite vaut 0 / · La courbe est plus précise : la limite vaut 1 / ✔ 0 ≠ 1 : la limite n'existe pas
    = 1   ← 1 − 0
  aides : Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre x² et y⁶. | Prends x = y^… : alors les deux termes du dénominateur ont la même puissance. | f(y³, y) = 3y⁶/(3y⁶) = 1 ≠ 0 : la limite n'existe pas.
  pièges : a2_lim_lines_only

```

### Niveau 5

```
lim(x, y) → (0, 0) (xy² + y⁶)/(x² + 3y⁴) =
  ✔ n'existe pas   · y²/3 [a2_lim_function_answer]   · 1/4   · 0 [a2_lim_lines_only]
  pièges : a2_lim_lines_only, a2_lim_function_answer

lim(x, y) → (0, 0) 5x²y²/(x⁴ + y⁴) =
  ✔ n'existe pas   · 0 [a2_lim_iterated]   · 5/2   · 1/2
  pièges : a2_lim_iterated

lim(x, y) → (0, 0) (2xy² + y⁶)/(x² + 3y⁴) =
  · 1/2   · 0 [a2_lim_lines_only]   ✔ n'existe pas   · y²/3 [a2_lim_function_answer]
  pièges : a2_lim_lines_only, a2_lim_function_answer

```

### Variantes d'examen

```
lim(x, y) → (0, 0) (x²y + y⁴)/(x⁴ + y²) =
  · y² [a2_lim_function_answer]   · 1/2   ✔ n'existe pas   · 0 [a2_lim_lines_only]
  [examen mcq]
  pièges : a2_lim_lines_only, a2_lim_function_answer

Vrai ou faux ?
  « Si limx→0 limy→0 f(x, y) = limy→0 limx→0 f(x, y), alors lim(x, y) → (0, 0) f(x, y) existe. » → FAUX
    contre-exemple (a2) : f = x y/(x^2+y^2)
  [examen tf]
  pièges : a2_lim_iterated

```

## Limite qui existe : coordonnées polaires et gendarmes (`a2-lim-polar`, BA2)

_x = r cos φ, y = r sin φ ; |f − L| ≤ g(r) → 0, sans φ._

### Niveau 1

```
Calcule lim(x, y) → (0, 0) (−3x²y − 2y³)/(x² + y²).
  [guided]  r(−3cos(φ)²sin(φ) − 2sin(φ)³)
    (En polaires, f = r(−3cos(φ)²sin(φ) − 2sin(φ)³).)
    = □r   (trous : 5r)   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 5r. Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 5r
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r | |f| ≤ 5r → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (−3x³ + 2xy² − 2y³ + 2x²y²)/(x² + y²).
  [guided]  r(−3cos(φ)³ + 2cos(φ)sin(φ)² − 2sin(φ)³) + 2r²cos(φ)²sin(φ)²
    (En polaires, f = r(−3cos(φ)³ + 2cos(φ)sin(φ)² − 2sin(φ)³) + 2r²cos(φ)²sin(φ)².)
    = □r + 2r²   (trous : 7r + 2r²)   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 7r + 2r². Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 7r + 2r²
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r + (…)·r² | |f| ≤ 7r + 2r² → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (−xy² + 3x³y)/(x² + y²).
  [guided]  −rcos(φ)sin(φ)² + 3r²cos(φ)³sin(φ)
    (En polaires, f = −rcos(φ)sin(φ)² + 3r²cos(φ)³sin(φ).)
    = r + 3r²   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ r + 3r². Quand r → 0⁺, la borne tend vers  [juge limit]  départ : r + 3r²
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r + (…)·r² | |f| ≤ r + 3r² → 0, donc lim f = 0.

```

### Niveau 2

```
Calcule lim(x, y) → (0, 0) (−x³ + 3x²y + 3x⁴)/(x² + y²).
  [guided]  (−(rcos(φ))³ + 3(rcos(φ))²(rsin(φ)) + 3(rcos(φ))⁴)/((rcos(φ))² + (rsin(φ))²)
    = (r³(−cos(φ)³ + 3cos(φ)²sin(φ)) + 3r⁴cos(φ)⁴)/□   (trous : (r³(−cos(φ)³ + 3cos(φ)²sin(φ)) + 3r⁴cos(φ)⁴)/r²)   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−cos(φ)³ + 3cos(φ)²sin(φ)) + 3r²cos(φ)⁴   ← Simplifier par r²
  — Majoration de |f − 0| = |r(−cos(φ)³ + 3cos(φ)²sin(φ)) + 3r²cos(φ)⁴|, sans φ :  [juge bound]  départ : r(−cos(φ)³ + 3cos(φ)²sin(φ)) + 3r²cos(φ)⁴
    ? Quelle majoration de |f| conclut ? · |f| ≤ r·|−cos(φ)³ + 3cos(φ)²sin(φ)| + r²·|3cos(φ)⁴| / ✔ |f| ≤ 4r + 3r² / · |f| ≤ 4 + 3r²
    = 4r + 3r²   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 4r + 3r². Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 4r + 3r²
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r + (…)·r² | |f| ≤ 4r + 3r² → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (−3x²y³ + 2xy⁴)/(x² + y²)².
  [guided]  (−3(rcos(φ))²(rsin(φ))³ + 2(rcos(φ))(rsin(φ))⁴)/((rcos(φ))² + (rsin(φ))²)²
    = (r⁵(−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴))/□   (trous : (r⁵(−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴))/r⁴)   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴)   ← Simplifier par r⁴
  — Majoration de |f − 0| = |r(−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴)|, sans φ :  [juge bound]  départ : r(−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴)
    ? Quelle majoration de |f| conclut ? · |f| ≤ 5 / ✔ |f| ≤ 5r / · |f| ≤ r·|−3cos(φ)²sin(φ)³ + 2cos(φ)sin(φ)⁴|
    = 5r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 5r. Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 5r
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r | |f| ≤ 5r → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (−x⁵ − 3x³y²)/(x² + y²)².
  [guided]  (−(rcos(φ))⁵ − 3(rcos(φ))³(rsin(φ))²)/((rcos(φ))² + (rsin(φ))²)²
    = (r⁵(−cos(φ)⁵ − 3cos(φ)³sin(φ)²))/□   (trous : (r⁵(−cos(φ)⁵ − 3cos(φ)³sin(φ)²))/r⁴)   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−cos(φ)⁵ − 3cos(φ)³sin(φ)²)   ← Simplifier par r⁴
  — Majoration de |f − 0| = |r(−cos(φ)⁵ − 3cos(φ)³sin(φ)²)|, sans φ :  [juge bound]  départ : r(−cos(φ)⁵ − 3cos(φ)³sin(φ)²)
    ? Quelle majoration de |f| conclut ? · |f| ≤ r·|−cos(φ)⁵ − 3cos(φ)³sin(φ)²| / · |f| ≤ 4 / ✔ |f| ≤ 4r
    = 4r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 4r. Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 4r
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r | |f| ≤ 4r → 0, donc lim f = 0.

```

### Niveau 3

```
Calcule lim(x, y) → (0, 0) (−3x²y + 3y³ − 3x²y²)/(x² + y²).
  [tap, suivre l'erreur, menu steps]  (−3(rcos(φ))²(rsin(φ)) + 3(rsin(φ))³ − 3(rcos(φ))²(rsin(φ))²)/((rcos(φ))² + (rsin(φ))²)
    ? Quelle méthode ? ✔ Passer en polaires : x = r cos φ, y = r sin φ / · Remplacer x et y par 0 / · Calculer la limite le long de deux chemins
    = (r³(−3cos(φ)²sin(φ) + 3sin(φ)³) − 3r⁴cos(φ)²sin(φ)²)/r²   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−3cos(φ)²sin(φ) + 3sin(φ)³) − 3r²cos(φ)²sin(φ)²   ← Simplifier par r²
  — Majoration de |f − 0| = |r(−3cos(φ)²sin(φ) + 3sin(φ)³) − 3r²cos(φ)²sin(φ)²|, sans φ :  [juge bound]  départ : r(−3cos(φ)²sin(φ) + 3sin(φ)³) − 3r²cos(φ)²sin(φ)²
    = 6r + 3r²   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 6r + 3r². Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 6r + 3r²
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r + (…)·r² | |f| ≤ 6r + 3r² → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (e^(x² + y²) − 1)/(x² + y²).
  [tap, suivre l'erreur, menu steps]  (e^((rcos(φ))² + (rsin(φ))²) − 1)/((rcos(φ))² + (rsin(φ))²)
    ? Quelle méthode ? · Remplacer x et y par 0 / ✔ Passer en polaires : x = r cos φ, y = r sin φ / · Calculer la limite le long de deux chemins
    = (e^(r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ (u = r² → 0) : lim_{r→0} (e^(r²) − 1)/r²  [juge limit]  départ : (e^(r²) − 1)/r²
    = 1   ← (e^(u) − 1)/u → 1
  aides : Pose u = x² + y² = r² : c'est une limite à une variable. | f = (e^(r²) − 1)/r² | (e^(u) − 1)/u → 1 : la limite vaut 1.
  pièges : g2_exp_sum

Calcule lim(x, y) → (0, 0) −3x³/(x² + y²).
  [tap, suivre l'erreur, menu steps]  −3(rcos(φ))³/((rcos(φ))² + (rsin(φ))²)
    ? Quelle méthode ? · Calculer la limite le long de deux chemins / · Remplacer x et y par 0 / ✔ Passer en polaires : x = r cos φ, y = r sin φ
    = (−3r³cos(φ)³)/r²   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = −3rcos(φ)³   ← Simplifier par r²
  — Majoration de |f − 0| = |−3rcos(φ)³|, sans φ :  [juge bound]  départ : −3rcos(φ)³
    = 3r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 3r. Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 3r
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r | |f| ≤ 3r → 0, donc lim f = 0.

```

### Niveau 4

```
Calcule lim(x, y) → (0, 0) sin(2(x² + y²))/(x² + y²).
  [free, suivre l'erreur]  sin(2((rcos(φ))² + (rsin(φ))²))/((rcos(φ))² + (rsin(φ))²)
    = sin(2r²)/r²   ← x² + y² = r²
  — Quand r → 0⁺ (u = r² → 0) : lim_{r→0} sin(2r²)/r²  [juge limit]  départ : sin(2r²)/r²
    = 2   ← sin(2u)/u → 2
  aides : Pose u = x² + y² = r² : c'est une limite à une variable. | f = sin(2r²)/r² | sin(2u)/u → 2 : la limite vaut 2.

Calcule lim(x, y) → (0, 0) (−2x⁵ + 3x⁴y)/(x² + y²)².
  [free, suivre l'erreur]  (−2(rcos(φ))⁵ + 3(rcos(φ))⁴(rsin(φ)))/((rcos(φ))² + (rsin(φ))²)²
    = (r⁵(−2cos(φ)⁵ + 3cos(φ)⁴sin(φ)))/r⁴   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−2cos(φ)⁵ + 3cos(φ)⁴sin(φ))   ← Simplifier par r⁴
  — Majoration de |f − 0| = |r(−2cos(φ)⁵ + 3cos(φ)⁴sin(φ))|, sans φ :  [juge bound]  départ : r(−2cos(φ)⁵ + 3cos(φ)⁴sin(φ))
    = 5r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — Gendarmes : 0 ≤ |f| ≤ 5r. Quand r → 0⁺, la borne tend vers  [juge limit]  départ : 5r
    = 0   ← Donc lim f = 0
  aides : Passe en polaires, puis majore tout ce qui dépend de φ par une constante. | |f| ≤ (…)·r | |f| ≤ 5r → 0, donc lim f = 0.

Calcule lim(x, y) → (0, 0) (e^(3(x² + y²)) − 1)/(x² + y²).
  [free, suivre l'erreur]  (e^(3((rcos(φ))² + (rsin(φ))²)) − 1)/((rcos(φ))² + (rsin(φ))²)
    = (e^(3r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ (u = r² → 0) : lim_{r→0} (e^(3r²) − 1)/r²  [juge limit]  départ : (e^(3r²) − 1)/r²
    = 3   ← (e^(3u) − 1)/u → 3
  aides : Pose u = x² + y² = r² : c'est une limite à une variable. | f = (e^(3r²) − 1)/r² | (e^(3u) − 1)/u → 3 : la limite vaut 3.

```

### Niveau 5

```
Calcule ces quatre limites en (0, 0), sans aide (format QCM de l'examen).
  [problème, 4 points]
  partie 1 (Limite 1 : 1)
  lim(x, y) → (0, 0) (−3x⁴y + 3x³y²)/(x² + y²)² =
    · n'existe pas [a2_lim_polar_r_forgot]   ✔ 0   · 6   · 1
  partie 2 (Limite 2 : 1)
  lim(x, y) → (0, 0) (2x²y − xy² − 3y³)/(x² + y²) =
    · 6   · 1   ✔ 0   · n'existe pas [a2_lim_polar_r_forgot]
  partie 3 (Limite 3 : 1)
  lim(x, y) → (0, 0) 3xy³/(x² + 3y⁶) =
    · +∞   ✔ n'existe pas   · 3/4   · 0 [a2_lim_lines_only]
  partie 4 (Limite 4 : 1)
  lim(x, y) → (0, 0) (1 − cos(x² + y²))/(x² + y²)² =
    · 0   · 1 [a1_remarkable_limit_scale]   ✔ 1/2   · n'existe pas
  pièges : a2_lim_polar_r_forgot, a2_lim_lines_only, a1_remarkable_limit_scale

Calcule ces quatre limites en (0, 0), sans aide (format QCM de l'examen).
  [problème, 4 points]
  partie 1 (Limite 1 : 1)
  lim(x, y) → (0, 0) (−2x³ − x²y − 2y³ + 2x³y)/(x² + y²) =
    · 5   · n'existe pas [a2_lim_polar_r_forgot]   · 1   ✔ 0
  partie 2 (Limite 2 : 1)
  lim(x, y) → (0, 0) xy³/(x⁴ + 3y⁴) =
    · 1/2   ✔ n'existe pas   · 1/4   · 0 [a2_lim_iterated]
  partie 3 (Limite 3 : 1)
  lim(x, y) → (0, 0) y³/(x² + y²) =
    ✔ 0   · 1   · +∞   · n'existe pas [a2_lim_polar_r_forgot]
  partie 4 (Limite 4 : 1)
  lim(x, y) → (0, 0) (1 − cos(3(x² + y²)))/(x² + y²)² =
    · n'existe pas   ✔ 9/2   · 0   · 1 [a1_remarkable_limit_scale]
  pièges : a2_lim_polar_r_forgot, a2_lim_iterated, a1_remarkable_limit_scale

Calcule ces quatre limites en (0, 0), sans aide (format QCM de l'examen).
  [problème, 4 points]
  partie 1 (Limite 1 : 1)
  lim(x, y) → (0, 0) (x⁴y + x³y²)/(x² + y²)² =
    ✔ 0   · 2   · n'existe pas [a2_lim_polar_r_forgot]   · 1
  partie 2 (Limite 2 : 1)
  lim(x, y) → (0, 0) xy³/(x⁴ + 2y⁴) =
    · 0 [a2_lim_iterated]   · 1/2   · 1/3   ✔ n'existe pas
  partie 3 (Limite 3 : 1)
  lim(x, y) → (0, 0) (e^(3(x² + y²)) − 1)/(x² + y²) =
    · 0   ✔ 3   · n'existe pas   · 1 [a1_remarkable_limit_scale]
  partie 4 (Limite 4 : 1)
  lim(x, y) → (0, 0) xy/(x² + y²) =
    · 1/2   · 0 [a2_lim_polar_theta]   · +∞   ✔ n'existe pas
  pièges : a2_lim_polar_r_forgot, a2_lim_iterated, a1_remarkable_limit_scale, a2_lim_polar_theta

```

### Variantes d'examen

```
lim(x, y) → (0, 0) −3y²/(x² + y²) =
  · 0 [a2_lim_polar_theta]   · +∞   ✔ n'existe pas   · −3/2
  [examen mcq]
  pièges : a2_lim_polar_theta

Vrai ou faux ?
  « Si pour tout φ, limr→0 f(r cos φ, r sin φ) = 1 et f(0, 0) = 1, alors f est continue en (0, 0). » → FAUX
    contre-exemple (a2) : f = 1+x^2y/(x^4+y^2)
  [examen tf]
  pièges : a2_lim_lines_only

```

## Continuité et prolongement par continuité (`a2-continuity`, BA2)

_Étudier seulement les points où la formule change ; poser f(a) = lim f._

### Niveau 1

```
Soit f(x, y) = (3x²y − 3y³ + 3xy³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  r(3cos(φ)²sin(φ) − 3sin(φ)³) + 3r²cos(φ)sin(φ)³
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    (En polaires, f = r(3cos(φ)²sin(φ) − 3sin(φ)³) + 3r²cos(φ)sin(φ)³.)
    = □r + 3r²   (trous : 6r + 3r²)   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — La limite vaut 0 (|f| ≤ 6r + 3r² → 0). f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 0   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | En polaires : f = r(3cos(φ)²sin(φ) − 3sin(φ)³) + 3r²cos(φ)sin(φ)³, |f| ≤ 6r + 3r² | a = 0

Soit f(x, y) = sin(x² + y²)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  sin(r²)/r²
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    (En polaires, f = sin(r²)/r². Limite quand r → 0⁺ :)
    = □   (trous : 1)   ← sin(u)/u → 1
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 1   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 1
  pièges : a1_dl_factorial_missing, a1_dl_order_too_low, a1_bh_quotient_rule

Soit f(x, y) = (x²y + 2xy² + 3y³ + 2x³y)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  r(cos(φ)²sin(φ) + 2cos(φ)sin(φ)² + 3sin(φ)³) + 2r²cos(φ)³sin(φ)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    (En polaires, f = r(cos(φ)²sin(φ) + 2cos(φ)sin(φ)² + 3sin(φ)³) + 2r²cos(φ)³sin(φ).)
    = □r + 2r²   (trous : 6r + 2r²)   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — La limite vaut 0 (|f| ≤ 6r + 2r² → 0). f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 0   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | En polaires : f = r(cos(φ)²sin(φ) + 2cos(φ)sin(φ)² + 3sin(φ)³) + 2r²cos(φ)³sin(φ), |f| ≤ 6r + 2r² | a = 0

```

### Niveau 2

```
Soit f(x, y) = (e^(3(x² + y²)) − 1)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  (e^(3((rcos(φ))² + (rsin(φ))²)) − 1)/((rcos(φ))² + (rsin(φ))²)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (e^(3r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (e^(3r²) − 1)/r²  [juge limit]  départ : (e^(3r²) − 1)/r²
    = 3   ← (e^(3u) − 1)/u → 3
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    ? Quelle valeur faut-il donner à a ? · Aucune : f n'est pas définie en (0, 0) / ✔ a = 3, la limite en (0, 0) / · a = 1
    = 3   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 3

Soit f(x, y) = (e^(x² + y²) − 1)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  (e^((rcos(φ))² + (rsin(φ))²) − 1)/((rcos(φ))² + (rsin(φ))²)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (e^(r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (e^(r²) − 1)/r²  [juge limit]  départ : (e^(r²) − 1)/r²
    = 1   ← (e^(u) − 1)/u → 1
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    ? Quelle valeur faut-il donner à a ? · a = 0 / · Aucune : f n'est pas définie en (0, 0) / ✔ a = 1, la limite en (0, 0)
    = 1   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 1
  pièges : g2_exp_sum

Soit f(x, y) = (−3x²y − 2y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [guided]  (−3(rcos(φ))²(rsin(φ)) − 2(rsin(φ))³)/((rcos(φ))² + (rsin(φ))²)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (r³(−3cos(φ)²sin(φ) − 2sin(φ)³))/□   (trous : (r³(−3cos(φ)²sin(φ) − 2sin(φ)³))/r²)   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(−3cos(φ)²sin(φ) − 2sin(φ)³)   ← Simplifier par r²
  — Majoration de |f − 0| = |r(−3cos(φ)²sin(φ) − 2sin(φ)³)|, sans φ :  [juge bound]  départ : r(−3cos(φ)²sin(φ) − 2sin(φ)³)
    = 5r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — La limite vaut 0 (|f| ≤ 5r → 0). f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    ? Quelle valeur faut-il donner à a ? ✔ a = 0, la limite en (0, 0) / · Aucune : f n'est pas définie en (0, 0) / · a = 1
    = 0   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | En polaires : f = r(−3cos(φ)²sin(φ) − 2sin(φ)³), |f| ≤ 5r | a = 0

```

### Niveau 3

```
Soit f(x, y) = (1 − cos(2(x² + y²)))/(x² + y²)² si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [tap, suivre l'erreur, menu steps]  (1 − cos(2((rcos(φ))² + (rsin(φ))²)))/((rcos(φ))² + (rsin(φ))²)²
    ? Où faut-il étudier la continuité de f ? · Nulle part : f est un quotient de fonctions continues / ✔ Seulement en (0, 0), où la formule change / · Sur les axes x = 0 et y = 0
    = (1 − cos(2r²))/r⁴   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (1 − cos(2r²))/r⁴  [juge limit]  départ : (1 − cos(2r²))/r⁴
    = 2   ← (1 − cos(2u))/u² → 2
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 2   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 2

Soit f(x, y) = sin(x² + y²)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [tap, suivre l'erreur, menu steps]  sin((rcos(φ))² + (rsin(φ))²)/((rcos(φ))² + (rsin(φ))²)
    ? Où faut-il étudier la continuité de f ? · Sur les axes x = 0 et y = 0 / ✔ Seulement en (0, 0), où la formule change / · Nulle part : f est un quotient de fonctions continues
    = sin(r²)/r²   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} sin(r²)/r²  [juge limit]  départ : sin(r²)/r²
    = 1   ← sin(u)/u → 1
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 1   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 1
  pièges : g3_linear, g3_add_sign

Soit f(x, y) = (e^(3(x² + y²)) − 1)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [tap, suivre l'erreur, menu steps]  (e^(3((rcos(φ))² + (rsin(φ))²)) − 1)/((rcos(φ))² + (rsin(φ))²)
    ? Où faut-il étudier la continuité de f ? · Sur les axes x = 0 et y = 0 / ✔ Seulement en (0, 0), où la formule change / · Nulle part : f est un quotient de fonctions continues
    = (e^(3r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (e^(3r²) − 1)/r²  [juge limit]  départ : (e^(3r²) − 1)/r²
    = 3   ← (e^(3u) − 1)/u → 3
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 3   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 3

```

### Niveau 4

```
Soit f(x, y) = (1 − cos(2(x² + y²)))/(x² + y²)² si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [free, suivre l'erreur]  (1 − cos(2((rcos(φ))² + (rsin(φ))²)))/((rcos(φ))² + (rsin(φ))²)²
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (1 − cos(2r²))/r⁴   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (1 − cos(2r²))/r⁴  [juge limit]  départ : (1 − cos(2r²))/r⁴
    = 2   ← (1 − cos(2u))/u² → 2
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 2   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 2

Soit f(x, y) = (e^(2(x² + y²)) − 1)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [free, suivre l'erreur]  (e^(2((rcos(φ))² + (rsin(φ))²)) − 1)/((rcos(φ))² + (rsin(φ))²)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (e^(2r²) − 1)/r²   ← x² + y² = r²
  — Quand r → 0⁺ : lim_{r→0} (e^(2r²) − 1)/r²  [juge limit]  départ : (e^(2r²) − 1)/r²
    = 2   ← (e^(2u) − 1)/u → 2
  — f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 2   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | Pose u = x² + y² = r². | a = 2

Soit f(x, y) = (2x³ + 3xy² − 3y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?
  [free, suivre l'erreur]  (2(rcos(φ))³ + 3(rcos(φ))(rsin(φ))² − 3(rsin(φ))³)/((rcos(φ))² + (rsin(φ))²)
    (Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).)
    = (r³(2cos(φ)³ + 3cos(φ)sin(φ)² − 3sin(φ)³))/r²   ← x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1
    = r(2cos(φ)³ + 3cos(φ)sin(φ)² − 3sin(φ)³)   ← Simplifier par r²
  — Majoration de |f − 0| = |r(2cos(φ)³ + 3cos(φ)sin(φ)² − 3sin(φ)³)|, sans φ :  [juge bound]  départ : r(2cos(φ)³ + 3cos(φ)sin(φ)² − 3sin(φ)³)
    = 8r   ← |cos φ| ≤ 1 et |sin φ| ≤ 1
  — La limite vaut 0 (|f| ≤ 8r → 0). f est continue en (0, 0) si f(0, 0) = lim f :  [juge value]  départ : a
    = 0   ← a = la limite
  aides : Calcule la limite en (0, 0) ; a doit lui être égal. | En polaires : f = r(2cos(φ)³ + 3cos(φ)sin(φ)² − 3sin(φ)³), |f| ≤ 8r | a = 0

```

### Niveau 5

```
Soit f(x, y) = 5x⁴y²/(x⁸ + y⁴) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Alors :
  · f est continue sur ℝ² [a2_lim_lines_only]   · f est continue sauf en (0, 0) : la limite y existe, mais diffère de f(0, 0)   ✔ f est continue sauf en (0, 0) : la limite n'y existe pas   · f n'est continue en aucun point de l'axe x = 0
  pièges : a2_lim_lines_only

Soit f(x, y) = sin(2(x² + y²))/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 1. Alors :
  · f est continue sur ℝ²   ✔ f est continue sauf en (0, 0) : la limite y existe, mais diffère de f(0, 0)   · f est continue sauf en (0, 0) : la limite n'y existe pas   · f n'est continue en aucun point de l'axe x = 0

Soit f(x, y) = (x⁵ + 2x⁴y + 3xy⁴)/(x² + y²)² si (x, y) ≠ (0, 0), et f(0, 0) = 0. Alors :
  ✔ f est continue sur ℝ²   · f est continue sauf en (0, 0) : la limite y existe, mais diffère de f(0, 0)   · f est continue sauf en (0, 0) : la limite n'y existe pas [a2_lim_polar_r_forgot]   · f n'est continue en aucun point de l'axe x = 0
  pièges : a2_lim_polar_r_forgot

```

### Variantes d'examen

```
Soit f(x, y) = y/(3 + sin(1/x)) si x ≠ 0, et f(0, y) = 0. Alors :
  ✔ f est continue en (0, 0), mais pas aux points (0, y) avec y ≠ 0   · f est continue sur ℝ² sauf en (0, 0)   · f est continue sur ℝ² [a2_cont_partial_functions]   · f n'est continue en aucun point de l'axe x = 0
  [examen mcq]
  pièges : a2_cont_partial_functions

Vrai ou faux ?
  « Si f est continue en (0, 0), alors x ↦ f(x, 0) est continue en 0. » → VRAI
  [examen tf]
  pièges : a2_cont_partial_functions

```

## Fonctions continues sur un compact (vrai/faux) (`a2-compact-extreme`, BA2)

_Bornes atteintes sur un fermé borné ; un contre-exemple quand une hypothèse manque._

### Niveau 1

```
Théorème des bornes atteintes : soit D ⊂ ℝⁿ non vide et f : D → ℝ continue. Si … , alors f est bornée et atteint son minimum et son maximum. Quelle hypothèse sur D ?
  · D borné [a2_compact_open]   ✔ D fermé et borné   · D fermé [a2_compact_open]   · D ouvert et borné [a2_compact_open]
  pièges : a2_compact_open

Théorème des bornes atteintes : soit D ⊂ ℝⁿ non vide et f : D → ℝ continue. Si … , alors f est bornée et atteint son minimum et son maximum. Quelle hypothèse sur D ?
  · D borné [a2_compact_open]   · D ouvert et borné [a2_compact_open]   · D fermé [a2_compact_open]   ✔ D fermé et borné
  pièges : a2_compact_open

Sur lequel de ces ensembles toute fonction continue atteint-elle son maximum ?
  ✔ le carré fermé [−2 ; 2] × [−2 ; 2]   · l'intervalle ouvert ]0 ; 1[ ⊂ ℝ [a2_compact_open]   · le disque épointé {(x, y) : 0 < x² + y² ≤ 4} [a2_compact_open]   · le demi-plan fermé {(x, y) : y ≥ 0} [a2_compact_open]
  pièges : a2_compact_open

```

### Niveau 2

```
Vrai ou faux ? « Soit D l'ellipse pleine {(x, y) : x² + 4y² ≤ 4}. Toute fonction continue f : D → ℝ atteint son maximum sur D. »
  · Faux : f(x, y) = cos(x) est un contre-exemple   ✔ Vrai   · Faux : f(x, y) = sin(y)² est un contre-exemple   · Faux : f(x, y) = e^(−x² − y²) est un contre-exemple

Vrai ou faux ? « Soit D l'ellipse pleine {(x, y) : x² + 4y² ≤ 4}. Toute fonction continue f : D → ℝ atteint son maximum sur D. »
  · Faux : f(x, y) = sin(y)² est un contre-exemple   · Faux : f(x, y) = e^(−x² − y²) est un contre-exemple   ✔ Vrai   · Faux : f(x, y) = cos(x) est un contre-exemple

Vrai ou faux ? « Soit D le disque ouvert {(x, y) : x² + y² < 9}. Toute fonction continue f : D → ℝ atteint son maximum sur D. »
  · Faux : f(x, y) = cos(x) est un contre-exemple   · Faux : f(x, y) = e^(−x² − y²) est un contre-exemple   · Vrai [a2_compact_open]   ✔ Faux : f(x, y) = x est un contre-exemple
  pièges : a2_compact_open

```

### Niveau 3

```
« Soit D le disque ouvert {(x, y) : x² + y² < 1}. Toute fonction continue f : D → ℝ atteint son maximum sur D. » Cet énoncé est faux. Quelle hypothèse du théorème des bornes atteintes manque ?
  · f devrait être dérivable   ✔ D devrait être fermé   · D devrait être borné   · D devrait être ouvert [a2_compact_open]
  pièges : a2_compact_open

« Soit D l'intervalle ouvert ]0 ; 1[ ⊂ ℝ. Toute fonction continue f : D → ℝ est bornée. » Cet énoncé est faux. Quelle hypothèse du théorème des bornes atteintes manque ?
  · f devrait être dérivable   ✔ D devrait être fermé   · D devrait être ouvert [a2_compact_open]   · D devrait être borné
  pièges : a2_compact_open

« Soit D le demi-plan fermé {(x, y) : y ≥ 0}. Toute fonction continue f : D → ℝ est bornée. » Cet énoncé est faux. Quelle hypothèse du théorème des bornes atteintes manque ?
  ✔ D devrait être borné   · D devrait être fermé   · D devrait être ouvert [a2_compact_open]   · f devrait être dérivable
  pièges : a2_compact_open

```

### Niveau 4

```
Vrai ou faux ?
  « Il existe une fonction continue et non bornée sur le disque épointé {(x, y) : 0 < x² + y² ≤ 1}. » → VRAI
  aides : Le théorème des bornes atteintes demande D fermé, borné, non vide, et f continue. | Vérifie chaque hypothèse du théorème. | Vrai : f(x, y) = 1/(x² + y²). Le disque épointé n'est pas fermé.
  pièges : a2_compact_open

Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
  « Soit D l'intervalle ouvert ]0 ; 1[ ⊂ ℝ. Toute fonction continue f : D → ℝ atteint son minimum sur D. » → FAUX
    contre-exemple (a2) : f = x
  aides : Le théorème des bornes atteintes demande D fermé, borné, non vide, et f continue. | Une hypothèse manque : essaie une fonction constante, 1/x, x, ou une fonction qui explose au bord. | Faux : D n'est pas fermé. Par exemple f(x) = x est continue sur D et n'atteint pas son minimum.
  pièges : a2_compact_open

Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
  « Si D ⊂ ℝ² est ouvert et f : D → ℝ continue, alors f n'est pas bornée. » → FAUX
    contre-exemple (a2) : f = 0
  aides : Le théorème des bornes atteintes demande D fermé, borné, non vide, et f continue. | Une hypothèse manque : essaie une fonction constante, 1/x, x, ou une fonction qui explose au bord. | Faux : f ≡ 0 est continue et bornée sur l'ouvert ℝ².
  pièges : a2_compact_open

```

### Niveau 5

```
Cinq énoncés : vrai ou faux ? Quand c'est faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « Soit D le disque épointé {(x, y) : 0 < x² + y² ≤ 9}. Toute fonction continue f : D → ℝ est bornée. » → FAUX
      contre-exemple (a2) : f = 1/(x^2+y^2)
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Soit D l'ellipse pleine {(x, y) : x² + 4y² ≤ 4}. La fonction f(x, y) = x³ − 3xy² atteint son maximum sur D. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « Soit D le plan ℝ². Toute fonction continue f : D → ℝ atteint son maximum sur D. » → FAUX
      contre-exemple (a2) : f = x
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Soit D le carré fermé [−3 ; 3] × [−3 ; 3]. La fonction f(x, y) = ln(1 + x² + y²) atteint son maximum sur D. » → VRAI
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ?
    « Il existe une fonction continue et non bornée sur le disque épointé {(x, y) : 0 < x² + y² ≤ 1}. » → VRAI
  pièges : a2_compact_open

Cinq énoncés : vrai ou faux ? Quand c'est faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « Soit D le plan ℝ². Toute fonction continue f : D → ℝ atteint son maximum sur D. » → FAUX
      contre-exemple (a2) : f = x
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Soit D le carré fermé [−2 ; 2] × [−2 ; 2]. La fonction f(x, y) = cos(cos(x − y²)) atteint son maximum sur D. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « Soit D le disque ouvert {(x, y) : x² + y² < 1}. Toute fonction continue f : D → ℝ atteint son minimum sur D. » → FAUX
      contre-exemple (a2) : f = x
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « L'image d'un ouvert de ℝ² par une fonction continue f : ℝ² → ℝ est un ouvert de ℝ. » → FAUX
      contre-exemple (a2) : f = x^2+y^2
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ? Si c'est faux, donne une fonction qui le montre.
    « Soit D le demi-plan fermé {(x, y) : y ≥ 0}. Toute fonction continue f : D → ℝ est bornée. » → FAUX
      contre-exemple (a2) : f = y
  pièges : a2_compact_open, a2_open_image

Cinq énoncés : vrai ou faux ? Quand c'est faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Soit D le disque fermé {(x, y) : x² + y² ≤ 9}. Toute fonction continue f : D → ℝ atteint son maximum sur D. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Soit D l'anneau fermé {(x, y) : 1 ≤ x² + y² ≤ 4}. Toute fonction continue f : D → ℝ atteint son maximum sur D. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f : ℝ² → ℝ est continue et V ⊂ ℝ ouvert, alors f⁻¹(V) est un ouvert de ℝ². » → VRAI
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Soit D le carré fermé [−1 ; 1] × [−1 ; 1]. Toute fonction continue f : D → ℝ est bornée. » → VRAI
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ?
    « Soit D l'anneau fermé {(x, y) : 1 ≤ x² + y² ≤ 16}. Toute fonction continue f : D → ℝ est bornée. » → VRAI

```

### Variantes d'examen

```
Vrai ou faux ?
  « Soit D l'ellipse pleine {(x, y) : x² + 4y² ≤ 4}. Toute fonction continue f : D → ℝ atteint son minimum sur D. » → VRAI
  [examen tf]

```

## Dérivées partielles, gradient, jacobienne, dérivées d'ordre 2 (`a2-partials`, BA2)

_Dériver en une variable, les autres fixées ; une ligne de J_u par composante._

### Niveau 1

```
Soit f(x, y) = 2xy. Calcule ∂f/∂x et ∂f/∂y, puis ∇f(−2 ; 2).
  [guided]  ∂/∂x (2xy)
    (On dérive en x : y est une constante.)
    = □   (trous : 2y)   ← ∂f/∂x : y est une constante
  — Puis la dérivée par rapport à y :  [juge equiv]  départ : ∂/∂y (2xy)
    = □   (trous : 2x)   ← ∂f/∂y : x est une constante
  — Le gradient au point (−2 ; 2) :  [juge mat]  départ : ∇f
    = (4 ; -4)   (cases à remplir : (1,1) (2,1))   ← On remplace x et y par les coordonnées du point
  aides : ∂f/∂x : dérive en x, y étant une constante (et inversement). | ∂f/∂x = 2y | ∇f(−2 ; 2) = (4 ; -4)

Soit f(x, y) = sin(2xy) + 2xy − x². Calcule ∂f/∂x et ∂f/∂y, puis ∇f(0 ; −2).
  [guided]  ∂/∂x (sin(2xy) + 2xy − x²)
    (On dérive en x : y est une constante.)
    = □ + 2y − 2x   (trous : 2ycos(2xy) + 2y − 2x)   ← ∂f/∂x : y est une constante
  — Puis la dérivée par rapport à y :  [juge equiv]  départ : ∂/∂y (sin(2xy) + 2xy − x²)
    = □ + 2x   (trous : 2xcos(2xy) + 2x)   ← ∂f/∂y : x est une constante
  — Le gradient au point (0 ; −2) :  [juge mat]  départ : ∇f
    = (-8 ; 0)   (cases à remplir : (1,1) (2,1))   ← On remplace x et y par les coordonnées du point
  aides : ∂f/∂x : dérive en x, y étant une constante (et inversement). | ∂f/∂x = 2ycos(2xy) + 2y − 2x | ∇f(0 ; −2) = (-8 ; 0)
  pièges : g6_chain_forgot, g6_cos_sign

Soit f(x, y) = −3xy − 3x²y. Calcule ∂f/∂x et ∂f/∂y, puis ∇f(0 ; −2).
  [guided]  ∂/∂x (−3xy − 3x²y)
    (On dérive en x : y est une constante.)
    = □ − 6xy   (trous : −3y − 6xy)   ← ∂f/∂x : y est une constante
  — Puis la dérivée par rapport à y :  [juge equiv]  départ : ∂/∂y (−3xy − 3x²y)
    = □ − 3x²   (trous : −3x − 3x²)   ← ∂f/∂y : x est une constante
  — Le gradient au point (0 ; −2) :  [juge mat]  départ : ∇f
    = (6 ; 0)   (cases à remplir : (1,1) (2,1))   ← On remplace x et y par les coordonnées du point
  aides : ∂f/∂x : dérive en x, y étant une constante (et inversement). | ∂f/∂x = −3y − 6xy | ∇f(0 ; −2) = (6 ; 0)

```

### Niveau 2

```
Soit u(x, y) = (y², sin(xy)). Calcule la matrice jacobienne J_u, puis J_u(−1 ; 0).
  [guided]  J_u
    (2 composantes, 2 variables : J_u est de taille 2 × 2 (une ligne par composante, une colonne par variable).)
    = [[0,2y],[ycos(xy),xcos(xy)]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← Une ligne par composante, une colonne par variable (2 × 2)
  — Au point (−1 ; 0) :  [juge mat]  départ : J_u
    = [[0,0],[0,-1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 2 × 2. | Ligne 1 : (0, 2y) | J_u(−1 ; 0) = [[0,0],[0,-1]]
  pièges : a2_jacobian_transposed

Soit u(x, y) = (3xy², −x²). Calcule la matrice jacobienne J_u, puis J_u(2 ; 2).
  [guided]  J_u
    (2 composantes, 2 variables : J_u est de taille 2 × 2 (une ligne par composante, une colonne par variable).)
    = [[3y^2,6xy],[-2x,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← Une ligne par composante, une colonne par variable (2 × 2)
  — Au point (2 ; 2) :  [juge mat]  départ : J_u
    = [[12,24],[-4,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 2 × 2. | Ligne 1 : (3y², 6xy) | J_u(2 ; 2) = [[12,24],[-4,0]]
  pièges : a2_jacobian_transposed

Soit u(x, y, z) = (−2yz² + 2y, y/z − 2x² + xz). Calcule la matrice jacobienne J_u, puis J_u(0 ; −1 ; 1).
  [guided]  J_u
    (2 composantes, 3 variables : J_u est de taille 2 × 3 (une ligne par composante, une colonne par variable).)
    = [[0,-2z^2+2,-4yz],[-4x+z,1/z,-y/z^2+x]]   (cases à remplir : (1,1) (1,2) (1,3) (2,1) (2,2) (2,3))   ← Une ligne par composante, une colonne par variable (2 × 3)
  — Au point (0 ; −1 ; 1) :  [juge mat]  départ : J_u
    = [[0,0,4],[1,1,1]]   (cases à remplir : (1,1) (1,2) (1,3) (2,1) (2,2) (2,3))   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 2 × 3. | Ligne 1 : (0, −2z² + 2, −4yz) | J_u(0 ; −1 ; 1) = [[0,0,4],[1,1,1]]
  pièges : a2_jacobian_transposed

```

### Niveau 3

```
Soit u(x, y) = (x/y, sin(xy) + 3y² + 2xy, x/y). Calcule la matrice jacobienne J_u, puis J_u(0 ; 1).
  [tap, suivre l'erreur, menu menu]  J_u
    ? Quelle taille a J_u ? ✔ 3 lignes, 2 colonnes / · 2 lignes, 3 colonnes / · 3 lignes, 3 colonnes
    = [[1/y,-x/y^2],[ycos(xy)+2y,xcos(xy)+6y+2x],[1/y,-x/y^2]]   ← Une ligne par composante, une colonne par variable (3 × 2)
  — Au point (0 ; 1) :  [juge mat]  départ : J_u
    = [[1,0],[3,6],[1,0]]   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 3 × 2. | Ligne 1 : (1/y, −x/y²) | J_u(0 ; 1) = [[1,0],[3,6],[1,0]]
  pièges : a2_jacobian_transposed

Soit u(x, y) = (x/y + 3x², x/y). Calcule la matrice jacobienne J_u, puis J_u(0 ; −1).
  [tap, suivre l'erreur, menu menu]  J_u
    ? Quelle taille a J_u ? ✔ 2 lignes, 2 colonnes / · 2 lignes, 3 colonnes / · 3 lignes, 2 colonnes
    = [[1/y+6x,-x/y^2],[1/y,-x/y^2]]   ← Une ligne par composante, une colonne par variable (2 × 2)
  — Au point (0 ; −1) :  [juge mat]  départ : J_u
    = [[-1,0],[-1,0]]   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 2 × 2. | Ligne 1 : (1/y + 6x, −x/y²) | J_u(0 ; −1) = [[-1,0],[-1,0]]
  pièges : a2_jacobian_transposed

Soit u(x, y, z) = (−3yz² + 2xy, 2xyz − y²). Calcule la matrice jacobienne J_u, puis J_u(−2 ; 0 ; −2).
  [tap, suivre l'erreur, menu menu]  J_u
    ? Quelle taille a J_u ? ✔ 2 lignes, 3 colonnes / · 3 lignes, 2 colonnes / · 2 lignes, 4 colonnes
    = [[2y,-3z^2+2x,-6yz],[2yz,2xz-2y,2xy]]   ← Une ligne par composante, une colonne par variable (2 × 3)
  — Au point (−2 ; 0 ; −2) :  [juge mat]  départ : J_u
    = [[0,-16,0],[0,8,0]]   ← On évalue chaque case au point
  aides : Une ligne par composante, une colonne par variable : J_u est 2 × 3. | Ligne 1 : (2y, −3z² + 2x, −6yz) | J_u(−2 ; 0 ; −2) = [[0,-16,0],[0,8,0]]
  pièges : a2_jacobian_transposed

```

### Niveau 4

```
Soit f(x, y) = 2y² + 2xy + e^(xy). Calcule ∂f/∂x, puis les deux dérivées croisées ∂²f/∂y∂x et ∂²f/∂x∂y.
  [free, suivre l'erreur]  ∂/∂x (2y² + 2xy + e^(xy))
    = 2y + ye^(xy)   ← Dérivée en x
  — Dérive ∂f/∂x par rapport à y :  [juge equiv]  départ : ∂/∂y (∂/∂x (2y² + 2xy + e^(xy)))
    = 2 + e^(xy) + xye^(xy)   ← On dérive ∂f/∂x en y
  — Puis dans l’autre ordre (∂f/∂y, puis en x) :  [juge equiv]  départ : ∂/∂x (∂/∂y (2y² + 2xy + e^(xy)))
    = 2 + e^(xy) + xye^(xy)   ← Le même résultat : f est C², le théorème de Schwarz s’applique
  aides : ∂²f/∂y∂x : on dérive ∂f/∂x par rapport à y. | ∂f/∂x = 2y + ye^(xy) | ∂²f/∂y∂x = 2 + e^(xy) + xye^(xy)
  pièges : g6_chain_forgot, g6_power_rule_exp

Soit f(x, y) = −3x²y + e^(xy). Calcule ∂f/∂x, puis les deux dérivées croisées ∂²f/∂y∂x et ∂²f/∂x∂y.
  [free, suivre l'erreur]  ∂/∂x (−3x²y + e^(xy))
    = −6xy + ye^(xy)   ← Dérivée en x
  — Dérive ∂f/∂x par rapport à y :  [juge equiv]  départ : ∂/∂y (∂/∂x (−3x²y + e^(xy)))
    = −6x + e^(xy) + xye^(xy)   ← On dérive ∂f/∂x en y
  — Puis dans l’autre ordre (∂f/∂y, puis en x) :  [juge equiv]  départ : ∂/∂x (∂/∂y (−3x²y + e^(xy)))
    = −6x + e^(xy) + xye^(xy)   ← Le même résultat : f est C², le théorème de Schwarz s’applique
  aides : ∂²f/∂y∂x : on dérive ∂f/∂x par rapport à y. | ∂f/∂x = −6xy + ye^(xy) | ∂²f/∂y∂x = −6x + e^(xy) + xye^(xy)
  pièges : g6_chain_forgot, g6_power_rule_exp

Soit f(x, y) = 2x²y + xy² + sin(2xy). Calcule ∂f/∂x, puis les deux dérivées croisées ∂²f/∂y∂x et ∂²f/∂x∂y.
  [free, suivre l'erreur]  ∂/∂x (2x²y + xy² + sin(2xy))
    = 4xy + y² + 2ycos(2xy)   ← Dérivée en x
  — Dérive ∂f/∂x par rapport à y :  [juge equiv]  départ : ∂/∂y (∂/∂x (2x²y + xy² + sin(2xy)))
    = 4x + 2y + 2cos(2xy) − 4xysin(2xy)   ← On dérive ∂f/∂x en y
  — Puis dans l’autre ordre (∂f/∂y, puis en x) :  [juge equiv]  départ : ∂/∂x (∂/∂y (2x²y + xy² + sin(2xy)))
    = 4x + 2y + 2cos(2xy) − 4xysin(2xy)   ← Le même résultat : f est C², le théorème de Schwarz s’applique
  aides : ∂²f/∂y∂x : on dérive ∂f/∂x par rapport à y. | ∂f/∂x = 4xy + y² + 2ycos(2xy) | ∂²f/∂y∂x = 4x + 2y + 2cos(2xy) − 4xysin(2xy)
  pièges : g6_chain_forgot, g6_cos_sign

```

### Niveau 5

```
Soit u(x, y, z) = (sin(yz) − 3y² + 2xy, sin(xy) + 2xz). La matrice jacobienne J_u(2 ; 0 ; 2) vaut :
  · [[0,6],[4,2]]   · [[4,2,4],[0,6,0]]   ✔ [[0,6,0],[4,2,4]]   · [[0,4],[6,2],[0,4]] [a2_jacobian_transposed]
  pièges : a2_jacobian_transposed

Soit u(x, y, z) = (−x²z + 3y², sin(2xz) + 2xy). La matrice jacobienne J_u(1 ; 1 ; 0) vaut :
  ✔ [[0,6,-1],[2,2,2]]   · [[2,2,2],[0,6,-1]]   · [[0,2],[6,2],[-1,2]] [a2_jacobian_transposed]   · [[0,6],[2,2]]
  pièges : a2_jacobian_transposed

Soit u(x, y) = (−xy + 3x, 3xy²). La matrice jacobienne J_u(−1 ; 2) vaut :
  · [[-1,1],[12,-12]]   ✔ [[1,1],[12,-12]]   · [[1,12],[1,-12]] [a2_jacobian_transposed]   · [[12,-12],[1,1]]
  pièges : a2_jacobian_transposed

```

### Variantes d'examen

```
Soit u(x, y, z) = (e^(xy) − yz, sin(xy)). La matrice jacobienne J_u(−1 ; 0 ; −2) vaut :
  ✔ [[0,1,0],[0,-1,0]]   · [[0,0],[1,-1],[0,0]] [a2_jacobian_transposed]   · [[0,-1,0],[0,1,0]]   · [[0,1],[0,-1]]
  [examen mcq]
  pièges : a2_jacobian_transposed

Vrai ou faux ?
  « Si f ∈ C²(ℝ²), alors ∂/∂y(∂f/∂x) = ∂/∂x(∂f/∂y). » → VRAI
  [examen tf]

```

## Dérivées partielles et directionnelles par la définition (`a2-dir-deriv-def`, BA2)

_D_v f(a) = lim (f(a + tv) − f(a))/t, sans passer par ∇f·v._

### Niveau 1

```
Soit f(x, y) = y³/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (1/√2 ; 1/√2).
  [guided]  (((√2/2)t)³/(((√2/2)t)² + ((√2/2)t)²) − 0)/t
    (f(tv) = f((√2/2)t ; (√2/2)t), et f(0, 0) = 0 :)
    = ((√2/4)t)/t   ← Simplifier f(tv)
    = □   (trous : √2/4)   ← Simplifier par t
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = √2/4 | Dvf(0, 0) = √2/4
  pièges : a2_dirderiv_power

Soit f(x, y) = 5x²y/(x⁴ + 2y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (−1/√2 ; 1/√2).
  [guided]  (5((−√2/2)t)²((√2/2)t)/(((−√2/2)t)⁴ + 2((√2/2)t)²) − 0)/t
    (f(tv) = f((−√2/2)t ; (√2/2)t), et f(0, 0) = 0 :)
    = ((□)t/((1/4)t² + 1))/t   (trous : ((5√2/4)t/((1/4)t² + 1))/t)   ← Simplifier f(tv)
    = (5√2/4)/((1/4)t² + 1)   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (5√2/4)/((1/4)t² + 1)  [juge limit]  départ : (5√2/4)/((1/4)t² + 1)
    = □   (trous : 5√2/4)   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (5√2/4)/((1/4)t² + 1) | Dvf(0, 0) = 5√2/4
  pièges : a2_dirderiv_power

Soit f(x, y) = 3x²y/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (0 ; 1).
  [guided]  (3(0)²(t)/((0)² + (t)²) − 0)/t
    (f(tv) = f(0 ; t), et f(0, 0) = 0 :)
    = (0t)/t   ← Simplifier f(tv)
    = □   (trous : 0)   ← Simplifier par t
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = 0 | Dvf(0, 0) = 0
  pièges : a2_dirderiv_power

```

### Niveau 2

```
Soit f(x, y) = x²y/(x⁴ + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (1/√2 ; 1/√2).
  [guided]  (((√2/2)t)²((√2/2)t)/(((√2/2)t)⁴ + ((√2/2)t)²) − 0)/t
    (f(tv) = f((√2/2)t ; (√2/2)t), et f(0, 0) = 0 :)
    = ((□)t/((1/4)t² + 1/2))/t   (trous : ((√2/4)t/((1/4)t² + 1/2))/t)   ← Simplifier f(tv)
    = (√2/4)/((1/4)t² + □)   (trous : (√2/4)/((1/4)t² + 1/2))   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (√2/4)/((1/4)t² + 1/2)  [juge limit]  départ : (√2/4)/((1/4)t² + 1/2)
    ? Quelle est la limite quand t → 0 ? ✔ √2/2 : le terme en t du dénominateur disparaît / · La limite n'existe pas : le dénominateur s'annule / · 0, car t → 0
    = □   (trous : √2/2)   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (√2/4)/((1/4)t² + 1/2) | Dvf(0, 0) = √2/2
  pièges : a2_dirderiv_power

Soit f(x, y) = x²y/(x⁴ + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (1/2 ; √3/2).
  [guided]  (((1/2)t)²((√3/2)t)/(((1/2)t)⁴ + ((√3/2)t)²) − 0)/t
    (f(tv) = f((1/2)t ; (√3/2)t), et f(0, 0) = 0 :)
    = ((□)t/((1/16)t² + 3/4))/t   (trous : ((√3/8)t/((1/16)t² + 3/4))/t)   ← Simplifier f(tv)
    = (√3/8)/((1/16)t² + □)   (trous : (√3/8)/((1/16)t² + 3/4))   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (√3/8)/((1/16)t² + 3/4)  [juge limit]  départ : (√3/8)/((1/16)t² + 3/4)
    ? Quelle est la limite quand t → 0 ? · La limite n'existe pas : le dénominateur s'annule / · 0, car t → 0 / ✔ √3/6 : le terme en t du dénominateur disparaît
    = □   (trous : √3/6)   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (√3/8)/((1/16)t² + 3/4) | Dvf(0, 0) = √3/6
  pièges : a2_dirderiv_power

Soit f(x, y) = 5x²y/(x⁴ + 3y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (4/5 ; −3/5).
  [guided]  (5((4/5)t)²((−3/5)t)/(((4/5)t)⁴ + 3((−3/5)t)²) − 0)/t
    (f(tv) = f((4/5)t ; (−3/5)t), et f(0, 0) = 0 :)
    = ((□)t/((256/625)t² + 27/25))/t   (trous : ((−48/25)t/((256/625)t² + 27/25))/t)   ← Simplifier f(tv)
    = (−48/25)/((256/625)t² + □)   (trous : (−48/25)/((256/625)t² + 27/25))   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (−48/25)/((256/625)t² + 27/25)  [juge limit]  départ : (−48/25)/((256/625)t² + 27/25)
    ? Quelle est la limite quand t → 0 ? · 0, car t → 0 / · La limite n'existe pas : le dénominateur s'annule / ✔ −16/9 : le terme en t du dénominateur disparaît
    = □   (trous : −16/9)   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (−48/25)/((256/625)t² + 27/25) | Dvf(0, 0) = −16/9
  pièges : a2_dirderiv_power

```

### Niveau 3

```
Soit f(x, y) = −2x³/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (−3/5 ; 4/5).
  [tap, suivre l'erreur, menu steps]  (−2((−3/5)t)³/(((−3/5)t)² + ((4/5)t)²) − 0)/t
    ? Comment calculer D_v f(0, 0) ? ✔ Par la définition : limite de (f(tv) − f(0, 0))/t / · Par la formule ∇f(0, 0)·v
    (f(tv) = f((−3/5)t ; (4/5)t), et f(0, 0) = 0 :)
    = ((54/125)t)/t   ← Simplifier f(tv)
    = 54/125   ← Simplifier par t
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = 54/125 | Dvf(0, 0) = 54/125
  pièges : a2_dirderiv_power, a2_dirderiv_gradient

Soit f(x, y) = 5x²y/(x⁴ + 3y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (√3/2 ; 1/2).
  [tap, suivre l'erreur, menu steps]  (5((√3/2)t)²((1/2)t)/(((√3/2)t)⁴ + 3((1/2)t)²) − 0)/t
    ? Comment calculer D_v f(0, 0) ? · Par la formule ∇f(0, 0)·v / ✔ Par la définition : limite de (f(tv) − f(0, 0))/t
    (f(tv) = f((√3/2)t ; (1/2)t), et f(0, 0) = 0 :)
    = ((15/8)t/((9/16)t² + 3/4))/t   ← Simplifier f(tv)
    = (15/8)/((9/16)t² + 3/4)   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (15/8)/((9/16)t² + 3/4)  [juge limit]  départ : (15/8)/((9/16)t² + 3/4)
    = 5/2   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (15/8)/((9/16)t² + 3/4) | Dvf(0, 0) = 5/2
  pièges : a2_dirderiv_power, a2_dirderiv_gradient

Soit f(x, y) = −2xy⁴/(x⁴ + y⁸) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (1/2 ; √3/2).
  [tap, suivre l'erreur, menu steps]  (−2((1/2)t)((√3/2)t)⁴/(((1/2)t)⁴ + ((√3/2)t)⁸) − 0)/t
    ? Comment calculer D_v f(0, 0) ? ✔ Par la définition : limite de (f(tv) − f(0, 0))/t / · Par la formule ∇f(0, 0)·v
    (f(tv) = f((1/2)t ; (√3/2)t), et f(0, 0) = 0 :)
    = ((−9/16)t/(1/16 + (81/256)t⁴))/t   ← Simplifier f(tv)
    = (−9/16)/(1/16 + (81/256)t⁴)   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (−9/16)/(1/16 + (81/256)t⁴)  [juge limit]  départ : (−9/16)/(1/16 + (81/256)t⁴)
    = −9   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (−9/16)/(1/16 + (81/256)t⁴) | Dvf(0, 0) = −9
  pièges : a2_dirderiv_power, a2_dirderiv_gradient

```

### Niveau 4

```
Soit f(x, y) = 5xy⁴/(x⁴ + 3y⁸) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (−1/√2 ; 1/√2).
  [free, suivre l'erreur]  (5((−√2/2)t)((√2/2)t)⁴/(((−√2/2)t)⁴ + 3((√2/2)t)⁸) − 0)/t
    (f(tv) = f((−√2/2)t ; (√2/2)t), et f(0, 0) = 0 :)
    = ((−5√2/8)t/(1/4 + (3/16)t⁴))/t   ← Simplifier f(tv)
    = (−5√2/8)/(1/4 + (3/16)t⁴)   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (−5√2/8)/(1/4 + (3/16)t⁴)  [juge limit]  départ : (−5√2/8)/(1/4 + (3/16)t⁴)
    = −5√2/2   ← Remplacer t par 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (−5√2/8)/(1/4 + (3/16)t⁴) | Dvf(0, 0) = −5√2/2
  pièges : a2_dirderiv_power

Soit f(x, y) = 2·|x|³·y/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (1/2 ; √3/2).
  [free, suivre l'erreur]  (2·|((1/2)t)|³·((√3/2)t)/(((1/2)t)² + ((√3/2)t)²) − 0)/t
    (f(tv) = f((1/2)t ; (√3/2)t), et f(0, 0) = 0 :)
    = ((√3/8)t·|t|)/t   ← Simplifier f(tv)
    = (√3/8)·|t|   ← Simplifier par t
  — Quand t → 0 : lim_{t→0} (√3/8)·|t|  [juge limit]  départ : (√3/8)·|t|
    = 0   ← |t| → 0
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = (√3/8)·|t| | Dvf(0, 0) = 0
  pièges : a2_dirderiv_power

Soit f(x, y) = 5y³/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Calcule Dvf(0, 0) par la définition, pour v = (4/5 ; 3/5).
  [free, suivre l'erreur]  (5((3/5)t)³/(((4/5)t)² + ((3/5)t)²) − 0)/t
    (f(tv) = f((4/5)t ; (3/5)t), et f(0, 0) = 0 :)
    = ((27/25)t)/t   ← Simplifier f(tv)
    = 27/25   ← Simplifier par t
  aides : Applique la définition : remplace (x, y) par t·v, retranche f(0, 0) = 0 et divise par t. | f(tv)/t = 27/25 | Dvf(0, 0) = 27/25
  pièges : a2_dirderiv_power

```

### Niveau 5

```
Soit f(x, y) = 2x²y/(x⁴ + 3y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Pour v = (4/5 ; 3/5), Dvf(0, 0) =
  · n'existe pas [a2_dirderiv_power]   ✔ 32/45   · 0 [a2_dirderiv_gradient]   · −32/45
  pièges : a2_dirderiv_gradient, a2_dirderiv_power

Soit f(x, y) = 2x²y/(x⁴ + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Pour v = (4/5 ; −3/5), Dvf(0, 0) =
  · 0 [a2_dirderiv_gradient]   ✔ −32/15   · 32/15   · n'existe pas [a2_dirderiv_power]
  pièges : a2_dirderiv_gradient, a2_dirderiv_power

Soit f(x, y) = 2xy⁴/(x⁴ + 3y⁸) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Pour v = (−1/√2 ; 1/√2), Dvf(0, 0) =
  · n'existe pas [a2_dirderiv_power]   ✔ −√2   · √2   · 0 [a2_dirderiv_gradient]
  pièges : a2_dirderiv_gradient, a2_dirderiv_power

```

### Variantes d'examen

```
Soit f(x, y) = 3xy⁴/(x⁴ + 2y⁸) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Pour v = (1/√2 ; 1/√2), Dvf(0, 0) =
  · −3√2/2   ✔ 3√2/2   · n'existe pas [a2_dirderiv_power]   · 0 [a2_dirderiv_gradient]
  [examen mcq]
  pièges : a2_dirderiv_gradient, a2_dirderiv_power

Vrai ou faux ?
  « Si f est de classe C¹, la dérivée directionnelle de f en (0, 0) suivant v = (1 ; 1)/√2 vaut lim(h, k)→(0, 0) (f(h, k) − f(0, 0))/√(h² + k²). » → FAUX
    contre-exemple (a2) : f = x
  [examen tf]

```

## Différentiabilité en un point par la définition (`a2-diff-def`, BA2)

_Dérivées partielles, reste R(h), puis R/‖h‖ → 0 en polaires._

### Niveau 1

```
Soit f(x, y) = x + 3y − y⁴/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  x + 3y − y⁴/(x² + y²) − (x + 3y)
    (∂f/∂x(0, 0) = 1 et ∂f/∂y(0, 0) = 3.)
    (Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (x + 3y) :)
    = −y⁴/(x² + y²)   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (−(rsin(φ))⁴/((rcos(φ))² + (rsin(φ))²))/r
    = −□sin(φ)⁴   (trous : −rsin(φ)⁴)   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : −rsin(φ)⁴
    = r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = −y⁴/(x² + y²) | |R/‖(x, y)‖| ≤ r → 0 : f est différentiable.

Soit f(x, y) = x + 3(x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  x + 3(x² + y²)sin(1/√(x² + y²)) − (x)
    (∂f/∂x(0, 0) = 1 et ∂f/∂y(0, 0) = 0.)
    (Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (x) :)
    = 3(□)sin(1/√(x² + y²))   (trous : 3(x² + y²)sin(1/√(x² + y²)))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (3((rcos(φ))² + (rsin(φ))²)sin(1/√((rcos(φ))² + (rsin(φ))²)))/r
    = 3□sin(1/r)   (trous : 3rsin(1/r))   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : 3rsin(1/r)
    = 3r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = 3(x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ 3r → 0 : f est différentiable.
  pièges : g3_reduce_swap

Soit f(x, y) = (3x²y − y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  (3x²y − y³)/(x² + y²) − (−y)
    (∂f/∂x(0, 0) = 0 et ∂f/∂y(0, 0) = −1.)
    (Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (−y) :)
    = (3x²y − y³ − (−y)(x² + y²))/(x² + y²)   ← Même dénominateur
    = 4x²y/(□)   (trous : 4x²y/(x² + y²))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (4(rcos(φ))²(rsin(φ))/((rcos(φ))² + (rsin(φ))²))/r
    = 4cos(φ)²sin(φ)   ← Simplifier par r
  — Valeur de R/‖(x, y)‖ pour φ = π/4 :  [juge value]  départ : 4cos(π/4)²sin(π/4)
    (R/‖(x, y)‖ ne dépend que de φ : sa limite n'est pas 0. f n'est pas différentiable en (0, 0).)
    = √2   ← cos(π/4) = sin(π/4) = √2/2
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = 4x²y/(x² + y²) | R/‖(x, y)‖ = 4cos(φ)²sin(φ) vaut √2 pour φ = π/4 : f n'est pas différentiable.

```

### Niveau 2

```
Soit f(x, y) = 3y + 2(x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  (2t²sin(1/√(t²)) − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 0   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (3t + 2t²sin(1/√(t²)) − 0)/t
    = 3   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (3y) :  [juge equiv]  départ : 3y + 2(x² + y²)sin(1/√(x² + y²)) − (3y)
    = 2(□)sin(1/√(x² + y²))   (trous : 2(x² + y²)sin(1/√(x² + y²)))   ← Simplifier
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : 2rsin(1/r)
    (En polaires, R/‖(x, y)‖ = 2rsin(1/r).)
    = 2r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = 2(x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ 2r → 0 : f est différentiable.
  pièges : a1_bh_quotient_rule

Soit f(x, y) = (−x³ − 3x²y + y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  (−t³/t² − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = −1   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (t³/t² − 0)/t
    = 1   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (−x + y) :  [juge equiv]  départ : (−x³ − 3x²y + y³)/(x² + y²) − (−x + y)
    = (−x³ − 3x²y + y³ − (−x + y)(x² + y²))/(x² + y²)   ← Même dénominateur
    = xy(−4x + y)/(□)   (trous : xy(−4x + y)/(x² + y²))   ← Simplifier
  — Valeur de R/‖(x, y)‖ pour φ = π/4 :  [juge value]  départ : cos(π/4)sin(π/4)(−4cos(π/4) + sin(π/4))
    (En polaires, R/‖(x, y)‖ = cos(φ)sin(φ)(−4cos(φ) + sin(φ)).)
    ? R/‖(x, y)‖ ne dépend que de φ. Conclusion ? ✔ Sa limite n'est pas 0 : f n'est pas différentiable en (0, 0) / · Les dérivées partielles existent : f est différentiable en (0, 0) / · R/‖(x, y)‖ est bornée : f est différentiable
    = −3√2/4   ← cos(π/4) = sin(π/4) = √2/2
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = xy(−4x + y)/(x² + y²) | R/‖(x, y)‖ = cos(φ)sin(φ)(−4cos(φ) + sin(φ)) vaut −3√2/4 pour φ = π/4 : f n'est pas différentiable.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a2_partials_imply_diff

Soit f(x, y) = (2x³ − 3x²y + y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [guided]  (2t³/t² − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 2   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (t³/t² − 0)/t
    = 1   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (2x + y) :  [juge equiv]  départ : (2x³ − 3x²y + y³)/(x² + y²) − (2x + y)
    = (2x³ − 3x²y + y³ − (2x + y)(x² + y²))/(x² + y²)   ← Même dénominateur
    = −xy(4x + 2y)/(□)   (trous : −xy(4x + 2y)/(x² + y²))   ← Simplifier
  — Valeur de R/‖(x, y)‖ pour φ = π/4 :  [juge value]  départ : −cos(π/4)sin(π/4)(4cos(π/4) + 2sin(π/4))
    (En polaires, R/‖(x, y)‖ = −cos(φ)sin(φ)(4cos(φ) + 2sin(φ)).)
    ? R/‖(x, y)‖ ne dépend que de φ. Conclusion ? · R/‖(x, y)‖ est bornée : f est différentiable / · Les dérivées partielles existent : f est différentiable en (0, 0) / ✔ Sa limite n'est pas 0 : f n'est pas différentiable en (0, 0)
    = −3√2/2   ← cos(π/4) = sin(π/4) = √2/2
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = −xy(4x + 2y)/(x² + y²) | R/‖(x, y)‖ = −cos(φ)sin(φ)(4cos(φ) + 2sin(φ)) vaut −3√2/2 pour φ = π/4 : f n'est pas différentiable.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a2_partials_imply_diff

```

### Niveau 3

```
Soit f(x, y) = x − y − (x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [tap, suivre l'erreur, menu steps]  (t − t²sin(1/√(t²)) − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 1   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−t − t²sin(1/√(t²)) − 0)/t
    = −1   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (x − y) :  [juge equiv]  départ : x − y − (x² + y²)sin(1/√(x² + y²)) − (x − y)
    = −(x² + y²)sin(1/√(x² + y²))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (−((rcos(φ))² + (rsin(φ))²)sin(1/√((rcos(φ))² + (rsin(φ))²)))/r
    = −rsin(1/r)   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : −rsin(1/r)
    ? Pour conclure ? · Fixer un angle φ / ✔ Majorer |R/‖(x, y)‖| par une fonction de r qui tend vers 0 / · Critère C¹ : les dérivées partielles sont continues en (0, 0)
    = r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = −(x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ r → 0 : f est différentiable.
  pièges : a1_bh_quotient_rule

Soit f(x, y) = (−2x³ − 2y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [tap, suivre l'erreur, menu steps]  (−2t³/t² − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = −2   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−2t³/t² − 0)/t
    = −2   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (−2x − 2y) :  [juge equiv]  départ : (−2x³ − 2y³)/(x² + y²) − (−2x − 2y)
    = (−2x³ − 2y³ − (−2x − 2y)(x² + y²))/(x² + y²)   ← Même dénominateur
    = xy(2x + 2y)/(x² + y²)   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : ((rcos(φ))(rsin(φ))(2(rcos(φ)) + 2(rsin(φ)))/((rcos(φ))² + (rsin(φ))²))/r
    = cos(φ)sin(φ)(2cos(φ) + 2sin(φ))   ← Simplifier par r
  — Valeur de R/‖(x, y)‖ pour φ = π/4 :  [juge value]  départ : cos(π/4)sin(π/4)(2cos(π/4) + 2sin(π/4))
    ? Pour conclure ? · Critère C¹ : les dérivées partielles sont continues en (0, 0) / · Majorer |R/‖(x, y)‖| par une fonction de r qui tend vers 0 / ✔ Fixer un angle φ : R/‖(x, y)‖ y vaut une constante non nulle
    = √2   ← cos(π/4) = sin(π/4) = √2/2
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = xy(2x + 2y)/(x² + y²) | R/‖(x, y)‖ = cos(φ)sin(φ)(2cos(φ) + 2sin(φ)) vaut √2 pour φ = π/4 : f n'est pas différentiable.
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule

Soit f(x, y) = x − 2y + (x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [tap, suivre l'erreur, menu steps]  (t + t²sin(1/√(t²)) − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 1   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−2t + t²sin(1/√(t²)) − 0)/t
    = −2   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (x − 2y) :  [juge equiv]  départ : x − 2y + (x² + y²)sin(1/√(x² + y²)) − (x − 2y)
    = (x² + y²)sin(1/√(x² + y²))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (((rcos(φ))² + (rsin(φ))²)sin(1/√((rcos(φ))² + (rsin(φ))²)))/r
    = rsin(1/r)   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : rsin(1/r)
    ? Pour conclure ? · Critère C¹ : les dérivées partielles sont continues en (0, 0) / · Fixer un angle φ / ✔ Majorer |R/‖(x, y)‖| par une fonction de r qui tend vers 0
    = r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = (x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ r → 0 : f est différentiable.
  pièges : a1_bh_quotient_rule

```

### Niveau 4

```
Soit f(x, y) = 3x + 3y + 3(x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [free, suivre l'erreur]  (3t + 3t²sin(1/√(t²)) − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 3   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (3t + 3t²sin(1/√(t²)) − 0)/t
    = 3   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (3x + 3y) :  [juge equiv]  départ : 3x + 3y + 3(x² + y²)sin(1/√(x² + y²)) − (3x + 3y)
    = 3(x² + y²)sin(1/√(x² + y²))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (3((rcos(φ))² + (rsin(φ))²)sin(1/√((rcos(φ))² + (rsin(φ))²)))/r
    = 3rsin(1/r)   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : 3rsin(1/r)
    = 3r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = 3(x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ 3r → 0 : f est différentiable.
  pièges : a1_bh_quotient_rule

Soit f(x, y) = (xy² − 2y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [free, suivre l'erreur]  (0 − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = 0   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−2t³/t² − 0)/t
    = −2   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (−2y) :  [juge equiv]  départ : (xy² − 2y³)/(x² + y²) − (−2y)
    = (xy² − 2y³ − (−2y)(x² + y²))/(x² + y²)   ← Même dénominateur
    = xy(2x + y)/(x² + y²)   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : ((rcos(φ))(rsin(φ))(2(rcos(φ)) + (rsin(φ)))/((rcos(φ))² + (rsin(φ))²))/r
    = cos(φ)sin(φ)(2cos(φ) + sin(φ))   ← Simplifier par r
  — Valeur de R/‖(x, y)‖ pour φ = π/4 :  [juge value]  départ : cos(π/4)sin(π/4)(2cos(π/4) + sin(π/4))
    ? R/‖(x, y)‖ ne dépend que de φ. Conclusion ? · R/‖(x, y)‖ est bornée : f est différentiable / ✔ Sa limite n'est pas 0 : f n'est pas différentiable en (0, 0) / · Les dérivées partielles existent : f est différentiable en (0, 0)
    = 3√2/4   ← cos(π/4) = sin(π/4) = √2/2
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = xy(2x + y)/(x² + y²) | R/‖(x, y)‖ = cos(φ)sin(φ)(2cos(φ) + sin(φ)) vaut 3√2/4 pour φ = π/4 : f n'est pas différentiable.
  pièges : a1_bh_quotient_rule, a2_partials_imply_diff

Soit f(x, y) = −2x − 3(x² + y²)sin(1/√(x² + y²)) si (x, y) ≠ (0, 0), et f(0, 0) = 0. f est-elle différentiable en (0, 0) ?
  [free, suivre l'erreur]  (−2t − 3t²sin(1/√(t²)) − 0)/t
    (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
    = −2   ← Simplifier, puis t → 0
  — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−3t²sin(1/√(t²)) − 0)/t
    = 0   ← Simplifier, puis t → 0
  — Reste : R(x, y) = f(x, y) − f(0, 0) − ∇f(0, 0)·(x, y) = f(x, y) − (−2x) :  [juge equiv]  départ : −2x − 3(x² + y²)sin(1/√(x² + y²)) − (−2x)
    = −3(x² + y²)sin(1/√(x² + y²))   ← Simplifier
  — En polaires (x = r cos φ, y = r sin φ, ‖(x, y)‖ = r) : R/‖(x, y)‖ =  [juge equiv]  départ : (−3((rcos(φ))² + (rsin(φ))²)sin(1/√((rcos(φ))² + (rsin(φ))²)))/r
    = −3rsin(1/r)   ← Simplifier par r
  — Majoration de |R/‖(x, y)‖| sans φ (si elle tend vers 0, f est différentiable en (0, 0)) :  [juge bound]  départ : −3rsin(1/r)
    = 3r   ← |cos φ|, |sin φ| ≤ 1
  aides : Calcule les dérivées partielles par la définition, puis le reste R, puis R/‖(x, y)‖ en polaires. | R(x, y) = −3(x² + y²)sin(1/√(x² + y²)) | |R/‖(x, y)‖| ≤ 3r → 0 : f est différentiable.
  pièges : a1_bh_quotient_rule

```

### Niveau 5

```
Soit f(x, y) = (x³ − 3y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. (a) f est-elle continue en (0, 0) ? (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0). (c) Calcule Dvf(0, 0) pour v = (3/5 ; 4/5). (d) f est-elle différentiable en (0, 0) ? (9 points)
  [problème, 9 points]
  partie 1 ((a) Continuité : 1 ; Majoration de |f| sans φ : 1)
  (a) f est-elle continue en (0, 0) ? Écris f en polaires, puis majore |f| par une fonction de r.
    [free, sans aide, suivre l'erreur]  ((rcos(φ))³ − 3(rsin(φ))³)/((rcos(φ))² + (rsin(φ))²)
      = r(cos(φ)³ − 3sin(φ)³)   ← x = r cos φ, y = r sin φ
    — Majoration de |f| sans φ :  [juge bound]  départ : r(cos(φ)³ − 3sin(φ)³)
      = 4r   ← |f| ≤ 4r → 0 : f est continue en (0, 0)
  partie 2 ((b) Dérivées partielles : 1 ; ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t : 1)
  (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0) par la définition.
    [free, sans aide, suivre l'erreur]  (t³/t² − 0)/t
      (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
      = 1   ← f(t, 0) − f(0, 0), divisé par t
    — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−3t³/t² − 0)/t
      = −3   ← f(0, t) − f(0, 0), divisé par t
  partie 3 ((c) Dérivée directionnelle : 2)
  (c) Calcule Dvf(0, 0) par la définition, pour v = (3/5 ; 4/5).
    [free, sans aide, suivre l'erreur]  ((((3/5)t)³ − 3((4/5)t)³)/(((3/5)t)² + ((4/5)t)²) − 0)/t
      = −33/25   ← f(tv) = t·f(v) : f est homogène de degré 1
  partie 4 ((d) Différentiabilité : 3)
  (d) f est-elle différentiable en (0, 0) ?
    · On ne peut pas savoir sans calculer la limite de R/‖(x, y)‖   · Oui : f est continue et ses dérivées partielles existent, donc elle est différentiable [a2_partials_imply_diff]   · Oui : Dvf(0, 0) = ∇f(0, 0)·v = −9/5, rien ne cloche [a2_dirderiv_gradient]   ✔ Non : si f était différentiable, Dvf(0, 0) vaudrait ∇f(0, 0)·v = −9/5 ≠ −33/25. Les dérivées partielles existent, mais f n'est pas différentiable
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a2_dirderiv_power, a2_partials_imply_diff, a2_dirderiv_gradient

Soit f(x, y) = (−x³ + 3x²y − 2xy²)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. (a) f est-elle continue en (0, 0) ? (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0). (c) Calcule Dvf(0, 0) pour v = (1/√2 ; 1/√2). (d) f est-elle différentiable en (0, 0) ? (9 points)
  [problème, 9 points]
  partie 1 ((a) Continuité : 1 ; Majoration de |f| sans φ : 1)
  (a) f est-elle continue en (0, 0) ? Écris f en polaires, puis majore |f| par une fonction de r.
    [free, sans aide, suivre l'erreur]  (−(rcos(φ))³ + 3(rcos(φ))²(rsin(φ)) − 2(rcos(φ))(rsin(φ))²)/((rcos(φ))² + (rsin(φ))²)
      = r(−cos(φ)³ + 3cos(φ)²sin(φ) − 2cos(φ)sin(φ)²)   ← x = r cos φ, y = r sin φ
    — Majoration de |f| sans φ :  [juge bound]  départ : r(−cos(φ)³ + 3cos(φ)²sin(φ) − 2cos(φ)sin(φ)²)
      = 6r   ← |f| ≤ 6r → 0 : f est continue en (0, 0)
  partie 2 ((b) Dérivées partielles : 1 ; ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t : 1)
  (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0) par la définition.
    [free, sans aide, suivre l'erreur]  (−t³/t² − 0)/t
      (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
      = −1   ← f(t, 0) − f(0, 0), divisé par t
    — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (0 − 0)/t
      = 0   ← f(0, t) − f(0, 0), divisé par t
  partie 3 ((c) Dérivée directionnelle : 2)
  (c) Calcule Dvf(0, 0) par la définition, pour v = (1/√2 ; 1/√2).
    [free, sans aide, suivre l'erreur]  ((−((√2/2)t)³ + 3((√2/2)t)²((√2/2)t) − 2((√2/2)t)((√2/2)t)²)/(((√2/2)t)² + ((√2/2)t)²) − 0)/t
      = 0   ← f(tv) = t·f(v) : f est homogène de degré 1
  partie 4 ((d) Différentiabilité : 3)
  (d) f est-elle différentiable en (0, 0) ?
    · Oui : f est continue et ses dérivées partielles existent, donc elle est différentiable [a2_partials_imply_diff]   · Oui : Dvf(0, 0) = ∇f(0, 0)·v = −√2/2, rien ne cloche [a2_dirderiv_gradient]   ✔ Non : si f était différentiable, Dvf(0, 0) vaudrait ∇f(0, 0)·v = −√2/2 ≠ 0. Les dérivées partielles existent, mais f n'est pas différentiable   · On ne peut pas savoir sans calculer la limite de R/‖(x, y)‖
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a2_dirderiv_power, a2_partials_imply_diff, a2_dirderiv_gradient

Soit f(x, y) = (−x³ − 2y³)/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. (a) f est-elle continue en (0, 0) ? (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0). (c) Calcule Dvf(0, 0) pour v = (3/5 ; 4/5). (d) f est-elle différentiable en (0, 0) ? (9 points)
  [problème, 9 points]
  partie 1 ((a) Continuité : 1 ; Majoration de |f| sans φ : 1)
  (a) f est-elle continue en (0, 0) ? Écris f en polaires, puis majore |f| par une fonction de r.
    [free, sans aide, suivre l'erreur]  (−(rcos(φ))³ − 2(rsin(φ))³)/((rcos(φ))² + (rsin(φ))²)
      = r(−cos(φ)³ − 2sin(φ)³)   ← x = r cos φ, y = r sin φ
    — Majoration de |f| sans φ :  [juge bound]  départ : r(−cos(φ)³ − 2sin(φ)³)
      = 3r   ← |f| ≤ 3r → 0 : f est continue en (0, 0)
  partie 2 ((b) Dérivées partielles : 1 ; ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t : 1)
  (b) Calcule ∂f/∂x(0, 0) et ∂f/∂y(0, 0) par la définition.
    [free, sans aide, suivre l'erreur]  (−t³/t² − 0)/t
      (∂f/∂x(0, 0) = limt→0 (f(t, 0) − f(0, 0))/t :)
      = −1   ← f(t, 0) − f(0, 0), divisé par t
    — ∂f/∂y(0, 0) = limt→0 (f(0, t) − f(0, 0))/t :  [juge limit]  départ : (−2t³/t² − 0)/t
      = −2   ← f(0, t) − f(0, 0), divisé par t
  partie 3 ((c) Dérivée directionnelle : 2)
  (c) Calcule Dvf(0, 0) par la définition, pour v = (3/5 ; 4/5).
    [free, sans aide, suivre l'erreur]  ((−((3/5)t)³ − 2((4/5)t)³)/(((3/5)t)² + ((4/5)t)²) − 0)/t
      = −31/25   ← f(tv) = t·f(v) : f est homogène de degré 1
  partie 4 ((d) Différentiabilité : 3)
  (d) f est-elle différentiable en (0, 0) ?
    ✔ Non : si f était différentiable, Dvf(0, 0) vaudrait ∇f(0, 0)·v = −11/5 ≠ −31/25. Les dérivées partielles existent, mais f n'est pas différentiable   · On ne peut pas savoir sans calculer la limite de R/‖(x, y)‖   · Oui : f est continue et ses dérivées partielles existent, donc elle est différentiable [a2_partials_imply_diff]   · Oui : Dvf(0, 0) = ∇f(0, 0)·v = −11/5, rien ne cloche [a2_dirderiv_gradient]
  pièges : a1_dl_order_too_low, a1_bh_quotient_rule, a2_dirderiv_power, a2_partials_imply_diff, a2_dirderiv_gradient

```

### Variantes d'examen

```
Soit f(x, y) = x²y/(x⁴ + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Alors :
  ✔ f n'est pas continue en (0, 0)   · f est continue et a des dérivées partielles en (0, 0), mais n'y est pas différentiable [a2_partials_imply_cont]   · f est différentiable en (0, 0), mais n'est pas de classe C¹ [a2_partials_imply_diff]   · f est de classe C¹ au voisinage de (0, 0)
  [examen mcq]
  pièges : a2_partials_imply_cont, a2_partials_imply_diff

Vrai ou faux ?
  « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est continue en (0, 0). » → FAUX
    contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  [examen tf]
  pièges : a2_dirderiv_imply_diff

```

## C¹, différentiable, dérivées partielles : qui implique quoi (`a2-diff-implications`, BA2)

_Les flèches du cours, et un contre-exemple (K1 à K7) pour chaque réciproque._

### Niveau 1

```
Range ces propriétés de la plus forte à la plus faible : chacune implique la suivante, et aucune réciproque n'est vraie.
  [blocs order]
    1. f est de classe C¹ au voisinage de a
    2. f est différentiable en a
    3. Dvf(a) existe pour tout v et vaut ∇f(a)·v
    4. f admet des dérivées partielles en a

Range ces propriétés de la plus forte à la plus faible : chacune implique la suivante, et aucune réciproque n'est vraie.
  [blocs order]
    1. f est de classe C¹ au voisinage de a
    2. f est différentiable en a
    3. Dvf(a) existe pour tout v et vaut ∇f(a)·v
    4. f admet des dérivées partielles en a

Range ces propriétés de la plus forte à la plus faible : chacune implique la suivante, et aucune réciproque n'est vraie.
  [blocs order]
    1. f est de classe C¹ au voisinage de a
    2. f est différentiable en a
    3. Dvf(a) existe pour tout v et vaut ∇f(a)·v
    4. f admet des dérivées partielles en a

```

### Niveau 2

```
Le diagramme : C¹ ⇒ différentiable ⇒ (continue, et Dvf = ∇f·v pour tout v) ⇒ dérivées partielles. Vrai ou faux ? « Si f admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0). »
  ✔ Faux, contre-exemple : K5 = √|xy|   · Vrai [a2_partials_imply_diff]   · Faux, contre-exemple : K3 = (x² + y²) sin(1/√(x² + y²))
  pièges : a2_partials_imply_diff

Le diagramme : C¹ ⇒ différentiable ⇒ (continue, et Dvf = ∇f·v pour tout v) ⇒ dérivées partielles. Vrai ou faux ? « Si f est différentiable sur ℝ², alors f est de classe C¹. »
  · Vrai [a2_diff_imply_c1]   ✔ Faux, contre-exemple : K3 = (x² + y²) sin(1/√(x² + y²))   · Faux, contre-exemple : K4 = xy²/(x² + y²)   · Faux, contre-exemple : K1 = xy/(x² + y²)
  pièges : a2_diff_imply_c1

Le diagramme : C¹ ⇒ différentiable ⇒ (continue, et Dvf = ∇f·v pour tout v) ⇒ dérivées partielles. Vrai ou faux ? « Si f est différentiable en tout point de ℝ², alors ses dérivées partielles sont continues. »
  · Vrai [a2_diff_imply_c1]   · Faux, contre-exemple : K5 = √|xy|   ✔ Faux, contre-exemple : K3 = (x² + y²) sin(1/√(x² + y²))   · Faux, contre-exemple : K4 = xy²/(x² + y²)
  pièges : a2_diff_imply_c1

```

### Niveau 3

```
L'énoncé « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » est faux. Quelle fonction (nulle en (0, 0)) est un contre-exemple ?
  · K5 = √|xy|   ✔ K4 = xy²/(x² + y²)   · K1 = xy/(x² + y²)   · K3 = (x² + y²) sin(1/√(x² + y²))

L'énoncé « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » est faux. Quelle fonction (nulle en (0, 0)) est un contre-exemple ?
  · K1 = xy/(x² + y²)   ✔ K2 = x²y/(x⁴ + y²)   · K3 = (x² + y²) sin(1/√(x² + y²))   · K5 = √|xy|

L'énoncé « Si f est différentiable sur ℝ², alors f est de classe C¹. » est faux. Quelle fonction (nulle en (0, 0)) est un contre-exemple ?
  · K1 = xy/(x² + y²)   · K4 = xy²/(x² + y²)   · K5 = √|xy|   ✔ K3 = (x² + y²) sin(1/√(x² + y²))

```

### Niveau 4

```
Vrai ou faux ?
  « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » → FAUX
    contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  aides : Place les deux notions sur le diagramme : la flèche va-t-elle dans ce sens ? | C'est une réciproque : pense à une fonction du cours (K1 à K5). | Contre-exemple : K2 = x²y/(x⁴ + y²).
  pièges : a2_dirderiv_imply_diff

Vrai ou faux ?
  « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » → FAUX
    contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  aides : Place les deux notions sur le diagramme : la flèche va-t-elle dans ce sens ? | C'est une réciproque : pense à une fonction du cours (K1 à K5). | Contre-exemple : K2 = x²y/(x⁴ + y²).
  pièges : a2_dirderiv_imply_diff

Vrai ou faux ?
  « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » → FAUX
    contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  aides : Place les deux notions sur le diagramme : la flèche va-t-elle dans ce sens ? | C'est une réciproque : pense à une fonction du cours (K1 à K5). | Contre-exemple : K2 = x²y/(x⁴ + y²).
  pièges : a2_dirderiv_imply_diff

```

### Niveau 5

```
Cinq vrai/faux de suite, sans le diagramme. Pour un énoncé faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » → FAUX
      contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si ∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 0, alors f est continue en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y/(x^2+y^2)
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f est différentiable en a, alors Dvf(a) existe pour tout v et vaut ∇f(a)·v. » → VRAI
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Si f est continue en (0, 0) et admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y^2/(x^2+y^2)
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ?
    « Si f est différentiable en a, alors f est continue en a. » → VRAI
  pièges : a2_dirderiv_imply_diff, a2_partials_imply_cont, a2_partials_imply_diff

Cinq vrai/faux de suite, sans le diagramme. Pour un énoncé faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si f admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y/(x^2+y^2)
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si f est de classe C², alors ∂f/∂x est différentiable. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f est différentiable sur ℝ², alors f est de classe C¹. » → FAUX
      contre-exemple (a2) : f = (x^2+y^2)sin(1/√(x^2+y^2))
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Si ∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 0, alors f est continue en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y/(x^2+y^2)
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ?
    « Si f est différentiable en tout point de ℝ², alors ses dérivées partielles sont continues. » → FAUX
      contre-exemple (a2) : f = (x^2+y^2)sin(1/√(x^2+y^2))
  pièges : a2_partials_imply_diff, a2_diff_imply_c1, a2_partials_imply_cont

Cinq vrai/faux de suite, sans le diagramme. Pour un énoncé faux, donne un contre-exemple.
  [problème, 5 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si f est différentiable en a, alors Dvf(a) existe pour tout v et vaut ∇f(a)·v. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si f est différentiable sur ℝ², alors f est de classe C¹. » → FAUX
      contre-exemple (a2) : f = (x^2+y^2)sin(1/√(x^2+y^2))
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y/(x^2+y^2)
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est continue en (0, 0). » → FAUX
      contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  partie 5 (Énoncé 5 : 1)
  Vrai ou faux ?
    « Si f est continue en (0, 0) et admet des dérivées partielles en (0, 0), alors f est différentiable en (0, 0). » → FAUX
      contre-exemple (a2) : f = x y^2/(x^2+y^2)
  pièges : a2_diff_imply_c1, a2_partials_imply_diff, a2_dirderiv_imply_diff

```

### Variantes d'examen

```
Soit f(x, y) = −x − y − 3x²y²/(x² + y²) si (x, y) ≠ (0, 0), et f(0, 0) = 0. Alors :
  · f n'est pas continue en (0, 0)   · f est continue et a des dérivées partielles en (0, 0), mais n'y est pas différentiable [a2_diff_no_norm]   · f est différentiable en (0, 0), mais n'est pas de classe C¹   ✔ f est de classe C¹ au voisinage de (0, 0)
  [examen mcq]
  pièges : a2_diff_no_norm

Vrai ou faux ?
  « Si Dvf(0, 0) existe pour tout v ≠ 0, alors f est différentiable en (0, 0). » → FAUX
    contre-exemple (a2) : f = x^2 y/(x^4+y^2)
  [examen tf]
  pièges : a2_dirderiv_imply_diff

```

## Plan tangent au graphe (`a2-tangent-graph`, BA2)

_Plan tangent au graphe : f(a, b), f_x(a, b), f_y(a, b)._

### Niveau 1

```
Soit f(x, y) = 2y² − x²y − 2x. Donne une équation du plan tangent au graphe de f au point (−2, −1, f(−2, −1)).
  [guided]  f
    = 2·(−1)² − (−2)²·(−1) − 2·(−2)   ← On remplace x par −2 et y par −1
    = 10   ← f(−2 ; −1) = 10
  — ∂f/∂x = −2xy − 2, au point :  [juge value]  départ : f_x
    = −6
  — ∂f/∂y = 4y − x², au point :  [juge value]  départ : f_y
    = −8
  — Le plan tangent :  [juge geom]  départ : π
    = z = 10□□   (trous : z = 10 − 6(x + 2) − 8(y + 1))   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −6x − 8y − 10   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 10 + (…)(x + 2) + (…)(y + 1) | z = 10 − 6(x + 2) − 8(y + 1)

Soit f(x, y) = −2x² + 2y² − xy² − 2xy. Donne une équation du plan tangent au graphe de f au point (1, 2, f(1, 2)).
  [guided]  f
    = −2·(1)² + 2·(2)² − (1)·(2)² − 2·(1)·(2)   ← On remplace x par 1 et y par 2
    = −2   ← f(1 ; 2) = −2
  — ∂f/∂x = −4x − y² − 2y, au point :  [juge value]  départ : f_x
    = −12
  — ∂f/∂y = 4y − 2xy − 2x, au point :  [juge value]  départ : f_y
    = 2
  — Le plan tangent :  [juge geom]  départ : π
    = z = −2□ + □   (trous : z = −2 − 12(x − 1) + 2(y − 2))   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −12x + 2y + 6   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = −2 + (…)(x − 1) + (…)(y − 2) | z = −2 − 12(x − 1) + 2(y − 2)

Soit f(x, y) = −xy² + x² + x + x²y. Donne une équation du plan tangent au graphe de f au point (0, −2, f(0, −2)).
  [guided]  f
    = −(0)·(−2)² + (0)² + (0) + (0)²·(−2)   ← On remplace x par 0 et y par −2
    = 0   ← f(0 ; −2) = 0
  — ∂f/∂x = −y² + 2x + 1 + 2xy, au point :  [juge value]  départ : f_x
    = −3
  — ∂f/∂y = −2xy + x², au point :  [juge value]  départ : f_y
    = 0
  — Le plan tangent :  [juge geom]  départ : π
    = z = □   (trous : z = −3x)   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 0 + (…)(x) + (…)(y + 2) | z = −3x

```

### Niveau 2

```
Soit f(x, y) = 2x − 2x³ + 2x²y. Donne une équation du plan tangent au graphe de f au point (−1, 2, f(−1, 2)).
  [guided]  f
    = 2·(−1) − 2·(−1)³ + 2·(−1)²·(2)   ← On remplace x par −1 et y par 2
    = 4   ← f(−1 ; 2) = 4
  — ∂f/∂x = 2 − 6x² + 4xy, au point :  [juge value]  départ : f_x
    = −12
  — ∂f/∂y = 2x², au point :  [juge value]  départ : f_y
    = 2
  — Le plan tangent :  [juge geom]  départ : π
    = z = 4 − 12(□) + 2(□)   (trous : z = 4 − 12(x + 1) + 2(y − 2))   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −12x + 2y − 12   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 4 + (…)(x + 1) + (…)(y − 2) | z = 4 − 12(x + 1) + 2(y − 2)

Soit f(x, y) = x³ + y − 2x − x²y. Donne une équation du plan tangent au graphe de f au point (−1, −1, f(−1, −1)).
  [guided]  f
    = (−1)³ + (−1) − 2·(−1) − (−1)²·(−1)   ← On remplace x par −1 et y par −1
    = 1   ← f(−1 ; −1) = 1
  — ∂f/∂x = 3x² − 2 − 2xy, au point :  [juge value]  départ : f_x
    = −1
  — ∂f/∂y = 1 − x², au point :  [juge value]  départ : f_y
    = 0
  — Le plan tangent :  [juge geom]  départ : π
    = z = 1 − (□)   (trous : z = 1 − (x + 1))   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −x   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 1 + (…)(x + 1) + (…)(y + 1) | z = 1 − (x + 1)

Soit f(x, y) = −3y + 2y² + 2xy + x³. Donne une équation du plan tangent au graphe de f au point (2, −1, f(2, −1)).
  [guided]  f
    = −3·(−1) + 2·(−1)² + 2·(2)·(−1) + (2)³   ← On remplace x par 2 et y par −1
    = 9   ← f(2 ; −1) = 9
  — ∂f/∂x = 2y + 3x², au point :  [juge value]  départ : f_x
    = 10
  — ∂f/∂y = −3 + 4y + 2x, au point :  [juge value]  départ : f_y
    = −3
  — Le plan tangent :  [juge geom]  départ : π
    = z = 9 + 10(□) − 3(□)   (trous : z = 9 + 10(x − 2) − 3(y + 1))   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = 10x − 3y − 14   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 9 + (…)(x − 2) + (…)(y + 1) | z = 9 + 10(x − 2) − 3(y + 1)

```

### Niveau 3

```
Soit f(x, y) = −xy² + x²y − x³. Donne une équation du plan tangent au graphe de f au point (2, 0, f(2, 0)).
  [tap, suivre l'erreur, menu menu]  f
    ? Par quel point passe le plan tangent ? ✔ (2 ; 0 ; f(2 ; 0)) / · (−2 ; 0 ; f(−2 ; 0)) / · (2 ; 0 ; 0)
    = −8   ← f(2 ; 0) = −8
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = −12
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = 4
  — Le plan tangent :  [juge geom]  départ : π
    = z = −8 − 12(x − 2) + 4y   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −12x + 4y + 16   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = −8 + (…)(x − 2) + (…)(y) | z = −8 − 12(x − 2) + 4y
  pièges : a2_tangent_point_sign

Soit f(x, y) = −3x²y + 2x³ + 2x² + y². Donne une équation du plan tangent au graphe de f au point (0, −1, f(0, −1)).
  [tap, suivre l'erreur, menu menu]  f
    ? Par quel point passe le plan tangent ? ✔ (0 ; −1 ; f(0 ; −1)) / · (0 ; 1 ; f(0 ; 1)) / · (0 ; −1 ; 0)
    = 1   ← f(0 ; −1) = 1
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = 0
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = −2
  — Le plan tangent :  [juge geom]  départ : π
    = z = 1 − 2(y + 1)   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −2y − 1   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 1 + (…)(x) + (…)(y + 1) | z = 1 − 2(y + 1)
  pièges : a2_tangent_point_sign

Soit f(x, y) = −3xy² + 3y − 2x³ + 2x². Donne une équation du plan tangent au graphe de f au point (1, 1, f(1, 1)).
  [tap, suivre l'erreur, menu menu]  f
    ? Par quel point passe le plan tangent ? ✔ (1 ; 1 ; f(1 ; 1)) / · (1 ; −1 ; f(1 ; −1)) / · (1 ; 1 ; 0)
    = 0   ← f(1 ; 1) = 0
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = −5
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = −3
  — Le plan tangent :  [juge geom]  départ : π
    = z = −5(x − 1) − 3(y − 1)   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −5x − 3y + 8   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 0 + (…)(x − 1) + (…)(y − 1) | z = −5(x − 1) − 3(y − 1)
  pièges : a2_tangent_point_sign

```

### Niveau 4

```
Soit f(x, y) = −2x² − 2xy + 2y² − 8x + 6y + 3. En quel point (a, b) le plan tangent au graphe de f est-il horizontal ? Donne ce point, puis l'équation du plan.
  [free, suivre l'erreur]  f_x = 0 ; f_y = 0
    = −4x − 2y − 8 = 0 ; −2x + 4y + 6 = 0   ← Plan horizontal : ∇f = 0
    = (-1 ; -2)   ← On résout le système
  — La cote du point :  [juge value]  départ : f
    = 1
  — Le plan tangent en ce point :  [juge geom]  départ : π
    = z = 1   ← f_x = f_y = 0 : z = f(a, b)
  aides : Le plan z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b) est horizontal si f_x(a, b) = f_y(a, b) = 0. | −4x − 2y − 8 = 0 et −2x + 4y + 6 = 0 | (a ; b) = (−1 ; −2)

Soit f(x, y) = 3x³ − xy² + x²y. Donne une équation du plan tangent au graphe de f au point (0, −2, f(0, −2)).
  [free, suivre l'erreur]  f
    = 0   ← f(0 ; −2) = 0
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = −4
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = 0
  — Le plan tangent :  [juge geom]  départ : π
    = z = −4x   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = 0 + (…)(x) + (…)(y + 2) | z = −4x

Soit f(x, y) = 2x³ − 2x²y + 3x. Donne une équation du plan tangent au graphe de f au point (−1, −2, f(−1, −2)).
  [free, suivre l'erreur]  f
    = −1   ← f(−1 ; −2) = −1
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = 1
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = −2
  — Le plan tangent :  [juge geom]  départ : π
    = z = −1 + (x + 1) − 2(y + 2)   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = x − 2y − 4   ← Développé
  aides : Il faut f(a, b), f_x(a, b) et f_y(a, b). | z = −1 + (…)(x + 1) + (…)(y + 2) | z = −1 + (x + 1) − 2(y + 2)

```

### Niveau 5

```
Soit f(x, y) = xy − 2x²y − 3x³. Donne une équation du plan tangent au graphe de f au point (1, −1, f(1, −1)).
  [free, sans aide]  f
    = −2   ← f(1 ; −1) = −2
  — La dérivée partielle par rapport à x, au point :  [juge value]  départ : f_x
    = −6
  — La dérivée partielle par rapport à y, au point :  [juge value]  départ : f_y
    = −1
  — Le plan tangent :  [juge geom]  départ : π
    = z = −2 − 6(x − 1) − (y + 1)   ← z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)
    = z = −6x − y + 3   ← Développé

Soit f(x, y) = 3x³ + 3x² + 3xy² − 3x. Le plan tangent au graphe de f au point (0, 2, f(0, 2)) a pour équation :
  ✔ z = 9x   · z = 9x + 1   · z = 9y − 18   · z = −9x

Soit f(x, y) = −x − 2y − 3x²y − 2x³. Le plan tangent au graphe de f au point (0, 0, f(0, 0)) a pour équation :
  · z = −x − 2y + 1   · z = −2x − y   · z = x + 2y   ✔ z = −x − 2y

```

### Variantes d'examen

```
Soit f(x, y) = 3y + xy² − 2y² − 3xy. Le plan tangent au graphe de f au point (−2, 2, f(−2, 2)) a pour équation :
  ✔ z = −2x − 7y + 12   · z = −2x − 7y + 10   · z = −2x − 7y − 8 [a2_tangent_point_sign]   · z = −7x − 2y − 8
  [examen mcq]
  pièges : a2_tangent_point_sign

Vrai ou faux ? « Le plan tangent au graphe de f en (a, b, f(a, b)) contient la tangente en x = a à la courbe z = f(x, b) tracée dans le plan y = b. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Plan tangent à une surface de niveau (`a2-tangent-level`, BA2)

_Plan tangent à F = c : ∇F(p) est une normale._

### Niveau 1

```
Soit S la surface −2xz + e^(xz) + x⁴ + xy = 15, et p = (2 ; −1 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    (∇F = (-2z+ze^(xz)+4x^3+y ; x ; -2x+xe^(xz)))
    = (31 ; 2 ; -2)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 31(□) + 2(□) − 2z = 0   (trous : 31(x − 2) + 2(y + 1) − 2z = 0)   ← ∇F(p)·(x − p) = 0
    = 31x + 2y − 2z = 60   ← Développé
  aides : Le gradient de F au point est normal à la surface. | ∇F(2 ; −1 ; 0) = (31 ; 2 ; -2), puis ∇F(p)·(x − p) = 0. | 31(x − 2) + 2(y + 1) − 2z = 0

Soit S la surface −2x⁴ + 2z⁴ + cos(πz) − 2xyz = −5, et p = (−1 ; −2 ; 1) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    (∇F = (-8x^3-2yz ; -2xz ; 8z^3-πsin(πz)-2xy))
    = (12 ; 2 ; 4)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 12(□) + 2(□) + 4(□) = 0   (trous : 12(x + 1) + 2(y + 2) + 4(z − 1) = 0)   ← ∇F(p)·(x − p) = 0
    = 6x + y + 2z = −6   ← Développé, puis divisé par 2
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; −2 ; 1) = (12 ; 2 ; 4), puis ∇F(p)·(x − p) = 0. | 12(x + 1) + 2(y + 2) + 4(z − 1) = 0

Soit S la surface −x⁴ − 2xz² + yz + 2e^(xy) = −14, et p = (2 ; 0 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    (∇F = (-4x^3-2z^2+2ye^(xy) ; z+2xe^(xy) ; -4xz+y))
    = (-32 ; 4 ; 0)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = −32(□) + 4y = 0   (trous : −32(x − 2) + 4y = 0)   ← ∇F(p)·(x − p) = 0
    = 8x − y = 16   ← Développé, puis divisé par 4
  aides : Le gradient de F au point est normal à la surface. | ∇F(2 ; 0 ; 0) = (-32 ; 4 ; 0), puis ∇F(p)·(x − p) = 0. | −32(x − 2) + 4y = 0

```

### Niveau 2

```
Soit S la surface −2z² + 2xz² − 2yz² = 2, et p = (1 ; −1 ; −1) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    = (2z^2 ; -2z^2 ; -4z+4xz-4yz)   (cases à remplir : (1,1) (2,1) (3,1))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (1 ; −1 ; −1) :  [juge mat]  départ : ∇F
    = (2 ; -2 ; -4)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 2(□) − 2(□) − 4(□) = 0   (trous : 2(x − 1) − 2(y + 1) − 4(z + 1) = 0)   ← ∇F(p)·(x − p) = 0
    = x − y − 2z = 4   ← Développé, puis divisé par 2
  aides : Le gradient de F au point est normal à la surface. | ∇F(1 ; −1 ; −1) = (2 ; -2 ; -4), puis ∇F(p)·(x − p) = 0. | 2(x − 1) − 2(y + 1) − 4(z + 1) = 0

Soit S la surface −2xyz + e^(xz) + cos(πy) − y² = −2, et p = (−1 ; 2 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    = (-2yz+ze^(xz) ; -2xz-πsin(πy)-2y ; -2xy+xe^(xz))   (cases à remplir : (1,1) (2,1) (3,1))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−1 ; 2 ; 0) :  [juge mat]  départ : ∇F
    = (0 ; -4 ; 3)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = −4(□) + 3z = 0   (trous : −4(y − 2) + 3z = 0)   ← ∇F(p)·(x − p) = 0
    = 4y − 3z = 8   ← Développé
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; 2 ; 0) = (0 ; -4 ; 3), puis ∇F(p)·(x − p) = 0. | −4(y − 2) + 3z = 0

Soit S la surface y⁴ − x⁴ − z⁴ = −16, et p = (−1 ; −1 ; 2) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [guided]  ∇F
    = (-4x^3 ; 4y^3 ; -4z^3)   (cases à remplir : (1,1) (2,1) (3,1))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−1 ; −1 ; 2) :  [juge mat]  départ : ∇F
    = (4 ; -4 ; -32)   (cases à remplir : (1,1) (2,1) (3,1))   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 4(□) − 4(□) − 32(□) = 0   (trous : 4(x + 1) − 4(y + 1) − 32(z − 2) = 0)   ← ∇F(p)·(x − p) = 0
    = x − y − 8z = −16   ← Développé, puis divisé par 4
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; −1 ; 2) = (4 ; -4 ; -32), puis ∇F(p)·(x − p) = 0. | 4(x + 1) − 4(y + 1) − 32(z − 2) = 0

```

### Niveau 3

```
Soit S la surface −x⁴ − 2z⁴ − 2xyz = −26, et p = (−2 ; 2 ; −1) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [tap, suivre l'erreur, menu menu]  ∇F
    ? Comment obtenir une normale au plan tangent ? ✔ S est la surface de niveau F = c : ∇F(p) est normal / ✔ Résoudre en z, puis plan tangent au graphe / · Le plan est ∇F(p)·(x − p) = c
    = (-4x^3-2yz ; -2xz ; -8z^3-2xy)   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−2 ; 2 ; −1) :  [juge mat]  départ : ∇F
    = (36 ; -4 ; 16)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 36(x + 2) − 4(y − 2) + 16(z + 1) = 0   ← ∇F(p)·(x − p) = 0
    = 9x − y + 4z = −24   ← Développé, puis divisé par 4
  aides : Le gradient de F au point est normal à la surface. | ∇F(−2 ; 2 ; −1) = (36 ; -4 ; 16), puis ∇F(p)·(x − p) = 0. | 36(x + 2) − 4(y − 2) + 16(z + 1) = 0
  pièges : a2_tangent_level_rhs

Soit S la surface x⁴ + 2e^(yz) + cos(πx) = 19, et p = (2 ; 2 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [tap, suivre l'erreur, menu menu]  ∇F
    ? Comment obtenir une normale au plan tangent ? ✔ S est la surface de niveau F = c : ∇F(p) est normal / ✔ Résoudre en z, puis plan tangent au graphe / · Le plan est ∇F(p)·(x − p) = c
    = (4x^3-πsin(πx) ; 2ze^(yz) ; 2ye^(yz))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (2 ; 2 ; 0) :  [juge mat]  départ : ∇F
    = (32 ; 0 ; 4)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 32(x − 2) + 4z = 0   ← ∇F(p)·(x − p) = 0
    = 8x + z = 16   ← Développé, puis divisé par 4
  aides : Le gradient de F au point est normal à la surface. | ∇F(2 ; 2 ; 0) = (32 ; 0 ; 4), puis ∇F(p)·(x − p) = 0. | 32(x − 2) + 4z = 0
  pièges : a2_tangent_level_rhs

Soit S la surface −2xyz + 2z² + 2yz² − 2x²y = −2, et p = (−1 ; 1 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [tap, suivre l'erreur, menu menu]  ∇F
    ? Comment obtenir une normale au plan tangent ? ✔ S est la surface de niveau F = c : ∇F(p) est normal / ✔ Résoudre en z, puis plan tangent au graphe / · Le plan est ∇F(p)·(x − p) = c
    = (-2yz-4xy ; -2xz+2z^2-2x^2 ; -2xy+4z+4yz)   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−1 ; 1 ; 0) :  [juge mat]  départ : ∇F
    = (4 ; -2 ; 2)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 4(x + 1) − 2(y − 1) + 2z = 0   ← ∇F(p)·(x − p) = 0
    = 2x − y + z = −3   ← Développé, puis divisé par 2
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; 1 ; 0) = (4 ; -2 ; 2), puis ∇F(p)·(x − p) = 0. | 4(x + 1) − 2(y − 1) + 2z = 0
  pièges : a2_tangent_level_rhs

```

### Niveau 4

```
Soit S la surface cos(πz) + x⁴ − 2z⁴ + e^(yz) = 18, et p = (2 ; 2 ; 0) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [free, suivre l'erreur]  ∇F
    = (4x^3 ; ze^(yz) ; -πsin(πz)-8z^3+ye^(yz))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (2 ; 2 ; 0) :  [juge mat]  départ : ∇F
    = (32 ; 0 ; 2)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 32(x − 2) + 2z = 0   ← ∇F(p)·(x − p) = 0
    = 16x + z = 32   ← Développé, puis divisé par 2
  aides : Le gradient de F au point est normal à la surface. | ∇F(2 ; 2 ; 0) = (32 ; 0 ; 2), puis ∇F(p)·(x − p) = 0. | 32(x − 2) + 2z = 0

Soit S la surface 2yz² − 2x²z + xy = −3, et p = (−1 ; −1 ; 1) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [free, suivre l'erreur]  ∇F
    = (-4xz+y ; 2z^2+x ; 4yz-2x^2)   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−1 ; −1 ; 1) :  [juge mat]  départ : ∇F
    = (3 ; 1 ; -6)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = 3(x + 1) + (y + 1) − 6(z − 1) = 0   ← ∇F(p)·(x − p) = 0
    = 3x + y − 6z = −10   ← Développé
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; −1 ; 1) = (3 ; 1 ; -6), puis ∇F(p)·(x − p) = 0. | 3(x + 1) + (y + 1) − 6(z − 1) = 0

Soit S la surface 2e^(yz) + 2x⁴ + cos(πx) + 2y² = 3, et p = (−1 ; 0 ; −1) ∈ S. Donne une équation cartésienne du plan tangent à S en p.
  [free, suivre l'erreur]  ∇F
    = (8x^3-πsin(πx) ; 2ze^(yz)+4y ; 2ye^(yz))   ← ∇F = (∂F/∂x, ∂F/∂y, ∂F/∂z)
  — Au point p = (−1 ; 0 ; −1) :  [juge mat]  départ : ∇F
    = (-8 ; -2 ; 0)   ← On évalue au point
  — Le plan tangent :  [juge geom]  départ : π
    = −8(x + 1) − 2y = 0   ← ∇F(p)·(x − p) = 0
    = 4x + y = −4   ← Développé, puis divisé par 2
  aides : Le gradient de F au point est normal à la surface. | ∇F(−1 ; 0 ; −1) = (-8 ; -2 ; 0), puis ∇F(p)·(x − p) = 0. | −8(x + 1) − 2y = 0

```

### Niveau 5

```
Le plan tangent à la surface −2xy + xz + 2e^(yz) + cos(πx) = 1 au point (1 ; 0 ; 0) a pour équation :
  · 2y − z = −1 [a2_tangent_level_rhs]   ✔ 2y − z = 0   · 2y + z = 0
  pièges : a2_tangent_level_rhs

Le plan tangent à la surface z⁴ − x² − 2x²z + 2yz = 11 au point (1 ; 2 ; −2) a pour équation :
  · 3x − 2y − 15z = −29 [a2_tangent_point_sign]   ✔ 3x − 2y − 15z = 29   · 3x + 2y + 15z = −23   · 3x − 2y − 15z = 69/2 [a2_tangent_level_rhs]
  pièges : a2_tangent_level_rhs, a2_tangent_point_sign

Le plan tangent à la surface −2y² − 2z³ − 2xyz − yz = 0 au point (−2 ; −2 ; −1) a pour équation :
  ✔ 4x − 5y + 12z = −10   · 4x + 5y + 12z = −30   · 4x + 5y − 12z = −6   · 4x − 5y + 12z = 10 [a2_tangent_point_sign]
  pièges : a2_tangent_point_sign

```

### Variantes d'examen

```
Le plan tangent à la surface 2xy² + 2xyz + cos(πx) + 2x⁴ = −11 au point (−1 ; −2 ; −1) a pour équation :
  ✔ 2x + 5y + 2z = −14   · 2x − 5y − 2z = 10   · 2x + 5y + 2z = 14 [a2_tangent_point_sign]   · 2x + 5y + 2z = −39/2 [a2_tangent_level_rhs]
  [examen mcq]
  pièges : a2_tangent_level_rhs, a2_tangent_point_sign

Vrai ou faux ? « Si ∇F(p) ≠ 0, le vecteur ∇F(p) est tangent à la surface F = c en p. »
  · Vrai   ✔ Faux
  [examen tf]

```

## Règle de chaîne et jacobienne d'une composée (`a2-chain`, BA2)

_Jacobienne d'une composée : J_f au point g(a), à gauche._

### Niveau 1

```
Soit g(u, v) = (v² − u, 2u²) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (3y, −3 + 3x − 2y). On pose h = f ∘ g. Calcule J_h(1 ; 2).
  [guided]  g
    (Étape 1 : le point image g(a).)
    = (3 ; 2)   (cases à remplir : (1,1) (2,1))   ← g(1 ; 2)
  — Étape 2 : J_f là-bas, au point g(a).  [juge mat]  départ : J_f
    = [[6,2]]   (cases à remplir : (1,1) (1,2))   ← On remplace (x, y) par g(a) = (3 ; 2)
  — Étape 3 : J_g ici, d'abord en (u, v)…  [juge mat]  départ : J_g
    = [[-1,2v],[4u,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-1,4],[4,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[6,2]]·[[-1,4],[4,0]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[2,24]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(3 ; 2) = [[6,2]] | J_h(1 ; 2) = [[6,2]]·[[-1,4],[4,0]] = [[2,24]]

Soit g(u, v) = (u − v + 2, −2u − 1) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−4x, −2y). On pose h = f ∘ g. Calcule J_h(−2 ; 0).
  [guided]  g
    (Étape 1 : le point image g(a).)
    = (0 ; 3)   (cases à remplir : (1,1) (2,1))   ← g(−2 ; 0)
  — Étape 2 : J_f là-bas, au point g(a).  [juge mat]  départ : J_f
    = [[0,-6]]   (cases à remplir : (1,1) (1,2))   ← On remplace (x, y) par g(a) = (0 ; 3)
  — Étape 3 : J_g ici, d'abord en (u, v)…  [juge mat]  départ : J_g
    = [[1,-1],[-2,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[1,-1],[-2,0]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[0,-6]]·[[1,-1],[-2,0]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[12,0]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(0 ; 3) = [[0,-6]] | J_h(−2 ; 0) = [[0,-6]]·[[1,-1],[-2,0]] = [[12,0]]

Soit g(u, v) = (−uv + 1, u − uv) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (y − 2x, x). On pose h = f ∘ g. Calcule J_h(1 ; 2).
  [guided]  g
    (Étape 1 : le point image g(a).)
    = (-1 ; -1)   (cases à remplir : (1,1) (2,1))   ← g(1 ; 2)
  — Étape 2 : J_f là-bas, au point g(a).  [juge mat]  départ : J_f
    = [[1,-1]]   (cases à remplir : (1,1) (1,2))   ← On remplace (x, y) par g(a) = (−1 ; −1)
  — Étape 3 : J_g ici, d'abord en (u, v)…  [juge mat]  départ : J_g
    = [[-v,-u],[1-v,-u]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-2,-1],[-1,-1]]   (cases à remplir : (1,1) (1,2) (2,1) (2,2))
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[1,-1]]·[[-2,-1],[-1,-1]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[-1,0]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(−1 ; −1) = [[1,-1]] | J_h(1 ; 2) = [[1,-1]]·[[-2,-1],[-1,-1]] = [[-1,0]]

```

### Niveau 2

```
Soit g(u, v) = (v, 2v + 2u²) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (2y, 2y + 2x). On pose h = f ∘ g. Calcule J_h(1 ; −2).
  [guided]  g
    = (-2 ; -2)   ← g(1 ; −2)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[-4,-8]]   ← On remplace (x, y) par g(a) = (−2 ; −2)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[0,1],[4u,2]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[0,1],[4,2]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[-4,-8]]·[[0,1],[4,2]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[-32,-20]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(−2 ; −2) = [[-4,-8]] | J_h(1 ; −2) = [[-4,-8]]·[[0,1],[4,2]] = [[-32,-20]]

Soit g(u, v) = (−2v + u, 2uv + u²) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (3 + 4x, −1). On pose h = f ∘ g. Calcule J_h(−2 ; 1).
  [guided]  g
    = (-4 ; 0)   ← g(−2 ; 1)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[-13,-1]]   ← On remplace (x, y) par g(a) = (−4 ; 0)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[1,-2],[2v+2u,2u]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[1,-2],[-2,-4]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[-13,-1]]·[[1,-2],[-2,-4]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[-11,30]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(−4 ; 0) = [[-13,-1]] | J_h(−2 ; 1) = [[-13,-1]]·[[1,-2],[-2,-4]] = [[-11,30]]

Soit g(u, v) = (−2uv − 2, v) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−2x + 2y, −6y² + 2x). On pose h = f ∘ g. Calcule J_h(−1 ; 2).
  [guided]  g
    = (2 ; 2)   ← g(−1 ; 2)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[0,-20]]   ← On remplace (x, y) par g(a) = (2 ; 2)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[-2v,-2u],[0,1]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-4,2],[0,1]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[0,-20]]·[[-4,2],[0,1]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[0,-20]]   (cases à remplir : (1,1) (1,2))   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(2 ; 2) = [[0,-20]] | J_h(−1 ; 2) = [[0,-20]]·[[-4,2],[0,1]] = [[0,-20]]

```

### Niveau 3

```
Soit g(u, v) = (v + 2u², v² − uv − 2) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−3y − 2x, −3x). On pose h = f ∘ g. Calcule J_h(−1 ; −1).
  [tap, suivre l'erreur, menu menu]  g
    = (1 ; -2)   ← g(−1 ; −1)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    ? En quel point évaluer J_f ? ✔ En g(a) = (1 ; −2) / · En a = (−1 ; −1)
    = [[4,-3]]   ← On remplace (x, y) par g(a) = (1 ; −2)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[4u,1],[-v,2v-u]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-4,1],[1,-1]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    ? Dans quel ordre multiplier ? ✔ J_f(g(a))·J_g(a) / · J_g(a)·J_f(g(a))
    = [[4,-3]]·[[-4,1],[1,-1]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[-19,7]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(1 ; −2) = [[4,-3]] | J_h(−1 ; −1) = [[4,-3]]·[[-4,1],[1,-1]] = [[-19,7]]
  pièges : a2_chain_wrong_point, l_compose_order

Soit g(u, v) = (2u − v, uv) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (4x, 3 − 4y). On pose h = f ∘ g. Calcule J_h(2 ; 0).
  [tap, suivre l'erreur, menu menu]  g
    = (4 ; 0)   ← g(2 ; 0)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    ? En quel point évaluer J_f ? ✔ En g(a) = (4 ; 0) / · En a = (2 ; 0)
    = [[16,3]]   ← On remplace (x, y) par g(a) = (4 ; 0)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[2,-1],[v,u]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[2,-1],[0,2]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    ? Dans quel ordre multiplier ? ✔ J_f(g(a))·J_g(a) / · J_g(a)·J_f(g(a))
    = [[16,3]]·[[2,-1],[0,2]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[32,-10]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(4 ; 0) = [[16,3]] | J_h(2 ; 0) = [[16,3]]·[[2,-1],[0,2]] = [[32,-10]]
  pièges : a2_chain_wrong_point, l_compose_order

Soit g(u, v) = (2uv + 2u, u) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (2y − 3, 2x). On pose h = f ∘ g. Calcule J_h(−1 ; −2).
  [tap, suivre l'erreur, menu menu]  g
    = (2 ; -1)   ← g(−1 ; −2)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    ? En quel point évaluer J_f ? ✔ En g(a) = (2 ; −1) / · En a = (−1 ; −2)
    = [[-5,4]]   ← On remplace (x, y) par g(a) = (2 ; −1)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[2v+2,2u],[1,0]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-2,-2],[1,0]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    ? Dans quel ordre multiplier ? ✔ J_f(g(a))·J_g(a) / · J_g(a)·J_f(g(a))
    = [[-5,4]]·[[-2,-2],[1,0]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[14,10]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(2 ; −1) = [[-5,4]] | J_h(−1 ; −2) = [[-5,4]]·[[-2,-2],[1,0]] = [[14,10]]
  pièges : a2_chain_wrong_point, l_compose_order

```

### Niveau 4

```
Soit g(u, v) = (uv + 2, 2uv) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (y + 2x, x). On pose h = f ∘ g. Calcule J_h(−1 ; 2).
  [free, suivre l'erreur]  g
    = (0 ; -4)   ← g(−1 ; 2)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[-4,0]]   ← On remplace (x, y) par g(a) = (0 ; −4)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[v,u],[2v,2u]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[2,-1],[4,-2]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[-4,0]]·[[2,-1],[4,-2]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[-8,4]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(0 ; −4) = [[-4,0]] | J_h(−1 ; 2) = [[-4,0]]·[[2,-1],[4,-2]] = [[-8,4]]

Soit g(u, v) = (uv + v, −v² − u) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−2 + y, x). On pose h = f ∘ g. Calcule J_h(−1 ; −1).
  [free, suivre l'erreur]  g
    = (0 ; 0)   ← g(−1 ; −1)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[-2,0]]   ← On remplace (x, y) par g(a) = (0 ; 0)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[v,u+1],[-1,-2v]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[-1,0],[-1,2]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[-2,0]]·[[-1,0],[-1,2]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[2,0]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(0 ; 0) = [[-2,0]] | J_h(−1 ; −1) = [[-2,0]]·[[-1,0],[-1,2]] = [[2,0]]

Soit g(u, v) = (v + 2u, uv + 2u) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (6x, 6y²). On pose h = f ∘ g. Calcule J_h(0 ; 2).
  [free, suivre l'erreur]  g
    = (2 ; 0)   ← g(0 ; 2)
  — La jacobienne de f au point g(a) :  [juge mat]  départ : J_f
    = [[12,0]]   ← On remplace (x, y) par g(a) = (2 ; 0)
  — La jacobienne de g :  [juge mat]  départ : J_g
    = [[2,1],[v+2,u]]   ← Une ligne par composante de g
  — … puis au point a :  [juge mat]  départ : J_g
    = [[2,1],[4,0]]
  — Le produit J_h(a) = J_f(g(a))·J_g(a) :  [juge mat]  départ : J_h
    = [[12,0]]·[[2,1],[4,0]]   ← J_f(g(a)) à gauche, J_g(a) à droite
    = [[24,12]]   ← Ligne fois colonnes
  aides : J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a). | J_f(2 ; 0) = [[12,0]] | J_h(0 ; 2) = [[12,0]]·[[2,1],[4,0]] = [[24,12]]

```

### Niveau 5

```
Soit g(u, v) = (uv − 2, 2v² − u − 2) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−4x, 2). On pose h = f ∘ g. Alors ∂h/∂v(1 ; 1) vaut :
  · 4 [a2_chain_wrong_point]   · −12   ✔ 12   · 8 [a2_chain_no_inner]
  pièges : a2_chain_wrong_point, a2_chain_no_inner

Soit g(u, v) = (−v + u + 1, −u²) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (3y, 3x − 6y²). On pose h = f ∘ g. Alors ∂h/∂v(1 ; 2) vaut :
  ✔ 3   · 6 [l_compose_order]   · −6 [a2_chain_wrong_point]   · 0 [a2_chain_no_inner]
  pièges : a2_chain_wrong_point, a2_chain_no_inner, l_compose_order

Soit g(u, v) = (−uv, uv) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (2, 3y² + 2). On pose h = f ∘ g. Alors ∂h/∂v(−2 ; 1) vaut :
  · −26 [l_compose_order]   · −28 [a2_chain_no_inner]   · −6 [a2_chain_wrong_point]   ✔ −24
  pièges : a2_chain_wrong_point, a2_chain_no_inner, l_compose_order

```

### Variantes d'examen

```
Soit g(u, v) = (−2u² + v − 1, −2v + 2v²) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (y + e^y, −6y² + x + xe^y). On pose h = f ∘ g. Alors ∂h/∂v(−1 ; 0) vaut :
  · 12 [a2_chain_no_inner]   ✔ 13   · −13   · 5 [a2_chain_wrong_point]
  [examen mcq]
  pièges : a2_chain_wrong_point, a2_chain_no_inner

Vrai ou faux ? « Pour g : ℝ² → ℝ² et f : ℝ² → ℝ différentiables, J_{f∘g}(a) = J_g(a)·J_f(g(a)). »
  · Vrai [l_compose_order]   ✔ Faux
  [examen tf]
  pièges : l_compose_order

Soit g(u, v) = (−2v + uv − 1, −uv + 2) et f : ℝ² → ℝ différentiable, de jacobienne J_f(x, y) = (−6x + 2y, 2x − 4y). On pose h = f ∘ g. Calcule ∂h/∂v(2 ; −1).
  [free, sans aide, examen coef]  h_v
    = 36
  pièges : a2_chain_wrong_point, a2_chain_no_inner

```

## Gradient et coordonnées polaires (`a2-chain-polar`, BA2)

_Les dérivées de f̃(r, φ) donnent ∇f par un système 2 × 2._

### Niveau 1

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (3r²·sin(φ) + 3r², r³·cos(φ)). Calcule ∇f(2 ; 0).
  [guided]  r
    = □   (trous : 2)   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = 0   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(2 ; 0), b = ∂f/∂y(2 ; 0), et J_f̃(2, 0) = (12, 8).)
    = a = 12 ; 2b = 8   ← En (r, φ) = (2, 0)
    = (12 ; 4)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = 0 : cos φ = 1, sin φ = 0 ; f̃_r = 12, f̃_φ = 8 | a = 12 ; 2b = 8

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (cos(φ) + 3r², −r·sin(φ)). Calcule ∇f(1 ; √3).
  [guided]  r
    = □   (trous : 2)   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/3   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(1 ; √3), b = ∂f/∂y(1 ; √3), et J_f̃(2, π/3) = (25/2, −√3).)
    = (1/2)a + (√3/2)b = 25/2 ; −√3a + b = −√3   ← En (r, φ) = (2, π/3)
    = (7 ; 6√3)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/3 : cos φ = 1/2, sin φ = √3/2 ; f̃_r = 25/2, f̃_φ = −√3 | (1/2)a + (√3/2)b = 25/2 ; −√3a + b = −√3

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (sin(φ) + 1, r·cos(φ)). Calcule ∇f(0 ; 2).
  [guided]  r
    = □   (trous : 2)   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/2   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(0 ; 2), b = ∂f/∂y(0 ; 2), et J_f̃(2, π/2) = (2, 0).)
    = b = 2 ; −2a = 0   ← En (r, φ) = (2, π/2)
    = (0 ; 2)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/2 : cos φ = 0, sin φ = 1 ; f̃_r = 2, f̃_φ = 0 | b = 2 ; −2a = 0

```

### Niveau 2

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·cos(2φ) + 3r², −2r²·sin(2φ)). Calcule ∇f(0 ; 2).
  [guided]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/2   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(0 ; 2), b = ∂f/∂y(0 ; 2), et J_f̃(2, π/2) = (8, 0).)
    = b = 8 ; −2a = 0   ← En (r, φ) = (2, π/2)
    = (0 ; 8)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/2 : cos φ = 0, sin φ = 1 ; f̃_r = 8, f̃_φ = 0 | b = 8 ; −2a = 0

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (3r²·cos(2φ) + 3r², −2r³·sin(2φ)). Calcule ∇f(√2 ; √2).
  [guided]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/4   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(√2 ; √2), b = ∂f/∂y(√2 ; √2), et J_f̃(2, π/4) = (12, −16).)
    = (√2/2)a + (√2/2)b = 12 ; −√2a + √2b = −16   ← En (r, φ) = (2, π/4)
    = (10√2 ; 2√2)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/4 : cos φ = √2/2, sin φ = √2/2 ; f̃_r = 12, f̃_φ = −16 | (√2/2)a + (√2/2)b = 12 ; −√2a + √2b = −16

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (3r²·cos(φ) + 1, −r³·sin(φ)). Calcule ∇f(0 ; 2).
  [guided]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/2   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    (f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x(0 ; 2), b = ∂f/∂y(0 ; 2), et J_f̃(2, π/2) = (1, −8).)
    = b = 1 ; −2a = −8   ← En (r, φ) = (2, π/2)
    = (4 ; 1)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/2 : cos φ = 0, sin φ = 1 ; f̃_r = 1, f̃_φ = −8 | b = 1 ; −2a = −8

```

### Niveau 3

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (3r²·cos(2φ) + 3r², −2r³·sin(2φ)). Calcule ∇f(−1 ; 0).
  [tap, suivre l'erreur, menu menu]  r
    = 1   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    ? Laquelle de ces identités est juste ? f_x² + f_y² = ✔ f̃_r² + f̃_φ²/r² / · f̃_r² + f̃_φ² / · f̃_r² + r²·f̃_φ² / · f̃_r²/r² + f̃_φ²
    = −a = 6 ; −b = 0   ← En (r, φ) = (1, π)
    = (-6 ; 0)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π : cos φ = −1, sin φ = 0 ; f̃_r = 6, f̃_φ = 0 | −a = 6 ; −b = 0
  pièges : a2_polar_grad_factor

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (3r²·cos(φ) + 1, −r³·sin(φ)). Calcule ∇f(0 ; 2).
  [tap, suivre l'erreur, menu menu]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/2   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    ? Laquelle de ces identités est juste ? f_x² + f_y² = ✔ f̃_r² + f̃_φ²/r² / · f̃_r² + f̃_φ² / · f̃_r² + r²·f̃_φ² / · f̃_r²/r² + f̃_φ²
    = b = 1 ; −2a = −8   ← En (r, φ) = (2, π/2)
    = (4 ; 1)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/2 : cos φ = 0, sin φ = 1 ; f̃_r = 1, f̃_φ = −8 | b = 1 ; −2a = −8
  pièges : a2_polar_grad_factor

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·sin(φ) + 1, r²·cos(φ)). Calcule ∇f(−2 ; 0).
  [tap, suivre l'erreur, menu menu]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    ? Laquelle de ces identités est juste ? f_x² + f_y² = ✔ f̃_r² + f̃_φ²/r² / · f̃_r² + f̃_φ² / · f̃_r² + r²·f̃_φ² / · f̃_r²/r² + f̃_φ²
    = −a = 1 ; −2b = −4   ← En (r, φ) = (2, π)
    = (-1 ; 2)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π : cos φ = −1, sin φ = 0 ; f̃_r = 1, f̃_φ = −4 | −a = 1 ; −2b = −4
  pièges : a2_polar_grad_factor

```

### Niveau 4

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (sin(φ) + 1, r·cos(φ)). Calcule ∇f(√2 ; √2).
  [free, suivre l'erreur]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/4   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    = (√2/2)a + (√2/2)b = 1 + √2/2 ; −√2a + √2b = √2   ← En (r, φ) = (2, π/4)
    = (√2/2 ; 1+√2/2)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/4 : cos φ = √2/2, sin φ = √2/2 ; f̃_r = 1 + √2/2, f̃_φ = √2 | (√2/2)a + (√2/2)b = 1 + √2/2 ; −√2a + √2b = √2

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·sin(2φ) + 1, 2r²·cos(2φ)). Calcule ∇f(√3 ; 1).
  [free, suivre l'erreur]  r
    = 2   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/6   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    = (√3/2)a + (1/2)b = 1 + 2√3 ; −a + √3b = 4   ← En (r, φ) = (2, π/6)
    = (2+√3/2 ; 1/2+2√3)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/6 : cos φ = √3/2, sin φ = 1/2 ; f̃_r = 1 + 2√3, f̃_φ = 4 | (√3/2)a + (1/2)b = 1 + 2√3 ; −a + √3b = 4

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·cos(φ) + 2r, −r²·sin(φ)). Calcule ∇f(1/2 ; √3/2).
  [free, suivre l'erreur]  r
    = 1   ← r = √(x² + y²)
  — L'angle polaire du point :  [juge value]  départ : φ
    = π/3   ← cos φ = x/r, sin φ = y/r
  — La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :  [juge system]  départ : a = f_x ; b = f_y
    = (1/2)a + (√3/2)b = 3 ; (−√3/2)a + (1/2)b = −√3/2   ← En (r, φ) = (1, π/3)
    = (9/4 ; 5√3/4)   ← (∂f/∂x ; ∂f/∂y) au point
  aides : Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y. | En φ = π/3 : cos φ = 1/2, sin φ = √3/2 ; f̃_r = 3, f̃_φ = −√3/2 | (1/2)a + (√3/2)b = 3 ; (−√3/2)a + (1/2)b = −√3/2

```

### Niveau 5

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·cos(2φ) + 1, −2r²·sin(2φ)). Alors ∇f(√3 ; 1) vaut :
  · (7√3/2 ; −9/2) [a2_polar_grad_factor]   ✔ (5√3/2 ; −3/2)   · (−3/2 ; 5√3/2)   · (9/2 ; √3/2) [a2_chain_wrong_point]
  pièges : a2_polar_grad_factor, a2_chain_wrong_point

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (2r·cos(φ) + 2r, −r²·sin(φ)). Alors ∇f(√3/2 ; 1/2) vaut :
  · (5/4 + √3 ; 1 + 3√3/4)   ✔ (7/4 + √3 ; 1 + √3/4)   · (1 + 3√3/4 ; 5/4 + √3) [a2_chain_wrong_point]   · (1 + √3/4 ; 7/4 + √3)
  pièges : a2_chain_wrong_point

Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (cos(2φ) + 3r², −2r·sin(2φ)). Alors ∇f(1/2 ; √3/2) vaut :
  · (7√3/4 ; −1/4) [a2_chain_wrong_point]   · (3√3/4 ; 11/4)   · (−1/4 ; 7√3/4)   ✔ (11/4 ; 3√3/4)
  pièges : a2_chain_wrong_point

```

### Variantes d'examen

```
Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ), r > 0. Alors f_x² + f_y² vaut :
  · f̃_r² + r²·f̃_φ² [a2_polar_grad_factor]   · f̃_r² + f̃_φ² [a2_polar_grad_factor]   ✔ f̃_r² + f̃_φ²/r²   · f̃_r²/r² + f̃_φ²
  [examen mcq]
  pièges : a2_polar_grad_factor

Vrai ou faux ?
  « Soit f : ℝ² → ℝ de classe C¹ et f̃(r, φ) = f(r cos φ, r sin φ), r > 0. Pour tout (r, φ) : f̃_r = cos φ·f_x + sin φ·f_y (dérivées de f prises en (r cos φ, r sin φ)). » → VRAI
  [examen tf]

```

## Laplacien en coordonnées polaires et radiales (`a2-laplacian-radial`, BA2)

_Δf = g″ + (n − 1)/r·g′ pour une fonction radiale._

### Niveau 1

```
Dans ℝ³, soit f = 1/√(x² + y² + z²) = g(r) avec g(r) = 1/r et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (1/r)
    (Δf = g″ + ((n − 1)/r)·g′, ici n − 1 = 2.)
    = □   (trous : −1/r²)   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (−1/r²)
    = □   (trous : 2/r³)   ← g″(r)
  — Le laplacien en dimension 3 :  [juge equiv]  départ : d/dr (d/dr (1/r)) + (2/r)·d/dr (1/r)
    = (2/r³) + (2/r)·(−1/r²)   ← g″ + (2/r)·g′
    = 0   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 2 ; g′ = −1/r² | Δf = (2/r³) + (2/r)·(−1/r²) = 0
  pièges : g6_quotient_sign, g6_quotient_no_square

Dans ℝ², soit f = e^(−(x² + y²)) = g(r) avec g(r) = e^(−r²) et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (e^(−r²))
    (Δf = g″ + ((n − 1)/r)·g′, ici n − 1 = 1.)
    = □   (trous : −2re^(−r²))   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (−2re^(−r²))
    = □   (trous : (4r² − 2)e^(−r²))   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (e^(−r²))) + (1/r)·d/dr (e^(−r²))
    = (4r² − 2)e^(−r²) + (1/r)·(−2re^(−r²))   ← g″ + (1/r)·g′
    = (4r² − 4)e^(−r²)   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = −2re^(−r²) | Δf = (4r² − 2)e^(−r²) + (1/r)·(−2re^(−r²)) = (4r² − 4)e^(−r²)
  pièges : g6_chain_forgot, g6_power_rule_exp

Dans ℝ², soit f = 1/(x² + y²) = g(r) avec g(r) = 1/r² et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (1/r²)
    (Δf = g″ + ((n − 1)/r)·g′, ici n − 1 = 1.)
    = □   (trous : −2/r³)   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (−2/r³)
    = □   (trous : 6/r⁴)   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (1/r²)) + (1/r)·d/dr (1/r²)
    = (6/r⁴) + (1/r)·(−2/r³)   ← g″ + (1/r)·g′
    = 4/r⁴   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = −2/r³ | Δf = (6/r⁴) + (1/r)·(−2/r³) = 4/r⁴
  pièges : g6_quotient_sign, g6_quotient_no_square

```

### Niveau 2

```
Dans ℝ³, soit f = 1/(x² + y² + z²) = g(r) avec g(r) = 1/r² et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (1/r²)
    ? f ne dépend que de r = ‖x‖ dans ℝ³. Quelle formule ? ✔ Δf = g″ + (2/r)·g′ / · Δf = g″ + (1/r)·g′ / · Δf = g″ + (3/r)·g′
    = −2/r³   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (−2/r³)
    = 6/r⁴   ← g″(r)
  — Le laplacien en dimension 3 :  [juge equiv]  départ : d/dr (d/dr (1/r²)) + (2/r)·d/dr (1/r²)
    = (6/r⁴) + (2/r)·(−2/r³)   ← g″ + (2/r)·g′
    = 2/r⁴   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 2 ; g′ = −2/r³ | Δf = (6/r⁴) + (2/r)·(−2/r³) = 2/r⁴
  pièges : g6_quotient_sign, g6_quotient_no_square, a2_laplacian_n

Dans ℝ³, soit f = ln(√(x² + y² + z²)) = g(r) avec g(r) = ln(r) et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (ln(r))
    ? f ne dépend que de r = ‖x‖ dans ℝ³. Quelle formule ? ✔ Δf = g″ + (2/r)·g′ / · Δf = g″ + (1/r)·g′ / · Δf = g″ + (3/r)·g′
    = 1/r   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (1/r)
    = −1/r²   ← g″(r)
  — Le laplacien en dimension 3 :  [juge equiv]  départ : d/dr (d/dr (ln(r))) + (2/r)·d/dr (ln(r))
    = (−1/r²) + (2/r)·(1/r)   ← g″ + (2/r)·g′
    = 1/r²   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 2 ; g′ = 1/r | Δf = (−1/r²) + (2/r)·(1/r) = 1/r²
  pièges : a2_laplacian_n

Dans ℝ², soit f = (x² + y²)^(3/2) = g(r) avec g(r) = r³ et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [guided]  d/dr (r³)
    ? f ne dépend que de r = ‖x‖ dans ℝ². Quelle formule ? ✔ Δf = g″ + (1/r)·g′ / · Δf = g″ + (2/r)·g′ / · Δf = g″
    = 3r²   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (3r²)
    = 6r   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (r³)) + (1/r)·d/dr (r³)
    = (6r) + (1/r)·(3r²)   ← g″ + (1/r)·g′
    = 9r   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = 3r² | Δf = (6r) + (1/r)·(3r²) = 9r
  pièges : a2_laplacian_n

```

### Niveau 3

```
Dans ℝ², soit f = (x² + y²)² = g(r) avec g(r) = r⁴ et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [tap, suivre l'erreur, menu menu]  d/dr (r⁴)
    ? f ne dépend que de r = ‖x‖ dans ℝ². Quelle formule ? ✔ Δf = g″ + (1/r)·g′ / · Δf = g″ + (2/r)·g′ / · Δf = g″
    = 4r³   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (4r³)
    = 12r²   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (r⁴)) + (1/r)·d/dr (r⁴)
    = (12r²) + (1/r)·(4r³)   ← g″ + (1/r)·g′
    = 16r²   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = 4r³ | Δf = (12r²) + (1/r)·(4r³) = 16r²
  pièges : a2_laplacian_n

Dans ℝ³, soit f = (x² + y² + z²)^(3/2) = g(r) avec g(r) = r³ et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [tap, suivre l'erreur, menu menu]  d/dr (r³)
    ? f ne dépend que de r = ‖x‖ dans ℝ³. Quelle formule ? ✔ Δf = g″ + (2/r)·g′ / · Δf = g″ + (1/r)·g′ / · Δf = g″ + (3/r)·g′
    = 3r²   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (3r²)
    = 6r   ← g″(r)
  — Le laplacien en dimension 3 :  [juge equiv]  départ : d/dr (d/dr (r³)) + (2/r)·d/dr (r³)
    = (6r) + (2/r)·(3r²)   ← g″ + (2/r)·g′
    = 12r   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 2 ; g′ = 3r² | Δf = (6r) + (2/r)·(3r²) = 12r
  pièges : a2_laplacian_n

Dans ℝ², soit f = ln(√(x² + y²)) = g(r) avec g(r) = ln(r) et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [tap, suivre l'erreur, menu menu]  d/dr (ln(r))
    ? f ne dépend que de r = ‖x‖ dans ℝ². Quelle formule ? ✔ Δf = g″ + (1/r)·g′ / · Δf = g″ + (2/r)·g′ / · Δf = g″
    = 1/r   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (1/r)
    = −1/r²   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (ln(r))) + (1/r)·d/dr (ln(r))
    = (−1/r²) + (1/r)·(1/r)   ← g″ + (1/r)·g′
    = 0   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = 1/r | Δf = (−1/r²) + (1/r)·(1/r) = 0
  pièges : a2_laplacian_n

```

### Niveau 4

```
Dans ℝ², soit f = ln(√(x² + y²)) = g(r) avec g(r) = ln(r) et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [free, suivre l'erreur]  d/dr (ln(r))
    = 1/r   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (1/r)
    = −1/r²   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (ln(r))) + (1/r)·d/dr (ln(r))
    = (−1/r²) + (1/r)·(1/r)   ← g″ + (1/r)·g′
    = 0   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = 1/r | Δf = (−1/r²) + (1/r)·(1/r) = 0

Dans ℝ³ privé de 0, pour quelles valeurs de α la fonction f = (x² + y² + z²)^(α/2) = r^α vérifie-t-elle Δf = 0 ? Calcule d'abord Δf.
  [free, suivre l'erreur]  d/dr (d/dr (r^α)) + (2/r)·d/dr (r^α)
    = α(α − 1)r^(α − 2) + 2αr^(α − 2)   ← g″ + (2/r)·g′
    = α(α + 1)r^(α − 2)   ← r^(α−2) en facteur
  — Δf = 0 pour r > 0 :  [juge solset]  départ : α(α + 1) = 0
    = α = 0 ou α = −1   ← r⁰ = 1 et r⁻¹ = 1/r
  aides : f = g(r) avec g = r^α : Δf = g″ + ((n − 1)/r)·g′. | Δf = α(α − 1)r^(α − 2) + 2αr^(α − 2) | Δf = α(α + 1)r^(α − 2) = 0
  pièges : a2_laplacian_n

Dans ℝ², soit f = ln(√(x² + y²)) = g(r) avec g(r) = ln(r) et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [free, suivre l'erreur]  d/dr (ln(r))
    = 1/r   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (1/r)
    = −1/r²   ← g″(r)
  — Le laplacien en dimension 2 :  [juge equiv]  départ : d/dr (d/dr (ln(r))) + (1/r)·d/dr (ln(r))
    = (−1/r²) + (1/r)·(1/r)   ← g″ + (1/r)·g′
    = 0   ← Simplifié
  aides : f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′. | Ici n − 1 = 1 ; g′ = 1/r | Δf = (−1/r²) + (1/r)·(1/r) = 0

```

### Niveau 5

```
Dans ℝ³, soit f = 1/√(x² + y² + z²) = g(r) avec g(r) = 1/r et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.
  [free, sans aide]  d/dr (1/r)
    = −1/r²   ← g′(r)
  — Puis g″ :  [juge equiv]  départ : d/dr (−1/r²)
    = 2/r³   ← g″(r)
  — Le laplacien en dimension 3 :  [juge equiv]  départ : d/dr (d/dr (1/r)) + (2/r)·d/dr (1/r)
    = (2/r³) + (2/r)·(−1/r²)   ← g″ + (2/r)·g′
    = 0   ← Simplifié
  pièges : g6_quotient_sign, g6_quotient_no_square

Dans ℝ² privé de 0, pour quelles valeurs de α la fonction f = (x² + y²)^(α/2) = r^α vérifie-t-elle Δf = 0 ? Calcule d'abord Δf.
  [free, sans aide]  d/dr (d/dr (r^α)) + (1/r)·d/dr (r^α)
    = α(α − 1)r^(α − 2) + αr^(α − 2)   ← g″ + (1/r)·g′
    = α²r^(α − 2)   ← r^(α−2) en facteur
  — Δf = 0 pour r > 0 :  [juge solset]  départ : α² = 0
    = α = 0   ← Seule la constante r⁰ = 1 : en dimension 2, c'est ln r qui est harmonique
  pièges : a2_laplacian_n

Dans ℝ³ privé de 0, pour quelles valeurs de α la fonction f = (x² + y² + z²)^(α/2) = r^α vérifie-t-elle Δf = 0 ? Calcule d'abord Δf.
  [free, sans aide]  d/dr (d/dr (r^α)) + (2/r)·d/dr (r^α)
    = α(α − 1)r^(α − 2) + 2αr^(α − 2)   ← g″ + (2/r)·g′
    = α(α + 1)r^(α − 2)   ← r^(α−2) en facteur
  — Δf = 0 pour r > 0 :  [juge solset]  départ : α(α + 1) = 0
    = α = 0 ou α = −1   ← r⁰ = 1 et r⁻¹ = 1/r
  pièges : a2_laplacian_n

```

### Variantes d'examen

```
Dans ℝ², soit f = e^(−(x² + y²)), c'est-à-dire f = g(r) avec g(r) = e^(−r²). Alors, pour r ≠ 0, Δf vaut :
  · (4r² − 8)e^(−r²)   ✔ (4r² − 4)e^(−r²)   · (4r² − 6)e^(−r²) [a2_laplacian_n]   · (4r² − 2)e^(−r²) [a2_laplacian_n]
  [examen mcq]
  pièges : a2_laplacian_n

Vrai ou faux ?
  « r² = x² + y² + z² est harmonique sur ℝ³. » → FAUX
    contre-exemple (a2) : x = 1, y = 0, z = 0
  [examen tf]

```

## Polynôme de Taylor d'ordre 2 à deux variables (`a2-taylor2`, BA2)

_Polynôme de Taylor d'ordre 2 : DL de la fonction extérieure, ou les six dérivées._

### Niveau 1

```
Soit f(x, y) = e^(2x − 3y). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [guided]  e^u
    (On pose u = 2x − 3y : u(0, 0) = 0, donc u est petit près de (0, 0).)
    = □ + u²·ε(u)   (trous : 1 + u + (1/2)u² + u²·ε(u))   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : e^(2x − 3y)
    = 1 + □ + (1/2)(2x − 3y)²   (trous : 1 + (2x − 3y) + (1/2)(2x − 3y)²)   ← eᵘ avec u = 2x − 3y
    = 1 + (2x − 3y) + (1/2)(4x² − 12xy + 9y²)   ← (2x − 3y)² développé
    = 1 + 2x − 3y + 2x² − 6xy + (9/2)y²   ← Termes regroupés
  aides : Écris f = eᵘ avec u = 2x − 3y petit, et utilise le DL de eᵘ à l'ordre 2. | u² ne garde que (2x − 3y)² | p₂ = 1 + 2x − 3y + 2x² − 6xy + (9/2)y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Soit f(x, y) = e^(x + 3y − 2x² − y²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [guided]  e^u
    (On pose u = x + 3y − 2x² − y² : u(0, 0) = 0, donc u est petit près de (0, 0).)
    = □ + u²·ε(u)   (trous : 1 + u + (1/2)u² + u²·ε(u))   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : e^(x + 3y − 2x² − y²)
    = 1 + □ + (1/2)(x + 3y − 2x² − y²)²   (trous : 1 + (x + 3y − 2x² − y²) + (1/2)(x + 3y − 2x² − y²)²)   ← eᵘ avec u = x + 3y − 2x² − y²
    = 1 + (x + 3y − 2x² − y²) + (1/2)□   (trous : 1 + (x + 3y − 2x² − y²) + (1/2)(x + 3y)²)   ← u² = (x + 3y)² + (degré ≥ 3)
    = 1 + (x + 3y − 2x² − y²) + (1/2)(x² + 6xy + 9y²)   ← (x + 3y)² développé
    = 1 + x + 3y − (3/2)x² + 3xy + (7/2)y²   ← Termes regroupés
  aides : Écris f = eᵘ avec u = x + 3y − 2x² − y² petit, et utilise le DL de eᵘ à l'ordre 2. | u² ne garde que (x + 3y)² | p₂ = 1 + x + 3y − (3/2)x² + 3xy + (7/2)y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Soit f(x, y) = ln(1 − 3x + 3y + xy + 2y²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [guided]  ln(1 + u)
    (On pose u = −3x + 3y + xy + 2y² : u(0, 0) = 0, donc u est petit près de (0, 0).)
    = □ + u²·ε(u)   (trous : u − (1/2)u² + u²·ε(u))   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : ln(1 − 3x + 3y + xy + 2y²)
    = □ − (1/2)(−3x + 3y + xy + 2y²)²   (trous : (−3x + 3y + xy + 2y²) − (1/2)(−3x + 3y + xy + 2y²)²)   ← ln(1 + u) avec u = −3x + 3y + xy + 2y²
    = (−3x + 3y + xy + 2y²) − (1/2)□   (trous : (−3x + 3y + xy + 2y²) − (1/2)(−3x + 3y)²)   ← u² = (−3x + 3y)² + (degré ≥ 3)
    = (−3x + 3y + xy + 2y²) − (1/2)(9x² − 18xy + 9y²)   ← (−3x + 3y)² développé
    = −3x + 3y − (9/2)x² + 10xy − (5/2)y²   ← Termes regroupés
  aides : Écris f = ln(1 + u) avec u = −3x + 3y + xy + 2y² petit, et utilise le DL de ln(1 + u) à l'ordre 2. | u² ne garde que (−3x + 3y)² | p₂ = −3x + 3y − (9/2)x² + 10xy − (5/2)y²
  pièges : a1_dl_remainder_wrong_order, a1_dl_truncate_early

```

### Niveau 2

```
Soit f(x, y) = cos(−2x − xy). Calcule les dérivées partielles d'ordre 1 et 2 de f en (0 ; 0), puis son polynôme de Taylor d'ordre 2 en (0 ; 0).
  [guided]  f
    = 1   ← f(0 ; 0)
  — ∂f/∂x(0 ; 0) :  [juge value]  départ : f_x
    = 0
  — ∂f/∂y(0 ; 0) :  [juge value]  départ : f_y
    = 0
  — ∂²f/∂x²(0 ; 0) :  [juge value]  départ : f_xx
    = −4
  — ∂²f/∂x∂y(0 ; 0) :  [juge value]  départ : f_xy
    = 0
  — ∂²f/∂y²(0 ; 0) :  [juge value]  départ : f_yy
    = 0
  — Le polynôme de Taylor :  [juge equiv]  départ : cos(−2x − xy)
    = 1 + (0)x + (0)y + (□)(□(0)xy + (−4)x² + (0)y²)   (trous : 1 + (0)x + (0)y + (1/2)(2(0)xy + (−4)x² + (0)y²))   ← X = x, Y = y
    = 1 − 2x²   ← Le ½ et le 2 du terme croisé se simplifient : le coefficient de XY est f_xy
  aides : p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), toutes les dérivées prises au point. | f(0 ; 0) = 1, ∂f/∂x(0 ; 0) = 0, ∂f/∂y(0 ; 0) = 0 | p₂ = 1 − 2x²

Soit f(x, y) = 1/(1 − 3x − y + x² + y²). Calcule les dérivées partielles d'ordre 1 et 2 de f en (0 ; 0), puis son polynôme de Taylor d'ordre 2 en (0 ; 0).
  [guided]  f
    = 1   ← f(0 ; 0)
  — ∂f/∂x(0 ; 0) :  [juge value]  départ : f_x
    = 3
  — ∂f/∂y(0 ; 0) :  [juge value]  départ : f_y
    = 1
  — ∂²f/∂x²(0 ; 0) :  [juge value]  départ : f_xx
    = 16
  — ∂²f/∂x∂y(0 ; 0) :  [juge value]  départ : f_xy
    = 6
  — ∂²f/∂y²(0 ; 0) :  [juge value]  départ : f_yy
    = 0
  — Le polynôme de Taylor :  [juge equiv]  départ : 1/(1 − 3x − y + x² + y²)
    = 1 + (3)x + (1)y + (□)(□(6)xy + (16)x² + (0)y²)   (trous : 1 + (3)x + (1)y + (1/2)(2(6)xy + (16)x² + (0)y²))   ← X = x, Y = y
    = 1 + 3x + y + 8x² + 6xy   ← Le ½ et le 2 du terme croisé se simplifient : le coefficient de XY est f_xy
  aides : p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), toutes les dérivées prises au point. | f(0 ; 0) = 1, ∂f/∂x(0 ; 0) = 3, ∂f/∂y(0 ; 0) = 1 | p₂ = 1 + 3x + y + 8x² + 6xy

Soit f(x, y) = ln(1 − 2x). Calcule les dérivées partielles d'ordre 1 et 2 de f en (0 ; 0), puis son polynôme de Taylor d'ordre 2 en (0 ; 0).
  [guided]  f
    = 0   ← f(0 ; 0)
  — ∂f/∂x(0 ; 0) :  [juge value]  départ : f_x
    = −2
  — ∂f/∂y(0 ; 0) :  [juge value]  départ : f_y
    = 0
  — ∂²f/∂x²(0 ; 0) :  [juge value]  départ : f_xx
    = −4
  — ∂²f/∂x∂y(0 ; 0) :  [juge value]  départ : f_xy
    = 0
  — ∂²f/∂y²(0 ; 0) :  [juge value]  départ : f_yy
    = 0
  — Le polynôme de Taylor :  [juge equiv]  départ : ln(1 − 2x)
    = 0 + (−2)x + (0)y + (□)(□(0)xy + (−4)x² + (0)y²)   (trous : 0 + (−2)x + (0)y + (1/2)(2(0)xy + (−4)x² + (0)y²))   ← X = x, Y = y
    = −2x − 2x²   ← Le ½ et le 2 du terme croisé se simplifient : le coefficient de XY est f_xy
  aides : p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), toutes les dérivées prises au point. | f(0 ; 0) = 0, ∂f/∂x(0 ; 0) = −2, ∂f/∂y(0 ; 0) = 0 | p₂ = −2x − 2x²

```

### Niveau 3

```
Soit f(x, y) = 1/(1 − 2x − x²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [tap, suivre l'erreur, menu menu]  1/(1 − u)
    ? Quelle méthode ? ✔ DL à une variable de la fonction extérieure (u petit) / ✔ Les six dérivées partielles en (0, 0) / · Développer u² en entier et tout garder
    = 1 + u + u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : 1/(1 − 2x − x²)
    = 1 + (2x + x²) + (2x + x²)²   ← 1/(1 − u) avec u = 2x + x²
    = 1 + (2x + x²) + (2x)²   ← u² = (2x)² + (degré ≥ 3)
    = 1 + 2x + 5x²   ← Termes regroupés
  aides : Écris f = 1/(1 − u) avec u = 2x + x² petit, et utilise le DL de 1/(1 − u) à l'ordre 2. | u² ne garde que (2x)² | p₂ = 1 + 2x + 5x²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early, a2_taylor_no_truncate

Soit f(x, y) = sin(−2x − y + y²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [tap, suivre l'erreur, menu menu]  sin(u)
    ? Quelle méthode ? ✔ DL à une variable de la fonction extérieure (u petit) / ✔ Les six dérivées partielles en (0, 0) / · Développer u² en entier et tout garder
    = u + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : sin(−2x − y + y²)
    = −2x − y + y²   ← Termes regroupés
  aides : Écris f = sin u avec u = −2x − y + y² petit, et utilise le DL de sin u à l'ordre 2. | Garde les termes de degré ≤ 2 de u | p₂ = −2x − y + y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a2_taylor_no_truncate

Soit f(x, y) = 1/(1 + 3x + 2y − 2x² + 2xy). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [tap, suivre l'erreur, menu menu]  1/(1 − u)
    ? Quelle méthode ? ✔ DL à une variable de la fonction extérieure (u petit) / ✔ Les six dérivées partielles en (0, 0) / · Développer u² en entier et tout garder
    = 1 + u + u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : 1/(1 + 3x + 2y − 2x² + 2xy)
    = 1 + (−3x − 2y + 2x² − 2xy) + (−3x − 2y + 2x² − 2xy)²   ← 1/(1 − u) avec u = −3x − 2y + 2x² − 2xy
    = 1 + (−3x − 2y + 2x² − 2xy) + (−3x − 2y)²   ← u² = (−3x − 2y)² + (degré ≥ 3)
    = 1 + (−3x − 2y + 2x² − 2xy) + (9x² + 12xy + 4y²)   ← (−3x − 2y)² développé
    = 1 − 3x − 2y + 11x² + 10xy + 4y²   ← Termes regroupés
  aides : Écris f = 1/(1 − u) avec u = −3x − 2y + 2x² − 2xy petit, et utilise le DL de 1/(1 − u) à l'ordre 2. | u² ne garde que (−3x − 2y)² | p₂ = 1 − 3x − 2y + 11x² + 10xy + 4y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order, a1_dl_truncate_early, a2_taylor_no_truncate

```

### Niveau 4

```
Soit f(x, y) = cos(2x − 3y). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [free, suivre l'erreur]  cos(u)
    = 1 − (1/2)u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : cos(2x − 3y)
    = 1 − (1/2)(2x − 3y)²   ← cos u avec u = 2x − 3y
    = 1 − (1/2)(4x² − 12xy + 9y²)   ← (2x − 3y)² développé
    = 1 − 2x² + 6xy − (9/2)y²   ← Termes regroupés
  aides : Écris f = cos u avec u = 2x − 3y petit, et utilise le DL de cos u à l'ordre 2. | u² ne garde que (2x − 3y)² | p₂ = 1 − 2x² + 6xy − (9/2)y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Soit f(x, y) = cos(−3y + x²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [free, suivre l'erreur]  cos(u)
    = 1 − (1/2)u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : cos(−3y + x²)
    = 1 − (1/2)(−3y + x²)²   ← cos u avec u = −3y + x²
    = 1 − (1/2)(−3y)²   ← u² = (−3y)² + (degré ≥ 3)
    = 1 − (9/2)y²   ← Termes regroupés
  aides : Écris f = cos u avec u = −3y + x² petit, et utilise le DL de cos u à l'ordre 2. | u² ne garde que (−3y)² | p₂ = 1 − (9/2)y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

Soit f(x, y) = cos(−3x − 3y − 2x² − y²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0).
  [free, suivre l'erreur]  cos(u)
    = 1 − (1/2)u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : cos(−3x − 3y − 2x² − y²)
    = 1 − (1/2)(−3x − 3y − 2x² − y²)²   ← cos u avec u = −3x − 3y − 2x² − y²
    = 1 − (1/2)(−3x − 3y)²   ← u² = (−3x − 3y)² + (degré ≥ 3)
    = 1 − (1/2)(9x² + 18xy + 9y²)   ← (−3x − 3y)² développé
    = 1 − (9/2)x² − 9xy − (9/2)y²   ← Termes regroupés
  aides : Écris f = cos u avec u = −3x − 3y − 2x² − y² petit, et utilise le DL de cos u à l'ordre 2. | u² ne garde que (−3x − 3y)² | p₂ = 1 − (9/2)x² − 9xy − (9/2)y²
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Niveau 5

```
Soit f(x, y) = ln(1 + 3x − 2y − 2x²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0), puis ∂²f/∂x∂y(0, 0).
  [free, sans aide]  ln(1 + u)
    = u − (1/2)u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : ln(1 + 3x − 2y − 2x²)
    = (3x − 2y − 2x²) − (1/2)(3x − 2y − 2x²)²   ← ln(1 + u) avec u = 3x − 2y − 2x²
    = (3x − 2y − 2x²) − (1/2)(3x − 2y)²   ← u² = (3x − 2y)² + (degré ≥ 3)
    = (3x − 2y − 2x²) − (1/2)(9x² − 12xy + 4y²)   ← (3x − 2y)² développé
    = 3x − 2y − (13/2)x² + 6xy − 2y²   ← Termes regroupés
  — Lis sur p₂ la dérivée croisée :  [juge value]  départ : f_xy
    = 6   ← Coefficient de xy = f_xy(0, 0)
  pièges : a1_dl_remainder_wrong_order, a1_dl_truncate_early

Soit f(x, y) = ln(1 − 3x + 2y − 2x² + y²). Calcule son polynôme de Taylor d'ordre 2 en (0, 0), puis ∂²f/∂x∂y(0, 0).
  [free, sans aide]  ln(1 + u)
    = u − (1/2)u² + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : ln(1 − 3x + 2y − 2x² + y²)
    = (−3x + 2y − 2x² + y²) − (1/2)(−3x + 2y − 2x² + y²)²   ← ln(1 + u) avec u = −3x + 2y − 2x² + y²
    = (−3x + 2y − 2x² + y²) − (1/2)(−3x + 2y)²   ← u² = (−3x + 2y)² + (degré ≥ 3)
    = (−3x + 2y − 2x² + y²) − (1/2)(9x² − 12xy + 4y²)   ← (−3x + 2y)² développé
    = −3x + 2y − (13/2)x² + 6xy − y²   ← Termes regroupés
  — Lis sur p₂ la dérivée croisée :  [juge value]  départ : f_xy
    = 6   ← Coefficient de xy = f_xy(0, 0)
  pièges : a1_dl_remainder_wrong_order, a1_dl_truncate_early

Soit f(x, y) = sin(−3x + x² + xy). Calcule son polynôme de Taylor d'ordre 2 en (0, 0), puis ∂²f/∂x∂y(0, 0).
  [free, sans aide]  sin(u)
    = u + u²·ε(u)   ← DL usuel à l'ordre 2
  — Le polynôme de Taylor d'ordre 2 de f en (0, 0) :  [juge equiv]  départ : sin(−3x + x² + xy)
    = −3x + x² + xy   ← Termes regroupés
  — Lis sur p₂ la dérivée croisée :  [juge value]  départ : f_xy
    = 1   ← Coefficient de xy = f_xy(0, 0)
  pièges : a1_dl_factorial_missing, a1_dl_remainder_wrong_order

```

### Variantes d'examen

```
Le polynôme de Taylor d'ordre 2 de f(x, y) = cos(x − 2y − 2x² − xy) en (0, 0) est :
  · 1 − x² + 4xy − 4y² [a2_taylor_no_half]   · 1 − (1/2)x² + 2xy − 2y² + 2x³ − 3x²y − 2xy² − 2x⁴ − 2x³y − (1/2)x²y² [a2_taylor_no_truncate]   · 1 − (1/2)x² + 4xy − 2y² [a2_taylor_cross]   ✔ 1 − (1/2)x² + 2xy − 2y²
  [examen mcq]
  pièges : a2_taylor_cross, a2_taylor_no_half, a2_taylor_no_truncate

Vrai ou faux ?
  « Si le polynôme de Taylor d'ordre 2 de f ∈ C² en (0, 0) est p₂ = 2 + x² + 2y², alors ∇f(0, 0) = (0, 0). » → VRAI
  [examen tf]

Soit f(x, y) = 1/(1 + x − 3y + 2y²). Que vaut ∂²f/∂x∂y(0, 0) ? (Lis-la sur le polynôme de Taylor d'ordre 2.)
  [free, sans aide, examen coef]  f_xy
    = −6
  pièges : a2_taylor_cross

```

## Fonction implicite y = g(x) : g′ et g″ (`a2-implicit-2var`, BA2)

_F_y ≠ 0, puis g′ = −F_x/F_y ; g″ en dérivant l'identité encore une fois._

### Niveau 1

```
L'équation x²y + 3y³ + 2y + 6 = 0 définit y = g(x) près de (1 ; −1). Vérifie F_y ≠ 0, puis calcule g′(1).
  [guided]  F_y
    = 1² + 9·(−1)² + 2   ← F_y en (1 ; −1)
    = □   (trous : 12)   ← ≠ 0 : le théorème s'applique
  — g′(1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    (F(1 ; −1) = 0 et F_y(1 ; −1) ≠ 0 : le théorème s'applique.)
    = −(2·1·(−1))/(12)   ← F_x(1 ; −1) = −2
    = □   (trous : 1/6)   ← Simplifier
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. | g′(1) = −(−2)/(…) | g′(1) = 1/6

L'équation 2xy − y + 5 = 0 définit y = g(x) près de (−2 ; 1). Vérifie F_y ≠ 0, puis calcule g′(−2).
  [guided]  F_y
    = 2·(−2) − 1   ← F_y en (−2 ; 1)
    = □   (trous : −5)   ← ≠ 0 : le théorème s'applique
  — g′(−2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    (F(−2 ; 1) = 0 et F_y(−2 ; 1) ≠ 0 : le théorème s'applique.)
    = −(2·1)/(−5)   ← F_x(−2 ; 1) = 2
    = □   (trous : 2/5)   ← Simplifier
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. | g′(−2) = −(2)/(…) | g′(−2) = 2/5

L'équation 3x³ + y² + 3x + 2 = 0 définit y = g(x) près de (−1 ; −2). Vérifie F_y ≠ 0, puis calcule g′(−1).
  [guided]  F_y
    = 2·(−2)   ← F_y en (−1 ; −2)
    = □   (trous : −4)   ← ≠ 0 : le théorème s'applique
  — g′(−1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    (F(−1 ; −2) = 0 et F_y(−1 ; −2) ≠ 0 : le théorème s'applique.)
    = −(9·(−1)² + 3)/(−4)   ← F_x(−1 ; −2) = 12
    = □   (trous : 3)   ← Simplifier
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. | g′(−1) = −(12)/(…) | g′(−1) = 3

```

### Niveau 2

```
L'équation 2y³ + 3x + 1 = 0 définit y = g(x) près de (−1 ; 1). Vérifie F_y ≠ 0, puis calcule g′(−1) et g″(−1).
  [guided]  F_y
    = 6·1²   ← F_y en (−1 ; 1)
    = 6   ← ≠ 0 : le théorème s'applique
  — g′(−1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; 1) = 6. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; 1) ? ✔ Oui : F(−1 ; 1) = 0, F est C¹ et F_y(−1 ; 1) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; 1) = 0
    = −(3)/(6)   ← F_x(−1 ; 1) = 3
    = −1/2   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (3 + 6y²p)′
    = □yp² + □y²q   (trous : 12yp² + 6y²q)   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = 1 et p = −1/2, puis isole q :  [juge value]  départ : g′′
    = −(12·1·(−1/2)²)/(6)   ← Remplacer
    = □   (trous : −1/2)   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 12yp² + 6y²q = 0, avec p = g′(−1) = −1/2. | g″(−1) = −(12·1·(−1/2)²)/(6)

L'équation 2x²y + 3xy + 2 = 0 définit y = g(x) près de (−2 ; −1). Vérifie F_y ≠ 0, puis calcule g′(−2) et g″(−2).
  [guided]  F_y
    = 2·(−2)² + 3·(−2)   ← F_y en (−2 ; −1)
    = 2   ← ≠ 0 : le théorème s'applique
  — g′(−2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−2 ; −1) = 2. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−2 ; −1) ? ✔ Oui : F(−2 ; −1) = 0, F est C¹ et F_y(−2 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(−2 ; −1) = 0
    = −(4·(−2)·(−1) + 3·(−1))/(2)   ← F_x(−2 ; −1) = 5
    = −5/2   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (4xy + 3y + (2x² + 3x)p)′
    = □y + (□x + 6)p + (2x² + 3x)q   (trous : 4y + (8x + 6)p + (2x² + 3x)q)   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −2, y = −1 et p = −5/2, puis isole q :  [juge value]  départ : g′′
    = −(4·(−1) + 8·(−2)·(−5/2) + 6·(−5/2))/(2)   ← Remplacer
    = □   (trous : −21/2)   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 4y + (8x + 6)p + (2x² + 3x)q = 0, avec p = g′(−2) = −5/2. | g″(−2) = −(4·(−1) + 8·(−2)·(−5/2) + 6·(−5/2))/(2)

L'équation 2x³ + x² − 2y² − 1 = 0 définit y = g(x) près de (1 ; −1). Vérifie F_y ≠ 0, puis calcule g′(1) et g″(1).
  [guided]  F_y
    = −4·(−1)   ← F_y en (1 ; −1)
    = 4   ← ≠ 0 : le théorème s'applique
  — g′(1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(1 ; −1) = 4. Le théorème des fonctions implicites donne-t-il y = g(…) près de (1 ; −1) ? ✔ Oui : F(1 ; −1) = 0, F est C¹ et F_y(1 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(1 ; −1) = 0
    = −(6·1² + 2·1)/(4)   ← F_x(1 ; −1) = 8
    = −2   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (6x² + 2x + (−4y)p)′
    = □x + 2 − □p² − 4yq   (trous : 12x + 2 − 4p² − 4yq)   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = 1, y = −1 et p = −2, puis isole q :  [juge value]  départ : g′′
    = −(12·1 + 2 − 4·(−2)²)/(4)   ← Remplacer
    = □   (trous : 1/2)   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 12x + 2 − 4p² − 4yq = 0, avec p = g′(1) = −2. | g″(1) = −(12·1 + 2 − 4·(−2)²)/(4)

```

### Niveau 3

```
L'équation 2x²y + xy² + 8 = 0 définit y = g(x) près de (−1 ; −2). Vérifie F_y ≠ 0, puis calcule g′(−1) et g″(−1).
  [tap, suivre l'erreur, menu steps]  F_y
    ? Comment obtiens-tu g′(−1) et g″(−1) ? ✔ Dérivation implicite : F(x, g(x)) = 0 / · Résoudre en y, puis dériver deux fois
    = 2·(−1)² + 2·(−1)·(−2)   ← F_y en (−1 ; −2)
    = 6   ← ≠ 0 : le théorème s'applique
  — g′(−1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; −2) = 6. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; −2) ? ✔ Oui : F(−1 ; −2) = 0, F est C¹ et F_y(−1 ; −2) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; −2) = 0
    = −(4·(−1)·(−2) + (−2)²)/(6)   ← F_x(−1 ; −2) = 12
    = −2   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (4xy + y² + (2x² + 2xy)p)′
    = 4y + (8x + 4y)p + 2xp² + (2x² + 2xy)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = −2 et p = −2, puis isole q :  [juge value]  départ : g′′
    = −(4·(−2) + 8·(−1)·(−2) + 4·(−2)·(−2) + 2·(−1)·(−2)²)/(6)   ← Remplacer
    = −8/3   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 4y + (8x + 4y)p + 2xp² + (2x² + 2xy)q = 0, avec p = g′(−1) = −2. | g″(−1) = −(4·(−2) + 8·(−1)·(−2) + 4·(−2)·(−2) + 2·(−1)·(−2)²)/(6)

L'équation 3x²y + y² − 2x = 0 définit y = g(x) près de (−1 ; −1). Vérifie F_y ≠ 0, puis calcule g′(−1) et g″(−1).
  [tap, suivre l'erreur, menu steps]  F_y
    ? Comment obtiens-tu g′(−1) et g″(−1) ? ✔ Dérivation implicite : F(x, g(x)) = 0 / · Résoudre en y, puis dériver deux fois
    = 3·(−1)² + 2·(−1)   ← F_y en (−1 ; −1)
    = 1   ← ≠ 0 : le théorème s'applique
  — g′(−1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; −1) = 1. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; −1) ? ✔ Oui : F(−1 ; −1) = 0, F est C¹ et F_y(−1 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; −1) = 0
    = −(6·(−1)·(−1) − 2)/(1)   ← F_x(−1 ; −1) = 4
    = −4   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (6xy − 2 + (3x² + 2y)p)′
    = 6y + 12xp + 2p² + (3x² + 2y)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = −1 et p = −4, puis isole q :  [juge value]  départ : g′′
    = −(6·(−1) + 12·(−1)·(−4) + 2·(−4)²)/(1)   ← Remplacer
    = −74   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 6y + 12xp + 2p² + (3x² + 2y)q = 0, avec p = g′(−1) = −4. | g″(−1) = −(6·(−1) + 12·(−1)·(−4) + 2·(−4)²)/(1)

L'équation xy² − 3y² + x + 2 = 0 définit y = g(x) près de (2 ; 2). Vérifie F_y ≠ 0, puis calcule g′(2) et g″(2).
  [tap, suivre l'erreur, menu steps]  F_y
    ? Comment obtiens-tu g′(2) et g″(2) ? ✔ Dérivation implicite : F(x, g(x)) = 0 / · Résoudre en y, puis dériver deux fois
    = 2·2·2 − 6·2   ← F_y en (2 ; 2)
    = −4   ← ≠ 0 : le théorème s'applique
  — g′(2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(2 ; 2) = −4. Le théorème des fonctions implicites donne-t-il y = g(…) près de (2 ; 2) ? ✔ Oui : F(2 ; 2) = 0, F est C¹ et F_y(2 ; 2) ≠ 0 / · Non : il faudrait aussi F_x(2 ; 2) = 0
    = −(2² + 1)/(−4)   ← F_x(2 ; 2) = 5
    = 5/4   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (y² + 1 + (2xy − 6y)p)′
    = 4yp + (2x − 6)p² + (2xy − 6y)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = 2, y = 2 et p = 5/4, puis isole q :  [juge value]  départ : g′′
    = −(4·2·(5/4) + 2·2·(5/4)² − 6·(5/4)²)/(−4)   ← Remplacer
    = 55/32   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 4yp + (2x − 6)p² + (2xy − 6y)q = 0, avec p = g′(2) = 5/4. | g″(2) = −(4·2·(5/4) + 2·2·(5/4)² − 6·(5/4)²)/(−4)

```

### Niveau 4

```
L'équation x²y + xy − 3x + 12 = 0 définit y = g(x) près de (2 ; −1). Vérifie F_y ≠ 0, puis calcule g′(2) et g″(2).
  [free, suivre l'erreur]  F_y
    = 2² + 2   ← F_y en (2 ; −1)
    = 6   ← ≠ 0 : le théorème s'applique
  — g′(2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(2 ; −1) = 6. Le théorème des fonctions implicites donne-t-il y = g(…) près de (2 ; −1) ? ✔ Oui : F(2 ; −1) = 0, F est C¹ et F_y(2 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(2 ; −1) = 0
    = −(2·2·(−1) + (−1) − 3)/(6)   ← F_x(2 ; −1) = −8
    = 4/3   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (2xy + y − 3 + (x² + x)p)′
    = 2y + (4x + 2)p + (x² + x)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = 2, y = −1 et p = 4/3, puis isole q :  [juge value]  départ : g′′
    = −(2·(−1) + 4·2·(4/3) + 2·(4/3))/(6)   ← Remplacer
    = −17/9   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 2y + (4x + 2)p + (x² + x)q = 0, avec p = g′(2) = 4/3. | g″(2) = −(2·(−1) + 4·2·(4/3) + 2·(4/3))/(6)

L'équation y³ − 2x² − y² + 4 = 0 définit y = g(x) près de (−1 ; −1). Vérifie F_y ≠ 0, puis calcule g′(−1) et g″(−1).
  [free, suivre l'erreur]  F_y
    = 3·(−1)² − 2·(−1)   ← F_y en (−1 ; −1)
    = 5   ← ≠ 0 : le théorème s'applique
  — g′(−1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; −1) = 5. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; −1) ? ✔ Oui : F(−1 ; −1) = 0, F est C¹ et F_y(−1 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; −1) = 0
    = −(−4·(−1))/(5)   ← F_x(−1 ; −1) = 4
    = −4/5   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (−4x + (3y² − 2y)p)′
    = −4 + (6y − 2)p² + (3y² − 2y)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = −1 et p = −4/5, puis isole q :  [juge value]  départ : g′′
    = −(−4 + 6·(−1)·(−4/5)² − 2·(−4/5)²)/(5)   ← Remplacer
    = 228/125   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici −4 + (6y − 2)p² + (3y² − 2y)q = 0, avec p = g′(−1) = −4/5. | g″(−1) = −(−4 + 6·(−1)·(−4/5)² − 2·(−4/5)²)/(5)

L'équation y³ + xy − 2y² − 4 = 0 définit y = g(x) près de (2 ; 2). Vérifie F_y ≠ 0, puis calcule g′(2) et g″(2).
  [free, suivre l'erreur]  F_y
    = 3·2² + 2 − 4·2   ← F_y en (2 ; 2)
    = 6   ← ≠ 0 : le théorème s'applique
  — g′(2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(2 ; 2) = 6. Le théorème des fonctions implicites donne-t-il y = g(…) près de (2 ; 2) ? ✔ Oui : F(2 ; 2) = 0, F est C¹ et F_y(2 ; 2) ≠ 0 / · Non : il faudrait aussi F_x(2 ; 2) = 0
    = −(2)/(6)   ← F_x(2 ; 2) = 2
    = −1/3   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g′ et q = g″ :  [juge equiv]  départ : (y + (3y² + x − 4y)p)′
    = 2p + (6y − 4)p² + (3y² + x − 4y)q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = 2, y = 2 et p = −1/3, puis isole q :  [juge value]  départ : g′′
    = −(2·(−1/3) + 6·2·(−1/3)² − 4·(−1/3)²)/(6)   ← Remplacer
    = −1/27   ← Isoler q
  aides : Vérifie F_y ≠ 0, puis g′ = −F_x/F_y. Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x). | F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici 2p + (6y − 4)p² + (3y² + x − 4y)q = 0, avec p = g′(2) = −1/3. | g″(2) = −(2·(−1/3) + 6·2·(−1/3)² − 4·(−1/3)²)/(6)

```

### Niveau 5

```
Vrai ou faux ?
  « Si F est de classe C¹ sur ℝ², F(2, −1) = 0 et ∂F/∂x(2, −1) ≠ 0, alors il existe une fonction f définie près de −1, avec f(−1) = 2 et F(f(y), y) = 0. » → VRAI

L'équation xy² + x − 2y + 6 = 0 définit y = g(x) près de (−2 ; −2). g′(−2) vaut :
  · 5/6 [a2_implicit_sign]   ✔ −5/6   · 6/5   · −6/5 [a2_implicit_inverted]
  pièges : a2_implicit_sign, a2_implicit_inverted

Vrai ou faux ? « Si F est C¹, F(1, 0) = 0 et ∂F/∂x(1, 0) ≠ 0, alors il existe g avec g(1) = 0 et F(x, g(x)) = 0 près de 1. »
  · Vrai [a2_implicit_inverted]   ✔ Faux
  pièges : a2_implicit_inverted

```

### Variantes d'examen

```
L'équation 2x²y − xy² − x + 9 = 0 définit y = g(x) près de (1 ; −2). g″(1) vaut :
  · −311/54   · −14/9 [a2_implicit_second_const]   ✔ −311/108   · 311/108
  [examen mcq]
  pièges : a2_implicit_second_const

Vrai ou faux ? « L'équation x³ − xy − 6 = 0 définit y = g(x) près de (2 ; 1), et g′(2) = 11/2. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Fonction implicite à 3 variables (`a2-implicit-3var`, BA2)

_g_x = −F_x/F_z, g_y = −F_y/F_z : la dérivée de la variable éliminée au dénominateur._

### Niveau 1

```
L'équation 2x²z + yz² − x² − yz − 1 = 0 définit z = g(x, y) près de (−1 ; 2 ; −1). Vérifie F_z ≠ 0, puis calcule g_x, g_y en (−1 ; 2).
  [guided]  F_z
    = 2·(−1)² + 2·2·(−1) − 2   ← F_z en (−1 ; 2 ; −1)
    = □   (trous : −4)   ← ≠ 0 : le théorème s'applique
  — g_x(−1 ; 2) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    (F(−1 ; 2 ; −1) = 0 et F_z(−1 ; 2 ; −1) ≠ 0 : le théorème s'applique.)
    = −(4·(−1)·(−1) − 2·(−1))/(−4)   ← F_x(−1 ; 2 ; −1)
    = □   (trous : 3/2)   ← Simplifier
  — g_y(−1 ; 2) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −((−1)² − (−1))/(−4)   ← F_y(−1 ; 2 ; −1) = 2
    = □   (trous : 1/2)   ← Simplifier
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(−1 ; 2) = −(6)/(−4) | 3/2

L'équation 3x²z − xz² + y²z = −15 définit y = g(x, z) près de (2 ; −1 ; −1). Vérifie F_y ≠ 0, puis calcule g_x, g_z en (2 ; −1).
  [guided]  F_y
    = 2·(−1)·(−1)   ← F_y en (2 ; −1 ; −1)
    = □   (trous : 2)   ← ≠ 0 : le théorème s'applique
  — g_x(2 ; −1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    (F(2 ; −1 ; −1) = 0 et F_y(2 ; −1 ; −1) ≠ 0 : le théorème s'applique.)
    = −(6·2·(−1) − (−1)²)/(2)   ← F_x(2 ; −1 ; −1)
    = □   (trous : 13/2)   ← Simplifier
  — g_z(2 ; −1) = −F_z/F_y :  [juge value]  départ : −F_z/F_y
    = −(3·2² − 2·2·(−1) + (−1)²)/(2)   ← F_z(2 ; −1 ; −1) = 17
    = □   (trous : −17/2)   ← Simplifier
  aides : La dérivée de la variable éliminée, y, va au dénominateur, avec un signe moins : g_x = −F_x/F_y. | g_x(2 ; −1) = −(−13)/(2) | 13/2

L'équation x²z − 2xyz + 2z³ − 7 = 0 définit y = g(x, z) près de (1 ; −2 ; 1). Vérifie F_y ≠ 0, puis calcule g_x, g_z en (1 ; 1).
  [guided]  F_y
    = −2·1·1   ← F_y en (1 ; −2 ; 1)
    = □   (trous : −2)   ← ≠ 0 : le théorème s'applique
  — g_x(1 ; 1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    (F(1 ; −2 ; 1) = 0 et F_y(1 ; −2 ; 1) ≠ 0 : le théorème s'applique.)
    = −(2·1·1 − 2·(−2)·1)/(−2)   ← F_x(1 ; −2 ; 1)
    = □   (trous : 3)   ← Simplifier
  — g_z(1 ; 1) = −F_z/F_y :  [juge value]  départ : −F_z/F_y
    = −(1² − 2·1·(−2) + 6·1²)/(−2)   ← F_z(1 ; −2 ; 1) = 11
    = □   (trous : 11/2)   ← Simplifier
  aides : La dérivée de la variable éliminée, y, va au dénominateur, avec un signe moins : g_x = −F_x/F_y. | g_x(1 ; 1) = −(6)/(−2) | 3

```

### Niveau 2

```
L'équation 4ye^(z − x) + z² + 2z = 7 définit z = g(x, y) près de (1 ; 1 ; 1). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (1 ; 1).
  [guided]  F_z
    = 4·1·e^(1 − 1) + 2·1 + 2   ← F_z en (1 ; 1 ; 1)
    = 8   ← ≠ 0 : le théorème s'applique
  — F_x(1 ; 1 ; 1) :  [juge value]  départ : F_x
    = −4·1·e^(1 − 1)   ← F_x = −4ye^(z − x)
    = −4   ← Calculer
  — F_y(1 ; 1 ; 1) :  [juge value]  départ : F_y
    = 4·e^(1 − 1)   ← F_y = 4e^(z − x)
    = 4   ← Calculer
  — g_x(1 ; 1) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(1 ; 1 ; 1) = 8. Le théorème des fonctions implicites donne-t-il z = g(…) près de (1 ; 1 ; 1) ? ✔ Oui : F(1 ; 1 ; 1) = 0, F est C¹ et F_z(1 ; 1 ; 1) ≠ 0 / · Non : il faudrait aussi F_x(1 ; 1 ; 1) = 0
    = −(−4)/(8)   ← F_x(1 ; 1 ; 1) = −4
    = 1/2   ← Simplifier
  — g_y(1 ; 1) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −(4)/(8)   ← F_y(1 ; 1 ; 1) = 4
    = −1/2   ← Simplifier
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (−4ye^(z − x) + (4ye^(z − x) + 2z + 2)p)′
    = □ye^(z − x) − □ype^(z − x) + (4ye^(z − x) + 2)p² + (4ye^(z − x) + 2z + 2)q   (trous : 4ye^(z − x) − 8ype^(z − x) + (4ye^(z − x) + 2)p² + (4ye^(z − x) + 2z + 2)q)   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 1, y = 1, z = 1 et p = 1/2, puis isole q :  [juge value]  départ : g_(xx)
    = −(4·1·e^(1 − 1) − 8·1·(1/2)·e^(1 − 1) + 4·1·(1/2)²·e^(1 − 1) + 2·(1/2)²)/(8)   ← Remplacer
    = □   (trous : −3/16)   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(1 ; 1) = −(−4)/(8) | 4ye^(z − x) − 8ype^(z − x) + (4ye^(z − x) + 2)p² + (4ye^(z − x) + 2z + 2)q = 0, puis −(4·1·e^(1 − 1) − 8·1·(1/2)·e^(1 − 1) + 4·1·(1/2)²·e^(1 − 1) + 2·(1/2)²)/(8)

L'équation 2xz² − 3xy + y + 6 = 0 définit z = g(x, y) près de (2 ; 2 ; 1). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (2 ; 2).
  [guided]  F_z
    = 4·2·1   ← F_z en (2 ; 2 ; 1)
    = 8   ← ≠ 0 : le théorème s'applique
  — F_x(2 ; 2 ; 1) :  [juge value]  départ : F_x
    = 2·1² − 3·2   ← F_x = 2z² − 3y
    = −4   ← Calculer
  — F_y(2 ; 2 ; 1) :  [juge value]  départ : F_y
    = −3·2 + 1   ← F_y = −3x + 1
    = −5   ← Calculer
  — g_x(2 ; 2) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(2 ; 2 ; 1) = 8. Le théorème des fonctions implicites donne-t-il z = g(…) près de (2 ; 2 ; 1) ? ✔ Oui : F(2 ; 2 ; 1) = 0, F est C¹ et F_z(2 ; 2 ; 1) ≠ 0 / · Non : il faudrait aussi F_x(2 ; 2 ; 1) = 0
    = −(−4)/(8)   ← F_x(2 ; 2 ; 1) = −4
    = 1/2   ← Simplifier
  — g_y(2 ; 2) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −(−5)/(8)   ← F_y(2 ; 2 ; 1) = −5
    = 5/8   ← Simplifier
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (2z² − 3y + 4xzp)′
    = □zp + □xp² + 4xzq   (trous : 8zp + 4xp² + 4xzq)   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 2, y = 2, z = 1 et p = 1/2, puis isole q :  [juge value]  départ : g_(xx)
    = −(8·1·(1/2) + 4·2·(1/2)²)/(8)   ← Remplacer
    = □   (trous : −3/4)   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(2 ; 2) = −(−4)/(8) | 8zp + 4xp² + 4xzq = 0, puis −(8·1·(1/2) + 4·2·(1/2)²)/(8)

L'équation 3x² + ye^(z − x) + 2y = 9 définit z = g(x, y) près de (2 ; −1 ; 2). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (2 ; −1).
  [guided]  F_z
    = (−1)·e^(2 − 2)   ← F_z en (2 ; −1 ; 2)
    = −1   ← ≠ 0 : le théorème s'applique
  — F_x(2 ; −1 ; 2) :  [juge value]  départ : F_x
    = −(−1)·e^(2 − 2) + 6·2   ← F_x = −ye^(z − x) + 6x
    = 13   ← Calculer
  — F_y(2 ; −1 ; 2) :  [juge value]  départ : F_y
    = e^(2 − 2) + 2   ← F_y = e^(z − x) + 2
    = 3   ← Calculer
  — g_x(2 ; −1) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(2 ; −1 ; 2) = −1. Le théorème des fonctions implicites donne-t-il z = g(…) près de (2 ; −1 ; 2) ? ✔ Oui : F(2 ; −1 ; 2) = 0, F est C¹ et F_z(2 ; −1 ; 2) ≠ 0 / · Non : il faudrait aussi F_x(2 ; −1 ; 2) = 0
    = −(13)/(−1)   ← F_x(2 ; −1 ; 2) = 13
    = 13   ← Simplifier
  — g_y(2 ; −1) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −(3)/(−1)   ← F_y(2 ; −1 ; 2) = 3
    = 3   ← Simplifier
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (−ye^(z − x) + 6x + ye^(z − x)p)′
    = ye^(z − x) + □ − 2ype^(z − x) + yp²e^(z − x) + yqe^(z − x)   (trous : ye^(z − x) + 6 − 2ype^(z − x) + yp²e^(z − x) + yqe^(z − x))   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 2, y = −1, z = 2 et p = 13, puis isole q :  [juge value]  départ : g_(xx)
    = −((−1)·e^(2 − 2) + 6 − 2·(−1)·13·e^(2 − 2) + (−1)·13²·e^(2 − 2))/(−1)   ← Remplacer
    = □   (trous : −138)   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(2 ; −1) = −(13)/(−1) | ye^(z − x) + 6 − 2ype^(z − x) + yp²e^(z − x) + yqe^(z − x) = 0, puis −((−1)·e^(2 − 2) + 6 − 2·(−1)·13·e^(2 − 2) + (−1)·13²·e^(2 − 2))/(−1)

```

### Niveau 3

```
L'équation x²z − xyz − y²z + z³ = 0 définit z = g(x, y) près de (1 ; −2 ; −1). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (1 ; −2).
  [tap, suivre l'erreur, menu steps]  F_z
    ? L'énoncé dit z = g(x, y). Quelle dérivée de F va au dénominateur ? · F_x / · F_y / ✔ F_z
    = 1² − 1·(−2) − (−2)² + 3·(−1)²   ← F_z en (1 ; −2 ; −1)
    = 2   ← ≠ 0 : le théorème s'applique
  — F_x(1 ; −2 ; −1) :  [juge value]  départ : F_x
    = 2·1·(−1) − (−2)·(−1)   ← F_x = 2xz − yz
    = −4   ← Calculer
  — F_y(1 ; −2 ; −1) :  [juge value]  départ : F_y
    = −1·(−1) − 2·(−2)·(−1)   ← F_y = −xz − 2yz
    = −3   ← Calculer
  — g_x(1 ; −2) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(1 ; −2 ; −1) = 2. Le théorème des fonctions implicites donne-t-il z = g(…) près de (1 ; −2 ; −1) ? ✔ Oui : F(1 ; −2 ; −1) = 0, F est C¹ et F_z(1 ; −2 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(1 ; −2 ; −1) = 0
    = −(−4)/(2)   ← F_x(1 ; −2 ; −1) = −4
    = 2   ← Simplifier
  — g_y(1 ; −2) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −(−3)/(2)   ← F_y(1 ; −2 ; −1) = −3
    = 3/2   ← Simplifier
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (2xz − yz + (x² − xy − y² + 3z²)p)′
    = 2z + (4x − 2y)p + 6zp² + (x² − xy − y² + 3z²)q   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 1, y = −2, z = −1 et p = 2, puis isole q :  [juge value]  départ : g_(xx)
    = −(2·(−1) + 4·1·2 − 2·(−2)·2 + 6·(−1)·2²)/(2)   ← Remplacer
    = 5   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(1 ; −2) = −(−4)/(2) | 2z + (4x − 2y)p + 6zp² + (x² − xy − y² + 3z²)q = 0, puis −(2·(−1) + 4·1·2 − 2·(−2)·2 + 6·(−1)·2²)/(2)
  pièges : a2_implicit_wrong_var

L'équation 3y² + 2ye^(z − x) + 2x − 6 = 0 définit y = g(x, z) près de (−1 ; −2 ; −1). Vérifie F_y ≠ 0, puis calcule g_x, g_z et g_xx en (−1 ; −1).
  [tap, suivre l'erreur, menu steps]  F_y
    ? L'énoncé dit y = g(x, z). Quelle dérivée de F va au dénominateur ? · F_x / ✔ F_y / · F_z
    = 6·(−2) + 2·e^((−1) − (−1))   ← F_y en (−1 ; −2 ; −1)
    = −10   ← ≠ 0 : le théorème s'applique
  — F_x(−1 ; −2 ; −1) :  [juge value]  départ : F_x
    = −2·(−2)·e^((−1) − (−1)) + 2   ← F_x = −2ye^(z − x) + 2
    = 6   ← Calculer
  — F_z(−1 ; −2 ; −1) :  [juge value]  départ : F_z
    = 2·(−2)·e^((−1) − (−1))   ← F_z = 2ye^(z − x)
    = −4   ← Calculer
  — g_x(−1 ; −1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; −2 ; −1) = −10. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; −2 ; −1) ? ✔ Oui : F(−1 ; −2 ; −1) = 0, F est C¹ et F_y(−1 ; −2 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; −2 ; −1) = 0
    = −(6)/(−10)   ← F_x(−1 ; −2 ; −1) = 6
    = 3/5   ← Simplifier
  — g_z(−1 ; −1) = −F_z/F_y :  [juge value]  départ : −F_z/F_y
    = −(−4)/(−10)   ← F_z(−1 ; −2 ; −1) = −4
    = −2/5   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (−2ye^(z − x) + 2 + (6y + 2e^(z − x))p)′
    = 2ye^(z − x) − 4pe^(z − x) + 6p² + (6y + 2e^(z − x))q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = −2, z = −1 et p = 3/5, puis isole q :  [juge value]  départ : g_(xx)
    = −(2·(−2)·e^((−1) − (−1)) − 4·(3/5)·e^((−1) − (−1)) + 6·(3/5)²)/(−10)   ← Remplacer
    = −53/125   ← Isoler q
  aides : La dérivée de la variable éliminée, y, va au dénominateur, avec un signe moins : g_x = −F_x/F_y. | g_x(−1 ; −1) = −(6)/(−10) | 2ye^(z − x) − 4pe^(z − x) + 6p² + (6y + 2e^(z − x))q = 0, puis −(2·(−2)·e^((−1) − (−1)) − 4·(3/5)·e^((−1) − (−1)) + 6·(3/5)²)/(−10)
  pièges : a2_implicit_wrong_var

L'équation 3x²z − 2xz² + yz − 10 = 0 définit z = g(x, y) près de (2 ; 2 ; 1). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (2 ; 2).
  [tap, suivre l'erreur, menu steps]  F_z
    ? L'énoncé dit z = g(x, y). Quelle dérivée de F va au dénominateur ? · F_x / · F_y / ✔ F_z
    = 3·2² − 4·2·1 + 2   ← F_z en (2 ; 2 ; 1)
    = 6   ← ≠ 0 : le théorème s'applique
  — F_x(2 ; 2 ; 1) :  [juge value]  départ : F_x
    = 6·2·1 − 2·1²   ← F_x = 6xz − 2z²
    = 10   ← Calculer
  — F_y(2 ; 2 ; 1) :  [juge value]  départ : F_y
    = 1   ← Calculer
  — g_x(2 ; 2) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(2 ; 2 ; 1) = 6. Le théorème des fonctions implicites donne-t-il z = g(…) près de (2 ; 2 ; 1) ? ✔ Oui : F(2 ; 2 ; 1) = 0, F est C¹ et F_z(2 ; 2 ; 1) ≠ 0 / · Non : il faudrait aussi F_x(2 ; 2 ; 1) = 0
    = −(10)/(6)   ← F_x(2 ; 2 ; 1) = 10
    = −5/3   ← Simplifier
  — g_y(2 ; 2) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −1/6   ← F_y(2 ; 2 ; 1) = 1
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (6xz − 2z² + (3x² − 4xz + y)p)′
    = 6z + (12x − 8z)p − 4xp² + (3x² − 4xz + y)q   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 2, y = 2, z = 1 et p = −5/3, puis isole q :  [juge value]  départ : g_(xx)
    = −(6·1 + 12·2·(−5/3) − 8·1·(−5/3) − 4·2·(−5/3)²)/(6)   ← Remplacer
    = 193/27   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(2 ; 2) = −(10)/(6) | 6z + (12x − 8z)p − 4xp² + (3x² − 4xz + y)q = 0, puis −(6·1 + 12·2·(−5/3) − 8·1·(−5/3) − 4·2·(−5/3)²)/(6)
  pièges : a2_implicit_wrong_var

```

### Niveau 4

```
L'équation 3xz² − 2x² − xy = −7 définit y = g(x, z) près de (−1 ; −2 ; −1). Vérifie F_y ≠ 0, puis calcule g_x, g_z et g_xx en (−1 ; −1).
  [free, suivre l'erreur]  F_y
    = −(−1)   ← F_y en (−1 ; −2 ; −1)
    = 1   ← ≠ 0 : le théorème s'applique
  — F_x(−1 ; −2 ; −1) :  [juge value]  départ : F_x
    = 3·(−1)² − 4·(−1) − (−2)   ← F_x = 3z² − 4x − y
    = 9   ← Calculer
  — F_z(−1 ; −2 ; −1) :  [juge value]  départ : F_z
    = 6·(−1)·(−1)   ← F_z = 6xz
    = 6   ← Calculer
  — g_x(−1 ; −1) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(−1 ; −2 ; −1) = 1. Le théorème des fonctions implicites donne-t-il y = g(…) près de (−1 ; −2 ; −1) ? ✔ Oui : F(−1 ; −2 ; −1) = 0, F est C¹ et F_y(−1 ; −2 ; −1) ≠ 0 / · Non : il faudrait aussi F_x(−1 ; −2 ; −1) = 0
    = −(9)/(1)   ← F_x(−1 ; −2 ; −1) = 9
    = −9   ← Simplifier
  — g_z(−1 ; −1) = −F_z/F_y :  [juge value]  départ : −F_z/F_y
    = −(6)/(1)   ← F_z(−1 ; −2 ; −1) = 6
    = −6   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (3z² − 4x − y + (−x)p)′
    = −4 − 2p − xq   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = −1, y = −2, z = −1 et p = −9, puis isole q :  [juge value]  départ : g_(xx)
    = −(−4 − 2·(−9))/(1)   ← Remplacer
    = −14   ← Isoler q
  aides : La dérivée de la variable éliminée, y, va au dénominateur, avec un signe moins : g_x = −F_x/F_y. | g_x(−1 ; −1) = −(9)/(1) | −4 − 2p − xq = 0, puis −(−4 − 2·(−9))/(1)

L'équation 2xyz + 2y²z − 3z³ − xz = 8 définit z = g(x, y) près de (1 ; 2 ; 1). Vérifie F_z ≠ 0, puis calcule g_x, g_y et g_xx en (1 ; 2).
  [free, suivre l'erreur]  F_z
    = 2·1·2 + 2·2² − 9·1² − 1   ← F_z en (1 ; 2 ; 1)
    = 2   ← ≠ 0 : le théorème s'applique
  — F_x(1 ; 2 ; 1) :  [juge value]  départ : F_x
    = 2·2·1 − 1   ← F_x = 2yz − z
    = 3   ← Calculer
  — F_y(1 ; 2 ; 1) :  [juge value]  départ : F_y
    = 2·1·1 + 4·2·1   ← F_y = 2xz + 4yz
    = 10   ← Calculer
  — g_x(1 ; 2) = −F_x/F_z :  [juge value]  départ : −F_x/F_z
    ? F_z(1 ; 2 ; 1) = 2. Le théorème des fonctions implicites donne-t-il z = g(…) près de (1 ; 2 ; 1) ? ✔ Oui : F(1 ; 2 ; 1) = 0, F est C¹ et F_z(1 ; 2 ; 1) ≠ 0 / · Non : il faudrait aussi F_x(1 ; 2 ; 1) = 0
    = −3/2   ← F_x(1 ; 2 ; 1) = 3
  — g_y(1 ; 2) = −F_y/F_z :  [juge value]  départ : −F_y/F_z
    = −(10)/(2)   ← F_y(1 ; 2 ; 1) = 10
    = −5   ← Simplifier
  — Dérive l'identité F_x + F_z·p = 0 par rapport à x, en se souvenant que z = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (2yz − z + (2xy + 2y² − 9z² − x)p)′
    = (4y − 2)p − 18zp² + (2xy + 2y² − 9z² − x)q   ← F_xx + 2F_xz·p + F_zz·p² + F_z·q
  — Remplace x = 1, y = 2, z = 1 et p = −3/2, puis isole q :  [juge value]  départ : g_(xx)
    = −(4·2·(−3/2) − 2·(−3/2) − 18·1·(−3/2)²)/(2)   ← Remplacer
    = 99/4   ← Isoler q
  aides : La dérivée de la variable éliminée, z, va au dénominateur, avec un signe moins : g_x = −F_x/F_z. | g_x(1 ; 2) = −(3)/(2) | (4y − 2)p − 18zp² + (2xy + 2y² − 9z² − x)q = 0, puis −(4·2·(−3/2) − 2·(−3/2) − 18·1·(−3/2)²)/(2)

L'équation xyz − ye^(z − x) + 2x + 2 = 0 définit y = g(x, z) près de (2 ; −2 ; 2). Vérifie F_y ≠ 0, puis calcule g_x, g_z et g_xx en (2 ; 2).
  [free, suivre l'erreur]  F_y
    = 2·2 − e^(2 − 2)   ← F_y en (2 ; −2 ; 2)
    = 3   ← ≠ 0 : le théorème s'applique
  — F_x(2 ; −2 ; 2) :  [juge value]  départ : F_x
    = (−2)·2 + (−2)·e^(2 − 2) + 2   ← F_x = yz + ye^(z − x) + 2
    = −4   ← Calculer
  — F_z(2 ; −2 ; 2) :  [juge value]  départ : F_z
    = 2·(−2) − (−2)·e^(2 − 2)   ← F_z = xy − ye^(z − x)
    = −2   ← Calculer
  — g_x(2 ; 2) = −F_x/F_y :  [juge value]  départ : −F_x/F_y
    ? F_y(2 ; −2 ; 2) = 3. Le théorème des fonctions implicites donne-t-il y = g(…) près de (2 ; −2 ; 2) ? ✔ Oui : F(2 ; −2 ; 2) = 0, F est C¹ et F_y(2 ; −2 ; 2) ≠ 0 / · Non : il faudrait aussi F_x(2 ; −2 ; 2) = 0
    = −(−4)/(3)   ← F_x(2 ; −2 ; 2) = −4
    = 4/3   ← Simplifier
  — g_z(2 ; 2) = −F_z/F_y :  [juge value]  départ : −F_z/F_y
    = −(−2)/(3)   ← F_z(2 ; −2 ; 2) = −2
    = 2/3   ← Simplifier
  — Dérive l'identité F_x + F_y·p = 0 par rapport à x, en se souvenant que y = g(…) dépend de x ; on note p = g_x et q = g_xx :  [juge equiv]  départ : (yz + ye^(z − x) + 2 + (xz − e^(z − x))p)′
    = −ye^(z − x) + (2z + 2e^(z − x))p + (xz − e^(z − x))q   ← F_xx + 2F_xy·p + F_yy·p² + F_y·q
  — Remplace x = 2, y = −2, z = 2 et p = 4/3, puis isole q :  [juge value]  départ : g_(xx)
    = −(−(−2)·e^(2 − 2) + 2·2·(4/3) + 2·(4/3)·e^(2 − 2))/(3)   ← Remplacer
    = −10/3   ← Isoler q
  aides : La dérivée de la variable éliminée, y, va au dénominateur, avec un signe moins : g_x = −F_x/F_y. | g_x(2 ; 2) = −(−4)/(3) | −ye^(z − x) + (2z + 2e^(z − x))p + (xz − e^(z − x))q = 0, puis −(−(−2)·e^(2 − 2) + 2·2·(4/3) + 2·(4/3)·e^(2 − 2))/(3)

```

### Niveau 5

```
L'équation 2y²z + 3xz + 3yz + 8 = 0 définit z = g(x, y) près de (2 ; −2 ; −1). g_xx(2 ; −2) vaut :
  ✔ −9/32   · −9/64 [a2_implicit_second_const]   · 9/32   · 23/32
  pièges : a2_implicit_second_const

L'équation y²z + xz + 3y² = 1 définit z = g(x, y) près de (1 ; 1 ; −1). Alors :
  ✔ g_x(1 ; 1) = 1/2 et g_y(1 ; 1) = −2   · g_x(1 ; 1) = −1/2 et g_y(1 ; 1) = 2 [a2_implicit_sign]   · g_x(1 ; 1) = 1/4 et g_y(1 ; 1) = 4 [a2_implicit_wrong_var]   · g_x(1 ; 1) = 2 et g_y(1 ; 1) = −1/2 [a2_implicit_inverted]
  pièges : a2_implicit_sign, a2_implicit_inverted, a2_implicit_wrong_var

L'équation xz² + yz² + 3xz − 2y² = −6 définit z = g(x, y) près de (1 ; −2 ; 1). Alors :
  ✔ g_x(1 ; −2) = −4 et g_y(1 ; −2) = −9   · g_x(1 ; −2) = −4/9 et g_y(1 ; −2) = −9/4 [a2_implicit_wrong_var]   · g_x(1 ; −2) = 4 et g_y(1 ; −2) = 9 [a2_implicit_sign]   · g_x(1 ; −2) = −1/4 et g_y(1 ; −2) = −1/9 [a2_implicit_inverted]
  pièges : a2_implicit_sign, a2_implicit_inverted, a2_implicit_wrong_var

```

### Variantes d'examen

```
L'équation 2z³ − 2xy − 3z² = −9 définit z = g(x, y) près de (−1 ; −2 ; −1). Alors :
  · g_x(−1 ; −2) = −3 et g_y(−1 ; −2) = −6 [a2_implicit_inverted]   ✔ g_x(−1 ; −2) = −1/3 et g_y(−1 ; −2) = −1/6   · g_x(−1 ; −2) = 1/3 et g_y(−1 ; −2) = 1/6 [a2_implicit_sign]   · g_x(−1 ; −2) = −2 et g_y(−1 ; −2) = −1/2 [a2_implicit_wrong_var]
  [examen mcq]
  pièges : a2_implicit_sign, a2_implicit_inverted, a2_implicit_wrong_var

```

## Points stationnaires : résoudre ∇f = 0 (`a2-crit-points`, BA2)

_Factoriser et séparer les cas, sans diviser par une variable._

### Niveau 1

```
Points stationnaires de f(x, y) = x³ − y³ − 6x² + 3y² + 45y. On a ∂f/∂x = 3x² − 12x et ∂f/∂y = −3y² + 6y + 45. Factorise ∂f/∂x :
  [guided]  3x² − 12x
    = 3x(□)   (trous : 3x(x − 4))   ← Mettre en facteur
  — Factorise ∂f/∂y :  [juge equiv]  départ : −3y² + 6y + 45
    = −3(□)(□)   (trous : −3(y + 3)(y − 5))   ← Mettre en facteur
  — Un produit est nul si l'un des facteurs l'est. Écris les cas : « (x = … ou x = …) ; (y = … ou y = …) ».  [juge system]  départ : 3x(x − 4) = 0 ; −3(y + 3)(y − 5) = 0
    = (x = 0 ou x = 4) ; (y = −3 ou y = 5)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 3&#x2062;x&#x2062;(x−4)=0;−3&#x2062;(y+3)&#x2062;(y−5)=0. | (x=0&#x2004;ou&#x2004;x=4);(y=−3&#x2004;ou&#x2004;y=5), puis les points (0 ; −3), (0 ; 5), (4 ; −3), (4 ; 5).

Points stationnaires de f(x, y) = 2x³ + y³ + 3x² + 3y². On a ∂f/∂x = 6x² + 6x et ∂f/∂y = 3y² + 6y. Factorise ∂f/∂x :
  [guided]  6x² + 6x
    = 6x(□)   (trous : 6x(x + 1))   ← Mettre en facteur
  — Factorise ∂f/∂y :  [juge equiv]  départ : 3y² + 6y
    = 3y(□)   (trous : 3y(y + 2))   ← Mettre en facteur
  — Un produit est nul si l'un des facteurs l'est. Écris les cas : « (x = … ou x = …) ; (y = … ou y = …) ».  [juge system]  départ : 6x(x + 1) = 0 ; 3y(y + 2) = 0
    = (x = −1 ou x = 0) ; (y = −2 ou y = 0)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 6&#x2062;x&#x2062;(x+1)=0;3&#x2062;y&#x2062;(y+2)=0. | (x=−1&#x2004;ou&#x2004;x=0);(y=−2&#x2004;ou&#x2004;y=0), puis les points (−1 ; −2), (−1 ; 0), (0 ; −2), (0 ; 0).

Points stationnaires de f(x, y) = −2x³ − 2y³ + 9x² + 27y² − 120y. On a ∂f/∂x = −6x² + 18x et ∂f/∂y = −6y² + 54y − 120. Factorise ∂f/∂x :
  [guided]  −6x² + 18x
    = −6x(□)   (trous : −6x(x − 3))   ← Mettre en facteur
  — Factorise ∂f/∂y :  [juge equiv]  départ : −6y² + 54y − 120
    = −6(□)(□)   (trous : −6(y − 4)(y − 5))   ← Mettre en facteur
  — Un produit est nul si l'un des facteurs l'est. Écris les cas : « (x = … ou x = …) ; (y = … ou y = …) ».  [juge system]  départ : −6x(x − 3) = 0 ; −6(y − 4)(y − 5) = 0
    = (x = 0 ou x = 3) ; (y = 4 ou y = 5)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient −6&#x2062;x&#x2062;(x−3)=0;−6&#x2062;(y−4)&#x2062;(y−5)=0. | (x=0&#x2004;ou&#x2004;x=3);(y=4&#x2004;ou&#x2004;y=5), puis les points (0 ; 4), (0 ; 5), (3 ; 4), (3 ; 5).

```

### Niveau 2

```
Trouve tous les points stationnaires de f(x, y) = 2x³ − 2y³ − 6x² − 9y² − 48x. Calcule ∂f/∂x :
  [guided]  ∂/∂x (2x³ − 2y³ − 6x² − 9y² − 48x)
    = □ − 12x − 48   (trous : 6x² − 12x − 48)   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (2x³ − 2y³ − 6x² − 9y² − 48x)
    = □   (trous : −6y² − 18y)   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 6x² − 12x − 48 = 0 ; −6y² − 18y = 0
    = 6(x + 2)(x − 4) = 0 ; −6y(y + 3) = 0   ← Factoriser chaque équation
    ? Comment exploiter le système 6(x + 2)(x − 4) = 0 ; −6y(y + 3) = 0 ? ✔ Un produit est nul si l'un des facteurs l'est : on sépare les cas / · Diviser par la variable en facteur / · Garder seulement le facteur qui n'est pas une variable seule
    = (x = −2 ou x = 4) ; (y = −3 ou y = 0)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 6&#x2062;(x+2)&#x2062;(x−4)=0;−6&#x2062;y&#x2062;(y+3)=0. | (x=−2&#x2004;ou&#x2004;x=4);(y=−3&#x2004;ou&#x2004;y=0), puis les points (−2 ; −3), (−2 ; 0), (4 ; −3), (4 ; 0).
  pièges : a2_crit_divide

Trouve tous les points stationnaires de f(x, y) = −x³ − 3xy² + 3x. Calcule ∂f/∂x :
  [guided]  ∂/∂x (−x³ − 3xy² + 3x)
    = −□x² − 3y² + 3   (trous : −3x² − 3y² + 3)   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (−x³ − 3xy² + 3x)
    = □   (trous : −6xy)   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : −3x² − 3y² + 3 = 0 ; −6xy = 0
    = x² + y² = 1 ; xy = 0   ← Diviser par −3 et par −6
    ? Comment exploiter le système x² + y² = 1 ; xy = 0 ? ✔ Un produit est nul si l'un des facteurs l'est : on sépare les cas / · Diviser par la variable en facteur / · Garder seulement le facteur qui n'est pas une variable seule
    = (x = 0 ou y = 0) ; x² + y² = 1   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
    = (x = 0 ; y^2 = 1) ou (y = 0 ; x^2 = 1)   ← Les deux cas
    = (0 ; 1), (0 ; -1), (1 ; 0), (-1 ; 0)   ← Les points stationnaires
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. xy = 0 : x = 0 ou y = 0. Ne divise pas par x ! | Le système devient x2+y2=1;x&#x2062;y=0. | (x=0&#x2004;ou&#x2004;y=0);x2+y2=1, puis les points (0 ; 1), (0 ; −1), (1 ; 0), (−1 ; 0).
  pièges : a2_crit_divide

Trouve tous les points stationnaires de f(x, y) = 2x³ − y³ − 12x² + 6y² − 30x − 9y. Calcule ∂f/∂x :
  [guided]  ∂/∂x (2x³ − y³ − 12x² + 6y² − 30x − 9y)
    = □ − 24x − 30   (trous : 6x² − 24x − 30)   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (2x³ − y³ − 12x² + 6y² − 30x − 9y)
    = −3y² + □ − 9   (trous : −3y² + 12y − 9)   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 6x² − 24x − 30 = 0 ; −3y² + 12y − 9 = 0
    = 6(x + 1)(x − 5) = 0 ; −3(y − 1)(y − 3) = 0   ← Factoriser chaque équation
    ? Comment exploiter le système 6(x + 1)(x − 5) = 0 ; −3(y − 1)(y − 3) = 0 ? ✔ Un produit est nul si l'un des facteurs l'est : on sépare les cas / · Diviser par la variable en facteur / · Garder seulement le facteur qui n'est pas une variable seule
    = (x = −1 ou x = 5) ; (y = 1 ou y = 3)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 6&#x2062;(x+1)&#x2062;(x−5)=0;−3&#x2062;(y−1)&#x2062;(y−3)=0. | (x=−1&#x2004;ou&#x2004;x=5);(y=1&#x2004;ou&#x2004;y=3), puis les points (−1 ; 1), (−1 ; 3), (5 ; 1), (5 ; 3).
  pièges : a2_crit_divide

```

### Niveau 3

```
Trouve tous les points stationnaires de f(x, y) = −x³ − 3xy² + 48x. Calcule ∂f/∂x :
  [tap, suivre l'erreur, menu steps]  ∂/∂x (−x³ − 3xy² + 48x)
    = −3x² − 3y² + 48   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (−x³ − 3xy² + 48x)
    = −6xy   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : −3x² − 3y² + 48 = 0 ; −6xy = 0
    = x² + y² = 16 ; xy = 0   ← Diviser par −3 et par −6
    = (x = 0 ou y = 0) ; x² + y² = 16   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
    = (x = 0 ; y^2 = 16) ou (y = 0 ; x^2 = 16)   ← Les deux cas
    = (0 ; 4), (0 ; -4), (4 ; 0), (-4 ; 0)   ← Les points stationnaires
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. xy = 0 : x = 0 ou y = 0. Ne divise pas par x ! | Le système devient x2+y2=16;x&#x2062;y=0. | (x=0&#x2004;ou&#x2004;y=0);x2+y2=16, puis les points (0 ; 4), (0 ; −4), (4 ; 0), (−4 ; 0).

Trouve tous les points stationnaires de f(x, y) = x³ + 3xy² − 27x. Calcule ∂f/∂x :
  [tap, suivre l'erreur, menu steps]  ∂/∂x (x³ + 3xy² − 27x)
    = 3x² + 3y² − 27   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 3xy² − 27x)
    = 6xy   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 3x² + 3y² − 27 = 0 ; 6xy = 0
    = x² + y² = 9 ; xy = 0   ← Diviser par 3 et par 6
    = (x = 0 ou y = 0) ; x² + y² = 9   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
    = (x = 0 ; y^2 = 9) ou (y = 0 ; x^2 = 9)   ← Les deux cas
    = (0 ; 3), (0 ; -3), (3 ; 0), (-3 ; 0)   ← Les points stationnaires
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. xy = 0 : x = 0 ou y = 0. Ne divise pas par x ! | Le système devient x2+y2=9;x&#x2062;y=0. | (x=0&#x2004;ou&#x2004;y=0);x2+y2=9, puis les points (0 ; 3), (0 ; −3), (3 ; 0), (−3 ; 0).

Trouve tous les points stationnaires de f(x, y) = 2x³ − 2y³ − 18x² + 12y² + 30x − 18y. Calcule ∂f/∂x :
  [tap, suivre l'erreur, menu steps]  ∂/∂x (2x³ − 2y³ − 18x² + 12y² + 30x − 18y)
    = 6x² − 36x + 30   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (2x³ − 2y³ − 18x² + 12y² + 30x − 18y)
    = −6y² + 24y − 18   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 6x² − 36x + 30 = 0 ; −6y² + 24y − 18 = 0
    = 6(x − 1)(x − 5) = 0 ; −6(y − 1)(y − 3) = 0   ← Factoriser chaque équation
    = (x = 1 ou x = 5) ; (y = 1 ou y = 3)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 6&#x2062;(x−1)&#x2062;(x−5)=0;−6&#x2062;(y−1)&#x2062;(y−3)=0. | (x=1&#x2004;ou&#x2004;x=5);(y=1&#x2004;ou&#x2004;y=3), puis les points (1 ; 1), (1 ; 3), (5 ; 1), (5 ; 3).

```

### Niveau 4

```
Trouve tous les points stationnaires de f(x, y) = −x³ − 3xy² + 15x + 12y. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (−x³ − 3xy² + 15x + 12y)
    = −3x² − 3y² + 15   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (−x³ − 3xy² + 15x + 12y)
    = −6xy + 12   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : −3x² − 3y² + 15 = 0 ; −6xy + 12 = 0
    = x² + y² = 5 ; xy = 2   ← Diviser par −3 et par −6
    = (x + y)² = 9 ; (x − y)² = 1   ← (x ± y)² = x² + y² ± 2xy = 5 ± 4
    = (x + y = 3 ou x + y = −3) ; (x − y = 1 ou x − y = −1)   ← Racines carrées : 4 cas
    = (2 ; 1), (1 ; 2), (-1 ; -2), (-2 ; -1)   ← Chaque cas est un système linéaire
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Simplifie, puis forme (x + y)² et (x − y)² avec x² + y² et xy. | Le système devient x2+y2=5;x&#x2062;y=2. | (x+y)2=9;(x−y)2=1, puis les points (2 ; 1), (1 ; 2), (−1 ; −2), (−2 ; −1).

Trouve tous les points stationnaires de f(x, y) = x³ − y³ − 6x² + 3y² − 15x. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (x³ − y³ − 6x² + 3y² − 15x)
    = 3x² − 12x − 15   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ − y³ − 6x² + 3y² − 15x)
    = −3y² + 6y   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 3x² − 12x − 15 = 0 ; −3y² + 6y = 0
    = 3(x + 1)(x − 5) = 0 ; −3y(y − 2) = 0   ← Factoriser chaque équation
    = (x = −1 ou x = 5) ; (y = 0 ou y = 2)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Chaque équation ne contient qu'une lettre : factorise-la. | Le système devient 3&#x2062;(x+1)&#x2062;(x−5)=0;−3&#x2062;y&#x2062;(y−2)=0. | (x=−1&#x2004;ou&#x2004;x=5);(y=0&#x2004;ou&#x2004;y=2), puis les points (−1 ; 0), (−1 ; 2), (5 ; 0), (5 ; 2).

Trouve tous les points stationnaires de f(x, y) = −x³ − 3xy² + 51x + 24y. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (−x³ − 3xy² + 51x + 24y)
    = −3x² − 3y² + 51   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (−x³ − 3xy² + 51x + 24y)
    = −6xy + 24   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : −3x² − 3y² + 51 = 0 ; −6xy + 24 = 0
    = x² + y² = 17 ; xy = 4   ← Diviser par −3 et par −6
    = (x + y)² = 25 ; (x − y)² = 9   ← (x ± y)² = x² + y² ± 2xy = 17 ± 8
    = (x + y = 5 ou x + y = −5) ; (x − y = 3 ou x − y = −3)   ← Racines carrées : 4 cas
    = (4 ; 1), (1 ; 4), (-1 ; -4), (-4 ; -1)   ← Chaque cas est un système linéaire
  aides : Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. Simplifie, puis forme (x + y)² et (x − y)² avec x² + y² et xy. | Le système devient x2+y2=17;x&#x2062;y=4. | (x+y)2=25;(x−y)2=9, puis les points (4 ; 1), (1 ; 4), (−1 ; −4), (−4 ; −1).

```

### Niveau 5

```
Trouve les points stationnaires de f(x, y) = x³ + 2y³ + 6x² − 6y² + 9x, puis donne la nature de chacun (hessienne). Commence par ∂f/∂x :
  [free, sans aide]  ∂/∂x (x³ + 2y³ + 6x² − 6y² + 9x)
    = 3x² + 12x + 9   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 2y³ + 6x² − 6y² + 9x)
    = 6y² − 12y   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 3x² + 12x + 9 = 0 ; 6y² − 12y = 0
    = 3(x + 3)(x + 1) = 0 ; 6y(y − 2) = 0   ← Factoriser chaque équation
    = (x = −3 ou x = −1) ; (y = 0 ou y = 2)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  — La hessienne de f :  [juge mat]  départ : H = ?
    = [[6x+12, 0], [0, 12y-12]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x+12,0],[0,12y-12]]
    = (6x + 12)(12y − 12)   ← det H = f_xx·f_yy − f_xy²
  — Au point (−3 ; 0) :  [juge value]  départ : (6·(−3) + 12)(12·0 − 12)
    = 72   ← det H(−3 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−3) + 12
    = −6   ← det H > 0 : le signe de f_xx décide
  — Au point (−3 ; 2) :  [juge value]  départ : (6·(−3) + 12)(12·2 − 12)
    ? En (−3 ; 0) : det H = 72 > 0 et f_xx = −6. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −72   ← det H(−3 ; 2)
  — Au point (−1 ; 0) :  [juge value]  départ : (6·(−1) + 12)(12·0 − 12)
    ? En (−3 ; 2) : det H = −72. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −72   ← det H(−1 ; 0)
  — Au point (−1 ; 2) :  [juge value]  départ : (6·(−1) + 12)(12·2 − 12)
    ? En (−1 ; 0) : det H = −72. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 72   ← det H(−1 ; 2)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−1) + 12
    = 6   ← det H > 0 : le signe de f_xx décide
  — Valeur du maximum local en (−3 ; 0) :  [juge value]  départ : (−3)³ + 2·0³ + 6·(−3)² − 6·0² + 9·(−3)
    ? En (−1 ; 2) : det H = 72 > 0 et f_xx = 6. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 0   ← Remplacer x et y dans f
  pièges : a2_hess_det_only

Trouve les points stationnaires de f(x, y) = x³ + 3xy² − 12x, puis donne la nature de chacun (hessienne). Commence par ∂f/∂x :
  [free, sans aide]  ∂/∂x (x³ + 3xy² − 12x)
    = 3x² + 3y² − 12   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 3xy² − 12x)
    = 6xy   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 3x² + 3y² − 12 = 0 ; 6xy = 0
    = x² + y² = 4 ; xy = 0   ← Diviser par 3 et par 6
    = (x = 0 ou y = 0) ; x² + y² = 4   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
    = (x = 0 ; y^2 = 4) ou (y = 0 ; x^2 = 4)   ← Les deux cas
    = (0 ; 2), (0 ; -2), (2 ; 0), (-2 ; 0)   ← Les points stationnaires
  — La hessienne de f :  [juge mat]  départ : H = ?
    = [[6x, 6y], [6y, 6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x,6y],[6y,6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (0 ; 2) :  [juge value]  départ : 36·0² − 36·2²
    = −144   ← det H(0 ; 2)
  — Au point (0 ; −2) :  [juge value]  départ : 36·0² − 36·(−2)²
    ? En (0 ; 2) : det H = −144. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −144   ← det H(0 ; −2)
  — Au point (2 ; 0) :  [juge value]  départ : 36·2² − 36·0²
    ? En (0 ; −2) : det H = −144. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 144   ← det H(2 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·2
    = 12   ← det H > 0 : le signe de f_xx décide
  — Au point (−2 ; 0) :  [juge value]  départ : 36·(−2)² − 36·0²
    ? En (2 ; 0) : det H = 144 > 0 et f_xx = 12. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 144   ← det H(−2 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−2)
    = −12   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (2 ; 0) :  [juge value]  départ : 2³ + 3·2·0² − 12·2
    ? En (−2 ; 0) : det H = 144 > 0 et f_xx = −12. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −16   ← Remplacer x et y dans f
  pièges : a2_hess_det_only

Trouve les points stationnaires de f(x, y) = x³ + 3xy² − 3x, puis donne la nature de chacun (hessienne). Commence par ∂f/∂x :
  [free, sans aide]  ∂/∂x (x³ + 3xy² − 3x)
    = 3x² + 3y² − 3   ← Dériver en x, y constant
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 3xy² − 3x)
    = 6xy   ← Dériver en y, x constant
  — Résous ∇f = 0 :  [juge system]  départ : 3x² + 3y² − 3 = 0 ; 6xy = 0
    = x² + y² = 1 ; xy = 0   ← Diviser par 3 et par 6
    = (x = 0 ou y = 0) ; x² + y² = 1   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
    = (x = 0 ; y^2 = 1) ou (y = 0 ; x^2 = 1)   ← Les deux cas
    = (0 ; 1), (0 ; -1), (1 ; 0), (-1 ; 0)   ← Les points stationnaires
  — La hessienne de f :  [juge mat]  départ : H = ?
    = [[6x, 6y], [6y, 6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x,6y],[6y,6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (0 ; 1) :  [juge value]  départ : 36·0² − 36·1²
    = −36   ← det H(0 ; 1)
  — Au point (0 ; −1) :  [juge value]  départ : 36·0² − 36·(−1)²
    ? En (0 ; 1) : det H = −36. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −36   ← det H(0 ; −1)
  — Au point (1 ; 0) :  [juge value]  départ : 36·1² − 36·0²
    ? En (0 ; −1) : det H = −36. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 36   ← det H(1 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·1
    = 6   ← det H > 0 : le signe de f_xx décide
  — Au point (−1 ; 0) :  [juge value]  départ : 36·(−1)² − 36·0²
    ? En (1 ; 0) : det H = 36 > 0 et f_xx = 6. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 36   ← det H(−1 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−1)
    = −6   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (1 ; 0) :  [juge value]  départ : 1³ + 3·1·0² − 3·1
    ? En (−1 ; 0) : det H = 36 > 0 et f_xx = −6. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −2   ← Remplacer x et y dans f
  pièges : a2_hess_det_only

```

### Variantes d'examen

```
Soit f(x, y) = x³ + 3xy² − 30x − 18y. Les points stationnaires de f sont :
  · (−3 ; −1), (−1 ; −3), (1 ; 1), (1 ; 3), (3 ; 1)   ✔ (−3 ; −1), (−1 ; −3), (1 ; 3), (3 ; 1)   · (−3 ; −1), (−1 ; −3), (0 ; 0), (1 ; 3), (3 ; 1)   · (1 ; 3), (3 ; 1)
  [examen mcq]

Vrai ou faux ?
  « Si f est de classe C¹ sur un ouvert et a un extremum local en un point p de cet ouvert, alors ∇f(p) = 0. » → VRAI
  [examen tf]

```

## Nature d'un point stationnaire (hessienne 2 × 2) (`a2-hessian-2x2`, BA2)

_Signe de det H, puis de f_xx : minimum, maximum ou point selle._

### Niveau 1

```
Les points (2 ; 1) et (−1 ; −2) sont des points stationnaires de f(x, y) = x³ + 3xy² − 15x − 12y. Donne leur nature. Sa hessienne est H = [[6x,6y],[6y,6x]], de déterminant det H = 36x² − 36y². Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule det H en (2 ; 1) :
  [guided]  36·2² − 36·1²
    = □   (trous : 108)   ← det H(2 ; 1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·2
    = □   (trous : 12)   ← det H > 0 : le signe de f_xx décide
  — Au point (−1 ; −2) :  [juge value]  départ : 36·(−1)² − 36·(−2)²
    ? En (2 ; 1) : det H = 108 > 0 et f_xx = 12. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = □   (trous : −108)   ← det H(−1 ; −2)
  — Valeur du minimum local en (2 ; 1) :  [juge value]  départ : 2³ + 3·2·1² − 15·2 − 12·1
    ? En (−1 ; −2) : det H = −108. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −28   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (2 ; 1) : det H = 36·2² − 36·1² = … | (2 ; 1) : det H = 108, f_xx = 12 : minimum local.

Les points (0 ; 0) et (−1 ; −1) sont des points stationnaires de f(x, y) = x³ + y³ + 3xy. Donne leur nature. Sa hessienne est H = [[6x,3],[3,6y]], de déterminant det H = 36xy − 9. Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule det H en (0 ; 0) :
  [guided]  36·0·0 − 9
    = □   (trous : −9)   ← det H(0 ; 0)
  — Au point (−1 ; −1) :  [juge value]  départ : 36·(−1)·(−1) − 9
    ? En (0 ; 0) : det H = −9. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = □   (trous : 27)   ← det H(−1 ; −1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−1)
    = □   (trous : −6)   ← det H > 0 : le signe de f_xx décide
  — Valeur du maximum local en (−1 ; −1) :  [juge value]  départ : (−1)³ + (−1)³ + 3·(−1)·(−1)
    ? En (−1 ; −1) : det H = 27 > 0 et f_xx = −6. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 1   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (0 ; 0) : det H = 36·0·0 − 9 = … | (0 ; 0) : det H = −9 : point selle.
  pièges : a2_hess_det_only

Les points (0 ; 0) et (3 ; 3) sont des points stationnaires de f(x, y) = x³ + y³ − 9xy. Donne leur nature. Sa hessienne est H = [[6x,-9],[-9,6y]], de déterminant det H = 36xy − 81. Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule det H en (0 ; 0) :
  [guided]  36·0·0 − 81
    = □   (trous : −81)   ← det H(0 ; 0)
  — Au point (3 ; 3) :  [juge value]  départ : 36·3·3 − 81
    ? En (0 ; 0) : det H = −81. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = □   (trous : 243)   ← det H(3 ; 3)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·3
    = □   (trous : 18)   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (3 ; 3) :  [juge value]  départ : 3³ + 3³ − 9·3·3
    ? En (3 ; 3) : det H = 243 > 0 et f_xx = 18. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −27   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (0 ; 0) : det H = 36·0·0 − 81 = … | (0 ; 0) : det H = −81 : point selle.

```

### Niveau 2

```
Les points (3 ; 2) et (−2 ; −3) sont des points stationnaires de f(x, y) = −x³ − 3xy² + 39x + 36y. Donne leur nature. Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule la hessienne H :
  [guided]  H = ?
    = [[-6x, -6y], [-6y, -6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[-6x,-6y],[-6y,-6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (3 ; 2) :  [juge value]  départ : 36·3² − 36·2²
    = □   (trous : 180)   ← det H(3 ; 2)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : −6·3
    = □   (trous : −18)   ← det H > 0 : le signe de f_xx décide
  — Au point (−2 ; −3) :  [juge value]  départ : 36·(−2)² − 36·(−3)²
    ? En (3 ; 2) : det H = 180 > 0 et f_xx = −18. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = □   (trous : −180)   ← det H(−2 ; −3)
  — Valeur du maximum local en (3 ; 2) :  [juge value]  départ : −3³ − 3·3·2² + 39·3 + 36·2
    ? En (−2 ; −3) : det H = −180. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 126   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (3 ; 2) : det H = 36·3² − 36·2² = … | (3 ; 2) : det H = 180, f_xx = −18 : maximum local.
  pièges : a2_jacobian_transposed, a2_hess_det_only

Les points (1 ; −1) et (4 ; −1) sont des points stationnaires de f(x, y) = −2x³ − 2y³ + 15x² − 3y² − 24x. Donne leur nature. Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule la hessienne H :
  [guided]  H = ?
    = [[-12x+30, 0], [0, -12y-6]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[-12x+30,0],[0,-12y-6]]
    = (−12x + 30)(−12y − 6)   ← det H = f_xx·f_yy − f_xy²
  — Au point (1 ; −1) :  [juge value]  départ : (−12·1 + 30)(−12·(−1) − 6)
    = □   (trous : 108)   ← det H(1 ; −1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : −12·1 + 30
    = □   (trous : 18)   ← det H > 0 : le signe de f_xx décide
  — Au point (4 ; −1) :  [juge value]  départ : (−12·4 + 30)(−12·(−1) − 6)
    ? En (1 ; −1) : det H = 108 > 0 et f_xx = 18. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = □   (trous : −108)   ← det H(4 ; −1)
  — Valeur du minimum local en (1 ; −1) :  [juge value]  départ : −2·1³ − 2·(−1)³ + 15·1² − 3·(−1)² − 24·1
    ? En (4 ; −1) : det H = −108. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −12   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (1 ; −1) : det H = (−12·1 + 30)(−12·(−1) − 6) = … | (1 ; −1) : det H = 108, f_xx = 18 : minimum local.
  pièges : a2_jacobian_transposed

Les points (0 ; 1) et (−1 ; 0) sont des points stationnaires de f(x, y) = −x³ − 3xy² + 3x. Donne leur nature. Arbre : det H < 0 → point selle ; det H > 0 et f_xx > 0 → minimum ; det H > 0 et f_xx < 0 → maximum ; det H = 0 → on ne peut pas conclure. Calcule la hessienne H :
  [guided]  H = ?
    = [[-6x, -6y], [-6y, -6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[-6x,-6y],[-6y,-6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (0 ; 1) :  [juge value]  départ : 36·0² − 36·1²
    = □   (trous : −36)   ← det H(0 ; 1)
  — Au point (−1 ; 0) :  [juge value]  départ : 36·(−1)² − 36·0²
    ? En (0 ; 1) : det H = −36. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = □   (trous : 36)   ← det H(−1 ; 0)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : −6·(−1)
    = □   (trous : 6)   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (−1 ; 0) :  [juge value]  départ : −(−1)³ − 3·(−1)·0² + 3·(−1)
    ? En (−1 ; 0) : det H = 36 > 0 et f_xx = 6. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −2   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (0 ; 1) : det H = 36·0² − 36·1² = … | (0 ; 1) : det H = −36 : point selle.
  pièges : a2_jacobian_transposed

```

### Niveau 3

```
Les points (2 ; 1) et (−1 ; −2) sont des points stationnaires de f(x, y) = −x³ − 3xy² + 15x + 12y. Donne leur nature. Calcule la hessienne H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[-6x, -6y], [-6y, -6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[-6x,-6y],[-6y,-6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (2 ; 1) :  [juge value]  départ : 36·2² − 36·1²
    = 108   ← det H(2 ; 1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : −6·2
    = −12   ← det H > 0 : le signe de f_xx décide
  — Au point (−1 ; −2) :  [juge value]  départ : 36·(−1)² − 36·(−2)²
    ? En (2 ; 1) : det H = 108 > 0 et f_xx = −12. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −108   ← det H(−1 ; −2)
  — Valeur du maximum local en (2 ; 1) :  [juge value]  départ : −2³ − 3·2·1² + 15·2 + 12·1
    ? En (−1 ; −2) : det H = −108. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 28   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (2 ; 1) : det H = 36·2² − 36·1² = … | (2 ; 1) : det H = 108, f_xx = −12 : maximum local.
  pièges : a2_jacobian_transposed, a2_hess_det_only

Les points (−2 ; −1) et (−2 ; 0) sont des points stationnaires de f(x, y) = −2x³ − 2y³ + 6x² − 3y² + 48x. Donne leur nature. Calcule la hessienne H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[-12x+12, 0], [0, -12y-6]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[-12x+12,0],[0,-12y-6]]
    = (−12x + 12)(−12y − 6)   ← det H = f_xx·f_yy − f_xy²
  — Au point (−2 ; −1) :  [juge value]  départ : (−12·(−2) + 12)(−12·(−1) − 6)
    = 216   ← det H(−2 ; −1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : −12·(−2) + 12
    = 36   ← det H > 0 : le signe de f_xx décide
  — Au point (−2 ; 0) :  [juge value]  départ : (−12·(−2) + 12)(−12·0 − 6)
    ? En (−2 ; −1) : det H = 216 > 0 et f_xx = 36. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −216   ← det H(−2 ; 0)
  — Valeur du minimum local en (−2 ; −1) :  [juge value]  départ : −2·(−2)³ − 2·(−1)³ + 6·(−2)² − 3·(−1)² + 48·(−2)
    ? En (−2 ; 0) : det H = −216. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −57   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (−2 ; −1) : det H = (−12·(−2) + 12)(−12·(−1) − 6) = … | (−2 ; −1) : det H = 216, f_xx = 36 : minimum local.
  pièges : a2_jacobian_transposed

Les points (−2 ; −2) et (−2 ; 1) sont des points stationnaires de f(x, y) = x³ − 2y³ + 3x² − 3y² + 12y. Donne leur nature. Calcule la hessienne H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[6x+6, 0], [0, -12y-6]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x+6,0],[0,-12y-6]]
    = (6x + 6)(−12y − 6)   ← det H = f_xx·f_yy − f_xy²
  — Au point (−2 ; −2) :  [juge value]  départ : (6·(−2) + 6)(−12·(−2) − 6)
    = −108   ← det H(−2 ; −2)
  — Au point (−2 ; 1) :  [juge value]  départ : (6·(−2) + 6)(−12·1 − 6)
    ? En (−2 ; −2) : det H = −108. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 108   ← det H(−2 ; 1)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−2) + 6
    = −6   ← det H > 0 : le signe de f_xx décide
  — Valeur du maximum local en (−2 ; 1) :  [juge value]  départ : (−2)³ − 2·1³ + 3·(−2)² − 3·1² + 12·1
    ? En (−2 ; 1) : det H = 108 > 0 et f_xx = −6. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 11   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (−2 ; −2) : det H = (6·(−2) + 6)(−12·(−2) − 6) = … | (−2 ; −2) : det H = −108 : point selle.
  pièges : a2_jacobian_transposed, a2_hess_det_only

```

### Niveau 4

```
Les points (0 ; 0) et (2 ; 2) sont des points stationnaires de f(x, y) = x³ + y³ − 6xy. Donne leur nature. Calcule la hessienne H :
  [free, suivre l'erreur]  H = ?
    = [[6x, -6], [-6, 6y]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x,-6],[-6,6y]]
    = 36xy − 36   ← det H = f_xx·f_yy − f_xy²
  — Au point (0 ; 0) :  [juge value]  départ : 36·0·0 − 36
    = −36   ← det H(0 ; 0)
  — Au point (2 ; 2) :  [juge value]  départ : 36·2·2 − 36
    ? En (0 ; 0) : det H = −36. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 108   ← det H(2 ; 2)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·2
    = 12   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (2 ; 2) :  [juge value]  départ : 2³ + 2³ − 6·2·2
    ? En (2 ; 2) : det H = 108 > 0 et f_xx = 12. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −8   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (0 ; 0) : det H = 36·0·0 − 36 = … | (0 ; 0) : det H = −36 : point selle.
  pièges : a2_jacobian_transposed

(0, 0) est un point stationnaire de f(x, y) = x²y². Donne sa nature. Calcule H(0, 0) :
  [free, suivre l'erreur]  H(0 ; 0) = ?
    = [[0, 0], [0, 0]]   ← Dérivées secondes en (0, 0)
  — Son déterminant :  [juge det]  départ : det[[0,0],[0,0]]
    = 0   ← det H(0, 0) = 0
  — La hessienne ne décide pas : on étudie f directement. Restriction de f à la droite y = x :  [juge equiv]  départ : x²·(x)²
    ? det H(0, 0) = 0. Que peut-on conclure avec la hessienne ? ✔ Rien : il faut étudier f autour de (0, 0) / · C'est un point selle / · Ce n'est pas un extremum
    = x⁴   ← f sur y = x
  — Valeur de f en (0, 0) :  [juge value]  départ : 0²·0²
    ? f(0, 0) = 0 et, sur la droite y = x, f = x⁴. Nature de (0, 0) ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 0   ← f(0, 0) = 0
  aides : Calcule H(0, 0). Si det H = 0, la hessienne ne décide pas : étudie le signe de f − f(0, 0). | Restreins f à y = x. | f ≥ 0 = f(0, 0) partout (minimum non strict) : minimum local.
  pièges : a2_jacobian_transposed, a2_hess_degenerate

Les points (4 ; 3), (3 ; 4) et (−4 ; −3) sont des points stationnaires de f(x, y) = x³ + 3xy² − 75x − 72y. Donne leur nature. Calcule la hessienne H :
  [free, suivre l'erreur]  H = ?
    = [[6x, 6y], [6y, 6x]]   ← H = [[f_xx, f_xy], [f_xy, f_yy]]
  — Son déterminant :  [juge det]  départ : det[[6x,6y],[6y,6x]]
    = 36x² − 36y²   ← det H = f_xx·f_yy − f_xy²
  — Au point (4 ; 3) :  [juge value]  départ : 36·4² − 36·3²
    = 252   ← det H(4 ; 3)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·4
    = 24   ← det H > 0 : le signe de f_xx décide
  — Au point (3 ; 4) :  [juge value]  départ : 36·3² − 36·4²
    ? En (4 ; 3) : det H = 252 > 0 et f_xx = 24. Nature du point ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −252   ← det H(3 ; 4)
  — Au point (−4 ; −3) :  [juge value]  départ : 36·(−4)² − 36·(−3)²
    ? En (3 ; 4) : det H = −252. Nature du point ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 252   ← det H(−4 ; −3)
  — det H > 0 : le signe de f_xx décide.  [juge value]  départ : 6·(−4)
    = −24   ← det H > 0 : le signe de f_xx décide
  — Valeur du minimum local en (4 ; 3) :  [juge value]  départ : 4³ + 3·4·3² − 75·4 − 72·3
    ? En (−4 ; −3) : det H = 252 > 0 et f_xx = −24. Nature du point ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −344   ← Remplacer x et y dans f
  aides : Calcule det H au point ; s'il est positif, regarde le signe de f_xx. | (4 ; 3) : det H = 36·4² − 36·3² = … | (4 ; 3) : det H = 252, f_xx = 24 : minimum local.
  pièges : a2_jacobian_transposed, a2_hess_det_only

```

### Niveau 5

```
Soit f(x, y) = x³ − y³ − 6xy. Trouve ses points stationnaires, puis choisis l'affirmation vraie sur leur nature.
  [problème, 7 points]
  partie 1 (Points stationnaires : 1 ; Puis ∂f/∂y : 1 ; Résous ∇f = 0 : 2)
  Points stationnaires de f(x, y) = x³ − y³ − 6xy. Calcule ∂f/∂x :
    [free, sans aide, suivre l'erreur]  ∂/∂x (x³ − y³ − 6xy)
      = 3x² − 6y   ← Dériver en x, y constant
    — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ − y³ − 6xy)
      = −3y² − 6x   ← Dériver en y, x constant
    — Résous ∇f = 0 :  [juge system]  départ : 3x² − 6y = 0 ; −3y² − 6x = 0
      = y = x²/2 ; −y² − 2x = 0   ← 1re équation : y = x²/2 ; la 2e divisée par 3
      = y = x²/2 ; x(x³ + 8) = 0   ← Substituer y dans la 2e équation, puis mettre x en facteur (sans diviser par x)
      = y = x²/2 ; (x = 0 ou x = −2)   ← x = 0, ou x³ = −8
      = (0 ; 0), (-2 ; 2)   ← y = x²/2 dans chaque cas
  partie 2 (Nature des points : 3)
  Soit f(x, y) = x³ − y³ − 6xy, dont les points stationnaires sont (0 ; 0), (−2 ; 2). Laquelle de ces affirmations est vraie ?
    · f a un minimum local en (−2 ; 2) [a2_hess_det_only]   · f a un maximum local en (0 ; 0) [a2_stationary_is_extremum]   ✔ f a un maximum local en (−2 ; 2)   · f a un point selle en (−2 ; 2)
  pièges : a2_hess_det_only, a2_stationary_is_extremum

Soit f(x, y) = x³ + 2y³ − 6x² − 6y² − 15x. Trouve ses points stationnaires, puis choisis l'affirmation vraie sur leur nature.
  [problème, 7 points]
  partie 1 (Points stationnaires : 1 ; Puis ∂f/∂y : 1 ; Résous ∇f = 0 : 2)
  Points stationnaires de f(x, y) = x³ + 2y³ − 6x² − 6y² − 15x. Calcule ∂f/∂x :
    [free, sans aide, suivre l'erreur]  ∂/∂x (x³ + 2y³ − 6x² − 6y² − 15x)
      = 3x² − 12x − 15   ← Dériver en x, y constant
    — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 2y³ − 6x² − 6y² − 15x)
      = 6y² − 12y   ← Dériver en y, x constant
    — Résous ∇f = 0 :  [juge system]  départ : 3x² − 12x − 15 = 0 ; 6y² − 12y = 0
      = 3(x + 1)(x − 5) = 0 ; 6y(y − 2) = 0   ← Factoriser chaque équation
      = (x = −1 ou x = 5) ; (y = 0 ou y = 2)   ← Un produit est nul si l'un des facteurs l'est : 2 × 2 = 4 cas
  partie 2 (Nature des points : 3)
  Soit f(x, y) = x³ + 2y³ − 6x² − 6y² − 15x, dont les points stationnaires sont (−1 ; 0), (−1 ; 2), (5 ; 0), (5 ; 2). Laquelle de ces affirmations est vraie ?
    ✔ f a un minimum local en (5 ; 2)   · f a un point selle en (5 ; 2)   · f a un minimum local en (−1 ; 2) [a2_stationary_is_extremum]   · f a un minimum local en (−1 ; 0) [a2_hess_det_only]
  pièges : a2_hess_det_only, a2_stationary_is_extremum

Soit f(x, y) = x³ + 3xy² − 27x. Trouve ses points stationnaires, puis choisis l'affirmation vraie sur leur nature.
  [problème, 7 points]
  partie 1 (Points stationnaires : 1 ; Puis ∂f/∂y : 1 ; Résous ∇f = 0 : 2)
  Points stationnaires de f(x, y) = x³ + 3xy² − 27x. Calcule ∂f/∂x :
    [free, sans aide, suivre l'erreur]  ∂/∂x (x³ + 3xy² − 27x)
      = 3x² + 3y² − 27   ← Dériver en x, y constant
    — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (x³ + 3xy² − 27x)
      = 6xy   ← Dériver en y, x constant
    — Résous ∇f = 0 :  [juge system]  départ : 3x² + 3y² − 27 = 0 ; 6xy = 0
      = x² + y² = 9 ; xy = 0   ← Diviser par 3 et par 6
      = (x = 0 ou y = 0) ; x² + y² = 9   ← xy = 0 : x = 0 ou y = 0 (sans diviser !)
      = (x = 0 ; y^2 = 9) ou (y = 0 ; x^2 = 9)   ← Les deux cas
      = (0 ; 3), (0 ; -3), (3 ; 0), (-3 ; 0)   ← Les points stationnaires
  partie 2 (Nature des points : 3)
  Soit f(x, y) = x³ + 3xy² − 27x, dont les points stationnaires sont (0 ; 3), (0 ; −3), (3 ; 0), (−3 ; 0). Laquelle de ces affirmations est vraie ?
    ✔ f a un minimum local en (3 ; 0)   · f a un point selle en (3 ; 0)   · f a un minimum local en (0 ; 3) [a2_stationary_is_extremum]   · f a un minimum local en (−3 ; 0) [a2_hess_det_only]
  pièges : a2_hess_det_only, a2_stationary_is_extremum

```

### Variantes d'examen

```
Soit f(x, y) = −x³ − 3xy² + 60x + 48y, dont les points stationnaires sont (4 ; 2), (2 ; 4), (−2 ; −4), (−4 ; −2). Laquelle de ces affirmations est vraie ?
  ✔ f a un minimum local en (−4 ; −2)   · f a un minimum local en (2 ; 4) [a2_stationary_is_extremum]   · f a un point selle en (−4 ; −2)   · f a un minimum local en (4 ; 2) [a2_hess_det_only]
  [examen mcq]
  pièges : a2_hess_det_only, a2_stationary_is_extremum

Vrai ou faux ? Si c'est faux, donne une fonction f(x, y) avec a = (0, 0) qui contredit l'énoncé.
  « Si a est un point stationnaire de f ∈ C² et det H_f(a) = 0, alors f n'a pas d'extremum local en a. » → FAUX
    contre-exemple (a2) : f = x^4+y^4
  [examen tf]
  pièges : a2_hess_degenerate

```

## Hessienne 3 × 3 : mineurs, trace, déterminant, valeurs propres (`a2-hessian-3x3`, BA2)

_Les trois mineurs principaux ; ce que la trace et le déterminant disent des signes._

### Niveau 1

```
Soit f(x, y, z) = −2x² + 3xy + 2xz + 2y² + 3z² + 17y + 24z. Le point (−3 ; −2 ; −3) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Sa hessienne est H = [[-4,3,2],[3,4,0],[2,0,6]]. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule Δ₂ :
  [guided]  det[[-4,3],[3,4]]
    = (−4)·4 − 3·3   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = □   (trous : −25)   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-4,3,2],[3,4,0],[2,0,6]]
    = -4·det[[4,0],[0,6]]-3·det[[3,0],[2,6]]+2·det[[3,4],[2,0]]   ← Développer selon la 1re ligne
    = □   (trous : −166)   ← Calculer
  — Valeur de f en (−3 ; −2 ; −3) :  [juge value]  départ : −2·(−3)² + 3·(−3)·(−2) + 2·(−3)·(−3) + 2·(−2)² + 3·(−3)² + 17·(−2) + 24·(−3)
    ? Δ₁ = −4, Δ₂ = −25, Δ₃ = −166. Nature du point (−3 ; −2 ; −3) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −53   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−4)·4−3·3 = … | Δ₁ = −4, Δ₂ = −25, Δ₃ = −166 : point selle.
  pièges : l_cofactor_sign, a2_hess_partial_minors

Soit f(x, y, z) = 2x² − 3xy − 3xz + 3y² + 3yz + 2z² − 27x + 33y + 26z. Le point (3 ; −3 ; −2) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Sa hessienne est H = [[4,-3,-3],[-3,6,3],[-3,3,4]]. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule Δ₂ :
  [guided]  det[[4,-3],[-3,6]]
    = 4·6 − (−3)·(−3)   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = □   (trous : 15)   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[4,-3,-3],[-3,6,3],[-3,3,4]]
    = 4·det[[6,3],[3,4]]+3·det[[-3,3],[-3,4]]-3·det[[-3,6],[-3,3]]   ← Développer selon la 1re ligne
    = □   (trous : 24)   ← Calculer
  — Valeur de f en (3 ; −3 ; −2) :  [juge value]  départ : 2·3² − 3·3·(−3) − 3·3·(−2) + 3·(−3)² + 3·(−3)·(−2) + 2·(−2)² − 27·3 + 33·(−3) + 26·(−2)
    ? Δ₁ = 4, Δ₂ = 15, Δ₃ = 24. Nature du point (3 ; −3 ; −2) ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −116   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = 4·6−(−3)·(−3) = … | Δ₁ = 4, Δ₂ = 15, Δ₃ = 24 : minimum local.
  pièges : l_cofactor_sign

Soit f(x, y, z) = −3x² + 2xy − xz + 3y² + yz − z² − 13x + 25y − 2z. Le point (−3 ; −3 ; −1) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Sa hessienne est H = [[-6,2,-1],[2,6,1],[-1,1,-2]]. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule Δ₂ :
  [guided]  det[[-6,2],[2,6]]
    = (−6)·6 − 2·2   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = □   (trous : −40)   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-6,2,-1],[2,6,1],[-1,1,-2]]
    = -6·det[[6,1],[1,-2]]-2·det[[2,1],[-1,-2]]-det[[2,6],[-1,1]]   ← Développer selon la 1re ligne
    = □   (trous : 76)   ← Calculer
  — Valeur de f en (−3 ; −3 ; −1) :  [juge value]  départ : −3·(−3)² + 2·(−3)·(−3) − (−3)·(−1) + 3·(−3)² + (−3)·(−1) − (−1)² − 13·(−3) + 25·(−3) − 2·(−1)
    ? Δ₁ = −6, Δ₂ = −40, Δ₃ = 76. Nature du point (−3 ; −3 ; −1) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −17   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−6)·6−2·2 = … | Δ₁ = −6, Δ₂ = −40, Δ₃ = 76 : point selle.
  pièges : l_cofactor_sign, a2_hess_det_only

```

### Niveau 2

```
Soit f(x, y, z) = −3x² + 3xy + 3y² + 3yz − z² + 12x − 21y − 6z. Le point (3 ; 2 ; 0) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule H :
  [guided]  H = ?
    = [[-6,3,0],[3,6,3],[0,3,-2]]   ← Dérivées secondes
  — Δ₁ = −6. Le mineur Δ₂ :  [juge det]  départ : det[[-6,3],[3,6]]
    = (−6)·6 − 3·3   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = −45   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-6,3,0],[3,6,3],[0,3,-2]]
    = -6·det[[6,3],[3,-2]]-3·det[[3,3],[0,-2]]   ← Développer selon la 1re ligne
    = 144   ← Calculer
  — Valeur de f en (3 ; 2 ; 0) :  [juge value]  départ : −3·3² + 3·3·2 + 3·2² + 3·2·0 − 0² + 12·3 − 21·2 − 6·0
    ? Δ₁ = −6, Δ₂ = −45, Δ₃ = 144. Nature du point (3 ; 2 ; 0) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −3   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−6)·6−3·3 = … | Δ₁ = −6, Δ₂ = −45, Δ₃ = 144 : point selle.
  pièges : a2_jacobian_transposed, a2_hess_det_only

Soit f(x, y, z) = 2x² − xy + 3xz + 3y² − 3yz − z² − 10x − y − z. Le point (2 ; 1 ; 1) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule H :
  [guided]  H = ?
    = [[4,-1,3],[-1,6,-3],[3,-3,-2]]   ← Dérivées secondes
  — Δ₁ = 4. Le mineur Δ₂ :  [juge det]  départ : det[[4,-1],[-1,6]]
    = 4·6 − (−1)·(−1)   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 23   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[4,-1,3],[-1,6,-3],[3,-3,-2]]
    = 4·det[[6,-3],[-3,-2]]+det[[-1,-3],[3,-2]]+3·det[[-1,6],[3,-3]]   ← Développer selon la 1re ligne
    = −118   ← Calculer
  — Valeur de f en (2 ; 1 ; 1) :  [juge value]  départ : 2·2² − 2·1 + 3·2·1 + 3·1² − 3·1·1 − 1² − 10·2 − 1 − 1
    ? Δ₁ = 4, Δ₂ = 23, Δ₃ = −118. Nature du point (2 ; 1 ; 1) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = −11   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = 4·6−(−1)·(−1) = … | Δ₁ = 4, Δ₂ = 23, Δ₃ = −118 : point selle.
  pièges : a2_jacobian_transposed

Soit f(x, y, z) = −3x² + 2xy − y² + 2yz − 2z² − 4x + 4y − 6z. Le point (−1 ; −1 ; −2) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Règle : Δ₁, Δ₂, Δ₃ > 0 → minimum ; signes −, +, − → maximum ; sinon (aucun nul) → point selle. Calcule H :
  [guided]  H = ?
    = [[-6,2,0],[2,-2,2],[0,2,-4]]   ← Dérivées secondes
  — Δ₁ = −6. Le mineur Δ₂ :  [juge det]  départ : det[[-6,2],[2,-2]]
    = (−6)·(−2) − 2·2   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 8   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-6,2,0],[2,-2,2],[0,2,-4]]
    = -6·det[[-2,2],[2,-4]]-2·det[[2,2],[0,-4]]   ← Développer selon la 1re ligne
    = −8   ← Calculer
  — Valeur de f en (−1 ; −1 ; −2) :  [juge value]  départ : −3·(−1)² + 2·(−1)·(−1) − (−1)² + 2·(−1)·(−2) − 2·(−2)² − 4·(−1) + 4·(−1) − 6·(−2)
    ? Δ₁ = −6, Δ₂ = 8, Δ₃ = −8. Nature du point (−1 ; −1 ; −2) ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 6   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−6)·(−2)−2·2 = … | Δ₁ = −6, Δ₂ = 8, Δ₃ = −8 : maximum local.
  pièges : a2_jacobian_transposed

```

### Niveau 3

```
Soit f(x, y, z) = −2x² + 2xy − 3xz − 3y² + 3yz − 2z² + 5x − 13y + 3z. Le point (2 ; −3 ; −3) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Calcule H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[-4,2,-3],[2,-6,3],[-3,3,-4]]   ← Dérivées secondes
  — Δ₁ = −4. Le mineur Δ₂ :  [juge det]  départ : det[[-4,2],[2,-6]]
    = (−4)·(−6) − 2·2   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 20   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-4,2,-3],[2,-6,3],[-3,3,-4]]
    = -4·det[[-6,3],[3,-4]]-2·det[[2,3],[-3,-4]]-3·det[[2,-6],[-3,3]]   ← Développer selon la 1re ligne
    = −26   ← Calculer
  — Valeur de f en (2 ; −3 ; −3) :  [juge value]  départ : −2·2² + 2·2·(−3) − 3·2·(−3) − 3·(−3)² + 3·(−3)·(−3) − 2·(−3)² + 5·2 − 13·(−3) + 3·(−3)
    ? Δ₁ = −4, Δ₂ = 20, Δ₃ = −26. Nature du point (2 ; −3 ; −3) ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 20   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−4)·(−6)−2·2 = … | Δ₁ = −4, Δ₂ = 20, Δ₃ = −26 : maximum local.
  pièges : a2_jacobian_transposed

Soit f(x, y, z) = −3x² − y² − yz + z² − 12x + 5y − 5z. Le point (−2 ; 1 ; 3) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Calcule H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[-6,0,0],[0,-2,-1],[0,-1,2]]   ← Dérivées secondes
  — Δ₁ = −6. Le mineur Δ₂ :  [juge det]  départ : det[[-6,0],[0,-2]]
    = (−6)·(−2) − 0·0   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 12   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-6,0,0],[0,-2,-1],[0,-1,2]]
    = -6·det[[-2,-1],[-1,2]]   ← Développer selon la 1re ligne
    = 30   ← Calculer
  — Valeur de f en (−2 ; 1 ; 3) :  [juge value]  départ : −3·(−2)² − 1² − 1·3 + 3² − 12·(−2) + 5·1 − 5·3
    ? Δ₁ = −6, Δ₂ = 12, Δ₃ = 30. Nature du point (−2 ; 1 ; 3) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 7   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−6)·(−2)−0·0 = … | Δ₁ = −6, Δ₂ = 12, Δ₃ = 30 : point selle.
  pièges : a2_jacobian_transposed, a2_hess_det_only

Soit f(x, y, z) = −3x² + xy − 3y² − yz − 2z² + 13x − 6y + 7z. Le point (2 ; −1 ; 2) est un point stationnaire de f. Donne sa nature avec les mineurs principaux. Calcule H :
  [tap, suivre l'erreur, menu steps]  H = ?
    = [[-6,1,0],[1,-6,-1],[0,-1,-4]]   ← Dérivées secondes
  — Δ₁ = −6. Le mineur Δ₂ :  [juge det]  départ : det[[-6,1],[1,-6]]
    = (−6)·(−6) − 1·1   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 35   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[-6,1,0],[1,-6,-1],[0,-1,-4]]
    = -6·det[[-6,-1],[-1,-4]]-det[[1,-1],[0,-4]]   ← Développer selon la 1re ligne
    = −134   ← Calculer
  — Valeur de f en (2 ; −1 ; 2) :  [juge value]  départ : −3·2² + 2·(−1) − 3·(−1)² − (−1)·2 − 2·2² + 13·2 − 6·(−1) + 7·2
    ? Δ₁ = −6, Δ₂ = 35, Δ₃ = −134. Nature du point (2 ; −1 ; 2) ? · minimum local / ✔ maximum local / · point selle / · la hessienne ne permet pas de conclure
    = 23   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = (−6)·(−6)−1·1 = … | Δ₁ = −6, Δ₂ = 35, Δ₃ = −134 : maximum local.
  pièges : a2_jacobian_transposed

```

### Niveau 4

```
Soit f(x, y, z) = 3x² + 3xy + 2y² + 3z² − 18x − 9y + 18z. Trouve son point stationnaire, puis sa nature. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (3x² + 3xy + 2y² + 3z² − 18x − 9y + 18z)
    = 6x + 3y − 18   ← Dériver en x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (3x² + 3xy + 2y² + 3z² − 18x − 9y + 18z)
    = 3x + 4y − 9   ← Dériver en y
  — Puis ∂f/∂z :  [juge equiv]  départ : ∂/∂z (3x² + 3xy + 2y² + 3z² − 18x − 9y + 18z)
    = 6z + 18   ← Dériver en z
  — Résous ∇f = 0 (système linéaire) :  [juge system]  départ : 6x + 3y − 18 = 0 ; 3x + 4y − 9 = 0 ; 6z + 18 = 0
    = (3 ; 0 ; -3)   ← Système linéaire 3 × 3 : une seule solution
  — La hessienne (constante) :  [juge mat]  départ : H = ?
    = [[6,3,0],[3,4,0],[0,0,6]]   ← Dérivées secondes
  — Δ₁ = 6. Le mineur Δ₂ :  [juge det]  départ : det[[6,3],[3,4]]
    = 6·4 − 3·3   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 15   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[6,3,0],[3,4,0],[0,0,6]]
    = 6·det[[4,0],[0,6]]-3·det[[3,0],[0,6]]   ← Développer selon la 1re ligne
    = 90   ← Calculer
  — Valeur de f en (3 ; 0 ; −3) :  [juge value]  départ : 3·3² + 3·3·0 + 2·0² + 3·(−3)² − 18·3 − 9·0 + 18·(−3)
    ? Δ₁ = 6, Δ₂ = 15, Δ₃ = 90. Nature du point (3 ; 0 ; −3) ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −54   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = 6·4−3·3 = … | Δ₁ = 6, Δ₂ = 15, Δ₃ = 90 : minimum local.

Soit f(x, y, z) = 2x² + 2xy + 3y² + yz + 3z² − 16x − 17y + 4z. Trouve son point stationnaire, puis sa nature. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (2x² + 2xy + 3y² + yz + 3z² − 16x − 17y + 4z)
    = 4x + 2y − 16   ← Dériver en x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (2x² + 2xy + 3y² + yz + 3z² − 16x − 17y + 4z)
    = 2x + 6y + z − 17   ← Dériver en y
  — Puis ∂f/∂z :  [juge equiv]  départ : ∂/∂z (2x² + 2xy + 3y² + yz + 3z² − 16x − 17y + 4z)
    = y + 6z + 4   ← Dériver en z
  — Résous ∇f = 0 (système linéaire) :  [juge system]  départ : 4x + 2y − 16 = 0 ; 2x + 6y + z − 17 = 0 ; y + 6z + 4 = 0
    = (3 ; 2 ; -1)   ← Système linéaire 3 × 3 : une seule solution
  — La hessienne (constante) :  [juge mat]  départ : H = ?
    = [[4,2,0],[2,6,1],[0,1,6]]   ← Dérivées secondes
  — Δ₁ = 4. Le mineur Δ₂ :  [juge det]  départ : det[[4,2],[2,6]]
    = 4·6 − 2·2   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = 20   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[4,2,0],[2,6,1],[0,1,6]]
    = 4·det[[6,1],[1,6]]-2·det[[2,1],[0,6]]   ← Développer selon la 1re ligne
    = 116   ← Calculer
  — Valeur de f en (3 ; 2 ; −1) :  [juge value]  départ : 2·3² + 2·3·2 + 3·2² + 2·(−1) + 3·(−1)² − 16·3 − 17·2 + 4·(−1)
    ? Δ₁ = 4, Δ₂ = 20, Δ₃ = 116. Nature du point (3 ; 2 ; −1) ? ✔ minimum local / · maximum local / · point selle / · la hessienne ne permet pas de conclure
    = −43   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = 4·6−2·2 = … | Δ₁ = 4, Δ₂ = 20, Δ₃ = 116 : minimum local.

Soit f(x, y, z) = 3x² − 2xy + xz − 3y² − yz − z² + 17x + 15y + 7z. Trouve son point stationnaire, puis sa nature. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (3x² − 2xy + xz − 3y² − yz − z² + 17x + 15y + 7z)
    = 6x − 2y + z + 17   ← Dériver en x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (3x² − 2xy + xz − 3y² − yz − z² + 17x + 15y + 7z)
    = −2x − 6y − z + 15   ← Dériver en y
  — Puis ∂f/∂z :  [juge equiv]  départ : ∂/∂z (3x² − 2xy + xz − 3y² − yz − z² + 17x + 15y + 7z)
    = x − y − 2z + 7   ← Dériver en z
  — Résous ∇f = 0 (système linéaire) :  [juge system]  départ : 6x − 2y + z + 17 = 0 ; −2x − 6y − z + 15 = 0 ; x − y − 2z + 7 = 0
    = (-2 ; 3 ; 1)   ← Système linéaire 3 × 3 : une seule solution
  — La hessienne (constante) :  [juge mat]  départ : H = ?
    = [[6,-2,1],[-2,-6,-1],[1,-1,-2]]   ← Dérivées secondes
  — Δ₁ = 6. Le mineur Δ₂ :  [juge det]  départ : det[[6,-2],[-2,-6]]
    = 6·(−6) − (−2)·(−2)   ← Δ₂ : déterminant 2 × 2 en haut à gauche
    = −40   ← Calculer
  — Le mineur Δ₃ = det H :  [juge det]  départ : det[[6,-2,1],[-2,-6,-1],[1,-1,-2]]
    = 6·det[[-6,-1],[-1,-2]]+2·det[[-2,-1],[1,-2]]+det[[-2,-6],[1,-1]]   ← Développer selon la 1re ligne
    = 84   ← Calculer
  — Valeur de f en (−2 ; 3 ; 1) :  [juge value]  départ : 3·(−2)² − 2·(−2)·3 + (−2)·1 − 3·3² − 3·1 − 1² + 17·(−2) + 15·3 + 7·1
    ? Δ₁ = 6, Δ₂ = −40, Δ₃ = 84. Nature du point (−2 ; 3 ; 1) ? · minimum local / · maximum local / ✔ point selle / · la hessienne ne permet pas de conclure
    = 9   ← Remplacer x, y, z dans f
  aides : Calcule les trois mineurs principaux en haut à gauche, puis compare leurs signes à (+, +, +) et (−, +, −). | Δ₂ = 6·(−6)−(−2)·(−2) = … | Δ₁ = 6, Δ₂ = −40, Δ₃ = 84 : point selle.
  pièges : a2_hess_det_only

```

### Niveau 5

```
Trois questions au format de l'examen, sans aide : deux vrai/faux, puis un QCM.
  [problème, 5 points]
  partie 1 (Vrai ou faux (1) : 1)
  Vrai ou faux ?
    « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = −2 et λ₁λ₂λ₃ = 3, alors a n'est pas un extremum local. » → VRAI
  partie 2 (Vrai ou faux (2) : 1)
  Vrai ou faux ?
    « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = 2 et λ₁λ₂λ₃ = −3, alors a n'est pas un extremum local. » → VRAI
  partie 3 (QCM : 3)
  Soit f(x, y, z) = −x² + xy + 3xz + 2y² − 3yz + 3z² + 15x + 3y − 6z, et (3 ; −3 ; −2) son point stationnaire. Laquelle de ces affirmations est vraie ?
    · la hessienne ne permet pas de conclure   · (3 ; −3 ; −2) est un minimum local de f   ✔ (3 ; −3 ; −2) est un point selle de f   · (3 ; −3 ; −2) est un maximum local de f [a2_hess_partial_minors]
  pièges : a2_hess_partial_minors

Trois questions au format de l'examen, sans aide : deux vrai/faux, puis un QCM.
  [problème, 5 points]
  partie 1 (Vrai ou faux (1) : 1)
  Vrai ou faux ?
    « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = 2 et λ₁λ₂λ₃ = −5, alors a n'est pas un extremum local. » → VRAI
  partie 2 (Vrai ou faux (2) : 1)
  Vrai ou faux ? Si c'est faux, donne une hessienne H (symétrique 3 × 3) qui contredit l'énoncé.
    « Soit a un point stationnaire de f ∈ C²(ℝ³). Si f_xx(a) = −1 et det H_f(a) = −1, alors f a un maximum local en a. » → FAUX
      contre-exemple (a2) : H = [[-1,0,0],[0,1,0],[0,0,1]]
  partie 3 (QCM : 3)
  Soit f(x, y, z) = 3x² + 3xy + xz − 2y² − 3yz + z² − 7x − 27y − 8z, et (3 ; −3 ; −2) son point stationnaire. Laquelle de ces affirmations est vraie ?
    ✔ (3 ; −3 ; −2) est un point selle de f   · (3 ; −3 ; −2) est un minimum local de f   · la hessienne ne permet pas de conclure   · (3 ; −3 ; −2) est un maximum local de f
  pièges : a2_hess_partial_minors

Trois questions au format de l'examen, sans aide : deux vrai/faux, puis un QCM.
  [problème, 5 points]
  partie 1 (Vrai ou faux (1) : 1)
  Vrai ou faux ?
    « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = −1 et λ₁λ₂λ₃ = 4, alors a n'est pas un extremum local. » → VRAI
  partie 2 (Vrai ou faux (2) : 1)
  Vrai ou faux ?
    « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = 4 et λ₁λ₂λ₃ = −3, alors a n'est pas un extremum local. » → VRAI
  partie 3 (QCM : 3)
  Soit f(x, y, z) = −x² + 2xy − 3y² − 2yz − z² − 4x + 14y + 6z, et (0 ; 2 ; 1) son point stationnaire. Laquelle de ces affirmations est vraie ?
    · (0 ; 2 ; 1) est un point selle de f   ✔ (0 ; 2 ; 1) est un maximum local de f   · (0 ; 2 ; 1) est un minimum local de f   · la hessienne ne permet pas de conclure

```

### Variantes d'examen

```
Soit f(x, y, z) = −2x² − xy − 3y² + 3yz − 3z² + 9x + 8y − 3z, et (2 ; 1 ; 0) son point stationnaire. Laquelle de ces affirmations est vraie ?
  · (2 ; 1 ; 0) est un point selle de f   · la hessienne ne permet pas de conclure   · (2 ; 1 ; 0) est un minimum local de f   ✔ (2 ; 1 ; 0) est un maximum local de f
  [examen mcq]

Vrai ou faux ?
  « Soit a un point stationnaire de f ∈ C²(ℝ³), et λ₁, λ₂, λ₃ les valeurs propres de H_f(a). Si λ₁ + λ₂ + λ₃ = −1 et λ₁λ₂λ₃ = 2, alors a n'est pas un extremum local. » → VRAI
  [examen tf]

```

## Extrema absolus sur un compact, bord compris (`a2-extrema-compact`, BA2)

_Intérieur, chaque morceau du bord, coins : on compare toutes les valeurs._

### Niveau 1

```
Trouve le maximum et le minimum absolus de f(x, y) = x² − y² + 2x sur le disque D = {x² + y² ≤ 4}. Candidats (un par symétrie) : (−1 ; 0), (−1/2 ; √15/2), (2 ; 0), (−2 ; 0). Calcule f en chacun, puis compare. Valeur de f en (−1 ; 0) :
  [guided]  (−1)² − 0² + 2·(−1)
    = □   (trous : −1)   ← f(−1 ; 0)
  — En x = −1/2, y = ±√15/2 : valeur de f en (−1/2 ; √15/2) (et en son symétrique)  [juge value]  départ : (−1/2)² − (√15/2)² + 2·(−1/2)
    = □   (trous : −9/2)   ← f(−1/2 ; √15/2)
  — Extrémité x = 2 de l'intervalle : point (2 ; 0)  [juge value]  départ : 2² − 0² + 2·2
    = □   (trous : 8)   ← f(2 ; 0)
  — Extrémité x = −2 : point (−2 ; 0)  [juge value]  départ : (−2)² − 0² + 2·(−2)
    = □   (trous : 0)   ← f(−2 ; 0)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) / · En (−1 ; 0)
    = 8   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (−1/2 ; √15/2) et (−1/2 ; −√15/2) / · En (−1/2 ; √15/2) seulement / · En (−1 ; 0)
    = −9/2   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur le bord, remplace y² par 4 − x² : f = 2x² + 2x − 4, x ∈ [−2 ; 2]. | max f = 8 en (2 ; 0) ; min f = −9/2 en (−1/2 ; √15/2) et (−1/2 ; −√15/2).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = 3x² + y² − 2y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}. Candidats (un par symétrie) : (0 ; 1), (0 ; 0), (2 ; 0), (0 ; 2). Calcule f en chacun, puis compare. Valeur de f en (0 ; 1) :
  [guided]  3·0² + 1² − 2·1
    = □   (trous : −1)   ← f(0 ; 1)
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 3·0² + 0² − 2·0
    = □   (trous : 0)   ← f(0 ; 0)
  — Coins (±2 ; 0) : valeur de f en (2 ; 0) (la même en (−2 ; 0))  [juge value]  départ : 3·2² + 0² − 2·0
    = □   (trous : 12)   ← f(2 ; 0)
  — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : 3·0² + 2² − 2·2
    = □   (trous : 0)   ← f(0 ; 2)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
    = 12   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = −1   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 4 − y² : f = −2y² − 2y + 12, y ∈ [0 ; 2]. | max f = 12 en (2 ; 0) et (−2 ; 0) ; min f = −1 en (0 ; 1).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = 3x² − 2y² sur le disque D = {x² + y² ≤ 1}. Candidats (un par symétrie) : (0 ; 0), (0 ; 1), (1 ; 0), (−1 ; 0). Calcule f en chacun, puis compare. Valeur de f en (0 ; 0) :
  [guided]  3·0² − 2·0²
    = □   (trous : 0)   ← f(0 ; 0)
  — En x = 0, y = ±1 : valeur de f en (0 ; 1) (et en son symétrique)  [juge value]  départ : 3·0² − 2·1²
    = □   (trous : −2)   ← f(0 ; 1)
  — Extrémité x = 1 de l'intervalle : point (1 ; 0)  [juge value]  départ : 3·1² − 2·0²
    = □   (trous : 3)   ← f(1 ; 0)
  — Extrémité x = −1 : point (−1 ; 0)  [juge value]  départ : 3·(−1)² − 2·0²
    = □   (trous : 3)   ← f(−1 ; 0)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (1 ; 0) et (−1 ; 0) / · En (1 ; 0) seulement / · En (0 ; 0)
    = 3   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 1) et (0 ; −1) / · En (0 ; 1) seulement / · En (0 ; 0)
    = −2   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur le bord, remplace y² par 1 − x² : f = 5x² − 2, x ∈ [−1 ; 1]. | max f = 3 en (1 ; 0) et (−1 ; 0) ; min f = −2 en (0 ; 1) et (0 ; −1).
  pièges : a2_compact_boundary_forgot

```

### Niveau 2

```
Trouve le maximum et le minimum absolus de f(x, y) = 3x² + y² − 2y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}. Candidats : le point stationnaire intérieur, les points critiques de f sur chaque morceau du bord (paramétré comme indiqué), les extrémités des morceaux. Résous ∇f = 0 :
  [guided]  6x = 0 ; 2y − 2 = 0
    = (0 ; 1)   ← ∇f = (6x ; 2y−2) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : 3·0² + 1² − 2·1
    = −1   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−2 ; 2] : restriction de f.  [juge equiv]  départ : 3x² + 0² − 2·0
    = 3x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 3·0² + 0² − 2·0
    = 0   ← f(0 ; 0)
  — Coins (±2 ; 0) : valeur de f en (2 ; 0) (la même en (−2 ; 0))  [juge value]  départ : 3·2² + 0² − 2·0
    = 12   ← f(2 ; 0)
  — Arc : x² = 4 − y², avec y ∈ [0 ; 2]. Restriction de f :  [juge equiv]  départ : 3(4 − y²) + y² − 2y
    = −2y² − 2y + 12   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : −4y − 2 = 0
    = y = −1/2   ← Dérivée nulle
  — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : 3·0² + 2² − 2·2
    ? y = −1/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Non : l'arc n'a pas de point critique à l'intérieur / · Oui : on le garde comme candidat
    = 0   ← f(0 ; 2)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
    = 12   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = −1   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 4 − y² : f = −2y² − 2y + 12, y ∈ [0 ; 2]. | max f = 12 en (2 ; 0) et (−2 ; 0) ; min f = −1 en (0 ; 1).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = −x² − 3y² + 6y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}. Candidats : le point stationnaire intérieur, les points critiques de f sur chaque morceau du bord (paramétré comme indiqué), les extrémités des morceaux. Résous ∇f = 0 :
  [guided]  −2x = 0 ; −6y + 6 = 0
    = (0 ; 1)   ← ∇f = (−2x ; −6y+6) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −0² − 3·1² + 6·1
    = 3   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−2 ; 2] : restriction de f.  [juge equiv]  départ : −x² − 3·0² + 6·0
    = −x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −0² − 3·0² + 6·0
    = 0   ← f(0 ; 0)
  — Coins (±2 ; 0) : valeur de f en (2 ; 0) (la même en (−2 ; 0))  [juge value]  départ : −2² − 3·0² + 6·0
    = −4   ← f(2 ; 0)
  — Arc : x² = 4 − y², avec y ∈ [0 ; 2]. Restriction de f :  [juge equiv]  départ : −(4 − y²) − 3y² + 6y
    = −2y² + 6y − 4   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : −4y + 6 = 0
    = y = 3/2   ← Dérivée nulle
  — Point critique de l'arc (√7/2 ; 3/2) (et son symétrique)  [juge value]  départ : −(√7/2)² − 3·(3/2)² + 6·(3/2)
    ? y = 3/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Oui : il donne les points (±√7/2 ; 3/2) / · Non : on l'écarte
    = 1/2   ← f(√7/2 ; 3/2)
  — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : −0² − 3·2² + 6·2
    = 0   ← f(0 ; 2)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = 3   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
    = −4   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 4 − y² : f = −2y² + 6y − 4, y ∈ [0 ; 2]. | max f = 3 en (0 ; 1) ; min f = −4 en (2 ; 0) et (−2 ; 0).

Trouve le maximum et le minimum absolus de f(x, y) = 3x² − y² + 4y sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0}. Candidats : le point stationnaire intérieur, les points critiques de f sur chaque morceau du bord (paramétré comme indiqué), les extrémités des morceaux. Résous ∇f = 0 :
  [guided]  6x = 0 ; −2y + 4 = 0
    = (0 ; 2)   ← ∇f = (6x ; −2y+4) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 2) :  [juge value]  départ : 3·0² − 2² + 4·2
    = 4   ← f(0 ; 2)
  — Segment y = 0, x ∈ [−3 ; 3] : restriction de f.  [juge equiv]  départ : 3x² − 0² + 4·0
    = 3x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 3·0² − 0² + 4·0
    = 0   ← f(0 ; 0)
  — Coins (±3 ; 0) : valeur de f en (3 ; 0) (la même en (−3 ; 0))  [juge value]  départ : 3·3² − 0² + 4·0
    = 27   ← f(3 ; 0)
  — Arc : x² = 9 − y², avec y ∈ [0 ; 3]. Restriction de f :  [juge equiv]  départ : 3(9 − y²) − y² + 4y
    = −4y² + 4y + 27   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : −8y + 4 = 0
    = y = 1/2   ← Dérivée nulle
  — Point critique de l'arc (√35/2 ; 1/2) (et son symétrique)  [juge value]  départ : 3·(√35/2)² − (1/2)² + 4·(1/2)
    ? y = 1/2 est-il sur l'arc (0 ≤ y ≤ 3) ? ✔ Oui : il donne les points (±√35/2 ; 1/2) / · Non : on l'écarte
    = 28   ← f(√35/2 ; 1/2)
  — Extrémité y = 3 de l'arc : point (0 ; 3)  [juge value]  départ : 3·0² − 3² + 4·3
    = 3   ← f(0 ; 3)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (√35/2 ; 1/2) et (−√35/2 ; 1/2) / · En (√35/2 ; 1/2) seulement / · En (0 ; 2)
    = 28   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 0) / · En (0 ; 2)
    = 0   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 9 − y² : f = −4y² + 4y + 27, y ∈ [0 ; 3]. | max f = 28 en (√35/2 ; 1/2) et (−√35/2 ; 1/2) ; min f = 0 en (0 ; 0).
  pièges : a2_compact_boundary_forgot

```

### Niveau 3

```
Trouve le maximum et le minimum absolus de f(x, y) = −3x² − y² + 2y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}. Résous ∇f = 0 :
  [tap, suivre l'erreur, menu steps]  −6x = 0 ; −2y + 2 = 0
    = (0 ; 1)   ← ∇f = (−6x ; −2y+2) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −3·0² − 1² + 2·1
    = 1   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−2 ; 2] : restriction de f.  [juge equiv]  départ : −3x² − 0² + 2·0
    = −3x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −3·0² − 0² + 2·0
    = 0   ← f(0 ; 0)
  — Coins (±2 ; 0) : valeur de f en (2 ; 0) (la même en (−2 ; 0))  [juge value]  départ : −3·2² − 0² + 2·0
    = −12   ← f(2 ; 0)
  — Arc : x² = 4 − y², avec y ∈ [0 ; 2]. Restriction de f :  [juge equiv]  départ : −3(4 − y²) − y² + 2y
    = 2y² + 2y − 12   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : 4y + 2 = 0
    = y = −1/2   ← Dérivée nulle
  — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : −3·0² − 2² + 2·2
    ? y = −1/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Non : l'arc n'a pas de point critique à l'intérieur / · Oui : on le garde comme candidat
    = 0   ← f(0 ; 2)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = 1   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
    = −12   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 4 − y² : f = 2y² + 2y − 12, y ∈ [0 ; 2]. | max f = 1 en (0 ; 1) ; min f = −12 en (2 ; 0) et (−2 ; 0).

Trouve le maximum et le minimum absolus de f(x, y) = 3x² + y² + 6x sur le disque D = {x² + y² ≤ 4}. Résous ∇f = 0 :
  [tap, suivre l'erreur, menu steps]  6x + 6 = 0 ; 2y = 0
    = (-1 ; 0)   ← ∇f = (6x+6 ; 2y) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (−1 ; 0) :  [juge value]  départ : 3·(−1)² + 0² + 6·(−1)
    = −3   ← f(−1 ; 0)
  — Bord : y² = 4 − x², avec x ∈ [−2 ; 2]. Restriction de f :  [juge equiv]  départ : 3x² + (4 − x²) + 6x
    = 2x² + 6x + 4   ← Remplacer y² et développer
  — Point critique de la restriction :  [juge system]  départ : 4x + 6 = 0
    = x = −3/2   ← Dérivée nulle
  — En x = −3/2, y = ±√7/2 : valeur de f en (−3/2 ; √7/2) (et en son symétrique)  [juge value]  départ : 3·(−3/2)² + (√7/2)² + 6·(−3/2)
    = −1/2   ← f(−3/2 ; √7/2)
  — Extrémité x = 2 de l'intervalle : point (2 ; 0)  [juge value]  départ : 3·2² + 0² + 6·2
    = 24   ← f(2 ; 0)
  — Extrémité x = −2 : point (−2 ; 0)  [juge value]  départ : 3·(−2)² + 0² + 6·(−2)
    = 0   ← f(−2 ; 0)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) / · En (−1 ; 0)
    = 24   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (−1 ; 0) / · En (−3/2 ; √7/2)
    = −3   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur le bord, remplace y² par 4 − x² : f = 2x² + 6x + 4, x ∈ [−2 ; 2]. | max f = 24 en (2 ; 0) ; min f = −3 en (−1 ; 0).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = −3x² − 2y² + 4y sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0}. Résous ∇f = 0 :
  [tap, suivre l'erreur, menu steps]  −6x = 0 ; −4y + 4 = 0
    = (0 ; 1)   ← ∇f = (−6x ; −4y+4) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −3·0² − 2·1² + 4·1
    = 2   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−3 ; 3] : restriction de f.  [juge equiv]  départ : −3x² − 2·0² + 4·0
    = −3x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −3·0² − 2·0² + 4·0
    = 0   ← f(0 ; 0)
  — Coins (±3 ; 0) : valeur de f en (3 ; 0) (la même en (−3 ; 0))  [juge value]  départ : −3·3² − 2·0² + 4·0
    = −27   ← f(3 ; 0)
  — Arc : x² = 9 − y², avec y ∈ [0 ; 3]. Restriction de f :  [juge equiv]  départ : −3(9 − y²) − 2y² + 4y
    = y² + 4y − 27   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : 2y + 4 = 0
    = y = −2   ← Dérivée nulle
  — Extrémité y = 3 de l'arc : point (0 ; 3)  [juge value]  départ : −3·0² − 2·3² + 4·3
    ? y = −2 est-il sur l'arc (0 ≤ y ≤ 3) ? ✔ Non : l'arc n'a pas de point critique à l'intérieur / · Oui : on le garde comme candidat
    = −6   ← f(0 ; 3)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = 2   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (3 ; 0) et (−3 ; 0) / · En (3 ; 0) seulement / · En (0 ; 1)
    = −27   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 9 − y² : f = y² + 4y − 27, y ∈ [0 ; 3]. | max f = 2 en (0 ; 1) ; min f = −27 en (3 ; 0) et (−3 ; 0).

```

### Niveau 4

```
Trouve le maximum et le minimum absolus de f(x, y) = −x² + y² − 2y sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0}. Résous ∇f = 0 :
  [free, suivre l'erreur]  −2x = 0 ; 2y − 2 = 0
    = (0 ; 1)   ← ∇f = (−2x ; 2y−2) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −0² + 1² − 2·1
    = −1   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−3 ; 3] : restriction de f.  [juge equiv]  départ : −x² + 0² − 2·0
    = −x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −0² + 0² − 2·0
    = 0   ← f(0 ; 0)
  — Coins (±3 ; 0) : valeur de f en (3 ; 0) (la même en (−3 ; 0))  [juge value]  départ : −3² + 0² − 2·0
    = −9   ← f(3 ; 0)
  — Arc : x² = 9 − y², avec y ∈ [0 ; 3]. Restriction de f :  [juge equiv]  départ : −(9 − y²) + y² − 2y
    = 2y² − 2y − 9   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : 4y − 2 = 0
    = y = 1/2   ← Dérivée nulle
  — Point critique de l'arc (√35/2 ; 1/2) (et son symétrique)  [juge value]  départ : −(√35/2)² + (1/2)² − 2·(1/2)
    ? y = 1/2 est-il sur l'arc (0 ≤ y ≤ 3) ? ✔ Oui : il donne les points (±√35/2 ; 1/2) / · Non : on l'écarte
    = −19/2   ← f(√35/2 ; 1/2)
  — Extrémité y = 3 de l'arc : point (0 ; 3)  [juge value]  départ : −0² + 3² − 2·3
    = 3   ← f(0 ; 3)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 3) / · En (0 ; 1)
    = 3   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (√35/2 ; 1/2) et (−√35/2 ; 1/2) / · En (√35/2 ; 1/2) seulement / · En (0 ; 1)
    = −19/2   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 9 − y² : f = 2y² − 2y − 9, y ∈ [0 ; 3]. | max f = 3 en (0 ; 3) ; min f = −19/2 en (√35/2 ; 1/2) et (−√35/2 ; 1/2).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = 2x² + y² − 2y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}. Résous ∇f = 0 :
  [free, suivre l'erreur]  4x = 0 ; 2y − 2 = 0
    = (0 ; 1)   ← ∇f = (4x ; 2y−2) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : 2·0² + 1² − 2·1
    = −1   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−2 ; 2] : restriction de f.  [juge equiv]  départ : 2x² + 0² − 2·0
    = 2x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 2·0² + 0² − 2·0
    = 0   ← f(0 ; 0)
  — Coins (±2 ; 0) : valeur de f en (2 ; 0) (la même en (−2 ; 0))  [juge value]  départ : 2·2² + 0² − 2·0
    = 8   ← f(2 ; 0)
  — Arc : x² = 4 − y², avec y ∈ [0 ; 2]. Restriction de f :  [juge equiv]  départ : 2(4 − y²) + y² − 2y
    = −y² − 2y + 8   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : −2y − 2 = 0
    = y = −1   ← Dérivée nulle
  — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : 2·0² + 2² − 2·2
    ? y = −1 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Non : l'arc n'a pas de point critique à l'intérieur / · Oui : on le garde comme candidat
    = 0   ← f(0 ; 2)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
    = 8   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = −1   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 4 − y² : f = −y² − 2y + 8, y ∈ [0 ; 2]. | max f = 8 en (2 ; 0) et (−2 ; 0) ; min f = −1 en (0 ; 1).
  pièges : a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = −3x² − y² + 2y sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0}. Résous ∇f = 0 :
  [free, suivre l'erreur]  −6x = 0 ; −2y + 2 = 0
    = (0 ; 1)   ← ∇f = (−6x ; −2y+2) = 0 : un point, intérieur à D
  — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −3·0² − 1² + 2·1
    = 1   ← f(0 ; 1)
  — Segment y = 0, x ∈ [−3 ; 3] : restriction de f.  [juge equiv]  départ : −3x² − 0² + 2·0
    = −3x²   ← Remplacer y par 0
  — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −3·0² − 0² + 2·0
    = 0   ← f(0 ; 0)
  — Coins (±3 ; 0) : valeur de f en (3 ; 0) (la même en (−3 ; 0))  [juge value]  départ : −3·3² − 0² + 2·0
    = −27   ← f(3 ; 0)
  — Arc : x² = 9 − y², avec y ∈ [0 ; 3]. Restriction de f :  [juge equiv]  départ : −3(9 − y²) − y² + 2y
    = 2y² + 2y − 27   ← Remplacer x² et développer
  — Point critique de la restriction :  [juge system]  départ : 4y + 2 = 0
    = y = −1/2   ← Dérivée nulle
  — Extrémité y = 3 de l'arc : point (0 ; 3)  [juge value]  départ : −3·0² − 3² + 2·3
    ? y = −1/2 est-il sur l'arc (0 ≤ y ≤ 3) ? ✔ Non : l'arc n'a pas de point critique à l'intérieur / · Oui : on le garde comme candidat
    = −3   ← f(0 ; 3)
  — Comparer toutes les valeurs : le maximum absolu.  [juge value]  départ : M
    ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
    = 1   ← La plus grande valeur
  — Le minimum absolu.  [juge value]  départ : m
    ? Où le minimum absolu est-il atteint ? ✔ En (3 ; 0) et (−3 ; 0) / · En (3 ; 0) seulement / · En (0 ; 1)
    = −27   ← La plus petite valeur
  aides : Candidats : points stationnaires intérieurs, points critiques sur chaque morceau du bord, extrémités des morceaux. Puis compare les valeurs. | Sur l'arc, remplace x² par 9 − y² : f = 2y² + 2y − 27, y ∈ [0 ; 3]. | max f = 1 en (0 ; 1) ; min f = −27 en (3 ; 0) et (−3 ; 0).

```

### Niveau 5

```
Trouve le maximum et le minimum absolus de f(x, y) = x² + 3y² − 6y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}.
  [problème, 10 points]
  partie 1 (Existence : 0,5)
  Pourquoi f atteint-elle un maximum et un minimum absolus sur D ?
    · f a un point stationnaire dans D [a2_stationary_is_extremum]   · f est un polynôme, donc bornée sur ℝ²   ✔ D est fermé et borné (compact) et f est continue   · D est borné [a2_compact_open]
  partie 2 (Intérieur : 1 ; Valeur de f au point intérieur (0 ; 1) : 1)
  Points stationnaires intérieurs. Résous ∇f = 0 :
    [free, sans aide, suivre l'erreur]  2x = 0 ; 6y − 6 = 0
      = (0 ; 1)   ← ∇f = (2x ; 6y−6) = 0 : un point, intérieur à D
    — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : 0² + 3·1² − 6·1
      = −3   ← f(0 ; 1)
  partie 3 (Segment : 1 ; Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0) : 1)
  Segment y = 0, x ∈ [−2 ; 2]. Restriction de f :
    [free, sans aide, suivre l'erreur]  x² + 3·0² − 6·0
      = x²   ← Remplacer y par 0
    — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 0² + 3·0² − 6·0
      = 0   ← f(0 ; 0)
  partie 4 (Arc : 1 ; Point critique de la restriction : 0,5 ; Point critique de l'arc (√7/2 ; 3/2) (et son symétrique) : 1 ; Extrémité y = 2 de l'arc : point (0 ; 2) : 0,5)
  Arc x² + y² = 4, y ∈ [0 ; 2] : x² = 4 − y². Restriction de f :
    [free, sans aide, suivre l'erreur]  (4 − y²) + 3y² − 6y
      = 2y² − 6y + 4   ← Remplacer x² et développer
    — Point critique de la restriction :  [juge system]  départ : 4y − 6 = 0
      = y = 3/2   ← Dérivée nulle
    — Point critique de l'arc (√7/2 ; 3/2) (et son symétrique)  [juge value]  départ : (√7/2)² + 3·(3/2)² − 6·(3/2)
      ? y = 3/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Oui : il donne les points (±√7/2 ; 3/2) / · Non : on l'écarte
      = −1/2   ← f(√7/2 ; 3/2)
    — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : 0² + 3·2² − 6·2
      = 0   ← f(0 ; 2)
  partie 5 (Coins : 1)
  Coins (±2 ; 0). Valeur de f en (2 ; 0) :
    [free, sans aide, suivre l'erreur]  2² + 3·0² − 6·0
      = 4   ← f(2 ; 0)
  partie 6 (Comparaison : 1 ; Le minimum absolu. : 0,5)
  Compare toutes les valeurs. Le maximum absolu :
    [free, sans aide, suivre l'erreur]  M
      ? Où le maximum absolu est-il atteint ? ✔ En (2 ; 0) et (−2 ; 0) / · En (2 ; 0) seulement / · En (0 ; 1)
      = 4   ← La plus grande valeur
    — Le minimum absolu.  [juge value]  départ : m
      ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 1) / · En (0 ; 0)
      = −3   ← La plus petite valeur
  pièges : a2_stationary_is_extremum, a2_compact_open, a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = 2x² − 2y² + 4y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}.
  [problème, 10 points]
  partie 1 (Existence : 0,5)
  Pourquoi f atteint-elle un maximum et un minimum absolus sur D ?
    ✔ D est fermé et borné (compact) et f est continue   · f a un point stationnaire dans D [a2_stationary_is_extremum]   · f est un polynôme, donc bornée sur ℝ²   · D est borné [a2_compact_open]
  partie 2 (Intérieur : 1 ; Valeur de f au point intérieur (0 ; 1) : 1)
  Points stationnaires intérieurs. Résous ∇f = 0 :
    [free, sans aide, suivre l'erreur]  4x = 0 ; −4y + 4 = 0
      = (0 ; 1)   ← ∇f = (4x ; −4y+4) = 0 : un point, intérieur à D
    — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : 2·0² − 2·1² + 4·1
      = 2   ← f(0 ; 1)
  partie 3 (Segment : 1 ; Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0) : 1)
  Segment y = 0, x ∈ [−2 ; 2]. Restriction de f :
    [free, sans aide, suivre l'erreur]  2x² − 2·0² + 4·0
      = 2x²   ← Remplacer y par 0
    — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : 2·0² − 2·0² + 4·0
      = 0   ← f(0 ; 0)
  partie 4 (Arc : 1 ; Point critique de la restriction : 0,5 ; Point critique de l'arc (√15/2 ; 1/2) (et son symétrique) : 1 ; Extrémité y = 2 de l'arc : point (0 ; 2) : 0,5)
  Arc x² + y² = 4, y ∈ [0 ; 2] : x² = 4 − y². Restriction de f :
    [free, sans aide, suivre l'erreur]  2(4 − y²) − 2y² + 4y
      = −4y² + 4y + 8   ← Remplacer x² et développer
    — Point critique de la restriction :  [juge system]  départ : −8y + 4 = 0
      = y = 1/2   ← Dérivée nulle
    — Point critique de l'arc (√15/2 ; 1/2) (et son symétrique)  [juge value]  départ : 2·(√15/2)² − 2·(1/2)² + 4·(1/2)
      ? y = 1/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Oui : il donne les points (±√15/2 ; 1/2) / · Non : on l'écarte
      = 9   ← f(√15/2 ; 1/2)
    — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : 2·0² − 2·2² + 4·2
      = 0   ← f(0 ; 2)
  partie 5 (Coins : 1)
  Coins (±2 ; 0). Valeur de f en (2 ; 0) :
    [free, sans aide, suivre l'erreur]  2·2² − 2·0² + 4·0
      = 8   ← f(2 ; 0)
  partie 6 (Comparaison : 1 ; Le minimum absolu. : 0,5)
  Compare toutes les valeurs. Le maximum absolu :
    [free, sans aide, suivre l'erreur]  M
      ? Où le maximum absolu est-il atteint ? ✔ En (√15/2 ; 1/2) et (−√15/2 ; 1/2) / · En (√15/2 ; 1/2) seulement / · En (0 ; 1)
      = 9   ← La plus grande valeur
    — Le minimum absolu.  [juge value]  départ : m
      ? Où le minimum absolu est-il atteint ? ✔ En (0 ; 0) et (0 ; 2) / · En (0 ; 0) seulement / · En (0 ; 1)
      = 0   ← La plus petite valeur
  pièges : a2_stationary_is_extremum, a2_compact_open, a2_compact_boundary_forgot

Trouve le maximum et le minimum absolus de f(x, y) = −x² + y² − 2y sur le demi-disque D = {x² + y² ≤ 4, y ≥ 0}.
  [problème, 10 points]
  partie 1 (Existence : 0,5)
  Pourquoi f atteint-elle un maximum et un minimum absolus sur D ?
    · f est un polynôme, donc bornée sur ℝ²   · D est borné [a2_compact_open]   · f a un point stationnaire dans D [a2_stationary_is_extremum]   ✔ D est fermé et borné (compact) et f est continue
  partie 2 (Intérieur : 1 ; Valeur de f au point intérieur (0 ; 1) : 1)
  Points stationnaires intérieurs. Résous ∇f = 0 :
    [free, sans aide, suivre l'erreur]  −2x = 0 ; 2y − 2 = 0
      = (0 ; 1)   ← ∇f = (−2x ; 2y−2) = 0 : un point, intérieur à D
    — Valeur de f au point intérieur (0 ; 1) :  [juge value]  départ : −0² + 1² − 2·1
      = −1   ← f(0 ; 1)
  partie 3 (Segment : 1 ; Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0) : 1)
  Segment y = 0, x ∈ [−2 ; 2]. Restriction de f :
    [free, sans aide, suivre l'erreur]  −x² + 0² − 2·0
      = −x²   ← Remplacer y par 0
    — Sur le segment, la dérivée s'annule en x = 0 : valeur de f en (0 ; 0)  [juge value]  départ : −0² + 0² − 2·0
      = 0   ← f(0 ; 0)
  partie 4 (Arc : 1 ; Point critique de la restriction : 0,5 ; Point critique de l'arc (√15/2 ; 1/2) (et son symétrique) : 1 ; Extrémité y = 2 de l'arc : point (0 ; 2) : 0,5)
  Arc x² + y² = 4, y ∈ [0 ; 2] : x² = 4 − y². Restriction de f :
    [free, sans aide, suivre l'erreur]  −(4 − y²) + y² − 2y
      = 2y² − 2y − 4   ← Remplacer x² et développer
    — Point critique de la restriction :  [juge system]  départ : 4y − 2 = 0
      = y = 1/2   ← Dérivée nulle
    — Point critique de l'arc (√15/2 ; 1/2) (et son symétrique)  [juge value]  départ : −(√15/2)² + (1/2)² − 2·(1/2)
      ? y = 1/2 est-il sur l'arc (0 ≤ y ≤ 2) ? ✔ Oui : il donne les points (±√15/2 ; 1/2) / · Non : on l'écarte
      = −9/2   ← f(√15/2 ; 1/2)
    — Extrémité y = 2 de l'arc : point (0 ; 2)  [juge value]  départ : −0² + 2² − 2·2
      = 0   ← f(0 ; 2)
  partie 5 (Coins : 1)
  Coins (±2 ; 0). Valeur de f en (2 ; 0) :
    [free, sans aide, suivre l'erreur]  −2² + 0² − 2·0
      = −4   ← f(2 ; 0)
  partie 6 (Comparaison : 1 ; Le minimum absolu. : 0,5)
  Compare toutes les valeurs. Le maximum absolu :
    [free, sans aide, suivre l'erreur]  M
      ? Où le maximum absolu est-il atteint ? ✔ En (0 ; 0) et (0 ; 2) / · En (0 ; 0) seulement / · En (0 ; 1)
      = 0   ← La plus grande valeur
    — Le minimum absolu.  [juge value]  départ : m
      ? Où le minimum absolu est-il atteint ? ✔ En (√15/2 ; 1/2) et (−√15/2 ; 1/2) / · En (√15/2 ; 1/2) seulement / · En (0 ; 1)
      = −9/2   ← La plus petite valeur
  pièges : a2_stationary_is_extremum, a2_compact_open, a2_compact_boundary_forgot

```

### Variantes d'examen

```
Soit f(x, y) = 2x² − 2y² + 4y sur le demi-disque D = {x² + y² ≤ 9, y ≥ 0}. Laquelle de ces affirmations est vraie ?
  · Le maximum absolu de f sur D vaut 2 [a2_compact_boundary_forgot]   · f n'a pas de maximum absolu sur D [a2_compact_open]   ✔ Le maximum absolu de f sur D vaut 19   · Le maximum absolu de f sur D vaut 0
  [examen mcq]
  pièges : a2_compact_boundary_forgot, a2_compact_open

Vrai ou faux ?
  « Si D ⊂ ℝ² est compact et non vide, et f : D → ℝ est continue, alors f atteint son maximum sur D. » → VRAI
  [examen tf]

```

## Multiplicateurs de Lagrange (une contrainte, deux variables) (`a2-lagrange`, BA2)

_Le système ∇f = λ∇g, g = 0 résolu par cas, puis la comparaison des valeurs._

### Niveau 1

```
Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte 2x² + 2y² = 16, et les points où ils sont atteints. On donne ∇f = (y ; x). Les cas sont résolus jusqu'à (y=x&#x2004;ou&#x2004;y=−x);2&#x2062;x2+2&#x2062;y2=16. Écris la liste des points candidats :
  [guided]  (y = x ou y = −x) ; 2x² + 2y² = 16
    = (2 ; 2), (-2 ; -2), (2 ; -2), (-2 ; 2)   ← Dans la contrainte
  — Valeur de f en (2 ; 2) :  [juge value]  départ : f
    = □   (trous : 4)   ← f(2 ; 2)
  — Valeur de f en (2 ; −2) :  [juge value]  départ : f
    = −□   (trous : −4)   ← f(2 ; −2)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 4   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 4 est atteint en combien de points ? ✔ 2 points : (2 ; 2) et (−2 ; −2) / · Un seul point
    = −4   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=4&#x2062;λ&#x2062;x;x=4&#x2062;λ&#x2062;y;2&#x2062;x2+2&#x2062;y2=16. | (y=x&#x2004;ou&#x2004;y=−x);2&#x2062;x2+2&#x2062;y2=16 ; max 4, min −4.
  pièges : a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 3, et les points où ils sont atteints. On donne ∇f = (y² ; 2xy). Les cas sont résolus jusqu'à (y=0;λ=0;x2=3)&#x2004;ou&#x2004;(x=2&#x2062;λ;y2=x2;3&#x2062;x2=3). Écris la liste des points candidats :
  [guided]  (y = 0 ; λ = 0 ; x^2 = 3) ou (x = 2λ ; y^2 = x^2 ; 3x^2 = 3)
    = (√3 ; 0), (-√3 ; 0), (1 ; 1), (1 ; -1), (-1 ; 1), (-1 ; -1)   ← Les six candidats
  — Valeur de f en (√3 ; 0) :  [juge value]  départ : f
    = □   (trous : 0)   ← f(√3 ; 0)
  — Valeur de f en (1 ; 1) :  [juge value]  départ : f
    = □   (trous : 1)   ← f(1 ; 1)
  — Valeur de f en (−1 ; 1) :  [juge value]  départ : f
    = −□   (trous : −1)   ← f(−1 ; 1)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 1   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 1 est atteint en combien de points ? ✔ 2 points : (1 ; 1) et (1 ; −1) / · Un seul point
    = −1   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas y = 0 (ne divise pas). | Le système : y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=3. | (y=0;λ=0;x2=3)&#x2004;ou&#x2004;(x=2&#x2062;λ;y2=x2;3&#x2062;x2=3) ; max 1, min −1.
  pièges : a2_lagrange_divide, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = −2x + 3y sous la contrainte 2x² + y² = 11, et les points où ils sont atteints. On donne ∇f = (−2 ; 3). Les cas sont résolus jusqu'à (λ=12&#x2004;ou&#x2004;λ=−12);x=−12&#x2062;λ;y=32&#x2062;λ. Écris la liste des points candidats :
  [guided]  (λ = 1/2 ou λ = −1/2) ; x = −1/(2λ) ; y = 3/(2λ)
    = (-1 ; 3), (1 ; -3)   ← Un point pour chaque λ
  — Valeur de f en (−1 ; 3) :  [juge value]  départ : f
    = □   (trous : 11)   ← f(−1 ; 3)
  — Valeur de f en (1 ; −3) :  [juge value]  départ : f
    = −□   (trous : −11)   ← f(1 ; −3)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 11   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 11 est atteint en combien de points ? ✔ Un seul point / · Deux points (par symétrie)
    = −11   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis exprime x et y en fonction de λ. | Le système : −2=4&#x2062;λ&#x2062;x;3=2&#x2062;λ&#x2062;y;2&#x2062;x2+y2=11. | (λ=12&#x2004;ou&#x2004;λ=−12);x=−12&#x2062;λ;y=32&#x2062;λ ; max 11, min −11.

```

### Niveau 2

```
Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte 4x² + y² = 16, et les points où ils sont atteints. On donne ∇f = (y ; x). Écris le système ∇f = λ∇g et g = 0 :
  [guided]  4x² + y² = 16
    = y = 8λx ; x = 2λy ; 4x² + y² = 16   ← ∇f = (y ; x), ∇g = (8x ; 2y)
    = y = 8λx ; x(1 − 16λ²) = 0 ; 4x² + y² = 16   ← x = 2λ·(8λx) : mettre x en facteur
    ? Une équation est de la forme x·(…) = 0. Que fais-tu ? ✔ Séparer les cas : x = 0, ou (…) = 0 / · Diviser par x
    = (x = 0 ; y = 0 ; 4x^2+y^2 = 16) ou (y = 8λx ; λ^2 = 1/16 ; 4x^2+y^2 = 16)   ← Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …
    = (y = 2x ou y = −2x) ; 4x² + y² = 16   ← λ = ±2/8 : y = ±2x
    = (√2 ; 2√2), (-√2 ; -2√2), (√2 ; -2√2), (-√2 ; 2√2)   ← Dans la contrainte
  — Valeur de f en (√2 ; 2√2) :  [juge value]  départ : f
    = 4   ← f(√2 ; 2√2)
  — Valeur de f en (√2 ; −2√2) :  [juge value]  départ : f
    = −4   ← f(√2 ; −2√2)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 4   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 4 est atteint en combien de points ? ✔ 2 points : (√2 ; 2√2) et (−√2 ; −2√2) / · Un seul point
    = −4   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=8&#x2062;λ&#x2062;x;x=2&#x2062;λ&#x2062;y;4&#x2062;x2+y2=16. | (y=2&#x2062;x&#x2004;ou&#x2004;y=−2&#x2062;x);4&#x2062;x2+y2=16 ; max 4, min −4.
  pièges : a2_lagrange_divide, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte 2x² + y² = 8, et les points où ils sont atteints. On donne ∇f = (y ; x). Écris le système ∇f = λ∇g et g = 0 :
  [guided]  2x² + y² = 8
    = y = 4λx ; x = 2λy ; 2x² + y² = 8   ← ∇f = (y ; x), ∇g = (4x ; 2y)
    = y = 4λx ; x(1 − 8λ²) = 0 ; 2x² + y² = 8   ← x = 2λ·(4λx) : mettre x en facteur
    ? Une équation est de la forme x·(…) = 0. Que fais-tu ? ✔ Séparer les cas : x = 0, ou (…) = 0 / · Diviser par x
    = (x = 0 ; y = 0 ; 2x^2+y^2 = 8) ou (y = 4λx ; λ^2 = 1/8 ; 2x^2+y^2 = 8)   ← Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …
    = (y = (√2)x ou y = −(√2)x) ; 2x² + y² = 8   ← λ = ±√2/4 : y = ±(√2)x
    = (√2 ; 2), (-√2 ; -2), (√2 ; -2), (-√2 ; 2)   ← Dans la contrainte
  — Valeur de f en (√2 ; 2) :  [juge value]  départ : f
    = 2√2   ← f(√2 ; 2)
  — Valeur de f en (√2 ; −2) :  [juge value]  départ : f
    = −2√2   ← f(√2 ; −2)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 2√2   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 2√2 est atteint en combien de points ? ✔ 2 points : (√2 ; 2) et (−√2 ; −2) / · Un seul point
    = −2√2   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=4&#x2062;λ&#x2062;x;x=2&#x2062;λ&#x2062;y;2&#x2062;x2+y2=8. | (y=2&#x2062;x&#x2004;ou&#x2004;y=−2&#x2062;x);2&#x2062;x2+y2=8 ; max 2√2, min −2√2.
  pièges : a2_lagrange_divide, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte x² + 2y² = 4, et les points où ils sont atteints. On donne ∇f = (y ; x). Écris le système ∇f = λ∇g et g = 0 :
  [guided]  x² + 2y² = 4
    = y = 2λx ; x = 4λy ; x² + 2y² = 4   ← ∇f = (y ; x), ∇g = (2x ; 4y)
    = y = 2λx ; x(1 − 8λ²) = 0 ; x² + 2y² = 4   ← x = 4λ·(2λx) : mettre x en facteur
    ? Une équation est de la forme x·(…) = 0. Que fais-tu ? ✔ Séparer les cas : x = 0, ou (…) = 0 / · Diviser par x
    = (x = 0 ; y = 0 ; x^2+2y^2 = 4) ou (y = 2λx ; λ^2 = 1/8 ; x^2+2y^2 = 4)   ← Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …
    = (y = (√2/2)x ou y = −(√2/2)x) ; x² + 2y² = 4   ← λ = ±√2/2/2 : y = ±(√2/2)x
    = (√2 ; 1), (-√2 ; -1), (√2 ; -1), (-√2 ; 1)   ← Dans la contrainte
  — Valeur de f en (√2 ; 1) :  [juge value]  départ : f
    = √2   ← f(√2 ; 1)
  — Valeur de f en (√2 ; −1) :  [juge value]  départ : f
    = −√2   ← f(√2 ; −1)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = √2   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum √2 est atteint en combien de points ? ✔ 2 points : (√2 ; 1) et (−√2 ; −1) / · Un seul point
    = −√2   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=2&#x2062;λ&#x2062;x;x=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=4. | (y=22&#x2062;x&#x2004;ou&#x2004;y=−22&#x2062;x);x2+2&#x2062;y2=4 ; max √2, min −√2.
  pièges : a2_lagrange_divide, a2_lagrange_count

```

### Niveau 3

```
Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte x² + 2y² = 4, et les points où ils sont atteints. On donne ∇f = (y ; x). Écris le système ∇f = λ∇g et g = 0 :
  [tap, suivre l'erreur, menu steps]  x² + 2y² = 4
    = y = 2λx ; x = 4λy ; x² + 2y² = 4   ← ∇f = (y ; x), ∇g = (2x ; 4y)
    = y = 2λx ; x(1 − 8λ²) = 0 ; x² + 2y² = 4   ← x = 4λ·(2λx) : mettre x en facteur
    = (x = 0 ; y = 0 ; x^2+2y^2 = 4) ou (y = 2λx ; λ^2 = 1/8 ; x^2+2y^2 = 4)   ← Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …
    = (y = (√2/2)x ou y = −(√2/2)x) ; x² + 2y² = 4   ← λ = ±√2/2/2 : y = ±(√2/2)x
    = (√2 ; 1), (-√2 ; -1), (√2 ; -1), (-√2 ; 1)   ← Dans la contrainte
  — Valeur de f en (√2 ; 1) :  [juge value]  départ : f
    = √2   ← f(√2 ; 1)
  — Valeur de f en (√2 ; −1) :  [juge value]  départ : f
    = −√2   ← f(√2 ; −1)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = √2   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum √2 est atteint en combien de points ? ✔ 2 points : (√2 ; 1) et (−√2 ; −1) / · Un seul point
    = −√2   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=2&#x2062;λ&#x2062;x;x=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=4. | (y=22&#x2062;x&#x2004;ou&#x2004;y=−22&#x2062;x);x2+2&#x2062;y2=4 ; max √2, min −√2.
  pièges : a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = 2x − y sous la contrainte 2x² + y² = 12, et les points où ils sont atteints. On donne ∇f = (2 ; −1). Écris le système ∇f = λ∇g et g = 0 :
  [tap, suivre l'erreur, menu steps]  2x² + y² = 12
    = 2 = 4λx ; −1 = 2λy ; 2x² + y² = 12   ← ∇f = (2 ; −1), ∇g = (4x ; 2y)
    = x = 1/(2λ) ; y = −1/(2λ) ; 2x² + y² = 12   ← λ ≠ 0 (sinon la 1re équation donne 0 = …) : diviser par λ est permis
    = x = 1/(2λ) ; y = −1/(2λ) ; λ² = 1/16   ← Substituer dans la contrainte
    = (λ = 1/4 ou λ = −1/4) ; x = 1/(2λ) ; y = −1/(2λ)   ← Deux valeurs de λ
    = (2 ; -2), (-2 ; 2)   ← Un point pour chaque λ
  — Valeur de f en (2 ; −2) :  [juge value]  départ : f
    = 6   ← f(2 ; −2)
  — Valeur de f en (−2 ; 2) :  [juge value]  départ : f
    = −6   ← f(−2 ; 2)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 6   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 6 est atteint en combien de points ? ✔ Un seul point / · Deux points (par symétrie)
    = −6   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis exprime x et y en fonction de λ. | Le système : 2=4&#x2062;λ&#x2062;x;−1=2&#x2062;λ&#x2062;y;2&#x2062;x2+y2=12. | (λ=14&#x2004;ou&#x2004;λ=−14);x=12&#x2062;λ;y=−12&#x2062;λ ; max 6, min −6.

Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 9, et les points où ils sont atteints. On donne ∇f = (y² ; 2xy). Écris le système ∇f = λ∇g et g = 0 :
  [tap, suivre l'erreur, menu steps]  x² + 2y² = 9
    = y² = 2λx ; 2xy = 4λy ; x² + 2y² = 9   ← ∇f = (y² ; 2xy), ∇g = (2x ; 4y)
    = y² = 2λx ; 2y(x − 2λ) = 0 ; x² + 2y² = 9   ← Factoriser la 2e équation (ne pas diviser par y)
    = (y = 0 ; λ = 0 ; x^2 = 9) ou (x = 2λ ; y^2 = x^2 ; 3x^2 = 9)   ← Cas y = 0 : x = ±3, λ = 0. Cas x = 2λ : y² = 2λx = x²
    = (3 ; 0), (-3 ; 0), (√3 ; √3), (√3 ; -√3), (-√3 ; √3), (-√3 ; -√3)   ← Les six candidats
  — Valeur de f en (3 ; 0) :  [juge value]  départ : f
    = 0   ← f(3 ; 0)
  — Valeur de f en (√3 ; √3) :  [juge value]  départ : f
    = 3√3   ← f(√3 ; √3)
  — Valeur de f en (−√3 ; √3) :  [juge value]  départ : f
    = −3√3   ← f(−√3 ; √3)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
    = 3√3   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 3√3 est atteint en combien de points ? ✔ 2 points : (√3 ; √3) et (√3 ; −√3) / · Un seul point
    = −3√3   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas y = 0 (ne divise pas). | Le système : y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=9. | (y=0;λ=0;x2=9)&#x2004;ou&#x2004;(x=2&#x2062;λ;y2=x2;3&#x2062;x2=9) ; max 3√3, min −3√3.
  pièges : a2_lagrange_no_compare, a2_lagrange_count

```

### Niveau 4

```
Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 3, et les points où ils sont atteints. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (xy²)
    = y²   ← f_x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (xy²)
    = 2xy   ← f_y
  — Le système de Lagrange, avec ∇g = (2x ; 4y) :  [juge system]  départ : x² + 2y² = 3
    ? ∇g = (2x ; 4y) s'annule-t-il sur la courbe x² + 2y² = 3 ? ✔ Non : ∇g = 0 seulement en (0, 0), qui n'est pas sur la courbe / · Oui
    = y² = 2λx ; 2xy = 4λy ; x² + 2y² = 3   ← ∇f = (y² ; 2xy), ∇g = (2x ; 4y)
    = y² = 2λx ; 2y(x − 2λ) = 0 ; x² + 2y² = 3   ← Factoriser la 2e équation (ne pas diviser par y)
    = (y = 0 ; λ = 0 ; x^2 = 3) ou (x = 2λ ; y^2 = x^2 ; 3x^2 = 3)   ← Cas y = 0 : x = ±√3, λ = 0. Cas x = 2λ : y² = 2λx = x²
    = (√3 ; 0), (-√3 ; 0), (1 ; 1), (1 ; -1), (-1 ; 1), (-1 ; -1)   ← Les six candidats
  — Valeur de f en (√3 ; 0) :  [juge value]  départ : f
    = 0   ← f(√3 ; 0)
  — Valeur de f en (1 ; 1) :  [juge value]  départ : f
    = 1   ← f(1 ; 1)
  — Valeur de f en (−1 ; 1) :  [juge value]  départ : f
    = −1   ← f(−1 ; 1)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
    = 1   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 1 est atteint en combien de points ? ✔ 2 points : (1 ; 1) et (1 ; −1) / · Un seul point
    = −1   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas y = 0 (ne divise pas). | Le système : y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=3. | (y=0;λ=0;x2=3)&#x2004;ou&#x2004;(x=2&#x2062;λ;y2=x2;3&#x2062;x2=3) ; max 1, min −1.
  pièges : a2_lagrange_no_compare, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 4y² = 6, et les points où ils sont atteints. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (xy²)
    = y²   ← f_x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (xy²)
    = 2xy   ← f_y
  — Le système de Lagrange, avec ∇g = (2x ; 8y) :  [juge system]  départ : x² + 4y² = 6
    ? ∇g = (2x ; 8y) s'annule-t-il sur la courbe x² + 4y² = 6 ? ✔ Non : ∇g = 0 seulement en (0, 0), qui n'est pas sur la courbe / · Oui
    = y² = 2λx ; 2xy = 8λy ; x² + 4y² = 6   ← ∇f = (y² ; 2xy), ∇g = (2x ; 8y)
    = y² = 2λx ; 2y(x − 4λ) = 0 ; x² + 4y² = 6   ← Factoriser la 2e équation (ne pas diviser par y)
    = (y = 0 ; λ = 0 ; x^2 = 6) ou (x = 4λ ; y^2 = (1/2)x^2 ; 3x^2 = 6)   ← Cas y = 0 : x = ±√6, λ = 0. Cas x = 4λ : y² = 2λx = (1/2)x²
    = (√6 ; 0), (-√6 ; 0), (√2 ; 1), (√2 ; -1), (-√2 ; 1), (-√2 ; -1)   ← Les six candidats
  — Valeur de f en (√6 ; 0) :  [juge value]  départ : f
    = 0   ← f(√6 ; 0)
  — Valeur de f en (√2 ; 1) :  [juge value]  départ : f
    = √2   ← f(√2 ; 1)
  — Valeur de f en (−√2 ; 1) :  [juge value]  départ : f
    = −√2   ← f(−√2 ; 1)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
    = √2   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum √2 est atteint en combien de points ? ✔ 2 points : (√2 ; 1) et (√2 ; −1) / · Un seul point
    = −√2   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas y = 0 (ne divise pas). | Le système : y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=8&#x2062;λ&#x2062;y;x2+4&#x2062;y2=6. | (y=0;λ=0;x2=6)&#x2004;ou&#x2004;(x=4&#x2062;λ;y2=12&#x2062;x2;3&#x2062;x2=6) ; max √2, min −√2.
  pièges : a2_lagrange_no_compare, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy sous la contrainte x² + 3y² = 12, et les points où ils sont atteints. Calcule ∂f/∂x :
  [free, suivre l'erreur]  ∂/∂x (xy)
    = y   ← f_x
  — Puis ∂f/∂y :  [juge equiv]  départ : ∂/∂y (xy)
    = x   ← f_y
  — Le système de Lagrange, avec ∇g = (2x ; 6y) :  [juge system]  départ : x² + 3y² = 12
    ? ∇g = (2x ; 6y) s'annule-t-il sur la courbe x² + 3y² = 12 ? ✔ Non : ∇g = 0 seulement en (0, 0), qui n'est pas sur la courbe / · Oui
    = y = 2λx ; x = 6λy ; x² + 3y² = 12   ← ∇f = (y ; x), ∇g = (2x ; 6y)
    = y = 2λx ; x(1 − 12λ²) = 0 ; x² + 3y² = 12   ← x = 6λ·(2λx) : mettre x en facteur
    = (x = 0 ; y = 0 ; x^2+3y^2 = 12) ou (y = 2λx ; λ^2 = 1/12 ; x^2+3y^2 = 12)   ← Cas x = 0 (alors y = 0, pas sur la courbe), ou λ² = …
    = (y = (√3/3)x ou y = −(√3/3)x) ; x² + 3y² = 12   ← λ = ±√3/3/2 : y = ±(√3/3)x
    = (√6 ; √2), (-√6 ; -√2), (√6 ; -√2), (-√6 ; √2)   ← Dans la contrainte
  — Valeur de f en (√6 ; √2) :  [juge value]  départ : f
    = 2√3   ← f(√6 ; √2)
  — Valeur de f en (√6 ; −√2) :  [juge value]  départ : f
    = −2√3   ← f(√6 ; −√2)
  — Comparer les valeurs : le maximum de f sur la courbe.  [juge value]  départ : M
    = 2√3   ← La plus grande valeur
  — Le minimum de f sur la courbe.  [juge value]  départ : m
    ? Le maximum 2√3 est atteint en combien de points ? ✔ 2 points : (√6 ; √2) et (−√6 ; −√2) / · Un seul point
    = −2√3   ← La plus petite valeur
  aides : Écris ∇f = λ∇g et la contrainte, puis sépare le cas x = 0 (ne divise pas). | Le système : y=2&#x2062;λ&#x2062;x;x=6&#x2062;λ&#x2062;y;x2+3&#x2062;y2=12. | (y=33&#x2062;x&#x2004;ou&#x2004;y=−33&#x2062;x);x2+3&#x2062;y2=12 ; max 2√3, min −2√3.
  pièges : a2_lagrange_count

```

### Niveau 5

```
Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 6, et les points où ils sont atteints.
  [problème, 10 points]
  partie 1 (Existence et hypothèse : 1)
  Pourquoi f atteint-elle un maximum et un minimum sur la courbe x² + 2y² = 6, et pourquoi la méthode de Lagrange s'applique-t-elle ?
    · f est un polynôme, et ∇f ≠ 0 sur la courbe   ✔ La courbe est compacte, f est continue, et ∇g = (2x ; 4y) ≠ 0 sur la courbe   · La courbe est bornée, donc tout point où ∇f = λ∇g est un extremum [a2_lagrange_no_compare]   · Elle n'en atteint pas : la courbe n'est pas un ouvert [a2_compact_open]
  partie 2 (Système : 1)
  Quel est le système de Lagrange ∇f = λ∇g, g = 0 ?
    ✔ y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=6   · y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y [a2_lagrange_no_constraint]   · y2=2&#x2062;λ;2&#x2062;x&#x2062;y=4&#x2062;λ;x2+2&#x2062;y2=6   · 2&#x2062;x&#x2062;y=2&#x2062;λ&#x2062;x;y2=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=6
  partie 3 (Cas y = 0 : 1 ; Valeur de f en (√6 ; 0) : 1)
  Cas y = 0 : résous, puis calcule f en ces points.
    [free, sans aide, suivre l'erreur]  y = 0 ; y² = 2λx ; x² + 2y² = 6
      = λ = 0 ; y = 0 ; x² = 6   ← y = 0 : λx = 0 et x² = …
      = (√6 ; 0), (-√6 ; 0)   ← x = ±√6
    — Valeur de f en (√6 ; 0) :  [juge value]  départ : f
      = 0   ← f(√6 ; 0)
  partie 4 (Cas y ≠ 0 : 3)
  Cas y ≠ 0 : la 2e équation donne x = 2λ. Résous.
    [free, sans aide, suivre l'erreur]  x = 2λ ; y² = 2λx ; x² + 2y² = 6
      = x = 2λ ; y² = x² ; 3x² = 6   ← y² = 2λx = x², puis la contrainte
      = (√2 ; √2), (√2 ; -√2), (-√2 ; √2), (-√2 ; -√2)   ← x = ±√2
  partie 5 (Valeurs : 0,5 ; Valeur de f en (−√2 ; √2) : 0,5)
  Valeurs de f aux candidats du cas y ≠ 0 : en (√2 ; √2) :
    [free, sans aide, suivre l'erreur]  f
      = 2√2   ← f(√2 ; √2)
    — Valeur de f en (−√2 ; √2) :  [juge value]  départ : f
      = −2√2   ← f(−√2 ; √2)
  partie 6 (Conclusion : 1 ; Le minimum de f sur la courbe. : 1)
  Conclus. Le maximum de f sur la courbe :
    [free, sans aide, suivre l'erreur]  M
      ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
      = 2√2   ← La plus grande valeur
    — Le minimum de f sur la courbe.  [juge value]  départ : m
      ? Le maximum 2√2 est atteint en combien de points ? ✔ 2 points : (√2 ; √2) et (√2 ; −√2) / · Un seul point
      = −2√2   ← La plus petite valeur
  pièges : a2_lagrange_no_compare, a2_compact_open, a2_lagrange_no_constraint, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 9, et les points où ils sont atteints.
  [problème, 10 points]
  partie 1 (Existence et hypothèse : 1)
  Pourquoi f atteint-elle un maximum et un minimum sur la courbe x² + 2y² = 9, et pourquoi la méthode de Lagrange s'applique-t-elle ?
    ✔ La courbe est compacte, f est continue, et ∇g = (2x ; 4y) ≠ 0 sur la courbe   · f est un polynôme, et ∇f ≠ 0 sur la courbe   · La courbe est bornée, donc tout point où ∇f = λ∇g est un extremum [a2_lagrange_no_compare]   · Elle n'en atteint pas : la courbe n'est pas un ouvert [a2_compact_open]
  partie 2 (Système : 1)
  Quel est le système de Lagrange ∇f = λ∇g, g = 0 ?
    ✔ y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=9   · y2=2&#x2062;λ;2&#x2062;x&#x2062;y=4&#x2062;λ;x2+2&#x2062;y2=9   · y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y [a2_lagrange_no_constraint]   · 2&#x2062;x&#x2062;y=2&#x2062;λ&#x2062;x;y2=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=9
  partie 3 (Cas y = 0 : 1 ; Valeur de f en (3 ; 0) : 1)
  Cas y = 0 : résous, puis calcule f en ces points.
    [free, sans aide, suivre l'erreur]  y = 0 ; y² = 2λx ; x² + 2y² = 9
      = λ = 0 ; y = 0 ; x² = 9   ← y = 0 : λx = 0 et x² = …
      = (3 ; 0), (-3 ; 0)   ← x = ±3
    — Valeur de f en (3 ; 0) :  [juge value]  départ : f
      = 0   ← f(3 ; 0)
  partie 4 (Cas y ≠ 0 : 3)
  Cas y ≠ 0 : la 2e équation donne x = 2λ. Résous.
    [free, sans aide, suivre l'erreur]  x = 2λ ; y² = 2λx ; x² + 2y² = 9
      = x = 2λ ; y² = x² ; 3x² = 9   ← y² = 2λx = x², puis la contrainte
      = (√3 ; √3), (√3 ; -√3), (-√3 ; √3), (-√3 ; -√3)   ← x = ±√3
  partie 5 (Valeurs : 0,5 ; Valeur de f en (−√3 ; √3) : 0,5)
  Valeurs de f aux candidats du cas y ≠ 0 : en (√3 ; √3) :
    [free, sans aide, suivre l'erreur]  f
      = 3√3   ← f(√3 ; √3)
    — Valeur de f en (−√3 ; √3) :  [juge value]  départ : f
      = −3√3   ← f(−√3 ; √3)
  partie 6 (Conclusion : 1 ; Le minimum de f sur la courbe. : 1)
  Conclus. Le maximum de f sur la courbe :
    [free, sans aide, suivre l'erreur]  M
      ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
      = 3√3   ← La plus grande valeur
    — Le minimum de f sur la courbe.  [juge value]  départ : m
      ? Le maximum 3√3 est atteint en combien de points ? ✔ 2 points : (√3 ; √3) et (√3 ; −√3) / · Un seul point
      = −3√3   ← La plus petite valeur
  pièges : a2_lagrange_no_compare, a2_compact_open, a2_lagrange_no_constraint, a2_lagrange_count

Trouve le maximum et le minimum de f(x, y) = xy² sous la contrainte x² + 2y² = 6, et les points où ils sont atteints.
  [problème, 10 points]
  partie 1 (Existence et hypothèse : 1)
  Pourquoi f atteint-elle un maximum et un minimum sur la courbe x² + 2y² = 6, et pourquoi la méthode de Lagrange s'applique-t-elle ?
    · f est un polynôme, et ∇f ≠ 0 sur la courbe   ✔ La courbe est compacte, f est continue, et ∇g = (2x ; 4y) ≠ 0 sur la courbe   · Elle n'en atteint pas : la courbe n'est pas un ouvert [a2_compact_open]   · La courbe est bornée, donc tout point où ∇f = λ∇g est un extremum [a2_lagrange_no_compare]
  partie 2 (Système : 1)
  Quel est le système de Lagrange ∇f = λ∇g, g = 0 ?
    · y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y [a2_lagrange_no_constraint]   ✔ y2=2&#x2062;λ&#x2062;x;2&#x2062;x&#x2062;y=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=6   · 2&#x2062;x&#x2062;y=2&#x2062;λ&#x2062;x;y2=4&#x2062;λ&#x2062;y;x2+2&#x2062;y2=6   · y2=2&#x2062;λ;2&#x2062;x&#x2062;y=4&#x2062;λ;x2+2&#x2062;y2=6
  partie 3 (Cas y = 0 : 1 ; Valeur de f en (√6 ; 0) : 1)
  Cas y = 0 : résous, puis calcule f en ces points.
    [free, sans aide, suivre l'erreur]  y = 0 ; y² = 2λx ; x² + 2y² = 6
      = λ = 0 ; y = 0 ; x² = 6   ← y = 0 : λx = 0 et x² = …
      = (√6 ; 0), (-√6 ; 0)   ← x = ±√6
    — Valeur de f en (√6 ; 0) :  [juge value]  départ : f
      = 0   ← f(√6 ; 0)
  partie 4 (Cas y ≠ 0 : 3)
  Cas y ≠ 0 : la 2e équation donne x = 2λ. Résous.
    [free, sans aide, suivre l'erreur]  x = 2λ ; y² = 2λx ; x² + 2y² = 6
      = x = 2λ ; y² = x² ; 3x² = 6   ← y² = 2λx = x², puis la contrainte
      = (√2 ; √2), (√2 ; -√2), (-√2 ; √2), (-√2 ; -√2)   ← x = ±√2
  partie 5 (Valeurs : 0,5 ; Valeur de f en (−√2 ; √2) : 0,5)
  Valeurs de f aux candidats du cas y ≠ 0 : en (√2 ; √2) :
    [free, sans aide, suivre l'erreur]  f
      = 2√2   ← f(√2 ; √2)
    — Valeur de f en (−√2 ; √2) :  [juge value]  départ : f
      = −2√2   ← f(−√2 ; √2)
  partie 6 (Conclusion : 1 ; Le minimum de f sur la courbe. : 1)
  Conclus. Le maximum de f sur la courbe :
    [free, sans aide, suivre l'erreur]  M
      ? Les points du cas y = 0 donnent f = 0. Est-ce le minimum ? ✔ Non : il faut comparer avec tous les candidats / · Oui : c'est le premier cas trouvé
      = 2√2   ← La plus grande valeur
    — Le minimum de f sur la courbe.  [juge value]  départ : m
      ? Le maximum 2√2 est atteint en combien de points ? ✔ 2 points : (√2 ; √2) et (√2 ; −√2) / · Un seul point
      = −2√2   ← La plus petite valeur
  pièges : a2_lagrange_no_compare, a2_compact_open, a2_lagrange_no_constraint, a2_lagrange_count

```

### Variantes d'examen

```
Soit f(x, y) = xy sur la courbe x² + 3y² = 6. Laquelle de ces affirmations est vraie ?
  · f n'atteint pas de maximum sur la contrainte [a2_compact_open]   · f atteint son maximum sur la contrainte en exactement un point [a2_lagrange_count]   · Le maximum de f sur la contrainte vaut √3/3 [a2_lagrange_no_constraint]   ✔ Le maximum de f sur la contrainte vaut √3
  [examen mcq]
  pièges : a2_lagrange_no_constraint, a2_compact_open, a2_lagrange_count

Vrai ou faux ?
  « Pour f(x, y) = xy sous la contrainte x² + 3y² = 6, le point (√3 ; −1) vérifie ∇f = λ∇g pour un certain λ. » → VRAI
  [examen tf]

```

## Lagrange dans ℝ³ ; formes quadratiques sur la sphère (`a2-lagrange-3d`, BA2)

_f linéaire : le point est un multiple de ∇f ; f = xᵀAx : les valeurs propres de A._

### Niveau 1

```
Trouve le maximum et le minimum de f(x, y, z) = −3x − 6y + 2z sur la sphère x² + y² + z² = 196. ∇f = (−3 ; −6 ; 2) = 2λ(x ; y ; z). On a déjà y=2&#x2062;x;z=−23&#x2062;x;499&#x2062;x2=196. Écris les deux points :
  [guided]  y = 2x ; z = −(2/3)x ; (49/9)x² = 196
    = (-6 ; -12 ; 4), (6 ; 12 ; -4)   ← x = ±6
  — Valeur de f en (−6 ; −12 ; 4) :  [juge value]  départ : −3·(−6) − 6·(−12) + 2·4
    = □   (trous : 98)   ← f(−6 ; −12 ; 4)
  — Valeur de f en (6 ; 12 ; −4) :  [juge value]  départ : −3·6 − 6·12 + 2·(−4)
    = −□   (trous : −98)   ← f(6 ; 12 ; −4)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 98   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −98   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(−3 ; −6 ; 2) avec 49t² = 196. | Points ±(−6 ; −12 ; 4) ; f = ±98.

Trouve le maximum et le minimum de f(x, y, z) = −6x + 2y + 3z sur la sphère x² + y² + z² = 49. ∇f = (−6 ; 2 ; 3) = 2λ(x ; y ; z). On a déjà y=−13&#x2062;x;z=−12&#x2062;x;4936&#x2062;x2=49. Écris les deux points :
  [guided]  y = −(1/3)x ; z = −(1/2)x ; (49/36)x² = 49
    = (-6 ; 2 ; 3), (6 ; -2 ; -3)   ← x = ±6
  — Valeur de f en (−6 ; 2 ; 3) :  [juge value]  départ : −6·(−6) + 2·2 + 3·3
    = □   (trous : 49)   ← f(−6 ; 2 ; 3)
  — Valeur de f en (6 ; −2 ; −3) :  [juge value]  départ : −6·6 + 2·(−2) + 3·(−3)
    = −□   (trous : −49)   ← f(6 ; −2 ; −3)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 49   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −49   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(−6 ; 2 ; 3) avec 49t² = 49. | Points ±(−6 ; 2 ; 3) ; f = ±49.

Trouve le maximum et le minimum de f(x, y, z) = −x − 4y + 8z sur la sphère x² + y² + z² = 81. ∇f = (−1 ; −4 ; 8) = 2λ(x ; y ; z). On a déjà y=4&#x2062;x;z=−8&#x2062;x;81&#x2062;x2=81. Écris les deux points :
  [guided]  y = 4x ; z = −8x ; 81x² = 81
    = (-1 ; -4 ; 8), (1 ; 4 ; -8)   ← x = ±1
  — Valeur de f en (−1 ; −4 ; 8) :  [juge value]  départ : −(−1) − 4·(−4) + 8·8
    = □   (trous : 81)   ← f(−1 ; −4 ; 8)
  — Valeur de f en (1 ; 4 ; −8) :  [juge value]  départ : −1 − 4·4 + 8·(−8)
    = −□   (trous : −81)   ← f(1 ; 4 ; −8)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 81   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −81   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(−1 ; −4 ; 8) avec 81t² = 81. | Points ±(−1 ; −4 ; 8) ; f = ±81.

```

### Niveau 2

```
Trouve le maximum et le minimum de f(x, y, z) = 6x − 2y − 3z sur la sphère x² + y² + z² = 49. ∇f = (6 ; −2 ; −3) = 2λ(x ; y ; z). Écris le système en x, y, z (le point est un multiple de ∇f), puis résous :
  [guided]  x² + y² + z² = 49
    = y = −(1/3)x ; z = −(1/2)x ; x² + y² + z² = 49   ← (6 ; −2 ; −3) = 2λ(x ; y ; z) : le point est un multiple de ∇f
    = y = −(1/3)x ; z = −(1/2)x ; (49/36)x² = 49   ← Substituer dans la contrainte
    = (6 ; -2 ; -3), (-6 ; 2 ; 3)   ← x = ±6
  — Valeur de f en (6 ; −2 ; −3) :  [juge value]  départ : 6·6 − 2·(−2) − 3·(−3)
    = 49   ← f(6 ; −2 ; −3)
  — Valeur de f en (−6 ; 2 ; 3) :  [juge value]  départ : 6·(−6) − 2·2 − 3·3
    = −49   ← f(−6 ; 2 ; 3)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 49   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −49   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(6 ; −2 ; −3) avec 49t² = 49. | Points ±(6 ; −2 ; −3) ; f = ±49.

Trouve le maximum et le minimum de f(x, y, z) = −2x − 2y − z sur la sphère x² + y² + z² = 36. ∇f = (−2 ; −2 ; −1) = 2λ(x ; y ; z). Écris le système en x, y, z (le point est un multiple de ∇f), puis résous :
  [guided]  x² + y² + z² = 36
    = y = x ; z = (1/2)x ; x² + y² + z² = 36   ← (−2 ; −2 ; −1) = 2λ(x ; y ; z) : le point est un multiple de ∇f
    = y = x ; z = (1/2)x ; (9/4)x² = 36   ← Substituer dans la contrainte
    = (-4 ; -4 ; -2), (4 ; 4 ; 2)   ← x = ±4
  — Valeur de f en (−4 ; −4 ; −2) :  [juge value]  départ : −2·(−4) − 2·(−4) − (−2)
    = 18   ← f(−4 ; −4 ; −2)
  — Valeur de f en (4 ; 4 ; 2) :  [juge value]  départ : −2·4 − 2·4 − 2
    = −18   ← f(4 ; 4 ; 2)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 18   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −18   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(−2 ; −2 ; −1) avec 9t² = 36. | Points ±(−4 ; −4 ; −2) ; f = ±18.

Trouve le maximum et le minimum de f(x, y, z) = −3x − 6y + 2z sur la sphère x² + y² + z² = 196. ∇f = (−3 ; −6 ; 2) = 2λ(x ; y ; z). Écris le système en x, y, z (le point est un multiple de ∇f), puis résous :
  [guided]  x² + y² + z² = 196
    = y = 2x ; z = −(2/3)x ; x² + y² + z² = 196   ← (−3 ; −6 ; 2) = 2λ(x ; y ; z) : le point est un multiple de ∇f
    = y = 2x ; z = −(2/3)x ; (49/9)x² = 196   ← Substituer dans la contrainte
    = (-6 ; -12 ; 4), (6 ; 12 ; -4)   ← x = ±6
  — Valeur de f en (−6 ; −12 ; 4) :  [juge value]  départ : −3·(−6) − 6·(−12) + 2·4
    = 98   ← f(−6 ; −12 ; 4)
  — Valeur de f en (6 ; 12 ; −4) :  [juge value]  départ : −3·6 − 6·12 + 2·(−4)
    = −98   ← f(6 ; 12 ; −4)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 98   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −98   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(−3 ; −6 ; 2) avec 49t² = 196. | Points ±(−6 ; −12 ; 4) ; f = ±98.

```

### Niveau 3

```
Trouve le maximum et le minimum de f(x, y, z) = 2x + 2y + z sur la sphère x² + y² + z² = 9. ∇f = (2 ; 2 ; 1) = 2λ(x ; y ; z). Écris le système en x, y, z (le point est un multiple de ∇f), puis résous :
  [tap, suivre l'erreur, menu steps]  x² + y² + z² = 9
    = y = x ; z = (1/2)x ; x² + y² + z² = 9   ← (2 ; 2 ; 1) = 2λ(x ; y ; z) : le point est un multiple de ∇f
    = y = x ; z = (1/2)x ; (9/4)x² = 9   ← Substituer dans la contrainte
    = (2 ; 2 ; 1), (-2 ; -2 ; -1)   ← x = ±2
  — Valeur de f en (2 ; 2 ; 1) :  [juge value]  départ : 2·2 + 2·2 + 1
    = 9   ← f(2 ; 2 ; 1)
  — Valeur de f en (−2 ; −2 ; −1) :  [juge value]  départ : 2·(−2) + 2·(−2) + (−1)
    = −9   ← f(−2 ; −2 ; −1)
  — Le maximum de f sur la sphère :  [juge value]  départ : M
    = 9   ← La plus grande valeur
  — Le minimum :  [juge value]  départ : m
    = −9   ← La plus petite
  aides : Le point est un multiple de ∇f : (x ; y ; z) = t·∇f. | (x ; y ; z) = t(2 ; 2 ; 1) avec 9t² = 9. | Points ±(2 ; 2 ; 1) ; f = ±9.

Trouve le maximum et le minimum de f(x, y, z) = 2xy + 2yz sur la sphère unité x² + y² + z² = 1. Écris d'abord la matrice symétrique A telle que f = xᵀAx :
  [tap, suivre l'erreur, menu steps]  A = ?
    ? Quelle méthode pour les extrema de xᵀAx sur la sphère unité ? ✔ Les valeurs propres de A : Ax = λx et f = λ aux points trouvés / ✔ Lagrange direct : 4 équations en x, y, z, λ
    = [[0,1,0],[1,0,1],[0,1,0]]   ← Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2
  — Le polynôme caractéristique de A :  [juge det]  départ : det(A − λI)
    = −λ³ + 2λ   ← Développer selon une ligne
  — Ses racines, les valeurs propres de A :  [juge system]  départ : −λ³ + 2λ = 0
    = −λ(λ² − 2) = 0   ← Mettre λ en facteur
    = λ = 0 ou λ = √2 ou λ = −√2   ← Racines
  — Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :  [juge value]  départ : M
    = √2   ← La plus grande valeur propre
  — Le minimum :  [juge value]  départ : m
    = −√2   ← La plus petite valeur propre
  aides : f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A. | A = [[0,1,0],[1,0,1],[0,1,0]] | Valeurs propres 0, √2, −√2 : max √2, min −√2.
  pièges : a2_jacobian_transposed, a2_quadform_matrix_half

Trouve le maximum et le minimum de f(x, y, z) = 2x² + 2xy + 2y² − 2z² sur la sphère unité x² + y² + z² = 1. Écris d'abord la matrice symétrique A telle que f = xᵀAx :
  [tap, suivre l'erreur, menu steps]  A = ?
    ? Quelle méthode pour les extrema de xᵀAx sur la sphère unité ? ✔ Les valeurs propres de A : Ax = λx et f = λ aux points trouvés / ✔ Lagrange direct : 4 équations en x, y, z, λ
    = [[2,1,0],[1,2,0],[0,0,-2]]   ← Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2
  — Le polynôme caractéristique de A :  [juge det]  départ : det(A − λI)
    = (−2 − λ)(1 − λ)(3 − λ)   ← Bloc 2 × 2 et case z : factoriser
  — Ses racines, les valeurs propres de A :  [juge system]  départ : (−2 − λ)(1 − λ)(3 − λ) = 0
    = λ = 3 ou λ = 1 ou λ = −2   ← Racines
  — Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :  [juge value]  départ : M
    = 3   ← La plus grande valeur propre
  — Le minimum :  [juge value]  départ : m
    = −2   ← La plus petite valeur propre
  aides : f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A. | A = [[2,1,0],[1,2,0],[0,0,-2]] | Valeurs propres 3, 1, −2 : max 3, min −2.
  pièges : a2_jacobian_transposed, a2_quadform_matrix_half

```

### Niveau 4

```
Trouve le maximum et le minimum de f(x, y, z) = xy + yz sur la sphère unité x² + y² + z² = 1. Écris d'abord la matrice symétrique A telle que f = xᵀAx :
  [free, suivre l'erreur]  A = ?
    = [[0,1/2,0],[1/2,0,1/2],[0,1/2,0]]   ← Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2
  — Le polynôme caractéristique de A :  [juge det]  départ : det(A − λI)
    = −λ³ + (1/2)λ   ← Développer selon une ligne
  — Ses racines, les valeurs propres de A :  [juge system]  départ : −λ³ + (1/2)λ = 0
    = −λ(λ² − 1/2) = 0   ← Mettre λ en facteur
    = λ = 0 ou λ = √2/2 ou λ = −√2/2   ← Racines
  — Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :  [juge value]  départ : M
    = √2/2   ← La plus grande valeur propre
  — Le minimum :  [juge value]  départ : m
    = −√2/2   ← La plus petite valeur propre
  aides : f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A. | A = [[0,1/2,0],[1/2,0,1/2],[0,1/2,0]] | Valeurs propres 0, √2/2, −√2/2 : max √2/2, min −√2/2.
  pièges : a2_jacobian_transposed, a2_quadform_matrix_half

Trouve le maximum et le minimum de f(x, y, z) = 3x² − 4xy + 3y² − 2z² sur la sphère unité x² + y² + z² = 1. Écris d'abord la matrice symétrique A telle que f = xᵀAx :
  [free, suivre l'erreur]  A = ?
    = [[3,-2,0],[-2,3,0],[0,0,-2]]   ← Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2
  — Le polynôme caractéristique de A :  [juge det]  départ : det(A − λI)
    = (−2 − λ)(5 − λ)(1 − λ)   ← Bloc 2 × 2 et case z : factoriser
  — Ses racines, les valeurs propres de A :  [juge system]  départ : (−2 − λ)(5 − λ)(1 − λ) = 0
    = λ = 1 ou λ = 5 ou λ = −2   ← Racines
  — Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :  [juge value]  départ : M
    = 5   ← La plus grande valeur propre
  — Le minimum :  [juge value]  départ : m
    = −2   ← La plus petite valeur propre
  aides : f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A. | A = [[3,-2,0],[-2,3,0],[0,0,-2]] | Valeurs propres 1, 5, −2 : max 5, min −2.
  pièges : a2_jacobian_transposed, a2_quadform_matrix_half

Trouve le maximum et le minimum de f(x, y, z) = 4xy + 3yz sur la sphère unité x² + y² + z² = 1. Écris d'abord la matrice symétrique A telle que f = xᵀAx :
  [free, suivre l'erreur]  A = ?
    = [[0,2,0],[2,0,3/2],[0,3/2,0]]   ← Chaque terme croisé se partage en deux cases : aᵢⱼ = aⱼᵢ = coefficient/2
  — Le polynôme caractéristique de A :  [juge det]  départ : det(A − λI)
    = −λ³ + (25/4)λ   ← Développer selon une ligne
  — Ses racines, les valeurs propres de A :  [juge system]  départ : −λ³ + (25/4)λ = 0
    = −λ(λ² − 25/4) = 0   ← Mettre λ en facteur
    = λ = 0 ou λ = 5/2 ou λ = −5/2   ← Racines
  — Sur la sphère unité, f = xᵀAx a pour maximum la plus grande valeur propre :  [juge value]  départ : M
    = 5/2   ← La plus grande valeur propre
  — Le minimum :  [juge value]  départ : m
    = −5/2   ← La plus petite valeur propre
  aides : f = xᵀAx avec A symétrique : un terme c·xy donne a₁₂ = a₂₁ = c/2. Puis les valeurs propres de A. | A = [[0,2,0],[2,0,3/2],[0,3/2,0]] | Valeurs propres 0, 5/2, −5/2 : max 5/2, min −5/2.
  pièges : a2_jacobian_transposed, a2_quadform_matrix_half

```

### Niveau 5

```
Le maximum de f(x, y, z) = x² + 4xy + y² + z² sur la sphère unité x² + y² + z² = 1 vaut :
  · 5 [a2_quadform_matrix_half]   ✔ 3   · −1   · 4
  pièges : a2_quadform_matrix_half

Le maximum de f(x, y, z) = xy + yz sur la sphère unité x² + y² + z² = 1 vaut :
  · √2 [a2_quadform_matrix_half]   · −√2/2   ✔ √2/2   · 1/2
  pièges : a2_quadform_matrix_half

Le maximum de f(x, y, z) = 3xy + 4yz sur la sphère unité x² + y² + z² = 1 vaut :
  · 5 [a2_quadform_matrix_half]   · −5/2   · 1/2   ✔ 5/2
  pièges : a2_quadform_matrix_half

```

### Variantes d'examen

```
Le maximum de f(x, y, z) = x² + 4xy + y² + 4z² sur la sphère unité x² + y² + z² = 1 vaut :
  · −1   ✔ 4   · 1   · 5 [a2_quadform_matrix_half]
  [examen mcq]
  pièges : a2_quadform_matrix_half

```

## Intégrale à paramètre, bornes fixes : dériver sous l'intégrale (`a2-param-int`, BA2)

_F′(t) = ∫ₐᵇ ∂f/∂t dx : dériver d'abord, intégrer ensuite._

### Niveau 1

```
F(t) = ∫_{0}^{1} xe^(−tx²) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t).
  [guided]  ∂/∂t (xe^(−tx²))
    (f(x, t) = xe^(−tx²) et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] : on peut dériver sous ∫.)
    = □   (trous : −x³e^(−tx²))   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (par parties, après u = x²).  [juge equiv]  départ : ∫_{0}^{1} −x³e^(−tx²) dx
    = [□]_{0}^{1}   (trous : [(tx² + 1)e^(−tx²)/(2t²)]_{0}^{1})   ← Primitive en x, t fixé
    = ((t + 1)e^(−t) − 1)/(2t²)   ← Évaluer entre les bornes
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = −x³e^(−tx²) ; ∫ −x³e^(−tx²) dx : par parties, après u = x². | F′(t) = [(tx² + 1)e^(−tx²)/(2t²)]_{0}^{1} = ((t + 1)e^(−t) − 1)/(2t²)
  pièges : a2_leibniz_wrong_var

F(t) = ∫_{1}^{2} ln(t + x) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t).
  [guided]  ∂/∂t (ln(t + x))
    (f(x, t) = ln(t + x) et ∂f/∂t sont continues sur [1 ; 2] × [1/2 ; 2] : on peut dériver sous ∫.)
    = □/(t + x)   (trous : 1/(t + x))   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [1 ; 2] (une primitive de 1/(t + x) en x est ln(t + x)).  [juge equiv]  départ : ∫_{1}^{2} 1/(t + x) dx
    = [□]_{1}^{2}   (trous : [ln(t + x)]_{1}^{2})   ← Primitive en x, t fixé
    = ln(t + 2) − ln(t + 1)   ← Évaluer entre les bornes
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = 1/(t + x) ; ∫ 1/(t + x) dx : une primitive de 1/(t + x) en x est ln(t + x). | F′(t) = [ln(t + x)]_{1}^{2} = ln(t + 2) − ln(t + 1)
  pièges : g2_log_sum, a2_leibniz_wrong_var

F(t) = ∫_{0}^{π} sin(tx)/x dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t).
  [guided]  ∂/∂t (sin(tx)/x)
    (f(x, t) = sin(tx)/x et ∂f/∂t sont continues sur [0 ; π] × [1/2 ; 2] : on peut dériver sous ∫.)
    = □   (trous : cos(tx))   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; π] (une primitive de cos(tx) en x est sin(tx)/t).  [juge equiv]  départ : ∫_{0}^{π} cos(tx) dx
    = [□]_{0}^{π}   (trous : [sin(tx)/t]_{0}^{π})   ← Primitive en x, t fixé
    = sin(πt)/t   ← Évaluer entre les bornes
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = cos(tx) ; ∫ cos(tx) dx : une primitive de cos(tx) en x est sin(tx)/t. | F′(t) = [sin(tx)/t]_{0}^{π} = sin(πt)/t
  pièges : a2_leibniz_wrong_var

```

### Niveau 2

```
F(t) = ∫_{0}^{1} ln(t + x) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(2).
  [guided]  ∂/∂t (ln(t + x))
    (f et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] : F′(t) = ∫ ∂f/∂t dx.)
    = 1/(t + x)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (une primitive de 1/(t + x) en x est ln(t + x)).  [juge equiv]  départ : ∫_{0}^{1} 1/(t + x) dx
    = [□]_{0}^{1}   (trous : [ln(t + x)]_{0}^{1})   ← Primitive en x, t fixé
    = ln(t + 1) − ln(t)   ← Évaluer entre les bornes
  — Calcule F′(2) :  [juge value]  départ : ln(2 + 1) − ln(2)
    = ln(3) − ln(2)   ← t = 2
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = 1/(t + x) ; ∫ 1/(t + x) dx : une primitive de 1/(t + x) en x est ln(t + x). | F′(t) = [ln(t + x)]_{0}^{1} = ln(t + 1) − ln(t)
  pièges : g2_log_sum, a2_leibniz_wrong_var

F(t) = ∫_{0}^{1} arctan(tx) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(1).
  [guided]  ∂/∂t (arctan(tx))
    (f et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] : F′(t) = ∫ ∂f/∂t dx.)
    = x/(1 + t²x²)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (u = 1 + t²x², du = 2t²x dx).  [juge equiv]  départ : ∫_{0}^{1} x/(1 + t²x²) dx
    = [□]_{0}^{1}   (trous : [ln(1 + t²x²)/(2t²)]_{0}^{1})   ← Primitive en x, t fixé
    = ln(1 + t²)/(2t²)   ← Évaluer entre les bornes
  — Calcule F′(1) :  [juge value]  départ : ln(1 + 1²)/(2·1²)
    = ln(2)/2   ← t = 1
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = x/(1 + t²x²) ; ∫ x/(1 + t²x²) dx : u = 1 + t²x², du = 2t²x dx. | F′(t) = [ln(1 + t²x²)/(2t²)]_{0}^{1} = ln(1 + t²)/(2t²)
  pièges : a2_leibniz_wrong_var

F(t) = ∫_{0}^{1} sin(tx)/x dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(2).
  [guided]  ∂/∂t (sin(tx)/x)
    (f et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] : F′(t) = ∫ ∂f/∂t dx.)
    = cos(tx)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (une primitive de cos(tx) en x est sin(tx)/t).  [juge equiv]  départ : ∫_{0}^{1} cos(tx) dx
    = [□]_{0}^{1}   (trous : [sin(tx)/t]_{0}^{1})   ← Primitive en x, t fixé
    = sin(t)/t   ← Évaluer entre les bornes
  — Calcule F′(2) :  [juge value]  départ : F′
    = sin(2)/2   ← t = 2
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = cos(tx) ; ∫ cos(tx) dx : une primitive de cos(tx) en x est sin(tx)/t. | F′(t) = [sin(tx)/t]_{0}^{1} = sin(t)/t
  pièges : a2_leibniz_wrong_var

```

### Niveau 3

```
F(t) = ∫_{0}^{1} sin(tx)/x dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(2).
  [tap, suivre l'erreur, menu steps]  ∂/∂t (sin(tx)/x)
    ? Comment calcules-tu F′(t) ? ✔ Dériver sous l'intégrale, puis intégrer en x / ✔ Calculer F(t), puis dériver
    = cos(tx)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (une primitive de cos(tx) en x est sin(tx)/t).  [juge equiv]  départ : ∫_{0}^{1} cos(tx) dx
    = [sin(tx)/t]_{0}^{1}   ← Primitive en x, t fixé
    = sin(t)/t   ← Évaluer entre les bornes
  — Calcule F′(2) :  [juge value]  départ : F′
    = sin(2)/2   ← t = 2
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = cos(tx) ; ∫ cos(tx) dx : une primitive de cos(tx) en x est sin(tx)/t. | F′(t) = [sin(tx)/t]_{0}^{1} = sin(t)/t
  pièges : a2_leibniz_wrong_var

F(t) = ∫_{0}^{1} ln(1 + tx) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(2).
  [tap, suivre l'erreur, menu steps]  ∂/∂t (ln(1 + tx))
    ? Comment calcules-tu F′(t) ? ✔ Dériver sous l'intégrale, puis intégrer en x / ✔ Calculer F(t), puis dériver
    = x/(1 + tx)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; 1] (x/(1 + tx) = 1/t − 1/(t(1 + tx))).  [juge equiv]  départ : ∫_{0}^{1} x/(1 + tx) dx
    = [x/t − ln(1 + tx)/t²]_{0}^{1}   ← Primitive en x, t fixé
    = 1/t − ln(1 + t)/t²   ← Évaluer entre les bornes
  — Calcule F′(2) :  [juge value]  départ : 1/2 − ln(1 + 2)/2²
    = 1/2 − ln(3)/4   ← t = 2
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = x/(1 + tx) ; ∫ x/(1 + tx) dx : x/(1 + tx) = 1/t − 1/(t(1 + tx)). | F′(t) = [x/t − ln(1 + tx)/t²]_{0}^{1} = 1/t − ln(1 + t)/t²
  pièges : g2_log_sum, a2_leibniz_wrong_var

F(t) = ∫_{0}^{π} sin(tx)/x dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(3/2).
  [tap, suivre l'erreur, menu steps]  ∂/∂t (sin(tx)/x)
    ? Comment calcules-tu F′(t) ? ✔ Dériver sous l'intégrale, puis intégrer en x / ✔ Calculer F(t), puis dériver
    = cos(tx)   ← Dériver par rapport à t, x fixé
  — Intègre en x : F′(t) = ∫ ∂f/∂t dx sur [0 ; π] (une primitive de cos(tx) en x est sin(tx)/t).  [juge equiv]  départ : ∫_{0}^{π} cos(tx) dx
    = [sin(tx)/t]_{0}^{π}   ← Primitive en x, t fixé
    = sin(πt)/t   ← Évaluer entre les bornes
  — Calcule F′(3/2) :  [juge value]  départ : sin(π·(3/2))/(3/2)
    = −2/3   ← t = 3/2
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = cos(tx) ; ∫ cos(tx) dx : une primitive de cos(tx) en x est sin(tx)/t. | F′(t) = [sin(tx)/t]_{0}^{π} = sin(πt)/t
  pièges : a2_leibniz_wrong_var

```

### Niveau 4

```
F(t) = ∫_{1}^{2} ln(t + x) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(1).
  [free, suivre l'erreur]  d/dt (∫_{1}^{2} ln(t + x) dx)
    ? Peut-on dériver sous le signe ∫ ? ✔ Oui : f et ∂f/∂t sont continues sur [1 ; 2] × [1/2 ; 2] / · Oui : il suffit que f soit continue / · Non : les bornes ne dépendent pas de t
    = ∫_{1}^{2} 1/(t + x) dx   ← Dériver sous ∫
    = [ln(t + x)]_{1}^{2}   ← Primitive en x, t fixé
    = ln(t + 2) − ln(t + 1)   ← Évaluer entre les bornes
  — Calcule F′(1) :  [juge value]  départ : ln(1 + 2) − ln(1 + 1)
    = ln(3) − ln(2)   ← t = 1
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = 1/(t + x) ; ∫ 1/(t + x) dx : une primitive de 1/(t + x) en x est ln(t + x). | F′(t) = [ln(t + x)]_{1}^{2} = ln(t + 2) − ln(t + 1)
  pièges : g6_chain_forgot, g2_log_sum, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{0}^{1} ln(t + x) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(1).
  [free, suivre l'erreur]  d/dt (∫_{0}^{1} ln(t + x) dx)
    ? Peut-on dériver sous le signe ∫ ? ✔ Oui : f et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] / · Oui : il suffit que f soit continue / · Non : les bornes ne dépendent pas de t
    = ∫_{0}^{1} 1/(t + x) dx   ← Dériver sous ∫
    = [ln(t + x)]_{0}^{1}   ← Primitive en x, t fixé
    = ln(t + 1) − ln(t)   ← Évaluer entre les bornes
  — Calcule F′(1) :  [juge value]  départ : ln(1 + 1) − ln(1)
    = ln(2)   ← t = 1
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = 1/(t + x) ; ∫ 1/(t + x) dx : une primitive de 1/(t + x) en x est ln(t + x). | F′(t) = [ln(t + x)]_{0}^{1} = ln(t + 1) − ln(t)
  pièges : g6_chain_forgot, g2_log_sum, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{0}^{1} arctan(tx) dx pour t ∈ [1/2 ; 2]. Dérive sous le signe ∫ pour trouver F′(t), puis F′(1).
  [free, suivre l'erreur]  d/dt (∫_{0}^{1} arctan(tx) dx)
    ? Peut-on dériver sous le signe ∫ ? ✔ Oui : f et ∂f/∂t sont continues sur [0 ; 1] × [1/2 ; 2] / · Oui : il suffit que f soit continue / · Non : les bornes ne dépendent pas de t
    = ∫_{0}^{1} x/(1 + t²x²) dx   ← Dériver sous ∫
    = [ln(1 + t²x²)/(2t²)]_{0}^{1}   ← Primitive en x, t fixé
    = ln(1 + t²)/(2t²)   ← Évaluer entre les bornes
  — Calcule F′(1) :  [juge value]  départ : ln(1 + 1²)/(2·1²)
    = ln(2)/2   ← t = 1
  aides : Dérive l'intégrande par rapport à t (x reste fixe), puis intègre en x. | ∂f/∂t = x/(1 + t²x²) ; ∫ x/(1 + t²x²) dx : u = 1 + t²x², du = 2t²x dx. | F′(t) = [ln(1 + t²x²)/(2t²)]_{0}^{1} = ln(1 + t²)/(2t²)
  pièges : g6_chain_forgot, a1_arc_deriv_table, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Niveau 5

```
Astuce de Feynman : F(t) = ∫_{0}^{1} (x^t − x³)/ln(x) dx pour t ≥ 0. Calcule F′(t) en dérivant sous ∫, puis F(t) à l'aide de F(3).
  [free, sans aide]  d/dt (∫_{0}^{1} (x^t − x³)/ln(x) dx)
    (f(x, t) = (x^t − x³)/ln(x) se prolonge par continuité en x = 0 et x = 1, et ∂f/∂t = x^t est continue : on dérive sous ∫.)
    = ∫_{0}^{1} x^t dx   ← Dériver sous ∫ : le ln x se simplifie
    = [x^(t + 1)/(t + 1)]_{0}^{1}   ← Primitive en x
    = 1/(t + 1)   ← Évaluer
  — F(3) = 0 (l'intégrande est nul). Donc F(t) = F(3) + ∫ de 3 à t de F′(s) ds :  [juge equiv]  départ : ∫_{3}^{t} 1/(s + 1) ds
    = [ln(s + 1)]_{3}^{t}   ← Primitive
    = ln(t + 1) − ln(4)   ← Évaluer
  pièges : a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

Astuce de Feynman : F(t) = ∫_{0}^{1} (x^(3t) − 1)/ln(x) dx pour t ≥ 0. Calcule F′(t) en dérivant sous ∫, puis F(t) à l'aide de F(0).
  [free, sans aide]  d/dt (∫_{0}^{1} (x^(3t) − 1)/ln(x) dx)
    (f(x, t) = (x^(3t) − 1)/ln(x) se prolonge par continuité en x = 0 et x = 1, et ∂f/∂t = 3x^(3t) est continue : on dérive sous ∫.)
    = ∫_{0}^{1} 3x^(3t) dx   ← Dériver sous ∫ : le ln x se simplifie
    = [3x^(3t + 1)/(3t + 1)]_{0}^{1}   ← Primitive en x
    = 3/(3t + 1)   ← Évaluer
  — F(0) = 0 (l'intégrande est nul). Donc F(t) = F(0) + ∫ de 0 à t de F′(s) ds :  [juge equiv]  départ : ∫_{0}^{t} 3/(3s + 1) ds
    = [ln(3s + 1)]_{0}^{t}   ← Primitive
    = ln(3t + 1)   ← Évaluer
  pièges : a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

Astuce de Feynman : F(t) = ∫_{0}^{1} (x^t − 1)/ln(x) dx pour t ≥ 0. Calcule F′(t) en dérivant sous ∫, puis F(t) à l'aide de F(0).
  [free, sans aide]  d/dt (∫_{0}^{1} (x^t − 1)/ln(x) dx)
    (f(x, t) = (x^t − 1)/ln(x) se prolonge par continuité en x = 0 et x = 1, et ∂f/∂t = x^t est continue : on dérive sous ∫.)
    = ∫_{0}^{1} x^t dx   ← Dériver sous ∫ : le ln x se simplifie
    = [x^(t + 1)/(t + 1)]_{0}^{1}   ← Primitive en x
    = 1/(t + 1)   ← Évaluer
  — F(0) = 0 (l'intégrande est nul). Donc F(t) = F(0) + ∫ de 0 à t de F′(s) ds :  [juge equiv]  départ : ∫_{0}^{t} 1/(s + 1) ds
    = [ln(s + 1)]_{0}^{t}   ← Primitive
    = ln(t + 1)   ← Évaluer
  pièges : a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Variantes d'examen

```
Soit F(t) = ∫_{0}^{π} sin(tx)/x dx pour t ∈ [1/2 ; 2]. Alors F′(t) =
  · sin(πt)/π   · −(sin(πt)/t)   ✔ sin(πt)/t   · sin(πt)/π − t [a2_leibniz_wrong_var]
  [examen mcq]
  pièges : a2_leibniz_wrong_var

Vrai ou faux ? « Si f est continue sur [0 ; 1] × ℝ, alors F(t) = ∫₀¹ f(x, t) dx est dérivable sur ℝ. »
  · Vrai   ✔ Faux
  [examen tf]

```

## Intégrale à paramètre avec bornes variables (règle de Leibniz) (`a2-param-int-bounds`, BA2)

_Trois termes : borne du haut, borne du bas, intégrale de ∂f/∂t._

### Niveau 1

```
F(t) = ∫_{t²}^{t} sin(tx)/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫ ∂f/∂t dx.
  [guided]  d/dt (∫_{t²}^{t} sin(tx)/x dx)
    = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} □ dx   (trous : sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx)   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t, t)·(t)′ =  [juge equiv]  départ : sin(t²)/t·1
    = sin(□)/t   (trous : sin(t²)/t)   ← Simplifier
  — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : sin(t³)/t²·2t
    = 2sin(□)/t   (trous : 2sin(t³)/t)   ← Simplifier
  — Intégrale : ∫ de t² à t de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
    = ∫_{t²}^{t} cos(tx) dx   ← ∂f/∂t = cos(tx)
    = [□]_{t²}^{t}   (trous : [sin(tx)/t]_{t²}^{t})   ← Primitive en x
    = (sin(t²) − sin(t³))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : sin(t²)/t − 2sin(t³)/t + (sin(t²) − sin(t³))/t
    = (2sin(t²) − 3sin(t³))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t, t)·(t)′ = sin(t²)/t·1 ; ∂f/∂t = cos(tx). | F′(t) = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t²}^{t} sin(tx)/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫ ∂f/∂t dx.
  [guided]  d/dt (∫_{t²}^{t} sin(tx)/x dx)
    = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} □ dx   (trous : sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx)   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t, t)·(t)′ =  [juge equiv]  départ : sin(t²)/t·1
    = sin(□)/t   (trous : sin(t²)/t)   ← Simplifier
  — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : sin(t³)/t²·2t
    = 2sin(□)/t   (trous : 2sin(t³)/t)   ← Simplifier
  — Intégrale : ∫ de t² à t de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
    = ∫_{t²}^{t} cos(tx) dx   ← ∂f/∂t = cos(tx)
    = [□]_{t²}^{t}   (trous : [sin(tx)/t]_{t²}^{t})   ← Primitive en x
    = (sin(t²) − sin(t³))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : sin(t²)/t − 2sin(t³)/t + (sin(t²) − sin(t³))/t
    = (2sin(t²) − 3sin(t³))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t, t)·(t)′ = sin(t²)/t·1 ; ∂f/∂t = cos(tx). | F′(t) = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t²}^{t³} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫ ∂f/∂t dx.
  [guided]  d/dt (∫_{t²}^{t³} (1 − e^(−tx))/x dx)
    = (1 − e^(−t⁴))/t³·3t² − (1 − e^(−t³))/t²·2t + ∫_{t²}^{t³} □ dx   (trous : (1 − e^(−t⁴))/t³·3t² − (1 − e^(−t³))/t²·2t + ∫_{t²}^{t³} ∂/∂t ((1 − e^(−tx))/x) dx)   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t³, t)·(t³)′ =  [juge equiv]  départ : (1 − e^(−t⁴))/t³·3t²
    = (3 − 3e^(−□))/t   (trous : (3 − 3e^(−t⁴))/t)   ← Simplifier
  — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − e^(−t³))/t²·2t
    = (2 − 2e^(−□))/t   (trous : (2 − 2e^(−t³))/t)   ← Simplifier
  — Intégrale : ∫ de t² à t³ de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t³} ∂/∂t ((1 − e^(−tx))/x) dx
    = ∫_{t²}^{t³} e^(−tx) dx   ← ∂f/∂t = e^(−tx)
    = [□]_{t²}^{t³}   (trous : [−e^(−tx)/t]_{t²}^{t³})   ← Primitive en x
    = (e^(−t³) − e^(−t⁴))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (3 − 3e^(−t⁴))/t − (2 − 2e^(−t³))/t + (e^(−t³) − e^(−t⁴))/t
    = (1 + 3e^(−t³) − 4e^(−t⁴))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t³, t)·(t³)′ = (1 − e^(−t⁴))/t³·3t² ; ∂f/∂t = e^(−tx). | F′(t) = (1 − e^(−t⁴))/t³·3t² − (1 − e^(−t³))/t²·2t + ∫_{t²}^{t³} ∂/∂t ((1 − e^(−tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Niveau 2

```
F(t) = ∫_{t}^{t³} sin(tx)/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [guided]  d/dt (∫_{t}^{t³} sin(tx)/x dx)
    = sin(t⁴)/t³·3t² − sin(t²)/t·1 + ∫_{t}^{t³} ∂/∂t (sin(tx)/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t³, t)·(t³)′ =  [juge equiv]  départ : sin(t⁴)/t³·3t²
    = 3sin(t⁴)/t   ← Simplifier
  — Borne du bas : f(t, t)·(t)′ =  [juge equiv]  départ : sin(t²)/t·1
    = sin(t²)/t   ← Simplifier
  — Intégrale : ∫ de t à t³ de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t}^{t³} ∂/∂t (sin(tx)/x) dx
    = ∫_{t}^{t³} cos(tx) dx   ← ∂f/∂t = cos(tx)
    = [□]_{t}^{t³}   (trous : [sin(tx)/t]_{t}^{t³})   ← Primitive en x
    = (sin(t⁴) − sin(t²))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : 3sin(t⁴)/t − sin(t²)/t + (sin(t⁴) − sin(t²))/t
    = (4sin(t⁴) − 2sin(t²))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t³, t)·(t³)′ = sin(t⁴)/t³·3t² ; ∂f/∂t = cos(tx). | F′(t) = sin(t⁴)/t³·3t² − sin(t²)/t·1 + ∫_{t}^{t³} ∂/∂t (sin(tx)/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t²}^{t³} (1 − cos(tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [guided]  d/dt (∫_{t²}^{t³} (1 − cos(tx))/x dx)
    = (1 − cos(t⁴))/t³·3t² − (1 − cos(t³))/t²·2t + ∫_{t²}^{t³} ∂/∂t ((1 − cos(tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t³, t)·(t³)′ =  [juge equiv]  départ : (1 − cos(t⁴))/t³·3t²
    = (3 − 3cos(t⁴))/t   ← Simplifier
  — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − cos(t³))/t²·2t
    = (2 − 2cos(t³))/t   ← Simplifier
  — Intégrale : ∫ de t² à t³ de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t³} ∂/∂t ((1 − cos(tx))/x) dx
    = ∫_{t²}^{t³} sin(tx) dx   ← ∂f/∂t = sin(tx)
    = [□]_{t²}^{t³}   (trous : [−cos(tx)/t]_{t²}^{t³})   ← Primitive en x
    = (cos(t³) − cos(t⁴))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (3 − 3cos(t⁴))/t − (2 − 2cos(t³))/t + (cos(t³) − cos(t⁴))/t
    = (1 + 3cos(t³) − 4cos(t⁴))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t³, t)·(t³)′ = (1 − cos(t⁴))/t³·3t² ; ∂f/∂t = sin(tx). | F′(t) = (1 − cos(t⁴))/t³·3t² − (1 − cos(t³))/t²·2t + ∫_{t²}^{t³} ∂/∂t ((1 − cos(tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t²}^{t} (1 − cos(tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [guided]  d/dt (∫_{t²}^{t} (1 − cos(tx))/x dx)
    = (1 − cos(t²))/t·1 − (1 − cos(t³))/t²·2t + ∫_{t²}^{t} ∂/∂t ((1 − cos(tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t, t)·(t)′ =  [juge equiv]  départ : (1 − cos(t²))/t·1
    = (1 − cos(t²))/t   ← Simplifier
  — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − cos(t³))/t²·2t
    = (2 − 2cos(t³))/t   ← Simplifier
  — Intégrale : ∫ de t² à t de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t} ∂/∂t ((1 − cos(tx))/x) dx
    = ∫_{t²}^{t} sin(tx) dx   ← ∂f/∂t = sin(tx)
    = [□]_{t²}^{t}   (trous : [−cos(tx)/t]_{t²}^{t})   ← Primitive en x
    = (cos(t³) − cos(t²))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (1 − cos(t²))/t − (2 − 2cos(t³))/t + (cos(t³) − cos(t²))/t
    = (−1 + 3cos(t³) − 2cos(t²))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t, t)·(t)′ = (1 − cos(t²))/t·1 ; ∂f/∂t = sin(tx). | F′(t) = (1 − cos(t²))/t·1 − (1 − cos(t³))/t²·2t + ∫_{t²}^{t} ∂/∂t ((1 − cos(tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Niveau 3

```
F(t) = ∫_{t}^{t²} sin(tx)²/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [tap, suivre l'erreur, menu steps]  d/dt (∫_{t}^{t²} sin(tx)²/x dx)
    = sin(t³)²/t²·2t − sin(t²)²/t·1 + ∫_{t}^{t²} ∂/∂t (sin(tx)²/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t², t)·(t²)′ =  [juge equiv]  départ : sin(t³)²/t²·2t
    = 2sin(t³)²/t   ← Simplifier
  — Borne du bas : f(t, t)·(t)′ =  [juge equiv]  départ : sin(t²)²/t·1
    = sin(t²)²/t   ← Simplifier
  — Intégrale : ∫ de t à t² de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t}^{t²} ∂/∂t (sin(tx)²/x) dx
    = ∫_{t}^{t²} 2sin(tx)cos(tx) dx   ← ∂f/∂t = 2sin(tx)cos(tx)
    = [sin(tx)²/t]_{t}^{t²}   ← Primitive en x
    = (sin(t³)² − sin(t²)²)/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : 2sin(t³)²/t − sin(t²)²/t + (sin(t³)² − sin(t²)²)/t
    = (3sin(t³)² − 2sin(t²)²)/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t², t)·(t²)′ = sin(t³)²/t²·2t ; ∂f/∂t = 2sin(tx)cos(tx). | F′(t) = sin(t³)²/t²·2t − sin(t²)²/t·1 + ∫_{t}^{t²} ∂/∂t (sin(tx)²/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t}^{t²} (1 − cos(tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [tap, suivre l'erreur, menu steps]  d/dt (∫_{t}^{t²} (1 − cos(tx))/x dx)
    = (1 − cos(t³))/t²·2t − (1 − cos(t²))/t·1 + ∫_{t}^{t²} ∂/∂t ((1 − cos(tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − cos(t³))/t²·2t
    = (2 − 2cos(t³))/t   ← Simplifier
  — Borne du bas : f(t, t)·(t)′ =  [juge equiv]  départ : (1 − cos(t²))/t·1
    = (1 − cos(t²))/t   ← Simplifier
  — Intégrale : ∫ de t à t² de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t}^{t²} ∂/∂t ((1 − cos(tx))/x) dx
    = ∫_{t}^{t²} sin(tx) dx   ← ∂f/∂t = sin(tx)
    = [−cos(tx)/t]_{t}^{t²}   ← Primitive en x
    = (cos(t²) − cos(t³))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (2 − 2cos(t³))/t − (1 − cos(t²))/t + (cos(t²) − cos(t³))/t
    = (1 + 2cos(t²) − 3cos(t³))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t², t)·(t²)′ = (1 − cos(t³))/t²·2t ; ∂f/∂t = sin(tx). | F′(t) = (1 − cos(t³))/t²·2t − (1 − cos(t²))/t·1 + ∫_{t}^{t²} ∂/∂t ((1 − cos(tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t}^{t³} (1 − cos(tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [tap, suivre l'erreur, menu steps]  d/dt (∫_{t}^{t³} (1 − cos(tx))/x dx)
    = (1 − cos(t⁴))/t³·3t² − (1 − cos(t²))/t·1 + ∫_{t}^{t³} ∂/∂t ((1 − cos(tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
  — Borne du haut : f(t³, t)·(t³)′ =  [juge equiv]  départ : (1 − cos(t⁴))/t³·3t²
    = (3 − 3cos(t⁴))/t   ← Simplifier
  — Borne du bas : f(t, t)·(t)′ =  [juge equiv]  départ : (1 − cos(t²))/t·1
    = (1 − cos(t²))/t   ← Simplifier
  — Intégrale : ∫ de t à t³ de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t}^{t³} ∂/∂t ((1 − cos(tx))/x) dx
    = ∫_{t}^{t³} sin(tx) dx   ← ∂f/∂t = sin(tx)
    = [−cos(tx)/t]_{t}^{t³}   ← Primitive en x
    = (cos(t²) − cos(t⁴))/t   ← Évaluer entre les bornes
  — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (3 − 3cos(t⁴))/t − (1 − cos(t²))/t + (cos(t²) − cos(t⁴))/t
    = (2 + 2cos(t²) − 4cos(t⁴))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t³, t)·(t³)′ = (1 − cos(t⁴))/t³·3t² ; ∂f/∂t = sin(tx). | F′(t) = (1 − cos(t⁴))/t³·3t² − (1 − cos(t²))/t·1 + ∫_{t}^{t³} ∂/∂t ((1 − cos(tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Niveau 4

```
F(t) = ∫_{t²}^{t} sin(tx)/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [free, suivre l'erreur]  d/dt (∫_{t²}^{t} sin(tx)/x dx)
    ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = sin(tx)/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
    = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx   ← Règle de Leibniz : trois termes
    = sin(t²)/t − 2sin(t³)/t + ∫_{t²}^{t} cos(tx) dx   ← Bornes simplifiées ; ∂f/∂t
    = sin(t²)/t − 2sin(t³)/t + [sin(tx)/t]_{t²}^{t}   ← Primitive en x
    = sin(t²)/t − 2sin(t³)/t + (sin(t²) − sin(t³))/t   ← Évaluer entre les bornes
    = (2sin(t²) − 3sin(t³))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t, t)·(t)′ = sin(t²)/t·1 ; ∂f/∂t = cos(tx). | F′(t) = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t²}^{t} sin(tx)²/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [free, suivre l'erreur]  d/dt (∫_{t²}^{t} sin(tx)²/x dx)
    ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = sin(tx)²/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
    = sin(t²)²/t·1 − sin(t³)²/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)²/x) dx   ← Règle de Leibniz : trois termes
    = sin(t²)²/t − 2sin(t³)²/t + ∫_{t²}^{t} 2sin(tx)cos(tx) dx   ← Bornes simplifiées ; ∂f/∂t
    = sin(t²)²/t − 2sin(t³)²/t + [sin(tx)²/t]_{t²}^{t}   ← Primitive en x
    = sin(t²)²/t − 2sin(t³)²/t + (sin(t²)² − sin(t³)²)/t   ← Évaluer entre les bornes
    = (2sin(t²)² − 3sin(t³)²)/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(t, t)·(t)′ = sin(t²)²/t·1 ; ∂f/∂t = 2sin(tx)cos(tx). | F′(t) = sin(t²)²/t·1 − sin(t³)²/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)²/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

F(t) = ∫_{t}^{2t} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) par la règle de Leibniz.
  [free, suivre l'erreur]  d/dt (∫_{t}^{2t} (1 − e^(−tx))/x dx)
    ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = (1 − e^(−tx))/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
    = (1 − e^(−2t²))/(2t)·2 − (1 − e^(−t²))/t·1 + ∫_{t}^{2t} ∂/∂t ((1 − e^(−tx))/x) dx   ← Règle de Leibniz : trois termes
    = (1 − e^(−2t²))/t − (1 − e^(−t²))/t + ∫_{t}^{2t} e^(−tx) dx   ← Bornes simplifiées ; ∂f/∂t
    = (1 − e^(−2t²))/t − (1 − e^(−t²))/t + [−e^(−tx)/t]_{t}^{2t}   ← Primitive en x
    = (1 − e^(−2t²))/t − (1 − e^(−t²))/t + (e^(−t²) − e^(−2t²))/t   ← Évaluer entre les bornes
    = (2e^(−t²) − 2e^(−2t²))/t   ← Regrouper sur t
  aides : Trois termes : borne du haut, borne du bas (retranchée), et l'intégrale de la dérivée en t. | Borne du haut : f(2t, t)·(2t)′ = (1 − e^(−2t²))/(2t)·2 ; ∂f/∂t = e^(−tx). | F′(t) = (1 − e^(−2t²))/(2t)·2 − (1 − e^(−t²))/t·1 + ∫_{t}^{2t} ∂/∂t ((1 − e^(−tx))/x) dx
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Niveau 5

```
Soit F(t) = ∫_{t²}^{t} sin(tx)/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
  [problème, 8 points]
  partie 1 (Hypothèses et formule : 1 ; Borne du haut : f(t, t)·(t)′ = : 2 ; Borne du bas : f(t², t)·(t²)′ = : 1 ; Intégrale : ∫ de t² à t de ∂f/∂t dx = : 2 ; Somme des trois termes (le terme du bas est retranché) : 1 ; Calcule F′(1) : 1)
  Soit F(t) = ∫_{t²}^{t} sin(tx)/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
    [free, sans aide, suivre l'erreur]  d/dt (∫_{t²}^{t} sin(tx)/x dx)
      ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = sin(tx)/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
      = sin(t²)/t·1 − sin(t³)/t²·2t + ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
    — Borne du haut : f(t, t)·(t)′ =  [juge equiv]  départ : sin(t²)/t·1
      = sin(t²)/t   ← Simplifier
    — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : sin(t³)/t²·2t
      = 2sin(t³)/t   ← Simplifier
    — Intégrale : ∫ de t² à t de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t} ∂/∂t (sin(tx)/x) dx
      = ∫_{t²}^{t} cos(tx) dx   ← ∂f/∂t = cos(tx)
      = [sin(tx)/t]_{t²}^{t}   ← Primitive en x
      = (sin(t²) − sin(t³))/t   ← Évaluer entre les bornes
    — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : sin(t²)/t − 2sin(t³)/t + (sin(t²) − sin(t³))/t
      = (2sin(t²) − 3sin(t³))/t   ← Regrouper sur t
    — Calcule F′(1) :  [juge value]  départ : (2sin(1²) − 3sin(1³))/1
      = −sin(1)   ← t = 1
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

Soit F(t) = ∫_{t²}^{t³} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
  [problème, 8 points]
  partie 1 (Hypothèses et formule : 1 ; Borne du haut : f(t³, t)·(t³)′ = : 2 ; Borne du bas : f(t², t)·(t²)′ = : 1 ; Intégrale : ∫ de t² à t³ de ∂f/∂t dx = : 2 ; Somme des trois termes (le terme du bas est retranché) : 1 ; Calcule F′(1) : 1)
  Soit F(t) = ∫_{t²}^{t³} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
    [free, sans aide, suivre l'erreur]  d/dt (∫_{t²}^{t³} (1 − e^(−tx))/x dx)
      ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = (1 − e^(−tx))/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
      = (1 − e^(−t⁴))/t³·3t² − (1 − e^(−t³))/t²·2t + ∫_{t²}^{t³} ∂/∂t ((1 − e^(−tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
    — Borne du haut : f(t³, t)·(t³)′ =  [juge equiv]  départ : (1 − e^(−t⁴))/t³·3t²
      = (3 − 3e^(−t⁴))/t   ← Simplifier
    — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − e^(−t³))/t²·2t
      = (2 − 2e^(−t³))/t   ← Simplifier
    — Intégrale : ∫ de t² à t³ de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t³} ∂/∂t ((1 − e^(−tx))/x) dx
      = ∫_{t²}^{t³} e^(−tx) dx   ← ∂f/∂t = e^(−tx)
      = [−e^(−tx)/t]_{t²}^{t³}   ← Primitive en x
      = (e^(−t³) − e^(−t⁴))/t   ← Évaluer entre les bornes
    — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (3 − 3e^(−t⁴))/t − (2 − 2e^(−t³))/t + (e^(−t³) − e^(−t⁴))/t
      = (1 + 3e^(−t³) − 4e^(−t⁴))/t   ← Regrouper sur t
    — Calcule F′(1) :  [juge value]  départ : (1 + 3e^(−1³) − 4e^(−1⁴))/1
      = 1 − e^(−1)   ← t = 1
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

Soit F(t) = ∫_{t²}^{t} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
  [problème, 8 points]
  partie 1 (Hypothèses et formule : 1 ; Borne du haut : f(t, t)·(t)′ = : 2 ; Borne du bas : f(t², t)·(t²)′ = : 1 ; Intégrale : ∫ de t² à t de ∂f/∂t dx = : 2 ; Somme des trois termes (le terme du bas est retranché) : 1 ; Calcule F′(1) : 1)
  Soit F(t) = ∫_{t²}^{t} (1 − e^(−tx))/x dx pour t > 0. Calcule F′(t) (hypothèses, formule, puis chaque terme), puis F′(1).
    [free, sans aide, suivre l'erreur]  d/dt (∫_{t²}^{t} (1 − e^(−tx))/x dx)
      ? Peut-on appliquer la règle de Leibniz pour t > 0 ? ✔ Oui : f(x, t) = (1 − e^(−tx))/x et ∂f/∂t sont continues pour x > 0, et les bornes sont dérivables et > 0 / · Non : les bornes dépendent de t
      = (1 − e^(−t²))/t·1 − (1 − e^(−t³))/t²·2t + ∫_{t²}^{t} ∂/∂t ((1 − e^(−tx))/x) dx   ← f(b, t)·b′ − f(a, t)·a′ + ∫ ∂f/∂t dx
    — Borne du haut : f(t, t)·(t)′ =  [juge equiv]  départ : (1 − e^(−t²))/t·1
      = (1 − e^(−t²))/t   ← Simplifier
    — Borne du bas : f(t², t)·(t²)′ =  [juge equiv]  départ : (1 − e^(−t³))/t²·2t
      = (2 − 2e^(−t³))/t   ← Simplifier
    — Intégrale : ∫ de t² à t de ∂f/∂t dx =  [juge equiv]  départ : ∫_{t²}^{t} ∂/∂t ((1 − e^(−tx))/x) dx
      = ∫_{t²}^{t} e^(−tx) dx   ← ∂f/∂t = e^(−tx)
      = [−e^(−tx)/t]_{t²}^{t}   ← Primitive en x
      = (e^(−t³) − e^(−t²))/t   ← Évaluer entre les bornes
    — Somme des trois termes (le terme du bas est retranché) :  [juge equiv]  départ : (1 − e^(−t²))/t − (2 − 2e^(−t³))/t + (e^(−t³) − e^(−t²))/t
      = (−1 + 3e^(−t³) − 2e^(−t²))/t   ← Regrouper sur t
    — Calcule F′(1) :  [juge value]  départ : (−1 + 3e^(−1³) − 2e^(−1²))/1
      = −1 + e^(−1)   ← t = 1
  pièges : g6_chain_forgot, a1_ftc_no_chain, a2_leibniz_wrong_var, a2_leibniz_no_integral, a2_leibniz_sign

```

### Variantes d'examen

```
Soit F(t) = ∫_{t}^{t²} sin(tx)/x dx pour t > 0. Alors F′(t) =
  · sin(t³)/t² + (sin(t³) − 2sin(t²))/t [a1_ftc_no_chain]   · 3sin(t³)/t [a2_leibniz_sign]   ✔ (3sin(t³) − 2sin(t²))/t   · (2sin(t³) − sin(t²))/t [a2_leibniz_no_integral]
  [examen mcq]
  pièges : a2_leibniz_no_integral, a1_ftc_no_chain, a2_leibniz_sign

Vrai ou faux ?
  « Pour tout t ∈ ]0 ; 2], d/dt (∫_{t²}^{t³} sin(tx)²/x dx) = (3sin(t⁴)² − 2sin(t³)²)/t. » → FAUX
    contre-exemple (refute) : t = 2
  [examen tf]
  pièges : a2_leibniz_no_integral

Soit F(t) = ∫_{t²}^{t} (1 − cos(tx))/x dx pour t > 0. F′(1) vaut :
  [free, sans aide, examen coef]  F′
    = −1 + cos(1)   ← F′(t) = (−1 + 3cos(t³) − 2cos(t²))/t
  pièges : a2_leibniz_no_integral, a2_leibniz_sign

```

## Intégrale double sur un rectangle ; symétries (`a2-fubini-rect`, BA2)

_Produit de deux intégrales si f = g(x)·h(y) ; le bon ordre ; impaire sur un domaine symétrique : 0._

### Niveau 1

```
Calcule ID = ∫_{0}^{3} ∫_{0}^{ln(3)} x²·e^y dy dx, l'intégrale de f(x, y) = x²·e^y sur le rectangle [0 ; 3] × [0 ; ln(3)]. Ici f(x, y) = x² · e^y : c'est un produit.
  [guided]  I_D
    = ∫_{0}^{3} x² dx·(∫_{0}^{ln(3)} □ dy)   (trous : ∫_{0}^{3} x² dx·(∫_{0}^{ln(3)} e^y dy))   ← Rectangle et f = g(x)·h(y) : produit
    = [x³/3]_{0}^{3}·([□]_{0}^{ln(3)})   (trous : [x³/3]_{0}^{3}·([e^y]_{0}^{ln(3)}))   ← Primitives
    = 18   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{3} x² dx · ∫_{0}^{ln(3)} e^y dy | = [x³/3]_{0}^{3}·([e^y]_{0}^{ln(3)}) = 18

Calcule ID = ∫_{0}^{π/2} ∫_{0}^{1} sin(2x)·e^(2y) dy dx, l'intégrale de f(x, y) = sin(2x)·e^(2y) sur le rectangle [0 ; π/2] × [0 ; 1]. Ici f(x, y) = sin(2x) · e^(2y) : c'est un produit.
  [guided]  I_D
    = ∫_{0}^{π/2} sin(2x) dx·(∫_{0}^{1} □ dy)   (trous : ∫_{0}^{π/2} sin(2x) dx·(∫_{0}^{1} e^(2y) dy))   ← Rectangle et f = g(x)·h(y) : produit
    = [−cos(2x)/2]_{0}^{π/2}·([□]_{0}^{1})   (trous : [−cos(2x)/2]_{0}^{π/2}·([e^(2y)/2]_{0}^{1}))   ← Primitives
    = e²/2 − 1/2   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{π/2} sin(2x) dx · ∫_{0}^{1} e^(2y) dy | = [−cos(2x)/2]_{0}^{π/2}·([e^(2y)/2]_{0}^{1}) = e²/2 − 1/2

Calcule ID = ∫_{0}^{ln(2)} ∫_{0}^{2} x²·e^y dx dy, l'intégrale de f(x, y) = x²·e^y sur le rectangle [0 ; 2] × [0 ; ln(2)]. Ici f(x, y) = x² · e^y : c'est un produit.
  [guided]  I_D
    = ∫_{0}^{2} x² dx·(∫_{0}^{ln(2)} □ dy)   (trous : ∫_{0}^{2} x² dx·(∫_{0}^{ln(2)} e^y dy))   ← Rectangle et f = g(x)·h(y) : produit
    = [x³/3]_{0}^{2}·([□]_{0}^{ln(2)})   (trous : [x³/3]_{0}^{2}·([e^y]_{0}^{ln(2)}))   ← Primitives
    = 8/3   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{2} x² dx · ∫_{0}^{ln(2)} e^y dy | = [x³/3]_{0}^{2}·([e^y]_{0}^{ln(2)}) = 8/3

```

### Niveau 2

```
Calcule ID = ∫_{0}^{π/4} ∫_{0}^{1} cos(2x)·ye^(y²) dy dx, l'intégrale de f(x, y) = cos(2x)·ye^(y²) sur le rectangle [0 ; π/4] × [0 ; 1].
  [guided]  I_D
    = ∫_{0}^{π/4} □ dx·(∫_{0}^{1} □ dy)   (trous : ∫_{0}^{π/4} cos(2x) dx·(∫_{0}^{1} ye^(y²) dy))   ← Rectangle et f = g(x)·h(y) : produit
    = [□]_{0}^{π/4}·([□]_{0}^{1})   (trous : [sin(2x)/2]_{0}^{π/4}·([e^(y²)/2]_{0}^{1}))   ← Primitives
    = e/4 − 1/4   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{π/4} cos(2x) dx · ∫_{0}^{1} ye^(y²) dy | = [sin(2x)/2]_{0}^{π/4}·([e^(y²)/2]_{0}^{1}) = e/4 − 1/4

Calcule ID = ∫_{0}^{2} ∫_{0}^{2} x²·y dy dx, l'intégrale de f(x, y) = x²·y sur le rectangle [0 ; 2] × [0 ; 2].
  [guided]  I_D
    = ∫_{0}^{2} □ dx·(∫_{0}^{2} □ dy)   (trous : ∫_{0}^{2} x² dx·(∫_{0}^{2} y dy))   ← Rectangle et f = g(x)·h(y) : produit
    = [□]_{0}^{2}·([□]_{0}^{2})   (trous : [x³/3]_{0}^{2}·([y²/2]_{0}^{2}))   ← Primitives
    = 16/3   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{2} x² dx · ∫_{0}^{2} y dy | = [x³/3]_{0}^{2}·([y²/2]_{0}^{2}) = 16/3

Calcule ID = ∫_{0}^{2} ∫_{0}^{1} xe^(xy) dx dy. Le domaine est le rectangle [0 ; 1] × [0 ; 2] : choisis l'ordre qui évite les calculs.
  [guided]  I_D
    ? Dans quel ordre intégrer ? ✔ D'abord en y / ✔ D'abord en x, tel quel
    = ∫_{0}^{1} ∫_{0}^{2} xe^(xy) dy dx   ← Rectangle : on peut intégrer d'abord en y
    = ∫_{0}^{1} □ dx   (trous : ∫_{0}^{1} (e^(2x) − 1) dx)   ← Intégrale en y
    = [e^(2x)/2 − x]_{0}^{1}   ← Primitive
    = e²/2 − 3/2   ← Calculer
  aides : Sur un rectangle, Fubini permet d'intégrer dans l'ordre qu'on veut. L'intégrale de xe^(xy) en x demande une intégration par parties ; en y, c'est immédiat. | = ∫_{0}^{1} ∫_{0}^{2} xe^(xy) dy dx = ∫_{0}^{1} (e^(2x) − 1) dx | = [e^(2x)/2 − x]_{0}^{1} = e²/2 − 3/2

```

### Niveau 3

```
Calcule ID = ∫_{0}^{π} ∫_{0}^{2} x·sin(y) dx dy, l'intégrale de f(x, y) = x·sin(y) sur le rectangle [0 ; 2] × [0 ; π].
  [tap, suivre l'erreur, menu steps]  I_D
    = ∫_{0}^{2} x dx·(∫_{0}^{π} sin(y) dy)   ← Rectangle et f = g(x)·h(y) : produit
    = [x²/2]_{0}^{2}·([−cos(y)]_{0}^{π})   ← Primitives
    = 4   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{2} x dx · ∫_{0}^{π} sin(y) dy | = [x²/2]_{0}^{2}·([−cos(y)]_{0}^{π}) = 4
  pièges : a2_symmetry_wrong

Calcule ID = ∫_{0}^{2} ∫_{0}^{1} ye^(xy) dy dx. Le domaine est le rectangle [0 ; 2] × [0 ; 1] : choisis l'ordre qui évite les calculs.
  [tap, suivre l'erreur, menu steps]  I_D
    ? Dans quel ordre intégrer ? ✔ D'abord en x / ✔ D'abord en y, tel quel
    = ∫_{0}^{1} ∫_{0}^{2} ye^(xy) dx dy   ← Rectangle : on peut intégrer d'abord en x
    = ∫_{0}^{1} (e^(2y) − 1) dy   ← Intégrale en x
    = [e^(2y)/2 − y]_{0}^{1}   ← Primitive
    = e²/2 − 3/2   ← Calculer
  aides : Sur un rectangle, Fubini permet d'intégrer dans l'ordre qu'on veut. L'intégrale de ye^(xy) en y demande une intégration par parties ; en x, c'est immédiat. | = ∫_{0}^{1} ∫_{0}^{2} ye^(xy) dx dy = ∫_{0}^{1} (e^(2y) − 1) dy | = [e^(2y)/2 − y]_{0}^{1} = e²/2 − 3/2

Calcule ID = ∫_{0}^{π/4} ∫_{0}^{1} e^(2x)·cos(2y) dx dy, l'intégrale de f(x, y) = e^(2x)·cos(2y) sur le rectangle [0 ; 1] × [0 ; π/4].
  [tap, suivre l'erreur, menu steps]  I_D
    = ∫_{0}^{1} e^(2x) dx·(∫_{0}^{π/4} cos(2y) dy)   ← Rectangle et f = g(x)·h(y) : produit
    = [e^(2x)/2]_{0}^{1}·([sin(2y)/2]_{0}^{π/4})   ← Primitives
    = e²/4 − 1/4   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{1} e^(2x) dx · ∫_{0}^{π/4} cos(2y) dy | = [e^(2x)/2]_{0}^{1}·([sin(2y)/2]_{0}^{π/4}) = e²/4 − 1/4
  pièges : a2_symmetry_wrong

```

### Niveau 4

```
Calcule ID = ∫_{1}^{e} ∫_{1}^{2} 1/(x·y) dx dy, l'intégrale de f(x, y) = 1/(x·y) sur le rectangle [1 ; 2] × [1 ; e].
  [free, suivre l'erreur]  I_D
    = ∫_{1}^{2} 1/x dx·(∫_{1}^{e} 1/y dy)   ← Rectangle et f = g(x)·h(y) : produit
    = [ln(x)]_{1}^{2}·([ln(y)]_{1}^{e})   ← Primitives
    = ln(2)   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{1}^{2} 1/x dx · ∫_{1}^{e} 1/y dy | = [ln(x)]_{1}^{2}·([ln(y)]_{1}^{e}) = ln(2)

Calcule ID = ∫_{0}^{π/2} ∫_{0}^{1} e^x·sin(2y) dx dy, l'intégrale de f(x, y) = e^x·sin(2y) sur le rectangle [0 ; 1] × [0 ; π/2].
  [free, suivre l'erreur]  I_D
    = ∫_{0}^{1} e^x dx·(∫_{0}^{π/2} sin(2y) dy)   ← Rectangle et f = g(x)·h(y) : produit
    = [e^x]_{0}^{1}·([−cos(2y)/2]_{0}^{π/2})   ← Primitives
    = e − 1   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{1} e^x dx · ∫_{0}^{π/2} sin(2y) dy | = [e^x]_{0}^{1}·([−cos(2y)/2]_{0}^{π/2}) = e − 1

Calcule ID = ∫_{0}^{π/4} ∫_{0}^{π/2} sin(x)·cos(2y) dx dy, l'intégrale de f(x, y) = sin(x)·cos(2y) sur le rectangle [0 ; π/2] × [0 ; π/4].
  [free, suivre l'erreur]  I_D
    = ∫_{0}^{π/2} sin(x) dx·(∫_{0}^{π/4} cos(2y) dy)   ← Rectangle et f = g(x)·h(y) : produit
    = [−cos(x)]_{0}^{π/2}·([sin(2y)/2]_{0}^{π/4})   ← Primitives
    = 1/2   ← Calculer
  aides : f est un produit g(x)·h(y) et le domaine est un rectangle : l'intégrale double est le produit de deux intégrales simples. | = ∫_{0}^{π/2} sin(x) dx · ∫_{0}^{π/4} cos(2y) dy | = [−cos(x)]_{0}^{π/2}·([sin(2y)/2]_{0}^{π/4}) = 1/2

```

### Niveau 5

```
Trois énoncés de symétrie, puis un calcul d'intégrale double.
  [problème, 6 points]
  partie 1 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D 1 + y²x² dx dy = 0, où D = [−c ; c] × [0 ; 2] » → FAUX
      contre-exemple (refute) : c = 1
  partie 2 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D xy dx dy = 0, où D = [0 ; 1] × [−c ; c] » → VRAI
  partie 3 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D x²y dx dy = 0, où D = [0 ; 1] × [0 ; c] » → FAUX
      contre-exemple (refute) : c = 1
  partie 4 (Calcul : 3)
  Calcule ID = ∫_{0}^{1} ∫_{0}^{2} x·e^(2y) dx dy, l'intégrale de f(x, y) = x·e^(2y) sur le rectangle [0 ; 2] × [0 ; 1].
    [free, sans aide, suivre l'erreur]  I_D
      = ∫_{0}^{2} x dx·(∫_{0}^{1} e^(2y) dy)   ← Rectangle et f = g(x)·h(y) : produit
      = [x²/2]_{0}^{2}·([e^(2y)/2]_{0}^{1})   ← Primitives
      = e² − 1   ← Calculer
  pièges : a2_symmetry_wrong

Trois énoncés de symétrie, puis un calcul d'intégrale double.
  [problème, 6 points]
  partie 1 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D y²x dx dy = 0, où D = [−c ; c] × [0 ; 2] » → VRAI
  partie 2 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D y²x dx dy = 0, où D = [0 ; c] × [0 ; 1] » → FAUX
      contre-exemple (refute) : c = 1
  partie 3 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D e^(yx²) dx dy = 0, où D = [−c ; c] × [0 ; 1] » → FAUX
      contre-exemple (refute) : c = 1
  partie 4 (Calcul : 3)
  Calcule ID = ∫_{0}^{π} ∫_{0}^{π} sin(x)·sin(y) dy dx, l'intégrale de f(x, y) = sin(x)·sin(y) sur le rectangle [0 ; π] × [0 ; π].
    [free, sans aide, suivre l'erreur]  I_D
      = ∫_{0}^{π} sin(x) dx·(∫_{0}^{π} sin(y) dy)   ← Rectangle et f = g(x)·h(y) : produit
      = [−cos(x)]_{0}^{π}·([−cos(y)]_{0}^{π})   ← Primitives
      = 4   ← Calculer
  pièges : a2_symmetry_wrong

Trois énoncés de symétrie, puis un calcul d'intégrale double.
  [problème, 6 points]
  partie 1 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D ye^(x²) dx dy = 0, où D = [0 ; 1] × [0 ; c] » → FAUX
      contre-exemple (refute) : c = 1
  partie 2 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D xy dx dy = 0, où D = [−c ; c] × [0 ; 2] » → VRAI
  partie 3 (Symétrie : vrai ou faux ? : 1)
  Vrai ou faux ?
    « Pour tout c > 0 : ∬D e^(xy²) dx dy = 0, où D = [0 ; 2] × [−c ; c] » → FAUX
      contre-exemple (refute) : c = 1
  partie 4 (Calcul : 3)
  Calcule ID = ∫_{0}^{2} ∫_{0}^{1} y·e^x dx dy, l'intégrale de f(x, y) = y·e^x sur le rectangle [0 ; 1] × [0 ; 2].
    [free, sans aide, suivre l'erreur]  I_D
      = ∫_{0}^{1} e^x dx·(∫_{0}^{2} y dy)   ← Rectangle et f = g(x)·h(y) : produit
      = [e^x]_{0}^{1}·([y²/2]_{0}^{2})   ← Primitives
      = 2e − 2   ← Calculer
  pièges : a2_symmetry_wrong

```

### Variantes d'examen

```
Que vaut ∫_{0}^{π/2} ∫_{1}^{2} sin(2x)/y dy dx ?
  · 2ln(2)   · 3/4   · ln(2) + 1   ✔ ln(2)
  [examen mcq]

Vrai ou faux ?
  « Pour tout c > 0 : ∬D y³e^x dx dy = 0, où D = [0 ; 2] × [0 ; c] » → FAUX
    contre-exemple (refute) : c = 1
  [examen tf]
  pièges : a2_symmetry_wrong

```

## Décrire un domaine : types I et II, depuis les polaires (`a2-domain-describe`, BA2)

_x entre deux nombres, y entre deux courbes (type I), ou l'inverse (type II)._

### Niveau 1

```
D est la région bornée par x = y² et x = 3y : D = {(x, y) : x ≥ y², x ≤ 3y}. Les courbes se coupent en y = 0 et y = 3. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [guided]  x ≥ y² ; x ≤ 3y
    = 0 ≤ x ≤ 9 ; □ ≤ y ≤ □   (trous : 0 ≤ x ≤ 9 ; x/3 ≤ y ≤ √x)   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 9 ; x/3 ≤ y ≤ √x
    = 0 ≤ y ≤ 3 ; □ ≤ x ≤ □   (trous : 0 ≤ y ≤ 3 ; y² ≤ x ≤ 3y)   ← Type II
  aides : Dessine les courbes et trouve leurs points d'intersection. Les bornes extérieures sont des nombres. | x va de 0 à … ; y va de … à √x | 0 ≤ x ≤ 9 ; x/3 ≤ y ≤ √x puis 0 ≤ y ≤ 3 ; y² ≤ x ≤ 3y
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par x = y² et x = y : D = {(x, y) : x ≥ y², x ≤ y}. Les courbes se coupent en y = 0 et y = 1. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [guided]  x ≥ y² ; x ≤ y
    = 0 ≤ x ≤ 1 ; □ ≤ y ≤ □   (trous : 0 ≤ x ≤ 1 ; x ≤ y ≤ √x)   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 1 ; x ≤ y ≤ √x
    = 0 ≤ y ≤ 1 ; □ ≤ x ≤ □   (trous : 0 ≤ y ≤ 1 ; y² ≤ x ≤ y)   ← Type II
  aides : Dessine les courbes et trouve leurs points d'intersection. Les bornes extérieures sont des nombres. | x va de 0 à … ; y va de … à √x | 0 ≤ x ≤ 1 ; x ≤ y ≤ √x puis 0 ≤ y ≤ 1 ; y² ≤ x ≤ y
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par le cercle x² + y² = 9 et l'axe Ox (y ≥ 0) : D = {(x, y) : x² + y² ≤ 9, y ≥ 0}. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [guided]  x² + y² ≤ 9 ; y ≥ 0
    = −3 ≤ x ≤ 3 ; □ ≤ y ≤ □   (trous : −3 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²))   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : −3 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²)
    = 0 ≤ y ≤ 3 ; □ ≤ x ≤ □   (trous : 0 ≤ y ≤ 3 ; −√(9 − y²) ≤ x ≤ √(9 − y²))   ← Type II
  aides : Dessine les courbes. Les bornes extérieures sont des nombres. | x va de −3 à … ; y va de … à √(9 − x²) | −3 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²) puis 0 ≤ y ≤ 3 ; −√(9 − y²) ≤ x ≤ √(9 − y²)
  pièges : a2_fubini_outer_var, a2_domain_curve_order

```

### Niveau 2

```
D est la région bornée par les droites y = 0, y = x et x = 1 : D = {(x, y) : y ≥ 0, y ≤ x, x ≤ 1}. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [guided]  y ≥ 0 ; y ≤ x ; x ≤ 1
    ? Pour 0 ≤ x ≤ 1, quelle courbe est en dessous ? ✔ y = 0 / · y = x
    = 0 ≤ x ≤ □ ; 0 ≤ y ≤ □   (trous : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x)   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x
    = 0 ≤ y ≤ □ ; □ ≤ x ≤ 1   (trous : 0 ≤ y ≤ 1 ; y ≤ x ≤ 1)   ← Type II
  aides : Dessine les courbes. Les bornes extérieures sont des nombres. | x va de 0 à … ; y va de … à x | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x puis 0 ≤ y ≤ 1 ; y ≤ x ≤ 1
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par y = x² et y = 4 : D = {(x, y) : y ≥ x², y ≤ 4}. Décris D en type I (x à l'extérieur). D'abord, où les courbes se coupent-elles ? (x² = 4)
  [guided]  x² = 4
    = x = −2 ou x = 2   ← Intersections
  — Décris D en type I : x à l'extérieur.  [juge domain]  départ : y ≥ x² ; y ≤ 4
    ? Pour −2 ≤ x ≤ 2, quelle courbe est en dessous ? ✔ y = x² / · y = 4
    = −2 ≤ x ≤ □ ; x² ≤ y ≤ □   (trous : −2 ≤ x ≤ 2 ; x² ≤ y ≤ 4)   ← Type I
  aides : Dessine les courbes et trouve leurs points d'intersection. Les bornes extérieures sont des nombres. | x va de −2 à … ; y va de … à 4 | −2 ≤ x ≤ 2 ; x² ≤ y ≤ 4
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par y = x² et y = 1 : D = {(x, y) : y ≥ x², y ≤ 1}. Décris D en type I (x à l'extérieur). D'abord, où les courbes se coupent-elles ? (x² = 1)
  [guided]  x² = 1
    = x = −1 ou x = 1   ← Intersections
  — Décris D en type I : x à l'extérieur.  [juge domain]  départ : y ≥ x² ; y ≤ 1
    ? Pour −1 ≤ x ≤ 1, quelle courbe est en dessous ? ✔ y = x² / · y = 1
    = −1 ≤ x ≤ □ ; x² ≤ y ≤ □   (trous : −1 ≤ x ≤ 1 ; x² ≤ y ≤ 1)   ← Type I
  aides : Dessine les courbes et trouve leurs points d'intersection. Les bornes extérieures sont des nombres. | x va de −1 à … ; y va de … à 1 | −1 ≤ x ≤ 1 ; x² ≤ y ≤ 1
  pièges : a2_fubini_outer_var, a2_domain_curve_order

```

### Niveau 3

```
D est la région bornée par le cercle x² + y² = 4 et l'axe Ox (y ≥ 0) : D = {(x, y) : x² + y² ≤ 4, y ≥ 0}. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [tap, suivre l'erreur, menu steps]  x² + y² ≤ 4 ; y ≥ 0
    ? Pour −2 ≤ x ≤ 2, quelle courbe est en dessous ? ✔ y = 0 / · y = √(4 − x²)
    = −2 ≤ x ≤ 2 ; 0 ≤ y ≤ √(4 − x²)   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : −2 ≤ x ≤ 2 ; 0 ≤ y ≤ √(4 − x²)
    = 0 ≤ y ≤ 2 ; −√(4 − y²) ≤ x ≤ √(4 − y²)   ← Type II
  aides : Dessine les courbes. Les bornes extérieures sont des nombres. | x va de −2 à … ; y va de … à √(4 − x²) | −2 ≤ x ≤ 2 ; 0 ≤ y ≤ √(4 − x²) puis 0 ≤ y ≤ 2 ; −√(4 − y²) ≤ x ≤ √(4 − y²)
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par le cercle x² + y² = 9 et les deux axes (x ≥ 0, y ≥ 0) : D = {(x, y) : x² + y² ≤ 9, y ≥ 0, x ≥ 0}. Décris D en type I (x à l'extérieur), puis en type II (y à l'extérieur).
  [tap, suivre l'erreur, menu steps]  x² + y² ≤ 9 ; y ≥ 0 ; x ≥ 0
    ? Pour 0 ≤ x ≤ 3, quelle courbe est en dessous ? ✔ y = 0 / · y = √(9 − x²)
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²)   ← Type I
  — Décris D en type II : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²)
    = 0 ≤ y ≤ 3 ; 0 ≤ x ≤ √(9 − y²)   ← Type II
  aides : Dessine les courbes. Les bornes extérieures sont des nombres. | x va de 0 à … ; y va de … à √(9 − x²) | 0 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²) puis 0 ≤ y ≤ 3 ; 0 ≤ x ≤ √(9 − y²)
  pièges : a2_fubini_outer_var, a2_domain_curve_order

En coordonnées polaires, D̃ = {(r, φ) : 0 ≤ φ ≤ π/4, 0 ≤ r ≤ sin(φ)/cos(φ)²}. Décris le même domaine D en coordonnées cartésiennes, en type I (x à l'extérieur).
  [tap, suivre l'erreur, menu steps]  0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ sin(φ)/cos(φ)²
    = 0 ≤ x ≤ 1 ; x² ≤ y ≤ x   ← Type I
  aides : Écris chaque inégalité avec x = r cos φ et y = r sin φ, puis dessine D. | C'est la région x² ≤ y ≤ x (r cos²φ ≤ sin φ veut dire x² ≤ y, et φ ≤ π/4 veut dire y ≤ x). | 0 ≤ x ≤ 1 ; x² ≤ y ≤ x
  pièges : a2_fubini_outer_var, a2_domain_curve_order

```

### Niveau 4

```
En coordonnées polaires, D̃ = {(r, φ) : 0 ≤ φ ≤ π, 0 ≤ r ≤ 3}. Décris le même domaine D en coordonnées cartésiennes, en type I (x à l'extérieur).
  [free, suivre l'erreur]  0 ≤ φ ≤ π ; 0 ≤ r ≤ 3
    = −3 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²)   ← Type I
  aides : Écris chaque inégalité avec x = r cos φ et y = r sin φ, puis dessine D. | C'est le demi-disque de rayon 3, y ≥ 0. | −3 ≤ x ≤ 3 ; 0 ≤ y ≤ √(9 − x²)
  pièges : a2_fubini_outer_var, a2_domain_curve_order

En coordonnées polaires, D̃ = {(r, φ) : π/4 ≤ φ ≤ π/2, 0 ≤ r ≤ 3/sin(φ)}. Décris le même domaine D en coordonnées cartésiennes, en type I (x à l'extérieur).
  [free, suivre l'erreur]  π/4 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 3/sin(φ)
    = 0 ≤ x ≤ 3 ; x ≤ y ≤ 3   ← Type I
  aides : Écris chaque inégalité avec x = r cos φ et y = r sin φ, puis dessine D. | C'est le triangle 0 ≤ x ≤ y ≤ 3 (r sin φ ≤ 3 veut dire y ≤ 3). | 0 ≤ x ≤ 3 ; x ≤ y ≤ 3
  pièges : a2_fubini_outer_var, a2_domain_curve_order

D est la région bornée par x = √y, x = 0 et y = 4 : D = {(x, y) : x ≥ 0, x ≤ √y, y ≤ 4}. Écris les bornes de D en type II (y à l’extérieur).
  [bornes typeII] → 0 ≤ y ≤ 4 ; 0 ≤ x ≤ √y
  pièges : a2_fubini_outer_var, a2_domain_curve_order

```

### Niveau 5

```
D est la région bornée par les droites y = 0, y = 2x et x = 3. Laquelle de ces écritures est égale à ∫_{0}^{3} ∫_{0}^{2x} (x + y) dy dx ?
  · ∫_{0}^{6} ∫_{3}^{y/2} (x + y) dx dy [a2_domain_curve_order]   ✔ ∫_{0}^{6} ∫_{y/2}^{3} (x + y) dx dy   · ∫_{0}^{3} ∫_{y/2}^{3} (x + y) dx dy   · ∫_{0}^{2x} ∫_{0}^{3} (x + y) dx dy [a2_fubini_outer_var]
  pièges : a2_domain_curve_order, a2_fubini_outer_var

D est la région bornée par les droites x = 0, x = 3y et y = 1. Laquelle de ces écritures est égale à ∫_{0}^{3} ∫_{x/3}^{1} y dy dx ?
  · ∫_{0}^{3} ∫_{0}^{3y} y dx dy   · ∫_{x/3}^{1} ∫_{0}^{3} y dx dy [a2_fubini_outer_var]   ✔ ∫_{0}^{1} ∫_{0}^{3y} y dx dy   · ∫_{0}^{1} ∫_{3y}^{0} y dx dy [a2_domain_curve_order]
  pièges : a2_domain_curve_order, a2_fubini_outer_var

D est la région bornée par les droites x = 0, x = 2y et y = 3. Laquelle de ces écritures est égale à ∫_{0}^{3} ∫_{0}^{2y} xy² dx dy ?
  · ∫_{0}^{3} ∫_{x/2}^{3} xy² dy dx   · ∫_{0}^{6} ∫_{3}^{x/2} xy² dy dx [a2_domain_curve_order]   · ∫_{0}^{3} ∫_{0}^{2x} xy² dy dx [a2_fubini_swap_same]   ✔ ∫_{0}^{6} ∫_{x/2}^{3} xy² dy dx
  pièges : a2_domain_curve_order, a2_fubini_swap_same

```

### Variantes d'examen

```
D est la région bornée par x = y³ et x = y, avec y ≥ 0. Laquelle de ces écritures est égale à ∫_{0}^{1} ∫_{x}^{root(3,x)} x² dy dx ?
  · ∫_{0}^{1} ∫_{y}^{y³} x² dx dy [a2_domain_curve_order]   · ∫_{x}^{root(3,x)} ∫_{0}^{1} x² dx dy [a2_fubini_outer_var]   · ∫_{0}^{1} ∫_{y}^{root(3,y)} x² dx dy [a2_fubini_swap_same]   ✔ ∫_{0}^{1} ∫_{y³}^{y} x² dx dy
  [examen mcq]
  pièges : a2_fubini_outer_var, a2_fubini_swap_same, a2_domain_curve_order

```

## Changer l'ordre d'intégration (`a2-fubini-swap`, BA2)

_Quand l'intégrale intérieure n'a pas de primitive : dessiner D et le décrire dans l'autre ordre._

### Niveau 1

```
Calcule ∫_{0}^{1} ∫_{x}^{1} x²/(1 + y⁴) dy dx. 1/(1 + y⁴) n'a pas de primitive élémentaire : change l'ordre d'intégration. Ici D = {(x, y) : 0 ≤ x ≤ 1, x ≤ y ≤ 1}. Décris D avec y à l'extérieur.
  [guided]  0 ≤ x ≤ 1 ; x ≤ y ≤ 1
    = 0 ≤ y ≤ 1 ; 0 ≤ x ≤ □   (trous : 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y)   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{y} x²/(1 + y⁴) dx dy
    = ∫_{0}^{1} □ dy   (trous : ∫_{0}^{1} y³/(3(1 + y⁴)) dy)   ← Intégrale en x
    = [ln(1 + y⁴)/12]_{0}^{1}   ← Primitive
    = ln(2)/12   ← Calculer
  aides : 1/(1 + y⁴) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 1, x ≤ y ≤ 1}. | y va de 0 à 1 ; x va de 0 à … | 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{1} ∫_{x}^{1} e^(y²) dy dx. e^(y²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Ici D = {(x, y) : 0 ≤ x ≤ 1, x ≤ y ≤ 1}. Décris D avec y à l'extérieur.
  [guided]  0 ≤ x ≤ 1 ; x ≤ y ≤ 1
    = 0 ≤ y ≤ 1 ; 0 ≤ x ≤ □   (trous : 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y)   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{y} e^(y²) dx dy
    = ∫_{0}^{1} □ dy   (trous : ∫_{0}^{1} ye^(y²) dy)   ← Intégrale en x
    = [e^(y²)/2]_{0}^{1}   ← Primitive
    = e/2 − 1/2   ← Calculer
  aides : e^(y²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 1, x ≤ y ≤ 1}. | y va de 0 à 1 ; x va de 0 à … | 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{1} ∫_{x}^{1} 1/(1 + y⁴) dy dx. 1/(1 + y⁴) n'a pas de primitive élémentaire : change l'ordre d'intégration. Ici D = {(x, y) : 0 ≤ x ≤ 1, x ≤ y ≤ 1}. Décris D avec y à l'extérieur.
  [guided]  0 ≤ x ≤ 1 ; x ≤ y ≤ 1
    = 0 ≤ y ≤ 1 ; 0 ≤ x ≤ □   (trous : 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y)   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{y} 1/(1 + y⁴) dx dy
    = ∫_{0}^{1} □ dy   (trous : ∫_{0}^{1} y/(1 + y⁴) dy)   ← Intégrale en x
    = [arctan(y²)/2]_{0}^{1}   ← Primitive
    = π/8   ← Calculer
  aides : 1/(1 + y⁴) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 1, x ≤ y ≤ 1}. | y va de 0 à 1 ; x va de 0 à … | 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

```

### Niveau 2

```
Calcule ∫_{0}^{√(π)} ∫_{x}^{√(π)} sin(y²) dy dx. sin(y²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (x à l'extérieur, comme dans l'intégrale).
  [guided]  ∫_{0}^{√(π)} ∫_{x}^{√(π)} sin(y²) dy dx
    = 0 ≤ x ≤ √(π) ; x ≤ y ≤ √(π)   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ √(π) ; x ≤ y ≤ √(π)
    = 0 ≤ y ≤ □ ; 0 ≤ x ≤ □   (trous : 0 ≤ y ≤ √(π) ; 0 ≤ x ≤ y)   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{√(π)} ∫_{0}^{y} sin(y²) dx dy
    = ∫_{0}^{√(π)} ysin(y²) dy   ← Intégrale en x
    = [□]_{0}^{√(π)}   (trous : [−cos(y²)/2]_{0}^{√(π)})   ← Primitive
    = 1   ← Calculer
  aides : sin(y²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ √(π), x ≤ y ≤ √(π)}. | y va de 0 à √(π) ; x va de 0 à … | 0 ≤ y ≤ √(π) ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{√(π/2)} ∫_{y}^{√(π/2)} cos(x²) dx dy. cos(x²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (y à l'extérieur, comme dans l'intégrale).
  [guided]  ∫_{0}^{√(π/2)} ∫_{y}^{√(π/2)} cos(x²) dx dy
    = 0 ≤ y ≤ √(π/2) ; y ≤ x ≤ √(π/2)   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : x à l'extérieur.  [juge domain]  départ : 0 ≤ y ≤ √(π/2) ; y ≤ x ≤ √(π/2)
    = 0 ≤ x ≤ □ ; 0 ≤ y ≤ □   (trous : 0 ≤ x ≤ √(π/2) ; 0 ≤ y ≤ x)   ← D dans l'autre ordre : x à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{√(π/2)} ∫_{0}^{x} cos(x²) dy dx
    = ∫_{0}^{√(π/2)} xcos(x²) dx   ← Intégrale en y
    = [□]_{0}^{√(π/2)}   (trous : [sin(x²)/2]_{0}^{√(π/2)})   ← Primitive
    = 1/2   ← Calculer
  aides : cos(x²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ y ≤ √(π/2), y ≤ x ≤ √(π/2)}. | x va de 0 à √(π/2) ; y va de 0 à … | 0 ≤ x ≤ √(π/2) ; 0 ≤ y ≤ x
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{1} ∫_{√x}^{1} e^(y³) dy dx. e^(y³) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (x à l'extérieur, comme dans l'intégrale).
  [guided]  ∫_{0}^{1} ∫_{√x}^{1} e^(y³) dy dx
    = 0 ≤ x ≤ 1 ; √x ≤ y ≤ 1   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 1 ; √x ≤ y ≤ 1
    = 0 ≤ y ≤ □ ; 0 ≤ x ≤ □   (trous : 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y²)   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{y²} e^(y³) dx dy
    = ∫_{0}^{1} y²e^(y³) dy   ← Intégrale en x
    = [□]_{0}^{1}   (trous : [e^(y³)/3]_{0}^{1})   ← Primitive
    = e/3 − 1/3   ← Calculer
  aides : e^(y³) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 1, √x ≤ y ≤ 1}. | y va de 0 à 1 ; x va de 0 à … | 0 ≤ y ≤ 1 ; 0 ≤ x ≤ y²
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

```

### Niveau 3

```
Calcule ∫_{0}^{2} ∫_{y/2}^{1} e^(x²) dx dy. e^(x²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (y à l'extérieur, comme dans l'intégrale).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{2} ∫_{y/2}^{1} e^(x²) dx dy
    ? Comment calculer ? · Intégrer tel quel, d'abord en x / ✔ Changer l'ordre d'intégration
    = 0 ≤ y ≤ 2 ; y/2 ≤ x ≤ 1   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : x à l'extérieur.  [juge domain]  départ : 0 ≤ y ≤ 2 ; y/2 ≤ x ≤ 1
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2x   ← D dans l'autre ordre : x à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{2x} e^(x²) dy dx
    = ∫_{0}^{1} 2xe^(x²) dx   ← Intégrale en y
    = [e^(x²)]_{0}^{1}   ← Primitive
    = e − 1   ← Calculer
  aides : e^(x²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ y ≤ 2, y/2 ≤ x ≤ 1}. | x va de 0 à 1 ; y va de 0 à … | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2x
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{2} ∫_{x}^{2} e^(y²) dy dx. e^(y²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (x à l'extérieur, comme dans l'intégrale).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{2} ∫_{x}^{2} e^(y²) dy dx
    ? Comment calculer ? · Intégrer tel quel, d'abord en y / ✔ Changer l'ordre d'intégration
    = 0 ≤ x ≤ 2 ; x ≤ y ≤ 2   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 2 ; x ≤ y ≤ 2
    = 0 ≤ y ≤ 2 ; 0 ≤ x ≤ y   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{y} e^(y²) dx dy
    = ∫_{0}^{2} ye^(y²) dy   ← Intégrale en x
    = [e^(y²)/2]_{0}^{2}   ← Primitive
    = e⁴/2 − 1/2   ← Calculer
  aides : e^(y²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 2, x ≤ y ≤ 2}. | y va de 0 à 2 ; x va de 0 à … | 0 ≤ y ≤ 2 ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{2} ∫_{x}^{2} e^(y²) dy dx. e^(y²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (x à l'extérieur, comme dans l'intégrale).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{2} ∫_{x}^{2} e^(y²) dy dx
    ? Comment calculer ? · Intégrer tel quel, d'abord en y / ✔ Changer l'ordre d'intégration
    = 0 ≤ x ≤ 2 ; x ≤ y ≤ 2   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ 2 ; x ≤ y ≤ 2
    = 0 ≤ y ≤ 2 ; 0 ≤ x ≤ y   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{2} ∫_{0}^{y} e^(y²) dx dy
    = ∫_{0}^{2} ye^(y²) dy   ← Intégrale en x
    = [e^(y²)/2]_{0}^{2}   ← Primitive
    = e⁴/2 − 1/2   ← Calculer
  aides : e^(y²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ 2, x ≤ y ≤ 2}. | y va de 0 à 2 ; x va de 0 à … | 0 ≤ y ≤ 2 ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

```

### Niveau 4

```
Calcule ∫_{0}^{1} ∫_{y}^{1} y³/(1 + x⁵) dx dy. 1/(1 + x⁵) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (y à l'extérieur, comme dans l'intégrale).
  [free, suivre l'erreur]  ∫_{0}^{1} ∫_{y}^{1} y³/(1 + x⁵) dx dy
    = 0 ≤ y ≤ 1 ; y ≤ x ≤ 1   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : x à l'extérieur.  [juge domain]  départ : 0 ≤ y ≤ 1 ; y ≤ x ≤ 1
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x   ← D dans l'autre ordre : x à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{x} y³/(1 + x⁵) dy dx
    = ∫_{0}^{1} x⁴/(4(1 + x⁵)) dx   ← Intégrale en y
    = [ln(1 + x⁵)/20]_{0}^{1}   ← Primitive
    = ln(2)/20   ← Calculer
  aides : 1/(1 + x⁵) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ y ≤ 1, y ≤ x ≤ 1}. | x va de 0 à 1 ; y va de 0 à … | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{√(π/2)} ∫_{x}^{√(π/2)} cos(y²) dy dx. cos(y²) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (x à l'extérieur, comme dans l'intégrale).
  [free, suivre l'erreur]  ∫_{0}^{√(π/2)} ∫_{x}^{√(π/2)} cos(y²) dy dx
    = 0 ≤ x ≤ √(π/2) ; x ≤ y ≤ √(π/2)   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : y à l'extérieur.  [juge domain]  départ : 0 ≤ x ≤ √(π/2) ; x ≤ y ≤ √(π/2)
    = 0 ≤ y ≤ √(π/2) ; 0 ≤ x ≤ y   ← D dans l'autre ordre : y à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{√(π/2)} ∫_{0}^{y} cos(y²) dx dy
    = ∫_{0}^{√(π/2)} ycos(y²) dy   ← Intégrale en x
    = [sin(y²)/2]_{0}^{√(π/2)}   ← Primitive
    = 1/2   ← Calculer
  aides : cos(y²) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ x ≤ √(π/2), x ≤ y ≤ √(π/2)}. | y va de 0 à √(π/2) ; x va de 0 à … | 0 ≤ y ≤ √(π/2) ; 0 ≤ x ≤ y
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

Calcule ∫_{0}^{1} ∫_{y}^{1} y²/(1 + x⁴) dx dy. 1/(1 + x⁴) n'a pas de primitive élémentaire : change l'ordre d'intégration. Écris d'abord D avec ses inégalités (y à l'extérieur, comme dans l'intégrale).
  [free, suivre l'erreur]  ∫_{0}^{1} ∫_{y}^{1} y²/(1 + x⁴) dx dy
    = 0 ≤ y ≤ 1 ; y ≤ x ≤ 1   ← Lire D sur les bornes
  — Décris D dans l'autre ordre : x à l'extérieur.  [juge domain]  départ : 0 ≤ y ≤ 1 ; y ≤ x ≤ 1
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x   ← D dans l'autre ordre : x à l'extérieur
  — Calcule l'intégrale dans le nouvel ordre :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{x} y²/(1 + x⁴) dy dx
    = ∫_{0}^{1} x³/(3(1 + x⁴)) dx   ← Intégrale en y
    = [ln(1 + x⁴)/12]_{0}^{1}   ← Primitive
    = ln(2)/12   ← Calculer
  aides : 1/(1 + x⁴) n'a pas de primitive : change l'ordre. Dessine D = {0 ≤ y ≤ 1, y ≤ x ≤ 1}. | x va de 0 à 1 ; y va de 0 à … | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ x
  pièges : a2_fubini_swap_same, a2_fubini_outer_var

```

### Niveau 5

```
sin(x²) n'a pas de primitive élémentaire. Laquelle de ces écritures est égale à ∫_{0}^{√(π/2)} ∫_{y}^{√(π/2)} sin(x²) dx dy ?
  · ∫_{0}^{√(π/2)} ∫_{x}^{0} sin(x²) dy dx [a2_domain_curve_order]   · ∫_{y}^{√(π/2)} ∫_{0}^{√(π/2)} sin(x²) dy dx [a2_fubini_outer_var]   · ∫_{0}^{√(π/2)} ∫_{x}^{√(π/2)} sin(x²) dy dx [a2_fubini_swap_same]   ✔ ∫_{0}^{√(π/2)} ∫_{0}^{x} sin(x²) dy dx
  pièges : a2_domain_curve_order, a2_fubini_outer_var, a2_fubini_swap_same

cos(x²) n'a pas de primitive élémentaire. Laquelle de ces écritures est égale à ∫_{0}^{√(π/2)} ∫_{y}^{√(π/2)} cos(x²) dx dy ?
  · ∫_{y}^{√(π/2)} ∫_{0}^{√(π/2)} cos(x²) dy dx [a2_fubini_outer_var]   · ∫_{0}^{√(π/2)} ∫_{x}^{√(π/2)} cos(x²) dy dx [a2_fubini_swap_same]   · ∫_{0}^{√(π/2)} ∫_{x}^{0} cos(x²) dy dx [a2_domain_curve_order]   ✔ ∫_{0}^{√(π/2)} ∫_{0}^{x} cos(x²) dy dx
  pièges : a2_domain_curve_order, a2_fubini_swap_same, a2_fubini_outer_var

e^(y³) n'a pas de primitive élémentaire. Laquelle de ces écritures est égale à ∫_{0}^{1} ∫_{√x}^{1} e^(y³) dy dx ?
  · ∫_{√x}^{1} ∫_{0}^{1} e^(y³) dx dy [a2_fubini_outer_var]   ✔ ∫_{0}^{1} ∫_{0}^{y²} e^(y³) dx dy   · ∫_{0}^{1} ∫_{√y}^{1} e^(y³) dx dy [a2_fubini_swap_same]   · ∫_{0}^{1} ∫_{y²}^{0} e^(y³) dx dy [a2_domain_curve_order]
  pièges : a2_fubini_outer_var, a2_domain_curve_order, a2_fubini_swap_same

```

### Variantes d'examen

```
e^(y²) n'a pas de primitive élémentaire. Laquelle de ces écritures est égale à ∫_{0}^{2} ∫_{x}^{2} e^(y²) dy dx ?
  · ∫_{x}^{2} ∫_{0}^{2} e^(y²) dx dy [a2_fubini_outer_var]   ✔ ∫_{0}^{2} ∫_{0}^{y} e^(y²) dx dy   · ∫_{0}^{2} ∫_{y}^{2} e^(y²) dx dy [a2_fubini_swap_same]   · ∫_{0}^{2} ∫_{y}^{0} e^(y²) dx dy [a2_domain_curve_order]
  [examen mcq]
  pièges : a2_domain_curve_order, a2_fubini_outer_var, a2_fubini_swap_same

```

## Intégrales triples par Fubini (`a2-triple-int`, BA2)

_z entre deux surfaces, puis la projection décrite comme en 2D._

### Niveau 1

```
Calcule ID = ∭D z dV, où D est le solide au-dessus du rectangle [0 ; 1] × [0 ; 2] et sous le plan z = 2 + 2x + y : D = {(x, y, z) : 0 ≤ x ≤ 1, 0 ≤ y ≤ 2, z ≥ 0, z ≤ 2 + 2x + y}. Les bornes sont 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 2 + 2x + y.
  [guided]  I_D
    = ∫_{0}^{1} ∫_{0}^{2} □ dy dx   (trous : ∫_{0}^{1} ∫_{0}^{2} (2 + 2x + y)²/2 dy dx)   ← Intégrale en z
    = ∫_{0}^{1} □ dx   (trous : ∫_{0}^{1} (4x² + 12x + 28/3) dx)   ← Intégrale en y
    = 50/3   ← Intégrale en x
  aides : En z : z va de 0 au plan z = 2 + 2x + y ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 2 + 2x + y, puis ∫_{0}^{1} ∫_{0}^{2} (2 + 2x + y)²/2 dy dx | = ∫_{0}^{1} (4x² + 12x + 28/3) dx = 50/3
  pièges : a2_fubini_outer_var

Calcule ID = ∭D z dV, où D est le solide au-dessus du rectangle [0 ; 2] × [0 ; 2] et sous le plan z = 1 + x + y : D = {(x, y, z) : 0 ≤ x ≤ 2, 0 ≤ y ≤ 2, z ≥ 0, z ≤ 1 + x + y}. Les bornes sont 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 1 + x + y.
  [guided]  I_D
    = ∫_{0}^{2} ∫_{0}^{2} □ dy dx   (trous : ∫_{0}^{2} ∫_{0}^{2} (1 + x + y)²/2 dy dx)   ← Intégrale en z
    = ∫_{0}^{2} □ dx   (trous : ∫_{0}^{2} (x² + 4x + 13/3) dx)   ← Intégrale en y
    = 58/3   ← Intégrale en x
  aides : En z : z va de 0 au plan z = 1 + x + y ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 1 + x + y, puis ∫_{0}^{2} ∫_{0}^{2} (1 + x + y)²/2 dy dx | = ∫_{0}^{2} (x² + 4x + 13/3) dx = 58/3
  pièges : a2_fubini_outer_var

Calcule ID = ∭D  dV, où D est le solide au-dessus du rectangle [0 ; 1] × [0 ; 2] et sous le plan z = 1 + 2x + y : D = {(x, y, z) : 0 ≤ x ≤ 1, 0 ≤ y ≤ 2, z ≥ 0, z ≤ 1 + 2x + y}. Les bornes sont 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 1 + 2x + y.
  [guided]  I_D
    = ∫_{0}^{1} ∫_{0}^{2} (1 + 2x + y) dy dx   ← Intégrale en z
    = ∫_{0}^{1} □ dx   (trous : ∫_{0}^{1} (4x + 4) dx)   ← Intégrale en y
    = 6   ← Intégrale en x
  aides : En z : z va de 0 au plan z = 1 + 2x + y ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 2 ; 0 ≤ z ≤ 1 + 2x + y, puis ∫_{0}^{1} ∫_{0}^{2} (1 + 2x + y) dy dx | = ∫_{0}^{1} (4x + 4) dx = 6
  pièges : a2_fubini_outer_var

```

### Niveau 2

```
Calcule ID = ∭D  dV, où D est le tétraèdre x, y, z ≥ 0, x + y + z ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, z ≥ 0, x + y + z ≤ 1}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [guided]  x ≥ 0 ; y ≥ 0 ; z ≥ 0 ; x + y + z ≤ 1
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1 − x ; 0 ≤ z ≤ □   (trous : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1 − x ; 0 ≤ z ≤ 1 − x − y)   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{1} ∫_{0}^{1 − x} ∫_{0}^{1 − x − y} 1 dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{1} ∫_{0}^{1 − x} (1 − x − y) dy dx   ← Intégrale en z
    = ∫_{0}^{1} □ dx   (trous : ∫_{0}^{1} (1 − x)²/2 dx)   ← Intégrale en y
    = 1/6   ← Intégrale en x
  aides : En z : z va du sol au plan x + y + z = 1 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1 − x ; 0 ≤ z ≤ 1 − x − y, puis ∫_{0}^{1} ∫_{0}^{1 − x} (1 − x − y) dy dx | = ∫_{0}^{1} (1 − x)²/2 dx = 1/6
  pièges : a2_fubini_outer_var

Calcule ID = ∭D x dV, où D est le solide au-dessus du rectangle [0 ; 1] × [0 ; 3] et sous le plan z = 3 + y : D = {(x, y, z) : 0 ≤ x ≤ 1, 0 ≤ y ≤ 3, z ≥ 0, z ≤ 3 + y}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [guided]  0 ≤ x ≤ 1 ; 0 ≤ y ≤ 3 ; z ≥ 0 ; z ≤ 3 + y
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 3 ; 0 ≤ z ≤ □   (trous : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 3 ; 0 ≤ z ≤ 3 + y)   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{1} ∫_{0}^{3} ∫_{0}^{3 + y} x dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{1} ∫_{0}^{3} x(3 + y) dy dx   ← Intégrale en z
    = ∫_{0}^{1} □ dx   (trous : ∫_{0}^{1} 27x/2 dx)   ← Intégrale en y
    = 27/4   ← Intégrale en x
  aides : En z : z va de 0 au plan z = 3 + y ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 3 ; 0 ≤ z ≤ 3 + y, puis ∫_{0}^{1} ∫_{0}^{3} x(3 + y) dy dx | = ∫_{0}^{1} 27x/2 dx = 27/4
  pièges : a2_fubini_outer_var

Calcule ID = ∭D z² dV, où D est le prisme de hauteur 3 sur le triangle x, y ≥ 0, x/2 + y/2 ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, x/2 + y/2 ≤ 1, z ≥ 0, z ≤ 3}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [guided]  x ≥ 0 ; y ≥ 0 ; x/2 + y/2 ≤ 1 ; z ≥ 0 ; z ≤ 3
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 − x ; 0 ≤ z ≤ □   (trous : 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 − x ; 0 ≤ z ≤ 3)   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{2} ∫_{0}^{2 − x} ∫_{0}^{3} z² dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{2 − x} 9 dy dx   ← Intégrale en z
    = ∫_{0}^{2} □ dx   (trous : ∫_{0}^{2} 18(1 − x/2) dx)   ← Intégrale en y
    = 18   ← Intégrale en x
  aides : En z : z va de 0 à 3 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 − x ; 0 ≤ z ≤ 3, puis ∫_{0}^{2} ∫_{0}^{2 − x} 9 dy dx | = ∫_{0}^{2} 18(1 − x/2) dx = 18
  pièges : a2_fubini_outer_var

```

### Niveau 3

```
Calcule ID = ∭D y dV, où D est le tétraèdre x, y, z ≥ 0, x + y + z ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, z ≥ 0, x + y + z ≤ 1}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [tap, suivre l'erreur, menu steps]  x ≥ 0 ; y ≥ 0 ; z ≥ 0 ; x + y + z ≤ 1
    ? Quelle variable à l'intérieur ? ✔ z : z va du sol au plan x + y + z = 1 / ✔ x
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1 − x ; 0 ≤ z ≤ 1 − x − y   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{1} ∫_{0}^{1 − x} ∫_{0}^{1 − x − y} y dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{1} ∫_{0}^{1 − x} y(1 − x − y) dy dx   ← Intégrale en z
    = ∫_{0}^{1} (1 − x)³/6 dx   ← Intégrale en y
    = 1/24   ← Intégrale en x
  aides : En z : z va du sol au plan x + y + z = 1 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1 − x ; 0 ≤ z ≤ 1 − x − y, puis ∫_{0}^{1} ∫_{0}^{1 − x} y(1 − x − y) dy dx | = ∫_{0}^{1} (1 − x)³/6 dx = 1/24
  pièges : a2_fubini_outer_var

Calcule ID = ∭D  dV, où D est le solide au-dessus du rectangle [0 ; 2] × [0 ; 3] et sous le plan z = 1 + x : D = {(x, y, z) : 0 ≤ x ≤ 2, 0 ≤ y ≤ 3, z ≥ 0, z ≤ 1 + x}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [tap, suivre l'erreur, menu steps]  0 ≤ x ≤ 2 ; 0 ≤ y ≤ 3 ; z ≥ 0 ; z ≤ 1 + x
    ? Quelle variable à l'intérieur ? ✔ z : z va de 0 au plan z = 1 + x / ✔ x
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 3 ; 0 ≤ z ≤ 1 + x   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{2} ∫_{0}^{3} ∫_{0}^{1 + x} 1 dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{3} (1 + x) dy dx   ← Intégrale en z
    = ∫_{0}^{2} (3x + 3) dx   ← Intégrale en y
    = 12   ← Intégrale en x
  aides : En z : z va de 0 au plan z = 1 + x ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 3 ; 0 ≤ z ≤ 1 + x, puis ∫_{0}^{2} ∫_{0}^{3} (1 + x) dy dx | = ∫_{0}^{2} (3x + 3) dx = 12
  pièges : a2_fubini_outer_var

Calcule ID = ∭D  dV, où D est le tétraèdre x, y, z ≥ 0, x/2 + y + z ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, z ≥ 0, x/2 + y + z ≤ 1}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [tap, suivre l'erreur, menu steps]  x ≥ 0 ; y ≥ 0 ; z ≥ 0 ; x/2 + y + z ≤ 1
    ? Quelle variable à l'intérieur ? ✔ z : z va du sol au plan x/2 + y + z = 1 / ✔ x
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 1 − x/2 ; 0 ≤ z ≤ 1 − x/2 − y   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{2} ∫_{0}^{1 − x/2} ∫_{0}^{1 − x/2 − y} 1 dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{1 − x/2} (1 − x/2 − y) dy dx   ← Intégrale en z
    = ∫_{0}^{2} (1 − x/2)²/2 dx   ← Intégrale en y
    = 1/3   ← Intégrale en x
  aides : En z : z va du sol au plan x/2 + y + z = 1 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 1 − x/2 ; 0 ≤ z ≤ 1 − x/2 − y, puis ∫_{0}^{2} ∫_{0}^{1 − x/2} (1 − x/2 − y) dy dx | = ∫_{0}^{2} (1 − x/2)²/2 dx = 1/3
  pièges : a2_fubini_outer_var

```

### Niveau 4

```
Calcule ID = ∭D xy dV, où D est le prisme de hauteur 2 sur le triangle x, y ≥ 0, x/2 + y/2 ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, x/2 + y/2 ≤ 1, z ≥ 0, z ≤ 2}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [free, suivre l'erreur]  x ≥ 0 ; y ≥ 0 ; x/2 + y/2 ≤ 1 ; z ≥ 0 ; z ≤ 2
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 − x ; 0 ≤ z ≤ 2   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{2} ∫_{0}^{2 − x} ∫_{0}^{2} xy dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{2 − x} 2xy dy dx   ← Intégrale en z
    = ∫_{0}^{2} 4x(1 − x/2)² dx   ← Intégrale en y
    = 4/3   ← Intégrale en x
  aides : En z : z va de 0 à 2 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 2 − x ; 0 ≤ z ≤ 2, puis ∫_{0}^{2} ∫_{0}^{2 − x} 2xy dy dx | = ∫_{0}^{2} 4x(1 − x/2)² dx = 4/3
  pièges : a2_fubini_outer_var

Calcule ID = ∭D x dV, où D est le prisme de hauteur 1 sur le triangle x, y ≥ 0, x/2 + y/3 ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, x/2 + y/3 ≤ 1, z ≥ 0, z ≤ 1}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [free, suivre l'erreur]  x ≥ 0 ; y ≥ 0 ; x/2 + y/3 ≤ 1 ; z ≥ 0 ; z ≤ 1
    = 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 3 − 3x/2 ; 0 ≤ z ≤ 1   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{2} ∫_{0}^{3 − 3x/2} ∫_{0}^{1} x dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{3 − 3x/2} x dy dx   ← Intégrale en z
    = ∫_{0}^{2} 3x(1 − x/2) dx   ← Intégrale en y
    = 2   ← Intégrale en x
  aides : En z : z va de 0 à 1 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 2 ; 0 ≤ y ≤ 3 − 3x/2 ; 0 ≤ z ≤ 1, puis ∫_{0}^{2} ∫_{0}^{3 − 3x/2} x dy dx | = ∫_{0}^{2} 3x(1 − x/2) dx = 2
  pièges : a2_fubini_outer_var

Calcule ID = ∭D z dV, où D est le prisme de hauteur 1 sur le triangle x, y ≥ 0, x/3 + y/3 ≤ 1 : D = {(x, y, z) : x ≥ 0, y ≥ 0, x/3 + y/3 ≤ 1, z ≥ 0, z ≤ 1}. Écris d'abord les bornes : x à l'extérieur, puis y, puis z.
  [free, suivre l'erreur]  x ≥ 0 ; y ≥ 0 ; x/3 + y/3 ≤ 1 ; z ≥ 0 ; z ≤ 1
    = 0 ≤ x ≤ 3 ; 0 ≤ y ≤ 3 − x ; 0 ≤ z ≤ 1   ← z entre deux surfaces ; projection
  — Calcule ID = ∫_{0}^{3} ∫_{0}^{3 − x} ∫_{0}^{1} z dz dy dx, de l'intérieur vers l'extérieur (d'abord en z) :  [juge definite]  départ : I_D
    = ∫_{0}^{3} ∫_{0}^{3 − x} 1/2 dy dx   ← Intégrale en z
    = ∫_{0}^{3} (3/2)(1 − x/3) dx   ← Intégrale en y
    = 9/4   ← Intégrale en x
  aides : En z : z va de 0 à 1 ; ensuite, (x, y) parcourt la projection de D sur le plan (x, y), décrite comme en 2D. | 0 ≤ x ≤ 3 ; 0 ≤ y ≤ 3 − x ; 0 ≤ z ≤ 1, puis ∫_{0}^{3} ∫_{0}^{3 − x} 1/2 dy dx | = ∫_{0}^{3} (3/2)(1 − x/3) dx = 9/4
  pièges : a2_fubini_outer_var

```

### Niveau 5

```
Soit a > 0 et Ta = {(x, y, z) : x, y, z ≥ 0, x + y + z ≤ a}. Que vaut ∭Ta x² dV ?
  ✔ a⁵/60   · a⁶/60   · a⁵/12   · (a − x)⁵/60 [a2_fubini_outer_var]
  pièges : a2_fubini_outer_var

Soit a > 0 et Ta = {(x, y, z) : x, y, z ≥ 0, x + y + z ≤ a}. Que vaut ∭Ta  dV ?
  · a³/12   · a³/2   ✔ a³/6   · (a − x)³/6 [a2_fubini_outer_var]
  pièges : a2_fubini_outer_var

Soit a > 0 et Ta = {(x, y, z) : x, y, z ≥ 0, x + y + z ≤ a}. Que vaut ∭Ta z dV ?
  · (a − x)⁴/24 [a2_fubini_outer_var]   · a⁴/12   ✔ a⁴/24   · a⁵/24
  pièges : a2_fubini_outer_var

```

### Variantes d'examen

```
Soit a > 0 et Ta = {(x, y, z) : x, y, z ≥ 0, x + y + z ≤ a}. Que vaut ∭Ta xyz dV ?
  · a⁵/720   · a⁶/120   ✔ a⁶/720   · (a − x)⁶/720 [a2_fubini_outer_var]
  [examen mcq]
  pièges : a2_fubini_outer_var

```

## Changement de variables et jacobien (`a2-change-var`, BA2)

_D̃ en (u, v), det ∂(u, v)/∂(x, y), puis dx dy = du dv/|det ∂(u, v)/∂(x, y)|._

### Niveau 1

```
Calcule ID = ∬D y/x dx dy, où D = {(x, y) : 1 ≤ xy ≤ 3, x ≤ y ≤ 2x, x > 0}. Pose u = xy, v = y/x : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  1 ≤ xy ≤ 3 ; x ≤ y ≤ 2x ; x > 0
    = 1 ≤ u ≤ □ ; 1 ≤ v ≤ □   (trous : 1 ≤ u ≤ 3 ; 1 ≤ v ≤ 2)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (xy)·∂/∂y (y/x) − ∂/∂y (xy)·∂/∂x (y/x)
    = y·1/x − x·(□)   (trous : y·1/x − x·(−y/x²))   ← Dérivées partielles
    = 2y/x   ← Simplifier
    = 2v   ← Simplifier
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(□)   (trous : 1/(2v))   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{1}^{3} ∫_{1}^{2} □ dv du   (trous : ∫_{1}^{3} ∫_{1}^{2} 1/2 dv du)   ← L'intégrale sur D̃
    = ∫_{1}^{3} 1/2 du·(∫_{1}^{2} 1 dv)   ← Séparer
    = 1   ← Calculer
  aides : Les inégalités de D parlent de xy et de y/x : avec u = xy, v = y/x, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2v, donc dx dy = du dv/|2v| | 1 ≤ u ≤ 3 ; 1 ≤ v ≤ 2 ; I = ∫_{1}^{3} ∫_{1}^{2} 1/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D xy dx dy, où D = {(x, y) : 2 ≤ xy ≤ 3, x ≤ y ≤ 2x, x > 0}. Pose u = xy, v = y/x : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  2 ≤ xy ≤ 3 ; x ≤ y ≤ 2x ; x > 0
    = 2 ≤ u ≤ □ ; 1 ≤ v ≤ □   (trous : 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 2)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (xy)·∂/∂y (y/x) − ∂/∂y (xy)·∂/∂x (y/x)
    = y·1/x − x·(□)   (trous : y·1/x − x·(−y/x²))   ← Dérivées partielles
    = 2y/x   ← Simplifier
    = 2v   ← Simplifier
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(□)   (trous : 1/(2v))   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{2}^{3} ∫_{1}^{2} □ dv du   (trous : ∫_{2}^{3} ∫_{1}^{2} u/(2v) dv du)   ← L'intégrale sur D̃
    = ∫_{2}^{3} u du·(∫_{1}^{2} 1/(2v) dv)   ← Séparer
    = 5ln(2)/4   ← Calculer
  aides : Les inégalités de D parlent de xy et de y/x : avec u = xy, v = y/x, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2v, donc dx dy = du dv/|2v| | 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 2 ; I = ∫_{2}^{3} ∫_{1}^{2} u/(2v) dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D x²y² dx dy, où D = {(x, y) : 1 ≤ xy ≤ 2, x ≤ y ≤ 3x, x > 0}. Pose u = xy, v = y/x : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  1 ≤ xy ≤ 2 ; x ≤ y ≤ 3x ; x > 0
    = 1 ≤ u ≤ □ ; 1 ≤ v ≤ □   (trous : 1 ≤ u ≤ 2 ; 1 ≤ v ≤ 3)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (xy)·∂/∂y (y/x) − ∂/∂y (xy)·∂/∂x (y/x)
    = y·1/x − x·(□)   (trous : y·1/x − x·(−y/x²))   ← Dérivées partielles
    = 2y/x   ← Simplifier
    = 2v   ← Simplifier
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(□)   (trous : 1/(2v))   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{1}^{2} ∫_{1}^{3} □ dv du   (trous : ∫_{1}^{2} ∫_{1}^{3} u²/(2v) dv du)   ← L'intégrale sur D̃
    = ∫_{1}^{2} u² du·(∫_{1}^{3} 1/(2v) dv)   ← Séparer
    = 7ln(3)/6   ← Calculer
  aides : Les inégalités de D parlent de xy et de y/x : avec u = xy, v = y/x, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2v, donc dx dy = du dv/|2v| | 1 ≤ u ≤ 2 ; 1 ≤ v ≤ 3 ; I = ∫_{1}^{2} ∫_{1}^{3} u²/(2v) dv du
  pièges : a2_jacobian_inverse

```

### Niveau 2

```
Calcule ID = ∬D (x + y)(x − y) dx dy, où D = {(x, y) : 1 ≤ x + y ≤ 3, 0 ≤ x − y ≤ 2}. Pose u = x + y, v = x − y : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  1 ≤ x + y ≤ 3 ; 0 ≤ x − y ≤ 2
    = 1 ≤ u ≤ 3 ; □ ≤ v ≤ 2   (trous : 1 ≤ u ≤ 3 ; 0 ≤ v ≤ 2)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (x + y)·∂/∂y (x − y) − ∂/∂y (x + y)·∂/∂x (x − y)
    = −2   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/2   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{1}^{3} ∫_{0}^{2} □ dv du   (trous : ∫_{1}^{3} ∫_{0}^{2} uv/2 dv du)   ← L'intégrale sur D̃
    = ∫_{1}^{3} u/2 du·(∫_{0}^{2} v dv)   ← Séparer
    = 4   ← Calculer
  aides : Les inégalités de D parlent de x + y et de x − y : avec u = x + y, v = x − y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = −2, donc dx dy = du dv/|−2| | 1 ≤ u ≤ 3 ; 0 ≤ v ≤ 2 ; I = ∫_{1}^{3} ∫_{0}^{2} uv/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D  dx dy, où D = {(x, y) : 0 ≤ x − y ≤ 2, 1 ≤ x + y ≤ 3}. Pose u = x − y, v = x + y : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  0 ≤ x − y ≤ 2 ; 1 ≤ x + y ≤ 3
    = 0 ≤ u ≤ 2 ; □ ≤ v ≤ 3   (trous : 0 ≤ u ≤ 2 ; 1 ≤ v ≤ 3)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (x − y)·∂/∂y (x + y) − ∂/∂y (x − y)·∂/∂x (x + y)
    = 2   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/2   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{1}^{3} □ dv du   (trous : ∫_{0}^{2} ∫_{1}^{3} 1/2 dv du)   ← L'intégrale sur D̃
    = ∫_{0}^{2} 1/2 du·(∫_{1}^{3} 1 dv)   ← Séparer
    = 2   ← Calculer
  aides : Les inégalités de D parlent de x − y et de x + y : avec u = x − y, v = x + y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2, donc dx dy = du dv/|2| | 0 ≤ u ≤ 2 ; 1 ≤ v ≤ 3 ; I = ∫_{0}^{2} ∫_{1}^{3} 1/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D x + y dx dy, où D = {(x, y) : −1 ≤ x + 3y ≤ 1, 1 ≤ x + y ≤ 3}. Pose u = x + 3y, v = x + y : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [guided]  −1 ≤ x + 3y ≤ 1 ; 1 ≤ x + y ≤ 3
    = −1 ≤ u ≤ 1 ; □ ≤ v ≤ 3   (trous : −1 ≤ u ≤ 1 ; 1 ≤ v ≤ 3)   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (x + 3y)·∂/∂y (x + y) − ∂/∂y (x + 3y)·∂/∂x (x + y)
    = −2   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/2   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{−1}^{1} ∫_{1}^{3} □ dv du   (trous : ∫_{−1}^{1} ∫_{1}^{3} v/2 dv du)   ← L'intégrale sur D̃
    = ∫_{−1}^{1} 1/2 du·(∫_{1}^{3} v dv)   ← Séparer
    = 4   ← Calculer
  aides : Les inégalités de D parlent de x + 3y et de x + y : avec u = x + 3y, v = x + y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = −2, donc dx dy = du dv/|−2| | −1 ≤ u ≤ 1 ; 1 ≤ v ≤ 3 ; I = ∫_{−1}^{1} ∫_{1}^{3} v/2 dv du
  pièges : a2_jacobian_inverse

```

### Niveau 3

```
Calcule ID = ∬D x² + y² dx dy, où D = {(x, y) : 0 ≤ x² − y² ≤ 2, 1 ≤ xy ≤ 2, x > 0, y > 0}. Choisis un changement de variables (u, v) qui rend D rectangulaire : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [tap, suivre l'erreur, menu steps]  0 ≤ x² − y² ≤ 2 ; 1 ≤ xy ≤ 2 ; x > 0 ; y > 0
    ? Quel changement de variables ? · u = xy, v = y/x / · u = x + y, v = x − y / ✔ u = x² − y², v = xy / · Coordonnées polaires
    = 0 ≤ u ≤ 2 ; 1 ≤ v ≤ 2   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (x² − y²)·∂/∂y (xy) − ∂/∂y (x² − y²)·∂/∂x (xy)
    = 2x² + 2y²   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(2x² + 2y²)   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{1}^{2} 1/2 dv du   ← L'intégrale sur D̃
    = ∫_{0}^{2} 1/2 du·(∫_{1}^{2} 1 dv)   ← Séparer
    = 1   ← Calculer
  aides : Les inégalités de D parlent de x² − y² et de xy : avec u = x² − y², v = xy, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2x² + 2y², donc dx dy = du dv/|2x² + 2y²| | 0 ≤ u ≤ 2 ; 1 ≤ v ≤ 2 ; I = ∫_{0}^{2} ∫_{1}^{2} 1/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D (3x + y)² dx dy, où D = {(x, y) : −1 ≤ 3x + y ≤ 1, −1 ≤ x + y ≤ 0}. Choisis un changement de variables (u, v) qui rend D rectangulaire : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [tap, suivre l'erreur, menu steps]  −1 ≤ 3x + y ≤ 1 ; −1 ≤ x + y ≤ 0
    ? Quel changement de variables ? · u = xy, v = y/x / ✔ u = 3x + y, v = x + y / · u = x² − y², v = xy / · Coordonnées polaires
    = −1 ≤ u ≤ 1 ; −1 ≤ v ≤ 0   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (3x + y)·∂/∂y (x + y) − ∂/∂y (3x + y)·∂/∂x (x + y)
    = 2   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/2   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{−1}^{1} ∫_{−1}^{0} u²/2 dv du   ← L'intégrale sur D̃
    = ∫_{−1}^{1} u²/2 du·(∫_{−1}^{0} 1 dv)   ← Séparer
    = 1/3   ← Calculer
  aides : Les inégalités de D parlent de 3x + y et de x + y : avec u = 3x + y, v = x + y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2, donc dx dy = du dv/|2| | −1 ≤ u ≤ 1 ; −1 ≤ v ≤ 0 ; I = ∫_{−1}^{1} ∫_{−1}^{0} u²/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D x²y² dx dy, où D = {(x, y) : 2 ≤ xy ≤ 3, x ≤ y ≤ 2x, x > 0}. Choisis un changement de variables (u, v) qui rend D rectangulaire : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [tap, suivre l'erreur, menu steps]  2 ≤ xy ≤ 3 ; x ≤ y ≤ 2x ; x > 0
    ? Quel changement de variables ? ✔ u = xy, v = y/x / · u = x + y, v = x − y / · u = x² − y², v = xy / · Coordonnées polaires
    = 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 2   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (xy)·∂/∂y (y/x) − ∂/∂y (xy)·∂/∂x (y/x)
    = y·1/x − x·(−y/x²)   ← Dérivées partielles
    = 2y/x   ← Simplifier
    = 2v   ← Simplifier
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(2v)   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{2}^{3} ∫_{1}^{2} u²/(2v) dv du   ← L'intégrale sur D̃
    = ∫_{2}^{3} u² du·(∫_{1}^{2} 1/(2v) dv)   ← Séparer
    = 19ln(2)/6   ← Calculer
  aides : Les inégalités de D parlent de xy et de y/x : avec u = xy, v = y/x, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2v, donc dx dy = du dv/|2v| | 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 2 ; I = ∫_{2}^{3} ∫_{1}^{2} u²/(2v) dv du
  pièges : a2_jacobian_inverse

```

### Niveau 4

```
Calcule ID = ∬D (x + y)² dx dy, où D = {(x, y) : 1 ≤ 3x + y ≤ 2, 1 ≤ x + y ≤ 3}. Pose u = 3x + y, v = x + y : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [free, suivre l'erreur]  1 ≤ 3x + y ≤ 2 ; 1 ≤ x + y ≤ 3
    = 1 ≤ u ≤ 2 ; 1 ≤ v ≤ 3   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (3x + y)·∂/∂y (x + y) − ∂/∂y (3x + y)·∂/∂x (x + y)
    = 2   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/2   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{1}^{2} ∫_{1}^{3} v²/2 dv du   ← L'intégrale sur D̃
    = ∫_{1}^{2} 1/2 du·(∫_{1}^{3} v² dv)   ← Séparer
    = 13/3   ← Calculer
  aides : Les inégalités de D parlent de 3x + y et de x + y : avec u = 3x + y, v = x + y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2, donc dx dy = du dv/|2| | 1 ≤ u ≤ 2 ; 1 ≤ v ≤ 3 ; I = ∫_{1}^{2} ∫_{1}^{3} v²/2 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D (x + 2y)(x − y) dx dy, où D = {(x, y) : 0 ≤ x + 2y ≤ 2, 0 ≤ x − y ≤ 1}. Pose u = x + 2y, v = x − y : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [free, suivre l'erreur]  0 ≤ x + 2y ≤ 2 ; 0 ≤ x − y ≤ 1
    = 0 ≤ u ≤ 2 ; 0 ≤ v ≤ 1   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (x + 2y)·∂/∂y (x − y) − ∂/∂y (x + 2y)·∂/∂x (x − y)
    = −3   ← Dérivées partielles
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/3   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{0}^{2} ∫_{0}^{1} uv/3 dv du   ← L'intégrale sur D̃
    = ∫_{0}^{2} u/3 du·(∫_{0}^{1} v dv)   ← Séparer
    = 1/3   ← Calculer
  aides : Les inégalités de D parlent de x + 2y et de x − y : avec u = x + 2y, v = x − y, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = −3, donc dx dy = du dv/|−3| | 0 ≤ u ≤ 2 ; 0 ≤ v ≤ 1 ; I = ∫_{0}^{2} ∫_{0}^{1} uv/3 dv du
  pièges : a2_jacobian_inverse

Calcule ID = ∬D y/x dx dy, où D = {(x, y) : 2 ≤ xy ≤ 3, x ≤ y ≤ 3x, x > 0}. Pose u = xy, v = y/x : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.
  [free, suivre l'erreur]  2 ≤ xy ≤ 3 ; x ≤ y ≤ 3x ; x > 0
    = 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 3   ← D̃ : les inégalités de D, avec u et v
  — Le jacobien du changement (u, v) en fonction de (x, y) :  [juge equiv]  départ : ∂/∂x (xy)·∂/∂y (y/x) − ∂/∂y (xy)·∂/∂x (y/x)
    = y·1/x − x·(−y/x²)   ← Dérivées partielles
    = 2y/x   ← Simplifier
    = 2v   ← Simplifier
  — Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :  [juge equiv]  départ : J
    = 1/(2v)   ← |det J_G| = 1/|det ∂(u, v)/∂(x, y)|
  — L'intégrale sur D̃, puis sa valeur :  [juge definite]  départ : I_D
    = ∫_{2}^{3} ∫_{1}^{3} 1/2 dv du   ← L'intégrale sur D̃
    = ∫_{2}^{3} 1/2 du·(∫_{1}^{3} 1 dv)   ← Séparer
    = 1   ← Calculer
  aides : Les inégalités de D parlent de xy et de y/x : avec u = xy, v = y/x, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|. | det ∂(u, v)/∂(x, y) = 2v, donc dx dy = du dv/|2v| | 2 ≤ u ≤ 3 ; 1 ≤ v ≤ 3 ; I = ∫_{2}^{3} ∫_{1}^{3} 1/2 dv du
  pièges : a2_jacobian_inverse

```

### Niveau 5

```
Soit G(u, v) = (u − v ; u + 2v) et D = [0 ; 1] × [−1 ; 1] dans le plan (x, y). Pour écrire ∬D f(x, y) dx dy = ∬D̃ f(G(u, v))·|det J_G| du dv, quel est D̃ ?
  ✔ D̃ = {(u, v) : 0 ≤ u − v ≤ 1, −1 ≤ u + 2v ≤ 1}   · D̃ = {(u, v) : 0 ≤ u ≤ 1, −1 ≤ v ≤ 1}   · D̃ = {(u, v) : 0 ≤ 2u/3 + v/3 ≤ 1, −1 ≤ −u/3 + v/3 ≤ 1} [a2_changevar_domain_direction]   · D̃ = {(u, v) : 0 ≤ u + 2v ≤ 1, −1 ≤ u − v ≤ 1}
  pièges : a2_changevar_domain_direction

Soit G(u, v) = (u + 2v ; 2u + v) et D = [0 ; 2] × [0 ; 1] dans le plan (x, y). Pour écrire ∬D f(x, y) dx dy = ∬D̃ f(G(u, v))·|det J_G| du dv, quel est D̃ ?
  · D̃ = {(u, v) : 0 ≤ −u/3 + 2v/3 ≤ 2, 0 ≤ 2u/3 − v/3 ≤ 1} [a2_changevar_domain_direction]   ✔ D̃ = {(u, v) : 0 ≤ u + 2v ≤ 2, 0 ≤ 2u + v ≤ 1}   · D̃ = {(u, v) : 0 ≤ 2u + v ≤ 2, 0 ≤ u + 2v ≤ 1}   · D̃ = {(u, v) : 0 ≤ u ≤ 2, 0 ≤ v ≤ 1}
  pièges : a2_changevar_domain_direction

Vrai ou faux ?
  « Pour tous réels a, b non nuls, avec G(u, v) = (au ; bv), D̃ = [0 ; 1] × [0 ; 1] et D = G(D̃) : ∬D dx dy = ∬D̃ det J_G du dv. » → FAUX
    contre-exemple (refute) : a = -1, b = 1

```

### Variantes d'examen

```
Soit G(u, v) = (u + 3v ; u + v) et D = [0 ; 1] × [−1 ; 1] dans le plan (x, y). Pour écrire ∬D f(x, y) dx dy = ∬D̃ f(G(u, v))·|det J_G| du dv, quel est D̃ ?
  · D̃ = {(u, v) : 0 ≤ u ≤ 1, −1 ≤ v ≤ 1}   · D̃ = {(u, v) : 0 ≤ −u/2 + 3v/2 ≤ 1, −1 ≤ u/2 − v/2 ≤ 1} [a2_changevar_domain_direction]   ✔ D̃ = {(u, v) : 0 ≤ u + 3v ≤ 1, −1 ≤ u + v ≤ 1}   · D̃ = {(u, v) : 0 ≤ u + v ≤ 1, −1 ≤ u + 3v ≤ 1}
  [examen mcq]
  pièges : a2_changevar_domain_direction

Vrai ou faux ?
  « Pour tous m, n > 0, si G(u, v) = (mu ; nv), l'aire de G(D̃) vaut mn fois l'aire de D̃. » → VRAI
  [examen tf]

```

## Intégrales doubles en coordonnées polaires (`a2-polar-int`, BA2)

_Disques, anneaux, secteurs : bornes en (r, φ), et dx dy = r dr dφ._

### Niveau 1

```
Calcule I = ∬D x² dx dy, avec D = {1 ≤ x² + y² ≤ e² ; 0 ≤ x ≤ y}. En polaires : π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ e.
  [guided]  x²
    = (r·cos(φ))²·□   (trous : (r·cos(φ))²·r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{π/4}^{π/2} ∫_{1}^{e} r³·cos(φ)² dr dφ
    = ∫_{1}^{e} □ dr·(∫_{π/4}^{π/2} cos(φ)² dφ)   (trous : ∫_{1}^{e} r³ dr·(∫_{π/4}^{π/2} cos(φ)² dφ))   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [□]_{1}^{e}·([φ/2 + sin(2φ)/4]_{π/4}^{π/2})   (trous : [r⁴/4]_{1}^{e}·([φ/2 + sin(2φ)/4]_{π/4}^{π/2}))   ← Primitives
    = πe⁴/32 + 1/16 − e⁴/16 − π/32   ← (e⁴/4 − 1/4) · (π/8 − 1/4)
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{π/4}^{π/2} ∫_{1}^{e} r³·cos(φ)² dr dφ, puis sépare en produit. | π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ e et l'intégrande r³·cos(φ)².
  pièges : a2_jacobian_forgot

Calcule I = ∬D √(x² + y²) dx dy, avec D = {4 ≤ x² + y² ≤ 9 ; x ≥ 0}. En polaires : −π/2 ≤ φ ≤ π/2 ; 2 ≤ r ≤ 3.
  [guided]  √(x² + y²)
    = r·□   (trous : r·r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{−π/2}^{π/2} ∫_{2}^{3} r² dr dφ
    = ∫_{2}^{3} □ dr·(∫_{−π/2}^{π/2} 1 dφ)   (trous : ∫_{2}^{3} r² dr·(∫_{−π/2}^{π/2} 1 dφ))   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [□]_{2}^{3}·([φ]_{−π/2}^{π/2})   (trous : [r³/3]_{2}^{3}·([φ]_{−π/2}^{π/2}))   ← Primitives
    = 19π/3   ← 19/3 · π
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{−π/2}^{π/2} ∫_{2}^{3} r² dr dφ, puis sépare en produit. | −π/2 ≤ φ ≤ π/2 ; 2 ≤ r ≤ 3 et l'intégrande r².
  pièges : a2_jacobian_forgot

Calcule I = ∬D (x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ e² ; 0 ≤ y ≤ x}. En polaires : 0 ≤ φ ≤ π/4 ; 1 ≤ r ≤ e.
  [guided]  x² + y²
    = r²·□   (trous : r²·r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/4} ∫_{1}^{e} r³ dr dφ
    = ∫_{1}^{e} □ dr·(∫_{0}^{π/4} 1 dφ)   (trous : ∫_{1}^{e} r³ dr·(∫_{0}^{π/4} 1 dφ))   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [□]_{1}^{e}·([φ]_{0}^{π/4})   (trous : [r⁴/4]_{1}^{e}·([φ]_{0}^{π/4}))   ← Primitives
    = πe⁴/16 − π/16   ← (e⁴/4 − 1/4) · π/4
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{0}^{π/4} ∫_{1}^{e} r³ dr dφ, puis sépare en produit. | 0 ≤ φ ≤ π/4 ; 1 ≤ r ≤ e et l'intégrande r³.
  pièges : a2_jacobian_forgot

```

### Niveau 2

```
Calcule I = ∬D √(x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ e² ; 0 ≤ x ≤ y}.
  [guided]  1 ≤ x² + y² ≤ e² ; 0 ≤ x ≤ y
    = π/4 ≤ φ ≤ □ ; 1 ≤ r ≤ □   (trous : π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ e)   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : √(x² + y²)
    = □   (trous : r²)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{π/4}^{π/2} ∫_{1}^{e} r² dr dφ
    = ∫_{1}^{e} r² dr·(∫_{π/4}^{π/2} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r³/3]_{1}^{e}·([□]_{π/4}^{π/2})   (trous : [r³/3]_{1}^{e}·([φ]_{π/4}^{π/2}))   ← Primitives
    = πe³/12 − π/12   ← (e³/3 − 1/3) · π/4
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{π/4}^{π/2} ∫_{1}^{e} r² dr dφ, puis sépare en produit. | π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ e et l'intégrande r².
  pièges : a2_polar_angle_bounds

Calcule I = ∬D x² dx dy, avec D = {4 ≤ x² + y² ≤ 9 ; x ≤ 0 ; y ≥ 0}.
  [guided]  4 ≤ x² + y² ≤ 9 ; x ≤ 0 ; y ≥ 0
    = π/2 ≤ φ ≤ □ ; 2 ≤ r ≤ □   (trous : π/2 ≤ φ ≤ π ; 2 ≤ r ≤ 3)   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : x²
    = □·cos(φ)²   (trous : r³·cos(φ)²)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{π/2}^{π} ∫_{2}^{3} r³·cos(φ)² dr dφ
    = ∫_{2}^{3} r³ dr·(∫_{π/2}^{π} cos(φ)² dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r⁴/4]_{2}^{3}·([□]_{π/2}^{π})   (trous : [r⁴/4]_{2}^{3}·([φ/2 + sin(2φ)/4]_{π/2}^{π}))   ← Primitives
    = 65π/16   ← 65/4 · π/4
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{π/2}^{π} ∫_{2}^{3} r³·cos(φ)² dr dφ, puis sépare en produit. | π/2 ≤ φ ≤ π ; 2 ≤ r ≤ 3 et l'intégrande r³·cos(φ)².
  pièges : a2_polar_angle_bounds

Calcule I = ∬D √(x² + y²) dx dy, avec D = {x² + y² ≤ e²}.
  [guided]  x² + y² ≤ e²
    = 0 ≤ φ ≤ □ ; 0 ≤ r ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ e)   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : √(x² + y²)
    = □   (trous : r²)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{e} r² dr dφ
    = ∫_{0}^{e} r² dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r³/3]_{0}^{e}·([□]_{0}^{2π})   (trous : [r³/3]_{0}^{e}·([φ]_{0}^{2π}))   ← Primitives
    = 2πe³/3   ← e³/3 · 2π
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{0}^{2π} ∫_{0}^{e} r² dr dφ, puis sépare en produit. | 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ e et l'intégrande r².
  pièges : a2_polar_angle_bounds

```

### Niveau 3

```
Calcule I = ∬D y² dx dy, avec D = {4 ≤ x² + y² ≤ 9 ; x ≥ 0}.
  [tap, suivre l'erreur, menu steps]  4 ≤ x² + y² ≤ 9 ; x ≥ 0
    ? Quelles coordonnées ? ✔ Polaires : D est un morceau de disque ou d'anneau / · Cartésiennes
    = −π/2 ≤ φ ≤ π/2 ; 2 ≤ r ≤ 3   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : y²
    = r³·sin(φ)²   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{−π/2}^{π/2} ∫_{2}^{3} r³·sin(φ)² dr dφ
    = ∫_{2}^{3} r³ dr·(∫_{−π/2}^{π/2} sin(φ)² dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r⁴/4]_{2}^{3}·([φ/2 − sin(2φ)/4]_{−π/2}^{π/2})   ← Primitives
    = 65π/8   ← 65/4 · π/2
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{−π/2}^{π/2} ∫_{2}^{3} r³·sin(φ)² dr dφ, puis sépare en produit. | −π/2 ≤ φ ≤ π/2 ; 2 ≤ r ≤ 3 et l'intégrande r³·sin(φ)².
  pièges : a2_polar_angle_bounds

Calcule I = ∬D e^(−(x² + y²)) dx dy, avec D = {x² + y² ≤ 4 ; 0 ≤ y ≤ x}.
  [tap, suivre l'erreur, menu steps]  x² + y² ≤ 4 ; 0 ≤ y ≤ x
    ? Quelles coordonnées ? ✔ Polaires : D est un morceau de disque ou d'anneau / · Cartésiennes
    = 0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ 2   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : e^(−(x² + y²))
    = r·e^(−r²)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/4} ∫_{0}^{2} r·e^(−r²) dr dφ
    = ∫_{0}^{2} r·e^(−r²) dr·(∫_{0}^{π/4} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [−e^(−r²)/2]_{0}^{2}·([φ]_{0}^{π/4})   ← Primitives
    = π/8 − πe^(−4)/8   ← (1/2 − e^(−4)/2) · π/4
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{0}^{π/4} ∫_{0}^{2} r·e^(−r²) dr dφ, puis sépare en produit. | 0 ≤ φ ≤ π/4 ; 0 ≤ r ≤ 2 et l'intégrande r·e^(−r²).
  pièges : a2_polar_angle_bounds

Calcule I = ∬D √(x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ 9}.
  [tap, suivre l'erreur, menu steps]  1 ≤ x² + y² ≤ 9
    ? Quelles coordonnées ? ✔ Polaires : D est un morceau de disque ou d'anneau / · Cartésiennes
    = 0 ≤ φ ≤ 2π ; 1 ≤ r ≤ 3   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : √(x² + y²)
    = r²   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{1}^{3} r² dr dφ
    = ∫_{1}^{3} r² dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r³/3]_{1}^{3}·([φ]_{0}^{2π})   ← Primitives
    = 52π/3   ← 26/3 · 2π
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{0}^{2π} ∫_{1}^{3} r² dr dφ, puis sépare en produit. | 0 ≤ φ ≤ 2π ; 1 ≤ r ≤ 3 et l'intégrande r².
  pièges : a2_polar_angle_bounds

```

### Niveau 4

```
Calcule I = ∬D x² dx dy, avec D = {1 ≤ x² + y² ≤ 4 ; 0 ≤ x ≤ y}.
  [free, suivre l'erreur]  1 ≤ x² + y² ≤ 4 ; 0 ≤ x ≤ y
    = π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ 2   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : x²
    = r³·cos(φ)²   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{π/4}^{π/2} ∫_{1}^{2} r³·cos(φ)² dr dφ
    = ∫_{1}^{2} r³ dr·(∫_{π/4}^{π/2} cos(φ)² dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r⁴/4]_{1}^{2}·([φ/2 + sin(2φ)/4]_{π/4}^{π/2})   ← Primitives
    = 15π/32 − 15/16   ← 15/4 · (π/8 − 1/4)
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{π/4}^{π/2} ∫_{1}^{2} r³·cos(φ)² dr dφ, puis sépare en produit. | π/4 ≤ φ ≤ π/2 ; 1 ≤ r ≤ 2 et l'intégrande r³·cos(φ)².
  pièges : a2_polar_angle_bounds

Calcule I = ∬D √(x² + y²) dx dy, avec D = {x² + y² ≤ e² ; x ≥ 0}.
  [free, suivre l'erreur]  x² + y² ≤ e² ; x ≥ 0
    = −π/2 ≤ φ ≤ π/2 ; 0 ≤ r ≤ e   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : √(x² + y²)
    = r²   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{−π/2}^{π/2} ∫_{0}^{e} r² dr dφ
    = ∫_{0}^{e} r² dr·(∫_{−π/2}^{π/2} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r³/3]_{0}^{e}·([φ]_{−π/2}^{π/2})   ← Primitives
    = πe³/3   ← e³/3 · π
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{−π/2}^{π/2} ∫_{0}^{e} r² dr dφ, puis sépare en produit. | −π/2 ≤ φ ≤ π/2 ; 0 ≤ r ≤ e et l'intégrande r².
  pièges : a2_polar_angle_bounds

Calcule I = ∬D (x² + y²) dx dy, avec D = {x² + y² ≤ 1 ; x ≥ 0}.
  [free, suivre l'erreur]  x² + y² ≤ 1 ; x ≥ 0
    = −π/2 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 1   ← Rayon entre les cercles, angle entre les demi-droites
  — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : x² + y²
    = r³   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{−π/2}^{π/2} ∫_{0}^{1} r³ dr dφ
    = ∫_{0}^{1} r³ dr·(∫_{−π/2}^{π/2} 1 dφ)   ← Bornes constantes, produit g(r)·h(φ) : produit de deux intégrales
    = [r⁴/4]_{0}^{1}·([φ]_{−π/2}^{π/2})   ← Primitives
    = π/4   ← 1/4 · π
  aides : D est un morceau de disque : passe en polaires, sans oublier r (dx dy = r dr dφ). | ∫_{−π/2}^{π/2} ∫_{0}^{1} r³ dr dφ, puis sépare en produit. | −π/2 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 1 et l'intégrande r³.
  pièges : a2_polar_angle_bounds

```

### Niveau 5

```
Calcule ∬D ln(x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ 9}.
  [problème, 8 points]
  partie 1 (Bornes en (r, φ) : 1,5 ; Écris l'intégrande en polaires, jacobien compris : 1,5 ; Sépare : l'intégrale en φ se calcule tout de suite. : 1 ; Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) : 2 ; Valeur de l'intégrale : 2)
    [free, sans aide, suivre l'erreur]  1 ≤ x² + y² ≤ 9
      = 0 ≤ φ ≤ 2π ; 1 ≤ r ≤ 3   ← Rayon entre les cercles, angle entre les demi-droites
    — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : ln(x² + y²)
      = 2r·ln(r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
    — Sépare : l'intégrale en φ se calcule tout de suite.  [juge equiv]  départ : ∫_{0}^{2π} ∫_{1}^{3} 2r·ln(r) dr dφ
      = 2π·(∫_{1}^{3} 2r·ln(r) dr)   ← ∫ dφ = 2π
    — Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) :  [juge antideriv]  départ : ∫ 2r·ln(r) dr
      = r²·ln(r) − ∫ r dr   ← u = ln r, v = r² : ∫ uv′ = uv − ∫ u′v
      = r²·ln(r) − r²/2 + C   ← Primitive de r
    — Valeur de l'intégrale :  [juge definite]  départ : 2π·([r²·ln(r) − r²/2]_{1}^{3})
      = 18πln(3) − 8π   ← F(R) − F(1)
  pièges : a2_polar_angle_bounds

Calcule ∬D ln(x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ e² ; x ≥ 0 ; y ≥ 0}.
  [problème, 8 points]
  partie 1 (Bornes en (r, φ) : 1,5 ; Écris l'intégrande en polaires, jacobien compris : 1,5 ; Sépare : l'intégrale en φ se calcule tout de suite. : 1 ; Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) : 2 ; Valeur de l'intégrale : 2)
    [free, sans aide, suivre l'erreur]  1 ≤ x² + y² ≤ e² ; x ≥ 0 ; y ≥ 0
      = 0 ≤ φ ≤ π/2 ; 1 ≤ r ≤ e   ← Rayon entre les cercles, angle entre les demi-droites
    — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : ln(x² + y²)
      = 2r·ln(r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
    — Sépare : l'intégrale en φ se calcule tout de suite.  [juge equiv]  départ : ∫_{0}^{π/2} ∫_{1}^{e} 2r·ln(r) dr dφ
      = (π/2)·(∫_{1}^{e} 2r·ln(r) dr)   ← ∫ dφ = π/2
    — Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) :  [juge antideriv]  départ : ∫ 2r·ln(r) dr
      = r²·ln(r) − ∫ r dr   ← u = ln r, v = r² : ∫ uv′ = uv − ∫ u′v
      = r²·ln(r) − r²/2 + C   ← Primitive de r
    — Valeur de l'intégrale :  [juge definite]  départ : (π/2)·([r²·ln(r) − r²/2]_{1}^{e})
      = πe²/4 + π/4   ← F(R) − F(1)
  pièges : a2_polar_angle_bounds

Calcule ∬D ln(x² + y²) dx dy, avec D = {1 ≤ x² + y² ≤ e²}.
  [problème, 8 points]
  partie 1 (Bornes en (r, φ) : 1,5 ; Écris l'intégrande en polaires, jacobien compris : 1,5 ; Sépare : l'intégrale en φ se calcule tout de suite. : 1 ; Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) : 2 ; Valeur de l'intégrale : 2)
    [free, sans aide, suivre l'erreur]  1 ≤ x² + y² ≤ e²
      = 0 ≤ φ ≤ 2π ; 1 ≤ r ≤ e   ← Rayon entre les cercles, angle entre les demi-droites
    — Écris l'intégrande en polaires, jacobien compris :  [juge equiv]  départ : ln(x² + y²)
      = 2r·ln(r)   ← x = r cos φ, y = r sin φ, et dx dy = r dr dφ
    — Sépare : l'intégrale en φ se calcule tout de suite.  [juge equiv]  départ : ∫_{0}^{2π} ∫_{1}^{e} 2r·ln(r) dr dφ
      = 2π·(∫_{1}^{e} 2r·ln(r) dr)   ← ∫ dφ = 2π
    — Primitive de 2r ln r (par parties, u = ln r, v′ = 2r) :  [juge antideriv]  départ : ∫ 2r·ln(r) dr
      = r²·ln(r) − ∫ r dr   ← u = ln r, v = r² : ∫ uv′ = uv − ∫ u′v
      = r²·ln(r) − r²/2 + C   ← Primitive de r
    — Valeur de l'intégrale :  [juge definite]  départ : 2π·([r²·ln(r) − r²/2]_{1}^{e})
      = πe² + π   ← F(R) − F(1)
  pièges : a2_polar_angle_bounds

```

### Variantes d'examen

```
∬D 1 dx dy, avec D = {1 ≤ x² + y² ≤ 4 ; x ≤ 0 ; y ≥ 0}, vaut :
  ✔ 3π/4   · 9π/4 [a2_polar_angle_bounds]   · π/2 [a2_jacobian_forgot]   · 3π/2 [a2_polar_angle_bounds]
  [examen mcq]
  pièges : a2_jacobian_forgot, a2_polar_angle_bounds

```

## Coordonnées cylindriques et sphériques (`a2-cyl-sph`, BA2)

_dV = r dr dφ dz ; dV = r² sin θ dr dθ dφ, θ mesuré depuis l'axe z._

### Niveau 1

```
Calcule ∭D (x² + y²) dV, avec D = {√(x² + y²) ≤ z ≤ 3}. En coordonnées cylindriques.
  [guided]  √(x² + y²) ≤ z ≤ 3
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ □ ; r ≤ z ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; r ≤ z ≤ 3)   ← φ et r décrivent l'ombre de D sur le plan xy, puis z va du bas au haut
  — Écris l'intégrande en cylindriques, jacobien compris :  [juge equiv]  départ : x² + y²
    = r²·□   (trous : r²·r)   ← x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} ∫_{r}^{3} r³ dz dr dφ
    = ∫_{0}^{2π} ∫_{0}^{3} (3r³ − r⁴) dr dφ   ← On intègre d'abord en z, de r à 3
    = ∫_{0}^{3} (3r³ − r⁴) dr·(∫_{0}^{2π} 1 dφ)   ← Plus rien ne dépend de φ : produit
    = [□]_{0}^{3}·([φ]_{0}^{2π})   (trous : [3r⁴/4 − r⁵/5]_{0}^{3}·([φ]_{0}^{2π}))   ← Primitives
    = 243π/10   ← Évaluer
  aides : z entre deux surfaces au-dessus d'un disque : cylindriques, avec dV = r dr dφ dz. | z va de r à 3 ; l'intégrande devient r³. | 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; r ≤ z ≤ 3
  pièges : a2_polar_angle_bounds

Calcule ∭D 1 dV, avec D = {x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}. En coordonnées sphériques (θ depuis l'axe z).
  [guided]  x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)
    = 0 ≤ r ≤ □ ; 0 ≤ θ ≤ □ ; 0 ≤ φ ≤ π/2   (trous : 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2)   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : 1
    = □   (trous : r²·sin(θ))   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{1} r²·sin(θ) dr dθ dφ
    = ∫_{0}^{1} r² dr·(∫_{0}^{π/4} sin(θ) dθ)·(∫_{0}^{π/2} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r³/3]_{0}^{1}·([□]_{0}^{π/4})·([φ]_{0}^{π/2})   (trous : [r³/3]_{0}^{1}·([−cos(θ)]_{0}^{π/4})·([φ]_{0}^{π/2}))   ← Primitives
    = π/6 − √2π/12   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : 0 ≤ θ ≤ π/4 ; l'intégrande devient r²·sin(θ). | 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

Calcule ∭D z dV, avec D = {1 ≤ x² + y² + z² ≤ 4 ; 0 ≤ z ≤ √(x² + y²)}. En coordonnées sphériques (θ depuis l'axe z).
  [guided]  1 ≤ x² + y² + z² ≤ 4 ; 0 ≤ z ≤ √(x² + y²)
    = 1 ≤ r ≤ □ ; π/4 ≤ θ ≤ □ ; 0 ≤ φ ≤ 2π   (trous : 1 ≤ r ≤ 2 ; π/4 ≤ θ ≤ π/2 ; 0 ≤ φ ≤ 2π)   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : z
    = r·cos(θ)·□   (trous : r·cos(θ)·(r²·sin(θ)))   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{π/4}^{π/2} ∫_{1}^{2} r³·cos(θ)·sin(θ) dr dθ dφ
    = ∫_{1}^{2} r³ dr·(∫_{π/4}^{π/2} cos(θ)·sin(θ) dθ)·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{1}^{2}·([□]_{π/4}^{π/2})·([φ]_{0}^{2π})   (trous : [r⁴/4]_{1}^{2}·([sin(θ)²/2]_{π/4}^{π/2})·([φ]_{0}^{2π}))   ← Primitives
    = 15π/8   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : π/4 ≤ θ ≤ π/2 ; l'intégrande devient r³·cos(θ)·sin(θ). | 1 ≤ r ≤ 2 ; π/4 ≤ θ ≤ π/2 ; 0 ≤ φ ≤ 2π
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

```

### Niveau 2

```
Calcule ∭D z dV, avec D = {x² + y² ≤ 1 ; 0 ≤ z ≤ 1}. En coordonnées cylindriques.
  [guided]  x² + y² ≤ 1 ; 0 ≤ z ≤ 1
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; 0 ≤ z ≤ 1   ← φ et r décrivent l'ombre de D sur le plan xy, puis z va du bas au haut
  — Écris l'intégrande en cylindriques, jacobien compris :  [juge equiv]  départ : z
    = z·□   (trous : z·r)   ← x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} ∫_{0}^{1} r·z dz dr dφ
    = ∫_{0}^{1} r dr·(∫_{0}^{2π} 1 dφ)·(∫_{0}^{1} z dz)   ← Bornes constantes : trois intégrales
    = [r²/2]_{0}^{1}·([φ]_{0}^{2π})·([z²/2]_{0}^{1})   ← Primitives
    = π/2   ← Évaluer
  aides : z entre deux surfaces au-dessus d'un disque : cylindriques, avec dV = r dr dφ dz. | z va de 0 à 1 ; l'intégrande devient r·z. | 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; 0 ≤ z ≤ 1
  pièges : a2_polar_angle_bounds

Calcule ∭D z dV, avec D = {1 ≤ x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}. En coordonnées sphériques (θ depuis l'axe z).
  [guided]  1 ≤ x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)
    = 1 ≤ r ≤ 2 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : z
    = r·cos(θ)·□   (trous : r·cos(θ)·(r²·sin(θ)))   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{1}^{2} r³·cos(θ)·sin(θ) dr dθ dφ
    = ∫_{1}^{2} r³ dr·(∫_{0}^{π/4} cos(θ)·sin(θ) dθ)·(∫_{0}^{π/2} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{1}^{2}·([sin(θ)²/2]_{0}^{π/4})·([φ]_{0}^{π/2})   ← Primitives
    = 15π/32   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : 0 ≤ θ ≤ π/4 ; l'intégrande devient r³·cos(θ)·sin(θ). | 1 ≤ r ≤ 2 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

Calcule ∭D √(x² + y² + z²) dV, avec D = {x² + y² + z² ≤ 4 ; z ≤ 0}. En coordonnées sphériques (θ depuis l'axe z).
  [guided]  x² + y² + z² ≤ 4 ; z ≤ 0
    = 0 ≤ r ≤ 2 ; π/2 ≤ θ ≤ π ; 0 ≤ φ ≤ 2π   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : √(x² + y² + z²)
    = r·□   (trous : r·(r²·sin(θ)))   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{π/2}^{π} ∫_{0}^{2} r³·sin(θ) dr dθ dφ
    = ∫_{0}^{2} r³ dr·(∫_{π/2}^{π} sin(θ) dθ)·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{0}^{2}·([−cos(θ)]_{π/2}^{π})·([φ]_{0}^{2π})   ← Primitives
    = 8π   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : π/2 ≤ θ ≤ π ; l'intégrande devient r³·sin(θ). | 0 ≤ r ≤ 2 ; π/2 ≤ θ ≤ π ; 0 ≤ φ ≤ 2π
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

```

### Niveau 3

```
Calcule ∭D (x² + y²) dV, avec D = {z ≥ 0 ; z ≤ 4 − x² − y²}.
  [tap, suivre l'erreur, menu steps]  z ≥ 0 ; z ≤ 4 − x² − y²
    ? Quelles coordonnées ? · Sphériques : boule, coquille, cône depuis l'origine / ✔ Cylindriques : cylindre, paraboloïde, z entre deux surfaces
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; 0 ≤ z ≤ 4 − r²   ← φ et r décrivent l'ombre de D sur le plan xy, puis z va du bas au haut
  — Écris l'intégrande en cylindriques, jacobien compris :  [juge equiv]  départ : x² + y²
    = r³   ← x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} ∫_{0}^{4 − r²} r³ dz dr dφ
    = ∫_{0}^{2π} ∫_{0}^{2} (4r³ − r⁵) dr dφ   ← On intègre d'abord en z, de 0 à 4−r^2
    = ∫_{0}^{2} (4r³ − r⁵) dr·(∫_{0}^{2π} 1 dφ)   ← Plus rien ne dépend de φ : produit
    = [r⁴ − r⁶/6]_{0}^{2}·([φ]_{0}^{2π})   ← Primitives
    = 32π/3   ← Évaluer
  aides : z entre deux surfaces au-dessus d'un disque : cylindriques, avec dV = r dr dφ dz. | z va de 0 à 4 − r² ; l'intégrande devient r³. | 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; 0 ≤ z ≤ 4 − r²
  pièges : a2_polar_angle_bounds

Calcule ∭D z dV, avec D = {x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}.
  [tap, suivre l'erreur, menu steps]  x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)
    ? Quelles coordonnées ? ✔ Sphériques : boule, coquille, cône depuis l'origine / · Cylindriques : cylindre, paraboloïde, z entre deux surfaces
    = 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : z
    = r³·cos(θ)·sin(θ)   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{1} r³·cos(θ)·sin(θ) dr dθ dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π/4} cos(θ)·sin(θ) dθ)·(∫_{0}^{π/2} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{0}^{1}·([sin(θ)²/2]_{0}^{π/4})·([φ]_{0}^{π/2})   ← Primitives
    = π/32   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : 0 ≤ θ ≤ π/4 ; l'intégrande devient r³·cos(θ)·sin(θ). | 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

Calcule ∭D √(x² + y² + z²) dV, avec D = {x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ 0}.
  [tap, suivre l'erreur, menu steps]  x² + y² + z² ≤ 1 ; x ≥ 0 ; y ≥ 0 ; z ≥ 0
    ? Quelles coordonnées ? ✔ Sphériques : boule, coquille, cône depuis l'origine / · Cylindriques : cylindre, paraboloïde, z entre deux surfaces
    = 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/2 ; 0 ≤ φ ≤ π/2   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : √(x² + y² + z²)
    = r³·sin(θ)   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{π/2} ∫_{0}^{1} r³·sin(θ) dr dθ dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π/2} sin(θ) dθ)·(∫_{0}^{π/2} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{0}^{1}·([−cos(θ)]_{0}^{π/2})·([φ]_{0}^{π/2})   ← Primitives
    = π/8   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : 0 ≤ θ ≤ π/2 ; l'intégrande devient r³·sin(θ). | 0 ≤ r ≤ 1 ; 0 ≤ θ ≤ π/2 ; 0 ≤ φ ≤ π/2
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

```

### Niveau 4

```
Calcule ∭D z dV, avec D = {x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}.
  [free, suivre l'erreur]  x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)
    = 0 ≤ r ≤ 2 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2   ← r entre les sphères, θ depuis l'axe z, φ autour de l'axe z
  — Écris l'intégrande en sphériques, jacobien compris :  [juge equiv]  départ : z
    = r³·cos(θ)·sin(θ)   ← x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ ; dV = r² sin θ dr dθ dφ
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{2} r³·cos(θ)·sin(θ) dr dθ dφ
    = ∫_{0}^{2} r³ dr·(∫_{0}^{π/4} cos(θ)·sin(θ) dθ)·(∫_{0}^{π/2} 1 dφ)   ← Bornes constantes et intégrande produit : trois intégrales
    = [r⁴/4]_{0}^{2}·([sin(θ)²/2]_{0}^{π/4})·([φ]_{0}^{π/2})   ← Primitives
    = π/2   ← Évaluer
  aides : Une boule, une coquille ou un cône depuis l'origine : sphériques, avec dV = r² sin θ dr dθ dφ. | θ part de l'axe z : 0 ≤ θ ≤ π/4 ; l'intégrande devient r³·cos(θ)·sin(θ). | 0 ≤ r ≤ 2 ; 0 ≤ θ ≤ π/4 ; 0 ≤ φ ≤ π/2
  pièges : a2_polar_angle_bounds, a2_sph_theta_from_plane

Calcule ∭D 1 dV, avec D = {x² + y² ≤ 1 ; 0 ≤ z ≤ 2 ; x ≥ 0 ; y ≥ 0}.
  [free, suivre l'erreur]  x² + y² ≤ 1 ; 0 ≤ z ≤ 2 ; x ≥ 0 ; y ≥ 0
    = 0 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 1 ; 0 ≤ z ≤ 2   ← φ et r décrivent l'ombre de D sur le plan xy, puis z va du bas au haut
  — Écris l'intégrande en cylindriques, jacobien compris :  [juge equiv]  départ : 1
    = r   ← x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{1} ∫_{0}^{2} r dz dr dφ
    = ∫_{0}^{1} r dr·(∫_{0}^{π/2} 1 dφ)·(∫_{0}^{2} 1 dz)   ← Bornes constantes : trois intégrales
    = [r²/2]_{0}^{1}·([φ]_{0}^{π/2})·([z]_{0}^{2})   ← Primitives
    = π/2   ← Évaluer
  aides : z entre deux surfaces au-dessus d'un disque : cylindriques, avec dV = r dr dφ dz. | z va de 0 à 2 ; l'intégrande devient r. | 0 ≤ φ ≤ π/2 ; 0 ≤ r ≤ 1 ; 0 ≤ z ≤ 2
  pièges : a2_polar_angle_bounds

Calcule ∭D z dV, avec D = {z ≥ 0 ; z ≤ 9 − x² − y²}.
  [free, suivre l'erreur]  z ≥ 0 ; z ≤ 9 − x² − y²
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; 0 ≤ z ≤ 9 − r²   ← φ et r décrivent l'ombre de D sur le plan xy, puis z va du bas au haut
  — Écris l'intégrande en cylindriques, jacobien compris :  [juge equiv]  départ : z
    = r·z   ← x = r cos φ, y = r sin φ, z = z ; dV = r dr dφ dz
  — Calcule l'intégrale :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} ∫_{0}^{9 − r²} r·z dz dr dφ
    = ∫_{0}^{2π} ∫_{0}^{3} (81r/2 − 9r³ + r⁵/2) dr dφ   ← On intègre d'abord en z, de 0 à 9−r^2
    = ∫_{0}^{3} (81r/2 − 9r³ + r⁵/2) dr·(∫_{0}^{2π} 1 dφ)   ← Plus rien ne dépend de φ : produit
    = [81r²/4 − 9r⁴/4 + r⁶/12]_{0}^{3}·([φ]_{0}^{2π})   ← Primitives
    = 243π/2   ← Évaluer
  aides : z entre deux surfaces au-dessus d'un disque : cylindriques, avec dV = r dr dφ dz. | z va de 0 à 9 − r² ; l'intégrande devient r·z. | 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; 0 ≤ z ≤ 9 − r²
  pièges : a2_polar_angle_bounds

```

### Niveau 5

```
Soit D = {1 ≤ x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}. En sphériques (θ mesuré depuis l'axe z), ∭D (x² + y²) dV est égale à :
  · ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{1}^{2} r⁴·cos(θ)³ dr dθ dφ [a2_sph_theta_from_plane]   · ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{1}^{2} r³·sin(θ)² dr dθ dφ [a2_jacobian_forgot]   ✔ ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{1}^{2} r⁴·sin(θ)³ dr dθ dφ   · ∫_{0}^{π} ∫_{0}^{π/4} ∫_{1}^{2} r⁴·sin(θ)³ dr dθ dφ [a2_polar_angle_bounds]
  pièges : a2_jacobian_forgot, a2_polar_angle_bounds, a2_sph_theta_from_plane

Soit D = {x² + y² + z² ≤ 9 ; z ≤ 0}. En sphériques (θ mesuré depuis l'axe z), ∭D (x² + y²) dV est égale à :
  · ∫_{0}^{2π} ∫_{π/2}^{π} ∫_{0}^{3} r³·sin(θ)² dr dθ dφ [a2_jacobian_forgot]   ✔ ∫_{0}^{2π} ∫_{π/2}^{π} ∫_{0}^{3} r⁴·sin(θ)³ dr dθ dφ   · ∫_{0}^{2π} ∫_{π/2}^{π} ∫_{0}^{3} r²·sin(θ)² dr dθ dφ [a2_jacobian_forgot]   · ∫_{0}^{2π} ∫_{π/2}^{π} ∫_{0}^{3} r⁴·cos(θ)³ dr dθ dφ [a2_sph_theta_from_plane]
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Soit D = {x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ √(x² + y²)}. En sphériques (θ mesuré depuis l'axe z), ∭D z² dV est égale à :
  · ∫_{0}^{π/2} ∫_{0}^{π/2} ∫_{0}^{2} r⁴·cos(θ)²·sin(θ) dr dθ dφ [a2_polar_angle_bounds]   ✔ ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{2} r⁴·cos(θ)²·sin(θ) dr dθ dφ   · ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{2} r³·cos(θ)² dr dθ dφ [a2_jacobian_forgot]   · ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{0}^{2} r⁴·sin(θ)²·cos(θ) dr dθ dφ [a2_sph_theta_from_plane]
  pièges : a2_polar_angle_bounds, a2_jacobian_forgot, a2_sph_theta_from_plane

```

### Variantes d'examen

```
Soit D = {1 ≤ x² + y² + z² ≤ 4 ; x ≥ 0 ; y ≥ 0 ; z ≥ 0}. En sphériques (θ mesuré depuis l'axe z), ∭D 1 dV est égale à :
  · ∫_{0}^{π/2} ∫_{0}^{π/2} ∫_{1}^{2} 1 dr dθ dφ [a2_jacobian_forgot]   · ∫_{0}^{π/2} ∫_{0}^{π/4} ∫_{1}^{2} r²·sin(θ) dr dθ dφ [a2_polar_angle_bounds]   ✔ ∫_{0}^{π/2} ∫_{0}^{π/2} ∫_{1}^{2} r²·sin(θ) dr dθ dφ   · ∫_{0}^{π/2} ∫_{0}^{π/2} ∫_{1}^{2} r dr dθ dφ [a2_jacobian_forgot]
  [examen mcq]
  pièges : a2_jacobian_forgot, a2_polar_angle_bounds

Vrai ou faux ? « En sphériques, le cône z ≥ √(x² + y²) devient 0 ≤ θ ≤ π/4. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Intégrales impropres sur ℝ² et ℝ³ ; intégrale de Gauss (`a2-improper-multi`, BA2)

_Sur la boule B_R, puis R → ∞ ; le seuil de ‖x‖^(−α) est la dimension n._

### Niveau 1

```
Étudie ∫‖x‖ ≥ 1 1/(x² + y²) dx dy (dans ℝ²) : intègre sur la boule B_R, puis fais R → +∞. En polaires, f·r = r^−1.
  [guided]  ∫_{0}^{2π} ∫_{1}^{R} r^(−1) dr dφ
    = 2π·(∫_{1}^{R} r^(−1) dr)   ← Rien ne dépend de φ : ∫₀^{2π} dφ = 2π.
    = 2π·([□]_{1}^{R})   (trous : 2π·([ln(r)]_{1}^{R}))   ← Primitive en r
    = 2π·ln(R)   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 2π·ln(R)
    = □   (trous : ∞)   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur la boule de rayon R en polaires, puis prends la limite. | I = 2π·ln(R) ; reste la limite. | r^−1 ; les angles donnent 2π.

Étudie ∫ℝ³ 1/(1 + x² + y² + z²)² dV : intègre sur la boule B_R, puis fais R → +∞. En sphériques, f·r² sin θ = r²·sin(θ)/(1 + r²)².
  [guided]  4π·(∫_{0}^{R} r²/(1 + r²)² dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([□]_{0}^{R})   (trous : 4π·([(arctan(r) − r/(1 + r²))/2]_{0}^{R}))   ← Primitive en r
    = 2π·(arctan(R) − R/(1 + R²))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 2π·(arctan(R) − R/(1 + R²))
    = □   (trous : π²)   ← R → +∞
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 2π·(arctan(R) − R/(1 + R²)) ; reste la limite. | r²·sin(θ)/(1 + r²)² ; les angles donnent 4π.

Étudie ∫0 < ‖x‖ ≤ 1 1/(x² + y² + z²)² dV (dans ℝ³) : intègre sur ε ≤ ‖x‖ ≤ 1, puis fais ε → 0⁺. En sphériques, f·r² sin θ = r^−2·sin(θ).
  [guided]  4π·(∫_{ε}^{1} r^(−2) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([□]_{ε}^{1})   (trous : 4π·([−r^(−1)]_{ε}^{1}))   ← Primitive en r
    = 4π·(ε^(−1) − 1)   ← Évaluer entre les bornes
  — Fais tendre ε → 0⁺ :  [juge limit]  départ : 4π·(ε^(−1) − 1)
    = □   (trous : ∞)   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur ε ≤ r ≤ 1 en sphériques, puis prends la limite. | I = 4π·(ε^−1 − 1) ; reste la limite. | r^−2·sin(θ) ; les angles donnent 4π.

```

### Niveau 2

```
Étudie ∫ℝ³ √(x² + y² + z²)·e^(−(x² + y² + z²)) dV : intègre sur la boule B_R, puis fais R → +∞.
  [guided]  √(x² + y² + z²)·e^(−(x² + y² + z²))
    = r³·sin(θ)·e^(−r²)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur la boule B_R :  [juge equiv]  départ : 4π·(∫_{0}^{R} r³·e^(−r²) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([−(r² + 1)·e^(−r²)/2]_{0}^{R})   ← Primitive en r
    = 2π·(1 − (1 + R²)·e^(−R²))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 2π·(1 − (1 + R²)·e^(−R²))
    = 2π   ← R → +∞
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 2π·(1 − (1 + R²)·e^(−R²)) ; reste la limite. | r³·sin(θ)·e^(−r²) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Étudie ∫ℝ³ √(x² + y² + z²)·e^(−(x² + y² + z²)) dV : intègre sur la boule B_R, puis fais R → +∞.
  [guided]  √(x² + y² + z²)·e^(−(x² + y² + z²))
    = r³·sin(θ)·e^(−r²)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur la boule B_R :  [juge equiv]  départ : 4π·(∫_{0}^{R} r³·e^(−r²) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([−(r² + 1)·e^(−r²)/2]_{0}^{R})   ← Primitive en r
    = 2π·(1 − (1 + R²)·e^(−R²))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 2π·(1 − (1 + R²)·e^(−R²))
    = 2π   ← R → +∞
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 2π·(1 − (1 + R²)·e^(−R²)) ; reste la limite. | r³·sin(θ)·e^(−r²) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Étudie ∫0 < ‖x‖ ≤ 1 (x² + y²)^(−3/2) dx dy (dans ℝ²) : intègre sur ε ≤ ‖x‖ ≤ 1, puis fais ε → 0⁺.
  [guided]  (x² + y²)^(−3/2)
    ? Avant de calculer : l'intégrale converge-t-elle ? (α = 3, n = 2) · Elle converge / ✔ Elle diverge
    = r^(−2)   ← dx dy = r dr dφ
  — On intègre sur ε ≤ ‖x‖ ≤ 1 :  [juge equiv]  départ : ∫_{0}^{2π} ∫_{ε}^{1} r^(−2) dr dφ
    = 2π·(∫_{ε}^{1} r^(−2) dr)   ← Rien ne dépend de φ : ∫₀^{2π} dφ = 2π.
    = 2π·([−r^(−1)]_{ε}^{1})   ← Primitive en r
    = 2π·(ε^(−1) − 1)   ← Évaluer entre les bornes
  — Fais tendre ε → 0⁺ :  [juge limit]  départ : 2π·(ε^(−1) − 1)
    = ∞   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur ε ≤ r ≤ 1 en polaires, puis prends la limite. | I = 2π·(ε^−1 − 1) ; reste la limite. | r^−2 ; les angles donnent 2π.
  pièges : a2_jacobian_forgot

```

### Niveau 3

```
Étudie ∫‖x‖ ≥ 1 (x² + y²)^(−5/4) dx dy (dans ℝ²) : intègre sur la boule B_R, puis fais R → +∞.
  [tap, suivre l'erreur, menu steps]  (x² + y²)^(−5/4)
    ? Avant de calculer : l'intégrale converge-t-elle ? (α = 5/2, n = 2) ✔ Elle converge / · Elle diverge
    = r^(−3/2)   ← dx dy = r dr dφ
  — On intègre sur la boule B_R privée de B_1 :  [juge equiv]  départ : ∫_{0}^{2π} ∫_{1}^{R} r^(−3/2) dr dφ
    = 2π·(∫_{1}^{R} r^(−3/2) dr)   ← Rien ne dépend de φ : ∫₀^{2π} dφ = 2π.
    = 2π·([−2r^(−1/2)]_{1}^{R})   ← Primitive en r
    = 4π·(1 − R^(−1/2))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 4π·(1 − R^(−1/2))
    = 4π   ← R → +∞
  aides : Intègre sur la boule de rayon R en polaires, puis prends la limite. | I = 4π·(1 − R^(−1/2)) ; reste la limite. | r^(−3/2) ; les angles donnent 2π.
  pièges : a2_jacobian_forgot

Étudie ∫0 < ‖x‖ ≤ 1 (x² + y² + z²)^(−3/2) dV (dans ℝ³) : intègre sur ε ≤ ‖x‖ ≤ 1, puis fais ε → 0⁺.
  [tap, suivre l'erreur, menu steps]  (x² + y² + z²)^(−3/2)
    ? Avant de calculer : l'intégrale converge-t-elle ? (α = 3, n = 3) · Elle converge / ✔ Elle diverge
    = r^(−1)·sin(θ)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur ε ≤ ‖x‖ ≤ 1 (en sphériques) :  [juge equiv]  départ : 4π·(∫_{ε}^{1} r^(−1) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([ln(r)]_{ε}^{1})   ← Primitive en r
    = −4π·ln(ε)   ← Évaluer entre les bornes
  — Fais tendre ε → 0⁺ :  [juge limit]  départ : −4π·ln(ε)
    = ∞   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur ε ≤ r ≤ 1 en sphériques, puis prends la limite. | I = −4π·ln(ε) ; reste la limite. | r^−1·sin(θ) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Étudie ∫‖x‖ ≥ 1 1/(x² + y² + z²)² dV (dans ℝ³) : intègre sur la boule B_R, puis fais R → +∞.
  [tap, suivre l'erreur, menu steps]  1/(x² + y² + z²)²
    ? Avant de calculer : l'intégrale converge-t-elle ? (α = 4, n = 3) ✔ Elle converge / · Elle diverge
    = r^(−2)·sin(θ)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur la boule B_R privée de B_1 :  [juge equiv]  départ : 4π·(∫_{1}^{R} r^(−2) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([−r^(−1)]_{1}^{R})   ← Primitive en r
    = 4π·(1 − R^(−1))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 4π·(1 − R^(−1))
    = 4π   ← R → +∞
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 4π·(1 − R^−1) ; reste la limite. | r^−2·sin(θ) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

```

### Niveau 4

```
Étudie ∫ℝ³ 1/(1 + x² + y² + z²)² dV : intègre sur la boule B_R, puis fais R → +∞.
  [free, suivre l'erreur]  1/(1 + x² + y² + z²)²
    = r²·sin(θ)/(1 + r²)²   ← dV = r² sin θ dr dθ dφ
  — On intègre sur la boule B_R :  [juge equiv]  départ : 4π·(∫_{0}^{R} r²/(1 + r²)² dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([(arctan(r) − r/(1 + r²))/2]_{0}^{R})   ← Primitive en r
    = 2π·(arctan(R) − R/(1 + R²))   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 2π·(arctan(R) − R/(1 + R²))
    = π²   ← R → +∞
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 2π·(arctan(R) − R/(1 + R²)) ; reste la limite. | r²·sin(θ)/(1 + r²)² ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Étudie ∫0 < ‖x‖ ≤ 1 (x² + y² + z²)^(−3/2) dV (dans ℝ³) : intègre sur ε ≤ ‖x‖ ≤ 1, puis fais ε → 0⁺.
  [free, suivre l'erreur]  (x² + y² + z²)^(−3/2)
    = r^(−1)·sin(θ)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur ε ≤ ‖x‖ ≤ 1 (en sphériques) :  [juge equiv]  départ : 4π·(∫_{ε}^{1} r^(−1) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([ln(r)]_{ε}^{1})   ← Primitive en r
    = −4π·ln(ε)   ← Évaluer entre les bornes
  — Fais tendre ε → 0⁺ :  [juge limit]  départ : −4π·ln(ε)
    = ∞   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur ε ≤ r ≤ 1 en sphériques, puis prends la limite. | I = −4π·ln(ε) ; reste la limite. | r^−1·sin(θ) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

Étudie ∫‖x‖ ≥ 1 (x² + y² + z²)^(−3/2) dV (dans ℝ³) : intègre sur la boule B_R, puis fais R → +∞.
  [free, suivre l'erreur]  (x² + y² + z²)^(−3/2)
    = r^(−1)·sin(θ)   ← dV = r² sin θ dr dθ dφ
  — On intègre sur la boule B_R privée de B_1 :  [juge equiv]  départ : 4π·(∫_{1}^{R} r^(−1) dr)
    (Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.)
    = 4π·([ln(r)]_{1}^{R})   ← Primitive en r
    = 4π·ln(R)   ← Évaluer entre les bornes
  — Fais tendre R → +∞ :  [juge limit]  départ : 4π·ln(R)
    = ∞   ← La limite est infinie : l'intégrale diverge.
  aides : Intègre sur la boule de rayon R en sphériques, puis prends la limite. | I = 4π·ln(R) ; reste la limite. | r^−1·sin(θ) ; les angles donnent 4π.
  pièges : a2_jacobian_forgot, a2_sph_theta_from_plane

```

### Niveau 5

```
Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ x² e^(−x²) dx (par parties).
  [free, sans aide]  ∫_{−∞}^{∞} x²·e^(−x²) dx
    = [−x·e^(−x²)/2]_{−∞}^{∞} + (∫_{−∞}^{∞} e^(−x²) dx)/2   ← u = x, v′ = x e^(−x²), v = −e^(−x²)/2
    = √π/2   ← Le crochet est nul ; Gauss
  pièges : a1_ibp_plus, a1_ibp_boundary_term

Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ x² e^(−x²) dx (par parties).
  [free, sans aide]  ∫_{−∞}^{∞} x²·e^(−x²) dx
    = [−x·e^(−x²)/2]_{−∞}^{∞} + (∫_{−∞}^{∞} e^(−x²) dx)/2   ← u = x, v′ = x e^(−x²), v = −e^(−x²)/2
    = √π/2   ← Le crochet est nul ; Gauss
  pièges : a1_ibp_plus, a1_ibp_boundary_term

Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ e^(−x² + 2x) dx.
  [free, sans aide]  ∫_{−∞}^{∞} e^(−x² + 2x) dx
    = e·(∫_{−∞}^{∞} e^(−(x − 1)²) dx)   ← −x² + 2x = 1 − (x − 1)²
    = e·(∫_{−∞}^{∞} e^(−u²) du)   ← u = x − 1
    = e√π   ← Gauss

```

### Variantes d'examen

```
∫‖x‖ ≥ 1 1/√(x² + y²) dx dy (dans ℝ²) :
  · −2π [a2_improper_exponent]   ✔ diverge   · 2π [a2_jacobian_forgot]   · 6π [a2_jacobian_forgot]
  [examen mcq]
  pièges : a2_improper_exponent, a2_jacobian_forgot

Vrai ou faux ? « Dans ℝ², ∫‖x‖ ≥ 1 (x² + y²)^(−5/4) converge. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Volumes (`a2-volume`, BA2)

_Vol = ∬ (dessus − dessous) sur la projection R._

### Niveau 1

```
Calcule le volume du solide compris entre les surfaces z = 28 − (x² + y²) et z = 1 + 2(x² + y²). La projection est le disque R : x² + y² ≤ 9, et z = 28 − (x² + y²) est au-dessus.
  [guided]  27 − 3(x² + y²)
    = (27 − 3r²)·□   (trous : (27 − 3r²)·r)   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} (27 − 3r²)·r dr dφ
    = ∫_{0}^{3} (27 − 3r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [□]_{0}^{3}·([φ]_{0}^{2π})   (trous : [27r²/2 − 3r⁴/4]_{0}^{3}·([φ]_{0}^{2π}))   ← Primitives
    = 243π/2   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 9 ; la hauteur est 27 − 3(x² + y²). | ∫_{0}^{2π} ∫_{0}^{3} (27 − 3r²)·r dr dφ
  pièges : a2_jacobian_forgot, a2_volume_surfaces_swapped

Calcule le volume du solide compris entre les surfaces z = 38 − 2(x² + y²) et z = 2 + 2(x² + y²). La projection est le disque R : x² + y² ≤ 9, et z = 38 − 2(x² + y²) est au-dessus.
  [guided]  36 − 4(x² + y²)
    = (36 − 4r²)·□   (trous : (36 − 4r²)·r)   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} (36 − 4r²)·r dr dφ
    = ∫_{0}^{3} (36 − 4r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [□]_{0}^{3}·([φ]_{0}^{2π})   (trous : [18r² − r⁴]_{0}^{3}·([φ]_{0}^{2π}))   ← Primitives
    = 162π   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 9 ; la hauteur est 36 − 4(x² + y²). | ∫_{0}^{2π} ∫_{0}^{3} (36 − 4r²)·r dr dφ
  pièges : a2_jacobian_forgot, a2_volume_surfaces_swapped

Calcule le volume du solide compris entre les surfaces z = 2 et z = √(x² + y²). La projection est le disque R : x² + y² ≤ 4, et z = 2 est au-dessus.
  [guided]  2 − √(x² + y²)
    = (2 − r)·□   (trous : (2 − r)·r)   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} (2 − r)·r dr dφ
    = ∫_{0}^{2} (2 − r)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [□]_{0}^{2}·([φ]_{0}^{2π})   (trous : [r² − r³/3]_{0}^{2}·([φ]_{0}^{2π}))   ← Primitives
    = 8π/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 4 ; la hauteur est 2 − √(x² + y²). | ∫_{0}^{2π} ∫_{0}^{2} (2 − r)·r dr dφ
  pièges : a2_jacobian_forgot, a2_volume_surfaces_swapped

```

### Niveau 2

```
Calcule le volume du solide compris entre les surfaces z = √(2 − x² − y²) et z = √(x² + y²).
  [guided]  z = √(2 − x² − y²) ; z = √(x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1)   ← Les surfaces se coupent en r = 1 : R est le disque x² + y² ≤ 1
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = √(2 − x² − y²) ; z = √(x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; □ ≤ z ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; r ≤ z ≤ √(2 − r²))   ← Sur R, √(2−r²) ≥ r : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : √(2 − x² − y²) − √(x² + y²)
    = (√(2 − r²) − r)·□   (trous : (√(2 − r²) − r)·r)   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (√(2 − r²) − r)·r dr dφ
    = ∫_{0}^{1} (√(2 − r²) − r)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [□]_{0}^{1}·([φ]_{0}^{2π})   (trous : [−(2 − r²)^(3/2)/3 − r³/3]_{0}^{1}·([φ]_{0}^{2π}))   ← Primitives
    = 4√2π/3 − 4π/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 1 ; la hauteur est √(2 − x² − y²) − √(x² + y²). | ∫_{0}^{2π} ∫_{0}^{1} (√(2 − r²) − r)·r dr dφ
  pièges : a2_polar_angle_bounds

Calcule le volume du solide compris entre les surfaces z = 1 et z = √(x² + y²).
  [guided]  z = 1 ; z = √(x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1)   ← Les surfaces se coupent en r = 1 : R est le disque x² + y² ≤ 1
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 1 ; z = √(x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; □ ≤ z ≤ □   (trous : 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; r ≤ z ≤ 1)   ← Sur R, 1 ≥ r : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 1 − √(x² + y²)
    = (1 − r)·□   (trous : (1 − r)·r)   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (1 − r)·r dr dφ
    = ∫_{0}^{1} (1 − r)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [□]_{0}^{1}·([φ]_{0}^{2π})   (trous : [r²/2 − r³/3]_{0}^{1}·([φ]_{0}^{2π}))   ← Primitives
    = π/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 1 ; la hauteur est 1 − √(x² + y²). | ∫_{0}^{2π} ∫_{0}^{1} (1 − r)·r dr dφ
  pièges : a2_polar_angle_bounds

Calcule le volume du tétraèdre sous le plan z = 2 − 2x − 2y, dans le premier octant (x, y, z ≥ 0).
  [guided]  z = 2 − 2x − 2y ; z = 0 ; x ≥ 0 ; y ≥ 0
    = 0 ≤ x ≤ □ ; 0 ≤ y ≤ □   (trous : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ (2 − 2x)/2)   ← Le plan coupe z = 0 sur la droite 2−2x−2y = 0 : un triangle
  — Décris le solide D : z entre le dessous et le dessus.  [juge domain]  départ : z = 2 − 2x − 2y ; z = 0 ; x ≥ 0 ; y ≥ 0
    = 0 ≤ x ≤ 1 ; 0 ≤ y ≤ (2 − 2x)/2 ; 0 ≤ z ≤ □   (trous : 0 ≤ x ≤ 1 ; 0 ≤ y ≤ (2 − 2x)/2 ; 0 ≤ z ≤ 2 − 2x − 2y)   ← z va du plan z = 0 au plan incliné
  — Vol = ∬_R (dessus − dessous) dx dy :  [juge definite]  départ : ∫_{0}^{1} ∫_{0}^{(2 − 2x)/2} (2 − 2x − 2y) dy dx
    = ∫_{0}^{1} (2 − 2x)²/□ dx   (trous : ∫_{0}^{1} (2 − 2x)²/4 dx)   ← On intègre d'abord en y
    = [−(2 − 2x)³/24]_{0}^{1}   ← Primitive en x
    = 1/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R : 0 ≤ x ≤ 1, 0 ≤ y ≤ (2−2x)/2 ; la hauteur est 2 − 2x − 2y. | ∫_{0}^{1} ∫_{0}^{(2 − 2x)/2} (2 − 2x − 2y) dy dx

```

### Niveau 3

```
Calcule le volume du solide compris entre les surfaces z = 9 − x² − y² et z = 0.
  [tap, suivre l'erreur, menu steps]  z = 9 − x² − y² ; z = 0
    ? Quelles coordonnées pour R ? ✔ Polaires / · Cartésiennes
    ? Au-dessus de R, quelle surface est en haut ? ✔ z = 9−x²−y² / · z = 0
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3   ← Les surfaces se coupent en r = 3 : R est le disque x² + y² ≤ 9
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 9 − x² − y² ; z = 0
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; 0 ≤ z ≤ 9 − r²   ← Sur R, 9−r² ≥ 0 : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 9 − x² − y²
    = (9 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} (9 − r²)·r dr dφ
    = ∫_{0}^{3} (9 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [9r²/2 − r⁴/4]_{0}^{3}·([φ]_{0}^{2π})   ← Primitives
    = 81π/2   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 9 ; la hauteur est 9 − x² − y². | ∫_{0}^{2π} ∫_{0}^{3} (9 − r²)·r dr dφ
  pièges : a2_polar_angle_bounds, a2_volume_surfaces_swapped

Calcule le volume du solide compris entre les surfaces z = 3 et z = √(x² + y²).
  [tap, suivre l'erreur, menu steps]  z = 3 ; z = √(x² + y²)
    ? Quelles coordonnées pour R ? ✔ Polaires / · Cartésiennes
    ? Au-dessus de R, quelle surface est en haut ? ✔ z = 3 / · z = √(x²+y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3   ← Les surfaces se coupent en r = 3 : R est le disque x² + y² ≤ 9
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 3 ; z = √(x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; r ≤ z ≤ 3   ← Sur R, 3 ≥ r : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 3 − √(x² + y²)
    = (3 − r)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} (3 − r)·r dr dφ
    = ∫_{0}^{3} (3 − r)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [3r²/2 − r³/3]_{0}^{3}·([φ]_{0}^{2π})   ← Primitives
    = 9π   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 9 ; la hauteur est 3 − √(x² + y²). | ∫_{0}^{2π} ∫_{0}^{3} (3 − r)·r dr dφ
  pièges : a2_polar_angle_bounds, a2_volume_surfaces_swapped

Calcule le volume du solide compris entre les surfaces z = √(4 − x² − y²) et z = −√(4 − x² − y²).
  [tap, suivre l'erreur, menu steps]  z = √(4 − x² − y²) ; z = −√(4 − x² − y²)
    ? Quelles coordonnées pour R ? ✔ Polaires / · Cartésiennes
    ? Au-dessus de R, quelle surface est en haut ? ✔ z = √(4−x²−y²) / · z = −√(4−x²−y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2   ← Les surfaces se coupent en r = 2 : R est le disque x² + y² ≤ 4
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = √(4 − x² − y²) ; z = −√(4 − x² − y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; −√(4 − r²) ≤ z ≤ √(4 − r²)   ← Sur R, √(4−r²) ≥ −√(4−r²) : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 2√(4 − x² − y²)
    = 2√(4 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2√(4 − r²)·r dr dφ
    = ∫_{0}^{2} 2√(4 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [−(2/3)(4 − r²)^(3/2)]_{0}^{2}·([φ]_{0}^{2π})   ← Primitives
    = 32π/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 4 ; la hauteur est 2√(4 − x² − y²). | ∫_{0}^{2π} ∫_{0}^{2} 2√(4 − r²)·r dr dφ
  pièges : a2_polar_angle_bounds, a2_volume_surfaces_swapped

```

### Niveau 4

```
Calcule le volume du solide compris entre les surfaces z = 9 et z = x² + y².
  [free, suivre l'erreur]  z = 9 ; z = x² + y²
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3   ← Les surfaces se coupent en r = 3 : R est le disque x² + y² ≤ 9
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 9 ; z = x² + y²
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 3 ; r² ≤ z ≤ 9   ← Sur R, 9 ≥ r² : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 9 − (x² + y²)
    = (9 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{3} (9 − r²)·r dr dφ
    = ∫_{0}^{3} (9 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [9r²/2 − r⁴/4]_{0}^{3}·([φ]_{0}^{2π})   ← Primitives
    = 81π/2   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 9 ; la hauteur est 9 − (x² + y²). | ∫_{0}^{2π} ∫_{0}^{3} (9 − r²)·r dr dφ
  pièges : a2_polar_angle_bounds

Calcule le volume du tétraèdre sous le plan z = 4 − x − y, dans le premier octant (x, y, z ≥ 0).
  [free, suivre l'erreur]  z = 4 − x − y ; z = 0 ; x ≥ 0 ; y ≥ 0
    = 0 ≤ x ≤ 4 ; 0 ≤ y ≤ 4 − x   ← Le plan coupe z = 0 sur la droite 4−x−y = 0 : un triangle
  — Décris le solide D : z entre le dessous et le dessus.  [juge domain]  départ : z = 4 − x − y ; z = 0 ; x ≥ 0 ; y ≥ 0
    = 0 ≤ x ≤ 4 ; 0 ≤ y ≤ 4 − x ; 0 ≤ z ≤ 4 − x − y   ← z va du plan z = 0 au plan incliné
  — Vol = ∬_R (dessus − dessous) dx dy :  [juge definite]  départ : ∫_{0}^{4} ∫_{0}^{4 − x} (4 − x − y) dy dx
    = ∫_{0}^{4} (4 − x)²/2 dx   ← On intègre d'abord en y
    = [−(4 − x)³/6]_{0}^{4}   ← Primitive en x
    = 32/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R : 0 ≤ x ≤ 4, 0 ≤ y ≤ 4−x ; la hauteur est 4 − x − y. | ∫_{0}^{4} ∫_{0}^{4 − x} (4 − x − y) dy dx

Calcule le volume du solide compris entre les surfaces z = √(4 − x² − y²) et z = −√(4 − x² − y²).
  [free, suivre l'erreur]  z = √(4 − x² − y²) ; z = −√(4 − x² − y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2   ← Les surfaces se coupent en r = 2 : R est le disque x² + y² ≤ 4
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = √(4 − x² − y²) ; z = −√(4 − x² − y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 2 ; −√(4 − r²) ≤ z ≤ √(4 − r²)   ← Sur R, √(4−r²) ≥ −√(4−r²) : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 2√(4 − x² − y²)
    = 2√(4 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{2} 2√(4 − r²)·r dr dφ
    = ∫_{0}^{2} 2√(4 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [−(2/3)(4 − r²)^(3/2)]_{0}^{2}·([φ]_{0}^{2π})   ← Primitives
    = 32π/3   ← Évaluer
  aides : Volume = ∬ (dessus − dessous) sur la projection R ; on trouve R en égalant les deux surfaces. | R est le disque x² + y² ≤ 4 ; la hauteur est 2√(4 − x² − y²). | ∫_{0}^{2π} ∫_{0}^{2} 2√(4 − r²)·r dr dφ
  pièges : a2_polar_angle_bounds

```

### Niveau 5

```
Calcule le volume du solide compris entre les surfaces z = √(1 − x² − y²) et z = −√(1 − x² − y²).
  [free, sans aide]  z = √(1 − x² − y²) ; z = −√(1 − x² − y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1   ← Les surfaces se coupent en r = 1 : R est le disque x² + y² ≤ 1
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = √(1 − x² − y²) ; z = −√(1 − x² − y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; −√(1 − r²) ≤ z ≤ √(1 − r²)   ← Sur R, √(1−r²) ≥ −√(1−r²) : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 2√(1 − x² − y²)
    = 2√(1 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} 2√(1 − r²)·r dr dφ
    = ∫_{0}^{1} 2√(1 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [−(2/3)(1 − r²)^(3/2)]_{0}^{1}·([φ]_{0}^{2π})   ← Primitives
    = 4π/3   ← Évaluer
  pièges : a2_polar_angle_bounds

Calcule le volume du solide compris entre les surfaces z = 3 − (x² + y²) et z = 1 + (x² + y²).
  [free, sans aide]  z = 3 − (x² + y²) ; z = 1 + (x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1   ← Les surfaces se coupent en r = 1 : R est le disque x² + y² ≤ 1
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 3 − (x² + y²) ; z = 1 + (x² + y²)
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; 1 + r² ≤ z ≤ 3 − r²   ← Sur R, 3−r² ≥ 1+r² : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 2 − 2(x² + y²)
    = (2 − 2r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (2 − 2r²)·r dr dφ
    = ∫_{0}^{1} (2 − 2r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [r² − r⁴/2]_{0}^{1}·([φ]_{0}^{2π})   ← Primitives
    = π   ← Évaluer
  pièges : a2_polar_angle_bounds

Calcule le volume du solide compris entre les surfaces z = 1 et z = x² + y².
  [free, sans aide]  z = 1 ; z = x² + y²
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1   ← Les surfaces se coupent en r = 1 : R est le disque x² + y² ≤ 1
  — Décris le solide D en cylindriques : z entre la surface du dessous et celle du dessus.  [juge domain]  départ : z = 1 ; z = x² + y²
    = 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ 1 ; r² ≤ z ≤ 1   ← Sur R, 1 ≥ r² : z va du dessous au dessus
  — La hauteur est dessus − dessous. Écris-la en polaires, jacobien compris :  [juge equiv]  départ : 1 − (x² + y²)
    = (1 − r²)·r   ← Hauteur dessus − dessous, en polaires, fois r
  — Calcule le volume :  [juge definite]  départ : ∫_{0}^{2π} ∫_{0}^{1} (1 − r²)·r dr dφ
    = ∫_{0}^{1} (1 − r²)·r dr·(∫_{0}^{2π} 1 dφ)   ← Bornes constantes : produit
    = [r²/2 − r⁴/4]_{0}^{1}·([φ]_{0}^{2π})   ← Primitives
    = π/2   ← Évaluer
  pièges : a2_polar_angle_bounds

```

### Variantes d'examen

```
Le volume du solide compris entre z = 36 − 2(x² + y²) et z = 2(x² + y²) vaut :
  ✔ 162π   · 324π [a2_jacobian_forgot]   · −162π [a2_volume_surfaces_swapped]   · 144π [a2_jacobian_forgot]
  [examen mcq]
  pièges : a2_jacobian_forgot, a2_volume_surfaces_swapped

```

## Masse et centre de masse (`a2-mass-center`, BA2)

_M = ∬ ρ, x̄ = (1/M)∬ x ρ ; la symétrie donne une coordonnée._

### Niveau 1

```
Une plaque occupe le demi-disque D = {x² + y² ≤ 1 ; y ≥ 0}, avec la densité ρ(x, y) = y. Trouve son centre de masse (x̄, ȳ). La masse est M = 2/3.
  [guided]  y²
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = (r·sin(φ))²·□   (trous : (r·sin(φ))²·r)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{1} r³·sin(φ)² dr dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π} sin(φ)² dφ)   ← Produit de deux intégrales
    = [□]_{0}^{1}·([φ/2 − sin(2φ)/4]_{0}^{π})   (trous : [r⁴/4]_{0}^{1}·([φ/2 − sin(2φ)/4]_{0}^{π}))   ← Primitives
    = π/8   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (π/8)/(2/3)
    = □   (trous : 3π/16)   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π} ∫_{0}^{1} r³·sin(φ)² dr dφ = π/8 | M = 2/3 et le moment vaut π/8.
  pièges : a2_jacobian_forgot

Une plaque occupe le demi-disque D = {x² + y² ≤ 9 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ). La masse est M = 9π.
  [guided]  y√(x² + y²)
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = r·sin(φ)·r·□   (trous : r·sin(φ)·r·r)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} r³·sin(φ) dr dφ
    = ∫_{0}^{3} r³ dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [□]_{0}^{3}·([−cos(φ)]_{0}^{π})   (trous : [r⁴/4]_{0}^{3}·([−cos(φ)]_{0}^{π}))   ← Primitives
    = 81/2   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (81/2)/9π
    = □   (trous : 9/(2π))   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π} ∫_{0}^{3} r³·sin(φ) dr dφ = 81/2 | M = 9π et le moment vaut 81/2.
  pièges : a2_jacobian_forgot

Une plaque occupe le quart de disque D = {x² + y² ≤ 1 ; x ≥ 0 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ). La masse est M = π/6.
  [guided]  x√(x² + y²)
    (Par symétrie (x ↔ y), ȳ = x̄ : il suffit de calculer x̄.)
    = r·cos(φ)·r·□   (trous : r·cos(φ)·r·r)   ← x = r cos φ, et le jacobien r
  — Calcule le moment ∬ x·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{1} r³·cos(φ) dr dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π/2} cos(φ) dφ)   ← Produit de deux intégrales
    = [□]_{0}^{1}·([sin(φ)]_{0}^{π/2})   (trous : [r⁴/4]_{0}^{1}·([sin(φ)]_{0}^{π/2}))   ← Primitives
    = 1/4   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : (1/4)/(π/6)
    = □   (trous : 3/(2π))   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π/2} ∫_{0}^{1} r³·cos(φ) dr dφ = 1/4 | M = π/6 et le moment vaut 1/4.
  pièges : a2_jacobian_forgot

```

### Niveau 2

```
Une plaque occupe le demi-disque D = {x² + y² ≤ 4 ; y ≥ 0}, avec la densité ρ = 1. Trouve son centre de masse (x̄, ȳ).
  [guided]  ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    ? Quelle coordonnée du centre de masse est nulle par symétrie ? ✔ x̄ = 0 / · ȳ = 0 / · Aucune
    = ∫_{0}^{2} r dr·(∫_{0}^{π} 1 dφ)   ← Produit de deux intégrales
    = [r²/2]_{0}^{2}·([φ]_{0}^{π})   ← Primitives
    = 2π   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y
    = r·sin(φ)·□   (trous : r·sin(φ)·r)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r²·sin(φ) dr dφ
    = ∫_{0}^{2} r² dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [□]_{0}^{2}·([−cos(φ)]_{0}^{π})   (trous : [r³/3]_{0}^{2}·([−cos(φ)]_{0}^{π}))   ← Primitives
    = 16/3   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (16/3)/2π
    = 8/(3π)   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π} ∫_{0}^{2} r²·sin(φ) dr dφ = 16/3 | M = 2π et le moment vaut 16/3.
  pièges : a2_jacobian_forgot

Une plaque occupe le quart de disque D = {x² + y² ≤ 4 ; x ≥ 0 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [guided]  ∫_{0}^{π/2} ∫_{0}^{2} r² dr dφ
    ? Que dit la symétrie de D et ρ par rapport à la droite y = x ? ✔ x̄ = ȳ / · x̄ = ȳ = 0 / · Rien
    = ∫_{0}^{2} r² dr·(∫_{0}^{π/2} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([φ]_{0}^{π/2})   ← Primitives
    = 4π/3   ← Évaluer
  — Le moment ∬ x·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : x√(x² + y²)
    = r·cos(φ)·r·□   (trous : r·cos(φ)·r·r)   ← x = r cos φ, et le jacobien r
  — Calcule le moment ∬ x·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{2} r³·cos(φ) dr dφ
    = ∫_{0}^{2} r³ dr·(∫_{0}^{π/2} cos(φ) dφ)   ← Produit de deux intégrales
    = [□]_{0}^{2}·([sin(φ)]_{0}^{π/2})   (trous : [r⁴/4]_{0}^{2}·([sin(φ)]_{0}^{π/2}))   ← Primitives
    = 4   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : 4/(4π/3)
    = 3/π   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π/2} ∫_{0}^{2} r³·cos(φ) dr dφ = 4 | M = 4π/3 et le moment vaut 4.
  pièges : a1_volume_no_square, a2_jacobian_forgot

Une plaque occupe le quart de disque D = {x² + y² ≤ 1 ; x ≥ 0 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [guided]  ∫_{0}^{π/2} ∫_{0}^{1} r² dr dφ
    ? Que dit la symétrie de D et ρ par rapport à la droite y = x ? ✔ x̄ = ȳ / · x̄ = ȳ = 0 / · Rien
    = ∫_{0}^{1} r² dr·(∫_{0}^{π/2} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{1}·([φ]_{0}^{π/2})   ← Primitives
    = π/6   ← Évaluer
  — Le moment ∬ x·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : x√(x² + y²)
    = r·cos(φ)·r·□   (trous : r·cos(φ)·r·r)   ← x = r cos φ, et le jacobien r
  — Calcule le moment ∬ x·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{1} r³·cos(φ) dr dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π/2} cos(φ) dφ)   ← Produit de deux intégrales
    = [□]_{0}^{1}·([sin(φ)]_{0}^{π/2})   (trous : [r⁴/4]_{0}^{1}·([sin(φ)]_{0}^{π/2}))   ← Primitives
    = 1/4   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : (1/4)/(π/6)
    = 3/(2π)   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π/2} ∫_{0}^{1} r³·cos(φ) dr dφ = 1/4 | M = π/6 et le moment vaut 1/4.
  pièges : a1_volume_no_square, a2_jacobian_forgot

```

### Niveau 3

```
Une plaque occupe le quart de disque D = {x² + y² ≤ 4 ; x ≥ 0 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{π/2} ∫_{0}^{2} r² dr dφ
    ? Que dit la symétrie de D et ρ par rapport à la droite y = x ? ✔ x̄ = ȳ / · x̄ = ȳ = 0 / · Rien
    = ∫_{0}^{2} r² dr·(∫_{0}^{π/2} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([φ]_{0}^{π/2})   ← Primitives
    = 4π/3   ← Évaluer
  — Le moment ∬ x·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : x√(x² + y²)
    = r³·cos(φ)   ← x = r cos φ, et le jacobien r
  — Calcule le moment ∬ x·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{2} r³·cos(φ) dr dφ
    = ∫_{0}^{2} r³ dr·(∫_{0}^{π/2} cos(φ) dφ)   ← Produit de deux intégrales
    = [r⁴/4]_{0}^{2}·([sin(φ)]_{0}^{π/2})   ← Primitives
    = 4   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : 4/(4π/3)
    = 3/π   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π/2} ∫_{0}^{2} r³·cos(φ) dr dφ = 4 | M = 4π/3 et le moment vaut 4.
  pièges : a1_volume_no_square, a2_jacobian_forgot

Une plaque occupe le demi-disque D = {x² + y² ≤ 4 ; y ≥ 0}, avec la densité ρ = 1. Trouve son centre de masse (x̄, ȳ).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{π} ∫_{0}^{2} r dr dφ
    ? Quelle coordonnée du centre de masse est nulle par symétrie ? ✔ x̄ = 0 / · ȳ = 0 / · Aucune
    = ∫_{0}^{2} r dr·(∫_{0}^{π} 1 dφ)   ← Produit de deux intégrales
    = [r²/2]_{0}^{2}·([φ]_{0}^{π})   ← Primitives
    = 2π   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y
    = r²·sin(φ)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r²·sin(φ) dr dφ
    = ∫_{0}^{2} r² dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([−cos(φ)]_{0}^{π})   ← Primitives
    = 16/3   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (16/3)/2π
    = 8/(3π)   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π} ∫_{0}^{2} r²·sin(φ) dr dφ = 16/3 | M = 2π et le moment vaut 16/3.
  pièges : a2_jacobian_forgot

Une plaque occupe le quart de disque D = {x² + y² ≤ 4 ; x ≥ 0 ; y ≥ 0}, avec la densité ρ = 1. Trouve son centre de masse (x̄, ȳ).
  [tap, suivre l'erreur, menu steps]  ∫_{0}^{π/2} ∫_{0}^{2} r dr dφ
    ? Que dit la symétrie de D et ρ par rapport à la droite y = x ? ✔ x̄ = ȳ / · x̄ = ȳ = 0 / · Rien
    = ∫_{0}^{2} r dr·(∫_{0}^{π/2} 1 dφ)   ← Produit de deux intégrales
    = [r²/2]_{0}^{2}·([φ]_{0}^{π/2})   ← Primitives
    = π   ← Évaluer
  — Le moment ∬ x·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : x
    = r²·cos(φ)   ← x = r cos φ, et le jacobien r
  — Calcule le moment ∬ x·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π/2} ∫_{0}^{2} r²·cos(φ) dr dφ
    = ∫_{0}^{2} r² dr·(∫_{0}^{π/2} cos(φ) dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([sin(φ)]_{0}^{π/2})   ← Primitives
    = 8/3   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : (8/3)/π
    = 8/(3π)   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π/2} ∫_{0}^{2} r²·cos(φ) dr dφ = 8/3 | M = π et le moment vaut 8/3.
  pièges : a2_jacobian_forgot

```

### Niveau 4

```
Une plaque occupe le demi-disque D = {x² + y² ≤ 4 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [free, suivre l'erreur]  ∫_{0}^{π} ∫_{0}^{2} r² dr dφ
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = ∫_{0}^{2} r² dr·(∫_{0}^{π} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([φ]_{0}^{π})   ← Primitives
    = 8π/3   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y√(x² + y²)
    = r³·sin(φ)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r³·sin(φ) dr dφ
    = ∫_{0}^{2} r³ dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [r⁴/4]_{0}^{2}·([−cos(φ)]_{0}^{π})   ← Primitives
    = 8   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : 8/(8π/3)
    = 3/π   ← Moment divisé par la masse
  aides : Centre = moment divisé par la masse ; une coordonnée est donnée par la symétrie. | ∫_{0}^{π} ∫_{0}^{2} r³·sin(φ) dr dφ = 8 | M = 8π/3 et le moment vaut 8.
  pièges : a1_volume_no_square, a2_jacobian_forgot

Une plaque occupe le triangle D = {0 ≤ y ≤ x ≤ 6}, avec la densité ρ = 1. Trouve son centre de masse (x̄, ȳ).
  [free, suivre l'erreur]  ∫_{0}^{6} ∫_{0}^{x} 1 dy dx
    = ∫_{0}^{6} x dx   ← On intègre d'abord en y, de 0 à x
    = [x²/2]_{0}^{6}   ← Primitive en x
    = 18   ← Évaluer
  — Le moment ∬ x·ρ :  [juge definite]  départ : ∫_{0}^{6} ∫_{0}^{x} x dy dx
    = ∫_{0}^{6} x² dx   ← On intègre d'abord en y, de 0 à x
    = [x³/3]_{0}^{6}   ← Primitive en x
    = 72   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : 72/18
    = 4   ← Diviser
  — Le moment ∬ y·ρ :  [juge definite]  départ : ∫_{0}^{6} ∫_{0}^{x} y dy dx
    = ∫_{0}^{6} x²/2 dx   ← On intègre d'abord en y, de 0 à x
    = [x³/6]_{0}^{6}   ← Primitive en x
    = 36   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : 36/18
    = 2   ← Diviser
  aides : x̄ = (1/M)∬ x·ρ et ȳ = (1/M)∬ y·ρ ; ici aucune symétrie ne donne une coordonnée. | D : 0 ≤ x ≤ 6, 0 ≤ y ≤ x ; M = 18. | x̄ = 4 et ȳ = 2.

Une plaque occupe le triangle D = {0 ≤ y ≤ x ≤ 3}, avec la densité ρ(x, y) = x. Trouve son centre de masse (x̄, ȳ).
  [free, suivre l'erreur]  ∫_{0}^{3} ∫_{0}^{x} x dy dx
    = ∫_{0}^{3} x² dx   ← On intègre d'abord en y, de 0 à x
    = [x³/3]_{0}^{3}   ← Primitive en x
    = 9   ← Évaluer
  — Le moment ∬ x·ρ :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{x} x² dy dx
    = ∫_{0}^{3} x³ dx   ← On intègre d'abord en y, de 0 à x
    = [x⁴/4]_{0}^{3}   ← Primitive en x
    = 81/4   ← Évaluer
  — x̄ = moment / masse :  [juge definite]  départ : (81/4)/9
    = 9/4   ← Diviser
  — Le moment ∬ y·ρ :  [juge definite]  départ : ∫_{0}^{3} ∫_{0}^{x} x·y dy dx
    = ∫_{0}^{3} x³/2 dx   ← On intègre d'abord en y, de 0 à x
    = [x⁴/8]_{0}^{3}   ← Primitive en x
    = 81/8   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (81/8)/9
    = 9/8   ← Diviser
  aides : x̄ = (1/M)∬ x·ρ et ȳ = (1/M)∬ y·ρ ; ici aucune symétrie ne donne une coordonnée. | D : 0 ≤ x ≤ 3, 0 ≤ y ≤ x ; M = 9. | x̄ = 9/4 et ȳ = 9/8.

```

### Niveau 5

```
Une plaque occupe le demi-disque D = {x² + y² ≤ 9 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [free, sans aide]  ∫_{0}^{π} ∫_{0}^{3} r² dr dφ
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = ∫_{0}^{3} r² dr·(∫_{0}^{π} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{3}·([φ]_{0}^{π})   ← Primitives
    = 9π   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y√(x² + y²)
    = r³·sin(φ)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{3} r³·sin(φ) dr dφ
    = ∫_{0}^{3} r³ dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [r⁴/4]_{0}^{3}·([−cos(φ)]_{0}^{π})   ← Primitives
    = 81/2   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (81/2)/9π
    = 9/(2π)   ← Moment divisé par la masse
  pièges : a1_volume_no_square, a2_jacobian_forgot

Une plaque occupe le demi-disque D = {x² + y² ≤ 1 ; y ≥ 0}, avec la densité ρ(x, y) = y. Trouve son centre de masse (x̄, ȳ).
  [free, sans aide]  ∫_{0}^{π} ∫_{0}^{1} r²·sin(φ) dr dφ
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = ∫_{0}^{1} r² dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{1}·([−cos(φ)]_{0}^{π})   ← Primitives
    = 2/3   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y²
    = r³·sin(φ)²   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{1} r³·sin(φ)² dr dφ
    = ∫_{0}^{1} r³ dr·(∫_{0}^{π} sin(φ)² dφ)   ← Produit de deux intégrales
    = [r⁴/4]_{0}^{1}·([φ/2 − sin(2φ)/4]_{0}^{π})   ← Primitives
    = π/8   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : (π/8)/(2/3)
    = 3π/16   ← Moment divisé par la masse
  pièges : a2_jacobian_forgot

Une plaque occupe le demi-disque D = {x² + y² ≤ 4 ; y ≥ 0}, avec la densité ρ(x, y) = √(x² + y²). Trouve son centre de masse (x̄, ȳ).
  [free, sans aide]  ∫_{0}^{π} ∫_{0}^{2} r² dr dφ
    (Par symétrie (x ↦ −x), x̄ = 0 : il reste ȳ.)
    = ∫_{0}^{2} r² dr·(∫_{0}^{π} 1 dφ)   ← Produit de deux intégrales
    = [r³/3]_{0}^{2}·([φ]_{0}^{π})   ← Primitives
    = 8π/3   ← Évaluer
  — Le moment ∬ y·ρ dx dy : écris l'intégrande en polaires, jacobien compris.  [juge equiv]  départ : y√(x² + y²)
    = r³·sin(φ)   ← y = r sin φ, et le jacobien r
  — Calcule le moment ∬ y·ρ dx dy :  [juge definite]  départ : ∫_{0}^{π} ∫_{0}^{2} r³·sin(φ) dr dφ
    = ∫_{0}^{2} r³ dr·(∫_{0}^{π} sin(φ) dφ)   ← Produit de deux intégrales
    = [r⁴/4]_{0}^{2}·([−cos(φ)]_{0}^{π})   ← Primitives
    = 8   ← Évaluer
  — ȳ = moment / masse :  [juge definite]  départ : 8/(8π/3)
    = 3/π   ← Moment divisé par la masse
  pièges : a1_volume_no_square, a2_jacobian_forgot

```

## Problème de Cauchy : existence, unicité, Lipschitz (`a2-ode-cauchy`, BA2)

_f continue : une solution ; Lipschitz en y : elle est unique, sur |t| ≤ min(a, b/K)._

### Niveau 1

```
Problème de Cauchy y′ = f(t, y) = ysin(t) + t, y(0) = 0 sur le rectangle R : |t| ≤ 1, |y| ≤ 1. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (ysin(t) + t)
    = sin(t)   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|sin t| ≤ 1, |y| ≤ 1, |t| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    = □   (trous : 1)   ← Majorer chaque facteur
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = □·1 + 1   (trous : 1·1 + 1)   ← Majorer chaque terme
    = 2   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(1,1/2)   ← min(a, b/K)
    = 1/2   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |sin t| ≤ 1, |y| ≤ 1, |t| ≤ 1. Par exemple |∂f/∂y| ≤ 1. | M = 1, K = 2, h = min(1, 1/2) = 1/2.

Problème de Cauchy y′ = f(t, y) = tsin(y) + y², y(0) = 0 sur le rectangle R : |t| ≤ 2, |y| ≤ 2. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (tsin(y) + y²)
    = tcos(y) + 2y   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 2, |cos y| ≤ 1, |y| ≤ 2) : f est M-Lipschitz en y.  [juge value]  départ : M
    = □·□ + 2·2   (trous : 2·1 + 2·2)   ← Majorer chaque facteur
    = 6   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = □·1 + 2²   (trous : 2·1 + 2²)   ← Majorer chaque terme
    = 6   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(2,2/6)   ← min(a, b/K)
    = 1/3   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 2, |cos y| ≤ 1, |y| ≤ 2. Par exemple |∂f/∂y| ≤ 2·1+2·2. | M = 6, K = 6, h = min(2, 2/6) = 1/3.

Problème de Cauchy y′ = f(t, y) = ty², y(0) = 1 sur le rectangle R : |t| ≤ 1, |y − 1| ≤ 2 (donc |y| ≤ 3). Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (ty²)
    = 2ty   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 1, |y| ≤ 3) : f est M-Lipschitz en y.  [juge value]  départ : M
    = 2·□·□   (trous : 2·1·3)   ← Majorer chaque facteur
    = 6   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 1·□²   (trous : 1·3²)   ← Majorer chaque terme
    = 9   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(1,2/9)   ← min(a, b/K)
    = 2/9   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 1, |y| ≤ 3. Par exemple |∂f/∂y| ≤ 2·1·3. | M = 6, K = 9, h = min(1, 2/9) = 2/9.

```

### Niveau 2

```
Problème de Cauchy y′ = f(t, y) = tsin(y) + y², y(0) = -1 sur le rectangle R : |t| ≤ 2, |y + 1| ≤ 2 (donc |y| ≤ 3). Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (tsin(y) + y²)
    = tcos(y) + 2y   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 2, |cos y| ≤ 1, |y| ≤ 3) : f est M-Lipschitz en y.  [juge value]  départ : M
    = 2·1 + 2·3   ← Majorer chaque facteur
    = 8   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 2·1 + 3²   ← Majorer chaque terme
    = 11   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(2,2/11)   ← min(a, b/K)
    = 2/11   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 2, |cos y| ≤ 1, |y| ≤ 3. Par exemple |∂f/∂y| ≤ 2·1+2·3. | M = 8, K = 11, h = min(2, 2/11) = 2/11.

Problème de Cauchy y′ = f(t, y) = tsin(y) + y², y(0) = 0 sur le rectangle R : |t| ≤ 1, |y| ≤ 1. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (tsin(y) + y²)
    = tcos(y) + 2y   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 1, |cos y| ≤ 1, |y| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    = 1·1 + 2·1   ← Majorer chaque facteur
    = 3   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 1·1 + 1²   ← Majorer chaque terme
    = 2   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(1,1/2)   ← min(a, b/K)
    = 1/2   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 1, |cos y| ≤ 1, |y| ≤ 1. Par exemple |∂f/∂y| ≤ 1·1+2·1. | M = 3, K = 2, h = min(1, 1/2) = 1/2.

Problème de Cauchy y′ = f(t, y) = ycos(t), y(0) = 0 sur le rectangle R : |t| ≤ 1, |y| ≤ 1. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [guided]  ∂/∂y (ycos(t))
    = cos(t)   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|cos t| ≤ 1, |y| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    = 1   ← Majorer chaque facteur
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 1·1   ← Majorer chaque terme
    = 1   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(1,1/1)   ← min(a, b/K)
    = 1   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |cos t| ≤ 1, |y| ≤ 1. Par exemple |∂f/∂y| ≤ 1. | M = 1, K = 1, h = min(1, 1/1) = 1.

```

### Niveau 3

```
Problème de Cauchy y′ = f(t, y) = tcos(y), y(0) = 0 sur le rectangle R : |t| ≤ 2, |y| ≤ 2. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (tcos(y))
    = −tsin(y)   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 2, |sin y| ≤ 1, |cos y| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    ? Quelle hypothèse donne l'unicité de la solution ? ✔ f est Lipschitz en y sur R (par exemple ∂f/∂y bornée) / · f est continue sur R / · f est bornée par K sur R
    = 2·1   ← Majorer chaque facteur
    = 2   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 2·1   ← Majorer chaque terme
    = 2   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(2,2/2)   ← min(a, b/K)
    = 1   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 2, |sin y| ≤ 1, |cos y| ≤ 1. Par exemple |∂f/∂y| ≤ 2·1. | M = 2, K = 2, h = min(2, 2/2) = 1.
  pièges : a2_ode_continuity_unique

Problème de Cauchy y′ = f(t, y) = tsin(y) + y², y(0) = 1 sur le rectangle R : |t| ≤ 2, |y − 1| ≤ 1 (donc |y| ≤ 2). Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (tsin(y) + y²)
    = tcos(y) + 2y   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 2, |cos y| ≤ 1, |y| ≤ 2) : f est M-Lipschitz en y.  [juge value]  départ : M
    ? Quelle hypothèse donne l'unicité de la solution ? ✔ f est Lipschitz en y sur R (par exemple ∂f/∂y bornée) / · f est continue sur R / · f est bornée par K sur R
    = 2·1 + 2·2   ← Majorer chaque facteur
    = 6   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 2·1 + 2²   ← Majorer chaque terme
    = 6   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(2,1/6)   ← min(a, b/K)
    = 1/6   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 2, |cos y| ≤ 1, |y| ≤ 2. Par exemple |∂f/∂y| ≤ 2·1+2·2. | M = 6, K = 6, h = min(2, 1/6) = 1/6.
  pièges : a2_ode_continuity_unique

Problème de Cauchy y′ = f(t, y) = tsin(y) + y², y(0) = 0 sur le rectangle R : |t| ≤ 2, |y| ≤ 1. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (tsin(y) + y²)
    = tcos(y) + 2y   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 2, |cos y| ≤ 1, |y| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    ? Quelle hypothèse donne l'unicité de la solution ? ✔ f est Lipschitz en y sur R (par exemple ∂f/∂y bornée) / · f est continue sur R / · f est bornée par K sur R
    = 2·1 + 2·1   ← Majorer chaque facteur
    = 4   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 2·1 + 1²   ← Majorer chaque terme
    = 3   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(2,1/3)   ← min(a, b/K)
    = 1/3   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 2, |cos y| ≤ 1, |y| ≤ 1. Par exemple |∂f/∂y| ≤ 2·1+2·1. | M = 4, K = 3, h = min(2, 1/3) = 1/3.
  pièges : a2_ode_continuity_unique

```

### Niveau 4

```
Vrai ou faux ?
  « Si f est continue et bornée sur ℝ, le problème y′ = f(t), y(t₀) = y₀ a une unique solution. » → VRAI
  aides : Existence : f continue. Unicité locale : f Lipschitz en y. Rien de global. | Pense à y′ = 3y^(2/3) (deux solutions) et à y′ = y² (explosion). | L'énoncé est vrai.

Problème de Cauchy y′ = f(t, y) = ty², y(0) = 0 sur le rectangle R : |t| ≤ 1, |y| ≤ 1. Trouve une constante de Lipschitz M, une borne K de |f| et l'intervalle |t| ≤ h où la solution existe et est unique.
  [free, suivre l'erreur]  ∂/∂y (ty²)
    = 2ty   ← Dériver en y (t est une constante)
  — Majore |∂f/∂y| sur R (|t| ≤ 1, |y| ≤ 1) : f est M-Lipschitz en y.  [juge value]  départ : M
    = 2·1·1   ← Majorer chaque facteur
    = 2   ← Calculer
  — Majore |f| sur R : borne K.  [juge value]  départ : K
    = 1·1²   ← Majorer chaque terme
    = 1   ← Calculer
  — Solution unique sur |t| ≤ h, avec h = min(a, b/K) :  [juge value]  départ : h
    = min(1,1/1)   ← min(a, b/K)
    = 1   ← Calculer
  aides : Lipschitz : majore |∂f/∂y| sur R. Intervalle : min(a, b/K). | Sur R : |t| ≤ 1, |y| ≤ 1. Par exemple |∂f/∂y| ≤ 2·1·1. | M = 2, K = 1, h = min(1, 1/1) = 1.

Vrai ou faux ?
  « Si f est continue et bornée sur ℝ, le problème y′ = f(t), y(t₀) = y₀ a une unique solution. » → VRAI
  aides : Existence : f continue. Unicité locale : f Lipschitz en y. Rien de global. | Pense à y′ = 3y^(2/3) (deux solutions) et à y′ = y² (explosion). | L'énoncé est vrai.

```

### Niveau 5

```
Vrai ou faux ? 4 énoncés, un point chacun.
  [problème, 4 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si f est continue sur ℝ², le problème y′ = f(t, y), y(t₀) = y₀ a au moins une solution locale. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si f ∈ C¹(ℝ²), la solution de y′ = f(t, y), y(0) = 1 est définie pour tout t ∈ ℝ. » → FAUX
      contre-exemple (a2) : f = y^2, y = 1/(1-t)
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « L'équation y‴ = f(t, y, y′, y″) demande trois conditions initiales, y(t₀), y′(t₀) et y″(t₀), pour une solution unique. » → VRAI
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Si f ∈ C¹(ℝ²), le problème y′ = f(t, y), y(t₀) = y₀ a une unique solution locale. » → VRAI
  pièges : a2_ode_local_global

Vrai ou faux ? 4 énoncés, un point chacun.
  [problème, 4 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si f est continue sur ℝ², le problème y′ = f(t, y), y(t₀) = y₀ a au moins une solution locale. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si f est continue et bornée sur ℝ, le problème y′ = f(t), y(t₀) = y₀ a une unique solution. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f est continue, le problème y′ = f(y), y(0) = 0 a une unique solution sur [0 ; 1]. » → FAUX
      contre-exemple (a2) : y1 = 0, y2 = t^2
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « L'équation y‴ = f(t, y, y′, y″) demande trois conditions initiales, y(t₀), y′(t₀) et y″(t₀), pour une solution unique. » → VRAI
  pièges : a2_ode_continuity_unique

Vrai ou faux ? 4 énoncés, un point chacun.
  [problème, 4 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si f est continue, le problème y′ = f(y), y(0) = 0 a une unique solution sur [0 ; 1]. » → FAUX
      contre-exemple (a2) : y1 = 0, y2 = t^2
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si f est continue et bornée sur ℝ, le problème y′ = f(t), y(t₀) = y₀ a une unique solution. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si f est continue et bornée, le problème y′ = f(y), y(0) = 0 a une unique solution locale. » → FAUX
      contre-exemple (a2) : y1 = 0, y2 = t^3
  partie 4 (Énoncé 4 : 1)
  Vrai ou faux ?
    « Si f est continue sur ℝ², le problème y′ = f(t, y), y(t₀) = y₀ a au moins une solution locale. » → VRAI
  pièges : a2_ode_continuity_unique

```

### Variantes d'examen

```
Une condition suffisante pour que y‴ = y″·f₂(x) + f₀(y), y(0) = a, y′(0) = b, y″(0) = c ait une unique solution locale est :
  · f₂ et f₀ bornées   ✔ f₂ continue et f₀ Lipschitz   · f₂ et f₀ continues [a2_ode_continuity_unique]   · f₀ Lipschitz, sans condition sur f₂
  [examen mcq]
  pièges : a2_ode_continuity_unique

Vrai ou faux ?
  « Si f ∈ C¹(ℝ²), la solution de y′ = f(t, y), y(0) = 1 est définie pour tout t ∈ ℝ. » → FAUX
    contre-exemple (a2) : f = y^2, y = 1/(1-t)
  [examen tf]
  pièges : a2_ode_local_global

```

## Équations à variables séparables (`a2-ode-separable`, BA2)

_Solutions constantes d'abord, puis dy/h(y) = g(x) dx et une seule constante._

### Niveau 1

```
Résous y′ = y, y(0) = −1. Les solutions constantes sont y = 0 ; y(0) = −1 n'en est pas une.
  [guided]  y′ = y
    = dy/y = dx   ← Séparer
    = ∫ 1/y dy = ∫ 1 dx   ← Intégrer des deux côtés
    = □ = x + C   (trous : ln(|y|) = x + C)   ← Primitives, une seule constante
    = C = 0   ← y(0) = −1
    = y = □   (trous : y = −e^(x))   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = ln|y| et ∫ g(x) dx = x, plus une seule constante. | ln(|y|) = x + C, puis C = 0.

Résous y′ = 6x⁵y², y(0) = −2. Les solutions constantes sont y = 0 ; y(0) = −2 n'en est pas une.
  [guided]  y′ = 6x⁵y²
    = dy/y² = 6x⁵dx   ← Séparer
    = ∫ 1/y² dy = ∫ 6x⁵ dx   ← Intégrer des deux côtés
    = □ = x⁶ + C   (trous : −1/y = x⁶ + C)   ← Primitives, une seule constante
    = C = 1/2   ← y(0) = −2
    = y = □   (trous : y = 1/(−1/2 − x⁶))   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = −1/y et ∫ g(x) dx = x⁶, plus une seule constante. | −1/y = x⁶ + C, puis C = 1/2.

Résous y′ = 6x⁵y, y(0) = 2. Les solutions constantes sont y = 0 ; y(0) = 2 n'en est pas une.
  [guided]  y′ = 6x⁵y
    = dy/y = 6x⁵dx   ← Séparer
    = ∫ 1/y dy = ∫ 6x⁵ dx   ← Intégrer des deux côtés
    = □ = x⁶ + C   (trous : ln(|y|) = x⁶ + C)   ← Primitives, une seule constante
    = C = ln(2)   ← y(0) = 2
    = y = □   (trous : y = 2e^(x⁶))   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = ln|y| et ∫ g(x) dx = x⁶, plus une seule constante. | ln(|y|) = x⁶ + C, puis C = ln(2).

```

### Niveau 2

```
Résous y′ = cos(x)·(1 + y²), y(0) = 0.
  [guided]  1 + y² = 0
    ? Avant de diviser par h(y) = 1 + y², que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    = ∅   ← Zéros de h
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = cos(x)·(1 + y²)
    = dy/(1 + y²) = cos(x)dx   ← Séparer
    = ∫ 1/(1 + y²) dy = ∫ cos(x) dx   ← Intégrer des deux côtés
    = arctan(y) = □ + C   (trous : arctan(y) = sin(x) + C)   ← Primitives, une seule constante
    = C = 0   ← y(0) = 0
    = y = tan(sin(x))   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = arctan y et ∫ g(x) dx = sin(x), plus une seule constante. | arctan(y) = sin(x) + C, puis C = 0.
  pièges : a2_ode_sep_lost_constant

Résous y′ = cos(x)·(1 − y²), y(0) = 0.
  [guided]  1 − y² = 0
    ? Avant de diviser par h(y) = 1 − y², que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    = y = 1 ou y = −1   ← Zéros de h
  — Décompose 1/(1 − y²) en éléments simples.  [juge equiv]  départ : 1/(1 − y²)
    = (1/2)(1/(1 − y) + 1/(1 + y))   ← Éléments simples
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = cos(x)·(1 − y²)
    = dy/(1 − y²) = cos(x)dx   ← Séparer
    = ∫ 1/(1 − y²) dy = ∫ cos(x) dx   ← Intégrer des deux côtés
    = (1/2)ln(|(1 + y)/(1 − y)|) = □ + C   (trous : (1/2)ln(|(1 + y)/(1 − y)|) = sin(x) + C)   ← Primitives, une seule constante
    = C = 0   ← y(0) = 0
    = (1 + y)/(1 − y) = e^(2sin(x))   ← Le quotient est positif en x = 0 : on enlève |…| avec le signe +
    = y = (e^(2sin(x)) − 1)/(e^(2sin(x)) + 1)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = (1/2) ln|(1 + y)/(1 − y)| et ∫ g(x) dx = sin(x), plus une seule constante. | (1/2)ln(|(1 + y)/(1 − y)|) = sin(x) + C, puis C = 0.
  pièges : a2_ode_sep_lost_constant

Résous y′ = 3x²y², y(0) = 2.
  [guided]  y² = 0
    ? Avant de diviser par h(y) = y², que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    = y = 0   ← Zéros de h
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 3x²y²
    = dy/y² = 3x²dx   ← Séparer
    = ∫ 1/y² dy = ∫ 3x² dx   ← Intégrer des deux côtés
    = −1/y = □ + C   (trous : −1/y = x³ + C)   ← Primitives, une seule constante
    = C = −1/2   ← y(0) = 2
    = y = 1/(1/2 − x³)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = −1/y et ∫ g(x) dx = x³, plus une seule constante. | −1/y = x³ + C, puis C = −1/2.
  pièges : a2_ode_sep_lost_constant

```

### Niveau 3

```
Résous y′ = 4x(1 − y²), y(0) = 0.
  [tap, suivre l'erreur, menu steps]  1 − y² = 0
    ? Avant de diviser par h(y) = 1 − y², que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    = y = 1 ou y = −1   ← Zéros de h
  — Décompose 1/(1 − y²) en éléments simples.  [juge equiv]  départ : 1/(1 − y²)
    = (1/2)(1/(1 − y) + 1/(1 + y))   ← Éléments simples
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 4x(1 − y²)
    = ∫ 1/(1 − y²) dy = ∫ 4x dx   ← Séparer et intégrer
    = (1/2)ln(|(1 + y)/(1 − y)|) = 2x² + C   ← Primitives, une seule constante
    ? Appliquer la condition initiale maintenant, ou après avoir isolé y ? ✔ Maintenant : la constante est plus simple à trouver / ✔ Après avoir isolé y
    = C = 0   ← y(0) = 0
    = (1 + y)/(1 − y) = e^(4x²)   ← Le quotient est positif en x = 0 : on enlève |…| avec le signe +
    = y = (e^(4x²) − 1)/(e^(4x²) + 1)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = (1/2) ln|(1 + y)/(1 − y)| et ∫ g(x) dx = 2x², plus une seule constante. | (1/2)ln(|(1 + y)/(1 − y)|) = 2x² + C, puis C = 0.
  pièges : a2_ode_sep_lost_constant

Résous y′ = cos(x)·y, y(0) = 1.
  [tap, suivre l'erreur, menu steps]  y′ = cos(x)·y
    ? Avant de diviser par h(y) = y, que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    (h(y) = y s'annule en y = 0 : y ≡ 0 est une solution constante. Ici y(0) = 1 ≠ 0.)
    = ∫ 1/y dy = ∫ cos(x) dx   ← Séparer et intégrer
    = ln(|y|) = sin(x) + C   ← Primitives, une seule constante
    ? Appliquer la condition initiale maintenant, ou après avoir isolé y ? ✔ Maintenant : la constante est plus simple à trouver / ✔ Après avoir isolé y
    = C = 0   ← y(0) = 1
    = y = e^(sin(x))   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = ln|y| et ∫ g(x) dx = sin(x), plus une seule constante. | ln(|y|) = sin(x) + C, puis C = 0.
  pièges : a2_ode_sep_lost_constant

Résous y′ = 3x²y, y(0) = 0.
  [tap, suivre l'erreur, menu steps]  y′ = 3x²y
    ? Avant de diviser par h(y) = y, que faut-il faire ? ✔ Chercher les zéros de h : ce sont des solutions constantes / · Rien : on divise directement
    (h(y) = y s'annule en y = 0 : y ≡ 0 est une solution constante.)
    = y = 0   ← y ≡ 0 est une solution, et la seule (unicité)
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = ln|y| et ∫ g(x) dx = x³, plus une seule constante. | y(0) = 0 annule h : y ≡ 0.
  pièges : a2_ode_sep_lost_constant

```

### Niveau 4

```
Résous y′ = 6x⁵(1 − y²), y(0) = 0.
  [free, suivre l'erreur]  1 − y² = 0
    = y = 1 ou y = −1   ← Zéros de h
  — Décompose 1/(1 − y²) en éléments simples.  [juge equiv]  départ : 1/(1 − y²)
    = (1/2)(1/(1 − y) + 1/(1 + y))   ← Éléments simples
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 6x⁵(1 − y²)
    = dy/(1 − y²) = 6x⁵dx   ← Séparer
    = (1/2)ln(|(1 + y)/(1 − y)|) = x⁶ + C   ← Primitives, une seule constante
    = C = 0   ← y(0) = 0
    = (1 + y)/(1 − y) = e^(2x⁶)   ← Le quotient est positif en x = 0 : on enlève |…| avec le signe +
    = y = (e^(2x⁶) − 1)/(e^(2x⁶) + 1)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = (1/2) ln|(1 + y)/(1 − y)| et ∫ g(x) dx = x⁶, plus une seule constante. | (1/2)ln(|(1 + y)/(1 − y)|) = x⁶ + C, puis C = 0.

Résous y′ = 4x(1 + y²), y(0) = −1.
  [free, suivre l'erreur]  1 + y² = 0
    = ∅   ← Zéros de h
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 4x(1 + y²)
    = dy/(1 + y²) = 4xdx   ← Séparer
    = arctan(y) = 2x² + C   ← Primitives, une seule constante
    = C = −π/4   ← y(0) = −1
    = y = tan(2x² − π/4)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = arctan y et ∫ g(x) dx = 2x², plus une seule constante. | arctan(y) = 2x² + C, puis C = −π/4.

Résous y′ = 3x²(1 + y²), y(0) = −1.
  [free, suivre l'erreur]  1 + y² = 0
    = ∅   ← Zéros de h
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 3x²(1 + y²)
    = dy/(1 + y²) = 3x²dx   ← Séparer
    = arctan(y) = x³ + C   ← Primitives, une seule constante
    = C = −π/4   ← y(0) = −1
    = y = tan(x³ − π/4)   ← Isoler y
  aides : Repère les solutions constantes (zéros de h), puis mets les y d'un côté et les x de l'autre. | ∫ dy/h(y) = arctan y et ∫ g(x) dx = x³, plus une seule constante. | arctan(y) = x³ + C, puis C = −π/4.

```

### Niveau 5

```
La solution de y′ = e^(−y), y(0) = 0 vérifie aussi y(1) =
  · ln(1)   · −ln(2)   ✔ ln(2)   · 2

Résous y′ = 3x²(1 − y²), y(0) = 0.
  [free, sans aide]  1 − y² = 0
    = y = 1 ou y = −1   ← Zéros de h
  — Décompose 1/(1 − y²) en éléments simples.  [juge equiv]  départ : 1/(1 − y²)
    = (1/2)(1/(1 − y) + 1/(1 + y))   ← Éléments simples
  — Sépare, intègre, puis applique la condition initiale.  [juge ode]  départ : y′ = 3x²(1 − y²)
    = dy/(1 − y²) = 3x²dx   ← Séparer
    = (1/2)ln(|(1 + y)/(1 − y)|) = x³ + C   ← Primitives, une seule constante
    = C = 0   ← y(0) = 0
    = (1 + y)/(1 − y) = e^(2x³)   ← Le quotient est positif en x = 0 : on enlève |…| avec le signe +
    = y = (e^(2x³) − 1)/(e^(2x³) + 1)   ← Isoler y

La solution de y′ = 2y², y(0) = −2 vérifie aussi y(1/3) =
  · 6   · 6/7   · 2/3   ✔ −6/7

```

### Variantes d'examen

```
La solution de y′ = 3(1 − y²), y(0) = 0 vérifie aussi y(ln(3)/6) =
  · −1/2   · 1   ✔ 1/2   · 2 [a2_ode_sign_abs]
  [examen mcq]
  pièges : a2_ode_sign_abs

Vrai ou faux ?
  « La solution générale de y′ = cos(t)·e^(−y) est y = ln(sin t + C). » → VRAI
  [examen tf]

```

## Linéaires du 1er ordre : facteur intégrant (`a2-ode-linear1`, BA2)

_Normaliser, μ = e^(∫a), (μy)′ = μb, intégrer._

### Niveau 1

```
Résous 2y′ − 2y = −2, y(0) = −1. Forme normalisée : y′ − y = −1.
  [guided]  y′ − y = −1
    = μ = □   (trous : μ = e^(−x))   ← μ = e^(∫ a), a = −1
    = (e^(−x)y)′ = □   (trous : (e^(−x)y)′ = −e^(−x))   ← (μy)′ = μ·b
    = e^(−x)y = e^(−x) + C   ← Intégrer
    = C = −2   ← y(0) = −1
    = y = 1 − 2e^x   ← Isoler y
  aides : Divise par 2 pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = −1, donc μ = e^(−x) ; puis (μy)′ = μ·b et ∫ −e^(−x) dx. | (e^(−x)y)′ = −e^(−x)
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

Résous xy′ + 2y = 10x³, y(1) = 0, pour x > 0. Forme normalisée : y′ + (2/x)y = 10x².
  [guided]  y′ + (2/x)y = 10x²
    = μ = □   (trous : μ = x²)   ← μ = e^(∫ a), a = 2/x
    = (x²y)′ = □   (trous : (x²y)′ = 10x⁴)   ← (μy)′ = μ·b
    = x²y = 2x⁵ + C   ← Intégrer
    = C = −2   ← y(1) = 0
    = y = 2x³ − 2/x²   ← Isoler y
  aides : Divise par x pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = 2/x, donc μ = x² ; puis (μy)′ = μ·b et ∫ 10x⁴ dx. | (x²y)′ = 10x⁴
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

Résous cos(x)y′ + sin(x)y = cos(x)³, y(0) = 3. Forme normalisée : y′ + tan(x)y = cos(x)².
  [guided]  y′ + tan(x)y = cos(x)²
    = μ = □   (trous : μ = 1/cos(x))   ← μ = e^(∫ a), a = tan(x)
    = (y/□)′ = cos(x)   (trous : (y/cos(x))′ = cos(x))   ← (μy)′ = μ·b
    = y/cos(x) = sin(x) + C   ← Intégrer
    = C = 3   ← y(0) = 3
    = y = (sin(x) + 3)cos(x)   ← Isoler y
  aides : Divise par cos(x) pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = tan(x), donc μ = 1/cos(x) ; puis (μy)′ = μ·b et ∫ cos x dx. | (y/cos(x))′ = cos(x)
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

```

### Niveau 2

```
Résous y′ + xy = 3x, y(0) = 2.
  [guided]  y′ + xy = 3x
    = μ = e^(x²/2)   ← μ = e^(∫ a), a = x
    = (e^(x²/2)y)′ = 3xe^(x²/2)   ← (μy)′ = μ·b
    = e^(x²/2)y = □ + C   (trous : e^(x²/2)y = 3e^(x²/2) + C)   ← Intégrer
    = C = −1   ← y(0) = 2
    = y = 3 − e^(−x²/2)   ← Isoler y
  aides : Multiplie par μ = e^(∫ a) : le membre de gauche devient (μy)′. | a(x) = x, donc μ = e^(x²/2) ; puis (μy)′ = μ·b et ∫ 3xe^(x²/2) dx. | (e^(x²/2)y)′ = 3xe^(x²/2)
  pièges : a2_ode_if_sign, a2_ode_if_rhs

Résous cos(x)y′ + sin(x)y = cos(x)², y(0) = 1.
  [guided]  cos(x)y′ + sin(x)y = cos(x)²
    = y′ + tan(x)y = cos(x)   ← Diviser par cos(x)
    = μ = 1/cos(x)   ← μ = e^(∫ a), a = tan(x)
    = (y/cos(x))′ = 1   ← (μy)′ = μ·b
    = y/cos(□) = x + C   (trous : y/cos(x) = x + C)   ← Intégrer
    = C = 1   ← y(0) = 1
    = y = (x + 1)cos(x)   ← Isoler y
  aides : Divise par cos(x) pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = tan(x), donc μ = 1/cos(x) ; puis (μy)′ = μ·b et ∫ 1 dx. | (y/cos(x))′ = 1
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

Résous 2y′ − 2y = 16e^(−3x), y(0) = −2.
  [guided]  2y′ − 2y = 16e^(−3x)
    = y′ − y = 8e^(−3x)   ← Diviser par 2
    = μ = e^(−x)   ← μ = e^(∫ a), a = −1
    = (e^(−x)y)′ = 8e^(−4x)   ← (μy)′ = μ·b
    = e^(−x)y = □ + C   (trous : e^(−x)y = −2e^(−4x) + C)   ← Intégrer
    = C = 0   ← y(0) = −2
    = y = −2e^(−3x)   ← Isoler y
  aides : Divise par 2 pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = −1, donc μ = e^(−x) ; puis (μy)′ = μ·b et ∫ 8e^(−4x) dx. | (e^(−x)y)′ = 8e^(−4x)
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

```

### Niveau 3

```
Résous y′ + xy = 3x, y(0) = −1.
  [tap, suivre l'erreur, menu steps]  y′ + xy = 3x
    ? Quelle méthode ? ✔ Facteur intégrant / · Décalage vers l'équilibre (a et b constants) / ✔ Variables séparables
    = μ = e^(x²/2)   ← μ = e^(∫ a), a = x
    = (e^(x²/2)y)′ = 3xe^(x²/2)   ← (μy)′ = μ·b
    = e^(x²/2)y = 3e^(x²/2) + C   ← Intégrer
    = C = −4   ← y(0) = −1
    = y = 3 − 4e^(−x²/2)   ← Isoler y
  aides : Multiplie par μ = e^(∫ a) : le membre de gauche devient (μy)′. | a(x) = x, donc μ = e^(x²/2) ; puis (μy)′ = μ·b et ∫ 3xe^(x²/2) dx. | (e^(x²/2)y)′ = 3xe^(x²/2)
  pièges : a2_ode_if_sign, a2_ode_if_rhs

Résous y′ + (3/x)y = −5x, y(1) = 3, pour x > 0.
  [tap, suivre l'erreur, menu steps]  y′ + (3/x)y = −5x
    ? Quelle méthode ? ✔ Facteur intégrant / · Décalage vers l'équilibre (a et b constants) / · Variables séparables
    = μ = x³   ← μ = e^(∫ a), a = 3/x
    = (x³y)′ = −5x⁴   ← (μy)′ = μ·b
    = x³y = −x⁵ + C   ← Intégrer
    = C = 4   ← y(1) = 3
    = y = −x² + 4/x³   ← Isoler y
  aides : Multiplie par μ = e^(∫ a) : le membre de gauche devient (μy)′. | a(x) = 3/x, donc μ = x³ ; puis (μy)′ = μ·b et ∫ −5x⁴ dx. | (x³y)′ = −5x⁴
  pièges : a2_ode_if_sign, a2_ode_if_rhs, a2_ode_method_separable_sum

Résous 2y′ + 4y = 6e^x, y(0) = 2.
  [tap, suivre l'erreur, menu steps]  2y′ + 4y = 6e^x
    ? Quelle méthode ? ✔ Facteur intégrant / · Décalage vers l'équilibre (a et b constants) / · Variables séparables
    = y′ + 2y = 3e^x   ← Diviser par 2
    = μ = e^(2x)   ← μ = e^(∫ a), a = 2
    = (e^(2x)y)′ = 3e^(3x)   ← (μy)′ = μ·b
    = e^(2x)y = e^(3x) + C   ← Intégrer
    = C = 1   ← y(0) = 2
    = y = e^x + e^(−2x)   ← Isoler y
  aides : Divise par 2 pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = 2, donc μ = e^(2x) ; puis (μy)′ = μ·b et ∫ 3e^(3x) dx. | (e^(2x)y)′ = 3e^(3x)
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs, a2_ode_method_separable_sum

```

### Niveau 4

```
Résous y′ − 2y = 10e^(−3x), y(0) = −1.
  [free, suivre l'erreur]  y′ − 2y = 10e^(−3x)
    = μ = e^(−2x)   ← μ = e^(∫ a), a = −2
    = (e^(−2x)y)′ = 10e^(−5x)   ← (μy)′ = μ·b
    = e^(−2x)y = −2e^(−5x) + C   ← Intégrer
    = C = 1   ← y(0) = −1
    = y = −2e^(−3x) + e^(2x)   ← Isoler y
  aides : Multiplie par μ = e^(∫ a) : le membre de gauche devient (μy)′. | a(x) = −2, donc μ = e^(−2x) ; puis (μy)′ = μ·b et ∫ 10e^(−5x) dx. | (e^(−2x)y)′ = 10e^(−5x)
  pièges : a2_ode_if_sign, a2_ode_if_rhs

Résous xy′ + 2y = 9x, y(1) = 0, pour x > 0.
  [free, suivre l'erreur]  xy′ + 2y = 9x
    = y′ + (2/x)y = 9   ← Diviser par x
    = μ = x²   ← μ = e^(∫ a), a = 2/x
    = (x²y)′ = 9x²   ← (μy)′ = μ·b
    = x²y = 3x³ + C   ← Intégrer
    = C = −3   ← y(1) = 0
    = y = 3x − 3/x²   ← Isoler y
  aides : Divise par x pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = 2/x, donc μ = x² ; puis (μy)′ = μ·b et ∫ 9x² dx. | (x²y)′ = 9x²
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

Résous xy′ + 2y = 9x, y(1) = −1, pour x > 0.
  [free, suivre l'erreur]  xy′ + 2y = 9x
    = y′ + (2/x)y = 9   ← Diviser par x
    = μ = x²   ← μ = e^(∫ a), a = 2/x
    = (x²y)′ = 9x²   ← (μy)′ = μ·b
    = x²y = 3x³ + C   ← Intégrer
    = C = −4   ← y(1) = −1
    = y = 3x − 4/x²   ← Isoler y
  aides : Divise par x pour avoir y′ seul, puis multiplie par μ = e^(∫ a). | a(x) = 2/x, donc μ = x² ; puis (μy)′ = μ·b et ∫ 9x² dx. | (x²y)′ = 9x²
  pièges : a2_ode_if_not_normalized, a2_ode_if_sign, a2_ode_if_rhs

```

### Niveau 5

```
La solution de y′ − 2y = −3e^(−x), y(0) = 0 est :
  · y = e^(−x) [a2_ode_ic_before_particular]   ✔ y = e^(−x) − e^(2x)   · y = 3e^x − 3e^(2x) [a2_ode_if_rhs]   · y = −3e^(−x) + 3e^(−2x) [a2_ode_if_sign]
  pièges : a2_ode_ic_before_particular, a2_ode_if_sign, a2_ode_if_rhs

La solution de xy′ + 2y = 15x³, y(1) = 3 (x > 0) est :
  · y = 3x³ + 3/x² [a2_ode_ic_before_particular]   · y = 15x³ − 12x² [a2_ode_if_sign]   ✔ y = 3x³   · y = 5x − 2/x² [a2_ode_if_rhs]
  pièges : a2_ode_ic_before_particular, a2_ode_if_sign, a2_ode_if_rhs

La solution de xy′ + y = 6x, y(1) = 1 (x > 0) est :
  · y = −(3x − 2/x)   ✔ y = 3x − 2/x   · y = 3x + 1/x [a2_ode_ic_before_particular]   · y = 6 − 5/x [a2_ode_if_rhs]
  pièges : a2_ode_ic_before_particular, a2_ode_if_rhs

```

### Variantes d'examen

```
La solution de (x² + 1)y′ + y = 1, y(0) = 0 est :
  ✔ y = 1 − e^(−arctan(x))   · y = (arctan(x))e^(−arctan(x)) [a2_ode_if_rhs]   · y = 1 [a2_ode_ic_before_particular]   · y = −1 + e^(arctan(x)) [a2_ode_if_sign]
  [examen mcq]
  pièges : a2_ode_ic_before_particular, a2_ode_if_sign, a2_ode_if_rhs

Vrai ou faux ?
  « Si y₁ et y₂ sont deux solutions de y′ + a(x)y = b(x), alors y₁ − y₂ est une solution de y′ + a(x)y = 0. » → VRAI
  [examen tf]

```

## Équations homogènes : y = x·v (`a2-ode-homog-subst`, BA2)

_y′ = F(y/x) : y = xv, y′ = v + xv′, l'équation en v est séparable._

### Niveau 1

```
Résous xy′ = y + x, y(1) = 0, pour x > 0. On pose y = x·v(x) : y′ = v + x·v′.
  [guided]  x(v + xv′) = xv + x
    = xv′ = □   (trous : xv′ = 1)   ← Simplifier
    = dv = dx/x   ← Séparer
    = v = ln(x) + C   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = 0
    = v = ln(x)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xln(x)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = 1 ; ∫ dv/(1) = v. | xv′ = 1, puis v = ln(x) + C.

Résous xy′ − y = xcos(y/x)², y(1) = −π/4, pour x > 0. On pose y = x·v(x) : y′ = v + x·v′.
  [guided]  x(v + xv′) − xv = xcos(v)²
    = xv′ = □   (trous : xv′ = cos(v)²)   ← Simplifier
    = dv/cos(v)² = dx/x   ← Séparer
    = tan(v) = ln(x) + C   ← Intégrer
    = C = −1   ← v(1) = y(1)/1 = −π/4
    = v = arctan(ln(x) − 1)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xarctan(ln(x) − 1)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = cos(v)² ; ∫ dv/(cos(v)²) = tan v. | xv′ = cos(v)², puis tan(v) = ln(x) + C.

Résous y′ = y/x + cos(y/x)², y(1) = 0, pour x > 0. On pose y = x·v(x) : y′ = v + x·v′.
  [guided]  v + xv′ = v + cos(v)²
    = xv′ = □   (trous : xv′ = cos(v)²)   ← Simplifier
    = dv/cos(v)² = dx/x   ← Séparer
    = tan(v) = ln(x) + C   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = 0
    = v = arctan(ln(x))   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xarctan(ln(x))   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = cos(v)² ; ∫ dv/(cos(v)²) = tan v. | xv′ = cos(v)², puis tan(v) = ln(x) + C.

```

### Niveau 2

```
Résous y′ = y/x + sin(y/x), y(1) = π/2, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [guided]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : v + xv′ = v + sin(v)
    = xv′ = sin(v)   ← Simplifier
    = dv/sin(v) = dx/x   ← Séparer
    = □ = ln(x) + C   (trous : ln(|tan(v/2)|) = ln(x) + C)   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = π/2
    = tan(v/2) = x   ← Enlever ln et |…|
    = v = 2arctan(x)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = 2xarctan(x)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = sin(v) ; ∫ dv/(sin(v)) = ln|tan(v/2)|. | xv′ = sin(v), puis ln(|tan(v/2)|) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous xy′ = y + x, y(1) = 2, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [guided]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) = xv + x
    = xv′ = 1   ← Simplifier
    = dv = dx/x   ← Séparer
    = □ = ln(x) + C   (trous : v = ln(x) + C)   ← Intégrer
    = C = 2   ← v(1) = y(1)/1 = 2
    = v = ln(x) + 2   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xln(x) + 2x   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = 1 ; ∫ dv/(1) = v. | xv′ = 1, puis v = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous xy′ − y = 2x, y(1) = 2, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [guided]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) − xv = 2x
    = xv′ = 2   ← Simplifier
    = dv = (2/x)dx   ← Séparer
    = □ = 2ln(x) + C   (trous : v = 2ln(x) + C)   ← Intégrer
    = C = 2   ← v(1) = y(1)/1 = 2
    = v = 2ln(x) + 2   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = 2xln(x) + 2x   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = 2 ; ∫ dv/(2) = v/2. | xv′ = 2, puis v = 2ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

```

### Niveau 3

```
Résous xy′ = y + xsin(y/x), y(1) = π/2, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [tap, suivre l'erreur, menu steps]  (xv)′
    ? L'équation s'écrit-elle y′ = F(y/x) ? ✔ Oui : y′ = y/x + sin((y/x)) / · Non, il faut une autre méthode
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) = xv + xsin(v)
    = xv′ = sin(v)   ← Simplifier
    = ∫ 1/(sin(v)) dv = ∫ 1/x dx   ← Séparer
    = ln(|tan(v/2)|) = ln(x) + C   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = π/2
    = tan(v/2) = x   ← Enlever ln et |…|
    = v = 2arctan(x)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = 2xarctan(x)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = sin(v) ; ∫ dv/(sin(v)) = ln|tan(v/2)|. | xv′ = sin(v), puis ln(|tan(v/2)|) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous xy′ − y = xcos(y/x)², y(1) = π/4, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [tap, suivre l'erreur, menu steps]  (xv)′
    ? L'équation s'écrit-elle y′ = F(y/x) ? ✔ Oui : y′ = y/x + cos((y/x))² / · Non, il faut une autre méthode
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) − xv = xcos(v)²
    = xv′ = cos(v)²   ← Simplifier
    = ∫ 1/(cos(v)²) dv = ∫ 1/x dx   ← Séparer
    = tan(v) = ln(x) + C   ← Intégrer
    = C = 1   ← v(1) = y(1)/1 = π/4
    = v = arctan(ln(x) + 1)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xarctan(ln(x) + 1)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = cos(v)² ; ∫ dv/(cos(v)²) = tan v. | xv′ = cos(v)², puis tan(v) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous x²y′ = xy + y², y(1) = −1, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [tap, suivre l'erreur, menu steps]  (xv)′
    ? L'équation s'écrit-elle y′ = F(y/x) ? ✔ Oui : y′ = y/x + (y/x)² / · Non, il faut une autre méthode
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x²(v + xv′) = x²v + x²v²
    = xv′ = v²   ← Simplifier
    = ∫ 1/(v²) dv = ∫ 1/x dx   ← Séparer
    = −1/v = ln(x) + C   ← Intégrer
    = C = 1   ← v(1) = y(1)/1 = −1
    = v = −1/(ln(x) + 1)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = −x/(ln(x) + 1)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = v² ; ∫ dv/(v²) = −1/v. | xv′ = v², puis −1/v = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

```

### Niveau 4

```
Résous xy′ = x + y + y²/x, y(1) = 1, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [free, suivre l'erreur]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) = x + xv + xv²
    = xv′ = 1 + v²   ← Simplifier
    = dv/(1 + v²) = dx/x   ← Séparer
    = arctan(v) = ln(x) + C   ← Intégrer
    = C = π/4   ← v(1) = y(1)/1 = 1
    = v = tan(ln(x) + π/4)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xtan(ln(x) + π/4)   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = 1+v² ; ∫ dv/(1+v²) = arctan v. | xv′ = 1 + v², puis arctan(v) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous xy′ = x + y + y²/x, y(1) = 0, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [free, suivre l'erreur]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) = x + xv + xv²
    = xv′ = 1 + v²   ← Simplifier
    = dv/(1 + v²) = dx/x   ← Séparer
    = arctan(v) = ln(x) + C   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = 0
    = v = tan(ln(x))   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xtan(ln(x))   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = 1+v² ; ∫ dv/(1+v²) = arctan v. | xv′ = 1 + v², puis arctan(v) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

Résous y′ = y/x + cos(y/x)², y(1) = 0, pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [free, suivre l'erreur]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : v + xv′ = v + cos(v)²
    = xv′ = cos(v)²   ← Simplifier
    = dv/cos(v)² = dx/x   ← Séparer
    = tan(v) = ln(x) + C   ← Intégrer
    = C = 0   ← v(1) = y(1)/1 = 0
    = v = arctan(ln(x))   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xarctan(ln(x))   ← y = x·v
  aides : Pose y = xv et dérive avec la règle du produit ; l'équation devient séparable en v. | y′ = v + x·v′, puis x·v′ = cos(v)² ; ∫ dv/(cos(v)²) = tan v. | xv′ = cos(v)², puis tan(v) = ln(x) + C.
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

```

### Niveau 5

```
La solution de xy′ = y + xe^(−y/x), y(1) = 0, pour x > 0, est :
  · y = 0 [a2_ode_homog_derivative]   ✔ y = xln(ln(x) + 1)   · y = ln(ln(x) + 1)   · y = x²ln(ln(x) + 1)
  pièges : a2_ode_homog_derivative

La solution de xy′ − y = xcos(y/x)², y(1) = π/4, pour x > 0, est :
  · y = π/4x [a2_ode_homog_derivative]   · y = xarctan(ln(x)) + π/4 [a2_ode_sep_constant_late]   ✔ y = xarctan(ln(x) + 1)   · y = arctan(ln(x) + 1)
  pièges : a2_ode_homog_derivative, a2_ode_sep_constant_late

Résous xy′ = y + xe^(−y/x), y(1) = ln(2), pour x > 0. Pose y = x·v(x), puis écris y′ = (xv)′.
  [free, sans aide]  (xv)′
    = v + xv′   ← Règle du produit
  — Remplace y par xv et y′ par v + xv′ : l'équation en v.  [juge ode]  départ : x(v + xv′) = xv + xe^(−v)
    = xv′ = e^(−v)   ← Simplifier
    = e^vdv = dx/x   ← Séparer
    = e^v = ln(x) + C   ← Intégrer
    = C = 2   ← v(1) = y(1)/1 = ln(2)
    = v = ln(ln(x) + 2)   ← Isoler v
  — Reviens à y = x·v.  [juge ode]  départ : y = xv
    = y = xln(ln(x) + 2)   ← y = x·v
  pièges : g6_implicit_xy, g6_implicit_yprime_forgot, a2_ode_homog_derivative

```

### Variantes d'examen

```
La solution de y′ = y/x + e^(−y/x), y(1) = ln(2), pour x > 0, est :
  · y = x²ln(ln(x) + 2)   · y = ln(2)x [a2_ode_homog_derivative]   · y = ln(ln(x) + 2)   ✔ y = xln(ln(x) + 2)
  [examen mcq]
  pièges : a2_ode_homog_derivative

```

## Structure des solutions des EDO linéaires (`a2-ode-structure`, BA2)

_y = y_h + y_p ; superposition des seconds membres._

### Niveau 1

```
Solution générale de y′′ + y = e^(−2x) + 3 : une solution particulière par morceau du second membre, puis superposition. La solution homogène est y_h = C_1cos(x) + C_2sin(x).
  [guided]  y′′ + y = e^(−2x)
    = y_p = (□)e^(−2x)   (trous : y_p = (1/5)e^(−2x))   ← On essaie A·e^(−2x)
  — Une solution particulière pour 3 :  [juge ode]  départ : y′′ + y = 3
    = y_p = □   (trous : y_p = 3)   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ + y = e^(−2x) + 3
    = y = C_1cos(x) + C_2sin(x) + (1/5)e^(−2x) + 3   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 3, essaie y_p = A (une constante) et remplace dans y′′ + y = 3. | y = C_1cos(x) + C_2sin(x) + (1/5)e^(−2x) + 3

Solution générale de y′′ − 2y′ + 2y = 3e^x + 6x − 6 : une solution particulière par morceau du second membre, puis superposition. La solution homogène est y_h = e^x(C_1cos(x) + C_2sin(x)).
  [guided]  y′′ − 2y′ + 2y = 3e^x
    = y_p = □e^x   (trous : y_p = 3e^x)   ← On essaie A·e^x
  — Une solution particulière pour 6x − 6 :  [juge ode]  départ : y′′ − 2y′ + 2y = 6x − 6
    = y_p = □   (trous : y_p = 3x)   ← On essaie Ax + B
  — Superposition : la solution générale.  [juge ode]  départ : y′′ − 2y′ + 2y = 3e^x + 6x − 6
    = y = e^x(C_1cos(x) + C_2sin(x)) + 3e^x + 3x   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 6x − 6, essaie y_p = Ax + B et remplace dans y′′ − 2y′ + 2y = 6x − 6. | y = e^x(C_1cos(x) + C_2sin(x)) + 3e^x + 3x

Solution générale de y′′ + 4y′ + 8y = 2e^(−x) + 24 : une solution particulière par morceau du second membre, puis superposition. La solution homogène est y_h = e^(−2x)(C_1cos(2x) + C_2sin(2x)).
  [guided]  y′′ + 4y′ + 8y = 2e^(−x)
    = y_p = (□)e^(−x)   (trous : y_p = (2/5)e^(−x))   ← On essaie A·e^(−x)
  — Une solution particulière pour 24 :  [juge ode]  départ : y′′ + 4y′ + 8y = 24
    = y_p = □   (trous : y_p = 3)   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ + 4y′ + 8y = 2e^(−x) + 24
    = y = e^(−2x)(C_1cos(2x) + C_2sin(2x)) + (2/5)e^(−x) + 3   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 24, essaie y_p = A (une constante) et remplace dans y′′ + 4y′ + 8y = 24. | y = e^(−2x)(C_1cos(2x) + C_2sin(2x)) + (2/5)e^(−x) + 3

```

### Niveau 2

```
Solution générale de y′ + 2y = 3e^(−x) + 6x + 3 : une solution particulière par morceau du second membre, puis superposition.
  [guided]  y′ + 2y = 0
    = y_h = Ce^(−2x)   ← Équation homogène
  — Une solution particulière pour le second membre 3e^(−x) :  [juge ode]  départ : y′ + 2y = 3e^(−x)
    = y_p = 3e^(−x)   ← On essaie A·e^(−x)
  — Une solution particulière pour 6x + 3 :  [juge ode]  départ : y′ + 2y = 6x + 3
    = y_p = 3x   ← On essaie Ax + B
  — Superposition : la solution générale.  [juge ode]  départ : y′ + 2y = 3e^(−x) + 6x + 3
    = y = Ce^(−2x) + 3e^(−x) + 3x   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 6x + 3, essaie y_p = Ax + B et remplace dans y′ + 2y = 6x + 3. | y = Ce^(−2x) + 3e^(−x) + 3x

Solution générale de y′′ − 9y = −18 + 3e^(2x) : une solution particulière par morceau du second membre, puis superposition.
  [guided]  y′′ − 9y = 0
    = y_h = C_1e^(−3x) + C_2e^(3x)   ← Racines : r = −3, r = 3
  — Une solution particulière pour le second membre −18 :  [juge ode]  départ : y′′ − 9y = −18
    = y_p = 2   ← On essaie A (une constante)
  — Une solution particulière pour 3e^(2x) :  [juge ode]  départ : y′′ − 9y = 3e^(2x)
    = y_p = −(3/5)e^(2x)   ← On essaie A·e^(2x)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ − 9y = −18 + 3e^(2x)
    = y = C_1e^(−3x) + C_2e^(3x) + 2 − (3/5)e^(2x)   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 3e^(2x), essaie y_p = A·e^(2x) et remplace dans y′′ − 9y = 3e^(2x). | y = C_1e^(−3x) + C_2e^(3x) + 2 − (3/5)e^(2x)
  pièges : a2_ode_constant_count

Solution générale de y′ + 2y = 3e^x − 4x − 2 : une solution particulière par morceau du second membre, puis superposition.
  [guided]  y′ + 2y = 0
    = y_h = Ce^(−2x)   ← Équation homogène
  — Une solution particulière pour le second membre 3e^x :  [juge ode]  départ : y′ + 2y = 3e^x
    = y_p = e^x   ← On essaie A·e^x
  — Une solution particulière pour −4x − 2 :  [juge ode]  départ : y′ + 2y = −4x − 2
    = y_p = −2x   ← On essaie Ax + B
  — Superposition : la solution générale.  [juge ode]  départ : y′ + 2y = 3e^x − 4x − 2
    = y = Ce^(−2x) + e^x − 2x   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour −4x − 2, essaie y_p = Ax + B et remplace dans y′ + 2y = −4x − 2. | y = Ce^(−2x) + e^x − 2x

```

### Niveau 3

```
Solution générale de y′′ − 4y′ + 5y = e^x + 15 : une solution particulière par morceau du second membre, puis superposition.
  [tap, suivre l'erreur, menu steps]  y′′ − 4y′ + 5y = 0
    = y_h = e^(2x)(C_1cos(x) + C_2sin(x))   ← Racines : r = 2+i, r = 2−i
  — Une solution particulière pour le second membre e^x :  [juge ode]  départ : y′′ − 4y′ + 5y = e^x
    = y_p = (1/2)e^x   ← On essaie A·e^x
  — Une solution particulière pour 15 :  [juge ode]  départ : y′′ − 4y′ + 5y = 15
    = y_p = 3   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ − 4y′ + 5y = e^x + 15
    ? y = y_h + 2·y_p1 + y_p2 est-elle aussi une solution de l’équation ? ✔ Non : L(2y_p1) = 2b₁ / · Oui : on peut multiplier une solution par une constante
    = y = e^(2x)(C_1cos(x) + C_2sin(x)) + (1/2)e^x + 3   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 15, essaie y_p = A (une constante) et remplace dans y′′ − 4y′ + 5y = 15. | y = e^(2x)(C_1cos(x) + C_2sin(x)) + (1/2)e^x + 3
  pièges : a2_ode_constant_count, a2_ode_superposition_nonhom

Solution générale de y′ + 3y = −6 + 2e^(3x) : une solution particulière par morceau du second membre, puis superposition.
  [tap, suivre l'erreur, menu steps]  y′ + 3y = 0
    = y_h = Ce^(−3x)   ← Équation homogène
  — Une solution particulière pour le second membre −6 :  [juge ode]  départ : y′ + 3y = −6
    = y_p = −2   ← On essaie A (une constante)
  — Une solution particulière pour 2e^(3x) :  [juge ode]  départ : y′ + 3y = 2e^(3x)
    = y_p = (1/3)e^(3x)   ← On essaie A·e^(3x)
  — Superposition : la solution générale.  [juge ode]  départ : y′ + 3y = −6 + 2e^(3x)
    ? y = y_h + 2·y_p1 + y_p2 est-elle aussi une solution de l’équation ? ✔ Non : L(2y_p1) = 2b₁ / · Oui : on peut multiplier une solution par une constante
    = y = Ce^(−3x) − 2 + (1/3)e^(3x)   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 2e^(3x), essaie y_p = A·e^(3x) et remplace dans y′ + 3y = 2e^(3x). | y = Ce^(−3x) − 2 + (1/3)e^(3x)
  pièges : a2_ode_superposition_nonhom

Solution générale de y′′ − 3y′ + 2y = e^(3x) − 4 : une solution particulière par morceau du second membre, puis superposition.
  [tap, suivre l'erreur, menu steps]  y′′ − 3y′ + 2y = 0
    = y_h = C_1e^x + C_2e^(2x)   ← Racines : r = 1, r = 2
  — Une solution particulière pour le second membre e^(3x) :  [juge ode]  départ : y′′ − 3y′ + 2y = e^(3x)
    = y_p = (1/2)e^(3x)   ← On essaie A·e^(3x)
  — Une solution particulière pour −4 :  [juge ode]  départ : y′′ − 3y′ + 2y = −4
    = y_p = −2   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ − 3y′ + 2y = e^(3x) − 4
    ? y = y_h + 2·y_p1 + y_p2 est-elle aussi une solution de l’équation ? ✔ Non : L(2y_p1) = 2b₁ / · Oui : on peut multiplier une solution par une constante
    = y = C_1e^x + C_2e^(2x) + (1/2)e^(3x) − 2   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour −4, essaie y_p = A (une constante) et remplace dans y′′ − 3y′ + 2y = −4. | y = C_1e^x + C_2e^(2x) + (1/2)e^(3x) − 2
  pièges : a2_ode_constant_count, a2_ode_superposition_nonhom

```

### Niveau 4

```
Solution générale de y′ − 2y = 3e^(−x) + 4 : une solution particulière par morceau du second membre, puis superposition.
  [free, suivre l'erreur]  y′ − 2y = 0
    = y_h = Ce^(2x)   ← Équation homogène
  — Une solution particulière pour le second membre 3e^(−x) :  [juge ode]  départ : y′ − 2y = 3e^(−x)
    = y_p = −e^(−x)   ← On essaie A·e^(−x)
  — Une solution particulière pour 4 :  [juge ode]  départ : y′ − 2y = 4
    = y_p = −2   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′ − 2y = 3e^(−x) + 4
    = y = Ce^(2x) − e^(−x) − 2   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 4, essaie y_p = A (une constante) et remplace dans y′ − 2y = 4. | y = Ce^(2x) − e^(−x) − 2

Solution générale de y′′ + y = 3e^(−2x) + 3x : une solution particulière par morceau du second membre, puis superposition.
  [free, suivre l'erreur]  y′′ + y = 0
    = y_h = C_1cos(x) + C_2sin(x)   ← Racines : r = i, r = −i
  — Une solution particulière pour le second membre 3e^(−2x) :  [juge ode]  départ : y′′ + y = 3e^(−2x)
    = y_p = (3/5)e^(−2x)   ← On essaie A·e^(−2x)
  — Une solution particulière pour 3x :  [juge ode]  départ : y′′ + y = 3x
    = y_p = 3x   ← On essaie Ax + B
  — Superposition : la solution générale.  [juge ode]  départ : y′′ + y = 3e^(−2x) + 3x
    = y = C_1cos(x) + C_2sin(x) + (3/5)e^(−2x) + 3x   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour 3x, essaie y_p = Ax + B et remplace dans y′′ + y = 3x. | y = C_1cos(x) + C_2sin(x) + (3/5)e^(−2x) + 3x
  pièges : a2_ode_constant_count

Solution générale de y′′ + 9y = e^(3x) − 9 : une solution particulière par morceau du second membre, puis superposition.
  [free, suivre l'erreur]  y′′ + 9y = 0
    = y_h = C_1cos(3x) + C_2sin(3x)   ← Racines : r = 3i, r = −3i
  — Une solution particulière pour le second membre e^(3x) :  [juge ode]  départ : y′′ + 9y = e^(3x)
    = y_p = (1/18)e^(3x)   ← On essaie A·e^(3x)
  — Une solution particulière pour −9 :  [juge ode]  départ : y′′ + 9y = −9
    = y_p = −1   ← On essaie A (une constante)
  — Superposition : la solution générale.  [juge ode]  départ : y′′ + 9y = e^(3x) − 9
    = y = C_1cos(3x) + C_2sin(3x) + (1/18)e^(3x) − 1   ← y = y_h + y_p1 + y_p2
  aides : Une solution particulière par morceau du second membre, puis on additionne avec y_h. | Pour −9, essaie y_p = A (une constante) et remplace dans y′′ + 9y = −9. | y = C_1cos(3x) + C_2sin(3x) + (1/18)e^(3x) − 1
  pièges : a2_ode_constant_count

```

### Niveau 5

```
Vrai ou faux ? 3 énoncés, un point chacun.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si p et q sont continues sur I, les solutions de y″ + p(x)y′ + q(x)y = 0 sur I forment un espace vectoriel de dimension 2. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si y₀ résout y′ + 3y = 0 et y₁ résout y′ + 3y = 3, alors y₀ + C·y₁ résout y′ + 3y = 3 pour tout réel C. » → FAUX
      contre-exemple (a2) : y0 = e^(-3x), y1 = 1, C = 2
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « La différence de deux solutions de L(y) = b est une solution de L(y) = 0. » → VRAI
  pièges : a2_ode_superposition_nonhom

Vrai ou faux ? 3 énoncés, un point chacun.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « La différence de deux solutions de L(y) = b est une solution de L(y) = 0. » → VRAI
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si p et q sont continues sur I, les solutions de y″ + p(x)y′ + q(x)y = 0 sur I forment un espace vectoriel de dimension 2. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « y = C·e^(2x) est la solution générale de y″ − 3y′ + 2y = 0. » → FAUX
      contre-exemple (a2) : y = e^x
  pièges : a2_ode_constant_count

Vrai ou faux ? 3 énoncés, un point chacun.
  [problème, 3 points]
  partie 1 (Énoncé 1 : 1)
  Vrai ou faux ?
    « Si y₁ et y₂ résolvent y″ + 9y = 1, alors y₁ + y₂ aussi. » → FAUX
      contre-exemple (a2) : y1 = 1/9, y2 = 1/9+cos(3x)
  partie 2 (Énoncé 2 : 1)
  Vrai ou faux ?
    « Si y_p résout L(y) = b, alors y_h + y_p résout L(y) = b pour toute solution y_h de L(y) = 0. » → VRAI
  partie 3 (Énoncé 3 : 1)
  Vrai ou faux ?
    « Si y₀ résout y′ + 3y = 0 et y₁ résout y′ + 3y = 6, alors y₀ + C·y₁ résout y′ + 3y = 6 pour tout réel C. » → FAUX
      contre-exemple (a2) : y0 = e^(-3x), y1 = 2, C = 2
  pièges : a2_ode_superposition_nonhom

```

### Variantes d'examen

```
Vrai ou faux ?
  « Si p et q sont continues sur I, les solutions de y″ + p(x)y′ + q(x)y = 0 sur I forment un espace vectoriel de dimension 2. » → VRAI
  [examen tf]

```

## 2e ordre homogène à coefficients constants (`a2-ode-const2`, BA2)

_Équation caractéristique, puis la forme selon le signe de Δ._

### Niveau 1

```
Résous y′′ − 2y′ + y = 0, y(0) = 0, y′(0) = −2. Équation caractéristique : r² − 2r + 1 = 0.
  [guided]  r² − 2r + 1 = 0
    = (r − 1)² = 0   ← Factoriser (ou Δ)
    = r = □   (trous : r = 1)   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ − 2y′ + y = 0
    = y = (C_1 + C_2x)□   (trous : y = (C_1 + C_2x)e^x)   ← Forme de la solution
    = C_1 = 0 ; C_2 = −2   ← y(0) = 0, y′(0) = −2
    = y = −2xe^x   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² − 2r + 1 = 0. | Racines : r = 1 ; donc y = … | y = (C_1 + C_2x)e^x
  pièges : a2_ode_char_sign

Résous 3y′′ + 12y′ + 39y = 0, y(0) = 1, y′(0) = 4. Équation caractéristique : 3r² + 12r + 39 = 0.
  [guided]  3r² + 12r + 39 = 0
    = 3((r + 2)² + 9) = 0   ← Factoriser (ou Δ)
    = r = −2 + □ ou r = −2 − 3i   (trous : r = −2 + 3i ou r = −2 − 3i)   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : 3y′′ + 12y′ + 39y = 0
    = y = e^(−2x)(C_1□ + C_2□)   (trous : y = e^(−2x)(C_1cos(3x) + C_2sin(3x)))   ← Forme de la solution
    = C_1 = 1 ; C_2 = 2   ← y(0) = 1, y′(0) = 4
    = y = e^(−2x)(cos(3x) + 2sin(3x))   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens 3r² + 12r + 39 = 0. | Racines : r = −2 + 3i ou r = −2 − 3i ; donc y = … | y = e^(−2x)(C_1cos(3x) + C_2sin(3x))
  pièges : a2_ode_char_sign, c_sqrt_i

Donne la solution générale de y′′ − y′ − 12y = 0. Équation caractéristique : r² − r − 12 = 0.
  [guided]  r² − r − 12 = 0
    = (r + 3)(r − 4) = 0   ← Factoriser (ou Δ)
    = r = −3 ou r = □   (trous : r = −3 ou r = 4)   ← Racines
  — Solution générale :  [juge ode]  départ : y′′ − y′ − 12y = 0
    = y = C_1□ + C_2□   (trous : y = C_1e^(−3x) + C_2e^(4x))   ← Forme de la solution
  aides : Remplace y par e^(rx) : tu obtiens r² − r − 12 = 0. | Racines : r = −3 ou r = 4 ; donc y = … | y = C_1e^(−3x) + C_2e^(4x)
  pièges : a2_ode_char_sign

```

### Niveau 2

```
Donne la solution générale de y′′ + 9y = 0. Remplace d'abord y par e^(rx).
  [guided]  ((e^(rx))′)′ + 9e^(rx)
    = r²e^(rx) + 9e^(rx)   ← Dériver e^(rx)
    = (r² + 9)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² + 9 = 0
    = r² = −9   ← Factoriser (ou Δ)
    = r = 3i ou r = −3i   ← Racines
  — Solution générale :  [juge ode]  départ : y′′ + 9y = 0
    ? Quelle forme ? · Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / ✔ Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = C_1cos(3x) + C_2sin(3x)   ← Forme de la solution
  aides : Remplace y par e^(rx) : tu obtiens r² + 9 = 0. | Racines : r = 3i ou r = −3i ; donc y = … | y = C_1cos(3x) + C_2sin(3x)
  pièges : g6_chain_forgot

Résous y′′ + 2y′ + 10y = 0, y(0) = −2, y′(0) = −2. Remplace d'abord y par e^(rx).
  [guided]  ((e^(rx))′)′ + 2(e^(rx))′ + 10e^(rx)
    = r²e^(rx) + 2re^(rx) + 10e^(rx)   ← Dériver e^(rx)
    = (r² + 2r + 10)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² + 2r + 10 = 0
    = ((r + 1)² + 9) = 0   ← Factoriser (ou Δ)
    = r = −1 + 3i ou r = −1 − 3i   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ + 2y′ + 10y = 0
    ? Quelle forme ? · Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / ✔ Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = e^(−x)(C_1cos(3x) + C_2sin(3x))   ← Forme de la solution
    = C_1 = −2 ; C_2 = −4/3   ← y(0) = −2, y′(0) = −2
    = y = e^(−x)(−2cos(3x) − (4/3)sin(3x))   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² + 2r + 10 = 0. | Racines : r = −1 + 3i ou r = −1 − 3i ; donc y = … | y = e^(−x)(C_1cos(3x) + C_2sin(3x))
  pièges : g6_chain_forgot, g6_power_rule_exp

Donne la solution générale de y′′ − 4y′ + 8y = 0. Remplace d'abord y par e^(rx).
  [guided]  ((e^(rx))′)′ − 4(e^(rx))′ + 8e^(rx)
    = r²e^(rx) − 4re^(rx) + 8e^(rx)   ← Dériver e^(rx)
    = (r² − 4r + 8)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² − 4r + 8 = 0
    = ((r − 2)² + 4) = 0   ← Factoriser (ou Δ)
    = r = 2 + 2i ou r = 2 − 2i   ← Racines
  — Solution générale :  [juge ode]  départ : y′′ − 4y′ + 8y = 0
    ? Quelle forme ? · Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / ✔ Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = e^(2x)(C_1cos(2x) + C_2sin(2x))   ← Forme de la solution
  aides : Remplace y par e^(rx) : tu obtiens r² − 4r + 8 = 0. | Racines : r = 2 + 2i ou r = 2 − 2i ; donc y = … | y = e^(2x)(C_1cos(2x) + C_2sin(2x))
  pièges : g6_chain_forgot, g6_power_rule_exp

```

### Niveau 3

```
Résous y′′ + 4y′ + 13y = 0, y(0) = 0, y′(0) = −1. Remplace d'abord y par e^(rx).
  [tap, suivre l'erreur, menu steps]  ((e^(rx))′)′ + 4(e^(rx))′ + 13e^(rx)
    = r²e^(rx) + 4re^(rx) + 13e^(rx)   ← Dériver e^(rx)
    = (r² + 4r + 13)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² + 4r + 13 = 0
    ? Le discriminant de r²+4r+13 est : · Δ > 0 : deux racines réelles / · Δ = 0 : une racine double / ✔ Δ < 0 : deux racines complexes conjuguées
    = ((r + 2)² + 9) = 0   ← Factoriser (ou Δ)
    = r = −2 + 3i ou r = −2 − 3i   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ + 4y′ + 13y = 0
    ? Quelle forme ? · Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / ✔ Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = e^(−2x)(C_1cos(3x) + C_2sin(3x))   ← Forme de la solution
    = C_1 = 0 ; C_2 = −1/3   ← y(0) = 0, y′(0) = −1
    = y = e^(−2x)(−(1/3)sin(3x))   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² + 4r + 13 = 0. | Racines : r = −2 + 3i ou r = −2 − 3i ; donc y = … | y = e^(−2x)(C_1cos(3x) + C_2sin(3x))
  pièges : g6_chain_forgot, g6_power_rule_exp

Résous y′′ + 6y′ + 8y = 0, y(0) = −1, y′(0) = −3. Remplace d'abord y par e^(rx).
  [tap, suivre l'erreur, menu steps]  ((e^(rx))′)′ + 6(e^(rx))′ + 8e^(rx)
    = r²e^(rx) + 6re^(rx) + 8e^(rx)   ← Dériver e^(rx)
    = (r² + 6r + 8)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² + 6r + 8 = 0
    ? Le discriminant de r²+6r+8 est : ✔ Δ > 0 : deux racines réelles / · Δ = 0 : une racine double / · Δ < 0 : deux racines complexes conjuguées
    = (r + 4)(r + 2) = 0   ← Factoriser (ou Δ)
    = r = −4 ou r = −2   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ + 6y′ + 8y = 0
    ? Quelle forme ? ✔ Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / · Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = C_1e^(−4x) + C_2e^(−2x)   ← Forme de la solution
    = C_1 = 5/2 ; C_2 = −7/2   ← y(0) = −1, y′(0) = −3
    = y = (5/2)e^(−4x) − (7/2)e^(−2x)   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² + 6r + 8 = 0. | Racines : r = −4 ou r = −2 ; donc y = … | y = C_1e^(−4x) + C_2e^(−2x)
  pièges : g6_chain_forgot, g6_power_rule_exp

Donne la solution générale de 3y′′ − 6y′ + 6y = 0. Remplace d'abord y par e^(rx).
  [tap, suivre l'erreur, menu steps]  3((e^(rx))′)′ − 6(e^(rx))′ + 6e^(rx)
    = 3r²e^(rx) − 6re^(rx) + 6e^(rx)   ← Dériver e^(rx)
    = (3r² − 6r + 6)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : 3r² − 6r + 6 = 0
    ? Le discriminant de 3r²−6r+6 est : · Δ > 0 : deux racines réelles / · Δ = 0 : une racine double / ✔ Δ < 0 : deux racines complexes conjuguées
    = 3((r − 1)² + 1) = 0   ← Factoriser (ou Δ)
    = r = 1 + i ou r = 1 − i   ← Racines
  — Solution générale :  [juge ode]  départ : 3y′′ − 6y′ + 6y = 0
    ? Quelle forme ? · Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x) / · Racine double : (C₁ + C₂x)e^(rx) / ✔ Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)
    = y = e^x(C_1cos(x) + C_2sin(x))   ← Forme de la solution
  aides : Remplace y par e^(rx) : tu obtiens 3r² − 6r + 6 = 0. | Racines : r = 1 + i ou r = 1 − i ; donc y = … | y = e^x(C_1cos(x) + C_2sin(x))
  pièges : g6_chain_forgot, g6_power_rule_exp

```

### Niveau 4

```
Résous y′′ − 3y′ − 4y = 0, y(0) = −2, y′(0) = −1. Remplace d'abord y par e^(rx).
  [free, suivre l'erreur]  ((e^(rx))′)′ − 3(e^(rx))′ − 4e^(rx)
    = (r² − 3r − 4)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² − 3r − 4 = 0
    = r = −1 ou r = 4   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ − 3y′ − 4y = 0
    = y = C_1e^(−x) + C_2e^(4x)   ← Forme de la solution
    = C_1 = −7/5 ; C_2 = −3/5   ← y(0) = −2, y′(0) = −1
    = y = −(7/5)e^(−x) − (3/5)e^(4x)   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² − 3r − 4 = 0. | Racines : r = −1 ou r = 4 ; donc y = … | y = C_1e^(−x) + C_2e^(4x)
  pièges : g6_chain_forgot, g6_power_rule_exp

Résous 3y′′ + 12y′ + 9y = 0, y(0) = 2, y′(0) = 1. Remplace d'abord y par e^(rx).
  [free, suivre l'erreur]  3((e^(rx))′)′ + 12(e^(rx))′ + 9e^(rx)
    = (3r² + 12r + 9)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : 3r² + 12r + 9 = 0
    = r = −3 ou r = −1   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : 3y′′ + 12y′ + 9y = 0
    = y = C_1e^(−3x) + C_2e^(−x)   ← Forme de la solution
    = C_1 = −3/2 ; C_2 = 7/2   ← y(0) = 2, y′(0) = 1
    = y = −(3/2)e^(−3x) + (7/2)e^(−x)   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens 3r² + 12r + 9 = 0. | Racines : r = −3 ou r = −1 ; donc y = … | y = C_1e^(−3x) + C_2e^(−x)
  pièges : g6_chain_forgot, g6_power_rule_exp

Résous y′′ − 4y = 0, y(0) = 1, y′(0) = −1. Remplace d'abord y par e^(rx).
  [free, suivre l'erreur]  ((e^(rx))′)′ − 4e^(rx)
    = (r² − 4)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : r² − 4 = 0
    = r = −2 ou r = 2   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : y′′ − 4y = 0
    = y = C_1e^(−2x) + C_2e^(2x)   ← Forme de la solution
    = C_1 = 3/4 ; C_2 = 1/4   ← y(0) = 1, y′(0) = −1
    = y = (3/4)e^(−2x) + (1/4)e^(2x)   ← Solution du problème
  aides : Remplace y par e^(rx) : tu obtiens r² − 4 = 0. | Racines : r = −2 ou r = 2 ; donc y = … | y = C_1e^(−2x) + C_2e^(2x)
  pièges : g6_chain_forgot

```

### Niveau 5

```
La solution générale de 2y′′ + 4y′ + 2y = 0 est :
  · y = C_1e^(−x) + C_2e^(−x) [a2_ode_double_root]   · y = (C_1 + C_2x)e^x [a2_ode_char_sign]   ✔ y = (C_1 + C_2x)e^(−x)   · y = C_1cos(x) + C_2sin(x)
  pièges : a2_ode_double_root, a2_ode_char_sign

La solution générale de 3y′′ + 9y′ + 6y = 0 est :
  · y = (C_1 + C_2x)e^(−2x)   · y = C_1e^(2x) + C_2e^x [a2_ode_char_sign]   · y = e^(−2x)(C_1cos(x) + C_2sin(x))   ✔ y = C_1e^(−2x) + C_2e^(−x)
  pièges : a2_ode_char_sign

Résous 3y′′ + 12y = 0, y(0) = 3, y′(0) = −3. Remplace d'abord y par e^(rx).
  [free, sans aide]  3((e^(rx))′)′ + 12e^(rx)
    = (3r² + 12)e^(rx)   ← Mettre e^(rx) en facteur
  — e^(rx) ≠ 0 : équation caractéristique. Ses racines :  [juge complex]  départ : 3r² + 12 = 0
    = r² = −4   ← Factoriser (ou Δ)
    = r = 2i ou r = −2i   ← Racines
  — Solution générale, puis les conditions initiales.  [juge ode]  départ : 3y′′ + 12y = 0
    = y = C_1cos(2x) + C_2sin(2x)   ← Forme de la solution
    = C_1 = 3 ; C_2 = −3/2   ← y(0) = 3, y′(0) = −3
    = y = 3cos(2x) − (3/2)sin(2x)   ← Solution du problème
  pièges : g6_chain_forgot

```

### Variantes d'examen

```
La solution générale de 3y′′ + 18y′ + 27y = 0 est :
  · y = C_1cos(3x) + C_2sin(3x)   ✔ y = (C_1 + C_2x)e^(−3x)   · y = (C_1 + C_2x)e^(3x) [a2_ode_char_sign]   · y = C_1e^(−3x) + C_2e^(−3x) [a2_ode_double_root]
  [examen mcq]
  pièges : a2_ode_double_root, a2_ode_char_sign

Vrai ou faux ?
  « La solution générale de y″ − 4y′ + 4y = 0 est y = C₁e^(2x) + C₂e^(2x). » → FAUX
    contre-exemple (a2) : y = x e^(2x)
  [examen tf]
  pièges : a2_ode_double_root

```

## Wronskien et réduction d'ordre (`a2-ode-wronskian`, BA2)

_Abel : W = W₀e^(−∫p), puis (y₂/y₁)′ = W/y₁²._

### Niveau 1

```
On considère y′′ − 2y′ + y = 0. Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale. Le wronskien (formule d'Abel) vaut W = e^(2t).
  [guided]  ((e^t)′)′ − 2(e^t)′ + e^t
    = e^t − 2e^t + e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(2t))/(e^t)²
    = 1   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : y′′ − 2y′ + y = 0
    = y_2 = □   (trous : y_2 = te^t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2t)e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −2, W = e^(2t) ; (y₂/y₁)′ = W/y₁² = (e^(2t))/(e^t)². | (y₂/y₁)′ = 1, donc y₂ = te^t.
  pièges : g6_power_rule_exp

On considère ty′′ + (1 − 2t)y′ + (t − 1)y = 0 (t > 0). Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale. Le wronskien (formule d'Abel) vaut W = e^(2t)/t.
  [guided]  t((e^t)′)′ + (1 − 2t)(e^t)′ + (t − 1)e^t
    = te^t + (1 − 2t)e^t + (t − 1)e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(2t)/t)/(e^t)²
    = 1/t   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : ty′′ + (1 − 2t)y′ + (t − 1)y = 0
    = y_2 = □   (trous : y_2 = e^tln(t))   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2ln(t))e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = 1/t−2, W = e^(2t)/t ; (y₂/y₁)′ = W/y₁² = (e^(2t)/t)/(e^t)². | (y₂/y₁)′ = 1/t, donc y₂ = e^tln(t).
  pièges : g6_power_rule_exp

On considère y′′ − 2y′ + y = 0. Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale. Le wronskien (formule d'Abel) vaut W = e^(2t).
  [guided]  ((e^t)′)′ − 2(e^t)′ + e^t
    = e^t − 2e^t + e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(2t))/(e^t)²
    = 1   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : y′′ − 2y′ + y = 0
    = y_2 = □   (trous : y_2 = te^t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2t)e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −2, W = e^(2t) ; (y₂/y₁)′ = W/y₁² = (e^(2t))/(e^t)². | (y₂/y₁)′ = 1, donc y₂ = te^t.
  pièges : g6_power_rule_exp

```

### Niveau 2

```
On considère (t − 1)y′′ − ty′ + y = 0 (t > 1). Vérifie que y₁ = t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [guided]  (t − 1)(t′)′ − tt′ + t
    = (t − 1)·0 − t·1 + t   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t−1 : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (−t)/(t − 1)
    = −t/(t − 1)   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −t/(t − 1) dt)
    = W = (t − 1)e^t   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : ((t − 1)e^t)/(t)²
    = (t − 1)e^t/t²   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : (t − 1)y′′ − ty′ + y = 0
    = y_2 = □   (trous : y_2 = e^t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = C_1t + C_2e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −t/(t−1), W = (t − 1)e^t ; (y₂/y₁)′ = W/y₁² = ((t − 1)e^t)/(t)². | (y₂/y₁)′ = (t − 1)e^t/t², donc y₂ = e^t.

On considère ty′′ + (1 − 2t)y′ + (t − 1)y = 0 (t > 0). Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [guided]  t((e^t)′)′ + (1 − 2t)(e^t)′ + (t − 1)e^t
    = te^t + (1 − 2t)e^t + (t − 1)e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (1 − 2t)/(t)
    = 1/t − 2   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ (1/t − 2) dt)
    = W = e^(2t)/t   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(2t)/t)/(e^t)²
    = 1/t   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : ty′′ + (1 − 2t)y′ + (t − 1)y = 0
    = y_2 = □   (trous : y_2 = e^tln(t))   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2ln(t))e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = 1/t−2, W = e^(2t)/t ; (y₂/y₁)′ = W/y₁² = (e^(2t)/t)/(e^t)². | (y₂/y₁)′ = 1/t, donc y₂ = e^tln(t).
  pièges : g6_power_rule_exp

On considère t²y′′ − 2ty′ + 2y = 0 (t > 0). Vérifie que y₁ = t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [guided]  t²(t′)′ − 2tt′ + 2t
    = t²·0 − 2t·1 + 2t   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t² : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (−2t)/(t²)
    = −2/t   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −2/t dt)
    = W = t²   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (t²)/(t)²
    = 1   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : t²y′′ − 2ty′ + 2y = 0
    = y_2 = □   (trous : y_2 = t²)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = C_1t + C_2t²   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −2/t, W = t² ; (y₂/y₁)′ = W/y₁² = (t²)/(t)². | (y₂/y₁)′ = 1, donc y₂ = t².

```

### Niveau 3

```
On considère y′′ − 3y′ + 2y = 0. Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [tap, suivre l'erreur, menu steps]  ((e^t)′)′ − 3(e^t)′ + 2e^t
    = e^t − 3e^t + 2e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −3 dt)
    ? Comment trouver une deuxième solution y₂ ? ✔ Formule d'Abel, puis (y₂/y₁)′ = W/y₁² / ✔ Poser y = y₁·u et remplacer dans l'équation
    = W = e^(3t)   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(3t))/(e^t)²
    = e^t   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : y′′ − 3y′ + 2y = 0
    = y_2 = e^(2t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = C_1e^t + C_2e^(2t)   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −3, W = e^(3t) ; (y₂/y₁)′ = W/y₁² = (e^(3t))/(e^t)². | (y₂/y₁)′ = e^t, donc y₂ = e^(2t).
  pièges : g6_power_rule_exp

On considère y′′ − 2y′ + y = 0. Vérifie que y₁ = e^t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [tap, suivre l'erreur, menu steps]  ((e^t)′)′ − 2(e^t)′ + e^t
    = e^t − 2e^t + e^t   ← Dériver y₁
    = 0   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −2 dt)
    ? Comment trouver une deuxième solution y₂ ? ✔ Formule d'Abel, puis (y₂/y₁)′ = W/y₁² / ✔ Poser y = y₁·u et remplacer dans l'équation
    = W = e^(2t)   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (e^(2t))/(e^t)²
    = 1   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : y′′ − 2y′ + y = 0
    = y_2 = te^t   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2t)e^t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −2, W = e^(2t) ; (y₂/y₁)′ = W/y₁² = (e^(2t))/(e^t)². | (y₂/y₁)′ = 1, donc y₂ = te^t.
  pièges : g6_power_rule_exp

On considère t²y′′ − 3ty′ + 4y = 0 (t > 0). Vérifie que y₁ = t² est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [tap, suivre l'erreur, menu steps]  t²((t²)′)′ − 3t(t²)′ + 4t²
    = t²·2 − 3t·2t + 4t²   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t² : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (−3t)/(t²)
    = −3/t   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −3/t dt)
    ? Comment trouver une deuxième solution y₂ ? ✔ Formule d'Abel, puis (y₂/y₁)′ = W/y₁² / ✔ Poser y = y₁·u et remplacer dans l'équation
    = W = t³   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (t³)/(t²)²
    = 1/t   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : t²y′′ − 3ty′ + 4y = 0
    = y_2 = t²ln(t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2ln(t))t²   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −3/t, W = t³ ; (y₂/y₁)′ = W/y₁² = (t³)/(t²)². | (y₂/y₁)′ = 1/t, donc y₂ = t²ln(t).

```

### Niveau 4

```
On considère t²y′′ + ty′ − y = 0 (t > 0). Vérifie que y₁ = t est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [free, suivre l'erreur]  t²(t′)′ + tt′ − t
    = t²·0 + t·1 − t   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t² : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (t)/(t²)
    = 1/t   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ 1/t dt)
    = W = 1/t   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (1/t)/(t)²
    = 1/t³   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : t²y′′ + ty′ − y = 0
    = y_2 = −1/(2t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = C_1t + C_2/t   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = 1/t, W = 1/t ; (y₂/y₁)′ = W/y₁² = (1/t)/(t)². | (y₂/y₁)′ = 1/t³, donc y₂ = −1/(2t).

On considère t²y′′ − 3ty′ + 4y = 0 (t > 0). Vérifie que y₁ = t² est une solution, puis trouve une deuxième solution y₂ et la solution générale.
  [free, suivre l'erreur]  t²((t²)′)′ − 3t(t²)′ + 4t²
    = t²·2 − 3t·2t + 4t²   ← Dériver y₁
    = 0   ← Simplifier
  — Divise par t² : p(t) est le coefficient de y′ dans y″ + p(t)y′ + q(t)y = 0.  [juge equiv]  départ : (−3t)/(t²)
    = −3/t   ← Simplifier
  — Formule d'Abel : W = e^(−∫p) (à une constante près).  [juge ode]  départ : W = e^(−∫ −3/t dt)
    = W = t³   ← W = e^(−∫p)
  — Réduction d'ordre : (y₂/y₁)′ = W/y₁².  [juge equiv]  départ : (t³)/(t²)²
    = 1/t   ← Simplifier
  — Une deuxième solution, puis la solution générale.  [juge ode]  départ : t²y′′ − 3ty′ + 4y = 0
    = y_2 = t²ln(t)   ← y₂ = y₁·∫ W/y₁² (sans constante)
    = y = (C_1 + C_2ln(t))t²   ← y = C₁y₁ + C₂y₂
  aides : Divise par le coefficient de y″ pour lire p, puis W = e^(−∫p) et (y₂/y₁)′ = W/y₁². | p = −3/t, W = t³ ; (y₂/y₁)′ = W/y₁² = (t³)/(t²)². | (y₂/y₁)′ = 1/t, donc y₂ = t²ln(t).

Vrai ou faux ? « Pour y″ + p(t)y′ + q(t)y = 0, W(t) = W(t₀)·e^(+∫ de t₀ à t de p). »
  · Vrai [a2_wronskian_abel_sign]   ✔ Faux
  pièges : a2_wronskian_abel_sign

```

### Niveau 5

```
On considère t²y′′ − 2ty′ + 2y = 0 (t > 0). A : t est une solution. B : la solution générale est y = C_1t + C_2t².
  ✔ A vraie, B vraie   · A vraie, B fausse   · A fausse, B vraie   · A fausse, B fausse

On considère ty′′ + (1 − 2t)y′ + (t − 1)y = 0 (t > 0). A : e^t est une solution. B : la solution générale est y = (C_1 + C_2ln(t))e^t.
  ✔ A vraie, B vraie   · A vraie, B fausse   · A fausse, B vraie   · A fausse, B fausse

On considère y′′ − 3y′ + 2y = 0. A : e^t est une solution. B : la solution générale est y = C_1e^t + C_2e^(−2t).
  · A vraie, B vraie   ✔ A vraie, B fausse   · A fausse, B vraie   · A fausse, B fausse

```

### Variantes d'examen

```
On considère ty′′ + (1 − 2t)y′ + (t − 1)y = 0 (t > 0). A : e^t est une solution. B : la solution générale est y = (C_1 + C_2ln(t))e^t.
  ✔ A vraie, B vraie   · A vraie, B fausse   · A fausse, B vraie   · A fausse, B fausse
  [examen mcq]

Vrai ou faux ? « t² et t|t| ont un wronskien nul sur ℝ, donc elles sont linéairement dépendantes sur [−1 ; 1]. »
  · Vrai   ✔ Faux
  [examen tf]

```

## Solution particulière, résonance, problème de Cauchy (`a2-ode-particular`, BA2)

_Forme de y_p selon le second membre, résonance (facteur x), puis y = y_h + y_p et les conditions initiales._

### Niveau 1

```
Trouve la solution générale de y′′ − 4y = −16e^(2x). Solution homogène : y_h = C_1e^(−2x) + C_2e^(2x).
  [guided]  (Axe^(2x))′′ − 4(Axe^(2x))
    (Remplace y_p = Axe^(2x) dans le membre de gauche :)
    = □Ae^(2x)   (trous : 4Ae^(2x))   ← y_p = A x e^(2x) remplacée dans le membre de gauche
  — Identifie les coefficients de 4Ae^(2x) = −16e^(2x) :  [juge system]  départ : 4A = −16
    = A = −4   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ − 4y = −16e^(2x)
    = y_p = □xe^(2x)   (trous : y_p = −4xe^(2x))   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ − 4y = −16e^(2x)
    = y = C_1e^(−2x) + C_2e^(2x)□   (trous : y = C_1e^(−2x) + C_2e^(2x) − 4xe^(2x))   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = −2 ou r = 2. 2 est racine : multiplie la forme habituelle par x. | y_p = Axe^(2x), et 4Ae^(2x) = −16e^(2x). | y_p = −4xe^(2x)

Trouve la solution générale de y′′ + y = 2sin(x). Solution homogène : y_h = C_1cos(x) + C_2sin(x).
  [guided]  (x(Acos(x) + Bsin(x)))′′ + (x(Acos(x) + Bsin(x)))
    (Remplace y_p = x(Acos(x) + Bsin(x)) dans le membre de gauche :)
    = □Bcos(x) − 2Asin(x)   (trous : 2Bcos(x) − 2Asin(x))   ← y_p = x(A cos(x)+B sin(x)) remplacée dans le membre de gauche
  — Identifie les coefficients de 2Bcos(x) − 2Asin(x) = 2sin(x) :  [juge system]  départ : −2A = 2 ; 2B = 0
    = A = −1 ; B = 0   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ + y = 2sin(x)
    = y_p = −xcos(x)   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ + y = 2sin(x)
    = y = C_1cos(x) + C_2sin(x)□   (trous : y = C_1cos(x) + C_2sin(x) − xcos(x))   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = i ou r = −i. i est racine : multiplie la forme habituelle par x. | y_p = x(Acos(x) + Bsin(x)), et 2Bcos(x) − 2Asin(x) = 2sin(x). | y_p = −xcos(x)

Trouve la solution générale de y′′ + 4y′ + 13y = 40sin(x). Solution homogène : y_h = e^(−2x)(C_1cos(3x) + C_2sin(3x)).
  [guided]  (Acos(x) + Bsin(x))′′ + 4(Acos(x) + Bsin(x))′ + 13(Acos(x) + Bsin(x))
    (Remplace y_p = Acos(x) + Bsin(x) dans le membre de gauche :)
    = (□A + 4B)cos(x) + (−4A + 12B)sin(x)   (trous : (12A + 4B)cos(x) + (−4A + 12B)sin(x))   ← y_p = A cos(x)+B sin(x) remplacée dans le membre de gauche
  — Identifie les coefficients de (12A + 4B)cos(x) + (−4A + 12B)sin(x) = 40sin(x) :  [juge system]  départ : 12A + 4B = 0 ; −4A + 12B = 40
    = A = −1 ; B = 3   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ + 4y′ + 13y = 40sin(x)
    = y_p = −cos(x) + □sin(x)   (trous : y_p = −cos(x) + 3sin(x))   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ + 4y′ + 13y = 40sin(x)
    = y = e^(−2x)(C_1cos(3x) + C_2sin(3x))□   (trous : y = e^(−2x)(C_1cos(3x) + C_2sin(3x)) − cos(x) + 3sin(x))   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = −2 + 3i ou r = −2 − 3i. i n'est pas racine : la forme habituelle suffit. | y_p = Acos(x) + Bsin(x), et (12A + 4B)cos(x) + (−4A + 12B)sin(x) = 40sin(x). | y_p = −cos(x) + 3sin(x)
  pièges : g6_cos_sign

```

### Niveau 2

```
Trouve la solution générale de y′′ − 3y′ + 2y = −3e^x.
  [guided]  y′′ − 3y′ + 2y = −3e^x
    (Solution de l'équation homogène y′′ − 3y′ + 2y = 0 :)
    = y_h = C_1e^x + C_2e^(2x)   ← Solution de l'équation homogène
  — Remplace y_p = Axe^x dans le membre de gauche :  [juge equiv]  départ : (Axe^x)′′ − 3(Axe^x)′ + 2(Axe^x)
    ? Quelle forme pour y_p ? · <math alttext="Ae^x"><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mi>x</mi></msup></mrow></math> / ✔ <math alttext="Axe^x"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mi>x</mi></msup></mrow></math> / · <math alttext="Ax²e^x"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mi>x</mi></msup></mrow></math>
    = −Ae^x   ← y_p = A x e^x remplacée dans le membre de gauche
  — Identifie les coefficients de −Ae^x = −3e^x :  [juge system]  départ : −A = −3
    = A = 3   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ − 3y′ + 2y = −3e^x
    = y_p = □xe^x   (trous : y_p = 3xe^x)   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ − 3y′ + 2y = −3e^x
    = y = C_1e^x + C_2e^(2x) + 3xe^x   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = 1 ou r = 2. 1 est racine : multiplie la forme habituelle par x. | y_p = Axe^x, et −Ae^x = −3e^x. | y_p = 3xe^x
  pièges : a2_ode_ic_before_particular, a2_ode_resonance_no_x

Trouve la solution générale de y′′ − 4y′ = 15e^(−x).
  [guided]  y′′ − 4y′ = 15e^(−x)
    (Solution de l'équation homogène y′′ − 4y′ = 0 :)
    = y_h = C_1 + C_2e^(4x)   ← Solution de l'équation homogène
  — Remplace y_p = Ae^(−x) dans le membre de gauche :  [juge equiv]  départ : (Ae^(−x))′′ − 4(Ae^(−x))′
    ? Quelle forme pour y_p ? ✔ <math alttext="Ae^(−x)"><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></math> / · <math alttext="Axe^(−x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></math> / · <math alttext="Ax²e^(−x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></math>
    = □Ae^(−x)   (trous : 5Ae^(−x))   ← y_p = A e^(-x) remplacée dans le membre de gauche
  — Identifie les coefficients de 5Ae^(−x) = 15e^(−x) :  [juge system]  départ : 5A = 15
    = A = 3   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ − 4y′ = 15e^(−x)
    = y_p = □e^(−x)   (trous : y_p = 3e^(−x))   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ − 4y′ = 15e^(−x)
    = y = C_1 + C_2e^(4x) + 3e^(−x)   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = 0 ou r = 4. -1 n'est pas racine : la forme habituelle suffit. | y_p = Ae^(−x), et 5Ae^(−x) = 15e^(−x). | y_p = 3e^(−x)
  pièges : a2_ode_ic_before_particular

Trouve la solution générale de y′′ + 4y′ + 13y = −40cos(3x).
  [guided]  y′′ + 4y′ + 13y = −40cos(3x)
    (Solution de l'équation homogène y′′ + 4y′ + 13y = 0 :)
    = y_h = e^(−2x)(C_1cos(3x) + C_2sin(3x))   ← Solution de l'équation homogène
  — Remplace y_p = Acos(3x) + Bsin(3x) dans le membre de gauche :  [juge equiv]  départ : (Acos(3x) + Bsin(3x))′′ + 4(Acos(3x) + Bsin(3x))′ + 13(Acos(3x) + Bsin(3x))
    ? Quelle forme pour y_p ? ✔ <math alttext="Acos(3x) + Bsin(3x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / · <math alttext="Acos(3x)"><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> / · <math alttext="x(Acos(3x) + Bsin(3x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
    = (□A + □B)cos(3x) + (−12A + 4B)sin(3x)   (trous : (4A + 12B)cos(3x) + (−12A + 4B)sin(3x))   ← y_p = A cos(3x)+B sin(3x) remplacée dans le membre de gauche
  — Identifie les coefficients de (4A + 12B)cos(3x) + (−12A + 4B)sin(3x) = −40cos(3x) :  [juge system]  départ : 4A + 12B = −40 ; −12A + 4B = 0
    = A = −1 ; B = −3   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ + 4y′ + 13y = −40cos(3x)
    = y_p = −cos(3x)□sin(3x)   (trous : y_p = −cos(3x) − 3sin(3x))   ← Les coefficients dans la forme
  — La solution générale :  [juge ode]  départ : y′′ + 4y′ + 13y = −40cos(3x)
    = y = e^(−2x)(C_1cos(3x) + C_2sin(3x)) − cos(3x) − 3sin(3x)   ← y = y_h + y_p
  aides : Racines de l'équation caractéristique : r = −2 + 3i ou r = −2 − 3i. 3i n'est pas racine : la forme habituelle suffit. | y_p = Acos(3x) + Bsin(3x), et (4A + 12B)cos(3x) + (−12A + 4B)sin(3x) = −40cos(3x). | y_p = −cos(3x) − 3sin(3x)
  pièges : a2_ode_ic_before_particular, a2_ode_yp_incomplete

```

### Niveau 3

```
Résous y′′ + y′ − 6y = −15e^(−3x) avec y(0) = 1 et y′(0) = 0.
  [tap, suivre l'erreur, menu steps]  y′′ + y′ − 6y = −15e^(−3x)
    (Solution de l'équation homogène y′′ + y′ − 6y = 0 :)
    = y_h = C_1e^(−3x) + C_2e^(2x)   ← Solution de l'équation homogène
  — Remplace y_p = Axe^(−3x) dans le membre de gauche :  [juge equiv]  départ : (Axe^(−3x))′′ + (Axe^(−3x))′ − 6(Axe^(−3x))
    ? Le second membre est <math alttext="−15e^(−3x)"><mrow><mrow><mo>−</mo><mn>15</mn></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math>. Est-ce un cas de résonance ? · m = -3 n'est pas racine de l'équation caractéristique / ✔ m = -3 est racine simple / · m = -3 est racine double
    ? Quelle forme pour y_p ? · <math alttext="Ae^(−3x)"><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / ✔ <math alttext="Axe^(−3x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / · <math alttext="Ax²e^(−3x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math>
    = −5Ae^(−3x)   ← y_p = A x e^(-3x) remplacée dans le membre de gauche
  — La solution particulière :  [juge ode]  départ : y′′ + y′ − 6y = −15e^(−3x)
    = y_p = 3xe^(−3x)   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ + y′ − 6y = −15e^(−3x)
    = y = C_1e^(−3x) + C_2e^(2x) + 3xe^(−3x)   ← y = y_h + y_p
    = C_1 = 1 ; C_2 = 0   ← y(0) = 1, y′(0) = 0
    = y = e^(−3x) + 3xe^(−3x)   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = −3 ou r = 2. -3 est racine : multiplie la forme habituelle par x. | y_p = Axe^(−3x), et −5Ae^(−3x) = −15e^(−3x). | y_p = 3xe^(−3x)
  pièges : a2_ode_ic_before_particular, a2_ode_resonance_no_x

Résous y′′ − 6y′ + 8y = 4e^(4x) avec y(0) = −1 et y′(0) = 0.
  [tap, suivre l'erreur, menu steps]  y′′ − 6y′ + 8y = 4e^(4x)
    (Solution de l'équation homogène y′′ − 6y′ + 8y = 0 :)
    = y_h = C_1e^(2x) + C_2e^(4x)   ← Solution de l'équation homogène
  — Remplace y_p = Axe^(4x) dans le membre de gauche :  [juge equiv]  départ : (Axe^(4x))′′ − 6(Axe^(4x))′ + 8(Axe^(4x))
    ? Le second membre est <math alttext="4e^(4x)"><mrow><mn>4</mn><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math>. Est-ce un cas de résonance ? · m = 4 n'est pas racine de l'équation caractéristique / ✔ m = 4 est racine simple / · m = 4 est racine double
    ? Quelle forme pour y_p ? · <math alttext="Ae^(4x)"><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / ✔ <math alttext="Axe^(4x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / · <math alttext="Ax²e^(4x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>4</mn><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math>
    = 2Ae^(4x)   ← y_p = A x e^(4x) remplacée dans le membre de gauche
  — La solution particulière :  [juge ode]  départ : y′′ − 6y′ + 8y = 4e^(4x)
    = y_p = 2xe^(4x)   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ − 6y′ + 8y = 4e^(4x)
    = y = C_1e^(2x) + C_2e^(4x) + 2xe^(4x)   ← y = y_h + y_p
    = C_1 = −1 ; C_2 = 0   ← y(0) = −1, y′(0) = 0
    = y = −e^(2x) + 2xe^(4x)   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = 2 ou r = 4. 4 est racine : multiplie la forme habituelle par x. | y_p = Axe^(4x), et 2Ae^(4x) = 4e^(4x). | y_p = 2xe^(4x)
  pièges : a2_ode_ic_before_particular, a2_ode_resonance_no_x

Résous y′′ + 4y = 8cos(2x) avec y(0) = −2 et y′(0) = 6.
  [tap, suivre l'erreur, menu steps]  y′′ + 4y = 8cos(2x)
    (Solution de l'équation homogène y′′ + 4y = 0 :)
    = y_h = C_1cos(2x) + C_2sin(2x)   ← Solution de l'équation homogène
  — Remplace y_p = x(Acos(2x) + Bsin(2x)) dans le membre de gauche :  [juge equiv]  départ : (x(Acos(2x) + Bsin(2x)))′′ + 4(x(Acos(2x) + Bsin(2x)))
    ? Le second membre est <math alttext="8cos(2x)"><mrow><mn>8</mn><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math>. Est-ce un cas de résonance ? · 2i n'est pas racine de l'équation caractéristique / ✔ 2i est racine simple
    ? Quelle forme pour y_p ? · <math alttext="Acos(2x) + Bsin(2x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / ✔ <math alttext="x(Acos(2x) + Bsin(2x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x²(Acos(2x) + Bsin(2x))"><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
    = 4Bcos(2x) − 4Asin(2x)   ← y_p = x(A cos(2x)+B sin(2x)) remplacée dans le membre de gauche
  — La solution particulière :  [juge ode]  départ : y′′ + 4y = 8cos(2x)
    = y_p = 2xsin(2x)   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ + 4y = 8cos(2x)
    = y = C_1cos(2x) + C_2sin(2x) + 2xsin(2x)   ← y = y_h + y_p
    = C_1 = −2 ; C_2 = 3   ← y(0) = −2, y′(0) = 6
    = y = −2cos(2x) + 3sin(2x) + 2xsin(2x)   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = 2i ou r = −2i. 2i est racine : multiplie la forme habituelle par x. | y_p = x(Acos(2x) + Bsin(2x)), et 4Bcos(2x) − 4Asin(2x) = 8cos(2x). | y_p = 2xsin(2x)
  pièges : a2_ode_resonance_no_x

```

### Niveau 4

```
Résous y′′ − 4y′ + 3y = −6x + 2 avec y(0) = −2 et y′(0) = 0.
  [free, suivre l'erreur]  y′′ − 4y′ + 3y = −6x + 2
    (Solution de l'équation homogène y′′ − 4y′ + 3y = 0 :)
    = y_h = C_1e^x + C_2e^(3x)   ← Solution de l'équation homogène
  — Remplace y_p = Ax + B dans le membre de gauche :  [juge equiv]  départ : (Ax + B)′′ − 4(Ax + B)′ + 3(Ax + B)
    ? Quelle forme pour y_p ? ✔ <math alttext="Ax + B"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mi>B</mi></mrow></math> / · <math alttext="Ax"><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow></math> / · <math alttext="x(Ax + B)"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>+</mo><mi>B</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
    = 3Ax − 4A + 3B   ← y_p = A x+B remplacée dans le membre de gauche
  — Identifie les coefficients de 3Ax − 4A + 3B = −6x + 2 :  [juge system]  départ : −4A + 3B = 2 ; 3A = −6
    = A = −2 ; B = −2   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ − 4y′ + 3y = −6x + 2
    = y_p = −2x − 2   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ − 4y′ + 3y = −6x + 2
    = y = C_1e^x + C_2e^(3x) − 2x − 2   ← y = y_h + y_p
    = C_1 = −1 ; C_2 = 1   ← y(0) = −2, y′(0) = 0
    = y = −e^x + e^(3x) − 2x − 2   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = 1 ou r = 3. 0 n'est pas racine : la forme habituelle suffit. | y_p = Ax + B, et 3Ax − 4A + 3B = −6x + 2. | y_p = −2x − 2
  pièges : a2_ode_ic_before_particular, a2_ode_yp_incomplete

Résous y′′ + 4y′ + 4y = 25cos(x) avec y(0) = 0 et y′(0) = 7.
  [free, suivre l'erreur]  y′′ + 4y′ + 4y = 25cos(x)
    (Solution de l'équation homogène y′′ + 4y′ + 4y = 0 :)
    = y_h = (C_1 + C_2x)e^(−2x)   ← Solution de l'équation homogène
  — Remplace y_p = Acos(x) + Bsin(x) dans le membre de gauche :  [juge equiv]  départ : (Acos(x) + Bsin(x))′′ + 4(Acos(x) + Bsin(x))′ + 4(Acos(x) + Bsin(x))
    ? Quelle forme pour y_p ? ✔ <math alttext="Acos(x) + Bsin(x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / · <math alttext="Acos(x)"><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></math> / · <math alttext="x(Acos(x) + Bsin(x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
    = (3A + 4B)cos(x) + (−4A + 3B)sin(x)   ← y_p = A cos(x)+B sin(x) remplacée dans le membre de gauche
  — Identifie les coefficients de (3A + 4B)cos(x) + (−4A + 3B)sin(x) = 25cos(x) :  [juge system]  départ : 3A + 4B = 25 ; −4A + 3B = 0
    = A = 3 ; B = 4   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ + 4y′ + 4y = 25cos(x)
    = y_p = 3cos(x) + 4sin(x)   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ + 4y′ + 4y = 25cos(x)
    = y = (C_1 + C_2x)e^(−2x) + 3cos(x) + 4sin(x)   ← y = y_h + y_p
    = C_1 = −3 ; C_2 = −3   ← y(0) = 0, y′(0) = 7
    = y = −3e^(−2x) − 3xe^(−2x) + 3cos(x) + 4sin(x)   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = −2. i n'est pas racine : la forme habituelle suffit. | y_p = Acos(x) + Bsin(x), et (3A + 4B)cos(x) + (−4A + 3B)sin(x) = 25cos(x). | y_p = 3cos(x) + 4sin(x)
  pièges : a2_ode_ic_before_particular, a2_ode_yp_incomplete

Résous y′′ + 4y = −4cos(2x) avec y(0) = −3 et y′(0) = 6.
  [free, suivre l'erreur]  y′′ + 4y = −4cos(2x)
    (Solution de l'équation homogène y′′ + 4y = 0 :)
    = y_h = C_1cos(2x) + C_2sin(2x)   ← Solution de l'équation homogène
  — Remplace y_p = x(Acos(2x) + Bsin(2x)) dans le membre de gauche :  [juge equiv]  départ : (x(Acos(2x) + Bsin(2x)))′′ + 4(x(Acos(2x) + Bsin(2x)))
    ? Quelle forme pour y_p ? · <math alttext="Acos(2x) + Bsin(2x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / ✔ <math alttext="x(Acos(2x) + Bsin(2x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x²(Acos(2x) + Bsin(2x))"><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
    = 4Bcos(2x) − 4Asin(2x)   ← y_p = x(A cos(2x)+B sin(2x)) remplacée dans le membre de gauche
  — Identifie les coefficients de 4Bcos(2x) − 4Asin(2x) = −4cos(2x) :  [juge system]  départ : −4A = 0 ; 4B = −4
    = A = 0 ; B = −1   ← Résoudre
  — La solution particulière :  [juge ode]  départ : y′′ + 4y = −4cos(2x)
    = y_p = −xsin(2x)   ← Les coefficients dans la forme
  — La solution générale, puis les conditions initiales :  [juge ode]  départ : y′′ + 4y = −4cos(2x)
    = y = C_1cos(2x) + C_2sin(2x) − xsin(2x)   ← y = y_h + y_p
    = C_1 = −3 ; C_2 = 3   ← y(0) = −3, y′(0) = 6
    = y = −3cos(2x) + 3sin(2x) − xsin(2x)   ← La solution du problème de Cauchy
  aides : Racines de l'équation caractéristique : r = 2i ou r = −2i. 2i est racine : multiplie la forme habituelle par x. | y_p = x(Acos(2x) + Bsin(2x)), et 4Bcos(2x) − 4Asin(2x) = −4cos(2x). | y_p = −xsin(2x)
  pièges : a2_ode_resonance_no_x

```

### Niveau 5

```
Trouve la solution de u′′ + 9u = −6sin(3x) avec u(0) = 0 et u′(0) = 10, puis calcule u(π/2).
  [problème, 10 points]
  partie 1 (Début du problème : 1 ; Solution de l'équation homogène u′′ + 9u = 0 : 1 ; Remplace u_p = x(Acos(3x) + Bsin(3x)) dans le membre de gauche : 2 ; Identifie les coefficients de 6Bcos(3x) − 6Asin(3x) = −6sin(3x) : 1 ; La solution particulière : 1 ; La solution générale, puis les conditions initiales : 3 ; La valeur demandée : 1)
    [free, sans aide, suivre l'erreur]  r² + 9 = 0
      (Équation caractéristique : ses racines.)
      = r = 3i ou r = −3i   ← Racines de l'équation caractéristique
    — Solution de l'équation homogène u′′ + 9u = 0 :  [juge ode]  départ : u′′ + 9u = −6sin(3x)
      = u_h = C_1cos(3x) + C_2sin(3x)   ← Solution de l'équation homogène
    — Remplace u_p = x(Acos(3x) + Bsin(3x)) dans le membre de gauche :  [juge equiv]  départ : (x(Acos(3x) + Bsin(3x)))′′ + 9(x(Acos(3x) + Bsin(3x)))
      ? Quelle forme pour u_p ? · <math alttext="Acos(3x) + Bsin(3x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / ✔ <math alttext="x(Acos(3x) + Bsin(3x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x²(Acos(3x) + Bsin(3x))"><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
      = 6Bcos(3x) − 6Asin(3x)   ← u_p = x(A cos(3x)+B sin(3x)) remplacée dans le membre de gauche
    — Identifie les coefficients de 6Bcos(3x) − 6Asin(3x) = −6sin(3x) :  [juge system]  départ : −6A = −6 ; 6B = 0
      = A = 1 ; B = 0   ← Résoudre
    — La solution particulière :  [juge ode]  départ : u′′ + 9u = −6sin(3x)
      = u_p = xcos(3x)   ← Les coefficients dans la forme
    — La solution générale, puis les conditions initiales :  [juge ode]  départ : u′′ + 9u = −6sin(3x)
      = u = C_1cos(3x) + C_2sin(3x) + xcos(3x)   ← y = y_h + y_p
      = C_1 = 0 ; C_2 = 3   ← u(0) = 0, u′(0) = 10
      = u = 3sin(3x) + xcos(3x)   ← La solution du problème de Cauchy
    — La valeur demandée :  [juge value]  départ : u(π/2)
      = −3   ← Remplacer x par π/2
  pièges : c_sqrt_i, a2_ode_resonance_no_x

Trouve la solution de u′′ + 7u′ + 12u = 2e^(−4x) avec u(0) = −1 et u′(0) = 4, puis calcule u(1).
  [problème, 10 points]
  partie 1 (Début du problème : 1 ; Solution de l'équation homogène u′′ + 7u′ + 12u = 0 : 1 ; Remplace u_p = Axe^(−4x) dans le membre de gauche : 2 ; Identifie les coefficients de −Ae^(−4x) = 2e^(−4x) : 1 ; La solution particulière : 1 ; La solution générale, puis les conditions initiales : 3 ; La valeur demandée : 1)
    [free, sans aide, suivre l'erreur]  r² + 7r + 12 = 0
      (Équation caractéristique : ses racines.)
      = r = −4 ou r = −3   ← Racines de l'équation caractéristique
    — Solution de l'équation homogène u′′ + 7u′ + 12u = 0 :  [juge ode]  départ : u′′ + 7u′ + 12u = 2e^(−4x)
      = u_h = C_1e^(−4x) + C_2e^(−3x)   ← Solution de l'équation homogène
    — Remplace u_p = Axe^(−4x) dans le membre de gauche :  [juge equiv]  départ : (Axe^(−4x))′′ + 7(Axe^(−4x))′ + 12(Axe^(−4x))
      ? Quelle forme pour u_p ? · <math alttext="Ae^(−4x)"><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / ✔ <math alttext="Axe^(−4x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math> / · <math alttext="Ax²e^(−4x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup></mrow><mo>&#x2062;</mo><msup><mrow><mi>e</mi></mrow><mrow><mrow><mo>−</mo><mn>4</mn></mrow><mo>&#x2062;</mo><mi>x</mi></mrow></msup></mrow></math>
      = −Ae^(−4x)   ← u_p = A x e^(-4x) remplacée dans le membre de gauche
    — Identifie les coefficients de −Ae^(−4x) = 2e^(−4x) :  [juge system]  départ : −A = 2
      = A = −2   ← Résoudre
    — La solution particulière :  [juge ode]  départ : u′′ + 7u′ + 12u = 2e^(−4x)
      = u_p = −2xe^(−4x)   ← Les coefficients dans la forme
    — La solution générale, puis les conditions initiales :  [juge ode]  départ : u′′ + 7u′ + 12u = 2e^(−4x)
      = u = C_1e^(−4x) + C_2e^(−3x) − 2xe^(−4x)   ← y = y_h + y_p
      = C_1 = −3 ; C_2 = 2   ← u(0) = −1, u′(0) = 4
      = u = −3e^(−4x) + 2e^(−3x) − 2xe^(−4x)   ← La solution du problème de Cauchy
    — La valeur demandée :  [juge value]  départ : u(1)
      = −5e^(−4) + 2e^(−3)   ← Remplacer x par 1
  pièges : a2_ode_resonance_no_x

Trouve la solution de u′′ + 9u = 12cos(3x) avec u(0) = 1 et u′(0) = 6, puis calcule u(π).
  [problème, 10 points]
  partie 1 (Début du problème : 1 ; Solution de l'équation homogène u′′ + 9u = 0 : 1 ; Remplace u_p = x(Acos(3x) + Bsin(3x)) dans le membre de gauche : 2 ; Identifie les coefficients de 6Bcos(3x) − 6Asin(3x) = 12cos(3x) : 1 ; La solution particulière : 1 ; La solution générale, puis les conditions initiales : 3 ; La valeur demandée : 1)
    [free, sans aide, suivre l'erreur]  r² + 9 = 0
      (Équation caractéristique : ses racines.)
      = r = 3i ou r = −3i   ← Racines de l'équation caractéristique
    — Solution de l'équation homogène u′′ + 9u = 0 :  [juge ode]  départ : u′′ + 9u = 12cos(3x)
      = u_h = C_1cos(3x) + C_2sin(3x)   ← Solution de l'équation homogène
    — Remplace u_p = x(Acos(3x) + Bsin(3x)) dans le membre de gauche :  [juge equiv]  départ : (x(Acos(3x) + Bsin(3x)))′′ + 9(x(Acos(3x) + Bsin(3x)))
      ? Quelle forme pour u_p ? · <math alttext="Acos(3x) + Bsin(3x)"><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></math> / ✔ <math alttext="x(Acos(3x) + Bsin(3x))"><mrow><mi>x</mi><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math> / · <math alttext="x²(Acos(3x) + Bsin(3x))"><mrow><msup><mrow><mi>x</mi></mrow><mn>2</mn></msup><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>A</mi><mo>&#x2062;</mo><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow><mo>+</mo><mrow><mi>B</mi><mo>&#x2062;</mo><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></math>
      = 6Bcos(3x) − 6Asin(3x)   ← u_p = x(A cos(3x)+B sin(3x)) remplacée dans le membre de gauche
    — Identifie les coefficients de 6Bcos(3x) − 6Asin(3x) = 12cos(3x) :  [juge system]  départ : −6A = 0 ; 6B = 12
      = A = 0 ; B = 2   ← Résoudre
    — La solution particulière :  [juge ode]  départ : u′′ + 9u = 12cos(3x)
      = u_p = 2xsin(3x)   ← Les coefficients dans la forme
    — La solution générale, puis les conditions initiales :  [juge ode]  départ : u′′ + 9u = 12cos(3x)
      = u = C_1cos(3x) + C_2sin(3x) + 2xsin(3x)   ← y = y_h + y_p
      = C_1 = 1 ; C_2 = 2   ← u(0) = 1, u′(0) = 6
      = u = cos(3x) + 2sin(3x) + 2xsin(3x)   ← La solution du problème de Cauchy
    — La valeur demandée :  [juge value]  départ : u(π)
      = −1   ← Remplacer x par π
  pièges : c_sqrt_i, a2_ode_resonance_no_x

```

### Variantes d'examen

```
Soit u la solution de u′′ − 2u′ + 10u = −20e^(2x) avec u(0) = 1 et u′(0) = 5. Alors u(π) vaut :
  · −2e^π − e^(2π)   ✔ −3e^π − 2e^(2π)   · e^π + 2e^(2π)   · −e^π − 2e^(2π) [a2_ode_ic_before_particular]
  [examen mcq]
  pièges : a2_ode_ic_before_particular

Vrai ou faux ? « Pour y′′ − 2y′ − 8y = 24x − 10, il existe une solution particulière de la forme y_p = Ax + B. »
  ✔ Vrai   · Faux
  [examen tf]

```

## Choisir la méthode (organigramme des EDO) (`a2-ode-choose`, BA2)

_Ordre, séparable, linéaire, homogène : la case de l'organigramme, puis la méthode la plus courte._

### Niveau 1

```
Choisis la méthode, puis résous y′′ − 4y′ + 3y = 0 (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  y′′ − 4y′ + 3y = 0
    ? Est-ce une équation d'ordre 2 à coefficients constants ? ✔ Oui / · Non
    (Équation caractéristique : r² − 4r + 3 = 0.)
    = y = C_1e^x + C_2e^(3x)   ← Racines r = 1 et r = 3
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Coefficients constants : équation caractéristique. | y = C_1e^x + C_2e^(3x)

Choisis la méthode, puis résous y′ = y + 2x (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  y′ = y + 2x
    ? Est-ce une équation d'ordre 2 à coefficients constants ? · Oui / ✔ Non
    ? Est-elle séparable : y′ = g(x)·h(y) ? · Oui / ✔ Non
    ? Est-elle linéaire : y′ = a(x)y + b(x) ? ✔ Oui / · Non
    = y′ − y = □x   (trous : y′ − y = 2x)   ← Forme y′ + a(x)y = b(x)
    = μ = e^(−x)   ← Facteur intégrant
    = y = Ce^x − □x − 2   (trous : y = Ce^x − 2x − 2)   ← (μy)′ = μb, intégrer par parties
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Linéaire : facteur intégrant μ. | y′ − y = 2x
  pièges : a2_ode_method_separable_sum

Choisis la méthode, puis résous y′ = (xy + 2y²)/x² (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  y′ = (xy + 2y²)/x²
    ? Est-ce une équation d'ordre 2 à coefficients constants ? · Oui / ✔ Non
    ? Est-elle séparable : y′ = g(x)·h(y) ? · Oui / ✔ Non
    ? Est-elle linéaire : y′ = a(x)y + b(x) ? · Oui / ✔ Non
    ? Est-elle homogène : y′ = F(y/x) ? ✔ Oui / · Non
    (Avec y = xv, y′ = v + xv′ : l'équation devient xv′ = 2v².)
    = dv/v² = (2/x)dx   ← Séparer
    = −1/v = □ln(x) + C   (trous : −1/v = 2ln(x) + C)   ← Intégrer
    = v = −1/(2ln(x) + C)   ← Isoler v
  — Retour à y = xv :  [juge ode]  départ : y′ = (xy + 2y²)/x²
    = y = −x/(2ln(x) + C)   ← y = xv
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Homogène : poser y = xv. | dv/v² = (2/x)dx
  pièges : a2_ode_method_linear_nonlinear

```

### Niveau 2

```
Choisis la méthode, puis résous y′ = 3y − 6 (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  z′ = 3z
    (La solution constante est y = 2 ; on pose y = 2 + z :)
    ? Quelle méthode ? ✔ Linéaire à coefficients constants : décaler vers la solution constante / ✔ Séparer les variables / ✔ Linéaire : facteur intégrant μ / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique
    = z = Ce^(3x)   ← z′ = az
  — Retour à y :  [juge ode]  départ : y′ = 3y − 6
    = y = 2 + Ce^(3x)   ← y = 2 + z
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Linéaire à coefficients constants : décaler vers la solution constante. | z = Ce^(3x)

Choisis la méthode, puis résous y′ = 2y − 4x (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  y′ = 2y − 4x
    ? Quelle méthode ? ✔ Linéaire : facteur intégrant μ / · Séparer les variables / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    = y′ − □y = −□x   (trous : y′ − 2y = −4x)   ← Forme y′ + a(x)y = b(x)
    = μ = e^(−2x)   ← Facteur intégrant
    = y = Ce^(2x) + □x + 1   (trous : y = Ce^(2x) + 2x + 1)   ← (μy)′ = μb, intégrer par parties
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Linéaire : facteur intégrant μ. | y′ − 2y = −4x
  pièges : a2_ode_method_separable_sum

Choisis la méthode, puis résous y′ = 3y − 9 (solution générale). L'organigramme :Ordre ? Ordre 2 linéaire à coefficients constants : équation caractéristique.Séparable ? y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.Linéaire ? y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.Homogène ? y′ = F(y/x) : poser y = xv.
  [guided]  z′ = 3z
    (La solution constante est y = 3 ; on pose y = 3 + z :)
    ? Quelle méthode ? ✔ Linéaire à coefficients constants : décaler vers la solution constante / ✔ Séparer les variables / ✔ Linéaire : facteur intégrant μ / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique
    = z = Ce^(3x)   ← z′ = az
  — Retour à y :  [juge ode]  départ : y′ = 3y − 9
    = y = 3 + Ce^(3x)   ← y = 3 + z
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Linéaire à coefficients constants : décaler vers la solution constante. | z = Ce^(3x)

```

### Niveau 3

```
Choisis la méthode, puis résous y′ = −cos(x)(1 + y²) (solution générale).
  [tap, suivre l'erreur, menu steps]  y′ = −cos(x)(1 + y²)
    ? Quelle méthode ? ✔ Séparer les variables / · Linéaire : facteur intégrant μ / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    = dy/(1 + y²) = −cos(x)dx   ← Séparer
    = arctan(y) = −sin(x) + C   ← Intégrer
    = y = tan(−sin(x) + C)   ← Isoler y
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Séparer les variables. | dy/(1 + y²) = −cos(x)dx
  pièges : a2_ode_method_linear_nonlinear

Choisis la méthode, puis résous y′ = (xy + 2y²)/x² (solution générale).
  [tap, suivre l'erreur, menu steps]  y′ = (xy + 2y²)/x²
    ? Quelle méthode ? ✔ Homogène : poser y = xv / · Linéaire : facteur intégrant μ / · Séparer les variables / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    (Avec y = xv, y′ = v + xv′ : l'équation devient xv′ = 2v².)
    = dv/v² = (2/x)dx   ← Séparer
    = −1/v = 2ln(x) + C   ← Intégrer
    = v = −1/(2ln(x) + C)   ← Isoler v
  — Retour à y = xv :  [juge ode]  départ : y′ = (xy + 2y²)/x²
    = y = −x/(2ln(x) + C)   ← y = xv
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Homogène : poser y = xv. | dv/v² = (2/x)dx
  pièges : a2_ode_method_linear_nonlinear

Choisis la méthode, puis résous y′ = y + x (solution générale).
  [tap, suivre l'erreur, menu steps]  y′ = y + x
    ? Quelle méthode ? ✔ Linéaire : facteur intégrant μ / · Séparer les variables / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    = y′ − y = x   ← Forme y′ + a(x)y = b(x)
    = μ = e^(−x)   ← Facteur intégrant
    = y = Ce^x − x − 1   ← (μy)′ = μb, intégrer par parties
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Linéaire : facteur intégrant μ. | y′ − y = x
  pièges : a2_ode_method_separable_sum

```

### Niveau 4

```
Choisis la méthode, puis résous y′ = (xy − y²)/x² (solution générale).
  [free, suivre l'erreur]  y′ = (xy − y²)/x²
    ? Quelle méthode ? ✔ Homogène : poser y = xv / · Linéaire : facteur intégrant μ / · Séparer les variables / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    (Avec y = xv, y′ = v + xv′ : l'équation devient xv′ = −v².)
    = dv/v² = (−1/x)dx   ← Séparer
    = −1/v = −ln(x) + C   ← Intégrer
    = v = −1/(−ln(x) + C)   ← Isoler v
  — Retour à y = xv :  [juge ode]  départ : y′ = (xy − y²)/x²
    = y = −x/(−ln(x) + C)   ← y = xv
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Homogène : poser y = xv. | dv/v² = (−1/x)dx
  pièges : a2_ode_method_linear_nonlinear

Choisis la méthode, puis résous y′′ − 5y′ + 6y = 0 (solution générale).
  [free, suivre l'erreur]  y′′ − 5y′ + 6y = 0
    ? Quelle méthode ? ✔ Coefficients constants : équation caractéristique / · Séparer les variables / · Linéaire : facteur intégrant μ / · Homogène : poser y = xv / · Linéaire à coefficients constants : décaler vers la solution constante
    (Équation caractéristique : r² − 5r + 6 = 0.)
    = y = C_1e^(2x) + C_2e^(3x)   ← Racines r = 2 et r = 3
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Coefficients constants : équation caractéristique. | y = C_1e^(2x) + C_2e^(3x)

Choisis la méthode, puis résous y′ = e^x(1 + y²) (solution générale).
  [free, suivre l'erreur]  y′ = e^x(1 + y²)
    ? Quelle méthode ? ✔ Séparer les variables / · Linéaire : facteur intégrant μ / · Homogène : poser y = xv / · Coefficients constants : équation caractéristique / · Linéaire à coefficients constants : décaler vers la solution constante
    = dy/(1 + y²) = e^xdx   ← Séparer
    = arctan(y) = e^x + C   ← Intégrer
    = y = tan(e^x + C)   ← Isoler y
  aides : Suis l'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ? | Ici : Séparer les variables. | dy/(1 + y²) = e^xdx
  pièges : a2_ode_method_linear_nonlinear

```

### Niveau 5

```
Résous y′ = −e^xy² (solution générale).
  [free, sans aide]  y′ = −e^xy²
    = dy/y² = −e^xdx   ← Séparer (y = 0 est aussi solution)
    = −1/y = −e^x + C   ← Intégrer
    = y = 1/(e^x + C)   ← Isoler y
  pièges : a2_ode_method_linear_nonlinear

Résous y′ = y/x (solution générale).
  [free, sans aide]  y′ = y/x
    = y = Cx   ← y = Ce^{∫a}

Résous y′ = 3x²y (solution générale).
  [free, sans aide]  y′ = 3x²y
    = y = Ce^(x³)   ← y = Ce^{∫a}

```

### Variantes d'examen

```
Quelle est la méthode la plus directe pour résoudre y′ = −2x(1 + y²) ?
  · Homogène : poser y = xv   · Linéaire : facteur intégrant μ [a2_ode_method_linear_nonlinear]   ✔ Séparer les variables   · Coefficients constants : équation caractéristique
  [examen mcq]
  pièges : a2_ode_method_linear_nonlinear

```

## Stabilité selon un paramètre (`a2-ode-stability`, BA2)

_Toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 ⇔ p > 0 et q > 0, bornes exclues._

### Niveau 1

```
Pour quelles valeurs de a toutes les solutions de y′′ + (3 − a)y′ + 4y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + (3 − a)(e^(rx))′ + 4e^(rx))/e^(rx)
    = r² + (3 − a)r + 4   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : 3 − a > 0 et 4 > 0
    (Critère : toutes les solutions tendent vers 0 ⇔ 3 − a > 0 et 4 > 0 (bornes exclues).)
    = a < □   (trous : a < 3)   ← Chaque inégalité
    = ]−∞ ; □[   (trous : ]−∞ ; 3[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | 3 − a > 0 et 4 > 0, puis l'intersection. | a < 3, donc a ∈ ]−∞ ; 3[.

Pour quelles valeurs de a toutes les solutions de y′′ + (a − 2)y′ + (−a² + 5a − 6)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + (a − 2)(e^(rx))′ + (−a² + 5a − 6)e^(rx))/e^(rx)
    = r² + (a − 2)r − a² + 5a − 6   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a − 2 > 0 et −a² + 5a − 6 > 0
    (Critère : toutes les solutions tendent vers 0 ⇔ a − 2 > 0 et −a² + 5a − 6 > 0 (bornes exclues).)
    = a > □ et □ < a < 3   (trous : a > 2 et 2 < a < 3)   ← Chaque inégalité
    = ]□ ; 3[   (trous : ]2 ; 3[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a − 2 > 0 et −a² + 5a − 6 > 0, puis l'intersection. | a > 2 et 2 < a < 3, donc a ∈ ]2 ; 3[.

Pour quelles valeurs de a toutes les solutions de y′′ + (a + 1)y′ + 2y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + (a + 1)(e^(rx))′ + 2e^(rx))/e^(rx)
    = r² + (a + 1)r + 2   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a + 1 > 0 et 2 > 0
    (Critère : toutes les solutions tendent vers 0 ⇔ a + 1 > 0 et 2 > 0 (bornes exclues).)
    = a > □   (trous : a > −1)   ← Chaque inégalité
    = ]□ ; +∞[   (trous : ]−1 ; +∞[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a + 1 > 0 et 2 > 0, puis l'intersection. | a > −1, donc a ∈ ]−1 ; +∞[.

```

### Niveau 2

```
Pour quelles valeurs de a toutes les solutions de y′′ + ay′ + (−a² + 4a − 3)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + a(e^(rx))′ + (−a² + 4a − 3)e^(rx))/e^(rx)
    = r² + ar − a² + 4a − 3   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a > 0 et −a² + 4a − 3 > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="a &gt; 0"><mrow><mi>a</mi><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="−a² + 4a − 3 &gt; 0"><mrow><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="a² − 4(−a² + 4a − 3)"><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>3</mn></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="a &gt; 0"><mrow><mi>a</mi><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="−a² + 4a − 3 &gt; 0"><mrow><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = 1, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = 0 est racine, y = 1 ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a > □ et □ < a < □   (trous : a > 0 et 1 < a < 3)   ← Chaque inégalité
    = ]□ ; □[   (trous : ]1 ; 3[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a > 0 et −a² + 4a − 3 > 0, puis l'intersection. | a > 0 et 1 < a < 3, donc a ∈ ]1 ; 3[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + (2 − a)y′ + (a² − 2a)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + (2 − a)(e^(rx))′ + (a² − 2a)e^(rx))/e^(rx)
    = r² + (2 − a)r + a² − 2a   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : 2 − a > 0 et a² − 2a > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="2 − a &gt; 0"><mrow><mrow><mn>2</mn><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="a² − 2a &gt; 0"><mrow><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(2 − a)² − 4(a² − 2a)"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mn>2</mn><mo>−</mo><mi>a</mi></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="2 − a &gt; 0"><mrow><mrow><mn>2</mn><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="a² − 2a &gt; 0"><mrow><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = 0, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = 0 est racine, y = 1 ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a < □ et (a < □ ou a > □)   (trous : a < 2 et (a < 0 ou a > 2))   ← Chaque inégalité
    = ]□ ; □[   (trous : ]−∞ ; 0[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | 2 − a > 0 et a² − 2a > 0, puis l'intersection. | a < 2 et (a < 0 ou a > 2), donc a ∈ ]−∞ ; 0[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + (−2 − a)y′ + (−a)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [guided]  ((e^(rx))′′ + (−2 − a)(e^(rx))′ + (−a)e^(rx))/e^(rx)
    = r² + (−2 − a)r − a   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : −2 − a > 0 et −a > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="−2 − a &gt; 0"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="−a &gt; 0"><mrow><mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(−2 − a)² − 4(−a)"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mo>−</mo><mi>a</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="−2 − a &gt; 0"><mrow><mrow><mrow><mo>−</mo><mn>2</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="−a &gt; 0"><mrow><mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = −2, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = ±i√2 est racine, y = cos(√2 x) ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a < □ et a < □   (trous : a < −2 et a < 0)   ← Chaque inégalité
    = ]□ ; □[   (trous : ]−∞ ; −2[)   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | −2 − a > 0 et −a > 0, puis l'intersection. | a < −2 et a < 0, donc a ∈ ]−∞ ; −2[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

```

### Niveau 3

```
Pour quelles valeurs de a toutes les solutions de y′′ + (a − 3)y′ + (a² − 3a)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [tap, suivre l'erreur, menu steps]  ((e^(rx))′′ + (a − 3)(e^(rx))′ + (a² − 3a)e^(rx))/e^(rx)
    = r² + (a − 3)r + a² − 3a   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a − 3 > 0 et a² − 3a > 0
    ? Comment décider ? ✔ Critère des coefficients : p > 0 et q > 0 / ✔ Calculer les racines selon le signe de Δ
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="a − 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>−</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="a² − 3a &gt; 0"><mrow><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(a − 3)² − 4(a² − 3a)"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mi>a</mi><mo>−</mo><mn>3</mn></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="a − 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>−</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="a² − 3a &gt; 0"><mrow><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>3</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = 3, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = 0 est racine, y = 1 ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a > 3 et (a < 0 ou a > 3)   ← Chaque inégalité
    = ]3 ; +∞[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a − 3 > 0 et a² − 3a > 0, puis l'intersection. | a > 3 et (a < 0 ou a > 3), donc a ∈ ]3 ; +∞[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + (3 − a)y′ + (−a² + 5a − 6)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [tap, suivre l'erreur, menu steps]  ((e^(rx))′′ + (3 − a)(e^(rx))′ + (−a² + 5a − 6)e^(rx))/e^(rx)
    = r² + (3 − a)r − a² + 5a − 6   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : 3 − a > 0 et −a² + 5a − 6 > 0
    ? Comment décider ? ✔ Critère des coefficients : p > 0 et q > 0 / ✔ Calculer les racines selon le signe de Δ
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="3 − a &gt; 0"><mrow><mrow><mn>3</mn><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="−a² + 5a − 6 &gt; 0"><mrow><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>6</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(3 − a)² − 4(−a² + 5a − 6)"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mn>3</mn><mo>−</mo><mi>a</mi></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>6</mn></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="3 − a &gt; 0"><mrow><mrow><mn>3</mn><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="−a² + 5a − 6 &gt; 0"><mrow><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>5</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>−</mo><mn>6</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = 2, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = 0 est racine, y = 1 ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a < 3 et 2 < a < 3   ← Chaque inégalité
    = ]2 ; 3[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | 3 − a > 0 et −a² + 5a − 6 > 0, puis l'intersection. | a < 3 et 2 < a < 3, donc a ∈ ]2 ; 3[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + (−3 − a)y′ + 9y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [tap, suivre l'erreur, menu steps]  ((e^(rx))′′ + (−3 − a)(e^(rx))′ + 9e^(rx))/e^(rx)
    = r² + (−3 − a)r + 9   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : −3 − a > 0 et 9 > 0
    ? Comment décider ? ✔ Critère des coefficients : p > 0 et q > 0 / ✔ Calculer les racines selon le signe de Δ
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="−3 − a &gt; 0"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="9 &gt; 0"><mrow><mn>9</mn><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(−3 − a)² − 36"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mn>36</mn></mrow></math> < 0 / · <math alttext="−3 − a &gt; 0"><mrow><mrow><mrow><mo>−</mo><mn>3</mn></mrow><mo>−</mo><mi>a</mi></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = −3, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = ±3i est racine, y = cos(3x) ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = a < −3   ← Chaque inégalité
    = ]−∞ ; −3[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | −3 − a > 0 et 9 > 0, puis l'intersection. | a < −3, donc a ∈ ]−∞ ; −3[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

```

### Niveau 4

```
Pour quelles valeurs de a toutes les solutions de y′′ + (a + 3)y′ + 2y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [free, suivre l'erreur]  ((e^(rx))′′ + (a + 3)(e^(rx))′ + 2e^(rx))/e^(rx)
    = r² + (a + 3)r + 2   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a + 3 > 0 et 2 > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="a + 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="2 &gt; 0"><mrow><mn>2</mn><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(a + 3)² − 8"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mn>8</mn></mrow></math> < 0 / · <math alttext="a + 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = −3, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = ±i√2 est racine, y = cos(√2 x) ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = ]−3 ; +∞[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a + 3 > 0 et 2 > 0, puis l'intersection. | a > −3, donc a ∈ ]−3 ; +∞[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + (a + 3)y′ + 9y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [free, suivre l'erreur]  ((e^(rx))′′ + (a + 3)(e^(rx))′ + 9e^(rx))/e^(rx)
    = r² + (a + 3)r + 9   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a + 3 > 0 et 9 > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="a + 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="9 &gt; 0"><mrow><mn>9</mn><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="(a + 3)² − 36"><mrow><msup><mrow><mo stretchy="false">(</mo><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>−</mo><mn>36</mn></mrow></math> < 0 / · <math alttext="a + 3 &gt; 0"><mrow><mrow><mi>a</mi><mo>+</mo><mn>3</mn></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = −3, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = ±3i est racine, y = cos(3x) ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = ]−3 ; +∞[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a + 3 > 0 et 9 > 0, puis l'intersection. | a > −3, donc a ∈ ]−3 ; +∞[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

Pour quelles valeurs de a toutes les solutions de y′′ + ay′ + (−a² + 2a)y = 0 tendent-elles vers 0 en +∞ ? Écris d'abord le polynôme caractéristique (remplace y par e^(rx)).
  [free, suivre l'erreur]  ((e^(rx))′′ + a(e^(rx))′ + (−a² + 2a)e^(rx))/e^(rx)
    = r² + ar − a² + 2a   ← y = e^{rx}, puis diviser par e^{rx}
  — L'ensemble des valeurs de a :  [juge solset]  départ : a > 0 et −a² + 2a > 0
    ? Toutes les solutions tendent vers 0 si et seulement si : ✔ <math alttext="a &gt; 0"><mrow><mi>a</mi><mo>&gt;</mo><mn>0</mn></mrow></math> et <math alttext="−a² + 2a &gt; 0"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> / · Δ = <math alttext="a² − 4(−a² + 2a)"><mrow><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup><mo>−</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo stretchy="false">)</mo></mrow></mrow></mrow></math> < 0 / · <math alttext="a &gt; 0"><mrow><mi>a</mi><mo>&gt;</mo><mn>0</mn></mrow></math> seulement / · <math alttext="−a² + 2a &gt; 0"><mrow><mrow><mrow><mo>−</mo><msup><mrow><mi>a</mi></mrow><mn>2</mn></msup></mrow><mo>+</mo><mrow><mn>2</mn><mo>&#x2062;</mo><mi>a</mi></mrow></mrow><mo>&gt;</mo><mn>0</mn></mrow></math> seulement
    ? En a = 0, les solutions tendent-elles toutes vers 0 ? ✔ Non : r = 0 est racine, y = 1 ne tend pas vers 0. Inégalités strictes. / · Oui : on garde les bornes
    = ]0 ; 2[   ← Intersection, bornes exclues
  aides : Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues). | a > 0 et −a² + 2a > 0, puis l'intersection. | a > 0 et 0 < a < 2, donc a ∈ ]0 ; 2[.
  pièges : a2_ode_stability_discriminant, a2_ode_stability_one_coef, a2_ode_stability_boundary

```

### Niveau 5

```
Soit X l'ensemble des a ∈ ℝ pour lesquels toutes les solutions de y′′ + (a + 2)y′ + (1 − a²)y = 0 tendent vers 0 en +∞. Alors X =
  · ]−2 ; +∞[ [a2_ode_stability_one_coef]   ✔ ]−1 ; 1[   · [−1 ; 1] [a2_ode_stability_boundary]   · ]−4/5 ; 0[ [a2_ode_stability_discriminant]
  pièges : a2_ode_stability_boundary, a2_ode_stability_one_coef, a2_ode_stability_discriminant

Soit X l'ensemble des a ∈ ℝ pour lesquels toutes les solutions de y′′ + (3 − a)y′ + (a − 1)y = 0 tendent vers 0 en +∞. Alors X =
  · [1 ; 3] [a2_ode_stability_boundary]   ✔ ]1 ; 3[   · ]−∞ ; 3[ [a2_ode_stability_one_coef]   · ]1 ; +∞[ [a2_ode_stability_one_coef]
  pièges : a2_ode_stability_boundary, a2_ode_stability_one_coef

Soit X l'ensemble des a ∈ ℝ pour lesquels toutes les solutions de y′′ + (a + 3)y′ + 4y = 0 tendent vers 0 en +∞. Alors X =
  · [−3 ; +∞[ [a2_ode_stability_boundary]   ✔ ]−3 ; +∞[   · ℝ [a2_ode_stability_one_coef]   · ]−7 ; 1[ [a2_ode_stability_discriminant]
  pièges : a2_ode_stability_boundary, a2_ode_stability_one_coef, a2_ode_stability_discriminant

```

### Variantes d'examen

```
Soit X l'ensemble des a ∈ ℝ pour lesquels toutes les solutions de y′′ + (3 − a)y′ + (a² − 5a + 6)y = 0 tendent vers 0 en +∞. Alors X =
  ✔ ]−∞ ; 2[   · ]−∞ ; 2] [a2_ode_stability_boundary]   · ]−∞ ; 2[ ∪ ]3 ; +∞[ [a2_ode_stability_one_coef]   · ]−∞ ; 3[ [a2_ode_stability_one_coef]
  [examen mcq]
  pièges : a2_ode_stability_boundary, a2_ode_stability_one_coef

Vrai ou faux ?
  « Si q > 0, toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 en +∞. » → FAUX
    contre-exemple (refute) : p = 0, q = 1
  [examen tf]
  pièges : a2_ode_stability_one_coef

```

## Autres changements de variable : Bernoulli, Euler (`a2-ode-subst-other`, BA2)

_Bernoulli : z = y^{1−α} rend l'équation linéaire ; Euler : x = eᵗ donne des coefficients constants._

### Niveau 1

```
Résous x²y′′ = 4x² pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [guided]  x²y′′ = 4x²
    (Euler : on pose x = eᵗ, et y devient une fonction de t.)
    = y′′ − y′ = 4e^(2t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1 + C_2e^t + 2e^(2t)   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ = 4x²
    = y = C_1 + C_2x + 2x²   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − y′ = … | y′′ − y′ = 4e^(2t)

Résous y′ + 2y = 6√y (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
  [guided]  y′ + 2y = 6√y
    (Bernoulli avec α = 1/2 : on pose z = √y.)
    = z′ = 3□   (trous : z′ = 3 − z)   ← z = √y, z′ en fonction de y et y′, puis remplacer
    = z = Ce^(−x) + □   (trous : z = Ce^(−x) + 3)   ← Équation linéaire en z
  — Reviens à y (z = √y) :  [juge ode]  départ : y′ + 2y = 6√y
    = y = (Ce^(−x) + 3)²   ← Revenir à y
  aides : Bernoulli avec α = 1/2 : pose z = √y. | z′ = y′/(2√y), puis remplace y′ par son expression : une équation linéaire en z. | z′ = 3 − z

Résous x²y′′ + 2xy′ = 18x² pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [guided]  x²y′′ + 2xy′ = 18x²
    (Euler : on pose x = eᵗ, et y devient une fonction de t.)
    = y′′ + y′ = 18e^(2t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1e^(−t) + C_2 + 3e^(2t)   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ + 2xy′ = 18x²
    = y = C_1/x + C_2 + 3x²   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ + y′ = … | y′′ + y′ = 18e^(2t)

```

### Niveau 2

```
Résous x²y′′ − xy′ = −2x pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [guided]  x²y′′ − xy′ = −2x
    ? Quelle substitution ? ✔ Euler : x = eᵗ / · Bernoulli : z = y^(1−α) / · Homogène : y = xv
    = y′′□y′ = −2e^t   (trous : y′′ − 2y′ = −2e^t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1 + C_2e^(2t) + 2e^t   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − xy′ = −2x
    = y = C_1 + C_2x² + 2x   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − 2y′ = … | y′′ − 2y′ = −2e^t

Résous y′ − y = e^xy² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
  [guided]  y′ − y = e^xy²
    ? Quelle substitution ? ✔ Bernoulli, α = 2 : z = 1/y / · Homogène : y = xv / · Euler : x = eᵗ / · Aucune : elle est linéaire
    = z′ = □   (trous : z′ = −z − e^x)   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
    = z = Ce^(−x)□   (trous : z = Ce^(−x) − (1/2)e^x)   ← Équation linéaire en z
  — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ − y = e^xy²
    = y = 1/(Ce^(−x) − (1/2)e^x)   ← Revenir à y
  aides : Bernoulli avec α = 2 : pose z = 1/y. | z′ = −y′/y², puis remplace y′ par son expression : une équation linéaire en z. | z′ = −z − e^x

Résous x²y′′ − xy′ = 6x³ pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [guided]  x²y′′ − xy′ = 6x³
    ? Quelle substitution ? ✔ Euler : x = eᵗ / · Bernoulli : z = y^(1−α) / · Homogène : y = xv
    = y′′□y′ = 6e^(3t)   (trous : y′′ − 2y′ = 6e^(3t))   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1 + C_2e^(2t) + 2e^(3t)   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − xy′ = 6x³
    = y = C_1 + C_2x² + 2x³   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − 2y′ = … | y′′ − 2y′ = 6e^(3t)

```

### Niveau 3

```
Résous x²y′′ − xy′ = 6x³ pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [tap, suivre l'erreur, menu steps]  x²y′′ − xy′ = 6x³
    ? Quelle substitution ? ✔ Euler : x = eᵗ / · Bernoulli : z = y^(1−α) / · Homogène : y = xv
    = y′′ − 2y′ = 6e^(3t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1 + C_2e^(2t) + 2e^(3t)   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − xy′ = 6x³
    = y = C_1 + C_2x² + 2x³   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − 2y′ = … | y′′ − 2y′ = 6e^(3t)

Résous y′ + 2y = e^xy² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
  [tap, suivre l'erreur, menu steps]  y′ + 2y = e^xy²
    ? Quelle substitution ? ✔ Bernoulli, α = 2 : z = 1/y / · Homogène : y = xv / · Euler : x = eᵗ / · Aucune : elle est linéaire
    = z′ = 2z − e^x   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
    = z = Ce^(2x) + e^x   ← Équation linéaire en z
  — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ + 2y = e^xy²
    = y = 1/(Ce^(2x) + e^x)   ← Revenir à y
  aides : Bernoulli avec α = 2 : pose z = 1/y. | z′ = −y′/y², puis remplace y′ par son expression : une équation linéaire en z. | z′ = 2z − e^x

Résous x²y′′ = 4x² pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [tap, suivre l'erreur, menu steps]  x²y′′ = 4x²
    ? Quelle substitution ? ✔ Euler : x = eᵗ / · Bernoulli : z = y^(1−α) / · Homogène : y = xv
    = y′′ − y′ = 4e^(2t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1 + C_2e^t + 2e^(2t)   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ = 4x²
    = y = C_1 + C_2x + 2x²   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − y′ = … | y′′ − y′ = 4e^(2t)

```

### Niveau 4

```
Résous y′ + 3y = y² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
  [free, suivre l'erreur]  y′ + 3y = y²
    ? Quelle substitution ? ✔ Bernoulli, α = 2 : z = 1/y / · Homogène : y = xv / · Euler : x = eᵗ / · Aucune : elle est linéaire
    = z′ = 3z − 1   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
    = z = Ce^(3x) + 1/3   ← Équation linéaire en z
  — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ + 3y = y²
    = y = 1/(Ce^(3x) + 1/3)   ← Revenir à y
  aides : Bernoulli avec α = 2 : pose z = 1/y. | z′ = −y′/y², puis remplace y′ par son expression : une équation linéaire en z. | z′ = 3z − 1

Résous x²y′′ − xy′ − 3y = 4x pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
  [free, suivre l'erreur]  x²y′′ − xy′ − 3y = 4x
    ? Quelle substitution ? ✔ Euler : x = eᵗ / · Bernoulli : z = y^(1−α) / · Homogène : y = xv
    = y′′ − 2y′ − 3y = 4e^t   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
    = y = C_1e^(−t) + C_2e^(3t) − e^t   ← Coefficients constants
  — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − xy′ − 3y = 4x
    = y = C_1/x + C_2x³ − x   ← e^{mt} = x^m
  aides : Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt. | y′′ − 2y′ − 3y = … | y′′ − 2y′ − 3y = 4e^t

Résous y′ + 3y = y² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
  [free, suivre l'erreur]  y′ + 3y = y²
    ? Quelle substitution ? ✔ Bernoulli, α = 2 : z = 1/y / · Homogène : y = xv / · Euler : x = eᵗ / · Aucune : elle est linéaire
    = z′ = 3z − 1   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
    = z = Ce^(3x) + 1/3   ← Équation linéaire en z
  — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ + 3y = y²
    = y = 1/(Ce^(3x) + 1/3)   ← Revenir à y
  aides : Bernoulli avec α = 2 : pose z = 1/y. | z′ = −y′/y², puis remplace y′ par son expression : une équation linéaire en z. | z′ = 3z − 1

```

### Niveau 5

```
Deux équations à ramener à une équation linéaire : Bernoulli, puis Euler.
  [problème, 6 points]
  partie 1 (Bernoulli : 2 ; Reviens à y (z = 1/y) : 1)
  Résous y′ + 3y = e^xy² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
    [free, sans aide, suivre l'erreur]  y′ + 3y = e^xy²
      = z′ = 3z − e^x   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
      = z = Ce^(3x) + (1/2)e^x   ← Équation linéaire en z
    — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ + 3y = e^xy²
      = y = 1/(Ce^(3x) + (1/2)e^x)   ← Revenir à y
  partie 2 (Euler : 2 ; Reviens à x (eᵗ = x) : 1)
  Résous x²y′′ − 3xy′ + 3y = −x² pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
    [free, sans aide, suivre l'erreur]  x²y′′ − 3xy′ + 3y = −x²
      = y′′ − 4y′ + 3y = −e^(2t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
      = y = C_1e^t + C_2e^(3t) + e^(2t)   ← Coefficients constants
    — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − 3xy′ + 3y = −x²
      = y = C_1x + C_2x³ + x²   ← e^{mt} = x^m

Deux équations à ramener à une équation linéaire : Bernoulli, puis Euler.
  [problème, 6 points]
  partie 1 (Bernoulli : 2 ; Reviens à y (z = √y) : 1)
  Résous y′ + 2y = 6√y (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
    [free, sans aide, suivre l'erreur]  y′ + 2y = 6√y
      = z′ = 3 − z   ← z = √y, z′ en fonction de y et y′, puis remplacer
      = z = Ce^(−x) + 3   ← Équation linéaire en z
    — Reviens à y (z = √y) :  [juge ode]  départ : y′ + 2y = 6√y
      = y = (Ce^(−x) + 3)²   ← Revenir à y
  partie 2 (Euler : 2 ; Reviens à x (eᵗ = x) : 1)
  Résous x²y′′ + 3xy′ = 30x³ pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
    [free, sans aide, suivre l'erreur]  x²y′′ + 3xy′ = 30x³
      = y′′ + 2y′ = 30e^(3t)   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
      = y = C_1e^(−2t) + C_2 + 2e^(3t)   ← Coefficients constants
    — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ + 3xy′ = 30x³
      = y = C_1/x² + C_2 + 2x³   ← e^{mt} = x^m

Deux équations à ramener à une équation linéaire : Bernoulli, puis Euler.
  [problème, 6 points]
  partie 1 (Bernoulli : 2 ; Reviens à y (z = 1/y) : 1)
  Résous y′ − y = e^xy² (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.
    [free, sans aide, suivre l'erreur]  y′ − y = e^xy²
      = z′ = −z − e^x   ← z = 1/y, z′ en fonction de y et y′, puis remplacer
      = z = Ce^(−x) − (1/2)e^x   ← Équation linéaire en z
    — Reviens à y (z = 1/y) :  [juge ode]  départ : y′ − y = e^xy²
      = y = 1/(Ce^(−x) − (1/2)e^x)   ← Revenir à y
  partie 2 (Euler : 2 ; Reviens à x (eᵗ = x) : 1)
  Résous x²y′′ − 6y = −6x pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.
    [free, sans aide, suivre l'erreur]  x²y′′ − 6y = −6x
      = y′′ − y′ − 6y = −6e^t   ← x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt
      = y = C_1e^(−2t) + C_2e^(3t) + e^t   ← Coefficients constants
    — Reviens à x (eᵗ = x) :  [juge ode]  départ : x²y′′ − 6y = −6x
      = y = C_1/x² + C_2x³ + x   ← e^{mt} = x^m

```

### Variantes d'examen

```
La solution générale de y′ + y = y² est :
  ✔ y = 1/(Ce^x + 1)   · y = Ce^x + 1   · y = 1/(Ce^x)   · y = 1/(Ce^(−x) + 1) [a2_ode_homog_derivative]
  [examen mcq]
  pièges : a2_ode_homog_derivative

```

## Équations exactes (`a2-ode-exact`, BA2)

_M dx + N dy = 0 avec M_y = N_x : H_x = M, H_y = N, et H(x, y) = C._

### Niveau 1

```
Résous (3y + 9x²) dx + (3x + 4y) dy = 0 avec y(−1) = 2 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (3y + 9x²)
    (Teste l'exactitude : ∂M/∂y avec M = 3y + 9x².)
    = 3   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 3x + 4y :  [juge equiv]  départ : ∂/∂x (3x + 4y)
    = 3   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (3y + 9x²) dx
    = 3xy + 3x³ + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(3xy + 3x³) :  [juge equiv]  départ : 3x + 4y − ∂/∂y (3xy + 3x³)
    = □y   (trous : 4y)   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (3y + 9x²) + (3x + 4y)y′ = 0
    = 3xy + 3x³ + □ = C   (trous : 3xy + 3x³ + 2y² = C)   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = −1)   ← y(−1) = 2
    = 3xy + 3x³ + 2y² = −1   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = 3xy + 3x³ + φ(y), et H_y doit valoir 3x + 4y. | φ(y) = 2y² : 3xy + 3x³ + 2y² = C.
  pièges : a2_exact_phi_forgot

Résous (−2xy + 6x) dx + (−x² − 3y²) dy = 0 avec y(0) = 2 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (−2xy + 6x)
    (Teste l'exactitude : ∂M/∂y avec M = −2xy + 6x.)
    = −2x   ← Dériver M par rapport à y
  — ∂N/∂x avec N = −x² − 3y² :  [juge equiv]  départ : ∂/∂x (−x² − 3y²)
    = −2x   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (−2xy + 6x) dx
    = −x²y + 3x² + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(−x²y + 3x²) :  [juge equiv]  départ : −x² − 3y² − ∂/∂y (−x²y + 3x²)
    = □y²   (trous : −3y²)   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (−2xy + 6x) + (−x² − 3y²)y′ = 0
    = −x²y + 3x²□ = C   (trous : −x²y + 3x² − y³ = C)   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = −8)   ← y(0) = 2
    = −x²y + 3x² − y³ = −8   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = −x²y + 3x² + φ(y), et H_y doit valoir −x² − 3y². | φ(y) = −y³ : −x²y + 3x² − y³ = C.
  pièges : a2_exact_phi_forgot

Résous (y − 2x) dx + (x − 3y²) dy = 0 avec y(0) = 1 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (y − 2x)
    (Teste l'exactitude : ∂M/∂y avec M = y − 2x.)
    = 1   ← Dériver M par rapport à y
  — ∂N/∂x avec N = x − 3y² :  [juge equiv]  départ : ∂/∂x (x − 3y²)
    = 1   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (y − 2x) dx
    = xy − x² + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(xy − x²) :  [juge equiv]  départ : x − 3y² − ∂/∂y (xy − x²)
    = □y²   (trous : −3y²)   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (y − 2x) + (x − 3y²)y′ = 0
    = xy − x²□ = C   (trous : xy − x² − y³ = C)   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = −1)   ← y(0) = 1
    = xy − x² − y³ = −1   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = xy − x² + φ(y), et H_y doit valoir x − 3y². | φ(y) = −y³ : xy − x² − y³ = C.
  pièges : a2_exact_phi_forgot

```

### Niveau 2

```
Résous (y² − 6x²) dx + (2xy + 4y) dy = 0 avec y(−1) = 1 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (y² − 6x²)
    (Teste l'exactitude : ∂M/∂y avec M = y² − 6x².)
    = 2y   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 2xy + 4y :  [juge equiv]  départ : ∂/∂x (2xy + 4y)
    = 2y   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (y² − 6x²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    = xy² − 2x³ + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(xy² − 2x³) :  [juge equiv]  départ : 2xy + 4y − ∂/∂y (xy² − 2x³)
    = □y   (trous : 4y)   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (y² − 6x²) + (2xy + 4y)y′ = 0
    = xy² − 2x³ + 2y² = C   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = 3)   ← y(−1) = 1
    = xy² − 2x³ + 2y² = 3   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = xy² − 2x³ + φ(y), et H_y doit valoir 2xy + 4y. | φ(y) = 2y² : xy² − 2x³ + 2y² = C.
  pièges : a2_exact_phi_forgot

Résous (y + 6x²) dx + (x − 3y²) dy = 0 avec y(−1) = 2 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (y + 6x²)
    (Teste l'exactitude : ∂M/∂y avec M = y + 6x².)
    = 1   ← Dériver M par rapport à y
  — ∂N/∂x avec N = x − 3y² :  [juge equiv]  départ : ∂/∂x (x − 3y²)
    = 1   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (y + 6x²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    = xy + 2x³ + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(xy + 2x³) :  [juge equiv]  départ : x − 3y² − ∂/∂y (xy + 2x³)
    = □y²   (trous : −3y²)   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (y + 6x²) + (x − 3y²)y′ = 0
    = xy + 2x³ − y³ = C   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = −12)   ← y(−1) = 2
    = xy + 2x³ − y³ = −12   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = xy + 2x³ + φ(y), et H_y doit valoir x − 3y². | φ(y) = −y³ : xy + 2x³ − y³ = C.
  pièges : a2_exact_phi_forgot

Résous (2x/(1 + (x² + y)²)) dx + (1/(1 + (x² + y)²)) dy = 0 avec y(0) = 1 : la solution vérifie une relation H(x, y) = C.
  [guided]  ∂/∂y (2x/(1 + (x² + y)²))
    (Teste l'exactitude : ∂M/∂y avec M = 2x/(1 + (x² + y)²).)
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 1/(1 + (x² + y)²) :  [juge equiv]  départ : ∂/∂x (1/(1 + (x² + y)²))
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ 2x/(1 + (x² + y)²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    = arctan(x² + y) + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(arctan(x² + y)) :  [juge equiv]  départ : 1/(1 + (x² + y)²) − ∂/∂y (arctan(x² + y))
    = 0   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (2x/(1 + (x² + y)²)) + (1/(1 + (x² + y)²))y′ = 0
    = arctan(x² + y) = C   ← Les solutions vérifient H(x, y) = C
    = C = □   (trous : C = π/4)   ← y(0) = 1
    = arctan(x² + y) = π/4   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = arctan(x² + y) + φ(y), et H_y doit valoir 1/(1 + (x² + y)²). | φ(y) = 0 : arctan(x² + y) = C.
  pièges : a2_exact_phi_forgot

```

### Niveau 3

```
Résous (2xy + 3x²) dx + (x² − 3y²) dy = 0 avec y(−1) = 2 : la solution vérifie une relation H(x, y) = C.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (2xy + 3x²)
    (Teste l'exactitude : ∂M/∂y avec M = 2xy + 3x².)
    = 2x   ← Dériver M par rapport à y
  — ∂N/∂x avec N = x² − 3y² :  [juge equiv]  départ : ∂/∂x (x² − 3y²)
    = 2x   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (2xy + 3x²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = x²y + x³ + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(x²y + x³) :  [juge equiv]  départ : x² − 3y² − ∂/∂y (x²y + x³)
    = −3y²   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (2xy + 3x²) + (x² − 3y²)y′ = 0
    = x²y + x³ − y³ = C   ← Les solutions vérifient H(x, y) = C
    = C = −7   ← y(−1) = 2
    = x²y + x³ − y³ = −7   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = x²y + x³ + φ(y), et H_y doit valoir x² − 3y². | φ(y) = −y³ : x²y + x³ − y³ = C.
  pièges : a2_exact_phi_forgot

Résous (−2xy + 2) dx + (−x² − 3y²) dy = 0 avec y(0) = 2 : la solution vérifie une relation H(x, y) = C.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (−2xy + 2)
    (Teste l'exactitude : ∂M/∂y avec M = −2xy + 2.)
    = −2x   ← Dériver M par rapport à y
  — ∂N/∂x avec N = −x² − 3y² :  [juge equiv]  départ : ∂/∂x (−x² − 3y²)
    = −2x   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (−2xy + 2) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = −x²y + 2x + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(−x²y + 2x) :  [juge equiv]  départ : −x² − 3y² − ∂/∂y (−x²y + 2x)
    = −3y²   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (−2xy + 2) + (−x² − 3y²)y′ = 0
    = −x²y + 2x − y³ = C   ← Les solutions vérifient H(x, y) = C
    = C = −8   ← y(0) = 2
    = −x²y + 2x − y³ = −8   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = −x²y + 2x + φ(y), et H_y doit valoir −x² − 3y². | φ(y) = −y³ : −x²y + 2x − y³ = C.
  pièges : a2_exact_phi_forgot

Résous (6xy − 4x) dx + (3x² + 3y²) dy = 0 avec y(0) = −1 : la solution vérifie une relation H(x, y) = C.
  [tap, suivre l'erreur, menu steps]  ∂/∂y (6xy − 4x)
    (Teste l'exactitude : ∂M/∂y avec M = 6xy − 4x.)
    = 6x   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 3x² + 3y² :  [juge equiv]  départ : ∂/∂x (3x² + 3y²)
    = 6x   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (6xy − 4x) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = 3x²y − 2x² + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(3x²y − 2x²) :  [juge equiv]  départ : 3x² + 3y² − ∂/∂y (3x²y − 2x²)
    = 3y²   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (6xy − 4x) + (3x² + 3y²)y′ = 0
    = 3x²y − 2x² + y³ = C   ← Les solutions vérifient H(x, y) = C
    = C = −1   ← y(0) = −1
    = 3x²y − 2x² + y³ = −1   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = 3x²y − 2x² + φ(y), et H_y doit valoir 3x² + 3y². | φ(y) = y³ : 3x²y − 2x² + y³ = C.
  pièges : a2_exact_phi_forgot

```

### Niveau 4

```
Résous (ye^(xy)) dx + (xe^(xy) + 2y) dy = 0 avec y(1) = 2 : la solution vérifie une relation H(x, y) = C.
  [free, suivre l'erreur]  ∂/∂y (ye^(xy))
    (Teste l'exactitude : ∂M/∂y avec M = ye^(xy).)
    = e^(xy) + xye^(xy)   ← Dériver M par rapport à y
  — ∂N/∂x avec N = xe^(xy) + 2y :  [juge equiv]  départ : ∂/∂x (xe^(xy) + 2y)
    = e^(xy) + xye^(xy)   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ ye^(xy) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = e^(xy) + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(e^(xy)) :  [juge equiv]  départ : xe^(xy) + 2y − ∂/∂y (e^(xy))
    = 2y   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (ye^(xy)) + (xe^(xy) + 2y)y′ = 0
    = e^(xy) + y² = C   ← Les solutions vérifient H(x, y) = C
    = C = e^(2) + 4   ← y(1) = 2
    = e^(xy) + y² = e^(2) + 4   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = e^(xy) + φ(y), et H_y doit valoir xe^(xy) + 2y. | φ(y) = y² : e^(xy) + y² = C.
  pièges : a2_exact_phi_forgot

Résous (y² + 3) dx + (2xy + 3y²) dy = 0 avec y(−1) = 2 : la solution vérifie une relation H(x, y) = C.
  [free, suivre l'erreur]  ∂/∂y (y² + 3)
    (Teste l'exactitude : ∂M/∂y avec M = y² + 3.)
    = 2y   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 2xy + 3y² :  [juge equiv]  départ : ∂/∂x (2xy + 3y²)
    = 2y   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (y² + 3) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = xy² + 3x + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(xy² + 3x) :  [juge equiv]  départ : 2xy + 3y² − ∂/∂y (xy² + 3x)
    = 3y²   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (y² + 3) + (2xy + 3y²)y′ = 0
    = xy² + 3x + y³ = C   ← Les solutions vérifient H(x, y) = C
    = C = 1   ← y(−1) = 2
    = xy² + 3x + y³ = 1   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = xy² + 3x + φ(y), et H_y doit valoir 2xy + 3y². | φ(y) = y³ : xy² + 3x + y³ = C.
  pièges : a2_exact_phi_forgot

Résous (2y + 1) dx + (2x + 2y) dy = 0 avec y(−1) = −1 : la solution vérifie une relation H(x, y) = C.
  [free, suivre l'erreur]  ∂/∂y (2y + 1)
    (Teste l'exactitude : ∂M/∂y avec M = 2y + 1.)
    = 2   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 2x + 2y :  [juge equiv]  départ : ∂/∂x (2x + 2y)
    = 2   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (2y + 1) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = 2xy + x + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(2xy + x) :  [juge equiv]  départ : 2x + 2y − ∂/∂y (2xy + x)
    = 2y   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (2y + 1) + (2x + 2y)y′ = 0
    = 2xy + x + y² = C   ← Les solutions vérifient H(x, y) = C
    = C = 2   ← y(−1) = −1
    = 2xy + x + y² = 2   ← La relation cherchée
  aides : Vérifie ∂M/∂y = ∂N/∂x, puis cherche H avec H_x = M : H = ∫ M dx + φ(y). | H = 2xy + x + φ(y), et H_y doit valoir 2x + 2y. | φ(y) = y² : 2xy + x + y² = C.
  pièges : a2_exact_phi_forgot

```

### Niveau 5

```
Résous (2x/(1 + (x² + y)²)) dx + (1/(1 + (x² + y)²)) dy = 0 avec y(0) = −1 : la solution vérifie une relation H(x, y) = C.
  [free, sans aide]  ∂/∂y (2x/(1 + (x² + y)²))
    (Teste l'exactitude : ∂M/∂y avec M = 2x/(1 + (x² + y)²).)
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 1/(1 + (x² + y)²) :  [juge equiv]  départ : ∂/∂x (1/(1 + (x² + y)²))
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ 2x/(1 + (x² + y)²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = arctan(x² + y) + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(arctan(x² + y)) :  [juge equiv]  départ : 1/(1 + (x² + y)²) − ∂/∂y (arctan(x² + y))
    = 0   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (2x/(1 + (x² + y)²)) + (1/(1 + (x² + y)²))y′ = 0
    = arctan(x² + y) = C   ← Les solutions vérifient H(x, y) = C
    = C = −π/4   ← y(0) = −1
    = arctan(x² + y) = −π/4   ← La relation cherchée
  pièges : a2_exact_phi_forgot

Résous (2x/(1 + (x² + y)²)) dx + (1/(1 + (x² + y)²)) dy = 0 avec y(0) = −1 : la solution vérifie une relation H(x, y) = C.
  [free, sans aide]  ∂/∂y (2x/(1 + (x² + y)²))
    (Teste l'exactitude : ∂M/∂y avec M = 2x/(1 + (x² + y)²).)
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver M par rapport à y
  — ∂N/∂x avec N = 1/(1 + (x² + y)²) :  [juge equiv]  départ : ∂/∂x (1/(1 + (x² + y)²))
    = −4x(x² + y)/(1 + (x² + y)²)²   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ 2x/(1 + (x² + y)²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = arctan(x² + y) + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(arctan(x² + y)) :  [juge equiv]  départ : 1/(1 + (x² + y)²) − ∂/∂y (arctan(x² + y))
    = 0   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (2x/(1 + (x² + y)²)) + (1/(1 + (x² + y)²))y′ = 0
    = arctan(x² + y) = C   ← Les solutions vérifient H(x, y) = C
    = C = −π/4   ← y(0) = −1
    = arctan(x² + y) = −π/4   ← La relation cherchée
  pièges : a2_exact_phi_forgot

Résous (−y − 6x²) dx + (−x − 2y) dy = 0 avec y(0) = −1 : la solution vérifie une relation H(x, y) = C.
  [free, sans aide]  ∂/∂y (−y − 6x²)
    (Teste l'exactitude : ∂M/∂y avec M = −y − 6x².)
    = −1   ← Dériver M par rapport à y
  — ∂N/∂x avec N = −x − 2y :  [juge equiv]  départ : ∂/∂x (−x − 2y)
    = −1   ← Dériver N par rapport à x
  — H = ∫ M dx (à une fonction φ(y) près) :  [juge antideriv]  départ : ∫ (−y − 6x²) dx
    ? ∂M/∂y = ∂N/∂x ? ✔ Oui : l'équation est exacte / · Non : elle n'est pas exacte
    ? Pour trouver H : ✔ intégrer M par rapport à x, puis ajuster φ(y) / ✔ intégrer N par rapport à y, puis ajuster ψ(x) / · H = ∫ M dx, sans rien ajouter
    = −xy − 2x³ + C   ← Primitive en x : la constante C peut dépendre de y (c'est φ(y))
  — H_y doit valoir N : φ′(y) = N − ∂/∂y(−xy − 2x³) :  [juge equiv]  départ : −x − 2y − ∂/∂y (−xy − 2x³)
    = −2y   ← φ′(y) = N − ∂/∂y(∫ M dx)
  — Les solutions, puis la condition initiale :  [juge ode]  départ : (−y − 6x²) + (−x − 2y)y′ = 0
    = −xy − 2x³ − y² = C   ← Les solutions vérifient H(x, y) = C
    = C = −1   ← y(0) = −1
    = −xy − 2x³ − y² = −1   ← La relation cherchée
  pièges : a2_exact_phi_forgot

```

### Variantes d'examen

```
La solution de (4xy − 2) + (2x² − 1)y′ = 0 avec y(1) = 1 vérifie :
  · 2x²y − 2x − 2y = −1   ✔ 2x²y − 2x − y = −1   · 2x²y − 2x − y = 1   · 2x²y − 2x = 0 [a2_exact_phi_forgot]
  [examen mcq]
  pièges : a2_exact_phi_forgot

```

## Systèmes linéaires X′ = AX (`a2-ode-system`, BA2)

_A diagonalisable : X(t) = Σ Cᵢe^{λᵢt}vᵢ, les constantes par X(0)._

### Niveau 1

```
Résous X′ = AX avec A = [[0,-1],[-1,0]] et X(0) = (0 ; 4), X = (x ; y). Écris chaque composante : x = … ; y = …. Les valeurs propres de A sont −1 et 1.
  [guided]  v_1
    (Un vecteur propre v₁ pour λ₁ = −1 :)
    = (1 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 1 :  [juge eigvec]  départ : v_2
    = (-1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −y ; y′ = −x
    = x = C_1□ − C_2e^t ; y = C_1e^(−t) + C_2e^t   (trous : x = C_1e^(−t) − C_2e^t ; y = C_1e^(−t) + C_2e^t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 2 ; C_2 = □   (trous : C_1 = 2 ; C_2 = 2)   ← X(0) = (0 ; 4)
    = x = 2e^(−t) − 2e^t ; y = 2e^(−t) + 2e^t   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −1 et 1, de vecteurs propres (1 ; 1) et (−1 ; 1). | x = C_1e^(−t) − C_2e^t ; y = C_1e^(−t) + C_2e^t
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[1,2],[0,2]] et X(0) = (0 ; -1), X = (x ; y). Écris chaque composante : x = … ; y = …. Les valeurs propres de A sont 2 et 1.
  [guided]  v_1
    (Un vecteur propre v₁ pour λ₁ = 2 :)
    = (2 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 1 :  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = x + 2y ; y′ = 2y
    = x = □C_1e^(2t) + C_2e^t ; y = C_1e^(2t)   (trous : x = 2C_1e^(2t) + C_2e^t ; y = C_1e^(2t))   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = −1 ; C_2 = □   (trous : C_1 = −1 ; C_2 = 2)   ← X(0) = (0 ; −1)
    = x = −2e^(2t) + 2e^t ; y = −e^(2t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 2 et 1, de vecteurs propres (2 ; 1) et (1 ; 0). | x = 2C_1e^(2t) + C_2e^t ; y = C_1e^(2t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[3,-2],[1,0]] et X(0) = (3 ; 2), X = (x ; y). Écris chaque composante : x = … ; y = …. Les valeurs propres de A sont 1 et 2.
  [guided]  v_1
    (Un vecteur propre v₁ pour λ₁ = 1 :)
    = (1 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 2 :  [juge eigvec]  départ : v_2
    = (2 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 3x − 2y ; y′ = x
    = x = C_1□ + 2C_2e^(2t) ; y = C_1e^t + C_2e^(2t)   (trous : x = C_1e^t + 2C_2e^(2t) ; y = C_1e^t + C_2e^(2t))   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = □   (trous : C_1 = 1 ; C_2 = 1)   ← X(0) = (3 ; 2)
    = x = e^t + 2e^(2t) ; y = e^t + e^(2t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 1 et 2, de vecteurs propres (1 ; 1) et (2 ; 1). | x = C_1e^t + 2C_2e^(2t) ; y = C_1e^t + C_2e^(2t)
  pièges : a2_ode_system_order

```

### Niveau 2

```
Résous X′ = AX avec A = [[1,0],[3,-2]] et X(0) = (1 ; 0), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [guided]  (1 − λ)(−2 − λ) = 0
    (Les valeurs propres de A :)
    = λ = −2 ou λ = 1   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 1 :  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −2 :  [juge eigvec]  départ : v_2
    = (0 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = x ; y′ = 3x − 2y
    = x = C_1□ ; y = C_1□ + C_2e^(−2t)   (trous : x = C_1e^t ; y = C_1e^t + C_2e^(−2t))   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = □ ; C_2 = □   (trous : C_1 = 1 ; C_2 = −1)   ← X(0) = (1 ; 0)
    = x = e^t ; y = e^t − e^(−2t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 1 et −2, de vecteurs propres (1 ; 1) et (0 ; 1). | x = C_1e^t ; y = C_1e^t + C_2e^(−2t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[5,-6],[4,-5]] et X(0) = (1 ; 0), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [guided]  (5 − λ)(−5 − λ) + 24 = 0
    (Les valeurs propres de A :)
    = λ = −1 ou λ = 1   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 1 :  [juge eigvec]  départ : v_1
    = (3 ; 2)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −1 :  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 5x − 6y ; y′ = 4x − 5y
    = x = □C_1e^t + C_2e^(−t) ; y = 2C_1e^t + C_2e^(−t)   (trous : x = 3C_1e^t + C_2e^(−t) ; y = 2C_1e^t + C_2e^(−t))   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = □ ; C_2 = □   (trous : C_1 = 1 ; C_2 = −2)   ← X(0) = (1 ; 0)
    = x = 3e^t − 2e^(−t) ; y = 2e^t − 2e^(−t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 1 et −1, de vecteurs propres (3 ; 2) et (1 ; 1). | x = 3C_1e^t + C_2e^(−t) ; y = 2C_1e^t + C_2e^(−t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[-3,0],[-4,-1]] et X(0) = (1 ; 1), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [guided]  (−3 − λ)(−1 − λ) = 0
    (Les valeurs propres de A :)
    = λ = −3 ou λ = −1   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = −3 :  [juge eigvec]  départ : v_1
    = (1 ; 2)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −1 :  [juge eigvec]  départ : v_2
    = (0 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −3x ; y′ = −4x − y
    = x = C_1e^(−3t) ; y = □C_1e^(−3t) + C_2e^(−t)   (trous : x = C_1e^(−3t) ; y = 2C_1e^(−3t) + C_2e^(−t))   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = □ ; C_2 = □   (trous : C_1 = 1 ; C_2 = −1)   ← X(0) = (1 ; 1)
    = x = e^(−3t) ; y = 2e^(−3t) − e^(−t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −3 et −1, de vecteurs propres (1 ; 2) et (0 ; 1). | x = C_1e^(−3t) ; y = 2C_1e^(−3t) + C_2e^(−t)
  pièges : a2_ode_system_order

```

### Niveau 3

```
Résous X′ = AX avec A = [[0,-3],[2,-5]] et X(0) = (2 ; 1), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [tap, suivre l'erreur, menu steps]  (−λ)(−5 − λ) + 6 = 0
    (Les valeurs propres de A :)
    ? Comment résoudre le système ? ✔ Diagonaliser A : X = C₁e^{λ₁t}v₁ + C₂e^{λ₂t}v₂ / ✔ Éliminer y : une équation d'ordre 2 en x
    = λ = −3 ou λ = −2   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = −2 :  [juge eigvec]  départ : v_1
    = (3 ; 2)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −3 :  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −3y ; y′ = 2x − 5y
    = x = 3C_1e^(−2t) + C_2e^(−3t) ; y = 2C_1e^(−2t) + C_2e^(−3t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = −1   ← X(0) = (2 ; 1)
    = x = 3e^(−2t) − e^(−3t) ; y = 2e^(−2t) − e^(−3t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −2 et −3, de vecteurs propres (3 ; 2) et (1 ; 1). | x = 3C_1e^(−2t) + C_2e^(−3t) ; y = 2C_1e^(−2t) + C_2e^(−3t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[0,2],[-1,3]] et X(0) = (5 ; 3), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [tap, suivre l'erreur, menu steps]  (−λ)(3 − λ) + 2 = 0
    (Les valeurs propres de A :)
    ? Comment résoudre le système ? ✔ Diagonaliser A : X = C₁e^{λ₁t}v₁ + C₂e^{λ₂t}v₂ / ✔ Éliminer y : une équation d'ordre 2 en x
    = λ = 1 ou λ = 2   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 2 :  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 1 :  [juge eigvec]  départ : v_2
    = (2 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 2y ; y′ = −x + 3y
    = x = C_1e^(2t) + 2C_2e^t ; y = C_1e^(2t) + C_2e^t   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = 2   ← X(0) = (5 ; 3)
    = x = e^(2t) + 4e^t ; y = e^(2t) + 2e^t   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 2 et 1, de vecteurs propres (1 ; 1) et (2 ; 1). | x = C_1e^(2t) + 2C_2e^t ; y = C_1e^(2t) + C_2e^t
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[-1,0],[4,-3]] et X(0) = (-1 ; -3), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [tap, suivre l'erreur, menu steps]  (−1 − λ)(−3 − λ) = 0
    (Les valeurs propres de A :)
    ? Comment résoudre le système ? ✔ Diagonaliser A : X = C₁e^{λ₁t}v₁ + C₂e^{λ₂t}v₂ / ✔ Éliminer y : une équation d'ordre 2 en x
    = λ = −3 ou λ = −1   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = −1 :  [juge eigvec]  départ : v_1
    = (1 ; 2)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −3 :  [juge eigvec]  départ : v_2
    = (0 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −x ; y′ = 4x − 3y
    = x = C_1e^(−t) ; y = 2C_1e^(−t) + C_2e^(−3t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = −1 ; C_2 = −1   ← X(0) = (−1 ; −3)
    = x = −e^(−t) ; y = −2e^(−t) − e^(−3t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −1 et −3, de vecteurs propres (1 ; 2) et (0 ; 1). | x = C_1e^(−t) ; y = 2C_1e^(−t) + C_2e^(−3t)
  pièges : a2_ode_system_order

```

### Niveau 4

```
Résous X′ = AX avec A = [[-3,4],[0,-1]] et X(0) = (3 ; 1), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, suivre l'erreur]  (−3 − λ)(−1 − λ) = 0
    (Les valeurs propres de A :)
    = λ = −3 ou λ = −1   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = −1 :  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −3 :  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −3x + 4y ; y′ = −y
    = x = 2C_1e^(−t) + C_2e^(−3t) ; y = C_1e^(−t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = 1   ← X(0) = (3 ; 1)
    = x = 2e^(−t) + e^(−3t) ; y = e^(−t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −1 et −3, de vecteurs propres (2 ; 1) et (1 ; 0). | x = 2C_1e^(−t) + C_2e^(−3t) ; y = C_1e^(−t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[-3,1],[0,-2]] et X(0) = (4 ; 2), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, suivre l'erreur]  (−3 − λ)(−2 − λ) = 0
    (Les valeurs propres de A :)
    = λ = −3 ou λ = −2   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = −3 :  [juge eigvec]  départ : v_1
    = (1 ; 0)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −2 :  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −3x + y ; y′ = −2y
    = x = C_1e^(−3t) + C_2e^(−2t) ; y = C_2e^(−2t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 2 ; C_2 = 2   ← X(0) = (4 ; 2)
    = x = 2e^(−3t) + 2e^(−2t) ; y = 2e^(−2t)   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont −3 et −2, de vecteurs propres (1 ; 0) et (1 ; 1). | x = C_1e^(−3t) + C_2e^(−2t) ; y = C_2e^(−2t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[2,0],[1,1]] et X(0) = (2 ; 4), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, suivre l'erreur]  (2 − λ)(1 − λ) = 0
    (Les valeurs propres de A :)
    = λ = 1 ou λ = 2   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 2 :  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 1 :  [juge eigvec]  départ : v_2
    = (0 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 2x ; y′ = x + y
    = x = C_1e^(2t) ; y = C_1e^(2t) + C_2e^t   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 2 ; C_2 = 2   ← X(0) = (2 ; 4)
    = x = 2e^(2t) ; y = 2e^(2t) + 2e^t   ← X(t)
  aides : Diagonalise A : chaque couple (λ, v) donne une solution e^{λt}v. | Les valeurs propres sont 2 et 1, de vecteurs propres (1 ; 1) et (0 ; 1). | x = C_1e^(2t) ; y = C_1e^(2t) + C_2e^t
  pièges : a2_ode_system_order

```

### Niveau 5

```
Résous X′ = AX avec A = [[3,-1],[0,2]] et X(0) = (0 ; 1), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, sans aide]  (3 − λ)(2 − λ) = 0
    (Les valeurs propres de A :)
    = λ = 2 ou λ = 3   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 3 :  [juge eigvec]  départ : v_1
    = (1 ; 0)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 2 :  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 3x − y ; y′ = 2y
    = x = C_1e^(3t) + C_2e^(2t) ; y = C_2e^(2t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = −1 ; C_2 = 1   ← X(0) = (0 ; 1)
    = x = −e^(3t) + e^(2t) ; y = e^(2t)   ← X(t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[2,2],[0,3]] et X(0) = (0 ; 1), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, sans aide]  (2 − λ)(3 − λ) = 0
    (Les valeurs propres de A :)
    = λ = 2 ou λ = 3   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 3 :  [juge eigvec]  départ : v_1
    = (2 ; 1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = 2 :  [juge eigvec]  départ : v_2
    = (1 ; 0)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = 2x + 2y ; y′ = 3y
    = x = 2C_1e^(3t) + C_2e^(2t) ; y = C_1e^(3t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = −2   ← X(0) = (0 ; 1)
    = x = 2e^(3t) − 2e^(2t) ; y = e^(3t)   ← X(t)
  pièges : a2_ode_system_order

Résous X′ = AX avec A = [[0,-3],[-3,0]] et X(0) = (2 ; 0), X = (x ; y). Écris chaque composante : x = … ; y = ….
  [free, sans aide]  (−λ)(−λ) − 9 = 0
    (Les valeurs propres de A :)
    = λ = −3 ou λ = 3   ← det(A − λI) = 0
  — Un vecteur propre v₁ pour λ₁ = 3 :  [juge eigvec]  départ : v_1
    = (1 ; -1)   ← (A − λ₁I)v₁ = 0
  — Un vecteur propre v₂ pour λ₂ = −3 :  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← (A − λ₂I)v₂ = 0
  — Les composantes de X, puis les constantes :  [juge ode]  départ : x′ = −3y ; y′ = −3x
    = x = C_1e^(3t) + C_2e^(−3t) ; y = −C_1e^(3t) + C_2e^(−3t)   ← Chaque couple (λ, v) donne une solution e^{λt}v
    = C_1 = 1 ; C_2 = 1   ← X(0) = (2 ; 0)
    = x = e^(3t) + e^(−3t) ; y = −e^(3t) + e^(−3t)   ← X(t)
  pièges : a2_ode_system_order

```

## Pièges de cette unité

- **Pas ouvert, donc fermé** (`a2_topo_not_open_closed`, E) : « pas ouvert, donc fermé » au lieu de ni l'un ni l'autre
- **Inégalité toujours vraie comptée** (`a2_topo_trivial_atom`, E) : {1 ≥ −25x² − 15y² > a} « ni ouvert ni fermé » au lieu de ouvert
- **Variable absente oubliée (cylindre)** (`a2_topo_cylinder`, E) : {x² + y² ≤ 1} ⊂ ℝ³ « borné » au lieu de non borné
- **Bord d'une réunion** (`a2_bd_union`, E) : ∂(A ∪ B) = ∂A ∪ ∂B au lieu de seulement ⊂
- **Point isolé oublié dans le bord** (`a2_bd_isolated`, E) : point isolé oublié dans ∂E au lieu de 
- **Une composante converge, donc la suite converge** (`a2_seq_one_component`, E) : « une composante converge, donc la suite converge » au lieu de 
- **Facteur discontinu, composante continue** (`a2_curve_sign_factor`, E) : sign(t)·(eᵗ − 1) « discontinue » au lieu de continue
- **Vitesse prise comme la somme des composantes** (`a2_arc_sum_components`, E) : ∫ (x′ + y′ + z′) dt au lieu de ∫ √(x′² + y′² + z′²) dt
- **Seulement les droites regardées** (`a2_lim_lines_only`, C) : « toutes les droites donnent 0, donc la limite vaut 0 » au lieu de n'existe pas (chemin y = x²)
- **Limites itérées prises pour la limite** (`a2_lim_iterated`, E) : lim_x lim_y f = lim_y lim_x f au lieu de la limite n'existe pas forcément
- **Une « limite » qui contient encore y** (`a2_lim_function_answer`, C) : « lim = y² » au lieu de une limite est un nombre
- **« r → 0 » alors qu'un terme ne dépend que de φ** (`a2_lim_polar_theta`, E) : « r au lieu de 0, donc l'expression → 0 » alors qu'un terme dépend de φ seul
- **Dépendance en φ vue, facteur r oublié** (`a2_lim_polar_r_forgot`, E) : r·cos²φ sin φ « dépend de φ, donc pas de limite » au lieu de tend vers 0
- **Fonctions partielles continues prises pour la continuité** (`a2_cont_partial_functions`, E) : x ↦ f(x, 0) et y ↦ f(0, y) continues ⇒ f continue au lieu de faux
- **Bornes atteintes sans « fermé et borné »** (`a2_compact_open`, E) : « continue sur un ouvert ⇒ (non) bornée » au lieu de 
- **Image d'un ouvert prise pour un ouvert** (`a2_open_image`, E) : f(U) ouvert si U ouvert au lieu de faux
- **Jacobienne transposée** (`a2_jacobian_transposed`, C) : J_u de taille n × m au lieu de m × n
- **Schwarz sans l'hypothèse C²** (`a2_schwarz_no_c2`, E) : ∂²f/∂x∂y = ∂²f/∂y∂x toujours au lieu de seulement si f ∈ C²
- **D_v f = ∇f·v sans savoir que f est différentiable** (`a2_dirderiv_gradient`, C) : D_v f(0, 0) = ∇f(0, 0)·v = 0 au lieu de limite de la définition
- **Puissance de t mal comptée dans (f(tv) − f(0))/t** (`a2_dirderiv_power`, E) : puissance de t mal simplifiée dans f(tv)/t au lieu de 
- **Dérivées partielles, donc différentiable** (`a2_partials_imply_diff`, C) : « dérivées partielles existent ⇒ différentiable » au lieu de 
- **Le reste R seul, sans le diviser par ‖h‖** (`a2_diff_no_norm`, E) : R(h, k) au lieu de 0 suffit → il faut R/‖(h, k)‖ → 0
- **Différentiable, donc C¹** (`a2_diff_imply_c1`, C) : différentiable partout ⇒ C¹ au lieu de 
- **Dérivées partielles, donc continue** (`a2_partials_imply_cont`, C) : dérivées partielles en (0, 0) ⇒ continue en (0, 0) au lieu de 
- **Toutes les dérivées directionnelles, donc différentiable** (`a2_dirderiv_imply_diff`, C) : toutes les D_v f existent ⇒ différentiable au lieu de 
- **Plan tangent : (x + a) au lieu de (x − a)** (`a2_tangent_point_sign`, C) : (x + a) au lieu de (x − a) au lieu de 
- **Plan tangent : = c au lieu de = 0** (`a2_tangent_level_rhs`, E) : ∇F(p)·(x − p) = c au lieu de = 0
- **J_f évaluée en a au lieu de g(a)** (`a2_chain_wrong_point`, C) : J_f(a)·J_g(a) au lieu de J_f(g(a))·J_g(a)
- **Règle de chaîne : un seul terme gardé** (`a2_chain_no_inner`, E) : ∂h/∂v = ∂f/∂y(g(a)) au lieu de somme de deux produits
- **f̃_φ² sans le facteur 1/r²** (`a2_polar_grad_factor`, C) : f̃_r² + f̃_φ² ou f̃_r² + r²f̃_φ² au lieu de f̃_r² + f̃_φ²/r²
- **Laplacien radial : mauvais coefficient n − 1** (`a2_laplacian_n`, E) : Δg(r) = g″ + g′/r en dimension 3 au lieu de g″ + 2g′/r
- **Taylor : coefficient de XY doublé ou divisé par 2** (`a2_taylor_cross`, C) : 2f_xy·XY ou ½f_xy·XY au lieu de f_xy·XY
- **Taylor : le ½ oublié** (`a2_taylor_no_half`, C) : 1 − (2x + 3y)² au lieu de 1 − (2x + 3y)²/2
- **Taylor : termes de degré > 2 gardés** (`a2_taylor_no_truncate`, E) : des termes de degré 3 ou 4 gardés dans p₂ au lieu de 
- **Signe moins oublié dans g′ = −F_x/F_y** (`a2_implicit_sign`, C) : g′ = F_x/F_y au lieu de −F_x/F_y
- **Fraction −F_x/F_y inversée** (`a2_implicit_inverted`, C) : g′ = −F_y/F_x au lieu de −F_x/F_y
- **g″ calculée en gardant y constant** (`a2_implicit_second_const`, E) : g″ = −d/dx(F_x/F_y) avec y gardé constant au lieu de 
- **Mauvaise dérivée au dénominateur (3 variables)** (`a2_implicit_wrong_var`, E) : y = g(x, z) : dénominateur F_z au lieu de F_y au lieu de 
- **Division par une variable qui peut être nulle** (`a2_crit_divide`, E) : x(3x + 6) = 0 au lieu de « 3x + 6 = 0 » seulement
- **Point stationnaire pris pour un extremum** (`a2_stationary_is_extremum`, C) : ∇f = 0 ⇒ extremum au lieu de x² − y²
- **det H > 0 lu comme « minimum »** (`a2_hess_det_only`, E) : det H > 0 ⇒ minimum, sans regarder f_xx (ou, en 3 × 3, sans Δ₁, Δ₂) au lieu de 
- **det H = 0 lu comme « point selle »** (`a2_hess_degenerate`, E) : det H = 0 ⇒ « selle » ou « pas d'extremum » au lieu de 
- **Nature lue sur Δ₁ et Δ₃ seulement** (`a2_hess_partial_minors`, C) : Δ₁ < 0 et Δ₃ < 0 ⇒ maximum (Δ₂ ignoré) au lieu de 
- **Bord oublié sur un compact** (`a2_compact_boundary_forgot`, E) : max = valeur au point stationnaire intérieur au lieu de 
- **Coins du bord oubliés** (`a2_compact_corner_forgot`, E) : coins du demi-disque oubliés au lieu de 
- **Lagrange : division par une variable qui peut être nulle** (`a2_lagrange_divide`, E) : 2xy = 4λy au lieu de « x = 2λ » seulement
- **Lagrange : point hors de la contrainte** (`a2_lagrange_no_constraint`, E) : points de ∇f = λ∇g qui ne vérifient pas g = 0 au lieu de 
- **Lagrange : points de max comptés à moitié** (`a2_lagrange_count`, C) : « max atteint en un seul point » quand il y en a deux au lieu de 
- **Lagrange : candidat pris pour l'extremum sans comparer** (`a2_lagrange_no_compare`, E) : premier candidat trouvé pris comme extremum au lieu de 
- **Matrice d'une forme quadratique : termes croisés non partagés** (`a2_quadform_matrix_half`, E) : matrice de xy + 2yz avec 1 et 2 hors de la diagonale au lieu de ½ et 1
- **Intégrande dérivée par rapport à x** (`a2_leibniz_wrong_var`, E) : ∂f/∂x au lieu de ∂f/∂t sous l'intégrale au lieu de 
- **Règle de Leibniz sans l'intégrale de ∂f/∂t** (`a2_leibniz_no_integral`, E) : F′ = f(b, t)b′ − f(a, t)a′ seulement au lieu de 
- **Signe du terme de la borne du bas** (`a2_leibniz_sign`, E) : + f(a, t)a′ au lieu de − f(a, t)a′
- **Symétrie sur un domaine qui n'est pas symétrique** (`a2_symmetry_wrong`, E) : « f impaire, donc 0 » sur un domaine non symétrique au lieu de 
- **Borne extérieure qui dépend de la variable intérieure** (`a2_fubini_outer_var`, C) : bornes extérieures qui contiennent la variable intérieure au lieu de 
- **Ordre changé en renommant les variables** (`a2_fubini_swap_same`, E) : ∫₀¹∫_{x²}^1 dy dx au lieu de ∫₀¹∫_{y²}^1 dx dy
- **Courbes du haut et du bas inversées** (`a2_domain_curve_order`, E) : courbes du haut et du bas inversées au lieu de 
- **Jacobien de la réciproque pas inversé** (`a2_jacobian_inverse`, E) : dx dy = \|J\| du dv, avec J = det ∂(u, v)/∂(x, y) au lieu de dx dy = du dv/\|J\|
- **D̃ = G(D) au lieu de G⁻¹(D)** (`a2_changevar_domain_direction`, C) : D̃ = G(D) au lieu de G⁻¹(D) au lieu de 
- **Jacobien oublié** (`a2_jacobian_forgot`, C) : dx dy = dr dφ ; dV = dr dθ dφ ; r au lieu de r² sin θ au lieu de 
- **Bornes de l'angle** (`a2_polar_angle_bounds`, E) : 0 ≤ y ≤ x au lieu de φ ∈ [0 ; π/2] au lieu de [0 ; π/4]
- **θ mesuré depuis le plan xy** (`a2_sph_theta_from_plane`, E) : θ mesuré depuis le plan xy : z = r sin θ, dV = r² cos θ… au lieu de 
- **Seuil de convergence en dimension n** (`a2_improper_exponent`, E) : ∫_{‖x‖≥1} ‖x‖^{−α} converge si α > 1 (règle de dimension 1) au lieu de 
- **Gauss : π au lieu de √π** (`a2_gauss_sqrt`, E) : ∫_ℝ e^{−x²} = π au lieu de √π
- **Surfaces du dessus et du dessous inversées** (`a2_volume_surfaces_swapped`, E) : ∬ (dessous − dessus) au lieu de 
- **Continue, donc solution unique** (`a2_ode_continuity_unique`, C) : « f continue, donc solution unique » au lieu de 
- **C¹, donc solution globale** (`a2_ode_local_global`, C) : « f ∈ C¹, donc solution globale » au lieu de 
- **Constante ajoutée après l'exponentielle** (`a2_ode_sep_constant_late`, E) : ln\|y\| = x² + C ⇒ y = e^{x²} + C au lieu de y = Ke^{x²}
- **Solution constante perdue en divisant** (`a2_ode_sep_lost_constant`, E) : y′ = 4 − y², y(0) = 2 : formule générale au lieu de y ≡ 2
- **Mauvais signe en enlevant la valeur absolue** (`a2_ode_sign_abs`, E) : ln\|(3 + y)/(3 − y)\| : signe faux en enlevant la valeur absolue au lieu de 
- **Facteur intégrant avant de normaliser** (`a2_ode_if_not_normalized`, E) : μ calculé avec le coefficient de y avant de diviser par celui de y′ au lieu de 
- **Facteur intégrant e^(−∫a)** (`a2_ode_if_sign`, E) : μ = e^{−∫ a} pour y′ + ay = b au lieu de 
- **(μy)′ = b au lieu de μb** (`a2_ode_if_rhs`, E) : (μy)′ = b au lieu de μb au lieu de 
- **Conditions initiales posées sur y_h seule** (`a2_ode_ic_before_particular`, E) : constantes fixées sur y_h, puis y_p ajoutée au lieu de 
- **y = xv dérivé sans la règle du produit** (`a2_ode_homog_derivative`, E) : y = xv ⇒ y′ = v (ou xv′) au lieu de v + xv′
- **y₀ + C·y₁ solution de L(y) = b** (`a2_ode_superposition_nonhom`, C) : y₀ + C·y₁ solution de L(y) = b au lieu de 
- **Une seule constante à l'ordre 2** (`a2_ode_constant_count`, E) : solution générale d'ordre 2 avec une seule constante au lieu de 
- **Racine double sans le facteur x** (`a2_ode_double_root`, E) : C₁e^{rx} + C₂e^{rx} au lieu de (C₁ + C₂x)e^{rx}
- **α et β échangés** (`a2_ode_complex_swap`, E) : r = α ± iβ ⇒ e^{βx}(cos αx …) au lieu de 
- **Racines de signe opposé** (`a2_ode_char_sign`, E) : racines de signe opposé (r = 1, 3 au lieu de −1, −3) au lieu de 
- **Abel avec e^(+∫p)** (`a2_wronskian_abel_sign`, E) : W = W₀e^{+∫ p} au lieu de 
- **Résonance : facteur x oublié** (`a2_ode_resonance_no_x`, C) : u_p = A cos 3x + B sin 3x pour u″ + 9u = sin 3x au lieu de x(A cos 3x + B sin 3x)
- **Forme de y_p incomplète** (`a2_ode_yp_incomplete`, E) : y_p = At pour 27t (sans B) ; A sin 2t seul pour sin 2t au lieu de 
- **Somme traitée comme un produit (séparable)** (`a2_ode_method_separable_sum`, E) : y′ = x + y traité comme séparable au lieu de 
- **Équation non linéaire traitée comme linéaire** (`a2_ode_method_linear_nonlinear`, E) : y′ = y² traité comme linéaire au lieu de 
- **Bornes comprises dans l'ensemble de stabilité** (`a2_ode_stability_boundary`, C) : intervalle fermé [−1 ; +∞[ au lieu de ]−1 ; +∞[
- **Une seule des deux conditions p > 0, q > 0** (`a2_ode_stability_one_coef`, E) : seulement p > 0 (ou seulement q > 0) au lieu de 
- **Stabilité confondue avec Δ < 0** (`a2_ode_stability_discriminant`, E) : stabilité ⇔ Δ < 0 au lieu de 
- **φ(y) oubliée dans H** (`a2_exact_phi_forgot`, E) : H = ∫ M dx sans φ(y) au lieu de 
- **Vecteurs propres associés aux mauvaises valeurs propres** (`a2_ode_system_order`, E) : e^{3t} associé au vecteur propre de −1 au lieu de 
