// a1-seq-rec-fixed (module A1, part h, step U4): aₙ₊₁ = f(aₙ) with f
// increasing and two whole fixed points l₁ < l₂ (or a double one c):
//   sqrt    f(x) = √(sx − p)      (s = l₁ + l₂, p = l₁l₂): l₂ attracts
//   square  f(x) = (x² + p)/s     l₁ attracts, above l₂ the sequence → +∞
//   double  f(x) = (x² + c²)/(2c) one fixed point c; above it → +∞
// Parts of the lines item: the candidates L = f(L) (solset in L), the sign
// of f(x) − x (solset), then the conclusion: decisions (stable interval,
// monotony and bound) and « lim aₙ = » (value, cfg.recfix for the trap
// a1_rec_limit_without_convergence), or for a divergent sequence the
// bound aₙ ≥ a₀ + n·δ whose limit is +∞ (limit, discrete).

import { Q } from '../../math/rational.js';
import { mcq, tfItem } from './kit.js';
import {
  q, N, H, E, examOf, kx, joinSum, blanked, partsItem, mcqOf, RD, P, MN, fr, part, decision,
} from './analyse1-h-kit.js';

const RF = 'a1-seq-rec-fixed';
const KEYS = ['calc', 'seq', 'set', 'anal'];
const SUB = [
  { id: 'cand', label: 'candidats L = f(L)', skill: 'quad-formula' },
  { id: 'sign', label: 'signe de f(x) − x', skill: 'g1-sign-table' },
  { id: 'conclude', label: 'monotone et bornée', skill: 'a1-seq-monotone' },
];
const CHOICES = [
  { id: 'solve', label: 'Résoudre L = f(L)' },
  { id: 'sign', label: 'Signe de f(x) − x' },
  { id: 'stable', label: 'Montrer f(I) ⊂ I' },
  { id: 'conclude', label: 'Monotone et bornée, donc convergente' },
  { id: 'diverge', label: 'Minorer aₙ par a₀ + n·δ' },
  { id: 'terms', label: 'Calculer les premiers termes' },
  { id: 'fixed', label: 'Prendre un point fixe comme limite', rule: 'a1_rec_limit_without_convergence', why: 'Un point fixe est seulement une limite possible : il faut d\'abord prouver que la suite converge.' },
];

// {kind, l1, l2, s, p, a0, region}
function draw(rng, { kinds = ['sqrt', 'sqrt', 'square', 'square', 'double'], region = null } = {}) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(kinds);
    let l1;
    let l2;
    if (kind === 'double') { l1 = rng.int(1, 4); l2 = l1; } else { l1 = rng.int(0, 4); l2 = l1 + rng.int(1, 6); }
    const s = kind === 'double' ? 2 * l1 : l1 + l2;
    const p = l1 * l2;
    if (s < 2 || s > 12 || p > 40) continue;
    const regions = kind === 'sqrt' ? ['in', 'above'] : kind === 'double' ? ['below', 'above'] : l1 > 0 ? ['below', 'in', 'above'] : ['in', 'above'];
    const reg = region && regions.includes(region) ? region : rng.pick(regions);
    let a0;
    if (reg === 'in') a0 = l2 - l1 >= 2 ? Q.of(rng.int(l1 + 1, l2 - 1)) : q(2 * l1 + 1, 2);
    else if (reg === 'below') a0 = l1 >= 2 ? Q.of(rng.int(0, l1 - 1)) : q(rng.pick([0, 1]), 2);
    else a0 = Q.of(l2 + rng.int(1, 3));
    if (kind === 'sqrt' && a0.cmp(q(p, s)) < 0) continue;
    return { kind, l1, l2, s, p, a0, region: reg };
  }
  return { kind: 'sqrt', l1: 2, l2: 4, s: 6, p: 8, a0: Q.of(3), region: 'in', fallback: true };
}

// f as text in the letter u.
function fText(d, u = 'x') {
  if (d.kind === 'sqrt') return d.p ? `√(${d.s}${u}-${d.p})` : `√(${d.s}${u})`;
  return d.p ? `(${u}^2+${d.p})/${d.s}` : `${u}^2/${d.s}`;
}
const fAt = (d, x) => {
  const X = Q.of(x);
  if (d.kind === 'sqrt') return X.mul(d.s).sub(d.p).sqrt();
  return X.mul(X).add(d.p).div(d.s);
};

