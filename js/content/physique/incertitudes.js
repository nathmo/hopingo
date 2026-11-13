// Unit « Fourchettes et pire cas » (docs/plan-physique.md §3 D): reading a
// measure ± its uncertainty, which ends give the smallest and the largest
// result (under a fraction bar, the other way round), computing the range,
// how many digits it allows, concluding from a range, relative uncertainty.
// Styles of the worksheets « la règle du pire cas », « le bloc de beurre »,
// « quand on ne peut pas conclure » and « Ranges », with new numbers.

import { t } from '../../i18n.js';
import { F, num, sci, nice, fix, unitText } from './format.js';
import { physItem, mcq, mathSpan, frac } from './outils.js';
import { answerItem } from '../items.js';

export const GEN = {};

// ---------- numbers with their decimals ----------

const decimalsOf = (v) => (String(fix(v)).split('.')[1] || '').length;
// A value written with `dec` decimals: 12,0 · 1 250.
const fmt = (v, dec = 0) => (dec <= 0 ? num(Math.round(fix(v))) : fix(v).toFixed(dec).replace('.', ','));
const withUnit = (s, unit) => (unit === '1' ? s : `${s} ${unitText(unit)}`);
// « d = 400 ± 20 m »
const meas = (m) => `${F(m.sym)} = ${fmt(m.c, m.dec)} ± ${fmt(m.u, m.dec)} ${unitText(m.unit)}`;
const q = (v, unit, dec) => withUnit(fmt(v, dec), unit);

// Measures of the class, with a central value and an uncertainty.
const MEASURES = [
  { sym: 'd', unit: 'm', c: (r) => r.int(30, 90) * 10, u: [5, 10, 20, 25] },
  { sym: 'm', unit: 'g', c: (r) => r.int(120, 480), u: [1, 2, 5] },
  { sym: 't', unit: 's', c: (r) => r.int(40, 150), u: [1, 2, 4, 5] },
  { sym: 'V', unit: 'mL', c: (r) => r.int(15, 90) * 10, u: [5, 10, 20] },
  { sym: 'ρ', unit: 'kg/L', c: (r) => r.int(85, 125) / 100, u: [0.02, 0.05, 0.08] },
  { sym: 'h', unit: 'm', c: (r) => r.int(15, 60) / 10, u: [0.1, 0.2, 0.05] },
  { sym: 'v', unit: 'm/s', c: (r) => r.int(30, 90) / 10, u: [0.2, 0.3, 0.5] },
  { sym: 'P', unit: 'W', c: (r) => r.int(4, 30) * 100, u: [50, 100, 200] },
  { sym: 'F', unit: 'N', c: (r) => r.int(15, 60) * 100, u: [100, 200, 500] },
];
function drawMeasure(rng, spec = rng.pick(MEASURES)) {
  const c = fix(spec.c(rng));
  const u = rng.pick(spec.u);
  return { sym: spec.sym, unit: spec.unit, c, u, dec: Math.max(decimalsOf(c), decimalsOf(u)) };
}

// ---------- rg-read ----------

// Two measures of the same thing: do their ranges overlap?
const SAME = [
  { p: 'Deux élèves mesurent la même table : {a} et {b}. Leurs mesures sont-elles compatibles ?', unit: 'm', c: (r) => r.int(120, 190) / 100, u: [0.01, 0.02] },
  { p: 'Deux groupes mesurent la masse du même caillou : {a} et {b}. Leurs mesures sont-elles compatibles ?', unit: 'g', c: (r) => r.int(80, 300), u: [1, 2] },
  { p: 'Deux chronomètres mesurent la même course : {a} et {b}. Leurs mesures sont-elles compatibles ?', unit: 's', c: (r) => r.int(100, 150) / 10, u: [0.1, 0.2] },
];
function compatibleItem(level, rng) {
  const s = rng.pick(SAME);
  const c1 = fix(s.c(rng));
  const u = rng.pick(s.u);
  const overlap = rng.chance(0.5);
  // Gap between the centres, in units of u: < 1,6 overlap, > 2,4 apart.
  const k = overlap ? rng.pick([0.5, 1, 1.5]) : rng.pick([2.5, 3, 4]);
  const c2 = fix(c1 + k * u);
  const dec = Math.max(decimalsOf(c1), decimalsOf(u), decimalsOf(c2));
  const a = `${fmt(c1, dec)} ± ${fmt(u, dec)} ${unitText(s.unit)}`;
  const b = `${fmt(c2, dec)} ± ${fmt(u, dec)} ${unitText(s.unit)}`;
  const options = [
    { html: t('Oui : les deux fourchettes se chevauchent.'), correct: overlap },
    { html: t('Non : les deux fourchettes ne se touchent pas.'), correct: !overlap },
    { html: t('Non, car les deux valeurs du milieu sont différentes.'), rule: 'rg_conclude_middle' },
  ];
  return mcq('rg-read', level, t(s.p, { a, b }), options, rng, {
    solution: [{ html: mathSpan(`[${fmt(c1 - u, dec)} ; ${fmt(c1 + u, dec)}] · [${fmt(c2 - u, dec)} ; ${fmt(c2 + u, dec)}]`), note: overlap ? t('Les fourchettes ont une partie commune : les deux mesures peuvent être justes.') : t('Les fourchettes n\'ont rien en commun : au moins une des mesures est fausse.') }],
    key: `r5:${s.unit}:${c1}:${c2}:${u}`, sec: 30,
  });
}

