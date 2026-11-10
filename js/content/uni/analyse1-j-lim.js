// Generators of module A1, part j (step U4): a1-fn-limits (remarkable
// limits, conjugate, e^(v·Log u), bounded × 0: lines judged by `limit`).
// Catalogue: docs/universite/A1-analyse-1.md, `a1-fn-limits`.

import { parse } from '../../cas/parse.js';
import { limit } from '../../cas/limit.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { MT, linesItem, mcq, tfItem } from './kit.js';
import {
  q, V, KEYS, LIM, qt, pq, fq, kx, sc, sqrtFrac, modeOf, H, E, examOf, uniqOptions, blanked, vfMcq, assemble, fitLines,
} from './analyse1-j-kit.js';

const FL = 'a1-fn-limits';
const FL_SUB = [
  { id: 'remark', label: 'limites remarquables', skill: FL },
  { id: 'alg', label: 'transformer l\'expression', skill: 'a1-seq-limits' },
];

// The actions of level 3.
const FL_CHOICES = [
  { id: 'factor', label: 'Mettre en facteur le terme dominant' },
  { id: 'conj', label: 'Multiplier par le conjugué' },
  { id: 'remark', label: 'Faire apparaître une limite remarquable' },
  { id: 'compare', label: 'Croissances comparées' },
  { id: 'exp', label: 'Écrire e^(v·Log u)' },
  { id: 'bounded', label: '0 × (borné) → 0' },
  { id: 'limit', label: 'Passer à la limite' },
];

const F_SHOW = { sin: 'sin', tan: 'tan', arctan: 'Arctg', ln: 'Log', exp: 'exp' };
// The remarkable quotient F(u)/u → 1, and its inverse u/F(u), in words.
const REM = { sin: 'sin(u)/u', tan: 'tan(u)/u', arctan: 'Arctg(u)/u', ln: 'Log(1 + u)/u', exp: '(eᵘ − 1)/u' };
const REM_INV = { sin: 'u/sin(u)', tan: 'u/tan(u)', arctan: 'u/Arctg(u)', ln: 'u/Log(1 + u)', exp: 'u/(eᵘ − 1)' };
// u ↦ F(u) as text, and the remarkable quotient F(u)/u → 1.
const top = (F, u) => (F === 'ln' ? `ln(1+${u})` : F === 'exp' ? `e^(${u})-1` : `${F}(${u})`);
const wrapU = (F, u) => (F === 'exp' ? `(${top(F, u)})` : top(F, u));
const pu = (u) => (/^[0-9]*x(\^\d+)?$/.test(u) && !/^\d/.test(u) ? u : `(${u})`);

// ---------- templates: {start, to, dir?, lines, L (text), tool, h1} ----------

// (a) (1 − cos(ax))/(x·sin(bx)) → a²/(2b).
function tCosSin(rng) {
  const a = rng.int(1, 6);
  const b = rng.int(1, 6);
  if (a === 1 && b === 1) return null;
  const A = kx(a);
  const B = kx(b);
  const K = q(a * a, b);
  const L = K.div(2);
  const start = `(1-cos(${A}))/(x×sin(${B}))`;
  const sq = a === 1 ? 'x^2' : `(${A})^2`;
  const f1 = `((1-cos(${A}))/${sq})×(${pu(B)}/sin(${B}))${K.eq(1) ? '' : `×${pq(K)}`}`;
  return {
    start, to: '0', L: qt(L), key: start, tool: 'remark', scale: a !== 1 ? { c: a, F: 'cos', u: A } : { c: b, F: 'sin', u: B },
    lines: [
      { ...E(f1, 'Faire apparaître (1 − cos u)/u² et u/sin u, en produit', 'remark', 'remark'), holes: K.eq(1) ? [sq] : [qt(K), sq] },
      { ...E(`(1/2)×1${K.eq(1) ? '' : `×${pq(K)}`}`, 'Limites remarquables', 'remark', 'limit'), holes: ['1/2'] },
      E(qt(L), 'Conclure', 'remark', 'limit'),
    ],
    h1: 'Forme 0/0 avec cos et sin : fais apparaître (1 − cos u)/u² et sin u/u, en produit.',
    h2: `(1 − cos(${A}))/${a === 1 ? 'x²' : `(${A})²`} → □`,
  };
}

