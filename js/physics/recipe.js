// The judge of a 6-step problem (« la recette », docs/plan-physique.md):
// pure functions on a problem (js/content/physique/problems.js) and what the
// student did. The screen is js/ui/recipe.js.
//
//   1 Trier       keep the formulas sharing a letter with the statement;
//                 the data in SI
//   2 Chemin      remove the formulas that do not serve; mark each letter
//                 connue / inconnue / pont
//   3 Algèbre     lines true for the situation, last « inconnue = lettres »
//   4 Unités      lines of units of that expression, then: is it the unit of
//                 the unknown?
//   5 Approx.     a calculation with rounded numbers, then an estimate
//   6 Nombres     the app computes the student's expression; coherent with
//                 the estimate? then the rounded answer
// Messages are French, through t().

import { t } from '../i18n.js';
import { parse, tryParse, evaluate, dimension, symbolsIn, numbersIn, isolated, DimError } from './expr.js';
import { holds, equalsSymbol } from './relations.js';
import { parseUnit, dimEq, formatDim } from './units.js';
import { dimsOf } from './quantities.js';
import { readNumber } from './checker.js';

const F = (s) => `« ${s} »`;
const symsOfSrc = (pb, src) => [...symbolsIn(parse(src, pb.symbols))];
const inStatement = (pb, s) => s === pb.find || pb.given.includes(s);

// ---------- step 1: sorting the sheet ----------

// The formulas to keep at step 1: those sharing a letter with the statement,
// and every formula of the path.
export function step1Targets(pb) {
  return pb.sheet.filter((f) => f.path || symsOfSrc(pb, f.src).some((s) => inStatement(pb, s))).map((f) => f.src);
}

// Tapping a formula at step 1 (pick mode): a nudge if it shares nothing.
export function judgePick(pb, src) {
  const syms = symsOfSrc(pb, src);
  if (step1Targets(pb).includes(src)) return { ok: true };
  return { ok: false, rule: 'ph_decoy_formula', message: t('Aucune lettre de cette formule n\'est dans l\'énoncé : ni donnée, ni cherchée. Elle ne peut rien relier.'), syms };
}

// Leaving step 1: only a formula of the path blocks. The other formulas that
// share a letter may be kept (step 2 removes them) or left on the sheet.
// The hint names a letter, not the formula.
export function judgeStep1(pb, kept) {
  const extra = kept.filter((f) => !step1Targets(pb).includes(f));
  if (extra.length) return { ok: false, rule: 'ph_decoy_formula', message: t('{f} n\'a aucune lettre en commun avec l\'énoncé.', { f: F(extra[0]) }) };
  const missing = pb.formulas.find((f) => !kept.includes(f));
  if (missing) {
    const syms = symsOfSrc(pb, missing);
    if (syms.includes(pb.find)) return { ok: false, message: t('Il te manque une formule : il en faut une qui contient {s}, ce qu\'on cherche.', { s: pb.find }) };
    // Prefer a letter of the statement that no kept formula has yet.
    const have = new Set(kept.flatMap((f) => symsOfSrc(pb, f)));
    const s = syms.find((x) => inStatement(pb, x) && !have.has(x)) || syms.find((x) => inStatement(pb, x));
    return { ok: false, message: s ? t('Il te manque une formule : il en faut une autre qui contient {s}.', { s }) : t('Il te manque une formule pour relier les données à ce qu\'on cherche.') };
  }
  return { ok: true };
}

// A data value written in SI at step 1.
export function judgeSI(datum, raw) {
  const r = readNumber(raw);
  if (!r) return { ok: false, parse: true, message: t('Écris un nombre, par exemple 0,45 ou 1,8·10^5.') };
  if (Math.abs(r.v - datum.si) <= 1e-6 * Math.abs(datum.si)) return { ok: true };
  // Not converted at all, or converted the wrong way.
  const f = datum.si / datum.shown;
  const same = (x) => Math.abs(r.v - x) <= 1e-6 * Math.abs(x);
  let rule = null;
  if (same(datum.shown)) {
    rule = { 'km/h': 'ph_kmh_not_converted', g: 'ph_gram_as_kg', Wh: 'ph_wh_forget_3600', kWh: 'ph_wh_forget_3600' }[datum.unit] || 'ph_not_si';
  } else if (same(datum.shown / f)) rule = datum.unit === 'km/h' ? 'speed_factor_wrong_way' : 'convert_wrong_direction';
  return { ok: false, rule, message: t('Ce n\'est pas {v} en unités SI.', { v: `${String(datum.shown).replace('.', ',')} ${datum.unit}` }) };
}

// ---------- step 2: the path ----------

// Removing a formula (step 2, or step 1 in remove mode).
export function judgeRemove(pb, src) {
  if (!pb.formulas.includes(src)) return { ok: true };
  const syms = symsOfSrc(pb, src);
  if (syms.includes(pb.find)) return { ok: false, rule: 'ph_needed_removed', message: t('Tu en as besoin : {f} contient l\'inconnue {s}.', { f: F(src), s: pb.find }) };
  const bridge = syms.find((s) => pb.bridges.includes(s));
  if (bridge) return { ok: false, rule: 'ph_needed_removed', message: t('Tu en as besoin : {f} donne le pont {s} à partir de ce que tu connais.', { f: F(src), s: bridge }) };
  return { ok: false, rule: 'ph_needed_removed', message: t('Tu en as besoin : {f} est sur le chemin.', { f: F(src) }) };
}

