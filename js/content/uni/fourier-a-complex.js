// f-coef-complex (module F, part a, step U10): complex coefficients cₖ of a
// sum of exponentials, and the passage aₖ, bₖ ↔ cₖ (aₖ = cₖ + c₋ₖ,
// bₖ = i(cₖ − c₋ₖ), cₖ = (aₖ − ibₖ)/2, a₀ = 2c₀). Catalogue
// docs/universite/VCF-analyse-3-4.md.
//
// A real trigonometric polynomial: c₀ and two frequencies k ∈ {1, …, 7},
// each with (aₖ, bₖ) whole or halves, at least one nonzero. Given in the
// real form (direction « vers les cₖ ») or with exponentials and complex
// coefficients (direction « vers les aₖ, bₖ »). Each asked value is a part
// of the judge `fcomplex` (js/judges/fourier-a-judges.js) with `expect`.

import { MT, H, q, fr, build, CKEYS, mcqMulti } from './fourier-a-kit.js';
import { examTag } from './kit.js';

const SK = 'f-coef-complex';
const SUB = [
  { id: 'read', label: 'lire les cₖ', skill: SK },
  { id: 'convert', label: 'aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ)', skill: SK },
  { id: 'list', label: 'coefficients non nuls', skill: SK },
];
const CHOICES = [
  { id: 'toR', label: 'aₖ = cₖ + c₋ₖ et bₖ = i(cₖ − c₋ₖ)' },
  { id: 'toC', label: 'cₖ = (aₖ − ibₖ)/2 et c₋ₖ = (aₖ + ibₖ)/2' },
  { id: 'simp', label: 'Calculer (i² = −1)' },
  { id: 'noi', label: 'bₖ = cₖ − c₋ₖ', rule: 'f_coef_complex_convert', why: 'cₖ = (aₖ − ibₖ)/2 et c₋ₖ = (aₖ + ibₖ)/2 : cₖ − c₋ₖ = −ibₖ, donc bₖ = i(cₖ − c₋ₖ).' },
];
const SUBS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇'];

// a + bi as text for the CAS: '1-2i', '-3i/2', '3/2', 'i'.
export function cT(re, im) {
  const R = q(re);
  const I = q(im);
  if (I.n === 0) return String(R);
  const a = Math.abs(I.n);
  const imT = `${a === 1 ? '' : a}i${I.d === 1 ? '' : `/${I.d}`}`;
  if (R.n === 0) return `${I.n < 0 ? '-' : ''}${imT}`;
  return `${R}${I.n < 0 ? '-' : '+'}${imT}`;
}
const par = (t) => (/^[0-9]+(\/[0-9]+)?$/.test(t) ? t : `(${t})`);
// A coefficient before e^(…): '' for 1, '-' for −1, '3', '-2', '(1/2)', '(1-2i)'.
const coefE = (t) => (t === '1' ? '' : t === '-1' ? '-' : /^-?[0-9]+$/.test(t) ? t : `(${t})`);

const VALS = [1, 2, 3, -1, -2, q(3, 2), q(1, 2)];
function data(rng) {
  for (let i = 0; i < 200; i++) {
    const k1 = rng.int(1, 4);
    const k2 = rng.int(k1 + 1, 7);
    const terms = [k1, k2].map((k) => {
      const kind = rng.pick(['cos', 'sin', 'both']);
      const a = kind === 'sin' ? q(0) : q(rng.pick(VALS));
      const b = kind === 'cos' ? q(0) : q(rng.pick(VALS));
      return { k, a, b };
    });
    const c0 = q(rng.pick([0, 1, 2, 5, -1]));
    if (terms.every((t) => t.a.n === 0 && t.b.n === 0)) continue;
    return { k1, k2, terms, c0 };
  }
  return { k1: 1, k2: 3, terms: [{ k: 1, a: q(1), b: q(0) }, { k: 3, a: q(0), b: q(3) }], c0: q(0), fallback: true };
}
// cₖ = (aₖ − ibₖ)/2.
const ck = (t) => ({ re: t.a.div(2), im: t.b.neg().div(2) });

