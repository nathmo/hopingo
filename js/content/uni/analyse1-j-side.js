// Generators of module A1, part j (step U4): a1-fn-onesided (each side
// by `limit` with dir '+' and '-', then a « Conclusion » part opened by the
// verdict and the gap between the two limits, judged by `value`) and
// a1-fn-extension (the limit of the piece that simplifies, a = ℓ by
// `value`, b from the other side by `solset`; or the value f(0) of a
// continuous extension). Catalogue: docs/universite/A1-analyse-1.md.

import { t } from '../../i18n.js';
import { MT, linesItem, mcq, tfItem } from './kit.js';
import {
  q, V, KEYS, LIM, qt, pq, fq, kx, xc, sc, poly2, rd, tx, modeOf, H, E, examOf, uniqOptions, blanked, vfMcq, assemble, fitLines,
} from './analyse1-j-kit.js';

// ======================================================================
// a1-fn-onesided
// ======================================================================

const OS = 'a1-fn-onesided';
const OS_SUB = [
  { id: 'side', label: t('limites latérales'), skill: OS },
  { id: 'calc', label: t('calculer chaque limite'), skill: 'a1-fn-limits' },
];
const OS_CHOICES = [
  { id: 'absR', label: t('Enlever la valeur absolue à droite') },
  { id: 'absL', label: t('Enlever la valeur absolue à gauche'), why: t('De ce côté, regarde le signe de ce qui est dans la valeur absolue.') },
  { id: 'simplify', label: t('Simplifier') },
  { id: 'inner', label: t('Limite de 1/x (ou de e^(1/x)) de ce côté') },
  { id: 'seq', label: t('Calculer f(xₙ) le long d\'une suite xₙ → x₀') },
  { id: 'limit', label: t('Passer à la limite') },
  { id: 'concl', label: t('Conclure : comparer les deux limites') },
];

const PI = (k) => (k === 1 ? 'π/2' : k === -1 ? '-π/2' : `${k}π/2`);

// Templates: {f, at, right: [lines], left: [lines], Lp, Lm, gap (text),
// gapLine (text), seq?: {xs, ys}, h1, key}.
function osAbs(rng) {
  const c = rng.int(1, 5);
  const r = rng.pick([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].filter((x) => x !== -c));
  const P = r - c;
  const Q = -r * c;
  const num = `x^2${P === 0 ? '' : P === 1 ? '+x' : P === -1 ? '-x' : sc(P) + 'x'}${sc(Q)}`;
  const f = `(${num})/abs(${xc(-c)})`;
  const L = c + r;
  const fac = `(${xc(-c)})(${xc(r)})`;
  return {
    kind: 'abs', f, at: String(c), Lp: String(L), Lm: String(-L), key: f, abs: `x − ${c}`, c,
    right: [
      { ...E(`${fac}/(${xc(-c)})`, `x > ${c} : |x − ${c}| = x − ${c}`, 'side', 'absR'), holes: [`${xc(-c)}`] },
      E(xc(r), t('Simplifier'), 'calc', 'simplify'),
      E(String(L), t('Passer à la limite'), 'side', 'limit'),
    ],
    left: [
      { ...E(`${fac}/(-(${xc(-c)}))`, `x < ${c} : |x − ${c}| = −(x − ${c})`, 'side', 'absL'), holes: [`-(${xc(-c)})`] },
      { ...E(`-(${xc(r)})`, t('Simplifier'), 'calc', 'simplify'), holes: [`-(${xc(r)})`] },
      E(String(-L), t('Passer à la limite'), 'side', 'limit'),
    ],
    gap: String(2 * L), gapLine: `${L}-${pq(-L)}`,
    h1: t('Enlève la valeur absolue séparément pour x > {c} et x < {c}.', { c }),
    h2: `x < ${c} : |x − ${c}| = □`,
  };
}

function osExp(rng) {
  const k = rng.int(1, 6);
  const m = rng.int(1, 4);
  const f = `${k}/(${m}+e^(1/x))`;
  const Lm = q(k, m);
  return {
    kind: 'exp', f, at: '0', Lp: '0', Lm: qt(Lm), key: f,
    right: [E('0', t('x → 0⁺ : 1/x → +∞, donc e^(1/x) → +∞ et le quotient → 0'), 'side', 'inner')],
    left: [
      { ...E(`${k}/(${m}+0)`, t('x → 0⁻ : 1/x → −∞, donc e^(1/x) → 0'), 'side', 'inner'), holes: ['0'] },
      E(qt(Lm), t('Calculer'), 'side', 'limit'),
    ],
    gap: qt(Lm.neg()), gapLine: `0-${pq(Lm)}`,
    h1: t('Regarde 1/x de chaque côté : e^(1/x) → +∞ en 0⁺, mais → 0 en 0⁻.'),
    h2: `x → 0⁻ : e^(1/x) → □`,
  };
}

