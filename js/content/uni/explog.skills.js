// Module G2, exponentielles, logarithmes, fonctions hyperboliques (unit
// `explog`). Catalogue: docs/universite/G-gymnase-1.md, section G2. Built
// at step U1, part b. Year 12: needsSolo false; year 12.5: needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:H-discriminant = quad-formula; indirect credit @alg:E-produit-nul =
// eq-product.

export const UNIT = { id: 'explog', title: 'Exponentielles et logarithmes', color: '#9c36b5', ready: true };

const S = (id, year, rest) => ({ id, unit: 'explog', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g2-real-powers', 12, {
    prereqs: ['pow-rules', 'root-rules'], icon: 'a^(p/q)', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Puissances à exposant réel',
    desc: 'a^(1/n) = ⁿ√a, et les règles des puissances avec des fractions.',
    prereqWhy: { 'root-rules': 'a^(1/n) = ⁿ√a : la racine donne la puissance fractionnaire' },
    intro: {
      rule: 'Pour a > 0 : aˣ·aʸ = aˣ⁺ʸ, (aˣ)ʸ = aˣʸ, a^(1/n) = ⁿ√a, a^(−x) = 1/aˣ.<br>Une somme dans l\'exposant donne un produit, une puissance de puissance multiplie les exposants.',
      lines: [
        { cas: '8^(2/3)', note: 'Départ', noEq: true },
        { cas: '(8^(1/3))^2', note: 'a^(p/q) = (a^(1/q))^p' },
        { cas: '2^2', note: '∛8 = 2' },
        { cas: '4', note: 'Calculer' },
      ],
    },
  }),
  S('g2-log-rules', 12, {
    prereqs: ['g2-real-powers'], icon: 'ln', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Logarithmes : définition et règles',
    desc: 'ln(uv) = ln u + ln v, ln(uᵖ) = p ln u, changement de base.',
    intro: {
      rule: 'log_a y = x ⇔ aˣ = y (a > 0, a ≠ 1, y > 0).<br>ln(uv) = ln u + ln v, ln(u/v) = ln u − ln v, ln(uᵖ) = p·ln u, log_a y = ln y / ln a.<br>Il n\'y a <b>pas</b> de règle pour ln(u + v).',
      lines: [
        { cas: 'ln(e^2×√x/x^3)', note: 'Départ', noEq: true },
        { cas: 'ln(e^2)+ln(√x)-ln(x^3)', note: 'Produit et quotient' },
        { cas: '2+(1/2)ln(x)-3ln(x)', note: 'Puissances' },
        { cas: '2-(5/2)ln(x)', note: 'Réduire' },
      ],
    },
  }),
  S('g2-exp-eq', 12, {
    prereqs: ['g2-log-rules', 'quad-formula'], icon: 'eˣ=a', tags: ['CMS'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Équations exponentielles',
    desc: 'Même base, ln des deux membres, ou t = eˣ.',
    prereqWhy: { 'g2-log-rules': 'prendre ln des deux membres' },
    intro: {
      rule: 'Si les deux membres sont des puissances de la même base, on compare les exposants. Sinon, on prend ln des deux côtés.<br>Si e²ˣ et eˣ apparaissent, on pose t = eˣ > 0 : une racine t ≤ 0 est rejetée.',
      lines: [
        { cas: 'e^(2x)-e^x-6=0', note: 'Départ', noEq: true },
        { cas: 't^2-t-6=0', note: 'Posons t = eˣ, t > 0', noEq: true },
        { cas: 't=3 ou t=-2', note: 'Résoudre ; t = −2 < 0 est rejeté', noEq: true },
        { cas: 'e^x=3', note: 'Revenir à x', noEq: true },
        { cas: 'x=ln(3)', note: 'S = {ln 3}', noEq: true },
      ],
    },
  }),
  S('g2-log-eq', 12, {
    prereqs: ['g2-log-rules', 'g1-domain'], icon: 'log=', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Équations logarithmiques',
    desc: 'Le domaine d\'abord, puis un seul logarithme de chaque côté.',
    prereqWhy: { 'g2-log-rules': 'regrouper en un seul logarithme' },
    intro: {
      rule: 'On écrit <b>d\'abord</b> le domaine : chaque argument > 0. Puis on regroupe en un seul logarithme, et log_a u = k ⇔ u = aᵏ. On garde seulement les solutions du domaine.',
      lines: [
        { cas: 'log_2(x-1)+log_2(x+1)=3', note: 'Départ', noEq: true },
        { cas: 'D=]1;+∞[', note: 'Domaine', noEq: true },
        { cas: 'log_2((x-1)(x+1))=3', note: 'Regrouper', noEq: true },
        { cas: 'x^2-1=8', note: 'Passer à l\'exponentielle', noEq: true },
        { cas: 'x=3 ou x=-3', note: 'Résoudre', noEq: true },
        { cas: '{3}', note: 'Trier selon D', noEq: true },
      ],
    },
  }),
  S('g2-ineq', 12.5, {
    prereqs: ['g2-log-eq', 'g2-exp-eq', 'g1-trinome-sign'], icon: 'log<', tags: ['MAN', 'CMS'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Inéquations exponentielles et logarithmiques, base < 1',
    desc: 'Base < 1 : la fonction décroît, l\'inégalité se retourne.',
    prereqWhy: {
      'g2-log-eq': 'domaine et regroupement des logarithmes, comme pour l\'équation',
      'g2-exp-eq': 'les mêmes outils que pour l\'équation : comparer les exposants, prendre ln',
    },
    intro: {
      rule: 'x ↦ aˣ et x ↦ log_a x sont croissantes si a > 1, <b>décroissantes</b> si 0 < a < 1. Avec une base < 1, on retourne l\'inégalité.<br>log_{1/a} u = −log_a u. Le domaine d\'abord, comme pour les équations.',
      lines: [
        { cas: 'log_(1/3)(2x-1)>log_(1/3)(x+2)', note: 'Départ', noEq: true },
        { cas: 'D=]1/2;+∞[', note: 'Domaine', noEq: true },
        { cas: '2x-1<x+2', note: 'Base 1/3 < 1 : on retourne', noEq: true },
        { cas: 'x<3', note: 'Résoudre', noEq: true },
        { cas: ']1/2;3[', note: 'Intersecter avec D', noEq: true },
      ],
    },
  }),
  S('g2-xx', 12.5, {
    prereqs: ['g2-log-eq'], icon: 'xˣ', tags: ['CMS'], examWeight: 1, exam: ['open', 'mcq'],
    title: 'Équations du type xˣ',
    desc: 'x^f = x^g ⇔ f = g ou x = 1.',
    prereqWhy: { 'g2-log-eq': 'prendre ln des deux membres, avec le domaine x > 0' },
    intro: {
      rule: 'Pour x > 0, xᵃ = e^(a ln x). Donc x^f = x^g ⇔ (f − g)·ln x = 0 ⇔ f = g <b>ou</b> x = 1. Ne pas oublier x = 1.',
      lines: [
        { cas: '(x^2)^x=x^(x^2)', note: 'Départ, x > 0', noEq: true },
        { cas: 'e^(2xln(x))=e^(x^2ln(x))', note: 'Écrire avec e', noEq: true },
        { cas: '2xln(x)=x^2ln(x)', note: 'Comparer les exposants', noEq: true },
        { cas: 'xln(x)(2-x)=0', note: 'Factoriser', noEq: true },
        { cas: '{1;2}', note: 'ln x = 0 ou x = 2 (x = 0 exclu)', noEq: true },
      ],
    },
  }),
  S('g2-hyp-def', 12.5, {
    prereqs: ['g2-log-rules', 'g1-parity-period'], icon: 'cosh', tags: ['MAN', 'CMS'], examWeight: 1, exam: ['tf', 'mcq'],
    title: 'sinh, cosh, tanh : définitions et graphes',
    desc: 'Définies avec eˣ et e⁻ˣ ; cosh² − sinh² = 1.',
    prereqWhy: { 'g2-log-rules': 'évaluer en ln a : e^(ln a) = a' },
    intro: {
      rule: 'sinh x = (eˣ − e⁻ˣ)/2 (impaire), cosh x = (eˣ + e⁻ˣ)/2 (paire, ≥ 1), tanh x = sinh x / cosh x ∈ ]−1 ; 1[.<br>cosh²x − sinh²x = 1.',
      lines: [
        { cas: 'cosh(ln(2))', note: 'Départ', noEq: true },
        { cas: '(e^(ln(2))+e^(-ln(2)))/2', note: 'Définition' },
        { cas: '(2+1/2)/2', note: 'e^(ln 2) = 2, e^(−ln 2) = 1/2' },
        { cas: '5/4', note: 'Calculer' },
      ],
    },
  }),
  S('g2-hyp-formulas', 12.5, {
    prereqs: ['g2-hyp-def'], icon: 'ch2x', tags: ['MAN', 'CMS'], examWeight: 1, exam: ['mcq', 'open'],
    title: 'Formules hyperboliques',
    desc: 'On les retrouve avec les exponentielles : un + là où la trigo a un −.',
    intro: {
      rule: 'sinh(x + y) = sinh x cosh y + cosh x sinh y ; cosh(x + y) = cosh x cosh y + sinh x sinh y (signe +) ; cosh 2x = cosh²x + sinh²x ; 1 − tanh²x = 1/cosh²x.',
      lines: [
        { cas: 'cosh(2x)', note: 'En fonction de t = tanh x', noEq: true },
        { cas: 'cosh(x)^2+sinh(x)^2', note: 'Angle double' },
        { cas: 'cosh(x)^2(1+tanh(x)^2)', note: 'cosh²x en facteur' },
        { cas: '(1+tanh(x)^2)/(1-tanh(x)^2)', note: 'cosh²x = 1/(1 − tanh²x)' },
        { cas: '(1+t^2)/(1-t^2)', note: 'Conclure' },
      ],
    },
  }),
  S('g2-hyp-eq', 12.5, {
    prereqs: ['g2-hyp-def', 'g2-exp-eq'], icon: 'ch=a', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Équations hyperboliques',
    desc: 'Exponentielles, × 2eˣ, puis t = eˣ.',
    prereqWhy: { 'g2-hyp-def': 'remplacer sinh et cosh par leurs exponentielles' },
    intro: {
      rule: 'On remplace sinh et cosh par leurs exponentielles, on multiplie par 2eˣ, et on pose t = eˣ > 0 : on obtient un trinôme en t.',
      lines: [
        { cas: '2cosh(x)+sinh(x)=2', note: 'Départ', noEq: true },
        { cas: '(e^x+e^(-x))+(e^x-e^(-x))/2=2', note: 'Exponentielles', noEq: true },
        { cas: '3e^(2x)-4e^x+1=0', note: 'Multiplier par 2eˣ', noEq: true },
        { cas: 't=1 ou t=1/3', note: 't = eˣ : 3t² − 4t + 1 = 0', noEq: true },
        { cas: '{-ln(3);0}', note: 'Revenir à x', noEq: true },
      ],
    },
  }),
  S('g2-arg', 12.5, {
    prereqs: ['g2-hyp-eq', 'g1-inverse'], icon: 'argsh', tags: ['MAN', 'CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'argsh, argch, argth',
    desc: 'Les réciproques, en résolvant un trinôme en eᵘ.',
    prereqWhy: { 'g2-hyp-eq': 'argsh y s\'obtient en résolvant sinh u = y en t = eᵘ' },
    intro: {
      rule: 'argsh y = ln(y + √(y² + 1)) sur ℝ ; argch y = ln(y + √(y² − 1)) pour y ≥ 1 ; argth y = ½ ln((1 + y)/(1 − y)) pour |y| < 1.<br>cosh x = a (a > 1) a <b>deux</b> solutions : ±argch a.',
      lines: [
        { cas: 'cosh(x)=5/3', note: 'Départ', noEq: true },
        { cas: 'e^x+e^(-x)=10/3', note: 'Exponentielles', noEq: true },
        { cas: '3t^2-10t+3=0', note: 't = eˣ', noEq: true },
        { cas: 't=3 ou t=1/3', note: 'Résoudre', noEq: true },
        { cas: '{-ln(3);ln(3)}', note: '±argch(5/3)', noEq: true },
      ],
    },
  }),
];