// The expected role of each letter of the kept formulas (free letters,
// which cancel, may be left unmarked or marked « pont »).
export function expectedRoles(pb) {
  const roles = {};
  for (const s of pb.given) roles[s] = 'connue';
  roles[pb.find] = 'inconnue';
  for (const s of pb.bridges) roles[s] = 'pont';
  for (const s of pb.free) roles[s] = 'libre';
  return roles;
}

// Checks step 2: kept formulas and the colour of each letter → {ok, message, rule}.
export function judgeStep2(pb, kept, marks) {
  const decoy = kept.find((f) => !pb.formulas.includes(f));
  const roles = expectedRoles(pb);
  if (decoy) {
    const lost = symsOfSrc(pb, decoy).filter((s) => !roles[s]);
    return { ok: false, rule: 'ph_decoy_formula', message: lost.length ? t('Dans {f}, {s} n\'est ni donnée, ni cherchée, ni dans une autre formule : cette formule ajoute une inconnue sans rien donner. Retire-la.', { f: F(decoy), s: lost.join(', ') }) : t('{f} ne sert pas au chemin : retire-la.', { f: F(decoy) }) };
  }
  const missing = pb.formulas.find((f) => !kept.includes(f));
  if (missing) return { ok: false, rule: 'ph_needed_removed', message: judgeRemove(pb, missing).message };
  const syms = [...new Set(pb.formulas.flatMap((f) => symsOfSrc(pb, f)))];
  for (const s of syms) {
    const want = roles[s];
    const got = marks[s] || null;
    if (want === 'libre') { if (got && got !== 'pont') return { ok: false, message: t('{s} n\'est pas donnée dans l\'énoncé, et on ne la cherche pas.', { s }) }; continue; }
    if (got === want) continue;
    if (!got) return { ok: false, message: t('Il reste des lettres à surligner, par exemple {s}.', { s }) };
    if (want === 'pont') return { ok: false, rule: 'ph_bridge_missed', message: t('{s} n\'est donnée nulle part et on ne la demande pas, mais elle est dans deux formules : c\'est le pont.', { s }) };
    if (want === 'connue') return { ok: false, message: t('{s} est donnée (dans l\'énoncé ou la fiche) : c\'est une connue.', { s }) };
    return { ok: false, message: t('{s} est ce que la question demande : c\'est l\'inconnue.', { s }) };
  }
  return { ok: true };
}

// ---------- step 3: algebra ----------

// Numbers allowed in the algebra: those of the formulas (½, 2…).
export const allowedNumbers = (pb) => new Set([1, ...pb.formulas.flatMap((f) => numbersIn(parse(f, pb.symbols)))]);

// One line of algebra → {kind: 'ok' | 'final' | 'wrong' | 'parse' | 'numbers', node, message, rule}
export function judgeAlgebraLine(pb, sits, raw) {
  const node = tryParse(raw, pb.symbols);
  if (!node) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette ligne.') };
  if (node.t !== 'eq') return { kind: 'parse', message: t('Écris une égalité, avec « = ».') };
  const allowed = allowedNumbers(pb);
  if (numbersIn(node).some((x) => !allowed.has(x))) return { kind: 'numbers', rule: 'ph_numbers_in_algebra', message: t('Que des lettres à l\'étape 3 : les nombres viennent à l\'étape 6.') };
  if (!holds(node, sits)) return { kind: 'wrong', node, rule: trapOf(pb, sits, node), message: t('Cette ligne n\'est pas vraie pour ce problème : elle ne suit pas des formules.') };
  const iso = isolated(node);
  if (iso && iso.sym === pb.find) {
    const left = [...symbolsIn(iso.expr)].filter((s) => !pb.given.includes(s));
    if (!left.length) return { kind: 'final', node, expr: iso.expr };
    if (left.every((s) => pb.free.includes(s))) return { kind: 'ok', node, rule: 'ph_not_simplified', notice: t('C\'est juste, mais {s} n\'est pas donnée : simplifie-la.', { s: left.join(', ') }) };
  }
  return { kind: 'ok', node };
}

// A wrong last line: which trap, from its ratio to the right answer.
function trapOf(pb, sits, node) {
  const iso = isolated(node);
  if (!iso || iso.sym !== pb.find) return null;
  try {
    const r = sits.map((env) => evaluate(iso.expr, env) / env[pb.find]);
    const same = (x) => r.every((y) => Math.abs(y - x) < 1e-6 * Math.max(1, Math.abs(x)));
    if (same(2) || same(0.5)) return pb.formulas.some((f) => f.includes('1/2')) ? 'ph_ec_forget_half' : null;
    // 1/answer: the fraction turned over.
    if (sits.every((env) => Math.abs(evaluate(iso.expr, env) * env[pb.find] - 1) < 1e-6)) return 'ph_iso_flip';
    // answer²: the root forgotten.
    if (sits.every((env) => Math.abs(evaluate(iso.expr, env) - env[pb.find] ** 2) < 1e-6 * env[pb.find] ** 2)) return 'ph_forget_sqrt';
  } catch { /* no trap */ }
  return null;
}

