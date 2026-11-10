// Module M, part b (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-cholesky", {
    prereqs: ["m-posdef", "l-mat-lu"], icon: "LLᵀ", examWeight: 2, exam: ["coef", "mcq", "tf", "open"],
    title: "Factorisation de Cholesky pas à pas",
    desc: "Colonne par colonne : une racine sur la diagonale, une division dessous.",
    prereqWhy: {"m-posdef": "Cholesky n'existe que si A est définie positive"},
    intro: { rule: "si A est symétrique définie positive, il existe une unique L triangulaire inférieure à diagonale > 0 telle que A = LLᵀ. Colonne par colonne : ℓ₁₁ = √a₁₁ ; ℓᵢ₁ = aᵢ₁/ℓ₁₁ ; ℓₖₖ = √(aₖₖ − Σ_{j<k} ℓₖⱼ²) ; ℓᵢₖ = (aᵢₖ − Σ_{j<k} ℓᵢⱼℓₖⱼ)/ℓₖₖ. Si une racine d'un nombre ≤ 0 apparaît, A n'est pas définie positive. On résout Ax = b par Ly = b puis Lᵀx = y. Pour une tridiagonale, le coût est O(n) (ligne de code des examens de N). Exemple : [[4, 2], [2, 5]] → L = [[2, 0], [1, 2]].", lines: [] },
  }),
  S("m-quad-gradient", {
    prereqs: ["m-posdef", "a2-partials", "a2-hessian-2x2"], icon: "∇(½xᵀAx)", examWeight: 1, exam: ["mcq", "tf"],
    title: "Gradient et hessienne d'une forme quadratique",
    desc: "∇f = Ax − b, Hess f = A ; le minimum résout Ax = b.",
    prereqWhy: {"a2-hessian-2x2": "nature du point stationnaire par la hessienne"},
    intro: { rule: "pour f(x) = ½xᵀAx − bᵀx + c avec A symétrique : ∇f = Ax − b, Hess f = A. Le point stationnaire résout Ax = b ; c'est un minimum global si A est définie positive, et f(x*) = c − ½bᵀx*. Si M n'est pas symétrique, xᵀMx = xᵀ((M + Mᵀ)/2)x et ∇(xᵀMx) = (M + Mᵀ)x. Exemple : f(x, y) = x² + xy + 2y² − 3x − 5y → A = [[2, 1], [1, 4]], b = (3 ; 5).", lines: [] },
  }),
  S("m-normal-eq", {
    prereqs: ["l-orth-lsq", "m-quad-gradient", "p-lin-combo"], icon: "XᵀXβ = Xᵀy", examWeight: 1, exam: ["mcq", "tf"],
    title: "Équations normales, matrice de design, Var(β̂)",
    desc: "Matrice de design, équations normales, Var(β̂) = σ²(XᵀX)⁻¹.",
    prereqWhy: {"m-quad-gradient": "annuler le gradient de ‖y − Xβ‖²", "p-lin-combo": "Var(Mε) = M·Var(ε)·Mᵀ"},
    intro: { rule: "modèle y = Xβ + ε. La matrice de design X (n × p) a une ligne par observation : une colonne de 1 pour l'ordonnée à l'origine, une colonne par variable (ou xᵢ, xᵢ² pour un polynôme). β̂ minimise ‖y − Xβ‖² ; le gradient 2Xᵀ(Xβ − y) s'annule : XᵀXβ̂ = Xᵀy. Si les εᵢ sont indépendants de variance σ², Var(β̂) = σ²(XᵀX)⁻¹ ; on estime σ² par RSS/(n − p). Exemple : x centrés (−2, −1, 0, 1, 2) → XᵀX = diag(5, 10) : les deux coefficients se calculent séparément.", lines: [] },
  }),
  S("m-rayleigh", {
    prereqs: ["m-spectral"], icon: "xᵀAx/xᵀx", examWeight: 1, exam: ["mcq", "tf"],
    title: "Quotient de Rayleigh",
    desc: "R(x) entre λ_min et λ_max ; égalité aux vecteurs propres.",
    prereqWhy: {"m-spectral": "décomposer x sur les vecteurs propres"},
    intro: { rule: "pour A symétrique, R(x) = xᵀAx/xᵀx vérifie λ_min ≤ R(x) ≤ λ_max, avec égalité aux vecteurs propres. Le maximum de xᵀAx sur la sphère unité vaut λ_max. Si x est proche d'un vecteur propre à ε près, R(x) est proche de la valeur propre à ε² près : c'est une bonne estimation. Exemple : A = [[3, 1], [1, 3]], x = (2 ; 1) → R = 19/5, entre 2 et 4.", lines: [] },
  }),
];
