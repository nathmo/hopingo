// Module F, part a (unit `fourier`, step U10): Fourier series: coefficients, sine and cosine series, Dirichlet, Parseval, relations, the series problem, periodic ODE, Sturm-Liouville.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-a.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("f-coef", {
    prereqs: ["a1-int-parts", "g1-parity-period"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "coef", "open"],
    title: "Coefficients de Fourier, parité, a₀ et petits indices",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-coef-complex", {
    prereqs: ["f-coef", "g8-polar"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Coefficients complexes cₙ d'une somme d'exponentielles",
    desc: '',
    prereqWhy: {"f-coef": "passage aₙ, bₙ ↔ cₙ", "g8-polar": "e^(ikx) = cos kx + i sin kx"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-sine-cosine", {
    prereqs: ["f-coef"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Séries en sinus et en cosinus sur [0 ; L]",
    desc: '',
    prereqWhy: {"f-coef": "même calcul de coefficients, sur le prolongement"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-dirichlet", {
    prereqs: ["f-coef", "a1-fn-onesided", "g5-reindex"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Dirichlet : valeur aux sauts, puis une somme numérique",
    desc: '',
    prereqWhy: {"a1-fn-onesided": "f(x + 0) et f(x − 0)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-parseval", {
    prereqs: ["f-coef"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Parseval et sommes",
    desc: '',
    prereqWhy: {"f-coef": "les aₙ et bₙ à substituer"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-coef-relations", {
    prereqs: ["f-coef"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Relations entre coefficients ; dérivation terme à terme",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-series-problem", {
    prereqs: ["f-sine-cosine", "f-dirichlet"],
    icon: '∂',
    examWeight: 3,
    exam: ["open"],
    title: "Problème : série en sinus, Dirichlet, somme numérique",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-periodic-ode", {
    prereqs: ["f-coef-complex"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    title: "EDO périodique par séries de Fourier",
    desc: '',
    prereqWhy: {"f-coef-complex": "u = Σ cₙe^(int)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-sturm-liouville", {
    prereqs: ["f-sine-cosine", "a2-ode-const2"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Problème de Sturm-Liouville (GM)",
    desc: '',
    prereqWhy: {"f-sine-cosine": "les solutions sin(nπx/L) donnent une série en sinus", "a2-ode-const2": "−u″ = λu : équation caractéristique selon le signe de λ"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
