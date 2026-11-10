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
      rule: 'On écrit f par morceaux, sans valeur absolue. Au raccord a, f doit être continue ; on calcule f′(a⁻) et f′(a⁺). Différentes et finies : point anguleux. Infinies de signes opposés : rebroussement.<br>Le point anguleux est un extremum si f′ change de signe en a. Attention au cas limite où une dérivée latérale est nulle : regarde le signe de f′ juste à côté.',
      lines: [
        { html: 'f(x) = |x² − 4| + 3x', note: 'Départ', noEq: true },
        { html: 'f(x) = x² + 3x − 4 si |x| ≥ 2 ; f(x) = −x² + 3x + 4 si |x| &lt; 2', note: 'Par morceaux', noEq: true },
        { html: 'f′(x) = 2x + 3 si |x| > 2 ; f′(x) = −2x + 3 si |x| &lt; 2', note: 'Dériver', noEq: true },
        { html: 'En 2 : f′(2⁻) = −1, f′(2⁺) = 7 : point anguleux ; f′ passe de − à + : minimum local f(2) = 6', note: 'Dérivées latérales en 2', noEq: true },
        { html: 'En −2 : f′(−2⁻) = −1, f′(−2⁺) = 7 : point anguleux, minimum local f(−2) = −6', note: 'Dérivées latérales en −2', noEq: true },
        { html: 'Sur ]−2 ; 2[, f′ = 0 en 3/2 : maximum local f(3/2) = 25/4', note: 'Autres extrema', noEq: true },
      ],
    },
  }),
  S('g6-asymptotes', 12.5, {
    prereqs: ['g6-limits', 'g0-long-div'], icon: '⟋∞', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Asymptotes verticales, horizontales, obliques ; branches paraboliques',
    desc: 'm = lim f(x)/x, puis h = lim (f(x) − mx) ; ou la division euclidienne.',
    prereqWhy: { 'g6-limits': 'chaque asymptote est une limite', 'g0-long-div': 'la division euclidienne donne l\'asymptote d\'une fraction rationnelle' },
    intro: {
      rule: 'Verticale x = a si f → ±∞ en a. Horizontale y = ℓ si f → ℓ en ±∞. Oblique y = mx + h : m = lim f(x)/x (fini, non nul), puis h = lim (f(x) − mx).<br>Si f(x)/x → ±∞, ou si f(x) − mx → ±∞ : branche parabolique.',
      lines: [
        { html: 'f(x) = (x² + x − 1)/(x − 1)', note: 'Départ', noEq: true },
        { html: 'D = ℝ ∖ {1} ; en 1 le numérateur vaut 1 ≠ 0 : x = 1 asymptote verticale', note: 'Verticale', noEq: true },
        { html: 'm = lim f(x)/x = lim (x² + x − 1)/(x² − x) = 1', note: 'Pente', noEq: true },
        { html: 'h = lim (f(x) − x) = lim (2x − 1)/(x − 1) = 2', note: 'Ordonnée à l\'origine', noEq: true },
        { html: 'y = x + 2 en ±∞', note: 'Oblique', noEq: true },
        { html: 'f(x) − (x + 2) = 1/(x − 1) : au-dessus pour x > 1, en dessous pour x &lt; 1', note: 'Position', noEq: true },
      ],
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
      lines: [
        { html: 'f(x) = x²/(x − 1)', note: 'Départ', noEq: true },
        { html: 'D = ℝ ∖ {1} ; ni paire ni impaire', note: 'Domaine, symétries', noEq: true },
        { html: 'f(x) = x + 1 + 1/(x − 1) : asymptote verticale x = 1, oblique y = x + 1', note: 'Asymptotes', noEq: true },
        { html: 'f′(x) = 1 − 1/(x − 1)² = x(x − 2)/(x − 1)² : max local (0 ; 0), min local (2 ; 4)', note: 'Variation', noEq: true },
        { html: 'f″(x) = 2/(x − 1)³ : concave sur ]−∞ ; 1[, convexe sur ]1 ; +∞[, pas d\'inflexion', note: 'Concavité', noEq: true },
        { html: 'f(x) − (x + 1) = 1/(x − 1) : au-dessus de l\'asymptote pour x > 1, en dessous pour x &lt; 1', note: 'Esquisse', noEq: true },
      ],
    },
  }),
  S('g6-param-tangent', 12.5, {
    prereqs: ['g6-tangent', 'g6-limits'], icon: '(ẋ;ẏ)', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Arcs paramétrés : vitesse, tangente, points stationnaires',
    desc: 'Pente ẏ/ẋ, tangentes horizontales et verticales, points stationnaires.',
    prereqWhy: { 'g6-tangent': 'écrire la tangente en un point', 'g6-limits': 'la pente en un point stationnaire est une limite' },
    intro: {
      rule: 'M(t) = (x(t) ; y(t)), vecteur vitesse (ẋ ; ẏ). Pente de la tangente : ẏ/ẋ.<br>ẋ = 0 et ẏ ≠ 0 : tangente verticale. ẏ = 0 et ẋ ≠ 0 : horizontale. ẋ = ẏ = 0 : point stationnaire ; la pente est la limite de ẏ/ẋ.',
      lines: [
        { html: 'x(t) = t³ − 3t, y(t) = t² − 2t', note: 'Départ', noEq: true },
        { html: 'ẋ = 3t² − 3 = 3(t − 1)(t + 1), ẏ = 2t − 2', note: 'Vitesse', noEq: true },
        { html: 't = −1 : ẋ = 0, ẏ = −4 : tangente verticale en (2 ; 3)', note: 'Classer', noEq: true },
        { html: 't = 1 : ẋ = ẏ = 0 : point stationnaire (−2 ; −1)', note: 'Classer', noEq: true },
        { html: 'ẏ/ẋ = 2(t − 1)/(3(t − 1)(t + 1)) = 2/(3(t + 1)) → 1/3', note: 'Pente limite', noEq: true },
        { html: 'Tangente en (−2 ; −1) : y = x/3 − 1/3, soit x − 3y − 1 = 0', note: 'Tangente', noEq: true },
      ],
    },
  }),
  S('g6-param-branches', 12.5, {
    prereqs: ['g6-param-tangent', 'g6-asymptotes'], icon: '(x;y)→∞', examWeight: 2, exam: ['mcq', 'open'],
    title: 'Arcs paramétrés : branches infinies et esquisse',
    desc: 'Limites de x et de y à chaque borne, asymptotes, branches paraboliques.',
    prereqWhy: { 'g6-param-tangent': 'dérivées x′(t), y′(t) et variations conjointes', 'g6-asymptotes': 'm = lim y/x, h = lim (y − mx)' },
    intro: {
      rule: 'À chaque borne t₀ du domaine (et en ±∞) : x → ∞ et y → ℓ : asymptote horizontale. x → k et y → ∞ : verticale. Les deux → ∞ : m = lim y/x, puis h = lim (y − mx) ; finis : asymptote oblique ; sinon branche parabolique.',
      lines: [
        { html: 'x(t) = t²/(t − 2), y(t) = (t + 1)/(t − 2)', note: 'Départ', noEq: true },
        { html: 'Domaine : t ≠ 2 ; bornes à étudier : ±∞ et 2', note: 'Domaine', noEq: true },
        { html: 't → ±∞ : x → ±∞, y → 1 : asymptote horizontale y = 1', note: 'Borne ±∞', noEq: true },
        { html: 't → 2 : x → ∞ et y → ∞', note: 'Borne 2', noEq: true },
        { html: 'm = lim y/x = lim (t + 1)/t² = 3/4', note: 'Pente', noEq: true },
        { html: 'h = lim (y − (3/4)x) = lim (−3t² + 4t + 4)/(4(t − 2)) = lim −(3t + 2)/4 = −2', note: 'Ordonnée à l\'origine', noEq: true },
        { html: 'Asymptote oblique y = (3/4)x − 2', note: 'Conclure', noEq: true },
      ],
    },
  }),
];