// (b) F(a·xᵖ)/G(b·xᵖ) or Arctg(ax²)/(x·sin(bx)) → a/b.
const TOPS = ['sin', 'tan', 'arctan', 'ln', 'exp'];
function tRatio(rng) {
  const a = rng.int(1, 6);
  const b = rng.int(1, 6);
  if (a === b) return null;
  const K = q(a, b);
  if (rng.chance(0.3)) {
    // Arctg(ax²)/(x·sin(bx)) (examen) → a/b.
    const A = kx(a, 2);
    const B = kx(b);
    const start = `arctan(${A})/(x×sin(${B}))`;
    const f1 = `(arctan(${A})/${pu(A)})×(${pu(B)}/sin(${B}))${K.eq(1) ? '' : `×${pq(K)}`}`;
    return {
      start, to: '0', L: qt(K), key: start, tool: 'remark', scale: { c: b, F: 'sin', u: B },
      lines: [
        { ...E(f1, 'x·sin(bx) ressemble à b·x² : faire apparaître Arctg(u)/u et u/sin u', 'remark', 'remark'), holes: [qt(K)] },
        { ...E(`1×1${K.eq(1) ? '' : `×${pq(K)}`}`, 'Limites remarquables', 'remark', 'limit'), holes: ['1×1'] },
        E(qt(K), 'Conclure', 'remark', 'limit'),
      ],
      h1: 'x·sin(bx) se comporte comme b·x² : fais apparaître Arctg(u)/u avec u = ax² et u/sin u avec u = bx.',
      h2: `Arctg(${A})/(${A}) → □`,
    };
  }
  const [F, G] = rng.shuffle(TOPS).slice(0, 2);
  const A = kx(a);
  const B = kx(b);
  const start = `${wrapU(F, A)}/${wrapU(G, B)}`;
  const f1 = `(${wrapU(F, A)}/${pu(A)})×(${pu(B)}/${wrapU(G, B)})${K.eq(1) ? '' : `×${pq(K)}`}`;
  return {
    start, to: '0', L: qt(K), key: start, tool: 'remark', scale: a !== 1 ? { c: a, F, u: A } : { c: b, F: G, u: B },
    lines: [
      { ...E(f1, `Faire apparaître ${REM[F]} avec u = ${A} et ${REM_INV[G]} avec u = ${B}`, 'remark', 'remark'), holes: [qt(K)] },
      { ...E(`1×1${K.eq(1) ? '' : `×${pq(K)}`}`, 'Limites remarquables', 'remark', 'limit'), holes: ['1×1'] },
      E(qt(K), 'Conclure', 'remark', 'limit'),
    ],
    h1: 'Forme 0/0 : multiplie et divise pour faire apparaître une limite remarquable en haut et une en bas, avec le même argument que la fonction.',
    h2: `${MT(`${wrapU(F, A)}/${pu(A)}`)} → □`,
  };
}

