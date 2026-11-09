// Module G9, logique et langage mathématique (unit `logique`). Catalogue:
// docs/universite/G-gymnase-1.md, section G9. Built at step U1.
// Year 12 (maturité): needsSolo keeps its default, false (catalogue,
// « Années et validation »).
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:N-ensembles = nb-sets; indirect credit @alg:E-inconnue-deux-cotes =
// eq-both-sides, @alg:C-identites = lit-identities.

export const UNIT = { id: 'logique', title: 'Logique et langage', color: '#4c6ef5', ready: true };

const S = (id, rest) => ({ id, unit: 'logique', year: 12, optional: false, needsSolo: false, ...rest });

export const SKILLS = [
  S('g9-sets', {
    prereqs: ['nb-sets'], icon: '{ }', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Ensembles : écrire et opérer',
    desc: 'En extension, en compréhension ; ∩, ∪, ∖.',
    prereqWhy: { 'nb-sets': 'les ensembles de nombres ℕ, ℤ, ℚ, ℝ apparaissent dans chaque énoncé' },
    intro: {
      rule: 'Un ensemble se donne <b>en extension</b> {0 ; 2 ; 4} ou <b>en compréhension</b> {n ∈ ℕ | n &lt; 5}.<br>A ∩ B : dans les deux. A ∪ B : dans l\'un ou l\'autre. A ∖ B : dans A mais pas dans B.',
      lines: [
        { cas: '{n∈ℕ|2n+1<12}', note: 'Départ' },
        { cas: '{n∈ℕ|n<11/2}', note: 'Résoudre la condition' },
        { cas: '{0;1;2;3;4;5}', note: 'Garder les entiers naturels' },
      ],
    },
  }),
  S('g9-intervals', {
    prereqs: ['g9-sets'], icon: ']a;b]', tags: ['CMS', 'MAN'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Intervalles et parties de ℝ',
    desc: 'Crochets, ∩ pour « et », ∪ pour « ou ».',
    prereqWhy: { 'g9-sets': 'intersection et réunion d\'intervalles' },
    intro: {
      rule: 'Un crochet tourné vers le nombre l\'inclut : [2 ; 5[ contient 2, pas 5. ∞ est toujours exclu.<br>« et » se traduit par ∩, « ou » par ∪.',
      lines: [
        { cas: '|x-1|<3 ∧ x≥0', note: 'Départ' },
        { cas: '-3<x-1<3 ∧ x≥0', note: 'Ôter la valeur absolue' },
        { cas: ']-2;4[∩[0;+∞[', note: 'Traduire en intervalles' },
        { cas: '[0;4[', note: 'Intersecter' },
      ],
    },
  }),
  S('g9-connectives', {
    prereqs: [], icon: '∧∨', tags: ['CMS'], examWeight: 1, exam: ['tf', 'mcq'],
    title: 'Connecteurs et tables de vérité',
    desc: 'P ⇒ Q ≡ ¬P ∨ Q ; lois de De Morgan.',
    intro: {
      rule: 'P ⇒ Q est faux seulement quand P est vrai et Q faux. Donc P ⇒ Q ≡ ¬P ∨ Q.<br><b>De Morgan</b> : ¬(P ∧ Q) ≡ ¬P ∨ ¬Q et ¬(P ∨ Q) ≡ ¬P ∧ ¬Q.',
      lines: [
        { cas: '¬(P∧¬Q)', note: 'Départ' },
        { cas: '¬P∨¬¬Q', note: 'De Morgan' },
        { cas: '¬P∨Q', note: 'Double négation' },
        { cas: 'P⇒Q', note: 'Reconnaître l\'implication' },
      ],
    },
  }),
  S('g9-implication', {
    prereqs: ['g9-connectives'], icon: '⇒', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['open', 'mcq', 'tf'],
    title: 'Implication, réciproque, contraposée',
    desc: 'Contraposée ¬Q ⇒ ¬P ; négation P ∧ ¬Q.',
    prereqWhy: { 'g9-connectives': 'la négation P ∧ ¬Q et l\'équivalence se lisent sur la table de vérité' },
    intro: {
      rule: 'Pour P ⇒ Q : la <b>réciproque</b> est Q ⇒ P ; la <b>contraposée</b> est ¬Q ⇒ ¬P et lui est équivalente ; la <b>négation</b> est P ∧ ¬Q.<br>« Si n² est pair, n est pair » a pour contraposée « si n est impair, n² est impair ».',
    },
  }),
  S('g9-quant-read', {
    prereqs: ['g9-sets'], icon: '∀∃', tags: ['CMS'], examWeight: 2, exam: ['tf', 'mcq'],
    title: 'Lire un énoncé quantifié',
    desc: '∀x ∃y ou ∃y ∀x : l\'ordre compte.',
    prereqWhy: { 'g9-sets': 'chaque quantificateur porte sur un ensemble (x ∈ ℝ, n ∈ ℕ)' },
    intro: {
      rule: '∀x ∃y : y peut dépendre de x. ∃y ∀x : un même y pour tous les x.<br>« ∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0 » est vrai (y = −x) ; « ∃y ∈ ℝ ∀x ∈ ℝ, x + y = 0 » est faux.',
    },
  }),
  S('g9-quant-write', {
    prereqs: ['g9-quant-read'], icon: '∃M', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'open'],
    title: 'Écrire une définition avec des quantificateurs',
    desc: 'Majorée, bornée, croissante, convergente…',
    prereqWhy: { 'g9-quant-read': 'relire la définition écrite : portée et ordre de ∀ et ∃' },
    intro: {
      rule: '« f est majorée sur I » : ∃M ∈ ℝ ∀x ∈ I, f(x) ≤ M. L\'ordre compte : M est choisi avant x.<br>« f est croissante sur I » : ∀x, y ∈ I, x &lt; y ⇒ f(x) ≤ f(y).',
    },
  }),
  S('g9-negate', {
    prereqs: ['g9-quant-read', 'g9-implication'], icon: '¬∀', tags: ['MAN', 'CMS'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Nier un énoncé quantifié',
    desc: '∀ devient ∃, ∃ devient ∀, la propriété est niée.',
    prereqWhy: {
      'g9-quant-read': 'lire la portée de chaque quantificateur avant de nier',
      'g9-implication': "la négation d'une implication, A ∧ ¬B, revient dans presque chaque énoncé",
    },
    intro: {
      rule: 'On fait entrer ¬ de gauche à droite. Chaque ∀ devient ∃, chaque ∃ devient ∀, la restriction (ε &gt; 0) ne change pas, et la propriété à la fin est niée.<br>¬(∀ε &gt; 0 ∃N ∈ ℕ ∀n ≥ N, |uₙ − L| &lt; ε) ≡ ∃ε &gt; 0 ∀N ∈ ℕ ∃n ≥ N, |uₙ − L| ≥ ε.',
    },
  }),
  S('g9-counterexample', {
    prereqs: ['g9-negate'], icon: '✗', tags: ['CMS'], examWeight: 2, exam: ['tf', 'mcq'],
    title: 'Réfuter par un contre-exemple',
    desc: 'Un seul x suffit pour montrer qu\'un « pour tout » est faux.',
    prereqWhy: { 'g9-negate': 'un contre-exemple réalise la négation ∃x, ¬P(x)' },
    intro: {
      rule: 'Pour montrer qu\'un énoncé « ∀x, P(x) » est faux, <b>un</b> x qui ne vérifie pas P suffit. Pour le montrer vrai, des exemples ne suffisent jamais.<br>« ∀x ∈ ℝ, x² ≥ x » est faux : x = 1/2 donne 1/4 &lt; 1/2.',
    },
  }),
  S('g9-proof-contra', {
    prereqs: ['g9-implication'], icon: '¬Q⇒¬P', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['open'],
    title: 'Preuve directe et par contraposée',
    desc: 'Supposer ¬Q pour arriver à ¬P.',
    prereqWhy: { 'g9-implication': 'la contraposée ¬Q ⇒ ¬P est équivalente à P ⇒ Q' },
    intro: {
      rule: 'Preuve directe : on suppose P, on arrive à Q. Par contraposée : on suppose ¬Q, on arrive à ¬P. On choisit la contraposée quand ¬Q donne une écriture utile (n impair : n = 2k + 1).<br>« n² pair ⇒ n pair » se prouve par « n impair ⇒ n² impair ».',
    },
  }),
  S('g9-proof-absurd', {
    prereqs: ['g9-negate'], icon: '⊥', tags: ['CMS'], examWeight: 1, exam: ['open'],
    title: 'Preuve par l\'absurde',
    desc: 'Supposer la négation, arriver à une contradiction.',
    prereqWhy: { 'g9-negate': 'on suppose la négation de l\'énoncé' },
    intro: {
      rule: 'On suppose la <b>négation</b> de ce qu\'on veut montrer, et on arrive à une contradiction.<br>√3 irrationnel : on suppose √3 = p/q avec pgcd(p, q) = 1 ; alors p² = 3q², donc 3 | p, puis 3 | q : contradiction.',
    },
  }),
];
