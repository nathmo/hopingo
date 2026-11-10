// Module G6, part b (unit `analyse0`, step U2): primitives, areas,
// implicit derivatives, tangents imposed and common. Catalogue:
// docs/universite/G-gymnase-2.md, G6.

const S = (id, year, rest) => ({ id, unit: 'analyse0', year, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('g6-antideriv-usual', 12, {
    prereqs: ['g6-deriv-usual'], icon: '∫', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Primitives usuelles',
    desc: '∫xⁿ dx, ∫dx/x = ln|x|, ∫eᵃˣ dx, ∫cos(ax) dx… et + C.',
    prereqWhy: { 'g6-deriv-usual': 'une primitive se vérifie en la dérivant' },
    intro: {
      rule: 'Une primitive se vérifie <b>en la dérivant</b>. ∫xⁿ dx = xⁿ⁺¹/(n + 1) (n ≠ −1), ∫dx/x = ln|x|, ∫eᵃˣ dx = eᵃˣ/a, ∫cos(ax) dx = sin(ax)/a, ∫dx/(1 + x²) = arctan x.<br>On n\'oublie pas + C.',
      lines: [
        { cas: '(3x^3-4)/x+2e^x+cos(x)', note: 'f(x)', noEq: true },
        { cas: '3x^2-4/x+2e^x+cos(x)', note: 'Une somme de termes de la table' },
        { cas: 'int(3x^2-4/x+2e^x+cos(x),x)', note: 'Intégrer', noEq: true },
        { cas: '3int(x^2,x)-4int(1/x,x)+2int(e^x,x)+int(cos(x),x)', note: 'Linéarité' },
        { cas: 'x^3-4ln(|x|)+2e^x+sin(x)+C', note: 'Table, + C' },
      ],
    },
  }),
  S('g6-area', 12, {
    prereqs: ['g6-antideriv-usual', 'quad-formula'], icon: '▨', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Aire entre des courbes',
    desc: 'Intersections, courbe du haut, ∫ (haut − bas).',
    prereqWhy: { 'g6-antideriv-usual': 'la primitive de haut − bas', 'quad-formula': 'les intersections de deux courbes' },
    intro: {
      rule: 'Aire entre f et g sur [a ; b] = ∫ₐᵇ |f − g| dx. On cherche les points d\'intersection, on regarde quelle courbe est au-dessus sur chaque morceau, puis on intègre (haut − bas).<br>Une intégrale négative n\'est pas une aire.',
      lines: [
        { cas: 'x^2=2x+3', note: 'Intersections', noEq: true },
        { cas: '(x-3)(x+1)=0', note: 'Factoriser', noEq: true },
        { cas: 'x=-1 ou x=3', note: 'Produit nul', noEq: true },
        { html: 'Sur ]−1 ; 3[, 2x + 3 > x² (test en 0 : 3 > 0)', note: 'Courbe du haut', noEq: true },
        { cas: 'int(2x+3-x^2,x,-1,3)', note: 'Aire = ∫ (haut − bas)', noEq: true },
        { cas: 'bracket(x^2+3x-x^3/3,x,-1,3)', note: 'Primitive' },
        { cas: '9-(-5/3)', note: 'F(3) − F(−1)' },
        { cas: '32/3', note: 'Calculer' },
      ],
    },
  }),
  S('g6-deriv-implicit', 12.5, {
    prereqs: ['g6-tangent', 'g0-factor-thm'], icon: 'y′', examWeight: 1, exam: ['mcq', 'coef', 'open'],
    title: 'Dérivée implicite, tangente à une courbe implicite',
    desc: 'Dériver F(x, y) = 0 par rapport à x, isoler y′, tangente en un point.',
    prereqWhy: { 'g6-tangent': 'écrire la tangente au point', 'g0-factor-thm': 'trouver y₀ : une racine évidente, puis factoriser' },
    intro: {
      rule: 'y dépend de x. On dérive chaque membre par rapport à x : (y²)′ = 2y·y′, (xy)′ = y + x·y′. On isole y′.<br>En un point (x₀ ; y₀) de la courbe, y′ est la pente de la tangente.<br>Exemple : Γ : x² + xy + y³ = 3, au point d\'abscisse 1.',
      lines: [
        { cas: 'y^3+y-2=0', note: 'x = 1 : 1 + y + y³ = 3', noEq: true },
        { cas: '(y-1)(y^2+y+2)=0', note: 'Racine évidente : y₀ = 1, T(1 ; 1)', noEq: true },
        { cas: "2x+y+x×y'+3y^2×y'=0", note: 'Dériver par rapport à x', noEq: true },
        { cas: "y'=-(2x+y)/(x+3y^2)", note: 'Isoler y′', noEq: true },
        { cas: "y'=-3/4", note: 'Pente en (1 ; 1)', noEq: true },
        { cas: 'y=-3x/4+7/4', note: 'Tangente : 3x + 4y − 7 = 0', noEq: true },
      ],
    },
  }),
  S('g6-common-tangent', 12.5, {
    prereqs: ['g6-deriv-implicit', 'eq-systems'], icon: '⟋', examWeight: 1, exam: ['open'],
    title: 'Tangente imposée à une courbe ; tangente commune à deux courbes',
    desc: 'T sur la courbe, T sur la droite, même pente : trouver T puis le paramètre.',
    prereqWhy: { 'g6-deriv-implicit': 'la pente de la courbe en T', 'eq-systems': 'résoudre les conditions ensemble' },
    intro: {
      rule: 'Une droite t est tangente à Γ en T si T ∈ Γ, T ∈ t, et si la pente de Γ en T est celle de t. On écrit ces conditions, on trouve T, puis le paramètre.<br>Tangente commune à deux graphes : même pente et même ordonnée à l\'origine.<br>Exemple : Γ : x³ + y² + 2xy + p = 0, t : y = −x + 3, T à coordonnées entières.',
      lines: [
        { cas: "3x^2+2y×y'+2y+2x×y'=0", note: 'Dériver implicitement', noEq: true },
        { cas: '3x^2-2x=0', note: 'y′ = −1 : 3x² + 2y = 2y + 2x', noEq: true },
        { cas: 'x=0 ou x=2/3', note: 'T sur t : T(0 ; 3) ou T(2/3 ; 7/3)', noEq: true },
        { html: 'T(0 ; 3) : coordonnées entières', note: 'Choisir', noEq: true },
        { cas: '9+p=0', note: 'T sur Γ', noEq: true },
        { cas: 'p=-9', note: 'Isoler p', noEq: true },
      ],
    },
  }),
];
