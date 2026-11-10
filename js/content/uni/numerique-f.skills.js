// Module N, part f (unit `numerique`, step U9): systèmes linéaires. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-lu', {
    prereqs: ["l-mat-lu", "l-det-props"], icon: "LU", examWeight: 1, exam: ["mcq", "tf", "coef"],
    title: "Factorisation LU, pivot, coût, déterminant",
    desc: "Factorisation LU, pivot, coût, déterminant",
    prereqWhy: {},
    intro: {
      rule: "A = LU, avec L triangulaire inférieure à diagonale unité ; si un pivot s'annule, on permute des lignes : PA = LU. Les coûts sont les suivants : - la factorisation coûte environ 2n³/3 opérations ; - chaque descente ou remontée coûte environ n² ; - pour plusieurs seconds membres, on factorise une seule fois ; - on ne calcule jamais A⁻¹ pour résoudre Ax = b. On a det A = Π uᵢᵢ / det P, avec det P = ±1. Pour une matrice SDP, on utilise Cholesky (m-cholesky), deux fois moins chère. La sensibilité aux arrondis est mesurée par κ(A) (m-cond). Exemple (série GM 8) : A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]].",
      lines: L([["ℓ₂₁ = 1/2, ℓ₃₁ = 3/2 → lignes (0, −1, 0) et (0, 0, −5)", ""], ["ℓ₃₂ = 0/(−1) = 0", ""], ["L = [[1, 0, 0], [1/2, 1, 0], [3/2, 0, 1]], U = [[2, 4, 8], [0, −1, 0], [0, 0, −5]]", ""], ["det A = 2·(−1)·(−5) = 10", ""]]),
    },
  }),
  S('n-thomas', {
    prereqs: ["n-lu"], icon: "tridiag", examWeight: 4, exam: ["mcq", "tf"],
    title: "LU tridiagonale (algorithme de Thomas), en O(N)",
    desc: "LU tridiagonale (algorithme de Thomas), en O(N)",
    prereqWhy: {"n-lu": "A = LU sans pivot, dans le cas tridiagonal"},
    intro: {
      rule: "A est tridiagonale, avec la sous-diagonale d, la diagonale a et la sur-diagonale c. On écrit A = LU, avec L bidiagonale (diagonale ℓ, sous-diagonale d) et U bidiagonale à diagonale unité (sur-diagonale γ). - Factorisation : γ₁ = c₁/a₁, ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁, γᵢ = cᵢ/ℓᵢ. - Descente Ly = b : y₁ = b₁/ℓ₁, yᵢ₊₁ = (bᵢ₊₁ − dᵢyᵢ)/ℓᵢ₊₁. - Remontée Ux = y : x_N = y_N, xᵢ = yᵢ − γᵢxᵢ₊₁. Le coût est d'environ 8N opérations. Les examens font tout <b>en place</b> : a devient ℓ, c devient γ, b devient y puis x. Exemple : A = tridiag(−1, 2, −1) de taille 3, b = (1 ; 0 ; 1).",
      lines: L([["γ₁ = −1/2 ; ℓ₂ = 2 − (−1)(−1/2) = 3/2 ; γ₂ = −2/3 ; ℓ₃ = 2 − (−1)(−2/3) = 4/3", ""], ["y = (1/2 ; 1/3 ; 1)", ""], ["x₃ = 1 ; x₂ = 1/3 + 2/3 = 1 ; x₁ = 1/2 + 1/2 = 1", ""]]),
    },
  }),
  S('n-iter-jacobi-gs', {
    prereqs: ["l-sys-augmented"], icon: "Jacobi", examWeight: 0, exam: ["tf"], tags: ["GM"],
    title: "Jacobi et Gauss-Seidel",
    desc: "Jacobi et Gauss-Seidel",
    prereqWhy: {"l-sys-augmented": "le système Ax = b est mis à jour ligne par ligne"},
    intro: {
      rule: "les deux méthodes mettent à jour une composante à la fois. - Jacobi : xᵢ⁽ᵏ⁺¹⁾ = (bᵢ − Σ_{j≠i} aᵢⱼxⱼ⁽ᵏ⁾)/aᵢᵢ, c'est-à-dire P = D. - Gauss-Seidel : on utilise les composantes <b>déjà mises à jour</b> de l'itération courante, c'est-à-dire P = triangle inférieur de A. - Les deux convergent si A est à diagonale strictement dominante (par lignes) ; Gauss-Seidel converge aussi si A est SDP. Exemple : A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3), x⁽⁰⁾ = 0, de solution (1 ; 1 ; 1).",
      lines: L([["Jacobi : x⁽¹⁾ = (3/4 ; 1/2 ; 3/4), x⁽²⁾ = (7/8 ; 7/8 ; 7/8)", ""], ["Gauss-Seidel : x⁽¹⁾ = (3/4 ; 11/16 ; 59/64)", ""]]),
    },
  }),
  S('n-iter-convergence', {
    prereqs: ["n-iter-jacobi-gs", "l-eig-charpoly", "m-cond"], icon: "ρ(B)", examWeight: 0, exam: ["tf"], tags: ["GM"],
    title: "Convergence des méthodes itératives, critère d'arrêt",
    desc: "Convergence des méthodes itératives, critère d'arrêt",
    prereqWhy: {"n-iter-jacobi-gs": "matrices d'itération de Jacobi et Gauss-Seidel", "l-eig-charpoly": "rayon spectral ρ(B)", "m-cond": "κ(A) dans le critère d'arrêt sur le résidu"},
    intro: {
      rule: "la méthode de Richardson stationnaire s'écrit P(x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾) = r⁽ᵏ⁾, avec la matrice d'itération B = I − P⁻¹A. - Elle converge pour tout x⁽⁰⁾ ⇔ ρ(B) < 1, et ‖e⁽ᵏ⁾‖ ≤ ‖B‖ᵏ·‖e⁽⁰⁾‖. - Arrêt sur le résidu : ‖r⁽ᵏ⁾‖/‖b‖ ≤ tol ⇒ ‖e⁽ᵏ⁾‖/‖x‖ ≤ κ(A)·tol. - La méthode de la puissance estime ρ (m-power-method). Exemple : A = [[2, −1], [−1, 2]].",
      lines: L([["B_J = I − D⁻¹A = [[0, 1/2], [1/2, 0]], ρ = 1/2", ""], ["B_GS : ρ = 1/4 = ρ_J²", ""], ["κ₂(A) = 3/1 = 3", ""]]),
    },
  }),
  S('n-gradient-spd', {
    prereqs: ["m-posdef", "m-quad-gradient"], icon: "αr", examWeight: 2, exam: ["mcq", "tf", "open"], tags: ["GM", "MT"],
    title: "Méthode du gradient, à pas fixe ou optimal, pour A SDP",
    desc: "Méthode du gradient, à pas fixe ou optimal, pour A SDP",
    prereqWhy: {"m-posdef": "A symétrique définie positive", "m-quad-gradient": "∇Φ(v) = Av − b"},
    intro: {
      rule: "si A est SDP, Ax = b ⇔ x minimise Φ(v) = ½vᵀAv − bᵀv, et ∇Φ(v) = Av − b = −r. L'itération est x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾. - Pas optimal : αₖ = (r·r)/(r·Ar). - Pas fixe α : x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾). La méthode converge ⇔ 0 < α < 2/λ_max, avec le facteur max|1 − αλᵢ|. Exemple : A = [[2, −1], [−1, 2]], b = (1 ; 0), x⁽⁰⁾ = 0, de solution (2/3 ; 1/3).",
      lines: L([["r⁽⁰⁾ = (1 ; 0) ; Ar⁽⁰⁾ = (2 ; −1) ; α₀ = 1/2 ; x⁽¹⁾ = (1/2 ; 0)", ""], ["r⁽¹⁾ = (0 ; 1/2) ; α₁ = (1/4)/(1/2) = 1/2 ; x⁽²⁾ = (1/2 ; 1/4)", ""], ["λ = 1 et 3 : le pas fixe converge ⇔ 0 < α < 2/3", ""]]),
    },
  }),
];
