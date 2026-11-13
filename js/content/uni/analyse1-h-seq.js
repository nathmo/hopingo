// a1-seq-affine (module A1, part h, step U4): aₙ₊₁ = q·aₙ + c. Parts of
// the lines item: the fixed point (solset in L), b₀ = a₀ − L (value), the
// explicit formula (equiv: a(n) stands for the true solution, so any
// writing of it is right, as the catalogue's « F(0) = a₀ and F(n + 1) =
// q·F(n) + c » asks), the limit (limit, discrete). q = 1 has no fixed
// point (∅) and gives an arithmetic sequence. The letter L stands for the
// catalogue's ℓ (the input has no ℓ).

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { JUDGES } from '../../judges/index.js';
import { parse } from '../../cas/parse.js';
import { mcq, tfItem } from './kit.js';
import {
  q, N, nz, H, E, examOf, kx, joinSum, blanked, partsItem, mcqOf, RD, P, MN, fr, base, geoTerm, affineText, part, decision, minus, powText,
} from './analyse1-h-kit.js';

const AF = 'a1-seq-affine';
const KEYS = ['calc', 'seq', 'set', 'anal'];
const SUB = [
  { id: 'fixed', label: t('point fixe'), skill: AF },
  { id: 'geo', label: t('suite géométrique'), skill: 'g5-geom' },
  { id: 'lim', label: t('limite'), skill: AF },
];
const CHOICES = [
  { id: 'fixed', label: t('Chercher le point fixe L = qL + c') },
  { id: 'shift', label: t('Poser bₙ = aₙ − L et calculer b₀') },
  { id: 'geo', label: t('Écrire bₙ = qⁿ·b₀, donc aₙ = L + qⁿ·b₀') },
  { id: 'back', label: t('Simplifier la formule de aₙ') },
  { id: 'arith', label: t('Suite arithmétique : aₙ = a₀ + n·c') },
  { id: 'lim', label: t('Passer à la limite') },
  { id: 'naive', label: t('Écrire aₙ = qⁿ·a₀ + c'), rule: 'a1_affine_rec_no_fixed_point', why: t('Teste n = 0 : q⁰·a₀ + c = a₀ + c, pas a₀. Passe par l\'écart au point fixe.') },
];

const QS = ['1/2', '-1/2', '1/3', '2/3', '3/4', '2', '3', '-2', '1'];
const toQ = (x) => { const [a, b = '1'] = String(x).split('/'); return new Q(Number(a), Number(b)); };

// {R, c, a0, L, b0}: L = c/(1 − q) whole, a₀ ≠ L; q = 1: L null.
function draw(rng, qs = QS) {
  for (let i = 0; i < 200; i++) {
    const R = toQ(rng.pick(qs));
    if (R.eq(1)) return { R, c: nz(rng, -5, 5), a0: nz(rng, -6, 6), L: null, b0: null };
    const L = nz(rng, -8, 8);
    const c = Q.of(L).mul(Q.of(1).sub(R));
    if (c.d !== 1 || c.n === 0 || Math.abs(c.n) > 12) continue;
    const a0 = rng.int(-9, 9);
    if (a0 === L || Math.abs(a0 - L) > 12) continue;
    return { R, c: c.n, a0, L, b0: a0 - L };
  }
  return { R: q(1, 3), c: 4, a0: 2, L: 6, b0: -4, fallback: true };
}

const abs1 = (R) => Math.abs(R.valueOf()) < 1;

// Texts of the item.
function texts(d) {
  const { R, c, a0, L, b0 } = d;
  const rec = `a_(n+1)=${affineText(R, c)}`;
  const out = { rec, recRD: RD(rec, { vars: ['n'] }) };
  if (R.eq(1)) {
    out.fixedEq = c < 0 ? `L=L-${-c}` : `L=L+${c}`;
    out.final = joinSum([N(a0), kx(c, 'n')]);
    out.raw = `${N(a0)}+n×${P(c)}`;
    out.lim = c > 0 ? '+∞' : '-∞';
    return out;
  }
  out.fixedEq = `L=${affineText(R, c, 'L')}`;
  out.fixedMid = `${kx(Q.of(1).sub(R), 'L')}=${c}`;
  out.fixedEnd = `L=${L}`;
  out.b0Raw = `${a0}-${P(L)}`;
  out.geo = geoTerm(b0, R);
  out.final = R.d === 1 ? joinSum([out.geo, N(L)]) : joinSum([N(L), out.geo]);
  out.raw = `${N(L)}+${P(b0)}×${base(R)}^n`;
  out.lim = abs1(R) ? N(L) : R.n > 0 ? (b0 > 0 ? '+∞' : '-∞') : 'none';
  return out;
}

