// Module N, part c (unit `numerique`, step U9): interpolation, moindres
// carrés. Catalogue: docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-interp-lagrange', {
    prereqs: ['l-sys-echelon'], icon: 'φᵢ', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Interpolation : Vandermonde et Lagrange à la main',
    desc: 'Le polynôme qui passe par n + 1 points : par un système, ou par les φᵢ de Lagrange.',
    prereqWhy: {},
    intro: {
      rule: 'Par n + 1 points d\'abscisses distinctes passe un seul polynôme de degré ≤ n.<br><b>Vandermonde</b> : on résout le système en a₀, …, aₙ (une équation par point).<br><b>Lagrange</b> : φᵢ(x) = Π<sub>j≠i</sub> (x − xⱼ)/(xᵢ − xⱼ) vaut 1 en xᵢ et 0 aux autres nœuds, et p = Σ yᵢφᵢ.',
      lines: L([
        ['Points (0 ; 12), (1 ; 18), (2 ; 6) : a₀ = 12 ; a₀ + a₁ + a₂ = 18 ; a₀ + 2a₁ + 4a₂ = 6', 'Une équation par point'],
        ['p(x) = 12 + 15x − 9x²', 'Solution du système'],
        ['φ₀ = (x − 1)(x − 2)/2, φ₁ = −x(x − 2), φ₂ = x(x − 1)/2', 'Chaque φᵢ divisé par sa valeur en xᵢ'],
        ['p(1/2) = 12·3/8 + 18·3/4 + 6·(−1/8) = 69/4', 'p = Σ yᵢφᵢ'],
      ]),
    },
  }),
  S('n-interp-error', {
    prereqs: ['n-interp-lagrange', 'a1-extrema-global'], icon: 'Runge', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Erreur d\'interpolation ; phénomène de Runge',
    desc: 'Majorer f − Πₙf avec f⁽ⁿ⁺¹⁾ et hⁿ⁺¹ ; savoir que plus de nœuds équirépartis peut aggraver l\'erreur.',
    prereqWhy: { 'n-interp-lagrange': 'Πₙf, le polynôme d\'interpolation' },
    intro: {
      rule: 'f(x) − Πₙf(x) = f⁽ⁿ⁺¹⁾(ξ)/(n + 1)!·Π(x − xᵢ). Pour des nœuds équirépartis de pas h : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.<br>Augmenter n ne suffit pas toujours : pour 1/(1 + x²) sur [−5 ; 5] avec des nœuds équirépartis, l\'erreur explose aux bords. C\'est le <b>phénomène de Runge</b>.',
      lines: L([
        ['f = sin sur [0 ; π], n = 2, h = π/2 : max|f‴| = max|cos| = 1', 'Dérivée d\'ordre n + 1 = 3'],
        ['erreur ≤ 1/(4·3)·(π/2)³ = π³/96 ≈ 0,32', 'L\'erreur réelle est 0,056 : la borne est pessimiste'],
      ]),
    },
  }),
  S('n-divided-diff', {
    prereqs: ['n-interp-lagrange', 'g0-horner'], icon: 'f[x₀,x₁]', examWeight: 0, exam: ['mcq'], tags: ['opt'],
    title: 'Différences divisées, forme de Newton',
    desc: 'La table des différences divisées donne la forme de Newton ; un point de plus ajoute un terme.',
    prereqWhy: { 'n-interp-lagrange': 'même polynôme d\'interpolation, dans une autre base', 'g0-horner': 'évaluer la forme de Newton par un schéma de Horner' },
    intro: {
      rule: 'f[xᵢ] = yᵢ et f[xᵢ, …, xᵢ₊ₖ] = (f[xᵢ₊₁, …, xᵢ₊ₖ] − f[xᵢ, …, xᵢ₊ₖ₋₁])/(xᵢ₊ₖ − xᵢ) : on divise par l\'écart des abscisses <b>extrêmes</b>.<br>Alors p = f[x₀] + f[x₀, x₁](x − x₀) + f[x₀, x₁, x₂](x − x₀)(x − x₁) + … : les coefficients sont la diagonale du haut de la table. Ajouter un point ajoute un terme.',
      lines: L([
        ['(0 ; 12), (1 ; 18), (2 ; 6) : f[0, 1] = 6 ; f[1, 2] = −12 ; f[0, 1, 2] = −9', '(−12 − 6)/(2 − 0)'],
        ['p₂ = 12 + 6x − 9x(x − 1)', '= 12 + 15x − 9x²'],
        ['On ajoute (3 ; 0) : f[2, 3] = −6 ; f[1, 2, 3] = 3 ; f[0, 1, 2, 3] = 4', 'Une ligne de plus'],
        ['p₃ = p₂ + 4x(x − 1)(x − 2)', 'Un seul terme ajouté'],
      ]),
    },
  }),
  S('n-chebyshev', {
    prereqs: ['n-interp-error'], icon: 'cos', examWeight: 0, exam: ['tf'], tags: ['opt'],
    title: 'Nœuds de Tchebychev',
    desc: 'Des nœuds resserrés aux bords, tᵢ = cos((2i + 1)π/(2n + 2)), transportés sur [a ; b].',
    prereqWhy: { 'n-interp-error': 'le facteur Π(x − xᵢ) de l\'erreur à minimiser' },
    intro: {
      rule: 'Sur [−1 ; 1] : tᵢ = cos((2i + 1)π/(2(n + 1))), i = 0 … n. Sur [a ; b] : xᵢ = (a + b)/2 + (b − a)/2·tᵢ.<br>Ces nœuds minimisent max|Π(x − xᵢ)|, qui vaut 2⁻ⁿ sur [−1 ; 1], et ils évitent le phénomène de Runge.',
      lines: L([
        ['n = 2 : t = cos(π/6), cos(π/2), cos(5π/6) = √3/2 ; 0 ; −√3/2', 'Les angles (2i + 1)π/6'],
        ['Π(x − tᵢ) = x³ − 3x/4, max = 1/4 sur [−1 ; 1]', 'Contre 2/(3√3) ≈ 0,385 pour −1, 0, 1'],
        ['Sur [0 ; 4] : x = 2 + 2t → 2 + √3 ; 2 ; 2 − √3', 'Transport affine'],
      ]),
    },
  }),
  S('n-interp-piecewise', {
    prereqs: ['n-interp-error'], icon: 'Π₁ʰ', examWeight: 0, exam: ['tf'], tags: ['GM'],
    title: 'Interpolation linéaire par morceaux',
    desc: 'Des segments entre les nœuds : erreur ≤ (h²/8)·max|f″|, l\'ordre 2 sans Runge.',
    prereqWhy: { 'n-interp-error': 'erreur de degré 1 sur chaque morceau' },
    intro: {
      rule: 'Π₁ʰf est affine sur chaque [xᵢ ; xᵢ₊₁] et max|f − Π₁ʰf| ≤ (h²/8)·max|f″| : c\'est l\'ordre 2 en h, sans phénomène de Runge. Diviser h par 2 divise la borne par 4.',
      lines: L([
        ['f(x) = x³ sur [0 ; 2] : max|f″| = max|6x| = 12', 'En x = 2'],
        ['erreur ≤ 12h²/8 = 1,5h²', 'La borne'],
        ['1,5h² ≤ 0,015 ⇔ h ≤ 0,1 ⇔ n ≥ 20 sous-intervalles', 'n = (b − a)/h'],
      ]),
    },
  }),
  S('n-spline', {
    prereqs: ['n-interp-piecewise'], icon: 's″', examWeight: 0, exam: ['mcq', 'tf'], tags: ['GM'],
    title: 'Splines cubiques naturelles',
    desc: 'Des cubiques raccordées en C², avec s″ = 0 aux deux bouts.',
    prereqWhy: { 'n-interp-piecewise': 'interpolation par morceaux, puis conditions de raccord' },
    intro: {
      rule: 'Une spline cubique s est C² sur [a ; b], de degré 3 sur chaque sous-intervalle, et interpole les données. On compte 4n inconnues, 3(n − 1) conditions de raccord et n + 1 conditions d\'interpolation : il reste <b>2</b> degrés de liberté. La spline <b>naturelle</b> les fixe par s″ = 0 aux deux extrémités. L\'erreur est en O(h⁴).',
      lines: L([
        ['(−1 ; −1), (0 ; 1), (1 ; 1) ; raccord en 0 : a₁ = a₂, b₁ = b₂, c₁ = c₂', 'Valeur, pente, courbure'],
        ['s″(−1) = 2c − 6d₁ = 0 ; s″(1) = 2c + 6d₂ = 0', 'd₁ = c/3, d₂ = −c/3'],
        ['a = 1, a − b + 2c/3 = −1, a + b + 2c/3 = 1 → b = 1, c = −3/2', 'Interpolation'],
        ['s = 1 + x − (3/2)x² − (1/2)x³ sur [−1 ; 0] ; 1 + x − (3/2)x² + (1/2)x³ sur [0 ; 1]', 'Les deux morceaux'],
      ]),
    },
  }),
  S('n-least-squares', {
    prereqs: ['l-orth-lsq'], icon: 'AᵀA', examWeight: 2, exam: ['mcq', 'tf', 'coef'],
    title: 'Moindres carrés : équations normales à la main',
    desc: 'Plus de points que d\'inconnues : on résout AᵀA·α = Aᵀy.',
    prereqWhy: {},
    intro: {
      rule: 'On a m données et n < m fonctions de base φⱼ. On minimise Σᵢ (Σⱼ αⱼφⱼ(xᵢ) − yᵢ)². Avec A de taille m × n, Aᵢⱼ = φⱼ(xᵢ) (une ligne par donnée, une colonne par fonction), on résout les équations normales AᵀA·α = Aᵀy.<br>Pour une droite : [[m, Σx], [Σx, Σx²]]·(a₀ ; a₁) = (Σy ; Σxy).',
      lines: L([
        ['(0 ; 1), (1 ; 3), (2 ; 4) : Σx = 3, Σx² = 5, Σy = 8, Σxy = 11', 'Les sommes'],
        ['[[3, 3], [3, 5]]·(a₀ ; a₁) = (8 ; 11)', 'Équations normales'],
        ['a₁ = 3/2, a₀ = 7/6', 'Droite y = 7/6 + 3x/2'],
      ]),
    },
  }),
];
