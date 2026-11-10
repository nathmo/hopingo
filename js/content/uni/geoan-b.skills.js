// Module G4, géométrie analytique (unit `geoan`), part b: cross and triple
// products, distances, skew lines, spheres. Catalogue:
// docs/universite/G-gymnase-2.md, section G4. Built at step U5.
// Generators: geoan-b.js.

import { parseVec, astML } from '../../cas/vecexpr.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

// Intro lines: points and vectors (V), equations and numbers (C), as MathML.
function V(text) {
  try {
    const inner = text.split('=').map((p) => astML(parseVec(p.trim(), { params: ['t', 's', 'k', 'm'] }))).join('<mo>=</mo>');
    return `<math><mrow>${inner}</mrow></math>`;
  } catch { return text; }
}
const C = (text) => { try { return toMathML(parse(text, { vars: ['x', 'y', 'z'] })); } catch { return text; } };
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

const S = (id, rest) => ({ id, unit: 'geoan', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g4-cross', {
    prereqs: ['g4-dot'], icon: 'u⃗∧v⃗', exam: ['mcq', 'tf', 'coef'],
    title: 'Produit vectoriel, aires',
    desc: 'Trois déterminants 2 × 2 ; aire d\'un parallélogramme, d\'un triangle.',
    prereqWhy: { 'g4-dot': 'contrôler u⃗ ∧ v⃗ ⟂ u⃗ par un produit scalaire' },
    intro: {
      rule: `u⃗ ∧ v⃗ = (u₂v₃ − u₃v₂ ; u₃v₁ − u₁v₃ ; u₁v₂ − u₂v₁) : trois déterminants 2 × 2, le cofacteur du milieu avec un signe −. Il est orthogonal à u⃗ et à v⃗, et ‖u⃗ ∧ v⃗‖ est l'aire du parallélogramme construit sur u⃗ et v⃗.<br>v⃗ ∧ u⃗ = −u⃗ ∧ v⃗. Aire du triangle ABC : ½‖AB⃗ ∧ AC⃗‖.`,
      lines: L([
        [V('u ∧ v = ((-1)·(-2) - 3·0 ; 3·1 - 2·(-2) ; 2·0 - (-1)·1)'), 'u⃗ = (2 ; −1 ; 3), v⃗ = (1 ; 0 ; −2)'],
        [V('u ∧ v = (2 ; 7 ; 1)'), 'Calculer'],
        [V('(2 ; 7 ; 1)·u = 4 - 7 + 3 = 0'), 'Contrôle : orthogonal à u⃗'],
        [C('(1/2)·√54=3√6/2'), 'Aire du triangle : ½‖u⃗ ∧ v⃗‖'],
      ]),
    },
  }),
  S('g4-triple', {
    prereqs: ['g4-cross'], icon: '[u,v,w]', exam: ['mcq', 'tf', 'open'],
    title: 'Produit mixte, volumes, coplanarité',
    desc: '(u⃗ ∧ v⃗)·w⃗, volume d\'un tétraèdre, quatre points coplanaires.',
    prereqWhy: { 'g4-cross': 'le produit vectoriel u⃗ ∧ v⃗' },
    intro: {
      rule: `[u⃗, v⃗, w⃗] = (u⃗ ∧ v⃗)·w⃗ = det(u⃗, v⃗, w⃗). Volume du parallélépipède : |[u⃗, v⃗, w⃗]|. Volume du tétraèdre ABCD : |[AB⃗, AC⃗, AD⃗]|/6.<br>Quatre points sont coplanaires si et seulement si le produit mixte est nul.`,
      lines: L([
        [V('AB = (2 ; 1 ; 1)'), 'A(1 ; 1 ; 0), B(3 ; 2 ; 1), C(2 ; 4 ; 1), D(1 ; 2 ; 5) ; AC⃗ = (1 ; 3 ; 1), AD⃗ = (0 ; 1 ; 5)'],
        [V('AB ∧ AC = (-2 ; -1 ; 5)'), 'Produit vectoriel'],
        [V('(-2 ; -1 ; 5)·(0 ; 1 ; 5) = 24'), 'Produit mixte'],
        [V('V = |24|/6 = 4'), 'Le tétraèdre : le sixième'],
      ]),
    },
  }),
  S('g4-dist-point', {
    prereqs: ['g4-plane', 'g4-dot'], icon: 'd(P,π)', year: 12, examWeight: 2, exam: ['mcq', 'tf', 'coef', 'open'],
    title: 'Distance d\'un point à un plan ou à une droite, pied de la perpendiculaire',
    desc: '|ax₀ + by₀ + cz₀ + d|/‖n⃗‖ ; le pied H par projection.',
    prereqWhy: { 'g4-plane': 'la normale n⃗ lue sur l\'équation du plan', 'g4-dot': 'projeter AP⃗ sur la direction de la droite' },
    intro: {
      rule: `Point-plan : d = |ax₀ + by₀ + cz₀ + d|/‖n⃗‖, et le pied H = P − ((ax₀ + by₀ + cz₀ + d)/‖n⃗‖²)·n⃗.<br>Point-droite (A, v⃗) : H = A + t·v⃗ avec t = AP⃗·v⃗/‖v⃗‖², puis d = PH.`,
      lines: L([
        [C('2·5-0+2·4-9=9'), 'P(5 ; 0 ; 4), plan 2x − y + 2z − 9 = 0'],
        [V('d = |9|/√(4 + 1 + 4) = 3'), 'Diviser par ‖n⃗‖'],
        [V('H = P - (9/9)·(2 ; -1 ; 2) = (3 ; 1 ; 2)'), 'Le pied : diviser par ‖n⃗‖²'],
        [C('2·3-1+2·2-9=0'), 'Contrôle : H est dans le plan'],
      ]),
    },
  }),
  S('g4-dist-skew', {
    prereqs: ['g4-triple', 'g4-relative-pos'], icon: 'd(d₁,d₂)', exam: ['mcq', 'tf', 'open'],
    title: 'Distance entre deux droites gauches',
    desc: '|AB⃗·(u⃗ ∧ v⃗)|/‖u⃗ ∧ v⃗‖.',
    prereqWhy: { 'g4-triple': 'le produit mixte [AB⃗, u⃗, v⃗]', 'g4-relative-pos': 'vérifier d\'abord que les droites sont gauches' },
    intro: {
      rule: `d₁ = (A, u⃗) et d₂ = (B, v⃗), gauches. n⃗ = u⃗ ∧ v⃗ est orthogonal aux deux droites, et d = |AB⃗·n⃗|/‖n⃗‖ = |[AB⃗, u⃗, v⃗]|/‖u⃗ ∧ v⃗‖.<br>Si le produit mixte est nul, les droites ne sont pas gauches.`,
      lines: L([
        [V('n = (2 ; -1 ; 0) ∧ (2 ; 0 ; -1) = (1 ; 2 ; 2)'), 'd₁ : (−1 ; 1 ; 0) + s(2 ; −1 ; 0), d₂ : (4 ; 2 ; 1) + t(2 ; 0 ; −1)'],
        [V('AB = (5 ; 1 ; 1)'), 'Entre les points de base'],
        [V('AB·n = 5 + 2 + 2 = 9'), '9 ≠ 0 : gauches'],
        [V('d = 9/3 = 3'), 'Diviser par ‖n⃗‖'],
      ]),
    },
  }),
  S('g4-common-perp', {
    prereqs: ['g4-dist-skew'], icon: '⟂⟂', exam: ['coef', 'open'],
    title: 'Perpendiculaire commune à deux droites gauches',
    desc: 'PQ⃗ ⟂ u⃗ et PQ⃗ ⟂ v⃗ : un système en s et t.',
    prereqWhy: { 'g4-dist-skew': 'contrôle : ‖PQ⃗‖ est la distance des deux droites' },
    intro: {
      rule: `P = A + s·u⃗ sur d₁, Q = B + t·v⃗ sur d₂, avec <b>deux paramètres différents</b>. (PQ) est la perpendiculaire commune si PQ⃗·u⃗ = 0 <b>et</b> PQ⃗·v⃗ = 0 : un système en s et t.<br>Contrôle : ‖PQ⃗‖ est la distance des deux droites.`,
      lines: L([
        [V('PQ = (5 + 2t - 2s ; 1 + s ; 1 - t)'), 'Mêmes droites que pour la distance'],
        [C('9+4t-5s=0'), 'PQ⃗·u⃗ = 0'],
        [C('9+5t-4s=0'), 'PQ⃗·v⃗ = 0'],
        [C('s=1'), 'puis t = −1'],
        [V('P = (1 ; 0 ; 0)'), 'et Q = (2 ; 2 ; 2) ; ‖PQ⃗‖ = 3'],
      ]),
    },
  }),
  S('g4-line-two-skew', {
    prereqs: ['g4-relative-pos', 'g4-cross'], icon: 'n ∩ a, b', exam: ['mcq', 'open'],
    title: 'Droite qui s\'appuie sur deux droites gauches',
    desc: 'Un plan par a de direction w⃗, puis son intersection avec b.',
    prereqWhy: { 'g4-relative-pos': 'l\'intersection du plan π avec la droite b', 'g4-cross': 'la normale de π : u⃗ ∧ w⃗' },
    intro: {
      rule: `On cherche n, de direction w⃗, qui coupe a et b. Le plan π contient a et la direction w⃗ (normale u⃗ ∧ w⃗) ; Q = π ∩ b ; n passe par Q avec la direction w⃗.<br>Aucune solution si b est parallèle à π sans y être, une infinité si b ⊂ π.`,
      lines: L([
        [V('(1 ; 0 ; 1) ∧ (1 ; -1 ; 2) = (1 ; -1 ; -1)'), 'a : (−1 ; 2 ; −2) + s(1 ; 0 ; 1), w⃗ = (1 ; −1 ; 2)'],
        [C('x-y-z+1=0'), 'π contient a, de direction w⃗'],
        [C('2-(2+t)-(3+t)+1=0'), 'b : (2 ; 2 ; 3) + t(0 ; 1 ; 1) dans π : t = −1'],
        [V('Q = (2 ; 1 ; 2)'), 'π ∩ b'],
        [V('(x ; y ; z) = (2 ; 1 ; 2) + k(1 ; -1 ; 2)'), 'La droite n'],
      ]),
    },
  }),
  S('g4-sphere', {
    prereqs: ['g4-dist-point', 'quad-complete'], icon: '◯³', exam: ['mcq', 'tf', 'open'],
    title: 'Sphères : centre, rayon, plan tangent, section',
    desc: 'Compléter les carrés ; plan tangent ; cercle de section.',
    prereqWhy: { 'g4-dist-point': 'section et tangence : distance du centre au plan', 'quad-complete': 'compléter les carrés en x, y et z' },
    intro: {
      rule: `x² + y² + z² + Dx + Ey + Fz + G = 0 : on complète les carrés. Centre (−D/2 ; −E/2 ; −F/2), r² = (D² + E² + F²)/4 − G, si r² > 0.<br>Plan tangent en T : normale CT⃗. Section par un plan à distance δ < r : un cercle de rayon √(r² − δ²).`,
      lines: L([
        [C('(x-1)^2-1+(y+2)^2-4+(z-3)^2-9+5=0'), 'x² + y² + z² − 2x + 4y − 6z + 5 = 0'],
        [C('(x-1)^2+(y+2)^2+(z-3)^2=9'), 'C(1 ; −2 ; 3), r = 3'],
        [V('CT = (1 ; 2 ; 2)'), 'T(2 ; 0 ; 5)'],
        [C('x+2y+2z-12=0'), 'Plan tangent en T'],
      ]),
    },
  }),
];
