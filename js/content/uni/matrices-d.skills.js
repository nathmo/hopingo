// Module M, part d (unit `matrices`, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, part M. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'matrices', year: 16, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("m-ode-modes", {
    prereqs: ["l-eig-diag", "a2-ode-const2", "g8-polar"], icon: "ẋ = Ax", examWeight: 2, exam: ["mcq", "tf"],
    title: "Systèmes x′ = Ax : modes propres et stabilité",
    desc: "Un mode e^{λt}v par valeur propre ; stable si toutes les Re λ < 0.",
    prereqWhy: {"l-eig-diag": "A = PDP⁻¹", "a2-ode-const2": "modes e^{λt} et cas complexes, comme au 2e ordre", "g8-polar": "λ = a ± ib donne e^{at}·cos bt et e^{at}·sin bt"},
    intro: { rule: "si A = PDP⁻¹ (valeurs λᵢ, vecteurs vᵢ), la solution de ẋ = Ax est x(t) = Σ cᵢe^{λᵢt}vᵢ, avec c solution de Pc = x(0). Stabilité : toutes les Re λᵢ < 0 ⇒ x(t) → 0 pour tout x(0) ; une Re λ > 0 ⇒ instable. λ = a ± ib donne des oscillations e^{at}(cos bt, sin bt). L'EDO ÿ + aẏ + by = 0 devient, avec x = (y ; ẏ), A = [[0, 1], [−b, −a]] (matrice compagne), de polynôme caractéristique λ² + aλ + b : le même que l'équation caractéristique de A2. Exemple : ÿ + 5ẏ + 6y = 0 → A = [[0, 1], [−6, −5]], λ = −2 et −3, stable.", lines: [] },
  }),
  S("m-expm", {
    prereqs: ["m-ode-modes", "a1-pow-sums"], icon: "e^{At}", examWeight: 1, exam: ["mcq", "coef", "tf", "open"],
    title: "Exponentielle de matrice, y compris pour une valeur propre double",
    desc: "P·diag(e^{λt})·P⁻¹, ou e^{λt}(I + tN) pour une valeur double.",
    prereqWhy: {"m-ode-modes": "x(t) = e^{At}x(0)", "a1-pow-sums": "série e^{At} = Σ (At)ᵏ/k!"},
    intro: { rule: "e^{At} = Σ (At)ᵏ/k! ; d/dt e^{At} = Ae^{At}, e^{A·0} = I, et x(t) = e^{At}x(0). Si A = PDP⁻¹ : e^{At} = P·diag(e^{λᵢt})·P⁻¹. Valeur propre double λ d'une 2 × 2 non diagonalisable : N = A − λI vérifie N² = 0, donc e^{At} = e^{λt}(I + tN). Ce n'est pas l'exponentielle de chaque case, et e^{A+B} = e^A e^B seulement si AB = BA. Exemple : [[−2, 1], [0, −2]] → e^{−2t}[[1, t], [0, 1]].", lines: [] },
  }),
  S("m-discrete", {
    prereqs: ["l-eig-powers"], icon: "Aᵏx₀", examWeight: 1, exam: ["mcq", "tf"],
    title: "Systèmes discrets x_{k+1} = Ax_k",
    desc: "x_k = Σ cᵢλᵢᵏvᵢ ; stable si toutes les |λ| < 1.",
    prereqWhy: {},
    intro: { rule: "x_k = Aᵏx₀ = Σ cᵢλᵢᵏvᵢ. Stable (x_k → 0 pour tout x₀) si et seulement si toutes les |λᵢ| < 1, c'est-à-dire ρ(A) < 1. Avec λ = 1 et les autres |λ| < 1, x_k converge vers un vecteur fixe (chaînes de Markov). Comparaison : en continu, le critère est Re λ < 0 ; en discret, |λ| < 1. Euler explicite x_{k+1} = (I + hA)x_k fait passer de l'un à l'autre (renvoi N). Exemple : valeurs propres 1/2 et −1/4 → stable.", lines: [] },
  }),
];
