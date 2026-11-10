// Module G7, combinatoire et probabilités élémentaires (unit `combi`, step
// U7). Catalogue: docs/universite/G-gymnase-2.md, « G7 ». Generators:
// combi.js; traps: js/cas/rules/g7.js. needsSolo is true for every G skill
// (catalogue convention), except the flash exercise g7-which-count.
// Prerequisite of the algebra plan: @alg:C-identites = lit-identities.

export const UNIT = { id: 'combi', title: 'Combinatoire et probabilités', color: '#74b816', ready: true };

const S = (id, year, rest) => ({ id, unit: 'combi', year, optional: false, needsSolo: true, ...rest });

export const SKILLS = [
  S('g7-mult-principle', 12, {
    prereqs: [], icon: "×→", examWeight: 1, exam: ["mcq", "tf"], tags: [],
    title: "Principe multiplicatif",
    desc: "Un choix en plusieurs étapes indépendantes (« et ») : on multiplie les nombres de possibilités.",
    intro: { rule: "Un choix en plusieurs étapes indépendantes (« et ») : on <b>multiplie</b> les nombres de possibilités. Des cas qui s'excluent (« ou ») : on <b>additionne</b>. Un arbre ou des cases à remplir aident à compter." },
  }),
  S('g7-perm-arr', 12, {
    prereqs: ["g7-mult-principle"], icon: "n!", examWeight: 1, exam: ["mcq", "tf"], tags: [],
    title: "Factorielles, permutations, arrangements, anagrammes",
    desc: "N objets distincts en ligne : n!",
    prereqWhy: {"g7-mult-principle": "n! et A(n, k) viennent du principe multiplicatif"},
    intro: { rule: "N objets distincts en ligne : n! façons. k places parmi n, ordre compté, sans répétition : A(n, k) = n·(n − 1)···(n − k + 1) = n!/(n − k)!. Anagrammes d'un mot avec des lettres répétées : n!/(n₁!·n₂!···). Simplifier : (n + 1)! = (n + 1)·n!." },
  }),
  S('g7-combinations', 12, {
    prereqs: ["g7-perm-arr"], icon: "C(n,k)", examWeight: 2, exam: ["mcq", "tf", "open"], tags: [],
    title: "Combinaisons, triangle de Pascal",
    desc: "Choisir k objets parmi n, sans ordre : C(n, k) = n!/(k!(n − k)!) = A(n, k)/k!.",
    prereqWhy: {"g7-perm-arr": "C(n, k) = A(n, k)/k!"},
    intro: { rule: "Choisir k objets parmi n, sans ordre : C(n, k) = n!/(k!(n − k)!) = A(n, k)/k!. C(n, k) = C(n, n − k). Pascal : C(n, k) = C(n − 1, k − 1) + C(n − 1, k). Choix dans plusieurs groupes : on multiplie les C." },
  }),
  S('g7-which-count', 12, {
    prereqs: ["g7-combinations"], icon: "2×2", examWeight: 1, exam: ["mcq"], tags: [],
    needsSolo: false,
    title: "Ordonné ou pas ? Avec ou sans remise ? (exercice éclair)",
    desc: "Deux questions avant tout calcul.",
    intro: { rule: "Deux questions avant tout calcul. L'ordre compte-t-il (podium, code) ou non (main de cartes, comité) ? Peut-on reprendre le même objet (code, dé lancé plusieurs fois) ou non (tirage sans remise, personnes) ? Quatre cases : nᵏ (ordre, avec remise), A(n, k) (ordre, sans remise), C(n, k) (sans ordre, sans remise), C(n + k − 1, k) (sans ordre, avec remise ; seulement en L4–L5)." },
  }),
  S('g7-binomial', 12, {
    prereqs: ["g7-combinations", "g5-sigma", "lit-identities"], icon: "(a+b)ⁿ", examWeight: 1, exam: ["mcq", "tf"], tags: [],
    title: "Binôme de Newton",
    desc: "(a + b)ⁿ = Σₖ₌₀ⁿ C(n, k)·aⁿ⁻ᵏ·bᵏ.",
    intro: { rule: "(a + b)ⁿ = Σₖ₌₀ⁿ C(n, k)·aⁿ⁻ᵏ·bᵏ. Pour un terme précis : on écrit le terme général, avec <b>tous</b> ses facteurs (coefficients et signes de a et b), on cherche k qui donne la bonne puissance de x, puis on calcule." },
  }),
  S('g7-laplace', 12, {
    prereqs: ["g7-which-count"], icon: "#/#", examWeight: 0, exam: ["mcq"], tags: ["opt"],
    title: "Probabilité de Laplace",
    desc: "Si toutes les issues sont équiprobables, P(A) = (nombre de cas favorables)/(nombre de cas possibles).",
    prereqWhy: {"g7-which-count": "même modèle (ordre, remise) pour les cas favorables et possibles"},
    intro: { rule: "Si toutes les issues sont <b>équiprobables</b>, P(A) = (nombre de cas favorables)/(nombre de cas possibles). On compte les deux de la même façon (avec ou sans ordre, mais pareil en haut et en bas). P(non A) = 1 − P(A)." },
  }),
  S('g7-tree', 12, {
    prereqs: ["g7-laplace"], icon: "🌳", examWeight: 0, exam: ["mcq"], tags: ["opt"],
    title: "Arbres de probabilité",
    desc: "On multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement.",
    prereqWhy: {"g7-laplace": "probabilité de chaque branche par équiprobabilité"},
    intro: { rule: "On multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement. Sans remise, les probabilités du 2e niveau <b>changent</b> (il reste une boule de moins). Les branches issues d'un même nœud ont une somme 1. Prépare Bayes (module P)." },
  }),
];