// What the sequence does: {dir: 1 | −1, lim: text, bound, I, fixed}.
function behaviour(d) {
  const fixed = d.l1 === d.l2 ? [N(d.l1)] : [N(d.l1), N(d.l2)];
  const { region: r, kind, l1, l2 } = d;
  if (kind === 'sqrt') return r === 'in' ? { dir: 1, lim: N(l2), I: `]${l1} ; ${l2}[`, bound: l2, fixed } : { dir: -1, lim: N(l2), I: `]${l2} ; +∞[`, bound: l2, fixed };
  if (r === 'below') return { dir: 1, lim: N(l1), I: `[0 ; ${l1}[`, bound: l1, fixed };
  if (r === 'in') return { dir: -1, lim: N(l1), I: `]${l1} ; ${l2}[`, bound: l1, fixed };
  return { dir: 1, lim: '+∞', I: `]${l2} ; +∞[`, bound: null, fixed };
}

function texts(d) {
  const f = fText(d);
  const rec = `a_(n+1)=${fText(d, 'a_n')}`;
  const cand = `L=${fText(d, 'L')}`;
  const quad = `L^2-${d.s}L${d.p ? `+${d.p}` : ''}=0`;
  const candEnd = d.l1 === d.l2 ? `L=${d.l1}` : `L=${d.l1}∨L=${d.l2}`;
  const sign = `${f}-x>0`;
  let signMid;
  let signEnd;
  if (d.kind === 'sqrt') { signMid = `x^2-${d.s}x${d.p ? `+${d.p}` : ''}<0`; signEnd = `]${d.l1};${d.l2}[`; } else if (d.kind === 'double') { signMid = `(x-${d.l1})^2/${d.s}>0`; signEnd = `]-∞;${d.l1}[∪]${d.l1};+∞[`; } else { signMid = `(x^2-${d.s}x${d.p ? `+${d.p}` : ''})/${d.s}>0`; signEnd = `]-∞;${d.l1}[∪]${d.l2};+∞[`; }
  return { f, rec, cand, quad, candEnd, sign, signMid, signEnd };
}

const A0 = (d) => fr(d.a0);
const recfix = (d, B) => ({ fixed: B.fixed, lim: B.lim, a0: d.a0.toString() });

// The decisions of the conclusion: why the sequence stays in I, then where
// it goes.
function conclusionDecisions(d, B, T) {
  const fx = RD(T.f);
  const out = [];
  if (B.bound !== null) {
    const ends = d.region === 'in' ? `f(${d.l1}) = ${d.l1} et f(${d.l2}) = ${d.l2}` : d.region === 'below' ? `f(0) = ${fr(fAt(d, 0))} ≥ 0 et f(${d.l1}) = ${d.l1}` : `f(${d.l2}) = ${d.l2}`;
    out.push(decision(`a₀ = ${A0(d)} ∈ ${B.I}. Pourquoi aₙ ∈ ${B.I} pour tout n ?`, [
      { id: 'ok', label: `f est croissante, ${ends} : f(I) ⊂ I, puis récurrence`, valid: true },
      { id: 'sign', label: `Parce que f(x) − x garde un signe sur ${B.I}`, valid: false, why: 'Le signe de f(x) − x donne le sens de variation de la suite, pas une borne. La borne vient de f(I) ⊂ I.' },
      { id: 'a0', label: `Parce que a₀ ∈ ${B.I}`, valid: false, why: 'Il faut aussi que f envoie I dans I, pour passer de aₙ à aₙ₊₁ (récurrence).' },
    ]));
    const up = B.dir > 0;
    const other = B.fixed.find((x) => x !== B.lim);
    out.push(decision('Donc la suite (aₙ) :', [
      { id: 'ok', label: `${up ? 'croît' : 'décroît'} (f(x) ${up ? '>' : '<'} x sur I) et est ${up ? 'majorée' : 'minorée'} par ${B.bound} : elle converge, vers ${B.lim}`, valid: true },
      ...(up ? [] : [{ id: 'fup', label: 'croît, parce que f est croissante', valid: false, rule: 'a1_monotone_by_f_increasing', why: 'f croissante dit seulement que la suite est monotone. Ici a₁ = f(a₀) < a₀ : elle décroît.' }]),
      { id: 'inf', label: `${up ? 'croît' : 'décroît'} et tend vers ${up ? '+∞' : '−∞'}`, valid: false, why: `Elle reste dans ${B.I} : elle est bornée de ce côté.` },
      ...(other ? [{ id: 'fixed', label: `converge vers ${other}, l'autre point fixe`, valid: false, rule: 'a1_rec_limit_without_convergence', why: `La suite reste dans ${B.I} et ${up ? 'croît' : 'décroît'} : elle ne peut pas aller vers ${other}.` }] : []),
    ]));
    return out;
  }
  // Divergent: above the largest fixed point.
  out.push(decision(`a₀ = ${A0(d)} > ${d.l2}. La suite (aₙ) :`, [
    { id: 'ok', label: `croît (f(x) > x pour x > ${d.l2}) ; une limite serait un point fixe ≥ a₀, il n'y en a pas`, valid: true },
    { id: 'fixed', label: `converge vers ${d.l2}, ${d.l1 === d.l2 ? 'le' : 'un'} point fixe`, valid: false, rule: 'a1_rec_limit_without_convergence', why: `Un point fixe est une limite possible, mais la suite croît à partir de a₀ = ${A0(d)} > ${d.l2} : elle s'en éloigne.` },
    { id: 'bounded', label: `croît et elle est minorée par ${d.l2} : elle converge`, valid: false, why: 'Une suite croissante converge si elle est majorée, pas minorée.' },
  ]));
  return out;
}