const formulaCfg = (d, T) => ({
  kind: 'equiv', vars: ['n'], funcs: ['a'], defs: { a: T.final }, domain: { n: { int: [0, 12] } },
  target: 'short', goal: T.final, slack: 2,
  affine: { q: d.R.toString(), c: d.c, a0: d.a0, L: d.L },
});
const LIM = { kind: 'limit', v: 'n', vars: ['n'], to: '+∞', discrete: true };

// The decision before the limit (levels 2 to 5): the reason, or the verdict
// when |q| > 1.
function limitDecision(d, T) {
  const R = d.R;
  if (R.eq(1)) {
    return decision(t('Converge-t-elle ?'), [
      { id: 'ok', label: t('Non : chaque pas ajoute {c}, aₙ → {lim}', { c: fr(d.c), lim: T.lim === '+∞' ? '+∞' : '−∞' }), valid: true },
      { id: 'osc', label: t('Elle oscille : elle n\'a pas de limite'), valid: false, why: t('Le pas c est toujours le même : la suite est monotone.') },
    ]);
  }
  if (abs1(R)) {
    return decision(t('Pourquoi aₙ → {L} ?', { L: fr(d.L) }), [
      { id: 'ok', label: t('|q| = {q} < 1, donc qⁿ → 0', { q: fr(Q.of(Math.abs(R.n)).div(R.d)) }), valid: true },
      { id: 'fixed', label: t('{L} est le point fixe, donc la suite y tend', { L: fr(d.L) }), valid: false, rule: 'a1_rec_limit_without_convergence', why: t('La valeur est juste, mais le point fixe ne donne que la limite possible. C\'est |q| < 1 qui fait tendre l\'écart vers 0.') },
    ]);
  }
  const osc = R.n < 0;
  return decision(t('La suite converge-t-elle vers le point fixe ?'), [
    { id: 'ok', label: osc ? t('Non : |q| = {q} > 1, l\'écart change de signe et grandit', { q: Math.abs(R.n) }) : t('Non : q = {q} > 1, l\'écart {b}·{q}ⁿ grandit', { q: R.n, b: fr(d.b0) }), valid: true },
    { id: 'fixed', label: t('Oui : L = {L} vérifie L = qL + c', { L: fr(d.L) }), valid: false, rule: 'a1_rec_limit_without_convergence', why: t('L = {L} est la seule limite possible, mais a₀ ≠ L et |q| > 1 : l\'écart aₙ − L = qⁿ·(a₀ − L) explose.', { L: fr(d.L) }) },
  ]);
}

