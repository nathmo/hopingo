// Module F, part d (unit `fourier`, step U10): partial differential equations: heat (with and without source), waves, Laplace.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-d.js
// (fourier-d-heat.js, fourier-d-wave.js, fourier-d-laplace.js).

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("f-heat-sep", {
    prereqs: ["f-sine-cosine", "a2-ode-linear1"],
    icon: 'u_t',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Équation de la chaleur par séparation des variables",
    desc: 'Les conditions aux bords choisissent les modes ; chaque mode décroît comme e^(−(nπ/L)²t).',
    prereqWhy: { 'f-sine-cosine': 'série en sinus de la condition initiale (niveau 5 et examen)' },
    intro: {
      rule: "On cherche u = Σ bₙ(t) Xₙ(x). Les conditions aux bords choisissent les modes : <b>Dirichlet</b> (u = 0 aux bords) → sin(nπx/L), n ≥ 1 ; <b>Neumann</b> (u_x = 0) → cos(nπx/L), <b>n = 0 compris</b>. u_xx dérive deux fois le mode : chaque coefficient vérifie l'EDO linéaire bₙ′ = −λₙ bₙ, λₙ = k(nπ/L)² (+ c avec un terme −cu), donc bₙ(t) = bₙ(0) e<sup>−λₙt</sup>. La condition initiale donne bₙ(0) : on la lit si c'est déjà une somme de modes, sinon on calcule sa série en sinus (facteur 2/L).",
      lines: [
        L('u_t = u_xx sur ]0 ; π[, u(0, t) = u(π, t) = 0, u(x, 0) = 3 sin x − sin 4x', 'Dirichlet'),
        L('Xₙ(x) = sin(nx)', 'Les modes'),
        L('λₙ = n² : bₙ(t) = bₙ(0) e^(−n²t)', 'EDO de chaque coefficient'),
        L('b₁(0) = 3, b₄(0) = −1, les autres nuls', 'Lus sur u(x, 0)'),
        L('u = 3e^(−t) sin x − e^(−16t) sin 4x', 'Assembler'),
      ],
    },
  }),
  S("f-heat-source", {
    prereqs: ["f-heat-sep"],
    icon: 'u_t=f',
    examWeight: 2,
    exam: ["open"],
    title: "Problème : chaleur avec terme source",
    desc: 'La source se développe aussi sur les modes : bₙ′ + λₙbₙ = βₙ, solution stationnaire corrigée.',
    intro: {
      rule: "Avec un terme source f(x), on le développe aussi sur les modes : f = Σ βₙ sin(nπx/L). Chaque coefficient vérifie alors bₙ′ + λₙbₙ = βₙ, d'où <b>bₙ(t) = bₙ(0) e<sup>−λₙt</sup> + (βₙ/λₙ)(1 − e<sup>−λₙt</sup>)</b>. La partie stationnaire βₙ/λₙ seule ne vérifie pas bₙ(0) : il faut la corriger. Les modes sans source décroissent comme dans la chaleur sans source.",
      lines: [
        L('u_t − u_xx = sin 2x sur ]0 ; π[, Dirichlet, u(x, 0) = 1', 'Exemple d\'examen (8 points)'),
        L('bₙ(0) = (2/π)∫₀^π sin(nx) dx = 2(1 − (−1)ⁿ)/(nπ)', 'Série en sinus de 1'),
        L('β₂ = 1, les autres βₙ = 0 ; bₙ′ + n²bₙ = βₙ', 'Source et EDO'),
        L('n impair : bₙ = 4e^(−n²t)/(nπ) ; b₂ = (1 − e^(−4t))/4', 'b₂(0) = 0'),
        L('u = Σ 4e^(−(2k+1)²t) sin((2k + 1)x)/((2k + 1)π) + (1 − e^(−4t)) sin 2x/4', 'Assembler'),
      ],
    },
  }),
  S("f-wave", {
    prereqs: ["f-heat-sep", "f-ft-table"],
    icon: 'u_tt',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Équation des ondes ; d'Alembert par Fourier en x",
    desc: 'u_tt = c²u_xx : sur ℝ, û = û₀ cos(cαt) puis d\'Alembert ; sur ]0 ; π[, un oscillateur par mode.',
    prereqWhy: {"f-heat-sep": "séparation des variables sur ]0 ; L[", "f-ft-table": "transformée en x (FP8)"},
    intro: {
      rule: "u_tt = c²u_xx : le coefficient de u_xx est <b>c²</b>. Sur ℝ, la transformée en x donne û_tt + c²α²û = 0 (ℱ(u_xx) = (iα)²û), donc û = û₀(α) cos(cαt) si u_t(x, 0) = 0 ; avec cos = (e^(i·) + e^(−i·))/2 et FP8, <b>u = (u₀(x + ct) + u₀(x − ct))/2</b>. Sur ]0 ; L[ avec Dirichlet, chaque mode sin(nπx/L) est un oscillateur bₙ″ + (cnπ/L)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur u(x, 0) et u_t(x, 0).",
      lines: [
        L('u_tt − ¼ u_xx = 0 : c² = ¼, c = ½', 'MT/SV 2021'),
        L('û_tt + (α²/4) û = 0, û = û₀(α) cos(αt/2)', 'Transformée en x'),
        L('u = (u₀(x + t/2) + u₀(x − t/2))/2', 'Retour en x (FP8)'),
        L('Sur ]0 ; π[, u_tt = u_xx, u(x, 0) = sin 2x, u_t(x, 0) = 3 sin x : b₂ = cos 2t, b₁ = 3 sin t', 'Un oscillateur par mode'),
        L('u = cos 2t sin 2x + 3 sin t sin x', 'Assembler'),
      ],
    },
  }),
  S("f-laplace-eq", {
    prereqs: ["f-heat-sep", "f-ft-table", "a2-laplacian-radial"],
    icon: 'Δu=0',
    examWeight: 1,
    exam: ["open"],
    title: "Équation de Laplace dans un disque, dans un demi-plan",
    desc: 'Disque : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) ; demi-plan : û = ĝ(α)e^(−|α|x).',
    prereqWhy: {"f-heat-sep": "séparation des variables", "f-ft-table": "demi-plan : transformée de Fourier en y", "a2-laplacian-radial": "laplacien en polaires dans le disque"},
    intro: {
      rule: "Disque unité : les modes bornés au centre sont rⁿ cos nθ et rⁿ sin nθ, donc <b>u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ)</b>, les coefficients se lisant sur u(1, θ) (linéariser d'abord sin³θ…). Demi-plan x > 0 : la transformée en y donne û_xx − α²û = 0 ; la solution <b>bornée</b> est û = ĝ(α)e<sup>−|α|x</sup> (e^(|α|x) explose), et la table (F6) ramène en y.",
      lines: [
        L('Δu = 0, u(1, θ) = 1 + 3 cos 2θ : a₀/2 = 1, a₂ = 3', 'Disque'),
        L('u = 1 + 3r² cos 2θ = 1 + 3(x² − y²)', 'Assembler'),
        L('Demi-plan : u(0, y) = 2/(y² + 4), ĝ = √(π/2) e^(−2|α|)', 'Table F6, w = 2'),
        L('û = √(π/2) e^(−(x + 2)|α|)', 'Solution bornée'),
        L('u = (x + 2)/(y² + (x + 2)²)', 'F6 avec w = x + 2'),
      ],
    },
  }),
];
