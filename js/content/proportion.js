// Proportionality and percentages, then quantities and units (including
// inches and feet, where the factor must really be squared or cubed: no
// "move the comma by 2 or 3 places" shortcut).

import { answerItem, mcqItem, mathHtml } from './items.js';
import { gcd } from '../math/rational.js';

const fix = (x) => Math.round(x * 1e9) / 1e9;
const dec = (x) => {
  const s = String(fix(x)).replace('.', ',');
  const [i, d] = s.split(',');
  const int = i.replace('-', '').length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : i;
  return d ? `${int},${d}` : int;
};
const plain = (x) => String(fix(x)).replace('.', ','); // for answers typed on the keypad
const m = (s) => `<span class="m">${s}</span>`;
const N = (x) => m(`<span class="m-num">${dec(x)}</span>`);
// A decimal as an exact fraction [n, d], for trap values.
const asFrac = (x) => {
  let d = 1;
  while (Math.abs(x * d - Math.round(x * d)) > 1e-9 && d < 1e6) d *= 10;
  const n = Math.round(x * d);
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
};
// Keeps wrong answers a student could actually type: positive, different
// from the right one, at most 3 decimals, no duplicates.
const traps = (list, right) => list
  .filter(([v]) => v != null && Number.isFinite(v) && v > 0 && Math.abs(v - right) > 1e-9 && Number.isInteger(fix(v * 1000)))
  .filter(([v], i, all) => all.findIndex(([w]) => Math.abs(w - v) < 1e-9) === i)
  .map(([v, rule]) => ({ value: asFrac(fix(v)), rule }));
const num = (skill, level, prompt, value, opts = {}) => answerItem(skill, level, prompt, plain(value), {
  keys: Number.isInteger(fix(value)) ? 'int' : 'dec', ...opts, traps: traps(opts.traps || [], value),
});

const pickNice = (rng, list) => rng.pick(list);

export const GEN = {};

// ---------- Proportionnel ou pas ? ----------

const SITUATIONS = [
  {
    q: 'Le côté d\'un carré double. Que devient son aire ?',
    right: 'Elle est multipliée par 4', wrongs: [['Elle double', 'linearity_illusion'], ['Elle augmente de 2', 'additive_reasoning'], ['Elle ne change pas', null]],
    why: 'Aire = côté × côté : (2c) × (2c) = 4 × c². L\'aire n\'est pas proportionnelle au côté.',
  },
  {
    q: 'L\'arête d\'un cube triple. Que devient son volume ?',
    right: 'Il est multiplié par 27', wrongs: [['Il triple', 'linearity_illusion'], ['Il est multiplié par 9', null], ['Il augmente de 3', 'additive_reasoning']],
    why: 'Volume = arête³ : 3³ = 27.',
  },
  {
    q: 'Léa a 10 ans et son frère 5 ans. Quel âge aura le frère quand Léa aura 20 ans ?',
    right: '15 ans', wrongs: [['10 ans', 'linearity_illusion'], ['20 ans', null], ['40 ans', null]],
    why: 'Les âges augmentent de la même quantité (+10 ans), ils ne sont pas proportionnels.',
  },
  {
    q: 'Il faut 6 minutes pour cuire 2 œufs dans une casserole. Combien de temps pour 4 œufs dans la même casserole ?',
    right: '6 minutes', wrongs: [['12 minutes', 'linearity_illusion'], ['8 minutes', 'additive_reasoning'], ['3 minutes', null]],
    why: 'Les œufs cuisent en même temps : la durée ne dépend pas du nombre d\'œufs.',
  },
  {
    q: '3 kg de pommes coûtent 7,50 CHF. Combien coûtent 6 kg ?',
    right: '15 CHF', wrongs: [['10,50 CHF', 'additive_reasoning'], ['7,50 CHF', null], ['30 CHF', null]],
    why: 'Le prix est proportionnel à la masse : 2 fois plus de pommes, 2 fois plus cher.',
  },
  {
    q: 'Un rectangle de 2 cm sur 3 cm est agrandi à 4 cm sur 5 cm. Est-ce un agrandissement proportionnel ?',
    right: 'Non : 2 × 2 = 4 mais 3 × 2 ≠ 5', wrongs: [['Oui : on a ajouté 2 cm à chaque côté', 'additive_reasoning'], ['Oui : les deux côtés ont grandi', null], ['On ne peut pas savoir', null]],
    why: 'Agrandir, c\'est multiplier toutes les longueurs par le même nombre, pas ajouter.',
  },
];

