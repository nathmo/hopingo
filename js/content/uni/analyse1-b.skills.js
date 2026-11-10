// Module A1, part b (unit `analyse1`, step U2): mean value theorem,
// Bernoulli-l'Hôpital, global extrema, study of a function, parametric and
// polar curves. Catalogue: docs/universite/A1-analyse-1.md, « Dérivées ».

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-mvt', {
    prereqs: ['a1-deriv-rules', 'a1-fn-image'], icon: 'TAF', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Rolle et accroissements finis : encadrer un taux d\'accroissement',
    desc: '(f(b) − f(a))/(b − a) = f′(c) : encadrer f′ sur l\'intervalle.',
    prereqWhy: { 'a1-deriv-rules': 'dériver f', 'a1-fn-image': 'l\'image de f′ sur l\'intervalle' },
    intro: {
      rule: 'TAF : f continue sur [a ; b], dérivable sur ]a ; b[ ⇒ il existe c ∈ ]a ; b[ tel que (f(b) − f(a))/(b − a) = f′(c). Donc si m ≤ f′ ≤ M sur l\'intervalle, m ≤ (f(y) − f(x))/(y − x) ≤ M.<br>Rolle exige la dérivabilité : |x| sur [−1 ; 1] n\'a pas de c.',
    },
  }),
  S('a1-bh', {
    prereqs: ['a1-fn-limits', 'a1-deriv-rules'], icon: 'BH', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Règle de Bernoulli-l\'Hôpital, avec ses conditions',
    desc: 'Forme 0/0 ou ∞/∞ : lim f/g = lim f′/g′.',
    prereqWhy: { 'a1-fn-limits': 'reconnaître une forme indéterminée', 'a1-deriv-rules': 'dériver le haut et le bas' },
    intro: {
      rule: 'Si f/g est de la forme <b>0/0 ou ∞/∞</b>, g′ ≠ 0 près du point et lim f′/g′ = L, alors lim f/g = L.<br>On vérifie la forme <b>avant chaque application</b>, et on dérive le haut et le bas <b>séparément</b>, pas (f/g)′.',
    },
  }),
  S('a1-extrema-global', {
    prereqs: ['a1-fn-image', 'a1-deriv-rules', 'g6-sign-variation'], icon: 'min max', examWeight: 2, exam: ['mcq', 'open'],
    title: 'Extrema globaux sur [a ; b] : bornes, f′ = 0, f′ qui n\'existe pas',
    desc: 'Trois sortes de candidats, puis comparer les valeurs.',
    prereqWhy: { 'a1-fn-image': 'min et max atteints sur un segment', 'a1-deriv-rules': 'dériver f', 'g6-sign-variation': 'confirmer les candidats par le signe de f′' },
    intro: {
      rule: 'f continue sur [a ; b] atteint son min et son max. Candidats : <b>les bornes</b>, les points où <b>f′ = 0</b>, les points où <b>f′ n\'existe pas</b>. On compare les valeurs.',
    },
  }),
  S('a1-fn-study', {
    prereqs: ['a1-extrema-global', 'a1-fn-limits', 'g6-study-full'], icon: 'f″', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Étude de fonction : convexité, asymptotes, graphe',
    desc: 'f″ et la convexité, asymptotes par limites ou division, choisir le graphe.',
    prereqWhy: { 'a1-extrema-global': 'monotonie et extrema', 'a1-fn-limits': 'limites aux bornes pour les asymptotes', 'g6-study-full': 'même plan d\'étude qu\'au gymnase' },
    intro: {
      rule: 'f″ > 0 : convexe ; f″ < 0 : concave ; changement de signe : inflexion. Asymptote oblique y = mx + p : m = lim f(x)/x, puis p = lim (f(x) − mx) ; pour une fraction rationnelle, la division euclidienne donne les deux d\'un coup.',
    },
  }),
  S('a1-param-curve', {
    prereqs: ['a1-deriv-rules', 'a1-fn-limits'], icon: 'γ(t)', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Courbes paramétrées : tangentes, points doubles, asymptotes',
    desc: 'Pente ẏ/ẋ, tangentes horizontales et verticales, γ(t) = γ(s).',
    prereqWhy: { 'a1-deriv-rules': 'dériver x(t) et y(t)', 'a1-fn-limits': 'asymptotes : limites quand t → t₀' },
    intro: {
      rule: 'γ(t) = (x(t) ; y(t)). Pente de la tangente : ẏ/ẋ (si ẋ ≠ 0). Tangente horizontale : ẏ = 0, ẋ ≠ 0 ; verticale : ẋ = 0, ẏ ≠ 0. Point double : deux valeurs t ≠ s avec γ(t) = γ(s).',
    },
  }),
  S('a1-polar-curve', {
    prereqs: ['a1-param-curve', 'g3-identities'], icon: 'ρ(φ)', examWeight: 1, exam: ['open'],
    title: 'Courbe polaire ρ = f(φ) : limites, pente, tangentes (problème long)',
    desc: 'x = ρ cos φ, y = ρ sin φ : limites, ρ̇, pente, tangentes horizontales.',
    prereqWhy: { 'a1-param-curve': 'une courbe polaire est une courbe paramétrée par φ', 'g3-identities': 'simplifier avec l\'angle moitié' },
    intro: {
      rule: 'x = ρ(φ)·cos φ, y = ρ(φ)·sin φ. Pente : y′ = (ρ̇ sin φ + ρ cos φ)/(ρ̇ cos φ − ρ sin φ). Une asymptote se lit sur les limites de x(φ) et y(φ) quand ρ → ∞.',
    },
  }),
];
