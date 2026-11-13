// Generators of module A1, part d (continued): a1-int-reduction,
// a1-int-rational, a1-int-trig, a1-int-hyper. Same conventions as
// analyse1-d.js: start from the answer, a decision line first, primitives
// after a short first part judged by `equiv`, values by `definite`.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { MT, mcq } from './kit.js';
import { q, N, H, uniq, cm, joinSum, Val, E, intItem, examTf, lin, shift, KEYS } from './analyse1-d-kit.js';
import { t } from '../../i18n.js';

const V = 'x';
const GEN_ = {};
const key = (t) => toText(parse(t, { vars: [V, 't'] }));
const wrap = (t) => (/[+-]/.test(t.replace(/^-/, '')) ? `(${t})` : t);
// The first part of a primitive item: an equiv line (dx = …, u′, the
// decomposition, an identity).
const firstPart = (start, vars, lines, { judge = {}, ...rest } = {}) => ({ start, judge: { kind: 'equiv', vars, ...judge }, lines, ...rest });

// ======================================================================
// a1-int-reduction
// ======================================================================

const RD = 'a1-int-reduction';
const RD_SUB = [
  { id: 'ipp', label: t('intégration par parties'), skill: 'a1-int-parts' },
  { id: 'rec', label: t('formule de récurrence'), skill: RD },
  { id: 'zero', label: t('calculer I₀'), skill: 'a1-int-direct' },
  { id: 'up', label: t('remonter la récurrence'), skill: 'g5-induction-frame' },
];
const RD_CHOICES = [
  { id: 'ipp', label: t('Intégration par parties qui fait baisser l\'indice') },
  { id: 'rec', label: t('Reconnaître Iₙ₋₁ (ou Iₙ₋₂) et écrire la récurrence') },
  { id: 'zero', label: t('Calculer I₀ (ou I₁)') },
  { id: 'up', label: t('Remonter la récurrence') },
  { id: 'eval', label: t('Calculer la valeur') },
  { id: 'index', label: t('Écrire le coefficient n − 1'), rule: 'a1_reduction_index', why: t('u = xⁿ donne u′ = n·xⁿ⁻¹ : le coefficient est n.') },
];

// The families: J (name), its integral in n, the IPP line, the recurrence
// Jₙ = A − c(n)·Jₙ₋₁ (one step) with A and c as numbers (r + s·e^a), J₀.
const RD_F = {
  exp(a) {
    const ea = a === 1 ? 'e^x' : a === 2 ? 'e^(2x)' : 'e^(-x)';
    const A = a === 1 ? 'e' : a === 2 ? 'e^2/2' : '-1/e';
    const c = a === 1 ? 'n' : a === 2 ? '(n/2)' : '(-n)';
    const ipp = a === 1 ? `bracket(x^n×e^x,x,0,1)-n×int(x^(n-1)×e^x,x,0,1)`
      : a === 2 ? `bracket(x^n×e^(2x)/2,x,0,1)-(n/2)×int(x^(n-1)×e^(2x),x,0,1)`
        : `bracket(-x^n×e^(-x),x,0,1)+n×int(x^(n-1)×e^(-x),x,0,1)`;
    const rec = a === 1 ? 'e-n×J_(n-1)' : a === 2 ? 'e^2/2-(n/2)×J_(n-1)' : '-1/e+n×J_(n-1)';
    // Values r + s·eᵃ.
    const Aval = a === 1 ? { r: q(0), s: q(1) } : a === 2 ? { r: q(0), s: q(1, 2) } : { r: q(0), s: q(-1) };
    const J0 = a === 1 ? { r: q(-1), s: q(1) } : a === 2 ? { r: q(-1, 2), s: q(1, 2) } : { r: q(1), s: q(-1) };
    const cOf = (n) => q(n, a);
    return {
      name: 'J', seq: `int(x^n×${ea},x,0,1)`, ipp, rec, A, c, Aval, J0, cOf, a, ea,
      zero: [`bracket(${a === 1 ? 'e^x' : a === 2 ? 'e^(2x)/2' : '-e^(-x)'},x,0,1)`],
      J0text: a === 1 ? 'e-1' : a === 2 ? 'e^2/2-1/2' : '1-1/e',
      title: `Jₙ = ∫₀¹ xⁿ${a === 1 ? 'eˣ' : a === 2 ? 'e²ˣ' : 'e⁻ˣ'} dx`,
      u: 'xⁿ', dv: a === 1 ? 'eˣ' : a === 2 ? 'e²ˣ' : 'e⁻ˣ',
    };
  },
  ln() {
    return {
      name: 'I', seq: 'int(ln(x)^n,x,1,e)', ipp: 'bracket(x×ln(x)^n,x,1,e)-n×int(ln(x)^(n-1),x,1,e)', rec: 'e-n×I_(n-1)',
      A: 'e', c: 'n', Aval: { r: q(0), s: q(1) }, J0: { r: q(-1), s: q(1) }, cOf: (n) => q(n), a: 1,
      zero: ['bracket(x,x,1,e)'], J0text: 'e-1', title: 'Iₙ = ∫₁ᵉ (Log x)ⁿ dx', u: '(Log x)ⁿ', dv: '1',
    };
  },
};

// The value r + s·eᵃ as text.
const eaVal = (v, a) => new Val().rat(v.r).exp(v.s, a);

function rdData(rng, level, opts = {}) {
  const fam = opts.ln ?? rng.chance(0.3) ? RD_F.ln() : RD_F.exp(level <= 2 ? 1 : rng.pick([1, 1, 2, -1]));
  const k = level <= 3 ? rng.int(2, 3) : rng.int(2, 4);
  return { fam, k };
}

// The chain Jₖ → A − k·Jₖ₋₁ → … → the value.
function rdChain(fam, k) {
  const J = (j) => `${fam.name}_${j}`;
  const sign = (j) => (fam.cOf(j).n > 0 ? '-' : '+');
  const abscoef = (j) => { const c = fam.cOf(j); const a = c.n < 0 ? c.neg() : c; return a.eq(1) ? '' : a.d === 1 ? `${a.n}` : `(${N(a)})`; };
  // text of Jⱼ with the next level written as `inner`.
  const step = (j, inner) => `${fam.A}${sign(j)}${abscoef(j)}${abscoef(j) ? '×' : ''}${inner}`;
  const lines = [step(k, J(k - 1))];
  // Unfold from the inside.
  const build = (depth) => {
    // depth: how many steps are written out (1 = Jₖ = A − k·Jₖ₋₁).
    let inner = J(k - depth);
    for (let j = k - depth + 1; j <= k; j++) inner = j === k ? step(j, inner) : `(${step(j, inner)})`;
    return inner;
  };
  for (let d = 2; d <= k; d++) lines.push(build(d));
  // J₀ replaced by its value.
  let inner = `(${fam.J0text})`;
  for (let j = 1; j <= k; j++) inner = j === k ? step(j, inner) : `(${step(j, inner)})`;
  lines.push(inner);
  // Values.
  let v = fam.J0;
  for (let j = 1; j <= k; j++) v = { r: fam.Aval.r.sub(fam.cOf(j).mul(v.r)), s: fam.Aval.s.sub(fam.cOf(j).mul(v.s)) };
  return { lines, value: eaVal(v, fam.a) };
}

