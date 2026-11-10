# Exemples de questions — Analyse matricielle

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Blocs et complément de Schur (`m-blocks-schur`, BA4)

_S, le bloc qui reste après l'élimination ; det A = det A₁₁ · det S._

### Niveau 1

```
A = [[0,1,-1],[1,0,-1],[-2,1,3]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[0,1],[1,0]], A₁₂ = (-1 ; -1), A₂₁ = [[-2,1]], A₂₂ = 3. On donne A₁₁⁻¹ = [[0,1],[1,0]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (-1 ; -1)   (cases à remplir : (1,1) (2,1))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[1,-2]]   (cases à remplir : (1,1) (1,2))
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = □   (trous : 2)
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = (−1)·2
    = −□   (trous : −2)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = 3 − [[-2,1]]·□ | Y = (-1 ; -1), X = [[1,-2]], S = 2
  pièges : l_blocks_order, m_schur_sign

A = [[3,1,-1],[2,1,0],[-1,1,1]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[3,1],[2,1]], A₁₂ = (-1 ; 0), A₂₁ = [[-1,1]], A₂₂ = 1. On donne A₁₁⁻¹ = [[1,-1],[-2,3]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (-1 ; 2)   (cases à remplir : (1,1) (2,1))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-3,4]]   (cases à remplir : (1,1) (1,2))
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = −□   (trous : −2)
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = 1·(−2)
    = −□   (trous : −2)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = 1 − [[-1,1]]·□ | Y = (-1 ; 2), X = [[-3,4]], S = -2
  pièges : l_blocks_order, m_schur_sign

A = [[0,1,-2],[-1,0,1],[-1,-1,4]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[0,1],[-1,0]], A₁₂ = (-2 ; 1), A₂₁ = [[-1,-1]], A₂₂ = 4. On donne A₁₁⁻¹ = [[0,-1],[1,0]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (-1 ; -2)   (cases à remplir : (1,1) (2,1))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-1,1]]   (cases à remplir : (1,1) (1,2))
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = □   (trous : 1)
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = 1·1
    = □   (trous : 1)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = 4 − [[-1,-1]]·□ | Y = (-1 ; -2), X = [[-1,1]], S = 1
  pièges : l_blocks_order, m_schur_sign

```

### Niveau 2

```
A = [[1,1,-1],[0,1,-2],[1,-1,-1]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[1,1],[0,1]], A₁₂ = (-1 ; -2), A₂₁ = [[1,-1]], A₂₂ = -1. On donne A₁₁⁻¹ = [[1,-1],[0,1]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (1 ; -2)   (cases à remplir : (1,1) (2,1))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[1,-2]]   (cases à remplir : (1,1) (1,2))
  — Le complément de Schur S.  [juge mat]  départ : S
    ? Quelle formule donne le complément de Schur S ? · S = A₂₂ + A₂₁A₁₁⁻¹A₁₂ / ✔ S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ / · S = A₂₂ − A₁₂A₁₁⁻¹A₂₁
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = −□   (trous : −4)
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = 1·(−4)
    = −□   (trous : −4)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = -1 − [[1,-1]]·□ | Y = (1 ; -2), X = [[1,-2]], S = -4
  pièges : m_schur_sign, m_schur_order, l_blocks_order

A = [[1,1,-1],[1,0,0],[2,1,-3]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[1,1],[1,0]], A₁₂ = (-1 ; 0), A₂₁ = [[2,1]], A₂₂ = -3. On donne A₁₁⁻¹ = [[0,1],[1,-1]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (0 ; -1)   (cases à remplir : (1,1) (2,1))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[1,1]]   (cases à remplir : (1,1) (1,2))
  — Le complément de Schur S.  [juge mat]  départ : S
    ? Quelle formule donne le complément de Schur S ? · S = A₂₂ + A₂₁A₁₁⁻¹A₁₂ / · S = A₂₂ − A₁₂A₁₁⁻¹A₂₁ / ✔ S = A₂₂ − A₂₁A₁₁⁻¹A₁₂
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = −□   (trous : −2)
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = (−1)·(−2)
    = □   (trous : 2)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = -3 − [[2,1]]·□ | Y = (0 ; -1), X = [[1,1]], S = -2
  pièges : m_schur_sign, m_schur_order, l_blocks_order

A = [[-1,1,-1,-1],[-2,1,-2,0],[-1,0,0,-1],[0,1,2,-4]], découpée en blocs (les quatre blocs sont 2 × 2) : A₁₁ = [[-1,1],[-2,1]], A₁₂ = [[-1,-1],[-2,0]], A₂₁ = [[-1,0],[0,1]], A₂₂ = [[0,-1],[2,-4]]. On donne A₁₁⁻¹ = [[1,-1],[2,-1]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [guided]  Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = [[1,-1],[0,-2]]   (cases à remplir : (1,1) (1,2) (2,2))
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-1,1],[2,-1]]   (cases à remplir : (1,1) (1,2) (2,1))
  — Le complément de Schur S.  [juge mat]  départ : S
    ? Quelle formule donne le complément de Schur S ? ✔ S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ / · S = A₂₂ − A₁₂A₁₁⁻¹A₂₁ / · S = A₂₂ + A₂₁A₁₁⁻¹A₁₂
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = [[1,-2],[2,-2]]   (cases à remplir : (1,2) (2,1) (2,2))
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·det(S)   ← det A = det A₁₁ · det S = 1·2
    = □   (trous : 2)
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = [[0,-1],[2,-4]] − [[-1,0],[0,1]]·□ | Y = [[1,-1],[0,-2]], X = [[-1,1],[2,-1]], S = [[1,-2],[2,-2]]
  pièges : a2_jacobian_transposed, m_schur_order, m_schur_sign, l_blocks_order

```

### Niveau 3

```
A = [[1,0,2],[2,1,1],[-2,-2,-1]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[1,0],[2,1]], A₁₂ = (2 ; 1), A₂₁ = [[-2,-2]], A₂₂ = -1. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_11^(−1)
    = [[1,0],[-2,1]]   ← det A₁₁ = 1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur Y = A₁₁⁻¹A₁₂.  [juge mat]  départ : Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (2 ; -3)
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[2,-2]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = −3
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = 1·(−3)
    = −3
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = -1 − [[-2,-2]]·□ | Y = (2 ; -3), X = [[2,-2]], S = -3
  pièges : a2_jacobian_transposed, l_blocks_order, m_schur_sign

A = [[1,0,-1,0],[1,1,0,2],[-2,0,2,1],[-2,1,2,5]], découpée en blocs (les quatre blocs sont 2 × 2) : A₁₁ = [[1,0],[1,1]], A₁₂ = [[-1,0],[0,2]], A₂₁ = [[-2,0],[-2,1]], A₂₂ = [[2,1],[2,5]]. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_11^(−1)
    = [[1,0],[-1,1]]   ← det A₁₁ = 1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur Y = A₁₁⁻¹A₁₂.  [juge mat]  départ : Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = [[-1,0],[1,2]]
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-2,0],[-3,1]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = [[0,1],[-1,3]]
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·det(S)   ← det A = det A₁₁ · det S = 1·1
    = 1
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = [[2,1],[2,5]] − [[-2,0],[-2,1]]·□ | Y = [[-1,0],[1,2]], X = [[-2,0],[-3,1]], S = [[0,1],[-1,3]]
  pièges : a2_jacobian_transposed, l_blocks_order, m_schur_sign

A = [[1,0,2],[-1,1,-1],[-2,1,-1]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[1,0],[-1,1]], A₁₂ = (2 ; -1), A₂₁ = [[-2,1]], A₂₂ = -1. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_11^(−1)
    = [[1,0],[1,1]]   ← det A₁₁ = 1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur Y = A₁₁⁻¹A₁₂.  [juge mat]  départ : Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (2 ; 1)
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-1,1]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = 2
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = 1·2
    = 2
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = -1 − [[-2,1]]·□ | Y = (2 ; 1), X = [[-1,1]], S = 2
  pièges : a2_jacobian_transposed, l_blocks_order, m_schur_sign

```

### Niveau 4

```
A = [[0,1,-1],[1,3,1],[-1,-1,-2]], découpée en blocs (A₁₁ est 2 × 2, A₂₂ est 1 × 1) : A₁₁ = [[0,1],[1,3]], A₁₂ = (-1 ; 1), A₂₁ = [[-1,-1]], A₂₂ = -2. Calcule les facteurs de A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], le complément de Schur S, puis det A.
  [free, suivre l'erreur]  A_11^(−1)
    = [[-3,1],[1,0]]   ← det A₁₁ = −1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur Y = A₁₁⁻¹A₁₂.  [juge mat]  départ : Y
    = A_11^(−1)·A_12   ← Y = A₁₁⁻¹A₁₂
    = (4 ; -1)
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[2,-1]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = 1
  — Le déterminant de A.  [juge mat]  départ : detA
    = det(A_11)·S   ← det A = det A₁₁ · det S = (−1)·1
    = −1
  aides : Élimine le bloc A₂₁ comme une ligne de Gauss : S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est ce qui reste en bas à droite. | S = -2 − [[-1,-1]]·□ | Y = (4 ; -1), X = [[2,-1]], S = 1
  pièges : a2_jacobian_transposed, l_blocks_order, m_schur_sign

Résous A·(x ; y) = (F ; G) par blocs, avec A = [[-1,2,-2],[1,-1,2],[-1,-2,3]] (x ∈ ℝ², y ∈ ℝ), F = (5 ; -3) et G = 2. Blocs : A₁₁ = [[-1,2],[1,-1]], A₁₂ = (-2 ; 2), A₂₁ = [[-1,-2]], A₂₂ = 3. Élimine x avec le complément de Schur S.
  [free, suivre l'erreur]  A_11^(−1)
    = [[1,2],[1,1]]   ← det A₁₁ = −1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-3,-4]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = 5
  — Le second membre de l'équation en y : G − A₂₁A₁₁⁻¹F = G − XF.  [juge mat]  départ : G − X·F
    = 2 - [[-3,-4]]·(5 ; -3)   ← Sy = G − A₂₁A₁₁⁻¹F
    = 5
  — Résous Sy = G − XF.  [juge value]  départ : y
    = (5)/(5)   ← y = (G − XF)/S
    = 1
  — Puis x = A₁₁⁻¹(F − A₁₂y).  [juge mat]  départ : x
    = A_11^(−1)·(F − 1·A_12)   ← A₁₁x + A₁₂y = F
    = (-3 ; 2)
  aides : Comme en Gauss : multiplie la première ligne de blocs par X = A₂₁A₁₁⁻¹ et retranche-la de la seconde. Il reste Sy = G − XF. | y = (G − XF)/S, avec S = 5 | y = 1, x = (-3 ; 2)
  pièges : a2_jacobian_transposed

Résous A·(x ; y) = (F ; G) par blocs, avec A = [[1,1,1],[2,1,1],[1,-2,2]] (x ∈ ℝ², y ∈ ℝ), F = (-3 ; -5) et G = −4. Blocs : A₁₁ = [[1,1],[2,1]], A₁₂ = (1 ; 1), A₂₁ = [[1,-2]], A₂₂ = 2. Élimine x avec le complément de Schur S.
  [free, suivre l'erreur]  A_11^(−1)
    = [[-1,1],[2,-1]]   ← det A₁₁ = −1 : on échange la diagonale et on change le signe des deux autres cases
  — Le facteur X = A₂₁A₁₁⁻¹.  [juge mat]  départ : X
    = A_21·A_11^(−1)   ← X = A₂₁A₁₁⁻¹
    = [[-5,3]]
  — Le complément de Schur S.  [juge mat]  départ : S
    = A_22 − A_21·Y   ← S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ = A₂₂ − A₂₁Y
    = 4
  — Le second membre de l'équation en y : G − A₂₁A₁₁⁻¹F = G − XF.  [juge mat]  départ : G − X·F
    = -4 - [[-5,3]]·(-3 ; -5)   ← Sy = G − A₂₁A₁₁⁻¹F
    = −4
  — Résous Sy = G − XF.  [juge value]  départ : y
    = (−4)/(4)   ← y = (G − XF)/S
    = −1
  — Puis x = A₁₁⁻¹(F − A₁₂y).  [juge mat]  départ : x
    = A_11^(−1)·(F − (−1)·A_12)   ← A₁₁x + A₁₂y = F
    = (-2 ; 0)
  aides : Comme en Gauss : multiplie la première ligne de blocs par X = A₂₁A₁₁⁻¹ et retranche-la de la seconde. Il reste Sy = G − XF. | y = (G − XF)/S, avec S = 4 | y = −1, x = (-2 ; 0)
  pièges : a2_jacobian_transposed

```

### Niveau 5

```
Système KKT : K = [[H, Cᵀ], [C, 0]] = [[1,2,1],[2,5,1],[1,1,0]], avec H = [[1,2],[2,5]] (définie positive) et la contrainte C = [[1,1]]. Calcule H⁻¹, le complément de Schur S = −CH⁻¹Cᵀ, puis det K. K est-elle inversible ?
  [free, sans aide]  H^(−1)
    = [[5,-2],[-2,1]]   ← Inverse 2 × 2
  — Le complément de Schur de H dans K.  [juge mat]  départ : S
    = −C·H^(−1)·C^T   ← S = 0 − CH⁻¹Cᵀ
    = −2
  — Le déterminant de K.  [juge mat]  départ : detK
    = det(H)·S   ← det K = det H · S = 1·(−2)
    = −2
  pièges : a2_jacobian_transposed

Système KKT : K = [[H, Cᵀ], [C, 0]] = [[4,0,1],[0,1,1],[1,1,0]], avec H = [[4,0],[0,1]] (définie positive) et la contrainte C = [[1,1]]. Calcule H⁻¹, le complément de Schur S = −CH⁻¹Cᵀ, puis det K. K est-elle inversible ?
  [free, sans aide]  H^(−1)
    = [[1/4,0],[0,1]]   ← Inverse 2 × 2
  — Le complément de Schur de H dans K.  [juge mat]  départ : S
    = −C·H^(−1)·C^T   ← S = 0 − CH⁻¹Cᵀ
    = −5/4
  — Le déterminant de K.  [juge mat]  départ : detK
    = det(H)·S   ← det K = det H · S = 4·(−5/4)
    = −5
  pièges : a2_jacobian_transposed

Système KKT : K = [[H, Cᵀ], [C, 0]] = [[4,4,-2],[4,8,0],[-2,0,0]], avec H = [[4,4],[4,8]] (définie positive) et la contrainte C = [[-2,0]]. Calcule H⁻¹, le complément de Schur S = −CH⁻¹Cᵀ, puis det K. K est-elle inversible ?
  [free, sans aide]  H^(−1)
    = [[1/2,-1/4],[-1/4,1/4]]   ← Inverse 2 × 2
  — Le complément de Schur de H dans K.  [juge mat]  départ : S
    = −C·H^(−1)·C^T   ← S = 0 − CH⁻¹Cᵀ
    = −2
  — Le déterminant de K.  [juge mat]  départ : detK
    = det(H)·S   ← det K = det H · S = 16·(−2)
    = −32
  pièges : a2_jacobian_transposed

```

### Variantes d'examen

```
A = [[-1,1,-1,-2],[0,1,1,-2],[1,0,5,2],[0,-1,0,2]], avec A₁₁ = [[-1,1],[0,1]] (les quatre blocs sont 2 × 2). Que vaut le coefficient s₁₂ du complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ ?
  [free, sans aide, examen coef]  s_12
    = 2
  pièges : m_schur_sign, m_schur_order

A = [[1,1,-1,-1],[0,1,-2,1],[1,2,-1,1],[0,-1,3,0]], avec A₁₁ = [[1,1],[0,1]] (les quatre blocs sont 2 × 2). Quel est le bloc en bas à droite de A⁻¹ ?
  ✔ [[1,-1],[-1,2]]   · [[2,1],[1,1]]   · [[1,1],[5,4]] [m_schur_sign]   · [[0,1/3],[1,1/3]] [l_blocks_inverse_each]
  [examen mcq]
  pièges : l_blocks_inverse_each, m_schur_sign

Vrai ou faux ?
  « Si A₁₁ et A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] sont inversibles, le complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ est inversible. » → VRAI
  [examen tf]

```

## Matrices de rang 1 et projecteurs (`m-rank1-proj`, BA4)

_uvᵀ de rang 1 ; P = uuᵀ/(uᵀu) projette, I − 2P réfléchit._

### Niveau 1

```
u = (1 ; 1 ; 2) et y = (0 ; 3 ; -1). Calcule le projecteur orthogonal P, puis Py et (I − P)y. Commence par la matrice uuᵀ.
  [guided]  u·u^T
    = [[1,1,2],[1,1,2],[2,2,4]]   (cases à remplir : (1,3) (2,1))   ← Case (i, j) : uᵢuⱼ
  — Divise par uᵀu = 6.  [juge mat]  départ : P
    = (1/6)·[[1,1,2],[1,1,2],[2,2,4]]   ← uᵀu = 6
    = [[1/6,1/6,1/3],[1/6,1/6,1/3],[1/3,1/3,2/3]]   (cases à remplir : (1,1) (2,2))
  — La projection de y = (0 ; 3 ; −1).  [juge mat]  départ : Py
    = (1/6)·(1 ; 1 ; 2)   ← u · y = 1 : on projette sans former P
    = (1/6 ; 1/6 ; 1/3)   (cases à remplir : (1,1) (3,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (0 ; 3 ; -1) - (1/6 ; 1/6 ; 1/3)   ← y − Py
    = (-1/6 ; 17/6 ; -4/3)   (cases à remplir : (2,1) (3,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/6)·□, où □ = uuᵀ ; puis Py = (□/6)·u | P = [[1/6,1/6,1/3],[1/6,1/6,1/3],[1/3,1/3,2/3]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

u = (1 ; 1 ; 1) et y = (-2 ; 1 ; 2). Calcule le projecteur orthogonal P, puis Py et (I − P)y. Commence par la matrice uuᵀ.
  [guided]  u·u^T
    = [[1,1,1],[1,1,1],[1,1,1]]   (cases à remplir : (2,1) (3,2))   ← Case (i, j) : uᵢuⱼ
  — Divise par uᵀu = 3.  [juge mat]  départ : P
    = (1/3)·[[1,1,1],[1,1,1],[1,1,1]]   ← uᵀu = 3
    = [[1/3,1/3,1/3],[1/3,1/3,1/3],[1/3,1/3,1/3]]   (cases à remplir : (1,2) (3,3))
  — La projection de y = (−2 ; 1 ; 2).  [juge mat]  départ : Py
    = (1/3)·(1 ; 1 ; 1)   ← u · y = 1 : on projette sans former P
    = (1/3 ; 1/3 ; 1/3)   (cases à remplir : (1,1) (2,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-2 ; 1 ; 2) - (1/3 ; 1/3 ; 1/3)   ← y − Py
    = (-7/3 ; 2/3 ; 5/3)   (cases à remplir : (1,1) (3,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/3)·□, où □ = uuᵀ ; puis Py = (□/3)·u | P = [[1/3,1/3,1/3],[1/3,1/3,1/3],[1/3,1/3,1/3]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

u = (2 ; 6 ; 3) et y = (2 ; 3 ; 2). Calcule le projecteur orthogonal P, puis Py et (I − P)y. Commence par la matrice uuᵀ.
  [guided]  u·u^T
    = [[4,12,6],[12,36,18],[6,18,9]]   (cases à remplir : (2,2) (3,1))   ← Case (i, j) : uᵢuⱼ
  — Divise par uᵀu = 49.  [juge mat]  départ : P
    = (1/49)·[[4,12,6],[12,36,18],[6,18,9]]   ← uᵀu = 49
    = [[4/49,12/49,6/49],[12/49,36/49,18/49],[6/49,18/49,9/49]]   (cases à remplir : (1,3) (2,1))
  — La projection de y = (2 ; 3 ; 2).  [juge mat]  départ : Py
    = (28/49)·(2 ; 6 ; 3)   ← u · y = 28 : on projette sans former P
    = (8/7 ; 24/7 ; 12/7)   (cases à remplir : (1,1) (2,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (2 ; 3 ; 2) - (8/7 ; 24/7 ; 12/7)   ← y − Py
    = (6/7 ; -3/7 ; 2/7)   (cases à remplir : (2,1) (3,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/49)·□, où □ = uuᵀ ; puis Py = (□/49)·u | P = [[4/49,12/49,6/49],[12/49,36/49,18/49],[6/49,18/49,9/49]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

```

### Niveau 2

```
u = (1 ; 1 ; 2) et y = (-2 ; -2 ; -1). Calcule le projecteur orthogonal P, puis Py et (I − P)y.
  [guided]  P
    ? u = (1 ; 1 ; 2) n'est pas unitaire (uᵀu = 6). Quelle formule donne P ? · P = uuᵀ/‖u‖ / · P = uuᵀ / ✔ P = uuᵀ/(uᵀu)
    = (1/6)·[[1,1,2],[1,1,2],[2,2,4]]   ← uᵀu = 6
    = [[1/6,1/6,1/3],[1/6,1/6,1/3],[1/3,1/3,2/3]]   (cases à remplir : (2,1) (2,2) (3,1))
  — La projection de y = (−2 ; −2 ; −1).  [juge mat]  départ : Py
    = (-6/6)·(1 ; 1 ; 2)   ← u · y = −6 : on projette sans former P
    = (-1 ; -1 ; -2)   (cases à remplir : (1,1) (2,1) (3,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-2 ; -2 ; -1) - (-1 ; -1 ; -2)   ← y − Py
    = (-1 ; -1 ; 1)   (cases à remplir : (1,1) (2,1) (3,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/6)·□, où □ = uuᵀ ; puis Py = (□/6)·u | P = [[1/6,1/6,1/3],[1/6,1/6,1/3],[1/3,1/3,2/3]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

u = (2 ; 2 ; -1) et y = (-2 ; 1 ; 0). Calcule le projecteur orthogonal P, puis Py et (I − P)y.
  [guided]  P
    ? u = (2 ; 2 ; −1) n'est pas unitaire (uᵀu = 9). Quelle formule donne P ? ✔ P = uuᵀ/(uᵀu) / · P = uuᵀ/‖u‖ / · P = uuᵀ
    = (1/9)·[[4,4,-2],[4,4,-2],[-2,-2,1]]   ← uᵀu = 9
    = [[4/9,4/9,-2/9],[4/9,4/9,-2/9],[-2/9,-2/9,1/9]]   (cases à remplir : (1,3) (3,2) (3,3))
  — La projection de y = (−2 ; 1 ; 0).  [juge mat]  départ : Py
    = (-2/9)·(2 ; 2 ; -1)   ← u · y = −2 : on projette sans former P
    = (-4/9 ; -4/9 ; 2/9)   (cases à remplir : (1,1) (2,1) (3,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-2 ; 1 ; 0) - (-4/9 ; -4/9 ; 2/9)   ← y − Py
    = (-14/9 ; 13/9 ; -2/9)   (cases à remplir : (1,1) (2,1) (3,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/9)·□, où □ = uuᵀ ; puis Py = (□/9)·u | P = [[4/9,4/9,-2/9],[4/9,4/9,-2/9],[-2/9,-2/9,1/9]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

u = (1 ; -1) et y = (-3 ; -2). Calcule le projecteur orthogonal P, puis Py et (I − P)y.
  [guided]  P
    ? u = (1 ; −1) n'est pas unitaire (uᵀu = 2). Quelle formule donne P ? · P = uuᵀ / · P = uuᵀ/‖u‖ / ✔ P = uuᵀ/(uᵀu)
    = (1/2)·[[1,-1],[-1,1]]   ← uᵀu = 2
    = [[1/2,-1/2],[-1/2,1/2]]   (cases à remplir : (1,1) (1,2) (2,2))
  — La projection de y = (−3 ; −2).  [juge mat]  départ : Py
    = (-1/2)·(1 ; -1)   ← u · y = −1 : on projette sans former P
    = (-1/2 ; 1/2)   (cases à remplir : (1,1) (2,1))
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-3 ; -2) - (-1/2 ; 1/2)   ← y − Py
    = (-5/2 ; -5/2)   (cases à remplir : (1,1) (2,1))   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/2)·□, où □ = uuᵀ ; puis Py = (□/2)·u | P = [[1/2,-1/2],[-1/2,1/2]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

```

### Niveau 3

```
u = (1 ; -1 ; 1) et y = (-2 ; -1 ; 0). Calcule le projecteur orthogonal P, puis Py et (I − P)y. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  P
    = (1/3)·[[1,-1,1],[-1,1,-1],[1,-1,1]]   ← uᵀu = 3
    = [[1/3,-1/3,1/3],[-1/3,1/3,-1/3],[1/3,-1/3,1/3]]
  — La projection de y = (−2 ; −1 ; 0).  [juge mat]  départ : Py
    = (-1/3)·(1 ; -1 ; 1)   ← u · y = −1 : on projette sans former P
    = (-1/3 ; 1/3 ; -1/3)
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-2 ; -1 ; 0) - (-1/3 ; 1/3 ; -1/3)   ← y − Py
    = (-5/3 ; -4/3 ; 1/3)   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/3)·□, où □ = uuᵀ ; puis Py = (□/3)·u | P = [[1/3,-1/3,1/3],[-1/3,1/3,-1/3],[1/3,-1/3,1/3]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

u = (1 ; 1) et y = (0 ; -3). Calcule le projecteur orthogonal P, la symétrie de Householder H = I − 2P, puis Py et Hy. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  P
    = (1/2)·[[1,1],[1,1]]   ← uᵀu = 2
    = [[1/2,1/2],[1/2,1/2]]
  — La symétrie de Householder H par rapport à u⊥.  [juge mat]  départ : H
    = I − 2P   ← On enlève deux fois la composante selon u
    = [[0,-1],[-1,0]]
  — La projection de y = (0 ; −3).  [juge mat]  départ : Py
    = (-3/2)·(1 ; 1)   ← u · y = −3 : on projette sans former P
    = (-3/2 ; -3/2)
  — L'image de y par la symétrie.  [juge mat]  départ : Hy
    = (0 ; -3) - 2·(-3/2 ; -3/2)   ← Hy = y − 2Py
    = (3 ; 0)   ← ‖Hy‖ = ‖y‖ = 3
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/2)·□, où □ = uuᵀ ; puis Py = (□/2)·u | P = [[1/2,1/2],[1/2,1/2]]
  pièges : a2_jacobian_transposed, g4_proj_no_square, m_householder_factor

u = (1 ; 1 ; -2) et y = (-2 ; -3 ; 3). Calcule le projecteur orthogonal P, puis Py et (I − P)y. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  P
    = (1/6)·[[1,1,-2],[1,1,-2],[-2,-2,4]]   ← uᵀu = 6
    = [[1/6,1/6,-1/3],[1/6,1/6,-1/3],[-1/3,-1/3,2/3]]
  — La projection de y = (−2 ; −3 ; 3).  [juge mat]  départ : Py
    = (-11/6)·(1 ; 1 ; -2)   ← u · y = −11 : on projette sans former P
    = (-11/6 ; -11/6 ; 11/3)
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (-2 ; -3 ; 3) - (-11/6 ; -11/6 ; 11/3)   ← y − Py
    = (-1/6 ; -7/6 ; -2/3)   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/6)·□, où □ = uuᵀ ; puis Py = (□/6)·u | P = [[1/6,1/6,-1/3],[1/6,1/6,-1/3],[-1/3,-1/3,2/3]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

```

### Niveau 4

```
A = [[1,-1],[0,1],[1,2]] a deux colonnes libres. Calcule le projecteur orthogonal P = A(AᵀA)⁻¹Aᵀ sur le plan Col A, puis sa trace.
  [free, suivre l'erreur]  A^T·A
    = [[2,1],[1,6]]   ← Produits scalaires des colonnes de A
  — Son inverse.  [juge mat]  départ : (A^T·A)^(−1)
    = [[6/11,-1/11],[-1/11,2/11]]   ← det AᵀA = 11
  — Le projecteur sur Col A.  [juge mat]  départ : P
    = A·G^(−1)·A^T   ← P = A(AᵀA)⁻¹Aᵀ, avec G = AᵀA
    = [[10/11,-3/11,1/11],[-3/11,2/11,3/11],[1/11,3/11,10/11]]
  — Le rang de P, par sa trace (les valeurs propres de P sont 1, 1 et 0).  [juge mat]  départ : trP
    = tr(P)   ← Somme des cases diagonales
    = 2   ← tr P = rang P = dim Col A
  aides : P = A(AᵀA)⁻¹Aᵀ : commence par la matrice 2 × 2 G = AᵀA et son inverse. | AᵀA = [[2,1],[1,6]], (AᵀA)⁻¹ = □ | P = [[10/11,-3/11,1/11],[-3/11,2/11,3/11],[1/11,3/11,10/11]]
  pièges : a2_jacobian_transposed

A = [[-2,-2],[0,-1],[1,0]] a deux colonnes libres. Calcule le projecteur orthogonal P = A(AᵀA)⁻¹Aᵀ sur le plan Col A, puis sa trace.
  [free, suivre l'erreur]  A^T·A
    = [[5,4],[4,5]]   ← Produits scalaires des colonnes de A
  — Son inverse.  [juge mat]  départ : (A^T·A)^(−1)
    = [[5/9,-4/9],[-4/9,5/9]]   ← det AᵀA = 9
  — Le projecteur sur Col A.  [juge mat]  départ : P
    = A·G^(−1)·A^T   ← P = A(AᵀA)⁻¹Aᵀ, avec G = AᵀA
    = [[8/9,2/9,-2/9],[2/9,5/9,4/9],[-2/9,4/9,5/9]]
  — Le rang de P, par sa trace (les valeurs propres de P sont 1, 1 et 0).  [juge mat]  départ : trP
    = tr(P)   ← Somme des cases diagonales
    = 2   ← tr P = rang P = dim Col A
  aides : P = A(AᵀA)⁻¹Aᵀ : commence par la matrice 2 × 2 G = AᵀA et son inverse. | AᵀA = [[5,4],[4,5]], (AᵀA)⁻¹ = □ | P = [[8/9,2/9,-2/9],[2/9,5/9,4/9],[-2/9,4/9,5/9]]
  pièges : a2_jacobian_transposed

u = (1 ; -2) et y = (2 ; 3). Calcule le projecteur orthogonal P, puis Py et (I − P)y.
  [free, suivre l'erreur]  P
    = (1/5)·[[1,-2],[-2,4]]   ← uᵀu = 5
    = [[1/5,-2/5],[-2/5,4/5]]
  — La projection de y = (2 ; 3).  [juge mat]  départ : Py
    = (-4/5)·(1 ; -2)   ← u · y = −4 : on projette sans former P
    = (-4/5 ; 8/5)
  — La composante de y orthogonale à u.  [juge mat]  départ : (I − P)y
    = (2 ; 3) - (-4/5 ; 8/5)   ← y − Py
    = (14/5 ; 7/5)   ← Orthogonal à u : u · (I − P)y = 0
  aides : P = uuᵀ/(uᵀu) ; pour Py, calcule d'abord le nombre u · y, puis Py = (u · y)/(uᵀu)·u. | P = (1/5)·□, où □ = uuᵀ ; puis Py = (□/5)·u | P = [[1/5,-2/5],[-2/5,4/5]]
  pièges : a2_jacobian_transposed, g4_proj_no_square

```

### Niveau 5

```
Montre que si u est unitaire, P = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Soit u unitaire (uᵀu = 1), P = uuᵀ, et x ∈ ℝⁿ.
    2. Px = u(uᵀx) = (u · x)u : Px est dans Span{u}.
    3. u · (x − Px) = u · x − (u · x)(u · u) = 0, car u · u = 1 : x − Px est orthogonal à u.
    4. Donc x = Px + (x − Px), avec Px ∈ Span{u} et x − Px ⊥ u.
    5. Par unicité de la décomposition orthogonale, Px est la projection orthogonale de x sur Span{u}.
    ✗ Avec u = e₁, P = diag(1, 0) projette bien sur l'axe des x. [g9_proof_by_example]
    ✗ Comme P est la projection sur Span{u}, Px est dans Span{u}. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

Montre que si u est unitaire, P = uuᵀ est la projection orthogonale sur Span{u}. Touche les blocs dans l'ordre de la preuve.
  [blocs order, sans aide]
    1. Soit u unitaire (uᵀu = 1), P = uuᵀ, et x ∈ ℝⁿ.
    2. Px = u(uᵀx) = (u · x)u : Px est dans Span{u}.
    3. u · (x − Px) = u · x − (u · x)(u · u) = 0, car u · u = 1 : x − Px est orthogonal à u.
    4. Donc x = Px + (x − Px), avec Px ∈ Span{u} et x − Px ⊥ u.
    5. Par unicité de la décomposition orthogonale, Px est la projection orthogonale de x sur Span{u}.
    ✗ Avec u = e₁, P = diag(1, 0) projette bien sur l'axe des x. [g9_proof_by_example]
    ✗ Comme P est la projection sur Span{u}, Px est dans Span{u}. [l_proof_circular]
  pièges : g9_proof_by_example, l_proof_circular

u = (1 ; 2 ; 2) et y = (-1 ; -3 ; 2). Calcule le projecteur orthogonal P, la symétrie de Householder H = I − 2P, puis Py et Hy.
  [free, sans aide]  P
    = (1/9)·[[1,2,2],[2,4,4],[2,4,4]]   ← uᵀu = 9
    = [[1/9,2/9,2/9],[2/9,4/9,4/9],[2/9,4/9,4/9]]
  — La symétrie de Householder H par rapport à u⊥.  [juge mat]  départ : H
    = I − 2P   ← On enlève deux fois la composante selon u
    = [[7/9,-4/9,-4/9],[-4/9,1/9,-8/9],[-4/9,-8/9,1/9]]
  — La projection de y = (−1 ; −3 ; 2).  [juge mat]  départ : Py
    = (-3/9)·(1 ; 2 ; 2)   ← u · y = −3 : on projette sans former P
    = (-1/3 ; -2/3 ; -2/3)
  — L'image de y par la symétrie.  [juge mat]  départ : Hy
    = (-1 ; -3 ; 2) - 2·(-1/3 ; -2/3 ; -2/3)   ← Hy = y − 2Py
    = (-1/3 ; -5/3 ; 10/3)   ← ‖Hy‖ = ‖y‖ = √14
  pièges : a2_jacobian_transposed, g4_proj_no_square, m_householder_factor

```

### Variantes d'examen

```
u = (2 ; 1). Quel est le projecteur orthogonal sur Span{u} ?
  · [[1/5,-2/5],[-2/5,4/5]]   ✔ [[4/5,2/5],[2/5,1/5]]   · [[4,2],[2,1]] [g4_proj_no_square]   · [[-3/5,-4/5],[-4/5,3/5]]
  [examen mcq]
  pièges : g4_proj_no_square

u = (2 ; 6 ; -3). P est le projecteur orthogonal sur Span{u}. Que vaut p₁₁ ?
  [free, sans aide, examen coef]  p_11
    = 4/49
  pièges : g4_proj_no_square

Vrai ou faux ?
  « Un projecteur orthogonal P (P² = P, Pᵀ = P) de ℝ² est toujours inversible. » → FAUX
    contre-exemple (mx) : A = [[1/2,-1/2],[-1/2,1/2]]
  [examen tf]

```

## Décomposition spectrale et fonctions de matrices symétriques (`m-spectral`, BA4)

_A = Σ λᵢuᵢuᵢᵀ ; f(A) se calcule sur les valeurs propres._

### Niveau 1

```
A = [[2,2],[2,-1]] est symétrique. Ses valeurs propres : λ₁ = −2, de vecteur propre v₁ = (1 ; -2), et λ₂ = 3, de vecteur propre v₂ = (2 ; 1). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule A³ par la décomposition spectrale.
  [guided]  P_1
    = (1/5)·[[1,-2],[-2,4]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[1/5,-2/5],[-2/5,4/5]]   (cases à remplir : (1,1) (2,2))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 3.  [juge mat]  départ : P_2
    = (1/5)·[[4,2],[2,1]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[4/5,2/5],[2/5,1/5]]   (cases à remplir : (2,1) (2,2))
  — A³ = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : A³
    = (−8)·P_1 + 27·P_2   ← f(λ₁) = (−2)³ = −8, f(λ₂) = 3³ = 27
    = [[20,14],[14,-1]]   (cases à remplir : (1,1) (1,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | A³ = (−8)·P₁ + 27·P₂ = □ | A³ = [[20,14],[14,-1]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[34,-6],[-6,18]] est symétrique. Ses valeurs propres : λ₁ = 36, de vecteur propre v₁ = (3 ; -1), et λ₂ = 16, de vecteur propre v₂ = (1 ; 3). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale.
  [guided]  P_1
    = (1/10)·[[9,-3],[-3,1]]   ← u = v/‖v‖ avec vᵀv = 10
    = [[9/10,-3/10],[-3/10,1/10]]   (cases à remplir : (1,2) (2,2))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 16.  [juge mat]  départ : P_2
    = (1/10)·[[1,3],[3,9]]   ← u = v/‖v‖ avec vᵀv = 10
    = [[1/10,3/10],[3/10,9/10]]   (cases à remplir : (1,2) (2,2))
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 6·P_1 + 4·P_2   ← f(λ₁) = √36 = 6, f(λ₂) = √16 = 4
    = [[29/5,-3/5],[-3/5,21/5]]   (cases à remplir : (1,1) (2,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 6·P₁ + 4·P₂ = □ | √A = [[29/5,-3/5],[-3/5,21/5]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[17,8],[8,17]] est symétrique. Ses valeurs propres : λ₁ = 9, de vecteur propre v₁ = (1 ; -1), et λ₂ = 25, de vecteur propre v₂ = (1 ; 1). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale.
  [guided]  P_1
    = (1/2)·[[1,-1],[-1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,-1/2],[-1/2,1/2]]   (cases à remplir : (1,1) (1,2))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 25.  [juge mat]  départ : P_2
    = (1/2)·[[1,1],[1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,1/2],[1/2,1/2]]   (cases à remplir : (1,2) (2,2))
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 3·P_1 + 5·P_2   ← f(λ₁) = √9 = 3, f(λ₂) = √25 = 5
    = [[4,1],[1,4]]   (cases à remplir : (1,1) (1,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 3·P₁ + 5·P₂ = □ | √A = [[4,1],[1,4]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

```

