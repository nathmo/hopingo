// Module G1, fonctions et inéquations (unit `fonctions-g`), second half:
// rational, parametric, absolute-value and irrational (in)equations, bounds.
// Catalogue: docs/universite/G-gymnase-1.md, section G1. Built at step U1,
// part b. Year 12: needsSolo false; year 12.5: needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:G-additionner = rat-operations, @alg:H-discriminant = quad-formula,
// @alg:D-factoriser-completement = fac-complete, @alg:I-param-1er-degre =
// param-linear, @alg:I-param-2e-degre = param-quadratic; indirect credit
// @alg:D-trinome = fac-trinomial.

export const UNIT = { id: 'fonctions-g', title: 'Fonctions et inéquations', color: '#5c940d', ready: true };

const S = (id, year, rest) => ({ id, unit: 'fonctions-g', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g1-rational-ineq', 12, {
    prereqs: ['g1-sign-table', 'rat-operations'], icon: 'A/B≥0', tags: ['CMS'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Inéquations rationnelles',
    desc: 'Tout d\'un côté, même dénominateur, tableau de signes.',
    intro: {
      rule: 'On ne multiplie <b>pas</b> par un dénominateur dont le signe dépend de x. On passe tout d\'un côté, on réduit au même dénominateur, puis on lit les signes. Les valeurs interdites restent exclues.',
      lines: [
        { cas: '(x+1)/(x-2)≥2', note: 'Départ', noEq: true },
        { cas: 'D=ℝ∖{2}', note: 'Domaine', noEq: true },
        { cas: '(x+1)/(x-2)-2≥0', note: 'Tout d\'un côté', noEq: true },
        { cas: '(5-x)/(x-2)≥0', note: 'Même dénominateur', noEq: true },
        { cas: ']2;5]', note: 'Signes : − ‖ + 0 −', noEq: true },
      ],
    },
  }),
  S('g1-param', 12.5, {
    prereqs: ['g1-rational-ineq', 'param-linear'], icon: 'm?', tags: ['CMS'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Équations et inéquations à paramètre',
    desc: 'Avant de diviser par une expression en m, on discute.',
    prereqWhy: { 'g1-rational-ineq': 'les cas selon m demandent de regarder le signe d\'un facteur, comme un tableau de signes', 'param-linear': 'équation du 1er degré à paramètre' },
    intro: {
      rule: 'Avant de diviser par une expression en m, on traite à part les m qui l\'annulent, et on regarde son signe : si elle est négative, l\'inégalité se retourne. La réponse dépend de m, cas par cas.',
      lines: [
        { cas: '(m-1)x≤m^2-1', note: 'Départ', noEq: true },
        { cas: '(m-1)x≤(m-1)(m+1)', note: 'Factoriser', noEq: true },
        { html: 'Cas m > 1 : x ≤ m + 1', note: 'Diviser par un positif', noEq: true },
        { html: 'Cas m < 1 : x ≥ m + 1', note: 'Diviser par un négatif : retourner', noEq: true },
        { html: 'Cas m = 1 : 0 ≤ 0, S = ℝ', note: 'Cas critique', noEq: true },
      ],
    },
  }),
  S('g1-viete', 12.5, {
    prereqs: ['g1-trinome-sign', 'g1-param', 'param-quadratic'], icon: 'x₁<k<x₂', tags: ['CMS'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Trinôme à paramètre : position des racines',
    desc: 'k est entre les racines si et seulement si a·f(k) < 0.',
    prereqWhy: { 'g1-param': 'la réponse est une discussion selon m', 'param-quadratic': 'trinôme dont les coefficients dépendent de m' },
    intro: {
      rule: 'Pour f(x) = ax² + bx + c et un nombre k : x₁ < k < x₂ si et seulement si a·f(k) < 0 (il y a alors deux racines). Pour k à l\'extérieur des racines : a·f(k) > 0.',
      lines: [
        { html: '(m − 2)x² − 2mx + m + 3 = 0, x₁ < 2 < x₂ ?', note: 'Départ', noEq: true },
        { cas: '(m-2)×4-2m×2+m+3', note: 'f(2)', noEq: true },
        { cas: 'm-5', note: 'Réduire', noEq: true },
        { cas: '(m-2)(m-5)<0', note: 'a·f(2) < 0', noEq: true },
        { cas: ']2;5[', note: 'Résoudre en m', noEq: true },
      ],
    },
  }),
  S('g1-abs-eq', 12, {
    prereqs: ['g9-intervals', 'quad-formula'], icon: '|A|=B', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Valeur absolue : équations',
    desc: 'Un cas par signe, et on garde les solutions du cas.',
    prereqWhy: { 'quad-formula': 'chaque cas donne souvent une équation du 2e degré' },
    intro: {
      rule: '|A| = A si A ≥ 0, et −A si A < 0. On découpe ℝ selon le signe de A, on résout dans chaque cas, et on garde les solutions <b>qui sont dans le cas</b>. Puis on réunit.',
      lines: [
        { cas: '|2x-3|=x+1', note: 'Départ', noEq: true },
        { html: 'Cas x ≥ 3/2 : 2x − 3 = x + 1, x = 4 ✓', note: 'Premier cas', noEq: true },
        { html: 'Cas x < 3/2 : −(2x − 3) = x + 1, x = 2/3 ✓', note: 'Second cas', noEq: true },
        { cas: '{2/3;4}', note: 'Réunir', noEq: true },
      ],
    },
  }),
  S('g1-abs-ineq', 12, {
    prereqs: ['g1-abs-eq', 'g1-trinome-sign'], icon: '|A|≤B', tags: ['MAN'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Valeur absolue : inéquations, y compris avec un 2e degré',
    desc: '|A| < B : encadrement ; |A| > B : « ou » ; sinon des cas.',
    prereqWhy: { 'g1-abs-eq': 'même découpage en cas selon le signe de A' },
    intro: {
      rule: '|A| < B ⇔ −B < A < B. |A| > B ⇔ A < −B <b>ou</b> A > B. Avec un 2e degré, on découpe en cas, on résout chaque inéquation, puis on <b>intersecte avec le cas</b> avant de réunir.',
      lines: [
        { cas: 'x^2+|x-5|≤7', note: 'Départ', noEq: true },
        { html: 'Cas x ≥ 5 : x² + x − 12 ≤ 0, x ∈ [−4 ; 3], avec x ≥ 5 : S₁ = ∅', note: 'Intersecter', noEq: true },
        { html: 'Cas x < 5 : x² − x − 2 ≤ 0, x ∈ [−1 ; 2] = S₂', note: 'Second cas', noEq: true },
        { cas: '[-1;2]', note: 'Réunir', noEq: true },
      ],
    },
  }),
  S('g1-irr-eq', 12, {
    prereqs: ['g1-domain', 'quad-formula'], icon: '√A=B', tags: ['CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Équations irrationnelles',
    desc: '√A = B ⇔ B ≥ 0 et A = B².',
    prereqWhy: { 'g1-domain': 'la condition A ≥ 0 sous la racine', 'quad-formula': 'A = B² est souvent du 2e degré' },
    intro: {
      rule: '√A = B ⇔ B ≥ 0 et A = B². La condition B ≥ 0 remplace la vérification (A ≥ 0 devient automatique). Sans elle, élever au carré ajoute des solutions.',
      lines: [
        { cas: 'sqrt(x+7)=x+1', note: 'Départ', noEq: true },
        { cas: 'x+1≥0 et x+7=(x+1)^2', note: 'Condition et carré', noEq: true },
        { cas: 'x≥-1 et x^2+x-6=0', note: 'Développer', noEq: true },
        { cas: 'x≥-1 et (x=2 ou x=-3)', note: 'Résoudre', noEq: true },
        { cas: '{2}', note: 'Trier', noEq: true },
      ],
    },
  }),
  S('g1-irr-ineq', 12.5, {
    prereqs: ['g1-irr-eq', 'g1-abs-ineq'], icon: '√A≤B', tags: ['MAN', 'CMS'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Inéquations irrationnelles',
    desc: 'Les signes avant d\'élever au carré.',
    prereqWhy: { 'g1-irr-eq': 'même condition B ≥ 0 avant d\'élever au carré', 'g1-abs-ineq': 'découper en cas, intersecter avec chaque cas, réunir' },
    intro: {
      rule: '√A ≤ B ⇔ A ≥ 0 et B ≥ 0 et A ≤ B². √A ≥ B : deux cas. Si B < 0, c\'est vrai dès que A ≥ 0. Si B ≥ 0, on élève au carré : A ≥ B². On réunit les deux cas.',
      lines: [
        { cas: 'sqrt(x+12)≤x', note: 'Départ', noEq: true },
        { cas: 'x+12≥0 et x≥0 et x+12≤x^2', note: 'Conditions', noEq: true },
        { cas: 'x≥0 et x^2-x-12≥0', note: 'Simplifier', noEq: true },
        { cas: 'x≥0 et (x≤-3 ou x≥4)', note: 'Signe du trinôme', noEq: true },
        { cas: '[4;+∞[', note: 'Intersecter', noEq: true },
      ],
    },
  }),
  S('g1-bound', 12.5, {
    prereqs: ['g1-abs-ineq'], icon: '|f|≤C', tags: [], examWeight: 1, exam: ['tf', 'open'],
    title: 'Majorer ou minorer une expression',
    desc: 'Majorer chaque facteur, minorer le dénominateur.',
    prereqWhy: { 'g1-abs-ineq': '|x − a| ≤ r se traduit par a − r ≤ x ≤ a + r' },
    intro: {
      rule: 'Pour majorer |A·B|, on majore |A| et |B| séparément. Inégalité triangulaire : |a + b| ≤ |a| + |b|. Pour majorer une fraction positive, on majore le numérateur et on <b>minore</b> le dénominateur. Chaque ligne est ≤ la précédente.',
      lines: [
        { html: '|x − 1| ≤ 1, donc x ∈ [0 ; 2]', note: 'Hypothèse', noEq: true },
        { cas: '|x^2-1|', note: 'Départ', noEq: true },
        { cas: '|x-1|×|x+1|', note: 'Factoriser' },
        { cas: '1×|x+1|', note: '|x − 1| ≤ 1', noEq: true },
        { cas: '3', note: 'x + 1 ≤ 3', noEq: true },
      ],
    },
  }),
];
