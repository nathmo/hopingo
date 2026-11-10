// Module F, part c (unit `fourier`, step U10): the Laplace transform: table, abscissa, inverses, ODE, integro-differential equations, the long problem.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-c.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("f-lap-table", {
    prereqs: ["a1-improper-calc", "g8-polar"],
    icon: 'ℒ',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Transformée de Laplace par la table et les propriétés",
    desc: 'Lignes L1 à L14, décalage F(z + b), −F′ pour t·f, retard e^(−az) ; et le demi-plan Re z > γ₀.',
    prereqWhy: {"a1-improper-calc": "F(z) = ∫₀^∞ f(t)e^(−tz) dt", "g8-polar": "e^(iωt), cos ωt et sin ωt dans la table"},
    intro: {
      rule: "F(z) = ℒ(f)(z) = ∫₀^∞ f(t) e^(−tz) dt, pour Re z > γ₀. On découpe f en <b>lignes de la table</b> (linéarité), puis on applique les <b>propriétés</b> : e^(−bt) f ↦ F(z + b) (décalage), t f ↦ −F′(z), f(t − a)H(t − a) ↦ e^(−az) F(z) (retard). On termine toujours par le demi-plan.",
      lines: [
        L('f(t) = e^(−2t)(4 cos 3t − 7 sin 5t)', 'Une parenthèse multipliée par e^(−2t)'),
        L('ℒ(4 cos 3t − 7 sin 5t) = 4z/(z² + 9) − 35/(z² + 25)', 'Lignes L5 et L4'),
        L('F(z) = 4(z + 2)/((z + 2)² + 9) − 35/((z + 2)² + 25)', 'Décalage : z devient z + 2'),
        L('Re z > −2', 'e^(−2t) déplace l\'abscisse 0 de −2'),
        L('ℒ(t sin ωt) = −d/dz [ω/(z² + ω²)] = 2ωz/(z² + ω²)²', 'LP5, avec le signe moins'),
      ],
    },
  }),
  S("f-lap-abscissa", {
    prereqs: ["f-lap-table"],
    icon: 'γ₀',
    examWeight: 1,
    exam: ["mcq"],
    title: "Abscisse de convergence",
    desc: 'γ₀ d\'une somme : le maximum des abscisses ; pour F rationnelle : la plus grande partie réelle des pôles.',
    prereqWhy: {"f-lap-table": "demi-plan de chaque ligne de la table"},
    intro: {
      rule: "γ₀ = inf des γ tels que ∫₀^∞ |f(t)| e^(−γt) dt < ∞. Pour une <b>somme</b>, c'est le <b>maximum</b> des abscisses des termes ; e^(αt) déplace de α ; tⁿ, sin et cos donnent 0 ; cosh(ωt) et sinh(ωt) donnent |ω|. Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles.",
      lines: [
        L('f = (t² + e^(−t))² = t⁴ + 2t² e^(−t) + e^(−2t)', 'Développer'),
        L('abscisses 0, −1, −2', 'Une par terme'),
        L('γ₀ = max(0 ; −1 ; −2) = 0', 'F existe pour Re z > 0'),
        L('F = 1/(z²(z² − 2z + 2)) : pôles 0, 1 + i, 1 − i', 'F rationnelle'),
        L('γ₀ = max(0 ; 1) = 1', 'La plus grande partie réelle'),
      ],
    },
  }),
  S("f-lap-inv-des", {
    prereqs: ["f-lap-table", "g0-pfd-general"],
    icon: 'ℒ⁻¹',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Laplace inverse par éléments simples",
    desc: 'Décomposer F en éléments simples réels, reconnaître chaque terme dans la table, additionner.',
    prereqWhy: {"f-lap-table": "reconnaître chaque terme dans la table"},
    intro: {
      rule: "On décompose F en <b>éléments simples réels</b> : c/(z − a)ᵏ et (Az + B)/((z − a)² + ω²) (on complète le carré). Chaque terme est une ligne de la table : 1/(z − a) ↦ e^(at), 1/(z − a)² ↦ t e^(at), (z − a)/((z − a)² + ω²) ↦ e^(at) cos ωt, ω/((z − a)² + ω²) ↦ e^(at) sin ωt. <b>Attention au facteur ω</b> : 1/(z² + 4) = ½ · 2/(z² + 4) ↦ ½ sin 2t.",
      lines: [
        L('F = (z³ + 4z − 5)/((z² + 4)(z² + 9))', 'Deux facteurs irréductibles'),
        L('F = (Az + B)/(z² + 4) + (Cz + D)/(z² + 9)', 'Forme de la décomposition'),
        L('F = −1/(z² + 4) + (z + 1)/(z² + 9)', 'Identifier : A = 0, B = −1, C = 1, D = 1'),
        L('F = −½ · 2/(z² + 4) + z/(z² + 9) + ⅓ · 3/(z² + 9)', 'Forme de la table'),
        L('f(t) = −½ sin 2t + cos 3t + ⅓ sin 3t', 'Lignes L4 et L5'),
      ],
    },
  }),
  S("f-lap-inv-res", {
    prereqs: ["c-res-multiple", "c-res-theorem"],
    icon: 'Res',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Laplace inverse par les résidus",
    desc: 'f(t) = somme des résidus de F(z)e^(zt) en tous les pôles, conjugués compris.',
    prereqWhy: {"c-res-theorem": "f(t) est la somme de tous les résidus de F(z)e^(zt)"},
    intro: {
      rule: "Pour F rationnelle de degré &lt; 0 : f(t) = Σ Res(F(z) e^(zt), z_k) sur <b>tous</b> les pôles. Pôle simple : (z − z₀)F(z)e^(zt) en z₀. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. Deux pôles conjugués donnent deux résidus conjugués : leur somme est réelle (2 Re).",
      lines: [
        L('F = 1/(z²(z² − 2z + 2)) : pôles 0 (double), 1 ± i', 'Factoriser le dénominateur'),
        L('Res₀ = d/dz[e^(zt)/(z² − 2z + 2)] en 0 = (t + 1)/2', 'Pôle double'),
        L('Res₁₊ᵢ = e^((1+i)t)/((1 + i)² · 2i) = −e^((1+i)t)/4', 'Pôle simple'),
        L('Res₁₋ᵢ = −e^((1−i)t)/4', 'Le conjugué'),
        L('f(t) = (t + 1)/2 − e^t cos t/2', 'La somme, réelle'),
      ],
    },
  }),
  S("f-lap-ode", {
    prereqs: ["f-lap-inv-des"],
    icon: 'y″',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "EDO avec conditions initiales par Laplace",
    desc: 'Transformer avec ℒ(y″) = z²Y − z y(0) − y′(0), isoler Y, inverser.',
    intro: {
      rule: "On transforme l'équation : ℒ(y′) = zY − y(0), ℒ(y″) = z²Y − z y(0) − y′(0) (les <b>conditions initiales</b> entrent ici). L'équation devient algébrique en Y : on isole Y, on décompose en éléments simples et on inverse avec la table.",
      lines: [
        L('y″ + 2y′ + y = 1, y(0) = y′(0) = 1', 'L\'équation'),
        L('z²Y − z − 1 + 2(zY − 1) + Y = 1/z', 'Transformer'),
        L('Y = (z² + 3z + 1)/(z(z + 1)²)', 'Isoler Y'),
        L('Y = 1/z + 1/(z + 1)²', 'Éléments simples'),
        L('y = 1 + t e^(−t)', 'Lignes L2 et L9'),
      ],
    },
  }),
  S("f-lap-integro", {
    prereqs: ["f-lap-ode"],
    icon: '∫∗',
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Équations intégro-différentielles (GM)",
    desc: '∫₀ᵗ u(s)g(t − s) ds = (u ∗ g)(t) se transforme en U(z)G(z) : transformer, isoler U, inverser.',
    prereqWhy: {"f-lap-ode": "même méthode : transformer, isoler, inverser"},
    intro: {
      rule: "Une intégrale ∫₀ᵗ u(s) g(t − s) ds est la convolution (u ∗ g)(t) : sa transformée est U(z)G(z) (LP6). On identifie le <b>noyau</b> g, on transforme toute l'équation, on isole U et on inverse.",
      lines: [
        L('u′ + 2u + 20 ∫₀ᵗ u(s) e^(2(t−s)) ds = 10 e^(2t), u(0) = 1', 'Noyau g(t) = e^(2t)'),
        L('ℒ(e^(2t)) = 1/(z − 2)', 'Ligne L3, Re z > 2'),
        L('zU − 1 + 2U + 20U/(z − 2) = 10/(z − 2)', 'Transformer'),
        L('U = (z + 8)/(z² + 16)', 'Isoler U'),
        L('u = cos 4t + 2 sin 4t', 'Lignes L5 et L4'),
      ],
    },
  }),
  S("f-lap-problem", {
    prereqs: ["f-lap-ode", "f-lap-inv-res", "c-arc-estimate"],
    icon: '10 pts',
    examWeight: 3,
    exam: ["open"],
    title: "Problème : EDO par Laplace, puis inverse par les résidus",
    desc: 'Le problème complet (10 points) : transformer, isoler Y, résidus, arc de Bromwich, vérifier.',
    prereqWhy: {"c-arc-estimate": "l'intégrale sur l'arc gauche de Bromwich tend vers 0"},
    intro: {
      rule: "Le problème d'examen : on transforme l'équation, on isole Y, puis f(t) = Σ Res(Y(z)e^(zt)). Pour justifier, on intègre sur le contour de Bromwich : la droite Re z = γ > γ₀, fermée à gauche par un demi-cercle C_R dont l'intégrale tend vers 0 (|e^(zt)| = e^(t Re z), |Y| ≤ C/R et le lemme de Jordan). On vérifie enfin les conditions initiales.",
      lines: [
        L('y″ + 3y′ + 2y = 2e^(−t), y(0) = 1, y′(0) = 0', 'Second membre résonnant'),
        L('z²Y − z + 3(zY − 1) + 2Y = 2/(z + 1)', 'Transformer'),
        L('Y = (z² + 4z + 5)/((z + 1)²(z + 2))', 'Isoler Y : pôle double en −1'),
        L('Res₋₂ = e^(−2t) ; Res₋₁ = d/dz[(z² + 4z + 5)e^(zt)/(z + 2)] en −1 = 2t e^(−t)', 'Résidus'),
        L('y = e^(−2t) + 2t e^(−t) ; y(0) = 1, y′(0) = 0', 'Vérifier'),
      ],
    },
  }),
];