### Niveau 2

```
A = [[20,8],[8,32]] est symétrique. Ses valeurs propres : λ₁ = 36, de vecteur propre v₁ = (1 ; 2), et λ₂ = 16, de vecteur propre v₂ = (2 ; -1). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale.
  [guided]  P_1
    = (1/5)·[[1,2],[2,4]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[1/5,2/5],[2/5,4/5]]   (cases à remplir : (1,2) (2,1) (2,2))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 16.  [juge mat]  départ : P_2
    = (1/5)·[[4,-2],[-2,1]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[4/5,-2/5],[-2/5,1/5]]   (cases à remplir : (1,1) (1,2) (2,2))
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    ? Comment calculer √A ? ✔ Appliquer f aux valeurs propres : Σ f(λᵢ)Pᵢ / · Appliquer f à chaque case de A
    = 6·P_1 + 4·P_2   ← f(λ₁) = √36 = 6, f(λ₂) = √16 = 4
    = [[22/5,4/5],[4/5,28/5]]   (cases à remplir : (1,2) (2,1) (2,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 6·P₁ + 4·P₂ = □ | √A = [[22/5,4/5],[4/5,28/5]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[5,4],[4,5]] est symétrique. Ses valeurs propres : λ₁ = 1, de vecteur propre v₁ = (1 ; -1), et λ₂ = 9, de vecteur propre v₂ = (1 ; 1). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale.
  [guided]  P_1
    = (1/2)·[[1,-1],[-1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,-1/2],[-1/2,1/2]]   (cases à remplir : (1,2) (2,1) (2,2))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 9.  [juge mat]  départ : P_2
    = (1/2)·[[1,1],[1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,1/2],[1/2,1/2]]   (cases à remplir : (1,2) (2,1) (2,2))
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    ? Comment calculer √A ? ✔ Appliquer f aux valeurs propres : Σ f(λᵢ)Pᵢ / · Appliquer f à chaque case de A
    = 1·P_1 + 3·P_2   ← f(λ₁) = √1 = 1, f(λ₂) = √9 = 3
    = [[2,1],[1,2]]   (cases à remplir : (1,1) (2,1) (2,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 1·P₁ + 3·P₂ = □ | √A = [[2,1],[1,2]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[2,-2],[-2,-1]] est symétrique. Ses valeurs propres : λ₁ = −2, de vecteur propre v₁ = (1 ; 2), et λ₂ = 3, de vecteur propre v₂ = (2 ; -1). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule A⁻¹ par la décomposition spectrale.
  [guided]  P_1
    = (1/5)·[[1,2],[2,4]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[1/5,2/5],[2/5,4/5]]   (cases à remplir : (1,1) (1,2) (2,1))
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 3.  [juge mat]  départ : P_2
    = (1/5)·[[4,-2],[-2,1]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[4/5,-2/5],[-2/5,1/5]]   (cases à remplir : (1,1) (1,2) (2,1))
  — A⁻¹ = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : A^(−1)
    ? Comment calculer A⁻¹ ? · Appliquer f à chaque case de A / ✔ Appliquer f aux valeurs propres : Σ f(λᵢ)Pᵢ
    = (−1/2)·P_1 + 1/3·P_2   ← f(λ₁) = 1/(−2) = −1/2, f(λ₂) = 1/3 = 1/3
    = [[1/6,-1/3],[-1/3,-1/3]]   (cases à remplir : (1,2) (2,1) (2,2))
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | A⁻¹ = (−1/2)·P₁ + 1/3·P₂ = □ | A⁻¹ = [[1/6,-1/3],[-1/3,-1/3]]
  pièges : a2_jacobian_transposed, m_spectral_entrywise, l_orthodiag_no_normalize

```

### Niveau 3

```
A = [[13,6],[6,4]] est symétrique. Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = (1 − λ)(16 − λ)   ← Valeurs propres 1 et 16
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : E_(1)
    = (1 ; -2)
  — Un vecteur propre pour λ = 16.  [juge eigvec]  départ : E_(16)
    = (2 ; 1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de 1.  [juge mat]  départ : P_1
    = (1/5)·[[1,-2],[-2,4]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[1/5,-2/5],[-2/5,4/5]]
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 16.  [juge mat]  départ : P_2
    = (1/5)·[[4,2],[2,1]]   ← u = v/‖v‖ avec vᵀv = 5
    = [[4/5,2/5],[2/5,1/5]]
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 1·P_1 + 4·P_2   ← f(λ₁) = √1 = 1, f(λ₂) = √16 = 4
    = [[17/5,6/5],[6/5,8/5]]
  — Contrôle : avec R = √A, R² = A.  [juge mat]  départ : (√A)²
    = R·R   ← Le produit R·R
    = [[13,6],[6,4]]   ← On retrouve A
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 1·P₁ + 4·P₂ = □ | √A = [[17/5,6/5],[6/5,8/5]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[34,-6],[-6,18]] est symétrique. Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = (16 − λ)(36 − λ)   ← Valeurs propres 16 et 36
  — Un vecteur propre pour λ = 16.  [juge eigvec]  départ : E_(16)
    = (1 ; 3)
  — Un vecteur propre pour λ = 36.  [juge eigvec]  départ : E_(36)
    = (3 ; -1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de 16.  [juge mat]  départ : P_1
    = (1/10)·[[1,3],[3,9]]   ← u = v/‖v‖ avec vᵀv = 10
    = [[1/10,3/10],[3/10,9/10]]
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 36.  [juge mat]  départ : P_2
    = (1/10)·[[9,-3],[-3,1]]   ← u = v/‖v‖ avec vᵀv = 10
    = [[9/10,-3/10],[-3/10,1/10]]
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 4·P_1 + 6·P_2   ← f(λ₁) = √16 = 4, f(λ₂) = √36 = 6
    = [[29/5,-3/5],[-3/5,21/5]]
  — Contrôle : avec R = √A, R² = A.  [juge mat]  départ : (√A)²
    = R·R   ← Le produit R·R
    = [[34,-6],[-6,18]]   ← On retrouve A
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 4·P₁ + 6·P₂ = □ | √A = [[29/5,-3/5],[-3/5,21/5]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[20,16],[16,20]] est symétrique. Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    = (4 − λ)(36 − λ)   ← Valeurs propres 4 et 36
  — Un vecteur propre pour λ = 4.  [juge eigvec]  départ : E_(4)
    = (1 ; -1)
  — Un vecteur propre pour λ = 36.  [juge eigvec]  départ : E_(36)
    = (1 ; 1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de 4.  [juge mat]  départ : P_1
    = (1/2)·[[1,-1],[-1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,-1/2],[-1/2,1/2]]
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 36.  [juge mat]  départ : P_2
    = (1/2)·[[1,1],[1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,1/2],[1/2,1/2]]
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 2·P_1 + 6·P_2   ← f(λ₁) = √4 = 2, f(λ₂) = √36 = 6
    = [[4,2],[2,4]]
  — Contrôle : avec R = √A, R² = A.  [juge mat]  départ : (√A)²
    = R·R   ← Le produit R·R
    = [[20,16],[16,20]]   ← On retrouve A
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 2·P₁ + 6·P₂ = □ | √A = [[4,2],[2,4]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise, l_orthodiag_no_normalize

```

### Niveau 4

```
A = [[0,2],[2,0]] est symétrique. Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule A³ par la décomposition spectrale.
  [free, suivre l'erreur]  det(A − λI)
    = (−2 − λ)(2 − λ)   ← Valeurs propres −2 et 2
  — Un vecteur propre pour λ = −2.  [juge eigvec]  départ : E_(−2)
    = (1 ; -1)
  — Un vecteur propre pour λ = 2.  [juge eigvec]  départ : E_(2)
    = (1 ; 1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de −2.  [juge mat]  départ : P_1
    = (1/2)·[[1,-1],[-1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,-1/2],[-1/2,1/2]]
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 2.  [juge mat]  départ : P_2
    = (1/2)·[[1,1],[1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,1/2],[1/2,1/2]]
  — A³ = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : A³
    = (−8)·P_1 + 8·P_2   ← f(λ₁) = (−2)³ = −8, f(λ₂) = 2³ = 8
    = [[0,8],[8,0]]
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | A³ = (−8)·P₁ + 8·P₂ = □ | A³ = [[0,8],[8,0]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise, l_orthodiag_no_normalize

A = [[-1,-1,1],[-1,-1,-1],[1,-1,-1]] est symétrique. Ses valeurs propres : λ₁ = 1 (simple, vecteur propre v = (1 ; -1 ; 1)) et λ₂ = −2 (double : le plan v⊥). Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule A⁻¹ par la décomposition spectrale.
  [free, suivre l'erreur]  E_(1)
    = (1 ; -1 ; 1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de 1.  [juge mat]  départ : P_1
    = (1/3)·[[1,-1,1],[-1,1,-1],[1,-1,1]]   ← u = v/‖v‖ avec vᵀv = 3
    = [[1/3,-1/3,1/3],[-1/3,1/3,-1/3],[1/3,-1/3,1/3]]
  — Le projecteur P₂ sur l'espace propre de −2 (le plan orthogonal à v).  [juge mat]  départ : P_2
    = I − P_1   ← P₁ + P₂ = I
    = [[2/3,1/3,-1/3],[1/3,2/3,1/3],[-1/3,1/3,2/3]]
  — A⁻¹ = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : A^(−1)
    = 1·P_1 + (−1/2)·P_2   ← f(λ₁) = 1/1 = 1, f(λ₂) = 1/(−2) = −1/2
    = [[0,-1/2,1/2],[-1/2,0,-1/2],[1/2,-1/2,0]]
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | A⁻¹ = 1·P₁ + (−1/2)·P₂ = □ | A⁻¹ = [[0,-1/2,1/2],[-1/2,0,-1/2],[1/2,-1/2,0]]
  pièges : l_eigvec_row, m_spectral_entrywise

A = [[10,6],[6,10]] est symétrique. Écris A = Σ λᵢPᵢ (Pᵢ projecteurs orthogonaux sur les espaces propres), puis calcule √A par la décomposition spectrale.
  [free, suivre l'erreur]  det(A − λI)
    = (16 − λ)(4 − λ)   ← Valeurs propres 16 et 4
  — Un vecteur propre pour λ = 16.  [juge eigvec]  départ : E_(16)
    = (1 ; 1)
  — Un vecteur propre pour λ = 4.  [juge eigvec]  départ : E_(4)
    = (1 ; -1)
  — Le projecteur P₁ = u₁u₁ᵀ sur l'espace propre de 16.  [juge mat]  départ : P_1
    = (1/2)·[[1,1],[1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,1/2],[1/2,1/2]]
  — Le projecteur P₂ = u₂u₂ᵀ sur l'espace propre de 4.  [juge mat]  départ : P_2
    = (1/2)·[[1,-1],[-1,1]]   ← u = v/‖v‖ avec vᵀv = 2
    = [[1/2,-1/2],[-1/2,1/2]]
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 4·P_1 + 2·P_2   ← f(λ₁) = √16 = 4, f(λ₂) = √4 = 2
    = [[3,1],[1,3]]
  — Contrôle : avec R = √A, R² = A.  [juge mat]  départ : (√A)²
    = R·R   ← Le produit R·R
    = [[10,6],[6,10]]   ← On retrouve A
  aides : Remplace chaque λᵢ par f(λᵢ) et garde les projecteurs : f(A) = f(λ₁)P₁ + f(λ₂)P₂. | √A = 4·P₁ + 2·P₂ = □ | √A = [[3,1],[1,3]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise, l_orthodiag_no_normalize

```

### Niveau 5

```
Soit A = 1·u₁u₁ᵀ + 36·u₂u₂ᵀ, avec u₁ = (1/√5 ; 2/√5) et u₂ = (2/√5 ; −1/√5) (base orthonormée). Donne le polynôme caractéristique de A (factorisé), puis √A.
  [free, sans aide]  det(A − λI)
    = (1 − λ)(36 − λ)   ← Valeurs propres 1 et 36
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 1·[[1/5,2/5],[2/5,4/5]] + 6·[[4/5,-2/5],[-2/5,1/5]]   ← u₁u₁ᵀ et u₂u₂ᵀ, pondérés par f(λᵢ)
    = [[5,-2],[-2,2]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise

Soit A = 4·u₁u₁ᵀ + 36·u₂u₂ᵀ, avec u₁ = (1/√2 ; −1/√2) et u₂ = (1/√2 ; 1/√2) (base orthonormée). Donne le polynôme caractéristique de A (factorisé), puis √A.
  [free, sans aide]  det(A − λI)
    = (4 − λ)(36 − λ)   ← Valeurs propres 4 et 36
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 2·[[1/2,-1/2],[-1/2,1/2]] + 6·[[1/2,1/2],[1/2,1/2]]   ← u₁u₁ᵀ et u₂u₂ᵀ, pondérés par f(λᵢ)
    = [[4,2],[2,4]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise

Soit A = 1·u₁u₁ᵀ + 16·u₂u₂ᵀ, avec u₁ = (1/√5 ; −2/√5) et u₂ = (2/√5 ; 1/√5) (base orthonormée). Donne le polynôme caractéristique de A (factorisé), puis √A.
  [free, sans aide]  det(A − λI)
    = (1 − λ)(16 − λ)   ← Valeurs propres 1 et 16
  — √A = Σ f(λᵢ)Pᵢ.  [juge mat]  départ : √A
    = 1·[[1/5,-2/5],[-2/5,4/5]] + 4·[[4/5,2/5],[2/5,1/5]]   ← u₁u₁ᵀ et u₂u₂ᵀ, pondérés par f(λᵢ)
    = [[17/5,6/5],[6/5,8/5]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_spectral_entrywise

```

### Variantes d'examen

```
A = [[2,4],[4,2]] a les valeurs propres 6 (vecteur propre (1 ; 1)) et −2 (vecteur propre (1 ; -1)). Que vaut A⁻¹ ?
  · [[1/2,1/4],[1/4,1/2]] [m_spectral_entrywise]   ✔ [[-1/6,1/3],[1/3,-1/6]]   · [[-1/3,2/3],[2/3,-1/3]] [l_orthodiag_no_normalize]   · [[-1/6,-1/3],[-1/3,-1/6]]
  [examen mcq]
  pièges : m_spectral_entrywise, l_orthodiag_no_normalize

Vrai ou faux ?
  « Si A = Σ λᵢuᵢuᵢᵀ avec (uᵢ) orthonormée, alors (uᵢuᵢᵀ)(uⱼuⱼᵀ) = 0 pour i ≠ j. » → VRAI
  [examen tf]

```

## Matrices définies positives : critères (`m-posdef`, BA4)

_Valeurs propres, mineurs, pivots : quatre critères équivalents._

### Niveau 1

```
A = [[-2,4],[4,-11]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[-2,4],[4,-11]]
    = (−2)·(−11) − 4·4   ← a₁₁a₂₂ − a₁₂a₂₁
    = □   (trous : 6)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = −2, Δ₂ = 6. Quelle est la nature de A ? · semi-définie négative / · indéfinie / · définie positive / ✔ définie négative / · semi-définie positive
    = (-2 ; -3)   (cases à remplir : (1,1) (2,1))   ← Mêmes signes que les valeurs propres : définie négative
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = (−2)·(−11) − □ | Δ₁ = −2, Δ₂ = 6 : définie négative
  pièges : l_cofactor_sign, m_sylvester_negdef, l_posdef_diag

A = [[2,-4,-2],[-4,6,4],[-2,4,1]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[2,-4],[-4,6]]
    = 2·6 − (−4)·(−4)   ← a₁₁a₂₂ − a₁₂a₂₁
    = −□   (trous : −4)
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[2,-4,-2],[-4,6,4],[-2,4,1]]
    = 2·det[[6,4],[4,1]]+4·det[[-4,4],[-2,1]]-2·det[[-4,6],[-2,4]]   ← Développement selon la première ligne
    = □   (trous : 4)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 2, Δ₂ = −4, Δ₃ = 4. Quelle est la nature de A ? · semi-définie positive / · définie positive / · définie négative / ✔ indéfinie / · semi-définie négative
    = (2 ; -2 ; -1)   (cases à remplir : (2,1) (3,1))   ← Mêmes signes que les valeurs propres : indéfinie
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 2·6 − □ | Δ₁ = 2, Δ₂ = −4, Δ₃ = 4 : indéfinie
  pièges : l_cofactor_sign, l_posdef_diag

A = [[3,-3],[-3,6]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[3,-3],[-3,6]]
    = 3·6 − (−3)·(−3)   ← a₁₁a₂₂ − a₁₂a₂₁
    = □   (trous : 9)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 3, Δ₂ = 9. Quelle est la nature de A ? ✔ définie positive / · définie négative / · semi-définie positive / · semi-définie négative / · indéfinie
    = (3 ; 3)   (cases à remplir : (1,1) (2,1))   ← Mêmes signes que les valeurs propres : définie positive
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 3·6 − □ | Δ₁ = 3, Δ₂ = 9 : définie positive
  pièges : l_cofactor_sign, l_posdef_diag

```

### Niveau 2

```
A = [[3,-3,3],[-3,7,-7],[3,-7,11]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[3,-3],[-3,7]]
    ? Quel critère est le plus court ici ? ✔ Les mineurs dominants Δ₁, Δ₂, Δ₃ / · Le signe des cases diagonales / ✔ Les valeurs propres
    = 3·7 − (−3)·(−3)   ← a₁₁a₂₂ − a₁₂a₂₁
    = □   (trous : 12)
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[3,-3,3],[-3,7,-7],[3,-7,11]]
    = 3·det[[7,-7],[-7,11]]+3·det[[-3,-7],[3,11]]+3·det[[-3,7],[3,-7]]   ← Développement selon la première ligne
    = □   (trous : 48)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 3, Δ₂ = 12, Δ₃ = 48. Quelle est la nature de A ? · semi-définie positive / ✔ définie positive / · indéfinie / · définie négative / · semi-définie négative
    = (3 ; 4 ; 4)   (cases à remplir : (1,1) (2,1) (3,1))   ← Mêmes signes que les valeurs propres : définie positive
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 3·7 − □ | Δ₁ = 3, Δ₂ = 12, Δ₃ = 48 : définie positive
  pièges : l_cofactor_sign, l_posdef_diag

A = [[-3,6],[6,-10]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[-3,6],[6,-10]]
    ? Quel critère est le plus court ici ? · Le signe des cases diagonales / ✔ Le signe de a₁₁ et de det A / ✔ Les valeurs propres
    = (−3)·(−10) − 6·6   ← a₁₁a₂₂ − a₁₂a₂₁
    = −□   (trous : −6)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = −3, Δ₂ = −6. Quelle est la nature de A ? ✔ indéfinie / · semi-définie positive / · semi-définie négative / · définie négative / · définie positive
    = (-3 ; 2)   (cases à remplir : (1,1) (2,1))   ← Mêmes signes que les valeurs propres : indéfinie
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = (−3)·(−10) − □ | Δ₁ = −3, Δ₂ = −6 : indéfinie
  pièges : l_cofactor_sign, l_posdef_diag, m_sylvester_negdef

A = [[1,-1,-1],[-1,5,-3],[-1,-3,8]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Règle : tous les Δₖ > 0 ⇔ définie positive ; Δ₁ < 0, Δ₂ > 0, Δ₃ < 0 ⇔ définie négative.
  [guided]  det[[1,-1],[-1,5]]
    ? Quel critère est le plus court ici ? · Le signe des cases diagonales / ✔ Les valeurs propres / ✔ Les mineurs dominants Δ₁, Δ₂, Δ₃
    = 1·5 − (−1)·(−1)   ← a₁₁a₂₂ − a₁₂a₂₁
    = □   (trous : 4)
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[1,-1,-1],[-1,5,-3],[-1,-3,8]]
    = det[[5,-3],[-3,8]]+det[[-1,-3],[-1,8]]-det[[-1,5],[-1,-3]]   ← Développement selon la première ligne
    = □   (trous : 12)
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 1, Δ₂ = 4, Δ₃ = 12. Quelle est la nature de A ? · définie négative / · semi-définie négative / · indéfinie / ✔ définie positive / · semi-définie positive
    = (1 ; 4 ; 3)   (cases à remplir : (1,1) (2,1) (3,1))   ← Mêmes signes que les valeurs propres : définie positive
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 1·5 − □ | Δ₁ = 1, Δ₂ = 4, Δ₃ = 12 : définie positive
  pièges : l_cofactor_sign, l_posdef_diag

```

### Niveau 3

```
A = [[2,-2],[-2,1]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det[[2,-2],[-2,1]]
    = 2·1 − (−2)·(−2)   ← a₁₁a₂₂ − a₁₂a₂₁
    = −2
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 2, Δ₂ = −2. Quelle est la nature de A ? · semi-définie positive / · définie négative / · définie positive / ✔ indéfinie / · semi-définie négative
    = (2 ; -1)   ← Mêmes signes que les valeurs propres : indéfinie
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 2·1 − □ | Δ₁ = 2, Δ₂ = −2 : indéfinie
  pièges : l_cofactor_sign, l_posdef_diag

A = [[1,2,0],[2,6,4],[0,4,10]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det[[1,2],[2,6]]
    = 1·6 − 2·2   ← a₁₁a₂₂ − a₁₂a₂₁
    = 2
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[1,2,0],[2,6,4],[0,4,10]]
    = det[[6,4],[4,10]]-2·det[[2,4],[0,10]]   ← Développement selon la première ligne
    = 4
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 1, Δ₂ = 2, Δ₃ = 4. Quelle est la nature de A ? · indéfinie / · semi-définie positive / · définie négative / · semi-définie négative / ✔ définie positive
    = (1 ; 2 ; 2)   ← Mêmes signes que les valeurs propres : définie positive
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 1·6 − □ | Δ₁ = 1, Δ₂ = 2, Δ₃ = 4 : définie positive
  pièges : l_cofactor_sign, l_posdef_diag

A = [[1,1],[1,3]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det[[1,1],[1,3]]
    = 1·3 − 1·1   ← a₁₁a₂₂ − a₁₂a₂₁
    = 2
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = 1, Δ₂ = 2. Quelle est la nature de A ? · définie négative / · indéfinie / ✔ définie positive / · semi-définie positive / · semi-définie négative
    = (1 ; 2)   ← Mêmes signes que les valeurs propres : définie positive
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = 1·3 − □ | Δ₁ = 1, Δ₂ = 2 : définie positive
  pièges : l_cofactor_sign, l_posdef_diag

```

### Niveau 4

```
A = [[1,a],[a,4]], avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.
  [free, suivre l'erreur]  det[[1,a],[a,4]]
    = 4 − a²   ← Δ₂ = 1·4 − a²
  — Δ₁ = 1 > 0. A est définie positive si et seulement si Δ₂ > 0 : résous en a.  [juge solset]  départ : 4 − a² > 0
    = a² < 4   ← Isoler a²
    = −2 < a < 2   ← Racine carrée : |a| < 2
    = ]−2 ; 2[
  aides : Tous les mineurs dominants doivent être > 0 : Δ₁, puis Δ₂ (et Δ₃), qui dépendent de a. | Δ₂ = 1·4 − □ > 0 | a ∈ ]−2 ; 2[
  pièges : m_sylvester_semidef

A = [[-1,1,0],[1,-4,0],[0,0,-1]] est symétrique. Est-elle définie positive, définie négative, ou indéfinie ? Utilise les mineurs principaux dominants (critère de Sylvester), puis contrôle avec les pivots.
  [free, suivre l'erreur]  det[[-1,1],[1,-4]]
    = (−1)·(−4) − 1·1   ← a₁₁a₂₂ − a₁₂a₂₁
    = 3
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[-1,1,0],[1,-4,0],[0,0,-1]]
    = -det[[-4,0],[0,-1]]-det[[1,0],[0,-1]]   ← Développement selon la première ligne
    = −3
  — Contrôle par un second critère : les pivots de Gauss sans échange, dₖ = Δₖ/Δₖ₋₁.  [juge mat]  départ : πvots
    ? Δ₁ = −1, Δ₂ = 3, Δ₃ = −3. Quelle est la nature de A ? · indéfinie / ✔ définie négative / · définie positive / · semi-définie négative / · semi-définie positive
    = (-1 ; -3 ; -1)   ← Mêmes signes que les valeurs propres : définie négative
  aides : Calcule les déterminants des coins en haut à gauche, de taille 1, 2, 3. Tous > 0 : définie positive ; signes −, +, − : définie négative ; un mauvais signe (et aucun nul) : indéfinie. | Δ₂ = (−1)·(−4) − □ | Δ₁ = −1, Δ₂ = 3, Δ₃ = −3 : définie négative
  pièges : l_cofactor_sign, m_sylvester_negdef, l_posdef_diag

A = [[3,a],[a,12]], avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.
  [free, suivre l'erreur]  det[[3,a],[a,12]]
    = 36 − a²   ← Δ₂ = 3·12 − a²
  — Δ₁ = 3 > 0. A est définie positive si et seulement si Δ₂ > 0 : résous en a.  [juge solset]  départ : 36 − a² > 0
    = a² < 36   ← Isoler a²
    = −6 < a < 6   ← Racine carrée : |a| < 6
    = ]−6 ; 6[
  aides : Tous les mineurs dominants doivent être > 0 : Δ₁, puis Δ₂ (et Δ₃), qui dépendent de a. | Δ₂ = 3·12 − □ > 0 | a ∈ ]−6 ; 6[
  pièges : m_sylvester_semidef

```

### Niveau 5

```
A = [[1,a,0],[a,10,1],[0,1,1]], avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.
  [free, sans aide]  det[[1,a],[a,10]]
    = 10 − a²   ← Δ₂ = 1·10 − a²
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[1,a,0],[a,10,1],[0,1,1]]
    = 9 − a²   ← Développer, puis réduire
  — Δ₁ = 1 > 0. A est définie positive si et seulement si Δ₂ > 0 et Δ₃ > 0 (ici Δ₃ > 0 entraîne Δ₂ > 0) : résous en a.  [juge solset]  départ : 9 − a² > 0
    = a² < 9   ← Isoler a²
    = −3 < a < 3   ← Racine carrée : |a| < 3
    = ]−3 ; 3[
  pièges : m_sylvester_semidef

A = [[1,a,0],[a,5,2],[0,2,1]], avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.
  [free, sans aide]  det[[1,a],[a,5]]
    = 5 − a²   ← Δ₂ = 1·5 − a²
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[1,a,0],[a,5,2],[0,2,1]]
    = 1 − a²   ← Développer, puis réduire
  — Δ₁ = 1 > 0. A est définie positive si et seulement si Δ₂ > 0 et Δ₃ > 0 (ici Δ₃ > 0 entraîne Δ₂ > 0) : résous en a.  [juge solset]  départ : 1 − a² > 0
    = a² < 1   ← Isoler a²
    = −1 < a < 1   ← Racine carrée : |a| < 1
    = ]−1 ; 1[
  pièges : m_sylvester_semidef

A = [[2,a,0],[a,5,1],[0,1,2]], avec un paramètre réel a. Pour quelles valeurs de a la matrice A est-elle définie positive ? Calcule les mineurs dominants, puis résous.
  [free, sans aide]  det[[2,a],[a,5]]
    = 10 − a²   ← Δ₂ = 2·5 − a²
  — Le mineur Δ₃ = det A :  [juge det]  départ : det[[2,a,0],[a,5,1],[0,1,2]]
    = 18 − 2a²   ← Développer, puis réduire
  — Δ₁ = 2 > 0. A est définie positive si et seulement si Δ₂ > 0 et Δ₃ > 0 (ici Δ₃ > 0 entraîne Δ₂ > 0) : résous en a.  [juge solset]  départ : 18 − 2a² > 0
    = a² < 9   ← Isoler a²
    = −3 < a < 3   ← Racine carrée : |a| < 3
    = ]−3 ; 3[
  pièges : m_sylvester_semidef

```

### Variantes d'examen

```
Quelle est la nature de la matrice symétrique A = [[1,-2,0],[-2,4,0],[0,0,-3]] ?
  · définie positive   ✔ indéfinie   · définie négative   · semi-définie positive [m_sylvester_semidef]
  [examen mcq]
  pièges : m_sylvester_semidef

Vrai ou faux ?
  « Une matrice symétrique définie positive est inversible. » → VRAI
  [examen tf]

```

## Factorisation de Cholesky pas à pas (`m-cholesky`, BA4)

_Colonne par colonne : une racine sur la diagonale, une division dessous._

### Niveau 1

```
A = [[9,6,-6],[6,13,2],[-6,2,9]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √9)   ← Racine de ce qui reste
    = □   (trous : 3)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = □÷3   (trous : 6÷3)   ← Divisé par le pivot de la colonne
    = □   (trous : 2)
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = −□÷3   (trous : −6÷3)   ← Divisé par le pivot de la colonne
    = −□   (trous : −2)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(13 − 2^□)   (trous : √(13 − 2²))   ← Racine de ce qui reste
    = □   (trous : 3)
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (2 − (−2)·2)/□   (trous : (2 − (−2)·2)/3)   ← Divisé par le pivot de la colonne
    = □   (trous : 2)
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(9 − (−2)² − 2^□)   (trous : √(9 − (−2)² − 2²))   ← Racine de ce qui reste
    = □   (trous : 1)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[2,3,0],[-2,2,1]]   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (2 − □·□)/3 | L = [[3,0,0],[2,3,0],[-2,2,1]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

A = [[4,-4],[-4,8]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √4)   ← Racine de ce qui reste
    = □   (trous : 2)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = −□÷2   (trous : −4÷2)   ← Divisé par le pivot de la colonne
    = −□   (trous : −2)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(8 − (−2)^□)   (trous : √(8 − (−2)²))   ← Racine de ce qui reste
    = □   (trous : 2)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[2,0],[-2,2]]   (cases à remplir : (2,2))   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₂₂ = √(8 − □²) | L = [[2,0],[-2,2]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

A = [[4,2,4],[2,10,-1],[4,-1,6]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √4)   ← Racine de ce qui reste
    = □   (trous : 2)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = □÷2   (trous : 2÷2)   ← Divisé par le pivot de la colonne
    = □   (trous : 1)
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = □÷2   (trous : 4÷2)   ← Divisé par le pivot de la colonne
    = □   (trous : 2)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(10 − 1^□)   (trous : √(10 − 1²))   ← Racine de ce qui reste
    = □   (trous : 3)
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (−1 − 2·1)/□   (trous : (−1 − 2·1)/3)   ← Divisé par le pivot de la colonne
    = −□   (trous : −1)
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(6 − 2² − (−1)^□)   (trous : √(6 − 2² − (−1)²))   ← Racine de ce qui reste
    = □   (trous : 1)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[2,0,0],[1,3,0],[2,-1,1]]   (cases à remplir : (2,2))   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−1 − □·□)/3 | L = [[2,0,0],[1,3,0],[2,-1,1]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

```

### Niveau 2

```
A = [[4,6,-2],[6,13,-5],[-2,-5,3]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √4)   ← Racine de ce qui reste
    = □   (trous : 2)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = □÷2   (trous : 6÷2)   ← Divisé par le pivot de la colonne
    = □   (trous : 3)
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = −□÷2   (trous : −2÷2)   ← Divisé par le pivot de la colonne
    = −□   (trous : −1)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    ? Comment obtient-on ℓ₂₂ ? · √(a₂₂ + ℓ₂₁²) / · a₂₂ − ℓ₂₁² / ✔ √(a₂₂ − ℓ₂₁²)
    = √(13 − 3^□)   (trous : √(13 − 3²))   ← Racine de ce qui reste
    = □   (trous : 2)
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    ? Comment obtient-on ℓ₃₂ ? · a₃₂ − ℓ₃₁ℓ₂₁ / · (a₃₂ + ℓ₃₁ℓ₂₁)/ℓ₂₂ / ✔ (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂
    = (−5 − (−1)·3)/□   (trous : (−5 − (−1)·3)/2)   ← Divisé par le pivot de la colonne
    = −□   (trous : −1)
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(3 − (−1)² − (−1)^□)   (trous : √(3 − (−1)² − (−1)²))   ← Racine de ce qui reste
    = □   (trous : 1)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[2,0,0],[3,2,0],[-1,-1,1]]   (cases à remplir : (1,1) (3,1))   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−5 − □·□)/2 | L = [[2,0,0],[3,2,0],[-1,-1,1]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

A = [[1,1,-1],[1,5,-5],[-1,-5,9]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √1)   ← Racine de ce qui reste
    = □   (trous : 1)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = □÷1   (trous : 1÷1)   ← Divisé par le pivot de la colonne
    = □   (trous : 1)
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = −□÷1   (trous : −1÷1)   ← Divisé par le pivot de la colonne
    = −□   (trous : −1)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    ? Comment obtient-on ℓ₂₂ ? ✔ √(a₂₂ − ℓ₂₁²) / · √(a₂₂ + ℓ₂₁²) / · a₂₂ − ℓ₂₁²
    = √(5 − 1^□)   (trous : √(5 − 1²))   ← Racine de ce qui reste
    = □   (trous : 2)
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    ? Comment obtient-on ℓ₃₂ ? ✔ (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂ / · a₃₂ − ℓ₃₁ℓ₂₁ / · (a₃₂ + ℓ₃₁ℓ₂₁)/ℓ₂₂
    = (−5 − (−1)·1)/□   (trous : (−5 − (−1)·1)/2)   ← Divisé par le pivot de la colonne
    = −□   (trous : −2)
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(9 − (−1)² − (−2)^□)   (trous : √(9 − (−1)² − (−2)²))   ← Racine de ce qui reste
    = □   (trous : 2)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[1,0,0],[1,2,0],[-1,-2,2]]   (cases à remplir : (2,1))   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−5 − □·□)/2 | L = [[1,0,0],[1,2,0],[-1,-2,2]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

A = [[9,-3,6],[-3,10,-8],[6,-8,12]] est symétrique définie positive. Trouve L triangulaire inférieure, à diagonale positive, telle que A = LLᵀ : calcule les ℓᵢⱼ colonne par colonne.
  [guided]  l_11
    (ℓ₁₁ = √a₁₁)
    = √□   (trous : √9)   ← Racine de ce qui reste
    = □   (trous : 3)
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = −□÷3   (trous : −3÷3)   ← Divisé par le pivot de la colonne
    = −□   (trous : −1)
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = □÷3   (trous : 6÷3)   ← Divisé par le pivot de la colonne
    = □   (trous : 2)
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    ? Comment obtient-on ℓ₂₂ ? · a₂₂ − ℓ₂₁² / ✔ √(a₂₂ − ℓ₂₁²) / · √(a₂₂ + ℓ₂₁²)
    = √(10 − (−1)^□)   (trous : √(10 − (−1)²))   ← Racine de ce qui reste
    = □   (trous : 3)
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    ? Comment obtient-on ℓ₃₂ ? · a₃₂ − ℓ₃₁ℓ₂₁ / ✔ (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂ / · (a₃₂ + ℓ₃₁ℓ₂₁)/ℓ₂₂
    = (−8 − 2·(−1))/□   (trous : (−8 − 2·(−1))/3)   ← Divisé par le pivot de la colonne
    = −□   (trous : −2)
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(12 − 2² − (−2)^□)   (trous : √(12 − 2² − (−2)²))   ← Racine de ce qui reste
    = □   (trous : 2)
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[-1,3,0],[2,-2,2]]   (cases à remplir : (1,1) (3,3))   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−8 − □·□)/3 | L = [[3,0,0],[-1,3,0],[2,-2,2]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

```

### Niveau 3

