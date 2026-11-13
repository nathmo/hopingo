// f-coef (module F, part a, step U10): Fourier coefficients with the
// convention a₀/2, parity first, a₀ apart, the small special index of a
// trigonometric part. Catalogue docs/universite/VCF-analyse-3-4.md.
//
// Families (multiplier c ∈ {1, 2, 3}): c·x and the step ±c (odd), c·x² and
// c·|x| (even) on ]−π ; π[; c·x, c·x², c·|x| on ]−L ; L[ with L ∈ {1, 2}
// (level 4, period T = 2L ≠ 2π); p + q·cos(mx) + c·|x| or c·x² (level 5,
// the 2022 exam). Parts: a₀ (`definite`), aₙ or bₙ (`equiv` in n, the
// integrations by parts of fourier-a-kit.js), the odd terms n = 2k + 1
// (`equiv` in k), the special index (`value`).

import { MT, H, q, fr, mono, Kpre, V, P, vAdd, vMul, vScale, vText, vAtN, vOddText, pAt, ipp, ipvWrong, freq, build, COEF, COEFK, atN, KEYS, mcqMulti } from './fourier-a-kit.js';
import { examTag } from './kit.js';
import { t } from '../../i18n.js';

const SK = 'f-coef';
const SUB = [
  { id: 'parity', label: t('parité de f'), skill: 'g1-parity-period' },
  { id: 'a0', label: t('a₀ à part'), skill: SK },
  { id: 'an', label: t('intégration par parties'), skill: 'a1-int-parts' },
  { id: 'special', label: t('indice spécial'), skill: SK },
  { id: 'assemble', label: t('n pair, n impair'), skill: SK },
];

export const CHOICES = [
  { id: 'ipp', label: t('Intégrer par parties, u = le polynôme') },
  { id: 'prim', label: t('Écrire une primitive') },
  { id: 'eval', label: t('Évaluer aux bornes : sin(nπ) = 0, cos(nπ) = (−1)ⁿ') },
  { id: 'simp', label: t('Simplifier') },
  { id: 'odd', label: t('Remplacer n par 2k + 1 et simplifier') },
  { id: 'ippbad', label: t('Intégrer par parties avec u = le cosinus'), why: t('Dériver le cosinus ne fait pas baisser le degré du polynôme : on prend u = le polynôme.') },
  { id: 'zero', label: t('Écrire 0 : l\'intégrande est impaire'), rule: 'f_even_an_zero', why: t('Sur [0 ; π], la parité ne dit rien : elle sert seulement sur une période symétrique, et c\'est f(x) sin(nx) (pas f(x) cos(nx)) qui est impaire quand f est paire.') },
];

const LT = { π: 'π', 1: '1', 2: '2' };
const Kof = (L) => (L === 'π' ? { K: '2/π', Kv: V([[2, -1]]) } : L === 1 ? { K: '2', Kv: V([[2]]) } : { K: '1', Kv: V([[1]]) });
const ivl = (L) => (L === 'π' ? ']−π ; π]' : `]−${L} ; ${L}]`);
const cx = (c, body) => (c === 1 ? body : `${c}${body}`);

// A family: display, parity, the polynomial on [0 ; L], and the trap texts.
function family(rng, level) {
  const c = rng.pick([1, 2, 3]);
  if (level === 4 && rng.chance(0.7)) {
    const L = rng.pick([1, 2]);
    const kind = rng.pick(['x', 'x2', 'abs']);
    return fam(kind, c, L);
  }
  const kind = rng.pick(['x', 'x2', 'abs', 'sgn']);
  return fam(kind, c, 'π');
}

function fam(kind, c, L) {
  const show = {
    x: cx(c, 'x'), x2: cx(c, 'x²'), abs: cx(c, '|x|'), sgn: null,
  }[kind];
  const def = kind === 'sgn'
    ? t('f(x) = {a} si −π < x < 0 et f(x) = {c} si 0 < x < π', { a: fr(-c), c })
    : t('f(x) = {show} sur {a}', { show, a: ivl(L) });
  const parity = kind === 'x' || kind === 'sgn' ? 'odd' : 'even';
  const p = { x: P(0, c), x2: P(0, 0, c), abs: P(0, c), sgn: P(c) }[kind];
  return { kind, c, L, def, parity, p, id: `${kind}:${c}:${L}` };
}

