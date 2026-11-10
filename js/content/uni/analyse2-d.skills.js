// Module A2, part d (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-implicit-2var", {
    prereqs: ["a2-partials", "g6-deriv-implicit", "a2-chain"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Fonction implicite y = g(x) : g′ et g″",
    desc: '',
    prereqWhy: {"a2-partials": "F_x et F_y", "g6-deriv-implicit": "même calcul de y′ qu'au gymnase"},
    intro: { rule: "Si F(a, b) = 0, F ∈ C¹ et F_y(a, b) ≠ 0, alors près de a il existe une unique g avec g(a) = b et F(x, g(x)) = 0. On a g′ = −F_x/F_y. Pour g″, on dérive l'identité F_x + F_y·g′ = 0 encore une fois <b>en se souvenant que y = g(x)</b>.", lines: [] },
  }),
  S("a2-implicit-3var", {
    prereqs: ["a2-implicit-2var"], icon: '', examWeight: 2, exam: ["mcq"],
    title: "Fonction implicite à 3 variables",
    desc: '',
    intro: { rule: "Si F(x, y, z) = 0 en p et F_z(p) ≠ 0, z = g(x, y) près de p, avec g_x = −F_x/F_z et g_y = −F_y/F_z. On peut aussi résoudre pour y ou pour x : c'est toujours la dérivée de la variable <b>éliminée</b> qui va au dénominateur. Pour g_xx, on dérive F_x + F_z·g_x = 0 en x, avec z = g(x, y).", lines: [] },
  }),
  S("a2-param-int", {
    prereqs: ["a2-partials", "a1-int-direct"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Intégrale à paramètre, bornes fixes : dériver sous l'intégrale",
    desc: '',
    prereqWhy: {"a2-partials": "dériver f(x, t) par rapport à t"},
    intro: { rule: "Si f et ∂f/∂t sont continues sur [a ; b] × I, alors F(t) = ∫_a^b f(x, t) dx est dérivable et F′(t) = ∫_a^b ∂f/∂t(x, t) dx. On dérive d'abord, on intègre ensuite : c'est souvent plus facile que de calculer F.", lines: [] },
  }),
  S("a2-param-int-bounds", {
    prereqs: ["a2-param-int", "a1-ftc"], icon: '', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Intégrale à paramètre avec bornes variables (règle de Leibniz)",
    desc: '',
    intro: { rule: "F(t) = ∫_{a(t)}^{b(t)} f(x, t) dx donne <b>trois termes</b> : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫_{a(t)}^{b(t)} ∂f/∂t(x, t) dx.", lines: [] },
  }),
];