// (c) √(ax + b)/√(cx + d) en +∞ → √(a/c).
function tSqrtInf(rng) {
  const a = rng.int(1, 9);
  const c = rng.int(1, 9);
  if (a === c) return null;
  const b = rng.int(1, 9);
  const d = rng.int(1, 9);
  const r = sqrtFrac(a, c);
  const start = `√(${kx(a)}+${b})/√(${kx(c)}+${d})`;
  const lines = [
    E(`√((${kx(a)}+${b})/(${kx(c)}+${d}))`, 'Une seule racine', 'alg', 'factor'),
    { ...E(`√((${a}+${b}/x)/(${c}+${d}/x))`, 'Mettre x en facteur en haut et en bas, simplifier', 'alg', 'factor'), holes: [`${b}/x`, `${d}/x`] },
  ];
  if (r.exact) lines.push(E(r.text, 'Passer à la limite', 'alg', 'limit'));
  else lines.push({ ...E(`√(${qt(q(a, c))})`, 'Passer à la limite', 'alg', 'limit'), holes: [qt(q(a, c))] }, E(r.text, 'Sortir la racine du dénominateur', 'alg', 'limit'));
  return {
    start, to: '+∞', L: r.text, key: start, tool: 'factor', a, c, b, d,
    lines,
    h1: 'Forme ∞/∞ : réunis les racines, puis mets x en facteur en haut et en bas.',
    h2: `√((${a} + ${b}/x)/(${c} + □/x))`,
  };
}

// (d) x^(kx) en 0⁺ → 1, ou (1 + ax)^(b/x) en 0 → e^(ab).
function tPow(rng) {
  if (rng.chance(0.5)) {
    const k = rng.int(1, 5);
    const start = rng.chance(0.5) || k === 1 ? `x^(${kx(k)})` : `(x^${k})^x`;
    return {
      start, to: '0', dir: '+', L: '1', key: start, tool: 'exp',
      lines: [
        { ...E(`e^(${kx(k)}×ln(x))`, 'Écrire u^v = e^(v·Log u)', 'alg', 'exp'), holes: ['ln(x)'] },
        E('e^0', 'Croissances comparées : x·Log x → 0', 'remark', 'compare'),
        E('1', 'Conclure', 'remark', 'limit'),
      ],
      h1: 'Forme 0⁰ : écris u^v = e^(v·Log u), puis utilise x·Log x → 0 en 0⁺.',
      h2: `e^(${kx(k)}·Log x) → e^□`,
    };
  }
  const a = rng.pick([1, 2, 3, -1, -2]);
  const b = rng.pick([1, 2, 3]);
  if (a * b > 6 || (a === 1 && b === 1)) return null;
  const ab = a * b;
  const A = kx(a);
  const start = `(1+${A})^(${b}/x)`.replace('+-', '-');
  const L = ab === 1 ? 'e' : `e^${ab < 0 ? `(${ab})` : ab}`;
  return {
    start, to: '0', L, key: start, tool: 'exp',
    lines: [
      { ...E(`e^((${b}/x)×ln(1+${A}))`.replace('+-', '-'), 'Écrire u^v = e^(v·Log u)', 'alg', 'exp'), holes: [`${b}/x`] },
      { ...E(`e^(${ab}×ln(1+${A})/${pu(A)})`.replace('+-', '-').replace('e^(1×', 'e^('), `Faire apparaître Log(1 + u)/u avec u = ${A}`, 'remark', 'remark'), holes: [String(ab)] },
      E(L, 'Conclure', 'remark', 'limit'),
    ],
    h1: 'Forme 1^∞ : écris e^(v·Log u), puis Log(1 + u)/u → 1.',
    h2: `e^((${b}/x)·Log(1 + ${A})) = e^(□·Log(1 + ${A})/(${A}))`,
  };
}

// (e) c·xᵖ·sin(m/x) en 0 → 0 (0 × borné).
function tBounded(rng) {
  const c = rng.pick([1, 1, 2, 3, -2]);
  const p = rng.pick([1, 1, 2]);
  const m = rng.pick([1, 1, 2, 3]);
  const T = rng.pick(['sin', 'cos']);
  const mono = c === 1 ? kx(1, p) : `${c}${kx(1, p)}`;
  const start = `${mono}×${T}(${m}/x)`;
  return {
    start, to: '0', L: '0', key: start, tool: 'bounded', T,
    lines: [E('0', `|${T}(${m}/x)| ≤ 1 et ${p === 1 ? 'x' : 'x²'} → 0 : 0 × (borné) → 0`, 'remark', 'bounded')],
    h1: `${T}(${m}/x) n'a pas de limite en 0, mais il est borné ; et ${p === 1 ? 'x' : 'x²'} → 0.`,
    h2: `|${start.replace(/×/g, '·')}| ≤ ${Math.abs(c) === 1 ? '' : Math.abs(c)}${p === 1 ? '|x|' : 'x²'} → □`,
  };
}