// a₀ = (2/L)∫₀^L p dx: start, the primitive, the value; traps.
function a0Part(f, level) {
  const { K, Kv } = Kof(f.L);
  const { Lv, Lt } = freq(f.L);
  const pT = f.p.length === 3 ? `${f.c === 1 ? '' : f.c}x^2` : `${f.c === 1 ? '' : f.c}x`;
  const primT = f.p.length === 3 ? mono(q(f.c, 3), 3) : mono(q(f.c, 2), 2);
  const prim = f.p.length === 3 ? P(0, 0, 0, q(f.c, 3)) : P(0, 0, q(f.c, 2));
  const value = vText(vMul(Kv, pAt(prim, Lv)));
  const Kp = Kpre(K);
  const start = `${Kp}int(${pT}, x, 0, ${Lt})`;
  const wrong02 = `(1/${Lt === '1' ? '1' : Lt}) int(${pT}, x, 0, ${f.L === 'π' ? '2π' : 2 * f.L})`;
  return {
    html: t('a₀ se calcule à part :'), ask: 'a₀ =', start,
    judge: { kind: 'definite', traps: { f_interval_02pi: [{ line: wrong02, ctx: { f: pT.replace('^2', '²') } }] } },
    pre: [
      { kind: 'decision', prompt: t('Comment calculer a₀ ?'), options: [
        { id: 'apart', label: t('À part, avec a₀ = (2/T)∫ f(x) dx'), valid: true },
        { id: 'n0', label: t('Remplacer n par 0 dans la formule de aₙ'), valid: false, rule: 'f_a0_separate', why: t('La formule de aₙ a été obtenue pour n ≥ 1 (on a divisé par n) : en n = 0, elle n\'a pas de sens.') },
      ], levels: [2, 3] },
    ],
    lines: [
      { math: `${Kp}bracket(${primT}, x, 0, ${Lt})`, note: t('Primitive'), subgoal: 'a0', act: 'prim', blank: [primT] },
      { math: value, note: 'a₀', subgoal: 'a0', act: 'eval', blank: [value] },
    ],
    value,
  };
}