function rdItem(level, rng, opts = {}) {
  const lv = opts.exam ? 5 : level;
  const wallis = lv === 5 && !opts.exam && rng.chance(0.4);
  if (wallis) return rdWallis(level, rng, opts);
  const { fam, k } = rdData(rng, lv);
  const seq = { [fam.name]: fam.seq };
  const recJudge = { kind: 'definite', seq, param: 'n', nRange: [1, 6], recurrence: true };
  const valJudge = { kind: 'definite', seq };
  const chain = rdChain(fam, k);
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'ipp', label: t('IPP avec u = {u}, v′ = {dv}', { u: fam.u, dv: fam.dv }), valid: true, quality: 'good' },
      fam.name === 'I'
        ? { id: 'subst', label: t('Substitution t = Log x'), valid: true, quality: 'poor', why: t('Juste : on retrouve ∫ tⁿeᵗ dt, la même récurrence, avec une étape de plus.') }
        : { id: 'swap', label: t('IPP avec u = {dv}, v′ = {u}', { dv: fam.dv, u: fam.u }), valid: true, quality: 'poor', why: t('Juste, mais l\'indice monte (xⁿ⁺¹/(n + 1)) : on n\'obtient pas Jₙ₋₁.') },
      { id: 'subst2', label: t('Substitution t = {u}', { u: fam.u }), valid: false, why: t('dt = n·xⁿ⁻¹ dx ne se trouve pas dans l\'intégrale.') },
      { id: 'noborder', label: t('IPP sans terme de bord : {name}ₙ = −n·{name}ₙ₋₁', { name: fam.name }), valid: false, rule: 'a1_ibp_boundary_term', why: t('Le terme de bord [u·v] ne s\'annule pas ici.') },
    ],
    l2: ['noborder'], taken: t('IPP avec u = {u}, v′ = {dv}', { u: fam.u, dv: fam.dv }),
  };
  const recLines = [
    E(fam.ipp, `u = ${fam.u}, v′ = ${fam.dv}`, 'ipp', 'ipp'),
    E(fam.rec, t('Reconnaître {name}ₙ₋₁', { name: fam.name }), 'rec', 'rec', [fam.A.replace(/^-/, ''), 'n'], [fam.A.replace(/^-/, '')]),
  ];
  const parts = [{
    start: `${fam.name}_n`, judge: recJudge, dec, choices: RD_CHOICES,
    // Level 1: the IPP is done (a note), only the recurrence is asked.
    lines: lv === 1 ? recLines.slice(1) : recLines,
    note: lv === 1 ? t('L\'intégration par parties donne {ipp}.', { ipp: MT(fam.ipp) }) : null,
  }];
  if (lv !== 2) {
    parts.push({ html: t('Calcule {name}₀', { name: fam.name }), start: `${fam.name}_0`, judge: valJudge, choices: RD_CHOICES,
      lines: [E(fam.zero[0], t('Primitive'), 'zero', 'zero'), E(eaVal(fam.J0, fam.a).text(), t('Valeur'), 'zero', 'eval')] });
  }
  parts.push({
    html: t('Remonte la récurrence jusqu\'à {name}{p1}', { name: fam.name, p1: '₀₁₂₃₄₅'[k] }), start: `${fam.name}_${k}`, judge: valJudge, choices: RD_CHOICES,
    note: lv === 2 ? `${fam.name}₀ = ${MT(fam.J0text)}.` : null,
    lines: [...chain.lines.map((m, i) => E(m, i === chain.lines.length - 1 ? `${fam.name}₀ = ${fam.J0text.replace(/-/g, ' − ').replace('^2', '²')}` : t('Récurrence'), 'up', 'up')), E(chain.value.text(), t('Calculer'), 'up', 'eval')],
  });
  return intItem({
    skill: RD, prompt: t('Soit {title} (n ≥ 0). Trouve une formule de récurrence, puis calcule {name}{p1}.', { title: fam.title, name: fam.name, p1: '₀₁₂₃₄₅'[k] }),
    key: `${fam.name}:${fam.seq}:${k}`, points: 3, keys: ['calcx', 'anal', 'seq', 'letters'], vars: ['x', 'n'],
    parts, subgoals: RD_SUB,
    hints: H(t('Une intégration par parties qui fait baisser la puissance : u = la puissance n-ième.'), MT(fam.ipp), MT(fam.rec)),
    baits: ['a1_reduction_index', 'a1_ibp_boundary_term'],
  }, level, rng, opts);
}

// Wallis: Wₙ = ∫₀^(π/2) sinⁿx dx = ((n − 1)/n)·Wₙ₋₂ (two steps).
function rdWallis(level, rng, opts) {
  const k = rng.pick([3, 4, 5]);
  const seq = { W: 'int(sin(x)^n,x,0,π/2)' };
  const lines = [
    E('(n-1)×int(sin(x)^(n-2)×cos(x)^2,x,0,π/2)', t('IPP : u = sinⁿ⁻¹x, v′ = sin x (le terme de bord est nul)'), 'ipp', 'ipp'),
    E('(n-1)×(W_(n-2)-W_n)', 'cos²x = 1 − sin²x', 'ipp', 'rec'),
    E('(n-1)/n×W_(n-2)', t('Résoudre en Wₙ'), 'rec', 'rec'),
  ];
  // Wₖ = ∏ (j − 1)/j · W₀ or W₁.
  let c = q(1);
  for (let j = k; j >= 2; j -= 2) c = c.mul(q(j - 1, j));
  const base = k % 2 ? 1 : 0;
  const val = base ? Val.of(c) : new Val().pi(c.div(2));
  const prodText = [];
  for (let j = k; j >= 2; j -= 2) prodText.push(`(${j - 1}/${j})`);
  const parts = [
    { start: 'W_n', judge: { kind: 'definite', seq, param: 'n', nRange: [2, 6], recurrence: true }, lines },
    { html: t('Calcule W{p1}', { p1: '₀₁₂₃₄₅'[k] }), start: `W_${k}`, judge: { kind: 'definite', seq },
      lines: [E(`${prodText.join('')}W_${base}`, t('Remonter'), 'up', 'up'), E(val.text(), base ? 'W₁ = 1' : 'W₀ = π/2', 'up', 'eval')] },
  ];
  return intItem({
    skill: RD, prompt: t('Soit Wₙ = ∫₀^(π/2) sinⁿx dx. Trouve une relation entre Wₙ et Wₙ₋₂ (n ≥ 2), puis calcule W{p1}.', { p1: '₀₁₂₃₄₅'[k] }),
    key: `W:${k}`, points: 3, keys: ['calcx', 'calcfn', 'anal', 'seq', 'letters'], vars: ['x', 'n'], parts, subgoals: RD_SUB,
    hints: [], baits: ['a1_reduction_index'],
  }, level, rng, opts);
}

