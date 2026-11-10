// Module A2, part a (unit `analyse2`, step U6): ℝⁿ (open, closed, compact,
// boundary, sequences), curves of ℝ³ and arc length, continuous functions
// on a compact. Catalogue: docs/universite/A2-analyse-2.md. Generators:
// analyse2-a.js.

import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

const M = (text, vars = ['x', 'y', 'z', 't', 'k', 'n', 'a', 's']) => toMathML(parse(text, { vars }));
const L = (pairs) => pairs.map(([html, note, eq]) => ({ html, note, noEq: !eq }));

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-rn-topology", {
    prereqs: ["g10-circle-eq"], icon: '⊂ℝⁿ', examWeight: 3, exam: ["mcq", "tf"],
    title: "Ouvert, fermé, borné, compact",
    desc: 'Inégalités larges ou strictes, coordonnée libre : ouvert, fermé, borné, compact.',
    prereqWhy: {"g10-circle-eq": "disques et boules (x − a)² + (y − b)² < r²"},
    intro: {
      rule: "Un ensemble défini par des inégalités <b>larges</b> entre fonctions continues est fermé. Avec des inégalités <b>strictes</b>, il est ouvert. Avec un mélange, il n'est en général ni l'un ni l'autre. On vérifie d'abord si une inégalité est toujours vraie : elle ne compte alors pas. Borné : contenu dans une boule. Compact : fermé <b>et</b> borné. Les normes ‖·‖₁, ‖·‖₂ et ‖·‖∞ donnent les mêmes ouverts.",
      lines: L([
        [`E = {(x, y, z) : ${M('x^2+y^2 ≤ 4')}, ${M('z > 0')}}`, '≤ seul donnerait un fermé ; z > 0 rend le bord z = 0 absent'],
        ['(1, 0, 0) ∈ ∂E, mais (1, 0, 0) ∉ E', 'Donc E n\'est pas fermé'],
        ['(2, 0, 1) ∈ E ∩ ∂E', 'Donc E n\'est pas ouvert'],
        ['(0, 0, z) ∈ E pour tout z > 0', 'z est libre vers +∞ : E n\'est pas borné, donc pas compact'],
      ]),
    },
  }),
  S("a2-rn-boundary", {
    prereqs: ["a2-rn-topology"], icon: '∂E', examWeight: 2, exam: ["mcq", "tf"],
    title: "Intérieur, adhérence, bord",
    desc: 'Le bord : chaque boule touche E et son complémentaire. Point isolé, réunion, inclusion.',
    prereqWhy: {"a2-rn-topology": "ouverts, fermés et boules"},
    intro: {
      rule: "x est dans le bord ∂E si chaque boule autour de x touche E <b>et</b> le complémentaire de E. Intérieur : E sans son bord. Adhérence : E avec son bord. Un point isolé de E est dans le bord. Les phrases « ∂(A ∪ B) = ∂A ∪ ∂B » et « E ⊂ F ⇒ ∂E ⊂ ∂F » sont fausses.",
      lines: L([
        [`E = {${M('1 < x^2+y^2 ≤ 4')}} ∪ {(3, 0)}`, 'Un anneau et un point isolé'],
        [`∂E = {${M('x^2+y^2 = 1')}} ∪ {${M('x^2+y^2 = 4')}} ∪ {(3, 0)}`, 'Le point isolé est dans le bord'],
        [`int E = {${M('1 < x^2+y^2 < 4')}}`, 'E sans son bord'],
        [`adh E = {${M('1 ≤ x^2+y^2 ≤ 4')}} ∪ {(3, 0)}`, 'E avec son bord'],
      ]),
    },
  }),
  S("a2-rn-sequences", {
    prereqs: ["a1-seq-limsup", "g3-identities"], icon: 'aₚₖ₊q', examWeight: 1, exam: ["mcq", "tf"],
    title: "Suites et sous-suites dans ℝⁿ",
    desc: 'Composante par composante : une sous-suite a_{pk+q} se simplifie avec la période.',
    prereqWhy: {"a1-seq-limsup": "sous-suites et Bolzano-Weierstrass à une variable"},
    intro: {
      rule: "Une suite de ℝⁿ converge si et seulement si <b>chaque composante</b> converge. Une suite bornée a une sous-suite convergente (Bolzano-Weierstrass). Pour une sous-suite a_{pk+q}, on remplace n par pk + q dans chaque composante et on simplifie avec la période.",
      lines: L([
        [`a<sub>n</sub> = (${M('(-1)^n')} ; ${M('cos(nπ/3)')})`, 'Deux composantes, de périodes 2 et 6'],
        [`a<sub>3k</sub> = (${M('(-1)^(3k)')} ; ${M('cos(3kπ/3)')}) = (${M('(-1)^k')} ; ${M('(-1)^k')})`, 'Remplacer n par 3k ; cos(kπ) = (−1)ᵏ : diverge'],
        [`${M('(-1)^k×a_(3k)')} = (1 ; 1)`, 'Converge vers (1, 1)'],
      ]),
    },
  }),
  S("a2-curve-param", {
    prereqs: ["a1-param-curve", "g4-line3"], icon: 'γ′(t)', examWeight: 1, exam: ["mcq", "tf"],
    title: "Courbes paramétrées dans ℝ³ : continuité, tangente, courbe lisse",
    desc: 'Dériver composante par composante ; tangente γ(t₀) + s·γ′(t₀) ; sign(t)·g(t) continue si g(0) = 0.',
    prereqWhy: {"a1-param-curve": "courbes planes paramétrées et leur tangente", "g4-line3": "la tangente γ(t₀) + s·γ′(t₀) est une droite paramétrique"},
    intro: {
      rule: "γ : I → ℝⁿ est continue (dérivable) si chaque composante l'est. γ′(t) est tangent à la courbe ; la courbe est lisse si γ′(t) ≠ 0. Tangente en t₀ : γ(t₀) + s·γ′(t₀). Un facteur discontinu ne rend pas forcément la composante discontinue : sign(t)·(eᵗ − 1) est continue.",
      lines: L([
        [`γ(t) = (${M('t cos(t)')} ; ${M('t sin(t)')} ; t)`, 'Une spirale sur un cône'],
        [`γ′(t) = (${M('cos(t)-t sin(t)')} ; ${M('sin(t)+t cos(t)')} ; 1)`, 'Dériver chaque composante (règle du produit)'],
        [`‖γ′(t)‖² = ${M('t^2+2')} ≠ 0`, 'La courbe est lisse'],
        ['Tangente en t = π : (−π ; 0 ; π) + s·(−1 ; −π ; 1)', 'γ(π) + s·γ′(π)'],
      ]),
    },
  }),
  S("a2-curve-length", {
    prereqs: ["a2-curve-param", "a1-int-applications"], icon: '∫‖γ′‖', examWeight: 1, exam: ["mcq", "tf"],
    title: "Longueur d'arc",
    desc: 'L = ∫ ‖γ′(t)‖ dt : chercher le carré parfait sous la racine.',
    prereqWhy: {"a1-int-applications": "longueur d'arc d'une courbe plane", "a2-curve-param": "dériver γ composante par composante"},
    intro: {
      rule: "L = ∫ₐᵇ ‖γ′(t)‖ dt. Le calcul n'est possible que si ‖γ′‖² est un carré parfait ou une constante : on cherche ce carré.",
      lines: [
        { html: `γ(t) = (2t ; ${M('t^2')} ; ${M('ln(t)')}), t ∈ [1 ; e]`, note: 'La courbe', noEq: true },
        { html: 'γ′(t) = (2 ; 2t ; 1/t)', note: 'Dériver chaque composante', noEq: true },
        { html: `‖γ′(t)‖² = ${M('4+4t^2+1/t^2')} = ${M('(2t+1/t)^2')}`, note: 'Un carré parfait', noEq: true },
        { cas: 'int(2t+1/t,t,1,e)', note: 'L = ∫ ‖γ′(t)‖ dt' },
        { cas: 'bracket(t^2+ln(t),t,1,e)', note: 'Une primitive' },
        { cas: 'e^2', note: 'Les bornes' },
      ],
    },
  }),
  S("a2-compact-extreme", {
    prereqs: ["a2-rn-topology", "a2-continuity", "g9-counterexample"], icon: 'max', examWeight: 3, exam: ["tf"],
    title: "Fonctions continues sur un compact (vrai/faux)",
    desc: 'Bornes atteintes sur un fermé borné ; un contre-exemple quand une hypothèse manque.',
    prereqWhy: {"a2-rn-topology": "reconnaître un compact", "a2-continuity": "vérifier la continuité de f", "g9-counterexample": "réfuter un énoncé par un contre-exemple (une fonction)"},
    intro: {
      rule: "Une fonction continue sur un compact non vide est bornée et <b>atteint</b> son minimum et son maximum. Si en plus le compact est connexe par arcs, l'image est l'intervalle [m ; M]. Rien de cela ne vaut sur un ouvert ou un ensemble non borné. L'image d'un ouvert par une fonction continue n'est pas forcément ouverte.",
      lines: L([
        [`f(x, y) = ${M('1/(x^2+y^2)')} sur {${M('0 < x^2+y^2 ≤ 1')}}`, 'Continue et non bornée : l\'ensemble n\'est pas fermé'],
        [`f(x, y) = ${M('cos(cos(x-y^2))')} sur {${M('x^2+y^2 ≤ 4')}}`, 'Continue sur un compact : elle atteint son maximum'],
        ['f = 0 sur ℝ² : f(ℝ²) = {0}', 'L\'image de l\'ouvert ℝ² n\'est pas ouverte'],
      ]),
    },
  }),
];
