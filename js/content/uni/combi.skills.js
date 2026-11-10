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
    intro: { rule: "Un choix en plusieurs étapes indépendantes (« et ») : on <b>multiplie</b> les nombres de possibilités. Des cas qui s'excluent (« ou ») : on <b>additionne</b>. Un arbre ou des cases à remplir aident à compter.", lines: [{ html: "Plaque : 2 lettres, puis 3 chiffres, le premier non nul", note: "Une case par étape", noEq: true }, { html: "26 · 26 · 9 · 10 · 10", note: "Nombre de choix dans chaque case", noEq: true }, { html: "= 676 · 900 = 608 400", note: "Multiplier", noEq: true }] },
  }),
  S('g7-perm-arr', 12, {
    prereqs: ["g7-mult-principle"], icon: "n!", examWeight: 1, exam: ["mcq", "tf"], tags: [],
    title: "Factorielles, permutations, arrangements, anagrammes",
    desc: "n objets en ligne : n! ; k places parmi n, ordre compté : A(n, k) ; anagrammes : n!/(n₁!·n₂!···).",
    prereqWhy: {"g7-mult-principle": "n! et A(n, k) viennent du principe multiplicatif"},
    intro: { rule: "n objets distincts en ligne : n! façons. k places parmi n, ordre compté, sans répétition : A(n, k) = n·(n − 1)···(n − k + 1) = n!/(n − k)!. Anagrammes d'un mot avec des lettres répétées : n!/(n₁!·n₂!···). Simplifier : (n + 1)! = (n + 1)·n!.", lines: [{ html: "Podium de 3 marches, 8 coureurs : A(8, 3) = 8 · 7 · 6 = 336", note: "Ordre compté, pas de répétition", noEq: true }, { html: "RADAR : 5!/(2!·2!) = 120/4 = 30", note: "R et A deux fois chacun", noEq: true }, { html: "(n + 1)!/(n − 1)! = (n + 1)·n = n² + n", note: "Simplifier par (n − 1)!", noEq: true }] },
  }),
  S('g7-combinations', 12, {
    prereqs: ["g7-perm-arr"], icon: "C(n,k)", examWeight: 2, exam: ["mcq", "tf", "open"], tags: [],
    title: "Combinaisons, triangle de Pascal",
    desc: "Choisir k objets parmi n, sans ordre : C(n, k) = n!/(k!(n − k)!) = A(n, k)/k!.",
    prereqWhy: {"g7-perm-arr": "C(n, k) = A(n, k)/k!"},
    intro: { rule: "Choisir k objets parmi n, sans ordre : C(n, k) = n!/(k!(n − k)!) = A(n, k)/k!. C(n, k) = C(n, n − k). Pascal : C(n, k) = C(n − 1, k − 1) + C(n − 1, k). Choix dans plusieurs groupes : on multiplie les C.", lines: [{ html: "Comité : 3 femmes parmi 7 et 2 hommes parmi 5", note: "Choisir dans chaque groupe", noEq: true }, { html: "C(7, 3) · C(5, 2) = 35 · 10", note: "C(n, k) = A(n, k)/k!", noEq: true }, { html: "= 350", note: "Multiplier", noEq: true }] },
  }),
  S('g7-which-count', 12, {
    prereqs: ["g7-combinations"], icon: "2×2", examWeight: 1, exam: ["mcq"], tags: [],
    needsSolo: false,
    prereqWhy: { 'g7-combinations': 'la case « sans ordre, sans remise » est C(n, k)' },
    title: "Ordonné ou pas ? Avec ou sans remise ? (exercice éclair)",
    desc: "L'ordre compte-t-il ? Peut-on reprendre le même objet ? Puis la bonne formule : nᵏ, A(n, k), C(n, k).",
    intro: { rule: "Deux questions avant tout calcul. L'ordre compte-t-il (podium, code) ou non (main de cartes, comité) ? Peut-on reprendre le même objet (code, dé lancé plusieurs fois) ou non (tirage sans remise, personnes) ? Quatre cases : nᵏ (ordre, avec remise), A(n, k) (ordre, sans remise), C(n, k) (sans ordre, sans remise), C(n + k − 1, k) (sans ordre, avec remise ; seulement en L4–L5).", lines: [{ html: "Cadenas à 4 molettes de 0 à 9", note: "L'ordre compte (1234 ≠ 4321)", noEq: true }, { html: "Avec répétition (1111 est un code)", note: "Case nᵏ", noEq: true }, { html: "10⁴ = 10 000", note: "Calculer", noEq: true }] },
  }),
  S('g7-binomial', 12, {
    prereqs: ["g7-combinations", "g5-sigma", "lit-identities"], icon: "(a+b)ⁿ", examWeight: 1, exam: ["mcq", "tf"], tags: [],
    prereqWhy: { 'lit-identities': '(a + b)² et (a − b)² sont les cas n = 2', 'g5-sigma': "le développement s'écrit avec Σ" },
    title: "Binôme de Newton",
    desc: "(a + b)ⁿ = Σₖ₌₀ⁿ C(n, k)·aⁿ⁻ᵏ·bᵏ.",
    intro: { rule: "(a + b)ⁿ = Σₖ₌₀ⁿ C(n, k)·aⁿ⁻ᵏ·bᵏ. Pour un terme précis : on écrit le terme général, avec <b>tous</b> ses facteurs (coefficients et signes de a et b), on cherche k qui donne la bonne puissance de x, puis on calcule.", lines: [{ html: "Coefficient de x⁴ dans (2x − 1/x)⁸ : C(8, k)·2⁸⁻ᵏ·(−1)ᵏ·x⁸⁻²ᵏ", note: "Terme général", noEq: true }, { html: "8 − 2k = 4, donc k = 2", note: "Équation en k", noEq: true }, { html: "C(8, 2)·2⁶·(−1)² = 28 · 64 = 1792", note: "Coefficient", noEq: true }] },
  }),
  S('g7-laplace', 12, {
    prereqs: ["g7-which-count"], icon: "#/#", examWeight: 0, exam: ["mcq"], tags: ["opt"],
    title: "Probabilité de Laplace",
    desc: "Si toutes les issues sont équiprobables, P(A) = (nombre de cas favorables)/(nombre de cas possibles).",
    prereqWhy: {"g7-which-count": "même modèle (ordre, remise) pour les cas favorables et possibles"},
    intro: { rule: "Si toutes les issues sont <b>équiprobables</b>, P(A) = (nombre de cas favorables)/(nombre de cas possibles). On compte les deux de la même façon (avec ou sans ordre, mais pareil en haut et en bas). P(non A) = 1 − P(A).", lines: [{ html: "3 boules parmi 5 rouges et 3 bleues : C(8, 3) = 56", note: "Cas possibles (sans ordre)", noEq: true }, { html: "Exactement 2 rouges : C(5, 2)·C(3, 1) = 30", note: "Cas favorables", noEq: true }, { html: "P = 30/56 = 15/28", note: "Diviser, simplifier", noEq: true }] },
  }),
  S('g7-tree', 12, {
    prereqs: ["g7-laplace"], icon: "🌳", examWeight: 0, exam: ["mcq"], tags: ["opt"],
    title: "Arbres de probabilité",
    desc: "On multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement.",
    prereqWhy: {"g7-laplace": "probabilité de chaque branche par équiprobabilité"},
    intro: { rule: "On multiplie le long d'un chemin, on additionne les chemins qui mènent à l'événement. Sans remise, les probabilités du 2e niveau <b>changent</b> (il reste une boule de moins). Les branches issues d'un même nœud ont une somme 1. Prépare Bayes (module P).", lines: [{ html: "3 rouges, 2 bleues, deux tirages sans remise : P(RR) = 3/5 · 2/4 = 6/20", note: "Chemin RR", noEq: true }, { html: "P(BB) = 2/5 · 1/4 = 2/20", note: "Chemin BB", noEq: true }, { html: "P(même couleur) = 8/20 = 2/5", note: "Additionner les chemins", noEq: true }] },
  }),
];
