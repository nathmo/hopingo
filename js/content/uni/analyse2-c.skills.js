// Module A2, part c (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-partials", {
    prereqs: ["g6-deriv-rules"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Dérivées partielles, gradient, jacobienne, dérivées d'ordre 2",
    desc: '',
    intro: { rule: "∂f/∂x : on dérive en x, les autres variables étant des constantes. ∇f est le vecteur des dérivées partielles. Pour u : ℝⁿ → ℝᵐ, J_u a m lignes (une par composante) et n colonnes (une par variable). Schwarz : si f ∈ C², ∂²f/∂x∂y = ∂²f/∂y∂x.", lines: [] },
  }),
  S("a2-tangent-graph", {
    prereqs: ["a2-partials", "g4-plane"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Plan tangent au graphe",
    desc: '',
    intro: { rule: "Pour f différentiable en (a, b), le plan tangent au graphe en (a, b, f(a, b)) est z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b).", lines: [] },
  }),
  S("a2-tangent-level", {
    prereqs: ["g4-dot", "a2-partials", "g4-plane"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Plan tangent à une surface de niveau",
    desc: '',
    prereqWhy: {"g4-dot": "∇F(p)·(x − p) = 0 : ∇F(p) est un vecteur normal"},
    intro: { rule: "Si S = {F = c} et ∇F(p) ≠ 0, ∇F(p) est normal à S en p, et le plan tangent est ∇F(p)·(x − p) = 0. Une courbe tracée sur S a sa vitesse orthogonale à ∇F. En 2D, ∇F est perpendiculaire à la ligne de niveau.", lines: [] },
  }),
  S("a2-chain", {
    prereqs: ["a2-partials", "l-mat-product"], icon: '', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Règle de chaîne et jacobienne d'une composée",
    desc: '',
    intro: { rule: "J_{f∘g}(a) = J_f(g(a))·J_g(a). On évalue J_f <b>au point g(a)</b>, pas en a. Pour une courbe : (f∘γ)′(t) = ∇f(γ(t))·γ′(t).", lines: [] },
  }),
  S("a2-chain-polar", {
    prereqs: ["a2-chain", "g3-identities"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Gradient et coordonnées polaires",
    desc: '',
    intro: { rule: "Avec f̃(r, φ) = f(r cos φ, r sin φ), la règle de chaîne donne f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y. On inverse ce système 2 × 2 pour trouver f_x et f_y. On en tire f_x² + f_y² = f̃_r² + f̃_φ²/r².", lines: [] },
  }),
  S("a2-laplacian-radial", {
    prereqs: ["a2-chain-polar"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Laplacien en coordonnées polaires et radiales",
    desc: '',
    prereqWhy: {"a2-chain-polar": "dérivées en coordonnées polaires"},
    intro: { rule: "Pour f(x) = g(r) avec r = ‖x‖ dans ℝⁿ : Δf = g″(r) + (n − 1)/r·g′(r). En polaires dans ℝ² : Δf = f̃_rr + f̃_r/r + f̃_φφ/r². r^α est harmonique hors de 0 si et seulement si α(α + n − 2) = 0.", lines: [] },
  }),
  S("a2-taylor2", {
    prereqs: ["a2-partials", "a1-dl-ops", "a1-dl-compose"], icon: '', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Polynôme de Taylor d'ordre 2 à deux variables",
    desc: '',
    prereqWhy: {"a2-partials": "dérivées partielles d'ordre 1 et 2 en (a, b)"},
    intro: { rule: "p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), avec X = x − a, Y = y − b, toutes les dérivées étant prises en (a, b). Le terme croisé a pour coefficient <b>f_xy</b> (le ½ et le 2 se simplifient). Autre méthode, souvent plus rapide : un DL à une variable de la fonction extérieure, en gardant les termes de degré ≤ 2.", lines: [] },
  }),
];