function osAtan(rng) {
  const k = rng.pick([1, 1, 2, 3, -1, -2]);
  const c = rng.pick([0, 0, 1, 2, -1]);
  const inner = c === 0 ? '1/x' : `1/(${xc(-c)})`;
  const say = rd(inner);
  const f = `${k === 1 ? '' : k === -1 ? '-' : `${k}`}arctan(${inner})`;
  const Lp = PI(k);
  const Lm = PI(-k);
  const one = (sgn) => (Math.abs(k) === 1 ? [] : [{ ...E(`${k}×(${sgn}π/2)`, t('{s} → {inf}, et Arctg → {sg}π/2', { s: say, inf: sgn === '-' ? '−∞' : '+∞', sg: sgn === '-' ? '−' : '' }), 'side', 'inner'), holes: [`${sgn}π/2`] }]);
  return {
    kind: 'atan', f, at: String(c), Lp, Lm, key: f, exact: true,
    right: [...one(''), E(Lp, Math.abs(k) === 1 ? t('{s} → +∞ et Arctg(u) → π/2', { s: say }) : t('Calculer'), 'side', Math.abs(k) === 1 ? 'inner' : 'limit')],
    left: [...one('-'), E(Lm, Math.abs(k) === 1 ? t('{s} → −∞ et Arctg(u) → −π/2', { s: say }) : t('Calculer'), 'side', Math.abs(k) === 1 ? 'inner' : 'limit')],
    gap: k === 1 ? 'π' : k === -1 ? '-π' : `${k}π`, gapLine: `${Lp}-(${Lm})`,
    h1: t('Regarde le signe de {s} de chaque côté de {c} : Arctg(u) → ±π/2 quand u → ±∞.', { s: say, c }),
    h2: `x → ${c}⁻ : ${say} → □`,
  };
}

function osSinAbs(rng) {
  const k = rng.int(1, 6);
  const f = `sin(${kx(k)})/abs(x)`;
  return {
    kind: 'sinabs', f, at: '0', Lp: String(k), Lm: String(-k), key: f,
    right: [
      { ...E(`sin(${kx(k)})/x`, 'x > 0 : |x| = x', 'side', 'absR'), holes: ['x'] },
      E(String(k), t('sin(u)/u → 1 avec u = {u}', { u: kx(k) }), 'calc', 'limit'),
    ],
    left: [
      { ...E(`sin(${kx(k)})/(-x)`, 'x < 0 : |x| = −x', 'side', 'absL'), holes: ['-x'] },
      E(String(-k), t('sin(u)/u → 1 avec u = {u}', { u: kx(k) }), 'calc', 'limit'),
    ],
    gap: String(2 * k), gapLine: `${k}-(${-k})`,
    h1: t('Enlève la valeur absolue de chaque côté de 0 : |x| = x à droite, −x à gauche.'),
    h2: 'x < 0 : |x| = □',
  };
}

function osSeq(rng) {
  const T = rng.pick(['sin', 'cos']);
  const xs = T === 'sin' ? { x: '1/(2nπ)', f: 'sin(2nπ)', L: '0' } : { x: '1/(2nπ)', f: 'cos(2nπ)', L: '1' };
  const ys = T === 'sin' ? { x: '1/(2nπ + π/2)', f: 'sin(2nπ+π/2)', L: '1' } : { x: '1/((2n + 1)π)', f: 'cos((2n+1)π)', L: '-1' };
  const f = `${T}(1/x)`;
  return {
    kind: 'seq', f, at: '0', Lp: xs.L, Lm: ys.L, key: f, seq: { xs, ys },
    right: [E(xs.L, t('{e} pour tout n', { e: `${T}(2nπ) = ${xs.L === '0' ? '0' : '1'}` }), 'side', 'seq')],
    left: [E(ys.L, t('{e} pour tout n', { e: T === 'sin' ? 'sin(2nπ + π/2) = 1' : 'cos((2n + 1)π) = −1' }), 'side', 'seq')],
    gap: qt(q(Number(ys.L) - Number(xs.L))), gapLine: `${ys.L}-${pq(Number(xs.L))}`,
    h1: t('Prends deux suites qui tendent vers 0, sur lesquelles {T}(1/x) vaut toujours la même chose : 1/xₙ = 2nπ, puis {y}.', { T, y: T === 'sin' ? '2nπ + π/2' : '(2n + 1)π' }),
    h2: `xₙ = 1/(2nπ) : f(xₙ) = ${T}(2nπ) = □`,
  };
}

const OS_T = { abs: osAbs, exp: osExp, atan: osAtan, sinabs: osSinAbs, seq: osSeq };

