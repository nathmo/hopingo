// Module M, part a (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).
// Intro lines are written in the line language of js/cas/matexpr.js (M)
// or in the CAS (C), and shown as MathML.

import { parseMatLine, evalAst, lineML } from '../../cas/matexpr.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

// A matrix line as MathML (names: matrices the line uses).
function M(text, names = {}) {
  try {
    const opts = { vars: ['λ', 'a', 't'] };
    const line = parseMatLine(text, opts);
    const env = {};
    for (const [k, v] of Object.entries(names)) env[k] = evalAst(parseMatLine(v, opts).body, env, opts);
    for (const a of line.assigns) { a.value = evalAst(a.ast, env, opts); env[a.name] = a.value; }
    if (line.body) line.value = evalAst(line.body, env, opts);
    return lineML(line);
  } catch { return text; }
}
const C = (text, vars = ['λ', 'a', 'x', 'y', 'z']) => toMathML(parse(text, { vars }));
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-blocks-schur", {
    prereqs: ["l-mat-blocks", "l-det-props"], icon: "A/A₁₁", examWeight: 1, exam: ["coef", "mcq", "tf"],
    title: "Blocs et complément de Schur",
    desc: "S, le bloc qui reste après l'élimination ; det A = det A₁₁ · det S.",
    prereqWhy: { "l-mat-blocks": "produit par blocs" },
    intro: {
      rule: 'Si A₁₁ est inversible, on élimine le bloc A₂₁ comme une ligne de Gauss : A = [[I, 0], [X, I]]·[[A₁₁, 0], [0, S]]·[[I, Y], [0, I]], avec X = A₂₁A₁₁⁻¹, Y = A₁₁⁻¹A₁₂ et le <b>complément de Schur S = A₂₂ − A₂₁A₁₁⁻¹A₁₂</b>.<br>Donc det A = det A₁₁ · det S, et A est inversible si et seulement si S l\'est. Pour un système KKT [[H, Cᵀ], [C, 0]], S = −CH⁻¹Cᵀ.',
      lines: L([
        [M('A = [[2,1,1],[1,1,0],[1,1,3]]'), 'A₁₁ = [[2, 1], [1, 1]], A₁₂ = (1 ; 0), A₂₁ = (1, 1), A₂₂ = 3'],
        [M('A_11^(-1) = [[1,-1],[-1,2]]'), 'Inverser le bloc'],
        [M('Y = (1 ; -1)'), 'Y = A₁₁⁻¹A₁₂ ; X = A₂₁A₁₁⁻¹ = (0, 1)'],
        [`S = 3 − (1, 1)·(1 ; −1) = 3`, 'Complément de Schur'],
        ['det A = det A₁₁ · S = 1 · 3 = 3', 'Déterminant par blocs'],
      ]),
    },
  }),
  S("m-rank1-proj", {
    prereqs: ["l-orth-proj", "l-vs-rank"], icon: "uuᵀ", examWeight: 1, exam: ["mcq", "coef", "tf"],
    title: "Matrices de rang 1 et projecteurs",
    desc: "uvᵀ de rang 1 ; P = uuᵀ/(uᵀu) projette, I − 2P réfléchit.",
    prereqWhy: { "l-vs-rank": "rang 1 : toutes les lignes sont proportionnelles" },
    intro: {
      rule: 'uvᵀ (u, v ≠ 0) est de rang 1 : toutes ses lignes sont proportionnelles à vᵀ. <b>P = uuᵀ/(uᵀu)</b> est la projection orthogonale sur Span{u} : P² = P, Pᵀ = P, valeurs propres 1 et 0, tr P = rang P = 1.<br>I − P projette sur u⊥, et H = I − 2P est la symétrie par rapport à u⊥ (Householder). Sur Col A (colonnes libres) : P = A(AᵀA)⁻¹Aᵀ.',
      lines: L([
        [M('(1/9)·[[1,2,2],[2,4,4],[2,4,4]]'), 'u = (1 ; 2 ; 2), uᵀu = 9 : P = uuᵀ/9'],
        [`Py = (u · y)/9 · u = ${M('(9/9)·(1 ; 2 ; 2)')}`, 'y = (3 ; 0 ; 3) : u · y = 9, on projette sans former P'],
        [M('(I - P)y = (2 ; -2 ; 1)'), 'Orthogonal à u'],
        [M('H = (1/9)·[[7,-4,-4],[-4,1,-8],[-4,-8,1]]'), 'H = I − 2P ; Hy = (1 ; −4 ; −1), de même norme que y'],
      ]),
    },
  }),
  S("m-spectral", {
    prereqs: ["l-sym-orthodiag", "m-rank1-proj"], icon: "Σλuuᵀ", examWeight: 1, exam: ["mcq", "tf"],
    title: "Décomposition spectrale et fonctions de matrices symétriques",
    desc: "A = Σ λᵢuᵢuᵢᵀ ; f(A) se calcule sur les valeurs propres.",
    prereqWhy: {},
    intro: {
      rule: 'A symétrique s\'écrit <b>A = Σ λᵢuᵢuᵢᵀ</b>, avec (uᵢ) orthonormée : une somme de projecteurs pondérés par les valeurs propres.<br>Pour une fonction f : f(A) = Σ f(λᵢ)uᵢuᵢᵀ (Aᵏ, A⁻¹ si aucun λᵢ n\'est nul, √A si tous les λᵢ ≥ 0, e^A). <b>Ce n\'est pas f appliquée case par case.</b>',
      lines: L([
        [M('A = [[5,4],[4,5]]'), 'λ = 9 (u₁ = (1 ; 1)/√2) et λ = 1 (u₂ = (1 ; −1)/√2)'],
        [`A = 9·${M('(1/2)·[[1,1],[1,1]]')} + 1·${M('(1/2)·[[1,-1],[-1,1]]')}`, 'Décomposition spectrale'],
        [`√A = 3·u₁u₁ᵀ + 1·u₂u₂ᵀ = ${M('[[2,1],[1,2]]')}`, 'f sur les valeurs propres : √9 = 3, √1 = 1'],
        [M('[[2,1],[1,2]]·[[2,1],[1,2]] = [[5,4],[4,5]]'), 'Contrôle : (√A)² = A'],
      ]),
    },
  }),
  S("m-posdef", {
    prereqs: ["l-sym-quadform", "m-spectral"], icon: "A ≻ 0", examWeight: 2, exam: ["mcq", "tf"],
    title: "Matrices définies positives : critères",
    desc: "Valeurs propres, mineurs, pivots : quatre critères équivalents.",
    prereqWhy: { "m-spectral": "xᵀAx = Σ λᵢ(uᵢ · x)²" },
    intro: {
      rule: 'Pour A symétrique, ces énoncés sont équivalents : xᵀAx &gt; 0 pour tout x ≠ 0 ; toutes les valeurs propres &gt; 0 ; tous les mineurs principaux dominants &gt; 0 (Sylvester) ; tous les pivots de Gauss sans échange &gt; 0 ; A = LLᵀ avec L inversible.<br>Définie négative : −A définie positive (les mineurs alternent : &lt; 0, &gt; 0, &lt; 0). <b>Pour « semi-définie », les mineurs dominants ≥ 0 ne suffisent pas.</b>',
      lines: L([
        [M('A = [[2,-1,0],[-1,2,-1],[0,-1,2]]'), 'Une matrice tridiagonale'],
        ['Δ₁ = 2, Δ₂ = 4 − 1 = 3, Δ₃ = 2·3 + 1·(−2) = 4', 'Mineurs dominants'],
        ['Tous &gt; 0 : A est définie positive', 'Critère de Sylvester'],
        [C('x^2+(x-y)^2+(y-z)^2+z^2'), 'Contrôle : xᵀAx est une somme de carrés, &gt; 0 si x ≠ 0'],
      ]),
    },
  }),
];
