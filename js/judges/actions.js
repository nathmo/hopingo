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
import { evalFloat } from '../cas/numeric.js';

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

// ---------- step U1b: sums (G5) ----------

function sumNodes(prev) {
  const out = [];
  walk(prev, (n) => { if (n.t === 'sum') out.push(n); return true; });
  return out;
}
const hasIndex = (s, e = s.e) => contains(e, (x) => x.t === 'sym' && !x.sub && x.name === s.k);
// A term the formulas of the course read directly: k, k², or a constant.
function plainTerm(s) {
  const e = sp(s.e);
  if (!hasIndex(s)) return true;
  if (e.t === 'sym' && e.name === s.k) return true;
  return e.t === 'pow' && sp(e.b).t === 'sym' && sp(e.b).name === s.k && sp(e.e).t === 'num';
}
const topSum = (n) => { n = sp(n); if (n.t === 'neg') n = sp(n.e); return n.t === 'bin' && (n.op === '+' || n.op === '-'); };

// Σ by linearity and the formulas of the course (g5-sigma).
ACTIONS.sigma = (prev) => {
  const ss = sumNodes(prev);
  const linear = ss.some((s) => !plainTerm(s));
  return [
    { id: 'linear', label: 'Linéarité : séparer la somme et sortir les constantes', valid: linear, why: ss.length ? 'Chaque somme est déjà une somme de k, de k² ou d’une constante.' : 'Il n’y a plus de Σ.' },
    { id: 'formula', label: 'Formules du cours : Σ k, Σ k², Σ c', valid: ss.length > 0 && !linear, why: ss.length ? 'Sépare d’abord la somme : les formules portent sur Σ k, Σ k² et Σ c.' : 'Il n’y a plus de Σ.' },
    { id: 'compute', label: 'Calculer et réduire', valid: !ss.length, why: 'Il reste des Σ à remplacer par leur formule.' },
  ];
};

// Telescoping sums (g5-reindex).
ACTIONS.telescope = (prev) => {
  const ss = sumNodes(prev);
  const diff = ss.some((s) => { const e = sp(s.e); return e.t === 'bin' && e.op === '-'; });
  return [
    { id: 'decompose', label: 'Décomposer le terme en une différence', valid: ss.length > 0 && !diff, why: diff ? 'Le terme est déjà une différence.' : 'Il n’y a plus de Σ.' },
    { id: 'telescope', label: 'Écrire les termes et télescoper', valid: diff, why: ss.length ? 'Décompose d’abord le terme en une différence aₖ − aₖ₊₁.' : 'Il n’y a plus de Σ.' },
    { id: 'reduce', label: 'Simplifier ou réduire au même dénominateur', valid: !ss.length && topSum(prev), why: ss.length ? 'Il reste une Σ.' : 'C’est déjà réduit.' },
  ];
};

// The heredity of a sum formula (g5-induction-sum): split, hypothesis, factor.
ACTIONS.induction = (prev) => {
  const ss = sumNodes(prev);
  const top = ss.some((s) => { const h = sp(s.hi); return h.t === 'bin' && h.op === '+'; });
  return [
    { id: 'split', label: 'Séparer le dernier terme (k = n + 1)', valid: top, why: 'La somme s’arrête déjà à n.' },
    { id: 'hyp', label: 'Remplacer la somme jusqu’à n par l’hypothèse de récurrence', valid: ss.length > 0 && !top, why: top ? 'Sépare d’abord le dernier terme : l’hypothèse parle de la somme jusqu’à n.' : 'Il n’y a plus de Σ.' },
    { id: 'factor', label: 'Mettre en facteur pour retrouver la formule au rang n + 1', valid: !ss.length, why: 'Il reste une Σ à remplacer.' },
  ];
};

// Menus written by the generator for each reference line (cfg.menus:
// [{at: text of the line before, options}]): the one whose line is the
// student's previous line, else cfg.menu, else none (free line).
ACTIONS.steps = (prev, cfg) => {
  // Step U6: a line of the judge `system` (or of a matrix judge) is keyed
  // by its own text; the generator then writes each menu's `key`.
  const key = prev?.t === 'sys' || prev?.t === 'mline' ? prev.text : toText(sp(prev));
  for (const m of cfg.menus || []) {
    if (!m.key) m.key = toText(sp(parse(m.at, { vars: cfg.vars })));
    if (m.key === key) return m.options;
  }
  return cfg.menu || [];
};

// The menu written by the generator for this part (cfg.menu).
ACTIONS.menu = (prev, cfg) => cfg.menu || [];

export const actionsFor = (kind, prev, cfg) => (ACTIONS[kind] ? ACTIONS[kind](prev, cfg) : []);

