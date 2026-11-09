// Menus of actions for the « choose the action, then write the line » mode
// (level 3, §8.3). The options are computed from the student's own
// previous line, so they stay right whatever path the student took.
// ACTIONS[kind](prev, cfg) → [{id, label, valid, why}]

import { walk } from '../cas/ast.js';
import { ruleOf } from '../cas/diff.js';
import { strip, walkF, lexFor } from '../cas/logic.js';
import { stripParen as sp, contains } from '../cas/ast.js';
import { polyOf, qCoeffs, productFactors, discriminant, rationalRoots, splitByDivisor } from '../cas/polyx.js';
import { parse } from '../cas/parse.js';
import { toReadable, toText } from '../cas/print.js';
import { mul, lit, num, pow } from '../cas/ast.js';

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


// ---------- step U1 ----------


// Logic lines: where is the first ¬ still to push in?
function logicNegations(prev, cfg) {
  const lex = lexFor(cfg);
  const found = new Set();
  walkF(prev, (n) => {
    if (n.t !== 'not') return true;
    const e = strip(n.e);
    if (e.t === 'q') found.add(e.q === '∀' ? 'forall' : 'exists');
    else if (e.t === 'and' || e.t === 'or') found.add('demorgan');
    else if (e.t === 'imp') found.add('negimp');
    else if (e.t === 'not') found.add('double');
    else if (e.t === 'atom' && lex.atoms.get(e.key)?.table) found.add('atom');
    return true;
  });
  return found;
}

ACTIONS.logic = (prev, cfg) => {
  const f = logicNegations(prev, cfg);
  const none = 'Il n\'y a plus de ¬ à cet endroit de la formule.';
  let orForm = false;
  walkF(prev, (n) => { if (n.t === 'or' && strip(n.l).t === 'not') orForm = true; return true; });
  return [
    { id: 'forall', label: 'Faire passer ¬ à travers ∀ (il devient ∃)', valid: f.has('forall'), why: none },
    { id: 'exists', label: 'Faire passer ¬ à travers ∃ (il devient ∀)', valid: f.has('exists'), why: none },
    { id: 'demorgan', label: 'De Morgan : ¬(A ∧ B), ¬(A ∨ B)', valid: f.has('demorgan'), why: 'Aucun ¬ ne porte sur un ∧ ou un ∨.' },
    { id: 'negimp', label: 'Nier une implication : ¬(A ⇒ B) ≡ A ∧ ¬B', valid: f.has('negimp'), why: 'Aucun ¬ ne porte sur une implication.' },
    { id: 'double', label: 'Double négation : ¬¬A ≡ A', valid: f.has('double'), why: 'Il n\'y a pas de ¬¬ dans la ligne.' },
    { id: 'atom', label: 'Nier un morceau avec la table (¬(x < 3) : x ≥ 3)', valid: f.has('atom'), why: 'Aucun ¬ ne porte directement sur une inégalité ou une appartenance.' },
    ...(cfg.maxSize ? [{ id: 'imp', label: 'Écrire ¬A ∨ B comme A ⇒ B', valid: orForm && !f.size, why: 'Fais d\'abord entrer toutes les négations.' }] : []),
  ];
};

// Conditions and sets.
ACTIONS.solset = (prev, cfg) => {
  const v = cfg.v || 'x';
  const n = sp(prev);
  const hasAbs = contains(n, (x) => x.t === 'abs');
  const hasNot = contains(n, (x) => x.t === 'not');
  const hasSetop = contains(n, (x) => x.t === 'setop');
  const isSet = n.t === 'set' || n.t === 'setop' || (n.t === 'rel' && (sp(n.r).t === 'set' || sp(n.r).t === 'setop'));
  const isolated = (r) => r.t === 'rel' ? (sp(r.l).t === 'sym' && sp(r.l).name === v) || (sp(r.r).t === 'sym' && sp(r.r).name === v)
    : r.t === 'chain' ? r.items.some((x) => sp(x).t === 'sym' && sp(x).name === v) && r.items.filter((x) => contains(x, (y) => y.t === 'sym' && y.name === v)).length === 1 : true;
  let solved = true;
  contains(n, (x) => { if ((x.t === 'rel' || x.t === 'chain') && !isolated(x)) solved = false; return false; });
  const builder = n.t === 'set' && n.kind === 'builder';
  // An image set {3n + 1 | n ≤ 3}: the elements are listed, not solved for.
  const image = builder && sp(n.head).t !== 'in';
  const toCompute = n.t === 'set' && n.kind === 'finite' && n.items.some((x) => contains(x, (y) => y.t === 'bin' || y.t === 'pow'));
  return [
    { id: 'abs', label: 'Ôter la valeur absolue', valid: hasAbs, why: "Il n'y a pas de valeur absolue." },
    { id: 'not', label: 'Écrire la négation sans ¬', valid: hasNot && !hasAbs, why: hasAbs ? 'Commence par la valeur absolue.' : "Il n'y a pas de ¬ dans la ligne." },
    { id: 'solve', label: `Isoler ${v}`, valid: ((!solved && !isSet) || (builder && !image)) && !hasAbs && !hasNot, why: 'La variable est déjà seule de son côté.' },
    { id: 'write', label: "Écrire l'ensemble (intervalles ou éléments)", valid: image || (!isSet && solved && !hasAbs && !hasNot), why: isSet ? "C'est déjà un ensemble." : "Isole d'abord la variable." },
    { id: 'compute', label: 'Calculer les éléments', valid: toCompute, why: 'Les éléments sont déjà calculés.' },
    { id: 'op', label: 'Calculer ∩, ∪ ou ∖', valid: hasSetop, why: "Il n'y a pas d'opération entre ensembles dans la ligne." },
  ];
};

