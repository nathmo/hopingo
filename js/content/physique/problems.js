// Physics problems: a template is data (js/content/physique/bank/*.js), a
// problem is one draw of it: a case (which quantity is asked), numbers, the
// units the data are shown in, a formula sheet with decoys.
//
// Template:
//   id, domain ('meca' | 'thermo' | 'elec'), title
//   formulas   the chain, in the order of the path: ['E = m g h', 'E = 1/2 m v^2']
//   decoys     formulas of the sheet that do not serve
//   quantities sym → {min, max, step} in SI, or {value} (a constant of the
//              data sheet, like g), and units: [SI unit, other units shown at
//              higher levels]
//   bridges    the bridge quantities (step 2)
//   cases      [{find, given, text, lines, answerUnit, minLevel}]
//              text   the statement, French, with {sym} for the data and {nom}
//              lines  the reference algebra (step 3), last line « find = … »
//              quantities  overrides of the template's quantities for this case
//   cancels    {sym: 'ce que ça veut dire'}: a symbol that simplifies (step 3)
//   compare    optional {text, ref: value in the answer unit} for the verdict
//
// Symbols that are neither given nor asked nor bridges are free: not given,
// and they cancel (the mass of the potato).

import { t } from '../../i18n.js';
import { formula, situations, solveAll } from '../../physics/relations.js';
import { parseUnit } from '../../physics/units.js';
import { quantityOf, dimsOf } from '../../physics/quantities.js';
import { parse, symbolsIn } from '../../physics/expr.js';
import { fix, nice, qty, unitText, symsOf, ALL_SYMBOLS as ALL_KNOWN } from './format.js';
import { BANK } from './bank/index.js';

export const TEMPLATES = BANK;
export const TEMPLATE_BY_ID = Object.fromEntries(BANK.map((x) => [x.id, x]));

