// Module F, part c (unit `fourier`, step U10): the Laplace transform: table, abscissa, inverses, ODE, integro-differential equations, the long problem.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-c.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("f-lap-table", {
    prereqs: ["a1-improper-calc", "g8-polar"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Transformée de Laplace par la table et les propriétés",
    desc: '',
    prereqWhy: {"a1-improper-calc": "F(z) = ∫₀^∞ f(t)e^(−tz) dt", "g8-polar": "e^(iωt), cos ωt et sin ωt dans la table"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-abscissa", {
    prereqs: ["f-lap-table"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Abscisse de convergence",
    desc: '',
    prereqWhy: {"f-lap-table": "demi-plan de chaque ligne de la table"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-inv-des", {
    prereqs: ["f-lap-table", "g0-pfd-general"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Laplace inverse par éléments simples",
    desc: '',
    prereqWhy: {"f-lap-table": "reconnaître chaque terme dans la table"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-inv-res", {
    prereqs: ["c-res-multiple", "c-res-theorem"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Laplace inverse par les résidus",
    desc: '',
    prereqWhy: {"c-res-theorem": "f(t) est la somme de tous les résidus de F(z)e^(zt)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-ode", {
    prereqs: ["f-lap-inv-des"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "EDO avec conditions initiales par Laplace",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-integro", {
    prereqs: ["f-lap-ode"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Équations intégro-différentielles (GM)",
    desc: '',
    prereqWhy: {"f-lap-ode": "même méthode : transformer, isoler, inverser"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-lap-problem", {
    prereqs: ["f-lap-ode", "f-lap-inv-res", "c-arc-estimate"],
    icon: '∂',
    examWeight: 3,
    exam: ["open"],
    title: "Problème : EDO par Laplace, puis inverse par les résidus",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