// The last part: lim aₙ (value), or the bound a₀ + n·δ → +∞ (limit).
function conclusionPart(d, B, level, label = '') {
  const T = texts(d);
  const pre = level === 1
    ? [{ kind: 'note', html: B.bound !== null ? `f est croissante et f(I) ⊂ I pour I = ${B.I} : la suite reste dans I, elle ${B.dir > 0 ? 'croît' : 'décroît'} et elle est bornée.` : 'La suite croît et ne peut tendre vers aucun point fixe.' }]
    : conclusionDecisions(d, B, T);
  if (B.bound !== null) {
    const line = E(B.lim, 'Monotone et bornée : la limite est un point fixe', 'conclude', 'conclude');
    return part(`${label}Conclusion pour a₀ = ${A0(d)} :`, 'lim aₙ =', 'lim(a_n,n,∞)', { kind: 'value', expect: B.lim, recfix: recfix(d, B) }, [line], pre);
  }
  const delta = fAt(d, d.a0).sub(d.a0);
  const start = joinSum([N(d.a0), kx(delta, 'n')]);
  return part(`${label}Pour x > ${d.l2}, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = ${fr(delta)}, donc aₙ ≥ ${RD(start, { vars: ['n'] })}. Limite de ce minorant :`, 'lim =', start,
    { kind: 'limit', v: 'n', vars: ['n'], to: '+∞', discrete: true, recfix: recfix(d, B) }, [E('+∞', 'aₙ → +∞', 'conclude', 'diverge')], pre);
}

function fixedLines(level, rng, opts) {
  const d = draw(rng, level <= 2 ? { kinds: ['sqrt', 'square'] } : {});
  const T = texts(d);
  const B = behaviour(d);
  const parts = [];
  const g = level <= 2;
  if (level >= 2) {
    const lines = level <= 3 ? [E(T.quad, d.kind === 'sqrt' ? 'Élever au carré (L ≥ 0)' : `Multiplier par ${d.s}`, 'cand', 'solve'), E(T.candEnd, 'Racines du trinôme', 'cand', 'solve')] : [E(T.candEnd, 'Points fixes', 'cand', 'solve')];
    if (level === 2) lines[1] = blanked(lines[1], [String(d.l2)]);
    parts.push(part('Candidats : résous L = f(L).', 'L ∈', T.cand, { kind: 'solset', v: 'L' }, lines));
  }
  const sl = level <= 3 ? [E(T.signMid, d.kind === 'sqrt' ? 'Les deux membres sont positifs : élever au carré' : 'Même dénominateur', 'sign', 'sign'), E(T.signEnd, 'Signe du trinôme', 'sign', 'sign')] : [E(T.signEnd, 'Signe de f(x) − x', 'sign', 'sign')];
  if (g) sl[1] = blanked(sl[1], d.l1 === d.l2 ? [String(d.l1)] : [String(d.l1), String(d.l2)].slice(0, level === 1 ? 2 : 1));
  parts.push(part('Signe de f(x) − x :', 'f(x) > x ⇔', T.sign, { kind: 'solset', v: 'x' }, sl));
  parts.push(conclusionPart(d, B, level));
  const given = level === 1 ? ` Les points fixes de f sont ${d.l1 === d.l2 ? d.l1 : `${d.l1} et ${d.l2}`}.` : '';
  const prompt = `On pose a₀ = ${A0(d)} et ${MN(T.rec)}. Étudie la suite : points fixes, sens de variation, limite.${given}`;
  const hints = H('Trouve d\'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c\'est le signe de f(x) − x.',
    `f(x) − x > 0 ⇔ x ∈ ${RD(T.signEnd).replace(/\d+/, '▢')}`,
    B.bound !== null ? `aₙ ∈ ${B.I}, ${B.dir > 0 ? 'croissante' : 'décroissante'} : aₙ → ${B.lim}` : 'aₙ ≥ a₀ + n·δ, donc aₙ → +∞');
  return partsItem({
    skill: RF, level, prompt, parts, choices: CHOICES, hints, subgoals: SUB, keys: KEYS,
    key: `${RF}:${level}:${T.rec}:${d.a0}`, exam: examOf(opts), fallback: d.fallback,
  });
}

