// Module M, part d (unit `matrices`, step U8): x′ = Ax (modes, stability),
// e^{At}, x_{k+1} = Ax_k. Catalogue: docs/universite/L-M-algebre-lineaire.md,
// part M. Year 16 (BA4). Intro lines are matrix lines (js/cas/matexpr.js)
// or CAS lines, shown as MathML.

import { parseMatLine, evalAst, lineML } from '../../cas/matexpr.js';
import { parse } from '../../cas/parse.js';
import { toMathML } from '../../cas/mathml.js';

function M(text, vars = ['t', 'c', 'k', 'λ']) {
  try {
    const line = parseMatLine(text, { vars });
    if (line.body) line.value = evalAst(line.body, {}, { vars }, 2);
    return lineML(line);
  } catch { return text; }
}
const C = (text, vars = ['λ', 't', 'y']) => { try { return toMathML(parse(text, { vars })); } catch { return text; } };
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-ode-modes", {
    prereqs: ["l-eig-diag", "a2-ode-const2", "g8-polar"], icon: "ẋ = Ax", examWeight: 2, exam: ["mcq", "tf"],
    title: "Systèmes x′ = Ax : modes propres et stabilité",
    desc: "Un mode e^{λt}v par valeur propre ; stable si toutes les Re λ < 0.",
    prereqWhy: { "l-eig-diag": "A = PDP⁻¹ : une valeur propre et un vecteur propre par mode", "a2-ode-const2": "modes e^{λt} et cas complexes, comme au 2e ordre", "g8-polar": "λ = a ± ib donne e^{at}·cos bt et e^{at}·sin bt" },
    intro: {
      rule: 'Si A = PDP⁻¹ (valeurs propres λᵢ, vecteurs propres vᵢ), la solution de ẋ = Ax est <b>x(t) = Σ cᵢe^{λᵢt}vᵢ</b>, avec Pc = x(0).<br>Stable (x(t) → 0 pour tout x(0)) si toutes les <b>Re λᵢ &lt; 0</b> ; une Re λ &gt; 0 : instable. λ = a ± ib donne des oscillations e^{at}(cos bt, sin bt).<br>ÿ + aẏ + by = 0 devient, avec x = (y ; ẏ), ẋ = Ax avec la matrice compagne A = [[0, 1], [−b, −a]].',
      lines: L([
        [`ÿ + 5ẏ + 6y = 0 : ${M('A = [[0,1],[-6,-5]]')}`, 'Matrice compagne : ÿ = −6y − 5ẏ'],
        [C('λ^2+5λ+6=(λ+2)(λ+3)'), 'Valeurs propres −2 et −3'],
        [M('x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)'), 'Un mode par valeur propre'],
        [M('x(t) = 3e^(-2t)(1 ; -2) - 2e^(-3t)(1 ; -3)'), 'c₁ + c₂ = 1, −2c₁ − 3c₂ = 0 pour x(0) = (1 ; 0)'],
        ['Re λ &lt; 0 pour les deux : stable', 'y(t) = 3e^{−2t} − 2e^{−3t} → 0'],
      ]),
    },
  }),
  S("m-expm", {
    prereqs: ["m-ode-modes", "a1-pow-sums"], icon: "e^{At}", examWeight: 1, exam: ["mcq", "coef", "tf", "open"],
    title: "Exponentielle de matrice, y compris pour une valeur propre double",
    desc: "P·diag(e^{λt})·P⁻¹, ou e^{λt}(I + tN) pour une valeur double.",
    prereqWhy: { "m-ode-modes": "x(t) = e^{At}x(0) : e^{At} réunit les modes", "a1-pow-sums": "série e^{At} = Σ (At)ᵏ/k!, qui s'arrête quand N² = 0" },
    intro: {
      rule: 'e^{At} = Σ (At)ᵏ/k! : sa dérivée est Ae^{At}, elle vaut I en t = 0, et x(t) = e^{At}x(0).<br>Si A = PDP⁻¹ : <b>e^{At} = P·diag(e^{λᵢt})·P⁻¹</b>. Valeur propre double d\'une 2 × 2 non diagonalisable : N = A − λI vérifie N² = 0, donc <b>e^{At} = e^{λt}(I + tN)</b>.<br>Ce n\'est <b>pas</b> l\'exponentielle de chaque case, et e^{A+B} = e^A e^B seulement si AB = BA.',
      lines: L([
        [M('A = [[1,1],[-1,3]]'), 'λ² − 4λ + 4 = (λ − 2)² : valeur double'],
        [M('N = [[-1,1],[-1,1]]'), 'N = A − 2I, et N² = 0'],
        [M('e^(2t)·[[1-t,t],[-t,1+t]]'), 'e^{At} = e^{2t}(I + tN)'],
        ['En t = 0 : I ; la dérivée vaut A·e^{At}', 'Contrôle'],
      ]),
    },
  }),
  S("m-discrete", {
    prereqs: ["l-eig-powers"], icon: "Aᵏx₀", examWeight: 1, exam: ["mcq", "tf"],
    title: "Systèmes discrets x_{k+1} = Ax_k",
    desc: "x_k = Σ cᵢλᵢᵏvᵢ ; stable si toutes les |λ| < 1.",
    prereqWhy: {},
    intro: {
      rule: 'x_k = Aᵏx₀ = <b>Σ cᵢλᵢᵏvᵢ</b> : chaque pas multiplie le mode i par λᵢ.<br>Stable (x_k → 0 pour tout x₀) si et seulement si toutes les <b>|λᵢ| &lt; 1</b> (ρ(A) &lt; 1). En continu, le critère est Re λ &lt; 0 : ce n\'est pas le même.',
      lines: L([
        [M('A = [[5/4,-3/4],[3/2,-1]]'), 'tr A = 1/4, det A = −1/8'],
        [C('λ^2-(1/4)λ-1/8=(λ-1/2)(λ+1/4)'), 'Valeurs propres 1/2 et −1/4'],
        [M('x_k = 2(1/2)^k(1 ; 1) - (-1/4)^k(1 ; 2)'), 'x₀ = (1 ; 0) = 2v₁ − v₂'],
        ['|1/2| &lt; 1 et |−1/4| &lt; 1 : stable', 'x_k → 0'],
      ]),
    },
  }),
];
