// Generators of module A1, part a (step U2): the derivative of an inverse
// function at a point, and logarithmic derivatives u(x)^(v(x)).
// Catalogue: docs/universite/A1-analyse-1.md, `a1-deriv-inverse` and
// `a1-deriv-log`. Helpers: analyse1-a-kit.js.
//
// a1-deriv-inverse: four parts, x₀ (value), f′ (equiv), f′(x₀) (value),
// (f⁻¹)′(y₀) = 1/f′(x₀) (value, with cfg.inv for the trap
// a1_inverse_deriv_wrong_point). a1-deriv-log: e^(v·Log u), the
// derivative (equiv), then f′(x₀) in closed form (judge `definite`, whose
// final form accepts 8·Log 2 + 1).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { deriv } from '../../cas/ast.js';
import { seedOf } from '../../cas/equiv.js';
import { MT, linesItem, mcq, tfItem } from './kit.js';
import { N, modeOf, H, E, examOf, uniqOptions, blanked, withMenus, segment, frN, vfMcq, mulT, fracT } from './analyse1-a-kit.js';
import { t } from '../../i18n.js';

const q = (n, d = 1) => new Q(n, d);

// ======================================================================
// a1-deriv-inverse
// ======================================================================

const INV = 'a1-deriv-inverse';
const INV_SUB = [
  { id: 'x0', label: t('trouver x₀ avec f(x₀) = y₀'), skill: 'g1-inverse' },
  { id: 'deriv', label: t('dériver f'), skill: 'a1-deriv-rules' },
  { id: 'inv', label: '(f⁻¹)′(y₀) = 1/f′(x₀)', skill: INV },
];
const INV_CHOICES = [
  { id: 'x0', label: t('Trouver x₀ avec f(x₀) = y₀') },
  { id: 'deriv', label: t('Dériver f') },
  { id: 'eval', label: t('Évaluer f′ en x₀') },
  { id: 'invert', label: t('Inverser : (f⁻¹)′(y₀) = 1/f′(x₀)') },
  { id: 'wrong', label: t('Évaluer f′ en y₀'), rule: 'a1_inverse_deriv_wrong_point', why: t('f′ se prend en x₀ = f⁻¹(y₀), pas en y₀.') },
];

// x₀ as text and value: whole numbers, multiples of π/2.
const PI = (k, d = 1) => {
  const K = q(k, d);
  if (K.n === 0) return '0';
  const num = Math.abs(K.n) === 1 ? 'π' : `${Math.abs(K.n)}π`;
  return `${K.n < 0 ? '-' : ''}${num}${K.d === 1 ? '' : `/${K.d}`}`;
};

