// Module A1, part k (unit `analyse1`, step U4): IVT, image, bisection and fixed point, power series.
// Catalogue: docs/universite/A1-analyse-1.md. Skills: a1-fn-ivt, a1-fn-image, a1-bisection-fixpoint, a1-pow-domain, a1-pow-sums.
// Generators: analyse1-k.js (helpers analyse1-k-*.js); traps: js/cas/rules/a1k.js.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-fn-ivt', {
    prereqs: ['a1-fn-extension', 'a1-deriv-rules'], icon: 'TVI', examWeight: 2, exam: ['tf'],
    title: 'Théorème de la valeur intermédiaire : existence d\'une solution',
    desc: 'f continue sur [a ; b], f(a) et f(b) de signes contraires : f s\'annule.',
    prereqWhy: { 'a1-fn-extension': 'vérifier la continuité sur [a ; b]', 'a1-deriv-rules': 'f′ de signe constant : la solution est unique' },
    intro: {
      rule: 'Si f est <b>continue sur [a ; b]</b> et que f(a) et f(b) sont de signes contraires, alors f s\'annule sur ]a ; b[. Pour f(x) = g(x), on applique le TVI à h = f − g.<br>On énonce le théorème, puis on vérifie ses hypothèses une à une.',
      lines: [
        { html: 'x⁵ + 3x − 1 = 0 : soit f(x) = x⁵ + 3x − 1, continue sur [0 ; 1] (polynôme)', note: 'Fonction et continuité', noEq: true },
        { html: 'f(0) = −1 < 0 et f(1) = 3 > 0', note: 'Signes aux bornes', noEq: true },
        { html: 'Par le TVI, il existe c ∈ ]0 ; 1[ tel que f(c) = 0', note: 'Conclure', noEq: true },
        { html: 'f′(x) = 5x⁴ + 3 > 0 : f est strictement croissante, la solution est unique', note: 'Unicité (en plus)', noEq: true },
      ],
    },
  }),
  S('a1-fn-image', {
    prereqs: ['a1-fn-ivt', 'g6-deriv-rules'], icon: 'f([a ; b])', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Image d\'un intervalle par une fonction continue',
    desc: 'Sur un segment : [min ; max], cherchés aux bornes et là où f′ = 0.',
    prereqWhy: { 'a1-fn-ivt': 'l\'image d\'un intervalle est un intervalle (TVI)', 'g6-deriv-rules': 'dériver f pour trouver ses points critiques' },
    intro: {
      rule: 'L\'image d\'un segment [a ; b] par une fonction continue est le segment [m ; M] : le minimum et le maximum sont atteints. On les cherche <b>aux bornes et aux points où f′ = 0</b>.<br>Sur un intervalle ouvert ou non borné, on remplace les valeurs aux bornes par des limites, et une borne peut ne pas être atteinte.',
      lines: [
        { cas: 'd(e^(-x)×sin(x))', note: 'f(x) = e^(−x)·sin x sur [0 ; π]', noEq: true },
        { cas: 'e^(-x)(cos(x)-sin(x))', note: 'Dériver' },
        { html: 'f′(x) = 0 ⇔ x = π/4 dans [0 ; π]', note: 'Point critique', noEq: true },
        { html: 'f(0) = 0, f(π/4) = (√2/2)·e^(−π/4), f(π) = 0', note: 'Valeurs aux candidats', noEq: true },
        { html: 'f([0 ; π]) = [0 ; (√2/2)·e^(−π/4)]', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-bisection-fixpoint', {
    prereqs: ['a1-fn-ivt', 'a1-mvt'], icon: '[a ; m]', examWeight: 1, exam: ['mcq', 'tf'], tags: ['MT'],
    title: 'Bissection et méthode du point fixe (cours MT)',
    desc: 'Garder la moitié où f change de signe ; g contractante.',
    prereqWhy: { 'a1-fn-ivt': 'chaque moitié gardée contient un zéro (TVI)', 'a1-mvt': '|g′| ≤ k < 1 rend g contractante (accroissements finis)' },
    intro: {
      rule: '<b>Bissection</b> : on coupe [a ; b] en son milieu m et on garde la moitié où f change de signe ; après n étapes, l\'erreur est ≤ (b − a)/2ⁿ.<br><b>Point fixe</b> : si g([a ; b]) ⊂ [a ; b] et |g′| ≤ k < 1 sur [a ; b], la suite xₙ₊₁ = g(xₙ) converge vers l\'unique point fixe de g.',
      lines: [
        { html: 'f(x) = x³ + x − 1 sur [0 ; 1] : f(0) = −1 < 0, f(1) = 1 > 0', note: 'Départ', noEq: true },
        { html: 'm = 0,5 ; f(0,5) = −0,375 < 0 : on garde [0,5 ; 1]', note: 'Étape 1', noEq: true },
        { html: 'm = 0,75 ; f(0,75) ≈ 0,1719 > 0 : on garde [0,5 ; 0,75]', note: 'Étape 2', noEq: true },
        { html: 'Erreur ≤ 1/2ⁿ ≤ 10⁻³ dès que n ≥ 10 (2¹⁰ = 1024)', note: 'Nombre d\'étapes', noEq: true },
        { html: 'g(x) = 1/(1 + x²) : g([0 ; 1]) ⊂ [0 ; 1] et |g′(x)| ≤ 0,65 < 1', note: 'Point fixe contractant', noEq: true },
      ],
    },
  }),
  S('a1-pow-domain', {
    prereqs: ['a1-ser-ratio-root', 'a1-ser-leibniz-abs'], icon: 'R', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Rayon de convergence et domaine, bornes comprises',
    desc: 'ρ par d\'Alembert, R = 1/ρ, puis chaque borne à part.',
    prereqWhy: { 'a1-ser-ratio-root': 'ρ = lim |aₙ₊₁/aₙ| (d\'Alembert)', 'a1-ser-leibniz-abs': 'la nature des séries aux bornes (Leibniz, Riemann)' },
    intro: {
      rule: 'Pour Σ aₙ(x − x₀)ⁿ, d\'Alembert sur |aₙ| donne ρ = lim |aₙ₊₁/aₙ|, et <b>R = 1/ρ</b> (R = +∞ si ρ = 0). La série converge absolument pour |x − x₀| < R et diverge pour |x − x₀| > R.<br><b>Les deux bornes x₀ ± R s\'étudient à part</b> : ce sont des séries numériques.',
      lines: [
        { html: 'Σ_{n≥1} 3ⁿ/(n·2ⁿ⁺¹)·(x − 1)ⁿ : |aₙ₊₁/aₙ| = (3/2)·n/(n + 1) → 3/2', note: 'd\'Alembert', noEq: true },
        { html: 'R = 2/3 : convergence absolue pour |x − 1| < 2/3', note: 'Rayon', noEq: true },
        { html: 'x = 5/3 : Σ 1/(2n) diverge (série harmonique)', note: 'Borne droite', noEq: true },
        { html: 'x = 1/3 : Σ (−1)ⁿ/(2n) converge (Leibniz)', note: 'Borne gauche', noEq: true },
        { html: 'Domaine : [1/3 ; 5/3[', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-pow-sums', {
    prereqs: ['a1-pow-domain', 'a1-dl-usual', 'g5-reindex'], icon: 'Σ xⁿ/n!', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Dériver une série entière ; sommes par MacLaurin',
    desc: 'Reconnaître eˣ, 1/(1 − x) en un point ; changer d\'indice.',
    prereqWhy: { 'a1-pow-domain': 'dériver terme à terme à l\'intérieur du domaine', 'a1-dl-usual': 'les séries de référence eˣ, 1/(1 − x)', 'g5-reindex': 'changer d\'indice pour retrouver la forme exacte' },
    intro: {
      rule: 'À l\'intérieur du domaine, on dérive et on intègre terme à terme (même rayon). Pour <b>sommer</b> une série numérique, on la reconnaît comme une série de MacLaurin en un point : Σ xⁿ/n! = eˣ, Σ xⁿ = 1/(1 − x). On change d\'indice pour retrouver la forme exacte. Tu écris k! avec la touche !.',
      lines: [
        { cas: 'sum((2^k+k)/k!,k,1,∞)', note: 'Départ', noEq: true },
        { cas: 'sum(2^k/k!,k,1,∞)+sum(k/k!,k,1,∞)', note: 'Séparer (deux séries convergentes)' },
        { cas: 'e^2-1+sum(1/(k-1)!,k,1,∞)', note: 'e² sans le terme k = 0 ; k/k! = 1/(k − 1)!' },
        { cas: 'e^2-1+sum(1/j!,j,0,∞)', note: 'Changer d\'indice : j = k − 1' },
        { cas: 'e^2+e-1', note: 'Conclure' },
      ],
    },
  }),
];