// t() fills {name} placeholders with plain letters only: the texts here
// use symbols ({ΔT}, {ρ}, {L_f}), so they are filled after translation.
const fillAll = (text, vars) => text.replace(/\{([^{}\s]+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

const NAMES = ['Lila', 'Noé', 'Chiara', 'Mathilde', 'Yanis', 'Sara', 'Elio', 'Léa', 'Malik', 'Inès'];

// Every symbol of the template (formulas, decoys, lines).
export function symbolsOfTemplate(tp) {
  const out = new Set(Object.keys(tp.quantities));
  for (const f of [...tp.formulas, ...(tp.decoys || [])]) for (const s of symsOf(f, symsAll(tp))) out.add(s);
  return [...out];
}
// Symbols the parser must know to read the template's formulas.
const symsAll = (tp) => [...new Set([...Object.keys(tp.quantities), ...(tp.extraSymbols || []), ...ALL_KNOWN])];

// A value drawn on the step grid of a quantity.
function draw(rng, q) {
  if (q.value != null) return q.value;
  const n = Math.round((q.max - q.min) / q.step);
  return fix(q.min + q.step * rng.int(0, n));
}

// A value shown in another unit: 3 significant figures in that unit, and the
// SI value recomputed from what is shown (the student only sees that).
function shownIn(si, unit) {
  const f = parseUnit(unit).f;
  const shown = fix(Number((si / f).toPrecision(3)));
  return { shown, si: fix(shown * f) };
}

// One problem from a template. opts: level (1-5), caseIndex, nonSI (show
// some data in other units), rng.
export function drawProblem(tp, rng, { level = 3, caseIndex = null, nonSI = level >= 3 } = {}) {
  const symbols = symsAll(tp);
  const cases = tp.cases.filter((c) => (c.minLevel ?? 1) <= level);
  const cs = caseIndex != null ? tp.cases[caseIndex] : rng.pick(cases.length ? cases : tp.cases);
  const formulas = tp.formulas.map((f) => formula(f, symbols));
  const pathSyms = [...new Set(formulas.flatMap((f) => f.syms))];
  const bridges = tp.bridges || [];
  const free = pathSyms.filter((s) => s !== cs.find && !cs.given.includes(s) && !bridges.includes(s));
  // A case may narrow a range or fix a constant (g on the Moon).
  const Q = { ...tp.quantities, ...(cs.quantities || {}) };

  for (let tries = 0; tries < 200; tries++) {
    const data = {};
    const env = {};
    for (const s of cs.given) {
      const q = Q[s];
      const si = draw(rng, q);
      const units = q.units || [quantityOf(s).unit];
      // Constants stay in their unit; other data may come in another unit.
      const unit = q.value == null && nonSI && units.length > 1 && rng.chance(0.6) ? rng.pick(units.slice(1)) : units[0];
      const f = parseUnit(unit).f;
      const { shown, si: siShown } = f === 1 ? { shown: si, si } : shownIn(si, unit);
      data[s] = { sym: s, shown, unit, si: siShown, constant: q.value != null, isSI: f === 1 };
      env[s] = siShown;
    }
    // Free symbols: any value, they cancel.
    for (const s of free) env[s] = 1.7;
    let all;
    try { all = solveAll(formulas, env); } catch { continue; }
    const v = all[cs.find];
    const qf = Q[cs.find];
    if (!Number.isFinite(v) || v <= 0) continue;
    if (qf?.min != null && (v < qf.min * 0.999 || v > qf.max * 1.001)) continue;
    const answerUnit = cs.answerUnit || qf?.units?.[0] || quantityOf(cs.find).unit;
    const answerValue = fix(v / parseUnit(answerUnit).f);
    const vars = { nom: rng.pick(NAMES) };
    for (const s of cs.given) vars[s] = qty(data[s].shown, data[s].unit, 4);
    const sheet = rng.shuffle([...tp.formulas.map((f) => ({ src: f, path: true })), ...(tp.decoys || []).map((f) => ({ src: f, path: false }))]);
    const [ref] = cs.lines.slice(-1);
    return {
      template: tp.id, domain: tp.domain, title: t(tp.title), caseIndex: tp.cases.indexOf(cs),
      text: fillAll(t(cs.text), vars),
      find: cs.find, given: cs.given, bridges, free,
      cancels: Object.fromEntries(Object.entries(tp.cancels || {}).map(([k, m]) => [k, t(m)])),
      symbols: symbolsOfTemplate(tp),
      data: cs.given.map((s) => data[s]),
      formulas: tp.formulas, sheet,
      lines: cs.lines, ref,
      value: v, answerUnit, answerValue,
      siUnit: quantityOf(cs.find).unit,
      compare: tp.compare ? { text: t(tp.compare.text), value: tp.compare.value } : null,
      key: `${tp.id}:${cs.find}:${cs.given.map((s) => data[s].shown + data[s].unit).join(',')}`,
    };
  }
  throw new Error(`Pas de tirage pour ${tp.id}`);
}

// Situations for checking lines of this problem (js/physics/relations.js).
export function situationsOf(pb, rng = Math.random) {
  const formulas = pb.formulas.map((f) => formula(f, pb.symbols));
  // Several draws, so that a line true by chance on one is caught.
  return situations(formulas, [...pb.given, ...pb.free], rng, 5);
}

// Units of every symbol of the problem.
export const problemDims = (pb) => dimsOf(pb.symbols);

// Which symbols of a formula are known, asked, bridges (step 2).
export function rolesOf(pb) {
  const roles = {};
  for (const s of pb.given) roles[s] = 'connue';
  roles[pb.find] = 'inconnue';
  for (const s of pb.bridges) roles[s] = 'pont';
  for (const s of pb.free) roles[s] = 'libre';
  return roles;
}

// Symbols written in the statement (given + asked): step 1 keeps the
// formulas sharing one of them with the statement.
export function sharesWithStatement(pb, src) {
  const syms = symbolsIn(parse(src, pb.symbols));
  return [...syms].some((s) => s === pb.find || pb.given.includes(s));
}

export { nice, unitText };
