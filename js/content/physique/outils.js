// Unit « Outils du physicien » (docs/plan-physique.md §3 A): data in SI,
// conversions as chains of fractions, base units, checking a formula by its
// units, from a unit to a formula, isolating, orders of magnitude.
// Exercise styles of the class worksheets (conversions, unit simplification,
// diagnostic parts B to D, the formula factory), with new numbers.
//
// Shared helpers (keypads, number and formula answers) are exported for
// js/content/physique/incertitudes.js.

import { t } from '../../i18n.js';
import { F, num, sci, nice, typed, qty, unitText, fix, ALL_SYMBOLS } from './format.js';
import { parseUnit, formatDim, dimEq, BASE } from '../../physics/units.js';
import { parse as parsePhys, dimension } from '../../physics/expr.js';
import { dimsOf, symText } from '../../physics/quantities.js';
import { checkPhys, checkPhysIso, checkPhysUnit } from '../../physics/checker.js';
import { mcqItem } from '../items.js';

export const GEN = {};

// ---------- keypads ----------

// A 6-wide keypad (custom keypads are drawn 6 wide): the digit block
// 7 8 9 / 4 5 6 / 1 2 3, three extra keys on each of its rows, then 0 and
// the moves; the remaining keys after.
export function pad(extra) {
  const e = [...extra];
  while (e.length < 9) e.push('');
  const keys = ['7', '8', '9', ...e.slice(0, 3), '4', '5', '6', ...e.slice(3, 6), '1', '2', '3', ...e.slice(6, 9), 'left', '0', 'right', 'back', ...e.slice(9)];
  while (keys[keys.length - 1] === '') keys.pop();
  return keys;
}
// A number, plain or in scientific notation (1,8×10^5, 3×10^-4).
export const NUMKEYS = pad([',', '×', '^', '-', 'frac', '(', ')']);
// A unit in base units: kg·m^2/(s^2·K).
const UNITKEYS = pad(['kg', 'm', 's', 'K', 'A', '·', 'frac', '^', '(', ')']);
// A formula with physics symbols.
const isoKeys = (symbols, target = '') => pad([...symbols, '=', 'frac', '(', ')', '^', '√(', '×', ...(target.includes('π') ? ['π'] : [])]);

// ---------- items ----------

// The fraction drawn as on the keypad.
export const frac = (a, b) => `<span class="m-frac"><span class="m-n">${a}</span><span class="m-d">${b}</span></span>`;
export const mathSpan = (s) => `<span class="m">${s}</span>`;
// « m = 0,45 kg »
export const dataHtml = (sym, v, unit) => `${F(sym)} = ${qty(v, unit, 4)}`;

// What a student types for an estimate: 3×10^5 from 10 000 on.
export function typedRound(v) {
  const r = fix(Number(v.toPrecision(1)));
  if (Math.abs(r) >= 1e4 || (Math.abs(r) < 1e-2 && r !== 0)) {
    const e = Math.floor(Math.log10(Math.abs(r)));
    return `${fix(r / 10 ** e)}×10^${e}`.replace('.', ',');
  }
  return String(r).replace('.', ',');
}

// Like typed(), but the zeros that count are written: 68,0 with 3 figures.
export function typedSig(v, sig = 3) {
  const r = fix(Number(v.toPrecision(sig)));
  if (r === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(r)));
  const plainSig = String(Math.abs(r)).replace(/^0+/, '').replace(/0+$/, '').length;
  if (Math.abs(r) >= 1e6 || Math.abs(r) < 1e-3 || (e >= sig - 1 && plainSig < sig)) return `${(r / 10 ** e).toFixed(sig - 1)}×10^${e}`.replace('.', ',');
  if (e >= sig - 1) return String(r);
  return r.toFixed(sig - 1 - e).replace('.', ',');
}

// A number answer (checker « phys »). Traps are kept when the checker
// reads them as that mistake: not too close to the answer nor to each other.
export function physItem(skill, level, prompt, value, unit, opts = {}) {
  const { sig = 3, minSig = 2, solution = [], key, sec = 30, baits = [], expected } = opts;
  const v = fix(value);
  const item = {
    skill, level, type: 'answer', prompt,
    expected: expected ?? typed(v, sig),
    checker: 'phys', value: v, minSig, physTraps: [],
    form: 'any', traps: [], keys: opts.keys || NUMKEYS,
    suffix: opts.suffix ?? (unit && unit !== '1' ? unitText(unit) : ''), figure: null,
    baits: [], solution, expectedSec: sec,
    key: `${skill}:${key}`,
    expectedHtml: opts.expectedHtml ?? (unit && unit !== '1' && !opts.suffix ? qty(v, unit, sig) : `${nice(v, sig)} ${opts.suffix || ''}`.trim()),
  };
  if (checkPhys(item, item.expected).kind !== 'done') item.expected = typedSig(v, Math.max(sig, minSig));
  for (const tr of opts.traps || []) {
    if (!tr || !tr[1] || !Number.isFinite(tr[0]) || tr[0] === 0) continue;
    const tv = fix(tr[0]);
    // Kept only if the checker reads the trap, typed, as that mistake
    // (not as right, and not as an earlier trap).
    item.physTraps.push({ value: tv, rule: tr[1] });
    const r = checkPhys(item, typed(tv));
    if (r.kind !== 'wrong' || r.rule !== tr[1]) item.physTraps.pop();
  }
  item.baits = [...new Set([...item.physTraps.map((x) => x.rule), ...baits])];
  return item;
}

// A formula answer « v = … » (checker « physiso »).
export function isoItem(skill, level, prompt, v, target, symbols, traps, { key, solution = [], sec = 45 } = {}) {
  const expected = `${v} = ${target}`;
  const item = {
    skill, level, type: 'answer', prompt, expected,
    checker: 'physiso', variable: v, variableText: symText(v), target, symbols, isoTraps: [],
    form: 'any', traps: [], keys: isoKeys(symbols, target), suffix: '', figure: null,
    baits: [], solution, expectedSec: sec, key: `${skill}:${key}`,
    expectedHtml: F(expected, symbols),
  };
  for (const [expr, rule] of traps) {
    item.isoTraps.push({ expr, rule });
    const r = checkPhysIso(item, `${v} = ${expr}`);
    if (r.kind !== 'wrong' || r.rule !== rule) item.isoTraps.pop();
  }
  item.baits = [...new Set(item.isoTraps.map((x) => x.rule))];
  return item;
}

// A unit answer in base units (checker « physunit »).
function unitItem(skill, level, prompt, unit, traps, { key, solution = [], sec = 40 } = {}) {
  const want = parseUnit(unit).d;
  const expected = baseText(want);
  const item = {
    skill, level, type: 'answer', prompt, expected,
    checker: 'physunit', unit, base: true, unitTraps: [],
    form: 'any', traps: [], keys: UNITKEYS, suffix: '', figure: null,
    baits: [], solution, expectedSec: sec, key: `${skill}:${key}`,
    expectedHtml: mathSpan(unitText(expected)),
  };
  for (const [u, rule] of traps) {
    if (dimEq(parseUnit(u).d, want)) continue;
    item.unitTraps.push({ unit: u, rule });
    const r = checkPhysUnit(item, baseText(parseUnit(u).d));
    if (r.kind !== 'wrong' || r.rule !== rule) item.unitTraps.pop();
  }
  item.baits = [...new Set(item.unitTraps.map((x) => x.rule))];
  return item;
}

// Multiple choice: the right option first in `options`; duplicates dropped.
export function mcq(skill, level, prompt, options, rng, opts = {}) {
  const seen = new Set();
  const out = [];
  for (const o of options) {
    if (seen.has(o.html)) continue;
    seen.add(o.html);
    out.push({ html: o.html, correct: !!o.correct, rule: o.correct ? null : (o.rule ?? null) });
  }
  const kept = opts.max ? [out[0], ...rng.shuffle(out.slice(1)).slice(0, opts.max - 1)] : out;
  return mcqItem(skill, level, prompt, kept, rng, { expectedSec: 20, ...opts });
}

// ---------- units ----------

// A dimension in base units, as typed: kg·m^2/(s^2·K).
export function baseText(d) {
  const up = [];
  const down = [];
  BASE.forEach((b, i) => {
    if (d[i] > 0) up.push(d[i] === 1 ? b : `${b}^${d[i]}`);
    if (d[i] < 0) down.push(-d[i] === 1 ? b : `${b}^${-d[i]}`);
  });
  const top = up.join('·') || '1';
  if (!down.length) return top;
  return `${top}/${down.length > 1 ? `(${down.join('·')})` : down[0]}`;
}
const integerDim = (d) => d.every((x) => Number.isInteger(x));
// A dimension written with the units of the class: N, J, W, else base units.
const KNOWN = ['N', 'J', 'W', 'V'];
const showDim = (d) => KNOWN.find((n) => dimEq(parseUnit(n).d, d)) ?? formatDim(d, { named: false });
const uHtml = (u) => mathSpan(unitText(u));

// The unit of an expression of physics symbols.
export function dimOfExpr(src) {
  const symbols = [...new Set([...ALL_SYMBOLS])];
  const node = parsePhys(src, symbols);
  return dimension(node, dimsOf(symbols));
}

// ---------- ph-si: data in SI ----------

