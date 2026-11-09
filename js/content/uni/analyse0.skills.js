// Module G6, analyse de base (unit `analyse0`). Catalogue:
// docs/universite/G-gymnase-2.md, section G6. Only the pilot skill of step
// U0 is built so far; the other G6 skills come with step U2.

export const UNIT = { id: 'analyse0', title: 'Analyse de base', color: '#1098ad', ready: true };

export const SKILLS = [
  {
    id: 'g6-deriv-rules', unit: 'analyse0', year: 12, prereqs: ['g6-deriv-usual', 'g1-compose'], icon: '(uv)′',
    title: 'Règles de dérivation : produit, quotient, chaîne',
    desc: '(uv)′, (u/v)′ et (f∘g)′, une règle à la fois.',
    tags: [], optional: false, examWeight: 2,
    // Level 5 is « sans aide » in the catalogue: mastery waits for it.
    needsSolo: true,
    exam: ['mcq', 'tf', 'coef', 'open'],
    prereqWhy: {
      'g6-deriv-usual': 'la table des dérivées usuelles donne u′, v′ et f′',
      'g1-compose': 'repérer les couches f∘g pour la règle de chaîne',
    },
    intro: {
      rule: '<b>Produit</b> : (uv)′ = u′v + uv′.<br><b>Quotient</b> : (u/v)′ = (u′v − uv′)/v².<br><b>Chaîne</b> : (f∘g)′ = f′(g)·g′.<br>On dérive de l\'extérieur vers l\'intérieur, et chaque couche multiplie par la dérivée de ce qu\'elle contient. Tu écris d(…) ou (…)′ pour une dérivée pas encore calculée.',
      lines: [
        { cas: 'd(x^2×sin(3x))', note: 'Départ' },
        { cas: 'd(x^2)×sin(3x)+x^2×d(sin(3x))', note: 'Règle du produit' },
        { cas: '2x×sin(3x)+x^2×cos(3x)×d(3x)', note: 'Table, puis règle de chaîne' },
        { cas: '2x×sin(3x)+3x^2×cos(3x)', note: 'Simplifier' },
      ],
    },
  },
];
