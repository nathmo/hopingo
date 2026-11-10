// Module V, part a (unit `vecto`, step U10): operators, identities, curves and line integrals, domains, potentials.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: vecto-a.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'vecto', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("v-ops", {
    prereqs: ["a2-partials", "g4-cross"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Gradient, divergence, rotationnel, laplacien",
    desc: '',
    prereqWhy: {"g4-cross": "rot F s'écrit comme le déterminant symbolique de u ∧ v"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-identities", {
    prereqs: ["v-ops"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Identités des opérateurs",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-curve-param", {
    prereqs: ["a2-curve-param"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Paramétrer une courbe orientée",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-line-scalar", {
    prereqs: ["v-curve-param", "a1-int-direct"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Intégrale curviligne d'un champ scalaire ∫ f dl",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-line-vector", {
    prereqs: ["v-curve-param", "a1-int-direct"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Travail ∫ F · dl et orientation",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-domain-topo", {
    prereqs: ["a2-rn-topology"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Convexe, étoilé, simplement connexe",
    desc: '',
    prereqWhy: {"a2-rn-topology": "ouverts de ℝ² et ℝ³"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-pot-test", {
    prereqs: ["v-ops", "v-domain-topo"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Le test rot F = 0 et son domaine",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-pot-find", {
    prereqs: ["v-pot-test", "a1-int-direct"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Trouver un potentiel pas à pas",
    desc: '',
    prereqWhy: {"v-pot-test": "vérifier rot F = 0 sur un domaine adapté avant de chercher φ"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-pot-lambda", {
    prereqs: ["v-pot-find"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Potentiel avec un paramètre λ",
    desc: '',
    prereqWhy: {"v-pot-find": "une fois λ trouvé, on construit φ"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-pot-none", {
    prereqs: ["v-line-vector", "v-pot-test"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Prouver qu'il n'y a pas de potentiel",
    desc: '',
    prereqWhy: {"v-pot-test": "rot F = 0 ne suffit pas sur un domaine troué"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-pot-domain", {
    prereqs: ["v-pot-none", "v-pot-find"],
    icon: '∂',
    examWeight: 2,
    exam: ["open"],
    title: "Problème : potentiel et discussion du domaine",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