function affLines(level, rng, opts, d0) {
  const d = d0 || draw(rng, level === 1 ? QS.slice(0, 8) : QS);
  const T = texts(d);
  const R = d.R;
  const g = level <= 2;
  const parts = [];
  if (R.eq(1)) {
    parts.push(part(t('Point fixe : résous L = L + c.'), 'L ∈', T.fixedEq, { kind: 'solset', v: 'L' }, [E('∅', t('q = 1 : pas de point fixe'), 'fixed', 'fixed')]));
    const fCfg = formulaCfg(d, T);
    const lines = level <= 3 ? [E(T.raw, t('On ajoute {c} à chaque pas', { c: fr(d.c) }), 'geo', 'arith'), E(T.final, t('Simplifier'), 'geo', 'back')] : [E(T.final, t('Suite arithmétique'), 'geo', 'arith')];
    if (JUDGES.equiv.isFinal(fCfg, parse(T.raw, { vars: ['n'] })) === true && level <= 3) lines.pop();
    if (g) lines[0] = blanked(lines[0], [String(Math.abs(d.c))]);
    parts.push(part(t('Suite arithmétique : formule de aₙ.'), 'aₙ =', 'a(n)', fCfg, lines));
  } else {
    if (level >= 2) {
      const lines = level <= 3 ? [E(T.fixedMid, t('Regrouper les L'), 'fixed', 'fixed'), E(T.fixedEnd, t('Diviser'), 'fixed', 'fixed')] : [E(T.fixedEnd, t('Point fixe'), 'fixed', 'fixed')];
      if (level === 2) lines[0] = blanked(lines[0], [String(d.c)]);
      parts.push(part(t('Point fixe : résous L = qL + c.'), 'L ∈', T.fixedEq, { kind: 'solset', v: 'L' }, lines));
    }
    const bl = level <= 3 ? [E(T.b0Raw, 'b₀ = a₀ − L', 'geo', 'shift'), E(N(d.b0), t('Calculer'), 'geo', 'shift')] : [E(N(d.b0), 'b₀ = a₀ − L', 'geo', 'shift')];
    if (level === 1) bl[0] = blanked(bl[0], [N(d.L)]);
    parts.push(part(t('bₙ = aₙ {m} est géométrique de raison q = {q}. Son premier terme :', { m: minus(d.L), q: fr(R) }), 'b₀ =', 'b_0', { kind: 'value', expect: N(d.b0) }, bl));
    const fCfg = formulaCfg(d, T);
    const lines = level <= 3 ? [E(T.raw, 'aₙ = L + qⁿ·b₀', 'geo', 'geo'), E(T.final, t('Simplifier'), 'geo', 'back')] : [E(T.final, 'aₙ = L + qⁿ·b₀', 'geo', 'geo')];
    if (level <= 3 && JUDGES.equiv.isFinal(fCfg, parse(T.raw, { vars: ['n'] })) === true) lines.pop();
    if (g) lines[0] = blanked(lines[0], [N(d.b0)]);
    parts.push(part(t('Formule explicite :'), 'aₙ =', 'a(n)', fCfg, lines));
  }
  const limStart = T.lim === 'none' ? `abs(${T.final})` : T.final;
  const limLine = E(T.lim === 'none' ? '+∞' : T.lim, T.lim === 'none' ? t('Le signe de qⁿ alterne, |aₙ| grandit') : R.eq(1) ? t('n·c domine') : abs1(R) ? 'qⁿ → 0' : 'qⁿ → +∞', 'lim', 'lim');
  const limPart = part(T.lim === 'none' ? t('Limite : regarde |aₙ|.') : t('Limite de la suite :'), T.lim === 'none' ? 'lim |aₙ| =' : 'lim aₙ =', limStart, LIM, [limLine]);
  if (level >= 2 && level !== 3) limPart.pre = [limitDecision(d, T)];
  if (level === 3 && T.lim === 'none') limPart.pre = [limitDecision(d, T)];
  parts.push(limPart);
  const given = level === 1 ? ` ${t('Le point fixe est L = {L}.', { L: RD(N(d.L)) })}` : '';
  const prompt = `${t('a₀ = {a0} et {rec}. Trouve la formule explicite de aₙ, puis la limite.', { a0: fr(d.a0), rec: MN(T.rec) })}${given}`;
  const hints = R.eq(1)
    ? H(t('q = 1 : la suite avance du même pas c à chaque fois. C\'est une suite arithmétique.'), `aₙ = ${fr(d.a0)} + n·(▢)`, `aₙ = ${RD(T.final, { vars: ['n'] })}`)
    : H(t('Cherche le nombre L qui ne bouge pas (L = qL + c), puis regarde l\'écart bₙ = aₙ − L : il est géométrique.'),
      `aₙ ${minus(d.L)} = ${powText(R)}·(▢)`, `aₙ = ${RD(T.final, { vars: ['n'] })}`);
  return partsItem({
    skill: AF, level, prompt, parts, choices: CHOICES, hints, subgoals: SUB, keys: KEYS,
    key: `${AF}:${level}:${T.rec}:${d.a0}`, exam: examOf(opts), fallback: d.fallback,
    declares: { vars: ['n'], domain: { n: 'ℕ' } },
  });
}

