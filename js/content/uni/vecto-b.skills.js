// Module V, part b (unit `vecto`, step U10): Green, surfaces, flux, oriented boundaries, divergence and Stokes theorems, short proofs.
// Catalogue: docs/universite/VCF-analyse-3-4.md. Generators: vecto-b.js.
// The skeleton (ids, prerequisites, weights, exam variants) comes from the
// catalogue; the intro, icon and desc of each skill are written with its
// generators.

const S = (id, rest) => ({ id, unit: 'vecto', year: 15, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("v-green", {
    prereqs: ["v-line-vector", "v-ops", "a2-fubini-rect", "a2-polar-int"],
    icon: '∮',
    examWeight: 3,
    exam: ["mcq", "open"],
    title: "Théorème de Green et calcul d'une aire",
    desc: '∮ F · dl = ∬ rot F : avec rot F constant, c\'est rot F × aire. Pas de Green si F a une singularité dans le domaine.',
    prereqWhy: {"v-line-vector": "le membre ∮ F · dl est un travail", "v-ops": "rot F scalaire en 2D", "a2-polar-int": "domaines en disque : ∬ en polaires"},
    intro: {
      rule: 'A domaine régulier, ∂A orienté <b>positivement</b> (A à gauche), F ∈ C¹ sur Ā : ∬_A rot F dx dy = ∮_∂A F · dl, avec rot F = ∂F₂/∂x − ∂F₁/∂y. Il faut <b>calculer</b> rot F : s\'il est constant (rot F = 2), ∮ = 2 · aire(A). Aire : aire(A) = ½ ∮ (x dy − y dx). Si F n\'est pas défini en un point de A (F = (−y, x)/(x² + y²) et le disque), Green ne s\'applique pas : on calcule ∮ directement.',
      lines: [
        L('F = (−y, x) sur le disque unité, γ(t) = (cos t, sin t), t ∈ [0 ; 2π]', 'Le bord, sens positif'),
        L('∮ F · dl = ∫₀^{2π} (sin²t + cos²t) dt = 2π', 'Premier membre'),
        L('rot F = 1 − (−1) = 2, ∬_D 2 dx dy = 2π', 'Second membre : les deux sont égaux'),
      ],
    },
  }),
  S("v-green-flux", {
    prereqs: ["v-green"],
    icon: 'ν',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Forme flux de Green : ∮ F · ν dl = ∬ div F",
    desc: '∮ F · ν dl = ∬ div F, ν la normale extérieure unité : une intégrale double au lieu de plusieurs côtés.',
    prereqWhy: {"v-green": "même théorème, sous forme de flux"},
    intro: {
      rule: 'ν est la normale <b>extérieure unité</b> au bord : ν = (γ₂′, −γ₁′)/|γ′| pour un bord orienté positivement. Alors ∮_∂A F · ν dl = ∬_A div F dx dy, avec div F = ∂F₁/∂x + ∂F₂/∂y : avec ν, c\'est la <b>divergence</b>, pas le rotationnel. Sur un triangle ou un carré, on évite de découper le bord ; attention à l\'ordre des intégrales (la borne qui dépend de x va à l\'intérieur).',
      lines: [
        L('F = (x², y) sur [0 ; 1]²', 'Un carré'),
        L('div F = 2x + 1', '∂F₁/∂x + ∂F₂/∂y'),
        L('∬ (2x + 1) dx dy = 1 + 1 = 2', 'Le flux sortant'),
      ],
    },
  }),
  S("v-surf-param", {
    prereqs: ["a2-cyl-sph", "g4-cross"],
    icon: 'σ',
    examWeight: 2,
    exam: ["mcq"],
    title: "Paramétrer une surface ; normale σ_u ∧ σ_v",
    desc: 'σ(r, φ) ou σ(θ, φ), le domaine A des paramètres, et la normale σ_u ∧ σ_v, dont l\'ordre fixe le sens.',
    prereqWhy: {"a2-cyl-sph": "sphère et cylindre paramétrés par les coordonnées sphériques et cylindriques"},
    intro: {
      rule: 'Graphe z = g(x, y) : σ(x, y) = (x, y, g), σ_x ∧ σ_y = (−g_x, −g_y, 1). Surface de révolution z = h(r) : σ(r, φ) = (r cos φ, r sin φ, h(r)). Sphère de rayon R : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ), θ <b>depuis l\'axe z</b> ; σ_θ ∧ σ_φ = R² sin θ (sin θ cos φ, sin θ sin φ, cos θ) (extérieure). Les conditions (y ≥ 0, z ≥ 0) donnent le domaine A. L\'ordre des paramètres fixe le sens de la normale : σ_v ∧ σ_u = −σ_u ∧ σ_v.',
      lines: [
        L('σ(r, φ) = (r cos φ, r sin φ, −r² + 2r + 3), (r, φ) ∈ [0 ; 3] × [0 ; π]', 'z = (r + 1)(3 − r), y ≥ 0, z ≥ 0'),
        L('σ_r = (cos φ, sin φ, −2r + 2), σ_φ = (−r sin φ, r cos φ, 0)', 'Dérivées partielles'),
        L('σ_r ∧ σ_φ = ((2r − 2) r cos φ, (2r − 2) r sin φ, r)', '3e composante r > 0 : vers le haut'),
      ],
    },
  }),
  S("v-surf-area", {
    prereqs: ["v-surf-param", "a2-fubini-rect"],
    icon: 'ds',
    examWeight: 1,
    exam: ["mcq"],
    title: "Aire d'une surface et intégrale ∬ f ds",
    desc: '∬ f ds = ∬_A f(σ) |σ_u ∧ σ_v| du dv : la norme de la normale, quel que soit son sens.',
    intro: {
      rule: '∬_Σ f ds = ∬_A f(σ(u, v)) |σ_u ∧ σ_v| du dv ; aire(Σ) = ∬_A |σ_u ∧ σ_v| du dv. C\'est la <b>norme</b> du produit vectoriel (pas une de ses composantes) : le sens de la normale ne compte pas. Sans ce facteur, on obtient l\'aire du domaine A, pas celle de Σ.',
      lines: [
        L('Σ : z = x² + y², z ≤ 2 ; σ(r, φ), (r, φ) ∈ [0 ; √2] × [0 ; 2π]', 'Un paraboloïde'),
        L('|σ_r ∧ σ_φ| = |(−2r² cos φ, −2r² sin φ, r)| = r √(1 + 4r²)', 'La norme'),
        L('aire = 2π ∫₀^{√2} r √(1 + 4r²) dr = 2π (27 − 1)/12 = 13π/3', 'Primitive (1 + 4r²)^{3/2}/12'),
      ],
    },
  }),
  S("v-flux", {
    prereqs: ["v-surf-param"],
    icon: 'Φ',
    examWeight: 2,
    exam: ["mcq"],
    title: "Flux ∬ F · ds",
    desc: '∬ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme ; le sens de la normale donne le signe.',
    intro: {
      rule: '∬_Σ F · ds = ∬_A F(σ(u, v)) · (σ_u ∧ σ_v) du dv : le produit scalaire avec la normale, <b>sans</b> la diviser par sa norme. Changer l\'ordre de u et v change le signe. Si l\'énoncé impose une normale (extérieure, vers le haut), on vérifie le sens de σ_u ∧ σ_v, et on échange les paramètres si besoin.',
      lines: [
        L('F = (0, 0, z), Σ : z = x² + y², z ≤ 1, normale vers le haut', 'Un paraboloïde'),
        L('σ_r ∧ σ_φ = (−2r² cos φ, −2r² sin φ, r)', '3e composante > 0 : vers le haut'),
        L('F(σ) · (σ_r ∧ σ_φ) = r² · r = r³', 'Sans norme'),
        L('∬ F · ds = 2π ∫₀¹ r³ dr = π/2', 'Le flux'),
      ],
    },
  }),
  S("v-boundary", {
    prereqs: ["v-surf-param", "v-curve-param"],
    icon: '∂Σ',
    examWeight: 2,
    exam: ["mcq", "open"],
    title: "Bord orienté ∂Σ = σ(∂A)",
    desc: 'On fait le tour de A, on applique σ à chaque côté, on retire les points et les côtés qui s\'annulent.',
    prereqWhy: {"v-surf-param": "σ et le domaine A des paramètres", "v-curve-param": "paramétrer chaque morceau du bord"},
    intro: {
      rule: 'On parcourt ∂A dans le sens positif (A à gauche dans le plan des paramètres), on applique σ à chaque côté, puis on <b>retire</b> les côtés dont l\'image est un point et les paires parcourues deux fois en sens contraires. Ce qui reste est ∂Σ, avec le sens qui va avec σ_u ∧ σ_v. Changer l\'ordre des paramètres change le sens du bord.',
      lines: [
        L('θ = 0 ↦ le pôle nord (0, 0, 3)', 'Un point : on le retire'),
        L('φ = 0 et φ = 2π ↦ le même méridien, en sens contraires', 'Ils s\'annulent'),
        L('θ = π/2 ↦ l\'équateur (3 cos t, 3 sin t, 0), t ∈ [0 ; 2π]', 'C\'est le bord de l\'hémisphère'),
      ],
    },
  }),
  S("v-div-thm", {
    prereqs: ["v-flux", "v-ops", "a2-cyl-sph"],
    icon: 'div',
    examWeight: 2,
    exam: ["mcq"],
    title: "Théorème de la divergence",
    desc: '∬_∂Ω F · ν ds = ∭_Ω div F : souvent, le volume est plus simple que les faces.',
    prereqWhy: {"v-flux": "le membre de droite est un flux"},
    intro: {
      rule: 'Ω borné régulier, ν la normale <b>extérieure</b> unité, F ∈ C¹ : ∭_Ω div F dx dy dz = ∬_∂Ω F · ν ds. En cylindriques, dx dy dz = r dr dφ dz (le jacobien r). Les termes impairs en x ou en y s\'annulent quand Ω est symétrique. Pour une surface non fermée, on la ferme (par un disque) et on retire le flux de la pièce ajoutée.',
      lines: [
        L('F = (x, y, z), Ω : x² + y² ≤ 1, 0 ≤ z ≤ 2', 'Un cylindre'),
        L('div F = 3', '1 + 1 + 1'),
        L('∬_∂Ω F · ν ds = ∭ 3 = 3 · 2π = 6π', '3 × volume'),
      ],
    },
  }),
  S("v-stokes", {
    prereqs: ["v-flux", "v-boundary", "v-line-vector", "v-ops"],
    icon: 'rot',
    examWeight: 2,
    exam: ["mcq"],
    title: "Théorème de Stokes",
    desc: '∬_Σ rot F · ds = ∮_∂Σ F · dl, le bord σ(∂A) orienté avec σ_u ∧ σ_v.',
    prereqWhy: {"v-boundary": "le bord σ(∂A) et son orientation"},
    intro: {
      rule: 'Σ orientable, régulière par morceaux, F ∈ C¹ : ∬_Σ rot F · ds = ∮_∂Σ F · dl, le bord étant σ(∂A), parcouru dans le sens qui va avec σ_u ∧ σ_v. On choisit le membre le plus simple, ou une autre surface qui a le même bord (un disque au lieu d\'un hémisphère). Si rot F est constant, il ne dépend pas du point σ(u, v).',
      lines: [
        L('F = (−y, x, z), Σ hémisphère supérieur unité', 'Normale extérieure'),
        L('rot F = (0, 0, 2)', 'Constant'),
        L('∬ rot F · ds = ∫₀^{2π} ∫₀^{π/2} 2 sin θ cos θ dθ dφ = 2π', 'Premier membre'),
        L('∮ sur l\'équateur : ∫₀^{2π} 1 dt = 2π', 'Même valeur'),
      ],
    },
  }),
  S("v-verify-stokes", {
    prereqs: ["v-stokes"],
    icon: '✓',
    examWeight: 3,
    exam: ["open"],
    title: "Problème : vérifier le théorème de Stokes",
    desc: 'Vérifier Stokes : calculer les deux membres séparément et constater qu\'ils sont égaux.',
    intro: {
      rule: '« Vérifier » le théorème veut dire calculer <b>les deux membres</b> séparément : les hypothèses (Σ orientable, régulière par morceaux, F ∈ C¹), rot F, σ et le domaine A, la normale σ_u ∧ σ_v, le flux ∬ rot F · ds ; puis le bord σ(∂A) morceau par morceau, dans le bon sens, et ∮ F · dl. On conclut : les deux membres valent la même chose.',
      lines: [
        L('Σ : z = (r + 1)(2 − r), y ≥ 0, z ≥ 0 ; F = (0, x, 0)', 'Examen 2021'),
        L('rot F = (0, 0, 1), σ_r ∧ σ_φ = ((2r − 1) r cos φ, (2r − 1) r sin φ, r)', 'Les ingrédients'),
        L('∬ rot F · ds = ∫₀^π ∫₀² r dr dφ = 2π', 'Premier membre'),
        L('arcs : F · γ′ = 0 ; demi-cercle : ∫₀^π 4 cos²t dt = 2π', 'Second membre : égal'),
      ],
    },
  }),
  S("v-verify-div", {
    prereqs: ["v-div-thm"],
    icon: '✓',
    examWeight: 1,
    exam: ["open"],
    title: "Problème : vérifier le théorème de la divergence",
    desc: 'Vérifier la divergence : ∭ div F, puis le flux sortant de chaque face, avec sa normale extérieure.',
    intro: {
      rule: 'On calcule ∭_Ω div F, puis le flux sortant par <b>chaque face</b> du bord (le disque du haut et le cône, ou les deux disques et le côté d\'un cylindre), avec la normale <b>extérieure</b> de chaque face : sur le cône, c\'est l\'opposé de σ_r ∧ σ_φ. La somme des flux est égale au volume.',
      lines: [
        L('F = (x², y², z³), Ω = {4(x² + y²) ≤ z², 0 ≤ z ≤ 2}', 'Un cône'),
        L('∭ div F = ∫₀² 3z² · π(z/2)² dz = 24π/5', 'Les termes en x et y s\'annulent'),
        L('disque z = 2 : ∬ 8 ds = 8π ; cône : −16π/5', 'Normales extérieures'),
        L('8π − 16π/5 = 24π/5', 'Les deux membres sont égaux'),
      ],
    },
  }),
  S("v-proof-identity", {
    prereqs: ["v-identities", "v-pot-test", "a2-chain", "g9-proof-contra"],
    icon: '∎',
    examWeight: 1,
    exam: ["open"],
    title: "Petites preuves (3 points)",
    desc: 'Une preuve courte : la définition, la règle de chaîne, l\'hypothèse, puis le théorème avec son domaine.',
    prereqWhy: {"v-identities": "identités rot grad = 0 et div rot = 0", "v-pot-test": "citer : rot F = 0 sur un convexe ⇒ potentiel", "g9-proof-contra": "rédiger une preuve directe"},
    intro: {
      rule: 'Une preuve courte enchaîne : écrire la définition (rot G = ∂G₂/∂x − ∂G₁/∂y), dériver avec la <b>règle de chaîne</b> (la dérivée de −x vaut −1), reconnaître l\'hypothèse (div F = 0), puis citer le théorème avec ses hypothèses : rot G = 0 sur ℝ², qui est <b>convexe</b>, donc G dérive d\'un potentiel.',
      lines: [
        L('div F = 0, G(x, y) = (F₂(−x, y), F₁(−x, y))', 'Examen 2021'),
        L('rot G = ∂/∂x [F₁(−x, y)] − ∂/∂y [F₂(−x, y)] = −∂₁F₁(−x, y) − ∂₂F₂(−x, y)', 'Règle de chaîne'),
        L('= −div F(−x, y) = 0', 'ℝ² est convexe : G dérive d\'un potentiel'),
      ],
    },
  }),
];
