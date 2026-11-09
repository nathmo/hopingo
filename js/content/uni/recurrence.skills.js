// Module G5, suites, sommes, récurrence (unit `recurrence`). Catalogue:
// docs/universite/G-gymnase-1.md, section G5. Built at step U1, part b.
// Year 12: needsSolo false; year 12.5 (niveau CMS): needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:C-reduire = lit-reduce; indirect credit @alg:D-factoriser-completement
// = fac-complete.

export const UNIT = { id: 'recurrence', title: 'Suites, sommes, récurrence', color: '#5f3dc4', ready: true };

const S = (id, year, rest) => ({ id, unit: 'recurrence', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g5-sigma', 12, {
    prereqs: ['lit-reduce'], icon: 'Σ', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Notation Σ',
    desc: 'Lire et écrire une somme avec Σ, linéarité, formules du cours.',
    intro: {
      rule: 'Σ<sub>k=p</sub><sup>n</sup> u<sub>k</sub> = u<sub>p</sub> + … + u<sub>n</sub> : il y a <b>n − p + 1</b> termes.<br>Linéarité : Σ(a·u<sub>k</sub> + v<sub>k</sub>) = a·Σu<sub>k</sub> + Σv<sub>k</sub>.<br>Formules : Σ<sub>k=1</sub><sup>n</sup> k = n(n + 1)/2 ; Σ<sub>k=1</sub><sup>n</sup> k² = n(n + 1)(2n + 1)/6. Au clavier : sum(terme, k, début, fin).',
      lines: [
        { cas: 'sum(3k+2,k,1,20)', note: 'Départ', noEq: true },
        { cas: '3sum(k,k,1,20)+sum(2,k,1,20)', note: 'Linéarité' },
        { cas: '3×(20×21/2)+2×20', note: 'Formules ; 20 termes' },
        { cas: '670', note: 'Calculer' },
      ],
    },
  }),
  S('g5-reindex', 12, {
    prereqs: ['g5-sigma', 'g0-pfd-simple'], icon: 'k→j', tags: [], examWeight: 1, exam: ['mcq', 'open'],
    title: 'Changement d\'indice, sommes télescopiques',
    desc: 'Décaler l\'indice et les bornes ; il reste le premier et le dernier.',
    prereqWhy: { 'g5-sigma': 'lire les bornes et le terme d\'une somme Σ' },
    intro: {
      rule: 'Poser j = k − 1 change le terme <b>et</b> les bornes : Σ<sub>k=2</sub><sup>n+1</sup>(k − 1)² = Σ<sub>j=1</sub><sup>n</sup> j².<br>Somme télescopique : Σ<sub>k=1</sub><sup>n</sup>(a<sub>k</sub> − a<sub>k+1</sub>) = a<sub>1</sub> − a<sub>n+1</sub> : il reste le premier et le dernier.',
      lines: [
        { cas: 'sum(1/(k(k+1)),k,1,n)', note: 'Départ', noEq: true },
        { cas: 'sum(1/k-1/(k+1),k,1,n)', note: 'Décomposer' },
        { html: '(1 − 1/2) + (1/2 − 1/3) + … + (1/n − 1/(n + 1))', note: 'Écrire les termes' },
        { cas: '1-1/(n+1)', note: 'Télescoper' },
        { cas: 'n/(n+1)', note: 'Réduire' },
      ],
    },
  }),
  S('g5-arith', 12, {
    prereqs: ['g5-sigma'], icon: '+r', tags: [], examWeight: 1, exam: ['mcq'],
    title: 'Suites arithmétiques',
    desc: 'uₙ = u₁ + (n − 1)r ; somme = nombre de termes × moyenne.',
    prereqWhy: { 'g5-sigma': 'somme de termes consécutifs écrite avec Σ' },
    intro: {
      rule: 'u<sub>n+1</sub> = u<sub>n</sub> + r. Terme général : u<sub>n</sub> = u<sub>1</sub> + (n − 1)r (ou u<sub>0</sub> + nr).<br>Somme de termes consécutifs : (nombre de termes) × (premier + dernier)/2.',
      lines: [
        { html: 'u₁ = 3, r = 4', note: 'Données', noEq: true },
        { html: 'u₂₀ = 3 + 19·4 = 79', note: 'On ajoute 19 fois r', noEq: true },
        { html: 'S = 20·(3 + 79)/2 = 820', note: '20 termes × moyenne', noEq: true },
      ],
    },
  }),
  S('g5-geom', 12, {
    prereqs: ['pow-rules'], icon: '×q', tags: ['MAN'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Suites géométriques',
    desc: 'uₙ = u₀qⁿ ; somme u₀(qᴺ − 1)/(q − 1) ; somme infinie si |q| < 1.',
    intro: {
      rule: 'u<sub>n+1</sub> = q·u<sub>n</sub>. Terme général : u<sub>n</sub> = u<sub>0</sub>q<sup>n</sup>.<br>Somme de N termes à partir de u<sub>0</sub> : u<sub>0</sub>(q<sup>N</sup> − 1)/(q − 1) si q ≠ 1. Si |q| < 1, la somme infinie vaut u<sub>0</sub>/(1 − q).',
      lines: [
        { html: '5 + 10 + … + 5·2⁵ : de 2⁰ à 2⁵, 6 termes', note: 'Compter', noEq: true },
        { cas: '5(2^6-1)/(2-1)', note: 'Formule avec N = 6', noEq: true },
        { cas: '315', note: 'Calculer' },
      ],
    },
  }),
  S('g5-induction-frame', 12, {
    prereqs: ['g9-proof-contra'], icon: 'n→n+1', tags: [], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Charpente d\'une récurrence',
    desc: 'Initialisation, hérédité, conclusion. On ne suppose jamais P(n + 1).',
    prereqWhy: { 'g9-proof-contra': 'l\'hérédité est une preuve directe P(n) ⇒ P(n + 1)' },
    intro: {
      rule: 'Pour montrer P(n) pour tout n ≥ n₀ :<br>(1) <b>initialisation</b> : P(n₀) est vraie ;<br>(2) <b>hérédité</b> : on suppose P(n) pour un n ≥ n₀, et on montre P(n + 1) ;<br>(3) <b>conclusion</b>. On ne suppose jamais P(n + 1) : c\'est ce qu\'on veut montrer.',
      lines: [
        { html: 'n = 1 : 1 = 1² ✓', note: 'Initialisation', noEq: true },
        { html: 'Supposons Σ<sub>k=1</sub><sup>n</sup>(2k − 1) = n²', note: 'Hypothèse', noEq: true },
        { html: 'Σ<sub>k=1</sub><sup>n+1</sup>(2k − 1) = n² + (2n + 1) = (n + 1)²', note: 'Hérédité', noEq: true },
        { html: 'Donc P(n) est vraie pour tout n ≥ 1.', note: 'Conclusion', noEq: true },
      ],
    },
  }),
  S('g5-induction-sum', 12, {
    prereqs: ['g5-induction-frame', 'g5-sigma'], icon: 'Σⁿ⁺¹', tags: ['CMS'], examWeight: 2, exam: ['open'],
    title: 'Récurrence : formules de sommes',
    desc: 'Séparer le dernier terme, utiliser l\'hypothèse, factoriser.',
    prereqWhy: { 'g5-induction-frame': 'même charpente initialisation, hérédité, conclusion' },
    intro: {
      rule: 'Dans l\'hérédité, on sépare le dernier terme : Σ<sub>k=1</sub><sup>n+1</sup> u<sub>k</sub> = Σ<sub>k=1</sub><sup>n</sup> u<sub>k</sub> + u<sub>n+1</sub>.<br>On remplace la somme jusqu\'à n par la formule supposée, puis on factorise pour faire apparaître la formule au rang n + 1.',
      lines: [
        { cas: 'sum(k(k+1),k,1,n+1)', note: 'Départ', noEq: true },
        { cas: 'sum(k(k+1),k,1,n)+(n+1)(n+2)', note: 'Séparer le dernier terme' },
        { cas: 'n(n+1)(n+2)/3+(n+1)(n+2)', note: 'Hypothèse de récurrence' },
        { cas: '(n+1)(n+2)(n+3)/3', note: 'Facteur commun (n + 1)(n + 2)' },
      ],
    },
  }),
  S('g5-induction-more', 12.5, {
    prereqs: ['g1-compose', 'g5-induction-frame', 'g2-real-powers'], icon: 'P(n)', tags: ['MAN'], examWeight: 2, exam: ['open', 'tf'],
    title: 'Récurrence : inégalités, divisibilité, suites et itérées',
    desc: 'Majorer, écrire le rang n + 1 avec le rang n, composer.',
    prereqWhy: {
      'g5-induction-frame': 'même charpente initialisation, hérédité, conclusion',
      'g1-compose': 'fₙ₊₁ = f ∘ fₙ : composer avec la formule supposée',
      'g2-real-powers': '(x^(2ⁿ))² = x^(2ⁿ⁺¹) : puissance d\'une puissance',
    },
    intro: {
      rule: 'Même charpente, autres hérédités.<br><b>Inégalité</b> : partir de P(n) et majorer ou minorer (2ⁿ⁺¹ = 2·2ⁿ ≥ 2(n + 1) ≥ n + 2).<br><b>Divisibilité</b> : écrire le terme n + 1 avec le terme n (8ⁿ⁺¹ − 1 = 8(8ⁿ − 1) + 7).<br><b>Itérées</b> : f<sub>n+1</sub> = f ∘ f<sub>n</sub>.',
      lines: [
        { html: 'f(x) = x², f₁ = f, fₙ₊₁ = f ∘ fₙ', note: 'Énoncé', noEq: true },
        { html: 'f₁(x) = x² = x^(2¹) ✓', note: 'Initialisation', noEq: true },
        { html: 'fₙ₊₁(x) = f(fₙ(x)) = (x^(2ⁿ))² = x^(2ⁿ⁺¹) ✓', note: 'Hérédité', noEq: true },
      ],
    },
  }),
];