GEN['rg-read'] = (level, rng) => {
  if (level === 1) {
    const m = drawMeasure(rng);
    const low = rng.chance(0.5);
    const v = fix(low ? m.c - m.u : m.c + m.u);
    return physItem('rg-read', level, low ? t('{data}. Quelle est la plus petite valeur possible ?', { data: meas(m) }) : t('{data}. Quelle est la plus grande valeur possible ?', { data: meas(m) }), v, m.unit, {
      traps: [[m.c, 'rg_half_width'], [low ? m.c - 2 * m.u : m.c + 2 * m.u, 'rg_full_width']],
      expected: fmt(v, m.dec).replace(/\s/g, ''), minSig: 1,
      solution: [{ html: mathSpan(`${fmt(m.c, m.dec)} ${low ? '−' : '+'} ${fmt(m.u, m.dec)} = <b>${q(v, m.unit, m.dec)}</b>`), note: t('« ± » veut dire : autant de moins, et autant de plus.') }],
      key: `r1:${m.sym}:${m.c}:${m.u}:${low}`, sec: 20,
    });
  }
  if (level === 2) {
    const m = drawMeasure(rng);
    const iv = (a, b) => t('entre {a} et {b}', { a: q(a, m.unit, m.dec), b: q(b, m.unit, m.dec) });
    const options = [
      { html: iv(m.c - m.u, m.c + m.u), correct: true },
      { html: iv(m.c, m.c + m.u), rule: 'rg_half_width' },
      { html: iv(m.c - m.u, m.c), rule: 'rg_half_width' },
      { html: iv(m.c - 2 * m.u, m.c + 2 * m.u), rule: 'rg_full_width' },
    ];
    return mcq('rg-read', level, t('{data}. Entre quelles valeurs se trouve la vraie valeur ?', { data: meas(m) }), options, rng, {
      solution: [{ html: mathSpan(`${fmt(m.c, m.dec)} − ${fmt(m.u, m.dec)} = ${fmt(m.c - m.u, m.dec)} · ${fmt(m.c, m.dec)} + ${fmt(m.u, m.dec)} = ${fmt(m.c + m.u, m.dec)}`), note: t('« ± » veut dire : autant de moins, et autant de plus.') }],
      key: `r2:${m.sym}:${m.c}:${m.u}`,
    });
  }
  if (level === 3) {
    // From a range to « valeur ± incertitude ».
    const m = drawMeasure(rng);
    const lo = fix(m.c - m.u);
    const hi = fix(m.c + m.u);
    const range = `${q(lo, m.unit, m.dec)} ≤ ${F(m.sym)} ≤ ${q(hi, m.unit, m.dec)}`;
    if (rng.chance(0.6)) {
      return physItem('rg-read', level, t('On sait que {range}. Écris-le sous la forme « valeur ± incertitude » : quelle est l\'incertitude ?', { range }), m.u, m.unit, {
        traps: [[hi - lo, 'rg_full_width']], expected: fmt(m.u, m.dec).replace(/\s/g, ''), minSig: 1,
        solution: [{ html: mathSpan(`${frac(`${fmt(hi, m.dec)} − ${fmt(lo, m.dec)}`, '2')} = <b>${q(m.u, m.unit, m.dec)}</b>`), note: t('L\'incertitude est la moitié de la largeur de la fourchette.') }],
        key: `r3u:${m.sym}:${m.c}:${m.u}`, sec: 30,
      });
    }
    return physItem('rg-read', level, t('On sait que {range}. Écris-le sous la forme « valeur ± incertitude » : quelle est la valeur du milieu ?', { range }), m.c, m.unit, {
      traps: [[hi - lo, 'rg_full_width']], expected: fmt(m.c, m.dec).replace(/\s/g, ''), minSig: 1,
      solution: [{ html: mathSpan(`${frac(`${fmt(lo, m.dec)} + ${fmt(hi, m.dec)}`, '2')} = <b>${q(m.c, m.unit, m.dec)}</b>`), note: t('La valeur du milieu est la moyenne des deux bornes.') }],
      key: `r3c:${m.sym}:${m.c}:${m.u}`, sec: 30,
    });
  }
  if (level === 4) {
    if (rng.chance(0.5)) {
      // In minutes, asked in seconds.
      const c = rng.int(12, 60);
      const u = rng.pick([1, 2, 3]);
      const low = rng.chance(0.5);
      const v = (low ? c - u : c + u) * 60;
      return physItem('rg-read', level, low ? t('Une course dure {t} = {c} ± {u} min. Quelle est la plus petite durée possible, en secondes ?', { t: F('t'), c, u }) : t('Une course dure {t} = {c} ± {u} min. Quelle est la plus grande durée possible, en secondes ?', { t: F('t'), c, u }), v, 's', {
        traps: [[low ? c - u : c + u, 'ph_not_si'], [c * 60, 'rg_half_width'], [low ? c * 60 - u : c * 60 + u, 'ph_not_si']],
        solution: [{ html: mathSpan(`(${c} ${low ? '−' : '+'} ${u}) min = ${low ? c - u : c + u} · 60 s = <b>${num(v)} s</b>`), note: '' }],
        key: `r4t:${c}:${u}:${low}`, sec: 30,
      });
    }
    // An uncertainty in %.
    const c = rng.pick([250, 400, 500, 1200, 800, 150]);
    const p = rng.pick([1, 2, 4, 5]);
    const low = rng.chance(0.5);
    const v = c * (1 + (low ? -p : p) / 100);
    const unit = rng.pick(['g', 'm', 'W']);
    const sym = { g: 'm', m: 'd', W: 'P' }[unit];
    return physItem('rg-read', level, low ? t('{data} à {p} % près. Quelle est la plus petite valeur possible ?', { data: `${F(sym)} = ${num(c)} ${unit}`, p }) : t('{data} à {p} % près. Quelle est la plus grande valeur possible ?', { data: `${F(sym)} = ${num(c)} ${unit}`, p }), v, unit, {
      traps: [[low ? c - p : c + p, 'percent_as_amount'], [c, 'rg_half_width'], [low ? c - c * p : c + c * p, 'rg_percent_fraction']],
      solution: [{ html: mathSpan(`${p} % · ${num(c)} = ${nice((c * p) / 100)} · ${num(c)} ${low ? '−' : '+'} ${nice((c * p) / 100)} = <b>${nice(v)} ${unit}</b>`), note: t('D\'abord l\'incertitude dans l\'unité de la mesure, puis la borne.') }],
      key: `r4p:${c}:${p}:${unit}:${low}`, sec: 35,
    });
  }
  return compatibleItem(level, rng);
};

