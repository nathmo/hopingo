// a2-ode-structure (module A2, part h, step U6): y = y_h + y_p and the
// superposition principle. L(y) = b₁ + b₂ with L(y) = y′ + ky or
// y″ + py′ + qy (no resonance), b₁, b₂ ∈ {constant, e^(mx), αx}. Parts
// (`ode`): y_h (final 'homog'), y_p for b₁ and for b₂ (each with its own
// equation, final 'particular'), then the general solution. True/false
// statements whose counter-examples are checked by js/judges/a2-examples-h.js.

import { MT, linesItem, examTag } from './kit.js';
import { partsScript, tpl } from './a2-kit.js';
import { q, qt, term, sumT, fac, expT, rd, H, E, modeOf, tfOf, tfProblem, pickK } from './analyse2-h-kit.js';
import { rootsData } from './analyse2-h-const2.js';

const SK = 'a2-ode-structure';
const SUB = [
  { id: 'homog', label: 'solution homogène', skill: 'a2-ode-const2' },
  { id: 'particular', label: 'solution particulière', skill: 'a2-ode-particular' },
  { id: 'superpose', label: 'superposition', skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// L as text and L(e^(mx)) = P(m)·e^(mx): {left, P(m), homText, yh, order, p, qq}.
function operator(rng) {
  if (rng.chance(0.4)) {
    const k = rng.pick([1, 2, 3, -1, -2]);
    return { order: 1, left: `y'${term(k, 'y').startsWith('-') ? '' : '+'}${term(k, 'y')}`, P: (m) => m + k, p: 0, qq: k, k, yh: `C ${expT(-k)}`, homDesc: `r = ${-k}` };
  }
  for (;;) {
    const d = rootsData(rng, ['real', 'complex']);
    if (d.a !== 1 || d.c === 0) continue;
    return { order: 2, left: sumT(["y''", term(d.b, "y'"), term(d.c, 'y')]), P: (m) => m * m + d.b * m + d.c, p: d.b, qq: d.c, yh: d.gen, homDesc: d.rootsLine, d };
  }
}

// A piece of the right side and its y_p, built from the y_p: {b, yp, form}.
function piece(rng, L, kind) {
  const A = rng.pick([1, 2, 3, -1, -2, 3]);
  if (kind === 'const') return { kind, yp: String(A), b: String(A * L.qq), desc: 'une constante A' };
  if (kind === 'exp') {
    for (let i = 0; ; i++) {
      const m = rng.pick([1, 2, -1, 3, -2]);
      const P = L.P(m);
      if (P === 0) continue;
      const c = rng.pick([1, 2, 3, -1]);
      // y_p = (c/P)·e^(mx) for b = c·e^(mx), with a small denominator.
      if (Math.abs(P) > 6 && c % P !== 0 && i < 50) continue;
      return { kind, yp: term(q(c, P), expT(m)), b: term(c, expT(m)), desc: `A·${rd(expT(m))}`, A: qt(q(c, P)), m };
    }
  }
  // αx + β: y_p = Ax + B with L(Ax + B) = qq·A·x + (p·A + qq·B) (order 1: A + k(Ax + B)).
  const B = rng.pick([0, 1, -1, 2]);
  const a1 = L.qq * A;
  const a0 = (L.order === 1 ? A : L.p * A) + L.qq * B;
  return { kind, yp: sumT([term(A, 'x'), B ? String(B) : '']), b: sumT([term(a1, 'x'), a0 ? String(a0) : '']), desc: 'Ax + B' };
}

function data(rng) {
  const L = operator(rng);
  const [k1, k2] = rng.pick([['const', 'exp'], ['exp', 'const'], ['lin', 'exp'], ['const', 'exp'], ['exp', 'lin']]);
  const b1 = piece(rng, L, k1);
  let b2 = piece(rng, L, k2);
  for (let i = 0; i < 20 && b2.b === b1.b; i++) b2 = piece(rng, L, k2);
  const eqOf = (rhs) => `${L.left}=${rhs}`;
  return { L, b1, b2, eq: eqOf(sumT([b1.b, b2.b])), eq1: eqOf(b1.b), eq2: eqOf(b2.b), homog: eqOf('0'), gen: sumT([L.yh, b1.yp, b2.yp]) };
}

const CHOICES = [
  { id: 'homog', label: 'Résoudre l\'équation homogène' },
  { id: 'p1', label: 'Solution particulière pour le 1er morceau du second membre' },
  { id: 'p2', label: 'Solution particulière pour le 2e morceau' },
  { id: 'sum', label: 'Additionner : y = y_h + y_p1 + y_p2' },
  { id: 'twice', label: 'Additionner y_h et deux fois la même y_p', rule: 'a2_ode_superposition_nonhom', why: 'L(2y_p) = 2b : chaque morceau du second membre compte une seule fois.' },
];

function linesVariant(level, rng, opts) {
  const d = data(rng);
  const { L, b1, b2 } = d;
  const ode = (eq, final, traps) => ({ kind: 'ode', eq, unknown: 'y', v: 'x', order: L.order, homog: d.homog, domain: { x: [-1, 1] }, ...(final ? { final } : {}), ...(traps ? { traps } : {}) });
  // One constant instead of two (order 2): C₂ written C₁.
  const one = (label, text) => (L.order === 2 ? { a2_ode_constant_count: [`${label} = ${text.replace(/C_2/g, 'C_1')}`] } : null);
  const parts = [];
  if (level >= 2) parts.push({ start: d.homog, judge: ode(d.eq, 'homog', one('y_h', L.yh)), lines: [E(`y_h = ${L.yh}`, L.order === 1 ? 'Équation homogène' : `Racines : ${rd(L.homDesc.replace(/ ou /, ', '))}`, 'homog', 'homog')] });
  const pl = (b, i) => {
    const line = E(`y_p = ${b.yp}`, `On essaie ${b.desc}`, 'particular', i === 1 ? 'p1' : 'p2');
    return level === 1 ? { ...line, ...tpl(line.math, [b.kind === 'exp' ? b.A : b.yp]) } : line;
  };
  parts.push({ html: `Une solution particulière pour le second membre ${MT(b1.b)} :`, ask: 'y_p =', start: d.eq1, judge: ode(d.eq1, 'particular'), lines: [pl(b1, 1)] });
  parts.push({ html: `Une solution particulière pour ${MT(b2.b)} :`, ask: 'y_p =', start: d.eq2, judge: ode(d.eq2, 'particular'), lines: [pl(b2, 2)] });
  const combo = {
    kind: 'decision', prompt: `y = y_h + 2·y_p1 + y_p2 est-elle une solution de ${MT(d.eq)} ?`, options: [
      { id: 'no', label: 'Non : L(2y_p1) = 2b₁', valid: true },
      { id: 'yes', label: 'Oui : on peut multiplier une solution par une constante', valid: false, rule: 'a2_ode_superposition_nonhom', why: 'Seules les solutions de l\'équation homogène se multiplient par une constante : L(2y_p1) = 2b₁ ≠ b₁.' },
    ],
  };
  parts.push({ html: 'Superposition : la solution générale.', ask: 'y =', start: d.eq, judge: ode(d.eq, null, one('y', d.gen)), pre: level === 3 ? [combo] : [], lines: [E(`y = ${d.gen}`, 'y = y_h + y_p1 + y_p2', 'superpose', 'sum')] });
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Solution générale de ${MT(d.eq)} : une solution particulière par morceau du second membre, puis superposition.${level === 1 ? ` La solution homogène est ${MT(`y_h = ${L.yh}`)}.` : ''}`,
    hints: H('Une solution particulière par morceau du second membre, puis on additionne avec y_h.',
      `Pour ${MT(b2.b)}, essaie y_p = ${b2.desc} et remplace dans ${MT(d.eq2)}.`,
      `${MT(`y = ${d.gen}`)}`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}`, exam: examTag(opts),
  });
}