function osData(rng, kinds) {
  for (let i = 0; i < 200; i++) {
    const d = OS_T[rng.pick(kinds)](rng);
    if (!d) continue;
    return d;
  }
  return { ...osAbs({ int: () => 2, pick: () => 2 }), fallback: true };
}

const atText = (d, side) => `${d.at}${side}`;

function osVerdict(d, rng) {
  return {
    kind: 'decision', prompt: t('Conclusion ?'), options: rng.shuffle([
      { id: 'none', label: d.seq ? t('f(xₙ) et f(yₙ) ont des limites différentes : f n\'a pas de limite en 0') : t('Les deux limites sont différentes : f n\'a pas de limite en {a}', { a: d.at }), valid: true, ref: true },
      { id: 'one', label: d.seq ? t('f tend vers {L} en 0 (la première suite suffit)', { L: fq(d.Lp) }) : t('f tend vers {L} en {a} (la limite à droite suffit)', { L: d.Lp.replace(/-/g, '−'), a: d.at }), valid: false, rule: 'a1_onesided_ignored', why: t('Une limite existe seulement si elle est la même de tous les côtés (et le long de toutes les suites).') },
      { id: 'mean', label: t('f tend vers la moyenne des deux valeurs en {a}', { a: d.at }), valid: false, why: t('Il n\'y a pas de moyenne : deux valeurs différentes, donc pas de limite.') },
    ]),
  };
}

