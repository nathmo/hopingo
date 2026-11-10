// Module C, part b (unit `cplx`, step U10): residues, the residue theorem, arc estimates, real integrals by residues, branch cuts, Fourier transforms by residues, conformal maps.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: cplx-b.js
// (and cplx-b-*.js).

const S = (id, rest) => ({ id, unit: 'cplx', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("c-res-simple", {
    prereqs: ["c-singularities"],
    icon: 'p/q′',
    examWeight: 2,
    exam: ["mcq", "coef"],
    title: "Résidu en un pôle simple",
    desc: 'Res(p/q ; z₀) = p(z₀)/q′(z₀) quand q a un zéro simple en z₀.',
    prereqWhy: {"c-singularities": "vérifier que le pôle est simple"},
    intro: {
      rule: "En un pôle simple z₀, Res(f ; z₀) = lim (z − z₀)f(z). Si f = p/q avec q(z₀) = 0, q′(z₀) ≠ 0 et p(z₀) ≠ 0, la limite vaut <b>p(z₀)/q′(z₀)</b> : pas besoin de factoriser q. On écrit le résultat sous la forme a + bi.",
      lines: [
        L('Res(1/(z⁴ + 4) ; 1 + i) = 1/q′(1 + i)', 'q = z⁴ + 4, q′ = 4z³'),
        L('q′(1 + i) = 4(1 + i)³ = 4(−2 + 2i) = −8 + 8i', '(1 + i)² = 2i'),
        L('Res = 1/(−8 + 8i) = (−8 − 8i)/128 = −1/16 − i/16', 'Multiplier par le conjugué'),
      ],
    },
  }),
  S("c-res-multiple", {
    prereqs: ["c-singularities"],
    icon: 'φ′',
    examWeight: 2,
    exam: ["mcq", "coef"],
    title: "Résidu en un pôle multiple",
    desc: 'Pôle d\'ordre m : on dérive m − 1 fois (z − z₀)^m f et on divise par (m − 1)!.',
    intro: {
      rule: "En un pôle d'ordre m, Res(f ; z₀) = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)]. On pose φ(z) = (z − z₀)^m f(z) (le facteur qui s'annule disparaît), on dérive φ m − 1 fois, on évalue en z₀, et on divise par (m − 1)!. La formule du pôle simple donnerait une limite infinie.",
      lines: [
        L('f(z) = e^(zt)/((z + 1)²(z + 2)), z₀ = −1, m = 2', 'Pôle double'),
        L('φ(z) = (z + 1)² f(z) = e^(zt)/(z + 2)', 'Simplifier'),
        L('φ′(z) = e^(zt)(t(z + 2) − 1)/(z + 2)²', 'Dériver une fois'),
        L('Res = φ′(−1)/1! = (t − 1)e^(−t)', 'Évaluer en −1'),
      ],
    },
  }),
  S("c-res-laurent", {
    prereqs: ["c-laurent", "c-singularities"],
    icon: 'a₋₁',
    examWeight: 1,
    exam: ["mcq", "coef", "open"],
    title: "Résidu par la série de Laurent (singularité essentielle)",
    desc: 'En une singularité essentielle, le résidu est a₋₁ : on développe et on lit.',
    prereqWhy: {"c-singularities": "reconnaître une singularité essentielle"},
    intro: {
      rule: "Le résidu est toujours a₋₁, le coefficient de 1/(z − z₀) dans la série de Laurent. En une singularité essentielle (une infinité de puissances négatives), c'est la seule méthode : aucune formule de pôle ne marche. On pose w = z − z₀, on développe avec un DL usuel en u = 1/w (ou u = 1/z), on multiplie, on lit a₋₁.",
      lines: [
        L('h = sin(1/(2i − 3z)), z₀ = 2i/3 ; w = z − 2i/3', 'Changement de variable'),
        L('1/(2i − 3z) = −1/(3w)', '2i − 3z = −3w'),
        L('h = −1/(3w) + 1/(162 w³) + o(1/w³)', 'sin u = u − u³/6 + …'),
        L('Res(h ; 2i/3) = a₋₁ = −1/3', 'Coefficient de 1/w'),
      ],
    },
  }),
  S("c-res-theorem", {
    prereqs: ["c-res-simple", "c-res-multiple", "c-cauchy-thm"],
    icon: '2πiΣ',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Théorème des résidus sur un contour fermé",
    desc: '∮ f dz = 2πi × la somme des résidus des singularités à l\'intérieur.',
    intro: {
      rule: "Γ simple fermé, orienté positivement, sans singularité dessus : ∮_Γ f(z) dz = 2πi Σ Res(f ; z_k), la somme portant sur les singularités <b>à l'intérieur</b> de Γ. On les localise d'abord (distance au centre comparée au rayon), on calcule leurs résidus, puis on multiplie la somme par 2πi. Une singularité sur Γ rend l'intégrale non définie.",
      lines: [
        L('∮_{|z| = 2} (z + 1)/(z(z − 1)(z − 3)) dz', '0 et 1 dedans, 3 dehors'),
        L('Res(f ; 0) = 1/((−1)(−3)) = 1/3', 'Pôle simple'),
        L('Res(f ; 1) = 2/(1 · (−2)) = −1', 'Pôle simple'),
        L('∮ = 2πi(1/3 − 1) = −4πi/3', 'Somme des résidus intérieurs'),
      ],
    },
  }),
  S("c-arc-estimate", {
    prereqs: ["c-contour-param", "g8-algebraic"],
    icon: 'ML',
    examWeight: 2,
    exam: ["open"],
    title: "Montrer qu'une intégrale sur un arc tend vers 0",
    desc: '|∫ f dz| ≤ longueur × max |f| : majorer le numérateur, minorer le dénominateur.',
    prereqWhy: {"c-contour-param": "longueur de l'arc paramétré", "g8-algebraic": "modules et inégalité triangulaire"},
    intro: {
      rule: "|∫_{C_R} f dz| ≤ longueur(C_R) · max_{C_R} |f|. Sur le demi-cercle C_R (|z| = R, Im z ≥ 0) : longueur πR ; |e^(iαz)| = e^(−α Im z) ≤ 1 si α > 0 ; on <b>minore</b> le dénominateur par l'inégalité triangulaire inverse |z² + 1| ≥ |z|² − 1 = R² − 1, ce qui majore 1/|z² + 1|. Attention : |cos z| n'est pas borné sur ℂ.",
      lines: [
        L('|e^(2iz)| = e^(−2 Im z) ≤ 1 sur C_R', 'Numérateur'),
        L('|z² + 1| ≥ R² − 1, donc 1/|z² + 1| ≤ 1/(R² − 1)', 'Dénominateur'),
        L('|∫_{C_R} e^(2iz)/(z² + 1) dz| ≤ πR/(R² − 1)', 'Longueur × max'),
        L('πR/(R² − 1) → 0 quand R → ∞', 'Conclusion'),
      ],
    },
  }),
  S("c-int-rational", {
    prereqs: ["c-res-theorem", "c-arc-estimate"],
    icon: '∫ℝ p/q',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Intégrales rationnelles sur ℝ",
    desc: '∫_ℝ p/q dx = 2πi × la somme des résidus du demi-plan supérieur.',
    intro: {
      rule: "Si deg q ≥ deg p + 2 et q n'a pas de racine réelle : on ferme [−R ; R] par le demi-cercle supérieur C_R, l'intégrale sur C_R tend vers 0, et ∫_ℝ p(x)/q(x) dx = 2πi Σ_{Im z_k > 0} Res(p/q ; z_k). Seuls les pôles du demi-plan supérieur comptent.",
      lines: [
        L('∫_ℝ dx/((x² + 1)(x² + 4)) : pôles i et 2i en haut', 'Demi-plan Im z > 0'),
        L('Res(f ; i) = 1/(6i), Res(f ; 2i) = −1/(12i)', 'Pôles simples'),
        L('|∫_{C_R}| ≤ πR/((R² − 1)(R² − 4)) → 0', 'Arc'),
        L('∫_ℝ = 2πi(1/(6i) − 1/(12i)) = π/6', 'Conclusion'),
      ],
    },
  }),
  S("c-int-trig", {
    prereqs: ["c-res-theorem"],
    icon: 'e^(iθ)',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Intégrales trigonométriques sur [0 ; 2π]",
    desc: 'z = e^(iθ) : une intégrale sur le cercle unité, pôles de |z| < 1.',
    intro: {
      rule: "Avec z = e^(iθ), θ ∈ [0 ; 2π] parcourt le cercle unité : cos θ = (z + 1/z)/2, sin θ = (z − 1/z)/(2i), dθ = dz/(iz). On réduit l'intégrande en une seule fraction de z, on garde les pôles de |z| < 1, et ∫₀^{2π} = 2πi Σ Res.",
      lines: [
        L('∫₀^{2π} dθ/(2 − cos θ) = ∮_{|z| = 1} 1/(2 − (z + 1/z)/2) · dz/(iz)', 'z = e^(iθ)'),
        L('= ∮ 2i/(z² − 4z + 1) dz', 'Une seule fraction'),
        L('pôles 2 ± √3 : seul 2 − √3 est dans |z| < 1', 'Produit des racines = 1'),
        L('Res = 2i/(2(2 − √3) − 4) = −i/√3, donc ∫ = 2πi(−i/√3) = 2π/√3', 'Conclusion'),
      ],
    },
  }),
  S("c-int-fourier", {
    prereqs: ["c-res-theorem", "c-arc-estimate"],
    icon: 'e^(iαx)',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Intégrales avec e^(iαx)",
    desc: 'On intègre R(x)e^(iαx), puis on prend la partie réelle ou imaginaire.',
    intro: {
      rule: "Pour ∫_ℝ R(x) cos(αx) dx ou ∫_ℝ R(x) sin(αx) dx, on calcule ∫_ℝ R(x) e^(iαx) dx, puis sa partie réelle ou imaginaire. On ne met <b>pas</b> cos(αz) dans le contour : il n'est pas borné. Comme |e^(iαz)| = e^(−α Im z), on ferme en haut si α > 0, en bas si α < 0 (et alors ∮ = −2πi Σ Res).",
      lines: [
        L('∫_ℝ cos(2x)/(x² + 1) dx = Re ∫_ℝ e^(2ix)/(x² + 1) dx', 'α = 2 > 0 : en haut'),
        L('Res(e^(2iz)/(z² + 1) ; i) = e^(−2)/(2i)', 'Pôle simple'),
        L('∫_ℝ e^(2ix)/(x² + 1) dx = 2πi · e^(−2)/(2i) = πe^(−2)', 'L\'arc tend vers 0'),
        L('∫_ℝ cos(2x)/(x² + 1) dx = πe^(−2)', 'Partie réelle'),
      ],
    },
  }),
  S("c-int-branch", {
    prereqs: ["c-int-rational", "c-elem-fn"],
    icon: 'x^a',
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Intégrales avec coupure (GM)",
    desc: 'Trou de serrure : (1 − e^(2πia)) ∫₀^∞ x^a R(x) dx = 2πi Σ Res.',
    prereqWhy: {"c-int-rational": "mêmes résidus de R(z) que pour une intégrale rationnelle", "c-elem-fn": "z^a avec la coupure, argument dans ]0 ; 2π["},
    intro: {
      rule: "Pour I = ∫₀^∞ x^a R(x) dx (−1 < a < 1, a ∉ ℤ) : z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ (coupure sur ℝ₊), contour en trou de serrure. Sur le bord du bas, l'argument vaut 2π, donc z^a = x^a e^(2πia), parcouru de ∞ à 0 : (1 − e^(2πia)) I = 2πi Σ Res. Les résidus s'écrivent avec des exponentielles explicites : −1 = e^(iπ).",
      lines: [
        L('I = ∫₀^∞ dx/(√x (1 + x)) : f(z) = z^(−1/2)/(1 + z)', 'a = −1/2'),
        L('1 − e^(2πia) = 1 − e^(−iπ) = 2', 'Facteur des deux bords'),
        L('Res(f ; −1) = (e^(iπ))^(−1/2) = e^(−iπ/2) = −i', 'arg(−1) = π'),
        L('2I = 2πi · (−i) = 2π, donc I = π', 'Conclusion'),
      ],
    },
  }),
  S("c-fourier-residues", {
    prereqs: ["c-int-fourier"],
    icon: 'f̂',
    examWeight: 1,
    exam: ["open"],
    tags: ["GM"],
    title: "Transformée de Fourier calculée par les résidus (GM)",
    desc: 'f̂(α) = (1/√(2π)) ∫ f(x)e^(−iαx) dx : fermer en bas si α > 0, puis |α|.',
    intro: {
      rule: "f̂(α) = (1/√(2π)) ∫_ℝ f(x) e^(−iαx) dx. Comme |e^(−iαz)| = e^(α Im z), pour α > 0 on ferme <b>en bas</b> : le contour est parcouru dans le sens négatif, ∫ = −2πi Σ_{Im z_k < 0} Res. Pour α < 0, on ferme en haut. Si f est paire, f̂ l'est aussi : on écrit le résultat avec |α|.",
      lines: [
        L('f(x) = 1/(1 + x²), α > 0 : pôle −i en bas', 'Fermer en bas'),
        L('Res(e^(−iαz)/(1 + z²) ; −i) = e^(−α)/(−2i)', 'Pôle simple'),
        L('f̂(α) = (1/√(2π)) · (−2πi) · e^(−α)/(−2i) = √(π/2) e^(−α)', 'Sens négatif : −2πi'),
        L('f̂(α) = √(π/2) e^(−|α|)', 'f paire : tout α'),
      ],
    },
  }),
  S("c-conformal", {
    prereqs: ["c-elem-fn"],
    icon: 'w(z)',
    examWeight: 0,
    exam: ["mcq"],
    tags: ["opt"],
    optional: true,
    title: "Applications conformes (opt.)",
    desc: 'Homographies : images de points, de droites et de cercles.',
    prereqWhy: {"c-elem-fn": "homographies et fonctions élémentaires"},
    intro: {
      rule: "f holomorphe avec f′ ≠ 0 conserve les angles. Une homographie w = (az + b)/(cz + d) (ad − bc ≠ 0) envoie les cercles et les droites sur des cercles et des droites ; elle est déterminée par les images de trois points. Une droite passe par ∞ : son image passe par w(∞) = a/c.",
      lines: [
        L('w = (z − i)/(z + i)', 'Demi-plan Im z > 0 → disque |w| < 1'),
        L('0 ↦ −1, 1 ↦ (1 − i)/(1 + i) = −i, ∞ ↦ 1', 'Images de trois points de ℝ'),
        L('trois points du cercle unité : l\'image de ℝ est |w| = 1', 'Cercle par trois points'),
      ],
    },
  }),
];
