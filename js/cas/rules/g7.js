// Traps of module G7 (step U7): docs/universite/G-gymnase-2.md, « G7 »,
// « Pièges du module ». Most are wrong values, written by the generators
// in cfg.traps (js/cas/rules/stattrap.js); g7_order_confusion is also used
// by module P (p-count, p-hypergeom).

import { trap } from './stattrap.js';
import { parse } from '../parse.js';

// Literal lines (a simplification of factorials, an expansion of a
// binomial) are judged by `equiv`: the generator writes the trap's wrong
// lines in cfg.eqTraps = {id: [texts]} (expressions in cfg.vars).
function eqAware(rule) {
  const own = rule.transform;
  return {
    ...rule,
    judges: ['equiv', ...rule.judges],
    transform: (prev, ctx) => {
      if (ctx?.cfg?.kind !== 'equiv') return own(prev, ctx);
      return (ctx.cfg.eqTraps?.[rule.id] || []).map((t) => parse(t, { vars: ctx.cfg.vars }));
    },
  };
}

const n = (x, d) => (x === undefined || x === null ? d : String(x).replace('.', ',').replace('-', '−'));

const LIST = [
  trap({
    id: 'g7_add_instead_multiply', family: 'proba', tag: 'E', skill: 'g7-mult-principle', repair: 'g7-mult-principle',
    name: 'Additionner au lieu de multiplier',
    example: ['26 + 26 + 9 + 10 + 10', '26 · 26 · 9 · 10 · 10'], wrong: ['608400', '81'],
    explain: (c) => (c.cases
      ? `Les ${c.cases} cas s'excluent l'un l'autre : on additionne leurs nombres, on ne les multiplie pas.`
      : `Pour chaque choix de la 1re case, il y a ${n(c.second, '…')} choix pour la 2e : on multiplie. On n'additionne que des cas qui s'excluent.`),
  }),
  trap({
    id: 'g7_constraint_ignored', family: 'proba', tag: 'E', skill: 'g7-mult-principle', repair: 'g7-mult-principle',
    name: 'Contrainte de l\'énoncé oubliée',
    example: ['26² · 10³', '26² · 9 · 10²'], wrong: ['608400', '676000'],
    explain: (c) => (c.why ? `${c.why}` : 'Relis l\'énoncé : une case a moins de choix (le premier chiffre ne peut pas être 0, ou les éléments doivent être distincts).'),
  }),
  trap({
    id: 'g7_factorial_quotient', family: 'rule', tag: 'E', skill: 'g7-perm-arr', repair: 'g7-perm-arr',
    name: 'Factorielles simplifiées comme des fractions',
    example: ['(n + 1)!/(n − 1)! = (n + 1)/(n − 1)', '(n + 1)!/(n − 1)! = n(n + 1)'], wrong: ['20', '5/3'],
    explain: (c) => `${c.a ?? '(n + 1)!'} = ${c.expand ?? '(n + 1)·n·(n − 1)!'} : on simplifie la factorielle la plus petite, il reste un produit. Les factorielles ne se divisent pas comme des fractions.`,
  }),
  trap({
    id: 'g7_anagram_repeats', family: 'proba', tag: 'E', skill: 'g7-perm-arr', repair: 'g7-perm-arr',
    name: 'Lettres répétées comptées comme différentes',
    example: ['RADAR : 5! = 120', '5!/(2!·2!) = 30'], wrong: ['30', '120'],
    explain: (c) => `Échanger deux lettres identiques donne le même mot : chaque anagramme est comptée ${n(c.over, '2!·2!')} fois dans ${n(c.n, 'n')}!. Divise par les factorielles des lettres répétées.`,
  }),
  trap({
    id: 'g7_order_confusion', family: 'proba', tag: 'R', skill: 'g7-which-count', repair: 'g7-which-count',
    name: 'Ordre compté à tort (ou oublié)',
    example: ['comité : A(7, 3) = 210', 'C(7, 3) = 35'], wrong: ['35', '210'],
    explain: (c) => (c.ordered
      ? `Ici l'ordre compte (${c.ordered}) : chaque choix de ${n(c.k, 'k')} objets donne ${n(c.k, 'k')}! résultats différents. C'est A(n, k), pas C(n, k).`
      : `Dans un comité, {Ana, Bea, Carl} et {Carl, Ana, Bea} sont le même comité. A(n, k) compte chaque groupe k! fois${c.k ? ` (${c.k}! = ${c.kf ?? '…'})` : ''} : il faut C(n, k). (Source : Batanero, Godino et Navarro-Pelayo 1997, « erreur d'ordre ».)`),
  }),
  trap({
    id: 'g7_repetition_confusion', family: 'proba', tag: 'R', skill: 'g7-which-count', repair: 'g7-which-count',
    name: 'Répétition permise ou interdite confondue',
    example: ['code : A(10, 4) = 5040', '10⁴ = 10 000'], wrong: ['10000', '5040'],
    explain: (c) => (c.repeat === false
      ? 'On ne peut pas reprendre le même objet (tirage sans remise, personnes distinctes) : le nombre de choix baisse d\'une case à l\'autre.'
      : 'On peut reprendre le même objet (1111 est un code valable) : chaque case a tous les choix, d\'où nᵏ. (Source : Batanero, Godino et Navarro-Pelayo 1997, « erreur de répétition ».)'),
  }),
  trap({
    id: 'g7_binomial_sign', family: 'sign', tag: 'E', skill: 'g7-binomial', repair: 'g7-binomial',
    name: 'Signe du binôme oublié',
    example: ['coefficient de x⁴ dans (2x − 1/x)⁸ avec (−1)ᵏ oublié', '(−1)² · C(8, 2) · 2⁶ = 1792'], wrong: ['1792', '-1792'],
    explain: (c) => `Le second terme est négatif : son signe est dans (${c.b ?? '−1/x'})ᵏ = (−1)ᵏ·…${c.k !== undefined ? ` Avec k = ${c.k}, le signe est ${c.k % 2 ? '−' : '+'}.` : ''}`,
  }),
  trap({
    id: 'g7_binomial_coef_power', family: 'rule', tag: 'E', skill: 'g7-binomial', repair: 'g7-binomial',
    name: 'Coefficient de x pas élevé à la puissance',
    example: ['C(8, 2) = 28', '28 · 2⁶ = 1792'], wrong: ['1792', '28'],
    explain: (c) => `(${c.a ?? '2x'})^${c.e ?? '6'} = ${c.a0 ?? '2'}^${c.e ?? '6'}·x^${c.e ?? '6'} : le coefficient aussi est élevé à la puissance.`,
  }),
  trap({
    id: 'g7_binomial_index', family: 'rule', tag: 'E', skill: 'g7-binomial', repair: 'g7-binomial',
    name: 'Rang du terme décalé d\'un cran',
    example: ['« 3e terme » avec k = 3', 'k = 2'], wrong: ['28', '56'],
    explain: () => 'Le terme général commence à k = 0 : le 1er terme a k = 0, le 3e terme a k = 2. Vérifie aussi que k donne la bonne puissance de x.',
  }),
  trap({
    id: 'g7_laplace_not_equiprobable', family: 'proba', tag: 'R', skill: 'g7-laplace', repair: 'g7-laplace',
    name: 'Issues supposées équiprobables',
    example: ['P(somme 7) = 1/11', '6/36 = 1/6'], wrong: ['1/6', '1/11'],
    explain: (c) => `${c.what ?? 'Les 11 sommes de 2 à 12'} ne sont pas également probables : compte les issues équiprobables (les couples (dé 1, dé 2), 36 en tout). (Source : Lecoutre 1992, biais d'équiprobabilité.)`,
  }),
  trap({
    id: 'g7_tree_with_replacement', family: 'proba', tag: 'E', skill: 'g7-tree', repair: 'g7-tree',
    name: 'Deuxième tirage comme s\'il y avait remise',
    example: ['3/5 · 3/5 sans remise', '3/5 · 2/4'], wrong: ['3/10', '9/25'],
    explain: (c) => `Sans remise, après une boule tirée il en reste ${c.left ?? 'une de moins'} : les probabilités du 2e niveau changent${c.second ? ` (${c.second})` : ''}.`,
  }),
];

export const RULES = LIST.map(eqAware);
