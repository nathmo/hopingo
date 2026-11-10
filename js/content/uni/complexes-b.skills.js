// Module G8, part b (unit `complexes`, step U4): polynomials, loci, ratios, transformations, inversion.
// Catalogue: docs/universite/G-gymnase-2.md. Skills: g8-poly, g8-locus, g8-ratio-angle, g8-transform, g8-inversion.
// Year 12.5 (niveau CMS): needsSolo. G4 and G10 (step U5) are stand-ins
// in UNBUILT (js/content/uni/index.js); the loci are judged by the mode 'locus'
// of the poly judge (js/judges/locus.js) until the geom judge of U5.

const S = (id, rest) => ({ id, unit: 'complexes', year: 12.5, optional: false, needsSolo: true, tags: ['MAN', 'CMS'], examWeight: 1, ...rest });

export const SKILLS = [
  S('g8-poly', {
    prereqs: ['g8-quadratic', 'g0-long-div'], icon: 'P(w̄)', exam: ['mcq', 'tf', 'open'],
    title: 'Polynômes complexes, théorème fondamental, racines conjuguées',
    desc: 'Un polynôme réel a ses racines par paires conjuguées : (x − w)(x − w̄) est un facteur réel.',
    prereqWhy: { 'g8-quadratic': 'racines des facteurs du 2e degré', 'g0-long-div': 'théorème du reste et division par le facteur réel' },
    intro: {
      rule: 'Un polynôme de degré n a n racines dans ℂ, comptées avec multiplicité. Si ses coefficients sont <b>réels</b>, la conjuguée d\'une racine est aussi racine, et (z − w)(z − w̄) = z² − 2Re(w)z + |w|² est un facteur réel.<br>Si les coefficients ne sont pas réels, cette règle ne vaut pas.',
      lines: [
        { html: 'P réel, unitaire, de degré 3, de racine 2 − i ; le reste de sa division par x − 1 vaut 4', note: 'Départ', noEq: true },
        { html: 'Coefficients réels : 2 + i est aussi racine', note: 'Racine conjuguée', noEq: true },
        { html: '(x − (2 − i))(x − (2 + i)) = (x − 2)² + 1 = x² − 4x + 5', note: 'Facteur réel', noEq: true },
        { html: 'P(x) = (x² − 4x + 5)(x − r) ; P(1) = 2(1 − r) = 4, donc r = −1', note: 'Condition (reste = P(1))', noEq: true },
        { html: 'P(x) = x³ − 3x² + x + 5', note: 'Développer', noEq: true },
      ],
    },
  }),
  S('g8-locus', {
    prereqs: ['g8-algebraic', 'g4-bisectors', 'g10-circle-eq'], icon: '|z − a|', exam: ['mcq', 'tf', 'open'],
    title: 'Lieux dans le plan complexe',
    desc: '|z − a| est une distance : médiatrices, cercles, disques et demi-plans.',
    prereqWhy: { 'g8-algebraic': 'écrire |z − a| en x et y', 'g4-bisectors': 'reconnaître une médiatrice', 'g10-circle-eq': 'reconnaître un cercle (centre, rayon)' },
    intro: {
      rule: 'On pose z = x + iy et on traduit : |z − a| est la distance de z au point d\'affixe a. |z − a| = |z − b| : médiatrice de [AB]. |z − a| = r : cercle. |z − a| = k|z − b| (k ≠ 1) : cercle (d\'Apollonius). Re, Im et z·z̄ = x² + y² donnent des droites et des cercles.<br>On élève les modules au carré pour enlever les racines.',
      lines: [
        { html: '|z − 2i| = |z + 4| : points équidistants de A(0 ; 2) et B(−4 ; 0)', note: 'Lecture géométrique : médiatrice de [AB]', noEq: true },
        { html: 'x² + (y − 2)² = (x + 4)² + y²', note: 'Module au carré', noEq: true },
        { html: '−4y + 4 = 8x + 16', note: 'Développer', noEq: true },
        { html: '2x + y + 3 = 0', note: 'Équation du lieu', noEq: true },
      ],
    },
  }),
  S('g8-ratio-angle', {
    prereqs: ['g8-polar'], icon: 'c − a / b − a', exam: ['mcq', 'tf', 'open'],
    title: 'Rapport de longueurs et angle par un quotient',
    desc: 'q = (c − a)/(b − a) : |q| = AC/AB, arg q = angle de AB⃗ vers AC⃗.',
    prereqWhy: { 'g8-polar': 'module et argument du quotient' },
    intro: {
      rule: 'Avec A, B, C d\'affixes a, b, c : q = (c − a)/(b − a). |q| = AC/AB, et arg q est l\'angle orienté de AB⃗ vers AC⃗.<br>q réel : A, B, C alignés. q imaginaire pur : angle droit en A. q = e^(iπ/3) : triangle équilatéral.',
      lines: [
        { html: 'a = 1 + i, b = 5 + 3i, c = 3 + 7i : c − a = 2 + 6i, b − a = 4 + 2i', note: 'Différences', noEq: true },
        { html: 'q = (2 + 6i)/(4 + 2i) = (2 + 6i)(4 − 2i)/20 = (20 + 20i)/20 = 1 + i', note: 'Quotient', noEq: true },
        { html: '|q| = √2 : AC/AB = √2', note: 'Rapport', noEq: true },
        { html: 'arg q = π/4 : angle (AB⃗, AC⃗) = π/4', note: 'Angle', noEq: true },
      ],
    },
  }),
  S('g8-transform', {
    prereqs: ['g8-algebraic', 'g8-polar'], icon: 'az + b', exam: ['mcq', 'tf', 'open'],
    title: 'Translations, rotations, homothéties, similitudes',
    desc: 'z ↦ az + b : centre ω = aω + b, rapport |a|, angle arg a.',
    prereqWhy: { 'g8-algebraic': 'résoudre l\'équation du point fixe', 'g8-polar': 'module et argument de a' },
    intro: {
      rule: 'z ↦ z + b : translation. z ↦ az + b avec a ≠ 1 : similitude de centre ω (ω = aω + b), de rapport |a| et d\'angle arg a ; c\'est une rotation si |a| = 1, une homothétie si a est réel.<br>Rotation de centre ω et d\'angle θ : z′ − ω = e^(iθ)(z − ω).',
      lines: [
        { html: 'z ↦ (1 + i)z + 2 − i : ω = (1 + i)ω + 2 − i ⇔ −iω = 2 − i', note: 'Point fixe', noEq: true },
        { html: 'ω = (2 − i)/(−i) = (2 − i)·i = 1 + 2i', note: 'Résoudre', noEq: true },
        { html: '|1 + i| = √2, arg(1 + i) = π/4', note: 'Rapport, angle', noEq: true },
        { html: 'Similitude de centre 1 + 2i, de rapport √2 et d\'angle π/4', note: 'Nommer', noEq: true },
      ],
    },
  }),
  S('g8-inversion', {
    prereqs: ['g8-locus'], icon: '1/z̄', exam: ['mcq', 'open'],
    title: 'Inversion z ↦ 1/z̄ et z ↦ 1/z',
    desc: 'Image d\'une droite ou d\'un cercle : on remplace z par 1/w̄.',
    prereqWhy: { 'g8-locus': 'image d\'une droite ou d\'un cercle : traduire en x et y' },
    intro: {
      rule: 'z ↦ 1/z̄ est l\'inversion de centre 0 et de rayon 1 : même argument, module inversé. z ↦ 1/z la compose avec la symétrie par rapport à l\'axe réel.<br>Image d\'un lieu : on pose w = 1/z̄, donc z = 1/w̄, et on remplace dans l\'équation du lieu. Une droite qui ne passe pas par 0 devient un cercle qui passe par 0 (privé de 0).',
      lines: [
        { html: 'Re z = 1 et w = 1/z̄ : z = 1/w̄ = w/|w|²', note: 'Exprimer z en w', noEq: true },
        { html: 'Re z = x/(x² + y²) = 1, avec w = x + iy', note: 'Remplacer', noEq: true },
        { html: 'x² + y² − x = 0, soit (x − 1/2)² + y² = 1/4', note: 'Multiplier par |w|²', noEq: true },
        { html: 'Cercle de centre 1/2 et de rayon 1/2, privé de 0', note: 'Reconnaître, point exclu', noEq: true },
      ],
    },
  }),
];
