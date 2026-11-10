// Module G10, cercles et coniques (unit `coniques`), part a: circles
// (equation, tangents, power and radical axis, pole and polar) and the three
// conics in reduced form. Catalogue: docs/universite/G-gymnase-2.md, section
// G10. Built at step U5. Generators: coniques-a.js.

import { readWith, showWith } from '../../judges/index.js';

// A line shown as its judge shows it (intro examples).
function J(kind, text, cfg = {}) {
  const c = { kind, ...cfg };
  try { return showWith(c, readWith(c, text)); } catch { return text; }
}
const G = (t) => J('geom', t, { object: 'line2' });
const C = (t, eq = 'x^2+y^2-1=0') => J('conic', t, { equation: eq });
const V = (t) => J('vector', t);
const Lx = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

const S = (id, rest) => ({ id, unit: 'coniques', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g10-circle-eq', {
    prereqs: ['g4-bisectors', 'quad-complete'], icon: '◯', exam: ['mcq', 'tf', 'open'],
    title: 'Cercle : centre, rayon, cercle par trois points',
    desc: 'Compléter les carrés ; le centre est sur les médiatrices.',
    prereqWhy: { 'g4-bisectors': 'le centre du cercle par trois points est sur deux médiatrices', 'quad-complete': 'compléter un carré en x et un en y' },
    intro: {
      rule: 'On divise par le coefficient de x² (le même que celui de y², sans terme en xy), puis on complète les carrés : (x − h)² + (y − k)² = r². Le centre est Ω = (h ; k), le rayon r.<br>Si le second membre est nul, c’est le point Ω ; s’il est négatif, l’ensemble est vide. Par trois points : le centre est l’intersection de deux médiatrices.',
      lines: Lx([
        [C('2x^2 + 2y^2 - 8x + 12y - 24 = 0'), 'Le cercle'],
        [C('x^2 + y^2 - 4x + 6y - 12 = 0'), 'Diviser par 2'],
        [C('(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0'), 'Compléter les carrés : on retire 4 et 9'],
        [C('(x - 2)^2 + (y + 3)^2 = 25'), 'Forme réduite'],
        [V('Ω = (2 ; -3)'), 'Le centre ; r = √25 = 5'],
      ]),
    },
  }),
  S('g10-circle-tangent', {
    prereqs: ['g10-circle-eq', 'quad-formula'], icon: '◯|', exam: ['mcq', 'tf', 'open'],
    title: 'Tangentes à un cercle',
    desc: 'En un point, ou depuis un point extérieur (sans oublier la verticale).',
    prereqWhy: { 'g10-circle-eq': 'le centre et le rayon du cercle', 'quad-formula': 'l\'équation en m de la pente' },
    intro: {
      rule: 'En un point T du cercle, on <b>dédouble</b> : (x_T − h)(x − h) + (y_T − k)(y − k) = r². Depuis un point Q extérieur, une droite est tangente si sa distance au centre vaut r.<br><b>On teste d’abord la droite verticale</b> x = x_Q, puis les droites y − y_Q = m(x − x_Q).',
      lines: Lx([
        [C('(x - 2)^2 + (y + 3)^2 = 25'), 'Le cercle ; Q(−3 ; 7) est extérieur : ΩQ² = 125 > 25'],
        [G('x = -3'), 'Sa distance au centre vaut |−3 − 2| = 5 = r : tangente'],
        [J('solset', '|5m + 10|/√(m^2 + 1) = 5', { v: 'm' }), 'Les autres : distance au centre = r'],
        [J('solset', 'm = -3/4', { v: 'm' }), 'Élever au carré : 100m = −75'],
        [G('3x + 4y - 19 = 0 ou x = -3'), 'Les deux tangentes'],
      ]),
    },
  }),
  S('g10-power-radical', {
    prereqs: ['g10-circle-eq'], icon: '◯◯', exam: ['mcq', 'tf', 'open'],
    title: 'Puissance d\'un point, axe radical, cercles orthogonaux',
    desc: 'γ(P) = ΩP² − r², γ₁ − γ₂ = 0, Ω₁Ω₂² = r₁² + r₂².',
    prereqWhy: { 'g10-circle-eq': 'les équations normalisées, les centres et les rayons' },
    intro: {
      rule: 'Avec l’équation <b>normalisée</b> γ(x, y) = x² + y² + Dx + Ey + F, la puissance de P est γ(P) = ΩP² − r² : négative à l’intérieur, positive à l’extérieur.<br>L’axe radical de γ₁ et γ₂ est γ₁ − γ₂ = 0, une droite perpendiculaire à Ω₁Ω₂. γ₁ et γ₂ sont orthogonaux si Ω₁Ω₂² = r₁² + r₂².',
      lines: Lx([
        [G('(x^2 + y^2 - 4x - 2y - 4) - (x^2 + y^2 + 2x - 6y + 6) = 0'), 'γ₁ − γ₂ : les carrés disparaissent'],
        [G('3x - 2y + 5 = 0'), 'L’axe radical'],
        ['Ω₁Ω₂² = (−1 − 2)² + (3 − 1)² = 13', 'Ω₁ = (2 ; 1), r₁ = 3 ; Ω₂ = (−1 ; 3), r₂ = 2'],
        ['13 = 9 + 4 = r₁² + r₂²', 'Les cercles sont orthogonaux'],
      ]),
    },
  }),
  S('g10-pole-polar', {
    prereqs: ['g10-circle-tangent'], icon: 'pôle', exam: ['mcq', 'tf', 'open'],
    title: 'Pôle et polaire par rapport à un cercle',
    desc: 'Dédoubler l\'équation ; les points de contact des tangentes.',
    prereqWhy: { 'g10-circle-tangent': 'les tangentes par les points de contact' },
    intro: {
      rule: 'La polaire de P(x₀ ; y₀) par rapport à (x − h)² + (y − k)² = r² est (x₀ − h)(x − h) + (y₀ − k)(y − k) = r² (on dédouble). Si P est extérieur, c’est la droite des points de contact des tangentes issues de P.<br>Le pôle d’une droite se trouve en identifiant les coefficients.',
      lines: Lx([
        [C('(x - 1)^2 + (y + 2)^2 = 5'), 'Le cercle, P(4 ; −1)'],
        [G('3(x - 1) + 1(y + 2) = 5'), 'Dédoubler'],
        [G('3x + y - 6 = 0'), 'La polaire'],
        [J('solset', 'x^2 - 5x + 6 = 0'), 'y = 6 − 3x dans le cercle'],
        [V('T_1 = (2 ; 0)'), 'Et T₂ = (3 ; −3) : les points de contact'],
        [G('x + 2y - 2 = 0 ou 2x - y - 9 = 0'), 'Les tangentes (PT₁) et (PT₂)'],
      ]),
    },
  }),
  S('g10-ellipse', {
    prereqs: ['quad-complete'], icon: '⬭', exam: ['mcq', 'tf', 'coef', 'open'],
    title: 'Ellipse : axes, foyers, excentricité, directrices',
    desc: 'Forme réduite, c² = a² − b², e = c/a.',
    prereqWhy: { 'quad-complete': 'compléter les carrés jusqu\'à la forme réduite' },
    intro: {
      rule: 'On complète les carrés jusqu’à (x − h)²/A + (y − k)²/B = 1. Le grand axe est du côté du <b>plus grand</b> dénominateur, a² ; c² = a² − b² ; e = c/a < 1 ; les directrices sont à a²/c du centre, perpendiculaires au grand axe.',
      lines: Lx([
        [C('4x^2 + 9y^2 - 16x + 54y + 61 = 0'), 'L’ellipse'],
        [C('4(x - 2)^2 - 16 + 9(y + 3)^2 - 81 + 61 = 0'), 'Compléter les carrés'],
        [C('(x - 2)^2/9 + (y + 3)^2/4 = 1'), 'Diviser par 36'],
        [C('Ω = (2 ; -3) ; a = 3 ; b = 2'), 'Grand axe horizontal'],
        [C('F = (2 + √5 ; -3) ; e = √5/3'), 'c² = 9 − 4 = 5 ; F′ = (2 − √5 ; −3)'],
      ]),
    },
  }),
  S('g10-hyperbola', {
    prereqs: ['quad-complete'], icon: ')(', exam: ['mcq', 'tf', 'open'],
    title: 'Hyperbole : foyers, asymptotes, directrices',
    desc: 'Forme réduite, c² = a² + b², asymptotes y − k = ±(b/a)(x − h).',
    prereqWhy: { 'quad-complete': 'compléter les carrés jusqu\'à la forme réduite' },
    intro: {
      rule: 'Forme réduite (x − h)²/a² − (y − k)²/b² = 1 (axe réel horizontal) ou (y − k)²/a² − (x − h)²/b² = 1 (vertical) : on regarde <b>le terme positif quand le second membre vaut +1</b>. c² = a² + b², e = c/a > 1, asymptotes y − k = ±(b/a)(x − h) pour l’axe réel horizontal.',
      lines: Lx([
        [C('9x^2 - 16y^2 - 18x - 64y - 199 = 0'), 'L’hyperbole'],
        [C('9(x - 1)^2 - 9 - 16(y + 2)^2 + 64 - 199 = 0'), 'Compléter les carrés'],
        [C('(x - 1)^2/16 - (y + 2)^2/9 = 1'), 'Diviser par 144'],
        [C('Ω = (1 ; -2) ; a = 4 ; b = 3 ; c = 5'), 'Axe réel horizontal'],
        [C('F = (6 ; -2) ; F′ = (-4 ; -2)'), 'e = 5/4'],
        [C('asymptotes : 3x - 4y - 11 = 0 ou 3x + 4y + 5 = 0'), 'y + 2 = ±(3/4)(x − 1)'],
      ]),
    },
  }),
  S('g10-parabola', {
    prereqs: ['quad-complete'], icon: '∪', exam: ['mcq', 'tf', 'open'],
    title: 'Parabole : sommet, foyer, directrice',
    desc: '(x − h)² = 2p(y − k) : le foyer est à p/2 du sommet.',
    prereqWhy: { 'quad-complete': 'compléter le carré jusqu\'à la forme réduite' },
    intro: {
      rule: 'On écrit (x − h)² = 2p(y − k) (axe vertical) ou (y − k)² = 2p(x − h) (axe horizontal). Le sommet est S = (h ; k). Le foyer est à <b>p/2</b> du sommet, la directrice à p/2 de l’autre côté : tout point est à égale distance des deux.',
      lines: Lx([
        [C('x^2 - 6x - 8y + 1 = 0'), 'La parabole'],
        [C('(x - 3)^2 - 9 - 8y + 1 = 0'), 'Compléter le carré'],
        [C('(x - 3)^2 = 8(y + 1)'), '2p = 8, p = 4'],
        [C('S = (3 ; -1) ; axe : x = 3'), 'Le sommet et l’axe'],
        [C('F = (3 ; 1) ; directrice : y = -3'), 'À p/2 = 2 du sommet'],
      ]),
    },
  }),
];
