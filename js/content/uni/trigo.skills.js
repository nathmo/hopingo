// Module G3, trigonométrie (unit `trigo`). Catalogue:
// docs/universite/G-gymnase-1.md, section G3. Built at step U1, part b.
// Year 12: needsSolo false; year 12.5 (niveau CMS): needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:C-developper = lit-polynomial, @alg:E-produit-nul = eq-product;
// indirect credit @alg:D-trinome = fac-trinomial, @alg:G-equations =
// rat-equation. g1-inverse (module G1) goes through UNBUILT until G1 is merged.

export const UNIT = { id: 'trigo', title: 'Trigonométrie', color: '#0ca678', ready: true };

const S = (id, year, rest) => ({ id, unit: 'trigo', year, optional: false, needsSolo: year >= 12.5, ...rest });

export const SKILLS = [
  S('g3-radians', 12, {
    prereqs: ['prop-rule3'], icon: 'rad', tags: ['CMS'], examWeight: 1, exam: ['mcq'],
    title: 'Radians et degrés',
    desc: 'π rad = 180° ; longueur d\'arc L = rθ.',
    intro: {
      rule: 'π rad = 180°. Pour passer en radians, on multiplie par π/180 ; pour revenir en degrés, par 180/π.<br>Longueur d\'arc : L = rθ, avec θ <b>en radians</b>.',
      lines: [
        { cas: '240°', note: 'Un angle en degrés', noEq: true },
        { cas: '240/180×π', note: 'Multiplier par π/180' },
        { cas: '(4π)/3', note: 'Simplifier' },
      ],
    },
  }),
  S('g3-reduce', 12, {
    prereqs: ['g3-radians'], icon: '↺', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Cercle trigonométrique, réduction d\'angles',
    desc: 'Retirer des tours, puis lire le quadrant.',
    prereqWhy: { 'g3-radians': 'angles en radians, tours de 2π' },
    intro: {
      rule: 'On retire des tours entiers (2π pour sin et cos, π pour tan), puis on lit le quadrant.<br>Angles associés : cos(π − x) = −cos x, sin(π − x) = sin x, cos(π/2 − x) = sin x, sin(π/2 + x) = cos x.',
      lines: [
        { cas: 'cos((53π)/6)', note: '53π/6 = 8π + 5π/6', noEq: true },
        { cas: 'cos((5π)/6)', note: 'Retirer 4 tours' },
        { cas: '-cos(π/6)', note: '5π/6 = π − π/6 : 2e quadrant' },
        { cas: '-√3/2', note: 'Valeur connue' },
      ],
    },
  }),
  S('g3-identities', 12, {
    prereqs: ['lit-polynomial'], icon: 'sin2x', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Formules d\'addition, d\'angle double, de bissection, somme-produit',
    desc: 'cos(a + b), sin 2x, cos²x = (1 + cos 2x)/2.',
    intro: {
      rule: 'cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b.<br>D\'où sin 2x = 2 sin x cos x et cos 2x = 2cos²x − 1 = 1 − 2sin²x. Bissection : cos²x = (1 + cos 2x)/2.<br>Somme-produit : sin p + sin q = 2 sin((p + q)/2) cos((p − q)/2).',
      lines: [
        { cas: 'sin(2x)/(1+cos(2x))', note: 'Montrer que c\'est tan x', noEq: true },
        { cas: '2sin(x)cos(x)/(1+cos(2x))', note: 'Angle double en haut' },
        { cas: '2sin(x)cos(x)/(2cos(x)^2)', note: 'cos 2x = 2cos²x − 1' },
        { cas: 'tan(x)', note: 'Simplifier' },
      ],
    },
  }),
  S('g3-exact', 12, {
    prereqs: ['g3-identities', 'root-rules'], icon: 'π/12', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Valeurs exactes sans calculatrice',
    desc: '7π/12 = π/3 + π/4 ; π/8 = (π/4)/2.',
    intro: {
      rule: 'On écrit l\'angle comme somme, différence ou moitié d\'angles connus : 7π/12 = π/3 + π/4, π/8 = (π/4)/2.<br>Pour une moitié, le signe se lit sur le quadrant.',
      lines: [
        { cas: 'cos((11π)/12)', note: '11π/12 = 2π/3 + π/4', noEq: true },
        { cas: 'cos((2π)/3)cos(π/4)-sin((2π)/3)sin(π/4)', note: 'Formule d\'addition' },
        { cas: '(-1/2)(√2/2)-(√3/2)(√2/2)', note: 'Valeurs connues' },
        { cas: '-(√2+√6)/4', note: 'Simplifier' },
      ],
    },
  }),
  S('g3-basic-eq', 12, {
    prereqs: ['g3-reduce', 'g9-intervals'], icon: 'cos=a', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Équations de base : cos x = a, sin x = a, tan x = a',
    desc: 'Deux familles (une pour tan), et la période divisée aussi.',
    prereqWhy: { 'g3-reduce': 'lire l\'angle α sur le cercle trigonométrique' },
    intro: {
      rule: 'cos u = cos α ⇔ u = α + 2kπ ou u = −α + 2kπ.<br>sin u = sin α ⇔ u = α + 2kπ ou u = π − α + 2kπ.<br>tan u = tan α ⇔ u = α + kπ.<br>Si u = 2x, on divise <b>aussi</b> la période par 2. k est un entier : on l\'écrit avec la touche k.',
      lines: [
        { cas: 'cos(2x-π/3)=1/2', note: 'Départ', noEq: true },
        { cas: '2x-π/3=π/3+2kπ ∨ 2x-π/3=-π/3+2kπ', note: 'Deux familles', noEq: true },
        { cas: 'x=π/3+kπ ∨ x=kπ', note: 'Diviser aussi la période', noEq: true },
      ],
    },
  }),
  S('g3-eq', 12.5, {
    prereqs: ['g3-basic-eq', 'g3-identities', 'eq-product'], icon: 'X=cos', tags: ['MAN', 'CMS'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Équations trigonométriques',
    desc: 'Une seule fonction, factoriser, ou diviser par cos²x.',
    prereqWhy: { 'g3-identities': 'cos²x = 1 − sin²x, angle double', 'eq-product': 'factoriser puis appliquer le produit nul' },
    intro: {
      rule: 'On ramène à des équations de base. Outils : une seule fonction (cos²x = 1 − sin²x) puis X = cos x ; factoriser et produit nul ; équation homogène : on divise par cos²x <b>après avoir vérifié</b> que cos x = 0 ne donne pas de solution.',
      lines: [
        { cas: '2cos(x)^2-3cos(x)+1=0', note: 'Posons X = cos x', noEq: true },
        { cas: '(2X-1)(X-1)=0', note: 'Factoriser', noEq: true },
        { cas: 'cos(x)=1/2 ∨ cos(x)=1', note: 'Revenir à x', noEq: true },
        { cas: 'x=π/3+2kπ ∨ x=-π/3+2kπ ∨ x=2kπ', note: 'Équations de base', noEq: true },
      ],
    },
  }),
  S('g3-asinbcos', 12.5, {
    prereqs: ['g3-basic-eq', 'g3-identities'], icon: 'Rsin', tags: ['MAN', 'CMS'], examWeight: 3, exam: ['mcq', 'open'],
    title: 'a sin x + b cos x : équations',
    desc: 'a sin x + b cos x = R sin(x + φ), R = √(a² + b²).',
    intro: {
      rule: 'a sin x + b cos x = R sin(x + φ) avec R = √(a² + b²), cos φ = a/R, sin φ = b/R. On divise par R, on reconnaît une formule d\'addition, puis on résout l\'équation de base. Si |c| > R, pas de solution.',
      lines: [
        { cas: '√3sin(x)+cos(x)=√2', note: 'R = √(3 + 1) = 2', noEq: true },
        { cas: '(√3/2)sin(x)+(1/2)cos(x)=√2/2', note: 'Diviser par R', noEq: true },
        { cas: 'sin(x+π/6)=√2/2', note: 'cos(π/6) sin x + sin(π/6) cos x', noEq: true },
        { cas: 'x=π/12+2kπ ∨ x=(7π)/12+2kπ', note: 'Équation de base', noEq: true },
      ],
    },
  }),
  S('g3-bioche', 12.5, {
    prereqs: ['g3-basic-eq'], icon: 't=tan', tags: ['MAN', 'CMS'], examWeight: 1, exam: ['open', 'mcq'],
    title: 'Substitution t = tan(x/2)',
    desc: 'sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), et x = π + 2kπ à part.',
    prereqWhy: { 'g3-basic-eq': 'revenir de tan(x/2) = t à x' },
    intro: {
      rule: 'Avec t = tan(x/2) : sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²). L\'équation devient rationnelle en t.<br>Cette substitution n\'existe pas pour x = π + 2kπ : on teste ces valeurs à part.',
      lines: [
        { cas: '2sin(x)-cos(x)=1', note: 'x = π : 2·0 − (−1) = 1, solution', noEq: true },
        { cas: '4t/(1+t^2)-(1-t^2)/(1+t^2)=1', note: 't = tan(x/2)', noEq: true },
        { cas: 't=1/2', note: '4t − 1 + t² = 1 + t²', noEq: true },
        { cas: 'x=2arctan(1/2)+2kπ ∨ x=π+2kπ', note: 'Revenir à x', noEq: true },
      ],
    },
  }),
  S('g3-ineq', 12.5, {
    prereqs: ['g3-asinbcos'], icon: 'cos≥', tags: ['MAN'], examWeight: 3, exam: ['open', 'mcq'],
    title: 'Inéquations trigonométriques',
    desc: 'L\'arc solution + 2kπ, puis k par k dans l\'intervalle.',
    intro: {
      rule: 'On se ramène à cos u ≥ c (ou sin, tan). Sur le cercle, on lit l\'arc solution, on l\'écrit comme intervalle + 2kπ, on revient à x, puis on garde les morceaux qui tombent dans l\'intervalle donné, k par k.',
      lines: [
        { cas: 'cos(x+π/3)≥1/2', note: 'Sur [0 ; 2π]', noEq: true },
        { cas: '-π/3+2kπ≤x+π/3≤π/3+2kπ', note: 'Arc autour de 0', noEq: true },
        { cas: '-(2π)/3+2kπ≤x≤2kπ', note: 'Isoler x', noEq: true },
        { cas: '{0}∪[(4π)/3;2π]', note: 'k = 0 et k = 1', noEq: true },
      ],
    },
  }),
  S('g3-triangle', 12, {
    prereqs: ['g3-exact'], icon: '△', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['open', 'mcq'],
    title: 'Résoudre un triangle',
    desc: 'Théorème du cosinus, théorème du sinus, cas ambigu.',
    intro: {
      rule: 'Théorème du cosinus : c² = a² + b² − 2ab cos γ (deux côtés et l\'angle compris, ou trois côtés).<br>Théorème du sinus : a/sin α = b/sin β. Si sin β = s, β ou 180° − β : on teste les deux. Les angles s\'écrivent avec ° (touche °).',
      lines: [
        { cas: '5^2+8^2-2×5×8×cos(60°)', note: 'c² avec γ = 60°', noEq: true },
        { cas: '49', note: 'c = 7' },
        { cas: '(8^2+7^2-5^2)/(2×8×7)', note: 'cos α', noEq: true },
        { cas: '11/14', note: 'α ≈ 38,21°' },
      ],
    },
  }),
  S('g3-arc-def', 12, {
    prereqs: ['g3-reduce', 'g1-inverse'], icon: 'arccos', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Fonctions arc : définition et arccos(cos θ)',
    desc: 'arcsin, arccos, arctan et leurs images.',
    prereqWhy: { 'g1-inverse': 'un arc est la réciproque d\'une restriction bijective' },
    intro: {
      rule: 'arcsin : [−1 ; 1] → [−π/2 ; π/2] ; arccos : [−1 ; 1] → [0 ; π] ; arctan : ℝ → ]−π/2 ; π/2[.<br>arccos(cos θ) = θ <b>seulement si</b> θ ∈ [0 ; π]. Sinon on cherche l\'angle de [0 ; π] qui a le même cosinus.',
      lines: [
        { cas: 'arccos(cos((13π)/4))', note: '13π/4 = 4π − 3π/4', noEq: true },
        { cas: 'arccos(cos(-(3π)/4))', note: 'Réduire' },
        { cas: 'arccos(cos((3π)/4))', note: 'cos est paire' },
        { cas: '(3π)/4', note: '3π/4 ∈ [0 ; π]' },
      ],
    },
  }),
  S('g3-arc-comp', 12.5, {
    prereqs: ['g3-arc-def', 'g3-identities'], icon: 'cos∘arcsin', tags: ['MAN', 'CMS'], examWeight: 2, exam: ['mcq', 'open'],
    title: 'Compositions : cos(2 arccos a), tan(arcsin a)',
    desc: 'Poser θ, lire son intervalle, puis le signe.',
    prereqWhy: { 'g3-arc-def': 'poser θ = arcsin a avec θ dans le bon intervalle' },
    intro: {
      rule: 'On pose θ = arcsin a (ou arccos a, arctan a), on écrit ce qu\'on sait (sin θ = a, θ ∈ [−π/2 ; π/2]), on en déduit les autres valeurs avec le <b>signe</b> donné par l\'intervalle, puis on applique une formule.',
      lines: [
        { cas: 'cos(arcsin(-3/5))', note: 'θ ∈ [−π/2 ; π/2] : cos θ ≥ 0', noEq: true },
        { cas: '√(1-9/25)', note: 'cos θ = +√(1 − sin²θ)' },
        { cas: '4/5', note: 'Valeur' },
      ],
    },
  }),
];
