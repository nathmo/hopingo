// Module N, part g (unit `numerique`, step U9): équations différentielles. Catalogue:
// docs/universite/N-analyse-numerique.md. Year 16 (BA4).

const S = (id, rest) => ({ id, unit: 'numerique', year: 16, optional: false, needsSolo: true, tags: [], ...rest });
const L = (pairs) => pairs.map(([html, note]) => ({ html, note, noEq: true }));

export const SKILLS = [
  S('n-ode-euler', {
    prereqs: ["a2-ode-cauchy", "a2-ode-linear1"], icon: "Euler", examWeight: 1, exam: ["mcq", "tf"],
    title: "Euler progressif et rétrograde",
    desc: "Euler progressif et rétrograde",
    prereqWhy: {"a2-ode-cauchy": "problème de Cauchy u′ = f(t, u), u(0) = u₀", "a2-ode-linear1": "solution exacte de u′ = λu + g pour comparer"},
    intro: {
      rule: "t_n = nh. - Euler progressif (explicite) : u_{n+1} = u_n + h·f(t_n, u_n). - Euler rétrograde (implicite) : u_{n+1} = u_n + h·f(t_{n+1}, u_{n+1}). Il faut résoudre une équation en u_{n+1} à chaque pas. - Les deux sont d'ordre 1. Exemple : u′ = −2u, u(0) = 1, h = 0,1.",
      lines: L([["progressif : u₁ = 1 + 0,1·(−2) = 0,8 ; u₂ = 0,64", ""], ["rétrograde : u₁ = 1 + 0,1·(−2u₁) ⇒ u₁ = 1/1,2 = 5/6 ≈ 0,833", ""], ["exact : e^(−0,2) ≈ 0,819", ""]]),
    },
  }),
  S('n-ode-rk', {
    prereqs: ["n-ode-euler"], icon: "RK", examWeight: 1, exam: ["mcq"],
    title: "Heun, Crank-Nicolson, Runge-Kutta",
    desc: "Heun, Crank-Nicolson, Runge-Kutta",
    prereqWhy: {"n-ode-euler": "même formalisme t_n, u_n et pas h"},
    intro: {
      rule: "trois familles prolongent Euler. - Crank-Nicolson : u_{n+1} = u_n + (h/2)(f(t_n, u_n) + f(t_{n+1}, u_{n+1})). Implicite, d'ordre 2. - Heun : on prédit avec Euler, puis on fait la moyenne. u_{n+1} = u_n + (h/2)(f(t_n, u_n) + f(t_{n+1}, u_n + h·f(t_n, u_n))). Explicite, d'ordre 2. - Runge-Kutta à s étapes : il est décrit par son tableau de Butcher. Il est explicite si aᵢⱼ = 0 pour j ≥ i. Exemple : u′ = −2u, h = 0,1, u₀ = 1.",
      lines: L([["Heun : k₁ = −2 ; k₂ = −2·(1 − 0,2) = −1,6 ; u₁ = 1 + 0,05·(−3,6) = 0,82", ""], ["CN : u₁ = 1 + 0,05·(−2 − 2u₁) ⇒ u₁ = 0,9/1,1 = 9/11 ≈ 0,818", ""], ["exact : 0,8187", ""]]),
    },
  }),
  S('n-ode-stability', {
    prereqs: ["n-ode-rk", "m-ode-modes"], icon: "|R(hλ)|", examWeight: 2, exam: ["mcq", "tf"],
    title: "Stabilité absolue sur u′ = λu",
    desc: "Stabilité absolue sur u′ = λu",
    prereqWhy: {"n-ode-rk": "fonctions R(hλ) des schémas"},
    intro: {
      rule: "sur le problème modèle u′ = λu avec λ < 0, la solution tend vers 0. Le schéma est absolument stable si u_n → 0. On écrit u_{n+1} = R(hλ)·u_n et on exige |R(hλ)| < 1. - EP : R = 1 + hλ, stable ⇔ h < 2/|λ|. - ER : R = 1/(1 − hλ), toujours stable. - CN : R = (1 + hλ/2)/(1 − hλ/2), toujours stable. - Heun : R = 1 + hλ + (hλ)²/2, stable ⇔ h < 2/|λ|. - θ-méthode : inconditionnellement stable ssi θ ≥ 1/2 ; sinon h < 2/((1 − 2θ)|λ|). - Système u′ = Au : chaque valeur propre λᵢ compte. Pour EP : |1 + hλᵢ| < 1 pour tout i. Exemple : λ = −20.",
      lines: L([["EP : |1 − 20h| < 1 ⇔ 0 < h < 0,1", ""], ["ER : |1/(1 + 20h)| < 1 pour tout h > 0", ""]]),
    },
  }),
  S('n-ode-euler-global', {
    prereqs: ["n-ode-euler", "g5-geom", "a1-extrema-global", "a1-dl-usual"], icon: "Th/2", examWeight: 2, exam: ["tf", "open"],
    title: "Erreur globale d'Euler, par une preuve",
    desc: "Erreur globale d'Euler, par une preuve",
    prereqWhy: {"a1-extrema-global": "majorer une fonction sur un intervalle"},
    intro: {
      rule: "pour u′ = −u, u(0) = 1 sur [0 ; T], h = T/N, on a u_N = (1 − h)ᴺ et u(t_N) = e^(−Nh). La preuve demande deux faits : - <b>Lemme.</b> |e^(−x) − (1 − x)| ≤ x²/2 pour x > 0, par Taylor : le reste vaut e^(−ξ)x²/2 ≤ x²/2. - <b>Factorisation.</b> aᴺ − bᴺ = (a − b)·Σₖ a^(N−1−k)bᵏ. Si 0 < h ≤ 2, alors |a|, |b| ≤ 1, donc |aᴺ − bᴺ| ≤ N|a − b|. Exemple (2022, 3,5 points), T = 100.",
      lines: L([["u(t_N) − u_N = e^(−Nh) − (1 − h)^N", ""], ["|e^(−h) − (1 − h)| ≤ h²/2", ""], ["|e^(−Nh) − (1 − h)^N| ≤ N·h²/2 = (Nh)·h/2 = 100h/2 = 50h", ""]]),
    },
  }),
  S('n-ode-implicit-newton', {
    prereqs: ["n-ode-euler", "n-newton-system"], icon: "ER+Newton", examWeight: 2, exam: ["mcq", "tf"],
    title: "Euler implicite sur un système, avec un pas de Newton",
    desc: "Euler implicite sur un système, avec un pas de Newton",
    prereqWhy: {},
    intro: {
      rule: "ER sur un système non linéaire demande de résoudre F(x) = 0 à chaque pas. On le fait par Newton, en partant de x⁽⁰⁾ = uⁿ. Exemple (2019) : u₁′ = −u₂²u₁, u₂′ = −u₁²u₂, u(0) = (1 ; 1).",
      lines: L([["f₁(x) = x₁ − u₁ⁿ + h·x₂²·x₁ ; f₂(x) = x₂ − u₂ⁿ + h·x₁²·x₂", "les inconnues sont x = uⁿ⁺¹"], ["J = [[1 + h·x₂², 2h·x₁x₂], [2h·x₁x₂, 1 + h·x₁²]]", ""], ["en x⁽⁰⁾ = (1 ; 1) : J = [[1 + h, 2h], [2h, 1 + h]], F = (h ; h)", ""], ["J·(1 − x₁¹ ; 1 − x₂¹) = (h ; h) ⇒ x₁¹ = x₂¹ = 1 − h/(1 + 3h)", "h = 0,1 : 12/13 ≈ 0,923"]]),
    },
  }),
  S('n-ode-stiff', {
    prereqs: ["n-ode-stability"], icon: "raide", examWeight: 0, exam: ["tf"], tags: ["opt"],
    title: "Problèmes raides",
    desc: "Problèmes raides",
    prereqWhy: {},
    intro: {
      rule: "un problème est raide quand il mêle des échelles de temps très différentes. Une composante rapide (λ très négatif) impose h < 2/|λ| aux schémas explicites, alors que la solution, une fois le transitoire passé, varie lentement. Avec un schéma implicite (ER, CN), on choisit h pour la précision seulement. Exemple : u′ = −50(u − cos t).",
      lines: L([["transitoire de durée ~1/50, puis u ≈ cos t", ""], ["EP : h < 0,04 imposé par la stabilité ; ER : h = 0,05 marche", ""], ["système u′ = [[−1, 0], [0, −1000]]u : rapport de raideur 1000", ""]]),
    },
  }),
];