const SI = {
  g: { syms: ['m'], si: 'kg', vals: [450, 250, 80, 35, 1200, 2500, 750, 600, 125, 15, 300], traps: (x) => [[x, 'ph_gram_as_kg'], [x * 1000, 'convert_wrong_direction']] },
  t: { syms: ['m'], si: 'kg', vals: [1.2, 2.5, 0.8, 3, 12, 0.45, 1.75, 5], traps: (x) => [[x, 'ph_not_si'], [x / 1000, 'convert_wrong_direction']] },
  mg: { syms: ['m'], si: 'kg', vals: [500, 250, 1200, 80, 3500, 2500], traps: (x) => [[x * 1e-3, 'ph_gram_as_kg'], [x, 'ph_not_si']] },
  cm: { syms: ['h', 'd'], si: 'm', vals: [180, 45, 250, 12, 75, 320, 8, 140], traps: (x) => [[x, 'ph_not_si'], [x * 100, 'convert_wrong_direction']] },
  km: { syms: ['d'], si: 'm', vals: [2, 0.25, 12, 3.5, 42, 1.8], traps: (x) => [[x, 'ph_not_si'], [x / 1000, 'convert_wrong_direction']] },
  mm: { syms: ['d', 'h'], si: 'm', vals: [12000, 350, 25, 1500, 4], traps: (x) => [[x, 'ph_not_si'], [x * 1000, 'convert_wrong_direction']] },
  min: { syms: ['t'], si: 's', vals: [3, 5, 12, 20, 45, 2.5, 1.5, 8], traps: (x) => [[x, 'ph_not_si'], [x / 60, 'convert_wrong_direction'], [x * 100, 'time_decimal_minutes']] },
  h: { syms: ['t'], si: 's', vals: [2, 1.5, 0.5, 3, 0.25, 8, 1.2], traps: (x) => [[x, 'ph_not_si'], [x * 60, 'ph_not_si'], [x / 3600, 'convert_wrong_direction']] },
  L: { syms: ['V'], si: 'm^3', vals: [2.5, 1.5, 0.75, 12, 250, 5, 8], traps: (x) => [[x, 'ph_not_si'], [x * 1000, 'convert_wrong_direction'], [x * 0.1, 'volume_factor_10']] },
  mL: { syms: ['V'], si: 'm^3', vals: [250, 500, 176, 330, 1500, 15], traps: (x) => [[x * 1e-3, 'ph_not_si'], [x * 1e-4, 'volume_factor_10']] },
  'cm^3': { syms: ['V'], si: 'm^3', vals: [1200, 250, 45, 800, 100, 2500], traps: (x) => [[x * 1e-2, 'volume_factor_10'], [x, 'ph_not_si']] },
  'cm^2': { syms: ['A'], si: 'm^2', vals: [450, 1200, 80, 25, 600], traps: (x) => [[x * 1e-2, 'area_factor_10'], [x, 'ph_not_si']] },
  kJ: { syms: ['E'], si: 'J', vals: [180, 2.5, 165, 600, 12, 252], traps: (x) => [[x, 'ph_not_si'], [x / 1000, 'convert_wrong_direction']] },
  MJ: { syms: ['E'], si: 'J', vals: [36, 2.5, 1.2, 0.8, 15], traps: (x) => [[x, 'ph_not_si'], [x * 1000, 'ph_not_si']] },
  kW: { syms: ['P'], si: 'W', vals: [2, 1.5, 0.8, 2.2, 15, 0.35], traps: (x) => [[x, 'ph_not_si'], [x / 1000, 'convert_wrong_direction']] },
  'km/h': { syms: ['v'], si: 'm/s', vals: [18, 36, 54, 72, 90, 108, 27], traps: (x) => [[x, 'ph_kmh_not_converted'], [x * 3.6, 'speed_factor_wrong_way']] },
  Wh: { syms: ['E'], si: 'J', vals: [500, 360, 12, 60, 2.5], traps: (x) => [[x, 'ph_wh_forget_3600'], [x * 60, 'ph_wh_forget_3600']] },
  '°C': { syms: ['ΔT'], si: 'K', vals: [35, 80, 22, 65, 15, 48], traps: (x) => [[x + 273, 'ph_deltaT_add_273']] },
};
const SI_POOLS = {
  1: ['g', 'cm', 'min', 'km'],
  2: ['t', 'h', 'mm', 'kJ', 'kW', 'g', 'cm', 'min'],
  3: ['L', 'mg', 'kJ', 'MJ', '°C', 'hmin', 'mm', 'h'],
  4: ['L', 'mL', 'MJ', '°C', 'hmin', 'kW', 't'],
  5: ['cm^2', 'cm^3', 'mL', 'km/h', 'Wh', 'hmin'],
};

function siItem(level, rng, u) {
  if (u === 'hmin') {
    const h = rng.int(1, 3);
    const m = rng.pick([10, 15, 20, 30, 40, 45, 50]);
    const s = (h * 60 + m) * 60;
    return physItem('ph-si', level, `${t('Écris cette donnée en unité SI.')}<br>${F('t')} = ${h} h ${m} min`, s, 's', {
      traps: [[(h + m / 100) * 3600, 'ph_minutes_decimal'], [h * 60 + m, 'ph_not_si'], [h * 3600 + m, 'ph_not_si']],
      solution: [{ html: mathSpan(`${h} h ${m} min = ${h * 60 + m} min = ${h * 60 + m} · 60 s = <b>${num(s)} s</b>`), note: t('Une heure a 60 minutes, pas 100.') }],
      key: `hmin:${h}:${m}`, sec: 30,
    });
  }
  const c = SI[u];
  const x = rng.pick(c.vals);
  const sym = rng.pick(c.syms);
  const f = parseUnit(u).f;
  const v = fix(x * f);
  return physItem('ph-si', level, `${t('Écris cette donnée en unité SI.')}<br>${F(sym)} = ${num(x)} ${unitText(u)}`, v, c.si, {
    traps: c.traps(x),
    solution: [{ html: mathSpan(`${num(x)} ${unitText(u)} = ${num(x)} · ${nice(f, 4)} ${unitText(c.si)} = <b>${qty(v, c.si, 4)}</b>`), note: u === '°C' ? t('Un écart de 1 °C est un écart de 1 K : on n\'ajoute pas 273 à un écart.') : `1 ${unitText(u)} = ${nice(f, 4)} ${unitText(c.si)}` }],
    key: `${u}:${sym}:${x}`, sec: 20,
  });
}

// The line of data of a problem, every value in SI: one datum wrong in each
// distractor.
const LINE_KINDS = ['g', 'cm', 'min', 'kJ', 'kW', 'km', 'L'];
const LINE_SYM = { g: 'm', cm: 'h', min: 't', kJ: 'E', kW: 'P', km: 'd', L: 'V' };
function siLineItem(level, rng) {
  const kinds = rng.shuffle(LINE_KINDS).slice(0, 3);
  const data = kinds.map((u) => {
    const x = rng.pick(SI[u].vals);
    return { u, x, sym: LINE_SYM[u], v: fix(x * parseUnit(u).f), si: SI[u].si, trap: SI[u].traps(x)[0] };
  });
  const show = data.map((d) => `${F(d.sym)} = ${num(d.x)} ${unitText(d.u)}`).join(' ; ');
  const line = (k) => data.map((d, i) => (i === k ? dataHtml(d.sym, d.trap[0], d.si) : dataHtml(d.sym, d.v, d.si))).join(' ; ');
  const options = [{ html: line(-1), correct: true }, ...data.map((d, i) => ({ html: line(i), rule: d.trap[1] }))];
  return mcq('ph-si', level, t('Les données d\'un problème sont : {data}. Quelle ligne les écrit correctement en unités SI ?', { data: show }), options, rng, {
    solution: data.map((d) => ({ html: mathSpan(`${num(d.x)} ${unitText(d.u)} = <b>${qty(d.v, d.si, 4)}</b>`), note: '' })),
    key: `line:${data.map((d) => `${d.u}${d.x}`).join(',')}`, sec: 30,
  });
}

// D8 of the diagnostic: which datum does not serve?
const USELESS = [
  { f: 'E_p = m g h', data: [['m', 'kg', [25, 12, 4.5]], ['h', 'cm', [180, 250, 90]]], decoy: ['t', 'min', [3, 5, 2]] },
  { f: 'E_c = 1/2 m v^2', data: [['m', 'g', [450, 150, 800]], ['v', 'km/h', [36, 18, 54]]], decoy: ['h', 'm', [1.2, 3, 0.8]] },
  { f: 'P = E/t', data: [['E', 'kJ', [180, 600, 90]], ['t', 'min', [5, 2, 10]]], decoy: ['m', 'kg', [200, 50, 75]] },
  { f: 'E = m c ΔT', data: [['m', 'g', [500, 1500, 250]], ['ΔT', '°C', [80, 65, 20]]], decoy: ['t', 'min', [4, 6, 12]] },
  { f: 'P = U I', data: [['U', 'V', [230, 24, 12]], ['I', 'A', [3.5, 8, 0.5]]], decoy: ['t', 'h', [2, 3, 0.5]] },
  { f: 'E = F d', data: [['F', 'N', [300, 150, 45]], ['d', 'km', [0.1, 2, 1.5]]], decoy: ['m', 'kg', [80, 60, 12]] },
];
function uselessItem(level, rng) {
  const s = rng.pick(USELESS);
  const all = [...s.data, s.decoy].map(([sym, u, vals]) => ({ sym, html: `${F(sym)} = ${num(rng.pick(vals))} ${unitText(u)}` }));
  const shown = rng.shuffle(all);
  const options = [{ html: all[all.length - 1].html, correct: true }, ...all.slice(0, -1).map((d) => ({ html: d.html }))];
  return mcq('ph-si', level, t('Pour appliquer {f}, on dispose de : {data}. Quelle donnée ne sert à rien ?', { f: F(s.f), data: shown.map((d) => d.html).join(' ; ') }), options, rng, {
    solution: [{ html: F(s.f), note: t('Seules les lettres de la formule servent. Les autres données sont des leurres.') }],
    key: `useless:${s.f}:${all.map((d) => d.html).join('|')}`,
  });
}