// The coefficient part (aₙ for an even f, bₙ for an odd one).
function coefPart(f, level) {
  const { K, Kv } = Kof(f.L);
  const trig = f.parity === 'even' ? 'cos' : 'sin';
  const ch = ipp({ K, Kv, p: f.p, trig, L: f.L });
  const name = trig === 'cos' ? 'aₙ' : 'bₙ';
  const goal = vText(ch.value);
  const traps = {
    f_even_an_zero: ['0'],
    f_ipp_sign: [vText(vMul(Kv, ipvWrong(f.p, trig, f.L)))],
  };
  if (f.L !== 'π') {
    const { Lt } = freq(f.L);
    const Kp = Kpre(K);
    const pT = ch.start.replace(/^.*int\((.*) (sin|cos)\(.*$/, '$1');
    traps.f_period_omega = [{ line: `${Kp}int(${pT} ${trig}(n x), x, 0, ${Lt})`, ctx: { T: String(2 * f.L), omega: f.L === 1 ? 'π' : 'π/2' } }];
  }
  const lines = ch.lines.map((l, i) => {
    const last = i === ch.lines.length - 1;
    const line = { math: l.math, note: { ipp: t('Par parties'), prim: t('Primitive'), eval: t('Aux bornes'), simp: t('Simplifier') }[l.act], subgoal: last ? 'assemble' : 'an', act: l.act };
    if (l.piece) line.blank = [l.piece];
    if (last) { line.blank = [l.math]; line.blank2 = [l.math]; }
    return line;
  });
  return {
    html: `${name} :`, ask: `${name} =`, start: ch.start, judge: COEF(goal, { traps }),
    lines, value: ch.value, goal, name, trig,
  };
}

// n = 2k + 1 when the even terms vanish ((1 − (−1)ⁿ) or ((−1)ⁿ − 1)).
function oddPart(cp) {
  if (!/\(1-\(-1\)\^n\)|\(\(-1\)\^n-1\)/.test(cp.goal)) return null;
  const nm = cp.trig === 'cos' ? 'a' : 'b';
  const goalK = vOddText(cp.value);
  return {
    html: t('n pair : {nm}ₙ = 0. Pour n impair, n = 2k + 1 :', { nm }), ask: `${nm}_(2k+1) =`,
    start: atN(cp.goal, '2k+1'), judge: COEFK(goalK),
    lines: [{ math: goalK, note: '(−1)^(2k+1) = −1', subgoal: 'assemble', act: 'odd', blank: [goalK] }],
  };
}

function parityDecision(par) {
  const opts = [
    { id: 'even', label: t('f est paire : bₙ = 0, on calcule a₀ et aₙ'), valid: par === 'even', why: t('f(−x) = −f(x) : f est impaire.') },
    { id: 'odd', label: t('f est impaire : a₀ = aₙ = 0, on calcule bₙ'), valid: par === 'odd', why: t('f(−x) = f(x) : f est paire.') },
    par === 'even'
      ? { id: 'swap', label: t('f est paire : aₙ = 0, on calcule bₙ'), valid: false, rule: 'f_even_an_zero', why: t('f paire : c\'est f(x) sin(nx) qui est impaire, donc bₙ = 0 ; les aₙ restent.') }
      : { id: 'swap', label: t('f est impaire : bₙ = 0, on calcule aₙ'), valid: false, rule: 'f_even_an_zero', why: t('f impaire : c\'est f(x) cos(nx) qui est impaire, donc aₙ = 0 ; les bₙ restent.') },
    { id: 'none', label: t('Ni paire ni impaire : tout calculer'), valid: false, why: par === 'even' ? t('f(−x) = f(x) : f est paire, ce qui annule tous les bₙ.') : t('f(−x) = −f(x) : f est impaire, ce qui annule a₀ et les aₙ.') },
  ];
  return { kind: 'decision', prompt: t('Parité de f ?'), options: opts };
}

function omegaDecision(L) {
  const w = L === 1 ? 'π' : 'π/2';
  return { kind: 'decision', prompt: t('Période T = {a}. Quelle pulsation ω = 2π/T ?', { a: 2 * L }), options: [
    { id: 'w', label: t('ω = {w} : les modes sont cos(n{a}x), sin(…)', { w, a: w === 'π' ? 'π' : 'π/2·' }), valid: true },
    { id: 'one', label: t('ω = 1 : les modes sont cos(nx), sin(nx)'), valid: false, rule: 'f_period_omega', why: t('Avec T = {a}, ω = 2π/T = {w} : cos(nx) n\'est pas {a}-périodique.', { a: 2 * L, w }) },
    { id: 'twopi', label: 'ω = 2π', valid: false, why: `ω = 2π/T = 2π/${2 * L} = ${w}.` },
  ] };
}

function linesVariant(level, rng, opts, f0) {
  const f = f0 || family(rng, level);
  const parts = [];
  const pre = [{ kind: 'decision', ...parityDecision(f.parity), prompt: t('Parité de f ?') }];
  if (f.L !== 'π') pre.push(omegaDecision(f.L));
  const cp = coefPart(f, level);
  if (f.parity === 'even') {
    const a0 = a0Part(f, level);
    a0.pre = [...pre, ...a0.pre];
    parts.push(a0);
  } else {
    cp.pre = [...pre, { kind: 'note', html: t('f impaire : a₀ = aₙ = 0.') }];
  }
  parts.push(cp);
  const odd = oddPart(cp);
  if (odd && level !== 1) parts.push(odd);
  const { Lt } = freq(f.L);
  const T = f.L === 'π' ? '2π' : String(2 * f.L);
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: f.parity === 'odd' ? t('f est {T}-périodique et {def}. Calcule ses coefficients de Fourier (convention a₀/2, il reste les bₙ).', { T, def: f.def }) : t('f est {T}-périodique et {def}. Calcule ses coefficients de Fourier (convention a₀/2).', { T, def: f.def }),
    hints: H(f.parity === 'even' ? t('Parité d\'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis {name} = {a}∫₀^{Lt} … par parties, u = le polynôme.', { name: cp.name, a: Kpre(Kof(f.L).K).trim(), Lt }) : t('Parité d\'abord : f est impaire, donc a₀ = aₙ = 0. Puis {name} = {a}∫₀^{Lt} … par parties, u = le polynôme.', { name: cp.name, a: Kpre(Kof(f.L).K).trim(), Lt }),
      `${cp.name} = ${MT(cp.start)}`,
      `${MT(cp.lines[0].math)}`),
    key: `${SK}:${level}:${f.id}`, exam: examTag(opts, 5),
  });
}