// {f, fp: f′ as text, x0, y0 (texts), fpx0: Q, fpy0: number, family}
function invData(rng) {
  for (let i = 0; i < 200; i++) {
    const fam = rng.pick(['poly', 'poly', 'sin', 'cos', 'exp']);
    if (fam === 'poly') {
      const a = rng.int(1, 6);
      const b = rng.int(-5, 5);
      const x0 = rng.pick([-2, -1, 1, 2]);
      const y0 = x0 ** 3 + a * x0 + b;
      if (y0 === x0 || Math.abs(y0) > 20) continue;
      const f = `x^3+${a === 1 ? '' : a}x${b === 0 ? '' : b > 0 ? `+${b}` : b}`;
      return { fam, f, fp: `3x^2+${a}`, fpAt: (t) => `3×(${t})^2+${a}`, x0: String(x0), y0: String(y0), fpx0: q(3 * x0 * x0 + a), fpy0: q(3 * y0 * y0 + a), domain: [-2.5, 2.5] };
    }
    if (fam === 'exp') {
      const a = rng.int(1, 4);
      return { fam, f: `e^x+${a === 1 ? '' : a}x`, fp: `e^x+${a}`, fpAt: (t) => (String(t) === '1' ? `e+${a}` : `e^(${t})+${a}`), x0: '0', y0: '1', fpx0: q(1 + a), fpy0: Math.E + a, domain: [-2, 2] };
    }
    const a = rng.pick([2, 3, 4]);
    if (fam === 'sin') {
      const k = rng.pick([1, -1, 2, 3]);
      const fpx0 = q(a + (k % 2 === 0 ? 1 : -1));
      const fpy0 = q(a + Math.round(Math.cos(a * k * Math.PI)));
      if (fpy0.eq(fpx0)) continue;
      return { fam, f: `${a}x+sin(x)`, fp: `${a}+cos(x)`, fpAt: (t) => `${a}+cos(${t})`, x0: PI(k), y0: PI(a * k), fpx0, fpy0, domain: [-3, 3] };
    }
    const k = rng.pick([1, -1, 3]);
    const s = k === 1 || k === -3 ? 1 : -1; // sin(kπ/2)
    const fpx0 = q(a - s);
    const fpy0 = q(a - Math.round(Math.sin((a * k * Math.PI) / 2)));
    if (fpy0.eq(fpx0)) continue;
    return { fam, f: `${a}x+cos(x)`, fp: `${a}-sin(x)`, fpAt: (t) => `${a}-sin(${t})`, x0: PI(k, 2), y0: PI(a * k, 2), fpx0, fpy0, domain: [-3, 3] };
  }
  return { fam: 'poly', f: 'x^3+3x+1', fp: '3x^2+3', fpAt: (t) => `3×(${t})^2+3`, x0: '1', y0: '5', fpx0: q(6), fpy0: q(78), domain: [-2.5, 2.5], fallback: true };
}

function invLines(level, rng, opts = {}) {
  const d = invData(rng);
  const fr = (t) => t.replace(/-/g, '−');
  const ans = q(1).div(d.fpx0);
  const exact = d.fam === 'sin' || d.fam === 'cos';
  const L0 = [E(d.x0, `f(${fr(d.x0)}) = ${fr(d.y0)}`, 'x0', 'x0')];
  const L1 = [E(d.fp, t('Dériver f'), 'deriv', 'deriv')];
  const L2 = [E(d.fpAt(d.x0).replace(/\(\((.*?)\)\)/, '($1)'), t('Remplacer x par x₀'), 'deriv', 'eval'), E(N(d.fpx0), t('Calculer'), 'deriv', 'eval')];
  const L3 = [E(N(ans), `(f⁻¹)′(${fr(d.y0)}) = 1/f′(${fr(d.x0)})`, 'inv', 'invert')];
  const s0 = withMenus({ kind: 'value', expect: d.x0, form: exact ? 'exact' : 'irreducible' }, level, 'x_0', L0, INV_CHOICES);
  const s1 = withMenus({ kind: 'equiv', vars: ['x'], dvar: 'x', domain: { x: d.domain }, target: 'no-prime' }, level, toText(deriv(parse(d.f), 'x')), L1, INV_CHOICES);
  const s2 = withMenus({ kind: 'value', expect: N(d.fpx0) }, level, `f'(${d.x0})`, L2, INV_CHOICES);
  const s3 = withMenus({ kind: 'value', expect: N(ans), inv: { fp: d.fp, x0: d.x0, y0: d.y0 } }, level, `(f^(-1))'(${d.y0})`, L3, INV_CHOICES);
  const choose = {
    kind: 'decision', prompt: t('Quel x₀ vérifie f(x₀) = {y0} ?', { y0: fr(d.y0) }), options: uniqOptions([
      { id: 'x0', html: d.x0, label: `x₀ = ${fr(d.x0)}`, valid: true },
      { id: 'y0', html: d.y0, label: `x₀ = ${fr(d.y0)}`, valid: false, rule: 'a1_inverse_deriv_wrong_point', why: t('f({y0}) ≠ {y02} : y₀ est la valeur, pas le point où l\'on dérive.', { y0: fr(d.y0), y02: fr(d.y0) }) },
      { id: 'zero', html: '0', label: 'x₀ = 0', valid: false, why: `f(0) ≠ ${fr(d.y0)}.` },
    ]).filter((o) => o.id !== 'zero' || d.x0 !== '0'),
  };
  const script = [
    ...(level === 1 ? [{ kind: 'note', html: `f(${fr(d.x0)}) = ${fr(d.y0)}.` }] : level === 2 ? [choose] : []),
    ...L0,
    segment(t('Dérive f.'), 'f′(x) =', toText(deriv(parse(d.f), 'x')), s1),
    ...L1,
    segment(t('Évalue f′ en x₀ = {x0}.', { x0: fr(d.x0) }), `f′(${fr(d.x0)}) =`, `f'(${d.x0})`, s2),
    ...(level === 1 ? [blanked(L2[0], [d.x0]), L2[1]] : L2),
    segment(t('Conclus.'), `(f⁻¹)′(${fr(d.y0)}) =`, `(f^(-1))'(${d.y0})`, s3),
    ...L3,
  ];
  const key = `${INV}:${d.f}:${d.y0}:${level}`;
  return linesItem({
    skill: INV, level, prompt: rng.pick([
      t('Soit f(x) = {f}, bijective de ℝ dans ℝ. Calcule (f⁻¹)′({y0}).', { f: MT(d.f), y0: fr(d.y0) }),
      t('f(x) = {f} est strictement croissante sur ℝ. Sans chercher la formule de f⁻¹, calcule la dérivée de f⁻¹ en {y0}.', { f: MT(d.f), y0: fr(d.y0) }),
    ]),
    start: 'x_0', judge: s0, mode: modeOf(level), script, keys: ['calcx', 'calcfn', 'trig'], declares: { vars: ['x'] },
    subgoals: INV_SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(t('Cherche le x₀ dont l\'image est {y0} : c\'est là qu\'on dérive f.', { y0: fr(d.y0) }), `(f⁻¹)′(${fr(d.y0)}) = 1/f′(□)`, `(f⁻¹)′(${fr(d.y0)}) = 1/f′(${fr(d.x0)}) = ${frN(ans)}`),
    key, exam: examOf(opts), fallback: d.fallback,
  });
}

