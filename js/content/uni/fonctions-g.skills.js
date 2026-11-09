// Module G1, fonctions et inéquations (unit `fonctions-g`: the id
// `fonctions` is a school unit). Catalogue: docs/universite/G-gymnase-1.md,
// section G1. Built at step U1, part b. Year 12: needsSolo false; year
// 12.5: needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:G-valeurs-interdites = rat-domain, @alg:H-discriminant =
// quad-formula, @alg:D-factoriser-completement = fac-complete,
// @alg:F-isoler = iso-formula; indirect credit @alg:D-trinome =
// fac-trinomial, @alg:E-produit-en-croix = eq-proportion.

export const UNIT = { id: 'fonctions-g', title: 'Fonctions et inéquations', color: '#e64980', ready: true };

const S = (id, year, rest) => ({ id, unit: 'fonctions-g', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g1-domain', 12, {
    prereqs: ['g9-intervals', 'rat-domain'], icon: 'D_f', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Domaine de définition',
    desc: 'Toutes les conditions : dénominateurs, racines, puis « et ».',
    prereqWhy: { 'rat-domain': 'valeurs interdites d\'un dénominateur' },
    intro: {
      rule: 'On écrit <b>toutes</b> les conditions : dénominateur ≠ 0, expression sous une racine carrée ≥ 0 (> 0 si elle est aussi au dénominateur). Puis on les combine avec « et ».',
      lines: [
        { cas: '√(x+3)/(x^2-4)', note: 'f(x) =', noEq: true },
        { cas: 'x+3≥0∧x^2-4≠0', note: 'Écrire les conditions', noEq: true },
        { cas: 'x≥-3∧x≠-2∧x≠2', note: 'Résoudre chacune', noEq: true },
        { cas: '[-3;-2[∪]-2;2[∪]2;+∞[', note: 'Combiner : D_f', noEq: true },
      ],
    },
  }),
  S('g1-compose', 12, {
    prereqs: ['g1-domain'], icon: 'f∘g', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Composition de fonctions',
    desc: '(f ∘ g)(x) = f(g(x)) : g d\'abord. Et le domaine.',
    intro: {
      rule: '(f ∘ g)(x) = f(g(x)) : on applique g <b>d\'abord</b>.<br>x est dans le domaine de f ∘ g si x ∈ D_g et g(x) ∈ D_f : on regarde le domaine <b>avant</b> de simplifier.',
      lines: [
        { html: 'f(x) = √x, g(x) = 1 − x² : (g ∘ f)(x) = g(√x)', note: 'f d\'abord', noEq: true },
        { cas: '1-(√x)^2', note: 'Remplacer x par √x dans g' },
        { cas: '1-x', note: 'Simplifier' },
        { html: 'D = [0 ; +∞[, car √x doit exister', note: 'Domaine', noEq: true },
      ],
    },
  }),
  S('g1-inverse', 12, {
    prereqs: ['g1-compose', 'iso-formula'], icon: 'f⁻¹', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Fonction réciproque : l\'expliciter',
    desc: 'Résoudre y = f(x) en x, garder la solution de l\'ensemble de départ.',
    prereqWhy: { 'g1-compose': 'on vérifie f(f⁻¹(x)) = x', 'iso-formula': 'isoler x dans y = f(x)' },
    intro: {
      rule: 'Pour f : A → B bijective, on résout y = f(x) en x, avec x ∈ A. S\'il y a deux solutions, on garde celle qui est dans A. Puis on renomme : f⁻¹(x) = …<br>Ce n\'est pas 1/f.',
      lines: [
        { html: 'f : [1 ; +∞[ → [−1 ; +∞[, f(x) = x² − 2x', note: '', noEq: true },
        { cas: 'x^2-2x-y=0', note: 'Poser y = f(x)', noEq: true },
        { cas: 'x=1+√(1+y)∨x=1-√(1+y)', note: 'Résoudre', noEq: true },
        { cas: 'x=1+√(1+y)', note: 'x ≥ 1 : la racine +', noEq: true },
        { html: 'f⁻¹(x) = 1 + √(1 + x), x ≥ −1', note: 'Renommer', noEq: true },
      ],
    },
  }),
  S('g1-injective', 12, {
    prereqs: ['g9-counterexample', 'g9-proof-contra'], icon: 'inj', tags: ['MAN'], examWeight: 2, exam: ['tf', 'open'],
    title: 'Injectivité : prouver ou réfuter',
    desc: 'f(a) = f(b) ⇒ a = b, ou deux valeurs qui ont la même image.',
    prereqWhy: { 'g9-counterexample': 'réfuter : deux valeurs a ≠ b avec f(a) = f(b)', 'g9-proof-contra': 'preuve directe f(a) = f(b) ⇒ a = b' },
    intro: {
      rule: 'f est injective sur A si f(a) = f(b) ⇒ a = b pour tous a, b ∈ A.<br>Pour le prouver : on part de f(a) = f(b) et on arrive à a = b. Pour le réfuter : deux valeurs a ≠ b avec f(a) = f(b).',
      lines: [
        { html: 'Soient a, b ≠ 3 avec (2a + 1)/(a − 3) = (2b + 1)/(b − 3).', note: 'Charpente', noEq: true },
        { cas: '(2a+1)(b-3)=(2b+1)(a-3)', note: 'Produit en croix', noEq: true },
        { cas: '-6a+b=-6b+a', note: 'Développer : 2ab et −3 s\'en vont', noEq: true },
        { cas: 'a=b', note: 'Donc f est injective', noEq: true },
      ],
    },
  }),
  S('g1-surjective', 12.5, {
    prereqs: ['g1-injective', 'g1-inverse', 'g1-irr-ineq'], icon: 'surj', tags: ['MAN'], examWeight: 3, exam: ['open'],
    title: 'Surjectivité, bijection, ensemble d\'arrivée',
    desc: 'Un antécédent pour chaque y, et dans l\'ensemble de départ.',
    prereqWhy: { 'g1-injective': 'bijective = injective et surjective' },
    intro: {
      rule: 'f : A → B est surjective si tout y ∈ B a un antécédent <b>dans A</b>. On résout y = f(x) en x, on vérifie qu\'une solution existe pour tout y ∈ B, <b>et</b> qu\'elle est dans A.<br>Injective et surjective : bijective, et la solution trouvée donne f⁻¹.',
      lines: [
        { html: 'f : [1 ; +∞[ → [2 ; +∞[, f(x) = x + 1/x. Soit y ≥ 2.', note: 'Charpente', noEq: true },
        { cas: 'x^2-yx+1=0', note: 'Équation en x', noEq: true },
        { html: 'Δ = y² − 4 ≥ 0 car y ≥ 2', note: 'Existence', noEq: true },
        { html: 'x = (y + √(y² − 4))/2 ≥ y/2 ≥ 1', note: 'La solution est dans A', noEq: true },
        { html: 'f⁻¹(x) = (x + √(x² − 4))/2, x ≥ 2', note: 'Réciproque', noEq: true },
      ],
    },
  }),
  S('g1-parity-period', 12, {
    prereqs: ['g1-domain', 'g9-counterexample', 'g3-reduce'], icon: 'f(−x)', tags: ['CMS'], examWeight: 1, exam: ['tf', 'mcq'],
    title: 'Parité et périodicité',
    desc: 'f(−x) = f(x) ou −f(x) pour tout x ; période d\'une somme.',
    prereqWhy: { 'g9-counterexample': '« ni paire ni impaire » se montre avec une valeur de x', 'g3-reduce': 'période de sin(ax) et cos(ax), angles associés' },
    intro: {
      rule: 'f est paire si D_f est symétrique et f(−x) = f(x) pour tout x ; impaire si f(−x) = −f(x).<br>Pour dire « ni paire ni impaire », une valeur x suffit.<br>La période de sin(ax) est 2π/|a| ; une somme a pour période le plus petit multiple commun.',
      lines: [
        { html: 'f(x) = x|x|, D_f = ℝ symétrique', note: 'Domaine', noEq: true },
        { cas: '(-x)×|-x|', note: 'f(−x)', noEq: true },
        { cas: '-x×|x|', note: '|−x| = |x| : f(−x) = −f(x), f est impaire' },
        { html: 'sin 2x + cos 3x : périodes π et 2π/3, donc T = 2π', note: 'Période d\'une somme', noEq: true },
      ],
    },
  }),
  S('g1-trinome-sign', 12, {
    prereqs: ['g9-intervals', 'quad-formula'], icon: 'ax²≥0', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Signe du trinôme, inéquation du 2e degré',
    desc: 'Le signe de a à l\'extérieur des racines.',
    prereqWhy: { 'g9-intervals': 'écrire l\'ensemble solution en intervalles' },
    intro: {
      rule: 'Si Δ > 0, ax² + bx + c a le signe de a <b>à l\'extérieur</b> des racines et le signe contraire entre elles. Si Δ < 0, il a partout le signe de a.',
      lines: [
        { cas: '-2x^2+x+3≥0', note: 'Départ', noEq: true },
        { html: 'Δ = 1 + 24 = 25 ; racines −1 et 3/2', note: 'Racines', noEq: true },
        { html: 'a = −2 < 0 : positif entre les racines', note: 'Signe', noEq: true },
        { cas: '[-1;3/2]', note: 'S', noEq: true },
      ],
    },
  }),
  S('g1-sign-table', 12, {
    prereqs: ['g1-trinome-sign', 'fac-complete'], icon: '+ − ‖', tags: ['CMS'], examWeight: 2, exam: ['mcq'],
    title: 'Tableau de signes',
    desc: 'Une ligne par facteur, puis la règle des signes.',
    prereqWhy: { 'g1-trinome-sign': 'signe de chaque facteur du 2e degré', 'fac-complete': 'factoriser avant de faire le tableau' },
    intro: {
      rule: 'On factorise, on place tous les zéros et les valeurs interdites dans l\'ordre, une ligne par facteur, puis la règle des signes.<br>Un facteur au carré ne change pas de signe. Une valeur interdite est marquée ‖.',
      lines: [
        { cas: '(x-1)(x+2)^2/(3-x)', note: 'Bornes −2, 1, 3', noEq: true },
        { html: 'x − 1 : − − 0 + + ; (x + 2)² : + 0 + + + ; 3 − x : + + + 0 −', note: 'Une ligne par facteur', noEq: true },
        { html: 'f : − 0 − 0 + ‖ −', note: 'Règle des signes', noEq: true },
        { cas: '{-2}∪[1;3[', note: 'f(x) ≥ 0', noEq: true },
      ],
    },
  }),
];