function rdMcq(rng) {
  const fam = rng.chance(0.3) ? RD_F.ln() : RD_F.exp(1);
  const k = rng.int(3, 4);
  const run = (cOf, A) => {
    let v = fam.J0;
    for (let j = 1; j <= k; j++) v = { r: A.r.sub(cOf(j).mul(v.r)), s: A.s.sub(cOf(j).mul(v.s)) };
    return eaVal(v, 1);
  };
  const right = run((j) => q(j), fam.Aval);
  const opts = [
    { html: MT(right.text()), correct: true },
    { html: MT(run((j) => q(j - 1), fam.Aval).text()), correct: false, rule: 'a1_reduction_index' },
    { html: MT(run((j) => q(j), { r: q(0), s: q(0) }).text()), correct: false, rule: 'a1_ibp_boundary_term' },
    { html: MT(run((j) => q(-j), fam.Aval).text()), correct: false, rule: 'a1_ibp_sign' },
  ];
  return mcq({
    skill: RD, level: 4, prompt: t('Soit {title}. Alors {name}{p1} =', { title: fam.title, name: fam.name, p1: '₀₁₂₃₄₅'[k] }), key: `mcq:${fam.name}${k}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
    options: uniq(opts),
    solution: [{ html: t('{p1} = {rec}, {p2} = {J0text}, donc {p3} = {p4}.', { p1: MT(`${fam.name}_n`), rec: MT(fam.rec), p2: MT(`${fam.name}_0`), J0text: MT(fam.J0text), p3: MT(`${fam.name}_${k}`), p4: MT(right.text()) }), note: '' }],
  }, rng);
}

GEN_[RD] = (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? rdMcq(rng) : rdItem(level, rng, opts));

// ======================================================================
// a1-int-rational
// ======================================================================

const RA = 'a1-int-rational';
const RA_SUB = [
  { id: 'div', label: t('division'), skill: 'g0-long-div' },
  { id: 'des', label: t('décomposition en éléments simples'), skill: 'g0-pfd-general' },
  { id: 'int', label: t('intégrer'), skill: RA },
];
const RA_CHOICES = [
  { id: 'div', label: t('Division euclidienne') },
  { id: 'factor', label: t('Factoriser Q') },
  { id: 'des', label: t('Décomposer en éléments simples') },
  { id: 'split', label: t('Séparer dérivée + constante, compléter le carré') },
  { id: 'int', label: t('Intégrer : Log et Arctg') },
  { id: 'eval', label: t('Évaluer aux bornes') },
  { id: 'log', label: t('Prendre Log|Q|'), rule: 'a1_int_log_of_denominator', why: t('Log|Q| a pour dérivée Q′/Q : le numérateur n\'est pas Q′.') },
];

// Polynomials as arrays of Q (c[i] for xⁱ).
const pmul = (A, B) => { const out = Array(A.length + B.length - 1).fill(q(0)); A.forEach((a, i) => B.forEach((b, j) => { out[i + j] = out[i + j].add(a.mul(b)); })); return out; };
const padd = (A, B) => Array.from({ length: Math.max(A.length, B.length) }, (_, i) => (A[i] || q(0)).add(B[i] || q(0)));
function ptext(P) {
  const terms = [];
  for (let i = P.length - 1; i >= 0; i--) {
    const c = P[i];
    if (!c || c.n === 0) continue;
    const body = i === 0 ? '' : i === 1 ? 'x' : `x^${i}`;
    terms.push(body ? cm(c, body) : N(c));
  }
  return joinSum(terms);
}
const quad = (p, qq) => ptext([q(qq), q(p), q(1)]);
// (x − a) in a product or a denominator; x alone without brackets.
const pf = (t) => (t === 'x' ? 'x' : `(${t})`);

// One rational function, from its simple elements.
function raData(rng, kind, { def = false } = {}) {
  for (let i = 0; i < 200; i++) {
    if (kind === 'L') {
      const a = rng.int(-3, 3);
      const p = rng.pick([-4, -2, 0, 2, 4]);
      const s = def ? rng.pick([1, 4, 9]) : rng.pick([1, 4, 9, 2, 3]);
      const qq = (p * p) / 4 + s;
      const A = rng.int(-4, 4);
      const B = rng.int(-4, 4);
      const C = rng.int(-6, 6);
      if (!A || !B) continue;
      // E = C − B·p/2: the constant left after B/2·(2x + p).
      const E_ = q(C).sub(q(B * p, 2));
      if (E_.n === 0 && rng.chance(0.8)) continue;
      const Q2 = [q(qq), q(p), q(1)];
      const L1 = [q(-a), q(1)];
      const P = padd(pmul([q(A)], Q2), pmul([q(C), q(B)], L1));
      if (P.every((c) => c.n === 0) || Math.abs(P[2]?.n ?? 0) > 9 || Math.abs(P[1].n) > 20 || Math.abs(P[0].n) > 40) continue;
      return { kind, a, p, qq, s, A, B, C, E: E_, P, Q2, L1, bounds: def ? { lo: a + 1, hi: a + 2 } : null };
    }
    if (kind === 'D') {
      const a = rng.int(-3, 3);
      const b = rng.int(-3, 3);
      if (a === b) continue;
      const A = rng.int(-3, 3);
      const B = rng.int(-3, 3);
      const C = rng.int(-3, 3);
      if (!B || !C || A + C === 0) continue;
      // A(x − a)(x − b) + B(x − b) + C(x − a)²
      const La = [q(-a), q(1)];
      const Lb = [q(-b), q(1)];
      const P = padd(padd(pmul([q(A)], pmul(La, Lb)), pmul([q(B)], Lb)), pmul([q(C)], pmul(La, La)));
      if (Math.abs(P[2].n) > 9 || Math.abs(P[1].n) > 20 || Math.abs(P[0].n) > 40) continue;
      const m = Math.max(a, b);
      return { kind, a, b, A, B, C, P, bounds: def ? { lo: m + 1, hi: m + 2 } : null };
    }
    // Division first: (x² + …)/((x − a)(x − b)) = 1 + A/(x − a) + B/(x − b).
    const a = rng.int(-3, 3);
    const b = rng.int(-3, 3);
    if (a >= b) continue;
    const A = rng.int(-4, 4);
    const B = rng.int(-4, 4);
    if (!A || !B || A + B === 0) continue;
    const La = [q(-a), q(1)];
    const Lb = [q(-b), q(1)];
    const Qd = pmul(La, Lb);
    const R = padd(pmul([q(A)], Lb), pmul([q(B)], La));
    const P = padd(Qd, R);
    if (P.some((c) => Math.abs(c.n) > 20)) continue;
    return { kind: 'div', a, b, A, B, P, Qd, R, bounds: def ? { lo: b + 1, hi: b + 2 } : null };
  }
  return null;
}

const FALLBACK_RA = { kind: 'L', a: 1, p: 2, qq: 5, s: 4, A: 1, B: -1, C: 1, E: q(2), P: [q(4), q(0), q(0)], Q2: [q(5), q(2), q(1)], L1: [q(-1), q(1)], bounds: null, fallback: true };

// The texts of the lines.
function raTexts(d) {
  const out = {};
  if (d.kind === 'L') {
    const Q2t = quad(d.p, d.qq);
    const Qf = `${pf(lin(d.a))}(${Q2t})`;
    out.f = `${wrap(ptext(d.P))}/(${Qf})`;
    out.Qexp = ptext(pmul(d.L1, d.Q2));
    out.fexp = `${wrap(ptext(d.P))}/(${out.Qexp})`;
    out.des = joinSum([`${d.A}/${pf(lin(d.a))}`, `(${ptext([q(d.C), q(d.B)])})/(${Q2t})`]);
    const h = q(d.p, 2);
    const sq = h.n === 0 ? 'x^2' : `(${shift(h)})^2`;
    const r = Math.round(Math.sqrt(d.s));
    const exact = r * r === d.s;
    const half = q(d.B, 2);
    out.split = joinSum([
      cm(d.A, `int(1/${pf(lin(d.a))},x)`),
      cm(half, `int(${wrap(ptext([q(d.p), q(2)]))}/(${Q2t}),x)`),
      d.E.n ? cm(d.E, `int(1/(${sq}+${d.s}),x)`) : '',
    ]);
    const u = h.n === 0 ? 'x' : shift(h);
    const at = d.E.n === 0 ? '' : exact
      ? cm(d.E.div(r), `arctan(${r === 1 ? u : `${pf(u)}/${r}`})`)
      : `${d.E.n < 0 ? '-' : ''}(${Math.abs(d.E.n)}/√${d.s})arctan(${pf(u)}/√${d.s})`;
    out.F = joinSum([cm(d.A, `ln(|${lin(d.a)}|)`), cm(half, `ln(${Q2t})`), at]);
    out.forms = {
      good: `A/${pl(pf(lin(d.a)))} + (Bx + C)/(${pl(Q2t)})`,
      bad1: `A/${pl(pf(lin(d.a)))} + B/(${pl(Q2t)})`,
      bad2: `A/${pl(pf(lin(d.a)))} + B/(x − r₁) + C/(x − r₂)`,
    };
    out.Q2t = Q2t; out.u = u; out.r = exact ? r : null;
    return out;
  }
  if (d.kind === 'D') {
    const Qf = d.b === 0 ? `x(${lin(d.a)})^2` : `(${lin(d.a)})^2${pf(lin(d.b))}`;
    out.f = `${wrap(ptext(d.P))}/(${Qf})`;
    out.Qexp = ptext(pmul(pmul([q(-d.a), q(1)], [q(-d.a), q(1)]), [q(-d.b), q(1)]));
    out.fexp = `${wrap(ptext(d.P))}/(${out.Qexp})`;
    out.des = joinSum([d.A ? `${d.A}/${pf(lin(d.a))}` : '', `${d.B}/${pf(lin(d.a))}^2`, `${d.C}/${pf(lin(d.b))}`]);
    out.split = null;
    out.F = joinSum([d.A ? cm(d.A, `ln(|${lin(d.a)}|)`) : '', `${-d.B}/(${lin(d.a)})`, cm(d.C, `ln(|${lin(d.b)}|)`)]);
    out.forms = {
      good: `A/${pl(pf(lin(d.a)))} + B/${pl(pf(lin(d.a)))}² + C/${pl(pf(lin(d.b)))}`,
      bad1: `A/${pl(pf(lin(d.a)))} + C/${pl(pf(lin(d.b)))}`,
      bad2: `A/${pl(pf(lin(d.a)))}² + C/${pl(pf(lin(d.b)))}`,
    };
    return out;
  }
  const Qt = ptext(d.Qd);
  out.f = `(${ptext(d.P)})/(${Qt})`;
  out.fexp = out.f;
  out.div = `1+(${ptext(d.R)})/(${pf(lin(d.a))}${pf(lin(d.b))})`;
  out.des = joinSum(['1', `${d.A}/${pf(lin(d.a))}`, `${d.B}/${pf(lin(d.b))}`]);
  out.F = joinSum(['x', cm(d.A, `ln(|${lin(d.a)}|)`), cm(d.B, `ln(|${lin(d.b)}|)`)]);
  out.forms = {
    good: `1 + A/${pl(pf(lin(d.a)))} + B/${pl(pf(lin(d.b)))}`,
    bad1: `A/${pl(pf(lin(d.a)))} + B/${pl(pf(lin(d.b)))}`,
    bad2: `(Ax + B)/${pl(pf(lin(d.a)))} + C/${pl(pf(lin(d.b)))}`,
  };
  return out;
}
// x-1 → x − 1 for labels.
const pl = (t) => t.replace(/\^2/g, '²').replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/^ − /, '−');

// The value of the primitive on [lo, hi] (no pole there).
function raValue(d) {
  const v = new Val();
  const { lo, hi } = d.bounds;
  for (const [x0, sg] of [[hi, 1], [lo, -1]]) {
    if (d.kind === 'L') {
      v.ln(sg * d.A, q(Math.abs(x0 - d.a)));
      v.ln(q(sg * d.B, 2), q(x0 * x0 + d.p * x0 + d.qq));
      if (d.E.n) {
        const u = q(x0).add(q(d.p, 2));
        const r = Math.round(Math.sqrt(d.s));
        v.arctan(d.E.div(r).mul(sg), u.div(r));
      }
    } else if (d.kind === 'D') {
      if (d.A) v.ln(sg * d.A, q(Math.abs(x0 - d.a)));
      v.rat(q(-d.B * sg, x0 - d.a));
      v.ln(sg * d.C, q(Math.abs(x0 - d.b)));
    } else {
      v.rat(sg * x0);
      v.ln(sg * d.A, q(Math.abs(x0 - d.a)));
      v.ln(sg * d.B, q(Math.abs(x0 - d.b)));
    }
  }
  return v;
}

function raDecisions(d, T) {
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'des', label: d.kind === 'div' ? t('Division, puis décomposition en éléments simples') : t('Décomposition en éléments simples'), valid: true, quality: 'good' },
      { id: 'subst-den', label: d.kind === 'L' ? `t = ${pl(T.Q2t)}` : t('t = dénominateur'), valid: false, why: t('Le numérateur n\'est pas proportionnel à la dérivée du dénominateur.') },
      { id: 'parts', label: t('Intégration par parties'), valid: true, quality: 'poor', why: t('Juste en principe, mais chaque IPP laisse une fraction rationnelle aussi compliquée.') },
      { id: 'log-den', label: t('Log|dénominateur|'), valid: false, rule: 'a1_int_log_of_denominator', why: t('Log|Q| a pour dérivée Q′/Q : le numérateur n\'est pas Q′.') },
    ],
    l2: ['log-den'], taken: d.kind === 'div' ? t('division (deg P = deg Q), puis décomposition en éléments simples') : t('décomposition en éléments simples : {good}', { good: T.forms.good }),
  };
  const dec2 = {
    prompt: t('Quelle forme pour la décomposition ?'),
    options: [
      { id: 'good', label: T.forms.good, valid: true, quality: 'good' },
      { id: 'bad1', label: T.forms.bad1, valid: false, rule: 'a1_des_wrong_form', why: d.kind === 'L' ? t('Sur un facteur de degré 2 sans racine, le numérateur est de degré 1 : Bx + C.') : d.kind === 'D' ? t('La racine double demande aussi un terme B/(x − a)².') : t('deg P = deg Q : il faut d\'abord diviser (partie entière 1).') },
      { id: 'bad2', label: T.forms.bad2, valid: false, ...(d.kind === 'D' ? { rule: 'a1_des_wrong_form' } : {}), why: d.kind === 'L' ? t('Ce facteur de degré 2 n\'a pas de racine réelle (Δ < 0) : il ne se factorise pas.') : d.kind === 'D' ? t('Il faut les deux termes A/(x − a) et B/(x − a)².') : t('Les deux facteurs sont de degré 1 : des numérateurs constants suffisent.') },
    ],
  };
  return { dec, dec2 };
}

function raItem(level, rng, opts = {}) {
  const lv = opts.exam ? 5 : level;
  const def = lv === 5 && !opts.exam;
  const kind = lv <= 2 ? rng.pick(['L', 'L', 'D']) : rng.pick(['L', 'L', 'D', 'div']);
  const d = raData(rng, kind, { def }) || FALLBACK_RA;
  const T = raTexts(d);
  const { dec, dec2 } = raDecisions(d, T);
  const roots = d.kind === 'L' ? [d.a] : [d.a, d.b];
  const m = Math.max(...roots);
  const domain = { x: [m + 0.3, m + 3] };
  const prims = { [key(T.fexp)]: T.F, [key(T.f)]: T.F };
  const expanded = lv >= 4 && d.kind !== 'div';
  const f0 = expanded ? T.fexp : T.f;
  if (def) {
    const { lo, hi } = d.bounds;
    const start = `int(${T.f},x,${lo},${hi})`;
    const lines = [
      ...(d.kind === 'div' ? [E(`int(${T.div},x,${lo},${hi})`, t('Division'), 'div', 'div')] : []),
      E(`int(${T.des},x,${lo},${hi})`, t('Éléments simples'), 'des', 'des'),
      E(`bracket(${T.F},x,${lo},${hi})`, t('Intégrer'), 'int', 'int'),
      E(raValue(d).text(), t('Évaluer'), 'int', 'eval'),
    ];
    return intItem({
      skill: RA, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 4, fallback: d.fallback,
      parts: [{ start, judge: { kind: 'definite', prims }, lines, dec, dec2, choices: RA_CHOICES }],
      hints: [], subgoals: RA_SUB,
    }, level, rng, opts);
  }
  const start = `int(${f0},x)`;
  const desLines = [];
  if (expanded) desLines.push(E(T.f, t('Factoriser Q'), 'des', 'factor'));
  if (d.kind === 'div') desLines.push(E(T.div, t('Division euclidienne'), 'div', 'div'));
  const coefs = d.kind === 'L' ? [{ num: `${d.A}/${pf(lin(d.a))}` }, { num: `(${ptext([q(d.C), q(d.B)])})/(${T.Q2t})` }]
    : d.kind === 'D' ? [{ num: `${d.B}/${pf(lin(d.a))}^2` }, { num: `${d.C}/${pf(lin(d.b))}` }] : [{ num: `${d.A}/${pf(lin(d.a))}` }, { num: `${d.B}/${pf(lin(d.b))}` }];
  desLines.push(E(T.des, t('Éléments simples'), 'des', 'des', coefs, coefs.slice(0, 1)));
  const intLines = [E(`int(${T.des},x)`, t('Intégrer les éléments simples'), 'int', 'des')];
  if (T.split) intLines.push(E(T.split, t('Dérivée du dénominateur + constante, carré complété'), 'int', 'split'));
  intLines.push(E(`${T.F}+C`, d.kind === 'L' && d.E.n ? t('Log et Arctg') : 'Log', 'int', 'int'));
  const parts = [
    firstPart(f0, [V], desLines, { judge: { domain, target: 'partial-fractions' }, dec, dec2, choices: RA_CHOICES, note: t('Décompose la fraction.') }),
    { html: t('L’intégrale'), start, judge: { kind: 'antideriv', v: V, domain, prims }, lines: intLines, choices: RA_CHOICES },
  ];
  return intItem({
    skill: RA, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 4, fallback: d.fallback, parts,
    hints: H(d.kind === 'L' ? t('Facteur de degré 2 sans racine : numérateur Bx + C. Ensuite, sépare la dérivée du dénominateur et complète le carré.') : d.kind === 'D' ? t('Racine double : A/(x − a) + B/(x − a)², puis C/(x − b).') : t('deg P = deg Q : divise d\'abord, puis décompose le reste.'), MT(T.des), MT(`${T.F}+C`)),
    subgoals: RA_SUB, baits: ['a1_des_wrong_form'],
  }, level, rng, opts);
}

function raMcq(rng) {
  for (let i = 0; i < 200; i++) {
    const d = raData(rng, 'L');
    if (!d || d.E.n === 0 || d.s === 1) continue;
    const T = raTexts(d);
    const half = q(d.B, 2);
    const base = [cm(d.A, `ln(|${lin(d.a)}|)`), cm(half, `ln(${T.Q2t})`)];
    const opts = [
      { html: MT(`${T.F}+C`), correct: true },
      { html: MT(`${joinSum([...base, cm(d.E, `arctan(${T.u})`)])}+C`), correct: false, rule: 'a1_arctg_scale' },
      { html: MT(`${joinSum([base[0], cm(half.add(d.E), `ln(${T.Q2t})`)])}+C`), correct: false, rule: 'a1_int_arctg_as_log' },
      { html: MT(`ln(|${pf(lin(d.a))}(${T.Q2t})|)+C`), correct: false, rule: 'a1_int_log_of_denominator' },
    ];
    if (uniq(opts).length < 4) continue;
    return mcq({
      skill: RA, level: 4, prompt: `${MT(`int(${T.f},x)`)} =`, key: `mcq:${T.f}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: opts,
      solution: [{ html: `${MT(T.des)} ; ${MT(T.split)}`, note: '' }],
    }, rng);
  }
  return mcq({
    skill: RA, level: 4, prompt: `${MT('int((x+5)/((x-1)(x^2+2x+5)),x)')} =`, key: 'mcq:fallback', exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: true,
    options: [
      { html: MT('(3/4)ln(|x-1|)-(3/8)ln(x^2+2x+5)-(1/4)arctan((x+1)/2)+C'), correct: true },
      { html: MT('(3/4)ln(|x-1|)-(3/8)ln(x^2+2x+5)-(1/2)arctan(x+1)+C'), correct: false, rule: 'a1_arctg_scale' },
      { html: MT('(3/4)ln(|x-1|)-(7/8)ln(x^2+2x+5)+C'), correct: false, rule: 'a1_int_arctg_as_log' },
      { html: MT('ln(|(x-1)(x^2+2x+5)|)+C'), correct: false, rule: 'a1_int_log_of_denominator' },
    ],
  }, rng);
}