function invMcq(rng, opts) {
  const d = invData(rng);
  const fr = (t) => t.replace(/-/g, '−');
  const ans = q(1).div(d.fpx0);
  const num = (x) => (x instanceof Q ? MT(N(x)) : null);
  const options = [{ html: num(ans), correct: true }];
  if (d.fpy0 instanceof Q) options.push({ html: num(q(1).div(d.fpy0)), correct: false, rule: 'a1_inverse_deriv_wrong_point' });
  else options.push({ html: MT(`1/(${d.fpAt(d.y0)})`), correct: false, rule: 'a1_inverse_deriv_wrong_point' });
  options.push({ html: num(d.fpx0), correct: false, rule: 'g1_inverse_reciprocal' });
  options.push({ html: t('f⁻¹ n\'est pas dérivable en {y0}', { y0: fr(d.y0) }), correct: false });
  options.push({ html: num(ans.neg()), correct: false });
  return mcq({
    skill: INV, level: opts.exam ? 4 : 5, prompt: t('Soit f(x) = {f}, bijective de ℝ dans ℝ. Que vaut (f⁻¹)′({y0}) ?', { f: MT(d.f), y0: fr(d.y0) }),
    options: uniqOptions(options).slice(0, 4), key: `mcq:${d.f}:${d.y0}`, exam: examOf(opts), expectedSec: 240, fallback: d.fallback,
    solution: [{ html: t('f({x0}) = {y0}, f′(x) = {fp}, f′({x02}) = {fpx0}, donc (f⁻¹)′({y02}) = 1/f′({x03}) = {ans}.', { x0: fr(d.x0), y0: fr(d.y0), fp: MT(d.fp), x02: fr(d.x0), fpx0: frN(d.fpx0), y02: fr(d.y0), x03: fr(d.x0), ans: frN(ans) }), note: '' }],
  }, rng);
}

