// Module A1, part l (unit `analyse1`, step U4): complex numbers at BA1,
// definitions and short proofs. Catalogue: docs/universite/A1-analyse-1.md,
// « Complexes » (a1-cplx-exam, a1-cplx-zn-conj) and the end of the list
// (a1-defs, a1-proofs). Generators: analyse1-l.js (complex numbers in
// analyse1-l-cplx.js, definitions in analyse1-l-defs.js, proofs in
// analyse1-l-proofs.js).

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-cplx-exam', {
    prereqs: ['g8-algebraic', 'g8-polar', 'g8-moivre'], icon: 'zⁿ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Simplifier un nombre complexe et l\'élever à une puissance',
    desc: 'Réduire iᵏ modulo 4, conjugué, forme polaire avec r > 0, Moivre.',
    prereqWhy: {
      'g8-algebraic': 'réduire iᵏ et multiplier par le conjugué',
      'g8-polar': 'écrire z = r·e^(iφ) avec r > 0',
      'g8-moivre': 'élever r·e^(iφ) à la puissance m',
    },
    intro: {
      rule: 'On réduit les exposants de i modulo 4 (i⁴ = 1), on multiplie haut et bas par le conjugué du dénominateur, puis on passe en forme polaire r·e^(iφ) <b>avec r > 0</b> pour la puissance : (r·e^(iφ))ᵐ = rᵐ·e^(imφ).<br>Pour finir, on ramène l\'argument dans ]−π ; π] et on revient à a + bi.',
      lines: [
        { html: 'z = (3i⁷ + i¹³)/(1 + i) = (−3i + i)/(1 + i)', note: '7 ≡ 3 et 13 ≡ 1 (mod 4)', noEq: true },
        { html: '−2i(1 − i)/2 = −1 − i', note: 'Conjugué du dénominateur' },
        { html: '√2·e^(−3iπ/4)', note: 'Forme polaire, r = √2 > 0' },
        { html: 'z⁶ = 8·e^(−9iπ/2) = 8·e^(−iπ/2)', note: 'Moivre, puis −9π/2 + 4π', noEq: true },
        { html: 'z⁶ = −8i', note: 'Forme algébrique', noEq: true },
      ],
    },
  }),
  S('a1-cplx-zn-conj', {
    prereqs: ['g8-polar'], icon: 'zⁿ = z̄', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Équations zⁿ = z̄, zⁿ = 1/z̄, zⁿ = |z|, sans oublier r = 0',
    desc: 'Poser z = r·e^(iφ), traiter r = 0 avant de diviser, compter les solutions.',
    prereqWhy: { 'g8-polar': 'poser z = r·e^(iφ) et identifier modules et arguments' },
    intro: {
      rule: 'On pose z = r·e^(iφ) avec r ≥ 0 : z̄ = r·e^(−iφ) et |z| = r. Avant de diviser par r, on regarde <b>r = 0</b> : z = 0 est souvent solution. Ce n\'est pas un polynôme (à cause de z̄ ou de |z|) : le nombre de solutions n\'est pas forcément n.',
      lines: [
        { html: 'z³ = z̄ : r³·e^(3iφ) = r·e^(−iφ)', note: 'Poser z = r·e^(iφ)', noEq: true },
        { html: 'Cas r = 0 : z = 0 est solution', note: 'Avant de diviser par r', noEq: true },
        { html: 'Cas r > 0 : r² = 1 et 4φ = 2kπ', note: 'Modules, puis arguments', noEq: true },
        { html: 'r = 1, φ = kπ/2 (k = 0, 1, 2, 3)', note: 'Quatre arguments', noEq: true },
        { html: 'S = {0 ; 1 ; i ; −1 ; −i} : 5 solutions', note: 'Sans oublier 0', noEq: true },
      ],
    },
  }),
  S('a1-defs', {
    prereqs: ['a1-seq-eps-n-def', 'a1-fn-epsdelta-def', 'a1-c1-def'], icon: 'Déf.', tags: ['GM'], examWeight: 1, exam: ['open', 'tf'],
    title: 'Définitions à écrire : Sup, continuité, dérivabilité, série convergente, suite de Cauchy',
    desc: 'Les conditions du cours, dans le bon ordre, sans condition en trop.',
    prereqWhy: {
      'a1-seq-eps-n-def': 'la définition ε-N, reprise mot à mot (Cauchy)',
      'a1-fn-epsdelta-def': 'la définition ε-δ, reprise mot à mot (continuité)',
      'a1-c1-def': 'la définition de C¹(I), reprise mot à mot',
    },
    intro: {
      rule: 'Une définition d\'examen se juge sur ses conditions : les quantificateurs dans le bon ordre, toutes les hypothèses (domaine, intervalle ouvert), aucune condition en trop. On l\'écrit avec les mots du cours.',
      lines: [
        { html: '(aₙ) est de Cauchy :', note: 'Définition à écrire', noEq: true },
        { html: '∀ε > 0', note: 'Quantifier ε', noEq: true },
        { html: '∃N ∈ ℕ', note: 'Un rang qui dépend de ε', noEq: true },
        { html: '∀m, n ≥ N', note: 'Deux indices quelconques', noEq: true },
        { html: '|aₘ − aₙ| ≤ ε', note: 'L\'écart entre deux termes, pas entre deux termes voisins', noEq: true },
      ],
    },
  }),
  S('a1-proofs', {
    prereqs: ['a1-ser-compare', 'a1-mvt', 'a1-fn-ivt', 'a1-seq-monotone', 'g9-proof-contra'], icon: 'Preuve', tags: ['GM'], examWeight: 2, exam: ['open'],
    title: 'Preuves courtes d\'examen : énoncer le théorème, vérifier ses hypothèses',
    desc: 'Traduire l\'hypothèse, citer le théorème, vérifier chaque hypothèse, conclure.',
    prereqWhy: {
      'a1-ser-compare': 'majorer par une série convergente (critère de comparaison)',
      'a1-mvt': 'le théorème des accroissements finis',
      'a1-fn-ivt': 'le théorème de la valeur intermédiaire',
      'a1-seq-monotone': 'une suite convergente est bornée ; suites et séries de référence',
      'g9-proof-contra': 'l\'ordre d\'une preuve : hypothèse, théorème, conclusion',
    },
    intro: {
      rule: 'À l\'examen, « si on utilise des résultats du cours, on les énoncera entièrement et on justifiera leur utilisation ». Une preuve courte : (1) l\'hypothèse traduite en une propriété utilisable ; (2) le théorème cité ; (3) chaque hypothèse du théorème vérifiée ; (4) la conclusion.',
      lines: [
        { html: '(bₙ) converge, donc elle est bornée : |bₙ| ≤ M', note: 'Traduire l\'hypothèse', noEq: true },
        { html: '|bₙ/n³| ≤ M/n³ pour tout n ≥ 1', note: 'Majorer', noEq: true },
        { html: 'Σ M/n³ converge (Riemann, p = 3 > 1)', note: 'Série de référence', noEq: true },
        { html: 'Comparaison : Σ |bₙ/n³| converge', note: 'Critère cité, hypothèses vérifiées', noEq: true },
        { html: 'Σ bₙ/n³ converge (absolument)', note: 'Conclure', noEq: true },
      ],
    },
  }),
];
