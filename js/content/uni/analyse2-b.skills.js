// Module A2, part b (unit `analyse2`, step U6): limits and continuity in two
// variables, directional derivatives and differentiability by the
// definition, the implications between C¹, differentiable and partial
// derivatives. Catalogue: docs/universite/A2-analyse-2.md, « Limites et
// continuité » and « Différentiabilité ». Generators: analyse2-b.js.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-lim-paths", {
    prereqs: ["a1-fn-limits", "rat-simplify"], icon: 'y = x²', examWeight: 3, exam: ["mcq", "tf"],
    title: "Limite qui n'existe pas : deux chemins",
    desc: 'Les droites y = mx, puis une courbe y = xᵖ : deux valeurs, pas de limite.',
    prereqWhy: { "a1-fn-limits": "limite à une variable le long d'un chemin", "rat-simplify": 'simplifier f restreinte à un chemin' },
    intro: {
      rule: "Si deux chemins vers a donnent deux limites différentes, la limite n'existe pas. <b>Les droites ne suffisent pas</b> : si le numérateur et le dénominateur ont des poids différents en x et en y, on essaie y = k·x^p, avec p choisi pour que les termes du dénominateur aient le même ordre.",
      lines: [
        { html: 'f(x, y) = 3x²y/(x⁴ + 2y²)', note: 'Départ', noEq: true },
        { html: 'Droites y = mx : f(x, mx) = 3mx³/(x⁴ + 2m²x²) = 3mx/(x² + 2m²) → 0', note: 'Simplifier par x², puis x → 0', noEq: true },
        { html: 'Chemin y = x² : f(x, x²) = 3x⁴/(x⁴ + 2x⁴) = 1 → 1', note: 'x⁴ et y² = x⁴ ont le même ordre', noEq: true },
        { html: '0 ≠ 1 : la limite en (0, 0) n\'existe pas', note: 'Deux valeurs : 0 et 1', noEq: true },
      ],
    },
  }),
  S("a2-lim-polar", {
    prereqs: ["a1-seq-squeeze", "g1-bound"], icon: 'r → 0', examWeight: 3, exam: ["mcq", "tf"],
    title: "Limite qui existe : coordonnées polaires et gendarmes",
    desc: 'x = r cos φ, y = r sin φ ; |f − L| ≤ g(r) → 0, sans φ.',
    prereqWhy: { "a1-seq-squeeze": "principe des gendarmes", "g1-bound": 'majorer |cos φ| et |sin φ| par 1' },
    intro: {
      rule: "On pose x = r cos φ, y = r sin φ. Si |f − L| ≤ g(r) avec g(r) → 0 et <b>g indépendante de φ</b>, la limite vaut L. Un équivalent à une variable aide : sin u ~ u, e^u − 1 ~ u, avec u = x² + y². Si l'expression polaire dépend encore de φ quand r → 0, la limite n'existe pas.",
      lines: [
        { html: 'f = (2x³ − xy² + y⁴)/(x² + y²)', note: 'Départ', noEq: true },
        { html: 'f = (r³(2cos³φ − cos φ sin²φ) + r⁴ sin⁴φ)/r²', note: 'x = r cos φ, y = r sin φ', noEq: true },
        { html: 'f = r(2cos³φ − cos φ sin²φ) + r² sin⁴φ', note: 'Simplifier par r²', noEq: true },
        { html: '|f| ≤ 3r + r²', note: '|cos φ|, |sin φ| ≤ 1', noEq: true },
        { html: '3r + r² → 0, donc lim f = 0', note: 'Gendarmes', noEq: true },
      ],
    },
  }),
  S("a2-continuity", {
    prereqs: ["a2-lim-polar", "a1-fn-extension"], icon: 'f(0, 0) = a', examWeight: 2, exam: ["mcq", "tf"],
    title: "Continuité et prolongement par continuité",
    desc: 'Étudier seulement les points où la formule change ; poser f(a) = lim f.',
    prereqWhy: { "a2-lim-polar": 'calculer la limite en (0, 0)', "a1-fn-extension": 'prolonger par la limite' },
    intro: {
      rule: "f est continue en a si lim_{x→a} f(x) = f(a). Une fonction définie hors de a se prolonge par continuité si la limite en a existe ; on pose alors f(a) = cette limite. Les sommes, produits et compositions de fonctions continues sont continus ; seuls les points où la formule change sont à étudier.",
      lines: [
        { html: 'f(x, y) = sin(x² + y²)/(x² + y²) si (x, y) ≠ (0, 0), f(0, 0) = a', note: 'Départ', noEq: true },
        { html: 'Hors de (0, 0), f est continue', note: 'Quotient de fonctions continues, dénominateur ≠ 0', noEq: true },
        { html: 'u = x² + y² → 0 et sin u/u → 1', note: 'Limite en (0, 0)', noEq: true },
        { html: 'a = 1', note: 'f(0, 0) = la limite', noEq: true },
      ],
    },
  }),
  S("a2-dir-deriv-def", {
    prereqs: ["a2-partials", "a1-deriv-def"], icon: 'D_v f', examWeight: 3, exam: ["mcq", "tf"],
    title: "Dérivées partielles et directionnelles par la définition",
    desc: 'D_v f(a) = lim (f(a + tv) − f(a))/t, sans passer par ∇f·v.',
    prereqWhy: { "a2-partials": "comparer avec ∇f·v", "a1-deriv-def": "taux d'accroissement et limite quand t → 0" },
    intro: {
      rule: "D_v f(a) = lim_{t→0} (f(a + tv) − f(a))/t. Pour une fonction définie par morceaux, en a, on <b>doit</b> utiliser la définition : la formule ∇f(a)·v ne vaut que si f est différentiable en a. Les dérivées partielles sont les cas v = e₁, e₂.",
      lines: [
        { html: 'f = x²y/(x⁴ + y²), f(0, 0) = 0, v = (3/5 ; 4/5)', note: 'Départ', noEq: true },
        { html: 'f(tv)/t = (36/125)/(81t²/625 + 16/25)', note: 'Remplacer (x, y) par t·v, diviser par t', noEq: true },
        { html: 'D_v f(0, 0) = (36/125)/(16/25) = 9/20', note: 't → 0', noEq: true },
        { html: '∂f/∂x(0, 0) = ∂f/∂y(0, 0) = 0, donc ∇f·v = 0 ≠ 9/20', note: 'f n\'est pas différentiable en (0, 0)', noEq: true },
      ],
    },
  }),
  S("a2-diff-def", {
    prereqs: ["a2-dir-deriv-def", "a2-lim-paths", "a2-lim-polar"], icon: 'R/‖h‖', examWeight: 2, exam: ["mcq", "tf"],
    title: "Différentiabilité en un point par la définition",
    desc: 'Dérivées partielles, reste R(h), puis R/‖h‖ → 0 en polaires.',
    prereqWhy: { "a2-dir-deriv-def": 'dérivées partielles par la définition', "a2-lim-paths": "le reste divisé par ‖h‖ peut ne pas tendre vers 0 le long d'un chemin", "a2-lim-polar": 'limite de R/‖h‖ en polaires' },
    intro: {
      rule: "f est différentiable en a si R(h) = f(a + h) − f(a) − ∇f(a)·h vérifie R(h)/‖h‖ → 0. Méthode : (1) dérivées partielles par la définition ; (2) reste ; (3) limite du reste divisé par ‖h‖, en polaires.",
      lines: [
        { html: 'f = (x³ + y³)/(x² + y²), f(0, 0) = 0', note: 'Départ', noEq: true },
        { html: '∂f/∂x(0, 0) = lim h³/h³ = 1 ; ∂f/∂y(0, 0) = 1', note: 'Dérivées partielles par la définition', noEq: true },
        { html: 'R(h, k) = (h³ + k³)/(h² + k²) − h − k = −hk(h + k)/(h² + k²)', note: 'Reste', noEq: true },
        { html: 'R/‖(h, k)‖ = −cos φ sin φ (cos φ + sin φ)', note: 'En polaires : dépend de φ', noEq: true },
        { html: 'Elle vaut −√2/2 pour φ = π/4 : f n\'est pas différentiable en (0, 0)', note: 'Conclure', noEq: true },
      ],
    },
  }),
  S("a2-diff-implications", {
    prereqs: ["a2-diff-def", "a2-continuity", "g9-counterexample"], icon: 'C¹ ⇒', examWeight: 3, exam: ["mcq", "tf"],
    title: "C¹, différentiable, dérivées partielles : qui implique quoi",
    desc: 'Les flèches du cours, et un contre-exemple (K1 à K7) pour chaque réciproque.',
    prereqWhy: { "a2-diff-def": "définition de la différentiabilité", "a2-continuity": "différentiable ⇒ continue", "g9-counterexample": "réfuter une implication par un contre-exemple" },
    intro: {
      rule: "C¹ ⇒ différentiable ⇒ (continue, et D_v f = ∇f·v pour tout v) ⇒ dérivées partielles. <b>Aucune réciproque n'est vraie</b>, et « dérivées partielles en a » n'implique même pas « continue en a ». Chaque flèche refusée a un contre-exemple à connaître.",
      lines: [
        { html: 'K1 = xy/(x² + y²) : dérivées partielles nulles en (0, 0), pas continue (y = x donne 1/2)', note: 'Partielles ⇏ continue', noEq: true },
        { html: 'K2 = x²y/(x⁴ + y²) : toutes les D_v f existent, pas continue (y = x² donne 1/2)', note: 'Directionnelles ⇏ différentiable', noEq: true },
        { html: 'K3 = (x² + y²) sin(1/√(x² + y²)) : différentiable, pas C¹', note: 'Différentiable ⇏ C¹', noEq: true },
        { html: 'K4 = xy²/(x² + y²) : continue, D_v f = v₁v₂², pas linéaire en v', note: 'Continue et directionnelles ⇏ différentiable', noEq: true },
        { html: 'K5 = √|xy| : continue, partielles nulles, pas de D_v f pour v = (1, 1)/√2', note: 'Partielles ⇏ directionnelles', noEq: true },
      ],
    },
  }),
];
