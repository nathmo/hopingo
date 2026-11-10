// Module N, part h (unit `numerique`, step U9): problèmes aux limites, EDP,
// éléments finis, KKT. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-bvp-fd', {
    prereqs: ["n-fd-basic", "n-thomas", "m-posdef"], icon: "−u″", examWeight: 2, exam: ["mcq", "open"],
    title: "Problème aux limites −u″ = f : schéma, matrice, A SDP",
    desc: "Le schéma centré de −u″ = f donne Au = f̃, avec A = (1/h²)·tridiag(−1, 2, −1) définie positive.",
    prereqWhy: {"n-thomas": "résoudre le système tridiagonal"},
    intro: {
      rule: "On pose xᵢ = ih, h = 1/(N + 1). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ) pour i = 1 … N, avec u₀ = α et u<sub>N+1</sub> = β connus. Sous forme matricielle, Au = f̃ :<br>• A = (1/h²)·tridiag(−1, 2, −1) ;<br>• f̃₁ = f(x₁) + α/h², f̃<sub>N</sub> = f(x<sub>N</sub>) + β/h², f̃ᵢ = f(xᵢ) sinon : <b>les bords passent à droite</b>.<br>A est symétrique définie positive : vᵀAv = (1/h²)(v₁² + Σ(vᵢ₊₁ − vᵢ)² + v<sub>N</sub>²) > 0 si v ≠ 0. Exemple : −u″ = 1, u(0) = u(1) = 0, N = 3, h = 1/4.",
      lines: L([["A = 16·[[2, −1, 0], [−1, 2, −1], [0, −1, 2]], f̃ = (1 ; 1 ; 1)", ""], ["u = (3/32 ; 1/8 ; 3/32)", "ce sont les valeurs exactes de x(1 − x)/2 : le schéma est exact pour les polynômes de degré ≤ 3"]]),
    },
  }),
  S('n-bvp-convergence', {
    prereqs: ["n-bvp-fd", "n-fd-proof"], icon: "h²/96", examWeight: 2, exam: ["mcq", "open"],
    title: "Consistance, stabilité, convergence en Ch²",
    desc: "Consistance + stabilité ⇒ convergence : max|u(xᵢ) − uᵢ| ≤ (h²/96)·max|u⁽⁴⁾|.",
    prereqWhy: {"n-bvp-fd": "schéma et matrice A", "n-fd-proof": "la consistance se prouve comme l'ordre d'une différence finie"},
    intro: {
      rule: "La preuve de convergence a trois étages.<br>• <b>Consistance.</b> L'erreur de troncature τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ) vérifie |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾| (Taylor à l'ordre 4).<br>• <b>Stabilité</b> (admise aux examens) : si Av = g, alors max|vᵢ| ≤ (1/8)·max|gᵢ|.<br>• <b>Convergence.</b> Avec w = (u(xᵢ))ᵢ, Aw = f + τ, donc A(w − u) = τ et max|u(xᵢ) − uᵢ| ≤ (1/8)(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|.",
      lines: L([["u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + (h⁴/24)u⁽⁴⁾(ξ±)", ""], ["u(xᵢ₊₁) + u(xᵢ₋₁) = 2u + h²u″ + (h⁴/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋))", ""], ["τᵢ = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|", ""], ["max|eᵢ| ≤ (1/8)·(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|", ""]]),
    },
  }),
  S('n-bvp-newton', {
    prereqs: ["n-bvp-fd", "n-newton-system", "m-cholesky"], icon: "DF", examWeight: 3, exam: ["mcq"], tags: ["MT"],
    title: "Problème non linéaire : différences finies, Newton, Cholesky tridiagonal",
    desc: "Un problème non linéaire par différences finies, résolu par Newton avec une jacobienne tridiagonale factorisée par Cholesky.",
    prereqWhy: {},
    intro: {
      rule: "Examen 2020 : on cherche x ∈ ℝᴺ tel que F(x) = 0, avec F(x) = (N + 1)²·T·x + (g(xᵢ))ᵢ, T = tridiag(−1, 2, −1), g(x) = x³ − 1.<br>• La jacobienne est DF(x) = (N + 1)²·T + diag(g′(xᵢ)) : <b>la dérivée</b> 3xᵢ² va dans DF, <b>la valeur</b> xᵢ³ − 1 va dans F. Elle est symétrique définie positive (g′ ≥ 0) : on la factorise par Cholesky tridiagonal.<br>• Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ).<br>• Unicité : si F(x) = F(y) = 0, alors (N + 1)²(x − y)ᵀT(x − y) + Σ(g(xᵢ) − g(yᵢ))(xᵢ − yᵢ) = 0 ; les deux termes sont ≥ 0 (g croissante), donc x = y.",
      lines: L([["∂(xᵢ³ − 1)/∂xᵢ = 3xᵢ²", "pas xᵢ³ − 1, qui va dans F"], ["a[i] = 2·coeff + 3x[i]²", "diagonale de DF"], ["b[i] = coeff·(2x[i] − x[i−1] − x[i+1]) + x[i]³ − 1", "le vecteur F(x)"]]),
    },
  }),
  S('n-heat-implicit', {
    prereqs: ["n-bvp-fd", "n-ode-stability", "n-thomas"], icon: "∂ₜu", examWeight: 4, exam: ["mcq"],
    title: "Équation de la chaleur : Euler implicite et différences finies",
    desc: "Euler implicite en temps et différences centrées en espace : Auⁿ⁺¹ = uⁿ, d'ordre O(h² + τ), stable pour tous h, τ.",
    prereqWhy: {"n-bvp-fd": "même matrice tridiagonale en espace"},
    intro: {
      rule: "On résout ∂u/∂t − ∂²u/∂x² = 0, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx) ; la solution exacte est e^(−π²t)·sin(πx). On écrit l'équation au point (xᵢ, tₙ₊₁), avec une différence rétrograde en t et centrée en x :<br>(uᵢⁿ⁺¹ − uᵢⁿ)/τ − (uᵢ₋₁ⁿ⁺¹ − 2uᵢⁿ⁺¹ + uᵢ₊₁ⁿ⁺¹)/h² = 0, donc Auⁿ⁺¹ = uⁿ avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²).<br>L'erreur est en O(h² + τ) et le schéma est stable pour tous h, τ > 0 ; le schéma explicite n'est stable que si τ ≤ h²/2. Exemple : N = 2, h = 1/3, τ = 1/9, donc τ/h² = 1.",
      lines: L([["A = [[3, −1], [−1, 3]], u⁰ = (√3/2 ; √3/2)", ""], ["u¹ = u⁰/2 = (√3/4 ; √3/4)", "(1 ; 1) est vecteur propre de A pour la valeur propre 2"]]),
    },
  }),
  S('n-pde-cfl', {
    prereqs: ["n-heat-implicit"], icon: "τ ≤ h", examWeight: 2, exam: ["mcq"], tags: ["MT"],
    title: "Transport et ondes : schémas explicites, condition CFL",
    desc: "Transport et ondes par des schémas explicites, stables seulement si τ ≤ h (condition CFL).",
    prereqWhy: {"n-heat-implicit": "même grille (xᵢ, tₙ)"},
    intro: {
      rule: "Deux schémas explicites, soumis à une condition sur τ/h.<br>• <b>Transport</b> ∂u/∂t − ∂u/∂x = 0 : u(x, t) = u₀(x + t), l'information vient de la droite. On décentre vers i + 1 : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Si τ ≤ h, c'est une combinaison convexe : max|uⁿ⁺¹| ≤ max|uⁿ|. Ordre O(h + τ).<br>• <b>Ondes</b> ∂²u/∂t² = ∂²u/∂x² : avec λ = τ²/h², uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹ ; premier pas (vitesse initiale nulle) uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Stable si τ ≤ h, d'ordre O(h² + τ²).",
      lines: L([["τ/h = 0,9 : uᵢⁿ⁺¹ = 0,1uᵢⁿ + 0,9uᵢ₊₁ⁿ", "poids ≥ 0 de somme 1"], ["τ/h = 1,1 : poids −0,1 et 1,1", "plus de principe du maximum"]]),
    },
  }),
  S('n-fem-hat', {
    prereqs: ["n-bvp-fd", "a1-int-parts"], icon: "φ₁", examWeight: 2, exam: ["mcq"], tags: ["MT"],
    title: "Forme faible et fonctions chapeau",
    desc: "La forme faible ∫u′v′ = ∫fv et la méthode de Galerkin avec des fonctions chapeau.",
    prereqWhy: {"n-bvp-fd": "même problème −u″ = f et même matrice tridiagonale"},
    intro: {
      rule: "On part de −u″ = f, u(0) = u(1) = 0. On multiplie par v ∈ V et on intègre par parties : ∫u′v′ = ∫fv pour tout v ∈ V, avec V = {g continue, g′ continue par morceaux, g(0) = g(1) = 0}.<br>• Une condition de Dirichlet est imposée dans V ; une condition de Neumann (u′(1) = 0) est naturelle : elle n'est pas dans V.<br>• Galerkin : V<sub>h</sub> = span(φ₁, …, φ<sub>N</sub>), u<sub>h</sub> = Σ uⱼφⱼ, Kᵢⱼ = ∫φᵢ′φⱼ′ = (1/h)·tridiag(−1, 2, −1), Fᵢ = ∫fφᵢ.<br>Exemple (2021, 2022) : N = 1, φ₁ chapeau en 1/2.",
      lines: L([["φ₁′ = 2 sur ]0 ; 1/2[, −2 sur ]1/2 ; 1[ ⇒ ∫(φ₁′)² = 4", ""], ["∫φ₁ = 1/2", "aire d'un triangle de base 1 et de hauteur 1"], ["4α = 1/2 ⇒ α = 1/8", "= u(1/2) exact, u = x(1 − x)/2"]]),
    },
  }),
  S('n-opt-kkt', {
    prereqs: ["a2-lagrange", "m-quad-gradient"], icon: "KKT", examWeight: 3, exam: ["mcq"], tags: ["MT"],
    title: "Optimisation sous contraintes : conditions KKT",
    desc: "Minimiser sous des contraintes : le lagrangien, les conditions KKT et leurs deux cas.",
    prereqWhy: {"m-quad-gradient": "∇f = Ax − b pour f quadratique"},
    intro: {
      rule: "Pour minimiser f(x) sous gᵢ(x) ≥ 0, on pose L(x, λ) = f(x) − Σλᵢgᵢ(x). Les conditions KKT :<br>• ∇f(x) − Σλᵢ∇gᵢ(x) = 0 ;<br>• gᵢ(x) ≥ 0 et λᵢ ≥ 0 ;<br>• λᵢgᵢ(x) = 0 (complémentarité) : soit λᵢ = 0, soit la contrainte est active.<br>Pour des égalités Bq = c, avec L = ½‖q‖² − μᵀ(Bq − c), le système est [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c), de solution unique si ker Bᵀ = {0}.",
      lines: L([["min ½(x − 3)² sous 1 − x ≥ 0 : x − 3 + λ = 0, λ(1 − x) = 0, λ ≥ 0 ⇒ x = 1, λ = 2", ""], ["min ½(q₁² + q₂²) sous q₁ + q₂ = 2 : q = (1 ; 1), μ = 1", ""]]),
    },
  }),
];
