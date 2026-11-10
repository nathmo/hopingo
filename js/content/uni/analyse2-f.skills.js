// Module A2, part f (unit `analyse2`, step U6): multiple integrals by
// Fubini — rectangles and symmetries, describing a domain, changing the
// order, triple integrals, changing variables. Catalogue:
// docs/universite/A2-analyse-2.md. Generators: analyse2-f.js.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a2-fubini-rect', {
    prereqs: ['a1-int-direct'], icon: '∬▭', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Intégrale double sur un rectangle ; symétries',
    desc: 'Produit de deux intégrales si f = g(x)·h(y) ; le bon ordre ; impaire sur un domaine symétrique : 0.',
    intro: {
      rule: 'Sur un rectangle, Fubini permet d\'intégrer dans l\'ordre qu\'on veut. Si f(x, y) = g(x)·h(y), l\'intégrale est le produit des deux intégrales. Si le domaine est symétrique par rapport à y = 0 et f impaire en y (f(x, −y) = −f(x, y)), l\'intégrale est nulle. <b>Les deux conditions sont nécessaires.</b>',
      lines: [
        { cas: 'int(int(y cos(x) e^(y^2),y,0,1),x,0,π/2)', note: 'f = cos x · (y e^(y²)) sur [0 ; π/2] × [0 ; 1]', noEq: true },
        { cas: 'int(cos(x),x,0,π/2)×int(y e^(y^2),y,0,1)', note: 'Rectangle et produit : deux intégrales simples' },
        { cas: 'bracket(sin(x),x,0,π/2)×bracket(e^(y^2)/2,y,0,1)', note: 'Primitives' },
        { cas: 'e/2-1/2', note: '1 · (e − 1)/2' },
      ],
    },
  }),
  S('a2-domain-describe', {
    prereqs: ['a2-fubini-rect', 'g10-circle-eq'], icon: 'I | II', examWeight: 2, exam: ['mcq'],
    title: 'Décrire un domaine : types I et II, depuis les polaires',
    desc: 'x entre deux nombres, y entre deux courbes (type I), ou l\'inverse (type II).',
    prereqWhy: { 'a2-fubini-rect': 'intégrale itérée', 'g10-circle-eq': 'disques et cercles dans les bornes' },
    intro: {
      rule: 'Type I : a ≤ x ≤ b, φ₁(x) ≤ y ≤ φ₂(x) (des bornes en y qui dépendent de x). Type II : c ≤ y ≤ d, ψ₁(y) ≤ x ≤ ψ₂(y). Les bornes extérieures sont <b>des nombres</b>. On dessine d\'abord, on lit les courbes qui bordent, on trouve leurs intersections.<br>Tu écris les bornes « 0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x », la variable extérieure d\'abord.',
      lines: [
        { html: 'D entre y = x² et y = 2x', note: 'Dessiner', noEq: true },
        { html: 'x² = 2x : x = 0 ou x = 2', note: 'Intersections', noEq: true },
        { cas: '0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x', note: 'Type I : entre 0 et 2, 2x ≥ x²', noEq: true },
        { cas: '0 ≤ y ≤ 4 ; y/2 ≤ x ≤ √y', note: 'Type II : x de la droite à la parabole', noEq: true },
      ],
    },
  }),
  S('a2-fubini-swap', {
    prereqs: ['a2-domain-describe'], icon: 'dx⇄dy', examWeight: 3, exam: ['mcq'],
    title: 'Changer l\'ordre d\'intégration',
    desc: 'Quand l\'intégrale intérieure n\'a pas de primitive : dessiner D et le décrire dans l\'autre ordre.',
    intro: {
      rule: 'Quand l\'intégrale intérieure n\'a pas de primitive élémentaire (e^(y³), sin(y²), 1/(1 + y²⁰)), on change l\'ordre. Méthode : écrire D par ses inégalités, le dessiner, le décrire dans l\'autre type. La nouvelle variable extérieure a des bornes <b>numériques</b>. Renommer x et y ne suffit pas.',
      lines: [
        { cas: 'int(int(e^(y^3),y,√x,1),x,0,1)', note: 'e^(y³) n\'a pas de primitive', noEq: true },
        { cas: '0 ≤ x ≤ 1 ; √x ≤ y ≤ 1', note: 'D, lu sur les bornes', noEq: true },
        { cas: '0 ≤ y ≤ 1 ; 0 ≤ x ≤ y^2', note: 'Le même D, y à l\'extérieur', noEq: true },
        { cas: 'int(int(e^(y^3),x,0,y^2),y,0,1)', note: 'Nouvel ordre', noEq: true },
        { cas: 'int(y^2 e^(y^3),y,0,1)', note: 'Intégrale en x' },
        { cas: 'e/3-1/3', note: '[e^(y³)/3] de 0 à 1' },
      ],
    },
  }),
  S('a2-triple-int', {
    prereqs: ['a2-domain-describe'], icon: '∭', examWeight: 1, exam: ['mcq'],
    title: 'Intégrales triples par Fubini',
    desc: 'z entre deux surfaces, puis la projection décrite comme en 2D.',
    prereqWhy: { 'a2-domain-describe': 'la projection se décrit comme en 2D' },
    intro: {
      rule: 'On décrit D par des « tranches » : z entre deux surfaces qui dépendent de (x, y), puis (x, y) dans la projection de D, décrite comme en 2D. On intègre ensuite de l\'intérieur vers l\'extérieur.',
      lines: [
        { html: 'T = {x, y, z ≥ 0, x + y + z ≤ 1}, ∭<sub>T</sub> z dV', note: 'Le tétraèdre', noEq: true },
        { cas: '0 ≤ x ≤ 1 ; 0 ≤ y ≤ 1-x ; 0 ≤ z ≤ 1-x-y', note: 'z du sol au plan ; projection : un triangle', noEq: true },
        { cas: 'int(int((1-x-y)^2/2,y,0,1-x),x,0,1)', note: 'Intégrale en z', noEq: true },
        { cas: 'int((1-x)^3/6,x,0,1)', note: 'Intégrale en y' },
        { cas: '1/24', note: 'Intégrale en x' },
      ],
    },
  }),
  S('a2-change-var', {
    prereqs: ['a2-domain-describe', 'a2-partials', 'l-det-cofactor'], icon: '∂(u,v)', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Changement de variables et jacobien',
    desc: 'D̃ en (u, v), det ∂(u, v)/∂(x, y), puis dx dy = du dv/|det ∂(u, v)/∂(x, y)|.',
    prereqWhy: { 'a2-domain-describe': 'décrire le nouveau domaine', 'l-det-cofactor': 'det J_G' },
    intro: {
      rule: 'Si G : D̃ → D est une bijection C¹ (avec det J_G ≠ 0), ∬<sub>D</sub> f(x, y) dx dy = ∬<sub>D̃</sub> f(G(u, v))·|det J_G(u, v)| du dv. Valeur absolue, et jacobien de G (nouvelles → anciennes variables). Si on connaît plutôt u(x, y), v(x, y) : |det J_G| = 1/|det J_{G⁻¹}|. D̃ s\'obtient en écrivant les inégalités de D avec u et v.',
      lines: [
        { html: 'D = {1 ≤ xy ≤ 4, x ≤ y ≤ 3x, x > 0} ; u = xy, v = y/x', note: 'Les inégalités parlent de xy et de y/x', noEq: true },
        { cas: '1 ≤ u ≤ 4 ; 1 ≤ v ≤ 3', note: 'D̃ : un rectangle', noEq: true },
        { html: 'det ∂(u, v)/∂(x, y) = y·(1/x) − x·(−y/x²) = 2y/x = 2v', note: 'Jacobien de G⁻¹', noEq: true },
        { html: 'dx dy = du dv/(2v)', note: 'Son inverse', noEq: true },
        { cas: 'int(int(u/(2v),v,1,3),u,1,4)', note: '∬ xy dx dy sur D̃', noEq: true },
        { cas: '15ln(3)/4', note: '(15/2)·(ln 3)/2' },
      ],
    },
  }),
];