// ---------- true/false ----------

function statements(rng) {
  const k = rng.pick([1, 2, 3]);
  const b = k * rng.pick([1, 2]);
  const e = b / k;
  const kx = term(-k, 'x');
  return [
    {
      key: `combo${k}${b}`, truth: false, text: `Si y₀ résout y′ + ${fac(k)}y = 0 et y₁ résout y′ + ${fac(k)}y = ${b}, alors y₀ + C·y₁ résout y′ + ${fac(k)}y = ${b} pour tout réel C.`, ruleIfTrue: 'a2_ode_superposition_nonhom',
      why: `Faux : L(y₀ + Cy₁) = 0 + C·${b}, égal à ${b} seulement pour C = 1. Par exemple y₀ = e^(${kx}), y₁ = ${e}, C = 2.`,
      counter: { kind: 'a2', prop: 'odeComboFails', params: { eq: `y'+${fac(k)}y=${b}`, homog: `y'+${fac(k)}y=0` }, ask: [{ v: 'y0', label: 'y₀(x) =', keys: KEYS }, { v: 'y1', label: 'y₁(x) =', keys: KEYS }, { v: 'C', label: 'C =', keys: ['calc'] }], answer: { y0: `e^(${kx})`, y1: String(e), C: '2' } },
    },
    { key: 'yhyp', truth: true, text: 'Si y_p résout L(y) = b, alors y_h + y_p résout L(y) = b pour toute solution y_h de L(y) = 0.', why: 'Vrai : L est linéaire, L(y_h + y_p) = 0 + b = b.' },
    { key: 'diff', truth: true, text: 'La différence de deux solutions de L(y) = b est une solution de L(y) = 0.', why: 'Vrai : L(y₁ − y₂) = b − b = 0.' },
    {
      key: `sum${k}`, truth: false, text: `Si y₁ et y₂ résolvent y″ + ${k * k === 1 ? '' : k * k}y = 1, alors y₁ + y₂ aussi.`, ruleIfTrue: 'a2_ode_superposition_nonhom',
      why: `Faux : L(y₁ + y₂) = 1 + 1 = 2. Par exemple y₁ = y₂ = 1/${k * k}.`,
      counter: { kind: 'a2', prop: 'odeSumFails', params: { eq: `y''+${k * k === 1 ? '' : k * k}y=1` }, ask: [{ v: 'y1', label: 'y₁(x) =', keys: KEYS }, { v: 'y2', label: 'y₂(x) =', keys: KEYS }], answer: { y1: `1/${k * k}`, y2: `1/${k * k}+cos(${k === 1 ? '' : k}x)` } },
    },
    { key: 'dim', truth: true, text: 'Si p et q sont continues sur I, les solutions de y″ + p(x)y′ + q(x)y = 0 sur I forment un espace vectoriel de dimension 2.', why: 'Vrai : une solution est fixée par (y(x₀), y′(x₀)) ∈ ℝ², et cette correspondance est linéaire et bijective.' },
    {
      key: 'count', truth: false, text: 'y = C·e^(2x) est la solution générale de y″ − 3y′ + 2y = 0.', ruleIfTrue: 'a2_ode_constant_count',
      why: 'Faux : l\'équation est d\'ordre 2, il faut deux constantes : y = C₁eˣ + C₂e^(2x). Par exemple eˣ n\'est pas de la forme Ce^(2x).',
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: "y''-3y'+2y=0", family: 'C e^(2x)', domain: { x: [-1, 1] } }, ask: [{ v: 'y', label: 'Une solution qui n\'est pas de cette forme : y(x) =', keys: KEYS }], answer: { y: 'e^x' } },
    },
  ];
}

const tfHints = H('Écris L(y₁ + y₂) ou L(y₀ + Cy₁) avec la linéarité de L.', 'L(y₀ + Cy₁) = L(y₀) + C·L(y₁) = 0 + C·b.', 'Un énoncé faux se réfute avec un exemple simple : constantes, exponentielles.');

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return tfOf(SK, rng.pick(statements(rng)), 4, examTag(opts));
    if (level === 5) { const ss = pickK(rng, statements(rng), 3); return tfProblem(SK, 5, ss, `${SK}:5:${ss.map((s) => s.key).join(',')}`); }
    if (level === 4 && rng.chance(0.5)) return tfOf(SK, rng.pick(statements(rng)), 4, false, tfHints);
    return linesVariant(level, rng, opts);
  },
};