GEN_[RA] = (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? raMcq(rng) : raItem(level, rng, opts));

// ======================================================================
// a1-int-trig
// ======================================================================

const TR = 'a1-int-trig';
const TR_SUB = [
  { id: 'bioche', label: t('règles de Bioche, changer dx'), skill: 'g3-bioche' },
  { id: 'frac', label: t('fraction en t'), skill: RA },
  { id: 'back', label: t('revenir en x'), skill: TR },
];
const TR_CHOICES = [
  { id: 'dt', label: t('Exprimer dt (ou dx)') },
  { id: 'subst', label: t('Exprimer en t') },
  { id: 'div', label: t('Diviser, ou décomposer en éléments simples') },
  { id: 'int', label: t('Intégrer en t') },
  { id: 'back', label: t('Revenir en x') },
  { id: 'eval', label: t('Évaluer aux bornes') },
  { id: 'nodx', label: t('Remplacer dx par dt'), rule: 'a1_trig_subst_dx', why: t('dx = 2 dt/(1 + t²) avec t = tan(x/2).') },
];

// Bioche with t = cos x (fn 'cos', f = sinᵐx·R(cos x)) or t = sin x.
function bioche(rng, def) {
  for (let i = 0; i < 200; i++) {
    const fn = rng.pick(['cos', 'cos', 'sin']);
    const other = fn === 'cos' ? 'sin' : 'cos';
    const form = rng.pick(['sq3', 'sq1', 'lin3']);
    const a = form === 'lin3' ? rng.pick([2, 3]) : rng.pick([1, 4]);
    // σ: dt = σ·other(x)·dx.
    const sg = fn === 'cos' ? -1 : 1;
    const m = form === 'sq1' ? 1 : 3;
    const R = form === 'lin3' ? `(${a}+${fn}(x))` : `(${a}+${fn}(x)^2)`;
    const f = `${m === 1 ? `${other}(x)` : `${other}(x)^3`}/${R}`;
    const Rt = form === 'lin3' ? `(${a}+t)` : `(${a}+t^2)`;
    const num = m === 1 ? '1' : '(1-t^2)';
    const inT = `${sg < 0 ? '-' : ''}${num}/${Rt}`;
    const r = Math.sqrt(a);
    const atan = (c) => cm(c, a === 1 ? 'arctan(t)' : `arctan(t/${r})`);
    let simple = null;
    let Ft;
    if (form === 'sq1') Ft = atan(q(sg, r));
    else if (form === 'sq3') {
      // σ(1 − t²)/(a + t²) = σ(−1 + (1 + a)/(a + t²)).
      simple = `${sg < 0 ? '1' : '-1'}${sg < 0 ? '-' : '+'}${1 + a}/(${a}+t^2)`;
      Ft = joinSum([sg < 0 ? 't' : '-t', atan(q(sg < 0 ? -(1 + a) : (1 + a), r))]);
    } else {
      // σ(1 − t²)/(a + t) = σ(−t + a + (1 − a²)/(a + t)).
      simple = sg < 0 ? `t-${a}+${a * a - 1}/(${a}+t)` : `-t+${a}-${a * a - 1}/(${a}+t)`;
      Ft = sg < 0 ? `t^2/2-${a}t+${a * a - 1}ln(${a}+t)` : `-t^2/2+${a}t-${a * a - 1}ln(${a}+t)`;
    }
    const bounds = def ? (fn === 'cos' ? { a: '0', b: 'π/2', ta: q(1), tb: q(0) } : { a: '0', b: 'π/2', ta: q(0), tb: q(1) }) : null;
    return { tpl: 'bioche', fn, other, form, a, sg, f, inT, simple, Ft, Fx: fixArctan(Ft, fn), t: `${fn}(x)`, dt: `${sg < 0 ? '-' : ''}${other}(x)`, dtw: `${sg < 0 ? '−' : ''}${other} x`, bounds, r };
  }
  return null;
}
// t → cos(x) in a primitive written in t.
function fixArctan(Ft, fn) {
  return Ft.replace(/arctan/g, '§').replace(/t/g, `${fn}(x)`).replace(/§/g, 'arctan');
}

