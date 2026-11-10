// Module V, part a (unit `vecto`, step U10): operators, identities, curves and line integrals, domains, potentials.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: vecto-a.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'vecto', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("v-ops", {
    prereqs: ["a2-partials", "g4-cross"],
    icon: '∇',
    examWeight: 2,
    exam: ["mcq"],
    title: "Gradient, divergence, rotationnel, laplacien",
    desc: 'rot F composante par composante, div F, Δf : seulement des dérivées partielles bien rangées.',
    prereqWhy: { "g4-cross": "rot F s'écrit comme le déterminant symbolique de u ∧ v" },
    intro: {
      rule: "grad f = ∇f est un vecteur, div F = ∇ · F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z un nombre, rot F = ∇ ∧ F un vecteur en 3D (un nombre en 2D : ∂F₂/∂x − ∂F₁/∂y), Δf = div ∇f = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² (sans dérivée croisée). On écrit rot F comme un déterminant symbolique, puis on développe <b>composante par composante</b>, dans l'ordre x → y → z → x.",
      lines: [
        L('F = (x²y ; yz ; xz²)', 'Le champ'),
        L('rot F = (∂(xz²)/∂y − ∂(yz)/∂z ; ∂(x²y)/∂z − ∂(xz²)/∂x ; ∂(yz)/∂x − ∂(x²y)/∂y)', 'Une différence par composante'),
        L('rot F = (0 − y ; 0 − z² ; 0 − x²) = (−y ; −z² ; −x²)', 'Trois nombres, pas une somme'),
        L('div F = 2xy + z + 2xz', 'Une seule expression'),
      ],
    },
  }),
  S("v-identities", {
    prereqs: ["v-ops"],
    icon: '∇·',
    examWeight: 1,
    exam: ["mcq"],
    title: "Identités des opérateurs",
    desc: 'rot ∇f = 0, div rot F = 0, et les règles du produit : div(fF) = f div F + F · ∇f.',
    intro: {
      rule: "rot(∇f) = 0 ; div(rot F) = 0 ; div(∇f) = Δf ; div(fF) = f div F + F · ∇f ; rot(fF) = f rot F + ∇f ∧ F. Les deux dernières sont des <b>règles du produit</b> : deux termes, comme (fg)′ = f′g + fg′. On les vérifie sur un exemple en calculant chaque membre séparément.",
      lines: [
        L('f = xy, F = (x ; y ; z)', 'L\'exemple'),
        L('div(fF) = div(x²y ; xy² ; xyz) = 2xy + 2xy + xy = 5xy', 'Calcul direct'),
        L('f div F + F · ∇f = 3xy + (x ; y ; z)·(y ; x ; 0) = 3xy + 2xy = 5xy', 'Même résultat'),
      ],
    },
  }),
  S("v-curve-param", {
    prereqs: ["a2-curve-param"],
    icon: 'γ(t)',
    examWeight: 1,
    exam: ["mcq"],
    title: "Paramétrer une courbe orientée",
    desc: 'Segment, cercle, graphe, ellipse : γ(t), ses bornes et son sens, puis γ′(t) et |γ′(t)|.',
    intro: {
      rule: "Une courbe se paramètre par γ : [a ; b] → ℝⁿ, avec un sens. Segment de A à B : γ(t) = A + t(B − A), t ∈ [0 ; 1]. Cercle de centre c et de rayon R, sens positif : γ(t) = c + R(cos t ; sin t) ; sens négatif : (cos t ; −sin t). Graphe y = g(x) : γ(t) = (t ; g(t)). Pour le sens inverse : γ(a + b − t). Les bornes font parcourir la courbe <b>une fois</b>.",
      lines: [
        L('γ(t) = (2 cos t ; 2 sin t), t ∈ [0 ; π]', 'Demi-cercle supérieur, de (2 ; 0) à (−2 ; 0)'),
        L('γ′(t) = (−2 sin t ; 2 cos t)', 'On dérive chaque composante'),
        L('|γ′(t)| = √(4 sin²t + 4 cos²t) = 2', 'γ′ ≠ 0 : courbe régulière'),
      ],
    },
  }),
  S("v-line-scalar", {
    prereqs: ["v-curve-param", "a1-int-direct"],
    icon: '∫f dl',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Intégrale curviligne d'un champ scalaire ∫ f dl",
    desc: '∫ f dl = ∫ f(γ(t)) |γ′(t)| dt : la vitesse multiplie ; avec f = 1, la longueur.',
    intro: {
      rule: "∫<sub>Γ</sub> f dl = ∫ₐᵇ f(γ(t)) |γ′(t)| dt ; avec f = 1, c'est la longueur de Γ. Le résultat ne dépend ni du sens ni de la paramétrisation. Le facteur |γ′(t)| est la longueur de chaque petit morceau : ne l'oublie pas.",
      lines: [
        L('Γ : de (0 ; 0) à (3 ; 4), f = x + y', 'L\'exemple'),
        L('γ(t) = (3t ; 4t), t ∈ [0 ; 1], |γ′(t)| = |(3 ; 4)| = 5', 'Paramétrer, puis la vitesse'),
        L('∫<sub>Γ</sub> f dl = ∫₀¹ (3t + 4t)·5 dt = 35 ∫₀¹ t dt = 35/2', 'f(γ(t)) fois la vitesse'),
      ],
    },
  }),
  S("v-line-vector", {
    prereqs: ["v-curve-param", "a1-int-direct"],
    icon: '∫F·dl',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Travail ∫ F · dl et orientation",
    desc: '∫ F · dl = ∫ F(γ(t)) · γ′(t) dt : produit scalaire avec γ′, pas de |γ′| ; le sens change le signe.',
    intro: {
      rule: "∫<sub>Γ</sub> F · dl = ∫ₐᵇ F(γ(t)) · γ′(t) dt. Changer de sens change le signe. Pas de |γ′(t)| ici : γ′(t) contient déjà la longueur. Attention aux primitives de sin t cosᵏt : ∫ sin t cos²t dt = −cos³t/3.",
      lines: [
        L('F = (y² ; x), Γ : y = x² de (0 ; 0) à (1 ; 1)', 'L\'exemple'),
        L('γ(t) = (t ; t²), γ′(t) = (1 ; 2t), t ∈ [0 ; 1]', 'Paramétrer et dériver'),
        L('F(γ(t)) · γ′(t) = t⁴·1 + t·2t = t⁴ + 2t²', 'Produit scalaire'),
        L('∫₀¹ (t⁴ + 2t²) dt = 1/5 + 2/3 = 13/15', 'Intégrer en t'),
      ],
    },
  }),
  S("v-domain-topo", {
    prereqs: ["a2-rn-topology"],
    icon: 'Ω',
    examWeight: 1,
    exam: ["mcq"],
    title: "Convexe, étoilé, simplement connexe",
    desc: 'Convexe ⇒ étoilé ⇒ simplement connexe ⇒ connexe ; un segment qui sort, une courbe autour du trou.',
    prereqWhy: { "a2-rn-topology": "ouverts de ℝ² et ℝ³" },
    intro: {
      rule: "Convexe (tout segment reste dans Ω) ⇒ étoilé (un point voit tout Ω) ⇒ simplement connexe (toute courbe fermée se réduit à un point dans Ω) ⇒ connexe, et <b>aucune réciproque</b>. Dans ℝ², simplement connexe = connexe et « sans trou ». ℝ² \\ {0} et une couronne ne le sont pas ; ℝ³ \\ {0} l'est, ℝ³ privé d'un axe ne l'est pas.",
      lines: [
        L('Ω = ]1 ; 3[ × ]2 ; 10[', 'Rectangle : convexe'),
        L('Ω = {2 < x² + y² < 4}', 'Couronne : connexe, pas simplement connexe'),
        L('(√3 ; 0) et (−√3 ; 0) sont dans Ω, (0 ; 0) non', 'Le segment sort : pas convexe'),
      ],
    },
  }),
  S("v-pot-test", {
    prereqs: ["v-ops", "v-domain-topo"],
    icon: 'rot=0',
    examWeight: 2,
    exam: ["mcq"],
    title: "Le test rot F = 0 et son domaine",
    desc: 'rot F = 0 est nécessaire ; sur un domaine simplement connexe, il suffit ; sinon, il ne dit rien.',
    prereqWhy: { "v-domain-topo": "dire si le domaine est simplement connexe (convexe), dans la conclusion" },
    intro: {
      rule: "Si F = ∇φ et F ∈ C¹, alors rot F = 0 : condition <b>nécessaire</b>. Si de plus Ω est <b>simplement connexe</b> (en particulier convexe), rot F = 0 suffit. Si Ω n'est pas simplement connexe, le théorème ne dit rien : il faut une autre méthode.",
      lines: [
        L('F = (2xy + z ; x² ; x + 2z) sur ℝ³', 'Le champ'),
        L('rot F = (0 − 0 ; 1 − 1 ; 2x − 2x) = (0 ; 0 ; 0)', 'Condition nécessaire vérifiée'),
        L('ℝ³ est convexe', 'Donc F dérive d\'un potentiel'),
      ],
    },
  }),
  S("v-pot-find", {
    prereqs: ["v-pot-test", "a1-int-direct"],
    icon: 'φ',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Trouver un potentiel pas à pas",
    desc: 'φ = ∫F₁ dx + α(y, z), puis comparer à F₂ et F₃ ; une seule constante, fixée par φ(P).',
    prereqWhy: { "v-pot-test": "vérifier rot F = 0 sur un domaine adapté avant de chercher φ", "a1-int-direct": "les primitives des composantes (les erreurs de primitive y sont réparées)" },
    intro: {
      rule: "On intègre F₁ en x, avec une « constante » qui dépend des <b>autres</b> variables : φ = ∫F₁ dx + α(y, z). On dérive en y, on compare à F₂ : α ne dépend plus que de z, α = (…) + β(z). On dérive en z, on compare à F₃ : β(z) = (…) + C. À la fin, une seule constante C ; on la fixe si une valeur φ(P) est imposée. Dans ce cours, F = ∇φ (sans signe moins).",
      lines: [
        L('φ = x²y + xz + α(y, z)', '∫ (2xy + z) dx'),
        L('∂φ/∂y = x² + ∂α/∂y = x², donc α = β(z)', 'On compare à F₂'),
        L('∂φ/∂z = x + β′(z) = x + 2z, donc β = z² + C', 'On compare à F₃'),
        L('φ(1 ; 2 ; −1) = 2 − 1 + 1 + C = 0 : C = −2', 'La condition fixe C'),
      ],
    },
  }),
  S("v-pot-lambda", {
    prereqs: ["v-pot-find"],
    icon: 'λ',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Potentiel avec un paramètre λ",
    desc: 'rot F = 0 donne une équation par composante, vraie en tout point : on garde les λ qui les vérifient toutes.',
    prereqWhy: { "v-pot-find": "une fois λ trouvé, on construit φ" },
    intro: {
      rule: "rot F = 0 est un <b>système</b> de trois équations, vraies pour tout (x, y, z). Chacune donne une condition sur λ ; on garde les λ qui les vérifient toutes. Additionner les composantes ne suffit pas : une somme nulle ne dit pas que chaque terme est nul.",
      lines: [
        L('F = (2xy + λz ; λx² ; x + 2z)', 'Le champ'),
        L('rot F = (0 ; λ − 1 ; 2(λ − 1)x)', 'Composante par composante'),
        L('λ − 1 = 0 et 2(λ − 1)x = 0 pour tout x', 'Donc λ = 1 ; ℝ³ est convexe'),
      ],
    },
  }),
  S("v-pot-none", {
    prereqs: ["v-line-vector", "v-pot-test"],
    icon: '∮≠0',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Prouver qu'il n'y a pas de potentiel",
    desc: 'Une seule courbe fermée avec ∮ F · dl ≠ 0 suffit ; une seule avec ∮ = 0 ne prouve rien.',
    prereqWhy: { "v-pot-test": "rot F = 0 ne suffit pas sur un domaine troué" },
    intro: {
      rule: "Si F = ∇φ sur Ω, alors ∮<sub>Γ</sub> F · dl = 0 pour <b>toute</b> courbe fermée Γ ⊂ Ω. Une seule courbe fermée avec ∮ ≠ 0 prouve donc « pas de potentiel ». La réciproque avec une seule courbe est fausse. On choisit une courbe qui entoure le trou du domaine.",
      lines: [
        L('F = (−y ; x)/(x² + y²) sur ℝ² \\ {0}', 'rot F = 0, mais le domaine a un trou'),
        L('γ(t) = (cos t ; sin t), F(γ(t)) · γ′(t) = sin²t + cos²t = 1', 'Le cercle unité autour du trou'),
        L('∮ F · dl = ∫₀^{2π} 1 dt = 2π ≠ 0', 'Donc pas de potentiel sur ℝ² \\ {0}'),
      ],
    },
  }),
  S("v-pot-domain", {
    prereqs: ["v-pot-none", "v-pot-find"],
    icon: 'Ω,φ',
    examWeight: 2,
    exam: ["open"],
    title: "Problème : potentiel et discussion du domaine",
    desc: 'Le même champ : pas de potentiel sur ℝ² \\ {0}, un potentiel sur {x > 0} ; ou un potentiel malgré le trou.',
    intro: {
      rule: "Un même champ peut dériver d'un potentiel sur un domaine et pas sur un autre. Méthode : rot F ; propriété du domaine ; si le domaine n'est pas simplement connexe, ∮ sur une courbe autour du trou ; sur un domaine plus petit (un demi-plan, convexe), on trouve φ et on vérifie qu'il y est <b>défini</b>. Un trou n'interdit pas un potentiel : s'il en existe un défini sur tout Ω, la réponse est oui.",
      lines: [
        L('F = ((x − 2y)/(x² + y²) ; (2x + y)/(x² + y²))', 'rot F = 0 sur ℝ² \\ {0}'),
        L('∮ sur le cercle unité = ∫₀^{2π} 2 dt = 4π ≠ 0', 'Pas de potentiel sur ℝ² \\ {0}'),
        L('φ = ½ ln(x² + y²) + 2 Arctg(y/x)', 'Potentiel sur {x > 0} seulement'),
      ],
    },
  }),
];
