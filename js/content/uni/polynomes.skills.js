// Module G0, polynômes (unit `polynomes`). Catalogue:
// docs/universite/G-gymnase-1.md, section G0. Built at step U1.
// Year 12: needsSolo false; year 12.5 (niveau CMS): needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:C-developper = lit-polynomial (développer, réduire, ordonner),
// @alg:E-systemes = eq-systems, @alg:H-discriminant = quad-formula,
// @alg:D-factoriser-completement = fac-complete, @alg:G-additionner =
// rat-operations; indirect credit @alg:D-trinome = fac-trinomial.
// g8-algebraic (module G8, step U4) goes through UNBUILT.

export const UNIT = { id: 'polynomes', title: 'Polynômes', color: '#d9480f', ready: true };

const S = (id, year, rest) => ({ id, unit: 'polynomes', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g0-identify', 12, {
    prereqs: ['lit-polynomial', 'eq-systems'], icon: 'a=?', tags: ['CMS'], examWeight: 1, exam: ['coef', 'mcq'],
    title: 'Identifier des coefficients',
    desc: 'Deux polynômes égaux ont les mêmes coefficients.',
    prereqWhy: { 'lit-polynomial': 'développer et ordonner le membre de gauche', 'eq-systems': 'résoudre le système des coefficients' },
    intro: {
      rule: 'Deux polynômes sont égaux pour tout x si et seulement si leurs coefficients sont égaux, degré par degré.<br>On développe, on ordonne, puis on écrit une équation par puissance de x.',
      lines: [
        { cas: '(x-2)(ax^2+bx+c)=2x^3-3x^2-3x+2', note: 'Départ', noEq: true },
        { cas: 'ax^3+(b-2a)x^2+(c-2b)x-2c=2x^3-3x^2-3x+2', note: 'Développer et ordonner', noEq: true },
        { cas: 'a=2;b-2a=-3;c-2b=-3;-2c=2', note: 'Identifier', noEq: true },
        { cas: 'a=2;b=1;c=-1', note: 'Résoudre', noEq: true },
      ],
    },
  }),
  S('g0-horner', 12, {
    prereqs: ['lit-polynomial'], icon: '↘+', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['coef', 'mcq'],
    title: 'Schéma de Horner : valeur et division par x − a',
    desc: 'Descendre, multiplier par a, ajouter.',
    prereqWhy: { 'lit-polynomial': 'écrire P développé et ordonné pour lire tous ses coefficients' },
    intro: {
      rule: 'On écrit <b>tous</b> les coefficients, 0 compris. On descend le premier. Ensuite : multiplier par a, ajouter au coefficient suivant.<br>La dernière case est P(a) ; les autres sont les coefficients du quotient, de degré un de moins. Pour x + 2, a = −2.',
      lines: [
        { html: 'P = 2x⁴ − 3x³ + 0x² + 5x − 6, a = 2 : coefficients 2, −3, 0, 5, −6', note: 'Tous les coefficients', noEq: true },
        { html: '2 ; −3 + 4 = 1 ; 0 + 2 = 2 ; 5 + 4 = 9 ; −6 + 18 = 12', note: 'Multiplier par 2, ajouter', noEq: true },
        { cas: '2x^4-3x^3+5x-6=(x-2)(2x^3+x^2+2x+9)+12', note: 'Q et R = P(2)', noEq: true },
      ],
    },
  }),
  S('g0-long-div', 12, {
    prereqs: ['lit-polynomial'], icon: 'A÷B', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['coef', 'mcq'],
    title: 'Division euclidienne',
    desc: 'A = BQ + R avec deg R < deg B.',
    prereqWhy: { 'lit-polynomial': 'soustraire B multiplié par le terme du quotient, termes ordonnés' },
    intro: {
      rule: 'On divise le terme dominant de A par celui de B, on multiplie B par ce terme, on soustrait, et on recommence tant que deg R ≥ deg B.<br>Chaque étape s\'écrit A = BQ + R : c\'est une identité qu\'on peut vérifier.',
      lines: [
        { cas: 'A=2x^4+x^3-3x+1', note: 'B = x² + x − 1', noEq: true },
        { cas: 'A=B×2x^2+(-x^3+2x^2-3x+1)', note: 'Premier terme : 2x⁴ ÷ x² = 2x²', noEq: true },
        { cas: 'A=B×(2x^2-x)+(3x^2-4x+1)', note: 'Deuxième terme', noEq: true },
        { cas: 'A=B×(2x^2-x+3)+(-7x+4)', note: 'deg R = 1 < 2', noEq: true },
      ],
    },
  }),
  S('g0-factor-thm', 12, {
    prereqs: ['g0-horner'], icon: 'P(a)', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Théorème du reste, racine évidente',
    desc: 'Le reste par x − a est P(a).',
    prereqWhy: { 'g0-horner': 'diviser par x − a une fois la racine trouvée' },
    intro: {
      rule: 'Le reste de P par x − a est P(a). Donc a est racine si et seulement si x − a divise P.<br>Si P est unitaire à coefficients entiers, une racine entière divise le terme constant : on essaie ±1, ±2…',
      lines: [
        { cas: 'x^3-2x^2-5x+6', note: 'P(1) = 1 − 2 − 5 + 6 = 0', noEq: true },
        { cas: '(x-1)(x^2-x-6)', note: 'Diviser par x − 1' },
        { cas: '(x-1)(x-3)(x+2)', note: 'Factoriser le trinôme' },
      ],
    },
  }),
  S('g0-multiplicity', 12, {
    prereqs: ['g0-factor-thm'], icon: '(x−a)ᵏ', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Multiplicité d\'une racine',
    desc: 'Horner en a, encore et encore, tant que le reste est nul.',
    prereqWhy: { 'g0-factor-thm': 'a racine ⇔ (x − a) divise P' },
    intro: {
      rule: 'a est racine de multiplicité k si (x − a)ᵏ divise P mais pas (x − a)ᵏ⁺¹.<br>On applique Horner en a plusieurs fois de suite, tant que le reste est nul.',
      lines: [
        { cas: 'x^4-x^3-3x^2+5x-2', note: 'Horner en 1 : reste 0', noEq: true },
        { cas: '(x-1)(x^3-3x+2)', note: 'Encore en 1 : reste 0' },
        { cas: '(x-1)^2(x^2+x-2)', note: 'Encore en 1 : reste 0' },
        { cas: '(x-1)^3(x+2)', note: 'x + 2 en 1 vaut 3 ≠ 0 : multiplicité 3' },
      ],
    },
  }),
  S('g0-factor-real', 12, {
    prereqs: ['quad-formula', 'fac-complete', 'g0-factor-thm'], icon: 'ℝ[x]', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Factoriser sur ℝ',
    desc: 'Facteurs du 1er degré et trinômes à Δ < 0.',
    prereqWhy: {
      'quad-formula': 'tester Δ des trinômes restants',
      'fac-complete': 'facteur commun et groupements avant de chercher des racines',
      'g0-factor-thm': 'trouver une racine évidente et diviser',
    },
    intro: {
      rule: 'Sur ℝ, un polynôme se factorise en facteurs du 1er degré et en trinômes à Δ &lt; 0. On cherche d\'abord un facteur commun ou un groupement, puis des racines évidentes, puis on teste Δ des trinômes restants.',
      lines: [
        { cas: 'x^4+x^3-x-1', note: 'Départ', noEq: true },
        { cas: 'x^3(x+1)-(x+1)', note: 'Grouper' },
        { cas: '(x+1)(x^3-1)', note: 'Facteur commun' },
        { cas: '(x+1)(x-1)(x^2+x+1)', note: 'a³ − b³ ; Δ = −3 < 0 : fini' },
      ],
    },
  }),
  S('g0-factor-complex', 12.5, {
    prereqs: ['g0-factor-real', 'g8-algebraic', 'g0-long-div'], icon: 'ℂ[x]', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Factoriser sur ℂ, racines conjuguées',
    desc: 'P réel : z racine ⇒ z̄ racine.',
    prereqWhy: {
      'g0-factor-real': 'on factorise sur ℝ, puis chaque trinôme à Δ < 0 sur ℂ',
      'g8-algebraic': 'calculer avec i : (x − z)(x − z̄) et les racines complexes',
      'g0-long-div': 'diviser P par le trinôme réel',
    },
    intro: {
      rule: 'Si P est à coefficients <b>réels</b> et z une racine non réelle, alors z̄ est aussi racine, et (x − z)(x − z̄) = x² − 2Re(z)x + |z|² est un trinôme réel.<br>Sur ℂ, tout polynôme de degré n a n racines comptées avec multiplicité.',
      lines: [
        { cas: 'x^4-2x^3+6x^2-8x+8', note: '2i est racine, donc −2i aussi', noEq: true },
        { cas: '(x^2+4)(x^2-2x+2)', note: 'Diviser par (x − 2i)(x + 2i) = x² + 4' },
        { cas: '(x-2i)(x+2i)(x-1-i)(x-1+i)', note: 'x² − 2x + 2 : Δ = −4, racines 1 ± i' },
      ],
    },
  }),
  S('g0-conditions', 12.5, {
    prereqs: ['g0-factor-complex', 'g0-factor-thm', 'g0-identify'], icon: 'P=?', tags: ['MAN'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Polynôme défini par des conditions',
    desc: 'Écrire la forme imposée, puis une équation par condition.',
    prereqWhy: {
      'g0-factor-complex': 'la racine conjuguée et le trinôme réel',
      'g0-factor-thm': 'une condition sur le reste se lit P(a)',
      'g0-identify': 'les conditions restantes se traduisent par des équations sur les inconnues',
    },
    intro: {
      rule: 'On écrit d\'abord la <b>forme</b> que les conditions imposent (degré, unitaire, racines connues), avec des inconnues. Chaque condition restante donne une équation.<br>Réel, unitaire, degré 3, racine 2 + i : P = (x² − 4x + 5)(x − c).',
    },
  }),
  S('g0-div-param', 12.5, {
    prereqs: ['g0-factor-thm', 'g0-long-div', 'g0-factor-real'], icon: 'λ', tags: ['MAN'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Divisibilité avec un paramètre',
    desc: '(x − a)(x − b) divise P ⇔ P(a) = 0 et P(b) = 0.',
    prereqWhy: {
      'g0-factor-thm': 'B divise P si P s\'annule aux racines de B',
      'g0-long-div': 'quand B n\'a pas de racines simples, on divise et on annule le reste',
      'g0-factor-real': 'factoriser P une fois le paramètre trouvé',
    },
    intro: {
      rule: 'B divise P si et seulement si le reste est nul. Si B = (x − a)(x − b) avec a ≠ b, cela revient à P(a) = 0 <b>et</b> P(b) = 0.<br>On résout les deux conditions et on garde les valeurs communes.',
    },
  }),
  S('g0-gcd', 12.5, {
    prereqs: ['g0-long-div', 'g0-factor-real'], icon: 'pgcd', tags: ['CMS'], examWeight: 1, exam: ['mcq', 'open'],
    title: 'PGCD de polynômes, racines communes',
    desc: 'Algorithme d\'Euclide : le dernier reste non nul.',
    prereqWhy: {
      'g0-long-div': 'chaque étape est une division euclidienne',
      'g0-factor-real': 'les racines communes se lisent sur le PGCD factorisé',
    },
    intro: {
      rule: 'Algorithme d\'Euclide : on divise A par B, puis B par le reste, et ainsi de suite. Le dernier reste non nul, rendu unitaire, est le PGCD. Ses racines sont les racines communes de A et B.',
    },
  }),
  S('g0-pfd-simple', 12.5, {
    prereqs: ['g0-identify', 'g0-factor-real', 'rat-operations'], icon: 'A/(x−a)', tags: ['CMS'], examWeight: 2, exam: ['coef', 'mcq'],
    title: 'Éléments simples : facteurs du 1er degré distincts',
    desc: 'La méthode du cache.',
    prereqWhy: {
      'g0-identify': 'la forme A/(x − a) + B/(x − b) a des coefficients inconnus à trouver',
      'g0-factor-real': 'factoriser le dénominateur',
      'rat-operations': 'vérifier la décomposition en remettant au même dénominateur',
    },
    intro: {
      rule: 'Si deg N &lt; deg D et D = (x − a)(x − b) avec a ≠ b, alors N/D = A/(x − a) + B/(x − b).<br>A = N(a)/(a − b) : on « cache » le facteur x − a et on remplace x par a.',
      lines: [
        { cas: '(x+7)/(x^2-x-2)', note: 'Départ' },
        { cas: '(x+7)/((x-2)(x+1))', note: 'Factoriser D' },
        { cas: '3/(x-2)-2/(x+1)', note: 'A = 9/3 = 3 (cache en 2) ; B = 6/(−3) = −2 (cache en −1)' },
      ],
    },
  }),
  S('g0-pfd-general', 12.5, {
    prereqs: ['g0-pfd-simple', 'g0-long-div'], icon: '∑ simples', tags: ['CMS'], examWeight: 2, exam: ['coef', 'open'],
    title: 'Éléments simples : facteurs répétés, trinômes irréductibles, partie entière',
    desc: 'Diviser d\'abord ; (x − a)² donne deux termes ; un trinôme donne Bx + C.',
    prereqWhy: {
      'g0-pfd-simple': 'la méthode du cache pour les facteurs simples',
      'g0-long-div': 'si deg N ≥ deg D, on divise d\'abord',
    },
    intro: {
      rule: 'Si deg N ≥ deg D, on divise d\'abord. Un facteur (x − a)² demande deux termes : A/(x − a) + B/(x − a)². Un trinôme irréductible demande (Bx + C)/(x² + px + q).',
      lines: [
        { cas: '(5x^2+2x+1)/((x-1)(x^2+1))', note: 'Départ' },
        { cas: '4/(x-1)+(x+3)/(x^2+1)', note: 'A = 8/2 = 4 (cache) ; puis identifier B et C' },
      ],
    },
  }),
];
