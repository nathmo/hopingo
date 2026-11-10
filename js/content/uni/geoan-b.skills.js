// Module G4, géométrie analytique (unit `geoan`), part b: cross and triple
// products, distances, skew lines, spheres. Catalogue:
// docs/universite/G-gymnase-2.md, section G4. Built at step U5.
// Generators: geoan-b.js.

const S = (id, rest) => ({ id, unit: 'geoan', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g4-cross', {
    prereqs: ['g4-dot'], icon: 'u⃗∧v⃗', exam: ['mcq', 'tf', 'coef'],
    title: 'Produit vectoriel, aires',
    desc: 'Trois déterminants 2 × 2 ; aire d\'un parallélogramme, d\'un triangle.',
    prereqWhy: { 'g4-dot': 'contrôler u⃗ ∧ v⃗ ⟂ u⃗ par un produit scalaire' },
  }),
  S('g4-triple', {
    prereqs: ['g4-cross'], icon: '[u,v,w]', exam: ['mcq', 'tf', 'open'],
    title: 'Produit mixte, volumes, coplanarité',
    desc: '(u⃗ ∧ v⃗)·w⃗, volume d\'un tétraèdre, quatre points coplanaires.',
    prereqWhy: { 'g4-cross': 'le produit vectoriel u⃗ ∧ v⃗' },
  }),
  S('g4-dist-point', {
    prereqs: ['g4-plane', 'g4-dot'], icon: 'd(P,π)', year: 12, examWeight: 2, exam: ['mcq', 'tf', 'coef', 'open'],
    title: 'Distance d\'un point à un plan ou à une droite, pied de la perpendiculaire',
    desc: '|ax₀ + by₀ + cz₀ + d|/‖n⃗‖ ; le pied H par projection.',
    prereqWhy: { 'g4-plane': 'la normale n⃗ lue sur l\'équation du plan', 'g4-dot': 'projeter AP⃗ sur la direction de la droite' },
  }),
  S('g4-dist-skew', {
    prereqs: ['g4-triple', 'g4-relative-pos'], icon: 'd(d₁,d₂)', exam: ['mcq', 'tf', 'open'],
    title: 'Distance entre deux droites gauches',
    desc: '|AB⃗·(u⃗ ∧ v⃗)|/‖u⃗ ∧ v⃗‖.',
    prereqWhy: { 'g4-triple': 'le produit mixte [AB⃗, u⃗, v⃗]', 'g4-relative-pos': 'vérifier d\'abord que les droites sont gauches' },
  }),
  S('g4-common-perp', {
    prereqs: ['g4-dist-skew'], icon: '⟂⟂', exam: ['coef', 'open'],
    title: 'Perpendiculaire commune à deux droites gauches',
    desc: 'PQ⃗ ⟂ u⃗ et PQ⃗ ⟂ v⃗ : un système en s et t.',
    prereqWhy: { 'g4-dist-skew': 'contrôle : ‖PQ⃗‖ est la distance des deux droites' },
  }),
  S('g4-line-two-skew', {
    prereqs: ['g4-relative-pos', 'g4-cross'], icon: 'n ∩ a, b', exam: ['mcq', 'open'],
    title: 'Droite qui s\'appuie sur deux droites gauches',
    desc: 'Un plan par a de direction w⃗, puis son intersection avec b.',
    prereqWhy: { 'g4-relative-pos': 'l\'intersection du plan π avec la droite b', 'g4-cross': 'la normale de π : u⃗ ∧ w⃗' },
  }),
  S('g4-sphere', {
    prereqs: ['g4-dist-point', 'quad-complete'], icon: '◯³', exam: ['mcq', 'tf', 'open'],
    title: 'Sphères : centre, rayon, plan tangent, section',
    desc: 'Compléter les carrés ; plan tangent ; cercle de section.',
    prereqWhy: { 'g4-dist-point': 'section et tangence : distance du centre au plan', 'quad-complete': 'compléter les carrés en x, y et z' },
  }),
];