// ---------- rg-ends: which ends? ----------

// vars: +1 the result grows with it, −1 it is under the fraction bar.
const ENDS = [
  { res: 'v', f: 'v = d/t', vars: { d: 1, t: -1 }, lv: 1 },
  { res: 'F', f: 'F = P/v', vars: { P: 1, v: -1 }, lv: 1 },
  { res: 'ρ', f: 'ρ = m/V', vars: { m: 1, V: -1 }, lv: 1 },
  { res: 'P', f: 'P = E/t', vars: { E: 1, t: -1 }, lv: 1 },
  { res: 'I', f: 'I = P/U', vars: { P: 1, U: -1 }, lv: 1 },
  { res: 't', f: 't = E/P', vars: { E: 1, P: -1 }, lv: 1 },
  { res: 'E', f: 'E = F d', vars: { F: 1, d: 1 }, lv: 2 },
  { res: 'E', f: 'E = m g h', vars: { m: 1, h: 1 }, lv: 2 },
  { res: 'h', f: 'h = E/(m g)', vars: { E: 1, m: -1 }, lv: 2 },
  { res: 'c', f: 'c = E/(m ΔT)', vars: { E: 1, m: -1, ΔT: -1 }, lv: 3 },
  { res: 't', f: 't = m c ΔT/P', vars: { m: 1, ΔT: 1, P: -1 }, lv: 3 },
  { res: 'ΔT', f: 'ΔT = E/(m c)', vars: { E: 1, m: -1 }, lv: 3 },
  { res: 'E', f: 'E = 1/2 m v^2', vars: { m: 1, v: 1 }, lv: 4 },
  { res: 'ρ', f: 'ρ = m/(ℓ d h)', vars: { m: 1, ℓ: -1, d: -1, h: -1 }, lv: 4 },
];
const endsHtml = (vars, ends) => Object.keys(vars).map((s, i) => F(`${s}_${ends[i]}`)).join(', ');

GEN['rg-ends'] = (level, rng) => {
  if (level === 5) {
    // Typed: the value of the variable under the bar.
    const pool = [
      { f: 'v = d/t', a: { sym: 'd', unit: 'm', c: (r) => r.int(30, 90) * 10, u: [10, 20] }, b: { sym: 't', unit: 's', c: (r) => r.int(60, 150), u: [2, 4, 5] } },
      { f: 'F = P/v', a: { sym: 'P', unit: 'W', c: (r) => r.int(4, 9) * 100, u: [40, 60] }, b: { sym: 'v', unit: 'm/s', c: (r) => r.int(15, 30) / 10, u: [0.1, 0.2] } },
      { f: 'ρ = m/V', a: { sym: 'm', unit: 'g', c: (r) => r.int(120, 300), u: [1, 2] }, b: { sym: 'V', unit: 'mL', c: (r) => r.int(100, 300), u: [5, 10] } },
      { f: 'P = E/t', a: { sym: 'E', unit: 'kJ', c: (r) => r.int(60, 200), u: [5, 10] }, b: { sym: 't', unit: 's', c: (r) => r.int(100, 300), u: [5, 10] } },
    ];
    const s = rng.pick(pool);
    const A = drawMeasure(rng, s.a);
    const B = drawMeasure(rng, s.b);
    const res = s.f.split(' ')[0];
    const smallest = rng.chance(0.5);
    const v = fix(smallest ? B.c + B.u : B.c - B.u);
    const prompt = smallest
      ? t('{f}, avec {a} et {b}. Pour obtenir le plus petit {r}, quelle valeur de {s} prends-tu ?', { f: F(s.f), a: meas(A), b: meas(B), r: F(res), s: F(B.sym) })
      : t('{f}, avec {a} et {b}. Pour obtenir le plus grand {r}, quelle valeur de {s} prends-tu ?', { f: F(s.f), a: meas(A), b: meas(B), r: F(res), s: F(B.sym) });
    return physItem('rg-ends', level, prompt, v, B.unit, {
      traps: [[smallest ? B.c - B.u : B.c + B.u, 'rg_same_ends'], [B.c, 'rg_central_value']],
      expected: fmt(v, B.dec).replace(/\s/g, ''), minSig: 1,
      solution: [{ html: F(`${res}_${smallest ? 'min' : 'max'} = ${A.sym}_${smallest ? 'min' : 'max'}/${B.sym}_${smallest ? 'max' : 'min'}`), note: t('{s} est sous la barre : sa plus grande valeur donne le plus petit résultat.', { s: B.sym }) }],
      key: `e5:${s.f}:${A.c}:${B.c}:${B.u}:${smallest}`, sec: 30,
    });
  }
  const pool = ENDS.filter((e) => (level <= 2 ? e.lv <= level : level === 3 ? e.lv === 3 || e.lv === 2 : e.lv >= 3));
  const e = rng.pick(pool);
  const smallest = level === 1 ? true : level === 2 ? false : rng.chance(0.5);
  const names = Object.keys(e.vars);
  const want = names.map((s) => ((e.vars[s] > 0) === smallest ? 'min' : 'max'));
  const same = names.map(() => (smallest ? 'min' : 'max'));
  // Every combination of ends.
  const combos = [];
  for (let k = 0; k < 2 ** names.length; k++) combos.push(names.map((_, i) => ((k >> i) & 1 ? 'max' : 'min')));
  const key = (c) => c.join(',');
  const options = [
    { html: endsHtml(e.vars, want), correct: true },
    ...combos.filter((c) => key(c) !== key(want)).map((c) => ({ html: endsHtml(e.vars, c), rule: key(c) === key(same) ? 'rg_same_ends' : null })),
  ];
  // The trap first among the distractors, so it stays when only 4 are kept.
  options.sort((a, b) => (b.correct ? 1 : 0) - (a.correct ? 1 : 0) || (b.rule ? 1 : 0) - (a.rule ? 1 : 0));
  const kept = [options[0], ...options.slice(1, 2), ...rng.shuffle(options.slice(2)).slice(0, 2)];
  return mcq('rg-ends', level, smallest ? t('Dans {f}, quelles valeurs prends-tu pour obtenir le plus petit {r} ?', { f: F(e.f), r: F(e.res) }) : t('Dans {f}, quelles valeurs prends-tu pour obtenir le plus grand {r} ?', { f: F(e.f), r: F(e.res) }), kept, rng, {
    solution: [{ html: F(`${e.res}_${smallest ? 'min' : 'max'}`) + ' : ' + endsHtml(e.vars, want), note: t('Ce qui est sous la barre de fraction agit à l\'envers.') }],
    key: `e${level}:${e.f}:${smallest}`,
  });
};

