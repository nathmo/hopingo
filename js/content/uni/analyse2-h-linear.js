// a2-ode-linear1 (module A2, part h, step U6): y′ + a(x)y = b(x) by the
// integrating factor. Built from the solution y = e^(−A)(F + C): A ∈ {kx,
// k·ln x, −ln cos x, arctan x, x²/2}; a leading coefficient (2, 3, x, cos x,
// x² + 1) forces the normalisation in most items. One `ode` part: the
// normalised equation, μ (μ′/μ = a), (μy)′ = μb, μy = F + C, the constant,
// y. The judge's cfg.traps holds the wrong lines of a2_ode_if_* .

import { MT, linesItem, examTag } from './kit.js';
import { tpl, withMenus, sup } from './a2-kit.js';
import { q, qt, term, sumT, fac, expT, rd, H, E, modeOf, mcq4, opt, tfOf } from './analyse2-h-kit.js';

const SK = 'a2-ode-linear1';
const SUB = [
  { id: 'normalize', label: 'normaliser (coefficient 1 devant y′)', skill: SK },
  { id: 'mu', label: 'facteur intégrant μ', skill: SK },
  { id: 'exact-deriv', label: '(μy)′ = μb', skill: SK },
  { id: 'integrate', label: 'intégrer', skill: 'a1-int-direct' },
  { id: 'ic', label: 'condition initiale', skill: SK },
  { id: 'final', label: 'isoler y', skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];
const C3 = [1, 2, 3, -1, -2];

// x^n as text ('' for n = 0).
const xp = (n) => (n === 0 ? '' : n === 1 ? 'x' : n < 0 ? `x^(${n})` : `x^${n}`);
// k·y in a sum: '+2y', '-y'.
const ky = (k) => { const t = term(k, 'y'); return t.startsWith('-') ? t : `+${t}`; };
// c·e^(p x) (p = 0: the number c).
const ce = (c, p) => (q(p).n === 0 ? qt(c) : term(c, expT(p)));

// ---------- the templates ----------

function tExp(rng) {
  const k = rng.pick([1, 2, 3, -1, -2]);
  const p = rng.pick([0, 0, 1, 2, -1, -3]);
  if (p === -k) return null;
  const c = rng.pick(C3);
  const beta = c * (p + k);
  const m = rng.pick([1, 1, 2, 3]);
  const y0 = rng.int(-2, 3);
  const C = y0 - c;
  const lead = m === 1 ? null : String(m);
  const raw = `${m === 1 ? '' : m}y'${ky(m * k)}=${ce(m * beta, p)}`;
  const norm = `y'${ky(k)}=${ce(beta, p)}`;
  const mu = expT(k);
  return {
    id: `exp:${k}:${p}:${c}:${m}`, raw, lead, norm, a: String(k), mu, x0: 0, y0, domain: [-1, 1],
    exact: `d(${mu} y) = ${ce(beta, p + k)}`, integ: `${mu} y = ${ce(c, p + k)} + C`, C: String(C),
    y: sumT([ce(c, p), term(C, expT(-k))]),
    raw2: lead ? `μ = ${expT(m * k)}` : null, inv: `μ = ${expT(-k)}`, rhs: `d(${mu} y) = ${ce(beta, p)}`, mub: ce(beta, p + k),
    shift: p === 0, sep: p === 0, intHint: `∫ ${rd(ce(beta, p + k))} dx`,
    wrongs: {
      ic: p === 0 && c === 0 ? null : sumT([ce(c, p), term(y0, expT(-k))]),
      sign: p === k ? null : (() => { const c2 = q(beta, p - k); return sumT([q(p).n === 0 ? qt(c2) : term(c2, expT(p)), term(q(y0).sub(c2), expT(k))]); })(),
      rhs: p === 0 ? `(${sumT([term(beta, 'x'), String(y0)])})${expT(-k)}` : (() => { const c2 = q(beta, p); return sumT([term(c2, expT(p - k)), term(q(y0).sub(c2), expT(-k))]); })(),
    },
  };
}

function tPow(rng) {
  const k = rng.pick([1, 2, 3]);
  const n = rng.pick([0, 1, 2]);
  const N = n + k + 1;
  const c = rng.pick(C3);
  const beta = c * N;
  const lead = rng.chance(0.7) ? 'x' : null;
  const y0 = rng.int(-2, 3);
  const C = y0 - c;
  const raw = lead ? `x y'${ky(k)}=${term(beta, xp(n + 1))}` : `y'+(${k}/x)y=${term(beta, xp(n))}`;
  const norm = `y'+(${k}/x)y=${term(beta, xp(n))}`;
  const mu = xp(k);
  const over = (cc, kk) => (q(cc).n === 0 ? '' : `${qt(cc)}/${xp(kk)}`);
  const s = n - k + 1;
  return {
    id: `pow:${k}:${n}:${c}:${lead}`, raw, lead, norm, a: `${k}/x`, mu, x0: 1, y0, domain: [0.2, 4],
    exact: `d(${mu} y) = ${term(beta, xp(n + k))}`, integ: `${mu} y = ${term(c, xp(N))} + C`, C: String(C),
    y: sumT([term(c, xp(n + 1)), over(C, k)]),
    raw2: lead ? `μ = ${expT(k)}` : null, inv: `μ = 1/${mu}`, rhs: `d(${mu} y) = ${term(beta, xp(n))}`, mub: term(beta, xp(n + k)),
    shift: false, sep: false, intHint: `∫ ${rd(term(beta, xp(n + k)))} dx`,
    wrongs: {
      ic: sumT([term(c, xp(n + 1)), over(y0, k)]),
      sign: s === 0 ? null : sumT([term(q(beta, s), xp(n + 1)), term(q(y0).sub(q(beta, s)), xp(k))]),
      rhs: sumT([term(q(beta, n + 1), xp(n + 1 - k) || ''), over(q(y0).sub(q(beta, n + 1)), k)]),
    },
  };
}

function tCos(rng) {
  const beta = rng.pick([1, 2, 3, -1]);
  const kind = rng.pick(['x', 'sin']);
  const y0 = rng.int(-1, 3);
  const F = kind === 'x' ? term(beta, 'x') : term(beta, 'sin(x)');
  const b = kind === 'x' ? term(beta, 'cos(x)') : term(beta, 'cos(x)^2');
  const raw = `cos(x) y'+sin(x) y=${kind === 'x' ? term(beta, 'cos(x)^2') : term(beta, 'cos(x)^3')}`;
  const half = `(${term(beta, 'x/2')}+${term(beta, 'sin(2x)/4')})`.replace('+-', '-');
  return {
    id: `cos:${beta}:${kind}`, raw, lead: 'cos(x)', norm: `y'+tan(x) y=${b}`, a: 'tan(x)', mu: '1/cos(x)', x0: 0, y0, domain: [-1.2, 1.2],
    exact: `d(y/cos(x)) = ${kind === 'x' ? String(beta) : term(beta, 'cos(x)')}`, integ: `y/cos(x) = ${F} + C`, C: String(y0),
    y: `(${sumT([F, y0 ? String(y0) : ''])})cos(x)`,
    raw2: 'μ = e^(-cos(x))', inv: 'μ = cos(x)', rhs: `d(y/cos(x)) = ${b}`, mub: kind === 'x' ? String(beta) : term(beta, 'cos(x)'),
    shift: false, sep: false, intHint: kind === 'x' ? `∫ ${beta} dx` : `∫ ${rd(term(beta, 'cos x'))} dx`,
    wrongs: {
      ic: null,
      sign: kind === 'x' ? `(${sumT([half, y0 ? String(y0) : ''])})/cos(x)` : null,
      rhs: kind === 'x' ? `(${sumT([term(beta, 'sin(x)'), y0 ? String(y0) : ''])})cos(x)` : `(${sumT([half, y0 ? String(y0) : ''])})cos(x)`,
    },
  };
}

function tAtan(rng) {
  const beta = rng.pick([1, 2, 3, -1, -2]);
  const y0 = rng.int(-2, 3);
  const C = y0 - beta;
  return {
    id: `atan:${beta}`, raw: `(x^2+1)y'+y=${beta}`, lead: 'x^2+1', norm: `y'+y/(x^2+1)=${beta}/(x^2+1)`, a: '1/(x^2+1)', mu: 'e^(arctan(x))', x0: 0, y0, domain: [-2, 2],
    exact: `d(e^(arctan(x)) y) = ${term(beta, 'e^(arctan(x))')}/(x^2+1)`, integ: `e^(arctan(x)) y = ${term(beta, 'e^(arctan(x))')} + C`, C: String(C),
    y: sumT([String(beta), term(C, 'e^(-arctan(x))')]),
    raw2: 'μ = e^x', inv: 'μ = e^(-arctan(x))', rhs: `d(e^(arctan(x)) y) = ${beta}/(x^2+1)`, mub: `${term(beta, 'e^(arctan(x))')}/(x^2+1)`,
    shift: false, sep: true, intHint: `∫ ${rd(term(beta, 'e^(arctan x)'))}/(x² + 1) dx`,
    wrongs: {
      ic: sumT([String(beta), term(y0, 'e^(-arctan(x))')]),
      sign: sumT([String(-beta), term(y0 + beta, 'e^(arctan(x))')]),
      rhs: `(${sumT([term(beta, 'arctan(x)'), y0 ? String(y0) : ''])})e^(-arctan(x))`,
    },
  };
}

function tGauss(rng) {
  const beta = rng.pick([1, 2, 3, -1, -2]);
  const y0 = rng.int(-2, 3);
  const m = rng.pick([1, 1, 2]);
  if (rng.chance(0.6)) {
    const C = y0 - beta;
    return {
      id: `gx:${beta}:${m}`, raw: `${m === 1 ? '' : m}y'+${m === 1 ? '' : m}x y=${term(m * beta, 'x')}`, lead: m === 1 ? null : String(m), norm: `y'+x y=${term(beta, 'x')}`, a: 'x', mu: 'e^(x^2/2)', x0: 0, y0, domain: [-1.5, 1.5],
      exact: `d(e^(x^2/2) y) = ${term(beta, 'x')} e^(x^2/2)`, integ: `e^(x^2/2) y = ${term(beta, 'e^(x^2/2)')} + C`, C: String(C),
      y: sumT([String(beta), term(C, 'e^(-x^2/2)')]),
      raw2: m === 1 ? null : 'μ = e^(x^2)', inv: 'μ = e^(-x^2/2)', rhs: `d(e^(x^2/2) y) = ${term(beta, 'x')}`, mub: `${term(beta, 'x')}e^(x²/2)`,
      shift: false, sep: true, intHint: `∫ ${rd(term(beta, 'x'))}e^(x²/2) dx`,
      wrongs: {
        ic: sumT([String(beta), term(y0, 'e^(-x^2/2)')]),
        sign: sumT([String(-beta), term(y0 + beta, 'e^(x^2/2)')]),
        rhs: `(${sumT([term(q(beta, 2), 'x^2'), y0 ? String(y0) : ''])})e^(-x^2/2)`,
      },
    };
  }
  return {
    id: `gauss:${beta}`, raw: `y'+x y=${term(beta, 'e^(-x^2/2)')}`, lead: null, norm: null, a: 'x', mu: 'e^(x^2/2)', x0: 0, y0, domain: [-1.5, 1.5],
    exact: `d(e^(x^2/2) y) = ${beta}`, integ: `e^(x^2/2) y = ${term(beta, 'x')} + C`, C: String(y0),
    y: `(${sumT([term(beta, 'x'), y0 ? String(y0) : ''])})e^(-x^2/2)`,
    raw2: null, inv: 'μ = e^(-x^2/2)', rhs: `d(e^(x^2/2) y) = ${term(beta, 'e^(-x^2/2)')}`, mub: String(beta),
    shift: false, sep: false, intHint: `∫ ${beta} dx`,
    wrongs: { ic: null, sign: null, rhs: null },
  };
}

const TEMPLATES = [tExp, tExp, tPow, tPow, tCos, tAtan, tGauss];
function data(rng) {
  for (let i = 0; i < 200; i++) {
    const d = rng.pick(TEMPLATES)(rng);
    if (d) return d;
  }
  return { ...tExp({ pick: (a) => a[0], int: (lo) => lo, chance: () => false }), fallback: true };
}

const CHOICES = (d) => [
  { id: 'norm', label: d.lead ? `Diviser par ${sup(d.lead)} : coefficient 1 devant y′` : 'Normaliser (coefficient 1 devant y′)' },
  { id: 'mu', label: 'Facteur intégrant μ = e^(∫ a)' },
  { id: 'exact', label: 'Multiplier par μ : (μy)′ = μb' },
  { id: 'int', label: 'Intégrer des deux côtés' },
  { id: 'ic', label: 'Appliquer la condition initiale' },
  { id: 'solve', label: 'Isoler y' },
  ...(d.lead ? [{ id: 'raw', label: 'Calculer μ avec le coefficient de y tel qu\'il est écrit', rule: 'a2_ode_if_not_normalized', why: `Le facteur intégrant suppose y′ seul : divise d'abord par ${sup(d.lead)}.` }] : []),
];

function methodDecision(d) {
  return {
    kind: 'decision', prompt: 'Quelle méthode ?', options: [
      { id: 'if', label: 'Facteur intégrant', valid: true, ref: true },
      d.shift
        ? { id: 'shift', label: 'Décalage vers l\'équilibre (a et b constants)', valid: true, quality: 'poor', why: 'Juste aussi : a et b sont constants, y = b/a + Ce^(−ax). On fait ici le facteur intégrant.' }
        : { id: 'shift', label: 'Décalage vers l\'équilibre (a et b constants)', valid: false, why: 'Le décalage demande a et b constants.' },
      d.sep
        ? { id: 'sep', label: 'Variables séparables', valid: true, quality: 'poor', why: 'Juste aussi ici (y′ s\'écrit g(x)·h(y)), mais le facteur intégrant marche toujours.' }
        : { id: 'sep', label: 'Variables séparables', valid: false, rule: 'a2_ode_method_separable_sum', why: 'b(x) − a(x)y n\'est pas un produit g(x)·h(y) : l\'équation n\'est pas séparable.' },
    ],
  };
}

function linesVariant(level, rng, opts) {
  const d = data(rng);
  const traps = {
    a2_ode_if_sign: [d.inv],
    ...(d.raw2 ? { a2_ode_if_not_normalized: [{ line: d.raw2, ctx: { coef: sup(d.lead), a: sup(d.a) } }] } : {}),
    ...(d.rhs ? { a2_ode_if_rhs: [{ line: d.rhs, ctx: { mub: sup(d.mub) } }] } : {}),
  };
  const judge0 = { kind: 'ode', eq: d.raw, unknown: 'y', v: 'x', order: 1, ic: { x: d.x0, y: d.y0 }, mu: d.a, domain: { x: d.domain }, yRange: [-40, 40], traps };
  const lines = [];
  const startNorm = level === 1 && d.lead;
  if (d.lead && !startNorm) lines.push(E(d.norm, d.lead ? `Diviser par ${sup(d.lead)}` : 'Normaliser', 'normalize', 'norm'));
  if (level === 3) lines.unshift(methodDecision(d));
  lines.push(E(`μ = ${d.mu}`, `μ = e^(∫ a), a = ${sup(d.a)}`, 'mu', 'mu'));
  lines.push(E(d.exact, '(μy)′ = μ·b', 'exact-deriv', 'exact'));
  lines.push(E(d.integ, 'Intégrer', 'integrate', 'int'));
  lines.push(E(`C = ${d.C}`, `y(${d.x0}) = ${rd(d.y0)}`, 'ic', 'ic'));
  lines.push(E(`y = ${d.y}`, 'Isoler y', 'final', 'solve'));
  const at = (pred) => lines.findIndex((l) => l.kind === 'eq' && pred(l.math));
  if (level === 1) {
    const i = at((m) => m.startsWith('μ'));
    lines[i] = { ...lines[i], ...tpl(lines[i].math, [d.mu]) };
    const j = at((m) => m === d.exact);
    lines[j] = { ...lines[j], ...tpl(d.exact, [d.exact.split(' = ')[1]]) };
  }
  if (level === 2) {
    const j = at((m) => m === d.integ);
    lines[j] = { ...lines[j], ...tpl(d.integ, [d.integ.split(' = ')[1].replace(/ \+ C$/, '')]) };
  }
  const start = startNorm ? d.norm : d.raw;
  const judge = withMenus(judge0, level, start, lines, CHOICES(d));
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script: lines,
    prompt: `Résous ${MT(d.raw)}, y(${d.x0}) = ${rd(d.y0)}${d.x0 === 1 ? ', pour x > 0' : ''}.${startNorm ? ` Forme normalisée : ${MT(d.norm)}.` : ''}`,
    hints: H(d.lead ? `Divise par ${sup(d.lead)} pour avoir y′ seul, puis multiplie par μ = e^(∫ a).` : 'Multiplie par μ = e^(∫ a) : le membre de gauche devient (μy)′.',
      `a(x) = ${sup(d.a)}, donc μ = ${MT(d.mu)} ; puis (μy)′ = μ·b et ${d.intHint}.`,
      `${MT(d.exact)}`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.id}:${d.y0}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- multiple choice: the solution ----------

function mcqVariant(level, rng, opts) {
  const d = data(rng);
  const w = d.wrongs;
  return mcq4({
    skill: SK, level, key: `${SK}:mcq:${d.id}:${d.y0}`, exam: examTag(opts),
    prompt: `La solution de ${MT(d.raw)}, y(${d.x0}) = ${rd(d.y0)}${d.x0 === 1 ? ' (x > 0)' : ''} est :`,
    right: MT(`y = ${d.y}`),
    wrongs: [
      w.ic && opt(`y = ${w.ic}`, 'a2_ode_ic_before_particular'),
      w.sign && opt(`y = ${w.sign}`, 'a2_ode_if_sign'),
      w.rhs && opt(`y = ${w.rhs}`, 'a2_ode_if_rhs'),
    ],
    fillers: [opt(`y = -(${d.y})`), opt(`y = ${d.y}+1`), opt(`y = 2(${d.y})`)],
    solution: [{ html: `${d.lead ? `On divise par ${sup(d.lead)} : ${MT(d.norm)} ; ` : ''}μ = ${MT(d.mu)}, ${MT(d.exact)}, ${MT(d.integ)}, C = ${rd(d.C)}.`, note: '' }],
    expectedSec: 180,
  }, rng);
}

// ---------- true/false ----------

function statements(rng) {
  const k = rng.pick([1, 2, 3]);
  const b = k * rng.pick([1, 2, 3]);
  const e = b / k;
  return [
    { key: 'diff', truth: true, text: 'Si y₁ et y₂ sont deux solutions de y′ + a(x)y = b(x), alors y₁ − y₂ est une solution de y′ + a(x)y = 0.', why: 'Vrai : (y₁ − y₂)′ + a(y₁ − y₂) = b − b = 0.' },
    {
      key: `sum${k}${b}`, truth: false, text: `Si y₁ et y₂ sont deux solutions de y′ + ${fac(k)}y = ${b}, alors y₁ + y₂ en est une aussi.`, ruleIfTrue: 'a2_ode_superposition_nonhom',
      why: `Faux : (y₁ + y₂)′ + ${fac(k)}(y₁ + y₂) = ${b} + ${b} = ${2 * b}. Par exemple y₁ = y₂ = ${e}.`,
      counter: { kind: 'a2', prop: 'odeSumFails', params: { eq: `y'+${fac(k)}y=${b}` }, ask: [{ v: 'y1', label: 'y₁(x) =', keys: KEYS }, { v: 'y2', label: 'y₂(x) =', keys: KEYS }], answer: { y1: String(e), y2: `${e}+e^(${-k}x)` } },
    },
    { key: `gen${k}${b}`, truth: true, text: `La solution générale de y′ + ${fac(k)}y = ${b} est y = ${e} + Ce^(${-k}x).`, why: `Vrai : a et b sont constants, on décale vers l'équilibre y* = ${b}/${k} = ${e}.` },
    {
      key: `late${k}${b}`, truth: false, text: `Toutes les solutions de y′ + ${fac(k)}y = ${b} sont de la forme y = ${e} + e^(${-k}x) + C.`, ruleIfTrue: 'a2_ode_sep_constant_late',
      why: `Faux : la constante multiplie la solution homogène, y = ${e} + Ce^(${-k}x). Par exemple y = ${e} + 2e^(${-k}x).`,
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: `y'+${fac(k)}y=${b}`, family: `${e}+e^(${-k}x)+C`, domain: { x: [-1, 1] } }, ask: [{ v: 'y', label: 'Une solution qui n\'est pas de cette forme : y(x) =', keys: KEYS }], answer: { y: `${e}+2e^(${-k}x)` } },
    },
  ];
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return tfOf(SK, rng.pick(statements(rng)), 4, examTag(opts));
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return mcqVariant(5, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
