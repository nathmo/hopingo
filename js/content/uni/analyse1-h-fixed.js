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

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { mcq, tfItem } from './kit.js';
import {
  q, N, H, E, examOf, kx, joinSum, blanked, partsItem, mcqOf, RD, P, MN, fr, part, decision,
} from './analyse1-h-kit.js';

const RF = 'a1-seq-rec-fixed';
const KEYS = ['calc', 'seq', 'set', 'anal'];
const SUB = [
  { id: 'cand', label: t('candidats L = f(L)'), skill: 'quad-formula' },
  { id: 'sign', label: t('signe de f(x) − x'), skill: 'g1-sign-table' },
  { id: 'conclude', label: t('monotone et bornée'), skill: 'a1-seq-monotone' },
];
const CHOICES = [
  { id: 'solve', label: t('Résoudre L = f(L)') },
  { id: 'sign', label: t('Signe de f(x) − x') },
  { id: 'stable', label: t('Montrer f(I) ⊂ I') },
  { id: 'conclude', label: t('Monotone et bornée, donc convergente') },
  { id: 'diverge', label: t('Minorer aₙ par a₀ + n·δ') },
  { id: 'terms', label: t('Calculer les premiers termes') },
  { id: 'fixed', label: t('Prendre un point fixe comme limite'), rule: 'a1_rec_limit_without_convergence', why: t('Un point fixe est seulement une limite possible : il faut d\'abord prouver que la suite converge.') },
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
    const ends = d.region === 'in' ? t('f({a}) = {a} et f({b}) = {b}', { a: d.l1, b: d.l2 }) : d.region === 'below' ? t('f(0) = {f0} ≥ 0 et f({a}) = {a}', { f0: fr(fAt(d, 0)), a: d.l1 }) : `f(${d.l2}) = ${d.l2}`;
    out.push(decision(t('a₀ = {a0} ∈ {I}. Pourquoi aₙ ∈ {I} pour tout n ?', { a0: A0(d), I: B.I }), [
      { id: 'ok', label: t('f est croissante, {ends} : f(I) ⊂ I, puis récurrence', { ends }), valid: true },
      { id: 'sign', label: t('Parce que f(x) − x garde un signe sur {I}', { I: B.I }), valid: false, why: t('Le signe de f(x) − x donne le sens de variation de la suite, pas une borne. La borne vient de f(I) ⊂ I.') },
      { id: 'a0', label: t('Parce que a₀ ∈ {I}', { I: B.I }), valid: false, why: t('Il faut aussi que f envoie I dans I, pour passer de aₙ à aₙ₊₁ (récurrence).') },
    ]));
    const up = B.dir > 0;
    const other = B.fixed.find((x) => x !== B.lim);
    const v = { b: B.bound, L: B.lim, I: B.I, o: other };
    out.push(decision(t('Donc la suite (aₙ) :'), [
      { id: 'ok', label: up ? t('croît (f(x) > x sur I) et est majorée par {b} : elle converge, vers {L}', v) : t('décroît (f(x) < x sur I) et est minorée par {b} : elle converge, vers {L}', v), valid: true },
      ...(up ? [] : [{ id: 'fup', label: t('croît, parce que f est croissante'), valid: false, rule: 'a1_monotone_by_f_increasing', why: t('f croissante dit seulement que la suite est monotone. Ici a₁ = f(a₀) < a₀ : elle décroît.') }]),
      { id: 'inf', label: up ? t('croît et tend vers +∞') : t('décroît et tend vers −∞'), valid: false, why: t('Elle reste dans {I} : elle est bornée de ce côté.', v) },
      { id: 'bounded', label: B.I.includes('∞') ? t('est minorée par {b} : elle converge', v) : t('est bornée (elle reste dans {I}) : elle converge', v), valid: false, rule: 'a1_bounded_implies_convergent', why: t('Bornée ne suffit pas : (−1)ⁿ est bornée et ne converge pas. Il faut aussi la monotonie, donnée par le signe de f(x) − x.') },
      ...(other ? [{ id: 'fixed', label: t('converge vers {o}, l\'autre point fixe', v), valid: false, rule: 'a1_rec_limit_without_convergence', why: up ? t('La suite reste dans {I} et croît : elle ne peut pas aller vers {o}.', v) : t('La suite reste dans {I} et décroît : elle ne peut pas aller vers {o}.', v) }] : []),
    ]));
    return out;
  }
  // Divergent: above the largest fixed point.
  const w = { a0: A0(d), l2: d.l2 };
  out.push(decision(t('a₀ = {a0} > {l2}. La suite (aₙ) :', w), [
    { id: 'ok', label: t('croît (f(x) > x pour x > {l2}) ; une limite serait un point fixe ≥ a₀, il n\'y en a pas', w), valid: true },
    { id: 'fixed', label: d.l1 === d.l2 ? t('converge vers {l2}, le point fixe', w) : t('converge vers {l2}, un point fixe', w), valid: false, rule: 'a1_rec_limit_without_convergence', why: t('Un point fixe est une limite possible, mais la suite croît à partir de a₀ = {a0} > {l2} : elle s\'en éloigne.', w) },
    { id: 'bounded', label: t('croît et elle est minorée par {l2} : elle converge', w), valid: false, why: t('Une suite croissante converge si elle est majorée, pas minorée.') },
  ]));
  return out;
}

