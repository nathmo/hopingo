// Generators of the unit « energie » (docs/plan-physique.md).
//
// Levels, as in the class diagnostic (physicsExample.tex, parts B, C, D):
//   1-2  the formula, data in SI (2: decimals, other situations)
//   3-4  « le problème à l'envers » (another unknown) and data to convert
//        (g, cm, min, km/h, kWh, L)
//   5    two steps chained, or a true/false whose options are the reasons
// Data: g = 10 N/kg, c_eau = 4200 J/(kg·K), L_f = 330 kJ/kg, 1 L d'eau = 1 kg.
// Each predictable wrong answer carries its trap (js/content/physique/rules.js
// and rules-energie.js); a trap the checker would not recognise is dropped.

import { t } from '../../i18n.js';
import { mcqItem } from '../items.js';
import { checkPhys } from '../../physics/checker.js';
import { F, num, sci, nice, typed, unitText, fix } from './format.js';

export const GEN = {};

const G = 10;
const C_EAU = 4200;
const LF = 330000;

// ---------- writing ----------

const sigOf = (v) => String(fix(Math.abs(v))).replace('.', '').replace(/^0+/, '').replace(/0+$/, '').length || 1;
// A datum as written in the statement: 288 000, 0,45, 1,62·10⁷.
const N = (v) => (Math.abs(v) >= 1e7 || (v !== 0 && Math.abs(v) < 1e-3) ? sci(v, Math.max(2, sigOf(v))) : num(v));
const Q = (v, u) => `${N(v)} ${unitText(u)}`;
// A result: « = 112 500 J » (exact when short) or « ≈ 268 s ».
const R = (v, u = '') => {
  const sig = sigOf(v) <= 5 ? Math.max(sigOf(v), 1) : 3;
  const shown = fix(Number(Number(v).toPrecision(sig)));
  return `${Math.abs(shown - v) > 1e-9 * Math.abs(v) ? '≈' : '='} <b>${nice(v, sig)}${u ? ` ${unitText(u)}` : ''}</b>`;
};
const fr = (n, d) => `<span class="m"><span class="m-frac"><span class="m-n">${n}</span><span class="m-d">${d}</span></span></span>`;
const L = (html, note = '') => ({ html, note });
const first = (src) => L(F(src), t('La formule d\'abord.'));
const iso = (src) => L(F(src), t('On isole l\'inconnue, avec des lettres seulement.'));
const si = (html) => L(html, t('En unités SI.'));
const res = (sym, v, u, note = '') => L(`${F(sym)} ${R(v, u)}`, note);
const pg = (rng, lo, hi, step) => fix(lo + step * rng.int(0, Math.round((hi - lo) / step)));

// ---------- items ----------

// Every line the student may write above the answer: numbers, × ÷ + −,
// powers of ten, roots, brackets.
const KEYS = ['7', '8', '9', '×', 'frac', 'back', '4', '5', '6', '+', '-', '^', '1', '2', '3', '(', ')', '√', '0', ',', 'left', 'right'];

// A numeric answer, checked the physicist's way (js/physics/checker.js).
// traps: [[value in the answer unit, rule id]].
function answer(skill, level, prompt, value, unit, { traps = [], solution = [], key, sec } = {}) {
  const item = {
    skill, level, type: 'answer', prompt,
    expected: typed(value, sigOf(value) <= 4 ? 4 : 3), checker: 'phys', value: fix(value), minSig: 2, physTraps: [],
    form: 'any', traps: [], keys: KEYS, suffix: unitText(unit), figure: null, baits: [],
    solution, expectedSec: sec ?? (level <= 2 ? 45 : level <= 4 ? 70 : 100),
    key: `${skill}:${key}`,
  };
  for (const [v, rule] of traps) {
    if (!rule || !Number.isFinite(v) || fix(v) === 0) continue;
    const trap = { value: fix(v), rule };
    // Kept only if the checker, given what the student types, finds it.
    const r = checkPhys({ ...item, physTraps: [...item.physTraps, trap] }, typed(v));
    if (r.kind === 'wrong' && r.rule === rule) item.physTraps.push(trap);
  }
  item.baits = [...new Set(item.physTraps.map((x) => x.rule))];
  return item;
}

// A true/false or a choice whose options carry the reason.
function choice(skill, level, prompt, right, wrongs, rng, { why = '', key } = {}) {
  const options = [{ html: right, correct: true }, ...wrongs.map(([html, rule]) => ({ html, correct: false, ...(rule ? { rule } : {}) }))];
  return mcqItem(skill, level, prompt, options, rng, { solution: why ? [L('', why)] : [], key, expectedSec: 35 });
}

// ======================================================================
// ph-ep : E_p = m g h
// ======================================================================

const EP_SITS = [
  { m: [[10, 50, 5], [2.5, 30, 0.5]], h: [[1, 2, 1], [1.2, 2.2, 0.1]], text: (v) => t('Un sac de {m} est monté sur une étagère à {h} du sol. Quelle énergie potentielle a-t-il gagnée ?', v) },
  { m: [[5, 20, 1], [4.5, 15, 0.5]], h: [[3, 15, 1], [2.5, 12.5, 0.5]], text: (v) => t('Un seau d\'eau de {m} est hissé de {h} avec une corde. De combien augmente son énergie potentielle ?', v) },
  { m: [[45, 80, 5], [48, 82, 1]], h: [[50, 500, 50], [120, 860, 10]], text: (v) => t('Une randonneuse de {m} monte de {h} sur le sentier du Chasseral. De combien augmente son énergie potentielle ?', v) },
  { m: [[400, 900, 50], [450, 950, 10]], h: [[3, 30, 3], [2.8, 25.2, 2.8]], text: (v) => t('Un ascenseur de {m} monte de {h}. Quelle énergie potentielle gagne-t-il ?', v) },
  { m: [null, [0.1, 0.3, 0.01]], h: [null, [1.5, 4, 0.1]], text: (v) => t('Une pomme de {m} pend à une branche, à {h} du sol. Quelle est son énergie potentielle par rapport au sol ?', v) },
];

const PLACES = [['Nods', 890, 'Chasseral', 1607], ['Montreux', 396, 'Rochers-de-Naye', 2042], ['Plan-Francey', 1520, 'Moléson', 2002], ['Saint-Imier', 793, 'Mont-Soleil', 1288]];

GEN['ph-ep'] = (level, rng) => {
  const sk = 'ph-ep';
  if (level <= 2) {
    const sits = EP_SITS.filter((s) => s.m[level - 1]);
    const i = rng.int(0, sits.length - 1);
    const s = sits[i];
    const m = pg(rng, ...s.m[level - 1]);
    const h = pg(rng, ...s.h[level - 1]);
    const E = fix(m * G * h);
    return answer(sk, level, s.text({ m: Q(m, 'kg'), h: Q(h, 'm') }), E, 'J', {
      traps: [[m * h, 'ph_ep_forget_g']],
      solution: [first('E_p = m g h'), L(`${F('E_p')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')}`), res('E_p', E, 'J')],
      key: `${i}:${m}:${h}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const m = pg(rng, 2, 30, 1);
      const h = pg(rng, 1, 6, 0.5);
      const E = fix(m * G * h);
      return answer(sk, level, t('Un carton gagne {E} d\'énergie potentielle quand on le monte de {h}. Quelle est sa masse ?', { E: Q(E, 'J'), h: Q(h, 'm') }), m, 'kg', {
        traps: [[E / h, 'ph_ep_forget_g'], [(G * h) / E, 'ph_iso_flip'], [E * G * h, 'iso_wrong_inverse']],
        solution: [first('E_p = m g h'), iso('m = E_p/(g h)'), L(`${F('m')} = ${fr(Q(E, 'J'), `10 N/kg · ${Q(h, 'm')}`)}`), res('m', m, 'kg')],
        key: `m:${E}:${h}`,
      });
    }
    const m = pg(rng, 100, 800, 50);
    const h = pg(rng, 2, 25, 1);
    const E = fix(m * G * h);
    return answer(sk, level, t('Une grue donne {E} d\'énergie potentielle à une palette de {m}. De combien l\'a-t-elle montée ?', { E: Q(E, 'J'), m: Q(m, 'kg') }), h, 'm', {
      traps: [[E / m, 'ph_ep_forget_g'], [(m * G) / E, 'ph_iso_flip'], [E * m * G, 'iso_wrong_inverse']],
      solution: [first('E_p = m g h'), iso('h = E_p/(m g)'), L(`${F('h')} = ${fr(Q(E, 'J'), `${Q(m, 'kg')} · 10 N/kg`)}`), res('h', h, 'm')],
      key: `h:${E}:${m}`,
    });
  }
  if (level === 4) {
    const v = rng.int(0, 3);
    if (v === 0) {
      const mg = pg(rng, 120, 250, 10);
      const h = pg(rng, 2, 4.5, 0.5);
      const m = fix(mg / 1000);
      const E = fix(m * G * h);
      return answer(sk, level, t('Une pomme de {m} tombe d\'une branche à {h} du sol. Quelle énergie potentielle avait-elle au départ ?', { m: Q(mg, 'g'), h: Q(h, 'm') }), E, 'J', {
        traps: [[mg * G * h, 'ph_gram_as_kg'], [m * h, 'ph_ep_forget_g']],
        solution: [first('E_p = m g h'), si(`${F('m')} = ${Q(mg, 'g')} = ${Q(m, 'kg')}`), L(`${F('E_p')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')}`), res('E_p', E, 'J')],
        key: `g:${mg}:${h}`,
      });
    }
    if (v === 1) {
      const m = pg(rng, 20, 40, 1);
      const hc = pg(rng, 30, 60, 5);
      const h = fix(hc / 100);
      const E = fix(m * G * h);
      return answer(sk, level, t('Un enfant de {m} monte sur un tabouret de {h}. De combien augmente son énergie potentielle ?', { m: Q(m, 'kg'), h: Q(hc, 'cm') }), E, 'J', {
        traps: [[m * G * hc, 'ph_not_si'], [m * h, 'ph_ep_forget_g']],
        solution: [first('E_p = m g h'), si(`${F('h')} = ${Q(hc, 'cm')} = ${Q(h, 'm')}`), L(`${F('E_p')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')}`), res('E_p', E, 'J')],
        key: `cm:${m}:${hc}`,
      });
    }
    if (v === 2) {
      const mt = pg(rng, 1.2, 3.6, 0.2);
      const h = pg(rng, 100, 800, 50);
      const EkJ = fix(mt * 1000 * G * h / 1000);
      return answer(sk, level, t('Une cabine de téléphérique de {m} monte de {h}. Quelle énergie potentielle gagne-t-elle ? Réponds en kJ.', { m: Q(mt, 't'), h: Q(h, 'm') }), EkJ, 'kJ', {
        traps: [[(mt * G * h) / 1000, 'ph_not_si'], [mt * h, 'ph_ep_forget_g']],
        solution: [first('E_p = m g h'), si(`${F('m')} = ${Q(mt, 't')} = ${Q(mt * 1000, 'kg')}`), L(`${F('E_p')} = ${Q(mt * 1000, 'kg')} · 10 N/kg · ${Q(h, 'm')} = ${Q(EkJ * 1000, 'J')}`), res('E_p', EkJ, 'kJ')],
        key: `t:${mt}:${h}`,
      });
    }
    const m = pg(rng, 20, 50, 5);
    const h = pg(rng, 3, 12, 1);
    const EkJ = fix((m * G * h) / 1000);
    return answer(sk, level, t('Un sac de ciment gagne {E} d\'énergie potentielle quand on le monte sur un échafaudage de {h}. Quelle est sa masse ?', { E: Q(EkJ, 'kJ'), h: Q(h, 'm') }), m, 'kg', {
      traps: [[EkJ / (G * h), 'ph_not_si'], [(EkJ * 1000) / h, 'ph_ep_forget_g']],
      solution: [first('E_p = m g h'), iso('m = E_p/(g h)'), si(`${F('E_p')} = ${Q(EkJ, 'kJ')} = ${Q(EkJ * 1000, 'J')}`), L(`${F('m')} = ${fr(Q(EkJ * 1000, 'J'), `10 N/kg · ${Q(h, 'm')}`)}`), res('m', m, 'kg')],
      key: `kJ:${EkJ}:${h}`,
    });
  }
  // Level 5.
  const v = rng.int(0, 3);
  if (v === 0) {
    const [a, za, b, zb] = rng.pick(PLACES);
    const m = pg(rng, 50, 85, 5);
    const dh = zb - za;
    const EkJ = fix((m * G * dh) / 1000);
    return answer(sk, level, t('Une randonneuse de {m} monte à pied. Départ : {a}, altitude {za}. Arrivée : {b}, altitude {zb}. De combien augmente son énergie potentielle ? Réponds en kJ.', { m: Q(m, 'kg'), a, za: Q(za, 'm'), b, zb: Q(zb, 'm') }), EkJ, 'kJ', {
      traps: [[(m * G * zb) / 1000, 'ph_height_altitude'], [(m * dh) / 1000, 'ph_ep_forget_g']],
      solution: [L(`${F('h')} = ${Q(zb, 'm')} − ${Q(za, 'm')} = ${Q(dh, 'm')}`, t('La hauteur dont elle monte : arrivée moins départ.')), first('E_p = m g h'), L(`${F('E_p')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(dh, 'm')} = ${Q(m * G * dh, 'J')}`), res('E_p', EkJ, 'kJ')],
      key: `alt:${a}:${m}`,
    });
  }
  if (v === 1) {
    const n = rng.int(6, 20);
    const m = pg(rng, 10, 50, 5);
    const h = pg(rng, 0.8, 1.6, 0.1);
    const E = fix(n * m * G * h);
    return answer(sk, level, t('Un ouvrier charge {n} sacs de {m} sur une remorque à {h} du sol. Quelle énergie totale a-t-il donnée aux sacs ?', { n, m: Q(m, 'kg'), h: Q(h, 'm') }), E, 'J', {
      traps: [[n * m * h, 'ph_ep_forget_g']],
      solution: [L(`${F('m')} = ${n} · ${Q(m, 'kg')} = ${Q(n * m, 'kg')}`, t('La masse totale des sacs.')), first('E_p = m g h'), L(`${F('E_p')} = ${Q(n * m, 'kg')} · 10 N/kg · ${Q(h, 'm')}`), res('E_p', E, 'J')],
      key: `n:${n}:${m}:${h}`,
    });
  }
  if (v === 2) {
    const m1 = pg(rng, 4, 20, 2);
    const h1 = pg(rng, 1, 5, 1);
    const same = rng.chance(0.5);
    const m2 = fix(m1 / 2);
    const h2 = same ? 2 * h1 : 2 * h1 + rng.pick([-1, 1]);
    const E1 = m1 * G * h1;
    const E2 = m2 * G * h2;
    const prompt = t('Vrai ou faux : un sac de {m1} posé à {h1} a autant d\'énergie potentielle qu\'un sac de {m2} posé à {h2}.', { m1: Q(m1, 'kg'), h1: Q(h1, 'm'), m2: Q(m2, 'kg'), h2: Q(h2, 'm') });
    const why = t('{Ep} : on compare {E1} et {E2}.', { Ep: F('E_p = m g h'), E1: Q(E1, 'J'), E2: Q(E2, 'J') });
    if (same) {
      return choice(sk, level, prompt, t('Vrai : {E} chacun', { E: Q(E1, 'J') }), [[t('Faux : le sac le plus lourd en a plus'), null], [t('Faux : le sac le plus haut en a plus'), null]], rng, { why, key: `cmp:${m1}:${h1}:${h2}` });
    }
    return choice(sk, level, prompt, t('Faux : {E1} contre {E2}', { E1: Q(E1, 'J'), E2: Q(E2, 'J') }), [[t('Vrai : la masse et la hauteur se compensent'), null], [t('Vrai : {E} chacun', { E: Q(Math.max(E1, E2), 'J') }), null]], rng, { why, key: `cmp:${m1}:${h1}:${h2}` });
  }
  const k = rng.pick([2, 3, 4]);
  return choice(sk, level, t('Vrai ou faux : si on monte le même sac {k} fois plus haut, son énergie potentielle est multipliée par {k}.', { k }),
    t('Vrai : {Ep} est proportionnelle à {h}', { Ep: F('E_p'), h: F('h') }),
    [[t('Faux : elle est multipliée par {k2}', { k2: k * k }), null], [t('Faux : elle ne dépend que de la masse'), null]], rng,
    { why: t('Dans {Ep}, {h} est un simple facteur : hauteur multipliée par {k}, énergie multipliée par {k}.', { Ep: F('E_p = m g h'), h: F('h'), k }), key: `prop:${k}` });
};

// ======================================================================
// ph-ec : E_c = ½ m v²
// ======================================================================

