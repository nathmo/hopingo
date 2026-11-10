// Module A2, part h (unit `analyse2`, step U6): differential equations of
// order 1 (Cauchy-Lipschitz, separable, linear, homogeneous y = xv) and
// linear equations of order 2 (structure, constant coefficients,
// Wronskian). Catalogue: docs/universite/A2-analyse-2.md, « EDO ».
// Generators: analyse2-h.js (and analyse2-h-*.js).

const S = (id, rest) => ({ id, unit: 'analyse2', year: 14, optional: false, needsSolo: true, tags: [], ...rest });
const L = (html, note) => ({ html, note, noEq: true });

export const SKILLS = [
  S("a2-ode-cauchy", {
    prereqs: ["a2-partials"], icon: '∃!', examWeight: 1, exam: ["mcq", "tf"],
    title: "Problème de Cauchy : existence, unicité, Lipschitz",
    desc: 'f continue : une solution ; Lipschitz en y : elle est unique, sur |t| ≤ min(a, b/K).',
    prereqWhy: { 'a2-partials': 'majorer ∂f/∂y donne la constante de Lipschitz' },
    intro: {
      rule: "Problème de Cauchy : y′ = f(t, y), y(t₀) = y₀. Si f est continue sur R = {|t − t₀| ≤ a, |y − y₀| ≤ b}, bornée par K, et M-Lipschitz en y (par exemple si |∂f/∂y| ≤ M sur R), il existe une <b>unique</b> solution sur |t − t₀| ≤ min(a, b/K). Continue seule ne suffit pas pour l'unicité. Une solution locale n'est pas forcément globale (y′ = y² explose). Une équation d'ordre r se ramène à un système d'ordre 1 ; elle demande r conditions initiales.",
      lines: [
        L('f(t, y) = t sin y + y² sur R : |t| ≤ 1, |y| ≤ 2', 'Le rectangle'),
        L('∂f/∂y = t cos y + 2y', 'Dériver en y'),
        L('|t cos y + 2y| ≤ 1 + 4 = 5 : M = 5', 'f est 5-Lipschitz en y'),
        L('|f| ≤ |t|·|sin y| + y² ≤ 1 + 4 = 5 = K', 'Borne de f'),
        L('solution unique sur |t| ≤ min(1, 2/5) = 2/5', 'min(a, b/K)'),
      ],
    },
  }),
  S("a2-ode-separable", {
    prereqs: ["a1-int-direct", "a1-int-rational", "g2-hyp-def"], icon: 'dy/h', examWeight: 3, exam: ["mcq", "tf"],
    title: "Équations à variables séparables",
    desc: 'Solutions constantes d\'abord, puis dy/h(y) = g(x) dx et une seule constante.',
    prereqWhy: { "g2-hyp-def": "solutions en tanh (y′ = 4 − y²)" },
    intro: {
      rule: "y′ = g(x)·h(y). (1) Les zéros de h donnent des <b>solutions constantes</b> : on les note avant de diviser. (2) Ailleurs, dy/h(y) = g(x) dx, on intègre des deux côtés, <b>une seule constante</b>. (3) On applique la condition initiale, puis on isole y si possible.",
      lines: [
        L('y′ = 9 − y², y(0) = 0 : y = ±3 sont des solutions constantes', 'y(0) = 0 n\'en est pas une'),
        L('dy/(9 − y²) = dx', 'Séparer'),
        L('(1/6) ln|(3 + y)/(3 − y)| = x + C', 'Éléments simples, puis primitives'),
        L('y(0) = 0 : C = 0', 'Condition initiale'),
        L('(3 + y)/(3 − y) = e^(6x)', 'Positif en x = 0 : signe +'),
        L('y = 3(e^(6x) − 1)/(e^(6x) + 1) = 3 th(3x)', 'Isoler y'),
      ],
    },
  }),
  S("a2-ode-linear1", {
    prereqs: ["a1-int-direct"], icon: 'μ', examWeight: 3, exam: ["mcq", "tf"],
    title: "Linéaires du 1er ordre : facteur intégrant",
    desc: 'Normaliser, μ = e^(∫a), (μy)′ = μb, intégrer.',
    intro: {
      rule: "On écrit d'abord l'équation <b>avec coefficient 1 devant y′</b> : y′ + a(x)y = b(x). Avec A une primitive de a, μ = e^A donne (μy)′ = μb, donc y = e^(−A)(∫ b e^A dx + C). Raccourcis de l'organigramme : si b = 0, y = Ce^(−A) ; si a et b sont constants, on décale vers l'équilibre y* = b/a : y = b/a + Ce^(−ax).",
      lines: [
        L('xy′ + 2y = 4x², y(1) = 2, x > 0', 'L\'énoncé'),
        L('y′ + (2/x)y = 4x', 'Diviser par x'),
        L('μ = e^(∫ 2/x dx) = x²', 'Facteur intégrant'),
        L('(x²y)′ = 4x³', 'Multiplier par μ'),
        L('x²y = x⁴ + C ; y(1) = 2 : C = 1', 'Intégrer, condition initiale'),
        L('y = x² + 1/x²', 'Isoler y'),
      ],
    },
  }),
  S("a2-ode-homog-subst", {
    prereqs: ["a2-ode-separable"], icon: 'y = xv', examWeight: 1, exam: ["mcq"],
    title: "Équations homogènes : y = x·v",
    desc: 'y′ = F(y/x) : y = xv, y′ = v + xv′, l\'équation en v est séparable.',
    intro: {
      rule: "Si y′ = F(y/x), on pose y = x·v(x). Alors <b>y′ = v + x·v′</b> (règle du produit), et l'équation devient séparable : x v′ = F(v) − v.",
      lines: [
        L('xy′ = y + x e^(−y/x), y(1) = 0', 'y′ = y/x + e^(−y/x) : une fonction de y/x'),
        L('y = xv, y′ = v + xv′', 'Règle du produit'),
        L('x(v + xv′) = xv + x e^(−v), soit xv′ = e^(−v)', 'Équation en v'),
        L('e^v dv = dx/x, puis e^v = ln x + C', 'Séparer, intégrer'),
        L('v(1) = 0 : C = 1', 'Condition initiale'),
        L('y = x ln(1 + ln x)', 'Revenir à y'),
      ],
    },
  }),
  S("a2-ode-structure", {
    prereqs: ["l-vec-indep"], icon: 'y_h + y_p', examWeight: 1, exam: ["tf"],
    title: "Structure des solutions des EDO linéaires",
    desc: 'y = y_h + y_p ; superposition des seconds membres.',
    prereqWhy: { "l-vec-indep": "une base de l'espace des solutions est faite de solutions indépendantes" },
    intro: {
      rule: "Pour une EDO linéaire L(y) = b : les solutions de L(y) = 0 forment un espace vectoriel de dimension égale à l'ordre ; la solution générale est y = y_h + y_p. <b>Superposition</b> : si L(y₁) = b₁ et L(y₂) = b₂, alors L(y₁ + y₂) = b₁ + b₂. Une combinaison y₀ + C·y₁ de deux solutions de L(y) = b n'est en général pas une solution.",
      lines: [
        L('y″ + y = 2 + 3eˣ', 'Deux morceaux au second membre'),
        L('y_h = C₁ cos x + C₂ sin x', 'Équation homogène'),
        L('pour 2 : y_p1 = 2', 'Une constante'),
        L('pour 3eˣ : y_p2 = Aeˣ, 2A = 3, y_p2 = (3/2)eˣ', 'Remplacer et identifier'),
        L('y = C₁ cos x + C₂ sin x + 2 + (3/2)eˣ', 'Superposition'),
      ],
    },
  }),
  S("a2-ode-const2", {
    prereqs: ["a2-ode-structure", "quad-formula", "g8-polar"], icon: 'r²', examWeight: 2, exam: ["mcq", "tf"],
    title: "2e ordre homogène à coefficients constants",
    desc: 'Équation caractéristique, puis la forme selon le signe de Δ.',
    prereqWhy: { "a2-ode-structure": "y = C₁y₁ + C₂y₂ : espace de dimension 2", "g8-polar": "e^((α+iβ)x) = e^(αx)(cos βx + i sin βx)" },
    intro: {
      rule: "ay″ + by′ + cy = 0 → équation caractéristique ar² + br + c = 0. Deux racines réelles r₁ ≠ r₂ : C₁e^(r₁x) + C₂e^(r₂x). Racine double r : (C₁ + C₂x)e^(rx). Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx). Deux conditions initiales fixent C₁ et C₂.",
      lines: [
        L('y″ − 4y′ + 13y = 0, y(0) = 1, y′(0) = 0', 'L\'énoncé'),
        L('r² − 4r + 13 = 0 ; Δ = 16 − 52 = −36', 'Équation caractéristique'),
        L('r = 2 ± 3i', 'Racines'),
        L('y = e^(2x)(C₁ cos 3x + C₂ sin 3x)', 'Forme de la solution'),
        L('y(0) = C₁ = 1 ; y′(0) = 2C₁ + 3C₂ = 0, C₂ = −2/3', 'Conditions initiales'),
        L('y = e^(2x)(cos 3x − (2/3) sin 3x)', 'Solution du problème'),
      ],
    },
  }),
  S("a2-ode-wronskian", {
    prereqs: ["a2-ode-linear1", "a2-ode-structure"], icon: 'W', examWeight: 1, exam: ["mcq", "tf"],
    title: "Wronskien et réduction d'ordre",
    desc: 'Abel : W = W₀e^(−∫p), puis (y₂/y₁)′ = W/y₁².',
    prereqWhy: { "a2-ode-linear1": "réduction d'ordre : l'équation en v′ est linéaire du 1er ordre", 'a2-ode-structure': 'y = C₁y₁ + C₂y₂ avec deux solutions indépendantes' },
    intro: {
      rule: "Pour y″ + p(t)y′ + q(t)y = 0 : W = y₁y₂′ − y₁′y₂. Si y₁ et y₂ sont des solutions, W est soit identiquement nul (solutions dépendantes), soit jamais nul. <b>Formule d'Abel</b> : W(t) = W(t₀)·e^(−∫ de t₀ à t de p). Réduction d'ordre : si on connaît y₁, (y₂/y₁)′ = W/y₁², donc y₂ = y₁·∫ W/y₁². Attention : p est le coefficient de y′ <b>après</b> division par le coefficient de y″.",
      lines: [
        L('ty″ + (1 − 2t)y′ + (t − 1)y = 0, t > 0, y₁ = eᵗ', 'L\'énoncé'),
        L('eᵗ(t + 1 − 2t + t − 1) = 0', 'y₁ est une solution'),
        L('p = (1 − 2t)/t = 1/t − 2', 'Diviser par t'),
        L('W = e^(−∫p) = e^(2t − ln t) = e^(2t)/t', 'Abel'),
        L('(y₂/y₁)′ = W/y₁² = 1/t', 'Réduction d\'ordre'),
        L('y₂ = eᵗ ln t ; y = (C₁ + C₂ ln t)eᵗ', 'Solution générale'),
      ],
    },
  }),
];