// The real form: c₀·… as a₀/2 = c₀: '5 + 2cos(3x) + 4sin(3x)'.
function realText(d) {
  const parts = [];
  if (d.c0.n) parts.push(String(d.c0));
  for (const t of d.terms) {
    const kx = `${t.k === 1 ? '' : t.k}x`;
    for (const [c, fn] of [[t.a, 'cos'], [t.b, 'sin']]) {
      if (c.n === 0) continue;
      const cs = c.eq(1) ? '' : c.eq(-1) ? '-' : c.d === 1 ? String(c) : `(${c})`;
      parts.push(`${cs}${fn}(${kx})`);
    }
  }
  return parts.join('+').replace(/\+-/g, '-');
}
// The exponential form: c₀ + Σ cₖe^(ikx) + c₋ₖe^(−ikx).
function expText(d) {
  const parts = [];
  if (d.c0.n) parts.push(String(d.c0));
  for (const t of d.terms) {
    const { re, im } = ck(t);
    const kx = `${t.k === 1 ? '' : t.k}x`;
    const p = cT(re, im);
    const m = cT(re, im.neg());
    if (p === '0') continue;
    const ik = `${t.k === 1 ? '' : t.k}i x`;
    parts.push(`${coefE(p)}e^(${ik})+${coefE(m)}e^(-${ik})`);
  }
  return parts.join('+').replace(/\+-/g, '-').replace(/\+\(-/g, '+(-');
}
const show = (t) => MT(t, { complex: true });

// The parts of one frequency: toR (aₖ, bₖ from cₖ) or toC (cₖ, c₋ₖ from aₖ, bₖ).
function partsOf(t, dir, level) {
  const { re, im } = ck(t);
  const cp = cT(re, im);
  const cm = cT(re, im.neg());
  const s = SUBS[t.k];
  const J = (expect, traps = {}) => ({ kind: 'fcomplex', expect, form: 'algebraic', complex: true, traps });
  if (dir === 'toR') {
    const aT = String(t.a);
    const bT = String(t.b);
    return [
      {
        html: `a${s} = c${s} + c₋${s} :`, ask: `a${s} =`, start: `a_${t.k}`,
        judge: J(aT, { f_coef_complex_convert: [cT(t.b, 0)] }),
        lines: [
          { math: `${par(cp)}+${par(cm)}`, note: `c${s} + c₋${s}`, subgoal: 'convert', act: 'toR', blank: [par(cm)] },
          { math: aT, note: '', subgoal: 'convert', act: 'simp', blank2: [aT] },
        ],
      },
      {
        html: `b${s} = i(c${s} − c₋${s}) :`, ask: `b${s} =`, start: `b_${t.k}`,
        judge: J(bT, { f_coef_complex_convert: [cT(0, t.b.neg()), aT] }),
        lines: [
          { math: `i(${par(cp)}-${par(cm)})`, note: `i(c${s} − c₋${s})`, subgoal: 'convert', act: 'toR', blank: [par(cm)] },
          { math: bT, note: 'i² = −1', subgoal: 'convert', act: 'simp', blank2: [bT] },
        ],
      },
    ];
  }
  // (a − ib)/2 written out: '(2-4i)/2', '-3i/2', '(1+i)/2'.
  const absB = t.b.n < 0 ? t.b.neg() : t.b;
  const bi = absB.eq(1) ? 'i' : absB.d === 1 ? `${absB}i` : `(${absB})i`;
  const minusIb = t.b.n === 0 ? '' : `${t.b.n > 0 ? '-' : '+'}${bi}`;
  const formula = t.a.n === 0 ? `${t.b.n > 0 ? '-' : ''}${bi}/2` : t.b.n === 0 ? `${t.a.d === 1 ? t.a : `(${t.a})`}/2` : `(${t.a}${minusIb})/2`;
  return [
    {
      html: `c${s} = (a${s} − ib${s})/2 :`, ask: `c${s} =`, start: `c_${t.k}`,
      judge: J(cp, { f_coef_complex_convert: [cT(t.a.div(2), t.b.div(2)), cT(t.a, t.b.neg())] }),
      lines: [
        ...(t.a.n === 0 || t.b.n === 0 ? [] : [{ math: formula, note: `(a${s} − ib${s})/2`, subgoal: 'read', act: 'toC', blank: t.b.n ? [bi] : [] }]),
        { math: cp, note: '', subgoal: 'read', act: 'simp', blank2: [cp] },
      ],
    },
    {
      html: `c₋${s} = (a${s} + ib${s})/2 = conj(c${s}) :`, ask: `c₋${s} =`, start: `c_(-${t.k})`,
      judge: J(cm, { f_coef_complex_convert: [cp] }),
      lines: [{ math: cm, note: 'Le conjugué : f est réelle', subgoal: 'read', act: 'simp', blank: [cm] }],
    },
  ];
}

function linesVariant(level, rng, opts) {
  const d = data(rng);
  const both = level === 5;
  const dir = level === 4 || rng.chance(0.5) ? 'toR' : 'toC';
  let parts = [];
  if (both) {
    parts.push(...partsOf(d.terms[0], 'toC', level));
    parts.push(...partsOf(d.terms[1], 'toR', level));
  } else {
    for (const t of d.terms) {
      if (t.a.n === 0 && t.b.n === 0) continue;
      parts.push(...partsOf(t, dir, level));
      if (parts.length >= 2 && level <= 2) break;
    }
  }
  // a₀ = 2c₀ in the direction « vers les réels ».
  if ((dir === 'toR' || both) && d.c0.n) {
    parts.push({
      html: 'Le terme constant : a₀/2 = c₀ :', ask: 'a₀ =', start: 'a_0',
      judge: { kind: 'fcomplex', expect: String(d.c0.mul(2)), form: 'algebraic', complex: true, traps: { f_a0_separate: [{ line: String(d.c0), ctx: { kind: 'c0' } }] } },
      lines: [{ math: String(d.c0.mul(2)), note: 'a₀ = 2c₀', subgoal: 'convert', act: 'toR', blank: [String(d.c0.mul(2))] }],
    });
  }
  const formula = dir === 'toR' && !both ? 'aₖ = cₖ + c₋ₖ et bₖ = i(cₖ − c₋ₖ)' : 'cₖ = (aₖ − ibₖ)/2, c₋ₖ = (aₖ + ibₖ)/2';
  const decision = {
    kind: 'decision', prompt: 'Dans quel sens convertir ?', levels: [2, 3, 4], options: [
      { id: 'toR', label: 'Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ)', valid: dir === 'toR', why: 'f est donnée en cosinus et sinus : on cherche les cₖ.' },
      { id: 'toC', label: 'Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2', valid: dir === 'toC', why: 'f est donnée avec des exponentielles : on lit les cₖ, et on cherche les aₖ, bₖ.' },
      { id: 'noi', label: 'bₖ = cₖ − c₋ₖ', valid: false, rule: 'f_coef_complex_convert', why: 'cₖ − c₋ₖ = −ibₖ : il faut multiplier par i, bₖ = i(cₖ − c₋ₖ).' },
    ],
  };
  if (!both) parts[0].pre = [level === 1 ? { kind: 'note', html: `Formules : ${formula}.` } : decision];
  const given = both
    ? `f(x) = ${show(realText({ ...d, terms: [d.terms[0]], c0: q(0) }))} + ${show(expText({ ...d, terms: [d.terms[1]] }))}`
    : dir === 'toR' ? `f(x) = ${show(expText(d))}` : `f(x) = ${show(realText(d))}`;
  const ask = both ? `Donne c${SUBS[d.terms[0].k]}, c₋${SUBS[d.terms[0].k]}, puis a${SUBS[d.terms[1].k]}, b${SUBS[d.terms[1].k]}${d.c0.n ? ' et a₀' : ''}.`
    : dir === 'toR' ? 'Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).' : 'Donne ses coefficients complexes cₖ (sans intégrer).';
  return build({
    skill: SK, level, parts, subgoals: SUB, keys: CKEYS, choices: CHOICES,
    prompt: `${given}. ${ask}`,
    hints: H('cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ).',
      `${parts[0].ask} ${show(parts[0].lines[0].math)}`,
      `${parts[0].ask} ${show(parts[0].lines[parts[0].lines.length - 1].math)}`),
    key: `${SK}:${level}:${dir}:${d.c0}:${d.terms.map((t) => `${t.k}:${t.a}:${t.b}`).join(':')}`, exam: examTag(opts, 1), fallback: d.fallback,
  });
}

// Exam: several statements on the coefficients (« plusieurs réponses »).
function mcqVariant(rng, opts) {
  let d = data(rng);
  for (let i = 0; i < 200 && !d.terms.every((t) => t.b.n !== 0); i++) d = data(rng);
  if (!d.terms.every((t) => t.b.n !== 0)) d = { k1: 1, k2: 3, terms: [{ k: 1, a: q(1), b: q(2) }, { k: 3, a: q(0), b: q(3) }], c0: q(2), fallback: true };
  const [t1, t2] = d.terms;
  const c1 = ck(t1);
  const c2 = ck(t2);
  const s1 = SUBS[t1.k];
  const s2 = SUBS[t2.k];
  const real = rng.chance(0.5);
  const st = (txt) => show(txt);
  const options = [
    { html: `c${s1} = ${st(cT(c1.re, c1.im))}`, correct: true },
    { html: `c₋${s1} = ${st(cT(c1.re, c1.im))}`, correct: c1.im.n === 0, rule: c1.im.n === 0 ? null : 'f_coef_complex_convert' },
    { html: `c${s2} = ${st(cT(t2.a.div(2), t2.b.div(2)))}`, correct: t2.b.n === 0, rule: t2.b.n === 0 ? null : 'f_coef_complex_convert' },
    { html: `c₀ = ${st(String(d.c0))}`, correct: true },
    { html: `c${SUBS[t2.k + 1] || '₈'} = 0`, correct: t2.k + 1 !== t1.k },
  ];
  if (!real) {
    options.push({ html: `a₀ = ${st(String(d.c0))}`, correct: d.c0.n === 0, rule: d.c0.n === 0 ? null : 'f_a0_separate' });
  }
  return mcqMulti({
    skill: SK, level: 4, key: `${SK}:mcq:${d.c0}:${d.terms.map((t) => `${t.k}:${t.a}:${t.b}`).join(':')}`, exam: examTag(opts, 1), options,
    prompt: `${real ? `f(x) = ${show(realText(d))}` : `f(x) = ${show(expText(d))}`}, 2π-périodique. Quelles affirmations sur ses coefficients sont vraies ?`,
    solution: [{ html: `cₖ = (aₖ − ibₖ)/2 et c₋ₖ = conj(cₖ) : c${s1} = ${st(cT(c1.re, c1.im))}, c${s2} = ${st(cT(c2.re, c2.im))}, c₀ = ${st(String(d.c0))} (a₀ = 2c₀).`, note: '' }],
    expectedSec: 150, fallback: d.fallback,
  }, rng);
}

export const GEN_COMPLEX = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(rng, opts);
    return linesVariant(level, rng, opts);
  },
};
void fr;