// Level 5: the same sequence for two values of a₀ (catalogue).
function twoStarts(rng, opts) {
  const d = draw(rng, { kinds: ['sqrt', 'square', 'square', 'double'] });
  const regions = d.kind === 'sqrt' ? ['in', 'above'] : d.kind === 'double' ? ['below', 'above'] : d.l1 > 0 ? ['below', 'in', 'above'] : ['in', 'above'];
  const others = regions.filter((r) => r !== d.region);
  const d2 = draw(rng, { kinds: [d.kind], region: rng.pick(others) });
  Object.assign(d2, { l1: d.l1, l2: d.l2, s: d.s, p: d.p });
  if (d2.region === 'in') d2.a0 = d.l2 - d.l1 >= 2 ? Q.of(d.l1 + 1) : q(2 * d.l1 + 1, 2);
  if (d2.region === 'below') d2.a0 = Q.of(0);
  if (d2.region === 'above') d2.a0 = Q.of(d.l2 + 1);
  const T = texts(d);
  const parts = [
    part('Candidats : résous L = f(L).', 'L ∈', T.cand, { kind: 'solset', v: 'L' }, [E(T.candEnd, 'Points fixes', 'cand', 'solve')]),
    part('Signe de f(x) − x :', 'f(x) > x ⇔', T.sign, { kind: 'solset', v: 'x' }, [E(T.signEnd, 'Signe de f(x) − x', 'sign', 'sign')]),
    conclusionPart(d, behaviour(d), 5, '(1) '),
    conclusionPart(d2, behaviour(d2), 5, '(2) '),
  ];
  return partsItem({
    skill: RF, level: 5, prompt: `On pose ${MN(T.rec)}. Étudie la suite pour a₀ = ${A0(d)}, puis pour a₀ = ${A0(d2)}.`,
    parts, hints: [], subgoals: SUB, keys: KEYS, key: `${RF}:5:${T.rec}:${d.a0}:${d2.a0}`, fallback: d.fallback,
  });
}

function fixedMcq(rng, opts, level = 4) {
  const d = draw(rng);
  const T = texts(d);
  const B = behaviour(d);
  const say = (x) => (x === '+∞' ? '+∞' : fr(x));
  const options = [{ html: `lim aₙ = ${say(B.lim)}`, correct: true }];
  for (const x of B.fixed) if (x !== B.lim) options.push({ html: `lim aₙ = ${fr(x)}`, correct: false, rule: 'a1_rec_limit_without_convergence' });
  if (B.lim !== '+∞') options.push({ html: 'lim aₙ = +∞', correct: false, rule: B.dir < 0 ? 'a1_monotone_by_f_increasing' : undefined });
  else options.push({ html: 'La suite est bornée : elle converge', correct: false });
  options.push({ html: `lim aₙ = ${A0(d)}`, correct: false }, { html: 'lim aₙ = 0', correct: false }, { html: `lim aₙ = ${d.l2 + 1}`, correct: false });
  for (const o of options) if (!o.rule) delete o.rule;
  return mcqOf({
    skill: RF, level, prompt: `On pose a₀ = ${A0(d)} et ${MN(T.rec)}. Que vaut la limite de (aₙ) ?`, options,
    key: `${RF}:mcq:${T.rec}:${d.a0}`, expectedSec: 240, exam: examOf(opts), fallback: d.fallback,
    solution: [{ html: `Points fixes : ${B.fixed.join(' et ')}. f(x) − x > 0 ⇔ x ∈ ${RD(T.signEnd)}. ${B.bound !== null ? `La suite reste dans ${B.I}, elle est monotone et bornée : aₙ → ${B.lim}.` : `La suite croît et ne peut tendre vers aucun point fixe : aₙ → +∞.`}`, note: '' }],
  }, rng);
}

