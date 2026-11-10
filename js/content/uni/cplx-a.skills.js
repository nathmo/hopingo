// Module C, part a (unit `cplx`, step U10): elementary functions, equations, Cauchy-Riemann, harmonic conjugates, contour integrals, Cauchy, Taylor, Laurent, singularities.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: cplx-a.js
// (and cplx-a-*.js); judges cvalue and cfamily: js/judges/cplx-ca.js;
// traps: js/cas/rules/ca.js.

const S = (id, rest) => ({ id, unit: 'cplx', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("c-elem-fn", {
    prereqs: ["g8-polar", "g2-hyp-def"],
    icon: 'Log',
    examWeight: 1,
    exam: ["mcq"],
    title: "Fonctions élémentaires : e^z, cos z, Log z, z^α",
    desc: 'Log z = ln|z| + i Arg z avec Arg dans ]−π ; π] ; z^α = e^(α Log z) ; cos z n\'est pas borné.',
    prereqWhy: { "g2-hyp-def": "cos(iy) = cosh y", "g8-polar": "module et argument de z" },
    intro: {
      rule: "e^(x + iy) = eˣ(cos y + i sin y), donc |e^z| = e^(Re z), et e^z est <b>2πi-périodique</b>. Log z = ln|z| + i Arg z avec l'argument <b>principal</b> Arg z ∈ ]−π ; π] (holomorphe hors de ]−∞ ; 0]). z^α = e^(α Log z). cos z = (e^(iz) + e^(−iz))/2 n'est <b>pas borné</b> sur ℂ : cos(iy) = cosh y.",
      lines: [
        L('|−1 − i| = √2, Arg(−1 − i) = −3π/4', 'Troisième quadrant : −π + π/4'),
        L('Log(−1 − i) = ln √2 − (3π/4) i', 'Pas 5π/4 : il est hors de ]−π ; π]'),
        L('i^i = e^(i·Log i) = e^(i·iπ/2) = e^(−π/2)', 'Un nombre réel'),
        L('cos(2i) = (e^(−2) + e²)/2 = cosh 2', 'cos z n\'est pas borné'),
      ],
    },
  }),
  S("c-equations", {
    prereqs: ["c-elem-fn", "g8-quadratic"],
    icon: 'e^z=w',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Équations dans ℂ",
    desc: 'Poser w = e^z (ou e^(iz)), résoudre le trinôme en w, puis z = Log w + 2kπi.',
    prereqWhy: { "c-elem-fn": "z = Log w + 2kπi", "g8-quadratic": "le trinôme en w, parfois Δ < 0" },
    intro: {
      rule: "Pour une équation en cosh, sinh (ou cos, sin), on pose w = e^z (ou w = e^(iz)) : cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2. On multiplie par 2w ≠ 0 pour avoir un trinôme en w, on le résout (Δ < 0 a deux racines carrées <b>imaginaires</b>), puis e^z = w ⟺ z = Log w + <b>2kπi</b>, k ∈ ℤ : une famille par racine.",
      lines: [
        L('2 cosh z + sinh z = i', 'w = e^z'),
        L('(w + 1/w) + (w − 1/w)/2 = i', 'Substituer'),
        L('3w² − 2iw + 1 = 0', 'Multiplier par 2w'),
        L('Δ = −16 = (4i)² : w = i ou w = −i/3', 'Racines du trinôme'),
        L('z = iπ/2 + 2kπi ou z = −ln 3 − iπ/2 + 2kπi, k ∈ ℤ', 'Log w + 2kπi'),
      ],
    },
  }),
  S("c-cauchy-riemann", {
    prereqs: ["c-elem-fn", "a2-partials"],
    icon: 'CR',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Cauchy-Riemann et holomorphie",
    desc: 'u_x = v_y et u_y = −v_x sur un ouvert ; alors f′ = u_x + i v_x.',
    prereqWhy: { "c-elem-fn": "u et v de e^z, z² et Log z", "a2-partials": "les quatre dérivées partielles" },
    intro: {
      rule: "f = u + iv, avec u, v de classe C¹, est holomorphe sur un ouvert si et seulement si <b>u_x = v_y et u_y = −v_x</b> partout sur cet ouvert ; alors f′ = u_x + i v_x. On écrit u et v (z = x + iy), on calcule les quatre dérivées, on compare. Si les équations ne sont vraies qu'en un point, f n'est holomorphe sur aucun ouvert.",
      lines: [
        L('f(z) = sinh z : u = sinh x cos y, v = cosh x sin y', 'Partie réelle et imaginaire'),
        L('u_x = cosh x cos y = v_y', 'Première équation'),
        L('u_y = −sinh x sin y = −v_x', 'Seconde équation, avec le signe −'),
        L('f est holomorphe sur ℂ, f′(z) = cosh z', 'f′ = u_x + i v_x'),
        L('f(z) = z·Re z = x² + ixy : 2x = x et 0 = −y', 'Seulement en z = 0 : holomorphe nulle part'),
      ],
    },
  }),
  S("c-harmonic-conj", {
    prereqs: ["c-cauchy-riemann"],
    icon: 'u+iv',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Construire f holomorphe à partir de v",
    desc: 'Δv = 0, puis u par Cauchy-Riemann, puis f en z, à une constante réelle près.',
    prereqWhy: { "c-cauchy-riemann": "u_x = v_y et u_y = −v_x" },
    intro: {
      rule: "v doit être harmonique (Δv = 0). u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α. Pour écrire f en z : sur l'axe réel f(x) = u(x, 0) + i v(x, 0), puis on remplace x par z. La constante est <b>réelle</b> : v = Im f est imposée.",
      lines: [
        L('v = 2xy + 3y : Δv = 0 + 0 = 0', 'v est harmonique'),
        L('u_x = v_y = 2x + 3, donc u = x² + 3x + α(y)', 'Intégrer en x'),
        L('u_y = α′(y) = −v_x = −2y, donc α = −y² + C', 'Comparer'),
        L('f(x) = x² + 3x + C, donc f(z) = z² + 3z + C, C ∈ ℝ', 'Écrire en z'),
      ],
    },
  }),
  S("c-contour-param", {
    prereqs: ["c-elem-fn", "v-curve-param"],
    icon: '∫γ',
    examWeight: 1,
    exam: ["mcq"],
    title: "Intégrales de contour par paramétrisation",
    desc: '∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramétrer, dériver, remplacer, intégrer.',
    prereqWhy: { "c-elem-fn": "e^(it) et fonctions de z évaluées sur le contour", "v-curve-param": "paramétrer le segment ou le cercle" },
    intro: {
      rule: "∫_γ f(z) dz = ∫ₐᵇ f(γ(t)) γ′(t) dt, avec γ à valeurs complexes : <b>dz = γ′(t) dt</b>. Segment de p à q : γ(t) = p + (q − p)t, t ∈ [0 ; 1]. Cercle de centre z₀ et de rayon R : γ(t) = z₀ + R e^(it), t ∈ [0 ; 2π], γ′(t) = iR e^(it).",
      lines: [
        L('γ(t) = e^(it), t ∈ [0 ; 2π], γ′(t) = i e^(it)', 'Le cercle unité'),
        L('∮ z̄ dz = ∫₀^{2π} e^(−it) · i e^(it) dt', 'z̄ = e^(−it) sur le cercle'),
        L('= ∫₀^{2π} i dt = 2πi', 'z̄ n\'est pas holomorphe : ∮ ≠ 0'),
      ],
    },
  }),
  S("c-cauchy-thm", {
    prereqs: ["c-cauchy-riemann"],
    icon: '∮=0',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Théorème de Cauchy",
    desc: 'f holomorphe sur un simplement connexe qui contient Γ : ∮ f dz = 0. Où sont les singularités ?',
    prereqWhy: { "c-cauchy-riemann": "f holomorphe sur Ω" },
    intro: {
      rule: "Si f est holomorphe sur un ouvert simplement connexe Ω qui contient la courbe fermée Γ, alors ∮_Γ f dz = 0. On cherche donc les singularités (zéros du dénominateur) et on compare leur distance au centre avec le rayon : <b>dehors</b> (Cauchy : 0), <b>sur</b> Γ (l'intégrale n'est pas définie), ou <b>dedans</b> (il faut les résidus).",
      lines: [
        L('∮_{|z|=1} e^z/cos z dz', 'Singularités : cos z = 0'),
        L('cos z = 0 ⟺ z = π/2 + kπ', 'Aussi dans ℂ'),
        L('|±π/2| ≈ 1,57 > 1', 'Toutes hors du disque fermé'),
        L('f holomorphe sur |z| < π/2 : ∮ = 0', 'Théorème de Cauchy'),
      ],
    },
  }),
  S("c-cauchy-formula", {
    prereqs: ["c-cauchy-thm"],
    icon: 'n!/2πi',
    examWeight: 1,
    exam: ["mcq"],
    title: "Formule intégrale de Cauchy",
    desc: '∮ g(z)/(z − z₀)ⁿ⁺¹ dz = 2πi g⁽ⁿ⁾(z₀)/n! : la puissance est n + 1.',
    prereqWhy: { "c-cauchy-thm": "placer les singularités par rapport à Γ" },
    intro: {
      rule: "g holomorphe, z₀ à l'intérieur de Γ : g⁽ⁿ⁾(z₀) = n!/(2πi) ∮_Γ g(z)/(z − z₀)<sup>n+1</sup> dz. On lit donc ∮ g/(z − z₀)<sup>n+1</sup> dz = 2πi g⁽ⁿ⁾(z₀)/n! : la <b>puissance est n + 1</b>, et on <b>divise par n!</b>.",
      lines: [
        L('∮_{|z|=1} e^(2z)/z³ dz', 'g(z) = e^(2z), z₀ = 0, n + 1 = 3 donc n = 2'),
        L('g″(z) = 4e^(2z)', 'Dériver deux fois'),
        L('∮ = 2πi · 4/2! = 4πi', 'Diviser par n! = 2'),
      ],
    },
  }),
  S("c-taylor", {
    prereqs: ["a1-pow-domain", "a1-ser-geo-tele"],
    icon: 'Σaₙzⁿ',
    examWeight: 1,
    exam: ["mcq", "coef", "open"],
    title: "Série de Taylor et rayon de convergence",
    desc: 'Se ramener à 1/(1 − w) = Σ wⁿ ; le rayon est la distance à la singularité la plus proche.',
    prereqWhy: { "a1-ser-geo-tele": "série géométrique 1/(1 − u)", "a1-pow-domain": "le rayon d'une série entière" },
    intro: {
      rule: "Une fonction holomorphe sur le disque |z − z₀| < R est égale à sa série de Taylor sur ce disque ; le rayon est la <b>distance de z₀ à la singularité la plus proche</b>. Pour une fraction, on se ramène à 1/(1 − w) = Σ wⁿ, |w| < 1 ; attention au signe : 1/(1 + w) = Σ (−1)ⁿ wⁿ.",
      lines: [
        L('1/(3 + z²) = (1/3) · 1/(1 − (−z²/3))', 'Faire apparaître 1/(1 − w)'),
        L('= Σ (−1)ⁿ z^(2n)/3^(n+1)', 'w = −z²/3'),
        L('rayon √3', 'Singularités ±i√3, à distance √3 de 0'),
      ],
    },
  }),
  S("c-laurent", {
    prereqs: ["c-taylor", "g0-pfd-simple"],
    icon: 'Σℤ',
    examWeight: 2,
    exam: ["mcq", "coef", "open"],
    title: "Série de Laurent dans une couronne donnée",
    desc: 'Éléments simples, puis chaque 1/(z − a) en puissances de z/a ou de a/z selon la couronne.',
    prereqWhy: { "c-taylor": "développer en série autour de z₀", "g0-pfd-simple": "décomposer en éléments simples" },
    intro: {
      rule: "Dans une couronne r < |z − z₀| < R, f = Σ_{n∈ℤ} aₙ(z − z₀)ⁿ. On décompose en éléments simples, puis chaque 1/(z − a) se développe selon la couronne : si <b>|z| < |a|</b>, en puissances de z/a ; si <b>|z| > |a|</b>, en puissances de a/z. La même fonction a une série par région.",
      lines: [
        L('1/((z − 1)(z − 2)) = 1/(z − 2) − 1/(z − 1)', 'Éléments simples'),
        L('|z| < 2 : 1/(z − 2) = −Σ zⁿ/2^(n+1)', 'Puissances de z'),
        L('|z| > 1 : 1/(z − 1) = Σ 1/z^(n+1)', 'Puissances de 1/z'),
        L('1 < |z| < 2 : f = −Σ zⁿ/2^(n+1) − Σ 1/z^(n+1)', 'Assembler'),
      ],
    },
  }),
  S("c-singularities", {
    prereqs: ["c-laurent", "a1-dl-usual"],
    icon: 'z₀?',
    examWeight: 1,
    exam: ["mcq", "open"],
    title: "Classer les singularités",
    desc: 'Apparente, pôle d\'ordre m, essentielle : ordre du zéro en bas moins ordre du zéro en haut.',
    prereqWhy: { "c-laurent": "lire la plus basse puissance de la série de Laurent", "a1-dl-usual": "l'ordre d'un zéro par le DL" },
    intro: {
      rule: "Singularité isolée z₀ : <b>apparente</b> (pas de puissance négative, la limite est finie), <b>pôle d'ordre m</b> (la plus basse puissance est (z − z₀)^(−m)), <b>essentielle</b> (une infinité de puissances négatives, e^(1/z)). Pour un quotient : ordre du pôle = ordre du zéro du dénominateur − ordre du zéro du numérateur (apparente si ≤ 0).",
      lines: [
        L('(e^(z−π) − 1)/sin² z en π', 'h = z − π'),
        L('e^h − 1 = h + o(h) : zéro d\'ordre 1', 'Le numérateur'),
        L('sin z = −h + o(h), donc sin² z a un zéro d\'ordre 2', 'Le dénominateur'),
        L('2 − 1 = 1 : pôle simple', 'Pas un pôle double'),
      ],
    },
  }),
];
