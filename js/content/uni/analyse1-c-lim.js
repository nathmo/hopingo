// Generators of module A1, part c (step U2): a1-dl-limits (a limit by DL:
// `series` parts for the numerator and the denominator, then a `limit`
// part), a1-dl-read (f⁽ᵏ⁾(a) = k!·aₖ: `value` parts) and a1-taylor-rest
// (Taylor polynomial, f⁽ⁿ⁺¹⁾, a bound of |f⁽ⁿ⁺¹⁾| and Lagrange's bound:
// `equiv` with rel '≤' on the interval).

import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { walk, replaceAt, stripParen, dependsOn } from '../../cas/ast.js';
import { limit } from '../../cas/limit.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { MT, linesItem, mcq, tfItem } from './kit.js';
import {
  V, q, isQ, modeOf, H, E, KEYS, xp, examOf, fact, coefs, isZero, termAbs, joinTerms,
  polyText, dlText, valuation, blankDL, blanked, assemble, fitLines, uniq,
} from './analyse1-c-kit.js';
import { uText, fText, rd, boxText } from './analyse1-c-dl.js';
import { opData, opBuild } from './analyse1-c-ops.js';
import { t } from '../../i18n.js';

const LIMIT = { kind: 'limit', v: V, to: '0' };
const qt = (c) => c.toString();
const paren = (c) => (c.n < 0 || c.d !== 1 ? `(${c.toString()})` : c.toString());

// ======================================================================
// a1-dl-limits
// ======================================================================

const LI = 'a1-dl-limits';
const LI_SUB = [
  { id: 'dl', label: t('DL du numérateur et du dénominateur'), skill: 'a1-dl-ops' },
  { id: 'limit', label: t('passer à la limite'), skill: LI },
];

// Every usual function call of a text replaced by its DL at order k (the
// outermost call only: e^(cos x − 1) as a whole).
function substDL(text, k) {
  let node = parse(text);
  const paths = [];
  walk(node, (n, path) => {
    const s = n;
    const call = (s.t === 'fn' && s.args.length === 1) || s.t === 'sqrt' || (s.t === 'pow' && stripParen(s.b).t === 'const' && stripParen(s.b).name === 'e');
    if (call && dependsOn(s, V)) { paths.push(path); return false; }
    return true;
  });
  for (const p of paths.reverse()) {
    let sub = node;
    for (const key of p) sub = key.includes('.') ? sub[key.split('.')[0]][Number(key.split('.')[1])] : sub[key];
    node = replaceAt(node, p, { t: 'paren', e: parse(dlText(toText(sub), k)) });
  }
  return toText(node);
}

// f(ax) minus its first terms: e^(2x) − 1 − 2x, x − sin x…
const LIM_F = [
  { F: 'exp', as: [1, 2, 3, -1, -2], drop: [2, 3] },
  { F: 'ln', as: [1, 2, -1], drop: [2, 3] },
  { F: 'sin', as: [1, 2, 3, -1], drop: [3, 5] },
  { F: 'tan', as: [1, 2], drop: [3] },
  { F: 'arctan', as: [1, 2, -1], drop: [3] },
  { F: 'sinh', as: [1, 2], drop: [3] },
  { F: 'cos', as: [1, 2, 3], drop: [2, 4] },
  { F: 'pow', alphas: [q(1, 2), q(-1), q(-1, 2), q(1, 3)], as: [1, 2, -1], drop: [2] },
];
// Quotients whose denominator is not a power of x.
const LIM_SPECIAL = [
  (r) => { const a = r.pick([1, 2, 3]); const u = uText(q(a)); return { N: `${u}-sin(${u})`, D: `x(1-cos(${u}))` }; },
  () => ({ N: 'e^(cos(x)-1)-1+x^2/2', D: 'x^2×sin(x)^2' }),
  () => ({ N: '6arctan(x)-6sin(x)+x^3', D: 'x^5' }),
  () => ({ N: 'x×e^x-sin(x)-x^2', D: 'x^3' }),
  () => ({ N: 'sin(x)-x×cos(x)', D: 'x^3' }),
  () => ({ N: 'ln(1+x)-sin(x)', D: 'x^2' }),
  () => ({ N: 'e^x-1-sin(x)', D: 'x^2' }),
  () => ({ N: 'tan(x)-sin(x)', D: 'x^3' }),
];

function liData(rng) {
  for (let i = 0; i < 200; i++) {
    let N;
    let D;
    if (rng.chance(0.35)) ({ N, D } = rng.pick(LIM_SPECIAL)(rng));
    else {
      const fam = rng.pick(LIM_F);
      const a = q(rng.pick(fam.as));
      const f = fText(fam.F, uText(a), fam.alphas ? rng.pick(fam.alphas) : null);
      const drop = rng.pick(fam.drop);
      const cs = coefs(f, drop + 4);
      const k = cs.findIndex((c, j) => j >= drop && !isZero(c));
      if (k < 0) continue;
      const lowTerms = [];
      for (let j = 0; j < k; j++) if (!isZero(cs[j])) lowTerms.push({ c: cs[j], j });
      if (!lowTerms.length) continue;
      const flip = rng.chance(0.4);
      const parts = flip
        ? [...lowTerms.map((t) => ({ neg: t.c.n < 0, text: termAbs(t.c, t.j) })), { neg: true, text: f }]
        : [{ neg: false, text: f }, ...lowTerms.map((t) => ({ neg: t.c.n > 0, text: termAbs(t.c, t.j) }))];
      N = joinTerms(parts);
      D = `x^${k}`;
    }
    try {
      const d = liBuild(N, D);
      if (!d.L || d.L.n === 0 || Math.abs(d.L.n) > 60 || d.L.d > 120 || d.k > 5) continue;
      for (const p of liParts(d, 4)) fitLines(p.judge, p.start, p.lines, false);
      return d;
    } catch { /* another draw */ }
  }
  return { ...liBuild('x-sin(x)', 'x(1-cos(x))'), fallback: true };
}

