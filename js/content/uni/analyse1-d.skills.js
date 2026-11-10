// Module A1, part d (unit `analyse1`, step U2): methods of integration.
// Catalogue: docs/universite/A1-analyse-1.md, « Intégrales ». Primitives
// are judged by `antideriv` (by differentiation), values by `definite`.

const S = (id, rest) => ({ id, unit: 'analyse1', year: 13, optional: false, needsSolo: true, tags: [], ...rest });

export const SKILLS = [
  S('a1-int-direct', {
    prereqs: ['g6-antideriv-usual', 'a1-deriv-rules'], icon: '∫u′/u', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Primitives immédiates : u′/u, u′·uʳ, u′/(1 + u²), u′·eᵘ',
    desc: 'Chercher une dérivée cachée, puis ajuster la constante.',
    prereqWhy: { 'g6-antideriv-usual': 'la table des primitives', 'a1-deriv-rules': 'reconnaître u′ à côté de u' },
    intro: {
      rule: 'Avant toute méthode, on cherche une dérivée cachée : ∫ u′/u = Log|u|, ∫ u′·uʳ = uʳ⁺¹/(r + 1) (r ≠ −1), ∫ u′/(1 + u²) = Arctg u, ∫ u′·eᵘ = eᵘ, ∫ u′/√(1 − u²) = Arcsin u.<br>Il manque souvent une constante : on l\'ajuste.',
      lines: [
        { cas: 'int(x/(1+x^4),x)', note: 'Départ', noEq: true },
        { cas: '(1/2)int(2x/(1+(x^2)^2),x)', note: 'u = x², u′ = 2x : ajuster la constante' },
        { cas: '(1/2)arctan(x^2)+C', note: '∫ u′/(1 + u²) = Arctg u' },
      ],
    },
  }),
  S('a1-int-subst', {
    prereqs: ['a1-int-direct'], icon: 't = φ(x)', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Changement de variable : choisir φ, changer dx et les bornes',
    desc: 't = √x, t = Log x, x = sin t… : dx et les bornes changent aussi.',
    prereqWhy: { 'a1-int-direct': 'intégrer en t' },
    intro: {
      rule: 'On pose t = φ⁻¹(x) (ou x = φ(t)) ; on remplace <b>dx</b> (dx = φ′(t) dt) et, pour une intégrale définie, <b>les bornes</b>.<br>Racine → t = √(…) ; Log x et 1/x → t = Log x ; √(1 − x²) → x = sin t ; √(1 + x²) → x = sinh t.',
      lines: [
        { cas: 'int(1/(√x(1+√x)),x,1,4)', note: 'Départ', noEq: true },
        { cas: 'int(1/(t(1+t))×(2t),t,1,2)', note: 't = √x, x = t², dx = 2t dt ; x = 1 → t = 1, x = 4 → t = 2' },
        { cas: 'int(2/(1+t),t,1,2)', note: 'Simplifier' },
        { cas: '2bracket(ln(1+t),t,1,2)', note: 'Intégrer en t' },
        { cas: '2ln(3/2)', note: 'Évaluer' },
      ],
    },
  }),
  S('a1-int-parts', {
    prereqs: ['a1-int-direct'], icon: '∫uv′', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Intégration par parties',
    desc: '∫ u·v′ = u·v − ∫ u′·v : dériver ce qui se simplifie.',
    prereqWhy: { 'a1-int-direct': 'intégrer v′' },
    intro: {
      rule: '∫ u·v′ = u·v − ∫ u′·v. On dérive ce qui se simplifie (polynôme, Log, Arctg) et on intègre ce qui reste stable (eᵃˣ, sin, cos).<br>Avec eˣ·sin x, deux parties font revenir l\'intégrale de départ : on la résout comme une équation.',
      lines: [
        { cas: 'int(x^2×e^(2x),x)', note: 'Départ', noEq: true },
        { cas: 'x^2×(e^(2x)/2)-int(2x×(e^(2x)/2),x)', note: 'u = x², v′ = e²ˣ : u′ = 2x, v = e²ˣ/2' },
        { cas: 'x^2×(e^(2x)/2)-(x×(e^(2x)/2)-int(e^(2x)/2,x))', note: 'Deuxième intégration par parties' },
        { cas: 'e^(2x)(2x^2-2x+1)/4+C', note: 'Finir et réduire' },
      ],
    },
  }),
  S('a1-int-reduction', {
    prereqs: ['a1-int-parts', 'g5-induction-frame'], icon: 'Iₙ', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Formules de récurrence Iₙ',
    desc: 'Une IPP exprime Iₙ avec Iₙ₋₁ ; on remonte depuis I₀.',
    prereqWhy: { 'a1-int-parts': 'l\'IPP qui fait baisser l\'indice', 'g5-induction-frame': 'remonter la récurrence depuis I₀' },
    intro: {
      rule: 'Une IPP (parfois deux) exprime Iₙ en fonction de Iₙ₋₁ ou Iₙ₋₂. On calcule I₀ (et I₁), puis on remonte.<br>Exemple : Jₙ = ∫₀¹ xⁿeˣ dx = e − n·Jₙ₋₁, J₀ = e − 1.',
      lines: [
        { cas: 'J_n', note: 'Départ : Jₙ = ∫₀¹ xⁿeˣ dx', noEq: true },
        { cas: 'bracket(x^n×e^x,x,0,1)-n×int(x^(n-1)×e^x,x,0,1)', note: 'IPP : u = xⁿ, v′ = eˣ' },
        { cas: 'e-n×J_(n-1)', note: 'Récurrence (n ≥ 1)' },
        { cas: 'J_3', note: 'Puis J₀ = e − 1, et on remonte', noEq: true },
        { cas: 'e-3(e-2(e-(e-1)))', note: 'J₃ = e − 3J₂, J₂ = e − 2J₁, J₁ = e − J₀' },
        { cas: '6-2e', note: 'Valeur' },
      ],
    },
  }),
  S('a1-int-rational', {
    prereqs: ['g0-pfd-general', 'a1-int-direct', 'g0-long-div'], icon: '∫P/Q', examWeight: 2, exam: ['mcq', 'open'],
    title: 'Fractions rationnelles : DES, y compris avec un facteur irréductible',
    desc: 'Division, factorisation, éléments simples, puis Log et Arctg.',
    prereqWhy: { 'g0-pfd-general': 'la décomposition en éléments simples', 'a1-int-direct': 'primitives Log et Arctg des éléments simples', 'g0-long-div': 'la division si deg P ≥ deg Q' },
    intro: {
      rule: '(1) Si deg P ≥ deg Q, division euclidienne ; (2) factoriser Q sur ℝ ; (3) DES : A/(x − a), B/(x − a)², (Cx + D)/(x² + px + q) avec Δ < 0 ; (4) intégrer : Log pour les premiers, et pour le facteur irréductible on sépare Cx + D = (C/2)(2x + p) + E : un Log et un Arctg.',
      lines: [
        { cas: 'int((x+5)/((x-1)(x^2+2x+5)),x)', note: 'Départ', noEq: true },
        { cas: 'int((3/4)/(x-1)-(1/4)(3x+5)/(x^2+2x+5),x)', note: 'Éléments simples (A = 3/4 en x = 1)' },
        { cas: '(3/4)int(1/(x-1),x)-(3/8)int((2x+2)/(x^2+2x+5),x)-(1/2)int(1/((x+1)^2+4),x)', note: '3x + 5 = (3/2)(2x + 2) + 2 ; x² + 2x + 5 = (x + 1)² + 4' },
        { cas: '(3/4)ln(|x-1|)-(3/8)ln(x^2+2x+5)-(1/4)arctan((x+1)/2)+C', note: 'Log et Arctg' },
      ],
    },
  }),
  S('a1-int-trig', {
    prereqs: ['a1-int-rational', 'a1-int-subst', 'g3-bioche'], icon: '∫R(sin, cos)', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Fractions rationnelles en sin et cos : Bioche et t = tan(x/2)',
    desc: 'Invariance par x → −x, π − x, π + x ; sinon t = tan(x/2).',
    prereqWhy: { 'a1-int-rational': 'la fraction rationnelle en t', 'a1-int-subst': 'changer dx et les bornes avec t', 'g3-bioche': 'les règles de Bioche' },
    intro: {
      rule: 'Si l\'intégrande·dx est invariant par x → −x, poser t = cos x ; par x → π − x, t = sin x ; par x → π + x, t = tan x. Sinon, t = tan(x/2) marche toujours : sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), dx = 2 dt/(1 + t²).',
      lines: [
        { cas: 'int(sin(x)^3/(1+cos(x)^2),x)', note: 'Départ', noEq: true },
        { cas: 'int(-(1-t^2)/(1+t^2),t)', note: 'x → −x : t = cos x, dt = −sin x dx, sin²x = 1 − t²' },
        { cas: 'int(1-2/(1+t^2),t)', note: 'Diviser' },
        { cas: 't-2arctan(t)+C', note: 'Intégrer' },
        { cas: 'cos(x)-2arctan(cos(x))+C', note: 'Revenir en x' },
      ],
    },
  }),
  S('a1-int-hyper', {
    prereqs: ['a1-int-subst', 'g2-hyp-formulas'], icon: '∫cosh', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'sinh et cosh dans les intégrales',
    desc: '√(x² + a²) → x = a·sinh t ; cosh² − sinh² = 1.',
    prereqWhy: { 'a1-int-subst': 'le changement de variable x = a·sinh t', 'g2-hyp-formulas': 'cosh² − sinh² = 1' },
    intro: {
      rule: 'cosh² − sinh² = 1. √(x² + a²) → x = a·sinh t ; √(x² − a²) → x = a·cosh t (t ≥ 0). Argsh x = Log(x + √(x² + 1)).<br>Avec eˣ partout, poser t = eˣ ramène à une fraction rationnelle.',
      lines: [
        { cas: 'int(1/√(x^2+4),x)', note: 'Départ', noEq: true },
        { cas: 'int(2cosh(t)/√(4sinh(t)^2+4),t)', note: 'x = 2 sinh t, dx = 2 cosh t dt' },
        { cas: 'int(2cosh(t)/(2cosh(t)),t)', note: '4 sinh²t + 4 = 4 cosh²t' },
        { cas: 't+C', note: 'Intégrer' },
        { cas: 'argsh(x/2)+C', note: 'Revenir en x : Argsh(x/2) = Log(x + √(x² + 4)) − Log 2' },
      ],
    },
  }),
];