GEN['prop-detect'] = (level, rng) => {
  if (level <= 2) {
    const k = level === 1 ? rng.int(2, 6) : rng.pick([1.5, 2.5, 0.5, 1.2]);
    const xs = rng.shuffle([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 4).sort((a, b) => a - b);
    const prop = rng.chance(0.5);
    const add = rng.int(1, 4);
    const ys = xs.map((x) => fix(prop ? k * x : k * x + add));
    const table = `<table class="ptable"><tr><td>x</td>${xs.map((x) => `<td>${dec(x)}</td>`).join('')}</tr><tr><td>y</td>${ys.map((y) => `<td>${dec(y)}</td>`).join('')}</tr></table>`;
    const opts = prop
      ? [{ html: `Oui : on multiplie toujours par ${dec(k)}`, correct: true }, { html: `Non : on n'ajoute pas toujours le même nombre`, correct: false, rule: 'additive_reasoning' }, { html: 'Non : les nombres ne se suivent pas', correct: false }]
      : [{ html: `Non : ${dec(ys[0])} ÷ ${dec(xs[0])} et ${dec(ys[1])} ÷ ${dec(xs[1])} ne donnent pas le même nombre`, correct: true }, { html: 'Oui : y grandit quand x grandit', correct: false, rule: 'additive_reasoning' }, { html: 'Oui : les deux lignes augmentent', correct: false, rule: 'additive_reasoning' }];
    return mcqItem('prop-detect', level, `Ce tableau est-il proportionnel ?${table}`, opts, rng, { key: `t:${xs}:${ys}` });
  }
  const s = rng.pick(SITUATIONS);
  return mcqItem('prop-detect', level, s.q, [{ html: s.right, correct: true }, ...s.wrongs.map(([html, rule]) => ({ html, correct: false, rule }))], rng, {
    solution: [{ html: '', note: s.why }], key: s.q,
  });
};

// ---------- Règle de trois ----------

const GOODS = [['kg de pommes', 'CHF'], ['L d\'essence', 'CHF'], ['m de tissu', 'CHF'], ['cahiers', 'CHF']];

GEN['prop-rule3'] = (level, rng) => {
  if (level === 4) {
    // Inverse proportion: more workers, fewer days.
    const combos = [];
    for (const a of [2, 3, 4, 6]) for (const d of [6, 8, 9, 12]) for (const b of [2, 3, 4, 6, 8, 12]) if (a !== b && (a * d) % b === 0) combos.push([a, d, b]);
    const [w1, d1, w2] = rng.pick(combos);
    const d2 = (w1 * d1) / w2;
    return num('prop-rule3', level, `${w1} ouvriers construisent un mur en ${d1} jours. Combien de jours faut-il à ${w2} ouvriers (même rythme) ?`, d2, {
      suffix: 'jours', traps: [[(d1 * w2) / w1, 'rule3_inverted'], [d1 + (w2 - w1), 'additive_reasoning']],
      solution: [{ math: `${w1}×${d1}`, note: `= ${w1 * d1} jours de travail pour 1 ouvrier.` }, { math: `${w1 * d1}÷${w2}`, note: `= ${dec(d2)} jours. Plus d'ouvriers, moins de jours : c'est inversement proportionnel.` }],
      key: `inv:${w1}:${d1}:${w2}`,
    });
  }
  const [what, unit] = rng.pick(GOODS);
  const unitPrice = level === 1 ? rng.int(2, 9) : level === 2 ? rng.pick([1.5, 2.5, 3.5, 1.2, 0.8]) : rng.pick([1.25, 2.4, 3.6, 0.75, 1.85]);
  const q1 = level === 1 ? rng.int(2, 4) : rng.int(3, 8);
  let q2 = level === 1 ? q1 * rng.int(2, 3) : rng.int(2, 12);
  if (q2 === q1) q2 += 1;
  const p1 = fix(unitPrice * q1);
  const p2 = fix(unitPrice * q2);
  return num('prop-rule3', level, `${q1} ${what} coûtent ${dec(p1)} ${unit}. Combien coûtent ${q2} ${what} ?`, p2, {
    suffix: unit, traps: [[p1 + (q2 - q1), 'additive_reasoning'], [fix((p1 * q1) / q2), 'rule3_inverted']],
    solution: [{ math: `${plain(p1)}÷${q1}`, note: `= ${dec(unitPrice)} ${unit} pour 1 (on passe à l'unité).` }, { math: `${plain(unitPrice)}×${q2}`, note: `= ${dec(p2)} ${unit}` }],
    key: `r3:${q1}:${p1}:${q2}`,
  });
};

// ---------- Échelles ----------

GEN['prop-scale'] = (level, rng) => {
  if (level === 1) {
    const S = rng.pick([50, 100, 200]);
    const d = rng.int(2, 15);
    const real = fix((d * S) / 100);
    return num('prop-scale', level, `Sur un plan à l'échelle 1 : ${S}, une pièce mesure ${d} cm. Combien mesure-t-elle en vrai, en mètres ?`, real, {
      suffix: 'm', traps: [[d * S, 'scale_forget_convert'], [fix(d / S), 'convert_wrong_direction']],
      solution: [{ math: `${d}×${S}`, note: `= ${d * S} cm en vrai, soit ${dec(real)} m.` }], key: `s1:${S}:${d}`,
    });
  }
  if (level <= 3) {
    const S = rng.pick([10000, 25000, 50000, 100000]);
    const d = rng.pick([2, 3, 4, 5, 6, 8, 12]);
    const km = fix((d * S) / 100000);
    if (level === 2) {
      return num('prop-scale', level, `Sur une carte au 1 : ${dec(S)}, deux villages sont à ${d} cm. Quelle est la vraie distance, en km ?`, km, {
        suffix: 'km', traps: [[d * S, 'scale_forget_convert'], [fix((d * S) / 1000), 'scale_forget_convert']],
        solution: [{ math: `${d}×${S}`, note: `= ${dec(d * S)} cm = ${dec(km)} km (1 km = 100 000 cm).` }], key: `s2:${S}:${d}`,
      });
    }
    return num('prop-scale', level, `Sur une carte au 1 : ${dec(S)}, combien de cm représentent ${dec(km)} km ?`, d, {
      suffix: 'cm', traps: [[fix(km * S), 'convert_wrong_direction']],
      solution: [{ math: `${plain(km)}×100000`, note: `${dec(km)} km = ${dec(d * S)} cm` }, { math: `${d * S}÷${S}`, note: `= ${d} cm sur la carte.` }], key: `s3:${S}:${d}`,
    });
  }
  if (level === 4) {
    const S = rng.pick([20000, 25000, 50000]);
    const cm = rng.pick([2, 4, 5]);
    const km = fix((cm * S) / 100000);
    return num('prop-scale', level, `Sur une carte, ${cm} cm représentent ${dec(km)} km. L'échelle est 1 : …`, S, {
      traps: [[fix(km / cm), 'scale_forget_convert'], [fix(S / 100), 'scale_forget_convert']],
      solution: [{ math: `${plain(km)}×100000`, note: `= ${dec(km * 100000)} cm` }, { math: `${km * 100000}÷${cm}`, note: `1 cm sur la carte = ${dec(S)} cm en vrai.` }], key: `s4:${S}:${cm}`,
    });
  }
  // Areas on a plan: the scale is squared.
  const S = rng.pick([10, 50, 100]);
  const a = rng.pick([4, 6, 12, 20, 30]);
  const realM2 = fix((a * S * S) / 10000);
  return num('prop-scale', level, `Sur un plan au 1 : ${S}, une pièce a une aire de ${a} cm². Quelle est son aire réelle, en m² ?`, realM2, {
    suffix: 'm²', traps: [[fix((a * S) / 10000), 'linearity_illusion'], [fix((a * S) / 100), 'linearity_illusion']],
    solution: [{ math: `${a}×${S}^2`, note: `Les longueurs sont × ${S}, donc les aires × ${S}² = ${dec(S * S)}.` }, { math: `${a * S * S}÷10000`, note: `= ${dec(realM2)} m² (1 m² = 10 000 cm²).` }], key: `s5:${S}:${a}`,
  });
};

// ---------- Pourcentage d'une quantité ----------

GEN['pct-of'] = (level, rng) => {
  const p = { 1: rng.pick([10, 50, 25, 20]), 2: rng.pick([5, 15, 30, 40, 75]), 3: rng.pick([12.5, 2.5, 7.5]), 4: rng.pick([17, 23, 8, 35, 64]), 5: rng.pick([8.1, 2.6, 3.8, 7.7]) }[level];
  const base = level <= 2 ? rng.pick([40, 60, 80, 120, 200, 240, 360, 400]) : level === 3 ? rng.pick([80, 160, 240, 400]) : level === 4 ? rng.pick([50, 150, 250, 350]) : rng.pick([100, 200, 300, 500]);
  const v = fix((p * base) / 100);
  const ctx = level === 5 ? `La TVA est de ${dec(p)} %. Combien de TVA sur un achat de ${base} CHF ?` : `Combien font ${dec(p)} % de ${base} ?`;
  return num('pct-of', level, ctx, v, {
    suffix: level === 5 ? 'CHF' : '', traps: [[v * 10, 'percent_shift'], [v / 10, 'percent_shift'], [base - p, 'percent_as_amount']],
    solution: [{ math: `${plain(p)}÷100×${base}`, note: `${dec(p)} % = ${dec(p / 100)}, et ${dec(p / 100)} × ${base} = ${dec(v)}.` }], key: `po:${p}:${base}`,
  });
};

// ---------- Quel pourcentage ? ----------

GEN['pct-which'] = (level, rng) => {
  const total = { 1: rng.pick([10, 20, 50, 100]), 2: rng.pick([25, 40, 200]), 3: rng.pick([40, 60, 80, 120]), 4: rng.pick([40, 80, 160]), 5: rng.pick([24, 32, 48, 64]) }[level];
  let part;
  for (;;) {
    part = rng.int(1, total - 1);
    const pc = (part / total) * 100;
    if (level <= 3 ? Number.isInteger(pc) : Number.isInteger(pc * 10)) break;
  }
  const pc = fix((part / total) * 100);
  const prompt = level === 5 ? `Sur un test de ${total} points, Tim a obtenu ${part} points. Quel pourcentage des points a-t-il obtenu ?` : `${part} sur ${total}, c'est quel pourcentage ?`;
  return num('pct-which', level, prompt, pc, {
    suffix: '%', traps: [[fix((total / part) * 100), 'percent_inverted'], [fix(part / total), 'percent_shift']],
    solution: [{ math: `${part}÷${total}`, note: `= ${dec(part / total)}` }, { math: `${plain(part / total)}×100`, note: `= ${dec(pc)} %` }], key: `pw:${part}:${total}`,
  });
};

// ---------- Hausse et baisse en % ----------

GEN['pct-change'] = (level, rng) => {
  if (level === 4) {
    const p = rng.pick([3, 7, 12, 15, 35]);
    const up = rng.chance(0.5);
    const k = fix(up ? 1 + p / 100 : 1 - p / 100);
    const opts = [
      { html: N(k), correct: true },
      { html: N(p / 100), correct: false, rule: 'percent_as_amount' },
      { html: N(up ? 1 - p / 100 : 1 + p / 100), correct: false },
      { html: N(up ? 1 + p / 10 : 1 - p / 1000), correct: false, rule: 'percent_shift' },
    ];
    return mcqItem('pct-change', level, `${up ? 'Augmenter' : 'Diminuer'} de ${p} %, c'est multiplier par…`, opts, rng, {
      solution: [{ math: up ? `1+${plain(p / 100)}` : `1-${plain(p / 100)}`, note: `= ${dec(k)} : on garde 100 % ${up ? 'et on ajoute' : 'et on retire'} ${p} %.` }], key: `k:${p}:${up}`,
    });
  }
  const p = { 1: rng.pick([10, 50]), 2: rng.pick([20, 25]), 3: rng.pick([15, 30, 5]), 5: rng.pick([12, 35, 8]) }[level];
  const P = level === 5 ? rng.pick([45, 125, 250, 80]) : rng.pick([40, 60, 80, 120, 200, 240]);
  const up = rng.chance(0.5);
  const v = fix(P * (up ? 1 + p / 100 : 1 - p / 100));
  return num('pct-change', level, `Un article coûte ${P} CHF. Son prix ${up ? 'augmente' : 'baisse'} de ${p} %. Quel est le nouveau prix ?`, v, {
    suffix: 'CHF', traps: [[up ? P + p : P - p, 'percent_as_amount'], [fix((P * p) / 100), 'percent_as_amount']],
    solution: [{ math: `${P}×${plain(up ? 1 + p / 100 : 1 - p / 100)}`, note: `${up ? '+' : '−'} ${p} %, c'est × ${dec(up ? 1 + p / 100 : 1 - p / 100)}. Résultat : ${dec(v)} CHF.` }], key: `c:${P}:${p}:${up}`,
  });
};

// ---------- Retrouver la valeur de départ ----------

GEN['pct-reverse'] = (level, rng) => {
  const p = { 1: 10, 2: rng.pick([20, 25]), 3: rng.pick([20, 25, 50]), 4: rng.pick([15, 5, 40]), 5: rng.pick([8, 12, 30]) }[level];
  const up = level <= 2 ? true : rng.chance(0.5);
  const P = rng.pick([40, 60, 80, 100, 120, 150, 200, 250, 300]);
  const k = fix(up ? 1 + p / 100 : 1 - p / 100);
  const Q2 = fix(P * k);
  return num('pct-reverse', level, `Après ${up ? 'une hausse' : 'une baisse'} de ${p} %, un prix vaut ${dec(Q2)} CHF. Quel était le prix de départ ?`, P, {
    suffix: 'CHF', traps: [[fix(Q2 * (up ? 1 - p / 100 : 1 + p / 100)), 'percent_reverse_subtract'], [up ? Q2 - p : Q2 + p, 'percent_as_amount']],
    solution: [{ math: `${plain(Q2)}÷${plain(k)}`, note: `Le départ a été multiplié par ${dec(k)} : on divise par ${dec(k)}. On ne retire pas ${p} % du nouveau prix, car ces ${p} % portaient sur l'ancien.` }], key: `rv:${P}:${p}:${up}`,
  });
};

// ---------- Pourcentages successifs ----------

GEN['pct-successive'] = (level, rng) => {
  if (level <= 2) {
    const p = rng.pick([10, 20, 50]);
    const opts = [
      { html: `Il baisse de ${dec((p * p) / 100)} %`, correct: true },
      { html: 'Il revient au prix de départ', correct: false, rule: 'percent_add_successive' },
      { html: `Il monte de ${dec((p * p) / 100)} %`, correct: false },
      { html: `Il baisse de ${p} %`, correct: false },
    ];
    return mcqItem('pct-successive', level, `Un prix augmente de ${p} %, puis baisse de ${p} %. Que devient-il ?`, opts, rng, {
      solution: [{ math: `${plain(1 + p / 100)}×${plain(1 - p / 100)}`, note: `= ${dec((1 + p / 100) * (1 - p / 100))} : la baisse porte sur un prix plus grand.` }], key: `ms:${p}`,
    });
  }
  const P = rng.pick([100, 200, 400, 500, 80]);
  const a = rng.pick([10, 20, 25, 50]);
  const b = rng.pick([10, 20, 25, 50].filter((x) => x !== a || level >= 4));
  const upFirst = rng.chance(0.5);
  const k1 = upFirst ? 1 + a / 100 : 1 - a / 100;
  const k2 = upFirst ? 1 - b / 100 : 1 + b / 100;
  const v = fix(P * k1 * k2);
  return num('pct-successive', level, `Un prix de ${P} CHF ${upFirst ? 'augmente' : 'baisse'} de ${a} %, puis ${upFirst ? 'baisse' : 'augmente'} de ${b} %. Prix final ?`, v, {
    suffix: 'CHF', traps: [[fix(P * (1 + ((upFirst ? a - b : b - a) / 100))), 'percent_add_successive']],
    solution: [{ math: `${P}×${plain(k1)}×${plain(k2)}`, note: `On enchaîne les coefficients : × ${dec(k1)} puis × ${dec(k2)} = ${dec(v)} CHF.` }], key: `s:${P}:${a}:${b}:${upFirst}`,
  });
};

// ---------- Vitesse moyenne ----------

GEN['speed'] = (level, rng) => {
  if (level === 3) {
    const [h, mn] = rng.pick([[1, 30], [2, 15], [1, 45], [0, 45], [2, 30], [1, 20]]);
    const t = fix(h + mn / 60);
    const opts = [
      { html: `${dec(t)} h`, correct: true },
      { html: `${h},${mn} h`, correct: false, rule: 'time_decimal_minutes' },
      { html: `${dec(h + mn / 100 + 0.1)} h`, correct: false },
      { html: `${h * 60 + mn} h`, correct: false },
    ].filter((o, i, all) => all.findIndex((x) => x.html === o.html) === i);
    return mcqItem('speed', level, `${h ? `${h} h ` : ''}${mn} min, c'est combien d'heures ?`, opts, rng, {
      solution: [{ math: `${mn}÷60`, note: `${mn} min = ${dec(mn / 60)} h (une heure = 60 minutes, pas 100).` }], key: `t:${h}:${mn}`,
    });
  }
  const v = rng.pick([40, 60, 80, 90, 100, 120]);
  const [h, mn] = level === 1 ? [rng.int(2, 4), 0] : rng.pick([[0, 30], [1, 30], [2, 30], [0, 45], [1, 15]]);
  const t = fix(h + mn / 60);
  const d = fix(v * t);
  const time = `${h ? `${h} h` : ''}${h && mn ? ' ' : ''}${mn ? `${mn} min` : ''}`;
  if (level <= 2) {
    return num('speed', level, `Une voiture parcourt ${dec(d)} km en ${time}. Quelle est sa vitesse moyenne ?`, v, {
      suffix: 'km/h', traps: [[fix(d / (h + mn / 100)), 'time_decimal_minutes'], [fix(d / (h * 60 + mn)), 'convert_wrong_direction']],
      solution: [{ math: `${plain(d)}÷${plain(t)}`, note: `${time} = ${dec(t)} h ; v = d ÷ t = ${v} km/h.` }], key: `v:${d}:${t}`,
    });
  }
  if (level === 4) {
    return num('speed', level, `Un train roule à ${v} km/h pendant ${time}. Quelle distance parcourt-il ?`, d, {
      suffix: 'km', traps: [[fix(v * (h + mn / 100)), 'time_decimal_minutes']],
      solution: [{ math: `${v}×${plain(t)}`, note: `d = v × t = ${dec(d)} km` }], key: `d:${v}:${t}`,
    });
  }
  const minutes = h * 60 + mn;
  return num('speed', level, `Une voiture roule à ${v} km/h. Combien de minutes lui faut-il pour ${dec(d)} km ?`, minutes, {
    suffix: 'min', traps: [[fix(t * 100), 'time_decimal_minutes'], [fix(d / v), 'convert_wrong_direction']],
    solution: [{ math: `${plain(d)}÷${v}`, note: `= ${dec(t)} h` }, { math: `${plain(t)}×60`, note: `= ${minutes} min` }], key: `m:${v}:${d}`,
  });
};

// ---------- Pente ----------

GEN['slope'] = (level, rng) => {
  const run = rng.pick([50, 100, 200, 250, 400, 500]);
  const pc = level <= 2 ? rng.pick([2, 4, 5, 6, 8, 10, 12]) : rng.pick([3, 5, 7, 9, 15, 18]);
  const rise = fix((pc * run) / 100);
  if (level === 1 || level === 3) {
    return num('slope', level, `Une route monte de ${dec(rise)} m sur une distance horizontale de ${run} m. Quelle est sa pente ?`, pc, {
      suffix: '%', traps: [[fix((run / rise) * 100), 'slope_inverted'], [fix(rise / run), 'percent_shift']],
      solution: [{ math: `${plain(rise)}÷${run}×100`, note: `pente = dénivelé ÷ distance horizontale = ${pc} %` }], key: `p:${rise}:${run}`,
    });
  }
  if (level === 2 || level === 4) {
    return num('slope', level, `Une route a une pente de ${pc} %. De combien monte-t-elle sur ${run} m (à l'horizontale) ?`, rise, {
      suffix: 'm', traps: [[pc * run, 'percent_shift'], [fix(run / pc), 'slope_inverted']],
      solution: [{ math: `${run}×${pc}÷100`, note: `= ${dec(rise)} m` }], key: `r:${pc}:${run}`,
    });
  }
  const km = rng.pick([1.5, 2, 2.5, 3]);
  const p2 = rng.pick([6, 8, 10, 12]);
  const r = fix(km * 1000 * p2 / 100);
  return num('slope', level, `Un panneau indique une pente de ${p2} % sur ${dec(km)} km. De combien de mètres monte-t-on ?`, r, {
    suffix: 'm', traps: [[fix(km * p2 / 100), 'convert_wrong_direction'], [fix(km * 1000 / p2), 'slope_inverted']],
    solution: [{ math: `${plain(km)}×1000`, note: `${dec(km)} km = ${dec(km * 1000)} m` }, { math: `${km * 1000}×${p2}÷100`, note: `= ${dec(r)} m` }], key: `pn:${km}:${p2}`,
  });
};

// ---------- Conversions d'unités ----------

const LENGTH = [['km', 1000], ['m', 1], ['dm', 0.1], ['cm', 0.01], ['mm', 0.001]];
const MASS = [['t', 1e6], ['kg', 1000], ['g', 1], ['mg', 0.001]];
const CAPACITY = [['L', 1], ['dL', 0.1], ['cL', 0.01], ['mL', 0.001]];
const AREA = [['km²', 1e6], ['ha', 1e4], ['a', 100], ['m²', 1], ['dm²', 0.01], ['cm²', 1e-4], ['mm²', 1e-6]];
const VOLUME = [['m³', 1000], ['hL', 100], ['dm³', 1], ['L', 1], ['dL', 0.1], ['cL', 0.01], ['cm³', 0.001], ['mL', 0.001]];

// Converts between two units of a table; traps: the wrong direction, and a
// factor of 10 per step for areas and volumes (1 m² = 100 cm²).
function convertItem(skill, level, rng, table, { maxSteps = 2, kind = 'linear' } = {}) {
  let from;
  let to;
  let x;
  let v;
  for (let i = 0; i < 200; i++) {
    const a = rng.int(0, table.length - 1);
    const b = rng.int(0, table.length - 1);
    if (a === b || table[a][1] === table[b][1]) continue;
    const steps = Math.abs(a - b);
    if (steps > maxSteps) continue;
    [from, to] = [table[a], table[b]];
    x = level <= 2 ? rng.int(2, 95) : rng.pick([rng.int(2, 95) / 10, rng.int(101, 999) / 100, rng.int(2, 95)]);
    v = fix((x * from[1]) / to[1]);
    if (v >= 0.001 && v < 1e7 && String(v).length < 10) break;
  }
  const ratio = from[1] / to[1];
  const wrong = [[fix(x / ratio), 'convert_wrong_direction']];
  const powered = (u) => /[²³]/.test(u);
  if (kind !== 'linear' && powered(from[0]) && powered(to[0])) {
    const linearSteps = Math.round(Math.log10(Math.abs(ratio)) / (kind === 'area' ? 2 : 3));
    if (Number.isInteger(Math.log10(Math.abs(ratio)))) wrong.push([fix(x * 10 ** linearSteps), kind === 'area' ? 'area_factor_10' : 'volume_factor_10']);
  }
  return num(skill, level, `${N(x)} ${from[0]} = … ${to[0]}`, v, {
    suffix: to[0], traps: wrong,
    solution: [{ math: `${plain(x)}×${plain(ratio)}`, note: `1 ${from[0]} = ${dec(ratio)} ${to[0]}` }], key: `${from[0]}>${to[0]}:${x}`,
  });
}

GEN['u-length'] = (level, rng) => convertItem('u-length', level, rng, LENGTH, { maxSteps: level <= 2 ? 1 : 4 });
GEN['u-mass'] = (level, rng) => convertItem('u-mass', level, rng, rng.chance(0.5) ? MASS : CAPACITY, { maxSteps: level <= 2 ? 1 : 3 });
GEN['u-area'] = (level, rng) => convertItem('u-area', level, rng, level <= 2 ? AREA.slice(3) : AREA, { maxSteps: level <= 3 ? 1 : 2, kind: 'area' });
GEN['u-volume'] = (level, rng) => convertItem('u-volume', level, rng, level <= 2 ? [VOLUME[0], VOLUME[2], VOLUME[6]] : VOLUME, { maxSteps: level <= 3 ? 2 : 4, kind: 'volume' });

GEN['u-time'] = (level, rng) => {
  if (level === 1) {
    const h = rng.int(2, 9);
    return num('u-time', level, `${h} h = … min`, h * 60, { suffix: 'min', traps: [[h * 100, 'time_decimal_minutes']], key: `h:${h}` });
  }
  if (level === 2) {
    const mins = rng.pick([30, 90, 150, 45, 75, 105]);
    return num('u-time', level, `${mins} min = … h (en nombre décimal)`, mins / 60, {
      suffix: 'h', traps: [[Math.floor(mins / 60) + (mins % 60) / 100, 'time_decimal_minutes'], [mins / 100, 'time_decimal_minutes']],
      solution: [{ math: `${mins}÷60`, note: `= ${dec(mins / 60)} h` }], key: `m:${mins}`,
    });
  }
  if (level === 3) {
    const t = rng.pick([1.25, 1.5, 2.75, 0.75, 1.2, 2.4]);
    return num('u-time', level, `${dec(t)} h = … min`, t * 60, {
      suffix: 'min', traps: [[Math.floor(t) * 60 + Math.round((t % 1) * 100), 'time_decimal_minutes'], [t * 100, 'time_decimal_minutes']],
      solution: [{ math: `${plain(t)}×60`, note: `= ${dec(t * 60)} min. ${dec(t)} h n'est pas ${Math.floor(t)} h ${Math.round((t % 1) * 100)} min.` }], key: `d:${t}`,
    });
  }
  if (level === 4) {
    const s = rng.pick([90, 150, 210, 3600, 7200, 450]);
    return num('u-time', level, `${s} s = … min`, s / 60, { suffix: 'min', traps: [[s / 100, 'time_decimal_minutes']], key: `s:${s}` });
  }
  const [h1, m1] = [rng.int(1, 2), rng.pick([15, 30, 45, 50])];
  const m2 = rng.pick([20, 35, 40, 50]);
  const total = h1 * 60 + m1 + m2;
  return num('u-time', level, `Un trajet dure ${h1} h ${m1} min, puis on fait une pause de ${m2} min. Durée totale, en minutes ?`, total, {
    suffix: 'min', traps: [[h1 * 100 + m1 + m2, 'time_decimal_minutes']], key: `t:${h1}:${m1}:${m2}`,
  });
};

GEN['u-speed'] = (level, rng) => {
  const kmh = rng.pick([18, 36, 54, 72, 90, 108, 126, 144]);
  const ms = kmh / 3.6;
  if (level === 1 || level === 3 || level === 5) {
    return num('u-speed', level, `${kmh} km/h = … m/s`, ms, {
      suffix: 'm/s', traps: [[fix(kmh * 3.6), 'speed_factor_wrong_way'], [kmh * 1000, 'convert_wrong_direction']],
      solution: [{ math: `${kmh}×1000÷3600`, note: `${kmh} km en 1 h = ${kmh * 1000} m en 3 600 s, donc ÷ 3,6 = ${dec(ms)} m/s.` }], key: `k:${kmh}`,
    });
  }
  return num('u-speed', level, `${dec(ms)} m/s = … km/h`, kmh, {
    suffix: 'km/h', traps: [[fix(ms / 3.6), 'speed_factor_wrong_way']],
    solution: [{ math: `${plain(ms)}×3,6`, note: `= ${kmh} km/h` }], key: `m:${kmh}`,
  });
};

// ---------- Unités anglo-saxonnes : le facteur se met au carré ou au cube ----------

const INCH = 2.54; // cm
const FOOT = 30.48; // cm

function rounded(skill, level, prompt, exact, decimals, suffix, approxTraps, solution, key) {
  return {
    skill, level, type: 'answer', prompt: `${prompt} <small>(arrondi ${decimals === 0 ? 'à l\'unité' : decimals === 1 ? 'au dixième' : 'au centième'})</small>`,
    expected: plain(Math.round(exact * 10 ** decimals) / 10 ** decimals), form: 'any', exact: null, tree: null,
    traps: [], keys: 'dec', suffix, figure: null,
    baits: [...new Set(approxTraps.map((t) => t.rule))],
    solution, expectedSec: 45, key: `${skill}:${key}`,
    checker: 'rounded', exactValue: exact, decimals, approxTraps,
    expectedHtml: `${N(Math.round(exact * 10 ** decimals) / 10 ** decimals)} ${suffix}`,
  };
}

GEN['u-imperial'] = (level, rng) => {
  if (level === 1) {
    const inches = rng.pick([12, 15, 24, 32, 40, 55, 65]);
    const cm = inches * INCH;
    return rounded('u-imperial', level, `Un écran mesure ${inches} pouces de diagonale (1 pouce = 2,54 cm). Combien en cm ?`, cm, 1, 'cm',
      [{ exact: inches / INCH, rule: 'convert_wrong_direction' }],
      [{ math: `${inches}×2,54`, note: `= ${dec(cm)} cm` }], `in:${inches}`);
  }
  if (level === 2) {
    const [a, b] = [rng.int(8, 16), rng.int(8, 14)];
    const ft2 = a * b;
    const m2 = ft2 * (FOOT / 100) ** 2;
    return rounded('u-imperial', level, `Une chambre mesure ${a} pieds sur ${b} pieds (1 pied = 30,48 cm). Quelle est son aire en m² ?`, m2, 1, 'm²',
      [{ exact: ft2 * (FOOT / 100), rule: 'imperial_linear_factor' }, { exact: ft2 / 0.3048 ** 2, rule: 'convert_wrong_direction' }],
      [{ math: `${a}×0,3048`, note: `${a} pieds = ${dec(a * 0.3048)} m` }, { math: `${b}×0,3048`, note: `${b} pieds = ${dec(b * 0.3048)} m` }, { math: `${plain(a * 0.3048)}×${plain(b * 0.3048)}`, note: `≈ ${dec(Math.round(m2 * 10) / 10)} m². Ou : 1 pied² = 0,3048² m² ≈ 0,0929 m².` }], `a:${a}:${b}`);
  }
  if (level === 3) {
    const ft3 = rng.pick([2, 3, 5, 8, 10]);
    const L = ft3 * (FOOT / 10) ** 3;
    return rounded('u-imperial', level, `Un réfrigérateur a un volume de ${ft3} pieds³ (1 pied = 30,48 cm). Combien de litres ?`, L, 0, 'L',
      [{ exact: ft3 * (FOOT / 10), rule: 'imperial_linear_factor' }, { exact: ft3 * (FOOT / 10) ** 2, rule: 'imperial_linear_factor' }],
      [{ math: '3,048^3', note: `1 pied = 3,048 dm, donc 1 pied³ = 3,048³ dm³ ≈ 28,3 L.` }, { math: `${ft3}×28,32`, note: `≈ ${Math.round(L)} L` }], `v:${ft3}`);
  }
  if (level === 4) {
    const m2 = rng.pick([10, 20, 25, 50, 100]);
    const ft2 = m2 / (FOOT / 100) ** 2;
    return rounded('u-imperial', level, `Un appartement fait ${m2} m². Combien de pieds² (1 pied = 30,48 cm) ?`, ft2, 0, 'pieds²',
      [{ exact: m2 / (FOOT / 100), rule: 'imperial_linear_factor' }, { exact: m2 * (FOOT / 100) ** 2, rule: 'convert_wrong_direction' }],
      [{ math: '0,3048^2', note: '1 pied² = 0,3048² m² ≈ 0,0929 m²' }, { math: `${m2}÷0,0929`, note: `≈ ${Math.round(ft2)} pieds²` }], `r:${m2}`);
  }
  const [l, w, hgt] = [rng.pick([20, 24, 30, 36]), rng.pick([10, 12, 15]), rng.pick([12, 16, 18])];
  const L = (l * w * hgt * INCH ** 3) / 1000;
  return rounded('u-imperial', level, `Un aquarium mesure ${l} × ${w} × ${hgt} pouces (1 pouce = 2,54 cm). Combien de litres contient-il ?`, L, 0, 'L',
    [{ exact: (l * w * hgt * INCH) / 1000, rule: 'imperial_linear_factor' }, { exact: (l * w * hgt) / 1000, rule: 'convert_wrong_direction' }],
    [{ math: `${l}×${w}×${hgt}`, note: `= ${l * w * hgt} pouces³` }, { math: '2,54^3', note: '1 pouce³ = 2,54³ cm³ ≈ 16,39 cm³' }, { math: `${l * w * hgt}×16,387÷1000`, note: `≈ ${Math.round(L)} L` }], `aq:${l}:${w}:${hgt}`);
};

// ---------- Notation scientifique et unités ----------

const SCI = [
  ['La Terre est à 1,5 × 10⁸ km du Soleil. En mètres : 1,5 × 10^? m', 11, 5],
  ['Un virus mesure 1 × 10⁻⁷ m. En mm : 1 × 10^? mm', -4, -10],
  ['La lumière va à 3 × 10⁸ m/s. En km/s : 3 × 10^? km/s', 5, 11],
  ['Un grain de sable pèse 4 × 10⁻⁵ kg. En g : 4 × 10^? g', -2, -8],
  ['Une cellule mesure 2 × 10⁻⁵ m. En µm (1 µm = 10⁻⁶ m) : 2 × 10^? µm', 1, -11],
  ['Une piscine contient 2,5 × 10³ m³. En litres : 2,5 × 10^? L', 6, 0],
  ['Une feuille a une aire de 6 × 10² cm². En m² : 6 × 10^? m²', -2, 6],
];

GEN['u-sci'] = (level, rng) => {
  const [q, e, wrong] = SCI[Math.min(SCI.length - 1, (level - 1) + rng.int(0, 2))];
  return answerItem('u-sci', level, q.replace('10^?', '10<sup>?</sup>'), String(e), {
    keys: 'rel', signed: true, traps: [{ value: [wrong, 1], rule: 'convert_wrong_direction' }], key: q,
    solution: [{ html: '', note: 'Vers une unité plus petite, le nombre grandit : l\'exposant augmente. Vers une plus grande, il diminue.' }],
  });
};
