// Module N, part b (unit `numerique`, step U9): Newton, ordre, sécante. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-newton', {
    prereqs: ["n-fp-converge", "g6-deriv-rules"], icon: "f/f′", examWeight: 1, exam: ["mcq", "tf"],
    title: "Méthode de Newton pour une équation",
    desc: "Remplacer f par sa tangente : x − f(x)/f′(x), d'ordre 2 sur une racine simple.",
    prereqWhy: {"n-fp-converge": "Newton est le point fixe de φ(x) = x − f(x)/f′(x)"},
    intro: {
      rule: "L'itéré x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)/f′(x⁽ᵏ⁾) est le zéro de la tangente en x⁽ᵏ⁾. Si α est un zéro simple (f′(α) ≠ 0), Newton est d'ordre 2 près de α. On arrête sur l'incrément : |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol. Exemple : x² = 2, x⁽⁰⁾ = 1.",
      lines: L([["x⁽ᵏ⁺¹⁾ = x − (x² − 2)/(2x) = (x² + 2)/(2x)", "f′(x) = 2x"], ["1 → 3/2 → 17/12 → 577/408", "incréments 0,5 ; 0,0833 ; 0,00245"], ["r₂ = 0,0833/0,5² = 0,33 ; 0,00245/0,0833² = 0,35", "→ 1/(2√2) ≈ 0,354"]]),
    },
  }),
  S('n-order-read', {
    prereqs: ["n-newton"], icon: "rₚ", examWeight: 2, exam: ["mcq", "tf"],
    title: "Lire l'ordre sur les rapports d'incréments",
    desc: "Trouver le p pour lequel δₖ/δₖ₋₁ᵖ tend vers une constante non nulle.",
    prereqWhy: {"n-newton": "les suites d'itérés à analyser viennent de Newton"},
    intro: {
      rule: "La racine α est inconnue, donc on lit l'ordre sur les incréments δₖ = |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾|. La méthode est d'ordre p si rₚ = δₖ/δₖ₋₁ᵖ tend vers une constante <b>finie et non nulle</b>. Pour p trop petit, rₚ → 0 ; pour p trop grand, rₚ → ∞. On ignore les lignes où δ atteint ~10⁻¹⁵, qui sont dominées par l'arrondi. Exemple : Newton pour ∛2, x⁽⁰⁾ = 2.",
      lines: L([["δ : 5.0e-01, 2.0e-01, 3.5e-02, 1.0e-03, 8.1e-07, 5.2e-13", "les incréments affichés par le programme"], ["r₁ : 0,41 ; 0,17 ; 0,029 ; 0,0008 → 0", "p = 1 trop petit"], ["r₂ : 0,82 ; 0,85 ; 0,81 ; 0,79 ; 0,79", "constante non nulle : ordre 2"], ["r₃ : 1,6 ; 4,2 ; 23 ; 786 → ∞", "p = 3 trop grand"]]),
    },
  }),
  S('n-newton-multiple', {
    prereqs: ["n-newton", "n-order-read", "g0-multiplicity"], icon: "m·f/f′", examWeight: 1, exam: ["mcq", "tf"],
    title: "Newton sur une racine multiple ; Newton modifié",
    desc: "Sur une racine de multiplicité m, Newton est d'ordre 1 ; x − m·f/f′ retrouve l'ordre 2.",
    prereqWhy: {"g0-multiplicity": "multiplicité m de la racine"},
    intro: {
      rule: "Si α est de multiplicité m ≥ 2 (f(α) = … = f⁽ᵐ⁻¹⁾(α) = 0), Newton n'est plus que d'ordre 1, avec un rapport qui tend vers 1 − 1/m. Newton modifié, x − m·f/f′, retrouve l'ordre 2. Exemple : f(x) = (x − 1)², x⁽⁰⁾ = 2.",
      lines: L([["x⁽ᵏ⁺¹⁾ = x − (x − 1)²/(2(x − 1)) = (x + 1)/2", "f′(x) = 2(x − 1)"], ["2 → 1,5 → 1,25 → 1,125", "incréments 0,5 ; 0,25 ; 0,125 : r₁ = 1/2 = 1 − 1/2"], ["modifié : x⁽¹⁾ = 2 − 2·1/2 = 1", "exact en un pas ici"]]),
    },
  }),
  S('n-newton-system', {
    prereqs: ["n-newton", "a2-partials", "l-sys-echelon"], icon: "J·δ = F", examWeight: 2, exam: ["mcq", "coef"],
    title: "Newton pour les systèmes ; jacobienne à la main",
    desc: "Résoudre J(x⁽ᵏ⁾)·δ = F(x⁽ᵏ⁾), puis x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ.",
    prereqWhy: {"n-newton": "même itération, avec la jacobienne"},
    intro: {
      rule: "Pour F : ℝⁿ → ℝⁿ, on résout J_F(x⁽ᵏ⁾)·δ⁽ᵏ⁾ = F(x⁽ᵏ⁾), puis on pose x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − δ⁽ᵏ⁾. C'est la convention des examens : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). On ne calcule jamais J⁻¹. Exemple : F(x, y) = (x² + y² − 5 ; x − y + 1), x⁽⁰⁾ = (1 ; 1).",
      lines: L([["J = [[2x, 2y], [1, −1]] → J(1, 1) = [[2, 2], [1, −1]]", "une ligne par composante de F"], ["F(1, 1) = (−3 ; 1)", "le second membre"], ["2δ₁ + 2δ₂ = −3 ; δ₁ − δ₂ = 1 → δ = (−1/4 ; −5/4)", "on résout, sans calculer J⁻¹"], ["x⁽¹⁾ = (5/4 ; 9/4)", "la solution est (1 ; 2)"]]),
    },
  }),
  S('n-secant', {
    prereqs: ["n-newton", "n-order-read"], icon: "sécante", examWeight: 0, exam: ["tf"], tags: ["opt"],
    title: "Méthode de la sécante",
    desc: "Newton sans dérivée : la pente de la corde des deux derniers points.",
    prereqWhy: {"n-newton": "même itération, f′ remplacée par la pente de la corde", "n-order-read": "ordre (1 + √5)/2 lu sur les incréments"},
    intro: {
      rule: "On remplace f′ par la pente de la corde : x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − f(x⁽ᵏ⁾)·(x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾)/(f(x⁽ᵏ⁾) − f(x⁽ᵏ⁻¹⁾)). Il faut deux points de départ, mais aucune dérivée. L'ordre est (1 + √5)/2 ≈ 1,618. Exemple : x² − 2, x⁽⁰⁾ = 1, x⁽¹⁾ = 2.",
      lines: L([["x⁽²⁾ = 2 − 2·(2 − 1)/(2 − (−1)) = 4/3", "f(1) = −1, f(2) = 2"], ["x⁽³⁾ = 4/3 − (−2/9)(4/3 − 2)/(−2/9 − 2) = 7/5", "les deux derniers points : 2 et 4/3"]]),
    },
  }),
];
