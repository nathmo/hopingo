// Module N, part c (unit `numerique`, step U9): interpolation, moindres carrés. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-interp-lagrange', {
    prereqs: ["l-sys-echelon"], icon: "φᵢ", examWeight: 1, exam: ["mcq", "tf", "coef"],
    title: "Interpolation : Vandermonde et Lagrange à la main",
    desc: "Interpolation : Vandermonde et Lagrange à la main",
    prereqWhy: {},
    intro: {
      rule: "par n + 1 points d'abscisses distinctes passe un seul polynôme de degré ≤ n. - <b>Vandermonde</b> : on résout le système en a₀, …, aₙ. - <b>Lagrange</b> : φᵢ(x) = Π_{j≠i} (x − xⱼ)/(xᵢ − xⱼ), avec φᵢ(xⱼ) = δᵢⱼ, et p = Σ yᵢ φᵢ. Exemple : (0 ; 12), (1 ; 18), (2 ; 6).",
      lines: L([["a₀ = 12 ; a₀ + a₁ + a₂ = 18 ; a₀ + 2a₁ + 4a₂ = 6", ""], ["p(x) = 12 + 15x − 9x²", ""], ["φ₀ = (x − 1)(x − 2)/2, φ₁ = −x(x − 2), φ₂ = x(x − 1)/2", ""], ["p(1/2) = 12·3/8 + 18·3/4 + 6·(−1/8) = 69/4", ""]]),
    },
  }),
  S('n-interp-error', {
    prereqs: ["n-interp-lagrange", "a1-extrema-global"], icon: "Runge", examWeight: 1, exam: ["mcq", "tf"],
    title: "Erreur d'interpolation ; phénomène de Runge",
    desc: "Erreur d'interpolation ; phénomène de Runge",
    prereqWhy: {"n-interp-lagrange": "Πₙf, le polynôme d'interpolation"},
    intro: {
      rule: "f(x) − Πₙf(x) = f⁽ⁿ⁺¹⁾(ξ)/(n + 1)!·Π(x − xᵢ). Pour des nœuds équirépartis de pas h, max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹. Augmenter n ne suffit pas toujours : pour 1/(1 + x²) sur [−5 ; 5] avec des nœuds équirépartis, l'erreur explose aux bords. C'est le phénomène de Runge. Exemple : f = sin sur [0 ; π], n = 2, h = π/2.",
      lines: L([["max|f‴| = 1", ""], ["erreur ≤ 1/(4·3)·(π/2)³ = π³/96 ≈ 0,32", "l'erreur réelle est 0,056 : la borne est pessimiste"]]),
    },
  }),
  S('n-divided-diff', {
    prereqs: ["n-interp-lagrange", "g0-horner"], icon: "f[x₀,x₁]", examWeight: 0, exam: ["mcq"], tags: ["opt"],
    title: "Différences divisées, forme de Newton",
    desc: "Différences divisées, forme de Newton",
    prereqWhy: {"n-interp-lagrange": "même polynôme d'interpolation, dans une autre base", "g0-horner": "évaluer la forme de Newton par un schéma de Horner"},
    intro: {
      rule: "f[xᵢ] = yᵢ et f[xᵢ, …, xᵢ₊ₖ] = (f[xᵢ₊₁, …, xᵢ₊ₖ] − f[xᵢ, …, xᵢ₊ₖ₋₁])/(xᵢ₊ₖ − xᵢ). On a alors p = f[x₀] + f[x₀, x₁](x − x₀) + f[x₀, x₁, x₂](x − x₀)(x − x₁) + …. Ajouter un point ajoute un terme. Exemple : (0 ; 12), (1 ; 18), (2 ; 6), puis (3 ; 0).",
      lines: L([["f[0, 1] = 6 ; f[1, 2] = −12 ; f[0, 1, 2] = −9", ""], ["p₂ = 12 + 6x − 9x(x − 1)", "= 12 + 15x − 9x²"], ["f[2, 3] = −6 ; f[1, 2, 3] = 3 ; f[0, 1, 2, 3] = 4", ""], ["p₃ = p₂ + 4x(x − 1)(x − 2)", ""]]),
    },
  }),
  S('n-chebyshev', {
    prereqs: ["n-interp-error"], icon: "cos", examWeight: 0, exam: ["tf"], tags: ["opt"],
    title: "Nœuds de Tchebychev",
    desc: "Nœuds de Tchebychev",
    prereqWhy: {"n-interp-error": "le facteur Π(x − xᵢ) de l'erreur à minimiser"},
    intro: {
      rule: "sur [−1 ; 1], tᵢ = cos((2i + 1)π/(2(n + 1))) pour i = 0 … n. Sur [a ; b], xᵢ = (a + b)/2 + (b − a)/2·tᵢ. Ces nœuds minimisent max|Π(x − xᵢ)|, qui vaut 2⁻ⁿ sur [−1 ; 1], et évitent Runge. Les notes GM utilisent aussi les nœuds de Clenshaw-Curtis et de Gauss-Legendre. Exemple : n = 2.",
      lines: L([["t = cos(π/6), cos(π/2), cos(5π/6) = √3/2 ; 0 ; −√3/2", ""], ["Π(x − tᵢ) = x³ − 3x/4, max = 1/4", "contre 2/(3√3) ≈ 0,385 pour −1, 0, 1"], ["sur [0 ; 4] : 2 + √3 ; 2 ; 2 − √3", ""]]),
    },
  }),
  S('n-interp-piecewise', {
    prereqs: ["n-interp-error"], icon: "Π₁ʰ", examWeight: 0, exam: ["tf"], tags: ["GM"],
    title: "Interpolation linéaire par morceaux",
    desc: "Interpolation linéaire par morceaux",
    prereqWhy: {"n-interp-error": "erreur de degré 1 sur chaque morceau"},
    intro: {
      rule: "Π₁ʰf est affine sur chaque [xᵢ ; xᵢ₊₁] et max|f − Π₁ʰf| ≤ (h²/8)·max|f″|. C'est l'ordre 2 en h, sans phénomène de Runge. Exemple : f(x) = x³ sur [0 ; 2].",
      lines: L([["max|f″| = max|6x| = 12", "en x = 2"], ["erreur ≤ 12h²/8 = 1,5h²", ""], ["1,5h² ≤ 0,015 ⇔ h ≤ 0,1 ⇔ n ≥ 20 sous-intervalles", ""]]),
    },
  }),
  S('n-spline', {
    prereqs: ["n-interp-piecewise"], icon: "s″", examWeight: 0, exam: ["mcq", "tf"], tags: ["GM"],
    title: "Splines cubiques naturelles",
    desc: "Splines cubiques naturelles",
    prereqWhy: {"n-interp-piecewise": "interpolation par morceaux, puis conditions de raccord"},
    intro: {
      rule: "une spline cubique s est C² sur [a ; b], de degré 3 sur chaque sous-intervalle, et interpole les données. On compte : 4n inconnues, 3(n − 1) conditions de continuité et n + 1 conditions d'interpolation, donc il reste 2 degrés de liberté. La spline naturelle les fixe par s″(x₁) = s″(xₙ₊₁) = 0. L'erreur est en O(h⁴). Exemple des notes : (−1 ; −1), (0 ; 1), (1 ; 1).",
      lines: L([["continuité en 0 : a₁ = a₂, b₁ = b₂, c₁ = c₂", ""], ["s″(−1) = 0 : 2c − 6d₁ = 0 ; s″(1) = 0 : 2c + 6d₂ = 0", ""], ["s = a + bx + cx² + (c/3)x³ sur [−1 ; 0], a + bx + cx² − (c/3)x³ sur [0 ; 1]", ""], ["a = 1, a − b + 2c/3 = −1, a + b + 2c/3 = 1 → b = 1, c = −3/2", ""], ["s = 1 + x − (3/2)x² − (1/2)x³ sur [−1 ; 0] ; 1 + x − (3/2)x² + (1/2)x³ sur [0 ; 1]", ""]]),
    },
  }),
  S('n-least-squares', {
    prereqs: ["l-orth-lsq"], icon: "AᵀA", examWeight: 2, exam: ["mcq", "tf", "coef"],
    title: "Moindres carrés : équations normales à la main",
    desc: "Moindres carrés : équations normales à la main",
    prereqWhy: {},
    intro: {
      rule: "on a m données et n < m fonctions de base φⱼ. On minimise Σᵢ (Σⱼ αⱼφⱼ(xᵢ) − yᵢ)². Avec A de taille m × n, Aᵢⱼ = φⱼ(xᵢ), on résout les équations normales AᵀA·α = Aᵀy. Pour une droite : [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy). Exemple : (0 ; 1), (1 ; 3), (2 ; 4).",
      lines: L([["Σx = 3, Σx² = 5, Σy = 8, Σxy = 11", ""], ["[[3, 3], [3, 5]]·(a₀ ; a₁) = (8 ; 11)", ""], ["a₁ = 3/2, a₀ = 7/6", "droite y = 7/6 + 3x/2"]]),
    },
  }),
];