GEN['ph-si'] = (level, rng) => {
  if (level === 4 && rng.chance(0.4)) return siLineItem(level, rng);
  if (level === 5 && rng.chance(0.3)) return uselessItem(level, rng);
  return siItem(level, rng, rng.pick(SI_POOLS[level]));
};

// ---------- ph-conv-chain: conversions as chains of fractions ----------

// parts: [[from, to]] of the numerator, then the denominator; kind: area,
// volume (the factor is squared or cubed).
const CHAIN = [
  { from: 'km/h', to: 'm/s', parts: [['km', 'm']], den: [['h', 's']], vals: [18, 36, 54, 72, 90, 108, 126, 45], lv: 1, traps: (x) => [[x * 3.6, 'speed_factor_wrong_way'], [x, 'ph_kmh_not_converted']] },
  { from: 'kWh', to: 'J', parts: [['kWh', 'J']], vals: [1, 2, 3, 5, 0.5, 1.5, 12], lv: 1, traps: (x) => [[x * 1000, 'ph_wh_forget_3600']] },
  { from: 'Wh', to: 'J', parts: [['Wh', 'J']], vals: [500, 60, 12, 250, 2.5], lv: 1, traps: (x) => [[x, 'ph_wh_forget_3600']] },
  { from: 'm/s', to: 'km/h', parts: [['m', 'km']], den: [['s', 'h']], vals: [5, 10, 15, 20, 25, 2.5, 7, 12], lv: 2, traps: (x) => [[x / 3.6, 'speed_factor_wrong_way']] },
  { from: 'J', to: 'kWh', parts: [['J', 'kWh']], vals: [7.2e6, 1.8e6, 3.6e7, 9e5, 5.4e6], lv: 2, traps: (x) => [[x / 1000, 'ph_wh_forget_3600']] },
  { from: 'kg/m^3', to: 'kg/L', parts: [['kg', 'kg']], den: [['m^3', 'L']], vals: [920, 1020, 800, 7800, 2700, 1260], lv: 2, traps: () => [] },
  { from: 'kg/L', to: 'kg/m^3', parts: [['kg', 'kg']], den: [['L', 'm^3']], vals: [1.42, 0.92, 1.03, 0.79, 13.6], lv: 2, traps: () => [] },
  { from: 'g/cm^3', to: 'kg/m^3', parts: [['g', 'kg']], den: [['cm^3', 'm^3']], vals: [2.7, 7.8, 0.92, 1.2, 19.3], lv: 3, traps: () => [] },
  { from: 't/h', to: 'kg/s', parts: [['t', 'kg']], den: [['h', 's']], vals: [4, 18, 7.2, 36, 1.5], lv: 3, traps: () => [] },
  { from: 'L/min', to: 'm^3/h', parts: [['L', 'm^3']], den: [['min', 'h']], vals: [25, 12, 50, 200, 8], lv: 3, traps: () => [] },
  { from: 'm^3/h', to: 'L/s', parts: [['m^3', 'L']], den: [['h', 's']], vals: [12, 36, 4.5, 90, 1.8], lv: 3, traps: () => [] },
  { from: 'kJ/h', to: 'W', parts: [['kJ', 'J']], den: [['h', 's']], vals: [1000, 3600, 720, 180, 90], lv: 3, traps: () => [] },
  { from: 'W', to: 'J/min', parts: [['J', 'J']], den: [['s', 'min']], vals: [75, 60, 1500, 2000, 12], lv: 3, traps: () => [] },
  { from: 'mL/s', to: 'L/h', parts: [['mL', 'L']], den: [['s', 'h']], vals: [1.2, 5, 0.5, 25, 2.5], lv: 3, traps: () => [] },
  { from: 'm^3/min', to: 'L/s', parts: [['m^3', 'L']], den: [['min', 's']], vals: [1.5, 4.5, 0.6, 3], lv: 3, traps: () => [] },
  { from: 'L/min', to: 'm^3/s', parts: [['L', 'm^3']], den: [['min', 's']], vals: [500, 120, 30, 600], lv: 3, traps: () => [] },
  { from: 'MW', to: 'J/h', parts: [['MJ', 'J']], den: [['s', 'h']], vals: [2.5, 1.2, 0.5, 3], lv: 3, traps: () => [] },
  { from: 'cm^2', to: 'm^2', parts: [['cm^2', 'm^2']], vals: [450, 45, 1200, 8000, 250], lv: 4, kind: 'area', traps: () => [] },
  { from: 'm^2', to: 'cm^2', parts: [['m^2', 'cm^2']], vals: [0.02, 1.5, 0.35, 2.4], lv: 4, kind: 'area', traps: () => [] },
  { from: 'ha', to: 'm^2', parts: [['ha', 'm^2']], vals: [2.5, 1.2, 0.8, 12, 3.4], lv: 4, traps: (x) => [[x * 100, 'area_factor_10']] },
  { from: 'mm^2', to: 'm^2', parts: [['mm^2', 'm^2']], vals: [3e5, 450, 2500, 8e4], lv: 4, kind: 'area', traps: () => [] },
  { from: 'cm^3', to: 'm^3', parts: [['cm^3', 'm^3']], vals: [1200, 100, 250, 4500], lv: 4, kind: 'volume', traps: () => [] },
  { from: 'mL', to: 'm^3', parts: [['mL', 'm^3']], vals: [15, 250, 500, 1500], lv: 4, traps: (x) => [[x * 1e-3, 'ph_not_si']] },
  { from: 'm^3', to: 'L', parts: [['m^3', 'L']], vals: [3, 0.75, 0.3, 2.5, 0.08], lv: 4, kind: 'volume', traps: () => [] },
  { from: 'L', to: 'm^3', parts: [['L', 'm^3']], vals: [0.75, 8, 2.5, 300, 45], lv: 4, kind: 'volume', traps: () => [] },
];
const factor = (from, to) => parseUnit(from).f / parseUnit(to).f;

// One fraction that equals 1, written so the units cancel: (1000 m / 1 km).
function oneHtml(top, bottom) {
  const k = factor(bottom, top); // 1 bottom = k top
  return k >= 1
    ? `<span class="m-par">(</span>${frac(`${nice(k, 4)} ${unitText(top)}`, `1 ${unitText(bottom)}`)}<span class="m-par">)</span>`
    : `<span class="m-par">(</span>${frac(`1 ${unitText(top)}`, `${nice(1 / k, 4)} ${unitText(bottom)}`)}<span class="m-par">)</span>`;
}

function chainItem(level, rng, c) {
  const x = rng.pick(c.vals);
  const F0 = factor(c.from, c.to);
  const v = fix(x * F0);
  const traps = [[x / F0, 'convert_wrong_direction'], ...c.traps(x)];
  // Only one of the two units converted.
  if (c.den) {
    const fn = factor(c.parts[0][0], c.parts[0][1]);
    const fd = factor(c.den[0][0], c.den[0][1]);
    if (Math.abs(fn - 1) > 1e-9) traps.push([x * fn, 'ph_chain_half']);
    if (Math.abs(fd - 1) > 1e-9) traps.push([x / fd, 'ph_chain_half']);
  }
  if (c.kind) traps.push([x * Math.abs(F0) ** (c.kind === 'area' ? 1 / 2 : 1 / 3), c.kind === 'area' ? 'area_factor_10' : 'volume_factor_10']);
  const ones = [...c.parts.map(([a, b]) => oneHtml(b, a)), ...(c.den || []).map(([a, b]) => oneHtml(a, b))].join(' · ');
  return physItem('ph-conv-chain', level, `${t('Convertis en multipliant par des fractions qui valent 1.')}<br>${num(x)} ${unitText(c.from)} = … ${unitText(c.to)}`, v, c.to, {
    traps,
    solution: [{ html: mathSpan(`${num(x)} ${unitText(c.from)} · ${ones} = <b>${qty(v, c.to, 4)}</b>`), note: t('Les unités se simplifient en haut et en bas.') }],
    key: `${c.from}>${c.to}:${x}`, sec: 40,
  });
}

