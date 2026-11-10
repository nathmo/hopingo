// Module G4, géométrie analytique (unit `geoan`), part a: vectors, lines of
// the plane, dot product, bisectors, lines of space, planes, relative
// positions. Catalogue: docs/universite/G-gymnase-2.md, section G4. Built at
// step U5. Generators: geoan-a.js.

import { readWith, showWith } from '../../judges/index.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

// A line as its judge shows it (intro examples).
const J = (cfg, text) => { try { return showWith(cfg, readWith(cfg, text)); } catch { return text; } };
const V = (text, symbols = {}) => J({ kind: 'vector', symbols, params: ['t', 's', 'k'] }, text);
const G2 = (text) => J({ kind: 'geom', object: 'line2' }, text);
const G3 = (text) => J({ kind: 'geom', object: 'line3' }, text);
const C = (text, vars = ['λ', 't', 's', 'd']) => toMathML(parse(text, { vars }));
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));
const PAR = { A: '(2 ; 1)', B: '(5 ; -3)', M: '(4 ; 2)' };
const TRI = { A: '(1 ; 2 ; 0)', B: '(2 ; 3 ; 0)', C: '(2 ; 2 ; 1)' };

const S = (id, rest) => ({ id, unit: 'geoan', year: 12, optional: false, needsSolo: true, tags: [], examWeight: 1, ...rest });