```
Factorisation de Cholesky de A = [[4,2,6],[2,10,9],[6,9,22]] : pour chaque coefficient de L, choisis d'abord l'action, puis écris la ligne.
  [tap, suivre l'erreur, menu menu]  l_11
    (ℓ₁₁ = √a₁₁)
    = √4   ← Racine de ce qui reste
    = 2
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = 2÷2   ← Divisé par le pivot de la colonne
    = 1
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = 6÷2   ← Divisé par le pivot de la colonne
    = 3
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(10 − 1²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (9 − 3·1)/3   ← Divisé par le pivot de la colonne
    = 2
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(22 − 3² − 2²)   ← Racine de ce qui reste
    = 3
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[2,0,0],[1,3,0],[3,2,3]]   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (9 − □·□)/3 | L = [[2,0,0],[1,3,0],[3,2,3]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

Factorisation de Cholesky de A = [[9,-3,3],[-3,10,8],[3,8,19]] : pour chaque coefficient de L, choisis d'abord l'action, puis écris la ligne.
  [tap, suivre l'erreur, menu menu]  l_11
    (ℓ₁₁ = √a₁₁)
    = √9   ← Racine de ce qui reste
    = 3
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = −3÷3   ← Divisé par le pivot de la colonne
    = −1
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = 3÷3   ← Divisé par le pivot de la colonne
    = 1
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(10 − (−1)²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (8 − 1·(−1))/3   ← Divisé par le pivot de la colonne
    = 3
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(19 − 1² − 3²)   ← Racine de ce qui reste
    = 3
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[-1,3,0],[1,3,3]]   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (8 − □·□)/3 | L = [[3,0,0],[-1,3,0],[1,3,3]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

Factorisation de Cholesky de A = [[9,-6,3],[-6,13,-5],[3,-5,11]] : pour chaque coefficient de L, choisis d'abord l'action, puis écris la ligne.
  [tap, suivre l'erreur, menu menu]  l_11
    (ℓ₁₁ = √a₁₁)
    = √9   ← Racine de ce qui reste
    = 3
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = −6÷3   ← Divisé par le pivot de la colonne
    = −2
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = 3÷3   ← Divisé par le pivot de la colonne
    = 1
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(13 − (−2)²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (−5 − 1·(−2))/3   ← Divisé par le pivot de la colonne
    = −1
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(11 − 1² − (−1)²)   ← Racine de ce qui reste
    = 3
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[-2,3,0],[1,-1,3]]   ← Contrôle : LLᵀ = A
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−5 − □·□)/3 | L = [[3,0,0],[-2,3,0],[1,-1,3]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

```

### Niveau 4

```
Factorise A = [[9,3,-3],[3,10,5],[-3,5,6]] en A = LLᵀ, puis résous Ax = b avec b = (−6 ; −8 ; −3) : d'abord Ly = b, puis Lᵀx = y.
  [free, suivre l'erreur]  l_11
    (ℓ₁₁ = √a₁₁)
    = √9   ← Racine de ce qui reste
    = 3
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = 3÷3   ← Divisé par le pivot de la colonne
    = 1
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = −3÷3   ← Divisé par le pivot de la colonne
    = −1
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(10 − 1²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (5 − (−1)·1)/3   ← Divisé par le pivot de la colonne
    = 2
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(6 − (−1)² − 2²)   ← Racine de ce qui reste
    = 1
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[1,3,0],[-1,2,1]]   ← Contrôle : LLᵀ = A
  — Résous Ly = b, avec b = (−6 ; −8 ; −3) (de haut en bas).  [juge mat]  départ : y
    = (-2 ; -2 ; -1)   ← Substitution avant
  — Puis Lᵀx = y (de bas en haut).  [juge mat]  départ : x
    = (-1 ; 0 ; -1)   ← Substitution arrière
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (5 − □·□)/3 | L = [[3,0,0],[1,3,0],[-1,2,1]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

Factorise A = [[9,-6,9],[-6,13,-12],[9,-12,17]] en A = LLᵀ, puis résous Ax = b avec b = (−3 ; −13 ; 11) : d'abord Ly = b, puis Lᵀx = y.
  [free, suivre l'erreur]  l_11
    (ℓ₁₁ = √a₁₁)
    = √9   ← Racine de ce qui reste
    = 3
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = −6÷3   ← Divisé par le pivot de la colonne
    = −2
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = 9÷3   ← Divisé par le pivot de la colonne
    = 3
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(13 − (−2)²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (−12 − 3·(−2))/3   ← Divisé par le pivot de la colonne
    = −2
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(17 − 3² − (−2)²)   ← Racine de ce qui reste
    = 2
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[-2,3,0],[3,-2,2]]   ← Contrôle : LLᵀ = A
  — Résous Ly = b, avec b = (−3 ; −13 ; 11) (de haut en bas).  [juge mat]  départ : y
    = (-1 ; -5 ; 2)   ← Substitution avant
  — Puis Lᵀx = y (de bas en haut).  [juge mat]  départ : x
    = (-2 ; -1 ; 1)   ← Substitution arrière
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−12 − □·□)/3 | L = [[3,0,0],[-2,3,0],[3,-2,2]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

Factorise A = [[9,3,-6],[3,10,-8],[-6,-8,17]] en A = LLᵀ, puis résous Ax = b avec b = (−9 ; 9 ; 7) : d'abord Ly = b, puis Lᵀx = y.
  [free, suivre l'erreur]  l_11
    (ℓ₁₁ = √a₁₁)
    = √9   ← Racine de ce qui reste
    = 3
  — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
    = 3÷3   ← Divisé par le pivot de la colonne
    = 1
  — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
    = −6÷3   ← Divisé par le pivot de la colonne
    = −2
  — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
    = √(10 − 1²)   ← Racine de ce qui reste
    = 3
  — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
    = (−8 − (−2)·1)/3   ← Divisé par le pivot de la colonne
    = −2
  — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
    = √(17 − (−2)² − (−2)²)   ← Racine de ce qui reste
    = 3
  — Assemble L (triangulaire inférieure).  [juge factor]  départ : A = LLᵀ
    = L = [[3,0,0],[1,3,0],[-2,-2,3]]   ← Contrôle : LLᵀ = A
  — Résous Ly = b, avec b = (−9 ; 9 ; 7) (de haut en bas).  [juge mat]  départ : y
    = (-3 ; 4 ; 3)   ← Substitution avant
  — Puis Lᵀx = y (de bas en haut).  [juge mat]  départ : x
    = (-1 ; 2 ; 1)   ← Substitution arrière
  aides : Sur la diagonale : racine de ce qui reste ; dessous : division par le pivot de la colonne. On avance colonne par colonne. | ℓ₃₂ = (−8 − □·□)/3 | L = [[3,0,0],[1,3,0],[-2,-2,3]]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

```

### Niveau 5

```
On factorise A = [[4,-2,-2],[-2,5,5],[-2,5,6]] = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut ℓ₃₂ ?
  [free, sans aide]  l_32
    = 2
  pièges : m_chol_sum_sign, m_chol_no_sqrt

On factorise A = [[9,-6,3],[-6,13,7],[3,7,11]] = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut ℓ₂₂ ?
  [free, sans aide]  l_22
    = 3
  pièges : m_chol_sum_sign, m_chol_no_sqrt

On factorise A = [[4,-2,-4],[-2,10,2],[-4,2,8]] = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut ℓ₃₂ ?
  [free, sans aide]  l_32
    = 0
  pièges : m_chol_sum_sign, m_chol_no_sqrt

```

### Variantes d'examen

```
On factorise A = [[4,-4,4],[-4,8,-8],[4,-8,17]] = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut ℓ₃₂ ?
  [free, sans aide, examen coef]  l_32
    = −2
  pièges : m_chol_sum_sign, m_chol_no_sqrt

On factorise A = [[9,6,-3],[6,8,-4],[-3,-4,11]] = LLᵀ (Cholesky : L triangulaire inférieure, diagonale > 0). Que vaut ℓ₃₃ ?
  · 11   · 9 [m_chol_no_sqrt]   · √13 [m_chol_sum_sign]   ✔ 3
  [examen mcq]
  pièges : m_chol_no_sqrt, m_chol_sum_sign

Vrai ou faux ?
  « Toute matrice symétrique inversible a une factorisation de Cholesky A = LLᵀ. » → FAUX
    contre-exemple (mx) : A = [[0,1],[1,0]]
  [examen tf]

C = [[9,-3,-6],[-3,5,-2],[-6,-2,9]] et b = (−12 ; 20 ; −10). (a) Factorise C = LLᵀ (Cholesky). (b) Résous Cx = b. (c) Calcule det C. (d) Justifie que C est définie positive.
  [problème, examen open, 7 points]
  partie 1 ((a) Factorisation : 0,5 ; ℓ₂₁ = a₂₁/ℓ₁₁ : 0,5 ; ℓ₃₁ = a₃₁/ℓ₁₁ : 0,5 ; ℓ₂₂ = √(a₂₂ − ℓ₂₁²) : 0,5 ; ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂ : 0,5 ; ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²) : 0,5)
  (a) Factorise C = LLᵀ : les ℓᵢⱼ, colonne par colonne.
    [free, sans aide, suivre l'erreur]  l_11
      (ℓ₁₁ = √a₁₁)
      = √9   ← Racine de ce qui reste
      = 3
    — ℓ₂₁ = a₂₁/ℓ₁₁  [juge value]  départ : l_21
      = −3÷3   ← Divisé par le pivot de la colonne
      = −1
    — ℓ₃₁ = a₃₁/ℓ₁₁  [juge value]  départ : l_31
      = −6÷3   ← Divisé par le pivot de la colonne
      = −2
    — ℓ₂₂ = √(a₂₂ − ℓ₂₁²)  [juge value]  départ : l_22
      = √(5 − (−1)²)   ← Racine de ce qui reste
      = 2
    — ℓ₃₂ = (a₃₂ − ℓ₃₁ℓ₂₁)/ℓ₂₂  [juge value]  départ : l_32
      = (−2 − (−2)·(−1))/2   ← Divisé par le pivot de la colonne
      = −2
    — ℓ₃₃ = √(a₃₃ − ℓ₃₁² − ℓ₃₂²)  [juge value]  départ : l_33
      = √(9 − (−2)² − (−2)²)   ← Racine de ce qui reste
      = 1
  partie 2 ((b) Résolution : 1 ; Puis Lᵀx = y (de bas en haut). : 1)
  (b) Résous Cx = b, b = (−12 ; 20 ; −10).
    [free, sans aide, suivre l'erreur]  y
      (Résous Ly = b, avec b = (−12 ; 20 ; −10) (de haut en bas).)
      = (-4 ; 8 ; -2)   ← Substitution avant
    — Puis Lᵀx = y (de bas en haut).  [juge mat]  départ : x
      = (-2 ; 2 ; -2)   ← Substitution arrière
  partie 3 ((c) Déterminant : 1)
  (c) Calcule det C.
    [free, sans aide, suivre l'erreur]  det(C)
      = (3·2·1)²   ← det C = (ℓ₁₁ℓ₂₂ℓ₃₃)²
      = 36
  partie 4 ((d) Définie positive : 1)
  (d) Pourquoi C est-elle définie positive ?
    ✔ La factorisation C = LLᵀ existe, avec une diagonale de L strictement positive   · det C > 0   · C est symétrique   · La diagonale de C est positive [l_posdef_diag]
  pièges : m_chol_no_sqrt, l_posdef_diag

```

## Gradient et hessienne d'une forme quadratique (`m-quad-gradient`, BA4)

_∇f = Ax − b, Hess f = A ; le minimum résout Ax = b._

### Niveau 1

```
f(x, y) = 2x² + 3xy + y² − 2x − y − 3. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[4,3],[3,2]]   (cases à remplir : (1,1) (2,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (2 ; 1)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (2 ; 1)   ← Ax − b
    = (4x+3y-2 ; 3x+2y-1)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(2 ; 1)   ← Ax = b
    = (-1 ; 2)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 4, −1.) ✔ Point selle : A est indéfinie / · Maximum global : A est définie négative / · Minimum global : la diagonale de A est positive / · Minimum global : A est définie positive
    = −3 − 1/2·(2·(−1) + 1·2)   ← f(x*) = c − ½bᵀx*
    = −3
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[4, □], [□, 2]] | ∇f = (4x + 3y − 2 ; 3x + 2y − 1)
  pièges : m_grad_factor, l_posdef_diag

f(x, y) = x² + 2xy + 3y² − 4x − 8y + 2. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[2,2],[2,6]]   (cases à remplir : (1,2) (2,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (4 ; 8)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (4 ; 8)   ← Ax − b
    = (2x+2y-4 ; 2x+6y-8)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(4 ; 8)   ← Ax = b
    = (1 ; 1)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 2, 8.) · Point selle : A est indéfinie / · Maximum global : A est définie négative / ✔ Minimum global : A est définie positive
    = 2 − 1/2·(4·1 + 8·1)   ← f(x*) = c − ½bᵀx*
    = −4
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[2, □], [□, 6]] | ∇f = (2x + 2y − 4 ; 2x + 6y − 8)
  pièges : m_grad_factor

f(x, y) = 3x² + 2xy − y² − 8x − 8y − 2. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[6,2],[2,-2]]   (cases à remplir : (1,1) (2,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (8 ; 8)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (8 ; 8)   ← Ax − b
    = (6x+2y-8 ; 2x-2y-8)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(8 ; 8)   ← Ax = b
    = (2 ; -2)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 6, −16.) ✔ Point selle : A est indéfinie / · Minimum global : A est définie positive / · Maximum global : A est définie négative
    = −2 − 1/2·(8·2 + 8·(−2))   ← f(x*) = c − ½bᵀx*
    = −2
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[6, □], [□, −2]] | ∇f = (6x + 2y − 8 ; 2x − 2y − 8)
  pièges : m_grad_factor, l_posdef_diag

```

### Niveau 2

```
f(x, y) = 2x² − 3xy + 2y² − 11x + 10y + 2. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[4,-3],[-3,4]]   (cases à remplir : (1,1) (1,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (11 ; -10)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    ? Que vaut ∇f pour f = ½xᵀAx − bᵀx + c ? ✔ Ax − b / · ½Ax − b / · 2Ax − b
    = A·(x ; y) - (11 ; -10)   ← Ax − b
    = (4x-3y-11 ; -3x+4y+10)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(11 ; -10)   ← Ax = b
    = (2 ; -1)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 4, 7.) · Maximum global : A est définie négative / ✔ Minimum global : A est définie positive / · Point selle : A est indéfinie
    = 2 − 1/2·(11·2 + (−10)·(−1))   ← f(x*) = c − ½bᵀx*
    = −14
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[4, □], [□, 4]] | ∇f = (4x − 3y − 11 ; −3x + 4y + 10)
  pièges : m_grad_factor

f(x, y) = 2x² − xy + 2y² − 7x − 2y − 1. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[4,-1],[-1,4]]   (cases à remplir : (1,1) (1,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (7 ; 2)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    ? Que vaut ∇f pour f = ½xᵀAx − bᵀx + c ? ✔ Ax − b / · 2Ax − b / · ½Ax − b
    = A·(x ; y) - (7 ; 2)   ← Ax − b
    = (4x-y-7 ; -x+4y-2)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(7 ; 2)   ← Ax = b
    = (2 ; 1)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 4, 15.) · Point selle : A est indéfinie / ✔ Minimum global : A est définie positive / · Maximum global : A est définie négative
    = −1 − 1/2·(7·2 + 2·1)   ← f(x*) = c − ½bᵀx*
    = −9
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[4, □], [□, 4]] | ∇f = (4x − y − 7 ; −x + 4y − 2)
  pièges : m_grad_factor

f(x, y) = 2x² − 3xy + 3y² + 11x − 12y − 1. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.
  [guided]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[4,-3],[-3,6]]   (cases à remplir : (1,1) (2,2))   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (-11 ; 12)   (cases à remplir : (1,1))   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    ? Que vaut ∇f pour f = ½xᵀAx − bᵀx + c ? · ½Ax − b / · 2Ax − b / ✔ Ax − b
    = A·(x ; y) - (-11 ; 12)   ← Ax − b
    = (4x-3y+11 ; -3x+6y-12)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(-11 ; 12)   ← Ax = b
    = (-2 ; 1)   (cases à remplir : (1,1))   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? (Mineurs principaux de A : 4, 15.) · Maximum global : A est définie négative / · Point selle : A est indéfinie / ✔ Minimum global : A est définie positive
    = −1 − 1/2·((−11)·(−2) + 12·1)   ← f(x*) = c − ½bᵀx*
    = −18
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[4, □], [□, 6]] | ∇f = (4x − 3y + 11 ; −3x + 6y − 12)
  pièges : m_grad_factor

```

### Niveau 3

```
f(x, y) = x² − 3xy + 3y² − 5x + 9y − 2. Choisis chaque action : A et b, ∇f, x*, puis f(x*) et la nature de x*.
  [tap, suivre l'erreur, menu menu]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[2,-3],[-3,6]]   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (5 ; -9)   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (5 ; -9)   ← Ax − b
    = (2x-3y-5 ; -3x+6y+9)   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(5 ; -9)   ← Ax = b
    = (1 ; -1)   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? ✔ Minimum global : A est définie positive / · Point selle : A est indéfinie / · Maximum global : A est définie négative
    = −2 − 1/2·(5·1 + (−9)·(−1))   ← f(x*) = c − ½bᵀx*
    = −9
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[2, □], [□, 6]] | ∇f = (2x − 3y − 5 ; −3x + 6y + 9)
  pièges : m_grad_factor

f(x, y) = 3x² + 3xy + y² + 12x + 7y − 2. Choisis chaque action : A et b, ∇f, x*, puis f(x*) et la nature de x*.
  [tap, suivre l'erreur, menu menu]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[6,3],[3,2]]   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (-12 ; -7)   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (-12 ; -7)   ← Ax − b
    = (6x+3y+12 ; 3x+2y+7)   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(-12 ; -7)   ← Ax = b
    = (-1 ; -2)   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? · Maximum global : A est définie négative / ✔ Minimum global : A est définie positive / · Point selle : A est indéfinie
    = −2 − 1/2·((−12)·(−1) + (−7)·(−2))   ← f(x*) = c − ½bᵀx*
    = −15
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[6, □], [□, 2]] | ∇f = (6x + 3y + 12 ; 3x + 2y + 7)
  pièges : m_grad_factor

f(x, y) = x² + 2xy − y² − 2x + 6y + 3. Choisis chaque action : A et b, ∇f, x*, puis f(x*) et la nature de x*.
  [tap, suivre l'erreur, menu menu]  A
    (La matrice A de ½xᵀAx (symétrique))
    = [[2,2],[2,-2]]   ← Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy
  — Le vecteur b de −bᵀx  [juge mat]  départ : b
    = (2 ; -6)   ← Les coefficients de degré 1, changés de signe
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = A·(x ; y) - (2 ; -6)   ← Ax − b
    = (2x+2y-2 ; 2x-2y+6)   ← Ligne par ligne
  — Le point stationnaire : ∇f = 0  [juge mat]  départ : x*
    = A^(-1)·(2 ; -6)   ← Ax = b
    = (-1 ; 2)   ← Le système Ax = b
  — La valeur f(x*) = c − ½bᵀx*  [juge value]  départ : f
    ? Quelle est la nature de x* ? ✔ Point selle : A est indéfinie / · Maximum global : A est définie négative / · Minimum global : A est définie positive
    = 3 − 1/2·(2·(−1) + (−6)·2)   ← f(x*) = c − ½bᵀx*
    = 10
  aides : Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b. | A = [[2, □], [□, −2]] | ∇f = (2x + 2y − 2 ; 2x − 2y + 6)
  pièges : m_grad_factor, l_posdef_diag

```

### Niveau 4

```
f(x) = xᵀMx − bᵀx avec M = [[2,-2],[0,2]] (non symétrique) et b = (−4 ; −4), c'est-à-dire f = 2x² − 2xy + 2y² + 4x + 4y. Trouve la matrice symétrique S de la forme, puis ∇f et le point stationnaire.
  [free, suivre l'erreur]  S
    (La matrice symétrique S telle que xᵀMx = xᵀSx)
    = [[2,-1],[-1,2]]   ← S = (M + Mᵀ)/2
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = (M + M^T)·(x ; y) - (-4 ; -4)   ← ∇(xᵀMx) = (M + Mᵀ)x
    = (4x-2y+4 ; -2x+4y+4)
  — Le point stationnaire  [juge mat]  départ : x*
    = (-2 ; -2)   ← (M + Mᵀ)x = b
  aides : xᵀMx = xᵀSx avec S = (M + Mᵀ)/2 symétrique ; ∇(xᵀMx) = (M + Mᵀ)x. | S = [[2, □], [□, 2]] | ∇f = (4x − 2y + 4 ; −2x + 4y + 4)
  pièges : m_grad_nonsym, l_quadform_offdiag

f(x) = xᵀMx − bᵀx avec M = [[2,3],[-1,1]] (non symétrique) et b = (12 ; 8), c'est-à-dire f = 2x² + 2xy + y² − 12x − 8y. Trouve la matrice symétrique S de la forme, puis ∇f et le point stationnaire.
  [free, suivre l'erreur]  S
    (La matrice symétrique S telle que xᵀMx = xᵀSx)
    = [[2,1],[1,1]]   ← S = (M + Mᵀ)/2
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = (M + M^T)·(x ; y) - (12 ; 8)   ← ∇(xᵀMx) = (M + Mᵀ)x
    = (4x+2y-12 ; 2x+2y-8)
  — Le point stationnaire  [juge mat]  départ : x*
    = (2 ; 2)   ← (M + Mᵀ)x = b
  aides : xᵀMx = xᵀSx avec S = (M + Mᵀ)/2 symétrique ; ∇(xᵀMx) = (M + Mᵀ)x. | S = [[2, □], [□, 1]] | ∇f = (4x + 2y − 12 ; 2x + 2y − 8)
  pièges : m_grad_nonsym, l_quadform_offdiag

f(x) = xᵀMx − bᵀx avec M = [[2,0],[-2,1]] (non symétrique) et b = (−4 ; 0), c'est-à-dire f = 2x² − 2xy + y² + 4x. Trouve la matrice symétrique S de la forme, puis ∇f et le point stationnaire.
  [free, suivre l'erreur]  S
    (La matrice symétrique S telle que xᵀMx = xᵀSx)
    = [[2,-1],[-1,1]]   ← S = (M + Mᵀ)/2
  — Le gradient ∇f  [juge mat]  départ : ∇f
    = (M + M^T)·(x ; y) - (-4 ; 0)   ← ∇(xᵀMx) = (M + Mᵀ)x
    = (4x-2y+4 ; -2x+2y)
  — Le point stationnaire  [juge mat]  départ : x*
    = (-2 ; -2)   ← (M + Mᵀ)x = b
  aides : xᵀMx = xᵀSx avec S = (M + Mᵀ)/2 symétrique ; ∇(xᵀMx) = (M + Mᵀ)x. | S = [[2, □], [□, 1]] | ∇f = (4x − 2y + 4 ; −2x + 2y)
  pièges : m_grad_nonsym, l_quadform_offdiag

```

### Niveau 5

```
A = [[1,-2],[1,-2],[1,2]], b = (−2 ; 2 ; 4). Minimise f(x) = ‖Ax − b‖² : écris sa hessienne, son gradient, puis trouve x* (tu retrouves les équations normales).
  [free, sans aide]  H
    (La hessienne H = 2AᵀA)
    = 2A^T·A   ← f = xᵀAᵀAx − 2bᵀAx + bᵀb
    = [[6,-4],[-4,24]]
  — Le gradient ∇f = 2AᵀAx − 2Aᵀb  [juge mat]  départ : ∇f
    = (6x-4y-8 ; -4x+24y-16)
  — Le minimum : ∇f = 0, les équations normales AᵀAx = Aᵀb  [juge mat]  départ : x*
    = (2 ; 1)   ← AᵀAx = Aᵀb
  pièges : m_grad_factor

A = [[1,-1],[1,1],[1,-1],[1,-2]], b = (1 ; 1 ; −3 ; −2). Minimise f(x) = ‖Ax − b‖² : écris sa hessienne, son gradient, puis trouve x* (tu retrouves les équations normales).
  [free, sans aide]  H
    (La hessienne H = 2AᵀA)
    = 2A^T·A   ← f = xᵀAᵀAx − 2bᵀAx + bᵀb
    = [[8,-6],[-6,14]]
  — Le gradient ∇f = 2AᵀAx − 2Aᵀb  [juge mat]  départ : ∇f
    = (8x-6y+6 ; -6x+14y-14)
  — Le minimum : ∇f = 0, les équations normales AᵀAx = Aᵀb  [juge mat]  départ : x*
    = (0 ; 1)   ← AᵀAx = Aᵀb
  pièges : m_grad_factor

A = [[1,-2],[1,3],[1,3]], b = (−3 ; 4 ; 0). Minimise f(x) = ‖Ax − b‖² : écris sa hessienne, son gradient, puis trouve x* (tu retrouves les équations normales).
  [free, sans aide]  H
    (La hessienne H = 2AᵀA)
    = 2A^T·A   ← f = xᵀAᵀAx − 2bᵀAx + bᵀb
    = [[6,8],[8,44]]
  — Le gradient ∇f = 2AᵀAx − 2Aᵀb  [juge mat]  départ : ∇f
    = (6x+8y-2 ; 8x+44y-36)
  — Le minimum : ∇f = 0, les équations normales AᵀAx = Aᵀb  [juge mat]  départ : x*
    = (-1 ; 1)   ← AᵀAx = Aᵀb
  pièges : m_grad_factor

```

### Variantes d'examen

```
Quelle matrice symétrique S vérifie x² − 4xy + 2y² = xᵀSx ?
  ✔ [[1,-2],[-2,2]]   · [[2,-4],[-4,4]] [m_grad_factor]   · [[1,-4],[-4,2]] [l_quadform_offdiag]   · [[1,-4],[0,2]]
  [examen mcq]
  pièges : l_quadform_offdiag, m_grad_factor

Vrai ou faux ?
  « Pour A symétrique, la hessienne de f(x) = ½xᵀAx − bᵀx + c est A, en tout point. » → VRAI
  [examen tf]
  pièges : m_grad_factor

```

## Équations normales, matrice de design, Var(β̂) (`m-normal-eq`, BA4)

_Matrice de design, équations normales, Var(β̂) = σ²(XᵀX)⁻¹._

### Niveau 1

```
Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−3 ; 0), (−1 ; 0), (1 ; 2), (3 ; 6). Écris la matrice de design X, puis XᵀX, Xᵀy et l'estimation β̂ des moindres carrés.
  [guided]  X
    (La matrice de design X)
    = [[1,-3],[1,-1],[1,1],[1,3]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[4,0],[0,20]]   (cases à remplir : (1,2) (2,2))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (8 ; 20)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (2 ; 1)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □], [□, 20]] | β̂ = (2 ; 1)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 8), (−1 ; −1), (0 ; 1), (1 ; −1), (2 ; −7). Écris la matrice de design X, puis XᵀX, Xᵀy et l'estimation β̂ des moindres carrés.
  [guided]  X
    (La matrice de design X)
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[5,0],[0,10]]   (cases à remplir : (1,2) (2,2))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (0 ; -30)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (0 ; -3)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (0 ; −3)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; −2), (−1 ; 6), (1 ; 8), (2 ; 12). Écris la matrice de design X, puis XᵀX, Xᵀy et l'estimation β̂ des moindres carrés.
  [guided]  X
    (La matrice de design X)
    = [[1,-2],[1,-1],[1,1],[1,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[4,0],[0,10]]   (cases à remplir : (1,1) (1,2))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (24 ; 30)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (6 ; 3)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □], [□, 10]] | β̂ = (6 ; 3)
  pièges : l_lsq_normal_aat, m_var_no_inverse

```

### Niveau 2

```
Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 4), (−1 ; 3), (1 ; −3), (2 ; −8). Trouve β̂ par les équations normales.
  [guided]  X
    (La matrice de design X)
    ? Modèle y = β₀ + β₁x : quelles colonnes a X ? · Une colonne des xᵢ, une colonne des yᵢ / · Une colonne des xᵢ seulement / ✔ Une colonne de 1, une colonne des xᵢ
    = [[1,-2],[1,-1],[1,1],[1,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[4,0],[0,10]]   (cases à remplir : (2,1) (2,2))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (-4 ; -30)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (-1 ; -3)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □], [□, 10]] | β̂ = (−1 ; −3)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 6), (−1 ; 0), (0 ; 4), (1 ; 8), (2 ; 12). Trouve β̂ par les équations normales.
  [guided]  X
    (La matrice de design X)
    ? Modèle y = β₀ + β₁x : quelles colonnes a X ? ✔ Une colonne de 1, une colonne des xᵢ / · Une colonne des xᵢ, une colonne des yᵢ / · Une colonne des xᵢ seulement
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[5,0],[0,10]]   (cases à remplir : (1,1) (1,2))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (30 ; 20)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (6 ; 2)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (6 ; 2)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 1), (−1 ; −1), (0 ; −1), (1 ; 1), (2 ; 5). Trouve β̂ par les équations normales.
  [guided]  X
    (La matrice de design X)
    ? Modèle y = β₀ + β₁x : quelles colonnes a X ? · Une colonne des xᵢ, une colonne des yᵢ / ✔ Une colonne de 1, une colonne des xᵢ / · Une colonne des xᵢ seulement
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   (cases à remplir : (1,2) (2,2) (3,2))   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = [[5,0],[0,10]]   (cases à remplir : (1,1) (2,1))   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = (5 ; 10)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (1 ; 1)   (cases à remplir : (2,1))   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (1 ; 1)
  pièges : l_lsq_normal_aat, m_var_no_inverse

```

### Niveau 3

```
Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 3), (−1 ; 8), (0 ; 1), (1 ; 2), (2 ; −4). Choisis chaque action : X, les équations normales, β̂, les résidus, σ̂², puis Var̂(β̂₁).
  [tap, suivre l'erreur, menu menu]  X
    (La matrice de design X)
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[5,0],[0,10]]   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(3 ; 8 ; 1 ; 2 ; -4)
    = (10 ; -20)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (2 ; -2)   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (3 ; 8 ; 1 ; 2 ; -4) - X·(2 ; -2)
    = (-3 ; 4 ; -1 ; 2 ; -2)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 5, p = 2  [juge value]  départ : σ²
    = ((−3)² + 4² + (−1)² + 2² + (−2)²)/3   ← RSS = Σ rᵢ²
    = 34/3
  — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
    = (34/3)·(1/10)   ← ((XᵀX)⁻¹)₂₂ = 1/10
    = 17/15
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (2 ; −2)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 1), (−1 ; 1), (0 ; −3), (1 ; −1), (2 ; −3). Choisis chaque action : X, les équations normales, β̂, les résidus, σ̂², puis Var̂(β̂₁).
  [tap, suivre l'erreur, menu menu]  X
    (La matrice de design X)
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[5,0],[0,10]]   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(1 ; 1 ; -3 ; -1 ; -3)
    = (-5 ; -10)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (-1 ; -1)   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (1 ; 1 ; -3 ; -1 ; -3) - X·(-1 ; -1)
    = (0 ; 1 ; -2 ; 1 ; 0)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 5, p = 2  [juge value]  départ : σ²
    = (0² + 1² + (−2)² + 1² + 0²)/3   ← RSS = Σ rᵢ²
    = 2
  — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
    = 2·(1/10)   ← ((XᵀX)⁻¹)₂₂ = 1/10
    = 1/5
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (−1 ; −1)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−2 ; 11), (−1 ; 3), (0 ; 2), (1 ; 3), (2 ; 1). Choisis chaque action : X, les équations normales, β̂, les résidus, σ̂², puis Var̂(β̂₁).
  [tap, suivre l'erreur, menu menu]  X
    (La matrice de design X)
    = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]   ← Une ligne par observation : 1, xᵢ
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[5,0],[0,10]]   ← Diagonale : les x sont centrés
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(11 ; 3 ; 2 ; 3 ; 1)
    = (20 ; -20)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (4 ; -2)   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (11 ; 3 ; 2 ; 3 ; 1) - X·(4 ; -2)
    = (3 ; -3 ; -2 ; 1 ; 1)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 5, p = 2  [juge value]  départ : σ²
    = (3² + (−3)² + (−2)² + 1² + 1²)/3   ← RSS = Σ rᵢ²
    = 8
  — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
    = 8·(1/10)   ← ((XᵀX)⁻¹)₂₂ = 1/10
    = 4/5
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[5, □], [□, 10]] | β̂ = (4 ; −2)
  pièges : l_lsq_normal_aat, m_var_no_inverse

```

### Niveau 4

```
Modèle y = β₀ + β₁x + β₂x², points (xᵢ ; yᵢ) : (−1 ; 0), (0 ; 1), (1 ; −4), (2 ; 5). Calcule β̂ par les équations normales, puis la variance résiduelle σ̂² = RSS/(n − p).
  [free, suivre l'erreur]  X
    (La matrice de design X)
    = [[1,-1,1],[1,0,0],[1,1,1],[1,2,4]]   ← Une ligne par observation : 1, xᵢ, xᵢ²
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[4,2,6],[2,6,8],[6,8,18]]
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(0 ; 1 ; -4 ; 5)
    = (2 ; 6 ; 16)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (-2 ; -1 ; 2)   ← XᵀXβ = Xᵀy
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (0 ; 1 ; -4 ; 5) - X·(-2 ; -1 ; 2)
    = (-1 ; 3 ; -3 ; 1)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 3  [juge value]  départ : σ²
    = ((−1)² + 3² + (−3)² + 1²)/1   ← RSS = Σ rᵢ²
    = 20
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □, □], …] | β̂ = (−2 ; −1 ; 2)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x + β₂x², points (xᵢ ; yᵢ) : (−1 ; −5), (0 ; −6), (1 ; 1), (2 ; −4). Calcule β̂ par les équations normales, puis la variance résiduelle σ̂² = RSS/(n − p).
  [free, suivre l'erreur]  X
    (La matrice de design X)
    = [[1,-1,1],[1,0,0],[1,1,1],[1,2,4]]   ← Une ligne par observation : 1, xᵢ, xᵢ²
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[4,2,6],[2,6,8],[6,8,18]]
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(-5 ; -6 ; 1 ; -4)
    = (-14 ; -2 ; -20)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (-3 ; 2 ; -1)   ← XᵀXβ = Xᵀy
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (-5 ; -6 ; 1 ; -4) - X·(-3 ; 2 ; -1)
    = (1 ; -3 ; 3 ; -1)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 3  [juge value]  départ : σ²
    = (1² + (−3)² + 3² + (−1)²)/1   ← RSS = Σ rᵢ²
    = 20
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □, □], …] | β̂ = (−3 ; 2 ; −1)
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x + β₂x², points (xᵢ ; yᵢ) : (−1 ; −2), (0 ; 2), (1 ; 0), (2 ; 12). Calcule β̂ par les équations normales, puis la variance résiduelle σ̂² = RSS/(n − p).
  [free, suivre l'erreur]  X
    (La matrice de design X)
    = [[1,-1,1],[1,0,0],[1,1,1],[1,2,4]]   ← Une ligne par observation : 1, xᵢ, xᵢ²
  — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
    = X^T·X
    = [[4,2,6],[2,6,8],[6,8,18]]
  — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
    = X^T·(-2 ; 2 ; 0 ; 12)
    = (12 ; 26 ; 46)   ← Colonnes de X · y
  — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
    = (-1 ; 2 ; 2)   ← XᵀXβ = Xᵀy
  — Les résidus r = y − Xβ̂  [juge mat]  départ : r
    = (-2 ; 2 ; 0 ; 12) - X·(-1 ; 2 ; 2)
    = (-1 ; 3 ; -3 ; 1)   ← Xᵀr = 0 : contrôle
  — La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 3  [juge value]  départ : σ²
    = ((−1)² + 3² + (−3)² + 1²)/1   ← RSS = Σ rᵢ²
    = 20
  aides : Une ligne de X par observation ; puis XᵀXβ = Xᵀy. | XᵀX = [[4, □, □], …] | β̂ = (−1 ; 2 ; 2)
  pièges : l_lsq_normal_aat, m_var_no_inverse

```

### Niveau 5

