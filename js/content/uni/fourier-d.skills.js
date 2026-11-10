// Module F, part d (unit `fourier`, step U10): partial differential equations: heat (with and without source), waves, Laplace.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-d.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("f-heat-sep", {
    prereqs: ["f-sine-cosine", "a2-ode-linear1"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Équation de la chaleur par séparation des variables",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-heat-source", {
    prereqs: ["f-heat-sep"],
    icon: '∂',
    examWeight: 2,
    exam: ["open"],
    title: "Problème : chaleur avec terme source",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-wave", {
    prereqs: ["f-heat-sep", "f-ft-table"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Équation des ondes ; d'Alembert par Fourier en x",
    desc: '',
    prereqWhy: {"f-heat-sep": "séparation des variables sur ]0 ; L[", "f-ft-table": "transformée en x (FP8)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-laplace-eq", {
    prereqs: ["f-heat-sep", "f-ft-table", "a2-laplacian-radial"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    title: "Équation de Laplace dans un disque, dans un demi-plan",
    desc: '',
    prereqWhy: {"f-heat-sep": "séparation des variables", "f-ft-table": "demi-plan : transformée de Fourier en y", "a2-laplacian-radial": "laplacien en polaires dans le disque"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