// ---------- exam variants and level 5 ----------

function affMcq(rng, opts, level = 4) {
  const d = draw(rng);
  const T = texts(d);
  const R = d.R;
  const pv = { a0: fr(d.a0), rec: MN(T.rec) };
  if (!R.eq(1) && rng.chance(0.4)) {
    const naive = joinSum([geoTerm(d.a0, R), N(d.c)]);
    const naiveN = joinSum([geoTerm(d.a0, R), kx(d.c, 'n')]);
    const plus = R.d === 1 ? joinSum([geoTerm(d.a0 + d.L, R), N(-d.L)]) : joinSum([N(-d.L), geoTerm(d.a0 + d.L, R)]);
    const shift = R.d === 1 ? joinSum([geoTerm(d.b0, R).replace(/\^n/, '^(n+1)'), N(d.L)]) : joinSum([N(d.L), geoTerm(Q.of(d.b0).mul(R), R)]);
    return mcqOf({
      skill: AF, level, prompt: t('a₀ = {a0} et {rec}. Quelle est la formule explicite de aₙ ?', pv),
      options: [
        { html: MN(T.final), correct: true },
        { html: MN(naive), correct: false, rule: 'a1_affine_rec_no_fixed_point' },
        { html: MN(naiveN), correct: false, rule: 'a1_affine_rec_no_fixed_point' },
        ...(d.a0 + d.L ? [{ html: MN(plus), correct: false }] : []),
        { html: MN(R.d === 1 ? joinSum([geoTerm(d.a0, R), N(d.L)]) : joinSum([N(d.L), geoTerm(d.a0, R)])), correct: false },
        { html: MN(shift), correct: false },
      ],
      key: `${AF}:mcq:f:${T.rec}:${d.a0}`, expectedSec: 240, exam: examOf(opts), fallback: d.fallback,
      solution: [{ html: t('L = {L}, b₀ = a₀ − L = {b0}, donc aₙ = {f}.', { L: fr(d.L), b0: fr(d.b0), f: RD(T.final, { vars: ['n'] }) }), note: '' }],
    }, rng);
  }
  const inf = (s) => (s === '+∞' ? '+∞' : '−∞');
  const right = R.eq(1) || !abs1(R)
    ? (T.lim === 'none' ? t('Elle n\'a pas de limite : |aₙ| → +∞ et le signe alterne') : `lim aₙ = ${inf(T.lim)}`)
    : `lim aₙ = ${fr(d.L)}`;
  const options = [{ html: right, correct: true }];
  if (!R.eq(1) && !abs1(R)) options.push({ html: `lim aₙ = ${fr(d.L)}`, correct: false, rule: 'a1_rec_limit_without_convergence' });
  if (!R.eq(1) && abs1(R)) options.push({ html: `lim aₙ = ${fr(d.c)}`, correct: false, rule: 'a1_affine_rec_no_fixed_point' });
  options.push({ html: `lim aₙ = ${fr(d.a0)}`, correct: false });
  if (T.lim !== 'none') options.push({ html: t('Elle n\'a pas de limite : elle oscille'), correct: false });
  if (abs1(R)) options.push({ html: 'lim aₙ = +∞', correct: false });
  else if (T.lim === 'none') options.push({ html: 'lim aₙ = +∞', correct: false }, { html: `lim aₙ = ${fr(d.c)}`, correct: false });
  else options.push({ html: `lim aₙ = ${inf(T.lim === '+∞' ? '-∞' : '+∞')}`, correct: false });
  const fT = RD(T.final, { vars: ['n'] });
  const why = R.eq(1) ? t('q = 1 : aₙ = {f}, une suite arithmétique.', { f: fT }) : abs1(R) ? t('aₙ = {f} et qⁿ → 0.', { f: fT }) : t('aₙ = {f} et |q| > 1.', { f: fT });
  return mcqOf({
    skill: AF, level, prompt: t('a₀ = {a0} et {rec}. Que peut-on dire de la limite ?', pv), options,
    key: `${AF}:mcq:l:${T.rec}:${d.a0}`, expectedSec: 240, exam: examOf(opts), fallback: d.fallback,
    solution: [{ html: why, note: '' }],
  }, rng);
}