```
Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−3 ; 9), (−1 ; 3), (1 ; −1), (3 ; −3). Fais la régression complète (β̂, σ̂², Var̂(β̂₀), Var̂(β̂₁)) et dis quel coefficient est le plus précis.
  [problème, 7 points]
  partie 1 (Régression : 0,5 ; Les équations normales : XᵀX : 1 ; Le second membre Xᵀy : 1 ; L'estimation β̂ : XᵀXβ̂ = Xᵀy : 0,5 ; Les résidus r = y − Xβ̂ : 1 ; La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 2 : 1 ; La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁ : 0,5 ; La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂ : 0,5)
  Régression : X, équations normales, β̂, résidus, σ̂², puis les deux variances estimées.
    [free, sans aide, suivre l'erreur]  X
      (La matrice de design X)
      = [[1,-3],[1,-1],[1,1],[1,3]]   ← Une ligne par observation : 1, xᵢ
    — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
      = X^T·X
      = [[4,0],[0,20]]   ← Diagonale : les x sont centrés
    — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
      = X^T·(9 ; 3 ; -1 ; -3)
      = (8 ; -40)   ← Colonnes de X · y
    — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
      = (2 ; -2)   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
    — Les résidus r = y − Xβ̂  [juge mat]  départ : r
      = (9 ; 3 ; -1 ; -3) - X·(2 ; -2)
      = (1 ; -1 ; -1 ; 1)   ← Xᵀr = 0 : contrôle
    — La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 2  [juge value]  départ : σ²
      = (1² + (−1)² + (−1)² + 1²)/2   ← RSS = Σ rᵢ²
      = 2
    — La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁  [juge value]  départ : V_0
      = 2·(1/4)   ← ((XᵀX)⁻¹)₁₁ = 1/4
      = 1/2
    — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
      = 2·(1/20)   ← ((XᵀX)⁻¹)₂₂ = 1/20
      = 1/10
  partie 2 (Interprétation : 1)
  Var̂(β̂₀) = 1/2 et Var̂(β̂₁) = 1/10. Quel coefficient est estimé le plus précisément ?
    · β̂₀   · Celui dont la valeur estimée est la plus grande   · Les deux, autant   ✔ β̂₁
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−3 ; 3), (−1 ; −4), (1 ; −3), (3 ; −4). Fais la régression complète (β̂, σ̂², Var̂(β̂₀), Var̂(β̂₁)) et dis quel coefficient est le plus précis.
  [problème, 7 points]
  partie 1 (Régression : 0,5 ; Les équations normales : XᵀX : 1 ; Le second membre Xᵀy : 1 ; L'estimation β̂ : XᵀXβ̂ = Xᵀy : 0,5 ; Les résidus r = y − Xβ̂ : 1 ; La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 2 : 1 ; La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁ : 0,5 ; La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂ : 0,5)
  Régression : X, équations normales, β̂, résidus, σ̂², puis les deux variances estimées.
    [free, sans aide, suivre l'erreur]  X
      (La matrice de design X)
      = [[1,-3],[1,-1],[1,1],[1,3]]   ← Une ligne par observation : 1, xᵢ
    — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
      = X^T·X
      = [[4,0],[0,20]]   ← Diagonale : les x sont centrés
    — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
      = X^T·(3 ; -4 ; -3 ; -4)
      = (-8 ; -20)   ← Colonnes de X · y
    — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
      = (-2 ; -1)   ← β̂ⱼ = (Xᵀy)ⱼ/(XᵀX)ⱼⱼ
    — Les résidus r = y − Xβ̂  [juge mat]  départ : r
      = (3 ; -4 ; -3 ; -4) - X·(-2 ; -1)
      = (2 ; -3 ; 0 ; 1)   ← Xᵀr = 0 : contrôle
    — La variance résiduelle σ̂² = RSS/(n − p), n = 4, p = 2  [juge value]  départ : σ²
      = (2² + (−3)² + 0² + 1²)/2   ← RSS = Σ rᵢ²
      = 7
    — La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁  [juge value]  départ : V_0
      = 7·(1/4)   ← ((XᵀX)⁻¹)₁₁ = 1/4
      = 7/4
    — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
      = 7·(1/20)   ← ((XᵀX)⁻¹)₂₂ = 1/20
      = 7/20
  partie 2 (Interprétation : 1)
  Var̂(β̂₀) = 7/4 et Var̂(β̂₁) = 7/20. Quel coefficient est estimé le plus précisément ?
    · Celui dont la valeur estimée est la plus grande   · Les deux, autant   ✔ β̂₁   · β̂₀
  pièges : l_lsq_normal_aat, m_var_no_inverse

Modèle y = β₀ + β₁x, points (xᵢ ; yᵢ) : (−1 ; 1), (0 ; −6), (1 ; −1), (2 ; −2), (4 ; 4). Fais la régression complète (β̂, σ̂², Var̂(β̂₀), Var̂(β̂₁)) et dis quel coefficient est le plus précis.
  [problème, 7 points]
  partie 1 (Régression : 0,5 ; Les équations normales : XᵀX : 1 ; Le second membre Xᵀy : 1 ; L'estimation β̂ : XᵀXβ̂ = Xᵀy : 0,5 ; Les résidus r = y − Xβ̂ : 1 ; La variance résiduelle σ̂² = RSS/(n − p), n = 5, p = 2 : 1 ; La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁ : 0,5 ; La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂ : 0,5)
  Régression : X, équations normales, β̂, résidus, σ̂², puis les deux variances estimées.
    [free, sans aide, suivre l'erreur]  X
      (La matrice de design X)
      = [[1,-1],[1,0],[1,1],[1,2],[1,4]]   ← Une ligne par observation : 1, xᵢ
    — Les équations normales : XᵀX  [juge mat]  départ : XᵀX
      = X^T·X
      = [[5,6],[6,22]]
    — Le second membre Xᵀy  [juge mat]  départ : Xᵀy
      = X^T·(1 ; -6 ; -1 ; -2 ; 4)
      = (-4 ; 10)   ← Colonnes de X · y
    — L'estimation β̂ : XᵀXβ̂ = Xᵀy  [juge mat]  départ : β̂
      = (-2 ; 1)   ← XᵀXβ = Xᵀy
    — Les résidus r = y − Xβ̂  [juge mat]  départ : r
      = (1 ; -6 ; -1 ; -2 ; 4) - X·(-2 ; 1)
      = (4 ; -4 ; 0 ; -2 ; 2)   ← Xᵀr = 0 : contrôle
    — La variance résiduelle σ̂² = RSS/(n − p), n = 5, p = 2  [juge value]  départ : σ²
      = (4² + (−4)² + 0² + (−2)² + 2²)/3   ← RSS = Σ rᵢ²
      = 40/3
    — La variance estimée de β̂₀ : σ̂²·((XᵀX)⁻¹)₁₁  [juge value]  départ : V_0
      = (40/3)·(11/37)   ← ((XᵀX)⁻¹)₁₁ = 11/37
      = 440/111
    — La variance estimée de β̂₁ : σ̂²·((XᵀX)⁻¹)₂₂  [juge value]  départ : V_1
      = (40/3)·(5/74)   ← ((XᵀX)⁻¹)₂₂ = 5/74
      = 100/111
  partie 2 (Interprétation : 1)
  Var̂(β̂₀) = 440/111 et Var̂(β̂₁) = 100/111. Quel coefficient est estimé le plus précisément ?
    · Celui dont la valeur estimée est la plus grande   · Les deux, autant   ✔ β̂₁   · β̂₀
  pièges : l_lsq_normal_aat, m_var_no_inverse

```

### Variantes d'examen

```
Régression y = β₀ + β₁x sur n = 5 points : XᵀX = [[5,6],[6,22]] et la somme des carrés des résidus vaut RSS = 4. Que vaut la variance estimée de β̂₁ ?
  · 88/3 [m_var_no_inverse]   · 4/3   ✔ 10/111   · 2/37 [p_reg_sigma_n]
  [examen mcq]
  pièges : m_var_no_inverse, p_reg_sigma_n

Vrai ou faux ?
  « Dans le modèle y = Xβ + ε avec des εᵢ indépendants de variance σ², Var(β̂) = σ²XᵀX. » → FAUX
    contre-exemple (mx) : X = [[1,-1],[1,0],[1,1]]
  [examen tf]
  pièges : m_var_no_inverse

```

## Quotient de Rayleigh (`m-rayleigh`, BA4)

_R(x) entre λ_min et λ_max ; égalité aux vecteurs propres._

### Niveau 1

```
A = [[2,4],[4,-4]] est symétrique et x = (1 ; −1). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(1 ; -1)
    = (-2 ; 8)   (cases à remplir : (1,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = 1·(−2) + (−1)·□   (trous : 1·(−2) + (−1)·8)   ← Produit scalaire de x et Ax
    = −□   (trous : −10)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = 1² + (−1)²   ← Somme des carrés
    = □   (trous : 2)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont −6 et 4. Sans calculer, où est R(x) ? ✔ Entre −6 et 4 / · Au-dessus de 4 / · Exactement 4
    = −10÷2   ← xᵀAx / xᵀx
    = −5
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/2 | R(x) = −10/2 = −5
  pièges : m_rayleigh_no_denominator

A = [[3,-2],[-2,0]] est symétrique et x = (−2 ; 3). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(-2 ; 3)
    = (-12 ; 4)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = (−2)·(−12) + 3·□   (trous : (−2)·(−12) + 3·4)   ← Produit scalaire de x et Ax
    = □   (trous : 36)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = (−2)² + 3²   ← Somme des carrés
    = □   (trous : 13)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont −1 et 4. Sans calculer, où est R(x) ? · Exactement 4 / ✔ Entre −1 et 4 / · Au-dessus de 4
    = 36/13   ← xᵀAx / xᵀx
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/13 | R(x) = 36/13
  pièges : m_rayleigh_no_denominator

A = [[6,2],[2,3]] est symétrique et x = (−1 ; 3). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(-1 ; 3)
    = (0 ; 7)   (cases à remplir : (2,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = (−1)·0 + 3·□   (trous : (−1)·0 + 3·7)   ← Produit scalaire de x et Ax
    = □   (trous : 21)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = (−1)² + 3²   ← Somme des carrés
    = □   (trous : 10)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont 2 et 7. Sans calculer, où est R(x) ? · Exactement 7 / · Au-dessus de 7 / ✔ Entre 2 et 7
    = 21/10   ← xᵀAx / xᵀx
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/10 | R(x) = 21/10
  pièges : m_rayleigh_no_denominator

```

### Niveau 2

```
A = [[-7,-2],[-2,-10]] est symétrique et x = (1 ; −1). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(1 ; -1)
    = (-5 ; 8)   (cases à remplir : (1,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = 1·(−5) + (−1)·□   (trous : 1·(−5) + (−1)·8)   ← Produit scalaire de x et Ax
    = −□   (trous : −13)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = 1² + (−1)²   ← Somme des carrés
    = □   (trous : 2)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Par quoi divise-t-on xᵀAx ? · Par ‖x‖ / ✔ Par xᵀx / · Par rien : R(x) = xᵀAx
    ? Les valeurs propres de A sont −11 et −6. Sans calculer, où est R(x) ? · Au-dessus de −6 / ✔ Entre −11 et −6 / · Exactement −6
    = −13/2   ← xᵀAx / xᵀx
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/2 | R(x) = −13/2
  pièges : m_rayleigh_no_denominator

A = [[4,4],[4,10]] est symétrique et x = (3 ; 1). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(3 ; 1)
    = (16 ; 22)   (cases à remplir : (1,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = 3·16 + 1·□   (trous : 3·16 + 1·22)   ← Produit scalaire de x et Ax
    = □   (trous : 70)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = 3² + 1²   ← Somme des carrés
    = □   (trous : 10)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Par quoi divise-t-on xᵀAx ? · Par rien : R(x) = xᵀAx / ✔ Par xᵀx / · Par ‖x‖
    ? Les valeurs propres de A sont 2 et 12. Sans calculer, où est R(x) ? · Au-dessus de 12 / ✔ Entre 2 et 12 / · Exactement 12
    = 70÷10   ← xᵀAx / xᵀx
    = 7
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/10 | R(x) = 70/10 = 7
  pièges : m_rayleigh_no_denominator

A = [[2,-3],[-3,2]] est symétrique et x = (3 ; 1). Calcule le quotient de Rayleigh R(x) = xᵀAx / xᵀx.
  [guided]  Ax
    (Le produit Ax)
    = A·(3 ; 1)
    = (3 ; -7)   (cases à remplir : (1,1))   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = 3·3 + 1·(−□)   (trous : 3·3 + 1·(−7))   ← Produit scalaire de x et Ax
    = □   (trous : 2)
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = 3² + 1²   ← Somme des carrés
    = □   (trous : 10)
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Par quoi divise-t-on xᵀAx ? · Par rien : R(x) = xᵀAx / · Par ‖x‖ / ✔ Par xᵀx
    ? Les valeurs propres de A sont −1 et 5. Sans calculer, où est R(x) ? ✔ Entre −1 et 5 / · Au-dessus de 5 / · Exactement 5
    = 2÷10   ← xᵀAx / xᵀx
    = 1/5
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/10 | R(x) = 2/10 = 1/5
  pièges : m_rayleigh_no_denominator

```

### Niveau 3

```
A = [[6,6],[6,-3]], x = (−1 ; −2). Ses valeurs propres sont −6 et 9. Calcule R(x) en choisissant d'abord chaque action ; vérifie qu'il est entre λ_min et λ_max.
  [tap, suivre l'erreur, menu menu]  Ax
    (Le produit Ax)
    = A·(-1 ; -2)
    = (-18 ; 0)   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = (−1)·(−18) + (−2)·0   ← Produit scalaire de x et Ax
    = 18
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = (−1)² + (−2)²   ← Somme des carrés
    = 5
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont −6 et 9. Sans calculer, où est R(x) ? · Exactement 9 / · Au-dessus de 9 / ✔ Entre −6 et 9
    = 18/5   ← xᵀAx / xᵀx
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/5 | R(x) = 18/5
  pièges : m_rayleigh_no_denominator

A = [[2,-1,1],[-1,2,1],[1,1,0]], x = (−1 ; 2 ; 1). Ses valeurs propres sont −1, 2 et 3. Calcule R(x) en choisissant d'abord chaque action ; vérifie qu'il est entre λ_min et λ_max.
  [tap, suivre l'erreur, menu menu]  Ax
    (Le produit Ax)
    = A·(-1 ; 2 ; 1)
    = (-3 ; 6 ; 1)   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = (−1)·(−3) + 2·6 + 1·1   ← Produit scalaire de x et Ax
    = 16
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = (−1)² + 2² + 1²   ← Somme des carrés
    = 6
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont −1, 2 et 3. Sans calculer, où est R(x) ? · Au-dessus de 3 / · Exactement 3 / ✔ Entre −1 et 3
    = 16÷6   ← xᵀAx / xᵀx
    = 8/3
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/6 | R(x) = 16/6 = 8/3
  pièges : m_rayleigh_no_denominator

A = [[0,1],[1,0]], x = (3 ; 1). Ses valeurs propres sont −1 et 1. Calcule R(x) en choisissant d'abord chaque action ; vérifie qu'il est entre λ_min et λ_max.
  [tap, suivre l'erreur, menu menu]  Ax
    (Le produit Ax)
    = A·(3 ; 1)
    = (1 ; 3)   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = 3·1 + 1·3   ← Produit scalaire de x et Ax
    = 6
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = 3² + 1²   ← Somme des carrés
    = 10
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    ? Les valeurs propres de A sont −1 et 1. Sans calculer, où est R(x) ? · Au-dessus de 1 / ✔ Entre −1 et 1 / · Exactement 1
    = 6÷10   ← xᵀAx / xᵀx
    = 3/5
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/10 | R(x) = 6/10 = 3/5
  pièges : m_rayleigh_no_denominator

```

### Niveau 4

```
A = [[-2,-1,-1],[-1,0,1],[-1,1,-2]] est symétrique. Estime une valeur propre par R(x), avec x = (−2 ; −1 ; 2).
  [free, suivre l'erreur]  Ax
    (Le produit Ax)
    = A·(-2 ; -1 ; 2)
    = (3 ; 4 ; -3)   ← Ligne par ligne
  — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
    = (−2)·3 + (−1)·4 + 2·(−3)   ← Produit scalaire de x et Ax
    = −16
  — Le dénominateur xᵀx  [juge value]  départ : x^T·x
    = (−2)² + (−1)² + 2²   ← Somme des carrés
    = 9
  — Le quotient de Rayleigh  [juge value]  départ : R(x)
    = −16/9   ← xᵀAx / xᵀx
  aides : Numérateur xᵀ(Ax), dénominateur xᵀx. | R = □/9 | R(x) = −16/9
  pièges : m_rayleigh_no_denominator

A = [[0,-2],[-2,0]]. Trouve le maximum et le minimum de xᵀAx sous la contrainte ‖x‖ = 1, et un point où chacun est atteint.
  [free, suivre l'erreur]  det(A − λI)
    (Les valeurs propres de A)
    = det[[-λ,-2],[-2,-λ]]   ← A − λI
    = (2 − λ)(−2 − λ)   ← Valeurs propres −2 et 2
  — Le maximum de xᵀAx sur ‖x‖ = 1  [juge value]  départ : λ_max
    = 2   ← La plus grande valeur propre
  — Un point où il est atteint (‖x‖ = 1)  [juge span]  départ : x_max
    = (-1/√2 ; 1/√2)   ← Vecteur propre de λ_max, normé
  — Le minimum de xᵀAx sur ‖x‖ = 1  [juge value]  départ : λ_min
    = −2   ← La plus petite valeur propre
  — Un point où il est atteint  [juge span]  départ : x_min
    = (1/√2 ; 1/√2)   ← Vecteur propre de λ_min, normé
  aides : Sur la sphère unité, xᵀAx = R(x) : son maximum est λ_max, atteint en un vecteur propre unitaire. | det(A − λI) = (□ − λ)(□ − λ) | max = 2 en (−1/√2 ; 1/√2) ; min = −2 en (1/√2 ; 1/√2)
  pièges : m_rayleigh_no_denominator

A = [[3,2],[2,3]]. Trouve le maximum et le minimum de xᵀAx sous la contrainte ‖x‖ = 1, et un point où chacun est atteint.
  [free, suivre l'erreur]  det(A − λI)
    (Les valeurs propres de A)
    = det[[3-λ,2],[2,3-λ]]   ← A − λI
    = (5 − λ)(1 − λ)   ← Valeurs propres 1 et 5
  — Le maximum de xᵀAx sur ‖x‖ = 1  [juge value]  départ : λ_max
    = 5   ← La plus grande valeur propre
  — Un point où il est atteint (‖x‖ = 1)  [juge span]  départ : x_max
    = (1/√2 ; 1/√2)   ← Vecteur propre de λ_max, normé
  — Le minimum de xᵀAx sur ‖x‖ = 1  [juge value]  départ : λ_min
    = 1   ← La plus petite valeur propre
  — Un point où il est atteint  [juge span]  départ : x_min
    = (-1/√2 ; 1/√2)   ← Vecteur propre de λ_min, normé
  aides : Sur la sphère unité, xᵀAx = R(x) : son maximum est λ_max, atteint en un vecteur propre unitaire. | det(A − λI) = (□ − λ)(□ − λ) | max = 5 en (1/√2 ; 1/√2) ; min = 1 en (−1/√2 ; 1/√2)
  pièges : m_rayleigh_no_denominator

```

### Niveau 5

```
A = [[-6,2],[2,-3]] et x = (6 ; 7), proche d'un vecteur propre de A. Compare deux estimations de la valeur propre : le quotient de Rayleigh R(x) et le rapport de composantes (Ax)₂/x₂.
  [problème, 4 points]
  partie 1 (Calculs : 1 ; Le numérateur xᵀ(Ax) : 0,5 ; Le dénominateur xᵀx : 0,5 ; Le quotient de Rayleigh : 0,5 ; Le rapport de composantes (Ax)₂/x₂ : 0,5)
  Calcule R(x), puis le rapport (Ax)₂/x₂.
    [free, sans aide, suivre l'erreur]  Ax
      (Le produit Ax)
      = A·(6 ; 7)
      = (-22 ; -9)   ← Ligne par ligne
    — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
      = 6·(−22) + 7·(−9)   ← Produit scalaire de x et Ax
      = −195
    — Le dénominateur xᵀx  [juge value]  départ : x^T·x
      = 6² + 7²   ← Somme des carrés
      = 85
    — Le quotient de Rayleigh  [juge value]  départ : R(x)
      = −195÷85   ← xᵀAx / xᵀx
      = −39/17
    — Le rapport de composantes (Ax)₂/x₂  [juge value]  départ : ρ
      = −9/7
  partie 2 (Comparaison : 1)
  La valeur propre proche est λ = −2. Quelle estimation en est la plus proche ?
    ✔ R(x) = −39/17 : l'erreur est de l'ordre de ε², ε l'écart de x à un vecteur propre   · R(x) = −39/17, mais seulement parce que x est un vecteur propre   · Les deux sont aussi proches   · (Ax)₂/x₂ = −9/7 : le rapport d'une seule composante ne dépend pas des autres
  pièges : m_rayleigh_no_denominator

A = [[-1,-2],[-2,2]] et x = (−6 ; 7), proche d'un vecteur propre de A. Compare deux estimations de la valeur propre : le quotient de Rayleigh R(x) et le rapport de composantes (Ax)₂/x₂.
  [problème, 4 points]
  partie 1 (Calculs : 1 ; Le numérateur xᵀ(Ax) : 0,5 ; Le dénominateur xᵀx : 0,5 ; Le quotient de Rayleigh : 0,5 ; Le rapport de composantes (Ax)₂/x₂ : 0,5)
  Calcule R(x), puis le rapport (Ax)₂/x₂.
    [free, sans aide, suivre l'erreur]  Ax
      (Le produit Ax)
      = A·(-6 ; 7)
      = (-8 ; 26)   ← Ligne par ligne
    — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
      = (−6)·(−8) + 7·26   ← Produit scalaire de x et Ax
      = 230
    — Le dénominateur xᵀx  [juge value]  départ : x^T·x
      = (−6)² + 7²   ← Somme des carrés
      = 85
    — Le quotient de Rayleigh  [juge value]  départ : R(x)
      = 230÷85   ← xᵀAx / xᵀx
      = 46/17
    — Le rapport de composantes (Ax)₂/x₂  [juge value]  départ : ρ
      = 26/7
  partie 2 (Comparaison : 1)
  La valeur propre proche est λ = 3. Quelle estimation en est la plus proche ?
    · R(x) = 46/17, mais seulement parce que x est un vecteur propre   ✔ R(x) = 46/17 : l'erreur est de l'ordre de ε², ε l'écart de x à un vecteur propre   · Les deux sont aussi proches   · (Ax)₂/x₂ = 26/7 : le rapport d'une seule composante ne dépend pas des autres
  pièges : m_rayleigh_no_denominator

A = [[-2,-1],[-1,-2]] et x = (4 ; −6), proche d'un vecteur propre de A. Compare deux estimations de la valeur propre : le quotient de Rayleigh R(x) et le rapport de composantes (Ax)₂/x₂.
  [problème, 4 points]
  partie 1 (Calculs : 1 ; Le numérateur xᵀ(Ax) : 0,5 ; Le dénominateur xᵀx : 0,5 ; Le quotient de Rayleigh : 0,5 ; Le rapport de composantes (Ax)₂/x₂ : 0,5)
  Calcule R(x), puis le rapport (Ax)₂/x₂.
    [free, sans aide, suivre l'erreur]  Ax
      (Le produit Ax)
      = A·(4 ; -6)
      = (-2 ; 8)   ← Ligne par ligne
    — Le numérateur xᵀ(Ax)  [juge value]  départ : x^T·Ax
      = 4·(−2) + (−6)·8   ← Produit scalaire de x et Ax
      = −56
    — Le dénominateur xᵀx  [juge value]  départ : x^T·x
      = 4² + (−6)²   ← Somme des carrés
      = 52
    — Le quotient de Rayleigh  [juge value]  départ : R(x)
      = −56÷52   ← xᵀAx / xᵀx
      = −14/13
    — Le rapport de composantes (Ax)₂/x₂  [juge value]  départ : ρ
      = 8÷(−6)
      = −4/3
  partie 2 (Comparaison : 1)
  La valeur propre proche est λ = −1. Quelle estimation en est la plus proche ?
    · Les deux sont aussi proches   · R(x) = −14/13, mais seulement parce que x est un vecteur propre   ✔ R(x) = −14/13 : l'erreur est de l'ordre de ε², ε l'écart de x à un vecteur propre   · (Ax)₂/x₂ = −4/3 : le rapport d'une seule composante ne dépend pas des autres
  pièges : m_rayleigh_no_denominator

```

### Variantes d'examen

```
A = [[5,-3,2],[-3,5,-2],[2,-2,6]] et x = (−2 ; 0 ; 2). Que vaut le quotient de Rayleigh R(x) ?
  ✔ 7/2   · 2/7   · 7√2 [m_rayleigh_no_denominator]   · 28 [m_rayleigh_no_denominator]
  [examen mcq]
  pièges : m_rayleigh_no_denominator

Vrai ou faux ?
  « R(3x) = R(x) pour tout x ≠ 0. » → VRAI
  [examen tf]
  pièges : m_rayleigh_no_denominator

```

## Méthode de la puissance et puissance inverse (`m-power-method`, BA4)

_Multiplier par A, diviser par la plus grande composante : μ → λ₁._

### Niveau 1

```
Méthode de la puissance pour A = [[8,-4],[-4,8]], à partir de y₀ = (0 ; 1) : z = Ayk, μk = la composante de z de plus grand module, yk+1 = z/μk. Les deux premières lignes sont faites ; remplis la ligne k = 2.
  [tableau power]  colonnes : yk,1 | yk,2 | (Ayk)1 | (Ayk)2 | μk
    k = 0    0  1  −4  8  8
    k = 1    −1/2  1  −8  10  10
    k = 2    (-4/5)  (1)  (-52/5)  (56/5)  (56/5)
  puis : Les valeurs propres de A sont 12 et 4. Vers quelle valeur tendent les μk ?
      · 4 [m_power_ratio]   · 16   ✔ 12   · 56/5
      pièges : m_power_ratio
  pièges : m_power_ratio

Méthode de la puissance pour A = [[3,-1],[-1,3]], à partir de y₀ = (0 ; 1) : z = Ayk, μk = la composante de z de plus grand module, yk+1 = z/μk. Les deux premières lignes sont faites ; remplis la ligne k = 2.
  [tableau power]  colonnes : yk,1 | yk,2 | (Ayk)1 | (Ayk)2 | μk
    k = 0    0  1  −1  3  3
    k = 1    −1/3  1  −2  10/3  10/3
    k = 2    (-3/5)  (1)  (-14/5)  (18/5)  (18/5)
  puis : Les valeurs propres de A sont 4 et 2. Vers quelle valeur tendent les μk ?
      · 18/5   · 6   · 2 [m_power_ratio]   ✔ 4
      pièges : m_power_ratio
  pièges : m_power_ratio

Méthode de la puissance pour A = [[7,-3],[-3,-1]], à partir de y₀ = (0 ; 1) : z = Ayk, μk = la composante de z de plus grand module, yk+1 = z/μk. Les deux premières lignes sont faites ; remplis la ligne k = 2.
  [tableau power]  colonnes : yk,1 | yk,2 | (Ayk)1 | (Ayk)2 | μk
    k = 0    0  1  −3  −1  −3
    k = 1    1  1/3  6  −10/3  6
    k = 2    (1)  (-5/9)  (26/3)  (-22/9)  (26/3)
  puis : Les valeurs propres de A sont 8 et −2. Vers quelle valeur tendent les μk ?
      · 26/3   · 6   ✔ 8   · −2 [m_power_ratio]
      pièges : m_power_ratio
  pièges : m_power_ratio

```

### Niveau 2

```
Deux itérations de la méthode de la puissance pour A = [[3,2],[2,6]], à partir de y₀ = (1 ; 0).
  [guided]  [[3,2],[2,6]]·(1 ; 0)
    (Itération 1 : z = Ay₀.)
    = (3 ; 2)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    ? Ay₀ = (3 ; 2). Comment normalises-tu (convention du cours) ? ✔ Diviser par la composante de plus grand module, μ₀ / ✔ Diviser par la norme ‖Ay₀‖ / · Diviser par la première composante, sans regarder les autres
    = □   (trous : 3)   ← max(|3| ; |2|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; 2/3)   (cases à remplir : (2,1))   ← Divisé par 3 : une composante vaut 1
  — Itération 2 : z = Ay₁.  [juge mat]  départ : [[3,2],[2,6]]·(1 ; 2/3)
    = (13/3 ; 6)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₁ : la composante de Ay₁ de plus grand module.  [juge value]  départ : μ_1
    = □   (trous : 6)   ← max(|13/3| ; |6|), avec son signe
  aides : Multiplie par A, puis divise par la plus grande composante (en module) : c'est μ. | Ay₁ = [[3,2],[2,6]]·(1 ; 2/3) = (□ ; □) | Ay₁ = (13/3 ; 6), μ₁ = 6

Deux itérations de la méthode de la puissance pour A = [[7,-1],[-1,7]], à partir de y₀ = (1 ; 0).
  [guided]  [[7,-1],[-1,7]]·(1 ; 0)
    (Itération 1 : z = Ay₀.)
    = (7 ; -1)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    ? Ay₀ = (7 ; −1). Comment normalises-tu (convention du cours) ? ✔ Diviser par la composante de plus grand module, μ₀ / ✔ Diviser par la norme ‖Ay₀‖ / · Diviser par la première composante, sans regarder les autres
    = □   (trous : 7)   ← max(|7| ; |−1|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; -1/7)   (cases à remplir : (2,1))   ← Divisé par 7 : une composante vaut 1
  — Itération 2 : z = Ay₁.  [juge mat]  départ : [[7,-1],[-1,7]]·(1 ; -1/7)
    = (50/7 ; -2)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₁ : la composante de Ay₁ de plus grand module.  [juge value]  départ : μ_1
    = □   (trous : 50/7)   ← max(|50/7| ; |−2|), avec son signe
  aides : Multiplie par A, puis divise par la plus grande composante (en module) : c'est μ. | Ay₁ = [[7,−1],[−1,7]]·(1 ; −1/7) = (□ ; □) | Ay₁ = (50/7 ; −2), μ₁ = 50/7

Deux itérations de la méthode de la puissance pour A = [[6,-4],[-4,0]], à partir de y₀ = (0 ; 1).
  [guided]  [[6,-4],[-4,0]]·(0 ; 1)
    (Itération 1 : z = Ay₀.)
    = (-4 ; 0)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    ? Ay₀ = (−4 ; 0). Comment normalises-tu (convention du cours) ? ✔ Diviser par la composante de plus grand module, μ₀ / ✔ Diviser par la norme ‖Ay₀‖ / · Diviser par la première composante, sans regarder les autres
    = □   (trous : −4)   ← max(|−4| ; |0|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; 0)   (cases à remplir : (2,1))   ← Divisé par −4 : une composante vaut 1
  — Itération 2 : z = Ay₁.  [juge mat]  départ : [[6,-4],[-4,0]]·(1 ; 0)
    = (6 ; -4)   (cases à remplir : (2,1))   ← Ligne par colonne
  — μ₁ : la composante de Ay₁ de plus grand module.  [juge value]  départ : μ_1
    = □   (trous : 6)   ← max(|6| ; |−4|), avec son signe
  aides : Multiplie par A, puis divise par la plus grande composante (en module) : c'est μ. | Ay₁ = [[6,−4],[−4,0]]·(1 ; 0) = (□ ; □) | Ay₁ = (6 ; −4), μ₁ = 6

```

### Niveau 3

```
A = [[8,2],[2,8]], y₀ = (1 ; 0). Fais une itération de la puissance, estime λ₁ par le quotient de Rayleigh de y₁, puis donne la vitesse de convergence. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  [[8,2],[2,8]]·(1 ; 0)
    (Itération 1 : z = Ay₀.)
    = (8 ; 2)   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    = 8   ← max(|8| ; |2|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; 1/4)   ← Divisé par 8 : une composante vaut 1
  — Le quotient de Rayleigh R(y₁) = y₁ᵀAy₁ / y₁ᵀy₁, une meilleure estimation de λ₁.  [juge value]  départ : R
    = 152/17   ← y₁ᵀAy₁ = 19/2, y₁ᵀy₁ = 17/16
  — Les valeurs propres de A sont 10 et 6. Par combien l'erreur sur μ est-elle multipliée à chaque pas ?  [juge value]  départ : |λ_2/λ_1|
    = 3/5   ← |6/10|
  aides : Une itération : z = Ay, μ = la plus grande composante, y ← z/μ. Rayleigh : yᵀAy / yᵀy. | R(y₁) = □ / (17/16) | R(y₁) = 152/17, vitesse 3/5
  pièges : m_power_ratio

A = [[8,-4],[-4,8]], y₀ = (1 ; 0). Fais une itération de la puissance, estime λ₁ par le quotient de Rayleigh de y₁, puis donne la vitesse de convergence. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  [[8,-4],[-4,8]]·(1 ; 0)
    (Itération 1 : z = Ay₀.)
    = (8 ; -4)   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    = 8   ← max(|8| ; |−4|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; -1/2)   ← Divisé par 8 : une composante vaut 1
  — Le quotient de Rayleigh R(y₁) = y₁ᵀAy₁ / y₁ᵀy₁, une meilleure estimation de λ₁.  [juge value]  départ : R
    = 56/5   ← y₁ᵀAy₁ = 14, y₁ᵀy₁ = 5/4
  — Les valeurs propres de A sont 12 et 4. Par combien l'erreur sur μ est-elle multipliée à chaque pas ?  [juge value]  départ : |λ_2/λ_1|
    = 1/3   ← |4/12|
  aides : Une itération : z = Ay, μ = la plus grande composante, y ← z/μ. Rayleigh : yᵀAy / yᵀy. | R(y₁) = □ / (5/4) | R(y₁) = 56/5, vitesse 1/3
  pièges : m_power_ratio

A = [[6,-2],[-2,3]], y₀ = (1 ; 0). Fais une itération de la puissance, estime λ₁ par le quotient de Rayleigh de y₁, puis donne la vitesse de convergence. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  [[6,-2],[-2,3]]·(1 ; 0)
    (Itération 1 : z = Ay₀.)
    = (6 ; -2)   ← Ligne par colonne
  — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
    = 6   ← max(|6| ; |−2|), avec son signe
  — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
    = (1 ; -1/3)   ← Divisé par 6 : une composante vaut 1
  — Le quotient de Rayleigh R(y₁) = y₁ᵀAy₁ / y₁ᵀy₁, une meilleure estimation de λ₁.  [juge value]  départ : R
    = 69/10   ← y₁ᵀAy₁ = 23/3, y₁ᵀy₁ = 10/9
  — Les valeurs propres de A sont 7 et 2. Par combien l'erreur sur μ est-elle multipliée à chaque pas ?  [juge value]  départ : |λ_2/λ_1|
    = 2/7   ← |2/7|
  aides : Une itération : z = Ay, μ = la plus grande composante, y ← z/μ. Rayleigh : yᵀAy / yᵀy. | R(y₁) = □ / (10/9) | R(y₁) = 69/10, vitesse 2/7
  pièges : m_power_ratio

```

### Niveau 4

```
Puissance inverse avec décalage σ = 3 pour A = [[6,2],[2,3]], à partir de y₀ = (0 ; 1) : à chaque pas, z résout (A − 3I)z = yk (sans inverser la matrice), μk = la composante de z de plus grand module, yk+1 = z/μk. Remplis les lignes k = 0 et k = 1.
  [tableau power]  colonnes : yk,1 | yk,2 | z1 | z2 | μk
    k = 0    0  1  (1/2)  (-3/4)  (-3/4)
    k = 1    (-2/3)  (1)  (1/2)  (-13/12)  (-13/12)
  puis : Puissance inverse avec σ = 3.
      [free, sans aide, suivre l'erreur]  λ
        (En continuant, μk → −1. Quelle valeur propre de A la méthode a-t-elle trouvée ?)
        = 3 + 1/(−1)   ← μ → 1/(λ − σ), donc λ = σ + 1/μ
        = 2   ← La valeur propre la plus proche de σ = 3
      pièges : m_inverse_power_value
  pièges : m_inverse_power_value

Puissance inverse avec décalage σ = 5 pour A = [[5,3],[3,-3]], à partir de y₀ = (1 ; 0) : à chaque pas, z résout (A − 5I)z = yk (sans inverser la matrice), μk = la composante de z de plus grand module, yk+1 = z/μk. Remplis les lignes k = 0 et k = 1.
  [tableau power]  colonnes : yk,1 | yk,2 | z1 | z2 | μk
    k = 0    1  0  (8/9)  (1/3)  (8/9)
    k = 1    (1)  (3/8)  (73/72)  (1/3)  (73/72)
  puis : Puissance inverse avec σ = 5.
      [free, sans aide, suivre l'erreur]  λ
        (En continuant, μk → 1. Quelle valeur propre de A la méthode a-t-elle trouvée ?)
        = 5 + 1/(1)   ← μ → 1/(λ − σ), donc λ = σ + 1/μ
        = 6   ← La valeur propre la plus proche de σ = 5
      pièges : m_inverse_power_value
  pièges : m_inverse_power_value

Puissance inverse avec décalage σ = −3 pour A = [[-2,-4],[-4,4]], à partir de y₀ = (1 ; 0) : à chaque pas, z résout (A + 3I)z = yk (sans inverser la matrice), μk = la composante de z de plus grand module, yk+1 = z/μk. Remplis les lignes k = 0 et k = 1.
  [tableau power]  colonnes : yk,1 | yk,2 | z1 | z2 | μk
    k = 0    1  0  (-7/9)  (-4/9)  (-7/9)
    k = 1    (1)  (4/7)  (-65/63)  (-32/63)  (-65/63)
  puis : Puissance inverse avec σ = −3.
      [free, sans aide, suivre l'erreur]  λ
        (En continuant, μk → −1. Quelle valeur propre de A la méthode a-t-elle trouvée ?)
        = −3 + 1/(−1)   ← μ → 1/(λ − σ), donc λ = σ + 1/μ
        = −4   ← La valeur propre la plus proche de σ = −3
      pièges : m_inverse_power_value
  pièges : m_inverse_power_value

```

