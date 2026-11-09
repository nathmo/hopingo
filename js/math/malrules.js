// Catalogue of known mistakes ("pièges"). Sources and tags are in
// docs/error-catalogue.md: R = research, P = French programme, E = classroom
// experience, to be checked by a teacher.
//
// Operation rules have `op` and `apply(A, B, op)`, which returns the wrong
// values a student following the rule would get. A and B are operands as
// written: {n, d, int}. `op` is one of + - × ÷, or ^ (A is the base, B the
// exponent) or √ (A is the number under the root, B is null).
// Structural rules (order, brackets, distributing) are replayed in
// diagnose.js. Answer rules (comparing, reading...) are applied by the
// generators that create those questions.
//
// explain(A, B, op) uses the student's numbers when the mistake was
// diagnosed; it is called with no arguments when the mistake was only
// recognised from a final answer, and must then stay general.

import { Q, lcm } from './rational.js';

export const FAMILIES = {
  whole: {
    name: 'Fraction lue comme deux nombres',
    hint: 'Une fraction est UN seul nombre, pas un nombre en haut et un nombre en bas.',
  },
  rule: {
    name: 'Règle utilisée au mauvais endroit',
    hint: 'Chaque opération a sa règle : vérifie laquelle tu appliques.',
  },
  order: {
    name: 'Ordre des calculs',
    hint: '× et ÷ passent avant + et −, et les parenthèses passent avant tout.',
  },
  meaning: {
    name: 'Sens des nombres',
    hint: 'Pense à ce que le nombre représente : des parts égales d\'une unité, une position sur la droite.',
  },
  sign: {
    name: 'Règle des signes',
    hint: 'Pour + et −, pense à avancer et reculer sur la droite. La règle « moins par moins » ne vaut que pour × et ÷.',
  },
  symbol: {
    name: 'Écriture mal lue',
    hint: 'Relis ce que dit le symbole : un exposant compte des facteurs, une racine défait un carré.',
  },
  distribute: {
    name: 'Fausse distributivité',
    hint: 'Une puissance ou une racine ne se distribue pas sur une somme : calcule d\'abord la parenthèse.',
  },
  facts: {
    name: 'Fait numérique',
    hint: 'Si tu hésites, pars d\'un fait sûr (× 10, le double, un carré connu) et ajuste.',
  },
  place: {
    name: 'Dizaines et unités',
    hint: 'Dix unités font une dizaine : quand les unités dépassent 9 (ou manquent), les dizaines changent aussi.',
  },
};

// Inline fraction HTML for explanations.
export const F = (n, d) => (d === 1 ? `${n}` : `<span class="m-frac"><span class="m-n">${n}</span><span class="m-d">${d}</span></span>`);
const FQ = (v) => F(v.n, v.d);
const val = (n, d) => { try { return new Q(n, d); } catch { return null; } };
// Both operands are written as fractions (not integers, not decimals).
const both = (A, B) => !A.int && !B.int && !A.decimal && !B.decimal;
// One integer and one fraction.
const intAndFrac = (A, B) => A.int !== B.int && !A.decimal && !B.decimal;

// Signed numbers in explanations.
const qv = (p) => (p instanceof Q ? p : new Q(p.n, p.d));
const neg = (p) => p.n < 0;
const absQ = (p) => { const v = qv(p); return v.n < 0 ? v.neg() : v; };
const opQ = (a, b, op) => {
  if (op === '+') return a.add(b);
  if (op === '-') return a.sub(b);
  if (op === '×') return a.mul(b);
  return b.n === 0 ? null : a.div(b);
};
// A number as HTML: −3, or a stacked fraction with its sign.
export const V = (p) => {
  const v = qv(p);
  return v.d === 1 ? String(v.n).replace('-', '−') : `${v.n < 0 ? '−' : ''}${F(Math.abs(v.n), v.d)}`;
};
// A power as HTML, bracketing negative or fractional bases: (−2)³.
const P = (A, k) => {
  const v = qv(A);
  const b = v.d === 1 && v.n >= 0 ? V(v) : `(${V(v)})`;
  return `${b}<sup>${String(k).replace('-', '−')}</sup>`;
};