const INV_TF = [
  { s: 'Si f est bijective et continue de ℝ dans ℝ, alors f⁻¹ est dérivable partout.', truth: false, why: 'Faux : f(x) = x³ est bijective et continue, mais f⁻¹(y) = ∛y n\'est pas dérivable en 0 (f′(0) = 0).' },
  { s: 'Toute bijection de ℝ dans ℝ est strictement monotone.', truth: false, why: 'Faux : f(x) = 1/x pour x ≠ 0 et f(0) = 0 est une bijection de ℝ dans ℝ, mais elle n\'est pas monotone. (Une bijection <b>continue</b> l\'est.)' },
  { s: 'Si f est bijective, dérivable en x₀ avec f′(x₀) ≠ 0, et f⁻¹ continue en y₀ = f(x₀), alors (f⁻¹)′(y₀) = 1/f′(x₀).', truth: true, why: 'Vrai : c\'est le théorème de la dérivée de la réciproque.' },
];
function invTf(rng) {
  const tf = rng.pick(INV_TF);
  if (!tf.truth) return vfMcq(INV, t(tf.s), false, null, t(tf.why), rng, tf.s);
  return tfItem({ skill: INV, level: 4, statement: t(tf.s), truth: true, key: tf.s, explanation: t(tf.why), exam: { format: 'tf', points: 1 } });
}

function derivInverse(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return invMcq(rng, opts);
  if (opts.exam === 'tf') return invTf(rng);
  return invLines(level, rng, opts);
}

// ======================================================================
// a1-deriv-log
// ======================================================================

const LOG = 'a1-deriv-log';
const LOG_SUB = [
  { id: 'exp', label: 'u^v = e^(v·Log u)', skill: 'g2-real-powers' },
  { id: 'deriv', label: t('dériver l\'exposant'), skill: 'a1-deriv-rules' },
  { id: 'eval', label: t('évaluer'), skill: LOG },
];
const LOG_CHOICES = [
  { id: 'exp', label: t('Écrire f = e^(v·Log u)') },
  { id: 'deriv', label: t('Dériver l\'exposant (règle de chaîne)') },
  { id: 'eval', label: t('Évaluer en x₀') },
  { id: 'simplify', label: t('Simplifier') },
  { id: 'base', label: t('(aᵛ)′ = aᵛ·Log a·v′, avec a = u'), rule: 'a1_exp_rule_var_base', why: t('La base u dépend de x : cette règle ne vaut que pour une base constante.') },
  { id: 'power', label: t('(xⁿ)′ = n·xⁿ⁻¹, avec n = v'), rule: 'g6_power_rule_exp', why: t('L\'exposant dépend de x : la règle des puissances ne vaut que pour un exposant constant.') },
];

// u and v: text, derivative, value at x₀ (whole numbers).
const U = {
  xa: (a) => ({ t: `x+${a}`, d: '1', at: (x) => x + a }),
  sq: () => ({ t: '1+x^2', d: '2x', at: (x) => 1 + x * x }),
  x: () => ({ t: 'x', d: '1', at: (x) => x }),
};
const V = {
  x: () => ({ t: 'x', d: '1', at: (x) => x, dat: () => 1 }),
  x2: () => ({ t: 'x^2', d: '2x', at: (x) => x * x, dat: (x) => 2 * x }),
  sq: () => ({ t: '1+x^2', d: '2x', at: (x) => 1 + x * x, dat: (x) => 2 * x }),
  ax: (a) => ({ t: `${a}x`, d: String(a), at: (x) => a * x, dat: () => a }),
};
const par = (t) => (/[+-]/.test(t) ? `(${t})` : t);
// m·Log n written with a prime-power base: Log 4 = 2·Log 2.
function logOf(n) {
  for (const p of [2, 3, 5, 7]) {
    let k = 0;
    let m = n;
    while (m % p === 0) { m /= p; k++; }
    if (m === 1 && k > 0) return { base: p, k };
  }
  return { base: n, k: 1 };
}
// c1·Log(base) + c2 as text, closed form.
function closedText(c1, base, c2) {
  const terms = [];
  if (c1.n !== 0) terms.push(c1.eq(1) ? `ln(${base})` : c1.eq(-1) ? `-ln(${base})` : c1.d === 1 ? `${c1.n}ln(${base})` : `${N(c1)}×ln(${base})`);
  if (c2.n !== 0) terms.push(N(c2));
  if (!terms.length) return '0';
  return terms.reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '');
}

