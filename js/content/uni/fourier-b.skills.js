// Module F, part b (unit `fourier`, step U10): the Fourier transform: definition, table and properties, equations, Plancherel; distributions.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: fourier-b.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'fourier', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("f-ft-direct", {
    prereqs: ["a1-improper-calc", "a1-int-parts", "g8-polar"],
    icon: "f̂",
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Transformée de Fourier : définition et calcul direct",
    desc: "f̂(α) = (1/√(2π)) ∫ f(y) e^(−iαy) dy : définition avec ses hypothèses, parité, intégration par parties, f̂(0) à part.",
    prereqWhy: {"a1-improper-calc": "∫ sur ℝ calculée comme une limite", "g8-polar": "e^(−iαy) = cos αy − i sin αy"},
    intro: {
      rule: "<b>Définition</b> (à savoir écrire) : f : ℝ → ℝ continue par morceaux et absolument intégrable (∫<sub>ℝ</sub> |f| &lt; ∞) ; sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫<sub>ℝ</sub> f(y) e<sup>−iαy</sup> dy. Si f est <b>paire</b>, f̂(α) = √(2/π) ∫₀<sup>∞</sup> f(x) cos(αx) dx ; si f est <b>impaire</b>, f̂(α) = −i √(2/π) ∫₀<sup>∞</sup> f(x) sin(αx) dx. Quand la formule obtenue a α au dénominateur, f̂(0) = (1/√(2π)) ∫ f se calcule à part.",
      lines: [
        L("f(x) = 1 − x² si |x| ≤ 1, 0 sinon : f est paire", "Parité"),
        L("f̂(α) = √(2/π) ∫₀¹ (1 − x²) cos(αx) dx", "Forme en cos"),
        L("∫₀¹ (1 − x²) cos(αx) dx = 2(sin α − α cos α)/α³", "Deux fois par parties (α ≠ 0)"),
        L("f̂(α) = 2√(2/π) (sin α − α cos α)/α³", "Pour α ≠ 0"),
        L("f̂(0) = (1/√(2π)) ∫₋₁¹ (1 − x²) dx = (2/3)√(2/π)", "À part : la formule donne 0/0"),
      ],
    },
  }),
  S("f-ft-table", {
    prereqs: ["f-ft-direct"],
    icon: "𝓕",
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Transformée de Fourier par la table et les propriétés",
    desc: "Ramener f à une ligne de la table avec les propriétés : translation, dérivée, carré complété ; et l'inverse, sur tout ℝ.",
    prereqWhy: {"f-ft-direct": "définition de f̂ et convention 1/√(2π)"},
    intro: {
      rule: "On ramène f à une ligne de la table (les examens la donnent) avec les propriétés : linéarité ; translation 𝓕(f(x − a)) = e<sup>−iaα</sup> f̂ ; modulation 𝓕(e<sup>−ibx</sup> f) = f̂(α + b) ; dérivée 𝓕(f′) = iα f̂ ; 𝓕(x f) = i f̂′ ; changement d'échelle 𝓕(f(ax)) = f̂(α/a)/|a|. Chaque ligne a sa forme exacte : |y| (F7) ou y &gt; 0 seulement (F3), w² dans e<sup>−w²y²</sup> (F8). Pour une inverse, la réponse est une fonction de x <b>sur tout ℝ</b>.",
      lines: [
        L("e^(−3x² + 6x + 6) = e⁹ e^(−3(x − 1)²)", "Compléter le carré"),
        L("𝓕(e^(−3x²)) = e^(−α²/12)/√6", "Ligne F8 avec w² = 3"),
        L("𝓕(f) = e⁹ e^(−iα) e^(−α²/12)/√6", "Translation de 1 : facteur e^(−iα)"),
      ],
    },
  }),
  S("f-ft-eq", {
    prereqs: ["f-ft-table", "iso-formula", "rat-operations"],
    icon: "û",
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Équations résolues par la transformée de Fourier",
    desc: "Transformer l'équation (𝓕(f ∗ u) = √(2π) f̂ û), isoler û, simplifier la fraction, revenir en x sur tout ℝ.",
    intro: {
      rule: "On transforme les deux membres : linéarité, <b>𝓕(f ∗ u) = √(2π) f̂ û</b>, 𝓕(u″) = −α² û. On isole û, on simplifie la fraction rationnelle, on reconnaît une ligne de la table, puis on revient en x, <b>sur tout ℝ</b> (e<sup>−w|x|</sup>, avec la valeur absolue). On suppose u et ses dérivées intégrables.",
      lines: [
        L("2u + 3 (f ∗ u) = f, f = e^(−|x|)", "Équation (2022)"),
        L("2û + 3√(2π) f̂ û = f̂, f̂ = √(2/π)/(1 + α²)", "Transformer ; ligne F7"),
        L("û = f̂/(2 + 3√(2π) f̂) = √(2/π)/(2(1 + α²) + 6)", "Isoler, puis même dénominateur"),
        L("û = (1/2) √(2/π)/(α² + 4)", "Coefficient de α² en facteur"),
        L("u(x) = e^(−2|x|)/4", "Ligne F7 avec w = 2"),
      ],
    },
  }),
  S("f-plancherel", {
    prereqs: ["f-ft-table"],
    icon: "∫|f̂|²",
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Plancherel",
    desc: "∫ |f|² = ∫ |f̂|² sans facteur : une intégrale en α difficile par une intégrale en x facile.",
    intro: {
      rule: "Plancherel : ∫<sub>ℝ</sub> |f(x)|² dx = ∫<sub>ℝ</sub> |f̂(α)|² dα, <b>sans facteur 2π</b> avec la convention 1/√(2π). On choisit f dans la table de façon que |f̂|² soit l'intégrande voulu, on calcule l'autre côté, puis on isole.",
      lines: [
        L("f = e^(−|x|) : f̂ = √(2/π)/(1 + α²)", "Ligne F7"),
        L("∫ e^(−2|x|) dx = 1", "Le côté facile"),
        L("∫ (2/π)/(1 + α²)² dα = 1", "Plancherel"),
        L("∫ dα/(1 + α²)² = π/2", "Isoler"),
      ],
    },
  }),
  S("f-distrib-def", {
    prereqs: ["a1-improper-calc"],
    icon: "⟨T,φ⟩",
    examWeight: 1,
    exam: ["mcq", "open"],
    tags: ["MT/SV"],
    title: "Distributions : ⟨T_f, φ⟩, δ_a et f·δ_a (MT/SV)",
    desc: "⟨T_f, φ⟩ = ∫ fφ, ⟨δ_a, φ⟩ = φ(a), et g δ_a = g(a) δ_a.",
    prereqWhy: {"a1-improper-calc": "⟨T_f, φ⟩ = ∫ fφ sur ℝ"},
    intro: {
      rule: "Une distribution agit sur les fonctions test φ (C<sup>∞</sup> à support compact) : ⟨T_f, φ⟩ = ∫ f φ (coupée selon les morceaux de f) ; ⟨δ_a, φ⟩ = φ(a) ; ⟨g T, φ⟩ = ⟨T, g φ⟩, donc <b>g δ_a = g(a) δ_a</b> (on évalue g au point a, pas en 0). Deux distributions sont égales si elles donnent la même valeur sur toute φ.",
      lines: [
        L("f = 0 (x < 0), 2x (0 ≤ x ≤ 1), 1/x (x > 1)", "Exemple 2019"),
        L("⟨T_f + δ₁, φ⟩ = ∫₀¹ 2x φ(x) dx + ∫₁^∞ φ(x)/x dx + φ(1)", "Définitions"),
        L("⟨x² δ₁, φ⟩ = ⟨δ₁, x² φ⟩ = 1² φ(1)", "Le produit passe sur φ"),
        L("x² δ₁ = δ₁", "Pour toute φ"),
      ],
    },
  }),
  S("f-distrib-deriv", {
    prereqs: ["f-distrib-def", "a1-int-parts"],
    icon: "DT",
    examWeight: 1,
    exam: ["mcq", "open"],
    tags: ["MT/SV"],
    title: "Dérivée au sens des distributions (MT/SV)",
    desc: "⟨DT, φ⟩ = −⟨T, φ′⟩ : la dérivée d'une fonction qui saute contient un δ par saut.",
    prereqWhy: {"f-distrib-def": "⟨T, φ⟩ et δ_a"},
    intro: {
      rule: "⟨DT, φ⟩ = <b>−</b>⟨T, φ′⟩ (le signe vient de l'intégration par parties, φ s'annulant hors d'un compact). Pour f C¹ par morceaux : <b>DT_f = T_(f′) + Σ (f(a + 0) − f(a − 0)) δ_a</b>, une somme sur les sauts de f.",
      lines: [
        L("f(t) = e^(−t) pour t > 0, 0 sinon", "Exemple 2021"),
        L("⟨Df, φ⟩ = −∫₀^∞ e^(−t) φ′(t) dt", "Définition"),
        L("= φ(0) − ∫₀^∞ e^(−t) φ(t) dt", "Par parties"),
        L("Df = −f + δ", "Saut de 1 en 0"),
      ],
    },
  }),
  S("f-distrib-eq", {
    prereqs: ["f-distrib-deriv", "f-ft-table"],
    icon: "δ",
    examWeight: 1,
    exam: ["open"],
    tags: ["MT/SV"],
    title: "Équations avec δ ; transformée de Fourier de cos (MT/SV)",
    desc: "y′ + ay = δ par la solution fondamentale H(t)e^(−at) ; y″ − ω²y = δ par Fourier, avec 𝓕(δ) = 1/√(2π).",
    prereqWhy: {"f-distrib-deriv": "dérivées avec les δ des sauts", "f-ft-table": "tables de Fourier D1 à D4"},
    intro: {
      rule: "<b>Solution fondamentale</b> : y′ + ay = δ a pour solution y = H(t) e<sup>−at</sup> (H coupe la solution homogène en 0 ; sa dérivée donne le δ) ; toutes les solutions : H(t) e<sup>−at</sup> + C e<sup>−at</sup>. De même y″ + ω²y = δ : y = H(x) sin(ωx)/ω. <b>Par Fourier</b> (solution tempérée) : 𝓕(δ) = 1/√(2π), 𝓕(1) = √(2π) δ, 𝓕(cos ax) = √(π/2)(δ<sub>−a</sub> + δ<sub>a</sub>).",
      lines: [
        L("y′ + y = δ : essai y = H(t) e^(−t)", "Solution fondamentale"),
        L("Dy = −H(t) e^(−t) + δ = −y + δ", "Le saut de 1 en 0 donne δ"),
        L("y = H(t) e^(−t) + C e^(−t)", "Toutes les solutions"),
        L("y″ − 4y = δ : −α² ŷ − 4ŷ = 1/√(2π)", "Par Fourier"),
        L("y = −e^(−2|x|)/4", "Ligne F7"),
      ],
    },
  }),
];