// ---------- rg-compute: computing a range ----------

// A situation: data (measures), the result in SI, the unit shown.
// value(env) is computed from the SI values; dir: +1/−1 per datum.
const COMPUTE = {
  work: { lv: [1], res: 'E', unit: 'J', f: 'E = F d', data: [{ sym: 'F', unit: 'N', si: 1, c: (r) => r.int(15, 60) * 10, u: [5, 10] }, { sym: 'd', unit: 'm', si: 1, c: (r) => r.int(20, 100), u: [1, 2] }], dir: [1, 1], value: ([F_, d]) => F_ * d },
  lift: { lv: [1], res: 'E', unit: 'J', f: 'E = m g h', data: [{ sym: 'm', unit: 'kg', si: 1, c: (r) => r.int(10, 60), u: [0.5, 1] }, { sym: 'h', unit: 'm', si: 1, c: (r) => r.int(15, 60) / 10, u: [0.1, 0.2] }], dir: [1, 1], value: ([m, h]) => m * 10 * h, note: 'g = 10 N/kg' },
  speed: { lv: [2, 3], res: 'v', unit: 'm/s', f: 'v = d/t', data: [{ sym: 'd', unit: 'm', si: 1, c: (r) => r.int(30, 90) * 10, u: [10, 20] }, { sym: 't', unit: 's', si: 1, c: (r) => r.int(60, 150), u: [2, 4, 5] }], dir: [1, -1], value: ([d, t_]) => d / t_ },
  power: { lv: [2, 3], res: 'P', unit: 'W', f: 'P = E/t', data: [{ sym: 'E', unit: 'kJ', si: 1000, c: (r) => r.int(60, 200), u: [5, 10] }, { sym: 't', unit: 's', si: 1, c: (r) => r.int(100, 300), u: [5, 10] }], dir: [1, -1], value: ([E, t_]) => E / t_ },
  horse: { lv: [3, 5], res: 'F', unit: 'N', f: 'F = P/v', data: [{ sym: 'P', unit: 'W', si: 1, c: (r) => r.int(5, 9) * 100, u: [50, 60] }, { sym: 'v', unit: 'm/s', si: 1, c: (r) => r.int(18, 25) / 10, u: [0.1, 0.2] }], dir: [1, -1], value: ([P, v]) => P / v },
  potato: { lv: [3], res: 'ρ', unit: 'kg/L', f: 'ρ = m/V', data: [{ sym: 'm', unit: 'g', si: 1e-3, c: (r) => r.int(120, 260), u: [1, 2] }, { sym: 'V', unit: 'mL', si: 1e-3, c: (r) => r.int(110, 250), u: [5, 10] }], dir: [1, -1], value: ([m, V]) => m / V },
  heat: { lv: [4], res: 'c', unit: 'J/(kg·K)', f: 'c = E/(m ΔT)', data: [{ sym: 'E', unit: 'kJ', si: 1000, c: (r) => r.int(100, 300), u: [5, 10] }, { sym: 'm', unit: 'kg', si: 1, c: (r) => r.int(10, 30) / 10, u: [0.1] }, { sym: 'ΔT', unit: 'K', si: 1, c: (r) => r.int(20, 50), u: [1, 2] }], dir: [1, -1, -1], value: ([E, m, dT]) => E / (m * dT) },
  boil: { lv: [4], res: 't', unit: 's', f: 't = m c ΔT/P', data: [{ sym: 'm', unit: 'kg', si: 1, c: (r) => r.int(5, 20) / 10, u: [0.1] }, { sym: 'ΔT', unit: 'K', si: 1, c: (r) => r.int(60, 85), u: [1, 2] }, { sym: 'P', unit: 'W', si: 1, c: (r) => r.int(15, 25) * 100, u: [100] }], dir: [1, 1, -1], value: ([m, dT, P]) => (m * 4200 * dT) / P, note: 'c = 4200 J/(kg·K)' },
  butter: { lv: [4, 5], res: 'ρ', unit: 'kg/m^3', f: 'ρ = m/(ℓ d h)', data: [{ sym: 'm', unit: 'g', si: 1e-3, c: (r) => r.pick([250, 500, 200]), u: [1] }, { sym: 'ℓ', unit: 'cm', si: 0.01, c: (r) => r.int(100, 120) / 10, u: [0.1] }, { sym: 'd', unit: 'cm', si: 0.01, c: (r) => r.int(55, 70) / 10, u: [0.1] }, { sym: 'h', unit: 'cm', si: 0.01, c: (r) => r.int(30, 45) / 10, u: [0.1] }], dir: [1, -1, -1, -1], value: ([m, a, b, c]) => m / (a * b * c) },
  cyclist: { lv: [5], res: 'v', unit: 'm/s', f: 'v = d/t', data: [{ sym: 'd', unit: 'km', si: 1000, c: (r) => r.int(80, 200) / 10, u: [0.5, 0.2] }, { sym: 't', unit: 'min', si: 60, c: (r) => r.int(30, 60), u: [1, 2] }], dir: [1, -1], value: ([d, t_]) => d / t_ },
};

