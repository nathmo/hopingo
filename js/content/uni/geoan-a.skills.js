// Module G4, géométrie analytique (unit `geoan`), part a: vectors, lines of
// the plane, dot product, bisectors, lines of space, planes, relative
// positions. Catalogue: docs/universite/G-gymnase-2.md, section G4. Built at
// step U5. Generators: geoan-a.js.

const S = (id, rest) => ({ id, unit: 'geoan', year: 12, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g4-vectors', {
    prereqs: ['eq-systems'], icon: 'AB⃗', exam: ['mcq', 'tf', 'open'],
    title: 'Vecteurs : Chasles, combinaisons, colinéarité',
    desc: 'AB⃗ = B − A, milieu, parallélogramme, décomposer un vecteur.',
    prereqWhy: { 'eq-systems': 'décomposer w⃗ = αu⃗ + βv⃗ : un système 2 × 2' },
  }),
  S('g4-line2', {
    prereqs: ['g4-vectors', 'fn-affine', 'eq-systems'], icon: 'ax+by', exam: ['mcq', 'tf', 'open'],
    title: 'Droite du plan : paramétrique, cartésienne, intersection',
    desc: 'A + t·v⃗, ax + by + c = 0, et le point commun de deux droites.',
    prereqWhy: { 'g4-vectors': 'A + t·v⃗ est une combinaison de vecteurs', 'fn-affine': 'pente et ordonnée à l\'origine de y = mx + p', 'eq-systems': 'le point d\'intersection résout un système' },
  }),
  S('g4-dot', {
    prereqs: ['g4-vectors', 'geo-pythagore', 'g3-arc-def'], icon: 'u⃗·v⃗', exam: ['mcq', 'tf', 'coef'],
    title: 'Produit scalaire, angles, projection d\'un vecteur',
    desc: 'u⃗·v⃗ = ‖u⃗‖‖v⃗‖cos θ, angle de deux droites, projection.',
    prereqWhy: { 'g4-vectors': 'les composantes des vecteurs', 'geo-pythagore': 'la norme ‖u⃗‖ = √(u₁² + u₂² + u₃²)', 'g3-arc-def': 'θ = arccos(…)' },
  }),
  S('g4-bisectors', {
    prereqs: ['g4-line2', 'g4-dot', 'g1-abs-eq'], icon: '∠', exam: ['mcq', 'tf', 'open'],
    title: 'Médiatrice et bissectrices',
    desc: 'Distance d\'un point à une droite, points à égale distance.',
    prereqWhy: { 'g4-line2': 'les équations cartésiennes ax + by + c = 0', 'g4-dot': 'la norme du vecteur normal ‖n⃗‖', 'g1-abs-eq': '|A| = |B| donne A = B ou A = −B' },
  }),
  S('g4-line3', {
    prereqs: ['g4-line2'], icon: 'd ⊂ ℝ³', exam: ['mcq', 'tf', 'open'],
    title: 'Droite de l\'espace : paramétrique et cartésienne',
    desc: 'A + t·v⃗, ou deux équations ; on élimine t.',
    prereqWhy: { 'g4-line2': 'même passage paramétrique ↔ cartésienne, avec une coordonnée de plus' },
  }),
  S('g4-plane', {
    prereqs: ['g4-vectors'], icon: 'π', exam: ['mcq', 'tf', 'open'],
    title: 'Plan : par trois points, paramétrique ↔ cartésienne',
    desc: 'Une normale orthogonale aux deux directions, puis la constante.',
    prereqWhy: { 'g4-vectors': 'deux vecteurs directeurs AB⃗ et AC⃗' },
  }),
  S('g4-relative-pos', {
    prereqs: ['g4-plane', 'g4-line3'], icon: '∦', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Positions relatives dans l\'espace',
    desc: 'Droite et plan, deux droites (sécantes, parallèles, gauches), deux plans.',
    prereqWhy: { 'g4-plane': 'l\'équation cartésienne du plan', 'g4-line3': 'la paramétrique de la droite, remplacée dans le plan' },
  }),
];
