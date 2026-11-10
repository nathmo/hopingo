// Module A2, part e (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-crit-points", {
    prereqs: ["a2-partials", "eq-systems", "fac-trinomial"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Points stationnaires : résoudre ∇f = 0",
    desc: '',
    prereqWhy: {"fac-trinomial": "factoriser les équations de ∇f = 0"},
    intro: { rule: "On résout ∇f = 0 <b>sans diviser par une expression qui peut s'annuler</b> : on factorise et on sépare les cas (« x = 0 ou … »). On vérifie à la fin que chaque point annule bien les deux dérivées.", lines: [] },
  }),
  S("a2-hessian-2x2", {
    prereqs: ["a2-crit-points", "l-det-cofactor"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Nature d'un point stationnaire (hessienne 2 × 2)",
    desc: '',
    prereqWhy: {"a2-crit-points": "les points stationnaires à classer"},
    intro: { rule: "En un point stationnaire, avec H = [[f_xx, f_xy], [f_xy, f_yy]] : det H > 0 et f_xx > 0 : minimum local ; det H > 0 et f_xx < 0 : maximum local ; det H < 0 : point selle ; det H = 0 : on ne peut pas conclure avec H.", lines: [] },
  }),
  S("a2-hessian-3x3", {
    prereqs: ["a2-hessian-2x2", "l-eig-charpoly"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Hessienne 3 × 3 : mineurs, trace, déterminant, valeurs propres",
    desc: '',
    prereqWhy: {"a2-hessian-2x2": "même classification, avec une variable de plus", "l-eig-charpoly": "valeurs propres de H"},
    intro: { rule: "H est symétrique ; ses valeurs propres sont réelles. Toutes > 0 : minimum ; toutes < 0 : maximum ; des deux signes (et aucune nulle) : selle. Mineurs principaux Δ₁, Δ₂, Δ₃ : tous > 0 ⇔ définie positive ; signes −, +, − ⇔ définie négative. Avec la trace (somme des λ) et le déterminant (produit des λ) seulement, on raisonne sur les signes possibles. <b>det H > 0 seul ne dit rien</b> en dimension 3 : (−, −, +) a aussi un produit positif.", lines: [] },
  }),
  S("a2-extrema-compact", {
    prereqs: ["a2-compact-extreme", "a1-extrema-global", "a2-crit-points"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Extrema absolus sur un compact, bord compris",
    desc: '',
    prereqWhy: {"a2-compact-extreme": "min et max atteints sur un compact"},
    intro: { rule: "f continue sur un compact atteint son min et son max. Candidats : (1) points stationnaires <b>intérieurs</b> ; (2) extrema sur chaque morceau du bord (paramétrer, ou Lagrange) ; (3) <b>coins</b> du bord. On compare les valeurs ; inutile de classer avec la hessienne.", lines: [] },
  }),
  S("a2-lagrange", {
    prereqs: ["a2-crit-points", "a2-tangent-level"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Multiplicateurs de Lagrange (une contrainte, deux variables)",
    desc: '',
    prereqWhy: {"a2-crit-points": "résoudre un système non linéaire par cas", "a2-tangent-level": "∇g est normal à la courbe g = 0"},
    intro: { rule: "Sur la courbe g = 0 (compacte), si ∇g ≠ 0 sur la courbe, les extrema de f vérifient ∇f = λ∇g et g = 0. On résout ce système <b>sans diviser par une variable qui peut être nulle</b>, puis on compare les valeurs de f.", lines: [] },
  }),
  S("a2-lagrange-3d", {
    prereqs: ["a2-lagrange", "l-sym-quadform"], icon: '', examWeight: 1, exam: ["mcq"],
    title: "Lagrange dans ℝ³ ; formes quadratiques sur la sphère",
    desc: '',
    prereqWhy: {"l-sym-quadform": "f = xᵀAx sur la sphère : extrema = valeurs propres"},
    intro: { rule: "Même méthode avec trois variables : ∇f = λ∇g, g = 0. Pour f linéaire sur une sphère, ∇f est constant : les extrema sont aux points ±R·∇f/‖∇f‖. Pour f = xᵀAx (A symétrique) sur la sphère unité, le système devient Ax = λx : les extrema sont la plus grande et la plus petite valeur propre de A.", lines: [] },
  }),
];