// Units of other countries, and the energy of a device in kWh: the factor
// is given in the statement.
const OTHER = [
  { p: '{x} miles = … m (1 mile = 1609 m)', vals: [26.2, 3, 13.1, 5, 2], unit: 'm', v: (x) => x * 1609, traps: (x) => [[x / 1609, 'convert_wrong_direction']] },
  { p: '{x} miles par heure = … m/s (1 mile = 1609 m)', vals: [30, 50, 20, 65, 70], unit: 'm/s', v: (x) => (x * 1609) / 3600, traps: (x) => [[x * 1609, 'ph_chain_half'], [x / 3600, 'ph_chain_half']] },
  { p: '{x} chevaux-vapeur = … W (1 cheval-vapeur = 746 W)', vals: [5, 120, 2, 75, 150], unit: 'W', v: (x) => x * 746, traps: (x) => [[x / 746, 'convert_wrong_direction']] },
  { p: '{x} kcal par jour = … W (1 kcal = 4180 J)', vals: [2000, 2500, 1800, 3000], unit: 'W', v: (x) => (x * 4180) / 86400, traps: (x) => [[x * 4180, 'ph_chain_half'], [x / 86400, 'ph_chain_half'], [(x * 4180) / 3600, 'ph_not_si']] },
  { p: '{x} gallons américains = … m³ (1 gallon = 3,785 L)', vals: [3, 10, 50, 12], unit: 'm^3', v: (x) => x * 3.785e-3, traps: (x) => [[x * 3.785, 'ph_not_si'], [x * 3.785e-2, 'volume_factor_10']] },
  { p: '{x} nœuds = … m/s (1 nœud = 1852 m par heure)', vals: [20, 12, 35, 8], unit: 'm/s', v: (x) => (x * 1852) / 3600, traps: (x) => [[x * 1852, 'ph_chain_half']] },
  { p: '{x} miles carrés = … m² (1 mile = 1609 m)', vals: [2, 3, 4, 10], unit: 'm^2', v: (x) => x * 1609 ** 2, traps: (x) => [[x * 1609, 'area_factor_10']] },
  { p: '{x} livres = … kg (1 livre = 0,4536 kg)', vals: [150, 12, 2.2, 45], unit: 'kg', v: (x) => x * 0.4536, traps: (x) => [[x / 0.4536, 'convert_wrong_direction']] },
];
function otherItem(level, rng) {
  if (rng.chance(0.2)) {
    const a = rng.int(5, 6);
    const b = rng.pick([2, 4, 7, 10, 11]);
    const v = a * 0.3048 + b * 0.0254;
    return physItem('ph-conv-chain', level, t('{a} pieds {b} pouces = … m (1 pied = 0,3048 m ; 1 pouce = 0,0254 m)', { a, b }), v, 'm', {
      traps: [[a * 0.3048, 'ph_chain_half'], [(a + b / 10) * 0.3048, 'ph_minutes_decimal']], sig: 3, minSig: 3,
      solution: [{ html: mathSpan(`${a} · 0,3048 m + ${b} · 0,0254 m = <b>${qty(v, 'm', 3)}</b>`), note: t('Chaque unité se convertit séparément, puis on additionne.') }],
      key: `ftin:${a}:${b}`, sec: 50,
    });
  }
  const c = rng.pick(OTHER);
  const x = rng.pick(c.vals);
  const v = c.v(x);
  return physItem('ph-conv-chain', level, t(c.p, { x: num(x) }), v, c.unit, {
    traps: c.traps(x), sig: 3, minSig: 3,
    solution: [{ html: mathSpan(`${num(x)} → <b>${qty(v, c.unit, 3)}</b>`), note: t('On multiplie par le facteur donné, en vérifiant que les unités se simplifient.') }],
    key: `other:${c.p}:${x}`, sec: 50,
  });
}
function deviceItem(level, rng) {
  const P = rng.pick([250, 1500, 60, 2000, 800, 10]);
  const h = rng.pick([2, 3, 0.5, 4, 1.5, 8]);
  const v = (P * h) / 1000;
  return physItem('ph-conv-chain', level, t('Un appareil de {P} W fonctionne pendant {h} h. Quelle énergie consomme-t-il, en kWh ?', { P: num(P), h: num(h) }), v, 'kWh', {
    traps: [[P * h, 'convert_wrong_direction'], [P * h * 3600, 'ph_wh_forget_3600']],
    solution: [{ html: mathSpan(`${num(P)} W · ${num(h)} h = ${num(P * h)} Wh = <b>${qty(v, 'kWh', 4)}</b>`), note: '1 kWh = 1000 Wh' }],
    key: `device:${P}:${h}`, sec: 40,
  });
}

GEN['ph-conv-chain'] = (level, rng) => {
  if (level === 5 && rng.chance(0.75)) return otherItem(level, rng);
  if (level === 4 && rng.chance(0.2)) return deviceItem(level, rng);
  const lv = level === 5 ? rng.int(3, 4) : level;
  const pool = CHAIN.filter((c) => (lv <= 2 ? c.lv <= lv && c.lv >= lv - 1 : c.lv === lv));
  return chainItem(level, rng, rng.pick(pool));
};

// ---------- ph-base-units ----------

const NAMED_BASE = { N: 'kg·m/s^2', J: 'kg·m^2/s^2', W: 'kg·m^2/s^3', Pa: 'kg/(m·s^2)', C: 'A·s', V: 'kg·m^2/(s^3·A)' };
// Typical wrong base forms of each unit.
const BASE_TRAPS = {
  N: [['kg·m/s', 'ph_unit_power_lost'], ['kg·m^2/s^2', 'ph_unit_power_lost']],
  J: [['kg·m/s^2', 'ph_unit_power_lost'], ['kg·m^2/s^3', 'ph_watt_is_joule'], ['kg·m^2/s', 'ph_unit_power_lost']],
  W: [['kg·m^2/s^2', 'ph_watt_is_joule'], ['kg·m/s^3', 'ph_unit_power_lost']],
  Pa: [['kg·m/s^2', 'ph_unit_power_lost']],
  C: [['A/s', 'ph_unit_power_lost']],
  V: [['kg·m^2/s^3', 'ph_watt_is_joule']],
};
// Units written with others, to put in base units: [unit, traps].
const COMPOUND = {
  4: [['N·m', [['kg·m/s^2', 'ph_unit_power_lost']]], ['J/s', [['kg·m^2/s^2', 'ph_watt_is_joule']]], ['W·s', [['kg·m^2/s^3', 'ph_watt_is_joule']]], ['N/kg', [['kg·m/s^2', 'ph_unit_power_lost']]], ['J/kg', [['kg·m^2/s^2', 'ph_unit_power_lost']]], ['N·m/s', [['kg·m^2/s^2', 'ph_watt_is_joule']]]],
  5: [['J/(kg·K)', [['m^2/s^2', 'ph_unit_power_lost']]], ['Pa', BASE_TRAPS.Pa], ['V', BASE_TRAPS.V], ['C', BASE_TRAPS.C], ['kWh', BASE_TRAPS.J], ['W/A', [['kg·m^2/s^3', 'ph_watt_is_joule']]], ['J/C', [['kg·m^2/s^2', 'ph_watt_is_joule']]]],
};
// Teacher's list « simplification d'unités »: an expression and its named unit.
const SIMPLIFY = [['kg·m/s^2', 'N'], ['N·m/s', 'W'], ['J/s', 'W'], ['W·s', 'J'], ['N·m', 'J'], ['V·A', 'W'], ['J/C', 'V'], ['C/s', 'A'], ['W/A', 'V'], ['kg·m^2/s^3', 'W'], ['kg·m^2/s^2', 'J'], ['C·V/s', 'W'], ['N/m^2', 'Pa']];

const baseSolution = (u) => [{ html: mathSpan(`1 ${unitText(u)} = <b>${unitText(baseText(parseUnit(u).d))}</b>`), note: '1 N = 1 kg·m/s² · 1 J = 1 N·m · 1 W = 1 J/s' }];

GEN['ph-base-units'] = (level, rng) => {
  if (level === 1) {
    const u = rng.pick(['N', 'J', 'W']);
    const right = NAMED_BASE[u];
    const options = [{ html: uHtml(right), correct: true }, ...BASE_TRAPS[u].map(([w, rule]) => ({ html: uHtml(w), rule })), { html: uHtml('kg·m/s') }, { html: uHtml('kg/(m·s^2)') }];
    return mcq('ph-base-units', level, t('Comment s\'écrit {u} en unités de base ?', { u: mathSpan(`1 ${u}`) }), options, rng, { solution: baseSolution(u), key: `b1:${u}`, max: 4 });
  }
  if (level === 2) {
    const u = rng.pick(['N', 'J', 'W']);
    return unitItem('ph-base-units', level, t('Écris {u} en unités de base (kg, m, s, K, A).', { u: mathSpan(`1 ${u}`) }), u, BASE_TRAPS[u], { solution: baseSolution(u), key: `b2:${u}` });
  }
  if (level === 3) {
    const [expr, named] = rng.pick(SIMPLIFY);
    const others = rng.shuffle(['N', 'J', 'W', 'V', 'A', 'Pa', 's'].filter((x) => x !== named)).slice(0, 3);
    const rule = (x) => (named === 'W' && x === 'J') || (named === 'J' && x === 'W') ? 'ph_watt_is_joule' : null;
    const options = [{ html: uHtml(named), correct: true }, ...others.map((x) => ({ html: uHtml(x), rule: rule(x) }))];
    return mcq('ph-base-units', level, t('Simplifie cette unité : {u} = ?', { u: uHtml(expr) }), options, rng, {
      solution: [{ html: mathSpan(`${unitText(expr)} = ${unitText(baseText(parseUnit(expr).d))} = <b>${named}</b>`), note: t('Les unités se multiplient, se divisent et se simplifient comme des lettres.') }],
      key: `b3:${expr}`,
    });
  }
  const [u, traps] = rng.pick(COMPOUND[level]);
  return unitItem('ph-base-units', level, t('Écris {u} en unités de base (kg, m, s, K, A).', { u: uHtml(`1 ${u}`) }), u, traps, { solution: baseSolution(u), key: `b${level}:${u}` });
};

// ---------- ph-dimcheck: checking a formula by its units ----------

