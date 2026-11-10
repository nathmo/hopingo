// Module V, part b (unit `vecto`, step U10): Green, surfaces, flux, oriented boundaries, divergence and Stokes theorems, short proofs.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: vecto-b.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'vecto', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });
void L;

export const SKILLS = [
  S("v-green", {
    prereqs: ["v-line-vector", "v-ops", "a2-fubini-rect", "a2-polar-int"],
    icon: '∂',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Théorème de Green et calcul d'une aire",
    desc: '',
    prereqWhy: {"v-line-vector": "le membre ∮ F · dl est un travail", "v-ops": "rot F scalaire en 2D", "a2-polar-int": "domaines en disque : ∬ en polaires"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-green-flux", {
    prereqs: ["v-green"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Forme flux de Green : ∮ F · ν dl = ∬ div F",
    desc: '',
    prereqWhy: {"v-green": "même théorème, sous forme de flux"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-surf-param", {
    prereqs: ["a2-cyl-sph", "g4-cross"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Paramétrer une surface ; normale σ_u ∧ σ_v",
    desc: '',
    prereqWhy: {"a2-cyl-sph": "sphère et cylindre paramétrés par les coordonnées sphériques et cylindriques"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-surf-area", {
    prereqs: ["v-surf-param", "a2-fubini-rect"],
    icon: '∂',
    examWeight: 1,
    exam: ["mcq"],
    title: "Aire d'une surface et intégrale ∬ f ds",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-flux", {
    prereqs: ["v-surf-param"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Flux ∬ F · ds",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-boundary", {
    prereqs: ["v-surf-param", "v-curve-param"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Bord orienté ∂Σ = σ(∂A)",
    desc: '',
    prereqWhy: {"v-surf-param": "σ et le domaine A des paramètres", "v-curve-param": "paramétrer chaque morceau du bord"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-div-thm", {
    prereqs: ["v-flux", "v-ops", "a2-cyl-sph"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Théorème de la divergence",
    desc: '',
    prereqWhy: {"v-flux": "le membre de droite est un flux"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-stokes", {
    prereqs: ["v-flux", "v-boundary", "v-line-vector", "v-ops"],
    icon: '∂',
    examWeight: 2,
    exam: ["mcq"],
    title: "Théorème de Stokes",
    desc: '',
    prereqWhy: {"v-boundary": "le bord σ(∂A) et son orientation"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-verify-stokes", {
    prereqs: ["v-stokes"],
    icon: '∂',
    examWeight: 3,
    exam: ["open"],
    title: "Problème : vérifier le théorème de Stokes",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-verify-div", {
    prereqs: ["v-div-thm"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    title: "Problème : vérifier le théorème de la divergence",
    desc: '',
    intro: { rule: 'À écrire.', lines: [] },
  }),
  S("v-proof-identity", {
    prereqs: ["v-identities", "v-pot-test", "a2-chain", "g9-proof-contra"],
    icon: '∂',
    examWeight: 1,
    exam: ["open"],
    title: "Petites preuves (3 points)",
    desc: '',
    prereqWhy: {"v-identities": "identités rot grad = 0 et div rot = 0", "v-pot-test": "citer : rot F = 0 sur un convexe ⇒ potentiel", "g9-proof-contra": "rédiger une preuve directe"},
    intro: { rule: 'À écrire.', lines: [] },
  }),
];
