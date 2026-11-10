// Module N, part f (unit `numerique`, step U9): systèmes linéaires. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4). LU with pivoting
// and its cost, the tridiagonal LU of Thomas (the programs of the exams),
// Jacobi and Gauss-Seidel, the convergence of iterative methods, and the
// gradient method for a symmetric positive definite matrix.

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-lu', {
    prereqs: ['l-mat-lu', 'l-det-props'], icon: 'LU', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Factorisation LU, pivot, coût, déterminant',
    desc: 'Factoriser A = LU (PA = LU si un pivot s\'annule), en déduire det A, et savoir ce que coûte chaque étape.',
    prereqWhy: { 'l-det-props': 'det A = Π uᵢᵢ / det P : un échange de lignes change le signe' },
    intro: {
      rule: 'A = LU, avec L triangulaire inférieure à diagonale unité (les multiplicateurs de Gauss) et U triangulaire supérieure. Si un pivot s\'annule, on <b>permute des lignes</b> : PA = LU. On a det A = Π uᵢᵢ / det P, avec det P = ±1.<br><b>Coûts</b> : la factorisation coûte environ 2n³/3 opérations, chaque descente ou remontée environ n². Pour plusieurs seconds membres, on factorise une seule fois, et on ne calcule jamais A⁻¹ pour résoudre Ax = b. Pour une matrice SDP, Cholesky coûte deux fois moins.',
      lines: L([
        ['A = [[2, 4, 8], [1, 1, 4], [3, 6, 7]] : ℓ₂₁ = 1/2, ℓ₃₁ = 3/2', 'Série GM 8'],
        ['Lignes 2 et 3 : (0, −1, 0) et (0, 0, −5), donc ℓ₃₂ = 0/(−1) = 0', 'Deuxième colonne'],
        ['L = [[1, 0, 0], [1/2, 1, 0], [3/2, 0, 1]], U = [[2, 4, 8], [0, −1, 0], [0, 0, −5]]', 'Les multiplicateurs sous la diagonale'],
        ['det A = 2·(−1)·(−5) = 10', 'Produit des pivots (sans échange)'],
      ]),
    },
  }),
  S('n-thomas', {
    prereqs: ['n-lu'], icon: 'tridiag', examWeight: 4, exam: ['mcq', 'tf'],
    title: 'LU tridiagonale (algorithme de Thomas), en O(N)',
    desc: 'Factoriser une matrice tridiagonale en place, puis descendre et remonter : environ 8N opérations.',
    prereqWhy: { 'n-lu': 'A = LU sans pivot, dans le cas tridiagonal' },
    intro: {
      rule: 'A est tridiagonale : sous-diagonale d, diagonale a, sur-diagonale c. On écrit A = LU, avec L bidiagonale (diagonale ℓ, sous-diagonale d) et U bidiagonale à diagonale unité (sur-diagonale γ).<br><b>Factorisation</b> : γ₁ = c₁/a₁, ℓᵢ = aᵢ − dᵢ₋₁γᵢ₋₁, γᵢ = cᵢ/ℓᵢ. <b>Descente</b> Ly = b : y₁ = b₁/ℓ₁, yᵢ₊₁ = (bᵢ₊₁ − dᵢyᵢ)/ℓᵢ₊₁. <b>Remontée</b> Ux = y : x_N = y_N, xᵢ = yᵢ − γᵢxᵢ₊₁.<br>Le coût est d\'environ 8N opérations. Les programmes d\'examen font tout <b>en place</b> : a devient ℓ, c devient γ, b devient y puis x.',
      lines: L([
        ['A = tridiag(−1, 2, −1) de taille 3, b = (1 ; 0 ; 1)', 'Exemple'],
        ['γ₁ = −1/2 ; ℓ₂ = 2 − (−1)(−1/2) = 3/2 ; γ₂ = −2/3 ; ℓ₃ = 2 − (−1)(−2/3) = 4/3', 'Factorisation'],
        ['y = (1/2 ; 1/3 ; 1)', 'Descente Ly = b'],
        ['x₃ = 1 ; x₂ = 1/3 + 2/3 = 1 ; x₁ = 1/2 + 1/2 = 1', 'Remontée Ux = y'],
      ]),
    },
  }),
  S('n-iter-jacobi-gs', {
    prereqs: ['l-sys-augmented'], icon: 'Jacobi', examWeight: 0, exam: ['tf'], tags: ['GM'],
    title: 'Jacobi et Gauss-Seidel',
    desc: 'Mettre à jour une composante à la fois, avec les anciennes valeurs (Jacobi) ou les plus récentes (Gauss-Seidel).',
    prereqWhy: { 'l-sys-augmented': 'le système Ax = b est mis à jour ligne par ligne' },
    intro: {
      rule: 'Les deux méthodes isolent xᵢ dans la ligne i de Ax = b.<br><b>Jacobi</b> : xᵢ⁽ᵏ⁺¹⁾ = (bᵢ − Σ<sub>j≠i</sub> aᵢⱼxⱼ⁽ᵏ⁾)/aᵢᵢ, avec les valeurs de l\'itération précédente (P = D).<br><b>Gauss-Seidel</b> : on utilise les composantes <b>déjà mises à jour</b> de l\'itération courante (P = triangle inférieur de A).<br>Les deux convergent si A est à diagonale strictement dominante (par lignes) ; Gauss-Seidel converge aussi si A est SDP.',
      lines: L([
        ['A = tridiag(−1, 4, −1) de taille 3, b = (3 ; 2 ; 3), x⁽⁰⁾ = 0', 'Solution (1 ; 1 ; 1)'],
        ['Jacobi : x⁽¹⁾ = (3/4 ; 1/2 ; 3/4), x⁽²⁾ = (7/8 ; 7/8 ; 7/8)', 'Seulement les anciennes valeurs'],
        ['Gauss-Seidel : x₂⁽¹⁾ = (2 + 3/4)/4 = 11/16, x⁽¹⁾ = (3/4 ; 11/16 ; 59/64)', 'x₁⁽¹⁾ sert déjà pour x₂⁽¹⁾'],
      ]),
    },
  }),
  S('n-iter-convergence', {
    prereqs: ['n-iter-jacobi-gs', 'l-eig-charpoly', 'm-cond'], icon: 'ρ(B)', examWeight: 0, exam: ['tf'], tags: ['GM'],
    title: 'Convergence des méthodes itératives, critère d\'arrêt',
    desc: 'La méthode converge pour tout départ si et seulement si ρ(B) < 1 ; un petit résidu ne suffit que si κ(A) est petit.',
    prereqWhy: { 'n-iter-jacobi-gs': 'matrices d\'itération de Jacobi et Gauss-Seidel', 'l-eig-charpoly': 'rayon spectral ρ(B)', 'm-cond': 'κ(A) dans le critère d\'arrêt sur le résidu' },
    intro: {
      rule: 'Une méthode itérative s\'écrit P(x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾) = r⁽ᵏ⁾, avec la matrice d\'itération B = I − P⁻¹A (Jacobi : P = D).<br>Elle converge pour tout x⁽⁰⁾ <b>si et seulement si ρ(B) < 1</b>, et ‖e⁽ᵏ⁾‖ ≤ ‖B‖ᵏ·‖e⁽⁰⁾‖ : ‖B‖ < 1 suffit, mais n\'est pas nécessaire.<br>Arrêt sur le résidu : ‖r⁽ᵏ⁾‖/‖b‖ ≤ tol garantit seulement ‖e⁽ᵏ⁾‖/‖x‖ ≤ κ(A)·tol.',
      lines: L([
        ['A = [[2, −1], [−1, 2]] : B_J = I − D⁻¹A = [[0, 1/2], [1/2, 0]]', 'Jacobi'],
        ['Valeurs propres ±1/2, donc ρ(B_J) = 1/2 < 1', 'Converge'],
        ['Gauss-Seidel : ρ(B_GS) = 1/4 = ρ(B_J)²', 'Deux fois moins d\'itérations'],
        ['κ₂(A) = 3/1 = 3 : ‖e‖/‖x‖ ≤ 3·tol', 'Critère d\'arrêt'],
      ]),
    },
  }),
  S('n-gradient-spd', {
    prereqs: ['m-posdef', 'm-quad-gradient'], icon: 'αr', examWeight: 2, exam: ['mcq', 'tf', 'open'], tags: ['GM', 'MT'],
    title: 'Méthode du gradient, à pas fixe ou optimal, pour A SDP',
    desc: 'Descendre dans la direction du résidu r = b − Ax, avec le pas optimal (r·r)/(r·Ar) ou un pas fixe 0 < α < 2/λ_max.',
    prereqWhy: { 'm-posdef': 'A symétrique définie positive : Φ a un unique minimum', 'm-quad-gradient': '∇Φ(v) = Av − b' },
    intro: {
      rule: 'Si A est SDP, Ax = b ⇔ x minimise Φ(v) = ½vᵀAv − bᵀv, et ∇Φ(v) = Av − b = −r. L\'itération est x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ + αₖr⁽ᵏ⁾.<br><b>Pas optimal</b> : αₖ = (r·r)/(r·Ar).<br><b>Pas fixe α</b> : x − x⁽ᵏ⁺¹⁾ = (I − αA)(x − x⁽ᵏ⁾) ; la méthode converge ⇔ 0 < α < 2/λ<sub>max</sub>, avec le facteur max|1 − αλᵢ|.',
      lines: L([
        ['A = [[2, −1], [−1, 2]], b = (1 ; 0), x⁽⁰⁾ = 0', 'Solution (2/3 ; 1/3)'],
        ['r⁽⁰⁾ = (1 ; 0) ; Ar⁽⁰⁾ = (2 ; −1) ; α₀ = 1/2 ; x⁽¹⁾ = (1/2 ; 0)', 'Premier pas'],
        ['r⁽¹⁾ = (0 ; 1/2) ; α₁ = (1/4)/(1/2) = 1/2 ; x⁽²⁾ = (1/2 ; 1/4)', 'Deuxième pas'],
        ['λ = 1 et 3 : le pas fixe converge ⇔ 0 < α < 2/3', 'Pas fixe'],
      ]),
    },
  }),
];
