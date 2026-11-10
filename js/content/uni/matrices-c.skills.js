// Module M, part c (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).
// m-power-method, m-norms and m-cond are reused by module N (step U9).

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('m-power-method', {
    prereqs: ['m-rayleigh', 'l-eig-powers'], icon: 'Aᵏy', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Méthode de la puissance et puissance inverse',
    desc: 'Multiplier par A, diviser par la plus grande composante : μ → λ₁.',
    prereqWhy: { 'l-eig-powers': 'Aᵏy₀ = Σ cᵢλᵢᵏvᵢ : le mode dominant l\'emporte', 'm-rayleigh': 'le quotient de Rayleigh affine l\'estimation de λ₁' },
    intro: {
      rule: 'On part de y₀ ≠ 0. À chaque pas : z = Ay<sub>k</sub>, μ<sub>k</sub> = la composante de z de plus grand module, y<sub>k+1</sub> = z/μ<sub>k</sub>. Si |λ₁| > |λ₂|, μ<sub>k</sub> → λ₁ et l\'erreur est multipliée par environ |λ₂/λ₁| à chaque pas.<br><b>Puissance inverse</b> avec décalage σ : on résout (A − σI)z = y<sub>k</sub> ; μ<sub>k</sub> → 1/(λ − σ) pour la valeur propre λ la plus proche de σ, donc λ = σ + 1/μ.',
      lines: L([
        ['A = [[3, 1], [1, 3]], y₀ = (1 ; 0) : Ay₀ = (3 ; 1), μ₀ = 3, y₁ = (1 ; 1/3)', 'Diviser par la plus grande composante'],
        ['Ay₁ = (10/3 ; 2), μ₁ = 10/3, y₂ = (1 ; 3/5)', 'Itération 2'],
        ['μ = 3 ; 10/3 ; 18/5 ; 34/9 → 4', 'λ₁ = 4, vecteur propre (1 ; 1)'],
        ['Vitesse |λ₂/λ₁| = 2/4 = 1/2', 'L\'erreur est divisée par 2 à chaque pas'],
      ]),
    },
  }),
  S('m-svd-lowrank', {
    prereqs: ['l-svd-compute', 'm-rank1-proj'], icon: 'A_k', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'SVD en somme de rangs 1, approximation de rang k, image de la sphère',
    desc: 'Garder les k plus grands σᵢuᵢvᵢᵀ ; l\'erreur est σₖ₊₁.',
    prereqWhy: {},
    intro: {
      rule: 'A = Σ σᵢuᵢvᵢᵀ. La meilleure approximation de rang k garde les k plus grands termes : A<sub>k</sub> = Σ<sub>i≤k</sub> σᵢuᵢvᵢᵀ, avec ‖A − A<sub>k</sub>‖₂ = σ<sub>k+1</sub> et ‖A − A<sub>k</sub>‖<sub>F</sub> = √(σ<sub>k+1</sub>² + …).<br>‖A‖<sub>F</sub>² = Σ aᵢⱼ² = Σ σᵢ². Stocker A<sub>k</sub> coûte k(m + n + 1) nombres.',
      lines: L([
        ['A = [[4, 5, 2], [0, 3, 6]] : σ₁ = 6√2, u₁ = (1 ; 1)/√2, v₁ = (1 ; 2 ; 2)/3, σ₂ = 3√2', 'La SVD'],
        ['A₁ = 6√2·(1 ; 1)/√2·(1, 2, 2)/3 = [[2, 4, 4], [2, 4, 4]]', 'Le premier terme'],
        ['‖A − A₁‖₂ = σ₂ = 3√2 ; ‖A − A₁‖_F = 3√2', 'Un seul terme jeté'],
        ['‖A‖_F² = 90 = 72 + 18 : A₁ garde 80 % de ‖A‖_F²', 'Part conservée'],
      ]),
    },
  }),
  S('m-norms', {
    prereqs: ['l-svd-compute'], icon: '‖A‖', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Normes matricielles',
    desc: '‖·‖₁ par colonnes, ‖·‖∞ par lignes, ‖·‖₂ = σ₁, Frobenius.',
    prereqWhy: { 'l-svd-compute': '‖A‖₂ = σ₁' },
    intro: {
      rule: '‖A‖₁ : la plus grande somme des |aᵢⱼ| d\'une <b>colonne</b> ; ‖A‖∞ : d\'une <b>ligne</b> ; ‖A‖₂ = σ₁ = √λ<sub>max</sub>(AᵀA) (= max |λᵢ| seulement si A est symétrique) ; ‖A‖<sub>F</sub> = √Σ aᵢⱼ².<br>Pour une norme subordonnée : ‖Ax‖ ≤ ‖A‖‖x‖, ‖AB‖ ≤ ‖A‖‖B‖, ρ(A) ≤ ‖A‖.',
      lines: L([
        ['A = [[3, 0], [4, 5]]', 'Une matrice non symétrique'],
        ['Colonnes : 3 + 4 = 7, 0 + 5 = 5 → ‖A‖₁ = 7 ; lignes : 3, 9 → ‖A‖∞ = 9', 'Sommes de |aᵢⱼ|'],
        ['‖A‖_F = √(9 + 16 + 25) = 5√2', 'Frobenius'],
        ['AᵀA = [[25, 20], [20, 25]], valeurs propres 45 et 5 → ‖A‖₂ = 3√5', 'Norme 2'],
      ]),
    },
  }),
  S('m-cond', {
    prereqs: ['m-norms'], icon: 'κ(A)', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Conditionnement',
    desc: 'κ = ‖A‖·‖A⁻¹‖ amplifie l\'erreur relative ; κ₂ = σ₁/σₙ.',
    prereqWhy: {},
    intro: {
      rule: 'κ(A) = ‖A‖·‖A⁻¹‖ ≥ 1 ; κ₂ = σ₁/σₙ, et λ<sub>max</sub>/λ<sub>min</sub> si A est symétrique définie positive. Si Ax = b et A(x + δx) = b + δb : ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖.<br><b>Un petit déterminant ne veut pas dire mauvais conditionnement</b> : 10⁻³I a κ = 1.',
      lines: L([
        ['A = [[5, 4], [4, 5]] : λ = 9 et 1, κ₂ = 9', 'A symétrique définie positive'],
        ['b = (9 ; 9), x = (1 ; 1), δb = (0,09 ; −0,09) : ‖δb‖/‖b‖ = 0,01', 'Erreur relative de b'],
        ['δb est vecteur propre pour 1 : δx = δb, ‖δx‖/‖x‖ = 0,09 = 9 × 0,01', 'La borne est atteinte'],
      ]),
    },
  }),
  S('m-gershgorin', {
    prereqs: ['l-eig-charpoly'], icon: 'D(aᵢᵢ ; Rᵢ)', examWeight: 0, exam: ['mcq', 'tf'], tags: ['opt', 'GM'],
    title: 'Disques de Gershgorin',
    desc: 'Chaque valeur propre est dans un disque centré sur la diagonale.',
    prereqWhy: { 'l-eig-charpoly': 'comparer les disques aux vraies valeurs propres' },
    intro: {
      rule: 'Chaque valeur propre de A est dans un disque D(aᵢᵢ ; Rᵢ), avec Rᵢ = Σ<sub>j≠i</sub> |aᵢⱼ| : <b>la diagonale est le centre, pas une part du rayon</b>. Une union de k disques disjointe des autres contient exactement k valeurs propres. On peut aussi prendre les colonnes.<br>Une matrice à diagonale strictement dominante est inversible : 0 n\'est dans aucun disque.',
      lines: L([
        ['A = [[4, 1, 0], [1, −3, 1], [0, 1, 7]]', 'Symétrique : valeurs propres réelles'],
        ['D(4 ; 1) = [3 ; 5], D(−3 ; 2) = [−5 ; −1], D(7 ; 1) = [6 ; 8]', 'Les disques'],
        ['Disjoints : une valeur propre dans chacun', 'Compter'],
        ['0 n\'est dans aucun disque : A est inversible', 'Valeurs propres ≈ 4,13 ; −3,24 ; 7,10'],
      ]),
    },
  }),
];