function fixedTf(rng, opts) {
  const kind = rng.pick(['single', 'square', 'double', 'sqrt', 'mono']);
  const A = [{ v: 'a', label: 'a₀ =', keys: ['calc'] }];
  if (kind === 'single') {
    const m = rng.pick([2, 3]);
    return tfItem({
      skill: RF, level: 4, truth: false, key: `single:${m}`, exam: examOf(opts), ruleIfTrue: 'a1_rec_limit_without_convergence',
      statement: `La suite aₙ₊₁ = ${m}aₙ n'a qu'un point fixe, L = 0. Donc pour tout a₀ ∈ ℝ, elle converge vers 0.`,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: 'a=0', ask: A, answer: { a: '1' } },
      explanation: `Faux : avec a₀ = 1, aₙ = ${m}ⁿ → +∞. Le point fixe est seulement la limite possible <i>si</i> la suite converge.`,
    });
  }
  const d = draw(rng, { kinds: [kind === 'mono' ? 'square' : kind === 'sqrt' ? 'sqrt' : kind], region: kind === 'mono' ? 'in' : null });
  const T = texts(d);
  const rec = MN(T.rec);
  if (kind === 'sqrt') {
    return tfItem({
      skill: RF, level: 4, truth: true, key: `sqrt:${T.rec}`, exam: examOf(opts), fallback: d.fallback,
      statement: `Pour tout a₀ ∈ ]${d.l1} ; ${d.l2}[, la suite ${rec} converge vers ${d.l2}.`,
      explanation: `Vrai : f est croissante et f(]${d.l1} ; ${d.l2}[) ⊂ ]${d.l1} ; ${d.l2}[ ; f(x) > x sur cet intervalle : la suite croît, majorée par ${d.l2}. Sa limite est un point fixe > a₀ : ${d.l2}.`,
    });
  }
  if (kind === 'mono' && d.l1 !== d.l2 && d.l2 - d.l1 >= 1) {
    const mid = q(d.l1 + d.l2, 2);
    return tfItem({
      skill: RF, level: 4, truth: false, key: `mono:${T.rec}`, exam: examOf(opts), ruleIfTrue: 'a1_monotone_by_f_increasing', fallback: d.fallback,
      statement: `f(x) = ${RD(T.f)} est croissante sur [0 ; +∞[. Donc pour tout a₀ ∈ ]${d.l1} ; ${d.l2}[, la suite ${rec} est croissante.`,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: `a≤${d.l1}∨a≥${d.l2}`, hyp: `${d.l1}<a<${d.l2}`, ask: A, answer: { a: N(mid) } },
      explanation: `Faux : sur ]${d.l1} ; ${d.l2}[, f(x) − x = (x − ${d.l1})(x − ${d.l2})/${d.s} < 0, donc a₁ < a₀ : la suite décroît (vers ${d.l1}). f croissante dit seulement qu'elle est monotone.`,
    });
  }
  const one = d.l1 === d.l2;
  return tfItem({
    skill: RF, level: 4, truth: false, key: `div:${T.rec}`, exam: examOf(opts), ruleIfTrue: 'a1_rec_limit_without_convergence', fallback: d.fallback,
    statement: one
      ? `La suite ${rec} n'a qu'un point fixe, ${d.l1}. Donc pour tout a₀ ≥ 0, elle converge vers ${d.l1}.`
      : `Pour tout a₀ ≥ 0, la suite ${rec} converge vers ${d.l1} ou vers ${d.l2}.`,
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: `a≤${d.l2}`, ask: A, answer: { a: String(d.l2 + 1) } },
    explanation: `Faux : pour a₀ > ${d.l2}, f(x) > x et la suite croît ; une limite serait un point fixe > ${d.l2} : il n'y en a pas, donc aₙ → +∞.`,
  });
}

export function fixedItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return fixedMcq(rng, opts);
  if (opts.exam === 'tf') return fixedTf(rng, opts);
  if (level === 5) return rng.chance(0.4) ? fixedMcq(rng, opts, 5) : twoStarts(rng, opts);
  return fixedLines(level, rng, opts);
}
