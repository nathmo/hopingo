// Module A2, part i (unit `analyse2`, step U6): linear ODEs with a
// right-hand side, choosing the method, stability, Bernoulli and Euler,
// exact equations, systems X′ = AX. Catalogue:
// docs/universite/A2-analyse-2.md (« EDO »).

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S('a2-ode-particular', {
    prereqs: ['a2-ode-const2'], icon: 'y_p', examWeight: 3, exam: ['mcq', 'tf'],
    title: 'Solution particulière, résonance, problème de Cauchy',
    desc: 'Forme de y_p selon le second membre, résonance (facteur x), puis y = y_h + y_p et les conditions initiales.',
    intro: {
      rule: 'Pour ay″ + by′ + cy = P(x)e^{mx} (ou cos/sin kx), on essaie y_p = Q(x)e^{mx} avec deg Q = deg P. <b>Résonance</b> : si m (ou ik) est racine de l\'équation caractéristique, on multiplie par x (par x² si la racine est double). Pour cos kx <b>ou</b> sin kx, on prend <b>les deux</b> : A cos kx + B sin kx. Ensuite, y = y_h + y_p, et <b>seulement à la fin</b> on applique les conditions initiales.',
      lines: [
        L('y″ − 3y′ + 2y = 4e^{2x} : r² − 3r + 2 = 0, r = 1 ou r = 2', 'y_h = C₁eˣ + C₂e^{2x}'),
        L('m = 2 est racine simple : y_p = Axe^{2x}', 'Résonance : facteur x'),
        L('y_p″ − 3y_p′ + 2y_p = Ae^{2x} = 4e^{2x}, donc A = 4', 'Identifier'),
        L('y = C₁eˣ + C₂e^{2x} + 4xe^{2x}', 'y = y_h + y_p, puis les conditions initiales'),
      ],
    },
  }),
  S('a2-ode-choose', {
    prereqs: ['a2-ode-separable', 'a2-ode-linear1', 'a2-ode-homog-subst', 'a2-ode-particular'], icon: '?→', examWeight: 2, exam: ['mcq'],
    title: 'Choisir la méthode (organigramme des EDO)',
    desc: 'Ordre, séparable, linéaire, homogène : la case de l\'organigramme, puis la méthode la plus courte.',
    prereqWhy: {
      'a2-ode-separable': 'la case « séparable » de l\'organigramme',
      'a2-ode-linear1': 'la case « linéaire » : facteur intégrant, décalage, y = Ce^{∫a}',
      'a2-ode-homog-subst': 'la case « homogène » : y = xv',
      'a2-ode-particular': 'la case « ordre n à coefficients constants » de l\'organigramme',
    },
    intro: {
      rule: 'L\'organigramme se lit de haut en bas. (1) <b>Ordre ?</b> Ordre n linéaire à coefficients constants : équation caractéristique, puis y_p. (2) <b>Séparable ?</b> y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer. (3) <b>Linéaire ?</b> y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant. (4) <b>Homogène ?</b> y′ = F(y/x) : y = xv. (5) Bernoulli, forme exacte.<br>Une équation peut entrer dans plusieurs cases : les deux chemins sont justes, on prend le plus court.',
      lines: [
        L('y′ = 2y − 6 : ordre 1', 'Ordre'),
        L('y′ = 2(y − 3) : séparable, et aussi linéaire à coefficients constants', 'Deux cases'),
        L('Décalage : y = 3 + z (3 est la solution constante), z′ = 2z', 'Le plus court'),
        L('z = Ce^{2x}, donc y = 3 + Ce^{2x}', 'Solution'),
      ],
    },
  }),
  S('a2-ode-stability', {
    prereqs: ['a2-ode-const2', 'param-quadratic'], icon: '→0', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'Stabilité selon un paramètre',
    desc: 'Toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 ⇔ p > 0 et q > 0, bornes exclues.',
    intro: {
      rule: 'Toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 en +∞ si et seulement si les deux racines ont une <b>partie réelle &lt; 0</b>. Pour le 2e ordre, c\'est équivalent à <b>p &gt; 0 et q &gt; 0</b> (somme −p &lt; 0 et produit q &gt; 0 ; en cas de racines complexes, la partie réelle vaut −p/2). Les bornes ne sont pas comprises : une racine nulle donne les constantes, une racine imaginaire pure donne des oscillations qui ne s\'amortissent pas.',
      lines: [
        L('y″ + (a − 1)y′ + (4 − a²)y = 0 : r² + (a − 1)r + 4 − a² = 0', 'Équation caractéristique'),
        L('a − 1 &gt; 0 et 4 − a² &gt; 0', 'Critère p &gt; 0 et q &gt; 0'),
        L('a &gt; 1 et −2 &lt; a &lt; 2, donc a ∈ ]1 ; 2[', 'Intersection'),
        L('En a = 2, r = 0 est racine : y = 1 ne tend pas vers 0', 'Bornes exclues'),
      ],
    },
  }),
  S('a2-ode-subst-other', {
    prereqs: ['a2-ode-linear1', 'a2-ode-const2'], icon: 'z=y¹⁻ᵅ', examWeight: 0, exam: ['mcq'],
    tags: ['opt'],
    title: 'Autres changements de variable : Bernoulli, Euler',
    desc: 'Bernoulli : z = y^{1−α} rend l\'équation linéaire ; Euler : x = eᵗ donne des coefficients constants.',
    prereqWhy: { 'a2-ode-const2': 'Euler : x = eᵗ donne des coefficients constants' },
    intro: {
      rule: 'Bernoulli y′ + a(x)y = b(x)y^α (α ≠ 0, 1) : on pose z = y^{1−α} ; l\'équation en z est linéaire. Euler x²y″ + bxy′ + cy = f(x) (x &gt; 0) : on pose x = eᵗ (ou on essaie y = x^m) ; l\'équation devient à coefficients constants.',
      lines: [
        L('y′ + y = eˣy² : α = 2, z = 1/y', 'Bernoulli'),
        L('z′ = −y′/y² = −(eˣy² − y)/y² = −eˣ + z', 'Dérivée composée'),
        L('z′ − z = −eˣ : μ = e^{−x}, (ze^{−x})′ = −1, z = (C − x)eˣ', 'Linéaire'),
        L('y = e^{−x}/(C − x)', 'Retour à y'),
      ],
    },
  }),
  S('a2-ode-exact', {
    prereqs: ['a2-partials'], icon: 'dH=0', examWeight: 0, exam: ['mcq'],
    tags: ['opt'],
    title: 'Équations exactes',
    desc: 'M dx + N dy = 0 avec M_y = N_x : H_x = M, H_y = N, et H(x, y) = C.',
    intro: {
      rule: 'M(x, y) dx + N(x, y) dy = 0 est exacte si ∂M/∂y = ∂N/∂x (sur un domaine simplement connexe). Il existe alors H avec H_x = M, H_y = N, et les solutions vérifient H(x, y) = C. On trouve H en intégrant M en x, puis on ajuste la « constante » φ(y) avec N.',
      lines: [
        L('(2xy + 3) dx + (x² + 4y) dy = 0, y(0) = 1 : M_y = 2x = N_x', 'Exacte'),
        L('H = ∫ M dx = x²y + 3x + φ(y)', 'Intégrer M en x'),
        L('H_y = x² + φ′(y) = x² + 4y, donc φ = 2y²', 'Ajuster φ'),
        L('x²y + 3x + 2y² = C ; y(0) = 1 donne C = 2', 'Condition initiale'),
      ],
    },
  }),
  S('a2-ode-system', {
    prereqs: ['a2-ode-const2', 'l-eig-diag'], icon: 'X′=AX', examWeight: 0, exam: [],
    tags: ['opt'],
    title: 'Systèmes linéaires X′ = AX',
    desc: 'A diagonalisable : X(t) = Σ Cᵢe^{λᵢt}vᵢ, les constantes par X(0).',
    prereqWhy: { 'a2-ode-const2': 'une équation d\'ordre 2 s\'écrit comme un système', 'l-eig-diag': 'A = PDP⁻¹' },
    intro: {
      rule: 'Si A est diagonalisable, de valeurs propres λᵢ et vecteurs propres vᵢ, X(t) = Σ Cᵢ e^{λᵢt} vᵢ. Les constantes viennent de X(0) = Σ Cᵢvᵢ. Une équation d\'ordre 2 s\'écrit comme un système (x₁ = y, x₂ = y′).',
      lines: [
        L('X′ = AX, A = [[1, 2], [2, 1]], X(0) = (2 ; 0) : (1 − λ)² − 4 = 0, λ = 3 ou λ = −1', 'Valeurs propres'),
        L('v₁ = (1 ; 1), v₂ = (1 ; −1)', 'Vecteurs propres'),
        L('x = C₁e^{3t} + C₂e^{−t} ; y = C₁e^{3t} − C₂e^{−t}', 'X = C₁e^{3t}v₁ + C₂e^{−t}v₂'),
        L('C₁ + C₂ = 2, C₁ − C₂ = 0 : C₁ = C₂ = 1', 'X(0)'),
      ],
    },
  }),
];
