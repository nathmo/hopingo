// Generators of the unit « La recette en 6 étapes » (docs/plan-physique.md).
// Every skill is a `recipe` item (judge: js/physics/recipe.js, screen:
// js/ui/recipe.js): a problem of the bank, with the steps the student does
// (`active`) and the others shown done.
//
// Item fields:
//   problem    the problem (js/content/physique/problems.js)
//   active     the steps the student does, in order (1 to 6, 7 = range)
//   feedback   'live' (L1-2: a wrong line is refused at once), 'leave' (L3:
//              checked when leaving the step), 'end' (L4-5: only at the end)
//   sheet      'pick' (tap the useful formulas) or 'remove' (all kept,
//              remove those that do not serve)
//   shown      for single-step skills: the work shown done {expr, estimate,
//              exprRight, estimateRight}
//   range      {pm: {sym: ±}} for the range step

import { t } from '../../i18n.js';
import { TEMPLATES, drawProblem } from './problems.js';
import { F, nice, qty, sci, fix } from './format.js';
import { parse, toHtml, evaluate, dimension, symbolsIn } from '../../physics/expr.js';
import { formatDim, dimEq } from '../../physics/units.js';
import { dimsOf, quantityOf } from '../../physics/quantities.js';
import { valueOf } from '../../physics/recipe.js';

export const GEN = {};

const feedbackOf = (level) => (level <= 2 ? 'live' : level === 3 ? 'leave' : 'end');
const sheetOf = (level) => (level >= 4 ? 'remove' : 'pick');

// One significant figure, as the estimate of step 5 is written.
const round1 = (v) => fix(Number(v.toPrecision(1)));

// The estimate of the correction: every data rounded to one figure.
export function estimateOf(pb, expr) {
  const env = Object.fromEntries(pb.data.map((d) => [d.sym, round1(d.si)]));
  return evaluate(expr, env);
}

// A wrong expression close to the right one (for steps shown with a
// mistake): the root dropped, a division turned into a product, or a
// factor dropped. → {node, rule}
// prefer(node) → true for the mistakes to choose first (those the units
// reveal, for step 4).
export function mutate(node, rng, prefer = null) {
  const options = [];
  if (node.t === 'sqrt') options.push({ node: node.a.t === 'paren' ? node.a.a : node.a, rule: 'ph_forget_sqrt' });
  const divToMul = (n) => {
    if (!n || typeof n !== 'object') return null;
    if (n.t === 'div') return { ...n, t: 'mul' };
    for (const k of ['a', 'b']) {
      const r = divToMul(n[k]);
      if (r) return { ...n, [k]: r };
    }
    return null;
  };
  const m = divToMul(node);
  if (m) options.push({ node: m, rule: 'ph_iso_flip' });
  if (node.t === 'mul') options.push({ node: node.a, rule: null });
  const best = prefer ? options.filter((o) => prefer(o.node)) : [];
  if (best.length) return rng.pick(best);
  return options.length ? rng.pick(options) : { node: { t: 'mul', a: node, b: { t: 'num', v: 2, s: '2' } }, rule: null };
}

