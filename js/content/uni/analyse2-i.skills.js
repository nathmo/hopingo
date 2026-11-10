// Module A2, part i (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-ode-particular", {
    prereqs: ["a2-ode-const2"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Solution particulière, résonance, problème de Cauchy",
    desc: '',
    intro: { rule: "Pour ay″ + by′ + cy = P(x)e^{mx} (ou cos/sin kx), on essaie y_p = Q(x)e^{mx} avec deg Q = deg P. <b>Résonance</b> : si m (ou ik) est racine de l'équation caractéristique, on multiplie par x (par x² si la racine est double). Pour cos kx <b>ou</b> sin kx, on prend <b>les deux</b> : A cos kx + B sin kx. Ensuite, y = y_h + y_p, et <b>seulement à la fin</b> on applique les conditions initiales.", lines: [] },
  }),
  S("a2-ode-choose", {
    prereqs: ["a2-ode-separable", "a2-ode-linear1", "a2-ode-homog-subst", "a2-ode-particular"], icon: '', examWeight: 2, exam: ["mcq"],
    title: "Choisir la méthode (organigramme des EDO)",
    desc: '',
    intro: { rule: "L'organigramme se lit de haut en bas.", lines: [] },
  }),
  S("a2-ode-stability", {
    prereqs: ["a2-ode-const2", "param-quadratic"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Stabilité selon un paramètre",
    desc: '',
    intro: { rule: "Toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 en +∞ si et seulement si les deux racines ont une <b>partie réelle < 0</b>. Pour le 2e ordre, c'est équivalent à <b>p > 0 et q > 0</b> (somme −p < 0 et produit q > 0 ; en cas de racines complexes, la partie réelle vaut −p/2). Les bornes ne sont pas comprises : une racine nulle donne les constantes, une racine imaginaire pure donne des oscillations qui ne s'amortissent pas.", lines: [] },
  }),
  S("a2-ode-subst-other", {
    prereqs: ["a2-ode-linear1", "a2-ode-const2"], icon: '', examWeight: 0, exam: ["mcq"],
    tags: ["opt"],
    title: "Autres changements de variable : Bernoulli, Euler",
    desc: '',
    prereqWhy: {"a2-ode-const2": "Euler : x = eᵗ donne des coefficients constants"},
    intro: { rule: "Bernoulli y′ + a(x)y = b(x)y^α (α ≠ 0, 1) : on pose z = y^{1−α} ; l'équation en z est linéaire. Euler x²y″ + bxy′ + cy = f(x) (x > 0) : on pose x = eᵗ (ou on essaie y = x^m) ; l'équation devient à coefficients constants.", lines: [] },
  }),
  S("a2-ode-exact", {
    prereqs: ["a2-partials"], icon: '', examWeight: 0, exam: ["mcq"],
    tags: ["opt"],
    title: "Équations exactes",
    desc: '',
    intro: { rule: "M(x, y) dx + N(x, y) dy = 0 est exacte si ∂M/∂y = ∂N/∂x (sur un domaine simplement connexe). Il existe alors H avec H_x = M, H_y = N, et les solutions vérifient H(x, y) = C. On trouve H en intégrant M en x, puis on ajuste la « constante » φ(y) avec N.", lines: [] },
  }),
  S("a2-ode-system", {
    prereqs: ["a2-ode-const2", "l-eig-diag"], icon: '', examWeight: 0, exam: [],
    tags: ["opt"],
    title: "Systèmes linéaires X′ = AX",
    desc: '',
    prereqWhy: {"a2-ode-const2": "une équation d'ordre 2 s'écrit comme un système", "l-eig-diag": "A = PDP⁻¹"},
    intro: { rule: "Si A est diagonalisable, de valeurs propres λᵢ et vecteurs propres vᵢ, X(t) = Σ Cᵢ e^{λᵢt} vᵢ. Les constantes viennent de X(0) = Σ Cᵢvᵢ. Une équation d'ordre 2 s'écrit comme un système (x₁ = y, x₂ = y′).", lines: [] },
  }),
];
