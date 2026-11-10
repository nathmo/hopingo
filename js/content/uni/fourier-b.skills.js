// Module F, part b (unit `fourier`, step U10): the Fourier transform: definition, table and properties, equations, Plancherel; distributions.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-b.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("f-ft-direct", {
    prereqs: ["a1-improper-calc", "a1-int-parts", "g8-polar"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Transformée de Fourier : définition et calcul direct",
    desc: '',
    prereqWhy: {"a1-improper-calc": "∫ sur ℝ calculée comme une limite", "g8-polar": "e^(−iαy) = cos αy − i sin αy"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-ft-table", {
    prereqs: ["f-ft-direct"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Transformée de Fourier par la table et les propriétés",
    desc: '',
    prereqWhy: {"f-ft-direct": "définition de f̂ et convention 1/√(2π)"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-ft-eq", {
    prereqs: ["f-ft-table", "iso-formula", "rat-operations"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Équations résolues par la transformée de Fourier",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-plancherel", {
    prereqs: ["f-ft-table"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Plancherel",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-distrib-def", {
    prereqs: ["a1-improper-calc"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    tags: ["MT/SV"],
    title: "Distributions : ⟨T_f, φ⟩, δ_a et f·δ_a (MT/SV)",
    desc: '',
    prereqWhy: {"a1-improper-calc": "⟨T_f, φ⟩ = ∫ fφ sur ℝ"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-distrib-deriv", {
    prereqs: ["f-distrib-def", "a1-int-parts"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq", "open"],
    tags: ["MT/SV"],
    title: "Dérivée au sens des distributions (MT/SV)",
    desc: '',
    prereqWhy: {"f-distrib-def": "⟨T, φ⟩ et δ_a"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("f-distrib-eq", {
    prereqs: ["f-distrib-deriv", "f-ft-table"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    tags: ["MT/SV"],
    title: "Équations avec δ ; transformée de Fourier de cos (MT/SV)",
    desc: '',
    prereqWhy: {"f-distrib-deriv": "dérivées avec les δ des sauts", "f-ft-table": "tables de Fourier D1 à D4"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
