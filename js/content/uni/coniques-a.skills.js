// Module G10, cercles et coniques (unit `coniques`), part a: circles
// (equation, tangents, power and radical axis, pole and polar) and the three
// conics in reduced form. Catalogue: docs/universite/G-gymnase-2.md, section
// G10. Built at step U5. Generators: coniques-a.js.

const S = (id, rest) => ({ id, unit: 'coniques', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g10-circle-eq', {
    prereqs: ['g4-bisectors', 'quad-complete'], icon: '◯', exam: ['mcq', 'tf', 'open'],
    title: 'Cercle : centre, rayon, cercle par trois points',
    desc: 'Compléter les carrés ; le centre est sur les médiatrices.',
    prereqWhy: { 'g4-bisectors': 'le centre du cercle par trois points est sur deux médiatrices', 'quad-complete': 'compléter un carré en x et un en y' },
  }),
  S('g10-circle-tangent', {
    prereqs: ['g10-circle-eq', 'quad-formula'], icon: '◯|', exam: ['mcq', 'tf', 'open'],
    title: 'Tangentes à un cercle',
    desc: 'En un point, ou depuis un point extérieur (sans oublier la verticale).',
    prereqWhy: { 'g10-circle-eq': 'le centre et le rayon du cercle', 'quad-formula': 'l\'équation en m de la pente' },
  }),
  S('g10-power-radical', {
    prereqs: ['g10-circle-eq'], icon: '◯◯', exam: ['mcq', 'tf', 'open'],
    title: 'Puissance d\'un point, axe radical, cercles orthogonaux',
    desc: 'γ(P) = ΩP² − r², γ₁ − γ₂ = 0, Ω₁Ω₂² = r₁² + r₂².',
    prereqWhy: { 'g10-circle-eq': 'les équations normalisées, les centres et les rayons' },
  }),
  S('g10-pole-polar', {
    prereqs: ['g10-circle-tangent'], icon: 'pôle', exam: ['mcq', 'tf', 'open'],
    title: 'Pôle et polaire par rapport à un cercle',
    desc: 'Dédoubler l\'équation ; les points de contact des tangentes.',
    prereqWhy: { 'g10-circle-tangent': 'les tangentes par les points de contact' },
  }),
  S('g10-ellipse', {
    prereqs: ['quad-complete'], icon: '⬭', exam: ['mcq', 'tf', 'coef', 'open'],
    title: 'Ellipse : axes, foyers, excentricité, directrices',
    desc: 'Forme réduite, c² = a² − b², e = c/a.',
    prereqWhy: { 'quad-complete': 'compléter les carrés jusqu\'à la forme réduite' },
  }),
  S('g10-hyperbola', {
    prereqs: ['quad-complete'], icon: ')(', exam: ['mcq', 'tf', 'open'],
    title: 'Hyperbole : foyers, asymptotes, directrices',
    desc: 'Forme réduite, c² = a² + b², asymptotes y − k = ±(b/a)(x − h).',
    prereqWhy: { 'quad-complete': 'compléter les carrés jusqu\'à la forme réduite' },
  }),
  S('g10-parabola', {
    prereqs: ['quad-complete'], icon: '∪', exam: ['mcq', 'tf', 'open'],
    title: 'Parabole : sommet, foyer, directrice',
    desc: '(x − h)² = 2p(y − k) : le foyer est à p/2 du sommet.',
    prereqWhy: { 'quad-complete': 'compléter le carré jusqu\'à la forme réduite' },
  }),
];