### Niveau 5

```
La méthode de la puissance (normalisation par la plus grande composante) appliquée à une matrice symétrique 2 × 2 donne :k01234567μk8,00000010,00000011,20000011,71428611,90243911,96721311,98904111,996344Lis λ₁ (entière), le rapport |λ₂/λ₁|, puis λ₂.
  [free, sans aide]  λ_1
    = 12   ← La limite des μ_k (λ₁ est entière)
  — Le rapport |λ₂/λ₁|, lu sur les erreurs μk − λ₁ (à 0,02 près).  [juge value]  départ : |λ_2/λ_1|
    = 1/3   ← (μ₇ − λ₁)/(μ₆ − λ₁) ≈ 0,334
  — λ₂ (entière ; le signe des erreurs dit son signe).  [juge value]  départ : λ_2
    = 4   ← Les erreurs gardent leur signe : λ₂/λ₁ > 0
  pièges : m_power_ratio

A = [[7,3],[3,7]], y₀ = (0 ; 1).
  [problème, examen open, 7 points]
  partie 1 ((a) Deux itérations : 0,5 ; μ₀ : la composante de Ay₀ de plus grand module. : 0,5 ; y₁ = Ay₀/μ₀. : 0,5 ; Itération 2 : z = Ay₁. : 0,5 ; μ₁ : la composante de Ay₁ de plus grand module. : 0,5)
  (a) Deux itérations (normalisation par la plus grande composante).
    [free, sans aide, suivre l'erreur]  [[7,3],[3,7]]·(0 ; 1)
      (Itération 1 : z = Ay₀.)
      = (3 ; 7)   ← Ligne par colonne
    — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
      = 7   ← max(|3| ; |7|), avec son signe
    — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
      = (3/7 ; 1)   ← Divisé par 7 : une composante vaut 1
    — Itération 2 : z = Ay₁.  [juge mat]  départ : [[7,3],[3,7]]·(3/7 ; 1)
      = (6 ; 58/7)   ← Ligne par colonne
    — μ₁ : la composante de Ay₁ de plus grand module.  [juge value]  départ : μ_1
      = 58/7   ← max(|6| ; |58/7|), avec son signe
  partie 2 ((b) Rayleigh : 1)
  (b) Le quotient de Rayleigh R(y₁).
    [free, sans aide, suivre l'erreur]  R
      = 266/29   ← y₁ᵀAy₁ = 76/7, y₁ᵀy₁ = 58/49
  partie 3 ((c) Vitesse : 1)
  (c) Vitesse de convergence.
    [free, sans aide, suivre l'erreur]  |λ_2/λ_1|
      (Valeurs propres : tr A et det A.)
      = 2/5   ← |4/10|
  partie 4 ((d) Puissance inverse : 0,5 ; La valeur propre trouvée. : 1)
  (d) Puissance inverse avec σ = 3 : vers quoi tendent les μk, puis quelle valeur propre trouve-t-on ?
    [free, sans aide, suivre l'erreur]  μ
      = 1   ← 1/(λ − σ) pour la valeur propre la plus proche de 3
    — La valeur propre trouvée.  [juge value]  départ : λ
      = 4   ← La valeur propre la plus proche de σ = 3
  partie 5 ((e) Conditionnement : 1)
  (e) Le conditionnement κ₂(A).
    [free, sans aide, suivre l'erreur]  κ_2
      = 5/2   ← A symétrique définie positive : λ_max/λ_min

La méthode de la puissance (normalisation par la plus grande composante) appliquée à une matrice symétrique 2 × 2 donne :k01234567μk5,0000006,8000007,6470597,9076927,9766547,9941467,9985367,999634Lis λ₁ (entière), le rapport |λ₂/λ₁|, puis λ₂.
  [free, sans aide]  λ_1
    = 8   ← La limite des μ_k (λ₁ est entière)
  — Le rapport |λ₂/λ₁|, lu sur les erreurs μk − λ₁ (à 0,02 près).  [juge value]  départ : |λ_2/λ_1|
    = 1/4   ← (μ₇ − λ₁)/(μ₆ − λ₁) ≈ 0,250
  — λ₂ (entière ; le signe des erreurs dit son signe).  [juge value]  départ : λ_2
    = 2   ← Les erreurs gardent leur signe : λ₂/λ₁ > 0
  pièges : m_power_ratio

```

### Variantes d'examen

```
Puissance inverse avec décalage σ = 1 : les μk (composantes de plus grand module des solutions de (A − σI)z = yk) tendent vers −1/2. Quelle valeur propre de A a-t-on trouvée ?
  · 1/2 [m_inverse_power_value]   · −1/2 [m_inverse_power_value]   · −2 [m_inverse_power_value]   ✔ −1
  [examen mcq]
  pièges : m_inverse_power_value

Vrai ou faux ?
  « La méthode de la puissance (sans décalage, ni inverse) converge vers la valeur propre de plus petit module. » → FAUX
    contre-exemple (mx) : A = [[3,1],[1,3]]
  [examen tf]
  pièges : m_power_ratio

A = [[7,1],[1,7]], y₀ = (1 ; 0).
  [problème, examen open, 7 points]
  partie 1 ((a) Deux itérations : 0,5 ; μ₀ : la composante de Ay₀ de plus grand module. : 0,5 ; y₁ = Ay₀/μ₀. : 0,5 ; Itération 2 : z = Ay₁. : 0,5 ; μ₁ : la composante de Ay₁ de plus grand module. : 0,5)
  (a) Deux itérations (normalisation par la plus grande composante).
    [free, sans aide, suivre l'erreur]  [[7,1],[1,7]]·(1 ; 0)
      (Itération 1 : z = Ay₀.)
      = (7 ; 1)   ← Ligne par colonne
    — μ₀ : la composante de Ay₀ de plus grand module.  [juge value]  départ : μ_0
      = 7   ← max(|7| ; |1|), avec son signe
    — y₁ = Ay₀/μ₀.  [juge mat]  départ : y_1
      = (1 ; 1/7)   ← Divisé par 7 : une composante vaut 1
    — Itération 2 : z = Ay₁.  [juge mat]  départ : [[7,1],[1,7]]·(1 ; 1/7)
      = (50/7 ; 2)   ← Ligne par colonne
    — μ₁ : la composante de Ay₁ de plus grand module.  [juge value]  départ : μ_1
      = 50/7   ← max(|50/7| ; |2|), avec son signe
  partie 2 ((b) Rayleigh : 1)
  (b) Le quotient de Rayleigh R(y₁).
    [free, sans aide, suivre l'erreur]  R
      = 182/25   ← y₁ᵀAy₁ = 52/7, y₁ᵀy₁ = 50/49
  partie 3 ((c) Vitesse : 1)
  (c) Vitesse de convergence.
    [free, sans aide, suivre l'erreur]  |λ_2/λ_1|
      (Valeurs propres : tr A et det A.)
      = 3/4   ← |6/8|
  partie 4 ((d) Puissance inverse : 0,5 ; La valeur propre trouvée. : 1)
  (d) Puissance inverse avec σ = 5 : vers quoi tendent les μk, puis quelle valeur propre trouve-t-on ?
    [free, sans aide, suivre l'erreur]  μ
      = 1   ← 1/(λ − σ) pour la valeur propre la plus proche de 5
    — La valeur propre trouvée.  [juge value]  départ : λ
      = 6   ← La valeur propre la plus proche de σ = 5
  partie 5 ((e) Conditionnement : 1)
  (e) Le conditionnement κ₂(A).
    [free, sans aide, suivre l'erreur]  κ_2
      = 4/3   ← A symétrique définie positive : λ_max/λ_min

```

## SVD en somme de rangs 1, approximation de rang k, image de la sphère (`m-svd-lowrank`, BA4)

_Garder les k plus grands σᵢuᵢvᵢᵀ ; l'erreur est σₖ₊₁._

### Niveau 1

```
A = [[0,0],[-2,-6],[6,2]] a pour SVD A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ, avec σ₁ = 8, u₁ = (0 ; −1 ; 1)/√2, v₁ = (1 ; 1)/√2 ; σ₂ = 4, u₂ = (0 ; −1 ; −1)/√2, v₂ = (−1 ; 1)/√2. Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[0,0],[-4,-4],[4,4]]   (cases à remplir : (1,1) (3,2))   ← σ₁u₁v₁ᵀ = 8·(0 ; −1 ; 1)/√2·(1 ; 1)/√2ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 4)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 8·(0 ; −1 ; 1)/√2·(1 ; 1)/√2ᵀ = [[□, …], …] | A₁ = [[0,0],[−4,−4],[4,4]], ‖A − A₁‖₂ = 4
  pièges : m_rankk_wrong_sigma

A = [[-2,4],[-2,4],[4,4]] a pour SVD A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ, avec σ₁ = 4√3, u₁ = (1 ; 1 ; 1)/√3, v₁ = (0 ; 1) ; σ₂ = 2√6, u₂ = (1 ; 1 ; −2)/√6, v₂ = (−1 ; 0). Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[0,4],[0,4],[0,4]]   (cases à remplir : (1,1) (3,2))   ← σ₁u₁v₁ᵀ = 4√3·(1 ; 1 ; 1)/√3·(0 ; 1)ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 2√6)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 4√3·(1 ; 1 ; 1)/√3·(0 ; 1)ᵀ = [[□, …], …] | A₁ = [[0,4],[0,4],[0,4]], ‖A − A₁‖₂ = 2√6
  pièges : m_rankk_wrong_sigma

A = [[3,6],[4,-2]] a pour SVD A = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ, avec σ₁ = 3√5, u₁ = (1 ; 0), v₁ = (1 ; 2)/√5 ; σ₂ = 2√5, u₂ = (0 ; 1), v₂ = (2 ; −1)/√5. Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[3,6],[0,0]]   (cases à remplir : (1,1) (2,2))   ← σ₁u₁v₁ᵀ = 3√5·(1 ; 0)·(1 ; 2)/√5ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 2√5)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 3√5·(1 ; 0)·(1 ; 2)/√5ᵀ = [[□, …], …] | A₁ = [[3,6],[0,0]], ‖A − A₁‖₂ = 2√5
  pièges : m_rankk_wrong_sigma

```

### Niveau 2

```
A = [[-6,-5,-11],[12,-10,2]] a pour SVD A = 4√10·u₂v₂ᵀ + 3√30·u₁v₁ᵀ, avec σ₂ = 4√10, u₂ = (2 ; 1)/√5, v₂ = (0 ; −1 ; −1)/√2 ; σ₁ = 3√30, u₁ = (1 ; −2)/√5, v₁ = (−2 ; 1 ; −1)/√6. Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    ? Quel terme garde-t-on pour la meilleure approximation de rang 1 ? ✔ Celui de la plus grande valeur singulière, 3√30 / · Celui écrit en premier (σ = 4√10)
    = [[-6,3,-3],[12,-6,6]]   (cases à remplir : (1,1) (2,3))   ← σ₁u₁v₁ᵀ = 3√30·(1 ; −2)/√5·(−2 ; 1 ; −1)/√6ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 4√10)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 3√30·(1 ; −2)/√5·(−2 ; 1 ; −1)/√6ᵀ = [[□, …], …] | A₁ = [[−6,3,−3],[12,−6,6]], ‖A − A₁‖₂ = 4√10
  pièges : m_rankk_wrong_sigma

A = [[0,0],[2,4],[-2,4]] a pour SVD A = 2√2·u₂v₂ᵀ + 4√2·u₁v₁ᵀ, avec σ₂ = 2√2, u₂ = (0 ; 1 ; −1)/√2, v₂ = (1 ; 0) ; σ₁ = 4√2, u₁ = (0 ; 1 ; 1)/√2, v₁ = (0 ; 1). Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    ? Quel terme garde-t-on pour la meilleure approximation de rang 1 ? ✔ Celui de la plus grande valeur singulière, 4√2 / · Celui écrit en premier (σ = 2√2)
    = [[0,0],[0,4],[0,4]]   (cases à remplir : (1,1) (3,2))   ← σ₁u₁v₁ᵀ = 4√2·(0 ; 1 ; 1)/√2·(0 ; 1)ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 2√2)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 4√2·(0 ; 1 ; 1)/√2·(0 ; 1)ᵀ = [[□, …], …] | A₁ = [[0,0],[0,4],[0,4]], ‖A − A₁‖₂ = 2√2
  pièges : m_rankk_wrong_sigma

A = [[-4,2],[-3,-6],[4,-2]] a pour SVD A = 2√10·u₂v₂ᵀ + 3√5·u₁v₁ᵀ, avec σ₂ = 2√10, u₂ = (1 ; 0 ; −1)/√2, v₂ = (−2 ; 1)/√5 ; σ₁ = 3√5, u₁ = (0 ; −1 ; 0), v₁ = (1 ; 2)/√5. Donne la meilleure approximation de rang 1 de A, puis l'erreur en norme 2.
  [guided]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    ? Quel terme garde-t-on pour la meilleure approximation de rang 1 ? ✔ Celui de la plus grande valeur singulière, 3√5 / · Celui écrit en premier (σ = 2√10)
    = [[0,0],[-3,-6],[0,0]]   (cases à remplir : (1,1) (3,2))   ← σ₁u₁v₁ᵀ = 3√5·(0 ; −1 ; 0)·(1 ; 2)/√5ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = □   (trous : 2√10)   ← Le plus grand terme jeté : σ₂
  aides : Garde le terme σᵢuᵢvᵢᵀ de la plus grande valeur singulière ; l'erreur en norme 2 est la plus grande valeur singulière jetée. | A₁ = 3√5·(0 ; −1 ; 0)·(1 ; 2)/√5ᵀ = [[□, …], …] | A₁ = [[0,0],[−3,−6],[0,0]], ‖A − A₁‖₂ = 2√10
  pièges : m_rankk_wrong_sigma

```

### Niveau 3

```
A = [[-1,-1,-5],[-3,-3,-3],[3,-3,0]] = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + σ₃u₃v₃ᵀ, avec σ₁ = 4√3, u₁ = (−1 ; −1 ; 0)/√2, v₁ = (1 ; 1 ; 2)/√6 ; σ₂ = 3√2, u₂ = (0 ; 0 ; −1), v₂ = (−1 ; 1 ; 0)/√2 ; σ₃ = √6, u₃ = (1 ; −1 ; 0)/√2, v₃ = (1 ; 1 ; −1)/√3. Donne A₁, les erreurs ‖A − A₁‖₂ et ‖A − A₁‖_F, puis le coût de stockage de A₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[-2,-2,-4],[-2,-2,-4],[0,0,0]]   ← σ₁u₁v₁ᵀ = 4√3·(−1 ; −1 ; 0)/√2·(1 ; 1 ; 2)/√6ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 3√2   ← Le plus grand terme jeté : σ₂
  — L'erreur de Frobenius ‖A − A₁‖_F.  [juge value]  départ : F_1
    = 2√6   ← √(18 + 6) : tous les termes jetés
  — Combien de nombres faut-il stocker pour A₁ (σ₁, u₁ et v₁) ?  [juge value]  départ : N
    = 7   ← k(m + n + 1) = 1·(3 + 3 + 1), au lieu de 9
  aides : ‖A − A₁‖₂ est le plus grand σ jeté ; ‖A − A₁‖_F est la racine de la somme des carrés des σ jetés. | ‖A − A₁‖_F = √(□ + □) | ‖A − A₁‖₂ = 3√2, ‖A − A₁‖_F = 2√6
  pièges : m_rankk_wrong_sigma

A = [[1,-8],[-2,4],[-2,-8]] = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ, avec σ₁ = 12, u₁ = (−2 ; 1 ; −2)/3, v₁ = (0 ; 1) ; σ₂ = 3, u₂ = (1 ; −2 ; −2)/3, v₂ = (1 ; 0). Donne A₁, les erreurs ‖A − A₁‖₂ et ‖A − A₁‖_F, puis le coût de stockage de A₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[0,-8],[0,4],[0,-8]]   ← σ₁u₁v₁ᵀ = 12·(−2 ; 1 ; −2)/3·(0 ; 1)ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 3   ← Le plus grand terme jeté : σ₂
  — L'erreur de Frobenius ‖A − A₁‖_F.  [juge value]  départ : F_1
    = 3   ← √(9) : tous les termes jetés
  — Combien de nombres faut-il stocker pour A₁ (σ₁, u₁ et v₁) ?  [juge value]  départ : N
    = 6   ← k(m + n + 1) = 1·(3 + 2 + 1), au lieu de 6
  aides : ‖A − A₁‖₂ est le plus grand σ jeté ; ‖A − A₁‖_F est la racine de la somme des carrés des σ jetés. | ‖A − A₁‖_F = √(□) | ‖A − A₁‖₂ = 3, ‖A − A₁‖_F = 3
  pièges : m_rankk_wrong_sigma

A = [[1,-1,-1],[-5,-2,-3],[3,-2,5]] = σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ + σ₃u₃v₃ᵀ, avec σ₁ = 8, u₁ = (0 ; −1 ; 1)/√2, v₁ = (1 ; 0 ; 1)/√2 ; σ₂ = 2√3, u₂ = (0 ; 1 ; 1)/√2, v₂ = (−1 ; −2 ; 1)/√6 ; σ₃ = √3, u₃ = (−1 ; 0 ; 0), v₃ = (−1 ; 1 ; 1)/√3. Donne A₁, les erreurs ‖A − A₁‖₂ et ‖A − A₁‖_F, puis le coût de stockage de A₁. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A_1
    (A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.)
    = [[0,0,0],[-4,0,-4],[4,0,4]]   ← σ₁u₁v₁ᵀ = 8·(0 ; −1 ; 1)/√2·(1 ; 0 ; 1)/√2ᵀ
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 2√3   ← Le plus grand terme jeté : σ₂
  — L'erreur de Frobenius ‖A − A₁‖_F.  [juge value]  départ : F_1
    = √15   ← √(12 + 3) : tous les termes jetés
  — Combien de nombres faut-il stocker pour A₁ (σ₁, u₁ et v₁) ?  [juge value]  départ : N
    = 7   ← k(m + n + 1) = 1·(3 + 3 + 1), au lieu de 9
  aides : ‖A − A₁‖₂ est le plus grand σ jeté ; ‖A − A₁‖_F est la racine de la somme des carrés des σ jetés. | ‖A − A₁‖_F = √(□ + □) | ‖A − A₁‖₂ = 2√3, ‖A − A₁‖_F = √15
  pièges : m_rankk_wrong_sigma

```

### Niveau 4

```
A = [[-4,-4,-2],[4,-8,8]]. Trouve σ₁ et v₁, puis la meilleure approximation de rang 1, A₁ = σ₁u₁v₁ᵀ = Av₁v₁ᵀ, et l'erreur ‖A − A₁‖₂.
  [free, suivre l'erreur]  σ_1
    (σ₁, la plus grande valeur singulière : la racine de la plus grande valeur propre de AᵀA (ou de AAᵀ, plus petite).)
    = 12   ← √144
  — v₁ : un vecteur propre de AᵀA pour λ = 144.  [juge eigvec]  départ : v_1
    = (1 ; -2 ; 2)   ← (AᵀA − 144I)v = 0
  — A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.  [juge mat]  départ : A_1
    = [[0,0,0],[4,-8,8]]   ← A₁ = Av₁v₁ᵀ, avec v₁ = (1 ; −2 ; 2)/3
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 6   ← Le plus grand terme jeté : σ₂
  aides : AᵀA = [[32,−16,40],[−16,80,−56],[40,−56,68]] : ses valeurs propres sont les σᵢ² (et des 0). | σ₁ = √□ ; A₁ = A·v₁v₁ᵀ avec v₁ unitaire | σ₁ = 12, v₁ = (1 ; −2 ; 2)/3, A₁ = [[0,0,0],[4,−8,8]], erreur 6
  pièges : l_svd_sigma_is_eig, m_rankk_wrong_sigma

A = [[-7,6,1],[-1,-6,7]]. Trouve σ₁ et v₁, puis la meilleure approximation de rang 1, A₁ = σ₁u₁v₁ᵀ = Av₁v₁ᵀ, et l'erreur ‖A − A₁‖₂.
  [free, suivre l'erreur]  σ_1
    (σ₁, la plus grande valeur singulière : la racine de la plus grande valeur propre de AᵀA (ou de AAᵀ, plus petite).)
    = 6√3   ← √108
  — v₁ : un vecteur propre de AᵀA pour λ = 108.  [juge eigvec]  départ : v_1
    = (1 ; -2 ; 1)   ← (AᵀA − 108I)v = 0
  — A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.  [juge mat]  départ : A_1
    = [[-3,6,-3],[3,-6,3]]   ← A₁ = Av₁v₁ᵀ, avec v₁ = (1 ; −2 ; 1)/√6
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 8   ← Le plus grand terme jeté : σ₂
  aides : AᵀA = [[50,−36,−14],[−36,72,−36],[−14,−36,50]] : ses valeurs propres sont les σᵢ² (et des 0). | σ₁ = √□ ; A₁ = A·v₁v₁ᵀ avec v₁ unitaire | σ₁ = 6√3, v₁ = (1 ; −2 ; 1)/√6, A₁ = [[−3,6,−3],[3,−6,3]], erreur 8
  pièges : l_svd_sigma_is_eig, m_rankk_wrong_sigma

A = [[-1,-8],[-7,4],[0,0]]. Trouve σ₁ et v₁, puis la meilleure approximation de rang 1, A₁ = σ₁u₁v₁ᵀ = Av₁v₁ᵀ, et l'erreur ‖A − A₁‖₂.
  [free, suivre l'erreur]  σ_1
    (σ₁, la plus grande valeur singulière : la racine de la plus grande valeur propre de AᵀA (ou de AAᵀ, plus petite).)
    = 3√10   ← √90
  — v₁ : un vecteur propre de AᵀA pour λ = 90.  [juge eigvec]  départ : v_1
    = (-1 ; 2)   ← (AᵀA − 90I)v = 0
  — A₁ = σ₁u₁v₁ᵀ, la meilleure approximation de rang 1.  [juge mat]  départ : A_1
    = [[3,-6],[-3,6],[0,0]]   ← A₁ = Av₁v₁ᵀ, avec v₁ = (−1 ; 2)/√5
  — L'erreur ‖A − A₁‖₂.  [juge value]  départ : E_1
    = 2√10   ← Le plus grand terme jeté : σ₂
  aides : AᵀA = [[50,−20],[−20,80]] : ses valeurs propres sont les σᵢ² (et des 0). | σ₁ = √□ ; A₁ = A·v₁v₁ᵀ avec v₁ unitaire | σ₁ = 3√10, v₁ = (−1 ; 2)/√5, A₁ = [[3,−6],[−3,6],[0,0]], erreur 2√10
  pièges : l_svd_sigma_is_eig, m_rankk_wrong_sigma

```

### Niveau 5

```
Une image 4 × 4 a les valeurs singulières 36, 28, 12, 8. On veut la compresser par Ak avec une erreur relative de Frobenius ‖A − Ak‖_F/‖A‖_F ≤ 20 %. Donne ‖A‖_F², le plus petit k, puis ‖A − Ak‖₂.
  [free, sans aide]  N
    (‖A‖_F² :)
    = 2288   ← Σσᵢ²
  — k minimal pour ‖A − Ak‖_F ≤ 20 % de ‖A‖_F.  [juge value]  départ : k
    = 3   ← Σ_{i>k} σᵢ² ≤ 0,04·2288 = 91,52
  — L'erreur ‖A − A3‖₂ pour ce k.  [juge value]  départ : E_3
    = 8   ← σ₄
  pièges : m_rankk_wrong_sigma

Une image 4 × 4 a les valeurs singulières 36, 32, 24, 16. On veut la compresser par Ak avec une erreur relative de Frobenius ‖A − Ak‖_F/‖A‖_F ≤ 30 %. Donne ‖A‖_F², le plus petit k, puis ‖A − Ak‖₂.
  [free, sans aide]  N
    (‖A‖_F² :)
    = 3152   ← Σσᵢ²
  — k minimal pour ‖A − Ak‖_F ≤ 30 % de ‖A‖_F.  [juge value]  départ : k
    = 3   ← Σ_{i>k} σᵢ² ≤ 0,09·3152 = 283,68
  — L'erreur ‖A − A3‖₂ pour ce k.  [juge value]  départ : E_3
    = 16   ← σ₄
  pièges : m_rankk_wrong_sigma

Une image 4 × 4 a les valeurs singulières 32, 24, 12, 8. On veut la compresser par Ak avec une erreur relative de Frobenius ‖A − Ak‖_F/‖A‖_F ≤ 20 %. Donne ‖A‖_F², le plus petit k, puis ‖A − Ak‖₂.
  [free, sans aide]  N
    (‖A‖_F² :)
    = 1808   ← Σσᵢ²
  — k minimal pour ‖A − Ak‖_F ≤ 20 % de ‖A‖_F.  [juge value]  départ : k
    = 3   ← Σ_{i>k} σᵢ² ≤ 0,04·1808 = 72,32
  — L'erreur ‖A − A3‖₂ pour ce k.  [juge value]  départ : E_3
    = 8   ← σ₄
  pièges : m_rankk_wrong_sigma

```

### Variantes d'examen

```
A = [[0,3],[-3,0],[3,0]] (valeurs singulières 3√2 et 3). Quelle est l'image par A de la sphère unité de ℝ² ?
  · Un ellipsoïde de ℝ³ de demi-axes 3√2, 3 et 1   ✔ Une ellipse (la courbe seule), de demi-axes 3√2 et 3, dans un plan de ℝ³   · L'ellipse pleine de demi-axes 3√2 et 3, dans un plan de ℝ³ [l_svd_sphere_boundary]   · Un cercle de rayon 3√2
  [examen mcq]
  pièges : l_svd_sphere_boundary

Vrai ou faux ?
  « ‖A‖_F² = Σ aᵢⱼ² = Σ σᵢ². » → VRAI
  [examen tf]

```

## Normes matricielles (`m-norms`, BA4)

_‖·‖₁ par colonnes, ‖·‖∞ par lignes, ‖·‖₂ = σ₁, Frobenius._

### Niveau 1

```
A = [[-5,0],[4,3]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|−5| + |□|,|0| + |□|)   (trous : max(|−5| + |4|,|0| + |3|))   ← Colonnes
    = 9   ← le plus grand de (9 ; 3)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−5| + |□|,|4| + |□|)   (trous : max(|−5| + |0|,|4| + |3|))   ← Lignes
    = 7   ← le plus grand de (5 ; 7)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 5√2   ← √((−5)² + 0² + 4² + 3²) = √50
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 3) | ‖A‖₁ = 9, ‖A‖∞ = 7, ‖A‖_F = 5√2
  pièges : m_norm_1_inf_swap

A = [[-5,-2],[-5,2]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|−□| + |−5|,|−□| + |2|)   (trous : max(|−5| + |−5|,|−2| + |2|))   ← Colonnes
    = 10   ← le plus grand de (10 ; 4)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−5| + |−□|,|−5| + |□|)   (trous : max(|−5| + |−2|,|−5| + |2|))   ← Lignes
    = 7   ← le plus grand de (7 ; 7)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √58   ← √((−5)² + (−2)² + (−5)² + 2²) = √58
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 4) | ‖A‖₁ = 10, ‖A‖∞ = 7, ‖A‖_F = √58
  pièges : m_norm_1_inf_swap

A = [[4,-1],[2,2]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|4| + |□|,|−1| + |□|)   (trous : max(|4| + |2|,|−1| + |2|))   ← Colonnes
    = 6   ← le plus grand de (6 ; 3)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|4| + |−□|,|□| + |2|)   (trous : max(|4| + |−1|,|2| + |2|))   ← Lignes
    = 5   ← le plus grand de (5 ; 4)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 5   ← √(4² + (−1)² + 2² + 2²) = √25
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 3) | ‖A‖₁ = 6, ‖A‖∞ = 5, ‖A‖_F = 5
  pièges : m_norm_1_inf_swap

```

### Niveau 2

```
A = [[-4,4],[1,1]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    ? Pour ‖A‖₁, que somme-t-on ? ✔ Les |aᵢⱼ| de chaque colonne / · Les |aᵢⱼ| de chaque ligne / · Tous les |aᵢⱼ|
    = max(|−4| + |□|,|4| + |□|)   (trous : max(|−4| + |1|,|4| + |1|))   ← Colonnes
    = 5   ← le plus grand de (5 ; 5)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−□| + |4|,|□| + |1|)   (trous : max(|−4| + |4|,|1| + |1|))   ← Lignes
    = 8   ← le plus grand de (8 ; 2)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √34   ← √((−4)² + 4² + 1² + 1²) = √34
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 5) | ‖A‖₁ = 5, ‖A‖∞ = 8, ‖A‖_F = √34
  pièges : m_norm_1_inf_swap

A = [[-5,-5],[1,-1]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    ? Pour ‖A‖₁, que somme-t-on ? ✔ Les |aᵢⱼ| de chaque colonne / · Les |aᵢⱼ| de chaque ligne / · Tous les |aᵢⱼ|
    = max(|−5| + |□|,|−5| + |−□|)   (trous : max(|−5| + |1|,|−5| + |−1|))   ← Colonnes
    = 6   ← le plus grand de (6 ; 6)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−□| + |−5|,|□| + |−1|)   (trous : max(|−5| + |−5|,|1| + |−1|))   ← Lignes
    = 10   ← le plus grand de (10 ; 2)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 2√13   ← √((−5)² + (−5)² + 1² + (−1)²) = √52
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 6) | ‖A‖₁ = 6, ‖A‖∞ = 10, ‖A‖_F = 2√13
  pièges : m_norm_1_inf_swap

A = [[1,1],[5,-5]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₁, ‖A‖∞ et ‖A‖_F.
  [guided]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    ? Pour ‖A‖₁, que somme-t-on ? ✔ Les |aᵢⱼ| de chaque colonne / · Les |aᵢⱼ| de chaque ligne / · Tous les |aᵢⱼ|
    = max(|1| + |□|,|1| + |−□|)   (trous : max(|1| + |5|,|1| + |−5|))   ← Colonnes
    = 6   ← le plus grand de (6 ; 6)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|□| + |1|,|□| + |−5|)   (trous : max(|1| + |1|,|5| + |−5|))   ← Lignes
    = 10   ← le plus grand de (2 ; 10)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 2√13   ← √(1² + 1² + 5² + (−5)²) = √52
  aides : ‖·‖₁ : colonnes (le 1 est vertical) ; ‖·‖∞ : lignes (le ∞ est couché). | ‖A‖₁ = max(□ ; 6) | ‖A‖₁ = 6, ‖A‖∞ = 10, ‖A‖_F = 2√13
  pièges : m_norm_1_inf_swap

```

### Niveau 3

```
A = [[-5,2],[-1,2]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule les quatre normes. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|−5| + |−1|,|2| + |2|)   ← Colonnes
    = 6   ← le plus grand de (6 ; 4)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−5| + |2|,|−1| + |2|)   ← Lignes
    = 7   ← le plus grand de (7 ; 3)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √34   ← √((−5)² + 2² + (−1)² + 2²) = √34
  — AᵀA.  [juge mat]  départ : A^T·A
    = [[26,-12],[-12,8]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 4√2   ← √32 : valeurs propres de AᵀA 32 et 2 (trace 34, déterminant 64)
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[26, □], [□, 8]] | ‖A‖₂ = 4√2, ‖A‖_F = √34
  pièges : m_norm_1_inf_swap, m_norm2_eig

A = [[-4,-1],[0,3]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule les quatre normes. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|−4| + |0|,|−1| + |3|)   ← Colonnes
    = 4   ← le plus grand de (4 ; 4)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−4| + |−1|,|0| + |3|)   ← Lignes
    = 5   ← le plus grand de (5 ; 3)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √26   ← √((−4)² + (−1)² + 0² + 3²) = √26
  — AᵀA.  [juge mat]  départ : A^T·A
    = [[16,4],[4,10]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 3√2   ← √18 : valeurs propres de AᵀA 18 et 8 (trace 26, déterminant 144)
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[16, □], [□, 10]] | ‖A‖₂ = 3√2, ‖A‖_F = √26
  pièges : m_norm_1_inf_swap, m_norm2_eig

A = [[-2,-1],[-2,1]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule les quatre normes. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  N_1
    (‖A‖₁ : la plus grande somme des |aᵢⱼ| d'une colonne.)
    = max(|−2| + |−2|,|−1| + |1|)   ← Colonnes
    = 4   ← le plus grand de (4 ; 2)
  — ‖A‖∞ : la plus grande somme des |aᵢⱼ| d'une ligne.  [juge value]  départ : N_∞
    = max(|−2| + |−1|,|−2| + |1|)   ← Lignes
    = 3   ← le plus grand de (3 ; 3)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √10   ← √((−2)² + (−1)² + (−2)² + 1²) = √10
  — AᵀA.  [juge mat]  départ : A^T·A
    = [[8,0],[0,2]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 2√2   ← √8 : valeurs propres de AᵀA 8 et 2 (trace 10, déterminant 16)
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[8, □], [□, 2]] | ‖A‖₂ = 2√2, ‖A‖_F = √10
  pièges : m_norm_1_inf_swap, m_norm2_eig

```

### Niveau 4

```
A = [[-4,-3],[-5,0]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₂ par AᵀA (A n'est pas symétrique), puis ‖A‖_F.
  [free, suivre l'erreur]  A^T·A
    (AᵀA.)
    = [[41,12],[12,9]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 3√5   ← √45 : valeurs propres de AᵀA 45 et 5 (trace 50, déterminant 225)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 5√2   ← √((−4)² + (−3)² + (−5)² + 0²) = √50
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[41, □], [□, 9]] | ‖A‖₂ = 3√5, ‖A‖_F = 5√2
  pièges : m_norm_1_inf_swap, m_norm2_eig

A = [[-5,2],[1,-2]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₂ par AᵀA (A n'est pas symétrique), puis ‖A‖_F.
  [free, suivre l'erreur]  A^T·A
    (AᵀA.)
    = [[26,-12],[-12,8]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 4√2   ← √32 : valeurs propres de AᵀA 32 et 2 (trace 34, déterminant 64)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = √34   ← √((−5)² + 2² + 1² + (−2)²) = √34
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[26, □], [□, 8]] | ‖A‖₂ = 4√2, ‖A‖_F = √34
  pièges : m_norm_1_inf_swap, m_norm2_eig

A = [[5,0],[4,3]]. On note N₁ = ‖A‖₁, N∞ = ‖A‖∞, N₂ = ‖A‖₂ et N_F = ‖A‖_F. Calcule ‖A‖₂ par AᵀA (A n'est pas symétrique), puis ‖A‖_F.
  [free, suivre l'erreur]  A^T·A
    (AᵀA.)
    = [[41,12],[12,9]]   ← Produit, symétrique
  — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
    = 3√5   ← √45 : valeurs propres de AᵀA 45 et 5 (trace 50, déterminant 225)
  — ‖A‖_F : la racine de la somme des carrés des cases.  [juge value]  départ : N_F
    = 5√2   ← √(5² + 0² + 4² + 3²) = √50
  aides : ‖A‖₂ n'est pas lue sur A : c'est √(λ_max(AᵀA)), sauf si A est symétrique. | AᵀA = [[41, □], [□, 9]] | ‖A‖₂ = 3√5, ‖A‖_F = 5√2
  pièges : m_norm_1_inf_swap, m_norm2_eig

```

### Niveau 5

```
Normes de matrices. A = [[2,4],[2,-1]].
  [problème, 4 points]
  partie 1 (‖A‖₂ : 1 ; ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA). : 1)
  ‖A‖₂ pour A = [[2,4],[2,-1]].
    [free, sans aide, suivre l'erreur]  A^T·A
      (AᵀA.)
      = [[8,6],[6,17]]   ← Produit, symétrique
    — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
      = 2√5   ← √20 : valeurs propres de AᵀA 20 et 5 (trace 25, déterminant 100)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice carrée A, ρ(A) ≤ ‖A‖∞. » → VRAI
  partie 3 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute norme subordonnée, ‖AB‖ ≤ ‖A‖·‖B‖. » → VRAI
  pièges : m_norm2_eig

Normes de matrices. A = [[-2,-1],[2,5]].
  [problème, 4 points]
  partie 1 (‖A‖₂ : 1 ; ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA). : 1)
  ‖A‖₂ pour A = [[-2,-1],[2,5]].
    [free, sans aide, suivre l'erreur]  A^T·A
      (AᵀA.)
      = [[8,12],[12,26]]   ← Produit, symétrique
    — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
      = 4√2   ← √32 : valeurs propres de AᵀA 32 et 2 (trace 34, déterminant 64)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice carrée A, ρ(A) ≤ ‖A‖∞. » → VRAI
  partie 3 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice A, ‖A‖_F = ‖A‖₂. » → FAUX
      contre-exemple (mx) : A = [[1,0],[0,1]]
  pièges : m_norm2_eig

Normes de matrices. A = [[-4,-5],[-4,5]].
  [problème, 4 points]
  partie 1 (‖A‖₂ : 1 ; ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA). : 1)
  ‖A‖₂ pour A = [[-4,-5],[-4,5]].
    [free, sans aide, suivre l'erreur]  A^T·A
      (AᵀA.)
      = [[32,0],[0,50]]   ← Produit, symétrique
    — ‖A‖₂ = σ₁ = √(plus grande valeur propre de AᵀA).  [juge value]  départ : N_2
      = 5√2   ← √50 : valeurs propres de AᵀA 50 et 32 (trace 82, déterminant 1600)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice carrée A, ρ(A) ≤ ‖A‖∞. » → VRAI
  partie 3 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice A, ‖A‖_F = ‖A‖₂. » → FAUX
      contre-exemple (mx) : A = [[1,0],[0,1]]
  pièges : m_norm2_eig

```