// (f) (√(b² + ax) − b)/x → a/(2b) (conjugué).
function tConj(rng) {
  const b = rng.pick([1, 1, 2, 3]);
  const a = rng.pick([1, 2, 3, 4, 5, 6, -2, -3]);
  const b2 = b * b;
  const A = kx(a);
  const R = `√(${b2}+${A})`.replace('+-', '-');
  const start = `(${R}-${b})/x`;
  const L = q(a, 2 * b);
  return {
    start, to: '0', L: qt(L), key: start, tool: 'conj',
    lines: [
      { ...E(`(${b2}+${A}-${b2})/(x(${R}+${b}))`.replace('+-', '-'), 'Multiplier en haut et en bas par le conjugué', 'alg', 'conj'), holes: [`${R}+${b}`] },
      { ...E(`${a}/(${R}+${b})`, 'Simplifier par x', 'alg', 'factor'), holes: [String(a)] },
      E(qt(L), 'Passer à la limite', 'alg', 'limit'),
    ],
    h1: 'Forme 0/0 avec une racine : multiplie en haut et en bas par le conjugué √(…) + ' + b + '.',
    h2: `${MT(`${a}/(${R}+${b})`)} → □`,
  };
}

const TEMPLATES = { cosSin: tCosSin, ratio: tRatio, sqrtInf: tSqrtInf, pow: tPow, bounded: tBounded, conj: tConj };

function flData(rng, kinds) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(kinds);
    const d = TEMPLATES[kind](rng);
    if (!d) continue;
    d.kind = kind;
    d.cfg = LIM(d.to, d.dir);
    try {
      fitLines(d.cfg, d.start, d.lines, false);
      fitLines(d.cfg, d.start, d.lines, true);
      return d;
    } catch { /* another draw */ }
  }
  const d = tCosSin({ int: (lo) => (lo === 1 ? 3 : 2), pick: (a) => a[0], chance: () => false });
  return { ...d, kind: 'cosSin', cfg: LIM('0'), fallback: true };
}