function computeItem(level, rng) {
  const pool = Object.values(COMPUTE).filter((s) => s.lv.includes(level));
  const s = rng.pick(pool);
  const data = s.data.map((d) => ({ ...drawMeasure(rng, d), si: d.si }));
  const smallest = level <= 2 ? rng.chance(0.7) : rng.chance(0.5);
  const sign = smallest ? -1 : 1;
  const at = (pick) => s.value(data.map((d, i) => (d.c + pick(d, i) * d.u) * d.si));
  const value = at((d, i) => sign * s.dir[i]);
  const traps = [
    [at(() => 0), 'rg_central_value'],
    [at(() => sign), 'rg_same_ends'],
  ];
  // Data left in their units.
  if (data.some((d) => d.si !== 1)) traps.push([s.value(data.map((d, i) => d.c + sign * s.dir[i] * d.u)), data.some((d) => d.unit === 'g') ? 'ph_gram_as_kg' : 'ph_not_si']);
  const shown = data.map(meas).join(' ; ');
  const r = F(s.res);
  const prompt = smallest
    ? t('{f}, avec {data}. Quelle est la plus petite valeur possible de {r} ?', { f: F(s.f), data: shown + (s.note ? ` (${s.note})` : ''), r })
    : t('{f}, avec {data}. Quelle est la plus grande valeur possible de {r} ?', { f: F(s.f), data: shown + (s.note ? ` (${s.note})` : ''), r });
  const ends = data.map((d, i) => `${F(`${d.sym}_${sign * s.dir[i] > 0 ? 'max' : 'min'}`)} = ${q(d.c + sign * s.dir[i] * d.u, d.unit, d.dec)}`).join(' ; ');
  return physItem('rg-compute', level, prompt, value, s.unit, {
    traps, minSig: 2,
    solution: [
      { html: ends, note: t('Pour chaque donnée, l\'extrémité qui pousse le résultat dans le bon sens : sous la barre, à l\'envers.') },
      { html: mathSpan(`${F(`${s.res}_${smallest ? 'min' : 'max'}`)} ≈ <b>${nice(value, 3)} ${unitText(s.unit)}</b>`), note: t('Puis les données en SI, et un seul calcul.') },
    ],
    key: `c${level}:${s.f}:${data.map((d) => `${d.c}±${d.u}`).join(',')}:${smallest}`, sec: 60 + 15 * data.length,
  });
}
GEN['rg-compute'] = computeItem;

// ---------- rg-digits: how many digits ----------

// A range whose honest writing is clear: the centre rounded at the place of
// the leading digit of the half-width.
function honestRange(rng, places) {
  const p = rng.pick(places);
  let k;
  do k = rng.int(12, 999); while (k % 10 === 0);
  const P = 10 ** p;
  const hwm = rng.int(12, 60) / 10;
  const centre = fix((k + rng.pick([-1, 1]) * rng.int(0, 25) / 100) * P);
  const lo = fix(Number(((centre - hwm * P) / P).toFixed(1)) * P);
  const hi = fix(Number(((centre + hwm * P) / P).toFixed(1)) * P);
  const calc = Number(((lo + hi) / 2 + rng.int(-9, 9) * P / 100).toPrecision(7));
  return { p, k, P, rounded: fix(k * P), lo, hi, calc, hw: fix(hwm * P), nsig: String(k).length };
}
// A value written to the place 10^p.
const atPlace = (v, p) => (p >= 0 ? num(Math.round(v / 10 ** p) * 10 ** p) : fix(v).toFixed(-p).replace('.', ','));
const atPlaceSci = (v, p) => {
  const e = Math.floor(Math.log10(Math.abs(v)));
  const mant = Math.round(v / 10 ** p) * 10 ** p / 10 ** e;
  return `${fix(mant).toFixed(Math.max(0, e - p)).replace('.', ',')}·10${String(e).split('').map((c) => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)]).join('')}`;
};
const calcText = (v) => fix(v).toString().replace('.', ',');
const DIGIT_CTX = [['v', 'm/s'], ['h', 'm'], ['ρ', 'kg/m^3'], ['E', 'J'], ['P', 'W'], ['t', 's'], ['F', 'N']];

