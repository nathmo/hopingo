// Module C, part a (unit `cplx`, step U10): elementary functions, equations, Cauchy-Riemann, harmonic conjugates, contour integrals, Cauchy, Taylor, Laurent, singularities.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: cplx-a.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'cplx', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("c-elem-fn", {
    prereqs: ["g8-polar", "g2-hyp-def"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Fonctions élémentaires : e^z, cos z, Log z, z^α",
    desc: '',
    prereqWhy: {"g2-hyp-def": "cos(iy) = cosh y"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-equations", {
    prereqs: ["c-elem-fn", "g8-quadratic"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Équations dans ℂ",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-cauchy-riemann", {
    prereqs: ["c-elem-fn", "a2-partials"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Cauchy-Riemann et holomorphie",
    desc: '',
    prereqWhy: {"c-elem-fn": "u et v de e^z, z² et Log z"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-harmonic-conj", {
    prereqs: ["c-cauchy-riemann"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Construire f holomorphe à partir de v",
    desc: '',
    prereqWhy: {"c-cauchy-riemann": "u_x = v_y et u_y = −v_x"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-contour-param", {
    prereqs: ["c-elem-fn", "v-curve-param"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Intégrales de contour par paramétrisation",
    desc: '',
    prereqWhy: {"c-elem-fn": "e^(it) et fonctions de z évaluées sur le contour"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-cauchy-thm", {
    prereqs: ["c-cauchy-riemann"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Théorème de Cauchy",
    desc: '',
    prereqWhy: {"c-cauchy-riemann": "f holomorphe sur Ω"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-cauchy-formula", {
    prereqs: ["c-cauchy-thm"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Formule intégrale de Cauchy",
    desc: '',
    prereqWhy: {"c-cauchy-thm": "placer les singularités par rapport à Γ"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-taylor", {
    prereqs: ["a1-pow-domain", "a1-ser-geo-tele"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "coef", "open"],
    title: "Série de Taylor et rayon de convergence",
    desc: '',
    prereqWhy: {"a1-ser-geo-tele": "série géométrique 1/(1 − u)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-laurent", {
    prereqs: ["c-taylor", "g0-pfd-simple"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "coef", "open"],
    title: "Série de Laurent dans une couronne donnée",
    desc: '',
    prereqWhy: {"c-taylor": "développer en série autour de z₀"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("c-singularities", {
    prereqs: ["c-laurent", "a1-dl-usual"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Classer les singularités",
    desc: '',
    prereqWhy: {"c-laurent": "lire la plus basse puissance de la série de Laurent"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