const EC_SITS = [
  { lv: 1, m: [5, 30, 1], v: [2, 6, 1], text: (x) => t('Un chariot de {m} roule à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 1, m: [25, 45, 1], v: [3, 6, 1], text: (x) => t('Un enfant de {m} file sur sa trottinette à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 1, m: [40, 90, 5], v: [4, 12, 1], text: (x) => t('Une luge de {m}, passager compris, glisse à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 1, m: [800, 1600, 100], v: [10, 30, 2], text: (x) => t('Une voiture de {m} roule à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 2, m: [0.41, 0.45, 0.01], v: [18, 32, 1], text: (x) => t('Un ballon de foot de {m} part à {v} après un tir. Quelle est son énergie cinétique ?', x) },
  { lv: 2, m: [70, 95, 1], v: [5.5, 9.5, 0.5], text: (x) => t('Une cycliste de {m}, vélo compris, roule à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 2, m: [2.5, 12.5, 0.5], v: [1.5, 4.5, 0.5], text: (x) => t('Un chariot de {m} roule à {v}. Quelle est son énergie cinétique ?', x) },
  { lv: 2, m: [0.15, 0.25, 0.01], v: [3.5, 9.5, 0.5], text: (x) => t('Une pomme de {m} tombe et atteint {v}. Quelle est son énergie cinétique ?', x) },
];

GEN['ph-ec'] = (level, rng) => {
  const sk = 'ph-ec';
  if (level <= 2) {
    const sits = EC_SITS.filter((s) => s.lv === level);
    const i = rng.int(0, sits.length - 1);
    const s = sits[i];
    const m = pg(rng, ...s.m);
    const v = pg(rng, ...s.v);
    const E = fix(0.5 * m * v * v);
    return answer(sk, level, s.text({ m: Q(m, 'kg'), v: Q(v, 'm/s') }), E, 'J', {
      traps: [[m * v * v, 'ph_ec_forget_half'], [0.5 * m * v, 'ph_ec_forget_square'], [m * v, 'ph_ec_forget_square']],
      solution: [first('E_c = 1/2 m v^2'), L(`${F('E_c')} = ½ · ${Q(m, 'kg')} · (${Q(v, 'm/s')})²`), res('E_c', E, 'J')],
      key: `${level}:${i}:${m}:${v}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const m = rng.pick([0.1, 0.15, 0.2, 0.25, 0.4, 0.5, 2, 4, 5]);
      const v = pg(rng, 2, 12, 1);
      const E = fix(0.5 * m * v * v);
      const pomme = m < 0.3 && rng.chance(0.5);
      const vars = { m: Q(m, 'kg'), E: Q(E, 'J') };
      const prompt = pomme ? t('Une pomme de {m} possède {E} d\'énergie cinétique. Quelle est sa vitesse ?', vars) : t('Une balle de {m} possède {E} d\'énergie cinétique. Quelle est sa vitesse ?', vars);
      return answer(sk, level, prompt, v, 'm/s', {
        traps: [[(2 * E) / m, 'ph_forget_sqrt'], [Math.sqrt(E / m), 'ph_ec_forget_half']],
        solution: [first('E_c = 1/2 m v^2'), iso('v = √((2 E_c)/m)'), L(`${F('v')} = √(2 · ${Q(E, 'J')} / ${Q(m, 'kg')})`), res('v', v, 'm/s')],
        key: `v:${pomme}:${m}:${E}`,
      });
    }
    const m = pg(rng, 5, 40, 1);
    const v = pg(rng, 2, 6, 0.5);
    const E = fix(0.5 * m * v * v);
    return answer(sk, level, t('Un chariot roule à {v} avec {E} d\'énergie cinétique. Quelle est sa masse ?', { v: Q(v, 'm/s'), E: Q(E, 'J') }), m, 'kg', {
      traps: [[E / (v * v), 'ph_ec_forget_half'], [(2 * E) / v, 'ph_ec_forget_square']],
      solution: [first('E_c = 1/2 m v^2'), iso('m = (2 E_c)/v^2'), L(`${F('m')} = ${fr(`2 · ${Q(E, 'J')}`, `(${Q(v, 'm/s')})²`)}`), res('m', m, 'kg')],
      key: `m:${v}:${E}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 3);
    if (w === 0) {
      const m = pg(rng, 900, 1600, 100);
      const vk = rng.pick([36, 54, 72, 90, 108, 126]);
      const v = vk / 3.6;
      const EkJ = fix((0.5 * m * v * v) / 1000);
      return answer(sk, level, t('Une voiture de {m} roule à {v}. Quelle est son énergie cinétique ? Réponds en kJ.', { m: Q(m, 'kg'), v: Q(vk, 'km/h') }), EkJ, 'kJ', {
        traps: [[(0.5 * m * vk * vk) / 1000, 'ph_kmh_not_converted'], [(0.5 * m * (vk * 3.6) ** 2) / 1000, 'speed_factor_wrong_way'], [(m * v * v) / 1000, 'ph_ec_forget_half']],
        solution: [first('E_c = 1/2 m v^2'), si(`${F('v')} = ${Q(vk, 'km/h')} = ${num(vk)} : 3,6 = ${Q(fix(v), 'm/s')}`), L(`${F('E_c')} = ½ · ${Q(m, 'kg')} · (${Q(fix(v), 'm/s')})² = ${Q(EkJ * 1000, 'J')}`), res('E_c', EkJ, 'kJ')],
        key: `car:${m}:${vk}`,
      });
    }
    if (w === 1) {
      const mg = pg(rng, 56, 59, 1);
      const v = pg(rng, 30, 60, 5);
      const m = fix(mg / 1000);
      const E = fix(0.5 * m * v * v);
      return answer(sk, level, t('Une balle de tennis de {m} est servie à {v}. Quelle est son énergie cinétique ?', { m: Q(mg, 'g'), v: Q(v, 'm/s') }), E, 'J', {
        traps: [[0.5 * mg * v * v, 'ph_gram_as_kg'], [m * v * v, 'ph_ec_forget_half']],
        solution: [first('E_c = 1/2 m v^2'), si(`${F('m')} = ${Q(mg, 'g')} = ${Q(m, 'kg')}`), L(`${F('E_c')} = ½ · ${Q(m, 'kg')} · (${Q(v, 'm/s')})²`), res('E_c', E, 'J')],
        key: `tennis:${mg}:${v}`,
      });
    }
    if (w === 2) {
      const m = pg(rng, 120, 200, 10);
      const vk = rng.pick([14.4, 18, 21.6, 25.2]);
      const v = fix(vk / 3.6);
      const E = fix(0.5 * m * v * v);
      return answer(sk, level, t('Un vélo cargo chargé, {m} au total, roule à {v}. Quelle est son énergie cinétique ?', { m: Q(m, 'kg'), v: Q(vk, 'km/h') }), E, 'J', {
        traps: [[0.5 * m * vk * vk, 'ph_kmh_not_converted'], [0.5 * m * (vk * 3.6) ** 2, 'speed_factor_wrong_way'], [m * v * v, 'ph_ec_forget_half']],
        solution: [first('E_c = 1/2 m v^2'), si(`${F('v')} = ${Q(vk, 'km/h')} = ${num(vk)} : 3,6 = ${Q(v, 'm/s')}`), L(`${F('E_c')} = ½ · ${Q(m, 'kg')} · (${Q(v, 'm/s')})²`), res('E_c', E, 'J')],
        key: `cargo:${m}:${vk}`,
      });
    }
    const m = pg(rng, 60, 90, 5);
    const v = pg(rng, 10, 25, 1);
    const EkJ = fix((0.5 * m * v * v) / 1000);
    const vk = fix(v * 3.6);
    return answer(sk, level, t('Un skieur de {m} a {E} d\'énergie cinétique. Quelle est sa vitesse, en km/h ?', { m: Q(m, 'kg'), E: Q(EkJ, 'kJ') }), vk, 'km/h', {
      traps: [[v, 'ph_kmh_not_converted'], [v / 3.6, 'speed_factor_wrong_way'], [Math.sqrt((2 * EkJ) / m) * 3.6, 'ph_not_si'], [((2 * EkJ * 1000) / m) * 3.6, 'ph_forget_sqrt']],
      solution: [first('E_c = 1/2 m v^2'), iso('v = √((2 E_c)/m)'), si(`${F('E_c')} = ${Q(EkJ, 'kJ')} = ${Q(EkJ * 1000, 'J')}`), L(`${F('v')} = √(2 · ${Q(EkJ * 1000, 'J')} / ${Q(m, 'kg')}) = ${Q(v, 'm/s')}`), res('v', vk, 'km/h', t('De m/s en km/h : × 3,6.'))],
      key: `ski:${m}:${v}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const k = rng.pick([2, 3]);
    return choice(sk, level, t('Vrai ou faux : si la vitesse d\'un chariot est multipliée par {k}, son énergie cinétique est aussi multipliée par {k}.', { k }),
      t('Faux : elle est multipliée par {k2}, car la vitesse compte au carré', { k2: k * k }),
      [[t('Vrai : l\'énergie cinétique est proportionnelle à la vitesse'), 'ph_ec_forget_square'], [t('Faux : elle ne change pas, la masse est la même'), null]], rng,
      { why: t('{Ec} : avec {k} fois la vitesse, {v2} est multiplié par {k2}.', { Ec: F('E_c = 1/2 m v^2'), v2: F('v^2'), k, k2: k * k }), key: `tfv:${k}` });
  }
  if (w === 1) {
    const k = rng.pick([2, 3]);
    return choice(sk, level, t('Vrai ou faux : si la masse d\'un chariot est multipliée par {k}, à la même vitesse, son énergie cinétique est multipliée par {k}.', { k }),
      t('Vrai : l\'énergie cinétique est proportionnelle à la masse'),
      [[t('Faux : elle est multipliée par {k2}', { k2: k * k }), null], [t('Faux : seule la vitesse compte'), null]], rng,
      { why: t('Dans {Ec}, la masse est un simple facteur ; seule la vitesse est au carré.', { Ec: F('E_c = 1/2 m v^2') }), key: `tfm:${k}` });
  }
  const [v1k, v2k] = rng.pick([[36, 72], [54, 90], [72, 108], [18, 54], [36, 90], [54, 108]]);
  const m = pg(rng, 900, 1500, 100);
  const v1 = v1k / 3.6;
  const v2 = v2k / 3.6;
  const dE = fix((0.5 * m * (v2 * v2 - v1 * v1)) / 1000);
  return answer(sk, level, t('Une voiture de {m} accélère de {v1} à {v2}. Quelle énergie supplémentaire faut-il lui fournir ? Réponds en kJ.', { m: Q(m, 'kg'), v1: Q(v1k, 'km/h'), v2: Q(v2k, 'km/h') }), dE, 'kJ', {
    traps: [[(0.5 * m * (v2 - v1) ** 2) / 1000, 'ph_ec_diff_square'], [(0.5 * m * (v2k * v2k - v1k * v1k)) / 1000, 'ph_kmh_not_converted']],
    solution: [
      si(`${Q(v1k, 'km/h')} = ${Q(fix(v1), 'm/s')} · ${Q(v2k, 'km/h')} = ${Q(fix(v2), 'm/s')}`),
      L(`Δ${F('E_c')} = ½ ${F('m')} ${F('v_2^2')} − ½ ${F('m')} ${F('v_1^2')}`, t('La différence des deux énergies cinétiques.')),
      L(`Δ${F('E_c')} = ½ · ${Q(m, 'kg')} · ((${num(fix(v2))})² − (${num(fix(v1))})²) = ${Q(dE * 1000, 'J')}`),
      L(`Δ${F('E_c')} ${R(dE, 'kJ')}`),
    ],
    key: `dE:${m}:${v1k}:${v2k}`,
  });
};

// ======================================================================
// ph-work : E = F d
// ======================================================================

const WORK_SITS = [
  { F: [[200, 800, 50], [215, 640, 5]], d: [[20, 200, 10], [12.5, 87.5, 2.5]], text: (x) => t('Un cheval tire une charrue avec une force de {F} sur {d}. Quelle énergie transfère-t-il ?', x) },
  { F: [[100, 300, 10], [85, 245, 5]], d: [[1, 6, 1], [1.2, 4.8, 0.2]], text: (x) => t('Noé pousse une armoire avec une force de {F} sur {d}. Quelle énergie transfère-t-il à l\'armoire ?', x) },
  { F: [[150, 400, 50], [165, 390, 5]], d: [[200, 1000, 100], [240, 960, 20]], text: (x) => t('Un téléski tire une skieuse avec une force de {F} sur {d}. Quelle énergie lui transfère-t-il ?', x) },
  { F: [null, [35.5, 62.5, 0.5]], d: [null, [8, 40, 2]], text: (x) => t('Pour pousser son vélo cargo en panne, Lina exerce une force de {F} sur {d}. Quelle énergie transfère-t-elle ?', x) },
];

GEN['ph-work'] = (level, rng) => {
  const sk = 'ph-work';
  if (level <= 2) {
    const sits = WORK_SITS.filter((s) => s.F[level - 1]);
    const i = rng.int(0, sits.length - 1);
    const s = sits[i];
    const Fv = pg(rng, ...s.F[level - 1]);
    const d = pg(rng, ...s.d[level - 1]);
    const E = fix(Fv * d);
    return answer(sk, level, s.text({ F: Q(Fv, 'N'), d: Q(d, 'm') }), E, 'J', {
      traps: [[Fv / d, 'iso_wrong_inverse']],
      solution: [first('E = F d'), L(`${F('E')} = ${Q(Fv, 'N')} · ${Q(d, 'm')}`), res('E', E, 'J', t('Des N·m, c\'est-à-dire des joules.'))],
      key: `${i}:${Fv}:${d}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const Fv = pg(rng, 200, 1500, 50);
      const d = pg(rng, 2, 12, 1);
      const E = fix(Fv * d);
      return answer(sk, level, t('Un treuil transfère {E} à un bateau en le tirant sur {d} de rampe. Quelle force exerce-t-il ?', { E: Q(E, 'J'), d: Q(d, 'm') }), Fv, 'N', {
        traps: [[d / E, 'ph_iso_flip'], [E * d, 'iso_wrong_inverse']],
        solution: [first('E = F d'), iso('F = E/d'), L(`${F('F')} = ${fr(Q(E, 'J'), Q(d, 'm'))}`), res('F', Fv, 'N')],
        key: `F:${E}:${d}`,
      });
    }
    const Fv = pg(rng, 800, 3000, 100);
    const d = pg(rng, 5, 60, 5);
    const E = fix(Fv * d);
    return answer(sk, level, t('Une dépanneuse tire une voiture avec une force de {F} et lui transfère {E}. Sur quelle distance l\'a-t-elle tirée ?', { F: Q(Fv, 'N'), E: Q(E, 'J') }), d, 'm', {
      traps: [[Fv / E, 'ph_iso_flip'], [E * Fv, 'iso_wrong_inverse']],
      solution: [first('E = F d'), iso('d = E/F'), L(`${F('d')} = ${fr(Q(E, 'J'), Q(Fv, 'N'))}`), res('d', d, 'm')],
      key: `d:${E}:${Fv}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const Fv = pg(rng, 300, 600, 20);
      const dk = pg(rng, 2, 15, 0.5);
      const E = fix(Fv * dk * 1000);
      return answer(sk, level, t('Des chiens de traîneau tirent avec une force de {F} sur {d}. Quelle énergie transfèrent-ils au traîneau ?', { F: Q(Fv, 'N'), d: Q(dk, 'km') }), E, 'J', {
        traps: [[Fv * dk, 'ph_not_si']],
        solution: [first('E = F d'), si(`${F('d')} = ${Q(dk, 'km')} = ${Q(dk * 1000, 'm')}`), L(`${F('E')} = ${Q(Fv, 'N')} · ${Q(dk * 1000, 'm')}`), res('E', E, 'J')],
        key: `km:${Fv}:${dk}`,
      });
    }
    if (w === 1) {
      const d = pg(rng, 10, 60, 5);
      const Fv = pg(rng, 40, 200, 10);
      const EkJ = fix((Fv * d) / 1000);
      return answer(sk, level, t('En poussant un chariot sur {d}, un magasinier lui transfère {E}. Quelle force exerce-t-il ?', { d: Q(d, 'm'), E: Q(EkJ, 'kJ') }), Fv, 'N', {
        traps: [[EkJ / d, 'ph_not_si'], [d / (EkJ * 1000), 'ph_iso_flip']],
        solution: [first('E = F d'), iso('F = E/d'), si(`${F('E')} = ${Q(EkJ, 'kJ')} = ${Q(EkJ * 1000, 'J')}`), L(`${F('F')} = ${fr(Q(EkJ * 1000, 'J'), Q(d, 'm'))}`), res('F', Fv, 'N')],
        key: `kJ:${d}:${EkJ}`,
      });
    }
    const Fv = pg(rng, 100, 250, 10);
    const dc = pg(rng, 40, 70, 5);
    const E = fix((Fv * dc) / 100);
    return answer(sk, level, t('Pour bander un arc, on tire la corde avec une force moyenne de {F} sur {d}. Quelle énergie transfère-t-on à l\'arc ?', { F: Q(Fv, 'N'), d: Q(dc, 'cm') }), E, 'J', {
      traps: [[Fv * dc, 'ph_not_si']],
      solution: [first('E = F d'), si(`${F('d')} = ${Q(dc, 'cm')} = ${Q(dc / 100, 'm')}`), L(`${F('E')} = ${Q(Fv, 'N')} · ${Q(dc / 100, 'm')}`), res('E', E, 'J')],
      key: `cm:${Fv}:${dc}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const m = pg(rng, 200, 800, 50);
    const h = pg(rng, 5, 30, 1);
    const EkJ = fix((m * G * h) / 1000);
    return answer(sk, level, t('Une grue soulève une poutre de {m} de {h} à vitesse constante : sa force est égale au poids de la poutre. Quelle énergie transfère-t-elle ? Réponds en kJ.', { m: Q(m, 'kg'), h: Q(h, 'm') }), EkJ, 'kJ', {
      traps: [[(m * h) / 1000, 'ph_ep_forget_g']],
      solution: [L(`${F('F = m g')} = ${Q(m, 'kg')} · 10 N/kg = ${Q(m * G, 'N')}`, t('Le poids de la poutre.')), first('E = F d'), L(`${F('E')} = ${Q(m * G, 'N')} · ${Q(h, 'm')} = ${Q(m * G * h, 'J')}`), res('E', EkJ, 'kJ')],
      key: `crane:${m}:${h}`,
    });
  }
  if (w === 1) {
    const k = rng.pick([2, 3]);
    return choice(sk, level, t('On veut transférer la même énergie, mais sur une distance {k} fois plus courte. Que doit faire la force ?', { k }),
      t('Être {k} fois plus grande : {Fd} reste le même', { k, Fd: F('F d') }),
      [[t('Être {k} fois plus petite', { k }), 'ph_iso_flip'], [t('Rester la même : l\'énergie ne change pas'), null]], rng,
      { why: t('{EFd} : si {d} est divisée par {k}, {F} doit être multipliée par {k} pour garder le même produit.', { EFd: F('E = F d'), d: F('d'), F: F('F'), k }), key: `inv:${k}` });
  }
  const Fv = pg(rng, 20, 60, 5);
  const d = pg(rng, 100, 500, 50);
  const E = Fv * d;
  return choice(sk, level, t('Mia tire une luge avec une force de {F} sur {d}, puis la ramène vide sur le même chemin avec une force deux fois plus petite. Quelle énergie a-t-elle transférée en tout ?', { F: Q(Fv, 'N'), d: Q(d, 'm') }),
    Q(fix(1.5 * E), 'J'), [[Q(fix(E), 'J'), null], [Q(fix(2 * E), 'J'), null], [Q(fix(0.5 * E), 'J'), null]], rng,
    { why: t('Aller : {E1}. Retour : {E2}. En tout : {E}.', { E1: Q(E, 'J'), E2: Q(E / 2, 'J'), E: Q(1.5 * E, 'J') }), key: `luge:${Fv}:${d}` });
};

// ======================================================================
// ph-power : P = E/t, P = F v
// ======================================================================

const POWER_SITS = [
  { P: [200, 3000, 100], t: [10, 60, 5], text: (x) => t('Un monte-charge fournit {E} en {t}. Quelle est sa puissance ?', x) },
  { P: [300, 900, 50], t: [20, 90, 5], text: (x) => t('Un mixeur consomme {E} en {t}. Quelle est sa puissance ?', x) },
  { P: [400, 1200, 50], t: [6, 20, 1], text: (x) => t('En montant un escalier, une sportive fournit {E} en {t}. Quelle est sa puissance moyenne ?', x) },
];

GEN['ph-power'] = (level, rng) => {
  const sk = 'ph-power';
  if (level === 1 || (level === 2 && rng.chance(0.5))) {
    const i = rng.int(0, POWER_SITS.length - 1);
    const s = POWER_SITS[i];
    const P = level === 1 ? pg(rng, ...s.P) : pg(rng, s.P[0] + 5, s.P[1], 5);
    const tt = level === 1 ? pg(rng, ...s.t) : pg(rng, s.t[0], s.t[1], 1);
    const E = fix(P * tt);
    return answer(sk, level, s.text({ E: Q(E, 'J'), t: Q(tt, 's') }), P, 'W', {
      traps: [[E * tt, 'ph_power_times'], [tt / E, 'ph_iso_flip']],
      solution: [first('P = E/t'), L(`${F('P')} = ${fr(Q(E, 'J'), Q(tt, 's'))}`), res('P', P, 'W', t('Des joules par seconde : des watts.'))],
      key: `${level}:${i}:${E}:${tt}`,
    });
  }
  if (level === 2) {
    if (rng.chance(0.5)) {
      const Fv = pg(rng, 15, 40, 1);
      const v = pg(rng, 5, 10, 0.5);
      const P = fix(Fv * v);
      return answer(sk, level, t('Une cycliste roule à {v} contre une force de résistance (air et frottements) de {F}. Quelle puissance développe-t-elle ?', { v: Q(v, 'm/s'), F: Q(Fv, 'N') }), P, 'W', {
        traps: [[Fv / v, 'iso_wrong_inverse']],
        solution: [first('P = F v'), L(`${F('P')} = ${Q(Fv, 'N')} · ${Q(v, 'm/s')}`), res('P', P, 'W')],
        key: `bike:${Fv}:${v}`,
      });
    }
    const Fv = pg(rng, 2000, 6000, 500);
    const v = pg(rng, 1.5, 5, 0.5);
    const P = fix(Fv * v);
    return answer(sk, level, t('Un tracteur tire une remorque avec une force de {F} à {v}. Quelle puissance développe-t-il ?', { v: Q(v, 'm/s'), F: Q(Fv, 'N') }), P, 'W', {
      traps: [[Fv / v, 'iso_wrong_inverse']],
      solution: [first('P = F v'), L(`${F('P')} = ${Q(Fv, 'N')} · ${Q(v, 'm/s')}`), res('P', P, 'W')],
      key: `tractor:${Fv}:${v}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const P = pg(rng, 150, 300, 10);
      const tt = pg(rng, 60, 600, 30);
      const E = fix(P * tt);
      return answer(sk, level, t('Un cycliste développe {P} pendant {t}. Quelle énergie fournit-il ?', { P: Q(P, 'W'), t: Q(tt, 's') }), E, 'J', {
        traps: [[P / tt, 'iso_wrong_inverse'], [tt / P, 'ph_iso_flip']],
        solution: [first('P = E/t'), iso('E = P t'), L(`${F('E')} = ${Q(P, 'W')} · ${Q(tt, 's')}`), res('E', E, 'J')],
        key: `E:${P}:${tt}`,
      });
    }
    const P = pg(rng, 500, 4000, 250);
    const tt = pg(rng, 20, 300, 10);
    const E = fix(P * tt);
    return answer(sk, level, t('Un moteur de {P} doit fournir {E}. Combien de temps lui faut-il ?', { P: Q(P, 'W'), E: Q(E, 'J') }), tt, 's', {
      traps: [[E * P, 'ph_power_times'], [P / E, 'ph_iso_flip']],
      solution: [first('P = E/t'), iso('t = E/P'), L(`${F('t')} = ${fr(Q(E, 'J'), Q(P, 'W'))}`), res('t', tt, 's')],
      key: `t:${P}:${E}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 3);
    if (w === 0) {
      const P = pg(rng, 200, 1500, 50);
      const tm = rng.int(2, 10);
      const EkJ = fix((P * tm * 60) / 1000);
      return answer(sk, level, t('Un monte-charge fournit {E} en {t}. Quelle est sa puissance ?', { E: Q(EkJ, 'kJ'), t: Q(tm, 'min') }), P, 'W', {
        traps: [[(EkJ * 1000) / tm, 'ph_not_si'], [EkJ / (tm * 60), 'ph_not_si'], [EkJ * 1000 * tm * 60, 'ph_power_times']],
        solution: [first('P = E/t'), si(`${F('E')} = ${Q(EkJ, 'kJ')} = ${Q(EkJ * 1000, 'J')} · ${F('t')} = ${Q(tm, 'min')} = ${Q(tm * 60, 's')}`), L(`${F('P')} = ${fr(Q(EkJ * 1000, 'J'), Q(tm * 60, 's'))}`), res('P', P, 'W')],
        key: `kJmin:${EkJ}:${tm}`,
      });
    }
    if (w === 1) {
      const PkW = rng.pick([1.5, 2, 2.5, 3, 4, 5]);
      const tmin = rng.int(4, 20);
      const EMJ = fix((PkW * 1000 * tmin * 60) / 1e6);
      return answer(sk, level, t('Un moteur de {P} doit fournir {E}. Combien de temps lui faut-il, en minutes ?', { P: Q(PkW, 'kW'), E: Q(EMJ, 'MJ') }), tmin, 'min', {
        traps: [[EMJ / PkW, 'ph_not_si'], [(EMJ * 1e6 * PkW * 1000) / 60, 'ph_power_times']],
        solution: [first('P = E/t'), iso('t = E/P'), si(`${F('E')} = ${Q(EMJ, 'MJ')} = ${Q(EMJ * 1e6, 'J')} · ${F('P')} = ${Q(PkW, 'kW')} = ${Q(PkW * 1000, 'W')}`), L(`${F('t')} = ${fr(Q(EMJ * 1e6, 'J'), Q(PkW * 1000, 'W'))} = ${Q(tmin * 60, 's')}`), res('t', tmin, 'min')],
        key: `MJ:${PkW}:${EMJ}`,
      });
    }
    if (w === 2) {
      const mm = rng.pick([15, 30, 45]);
      const tt = 3600 + mm * 60;
      const P = pg(rng, 200, 1500, 50);
      const EMJ = fix((P * tt) / 1e6);
      return answer(sk, level, t('Une pompe fonctionne pendant 1 h {mm} min et fournit {E}. Quelle est sa puissance moyenne ?', { mm, E: Q(EMJ, 'MJ') }), P, 'W', {
        traps: [[(EMJ * 1e6) / ((1 + mm / 100) * 3600), 'ph_minutes_decimal'], [(EMJ * 1e6) / (1 + mm / 60), 'ph_not_si'], [EMJ / tt, 'ph_not_si']],
        solution: [first('P = E/t'), si(`${F('t')} = 1 h ${mm} min = ${Q(tt, 's')} · ${F('E')} = ${Q(EMJ * 1e6, 'J')}`), L(`${F('P')} = ${fr(Q(EMJ * 1e6, 'J'), Q(tt, 's'))}`), res('P', P, 'W')],
        key: `pump:${mm}:${EMJ}`,
      });
    }
    const vk = rng.pick([18, 21.6, 25.2]);
    const v = fix(vk / 3.6);
    const Fv = pg(rng, 20, 40, 2);
    const P = fix(Fv * v);
    return answer(sk, level, t('Un vélo électrique roule à {v} ; l\'air et la route le freinent avec une force de {F}. Quelle puissance faut-il pour garder cette vitesse ?', { v: Q(vk, 'km/h'), F: Q(Fv, 'N') }), P, 'W', {
      traps: [[Fv * vk, 'ph_kmh_not_converted'], [Fv * vk * 3.6, 'speed_factor_wrong_way']],
      solution: [first('P = F v'), si(`${F('v')} = ${Q(vk, 'km/h')} = ${Q(v, 'm/s')}`), L(`${F('P')} = ${Q(Fv, 'N')} · ${Q(v, 'm/s')}`), res('P', P, 'W')],
      key: `ebike:${vk}:${Fv}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 3);
  if (w === 0) {
    const m = pg(rng, 100, 300, 10);
    const h = pg(rng, 3, 12, 1);
    const tt = pg(rng, 10, 40, 5);
    const P = fix((m * G * h) / tt);
    return answer(sk, level, t('Un treuil monte {m} de sacs sur {h} en {t}. Quelle est la puissance minimale de son moteur ?', { m: Q(m, 'kg'), h: Q(h, 'm'), t: Q(tt, 's') }), P, 'W', {
      traps: [[(m * h) / tt, 'ph_ep_forget_g'], [m * G * h * tt, 'ph_power_times']],
      solution: [first('E = m g h'), L(`${F('E')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')} = ${Q(m * G * h, 'J')}`), first('P = E/t'), L(`${F('P')} = ${fr(Q(m * G * h, 'J'), Q(tt, 's'))}`), res('P', P, 'W')],
      key: `winch:${m}:${h}:${tt}`,
    });
  }
  if (w === 1) {
    const m = pg(rng, 500, 1000, 50);
    const h = pg(rng, 6, 30, 3);
    const tt = pg(rng, 10, 30, 2);
    const PkW = fix((m * G * h) / tt / 1000);
    return answer(sk, level, t('Un ascenseur de {m}, passagers compris, monte de {h} en {t}. Quelle puissance moyenne développe-t-il ? Réponds en kW.', { m: Q(m, 'kg'), h: Q(h, 'm'), t: Q(tt, 's') }), PkW, 'kW', {
      traps: [[(m * h) / tt / 1000, 'ph_ep_forget_g'], [(m * G * h * tt) / 1000, 'ph_power_times']],
      solution: [first('E = m g h'), L(`${F('E')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')} = ${Q(m * G * h, 'J')}`), first('P = E/t'), L(`${F('P')} = ${fr(Q(m * G * h, 'J'), Q(tt, 's'))} = ${Q(fix(PkW * 1000), 'W')}`), res('P', PkW, 'kW')],
      key: `lift:${m}:${h}:${tt}`,
    });
  }
  const m = pg(rng, 100, 250, 50);
  const h = pg(rng, 3, 4.5, 0.5);
  const [t1, t2] = rng.pick([[2, 5], [3, 6], [2, 4], [4, 7]]);
  const vars = { m: Q(m, 'kg'), h: Q(h, 'm'), t1: Q(t1, 'min'), t2: Q(t2, 'min') };
  if (w === 2) {
    return choice(sk, level, t('Deux personnes montent chacune {m} de farine au premier étage ({h}). L\'une met {t1}, l\'autre {t2}. Laquelle a fourni le plus d\'énergie ?', vars),
      t('Les deux autant : {Ep} ne dépend pas de la durée', { Ep: F('m g h') }),
      [[t('Celle qui met {t1} : elle va plus vite', vars), null], [t('Celle qui met {t2} : elle travaille plus longtemps', vars), 'ph_power_times']], rng,
      { why: t('Même masse, même hauteur : même énergie, {E}. La durée change la puissance, pas l\'énergie.', { E: Q(m * G * h, 'J') }), key: `who-E:${m}:${h}:${t1}:${t2}` });
  }
  return choice(sk, level, t('Deux personnes montent chacune {m} de farine au premier étage ({h}). L\'une met {t1}, l\'autre {t2}. Laquelle a développé la plus grande puissance ?', vars),
    t('Celle qui met {t1} : même énergie en moins de temps', vars),
    [[t('Celle qui met {t2} : elle travaille plus longtemps', vars), 'ph_power_times'], [t('Les deux autant : elles ont fourni la même énergie'), null]], rng,
    { why: t('{P} : même énergie, divisée par un temps plus court, donne une puissance plus grande.', { P: F('P = E/t') }), key: `who-P:${m}:${h}:${t1}:${t2}` });
};

// ======================================================================
// ph-elec-power : P = U I
// ======================================================================

const EP1 = [
  { U: [12, 24], I: [1, 5, 1], text: (x) => t('Un ventilateur fonctionne sous {U} et consomme {I}. Quelle est sa puissance ?', x) },
  { U: [230], I: [2, 9, 1], text: (x) => t('Un radiateur branché sur {U} est traversé par un courant de {I}. Quelle est sa puissance ?', x) },
  { U: [230], I: [2, 4, 1], text: (x) => t('Une perceuse fonctionne sous {U} avec un courant de {I}. Quelle est sa puissance ?', x) },
];
const EP2 = [
  { U: [230], I: [0.02, 0.2, 0.01], text: (x) => t('Une lampe LED fonctionne sous {U} avec un courant de {I}. Quelle est sa puissance ?', x) },
  { U: [12], I: [3.5, 5.5, 0.5], text: (x) => t('Un phare de voiture fonctionne sous {U} et consomme {I}. Quelle est sa puissance ?', x) },
  { U: [5], I: [0.5, 3, 0.1], text: (x) => t('Un chargeur USB fournit {I} sous {U}. Quelle puissance fournit-il ?', x) },
  { U: [36, 48], I: [4.5, 12.5, 0.5], text: (x) => t('Le moteur d\'une trottinette électrique fonctionne sous {U} et consomme {I}. Quelle est sa puissance ?', x) },
];

GEN['ph-elec-power'] = (level, rng) => {
  const sk = 'ph-elec-power';
  if (level <= 2) {
    const list = level === 1 ? EP1 : EP2;
    const i = rng.int(0, list.length - 1);
    const s = list[i];
    const U = rng.pick(s.U);
    const I = pg(rng, ...s.I);
    const P = fix(U * I);
    return answer(sk, level, s.text({ U: Q(U, 'V'), I: Q(I, 'A') }), P, 'W', {
      traps: [[U / I, 'ph_elec_divide'], [I / U, 'ph_elec_divide']],
      solution: [first('P = U I'), L(`${F('P')} = ${Q(U, 'V')} · ${Q(I, 'A')}`), res('P', P, 'W')],
      key: `${level}:${i}:${U}:${I}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const P = rng.pick([800, 1000, 1200, 1500, 1800, 2000, 2200, 2400]);
      const I = fix(P / 230);
      return answer(sk, level, t('Une plaque de cuisson de {P} fonctionne sous {U}. Quel courant la traverse ?', { P: Q(P, 'W'), U: Q(230, 'V') }), I, 'A', {
        traps: [[P * 230, 'iso_wrong_inverse'], [230 / P, 'ph_iso_flip']],
        solution: [first('P = U I'), iso('I = P/U'), L(`${F('I')} = ${fr(Q(P, 'W'), Q(230, 'V'))}`), res('I', I, 'A')],
        key: `I:${P}`,
      });
    }
    const I = pg(rng, 2, 15, 0.5);
    const U = rng.pick([12, 24, 36, 48]);
    const P = fix(U * I);
    return answer(sk, level, t('Un moteur de {P} consomme un courant de {I}. Sous quelle tension fonctionne-t-il ?', { P: Q(P, 'W'), I: Q(I, 'A') }), U, 'V', {
      traps: [[P * I, 'iso_wrong_inverse'], [I / P, 'ph_iso_flip']],
      solution: [first('P = U I'), iso('U = P/I'), L(`${F('U')} = ${fr(Q(P, 'W'), Q(I, 'A'))}`), res('U', U, 'V')],
      key: `U:${P}:${I}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const ImA = pg(rng, 500, 3000, 100);
      const U = rng.pick([5, 9, 12]);
      const P = fix((U * ImA) / 1000);
      return answer(sk, level, t('Un chargeur de téléphone fournit {I} sous {U}. Quelle puissance fournit-il ?', { I: Q(ImA, 'mA'), U: Q(U, 'V') }), P, 'W', {
        traps: [[U * ImA, 'ph_not_si'], [U / (ImA / 1000), 'ph_elec_divide']],
        solution: [first('P = U I'), si(`${F('I')} = ${Q(ImA, 'mA')} = ${Q(ImA / 1000, 'A')}`), L(`${F('P')} = ${Q(U, 'V')} · ${Q(ImA / 1000, 'A')}`), res('P', P, 'W')],
        key: `mA:${ImA}:${U}`,
      });
    }
    if (w === 1) {
      const PkW = rng.pick([1.8, 2, 2.3, 2.5, 3, 3.5]);
      const I = fix((PkW * 1000) / 230);
      return answer(sk, level, t('Un four de {P} est branché sur {U}. Quel courant le traverse ?', { P: Q(PkW, 'kW'), U: Q(230, 'V') }), I, 'A', {
        traps: [[PkW / 230, 'ph_not_si'], [230 / (PkW * 1000), 'ph_iso_flip']],
        solution: [first('P = U I'), iso('I = P/U'), si(`${F('P')} = ${Q(PkW, 'kW')} = ${Q(PkW * 1000, 'W')}`), L(`${F('I')} = ${fr(Q(PkW * 1000, 'W'), Q(230, 'V'))}`), res('I', I, 'A')],
        key: `kW:${PkW}`,
      });
    }
    const P = pg(rng, 4, 12, 1);
    const ImA = fix((P / 230) * 1000);
    return answer(sk, level, t('Une ampoule LED de {P} fonctionne sous {U}. Quel courant la traverse, en mA ?', { P: Q(P, 'W'), U: Q(230, 'V') }), ImA, 'mA', {
      traps: [[P / 230, 'ph_not_si'], [(230 / P) * 1000, 'ph_iso_flip']],
      solution: [first('P = U I'), iso('I = P/U'), L(`${F('I')} = ${fr(Q(P, 'W'), Q(230, 'V'))} ${R(P / 230, 'A')}`), L(`${F('I')} ${R(ImA, 'mA')}`, t('1 A = 1000 mA.'))],
      key: `led:${P}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const P1 = rng.pick([1800, 2000, 2200, 2400]);
    const P2 = rng.pick([700, 800, 900, 1000, 1200]);
    const I = fix((P1 + P2) / 230);
    return answer(sk, level, t('Sur une prise de {U}, on branche une bouilloire de {P1} et un grille-pain de {P2}. Quel courant total passe dans la prise ?', { U: Q(230, 'V'), P1: Q(P1, 'W'), P2: Q(P2, 'W') }), I, 'A', {
      traps: [[230 / (P1 + P2), 'ph_iso_flip'], [(P1 + P2) * 230, 'iso_wrong_inverse']],
      solution: [L(`${F('P')} = ${Q(P1, 'W')} + ${Q(P2, 'W')} = ${Q(P1 + P2, 'W')}`, t('Les puissances s\'additionnent.')), iso('I = P/U'), L(`${F('I')} = ${fr(Q(P1 + P2, 'W'), Q(230, 'V'))}`), res('I', I, 'A')],
      key: `sum:${P1}:${P2}`,
    });
  }
  if (w === 1) {
    const Imax = rng.pick([10, 13, 16]);
    let P1; let P2; let I;
    do {
      P1 = rng.pick([1000, 1500, 2000, 2200]);
      P2 = rng.pick([500, 800, 1200, 1500, 2000]);
      I = (P1 + P2) / 230;
    } while (Math.abs(I - Imax) < 0.6);
    const vars = { I: num(fix(Number(I.toFixed(1)))), Imax };
    const ok = I < Imax;
    const yes = t('Oui : le courant total vaut {I} A, moins que {Imax} A', vars);
    const no = t('Non : le courant total vaut {I} A, plus que {Imax} A', vars);
    return choice(sk, level, t('Une prise de {U} est protégée par un fusible de {Imax} A. Peut-on y brancher en même temps un radiateur de {P1} et une bouilloire de {P2} ?', { U: Q(230, 'V'), Imax, P1: Q(P1, 'W'), P2: Q(P2, 'W') }),
      ok ? yes : no, [[ok ? no : yes, null], [t('On ne peut pas savoir sans connaître la résistance des appareils'), null]], rng,
      { why: t('{I} : ({P1} + {P2}) / 230 V ≈ {Iv} A.', { I: F('I = P/U'), P1: Q(P1, 'W'), P2: Q(P2, 'W'), Iv: vars.I }), key: `fuse:${Imax}:${P1}:${P2}` });
  }
  const P1 = rng.pick([1800, 2000, 2200]);
  const P2 = rng.pick([5, 8, 10, 60]);
  return choice(sk, level, t('Une bouilloire de {P1} et une lampe de {P2} sont branchées sur {U}. Laquelle est traversée par le plus grand courant ?', { P1: Q(P1, 'W'), P2: Q(P2, 'W'), U: Q(230, 'V') }),
    t('La bouilloire : à tension égale, {I} grandit avec la puissance', { I: F('I = P/U') }),
    [[t('La lampe : moins de puissance, donc plus de courant'), 'ph_iso_flip'], [t('Les deux autant : elles ont la même tension'), null]], rng,
    { why: t('Bouilloire : {I1} A ; lampe : {I2} A.', { I1: num(fix(Number((P1 / 230).toFixed(1)))), I2: num(fix(Number((P2 / 230).toFixed(3)))) }), key: `which:${P1}:${P2}` });
};

// ======================================================================
// ph-elec-energy : E = P t = U I t, Wh, Ah
// ======================================================================

GEN['ph-elec-energy'] = (level, rng) => {
  const sk = 'ph-elec-energy';
  if (level === 1) {
    if (rng.chance(0.5)) {
      const P = rng.pick([5, 8, 10, 15, 20, 40, 60, 100]);
      const tt = pg(rng, 60, 900, 60);
      const E = P * tt;
      return answer(sk, level, t('Une ampoule de {P} reste allumée pendant {t}. Quelle énergie consomme-t-elle ?', { P: Q(P, 'W'), t: Q(tt, 's') }), E, 'J', {
        traps: [[P / tt, 'iso_wrong_inverse'], [tt / P, 'ph_iso_flip']],
        solution: [first('E = P t'), L(`${F('E')} = ${Q(P, 'W')} · ${Q(tt, 's')}`), res('E', E, 'J', t('Un watt pendant une seconde, c\'est un joule.'))],
        key: `lamp:${P}:${tt}`,
      });
    }
    const U = rng.pick([6, 12, 24]);
    const I = pg(rng, 1, 5, 1);
    const tt = pg(rng, 10, 120, 10);
    const E = U * I * tt;
    return answer(sk, level, t('Un petit moteur fonctionne sous {U} avec un courant de {I} pendant {t}. Quelle énergie consomme-t-il ?', { U: Q(U, 'V'), I: Q(I, 'A'), t: Q(tt, 's') }), E, 'J', {
      traps: [[(U / I) * tt, 'ph_elec_divide']],
      solution: [first('E = U I t'), L(`${F('E')} = ${Q(U, 'V')} · ${Q(I, 'A')} · ${Q(tt, 's')}`), res('E', E, 'J')],
      key: `UIt:${U}:${I}:${tt}`,
    });
  }
  if (level === 2) {
    if (rng.chance(0.5)) {
      const P = rng.pick([5, 7, 9, 12, 15, 40, 60]);
      const h = pg(rng, 2, 8, 0.5);
      const E = fix(P * h);
      return answer(sk, level, t('Une ampoule de {P} fonctionne {t}. Quelle énergie consomme-t-elle, en Wh ?', { P: Q(P, 'W'), t: Q(h, 'h') }), E, 'Wh', {
        traps: [[P * h * 3600, 'ph_wh_forget_3600'], [P / h, 'iso_wrong_inverse']],
        solution: [first('E = P t'), L(`${F('E')} = ${Q(P, 'W')} · ${Q(h, 'h')}`), res('E', E, 'Wh', t('Des watts fois des heures : des wattheures.'))],
        key: `Wh:${P}:${h}`,
      });
    }
    const [U, Qa] = rng.pick([[3.7, 4], [3.7, 5], [12, 7], [12, 50], [36, 10], [36, 13], [48, 17.5], [48, 10]]);
    const E = fix(U * Qa);
    return answer(sk, level, t('Une batterie porte l\'inscription « {U} — {Q} ». Quelle énergie stocke-t-elle, en Wh ?', { U: Q(U, 'V'), Q: Q(Qa, 'Ah') }), E, 'Wh', {
      traps: [[U / Qa, 'ph_elec_divide'], [U * Qa * 3600, 'ph_wh_forget_3600']],
      solution: [first('E = U I t'), L(`${F('E')} = ${Q(U, 'V')} · ${Q(Qa, 'Ah')}`, t('Les Ah sont déjà des ampères fois des heures.')), res('E', E, 'Wh')],
      key: `bat:${U}:${Qa}`,
    });
  }
  if (level === 3) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const U = rng.pick([12, 24]);
      const I = pg(rng, 1.5, 4.5, 0.5);
      const h = rng.int(1, 5);
      const E = fix(U * I * h * 3600);
      return answer(sk, level, t('Un ventilateur ({U}, {I}) tourne pendant {t}. Quelle énergie a-t-il consommée, en joules ?', { U: Q(U, 'V'), I: Q(I, 'A'), t: Q(h, 'h') }), E, 'J', {
        traps: [[U * I * h, 'ph_not_si'], [U * I * h * 60, 'ph_not_si']],
        solution: [first('E = U I t'), si(`${F('t')} = ${Q(h, 'h')} = ${Q(h * 3600, 's')}`), L(`${F('E')} = ${Q(U, 'V')} · ${Q(I, 'A')} · ${Q(h * 3600, 's')}`), res('E', E, 'J')],
        key: `fan:${U}:${I}:${h}`,
      });
    }
    if (w === 1) {
      const Wh = pg(rng, 200, 750, 50);
      const E = Wh * 3600;
      return answer(sk, level, t('La batterie d\'un vélo électrique stocke {E}. Combien de joules cela fait-il ?', { E: Q(Wh, 'Wh') }), E, 'J', {
        traps: [[Wh, 'ph_wh_forget_3600'], [Wh * 60, 'ph_wh_forget_3600'], [Wh / 3600, 'convert_wrong_direction']],
        solution: [L(`1 Wh = 1 W · 3600 s = 3600 J`), L(`${F('E')} = ${num(Wh)} · 3600 J`), res('E', E, 'J')],
        key: `WhJ:${Wh}`,
      });
    }
    const [U, Qa] = rng.pick([[36, 10], [36, 12], [48, 10], [48, 14], [24, 20], [12, 60]]);
    const E = U * Qa * 3600;
    return answer(sk, level, t('Une batterie porte l\'inscription « {U} — {Q} ». Quelle énergie stocke-t-elle, en joules ?', { U: Q(U, 'V'), Q: Q(Qa, 'Ah') }), E, 'J', {
      traps: [[U * Qa, 'ph_wh_forget_3600']],
      solution: [L(`${F('E')} = ${Q(U, 'V')} · ${Q(Qa, 'Ah')} = ${Q(U * Qa, 'Wh')}`), L(`${Q(U * Qa, 'Wh')} = ${num(U * Qa)} · 3600 J`, t('1 Wh = 3600 J.')), res('E', E, 'J')],
      key: `batJ:${U}:${Qa}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const U = rng.pick([12, 24, 36]);
      const I = rng.pick([2, 4, 5, 8, 10]);
      const h = rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const E = U * I * h * 3600;
      return answer(sk, level, t('Une batterie stocke {E} sous {U}. Pendant combien de temps peut-elle fournir un courant de {I} ? Réponds en heures.', { E: Q(E, 'J'), U: Q(U, 'V'), I: Q(I, 'A') }), h, 'h', {
        traps: [[E / (U * I), 'ph_wh_forget_3600'], [(U * I) / E, 'ph_iso_flip']],
        solution: [first('E = U I t'), iso('t = E/(U I)'), L(`${F('t')} = ${fr(Q(E, 'J'), `${Q(U, 'V')} · ${Q(I, 'A')}`)} = ${Q(E / (U * I), 's')}`), res('t', h, 'h', t('3600 s dans une heure.'))],
        key: `tbat:${E}:${U}:${I}`,
      });
    }
    if (w === 1) {
      const [U, Qa] = rng.pick([[36, 10], [36, 12], [48, 10], [36, 15]]);
      const I = rng.pick([4, 5, 6, 8]);
      const h = fix(Qa / I);
      return answer(sk, level, t('Une batterie de vélo porte l\'inscription « {U} — {Q} ». Le moteur consomme {I}. Combien de temps peut-on rouler, en heures ?', { U: Q(U, 'V'), Q: Q(Qa, 'Ah'), I: Q(I, 'A') }), h, 'h', {
        traps: [[I / Qa, 'ph_iso_flip'], [Qa * I, 'iso_wrong_inverse']],
        solution: [L(`${F('t')} = ${fr(Q(Qa, 'Ah'), Q(I, 'A'))}`, t('Des Ah divisés par des A : des heures. La tension ne sert pas ici.')), res('t', h, 'h')],
        key: `ride:${U}:${Qa}:${I}`,
      });
    }
    const PkW = rng.pick([1, 1.5, 2, 2.5]);
    const h = rng.int(2, 6);
    const E = PkW * 1000 * h * 3600;
    return answer(sk, level, t('Un radiateur de {P} fonctionne pendant {t}. Quelle énergie consomme-t-il, en joules ?', { P: Q(PkW, 'kW'), t: Q(h, 'h') }), E, 'J', {
      traps: [[PkW * h, 'ph_wh_forget_3600'], [PkW * 1000 * h, 'ph_wh_forget_3600'], [PkW * h * 3600, 'ph_not_si']],
      solution: [first('E = P t'), si(`${F('P')} = ${Q(PkW * 1000, 'W')} · ${F('t')} = ${Q(h * 3600, 's')}`), L(`${F('E')} = ${Q(PkW * 1000, 'W')} · ${Q(h * 3600, 's')}`), res('E', E, 'J', t('Soit {k} kWh, et 1 kWh = 3,6·10⁶ J.', { k: num(PkW * h) }))],
      key: `rad:${PkW}:${h}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const PkW = rng.pick([1.5, 2, 2.5, 3]);
    const t1 = rng.int(1, 5);
    const P2 = rng.pick([5, 10, 15, 20, 25]);
    const t2 = fix((PkW * 1000 * t1) / P2);
    return answer(sk, level, t('Une plaque de cuisson de {P1} fonctionne {t1}. Combien de temps une ampoule de {P2} doit-elle briller pour consommer autant d\'énergie ? Réponds en minutes.', { P1: Q(PkW, 'kW'), t1: Q(t1, 'min'), P2: Q(P2, 'W') }), t2, 'min', {
      traps: [[(PkW * t1) / P2, 'ph_not_si'], [P2 / (PkW * 1000 * t1), 'ph_iso_flip']],
      solution: [first('E = P t'), L(`${F('E')} = ${Q(PkW * 1000, 'W')} · ${Q(t1 * 60, 's')} = ${Q(PkW * 1000 * t1 * 60, 'J')}`), iso('t = E/P'), L(`${F('t')} = ${fr(Q(PkW * 1000 * t1 * 60, 'J'), Q(P2, 'W'))} = ${Q(t2 * 60, 's')}`), res('t', t2, 'min')],
      key: `same:${PkW}:${t1}:${P2}`,
    });
  }
  if (w === 1) {
    const PkW = rng.pick([1, 1.5, 2]);
    const h = rng.int(2, 6);
    const days = 30;
    const price = rng.pick([0.25, 0.28, 0.3, 0.32, 0.35]);
    const kWh = PkW * h * days;
    const cost = fix(kWh * price);
    return answer(sk, level, t('Un radiateur de {P} fonctionne {h} h par jour pendant {n} jours. Le kWh coûte {p} CHF. Combien coûte son électricité ?', { P: Q(PkW, 'kW'), h, n: days, p: num(price) }), cost, 'CHF', {
      traps: [[cost * 1000, 'ph_not_si']],
      solution: [first('E = P t'), L(`${F('E')} = ${Q(PkW, 'kW')} · ${h} h · ${days} = ${Q(kWh, 'kWh')}`), L(`${num(kWh)} · ${num(price)} CHF ${R(cost, 'CHF')}`)],
      key: `cost:${PkW}:${h}:${price}`,
    });
  }
  const [a, b] = rng.pick([[[12, 50], [24, 25]], [[12, 60], [36, 20]], [[48, 10], [36, 15]], [[36, 10], [12, 25]], [[12, 40], [48, 12]], [[24, 20], [36, 10]]]);
  const Ea = a[0] * a[1];
  const Eb = b[0] * b[1];
  const vars = { Ua: Q(a[0], 'V'), Qa: Q(a[1], 'Ah'), Ub: Q(b[0], 'V'), Qb: Q(b[1], 'Ah'), Ea: Q(Ea, 'Wh'), Eb: Q(Eb, 'Wh') };
  const prompt = t('Batterie A : « {Ua} — {Qa} ». Batterie B : « {Ub} — {Qb} ». Laquelle stocke le plus d\'énergie ?', vars);
  const why = t('{E} : A stocke {Ea}, B stocke {Eb}.', { E: F('E = U I t'), ...vars });
  const right = Ea === Eb ? t('Les deux autant : {Ea} chacune', vars) : Ea > Eb ? t('A : {Ea} contre {Eb}', vars) : t('B : {Eb} contre {Ea}', vars);
  const moreAh = a[1] > b[1] ? 'A' : 'B';
  const wrongs = [];
  if (!(Ea !== Eb && (Ea > Eb ? 'A' : 'B') === moreAh)) wrongs.push([moreAh === 'A' ? t('A : elle a plus d\'ampèreheures') : t('B : elle a plus d\'ampèreheures'), 'ph_ah_as_energy']);
  else wrongs.push([moreAh === 'A' ? t('B : elle a la plus grande tension') : t('A : elle a la plus grande tension'), null]);
  if (Ea !== Eb) wrongs.push([t('Les deux autant : une batterie, c\'est une batterie'), null]);
  else wrongs.push([moreAh === 'A' ? t('B : elle a la plus grande tension') : t('A : elle a la plus grande tension'), null]);
  return choice(sk, level, prompt, right, wrongs, rng, { why, key: `ab:${a}:${b}` });
};

// ======================================================================
// ph-deltaT : ΔT = arrivée − départ
// ======================================================================

GEN['ph-deltaT'] = (level, rng) => {
  const sk = 'ph-deltaT';
  const dT = F('ΔT');
  const line = (T1, T2, unit = '°C') => [first('ΔT = T_f - T_i'), L(`${dT} = ${num(T2)} ${unit} − ${T1 < 0 ? `(${num(T1)} ${unit})` : `${num(T1)} ${unit}`} = ${Q(T2 - T1, 'K')}`, t('Arrivée moins départ.'))];
  if (level === 1) {
    const i = rng.int(0, 2);
    const T1 = pg(rng, 10, 30, 1);
    const T2 = pg(rng, 40, 100, 5);
    const vars = { T1: Q(T1, '°C'), T2: Q(T2, '°C'), dT };
    const prompt = [
      () => t('Une casserole d\'eau passe de {T1} à {T2}. Quel est {dT} ?', vars),
      () => t('Le thé d\'une bouilloire passe de {T1} à {T2}. Quel est {dT} ?', vars),
      () => t('Le four est à {T1} ; on l\'allume et il monte à {T2}. Quel est {dT} ?', vars),
    ][i]();
    return answer(sk, level, prompt, T2 - T1, 'K', {
      traps: [[T2 - T1 + 273, 'ph_deltaT_add_273'], [T1 - T2, 'ph_deltaT_order']],
      solution: [...line(T1, T2)],
      key: `${i}:${T1}:${T2}`,
    });
  }
  if (level === 2) {
    const i = rng.int(0, 1);
    const T1 = i === 0 ? pg(rng, -25, -5, 1) : pg(rng, -12, -2, 1);
    const T2 = i === 0 ? pg(rng, 2, 25, 1) : pg(rng, 1, 12, 1);
    const vars = { T1: Q(T1, '°C'), T2: Q(T2, '°C'), dT };
    const prompt = i === 0 ? t('Un produit sorti du congélateur passe de {T1} à {T2}. Quel est {dT} ?', vars) : t('Au Chasseral, il fait {T1} le matin et {T2} l\'après-midi. Quel est {dT} ?', vars);
    return answer(sk, level, prompt, T2 - T1, 'K', {
      traps: [[T2 + T1, 'sub_neg_subtracts'], [T2 - T1 + 273, 'ph_deltaT_add_273'], [T1 - T2, 'ph_deltaT_order']],
      solution: [...line(T1, T2), L('', t('Soustraire un nombre négatif, c\'est ajouter son opposé.'))],
      key: `${i}:${T1}:${T2}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.6)) {
      const i = rng.int(0, 1);
      const T1 = pg(rng, 60, 95, 5);
      const T2 = pg(rng, 15, 40, 1);
      const vars = { T1: Q(T1, '°C'), T2: Q(T2, '°C'), dT };
      const prompt = i === 0 ? t('Une soupe refroidit de {T1} à {T2}. Quel est {dT} ?', vars) : t('Un gâteau sort du four à {T1} et refroidit jusqu\'à {T2}. Quel est {dT} ?', vars);
      return answer(sk, level, prompt, T2 - T1, 'K', {
        traps: [[T1 - T2, 'ph_deltaT_order'], [T2 - T1 + 273, 'ph_deltaT_add_273']],
        solution: [...line(T1, T2), L('', t('La température descend : {dT} est négatif.', { dT }))],
        key: `cool:${i}:${T1}:${T2}`,
      });
    }
    const T1 = pg(rng, 8, 25, 1);
    const d = pg(rng, 15, 70, 5);
    return answer(sk, level, t('De l\'eau à {T1} se réchauffe : {dT} = {d}. Quelle est sa température finale, en °C ?', { T1: Q(T1, '°C'), dT, d: Q(d, 'K') }), T1 + d, '°C', {
      traps: [[T1 - d, 'ph_deltaT_order'], [T1 + d + 273, 'ph_deltaT_add_273']],
      solution: [L(`${F('T_f')} = ${F('T_i')} + ${dT}`, t('Arrivée = départ + écart.')), L(`${F('T_f')} = ${Q(T1, '°C')} + ${num(d)} = ${Q(T1 + d, '°C')}`, t('Un écart de 1 K est un écart de 1 °C.'))],
      key: `final:${T1}:${d}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const C1 = pg(rng, 10, 30, 1);
      const K1 = C1 + 273;
      const C2 = pg(rng, 50, 120, 5);
      return answer(sk, level, t('Un gaz passe de {T1} à {T2}. Quel est {dT}, en kelvins ?', { T1: Q(K1, 'K'), T2: Q(C2, '°C'), dT }), C2 - C1, 'K', {
        traps: [[C2 - K1, 'ph_not_si'], [C2 + 273 - C1 + 273, 'ph_deltaT_add_273']],
        solution: [si(`${Q(C2, '°C')} = ${num(C2)} + 273 = ${Q(C2 + 273, 'K')}`), L(`${dT} = ${Q(C2 + 273, 'K')} − ${Q(K1, 'K')} = ${Q(C2 - C1, 'K')}`, t('Les deux températures dans la même unité, puis arrivée moins départ.'))],
        key: `KC:${K1}:${C2}`,
      });
    }
    if (w === 1) {
      const C1 = pg(rng, 40, 90, 5);
      const C2 = pg(rng, -20, 5, 1);
      const K2 = C2 + 273;
      return answer(sk, level, t('Un liquide refroidit de {T1} à {T2}. Quel est {dT}, en kelvins ?', { T1: Q(C1, '°C'), T2: Q(K2, 'K'), dT }), C2 - C1, 'K', {
        traps: [[K2 - C1, 'ph_not_si'], [C1 - C2, 'ph_deltaT_order']],
        solution: [si(`${Q(C1, '°C')} = ${num(C1)} + 273 = ${Q(C1 + 273, 'K')}`), L(`${dT} = ${Q(K2, 'K')} − ${Q(C1 + 273, 'K')} = ${Q(C2 - C1, 'K')}`, t('Arrivée moins départ : ça refroidit, {dT} est négatif.', { dT }))],
        key: `CK:${C1}:${K2}`,
      });
    }
    const T2 = pg(rng, 60, 100, 5);
    const d = pg(rng, 20, 75, 5);
    return answer(sk, level, t('Après avoir gagné {dT} = {d}, de l\'eau est à {T2}. Quelle était sa température de départ, en °C ?', { dT, d: Q(d, 'K'), T2: Q(T2, '°C') }), T2 - d, '°C', {
      traps: [[T2 + d, 'ph_deltaT_order'], [T2 - d - 273, 'ph_deltaT_add_273']],
      solution: [L(`${F('T_i')} = ${F('T_f')} − ${dT}`, t('Départ = arrivée − écart.')), L(`${F('T_i')} = ${Q(T2, '°C')} − ${num(d)} = ${Q(T2 - d, '°C')}`)],
      key: `start:${T2}:${d}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const d = pg(rng, 15, 85, 5);
    return choice(sk, level, t('Un écart de température de {d} °C, c\'est un écart de combien de kelvins ?', { d }),
      t('{d} K : un degré Celsius et un kelvin ont la même taille', { d }),
      [[t('{d} K : on ajoute 273', { d: d + 273 }), 'ph_deltaT_add_273'], [t('On ne peut pas savoir sans les températures'), null]], rng,
      { why: t('On ajoute 273 pour une température, jamais pour un écart.'), key: `conv:${d}` });
  }
  if (w === 1) {
    const T1 = pg(rng, 15, 25, 1);
    const T2 = pg(rng, 70, 95, 5);
    const d = T2 - T1;
    return choice(sk, level, t('Une recette demande de chauffer une préparation de {T1} à {T2}. Quel est {dT} ?', { T1: Q(T1, '°C'), T2: Q(T2, '°C'), dT }),
      t('{d} K, c\'est-à-dire aussi {d} °C : seul l\'écart compte', { d }),
      [[t('{K} K, car il faut ajouter 273', { K: d + 273 }), 'ph_deltaT_add_273'], [t('−{d} K : départ moins arrivée', { d }), 'ph_deltaT_order']], rng,
      { why: t('{dT} = {T2} − {T1}. En kelvins, les deux températures gagnent 273, et l\'écart ne change pas.', { dT, T2: Q(T2, '°C'), T1: Q(T1, '°C') }), key: `recipe:${T1}:${T2}` });
  }
  const T1 = pg(rng, 50, 90, 5);
  const T2 = pg(rng, 10, 30, 1);
  return choice(sk, level, t('Vrai ou faux : quand de l\'eau refroidit de {T1} à {T2}, {dT} est négatif.', { T1: Q(T1, '°C'), T2: Q(T2, '°C'), dT }),
    t('Vrai : {dT} = {v}', { dT, v: Q(T2 - T1, 'K') }),
    [[t('Faux : un écart est toujours positif'), 'ph_deltaT_order'], [t('Faux : {dT} = {v}', { dT, v: Q(T2 - T1 + 273, 'K') }), 'ph_deltaT_add_273']], rng,
    { why: t('{dT} = arrivée − départ : le signe dit si la température monte ou descend.', { dT }), key: `sign:${T1}:${T2}` });
};

// ======================================================================
// ph-heat : E = m c ΔT
// ======================================================================

const cOf = (c) => `${F('c')} = ${num(c)} J/(kg·K)`;
const HEAT_SITS = [
  { c: C_EAU, m: [[1, 5, 1], [0.5, 3.5, 0.25]], text: (x) => t('Quelle énergie faut-il pour chauffer {m} d\'eau de {T1} à {T2} ? ({c})', x) },
  { c: 2000, m: [[1, 4, 1], [0.8, 2.4, 0.2]], text: (x) => t('Quelle énergie faut-il pour chauffer {m} d\'huile de friture de {T1} à {T2} ? ({c})', x) },
  { c: 900, m: [[1, 3, 1], [0.4, 1.6, 0.1]], text: (x) => t('Une casserole en aluminium de {m} passe de {T1} à {T2} sur le feu. Quelle énergie a-t-elle reçue ? ({c})', x) },
  { c: 3900, m: [null, [0.5, 2, 0.25]], text: (x) => t('Quelle énergie faut-il pour chauffer {m} de lait de {T1} à {T2} ? ({c})', x) },
  { c: 450, m: [null, [0.6, 1.8, 0.1]], text: (x) => t('La semelle en fer d\'un fer à repasser a une masse de {m}. Quelle énergie faut-il pour la chauffer de {T1} à {T2} ? ({c})', x) },
];

GEN['ph-heat'] = (level, rng) => {
  const sk = 'ph-heat';
  const dT = F('ΔT');
  if (level <= 2) {
    const sits = HEAT_SITS.filter((s) => s.m[level - 1]);
    const i = rng.int(0, sits.length - 1);
    const s = sits[i];
    const m = pg(rng, ...s.m[level - 1]);
    const T1 = pg(rng, 10, 25, level === 1 ? 5 : 1);
    const T2 = s.c === 2000 ? pg(rng, 150, 180, 10) : s.c === 450 ? pg(rng, 120, 200, 10) : pg(rng, 60, 100, level === 1 ? 10 : 5);
    const d = T2 - T1;
    const E = fix(m * s.c * d);
    return answer(sk, level, s.text({ m: Q(m, 'kg'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), c: cOf(s.c) }), E, 'J', {
      traps: [[s.c * d, 'ph_heat_forget_mass'], [m * s.c * T2, 'ph_heat_final_temp'], [m * s.c * (d + 273), 'ph_deltaT_add_273']],
      solution: [first('E = m c ΔT'), L(`${dT} = ${num(T2)} − ${num(T1)} = ${Q(d, 'K')}`), L(`${F('E')} = ${Q(m, 'kg')} · ${num(s.c)} J/(kg·K) · ${Q(d, 'K')}`), res('E', E, 'J')],
      key: `${level}:${i}:${m}:${T1}:${T2}`,
    });
  }
  if (level === 3) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const c = rng.pick([2000, 2400, 3900, 4200, 2500]);
      const m = pg(rng, 0.5, 4, 0.5);
      const d = pg(rng, 10, 60, 5);
      const E = fix(m * c * d);
      return answer(sk, level, t('Il a fallu {E} pour élever de {d} la température de {m} d\'un liquide. Quelle est sa capacité thermique massique ?', { E: Q(E, 'J'), d: Q(d, 'K'), m: Q(m, 'kg') }), c, 'J/(kg·K)', {
        traps: [[E / d, 'ph_heat_forget_mass'], [(m * d) / E, 'ph_iso_flip'], [E / m, 'ph_heat_forget_mass']],
        solution: [first('E = m c ΔT'), iso('c = E/(m ΔT)'), L(`${F('c')} = ${fr(Q(E, 'J'), `${Q(m, 'kg')} · ${Q(d, 'K')}`)}`), res('c', c, 'J/(kg·K)')],
        key: `c:${E}:${m}:${d}`,
      });
    }
    if (w === 1) {
      const m = pg(rng, 0.5, 5, 0.5);
      const d = pg(rng, 5, 60, 1);
      const E = fix(m * C_EAU * d);
      return answer(sk, level, t('On donne {E} à {m} d\'eau. De combien sa température monte-t-elle ? ({c})', { E: Q(E, 'J'), m: Q(m, 'kg'), c: cOf(C_EAU) }), d, 'K', {
        traps: [[E / C_EAU, 'ph_heat_forget_mass'], [(m * C_EAU) / E, 'ph_iso_flip']],
        solution: [first('E = m c ΔT'), iso('ΔT = E/(m c)'), L(`${dT} = ${fr(Q(E, 'J'), `${Q(m, 'kg')} · ${num(C_EAU)} J/(kg·K)`)}`), res('ΔT', d, 'K')],
        key: `dT:${E}:${m}`,
      });
    }
    const m = pg(rng, 0.5, 4, 0.5);
    const T1 = pg(rng, 10, 20, 5);
    const T2 = pg(rng, 40, 90, 10);
    const E = fix(m * C_EAU * (T2 - T1));
    return answer(sk, level, t('Avec {E}, on chauffe de l\'eau de {T1} à {T2}. Quelle masse d\'eau a-t-on chauffée ? ({c})', { E: Q(E, 'J'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), c: cOf(C_EAU) }), m, 'kg', {
      traps: [[E / (C_EAU * T2), 'ph_heat_final_temp'], [(C_EAU * (T2 - T1)) / E, 'ph_iso_flip']],
      solution: [first('E = m c ΔT'), iso('m = E/(c ΔT)'), L(`${dT} = ${num(T2)} − ${num(T1)} = ${Q(T2 - T1, 'K')}`), L(`${F('m')} = ${fr(Q(E, 'J'), `${num(C_EAU)} J/(kg·K) · ${Q(T2 - T1, 'K')}`)}`), res('m', m, 'kg')],
      key: `m:${E}:${T1}:${T2}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 3);
    if (w === 0) {
      const V = pg(rng, 0.25, 2, 0.25);
      const T1 = pg(rng, 10, 20, 1);
      const T2 = rng.pick([60, 70, 80, 90, 100]);
      const EkJ = fix((V * C_EAU * (T2 - T1)) / 1000);
      return answer(sk, level, t('Quelle énergie faut-il pour chauffer {V} d\'eau de {T1} à {T2} ? Réponds en kJ. ({c})', { V: Q(V, 'L'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), c: cOf(C_EAU) }), EkJ, 'kJ', {
        traps: [[(C_EAU * (T2 - T1)) / 1000, 'ph_heat_forget_mass'], [(V * C_EAU * T2) / 1000, 'ph_heat_final_temp']],
        solution: [first('E = m c ΔT'), si(`${F('m')} = ${Q(V, 'kg')}`), L('', t('1 L d\'eau a une masse de 1 kg.')), L(`${F('E')} = ${Q(V, 'kg')} · ${num(C_EAU)} J/(kg·K) · ${Q(T2 - T1, 'K')} = ${Q(EkJ * 1000, 'J')}`), res('E', EkJ, 'kJ')],
        key: `L:${V}:${T1}:${T2}`,
      });
    }
    if (w === 1) {
      const mL = pg(rng, 150, 400, 50);
      const T1 = pg(rng, 4, 8, 1);
      const T2 = pg(rng, 50, 70, 5);
      const E = fix((mL / 1000) * 3900 * (T2 - T1));
      return answer(sk, level, t('On chauffe {V} de lait de {T1} à {T2} pour un chocolat chaud. Quelle énergie faut-il ? (1 mL de lait ≈ 1 g ; {c})', { V: Q(mL, 'mL'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), c: cOf(3900) }), E, 'J', {
        traps: [[mL * 3900 * (T2 - T1), 'ph_gram_as_kg'], [(mL / 1000) * 3900 * T2, 'ph_heat_final_temp']],
        solution: [first('E = m c ΔT'), si(`${F('m')} = ${Q(mL, 'g')} = ${Q(mL / 1000, 'kg')}`), L(`${F('E')} = ${Q(mL / 1000, 'kg')} · 3900 J/(kg·K) · ${Q(T2 - T1, 'K')}`), res('E', E, 'J')],
        key: `milk:${mL}:${T1}:${T2}`,
      });
    }
    if (w === 2) {
      const mg = pg(rng, 20, 60, 5);
      const T1 = pg(rng, 18, 22, 1);
      const T2 = pg(rng, 60, 80, 5);
      const E = fix((mg / 1000) * 450 * (T2 - T1));
      return answer(sk, level, t('Une cuillère en acier de {m} passe de {T1} à {T2} dans une tasse de thé. Quelle énergie a-t-elle reçue ? ({c})', { m: Q(mg, 'g'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), c: cOf(450) }), E, 'J', {
        traps: [[mg * 450 * (T2 - T1), 'ph_gram_as_kg'], [(mg / 1000) * 450 * T2, 'ph_heat_final_temp']],
        solution: [first('E = m c ΔT'), si(`${F('m')} = ${Q(mg, 'g')} = ${Q(mg / 1000, 'kg')}`), L(`${F('E')} = ${Q(mg / 1000, 'kg')} · 450 J/(kg·K) · ${Q(T2 - T1, 'K')}`), res('E', E, 'J')],
        key: `spoon:${mg}:${T1}:${T2}`,
      });
    }
    const V = pg(rng, 0.5, 2, 0.5);
    const d = pg(rng, 10, 80, 5);
    const EkJ = fix((V * C_EAU * d) / 1000);
    return answer(sk, level, t('Une bouilloire donne {E} à {V} d\'eau. De combien la température de l\'eau monte-t-elle ? ({c})', { E: Q(EkJ, 'kJ'), V: Q(V, 'L'), c: cOf(C_EAU) }), d, 'K', {
      traps: [[EkJ / (V * C_EAU), 'ph_not_si'], [(EkJ * 1000) / C_EAU, 'ph_heat_forget_mass']],
      solution: [first('E = m c ΔT'), iso('ΔT = E/(m c)'), si(`${F('E')} = ${Q(EkJ * 1000, 'J')} · ${F('m')} = ${Q(V, 'kg')}`), L(`${dT} = ${fr(Q(EkJ * 1000, 'J'), `${Q(V, 'kg')} · ${num(C_EAU)} J/(kg·K)`)}`), res('ΔT', d, 'K')],
      key: `rise:${EkJ}:${V}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const P = rng.pick([1800, 2000, 2200, 2400]);
    const V = pg(rng, 0.5, 1.7, 0.1);
    const T1 = pg(rng, 10, 20, 1);
    const T2 = 100;
    const E = V * C_EAU * (T2 - T1);
    const tt = fix(E / P);
    return answer(sk, level, t('Une bouilloire de {P} chauffe {V} d\'eau du robinet, de {T1} jusqu\'à ébullition ({T2}). Sans pertes, combien de temps lui faut-il, en secondes ?', { P: Q(P, 'W'), V: Q(V, 'L'), T1: Q(T1, '°C'), T2: Q(T2, '°C') }), tt, 's', {
      traps: [[E * P, 'ph_power_times'], [(C_EAU * (T2 - T1)) / P, 'ph_heat_forget_mass'], [(V * C_EAU * T2) / P, 'ph_heat_final_temp']],
      solution: [first('E = m c ΔT'), L(`${F('E')} = ${Q(V, 'kg')} · ${num(C_EAU)} J/(kg·K) · ${Q(T2 - T1, 'K')} = ${Q(fix(E), 'J')}`), iso('t = E/P'), L(`${F('t')} = ${fr(Q(fix(E), 'J'), Q(P, 'W'))}`), res('t', tt, 's', t('Environ {n} minutes.', { n: num(Math.round(tt / 60)) }))],
      key: `kettle:${P}:${V}:${T1}`,
    });
  }
  if (w === 1) {
    const P = rng.pick([500, 1000, 1500, 2000]);
    const m = pg(rng, 5, 20, 5);
    const tm = rng.int(5, 20);
    const d = fix((P * tm * 60) / (m * C_EAU));
    return answer(sk, level, t('Un thermoplongeur de {P} chauffe {m} d\'eau pendant {t}. Sans pertes, de combien la température monte-t-elle ? ({c})', { P: Q(P, 'W'), m: Q(m, 'kg'), t: Q(tm, 'min'), c: cOf(C_EAU) }), d, 'K', {
      traps: [[(P * tm) / (m * C_EAU), 'ph_not_si'], [(P * tm * 60) / C_EAU, 'ph_heat_forget_mass']],
      solution: [first('E = P t'), L(`${F('E')} = ${Q(P, 'W')} · ${Q(tm * 60, 's')} = ${Q(P * tm * 60, 'J')}`), iso('ΔT = E/(m c)'), L(`${dT} = ${fr(Q(P * tm * 60, 'J'), `${Q(m, 'kg')} · ${num(C_EAU)} J/(kg·K)`)}`), res('ΔT', d, 'K')],
      key: `heater:${P}:${m}:${tm}`,
    });
  }
  const m = pg(rng, 1, 3, 1);
  return choice(sk, level, t('{m} d\'eau ({c1}) et {m} d\'huile ({c2}) reçoivent la même énergie. Lequel des deux chauffe le plus ?', { m: Q(m, 'kg'), c1: cOf(C_EAU), c2: cOf(2000) }),
    t('L\'huile : avec un {c} plus petit, {dT} est plus grand', { c: F('c'), dT: F('ΔT = E/(m c)') }),
    [[t('L\'eau : son {c} est plus grand', { c: F('c') }), 'ph_iso_flip'], [t('Les deux autant : même masse, même énergie'), null]], rng,
    { why: t('{dT} : à énergie et masse égales, le liquide au plus petit {c} chauffe le plus. L\'huile chauffe environ deux fois plus que l\'eau.', { dT: F('ΔT = E/(m c)'), c: F('c') }), key: `oil:${m}` });
};

// ======================================================================
// ph-latent : E = m L_f
// ======================================================================

const lfOf = () => `${F('L_f')} = 330 kJ/kg`;

GEN['ph-latent'] = (level, rng) => {
  const sk = 'ph-latent';
  if (level <= 2) {
    const i = rng.int(0, 2);
    const m = level === 1 ? pg(rng, 1, 5, 1) : pg(rng, 0.2, 2.4, 0.1);
    const vars = { m: Q(m, 'kg'), L: lfOf() };
    const prompt = [
      () => t('Quelle énergie faut-il pour faire fondre {m} de glace à 0 °C ? ({L})', vars),
      () => t('Un bloc de glace de {m}, à 0 °C, fond dans une glacière. Quelle énergie a-t-il reçue ? ({L})', vars),
      () => t('On fait fondre {m} de neige à 0 °C dans une casserole, au camp. Quelle énergie faut-il ? ({L})', vars),
    ][i]();
    const E = fix(m * LF);
    return answer(sk, level, prompt, E, 'J', {
      traps: [[m * 330, 'ph_not_si'], [LF / m, 'ph_iso_flip']],
      solution: [first('E = m L_f'), si(`${F('L_f')} = 330 kJ/kg = 330 000 J/kg`), L(`${F('E')} = ${Q(m, 'kg')} · 330 000 J/kg`), res('E', E, 'J', t('Pendant toute la fusion, la glace reste à 0 °C.'))],
      key: `${level}:${i}:${m}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.6)) {
      const m = pg(rng, 0.2, 3, 0.1);
      const EkJ = fix(m * 330);
      return answer(sk, level, t('Quelle masse de glace à 0 °C peut-on faire fondre avec {E} ? ({L})', { E: Q(EkJ, 'kJ'), L: lfOf() }), m, 'kg', {
        traps: [[330 / EkJ, 'ph_iso_flip'], [EkJ * 330, 'iso_wrong_inverse']],
        solution: [first('E = m L_f'), iso('m = E/L_f'), L(`${F('m')} = ${fr(Q(EkJ, 'kJ'), '330 kJ/kg')}`, t('Les kJ se simplifient.')), res('m', m, 'kg')],
        key: `m:${EkJ}`,
      });
    }
    const [Lk] = rng.pick([[23], [59], [397], [205]]);
    const m = pg(rng, 0.5, 4, 0.5);
    const E = fix(m * Lk * 1000);
    return answer(sk, level, t('Il faut {E} pour faire fondre {m} d\'un métal déjà à sa température de fusion. Quelle est sa chaleur latente de fusion, en J/kg ?', { E: Q(E, 'J'), m: Q(m, 'kg') }), Lk * 1000, 'J/kg', {
      traps: [[m / E, 'ph_iso_flip'], [E * m, 'iso_wrong_inverse']],
      solution: [first('E = m L_f'), iso('L_f = E/m'), L(`${F('L_f')} = ${fr(Q(E, 'J'), Q(m, 'kg'))}`), res('L_f', Lk * 1000, 'J/kg')],
      key: `L:${Lk}:${m}`,
    });
  }
  if (level === 4) {
    if (rng.chance(0.5)) {
      const mg = pg(rng, 10, 40, 5);
      const n = rng.int(1, 8);
      const E = fix(((n * mg) / 1000) * LF);
      const prompt = n === 1
        ? t('Quelle énergie faut-il pour faire fondre un glaçon de {m} à 0 °C ? ({L})', { m: Q(mg, 'g'), L: lfOf() })
        : t('Quelle énergie faut-il pour faire fondre {n} glaçons de {m} chacun, à 0 °C ? ({L})', { n, m: Q(mg, 'g'), L: lfOf() });
      return answer(sk, level, prompt, E, 'J', {
        traps: [[n * mg * LF, 'ph_gram_as_kg'], [((n * mg) / 1000) * 330, 'ph_not_si'], [(mg / 1000) * LF, 'ph_phase_forgotten']],
        solution: [first('E = m L_f'), si(`${F('m')} = ${n > 1 ? `${n} · ` : ''}${Q(mg, 'g')} = ${Q((n * mg) / 1000, 'kg')} · ${F('L_f')} = 330 000 J/kg`), L(`${F('E')} = ${Q((n * mg) / 1000, 'kg')} · 330 000 J/kg`), res('E', E, 'J')],
        key: `cubes:${n}:${mg}`,
      });
    }
    const mg = pg(rng, 50, 900, 50);
    const EkJ = fix((mg / 1000) * 330);
    return answer(sk, level, t('Quelle masse de glace à 0 °C fond avec {E} ? Réponds en grammes. ({L})', { E: Q(EkJ, 'kJ'), L: lfOf() }), mg, 'g', {
      traps: [[330 / EkJ, 'ph_iso_flip'], [EkJ * 330, 'iso_wrong_inverse']],
      solution: [first('E = m L_f'), iso('m = E/L_f'), L(`${F('m')} = ${fr(Q(EkJ, 'kJ'), '330 kJ/kg')} = ${Q(mg / 1000, 'kg')}`), res('m', mg, 'g')],
      key: `g:${EkJ}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 3);
  if (w === 0) {
    return choice(sk, level, t('Vrai ou faux : pendant qu\'un glaçon fond, sa température monte.'),
      t('Faux : tant qu\'il fond, il reste à 0 °C'),
      [[t('Vrai : il reçoit de l\'énergie, donc il chauffe'), 'ph_latent_temperature'], [t('Vrai : il passe peu à peu de 0 °C à la température de la pièce'), 'ph_latent_temperature']], rng,
      { why: t('Toute l\'énergie reçue sert à casser la glace ({E}) ; la température ne remonte qu\'une fois tout fondu.', { E: F('E = m L_f') }), key: 'tf-melt' });
  }
  if (w === 1) {
    return choice(sk, level, t('Dans un verre de jus, on met soit un glaçon de 30 g à 0 °C, soit 30 g d\'eau à 0 °C. Qu\'est-ce qui refroidit le plus le jus ?'),
      t('Le glaçon : il prend en plus l\'énergie pour fondre'),
      [[t('Les deux autant : même masse, même température'), 'ph_latent_temperature'], [t('L\'eau : elle se mélange mieux'), null]], rng,
      { why: t('Le glaçon prend d\'abord {E} = 0,03 kg · 330 000 J/kg ≈ 9900 J pour fondre, puis il se réchauffe comme l\'eau.', { E: F('m L_f') }), key: 'ice-vs-water' });
  }
  if (w === 2) {
    const m = pg(rng, 0.2, 2, 0.1);
    const T = pg(rng, 10, 40, 5);
    const EkJ = fix((m * LF + m * C_EAU * T) / 1000);
    return answer(sk, level, t('Quelle énergie faut-il pour transformer {m} de glace à 0 °C en eau à {T} ? Réponds en kJ. ({L} ; {c})', { m: Q(m, 'kg'), T: Q(T, '°C'), L: lfOf(), c: cOf(C_EAU) }), EkJ, 'kJ', {
      traps: [[(m * LF) / 1000, 'ph_phase_forgotten'], [(m * C_EAU * T) / 1000, 'ph_phase_forgotten']],
      solution: [
        L(`${F('E_1 = m L_f')} = ${Q(m, 'kg')} · 330 000 J/kg = ${Q(fix(m * LF), 'J')}`, t('D\'abord fondre, à 0 °C.')),
        L(`${F('E_2 = m c ΔT')} = ${Q(m, 'kg')} · ${num(C_EAU)} J/(kg·K) · ${Q(T, 'K')} = ${Q(fix(m * C_EAU * T), 'J')}`, t('Puis chauffer l\'eau obtenue.')),
        L(`${F('E')} = ${F('E_1')} + ${F('E_2')} ${R(EkJ, 'kJ')}`),
      ],
      key: `melt-warm:${m}:${T}`,
    });
  }
  const P = rng.pick([500, 1000, 1500, 2000]);
  const m = pg(rng, 0.5, 5, 0.5);
  const tt = fix((m * LF) / P);
  return answer(sk, level, t('Un radiateur de {P} sert à faire fondre {m} de glace à 0 °C. Sans pertes, combien de temps faut-il, en secondes ? ({L})', { P: Q(P, 'W'), m: Q(m, 'kg'), L: lfOf() }), tt, 's', {
    traps: [[m * LF * P, 'ph_power_times'], [(m * 330) / P, 'ph_not_si']],
    solution: [first('E = m L_f'), L(`${F('E')} = ${Q(m, 'kg')} · 330 000 J/kg = ${Q(fix(m * LF), 'J')}`), iso('t = E/P'), L(`${F('t')} = ${fr(Q(fix(m * LF), 'J'), Q(P, 'W'))}`), res('t', tt, 's')],
    key: `melt-P:${P}:${m}`,
  });
};

// ======================================================================
// ph-mix : m₁ c (T₁ − T_f) = m₂ c (T_f − T₂)
// ======================================================================

// Masses (in any unit, the same for both) and temperatures whose mixture is
// a whole number of degrees; masses different, so the plain average is wrong.
function mixDraw(rng, masses, hot, cold) {
  for (let k = 0; k < 200; k++) {
    const m1 = rng.pick(masses);
    const m2 = rng.pick(masses);
    const T1 = pg(rng, ...hot);
    const T2 = pg(rng, ...cold);
    const Tf = (m1 * T1 + m2 * T2) / (m1 + m2);
    if (m1 !== m2 && Number.isInteger(fix(Tf))) return { m1, m2, T1, T2, Tf: fix(Tf) };
  }
  return { m1: 1, m2: 4, T1: 90, T2: 20, Tf: 34 };
}

const mixSolution = (m1s, m2s, T1, T2, Tf, unit = '°C') => [
  L(`${F('m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)')}`, t('L\'énergie perdue par le chaud est gagnée par le froid ; c se simplifie.')),
  L(`${F('T_f = (m_1 T_1 + m_2 T_2)/(m_1 + m_2)')}`, t('On isole la température finale.')),
  L(`${F('T_f')} = ${fr(`${m1s} · ${num(T1)} °C + ${m2s} · ${num(T2)} °C`, `${m1s} + ${m2s}`)}`),
  L(`${F('T_f')} ${R(Tf, unit)}`, t('Entre les deux températures, plus près de celle de la plus grande masse.')),
];

GEN['ph-mix'] = (level, rng) => {
  const sk = 'ph-mix';
  if (level <= 2) {
    const { m1, m2, T1, T2, Tf } = level === 1 ? mixDraw(rng, [1, 2, 3, 4], [60, 90, 10], [10, 30, 10]) : mixDraw(rng, [1.5, 2, 2.5, 3, 4, 5, 6], [50, 95, 1], [8, 25, 1]);
    const vars = { m1: Q(m1, 'kg'), m2: Q(m2, 'kg'), T1: Q(T1, '°C'), T2: Q(T2, '°C') };
    const bath = level === 2 && rng.chance(0.5);
    const prompt = bath
      ? t('Dans une baignoire, on mélange {m1} d\'eau à {T1} et {m2} d\'eau à {T2}. Sans pertes, quelle est la température finale ?', { ...vars, m1: Q(m1 * 20, 'L'), m2: Q(m2 * 20, 'L') })
      : t('On verse {m1} d\'eau à {T1} dans {m2} d\'eau à {T2}, sans pertes. Quelle est la température finale ?', vars);
    const k = bath ? 20 : 1;
    return answer(sk, level, prompt, Tf, '°C', {
      traps: [[(T1 + T2) / 2, 'ph_mix_average']],
      solution: mixSolution(Q(m1 * k, bath ? 'L' : 'kg'), Q(m2 * k, bath ? 'L' : 'kg'), T1, T2, Tf),
      key: `${level}:${bath}:${m1}:${m2}:${T1}:${T2}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const { m1, m2, T1, T2, Tf } = mixDraw(rng, [0.5, 1, 1.5, 2, 2.5, 3, 4], [50, 80, 5], [10, 20, 5]);
      const m2v = fix((m1 * (T1 - Tf)) / (Tf - T2));
      return answer(sk, level, t('Quelle masse d\'eau à {T2} faut-il ajouter à {m1} d\'eau à {T1} pour obtenir de l\'eau à {Tf} ?', { T2: Q(T2, '°C'), m1: Q(m1, 'kg'), T1: Q(T1, '°C'), Tf: Q(Tf, '°C') }), m2v, 'kg', {
        traps: [[(m1 * (Tf - T2)) / (T1 - Tf), 'ph_iso_flip'], [m1, 'ph_mix_average']],
        solution: [
          L(`${F('m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)')}`, t('L\'énergie perdue par le chaud est gagnée par le froid ; c se simplifie.')),
          iso('m_2 = (m_1 (T_1 - T_f))/(T_f - T_2)'),
          L(`${F('m_2')} = ${fr(`${Q(m1, 'kg')} · (${num(T1)} − ${num(Tf)})`, `${num(Tf)} − ${num(T2)}`)}`),
          res('m_2', m2v, 'kg'),
        ],
        key: `m2:${m1}:${T1}:${T2}:${Tf}`,
      });
    }
    const { m1, m2, T1, T2, Tf } = mixDraw(rng, [1, 2, 3, 4], [50, 90, 5], [10, 25, 5]);
    return answer(sk, level, t('On verse {m1} d\'eau chaude dans {m2} d\'eau à {T2}. Le mélange est à {Tf}. Quelle était la température de l\'eau chaude ?', { m1: Q(m1, 'kg'), m2: Q(m2, 'kg'), T2: Q(T2, '°C'), Tf: Q(Tf, '°C') }), T1, '°C', {
      traps: [[2 * Tf - T2, 'ph_mix_average'], [Tf + (m1 * (Tf - T2)) / m2, 'ph_iso_flip']],
      solution: [
        L(`${F('m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)')}`, t('L\'énergie perdue par le chaud est gagnée par le froid ; c se simplifie.')),
        iso('T_1 = T_f + (m_2 (T_f - T_2))/m_1'),
        L(`${F('T_1')} = ${num(Tf)} + ${fr(`${Q(m2, 'kg')} · (${num(Tf)} − ${num(T2)})`, Q(m1, 'kg'))}`),
        res('T_1', T1, '°C'),
      ],
      key: `T1:${m1}:${m2}:${T2}:${Tf}`,
    });
  }
  if (level === 4) {
    if (rng.chance(0.5)) {
      const { m1, m2, T1, T2, Tf } = mixDraw(rng, [100, 150, 200, 250, 300], [70, 95, 5], [4, 20, 1]);
      return answer(sk, level, t('On verse {m1} de thé à {T1} dans une tasse, puis {m2} de lait à {T2}. Sans pertes, quelle est la température finale ? (On traite le thé et le lait comme de l\'eau : 1 mL ↔ 1 g.)', { m1: Q(m1, 'mL'), m2: Q(m2, 'mL'), T1: Q(T1, '°C'), T2: Q(T2, '°C') }), Tf, '°C', {
        traps: [[(T1 + T2) / 2, 'ph_mix_average']],
        solution: mixSolution(Q(m1, 'g'), Q(m2, 'g'), T1, T2, Tf),
        key: `tea:${m1}:${m2}:${T1}:${T2}`,
      });
    }
    let d;
    for (let k = 0; k < 200; k++) {
      const m1g = pg(rng, 200, 800, 100);
      const m2 = pg(rng, 1, 4, 0.5);
      const T1 = pg(rng, 60, 95, 5);
      const T2 = pg(rng, 10, 25, 1);
      const Tf = (m1g / 1000 * T1 + m2 * T2) / (m1g / 1000 + m2);
      if (Number.isInteger(fix(Tf * 10))) { d = { m1g, m2, T1, T2, Tf: fix(Tf) }; break; }
    }
    d ??= { m1g: 500, m2: 2, T1: 70, T2: 20, Tf: 30 };
    const { m1g, m2, T1, T2, Tf } = d;
    return answer(sk, level, t('On verse {m1} d\'eau à {T1} dans une bassine qui contient {m2} d\'eau à {T2}. Sans pertes, quelle est la température finale ?', { m1: Q(m1g, 'g'), T1: Q(T1, '°C'), m2: Q(m2, 'kg'), T2: Q(T2, '°C') }), Tf, '°C', {
      traps: [[(m1g * T1 + m2 * T2) / (m1g + m2), 'ph_gram_as_kg'], [(T1 + T2) / 2, 'ph_mix_average']],
      solution: [si(`${F('m_1')} = ${Q(m1g, 'g')} = ${Q(m1g / 1000, 'kg')}`), ...mixSolution(Q(m1g / 1000, 'kg'), Q(m2, 'kg'), T1, T2, Tf)],
      key: `gkg:${m1g}:${m2}:${T1}:${T2}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const T1 = pg(rng, 55, 80, 5);
    const T2 = pg(rng, 10, 20, 5);
    const mid = (T1 + T2) / 2;
    const Tf = rng.chance(0.5) ? pg(rng, Math.ceil(mid + 6), T1 - 5, 1) : pg(rng, T2 + 5, Math.floor(mid - 6), 1);
    const hotSide = Tf > mid;
    const vars = { Tf: Q(Tf, '°C'), T1: Q(T1, '°C'), T2: Q(T2, '°C') };
    const hot = t('Plus d\'eau chaude : {Tf} est plus près de {T1}', vars);
    const cold = t('Plus d\'eau froide : {Tf} est plus près de {T2}', vars);
    return choice(sk, level, t('On veut de l\'eau à {Tf} en mélangeant de l\'eau à {T1} et de l\'eau à {T2}. Faut-il plus d\'eau chaude ou plus d\'eau froide ? Réponds sans calcul.', vars),
      hotSide ? hot : cold, [[hotSide ? cold : hot, null], [t('Autant des deux : le mélange est toujours à la moyenne'), 'ph_mix_average']], rng,
      { why: t('La température finale est plus près de celle de la plus grande masse. La moyenne {M} ne vaut que pour des masses égales.', { M: Q(mid, '°C') }), key: `side:${T1}:${T2}:${Tf}` });
  }
  if (w === 1) {
    const T1 = pg(rng, 60, 90, 5);
    const T2 = pg(rng, 10, 25, 5);
    const Tw = rng.chance(0.5) ? T1 + pg(rng, 5, 20, 5) : T2 - pg(rng, 3, 8, 1);
    const vars = { T1: Q(T1, '°C'), T2: Q(T2, '°C'), Tw: Q(Tw, '°C') };
    return choice(sk, level, t('Pour un mélange d\'eau à {T1} et d\'eau à {T2}, un élève trouve une température finale de {Tw}. Sans refaire le calcul, que peut-on dire ?', vars),
      t('Il y a une erreur : la température finale est forcément entre {T2} et {T1}', vars),
      [[t('C\'est possible si les masses sont très différentes'), null], [t('C\'est possible : le chaud et le froid s\'additionnent'), null]], rng,
      { why: t('Le chaud se refroidit, le froid se réchauffe : ils se rejoignent entre les deux.'), key: `out:${T1}:${T2}:${Tw}` });
  }
  const { m1, m2, T1, T2, Tf } = mixDraw(rng, [1, 2, 3, 4], [60, 90, 10], [10, 30, 10]);
  const avg = (T1 + T2) / 2;
  return choice(sk, level, t('Vrai ou faux : si on mélange {m1} d\'eau à {T1} et {m2} d\'eau à {T2}, le mélange est à {A}.', { m1: Q(m1, 'kg'), m2: Q(m2, 'kg'), T1: Q(T1, '°C'), T2: Q(T2, '°C'), A: Q(avg, '°C') }),
    t('Faux : il est à {Tf}, plus près de la température de la plus grande masse', { Tf: Q(Tf, '°C') }),
    [[t('Vrai : c\'est la moyenne des deux températures'), 'ph_mix_average'], [t('Faux : il est à {S}, on additionne', { S: Q(T1 + T2, '°C') }), null]], rng,
    { why: t('{Tf} : chaque température compte autant que sa masse.', { Tf: F('T_f = (m_1 T_1 + m_2 T_2)/(m_1 + m_2)') }), key: `avg:${m1}:${m2}:${T1}:${T2}` });
};

// ======================================================================
// ph-density : ρ = m/V
// ======================================================================

const DENS = [450, 600, 920, 2400, 2700, 7900];

GEN['ph-density'] = (level, rng) => {
  const sk = 'ph-density';
  if (level === 1) {
    const i = rng.int(0, 2);
    const rho = rng.pick(DENS);
    const V = rng.pick([0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.5, 2]);
    const m = fix(rho * V);
    const vars = { m: Q(m, 'kg'), V: Q(V, 'm^3') };
    const prompt = [
      () => t('Un bloc de {m} occupe un volume de {V}. Quelle est sa masse volumique ?', vars),
      () => t('Une poutre de {m} a un volume de {V}. Quelle est sa masse volumique ?', vars),
      () => t('Une pièce de métal de {m} a un volume de {V}. Quelle est sa masse volumique ?', vars),
    ][i]();
    return answer(sk, level, prompt, rho, 'kg/m^3', {
      traps: [[V / m, 'ph_density_inverted'], [m * V, 'iso_wrong_inverse']],
      solution: [first('ρ = m/V'), L(`${F('ρ')} = ${fr(Q(m, 'kg'), Q(V, 'm^3'))}`), res('ρ', rho, 'kg/m^3')],
      key: `${i}:${m}:${V}`,
    });
  }
  if (level === 2) {
    const [rho, i] = rng.pick([[0.92, 0], [1.03, 1], [0.79, 2], [1.4, 3], [1.26, 4]]);
    const V = pg(rng, 0.5, 5, 0.5);
    const m = fix(rho * V);
    const vars = { m: Q(m, 'kg'), V: Q(V, 'L') };
    const prompt = [
      () => t('{V} d\'huile ont une masse de {m}. Quelle est la masse volumique de l\'huile, en kg/L ?', vars),
      () => t('{V} de lait ont une masse de {m}. Quelle est la masse volumique du lait, en kg/L ?', vars),
      () => t('{V} d\'alcool ont une masse de {m}. Quelle est la masse volumique de l\'alcool, en kg/L ?', vars),
      () => t('{V} de miel ont une masse de {m}. Quelle est la masse volumique du miel, en kg/L ?', vars),
      () => t('{V} de glycérine ont une masse de {m}. Quelle est la masse volumique de la glycérine, en kg/L ?', vars),
    ][i]();
    return answer(sk, level, prompt, rho, 'kg/L', {
      traps: [[V / m, 'ph_density_inverted']],
      solution: [first('ρ = m/V'), L(`${F('ρ')} = ${fr(Q(m, 'kg'), Q(V, 'L'))}`), res('ρ', rho, 'kg/L')],
      key: `${i}:${V}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const [rho, i] = rng.pick([[2400, 0], [920, 1], [450, 2]]);
      const V = rng.pick([0.02, 0.05, 0.1, 0.2, 0.25, 0.4, 0.5, 1.2, 1.5, 2.5]);
      const m = fix(rho * V);
      const vars = { V: Q(V, 'm^3'), rho: `${F('ρ')} = ${Q(rho, 'kg/m^3')}` };
      const prompt = [
        () => t('Quelle est la masse d\'une dalle de béton de {V} ? ({rho})', vars),
        () => t('Quelle est la masse d\'un bloc de glace de {V} ? ({rho})', vars),
        () => t('Quelle est la masse d\'une poutre de sapin de {V} ? ({rho})', vars),
      ][i]();
      return answer(sk, level, prompt, m, 'kg', {
        traps: [[V / rho, 'ph_density_inverted'], [rho / V, 'iso_wrong_inverse']],
        solution: [first('ρ = m/V'), iso('m = ρ V'), L(`${F('m')} = ${Q(rho, 'kg/m^3')} · ${Q(V, 'm^3')}`), res('m', m, 'kg')],
        key: `m:${i}:${V}`,
      });
    }
    const [rho, i] = rng.pick([[0.92, 0], [0.79, 1], [1.4, 2]]);
    const V = pg(rng, 0.5, 4, 0.5);
    const m = fix(rho * V);
    const vars = { m: Q(m, 'kg'), rho: `${F('ρ')} = ${Q(rho, 'kg/L')}` };
    const prompt = [
      () => t('Quel volume occupent {m} d\'huile ? Réponds en litres. ({rho})', vars),
      () => t('Quel volume occupent {m} d\'alcool ? Réponds en litres. ({rho})', vars),
      () => t('Quel volume occupent {m} de miel ? Réponds en litres. ({rho})', vars),
    ][i]();
    return answer(sk, level, prompt, V, 'L', {
      traps: [[m * rho, 'ph_density_inverted'], [rho / m, 'ph_iso_flip']],
      solution: [first('ρ = m/V'), iso('V = m/ρ'), L(`${F('V')} = ${fr(Q(m, 'kg'), Q(rho, 'kg/L'))}`), res('V', V, 'L')],
      key: `V:${i}:${m}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const mL = pg(rng, 250, 1000, 250);
      const m = fix(mL * 0.92);
      return answer(sk, level, t('{V} d\'huile d\'olive ont une masse de {m}. Quelle est la masse volumique de l\'huile, en kg/m³ ?', { V: Q(mL, 'mL'), m: Q(m, 'g') }), 920, 'kg/m^3', {
        traps: [[0.92, 'ph_not_si'], [mL / m, 'ph_density_inverted'], [920000, 'ph_not_si']],
        solution: [first('ρ = m/V'), si(`${F('m')} = ${Q(m, 'g')} = ${Q(m / 1000, 'kg')} · ${F('V')} = ${Q(mL, 'mL')} = ${Q(mL / 1e6, 'm^3')}`), L(`${F('ρ')} = ${fr(Q(m / 1000, 'kg'), Q(mL / 1e6, 'm^3'))}`), res('ρ', 920, 'kg/m^3')],
        key: `olive:${mL}`,
      });
    }
    if (w === 1) {
      const [rho, V] = rng.pick([[19300, 0.3], [19300, 0.4], [10500, 0.6], [10500, 0.8], [8900, 0.5], [7900, 1.2]]);
      const mg = fix((rho * V) / 1000);
      return answer(sk, level, t('Une bague de {m} a un volume de {V}. Quelle est sa masse volumique, en kg/m³ ?', { m: Q(mg, 'g'), V: Q(V, 'cm^3') }), rho, 'kg/m^3', {
        traps: [[rho / 1000, 'ph_not_si'], [V / mg, 'ph_density_inverted']],
        solution: [first('ρ = m/V'), L(`${F('ρ')} = ${fr(Q(mg, 'g'), Q(V, 'cm^3'))} = ${Q(rho / 1000, 'g/cm^3')}`), si(`1 g/cm³ = 1000 kg/m³`), res('ρ', rho, 'kg/m^3')],
        key: `ring:${rho}:${V}`,
      });
    }
    const VL = pg(rng, 2, 20, 1);
    const m = fix((1030 * VL) / 1000);
    return answer(sk, level, t('Quelle est la masse de {V} d\'eau de mer ? ({rho})', { V: Q(VL, 'L'), rho: `${F('ρ')} = ${Q(1030, 'kg/m^3')}` }), m, 'kg', {
      traps: [[1030 * VL, 'ph_not_si'], [VL / 1030, 'ph_density_inverted']],
      solution: [first('ρ = m/V'), iso('m = ρ V'), si(`${F('V')} = ${Q(VL, 'L')} = ${Q(VL / 1000, 'm^3')}`), L(`${F('m')} = ${Q(1030, 'kg/m^3')} · ${Q(VL / 1000, 'm^3')}`), res('m', m, 'kg')],
      key: `sea:${VL}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const a = pg(rng, 40, 100, 10);
    const b = pg(rng, 25, 50, 5);
    const c = pg(rng, 30, 50, 5);
    const m = fix((a * b * c) / 1000);
    return answer(sk, level, t('Un aquarium de {a} × {b} × {c} est rempli d\'eau. Quelle est la masse de l\'eau ?', { a: Q(a, 'cm'), b: Q(b, 'cm'), c: Q(c, 'cm') }), m, 'kg', {
      traps: [[a * b * c, 'ph_gram_as_kg'], [(a * b * c) / 1e6, 'ph_not_si']],
      solution: [L(`${F('V')} = ${num(a)} · ${num(b)} · ${num(c)} cm³ = ${Q(a * b * c, 'cm^3')} = ${Q((a * b * c) / 1000, 'L')}`, t('1 L = 1000 cm³.')), iso('m = ρ V'), L(`${F('m')} = 1 kg/L · ${Q((a * b * c) / 1000, 'L')}`), res('m', m, 'kg')],
      key: `tank:${a}:${b}:${c}`,
    });
  }
  if (w === 1) {
    const floats = rng.chance(0.5);
    const rho = floats ? rng.pick([450, 600, 800, 920]) : rng.pick([1200, 2400, 2700, 7900]);
    const V = floats ? rng.pick([0.05, 0.1, 0.2]) : rng.pick([0.001, 0.002, 0.005]);
    const m = fix(rho * V);
    const vars = { m: Q(m, 'kg'), V: Q(V, 'm^3'), rho: Q(rho, 'kg/m^3') };
    const yes = t('Oui : {rho}, moins que l\'eau', vars);
    const no = t('Non : {rho}, plus que l\'eau', vars);
    return choice(sk, level, t('Un objet de {m} a un volume de {V}. Flotte-t-il dans l\'eau ?', vars),
      floats ? yes : no, [[floats ? no : yes, null], [floats ? t('Non : {m}, c\'est trop lourd pour flotter', vars) : t('Oui : il ne pèse que {m}', vars), null]], rng,
      { why: t('{rho} : on compare à l\'eau, 1000 kg/m³. La masse seule ne dit rien.', { rho: F('ρ = m/V') }), key: `float:${rho}:${V}` });
  }
  const i = rng.int(0, 2);
  const prompt = [
    () => t('Vrai ou faux : 1 kg de plomb est plus lourd que 1 kg de plumes.'),
    () => t('Vrai ou faux : 1 kg de fer est plus lourd que 1 kg de bois.'),
    () => t('Vrai ou faux : 1 kg de pierres est plus lourd que 1 kg de coton.'),
  ][i]();
  return choice(sk, level, prompt,
    t('Faux : 1 kg, c\'est 1 kg ; seul le volume change'),
    [[t('Vrai : sa masse volumique est plus grande'), 'ph_density_inverted'], [t('Vrai : il est plus dur'), null]], rng,
    { why: t('La même masse, mais pas le même volume : {V}. Le matériau le plus dense prend moins de place.', { V: F('V = m/ρ') }), key: `kg:${i}` });
};

// ======================================================================
// ph-efficiency : η = E_u/E_f
// ======================================================================

GEN['ph-efficiency'] = (level, rng) => {
  const sk = 'ph-efficiency';
  if (level <= 2) {
    const i = rng.int(0, 2);
    const eta = level === 1 ? rng.pick([20, 25, 30, 40, 50, 60, 75, 80, 90]) : rng.pick([12, 15, 18, 22, 35, 38, 45, 85, 92]);
    const base = [
      level === 1 ? rng.pick([100, 200, 400, 500, 1000, 2000]) : pg(rng, 150, 950, 50),
      level === 1 ? rng.pick([10, 20, 40, 50]) : pg(rng, 5, 25, 1),
      level === 1 ? rng.pick([200, 400, 500, 1000, 2000]) : pg(rng, 250, 1600, 50),
    ][i];
    const Ef = base;
    const Eu = fix((Ef * eta) / 100);
    const prompt = [
      () => t('Un moteur reçoit {Ef} d\'énergie et fournit {Eu} d\'énergie utile. Quel est son rendement, en % ?', { Ef: Q(Ef, 'J'), Eu: Q(Eu, 'J') }),
      () => t('Une ampoule consomme {Ef} et émet {Eu} de lumière. Quel est son rendement, en % ?', { Ef: Q(Ef, 'W'), Eu: Q(Eu, 'W') }),
      () => t('Un panneau solaire reçoit {Ef} de lumière et fournit {Eu} d\'électricité. Quel est son rendement, en % ?', { Ef: Q(Ef, 'W'), Eu: Q(Eu, 'W') }),
    ][i]();
    const sym = i === 0 ? ['η = E_u/E_f', 'E_u', 'E_f', 'J'] : ['η = P_u/P_f', 'P_u', 'P_f', 'W'];
    return answer(sk, level, prompt, eta, '%', {
      traps: [[(Ef / Eu) * 100, 'ph_efficiency_inverted'], [Ef / Eu, 'ph_efficiency_inverted']],
      solution: [first(sym[0]), L(`${F('η')} = ${fr(Q(Eu, sym[3]), Q(Ef, sym[3]))} ${R(eta / 100)}`), L(`${F('η')} = <b>${num(eta)} %</b>`, t('Plus petit que 100 % : on récupère moins que ce qu\'on fournit.'))],
      key: `${level}:${i}:${Ef}:${eta}`,
    });
  }
  if (level === 3) {
    if (rng.chance(0.5)) {
      const eta = rng.pick([15, 18, 20, 22, 25]);
      const Pf = pg(rng, 500, 3000, 100);
      const Pu = fix((Pf * eta) / 100);
      return answer(sk, level, t('Un panneau solaire reçoit {Pf} de lumière ; son rendement est de {eta} %. Quelle puissance électrique fournit-il ?', { Pf: Q(Pf, 'W'), eta }), Pu, 'W', {
        traps: [[Pf / (eta / 100), 'ph_efficiency_inverted'], [Pf * eta, 'percent_as_amount']],
        solution: [first('η = P_u/P_f'), iso('P_u = η P_f'), L(`${F('P_u')} = ${num(eta / 100)} · ${Q(Pf, 'W')}`, t('{eta} % = {d}', { eta, d: num(eta / 100) })), res('P_u', Pu, 'W')],
        key: `Pu:${Pf}:${eta}`,
      });
    }
    const eta = rng.pick([20, 25, 30, 40, 50, 60, 75, 80]);
    const Eu = pg(rng, 300, 3000, 100);
    const Ef = fix(Eu / (eta / 100));
    return answer(sk, level, t('Un moteur a un rendement de {eta} %. Il doit fournir {Eu} d\'énergie utile. Quelle énergie faut-il lui fournir ?', { eta, Eu: Q(Eu, 'J') }), Ef, 'J', {
      traps: [[(Eu * eta) / 100, 'ph_efficiency_inverted'], [Eu / eta, 'percent_as_amount']],
      solution: [first('η = E_u/E_f'), iso('E_f = E_u/η'), L(`${F('E_f')} = ${fr(Q(Eu, 'J'), num(eta / 100))}`), res('E_f', Ef, 'J', t('Plus que l\'énergie utile : le reste est perdu, souvent en chaleur.'))],
      key: `Ef:${Eu}:${eta}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const Wh = pg(rng, 300, 700, 50);
      const eta = rng.pick([75, 80, 85, 90]);
      const Eu = fix(Wh * 3600 * (eta / 100));
      return answer(sk, level, t('La batterie d\'un vélo électrique fournit {E} au moteur, dont le rendement est de {eta} %. Quelle énergie utile le moteur fournit-il, en joules ?', { E: Q(Wh, 'Wh'), eta }), Eu, 'J', {
        traps: [[Wh * (eta / 100), 'ph_wh_forget_3600'], [(Wh * 3600) / (eta / 100), 'ph_efficiency_inverted']],
        solution: [first('η = E_u/E_f'), iso('E_u = η E_f'), si(`${F('E_f')} = ${Q(Wh, 'Wh')} = ${num(Wh)} · 3600 J = ${Q(Wh * 3600, 'J')}`), L(`${F('E_u')} = ${num(eta / 100)} · ${Q(Wh * 3600, 'J')}`), res('E_u', Eu, 'J')],
        key: `ebike:${Wh}:${eta}`,
      });
    }
    if (w === 1) {
      const PkW = rng.pick([1, 1.5, 2, 2.5, 4, 5]);
      const eta = rng.pick([60, 70, 75, 80, 85, 90]);
      const Pu = fix((PkW * 1000 * eta) / 100);
      return answer(sk, level, t('Un moteur électrique consomme {Pf} et fournit une puissance utile de {Pu}. Quel est son rendement, en % ?', { Pf: Q(PkW, 'kW'), Pu: Q(Pu, 'W') }), eta, '%', {
        traps: [[(Pu / PkW) * 100, 'ph_not_si'], [((PkW * 1000) / Pu) * 100, 'ph_efficiency_inverted']],
        solution: [first('η = P_u/P_f'), si(`${F('P_f')} = ${Q(PkW, 'kW')} = ${Q(PkW * 1000, 'W')}`), L(`${F('η')} = ${fr(Q(Pu, 'W'), Q(PkW * 1000, 'W'))} = ${num(eta / 100)}`), L(`${F('η')} = <b>${num(eta)} %</b>`)],
        key: `kW:${PkW}:${eta}`,
      });
    }
    const eta = rng.pick([30, 35, 40]);
    const kWh = pg(rng, 2, 10, 1);
    const Ef = fix(kWh / (eta / 100));
    return answer(sk, level, t('Une petite centrale à gaz a un rendement de {eta} %. Pour fournir {E} d\'électricité, quelle énergie le gaz doit-il apporter, en kWh ?', { eta, E: Q(kWh, 'kWh') }), Ef, 'kWh', {
      traps: [[(kWh * eta) / 100, 'ph_efficiency_inverted'], [kWh / eta, 'percent_as_amount']],
      solution: [first('η = E_u/E_f'), iso('E_f = E_u/η'), L(`${F('E_f')} = ${fr(Q(kWh, 'kWh'), num(eta / 100))}`), res('E_f', Ef, 'kWh')],
      key: `gas:${kWh}:${eta}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const eta = rng.pick([40, 50, 60, 75, 80]);
    const m = pg(rng, 100, 500, 50);
    const h = pg(rng, 3, 12, 1);
    const Ef = fix((m * G * h) / (eta / 100));
    return answer(sk, level, t('Un treuil électrique de rendement {eta} % monte {m} de {h}. Quelle énergie électrique consomme-t-il ?', { eta, m: Q(m, 'kg'), h: Q(h, 'm') }), Ef, 'J', {
      traps: [[m * G * h * (eta / 100), 'ph_efficiency_inverted'], [(m * h) / (eta / 100), 'ph_ep_forget_g']],
      solution: [first('E_u = m g h'), L(`${F('E_u')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')} = ${Q(m * G * h, 'J')}`, t('L\'énergie utile : celle qui monte la charge.')), iso('E_f = E_u/η'), L(`${F('E_f')} = ${fr(Q(m * G * h, 'J'), num(eta / 100))}`), res('E_f', Ef, 'J')],
      key: `winch:${eta}:${m}:${h}`,
    });
  }
  if (w === 1) {
    const A = pg(rng, 1.5, 12, 0.5);
    const eta = rng.pick([15, 18, 20, 22]);
    const P = fix(1000 * A * (eta / 100));
    return answer(sk, level, t('Un panneau solaire de {A} reçoit 1000 W par m² de soleil. Son rendement est de {eta} %. Quelle puissance électrique fournit-il ?', { A: Q(A, 'm^2'), eta }), P, 'W', {
      traps: [[(1000 * A) / (eta / 100), 'ph_efficiency_inverted'], [1000 * A * eta, 'percent_as_amount']],
      solution: [L(`${F('P_f')} = 1000 W/m² · ${Q(A, 'm^2')} = ${Q(1000 * A, 'W')}`, t('La puissance du soleil sur tout le panneau.')), iso('P_u = η P_f'), L(`${F('P_u')} = ${num(eta / 100)} · ${Q(1000 * A, 'W')}`), res('P_u', P, 'W')],
      key: `solar:${A}:${eta}`,
    });
  }
  const eta = rng.pick([105, 110, 120, 150]);
  return choice(sk, level, t('Un inventeur annonce un moteur de rendement {eta} %. Est-ce possible ?', { eta }),
    t('Non : il rendrait plus d\'énergie qu\'il n\'en reçoit'),
    [[t('Oui, s\'il est très bien construit'), null], [t('Oui, si on lui fournit beaucoup d\'énergie'), 'ph_efficiency_inverted']], rng,
    { why: t('{eta} : l\'énergie utile est une partie de l\'énergie fournie, donc {eta2} est au plus 1, soit 100 %.', { eta: F('η = E_u/E_f'), eta2: F('η') }), key: `over:${eta}` });
};

// ======================================================================
// ph-conservation : m g h = ½ m v²
// ======================================================================

const DROPS = [[0.8, 4], [1.25, 5], [1.8, 6], [2.45, 7], [3.2, 8], [4.05, 9], [5, 10], [7.2, 12], [11.25, 15], [20, 20], [31.25, 25], [45, 30]];
const CONS_SITS = [
  (x) => t('Un bidon de lait dévale une rampe de {h} de haut, sans frottement, en partant à l\'arrêt. Quelle est sa vitesse en bas ?', x),
  (x) => t('Une pomme tombe d\'une branche à {h} du sol. Sans frottement de l\'air, à quelle vitesse touche-t-elle le sol ?', x),
  (x) => t('Une luge part à l\'arrêt en haut d\'une pente de {h} de dénivelé. Sans frottement, quelle est sa vitesse en bas ?', x),
];

const consSol = (hs, v, unit = 'm/s') => [
  L(F('m g h = 1/2 m v^2'), t('L\'énergie potentielle devient de l\'énergie cinétique.')),
  iso('v = √(2 g h)'),
  L(`${F('v')} = √(2 · 10 N/kg · ${hs})`, t('La masse s\'est simplifiée : on n\'en a pas besoin.')),
  res('v', v, unit),
];

GEN['ph-conservation'] = (level, rng) => {
  const sk = 'ph-conservation';
  if (level === 1 || (level === 2 && rng.chance(0.5))) {
    const i = rng.int(0, CONS_SITS.length - 1);
    const [h, v0] = level === 1 ? rng.pick(DROPS) : (() => { const hh = pg(rng, 1.5, 30, 0.5); return [hh, Math.sqrt(2 * G * hh)]; })();
    const v = fix(v0);
    return answer(sk, level, CONS_SITS[i]({ h: Q(h, 'm') }), v, 'm/s', {
      traps: [[2 * G * h, 'ph_forget_sqrt'], [Math.sqrt(G * h), 'ph_ec_forget_half'], [Math.sqrt(2 * h), 'ph_ep_forget_g']],
      solution: consSol(Q(h, 'm'), v),
      key: `${level}:${i}:${h}`,
    });
  }
  if (level === 2) {
    const m = pg(rng, 0.1, 2, 0.1);
    const h = pg(rng, 2, 20, 1);
    const E = fix(m * G * h);
    return answer(sk, level, t('Une balle de {m} tombe de {h}. Sans frottement, quelle est son énergie cinétique juste avant de toucher le sol ?', { m: Q(m, 'kg'), h: Q(h, 'm') }), E, 'J', {
      traps: [[m * h, 'ph_ep_forget_g'], [0.5 * m * G * h, 'ph_ec_forget_half']],
      solution: [L(`${F('E_c')} = ${F('E_p = m g h')}`, t('Toute l\'énergie potentielle devient cinétique.')), L(`${F('E_c')} = ${Q(m, 'kg')} · 10 N/kg · ${Q(h, 'm')}`), res('E_c', E, 'J')],
      key: `Ec:${m}:${h}`,
    });
  }
  if (level === 3) {
    const [h, v] = rng.pick(DROPS);
    const skate = rng.chance(0.5);
    const prompt = skate
      ? t('Une skateuse arrive en bas d\'une rampe à {v}. Sans frottement, de quelle hauteur est-elle partie, à l\'arrêt ?', { v: Q(v, 'm/s') })
      : t('De quelle hauteur faut-il lâcher un objet, sans frottement, pour qu\'il arrive au sol à {v} ?', { v: Q(v, 'm/s') });
    return answer(sk, level, prompt, h, 'm', {
      traps: [[v / (2 * G), 'ph_ec_forget_square'], [(v * v) / G, 'ph_ec_forget_half'], [(2 * G) / (v * v), 'ph_iso_flip']],
      solution: [L(F('m g h = 1/2 m v^2'), t('L\'énergie potentielle devient de l\'énergie cinétique.')), iso('h = v^2/(2 g)'), L(`${F('h')} = ${fr(`(${Q(v, 'm/s')})²`, '2 · 10 N/kg')}`), res('h', h, 'm')],
      key: `h:${skate}:${v}`,
    });
  }
  if (level === 4) {
    const w = rng.int(0, 2);
    if (w === 0) {
      const [h, v] = rng.pick(DROPS.filter(([, x]) => x >= 10));
      const vk = fix(v * 3.6);
      return answer(sk, level, t('Un skieur part à l\'arrêt et descend {h} de dénivelé, sans frottement. Quelle est sa vitesse en bas, en km/h ?', { h: Q(h, 'm') }), vk, 'km/h', {
        traps: [[v, 'ph_kmh_not_converted'], [v / 3.6, 'speed_factor_wrong_way'], [2 * G * h * 3.6, 'ph_forget_sqrt']],
        solution: [...consSol(Q(h, 'm'), v).slice(0, 3), res('v', v, 'm/s'), L(`${F('v')} = ${num(v)} · 3,6 ${R(vk, 'km/h')}`, t('De m/s en km/h : × 3,6.'))],
        key: `ski:${h}`,
      });
    }
    if (w === 1) {
      const vk = rng.pick([36, 54, 72, 90]);
      const v = vk / 3.6;
      const h = fix((v * v) / (2 * G));
      return answer(sk, level, t('Une voiture qui roule à {v} a autant d\'énergie que si elle était tombée d\'une certaine hauteur. Laquelle ? (Sans frottement.)', { v: Q(vk, 'km/h') }), h, 'm', {
        traps: [[(vk * vk) / (2 * G), 'ph_kmh_not_converted'], [(v * v) / G, 'ph_ec_forget_half']],
        solution: [L(F('m g h = 1/2 m v^2'), t('Même énergie : on égale les deux.')), iso('h = v^2/(2 g)'), si(`${F('v')} = ${Q(vk, 'km/h')} = ${Q(fix(v), 'm/s')}`), L(`${F('h')} = ${fr(`(${Q(fix(v), 'm/s')})²`, '2 · 10 N/kg')}`), res('h', h, 'm')],
        key: `car:${vk}`,
      });
    }
    const hc = pg(rng, 50, 120, 5);
    const h = hc / 100;
    const v = fix(Math.sqrt(2 * G * h));
    return answer(sk, level, t('Une bille roule hors d\'une table de {h} de haut et tombe. Sans frottement, à quelle vitesse (verticale) touche-t-elle le sol, si elle part à l\'arrêt ?', { h: Q(hc, 'cm') }), v, 'm/s', {
      traps: [[Math.sqrt(2 * G * hc), 'ph_not_si'], [2 * G * h, 'ph_forget_sqrt']],
      solution: [si(`${F('h')} = ${Q(hc, 'cm')} = ${Q(h, 'm')}`), ...consSol(Q(h, 'm'), v)],
      key: `table:${hc}`,
    });
  }
  // Level 5.
  const w = rng.int(0, 2);
  if (w === 0) {
    const m1 = rng.pick([2, 5, 10]);
    const m2 = m1 * rng.pick([5, 10]);
    const vars = { m1: Q(m1, 'kg'), m2: Q(m2, 'kg') };
    return choice(sk, level, t('Deux sacs, l\'un de {m1} et l\'autre de {m2}, tombent de la même hauteur, sans frottement. Lequel touche le sol le plus vite ?', vars),
      t('Aucun : même vitesse, car la masse se simplifie'),
      [[t('Le sac de {m2} : il est plus lourd', vars), 'ph_heavier_faster'], [t('Le sac de {m1} : il est plus léger', vars), null]], rng,
      { why: t('{eq} : {m} est des deux côtés, donc {v} ne dépend pas de la masse.', { eq: F('m g h = 1/2 m v^2'), m: F('m'), v: F('v = √(2 g h)') }), key: `bags:${m1}:${m2}` });
  }
  if (w === 1) {
    const k = rng.pick([4, 9, 16]);
    const r = Math.sqrt(k);
    return choice(sk, level, t('On lâche un objet de {k} fois plus haut, sans frottement. Par combien sa vitesse à l\'arrivée est-elle multipliée ?', { k }),
      t('Par {r}, car {v}', { r, v: F('v = √(2 g h)') }),
      [[t('Par {k} : la vitesse est proportionnelle à la hauteur', { k }), 'ph_forget_sqrt'], [t('Par 1 : la vitesse ne dépend que de la masse'), null]], rng,
      { why: t('La hauteur est sous la racine : √{k} = {r}.', { k, r }), key: `root:${k}` });
  }
  const v0 = rng.pick([2, 3, 4, 5, 6]);
  const h = pg(rng, 2, 15, 1);
  const v = fix(Math.sqrt(v0 * v0 + 2 * G * h));
  return answer(sk, level, t('Une luge part à {v0} en haut d\'une pente de {h} de dénivelé. Sans frottement, quelle est sa vitesse en bas ?', { v0: Q(v0, 'm/s'), h: Q(h, 'm') }), v, 'm/s', {
    traps: [[v0 + Math.sqrt(2 * G * h), 'ph_speeds_added'], [Math.sqrt(2 * G * h), 'ph_phase_forgotten']],
    solution: [
      L(F('1/2 m v^2 = 1/2 m v_0^2 + m g h'), t('En bas : l\'énergie cinétique du départ plus l\'énergie potentielle perdue.')),
      iso('v = √(v_0^2 + 2 g h)'),
      L(`${F('v')} = √((${num(v0)})² + 2 · 10 · ${num(h)})`),
      res('v', v, 'm/s'),
    ],
    key: `v0:${v0}:${h}`,
  });
};
