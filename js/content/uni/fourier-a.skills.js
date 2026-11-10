// Module F, part a (unit `fourier`, step U10): Fourier series: coefficients, sine and cosine series, Dirichlet, Parseval, relations, the series problem, periodic ODE, Sturm-Liouville.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-a.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("f-coef", {
    prereqs: ["a1-int-parts", "g1-parity-period"],
    icon: "aₙbₙ",
    examWeight: 3,
    exam: ["mcq", "coef", "open"],
    title: "Coefficients de Fourier, parité, a₀ et petits indices",
    desc: "Parité d'abord, a₀ à part, puis aₙ ou bₙ par parties.",
    intro: {
      rule: "Série de Fourier d'une fonction T-périodique, ω = 2π/T : a₀/2 + Σ (aₙ cos(nωx) + bₙ sin(nωx)), avec aₙ = (2/T)∫ f cos(nωx) et bₙ = (2/T)∫ f sin(nωx) sur une période. D'abord la <b>parité</b> : f paire ⟹ bₙ = 0 et aₙ = (4/T)∫₀^(T/2) f cos ; f impaire ⟹ aₙ = 0. <b>a₀ se calcule à part</b> : la formule de aₙ divise par n. Une partie trigonométrique (1 + cos 2x) se lit sans intégrer : elle s'ajoute au coefficient de même indice.",
      lines: [
        L("f(x) = x² sur ]−π ; π] : f est paire, bₙ = 0", "Parité"),
        L("a₀ = (2/π)∫₀^π x² dx = 2π²/3", "a₀ à part"),
        L("aₙ = (2/π)∫₀^π x² cos(nx) dx = −(4/(πn))∫₀^π x sin(nx) dx", "Par parties : le crochet est nul"),
        L("aₙ = −(4/(πn))·(−π(−1)ⁿ/n) = 4(−1)ⁿ/n²", "Encore par parties"),
      ],
    },
  }),
  S("f-coef-complex", {
    prereqs: ["f-coef", "g8-polar"],
    icon: "cₖ",
    examWeight: 1,
    exam: ["mcq"],
    title: "Coefficients complexes cₙ d'une somme d'exponentielles",
    desc: "cₖ = (aₖ − ibₖ)/2 se lisent sans intégrer ; aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ).",
    prereqWhy: {"f-coef": "passage aₙ, bₙ ↔ cₙ", "g8-polar": "e^(ikx) = cos kx + i sin kx"},
    intro: {
      rule: "Forme complexe : f = Σ cₖe^(ikx). Avec cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i), on <b>lit</b> les cₖ d'un polynôme trigonométrique. Passage aux réels : <b>aₖ = cₖ + c₋ₖ</b>, <b>bₖ = i(cₖ − c₋ₖ)</b>, et a₀ = 2c₀ ; dans l'autre sens, cₖ = (aₖ − ibₖ)/2. Pour f réelle, c₋ₖ est le conjugué de cₖ.",
      lines: [
        L("g = cos x + 3 sin 3x", "Un polynôme trigonométrique"),
        L("c₁ = c₋₁ = 1/2", "cos x = (e^(ix) + e^(−ix))/2"),
        L("c₃ = 3/(2i) = −3i/2, c₋₃ = 3i/2", "3 sin 3x = 3(e^(3ix) − e^(−3ix))/(2i)"),
        L("b₃ = i(c₃ − c₋₃) = i(−3i) = 3", "Retour aux réels"),
      ],
    },
  }),
  S("f-sine-cosine", {
    prereqs: ["f-coef"],
    icon: "F_s",
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Séries en sinus et en cosinus sur [0 ; L]",
    desc: "Série en sinus : prolongement impair, bₙ = (2/L)∫₀^L f sin(nπx/L).",
    prereqWhy: {"f-coef": "même calcul de coefficients, sur le prolongement"},
    intro: {
      rule: "Pour f donnée sur [0 ; L], la <b>série en sinus</b> F_s f est la série de Fourier du prolongement <b>impair</b>, de période 2L : seulement des bₙ = <b>(2/L)</b>∫₀^L f(x) sin(nπx/L) dx. La série en cosinus vient du prolongement pair : a₀ et aₙ = (2/L)∫₀^L f(x) cos(nπx/L) dx. On intègre sur [0 ; L] seulement, avec le facteur 2/L.",
      lines: [
        L("f(x) = x(π − x) sur [0 ; π]", "Série en sinus"),
        L("bₙ = (2/π)∫₀^π x(π − x) sin(nx) dx", "Facteur 2/L = 2/π"),
        L("bₙ = 4(1 − (−1)ⁿ)/(πn³)", "Deux intégrations par parties"),
        L("b₂ₖ = 0, b₂ₖ₊₁ = 8/(π(2k + 1)³)", "n pair, n impair"),
      ],
    },
  }),
  S("f-dirichlet", {
    prereqs: ["f-coef", "a1-fn-onesided", "g5-reindex"],
    icon: "½(±)",
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Dirichlet : valeur aux sauts, puis une somme numérique",
    desc: "En un saut, la série vaut la moyenne des limites ; puis une somme numérique.",
    prereqWhy: {"a1-fn-onesided": "f(x + 0) et f(x − 0)"},
    intro: {
      rule: "<b>Dirichlet</b> : si f est C¹ par morceaux, sa série de Fourier converge partout vers (f(x + 0) + f(x − 0))/2. Là où le prolongement périodique est continu, c'est f(x) ; en un <b>saut</b>, c'est la moyenne des deux limites — et une série en sinus vaut 0 en 0 et en L. Pour une somme numérique, on choisit x₀ où les cos et sin valent ±1 ou 0, on écrit Dirichlet, on garde les n utiles (n = 2k ± 1), on isole la somme.",
      lines: [
        L("f = −x sur [−π ; 0], π sur ]0 ; π[ : F f(0) = (π + 0)/2 = π/2", "f saute en 0 : pas f(0)"),
        L("F f(0) = 3π/4 + Σ ((−1)ⁿ − 1)/(πn²)", "Les sinus s'annulent"),
        L("π/2 = 3π/4 − (2/π) Σ_{k≥1} 1/(2k − 1)²", "Seuls les n = 2k − 1 restent"),
        L("Σ_{k≥1} 1/(2k − 1)² = π²/8", "Isoler la somme"),
      ],
    },
  }),
  S("f-parseval", {
    prereqs: ["f-coef"],
    icon: "Σc²",
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Parseval et sommes",
    desc: "(2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²) : une somme de carrés.",
    prereqWhy: {"f-coef": "les aₙ et bₙ à substituer"},
    intro: {
      rule: "<b>Parseval</b> : (2/T)∫ f(x)² dx = a₀²/2 + Σ (aₙ² + bₙ²), l'intégrale sur la <b>période où f est donnée</b> (]−π ; π[, pas [0 ; 2π] si la formule est donnée sur ]−π ; π[), avec le <b>carré</b> de f, le facteur <b>2/T</b>, et a₀²/2 (convention a₀/2). En forme complexe : (1/T)∫|f|² = Σ |cₙ|². On en tire des sommes en 1/n⁴, 1/n⁶…",
      lines: [
        L("f(x) = x sur ]−π ; π[ : bₙ = 2(−1)ⁿ⁺¹/n", "Les coefficients"),
        L("(1/π)∫_{−π}^{π} x² dx = 2π²/3", "Membre de gauche"),
        L("2π²/3 = Σ 4/n²", "bₙ² = 4/n²"),
        L("Σ 1/n² = π²/6", "Isoler la somme"),
      ],
    },
  }),
  S("f-coef-relations", {
    prereqs: ["f-coef"],
    icon: "∫↔′",
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Relations entre coefficients ; dérivation terme à terme",
    desc: "aₙ(h) = −bₙ(h′)/(nω) pour h continue : les coefficients d'une primitive sans recalcul.",
    intro: {
      rule: "Si h est continue, périodique et C¹ par morceaux, une intégration par parties donne <b>aₙ(h′) = nω·bₙ(h)</b> et <b>bₙ(h′) = −nω·aₙ(h)</b> : aₙ(h) = −bₙ(h′)/(nω), bₙ(h) = aₙ(h′)/(nω). a₀(h) se calcule <b>à part</b>, et la constante entre h et la fonction voulue multiplie tout. On ne dérive terme à terme que la série d'une fonction <b>continue</b> périodique.",
      lines: [
        L("x : bₙ = 2(−1)ⁿ⁺¹/n ; h = x²/2, h′ = x", "h est continue et paire"),
        L("aₙ(x²/2) = −bₙ(x)/n = 2(−1)ⁿ/n²", "La relation"),
        L("aₙ(x²) = 4(−1)ⁿ/n²", "×2 : x² = 2·(x²/2)"),
        L("a₀(x²) = (1/π)∫_{−π}^{π} x² dx = 2π²/3", "a₀ à part"),
      ],
    },
  }),
  S("f-series-problem", {
    prereqs: ["f-sine-cosine", "f-dirichlet"],
    icon: "F1",
    examWeight: 3,
    exam: ["open"],
    title: "Problème : série en sinus, Dirichlet, somme numérique",
    desc: "Le problème d'examen MT : série en sinus, Dirichlet aux bords, une somme en π/2.",
    intro: {
      rule: "Le problème le plus fréquent en MT, en trois temps : (a) la série en sinus F_s f (prolongement impair, bₙ = (2/π)∫₀^π f sin(nx), par parties) ; (b) comparer F_s f et f sur [0 ; π] avec Dirichlet, <b>bords compris</b> : le prolongement impair vaut 0 en 0 et en π ; (c) écrire la série en π/2, où sin(nπ/2) vaut 0 ou (−1)ᵏ, et en déduire une somme.",
      lines: [
        L("f(x) = x(π − x) : bₙ = 4(1 − (−1)ⁿ)/(πn³)", "(a) Par parties"),
        L("f(0) = f(π) = 0 : F_s f = f sur [0 ; π]", "(b) Prolongement continu"),
        L("π²/4 = Σ_{k≥0} 8(−1)ᵏ/(π(2k + 1)³)", "(c) En x = π/2"),
        L("Σ_{k≥0} (−1)ᵏ/(2k + 1)³ = π³/32", "Isoler la somme"),
      ],
    },
  }),
  S("f-periodic-ode", {
    prereqs: ["f-coef-complex"],
    icon: "u=Σcₙ",
    examWeight: 1,
    exam: ["open"],
    title: "EDO périodique par séries de Fourier",
    desc: "Une EDO périodique : un coefficient cₙ à la fois.",
    prereqWhy: {"f-coef-complex": "u = Σ cₙe^(int)"},
    intro: {
      rule: "On cherche la solution périodique sous la forme u = Σ cₙe^(int). Dériver multiplie cₙ par <b>in</b> ; un retard u(t − τ) le multiplie par <b>e^(−inτ)</b> ((−1)ⁿ pour τ = π). L'équation devient P(n)·cₙ(u) = cₙ(f) pour chaque n : cₙ(u) = cₙ(f)/P(n). On regroupe enfin cₙe^(int) + c₋ₙe^(−int) = 2Re(cₙ)cos(nt) − 2Im(cₙ)sin(nt).",
      lines: [
        L("u′ + u = sin t", "f n'a que n = ±1"),
        L("c₁(f) = 1/(2i) = −i/2", "sin t = (e^(it) − e^(−it))/(2i)"),
        L("(i + 1)c₁(u) = −i/2 : c₁(u) = (−1 − i)/4", "P(1) = i + 1"),
        L("u = 2Re(c₁e^(it)) = (sin t − cos t)/2", "Une solution réelle"),
      ],
    },
  }),
  S("f-sturm-liouville", {
    prereqs: ["f-sine-cosine", "a2-ode-const2"],
    icon: "λₙ",
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Problème de Sturm-Liouville (GM)",
    desc: "−u″ = λu avec des conditions aux bords : λ < 0, λ = 0, puis λ = k² > 0.",
    prereqWhy: {"f-sine-cosine": "les solutions sin(nπx/L) donnent une série en sinus", "a2-ode-const2": "−u″ = λu : équation caractéristique selon le signe de λ"},
    intro: {
      rule: "On cherche les λ pour lesquels −u″ = λu sur ]0 ; L[, avec ses conditions aux bords (Dirichlet u = 0, Neumann u′ = 0), a une solution <b>u ≠ 0</b>. Trois cas : λ < 0 (ch, sh : seulement u = 0), <b>λ = 0</b> (u = A + Bx : à vérifier, valeur propre pour Neumann aux deux bords), λ = k² > 0 (u = A cos kx + B sin kx, et les conditions fixent k). Les uₙ servent ensuite de base pour résoudre −u″ = f.",
      lines: [
        L("−u″ = λu, u(0) = 0, u′(π) = 0", "Dirichlet puis Neumann"),
        L("λ ≤ 0 : seulement u = 0", "ch, sh, puis A + Bx"),
        L("λ = k² : u(0) = 0 donne A = 0, u′(π) = Bk cos(kπ) = 0", "B ≠ 0"),
        L("λₙ = (n + ½)², uₙ = sin((n + ½)x), n ≥ 0", "cos(kπ) = 0"),
      ],
    },
  }),
];
