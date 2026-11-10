// Module G10, cercles et coniques (unit `coniques`), part b: conics from
// their elements, tangents, the nature of a conic (the decision tree),
// reduction with a term in xy, back to the first frame and sketch, families,
// loci, homogeneous coordinates. Catalogue: docs/universite/G-gymnase-2.md,
// section G10. Built at step U5. Generators: coniques-b.js.

const S = (id, rest) => ({ id, unit: 'coniques', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g10-conic-from-data', {
    prereqs: ['g10-hyperbola', 'g10-parabola', 'g1-irr-eq', 'g10-ellipse'], icon: 'MF=e·d', exam: ['mcq', 'open'],
    title: 'Trouver l\'équation d\'une conique à partir de ses éléments',
    desc: 'MF = e·d(M, D), élever au carré, reconnaître.',
    prereqWhy: { 'g10-hyperbola': 'reconnaître une hyperbole (e > 1)', 'g10-parabola': 'reconnaître une parabole (e = 1)', 'g1-irr-eq': 'élever au carré une égalité de racines', 'g10-ellipse': 'reconnaître une ellipse (e < 1)' },
  }),
  S('g10-conic-tangent', {
    prereqs: ['g10-pole-polar', 'g10-ellipse', 'g10-hyperbola', 'g10-parabola'], icon: '⬭|', exam: ['mcq', 'open'],
    title: 'Tangentes à une conique',
    desc: 'Dédoubler en T ; depuis un point, la polaire.',
    prereqWhy: { 'g10-pole-polar': 'le dédoublement et la polaire', 'g10-ellipse': 'le point de contact sur une ellipse', 'g10-hyperbola': 'dédoubler l\'équation d\'une hyperbole', 'g10-parabola': 'dédoubler l\'équation d\'une parabole' },
  }),
  S('g10-conic-nature', {
    prereqs: ['g10-hyperbola', 'g10-parabola', 'g4-triple'], icon: 'δ Δ', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Choisir la méthode : nature d\'une conique',
    desc: 'Δ = det M, puis δ = det A : ellipse, hyperbole, parabole, dégénérée.',
    prereqWhy: { 'g10-hyperbola': 'conclure au genre hyperbole', 'g10-parabola': 'conclure au genre parabole', 'g4-triple': 'le déterminant 3 × 3 de M' },
  }),
  S('g10-conic-reduce', {
    prereqs: ['g10-conic-nature', 'l-eig-charpoly', 'l-eig-space', 'eq-systems'], icon: 'λX²+μY²', examWeight: 2, exam: ['coef', 'open'],
    title: 'Réduire une conique avec un terme en xy',
    desc: 'Valeurs et vecteurs propres de A, centre, constante f(Ω).',
    prereqWhy: { 'g10-conic-nature': 'la nature dit s\'il y a un centre', 'l-eig-charpoly': 'les valeurs propres de A', 'l-eig-space': 'les vecteurs propres, normés', 'eq-systems': 'le centre résout ∂f/∂x = ∂f/∂y = 0' },
  }),
  S('g10-conic-frame-back', {
    prereqs: ['g10-conic-reduce', 'g10-ellipse'], icon: 'Ru → Re', exam: ['mcq', 'coef', 'open'],
    title: 'Revenir au repère initial ; esquisser',
    desc: 'Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂.',
    prereqWhy: { 'g10-conic-reduce': 'le repère Ru vient de la réduction', 'g10-ellipse': 'les foyers et les sommets dans Ru' },
  }),
  S('g10-conic-family', {
    prereqs: ['g10-conic-nature', 'param-quadratic'], icon: 'F_m', exam: ['mcq', 'open'],
    title: 'Familles de coniques à paramètre, lieu des centres',
    desc: 'Le genre selon m ; éliminer m entre les équations du centre.',
    prereqWhy: { 'g10-conic-nature': 'le genre se lit sur δ', 'param-quadratic': 'le signe d\'un trinôme en m' },
  }),
  S('g10-locus', {
    prereqs: ['g1-irr-eq', 'g10-ellipse'], icon: 'lieu', exam: ['mcq', 'open'],
    title: 'Lieux géométriques qui donnent une conique',
    desc: 'Traduire la condition, élever au carré avec sa condition, reconnaître.',
    prereqWhy: { 'g1-irr-eq': 'élever au carré une équation avec des racines', 'g10-ellipse': 'reconnaître la conique obtenue' },
  }),
  S('g10-homogeneous', {
    prereqs: ['g10-conic-nature'], icon: '(x:y:t)', tags: ['opt'], examWeight: 0, exam: ['mcq'],
    title: 'Coordonnées homogènes, points à l\'infini',
    desc: 'x → x/t, y → y/t ; les points à l\'infini ont t = 0.',
    prereqWhy: { 'g10-conic-nature': 'le genre se lit sur les points à l\'infini' },
  }),
];