function logData(rng) {
  for (let i = 0; i < 200; i++) {
    const uk = rng.pick(['xa', 'xa', 'sq', 'x']);
    const u = uk === 'xa' ? U.xa(rng.int(1, 3)) : U[uk]();
    const vk = uk === 'x' ? 'x' : rng.pick(['x', 'x', 'x2', 'sq', 'ax']);
    const v = vk === 'ax' ? V.ax(rng.pick([2, 3])) : V[vk]();
    if (u.t === v.t && uk !== 'sq') continue;
    const x0 = rng.pick([0, 1, 2]);
    const Ux = u.at(x0);
    if (Ux <= 0 || (uk === 'x' && x0 === 0)) continue;
    const Vx = v.at(x0);
    const fx = Ux ** Vx;
    if (fx > 81) continue;
    // f′ = u^v·(v′·Log u + v·u′/u): at x₀, f(x₀)·v′(x₀)·Log U + f(x₀)·v(x₀)·u′(x₀)/U.
    const du0 = uk === 'sq' ? 2 * x0 : 1;
    const { base, k } = logOf(Ux);
    const c1 = q(fx * v.dat(x0) * k);
    const c2 = q(fx * Vx * du0, Ux);
    const value = Ux === 1 ? N(c2) : closedText(c1, base, c2);
    if (value === '0') continue;
    const f = `${par(u.t)}^${v.t === 'x' ? 'x' : `(${v.t})`}`;
    const vdl = mulT(v.d, `ln(${u.t})`);
    const vdu = u.t === v.t ? u.d : fracT({ n: mulT(v.t, u.d), d: u.t });
    const bracket = `${vdl}+${vdu}`;
    return { f, u, v, x0, value, bracket, vdl, vdu, expo: `${par(v.t)}×ln(${u.t})`, fp: `${f}×(${bracket})`, Ux, fx, c1, c2, base };
  }
  const u = U.xa(3);
  return { f: '(x+3)^x', u, v: V.x(), x0: 1, value: '8ln(2)+1', bracket: 'ln(x+3)+x/(x+3)', vdl: 'ln(x+3)', vdu: 'x/(x+3)', expo: 'x×ln(x+3)', fp: '(x+3)^x×(ln(x+3)+x/(x+3))', Ux: 4, fx: 4, c1: q(8), c2: q(1), base: 2, fallback: true };
}