export const RULES = [
  // ----- addition and subtraction -----
  {
    id: 'add_across', family: 'whole', tag: 'R', op: '+', skill: 'frac-add-any', repair: 'frac-equiv',
    name: 'Additionner en haut et en bas',
    example: ['1/2 + 1/3 = 2/5', '1/2 + 1/3 = 5/6'],
    apply: (A, B) => (both(A, B) && A.d !== B.d ? [val(A.n + B.n, A.d + B.d)] : []),
    explain: (A, B) => {
      // (a+c)/(b+d) always lies between the two fractions, so it is never
      // bigger than the larger one: a sum should be.
      const big = A.n * B.d >= B.n * A.d ? A : B;
      return `Tu as additionné les numérateurs entre eux et les dénominateurs entre eux. Mais ${F(A.n + B.n, A.d + B.d)} n'est même pas plus grand que ${F(big.n, big.d)} tout seul : en ajoutant quelque chose, le résultat devrait grandir ! Il faut d'abord écrire les deux fractions avec le même dénominateur.`;
    },
  },
  {
    id: 'add_denominators', family: 'whole', tag: 'R', op: '+', skill: 'frac-add-same', repair: 'frac-read',
    name: 'Additionner aussi les dénominateurs',
    example: ['2/7 + 3/7 = 5/14', '2/7 + 3/7 = 5/7'],
    apply: (A, B) => (both(A, B) && A.d === B.d ? [val(A.n + B.n, 2 * A.d)] : []),
    explain: (A, B) => `Le dénominateur dit en combien de parts on a coupé l'unité. Des ${frName(A.d)} plus des ${frName(A.d)}, ça donne toujours des ${frName(A.d)} : on garde ${A.d} et on additionne seulement les numérateurs.`,
  },
  {
    id: 'sub_across', family: 'whole', tag: 'R', op: '-', skill: 'frac-add-any', repair: 'frac-equiv',
    name: 'Soustraire en haut et en bas',
    example: ['3/4 − 1/2 = 2/2', '3/4 − 1/2 = 1/4'],
    apply: (A, B) => (both(A, B) && A.d !== B.d && A.d - B.d !== 0 ? [val(A.n - B.n, A.d - B.d)] : []),
    explain: () => 'Tu as soustrait les numérateurs entre eux et les dénominateurs entre eux. On ne peut soustraire que des parts de même taille : écris d\'abord les deux fractions avec le même dénominateur.',
  },
  {
    id: 'ignore_denominators', family: 'whole', tag: 'R', op: '+-', skill: 'frac-add-multiple', repair: 'frac-equiv',
    name: 'Garder un dénominateur sans transformer',
    example: ['1/2 + 3/4 = 4/4', '1/2 + 3/4 = 5/4'],
    apply: (A, B, op) => {
      if (!both(A, B) || A.d === B.d) return [];
      const n = op === '+' ? A.n + B.n : A.n - B.n;
      return [val(n, A.d), val(n, B.d)];
    },
    explain: (A, B) => `Les deux fractions n'ont pas le même dénominateur : ${F(A.n, A.d)} et ${F(B.n, B.d)} ne comptent pas des parts de même taille. Transforme d'abord chaque fraction pour qu'elles aient le même dénominateur.`,
  },
  {
    id: 'forget_amplify', family: 'rule', tag: 'E', op: '+-', skill: 'frac-add-any', repair: 'frac-equiv',
    name: 'Changer le dénominateur sans changer le numérateur',
    example: ['1/2 + 1/3 = 2/6', '1/2 + 1/3 = 5/6'],
    apply: (A, B, op) => {
      if (!both(A, B) || A.d === B.d) return [];
      const n = op === '+' ? A.n + B.n : A.n - B.n;
      return [val(n, lcm(A.d, B.d)), val(n, A.d * B.d)];
    },
    explain: (A, B) => {
      const L = lcm(A.d, B.d);
      return `Le dénominateur commun est bien ${L}, mais quand on multiplie le dénominateur, on doit multiplier le numérateur par le même nombre : ${F(A.n, A.d)} = ${F(A.n * (L / A.d), L)} et ${F(B.n, B.d)} = ${F(B.n * (L / B.d), L)}.`;
    },
  },
  {
    id: 'mult_rule_for_addition', family: 'rule', tag: 'R', op: '+', skill: 'frac-add-any', repair: 'frac-add-same',
    name: 'Multiplier au lieu d\'additionner',
    example: ['1/2 + 1/3 = 1/6', '1/2 + 1/3 = 5/6'],
    apply: (A, B) => (both(A, B) ? [val(A.n * B.n, A.d * B.d)] : []),
    explain: () => '« On multiplie en haut et en bas » est la règle de la multiplication. Pour additionner, on met au même dénominateur, puis on additionne les numérateurs.',
  },
  {
    id: 'int_plus_frac', family: 'whole', tag: 'E', op: '+-', skill: 'frac-unit', repair: 'frac-unit',
    name: 'Ajouter l\'entier au numérateur',
    example: ['2 + 3/4 = 5/4', '2 + 3/4 = 11/4'],
    apply: (A, B, op) => {
      if (!intAndFrac(A, B)) return [];
      const k = A.int ? A : B;
      const f = A.int ? B : A;
      if (op === '+') return [val(k.n + f.n, f.d)];
      return A.int ? [val(k.n - f.n, f.d)] : [val(f.n - k.n, f.d)];
    },
    explain: (A, B) => {
      const k = A.int ? A : B;
      const f = A.int ? B : A;
      return `${k.n} n'est pas ${k.n} ${frName(f.d, true)} : c'est ${k.n} unités entières. Écris d'abord ${k.n} = ${F(k.n * f.d, f.d)}.`;
    },
  },

  // ----- multiplication -----
  {
    id: 'int_times_both', family: 'rule', tag: 'E', op: '×', skill: 'frac-mul-int', repair: 'frac-of',
    name: 'Multiplier en haut ET en bas par l\'entier',
    example: ['3 × 2/5 = 6/15', '3 × 2/5 = 6/5'],
    apply: (A, B) => {
      if (!intAndFrac(A, B)) return [];
      const f = A.int ? B : A;
      return [val(f.n, f.d)];
    },
    explain: (A, B) => {
      const k = A.int ? A : B;
      const f = A.int ? B : A;
      return `Multiplier en haut et en bas par ${k.n}, c'est écrire une fraction égale : le nombre ne change pas ! ${k.n} × ${F(f.n, f.d)}, c'est ${k.n} fois ${f.n} parts : on multiplie seulement le numérateur.`;
    },
  },
  {
    id: 'keep_common_denominator_mult', family: 'rule', tag: 'R', op: '×', skill: 'frac-mul', repair: 'frac-mul',
    name: 'Garder le dénominateur commun en multipliant',
    example: ['2/5 × 3/5 = 6/5', '2/5 × 3/5 = 6/25'],
    apply: (A, B) => {
      if (!both(A, B)) return [];
      const L = lcm(A.d, B.d);
      return [val((A.n * L / A.d) * (B.n * L / B.d), L)];
    },
    explain: () => 'Le dénominateur commun sert pour additionner et soustraire. Pour multiplier, pas besoin : on multiplie les numérateurs entre eux et les dénominateurs entre eux.',
  },

  // ----- division -----
  {
    id: 'mult_across_division', family: 'rule', tag: 'R', op: '÷', skill: 'frac-div', repair: 'frac-div',
    name: 'Diviser en multipliant tout droit',
    example: ['2/3 ÷ 4/5 = 8/15', '2/3 ÷ 4/5 = 5/6'],
    apply: (A, B) => (both(A, B) ? [val(A.n * B.n, A.d * B.d)] : []),
    explain: (A, B) => `Tu as multiplié au lieu de diviser. Diviser par ${F(B.n, B.d)}, c'est multiplier par son inverse ${F(B.d, B.n)}.`,
  },
  {
    id: 'invert_first', family: 'rule', tag: 'E', op: '÷', skill: 'frac-div', repair: 'frac-div',
    name: 'Inverser la mauvaise fraction',
    example: ['2/3 ÷ 4/5 = 3/2 × 4/5', '2/3 ÷ 4/5 = 2/3 × 5/4'],
    apply: (A, B) => {
      if (A.n === 0 || B.n === 0 || A.decimal || B.decimal || (A.int && B.int)) return [];
      return [val(A.d * B.n, A.n * B.d), val(A.d * B.d, A.n * B.n)];
    },
    explain: (A, B) => `C'est la fraction PAR laquelle on divise qu'on inverse, ici ${F(B.n, B.d)} → ${F(B.d, B.n)}. La première fraction ne bouge pas.`,
  },

  // ----- order of operations -----
  {
    id: 'priority_left_to_right', family: 'order', tag: 'R', skill: 'frac-multistep', repair: 'frac-multistep',
    name: 'Calculer de gauche à droite sans priorités',
    example: ['1/2 + 1/3 × 3/4 = 5/6 × 3/4', '1/2 + 1/3 × 3/4 = 1/2 + 1/4'],
    explain: () => 'Attention aux priorités : on calcule les × et ÷ avant les + et −, même s\'ils sont plus à droite.',
  },
  {
    id: 'ignore_parentheses', family: 'order', tag: 'R', skill: 'frac-multistep', repair: 'frac-multistep',
    name: 'Oublier les parenthèses',
    example: ['(1/2 + 1/4) × 2 = 1/2 + 1/2', '(1/2 + 1/4) × 2 = 3/4 × 2'],
    explain: () => 'Les parenthèses passent avant tout : calcule d\'abord ce qui est entre parenthèses.',
  },

  // ----- answer rules (applied by question generators) -----
  {
    id: 'compare_numerators', family: 'whole', tag: 'R', skill: 'frac-compare', repair: 'frac-line',
    name: 'Comparer seulement les numérateurs',
    example: ['3/5 > 2/3 car 3 > 2', '3/5 < 2/3'],
    explain: () => 'Un plus grand numérateur ne suffit pas : les parts n\'ont peut-être pas la même taille. Mets les fractions au même dénominateur, ou compare-les à 1/2.',
  },
  {
    id: 'compare_denominators', family: 'whole', tag: 'R', skill: 'frac-compare', repair: 'frac-line',
    name: 'Plus grand dénominateur, plus grande fraction',
    example: ['1/4 > 1/3 car 4 > 3', '1/4 < 1/3'],
    explain: () => 'Plus on coupe l\'unité en beaucoup de parts, plus chaque part est petite : un quart est plus petit qu\'un tiers.',
  },
  {
    id: 'compare_smallest_denominator', family: 'whole', tag: 'R', skill: 'frac-compare', repair: 'frac-compare',
    name: 'Plus petit dénominateur, toujours plus grand',
    example: ['2/5 > 7/8 car 5 < 8', '2/5 < 7/8'],
    explain: () => 'Les parts sont plus grandes, mais il faut aussi regarder combien on en prend. Compare les deux fractions avec le même dénominateur.',
  },
  {
    id: 'read_swap', family: 'meaning', tag: 'P', skill: 'frac-read', repair: 'frac-read',
    name: 'Inverser numérateur et dénominateur',
    example: ['2 parts colorées sur 5 → 5/2', '2/5'],
    explain: () => 'En bas, le dénominateur : en combien de parts égales on a coupé. En haut, le numérateur : combien de parts on prend.',
  },
  {
    id: 'read_part_over_rest', family: 'meaning', tag: 'E', skill: 'frac-read', repair: 'frac-read',
    name: 'Compter les parts restantes au lieu du total',
    example: ['2 parts colorées, 3 blanches → 2/3', '2/5'],
    explain: () => 'Le dénominateur compte TOUTES les parts de l\'unité, colorées et blanches ensemble.',
  },
  {
    id: 'read_total_parts', family: 'meaning', tag: 'E', skill: 'frac-read', repair: 'frac-line',
    name: 'Compter les parts de toutes les figures',
    example: ['2 disques en quarts, 7 parts colorées → 7/8', '7/4'],
    explain: () => 'Le dénominateur compte les parts d\'UNE seule unité. Si chaque disque est coupé en 4, on compte en quarts, même au-delà d\'un disque.',
  },
  {
    id: 'equiv_additive', family: 'whole', tag: 'R', skill: 'frac-equiv', repair: 'frac-equiv',
    name: 'Ajouter au lieu de multiplier',
    example: ['2/3 = 14/15 (on ajoute 12)', '2/3 = 10/15 (on multiplie par 5)'],
    explain: () => 'Pour garder la même fraction, on MULTIPLIE le numérateur et le dénominateur par le même nombre. Ajouter le même nombre change la fraction.',
  },
  {
    id: 'equiv_denominator_only', family: 'rule', tag: 'E', skill: 'frac-equiv', repair: 'frac-equiv',
    name: 'Changer seulement le dénominateur',
    example: ['2/3 = 2/15', '2/3 = 10/15'],
    explain: () => 'Si on coupe chaque part en 5, on a 5 fois plus de parts au total, ET 5 fois plus de parts prises : on multiplie en haut et en bas.',
  },
  {
    id: 'simplify_subtract', family: 'whole', tag: 'E', skill: 'frac-simplify', repair: 'frac-equiv',
    name: 'Simplifier en soustrayant',
    example: ['6/8 = 4/6 (on enlève 2)', '6/8 = 3/4 (on divise par 2)'],
    explain: () => 'Simplifier, c\'est DIVISER le numérateur et le dénominateur par le même nombre. Soustraire change la fraction.',
  },
  {
    id: 'simplify_one_part', family: 'rule', tag: 'E', skill: 'frac-simplify', repair: 'frac-equiv',
    name: 'Diviser seulement une partie',
    example: ['6/8 = 3/8', '6/8 = 3/4'],
    explain: () => 'Il faut diviser le numérateur ET le dénominateur par le même nombre, sinon la fraction change.',
  },
  {
    id: 'of_divide_only', family: 'meaning', tag: 'E', skill: 'frac-of', repair: 'frac-read',
    name: 'Prendre une part au lieu de plusieurs',
    example: ['2/3 de 12 = 4', '2/3 de 12 = 8'],
    explain: () => 'Diviser par le dénominateur donne UNE part. Il faut ensuite prendre autant de parts que le numérateur.',
  },
  {
    id: 'of_multiply_only', family: 'meaning', tag: 'E', skill: 'frac-of', repair: 'frac-read',
    name: 'Oublier de partager',
    example: ['2/3 de 12 = 24', '2/3 de 12 = 8'],
    explain: () => 'Prendre une fraction d\'une quantité donne moins que la quantité quand la fraction est plus petite que 1. Partage d\'abord en parts égales.',
  },
  {
    id: 'quotient_larger_by_smaller', family: 'meaning', tag: 'R', skill: 'frac-quotient', repair: 'frac-quotient',
    name: 'Toujours diviser le grand par le petit',
    example: ['4 pizzas pour 6 enfants → 6/4', '4/6'],
    explain: () => 'On peut partager un petit nombre en beaucoup de parts : chacun reçoit alors moins que 1. Ce qu\'on partage va en haut, le nombre de parts en bas.',
  },
  {
    id: 'decimal_digits', family: 'meaning', tag: 'E', skill: 'frac-decimal', repair: 'frac-decimal',
    name: 'Écrire les chiffres côte à côte',
    example: ['1/4 = 1,4', '1/4 = 0,25'],
    explain: () => 'La barre de fraction veut dire « divisé par ». 1/4, c\'est 1 divisé par 4, donc 0,25. Ce n\'est pas « 1 virgule 4 ».',
  },
  {
    id: 'mixed_subtract_whole', family: 'meaning', tag: 'E', skill: 'frac-unit', repair: 'frac-line',
    name: 'Enlever l\'entier au lieu des parts',
    example: ['17/5 = 3 + 14/5', '17/5 = 3 + 2/5'],
    explain: () => 'Une unité, c\'est autant de parts que le dénominateur. 3 unités en cinquièmes, ce sont 15 parts, pas 3.',
  },

  // ----- signed numbers -----
  {
    id: 'neg_plus_neg_positive', family: 'sign', tag: 'R', op: '+', skill: 'rel-add', repair: 'rel-read',
    name: 'Deux négatifs donnent un positif (en addition)',
    example: ['−3 + (−4) = 7', '−3 + (−4) = −7'],
    apply: (A, B) => (neg(A) && neg(B) ? [qv(A).add(qv(B)).neg()] : []),
    explain: (A, B) => `« Moins par moins donne plus » est une règle de la multiplication. Ajouter un nombre négatif, c'est reculer${A ? ` : pars de ${V(A)} et recule encore de ${V(absQ(B))}, tu arrives à ${V(qv(A).add(qv(B)))}` : ''}.`,
  },
  {
    id: 'minus_minus_positive', family: 'sign', tag: 'R', op: '-', skill: 'rel-sub', repair: 'rel-add',
    name: 'Les deux signes − s\'annulent (en soustraction)',
    example: ['−3 − 4 = 7', '−3 − 4 = −7'],
    apply: (A, B) => (neg(A) && B.n > 0 ? [qv(A).sub(qv(B)).neg()] : []),
    explain: (A, B) => `Ici, les deux signes « − » ne se multiplient pas. ${A ? `On part de ${V(A)} et on recule encore de ${V(B)} : on arrive à ${V(qv(A).sub(qv(B)))}.` : 'On part d\'un nombre négatif et on recule encore : le résultat est encore plus négatif.'}`,
  },
  {
    id: 'sub_neg_subtracts', family: 'sign', tag: 'R', op: '-', skill: 'rel-sub', repair: 'rel-sub',
    name: 'Soustraire un négatif comme un positif',
    example: ['5 − (−3) = 2', '5 − (−3) = 8'],
    apply: (A, B) => (neg(B) ? [qv(A).add(qv(B))] : []),
    explain: (A, B) => `Soustraire un nombre négatif, c'est ajouter son opposé${A ? ` : ${V(A)} − (${V(B)}) = ${V(A)} + ${V(absQ(B))} = ${V(qv(A).sub(qv(B)))}` : ' : 5 − (−3) = 5 + 3 = 8'}.`,
  },
  {
    id: 'add_ignore_signs', family: 'sign', tag: 'R', op: '+-', skill: 'rel-add', repair: 'rel-read',
    name: 'Oublier les signes',
    example: ['−2 + 5 = 7', '−2 + 5 = 3'],
    apply: (A, B, op) => {
      if (op === '+') return neg(A) || neg(B) ? [absQ(A).add(absQ(B))] : [];
      return neg(A) ? [absQ(A).sub(absQ(B))] : [];
    },
    explain: (A) => `Le signe fait partie du nombre : ${A && neg(A) ? `${V(A)}, c'est ${V(absQ(A))} sous zéro` : '−2, c\'est 2 sous zéro'}. Sur la droite graduée, ajouter un positif fait avancer, ajouter un négatif fait reculer.`,
  },
  {
    id: 'add_sizes_keep_minus', family: 'sign', tag: 'P', op: '+', skill: 'rel-add', repair: 'rel-read',
    name: 'Additionner les distances malgré des signes contraires',
    example: ['−5 + 7 = −12', '−5 + 7 = 2'],
    apply: (A, B) => (A.n && B.n && neg(A) !== neg(B) ? [absQ(A).add(absQ(B)).neg()] : []),
    explain: () => 'Les signes sont contraires : avancer et reculer se compensent. On fait la DIFFÉRENCE des distances à zéro, et on garde le signe du nombre le plus éloigné de zéro.',
  },
  {
    id: 'sign_of_first', family: 'sign', tag: 'E', op: '+', skill: 'rel-add', repair: 'rel-add',
    name: 'Prendre le signe du premier nombre',
    example: ['−3 + 8 = −5', '−3 + 8 = 5'],
    apply: (A, B) => {
      if (!A.n || !B.n || neg(A) === neg(B)) return [];
      const r = qv(A).add(qv(B));
      const size = r.n < 0 ? r.neg() : r;
      return [neg(A) ? size.neg() : size];
    },
    explain: (A, B) => `Le résultat prend le signe du nombre le plus éloigné de zéro${A ? ` (ici ${V(absQ(A).cmp(absQ(B)) >= 0 ? qv(A) : qv(B))})` : ''}, pas forcément celui du premier nombre.`,
  },
  {
    id: 'reverse_subtraction', family: 'sign', tag: 'R', op: '-', skill: 'rel-sub', repair: 'rel-read',
    name: 'Échanger les nombres pour éviter un négatif',
    example: ['3 − 5 = 2', '3 − 5 = −2'],
    apply: (A, B) => (!neg(A) && !neg(B) && qv(A).cmp(qv(B)) < 0 ? [qv(B).sub(qv(A))] : []),
    explain: (A, B) => `On ne peut pas échanger les deux nombres d'une soustraction. ${A ? `Pars de ${V(A)} et recule de ${V(B)} : tu passes sous zéro et tu arrives à ${V(qv(A).sub(qv(B)))}.` : 'Si on enlève plus que ce qu\'on a, le résultat est négatif.'}`,
  },
  {
    id: 'mul_neg_neg_negative', family: 'sign', tag: 'R', op: '×÷', skill: 'rel-mul', repair: 'rel-mul',
    name: 'Négatif fois négatif donne négatif',
    example: ['−3 × (−4) = −12', '−3 × (−4) = 12'],
    apply: (A, B, op) => {
      if (!neg(A) || !neg(B)) return [];
      const r = opQ(qv(A), qv(B), op);
      return r ? [r.neg()] : [];
    },
    explain: (A, B, op) => `Deux nombres négatifs : le ${op === '÷' ? 'quotient' : 'produit'} est POSITIF. Compte les signes « − » : deux, c'est un nombre pair.`,
  },
  {
    id: 'mul_sign_dropped', family: 'sign', tag: 'R', op: '×÷', skill: 'rel-mul', repair: 'rel-mul',
    name: 'Oublier le signe d\'un produit',
    example: ['−2 × 5 = 10', '−2 × 5 = −10'],
    apply: (A, B, op) => {
      if (neg(A) === neg(B)) return [];
      const r = opQ(qv(A), qv(B), op);
      return r ? [r.neg()] : [];
    },
    explain: (A, B, op) => `Un seul des deux nombres est négatif : les signes sont contraires, donc le ${op === '÷' ? 'quotient' : 'produit'} est négatif.`,
  },
  {
    id: 'product_sign_count', family: 'sign', tag: 'E', skill: 'rel-mul', repair: 'rel-mul',
    name: 'Mal compter les facteurs négatifs',
    example: ['(−2) × 3 × (−1) × (−5) est positif', 'négatif : 3 facteurs négatifs'],
    explain: () => 'Compte les facteurs négatifs : un nombre pair donne un produit positif, un nombre impair un produit négatif.',
  },
  {
    id: 'minus_before_parens', family: 'order', tag: 'P', skill: 'rel-chain', repair: 'rel-chain',
    name: 'Le − devant une parenthèse',
    example: ['10 − (3 + 2) = 10 − 3 + 2', '10 − (3 + 2) = 10 − 3 − 2'],
    explain: () => 'Un signe − devant une parenthèse s\'applique à TOUT ce qu\'elle contient : 10 − (3 + 2) = 10 − 3 − 2. Le plus sûr : calculer d\'abord la parenthèse.',
  },
  {
    id: 'compare_neg_digits', family: 'sign', tag: 'R', skill: 'rel-compare', repair: 'rel-read',
    name: 'Comparer les négatifs sans leur signe',
    example: ['−7 > −3 car 7 > 3', '−7 < −3'],
    explain: () => 'Pour les nombres négatifs, c\'est l\'inverse : plus on est loin sous zéro, plus le nombre est petit. −7 °C, c\'est plus froid que −3 °C.',
  },
  {
    id: 'zero_smallest', family: 'sign', tag: 'R', skill: 'rel-compare', repair: 'rel-read',
    name: 'Zéro est le plus petit nombre',
    example: ['0 < −4', '−4 < 0'],
    explain: () => 'Les nombres négatifs sont sous zéro, donc plus petits que zéro. Sur la droite graduée, ils sont à gauche de 0.',
  },
  {
    id: 'read_neg_as_pos', family: 'meaning', tag: 'E', skill: 'rel-read', repair: 'rel-read',
    name: 'Oublier le signe à gauche de zéro',
    example: ['point 3 graduations à gauche de 0 → 3', '−3'],
    explain: () => 'À gauche de zéro, les nombres sont négatifs : il faut écrire le signe −.',
  },
  {
    id: 'neg_line_direction', family: 'meaning', tag: 'E', skill: 'rel-read', repair: 'rel-read',
    name: 'Compter dans le mauvais sens sous zéro',
    example: ['point à 1/4 après −1 → −7/4', '−5/4'],
    explain: () => 'Sous zéro aussi, on compte à partir de 0 : vers la gauche, les nombres deviennent plus négatifs. Compte les graduations depuis 0, ou depuis l\'entier le plus proche de 0.',
  },
  {
    id: 'opposite_inverse', family: 'meaning', tag: 'E', skill: 'rel-read', repair: 'rel-read',
    name: 'Confondre opposé et inverse',
    example: ['l\'opposé de 5 est 1/5', 'l\'opposé de 5 est −5'],
    explain: () => 'L\'opposé d\'un nombre est à la même distance de zéro, de l\'autre côté : on change seulement le signe. (1/5, c\'est l\'inverse de 5 : autre chose.)',
  },

  // ----- powers -----
  {
    id: 'pow_times_exponent', family: 'symbol', tag: 'R', op: '^', skill: 'pow-def', repair: 'pow-def',
    name: 'Multiplier par l\'exposant',
    example: ['3² = 6', '3² = 9'],
    apply: (A, E) => (A.int && E.int && E.n > 0 ? [new Q(A.n * E.n)] : []),
    explain: (A, E) => (A
      ? `${P(A, E.n)} n'est pas ${V(A)} × ${E.n} : c'est ${E.n} facteurs égaux à ${V(A)}. L'exposant compte les facteurs.`
      : 'L\'exposant compte combien de facteurs égaux on multiplie : 3² = 3 × 3 = 9, pas 3 × 2.'),
  },
  {
    id: 'pow_zero_is_zero', family: 'symbol', tag: 'R', op: '^', skill: 'pow-ten', repair: 'pow-def',
    name: 'Puissance 0 égale 0',
    example: ['5⁰ = 0', '5⁰ = 1'],
    apply: (A, E) => (E.n === 0 && A.n !== 0 ? [new Q(0)] : []),
    explain: () => 'Un nombre (non nul) à la puissance 0 vaut 1. Regarde : 10³ = 1000, 10² = 100, 10¹ = 10. On divise par 10 à chaque fois, donc 10⁰ = 1.',
  },
  {
    id: 'pow_zero_is_base', family: 'symbol', tag: 'E', op: '^', skill: 'pow-ten', repair: 'pow-def',
    name: 'Puissance 0 égale le nombre',
    example: ['5⁰ = 5', '5⁰ = 1'],
    apply: (A, E) => (E.n === 0 && A.n !== 0 ? [qv(A)] : []),
    explain: () => 'Un nombre (non nul) à la puissance 0 vaut 1, pas le nombre lui-même : 5¹ = 5, mais 5⁰ = 5¹ ÷ 5 = 1.',
  },
  {
    id: 'pow_neg_exp_negative', family: 'symbol', tag: 'R', op: '^', skill: 'pow-ten', repair: 'pow-ten',
    name: 'Exposant négatif, nombre négatif',
    example: ['10⁻² = −100', '10⁻² = 1/100 = 0,01'],
    apply: (A, E) => (E.int && E.n < 0 && A.n !== 0 ? [qv(A).pow(-E.n).neg()] : []),
    explain: (A, E) => `Un exposant négatif ne rend pas le nombre négatif : il donne l'inverse. ${A ? `${P(A, E.n)} = 1 / ${P(A, -E.n)} = ${V(qv(A).pow(E.n))}` : '10⁻² = 1 / 10² = 0,01'}.`,
  },
  {
    id: 'pow_neg_exp_forget_power', family: 'symbol', tag: 'E', op: '^', skill: 'pow-frac', repair: 'pow-ten',
    name: 'Inverser sans garder l\'exposant',
    example: ['(2/3)⁻² = 3/2', '(2/3)⁻² = (3/2)² = 9/4'],
    apply: (A, E) => (E.int && E.n < -1 && A.n !== 0 ? [new Q(1).div(qv(A))] : []),
    explain: (A, E) => (A
      ? `Le − de l'exposant donne l'inverse, mais l'exposant ${-E.n} reste : ${P(A, E.n)} = ${P(new Q(1).div(qv(A)), -E.n)} = ${V(qv(A).pow(E.n))}.`
      : 'Le − de l\'exposant donne l\'inverse, mais l\'exposant reste : (2/3)⁻² = (3/2)² = 9/4, pas 3/2.'),
  },
  {
    id: 'pow_neg_base_sign', family: 'sign', tag: 'E', op: '^', skill: 'pow-sign', repair: 'rel-mul',
    name: 'Mauvais signe pour la puissance d\'un négatif',
    example: ['(−2)⁴ = −16', '(−2)⁴ = 16'],
    apply: (A, E) => (neg(A) && E.int && E.n > 1 ? [qv(A).pow(E.n).neg()] : []),
    explain: (A, E) => (A
      ? `${P(A, E.n)}, c'est ${E.n} facteurs négatifs : ${E.n % 2 ? 'un nombre impair, donc le résultat est négatif' : 'un nombre pair, donc le résultat est positif'}.`
      : 'Compte les facteurs négatifs : un nombre pair donne un résultat positif, un nombre impair un résultat négatif.'),
  },
  {
    id: 'pow_fraction_numerator_only', family: 'rule', tag: 'E', op: '^', skill: 'pow-def', repair: 'pow-def',
    name: 'Élever seulement le numérateur',
    example: ['(2/3)² = 4/3', '(2/3)² = 4/9'],
    apply: (A, E) => (!A.int && !A.decimal && E.int && E.n > 1 ? [new Q(A.n ** E.n, A.d)] : []),
    explain: () => 'Toute la fraction est élevée à la puissance, le numérateur ET le dénominateur : (2/3)² = 2/3 × 2/3 = 4/9.',
  },
  {
    id: 'pow_decimal_places', family: 'symbol', tag: 'E', op: '^', skill: 'pow-def', repair: 'pow-def',
    name: 'Oublier des décimales en élevant au carré',
    example: ['0,3² = 0,9', '0,3² = 0,09'],
    apply: (A, E) => {
      if (!A.decimal || !A.s || !E.int || E.n < 2) return [];
      const [i, dec = ''] = A.s.split(',');
      return [new Q(Number(i + dec) ** E.n, 10 ** dec.length)];
    },
    explain: () => '0,3² = 0,3 × 0,3 = 0,09 : des dixièmes fois des dixièmes donnent des centièmes. Compte les chiffres après la virgule dans les deux facteurs.',
  },
  {
    id: 'neg_power_brackets', family: 'symbol', tag: 'P', skill: 'pow-sign', repair: 'pow-sign',
    name: 'Confondre −3² et (−3)²',
    example: ['−3² = 9', '−3² = −9, mais (−3)² = 9'],
    explain: () => 'Sans parenthèses, l\'exposant ne porte que sur le nombre : −3² = −(3 × 3) = −9. Avec des parenthèses, il porte sur −3 : (−3)² = (−3) × (−3) = 9.',
  },
  {
    id: 'pow_distribute_sum', family: 'distribute', tag: 'R', skill: 'pow-priority', repair: 'pow-priority',
    name: 'Distribuer la puissance sur une somme',
    example: ['(1 + 2)² = 1² + 2² = 5', '(1 + 2)² = 3² = 9'],
    explain: () => 'Une puissance ne se distribue pas sur une somme ou une différence. Calcule d\'abord la parenthèse : (1 + 2)² = 3² = 9.',
  },
  {
    id: 'pow_forget_coefficient', family: 'distribute', tag: 'R', skill: 'pow-priority', repair: 'pow-priority',
    name: 'Oublier d\'élever un des facteurs',
    example: ['(2 × 10³)² = 2 × 10⁶', '(2 × 10³)² = 4 × 10⁶'],
    explain: () => 'L\'exposant porte sur toute la parenthèse : chaque facteur du produit est élevé à la puissance. (2 × 5)² = 2² × 5² = 4 × 25 = 100.',
  },
  {
    id: 'pow_before_product', family: 'order', tag: 'E', skill: 'pow-priority', repair: 'pow-priority',
    name: 'Calculer avant la puissance',
    example: ['2 × 3² = 6² = 36', '2 × 3² = 2 × 9 = 18'],
    explain: () => 'Les puissances passent avant × et ÷, et avant + et −. L\'exposant ne porte que sur le nombre juste à côté : 2 × 3² = 2 × 9.',
  },
  {
    id: 'pow_product_multiply_exp', family: 'rule', tag: 'R', skill: 'pow-rules', repair: 'pow-def',
    name: 'Multiplier les exposants d\'un produit',
    example: ['2³ × 2⁴ = 2¹²', '2³ × 2⁴ = 2⁷'],
    explain: () => '2³ × 2⁴ = (2 × 2 × 2) × (2 × 2 × 2 × 2) : 3 + 4 = 7 facteurs. Pour multiplier des puissances du même nombre, on ADDITIONNE les exposants.',
  },
  {
    id: 'pow_product_multiply_bases', family: 'rule', tag: 'E', skill: 'pow-rules', repair: 'pow-def',
    name: 'Multiplier aussi les nombres',
    example: ['2³ × 2⁴ = 4⁷', '2³ × 2⁴ = 2⁷'],
    explain: () => 'Le nombre répété ne change pas : 2³ × 2⁴, ce sont 7 facteurs égaux à 2, donc 2⁷.',
  },
  {
    id: 'pow_power_add_exp', family: 'rule', tag: 'R', skill: 'pow-rules', repair: 'pow-def',
    name: 'Additionner les exposants d\'une puissance de puissance',
    example: ['(2³)² = 2⁵', '(2³)² = 2⁶'],
    explain: () => '(2³)² = 2³ × 2³ : deux fois 3 facteurs, donc 3 × 2 = 6 facteurs. Pour une puissance de puissance, on MULTIPLIE les exposants.',
  },
  {
    id: 'pow_quotient_divide_exp', family: 'rule', tag: 'E', skill: 'pow-rules', repair: 'pow-def',
    name: 'Diviser les exposants d\'un quotient',
    example: ['2⁶ ÷ 2² = 2³', '2⁶ ÷ 2² = 2⁴'],
    explain: () => 'Dans 2⁶ ÷ 2², deux facteurs 2 du bas se simplifient avec deux du haut : il en reste 6 − 2 = 4. On SOUSTRAIT les exposants.',
  },
  {
    id: 'pow_sum_add_exp', family: 'rule', tag: 'E', skill: 'pow-rules', repair: 'pow-def',
    name: 'Règle du produit utilisée pour une somme',
    example: ['2³ + 2³ = 2⁶', '2³ + 2³ = 8 + 8 = 16 = 2⁴'],
    explain: () => 'Les règles des exposants valent pour × et ÷, pas pour + : 2³ + 2³ = 8 + 8 = 16.',
  },
  {
    id: 'pow_ten_count_digits', family: 'symbol', tag: 'E', skill: 'pow-ten', repair: 'pow-ten',
    name: 'Compter les chiffres au lieu des zéros',
    example: ['1 000 = 10⁴', '1 000 = 10³'],
    explain: () => 'L\'exposant de 10 compte les zéros après le 1 : 1 000 = 10³ (trois zéros), pas le nombre de chiffres.',
  },
  {
    id: 'exp_sign_small_number', family: 'symbol', tag: 'E', skill: 'pow-ten', repair: 'pow-ten',
    name: 'Exposant positif pour un nombre plus petit que 1',
    example: ['0,001 = 10³', '0,001 = 10⁻³'],
    explain: () => 'Un nombre entre 0 et 1 s\'écrit avec un exposant NÉGATIF : 0,001 = 1/1000 = 10⁻³. Un exposant positif donne un grand nombre.',
  },
  {
    id: 'sci_count_zeros', family: 'symbol', tag: 'E', skill: 'pow-sci', repair: 'pow-ten',
    name: 'Compter les zéros au lieu des rangs',
    example: ['34 000 = 3,4 × 10³', '34 000 = 3,4 × 10⁴'],
    explain: () => 'L\'exposant dit de combien de rangs la virgule se déplace : de 3,4 à 34 000, elle avance de 4 rangs, même s\'il n\'y a que 3 zéros.',
  },
  {
    id: 'sci_mantissa_range', family: 'symbol', tag: 'P', skill: 'pow-sci', repair: 'pow-sci',
    name: 'Premier nombre hors de 1 à 10',
    example: ['34 000 = 34 × 10³ en notation scientifique', '3,4 × 10⁴'],
    explain: () => 'C\'est égal, mais ce n\'est pas la notation SCIENTIFIQUE : le premier nombre doit avoir un seul chiffre (non nul) avant la virgule, entre 1 et 10.',
  },

  // ----- square roots -----
  {
    id: 'sqrt_half', family: 'symbol', tag: 'R', op: '√', skill: 'root-squares', repair: 'pow-def',
    name: 'Racine carrée égale la moitié',
    example: ['√16 = 8', '√16 = 4'],
    apply: (A) => (A.n > 0 ? [qv(A).div(2)] : []),
    explain: (A) => {
      if (!A) return 'La racine carrée n\'est pas la moitié : √16 est le nombre qui, multiplié par LUI-MÊME, donne 16. 8 × 8 = 64, alors que 4 × 4 = 16.';
      const h = qv(A).div(2);
      return `La racine carrée n'est pas la moitié : √${V(A)} est le nombre positif qui, multiplié par LUI-MÊME, donne ${V(A)}. Or ${V(h)} × ${V(h)} = ${V(h.mul(h))}.`;
    },
  },
  {
    id: 'sqrt_numerator_only', family: 'rule', tag: 'E', op: '√', skill: 'root-frac', repair: 'root-squares',
    name: 'Racine du numérateur seulement',
    example: ['√(9/16) = 3/16', '√(9/16) = 3/4'],
    apply: (A) => {
      const v = qv(A);
      const r = Math.round(Math.sqrt(v.n));
      return v.d > 1 && v.n > 0 && r * r === v.n ? [new Q(r, v.d)] : [];
    },
    explain: () => 'La racine porte sur toute la fraction, le numérateur ET le dénominateur : √(9/16) = √9 / √16 = 3/4.',
  },
  {
    id: 'sqrt_is_square', family: 'symbol', tag: 'E', op: '√', skill: 'root-squares', repair: 'pow-def',
    name: 'Élever au carré au lieu de prendre la racine',
    example: ['√9 = 81', '√9 = 3'],
    apply: (A) => (A.n > 0 && !qv(A).eq(1) ? [qv(A).pow(2)] : []),
    explain: () => 'La racine carrée fait le chemin inverse du carré : 3² = 9, donc √9 = 3.',
  },
  {
    id: 'sqrt_distribute_sum', family: 'distribute', tag: 'R', skill: 'root-calc', repair: 'root-calc',
    name: 'Distribuer la racine sur une somme',
    example: ['√(9 + 16) = 3 + 4 = 7', '√(9 + 16) = √25 = 5'],
    explain: () => 'La racine ne se distribue pas sur une somme ou une différence. Calcule d\'abord sous la racine : √(9 + 16) = √25 = 5.',
  },
  {
    id: 'sqrt_combine_sum', family: 'distribute', tag: 'R', skill: 'root-calc', repair: 'root-calc',
    name: 'Regrouper une somme sous une seule racine',
    example: ['√9 + √16 = √25 = 5', '√9 + √16 = 3 + 4 = 7'],
    explain: () => 'On ne peut pas regrouper une somme de racines sous une seule racine. Calcule chaque racine : √9 + √16 = 3 + 4 = 7.',
  },
  {
    id: 'sqrt_plus_minus', family: 'symbol', tag: 'R', skill: 'root-squares', repair: 'root-squares',
    name: 'La racine carrée vaut aussi le négatif',
    example: ['√25 = −5 et 5', '√25 = 5'],
    explain: () => '(−5)² = 25 aussi, mais le symbole √ désigne seulement le nombre POSITIF : √25 = 5.',
  },
  {
    id: 'sqrt_negative_radicand', family: 'symbol', tag: 'R', skill: 'root-calc', repair: 'root-squares',
    name: 'Racine d\'un nombre négatif',
    example: ['√(−9) = −3', '√(−9) n\'existe pas'],
    explain: () => 'Un carré n\'est jamais négatif : 3² = 9 et (−3)² = 9. Aucun nombre au carré ne donne −9, donc √(−9) n\'existe pas. Par contre, −√9 = −3.',
  },
  {
    id: 'sqrt_of_square_sign', family: 'symbol', tag: 'E', skill: 'root-calc', repair: 'root-squares',
    name: 'Garder le signe sous la racine d\'un carré',
    example: ['√((−5)²) = −5', '√((−5)²) = √25 = 5'],
    explain: () => 'Calcule d\'abord sous la racine : (−5)² = 25, et √25 = 5. Une racine carrée n\'est jamais négative.',
  },
  {
    id: 'sqrt_squared_squares', family: 'symbol', tag: 'E', skill: 'root-calc', repair: 'root-squares',
    name: 'Élever au carré le nombre sous la racine',
    example: ['(√7)² = 49', '(√7)² = 7'],
    explain: () => '√7 est le nombre qui, au carré, donne 7. Donc (√7)² = 7 : le carré défait la racine.',
  },
  {
    id: 'sqrt_product_add', family: 'rule', tag: 'E', skill: 'root-rules', repair: 'root-calc',
    name: 'Additionner sous la racine en multipliant',
    example: ['√2 × √8 = √10', '√2 × √8 = √16 = 4'],
    explain: () => 'Le produit de deux racines est la racine du PRODUIT : √2 × √8 = √(2 × 8) = √16 = 4.',
  },
  {
    id: 'sqrt_forget_root', family: 'rule', tag: 'E', skill: 'root-rules', repair: 'root-calc',
    name: 'Oublier la racine à la fin',
    example: ['√2 × √8 = 16', '√2 × √8 = √16 = 4'],
    explain: () => 'Après avoir regroupé sous une seule racine, il reste à prendre la racine : √16 = 4.',
  },
  {
    id: 'square_eq_one_solution', family: 'symbol', tag: 'E', skill: 'root-eq', repair: 'pow-sign',
    name: 'Oublier la solution négative',
    example: ['x² = 25 donne seulement x = 5', 'x = 5 ou x = −5'],
    explain: () => '(−5)² = 25 aussi ! L\'équation x² = 25 a deux solutions : 5 et −5.',
  },
  {
    id: 'square_negative_solutions', family: 'symbol', tag: 'E', skill: 'root-eq', repair: 'pow-sign',
    name: 'Des solutions à x² = un nombre négatif',
    example: ['x² = −9 donne x = −3', 'pas de solution'],
    explain: () => 'Un carré n\'est jamais négatif : 3² = 9 et (−3)² = 9. L\'équation x² = −9 n\'a pas de solution.',
  },
  // ---------- mental arithmetic and times tables ----------
  // Answer rules only (no `op`): they are matched on the final answer of a
  // fact item, never replayed inside other expressions.
  {
    id: 'fact_neighbor', family: 'facts', tag: 'R', skill: 'tab-678', repair: 'tab-349',
    name: 'Résultat d\'un fait voisin',
    example: ['7 × 8 = 54', '7 × 8 = 56'],
    explain: () => 'C\'est le résultat d\'un fait voisin (une fois de plus ou de moins). Retrouve-le depuis un fait sûr : 7 × 8 = 7 × 4 × 2 = 28 × 2 = 56.',
  },
  {
    id: 'fact_add_for_mul', family: 'rule', tag: 'R', skill: 'tab-2510', repair: 'tab-2510',
    name: 'Additionner au lieu de multiplier',
    example: ['3 × 4 = 7', '3 × 4 = 12'],
    explain: () => '× n\'est pas + : 3 × 4, c\'est 4 + 4 + 4 = 12, pas 3 + 4.',
  },
  {
    id: 'fact_mul_for_add', family: 'rule', tag: 'E', skill: 'cm-add20', repair: 'cm-add20',
    name: 'Multiplier au lieu d\'additionner',
    example: ['3 + 4 = 12', '3 + 4 = 7'],
    explain: () => 'Relis le signe : 3 + 4, c\'est 7. Le résultat 12 serait celui de 3 × 4.',
  },
  {
    id: 'fact_add_for_sub', family: 'rule', tag: 'E', skill: 'cm-sub20', repair: 'cm-add20',
    name: 'Additionner au lieu de soustraire',
    example: ['13 − 8 = 21', '13 − 8 = 5'],
    explain: () => 'Relis le signe : 13 − 8, c’est l’écart entre 8 et 13. Pense « 8 + combien = 13 ? » : 5.',
  },
  {
    id: 'count_off_by_one', family: 'facts', tag: 'E', skill: 'cm-add20', repair: 'cm-add20',
    name: 'Compter une fois de trop ou de moins',
    example: ['8 + 3 = 12', '8 + 3 = 11'],
    explain: () => 'En comptant, on compte les sauts, pas le point de départ : 8 + 3 → 9, 10, 11. Mieux encore : fais 10 (8 + 2), puis ajoute le reste (+ 1).',
  },
  {
    id: 'forget_carry', family: 'place', tag: 'E', skill: 'cm-add2', repair: 'cm-add1',
    name: 'Oublier la retenue',
    example: ['47 + 8 = 45', '47 + 8 = 55'],
    explain: () => '7 + 8 = 15 : ça fait 5 unités et <b>une dizaine de plus</b>, donc 47 + 8 = 55. Pour une soustraction, c\'est une dizaine de moins.',
  },
  {
    id: 'sub_smaller_from_larger', family: 'place', tag: 'R', skill: 'cm-add2', repair: 'cm-add1',
    name: 'Ôter le petit chiffre du grand',
    example: ['52 − 7 = 55', '52 − 7 = 45'],
    explain: () => 'On ne peut pas faire « 7 − 2 » aux unités à la place de 2 − 7. On passe par la dizaine : 52 − 2 = 50, puis 50 − 5 = 45.',
  },
  {
    id: 'compensation_wrong_way', family: 'place', tag: 'E', skill: 'cm-add2', repair: 'cm-add1',
    name: 'Corriger dans le mauvais sens',
    example: ['47 + 38 = 47 + 40 + 2 = 89', '47 + 40 − 2 = 85'],
    explain: () => 'Si on ajoute 40 au lieu de 38, on a ajouté 2 de trop : il faut les <b>retirer</b>. 47 + 38 = 47 + 40 − 2 = 85. (Et pour une soustraction, on a retiré trop : on rajoute.)',
  },
  {
    id: 'square_digits', family: 'facts', tag: 'E', skill: 'sq-25', repair: 'sq-13',
    name: 'Le carré de chaque chiffre',
    example: ['23² = 49', '23² = 529'],
    explain: () => 'Un carré ne se fait pas chiffre par chiffre : 23² = 23 × 23 = 400 + 120 + 9 = 529.',
  },
  {
    id: 'missing_factor_subtract', family: 'rule', tag: 'E', skill: 'tab-div', repair: 'tab-678',
    name: 'Soustraire au lieu de diviser',
    example: ['7 × … = 56 → 49', '7 × 8 = 56'],
    explain: () => '7 × … = 56 demande combien de fois 7 dans 56 : c\'est une division, 56 : 7 = 8. Pas une soustraction.',
  },
  {
    id: 'round_truncate', family: 'place', tag: 'E', skill: 'cm-round', repair: 'cm-round',
    name: 'Couper au lieu d\'arrondir',
    example: ['3,47 → 3,4', '3,47 → 3,5'],
    explain: () => 'Arrondir, ce n\'est pas couper : on regarde le chiffre suivant. Dans 3,47 au dixième, le 7 fait monter le 4 : 3,5.',
  },
  // ---------- arithmetic and writings of a number (answer rules) ----------
  {
    id: 'div_last_digit', family: 'place', tag: 'E', skill: 'ar-div', repair: 'ar-div',
    name: 'Regarder seulement le dernier chiffre',
    example: ['73 est divisible par 3 (il finit par 3)', '7 + 3 = 10 : non'],
    explain: () => 'Le dernier chiffre suffit pour 2, 5 et 10 seulement. Pour 3 et 9, on additionne tous les chiffres ; pour 4, on regarde les deux derniers.',
  },
  {
    id: 'divisors_forget_ends', family: 'meaning', tag: 'E', skill: 'ar-divisors', repair: 'ar-divisors',
    name: 'Oublier 1 et le nombre lui-même',
    example: ['12 a 4 diviseurs', '12 a 6 diviseurs : 1, 2, 3, 4, 6, 12'],
    explain: () => '1 et le nombre lui-même sont toujours des diviseurs : 12 = 1 × 12. Ils comptent.',
  },
  {
    id: 'one_is_prime', family: 'meaning', tag: 'E', skill: 'ar-prime', repair: 'ar-divisors',
    name: '1 est premier',
    example: ['1 est premier', '1 n\'est pas premier'],
    explain: () => 'Un nombre premier a exactement <b>deux</b> diviseurs : 1 et lui-même. 1 n\'en a qu\'un seul, donc il n\'est pas premier.',
  },
  {
    id: 'odd_is_prime', family: 'meaning', tag: 'E', skill: 'ar-prime', repair: 'ar-divisors',
    name: 'Impair, donc premier',
    example: ['51 est premier', '51 = 3 × 17'],
    explain: () => 'Impair ne veut pas dire premier : 51 = 3 × 17, 91 = 7 × 13. Essaie de diviser par 3, 7, 11, 13…',
  },
  {
    id: 'gcd_lcm_swap', family: 'rule', tag: 'E', skill: 'ar-gcd', repair: 'ar-factor',
    name: 'Confondre PGDC et PPMC',
    example: ['PGDC(12 ; 18) = 36', 'PGDC(12 ; 18) = 6'],
    explain: () => 'Le PGDC est le plus grand <b>diviseur</b> commun : il est plus petit que les deux nombres. Le PPMC est le plus petit <b>multiple</b> commun : il est plus grand qu\'eux.',
  },
  {
    id: 'lcm_product', family: 'rule', tag: 'E', skill: 'ar-gcd', repair: 'ar-factor',
    name: 'Le PPMC, c\'est le produit',
    example: ['PPMC(12 ; 18) = 216', 'PPMC(12 ; 18) = 36'],
    explain: () => 'Le produit est un multiple commun, mais pas toujours le plus petit : 12 et 18 ont déjà 36 en commun. Prends chaque facteur premier avec son plus grand exposant.',
  },
  {
    id: 'surd_forget_root', family: 'symbol', tag: 'E', skill: 'ar-surd', repair: 'root-squares',
    name: 'Sortir le carré sans prendre sa racine',
    example: ['√72 = 36√2', '√72 = 6√2'],
    explain: () => '√72 = √(36 × 2) = √36 × √2 = 6√2. C\'est la <b>racine</b> de 36 qui sort, pas 36.',
  },
  {
    id: 'frac_decimal_digits', family: 'whole', tag: 'E', skill: 'nb-convert', repair: 'frac-decimal',
    name: 'Recopier les chiffres de la fraction',
    example: ['1/4 = 0,4', '1/4 = 0,25'],
    explain: () => 'La barre de fraction veut dire « divisé par » : 1/4 = 1 ÷ 4 = 0,25. Et 0,4 = 4 dixièmes = 2/5.',
  },
  {
    id: 'percent_shift', family: 'place', tag: 'E', skill: 'nb-convert', repair: 'frac-decimal',
    name: 'Pourcentage décalé d\'un rang',
    example: ['35 % = 3,5', '35 % = 0,35'],
    explain: () => 'Pour cent veut dire « sur 100 » : 35 % = 35 / 100 = 0,35. On divise par 100, pas par 10.',
  },
  {
    id: 'repeating_as_finite', family: 'meaning', tag: 'E', skill: 'nb-convert', repair: 'frac-decimal',
    name: 'Arrêter une écriture qui ne s\'arrête pas',
    example: ['0,333… = 3/10', '0,333… = 1/3'],
    explain: () => '0,333… continue sans fin : c\'est 1 ÷ 3 = 1/3. 3/10 = 0,3 tout court, un peu moins.',
  },
  {
    id: 'set_by_writing', family: 'meaning', tag: 'E', skill: 'nb-sets', repair: 'nb-sets',
    name: 'Juger l\'ensemble à l\'écriture',
    example: ['−12/4 est dans ℚ seulement', '−12/4 = −3, dans ℤ'],
    explain: () => 'On regarde la valeur, pas l\'écriture : −12/4 = −3 est un entier, donc dans ℤ.',
  },
  {
    id: 'root_always_irrational', family: 'meaning', tag: 'E', skill: 'nb-irrational', repair: 'root-squares',
    name: 'Une racine est toujours irrationnelle',
    example: ['√16 est irrationnel', '√16 = 4'],
    explain: () => 'La racine d\'un carré parfait tombe juste : √16 = 4, √(9/16) = 3/4. Seules les racines qui ne tombent pas juste (√2, √50) sont irrationnelles.',
  },
  {
    id: 'cube_root_third', family: 'symbol', tag: 'E', skill: 'nb-cube', repair: 'pow-def',
    name: 'Racine cubique égale le tiers',
    example: ['∛27 = 9', '∛27 = 3'],
    explain: () => '∛27 est le nombre qui, multiplié 3 fois par lui-même, donne 27 : 3 × 3 × 3 = 27. Ce n\'est pas 27 ÷ 3.',
  },
  {
    id: 'cube_root_negative', family: 'sign', tag: 'E', skill: 'nb-cube', repair: 'pow-sign',
    name: 'Oublier le signe de la racine cubique',
    example: ['∛(−8) = 2', '∛(−8) = −2'],
    explain: () => 'Un cube garde le signe : (−2)³ = −8. Donc ∛(−8) = −2. Contrairement à la racine carrée, la racine cubique d\'un négatif existe.',
  },
  // ---------- proportionality, percentages, units (answer rules) ----------
  {
    id: 'additive_reasoning', family: 'meaning', tag: 'R', skill: 'prop-rule3', repair: 'prop-detect',
    name: 'Ajouter au lieu de multiplier',
    example: ['3 → 5, donc 6 → 8', '3 → 5, donc 6 → 10'],
    explain: () => 'Dans une situation proportionnelle, on <b>multiplie</b> par le même nombre : si la quantité double, le prix double. Ajouter la même différence ne marche pas.',
  },
  {
    id: 'linearity_illusion', family: 'meaning', tag: 'R', skill: 'prop-detect', repair: 'prop-detect',
    name: 'Tout croire proportionnel',
    example: ['côté × 2, donc aire × 2', 'côté × 2, donc aire × 4'],
    explain: () => 'Toutes les situations ne sont pas proportionnelles. Une aire varie comme le carré des longueurs (× 4 quand on double), un volume comme le cube (× 8).',
  },
  {
    id: 'rule3_inverted', family: 'rule', tag: 'E', skill: 'prop-rule3', repair: 'prop-rule3',
    name: 'Règle de trois à l\'envers',
    example: ['3 kg = 6 CHF, donc 5 kg = 3,60 CHF', '5 kg = 10 CHF'],
    explain: () => 'Passe par l\'unité : prix pour 1, puis multiplie. Et vérifie le sens : plus de kilos coûtent plus cher. (Sauf si c\'est inversement proportionnel, comme des ouvriers et des jours.)',
  },
  {
    id: 'scale_forget_convert', family: 'place', tag: 'E', skill: 'prop-scale', repair: 'u-length',
    name: 'Oublier de convertir avec l\'échelle',
    example: ['1 : 25 000, 4 cm → 100 000 km', '4 cm → 100 000 cm = 1 km'],
    explain: () => 'Avec l\'échelle, le résultat est dans la <b>même unité</b> que la mesure sur la carte (des cm). Convertis ensuite : 100 000 cm = 1 km.',
  },
  {
    id: 'convert_wrong_direction', family: 'place', tag: 'E', skill: 'u-length', repair: 'u-length',
    name: 'Convertir dans le mauvais sens',
    example: ['3 km = 0,003 m', '3 km = 3 000 m'],
    explain: () => 'Vers une unité plus petite, il en faut <b>plus</b> : le nombre grandit. 1 km = 1 000 m, donc 3 km = 3 000 m.',
  },
  {
    id: 'percent_as_amount', family: 'meaning', tag: 'E', skill: 'pct-change', repair: 'pct-of',
    name: 'Prendre le pourcentage pour un montant',
    example: ['80 CHF − 15 % = 65 CHF', '80 × 0,85 = 68 CHF'],
    explain: () => '15 % n\'est pas 15 CHF : c\'est 15 centièmes du prix. 15 % de 80 = 12, donc 80 − 12 = 68 CHF.',
  },
  {
    id: 'percent_inverted', family: 'rule', tag: 'E', skill: 'pct-which', repair: 'pct-of',
    name: 'Diviser à l\'envers',
    example: ['12 sur 48 = 400 %', '12 sur 48 = 25 %'],
    explain: () => 'La part se divise par le total : 12 ÷ 48 = 0,25 = 25 %. Une part ne peut pas dépasser 100 % du total.',
  },
  {
    id: 'percent_reverse_subtract', family: 'meaning', tag: 'E', skill: 'pct-reverse', repair: 'pct-change',
    name: 'Retirer le pourcentage pour revenir en arrière',
    example: ['après +20 %, 96 → 96 − 20 % = 76,80', '96 ÷ 1,2 = 80'],
    explain: () => 'Les 20 % portaient sur l\'ancien prix, pas sur le nouveau. On défait la multiplication : nouveau ÷ 1,2.',
  },
  {
    id: 'percent_add_successive', family: 'meaning', tag: 'E', skill: 'pct-successive', repair: 'pct-change',
    name: 'Additionner des pourcentages successifs',
    example: ['+10 % puis −10 % = 0 %', '× 1,1 × 0,9 = × 0,99 : −1 %'],
    explain: () => 'La deuxième variation porte sur un prix qui a déjà changé. On multiplie les coefficients : × 1,1 puis × 0,9 = × 0,99.',
  },
  {
    id: 'time_decimal_minutes', family: 'place', tag: 'E', skill: 'u-time', repair: 'u-time',
    name: 'Heures décimales lues comme des minutes',
    example: ['1,5 h = 1 h 50 min', '1,5 h = 1 h 30 min'],
    explain: () => 'Une heure a 60 minutes, pas 100. 0,5 h = la moitié de 60 min = 30 min ; 1 h 30 = 1,5 h.',
  },
  {
    id: 'slope_inverted', family: 'rule', tag: 'E', skill: 'slope', repair: 'pct-which',
    name: 'Pente calculée à l\'envers',
    example: ['12 m sur 200 m : 200 ÷ 12', '12 ÷ 200 = 6 %'],
    explain: () => 'Pente = dénivelé ÷ distance horizontale. Une route de 6 % monte de 6 m pour 100 m.',
  },
  {
    id: 'area_factor_10', family: 'place', tag: 'E', skill: 'u-area', repair: 'u-length',
    name: 'Facteur 10 pour les aires',
    example: ['1 m² = 100 cm²', '1 m² = 10 000 cm²'],
    explain: () => 'Un carré de 1 m de côté mesure 100 cm × 100 cm = 10 000 cm². Entre deux unités d\'aire voisines, le facteur est 100, pas 10.',
  },
  {
    id: 'volume_factor_10', family: 'place', tag: 'E', skill: 'u-volume', repair: 'u-area',
    name: 'Facteur 10 pour les volumes',
    example: ['1 m³ = 10 dm³', '1 m³ = 1 000 dm³ = 1 000 L'],
    explain: () => 'Un cube de 1 m d\'arête mesure 10 dm × 10 dm × 10 dm = 1 000 dm³. Entre deux unités de volume voisines, le facteur est 1 000.',
  },
  {
    id: 'speed_factor_wrong_way', family: 'place', tag: 'E', skill: 'u-speed', repair: 'u-time',
    name: '× 3,6 au lieu de ÷ 3,6',
    example: ['90 km/h = 324 m/s', '90 km/h = 25 m/s'],
    explain: () => 'De km/h vers m/s, on divise par 3,6 : 90 km en une heure, c\'est 90 000 m en 3 600 s, donc 25 m/s. Une voiture ne va pas à 324 m/s !',
  },
  {
    id: 'imperial_linear_factor', family: 'place', tag: 'E', skill: 'u-imperial', repair: 'u-area',
    name: 'Facteur de longueur pour une aire ou un volume',
    example: ['1 pied² = 30,48 cm²', '1 pied² = 30,48² cm² ≈ 929 cm²'],
    explain: () => 'Pour une aire, le facteur de longueur se met au <b>carré</b> ; pour un volume, au <b>cube</b>. 1 pied = 30,48 cm, donc 1 pied² = 30,48 × 30,48 cm².',
  },
  // ---------- algebra with letters (answer rules) ----------
  {
    id: 'subst_juxtapose', family: 'symbol', tag: 'R', skill: 'lit-value', repair: 'lit-value',
    name: 'Coller le nombre à côté du coefficient',
    example: ['3x pour x = 4 → 34', '3 × 4 = 12'],
    explain: () => '3x veut dire 3 × x. Pour x = 4, 3x = 3 × 4 = 12, pas « 34 ».',
  },
  {
    id: 'translate_order', family: 'order', tag: 'E', skill: 'lit-write', repair: 'lit-write',
    name: 'Parenthèses mal placées en traduisant',
    example: ['le double de (x + 3) → 2x + 3', '2(x + 3)'],
    explain: () => 'Traduis dans l\'ordre des mots : « le double de la somme » demande d\'abord la somme, entre parenthèses, puis le double.',
  },
  {
    id: 'conjoin_terms', family: 'rule', tag: 'R', skill: 'lit-reduce', repair: 'lit-equal',
    name: 'Coller des termes différents',
    example: ['2x + 3 = 5x', '2x + 3 ne se réduit pas'],
    explain: () => 'On n\'additionne que des termes de même sorte : 2x + 3x = 5x, mais 2x + 3 reste 2x + 3. Essaie x = 1 : 2 + 3 = 5, alors que 5x = 5… et x = 2 : 7 ≠ 10.',
  },
  {
    id: 'alg_x_plus_x', family: 'rule', tag: 'E', skill: 'lit-equal', repair: 'lit-reduce',
    name: 'x + x = x²',
    example: ['x + x = x²', 'x + x = 2x'],
    explain: () => 'x + x, c\'est deux fois x : 2x. Le carré, x², c\'est x × x.',
  },
  {
    id: 'alg_x_times_x', family: 'rule', tag: 'E', skill: 'lit-monomial', repair: 'lit-equal',
    name: 'x × x = 2x',
    example: ['x × x = 2x', 'x × x = x²'],
    explain: () => 'x × x, c\'est x au carré : x². 2x, c\'est x + x.',
  },
  {
    id: 'alg_coeff_power', family: 'symbol', tag: 'E', skill: 'lit-monomial', repair: 'pow-def',
    name: 'Oublier d\'élever le coefficient',
    example: ['(2x)² = 2x²', '(2x)² = 4x²'],
    explain: () => 'L\'exposant porte sur toute la parenthèse : (2x)² = 2x × 2x = 4x².',
  },
  {
    id: 'alg_coeff_add', family: 'rule', tag: 'E', skill: 'lit-monomial', repair: 'lit-reduce',
    name: 'Additionner les coefficients d\'un produit',
    example: ['3x × 4x = 7x²', '3x × 4x = 12x²'],
    explain: () => 'Dans un produit, on multiplie les nombres : 3 × 4 = 12. On ne les additionne que pour réduire une somme.',
  },
  {
    id: 'distribute_partial', family: 'distribute', tag: 'R', skill: 'lit-expand1', repair: 'lit-expand1',
    name: 'Distribuer sur un seul terme',
    example: ['3(x + 2) = 3x + 2', '3(x + 2) = 3x + 6'],
    explain: () => 'Le facteur multiplie <b>chaque</b> terme de la parenthèse : 3(x + 2) = 3 × x + 3 × 2 = 3x + 6.',
  },
  {
    id: 'double_distribution_partial', family: 'distribute', tag: 'R', skill: 'lit-expand2', repair: 'lit-expand1',
    name: 'Double distributivité incomplète',
    example: ['(x + 2)(x + 3) = x² + 6', 'x² + 3x + 2x + 6'],
    explain: () => 'Il y a <b>quatre</b> produits : chaque terme de la première parenthèse avec chaque terme de la deuxième. (x + 2)(x + 3) = x² + 3x + 2x + 6.',
  },
  {
    id: 'identity_middle_term', family: 'distribute', tag: 'E', skill: 'lit-identities', repair: 'lit-expand2',
    name: 'Oublier le 2 du double produit',
    example: ['(x + 3)² = x² + 3x + 9', '(x + 3)² = x² + 6x + 9'],
    explain: () => '(a + b)² = a² + 2ab + b² : le terme du milieu est le <b>double</b> produit, 2 × x × 3 = 6x.',
  },
  {
    id: 'identity_sign_square', family: 'sign', tag: 'E', skill: 'lit-identities', repair: 'lit-expand2',
    name: 'Mauvais signe dans une identité',
    example: ['(x − 3)² = x² − 6x − 9', '(x − 3)² = x² − 6x + 9'],
    explain: () => 'Un carré est toujours positif : (−3)² = +9. Et (a + b)(a − b) = a² − b², avec un moins.',
  },
  {
    id: 'fac_forget_one', family: 'rule', tag: 'E', skill: 'fac-common', repair: 'lit-expand1',
    name: 'Oublier le 1 en factorisant',
    example: ['x² + x = x(x)', 'x² + x = x(x + 1)'],
    explain: () => 'Quand on sort x de x, il reste 1 : x = x × 1. Donc x² + x = x(x + 1). Vérifie en redéveloppant.',
  },
  {
    id: 'fac_forget_divide', family: 'rule', tag: 'E', skill: 'fac-common', repair: 'lit-expand1',
    name: 'Ne pas diviser tous les termes',
    example: ['6x + 9 = 3(2x + 9)', '6x + 9 = 3(2x + 3)'],
    explain: () => 'Dans la parenthèse, <b>chaque</b> terme est divisé par le facteur sorti. Redéveloppe pour vérifier : 3(2x + 9) = 6x + 27, pas 6x + 9.',
  },
  {
    id: 'fac_diff_squares_as_square', family: 'symbol', tag: 'E', skill: 'fac-identities', repair: 'lit-identities',
    name: 'a² − b² = (a − b)²',
    example: ['x² − 9 = (x − 3)²', 'x² − 9 = (x − 3)(x + 3)'],
    explain: () => '(x − 3)² = x² − 6x + 9, pas x² − 9. Une différence de deux carrés donne (a − b)(a + b).',
  },
  {
    id: 'fac_trinomial_signs', family: 'sign', tag: 'E', skill: 'fac-trinomial', repair: 'lit-expand2',
    name: 'Signes inversés dans un trinôme',
    example: ['x² − x − 6 = (x + 3)(x − 2)', 'x² − x − 6 = (x − 3)(x + 2)'],
    explain: () => 'Redéveloppe pour vérifier : (x + 3)(x − 2) = x² + x − 6. Le terme du milieu doit avoir le bon signe : les deux nombres ont une somme égale à b.',
  },
  // ---------- equations, formulas, geometry (answer rules) ----------
  {
    id: 'equals_as_result', family: 'meaning', tag: 'R', skill: 'eq-meaning', repair: 'eq-meaning',
    name: '« = » lu comme « voici le résultat »',
    example: ['8 + 4 = … + 5 → 12', '8 + 4 = 7 + 5'],
    explain: () => 'Le signe = dit que les deux côtés ont la même valeur. 8 + 4 vaut 12, donc il faut … + 5 = 12 : c\'est 7.',
  },
  {
    id: 'eq_move_no_sign', family: 'sign', tag: 'E', skill: 'eq-two-step', repair: 'eq-one-step',
    name: 'Passer de l\'autre côté sans changer l\'opération',
    example: ['3x + 5 = 20 → 3x = 25', '3x = 20 − 5 = 15'],
    explain: () => 'On ne « déplace » pas un terme : on fait <b>la même opération des deux côtés</b>. Pour enlever + 5, on retire 5 des deux côtés : 3x + 5 − 5 = 20 − 5.',
  },
  {
    id: 'eq_inverse_op', family: 'rule', tag: 'R', skill: 'eq-one-step', repair: 'eq-meaning',
    name: 'Mauvaise opération inverse',
    example: ['3x = 15 → x = 15 − 3', '3x = 15 → x = 15 ÷ 3 = 5'],
    explain: () => '3x veut dire 3 × x. Pour défaire une multiplication, on <b>divise</b> les deux côtés par 3 : x = 15 ÷ 3. Vérifie : 3 × 5 = 15.',
  },
  {
    id: 'eq_change_side_sign_mult', family: 'sign', tag: 'E', skill: 'eq-two-step', repair: 'eq-one-step',
    name: '« Changer de côté, changer de signe » pour un ×',
    example: ['3x = 15 → x = −15/3', '3x = 15 → x = 5'],
    explain: () => 'On divise les deux côtés par 3, sans changer de signe : x = 15 ÷ 3 = 5. Le raccourci « on change de signe » ne vaut que pour + et −, et il vaut mieux penser « même opération des deux côtés ».',
  },
  {
    id: 'eq_divide_one_term', family: 'distribute', tag: 'R', skill: 'eq-two-step', repair: 'lit-expand1',
    name: 'Diviser un seul terme',
    example: ['2x + 6 = 10 → x + 6 = 5', '2x + 6 = 10 → x + 3 = 5'],
    explain: () => 'Diviser un côté par 2, c\'est diviser <b>tous</b> ses termes : (2x + 6) ÷ 2 = x + 3. Plus simple : retire d\'abord 6 des deux côtés.',
  },
  {
    id: 'eq_one_side_only', family: 'rule', tag: 'R', skill: 'eq-two-step', repair: 'eq-meaning',
    name: 'Opérer d\'un seul côté',
    example: ['x + 5 = 12 → x = 12 + 5', 'x + 5 − 5 = 12 − 5'],
    explain: () => 'Une équation est une balance : ce qu\'on fait à gauche, on le fait aussi à droite, sinon l\'égalité n\'est plus vraie.',
  },
  {
    id: 'zero_product_misuse', family: 'rule', tag: 'R', skill: 'eq-product', repair: 'eq-product',
    name: 'Produit nul utilisé quand le produit n\'est pas nul',
    example: ['(x − 2)(x + 3) = 6 → x = 8 ou x = 3', 'on développe d\'abord'],
    explain: () => 'La règle « un des facteurs est nul » ne marche que si le produit vaut <b>0</b>. Sinon, on développe, on ramène tout d\'un côté, et on factorise à nouveau.',
  },
  {
    id: 'zero_product_sign', family: 'sign', tag: 'E', skill: 'eq-product', repair: 'eq-one-step',
    name: 'Solutions avec le mauvais signe',
    example: ['(x − 2)(x + 3) = 0 → x = −2 ou x = 3', 'x = 2 ou x = −3'],
    explain: () => 'x − 2 = 0 donne x = 2 (on ajoute 2), et x + 3 = 0 donne x = −3. Vérifie : (2 − 2) × … = 0.',
  },
  {
    id: 'zero_product_forget_zero', family: 'rule', tag: 'E', skill: 'eq-product', repair: 'fac-common',
    name: 'Oublier la solution x = 0',
    example: ['x(2x − 6) = 0 → x = 3', 'x = 0 ou x = 3'],
    explain: () => 'Le facteur x est un facteur comme les autres : x = 0 rend le produit nul. Ne divise pas par x, tu perdrais cette solution.',
  },
  {
    id: 'system_one_equation', family: 'rule', tag: 'E', skill: 'eq-systems', repair: 'eq-two-step',
    name: 'Vérifier une seule équation',
    example: ['x + y = 7, x − y = 1 → (5 ; 2)', '(4 ; 3) vérifie les deux'],
    explain: () => 'La solution d\'un système doit vérifier <b>les deux</b> équations en même temps. Remplace x et y dans chacune.',
  },
  {
    id: 'iso_wrong_inverse', family: 'rule', tag: 'E', skill: 'iso-formula', repair: 'eq-one-step',
    name: 'Mauvaise opération pour isoler',
    example: ['d = vt → t = dv', 'd = vt → t = d/v'],
    explain: () => 'Dans d = vt, t est multiplié par v. On défait la multiplication en <b>divisant</b> les deux côtés par v : t = d/v. Vérifie avec des nombres : 100 = 50 × 2.',
  },
  {
    id: 'iso_sum_invert', family: 'distribute', tag: 'R', skill: 'iso-formula', repair: 'frac-add-any',
    name: 'Inverser une somme terme à terme',
    example: ['1/f = 1/a + 1/b → f = a + b', 'f = ab/(a + b)'],
    explain: () => 'L\'inverse d\'une somme n\'est pas la somme des inverses : 1/2 + 1/2 = 1, mais 2 + 2 ≠ 1. On réduit d\'abord au même dénominateur.',
  },
  {
    id: 'iso_forget_root', family: 'symbol', tag: 'E', skill: 'iso-formula', repair: 'root-squares',
    name: 'Oublier la racine',
    example: ['A = πr² → r = A/π', 'r = √(A/π)'],
    explain: () => 'A/π donne r², pas r. Pour défaire le carré, on prend la racine carrée : r = √(A/π).',
  },
  {
    id: 'iso_var_both_sides', family: 'rule', tag: 'E', skill: 'iso-formula', repair: 'fac-common',
    name: 'La lettre reste des deux côtés',
    example: ['ax + b = cx → x = (cx − b)/a', 'x = b/(c − a)'],
    explain: () => 'Si la lettre est encore à droite, elle n\'est pas isolée. Rassemble les termes en x d\'un côté, puis mets x en évidence : (c − a)x = b.',
  },
  {
    id: 'triangle_forget_half', family: 'rule', tag: 'E', skill: 'geo-area', repair: 'geo-area',
    name: 'Oublier le ÷ 2 du triangle',
    example: ['triangle 6 × 4 → 24', '6 × 4 ÷ 2 = 12'],
    explain: () => 'Un triangle est la moitié d\'un rectangle de même base et même hauteur : A = b × h ÷ 2.',
  },
  {
    id: 'circle_formula_swap', family: 'rule', tag: 'E', skill: 'geo-area', repair: 'geo-area',
    name: 'Confondre 2πr et πr²',
    example: ['aire d\'un disque = 2πr', 'aire = πr², périmètre = 2πr'],
    explain: () => 'L\'aire se mesure en cm² : elle contient un <b>carré</b>, πr². Le périmètre est une longueur : 2πr.',
  },
  {
    id: 'radius_diameter', family: 'meaning', tag: 'E', skill: 'geo-area', repair: 'geo-area',
    name: 'Confondre rayon et diamètre',
    example: ['diamètre 10 → A = π × 10²', 'rayon 5 → A = π × 5²'],
    explain: () => 'Le rayon est la moitié du diamètre. Les formules utilisent le rayon r.',
  },
  {
    id: 'pyramid_forget_third', family: 'rule', tag: 'E', skill: 'geo-volume', repair: 'geo-volume',
    name: 'Oublier le ÷ 3 de la pyramide',
    example: ['pyramide : base × h', 'base × h ÷ 3'],
    explain: () => 'Une pyramide (ou un cône) remplit le tiers du prisme (ou du cylindre) de même base et même hauteur : V = base × h ÷ 3.',
  },
  {
    id: 'pythagore_hypotenuse', family: 'rule', tag: 'E', skill: 'geo-pythagore', repair: 'geo-pythagore',
    name: 'Mauvais côté pour l\'hypoténuse',
    example: ['hypoténuse 10, côté 6 → √(10² + 6²)', '√(10² − 6²) = 8'],
    explain: () => 'L\'hypoténuse est le plus grand côté. Si on la connaît, on <b>soustrait</b> : côté² = hypoténuse² − autre côté².',
  },
  {
    id: 'thales_ratio_mismatch', family: 'rule', tag: 'E', skill: 'geo-thales', repair: 'prop-rule3',
    name: 'Rapport pris à l\'envers',
    example: ['grand ÷ petit appliqué au grand côté', 'même rapport dans le même sens'],
    explain: () => 'Écris les rapports dans le même sens : grand triangle sur petit triangle, pour chaque paire de côtés qui se correspondent.',
  },
  // ---------- functions and graphs ----------
  {
    id: 'graph_xy_swap', family: 'symbol', tag: 'R', skill: 'fn-read', repair: 'fn-point',
    name: 'Inverser x et y',
    example: ['A(2 ; −3) placé en (−3 ; 2)', 'x = 2 horizontal, y = −3 vertical'],
    explain: () => 'La première coordonnée est x, sur l\'axe horizontal ; la deuxième est y, sur l\'axe vertical. f(2) se lit en partant de x = 2.',
  },
  {
    id: 'slope_y_over_x', family: 'rule', tag: 'E', skill: 'fn-linear', repair: 'prop-rule3',
    name: 'Lire y au lieu de la pente',
    example: ['passe par (2 ; 6) → a = 6', 'a = 6 ÷ 2 = 3'],
    explain: () => 'La pente, c\'est ce que y gagne quand x augmente de <b>1</b>. Si la droite passe par (2 ; 6), alors a = 6 ÷ 2.',
  },
  {
    id: 'slope_intercept_swap', family: 'symbol', tag: 'E', skill: 'fn-affine', repair: 'fn-affine',
    name: 'Échanger la pente et l\'ordonnée à l\'origine',
    example: ['y = 2x + 3 : coupe l\'axe en 2', 'coupe l\'axe en 3, pente 2'],
    explain: () => 'Dans y = ax + b, le nombre <b>devant x</b> est la pente a ; le nombre <b>seul</b>, b, est là où la droite coupe l\'axe vertical (pour x = 0).',
  },
  {
    id: 'slope_sign', family: 'sign', tag: 'E', skill: 'fn-affine', repair: 'fn-linear',
    name: 'Mauvais signe de pente',
    example: ['y = −2x + 1 qui monte', 'y = −2x + 1 descend'],
    explain: () => 'Une pente négative fait <b>descendre</b> la droite quand on va vers la droite ; une pente positive la fait monter.',
  },
  {
    id: 'intercept_sign', family: 'sign', tag: 'E', skill: 'fn-affine', repair: 'fn-read',
    name: 'Mauvais signe de l\'ordonnée à l\'origine',
    example: ['y = x − 3 coupe l\'axe en 3', 'coupe l\'axe en −3'],
    explain: () => 'Pour x = 0, y = b : avec y = x − 3, la droite coupe l\'axe vertical en −3.',
  },
];





export const RULE_BY_ID = Object.fromEntries(RULES.map((r) => [r.id, r]));

export const OP_RULES = RULES.filter((r) => r.op);

const NAMES = {
  2: ['demis', 'demi'], 3: ['tiers', 'tiers'], 4: ['quarts', 'quart'], 5: ['cinquièmes', 'cinquième'],
  6: ['sixièmes', 'sixième'], 7: ['septièmes', 'septième'], 8: ['huitièmes', 'huitième'],
  9: ['neuvièmes', 'neuvième'], 10: ['dixièmes', 'dixième'], 12: ['douzièmes', 'douzième'],
  100: ['centièmes', 'centième'],
};

// "quarts", "cinquièmes"... for explanations.
export function frName(d, plural = true) {
  const n = NAMES[d];
  if (n) return plural ? n[0] : n[1];
  return plural ? `${d}es` : `${d}e`;
}

export { FQ };
