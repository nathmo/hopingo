// Module L, algèbre linéaire (unit `alglin`). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part L. Built at step U3.
// Year 13 (BA1): needsSolo true.
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:E-systemes-2x2 = eq-systems, @alg:H-discriminant = quad-formula,
// @alg:D-trinome = fac-trinomial, @alg:I-equation-parametre = param-linear,
// @alg:J-hausse-baisse = pct-change. g4-vectors, g4-line2 (module G4, step
// U5), g8-algebraic and g8-polar (module G8, step U4) go through UNBUILT.
// Intro lines are written in the line language of js/cas/matexpr.js (M)
// or in the CAS (C), and shown as MathML.

import { parseMatLine, evalAst, lineML } from '../../cas/matexpr.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

export const UNIT = { id: 'alglin', title: 'Algèbre linéaire', color: '#1971c2', ready: true };

// A matrix line as MathML (intro examples).
function M(text, opts = {}) {
  try {
    const line = parseMatLine(text, { vars: opts.vars || ['a', 'λ', 't', 's', 'b'] });
    const env = {};
    for (const a of line.assigns) { a.value = evalAst(a.ast, env, opts); env[a.name] = a.value; }
    if (line.body) line.value = evalAst(line.body, env, { vars: opts.vars || ['a', 'λ', 't', 's', 'b'] });
    return lineML(line);
  } catch { return text; }
}
const C = (text, vars = ['λ', 'a', 'x', 't']) => toMathML(parse(text, { vars }));
const L = (pairs) => pairs.map(([html, note, noEq = true]) => ({ html, note, noEq }));

