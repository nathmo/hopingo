// Module A2, part c (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-partials", {
    prereqs: ["g6-deriv-rules"], icon: '∂f/∂x', examWeight: 2, exam: ["mcq", "tf"],
    title: "Dérivées partielles, gradient, jacobienne, dérivées d'ordre 2",
    desc: 'Dériver en une variable, les autres fixées ; une ligne de J_u par composante.',
    intro: { rule: "∂f/∂x : on dérive en x, les autres variables étant des constantes. ∇f est le vecteur des dérivées partielles. Pour u : ℝⁿ → ℝᵐ, J_u a m lignes (une par composante) et n colonnes (une par variable). Schwarz : si f ∈ C², ∂²f/∂x∂y = ∂²f/∂y∂x.",
      lines: [
        { html: 'u(x, y, z) = (x² + yz², y/x)', note: 'Deux composantes, trois variables : J_u est 2 × 3', noEq: true },
        { html: 'Ligne 1 : (∂/∂x, ∂/∂y, ∂/∂z)(x² + yz²) = (2x, z², 2yz)', note: 'Une ligne par composante', noEq: true },
        { html: 'Ligne 2 : (∂/∂x, ∂/∂y, ∂/∂z)(y/x) = (−y/x², 1/x, 0)', note: 'Une colonne par variable', noEq: true },
        { html: 'J_u(1, 2, 1) = [[2, 1, 4], [−2, 1, 0]]', note: 'On remplace par le point', noEq: true },
      ],
    },
  }),
  S("a2-tangent-graph", {
    prereqs: ["a2-partials", "g4-plane"], icon: 'z = f + ∇f·h', examWeight: 1, exam: ["mcq", "tf"],
    title: "Plan tangent au graphe",
    desc: 'Plan tangent au graphe : f(a, b), f_x(a, b), f_y(a, b).',
    intro: { rule: "Pour f différentiable en (a, b), le plan tangent au graphe en (a, b, f(a, b)) est z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b).",
      lines: [
        { html: 'f = x²y − 3y² + x en (1, −1) : f(1, −1) = −1 − 3 + 1 = −3', note: 'La cote du point', noEq: true },
        { html: 'f_x = 2xy + 1 = −1 ; f_y = x² − 6y = 7', note: 'Les pentes au point', noEq: true },
        { html: 'z = −3 − (x − 1) + 7(y + 1)', note: 'z = f(a, b) + f_x(a, b)(x − a) + f_y(a, b)(y − b)', noEq: true },
        { html: 'z = −x + 7y + 5', note: 'Développé', noEq: true },
      ],
    },
  }),
  S("a2-tangent-level", {
    prereqs: ["g4-dot", "a2-partials", "g4-plane"], icon: '∇F ⟂ S', examWeight: 3, exam: ["mcq", "tf"],
    title: "Plan tangent à une surface de niveau",
    desc: 'Plan tangent à F = c : ∇F(p) est une normale.',
    prereqWhy: {"g4-dot": "∇F(p)·(x − p) = 0 : ∇F(p) est un vecteur normal"},
    intro: { rule: "Si S = {F = c} et ∇F(p) ≠ 0, ∇F(p) est normal à S en p, et le plan tangent est ∇F(p)·(x − p) = 0. Une courbe tracée sur S a sa vitesse orthogonale à ∇F. En 2D, ∇F est perpendiculaire à la ligne de niveau.",
      lines: [
        { html: 'F = x²y + yz³ + 2e^(xz) = 10, p = (0, 1, 2)', note: 'Une surface de niveau', noEq: true },
        { html: '∇F = (2xy + 2ze^(xz), x² + z³, 3yz² + 2xe^(xz))', note: 'Le gradient', noEq: true },
        { html: '∇F(0, 1, 2) = (4, 8, 12)', note: 'Une normale au point', noEq: true },
        { html: '4(x − 0) + 8(y − 1) + 12(z − 2) = 0, soit x + 2y + 3z = 8', note: '∇F(p)·(x − p) = 0, puis divisé par 4', noEq: true },
      ],
    },
  }),
  S("a2-chain", {
    prereqs: ["a2-partials", "l-mat-product"], icon: 'J_{f∘g}', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Règle de chaîne et jacobienne d'une composée",
    desc: "Jacobienne d'une composée : J_f au point g(a), à gauche.",
    intro: { rule: "J_{f∘g}(a) = J_f(g(a))·J_g(a). On évalue J_f <b>au point g(a)</b>, pas en a. Pour une courbe : (f∘γ)′(t) = ∇f(γ(t))·γ′(t).",
      lines: [
        { html: 'g(u, v) = (uv, u² − v), J_f(x, y) = (2x + ye^y, x(1 + y)e^y), a = (1, 1)', note: 'h = f ∘ g', noEq: true },
        { html: 'g(1, 1) = (1, 0) ; J_f(1, 0) = (2, 1)', note: 'J_f au point image', noEq: true },
        { html: 'J_g(u, v) = [[v, u], [2u, −1]], J_g(1, 1) = [[1, 1], [2, −1]]', note: 'J_g au point a', noEq: true },
        { html: 'J_h(1, 1) = (2, 1)·[[1, 1], [2, −1]] = (4, 1)', note: 'Le produit, J_f à gauche', noEq: true },
      ],
    },
  }),
  S("a2-chain-polar", {
    prereqs: ["a2-chain", "g3-identities"], icon: 'f̃_r, f̃_φ', examWeight: 2, exam: ["mcq", "tf"],
    title: "Gradient et coordonnées polaires",
    desc: 'Les dérivées de f̃(r, φ) donnent ∇f par un système 2 × 2.',
    intro: { rule: "Avec f̃(r, φ) = f(r cos φ, r sin φ), la règle de chaîne donne f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y. On inverse ce système 2 × 2 pour trouver f_x et f_y. On en tire f_x² + f_y² = f̃_r² + f̃_φ²/r².",
      lines: [
        { html: 'J_f̃(r, φ) = (3r²cos φ + 2r, −r³sin φ), point (0, 2)', note: 'On cherche ∇f(0, 2)', noEq: true },
        { html: 'r = 2, φ = π/2', note: 'Le point en polaires', noEq: true },
        { html: 'f̃_r = cos φ·f_x + sin φ·f_y : 4 = f_y ; f̃_φ = −r sin φ·f_x + r cos φ·f_y : −8 = −2f_x', note: 'La règle de chaîne au point', noEq: true },
        { html: '∇f(0, 2) = (4, 4)', note: 'On résout', noEq: true },
      ],
    },
  }),
  S("a2-laplacian-radial", {
    prereqs: ["a2-chain-polar"], icon: 'Δg(r)', examWeight: 1, exam: ["mcq", "tf"],
    title: "Laplacien en coordonnées polaires et radiales",
    desc: 'Δf = g″ + (n − 1)/r·g′ pour une fonction radiale.',
    prereqWhy: {"a2-chain-polar": "dérivées en coordonnées polaires"},
    intro: { rule: "Pour f(x) = g(r) avec r = ‖x‖ dans ℝⁿ : Δf = g″(r) + (n − 1)/r·g′(r). En polaires dans ℝ² : Δf = f̃_rr + f̃_r/r + f̃_φφ/r². r^α est harmonique hors de 0 si et seulement si α(α + n − 2) = 0.",
      lines: [
        { html: 'f = (x² + y² + z²)² = r⁴ dans ℝ³', note: 'f ne dépend que de r', noEq: true },
        { html: 'g′ = 4r³, g″ = 12r²', note: 'On dérive g', noEq: true },
        { html: 'Δf = 12r² + (2/r)·4r³ = 20r²', note: 'n − 1 = 2 en dimension 3', noEq: true },
      ],
    },
  }),
  S("a2-taylor2", {
    prereqs: ["a2-partials", "a1-dl-ops", "a1-dl-compose"], icon: 'p₂(x, y)', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Polynôme de Taylor d'ordre 2 à deux variables",
    desc: "Polynôme de Taylor d'ordre 2 : DL de la fonction extérieure, ou les six dérivées.",
    prereqWhy: {"a2-partials": "dérivées partielles d'ordre 1 et 2 en (a, b)"},
    intro: { rule: "p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), avec X = x − a, Y = y − b, toutes les dérivées étant prises en (a, b). Le terme croisé a pour coefficient <b>f_xy</b> (le ½ et le 2 se simplifient). Autre méthode, souvent plus rapide : un DL à une variable de la fonction extérieure, en gardant les termes de degré ≤ 2.",
      lines: [
        { html: 'f = ln(1 + 2x − y + xy) en (0, 0) ; u = 2x − y + xy', note: 'u(0, 0) = 0 : u est petit', noEq: true },
        { html: 'ln(1 + u) = u − u²/2 + o(u²)', note: 'DL usuel à l’ordre 2', noEq: true },
        { html: 'p₂ = 2x − y + xy − (2x − y)²/2', note: 'u² ne garde que (2x − y)²', noEq: true },
        { html: 'p₂ = 2x − y − 2x² + 3xy − y²/2', note: 'Développé, regroupé', noEq: true },
      ],
    },
  }),
];