GEN['rg-digits'] = (level, rng) => {
  const [sym, unit] = rng.pick(DIGIT_CTX);
  if (level === 1 || level === 5) {
    const big = level === 5;
    const r = honestRange(rng, big ? [3, 4, -4, -3] : [-2, -1, 0, 1]);
    const w = big ? atPlaceSci : atPlace;
    const options = [
      { html: withUnit(w(r.rounded, r.p), unit), correct: true },
      { html: withUnit(w(r.calc, r.p - 1), unit), rule: 'ph_too_many_digits' },
      { html: withUnit(big ? atPlaceSci(r.calc, r.p - 3) : calcText(r.calc), unit), rule: 'ph_too_many_digits' },
      { html: withUnit(w(r.calc, r.p - 2), unit), rule: 'ph_too_many_digits' },
    ];
    const show = big ? (v) => atPlaceSci(v, r.p - 1) : (v) => atPlace(v, r.p - 1);
    return mcq('rg-digits', level, t('La fourchette de {s} va de {lo} à {hi}. La calculatrice affiche {calc}. Qu\'écris-tu comme résultat ?', { s: F(sym), lo: withUnit(show(r.lo), unit), hi: withUnit(show(r.hi), unit), calc: big ? sci(r.calc, 7) : calcText(r.calc) }), options, rng, {
      solution: [{ html: mathSpan(`± ${big ? atPlaceSci(r.hw, r.p) : atPlace(r.hw, r.p)} → <b>${withUnit(w(r.rounded, r.p), unit)}</b>`), note: t('La demi-largeur de la fourchette dit quel chiffre est incertain : on s\'arrête à ce chiffre-là.') }],
      key: `d${level}:${r.lo}:${r.hi}:${r.calc}`, sec: 30,
    });
  }
  if (level === 2 || level === 4) {
    const r = honestRange(rng, [-2, -1, 0]);
    const prompt = level === 2
      ? t('La fourchette de {s} va de {lo} à {hi}. Combien de chiffres significatifs peux-tu garder dans le résultat ?', { s: F(sym), lo: withUnit(atPlace(r.lo, r.p - 1), unit), hi: withUnit(atPlace(r.hi, r.p - 1), unit) })
      : t('Un élève écrit {data}. Combien de chiffres significatifs a-t-il le droit de garder ?', { data: `${F(sym)} = ${calcText(r.calc)} ± ${atPlace(Number(r.hw.toPrecision(2)), r.p - 1)} ${unitText(unit)}` });
    const calcSig = calcText(r.calc).replace(/[^0-9]/g, '').replace(/^0+/, '').length;
    const it = answerItem('rg-digits', level, prompt, String(r.nsig), {
      traps: [[r.nsig + 1, 'ph_too_many_digits'], [calcSig, 'ph_too_many_digits']].filter(([n], i, a) => n !== r.nsig && a.findIndex(([m]) => m === n) === i).map(([n, rule]) => ({ value: [n, 1], rule })),
      keys: 'int',
      solution: [{ html: mathSpan(`± ${atPlace(r.hw, r.p)} → ${atPlace(r.rounded, r.p)}`), note: tn2(r.nsig) }],
      key: `d${level}:${r.lo}:${r.hi}:${r.calc}`, expectedSec: 30,
    });
    return it;
  }
  // Level 3: « valeur ± incertitude » with too many digits.
  const r = honestRange(rng, [-2, -1, 0, 1]);
  const hw4 = Number(r.hw.toPrecision(4)) + rng.int(1, 9) * r.P / 1000;
  const pm = (a, b) => `${a} ± ${b} ${unitText(unit)}`;
  const options = [
    { html: pm(atPlace(r.rounded, r.p), atPlace(r.hw, r.p)), correct: true },
    { html: pm(atPlace(r.calc, r.p - 1), atPlace(hw4, r.p - 1)), rule: 'ph_too_many_digits' },
    { html: pm(calcText(r.calc), calcText(fix(hw4))), rule: 'ph_too_many_digits' },
    { html: pm(atPlace(r.calc, r.p - 2), atPlace(r.hw, r.p)), rule: 'ph_too_many_digits' },
  ];
  return mcq('rg-digits', level, t('La calculatrice donne {data}. Comment l\'écrire honnêtement ?', { data: `${F(sym)} = ${pm(calcText(r.calc), calcText(fix(hw4)))}` }), options, rng, {
    solution: [{ html: `<b>${pm(atPlace(r.rounded, r.p), atPlace(r.hw, r.p))}</b>`, note: t('L\'incertitude avec un seul chiffre, et la valeur arrêtée au même rang.') }],
    key: `d3:${r.calc}:${hw4}`, sec: 30,
  });
};
const tn2 = (n) => (n >= 2 ? t('On garde {n} chiffres significatifs.', { n }) : t('On garde un seul chiffre significatif.'));

// ---------- rg-conclude ----------

const LIMITS = [
  { p: '{data}. L\'objet coule-t-il dans l\'eau ({lim}) ?', sym: 'ρ', unit: 'kg/L', lim: [1], limDec: 2, dec: 2, u: [0.02, 0.05, 0.08] },
  { p: '{data}. La voiture a-t-elle dépassé la limite de {lim} ?', sym: 'v', unit: 'km/h', lim: [50, 80, 30], dec: 0, u: [2, 3, 5] },
  { p: '{data}. Le cycliste a-t-il roulé plus vite que {lim} ?', sym: 'v', unit: 'm/s', lim: [4, 4.5, 5], limDec: 1, dec: 1, u: [0.2, 0.3] },
  { p: '{data}. La charge dépasse-t-elle le maximum autorisé de {lim} ?', sym: 'm', unit: 'kg', lim: [630, 450, 1000], dec: 0, u: [5, 10, 20] },
  { p: '{data}. La bouilloire consomme-t-elle plus de {lim} ?', sym: 'P', unit: 'W', lim: [2000, 1500], dec: 0, u: [50, 100] },
  { p: '{data}. Le sac a-t-il gagné plus de {lim} d\'énergie ?', sym: 'E', unit: 'J', lim: [500, 800, 1000], dec: 0, u: [20, 30, 50] },
];
// Shown in another unit than the limit (level 4).
const CONVERTED = [
  { p: '{data}. L\'objet coule-t-il dans l\'eau ({lim}) ?', sym: 'ρ', unit: 'kg/m^3', limUnit: 'kg/L', lim: [1], limDec: 2, f: 1000, dec: 0, u: [20, 50, 80] },
  { p: '{data}. La voiture a-t-elle dépassé la limite de {lim} ?', sym: 'v', unit: 'm/s', limUnit: 'km/h', lim: [50, 30, 80], f: 1 / 3.6, dec: 1, u: [0.3, 0.5] },
];
const CASES = ['above', 'below', 'unsure'];

