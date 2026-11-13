// The distributions of module F, part b (step U10, MT/SV): f-distrib-def
// (⟨T_f, φ⟩ of a function in pieces, g·δ_a = g(a)·δ_a), f-distrib-deriv
// (⟨DT, φ⟩ = −⟨T, φ′⟩, the jumps give δ), f-distrib-eq (y′ + ay = δ,
// y″ + ω²y = δ by the fundamental solution; y″ − ω²y = δ by Fourier, with
// ℱ(δ) = 1/√(2π)). Judge `distrib` (js/judges/distrib.js): every member
// is compared on test functions φ; lines may hold ⟨T, ψ⟩, φ(a), φ′(a) and
// integrals of φ. Guided blanks only in lines without ⟨ ⟩ (the CAS
// tokenizer does not read the brackets).

import { examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { H, ft, dist, term, DML, FML, mcqF, KEYS_D, KEYS_FT, TABLE } from './fourier-b-kit.js';
import { t } from '../../i18n.js';

const DEF = 'f-distrib-def';
const DER = 'f-distrib-deriv';
const DEQ = 'f-distrib-eq';
const keysD = [...KEYS_D];
const c1 = (k, body) => term(k, body) || '0';

// ---------- functions in pieces ----------

// kx on [0 ; 1], m/x on ]1 ; ∞[, 0 for x < 0 (2019): jump m − k at 1.
function famA(rng) {
  const k = rng.pick([1, 2, 3]);
  const m = rng.pick([1, 2, 3].filter((x) => x !== k));
  const kx = term(k, 'x');
  const mx = m === 1 ? '1/x' : `${m}/x`;
  return {
    id: `A:${k}:${m}`, v: 'x',
    html: t('f(x) = 0 si x &lt; 0, {a} si 0 ≤ x ≤ 1, {mx} si x &gt; 1', { a: kx.replace('x', 'x'), mx }),
    fns: { f: `${kx}H(x)H(1-x) + ${m}H(x-1)/x`, "f'": `${k}H(x)H(1-x) - ${m}H(x-1)/x^2` },
    fpHtml: t('f′(x) = {k} sur ]0 ; 1[, −{a}1/x² sur ]1 ; ∞[', { k, a: m === 1 ? '' : m }).replace('−11/x²', '−1/x²').replace(/−(\d)1\/x²/, '−$1/x²'),
    pair: `int(${kx} φ(x), x, 0, 1) + int(${m === 1 ? '' : m}φ(x)/x, x, 1, ∞)`,
    pairBlank: ['0', '1'],
    def: `-int(${kx} φ'(x), x, 0, 1) - int(${m === 1 ? '' : m}φ'(x)/x, x, 1, ∞)`,
    ipp: `-${k === 1 ? '' : k}φ(1) + int(${k === 1 ? '' : k}φ(x), x, 0, 1) + ${m === 1 ? '' : m}φ(1) - int(${m === 1 ? '' : m}φ(x)/x^2, x, 1, ∞)`,
    ippBlank: ['x^2'],
    jumps: [{ a: 1, h: m - k }],
    conclude: `DT_f = T_(f') ${m - k > 0 ? '+' : '-'} ${Math.abs(m - k) === 1 ? '' : Math.abs(m - k)}δ_1`,
    noJump: "T_(f')",
    signLine: `int(${kx} φ'(x), x, 0, 1) + int(${m === 1 ? '' : m}φ'(x)/x, x, 1, ∞)`,
  };
}

// k on [−1 ; 0], e^(−wx) for x > 0, 0 for x < −1: jumps k at −1, 1 − k at 0.
function famB(rng) {
  const k = rng.pick([2, 3]);
  const w = rng.pick([1, 2]);
  const ew = `e^(-${w === 1 ? '' : w}x)`;
  return {
    id: `B:${k}:${w}`, v: 'x',
    html: t('f(x) = {k} si −1 ≤ x ≤ 0, {a} si x &gt; 0, 0 si x &lt; −1', { k, a: FML(ew) }),
    fns: { f: `${k}H(x+1)H(-x) + H(x)${ew}`, "f'": `-${w === 1 ? '' : w}H(x)${ew}` },
    fpHtml: t('f′(x) = 0 sur ]−1 ; 0[, {a} sur ]0 ; ∞[', { a: FML(`-${w === 1 ? '' : w}${ew}`) }),
    pair: `int(${k}φ(x), x, -1, 0) + int(${ew} φ(x), x, 0, ∞)`,
    pairBlank: ['-1', '0'],
    def: `-int(${k}φ'(x), x, -1, 0) - int(${ew} φ'(x), x, 0, ∞)`,
    ipp: `-${k}φ(0) + ${k}φ(-1) + φ(0) - ${w === 1 ? '' : w}int(${ew} φ(x), x, 0, ∞)`,
    ippBlank: [`${k}φ(-1)`],
    jumps: [{ a: -1, h: k }, { a: 0, h: 1 - k }],
    conclude: `DT_f = T_(f') + ${k}δ_(-1) - ${k - 1 === 1 ? '' : k - 1}δ`,
    noJump: "T_(f')",
    signLine: `int(${k}φ'(x), x, -1, 0) + int(${ew} φ'(x), x, 0, ∞)`,
  };
}

// The indicator c on [a ; b]: D = c δ_a − c δ_b.
function famC(rng) {
  const c = rng.pick([1, 2, 3]);
  const a = rng.pick([-1, 0]);
  const b = rng.pick([1, 2]);
  const da = a === 0 ? 'δ' : `δ_(${a})`;
  const db = `δ_${b}`;
  const cc = c === 1 ? '' : c;
  return {
    id: `C:${c}:${a}:${b}`, v: 'x',
    html: t('f(x) = {c} si {a} ≤ x ≤ {b}, 0 sinon', { c, a, b }).replace(/-/g, '−'),
    fns: { f: `${c}H(x-(${a}))H(${b}-x)`, "f'": '0' },
    fpHtml: t('f′ = 0 hors des sauts'),
    pair: `int(${cc}φ(x), x, ${a}, ${b})`,
    pairBlank: [String(b)],
    def: `-int(${cc}φ'(x), x, ${a}, ${b})`,
    ipp: `-${c === 1 ? '' : c}(φ(${b}) - φ(${a}))`,
    ippBlank: [`φ(${a})`],
    jumps: [{ a, h: c }, { a: b, h: -c }],
    conclude: `DT_f = ${cc}${da} - ${cc}${db}`,
    noJump: '0',
    signLine: `int(${cc}φ'(x), x, ${a}, ${b})`,
  };
}

// ---------- f-distrib-def ----------

const DEF_SUB = [
  { id: 'definition', label: '⟨T_f, φ⟩ = ∫ fφ ; ⟨gT, φ⟩ = ⟨T, gφ⟩', skill: DEF },
  { id: 'evaluate', label: '⟨δ_a, φ⟩ = φ(a)', skill: DEF },
];
const G = [
  { g: 'x+1', at: (a) => a + 1 },
  { g: 'x^2+1', at: (a) => a * a + 1 },
  { g: 'x^2-x', at: (a) => a * a - a },
  { g: '2x+3', at: (a) => 2 * a + 3 },
];
const dA = (a) => (a === 0 ? 'δ' : a < 0 ? `δ_(${a})` : `δ_${a}`);

function gDelta(rng) {
  for (;;) {
    const G0 = rng.pick(G);
    const a = rng.pick([1, 2, -1]);
    const ga = G0.at(a);
    const g0 = G0.at(0);
    if (ga !== 0 && ga !== g0) return { ...G0, a, ga, g0 };
  }
}

// ⟨T_f + g δ_a, φ⟩ written out (final: a value).
function defPair(level, rng, opts = {}, F = rng.pick([famA, famB])(rng)) {
  const D = gDelta(rng);
  const T = `T_f + (${D.g})${dA(D.a)}`;
  const start = `⟨${T}, φ⟩`;
  const final = `${F.pair} ${D.ga < 0 ? '-' : '+'} ${Math.abs(D.ga) === 1 ? '' : Math.abs(D.ga)}φ(${D.a})`;
  const judge = dist({ v: 'x', ref: start, fns: F.fns, final: 'value', traps: { f_fdelta: [`${F.pair} + (${D.g0})φ(${D.a})`] } });
  return partsItem({
    skill: DEF, level, prompt: t('Soit {html}. Calcule {a} pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).', { html: F.html, a: DML(start, 'x', F.fns) }),
    parts: [{
      html: '', start, judge,
      decisions: [{
        kind: 'decision', prompt: t('Quelles règles ?'), levels: [2, 3, 4, 5], options: [
          { id: 'def', label: t('Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a)'), valid: true, ref: true },
          { id: 'g0', label: '⟨g δ_a, φ⟩ = g(0)φ(a)', valid: false, rule: 'f_fdelta', why: t('⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a) : on évalue g en a = {a}.', { a: D.a }) },
          { id: 'deriv', label: '⟨DT, φ⟩ = −⟨T, φ′⟩', valid: false, why: t('Il n\'y a pas de dérivée ici.') },
        ],
      }],
      menu: [
        { id: 'lin', label: t('Séparer par linéarité, puis appliquer les définitions'), valid: true },
        { id: 'g0', label: t('Remplacer g δ_a par g(0) δ_a'), valid: false, rule: 'f_fdelta', why: t('On évalue g au point a du δ.') },
        { id: 'deriv', label: t('Dériver φ'), valid: false, why: t('Il n\'y a pas de dérivée ici.') },
      ],
      lines: [
        { math: `⟨T_f, φ⟩ + ⟨(${D.g})${dA(D.a)}, φ⟩`, note: t('Linéarité'), subgoal: 'definition' },
        { math: final, note: t('∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g({a})φ({a})', { a: D.a }).replace(/-/g, '−'), subgoal: 'evaluate', blank: F.pairBlank, blank2: [`${Math.abs(D.ga) === 1 ? '' : Math.abs(D.ga)}φ(${D.a})`.replace(/^φ/, 'φ')] },
      ],
    }],
    hints: H(t('⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a).'), `g(${D.a}) = ${D.ga}`.replace(/-/g, '−'), DML(final, 'x', F.fns)),
    subgoals: DEF_SUB, keys: keysD, key: `${DEF}:pair:${level}:${F.id}:${D.g}:${D.a}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// Prove g δ_a = g(a) δ_a.
function defProof(level, rng, opts = {}) {
  const D = gDelta(rng);
  const gd = `(${D.g})${dA(D.a)}`;
  const gaD = `${D.ga === 1 ? '' : D.ga === -1 ? '-' : D.ga}${dA(D.a)}`;
  const judge = dist({ v: 'x', ref: gd, final: 'dist', traps: { f_fdelta: [`${gd} = ${D.g0 === 1 ? '' : D.g0 === -1 ? '-' : D.g0}${dA(D.a)}`, `${D.g0}φ(${D.a})`] } });
  const sub = D.g.replace(/x/g, `(${D.a})`);
  return partsItem({
    skill: DEF, level, prompt: t('Montre que {a} = {b} : calcule ⟨{a}, φ⟩ pour une fonction test φ, puis conclus.', { a: DML(gd), b: DML(gaD) }),
    parts: [{
      html: '', start: `⟨${gd}, φ⟩`, judge,
      decisions: [{
        kind: 'decision', prompt: t('Quelle règle d\'abord ?'), levels: [2, 3, 4, 5], options: [
          { id: 'prod', label: t('Le produit passe sur la fonction test : ⟨gT, φ⟩ = ⟨T, gφ⟩'), valid: true, ref: true },
          { id: 'g0', label: '⟨g δ_a, φ⟩ = g(0)φ(a)', valid: false, rule: 'f_fdelta', why: t('On évalue g en a, pas en 0.') },
        ],
      }],
      menu: [
        { id: 'prod', label: t('Faire passer g sur φ'), valid: true },
        { id: 'eval', label: t('Évaluer en a'), valid: true },
        { id: 'deriv', label: t('Dériver'), valid: false, why: t('Aucune dérivée ici.') },
      ],
      lines: [
        { math: `⟨${dA(D.a)}, (${D.g})φ⟩`, note: '⟨gT, φ⟩ = ⟨T, gφ⟩', subgoal: 'definition' },
        { math: `(${sub})φ(${D.a})`, note: `⟨δ_a, ψ⟩ = ψ(${D.a})`.replace(/-/g, '−'), subgoal: 'evaluate', blank: [String(D.a)], blank2: [sub] },
        { math: `${gd} = ${gaD}`, note: t('Pour toute φ : égalité des distributions'), subgoal: 'evaluate' },
      ],
    }],
    hints: H(t('Le produit passe sur la fonction test, puis ⟨δ_a, ψ⟩ = ψ(a).'), DML(`⟨${dA(D.a)}, (${D.g})φ⟩ = (${sub})φ(${D.a})`), DML(`${gd} = ${gaD}`)),
    subgoals: DEF_SUB, keys: keysD, key: `${DEF}:proof:${level}:${D.g}:${D.a}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

function defMcq(level, rng, opts) {
  const D = gDelta(rng);
  const gd = `(${D.g})${dA(D.a)}`;
  const k = (c) => (c === 1 ? '' : c === -1 ? '-' : c);
  const right = [DML(`${gd} = ${k(D.ga)}${dA(D.a)}`), DML('x δ = 0'), DML(`⟨${gd}, φ⟩ = ${k(D.ga)}φ(${D.a})`)];
  const wrongs = [
    { html: DML(`${gd} = ${k(D.g0)}${dA(D.a)}`), rule: 'f_fdelta' },
    { html: DML(`⟨${gd}, φ⟩ = ${k(D.g0)}φ(${D.a})`), rule: 'f_fdelta' },
    { html: DML(`${gd} = ${k(D.ga)}δ`), rule: 'f_fdelta' },
    { html: DML('x δ = δ'), rule: 'f_fdelta' },
  ];
  return mcqF({
    skill: DEF, level, exam: examTag(opts), key: `${DEF}:mcq:${D.g}:${D.a}`,
    prompt: opts.exam ? t('Cochez les égalités vraies (au sens des distributions).') : t('Quelle égalité est vraie (au sens des distributions) ?'),
    right: opts.exam ? rng.shuffle(right).slice(0, rng.pick([1, 2, 3])) : [right[0]], wrongs: rng.shuffle(wrongs),
    solution: [{ html: t('⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a), donc g δ_a = g(a) δ_a : ici g({a}) = {ga}.', { a: D.a, ga: D.ga }).replace(/-/g, '−'), note: '' }],
    expectedSec: 90,
  }, rng);
}

// ---------- f-distrib-deriv ----------

const DER_SUB = [
  { id: 'definition', label: '⟨DT, φ⟩ = −⟨T, φ′⟩', skill: DER },
  { id: 'ipp', label: t('intégration par parties'), skill: 'a1-int-parts' },
  { id: 'conclude', label: t('DT_f = T_(f′) + sauts·δ'), skill: DER },
];

// f = H(t)e^(−wt) (2021): Df = −wf + δ.
function famE(rng) {
  const w = rng.pick([1, 2, 3]);
  const wt = w === 1 ? 't' : `${w}t`;
  const ww = w === 1 ? '' : w;
  return {
    id: `E:${w}`, v: 't',
    html: t('f(t) = {a} pour t &gt; 0, 0 sinon', { a: FML(`e^(-${wt})`, 't') }),
    fns: { f: `H(t)e^(-${wt})` },
    start: '⟨Df, φ⟩', ref: 'D f',
    def: `-int(e^(-${wt}) φ'(t), t, 0, ∞)`,
    ipp: `φ(0) - ${ww}int(e^(-${wt}) φ(t), t, 0, ∞)`,
    ippBlank: ['φ(0)'],
    conclude: `Df = -${ww}f + δ`,
    noJump: `Df = -${ww}f`,
    signLine: `int(e^(-${wt}) φ'(t), t, 0, ∞)`,
    jumps: [{ a: 0, h: 1 }],
    fp: t('−{ww}f sur ]0 ; ∞[', { ww }),
  };
}

function derFamily(rng) {
  const F = rng.pick([famE, famA, famB, famC])(rng);
  if (!F.start) Object.assign(F, { start: '⟨DT_f, φ⟩', ref: 'D T_f' });
  return F;
}

export function derLines(level, rng, opts = {}, F = derFamily(rng)) {
  const v = F.v;
  const judge = dist({
    v, ref: F.ref, fns: F.fns, final: 'dist',
    traps: { f_distrib_jump: [{ line: F.noJump, ctx: { h: String(F.jumps[0].h).replace('-', '−'), a: String(F.jumps[0].a).replace('-', '−') } }], f_distrib_sign: [F.signLine] },
  });
  const jumpsT = F.jumps.map((j) => t('{a} en {b}', { a: String(j.h).replace('-', '−'), b: String(j.a).replace('-', '−') })).join(', ');
  return partsItem({
    skill: DER, level,
    prompt: F.v === 't' ? t('Soit {html}. Calcule la dérivée de f au sens des distributions : {a}, puis Df, écrite avec f et δ.', { html: F.html, a: DML(F.start, v, F.fns) }) : t('Soit {html}. Calcule la dérivée de T_f au sens des distributions : {a}, puis DT_f, écrite avec T_(f′) et des δ.', { html: F.html, a: DML(F.start, v, F.fns) }),
    parts: [{
      html: '', start: F.start, judge,
      decisions: [{
        kind: 'decision', prompt: t('Comment faire ?'), levels: [3], options: [
          { id: 'def', label: t('Par la définition ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties'), valid: true, ref: true },
          { id: 'jumps', label: t('Par la formule des sauts : DT_f = T_(f′) + Σ (sauts) δ_a'), valid: true, why: t('Juste aussi : c\'est la même chose, en connaissant la formule.') },
          { id: 'sign', label: '⟨DT, φ⟩ = ⟨T, φ′⟩', valid: false, rule: 'f_distrib_sign', why: t('Il y a un signe moins : ⟨DT, φ⟩ = −⟨T, φ′⟩.') },
        ],
      }],
      menu: [
        { id: 'def', label: t('Appliquer ⟨DT, φ⟩ = −⟨T, φ′⟩'), valid: true },
        { id: 'ipp', label: t('Intégrer par parties'), valid: true },
        { id: 'nojump', label: t('Dériver f morceau par morceau, sans rien ajouter'), valid: false, rule: 'f_distrib_jump', why: t('f saute ({jumpsT}) : chaque saut donne un δ.', { jumpsT }) },
      ],
      lines: [
        { math: F.def, note: '⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′', subgoal: 'definition' },
        { math: F.ipp, note: t('Par parties sur chaque morceau'), subgoal: 'ipp', blank: F.ippBlank, blank2: F.ippBlank },
        { math: F.conclude, note: t('Sauts : {jumpsT}', { jumpsT }), subgoal: 'conclude' },
      ],
    }],
    hints: H(t('⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : {jumpsT}.', { jumpsT }), DML(`${F.start} = ${F.def}`, v, F.fns), DML(F.ipp, v, F.fns)),
    subgoals: DER_SUB, keys: keysD, key: `${DER}:${level}:${F.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

function derMcq(level, rng, opts) {
  const F = famE(rng);
  const ww = F.id.split(':')[1] === '1' ? '' : F.id.split(':')[1];
  const right = [DML(F.conclude, 't', F.fns), DML(`⟨Df, φ⟩ = ${F.ipp}`, 't', F.fns)];
  const wrongs = [
    { html: DML(F.noJump, 't', F.fns), rule: 'f_distrib_jump' },
    { html: DML(`Df = ${ww}f - δ`, 't', F.fns), rule: 'f_distrib_sign' },
    { html: DML(`Df = f + δ`, 't', F.fns), rule: null },
    { html: DML(`⟨Df, φ⟩ = ${F.signLine}`, 't', F.fns), rule: 'f_distrib_sign' },
  ];
  return mcqF({
    skill: DER, level, exam: examTag(opts), key: `${DER}:mcq:${F.id}`,
    prompt: opts.exam ? t('Soit {html}. Cochez les égalités vraies (au sens des distributions).', { html: F.html }) : t('Soit {html}. Quelle égalité est vraie (au sens des distributions) ?', { html: F.html }),
    right: opts.exam ? rng.shuffle(right).slice(0, rng.pick([1, 2])) : [right[0]], wrongs: rng.shuffle(wrongs),
    solution: [{ html: t('{a}, donc {b}.', { a: DML(`⟨Df, φ⟩ = ${F.def} = ${F.ipp}`, 't', F.fns), b: DML(F.conclude, 't', F.fns) }), note: '' }],
    expectedSec: 120,
  }, rng);
}

// ---------- f-distrib-eq ----------

const DEQ_SUB = [
  { id: 'ansatz', label: t('solution fondamentale essayée'), skill: DEQ },
  { id: 'derivative', label: t('dérivée avec le δ du saut'), skill: 'f-distrib-deriv' },
  { id: 'conclude', label: t('toutes les solutions'), skill: DEQ },
  { id: 'transform', label: t('ℱ de l\'équation, ℱ(δ) = 1/√(2π)'), skill: 'f-ft-table' },
];

// y′ + ay = δ_b: y = H(t − b)e^(−a(t − b)).
function eqFirst(rng) {
  const a = rng.pick([1, 2, 3]);
  const b = rng.pick([0, 0, 1, 2]);
  const aa = a === 1 ? '' : a;
  const tb = b === 0 ? 't' : `t-${b}`;
  const at = a === 1 ? `(${tb})` : `${a}(${tb})`;
  const e = b === 0 ? `e^(-${aa}t)` : `e^(-${at})`;
  const H0 = b === 0 ? 'H(t)' : `H(t-${b})`;
  const d = b === 0 ? 'δ' : `δ_${b}`;
  return {
    id: `first:${a}:${b}`, kind: 'first', v: 't', order: 1, op: [a, 1, 0], rhs: d,
    eqText: `y′ + ${aa}y = ${d}`,
    eqHtml: DML(`y' + ${aa}y = ${d}`, 't'),
    ansatz: `y = ${H0}${e}`,
    derivStart: `D(${H0}${e})`,
    deriv: [`${H0}(-${aa}${e}) + ${e}${d}`, `-${aa}${H0}${e} + ${d}`],
    derivBlank: [d],
    general: `y = ${H0}${e} + C e^(-${aa}t)`,
    homog: `C e^(-${aa}t)`,
    traps: {
      f_distrib_jump: [{ line: `-${aa}${H0}${e}`, ctx: { h: '1', a: String(b) } }],
      ...(b ? { f_fdelta: [`-${aa}${H0}${e} + e^(${a * b})${d}`] } : {}),
    },
  };
}

// y″ + ω²y = δ: y = H(x) sin(ωx)/ω.
function eqSecond(rng) {
  const w = rng.pick([1, 2, 3]);
  const wx = w === 1 ? 'x' : `${w}x`;
  const s = w === 1 ? 'sin(x)' : `sin(${wx})/${w}`;
  return {
    id: `second:${w}`, kind: 'second', v: 'x', order: 2, op: [w * w, 0, 1], rhs: 'δ',
    eqText: `y″ + ${w === 1 ? '' : w * w}y = δ`,
    eqHtml: DML(`y'' + ${w === 1 ? '' : w * w}y = δ`),
    ansatz: `y = H(x)${s}`,
    derivStart: `D(D(H(x)${s}))`,
    deriv: [`D(H(x)cos(${wx}))`, `-${w === 1 ? '' : w}H(x)sin(${wx}) + δ`],
    derivBlank: ['δ'],
    general: `y = H(x)${s} + C_1 cos(${wx}) + C_2 sin(${wx})`,
    homog: `C_1 cos(${wx}) + C_2 sin(${wx})`,
    traps: { f_distrib_jump: [{ line: `-${w === 1 ? '' : w}H(x)sin(${wx})`, ctx: { h: '1', a: '0' } }] },
  };
}

// y″ − ω²y = δ by Fourier: ŷ = −1/(√(2π)(α² + ω²)), y = −e^(−ω|x|)/(2ω).
function eqFourier(rng) {
  const w = rng.pick([1, 2, 3]);
  const w2 = w * w;
  const y = `-e^(-${w === 1 ? '' : w}|x|)/${2 * w}`;
  return {
    id: `fourier:${w}`, kind: 'fourier', v: 'x', order: 2,
    eqText: `y″ − ${w2 === 1 ? '' : w2}y = δ`,
    eqHtml: DML(`y'' - ${w2 === 1 ? '' : w2}y = δ`),
    y, w,
    lines: [
      { math: `-α^2 ŷ - ${w2 === 1 ? '' : w2}ŷ = 1/√(2π)`, note: 'ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)', subgoal: 'transform', blank: ['1/√(2π)'] },
      { math: `ŷ = -1/(√(2π)(α^2+${w2}))`, note: t('Isoler ŷ'), subgoal: 'conclude', blank: [String(w2)] },
      { math: `y(x) = ${y}`, note: t('Ligne F7 avec w = {w}', { w }), subgoal: 'conclude', blank: [String(2 * w)], blank2: ['|x|'] },
    ],
    traps: {
      f_ft_delta_const: [`ŷ = -1/(α^2+${w2})`],
      f_ft_deriv_sign: [`ŷ = 1/(√(2π)(α^2-${w2}))`],
      f_abs_dropped: [`y(x) = ${y.replace('|x|', 'x')}`],
    },
  };
}

function fourierPart(d) {
  return {
    html: '', start: d.eqText.replace('″', "''").replace('−', '-'),
    judge: ft({ unknown: 'ŷ', f: d.y.replace('|x|', 'abs(x)'), F: `-1/(sqrt(2π)(α^2+${d.w * d.w}))`, dir: 'inverse', traps: d.traps }),
    menu: [
      { id: 'ft', label: t('Appliquer ℱ : ℱ(y″) = −α²ŷ, ℱ(δ) = 1/√(2π)'), valid: true },
      { id: 'one', label: t('Prendre ℱ(δ) = 1'), valid: false, rule: 'f_ft_delta_const', why: t('Avec la convention 1/√(2π), ℱ(δ) = 1/√(2π).') },
      { id: 'sign', label: t('Prendre ℱ(y″) = α² ŷ'), valid: false, rule: 'f_ft_deriv_sign', why: '(iα)² = −α².' },
    ],
    lines: d.lines,
  };
}

function fundamentalParts(d) {
  const v = d.v;
  const eqCfg = (final) => dist({ v, eq: { op: d.op, rhs: d.rhs, order: d.order }, unknown: 'y', final });
  return [{
    html: '', start: d.eqText.replace('″', "''").replace('′', "'"), judge: eqCfg('particular'),
    decisions: [{
      kind: 'decision', prompt: t('Méthode ?'), levels: [3], options: [
        { id: 'fund', label: t('Essayer la solution fondamentale {a}', { a: d.ansatz.slice(4) }), valid: true, ref: true },
        { id: 'fourier', label: t('Transformée de Fourier'), valid: true, why: t('Possible aussi ; ici, l\'essai est plus court.') },
        { id: 'one', label: t('Chercher une solution classique (C¹) de y′ + ay = δ'), valid: false, why: t('δ n\'est pas une fonction : la solution saute, elle n\'est pas C¹.') },
      ],
    }],
    menu: [{ id: 'try', label: t('Essayer H·(solution homogène)'), valid: true }, { id: 'class', label: t('Résoudre comme une EDO classique'), valid: false, why: t('Le second membre est δ : la solution a un saut.') }],
    lines: [{ math: d.ansatz, note: t('Essai'), subgoal: 'ansatz', blank: [d.ansatz.includes('H(t') ? d.ansatz.match(/H\([^)]*\)/)[0] : 'H(x)'] }],
  }, {
    html: t('Vérification : la dérivée au sens des distributions.'), ask: t('Dérive.'), start: d.derivStart,
    judge: dist({ v, ref: d.derivStart, final: 'dist', traps: d.traps }),
    menu: [
      { id: 'prod', label: t('Règle du produit, avec D H = δ'), valid: true },
      { id: 'nojump', label: t('Dériver sans tenir compte du saut'), valid: false, rule: 'f_distrib_jump', why: t('H saute de 1 : D H = δ.') },
    ],
    lines: d.deriv.map((math, i) => ({ math, note: i === d.deriv.length - 1 ? 'g·δ_a = g(a)·δ_a' : 'D(H g) = H g′ + g δ', subgoal: 'derivative', blank: i === d.deriv.length - 1 && !math.includes('D(') ? d.derivBlank : [] })),
  }, {
    html: t('Toutes les solutions :'), ask: t('Ajoute les solutions de l\'équation homogène.'), start: d.ansatz, judge: eqCfg('general'),
    menu: [{ id: 'hom', label: t('Ajouter la solution générale de l\'équation homogène'), valid: true }, { id: 'c', label: t('Ajouter une constante C'), valid: false, why: t('Une constante n\'est pas solution de l\'équation homogène.') }],
    lines: [{ math: d.general, note: t('Particulière + homogène'), subgoal: 'conclude', blank: [d.homog.split(' ')[1] || d.homog] }],
  }];
}

export function eqLinesD(level, rng, opts = {}, d = null) {
  const data = d || rng.pick([eqFirst, eqFirst, eqSecond, eqFourier])(rng);
  const fourier = data.kind === 'fourier';
  return partsItem({
    skill: DEQ, level,
    prompt: fourier
      ? t('Trouve la solution tempérée de {eqHtml} par la transformée de Fourier (ℱ(δ) = 1/√(2π)).{a}', { eqHtml: data.eqHtml, a: TABLE() })
      : t('Résous {eqHtml} au sens des distributions : une solution, la vérification, puis toutes les solutions.', { eqHtml: data.eqHtml }),
    parts: fourier ? [fourierPart(data)] : fundamentalParts(data),
    hints: fourier
      ? H(t('Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7.'), FML(data.lines[0].math), FML(data.lines[1].math))
      : H(t('Essaie {a} : H coupe la solution homogène en 0.', { a: data.ansatz.slice(4) }), DML(`${data.derivStart} = ${data.deriv[0]}`, data.v), DML(data.deriv[data.deriv.length - 1], data.v)),
    subgoals: DEQ_SUB, keys: fourier ? KEYS_FT : keysD, key: `${DEQ}:${level}:${data.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// y″ − 4y = δ + 1 (2016): y = −e^(−2|x|)/4 − 1/4.
function eqProblem2016(level, rng, opts = {}) {
  const w = rng.pick([1, 2]);
  const w2 = w * w;
  const y1 = `-e^(-${w === 1 ? '' : w}|x|)/${2 * w}`;
  const y2 = `-1/${w2}`.replace('/1', '');
  const op = [-w2, 0, 1];
  const e = (rhs, final) => dist({ v: 'x', eq: { op, rhs, order: 2 }, unknown: 'y', final });
  const it = partsItem({
    skill: DEQ, level: 5,
    prompt: '',
    parts: [{
      html: '', start: `y'' - ${w2 === 1 ? '' : w2}y = δ`, judge: e('δ', 'particular'),
      lines: [{ math: `y_1 = ${y1}`, note: t('Solution tempérée pour δ (Fourier, ligne F7)'), subgoal: 'transform' }],
    }, {
      html: t('Pour le second membre 1 :'), ask: t('Une solution constante.'), start: `y'' - ${w2 === 1 ? '' : w2}y = 1`, judge: e('1', 'particular'),
      lines: [{ math: `y_2 = ${y2}`, note: t('Constante'), subgoal: 'ansatz' }],
    }, {
      html: t('Superposition :'), ask: t('Une solution de l\'équation.'), start: `y'' - ${w2 === 1 ? '' : w2}y = δ + 1`, judge: e('δ + 1', 'particular'),
      lines: [{ math: `y = ${y1} ${y2}`, note: 'y₁ + y₂', subgoal: 'conclude' }],
    }],
    hints: [], noHints: true, subgoals: DEQ_SUB, keys: keysD, key: `${DEQ}:2016:${w}`,
  });
  return problemItem({
    skill: DEQ, level,
    prompt: t('Trouve une solution tempérée de {a} (ℱ(δ) = 1/√(2π)).{b}', { a: DML(`y'' - ${w2 === 1 ? '' : w2}y = δ + 1`), b: TABLE() }),
    parts: [{ item: it, points: [2, 1, 1] }],
    key: `2016:${w}:${level}`, exam: opts.exam ? { format: 'open', points: 4 } : false,
  });
}

function eqProblem(level, rng, opts) {
  if (rng.chance(0.35)) return eqProblem2016(level, rng, opts);
  const it = eqLinesD(5, rng, {});
  const n = it.script.filter((l) => l.kind === 'segment').length + 1;
  return problemItem({
    skill: DEQ, level, prompt: it.prompt, parts: [{ item: { ...it, prompt: '' }, points: n === 1 ? [3] : [1, 1, 1] }],
    key: `${it.key}:${level}`, exam: opts.exam ? { format: 'open', points: 3 } : false,
  });
}

// ---------- problems of def and deriv ----------

function defProblem(level, rng, opts) {
  const F = rng.pick([famA, famB])(rng);
  const a = defPair(5, rng, {}, F);
  const b = level === 5 ? derLines(5, rng, {}, { ...F, start: '⟨DT_f, φ⟩', ref: 'D T_f' }) : defProof(5, rng);
  return problemItem({
    skill: DEF, level, prompt: t('Soit {html}.', { html: F.html }),
    parts: [{ item: a, points: 2, title: '⟨T_f + g δ_a, φ⟩' }, { item: b, points: level === 5 ? 2 : 1, title: level === 5 ? t('Dérivée DT_f') : 'g δ_a = g(a) δ_a' }],
    key: `${F.id}:${level}`, exam: opts.exam ? { format: 'open', points: 3 } : false,
  });
}

function derProblem(level, rng, opts) {
  const it = derLines(5, rng, {}, level === 5 ? { ...famA(rng), start: '⟨DT_f, φ⟩', ref: 'D T_f' } : derFamily(rng));
  return problemItem({
    skill: DER, level, prompt: it.prompt, parts: [{ item: { ...it, prompt: '' }, points: 3 }],
    key: `${it.key}:${level}`, exam: opts.exam ? { format: 'open', points: 3 } : false,
  });
}

export const GEN = {
  [DEF]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return defMcq(4, rng, opts);
    if (opts.exam === 'open') return defProblem(4, rng, opts);
    if (level === 5) return defProblem(5, rng, opts);
    if (level === 4 && rng.chance(0.5)) return defProof(4, rng, opts);
    return rng.chance(0.65) ? defPair(level, rng, opts) : defProof(level, rng, opts);
  },
  [DER]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return derMcq(4, rng, opts);
    if (opts.exam === 'open') return derProblem(4, rng, opts);
    if (level === 5) return derProblem(5, rng, opts);
    return derLines(level, rng, opts);
  },
  [DEQ]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return eqProblem(4, rng, opts);
    if (level === 5) return eqProblem(5, rng, opts);
    return eqLinesD(level, rng, opts);
  },
};