// [unknown, right expression, wrong ones [expr, rule]]
const DIM_POOL = [
  ['t', 'E/P', [['E P', 'ph_dim_not_checked'], ['P/E', 'ph_iso_flip']]],
  ['P', 'E/t', [['E t', 'ph_power_times'], ['t/E', 'ph_iso_flip']]],
  ['E_p', 'm g h', [['m g', 'ph_dim_not_checked'], ['m h', 'ph_dim_not_checked'], ['m g/h', 'ph_dim_not_checked']]],
  ['v', '√(2 g h)', [['2 g h', 'ph_forget_sqrt'], ['√(2 g/h)', 'ph_dim_not_checked'], ['2 g/h', 'ph_dim_not_checked']]],
  ['ρ', 'm/V', [['V/m', 'ph_density_inverted'], ['m V', 'ph_dim_not_checked']]],
  ['m', 'E/(c ΔT)', [['E c ΔT', 'iso_wrong_inverse'], ['c ΔT/E', 'ph_iso_flip'], ['E/c', 'ph_dim_not_checked']]],
  ['E_c', '1/2 m v^2', [['1/2 m v', 'ph_ec_forget_square'], ['m/v^2', 'ph_dim_not_checked']]],
  ['d', 'v t', [['v/t', 'ph_dim_not_checked'], ['t/v', 'ph_iso_flip']]],
  ['h', 'E/(m g)', [['E m g', 'iso_wrong_inverse'], ['m g/E', 'ph_iso_flip']]],
  ['I', 'P/U', [['P U', 'iso_wrong_inverse'], ['U/P', 'ph_iso_flip']]],
  ['ΔT', 'E/(m c)', [['E m c', 'iso_wrong_inverse'], ['m c/E', 'ph_iso_flip']]],
  ['F', 'E/d', [['E d', 'iso_wrong_inverse'], ['d/E', 'ph_iso_flip']]],
  ['P', 'F v', [['F/v', 'ph_dim_not_checked'], ['F d', 'ph_dim_not_checked']]],
  ['v', '√(2 E_c/m)', [['2 E_c/m', 'ph_forget_sqrt'], ['√(2 m/E_c)', 'ph_iso_flip']]],
  ['t', 'E/(U I)', [['E U I', 'iso_wrong_inverse'], ['U I/E', 'ph_iso_flip']]],
  ['m', 'E/L_f', [['E L_f', 'iso_wrong_inverse'], ['L_f/E', 'ph_iso_flip']]],
  ['h', 'c ΔT/g', [['g/(c ΔT)', 'ph_iso_flip'], ['c ΔT g', 'iso_wrong_inverse']]],
  ['t', 'm g h/P', [['m g h P', 'iso_wrong_inverse'], ['P/(m g h)', 'ph_iso_flip']]],
  ['t', 'm c ΔT/P', [['m c ΔT P', 'iso_wrong_inverse'], ['P/(m c ΔT)', 'ph_iso_flip']]],
  ['h', 'v^2/(2 g)', [['v/(2 g)', 'ph_dim_not_checked'], ['2 g/v^2', 'ph_iso_flip']]],
];
const HARD_DIM = new Set(['m c ΔT/P', 'm g h/P', 'c ΔT/g', 'v^2/(2 g)', '√(2 E_c/m)', 'E/(U I)']);
const symDim = (s) => dimsOf([s])[s];

// The teacher's question « laquelle peut donner … ? », with every wrong
// expression checked to have other units.
function dimChoices(rng, hard) {
  for (;;) {
    const [sym, right, wrongs] = rng.pick(DIM_POOL.filter(([, r]) => HARD_DIM.has(r) === hard || rng.chance(0.2)));
    const target = symDim(sym);
    if (dimEq(dimOfExpr(right), target) && wrongs.every(([w]) => !dimEq(dimOfExpr(w), target))) return { sym, right, wrongs };
  }
}

GEN['ph-dimcheck'] = (level, rng) => {
  if (level === 1 || level === 4) {
    const { sym, right, wrongs } = dimChoices(rng, level === 4);
    const options = [{ html: F(`${sym} = ${right}`), correct: true }, ...wrongs.map(([w, rule]) => ({ html: F(`${sym} = ${w}`), rule }))];
    const prompt = level === 1
      ? t('Par les unités seulement, sans calculer : laquelle de ces formules peut donner {s} ?', { s: F(sym) })
      : t('Un seul de ces résultats d\'élèves peut être juste. Décide par les unités : lequel ?');
    return mcq('ph-dimcheck', level, prompt, options, rng, {
      solution: [{ html: mathSpan(`[${F(right)}] = ${unitText(showDim(dimOfExpr(right)))}`), note: t('Seule cette expression a l\'unité de la grandeur cherchée.') }],
      key: `d${level}:${sym}=${right}`,
    });
  }
  if (level === 2) {
    // What unit does this expression give?
    const [, right, wrongs] = rng.pick(DIM_POOL);
    const expr = rng.chance(0.6) ? right : rng.pick(wrongs)[0];
    const d = dimOfExpr(expr);
    const show = (x) => uHtml(showDim(x));
    const cands = [...DIM_POOL.flatMap(([s, r, ws]) => [symDim(s), dimOfExpr(r), ...ws.map(([w]) => dimOfExpr(w))])]
      .filter((x) => integerDim(x) && !dimEq(x, d));
    const others = [];
    for (const x of rng.shuffle(cands)) if (others.length < 3 && !others.some((o) => dimEq(o, x))) others.push(x);
    const options = [{ html: show(d), correct: true }, ...others.map((x) => ({ html: show(x), rule: 'ph_units_lie' }))];
    return mcq('ph-dimcheck', level, t('Remplace chaque lettre par son unité et simplifie. Quelle unité donne {e} ?', { e: F(expr) }), options, rng, {
      solution: [{ html: mathSpan(`[${F(expr)}] = <b>${unitText(showDim(d))}</b>`), note: t('Une lettre, une unité : on simplifie comme en algèbre.') }],
      key: `d2:${expr}`,
    });
  }
  // Levels 3 and 5: the unit of an expression, typed in base units.
  const pool = DIM_POOL.filter(([, r]) => HARD_DIM.has(r) === (level === 5));
  const [sym, right, wrongs] = rng.pick(pool);
  const expr = level === 5 && rng.chance(0.5) ? rng.pick(wrongs)[0] : right;
  const d = dimOfExpr(expr);
  if (!integerDim(d)) return GEN['ph-dimcheck'](level, rng);
  const unit = baseText(d);
  const traps = dimEq(d, symDim(sym)) ? [] : [[baseText(symDim(sym)), 'ph_units_lie']];
  return unitItem('ph-dimcheck', level, t('Quelle est l\'unité de {e} ? Écris-la en unités de base (kg, m, s, K, A).', { e: F(expr) }), unit, traps, {
    solution: [{ html: mathSpan(`[${F(expr)}] = <b>${unitText(unit)}</b>`), note: dimEq(d, symDim(sym)) ? t('C\'est bien l\'unité de {s} : la formule passe le test.', { s: symText(sym) }) : t('Ce n\'est pas l\'unité de {s} : cette formule est fausse.', { s: symText(sym) }) }],
    key: `d${level}:${expr}`,
  });
};

// ---------- ph-unit-formula: from a unit to a formula ----------

