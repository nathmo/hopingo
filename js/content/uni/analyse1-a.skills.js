// Module A1, part a (unit `analyse1`, step U2): derivatives by the
// definition, the rules at BA1 level, inverse functions, logarithmic
// derivatives, C¹. Catalogue: docs/universite/A1-analyse-1.md, « Dérivées ».

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-deriv-def', {
    prereqs: ['a1-fn-onesided', 'a1-seq-squeeze'], icon: 'f′(x₀)', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Dérivée par la définition ; dérivées à gauche et à droite',
    desc: 'f′(x₀) = lim (f(x₀ + h) − f(x₀))/h, et les deux côtés aux raccords.',
    prereqWhy: { 'a1-fn-onesided': 'dérivées à gauche et à droite : limites d\'un côté', 'a1-seq-squeeze': 'gendarmes : |h·sin(1/h)| ≤ |h|' },
    intro: {
      rule: 'f′(x₀) = lim_{h→0} (f(x₀ + h) − f(x₀))/h, si cette limite existe et est finie. Aux points de raccord, on calcule les dérivées à gauche et à droite séparément.<br>Dérivable ⇒ continue, pas l\'inverse (|x| en 0).',
    },
  }),
  S('a1-deriv-rules', {
    prereqs: ['g6-deriv-rules', 'g2-hyp-def', 'g3-arc-def'], icon: 'Arctg′', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Dériver au niveau BA1 : produits, quotients, compositions, fonctions arc et hyperboliques',
    desc: 'Les règles, avec Arctg, Arcsin, sinh, cosh, Argsh.',
    prereqWhy: { 'g6-deriv-rules': 'produit, quotient et chaîne', 'g2-hyp-def': 'sinh′ = cosh, cosh′ = sinh', 'g3-arc-def': 'les fonctions arc et leurs domaines' },
    intro: {
      rule: '(uv)′ = u′v + uv′, (u/v)′ = (u′v − uv′)/v², (f∘g)′ = f′(g)·g′.<br>À connaître : Arctg′ = 1/(1 + x²), Arcsin′ = 1/√(1 − x²), sinh′ = cosh, cosh′ = sinh, Argsh′ = 1/√(1 + x²).',
    },
  }),
  S('a1-deriv-inverse', {
    prereqs: ['a1-deriv-rules', 'g1-inverse'], icon: '(f⁻¹)′', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Dérivée d\'une fonction réciproque en un point',
    desc: '(f⁻¹)′(y₀) = 1/f′(x₀), avec f(x₀) = y₀.',
    prereqWhy: { 'a1-deriv-rules': 'dériver f', 'g1-inverse': 'trouver x₀ tel que f(x₀) = y₀' },
    intro: {
      rule: 'Si f est bijective, dérivable en x₀ avec f′(x₀) ≠ 0, et y₀ = f(x₀), alors (f⁻¹)′(y₀) = 1/f′(x₀).<br>On cherche d\'abord <b>x₀</b> tel que f(x₀) = y₀ ; on n\'a pas besoin de la formule de f⁻¹.',
    },
  }),
  S('a1-deriv-log', {
    prereqs: ['a1-deriv-rules', 'g2-real-powers'], icon: '(uᵛ)′', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Dérivée logarithmique : u(x)^(v(x))',
    desc: 'u^v = e^(v·Log u), puis la règle de chaîne.',
    prereqWhy: { 'a1-deriv-rules': 'dériver l\'exposant v·Log u', 'g2-real-powers': 'u^v = e^(v·Log u)' },
    intro: {
      rule: 'u^v = e^(v·Log u) (u > 0), donc (u^v)′ = u^v·(v′·Log u + v·u′/u).<br>La règle (xⁿ)′ = n·xⁿ⁻¹ ne vaut que pour un exposant constant. Exemple : (xˣ)′ = xˣ(Log x + 1).',
    },
  }),
  S('a1-c1-def', {
    prereqs: ['a1-deriv-def', 'a1-fn-extension'], icon: 'C¹', examWeight: 1, exam: ['mcq', 'open'], tags: ['GM'],
    title: 'Définir C¹(I)',
    desc: 'Dérivable en tout point de I, et f′ continue sur I.',
    prereqWhy: { 'a1-deriv-def': 'dérivabilité en chaque point de I', 'a1-fn-extension': 'continuité de f′' },
    intro: {
      rule: 'Soit I un intervalle ouvert. f ∈ C¹(I) si f est dérivable en tout point de I <b>et</b> si sa dérivée f′ : I → ℝ est continue sur I.<br>Dérivable ne suffit pas : x²·sin(1/x) est dérivable sur ℝ, mais f′ n\'est pas continue en 0.',
    },
  }),
  S('a1-piecewise-ab', {
    prereqs: ['a1-deriv-def', 'a1-fn-extension', 'eq-systems'], icon: 'a, b', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Fonction par morceaux : choisir a et b pour qu\'elle soit dérivable',
    desc: 'Continuité au raccord, puis mêmes dérivées à gauche et à droite.',
    prereqWhy: { 'a1-deriv-def': 'dérivées à gauche et à droite', 'a1-fn-extension': 'continuité au raccord', 'eq-systems': 'résoudre les deux équations en a et b' },
    intro: {
      rule: 'Dans l\'ordre : (1) continuité au raccord (une équation), (2) égalité des dérivées à gauche et à droite (une deuxième équation).<br>On peut dériver chaque morceau et évaluer au raccord <b>seulement si</b> f est continue au raccord.',
    },
  }),
  S('a1-c1-proof', {
    prereqs: ['a1-c1-def', 'a1-deriv-def', 'a1-deriv-rules', 'a1-seq-squeeze'], icon: '∈C¹', examWeight: 2, exam: ['mcq', 'tf', 'open'], tags: ['GM'],
    title: 'Montrer qu\'une fonction définie par morceaux est C¹',
    desc: 'Hors du point, en x₀ par la définition, limite de f′, conclusion.',
    prereqWhy: {
      'a1-c1-def': 'la définition à vérifier', 'a1-deriv-def': 'f′(x₀) par le taux d\'accroissement',
      'a1-deriv-rules': 'f′ hors de x₀', 'a1-seq-squeeze': 'majorer |x·sin(1/x)| par |x|',
    },
    intro: {
      rule: 'Quatre temps : (1) hors de x₀, f est C¹ comme somme, produit, composée de fonctions C¹ : on donne f′ ; (2) en x₀, f′(x₀) <b>par la définition</b> ; (3) lim_{x→x₀} f′(x) = f′(x₀) ; (4) conclusion.<br>Le point (3) ne remplace pas le point (2).',
    },
  }),
];
