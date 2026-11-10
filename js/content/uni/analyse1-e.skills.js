// Module A1, part e (unit `analyse1`, step U2): bounding integrals, the
// fundamental theorem, improper integrals, applications. Catalogue:
// docs/universite/A1-analyse-1.md, « Intégrales » and « Intégrales
// généralisées ».

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-int-estimate', {
    prereqs: ['a1-int-direct', 'a1-fn-image'], icon: 'm ≤ ∫ ≤ M', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Encadrer une intégrale ; parité et moyenne',
    desc: 'm(b − a) ≤ ∫ f ≤ M(b − a) ; une fonction impaire donne 0.',
    prereqWhy: { 'a1-int-direct': 'calculer l\'intégrale de comparaison', 'a1-fn-image': 'min et max de f sur [a ; b]' },
    intro: {
      rule: 'Si m ≤ f ≤ M sur [a ; b], alors m(b − a) ≤ ∫ₐᵇ f ≤ M(b − a). Si f est impaire, ∫₋ₐᵃ f = 0 ; si elle est paire, ∫₋ₐᵃ f = 2∫₀ᵃ f.<br>Pas besoin de primitive : e^(x²) n\'en a pas d\'élémentaire.',
      lines: [
        { html: 'I = ∫₀¹ dx/(1 + 2x³) : sur [0 ; 1], 1 ≤ 1 + 2x³ ≤ 3', note: 'Encadrer le dénominateur', noEq: true },
        { html: '1/3 ≤ 1/(1 + 2x³) ≤ 1', note: 'Encadrer f (min et max)', noEq: true },
        { html: '1/3 ≤ I ≤ 1', note: 'Intégrer l\'encadrement sur [0 ; 1]', noEq: true },
      ],
    },
  }),
  S('a1-ftc', {
    prereqs: ['a1-deriv-rules'], icon: 'd/dx ∫', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Théorème fondamental ; dériver ∫ₐ^(g(x)) f(t) dt',
    desc: 'F′ = f, puis la règle de chaîne sur la borne.',
    prereqWhy: { 'a1-deriv-rules': 'la règle de chaîne sur la borne g(x)' },
    intro: {
      rule: 'Si f est continue, F(x) = ∫ₐˣ f(t) dt est dérivable et F′ = f. Avec des bornes variables : d/dx ∫_{h(x)}^{g(x)} f(t) dt = f(g(x))·g′(x) − f(h(x))·h′(x).<br>La variable d\'intégration t est muette.',
      lines: [
        { cas: 'd(int(ln(1+t^2),t,1,x^3))', note: 'G(x) = F(x³) − F(1), avec F′ = f', noEq: true },
        { cas: 'ln(1+(x^3)^2)×d(x^3)', note: 'Théorème fondamental et règle de chaîne' },
        { cas: '3x^2×ln(1+x^6)', note: 'Substituer' },
      ],
    },
  }),
  S('a1-improper-calc', {
    prereqs: ['a1-int-subst', 'a1-int-parts', 'a1-fn-limits'], icon: '∫₀⁺', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Intégrale généralisée : calculer par une limite (bornes 0⁺, 1⁻, +∞)',
    desc: 'Repérer chaque point problème, intégrale propre, puis limite.',
    prereqWhy: { 'a1-int-subst': 'primitives par changement de variable', 'a1-int-parts': 'primitives par parties (x·e^(−x), Log x)', 'a1-fn-limits': 'la limite à la borne' },
    intro: {
      rule: 'On repère <b>chaque</b> point problème (borne infinie, f non bornée en une borne, ou à l\'intérieur). On écrit ∫ de a⁺ à b = lim_{ε→a⁺} ∫_ε^b, on calcule l\'intégrale propre, puis la limite. Tu écris la borne 0⁺ avec la touche ⁺.',
      lines: [
        { cas: 'int(x/√(2-x),x,1,2⁻)', note: 'Seul problème : x → 2⁻', noEq: true },
        { cas: 'int((2-t)/√t,t,0⁺,1)', note: 't = 2 − x, dx = −dt' },
        { cas: 'lim(bracket(4√t-(2/3)t^(3/2),t,ε,1),ε,0⁺)', note: 'Primitive, puis limite' },
        { cas: '4-2/3', note: 'Évaluer' },
        { cas: '10/3', note: 'L\'intégrale converge' },
      ],
    },
  }),
  S('a1-improper-compare', {
    prereqs: ['a1-improper-calc', 'a1-ser-compare'], icon: '∫ ≤ ∫', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Convergence d\'une intégrale généralisée par comparaison, sans la calculer',
    desc: 'Comparer à 1/xᵅ en 0⁺ (α < 1) et en +∞ (α > 1).',
    prereqWhy: { 'a1-improper-calc': 'repérer les points problèmes', 'a1-ser-compare': 'le critère de comparaison et du quotient' },
    intro: {
      rule: '∫ de 0⁺ à 1 de dx/xᵅ converge ⇔ <b>α < 1</b> ; ∫₁^∞ dx/xᵅ converge ⇔ <b>α > 1</b>. Pour f ≥ 0, si f(x)/g(x) → L ∈ ]0 ; +∞[ au point problème, même nature.<br>On traite chaque point problème séparément.',
      lines: [
        { html: 'I = ∫ de 1⁺ à +∞ de dx/(√(x − 1)(x + 2)) : deux points problèmes, 1⁺ et +∞', note: 'Repérer et couper', noEq: true },
        { html: 'En 1⁺ : f(x)·√(x − 1) → 1/3 ; α = 1/2 < 1 : converge', note: 'Comparer en 1⁺', noEq: true },
        { html: 'En +∞ : f(x)·x^(3/2) → 1 ; α = 3/2 > 1 : converge', note: 'Comparer en +∞', noEq: true },
        { html: 'Les deux morceaux convergent : I converge', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-improper-rational', {
    prereqs: ['a1-int-rational', 'a1-improper-compare', 'g0-horner'], icon: '∫₁^∞ P/Q', examWeight: 1, exam: ['open'],
    title: 'Intégrale généralisée d\'une fraction rationnelle (problème long)',
    desc: 'Convergence, DES, primitives, regrouper les Log, limite en +∞.',
    prereqWhy: { 'a1-int-rational': 'DES et primitives', 'a1-improper-compare': 'la convergence en +∞', 'g0-horner': 'trouver la racine du dénominateur' },
    intro: {
      rule: '(a) Convergence : deg Q − deg P ≥ 2 ⇒ converge en +∞, et Q sans racine sur [a ; +∞[. (b) Valeur : DES, primitives (Log et Arctg), puis <b>regrouper les Log avant la limite</b> : −2Log(x + 1) + Log(x² + 2x + 2) = Log((x² + 2x + 2)/(x + 1)²) → 0.',
      lines: [
        { html: 'I = ∫₁^∞ (4x + 2)/(x³ + 3x² + 4x + 2) dx : f(x) ~ 4/x², α = 2 > 1, converge', note: '(a) Convergence', noEq: true },
        { cas: '(4x+2)/((x+1)(x^2+2x+2))', note: 'Q(−1) = 0', noEq: true },
        { cas: '-2/(x+1)+(2x+6)/(x^2+2x+2)', note: 'DES' },
        { cas: '-2ln(x+1)+ln(x^2+2x+2)+4arctan(x+1)', note: 'Primitive', noEq: true },
        { cas: 'ln((x^2+2x+2)/(x+1)^2)+4arctan(x+1)', note: 'Regrouper les Log : → 2π en +∞' },
        { cas: '2π-ln(5/4)-4arctan(2)', note: 'I = 2π − F(1)', noEq: true },
      ],
    },
  }),
  S('a1-int-applications', {
    prereqs: ['a1-int-subst', 'a1-int-hyper'], icon: 'V, L', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Applications : volumes, longueurs d\'arc, aires de révolution',
    desc: 'V = π∫f², L = ∫√(1 + f′²), A = 2π∫|f|√(1 + f′²).',
    prereqWhy: { 'a1-int-subst': 'changement de variable dans les intégrales de longueur et de volume', 'a1-int-hyper': '1 + sinh² = cosh² fait disparaître la racine' },
    intro: {
      rule: 'Autour de l\'axe Ox, pour y = f(x) sur [a ; b] : volume V = π∫ₐᵇ f(x)² dx ; longueur L = ∫ₐᵇ √(1 + f′(x)²) dx ; aire de révolution A = 2π∫ₐᵇ |f(x)|·√(1 + f′(x)²) dx.',
      lines: [
        { html: 'L de y = cosh x sur [0 ; ln 2] : L = ∫ √(1 + sinh²x) dx', note: 'Formule de la longueur', noEq: true },
        { cas: 'int(cosh(x),x,0,ln(2))', note: '1 + sinh² = cosh²', noEq: true },
        { cas: 'bracket(sinh(x),x,0,ln(2))', note: 'Primitive' },
        { cas: '(2-1/2)/2', note: 'sinh(ln 2)' },
        { cas: '3/4', note: 'Valeur' },
      ],
    },
  }),
];
