// Module G8, part a (unit `complexes`, step U4): algebraic and polar forms, Moivre, roots, quadratics.
// Catalogue: docs/universite/G-gymnase-2.md. Skills: g8-algebraic, g8-polar, g8-moivre, g8-nth-roots, g8-sqrt-alg, g8-quadratic.
//
// Sources (catalogue): MAN Math 1A, examen 2017 (Q6, équation du 2e degré
// à coefficients complexes : l'exemple E6) ; CMS Analyse II, séries 14 et
// 15 (forme algébrique, iⁿ, module et argument, Moivre, racines n-ièmes).
// Year 12 and 12.5; needsSolo is true for both (catalogue convention of
// G-gymnase-2: every G skill ends with a problem done alone).
// Prerequisites of the algebra plan: @alg:C-identites = lit-identities,
// @alg:E-systemes-2x2 = eq-systems, @alg:H-discriminant = quad-formula;
// @alg:M-pythagore (repair of g8_modulus_no_square) = geo-pythagore.
// Items: complexes-a.js (algebraic, polar, Moivre) and complexes-a-roots.js
// (roots, square roots, quadratics); traps: js/cas/rules/g8a.js.

const S = (id, year, rest) => ({ id, unit: 'complexes', year, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('g8-algebraic', 12, {
    prereqs: ['lit-identities'], icon: 'a+bi', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Forme algébrique : opérations, conjugué, module, division',
    desc: 'Calculer avec i² = −1, diviser par le conjugué, |a + bi| = √(a² + b²).',
    prereqWhy: { 'lit-identities': 'développer (a + bi)² et (a + bi)(a − bi)' },
    intro: {
      rule: 'On calcule comme avec des polynômes en i, puis i² = −1. Puissances de i : cycle de 4 (i, −1, −i, 1).<br>Conjugué de a + bi : a − bi. |a + bi| = √(a² + b²), et z·z̄ = |z|².<br>Pour diviser, on multiplie en haut et en bas par le conjugué du dénominateur.',
      lines: [
        { cas: '(4+7i)/(2+i)', note: 'Une division', noEq: true },
        { cas: '((4+7i)(2-i))/((2+i)(2-i))', note: 'Conjugué du dénominateur' },
        { cas: '(8-4i+14i+7)/5', note: 'Développer, i² = −1' },
        { cas: '3+2i', note: 'Simplifier' },
      ],
    },
  }),
  S('g8-polar', 12, {
    prereqs: ['g8-algebraic', 'g3-exact'], icon: 're^iθ', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Forme polaire et exponentielle',
    desc: 'r = |z|, θ par cos θ = a/r et sin θ = b/r ; e^(iθ)·e^(iφ) = e^(i(θ + φ)).',
    prereqWhy: { 'g8-algebraic': 'module r = |z| et parties a, b' },
    intro: {
      rule: 'z = r·e^(iθ) = r(cos θ + i sin θ), avec r = |z|. On trouve θ avec cos θ = a/r <b>et</b> sin θ = b/r (les deux, pour le bon quadrant) : arctan(b/a) ne suffit pas quand a < 0.<br>e^(iθ)·e^(iφ) = e^(i(θ + φ)). On écrit l\'exposant 2iπ/3 (et pas i2π/3).',
      lines: [
        { html: 'z = −1 + i√3 : r = √(1 + 3) = 2', note: 'Module', noEq: true },
        { html: 'cos θ = −1/2, sin θ = √3/2', note: 'cos et sin', noEq: true },
        { html: '2e quadrant : θ = 2π/3', note: 'Quadrant, angle', noEq: true },
        { html: 'z = 2e^(2iπ/3)', note: 'Forme exponentielle', noEq: true },
      ],
    },
  }),
  S('g8-moivre', 12, {
    prereqs: ['g8-polar'], icon: 'zⁿ', examWeight: 1, exam: ['mcq', 'tf', 'coef'],
    title: 'Puissances par la formule de Moivre',
    desc: '(r·e^(iθ))ⁿ = rⁿ·e^(inθ), puis réduire l\'argument.',
    intro: {
      rule: '(r·e^(iθ))ⁿ = rⁿ·e^(inθ). On met z sous forme exponentielle, on élève <b>le module et l\'argument</b>, puis on ramène l\'argument dans ]−π ; π] et on revient à la forme algébrique.',
      lines: [
        { cas: '(-1+i)^10', note: 'Départ', noEq: true },
        { cas: '(√2e^(3iπ/4))^10', note: 'Forme exponentielle' },
        { cas: '32e^(15iπ/2)', note: '(√2)¹⁰ = 32, 10·3π/4 = 15π/2' },
        { cas: '32e^(-iπ/2)', note: '15π/2 − 8π = −π/2' },
        { cas: '-32i', note: 'Forme algébrique' },
      ],
    },
  }),
  S('g8-nth-roots', 12.5, {
    prereqs: ['g8-moivre'], icon: 'ⁿ√w', examWeight: 1, exam: ['mcq', 'tf', 'open'],
    title: 'Racines n-ièmes',
    desc: 'zⁿ = w : n racines de module ρ^(1/n), d\'arguments φ/n + 2kπ/n.',
    prereqWhy: { 'g8-moivre': 'zⁿ en forme exponentielle par Moivre' },
    intro: {
      rule: 'zⁿ = w avec w = ρ·e^(iφ) : |z| = ρ^(1/n) et nθ = φ + 2kπ, donc θ = φ/n + 2kπ/n, pour k = 0, …, n − 1. Il y a <b>n</b> racines, aux sommets d\'un polygone régulier centré en 0.',
      lines: [
        { html: 'z³ = −8i, avec −8i = 8e^(−iπ/2)', note: 'Forme exponentielle de w', noEq: true },
        { html: '|z| = ∛8 = 2 ; 3θ = −π/2 + 2kπ, donc θ = −π/6 + 2kπ/3', note: 'Module et arguments', noEq: true },
        { html: 'z₀ = 2e^(−iπ/6) = √3 − i, z₁ = 2e^(iπ/2) = 2i, z₂ = 2e^(7iπ/6) = −√3 − i', note: 'k = 0, 1, 2', noEq: true },
        { html: 'Contrôle : (2i)³ = 8i³ = −8i', note: 'Contrôle', noEq: true },
      ],
    },
  }),
  S('g8-sqrt-alg', 12.5, {
    prereqs: ['g8-algebraic', 'eq-systems'], icon: '±(x+iy)', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Racine carrée sous forme algébrique',
    desc: 'z = x + iy avec z² = w : x² − y² = a, 2xy = b, x² + y² = |w|.',
    prereqWhy: { 'g8-algebraic': 'développer (x + iy)² et calculer un module' },
    intro: {
      rule: 'On cherche z = x + iy avec z² = a + bi. Trois équations : x² − y² = a, 2xy = b, et x² + y² = |a + bi|. Elles donnent x² et y². Le signe de xy est celui de b : il reste <b>deux</b> racines opposées.<br>On n\'écrit pas √(a + bi) : le symbole √ est réservé aux réels positifs.',
      lines: [
        { html: '(x + iy)² = −5 + 12i ⇔ x² − y² = −5 et 2xy = 12', note: 'Parties réelle et imaginaire', noEq: true },
        { html: 'x² + y² = |−5 + 12i| = 13', note: 'Module', noEq: true },
        { html: 'x² = 4, y² = 9', note: 'Résoudre', noEq: true },
        { html: 'xy = 6 > 0 : z = ±(2 + 3i)', note: 'Signes', noEq: true },
      ],
    },
  }),
  S('g8-quadratic', 12.5, {
    prereqs: ['g8-sqrt-alg', 'quad-formula'], icon: 'az²+bz+c', examWeight: 2, exam: ['mcq', 'coef', 'open'],
    title: 'Équation du 2e degré à coefficients complexes',
    desc: 'Δ = b² − 4ac, δ avec δ² = Δ, puis z = (−b ± δ)/(2a).',
    intro: {
      rule: 'Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ est <b>une</b> racine carrée de Δ, trouvée avec δ = x + iy. Contrôle : z₁ + z₂ = −b/a et z₁z₂ = c/a.',
      lines: [
        { html: 'z² − (3 + i)z + 4 + 3i = 0 : Δ = (3 + i)² − 4(4 + 3i) = 8 + 6i − 16 − 12i = −8 − 6i', note: 'Discriminant', noEq: true },
        { html: 'δ² = −8 − 6i : x² − y² = −8, 2xy = −6, x² + y² = 10, δ = 1 − 3i', note: 'Racine carrée de Δ', noEq: true },
        { html: 'z = ((3 + i) ± (1 − 3i))/2', note: 'Formule', noEq: true },
        { html: 'z₁ = 2 − i, z₂ = 1 + 2i', note: 'Simplifier', noEq: true },
        { html: 'z₁ + z₂ = 3 + i ; z₁z₂ = 4 + 3i', note: 'Contrôle par Viète', noEq: true },
      ],
    },
  }),
];
