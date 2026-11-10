// Module M, part a (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-blocks-schur", {
    prereqs: ["l-mat-blocks", "l-det-props"], icon: "A/A₁₁", examWeight: 1, exam: ["coef", "mcq", "tf"],
    title: "Blocs et complément de Schur",
    desc: "S, le bloc qui reste après l'élimination ; det A = det A₁₁ · det S.",
    prereqWhy: {"l-mat-blocks": "produit par blocs"},
    intro: { rule: "si A₁₁ est inversible, A = [[A₁₁, A₁₂], [A₂₁, A₂₂]] = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], avec X = A₂₁A₁₁⁻¹, Y = A₁₁⁻¹A₁₂ et S = A₂₂ − A₂₁A₁₁⁻¹A₁₂ (complément de Schur). Donc det A = det A₁₁ · det S, et A est inversible si et seulement si S l'est. Pour un système KKT [[H, Cᵀ], [C, 0]], S = −CH⁻¹Cᵀ. Exemple : [[2, 1, 1], [1, 1, 0], [1, 1, 3]] avec A₁₁ 2 × 2 → S = 3, det A = 1·3 = 3.", lines: [] },
  }),
  S("m-rank1-proj", {
    prereqs: ["l-orth-proj", "l-vs-rank"], icon: "uuᵀ", examWeight: 1, exam: ["mcq", "coef", "tf"],
    title: "Matrices de rang 1 et projecteurs",
    desc: "uvᵀ de rang 1 ; P = uuᵀ/(uᵀu) projette, I − 2P réfléchit.",
    prereqWhy: {"l-vs-rank": "rang 1 : toutes les lignes sont proportionnelles"},
    intro: { rule: "uvᵀ (u, v ≠ 0) est de rang 1 : toutes ses lignes sont proportionnelles à vᵀ. P = uuᵀ/(uᵀu) est la projection orthogonale sur Span{u} : P² = P, Pᵀ = P, ses valeurs propres sont 1 (une fois) et 0, et tr P = rang P = 1. I − P projette sur u⊥, et H = I − 2P est la symétrie par rapport à u⊥ (Householder). Plus généralement, la projection sur Col A (colonnes libres) est A(AᵀA)⁻¹Aᵀ. Exemple : u = (1 ; 1)/√2 → P = ½[[1, 1], [1, 1]], P² = P.", lines: [] },
  }),
  S("m-spectral", {
    prereqs: ["l-sym-orthodiag", "m-rank1-proj"], icon: "Σλuuᵀ", examWeight: 1, exam: ["mcq", "tf"],
    title: "Décomposition spectrale et fonctions de matrices symétriques",
    desc: "A = Σ λᵢuᵢuᵢᵀ ; f(A) se calcule sur les valeurs propres.",
    prereqWhy: {},
    intro: { rule: "A symétrique = Σ λᵢuᵢuᵢᵀ, avec (uᵢ) orthonormée : une somme de projecteurs pondérés par les valeurs propres. Pour une fonction f, f(A) = Σ f(λᵢ)uᵢuᵢᵀ : Aᵏ, A⁻¹ (si aucun λᵢ n'est nul), √A (si tous les λᵢ ≥ 0), e^A. Ce n'est pas f appliquée case par case. Exemple : A = [[5, 4], [4, 5]] → √A = [[2, 1], [1, 2]].", lines: [] },
  }),
  S("m-posdef", {
    prereqs: ["l-sym-quadform", "m-spectral"], icon: "A ≻ 0", examWeight: 2, exam: ["mcq", "tf"],
    title: "Matrices définies positives : critères",
    desc: "Valeurs propres, mineurs, pivots : quatre critères équivalents.",
    prereqWhy: {"m-spectral": "xᵀAx = Σ λᵢ(uᵢ · x)²"},
    intro: { rule: "pour A symétrique, ces énoncés sont équivalents : xᵀAx > 0 pour tout x ≠ 0 ; toutes les valeurs propres > 0 ; tous les mineurs principaux dominants > 0 (Sylvester) ; tous les pivots de Gauss sans échange > 0 ; A = LLᵀ avec L inversible. Définie négative : −A définie positive (les mineurs alternent : < 0, > 0, < 0…). Pour « semi-définie », les mineurs dominants ≥ 0 ne suffisent pas. Exemple : [[2, −1, 0], [−1, 2, −1], [0, −1, 2]] → mineurs 2, 3, 4.", lines: [] },
  }),
];