function conclusion(rng, s, level) {
  const lim = rng.pick(s.lim);
  const limShown = fix(lim * (s.f ?? 1));
  const u = rng.pick(s.u);
  const kind = rng.chance(0.5) ? 'unsure' : rng.pick(CASES.slice(0, 2));
  let c;
  for (;;) {
    const k = kind === 'unsure' ? rng.pick([-0.75, -0.5, -0.25, 0.25, 0.5, 0.75]) : (kind === 'above' ? 1 : -1) * rng.pick([1.3, 1.5, 2, 2.5]);
    c = fix(Number((limShown + k * u).toFixed(s.dec)));
    const lo = c - u;
    const hi = c + u;
    const ok = kind === 'unsure' ? lo < limShown - 1e-9 && hi > limShown + 1e-9 && Math.abs(c - limShown) > 1e-9 : kind === 'above' ? lo > limShown + 1e-9 : hi < limShown - 1e-9;
    if (ok && c > 0) break;
  }
  const dec = Math.max(s.dec, decimalsOf(u));
  const lo = fix(c - u);
  const hi = fix(c + u);
  const limText = withUnit(fmt(lim, s.limDec ?? 0), s.limUnit || s.unit);
  const data = level === 3 ? `${q(lo, s.unit, dec)} ≤ ${F(s.sym)} ≤ ${q(hi, s.unit, dec)}` : `${F(s.sym)} = ${fmt(c, dec)} ± ${fmt(u, dec)} ${unitText(s.unit)}`;
  const L = { lim: limText };
  const options = [
    { html: t('Oui : toute la fourchette est au-dessus de {lim}.', L), correct: kind === 'above' },
    { html: t('Non : toute la fourchette est en dessous de {lim}.', L), correct: kind === 'below' },
    { html: t('On ne peut pas conclure : {lim} est dans la fourchette.', L), correct: kind === 'unsure' },
  ];
  if (kind === 'unsure') {
    const mid = withUnit(fmt(c, dec), s.unit);
    options.push(c > limShown
      ? { html: t('Oui, car {c} est plus grand que {lim}.', { c: mid, lim: limText }), rule: 'rg_conclude_middle' }
      : { html: t('Non, car {c} est plus petit que {lim}.', { c: mid, lim: limText }), rule: 'rg_conclude_middle' });
  }
  options.sort((a, b) => (b.correct ? 1 : 0) - (a.correct ? 1 : 0));
  return mcq('rg-conclude', level, t(s.p, { data, lim: limText }), options, rng, {
    solution: [{ html: mathSpan(`[${fmt(lo, dec)} ; ${fmt(hi, dec)}] ${unitText(s.unit)}${s.limUnit ? ` · ${limText} = ${nice(limShown, 3)} ${unitText(s.unit)}` : ''}`), note: t('On conclut seulement si toute la fourchette est du même côté de la limite.') }],
    key: `k${level}:${s.p}:${lim}:${c}:${u}`, sec: 30,
  });
}

// Two measured values compared (level 5).
const PAIRS = [
  { p: 'Vélo A : {a}. Vélo B : {b}. Le vélo A est-il plus rapide que le vélo B ?', sym: ['v_A', 'v_B'], unit: 'm/s', c: (r) => r.int(40, 70) / 10, u: [0.2, 0.3] },
  { p: 'Liquide A : {a}. Liquide B : {b}. Le liquide A est-il plus dense que le liquide B ?', sym: ['ρ_A', 'ρ_B'], unit: 'kg/L', c: (r) => r.int(80, 130) / 100, u: [0.02, 0.03, 0.05] },
  { p: 'Moteur A : {a}. Moteur B : {b}. Le moteur A est-il plus puissant que le moteur B ?', sym: ['P_A', 'P_B'], unit: 'W', c: (r) => r.int(5, 20) * 100, u: [50, 100] },
];
function pairItem(level, rng) {
  const s = rng.pick(PAIRS);
  const u = rng.pick(s.u);
  const cb = fix(s.c(rng));
  const kind = rng.chance(0.5) ? 'unsure' : rng.pick(['above', 'below']);
  const k = kind === 'unsure' ? rng.pick([-1.5, -1, -0.5, 0.5, 1, 1.5]) : (kind === 'above' ? 1 : -1) * rng.pick([2.5, 3, 4]);
  const ca = fix(cb + k * u);
  const dec = Math.max(decimalsOf(ca), decimalsOf(cb), decimalsOf(u));
  const show = (sym, c) => `${F(sym)} = ${fmt(c, dec)} ± ${fmt(u, dec)} ${unitText(s.unit)}`;
  const options = [
    { html: t('Oui : même la plus petite valeur de A dépasse la plus grande de B.'), correct: kind === 'above' },
    { html: t('Non : même la plus grande valeur de A est plus petite que la plus petite de B.'), correct: kind === 'below' },
    { html: t('On ne peut pas conclure : les deux fourchettes se chevauchent.'), correct: kind === 'unsure' },
  ];
  if (kind === 'unsure') options.push(ca > cb ? { html: t('Oui, car la valeur du milieu de A est plus grande.'), rule: 'rg_conclude_middle' } : { html: t('Non, car la valeur du milieu de A est plus petite.'), rule: 'rg_conclude_middle' });
  options.sort((a, b) => (b.correct ? 1 : 0) - (a.correct ? 1 : 0));
  return mcq('rg-conclude', level, t(s.p, { a: show(s.sym[0], ca), b: show(s.sym[1], cb) }), options, rng, {
    solution: [{ html: mathSpan(`A : [${fmt(ca - u, dec)} ; ${fmt(ca + u, dec)}] · B : [${fmt(cb - u, dec)} ; ${fmt(cb + u, dec)}]`), note: t('On compare les fourchettes, pas les valeurs du milieu.') }],
    key: `k5:${s.p}:${ca}:${cb}:${u}`, sec: 35,
  });
}

