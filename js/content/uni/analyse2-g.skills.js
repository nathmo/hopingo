// Module A2, part g (unit `analyse2`, step U6): polar, cylindrical and
// spherical coordinates, improper integrals on ℝ² and ℝ³, volumes, centres
// of mass. Catalogue: docs/universite/A2-analyse-2.md. Each skill gets its
// intro (rule + worked lines) with its generators (analyse2-g.js).

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-polar-int", {
    prereqs: ["a2-change-var", "g3-identities"], icon: 'r dr dφ', examWeight: 2, exam: ["mcq"],
    title: "Intégrales doubles en coordonnées polaires",
    desc: 'Disques, anneaux, secteurs : bornes en (r, φ), et dx dy = r dr dφ.',
    prereqWhy: { "g3-identities": "∫ cos²φ et sin²φ par l'angle double" },
    intro: {
      rule: "x = r cos φ, y = r sin φ et dx dy = r dr dφ (le <b>r</b> est le jacobien). Domaines naturels : disques, anneaux, secteurs (0 ≤ y ≤ x donne 0 ≤ φ ≤ π/4). Si les bornes sont constantes et l'intégrande un produit g(r)·h(φ), l'intégrale est un produit.",
      lines: [
        { html: '∬<sub>D</sub> y dx dy, D = {x² + y² ≤ 4, y ≥ 0} : 0 ≤ r ≤ 2, 0 ≤ φ ≤ π', note: 'Bornes en polaires', noEq: true },
        { cas: 'int(int(r×sin(φ)×r,r,0,2),φ,0,π)', note: 'y = r sin φ, et le jacobien r', noEq: true },
        { cas: 'int(r^2,r,0,2)×int(sin(φ),φ,0,π)', note: 'Produit de deux intégrales' },
        { cas: '(8/3)×2', note: 'Primitives' },
        { cas: '16/3', note: 'Valeur' },
      ],
    },
  }),
  S("a2-cyl-sph", {
    prereqs: ["a2-polar-int", "a2-triple-int"], icon: 'dV', examWeight: 3, exam: ["mcq", "tf"],
    title: "Coordonnées cylindriques et sphériques",
    desc: 'dV = r dr dφ dz ; dV = r² sin θ dr dθ dφ, θ mesuré depuis l\'axe z.',
    prereqWhy: { "a2-polar-int": "r dr dφ en cylindriques", "a2-triple-int": "bornes d'une intégrale triple" },
    intro: {
      rule: "Cylindriques : x = r cos φ, y = r sin φ, z = z, dV = r dr dφ dz. Sphériques, avec <b>θ mesuré depuis l'axe z</b> : x = r sin θ cos φ, y = r sin θ sin φ, z = r cos θ, dV = r² sin θ dr dθ dφ. Le cône z ≥ √(x² + y²) devient θ ≤ π/4 ; z ≥ 0 devient θ ≤ π/2.",
      lines: [
        { html: '∭ z dV sur {x² + y² + z² ≤ 4, z ≥ 0} : 0 ≤ r ≤ 2, 0 ≤ θ ≤ π/2, 0 ≤ φ ≤ 2π', note: 'Bornes en sphériques', noEq: true },
        { cas: 'int(int(int(r×cos(θ)×r^2×sin(θ),r,0,2),θ,0,π/2),φ,0,2π)', note: 'z = r cos θ, et le jacobien r² sin θ', noEq: true },
        { cas: 'int(r^3,r,0,2)×int(cos(θ)×sin(θ),θ,0,π/2)×int(1,φ,0,2π)', note: 'Trois intégrales' },
        { cas: '4×(1/2)×2π', note: 'Primitives' },
        { cas: '4π', note: 'Valeur' },
      ],
    },
  }),
  S("a2-improper-multi", {
    prereqs: ["a2-polar-int", "a2-cyl-sph", "a1-improper-calc"], icon: '∬ℝ²', examWeight: 1, exam: ["mcq", "tf"],
    title: "Intégrales impropres sur ℝ² et ℝ³ ; intégrale de Gauss",
    desc: 'Sur la boule B_R, puis R → ∞ ; le seuil de ‖x‖^(−α) est la dimension n.',
    prereqWhy: { "a2-cyl-sph": "boules de ℝ³ en sphériques" },
    intro: {
      rule: "Pour f ≥ 0, on intègre sur des boules B_R et on fait R → ∞ (ou ε → 0 près d'une singularité). En polaires ou en sphériques, le jacobien change le critère : ∫<sub>‖x‖ ≥ 1</sub> ‖x‖<sup>−α</sup> converge si et seulement si <b>α > n</b> ; ∫<sub>‖x‖ ≤ 1</sub> ‖x‖<sup>−α</sup> converge si et seulement si <b>α < n</b>. Gauss : ∬<sub>ℝ²</sub> e^(−(x² + y²)) = π, donc ∫<sub>ℝ</sub> e^(−x²) dx = √π.",
      lines: [
        { cas: 'int(int(r×e^(-r^2),r,0,R),φ,0,2π)', note: 'Sur le disque B_R, en polaires (avec r)', noEq: true },
        { cas: 'π×(1-e^(-R^2))', note: '2π·(1 − e^(−R²))/2' },
        { html: 'R → ∞ : ∬<sub>ℝ²</sub> e^(−(x² + y²)) dx dy = π', note: 'Limite', noEq: true },
        { html: '(∫<sub>ℝ</sub> e^(−x²) dx)² = π, donc ∫<sub>ℝ</sub> e^(−x²) dx = √π', note: 'Gauss', noEq: true },
      ],
    },
  }),
  S("a2-volume", {
    prereqs: ["a2-polar-int"], icon: 'Vol', examWeight: 1, exam: ["mcq"],
    title: "Volumes",
    desc: 'Vol = ∬ (dessus − dessous) sur la projection R.',
    intro: {
      rule: "Le volume de D est ∭<sub>D</sub> 1 dV. Si D est entre deux surfaces z = g(x, y) ≤ z = h(x, y) au-dessus de la région R, Vol = ∬<sub>R</sub> (h − g) dx dy. On trouve R en égalant les deux surfaces.",
      lines: [
        { html: 'Sous z = 4 − x² − y², au-dessus de z = 0 : 4 − x² − y² = 0 sur le cercle r = 2, R = {x² + y² ≤ 4}', note: 'La projection', noEq: true },
        { cas: 'int(int((4-r^2)×r,r,0,2),φ,0,2π)', note: 'Hauteur (4 − r²), en polaires avec r', noEq: true },
        { cas: '2π×(8-4)', note: 'Primitive 2r² − r⁴/4' },
        { cas: '8π', note: 'Volume' },
      ],
    },
  }),
  S("a2-mass-center", {
    prereqs: ["a2-polar-int"], icon: 'x̄, ȳ', examWeight: 0, exam: [],
    tags: ["opt"],
    title: "Masse et centre de masse",
    desc: 'M = ∬ ρ, x̄ = (1/M)∬ x ρ ; la symétrie donne une coordonnée.',
    intro: {
      rule: "Masse M = ∬<sub>D</sub> ρ. Centre de masse x̄ = (1/M)∬<sub>D</sub> x ρ, ȳ = (1/M)∬<sub>D</sub> y ρ. Par symétrie, une coordonnée est souvent nulle ou évidente.",
      lines: [
        { html: 'Demi-disque x² + y² ≤ 9, y ≥ 0, ρ = 1 : M = 9π/2, et x̄ = 0 par symétrie', note: 'Masse et symétrie', noEq: true },
        { cas: 'int(int(r×sin(φ)×r,r,0,3),φ,0,π)', note: '∬ y, en polaires', noEq: true },
        { cas: '9×2', note: '(∫₀³ r² dr)(∫₀^π sin φ dφ)' },
        { html: 'ȳ = 18/(9π/2) = 4/π', note: 'Moment divisé par la masse', noEq: true },
      ],
    },
  }),
];
