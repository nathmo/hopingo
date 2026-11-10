// Module N, part a (unit `numerique`, step U9): erreurs, bissection, point fixe. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-err-abs-rel', {
    prereqs: ["cm-round", "pct-which"], icon: "|x − x̃|", examWeight: 1, exam: ["mcq", "tf"],
    title: "Erreurs absolue et relative ; arrondis",
    desc: "Mesurer l'écart à la valeur exacte, en valeur absolue et rapporté à la valeur exacte.",
    prereqWhy: { 'cm-round': 'arrondir x à d chiffres significatifs, puis mettre au même dénominateur', 'pct-which': 'erreur relative exprimée en pourcentage' },
    intro: {
      rule: "L'erreur absolue est e<sub>abs</sub> = |x − x̃|, l'erreur relative e<sub>rel</sub> = |x − x̃|/|x| (x ≠ 0), où x est la valeur <b>exacte</b> et x̃ l'approximation. Arrondir x à d chiffres significatifs donne e<sub>rel</sub> ≤ 5·10⁻ᵈ. L'erreur relative compare des grandeurs d'échelles différentes.<br>Exemple : x = 2/3, x̃ = 0,667.",
      lines: L([["e_abs = |0,667 − 2/3| = |2001/3000 − 2000/3000| = 1/3000", "Même dénominateur"], ["e_rel = (1/3000)/(2/3) = 1/2000 = 5·10⁻⁴", "On divise par la valeur exacte"]]),
    },
  }),
  S('n-err-float', {
    prereqs: ["n-err-abs-rel"], icon: "ε", examWeight: 1, exam: ["mcq", "tf"],
    title: "Virgule flottante, ε machine, annulation",
    desc: "Un ordinateur arrondit chaque opération ; soustraire deux nombres proches efface des chiffres.",
    prereqWhy: {},
    intro: {
      rule: "Un ordinateur garde environ 16 chiffres significatifs : fl(x) = x(1 + δ) avec |δ| ≤ ε ≈ 10⁻¹⁶. L'erreur d'arrondi est <b>relative</b>. Soustraire deux nombres proches fait perdre des chiffres (annulation) : on réécrit alors le calcul sans cette soustraction.<br>Exemple, en arithmétique à 4 chiffres :",
      lines: L([["√1001 − √1000 = 31,64 − 31,62 = 0,02", "Faux dès le premier chiffre : la vraie valeur est 0,01581"], ["= 1/(√1001 + √1000) = 1/63,26 = 0,01581", "Conjugué : plus de soustraction"]]),
    },
  }),
  S('n-bisection', {
    prereqs: ["a1-fn-ivt", "g2-log-rules"], icon: "[a ; b]", examWeight: 1, exam: ["mcq", "tf"], tags: ["GM"],
    title: "Bissection : nombre d'itérations et intervalles",
    desc: "Couper l'intervalle en deux en gardant le changement de signe, et prévoir le nombre de pas.",
    prereqWhy: { 'a1-fn-ivt': 'f continue et f(a)f(b) < 0 : un zéro existe (TVI)', 'g2-log-rules': 'k_min se calcule avec log₂' },
    intro: {
      rule: "Si f est continue et f(a)f(b) < 0, on prend le milieu x⁽ᵏ⁾ et on garde la moitié où f change de signe. On a |α − x⁽ᵏ⁾| ≤ (b − a)/2ᵏ⁺¹. Pour garantir une tolérance tol, il faut k > log₂((b − a)/tol) − 1.<br>Exemple : f(x) = x² − 2 sur [1 ; 2], tol = 10⁻³.",
      lines: L([["(b − a)/2^(k+1) ≤ 10⁻³", "Borne garantie"], ["k > log₂(1000) − 1 ≈ 9,97 − 1 = 8,97", "2¹⁰ = 1024 ≈ 10³"], ["k_min = 9", "Le plus petit entier"], ["x⁽⁰⁾ = 1,5 ; f(1,5) > 0 → [1 ; 1,5] ; x⁽¹⁾ = 1,25", "f(1) < 0 : le zéro est à gauche"]]),
    },
  }),
  S('n-fp-converge', {
    prereqs: ["a1-seq-rec-fixed", "a1-mvt"], icon: "φ(x)", examWeight: 1, exam: ["mcq", "tf"],
    title: "Point fixe : convergence, choix de φ",
    desc: "Itérer x ← φ(x) : la pente de φ au point fixe décide de la convergence.",
    prereqWhy: { "a1-seq-rec-fixed": "suite récurrente et point fixe α = φ(α)", "a1-mvt": "|φ′| < 1 donne une contraction par les accroissements finis" },
    intro: {
      rule: "On itère x⁽ᵏ⁺¹⁾ = φ(x⁽ᵏ⁾), et α = φ(α).<br>• Si φ est C¹ près de α et |φ′(α)| < 1, la méthode converge pour x⁽⁰⁾ assez proche de α, et |x⁽ᵏ⁺¹⁾ − α| ≈ |φ′(α)|·|x⁽ᵏ⁾ − α|.<br>• Si |φ′(α)| > 1, elle ne converge pas vers α.<br>• On arrête quand |x⁽ᵏ⁺¹⁾ − x⁽ᵏ⁾| < tol.<br>Exemple : φ(x) = 2x/(1 + x) (modèle de Verhulst).",
      lines: L([["φ(x) = x ⇔ x = 0 ou x = 1", "Deux points fixes"], ["φ′(x) = 2/(1 + x)², φ′(1) = 1/2, φ′(0) = 2", "Converge vers 1, jamais vers 0"], ["x⁽⁰⁾ = 2 → 4/3 → 8/7 → 16/15", "Erreurs 1, 1/3, 1/7, 1/15 : rapport → 1/2"]]),
    },
  }),
  S('n-fp-order', {
    prereqs: ["n-fp-converge", "a1-dl-usual"], icon: "φ′(α)", examWeight: 1, exam: ["mcq", "tf", "coef"],
    title: "Ordre d'un point fixe, ordre selon un paramètre",
    desc: "La première dérivée de φ non nulle en α donne l'ordre ; choisir un paramètre pour l'augmenter.",
    prereqWhy: { "n-fp-converge": "φ et son point fixe α", "a1-dl-usual": "Taylor de φ autour de α" },
    intro: {
      rule: "Si φ′(α) = … = φ⁽ᵖ⁻¹⁾(α) = 0 et φ⁽ᵖ⁾(α) ≠ 0, la méthode est d'ordre p. Par Taylor, x⁽ᵏ⁺¹⁾ − α = φ⁽ᵖ⁾(ξ)/p!·(x⁽ᵏ⁾ − α)ᵖ, donc le rapport |x⁽ᵏ⁺¹⁾ − α|/|x⁽ᵏ⁾ − α|ᵖ tend vers |φ⁽ᵖ⁾(α)|/p!.<br>Exemple : φ_ω(x) = x − ω(x² − 4), α = 2.",
      lines: L([["φ_ω(2) = 2 pour tout ω", "α est point fixe"], ["φ_ω′(2) = 1 − 4ω", "Nul ⇔ ω = 1/4"], ["φ_ω″(2) = −2ω = −1/2 ≠ 0", "Ordre exactement 2 pour ω = 1/4"], ["|1 − 4ω| < 1 ⇔ 0 < ω < 1/2", "Sinon : ordre 1, ou pas de convergence"]]),
    },
  }),
];