// The last part: lim aₙ (value), or the bound a₀ + n·δ → +∞ (limit).
function conclusionPart(d, B, level, label = '') {
  const T = texts(d);
  const pre = level === 1
    ? [{ kind: 'note', html: B.bound !== null ? (B.dir > 0 ? t('f est croissante et f(I) ⊂ I pour I = {I} : la suite reste dans I, elle croît et elle est bornée.', { I: B.I }) : t('f est croissante et f(I) ⊂ I pour I = {I} : la suite reste dans I, elle décroît et elle est bornée.', { I: B.I })) : t('La suite croît et ne peut tendre vers aucun point fixe.') }]
    : conclusionDecisions(d, B, T);
  if (B.bound !== null) {
    const line = E(B.lim, t('Monotone et bornée : la limite est un point fixe'), 'conclude', 'conclude');
    return part(`${label}${t('Conclusion pour a₀ = {a0} :', { a0: A0(d) })}`, 'lim aₙ =', 'lim(a_n,n,∞)', { kind: 'value', expect: B.lim, recfix: recfix(d, B) }, [line], pre);
  }
  const delta = fAt(d, d.a0).sub(d.a0);
  const start = joinSum([N(d.a0), kx(delta, 'n')]);
  return part(`${label}${t('Pour x > {l2}, f(x) − x croît : aₙ₊₁ − aₙ ≥ f(a₀) − a₀ = {d}, donc aₙ ≥ {s}. Limite de ce minorant :', { l2: d.l2, d: fr(delta), s: RD(start, { vars: ['n'] }) })}`, 'lim =', start,
    { kind: 'limit', v: 'n', vars: ['n'], to: '+∞', discrete: true, recfix: recfix(d, B) }, [E('+∞', 'aₙ → +∞', 'conclude', 'diverge')], pre);
}

