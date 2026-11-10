// Module A2, part h (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-ode-cauchy", {
    prereqs: ["a2-partials"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Problème de Cauchy : existence, unicité, Lipschitz",
    desc: '',
    intro: { rule: "Problème de Cauchy : y′ = f(t, y), y(t₀) = y₀. Si f est continue sur R = {|t − t₀| ≤ a, |y − y₀| ≤ b}, bornée par K, et M-Lipschitz en y (par exemple si |∂f/∂y| ≤ M sur R), il existe une <b>unique</b> solution sur |t − t₀| ≤ min(a, b/K). Continue seule ne suffit pas pour l'unicité. Une solution locale n'est pas forcément globale (y′ = y² explose). Une équation d'ordre r se ramène à un système d'ordre 1 ; elle demande r conditions initiales.", lines: [] },
  }),
  S("a2-ode-separable", {
    prereqs: ["a1-int-direct", "a1-int-rational", "g2-hyp-def"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Équations à variables séparables",
    desc: '',
    prereqWhy: {"g2-hyp-def": "solutions en tanh (y′ = 4 − y²)"},
    intro: { rule: "y′ = g(x)·h(y). (1) Les zéros de h donnent des <b>solutions constantes</b> : on les note avant de diviser. (2) Ailleurs, dy/h(y) = g(x) dx, on intègre des deux côtés, <b>une seule constante</b>. (3) On applique la condition initiale, puis on isole y si possible.", lines: [] },
  }),
  S("a2-ode-linear1", {
    prereqs: ["a1-int-direct"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Linéaires du 1er ordre : facteur intégrant",
    desc: '',
    intro: { rule: "On écrit d'abord l'équation <b>avec coefficient 1 devant y′</b> : y′ + a(x)y = b(x). Avec A une primitive de a, μ = e^{A} donne (μy)′ = μb, donc y = e^{−A}(∫ b e^{A} dx + C). Raccourcis de l'organigramme : si b = 0, y = Ce^{−A} ; si a et b sont constants, on décale vers l'équilibre y* = b/a : y = b/a + Ce^{−ax}.", lines: [] },
  }),
  S("a2-ode-homog-subst", {
    prereqs: ["a2-ode-separable"], icon: '', examWeight: 1, exam: ["mcq"],
    title: "Équations homogènes : y = x·v",
    desc: '',
    intro: { rule: "Si y′ = F(y/x), on pose y = x·v(x). Alors <b>y′ = v + x·v′</b> (règle du produit), et l'équation devient séparable : x v′ = F(v) − v.", lines: [] },
  }),
  S("a2-ode-structure", {
    prereqs: ["l-vec-indep"], icon: '', examWeight: 1, exam: ["tf"],
    title: "Structure des solutions des EDO linéaires",
    desc: '',
    prereqWhy: {"l-vec-indep": "une base de l'espace des solutions est faite de solutions indépendantes"},
    intro: { rule: "Pour une EDO linéaire L(y) = b : les solutions de L(y) = 0 forment un espace vectoriel de dimension égale à l'ordre ; la solution générale est y = y_h + y_p. <b>Superposition</b> : si L(y₁) = b₁ et L(y₂) = b₂, alors L(y₁ + y₂) = b₁ + b₂. Une combinaison y₀ + C·y₁ de deux solutions de L(y) = b n'est en général pas une solution.", lines: [] },
  }),
  S("a2-ode-const2", {
    prereqs: ["a2-ode-structure", "quad-formula", "g8-polar"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "2e ordre homogène à coefficients constants",
    desc: '',
    prereqWhy: {"a2-ode-structure": "y = C₁y₁ + C₂y₂ : espace de dimension 2", "g8-polar": "e^{(α+iβ)x} = e^{αx}(cos βx + i sin βx)"},
    intro: { rule: "ay″ + by′ + cy = 0 → équation caractéristique ar² + br + c = 0. Deux racines réelles r₁ ≠ r₂ : C₁e^{r₁x} + C₂e^{r₂x}. Racine double r : (C₁ + C₂x)e^{rx}. Racines α ± iβ : e^{αx}(C₁ cos βx + C₂ sin βx). Deux conditions initiales fixent C₁ et C₂.", lines: [] },
  }),
  S("a2-ode-wronskian", {
    prereqs: ["a2-ode-linear1", "a2-ode-structure"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Wronskien et réduction d'ordre",
    desc: '',
    prereqWhy: {"a2-ode-linear1": "réduction d'ordre : l'équation en v′ est linéaire du 1er ordre"},
    intro: { rule: "Pour y″ + p(t)y′ + q(t)y = 0 : W = y₁y₂′ − y₁′y₂. Si y₁ et y₂ sont des solutions, W est soit identiquement nul (solutions dépendantes), soit jamais nul. <b>Formule d'Abel</b> : W(t) = W(t₀)·e^{−∫_{t₀}^t p}. Réduction d'ordre : si on connaît y₁, (y₂/y₁)′ = W/y₁², donc y₂ = y₁·∫ W/y₁². Attention : p est le coefficient de y′ <b>après</b> division par le coefficient de y″.", lines: [] },
  }),
];