function logLines(level, rng, opts = {}) {
  const d = logData(rng);
  const at = (t) => t.replace(/x/g, `(${d.x0})`).replace(/\(\((\d)\)\)/g, '($1)');
  const start = toText(deriv(parse(d.f), 'x'));
  const judge = { kind: 'equiv', vars: ['x'], dvar: 'x', domain: { x: [0.5, 2] }, target: 'no-prime' };
  const expLine = E(`d(e^(${d.expo}))`, t('Forme exponentielle'), 'exp', 'exp');
  const dLine = E(d.fp, t('Dériver l\'exposant, puis revenir à f'), 'deriv', 'deriv');
  const valStart = at(d.fp);
  const vLines = [E(d.value, t('Évaluer et simplifier'), 'eval', 'eval')];
  const lines1 = level === 1 ? [blanked(dLine, [d.vdl.includes(d.vdu) ? d.vdl : d.vdu])] : level === 2 ? [blanked(expLine, [d.expo]), blanked(dLine, [d.bracket])] : [expLine, dLine];
  const label = `f′(${d.x0})`;
  const script = [
    ...(level === 1 ? [{ kind: 'note', html: t('L\'exposant dépend de x : f(x) = {p1}.', { p1: MT(`e^(${d.expo})`) }) }] : []),
    ...lines1,
    segment(t('Calcule maintenant {label}.', { label }), `${label} =`, valStart, withMenus({ kind: 'definite' }, level, valStart, vLines, LOG_CHOICES)),
    ...vLines,
  ];
  const key = `${LOG}:${d.f}:${d.x0}:${level}`;
  const s0 = withMenus({ ...judge, seed: seedOf(key) }, level, start, [expLine, dLine], LOG_CHOICES);
  return linesItem({
    skill: LOG, level, prompt: rng.pick([
      t('Soit f(x) = {f}{p1}. Dérive f, puis calcule {label}.', { f: MT(d.f), p1: d.u.t === 'x' ? ' (x > 0)' : '', label }),
      t('Calcule la dérivée de f(x) = {f}{p1}, puis sa valeur en {x0}.', { f: MT(d.f), p1: d.u.t === 'x' ? t(' sur ]0 ; +∞[') : '', x0: d.x0 }),
    ]),
    start: level === 1 ? `d(e^(${d.expo}))` : start, judge: level === 1 ? { ...judge, seed: seedOf(key) } : s0, mode: modeOf(level), script,
    keys: ['calcx', 'calcfn', 'explog'], declares: { vars: ['x'], dvar: 'x' }, subgoals: LOG_SUB, tapActions: level === 3 ? 'steps' : null,
    hints: H(t('L\'exposant dépend de x : écris f = {p1}, puis dérive avec la règle de chaîne.', { p1: MT(`e^(${d.expo})`) }), `f′ = f·(${MT(d.vdl)} + □)`, `f′(x) = ${MT(d.fp)} ; ${label} = ${MT(d.value)}`),
    key, exam: examOf(opts, opts.exam === 'open' ? 2 : 1), fallback: d.fallback,
  });
}

function logMcq(rng, opts) {
  // The 2021 exam: (1 + x²)^(1 + x²) at 1, and its family.
  const d = logData(rng);
  const x0 = d.x0;
  // a1_exp_rule_var_base: f·Log u·v′ only; the power rule: v·u^(v−1)·u′.
  const vd = d.v.dat(x0);
  const du0 = d.u.t === '1+x^2' ? 2 * x0 : 1;
  const { k } = logOf(d.Ux);
  const wrong1 = d.Ux === 1 ? '0' : closedText(q(d.fx * vd * k), d.base, q(0));
  const Vx = d.v.at(x0);
  const wrong2 = N(q(Vx * d.Ux ** (Vx - 1) * du0));
  const lnPart = d.Ux === 1 ? q(0) : d.c1;
  const others = [
    closedText(lnPart, d.base, q(d.fx * Vx * du0)),
    closedText(lnPart.add(lnPart), d.base, d.c2),
    closedText(lnPart, d.base, d.c2.add(q(1))),
    N(d.c2),
    closedText(q(1), d.Ux, d.c2),
    N(d.c2.add(q(1))),
    N(d.c2.mul(q(2)).add(q(1))),
  ];
  const options = uniqOptions([
    { html: MT(d.value), correct: true },
    { html: MT(wrong1), correct: false, rule: 'a1_exp_rule_var_base' },
    { html: MT(wrong2), correct: false, rule: 'g6_power_rule_exp' },
    ...others.map((t) => ({ html: MT(t), correct: false })),
  ].filter((o, i) => i === 0 || o.html !== MT(d.value))).slice(0, 4);
  return mcq({
    skill: LOG, level: 4, prompt: t('Soit f(x) = {f}. Que vaut f′({x0}) ?', { f: MT(d.f), x0 }), options, key: `mcq:${d.f}:${x0}`,
    exam: examOf(opts), expectedSec: 240, fallback: d.fallback,
    solution: [{ html: `f = ${MT(`e^(${d.expo})`)}, f′(x) = ${MT(d.fp)}, f′(${x0}) = ${MT(d.value)}.`, note: '' }],
  }, rng);
}

function derivLog(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return logMcq(rng, opts);
  if (opts.exam === 'open') return logLines(5, rng, opts);
  return logLines(level, rng, opts);
}

export const GEN = { [INV]: derivInverse, [LOG]: derivLog };
