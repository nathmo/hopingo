// Module A1, part c (unit `analyse1`, step U2): développements limités and
// Taylor's remainder. Catalogue: docs/universite/A1-analyse-1.md,
// « Développements limités ». Lines are judged by `series`
// (js/judges/series.js); the remainder is written xⁿ·ε(x), o(xⁿ) accepted.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-dl-usual', {
    prereqs: ['a1-deriv-rules'], icon: 'DL', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'DL usuels en 0, notation xⁿ·ε(x)',
    desc: 'eˣ, sin, cos, Log(1 + x), (1 + x)^α, 1/(1 − x), Arctg, sinh, cosh.',
    prereqWhy: { 'a1-deriv-rules': 'les coefficients sont f⁽ᵏ⁾(0)/k!' },
    intro: {
      rule: 'f(x) = a₀ + a₁x + … + aₙxⁿ + xⁿ·ε(x) avec ε(x) → 0. Si f est de classe Cⁿ, aₖ = f⁽ᵏ⁾(0)/k!.<br>À connaître : eˣ, sin x, cos x, Log(1 + x), (1 + x)^α, 1/(1 − x), Arctg x, sinh x, cosh x. On substitue ensuite −x, 2x, x². Tu écris le reste x^3ε(x) (ou o(x^3)).',
      lines: [
        { cas: '√(1+x)', note: 'Départ : (1 + u)^α avec α = 1/2, ordre 3', noEq: true },
        { cas: '1+(1/2)x+((1/2)(-1/2)/2)x^2+((1/2)(-1/2)(-3/2)/6)x^3+x^3ε(x)', note: 'Formule de référence' },
        { cas: '1+x/2-x^2/8+x^3/16+x^3ε(x)', note: 'Coefficients calculés' },
      ],
    },
  }),
  S('a1-dl-ops', {
    prereqs: ['a1-dl-usual', 'lit-polynomial'], icon: 'DL·DL', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Somme, produit et quotient de DL',
    desc: 'Multiplier et ne garder que les termes de degré ≤ n ; 1/(1 + u).',
    prereqWhy: { 'a1-dl-usual': 'les DL des facteurs', 'lit-polynomial': 'développer le produit des parties polynomiales' },
    intro: {
      rule: 'On multiplie les parties polynomiales et on <b>ne garde que les termes de degré ≤ n</b>. Quotient : 1/(1 + u) = 1 − u + u² − … avec u → 0.<br>Si le dénominateur commence par x, on factorise x d\'abord : il faut un ordre de plus au numérateur.',
      lines: [
        { cas: 'e^x×sin(x)', note: 'Départ : ordre 3', noEq: true },
        { cas: '(1+x+x^2/2+x^3/6+x^3ε(x))×(x-x^3/6+x^3ε(x))', note: 'DL des deux facteurs' },
        { cas: 'x+x^2+x^3/2-x^3/6+x^3ε(x)', note: 'Développer, garder les termes de degré ≤ 3' },
        { cas: 'x+x^2+x^3/3+x^3ε(x)', note: 'Réduire' },
      ],
    },
  }),
  S('a1-dl-compose', {
    prereqs: ['a1-dl-ops'], icon: 'DL∘DL', examWeight: 2, exam: ['mcq', 'coef'],
    title: 'Composition de DL, y compris une constante intérieure non nulle',
    desc: 'u = g(x) → 0 ; sinon recentrer : e^(g) = e^c·e^(g − c).',
    prereqWhy: { 'a1-dl-ops': 'les puissances tronquées de u' },
    intro: {
      rule: 'Pour f(g(x)), il faut <b>u = g(x) → 0</b> pour utiliser le DL de f en 0. Si g(0) = c ≠ 0, on recentre : e^(g(x)) = e^c·e^(g(x) − c).<br>Dans uᵏ, on garde <b>tous</b> les termes de degré ≤ n.',
      lines: [
        { cas: 'e^(1/(1+x))', note: 'Départ : ordre 2 ; 1/(1 + x) → 1, pas 0', noEq: true },
        { cas: 'e×e^(-x+x^2+x^2ε(x))', note: 'Recentrer : sortir e¹' },
        { cas: 'e×(1+(-x+x^2)+(-x+x^2)^2/2)+x^2ε(x)', note: 'eᵘ avec u = −x + x²' },
        { cas: 'e×(1+(-x+x^2)+x^2/2)+x^2ε(x)', note: 'u² tronqué à l\'ordre 2' },
        { cas: 'e-e×x+(3e/2)x^2+x^2ε(x)', note: 'Réduire' },
      ],
    },
  }),
  S('a1-dl-limits', {
    prereqs: ['a1-dl-ops', 'a1-bh'], icon: 'lim DL', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Calculer une limite par DL',
    desc: 'Développer le haut et le bas jusqu\'au premier terme non nul.',
    prereqWhy: { 'a1-dl-ops': 'les DL du numérateur et du dénominateur', 'a1-bh': 'comparer avec la solution par Bernoulli-l\'Hôpital' },
    intro: {
      rule: 'On développe numérateur et dénominateur <b>jusqu\'au premier terme non nul</b>. Si le dénominateur est en x³, le numérateur doit être développé à l\'ordre 3 au moins.',
      lines: [
        { cas: 'lim((x-sin(x))/(x(1-cos(x))),x,0)', note: 'Départ : le bas commence en x³', noEq: true },
        { cas: 'lim((x^3/6+x^3ε(x))/(x^3/2+x^3ε(x)),x,0)', note: 'DL du haut et du bas à l\'ordre 3' },
        { cas: 'lim((1/6+ε(x))/(1/2+ε(x)),x,0)', note: 'Diviser par x³' },
        { cas: '1/3', note: 'ε(x) → 0' },
      ],
    },
  }),
  S('a1-dl-read', {
    prereqs: ['a1-dl-ops', 'a1-extrema-global'], icon: 'f⁽ᵏ⁾(0)', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Lire f⁽ⁿ⁾(a) ou la nature d\'un point critique sur un DL',
    desc: 'f⁽ᵏ⁾(a) = k!·aₖ ; signe de a₂ pour un extremum.',
    prereqWhy: { 'a1-dl-ops': 'calculer le DL', 'a1-extrema-global': 'la nature d\'un point critique' },
    intro: {
      rule: 'Si f(x) = Σ aₖ(x − a)ᵏ + (x − a)ⁿ·ε(x) et f est Cⁿ, alors f⁽ᵏ⁾(a) = k!·aₖ.<br>Si a₁ = 0 et a₂ ≠ 0 : min local (a₂ > 0) ou max local (a₂ < 0). Si a₂ = 0 et a₃ ≠ 0 : inflexion à tangente horizontale.',
      lines: [
        { cas: 'sin(x)/(1+x^2)', note: 'Départ : DL d\'ordre 5', noEq: true },
        { cas: '(x-x^3/6+x^5/120)(1-x^2+x^4)+x^5ε(x)', note: 'Produit des DL' },
        { cas: 'x-(7/6)x^3+(47/40)x^5+x^5ε(x)', note: 'Réduire' },
        { html: 'f⁽⁴⁾(0) = 4!·0 = 0 ; f⁽⁵⁾(0) = 5!·47/40 = 141 ; f‴(0) = 3!·(−7/6) = −7', note: 'f⁽ᵏ⁾(0) = k!·aₖ', noEq: true },
      ],
    },
  }),
  S('a1-taylor-rest', {
    prereqs: ['a1-dl-usual', 'a1-mvt'], icon: 'Rₙ', examWeight: 1, exam: ['tf'], tags: ['opt'],
    title: 'Reste de Taylor : majorer l\'erreur',
    desc: 'Reste de Lagrange : majorer |f⁽ⁿ⁺¹⁾| sur tout l\'intervalle.',
    prereqWhy: { 'a1-dl-usual': 'le polynôme de Taylor', 'a1-mvt': 'le reste de Lagrange prolonge les accroissements finis (c entre a et x)' },
    intro: {
      rule: 'f(x) = Tₙ(x) + f⁽ⁿ⁺¹⁾(c)/(n + 1)!·(x − a)ⁿ⁺¹ pour un c entre a et x (Lagrange).<br>Pour majorer l\'erreur, on majore |f⁽ⁿ⁺¹⁾| <b>sur tout l\'intervalle</b>, pas seulement en a.',
      lines: [
        { html: 'Approcher √1,1 par T₂(0,1) = 1 + 0,05 − 0,00125 = 1,04875', note: 'Polynôme de Taylor de √(1 + x)', noEq: true },
        { html: 'f‴(x) = (3/8)(1 + x)^(−5/2), donc |f‴(c)| ≤ 3/8 pour c ∈ [0 ; 0,1]', note: 'Majorer sur tout l\'intervalle', noEq: true },
        { html: '|R₂| ≤ (3/8)·(0,1)³/3! = 1/16 000', note: 'Borne de Lagrange', noEq: true },
      ],
    },
  }),
];