// The correction, step by step.
function solutionOf(pb, active) {
  const S = (html, note = '') => ({ html, note });
  const fin = parse(pb.ref, pb.symbols);
  const expr = fin.sides[1];
  const d = dimension(expr, dimsOf(pb.symbols));
  const est = estimateOf(pb, expr);
  const out = [];
  out.push(S(`<b>${t('1 Trier')}</b>`, ''));
  out.push(S(pb.formulas.map((f) => F(f, pb.symbols)).join(' · '), t('les formules du chemin')));
  out.push(S(pb.data.map((x) => `${F(x.sym, pb.symbols)} = ${qty(x.si, siUnitOf(x.sym), 4)}`).join(' · '), t('les données en SI')));
  out.push(S(`<b>${t('2 Chemin')}</b>`, ''));
  out.push(S(`${t('inconnue :')} ${F(pb.find, pb.symbols)}${pb.bridges.length ? ` · ${t('pont :')} ${pb.bridges.map((s) => F(s, pb.symbols)).join(', ')}` : ''}`, ''));
  out.push(S(`<b>${t('3 Algèbre')}</b>`, ''));
  for (const l of pb.lines) out.push(S(F(l, pb.symbols)));
  const cancel = cancelledOf(pb);
  if (cancel) out.push(S('', pb.cancels[cancel]));
  out.push(S(`<b>${t('4 Unités')}</b>`, ''));
  out.push(S(`[${F(pb.find, pb.symbols)}] = ${formatDim(d)}`, t('l\'unité de l\'inconnue : l\'expression est possible')));
  out.push(S(`<b>${t('5 Approximation')}</b>`, ''));
  out.push(S(`≈ ${sci(est, 1)}`, t('chaque donnée arrondie à un chiffre')));
  out.push(S(`<b>${t('6 Nombres')}</b>`, ''));
  out.push(S(`${F(pb.find, pb.symbols)} = ${qty(pb.value, pb.siUnit, 3)}${pb.answerUnit !== pb.siUnit ? ` = ${qty(pb.answerValue, pb.answerUnit, 3)}` : ''}`, t('cohérent avec l\'approximation')));
  return out;
}
const siUnitOf = (sym) => quantityOf(sym)?.unit ?? formatDim(dimsOf([sym])[sym]);

// The letter that cancels in the algebra (in the formulas, not in the answer).
export function cancelledOf(pb) {
  const expr = parse(pb.ref, pb.symbols).sides[1];
  const inExpr = symbolsIn(expr);
  return Object.keys(pb.cancels).find((s) => !inExpr.has(s) && pb.formulas.some((f) => symbolsIn(parse(f, pb.symbols)).has(s))) || null;
}

const STEP_BAITS = {
  1: ['ph_decoy_formula', 'ph_not_si'],
  2: ['ph_needed_removed', 'ph_bridge_missed', 'ph_decoy_formula'],
  3: ['ph_numbers_in_algebra', 'ph_not_simplified', 'ph_iso_flip', 'ph_forget_sqrt'],
  4: ['ph_units_lie'],
  5: ['ph_estimate_power10'],
  6: ['ph_verdict_ignored'],
};
const SI_BAITS = { 'km/h': 'ph_kmh_not_converted', g: 'ph_gram_as_kg', Wh: 'ph_wh_forget_3600', kWh: 'ph_wh_forget_3600' };

export function recipeItem(skill, level, rng, { templates = TEMPLATES, active = [1, 2, 3, 4, 5, 6], nonSI } = {}) {
  const tp = rng.pick(templates);
  const pb = drawProblem(tp, rng, { level, nonSI: nonSI ?? level >= 3 });
  const baits = new Set(active.flatMap((s) => STEP_BAITS[s] || []));
  if (active.includes(1)) for (const d of pb.data) if (!d.isSI) baits.add(SI_BAITS[d.unit] || 'ph_not_si');
  if (!pb.formulas.some((f) => f.includes('1/2')) || !active.includes(3)) baits.delete('ph_ec_forget_half');
  if (!/√/.test(pb.ref)) baits.delete('ph_forget_sqrt');
  if (!pb.free.length || !active.includes(3)) baits.delete('ph_not_simplified');
  const item = {
    skill, level, type: 'recipe',
    prompt: pb.text,
    title: pb.title,
    problem: pb,
    active,
    feedback: feedbackOf(level),
    sheet: sheetOf(level),
    shown: null,
    range: null,
    baits: [...baits],
    solution: solutionOf(pb, active),
    expectedSec: 60 + 70 * active.length,
    key: `${skill}:${pb.key}`,
  };
  return item;
}