### Variantes d'examen

```
A = [[1,3],[4,0]]. Que vaut ‖A‖₂ ?
  · 18 [l_svd_sigma_is_eig]   ✔ 3√2   · √26   · 4 [m_norm2_eig]
  [examen mcq]
  pièges : m_norm2_eig, l_svd_sigma_is_eig

Vrai ou faux ?
  « Pour toute matrice A, ‖A‖₁ = ‖A‖∞. » → FAUX
    contre-exemple (mx) : A = [[3,0],[4,5]]
  [examen tf]
  pièges : m_norm_1_inf_swap

```

## Conditionnement (`m-cond`, BA4)

_κ = ‖A‖·‖A⁻¹‖ amplifie l'erreur relative ; κ₂ = σ₁/σₙ._

### Niveau 1

```
A = [[-5,-4],[0,-3]] ; AᵀA a les valeurs propres 45 et 5. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A) = σ₁/σ₂.)
    = □   (trous : 3)   ← √(45/5) : σ₁² = 45, σ₂² = 5 (valeurs propres de AᵀA)
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = √(45/□) | 3
  pièges : m_cond_eig_nonsym

A = [[-4,3],[0,5]] ; AᵀA a les valeurs propres 40 et 10. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A) = σ₁/σ₂.)
    = □   (trous : 2)   ← √(40/10) : σ₁² = 40, σ₂² = 10 (valeurs propres de AᵀA)
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = √(40/□) | 2
  pièges : m_cond_eig_nonsym

A = [[6,3],[3,6]] est symétrique, de valeurs propres 9 et 3. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A).)
    = 9/□   (trous : 9/3)   ← λ_max/λ_min
    = □   (trous : 3)   ← Simplifié
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = 9/□ | 3

```

### Niveau 2

```
A = [[-4,-3],[0,5]] ; AᵀA a les valeurs propres 40 et 10. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A) = σ₁/σ₂.)
    ? A n'est pas symétrique. Quelle formule pour κ₂ ? ✔ σ₁/σ₂, avec les valeurs propres de AᵀA / · |λ_max/λ_min| avec les valeurs propres de A (−4 et 5)
    = □   (trous : 2)   ← √(40/10) : σ₁² = 40, σ₂² = 10 (valeurs propres de AᵀA)
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = √(40/□) | 2
  pièges : m_cond_eig_nonsym

A = [[6,-4],[-4,6]] est symétrique, de valeurs propres 10 et 2. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A).)
    ? A est symétrique définie positive. Quelle formule pour κ₂ ? ✔ λ_max/λ_min / · 1/|det A| : plus det est petit, plus A est mal conditionnée / · λ_max − λ_min
    = 10/□   (trous : 10/2)   ← λ_max/λ_min
    = □   (trous : 5)   ← Simplifié
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = 10/□ | 5
  pièges : m_cond_det

A = [[4,-3],[-3,4]] est symétrique, de valeurs propres 7 et 1. Calcule κ₂(A).
  [guided]  κ_2
    (κ₂(A).)
    ? A est symétrique définie positive. Quelle formule pour κ₂ ? ✔ λ_max/λ_min / · 1/|det A| : plus det est petit, plus A est mal conditionnée / · λ_max − λ_min
    = □   (trous : 7)   ← λ_max/λ_min = 7/1
  aides : κ₂ = plus grande sur plus petite valeur singulière ; pour A symétrique définie positive, λ_max/λ_min. | κ₂ = 7/□ | 7
  pièges : m_cond_det

```

### Niveau 3

```
A = [[6,-4],[-4,6]] (valeurs propres 10 et 2), Ax = b avec b = (10 ; -10), donc x = (1 ; -1). On perturbe b de δb = (1/10 ; 1/10). Calcule κ₂(A), ‖δb‖/‖b‖, la borne sur ‖δx‖/‖x‖, puis ‖δx‖/‖x‖. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  κ_2
    (κ₂(A).)
    = 5   ← λ_max/λ_min = 10/2
  — L'erreur relative de b, ‖δb‖/‖b‖ (norme 2).  [juge value]  départ : r_b
    = 1/100   ← δb = 1/10·(1 ; 1) et b = 10·(1 ; −1), de même norme √2
  — La borne κ₂·‖δb‖/‖b‖ sur l'erreur relative de x.  [juge value]  départ : B
    = 1/20   ← 5 × 1/100
  — L'erreur relative ‖δx‖/‖x‖ vraiment obtenue.  [juge value]  départ : r_x
    = 1/20   ← δb est vecteur propre pour 2 : δx = δb/2, la borne est atteinte
  aides : ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ ; si δb est vecteur propre de la plus petite valeur propre, δx = δb/λ_min. | borne = 5 × □ | κ₂ = 5, ‖δb‖/‖b‖ = 1/100, borne = ‖δx‖/‖x‖ = 1/20

A = [[6,-4],[-4,6]] (valeurs propres 10 et 2), Ax = b avec b = (10 ; -10), donc x = (1 ; -1). On perturbe b de δb = (1/10 ; 1/10). Calcule κ₂(A), ‖δb‖/‖b‖, la borne sur ‖δx‖/‖x‖, puis ‖δx‖/‖x‖. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  κ_2
    (κ₂(A).)
    = 5   ← λ_max/λ_min = 10/2
  — L'erreur relative de b, ‖δb‖/‖b‖ (norme 2).  [juge value]  départ : r_b
    = 1/100   ← δb = 1/10·(1 ; 1) et b = 10·(1 ; −1), de même norme √2
  — La borne κ₂·‖δb‖/‖b‖ sur l'erreur relative de x.  [juge value]  départ : B
    = 1/20   ← 5 × 1/100
  — L'erreur relative ‖δx‖/‖x‖ vraiment obtenue.  [juge value]  départ : r_x
    = 1/20   ← δb est vecteur propre pour 2 : δx = δb/2, la borne est atteinte
  aides : ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ ; si δb est vecteur propre de la plus petite valeur propre, δx = δb/λ_min. | borne = 5 × □ | κ₂ = 5, ‖δb‖/‖b‖ = 1/100, borne = ‖δx‖/‖x‖ = 1/20

A = [[2,-1],[-1,2]] (valeurs propres 3 et 1), Ax = b avec b = (3 ; -3), donc x = (1 ; -1). On perturbe b de δb = (3/100 ; 3/100). Calcule κ₂(A), ‖δb‖/‖b‖, la borne sur ‖δx‖/‖x‖, puis ‖δx‖/‖x‖. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  κ_2
    (κ₂(A).)
    = 3   ← λ_max/λ_min = 3/1
  — L'erreur relative de b, ‖δb‖/‖b‖ (norme 2).  [juge value]  départ : r_b
    = 1/100   ← δb = 3/100·(1 ; 1) et b = 3·(1 ; −1), de même norme √2
  — La borne κ₂·‖δb‖/‖b‖ sur l'erreur relative de x.  [juge value]  départ : B
    = 3/100   ← 3 × 1/100
  — L'erreur relative ‖δx‖/‖x‖ vraiment obtenue.  [juge value]  départ : r_x
    = 3/100   ← δb est vecteur propre pour 1 : δx = δb/1, la borne est atteinte
  aides : ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ ; si δb est vecteur propre de la plus petite valeur propre, δx = δb/λ_min. | borne = 3 × □ | κ₂ = 3, ‖δb‖/‖b‖ = 1/100, borne = ‖δx‖/‖x‖ = 3/100

```

### Niveau 4

```
A = [[0,1],[2,2]]. Calcule A⁻¹, puis κ₁(A) = ‖A‖₁·‖A⁻¹‖₁.
  [free, suivre l'erreur]  A^(−1)
    (A⁻¹.)
    = [[-1,1/2],[1,0]]   ← (1/det A)·[[d, −b], [−c, a]], det A = −2
  — ‖A‖₁.  [juge value]  départ : N_1
    = 3   ← Colonnes
  — ‖A⁻¹‖₁.  [juge value]  départ : M
    = 2   ← Colonnes de A⁻¹
  — κ₁(A) = ‖A‖₁·‖A⁻¹‖₁.  [juge value]  départ : κ
    = 6   ← Produit
  aides : κ₁ = ‖A‖₁·‖A⁻¹‖₁ ; ‖·‖₁ : colonnes. | A⁻¹ = (1/−2)·[[2, □], [□, 0]] | A⁻¹ = [[−1,1/2],[1,0]], κ₁ = 3 × 2 = 6
  pièges : m_norm_1_inf_swap

A = [[3,4],[2,3]]. Calcule A⁻¹, puis κ₁(A) = ‖A‖₁·‖A⁻¹‖₁.
  [free, suivre l'erreur]  A^(−1)
    (A⁻¹.)
    = [[3,-4],[-2,3]]   ← (1/det A)·[[d, −b], [−c, a]], det A = 1
  — ‖A‖₁.  [juge value]  départ : N_1
    = 7   ← Colonnes
  — ‖A⁻¹‖₁.  [juge value]  départ : M
    = 7   ← Colonnes de A⁻¹
  — κ₁(A) = ‖A‖₁·‖A⁻¹‖₁.  [juge value]  départ : κ
    = 49   ← Produit
  aides : κ₁ = ‖A‖₁·‖A⁻¹‖₁ ; ‖·‖₁ : colonnes. | A⁻¹ = (1/1)·[[3, □], [□, 3]] | A⁻¹ = [[3,−4],[−2,3]], κ₁ = 7 × 7 = 49
  pièges : m_norm_1_inf_swap

A = [[5,4],[-3,-2]]. Calcule A⁻¹, puis κ∞(A) = ‖A‖∞·‖A⁻¹‖∞.
  [free, suivre l'erreur]  A^(−1)
    (A⁻¹.)
    = [[-1,-2],[3/2,5/2]]   ← (1/det A)·[[d, −b], [−c, a]], det A = 2
  — ‖A‖∞.  [juge value]  départ : N_∞
    = 9   ← Lignes
  — ‖A⁻¹‖∞.  [juge value]  départ : M
    = 4   ← Lignes de A⁻¹
  — κ∞(A) = ‖A‖∞·‖A⁻¹‖∞.  [juge value]  départ : κ
    = 36   ← Produit
  aides : κ∞ = ‖A‖∞·‖A⁻¹‖∞ ; ‖·‖∞ : lignes. | A⁻¹ = (1/2)·[[-2, □], [□, 5]] | A⁻¹ = [[−1,−2],[3/2,5/2]], κ∞ = 9 × 4 = 36
  pièges : m_norm_1_inf_swap

```

### Niveau 5

```
A = [[3,-4],[-4,9]] (symétrique, valeurs propres 11 et 1), b = (11 ; -22). On résout A(x + δx) = b + δb pour trois perturbations :n°δb‖δb‖/‖b‖‖δx‖/‖x‖1(0,02 ; 0,01)0,000910,010002(0,03 ; −0,01)0,001290,010043(0,01 ; −0,02)0,000910,00091Donne κ₂(A), puis la perturbation qui atteint la borne.
  [free, sans aide]  κ_2
    = 11   ← λ_max/λ_min = 11/1
  — Le numéro de la perturbation qui atteint la borne ‖δx‖/‖x‖ = κ₂·‖δb‖/‖b‖.  [juge value]  départ : n
    = 1   ← Rapport 11 : δb sur le vecteur propre de λ_min = 1

A = [[2,-2],[-2,5]] (symétrique, valeurs propres 6 et 1), b = (6 ; -12). On résout A(x + δx) = b + δb pour trois perturbations :n°δb‖δb‖/‖b‖‖δx‖/‖x‖1(0,02 ; 0,01)0,001670,010002(0,01 ; −0,02)0,001670,001673(0,03 ; −0,01)0,002360,01014Donne κ₂(A), puis la perturbation qui atteint la borne.
  [free, sans aide]  κ_2
    = 6   ← λ_max/λ_min = 6/1
  — Le numéro de la perturbation qui atteint la borne ‖δx‖/‖x‖ = κ₂·‖δb‖/‖b‖.  [juge value]  départ : n
    = 1   ← Rapport 6 : δb sur le vecteur propre de λ_min = 1

A = [[3,2],[2,3]] (symétrique, valeurs propres 5 et 1), b = (5 ; 5). On résout A(x + δx) = b + δb pour trois perturbations :n°δb‖δb‖/‖b‖‖δx‖/‖x‖1(0,02 ; 0)0,002830,010202(0,01 ; −0,01)0,002000,010003(0,01 ; 0,01)0,002000,00200Donne κ₂(A), puis la perturbation qui atteint la borne.
  [free, sans aide]  κ_2
    = 5   ← λ_max/λ_min = 5/1
  — Le numéro de la perturbation qui atteint la borne ‖δx‖/‖x‖ = κ₂·‖δb‖/‖b‖.  [juge value]  départ : n
    = 2   ← Rapport 5 : δb sur le vecteur propre de λ_min = 1

```

### Variantes d'examen

```
A = [[-4,-1],[0,3]] ; AᵀA a les valeurs propres 18 et 8. Que vaut κ₂(A) ?
  · 9/4 [l_svd_sigma_is_eig]   · 4/3 [m_cond_eig_nonsym]   ✔ 3/2   · 2/3
  [examen mcq]
  pièges : m_cond_eig_nonsym, l_svd_sigma_is_eig

Vrai ou faux ?
  « Pour toute matrice inversible A à valeurs propres réelles, κ₂(A) = |λ_max|/|λ_min|. » → FAUX
    contre-exemple (mx) : A = [[1,2],[0,1]]
  [examen tf]
  pièges : m_cond_eig_nonsym

```

## Disques de Gershgorin (`m-gershgorin`, BA4)

_Chaque valeur propre est dans un disque centré sur la diagonale._

### Niveau 1

```
A = [[9,-2,-1],[-2,-4,-1],[-1,-1,2]]. Donne les disques de Gershgorin (par lignes).
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = 9, rayon R₁.)
    = |−2| + |−□|   (trous : |−2| + |−1|)   ← Ligne 1, sans la diagonale
    = □   (trous : 3)   ← D(9 ; 3)
  — Le disque 2 : centre a₂₂ = −4, rayon R₂.  [juge value]  départ : R_2
    = |−2| + |−□|   (trous : |−2| + |−1|)   ← Ligne 2, sans la diagonale
    = □   (trous : 3)   ← D(−4 ; 3)
  — Le disque 3 : centre a₃₃ = 2, rayon R₃.  [juge value]  départ : R_3
    = |−□| + |−1|   (trous : |−1| + |−1|)   ← Ligne 3, sans la diagonale
    = □   (trous : 2)   ← D(2 ; 2)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-2|+|□| | D(9 ; 3), D(−4 ; 3), D(2 ; 2) (valeurs propres ≈ −4,50 ; 2,10 ; 9,40)
  pièges : m_gersh_radius_diag

A = [[3,1,0],[-1,-6,-2],[0,1,9]]. Donne les disques de Gershgorin (par lignes).
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = 3, rayon R₁.)
    = |1| + |□|   (trous : |1| + |0|)   ← Ligne 1, sans la diagonale
    = □   (trous : 1)   ← D(3 ; 1)
  — Le disque 2 : centre a₂₂ = −6, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |−□|   (trous : |−1| + |−2|)   ← Ligne 2, sans la diagonale
    = □   (trous : 3)   ← D(−6 ; 3)
  — Le disque 3 : centre a₃₃ = 9, rayon R₃.  [juge value]  départ : R_3
    = |0| + |□|   (trous : |0| + |1|)   ← Ligne 3, sans la diagonale
    = □   (trous : 1)   ← D(9 ; 1)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(3 ; 1), D(−6 ; 3), D(9 ; 1) (valeurs propres ≈ −5,75 ; 2,88 ; 8,87)
  pièges : m_gersh_radius_diag

A = [[3,1,1],[1,-2,1],[1,1,9]]. Donne les disques de Gershgorin (par lignes).
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = 3, rayon R₁.)
    = |□| + |1|   (trous : |1| + |1|)   ← Ligne 1, sans la diagonale
    = □   (trous : 2)   ← D(3 ; 2)
  — Le disque 2 : centre a₂₂ = −2, rayon R₂.  [juge value]  départ : R_2
    = |□| + |1|   (trous : |1| + |1|)   ← Ligne 2, sans la diagonale
    = □   (trous : 2)   ← D(−2 ; 2)
  — Le disque 3 : centre a₃₃ = 9, rayon R₃.  [juge value]  départ : R_3
    = |□| + |1|   (trous : |1| + |1|)   ← Ligne 3, sans la diagonale
    = □   (trous : 2)   ← D(9 ; 2)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |1|+|□| | D(3 ; 2), D(−2 ; 2), D(9 ; 2) (valeurs propres ≈ −2,25 ; 2,97 ; 9,28)
  pièges : m_gersh_radius_diag

```

### Niveau 2

```
A = [[5,1,2],[1,9,-1],[-1,0,-6]]. Trouve des disques de Gershgorin disjoints.
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = 5, rayon R₁.)
    ? Par lignes, les disques sont D(5 ; 3), D(9 ; 2), D(−6 ; 1) : ils se chevauchent. Que fais-tu ? ✔ Recommencer par colonnes (A et Aᵀ ont les mêmes valeurs propres) / ✔ Garder les lignes / · Agrandir les rayons avec la diagonale
    = |□| + |−1|   (trous : |1| + |−1|)   ← Colonne 1, sans la diagonale
    = □   (trous : 2)   ← D(5 ; 2)
  — Le disque 2 : centre a₂₂ = 9, rayon R₂.  [juge value]  départ : R_2
    = |1| + |□|   (trous : |1| + |0|)   ← Colonne 2, sans la diagonale
    = □   (trous : 1)   ← D(9 ; 1)
  — Le disque 3 : centre a₃₃ = −6, rayon R₃.  [juge value]  départ : R_3
    = |2| + |−□|   (trous : |2| + |−1|)   ← Colonne 3, sans la diagonale
    = □   (trous : 3)   ← D(−6 ; 3)
  aides : Les disques par colonnes ont pour rayon la somme des |aᵢⱼ| de la colonne, sans la diagonale. | R₁ (colonne 1) = |1|+|□| | D(5 ; 2), D(9 ; 1), D(−6 ; 3)
  pièges : m_gersh_radius_diag

A = [[-3,1,0],[-2,3,-1],[1,-1,8]]. Trouve des disques de Gershgorin disjoints.
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = −3, rayon R₁.)
    ? Par lignes, les disques sont D(−3 ; 1), D(3 ; 3), D(8 ; 2) : ils se chevauchent. Que fais-tu ? ✔ Recommencer par colonnes (A et Aᵀ ont les mêmes valeurs propres) / ✔ Garder les lignes / · Agrandir les rayons avec la diagonale
    = |−2| + |□|   (trous : |−2| + |1|)   ← Colonne 1, sans la diagonale
    = □   (trous : 3)   ← D(−3 ; 3)
  — Le disque 2 : centre a₂₂ = 3, rayon R₂.  [juge value]  départ : R_2
    = |□| + |−1|   (trous : |1| + |−1|)   ← Colonne 2, sans la diagonale
    = □   (trous : 2)   ← D(3 ; 2)
  — Le disque 3 : centre a₃₃ = 8, rayon R₃.  [juge value]  départ : R_3
    = |0| + |−□|   (trous : |0| + |−1|)   ← Colonne 3, sans la diagonale
    = □   (trous : 1)   ← D(8 ; 1)
  aides : Les disques par colonnes ont pour rayon la somme des |aᵢⱼ| de la colonne, sans la diagonale. | R₁ (colonne 1) = |-2|+|□| | D(−3 ; 3), D(3 ; 2), D(8 ; 1)
  pièges : m_gersh_radius_diag

A = [[3,1,0],[0,-3,-2],[2,2,8]]. Trouve des disques de Gershgorin disjoints.
  [guided]  R_1
    (Le disque 1 : centre a₁₁ = 3, rayon R₁.)
    ? Par lignes, les disques sont D(3 ; 1), D(−3 ; 2), D(8 ; 4) : ils se chevauchent. Que fais-tu ? ✔ Recommencer par colonnes (A et Aᵀ ont les mêmes valeurs propres) / ✔ Garder les lignes / · Agrandir les rayons avec la diagonale
    = |0| + |□|   (trous : |0| + |2|)   ← Colonne 1, sans la diagonale
    = □   (trous : 2)   ← D(3 ; 2)
  — Le disque 2 : centre a₂₂ = −3, rayon R₂.  [juge value]  départ : R_2
    = |1| + |□|   (trous : |1| + |2|)   ← Colonne 2, sans la diagonale
    = □   (trous : 3)   ← D(−3 ; 3)
  — Le disque 3 : centre a₃₃ = 8, rayon R₃.  [juge value]  départ : R_3
    = |0| + |−□|   (trous : |0| + |−2|)   ← Colonne 3, sans la diagonale
    = □   (trous : 2)   ← D(8 ; 2)
  aides : Les disques par colonnes ont pour rayon la somme des |aᵢⱼ| de la colonne, sans la diagonale. | R₁ (colonne 1) = |0|+|□| | D(3 ; 2), D(−3 ; 3), D(8 ; 2)
  pièges : m_gersh_radius_diag

```

### Niveau 3

```
A = [[-5,-1,1],[-1,9,-2],[1,-2,2]]. Donne les disques de Gershgorin (par lignes), puis conclus. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  R_1
    (Le disque 1 : centre a₁₁ = −5, rayon R₁.)
    = |−1| + |1|   ← Ligne 1, sans la diagonale
    = 2   ← D(−5 ; 2)
  — Le disque 2 : centre a₂₂ = 9, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |−2|   ← Ligne 2, sans la diagonale
    = 3   ← D(9 ; 3)
  — Le disque 3 : centre a₃₃ = 2, rayon R₃.  [juge value]  départ : R_3
    = |1| + |−2|   ← Ligne 3, sans la diagonale
    ? Avec tes disques, que peut-on dire de A ? · A est inversible : 0 n'est dans aucun disque / ✔ On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 3   ← D(2 ; 3)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(−5 ; 2), D(9 ; 3), D(2 ; 3) (valeurs propres ≈ −5,18 ; 1,54 ; 9,63)
  pièges : m_gersh_radius_diag

A = [[-4,-1,-2],[-1,3,1],[0,1,7]]. Donne les disques de Gershgorin (par lignes), puis conclus. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  R_1
    (Le disque 1 : centre a₁₁ = −4, rayon R₁.)
    = |−1| + |−2|   ← Ligne 1, sans la diagonale
    = 3   ← D(−4 ; 3)
  — Le disque 2 : centre a₂₂ = 3, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |1|   ← Ligne 2, sans la diagonale
    = 2   ← D(3 ; 2)
  — Le disque 3 : centre a₃₃ = 7, rayon R₃.  [juge value]  départ : R_3
    = |0| + |1|   ← Ligne 3, sans la diagonale
    ? Avec tes disques, que peut-on dire de A ? ✔ A est inversible : 0 n'est dans aucun disque / · On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 1   ← D(7 ; 1)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(−4 ; 3), D(3 ; 2), D(7 ; 1) (valeurs propres ≈ −4,12 ; 2,84 ; 7,28)
  pièges : m_gersh_radius_diag

A = [[8,1,-1],[-1,-6,2],[0,2,3]]. Donne les disques de Gershgorin (par lignes), puis conclus. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  R_1
    (Le disque 1 : centre a₁₁ = 8, rayon R₁.)
    = |1| + |−1|   ← Ligne 1, sans la diagonale
    = 2   ← D(8 ; 2)
  — Le disque 2 : centre a₂₂ = −6, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |2|   ← Ligne 2, sans la diagonale
    = 3   ← D(−6 ; 3)
  — Le disque 3 : centre a₃₃ = 3, rayon R₃.  [juge value]  départ : R_3
    = |0| + |2|   ← Ligne 3, sans la diagonale
    ? Avec tes disques, que peut-on dire de A ? ✔ A est inversible : 0 n'est dans aucun disque / · On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 2   ← D(3 ; 2)
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(8 ; 2), D(−6 ; 3), D(3 ; 2) (valeurs propres ≈ −6,34 ; 3,39 ; 7,95)
  pièges : m_gersh_radius_diag

```

### Niveau 4

```
A = [[9,-1,-1],[-1,4,-1],[-1,-1,-6]]. Donne les rayons des disques de Gershgorin (lignes), puis un encadrement des valeurs propres.
  [free, suivre l'erreur]  R_1
    (Le disque 1 : centre a₁₁ = 9, rayon R₁.)
    = |−1| + |−1|   ← Ligne 1, sans la diagonale
    = 2   ← D(9 ; 2)
  — Le disque 2 : centre a₂₂ = 4, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |−1|   ← Ligne 2, sans la diagonale
    = 2   ← D(4 ; 2)
  — Le disque 3 : centre a₃₃ = −6, rayon R₃.  [juge value]  départ : R_3
    = |−1| + |−1|   ← Ligne 3, sans la diagonale
    = 2   ← D(−6 ; 2)
  — A est symétrique : ses valeurs propres sont réelles. Une borne inférieure de la plus petite.  [juge value]  départ : m
    = −8   ← Le bord gauche du disque le plus à gauche
  — Une borne supérieure de la plus grande.  [juge value]  départ : M
    = 11   ← Le bord droit du disque le plus à droite
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(9 ; 2), D(4 ; 2), D(−6 ; 2) (valeurs propres ≈ −6,18 ; 3,94 ; 9,23)
  pièges : m_gersh_radius_diag

A = [[-6,0,-1],[0,2,-1],[-1,-1,-2]]. Donne les rayons des disques de Gershgorin (lignes), puis un encadrement des valeurs propres.
  [free, suivre l'erreur]  R_1
    (Le disque 1 : centre a₁₁ = −6, rayon R₁.)
    = |0| + |−1|   ← Ligne 1, sans la diagonale
    = 1   ← D(−6 ; 1)
  — Le disque 2 : centre a₂₂ = 2, rayon R₂.  [juge value]  départ : R_2
    = |0| + |−1|   ← Ligne 2, sans la diagonale
    = 1   ← D(2 ; 1)
  — Le disque 3 : centre a₃₃ = −2, rayon R₃.  [juge value]  départ : R_3
    = |−1| + |−1|   ← Ligne 3, sans la diagonale
    = 2   ← D(−2 ; 2)
  — A est symétrique : ses valeurs propres sont réelles. Une borne inférieure de la plus petite.  [juge value]  départ : m
    = −7   ← Le bord gauche du disque le plus à gauche
  — Une borne supérieure de la plus grande.  [juge value]  départ : M
    = 3   ← Le bord droit du disque le plus à droite
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |0|+|□| | D(−6 ; 1), D(2 ; 1), D(−2 ; 2) (valeurs propres ≈ −6,24 ; −2,00 ; 2,24)
  pièges : m_gersh_radius_diag

A = [[8,-1,0],[-1,-4,1],[0,1,4]]. Donne les rayons des disques de Gershgorin (lignes), puis un encadrement des valeurs propres.
  [free, suivre l'erreur]  R_1
    (Le disque 1 : centre a₁₁ = 8, rayon R₁.)
    = |−1| + |0|   ← Ligne 1, sans la diagonale
    = 1   ← D(8 ; 1)
  — Le disque 2 : centre a₂₂ = −4, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |1|   ← Ligne 2, sans la diagonale
    = 2   ← D(−4 ; 2)
  — Le disque 3 : centre a₃₃ = 4, rayon R₃.  [juge value]  départ : R_3
    = |0| + |1|   ← Ligne 3, sans la diagonale
    = 1   ← D(4 ; 1)
  — A est symétrique : ses valeurs propres sont réelles. Une borne inférieure de la plus petite.  [juge value]  départ : m
    = −6   ← Le bord gauche du disque le plus à gauche
  — Une borne supérieure de la plus grande.  [juge value]  départ : M
    = 9   ← Le bord droit du disque le plus à droite
  aides : Centre : aᵢᵢ ; rayon : la somme des |aᵢⱼ| de la ligne, sans la diagonale. | R₂ = |-1|+|□| | D(8 ; 1), D(−4 ; 2), D(4 ; 1) (valeurs propres ≈ −4,20 ; 4,12 ; 8,08)
  pièges : m_gersh_radius_diag

```

### Niveau 5

```
A = [[2,0,-1],[0,5,-1],[-1,-1,6]]. Donne les rayons de Gershgorin (lignes) et la plus petite marge minᵢ(|aᵢᵢ| − Rᵢ). A est-elle inversible ?
  [free, sans aide]  R_1
    (Le disque 1 : centre a₁₁ = 2, rayon R₁.)
    = |0| + |−1|   ← Ligne 1, sans la diagonale
    = 1   ← D(2 ; 1)
  — Le disque 2 : centre a₂₂ = 5, rayon R₂.  [juge value]  départ : R_2
    = |0| + |−1|   ← Ligne 2, sans la diagonale
    = 1   ← D(5 ; 1)
  — Le disque 3 : centre a₃₃ = 6, rayon R₃.  [juge value]  départ : R_3
    = |−1| + |−1|   ← Ligne 3, sans la diagonale
    = 2   ← D(6 ; 2)
  — La plus petite marge minᵢ(|aᵢᵢ| − Rᵢ) : toute valeur propre vérifie |λ| ≥ cette marge.  [juge value]  départ : m
    ? A est-elle à diagonale strictement dominante ? ✔ Oui : |aᵢᵢ| > Rᵢ pour chaque ligne / · Non
    ? Disques D(2 ; 1), D(5 ; 1), D(6 ; 2). Que peut-on dire de A ? ✔ A est inversible : 0 n'est dans aucun disque / · On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 1   ← Donc 0 n'est pas valeur propre : A est inversible (et Jacobi converge, voir module N)
  pièges : m_gersh_radius_diag

A = [[6,-1,1],[1,-6,1],[2,2,8]]. Donne les rayons de Gershgorin (lignes) et la plus petite marge minᵢ(|aᵢᵢ| − Rᵢ). A est-elle inversible ?
  [free, sans aide]  R_1
    (Le disque 1 : centre a₁₁ = 6, rayon R₁.)
    = |−1| + |1|   ← Ligne 1, sans la diagonale
    = 2   ← D(6 ; 2)
  — Le disque 2 : centre a₂₂ = −6, rayon R₂.  [juge value]  départ : R_2
    = |1| + |1|   ← Ligne 2, sans la diagonale
    = 2   ← D(−6 ; 2)
  — Le disque 3 : centre a₃₃ = 8, rayon R₃.  [juge value]  départ : R_3
    = |2| + |2|   ← Ligne 3, sans la diagonale
    = 4   ← D(8 ; 4)
  — La plus petite marge minᵢ(|aᵢᵢ| − Rᵢ) : toute valeur propre vérifie |λ| ≥ cette marge.  [juge value]  départ : m
    ? A est-elle à diagonale strictement dominante ? ✔ Oui : |aᵢᵢ| > Rᵢ pour chaque ligne / · Non
    ? Disques D(6 ; 2), D(−6 ; 2), D(8 ; 4). Que peut-on dire de A ? ✔ A est inversible : 0 n'est dans aucun disque / · On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 4   ← Donc 0 n'est pas valeur propre : A est inversible (et Jacobi converge, voir module N)
  pièges : m_gersh_radius_diag

A = [[-6,-1,-1],[-1,5,0],[-1,0,3]]. Donne les rayons de Gershgorin (lignes) et la plus petite marge minᵢ(|aᵢᵢ| − Rᵢ). A est-elle inversible ?
  [free, sans aide]  R_1
    (Le disque 1 : centre a₁₁ = −6, rayon R₁.)
    = |−1| + |−1|   ← Ligne 1, sans la diagonale
    = 2   ← D(−6 ; 2)
  — Le disque 2 : centre a₂₂ = 5, rayon R₂.  [juge value]  départ : R_2
    = |−1| + |0|   ← Ligne 2, sans la diagonale
    = 1   ← D(5 ; 1)
  — Le disque 3 : centre a₃₃ = 3, rayon R₃.  [juge value]  départ : R_3
    = |−1| + |0|   ← Ligne 3, sans la diagonale
    = 1   ← D(3 ; 1)
  — La plus petite marge minᵢ(|aᵢᵢ| − Rᵢ) : toute valeur propre vérifie |λ| ≥ cette marge.  [juge value]  départ : m
    ? A est-elle à diagonale strictement dominante ? ✔ Oui : |aᵢᵢ| > Rᵢ pour chaque ligne / · Non
    ? Disques D(−6 ; 2), D(5 ; 1), D(3 ; 1). Que peut-on dire de A ? ✔ A est inversible : 0 n'est dans aucun disque / · On ne peut pas conclure : 0 est dans un disque / · A n'est pas inversible
    = 2   ← Donc 0 n'est pas valeur propre : A est inversible (et Jacobi converge, voir module N)
  pièges : m_gersh_radius_diag

```

### Variantes d'examen

```
A = [[8,1,-1],[1,3,-1],[-1,-1,-2]]. Quel est le disque de Gershgorin de la ligne 1 ?
  ✔ D(8 ; 2)   · D(8 ; 10) [m_gersh_radius_diag]   · D(0 ; 2)   · D(8 ; 0)
  [examen mcq]
  pièges : m_gersh_radius_diag

Vrai ou faux ?
  « Chaque disque de Gershgorin contient au moins une valeur propre. » → FAUX
    contre-exemple (mx) : A = [[0,1],[4,0]]
  [examen tf]

```

## Systèmes x′ = Ax : modes propres et stabilité (`m-ode-modes`, BA4)

_Un mode e^{λt}v par valeur propre ; stable si toutes les Re λ < 0._

### Niveau 1

```
ẋ = Ax avec A = [[-1,2],[-4,5]] et x(0) = (-3 ; -5). Trouve les modes propres, la solution x(t), et dis si le système est stable. Les valeurs propres de A sont 3 et 1.
  [guided]  v_1
    (Un vecteur propre pour λ = 3.)
    = (1 ; 2)   (cases à remplir : (1,1))   ← Noyau de A − 3I
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_2
    = (1 ; 1)   (cases à remplir : (2,1))   ← Noyau de A − I
  — Les coefficients c : Pc = x(0), avec P = [v₁ v₂].  [juge mat]  départ : c
    = (-2 ; -1)   (cases à remplir : (2,1))   ← c₁v₁ + c₂v₂ = (−3 ; −5)
  — La solution x(t).  [juge odevec]  départ : x(t)
    = x(t) = -2e^(3t)(1 ; 2)-e^(t)(1 ; 1)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
  — La stabilité.  [juge value]  départ : α
    (Le système ẋ = Ax est-il stable ? Instable : une Re λ > 0.)
    = 3   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(3t)(1 ; □) + c₂e^(t)(1 ; □) | x(t) = (-2e^(3t)-e^t ; -4e^(3t)-e^t)
  pièges : l_eigvec_row

ẋ = Ax avec A = [[1,-4],[2,-5]] et x(0) = (-4 ; -3). Trouve les modes propres, la solution x(t), et dis si le système est stable. Les valeurs propres de A sont −1 et −3.
  [guided]  v_1
    (Un vecteur propre pour λ = −1.)
    = (2 ; 1)   (cases à remplir : (1,1))   ← Noyau de A + I
  — Un vecteur propre pour λ = −3.  [juge eigvec]  départ : v_2
    = (1 ; 1)   (cases à remplir : (2,1))   ← Noyau de A + 3I
  — Les coefficients c : Pc = x(0), avec P = [v₁ v₂].  [juge mat]  départ : c
    = (-1 ; -2)   (cases à remplir : (2,1))   ← c₁v₁ + c₂v₂ = (−4 ; −3)
  — La solution x(t).  [juge odevec]  départ : x(t)
    = x(t) = -e^(-t)(2 ; 1)-2e^(-3t)(1 ; 1)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
  — La stabilité.  [juge value]  départ : α
    (Le système ẋ = Ax est-il stable ? Stable : toutes les Re λ < 0.)
    = −1   ← La plus grande partie réelle : stable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(−t)(2 ; □) + c₂e^(−3t)(1 ; □) | x(t) = (-2e^-t-2e^(-3t) ; -e^-t-2e^(-3t))
  pièges : l_eigvec_row

ẋ = Ax avec A = [[-4,2],[-1,-1]] et x(0) = (1 ; 2). Trouve les modes propres, la solution x(t), et dis si le système est stable. Les valeurs propres de A sont −2 et −3.
  [guided]  v_1
    (Un vecteur propre pour λ = −2.)
    = (1 ; 1)   (cases à remplir : (2,1))   ← Noyau de A + 2I
  — Un vecteur propre pour λ = −3.  [juge eigvec]  départ : v_2
    = (2 ; 1)   (cases à remplir : (1,1))   ← Noyau de A + 3I
  — Les coefficients c : Pc = x(0), avec P = [v₁ v₂].  [juge mat]  départ : c
    = (3 ; -1)   (cases à remplir : (2,1))   ← c₁v₁ + c₂v₂ = (1 ; 2)
  — La solution x(t).  [juge odevec]  départ : x(t)
    = x(t) = 3e^(-2t)(1 ; 1)-e^(-3t)(2 ; 1)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
  — La stabilité.  [juge value]  départ : α
    (Le système ẋ = Ax est-il stable ? Stable : toutes les Re λ < 0.)
    = −2   ← La plus grande partie réelle : stable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(−2t)(1 ; □) + c₂e^(−3t)(2 ; □) | x(t) = (3e^(-2t)-2e^(-3t) ; 3e^(-2t)-e^(-3t))
  pièges : l_eigvec_row

```

