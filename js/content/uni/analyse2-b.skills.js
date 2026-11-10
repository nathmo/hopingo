// Module A2, part b (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-lim-paths", {
    prereqs: ["a1-fn-limits", "rat-simplify"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Limite qui n'existe pas : deux chemins",
    desc: '',
    prereqWhy: {"a1-fn-limits": "limite à une variable le long d'un chemin"},
    intro: { rule: "Si deux chemins vers a donnent deux limites différentes, la limite n'existe pas. <b>Les droites ne suffisent pas</b> : si le numérateur et le dénominateur ont des poids différents en x et en y, on essaie y = k·x^p, avec p choisi pour que les termes du dénominateur aient le même ordre.", lines: [] },
  }),
  S("a2-lim-polar", {
    prereqs: ["a1-seq-squeeze", "g1-bound"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Limite qui existe : coordonnées polaires et gendarmes",
    desc: '',
    prereqWhy: {"a1-seq-squeeze": "principe des gendarmes"},
    intro: { rule: "On pose x = r cos φ, y = r sin φ. Si |f − L| ≤ g(r) avec g(r) → 0 et <b>g indépendante de φ</b>, la limite vaut L. Un équivalent à une variable aide : sin u ~ u, e^u − 1 ~ u, avec u = x² + y². Si l'expression polaire dépend encore de φ quand r → 0, la limite n'existe pas.", lines: [] },
  }),
  S("a2-continuity", {
    prereqs: ["a2-lim-polar", "a1-fn-extension"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Continuité et prolongement par continuité",
    desc: '',
    intro: { rule: "f est continue en a si lim_{x→a} f(x) = f(a). Une fonction définie hors de a se prolonge par continuité si la limite en a existe ; on pose alors f(a) = cette limite. Les sommes, produits et compositions de fonctions continues sont continus ; seuls les points où la formule change sont à étudier.", lines: [] },
  }),
  S("a2-dir-deriv-def", {
    prereqs: ["a2-partials", "a1-deriv-def"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Dérivées partielles et directionnelles par la définition",
    desc: '',
    prereqWhy: {"a2-partials": "comparer avec ∇f·v", "a1-deriv-def": "taux d'accroissement et limite quand t → 0"},
    intro: { rule: "D_v f(a) = lim_{t→0} (f(a + tv) − f(a))/t. Pour une fonction définie par morceaux, en a, on <b>doit</b> utiliser la définition : la formule ∇f(a)·v ne vaut que si f est différentiable en a. Les dérivées partielles sont les cas v = e₁, e₂.", lines: [] },
  }),
  S("a2-diff-def", {
    prereqs: ["a2-dir-deriv-def", "a2-lim-paths", "a2-lim-polar"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Différentiabilité en un point par la définition",
    desc: '',
    prereqWhy: {"a2-lim-paths": "le reste divisé par ‖h‖ peut ne pas tendre vers 0 le long d'un chemin"},
    intro: { rule: "f est différentiable en a si R(h) = f(a + h) − f(a) − ∇f(a)·h vérifie R(h)/‖h‖ → 0. Méthode : (1) dérivées partielles par la définition ; (2) reste ; (3) limite du reste divisé par ‖h‖, en polaires.", lines: [] },
  }),
  S("a2-diff-implications", {
    prereqs: ["a2-diff-def", "a2-continuity", "g9-counterexample"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "C¹, différentiable, dérivées partielles : qui implique quoi",
    desc: '',
    prereqWhy: {"a2-diff-def": "définition de la différentiabilité", "a2-continuity": "différentiable ⇒ continue", "g9-counterexample": "réfuter une implication par un contre-exemple"},
    intro: { rule: "C¹ ⇒ différentiable ⇒ (continue, et D_v f = ∇f·v pour tout v) ⇒ dérivées partielles. <b>Aucune réciproque n'est vraie</b>, et « dérivées partielles en a » n'implique même pas « continue en a ». Chaque flèche refusée a un contre-exemple à connaître.", lines: [] },
  }),
];