GEN['rg-conclude'] = (level, rng) => {
  if (level === 5) return pairItem(level, rng);
  if (level === 4) return conclusion(rng, rng.pick(CONVERTED), level);
  return conclusion(rng, rng.pick(LIMITS), level);
};

// ---------- rg-percent: relative uncertainty ----------

const NICE_PCT = [[20, [1, 2]], [25, [1, 0.5]], [40, [1, 2]], [50, [1, 2, 5]], [80, [2, 4]], [200, [1, 2, 10]], [250, [5, 10]], [400, [2, 4, 20]], [500, [5, 10, 25]]];
const PCT_UNITS = [['m', 'g'], ['d', 'cm'], ['V', 'mL'], ['t', 's'], ['h', 'mm']];
const pctPrompt = (m) => t('{data}. Quelle est l\'incertitude relative, en % ?', { data: meas(m) });
const pctItem = (level, m, sig) => {
  const p = (100 * m.u) / m.c;
  return physItem('rg-percent', level, pctPrompt(m), p, '%', {
    traps: [[(100 * m.c) / m.u, 'percent_inverted'], [m.u / m.c, 'rg_percent_fraction']],
    minSig: 1, sig, suffix: '%',
    solution: [{ html: mathSpan(`${frac(fmt(m.u, m.dec), fmt(m.c, m.dec))} · 100 % ≈ <b>${nice(p, 2)} %</b>`), note: t('L\'incertitude relative est l\'incertitude divisée par la valeur.') }],
    key: `p${level}:${m.sym}:${m.c}:${m.u}`, sec: 30,
  });
};
// Measures to compare: the one with the largest % comes first.
function improveItem(level, rng, n) {
  for (;;) {
    const ms = rng.shuffle(MEASURES).slice(0, n).map((spec) => drawMeasure(rng, spec));
    const pct = ms.map((m) => m.u / m.c);
    const best = pct.indexOf(Math.max(...pct));
    const sorted = [...pct].sort((a, b) => b - a);
    if (sorted[0] < 1.3 * sorted[1]) continue;
    // The largest absolute uncertainty (in number) bait: it is not the answer.
    const bigAbs = ms.reduce((b, m, i) => (m.u > ms[b].u ? i : b), 0);
    if (rng.chance(0.7) && bigAbs === best) continue;
    const options = [{ html: meas(ms[best]), correct: true }, ...ms.filter((_, i) => i !== best).map((m) => ({ html: meas(m), rule: ms.indexOf(m) === bigAbs ? 'rg_percent_absolute' : null }))];
    return mcq('rg-percent', level, t('Laquelle de ces mesures faut-il améliorer en priorité ?'), options, rng, {
      solution: ms.map((m) => ({ html: mathSpan(`${frac(fmt(m.u, m.dec), fmt(m.c, m.dec))} ≈ ${nice((100 * m.u) / m.c, 2)} %`), note: '' })),
      key: `p${level}:${ms.map((m) => `${m.sym}${m.c}±${m.u}`).join(',')}`, sec: 45,
    });
  }
}

GEN['rg-percent'] = (level, rng) => {
  if (level === 1) {
    const [c, us] = rng.pick(NICE_PCT);
    const [sym, unit] = rng.pick(PCT_UNITS);
    const u = rng.pick(us);
    return pctItem(level, { sym, unit, c, u, dec: decimalsOf(u) }, 3);
  }
  if (level === 2) return pctItem(level, drawMeasure(rng), 2);
  if (level === 3) return improveItem(level, rng, 2);
  if (level === 4) {
    const c = rng.pick([250, 400, 1200, 80, 150, 500]);
    const p = rng.pick([1, 2, 4, 5, 0.5]);
    const [sym, unit] = rng.pick(PCT_UNITS);
    const v = (c * p) / 100;
    return physItem('rg-percent', level, t('{data} à {p} % près. Quelle est l\'incertitude, dans l\'unité de la mesure ?', { data: `${F(sym)} = ${num(c)} ${unit}`, p: num(p) }), v, unit, {
      traps: [[p, 'percent_as_amount'], [c * p, 'rg_percent_fraction'], [(100 * p) / c, 'percent_inverted']], minSig: 1,
      solution: [{ html: mathSpan(`${num(p)} % · ${num(c)} ${unit} = ${nice(p / 100, 3)} · ${num(c)} = <b>${nice(v, 3)} ${unit}</b>`), note: t('Un pourcentage se calcule sur la valeur mesurée.') }],
      key: `p4:${sym}:${c}:${p}`, sec: 30,
    });
  }
  return improveItem(level, rng, rng.pick([3, 4]));
};