const S = (id, rest) => ({ id, unit: 'alglin', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  // ---------- Systèmes linéaires (Lay 1.1, 1.2, 1.5) ----------
  S('l-sys-augmented', {
    prereqs: ['eq-systems'], icon: '[A|b]', examWeight: 0, exam: [],
    title: 'Matrice augmentée et opérations élémentaires',
    desc: 'Un système en matrice ; échanger, multiplier, ajouter.',
    prereqWhy: { 'eq-systems': 'un système linéaire et son ensemble de solutions' },
    intro: {
      rule: 'Un système s\'écrit comme une matrice augmentée [A | b]. Trois opérations ne changent pas les solutions : échanger deux lignes, multiplier une ligne par k ≠ 0, ajouter à une ligne un multiple d\'une autre.<br>L\'opération porte sur <b>toute</b> la ligne, second membre compris.',
      lines: L([
        [C('x+2y-z=3;2x+5y+z=7', ['x', 'y', 'z']), 'Le système'],
        [M('[[1,2,-1|3],[2,5,1|7]]'), 'Une ligne par équation'],
        [M('L2 ← L2 - 2L1 : [[1,2,-1|3],[0,1,3|1]]'), 'Le 7 devient 7 − 2·3'],
      ]),
    },
  }),
  S('l-sys-echelon', {
    prereqs: ['l-sys-augmented'], icon: '◺', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Forme échelonnée, pivots',
    desc: 'Un pivot, des zéros dessous, colonne par colonne.',
    prereqWhy: { 'l-sys-augmented': 'annuler sous un pivot avec Lᵢ ← Lᵢ − kLⱼ' },
    intro: {
      rule: 'On descend colonne par colonne : un pivot, puis des zéros dessous. Si le pivot est nul, on échange avec une ligne plus bas.<br>La forme échelonnée donne les pivots, donc le rang et les variables libres.',
      lines: L([
        [M('[[1,2,-1|3],[0,1,3|1],[0,3,3|3]]'), 'Première colonne nettoyée'],
        [M('L3 ← L3 - 3L2 : [[1,2,-1|3],[0,1,3|1],[0,0,-6|0]]'), 'Annuler sous le 2e pivot'],
        ['Pivots en colonnes 1, 2, 3', 'Solution unique'],
      ]),
    },
  }),
  S('l-sys-rref', {
    prereqs: ['l-sys-echelon'], icon: 'rref', examWeight: 1, exam: ['coef', 'mcq', 'tf'],
    title: 'Forme échelonnée réduite',
    desc: 'Des pivots à 1, des zéros au-dessus et au-dessous.',
    prereqWhy: { 'l-sys-echelon': 'la descente vient avant la remontée' },
    intro: {
      rule: 'Après la descente, on remonte : chaque pivot vaut 1, et la colonne d\'un pivot a des zéros au-dessus comme au-dessous.<br>La forme réduite est <b>unique</b> : on peut demander « que vaut r₁₃ ? ».',
      lines: L([
        [M('[[1,2,-1,0],[0,1,1,-1]]'), 'Forme échelonnée'],
        [M('L1 ← L1 - 2L2 : [[1,0,-3,2],[0,1,1,-1]]'), 'Remonter : r₁₃ = −3'],
      ]),
    },
  }),
  S('l-sys-solution', {
    prereqs: ['l-sys-rref'], icon: 'x=p+tv', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Variables libres, solution paramétrique',
    desc: 'Une colonne sans pivot, une variable libre.',
    prereqWhy: { 'l-sys-rref': 'on lit les solutions sur la forme réduite' },
    intro: {
      rule: 'Sur la forme réduite, chaque colonne sans pivot donne une variable libre. On exprime les variables pivots en fonction des libres, puis x = p + t·v.<br>Une ligne [0 … 0 | c] avec c ≠ 0 : aucune solution.',
      lines: L([
        [M('[[1,0,-3|2],[0,1,1|-1]]'), 'x₁ − 3x₃ = 2 ; x₂ + x₃ = −1'],
        [M('x = (2 ; -1 ; 0) + t(3 ; -1 ; 1)'), 'x₃ = t est libre'],
      ]),
    },
  }),
  S('l-sys-param', {
    prereqs: ['l-sys-echelon', 'l-sys-solution', 'param-linear', 'fac-trinomial'], icon: 'a ?', examWeight: 2, exam: ['mcq', 'coef', 'tf'],
    title: 'Système à paramètre : aucune, une ou une infinité de solutions',
    desc: 'Échelonner sans diviser par zéro, puis discuter.',
    prereqWhy: {
      'l-sys-echelon': 'échelonner en gardant le paramètre', 'l-sys-solution': 'lire « unique, aucune, infinité »',
      'param-linear': 'dernière ligne a·x = b, avec a et b fonctions du paramètre', 'fac-trinomial': 'factoriser le pivot f(a) pour trouver ses zéros',
    },
    intro: {
      rule: 'On échelonne en gardant le paramètre. <b>On ne divise jamais par une expression qui peut s\'annuler</b> sans traiter ce cas à part.<br>Dernière ligne [0 0 f(a) | g(a)] : f(a) ≠ 0, solution unique ; f(a) = 0 et g(a) ≠ 0, aucune ; f(a) = g(a) = 0, une infinité.',
      lines: L([
        [M('[[1,1,a|1],[0,a-1,1-a|0],[0,0,(1-a)(2+a)|1-a]]', { vars: ['a'] }), 'Échelonné, sans diviser'],
        ['a ∉ {1 ; −2} : unique ; a = 1 : infinité ; a = −2 : aucune', 'Discuter'],
      ]),
    },
  }),
  // ---------- Vecteurs, combinaisons, indépendance (Lay 1.3, 1.4, 1.7) ----------
  S('l-vec-span', {
    prereqs: ['l-sys-echelon', 'g4-vectors'], icon: 'Span', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Combinaisons linéaires, Span, Ax comme combinaison des colonnes',
    desc: 'b ∈ Span{v₁, …} ⇔ [v₁ … | b] compatible.',
    prereqWhy: { 'l-sys-echelon': 'échelonner [v₁ … v_k | b]', 'g4-vectors': 'combinaisons linéaires de vecteurs' },
    intro: {
      rule: 'b ∈ Span{v₁, …, v_k} si et seulement si le système [v₁ … v_k | b] est compatible. Ax est la combinaison des colonnes de A avec les poids x₁, …, xₙ.<br>Dans Pₙ, on travaille sur les coefficients.',
      lines: L([
        [M('[[1,1|3],[1,-1|b],[1,2|4]]', { vars: ['b'] }), 'q = 3 + bt + 4t² dans Span{1 + t + t², 1 − t + 2t²} ?'],
        [M('[[1,1|3],[0,1|1],[0,0|b-1]]', { vars: ['b'] }), 'Échelonner'],
        ['Compatible si et seulement si b = 1 ; alors q = 2p₁ + p₂', 'Conclure'],
      ]),
    },
  }),
  S('l-vec-indep', {
    prereqs: ['l-sys-solution', 'l-sys-param'], icon: 'libre', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Indépendance linéaire',
    desc: 'Libre ⇔ un pivot dans chaque colonne.',
    prereqWhy: { 'l-sys-solution': 'la relation de dépendance se lit sur la solution paramétrique', 'l-sys-param': 'discuter un pivot qui dépend du paramètre' },
    intro: {
      rule: 'v₁, …, v_k sont libres si et seulement si [v₁ … v_k]x = 0 n\'a que la solution nulle : un pivot dans chaque colonne.<br>Plus de vecteurs que la dimension : toujours liés. Une famille qui contient 0 est liée.',
      lines: L([
        [M('[[1,2,1],[0,a,3],[a,0,1]]', { vars: ['a'] }), 'Vecteurs en colonnes'],
        [M('[[1,2,1],[0,a,3],[0,0,7-a]]', { vars: ['a'] }), 'Pivots 1, a, 7 − a'],
        ['Liés si et seulement si a ∈ {0 ; 7}', 'Discuter'],
      ]),
    },
  }),
  S('l-sys-pivots-theory', {
    prereqs: ['l-sys-solution', 'l-vec-span', 'g9-implication'], icon: '∃ !', examWeight: 2, exam: ['tf', 'mcq'],
    title: 'Existence et unicité lues sur les pivots',
    desc: 'Pivot par ligne : pour tout b. Pivot par colonne : unique.',
    prereqWhy: { 'l-sys-solution': 'variable libre ⇔ colonne sans pivot', 'l-vec-span': 'solution pour tout b ⇔ les colonnes engendrent ℝᵐ', 'g9-implication': 'énoncés « si et seulement si » et réciproques' },
    intro: {
      rule: 'A est m × n. Ax = b a une solution <b>pour tout b</b> si et seulement s\'il y a un pivot dans chaque <b>ligne</b>. La solution est <b>unique</b> si et seulement s\'il y a un pivot dans chaque <b>colonne</b>.<br>Donc m &lt; n : jamais d\'unicité ; m &gt; n : jamais « pour tout b ».',
      lines: L([['A de taille 3 × 5 : au plus 3 pivots', 'Au moins 2 variables libres'], ['Ax = 0 a une infinité de solutions', 'Conclure']]),
    },
  }),
  // ---------- Applications linéaires (Lay 1.8, 1.9) ----------
  S('l-map-std-matrix', {
    prereqs: ['l-vec-span'], icon: 'T(eⱼ)', examWeight: 1, exam: ['mcq', 'coef', 'tf'],
    title: 'Matrice canonique à partir d\'images données',
    desc: 'Les colonnes sont T(e₁), …, T(eₙ).',
    prereqWhy: { 'l-vec-span': 'Ax est la combinaison des colonnes T(eᵢ)' },
    intro: {
      rule: 'T est linéaire si T(u + v) = T(u) + T(v) et T(cu) = cT(u) ; alors T(0) = 0. La matrice canonique a pour colonnes T(e₁), …, T(eₙ).<br>Si on donne T(2e₂) ou T(e₂ + e₃), on retrouve d\'abord T(e₂) et T(e₃) par linéarité.',
      lines: L([
        [M('T(2e_2) = (4 ; 2 ; -6)'), 'Donné'],
        [M('T(e_2) = (2 ; 1 ; -3)'), 'On divise par 2 avant d\'écrire la colonne'],
      ]),
    },
  }),
  S('l-map-inj-surj', {
    prereqs: ['l-map-std-matrix', 'l-sys-pivots-theory'], icon: '1-1', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Injective ou surjective, lu sur les pivots',
    desc: 'Injective : pivot par colonne. Surjective : pivot par ligne.',
    prereqWhy: { 'l-map-std-matrix': 'matrice A de T', 'l-sys-pivots-theory': 'pivots par ligne et par colonne' },
    intro: {
      rule: 'T(x) = Ax, A de taille m × n. T est injective ⇔ Ker A = {0} ⇔ un pivot dans chaque <b>colonne</b>. T est surjective ⇔ un pivot dans chaque <b>ligne</b>.<br>Si n &gt; m, T n\'est jamais injective ; si n &lt; m, jamais surjective.',
      lines: L([['A de taille 3 × 4', 'Pas injective (4 colonnes, au plus 3 pivots)'], ['Surjective si et seulement si le rang vaut 3', 'Pivot dans chaque ligne']]),
    },
  }),
  // ---------- Algèbre matricielle (Lay 2.1 à 2.5) ----------
  S('l-mat-product', {
    prereqs: [], icon: 'AB', examWeight: 1, exam: ['coef', 'mcq', 'tf'],
    title: 'Produit, transposée, règles de calcul',
    desc: 'Case (i, j) : ligne i de A fois colonne j de B.',
    intro: {
      rule: '(AB)ᵢⱼ = ligne i de A · colonne j de B ; AB existe si le nombre de colonnes de A égale le nombre de lignes de B.<br>En général AB ≠ BA, et AB = 0 n\'entraîne pas A = 0 ou B = 0. (AB)ᵀ = BᵀAᵀ.',
      lines: L([
        [M('[[1,2],[0,-1],[3,1]]·[[2,0,1],[1,-1,4]]'), 'A 3 × 2, B 2 × 3'],
        [M('[[4,-2,9],[-1,1,-4],[7,-1,7]]'), 'AB est 3 × 3 ; BA serait 2 × 2', false],
      ]),
    },
  }),
  S('l-mat-inverse', {
    prereqs: ['l-mat-product', 'l-sys-rref'], icon: 'A⁻¹', examWeight: 2, exam: ['coef', 'mcq', 'tf'],
    title: 'Inverse par [A | I]',
    desc: 'Réduire [A | I] jusqu\'à [I | A⁻¹].',
    prereqWhy: { 'l-mat-product': 'vérifier AA⁻¹ = I', 'l-sys-rref': 'réduire [A | I]' },
    intro: {
      rule: 'On réduit [A | I]. Si la partie gauche devient I, la partie droite est A⁻¹ ; sinon, A n\'est pas inversible.<br>Pour une 2 × 2 : [[a, b], [c, d]]⁻¹ = (1/(ad − bc))·[[d, −b], [−c, a]].',
      lines: L([
        [M('[[1,2],[3,4]]^(-1)'), 'ad − bc = −2'],
        [M('(1/-2)·[[4,-2],[-3,1]]'), 'Échanger a et d, changer le signe de b et c', false],
      ]),
    },
  }),
  S('l-map-geom', {
    prereqs: ['l-map-std-matrix', 'l-mat-inverse', 'g3-exact', 'g4-line2'], icon: '↻', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Géométrie dans ℝ² : rotation, projection, symétrie, affinité',
    desc: 'Les images de deux vecteurs bien choisis.',
    prereqWhy: { 'l-map-std-matrix': 'les colonnes sont les images de e₁ et e₂', 'l-mat-inverse': 'M = P·diag(1, k)·P⁻¹', 'g3-exact': 'cos θ et sin θ des angles usuels', 'g4-line2': 'axe et direction donnés par une équation de droite' },
    intro: {
      rule: 'Rotation d\'angle θ : [[cos θ, −sin θ], [sin θ, cos θ]]. Projection orthogonale sur la droite de direction u : uuᵀ/(uᵀu). Symétrie : 2·projection − I.<br>Affinité d\'axe d, de direction δ, de rapport k : M = P·diag(1, k)·P⁻¹ avec P = [a | u].',
      lines: L([[M('(1/5)·[[1,2],[2,4]]'), 'Projection sur y = 2x : u = (1 ; 2)']]),
    },
  }),
  S('l-mat-imt', {
    prereqs: ['l-mat-inverse', 'l-map-inj-surj'], icon: 'IMT', examWeight: 2, exam: ['tf', 'mcq'],
    title: 'Théorème de la matrice inversible',
    desc: 'Pour A carrée, une douzaine d\'énoncés équivalents.',
    prereqWhy: { 'l-mat-inverse': 'inversibilité par [A | I]', 'l-map-inj-surj': 'injective et surjective lues sur les pivots' },
    intro: {
      rule: 'Pour A carrée n × n, sont équivalents : A inversible ; n pivots ; Ax = 0 n\'a que 0 ; colonnes libres ; colonnes qui engendrent ℝⁿ ; x ↦ Ax injective ; surjective ; Aᵀ inversible ; det A ≠ 0 ; 0 n\'est pas valeur propre.<br><b>Pour une matrice non carrée, rien de cela ne tient.</b>',
      lines: L([['A 4 × 4, colonnes libres', 'Donc A est inversible'], ['Ax = b a une solution unique pour tout b', 'Conclure']]),
    },
  }),
  S('l-mat-elementary', {
    prereqs: ['l-mat-inverse'], icon: 'E', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Matrices élémentaires',
    desc: 'E = I après une seule opération ; EA fait l\'opération.',
    prereqWhy: { 'l-mat-inverse': 'l\'inverse de E fait l\'opération contraire' },
    intro: {
      rule: 'Une matrice élémentaire E est Iₙ après une seule opération ; EA fait cette opération sur les lignes de A. L\'inverse de E fait l\'opération contraire.<br>Si E_k⋯E₁A = I, alors A⁻¹ = E_k⋯E₁ et A = E₁⁻¹⋯E_k⁻¹.',
      lines: L([
        [M('E = [[1,0,0],[0,1,0],[2,0,1]]'), 'L3 ← L3 + 2L1 appliquée à I'],
        [M('E^(-1) = [[1,0,0],[0,1,0],[-2,0,1]]'), 'L3 ← L3 − 2L1 la défait'],
      ]),
    },
  }),
  S('l-mat-lu', {
    prereqs: ['l-mat-elementary', 'l-sys-echelon'], icon: 'LU', examWeight: 1, exam: ['coef', 'mcq', 'tf'],
    title: 'Factorisation LU',
    desc: 'U échelonnée sans échange ; L garde les multiplicateurs.',
    prereqWhy: { 'l-mat-elementary': 'L est le produit des inverses des matrices élémentaires', 'l-sys-echelon': 'échelonner sans échange' },
    intro: {
      rule: 'On échelonne A <b>sans échange</b>, avec seulement Lᵢ ← Lᵢ − ℓᵢⱼLⱼ et j &lt; i. U est la forme échelonnée ; L est unitriangulaire inférieure et ℓᵢⱼ est <b>le multiplicateur lui-même</b>.',
      lines: L([
        [M('L2 ← L2 - 2L1'), 'ℓ₂₁ = 2 (et non −2)'],
        [M('L = [[1,0,0],[2,1,0],[-1,3,1]] ; U = [[2,1,-1],[0,-1,2],[0,0,3]]'), 'A = LU'],
      ]),
    },
  }),
  S('l-mat-blocks', {
    prereqs: ['l-mat-inverse'], icon: '▦', tags: ['GM'], examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Produit par blocs, inverse d\'une matrice triangulaire par blocs',
    desc: 'Les blocs se multiplient comme des nombres, sans commuter.',
    prereqWhy: { 'l-mat-inverse': 'inverser les blocs diagonaux' },
    intro: {
      rule: 'Si les découpages sont compatibles, on multiplie les blocs comme des nombres, <b>sans changer l\'ordre des facteurs</b>.<br>[[A, B], [0, D]]⁻¹ = [[A⁻¹, −A⁻¹BD⁻¹], [0, D⁻¹]] ; son déterminant vaut det A · det D.',
      lines: L([['[[I, X], [0, I]]⁻¹ = [[I, −X], [0, I]]', 'Un exemple']]),
    },
  }),
  // ---------- Déterminants (Lay 3) ----------
  S('l-det-cofactor', {
    prereqs: [], icon: 'det', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Déterminant par cofacteurs',
    desc: 'Développer selon la ligne la plus creuse.',
    intro: {
      rule: 'On développe selon la ligne ou la colonne qui a le plus de zéros : det A = Σⱼ (−1)^(i+j)·aᵢⱼ·det Aᵢⱼ. Le signe suit un damier + − + / − + − / + − +.<br>Une matrice triangulaire a pour déterminant le produit de sa diagonale.',
      lines: L([
        [M('det[[2,0,1,3],[0,0,4,0],[1,-1,2,0],[3,0,5,1]]'), 'Ligne 2 : un seul coefficient non nul'],
        [`<math><mo>−</mo><mn>4</mn><mo>·</mo><mi>det</mi>${M('[[2,0,3],[1,-1,0],[3,0,1]]').replace(/^<math><mrow>|<\/mrow><\/math>$/g, '')}</math>`, '(−1)^(2+3) = −1', false],
        [C('-28'), 'Calculer', false],
      ]),
    },
  }),
  S('l-det-rowops', {
    prereqs: ['l-det-cofactor', 'l-sys-echelon'], icon: 'det ◺', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Déterminant par opérations sur les lignes',
    desc: 'Échelonner en suivant le facteur, puis la diagonale.',
    prereqWhy: { 'l-det-cofactor': 'déterminant d\'une triangulaire et des petits blocs', 'l-sys-echelon': 'échelonner' },
    intro: {
      rule: 'Lᵢ ← Lᵢ + kLⱼ ne change pas det ; un échange change le signe ; Lᵢ ← kLᵢ multiplie det par k.<br>On échelonne, puis on multiplie la diagonale. Les mêmes règles valent pour les colonnes.',
      lines: L([
        [M('det[[0,2],[3,4]]'), 'Le pivot est nul'],
        [M('L1 ↔ L2 : -det[[3,4],[0,2]]'), 'Un échange : le signe change'],
        [C('-6'), 'Produit de la diagonale', false],
      ]),
    },
  }),
  S('l-det-props', {
    prereqs: ['l-det-rowops', 'l-mat-imt'], icon: 'det AB', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Propriétés : det(AB), det(kA), det(Aᵀ), det(A⁻¹)',
    desc: 'det(AB) = det A·det B ; det(kA) = kⁿ det A.',
    prereqWhy: { 'l-det-rowops': 'det(kA) = kⁿ·det A vient de Lᵢ ← kLᵢ sur chaque ligne', 'l-mat-imt': 'det A ≠ 0 ⇔ A inversible' },
    intro: {
      rule: 'det(AB) = det A · det B ; det(Aᵀ) = det A ; det(A⁻¹) = 1/det A ; pour A de taille n × n, det(kA) = kⁿ·det A.<br><b>Mais det(A + B) ≠ det A + det B en général.</b>',
      lines: L([['A 4 × 4, det A = 3', ''], [C('2^4×3'), 'det(2A)', false], [C('48'), '', false]]),
    },
  }),
  S('l-det-area', {
    prereqs: ['l-det-cofactor'], icon: '▱', examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Aire et volume',
    desc: '|det| : aire du parallélogramme, volume du parallélépipède.',
    prereqWhy: { 'l-det-cofactor': 'calculer le déterminant' },
    intro: {
      rule: 'L\'aire du parallélogramme construit sur u et v vaut |det[u v]| ; celle du triangle, la moitié. Le volume d\'un parallélépipède vaut |det[u v w]|.<br>x ↦ Ax multiplie les aires (ou les volumes) par |det A|.',
      lines: L([['Triangle (1 ; 1), (4 ; 2), (2 ; 5) : u = (3 ; 1), v = (1 ; 4)', ''], [`${C('(1/2)·|11|')}`, '½·|det[u v]|', false], [C('11/2'), '', false]]),
    },
  }),
  S('l-det-cramer', {
    prereqs: ['l-det-cofactor'], icon: 'xᵢ=', tags: ['opt'], examWeight: 0, exam: ['mcq'],
    title: 'Règle de Cramer',
    desc: 'xᵢ = det Aᵢ(b) / det A.',
    prereqWhy: { 'l-det-cofactor': 'calculer det A et det Aᵢ(b)' },
    intro: {
      rule: 'Si det A ≠ 0, xᵢ = det Aᵢ(b) / det A, où Aᵢ(b) est A dont la <b>colonne</b> i est remplacée par b.<br>Utile pour une seule inconnue, ou avec un paramètre.',
      lines: L([[C('3x+2y=7;x+4y=9', ['x', 'y']), 'det A = 10'], [`<math><mi>x</mi><mo>=</mo>${M('det[[7,2],[9,4]]').replace(/^<math><mrow>|<\/mrow><\/math>$/g, '')}<mo>/</mo><mn>10</mn><mo>=</mo><mn>1</mn></math>`, 'Colonne 1 remplacée par b']]),
    },
  }),
  // ---------- Espaces vectoriels, bases, coordonnées (Lay 4.1 à 4.7) ----------
  S('l-vs-subspace', {
    prereqs: ['l-vec-span'], icon: 'H ⊂ V', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Est-ce un sous-espace ? Dans ℝⁿ, Pₙ et M_{m×n}',
    desc: '0 dedans, stable par somme et par multiple.',
    prereqWhy: { 'l-vec-span': 'un Span est toujours un sous-espace' },
    intro: {
      rule: 'H est un sous-espace si 0 ∈ H, et si H est stable par somme et par multiplication par un scalaire. Un Span, un noyau, une image sont toujours des sous-espaces.<br>Une condition non linéaire (uv = w²) ou non homogène (p(0) = 1) donne presque toujours « non », avec un contre-exemple.',
      lines: L([['{a + bt + ct² : a = b + c}', ''], [C('b(1+t)+c(1+t^2)', ['b', 'c', 't']), 'Paramétrer', false], ['= Span{1 + t, 1 + t²} : sous-espace de dimension 2', '']]),
    },
  }),
  S('l-vs-kernel', {
    prereqs: ['l-sys-solution'], icon: 'Ker', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Noyau : base de Ker A',
    desc: 'Une variable libre, un vecteur de base.',
    prereqWhy: { 'l-sys-solution': 'Ker A est l\'ensemble des solutions de Ax = 0' },
    intro: {
      rule: 'Ker A est l\'ensemble des solutions de Ax = 0. On réduit A, on écrit la solution générale avec les variables libres, et chaque variable libre donne un vecteur de base.<br>dim Ker A = nombre de variables libres.',
      lines: L([[M('[[1,2,0,-1],[0,0,1,3]]'), 'x₁ + 2x₂ − x₄ = 0 ; x₃ + 3x₄ = 0'], [M('Ker A = Span{(-2;1;0;0), (1;0;-3;1)}'), 'x₂ = s, x₄ = t']]),
    },
  }),
  S('l-vs-col-row', {
    prereqs: ['l-vec-indep'], icon: 'Col', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Image (Col A) et espace des lignes (Lgn A)',
    desc: 'Colonnes pivots de A ; lignes non nulles de R.',
    prereqWhy: { 'l-vec-indep': 'les colonnes pivots de A sont libres' },
    intro: {
      rule: 'Une base de Col A est formée des colonnes <b>de A</b> (pas de sa forme échelonnée) qui ont un pivot. Une base de Lgn A est formée des lignes non nulles <b>de la forme échelonnée</b>.<br>dim Col A = dim Lgn A = rang A.',
      lines: L([['Pivots en colonnes 1 et 3', ''], ['Col A = Span{a₁, a₃}, avec les colonnes de A', '']]),
    },
  }),
  S('l-vs-basis', {
    prereqs: ['l-vs-col-row'], icon: 'base', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Base et dimension : extraire, compléter, reconnaître',
    desc: 'Coordonnées en colonnes, puis pivots.',
    prereqWhy: { 'l-vs-col-row': 'extraire une base = garder les colonnes pivots' },
    intro: {
      rule: 'Dans un espace de dimension n, une famille de n vecteurs est une base si et seulement si elle est libre (ou si et seulement si elle engendre).<br>Pour extraire une base, on met les coordonnées en colonnes et on garde les colonnes pivots.',
      lines: L([['{1 + t, t + t², t² + t³, 1 + t³} dans P₃', ''], ['(1 + t) − (t + t²) + (t² + t³) − (1 + t³) = 0', 'Pas une base']]),
    },
  }),
  S('l-vs-rank', {
    prereqs: ['l-vs-basis'], icon: 'rg', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Rang et théorème du rang',
    desc: 'rang A + dim Ker A = n.',
    prereqWhy: { 'l-vs-basis': 'dimension = nombre de vecteurs d\'une base' },
    intro: {
      rule: 'Pour A de taille m × n : rang A + dim Ker A = n ; dim Ker Aᵀ = m − rang A ; rang A = rang Aᵀ ≤ min(m, n).<br>Pour T : V → W, dim Im T + dim Ker T = dim V.',
      lines: L([['A 5 × 7 de rang 3', ''], ['dim Ker A = 7 − 3 = 4 ; dim Ker Aᵀ = 5 − 3 = 2', '']]),
    },
  }),
  S('l-vs-coords', {
    prereqs: ['l-vs-basis'], icon: '[x]_B', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Coordonnées dans une base',
    desc: 'x = c₁b₁ + … + cₙbₙ : [x]_B = (c₁ ; … ; cₙ).',
    prereqWhy: { 'l-vs-basis': 'les coordonnées se prennent dans une base' },
    intro: {
      rule: '[x]_B = (c₁ ; … ; cₙ) si x = c₁b₁ + … + cₙbₙ. On résout le système [b₁ … bₙ | x].<br>Dans Pₙ, on identifie les coefficients de chaque puissance de t.',
      lines: L([['B = (1, 1 − t, t + t²), p = 2 + 3t − t²', ''], ['c₃ = −1 ; −c₂ + c₃ = 3 ; c₁ + c₂ = 2', 'Identifier'], [M('(6 ; -4 ; -1)'), '[p]_B']]),
    },
  }),
  S('l-vs-map-matrix', {
    prereqs: ['l-vs-coords', 'l-map-std-matrix'], icon: '[T]', examWeight: 2, exam: ['coef', 'mcq'],
    title: 'Matrice d\'une application entre Pₙ, M_{m×n} et ℝⁿ',
    desc: 'Colonne j : coordonnées de T(bⱼ) dans la base d\'arrivée.',
    prereqWhy: { 'l-vs-coords': 'coordonnées dans la base d\'arrivée', 'l-map-std-matrix': 'les images en colonnes' },
    intro: {
      rule: '[T]_{C B} a pour colonne j les <b>coordonnées dans C</b> de T(bⱼ). On calcule T(b₁), …, T(bₙ), puis on les exprime dans C.',
      lines: L([['T(a + bt + ct²) = (a − b ; b + 2c ; a + c), B = (1 + t, t − t², 1)', ''], [M('T(1+t) = (0 ; 1 ; 1)'), '1re colonne']]),
    },
  }),
  S('l-vs-change-basis', {
    prereqs: ['l-vs-coords', 'l-mat-inverse'], icon: 'P_{C←B}', examWeight: 2, exam: ['mcq', 'coef', 'tf'],
    title: 'Matrice de passage P_{C←B}',
    desc: 'Réduire [C | B] et lire à droite.',
    prereqWhy: { 'l-vs-coords': 'les colonnes sont des coordonnées dans C', 'l-mat-inverse': 'P_{B←C} = (P_{C←B})⁻¹' },
    intro: {
      rule: 'P_{C←B} a pour colonnes les coordonnées <b>dans C</b> des vecteurs <b>de B</b> ; [x]_C = P_{C←B}·[x]_B.<br>Dans ℝⁿ : on réduit [C | B] et on lit [I | P_{C←B}].',
      lines: L([[M('[[1,1|2,1],[1,2|3,0]]'), '[C | B]'], [M('[[1,0|1,2],[0,1|1,-1]]'), 'Réduire : P_{C←B} = [[1, 2], [1, −1]]']]),
    },
  }),
  S('l-vs-similar', {
    prereqs: ['l-vs-change-basis', 'l-vs-map-matrix'], icon: 'P⁻¹AP', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Matrice de T dans une base B ; matrices semblables',
    desc: '[T]_B = P⁻¹AP.',
    prereqWhy: { 'l-vs-change-basis': 'P est une matrice de passage', 'l-vs-map-matrix': 'matrice [T]_B d\'une application' },
    intro: {
      rule: 'Si A est la matrice canonique de T et P = [b₁ … bₙ], alors [T]_B = P⁻¹AP, et A = P·[T]_B·P⁻¹.<br>Deux matrices semblables ont le même polynôme caractéristique, le même déterminant, la même trace et le même rang.',
      lines: L([[M('[[1,1],[1,2]]·[[2,0],[1,3]]·[[1,1],[1,2]]^(-1)'), 'A = P·[T]_B·P⁻¹'], [M('[[3,0],[2,2]]'), '', false]]),
    },
  }),
  // ---------- Valeurs propres et vecteurs propres (Lay 5) ----------
  S('l-eig-check', {
    prereqs: ['l-mat-product', 'l-vs-kernel'], icon: 'Av=λv', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Vérifier un vecteur propre ou une valeur propre',
    desc: 'Calculer Av ; échelonner A − λI.',
    prereqWhy: { 'l-mat-product': 'calculer Av', 'l-vs-kernel': '(A − λI)x = 0 a une solution non nulle' },
    intro: {
      rule: 'v est un vecteur propre de A si v ≠ 0 et Av = λv pour un nombre λ. λ est une valeur propre si A − λI n\'est pas inversible.',
      lines: L([[M('[[3,1,0],[1,3,0],[0,0,2]]·(1 ; -1 ; 2)'), 'Calculer Av'], [M('(2 ; -2 ; 4)'), '= 2v : vecteur propre, λ = 2', false]]),
    },
  }),
  S('l-eig-charpoly', {
    prereqs: ['l-det-cofactor', 'g0-factor-thm', 'quad-formula'], icon: 'p(λ)', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Polynôme caractéristique et valeurs propres',
    desc: 'p(λ) = det(A − λI), puis ses racines.',
    prereqWhy: { 'l-det-cofactor': 'développer det(A − λI)', 'g0-factor-thm': 'racine évidente d\'un polynôme caractéristique de degré 3', 'quad-formula': 'racines d\'un trinôme en λ' },
    intro: {
      rule: 'p(λ) = det(A − λI) : λ est <b>soustrait à chaque case de la diagonale</b>. Les racines sont les valeurs propres. 2 × 2 : p(λ) = λ² − (tr A)λ + det A.<br><b>Les opérations sur les lignes changent les valeurs propres</b> : on ne les lit pas sur une forme échelonnée.',
      lines: L([[M('det[[4-λ,1],[2,3-λ]]', { vars: ['λ'] }), ''], [C('λ^2-7λ+10'), '', false], [C('(λ-2)(λ-5)'), 'Valeurs propres 2 et 5', false]]),
    },
  }),
  S('l-eig-space', {
    prereqs: ['l-eig-charpoly', 'l-vs-kernel'], icon: 'E_λ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Espaces propres : base de E_λ',
    desc: 'E_λ = Ker(A − λI).',
    prereqWhy: { 'l-eig-charpoly': 'valeurs propres λ', 'l-vs-kernel': 'E_λ = Ker(A − λI)' },
    intro: {
      rule: 'E_λ = Ker(A − λI). On réduit A − λI ; chaque variable libre donne un vecteur de base. 1 ≤ dim E_λ ≤ multiplicité de λ.',
      lines: L([[M('[[0,0,0],[1,1,1],[1,1,1]]'), 'A − 2I : x₁ + x₂ + x₃ = 0'], [M('E_2 = Span{(-1;1;0), (-1;0;1)}'), '']]),
    },
  }),
  S('l-eig-related', {
    prereqs: ['l-det-props'], icon: 'λᵏ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Valeurs propres de cA, Aᵏ, A⁻¹, Aᵀ, A + cI, BAB⁻¹',
    desc: 'La même opération sur chaque valeur propre.',
    prereqWhy: { 'l-det-props': 'det A = produit des valeurs propres' },
    intro: {
      rule: 'Si Av = λv : (cA)v = cλv, Aᵏv = λᵏv, A⁻¹v = (1/λ)v, (A + cI)v = (λ + c)v. Aᵀ a les mêmes valeurs propres (pas les mêmes vecteurs propres). BAB⁻¹ a les mêmes valeurs propres.<br>det A = produit des valeurs propres ; tr A = leur somme.',
      lines: L([['Spectre {1 ; 2 ; −3}', ''], ['A⁻¹ : {1 ; 1/2 ; −1/3} ; A + 3I : {4 ; 5 ; 0}', 'A + 3I n\'est pas inversible']]),
    },
  }),
  S('l-eig-diag', {
    prereqs: ['l-eig-space', 'l-mat-inverse'], icon: 'PDP⁻¹', examWeight: 2, exam: ['coef', 'mcq', 'tf'],
    title: 'Diagonaliser : A = PDP⁻¹',
    desc: 'n vecteurs propres libres, dans l\'ordre de D.',
    prereqWhy: { 'l-eig-space': 'bases des espaces propres', 'l-mat-inverse': 'calculer P⁻¹' },
    intro: {
      rule: 'A (n × n) est diagonalisable si et seulement si Σ dim E_λ = n. Alors P = [v₁ … vₙ] et D = diag(λ₁, …, λₙ), <b>dans le même ordre</b>, et A = PDP⁻¹.',
      lines: L([[M('[[5,-2],[4,-1]]'), 'λ = 1 et 3'], [M('P = [[1,1],[2,1]] ; D = diag(1,3)'), '']]),
    },
  }),
  S('l-eig-diag-param', {
    prereqs: ['l-eig-diag', 'l-vs-rank'], icon: 'diag(a)?', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Diagonalisable selon un paramètre ; multiplicités',
    desc: 'dim E_λ = multiplicité, pour chaque λ.',
    prereqWhy: { 'l-eig-diag': 'diagonalisable ⇔ dim E_λ = multiplicité', 'l-vs-rank': 'dim E_λ = n − rang(A − λI)' },
    intro: {
      rule: 'A est diagonalisable si et seulement si, pour chaque valeur propre, dim E_λ = multiplicité ; dim E_λ = n − rang(A − λI).<br>Avec un paramètre : on cherche les valeurs où deux valeurs propres se confondent, puis on teste le rang seulement là.',
      lines: L([[M('[[1,1,0],[0,a,0],[0,0,2]]', { vars: ['a'] }), 'Valeurs propres 1, a, 2'], ['a = 1 : rang(A − I) = 2, dim E₁ = 1', 'Pas diagonalisable'], ['Diagonalisable si et seulement si a ≠ 1', '']]),
    },
  }),
  S('l-eig-powers', {
    prereqs: ['l-eig-diag', 'g5-geom'], icon: 'Aᵏ', examWeight: 1, exam: ['mcq', 'open', 'tf'],
    title: 'Puissances Aᵏ et récurrences linéaires',
    desc: 'Aᵏ = PDᵏP⁻¹ ; chaque mode est géométrique.',
    prereqWhy: { 'l-eig-diag': 'A = PDP⁻¹', 'g5-geom': 'λᵏ : chaque mode est une suite géométrique' },
    intro: {
      rule: 'Si A = PDP⁻¹, alors Aᵏ = PDᵏP⁻¹, avec Dᵏ = diag(λ₁ᵏ, …). Une récurrence u_{k+2} = a·u_{k+1} + b·u_k s\'écrit x_{k+1} = Mx_k avec M = [[a, b], [1, 0]].',
      lines: L([['u_{k+2} = u_{k+1} + 6u_k', ''], ['λ² − λ − 6 = (λ − 3)(λ + 2)', 'Valeurs propres 3 et −2']]),
    },
  }),
  S('l-eig-markov', {
    prereqs: ['l-eig-powers', 'pct-change'], icon: '⇄', examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Chaînes de Markov à 2 états, état stationnaire',
    desc: 'Mq = q, avec q de somme 1.',
    prereqWhy: { 'l-eig-powers': 'x_k = Mᵏx₀', 'pct-change': 'traduire les pourcentages qui restent ou changent d\'état' },
    intro: {
      rule: 'x_{k+1} = Mx_k, où <b>chaque colonne</b> de M somme à 1. 1 est valeur propre ; le vecteur stationnaire q vérifie Mq = q et a des composantes de somme 1.',
      lines: L([[M('[[7/10,4/10],[3/10,6/10]]'), '70 % restent, 40 % s\'y mettent'], [M('q = (4/7 ; 3/7)'), 'État stationnaire']]),
    },
  }),
  S('l-eig-complex', {
    prereqs: ['l-eig-charpoly', 'g8-algebraic', 'g8-polar'], icon: 'a±bi', tags: ['opt'], examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Valeurs propres complexes, rotation et dilatation',
    desc: 'Δ < 0 : deux valeurs propres conjuguées.',
    prereqWhy: { 'l-eig-charpoly': 'polynôme caractéristique à Δ < 0', 'g8-algebraic': 'calculer avec a + bi', 'g8-polar': 'rapport √(a² + b²) et angle de la rotation' },
    intro: {
      rule: 'Une matrice réelle 2 × 2 avec Δ &lt; 0 a deux valeurs propres conjuguées a ± bi, et des vecteurs propres conjugués. Elle agit comme une rotation composée d\'une dilatation de rapport √(a² + b²).',
      lines: L([[M('[[1,-2],[1,3]]'), 'λ² − 4λ + 5'], ['λ = 2 ± i', 'Rapport √5']]),
    },
  }),
  // ---------- Orthogonalité (Lay 6) ----------
  S('l-orth-dot', {
    prereqs: ['l-mat-product'], icon: 'u·v', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Produit scalaire, norme, distance, angle',
    desc: 'u · v = uᵀv ; ‖u‖ = √(u · u).',
    prereqWhy: { 'l-mat-product': 'u · v = uᵀv' },
    intro: {
      rule: 'u · v = uᵀv ; ‖u‖ = √(u · u) ; dist(u, v) = ‖u − v‖ ; cos θ = u · v / (‖u‖‖v‖).<br>u ⊥ v ⇔ u · v = 0 ⇔ ‖u + v‖² = ‖u‖² + ‖v‖².',
      lines: L([['u = (1 ; 2 ; 2), v = (3 ; 0 ; −4)', ''], [C('3+0-8'), 'u · v', false], [C('-5'), '‖u‖ = 3, ‖v‖ = 5, cos θ = −1/3', false]]),
    },
  }),
  S('l-orth-complement', {
    prereqs: ['l-orth-dot', 'l-vs-kernel'], icon: 'W⊥', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Complément orthogonal W⊥',
    desc: 'W⊥ = Ker de la matrice des wᵢ en lignes.',
    prereqWhy: { 'l-orth-dot': 'w · x = 0 pour chaque wᵢ', 'l-vs-kernel': 'une base d\'un noyau' },
    intro: {
      rule: 'Si W = Span{w₁, …, w_k}, alors W⊥ = Ker M, où M a pour <b>lignes</b> w₁ᵀ, …, w_kᵀ. dim W + dim W⊥ = n. (Col A)⊥ = Ker Aᵀ.',
      lines: L([[M('[[1,1,0,2],[0,1,1,-1]]'), 'Vecteurs en lignes'], [M('Span{(1;-1;1;0), (-3;1;0;1)}'), 'W⊥']]),
    },
  }),
  S('l-orth-proj', {
    prereqs: ['l-orth-complement'], icon: 'ŷ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Projection orthogonale sur un sous-espace, distance',
    desc: 'ŷ = Σ (y · uᵢ / uᵢ · uᵢ) uᵢ, base orthogonale.',
    prereqWhy: { 'l-orth-complement': 'z = y − ŷ est dans W⊥' },
    intro: {
      rule: 'Si {u₁, …, u_k} est une base <b>orthogonale</b> de W, proj_W y = Σ (y · uᵢ / uᵢ · uᵢ)·uᵢ. z = y − ŷ ∈ W⊥ et dist(y, W) = ‖z‖.<br><b>Si la base n\'est pas orthogonale, cette formule est fausse.</b>',
      lines: L([['W = Span{(1 ; 1 ; 1 ; 0), (1 ; −1 ; 0 ; 1)}, y = (3 ; 1 ; 2 ; 4)', ''], [M('2·(1;1;1;0) + 2·(1;-1;0;1)'), 'Coefficients 6/3 et 6/3'], [M('(4 ; 0 ; 2 ; 2)'), 'ŷ', false]]),
    },
  }),
  S('l-orth-matrices', {
    prereqs: ['l-orth-dot', 'l-mat-inverse'], icon: 'UᵀU=I', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Familles orthonormées et matrices orthogonales',
    desc: 'Colonnes orthonormées ; U⁻¹ = Uᵀ.',
    prereqWhy: { 'l-orth-dot': 'produits scalaires des colonnes', 'l-mat-inverse': 'U⁻¹ = Uᵀ' },
    intro: {
      rule: 'U (n × n) est orthogonale si ses colonnes sont orthonormées : UᵀU = I. Alors U⁻¹ = Uᵀ, ‖Ux‖ = ‖x‖, det U = ±1.<br><b>Des colonnes orthogonales mais non normées ne suffisent pas.</b>',
      lines: L([[M('(1/3)·[[1,2,2],[2,1,-2],[2,-2,1]]'), 'UᵀU = I, det U = −1']]),
    },
  }),
  S('l-orth-gs', {
    prereqs: ['l-orth-proj'], icon: 'GS', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Gram-Schmidt',
    desc: 'Retirer à xⱼ ses projections sur les vᵢ déjà obtenus.',
    prereqWhy: { 'l-orth-proj': 'projeter sur les vᵢ déjà orthogonaux' },
    intro: {
      rule: 'v₁ = x₁ ; v₂ = x₂ − (x₂ · v₁ / v₁ · v₁)v₁ ; v₃ = x₃ − (x₃ · v₁ / v₁ · v₁)v₁ − (x₃ · v₂ / v₂ · v₂)v₂. On projette sur les <b>vᵢ déjà obtenus</b>, pas sur les xᵢ.',
      lines: L([['x₂ = (4 ; 1 ; 1 ; 1), v₁ = (1 ; 1 ; 0 ; 1)', 'x₂ · v₁ / v₁ · v₁ = 6/3 = 2'], [M('(4;1;1;1) - 2·(1;1;0;1)'), 'v₂'], [M('(2 ; -1 ; 1 ; -1)'), '', false]]),
    },
  }),
  S('l-orth-qr', {
    prereqs: ['l-orth-gs', 'l-orth-matrices'], icon: 'QR', examWeight: 1, exam: ['coef', 'mcq', 'tf'],
    title: 'Factorisation QR',
    desc: 'Q : Gram-Schmidt normalisé ; R = QᵀA.',
    prereqWhy: { 'l-orth-gs': 'les colonnes de Q', 'l-orth-matrices': 'Q a des colonnes orthonormées' },
    intro: {
      rule: 'Si les colonnes de A sont libres, A = QR : Q a des colonnes orthonormées (Gram-Schmidt normalisé), R est triangulaire supérieure à diagonale positive. R = QᵀA : rᵢⱼ = qᵢ · xⱼ, et rᵢᵢ = ‖vᵢ‖.',
      lines: L([['v₃ = (1 ; 1 ; −1 ; −1)', ''], ['r₃₃ = ‖v₃‖ = 2', '']]),
    },
  }),
  S('l-orth-lsq', {
    prereqs: ['l-orth-proj', 'l-mat-inverse'], icon: 'x̂', examWeight: 3, exam: ['coef', 'mcq', 'tf'],
    title: 'Moindres carrés',
    desc: 'AᵀAx̂ = Aᵀb.',
    prereqWhy: { 'l-orth-proj': 'Ax̂ est la projection de b sur Col A', 'l-mat-inverse': 'x̂ = (AᵀA)⁻¹Aᵀb pour les petits cas' },
    intro: {
      rule: 'Si Ax = b n\'a pas de solution, x̂ minimise ‖b − Ax‖ : c\'est une solution des <b>équations normales</b> AᵀAx = Aᵀb.<br>Droite y = β₀ + β₁x : A a une colonne de 1 et une colonne des x.',
      lines: L([['Points (0 ; 2), (1 ; 1), (2 ; 2), (3 ; 5)', ''], [M('[[4,6|10],[6,14|20]]'), '[AᵀA | Aᵀb]'], ['x̂ = (1 ; 1) : y = 1 + x', '']]),
    },
  }),
  S('l-orth-inner', {
    prereqs: ['l-orth-proj', 'l-vs-coords'], icon: '⟨p,q⟩', tags: ['MT'], examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Produits scalaires non standards',
    desc: 'Symétrique, bilinéaire, défini positif.',
    prereqWhy: { 'l-orth-proj': 'mêmes formules de projection', 'l-vs-coords': 'produit scalaire sur Pₙ calculé sur les coefficients' },
    intro: {
      rule: 'Un produit scalaire est symétrique, linéaire en chaque argument, et défini positif (⟨u, u⟩ &gt; 0 si u ≠ 0). Exemples : ⟨p, q⟩ = p(−1)q(−1) + p(0)q(0) + p(1)q(1) sur P₂ ; ⟨A, B⟩ = tr(AᵀB).',
      lines: L([['⟨1 + t, t²⟩ = 0·1 + 1·0 + 2·1 = 2', '']]),
    },
  }),
  // ---------- Symétriques, formes quadratiques, SVD (Lay 7.1, 7.2, 7.4) ----------
  S('l-sym-orthodiag', {
    prereqs: ['l-eig-diag', 'l-orth-gs', 'l-orth-matrices'], icon: 'QDQᵀ', examWeight: 3, exam: ['mcq', 'coef', 'tf', 'open'],
    title: 'Diagonalisation orthogonale A = QDQᵀ',
    desc: 'Symétrique ⇔ orthodiagonalisable.',
    prereqWhy: { 'l-eig-diag': 'même calcul de P et D, puis normalisation', 'l-orth-gs': 'Gram-Schmidt dans un espace propre de dimension 2', 'l-orth-matrices': 'Q orthogonale' },
    intro: {
      rule: 'A est diagonalisable en base orthonormée si et seulement si A est symétrique. Les espaces propres sont orthogonaux entre eux ; dans un espace propre de dimension ≥ 2, on applique Gram-Schmidt ; puis on normalise.',
      lines: L([[M('[[11,-12],[-12,4]]'), 'λ = −5 et 20'], [M('Q = (1/5)·[[3,4],[4,-3]] ; D = diag(-5,20)'), '']]),
    },
  }),
  S('l-sym-quadform', {
    prereqs: ['l-sym-orthodiag'], icon: 'xᵀAx', tags: ['MT'], examWeight: 0, exam: ['mcq', 'tf'],
    title: 'Formes quadratiques et axes principaux',
    desc: 'La moitié du terme croisé hors diagonale.',
    prereqWhy: { 'l-sym-orthodiag': 'x = Py avec P orthogonale' },
    intro: {
      rule: 'Q(x) = xᵀAx, A symétrique : le coefficient de x² va en a₁₁, et <b>la moitié</b> du coefficient de xy va en a₁₂ et en a₂₁. Avec (x ; y) = P·(X ; Y), P orthogonale formée de vecteurs propres, Q = λ₁X² + λ₂Y² : les colonnes de P sont les axes principaux.',
      lines: L([['Q = 5x² − 4xy + 8y²', ''], [M('[[5,-2],[-2,8]]'), 'λ = 4 et 9 : Q = 4X² + 9Y², définie positive']]),
    },
  }),
  S('l-svd-compute', {
    prereqs: ['l-sym-orthodiag', 'l-vs-rank'], icon: 'UΣVᵀ', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Décomposition en valeurs singulières à la main',
    desc: 'V de AᵀA ; σᵢ = √λᵢ ; uᵢ = Avᵢ/σᵢ.',
    prereqWhy: { 'l-sym-orthodiag': 'vecteurs propres orthonormés de AᵀA', 'l-vs-rank': 'nombre de σᵢ non nuls = rang' },
    intro: {
      rule: 'A = UΣVᵀ. Les vᵢ sont des vecteurs propres orthonormés de AᵀA ; σᵢ = √λᵢ (décroissants) ; pour σᵢ ≠ 0, <b>uᵢ = Avᵢ/σᵢ</b> ; on complète U et V en bases orthonormées.',
      lines: L([[M('[[4,5,2],[0,3,6]]'), 'AAᵀ a les valeurs propres 72 et 18'], ['σ₁ = 6√2, σ₂ = 3√2', '']]),
    },
  }),
  S('l-svd-sphere', {
    prereqs: ['l-svd-compute', 'l-sym-quadform'], icon: '◯→⬭', tags: ['MT'], examWeight: 0, exam: ['mcq', 'open'],
    title: 'Image de la sphère unité',
    desc: 'Une ellipse d\'axes uᵢ et de demi-axes σᵢ.',
    prereqWhy: { 'l-svd-compute': 'la SVD de A', 'l-sym-quadform': 'l\'image est l\'ellipse xᵀ(AAᵀ)⁻¹x = 1 et ses axes principaux' },
    intro: {
      rule: 'L\'image de la sphère unité par A est un ellipsoïde d\'axes les uᵢ et de demi-axes les σᵢ. Si le rang est plus petit que la dimension de départ, l\'image est <b>pleine</b>.',
      lines: L([['A 2 × 3 de rang 2, σ = 6√2 et 3√2', ''], ['Ellipse pleine, demi-axes 6√2 selon (1 ; 1) et 3√2 selon (1 ; −1)', '']]),
    },
  }),
  // ---------- Preuves courtes ----------
  S('l-proof-matrices', {
    prereqs: ['l-mat-imt', 'l-det-props', 'g9-proof-contra'], icon: '∎', examWeight: 0, exam: ['open'],
    title: 'Preuves courtes : inverses, noyaux, matrice canonique',
    desc: 'Des égalités justifiées, des hypothèses au but.',
    prereqWhy: { 'l-mat-imt': 'énoncés équivalents de l\'inversibilité', 'l-det-props': 'det(AB) = det A·det B dans les preuves', 'g9-proof-contra': 'preuve directe ou par contraposée' },
    intro: {
      rule: 'Une preuve courte enchaîne des égalités justifiées par une définition ou une règle déjà vue. On écrit d\'abord ce qu\'on suppose et ce qu\'on veut montrer.',
      lines: L([['(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I', 'Associativité, puis définition de l\'inverse'], ['Donc (AB)⁻¹ = B⁻¹A⁻¹', '']]),
    },
  }),
  S('l-proof-spectral', {
    prereqs: ['l-sym-orthodiag', 'l-proof-matrices'], icon: '∎ᵀ', examWeight: 0, exam: ['open'],
    title: 'Preuves courtes : symétriques, orthogonales, projecteurs',
    desc: 'Faire passer A d\'un côté à l\'autre du produit scalaire.',
    prereqWhy: { 'l-sym-orthodiag': 'théorème spectral cité dans la preuve', 'l-proof-matrices': 'même rédaction en blocs' },
    intro: {
      rule: 'On part du produit scalaire et on fait passer A de l\'autre côté : Av · w = (Av)ᵀw = vᵀAᵀw. Si A est symétrique, = vᵀAw = v · Aw.',
      lines: L([['λ(v · w) = Av · w = v · Aw = μ(v · w)', ''], ['(λ − μ)(v · w) = 0', 'Donc v ⊥ w si λ ≠ μ']]),
    },
  }),
];
