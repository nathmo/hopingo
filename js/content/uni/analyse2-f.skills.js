// Module A2, part f (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-fubini-rect", {
    prereqs: ["a1-int-direct"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Intégrale double sur un rectangle ; symétries",
    desc: '',
    intro: { rule: "Sur un rectangle, Fubini permet d'intégrer dans l'ordre qu'on veut. Si f(x, y) = g(x)·h(y), l'intégrale est le produit des deux intégrales. Si le domaine est symétrique par rapport à y = 0 et f impaire en y (f(x, −y) = −f(x, y)), l'intégrale est nulle. <b>Les deux conditions sont nécessaires.</b>", lines: [] },
  }),
  S("a2-domain-describe", {
    prereqs: ["a2-fubini-rect", "g10-circle-eq"], icon: '', examWeight: 2, exam: ["mcq"],
    title: "Décrire un domaine : types I et II, depuis les polaires",
    desc: '',
    prereqWhy: {"a2-fubini-rect": "intégrale itérée", "g10-circle-eq": "disques et cercles dans les bornes"},
    intro: { rule: "Type I : a ≤ x ≤ b, φ₁(x) ≤ y ≤ φ₂(x) (des bornes en y qui dépendent de x). Type II : c ≤ y ≤ d, ψ₁(y) ≤ x ≤ ψ₂(y). Les bornes extérieures sont <b>des nombres</b>. On dessine d'abord, on lit les courbes qui bordent, on trouve leurs intersections.", lines: [] },
  }),
  S("a2-fubini-swap", {
    prereqs: ["a2-domain-describe"], icon: '', examWeight: 3, exam: ["mcq"],
    title: "Changer l'ordre d'intégration",
    desc: '',
    intro: { rule: "Quand l'intégrale intérieure n'a pas de primitive élémentaire (e^{y³}, sin(y²), 1/(1 + y²⁰)), on change l'ordre. Méthode : écrire D par ses inégalités, le dessiner, le décrire dans l'autre type. La nouvelle variable extérieure a des bornes <b>numériques</b>.", lines: [] },
  }),
  S("a2-triple-int", {
    prereqs: ["a2-domain-describe"], icon: '', examWeight: 1, exam: ["mcq"],
    title: "Intégrales triples par Fubini",
    desc: '',
    prereqWhy: {"a2-domain-describe": "la projection se décrit comme en 2D"},
    intro: { rule: "On décrit D par des « tranches » : z entre deux surfaces qui dépendent de (x, y), puis (x, y) dans la projection de D, décrite comme en 2D.", lines: [] },
  }),
  S("a2-change-var", {
    prereqs: ["a2-domain-describe", "a2-partials", "l-det-cofactor"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Changement de variables et jacobien",
    desc: '',
    prereqWhy: {"a2-domain-describe": "décrire le nouveau domaine", "l-det-cofactor": "det J_G"},
    intro: { rule: "Si G : D̃ → D est une bijection C¹ (avec det J_G ≠ 0), ∬_D f(x, y) dx dy = ∬_{D̃} f(G(u, v))·|det J_G(u, v)| du dv. Valeur absolue, et jacobien de G (nouvelles → anciennes variables). Si on connaît plutôt u(x, y), v(x, y) : |det J_G| = 1/|det J_{G⁻¹}|. D̃ s'obtient en écrivant les inégalités de D avec u et v.", lines: [] },
  }),
];