// The value of a Bioche primitive in t between ta and tb.
function biocheValue(d) {
  const v = new Val();
  const r = d.r;
  for (const [t0, s] of [[d.bounds.tb, 1], [d.bounds.ta, -1]]) {
    if (d.form === 'sq1') v.arctan(q(d.sg * s, r), t0.div(r));
    else if (d.form === 'sq3') { v.rat(t0.mul(d.sg < 0 ? s : -s)); v.arctan(q((d.sg < 0 ? -(1 + d.a) : 1 + d.a) * s, r), t0.div(r)); }
    else {
      const k = d.sg < 0 ? 1 : -1;
      v.rat(t0.mul(t0).div(2).mul(k * s)).rat(t0.mul(-d.a * k * s));
      v.ln(k * s * (d.a * d.a - 1), q(d.a).add(t0));
    }
  }
  return v;
}

// t = tan(x/2): 1/(a + b·cos x), or k/sin x.
const TAN_PAIRS = [
  // [a, b, α = a + b, β = a − b, primitive in t]
  [2, 1, '(2/√3)arctan(t/√3)'], [3, 1, '(1/√2)arctan(t/√2)'], [2, -1, '(2/√3)arctan(√3×t)'], [3, -1, '(1/√2)arctan(√2×t)'], [3, 2, '(2/√5)arctan(t/√5)'],
];
const TAN_DEF = [
  // definite on [0 ; π/2]: t from 0 to 1, rational coefficients.
  [5, 4, '(2/3)arctan(t/3)', [q(2, 3), q(1, 3)]], [5, -4, '(2/3)arctan(3t)', [q(2, 3), q(3)]], [5, 3, '(1/2)arctan(t/2)', [q(1, 2), q(1, 2)]], [5, -3, '(1/2)arctan(2t)', [q(1, 2), q(2)]],
];
function tanHalf(rng, def) {
  if (rng.chance(0.35)) {
    const k = rng.int(1, 3);
    const f = `${k}/sin(x)`;
    return {
      tpl: 'sin', f, k, inT: `${k}/((2t)/(1+t^2))×2/(1+t^2)`, simple: `${k}/t`, Ft: cm(k, 'ln(|t|)'), Fx: cm(k, 'ln(|tan(x/2)|)'),
      t: 'tan(x/2)', dt: '2/(1+t^2)', dom: [0.3, 2.8],
      bounds: def ? { a: 'π/3', b: 'π/2', ta: '√3/3', tb: '1' } : null,
      value: () => new Val().ln(q(k, 2), 3),
    };
  }
  const [a, b, Ft, val] = def ? rng.pick(TAN_DEF) : rng.pick(TAN_PAIRS);
  const al = a + b;
  const be = a - b;
  const f = `1/(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}cos(x))`;
  const simple = `2/(${al}+${be === 1 ? '' : be}t^2)`;
  return {
    tpl: 'cos', f, inT: `1/(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : `${Math.abs(b)}×`}(1-t^2)/(1+t^2))×2/(1+t^2)`, simple, Ft,
    Fx: Ft.replace(/t\//g, 'tan(x/2)/').replace(/×t\)/g, '×tan(x/2))').replace(/\(3t\)/, '(3tan(x/2))').replace(/\(2t\)/, '(2tan(x/2))'),
    t: 'tan(x/2)', dt: '2/(1+t^2)', dom: [-2.5, 2.5],
    bounds: def ? { a: '0', b: 'π/2', ta: '0', tb: '1' } : null,
    value: () => new Val().arctan(val[0], val[1]),
  };
}

function trDecision(d) {
  if (d.tpl === 'bioche') {
    const inv = d.fn === 'cos' ? 'x → −x' : 'x → π − x';
    const dec = {
      prompt: t('Quelle méthode ?'),
      options: [
        { id: 'bioche', label: t('Règles de Bioche'), valid: true, quality: 'good', then: { ask: 't =', expect: d.t, vars: [V], why: t('f(x) dx est invariant par {inv} : pose t = {fn} x.', { inv, fn: d.fn }) } },
        { id: 'tan-half', label: 't = tan(x/2)', valid: true, quality: 'poor', why: t('Juste, mais on obtient une fraction de degré 6 en t ; Bioche donnait une fraction de degré 2.') },
        { id: 'lin', label: t('Linéariser {other}³x', { other: d.other }), valid: true, quality: 'poor', why: t('Juste pour le numérateur, mais le dénominateur reste.') },
        { id: 'parts', label: t('Intégration par parties'), valid: false, why: t('Aucun facteur simple à dériver.') },
      ],
      l2: [], taken: t('{inv} laisse f(x) dx invariant : t = {fn} x, dt = {dtw} dx', { inv, fn: d.fn, dtw: d.dtw }),
    };
    const dec2 = {
      prompt: t('Quelle transformation laisse f(x) dx invariant ?'),
      options: [inv, ...['x → −x', 'x → π − x', 'x → π + x'].filter((o) => o !== inv)].map((o) => ({ id: o, label: `${o} : ${o === 'x → −x' ? 't = cos x' : o === 'x → π − x' ? 't = sin x' : 't = tan x'}`, valid: o === inv, ...(o === inv ? { quality: 'good' } : { why: t('f(x) dx change de signe par {o}.', { o }) }) })),
    };
    return { dec, dec2 };
  }
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'tan-half', label: 't = tan(x/2)', valid: true, quality: 'good', then: { ask: 't =', expect: 'tan(x/2)', vars: [V], domain: { x: [0.2, 2.5] }, why: t('Aucune règle de Bioche ne s\'applique : t = tan(x/2) marche toujours.') } },
      { id: 'cos', label: 't = cos x', valid: false, why: t('f(x) dx n\'est pas invariant par x → −x.') },
      { id: 'nodx', label: t('t = tan(x/2) et dx = dt'), valid: false, rule: 'a1_trig_subst_dx', why: t('x = 2 Arctg t, donc dx = 2 dt/(1 + t²).') },
      { id: 'parts', label: t('Intégration par parties'), valid: false, why: t('Aucun facteur simple à dériver.') },
    ],
    l2: ['nodx'], taken: 't = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²)',
  };
  return { dec, dec2: null };
}