function liBuild(N, D) {
  const cd = coefs(D, 8);
  const k = valuation(cd);
  const cn = coefs(N, k);
  if (valuation(cn) !== k) throw new Error('a1c: no finite limit');
  const L = cn[k].div(cd[k]);
  const mono = /^x(\^\d+)?$/.test(D);
  return { N, D, k, L, cN: cn[k], cD: cd[k], mono, dlN: polyText(cn, { rem: k }), dlD: mono ? D : dlText(D, k) };
}

const fx = (t) => (/[+-]/.test(t.replace(/\([^()]*\)/g, '').slice(1)) ? `(${t})` : t);
const liStart = (d) => `${fx(d.N)}/${d.mono ? d.D : `(${d.D})`}`;

const LI_CHOICES = (d) => [
  { id: 'subst', label: t('Remplacer chaque fonction par son DL') },
  { id: 'reduce', label: t('Réduire : garder les termes jusqu\'à {k}', { k: xp(d.k) }) },
  { id: 'quot', label: t('Écrire le quotient des deux DL') },
  { id: 'divide', label: t('Diviser le haut et le bas par {k}', { k: xp(d.k) }) },
  { id: 'limit', label: t('Passer à la limite (ε(x) → 0)') },
  { id: 'low', label: t('Développer seulement jusqu\'à {p1}', { p1: xp(d.k - 1) }), rule: 'a1_dl_order_too_low', why: t('Le dénominateur est en {k} : il faut le numérateur jusqu\'à {k2}.', { k: xp(d.k), k2: xp(d.k) }) },
];

function liParts(d, level, { decision = null } = {}) {
  const series = { kind: 'series', v: V, at: 0, order: d.k };
  const choices = LI_CHOICES(d);
  const sN = substDL(d.N, d.k);
  let nLines = [E(sN, t('DL de chaque fonction'), 'dl', 'subst'), E(d.dlN, t('DL du numérateur à l\'ordre {k}', { k: d.k }), 'dl', 'reduce')];
  if (level <= 2) nLines = [nLines[0], { ...nLines[1], ...blankDL(d.dlN, () => 'coef') }];
  const parts = [{ html: '', start: d.N, judge: series, lines: nLines, choices, pre: decision ? [decision] : [] }];
  if (!d.mono) {
    let dLines = [E(substDL(d.D, d.k), t('DL de chaque fonction'), 'dl', 'subst'), E(d.dlD, t('DL du dénominateur à l\'ordre {k}', { k: d.k }), 'dl', 'reduce')];
    if (level <= 2) dLines = [dLines[0], { ...dLines[1], ...blankDL(d.dlD, () => 'coef') }];
    parts.push({ html: t('Le dénominateur {D} à l\'ordre {k} :', { D: MT(d.D), k: d.k }), start: d.D, judge: series, lines: dLines, choices });
  }
  const top = d.mono ? `${qt(d.cN)}+ε(x)` : `(${qt(d.cN)}+ε(x))/(${qt(d.cD)}+ε(x))`;
  let lLines = [
    E(`(${d.dlN})/${d.mono ? d.D : `(${d.dlD})`}`, t('Remplacer par les DL'), 'limit', 'quot'),
    E(top, t('Diviser par {k}', { k: xp(d.k) }), 'limit', 'divide'),
    E(qt(d.L), 'ε(x) → 0', 'limit', 'limit'),
  ];
  if (level === 1) lLines = [lLines[0], blanked(lLines[1], [qt(d.cN)]), lLines[2]];
  parts.push({ html: t('La limite :'), start: liStart(d), judge: LIMIT, lines: lLines, choices });
  return parts;
}

function liItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'mcq') return liMcq(rng);
  if (opts.exam === 'tf') return liTf(rng);
  const d = liData(rng);
  let decision = null;
  if (level === 2) {
    decision = {
      kind: 'decision', prompt: t('À quel ordre développer le numérateur ?'), options: rng.shuffle([
        { id: 'low', label: t('Ordre {p1}', { p1: d.k - 1 }), valid: false, rule: 'a1_dl_order_too_low', why: t('Il resterait ε(x)/x : le dénominateur est en {k}, il faut aller jusqu\'à {k2}.', { k: xp(d.k), k2: xp(d.k) }) },
        { id: 'k', label: t('Ordre {k}', { k: d.k }), valid: true, ref: true },
        { id: 'high', label: t('Ordre {p1}', { p1: d.k + 1 }), valid: true, quality: 'poor', why: t('Juste, mais le terme en {p1} disparaît à la limite : l\'ordre {k} suffit.', { p1: xp(d.k + 1), k: d.k }) },
      ]),
    };
  } else if (level >= 4) {
    decision = {
      kind: 'decision', prompt: t('Quelle méthode ?'), options: [
        { id: 'dl', label: t('Développements limités'), valid: true, ref: true },
        { id: 'bh', label: t('Règle de Bernoulli-l\'Hôpital'), valid: true, ...(d.k >= 3 ? { quality: 'poor', why: t('Juste, mais il faudrait dériver {k} fois le haut et le bas : les DL sont plus courts.', { k: d.k }) } : {}) },
      ],
    };
  }
  const parts = liParts(d, level, { decision });
  const as = assemble(parts, level);
  const start = liStart(d);
  return linesItem({
    skill: LI, level,
    prompt: t('Calcule {p1} par développements limités.{p2}', { p1: MT(`lim(${start},x,0)`), p2: level === 1 ? t(' Développe à l\'ordre {k}.', { k: d.k }) : '' }),
    ...as, mode: modeOf(level),
    hints: H(t('Le dénominateur commence en {k} : développe le numérateur jusqu\'à {k2}.', { k: xp(d.k), k2: xp(d.k) }), `${rd(d.N)} = □·${xp(d.k)} + ${xp(d.k)}·ε(x)`, `${MT(`(${d.dlN})/${d.mono ? d.D : `(${d.dlD})`}`)} → ${MT(qt(d.L))}`),
    subgoals: LI_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${LI}:${start}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

const valueOf = (node) => { try { return limit(node, V, 0).value; } catch { return null; } };

function liMcq(rng) {
  const d = liData(rng);
  const start = liStart(d);
  const opts = [{ html: MT(qt(d.L)), correct: true }];
  for (const t of trapAnswers('limit', parse(start), LIMIT)) {
    const v = valueOf(t.node);
    if (isQ(v)) opts.push({ html: MT(qt(v)), correct: false, rule: t.rule });
  }
  // The leading coefficient of the numerator alone, a sign slip.
  opts.push({ html: MT(qt(d.L.neg())), correct: false });
  if (!d.cD.eq(1)) opts.push({ html: MT(qt(d.cN)), correct: false });
  opts.push({ html: MT(qt(d.L.mul(fact(d.k)))), correct: false });
  opts.push({ html: '+∞', correct: false });
  return mcq({
    skill: LI, level: 4, prompt: `${MT(`lim(${start},x,0)`)} =`, options: uniq(opts).slice(0, 4), key: `mcq:${start}`,
    exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: !!d.fallback,
    solution: [{ html: `${MT(`(${d.dlN})/${d.mono ? d.D : `(${d.dlD})`}`)} → ${MT(qt(d.L))}`, note: t('DL à l\'ordre {k}', { k: d.k }) }],
  }, rng);
}

function liTf(rng) {
  const kind = rng.pick(['exam', 'cube', 'false2', 'falseA']);
  if (kind === 'exam') {
    const a = rng.pick([1, 2, -1, 3]);
    const b = rng.pick([-2, -1, 1, 2, 3]);
    const f = `${uText(q(a))}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x^3+x^3ε(x)`;
    return tfItem({
      skill: LI, level: 4, truth: true, key: `exam:${f}`,
      statement: t('Si f(x) = {f}, alors lim<sub>x→0</sub> (f(x) − {p1})/x² = 0.', { f: rd(f), p1: rd(uText(q(a))) }),
      explanation: t('Vrai (examen 2018) : (f(x) − {p1})/x² = {b}x + x·ε(x) → 0.', { p1: rd(uText(q(a))), b }),
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  if (kind === 'cube') {
    return tfItem({
      skill: LI, level: 4, truth: true, key: 'cube',
      statement: t('Pour tout réel b : si f(x) = x + bx³ + x³·ε(x), alors lim<sub>x→0</sub> (f(x) − x)/x³ = b.'),
      explanation: t('Vrai : (f(x) − x)/x³ = b + ε(x) → b.'),
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  if (kind === 'false2') {
    return tfItem({
      skill: LI, level: 4, truth: false, key: 'false2', ruleIfTrue: 'a1_dl_order_too_low',
      statement: t('Pour tous réels a, b : si f(x) = ax + bx² + x²·ε(x), alors lim<sub>x→0</sub> f(x)/x² = b.'),
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }], pred: 'a=0', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '1', b: '0' } },
      explanation: t('Faux : si a ≠ 0, f(x)/x² = a/x + b + ε(x) n\'a pas de limite finie. Avec a = 1, b = 0 : f(x)/x² = 1/x + ε(x).'),
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  return tfItem({
    skill: LI, level: 4, truth: false, key: 'falseA', ruleIfTrue: 'a1_dl_factorial_missing',
    statement: t('Pour tout réel a : lim<sub>x→0</sub> (e^(ax) − 1 − ax)/x² = a².'),
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }], pred: 'a^2/2=a^2', ask: [{ v: 'a', label: 'a =' }], answer: { a: '1' } },
    explanation: t('Faux : e^(ax) = 1 + ax + a²x²/2 + x²·ε(x), donc la limite vaut a²/2. Avec a = 1 : 1/2 ≠ 1.'),
    exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

// ======================================================================
// a1-dl-read
// ======================================================================

const RE = 'a1-dl-read';
const RE_SUB = [
  { id: 'dl', label: t('DL'), skill: 'a1-dl-ops' },
  { id: 'read', label: t('lire f⁽ᵏ⁾(a)'), skill: RE },
];
const SUPS = { 1: '′', 2: '″', 3: '‴', 4: '⁽⁴⁾', 5: '⁽⁵⁾', 6: '⁽⁶⁾' };
const dname = (k, a) => `f${SUPS[k]}(${a})`;
const dlabel = (k, a) => `f${"'".repeat(k)}(${a})`;
const hx = (a) => (a === 0 ? 'x' : `(x-${a})`);
// Σ cⱼ·(x − a)ʲ + (x − a)ⁿ·ε(x), as text.
function dlAt(cs, a, n) {
  if (a === 0) return polyText(cs, { rem: n });
  const parts = [];
  cs.forEach((c, j) => {
    if (isZero(c)) return;
    const m = j === 0 ? '' : j === 1 ? hx(a) : `${hx(a)}^${j}`;
    const abs = c.n < 0 ? c.neg() : c;
    let t;
    if (j === 0) t = abs.toString();
    else if (abs.d === 1) t = abs.n === 1 ? m : `${abs.n}${m}`;
    else t = abs.n === 1 ? `${m}/${abs.d}` : `(${abs.n}/${abs.d})${m}`;
    parts.push({ neg: c.n < 0, text: t });
  });
  parts.push({ neg: false, text: `${hx(a)}^${n}ε(x)` });
  return joinTerms(parts);
}

// A value part: f⁽ᵏ⁾(a) = k!·aₖ.
function readPart(k, a, c, level, html) {
  const want = c.mul(fact(k));
  const judge = { kind: 'value', form: 'irreducible', expect: qt(want), read: { k, a: qt(c) } };
  let l1 = E(`${fact(k)}×${paren(c)}`, `${dname(k, a)} = ${k}!·a${k > 9 ? k : String.fromCharCode(0x2080 + k)}`, 'read', 'mult');
  if (level === 1) l1 = blanked(l1, [String(fact(k))]);
  const lines = [l1, E(qt(want), t('Calculer'), 'read', 'compute')];
  return { html, ask: `${dname(k, a)} =`, start: dlabel(k, a), judge, lines, choices: RE_CHOICES };
}
const RE_CHOICES = [
  { id: 'mult', label: t('Multiplier le coefficient aₖ par k!') },
  { id: 'compute', label: t('Calculer') },
  { id: 'read', label: t('Prendre aₖ tel quel'), rule: 'a1_dl_read_factorial', why: t('aₖ = f⁽ᵏ⁾(a)/k! : il faut multiplier par k!.') },
  { id: 'divide', label: t('Diviser aₖ par k!'), rule: 'a1_dl_read_divide', why: t('aₖ = f⁽ᵏ⁾(a)/k!, donc f⁽ᵏ⁾(a) = k!·aₖ : on multiplie.') },
];

// A DL given with chosen coefficients (a = 0 or 1).
function givenData(rng) {
  const a = rng.pick([0, 0, 1]);
  const n = rng.pick([3, 4]);
  const cs = [];
  for (let j = 0; j <= n; j++) {
    const kind = rng.int(0, 3);
    if (j > 0 && kind === 0) cs.push(q(0));
    else if (kind === 1 && j >= 2) cs.push(q(rng.pick([-1, 1, -3, 5, 7]), rng.pick([2, 3, 6].filter((dd) => fact(j) % dd === 0))));
    else cs.push(q(rng.pick([-9, -7, -5, -3, -2, -1, 1, 2, 3, 4, 5, 7, 9])));
  }
  if (isZero(cs[n])) cs[n] = q(rng.pick([-2, -1, 1, 3]));
  const ks = [];
  for (let k = 2; k <= n; k++) if (!isZero(cs[k])) ks.push(k);
  if (!ks.length) cs[2] = q(-5);
  return { a, n, cs, ks: ks.length ? ks : [2] };
}

function reItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'mcq') return reMcq(rng);
  if (opts.exam === 'tf') return reTf(rng);
  if (opts.exam === 'open' || level >= 4) return reComputed(level, rng, opts);
  const g = givenData(rng);
  const ks = rng.shuffle(g.ks).slice(0, level === 3 ? 2 : 1).sort((x, y) => x - y);
  const dl = dlAt(g.cs, g.a, g.n);
  const parts = ks.map((k, i) => readPart(k, g.a, g.cs[k], level, i ? t('Puis {p1} :', { p1: dname(k, g.a) }) : ''));
  if (level === 2) {
    const k = ks[0];
    parts[0].pre = [{
      kind: 'decision', prompt: t('Comment obtenir {p1} à partir du coefficient a{p2} ?', { p1: dname(k, g.a), p2: String.fromCharCode(0x2080 + k) }), options: rng.shuffle([
        { id: 'mult', label: `${dname(k, g.a)} = ${k}!·a${String.fromCharCode(0x2080 + k)}`, valid: true, ref: true },
        { id: 'read', label: `${dname(k, g.a)} = a${String.fromCharCode(0x2080 + k)}`, valid: false, rule: 'a1_dl_read_factorial', why: t('Le coefficient vaut f⁽ᵏ⁾(a)/k! : il faut multiplier par k!.') },
        { id: 'divide', label: `${dname(k, g.a)} = a${String.fromCharCode(0x2080 + k)}/${k}!`, valid: false, rule: 'a1_dl_read_divide', why: t('aₖ = f⁽ᵏ⁾(a)/k!, donc f⁽ᵏ⁾(a) = k!·aₖ : on multiplie.') },
      ]),
    }];
  }
  const as = assemble(parts, level);
  const k0 = ks[0];
  return linesItem({
    skill: RE, level,
    prompt: t('f est de classe C<sup>{n}</sup> et f(x) = {p1} au voisinage de {a}. Calcule {p2}.', { n: g.n, p1: MT(dlAt(g.cs, g.a, g.n)), a: g.a, p2: ks.map((k) => dname(k, g.a)).join(t(' et ')) }),
    ...as, mode: modeOf(level),
    hints: H(t('Le coefficient de (x − a)ᵏ vaut f⁽ᵏ⁾(a)/k!.'), `${dname(k0, g.a)} = □·${paren(g.cs[k0]).replace('-', '−')}`, `${dname(k0, g.a)} = ${fact(k0)}·${paren(g.cs[k0]).replace('-', '−')} = ${qt(g.cs[k0].mul(fact(k0))).replace('-', '−')}`),
    subgoals: RE_SUB, keys: ['calc'], tapActions: level === 3 ? 'steps' : null,
    key: `${RE}:${dl}:${ks.join(',')}`, exam: examOf(opts),
  });
}

// Level 4, 5 and the open variant: the DL to compute first (a product or a
// quotient of a1-dl-ops), then f⁽ᵏ⁾(0).
function reComputed(level, rng, opts) {
  const exam = opts.exam === 'open';
  const n = exam || level === 5 ? 5 : rng.pick([4, 5]);
  const kinds = exam ? ['lnsin', 'sinfrac', 'tan', 'expfrac', 'logistic'] : ['tan', 'sinfrac', 'lnsin', 'expsin', 'cosln', 'sinln', 'logistic', 'expfrac'];
  const d = opData(rng, kinds, { n, den: 720 });
  const b = opBuild(d);
  const ks = [n - 1, n];
  const parts = [
    { html: '', start: b.f, judge: { kind: 'series', v: V, at: 0, order: n }, lines: b.lines, choices: null },
    ...ks.map((k) => readPart(k, 0, b.cs[k], level, t('Déduis-en {p1} :', { p1: dname(k, 0) }))),
  ];
  const as = assemble(parts, level >= 4 ? 4 : level);
  const odd = ks.find((k) => isZero(b.cs[k]));
  return linesItem({
    skill: RE, level: exam ? 4 : level,
    prompt: t('Écris le DL d\'ordre {n} de f(x) = {f} en 0, puis déduis-en {p1}.', { n, f: MT(b.f), p1: ks.map((k) => dname(k, 0)).join(t(' et ')) }),
    ...as, mode: 'free',
    hints: H(t('D\'abord le DL (produit ou quotient de DL usuels). Ensuite, le coefficient de xᵏ vaut f⁽ᵏ⁾(0)/k!{p1}.', { p1: odd ? t(' ; un coefficient nul donne une dérivée nulle') : '' }), boxText(blankDL(b.fin, (j) => (j > 0 ? 'coef' : false))), t('{fin}, puis {p1} = {n}!·a{p2}', { fin: MT(b.fin), p1: dname(n, 0), n, p2: String.fromCharCode(0x2080 + n) })),
    subgoals: RE_SUB, keys: KEYS, noHints: exam || level === 5,
    key: `${RE}:${b.f}:${n}`, exam: exam ? { format: 'open', points: 7 } : examOf(opts), fallback: !!d.fallback,
  });
}

const NATURE = [
  { id: 'min', html: t('un minimum local') },
  { id: 'max', html: t('un maximum local') },
  { id: 'flat', html: t('un point d\'inflexion à tangente horizontale') },
  { id: 'none', html: t('pas de point critique (f′(a) ≠ 0)') },
];

function reMcq(rng) {
  if (rng.chance(0.5)) {
    // Nature of the point (examen MT 2014).
    const a = rng.pick([0, 0, 1]);
    const kind = rng.pick(['min', 'max', 'flat', 'none']);
    const c0 = q(rng.pick([-3, 1, 2, 5, 7]));
    const nz = () => q(rng.pick([-5, -3, -2, -1, 1, 2, 3, 4]));
    const c1 = kind === 'none' ? nz() : q(0);
    const c2 = kind === 'min' ? q(rng.int(1, 5)) : kind === 'max' ? q(-rng.int(1, 5)) : kind === 'flat' ? q(0) : nz();
    const c3 = kind === 'flat' ? nz() : nz();
    const c4 = nz();
    const cs = [c0, c1, c2, c3, c4];
    const dl = dlAt(cs, a, 4);
    const right = NATURE.find((x) => x.id === kind);
    return mcq({
      skill: RE, level: 4, prompt: t('f est de classe C⁴ et f(x) = {dl} au voisinage de {a}. En {a}, f a :', { dl: MT(dl), a }),
      // A flat point (a₂ = 0, a₃ ≠ 0) taken for an extremum.
      options: NATURE.map((x) => ({ html: x.html, correct: x.id === kind, ...(kind === 'flat' && (x.id === 'min' || x.id === 'max') ? { rule: 'g6_critical_is_extremum' } : {}) })), keepOrder: true, key: `nature:${dl}`,
      exam: { format: 'mcq', points: 1 }, expectedSec: 240,
      solution: [{ html: kind === 'none' ? `a₁ = ${qt(c1)} ≠ 0 : f′(${a}) ≠ 0.` : kind === 'flat' ? t('a₁ = a₂ = 0 et a₃ ≠ 0 : f(x) − f({a}) change de signe en {a}, avec une tangente horizontale.', { a }) : t('a₁ = 0 et a₂ = {c2} {p1} 0 : {html}.', { c2: qt(c2), p1: c2.n > 0 ? '>' : '<', html: right.html }), note: '' }],
    }, rng);
  }
  const g = givenData(rng);
  const k = rng.pick(g.ks);
  const c = g.cs[k];
  const want = c.mul(fact(k));
  const opts = [
    { html: MT(qt(want)), correct: true },
    { html: MT(qt(c)), correct: false, rule: 'a1_dl_read_factorial' },
    { html: MT(qt(c.div(fact(k)))), correct: false, rule: 'a1_dl_read_divide' },
    { html: MT(qt(c.mul(fact(k - 1)))), correct: false },
    { html: MT(qt(want.neg())), correct: false },
  ];
  return mcq({
    skill: RE, level: 4, prompt: t('f est de classe C<sup>{n}</sup> et f(x) = {p1} au voisinage de {a}. {p2} =', { n: g.n, p1: MT(dlAt(g.cs, g.a, g.n)), a: g.a, p2: dname(k, g.a) }),
    options: uniq(opts).slice(0, 4), key: `mcq:${dlAt(g.cs, g.a, g.n)}:${k}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
    solution: [{ html: `${dname(k, g.a)} = ${k}!·a${String.fromCharCode(0x2080 + k)} = ${fact(k)}·${paren(c)} = ${qt(want)}`.replace(/-/g, '−'), note: '' }],
  }, rng);
}

function reTf(rng) {
  const kind = rng.pick(['combo', 'combo', 'cn']);
  if (kind === 'cn') {
    return tfItem({
      skill: RE, level: 4, truth: true, key: 'cn',
      statement: t('Toute fonction de classe Cⁿ sur ]a ; b[ admet un DL d\'ordre n en tout point de ]a ; b[.'),
      explanation: t('Vrai : c\'est la formule de Taylor-Young, avec les coefficients f⁽ᵏ⁾(x₀)/k!.'),
      exam: { format: 'tf', points: 1 }, expectedSec: 60,
    });
  }
  // f′(0) + 3f″(0) + f‴(0) for a DL given (examen 2019): true, or the
  // value read without the k! (a Vrai/Faux question, nothing to refute).
  const cs = [1, 2, 3, 4].map(() => q(rng.pick([-3, -2, -1, 1, 2, 3])));
  const dl = polyText([q(1), ...cs], { rem: 4 });
  const right = cs[0].add(cs[1].mul(6)).add(cs[2].mul(6));
  const naive = cs[0].add(cs[1].mul(3)).add(cs[2]);
  const truth = rng.chance(0.5) || naive.eq(right);
  const shown = truth ? right : naive;
  const statement = t('f est de classe C⁵ et f(x) = {dl}. Alors f′(0) + 3f″(0) + f‴(0) = {p1}.', { dl: rd(dl), p1: qt(shown).replace('-', '−') });
  const why = t('f′(0) = a₁ = {p1}, f″(0) = 2·a₂ = {p2}, f‴(0) = 6·a₃ = {p3} : la somme vaut {right}.', { p1: qt(cs[0]), p2: qt(cs[1].mul(2)), p3: qt(cs[2].mul(6)), right: qt(right) }).replace(/-/g, '−');
  if (truth) {
    return tfItem({ skill: RE, level: 4, truth: true, key: `combo:${dl}`, statement, explanation: t('Vrai : {why}', { why }), exam: { format: 'tf', points: 1 }, expectedSec: 60 });
  }
  return {
    ...mcq({
      skill: RE, level: 4, prompt: t('Vrai ou faux ? <br>« {statement} »', { statement }),
      options: [{ html: t('Vrai'), correct: false, rule: 'a1_dl_read_factorial' }, { html: t('Faux'), correct: true }],
      keepOrder: true, key: `tf:combo:${dl}`, expectedSec: 60, solution: [{ html: t('Faux : {why}', { why }), note: '' }],
    }, rng),
    exam: { format: 'tf', points: 1 },
  };
}

// ======================================================================
// a1-taylor-rest
// ======================================================================

const TA = 'a1-taylor-rest';
const TA_SUB = [
  { id: 'taylor', label: t('polynôme de Taylor'), skill: 'a1-dl-usual' },
  { id: 'deriv', label: t('dérivée d\'ordre n + 1'), skill: 'a1-deriv-rules' },
  { id: 'bound', label: t('majorer le reste'), skill: TA },
];
const X0S = [q(1, 10), q(1, 5), q(1, 2)];
const binomH = (k) => { let c = q(1); for (let i = 0; i < k; i++) c = c.mul(q(1, 2).sub(i)).div(i + 1); return c; };
// f, its (n+1)-th derivative, the maximum of its absolute value on [0 ; x₀]
// (M, written; Mopt, the exact maximum as a number), its value at 0.
const TAY = {
  sqrt: { f: '√(1+x)', name: '√(1 + x)', ns: [1, 2, 3], deriv: (m) => { const c = binomH(m).mul(fact(m)); return `${c.n < 0 ? '-' : ''}(${(c.n < 0 ? c.neg() : c).toString()})(1+x)^(${q(1, 2).sub(m).toString()})`; }, M: (m) => { const c = binomH(m).mul(fact(m)); return c.n < 0 ? c.neg() : c; } },
  ln: { f: 'ln(1+x)', name: 'Log(1 + x)', ns: [1, 2, 3], deriv: (m) => `${m % 2 ? '' : '-'}${fact(m - 1)}/(1+x)^${m}`, M: (m) => q(fact(m - 1)) },
  exp: { f: 'e^x', name: 'eˣ', ns: [1, 2, 3], deriv: () => 'e^x', M: () => q(2), opt: (x0) => Math.exp(x0.valueOf()), at0: () => q(1) },
  sin: { f: 'sin(x)', name: 'sin x', ns: [2], deriv: () => '-cos(x)', M: () => q(1) },
};
const decimal = (c) => { let d = c.d; for (const p of [2, 5]) while (d % p === 0) d /= p; return d === 1; };
const decText = (c) => (decimal(c) ? String(c.n / c.d) : c.toString());
// A rational just above x (for the bounds of the judge).
const ratAbove = (x) => { const s = 1e9; return `${Math.ceil(x * s)}/${s}`; };

function taData(rng) {
  for (let i = 0; i < 200; i++) {
    const key = rng.pick(Object.keys(TAY));
    const T = TAY[key];
    const n = rng.pick(T.ns);
    const x0 = rng.pick(X0S);
    const m = n + 1;
    const cs = coefs(T.f, n);
    const Tx = cs.reduce((s, c, k) => s.add(c.mul(x0.pow(k))), q(0));
    const M = T.M(m);
    const B = M.mul(x0.pow(m)).div(fact(m));
    if (B.d > 1e6 || Tx.d > 1e6) continue;
    return { key, T, n, m, x0, cs, Tx, M, B };
  }
  const T = TAY.sqrt;
  return { key: 'sqrt', T, n: 2, m: 3, x0: q(1, 10), cs: coefs(T.f, 2), Tx: q(839, 800), M: q(3, 8), B: q(1, 16000), fallback: true };
}

function taParts(d, level) {
  const { T, n, m, x0, cs } = d;
  const X = `(${x0.toString()})`;
  const Tn = polyText(cs);
  const parts = [];
  const choices = TA_CHOICES(d);
  if (level >= 3) {
    parts.push({ html: '', start: T.f, judge: { kind: 'series', v: V, at: 0, order: n }, lines: [E(polyText(cs, { rem: n }), t('DL d\'ordre {n} de {name}', { n, name: T.name }), 'taylor', 'taylor')], choices });
    const sub = joinTerms(cs.map((c, k) => (isZero(c) ? null : { neg: c.n < 0, text: k === 0 ? (c.n < 0 ? c.neg() : c).toString() : `${(c.n < 0 ? c.neg() : c).eq(1) ? '' : `(${(c.n < 0 ? c.neg() : c).toString()})`}${k === 1 ? X : `${X}^${k}`}` })).filter(Boolean));
    if (cs.filter((c) => !isZero(c)).length > 1) parts.push({ html: t('Approximation T<sub>{n}</sub>({p1}) :', { n, p1: decText(x0).replace('.', ',') }), ask: `T${String.fromCharCode(0x2080 + n)}(${decText(x0).replace('.', ',')}) =`, start: sub, judge: { kind: 'value', form: 'any' }, lines: [E(decText(d.Tx), t('Calculer'), 'taylor', 'eval')], choices });
  }
  if (level >= 2) {
    const dl = E(T.deriv(m), t('Dériver {m} fois', { m }), 'deriv', 'deriv');
    parts.push({ html: t('La dérivée d\'ordre {m} :', { m }), ask: `f${SUPS[m]}(x) =`, start: `d(${T.f},x,${m})`, judge: { kind: 'equiv', vars: [V], domain: { x: [0, 1] }, target: 'no-prime' }, lines: [level === 2 ? blanked(dl, [T.deriv(m).match(/\(([^()]*)\)\(1\+x\)/)?.[1] ?? String(fact(m - 1))]) : dl], choices });
  }
  const Mopt = T.opt ? T.opt(x0) : d.M.valueOf();
  const Mlines = [E(d.M.toString(), d.key === 'exp' ? t('eˣ ≤ e^{p1} < 2 sur [0 ; {p2}]', { p1: decText(x0).replace('.', ','), p2: decText(x0).replace('.', ',') }) : t('Majorer sur tout [0 ; {p1}]', { p1: decText(x0).replace('.', ',') }), 'bound', 'max')];
  const at0 = T.at0 ? [T.at0().toString(), `${T.at0().toString()}×x^${m}/${fact(m)}`, d.B.div(d.M).mul(T.at0()).toString()] : null;
  parts.push({
    html: t('Majore |f{p1}(x)| pour x ∈ [0 ; {p2}] :', { p1: SUPS[m], p2: decText(x0).replace('.', ',') }), ask: 'M =', start: `|${T.deriv(m)}|`,
    pre: level !== 2 ? [] : [{
      kind: 'decision', prompt: t('Où majorer |f{p1}(c)| ?', { p1: SUPS[m] }), options: [
        { id: 'all', label: t('Sur tout [0 ; {p1}] : c y est quelque part', { p1: decText(x0).replace('.', ',') }), valid: true, ref: true },
        { id: 'at0', label: t('En 0 seulement : le développement est fait en 0'), valid: false, rule: 'a1_taylor_rest_at_a', why: t('c est entre 0 et x, pas forcément en 0 : il faut le maximum sur tout l\'intervalle.') },
      ],
    }],
    judge: { kind: 'equiv', vars: [V], domain: { x: [0, x0.valueOf()] }, rel: '≤', target: 'constant', bound: ratAbove(2 * Mopt), ...(at0 ? { taylorAt: at0, taylorX: decText(x0).replace('.', ',') } : {}) },
    lines: level === 1 ? [{ ...Mlines[0], ...blankDL(Mlines[0].math, () => 'term') }] : Mlines, choices,
  });
  const Mt = d.M.eq(1) ? '' : `${paren(d.M)}×`;
  const Bopt = Mopt * x0.valueOf() ** m / fact(m);
  let bl = [
    E(`${Mt}x^${m}/${fact(m)}`, t('Lagrange : |R{p1}(x)| ≤ M·{m}/{m2}!', { p1: String.fromCharCode(0x2080 + n), m: xp(m), m2: m }), 'bound', 'lagrange'),
    E(`${Mt}${X}^${m}/${fact(m)}`, `x ≤ ${decText(x0).replace('.', ',')}`, 'bound', 'lagrange'),
    E(d.B.toString(), t('Calculer'), 'bound', 'compute'),
  ];
  if (level === 1) bl = [blanked(bl[0], [d.M.toString()]), bl[1], bl[2]];
  parts.push({
    html: t('Majore l\'erreur |f(x) − T<sub>{n}</sub>(x)| pour x ∈ [0 ; {p1}] :', { n, p1: decText(x0).replace('.', ',') }), ask: '|Rₙ| ≤',
    start: `|${T.f}-(${Tn})|`,
    judge: { kind: 'equiv', vars: [V], domain: { x: [0, x0.valueOf()] }, rel: '≤', target: 'constant', bound: ratAbove(2 * Bopt), ...(at0 ? { taylorAt: at0, taylorX: decText(x0).replace('.', ',') } : {}) },
    lines: bl, choices,
  });
  return parts;
}

const TA_CHOICES = (d) => [
  { id: 'taylor', label: t('Écrire le polynôme de Taylor T{p1}', { p1: String.fromCharCode(0x2080 + d.n) }) },
  { id: 'eval', label: t('Évaluer le polynôme en x₀') },
  { id: 'deriv', label: t('Dériver {m} fois', { m: d.m }) },
  { id: 'max', label: t('Majorer |f{p1}| sur tout l\'intervalle', { p1: SUPS[d.m] }) },
  { id: 'at0', label: t('Prendre |f{p1}(0)|', { p1: SUPS[d.m] }), rule: 'a1_taylor_rest_at_a', why: t('c est quelque part entre 0 et x : il faut majorer sur tout l\'intervalle.') },
  { id: 'lagrange', label: t('Borne de Lagrange M·{m}/{m2}!', { m: xp(d.m), m2: d.m }) },
  { id: 'compute', label: t('Calculer') },
];

function taItem(level, rng, profile, opts) {
  opts = opts || {};
  if (opts.exam === 'tf') return taTf(rng);
  const d = taData(rng);
  const parts = taParts(d, level);
  const x0t = decText(d.x0).replace('.', ',');
  const Tn = polyText(d.cs);
  if (level === 5) {
    // Then the smallest n for a precision 10⁻ᵏ (same bound M for every n).
    const fam = d.key === 'ln' ? { M: (j) => q(fact(j)), w: '|f⁽ⁿ⁺¹⁾(c)| ≤ n!' } : d.key === 'sin' ? { M: () => q(1), w: '|f⁽ⁿ⁺¹⁾(c)| ≤ 1' } : d.key === 'exp' ? { M: () => q(2), w: '|f⁽ⁿ⁺¹⁾(c)| ≤ 2' } : null;
    if (fam) {
      const eps = rng.pick([3, 4, 5]);
      let nn = 0;
      while (fam.M(nn).mul(d.x0.pow(nn + 1)).div(fact(nn + 1)).valueOf() > 10 ** -eps && nn < 20) nn++;
      parts.push({ html: t('Avec {w} sur [0 ; {x0t}], quel est le plus petit n tel que la borne de Lagrange garantisse |f({x0t}) − Tₙ({x0t})| ≤ 10<sup>−{eps}</sup> ?', { w: fam.w, x0t, eps }), ask: 'n =', start: 'n', judge: { kind: 'value', form: 'irreducible', expect: String(nn) }, lines: [E(String(nn), t('Essayer n = 1, 2, 3…'), 'bound')] });
    }
  }
  const as = assemble(parts, level);
  const given = level <= 2 ? t(' On donne T<sub>{n}</sub>(x) = {Tn}{p1}.', { n: d.n, Tn: MT(Tn), p1: level === 1 ? t(' et f{p1}(x) = {p2}', { p1: SUPS[d.m], p2: MT(d.T.deriv(d.m)) }) : '' }) : '';
  return linesItem({
    skill: TA, level,
    prompt: t('On approche f(x) = {f} par son polynôme de Taylor T<sub>{n}</sub> en 0, pour x ∈ [0 ; {x0t}].{given} Majore l\'erreur avec le reste de Lagrange.', { f: MT(d.T.f), n: d.n, x0t, given }),
    ...as, mode: modeOf(level),
    hints: H(t('Reste de Lagrange : f(x) − T{p1}(x) = f{p2}(c)·{m}/{m2}! avec c entre 0 et x. Majore |f{p2}| sur tout [0 ; {x0t}].', { p1: String.fromCharCode(0x2080 + d.n), p2: SUPS[d.m], m: xp(d.m), m2: d.m, x0t }), `|R${String.fromCharCode(0x2080 + d.n)}| ≤ □·(${x0t})^${d.m}/${fact(d.m)}`, `|R${String.fromCharCode(0x2080 + d.n)}| ≤ ${d.M.toString()}·(${x0t})^${d.m}/${fact(d.m)} = ${d.B.toString()}`),
    subgoals: TA_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${TA}:${d.T.f}:${d.n}:${d.x0.toString()}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

function taTf(rng) {
  const bank = [
    { s: '|eˣ − (1 + x)| ≤ x²/2 pour tout x ∈ [0 ; 1].', truth: false, pred: '0≤x≤1⇒e^x-(1+x)≤x^2/2', ans: '1', why: 'Faux : le reste de Lagrange est e^c·x²/2 avec c ∈ [0 ; x], et e^c peut valoir plus que 1. Avec x = 1 : e − 2 ≈ 0,718 > 1/2. Le bon majorant est e·x²/2.' },
    { s: '|eˣ − (1 + x + x²/2)| ≤ x³/6 pour tout x ∈ [0 ; 1].', truth: false, pred: '0≤x≤1⇒e^x-(1+x+x^2/2)≤x^3/6', ans: '1', why: 'Faux : le reste est e^c·x³/6 et e^c > 1. Avec x = 1 : e − 2,5 ≈ 0,218 > 1/6.' },
    { s: '|eˣ − 1| ≤ |x| pour tout x ∈ [0 ; 1].', truth: false, pred: '0≤x≤1⇒e^x-1≤x', ans: '1', why: 'Faux : e^x − 1 = e^c·x ≥ x. Avec x = 1 : e − 1 ≈ 1,718 > 1.' },
    { s: '|sin x − x| ≤ |x|³/6 pour tout réel x.', truth: true, why: 'Vrai : le reste de Lagrange d\'ordre 2 est −cos(c)·x³/6, et |cos c| ≤ 1.' },
    { s: '|Log(1 + x) − x| ≤ x²/2 pour tout x ≥ 0.', truth: true, why: 'Vrai : le reste est −x²/(2(1 + c)²) avec c ∈ [0 ; x], et 1/(1 + c)² ≤ 1.' },
    { s: '|√(1 + x) − (1 + x/2)| ≤ x²/8 pour tout x ≥ 0.', truth: true, why: 'Vrai : f″(c) = −(1/4)(1 + c)^(−3/2), de valeur absolue ≤ 1/4 pour c ≥ 0, d\'où |R₁| ≤ (1/4)·x²/2 = x²/8.' },
    { s: '|cos x − 1| ≤ x²/2 pour tout réel x.', truth: true, why: 'Vrai : le reste de Lagrange d\'ordre 1 est −cos(c)·x²/2, et |cos c| ≤ 1.' },
  ];
  const b = rng.pick(bank);
  return tfItem({
    skill: TA, level: 4, truth: b.truth, key: b.s, statement: t(b.s), ruleIfTrue: b.truth ? null : 'a1_taylor_rest_at_a',
    counter: b.truth ? null : { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: b.pred, hyp: '0≤x≤1', ask: [{ v: 'x', label: 'x =' }], answer: { x: b.ans } },
    explanation: t(b.why), exam: { format: 'tf', points: 1 }, expectedSec: 60,
  });
}

export const GEN = {
  [LI]: liItem,
  [RE]: reItem,
  [TA]: taItem,
};