// ---------- step U1, part b (G3) ----------

// Trigonometry: reduce f(θ) (remove turns, associated angle, known value),
// and arccos(cos θ) (remove turns, angle with the same value in the image,
// conclude). Computed on the first trig function of the line; θ may hold x
// (cos(7π − x)): its constant part is read.
const TRIG_FNS = new Set(['sin', 'cos', 'tan', 'cot']);
const ARC_FNS = { arcsin: [-0.5, 0.5], arccos: [0, 1], arctan: [-0.5, 0.5], Arctg: [-0.5, 0.5], arctg: [-0.5, 0.5] };
ACTIONS.trig = (prev) => {
  let target = null;
  let arc = null;
  walk(prev, (n) => {
    if (target) return false;
    if (n.t === 'fn' && ARC_FNS[n.name] && sp(n.args[0]).t === 'fn' && TRIG_FNS.has(sp(n.args[0]).name)) { arc = n.name; target = sp(n.args[0]); return false; }
    if (n.t === 'fn' && TRIG_FNS.has(n.name)) { target = n; return false; }
    return true;
  });
  if (!target) return [];
  const arg = target.args[0];
  const c0 = evalFloat(arg, { x: 0 }) / Math.PI;
  const slope = evalFloat(arg, { x: 1 }) / Math.PI - c0;
  const eps = 1e-9;
  const half = target.name === 'tan' || target.name === 'cot';
  let tours;
  let assoc;
  if (arc) {
    const [lo, hi] = ARC_FNS[arc];
    tours = half ? !(c0 > -0.5 + eps && c0 < 0.5 + eps) : !(c0 > -1 + eps && c0 <= 1 + eps);
    assoc = !(c0 >= lo - eps && c0 <= hi + eps);
  } else {
    const P = half ? 1 : 2;
    tours = c0 < -eps || c0 >= P - eps;
    assoc = Math.abs(slope) > eps ? Math.abs(c0) > eps : c0 > 0.5 + eps;
  }
  return [
    { id: 'tours', label: half ? 'Retirer des multiples de π' : 'Retirer des tours de 2π', valid: tours, why: 'L\'angle est déjà dans un seul tour.' },
    { id: 'assoc', label: arc ? 'Prendre l\'angle de même valeur dans l\'image de la fonction arc' : 'Utiliser un angle associé (π − x, π + x, π/2 ± x…)', valid: !tours && assoc, why: tours ? 'Retire d\'abord les tours entiers.' : 'L\'angle est déjà dans le bon intervalle.' },
    { id: 'value', label: arc ? 'Conclure : l\'angle est dans l\'image' : 'Écrire la valeur connue', valid: !tours && !assoc, why: 'Réduis d\'abord l\'angle.' },
  ];
};

// Exact values (g3-exact): decompose the angle, addition formula, known
// values, simplify — read on the student's line.
const KNOWN_DEN = new Set([1, 2, 3, 4, 6]);
ACTIONS.exact = (prev) => {
  const fns = [];
  walk(prev, (n) => { if (n.t === 'fn' && TRIG_FNS.has(n.name)) { fns.push(n); return false; } return true; });
  const den = (a) => { const k = evalFloat(a, {}) / Math.PI; for (let d = 1; d <= 24; d++) if (Math.abs(Math.round(k * d) - k * d) < 1e-9) return d; return null; };
  const sum = fns.some((f) => { const a = sp(f.args[0]); return a.t === 'bin' && (a.op === '+' || a.op === '-'); });
  const unknown = !sum && fns.some((f) => !KNOWN_DEN.has(den(f.args[0])));
  const known = !sum && !unknown && fns.length > 0;
  return [
    { id: 'decompose', label: 'Écrire l\'angle comme somme ou différence d\'angles connus', valid: unknown, why: 'Les angles de la ligne sont déjà des angles connus.' },
    { id: 'add', label: 'Formule d\'addition', valid: sum, why: 'Aucun sinus ou cosinus de la ligne ne porte sur une somme.' },
    { id: 'values', label: 'Remplacer par les valeurs connues', valid: known, why: unknown || sum ? 'Il reste un angle qui n\'est pas dans la table.' : 'Il n\'y a plus de sinus ni de cosinus.' },
    { id: 'simplify', label: 'Simplifier les racines et les fractions', valid: !fns.length, why: 'Il reste des fonctions trigonométriques à calculer.' },
    { id: 'half', label: 'Formule de bissection', valid: false, why: 'Ici l\'angle s\'écrit comme une somme d\'angles connus : la formule d\'addition suffit.' },
  ];
};