function trItem(level, rng, opts = {}) {
  const lv = opts.exam ? 5 : level;
  const def = lv >= 4 || rng.chance(0.25);
  const d = (lv === 2 || rng.chance(0.55)) ? bioche(rng, def) : tanHalf(rng, def);
  const { dec, dec2 } = trDecision(d);
  const subst = { t: d.t };
  const domain = { x: d.tpl === 'bioche' ? (d.fn === 'cos' ? [0.2, 3] : [-1.4, 1.4]) : d.dom };
  if (def) {
    const B = d.bounds;
    const ta = typeof B.ta === 'string' ? B.ta : N(B.ta);
    const tb = typeof B.tb === 'string' ? B.tb : N(B.tb);
    const start = `int(${d.f},x,${B.a},${B.b})`;
    const value = d.tpl === 'bioche' ? biocheValue(d) : d.value();
    const lines = [
      E(`int(${d.inT},t,${ta},${tb})`, t('Exprimer en t, avec dt et les bornes'), 'bioche', 'subst', [], []),
      ...(d.simple ? [E(`int(${d.simple},t,${ta},${tb})`, t('Simplifier'), 'frac', 'div')] : []),
      E(`bracket(${d.Ft},t,${ta},${tb})`, t('Intégrer en t'), 'frac', 'int'),
      E(value.text(), t('Évaluer'), 'frac', 'eval'),
    ];
    return intItem({
      skill: TR, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 4,
      parts: [{ start, judge: { kind: 'definite', change: { t: d.t, x: d.tpl === 'bioche' ? `arc${d.fn}(t)` : '2arctan(t)' } }, lines, dec, dec2, choices: TR_CHOICES }],
      hints: H(d.tpl === 'bioche' ? t('Teste {p1} : pose t = {fn} x.', { p1: d.fn === 'cos' ? 'x → −x' : 'x → π − x', fn: d.fn }) : t('Pose t = tan(x/2) : dx = 2 dt/(1 + t²).'), MT(lines[0].math, { vars: ['t'] }), MT(lines[1].math, { vars: ['t'] })),
      subgoals: TR_SUB, keys: [...KEYS, 'trig'],
    }, level, rng, opts);
  }
  const start = `int(${d.f},x)`;
  const lines = [
    E(`int(${d.inT},t)`, t('Exprimer en t'), 'bioche', 'subst', d.tpl === 'bioche' ? [d.form === 'sq1' ? '1' : '1-t^2'] : ['2/(1+t^2)'], []),
    ...(d.simple && d.tpl !== 'sin' ? [E(`int(${d.simple},t)`, t('Diviser'), 'frac', 'div')] : d.simple ? [E(`int(${d.simple},t)`, t('Simplifier'), 'frac', 'div')] : []),
    E(`${d.Ft}+C`, t('Intégrer en t'), 'frac', 'int'),
    E(`${d.Fx}+C`, t('Revenir en x'), 'back', 'back'),
  ];
  const parts = [
    d.tpl === 'bioche'
      ? firstPart(`d(${d.t})`, [V], [E(d.dt, `t = ${d.fn} x : dt = ${d.dtw} dx`, 'bioche', 'dt')], { dec, dec2, choices: TR_CHOICES, note: t('t = {fn} x : calcule dt/dx.', { fn: d.fn }) })
      : firstPart('d(2arctan(t))', ['t'], [E('2/(1+t^2)', 'x = 2 Arctg t', 'bioche', 'dt')], { judge: { dvar: 't' }, dec, dec2, choices: TR_CHOICES, note: t('t = tan(x/2), donc x = 2 Arctg t : calcule dx/dt.') }),
    { html: t('L’intégrale'), start, judge: { kind: 'antideriv', v: V, domain, subst, change: { t: d.t, x: d.tpl === 'bioche' ? `arc${d.fn}(t)` : '2arctan(t)' } }, lines, choices: TR_CHOICES },
  ];
  return intItem({
    skill: TR, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 4, parts,
    hints: H(d.tpl === 'bioche' ? t('Teste {p1} : f(x) dx ne change pas. Pose t = {fn} x.', { p1: d.fn === 'cos' ? 'x → −x' : 'x → π − x', fn: d.fn }) : t('Pose t = tan(x/2) : cos x = (1 − t²)/(1 + t²), sin x = 2t/(1 + t²), dx = 2 dt/(1 + t²).'), MT(lines[0].math, { vars: ['t'] }), MT(lines[lines.length - 2].math, { vars: ['t'] })),
    subgoals: TR_SUB, keys: [...KEYS, 'trig'], baits: d.tpl === 'bioche' ? ['a1_subst_dx_kept'] : ['a1_trig_subst_dx'],
  }, level, rng, opts);
}