// The decision of level 2 (and the bait of the remarkable limits).
function flDecision(d, rng) {
  if (d.tool === 'bounded') {
    return {
      kind: 'decision', prompt: `x → 0 et ${d.T}(…/x) n'a pas de limite. Que dire du produit ?`, options: rng.shuffle([
        { id: 'bounded', label: '0 × (borné) : le produit tend vers 0', valid: true, ref: true },
        { id: 'indet', label: 'C\'est une forme indéterminée : la limite n\'existe pas', valid: false, rule: 'a1_bounded_times_zero', why: '0 × (borné) n\'est pas indéterminé : le produit est coincé entre −|x| et |x|.' },
        { id: 'one', label: `${d.T}(…/x) → 1, donc le produit tend vers 0·1`, valid: false, why: `${d.T}(…/x) n'a pas de limite en 0 : il oscille entre −1 et 1.` },
      ]),
    };
  }
  if (d.scale) {
    const { c, F, u } = d.scale;
    const show = F === 'cos' ? `(1 − cos(${u}))/x²` : F === 'ln' ? `Log(1 + ${u})/x` : F === 'exp' ? `(e^(${u}) − 1)/x` : `${F_SHOW[F] ?? F}(${u})/x`;
    const right = F === 'cos' ? `${c * c}/2` : String(c);
    const wrong = F === 'cos' ? '1/2' : '1';
    return {
      kind: 'decision', prompt: `Que vaut la limite de ${show} en 0 ?`, options: rng.shuffle([
        { id: 'scale', label: `${right} : on fait apparaître u = ${u} en bas`, valid: true, ref: true },
        { id: 'one', label: `${wrong} : c'est une limite remarquable`, valid: false, rule: 'a1_remarkable_limit_scale', why: `La limite remarquable demande le même argument en haut et en bas : il faut u = ${u}, pas x.` },
        { id: 'zero', label: '0, car le haut tend vers 0', valid: false, why: 'Le bas tend aussi vers 0 : c\'est une forme 0/0.' },
      ]),
    };
  }
  if (d.tool === 'conj') {
    return {
      kind: 'decision', prompt: 'Comment lever la forme 0/0 ?', options: rng.shuffle([
        { id: 'conj', label: 'Multiplier par le conjugué', valid: true, ref: true },
        { id: 'equiv', label: 'Remplacer la racine par sa limite dans la différence : (√… − …)/x → 0', valid: false, rule: 'a1_ipe_in_sum', why: 'On ne remplace pas un terme d\'une différence par sa limite ou son équivalent : la différence est justement ce qui compte.' },
      ]),
    };
  }
  if (d.tool === 'exp') {
    return {
      kind: 'decision', prompt: 'Que faire de la puissance u^v ?', options: rng.shuffle([
        { id: 'exp', label: 'Écrire u^v = e^(v·Log u)', valid: true, ref: true },
        { id: 'base', label: 'La base tend vers une constante : passer à la limite dans la base seule', valid: false, why: 'L\'exposant bouge en même temps : il faut e^(v·Log u).' },
      ]),
    };
  }
  return {
    kind: 'decision', prompt: 'Forme ∞/∞ : que faire ?', options: rng.shuffle([
      { id: 'factor', label: 'Mettre x en facteur en haut et en bas', valid: true, ref: true },
      { id: 'one', label: 'Les deux tendent vers +∞ : la limite vaut 1', valid: false, why: '∞/∞ est indéterminé : seuls les termes dominants comptent.' },
    ]),
  };
}