// Polynomial lines: factor, root, trinomial.
ACTIONS.factor = (prev) => {
  let n = sp(prev);
  if (n.t === 'rel') n = sp(n.r);
  const { factors } = productFactors(n);
  let common = false;
  let root = false;
  let tri = false;
  for (const f of factors) {
    const p = polyOf(f.node);
    const cs = p && qCoeffs(p);
    if (!cs) continue;
    const d = cs.length - 1;
    if (d >= 3 && rationalRoots(cs).roots.some((r) => r.q.n !== 0)) root = true;
    if (d >= 2 && cs[0].n === 0) common = true;
    if (d === 2 && discriminant(cs).n >= 0) tri = true;
  }
  return [
    { id: 'common', label: 'Mettre x en facteur', valid: common, why: 'Aucun facteur ne s\'annule en 0.' },
    { id: 'root', label: 'Chercher une racine évidente et diviser', valid: root, why: 'Il ne reste pas de facteur de degré 3 ou plus avec une racine entière.' },
    { id: 'tri', label: 'Factoriser un trinôme (Δ ≥ 0)', valid: tri, why: 'Il ne reste pas de trinôme à Δ ≥ 0.' },
  ];
};

// Identification of coefficients (g0-identify).
ACTIONS.identify = (prev, cfg) => {
  const n = sp(prev);
  const v = cfg.v || 'x';
  const hasX = contains(n, (x) => x.t === 'sym' && x.name === v);
  const expanded = n.t === 'rel' && !contains(n.l, (x) => x.t === 'paren' && contains(x, (y) => y.t === 'sym' && y.name === v) && contains(x, (y) => y.t === 'sym' && (cfg.params || []).includes(y.name)));
  return [
    { id: 'develop', label: 'Développer et ordonner', valid: hasX && !expanded, why: hasX ? "C'est déjà développé." : "Il n'y a plus de x : les coefficients sont identifiés." },
    { id: 'identify', label: 'Identifier les coefficients, degré par degré', valid: hasX && expanded, why: hasX ? "Développe d'abord." : "C'est déjà fait." },
    { id: 'solve', label: 'Résoudre le système', valid: !hasX, why: "Écris d'abord une équation par puissance de x." },
  ];
};

// The next term of the quotient (g0-long-div): computed from the
// remainder of the student's line.
ACTIONS.polydiv = (prev, cfg) => {
  const names = Object.fromEntries(Object.entries(cfg.names || {}).map(([k, t]) => [k, parse(t)]));
  const B = polyOf(parse(cfg.divisor), { names });
  let body = sp(prev);
  if (body.t === 'rel') body = body.r;
  const split = splitByDivisor(body, B, { names, divisorName: cfg.divisorName });
  const R = split?.hasB ? split.r : polyOf(body, { names });
  const v = cfg.v || 'x';
  const dB = B ? B.degreeIn(v) : 0;
  if (!R || R.isZero || R.degreeIn(v) < dB) return [];
  const dR = R.degreeIn(v);
  const t = R.coeffsIn(v)[dR].constValue().div(B.coeffsIn(v)[dB].constValue());
  const term = (c, k) => toReadable(mul(lit(c), k === 0 ? num(1) : k === 1 ? { t: 'sym', name: v } : pow({ t: 'sym', name: v }, num(k))));
  const k = dR - dB;
  return [
    { id: 'right', label: `Terme suivant du quotient : ${term(t, k)}`, valid: true },
    { id: 'sign', label: `Terme suivant du quotient : ${term(t.neg(), k)}`, valid: false, why: 'Le signe : le terme dominant du reste divisé par celui de B.' },
    { id: 'deg', label: `Terme suivant du quotient : ${term(t, k + 1)}`, valid: false, why: `Le degré : x^${dR} divisé par x^${dB} donne x^${k}.` },
  ];
};

// Menus written by the generator for each reference line (cfg.menus:
// [{at: text of the line before, options}]): the one whose line is the
// student's previous line, else cfg.menu, else none (free line).
ACTIONS.steps = (prev, cfg) => {
  const key = toText(sp(prev));
  for (const m of cfg.menus || []) {
    if (!m.key) m.key = toText(sp(parse(m.at, { vars: cfg.vars })));
    if (m.key === key) return m.options;
  }
  return cfg.menu || [];
};

// The menu written by the generator for this part (cfg.menu).
ACTIONS.menu = (prev, cfg) => cfg.menu || [];

export const actionsFor = (kind, prev, cfg) => (ACTIONS[kind] ? ACTIONS[kind](prev, cfg) : []);