export const SKILLS = [
  S('g4-vectors', {
    prereqs: ['eq-systems'], icon: 'AB⃗', exam: ['mcq', 'tf', 'open'],
    title: 'Vecteurs : Chasles, combinaisons, colinéarité',
    desc: 'AB⃗ = B − A, milieu, parallélogramme, décomposer un vecteur.',
    prereqWhy: { 'eq-systems': 'décomposer w⃗ = αu⃗ + βv⃗ : un système 2 × 2' },
    intro: {
      rule: 'AB⃗ = B − A : l’arrivée moins le départ. Chasles : AB⃗ + BC⃗ = AC⃗. Le milieu de [AB] est (A + B)/2.<br>Deux vecteurs du plan sont colinéaires si et seulement si u₁v₂ − u₂v₁ = 0.',
      lines: L([
        [V('C = 2M - A', PAR), 'ABCD parallélogramme de centre M(4 ; 2), A(2 ; 1) : M est le milieu de [AC]'],
        [V('C = (8 - 2 ; 4 - 1) = (6 ; 3)', PAR), 'Coordonnée par coordonnée'],
        [V('D = 2M - B = (3 ; 7)', PAR), 'M est aussi le milieu de [BD]'],
      ]),
    },
  }),
  S('g4-line2', {
    prereqs: ['g4-vectors', 'fn-affine', 'eq-systems'], icon: 'ax+by', exam: ['mcq', 'tf', 'open'],
    title: 'Droite du plan : paramétrique, cartésienne, intersection',
    desc: 'A + t·v⃗, ax + by + c = 0, et le point commun de deux droites.',
    prereqWhy: { 'g4-vectors': 'A + t·v⃗ est une combinaison de vecteurs', 'fn-affine': 'pente et ordonnée à l\'origine de y = mx + p', 'eq-systems': 'le point d\'intersection résout un système' },
    intro: {
      rule: 'Par A, de direction v⃗ : (x ; y) = A + t·v⃗. On élimine t pour la cartésienne.<br>Dans ax + by + c = 0, (a ; b) est <b>normal</b> à la droite et (−b ; a) la dirige. Intersection : on remplace la paramétrique dans l’autre équation.',
      lines: L([
        [G2('(x ; y) = (1 ; -2) + t(3 ; 2)'), 'd par A(1 ; −2), de direction (3 ; 2)'],
        [G2('2x - 3y = 2·1 - 3·(-2)'), '2x et 3y : t disparaît'],
        [G2('2x - 3y - 8 = 0'), 'La cartésienne'],
        [C('(1+3t)+(-2+2t)-4=0'), 'Dans g : x + y − 4 = 0, donc t = 1 et I = (4 ; 0)'],
      ]),
    },
  }),
  S('g4-dot', {
    prereqs: ['g4-vectors', 'geo-pythagore', 'g3-arc-def'], icon: 'u⃗·v⃗', exam: ['mcq', 'tf', 'coef'],
    title: 'Produit scalaire, angles, projection d\'un vecteur',
    desc: 'u⃗·v⃗ = ‖u⃗‖‖v⃗‖cos θ, angle de deux droites, projection.',
    prereqWhy: { 'g4-vectors': 'les composantes des vecteurs', 'geo-pythagore': 'la norme ‖u⃗‖ = √(u₁² + u₂² + u₃²)', 'g3-arc-def': 'θ = arccos(…)' },
    intro: {
      rule: 'u⃗·v⃗ = u₁v₁ + u₂v₂ + u₃v₃ = ‖u⃗‖‖v⃗‖cos θ.<br>Projection de u⃗ sur v⃗ : (u⃗·v⃗ / ‖v⃗‖²)·v⃗. Angle de deux droites : on prend |cos θ|.',
      lines: L([
        [V('AB·AC = 1·1 + 1·0 + 0·1 = 1', TRI), 'A(1 ; 2 ; 0), B(2 ; 3 ; 0), C(2 ; 2 ; 1)'],
        [V('‖AB‖·‖AC‖ = √2·√2 = 2', TRI), 'Les normes'],
        [V('cos θ = 1/2', TRI), 'cos θ = AB⃗·AC⃗ / (‖AB⃗‖‖AC⃗‖)'],
        [V('θ = π/3'), 'L’angle en A'],
      ]),
    },
  }),
  S('g4-bisectors', {
    prereqs: ['g4-line2', 'g4-dot', 'g1-abs-eq'], icon: '∠', exam: ['mcq', 'tf', 'open'],
    title: 'Médiatrice et bissectrices',
    desc: 'Distance d\'un point à une droite, points à égale distance.',
    prereqWhy: { 'g4-line2': 'les équations cartésiennes ax + by + c = 0', 'g4-dot': 'la norme du vecteur normal ‖n⃗‖', 'g1-abs-eq': '|A| = |B| donne A = B ou A = −B' },
    intro: {
      rule: 'Distance d’un point à une droite : |ax₀ + by₀ + c| / √(a² + b²).<br>Les bissectrices de d₁ et d₂ sont les points à égale distance : |a₁x + b₁y + c₁|/‖n⃗₁‖ = |a₂x + b₂y + c₂|/‖n⃗₂‖, d’où deux droites (signe + et signe −).',
      lines: L([
        [G2('|3x - 4y + 1|/5 = |4x + 3y - 7|/5'), 'd₁ : 3x − 4y + 1 = 0, d₂ : 4x + 3y − 7 = 0 ; normes 5 et 5'],
        [G2('3x - 4y + 1 - (4x + 3y - 7) = 0 ou 3x - 4y + 1 + (4x + 3y - 7) = 0'), '|A| = |B| ⇔ A = B ou A = −B'],
        [G2('x + 7y - 8 = 0 ou 7x - y - 6 = 0'), 'Deux bissectrices, perpendiculaires'],
      ]),
    },
  }),
  S('g4-line3', {
    prereqs: ['g4-line2'], icon: 'd ⊂ ℝ³', exam: ['mcq', 'tf', 'open'],
    title: 'Droite de l\'espace : paramétrique et cartésienne',
    desc: 'A + t·v⃗, ou deux équations ; on élimine t.',
    prereqWhy: { 'g4-line2': 'même passage paramétrique ↔ cartésienne, avec une coordonnée de plus' },
    intro: {
      rule: '(x ; y ; z) = A + t·v⃗. Cartésienne : (x − x₀)/v₁ = (y − y₀)/v₂ = (z − z₀)/v₃, c’est-à-dire <b>deux</b> équations.<br>Si une composante de v⃗ est nulle, la coordonnée correspondante est constante.',
      lines: L([
        [G3('(x ; y ; z) = (1 ; -2 ; 3) + t(2 ; 1 ; -1)'), 'Par A(1 ; −2 ; 3), de direction (2 ; 1 ; −1)'],
        [G3('(x - 1)/2 = (y + 2)/1 = (z - 3)/(-1)'), 'Isoler t dans chaque coordonnée'],
        [G3('x - 2y - 5 = 0 ; y + z - 1 = 0'), 'Deux égalités : deux équations'],
      ]),
    },
  }),
  S('g4-plane', {
    prereqs: ['g4-vectors'], icon: 'π', exam: ['mcq', 'tf', 'open'],
    title: 'Plan : par trois points, paramétrique ↔ cartésienne',
    desc: 'Une normale orthogonale aux deux directions, puis la constante.',
    prereqWhy: { 'g4-vectors': 'deux vecteurs directeurs AB⃗ et AC⃗' },
    intro: {
      rule: 'Un plan : un point et deux directions non colinéaires, ou une normale n⃗ = (a ; b ; c) : ax + by + cz + d = 0.<br>Sans produit vectoriel, on trouve n⃗ en résolvant n⃗·u⃗ = 0 et n⃗·v⃗ = 0.',
      lines: L([
        ['AB⃗ = (2 ; 1 ; −1), AC⃗ = (−1 ; 2 ; 2)', 'A(1 ; 0 ; 2), B(3 ; 1 ; 1), C(0 ; 2 ; 4)'],
        [C('2a+b-c=0', ['a', 'b', 'c']), 'et −a + 2b + 2c = 0 : n⃗ = (4 ; −3 ; 5)'],
        [C('4·1-3·0+5·2+d=0'), 'd = −14'],
        [J({ kind: 'geom', object: 'plane' }, '4x - 3y + 5z - 14 = 0'), 'Le plan'],
      ]),
    },
  }),
  S('g4-relative-pos', {
    prereqs: ['g4-plane', 'g4-line3'], icon: '∦', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Positions relatives dans l\'espace',
    desc: 'Droite et plan, deux droites (sécantes, parallèles, gauches), deux plans.',
    prereqWhy: { 'g4-plane': 'l\'équation cartésienne du plan', 'g4-line3': 'la paramétrique de la droite, remplacée dans le plan' },
    intro: {
      rule: 'Droite et plan : on remplace la paramétrique dans le plan. 0·λ = 0 : contenue ; 0·λ = k ≠ 0 : parallèle ; une seule valeur : sécante.<br>Deux droites : directions colinéaires ou non ; sinon on résout A + s·u⃗ = B + t·v⃗ avec <b>deux</b> paramètres : une solution (sécantes) ou aucune (gauches).',
      lines: L([
        [C('(1+λ)+(2+3λ)+2(-2λ)-3=0'), 'd : (1 ; 2 ; 0) + λ(1 ; 3 ; −2), α : x + y + 2z − 3 = 0'],
        [C('0λ+0=0'), 'Réduire'],
        [C('λ∈ℝ'), 'Vrai pour tout λ : d ⊂ α'],
      ]),
    },
  }),
];
