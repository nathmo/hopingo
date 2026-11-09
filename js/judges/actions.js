// Menus of actions for the « choose the action, then write the line » mode
// (level 3, §8.3). The options are computed from the student's own
// previous line, so they stay right whatever path the student took.
// ACTIONS[kind](prev, cfg) → [{id, label, valid, why}]

import { walk } from '../cas/ast.js';
import { ruleOf } from '../cas/diff.js';

function derivRules(prev, v) {
  const rules = new Set();
  walk(prev, (n) => {
    if (n.t === 'deriv') { rules.add(ruleOf(n.e, n.v || v)); return false; }
    return true;
  });
  return rules;
}

export const ACTIONS = {
  deriv(prev, cfg) {
    const rules = derivRules(prev, cfg.dvar || 'x');
    const left = rules.size > 0;
    const table = ['table', 'poly', 'var', 'const', 'sum', 'constfactor', 'linear'].some((r) => rules.has(r));
    return [
      { id: 'product', label: 'Règle du produit', valid: rules.has('product'), why: 'Aucune dérivée de la ligne ne porte sur un produit de deux fonctions de x.' },
      { id: 'quotient', label: 'Règle du quotient', valid: rules.has('quotient'), why: 'Aucune dérivée de la ligne ne porte sur un quotient avec x au dénominateur.' },
      { id: 'chain', label: 'Règle de chaîne', valid: rules.has('chain'), why: 'Aucune dérivée de la ligne ne porte sur une fonction composée : ce qui est dedans est x lui-même.' },
      { id: 'table', label: 'Dérivées usuelles', valid: table, why: 'Les dérivées qui restent demandent d\'abord une règle (produit, quotient ou chaîne).' },
      { id: 'simplify', label: 'Simplifier', valid: !left, why: 'Il reste des dérivées à calculer avant de simplifier.' },
    ];
  },
};

export const actionsFor = (kind, prev, cfg) => (ACTIONS[kind] ? ACTIONS[kind](prev, cfg) : []);