function affTf(rng, opts) {
  const kind = rng.pick(['sum', 'div', 'conv', 'conv-false', 'conv-false']);
  const A0 = [{ v: 'a', label: 'a₀ =', keys: ['calc'] }];
  if (kind === 'sum') {
    const dd = rng.pick([2, 3, 4]);
    const c = rng.pick([1, 2, 3]);
    const s = rng.pick([1, -1]);
    const tot = q(c * dd, dd - 1).mul(s);
    const step = `${s < 0 ? '−' : '+'} ${c === 1 ? '' : c}/${dd}ⁿ`.replace(' /', ' 1/');
    return tfItem({
      skill: AF, level: 4, truth: true, key: `sum:${dd}:${c}:${s}`, exam: examOf(opts),
      statement: t('Pour tout x₀ ∈ ℝ, la suite xₙ₊₁ = xₙ {step} converge vers x₀ {op} {v}.', { step, op: tot.n < 0 ? '−' : '+', v: fr(Q.of(Math.abs(tot.n)).div(tot.d)) }),
      explanation: t('Vrai : xₙ = x₀ {op} Σ_{k=0}^{n−1} {c}/{d}ᵏ, une somme géométrique de premier terme {c} et de raison 1/{d} : elle tend vers {c}/(1 − 1/{d}) = {v}.', { op: s < 0 ? '−' : '+', c, d: dd, v: fr(q(c * dd, dd - 1)) }),
    });
  }
  const d = draw(rng, kind === 'conv' ? ['1/2', '-1/2', '1/3', '2/3', '3/4'] : ['2', '3', '-2']);
  const T = texts(d);
  const rec = MN(T.rec);
  if (kind === 'conv') {
    return tfItem({
      skill: AF, level: 4, truth: true, key: `conv:${T.rec}`, exam: examOf(opts),
      statement: t('Pour tout a₀ ∈ ℝ, la suite {rec} converge vers {L}.', { rec, L: fr(d.L) }),
      explanation: t('Vrai : aₙ − {L} = ({q})ⁿ·(a₀ − {L}) et |q| < 1 : l\'écart tend vers 0.', { L: fr(d.L), q: fr(d.R) }), fallback: d.fallback,
    });
  }
  if (kind === 'div') {
    return tfItem({
      skill: AF, level: 4, truth: false, key: `div:${T.rec}`, exam: examOf(opts),
      statement: t('Pour tout a₀ ∈ ℝ, la suite {rec} diverge.', { rec }),
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: `a≠${P(d.L)}`, ask: A0, answer: { a: N(d.L) } },
      explanation: t('Faux : pour a₀ = {L}, le point fixe, la suite est constante. Pour tout autre a₀, |aₙ − {L}| = {q}ⁿ·|a₀ − {L}| → +∞.', { L: fr(d.L), q: Math.abs(d.R.n) }), fallback: d.fallback,
    });
  }
  return tfItem({
    skill: AF, level: 4, truth: false, key: `convf:${T.rec}`, exam: examOf(opts), ruleIfTrue: 'a1_rec_limit_without_convergence',
    statement: t('Pour tout a₀ ∈ ℝ, la suite {rec} converge vers {L}, son point fixe.', { rec, L: fr(d.L) }),
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: `a=${P(d.L)}`, ask: A0, answer: { a: N(d.L + 1) } },
    explanation: t('Faux : aₙ − {L} = ({q})ⁿ·(a₀ − {L}). Seul a₀ = {L} donne une suite (constante) qui converge.', { L: fr(d.L), q: fr(d.R) }), fallback: d.fallback,
  });
}

export function affineItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return affMcq(rng, opts);
  if (opts.exam === 'tf') return affTf(rng, opts);
  if (level === 5 && rng.chance(0.4)) return affMcq(rng, opts, 5);
  return affLines(level, rng, opts);
}