### Niveau 2

```
ÿ + 5ẏ + 6y = 0, avec y(0) = 1 et ẏ(0) = −5. Écris-la comme ẋ = Ax avec x = (y ; ẏ), trouve les modes propres, la solution x(t), et dis si le système est stable.
  [guided]  A
    (La matrice A de ẋ = Ax, avec x = (y ; ẏ).)
    = [[0,1],[-6,-5]]   (cases à remplir : (2,1) (2,2))   ← ÿ = −6y − 5ẏ
  — Le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = det[[-λ,1],[-6,-5-λ]]   ← λ soustrait sur la diagonale
    = (−λ)(−5 − λ) + 6   ← Diagonale moins antidiagonale
    = λ² + 5λ + 6   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ + □)   (trous : (λ + 3)(λ + 2))   ← Factoriser
  — Un vecteur propre pour λ = −2.  [juge eigvec]  départ : v_1
    = (1 ; -2)   (cases à remplir : (2,1))   ← Noyau de A + 2I
  — Un vecteur propre pour λ = −3.  [juge eigvec]  départ : v_2
    = (1 ; -3)   (cases à remplir : (1,1))   ← Noyau de A + 3I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(-2t)(1 ; -2)+c_2e^(-3t)(1 ; -3)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = −2 ; c_2 = 3   ← c₁v₁ + c₂v₂ = (1 ; −5)
    = x(t) = -2e^(-2t)(1 ; -2)+3e^(-3t)(1 ; -3)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? ✔ Stable : toutes les Re λ &lt; 0 / · Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = −2   ← La plus grande partie réelle : stable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(−2t)(1 ; □) + c₂e^(−3t)(1 ; □) | x(t) = (-2e^(-2t)+3e^(-3t) ; 4e^(-2t)-9e^(-3t))
  pièges : a2_jacobian_transposed, m_companion_sign, m_stab_discrete_in_cont

ẋ = Ax avec A = [[3,2],[-4,-3]] et x(0) = (-1 ; 4). Trouve les modes propres, la solution x(t), et dis si le système est stable.
  [guided]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[3-λ,2],[-4,-3-λ]]   ← λ soustrait sur la diagonale
    = (3 − λ)(−3 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 1   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 1)   ← Factoriser
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
    = (1 ; -1)   (cases à remplir : (1,1))   ← Noyau de A − I
  — Un vecteur propre pour λ = −1.  [juge eigvec]  départ : v_2
    = (1 ; -2)   (cases à remplir : (2,1))   ← Noyau de A + I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(t)(1 ; -1)+c_2e^(-t)(1 ; -2)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = 2 ; c_2 = −3   ← c₁v₁ + c₂v₂ = (−1 ; 4)
    = x(t) = 2e^(t)(1 ; -1)-3e^(-t)(1 ; -2)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = 1   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(t)(1 ; □) + c₂e^(−t)(1 ; □) | x(t) = (2e^t-3e^-t ; -2e^t+6e^-t)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont

ÿ − 9y = 0, avec y(0) = 0 et ẏ(0) = −6. Écris-la comme ẋ = Ax avec x = (y ; ẏ), trouve les modes propres, la solution x(t), et dis si le système est stable.
  [guided]  A
    (La matrice A de ẋ = Ax, avec x = (y ; ẏ).)
    = [[0,1],[9,0]]   (cases à remplir : (2,1) (2,2))   ← ÿ = 9y
  — Le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = det[[-λ,1],[9,-λ]]   ← λ soustrait sur la diagonale
    = λ² − 9   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ − □)   (trous : (λ + 3)(λ − 3))   ← Factoriser
  — Un vecteur propre pour λ = 3.  [juge eigvec]  départ : v_1
    = (1 ; 3)   (cases à remplir : (1,1))   ← Noyau de A − 3I
  — Un vecteur propre pour λ = −3.  [juge eigvec]  départ : v_2
    = (1 ; -3)   (cases à remplir : (1,1))   ← Noyau de A + 3I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(3t)(1 ; 3)+c_2e^(-3t)(1 ; -3)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = −1 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (0 ; −6)
    = x(t) = -e^(3t)(1 ; 3)+e^(-3t)(1 ; -3)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = 3   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(3t)(1 ; □) + c₂e^(−3t)(1 ; □) | x(t) = (-e^(3t)+e^(-3t) ; -3e^(3t)-3e^(-3t))
  pièges : a2_jacobian_transposed, m_companion_sign, m_stab_discrete_in_cont

```

### Niveau 3

```
ÿ + ẏ − 6y = 0, avec y(0) = 0 et ẏ(0) = −5. Écris-la comme ẋ = Ax avec x = (y ; ẏ), trouve les modes propres, la solution x(t), et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A
    (La matrice A de ẋ = Ax, avec x = (y ; ẏ).)
    = [[0,1],[6,-1]]   ← ÿ = 6y − ẏ
  — Le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = det[[-λ,1],[6,-1-λ]]   ← λ soustrait sur la diagonale
    = (−λ)(−1 − λ) − 6   ← Diagonale moins antidiagonale
    = λ² + λ − 6   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ − 2)   ← Factoriser
  — Un vecteur propre pour λ = 2.  [juge eigvec]  départ : v_1
    = (1 ; 2)   ← Noyau de A − 2I
  — Un vecteur propre pour λ = −3.  [juge eigvec]  départ : v_2
    = (1 ; -3)   ← Noyau de A + 3I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(2t)(1 ; 2)+c_2e^(-3t)(1 ; -3)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = −1 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (0 ; −5)
    = x(t) = -e^(2t)(1 ; 2)+e^(-3t)(1 ; -3)   ← Les constantes remplacées
  — y(t), la première composante de x(t).  [juge ode]  départ : y′′ + y′ − 6y = 0
    = y = −e^(2t) + e^(−3t)   ← La première composante
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = 2   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(2t)(1 ; □) + c₂e^(−3t)(1 ; □) | x(t) = (-e^(2t)+e^(-3t) ; -2e^(2t)-3e^(-3t))
  pièges : a2_jacobian_transposed, m_companion_sign, m_stab_discrete_in_cont

ẋ = Ax avec A = [[-5,-3],[6,4]] et x(0) = (-1 ; 0). Trouve les modes propres, la solution x(t), et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-5-λ,-3],[6,4-λ]]   ← λ soustrait sur la diagonale
    = (−5 − λ)(4 − λ) + 18   ← Diagonale moins antidiagonale
    = λ² + λ − 2   ← λ² − (tr A)λ + det A
    = (λ + 2)(λ − 1)   ← Factoriser
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
    = (1 ; -2)   ← Noyau de A − I
  — Un vecteur propre pour λ = −2.  [juge eigvec]  départ : v_2
    = (1 ; -1)   ← Noyau de A + 2I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(t)(1 ; -2)+c_2e^(-2t)(1 ; -1)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = 1 ; c_2 = −2   ← c₁v₁ + c₂v₂ = (−1 ; 0)
    = x(t) = e^(t)(1 ; -2)-2e^(-2t)(1 ; -1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = 1   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(t)(1 ; □) + c₂e^(−2t)(1 ; □) | x(t) = (e^t-2e^(-2t) ; -2e^t+2e^(-2t))
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont

ÿ − y = 0, avec y(0) = 3 et ẏ(0) = −1. Écris-la comme ẋ = Ax avec x = (y ; ẏ), trouve les modes propres, la solution x(t), et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  A
    (La matrice A de ẋ = Ax, avec x = (y ; ẏ).)
    = [[0,1],[1,0]]   ← ÿ = y
  — Le polynôme caractéristique, factorisé.  [juge det]  départ : det(A − λI)
    = det[[-λ,1],[1,-λ]]   ← λ soustrait sur la diagonale
    = λ² − 1   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 1)   ← Factoriser
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
    = (1 ; 1)   ← Noyau de A − I
  — Un vecteur propre pour λ = −1.  [juge eigvec]  départ : v_2
    = (1 ; -1)   ← Noyau de A + I
  — La solution x(t) : la solution générale, puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(t)(1 ; 1)+c_2e^(-t)(1 ; -1)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = 1 ; c_2 = 2   ← c₁v₁ + c₂v₂ = (3 ; −1)
    = x(t) = e^(t)(1 ; 1)+2e^(-t)(1 ; -1)   ← Les constantes remplacées
  — y(t), la première composante de x(t).  [juge ode]  départ : y′′ − y = 0
    = y = e^(t) + 2e^(−t)   ← La première composante
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = 1   ← La plus grande partie réelle : instable
  aides : Un mode e^{λt}v par valeur propre ; les coefficients résolvent Pc = x(0) ; stable si toutes les Re λ < 0. | x(t) = c₁e^(t)(1 ; □) + c₂e^(−t)(1 ; □) | x(t) = (e^t+2e^-t ; e^t-2e^-t)
  pièges : a2_jacobian_transposed, m_companion_sign, m_stab_discrete_in_cont

```

### Niveau 4

```
ẋ = Ax avec A = [[3,-4],[2,-1]] et x(0) = (0 ; -2). Trouve les valeurs propres, la solution réelle x(t) et dis si le système est stable.
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, développé.)
    = det[[3-λ,-4],[2,-1-λ]]   ← λ soustrait sur la diagonale
    = (3 − λ)(−1 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 2λ + 5   ← λ² − (tr A)λ + det A
  — Les valeurs propres (complexes).  [juge complex]  départ : λ² − 2λ + 5 = 0
    = λ = 1 + 2i ou λ = 1 − 2i   ← Δ &lt; 0 : deux racines conjuguées a ± ib
  — La solution réelle : modes e^{at}(cos bt, sin bt), puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(t)(cos(2t)+sin(2t) ; sin(2t))+c_2e^(t)(-sin(2t)+cos(2t) ; cos(2t))   ← Partie réelle et partie imaginaire de e^{λt}w, w vecteur propre complexe
    = c_1 = 2 ; c_2 = −2   ← En t = 0 : c₁·(1 ; 0) + c₂·(1 ; 1) = (0 ; −2)
    = x(t) = 2e^(t)(cos(2t)+sin(2t) ; sin(2t))-2e^(t)(-sin(2t)+cos(2t) ; cos(2t))   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Ni l'un ni l'autre : Re λ = 0, les solutions restent bornées / · Instable : une |λ| ≥ 1 / · Stable : Im λ ≠ 0, les oscillations s'amortissent
    = 1   ← La plus grande partie réelle : instable
  aides : λ = a ± ib : les modes réels sont e^{at}(Re w·cos bt − Im w·sin bt) et e^{at}(Re w·sin bt + Im w·cos bt), w vecteur propre de a + ib. La stabilité se lit sur a = Re λ. | λ = 1 ± 2i ; x(t) = c₁e^(t)(… cos(2t) …) + c₂e^(t)(…) | x(t) = (2e^t×(cos(2t)+sin(2t))-2e^t×(-sin(2t)+cos(2t)) ; 2e^t×sin(2t)-2e^t×cos(2t))
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_imag_part

ẋ = Ax avec A = [[-2,-2],[2,-2]] et x(0) = (1 ; 0). Trouve les valeurs propres, la solution réelle x(t) et dis si le système est stable.
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, développé.)
    = det[[-2-λ,-2],[2,-2-λ]]   ← λ soustrait sur la diagonale
    = (−2 − λ)(−2 − λ) + 4   ← Diagonale moins antidiagonale
    = λ² + 4λ + 8   ← λ² − (tr A)λ + det A
  — Les valeurs propres (complexes).  [juge complex]  départ : λ² + 4λ + 8 = 0
    = λ = −2 + 2i ou λ = −2 − 2i   ← Δ &lt; 0 : deux racines conjuguées a ± ib
  — La solution réelle : modes e^{at}(cos bt, sin bt), puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(-2t)(cos(2t) ; sin(2t))+c_2e^(-2t)(-sin(2t) ; cos(2t))   ← Partie réelle et partie imaginaire de e^{λt}w, w vecteur propre complexe
    = c_1 = 1 ; c_2 = 0   ← En t = 0 : c₁·(1 ; 0) + c₂·(0 ; 1) = (1 ; 0)
    = x(t) = e^(-2t)(cos(2t) ; sin(2t))   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? ✔ Stable : toutes les Re λ &lt; 0 / · Instable : une Re λ &gt; 0 / · Ni l'un ni l'autre : Re λ = 0, les solutions restent bornées / · Instable : une |λ| ≥ 1 / · Stable : Im λ ≠ 0, les oscillations s'amortissent
    = −2   ← La plus grande partie réelle : stable
  aides : λ = a ± ib : les modes réels sont e^{at}(Re w·cos bt − Im w·sin bt) et e^{at}(Re w·sin bt + Im w·cos bt), w vecteur propre de a + ib. La stabilité se lit sur a = Re λ. | λ = −2 ± 2i ; x(t) = c₁e^(−2t)(… cos(2t) …) + c₂e^(−2t)(…) | x(t) = (e^(-2t)×cos(2t) ; e^(-2t)×sin(2t))
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_imag_part

ẋ = Ax avec A = [[1,-2],[1,-1]] et x(0) = (2 ; 0). Trouve les valeurs propres, la solution réelle x(t) et dis si le système est stable.
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, développé.)
    = det[[1-λ,-2],[1,-1-λ]]   ← λ soustrait sur la diagonale
    = (1 − λ)(−1 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² + 1   ← λ² − (tr A)λ + det A
  — Les valeurs propres (complexes).  [juge complex]  départ : λ² + 1 = 0
    = λ = i ou λ = −i   ← Δ &lt; 0 : deux racines conjuguées a ± ib
  — La solution réelle : modes e^{at}(cos bt, sin bt), puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1(cos(t)+sin(t) ; sin(t))+c_2(-sin(t)+cos(t) ; cos(t))   ← Partie réelle et partie imaginaire de e^{λt}w, w vecteur propre complexe
    = c_1 = 2 ; c_2 = 0   ← En t = 0 : c₁·(1 ; 0) + c₂·(1 ; 1) = (2 ; 0)
    = x(t) = 2·(cos(t)+sin(t) ; sin(t))   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / · Instable : une Re λ &gt; 0 / ✔ Ni l'un ni l'autre : Re λ = 0, les solutions restent bornées / · Instable : une |λ| ≥ 1 / · Stable : Im λ ≠ 0, les oscillations s'amortissent
    = 0   ← La plus grande partie réelle : bornée
  aides : λ = a ± ib : les modes réels sont e^{at}(Re w·cos bt − Im w·sin bt) et e^{at}(Re w·sin bt + Im w·cos bt), w vecteur propre de a + ib. La stabilité se lit sur a = Re λ. | λ = 0 ± i ; x(t) = c₁(… cos(t) …) + c₂(…) | x(t) = (2cos(t)+2sin(t) ; 2sin(t))
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_imag_part

```

### Niveau 5

```
ẋ = Ax avec A = [[0,-1],[2,2]] et x(0) = (-1 ; 3). Trouve les valeurs propres, la solution réelle x(t) et dis si le système est stable.
  [free, sans aide]  det(A − λI)
    (Le polynôme caractéristique, développé.)
    = det[[-λ,-1],[2,2-λ]]   ← λ soustrait sur la diagonale
    = (−λ)(2 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 2λ + 2   ← λ² − (tr A)λ + det A
  — Les valeurs propres (complexes).  [juge complex]  départ : λ² − 2λ + 2 = 0
    = λ = 1 + i ou λ = 1 − i   ← Δ &lt; 0 : deux racines conjuguées a ± ib
  — La solution réelle : modes e^{at}(cos bt, sin bt), puis les constantes avec x(0).  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(t)(cos(t) ; -cos(t)+sin(t))+c_2e^(t)(-sin(t) ; sin(t)+cos(t))   ← Partie réelle et partie imaginaire de e^{λt}w, w vecteur propre complexe
    = c_1 = −1 ; c_2 = 2   ← En t = 0 : c₁·(1 ; −1) + c₂·(0 ; 1) = (−1 ; 3)
    = x(t) = -e^(t)(cos(t) ; -cos(t)+sin(t))+2e^(t)(-sin(t) ; sin(t)+cos(t))   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Ni l'un ni l'autre : Re λ = 0, les solutions restent bornées / · Instable : une |λ| ≥ 1 / · Stable : Im λ ≠ 0, les oscillations s'amortissent
    = 1   ← La plus grande partie réelle : instable
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_imag_part

ÿ + cẏ + 4y = 0, c réel. Écris le système ẋ = Ax (x = (y ; ẏ)), son polynôme caractéristique, dis pour quels c il est stable et pour quels c il oscille, puis résous-le pour c = 5.
  [free, sans aide]  A
    (La matrice compagne (x = (y ; ẏ)).)
    = [[0,1],[-4,-c]]   ← ÿ = −4y − cẏ
  — Le polynôme caractéristique.  [juge det]  départ : det(A − λI)
    = λ² + cλ + 4   ← Somme des racines −c, produit 4
  — Stabilité, puis les valeurs de c pour lesquelles les valeurs propres ne sont pas réelles (oscillations) : Δ = c² − 16 < 0.  [juge solset]  départ : c² − 16 < 0
    ? Pour quelles valeurs de c le système est-il stable ? ✔ c &gt; 0 / · c &gt; 4 / · c &lt; 0 / · |λ| &lt; 1 : jamais, le produit des racines vaut 4
    = ]−4 ; 4[   ← Oscillations amorties si 0 < c < 4
  — La solution pour c = 5, avec y(0) = 2 et ẏ(0) = −5.  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(-t)(1 ; -1)+c_2e^(-4t)(1 ; -4)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = 1 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (2 ; −5)
    = x(t) = e^(-t)(1 ; -1)+e^(-4t)(1 ; -4)   ← Les constantes remplacées
  pièges : a2_jacobian_transposed, m_stab_discrete_in_cont

ÿ + cẏ + 4y = 0, c réel. Écris le système ẋ = Ax (x = (y ; ẏ)), son polynôme caractéristique, dis pour quels c il est stable et pour quels c il oscille, puis résous-le pour c = 5.
  [free, sans aide]  A
    (La matrice compagne (x = (y ; ẏ)).)
    = [[0,1],[-4,-c]]   ← ÿ = −4y − cẏ
  — Le polynôme caractéristique.  [juge det]  départ : det(A − λI)
    = λ² + cλ + 4   ← Somme des racines −c, produit 4
  — Stabilité, puis les valeurs de c pour lesquelles les valeurs propres ne sont pas réelles (oscillations) : Δ = c² − 16 < 0.  [juge solset]  départ : c² − 16 < 0
    ? Pour quelles valeurs de c le système est-il stable ? ✔ c &gt; 0 / · c &gt; 4 / · c &lt; 0 / · |λ| &lt; 1 : jamais, le produit des racines vaut 4
    = ]−4 ; 4[   ← Oscillations amorties si 0 < c < 4
  — La solution pour c = 5, avec y(0) = 1 et ẏ(0) = 2.  [juge odevec]  départ : x(t)
    = x(t) = c_1e^(-t)(1 ; -1)+c_2e^(-4t)(1 ; -4)   ← Un mode cᵢe^{λᵢt}vᵢ par valeur propre
    = c_1 = 2 ; c_2 = −1   ← c₁v₁ + c₂v₂ = (1 ; 2)
    = x(t) = 2e^(-t)(1 ; -1)-e^(-4t)(1 ; -4)   ← Les constantes remplacées
  pièges : a2_jacobian_transposed, m_stab_discrete_in_cont

```

### Variantes d'examen

```
Le système ẋ = Ax, avec A = [[-4,-5],[1,0]], est :
  · Instable : une Re λ > 0   · Instable : une |λ| ≥ 1 [m_stab_discrete_in_cont]   ✔ Stable : toutes les Re λ < 0   · Stable : Im λ ≠ 0, les oscillations s'amortissent [m_stab_imag_part]
  [examen mcq]
  pièges : m_stab_discrete_in_cont, m_stab_imag_part

Vrai ou faux ?
  « Pour A réelle 2 × 2, ẋ = Ax est stable si et seulement si tr A < 0 et det A > 0. » → VRAI
  [examen tf]

```

## Exponentielle de matrice, y compris pour une valeur propre double (`m-expm`, BA4)

_P·diag(e^{λt})·P⁻¹, ou e^{λt}(I + tN) pour une valeur double._

### Niveau 1

```
A = [[5,-3],[6,-4]] = PDP⁻¹ avec P = [[1,1],[1,2]] (vecteurs propres en colonnes) et P⁻¹ = [[2,-1],[-1,1]]. Trouve D, puis e^{Dt}, puis e^{At}.
  [guided]  D
    (D = P⁻¹AP : les valeurs propres, dans l’ordre des colonnes de P.)
    = [[2,0],[0,-1]]   (cases à remplir : (1,1) (2,2))   ← λ₁ = 2 et λ₂ = −1
  — e^{Dt} pour D diagonale : l'exponentielle de chaque valeur propre.  [juge mat]  départ : e^(Dt)
    = [[e^(2t),0],[0,e^(-t)]]   (cases à remplir : (2,2))   ← D est diagonale : e^{Dt} = diag(e^{λ₁t}, e^{λ₂t})
  — e^{At} = P·e^{Dt}·P⁻¹.  [juge odevec]  départ : e^(At)
    = e^(At) = P·[[e^(2t),0],[0,e^(-t)]]·P^(-1)   ← A = PDP⁻¹
    = [[2e^(2t)-e^(-t),-e^(2t)+e^(-t)],[2e^(2t)-2e^(-t),-e^(2t)+2e^(-t)]]   ← Le produit
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(2t), □)·P⁻¹ | [[2e^(2t)-e^(-t),-e^(2t)+e^(-t)],[2e^(2t)-2e^(-t),-e^(2t)+2e^(-t)]]
  pièges : a2_jacobian_transposed

A = [[-5,-4],[2,1]] = PDP⁻¹ avec P = [[1,2],[-1,-1]] (vecteurs propres en colonnes) et P⁻¹ = [[-1,-2],[1,1]]. Trouve D, puis e^{Dt}, puis e^{At}.
  [guided]  D
    (D = P⁻¹AP : les valeurs propres, dans l’ordre des colonnes de P.)
    = [[-1,0],[0,-3]]   (cases à remplir : (1,1) (2,2))   ← λ₁ = −1 et λ₂ = −3
  — e^{Dt} pour D diagonale : l'exponentielle de chaque valeur propre.  [juge mat]  départ : e^(Dt)
    = [[e^(-t),0],[0,e^(-3t)]]   (cases à remplir : (2,2))   ← D est diagonale : e^{Dt} = diag(e^{λ₁t}, e^{λ₂t})
  — e^{At} = P·e^{Dt}·P⁻¹.  [juge odevec]  départ : e^(At)
    = e^(At) = P·[[e^(-t),0],[0,e^(-3t)]]·P^(-1)   ← A = PDP⁻¹
    = [[-e^(-t)+2e^(-3t),-2e^(-t)+2e^(-3t)],[e^(-t)-e^(-3t),2e^(-t)-e^(-3t)]]   ← Le produit
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(−t), □)·P⁻¹ | [[-e^(-t)+2e^(-3t),-2e^(-t)+2e^(-3t)],[e^(-t)-e^(-3t),2e^(-t)-e^(-3t)]]
  pièges : a2_jacobian_transposed

A = [[5,6],[-3,-4]] = PDP⁻¹ avec P = [[2,1],[-1,-1]] (vecteurs propres en colonnes) et P⁻¹ = [[1,1],[-1,-2]]. Trouve D, puis e^{Dt}, puis e^{At}.
  [guided]  D
    (D = P⁻¹AP : les valeurs propres, dans l’ordre des colonnes de P.)
    = [[2,0],[0,-1]]   (cases à remplir : (1,1) (2,2))   ← λ₁ = 2 et λ₂ = −1
  — e^{Dt} pour D diagonale : l'exponentielle de chaque valeur propre.  [juge mat]  départ : e^(Dt)
    = [[e^(2t),0],[0,e^(-t)]]   (cases à remplir : (2,2))   ← D est diagonale : e^{Dt} = diag(e^{λ₁t}, e^{λ₂t})
  — e^{At} = P·e^{Dt}·P⁻¹.  [juge odevec]  départ : e^(At)
    = e^(At) = P·[[e^(2t),0],[0,e^(-t)]]·P^(-1)   ← A = PDP⁻¹
    = [[2e^(2t)-e^(-t),2e^(2t)-2e^(-t)],[-e^(2t)+e^(-t),-e^(2t)+2e^(-t)]]   ← Le produit
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(2t), □)·P⁻¹ | [[2e^(2t)-e^(-t),2e^(2t)-2e^(-t)],[-e^(2t)+e^(-t),-e^(2t)+2e^(-t)]]
  pièges : a2_jacobian_transposed

```

### Niveau 2

```
Calcule e^{At} pour A = [[-5,4],[-2,1]].
  [guided]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[-5-λ,4],[-2,1-λ]]   ← λ soustrait sur la diagonale
    = (−5 − λ)(1 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 4λ + 3   ← λ² − (tr A)λ + det A
    = (λ + □)(λ + 1)   (trous : (λ + 3)(λ + 1))   ← Factoriser
  — Diagonalise : P (vecteurs propres en colonnes) et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment calculer e^{At} ? ✔ Diagonaliser : e^{At} = P·diag(e^{λᵢt})·P⁻¹ / · A = λI + N avec N² = 0 / · L'exponentielle de chaque case de At
    = P = [[1,2],[1,1]] ; D = diag(-1,-3)   ← Colonne k de P ↔ case k de D
  — e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = P·diag(e^(-t),e^(-3t))·P^(-1)   ← e^{Dt} = diag(e^{λᵢt})
    = [[-e^(-t)+2e^(-3t),2e^(-t)-2e^(-3t)],[-e^(-t)+e^(-3t),2e^(-t)-e^(-3t)]]   ← Le produit, avec P⁻¹ = [[−1,2],[1,−1]]
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(−t), □)·P⁻¹ | [[-e^(-t)+2e^(-3t),2e^(-t)-2e^(-3t)],[-e^(-t)+e^(-3t),2e^(-t)-e^(-3t)]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_expm_entrywise

Calcule e^{At} pour A = [[3,2],[-4,-3]].
  [guided]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[3-λ,2],[-4,-3-λ]]   ← λ soustrait sur la diagonale
    = (3 − λ)(−3 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² − 1   ← λ² − (tr A)λ + det A
    = (λ + 1)(λ − 1)   ← Factoriser
  — Diagonalise : P (vecteurs propres en colonnes) et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment calculer e^{At} ? ✔ Diagonaliser : e^{At} = P·diag(e^{λᵢt})·P⁻¹ / · A = λI + N avec N² = 0 / · L'exponentielle de chaque case de At
    = P = [[1,1],[-1,-2]] ; D = diag(1,-1)   ← Colonne k de P ↔ case k de D
  — e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = P·diag(e^(t),e^(-t))·P^(-1)   ← e^{Dt} = diag(e^{λᵢt})
    = [[2e^(t)-e^(-t),e^(t)-e^(-t)],[-2e^(t)+2e^(-t),-e^(t)+2e^(-t)]]   ← Le produit, avec P⁻¹ = [[2,1],[−1,−1]]
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(t), □)·P⁻¹ | [[2e^(t)-e^(-t),e^(t)-e^(-t)],[-2e^(t)+2e^(-t),-e^(t)+2e^(-t)]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_expm_entrywise

Calcule e^{At} pour A = [[-3,-2],[1,0]].
  [guided]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[-3-λ,-2],[1,-λ]]   ← λ soustrait sur la diagonale
    = (−3 − λ)(−λ) + 2   ← Diagonale moins antidiagonale
    = λ² + 3λ + 2   ← λ² − (tr A)λ + det A
    = (λ + □)(λ + 1)   (trous : (λ + 2)(λ + 1))   ← Factoriser
  — Diagonalise : P (vecteurs propres en colonnes) et D.  [juge factor]  départ : A = P·D·P^(−1)
    ? Comment calculer e^{At} ? ✔ Diagonaliser : e^{At} = P·diag(e^{λᵢt})·P⁻¹ / · A = λI + N avec N² = 0 / · L'exponentielle de chaque case de At
    = P = [[1,2],[-1,-1]] ; D = diag(-1,-2)   ← Colonne k de P ↔ case k de D
  — e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = P·diag(e^(-t),e^(-2t))·P^(-1)   ← e^{Dt} = diag(e^{λᵢt})
    = [[-e^(-t)+2e^(-2t),-2e^(-t)+2e^(-2t)],[e^(-t)-e^(-2t),2e^(-t)-e^(-2t)]]   ← Le produit, avec P⁻¹ = [[−1,−2],[1,1]]
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(−t), □)·P⁻¹ | [[-e^(-t)+2e^(-2t),-2e^(-t)+2e^(-2t)],[e^(-t)-e^(-2t),2e^(-t)-e^(-2t)]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_expm_entrywise

```

### Niveau 3

```
Calcule e^{At} pour A = [[-5,-4],[2,1]]. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[-5-λ,-4],[2,1-λ]]   ← λ soustrait sur la diagonale
    = (−5 − λ)(1 − λ) + 8   ← Diagonale moins antidiagonale
    = λ² + 4λ + 3   ← λ² − (tr A)λ + det A
    = (λ + 3)(λ + 1)   ← Factoriser
  — Diagonalise : P (vecteurs propres en colonnes) et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,2],[-1,-1]] ; D = diag(-1,-3)   ← Colonne k de P ↔ case k de D
  — e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = P·diag(e^(-t),e^(-3t))·P^(-1)   ← e^{Dt} = diag(e^{λᵢt})
    = [[-e^(-t)+2e^(-3t),-2e^(-t)+2e^(-3t)],[e^(-t)-e^(-3t),2e^(-t)-e^(-3t)]]   ← Le produit, avec P⁻¹ = [[−1,−2],[1,1]]
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(−t), □)·P⁻¹ | [[-e^(-t)+2e^(-3t),-2e^(-t)+2e^(-3t)],[e^(-t)-e^(-3t),2e^(-t)-e^(-3t)]]
  pièges : l_charpoly_sign, l_lambda_one_entry

Calcule e^{At} pour A = [[2,1],[-1,0]]. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[2-λ,1],[-1,-λ]]   ← λ soustrait sur la diagonale
    = (2 − λ)(−λ) + 1   ← Diagonale moins antidiagonale
    = λ² − 2λ + 1   ← λ² − (tr A)λ + det A
    = (λ − 1)²   ← Factoriser
  — λ = 1 est double : la partie nilpotente N = A − I.  [juge mat]  départ : N
    = [[1,1],[-1,-1]]   ← A − I ≠ 0 : A n'est pas diagonalisable
  — Vérifie que N² = 0.  [juge mat]  départ : N²
    = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
  — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = e^(t)(I + tN)   ← λI et N commutent
    = e^(t)·[[1+t,t],[-t,1-t]]   ← Case par case
  aides : Valeur double : A = λI + N avec N² = 0, donc e^{At} = e^{λt}(I + tN). | e^{At} = e^(t)(I + t·[[□,1],[−1,−1]]) | [[e^t×(t+1),t×e^t],[-t×e^t,e^t×(-t+1)]]
  pièges : l_charpoly_sign, l_lambda_one_entry

Calcule e^{At} pour A = [[3,-1],[2,0]]. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[3-λ,-1],[2,-λ]]   ← λ soustrait sur la diagonale
    = (3 − λ)(−λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 3λ + 2   ← λ² − (tr A)λ + det A
    = (λ − 1)(λ − 2)   ← Factoriser
  — Diagonalise : P (vecteurs propres en colonnes) et D.  [juge factor]  départ : A = P·D·P^(−1)
    = P = [[1,1],[1,2]] ; D = diag(2,1)   ← Colonne k de P ↔ case k de D
  — e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = P·diag(e^(2t),e^(t))·P^(-1)   ← e^{Dt} = diag(e^{λᵢt})
    = [[2e^(2t)-e^(t),-e^(2t)+e^(t)],[2e^(2t)-2e^(t),-e^(2t)+2e^(t)]]   ← Le produit, avec P⁻¹ = [[2,−1],[−1,1]]
  aides : Diagonalisable : e^{At} = P·diag(e^{λ₁t}, e^{λ₂t})·P⁻¹. | e^{At} = P·diag(e^(2t), □)·P⁻¹ | [[2e^(2t)-e^(t),-e^(2t)+e^(t)],[2e^(2t)-2e^(t),-e^(2t)+2e^(t)]]
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 4

```
Calcule e^{At} pour A = [[1,1],[-1,3]], puis la solution de ẋ = Ax avec x(0) = (-2 ; -1).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[1-λ,1],[-1,3-λ]]   ← λ soustrait sur la diagonale
    = (1 − λ)(3 − λ) + 1   ← Diagonale moins antidiagonale
    = λ² − 4λ + 4   ← λ² − (tr A)λ + det A
    = (λ − 2)²   ← Factoriser
  — λ = 2 est double : la partie nilpotente N = A − 2I.  [juge mat]  départ : N
    = [[-1,1],[-1,1]]   ← A − 2I ≠ 0 : A n'est pas diagonalisable
  — Vérifie que N² = 0.  [juge mat]  départ : N²
    = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
  — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = e^(2t)(I + tN)   ← λI et N commutent
    = e^(2t)·[[1-t,t],[-t,1+t]]   ← Case par case
  — x(t) = e^{At}x(0), avec x(0) = (−2 ; −1).  [juge odevec]  départ : x(t)
    = x(t) = e^(2t)·(-2+t ; -1+t)   ← e^{At} fois x(0)
  aides : Valeur double : A = λI + N avec N² = 0, donc e^{At} = e^{λt}(I + tN). | e^{At} = e^(2t)(I + t·[[□,1],[−1,1]]) | [[e^(2t)×(-t+1),t×e^(2t)],[-t×e^(2t),e^(2t)×(t+1)]]
  pièges : l_charpoly_sign, l_lambda_one_entry

Calcule e^{At} pour A = [[0,2],[-2,-4]], puis la solution de ẋ = Ax avec x(0) = (-1 ; 3).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[-λ,2],[-2,-4-λ]]   ← λ soustrait sur la diagonale
    = (−λ)(−4 − λ) + 4   ← Diagonale moins antidiagonale
    = λ² + 4λ + 4   ← λ² − (tr A)λ + det A
    = (λ + 2)²   ← Factoriser
  — λ = −2 est double : la partie nilpotente N = A + 2I.  [juge mat]  départ : N
    = [[2,2],[-2,-2]]   ← A + 2I ≠ 0 : A n'est pas diagonalisable
  — Vérifie que N² = 0.  [juge mat]  départ : N²
    = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
  — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = e^(−2t)(I + tN)   ← λI et N commutent
    = e^(-2t)·[[1+2t,2t],[-2t,1-2t]]   ← Case par case
  — x(t) = e^{At}x(0), avec x(0) = (−1 ; 3).  [juge odevec]  départ : x(t)
    = x(t) = e^(-2t)·(-1+4t ; 3-4t)   ← e^{At} fois x(0)
  aides : Valeur double : A = λI + N avec N² = 0, donc e^{At} = e^{λt}(I + tN). | e^{At} = e^(−2t)(I + t·[[□,2],[−2,−2]]) | [[e^(-2t)×(2t+1),2t×e^(-2t)],[-2t×e^(-2t),e^(-2t)×(-2t+1)]]
  pièges : l_charpoly_sign, l_lambda_one_entry