// The work shown done before the active step: the right expression, or
// (to check) a wrong one; the estimate, right or off by a factor 10.
function shownWork(pb, rng, { wrongExpr = 0, wrongEstimate = 0 } = {}) {
  const right = parse(pb.ref, pb.symbols).sides[1];
  let expr = right;
  let exprRule = null;
  const exprRight = !rng.chance(wrongExpr);
  // A wrong expression that its units betray, when there is one.
  const dims = dimsOf(pb.symbols);
  const want = dimension(right, dims);
  const betrayed = (n) => { try { return !dimEq(dimension(n, dims), want); } catch { return true; } };
  if (!exprRight) ({ node: expr, rule: exprRule } = mutate(right, rng, betrayed));
  const v = valueOf(pb, expr);
  let estimate = round1(estimateOf(pb, expr));
  const estimateRight = !rng.chance(wrongEstimate);
  if (!estimateRight) estimate = fix(estimate * rng.pick([10, 0.1, 100]));
  return { exprHtml: toHtml(expr), exprText: exprTextOf(expr), exprRight, exprRule, estimate, estimateRight, value: v };
}

// An expression node back to text the parser reads (for the screen).
export function exprTextOf(n) {
  const P = (x) => `(${exprTextOf(x)})`;
  switch (n.t) {
    case 'num': return String(n.s ?? n.v).replace('.', ',');
    case 'sym': return n.s;
    case 'paren': return P(n.a);
    case 'neg': return `-${P(n.a)}`;
    case 'add': return `${exprTextOf(n.a)} + ${exprTextOf(n.b)}`;
    case 'sub': return `${exprTextOf(n.a)} - ${P(n.b)}`;
    case 'mul': return `${P(n.a)}×${P(n.b)}`;
    case 'div': return `${P(n.a)}/${P(n.b)}`;
    case 'pow': return `${P(n.a)}^${P(n.b)}`;
    case 'sqrt': return `√${P(n.a)}`;
    default: return '';
  }
}

const BY = (domain) => TEMPLATES.filter((x) => x.domain === domain);

GEN['ph6-trier'] = (level, rng) => recipeItem('ph6-trier', level, rng, { active: [1] });
GEN['ph6-chemin'] = (level, rng) => recipeItem('ph6-chemin', level, rng, { active: [2], nonSI: false });
GEN['ph6-algebre'] = (level, rng) => recipeItem('ph6-algebre', level, rng, { active: [3], nonSI: false });
GEN['ph6-unites'] = (level, rng) => {
  const it = recipeItem('ph6-unites', level, rng, { active: [4], nonSI: false });
  it.shown = shownWork(it.problem, rng, { wrongExpr: 0.4 });
  return it;
};
GEN['ph6-approx'] = (level, rng) => {
  const it = recipeItem('ph6-approx', level, rng, { active: [5], nonSI: false });
  it.shown = shownWork(it.problem, rng);
  return it;
};
GEN['ph6-verdict'] = (level, rng) => {
  const it = recipeItem('ph6-verdict', level, rng, { active: [6], nonSI: false });
  it.shown = shownWork(it.problem, rng, { wrongExpr: 0.25, wrongEstimate: 0.25 });
  return it;
};
GEN['ph6-meca'] = (level, rng) => recipeItem('ph6-meca', level, rng, { templates: BY('meca') });
GEN['ph6-thermo'] = (level, rng) => recipeItem('ph6-thermo', level, rng, { templates: BY('thermo') });
GEN['ph6-elec'] = (level, rng) => recipeItem('ph6-elec', level, rng, { templates: BY('elec') });
GEN['ph6-ouvert'] = (level, rng) => {
  const it = recipeItem('ph6-ouvert', level, rng, { nonSI: true });
  it.sheet = 'remove';
  return it;
};

// Ranges: the full problem, then the worst case on the student's expression.
GEN['rg-in-problem'] = (level, rng) => {
  const it = recipeItem('rg-in-problem', level, rng, { templates: BY('meca'), active: level <= 2 ? [7] : [1, 2, 3, 4, 5, 6, 7], nonSI: level >= 4 });
  if (level <= 2) it.shown = shownWork(it.problem, rng);
  const pm = {};
  for (const d of it.problem.data) {
    if (d.constant) continue;
    const p = rng.pick([0.02, 0.05, 0.1]);
    pm[d.sym] = fix(Number((d.shown * p).toPrecision(1)));
  }
  it.range = { pm };
  it.baits.push('rg_same_ends', 'ph_too_many_digits');
  return it;
};
