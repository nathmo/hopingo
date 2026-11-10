// Module G6, part a (unit `analyse0`, step U2): derivatives of the table,
// tangent, limits, variation, convexity, optimisation. Catalogue:
// docs/universite/G-gymnase-2.md, G6. g6-deriv-usual comes first: it is
// placed before the pilot g6-deriv-rules by analyse0.skills.js.

const S = (id, year, rest) => ({ id, unit: 'analyse0', year, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('g6-deriv-usual', 12, {
    prereqs: ['g2-real-powers', 'g3-radians'], icon: 'f′', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Dérivées usuelles',
    desc: 'La table : xⁿ, √x, 1/x, eˣ, aˣ, ln x, sin, cos, tan, arctan, sinh, cosh.',
    prereqWhy: { 'g2-real-powers': '√x = x^(1/2), 5/x = 5x⁻¹ : réécrire en puissances', 'g3-radians': 'sin′ = cos seulement en radians' },
    intro: {
      rule: '(xⁿ)′ = nxⁿ⁻¹ (n réel), (√x)′ = 1/(2√x), (1/x)′ = −1/x², (eˣ)′ = eˣ, (aˣ)′ = aˣ·ln a, (ln x)′ = 1/x, sin′ = cos, cos′ = −sin, tan′ = 1/cos², arctan′ = 1/(1 + x²), sinh′ = cosh, cosh′ = sinh.<br>La dérivée d\'une somme est la somme des dérivées, et les constantes sortent.',
    },
  }),
  S('g6-tangent', 12, {
    prereqs: ['g6-deriv-rules', 'g4-line2'], icon: 'y=mx+p', examWeight: 1, exam: ['mcq', 'coef', 'open'],
    title: 'Tangente et approximation linéaire',
    desc: 'y = f(a) + f′(a)(x − a), et f(a + h) ≈ f(a) + f′(a)·h.',
    prereqWhy: { 'g6-deriv-rules': 'calculer f′ pour avoir la pente', 'g4-line2': 'écrire l\'équation d\'une droite' },
    intro: {
      rule: 'La tangente au graphe de f en a est y = f(a) + f′(a)(x − a). L\'approximation linéaire de f(a + h) est f(a) + f′(a)·h.<br>On calcule f(a) et f′(a) <b>en a</b>, puis on écrit la droite.',
    },
  }),
  S('g6-limits', 12.5, {
    prereqs: ['rat-simplify', 'g1-domain'], icon: 'lim', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Limites de fonctions pour l\'étude de fonction',
    desc: 'Terme dominant en ±∞, signe à gauche et à droite d\'un pôle, expression conjuguée.',
    prereqWhy: { 'rat-simplify': 'simplifier une fraction après la mise en évidence', 'g1-domain': 'les bornes du domaine donnent les limites à étudier' },
    intro: {
      rule: 'En ±∞ : on met en évidence le terme dominant. En un zéro du dénominateur : numérateur ≠ 0 donne ±∞, avec le signe à gauche et à droite. Forme ∞ − ∞ avec une racine : on multiplie et on divise par l\'expression conjuguée.',
    },
  }),
  S('g6-sign-variation', 12, {
    prereqs: ['g6-deriv-rules', 'g1-sign-table'], icon: '↗↘', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Signe de f′, tableau de variation, extrema locaux',
    desc: 'Factoriser f′, faire son tableau de signes, lire la variation et les extrema.',
    prereqWhy: { 'g6-deriv-rules': 'calculer f′', 'g1-sign-table': 'le tableau de signes de f′' },
    intro: {
      rule: 'On factorise f′, on fait son tableau de signes, et on lit la variation : f′ > 0, f croît ; f′ < 0, f décroît.<br>Un extremum local en a demande que f′ <b>change de signe</b> en a : f′(a) = 0 ne suffit pas (x³ en 0).',
    },
  }),
  S('g6-convexity', 12, {
    prereqs: ['g6-sign-variation', 'g6-tangent'], icon: '∪∩', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Concavité et points d\'inflexion',
    desc: 'Signe de f″, points où la concavité change, tangente d\'inflexion.',
    prereqWhy: { 'g6-sign-variation': 'même tableau de signes, appliqué à f″', 'g6-tangent': 'la tangente d\'inflexion' },
    intro: {
      rule: 'f″ > 0 : f est convexe (le graphe est au-dessus de ses tangentes). f″ < 0 : concave.<br>Un point d\'inflexion est un point où <b>la concavité change</b> : f″ change de signe (f″(a) = 0 ne suffit pas : x⁴ en 0).',
    },
  }),
  S('g6-optim', 12, {
    prereqs: ['g6-sign-variation', 'g1-domain'], icon: 'max', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Optimisation',
    desc: 'Une grandeur en fonction d\'une seule variable, sa dérivée, le maximum dans le domaine.',
    prereqWhy: { 'g6-sign-variation': 'justifier le maximum par le signe de la dérivée', 'g1-domain': 'domaine de la variable (contraintes physiques)' },
    intro: {
      rule: '1. Nommer la variable et son domaine. 2. Écrire la grandeur en fonction d\'<b>une seule</b> variable. 3. Dériver, chercher les zéros <b>dans le domaine</b>. 4. Justifier le maximum. 5. Répondre à la question posée.',
    },
  }),
];