Calcule e^{At} pour A = [[-1,0],[-2,-1]], puis la solution de ẋ = Ax avec x(0) = (-2 ; -1).
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique.)
    = det[[-1-λ,0],[-2,-1-λ]]   ← λ soustrait sur la diagonale
    = (−1 − λ)(−1 − λ) − 0   ← Diagonale moins antidiagonale
    = λ² + 2λ + 1   ← λ² − (tr A)λ + det A
    = (λ + 1)²   ← Factoriser
  — λ = −1 est double : la partie nilpotente N = A + I.  [juge mat]  départ : N
    = [[0,0],[-2,0]]   ← A + I ≠ 0 : A n'est pas diagonalisable
  — Vérifie que N² = 0.  [juge mat]  départ : N²
    = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
  — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
    = e^(At) = e^(−t)(I + tN)   ← λI et N commutent
    = e^(-t)·[[1,0],[-2t,1]]   ← Case par case
  — x(t) = e^{At}x(0), avec x(0) = (−2 ; −1).  [juge odevec]  départ : x(t)
    = x(t) = e^(-t)·(-2 ; -1+4t)   ← e^{At} fois x(0)
  aides : Valeur double : A = λI + N avec N² = 0, donc e^{At} = e^{λt}(I + tN). | e^{At} = e^(−t)(I + t·[[□,0],[−2,0]]) | [[e^-t,0],[-2t×e^-t,e^-t]]
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Niveau 5

```
Exponentielle de matrice, puis un vrai/faux.
  [problème, 9 points]
  partie 1 (e^{At} et x(t) : 1 ; λ = 1 est double : la partie nilpotente N = A − I. : 1 ; Vérifie que N² = 0. : 1 ; e^{At} = e^{λt}·e^{Nt}, écrite case par case. : 3 ; x(t) = e^{At}x(0), avec x(0) = (2 ; 3). : 2)
  A = [[2,-1],[1,0]]. Calcule e^{At}, puis la solution de ẋ = Ax avec x(0) = (2 ; 3).
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique.)
      = det[[2-λ,-1],[1,-λ]]   ← λ soustrait sur la diagonale
      = (2 − λ)(−λ) + 1   ← Diagonale moins antidiagonale
      = λ² − 2λ + 1   ← λ² − (tr A)λ + det A
      = (λ − 1)²   ← Factoriser
    — λ = 1 est double : la partie nilpotente N = A − I.  [juge mat]  départ : N
      = [[1,-1],[1,-1]]   ← A − I ≠ 0 : A n'est pas diagonalisable
    — Vérifie que N² = 0.  [juge mat]  départ : N²
      = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
    — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
      = e^(At) = e^(t)(I + tN)   ← λI et N commutent
      = e^(t)·[[1+t,-t],[t,1-t]]   ← Case par case
    — x(t) = e^{At}x(0), avec x(0) = (2 ; 3).  [juge odevec]  départ : x(t)
      = x(t) = e^(t)·(2-t ; 3-t)   ← e^{At} fois x(0)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice carrée A et tout t, e^{At} est inversible. » → VRAI
  pièges : l_charpoly_sign, l_lambda_one_entry

Exponentielle de matrice, puis un vrai/faux.
  [problème, 9 points]
  partie 1 (e^{At} et x(t) : 1 ; λ = −2 est double : la partie nilpotente N = A + 2I. : 1 ; Vérifie que N² = 0. : 1 ; e^{At} = e^{λt}·e^{Nt}, écrite case par case. : 3 ; x(t) = e^{At}x(0), avec x(0) = (2 ; 1). : 2)
  A = [[-2,0],[-1,-2]]. Calcule e^{At}, puis la solution de ẋ = Ax avec x(0) = (2 ; 1).
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique.)
      = det[[-2-λ,0],[-1,-2-λ]]   ← λ soustrait sur la diagonale
      = (−2 − λ)(−2 − λ) − 0   ← Diagonale moins antidiagonale
      = λ² + 4λ + 4   ← λ² − (tr A)λ + det A
      = (λ + 2)²   ← Factoriser
    — λ = −2 est double : la partie nilpotente N = A + 2I.  [juge mat]  départ : N
      = [[0,0],[-1,0]]   ← A + 2I ≠ 0 : A n'est pas diagonalisable
    — Vérifie que N² = 0.  [juge mat]  départ : N²
      = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
    — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
      = e^(At) = e^(−2t)(I + tN)   ← λI et N commutent
      = e^(-2t)·[[1,0],[-t,1]]   ← Case par case
    — x(t) = e^{At}x(0), avec x(0) = (2 ; 1).  [juge odevec]  départ : x(t)
      = x(t) = e^(-2t)·(2 ; 1-2t)   ← e^{At} fois x(0)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Pour toute matrice carrée A, e^A est la matrice des e^{aᵢⱼ}. » → FAUX
      contre-exemple (mx) : A = [[0,0],[0,0]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_expm_entrywise

Exponentielle de matrice, puis un vrai/faux.
  [problème, 9 points]
  partie 1 (e^{At} et x(t) : 1 ; λ = −3 est double : la partie nilpotente N = A + 3I. : 1 ; Vérifie que N² = 0. : 1 ; e^{At} = e^{λt}·e^{Nt}, écrite case par case. : 3 ; x(t) = e^{At}x(0), avec x(0) = (3 ; 1). : 2)
  A = [[-3,0],[1,-3]]. Calcule e^{At}, puis la solution de ẋ = Ax avec x(0) = (3 ; 1).
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique.)
      = det[[-3-λ,0],[1,-3-λ]]   ← λ soustrait sur la diagonale
      = (−3 − λ)(−3 − λ) − 0   ← Diagonale moins antidiagonale
      = λ² + 6λ + 9   ← λ² − (tr A)λ + det A
      = (λ + 3)²   ← Factoriser
    — λ = −3 est double : la partie nilpotente N = A + 3I.  [juge mat]  départ : N
      = [[0,0],[1,0]]   ← A + 3I ≠ 0 : A n'est pas diagonalisable
    — Vérifie que N² = 0.  [juge mat]  départ : N²
      = [[0,0],[0,0]]   ← La série de e^{Nt} s'arrête : e^{Nt} = I + tN
    — e^{At} = e^{λt}·e^{Nt}, écrite case par case.  [juge odevec]  départ : e^(At)
      = e^(At) = e^(−3t)(I + tN)   ← λI et N commutent
      = e^(-3t)·[[1,0],[t,1]]   ← Case par case
    — x(t) = e^{At}x(0), avec x(0) = (3 ; 1).  [juge odevec]  départ : x(t)
      = x(t) = e^(-3t)·(3 ; 1+3t)   ← e^{At} fois x(0)
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Si AB = BA, alors e^{A+B} = e^A·e^B. » → VRAI
  pièges : l_charpoly_sign, l_lambda_one_entry

```

### Variantes d'examen

```
A = [[2,1],[-1,0]]. Que vaut e^{At} ?
  · [[e^(2t),e^(t)],[e^(-t),1]] [m_expm_entrywise]   ✔ [[e^t×(t+1),t×e^t],[-t×e^t,e^t×(-t+1)]]   · [[e^t,0],[0,e^t]] [m_expm_double_no_t]   · [[e^t×(-t+1),-t×e^t],[t×e^t,e^t×(t+1)]]
  [examen mcq]
  pièges : m_expm_entrywise, m_expm_double_no_t

A = [[0,1],[-2,3]]. Que vaut la case (1, 2) de e^{A} (t = 1) ? Écris-la exactement, avec e.
  [free, sans aide, examen coef]  m_12
    = e^(2) − e
  pièges : m_expm_entrywise

Vrai ou faux ?
  « Pour toute matrice carrée A, e^A est la matrice des e^{aᵢⱼ}. » → FAUX
    contre-exemple (mx) : A = [[0,0],[0,0]]
  [examen tf]
  pièges : m_expm_entrywise

ẋ = Ax avec A = [[0,2],[-2,4]] et x(0) = (-2 ; 1). (a) Polynôme caractéristique. (b) A est-elle diagonalisable ? (c) Partie nilpotente. (d) e^{At}. (e) x(t). (f) Stabilité, en continu et pour x_{k+1} = Ax_k.
  [problème, examen open, 10 points]
  partie 1 (Début du problème : 1 ; (b) A est-elle diagonalisable ? Le rang de A − 2I. : 1 ; (c) La partie nilpotente N = A − 2I (et N² = 0). : 1 ; (d) e^{At}, case par case. : 3 ; (e) x(t) avec x(0) = (−2 ; 1). : 2 ; (f) Stabilité de ẋ = Ax, puis de x_{k+1} = Ax_k. : 2)
    [free, sans aide, suivre l'erreur, examen open]  det(A − λI)
      ((a) Le polynôme caractéristique.)
      = det[[-λ,2],[-2,4-λ]]   ← λ soustrait sur la diagonale
      = (−λ)(4 − λ) + 4   ← Diagonale moins antidiagonale
      = λ² − 4λ + 4   ← λ² − (tr A)λ + det A
      = (λ − 2)²   ← Factoriser
    — (b) A est-elle diagonalisable ? Le rang de A − 2I.  [juge value]  départ : r
      ? A est-elle diagonalisable ? ✔ Non : dim E₂ = 2 − 1 = 1 &lt; 2 / · Oui : A est 2 × 2 et a une valeur propre
      = 1   ← Une seule ligne indépendante
    — (c) La partie nilpotente N = A − 2I (et N² = 0).  [juge mat]  départ : N
      = [[-2,2],[-2,2]]   ← A − 2I ≠ 0 : A n'est pas diagonalisable
    — (d) e^{At}, case par case.  [juge odevec]  départ : e^(At)
      = e^(At) = e^(2t)(I + tN)   ← λI et N commutent
      = e^(2t)·[[1-2t,2t],[-2t,1+2t]]   ← Case par case
    — (e) x(t) avec x(0) = (−2 ; 1).  [juge odevec]  départ : x(t)
      = x(t) = e^(2t)·(-2+6t ; 1+6t)   ← e^{At} fois x(0)
    — (f) Stabilité de ẋ = Ax, puis de x_{k+1} = Ax_k.  [juge value]  départ : λ
      ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
      ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / ✔ Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
      = 2   ← Continu : instable ; discret : instable (|λ| = 2)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_expm_double_no_t, m_stab_discrete_in_cont, m_stab_cont_in_discrete

```

## Systèmes discrets x_{k+1} = Ax_k (`m-discrete`, BA4)

_x_k = Σ cᵢλᵢᵏvᵢ ; stable si toutes les |λ| < 1._

### Niveau 1

```
x_{k+1} = Ax_k avec A = [[-1/2,-5/2],[5/4,13/4]] et x₀ = (-1 ; 0). Écris x_k et dis si le système est stable. Les valeurs propres sont 2 et 3/4, de vecteurs propres v₁ = (1 ; −1) et v₂ = (2 ; −1).
  [guided]  c
    (Décompose x₀ sur les vecteurs propres : c₁v₁ + c₂v₂ = x₀.)
    = (1 ; -1)   (cases à remplir : (1,1))   ← c₁(1 ; −1) + c₂(2 ; −1) = (−1 ; 0)
  — La solution x_k.  [juge odevec]  départ : x_k
    = x_k = (2)^k(1 ; -1)-(3/4)^k(2 ; -1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    (Le système x_{k+1} = Ax_k est-il stable ? Instable : une |λ| > 1.)
    = 2   ← Le rayon spectral : instable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(2)^k(1 ; −1) + □(3/4)^k(2 ; −1) | x_k = (2^k-2×(3/4)^k ; -2^k+(3/4)^k)

x_{k+1} = Ax_k avec A = [[9/4,5/2],[-5/4,-3/2]] et x₀ = (-1 ; 0). Écris x_k et dis si le système est stable. Les valeurs propres sont 1 et −1/4, de vecteurs propres v₁ = (2 ; −1) et v₂ = (1 ; −1).
  [guided]  c
    (Décompose x₀ sur les vecteurs propres : c₁v₁ + c₂v₂ = x₀.)
    = (-1 ; 1)   (cases à remplir : (2,1))   ← c₁(2 ; −1) + c₂(1 ; −1) = (−1 ; 0)
  — La solution x_k.  [juge odevec]  départ : x_k
    = x_k = -(2 ; -1)+(-1/4)^k(1 ; -1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    (Le système x_{k+1} = Ax_k est-il stable ? Ni l'un ni l'autre : ρ(A) = 1.)
    = 1   ← Le rayon spectral : ni stable ni instable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(2 ; −1) + □(−1/4)^k(1 ; −1) | x_k = (-2+(-1/4)^k ; 1-(-1/4)^k)

x_{k+1} = Ax_k avec A = [[1,-1/2],[1/4,1/4]] et x₀ = (-3 ; 0). Écris x_k et dis si le système est stable. Les valeurs propres sont 3/4 et 1/2, de vecteurs propres v₁ = (2 ; 1) et v₂ = (1 ; 1).
  [guided]  c
    (Décompose x₀ sur les vecteurs propres : c₁v₁ + c₂v₂ = x₀.)
    = (-3 ; 3)   (cases à remplir : (1,1))   ← c₁(2 ; 1) + c₂(1 ; 1) = (−3 ; 0)
  — La solution x_k.  [juge odevec]  départ : x_k
    = x_k = -3(3/4)^k(2 ; 1)+3(1/2)^k(1 ; 1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    (Le système x_{k+1} = Ax_k est-il stable ? Stable : toutes les |λ| < 1.)
    = 3/4   ← Le rayon spectral : stable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(3/4)^k(2 ; 1) + □(1/2)^k(1 ; 1) | x_k = (-6×(3/4)^k+3×(1/2)^k ; -3×(3/4)^k+3×(1/2)^k)

```

### Niveau 2

```
x_{k+1} = Ax_k avec A = [[-13/4,5/2],[-5/4,1/2]] et x₀ = (-2 ; 0). Écris x_k et dis si le système est stable.
  [guided]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-13/4-λ,5/2],[-5/4,1/2-λ]]   ← λ soustrait sur la diagonale
    = (−13/4 − λ)(1/2 − λ) + 25/8   ← Diagonale moins antidiagonale
    = λ² + (11/4)λ + 3/2   ← λ² − (tr A)λ + det A
    = (λ + □)(λ + 3/4)   (trous : (λ + 2)(λ + 3/4))   ← Factoriser
  — Un vecteur propre pour λ = −3/4.  [juge eigvec]  départ : v_1
    = (1 ; 1)   (cases à remplir : (2,1))   ← Noyau de A + (3/4)I
  — Un vecteur propre pour λ = −2.  [juge eigvec]  départ : v_2
    = (2 ; 1)   (cases à remplir : (2,1))   ← Noyau de A + 2I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(-3/4)^k(1 ; 1)+c_2(-2)^k(2 ; 1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = 2 ; c_2 = −2   ← c₁v₁ + c₂v₂ = (−2 ; 0)
    = x_k = 2(-3/4)^k(1 ; 1)-2(-2)^k(2 ; 1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / ✔ Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Stable : toutes les Re λ &lt; 0
    = 2   ← Le rayon spectral : instable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(−3/4)^k(1 ; 1) + □(−2)^k(2 ; 1) | x_k = (2×(-3/4)^k-4×(-2)^k ; 2×(-3/4)^k-2×(-2)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

x_{k+1} = Ax_k avec A = [[7/4,3/4],[-3/2,-1/2]] et x₀ = (-1 ; 0). Écris x_k et dis si le système est stable.
  [guided]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[7/4-λ,3/4],[-3/2,-1/2-λ]]   ← λ soustrait sur la diagonale
    = (7/4 − λ)(−1/2 − λ) + 9/8   ← Diagonale moins antidiagonale
    = λ² − (5/4)λ + 1/4   ← λ² − (tr A)λ + det A
    = (λ − 1/□)(λ − 1)   (trous : (λ − 1/4)(λ − 1))   ← Factoriser
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
    = (1 ; -1)   (cases à remplir : (1,1))   ← Noyau de A − I
  — Un vecteur propre pour λ = 1/4.  [juge eigvec]  départ : v_2
    = (1 ; -2)   (cases à remplir : (1,1))   ← Noyau de A − (1/4)I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(1 ; -1)+c_2(1/4)^k(1 ; -2)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = −2 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (−1 ; 0)
    = x_k = -2·(1 ; -1)+(1/4)^k(1 ; -2)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / ✔ Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 1   ← Le rayon spectral : ni stable ni instable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(1 ; −1) + □(1/4)^k(1 ; −2) | x_k = (-2+(1/4)^k ; 2-2×(1/4)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

x_{k+1} = Ax_k avec A = [[-2,5/2],[-5/4,7/4]] et x₀ = (-1 ; 0). Écris x_k et dis si le système est stable.
  [guided]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-2-λ,5/2],[-5/4,7/4-λ]]   ← λ soustrait sur la diagonale
    = (−2 − λ)(7/4 − λ) + 25/8   ← Diagonale moins antidiagonale
    = λ² + (1/4)λ − 3/8   ← λ² − (tr A)λ + det A
    = (λ + 3/4)(λ − 1/□)   (trous : (λ + 3/4)(λ − 1/2))   ← Factoriser
  — Un vecteur propre pour λ = 1/2.  [juge eigvec]  départ : v_1
    = (1 ; 1)   (cases à remplir : (2,1))   ← Noyau de A − (1/2)I
  — Un vecteur propre pour λ = −3/4.  [juge eigvec]  départ : v_2
    = (2 ; 1)   (cases à remplir : (2,1))   ← Noyau de A + (3/4)I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(1/2)^k(1 ; 1)+c_2(-3/4)^k(2 ; 1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = 1 ; c_2 = −1   ← c₁v₁ + c₂v₂ = (−1 ; 0)
    = x_k = (1/2)^k(1 ; 1)-(-3/4)^k(2 ; 1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 3/4   ← Le rayon spectral : stable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(1/2)^k(1 ; 1) + □(−3/4)^k(2 ; 1) | x_k = ((1/2)^k-2×(-3/4)^k ; (1/2)^k-(-3/4)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

```

### Niveau 3

```
x_{k+1} = Ax_k avec A = [[-3/2,5/4],[-5/2,9/4]] et x₀ = (0 ; 3). Écris x_k et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-3/2-λ,5/4],[-5/2,9/4-λ]]   ← λ soustrait sur la diagonale
    = (−3/2 − λ)(9/4 − λ) + 25/8   ← Diagonale moins antidiagonale
    = λ² − (3/4)λ − 1/4   ← λ² − (tr A)λ + det A
    = (λ + 1/4)(λ − 1)   ← Factoriser
  — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
    = (1 ; 2)   ← Noyau de A − I
  — Un vecteur propre pour λ = −1/4.  [juge eigvec]  départ : v_2
    = (1 ; 1)   ← Noyau de A + (1/4)I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(1 ; 2)+c_2(-1/4)^k(1 ; 1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = 3 ; c_2 = −3   ← c₁v₁ + c₂v₂ = (0 ; 3)
    = x_k = 3·(1 ; 2)-3(-1/4)^k(1 ; 1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / ✔ Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 1   ← Le rayon spectral : ni stable ni instable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(1 ; 2) + □(−1/4)^k(1 ; 1) | x_k = (3-3×(-1/4)^k ; 6-3×(-1/4)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

x_{k+1} = Ax_k avec A = [[9/4,3/2],[-3,-9/4]] et x₀ = (-2 ; 3). Écris x_k et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[9/4-λ,3/2],[-3,-9/4-λ]]   ← λ soustrait sur la diagonale
    = (9/4 − λ)(−9/4 − λ) + 9/2   ← Diagonale moins antidiagonale
    = λ² − 9/16   ← λ² − (tr A)λ + det A
    = (λ + 3/4)(λ − 3/4)   ← Factoriser
  — Un vecteur propre pour λ = 3/4.  [juge eigvec]  départ : v_1
    = (1 ; -1)   ← Noyau de A − (3/4)I
  — Un vecteur propre pour λ = −3/4.  [juge eigvec]  départ : v_2
    = (1 ; -2)   ← Noyau de A + (3/4)I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(3/4)^k(1 ; -1)+c_2(-3/4)^k(1 ; -2)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = −1 ; c_2 = −1   ← c₁v₁ + c₂v₂ = (−2 ; 3)
    = x_k = -(3/4)^k(1 ; -1)-(-3/4)^k(1 ; -2)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 3/4   ← Le rayon spectral : stable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(3/4)^k(1 ; −1) + □(−3/4)^k(1 ; −2) | x_k = (-(3/4)^k-(-3/4)^k ; (3/4)^k+2×(-3/4)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

x_{k+1} = Ax_k avec A = [[-5/4,-1/2],[1,1/4]] et x₀ = (1 ; 0). Écris x_k et dis si le système est stable. Choisis d'abord chaque action.
  [tap, suivre l'erreur, menu menu]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-5/4-λ,-1/2],[1,1/4-λ]]   ← λ soustrait sur la diagonale
    = (−5/4 − λ)(1/4 − λ) + 1/2   ← Diagonale moins antidiagonale
    = λ² + λ + 3/16   ← λ² − (tr A)λ + det A
    = (λ + 3/4)(λ + 1/4)   ← Factoriser
  — Un vecteur propre pour λ = −1/4.  [juge eigvec]  départ : v_1
    = (1 ; -2)   ← Noyau de A + (1/4)I
  — Un vecteur propre pour λ = −3/4.  [juge eigvec]  départ : v_2
    = (1 ; -1)   ← Noyau de A + (3/4)I
  — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
    = x_k = c_1(-1/4)^k(1 ; -2)+c_2(-3/4)^k(1 ; -1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
    = c_1 = −1 ; c_2 = 2   ← c₁v₁ + c₂v₂ = (1 ; 0)
    = x_k = -(-1/4)^k(1 ; -2)+2(-3/4)^k(1 ; -1)   ← Les constantes remplacées
  — La stabilité.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Stable : toutes les Re λ &lt; 0
    = 3/4   ← Le rayon spectral : stable
  aides : Chaque mode est multiplié par λ à chaque pas : x_k = c₁λ₁ᵏv₁ + c₂λ₂ᵏv₂, avec c₁v₁ + c₂v₂ = x₀. Stable si toutes les |λ| < 1. | x_k = □(−1/4)^k(1 ; −2) + □(−3/4)^k(1 ; −1) | x_k = (-(-1/4)^k+2×(-3/4)^k ; 2×(-1/4)^k-2×(-3/4)^k)
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

```

### Niveau 4

```
A = [[-5/2,1],[-2,1/2]]. Le système ẋ = Ax est-il stable ? Et x_{k+1} = Ax_k ?
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-5/2-λ,1],[-2,1/2-λ]]   ← λ soustrait sur la diagonale
    = (−5/2 − λ)(1/2 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² + 2λ + 3/4   ← λ² − (tr A)λ + det A
    = (λ + 3/2)(λ + 1/2)   ← Factoriser
  — En continu : ẋ = Ax.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? ✔ Stable : toutes les Re λ &lt; 0 / · Instable : une Re λ &gt; 0 / · Instable : une |λ| ≥ 1
    = −1/2   ← La plus grande partie réelle : stable
  — En discret : x_{k+1} = Ax_k.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / ✔ Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Stable : toutes les Re λ &lt; 0
    = 3/2   ← Le rayon spectral : instable
  aides : Continu : stable si toutes les Re λ < 0. Discret : stable si toutes les |λ| < 1. Ce ne sont pas les mêmes critères. | Valeurs propres □ et □ ; α = max Re λ, ρ = max |λ| | λ = −1/2 et −3/2 : continu stable, discret instable.
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_cont_in_discrete

A = [[3/4,1/2],[-1/4,0]]. Le système ẋ = Ax est-il stable ? Et x_{k+1} = Ax_k ?
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[3/4-λ,1/2],[-1/4,-λ]]   ← λ soustrait sur la diagonale
    = (3/4 − λ)(−λ) + 1/8   ← Diagonale moins antidiagonale
    = λ² − (3/4)λ + 1/8   ← λ² − (tr A)λ + det A
    = (λ − 1/4)(λ − 1/2)   ← Factoriser
  — En continu : ẋ = Ax.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Stable : toutes les |λ| &lt; 1
    = 1/2   ← La plus grande partie réelle : instable
  — En discret : x_{k+1} = Ax_k.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 1/2   ← Le rayon spectral : stable
  aides : Continu : stable si toutes les Re λ < 0. Discret : stable si toutes les |λ| < 1. Ce ne sont pas les mêmes critères. | Valeurs propres □ et □ ; α = max Re λ, ρ = max |λ| | λ = 1/2 et 1/4 : continu instable, discret stable.
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_cont_in_discrete

A = [[-3/2,2],[-1,3/2]]. Le système ẋ = Ax est-il stable ? Et x_{k+1} = Ax_k ?
  [free, suivre l'erreur]  det(A − λI)
    (Le polynôme caractéristique, factorisé.)
    = det[[-3/2-λ,2],[-1,3/2-λ]]   ← λ soustrait sur la diagonale
    = (−3/2 − λ)(3/2 − λ) + 2   ← Diagonale moins antidiagonale
    = λ² − 1/4   ← λ² − (tr A)λ + det A
    = (λ + 1/2)(λ − 1/2)   ← Factoriser
  — En continu : ẋ = Ax.  [juge value]  départ : α
    ? Le système ẋ = Ax est-il stable ? · Stable : toutes les Re λ &lt; 0 / ✔ Instable : une Re λ &gt; 0 / · Stable : toutes les |λ| &lt; 1
    = 1/2   ← La plus grande partie réelle : instable
  — En discret : x_{k+1} = Ax_k.  [juge value]  départ : ρ
    ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
    = 1/2   ← Le rayon spectral : stable
  aides : Continu : stable si toutes les Re λ < 0. Discret : stable si toutes les |λ| < 1. Ce ne sont pas les mêmes critères. | Valeurs propres □ et □ ; α = max Re λ, ρ = max |λ| | λ = 1/2 et −1/2 : continu instable, discret stable.
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_discrete_in_cont, m_stab_cont_in_discrete

```

### Niveau 5

```
Système discret, puis un vrai/faux.
  [problème, 8 points]
  partie 1 (x_k et stabilité : 1 ; Un vecteur propre pour λ = 1. : 1 ; Un vecteur propre pour λ = 1/4. : 1 ; La solution x_k : la solution générale, puis les constantes avec x₀. : 3 ; La stabilité. : 1)
  x_{k+1} = Ax_k avec A = [[7/4,-3/2],[3/4,-1/2]] et x₀ = (-1 ; 0). Trouve x_k et dis si le système est stable.
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique, factorisé.)
      = det[[7/4-λ,-3/2],[3/4,-1/2-λ]]   ← λ soustrait sur la diagonale
      = (7/4 − λ)(−1/2 − λ) + 9/8   ← Diagonale moins antidiagonale
      = λ² − (5/4)λ + 1/4   ← λ² − (tr A)λ + det A
      = (λ − 1/4)(λ − 1)   ← Factoriser
    — Un vecteur propre pour λ = 1.  [juge eigvec]  départ : v_1
      = (2 ; 1)   ← Noyau de A − I
    — Un vecteur propre pour λ = 1/4.  [juge eigvec]  départ : v_2
      = (1 ; 1)   ← Noyau de A − (1/4)I
    — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
      = x_k = c_1(2 ; 1)+c_2(1/4)^k(1 ; 1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
      = c_1 = −1 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (−1 ; 0)
      = x_k = -(2 ; 1)+(1/4)^k(1 ; 1)   ← Les constantes remplacées
    — La stabilité.  [juge value]  départ : ρ
      ? Le système x_{k+1} = Ax_k est-il stable ? · Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / ✔ Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
      = 1   ← Le rayon spectral : ni stable ni instable
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Si ρ(A) < 1, alors x_k = Aᵏx₀ → 0 pour tout x₀. » → VRAI
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

Système discret, puis un vrai/faux.
  [problème, 8 points]
  partie 1 (x_k et stabilité : 1 ; Un vecteur propre pour λ = 3/4. : 1 ; Un vecteur propre pour λ = −1/2. : 1 ; La solution x_k : la solution générale, puis les constantes avec x₀. : 3 ; La stabilité. : 1)
  x_{k+1} = Ax_k avec A = [[2,5/2],[-5/4,-7/4]] et x₀ = (1 ; 0). Trouve x_k et dis si le système est stable.
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique, factorisé.)
      = det[[2-λ,5/2],[-5/4,-7/4-λ]]   ← λ soustrait sur la diagonale
      = (2 − λ)(−7/4 − λ) + 25/8   ← Diagonale moins antidiagonale
      = λ² − (1/4)λ − 3/8   ← λ² − (tr A)λ + det A
      = (λ + 1/2)(λ − 3/4)   ← Factoriser
    — Un vecteur propre pour λ = 3/4.  [juge eigvec]  départ : v_1
      = (2 ; -1)   ← Noyau de A − (3/4)I
    — Un vecteur propre pour λ = −1/2.  [juge eigvec]  départ : v_2
      = (1 ; -1)   ← Noyau de A + (1/2)I
    — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
      = x_k = c_1(3/4)^k(2 ; -1)+c_2(-1/2)^k(1 ; -1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
      = c_1 = 1 ; c_2 = −1   ← c₁v₁ + c₂v₂ = (1 ; 0)
      = x_k = (3/4)^k(2 ; -1)-(-1/2)^k(1 ; -1)   ← Les constantes remplacées
    — La stabilité.  [juge value]  départ : ρ
      ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
      = 3/4   ← Le rayon spectral : stable
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Si A est diagonalisable, de valeurs propres 1 et 1/2, alors x_k converge pour tout x₀. » → VRAI
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

Système discret, puis un vrai/faux.
  [problème, 8 points]
  partie 1 (x_k et stabilité : 1 ; Un vecteur propre pour λ = 1/2. : 1 ; Un vecteur propre pour λ = −3/4. : 1 ; La solution x_k : la solution générale, puis les constantes avec x₀. : 3 ; La stabilité. : 1)
  x_{k+1} = Ax_k avec A = [[7/4,-5/2],[5/4,-2]] et x₀ = (-1 ; 0). Trouve x_k et dis si le système est stable.
    [free, sans aide, suivre l'erreur]  det(A − λI)
      (Le polynôme caractéristique, factorisé.)
      = det[[7/4-λ,-5/2],[5/4,-2-λ]]   ← λ soustrait sur la diagonale
      = (7/4 − λ)(−2 − λ) + 25/8   ← Diagonale moins antidiagonale
      = λ² + (1/4)λ − 3/8   ← λ² − (tr A)λ + det A
      = (λ + 3/4)(λ − 1/2)   ← Factoriser
    — Un vecteur propre pour λ = 1/2.  [juge eigvec]  départ : v_1
      = (2 ; 1)   ← Noyau de A − (1/2)I
    — Un vecteur propre pour λ = −3/4.  [juge eigvec]  départ : v_2
      = (1 ; 1)   ← Noyau de A + (3/4)I
    — La solution x_k : la solution générale, puis les constantes avec x₀.  [juge odevec]  départ : x_k
      = x_k = c_1(1/2)^k(2 ; 1)+c_2(-3/4)^k(1 ; 1)   ← Un mode cᵢλᵢᵏvᵢ par valeur propre
      = c_1 = −1 ; c_2 = 1   ← c₁v₁ + c₂v₂ = (−1 ; 0)
      = x_k = -(1/2)^k(2 ; 1)+(-3/4)^k(1 ; 1)   ← Les constantes remplacées
    — La stabilité.  [juge value]  départ : ρ
      ? Le système x_{k+1} = Ax_k est-il stable ? ✔ Stable : toutes les |λ| &lt; 1 / · Instable : une |λ| &gt; 1 / · Ni l'un ni l'autre : ρ(A) = 1 / · Instable : une Re λ &gt; 0
      = 3/4   ← Le rayon spectral : stable
  partie 2 (Vrai ou faux : 1)
  Vrai ou faux ?
    « Si toutes les valeurs propres de A ont Re λ < 0, le système x_{k+1} = Ax_k est stable. » → FAUX
      contre-exemple (mx) : A = [[-2,0],[0,-1/2]]
  pièges : l_charpoly_sign, l_lambda_one_entry, m_stab_cont_in_discrete

```

### Variantes d'examen

```
Le système x_{k+1} = Ax_k, avec A = [[1/4,1/4],[-1/2,1]], est :
  · Ni l'un ni l'autre : ρ(A) = 1   ✔ Stable : toutes les |λ| < 1   · Instable : une Re λ > 0 [m_stab_cont_in_discrete]   · Instable : une |λ| > 1
  [examen mcq]
  pièges : m_stab_cont_in_discrete

Vrai ou faux ?
  « Si toutes les valeurs propres de A ont Re λ < 0, le système x_{k+1} = Ax_k est stable. » → FAUX
    contre-exemple (mx) : A = [[-2,0],[0,-1/2]]
  [examen tf]
  pièges : m_stab_cont_in_discrete

```

## Pièges de cette unité

- **Complément de Schur avec les facteurs dans le mauvais ordre** (`m_schur_order`, E) : S = A₂₂ − A₁₂A₁₁⁻¹A₂₁ au lieu de 
- **Complément de Schur avec un signe +** (`m_schur_sign`, E) : S = A₂₂ + A₂₁A₁₁⁻¹A₁₂ au lieu de 
- **Symétrie de Householder écrite I − P** (`m_householder_factor`, E) : H = I − P au lieu de I − 2P
- **f(A) calculée case par case** (`m_spectral_entrywise`, E) : √A case par case au lieu de 
- **Mineurs dominants ≥ 0 pris pour « semi-définie positive »** (`m_sylvester_semidef`, E) : mineurs dominants ≥ 0 ⇒ semi-définie positive au lieu de 
- **« Définie négative » lue comme « tous les mineurs < 0 »** (`m_sylvester_negdef`, E) : définie négative ⇔ tous les mineurs < 0 au lieu de 
- **Diagonale de L sans la racine** (`m_chol_no_sqrt`, E) : ℓ₂₂ = 10 − 1 au lieu de √(10 − 1)
- **Somme ajoutée au lieu d'être retranchée** (`m_chol_sum_sign`, E) : ℓ₃₂ = (5 + (−1)·1)/3 au lieu de 
- **Facteur 2 ou ½ dans le gradient** (`m_grad_factor`, E) : ∇(½xᵀAx) = 2Ax ou ½Ax au lieu de Ax
- **∇(xᵀMx) = 2Mx pour M non symétrique** (`m_grad_nonsym`, E) : ∇(xᵀMx) = 2Mx (M non symétrique) au lieu de 
- **Var(β̂) = σ²XᵀX, sans l'inverse** (`m_var_no_inverse`, E) : Var(β̂) = σ²XᵀX au lieu de 
- **R(x) sans le dénominateur xᵀx** (`m_rayleigh_no_denominator`, E) : R(x) = xᵀAx au lieu de 
- **Vitesse |λ₁/λ₂| au lieu de |λ₂/λ₁|** (`m_power_ratio`, E) : vitesse |λ₁/λ₂| au lieu de |λ₂/λ₁|
- **Puissance inverse : μ pris pour λ** (`m_inverse_power_value`, E) : λ ≈ μ au lieu de λ = σ + 1/μ
- **Erreur de rang k : mauvais σ** (`m_rankk_wrong_sigma`, E) : ‖A − A_k‖₂ = σ_k au lieu de σ_{k+1}
- **‖·‖₁ et ‖·‖∞ échangées** (`m_norm_1_inf_swap`, E) : ‖A‖₁ = max par ligne au lieu de 
- **‖A‖₂ lue sur les valeurs propres de A** (`m_norm2_eig`, E) : ‖A‖₂ = max |λᵢ(A)| (A non symétrique) au lieu de 
- **κ₂ lu sur les valeurs propres d'une matrice non symétrique** (`m_cond_eig_nonsym`, E) : κ₂ = |λ_max/λ_min| (A non symétrique) au lieu de 
- **« det petit ⇒ mal conditionnée »** (`m_cond_det`, E) : « det petit ⇒ mal conditionnée » au lieu de 
- **Rayon de Gershgorin avec la diagonale** (`m_gersh_radius_diag`, E) : rayon = Σ |aᵢⱼ| y compris aᵢᵢ au lieu de 
- **Matrice compagne sans changer les signes** (`m_companion_sign`, E) : [[0, 1], [6, 5]] pour ÿ + 5ẏ + 6y = 0 au lieu de [[0, 1], [−6, −5]]
- **Coefficients des modes pris égaux à x(0)** (`m_modes_c_equals_x0`, E) : c = x(0) au lieu de Pc = x(0)
- **Critère |λ| < 1 appliqué à ẋ = Ax** (`m_stab_discrete_in_cont`, E) : ẋ = Ax stable car |λ| < 1 au lieu de 
- **Critère Re λ < 0 appliqué à x_{k+1} = Ax_k** (`m_stab_cont_in_discrete`, E) : x⁺ = Ax stable car Re λ < 0 au lieu de 
- **Stabilité lue sur la partie imaginaire** (`m_stab_imag_part`, E) : stabilité lue sur Im λ au lieu de 
- **Modes discrets écrits e^{λk}** (`m_discrete_exp`, E) : x_k = e^{λk}v au lieu de λᵏv
- **Exponentielle de chaque case** (`m_expm_entrywise`, E) : e^{At} = (e^{aᵢⱼt}) au lieu de 
- **e^{A+B} = e^A e^B sans AB = BA** (`m_expm_sum`, E) : e^{A+B} = e^A e^B (AB ≠ BA) au lieu de 
- **Terme tN oublié pour une valeur double** (`m_expm_double_no_t`, E) : e^{At} = e^{λt}I pour une valeur double au lieu de 
