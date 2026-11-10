// Module N, part h (unit `numerique`, step U9): problèmes aux limites, EDP, éléments finis, KKT. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-bvp-fd', {
    prereqs: ["n-fd-basic", "n-thomas", "m-posdef"], icon: "−u″", examWeight: 2, exam: ["mcq", "open"],
    title: "Problème aux limites −u″ = f : schéma, matrice, A SDP",
    desc: "Problème aux limites −u″ = f : schéma, matrice, A SDP",
    prereqWhy: {"n-thomas": "résoudre le système tridiagonal"},
    intro: {
      rule: "on pose xᵢ = ih, h = 1/(N + 1). Le schéma centré s'écrit (−uᵢ₋₁ + 2uᵢ − uᵢ₊₁)/h² = f(xᵢ) pour i = 1 … N, avec u₀ = α et u_{N+1} = β. Sous forme matricielle, Au = f̃ : - A = (1/h²)·tridiag(−1, 2, −1) ; - f̃₁ = f(x₁) + α/h², f̃_N = f(x_N) + β/h², et f̃ᵢ = f(xᵢ) pour les autres i. A est SDP, car vᵀAv = (1/h²)·(v₁² + Σᵢ₌₁^{N−1} (vᵢ₊₁ − vᵢ)² + v_N²) > 0 si v ≠ 0. Exemple : −u″ = 1, u(0) = u(1) = 0, N = 3, h = 1/4.",
      lines: L([["A = 16·[[2, −1, 0], [−1, 2, −1], [0, −1, 2]], f̃ = (1 ; 1 ; 1)", ""], ["u = (3/32 ; 1/8 ; 3/32)", "ce sont les valeurs exactes de x(1 − x)/2 : le schéma est exact pour les polynômes de degré ≤ 3"]]),
    },
  }),
  S('n-bvp-convergence', {
    prereqs: ["n-bvp-fd", "n-fd-proof"], icon: "h²/96", examWeight: 2, exam: ["mcq", "open"],
    title: "Consistance, stabilité, convergence en Ch²",
    desc: "Consistance, stabilité, convergence en Ch²",
    prereqWhy: {"n-bvp-fd": "schéma et matrice A", "n-fd-proof": "la consistance se prouve comme l'ordre d'une différence finie"},
    intro: {
      rule: "la preuve de convergence a trois étages. - <b>Consistance.</b> L'erreur de troncature est τᵢ = (−u(xᵢ₋₁) + 2u(xᵢ) − u(xᵢ₊₁))/h² − f(xᵢ). Par Taylor à l'ordre 4, |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|. - <b>Stabilité</b> (admise aux examens) : si Av = g, alors max|vᵢ| ≤ (1/8)·max|gᵢ|. - <b>Convergence.</b> Avec w = (u(xᵢ))ᵢ, on a Aw = f + τ, donc A(w − u) = τ, et max|u(xᵢ) − uᵢ| ≤ (1/8)(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|. « Consistance + stabilité ⇒ convergence. » Exemple :",
      lines: L([["u(xᵢ ± h) = u ± hu′ + (h²/2)u″ ± (h³/6)u‴ + (h⁴/24)u⁽⁴⁾(ξ±)", ""], ["u(xᵢ₊₁) + u(xᵢ₋₁) = 2u + h²u″ + (h⁴/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋))", ""], ["τᵢ = −(h²/24)(u⁽⁴⁾(ξ₊) + u⁽⁴⁾(ξ₋)), |τᵢ| ≤ (h²/12)·max|u⁽⁴⁾|", ""], ["max|eᵢ| ≤ (1/8)·(h²/12)·max|u⁽⁴⁾| = (h²/96)·max|u⁽⁴⁾|", ""]]),
    },
  }),
  S('n-bvp-newton', {
    prereqs: ["n-bvp-fd", "n-newton-system", "m-cholesky"], icon: "DF", examWeight: 3, exam: ["mcq"], tags: ["MT"],
    title: "Problème non linéaire : différences finies, Newton, Cholesky tridiagonal",
    desc: "Problème non linéaire : différences finies, Newton, Cholesky tridiagonal",
    prereqWhy: {},
    intro: {
      rule: "examen 2020. On cherche x ∈ ℝᴺ tel que F(x) = 0, avec F(x) = (N + 1)²·tridiag(−1, 2, −1)·x + (xᵢ³ − 1)ᵢ. - La jacobienne est DF(x) = (N + 1)²·tridiag(−1, 2, −1) + diag(3xᵢ²). Elle est SDP, donc on la factorise par Cholesky tridiagonal. - Newton : DF(xⁿ)(xⁿ − xⁿ⁺¹) = F(xⁿ). - Unicité : si F(x) = F(y) = 0, alors (N + 1)²(x − y)ᵀT(x − y) + Σ(xᵢ³ − yᵢ³)(xᵢ − yᵢ) = 0. Les deux termes sont ≥ 0, car t ↦ t³ est croissante, donc x = y.",
      lines: L([["dᵢ = ∂(xᵢ³ − 1)/∂xᵢ = 3xᵢ²", "pas xᵢ³ − 1, qui va dans F"], ["a(i) = 2·coeff + 3x(i)² ; b(i) = coeff·(2x(i) − x(i−1) − x(i+1)) + x(i)³ − 1", ""]]),
    },
  }),
  S('n-heat-implicit', {
    prereqs: ["n-bvp-fd", "n-ode-stability", "n-thomas"], icon: "∂ₜu", examWeight: 4, exam: ["mcq"],
    title: "Équation de la chaleur : Euler implicite et différences finies",
    desc: "Équation de la chaleur : Euler implicite et différences finies",
    prereqWhy: {"n-bvp-fd": "même matrice tridiagonale en espace"},
    intro: {
      rule: "on résout ∂u/∂t − ∂²u/∂x² = 0, u(0, t) = u(1, t) = 0, u(x, 0) = sin(πx) ; la solution exacte est e^(−π²t)·sin(πx). On écrit l'équation au point (xᵢ, t_{n+1}), avec une différence rétrograde en t et centrée en x : - (uᵢⁿ⁺¹ − uᵢⁿ)/τ − (uᵢ₋₁ⁿ⁺¹ − 2uᵢⁿ⁺¹ + uᵢ₊₁ⁿ⁺¹)/h² = 0 ; - donc Auⁿ⁺¹ = uⁿ, avec A = tridiag(−τ/h², 1 + 2τ/h², −τ/h²) ; - l'erreur est en O(h² + τ), et le schéma est stable pour tous h, τ > 0 ; - le schéma explicite (Euler progressif) est stable seulement si τ ≤ h²/2. Exemple : N = 2, h = 1/3, τ = 1/9, donc τ/h² = 1.",
      lines: L([["A = [[3, −1], [−1, 3]], u⁰ = (√3/2 ; √3/2)", ""], ["u¹ = u⁰/2 = (√3/4 ; √3/4)", "chaque ligne de A a pour somme 2"]]),
    },
  }),
  S('n-pde-cfl', {
    prereqs: ["n-heat-implicit"], icon: "τ ≤ h", examWeight: 2, exam: ["mcq"], tags: ["MT"],
    title: "Transport et ondes : schémas explicites, condition CFL",
    desc: "Transport et ondes : schémas explicites, condition CFL",
    prereqWhy: {"n-heat-implicit": "même grille (xᵢ, tₙ)"},
    intro: {
      rule: "deux schémas explicites, tous deux soumis à une condition sur τ/h. - <b>Transport</b> ∂u/∂t − ∂u/∂x = 0 : u(x, t) = u₀(x + t), donc l'information vient de la droite. On décentre vers i + 1 : uᵢⁿ⁺¹ = (1 − τ/h)uᵢⁿ + (τ/h)uᵢ₊₁ⁿ. Si τ ≤ h, c'est une combinaison convexe : max|uⁿ⁺¹| ≤ max|uⁿ|, et la positivité est conservée. L'ordre est O(h + τ). - <b>Ondes</b> ∂²u/∂t² = ∂²u/∂x² : avec λ = τ²/h², uᵢⁿ⁺¹ = 2(1 − λ)uᵢⁿ + λ(uᵢ₋₁ⁿ + uᵢ₊₁ⁿ) − uᵢⁿ⁻¹. Le premier pas, pour une vitesse initiale nulle, est uᵢ¹ = (1 − λ)uᵢ⁰ + (λ/2)(uᵢ₋₁⁰ + uᵢ₊₁⁰). Le schéma est stable si τ ≤ h, et d'ordre h² + τ². Exemple (transport) :",
      lines: L([["τ/h = 0,9 : uᵢⁿ⁺¹ = 0,1uᵢⁿ + 0,9uᵢ₊₁ⁿ", "poids ≥ 0 de somme 1"], ["τ/h = 1,1 : poids −0,1 et 1,1", "plus de principe du maximum"]]),
    },
  }),
  S('n-fem-hat', {
    prereqs: ["n-bvp-fd", "a1-int-parts"], icon: "φ₁", examWeight: 2, exam: ["mcq"], tags: ["MT"],
    title: "Forme faible et fonctions chapeau",
    desc: "Forme faible et fonctions chapeau",
    prereqWhy: {"n-bvp-fd": "même problème −u″ = f et même matrice tridiagonale"},
    intro: {
      rule: "on part de −u″ = f, u(0) = u(1) = 0. On multiplie par v ∈ V et on intègre par parties : ∫u′v′ = ∫fv pour tout v ∈ V, avec V = {g continue, g′ continue par morceaux, g(0) = g(1) = 0}. - Une condition de Dirichlet est imposée dans V. Une condition de Neumann, comme u′(1) = 0, est naturelle : elle n'est pas dans V (2020 : V = {g(0) = 0}). - Galerkin : V_h = span(φ₁, …, φ_N), u_h = Σ uⱼφⱼ, Kᵢⱼ = ∫φᵢ′φⱼ′ = (1/h)·tridiag(−1, 2, −1), Fᵢ = ∫fφᵢ. Exemple (2021, 2022) : N = 1, φ₁ chapeau en 1/2.",
      lines: L([["φ₁′ = 2 sur ]0 ; 1/2[, −2 sur ]1/2 ; 1[ ⇒ ∫(φ₁′)² = 4", ""], ["∫φ₁ = 1/2", "aire d'un triangle de base 1 et de hauteur 1"], ["4α = 1/2 ⇒ α = 1/8", "= u(1/2) exact, u = x(1 − x)/2"]]),
    },
  }),
  S('n-opt-kkt', {
    prereqs: ["a2-lagrange", "m-quad-gradient"], icon: "KKT", examWeight: 3, exam: ["mcq"], tags: ["MT"],
    title: "Optimisation sous contraintes : conditions KKT",
    desc: "Optimisation sous contraintes : conditions KKT",
    prereqWhy: {"m-quad-gradient": "∇f = Ax − b pour f quadratique"},
    intro: {
      rule: "pour minimiser f(x) sous gᵢ(x) ≥ 0, on pose L(x, λ) = f(x) − Σλᵢgᵢ(x). Les conditions KKT sont : - ∇f(x) − Σλᵢ∇gᵢ(x) = 0 ; - gᵢ(x) ≥ 0 ; - λᵢ ≥ 0 ; - λᵢgᵢ(x) = 0 (complémentarité). Pour des contraintes d'égalité Bq = c, avec L = f − μᵀ(Bq − c) et f = ½‖q‖², le système est [[I, −Bᵀ], [B, 0]]·(q ; μ) = (0 ; c). Sa solution est unique si ker Bᵀ = {0}. Exemples :",
      lines: L([["min ½(x − 3)² sous 1 − x ≥ 0 : x − 3 + λ = 0, λ(1 − x) = 0, λ ≥ 0 ⇒ x = 1, λ = 2", ""], ["min ½(q₁² + q₂²) sous q₁ + q₂ = 2 : q = (1 ; 1), μ = 1", ""]]),
    },
  }),
];
