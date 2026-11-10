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
    },
  }),
  S('a1-ftc', {
    prereqs: ['a1-deriv-rules'], icon: 'd/dx ∫', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Théorème fondamental ; dériver ∫ₐ^(g(x)) f(t) dt',
    desc: 'F′ = f, puis la règle de chaîne sur la borne.',
    prereqWhy: { 'a1-deriv-rules': 'la règle de chaîne sur la borne g(x)' },
    intro: {
      rule: 'Si f est continue, F(x) = ∫ₐˣ f(t) dt est dérivable et F′ = f. Avec des bornes variables : d/dx ∫_{h(x)}^{g(x)} f(t) dt = f(g(x))·g′(x) − f(h(x))·h′(x).<br>La variable d\'intégration t est muette.',
    },
  }),
  S('a1-improper-calc', {
    prereqs: ['a1-int-subst', 'a1-int-parts', 'a1-fn-limits'], icon: '∫₀⁺', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Intégrale généralisée : calculer par une limite (bornes 0⁺, 1⁻, +∞)',
    desc: 'Repérer chaque point problème, intégrale propre, puis limite.',
    prereqWhy: { 'a1-int-subst': 'primitives par changement de variable', 'a1-int-parts': 'primitives par parties (x·e^(−x), Log x)', 'a1-fn-limits': 'la limite à la borne' },
    intro: {
      rule: 'On repère <b>chaque</b> point problème (borne infinie, f non bornée en une borne, ou à l\'intérieur). On écrit ∫ de a⁺ à b = lim_{ε→a⁺} ∫_ε^b, on calcule l\'intégrale propre, puis la limite. Tu écris la borne 0⁺ avec la touche ⁺.',
    },
  }),
  S('a1-improper-compare', {
    prereqs: ['a1-improper-calc', 'a1-ser-compare'], icon: '∫ ≤ ∫', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Convergence d\'une intégrale généralisée par comparaison, sans la calculer',
    desc: 'Comparer à 1/xᵅ en 0⁺ (α < 1) et en +∞ (α > 1).',
    prereqWhy: { 'a1-improper-calc': 'repérer les points problèmes', 'a1-ser-compare': 'le critère de comparaison et du quotient' },
    intro: {
      rule: '∫ de 0⁺ à 1 de dx/xᵅ converge ⇔ <b>α < 1</b> ; ∫₁^∞ dx/xᵅ converge ⇔ <b>α > 1</b>. Pour f ≥ 0, si f(x)/g(x) → L ∈ ]0 ; +∞[ au point problème, même nature.<br>On traite chaque point problème séparément.',
    },
  }),
  S('a1-improper-rational', {
    prereqs: ['a1-int-rational', 'a1-improper-compare', 'g0-horner'], icon: '∫₁^∞ P/Q', examWeight: 1, exam: ['open'],
    title: 'Intégrale généralisée d\'une fraction rationnelle (problème long)',
    desc: 'Convergence, DES, primitives, regrouper les Log, limite en +∞.',
    prereqWhy: { 'a1-int-rational': 'DES et primitives', 'a1-improper-compare': 'la convergence en +∞', 'g0-horner': 'trouver la racine du dénominateur' },
    intro: {
      rule: '(a) Convergence : deg Q − deg P ≥ 2 ⇒ converge en +∞, et Q sans racine sur [a ; +∞[. (b) Valeur : DES, primitives (Log et Arctg), puis <b>regrouper les Log avant la limite</b> : −2Log(x + 1) + Log(x² + 2x + 2) = Log((x² + 2x + 2)/(x + 1)²) → 0.',
    },
  }),
  S('a1-int-applications', {
    prereqs: ['a1-int-subst', 'a1-int-hyper'], icon: 'V, L', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Applications : volumes, longueurs d\'arc, aires de révolution',
    desc: 'V = π∫f², L = ∫√(1 + f′²), A = 2π∫|f|√(1 + f′²).',
    prereqWhy: { 'a1-int-subst': 'changement de variable dans les intégrales de longueur et de volume', 'a1-int-hyper': '1 + sinh² = cosh² fait disparaître la racine' },
    intro: {
      rule: 'Autour de l\'axe Ox, pour y = f(x) sur [a ; b] : volume V = π∫ₐᵇ f(x)² dx ; longueur L = ∫ₐᵇ √(1 + f′(x)²) dx ; aire de révolution A = 2π∫ₐᵇ |f(x)|·√(1 + f′(x)²) dx.',
    },
  }),
];
