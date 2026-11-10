// Module N, part g (unit `numerique`, step U9): équations différentielles. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-ode-euler', {
    prereqs: ["a2-ode-cauchy", "a2-ode-linear1"], icon: "Euler", examWeight: 1, exam: ["mcq", "tf"],
    title: "Euler progressif et rétrograde",
    desc: "Avancer pas à pas avec la pente du début (explicite) ou de la fin (implicite).",
    prereqWhy: { "a2-ode-cauchy": "le problème de Cauchy u′ = f(t, u), u(0) = u₀ que l'on discrétise", "a2-ode-linear1": "la solution exacte de u′ = λu + g, pour comparer" },
    intro: {
      rule: "Avec tₙ = nh :<br>• <b>Euler progressif</b> (explicite) : uₙ₊₁ = uₙ + h·f(tₙ, uₙ) ;<br>• <b>Euler rétrograde</b> (implicite) : uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁), une équation en uₙ₊₁ à résoudre à chaque pas.<br>Les deux sont d'ordre 1.",
      lines: L([["u′ = −2u, u(0) = 1, h = 0,1", "Le problème"], ["Progressif : u₁ = 1 + 0,1·(−2) = 0,8 ; u₂ = 0,64", "La pente au début du pas"], ["Rétrograde : u₁ = 1 + 0,1·(−2u₁) ⇒ u₁ = 1/1,2 = 5/6 ≈ 0,833", "La pente à la fin : on isole u₁"], ["Exact : e^(−0,2) ≈ 0,819", "Les deux erreurs sont de l'ordre de h"]]),
    },
  }),
  S('n-ode-rk', {
    prereqs: ["n-ode-euler"], icon: "RK", examWeight: 1, exam: ["mcq"],
    title: "Heun, Crank-Nicolson, Runge-Kutta",
    desc: "Moyenner deux pentes pour gagner un ordre.",
    prereqWhy: { "n-ode-euler": "même formalisme tₙ, uₙ et pas h ; Heun prédit avec un pas d'Euler" },
    intro: {
      rule: "• <b>Crank-Nicolson</b> : uₙ₊₁ = uₙ + (h/2)(f(tₙ, uₙ) + f(tₙ₊₁, uₙ₊₁)) ; implicite, d'ordre 2.<br>• <b>Heun</b> : on prédit avec Euler, puis on fait la moyenne des pentes : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂) ; explicite, d'ordre 2.<br>• <b>Runge-Kutta</b> à s étapes : décrit par son tableau de Butcher, explicite si aᵢⱼ = 0 pour j ≥ i (RK4 est d'ordre 4).",
      lines: L([["u′ = −2u, h = 0,1, u₀ = 1", "Le problème"], ["Heun : k₁ = −2 ; k₂ = −2·(1 − 0,2) = −1,6 ; u₁ = 1 + 0,05·(−3,6) = 0,82", "Prédire, puis moyenner"], ["CN : u₁ = 1 + 0,05·(−2 − 2u₁) ⇒ u₁ = 0,9/1,1 = 9/11 ≈ 0,818", "u₁ des deux côtés"], ["Exact : e^(−0,2) ≈ 0,8187", "Erreurs de l'ordre de h²"]]),
    },
  }),
  S('n-ode-stability', {
    prereqs: ["n-ode-rk", "m-ode-modes"], icon: "|R(hλ)|", examWeight: 2, exam: ["mcq", "tf"],
    title: "Stabilité absolue sur u′ = λu",
    desc: "Pour quels pas h la solution numérique tend-elle vers 0 comme la vraie ?",
    prereqWhy: { "n-ode-rk": "le facteur R(hλ) de chaque schéma" },
    intro: {
      rule: "Sur u′ = λu avec λ &lt; 0, la solution tend vers 0. Un schéma donne uₙ₊₁ = R(hλ)·uₙ ; il est <b>absolument stable</b> si |R(hλ)| &lt; 1.<br>• EP : R = 1 + hλ, stable ⇔ h &lt; 2/|λ| ; Heun : R = 1 + hλ + (hλ)²/2, même condition ;<br>• ER : R = 1/(1 − hλ) et CN : R = (1 + hλ/2)/(1 − hλ/2), stables pour tout h ;<br>• θ-méthode : stable pour tout h ⇔ θ ≥ 1/2, sinon h &lt; 2/((1 − 2θ)|λ|) ;<br>• système u′ = Au : chaque valeur propre λᵢ compte, |1 + hλᵢ| &lt; 1 pour tout i (EP).",
      lines: L([["λ = −20", "Le problème modèle"], ["EP : |1 − 20h| &lt; 1 ⇔ 0 &lt; h &lt; 0,1", "Stable seulement pour h assez petit"], ["ER : |1/(1 + 20h)| &lt; 1 pour tout h > 0", "Inconditionnellement stable"]]),
    },
  }),
  S('n-ode-euler-global', {
    prereqs: ["n-ode-euler", "g5-geom", "a1-extrema-global", "a1-dl-usual"], icon: "Th/2", examWeight: 2, exam: ["tf", "open"],
    title: "Erreur globale d'Euler, par une preuve",
    desc: "Les erreurs locales en h² s'accumulent sur T/h pas : l'erreur globale est en h.",
    prereqWhy: { "a1-extrema-global": "majorer e^(−ξ) et |1 − h| sur un intervalle" },
    intro: {
      rule: "Pour u′ = −u, u(0) = 1 sur [0 ; T], h = T/N : u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh). La preuve demande deux faits :<br>• <b>Lemme</b> : |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0, par Taylor (le reste vaut e^(−ξ)x²/2 ≤ x²/2) ;<br>• <b>Factorisation</b> : aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ. Si 0 &lt; h ≤ 2, alors |a|, |b| ≤ 1, donc |aᴺ − bᴺ| ≤ N|a − b|.",
      lines: L([["u(t_N) − u_N = e^(−Nh) − (1 − h)ᴺ", "a = e^(−h), b = 1 − h"], ["|e^(−h) − (1 − h)| ≤ h²/2", "Le lemme"], ["|e^(−Nh) − (1 − h)ᴺ| ≤ N·h²/2 = (Nh)·h/2", "N termes de module ≤ 1"], ["T = 100 : ≤ 100h/2 = 50h", "Examen 2022, 3,5 points"]]),
    },
  }),
  S('n-ode-implicit-newton', {
    prereqs: ["n-ode-euler", "n-newton-system"], icon: "ER+Newton", examWeight: 2, exam: ["mcq", "tf"],
    title: "Euler implicite sur un système, avec un pas de Newton",
    desc: "Écrire le système de chaque pas implicite, puis le résoudre par Newton.",
    prereqWhy: {},
    intro: {
      rule: "Euler rétrograde sur un système non linéaire demande de résoudre F(x) = 0 à chaque pas, les inconnues étant x = uⁿ⁺¹. On le fait par Newton, en partant de x⁽⁰⁾ = uⁿ : J(x⁽⁰⁾)·δ = F(x⁽⁰⁾), puis x⁽¹⁾ = x⁽⁰⁾ − δ.",
      lines: L([["u₁′ = −u₂²u₁, u₂′ = −u₁²u₂, uⁿ = (1 ; 1)", "Examen 2019"], ["f₁(x) = x₁ − u₁ⁿ + h·x₂²·x₁ ; f₂(x) = x₂ − u₂ⁿ + h·x₁²·x₂", "Les inconnues sont x = uⁿ⁺¹"], ["J = [[1 + h·x₂², 2h·x₁x₂], [2h·x₁x₂, 1 + h·x₁²]]", "Les dérivées partielles"], ["En x⁽⁰⁾ = (1 ; 1) : J = [[1 + h, 2h], [2h, 1 + h]], F = (h ; h)", "Évaluer en uⁿ"], ["x₁¹ = x₂¹ = 1 − h/(1 + 3h)", "h = 0,1 : 12/13 ≈ 0,923"]]),
    },
  }),
  S('n-ode-stiff', {
    prereqs: ["n-ode-stability"], icon: "raide", examWeight: 0, exam: ["tf"], tags: ["opt"],
    title: "Problèmes raides",
    desc: "Quand la stabilité, et non la précision, impose un pas minuscule.",
    prereqWhy: { "n-ode-stability": "la condition h < 2/|λ| des schémas explicites" },
    intro: {
      rule: "Un problème est <b>raide</b> quand il mêle des échelles de temps très différentes. Une composante rapide (λ très négatif) impose h &lt; 2/|λ| aux schémas explicites, alors que la solution, une fois le transitoire passé, varie lentement. Avec un schéma implicite (ER, CN), on choisit h pour la précision seulement.",
      lines: L([["u′ = −50(u − cos t)", "Un mode rapide λ = −50"], ["Transitoire de durée ~1/50, puis u ≈ cos t", "La solution est lisse"], ["EP : h &lt; 0,04 imposé par la stabilité ; ER : h = 0,05 marche", "Choisir un schéma implicite"], ["u′ = [[−1, 0], [0, −1000]]u : rapport de raideur 1000", "Un système raide"]]),
    },
  }),
];