function trMcq(rng) {
  if (rng.chance(0.5)) {
    const k = rng.int(1, 3);
    const opts = [
      { html: MT(`${cm(k, 'ln(|tan(x/2)|)')}+C`), correct: true },
      { html: MT(`${cm(q(k, 2), 'ln(|tan(x/2)|)')}+${cm(q(k, 4), 'tan(x/2)^2')}+C`), correct: false, rule: 'a1_trig_subst_dx' },
      { html: MT(`${cm(k, 'ln(|tan(x/2)|)')}+${cm(q(k, 2), 'tan(x/2)^2')}+C`), correct: false, rule: 'a1_trig_subst_dx' },
      { html: MT(`${cm(k, 'ln(|sin(x)|)')}+C`), correct: false, rule: 'a1_int_log_of_denominator' },
    ];
    return mcq({
      skill: TR, level: 4, prompt: t('Sur ]0 ; π[, {p1} =', { p1: MT(`int(${k}/sin(x),x)`) }), key: `mcq:sin${k}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: opts,
      solution: [{ html: `t = tan(x/2), dx = 2 dt/(1 + t²), sin x = 2t/(1 + t²) : ${MT(`int(${k}/t,t)`, { vars: ['t'] })}.`, note: '' }],
    }, rng);
  }
  const a = rng.pick([1, 4]);
  const r = Math.sqrt(a);
  const at = (c, inner) => cm(q(c, r), a === 1 ? `arctan(${inner})` : `arctan(${inner}/${r})`);
  const c = 1 + a;
  const opts = [
    { html: MT(`${joinSum(['cos(x)', at(-c, 'cos(x)')])}+C`), correct: true },
    { html: MT(`${joinSum(['-cos(x)', at(c, 'cos(x)')])}+C`), correct: false, rule: 'a1_subst_dx_kept' },
    { html: MT(`${joinSum(['cos(x)', cm(q(-c, 2), `ln(${a}+cos(x)^2)`)])}+C`), correct: false, rule: 'a1_int_arctg_as_log' },
    { html: MT(`${joinSum(['-cos(x)', at(-c, 'cos(x)')])}+C`), correct: false, rule: 'a1_subst_dx_kept' },
  ];
  return mcq({
    skill: TR, level: 4, prompt: `${MT(`int(sin(x)^3/(${a}+cos(x)^2),x)`)} =`, key: `mcq:bioche${a}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: uniq(opts),
    solution: [{ html: `x → −x : t = cos x, dt = −sin x dx, sin²x = 1 − t².`, note: '' }],
  }, rng);
}

GEN_[TR] = (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? trMcq(rng) : trItem(level, rng, opts));

// ======================================================================
// a1-int-hyper
// ======================================================================

const HY = 'a1-int-hyper';
const HY_SUB = [
  { id: 'subst', label: t('changement de variable'), skill: 'a1-int-subst' },
  { id: 'identity', label: 'cosh² − sinh² = 1', skill: 'g2-hyp-formulas' },
  { id: 'int', label: t('intégrer, revenir en x'), skill: HY },
];
const HY_CHOICES = [
  { id: 'dx', label: t('Exprimer dx') },
  { id: 'subst', label: t('Remplacer x et dx') },
  { id: 'identity', label: t('Simplifier la racine : cosh² − sinh² = 1') },
  { id: 'int', label: t('Intégrer') },
  { id: 'back', label: t('Revenir en x (Argsh, Argch)') },
  { id: 'eval', label: t('Évaluer') },
  { id: 'trig', label: t('Utiliser cosh² + sinh² = 1'), rule: 'a1_hyper_identity_sign', why: t('Pour les hyperboliques : cosh² − sinh² = 1.') },
];
// x = a·sinh t on [0 ; b·a]: t from 0 to Log m (argsh(b) = Log m).
const SH_B = [[q(3, 4), 2], [q(4, 3), 3], [q(12, 5), 5]];

function hyRoot(rng, def, sh) {
  const a = rng.int(1, 3);
  const A = (t) => (a === 1 ? t : `${a}×${t}`);
  const fn = sh ? 'sinh' : 'cosh';
  const gn = sh ? 'cosh' : 'sinh';
  const f = sh ? `1/√(x^2+${a * a})` : `1/√(x^2-${a * a})`;
  const rad = sh ? `${a === 1 ? '' : `${a * a}×`}sinh(t)^2+${a * a}` : `${a === 1 ? '' : `${a * a}×`}cosh(t)^2-${a * a}`;
  const inT = `${A(`${gn}(t)`)}/√(${rad})`;
  const simple = a === 1 ? `${gn}(t)/${gn}(t)` : `${A(`${gn}(t)`)}/(${A(`${gn}(t)`)})`;
  const arg = a === 1 ? 'x' : `x/${a}`;
  const Fx = `${sh ? 'argsh' : 'argch'}(${arg})`;
  let bounds = null;
  if (def) {
    if (sh) {
      const [b, mm] = rng.pick(SH_B);
      bounds = { a: '0', b: N(b.mul(a)), ta: '0', tb: `ln(${mm})`, value: new Val().ln(1, mm) };
    } else bounds = { a: N(q(5 * a, 4)), b: N(q(5 * a, 3)), ta: 'ln(2)', tb: 'ln(3)', value: new Val().ln(1, q(3, 2)) };
  }
  return { tpl: sh ? 'sinh' : 'cosh', a, f, inT, simple, Fx, fn, gn, t: `${sh ? 'argsh' : 'argch'}(${arg})`, dx: A(`${gn}(t)`), xt: A(`${fn}(t)`), dom: sh ? [-3, 3] : [a + 0.3, a + 4], bounds };
}

// cosh²x or sinh²x: linearise.
function hySquare(rng, def) {
  const fn = rng.pick(['cosh', 'sinh']);
  const k = rng.pick([1, 1, 2, 4]);
  const f = cm(k, `${fn}(x)^2`);
  const lin2 = fn === 'cosh' ? '(cosh(2x)+1)/2' : '(cosh(2x)-1)/2';
  const F = joinSum([cm(q(k, 4), 'sinh(2x)'), cm(q(fn === 'cosh' ? k : -k, 2), 'x')]);
  const m = rng.pick([2, 3]);
  // sinh(2 ln m) = (m² − 1/m²)/2.
  const sh2 = q(m * m).sub(q(1, m * m)).div(2);
  const bounds = def ? { a: '0', b: `ln(${m})`, value: new Val().rat(sh2.mul(k).div(4)).ln(q(fn === 'cosh' ? k : -k, 2), m) } : null;
  return { tpl: 'square', fn, k, f, lin: cm(k, lin2), F, bounds, m };
}

// Level 5 (exam 2018): ∫ from b to +∞ of eˣ/(e²ˣ − 1) dx with t = eˣ.
const HY_EXP = [['ln(2)', '2', 'ln(3)/2'], ['ln(3)', '3', 'ln(2)/2'], ['1', 'e', 'ln((e+1)/(e-1))/2']];
function hyExpItem(level, rng, opts) {
  const [b, tb, value] = rng.pick(HY_EXP);
  const start = `int(e^x/(e^(2x)-1),x,${b},∞)`;
  const lines = [
    E(`int(1/(t^2-1),t,${tb},∞)`, 't = eˣ, dt = eˣ dx, e²ˣ = t²', 'subst', 'subst'),
    E(`int((1/2)(1/(t-1)-1/(t+1)),t,${tb},∞)`, t('Éléments simples'), 'int', 'int'),
    E(value, t('[½·Log((t − 1)/(t + 1))] : la limite en +∞ vaut 0'), 'int', 'eval'),
  ];
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'exp', label: t('Changement de variable'), valid: true, quality: 'good', then: { ask: 't =', expect: 'e^x', vars: [V], why: t('Avec eˣ partout, pose t = eˣ.') } },
      { id: 'sinh', label: t('Écrire 1/(2 sinh x)'), valid: true, quality: 'poor', why: t('Juste, mais il faut encore une substitution pour intégrer 1/sinh x.') },
      { id: 'keep', label: t('t = eˣ en gardant les bornes'), valid: false, rule: 'a1_subst_bounds_kept', why: t('Quand x va de b à +∞, t = eˣ va de eᵇ à +∞.') },
      { id: 'parts', label: t('Intégration par parties'), valid: false, why: t('Aucun facteur ne se simplifie en dérivant.') },
    ],
    l2: ['keep'], taken: 't = eˣ',
  };
  return intItem({
    skill: HY, prompt: t('Calcule l\'intégrale généralisée {start} (elle converge : l\'intégrande se comporte comme e⁻ˣ en +∞).', { start: MT(start) }), key: start, points: 4,
    parts: [{ start, judge: { kind: 'definite', change: { t: 'e^x', x: 'ln(t)' } }, lines, dec, choices: HY_CHOICES }],
    hints: [], subgoals: HY_SUB, keys: [...KEYS, 'explog'],
  }, level, rng, opts);
}

function hyItem(level, rng, opts = {}) {
  const lv = level;
  if (lv === 5 && rng.chance(0.5)) return hyExpItem(level, rng, opts);
  const def = lv >= 4 || rng.chance(0.3);
  const sq = lv >= 3 && rng.chance(0.3);
  if (sq) return hySquareItem(level, rng, opts, def);
  const d = hyRoot(rng, def, lv === 2 ? rng.chance(0.7) : rng.chance(0.65));
  const sh = d.tpl === 'sinh';
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'good', label: `x = ${d.a === 1 ? '' : d.a} ${d.fn} t`, valid: true, quality: 'good' },
      { id: 'other', label: sh ? `x = ${d.a === 1 ? '' : d.a} tan t` : `x = ${d.a === 1 ? '' : d.a}/cos t`, valid: true, quality: 'poor', why: t('Juste, mais on arrive à une intégrale de 1/cos t, qui demande encore une substitution.') },
      { id: 'wrong', label: `x = ${d.a === 1 ? '' : d.a} ${d.gn} t`, valid: false, why: sh ? t('cosh t ≥ 1 : x ne parcourt pas ℝ, et la racine ne se simplifie pas.') : t('{p1}sinh²t − {p1} ne se simplifie pas.', { p1: d.a * d.a }) },
      { id: 'log', label: `Log(x² ${sh ? '+' : '−'} ${d.a * d.a})`, valid: false, rule: 'a1_int_log_of_denominator', why: t('La dérivée de Log(x² + a²) est 2x/(x² + a²) : ce n\'est pas l\'intégrande.') },
    ],
    l2: ['wrong'], taken: `x = ${d.a === 1 ? '' : d.a} ${d.fn} t, dx = ${d.a === 1 ? '' : d.a} ${d.gn} t dt`,
  };
  const subst = { t: d.t };
  const change = { t: d.t, x: d.xt };
  const idNote = sh ? '1 + sinh²t = cosh²t' : 'cosh²t − 1 = sinh²t';
  if (def) {
    const B = d.bounds;
    const start = `int(${d.f},x,${B.a},${B.b})`;
    const lines = [
      E(`int(${d.inT},t,${B.ta},${B.tb})`, t('Remplacer x, dx et les bornes'), 'subst', 'subst', [d.dx], [d.dx]),
      E(`int(${d.simple},t,${B.ta},${B.tb})`, idNote, 'identity', 'identity'),
      E(`bracket(t,t,${B.ta},${B.tb})`, t('Intégrer'), 'int', 'int'),
      E(B.value.text(), t('Évaluer'), 'int', 'eval'),
    ];
    return intItem({
      skill: HY, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 3,
      parts: [{ start, judge: { kind: 'definite', change }, lines, dec, choices: HY_CHOICES }],
      hints: H(t('√(x² {p1} {p2}) : pense à {idNote}. Pose x = {p3} {fn} t.', { p1: sh ? '+' : '−', p2: d.a * d.a, idNote, p3: d.a === 1 ? '' : d.a, fn: d.fn }), MT(lines[0].math, { vars: ['t'] }), MT(lines[1].math, { vars: ['t'] })),
      subgoals: HY_SUB, keys: [...KEYS, 'explog'],
    }, level, rng, opts);
  }
  const start = `int(${d.f},x)`;
  const lines = [
    E(`int(${d.inT},t)`, t('Remplacer x et dx'), 'subst', 'subst', [d.dx], []),
    E(`int(${d.simple},t)`, idNote, 'identity', 'identity'),
    E('t+C', t('Intégrer'), 'int', 'int'),
    E(`${d.Fx}+C`, t('Revenir en x'), 'back', 'back'),
  ];
  const parts = [
    firstPart(`d(${d.xt})`, ['t'], [E(d.dx, `x = ${d.a === 1 ? '' : d.a} ${d.fn} t`, 'subst', 'dx')], { judge: { dvar: 't' }, dec, choices: HY_CHOICES, note: t('x = {p1} {fn} t : calcule dx/dt.', { p1: d.a === 1 ? '' : d.a, fn: d.fn }) }),
    { html: t('L’intégrale'), start, judge: { kind: 'antideriv', v: V, domain: { x: d.dom }, subst, change }, lines, choices: HY_CHOICES },
  ];
  return intItem({
    skill: HY, prompt: t('Calcule {start}{p1}.', { start: MT(start), p1: sh ? '' : t(' sur ]{a} ; +∞[', { a: d.a }) }), key: start, points: 3, parts,
    hints: H(t('√(x² {p1} {p2}) : pense à {idNote}. Pose x = {p3} {fn} t.', { p1: sh ? '+' : '−', p2: d.a * d.a, idNote, p3: d.a === 1 ? '' : d.a, fn: d.fn }), MT(lines[0].math, { vars: ['t'] }), MT(lines[1].math, { vars: ['t'] })),
    subgoals: HY_SUB, keys: [...KEYS, 'explog'],
  }, level, rng, opts);
}

