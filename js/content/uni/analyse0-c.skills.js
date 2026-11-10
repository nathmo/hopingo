// Module G6, part c (unit `analyse0`, step U2): angular points,
// asymptotes, the full study of a function, parametric arcs. Catalogue:
// docs/universite/G-gymnase-2.md, G6.

const S = (id, year, rest) => ({ id, unit: 'analyse0', year, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('g6-angular-points', 12.5, {
    prereqs: ['g6-sign-variation', 'g6-limits', 'g1-abs-eq'], icon: '∨', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Points anguleux et de rebroussement',
    desc: 'f par morceaux, f′(a⁻) et f′(a⁺), extremum ou non.',
    prereqWhy: { 'g6-sign-variation': 'dire si le point anguleux est un extremum', 'g6-limits': 'les dérivées latérales sont des limites', 'g1-abs-eq': 'écrire f sans valeur absolue' },
    intro: {
      rule: 'On écrit f par morceaux, sans valeur absolue. Au raccord a, f doit être continue ; on calcule f′(a⁻) et f′(a⁺). Différentes et finies : point anguleux. Infinies de signes opposés : rebroussement.<br>Le point anguleux est un extremum si f′ change de signe en a.',
    },
  }),
  S('g6-asymptotes', 12.5, {
    prereqs: ['g6-limits', 'g0-long-div'], icon: '⟋∞', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Asymptotes verticales, horizontales, obliques ; branches paraboliques',
    desc: 'm = lim f(x)/x, puis h = lim (f(x) − mx) ; ou la division euclidienne.',
    prereqWhy: { 'g6-limits': 'chaque asymptote est une limite', 'g0-long-div': 'la division euclidienne donne l\'asymptote d\'une fraction rationnelle' },
    intro: {
      rule: 'Verticale x = a si f → ±∞ en a. Horizontale y = ℓ si f → ℓ en ±∞. Oblique y = mx + h : m = lim f(x)/x (fini, non nul), puis h = lim (f(x) − mx).<br>Si f(x)/x → ±∞, ou si f(x) − mx → ±∞ : branche parabolique.',
    },
  }),
  S('g6-study-full', 12.5, {
    prereqs: ['g6-convexity', 'g6-asymptotes', 'g6-angular-points', 'g1-parity-period'], icon: '📈', examWeight: 2, exam: ['open'],
    title: 'Étude de fonction complète et esquisse',
    desc: 'Domaine, symétries, asymptotes, variation, concavité, tableau, esquisse.',
    prereqWhy: {
      'g6-convexity': 'concavité et inflexions', 'g6-asymptotes': 'les asymptotes de l\'esquisse',
      'g6-angular-points': 'les points anguleux d\'une fonction avec valeur absolue', 'g1-parity-period': 'les symétries réduisent l\'étude',
    },
    intro: {
      rule: 'L\'ordre : domaine et symétries ; limites et asymptotes ; f′, variation, extrema, points anguleux ; f″, concavité, inflexions ; tableau récapitulatif ; esquisse.<br>L\'esquisse place d\'abord les asymptotes et les points remarquables, puis relie en respectant les variations.',
    },
  }),
  S('g6-param-tangent', 12.5, {
    prereqs: ['g6-tangent', 'g6-limits'], icon: '(ẋ;ẏ)', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Arcs paramétrés : vitesse, tangente, points stationnaires',
    desc: 'Pente ẏ/ẋ, tangentes horizontales et verticales, points stationnaires.',
    prereqWhy: { 'g6-tangent': 'écrire la tangente en un point', 'g6-limits': 'la pente en un point stationnaire est une limite' },
    intro: {
      rule: 'M(t) = (x(t) ; y(t)), vecteur vitesse (ẋ ; ẏ). Pente de la tangente : ẏ/ẋ.<br>ẋ = 0 et ẏ ≠ 0 : tangente verticale. ẏ = 0 et ẋ ≠ 0 : horizontale. ẋ = ẏ = 0 : point stationnaire ; la pente est la limite de ẏ/ẋ.',
    },
  }),
  S('g6-param-branches', 12.5, {
    prereqs: ['g6-param-tangent', 'g6-asymptotes'], icon: '(x;y)→∞', examWeight: 2, exam: ['mcq', 'open'],
    title: 'Arcs paramétrés : branches infinies et esquisse',
    desc: 'Limites de x et de y à chaque borne, asymptotes, branches paraboliques.',
    prereqWhy: { 'g6-param-tangent': 'dérivées x′(t), y′(t) et variations conjointes', 'g6-asymptotes': 'm = lim y/x, h = lim (y − mx)' },
    intro: {
      rule: 'À chaque borne t₀ du domaine (et en ±∞) : x → ∞ et y → ℓ : asymptote horizontale. x → k et y → ∞ : verticale. Les deux → ∞ : m = lim y/x, puis h = lim (y − mx) ; finis : asymptote oblique ; sinon branche parabolique.',
    },
  }),
];