function flLines(level, rng, opts = {}) {
  const exam = opts.exam === 'open';
  const kinds = exam ? ['sqrtInf'] : level === 2 ? ['cosSin', 'ratio', 'bounded', 'conj', 'pow', 'bounded'] : ['cosSin', 'ratio', 'sqrtInf', 'pow', 'bounded', 'conj'];
  const d = flData(rng, kinds);
  let lines = d.lines;
  if (level === 1) lines = lines.map((l, i) => (i === 0 && l.holes ? blanked(l, l.holes) : l));
  if (level === 2) lines = lines.map((l) => (l.holes ? blanked(l, l.holes) : l));
  const pre = [];
  if (level === 1) pre.push({ kind: 'note', html: d.h1 });
  if (level === 2) pre.push(flDecision(d, rng));
  const as = assemble([{ start: d.start, judge: d.cfg, lines, choices: FL_CHOICES, pre }], level);
  const where = d.to === '+∞' ? '+∞' : d.dir === '+' ? '0⁺' : '0';
  return linesItem({
    skill: FL, level: exam ? 4 : level,
    prompt: `Calcule ${MT(`lim(${d.start},x,${d.to === '+∞' ? '+∞' : d.dir === '+' ? '0⁺' : '0'})`)}.`,
    ...as, mode: exam ? 'free' : modeOf(level),
    hints: H(d.h1, d.h2, `${MT(d.start)} → ${MT(d.L)}`),
    noHints: level >= 5 || exam,
    subgoals: FL_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${FL}:${d.key}:${where}:${level}`, exam: examOf(opts, exam ? 2 : 1), fallback: !!d.fallback,
    expectedSec: exam ? 300 : undefined,
  });
}

// ---------- multiple choice ----------

const valueOf = (node, cfg) => { try { return limit(node, V, cfg.to === '+∞' ? '+inf' : q(Number(cfg.to)), cfg.dir).value; } catch { return null; } };
const sayV = (v) => (v === '+inf' ? '+∞' : v === '-inf' ? '−∞' : v === 'none' ? 'n\'existe pas' : typeof v === 'number' ? null : MT(qt(v)));

// Stems where an equivalent replaced in a sum gives 0 (a1_ipe_in_sum).
function ipeStem(rng) {
  const a = rng.int(1, 3);
  const A = kx(a);
  const s = rng.pick([
    () => ({ start: `(${A}-sin(${A}))/x^3`, L: q(a ** 3, 6) }),
    () => ({ start: `(ln(1+${A})-${A})/x^2`, L: q(-(a ** 2), 2) }),
    () => ({ start: `(arctan(${A})-${A})/x^3`, L: q(-(a ** 3), 3) }),
  ])();
  return { ...s, cfg: LIM('0') };
}

function flMcq(rng, opts) {
  const kind = rng.pick(['tpl', 'tpl', 'ipe', 'bh', 'bounded']);
  let start;
  let cfg;
  let L;
  let fallback = false;
  if (kind === 'ipe') ({ start, cfg, L } = ipeStem(rng));
  else if (kind === 'bh') {
    const a = rng.int(2, 5);
    const b = rng.int(1, 4);
    const c = rng.int(1, 4);
    start = `(cos(${kx(a)})+${b})/(e^x+${c})`;
    cfg = LIM('0');
    L = q(1 + b, 1 + c);
  } else {
    const d = flData(rng, kind === 'bounded' ? ['bounded'] : ['cosSin', 'ratio', 'conj', 'sqrtInf']);
    ({ start, cfg } = d);
    fallback = !!d.fallback;
    L = d.L;
  }
  const right = typeof L === 'string' ? MT(L) : MT(qt(L));
  const options = [{ html: right, correct: true }];
  for (const t of trapAnswers('limit', parse(start), cfg)) {
    const v = valueOf(t.node, cfg);
    if (v === null || typeof v === 'number') continue;
    const html = sayV(v);
    if (html && html !== right) options.push({ html, correct: false, rule: t.rule });
  }
  if (kind === 'bounded') options.push({ html: 'n\'existe pas', correct: false, rule: 'a1_bounded_times_zero' });
  if (kind === 'ipe') options.push({ html: MT('0'), correct: false, rule: 'a1_ipe_in_sum' });
  const Lq = typeof L === 'string' ? null : L;
  if (Lq) {
    options.push({ html: MT(qt(Lq.neg())), correct: false }, { html: MT(qt(Lq.mul(2))), correct: false });
    if (Lq.n !== 0) options.push({ html: MT(qt(Lq.inv())), correct: false });
  }
  options.push({ html: '+∞', correct: false }, { html: MT('1'), correct: false }, { html: MT('0'), correct: false });
  const opts4 = uniqOptions(options);
  // Keep the options that name a trap first.
  const sorted = [opts4[0], ...opts4.slice(1).filter((o) => o.rule), ...opts4.slice(1).filter((o) => !o.rule)].slice(0, 4);
  const where = cfg.to === '+∞' ? '+∞' : cfg.dir === '+' ? '0⁺' : '0';
  return mcq({
    skill: FL, level: opts.exam ? 4 : 5, prompt: `${MT(`lim(${start},x,${where})`)} =`, options: sorted,
    key: `mcq:${start}`, exam: examOf(opts), expectedSec: opts.exam ? 240 : 120, fallback,
    solution: [{ html: `${MT(`lim(${start},x,${where})`)} = ${right}`, note: '' }],
  }, rng);
}

// ---------- true or false ----------

function flTf(rng) {
  const kind = rng.pick(['inf', 'sqrt', 'bounded', 'xg', 'scale', 'prod']);
  const ex = { format: 'tf', points: 1 };
  if (kind === 'inf') {
    return tfItem({
      skill: FL, level: 4, truth: true, key: 'inf', exam: ex, expectedSec: 60,
      statement: 'S\'il existe a ∈ ℝ avec lim<sub>x→a</sub> f(x) = +∞, alors f n\'est pas continue sur ℝ.',
      explanation: 'Vrai : une fonction continue en a a une limite finie, f(a), en a.',
    });
  }
  if (kind === 'sqrt') {
    return vfMcq(FL, 'Il existe f continue de [0 ; 1] dans ℝ₊ telle que √(f(x)) → +∞ quand x → 0⁺.', false, null,
      'Faux : f est continue sur le segment [0 ; 1], donc bornée ; √f l\'est aussi, et √(f(x)) → √(f(0)).', rng, 'sqrt');
  }
  if (kind === 'prod') {
    return tfItem({
      skill: FL, level: 4, truth: true, key: 'prod', exam: ex, expectedSec: 60, ruleIfFalse: 'a1_bounded_times_zero',
      statement: 'Si lim<sub>x→0</sub> f(x) = 0 et si g est bornée près de 0, alors lim<sub>x→0</sub> f(x)·g(x) = 0.',
      explanation: 'Vrai : |f(x)·g(x)| ≤ M·|f(x)| → 0. 0 × (borné) n\'est pas une forme indéterminée.',
    });
  }
  if (kind === 'bounded') {
    return tfItem({
      skill: FL, level: 4, truth: false, key: 'bounded', exam: ex, expectedSec: 60,
      statement: 'Si f est bornée sur [−1 ; 1] ∖ {0}, alors lim<sub>x→0</sub> f(x) existe.',
      counter: {
        kind: 'function', hyp: [{ p: 'boundedOn', on: ['-1', '1'] }], concl: { p: 'limitAt', at: '0' },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calcx', 'calcfn'] }], answer: { f: 'sin(1/x)' },
      },
      explanation: 'Faux : sin(1/x) est bornée par 1, mais elle oscille entre −1 et 1 quand x → 0 : pas de limite.',
    });
  }
  if (kind === 'xg') {
    return tfItem({
      skill: FL, level: 4, truth: false, key: 'xg', exam: ex, expectedSec: 60, ruleIfTrue: 'a1_bounded_times_zero',
      statement: 'Pour toute fonction g définie sur ℝ ∖ {0}, lim<sub>x→0</sub> x·g(x) = 0.',
      counter: {
        kind: 'function', funcs: ['g'], hyp: [], concl: { p: 'limitIs', at: '0', value: '0', of: 'x×g', say: 'x·g(x) tend vers 0' },
        ask: [{ v: 'g', label: 'g(x) =', keys: ['calcx', 'calcfn'] }], answer: { g: '1/x^2' },
      },
      explanation: 'Faux : x × (quelque chose) → 0 seulement si ce quelque chose est borné. Avec g(x) = 1/x², x·g(x) = 1/x n\'a pas de limite finie.',
    });
  }
  return tfItem({
    skill: FL, level: 4, truth: false, key: 'scale', exam: ex, expectedSec: 60, ruleIfTrue: 'a1_remarkable_limit_scale',
    statement: 'Pour tout réel a ≠ 0 : lim<sub>x→0</sub> sin(ax)/x = 1.',
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: 'a^2=a', ask: [{ v: 'a', label: 'a =' }], answer: { a: '2' } },
    explanation: 'Faux : sin(ax)/x = a·sin(ax)/(ax) → a. Avec a = 2, la limite vaut 2.',
  });
}

export function flItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return flMcq(rng, opts);
  if (opts.exam === 'tf') return flTf(rng);
  return flLines(level, rng, opts);
}

export { tConj, tCosSin, tRatio, sayV, valueOf };
export const GEN = { [FL]: flItem };