function hySquareItem(level, rng, opts, def) {
  const d = hySquare(rng, def);
  const dec = {
    prompt: t('Quelle méthode ?'),
    options: [
      { id: 'lin', label: t('Linéariser : {fn}²x = (cosh 2x {p1} 1)/2', { fn: d.fn, p1: d.fn === 'cosh' ? '+' : '−' }), valid: true, quality: 'good' },
      { id: 'sign', label: `${d.fn}²x = (${d.fn === 'cosh' ? '1 − cosh 2x' : '1 − cosh 2x'})/2`, valid: false, rule: 'a1_hyper_identity_sign', why: t('Ce sont les formules de la trigonométrie ; pour les hyperboliques, cosh 2x = cosh²x + sinh²x = 2cosh²x − 1 = 1 + 2sinh²x.') },
      { id: 'exp', label: t('Écrire avec eˣ et e⁻ˣ'), valid: true, quality: 'poor', why: t('Juste, mais plus long : il faut développer le carré.') },
      { id: 'parts', label: t('Parties avec u = {fn} x', { fn: d.fn }), valid: true, quality: 'poor', why: t('Juste, mais l\'intégrale revient : il faut résoudre une équation.') },
    ],
    l2: ['sign'], taken: t('linéariser : {fn}²x = (cosh 2x {p1} 1)/2', { fn: d.fn, p1: d.fn === 'cosh' ? '+' : '−' }),
  };
  if (def) {
    const start = `int(${d.f},x,0,ln(${d.m}))`;
    const lines = [
      E(`int(${d.lin},x,0,ln(${d.m}))`, t('Linéariser'), 'identity', 'identity'),
      E(`bracket(${d.F},x,0,ln(${d.m}))`, t('Intégrer'), 'int', 'int'),
      E(d.bounds.value.text(), `sinh(2 Log ${d.m}) = (${d.m}² − 1/${d.m}²)/2`, 'int', 'eval'),
    ];
    return intItem({
      skill: HY, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 3,
      parts: [{ start, judge: { kind: 'definite' }, lines, dec, choices: HY_CHOICES }],
      hints: H(t('cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x : linéarise.'), MT(lines[0].math), MT(lines[1].math)),
      subgoals: HY_SUB, keys: [...KEYS, 'explog'], baits: ['a1_hyper_identity_sign'],
    }, level, rng, opts);
  }
  const start = `int(${d.f},x)`;
  const parts = [
    firstPart(d.f, [V], [E(d.lin, 'cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x', 'identity', 'identity')], { judge: { domain: { x: [-2, 2] } }, dec, choices: HY_CHOICES, note: t('Linéarise {fn}²x.', { fn: d.fn }) }),
    { html: t('L’intégrale'), start, judge: { kind: 'antideriv', v: V, domain: { x: [-2, 2] } }, lines: [E(`int(${d.lin},x)`, t('Linéariser'), 'identity', 'identity'), E(`${d.F}+C`, t('Intégrer'), 'int', 'int')], choices: HY_CHOICES },
  ];
  return intItem({
    skill: HY, prompt: t('Calcule {start}.', { start: MT(start) }), key: start, points: 3, parts,
    hints: H(t('cosh 2x = 2cosh²x − 1 = 1 + 2sinh²x : linéarise.'), MT(d.lin), MT(`${d.F}+C`)),
    subgoals: HY_SUB, keys: [...KEYS, 'explog'], baits: ['a1_hyper_identity_sign'],
  }, level, rng, opts);
}

function hyMcq(rng) {
  if (rng.chance(0.5)) {
    const a = rng.int(1, 3);
    const [b, mm] = rng.pick(SH_B);
    const B = b.mul(a);
    const start = `int(1/√(x^2+${a * a}),x,0,${N(B)})`;
    const opts = [
      { html: MT(`ln(${mm})`), correct: true },
      { html: MT(N(B)), correct: false, rule: 'a1_subst_bounds_kept' },
      { html: MT(new Val().ln(1, B.mul(B).add(a * a).div(a * a)).text()), correct: false, rule: 'a1_int_log_of_denominator' },
      // dx kept: ∫ dt/(a·cosh t) = (2/a)·Arctg(eᵗ).
      { html: MT(new Val().arctan(q(2, a), mm).arctan(q(-2, a), 1).text()), correct: false, rule: 'a1_subst_dx_kept' },
    ];
    return mcq({
      skill: HY, level: 4, prompt: `${MT(start)} =`, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: uniq(opts),
      solution: [{ html: t('x = {p1} sinh t, dx = {p1} cosh t dt, √(x² + {p2}) = {p1} cosh t ; t va de 0 à Argsh({b}) = Log {mm}.', { p1: a === 1 ? '' : a, p2: a * a, b: fmt(b), mm }), note: '' }],
    }, rng);
  }
  const m = rng.pick([2, 3]);
  const sh2 = q(m * m).sub(q(1, m * m)).div(2);
  const right = new Val().rat(sh2.div(4)).ln(q(-1, 2), m);
  const opts = [
    { html: MT(right.text()), correct: true },
    { html: MT(right.times(-1).text()), correct: false, rule: 'a1_hyper_identity_sign' },
    { html: MT(new Val().rat(sh2.div(2)).ln(q(-1, 2), m).text()), correct: false, rule: 'a1_int_missing_inner_factor' },
    { html: MT(new Val().rat(sh2.div(4)).ln(q(1, 2), m).text()), correct: false, rule: 'a1_hyper_identity_sign' },
  ];
  return mcq({
    skill: HY, level: 4, prompt: `${MT(`int(sinh(x)^2,x,0,ln(${m}))`)} =`, key: `mcq:sinh2:${m}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: uniq(opts),
    solution: [{ html: t('sinh²x = (cosh 2x − 1)/2, primitive sinh(2x)/4 − x/2 ; sinh(2 Log {m}) = {sh2}.', { m, sh2: fmt(sh2) }), note: '' }],
  }, rng);
}
const fmt = (x) => N(x).replace('-', '−');

const HY_TF = [
  { s: '∫₀^∞ dx/(2 + cosh x) converge.', truth: true, why: 'Vrai : 1/(2 + cosh x) ≤ 2e⁻ˣ, dont l\'intégrale converge.' },
  { s: 'Pour tout t réel : cosh²t + sinh²t = 1.', truth: false, rule: 'a1_hyper_identity_sign', counter: { kind: 'refute', quants: [{ q: '∀', v: 't', dom: 'R' }], pred: 'cosh(t)^2+sinh(t)^2=1', ask: [{ v: 't', label: 't =' }], answer: { t: '1' } }, why: 'Faux : c\'est cosh²t − sinh²t = 1. Avec t = 1, cosh²1 + sinh²1 = cosh 2 ≈ 3,76.' },
  { s: 'Pour tout x réel : Argsh x = Log(x + √(x² + 1)).', truth: true, why: 'Vrai : on résout sinh t = x avec eᵗ > 0.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ dx/√(x² + 1) = Log(b² + 1).', truth: false, rule: 'a1_int_log_of_denominator', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(1/√(x^2+1),x,0,b)=ln(b^2+1)', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } }, why: 'Faux : la primitive est Argsh x = Log(x + √(x² + 1)). Avec b = 1, l\'intégrale vaut Log(1 + √2) ≈ 0,88, et Log 2 ≈ 0,69.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ cosh²x dx = b/2 + sinh(2b)/4.', truth: true, why: 'Vrai : cosh²x = (cosh 2x + 1)/2.' },
];

GEN_[HY] = (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? hyMcq(rng) : opts.exam === 'tf' ? examTf(HY_TF, HY, rng) : hyItem(level, rng, opts));

export const GEN = GEN_;