function osLines(level, rng, opts = {}) {
  const kinds = level === 2 ? ['abs', 'abs', 'sinabs', 'exp', 'atan', 'seq'] : ['abs', 'exp', 'atan', 'sinabs', 'seq', 'abs'];
  const d = osData(rng, kinds);
  const seq = !!d.seq;
  const right = seq ? { kind: 'limit', v: 'n', to: '+∞', discrete: true } : LIM(d.at, '+');
  const left = seq ? { kind: 'limit', v: 'n', to: '+∞', discrete: true } : LIM(d.at, '-');
  let rLines = d.right;
  let lLines = d.left;
  if (level === 1) lLines = lLines.map((l) => (l.holes ? blanked(l, l.holes) : l));
  if (level === 2) { rLines = rLines.map((l) => (l.holes ? blanked(l, l.holes) : l)); lLines = lLines.map((l) => (l.holes ? blanked(l, l.holes) : l)); }
  const rStart = seq ? d.seq.xs.f : d.f;
  const lStart = seq ? d.seq.ys.f : d.f;
  const gapStart = seq ? `lim(${d.seq.ys.f},n,+∞)-lim(${d.seq.xs.f},n,+∞)` : `lim(${d.f},x,${atText(d, '⁺')})-lim(${d.f},x,${atText(d, '⁻')})`;
  const gapCfg = { kind: 'value', expect: d.gap, form: 'exact', ...(seq ? { vars: ['n'] } : {}) };
  const pre = [];
  if (level === 2 && (d.kind === 'abs' || d.kind === 'sinabs')) {
    const u = d.kind === 'abs' ? `x − ${d.c}` : 'x';
    pre.push({
      kind: 'decision', prompt: t('Pour x < {a}, |{u}| = ?', { a: d.at, u }), options: rng.shuffle([
        { id: 'neg', label: `−(${u})`, valid: true, ref: true },
        { id: 'pos', label: u, valid: false, rule: 'a1_abs_removed', why: t('Pour x < {a}, {u} < 0 : la valeur absolue change le signe.', { a: d.at, u }) },
      ]),
    });
  }
  const parts = [
    { start: rStart, judge: right, lines: rLines, choices: OS_CHOICES, pre: level === 1 ? [{ kind: 'note', html: d.h1 }] : [] },
    { html: seq ? t('Avec yₙ = {y} → 0 :', { y: d.seq.ys.x }) : t('À gauche de {a} :', { a: d.at }), start: lStart, judge: left, lines: lLines, choices: OS_CHOICES, pre },
    {
      html: seq ? t('Conclusion, et l\'écart entre les deux limites :') : t('Conclusion, et le saut de f en {a} :', { a: d.at }),
      ask: seq ? t('écart =') : t('saut ='), start: gapStart, judge: gapCfg,
      lines: [E(d.gapLine, t('Différence des deux limites'), 'side', 'concl'), E(d.gap, t('Calculer'), 'side', 'concl')],
      choices: OS_CHOICES,
      pre: level === 1 ? [{ kind: 'note', html: t('Les deux limites sont différentes : f n\'a pas de limite en {a}.', { a: d.at }) }] : [osVerdict(d, rng)],
    },
  ];
  const as = assemble(parts, level);
  const first = seq ? t('Avec xₙ = {x} → 0⁺, calcule la limite de f(xₙ).', { x: d.seq.xs.x }) : t('Commence par la limite à droite en {a}.', { a: d.at });
  return linesItem({
    skill: OS, level,
    prompt: `${t('Soit f(x) = {f}.', { f: MT(d.f) })} ${seq ? t('Montre avec deux suites que f n\'a pas de limite en 0.') : t('Calcule les limites de f à droite et à gauche de {a}, puis conclus.', { a: d.at })} ${first}`,
    ...as, mode: modeOf(level),
    hints: H(d.h1, d.h2, seq ? t('f(xₙ) → {p} et f(yₙ) → {m} : pas de limite.', { p: fq(d.Lp), m: fq(d.Lm) }) : t('À droite {p}, à gauche {m} : pas de limite en {a}.', { p: fq(d.Lp), m: fq(d.Lm), a: d.at })),
    subgoals: OS_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: { vars: seq ? ['n'] : ['x'] },
    key: `${OS}:${d.key}:${level}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

// QCM (level 5 and exam).
function osMcq(level, rng, opts = {}) {
  const kind = rng.pick(['two', 'left', 'sinexp', 'exp']);
  let prompt;
  let options;
  let why;
  let key;
  let fallback = false;
  const none = t('n\'existe pas');
  if (kind === 'two' || kind === 'left') {
    const d = osData(rng, ['abs']);
    fallback = !!d.fallback;
    key = `${kind}:${d.f}`;
    if (kind === 'two') {
      prompt = `${MT(`lim(${d.f},x,${d.at})`)} =`;
      options = [
        { html: none, correct: true },
        { html: MT(d.Lp), correct: false, rule: 'a1_onesided_ignored' },
        { html: MT(d.Lm), correct: false, rule: 'a1_onesided_ignored' },
        { html: MT('0'), correct: false },
      ];
      why = t('À droite {p}, à gauche {m} : les deux côtés diffèrent.', { p: fq(d.Lp), m: fq(d.Lm) });
    } else {
      prompt = `${MT(`lim(${d.f},x,${d.at}⁻)`)} =`;
      options = [
        { html: MT(d.Lm), correct: true },
        { html: MT(d.Lp), correct: false, rule: 'a1_abs_removed' },
        { html: none, correct: false, rule: 'a1_onesided_ignored' },
        { html: MT('0'), correct: false },
      ];
      why = t('Pour x < {a}, |x − {a}| = −(x − {a}) : la limite à gauche vaut {m}.', { a: d.at, m: fq(d.Lm) });
    }
  } else if (kind === 'sinexp') {
    key = 'sinexp';
    prompt = `${MT('lim(sin(e^(1/x))/e^(1/x),x,0)')} =`;
    options = [
      { html: none, correct: true },
      { html: MT('0'), correct: false, rule: 'a1_onesided_ignored' },
      { html: MT('1'), correct: false, rule: 'a1_onesided_ignored' },
      { html: '+∞', correct: false },
    ];
    why = t('En 0⁺, u = e^(1/x) → +∞ et sin(u)/u → 0 ; en 0⁻, u → 0 et sin(u)/u → 1. Les deux côtés diffèrent (examen GM).');
  } else {
    const k = rng.int(1, 4);
    key = `exp:${k}`;
    prompt = `${MT(`lim(${k === 1 ? '' : k}e^(1/x),x,0)`)} =`;
    options = [
      { html: none, correct: true },
      { html: '+∞', correct: false, rule: 'a1_onesided_ignored' },
      { html: MT('0'), correct: false, rule: 'a1_onesided_ignored' },
      { html: MT(String(k)), correct: false },
    ];
    why = t('En 0⁺, 1/x → +∞ et e^(1/x) → +∞ ; en 0⁻, 1/x → −∞ et e^(1/x) → 0 : pas de limite.');
  }
  return mcq({
    skill: OS, level: opts.exam ? 4 : level, prompt, options: uniqOptions(options), key: `mcq:${key}`,
    exam: examOf(opts), expectedSec: opts.exam ? 240 : 120, fallback, solution: [{ html: why, note: '' }],
  }, rng);
}

function osTf(rng) {
  const kind = rng.pick(['cbrt', 'abs', 'equal', 'exp']);
  const ex = { format: 'tf', points: 1 };
  if (kind === 'cbrt') {
    return vfMcq(OS, t('Si f est monotone et lim<sub>x→x₀⁻</sub> f(x) = f(x₀), alors f est dérivable à gauche en x₀.'), false, null,
      t('Faux : f(x) = ∛x est croissante et continue en 0, mais (∛x − 0)/x = x^(−2/3) → +∞ : pas de dérivée à gauche en 0.'), rng, 'cbrt');
  }
  if (kind === 'abs') {
    return tfItem({
      skill: OS, level: 4, truth: false, key: 'abs', exam: ex, expectedSec: 60, ruleIfTrue: 'a1_onesided_ignored',
      statement: t('Si lim<sub>x→0</sub> |f(x)| existe, alors lim<sub>x→0</sub> f(x) existe.'),
      counter: {
        kind: 'function', hyp: [{ p: 'limitAt', at: '0', of: 'abs(f)', say: t('|f| a une limite en 0') }], concl: { p: 'limitAt', at: '0' },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calcx', 'calcfn'] }], answer: { f: 'abs(x)/x' },
      },
      explanation: t('Faux : f(x) = |x|/x vaut 1 à droite et −1 à gauche ; |f(x)| = 1 a une limite, f n\'en a pas.'),
    });
  }
  if (kind === 'equal') {
    const L = rng.pick([-3, -1, 2, 5]);
    return tfItem({
      skill: OS, level: 4, truth: true, key: `equal:${L}`, exam: ex, expectedSec: 60,
      statement: t('Si lim<sub>x→0⁺</sub> f(x) = lim<sub>x→0⁻</sub> f(x) = {L}, alors lim<sub>x→0</sub> f(x) = {L}.', { L: fq(L) }),
      explanation: t('Vrai : c\'est le critère des limites latérales ; les deux côtés existent et sont égaux.'),
    });
  }
  return tfItem({
    skill: OS, level: 4, truth: true, key: 'exp', exam: ex, expectedSec: 60, ruleIfFalse: 'a1_onesided_ignored',
    statement: t('lim<sub>x→0</sub> e^(1/x) n\'existe pas.'),
    explanation: t('Vrai : e^(1/x) → +∞ en 0⁺ et → 0 en 0⁻.'),
  });
}

function osItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return osMcq(level, rng, opts);
  if (opts.exam === 'tf') return osTf(rng);
  return osLines(level, rng, opts);
}

// ======================================================================
// a1-fn-extension
// ======================================================================

const EX = 'a1-fn-extension';
const EX_SUB = [
  { id: 'simp', label: t('simplifier'), skill: 'rat-simplify' },
  { id: 'lims', label: t('limites latérales'), skill: 'a1-fn-onesided' },
  { id: 'params', label: t('paramètres'), skill: EX },
];
const EX_CHOICES = [
  { id: 'factor', label: t('Factoriser') },
  { id: 'simplify', label: t('Simplifier par (x − c)') },
  { id: 'limit', label: t('Passer à la limite') },
  { id: 'equal', label: t('Égaler à f(c)') },
  { id: 'left', label: t('Limite à gauche avec le morceau de gauche') },
  { id: 'solve', label: t('Résoudre') },
  { id: 'wrong', label: t('Limite à gauche avec le morceau de droite'), rule: 'a1_extension_wrong_branch', why: t('À gauche de c, f est définie par l\'autre morceau.') },
];

// The piecewise function: right piece p(x − c)(x + r)/((x − c)(x + s)),
// value a at c, left piece bx² + 1 or bx + d.
function exData(rng) {
  for (let i = 0; i < 200; i++) {
    const c = rng.int(1, 4);
    const p = rng.pick([1, 1, 2, 3, -1]);
    const r = rng.int(-4, 5);
    const s = rng.int(-4, 5);
    if (r === s || r === -c || s === -c || -s > c - 0.5 || r === 0) continue;
    if (-s >= c) continue;
    const L = q(p * (c + r), c + s);
    if (L.d > 9 || L.n === 0 || Math.abs(L.n) > 30) continue;
    const quad = rng.chance(0.5);
    const d = quad ? 1 : rng.pick([-3, -2, -1, 1, 2, 3]);
    const B = quad ? L.sub(1).div(c * c) : L.sub(d).div(c);
    if (B.n === 0 || B.d > 12 || Math.abs(B.n) > 20) continue;
    const num = poly2(r - c, -r * c);
    const den = poly2(s - c, -s * c);
    const Rt = p === 1 ? `(${num})/(${den})` : p === -1 ? `-(${num})/(${den})` : `${p}(${num})/(${den})`;
    const R = Rt;
    const left = quad ? 'b×x^2+1' : `b×x${sc(d)}`;
    const leftShow = quad ? 'bx^2+1' : `bx${sc(d)}`;
    const pre = p === 1 ? '' : p === -1 ? '-' : `${p}`;
    return {
      c, p, r, s, L, B, d, quad, R: Rt, left, leftShow, Rkey: R,
      fac: `${pre}(${xc(-c)})(${xc(r)})/((${xc(-c)})${s === 0 ? 'x' : `(${xc(s)})`})`,
      simp: `${pre}(${xc(r)})/${s === 0 ? 'x' : `(${xc(s)})`}`,
      eq: quad ? `${c === 1 ? '' : c * c}b+1=${qt(L)}` : `${c === 1 ? '' : c}b${sc(d)}=${qt(L)}`,
    };
  }
  return { ...exFallback(), fallback: true };
}
function exFallback() {
  return {
    c: 3, p: 1, r: 3, s: 0, L: q(2), B: q(1, 9), d: 1, quad: true, R: '(x^2-9)/(x^2-3x)', left: 'b×x^2+1', leftShow: 'bx^2+1', Rkey: 'fb',
    fac: '(x-3)(x+3)/((x-3)x)', simp: '(x+3)/x', eq: '9b+1=2',
  };
}

function exShow(d) {
  return t('{r} si x > {c}, f({c}) = a, et {l} si x < {c}', { r: MT(d.R), c: d.c, l: MT(d.leftShow) });
}

function exParam(level, rng, opts = {}) {
  const d = exData(rng);
  const lim = LIM(String(d.c), '+');
  let rLines = [
    { ...E(d.fac, t('Factoriser le haut et le bas'), 'simp', 'factor'), holes: [`${xc(-d.c)}`] },
    { ...E(d.simp, t('Simplifier par (x − {c})', { c: d.c }), 'simp', 'simplify'), holes: [xc(d.r)] },
    E(qt(d.L), t('Passer à la limite'), 'lims', 'limit'),
  ];
  let bLines = [
    { ...E(d.eq, t('Limite à gauche de {l}, égale à f({c})', { l: tx(d.leftShow), c: d.c }), 'lims', 'left'), holes: [d.quad ? String(d.c * d.c) : qt(d.L)] },
    E(`b=${qt(d.B)}`, t('Résoudre'), 'params', 'solve'),
  ];
  if (level === 1) { rLines = [rLines[0], rLines[1], blanked(rLines[2], [qt(d.L)])]; bLines = bLines.map((l) => (l.holes ? blanked(l, l.holes) : l)); }
  if (level === 2) { rLines = rLines.map((l) => (l.holes ? blanked(l, l.holes) : l)); }
  const bPre = level === 2 ? [{
    kind: 'decision', prompt: t('Quelle formule pour la limite à gauche de {c} ?', { c: d.c }), options: rng.shuffle([
      { id: 'left', label: t('{l}, le morceau de x < {c}', { l: tx(d.leftShow), c: d.c }), valid: true, ref: true },
      { id: 'right', label: t('{s}, la formule qu\'on vient de simplifier', { s: tx(d.simp) }), valid: false, rule: 'a1_extension_wrong_branch', why: t('À gauche de {c}, c\'est {l} qui définit f.', { c: d.c, l: MT(d.leftShow) }) },
    ]),
  }] : [];
  const parts = [
    { start: d.R, judge: lim, lines: rLines, choices: EX_CHOICES, pre: level === 1 ? [{ kind: 'note', html: t('Limite à droite : le morceau de x > {c} se simplifie par (x − {c}).', { c: d.c }) }] : [] },
    { html: t('Continuité à droite : f({c}) = a doit valoir cette limite.', { c: d.c }), ask: 'a =', start: 'a', judge: { kind: 'value', expect: qt(d.L) }, lines: [E(qt(d.L), t('Égaler à f({c})', { c: d.c }), 'params', 'equal')], choices: EX_CHOICES },
    { html: t('Continuité à gauche : la limite de {l} en {c}⁻ doit valoir {L}.', { l: MT(d.leftShow), c: d.c, L: MT(qt(d.L)) }), start: `lim(${d.left},x,${d.c}⁻)=${qt(d.L)}`, judge: { kind: 'solset', v: 'b' }, lines: bLines, choices: EX_CHOICES, pre: bPre },
  ];
  const as = assemble(parts, level);
  return linesItem({
    skill: EX, level,
    prompt: t('Soit f(x) = {f}. Trouve a et b pour que f soit continue en {c}. Commence par la limite à droite.', { f: exShow(d), c: d.c }),
    ...as, mode: modeOf(level),
    hints: H(t('Calcule la limite de chaque morceau en {c} ; elles doivent valoir f({c}) = a.', { c: d.c }), `${MT(d.simp)} → □`, t('a = {a} et b = {b}', { a: fq(d.L), b: fq(d.B) })),
    subgoals: EX_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'b'] },
    key: `${EX}:${d.Rkey}:${d.left}:${level}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

// f defined off 0: the value f(0) of the continuous extension.
const PROL = [
  (a) => ({ f: `sin(${kx(a)})/x`, lines: [{ m: `(sin(${kx(a)})/(${kx(a)}))×${a}`, n: t('sin(u)/u → 1 avec u = {u}', { u: kx(a) }), act: 'remark' }], L: q(a) }),
  (a) => ({ f: `(e^(${kx(a)})-1)/x`, lines: [{ m: `((e^(${kx(a)})-1)/(${kx(a)}))×${a}`, n: t('(eᵘ − 1)/u → 1 avec u = {u}', { u: kx(a) }), act: 'remark' }], L: q(a) }),
  (a) => ({ f: `(1-cos(${kx(a)}))/x^2`, lines: [{ m: `((1-cos(${kx(a)}))/(${kx(a)})^2)×${a * a}`, n: t('(1 − cos u)/u² → 1/2 avec u = {u}', { u: kx(a) }), act: 'remark' }], L: q(a * a, 2) }),
  (a) => ({ f: `arctan(${kx(a)})/x`, lines: [{ m: `(arctan(${kx(a)})/(${kx(a)}))×${a}`, n: t('Arctg(u)/u → 1 avec u = {u}', { u: kx(a) }), act: 'remark' }], L: q(a) }),
  () => ({ f: 'arctan(x^2)/(x×sin(x))', lines: [{ m: '(arctan(x^2)/x^2)×(x/sin(x))', n: t('Arctg(u)/u → 1 et u/sin(u) → 1'), act: 'remark' }], L: q(1) }),
  () => ({ f: 'x×ln(abs(x))', lines: [], L: q(0), why: t('Croissances comparées : x·Log|x| → 0') }),
];
const PROL_CHOICES = [
  { id: 'remark', label: t('Faire apparaître une limite remarquable') },
  { id: 'compare', label: t('Croissances comparées') },
  { id: 'limit', label: t('Passer à la limite') },
  { id: 'equal', label: t('Poser f(0) = la limite') },
];

function exProl(level, rng, opts = {}) {
  const a = rng.int(2, 5);
  const pl = rng.pick(PROL)(a);
  const lines = [...pl.lines.map((l) => E(l.m, l.n, 'lims', l.act)), E(qt(pl.L), pl.why || t('Passer à la limite'), 'lims', pl.lines.length ? 'limit' : 'compare')];
  const parts = [
    { start: pl.f, judge: LIM('0'), lines, choices: PROL_CHOICES },
    { html: t('Le prolongement : f(0) = la limite.'), ask: 'f(0) =', start: 'f(0)', judge: { kind: 'value', expect: qt(pl.L) }, lines: [E(qt(pl.L), t('Poser f(0) = la limite'), 'params', 'equal')], choices: PROL_CHOICES },
  ];
  const as = assemble(parts, level);
  return linesItem({
    skill: EX, level,
    prompt: t('Soit f(x) = {f} pour x ≠ 0. Calcule sa limite en 0, puis la valeur f(0) qui prolonge f par continuité.', { f: MT(pl.f) }),
    ...as, mode: modeOf(level),
    hints: H(t('f se prolonge par continuité en 0 si sa limite en 0 existe et est finie : on pose f(0) = cette limite.'), `${MT(pl.f)} → □`, `f(0) = ${fq(pl.L)}`),
    subgoals: EX_SUB.filter((s) => s.id !== 'simp'), keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${EX}:prol:${pl.f}:${level}`, exam: examOf(opts),
  });
}

// Level 5: which function is continuous at 0?
const CONT = [
  { f: 'x×sin(1/x)', v: '0', ok: true, why: 'x·sin(1/x) → 0 (0 × borné) = f(0)', bounded: true },
  { f: 'sin(3x)/x', v: '3', ok: true, why: 'sin(3x)/x → 3 = f(0)' },
  { f: '(e^x-1)/x', v: '1', ok: true, why: '(eˣ − 1)/x → 1 = f(0)' },
  { f: 'x×ln(abs(x))', v: '0', ok: true, why: 'x·Log|x| → 0 = f(0)' },
];
const NOT_CONT = [
  { f: 'sin(1/x)', v: '0', why: 'sin(1/x) n\'a pas de limite en 0' },
  { f: 'sin(2x)/x', v: '1', why: 'sin(2x)/x → 2 ≠ f(0)', rule: 'a1_remarkable_limit_scale' },
  { f: 'sin(x)/abs(x)', v: '1', why: 'sin(x)/|x| → 1 à droite et −1 à gauche', rule: 'a1_onesided_ignored' },
  { f: 'x×sin(1/x)', v: '1', why: 'x·sin(1/x) → 0 ≠ f(0)' },
  { f: 'e^(1/x)', v: '0', why: 'e^(1/x) → +∞ en 0⁺', rule: 'a1_onesided_ignored' },
];

function exMcq5(rng, opts) {
  const right = rng.pick(CONT);
  const wrong = rng.shuffle(NOT_CONT.filter((w) => w.f !== right.f)).slice(0, 2);
  const show = (o) => t('{f} pour x ≠ 0, f(0) = {v}', { f: MT(o.f), v: fq(o.v) });
  const options = [
    { html: show(right), correct: true },
    ...wrong.map((w) => ({ html: show(w), correct: false, rule: w.rule })),
    { html: t('Aucune des trois'), correct: false, ...(right.bounded ? { rule: 'a1_bounded_times_zero' } : {}) },
  ];
  return mcq({
    skill: EX, level: opts.exam ? 4 : 5, prompt: t('Laquelle de ces fonctions est continue en 0 ?'), options, keepOrder: false,
    key: `mcq5:${right.f}:${wrong.map((w) => w.f).join(',')}`, exam: examOf(opts), expectedSec: 180,
    solution: [{ html: [right, ...wrong].map((o) => `${MT(o.f)} : ${t(o.why)}`).join(' ; '), note: '' }],
  }, rng);
}

function exMcq(rng, opts) {
  const d = exData(rng);
  // A factorisation slip: the sign of r.
  const slip = q(d.p * (d.c - d.r), d.c + d.s);
  const pair = (a, b) => t('a = {a} et b = {b}', { a: fq(a), b: fq(b) });
  const bOf = (L) => (d.quad ? L.sub(1).div(d.c * d.c) : L.sub(d.d).div(d.c));
  const options = uniqOptions([
    { html: pair(d.L, d.B), correct: true },
    { html: t('a = {a}, et b quelconque', { a: fq(d.L) }), correct: false, rule: 'a1_extension_wrong_branch' },
    { html: t('b = {b}, et a quelconque', { b: fq(d.B) }), correct: false, rule: 'a1_onesided_ignored' },
    ...(slip.eq(d.L) ? [] : [{ html: pair(slip, bOf(slip)), correct: false }]),
    { html: pair(d.L, d.B.neg()), correct: false },
  ]).slice(0, 4);
  return mcq({
    skill: EX, level: 4, prompt: t('Soit f(x) = {f}. Pour quelles valeurs f est-elle continue en {c} ?', { f: exShow(d), c: d.c }),
    options, key: `mcq:${d.Rkey}:${d.left}`, exam: examOf(opts), expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: t('À droite : {s} → {L}, donc a = {L}. À gauche : {e}, donc b = {B}.', { s: MT(d.simp), L: fq(d.L), e: MT(d.eq), B: fq(d.B) }), note: '' }],
  }, rng);
}

function exTf(rng) {
  const kind = rng.pick(['sinexp', 'sqrt', 'bounded', 'hole']);
  const ex = { format: 'tf', points: 1 };
  if (kind === 'sinexp') {
    return tfItem({
      skill: EX, level: 4, truth: true, key: 'sinexp', exam: ex, expectedSec: 60,
      statement: t('f(x) = sin((eˣ − 1)/x) se prolonge par continuité en 0.'),
      explanation: t('Vrai : (eˣ − 1)/x → 1 et sin est continue, donc f(x) → sin 1 ; on pose f(0) = sin 1.'),
    });
  }
  if (kind === 'sqrt') {
    return vfMcq(EX, t('f(x) = √|x|·sin(1/x) pour x ≠ 0, et f(0) = 1, est continue en 0.'), false, 'a1_bounded_times_zero',
      t('Faux : |√|x|·sin(1/x)| ≤ √|x| → 0, donc la limite vaut 0 ≠ f(0) = 1.'), rng, 'sqrt');
  }
  if (kind === 'bounded') {
    return tfItem({
      skill: EX, level: 4, truth: false, key: 'bounded', exam: ex, expectedSec: 60,
      statement: t('Si f est continue et bornée sur ℝ ∖ {0}, alors f se prolonge par continuité en 0.'),
      counter: {
        kind: 'function', hyp: [{ p: 'boundedOn', on: ['-1', '1'] }], concl: { p: 'limitAt', at: '0', say: t('f a une limite finie en 0 (elle se prolonge)') },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calcx', 'calcfn'] }], answer: { f: 'sin(1/x)' },
      },
      explanation: t('Faux : sin(1/x) est continue et bornée sur ℝ ∖ {0}, mais n\'a pas de limite en 0.'),
    });
  }
  return tfItem({
    skill: EX, level: 4, truth: false, key: 'hole', exam: ex, expectedSec: 60,
    statement: t('Si lim<sub>x→0</sub> f(x) existe et est finie, alors f est continue en 0.'),
    counter: {
      kind: 'function', hyp: [{ p: 'limitAt', at: '0' }], concl: { p: 'continuousAt', at: '0' },
      ask: [{ v: 'f', label: 'f(x) =', keys: ['calcx', 'calcfn'] }], answer: { f: 'sin(x)/x' },
    },
    explanation: t('Faux : sin(x)/x → 1, mais f n\'est pas définie en 0 ; il faut encore f(0) = la limite (le prolongement).'),
  });
}

function exItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return exMcq(rng, opts);
  if (opts.exam === 'tf') return exTf(rng);
  if (level === 5) return exMcq5(rng, opts);
  if (level === 4 && rng.chance(0.35)) return exProl(level, rng, opts);
  return exParam(level, rng, opts);
}

export const GEN = { [OS]: osItem, [EX]: exItem };
