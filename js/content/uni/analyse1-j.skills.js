// Module A1, part j (unit `analyse1`, step U4): limits of functions and
// epsilon-delta. Catalogue: docs/universite/A1-analyse-1.md, « Fonctions :
// limites et continuité ». Skills: a1-fn-limits, a1-fn-onesided,
// a1-fn-extension, a1-fn-epsdelta-def, a1-fn-epsdelta. Generators:
// js/content/uni/analyse1-j.js; traps: js/cas/rules/a1j.js.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-fn-limits', {
    prereqs: ['a1-seq-limits', 'g3-identities'], icon: 'lim f', examWeight: 3, exam: ['mcq', 'tf', 'open'],
    title: 'Limites de fonctions : formes indéterminées, croissances comparées, équivalents',
    desc: 'Limites remarquables, conjugué, e^(v·Log u), 0 × (borné).',
    prereqWhy: {
      'a1-seq-limits': 'mêmes techniques de levée d\'indétermination (mettre en facteur, conjugué)',
      'g3-identities': '1 − cos u = 2 sin²(u/2) explique (1 − cos u)/u² → 1/2',
    },
    intro: {
      rule: 'Limites remarquables quand u → 0 : sin u/u → 1, (1 − cos u)/u² → 1/2, Log(1 + u)/u → 1, (eᵘ − 1)/u → 1, Arctg u/u → 1. Croissances comparées : xᵃ·|Log x|ᵇ → 0 en 0⁺.<br>On fait apparaître u au haut <b>et</b> au bas, en <b>produit</b> : un équivalent ne se remplace jamais dans une somme. 0 × (borné) n\'est pas indéterminé : ça tend vers 0.',
      lines: [
        { cas: 'lim((1-cos(3x))/(x×sin(2x)),x,0)', note: 'Départ : forme 0/0', noEq: true },
        { cas: 'lim(((1-cos(3x))/(3x)^2)×((2x)/sin(2x))×(9/2),x,0)', note: 'Faire apparaître les limites remarquables (produit)' },
        { cas: '(1/2)×1×(9/2)', note: 'Limites remarquables' },
        { cas: '9/4', note: 'Conclure' },
      ],
    },
  }),
  S('a1-fn-onesided', {
    prereqs: ['a1-fn-limits'], icon: 'x→a±', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Limites à gauche et à droite ; limite qui n\'existe pas',
    desc: '|x − a|, e^(1/x), Arctg(1/x) ; deux côtés différents : pas de limite.',
    prereqWhy: { 'a1-fn-limits': 'calculer chaque limite latérale' },
    intro: {
      rule: 'La limite en x₀ existe si et seulement si les limites à gauche et à droite existent et sont <b>égales</b>. À calculer à part : |x − x₀|, e^(1/x), Arctg(1/x), fonctions par morceaux.<br>Pour montrer qu\'une limite n\'existe pas : deux suites xₙ → x₀ avec f(xₙ) de limites différentes (sin(1/x)).',
      lines: [
        { cas: '(x^2-4)/abs(x-2)', note: 'Départ : en 2', noEq: true },
        { html: 'x > 2 : f(x) = (x − 2)(x + 2)/(x − 2) = x + 2 → 4', note: 'Limite à droite', noEq: true },
        { html: 'x < 2 : f(x) = (x − 2)(x + 2)/(−(x − 2)) = −(x + 2) → −4', note: 'Limite à gauche : |x − 2| = −(x − 2)', noEq: true },
        { html: '4 ≠ −4 : la limite en 2 n\'existe pas', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S('a1-fn-extension', {
    prereqs: ['a1-fn-onesided', 'rat-simplify'], icon: 'f(c) = ℓ', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Prolongement par continuité, continuité d\'une fonction par morceaux',
    desc: 'Limite de chaque morceau = valeur au point.',
    prereqWhy: { 'a1-fn-onesided': 'la limite de chaque morceau est une limite latérale', 'rat-simplify': 'simplifier le quotient par (x − c) avant de passer à la limite' },
    intro: {
      rule: 'f est continue en x₀ si lim<sub>x→x₀</sub> f(x) = f(x₀). Une fonction définie sur ℝ ∖ {x₀} se prolonge par continuité si sa limite en x₀ existe et est finie.<br>Pour une fonction par morceaux, la limite de <b>chaque</b> morceau, avec la formule de son côté, doit valoir la valeur au point.',
      lines: [
        { html: 'f(x) = (x² − 9)/(x² − 3x) si x > 3, a si x = 3, bx² + 1 si x < 3', note: 'Départ', noEq: true },
        { html: 'x > 3 : f(x) = (x − 3)(x + 3)/(x(x − 3)) = (x + 3)/x → 2', note: 'Factoriser, simplifier : limite à droite', noEq: true },
        { html: 'a = 2 ; lim<sub>x→3⁻</sub> (bx² + 1) = 9b + 1 = 2, donc b = 1/9', note: 'Égaler à f(3)', noEq: true },
      ],
    },
  }),
  S('a1-fn-epsdelta-def', {
    prereqs: ['g9-quant-write'], icon: '∀ε ∃δ', examWeight: 1, exam: ['tf', 'open'],
    title: 'Écrire la définition ε-δ d\'une limite et de la continuité',
    desc: '∀ε > 0 ∃δ > 0 ∀x : 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε.',
    prereqWhy: { 'g9-quant-write': 'écrire une définition avec des quantificateurs dans le bon ordre' },
    intro: {
      rule: 'lim<sub>x→x₀</sub> f(x) = L ⇔ ∀ε > 0 ∃δ > 0 ∀x ∈ D : 0 < |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε.<br>Continuité en x₀ : même chose avec L = f(x₀), sans le « 0 < ». δ dépend de ε (et de x₀), jamais de x. ε mesure l\'écart des valeurs, δ celui des x.',
      lines: [
        { html: '∀ε > 0', note: 'Quantifier ε', noEq: true },
        { html: '∃δ > 0', note: 'δ dépend de ε', noEq: true },
        { html: '∀x ∈ D : 0 < |x − x₀| ≤ δ', note: 'x proche de x₀, x ≠ x₀', noEq: true },
        { html: '⇒ |f(x) − L| ≤ ε', note: 'f(x) proche de L', noEq: true },
      ],
    },
  }),
  S('a1-fn-epsdelta', {
    prereqs: ['a1-fn-epsdelta-def', 'g1-bound'], icon: 'δ(ε)', examWeight: 1, exam: ['tf', 'open'],
    title: 'Trouver δ(ε) : prouver une limite par la définition',
    desc: '|f(x) − L| ≤ M·|x − x₀|, puis δ = ε/M (ou min(1 ; ε/M)).',
    prereqWhy: { 'a1-fn-epsdelta-def': 'la définition ε-δ dit ce qu\'il faut prouver' },
    intro: {
      rule: 'On écrit |f(x) − L| en fonction de |x − x₀|. Affine : |f(x) − L| = |a|·|x − x₀|, donc δ = ε/|a|.<br>Quadratique : on impose d\'abord |x − x₀| ≤ 1 pour borner l\'autre facteur par M, puis δ = min(1 ; ε/M). δ ne dépend que de ε.',
      lines: [
        { cas: 'abs((3-4x)-7)', note: 'Départ : lim (3 − 4x) = 7 en −1', noEq: true },
        { cas: 'abs(-4x-4)', note: 'Écrire l\'écart' },
        { cas: '4abs(x+1)', note: 'Faire apparaître |x − x₀| = |x + 1|' },
        { html: 'δ = ε/4 : si 0 < |x + 1| ≤ ε/4, alors |f(x) − 7| ≤ 4·ε/4 = ε', note: 'Choisir δ, conclure', noEq: true },
      ],
    },
  }),
];
