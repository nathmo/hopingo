// Module M, part c (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-power-method", {
    prereqs: ["m-rayleigh", "l-eig-powers"], icon: "Aᵏy", examWeight: 2, exam: ["mcq", "tf", "open"],
    title: "Méthode de la puissance et puissance inverse",
    desc: "Multiplier par A, diviser par la plus grande composante : μ → λ₁.",
    prereqWhy: {"l-eig-powers": "Aᵏy₀ = Σ cᵢλᵢᵏvᵢ"},
    intro: { rule: "on part de y₀ ≠ 0, puis z = Ay_k et y_{k+1} = z divisé par sa composante de plus grand module. Si |λ₁| > |λ₂|, μ_k = z/y_k (sur une composante) tend vers λ₁, et l'erreur est multipliée à peu près par |λ₂/λ₁| à chaque pas (par |λ₂/λ₁|² avec le quotient de Rayleigh, pour A symétrique). Puissance inverse avec décalage σ : on résout (A − σI)z = y_k (par LU, sans inverser) ; μ_k tend vers 1/(λ − σ) pour la valeur propre λ la plus proche de σ, donc λ = σ + 1/μ. Exemple : A = [[3, 1], [1, 3]], y₀ = (1 ; 0) → μ = 3, 10/3, 18/5, 34/9 → 4.", lines: [] },
  }),
  S("m-svd-lowrank", {
    prereqs: ["l-svd-compute", "m-rank1-proj"], icon: "A_k", examWeight: 1, exam: ["mcq", "tf"],
    title: "SVD en somme de rangs 1, approximation de rang k, image de la sphère",
    desc: "Garder les k plus grands σᵢuᵢvᵢᵀ ; l'erreur est σₖ₊₁.",
    prereqWhy: {},
    intro: { rule: "A = Σ σᵢuᵢvᵢᵀ. La meilleure approximation de rang k (pour ‖·‖₂ et ‖·‖_F) est A_k = Σ_{i≤k} σᵢuᵢvᵢᵀ, avec ‖A − A_k‖₂ = σ_{k+1} et ‖A − A_k‖_F = √(σ_{k+1}² + …). ‖A‖_F² = Σ aᵢⱼ² = Σ σᵢ². Stocker A_k coûte k(m + n + 1) nombres. L'image de la sphère unité est un ellipsoïde de demi-axes σᵢ selon les uᵢ, plein si le rang est plus petit que n (voir l-svd-sphere, branche MT de L). Exemple : A = [[4, 5, 2], [0, 3, 6]] → A₁ = [[2, 4, 4], [2, 4, 4]], ‖A − A₁‖₂ = 3√2.", lines: [] },
  }),
  S("m-norms", {
    prereqs: ["l-svd-compute"], icon: "‖A‖", examWeight: 1, exam: ["mcq", "tf"],
    title: "Normes matricielles",
    desc: "‖·‖₁ par colonnes, ‖·‖∞ par lignes, ‖·‖₂ = σ₁, Frobenius.",
    prereqWhy: {"l-svd-compute": "‖A‖₂ = σ₁"},
    intro: { rule: "normes subordonnées : ‖A‖₁ = maximum des sommes de |aᵢⱼ| par colonne ; ‖A‖∞ = maximum par ligne ; ‖A‖₂ = σ₁ = √λ_max(AᵀA) (= max |λᵢ| si A est symétrique). ‖A‖_F = √Σ aᵢⱼ² n'est pas subordonnée. Pour toute norme subordonnée : ‖Ax‖ ≤ ‖A‖‖x‖, ‖AB‖ ≤ ‖A‖‖B‖, ρ(A) ≤ ‖A‖. Exemple : A = [[3, 0], [4, 5]] → ‖A‖₁ = 7, ‖A‖∞ = 9.", lines: [] },
  }),
  S("m-cond", {
    prereqs: ["m-norms"], icon: "κ(A)", examWeight: 1, exam: ["mcq", "tf"],
    title: "Conditionnement",
    desc: "κ = ‖A‖·‖A⁻¹‖ amplifie l'erreur relative ; κ₂ = σ₁/σₙ.",
    prereqWhy: {},
    intro: { rule: "κ(A) = ‖A‖·‖A⁻¹‖ ≥ 1 ; κ₂ = σ₁/σₙ, et λ_max/λ_min pour A symétrique définie positive. Si Ax = b et A(x + δx) = b + δb, alors ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ : κ amplifie l'erreur relative. Un petit déterminant ne veut pas dire mauvais conditionnement (10⁻³I a κ = 1). Exemple : κ₂([[5, 4], [4, 5]]) = 9/1 = 9.", lines: [] },
  }),
  S("m-gershgorin", {
    prereqs: ["l-eig-charpoly"], icon: "D(aᵢᵢ ; Rᵢ)", examWeight: 0, exam: ["mcq", "tf"], tags: ["opt", "GM"],
    title: "Disques de Gershgorin",
    desc: "Chaque valeur propre est dans un disque centré sur la diagonale.",
    prereqWhy: {"l-eig-charpoly": "comparer les disques aux vraies valeurs propres"},
    intro: { rule: "chaque valeur propre de A est dans un disque de centre aᵢᵢ et de rayon Rᵢ = Σ_{j≠i} |aᵢⱼ| (la diagonale n'entre pas dans le rayon). Une union de k disques disjointe des autres contient exactement k valeurs propres. On peut faire de même avec les colonnes. Conséquence : une matrice à diagonale strictement dominante est inversible. Exemple : [[4, 1, 0], [1, −3, 1], [0, 1, 7]] → disques D(4 ; 1), D(−3 ; 2), D(7 ; 1), disjoints.", lines: [] },
  }),
];