// ---------- step 4: units ----------

// The unit of an expression of the problem's letters.
export function dimOfExpr(pb, expr) {
  try { return { d: dimension(expr, dimsOf(pb.symbols)) }; } catch (e) {
    return { error: e instanceof DimError ? e.message : t('Unité impossible à calculer.') };
  }
}

// One line of units, compared with the unit of the expression.
export function judgeUnitLine(dim, raw) {
  let u;
  try { u = parseUnit(raw, { prefixes: false }); } catch { return { kind: 'parse', message: t('Je n\'arrive pas à lire ces unités.') }; }
  if (dim && dimEq(u.d, dim)) return { kind: 'ok', d: u.d };
  return { kind: 'wrong', d: u.d, message: t('Cette ligne n\'a pas la même unité que ton expression.') };
}

// The student's conclusion: « c'est l'unité de l'inconnue » or not.
export function judgeUnitVerdict(pb, dim, says) {
  const right = !!dim && dimEq(dim, dimsOf([pb.find])[pb.find]);
  if (says === right) return { ok: true, right };
  return { ok: false, right, rule: says ? 'ph_units_lie' : null, message: says ? t('Ton expression ne donne pas des {u} : l\'algèbre de l\'étape 3 est fausse quelque part.', { u: formatDim(dimsOf([pb.find])[pb.find]) }) : t('Si : ton expression donne bien l\'unité de l\'inconnue.') };
}

// The unit of the expression, written out (for the correction).
export const unitText = (d) => formatDim(d);

// ---------- step 5: estimate ----------

const sigOf = (v) => {
  if (!v) return 1;
  const s = String(v).replace('.', '').replace(/^0+/, '').replace(/0+$/, '');
  return s.length;
};

// Lines of rounded numbers: every number has at most two significant
// figures (powers of ten aside).
export function judgeEstimateLine(raw) {
  const node = tryParse(raw, []);
  if (!node) return { kind: 'parse', message: t('Je n\'arrive pas à lire cette ligne.') };
  const exps = new Set();
  const walk = (n) => { if (!n) return; if (n.t === 'pow') exps.add(n.b); walk(n.a); walk(n.b); if (n.sides) n.sides.forEach(walk); };
  walk(node);
  const nums = [];
  const collect = (n) => { if (!n || exps.has(n)) return; if (n.t === 'num' && n.v !== 10) nums.push(n.v); collect(n.a); collect(n.b); if (n.sides) n.sides.forEach(collect); };
  collect(node);
  if (nums.some((x) => sigOf(x) > 2)) return { kind: 'precise', message: t('Arrondis davantage : un ou deux chiffres significatifs suffisent.') };
  try {
    const v = node.t === 'eq' ? evaluate(node.sides[node.sides.length - 1], {}) : evaluate(node, {});
    return { kind: 'ok', value: v };
  } catch { return { kind: 'parse', message: t('Je n\'arrive pas à calculer cette ligne.') }; }
}

// The estimate against the value of the student's own expression.
export function judgeEstimate(estimate, value) {
  if (!(estimate > 0) || !(value > 0)) return { ok: false };
  const ratio = estimate / value;
  if (ratio >= 1 / 3 && ratio <= 3) return { ok: true, ratio };
  const p = Math.round(Math.log10(ratio));
  return { ok: false, ratio, rule: p !== 0 && Math.abs(Math.log10(ratio) - p) < 0.4 ? 'ph_estimate_power10' : null };
}

// ---------- step 6: numbers and verdict ----------

export function valueOf(pb, expr) {
  const env = Object.fromEntries(pb.data.map((d) => [d.sym, d.si]));
  try { return evaluate(expr, env); } catch { return NaN; }
}

// Coherent when the calculation and the estimate are within a factor 3.
export const coherent = (value, estimate) => value > 0 && estimate > 0 && Math.max(value / estimate, estimate / value) <= 3;

export function judgeVerdict(value, estimate, saysCoherent) {
  const c = coherent(value, estimate);
  if (saysCoherent === c) return { ok: true };
  return saysCoherent
    ? { ok: false, rule: 'ph_verdict_ignored', message: t('Le calcul et l\'approximation diffèrent de plus d\'un facteur 3 : l\'un des deux est faux.') }
    : { ok: false, message: t('Les deux sont proches : c\'est cohérent.') };
}

// ---------- ranges (worst case) ----------

// For each data, the end (−1 small, +1 large) that makes the result smallest.
export function minEnds(pb, expr, syms) {
  const env = Object.fromEntries(pb.data.map((d) => [d.sym, d.si]));
  const base = evaluate(expr, env);
  const out = {};
  for (const s of syms) {
    const up = evaluate(expr, { ...env, [s]: env[s] * 1.01 });
    out[s] = up > base ? -1 : 1;
  }
  return out;
}

export { parse as parsePhys, equalsSymbol };