// ---------- level 5: p + q cos(mx) + c·g(x), the special index ----------

function level5(level, rng, opts) {
  const p = rng.pick([1, 2]);
  const qq = rng.pick([1, 2, 3, -1]);
  const m = rng.pick([1, 2, 3]);
  const c = rng.pick([1, 2]);
  const g = rng.pick(['abs', 'abs', 'x2']);
  const f = fam(g, c, 'π');
  const cosT = `${qq === 1 ? '' : qq === -1 ? '-' : qq}cos(${m === 1 ? '' : m}x)`;
  const gT = g === 'abs' ? cx(c, 'x') : `${c === 1 ? '' : c}x^2`;
  const fDisp = `${p} ${qq < 0 ? '−' : '+'} ${fr(cosT.replace(/^-/, '')).replace('cos(', 'cos(')} + ${g === 'abs' ? cx(c, '|x|') : cx(c, 'x²')}`;
  // a₀ = (2/π)∫₀^π (p + q cos(mx) + g) dx = 2p + (2/π)∫ g.
  const g0 = vMul(V([[2, -1]]), pAt(g === 'abs' ? P(0, 0, q(c, 2)) : P(0, 0, 0, q(c, 3)), V([[1, 1]])));
  const a0v = vAdd(V([[2 * p]]), g0);
  const a0start = `(2/π) int(${p}+${cosT}+${gT}, x, 0, π)`.replace('+-', '-');
  const primT = `${p === 1 ? '' : p}x+${qq === 1 ? '' : qq === -1 ? '-' : qq}sin(${m === 1 ? '' : m}x)${m === 1 ? '' : `/${m}`}+${g === 'abs' ? mono(q(c, 2), 2) : mono(q(c, 3), 3)}`.replace('+-', '-');
  const a0 = {
    html: t('a₀ à part (f est paire : (2/π)∫₀^π) :'), ask: 'a₀ =', start: a0start,
    judge: { kind: 'definite', traps: { f_interval_02pi: [{ line: `(1/π) int(${p}+${cosT}+${gT}, x, 0, 2π)`.replace('+-', '-'), ctx: { f: fr(fDisp) } }] } },
    pre: [parityDecision('even')],
    lines: [
      { math: `(2/π) bracket(${primT}, x, 0, π)`, note: t('Primitive'), subgoal: 'a0', act: 'prim' },
      { math: vText(a0v), note: 'a₀', subgoal: 'a0', act: 'eval' },
    ],
  };
  const cp = coefPart(f, level);
  cp.html = t('La partie {a} donne ãₙ (n ≥ 1) :', { a: g === 'abs' ? cx(c, '|x|') : cx(c, 'x²') });
  cp.ask = 'ãₙ =';
  // The special index m: a_m = q + ã_m.
  const am = vAdd(V([[qq]]), vAtN(cp.value, m));
  const tildeM = vText(vAtN(cp.value, m));
  const amT = vText(am);
  const special = {
    html: t('{a} est son propre développement : il s\'ajoute à a{b}. Calcule a{b} :', { a: fr(`${qq}cos(${m === 1 ? '' : m}x)`).replace(/^1cos/, 'cos').replace(/^−1cos/, '−cos'), b: ['', '₁', '₂', '₃'][m] }),
    ask: `a_${m} =`, start: `a_${m}`,
    judge: { kind: 'value', expect: amT, form: 'closed', traps: { f_a0_separate: [{ line: tildeM, ctx: { c: String(qq) } }] } },
    lines: [{ math: amT, note: `${qq} + ã${['', '₁', '₂', '₃'][m]}`, subgoal: 'special', act: 'simp', blank2: [amT] }],
  };
  const parts = [a0, cp];
  const odd = oddPart(cp);
  if (odd) { odd.html = t('Hors de n = {m}, aₙ = ãₙ. n pair : ãₙ = 0. Pour n = 2k + 1 :', { m }); parts.push(odd); }
  parts.push(special);
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: KEYS, choices: CHOICES,
    prompt: t('f est 2π-périodique et f(x) = {a} sur ]−π ; π]. Calcule a₀, les aₙ (indice {m} compris) et les bₙ.', { a: fr(fDisp), m }),
    hints: H(t('Parité d\'abord ; a₀ à part ; la partie trigonométrique se lit sans intégrer.'), `ãₙ = ${MT(cp.start)}`, MT(cp.lines[0].math)),
    key: `${SK}:${level}:l5:${p}:${qq}:${m}:${c}:${g}`, exam: examTag(opts, 5),
  });
}

