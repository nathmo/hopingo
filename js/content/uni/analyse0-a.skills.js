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
      lines: [
        { cas: 'd(3x^4-2√x+5/x)', note: 'Départ', noEq: true },
        { cas: '3d(x^4)-2d(x^(1/2))+5d(x^(-1))', note: 'Linéarité, réécrire en puissances' },
        { cas: '12x^3-2×(1/2)x^(-1/2)+5×(-1)x^(-2)', note: 'Table' },
        { cas: '12x^3-1/√x-5/x^2', note: 'Simplifier' },
      ],
    },
  }),
  S('g6-tangent', 12, {
    prereqs: ['g6-deriv-rules', 'g4-line2'], icon: 'y=mx+p', examWeight: 1, exam: ['mcq', 'coef', 'open'],
    title: 'Tangente et approximation linéaire',
    desc: 'y = f(a) + f′(a)(x − a), et f(a + h) ≈ f(a) + f′(a)·h.',
    prereqWhy: { 'g6-deriv-rules': 'calculer f′ pour avoir la pente', 'g4-line2': 'écrire l\'équation d\'une droite' },
    intro: {
      rule: 'La tangente au graphe de f en a est y = f(a) + f′(a)(x − a). L\'approximation linéaire de f(a + h) est f(a) + f′(a)·h.<br>On calcule f(a) et f′(a) <b>en a</b>, puis on écrit la droite.',
      lines: [
        { html: 'f(x) = x³ − 2x + 1, a = 2', note: 'Départ', noEq: true },
        { html: 'f(2) = 8 − 4 + 1 = 5', note: 'Valeur en a', noEq: true },
        { html: 'f′(x) = 3x² − 2', note: 'Dériver', noEq: true },
        { html: 'f′(2) = 10', note: 'Pente en a', noEq: true },
        { html: 'y = 5 + 10(x − 2)', note: 'Écrire la tangente', noEq: true },
        { html: 'y = 10x − 15', note: 'Simplifier', noEq: true },
      ],
    },
  }),
  S('g6-limits', 12.5, {
    prereqs: ['rat-simplify', 'g1-domain'], icon: 'lim', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Limites de fonctions pour l\'étude de fonction',
    desc: 'Terme dominant en ±∞, signe à gauche et à droite d\'un pôle, expression conjuguée.',
    prereqWhy: { 'rat-simplify': 'simplifier une fraction après la mise en évidence', 'g1-domain': 'les bornes du domaine donnent les limites à étudier' },
    intro: {
      rule: 'En ±∞ : on met en évidence le terme dominant. En un zéro du dénominateur : numérateur ≠ 0 donne ±∞, avec le signe à gauche et à droite. Forme ∞ − ∞ avec une racine : on multiplie et on divise par l\'expression conjuguée.',
      lines: [
        { cas: 'lim(√(x^2+4x)-x,x,+∞)', note: 'Forme ∞ − ∞', noEq: true },
        { cas: 'lim(4x/(√(x^2+4x)+x),x,+∞)', note: 'Conjuguée' },
        { cas: 'lim(4/(√(1+4/x)+1),x,+∞)', note: 'Diviser par x (x > 0)' },
        { cas: '2', note: 'Passer à la limite' },
      ],
    },
  }),
  S('g6-sign-variation', 12, {
    prereqs: ['g6-deriv-rules', 'g1-sign-table'], icon: '↗↘', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Signe de f′, tableau de variation, extrema locaux',
    desc: 'Factoriser f′, faire son tableau de signes, lire la variation et les extrema.',
    prereqWhy: { 'g6-deriv-rules': 'calculer f′', 'g1-sign-table': 'le tableau de signes de f′' },
    intro: {
      rule: 'On factorise f′, on fait son tableau de signes, et on lit la variation : f′ > 0, f croît ; f′ < 0, f décroît.<br>Un extremum local en a demande que f′ <b>change de signe</b> en a : f′(a) = 0 ne suffit pas (x³ en 0).',
      lines: [
        { html: 'f(x) = x³ − 3x² − 9x + 2', note: 'Départ', noEq: true },
        { html: 'f′(x) = 3x² − 6x − 9 = 3(x + 1)(x − 3)', note: 'Dériver, factoriser', noEq: true },
        { html: 'f′ &gt; 0 sur ]−∞ ; −1[ ∪ ]3 ; +∞[, f′ &lt; 0 sur ]−1 ; 3[', note: 'Signe de f′', noEq: true },
        { html: 'Max local en −1 : f(−1) = 7 ; min local en 3 : f(3) = −25', note: 'Extrema', noEq: true },
      ],
    },
  }),
  S('g6-convexity', 12, {
    prereqs: ['g6-sign-variation', 'g6-tangent'], icon: '∪∩', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Concavité et points d\'inflexion',
    desc: 'Signe de f″, points où la concavité change, tangente d\'inflexion.',
    prereqWhy: { 'g6-sign-variation': 'même tableau de signes, appliqué à f″', 'g6-tangent': 'la tangente d\'inflexion' },
    intro: {
      rule: 'f″ > 0 : f est convexe (le graphe est au-dessus de ses tangentes). f″ < 0 : concave.<br>Un point d\'inflexion est un point où <b>la concavité change</b> : f″ change de signe (f″(a) = 0 ne suffit pas : x⁴ en 0).',
      lines: [
        { html: 'f(x) = x³ − 3x² − 9x + 2', note: 'Départ', noEq: true },
        { html: 'f″(x) = 6x − 6 = 6(x − 1)', note: 'Dériver deux fois', noEq: true },
        { html: 'f″ &lt; 0 sur ]−∞ ; 1[, f″ &gt; 0 sur ]1 ; +∞[', note: 'Signe de f″', noEq: true },
        { html: 'Inflexion en (1 ; −9)', note: 'Point d\'inflexion', noEq: true },
        { html: 'f′(1) = −12 ; tangente y = −12x + 3', note: 'Tangente d\'inflexion', noEq: true },
      ],
    },
  }),
  S('g6-optim', 12, {
    prereqs: ['g6-sign-variation', 'g1-domain'], icon: 'max', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Optimisation',
    desc: 'Une grandeur en fonction d\'une seule variable, sa dérivée, le maximum dans le domaine.',
    prereqWhy: { 'g6-sign-variation': 'justifier le maximum par le signe de la dérivée', 'g1-domain': 'domaine de la variable (contraintes physiques)' },
    intro: {
      rule: '1. Nommer la variable et son domaine. 2. Écrire la grandeur en fonction d\'<b>une seule</b> variable. 3. Dériver, chercher les zéros <b>dans le domaine</b>. 4. Justifier le maximum. 5. Répondre à la question posée.',
      lines: [
        { html: 'Boîte ouverte dans une feuille 16 × 10, carrés de côté x aux coins', note: 'Départ', noEq: true },
        { html: '0 &lt; x &lt; 5', note: 'Variable et domaine', noEq: true },
        { html: 'V(x) = x(16 − 2x)(10 − 2x) = 4x³ − 52x² + 160x', note: 'Grandeur à optimiser', noEq: true },
        { html: 'V′(x) = 12x² − 104x + 160 = 4(3x − 20)(x − 2)', note: 'Dériver, factoriser', noEq: true },
        { html: 'x = 2 (x = 20/3 est hors du domaine)', note: 'Racines dans le domaine', noEq: true },
        { html: 'V′ &gt; 0 sur ]0 ; 2[, V′ &lt; 0 sur ]2 ; 5[ : max, V(2) = 144', note: 'Justifier le maximum', noEq: true },
      ],
    },
  }),
];
