// Module A2, part a (unit `analyse2`, step U6). Catalogue:
// docs/universite/A2-analyse-2.md. Skeleton written from the catalogue: each
// skill gets its intro (rule + worked lines) with its generators.

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S("a2-rn-topology", {
    prereqs: ["g10-circle-eq"], icon: '', examWeight: 3, exam: ["mcq", "tf"],
    title: "Ouvert, fermé, borné, compact",
    desc: '',
    prereqWhy: {"g10-circle-eq": "disques et boules (x − a)² + (y − b)² < r²"},
    intro: { rule: "Un ensemble défini par des inégalités <b>larges</b> entre fonctions continues est fermé. Avec des inégalités <b>strictes</b>, il est ouvert. Avec un mélange, il n'est en général ni l'un ni l'autre. On vérifie d'abord si une inégalité est toujours vraie : elle ne compte alors pas. Borné : contenu dans une boule. Compact : fermé <b>et</b> borné. Les normes ‖·‖₁, ‖·‖₂ et ‖·‖∞ donnent les mêmes ouverts.", lines: [] },
  }),
  S("a2-rn-boundary", {
    prereqs: ["a2-rn-topology"], icon: '', examWeight: 2, exam: ["mcq", "tf"],
    title: "Intérieur, adhérence, bord",
    desc: '',
    prereqWhy: {"a2-rn-topology": "ouverts, fermés et boules"},
    intro: { rule: "x est dans le bord ∂E si chaque boule autour de x touche E <b>et</b> le complémentaire de E. Intérieur : E sans son bord. Adhérence : E avec son bord. Un point isolé de E est dans le bord. Les phrases « ∂(A ∪ B) = ∂A ∪ ∂B » et « E ⊂ F ⇒ ∂E ⊂ ∂F » sont fausses.", lines: [] },
  }),
  S("a2-rn-sequences", {
    prereqs: ["a1-seq-limsup", "g3-identities"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Suites et sous-suites dans ℝⁿ",
    desc: '',
    prereqWhy: {"a1-seq-limsup": "sous-suites et Bolzano-Weierstrass à une variable"},
    intro: { rule: "Une suite de ℝⁿ converge si et seulement si <b>chaque composante</b> converge. Une suite bornée a une sous-suite convergente (Bolzano-Weierstrass). Pour une sous-suite a_{pk+q}, on remplace n par pk + q dans chaque composante et on simplifie avec la période.", lines: [] },
  }),
  S("a2-curve-param", {
    prereqs: ["a1-param-curve", "g4-line3"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Courbes paramétrées dans ℝ³ : continuité, tangente, courbe lisse",
    desc: '',
    prereqWhy: {"a1-param-curve": "courbes planes paramétrées et leur tangente", "g4-line3": "la tangente γ(t₀) + s·γ′(t₀) est une droite paramétrique"},
    intro: { rule: "γ : I → ℝⁿ est continue (dérivable) si chaque composante l'est. γ′(t) est tangent à la courbe ; la courbe est lisse si γ′(t) ≠ 0. Tangente en t₀ : γ(t₀) + s·γ′(t₀). Un facteur discontinu ne rend pas forcément la composante discontinue : sign(t)·(eᵗ − 1) est continue.", lines: [] },
  }),
  S("a2-curve-length", {
    prereqs: ["a2-curve-param", "a1-int-applications"], icon: '', examWeight: 1, exam: ["mcq", "tf"],
    title: "Longueur d'arc",
    desc: '',
    prereqWhy: {"a1-int-applications": "longueur d'arc d'une courbe plane"},
    intro: { rule: "L = ∫_a^b ‖γ′(t)‖ dt. Le calcul n'est possible que si ‖γ′‖² est un carré parfait ou une constante : on cherche ce carré.", lines: [] },
  }),
  S("a2-compact-extreme", {
    prereqs: ["a2-rn-topology", "a2-continuity", "g9-counterexample"], icon: '', examWeight: 3, exam: ["tf"],
    title: "Fonctions continues sur un compact (vrai/faux)",
    desc: '',
    prereqWhy: {"a2-rn-topology": "reconnaître un compact", "a2-continuity": "vérifier la continuité de f"},
    intro: { rule: "Une fonction continue sur un compact non vide est bornée et <b>atteint</b> son minimum et son maximum. Si en plus le compact est connexe par arcs, l'image est l'intervalle [m ; M]. Rien de cela ne vaut sur un ouvert ou un ensemble non borné. L'image d'un ouvert par une fonction continue n'est pas forcément ouverte.", lines: [] },
  }),
];
