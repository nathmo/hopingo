// Module A2, part d (unit `analyse2`, step U6): implicit functions and
// integrals with a parameter. Catalogue: docs/universite/A2-analyse-2.md.
// Generators: analyse2-d.js (analyse2-d-implicit.js, analyse2-d-param.js).

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-implicit-2var", {
    prereqs: ["a2-partials", "g6-deriv-implicit", "a2-chain"], icon: 'F(x,y)=0', examWeight: 1, exam: ["mcq", "tf"],
    title: "Fonction implicite y = g(x) : g′ et g″",
    desc: 'F_y ≠ 0, puis g′ = −F_x/F_y ; g″ en dérivant l\'identité encore une fois.',
    prereqWhy: { "a2-partials": "F_x et F_y", "g6-deriv-implicit": "même calcul de y′ qu'au gymnase" },
    intro: {
      rule: "Si F(a, b) = 0, F ∈ C¹ et F_y(a, b) ≠ 0, alors près de a il existe une unique g avec g(a) = b et F(x, g(x)) = 0. On a g′ = −F_x/F_y. Pour g″, on dérive l'identité F_x + F_y·g′ = 0 encore une fois <b>en se souvenant que y = g(x)</b>.<br>Dans les lignes, on écrit p pour g′(x) et q pour g″(x).",
      lines: [
        { html: 'F = x² + xy + y³ − 3 au point (1 ; 1) : F(1 ; 1) = 0', note: 'Le point est sur la courbe', noEq: true },
        { html: 'F_x = 2x + y = 3 ; F_y = x + 3y² = 4 ≠ 0', note: 'Le théorème s\'applique', noEq: true },
        { html: 'g′(1) = −F_x/F_y = −3/4', note: 'La dérivée de y au dénominateur', noEq: true },
        { html: 'F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0, soit 2 + 2p + 6y·p² + (x + 3y²)·q = 0', note: 'Dériver F_x + F_y·p = 0, avec y = g(x)', noEq: true },
        { html: '2 + 2·(−3/4) + 6·(9/16) + 4q = 0', note: 'Remplacer x = y = 1, p = −3/4', noEq: true },
        { html: 'g″(1) = q = −31/32', note: 'Isoler q', noEq: true },
      ],
    },
  }),
  S("a2-implicit-3var", {
    prereqs: ["a2-implicit-2var"], icon: 'z = g(x,y)', examWeight: 2, exam: ["mcq"],
    title: "Fonction implicite à 3 variables",
    desc: 'g_x = −F_x/F_z, g_y = −F_y/F_z : la dérivée de la variable éliminée au dénominateur.',
    intro: {
      rule: "Si F(x, y, z) = 0 en p et F_z(p) ≠ 0, z = g(x, y) près de p, avec g_x = −F_x/F_z et g_y = −F_y/F_z. On peut aussi résoudre pour y ou pour x : c'est toujours la dérivée de la variable <b>éliminée</b> qui va au dénominateur. Pour g_xx, on dérive F_x + F_z·g_x = 0 en x, avec z = g(x, y).",
      lines: [
        { html: 'F = xz² + ye^z − 2xy = −1 en p = (1 ; 1 ; 0)', note: 'z = g(x, y) est éliminée', noEq: true },
        { html: 'F_x = z² − 2y = −2 ; F_y = e^z − 2x = −1 ; F_z = 2xz + ye^z = 1 ≠ 0', note: 'Dérivées partielles en p', noEq: true },
        { html: 'g_x = −F_x/F_z = 2 ; g_y = −F_y/F_z = 1', note: 'F_z au dénominateur', noEq: true },
        { html: 'F_xx + 2F_xz·p + F_zz·p² + F_z·q = 0 : 0 + 0 + 3·4 + q = 0', note: 'Dériver F_x + F_z·p = 0 en x (p = g_x, q = g_xx)', noEq: true },
        { html: 'g_xx(1 ; 1) = −12', note: 'Isoler q', noEq: true },
      ],
    },
  }),
  S("a2-param-int", {
    prereqs: ["a2-partials", "a1-int-direct"], icon: 'd/dt ∫', examWeight: 1, exam: ["mcq", "tf"],
    title: "Intégrale à paramètre, bornes fixes : dériver sous l'intégrale",
    desc: 'F′(t) = ∫ₐᵇ ∂f/∂t dx : dériver d\'abord, intégrer ensuite.',
    prereqWhy: { "a2-partials": "dériver f(x, t) par rapport à t" },
    intro: {
      rule: "Si f et ∂f/∂t sont continues sur [a ; b] × I, alors F(t) = ∫ₐᵇ f(x, t) dx est dérivable et F′(t) = ∫ₐᵇ ∂f/∂t(x, t) dx. On dérive d'abord, on intègre ensuite : c'est souvent plus facile que de calculer F.",
      lines: [
        { cas: 'd(int(arctan(t x),x,0,1),t)', note: 'F(t) = ∫₀¹ Arctg(tx) dx', noEq: true },
        { cas: 'int(x/(1+t^2x^2),x,0,1)', note: 'Dériver sous ∫ : ∂/∂t Arctg(tx) = x/(1 + t²x²)' },
        { cas: 'bracket(ln(1+t^2x^2)/(2t^2),x,0,1)', note: 'Primitive en x (u = 1 + t²x²)' },
        { cas: 'ln(1+t^2)/(2t^2)', note: 'Évaluer ; F′(1) = ln 2/2' },
      ],
    },
  }),
  S("a2-param-int-bounds", {
    prereqs: ["a2-param-int", "a1-ftc"], icon: '∫ₜ^(t²)', examWeight: 3, exam: ["mcq", "tf", "coef"],
    title: "Intégrale à paramètre avec bornes variables (règle de Leibniz)",
    desc: 'Trois termes : borne du haut, borne du bas, intégrale de ∂f/∂t.',
    intro: {
      rule: "F(t) = ∫ de a(t) à b(t) de f(x, t) dx donne <b>trois termes</b> : F′(t) = f(b(t), t)·b′(t) − f(a(t), t)·a′(t) + ∫ de a(t) à b(t) de ∂f/∂t(x, t) dx.",
      lines: [
        { cas: 'd(int(sin(t x)/x,x,t,t^2),t)', note: 'F(t) = ∫ₜ^(t²) sin(tx)/x dx', noEq: true },
        { cas: 'sin(t^3)/t^2×2t-sin(t^2)/t×1+int(cos(t x),x,t,t^2)', note: 'Borne du haut, borne du bas, ∂f/∂t = cos(tx)' },
        { cas: '2sin(t^3)/t-sin(t^2)/t+(sin(t^3)-sin(t^2))/t', note: 'Simplifier ; ∫ cos(tx) dx = [sin(tx)/t]' },
        { cas: '(3sin(t^3)-2sin(t^2))/t', note: 'Regrouper' },
      ],
    },
  }),
];
