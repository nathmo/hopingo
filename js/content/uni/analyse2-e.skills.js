// Module A2, part e (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-crit-points", {
    prereqs: ["a2-partials", "eq-systems", "fac-trinomial"], icon: '∇f = 0', examWeight: 2, exam: ["mcq", "tf"],
    title: "Points stationnaires : résoudre ∇f = 0",
    desc: 'Factoriser et séparer les cas, sans diviser par une variable.',
    prereqWhy: {"fac-trinomial": "factoriser les équations de ∇f = 0"},
    intro: { rule: "On résout ∇f = 0 <b>sans diviser par une expression qui peut s'annuler</b> : on factorise et on sépare les cas (« x = 0 ou … »). On vérifie à la fin que chaque point annule bien les deux dérivées.", lines: [
      { html: 'f = x³ + 3xy² − 15x − 12y : ∂f/∂x = 3x² + 3y² − 15, ∂f/∂y = 6xy − 12', note: 'Les deux dérivées partielles', noEq: true },
      { html: 'x² + y² = 5 ; xy = 2', note: 'Diviser par 3 et par 6', noEq: true },
      { html: '(x + y)² = 5 + 4 = 9 ; (x − y)² = 5 − 4 = 1', note: 'Somme et produit', noEq: true },
      { html: '(x + y = 3 ou x + y = −3) ; (x − y = 1 ou x − y = −1)', note: 'Racines carrées : 4 cas', noEq: true },
      { html: '(2 ; 1), (1 ; 2), (−1 ; −2), (−2 ; −1)', note: 'Les points stationnaires', noEq: true },
    ] },
  }),
  S("a2-hessian-2x2", {
    prereqs: ["a2-crit-points", "l-det-cofactor"], icon: 'det H', examWeight: 2, exam: ["mcq", "tf"],
    title: "Nature d'un point stationnaire (hessienne 2 × 2)",
    desc: 'Signe de det H, puis de f_xx : minimum, maximum ou point selle.',
    prereqWhy: {"a2-crit-points": "les points stationnaires à classer"},
    intro: { rule: "En un point stationnaire, avec H = [[f_xx, f_xy], [f_xy, f_yy]] : det H > 0 et f_xx > 0 : minimum local ; det H > 0 et f_xx < 0 : maximum local ; det H < 0 : point selle ; det H = 0 : on ne peut pas conclure avec H.", lines: [
      { html: 'f = x³ + 3xy² − 15x − 12y : H = [[6x, 6y], [6y, 6x]]', note: 'f_xx = 6x, f_xy = 6y, f_yy = 6x', noEq: true },
      { html: 'det H = 36(x² − y²)', note: 'f_xx·f_yy − f_xy²', noEq: true },
      { html: '(2 ; 1) : det H = 108 > 0 et f_xx = 12 > 0 : minimum local', note: 'Signe de det H, puis de f_xx', noEq: true },
      { html: '(1 ; 2) : det H = −108 < 0 : point selle', note: 'det H < 0', noEq: true },
      { html: '(−2 ; −1) : maximum local ; (−1 ; −2) : point selle', note: 'Les deux autres points', noEq: true },
    ] },
  }),
  S("a2-hessian-3x3", {
    prereqs: ["a2-hessian-2x2", "l-eig-charpoly"], icon: 'Δ₁Δ₂Δ₃', examWeight: 3, exam: ["mcq", "tf"],
    title: "Hessienne 3 × 3 : mineurs, trace, déterminant, valeurs propres",
    desc: 'Les trois mineurs principaux ; ce que la trace et le déterminant disent des signes.',
    prereqWhy: {"a2-hessian-2x2": "même classification, avec une variable de plus", "l-eig-charpoly": "valeurs propres de H"},
    intro: { rule: "H est symétrique ; ses valeurs propres sont réelles. Toutes > 0 : minimum ; toutes < 0 : maximum ; des deux signes (et aucune nulle) : selle. Mineurs principaux Δ₁, Δ₂, Δ₃ : tous > 0 ⇔ définie positive ; signes −, +, − ⇔ définie négative. Avec la trace (somme des λ) et le déterminant (produit des λ) seulement, on raisonne sur les signes possibles. <b>det H > 0 seul ne dit rien</b> en dimension 3 : (−, −, +) a aussi un produit positif.", lines: [
      { html: 'f = x² + 2y² + 3z² + 2xy − 2yz − 4x : ∇f = 0 en (5 ; −3 ; −1)', note: 'Système linéaire 3 × 3', noEq: true },
      { html: 'H = [[2, 2, 0], [2, 4, −2], [0, −2, 6]]', note: 'H est constante', noEq: true },
      { html: 'Δ₁ = 2, Δ₂ = 8 − 4 = 4, Δ₃ = 2(24 − 4) − 2·12 = 16', note: 'Mineurs principaux en haut à gauche', noEq: true },
      { html: 'Tous &gt; 0 : H définie positive, minimum local', note: 'Critère de Sylvester', noEq: true },
    ] },
  }),
  S("a2-extrema-compact", {
    prereqs: ["a2-compact-extreme", "a1-extrema-global", "a2-crit-points"], icon: 'max_D f', examWeight: 2, exam: ["mcq", "tf"],
    title: "Extrema absolus sur un compact, bord compris",
    desc: 'Intérieur, chaque morceau du bord, coins : on compare toutes les valeurs.',
    prereqWhy: {"a2-compact-extreme": "min et max atteints sur un compact"},
    intro: { rule: "f continue sur un compact atteint son min et son max. Candidats : (1) points stationnaires <b>intérieurs</b> ; (2) extrema sur chaque morceau du bord (paramétrer, ou Lagrange) ; (3) <b>coins</b> du bord. On compare les valeurs ; inutile de classer avec la hessienne.", lines: [
      { html: 'f = x² + 2y² − 2x sur x² + y² ≤ 4 : ∇f = (2x − 2 ; 4y) = 0 en (1 ; 0), f = −1', note: 'Point stationnaire intérieur', noEq: true },
      { html: 'Bord : y² = 4 − x², f = −x² − 2x + 8, x ∈ [−2 ; 2]', note: 'Restriction au bord', noEq: true },
      { html: '−2x − 2 = 0 : x = −1, y = ±√3, f = 9', note: 'Point critique du bord', noEq: true },
      { html: 'x = 2 : f = 0 ; x = −2 : f = 8', note: 'Extrémités', noEq: true },
      { html: 'max 9 en (−1 ; ±√3) ; min −1 en (1 ; 0)', note: 'Comparer', noEq: true },
    ] },
  }),
  S("a2-lagrange", {
    prereqs: ["a2-crit-points", "a2-tangent-level"], icon: '∇f = λ∇g', examWeight: 3, exam: ["mcq", "tf"],
    title: "Multiplicateurs de Lagrange (une contrainte, deux variables)",
    desc: 'Le système ∇f = λ∇g, g = 0 résolu par cas, puis la comparaison des valeurs.',
    prereqWhy: {"a2-crit-points": "résoudre un système non linéaire par cas", "a2-tangent-level": "∇g est normal à la courbe g = 0"},
    intro: { rule: "Sur la courbe g = 0 (compacte), si ∇g ≠ 0 sur la courbe, les extrema de f vérifient ∇f = λ∇g et g = 0. On résout ce système <b>sans diviser par une variable qui peut être nulle</b>, puis on compare les valeurs de f.", lines: [
      { html: 'f = xy sous x² + 4y² = 8 : y = 2λx ; x = 8λy ; x² + 4y² = 8', note: '∇f = (y ; x), ∇g = (2x ; 8y)', noEq: true },
      { html: 'y = 2λx ; x(1 − 16λ²) = 0 ; x² + 4y² = 8', note: 'Substituer, mettre x en facteur', noEq: true },
      { html: 'x = 0 : y = 0, pas sur la courbe ; sinon λ = ±1/4, y = ±x/2', note: 'Les deux cas', noEq: true },
      { html: '(2 ; 1), (−2 ; −1), (2 ; −1), (−2 ; 1)', note: 'x² = 4', noEq: true },
      { html: 'max 2 en (2 ; 1) et (−2 ; −1) ; min −2 en (2 ; −1) et (−2 ; 1)', note: 'Comparer les valeurs', noEq: true },
    ] },
  }),
  S("a2-lagrange-3d", {
    prereqs: ["a2-lagrange", "l-sym-quadform"], icon: 'xᵀAx', examWeight: 1, exam: ["mcq"],
    title: "Lagrange dans ℝ³ ; formes quadratiques sur la sphère",
    desc: 'f linéaire : le point est un multiple de ∇f ; f = xᵀAx : les valeurs propres de A.',
    prereqWhy: {"l-sym-quadform": "f = xᵀAx sur la sphère : extrema = valeurs propres"},
    intro: { rule: "Même méthode avec trois variables : ∇f = λ∇g, g = 0. Pour f linéaire sur une sphère, ∇f est constant : les extrema sont aux points ±R·∇f/‖∇f‖. Pour f = xᵀAx (A symétrique) sur la sphère unité, le système devient Ax = λx : les extrema sont la plus grande et la plus petite valeur propre de A.", lines: [
      { html: 'f = x + 2y − 2z sous x² + y² + z² = 9 : (1 ; 2 ; −2) = 2λ(x ; y ; z)', note: 'Lagrange', noEq: true },
      { html: '(x ; y ; z) = (1/(2λ))(1 ; 2 ; −2)', note: 'Le point est un multiple de ∇f', noEq: true },
      { html: '9/(4λ²) = 9 : λ = ±1/2, points ±(1 ; 2 ; −2)', note: 'Dans la contrainte', noEq: true },
      { html: 'max 9 en (1 ; 2 ; −2), min −9 en (−1 ; −2 ; 2)', note: 'f = ±9', noEq: true },
    ] },
  }),
];