// ---------- exam: one coefficient (coef), several statements (mcq) ----------

function coefVariant(rng, opts) {
  const f = family(rng, rng.chance(0.5) ? 4 : 2);
  const cp = coefPart(f, 4);
  const n = rng.pick([2, 3, 4, 5]);
  const val = vText(vAtN(cp.value, n));
  const name = `${cp.trig === 'cos' ? 'a' : 'b'}_${n}`;
  const item = build({
    skill: SK, level: 4, subgoals: SUB, keys: KEYS,
    parts: [{ start: name, judge: { kind: 'value', expect: val, form: 'closed', traps: { f_even_an_zero: ['0'], f_ipp_sign: [vText(vAtN(vMul(Kof(f.L).Kv, ipvWrong(f.p, cp.trig, f.L)), n))] } }, lines: [{ math: val, subgoal: 'an' }] }],
    prompt: t('f est {a}-périodique et {def}. Que vaut {b}{c} ?', { a: f.L === 'π' ? '2π' : 2 * f.L, def: f.def, b: cp.trig === 'cos' ? 'a' : 'b', c: ['', '₁', '₂', '₃', '₄', '₅'][n] }),
    hints: [], noHints: true, key: `${SK}:coef:${f.id}:${n}`, exam: examTag(opts, 1),
  });
  item.final = { form: 'any', askCoef: { label: name } };
  return item;
}

function mcqVariant(rng, opts) {
  const p = rng.pick([1, 2]);
  const qq = rng.pick([1, 2, 3]);
  const m = rng.pick([2, 3]);
  const c = rng.pick([1, 2]);
  const g = rng.pick(['abs', 'x2']);
  const f = fam(g, c, 'π');
  const cp = coefPart(f, 4);
  const tilde = (n) => vAtN(cp.value, n);
  const a0 = vAdd(V([[2 * p]]), vMul(V([[2, -1]]), pAt(g === 'abs' ? P(0, 0, q(c, 2)) : P(0, 0, 0, q(c, 3)), V([[1, 1]]))));
  const am = vAdd(V([[qq]]), tilde(m));
  const fDisp = `${p} + ${qq === 1 ? '' : qq}cos(${m}x) + ${g === 'abs' ? cx(c, '|x|') : cx(c, 'x²')}`;
  const sub = (k) => ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][k];
  const eqT = (name, v) => `${name} = ${MT(vText(v))}`;
  const other = m === 2 ? 4 : 2;
  const options = [
    { html: t('bₙ = 0 pour tout n ≥ 1'), correct: true },
    { html: t('aₙ = 0 pour tout n ≥ 1'), correct: false, rule: 'f_even_an_zero' },
    rng.chance(0.5) ? { html: eqT(`a${sub(m)}`, am), correct: true } : { html: eqT(`a${sub(m)}`, tilde(m)), correct: false, rule: 'f_a0_separate' },
    rng.chance(0.5) ? { html: eqT('a₀', a0), correct: true } : { html: eqT('a₀', vScale(a0, q(1, 2))), correct: false },
    { html: eqT(`a${sub(other)}`, tilde(other)), correct: true },
  ];
  return mcqMulti({
    skill: SK, level: 4, key: `${SK}:mcq:${p}:${qq}:${m}:${c}:${g}`, exam: examTag(opts, 1), options,
    prompt: t('f est 2π-périodique et f(x) = {a} sur ]−π ; π]. Quelles affirmations sont vraies ?', { a: fr(fDisp) }),
    solution: [{ html: t('f est paire : bₙ = 0. a₀ = {a} ; hors de n = {m}, aₙ = {goal} ; a{b} = {qq} + ã{b} = {c}.', { a: MT(vText(a0)), m, goal: MT(cp.goal), b: sub(m), qq, c: MT(vText(am)) }), note: '' }],
    expectedSec: 240,
  }, rng);
}

export const GEN_COEF = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(rng, opts);
    if (opts.exam === 'coef') return coefVariant(rng, opts);
    if (opts.exam === 'open') return rng.chance(0.5) ? level5(4, rng, opts) : linesVariant(4, rng, opts);
    if (level === 5) return level5(5, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