function fixedLines(level, rng, opts) {
  const d = draw(rng, level <= 2 ? { kinds: ['sqrt', 'square'] } : {});
  const T = texts(d);
  const B = behaviour(d);
  const parts = [];
  const g = level <= 2;
  if (level >= 2) {
    const lines = level <= 3 ? [E(T.quad, d.kind === 'sqrt' ? t('Élever au carré (L ≥ 0)') : t('Multiplier par {s}', { s: d.s }), 'cand', 'solve'), E(T.candEnd, t('Racines du trinôme'), 'cand', 'solve')] : [E(T.candEnd, t('Points fixes'), 'cand', 'solve')];
    if (level === 2) lines[1] = blanked(lines[1], [String(d.l2)]);
    parts.push(part(t('Candidats : résous L = f(L).'), 'L ∈', T.cand, { kind: 'solset', v: 'L' }, lines));
  }
  const sl = level <= 3 ? [E(T.signMid, d.kind === 'sqrt' ? t('Les deux membres sont positifs : élever au carré') : t('Même dénominateur'), 'sign', 'sign'), E(T.signEnd, t('Signe du trinôme'), 'sign', 'sign')] : [E(T.signEnd, t('Signe de f(x) − x'), 'sign', 'sign')];
  if (g) sl[1] = blanked(sl[1], d.l1 === d.l2 ? [String(d.l1)] : [String(d.l1), String(d.l2)].slice(0, level === 1 ? 2 : 1));
  parts.push(part(t('Signe de f(x) − x :'), 'f(x) > x ⇔', T.sign, { kind: 'solset', v: 'x' }, sl));
  parts.push(conclusionPart(d, B, level));
  const given = level === 1 ? ` ${t('Les points fixes de f sont {p}.', { p: d.l1 === d.l2 ? d.l1 : t('{a} et {b}', { a: d.l1, b: d.l2 }) })}` : '';
  const prompt = `${t('On pose a₀ = {a0} et {rec}. Étudie la suite : points fixes, sens de variation, limite.', { a0: A0(d), rec: MN(T.rec) })}${given}`;
  const hints = H(t('Trouve d\'abord les limites possibles (L = f(L)), puis regarde si la suite monte ou descend : c\'est le signe de f(x) − x.'),
    `f(x) − x > 0 ⇔ x ∈ ${RD(T.signEnd).replace(/\d+/, '▢')}`,
    B.bound !== null ? (B.dir > 0 ? t('aₙ ∈ {I}, croissante : aₙ → {L}', { I: B.I, L: B.lim }) : t('aₙ ∈ {I}, décroissante : aₙ → {L}', { I: B.I, L: B.lim })) : t('aₙ ≥ a₀ + n·δ, donc aₙ → +∞'));
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
    part(t('Candidats : résous L = f(L).'), 'L ∈', T.cand, { kind: 'solset', v: 'L' }, [E(T.candEnd, t('Points fixes'), 'cand', 'solve')]),
    part(t('Signe de f(x) − x :'), 'f(x) > x ⇔', T.sign, { kind: 'solset', v: 'x' }, [E(T.signEnd, t('Signe de f(x) − x'), 'sign', 'sign')]),
    conclusionPart(d, behaviour(d), 5, '(1) '),
    conclusionPart(d2, behaviour(d2), 5, '(2) '),
  ];
  return partsItem({
    skill: RF, level: 5, prompt: t('On pose {rec}. Étudie la suite pour a₀ = {a}, puis pour a₀ = {b}.', { rec: MN(T.rec), a: A0(d), b: A0(d2) }),
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
  else options.push({ html: t('La suite est bornée : elle converge'), correct: false });
  options.push({ html: `lim aₙ = ${A0(d)}`, correct: false }, { html: 'lim aₙ = 0', correct: false }, { html: `lim aₙ = ${d.l2 + 1}`, correct: false });
  for (const o of options) if (!o.rule) delete o.rule;
  return mcqOf({
    skill: RF, level, prompt: t('On pose a₀ = {a0} et {rec}. Que vaut la limite de (aₙ) ?', { a0: A0(d), rec: MN(T.rec) }), options,
    key: `${RF}:mcq:${T.rec}:${d.a0}`, expectedSec: 240, exam: examOf(opts), fallback: d.fallback,
    solution: [{ html: `${t('Points fixes : {p}. f(x) − x > 0 ⇔ x ∈ {s}.', { p: B.fixed.join(t(' et ')), s: RD(T.signEnd) })} ${B.bound !== null ? t('La suite reste dans {I}, elle est monotone et bornée : aₙ → {L}.', { I: B.I, L: B.lim }) : t('La suite croît et ne peut tendre vers aucun point fixe : aₙ → +∞.')}`, note: '' }],
  }, rng);
}

function fixedTf(rng, opts) {
  const kind = rng.pick(['single', 'square', 'double', 'sqrt', 'mono']);
  const A = [{ v: 'a', label: 'a₀ =', keys: ['calc'] }];
  if (kind === 'single') {
    const m = rng.pick([2, 3]);
    return tfItem({
      skill: RF, level: 4, truth: false, key: `single:${m}`, exam: examOf(opts), ruleIfTrue: 'a1_rec_limit_without_convergence',
      statement: t('La suite aₙ₊₁ = {m}aₙ n\'a qu\'un point fixe, L = 0. Donc pour tout a₀ ∈ ℝ, elle converge vers 0.', { m }),
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: 'a=0', ask: A, answer: { a: '1' } },
      explanation: t('Faux : avec a₀ = 1, aₙ = {m}ⁿ → +∞. Le point fixe est seulement la limite possible <i>si</i> la suite converge.', { m }),
    });
  }
  const d = draw(rng, { kinds: [kind === 'mono' ? 'square' : kind === 'sqrt' ? 'sqrt' : kind], region: kind === 'mono' ? 'in' : null });
  const T = texts(d);
  const rec = MN(T.rec);
  if (kind === 'sqrt') {
    return tfItem({
      skill: RF, level: 4, truth: true, key: `sqrt:${T.rec}`, exam: examOf(opts), fallback: d.fallback,
      statement: t('Pour tout a₀ ∈ ]{a} ; {b}[, la suite {rec} converge vers {b}.', { a: d.l1, b: d.l2, rec }),
      explanation: t('Vrai : f est croissante et f(]{a} ; {b}[) ⊂ ]{a} ; {b}[ ; f(x) > x sur cet intervalle : la suite croît, majorée par {b}. Sa limite est un point fixe > a₀ : {b}.', { a: d.l1, b: d.l2 }),
    });
  }
  if (kind === 'mono' && d.l1 !== d.l2 && d.l2 - d.l1 >= 1) {
    const mid = q(d.l1 + d.l2, 2);
    return tfItem({
      skill: RF, level: 4, truth: false, key: `mono:${T.rec}`, exam: examOf(opts), ruleIfTrue: 'a1_monotone_by_f_increasing', fallback: d.fallback,
      statement: t('f(x) = {f} est croissante sur [0 ; +∞[. Donc pour tout a₀ ∈ ]{a} ; {b}[, la suite {rec} est croissante.', { f: RD(T.f), a: d.l1, b: d.l2, rec }),
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: `a≤${d.l1}∨a≥${d.l2}`, hyp: `${d.l1}<a<${d.l2}`, ask: A, answer: { a: N(mid) } },
      explanation: t('Faux : sur ]{a} ; {b}[, f(x) − x = (x − {a})(x − {b})/{s} < 0, donc a₁ < a₀ : la suite décroît (vers {a}). f croissante dit seulement qu\'elle est monotone.', { a: d.l1, b: d.l2, s: d.s }),
    });
  }
  const one = d.l1 === d.l2;
  return tfItem({
    skill: RF, level: 4, truth: false, key: `div:${T.rec}`, exam: examOf(opts), ruleIfTrue: 'a1_rec_limit_without_convergence', fallback: d.fallback,
    statement: one
      ? t('La suite {rec} n\'a qu\'un point fixe, {a}. Donc pour tout a₀ ≥ 0, elle converge vers {a}.', { rec, a: d.l1 })
      : t('Pour tout a₀ ≥ 0, la suite {rec} converge vers {a} ou vers {b}.', { rec, a: d.l1, b: d.l2 }),
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: `a≤${d.l2}`, ask: A, answer: { a: String(d.l2 + 1) } },
    explanation: t('Faux : pour a₀ > {b}, f(x) > x et la suite croît ; une limite serait un point fixe > {b} : il n\'y en a pas, donc aₙ → +∞.', { b: d.l2 }),
  });
}

export function fixedItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return fixedMcq(rng, opts);
  if (opts.exam === 'tf') return fixedTf(rng, opts);
  if (level === 5) return rng.chance(0.4) ? fixedMcq(rng, opts, 5) : twoStarts(rng, opts);
  return fixedLines(level, rng, opts);
}
