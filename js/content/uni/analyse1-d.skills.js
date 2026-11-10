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
    },
  }),
  S('a1-int-subst', {
    prereqs: ['a1-int-direct'], icon: 't = φ(x)', examWeight: 2, exam: ['mcq', 'tf'],
    title: 'Changement de variable : choisir φ, changer dx et les bornes',
    desc: 't = √x, t = Log x, x = sin t… : dx et les bornes changent aussi.',
    prereqWhy: { 'a1-int-direct': 'intégrer en t' },
    intro: {
      rule: 'On pose t = φ⁻¹(x) (ou x = φ(t)) ; on remplace <b>dx</b> (dx = φ′(t) dt) et, pour une intégrale définie, <b>les bornes</b>.<br>Racine → t = √(…) ; Log x et 1/x → t = Log x ; √(1 − x²) → x = sin t ; √(1 + x²) → x = sinh t.',
    },
  }),
  S('a1-int-parts', {
    prereqs: ['a1-int-direct'], icon: '∫uv′', examWeight: 2, exam: ['mcq', 'tf', 'open'],
    title: 'Intégration par parties',
    desc: '∫ u·v′ = u·v − ∫ u′·v : dériver ce qui se simplifie.',
    prereqWhy: { 'a1-int-direct': 'intégrer v′' },
    intro: {
      rule: '∫ u·v′ = u·v − ∫ u′·v. On dérive ce qui se simplifie (polynôme, Log, Arctg) et on intègre ce qui reste stable (eᵃˣ, sin, cos).<br>Avec eˣ·sin x, deux parties font revenir l\'intégrale de départ : on la résout comme une équation.',
    },
  }),
  S('a1-int-reduction', {
    prereqs: ['a1-int-parts', 'g5-induction-frame'], icon: 'Iₙ', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Formules de récurrence Iₙ',
    desc: 'Une IPP exprime Iₙ avec Iₙ₋₁ ; on remonte depuis I₀.',
    prereqWhy: { 'a1-int-parts': 'l\'IPP qui fait baisser l\'indice', 'g5-induction-frame': 'remonter la récurrence depuis I₀' },
    intro: {
      rule: 'Une IPP (parfois deux) exprime Iₙ en fonction de Iₙ₋₁ ou Iₙ₋₂. On calcule I₀ (et I₁), puis on remonte.<br>Exemple : Jₙ = ∫₀¹ xⁿeˣ dx = e − n·Jₙ₋₁, J₀ = e − 1.',
    },
  }),
  S('a1-int-rational', {
    prereqs: ['g0-pfd-general', 'a1-int-direct', 'g0-long-div'], icon: '∫P/Q', examWeight: 2, exam: ['mcq', 'open'],
    title: 'Fractions rationnelles : DES, y compris avec un facteur irréductible',
    desc: 'Division, factorisation, éléments simples, puis Log et Arctg.',
    prereqWhy: { 'g0-pfd-general': 'la décomposition en éléments simples', 'a1-int-direct': 'primitives Log et Arctg des éléments simples', 'g0-long-div': 'la division si deg P ≥ deg Q' },
    intro: {
      rule: '(1) Si deg P ≥ deg Q, division euclidienne ; (2) factoriser Q sur ℝ ; (3) DES : A/(x − a), B/(x − a)², (Cx + D)/(x² + px + q) avec Δ < 0 ; (4) intégrer : Log pour les premiers, et pour le facteur irréductible on sépare Cx + D = (C/2)(2x + p) + E : un Log et un Arctg.',
    },
  }),
  S('a1-int-trig', {
    prereqs: ['a1-int-rational', 'a1-int-subst', 'g3-bioche'], icon: '∫R(sin, cos)', examWeight: 1, exam: ['mcq', 'open'],
    title: 'Fractions rationnelles en sin et cos : Bioche et t = tan(x/2)',
    desc: 'Invariance par x → −x, π − x, π + x ; sinon t = tan(x/2).',
    prereqWhy: { 'a1-int-rational': 'la fraction rationnelle en t', 'a1-int-subst': 'changer dx et les bornes avec t', 'g3-bioche': 'les règles de Bioche' },
    intro: {
      rule: 'Si l\'intégrande·dx est invariant par x → −x, poser t = cos x ; par x → π − x, t = sin x ; par x → π + x, t = tan x. Sinon, t = tan(x/2) marche toujours : sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), dx = 2 dt/(1 + t²).',
    },
  }),
  S('a1-int-hyper', {
    prereqs: ['a1-int-subst', 'g2-hyp-formulas'], icon: '∫cosh', examWeight: 1, exam: ['mcq', 'tf'],
    title: 'sinh et cosh dans les intégrales',
    desc: '√(x² + a²) → x = a·sinh t ; cosh² − sinh² = 1.',
    prereqWhy: { 'a1-int-subst': 'le changement de variable x = a·sinh t', 'g2-hyp-formulas': 'cosh² − sinh² = 1' },
    intro: {
      rule: 'cosh² − sinh² = 1. √(x² + a²) → x = a·sinh t ; √(x² − a²) → x = a·cosh t (t ≥ 0). Argsh x = Log(x + √(x² + 1)).<br>Avec eˣ partout, poser t = eˣ ramène à une fraction rationnelle.',
    },
  }),
];