const PER = [
  { p: 'Une grandeur se mesure en joules par seconde. Quelle formule la donne ?', f: 'P = E/t', wrong: [['P = E t', 'ph_power_times'], ['P = t/E', 'ph_per_inverted']] },
  { p: 'Une grandeur se mesure en kilogrammes par mètre cube. Quelle formule la donne ?', f: 'ρ = m/V', wrong: [['ρ = V/m', 'ph_density_inverted'], ['ρ = m V', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en mètres par seconde. Quelle formule la donne ?', f: 'v = d/t', wrong: [['v = d t', 'ph_dim_not_checked'], ['v = t/d', 'ph_per_inverted']] },
  { p: 'Une grandeur se mesure en newtons fois mètres. Quelle formule la donne ?', f: 'E = F d', wrong: [['E = F/d', 'ph_dim_not_checked'], ['E = d/F', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en watts fois secondes. Quelle formule la donne ?', f: 'E = P t', wrong: [['E = P/t', 'ph_dim_not_checked'], ['E = t/P', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en volts fois ampères. Quelle formule la donne ?', f: 'P = U I', wrong: [['P = U/I', 'ph_elec_divide'], ['P = I/U', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en joules par kilogramme. Quelle formule la donne ?', f: 'L_f = E/m', wrong: [['L_f = m/E', 'ph_per_inverted'], ['L_f = E m', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en ampères fois secondes. Quelle formule la donne ?', f: 'Q = I t', wrong: [['Q = I/t', 'ph_dim_not_checked'], ['Q = t/I', 'ph_dim_not_checked']] },
];
// [unit, quantity name (a whole label)]
const NAMES = [
  ['J/s', 'la puissance'], ['kg/m^3', 'la masse volumique'], ['m/s', 'la vitesse'], ['N·m', 'l\'énergie'],
  ['J/(kg·K)', 'la capacité thermique massique'], ['J/kg', 'la chaleur latente'], ['A·s', 'la charge électrique'],
  ['kg·m/s^2', 'la force'], ['V·A', 'la puissance'], ['W·s', 'l\'énergie'], ['N/kg', 'l\'intensité de la pesanteur'],
];
const ALL_NAMES = [...new Set(NAMES.map(([, n]) => n)), 'la durée', 'la masse', 'la température'];
// The formula factory (worksheet « From units to formula »): r is the
// invented quantity.
const FACTORY = [
  { p: 'Un boulanger compte en « kilogrammes de pain par boulanger et par jour ». Avec la masse de pain {m}, le nombre de boulangers {N} et la durée {t}, quelle formule donne cette grandeur {r} ?', vars: ['m', 'N', 't'], f: 'm/(N t)', wrong: [['m N/t', 'ph_per_and_numerator'], ['m t/N', 'ph_per_and_numerator'], ['N t/m', 'ph_per_inverted']] },
  { p: 'Un berger compte en « mètres carrés d\'herbe par mouton et par jour ». Avec l\'aire {A}, le nombre de moutons {N} et la durée {t}, quelle formule donne cette grandeur {r} ?', vars: ['A', 'N', 't'], f: 'A/(N t)', wrong: [['A N/t', 'ph_per_and_numerator'], ['A t/N', 'ph_per_and_numerator'], ['N t/A', 'ph_per_inverted']] },
  { p: 'Un panneau solaire reçoit des « watts par mètre carré ». Avec la puissance {P} et l\'aire {A}, quelle formule donne cette grandeur {r} ?', vars: ['P', 'A'], f: 'P/A', wrong: [['A/P', 'ph_per_inverted'], ['P A', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en « joules par kilogramme et par kelvin ». Avec l\'énergie {E}, la masse {m} et l\'écart de température {T}, quelle formule donne cette grandeur {r} ?', vars: ['E', 'm', 'ΔT'], f: 'E/(m ΔT)', wrong: [['E m/ΔT', 'ph_per_and_numerator'], ['E ΔT/m', 'ph_per_and_numerator'], ['m ΔT/E', 'ph_per_inverted']] },
  { p: 'Une ville grandit de tant de « personnes par année ». Avec le nombre de personnes {N} et la durée {t}, quelle formule donne cette grandeur {r} ?', vars: ['N', 't'], f: 'N/t', wrong: [['t/N', 'ph_per_inverted'], ['N t', 'ph_dim_not_checked']] },
  { p: 'Une voiture fait tant de « kilomètres par litre ». Avec la distance {d} et le volume d\'essence {V}, quelle formule donne cette grandeur {r} ?', vars: ['d', 'V'], f: 'd/V', wrong: [['V/d', 'ph_per_inverted'], ['d V', 'ph_dim_not_checked']] },
  { p: 'Une grandeur se mesure en « mètres par seconde, par seconde ». Avec la vitesse gagnée {v} et la durée {t}, quelle formule donne cette grandeur {r} ?', vars: ['v', 't'], f: 'v/t', wrong: [['t/v', 'ph_per_inverted'], ['v t', 'ph_dim_not_checked']] },
  { p: 'Une pompe débite des « litres par seconde ». Avec le volume {V} et la durée {t}, quelle formule donne cette grandeur {r} ?', vars: ['V', 't'], f: 'V/t', wrong: [['t/V', 'ph_per_inverted'], ['V t', 'ph_dim_not_checked']] },
];
const factoryPrompt = (c) => t(c.p, { ...Object.fromEntries(c.vars.map((s) => [s === 'ΔT' ? 'T' : s, F(s)])), r: F('r') });

GEN['ph-unit-formula'] = (level, rng) => {
  if (level === 1) {
    const c = rng.pick(PER);
    const options = [{ html: F(c.f), correct: true }, ...c.wrong.map(([w, rule]) => ({ html: F(w), rule }))];
    return mcq('ph-unit-formula', level, t(c.p), options, rng, {
      solution: [{ html: F(c.f), note: t('« Par » veut dire « divisé par » ; « fois » veut dire « multiplié par ».') }],
      key: `u1:${c.f}`,
    });
  }
  if (level === 2) {
    const [u, name] = rng.pick(NAMES);
    const others = rng.shuffle(ALL_NAMES.filter((n) => n !== name)).slice(0, 3);
    const options = [{ html: t(name), correct: true }, ...others.map((n) => ({ html: t(n) }))];
    return mcq('ph-unit-formula', level, t('Quelle grandeur se mesure en {u} ?', { u: uHtml(u) }), options, rng, {
      solution: [{ html: mathSpan(`${unitText(u)} = ${unitText(formatDim(parseUnit(u).d))}`), note: t('On reconnaît la grandeur à son unité.') }],
      key: `u2:${u}`,
    });
  }
  const c = rng.pick(FACTORY);
  const symbols = ['r', ...c.vars];
  if (level === 3) {
    const options = [{ html: F(`r = ${c.f}`), correct: true }, ...c.wrong.map(([w, rule]) => ({ html: F(`r = ${w}`), rule }))];
    return mcq('ph-unit-formula', level, factoryPrompt(c), options, rng, {
      solution: [{ html: F(`r = ${c.f}`), note: t('Ce qui suit « par » va sous la barre de fraction, chaque fois.') }],
      key: `u3:${c.f}`,
    });
  }
  if (level === 4) {
    return isoItem('ph-unit-formula', level, `${factoryPrompt(c)} ${t('Écris la formule.')}`, 'r', c.f, symbols, c.wrong, {
      solution: [{ html: F(`r = ${c.f}`), note: t('Ce qui suit « par » va sous la barre de fraction, chaque fois.') }],
      key: `u4:${c.f}`,
    });
  }
  // Level 5: the shepherd, with numbers (and hectares).
  const r = rng.pick([10, 15, 20, 25, 12]);
  const N = rng.pick([20, 30, 40, 50, 60]);
  const A = rng.pick([0.6, 0.9, 1.2, 1.5, 1.8, 2.4]);
  const days = (A * 1e4) / (r * N);
  return physItem('ph-unit-formula', level, t('Un troupeau de {N} moutons broute {r} m² d\'herbe par mouton et par jour. Combien de jours lui faut-il pour brouter un pré de {A} ha (1 ha = 10 000 m²) ?', { N, r: num(r), A: num(A) }), days, 'j', {
    traps: [[A / (r * N), 'ph_not_si'], [(A * 100) / (r * N), 'area_factor_10'], [(r * N) / (A * 1e4), 'iso_wrong_inverse']], suffix: t('jours'),
    solution: [
      { html: F('t = A/(N r)'), note: t('« Par mouton et par jour » : on divise l\'aire par le nombre de moutons et par r.') },
      { html: mathSpan(`${frac(`${num(A * 1e4)} m²`, `${N} · ${num(r)} m²/j`)} = <b>${nice(days, 3)}</b>`), note: t('jours') },
    ],
    key: `u5:${r}:${N}:${A}`, sec: 60,
  });
};

// ---------- ph-isolate ----------

// [formula, unknown, isolated expression, traps [expr, rule]], by level.
const ISO = {
  1: [
    ['E = F d', 'd', 'E/F', [['F/E', 'ph_iso_flip'], ['E F', 'iso_wrong_inverse']]],
    ['E = F d', 'F', 'E/d', [['d/E', 'ph_iso_flip'], ['E d', 'iso_wrong_inverse']]],
    ['P = U I', 'I', 'P/U', [['U/P', 'ph_iso_flip'], ['P U', 'iso_wrong_inverse']]],
    ['P = U I', 'U', 'P/I', [['I/P', 'ph_iso_flip'], ['P I', 'iso_wrong_inverse']]],
    ['E = m L_f', 'm', 'E/L_f', [['L_f/E', 'ph_iso_flip'], ['E L_f', 'iso_wrong_inverse']]],
    ['E = m L_f', 'L_f', 'E/m', [['m/E', 'ph_iso_flip'], ['E m', 'iso_wrong_inverse']]],
    ['P = F v', 'v', 'P/F', [['F/P', 'ph_iso_flip'], ['P F', 'iso_wrong_inverse']]],
    ['E = P t', 't', 'E/P', [['P/E', 'ph_iso_flip'], ['E P', 'iso_wrong_inverse']]],
    ['Q = I t', 'I', 'Q/t', [['t/Q', 'ph_iso_flip'], ['Q t', 'iso_wrong_inverse']]],
  ],
  2: [
    ['P = E/t', 't', 'E/P', [['P/E', 'ph_iso_flip'], ['E P', 'iso_wrong_inverse']]],
    ['P = E/t', 'E', 'P t', [['P/t', 'iso_wrong_inverse'], ['t/P', 'ph_iso_flip']]],
    ['ρ = m/V', 'V', 'm/ρ', [['ρ/m', 'ph_iso_flip'], ['m ρ', 'iso_wrong_inverse']]],
    ['ρ = m/V', 'm', 'ρ V', [['ρ/V', 'iso_wrong_inverse'], ['V/ρ', 'ph_iso_flip']]],
    ['η = E_u/E_f', 'E_f', 'E_u/η', [['η E_u', 'ph_efficiency_inverted'], ['η/E_u', 'ph_iso_flip']]],
    ['η = E_u/E_f', 'E_u', 'η E_f', [['E_f/η', 'ph_efficiency_inverted'], ['η/E_f', 'iso_wrong_inverse']]],
    ['v = d/t', 't', 'd/v', [['v/d', 'ph_iso_flip'], ['d v', 'iso_wrong_inverse']]],
    ['I = Q/t', 't', 'Q/I', [['I/Q', 'ph_iso_flip'], ['Q I', 'iso_wrong_inverse']]],
  ],
  3: [
    ['E = m c ΔT', 'c', 'E/(m ΔT)', [['m ΔT/E', 'ph_iso_flip'], ['E m ΔT', 'iso_wrong_inverse'], ['E/m', 'ph_heat_forget_mass']]],
    ['E = m c ΔT', 'ΔT', 'E/(m c)', [['m c/E', 'ph_iso_flip'], ['E m c', 'iso_wrong_inverse']]],
    ['E = m c ΔT', 'm', 'E/(c ΔT)', [['c ΔT/E', 'ph_iso_flip'], ['E c ΔT', 'iso_wrong_inverse']]],
    ['E_p = m g h', 'h', 'E_p/(m g)', [['m g/E_p', 'ph_iso_flip'], ['E_p m g', 'iso_wrong_inverse'], ['E_p/m g', 'iso_wrong_inverse']]],
    ['E_p = m g h', 'm', 'E_p/(g h)', [['g h/E_p', 'ph_iso_flip'], ['E_p g h', 'iso_wrong_inverse'], ['E_p/g h', 'iso_wrong_inverse']]],
    ['E = U I t', 't', 'E/(U I)', [['U I/E', 'ph_iso_flip'], ['E U I', 'iso_wrong_inverse']]],
    ['E = U I t', 'I', 'E/(U t)', [['U t/E', 'ph_iso_flip'], ['E U t', 'iso_wrong_inverse']]],
  ],
  4: [
    ['E_c = 1/2 m v^2', 'v', '√(2 E_c/m)', [['2 E_c/m', 'ph_forget_sqrt'], ['√(E_c/(2 m))', 'ph_half_inverted'], ['√(2 m/E_c)', 'ph_iso_flip']]],
    ['E_c = 1/2 m v^2', 'm', '2 E_c/v^2', [['E_c/(2 v^2)', 'ph_half_inverted'], ['v^2/(2 E_c)', 'ph_iso_flip']]],
    ['m g h = 1/2 m v^2', 'v', '√(2 g h)', [['2 g h', 'ph_forget_sqrt'], ['√(g h/2)', 'ph_half_inverted']]],
    ['m g h = 1/2 m v^2', 'h', 'v^2/(2 g)', [['2 v^2/g', 'ph_half_inverted'], ['2 g/v^2', 'ph_iso_flip']]],
    ['E_p = m g h', 'g', 'E_p/(m h)', [['m h/E_p', 'ph_iso_flip'], ['E_p m h', 'iso_wrong_inverse']]],
    ['A = π r^2', 'r', '√(A/π)', [['A/π', 'ph_forget_sqrt'], ['√(π/A)', 'ph_iso_flip']]],
    ['V = A h', 'h', 'V/A', [['A/V', 'ph_iso_flip'], ['V A', 'iso_wrong_inverse']]],
  ],
};
// Two formulas chained by a bridge (diagnostic D2, step 3).
const ISO_CHAIN = [
  { fs: ['P = E/t', 'E = m g h'], v: 't', target: 'm g h/P', traps: [['P/(m g h)', 'ph_iso_flip'], ['m g h P', 'iso_wrong_inverse']] },
  { fs: ['E = P t', 'E = m c ΔT'], v: 't', target: 'm c ΔT/P', traps: [['P/(m c ΔT)', 'ph_iso_flip'], ['m c ΔT P', 'iso_wrong_inverse']] },
  { fs: ['E = m g h', 'E = m c ΔT'], v: 'h', target: 'c ΔT/g', traps: [['g/(c ΔT)', 'ph_iso_flip'], ['c ΔT g', 'iso_wrong_inverse']] },
  { fs: ['E = U I t', 'E = m c ΔT'], v: 't', target: 'm c ΔT/(U I)', traps: [['U I/(m c ΔT)', 'ph_iso_flip'], ['m c ΔT U I', 'iso_wrong_inverse']] },
  { fs: ['P = E/t', 'E = 1/2 m v^2'], v: 'v', target: '√(2 P t/m)', traps: [['2 P t/m', 'ph_forget_sqrt'], ['√(P t/(2 m))', 'ph_half_inverted']] },
  { fs: ['E = m L_f', 'E = P t'], v: 't', target: 'm L_f/P', traps: [['P/(m L_f)', 'ph_iso_flip'], ['m L_f P', 'iso_wrong_inverse']] },
  { fs: ['ρ = m/V', 'E = m g h'], v: 'h', target: 'E/(ρ V g)', traps: [['ρ V g/E', 'ph_iso_flip'], ['E ρ V g', 'iso_wrong_inverse']] },
];
const symsOfExpr = (src) => [...new Set(src.match(/E_[a-z]+|L_f|ΔT|[A-Za-zρη]/g))];

GEN['ph-isolate'] = (level, rng) => {
  if (level === 5) {
    const c = rng.pick(ISO_CHAIN);
    const symbols = [c.v, ...symsOfExpr(c.target).filter((s) => s !== c.v)];
    const list = symsOfExpr(c.target).map((s) => F(s)).join(', ');
    return isoItem('ph-isolate', level, t('On sait que {f1} et que {f2}. Exprime {v} en fonction de {list}. Aucun nombre : seulement des lettres.', { f1: F(c.fs[0]), f2: F(c.fs[1]), v: F(c.v), list }), c.v, c.target, symbols, c.traps, {
      solution: [{ html: F(`${c.fs[0]}`), note: '' }, { html: F(`${c.fs[1]}`), note: t('Le pont est la grandeur commune aux deux formules : on la remplace.') }, { html: F(`${c.v} = ${c.target}`), note: '' }],
      key: `i5:${c.fs.join(',')}`, sec: 90,
    });
  }
  const [f, v, target, traps] = rng.pick(ISO[level]);
  const symbols = [v, ...symsOfExpr(f).filter((s) => s !== v)];
  return isoItem('ph-isolate', level, t('Isole {v} dans {f}.', { v: F(v), f: F(f) }), v, target, symbols, traps, {
    solution: [{ html: F(f), note: '' }, { html: F(`${v} = ${target}`), note: t('On défait les opérations autour de la lettre, dans l\'ordre inverse, des deux côtés.') }],
    key: `i${level}:${f}:${v}`, sec: 30 + 10 * level,
  });
};

// ---------- ph-estimate: orders of magnitude ----------

const round1 = (v) => fix(Number(v.toPrecision(1)));
const round2 = (v) => fix(Number(v.toPrecision(2)));
// An estimate that does not depend on how brutally one rounds.
const steady = (exact, factors, combine) => {
  const e = round1(exact);
  return round1(combine(factors.map(round1))) === e && round1(combine(factors.map(round2))) === e;
};
const powHtml = (v) => (Math.abs(v) >= 1e4 || Math.abs(v) < 1e-2 ? sci(v, 1) : num(v));

// L1: the order of magnitude of a product, among powers of 10.
function orderItem(level, rng) {
  for (;;) {
    const a = rng.int(12, 95) * 10 ** rng.int(0, 2);
    const b = rng.chance(0.5) ? rng.int(12, 95) * 10 ** rng.int(0, 2) : rng.int(2, 9) * 10 ** rng.int(1, 3);
    const exact = a * b;
    if (!steady(exact, [a, b], ([x, y]) => x * y)) continue;
    const e = round1(exact);
    const options = [{ html: powHtml(e), correct: true }, ...[-2, -1, 1, 2].map((k) => ({ html: powHtml(fix(e * 10 ** k)), rule: 'ph_estimate_power10' }))];
    const keep = [options[0], ...rng.shuffle(options.slice(1)).slice(0, 3)];
    return mcq('ph-estimate', level, t('Sans calculatrice : {a} × {b} ≈ ?', { a: num(a), b: num(b) }), keep, rng, {
      solution: [{ html: mathSpan(`${num(a)} × ${num(b)} ≈ ${num(round1(a))} × ${num(round1(b))} ≈ <b>${powHtml(e)}</b>`), note: t('On arrondit chaque nombre à un chiffre, et on compte les zéros à part.') }],
      key: `e1:${a}:${b}`,
    });
  }
}

// L2: a plausible value of an everyday quantity.
const PLAUSIBLE = [
  ['Quelle valeur est plausible pour la masse d\'un élève de 14 ans ?', 50, 'kg'],
  ['Quelle valeur est plausible pour la vitesse d\'un cycliste en ville ?', 5, 'm/s'],
  ['Quelle valeur est plausible pour la puissance d\'une bouilloire ?', 2000, 'W'],
  ['Quelle valeur est plausible pour la hauteur d\'un étage ?', 3, 'm'],
  ['Quelle valeur est plausible pour le poids d\'un cageot de pommes ?', 150, 'N'],
  ['Quelle valeur est plausible pour l\'énergie qu\'il faut pour monter un sac de 25 kg d\'un étage ?', 750, 'J'],
  ['Quelle valeur est plausible pour la masse d\'un litre d\'eau ?', 1, 'kg'],
  ['Quelle valeur est plausible pour la puissance d\'une ampoule LED ?', 8, 'W'],
  ['Quelle valeur est plausible pour la durée d\'une leçon ?', 2700, 's'],
  ['Quelle valeur est plausible pour l\'énergie pour chauffer un litre d\'eau de 20 à 100 °C ?', 3e5, 'J'],
  ['Quelle valeur est plausible pour la vitesse d\'une voiture sur l\'autoroute ?', 33, 'm/s'],
];
function plausibleItem(level, rng) {
  const [p, v, unit] = rng.pick(PLAUSIBLE);
  const ks = rng.shuffle([-3, -2, -1, 1, 2, 3]).slice(0, 3);
  const show = (x) => `${powHtml(x)} ${unitText(unit)}`;
  const options = [{ html: show(v), correct: true }, ...ks.map((k) => ({ html: show(fix(v * 10 ** k)), rule: 'ph_estimate_power10' }))];
  return mcq('ph-estimate', level, t(p), options, rng, {
    solution: [{ html: `<b>${show(v)}</b>`, note: t('Une valeur fausse l\'est souvent d\'un facteur 10, 100 ou 1000 : c\'est ce que l\'ordre de grandeur attrape.') }],
    key: `e2:${p}`,
  });
}

// L3: a computation with 2 or 3 numbers, typed with one significant figure.
function mentalItem(level, rng) {
  for (;;) {
    const shape = rng.int(0, 2);
    const n = () => rng.int(12, 95) * 10 ** rng.int(-1, 2);
    let f; let combine; let text;
    if (shape === 0) { f = [n(), n()]; combine = ([a, b]) => a * b; text = `${num(f[0])} × ${num(f[1])}`; }
    if (shape === 1) { f = [rng.pick([4200, 3500, 2000, 330, 1500]), rng.pick([0.5, 1.5, 0.3, 2, 0.8]), rng.int(15, 85)]; combine = ([a, b, c]) => a * b * c; text = f.map(num).join(' × '); }
    if (shape === 2) { f = [rng.int(12, 95) * 10 ** rng.int(3, 5), rng.int(12, 95) * 10 ** rng.int(0, 2)]; combine = ([a, b]) => a / b; text = `${num(f[0])} ÷ ${num(f[1])}`; }
    const exact = combine(f);
    if (exact < 0.1 || exact > 1e9 || !steady(exact, f, combine)) continue;
    const e = round1(exact);
    return physItem('ph-estimate', level, `${t('Sans calculatrice, donne un ordre de grandeur avec un seul chiffre significatif.')}<br>${text} ≈ …`, exact, '1', {
      expected: typedRound(exact), minSig: 1, factor: 3, expectedHtml: powHtml(round1(exact)),
      traps: [[exact * 10, 'ph_estimate_power10'], [exact / 10, 'ph_estimate_power10']],
      solution: [{ html: mathSpan(`${f.map((x) => num(round1(x))).join(shape === 2 ? ' ÷ ' : ' × ')} ≈ <b>${powHtml(e)}</b>`), note: t('On arrondit chaque nombre à un chiffre, et on compte les zéros à part.') }],
      key: `e3:${text}`, sec: 40,
    });
  }
}

// L4: an estimate in a physics situation, with a unit to convert.
function situationEstimate(level, rng) {
  for (;;) {
    const kind = rng.int(0, 3);
    let exact; let unit; let prompt; let traps; let factors; let combine; let key;
    if (kind === 0) {
      const P = rng.pick([1500, 2000, 2500, 1200, 800]);
      const m = rng.pick([3, 4, 5, 7, 12, 20]);
      factors = [P, m * 60]; combine = ([a, b]) => (a * b) / 1000;
      exact = combine(factors); unit = 'kJ'; key = `P${P}:${m}`;
      prompt = t('Sans calculatrice : une plaque de {P} W fonctionne {t} min. Cela fait environ combien de kilojoules ? Un seul chiffre significatif.', { P: num(P), t: m });
      traps = [[(P * m) / 1000, 'ph_not_si'], [exact * 10, 'ph_estimate_power10'], [exact / 10, 'ph_estimate_power10']];
    } else if (kind === 1) {
      const mL = rng.pick([300, 500, 1500, 2000, 250, 750]);
      const dT = rng.int(15, 80);
      factors = [mL / 1000, 4200, dT]; combine = ([a, b, c]) => a * b * c;
      exact = combine(factors); unit = 'J'; key = `W${mL}:${dT}`;
      prompt = t('Sans calculatrice : on chauffe {V} mL d\'eau de {dT} K (c = 4200 J/(kg·K)). Il faut environ combien de joules ? Un seul chiffre significatif.', { V: num(mL), dT });
      traps = [[mL * 4200 * dT, 'ph_gram_as_kg'], [exact * 10, 'ph_estimate_power10'], [exact / 10, 'ph_estimate_power10']];
    } else if (kind === 2) {
      const m = rng.pick([25, 12, 50, 80, 4, 200]);
      const cm = rng.pick([180, 140, 350, 75, 260]);
      factors = [m, 10, cm / 100]; combine = ([a, b, c]) => a * b * c;
      exact = combine(factors); unit = 'J'; key = `H${m}:${cm}`;
      prompt = t('Sans calculatrice : on monte {m} kg de {h} cm (g = 10 N/kg). Quelle énergie potentielle, environ ? Un seul chiffre significatif.', { m: num(m), h: num(cm) });
      traps = [[m * 10 * cm, 'ph_not_si'], [exact * 10, 'ph_estimate_power10'], [exact / 10, 'ph_estimate_power10']];
    } else {
      const kJ = rng.pick([180, 600, 90, 250, 1200]);
      const m = rng.pick([2, 3, 5, 10, 15]);
      factors = [kJ * 1000, m * 60]; combine = ([a, b]) => a / b;
      exact = combine(factors); unit = 'W'; key = `Q${kJ}:${m}`;
      prompt = t('Sans calculatrice : un moteur fournit {E} kJ en {t} min. Quelle est sa puissance, environ ? Un seul chiffre significatif.', { E: num(kJ), t: m });
      traps = [[(kJ * 1000) / m, 'ph_not_si'], [exact * 10, 'ph_estimate_power10'], [exact / 10, 'ph_estimate_power10']];
    }
    if (!steady(exact, factors, combine)) continue;
    return physItem('ph-estimate', level, prompt, exact, unit, {
      expected: typedRound(exact), minSig: 1, factor: 3, traps, expectedHtml: `${powHtml(round1(exact))} ${unitText(unit)}`,
      solution: [{ html: mathSpan(`${factors.map((x) => num(round1(x))).join(kind === 3 ? ' ÷ ' : ' × ')}${kind === 0 ? ' ÷ 1000' : ''} ≈ <b>${powHtml(round1(exact))} ${unitText(unit)}</b>`), note: t('D\'abord en SI, puis on arrondit brutalement et on calcule de tête.') }],
      key: `e4:${key}`, sec: 50,
    });
  }
}

// L5: a student's result is off by a factor: which mistake made it?
const MISTAKES = {
  min: ['Il a laissé les minutes au lieu de les convertir en secondes.', 1 / 60],
  g: ['Il a laissé les grammes au lieu des kilogrammes.', 1000],
  cm: ['Il a laissé les centimètres au lieu des mètres.', 100],
  half: ['Il a oublié le ½ de l\'énergie cinétique.', 2],
  kmh: ['Il a laissé la vitesse en km/h.', 3.6 ** 2],
  h: ['Il a laissé des heures au lieu de secondes.', 1 / 3600],
};
const DIAG = [
  { p: 'Un élève calcule l\'énergie fournie par une plaque de {P} W qui fonctionne {t} min. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'min', draw: (rng) => { const P = rng.pick([1500, 2000, 800]); const m = rng.pick([3, 5, 12]); return { vars: { P: num(P), t: m }, exact: P * m * 60, unit: 'J' }; } },
  { p: 'Un élève calcule l\'énergie potentielle d\'un sac de {m} g monté de {h} m. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'g', draw: (rng) => { const m = rng.pick([450, 800, 250]); const h = rng.pick([1.8, 3, 2.5]); return { vars: { m, h: num(h) }, exact: (m / 1000) * 10 * h, unit: 'J' }; } },
  { p: 'Un élève calcule l\'énergie potentielle d\'un carton de {m} kg monté de {h} cm. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'cm', draw: (rng) => { const m = rng.pick([12, 25, 8]); const h = rng.pick([180, 250, 90]); return { vars: { m, h }, exact: m * 10 * (h / 100), unit: 'J' }; } },
  { p: 'Un élève calcule l\'énergie cinétique d\'un chariot de {m} kg qui roule à {v} m/s. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'half', draw: (rng) => { const m = rng.pick([12, 40, 80]); const v = rng.pick([3, 5, 4]); return { vars: { m, v }, exact: 0.5 * m * v * v, unit: 'J' }; } },
  { p: 'Un élève calcule l\'énergie cinétique d\'un vélo de {m} kg qui roule à {v} km/h. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'kmh', draw: (rng) => { const m = rng.pick([90, 100, 75]); const v = rng.pick([18, 36, 27]); return { vars: { m, v }, exact: 0.5 * m * (v / 3.6) ** 2, unit: 'J' }; } },
  { p: 'Un élève calcule l\'énergie d\'un radiateur de {P} W qui fonctionne {t} h, en joules. Il trouve {x}, mais ton approximation donne environ {y}. Quelle erreur a-t-il probablement faite ?', mistake: 'h', draw: (rng) => { const P = rng.pick([1000, 2000, 500]); const h = rng.pick([2, 3, 5]); return { vars: { P: num(P), t: h }, exact: P * h * 3600, unit: 'J' }; } },
];
function diagnoseItem(level, rng) {
  const d = rng.pick(DIAG);
  const { vars, exact, unit } = d.draw(rng);
  const [text, k] = MISTAKES[d.mistake];
  const wrong = exact * k;
  const others = rng.shuffle(Object.entries(MISTAKES).filter(([id, [, f]]) => id !== d.mistake && Math.abs(Math.log10(f / k)) > 0.2)).slice(0, 3);
  const options = [{ html: t(text), correct: true }, ...others.map(([, [x]]) => ({ html: t(x) }))];
  return mcq('ph-estimate', level, t(d.p, { ...vars, x: qty(wrong, unit, 3), y: `${powHtml(round1(exact))} ${unitText(unit)}` }), options, rng, {
    solution: [{ html: mathSpan(`${frac(nice(wrong, 3), powHtml(round1(exact)))} ≈ ${nice(k >= 1 ? k : 1 / k, 2)}`), note: t('Le rapport entre les deux résultats trahit l\'erreur : 60 pour des minutes, 1000 pour des grammes, 100 pour des centimètres.') }],
    key: `e5:${d.mistake}:${JSON.stringify(vars)}`, sec: 45,
  });
}

GEN['ph-estimate'] = (level, rng) => {
  if (level === 1) return orderItem(level, rng);
  if (level === 2) return rng.chance(0.6) ? plausibleItem(level, rng) : orderItem(level, rng);
  if (level === 3) return mentalItem(level, rng);
  if (level === 4) return rng.chance(0.75) ? situationEstimate(level, rng) : mentalItem(level, rng);
  return rng.chance(0.6) ? diagnoseItem(level, rng) : situationEstimate(level, rng);
};

