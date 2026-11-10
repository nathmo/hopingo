// Module M, part b (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).
// Intro lines in the matrix language of js/cas/matexpr.js (M) or in the CAS
// (C), shown as MathML.

import { parseMatLine, evalAst, lineML } from '../../cas/matexpr.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

function M(text, vars = ['x', 'y']) {
  try {
    const line = parseMatLine(text, { vars });
    const env = {};
    for (const a of line.assigns) { a.value = evalAst(a.ast, env, { vars }); env[a.name] = a.value; }
    if (line.body) line.value = evalAst(line.body, env, { vars });
    return lineML(line);
  } catch { return text; }
}
const C = (text, vars = ['x', 'y']) => toMathML(parse(text, { vars }));
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-cholesky", {
    prereqs: ["m-posdef", "l-mat-lu"], icon: "LLᵀ", examWeight: 2, exam: ["coef", "mcq", "tf", "open"],
    title: "Factorisation de Cholesky pas à pas",
    desc: "Colonne par colonne : une racine sur la diagonale, une division dessous.",
    prereqWhy: {"m-posdef": "Cholesky n'existe que si A est définie positive"},
    intro: {
      rule: 'Si A est symétrique définie positive, il existe une seule L triangulaire inférieure, à diagonale &gt; 0, telle que A = LLᵀ. On la remplit <b>colonne par colonne</b> : sur la diagonale, ℓₖₖ = √(aₖₖ − Σ ℓₖⱼ²) ; dessous, ℓᵢₖ = (aᵢₖ − Σ ℓᵢⱼℓₖⱼ)/ℓₖₖ.<br>Une racine d\'un nombre ≤ 0 : A n\'est pas définie positive. Ensuite, Ax = b se résout par Ly = b puis Lᵀx = y.',
      lines: L([
        [M('[[4,2,-2],[2,10,5],[-2,5,6]]'), 'A'],
        ['ℓ₁₁ = √4 = 2 ; ℓ₂₁ = 2/2 = 1 ; ℓ₃₁ = −2/2 = −1', 'Première colonne'],
        ['ℓ₂₂ = √(10 − 1²) = 3 ; ℓ₃₂ = (5 − (−1)·1)/3 = 2', 'Deuxième colonne'],
        ['ℓ₃₃ = √(6 − (−1)² − 2²) = 1', 'Dernière case'],
        [M('L = [[2,0,0],[1,3,0],[-1,2,1]]'), 'Contrôle : LLᵀ = A'],
      ]),
    },
  }),
  S("m-quad-gradient", {
    prereqs: ["m-posdef", "a2-partials", "a2-hessian-2x2"], icon: "∇(½xᵀAx)", examWeight: 1, exam: ["mcq", "tf"],
    title: "Gradient et hessienne d'une forme quadratique",
    desc: "∇f = Ax − b, Hess f = A ; le minimum résout Ax = b.",
    prereqWhy: {"a2-hessian-2x2": "nature du point stationnaire par la hessienne"},
    intro: {
      rule: 'Pour f(x) = ½xᵀAx − bᵀx + c avec A symétrique : <b>∇f = Ax − b</b> et Hess f = A. Le point stationnaire résout Ax = b ; si A est définie positive, c\'est un minimum global, et f(x*) = c − ½bᵀx*.<br>Si M n\'est pas symétrique : xᵀMx = xᵀ((M + Mᵀ)/2)x et ∇(xᵀMx) = (M + Mᵀ)x.',
      lines: L([
        [C('x^2+x y+2y^2-3x-5y'), 'f(x, y)'],
        [`A = ${M('[[2,1],[1,4]]')}, b = (3 ; 5)`, 'Diagonale : 2 × coefficient de x² et de y² ; hors diagonale : celui de xy'],
        [M('(2x+y-3 ; x+4y-5)'), '∇f = Ax − b'],
        ['x* = (1 ; 1), f(x*) = −½(3 + 5) = −4', 'Ax = b ; minimum : 2 &gt; 0, det A = 7 &gt; 0'],
      ]),
    },
  }),
  S("m-normal-eq", {
    prereqs: ["l-orth-lsq", "m-quad-gradient", "p-lin-combo"], icon: "XᵀXβ = Xᵀy", examWeight: 1, exam: ["mcq", "tf"],
    title: "Équations normales, matrice de design, Var(β̂)",
    desc: "Matrice de design, équations normales, Var(β̂) = σ²(XᵀX)⁻¹.",
    prereqWhy: {"m-quad-gradient": "annuler le gradient de ‖y − Xβ‖²", "p-lin-combo": "Var(Mε) = M·Var(ε)·Mᵀ"},
    intro: {
      rule: 'Modèle y = Xβ + ε. La matrice de design X a <b>une ligne par observation</b> : une colonne de 1 (ordonnée à l\'origine), puis xᵢ (et xᵢ² pour une parabole). β̂ annule le gradient de ‖y − Xβ‖² : XᵀXβ̂ = Xᵀy.<br>Si les εᵢ sont indépendants de variance σ² : Var(β̂) = σ²(XᵀX)⁻¹, avec σ² estimée par RSS/(n − p).',
      lines: L([
        ['x = (−2, −1, 0, 1, 2), y = (1, 1, 2, 4, 2), y = β₀ + β₁x', 'Les données'],
        [M('X = [[1,-2],[1,-1],[1,0],[1,1],[1,2]]'), 'Matrice de design'],
        [`XᵀX = ${M('[[5,0],[0,10]]')}, Xᵀy = (10 ; 5)`, 'Les x sont centrés : XᵀX est diagonale'],
        ['β̂ = (2 ; 1/2)', 'Chaque coefficient séparément'],
        ['RSS = 7/2, σ̂² = (7/2)/3 = 7/6, Var̂(β̂₁) = (7/6)/10 = 7/60', 'σ̂²·((XᵀX)⁻¹)₂₂'],
      ]),
    },
  }),
  S("m-rayleigh", {
    prereqs: ["m-spectral"], icon: "xᵀAx/xᵀx", examWeight: 1, exam: ["mcq", "tf"],
    title: "Quotient de Rayleigh",
    desc: "R(x) entre λ_min et λ_max ; égalité aux vecteurs propres.",
    prereqWhy: {"m-spectral": "décomposer x sur les vecteurs propres"},
    intro: {
      rule: 'Pour A symétrique, R(x) = xᵀAx / xᵀx vérifie <b>λ_min ≤ R(x) ≤ λ_max</b>, avec égalité aux vecteurs propres : le maximum de xᵀAx sur la sphère unité est λ_max.<br>Si x est à ε d\'un vecteur propre, R(x) est à ε² de sa valeur propre : c\'est une très bonne estimation.',
      lines: L([
        [`A = ${M('[[3,1],[1,3]]')}, x = (2 ; 1)`, 'A et x'],
        ['Ax = (7 ; 5)', 'Le produit'],
        ['xᵀAx = 14 + 5 = 19, xᵀx = 5, R(x) = 19/5', 'Le quotient'],
        ['λ = 2 et 4 : 2 ≤ 19/5 ≤ 4', 'Encadrer'],
      ]),
    },
  }),
];
