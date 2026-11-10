// Module A2, part g (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-polar-int", {
    prereqs: ["a2-change-var", "g3-identities"], icon: '', examWeight: 2, exam: ["mcq"],
    title: "Intégrales doubles en coordonnées polaires",
    desc: '',
    prereqWhy: {"g3-identities": "∫ cos²φ et sin²φ par l'angle double"},
    intro: { rule: "dx dy = r dr dφ (le <b>r</b> est le jacobien). Domaines naturels : disques, anneaux, secteurs (0 ≤ y ≤ x donne 0 ≤ φ ≤ π/4).", lines: [] },
  }),
  S("a2-cyl-sph", {
    prereqs: ["a2-polar-int", "a2-triple-int"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Coordonnées cylindriques et sphériques",
    desc: '',
    prereqWhy: {"a2-polar-int": "r dr dφ en cylindriques", "a2-triple-int": "bornes d'une intégrale triple"},
    intro: { rule: "Cylindriques : dV = r dr dφ dz. Sphériques, avec <b>θ mesuré depuis l'axe z</b> : x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ, dV = r² sin θ dr dθ dφ. Le cône z ≥ √(x² + y²) devient θ ≤ π/4 ; z ≥ 0 devient θ ≤ π/2.", lines: [] },
  }),
  S("a2-improper-multi", {
    prereqs: ["a2-polar-int", "a2-cyl-sph", "a1-improper-calc"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Intégrales impropres sur ℝ² et ℝ³ ; intégrale de Gauss",
    desc: '',
    prereqWhy: {"a2-cyl-sph": "boules de ℝ³ en sphériques"},
    intro: { rule: "Pour f ≥ 0, on intègre sur des boules B_R et on fait R → ∞ (ou ε → 0 près d'une singularité). En polaires ou en sphériques, le jacobien change le critère : ∫_{‖x‖ ≥ 1} ‖x‖^{−α} converge si et seulement si <b>α > n</b> ; ∫_{‖x‖ ≤ 1} ‖x‖^{−α} converge si et seulement si <b>α < n</b>. Gauss : ∬_{ℝ²} e^{−(x² + y²)} = π, donc ∫_ℝ e^{−x²} dx = √π.", lines: [] },
  }),
  S("a2-volume", {
    prereqs: ["a2-polar-int"], icon: '', examWeight: 1, exam: ["mcq"],
    title: "Volumes",
    desc: '',
    intro: { rule: "Le volume de D est ∭_D 1 dV. Si D est entre deux surfaces z = g(x, y) ≤ z = h(x, y) au-dessus de la région R, Vol = ∬_R (h − g) dx dy. On trouve R en égalant les deux surfaces.", lines: [] },
  }),
  S("a2-mass-center", {
    prereqs: ["a2-polar-int"], icon: '', examWeight: 0, exam: [],
    tags: ["opt"],
    title: "Masse et centre de masse",
    desc: '',
    intro: { rule: "Masse M = ∬_D ρ. Centre de masse x̄ = (1/M)∬_D x ρ, ȳ = (1/M)∬_D y ρ. Par symétrie, une coordonnée est souvent nulle ou évidente.", lines: [] },
  }),
];
