// Module G10, cercles et coniques (unit `coniques`), part b: conics from
// their elements, tangents, the nature of a conic (the decision tree),
// reduction with a term in xy, back to the first frame and sketch, families,
// loci, homogeneous coordinates. Catalogue: docs/universite/G-gymnase-2.md,
// section G10. Built at step U5. Generators: coniques-b.js.

const S = (id, rest) => ({ id, unit: 'coniques', year: 12.5, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g10-conic-from-data', {
    prereqs: ['g10-hyperbola', 'g10-parabola', 'g1-irr-eq', 'g10-ellipse'], icon: 'MF=e·d', exam: ['mcq', 'open'],
    title: 'Trouver l\'équation d\'une conique à partir de ses éléments',
    desc: 'MF = e·d(M, D), élever au carré, reconnaître.',
    prereqWhy: { 'g10-hyperbola': 'reconnaître une hyperbole (e > 1)', 'g10-parabola': 'reconnaître une parabole (e = 1)', 'g1-irr-eq': 'élever au carré une égalité de racines', 'g10-ellipse': 'reconnaître une ellipse (e < 1)' },
    intro: {
      rule: 'Définition foyer-directrice : <b>MF = e·d(M, D)</b>. e &lt; 1 : ellipse ; e = 1 : parabole ; e &gt; 1 : hyperbole.<br>On écrit les deux distances, on élève au carré (elles sont positives), on développe, puis on reconnaît la forme réduite.',
      lines: [
        { cas: '√((x-2)^2+y^2)=(1/2)·|x-8|', note: 'F(2 ; 0), D : x = 8, e = 1/2', noEq: true },
        { cas: '(x-2)^2+y^2=(x-8)^2/4', note: 'Élever au carré', noEq: true },
        { cas: '3x^2+4y^2-48=0', note: 'Développer, réduire', noEq: true },
        { cas: 'x^2/16+y^2/12=1', note: 'Ellipse : a = 4, c = 2, e = c/a = 1/2', noEq: true },
      ],
    },
  }),
  S('g10-conic-tangent', {
    prereqs: ['g10-pole-polar', 'g10-ellipse', 'g10-hyperbola', 'g10-parabola'], icon: '⬭|', exam: ['mcq', 'open'],
    title: 'Tangentes à une conique',
    desc: 'Dédoubler en T ; depuis un point, la polaire.',
    prereqWhy: { 'g10-pole-polar': 'le dédoublement et la polaire', 'g10-ellipse': 'le point de contact sur une ellipse', 'g10-hyperbola': 'dédoubler l\'équation d\'une hyperbole', 'g10-parabola': 'dédoubler l\'équation d\'une parabole' },
    intro: {
      rule: 'En T(x₀ ; y₀) de la conique, on <b>dédouble</b> : x² → x₀x, y² → y₀y, xy → (x₀y + xy₀)/2, x → (x + x₀)/2, y → (y + y₀)/2.<br>Depuis un point Q extérieur : la polaire de Q (dédoubler avec Q) coupe la conique aux points de contact.',
      lines: [
        { cas: 'x^2+3y^2-28=0', note: 'T d\'abscisse −5 et d\'ordonnée positive : 25 + 3y² = 28, T = (−5 ; 1)', noEq: true },
        { cas: '(-5)·x+3·1·y-28=0', note: 'Dédoubler', noEq: true },
        { cas: '5x-3y+28=0', note: 'Contrôle : −25 − 3 + 28 = 0', noEq: true },
      ],
    },
  }),
  S('g10-conic-nature', {
    prereqs: ['g10-hyperbola', 'g10-parabola', 'g4-triple'], icon: 'δ Δ', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Choisir la méthode : nature d\'une conique',
    desc: 'Δ = det M, puis δ = det A : ellipse, hyperbole, parabole, dégénérée.',
    prereqWhy: { 'g10-hyperbola': 'conclure au genre hyperbole', 'g10-parabola': 'conclure au genre parabole', 'g4-triple': 'le déterminant 3 × 3 de M' },
    intro: {
      rule: 'A = [[a, b/2], [b/2, c]] et M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]] (la <b>moitié</b> de b, d, e hors de la diagonale).<br>Δ = det M ≠ 0 : non dégénérée. Puis δ = det A = λ₁λ₂ : δ &gt; 0 genre ellipse (réelle si (a + c)·Δ &lt; 0, vide sinon), δ &lt; 0 genre hyperbole, δ = 0 genre parabole.',
      lines: [
        { cas: '5x^2-6xy+5y^2-4x-4y-4=0', note: 'Départ', noEq: true },
        { html: 'Δ = det[[5, −3, −2], [−3, 5, −2], [−2, −2, −4]] = −128 ≠ 0', note: 'Non dégénérée', noEq: true },
        { html: 'δ = 5·5 − (−3)² = 16 &gt; 0', note: 'Genre ellipse', noEq: true },
        { html: '(a + c)·Δ = 10·(−128) &lt; 0', note: 'Ellipse réelle ; contrôle : λ = 2 et 8', noEq: true },
      ],
    },
  }),
  S('g10-conic-reduce', {
    prereqs: ['g10-conic-nature', 'l-eig-charpoly', 'l-eig-space', 'eq-systems'], icon: 'λX²+μY²', examWeight: 2, exam: ['coef', 'open'],
    title: 'Réduire une conique avec un terme en xy',
    desc: 'Valeurs et vecteurs propres de A, centre, constante f(Ω).',
    prereqWhy: { 'g10-conic-nature': 'la nature dit s\'il y a un centre', 'l-eig-charpoly': 'les valeurs propres de A', 'l-eig-space': 'les vecteurs propres, normés', 'eq-systems': 'le centre résout ∂f/∂x = ∂f/∂y = 0' },
    intro: {
      rule: '1. Valeurs propres λ₁, λ₂ de A et vecteurs propres <b>normés</b> u₁, u₂ (repère direct).<br>2. Centre Ω : ∂f/∂x = ∂f/∂y = 0. 3. Constante f(Ω).<br>4. Dans Ru = (Ω ; u₁, u₂) : λ₁X² + λ₂Y² + f(Ω) = 0. Sans centre (une λ nulle), on tourne d\'abord, puis on complète le carré.',
      lines: [
        { cas: '2x^2+4xy-y^2-6y-9=0', note: 'A = [[2, 2], [2, −1]]', noEq: true },
        { cas: '(2-λ)(-1-λ)-4=(λ-3)(λ+2)', note: 'λ₁ = 3, λ₂ = −2', noEq: true },
        { html: 'u₁ = (2 ; 1)/√5, u₂ = (−1 ; 2)/√5', note: 'Vecteurs propres normés', noEq: true },
        { html: 'Ω = (1 ; −1), f(Ω) = −6', note: '4x + 4y = 0 et 4x − 2y − 6 = 0', noEq: true },
        { cas: '3X^2-2Y^2-6=0', note: 'Soit X²/2 − Y²/3 = 1 dans Ru', noEq: true },
      ],
    },
  }),
  S('g10-conic-frame-back', {
    prereqs: ['g10-conic-reduce', 'g10-ellipse'], icon: 'Ru → Re', exam: ['mcq', 'coef', 'open'],
    title: 'Revenir au repère initial ; esquisser',
    desc: 'Un point (X ; Y) de Ru est Ω + X·u₁ + Y·u₂.',
    prereqWhy: { 'g10-conic-reduce': 'le repère Ru vient de la réduction', 'g10-ellipse': 'les foyers et les sommets dans Ru' },
    intro: {
      rule: 'Un point (X ; Y) de Ru est en <b>Ω + X·u₁ + Y·u₂</b> dans Re. On calcule foyers, sommets et axes dans Ru, puis on les transporte. Une asymptote Y = mX devient la droite par Ω de direction u₁ + m·u₂.',
      lines: [
        { cas: 'X^2/2-Y^2/3=1', note: 'Ω = (1 ; −1), u₁ = (2 ; 1)/√5, u₂ = (−1 ; 2)/√5', noEq: true },
        { html: 'c² = 2 + 3 = 5 : foyers (±√5 ; 0) dans Ru', note: 'Hyperbole : c² = a² + b²', noEq: true },
        { html: 'F = Ω + √5·u₁ = (1 ; −1) + (2 ; 1) = (3 ; 0)', note: 'Transporter', noEq: true },
        { cas: 'x-2y-3=0', note: 'Axe réel : par Ω, de direction (2 ; 1)', noEq: true },
      ],
    },
  }),
  S('g10-conic-family', {
    prereqs: ['g10-conic-nature', 'param-quadratic'], icon: 'F_m', exam: ['mcq', 'open'],
    title: 'Familles de coniques à paramètre, lieu des centres',
    desc: 'Le genre selon m ; éliminer m entre les équations du centre.',
    prereqWhy: { 'g10-conic-nature': 'le genre se lit sur δ', 'param-quadratic': 'le signe d\'un trinôme en m' },
    intro: {
      rule: 'Le genre dépend du signe de δ(m) (un trinôme en m). Le centre vérifie ½∂f/∂x = 0 et ½∂f/∂y = 0 : on isole m dans une équation et on remplace dans l\'autre pour obtenir le lieu des centres, dont on étudie la nature.<br>Attention aux divisions : les points où le dénominateur s\'annule sont à étudier à part.',
      lines: [
        { cas: 'x^2+2mxy+y^2-2x-4y+1=0', note: 'Départ', noEq: true },
        { html: 'δ(m) = 1 − m² : |m| &lt; 1 ellipse, |m| = 1 parabole, |m| &gt; 1 hyperbole', note: 'Genre selon m', noEq: true },
        { html: 'x + my − 1 = 0 et mx + y − 2 = 0 ; m = (1 − x)/y', note: 'Centre ; isoler m (y ≠ 0)', noEq: true },
        { cas: 'x^2-y^2-x+2y=0', note: 'Lieu : δ = −1, Δ = −3/4 : hyperbole ; (0 ; 0) exclu', noEq: true },
      ],
    },
  }),
  S('g10-locus', {
    prereqs: ['g1-irr-eq', 'g10-ellipse'], icon: 'lieu', exam: ['mcq', 'open'],
    title: 'Lieux géométriques qui donnent une conique',
    desc: 'Traduire la condition, élever au carré avec sa condition, reconnaître.',
    prereqWhy: { 'g1-irr-eq': 'élever au carré une équation avec des racines', 'g10-ellipse': 'reconnaître la conique obtenue' },
    intro: {
      rule: 'On nomme le point courant M(x ; y), on traduit la condition, on élimine les racines en élevant au carré <b>en notant la condition de signe</b>, on simplifie, puis on reconnaît la conique et on vérifie la condition.',
      lines: [
        { html: 'OM = 5 − MA', note: 'Cercles par A(3 ; 0), tangents intérieurement à x² + y² = 25', noEq: true },
        { cas: '10√((x-3)^2+y^2)=34-6x', note: 'Isoler une racine, avec 34 − 6x ≥ 0', noEq: true },
        { cas: '16x^2-48x+25y^2-64=0', note: 'Élever au carré, développer', noEq: true },
        { cas: '(x-3/2)^2/(25/4)+y^2/4=1', note: 'Ellipse de foyers O et A ; x ≤ 4, la condition est toujours vraie', noEq: true },
      ],
    },
  }),
  S('g10-homogeneous', {
    prereqs: ['g10-conic-nature'], icon: '(x:y:t)', tags: ['opt'], examWeight: 0, exam: ['mcq'],
    title: 'Coordonnées homogènes, points à l\'infini',
    desc: 'x → x/t, y → y/t ; les points à l\'infini ont t = 0.',
    prereqWhy: { 'g10-conic-nature': 'le genre se lit sur les points à l\'infini' },
    intro: {
      rule: 'On remplace x par x/t et y par y/t, puis on multiplie par t² (par tⁿ pour un degré n). Les points à l\'infini ont t = 0 : deux points réels (genre hyperbole, directions des asymptotes), un point double (genre parabole), aucun (genre ellipse).',
      lines: [
        { cas: 'x^2-xy-2y^2+3x-5=0', note: 'Départ', noEq: true },
        { cas: 'x^2-xy-2y^2+3xt-5t^2=0', note: 'Homogénéiser', noEq: true },
        { cas: '(x-2y)(x+y)=0', note: 't = 0', noEq: true },
        { html: '(2 : 1 : 0) et (1 : −1 : 0)', note: 'Genre hyperbole', noEq: true },
      ],
    },
  }),
];
