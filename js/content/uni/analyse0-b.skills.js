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
    },
  }),
  S('g6-area', 12, {
    prereqs: ['g6-antideriv-usual', 'quad-formula'], icon: '▨', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Aire entre des courbes',
    desc: 'Intersections, courbe du haut, ∫ (haut − bas).',
    prereqWhy: { 'g6-antideriv-usual': 'la primitive de haut − bas', 'quad-formula': 'les intersections de deux courbes' },
    intro: {
      rule: 'Aire entre f et g sur [a ; b] = ∫ₐᵇ |f − g| dx. On cherche les points d\'intersection, on regarde quelle courbe est au-dessus sur chaque morceau, puis on intègre (haut − bas).<br>Une intégrale négative n\'est pas une aire.',
    },
  }),
  S('g6-deriv-implicit', 12.5, {
    prereqs: ['g6-tangent', 'g0-factor-thm'], icon: 'y′', examWeight: 1, exam: ['mcq', 'coef', 'open'],
    title: 'Dérivée implicite, tangente à une courbe implicite',
    desc: 'Dériver F(x, y) = 0 par rapport à x, isoler y′, tangente en un point.',
    prereqWhy: { 'g6-tangent': 'écrire la tangente au point', 'g0-factor-thm': 'trouver y₀ : une racine évidente, puis factoriser' },
    intro: {
      rule: 'y dépend de x. On dérive chaque membre par rapport à x : (y²)′ = 2y·y′, (xy)′ = y + x·y′. On isole y′.<br>En un point (x₀ ; y₀) de la courbe, y′ est la pente de la tangente.',
    },
  }),
  S('g6-common-tangent', 12.5, {
    prereqs: ['g6-deriv-implicit', 'eq-systems'], icon: '⟋', examWeight: 1, exam: ['open'],
    title: 'Tangente imposée à une courbe ; tangente commune à deux courbes',
    desc: 'T sur la courbe, T sur la droite, même pente : trouver T puis le paramètre.',
    prereqWhy: { 'g6-deriv-implicit': 'la pente de la courbe en T', 'eq-systems': 'résoudre les conditions ensemble' },
    intro: {
      rule: 'Une droite t est tangente à Γ en T si T ∈ Γ, T ∈ t, et si la pente de Γ en T est celle de t. On écrit ces conditions, on trouve T, puis le paramètre.<br>Tangente commune à deux graphes : même pente et même ordonnée à l\'origine.',
    },
  }),
];
