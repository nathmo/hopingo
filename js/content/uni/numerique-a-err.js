// n-err-abs-rel and n-err-float (module N, part a, step U9): absolute and
// relative errors; floating point, cancellation. Catalogue:
// docs/universite/N-analyse-numerique.md.
//
// n-err-abs-rel. x = p/q (q ∈ {3, 6, 7, 9, 11}), x̃ its rounding to d ∈ {2, 3,
// 4} significant digits; e_abs = |x̃ − x| and e_rel = e_abs/|x| are exact
// fractions (denominator of e_rel ≤ 10⁵). L1 guided lines (common
// denominator, then the division), L2 the same with the decision « divide
// by x or x̃ », L3 menus, L4 two pairs ranked differently by e_abs and e_rel
// (gabarit 3), L5 a table of Newton iterates to read. The program
// errors(x, xt) is level 1 (a choice hole), 2 (a typed hole) or 4 (both
// holes) one time in three. Exam: mcq (e_rel of gabarit 1, or a measurement
// in % of gabarit 2), tf (a true rounding statement, or « e_abs ≤ 10⁻³ ⇒
// 3 significant digits », false with x = 10⁻⁴, x̃ = 0).
//
// n-err-float. Three cancellations at 4 significant digits (judge value
// {arith: 'fp', digits: 4}, js/cas/fp.js): √(N + 1) − √N, the small root of
// x² − bx + 1 (b = 10ᵏ), 1 − cos x (x small). Kept when the naive form has
// a relative error ≥ 10 % and the stable one ≤ 0,1 %. L1 the naive value
// is given, the stable form is guided; L2 both guided, the rewriting chosen
// in a decision; L3 menus, with the rewriting as an exact line (equiv);
// L4 both forms and their relative errors, or a table of (1 − cos x)/x² in
// double precision to read; L5 the program (g_stable, small_root).
// Exam: mcq « which formula is stable », tf (absorption in double
// precision, as a two-option choice; « the rounding error is about 10⁻¹⁶
// in absolute value », false with x = 10²⁰).

import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';
import { fl, fpEval, fpText } from '../../cas/fp.js';
import { parse } from '../../cas/parse.js';
import { linesItem, mcq, tfItem, answerItem, examTag } from './kit.js';
import {
  refCode, codeItem, holesFor, readtableItem, expText, H, blankBy, vfMcq,
} from './numerique-kit.js';

const EA = 'n-err-abs-rel';
const EF = 'n-err-float';
const KEYS = ['calc'];

const fr = (s) => String(s).replace(/\./g, ',').replace(/-/g, '−').replace(/\^2/g, '²').replace(/×/g, '·');
// A rational as the screen writes it: a decimal when finite, else a fraction.
const qText = (x) => x.toDecimal?.() ?? String(x);
const frac = (x) => String(x);
const menuOf = (items, active) => items.map((o) => ({ id: o.id, label: o.label, valid: o.id === active, why: o.id === active ? undefined : o.why || t('Pas maintenant : ce n\'est pas l\'étape suivante.') }));

// ======================================================================
// n-err-abs-rel
// ======================================================================

const SUB_EA = [
  { id: 'abs', label: t('erreur absolue'), skill: EA },
  { id: 'rel', label: t('erreur relative'), skill: EA },
  { id: 'denom', label: t('même dénominateur'), skill: 'cm-round' },
  { id: 'pct', label: t('en pourcentage'), skill: 'pct-which' },
];

// A rational x = p/q and its rounding to d significant digits.
function eaData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    const q = rng.pick([3, 6, 7, 9, 11]);
    const p = rng.int(1, 5 * q - 1);
    const x = new Q(p, q);
    if (x.d === 1) continue;
    const d = rng.pick([2, 3, 4]);
    const xtText = String(Number((p / q).toPrecision(d)));
    if (/e/.test(xtText)) continue;
    const xt = Q.fromDecimal(xtText);
    if (xt.eq(x)) continue;
    const ea = xt.sub(x);
    const eaAbs = ea.n < 0 ? ea.neg() : ea;
    const er = eaAbs.div(x);
    if (er.d > 100000) continue;
    return { x, xt, xtT: fr(xtText), ea: eaAbs, signed: x.sub(xt), er, d };
  }
  const x = new Q(2, 3);
  const xt = new Q(667, 1000);
  return { x, xt, xtT: '0,667', ea: new Q(1, 3000), signed: new Q(-1, 3000), er: new Q(1, 2000), d: 3, fallback: true };
}

// |x̃ − x| over a common denominator: |a/D − b/D|.
function common(dd) {
  const D = dd.x.d * dd.xt.d / gcd(dd.x.d, dd.xt.d);
  return { D, a: dd.xt.n * (D / dd.xt.d), b: dd.x.n * (D / dd.x.d) };
}
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return Math.abs(a); }

const absCfg = (dd) => ({ x: frac(dd.x), xt: frac(dd.xt) });

const EA_MENU = [
  { id: 'denom', label: t('Mettre au même dénominateur'), why: t('C\'est fait : simplifie maintenant, ou passe à l\'erreur relative.') },
  { id: 'divx', label: t('Diviser par |x| (la valeur exacte)'), why: t('D\'abord l\'erreur absolue.') },
  { id: 'divxt', label: t('Diviser par |x̃| (l\'approximation)'), why: t('L\'erreur relative se rapporte à la valeur exacte x, pas à x̃.') },
  { id: 'round', label: t('Arrondir à 2 chiffres'), why: t('On garde la valeur exacte : arrondir ajouterait une erreur.') },
];

function eaScript(dd, { guided, decision, menu }) {
  const c = common(dd);
  const absLine = `|${c.a}/${c.D}-${c.b}/${c.D}|`;
  const M = (id) => (menu ? { menu: menuOf(EA_MENU, id) } : {});
  const relStart = `(${frac(dd.ea)})/(${frac(dd.x)})`;
  const script = [
    { kind: 'eq', math: absLine, ...(guided ? blankBy(absLine, [String(c.a), String(c.b)]) : {}), note: t('Même dénominateur'), subgoal: 'denom' },
    { kind: 'eq', math: frac(dd.ea), ...(guided === 2 ? blankBy(frac(dd.ea), [frac(dd.ea)]) : {}), note: 'e_abs', subgoal: 'abs' },
    { kind: 'segment', html: t('L\'erreur relative : e_rel = e_abs/|x|.'), ask: 'e_rel =', start: { math: 'E_r' }, judge: { kind: 'value', expect: frac(dd.er), form: 'irreducible', relerr: absCfg(dd), ...M('divx') } },
  ];
  if (decision) {
    script.push({
      kind: 'decision', prompt: t('Par quoi divises-tu l\'erreur absolue ?'), options: [
        { id: 'x', label: t('Par |x| = {x}, la valeur exacte', { x: frac(dd.x) }), valid: true, ref: true },
        { id: 'xt', label: t('Par |x̃| = {xt}, l\'approximation', { xt: dd.xtT }), valid: false, rule: 'n_rel_by_approx', why: t('L\'erreur relative se rapporte à la valeur exacte x.') },
      ],
    });
  }
  script.push(
    { kind: 'eq', math: relStart, ...(guided ? blankBy(relStart, [frac(dd.x)]) : {}), note: t('On divise par la valeur exacte'), subgoal: 'rel' },
    { kind: 'eq', math: frac(dd.er), ...(guided ? blankBy(frac(dd.er), [frac(dd.er)]) : {}), note: dd.er.toDecimal() ? `= ${dd.er.toDecimal()}` : t('Fraction irréductible'), subgoal: 'rel' },
  );
  return script;
}

function eaLines(rng, level) {
  const dd = eaData(rng);
  const c = common(dd);
  const guided = level === 1 ? 2 : level === 2 ? 1 : 0;
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  return linesItem({
    skill: EA, level, mode, keys: KEYS, tapActions: level === 3 ? 'menu' : null,
    prompt: t('x = {x} est approché par x̃ = {xt} (arrondi à {d} chiffres significatifs). Calcule l\'erreur absolue e_abs = |x̃ − x|, puis l\'erreur relative e_rel = e_abs/|x|, en fractions exactes.', { x: frac(dd.x), xt: dd.xtT, d: dd.d }),
    start: `|${dd.xtT}-${frac(dd.x)}|`,
    judge: { kind: 'value', form: 'irreducible', abserr: absCfg(dd), ...(level === 3 ? { menu: menuOf(EA_MENU, 'denom') } : {}) },
    script: eaScript(dd, { guided, decision: level === 2, menu: level === 3 }),
    hints: H(t('L\'erreur relative divise l\'erreur absolue par la valeur <b>exacte</b> x.'),
      `e_rel = (${frac(dd.ea)})/|□|`,
      `e_abs = |${c.a}/${c.D} − ${c.b}/${c.D}| = ${frac(dd.ea)}, e_rel = (${frac(dd.ea)})/(${frac(dd.x)}) = ${frac(dd.er)}.`),
    subgoals: SUB_EA, key: `${EA}:${level}:${dd.x}:${dd.xtT}`, baits: ['n_rel_by_approx', 'n_abs_signed'], fallback: dd.fallback,
  });
}

// Gabarit 3: two pairs ranked differently by e_abs and e_rel.
function pairsData(rng) {
  const N = rng.pick([200, 500, 1000, 2000]);
  const dA = rng.pick([1, 2]);
  const s = rng.pick([1, 2, 5]);
  const u = rng.pick([1, 2]);
  const A = { x: new Q(N), xt: new Q(N - dA) };
  const B = { x: new Q(s, 100), xt: new Q(s * 10 + u, 1000) };
  for (const P of [A, B]) {
    const e = P.xt.sub(P.x);
    P.ea = e.n < 0 ? e.neg() : e;
    P.er = P.ea.div(P.x);
  }
  return { A, B };
}

function eaLevel4(rng) {
  const { A, B } = pairsData(rng);
  const seg = (P, name, abs) => (abs
    ? { kind: 'segment', html: t('e_abs de {name}.', { name }), ask: `e_abs(${name}) =`, start: { math: 'E' }, judge: { kind: 'value', expect: frac(P.ea), form: 'any', abserr: { x: frac(P.x), xt: frac(P.xt) } } }
    : { kind: 'segment', html: t('e_rel de {name}.', { name }), ask: `e_rel(${name}) =`, start: { math: 'E_r' }, judge: { kind: 'value', expect: frac(P.er), form: 'any', relerr: { x: frac(P.x), xt: frac(P.xt) } } });
  const segs = [
    [seg(A, 'A', true), { kind: 'eq', math: qText(A.ea), note: `|${qText(A.xt)} − ${qText(A.x)}|`, subgoal: 'abs' }],
    [seg(A, 'A', false), { kind: 'eq', math: qText(A.er), note: `${qText(A.ea)}/${qText(A.x)}`, subgoal: 'rel' }],
    [seg(B, 'B', true), { kind: 'eq', math: qText(B.ea), note: `|${qText(B.xt)} − ${qText(B.x)}|`, subgoal: 'abs' }],
    [seg(B, 'B', false), { kind: 'eq', math: qText(B.er), note: `${qText(B.ea)}/${qText(B.x)}`, subgoal: 'rel' }],
  ];
  const [first, ...rest] = segs;
  const script = [{ kind: 'note', html: first[0].html }, first[1], ...rest.flat()];
  script.push(
    { kind: 'segment', html: t('Quelle approximation est la meilleure au sens relatif ? Écris son x̃.'), ask: 'x̃ =', start: { math: 'X' }, judge: { kind: 'value', expect: frac(A.xt), form: 'any' } },
    { kind: 'eq', math: qText(A.xt), note: t('{a} < {b}, alors que e_abs(A) > e_abs(B)', { a: qText(A.er), b: qText(B.er) }), subgoal: 'rel' },
  );
  return linesItem({
    skill: EA, level: 4, mode: 'free', keys: KEYS,
    prompt: t('Deux mesures : A, x = {ax} approché par x̃ = {axt} ; B, x = {bx} approché par x̃ = {bxt}. Calcule les erreurs absolues et relatives (décimaux exacts), puis dis quelle approximation est la meilleure au sens relatif.', { ax: qText(A.x), axt: qText(A.xt), bx: fr(qText(B.x)), bxt: fr(qText(B.xt)) }),
    start: first[0].start.math, judge: first[0].judge, script,
    hints: H(t('L\'erreur absolue dépend de l\'échelle ; l\'erreur relative la divise par |x| pour comparer.'),
      `e_rel(B) = ${fr(qText(B.ea))}/□`,
      t('e_rel(A) = {a}, e_rel(B) = {b} : A est meilleure en relatif.', { a: fr(qText(A.er)), b: fr(qText(B.er)) })),
    subgoals: SUB_EA, key: `${EA}:4:${A.x}:${A.xt}:${B.x}:${B.xt}`, baits: ['n_rel_by_approx', 'n_abs_signed'],
  });
}

// The program errors(x, xt) (catalogue « Item code »).
const ERRORS = refCode(`def errors(x, xt):
    ea = «abs(x - xt)»
    er = «ea / abs(x)»
    return [ea, er]
`);
const ERR_TRAPS = {
  0: [{ text: 'x - xt', rule: 'n_abs_signed' }, { text: 'xt - x', rule: 'n_abs_signed' }],
  1: [{ text: 'ea / abs(xt)', rule: 'n_rel_by_approx' }, { text: 'ea / x', rule: 'n_abs_signed' }],
};
const ERR_FILL = { 0: ['abs(x) - abs(xt)'], 1: ['ea * abs(x)'] };
const ERR_TESTS = [
  { expr: 'errors(2/3, 0.667)', expect: '[3.3333333333e-4, 5.0e-4]', tol: 1e-6 },
  { expr: 'errors(1000, 999)', expect: '[1, 0.001]' },
  { expr: 'errors(-2, -2.1)', expect: '[0.1, 0.05]', tol: 1e-9 },
];

function eaCode(rng, level) {
  const blanks = level === 4 ? [0, 1] : [1];
  return codeItem({
    skill: EA, level, ref: ERRORS, blanks, choice: level === 1 ? 1 : undefined, traps: ERR_TRAPS, fillers: ERR_FILL, rng,
    prompt: t('Complète la fonction errors(x, xt), qui renvoie [erreur absolue, erreur relative] de l\'approximation xt de la valeur exacte x (x ≠ 0).'),
    tests: ERR_TESTS,
    hints: H(t('Une erreur est une distance (valeur absolue) ; l\'erreur relative divise par la valeur exacte.'),
      'er = ea / abs(□)',
      'ea = abs(x - xt), er = ea / abs(x).'),
    subgoals: SUB_EA, key: `${level}:${blanks.join('')}`,
  });
}

// L5: the Newton iterates for √c, to read.
function newtonIterates(c, x0, n) {
  const xs = [x0];
  for (let k = 1; k < n; k++) xs.push((xs[k - 1] * xs[k - 1] + c) / (2 * xs[k - 1]));
  return xs;
}
function eaLevel5(rng) {
  const [c, x0] = rng.pick([[2, 1], [3, 2], [5, 2], [7, 3], [6, 2], [10, 3]]);
  const alpha = Math.sqrt(c);
  const xs = newtonIterates(c, x0, 5).map((x) => Number(x.toFixed(7)));
  const ers = xs.map((x) => Math.abs(x - alpha) / alpha);
  const k = ers.findIndex((e) => e <= 5e-5);
  const question = answerItem({
    skill: EA, level: 5, key: `${c}:${x0}`, expected: String(k),
    prompt: t('À partir de quel k l\'itéré x⁽ᵏ⁾ a-t-il 5 chiffres significatifs exacts, c\'est-à-dire e_rel ≤ 5·10⁻⁵ ?'),
    solution: xs.map((x, j) => ({ html: `k = ${j} : e_abs = ${fr(expText(Math.abs(x - alpha), 1))}, e_rel = ${fr(expText(ers[j], 1))}${j === k ? ' ≤ 5·10⁻⁵' : ''}`, note: '' })),
  });
  return readtableItem({
    skill: EA, level: 5, key: `${c}:${x0}`,
    prompt: t('Itérés de Newton pour √{c} ≈ {alpha}, à partir de x⁽⁰⁾ = {x0}. Calcule les erreurs relatives.', { c, alpha: fr(alpha.toFixed(8)), x0 }),
    table: { columns: ['k', 'x⁽ᵏ⁾'], rows: xs.map((x, j) => [String(j), fr(x.toFixed(7))]) },
    question, subgoals: SUB_EA,
  });
}

// ---------- exam ----------

function eaMcq(rng, opts) {
  if (rng.chance(0.5)) {
    const dd = eaData(rng);
    const byApprox = dd.ea.div(dd.xt);
    const opt = [{ html: frac(dd.er), correct: true }, { html: frac(byApprox), correct: false, rule: 'n_rel_by_approx' }];
    const signed = dd.signed.div(dd.x);
    if (signed.n < 0) opt.push({ html: fr(frac(signed)), correct: false, rule: 'n_abs_signed' });
    opt.push({ html: frac(dd.ea), correct: false });
    opt.push({ html: frac(dd.er.mul(10)), correct: false });
    const seen = new Set();
    const options = opt.filter((o) => !seen.has(o.html) && seen.add(o.html)).slice(0, 4);
    return mcq({
      skill: EA, level: 4, key: `${EA}:mcq:${dd.x}:${dd.xtT}`, exam: examTag(opts),
      prompt: t('x = {x} est approché par x̃ = {xt}. Quelle est l\'erreur relative ?', { x: frac(dd.x), xt: dd.xtT }),
      options, solution: [{ html: `e_rel = |x̃ − x|/|x| = (${frac(dd.ea)})/(${frac(dd.x)}) = ${frac(dd.er)}.`, note: '' }],
    }, rng);
  }
  // Gabarit 2: a measurement, the relative error in %.
  const L = rng.pick(['12,5', '25', '8', '40', '2,5', '50']);
  const dl = rng.pick(['0,05', '0,1', '0,02']);
  const Lq = Q.fromDecimal(L);
  const dq = Q.fromDecimal(dl);
  const pct = dq.div(Lq).mul(100);
  const w1 = dq.div(Lq);
  const w2 = dq.mul(100);
  const w3 = pct.mul(10);
  const cands = [{ html: `${fr(qText(pct))} %`, correct: true }, { html: `${fr(qText(w1))} %`, correct: false }, { html: `${fr(qText(w2))} %`, correct: false }, { html: `${fr(qText(w3))} %`, correct: false }];
  const seen = new Set();
  return mcq({
    skill: EA, level: 4, key: `${EA}:mcqpct:${L}:${dl}`, exam: examTag(opts),
    prompt: t('Une longueur est mesurée : L = {L} cm, à ±{dl} cm près. Quelle est l\'erreur relative maximale, en pourcentage ?', { L, dl }),
    options: cands.filter((o) => !seen.has(o.html) && seen.add(o.html)),
    solution: [{ html: t('e_rel = {dl}/{L} = {w1} = {pct} % (on multiplie par 100 pour un pourcentage).', { dl, L, w1: fr(qText(w1)), pct: fr(qText(pct)) }), note: '' }],
  }, rng);
}

function eaTf(rng, opts) {
  if (rng.chance(0.5)) {
    const d = rng.pick([2, 3, 4]);
    return tfItem({
      skill: EA, level: 4, key: `round${d}`, exam: examTag(opts),
      statement: t('Si x̃ est l\'arrondi de x ≠ 0 à {d} chiffres significatifs, alors l\'erreur relative vérifie e_rel ≤ 5·10<sup>−{d}</sup>.', { d }),
      truth: true, ruleIfFalse: null,
      explanation: t('Vrai : l\'arrondi fait une erreur d\'au plus une demi-unité du {d}e chiffre, soit au plus 5·10<sup>−{d}</sup> fois |x| (le premier chiffre est ≥ 1).', { d }),
    });
  }
  return tfItem({
    skill: EA, level: 4, key: 'abssig', exam: examTag(opts),
    statement: t('Si e_abs = |x − x̃| ≤ 10⁻³, alors x̃ a au moins 3 chiffres significatifs exacts.'),
    truth: false,
    counter: { kind: 'num', prop: 'absSmallNotSig', params: { tol: '0.001', sig: 3 }, ask: [{ v: 'x', label: 'x =' }, { v: 'xt', label: 'x̃ =' }], answer: { x: '0,0001', xt: '0' } },
    explanation: t('Faux : pour x = 10⁻⁴ et x̃ = 0, e_abs = 10⁻⁴ ≤ 10⁻³, mais aucun chiffre n\'est exact (e_rel = 1). Les chiffres significatifs se lisent sur l\'erreur relative.'),
  });
}

export function genErrAbsRel(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return eaMcq(rng, opts);
  if (opts.exam === 'tf') return eaTf(rng, opts);
  if (level === 5) return eaLevel5(rng);
  if ([1, 2, 4].includes(level) && rng.next() < 1 / 3) return eaCode(rng, level);
  if (level === 4) return eaLevel4(rng);
  return eaLines(rng, level);
}

// ======================================================================
// n-err-float
// ======================================================================

const SUB_EF = [
  { id: 'naive', label: t('la forme naïve à 4 chiffres'), skill: EF },
  { id: 'rewrite', label: t('réécrire sans soustraction'), skill: EF },
  { id: 'compare', label: t('erreurs relatives'), skill: EA },
];
const P = 4;
const t4 = (x) => fpText(x, P).replace('−', '-');
const dec = (x) => String(Number(x.toPrecision(6))).replace('.', ',');

// The three cancellations. Each gives the naive and the stable forms (exact
// texts), their 4-digit lines, and the true value.
function efData(rng, kinds = ['sqrt', 'root', 'cos']) {
  for (let tries = 0; tries < 200; tries++) {
    const kind = rng.pick(kinds);
    let d;
    if (kind === 'sqrt') {
      const N = rng.pick([200, 400, 500, 1000, 2000, 5000, 10000]);
      const s1 = fl(Math.sqrt(N + 1), P);
      const s0 = fl(Math.sqrt(N), P);
      const sum = fl(s1 + s0, P);
      d = {
        kind, N, label: `√${N + 1} − √${N}`,
        naive: `√${N + 1}-√${N}`, stable: `1/(√${N + 1}+√${N})`, value: Math.sqrt(N + 1) - Math.sqrt(N),
        naiveLines: [[`${t4(s1)}-${t4(s0)}`, [t4(s1), t4(s0)], t('Chaque racine arrondie à 4 chiffres')], [t4(fl(s1 - s0, P)), [t4(fl(s1 - s0, P))], t('Les chiffres communs disparaissent')]],
        stableLines: [[`1/(${t4(s1)}+${t4(s0)})`, [t4(s1), t4(s0)], t('Plus de soustraction')], [`1/${t4(sum)}`, [t4(sum)], t('Somme arrondie')], [t4(fl(1 / sum, P)), [t4(fl(1 / sum, P))], t('Arrondi à 4 chiffres')]],
        rewrite: 'conj', why: `(√${N + 1} − √${N})(√${N + 1} + √${N}) = ${N + 1} − ${N} = 1`,
      };
    } else if (kind === 'root') {
      const k = rng.pick([3, 4, 5]);
      const b = 10 ** k;
      const r = fl(Math.sqrt(fl(fl(b * b, P) - 4, P)), P);
      const big = fl((b + r) / 2, P);
      d = {
        kind, b, label: t('la petite racine de x² − {b}x + 1', { b }),
        naive: `(${b}-√(${b}^2-4))/2`, stable: `1/((${b}+√(${b}^2-4))/2)`, value: 1 / ((b + Math.sqrt(b * b - 4)) / 2),
        naiveLines: [[`(${b}-${t4(r)})/2`, [t4(r)], t('√({b}² − 4) arrondie à 4 chiffres', { b })], [t4(fl((b - r) / 2, P)), [t4(fl((b - r) / 2, P))], t('Tout a disparu')]],
        stableLines: [[`1/((${b}+${t4(r)})/2)`, [t4(r)], t('x₋ = 1/x₊ (produit des racines = 1)')], [`1/${t4(big)}`, [t4(big)], t('x₊, sans soustraction')], [t4(fl(1 / big, P)), [t4(fl(1 / big, P))], t('Arrondi à 4 chiffres')]],
        rewrite: 'product', why: t('x₊·x₋ = c = 1 : x₋ = 1/x₊, et x₊ se calcule sans soustraction'),
      };
    } else {
      const x = rng.pick([0.01, 0.03, 0.002, 0.005, 0.001]);
      const xT = fr(String(x));
      const hT = fr(String(Number((x / 2).toPrecision(3))));
      const c = fl(Math.cos(x), P);
      const s = fl(Math.sin(x / 2), P);
      const s2 = fl(s * s, P);
      d = {
        kind, x, label: `1 − cos(${xT})`,
        naive: `1-cos(${xT})`, stable: `2sin(${hT})^2`, value: 1 - Math.cos(x),
        naiveLines: [[`1-${t4(c)}`, [t4(c)], t('cos({x}) arrondi à 4 chiffres', { x: xT })], [t4(fl(1 - c, P)), [t4(fl(1 - c, P))], t('Les chiffres communs disparaissent')]],
        stableLines: [[`2×${t4(s)}^2`, [t4(s)], t('sin({h}) arrondi', { h: hT })], [`2×${t4(s2)}`, [t4(s2)], t('Carré arrondi')], [t4(fl(2 * s2, P)), [t4(fl(2 * s2, P))], t('Arrondi à 4 chiffres')]],
        rewrite: 'trig', why: '1 − cos x = 2 sin²(x/2)',
      };
    }
    d.naiveV = fpEval(parse(d.naive), P);
    d.stableV = fpEval(parse(d.stable), P);
    d.errN = Math.abs(d.naiveV - d.value) / d.value;
    d.errS = Math.abs(d.stableV - d.value) / d.value;
    if (d.errN >= 0.1 && d.errS <= 1e-3) return d;
  }
  throw new Error('n-err-float: pas de données');
}

const fpJudge = (start, extra = {}) => ({ kind: 'value', arith: 'fp', digits: P, ...extra });

const EF_MENU = [
  { id: 'conj', label: t('Multiplier par le conjugué'), why: t('Il n\'y a pas de racine carrée à conjuguer ici.') },
  { id: 'product', label: t('Utiliser le produit des racines x₊x₋ = c'), why: t('Il n\'y a pas de trinôme ici.') },
  { id: 'trig', label: '1 − cos x = 2 sin²(x/2)', why: t('Pas de cosinus ici.') },
  { id: 'dl', label: t('Remplacer ln(1 + x) par son DL'), why: t('Pas de logarithme ici.') },
  { id: 'early', label: t('Arrondir plus tôt'), why: t('Arrondir plus tôt ne rend pas les chiffres perdus : c\'est la soustraction qui les efface.') },
];
const EVAL_MENU = [
  { id: 'eval', label: t('Calculer à 4 chiffres (arrondir après chaque opération)') },
  { id: 'exact', label: t('Calculer exactement'), why: t('On simule une machine à 4 chiffres : chaque opération est arrondie.') },
];

const lines = (list, guided, subgoal) => list.map(([math, holes, note]) => ({ kind: 'eq', math, ...(guided ? blankBy(math, holes) : {}), note, subgoal }));

function efLines(rng, level) {
  const d = efData(rng);
  const guided = level <= 2;
  const mode = guided ? 'guided' : level === 3 ? 'tap' : 'free';
  const evalMenu = level === 3 ? { menu: menuOf(EVAL_MENU, 'eval') } : {};
  const script = [];
  // The naive form: a note at level 1, lines otherwise.
  let start;
  let judge;
  if (level === 1) {
    script.push({ kind: 'note', html: t('Calcul naïf à 4 chiffres : {calc}, alors que la vraie valeur est {v}.', { calc: fr(d.naiveLines.map((l) => l[0]).join(' = ')), v: dec(d.value) }) });
    start = d.stable;
    judge = fpJudge(d.stable, { cancel: d.naive });
    script.push({ kind: 'note', html: t('Forme stable : {f} ({why}).', { f: fr(d.stable), why: d.why }) });
    script.push(...lines(d.stableLines, true, 'rewrite'));
  } else {
    start = d.naive;
    judge = fpJudge(d.naive, evalMenu);
    script.push(...lines(d.naiveLines, guided, 'naive'));
    if (level === 3) {
      script.push({ kind: 'segment', html: t('Réécris l\'expression exacte sans soustraction de nombres proches.'), ask: '=', start: { math: d.naive }, judge: { kind: 'equiv', vars: [], target: 'goal', goal: d.stable, menu: menuOf(EF_MENU, d.rewrite) } });
      script.push({ kind: 'eq', math: d.stable, note: d.why, subgoal: 'rewrite' });
    }
    const seg = { kind: 'segment', html: t('Calcule la forme stable à 4 chiffres.'), ask: '=', start: { math: d.stable }, judge: fpJudge(d.stable, { cancel: d.naive, ...evalMenu }) };
    script.push(seg);
    if (level === 2) {
      script.push({
        kind: 'decision', prompt: t('Comment éviter la perte de chiffres ?'), options: [
          { id: 'ok', label: t('Réécrire : {f} ({why})', { f: fr(d.stable), why: d.why }), valid: true, ref: true },
          { id: 'early', label: t('Arrondir plus tôt, à 3 chiffres'), valid: false, rule: 'n_cancel_ignored', why: t('Arrondir plus tôt ne rend pas les chiffres : c\'est la soustraction de nombres proches qui les efface.') },
          { id: 'order', label: t('Changer l\'ordre de la soustraction'), valid: false, why: t('b − a = −(a − b) : même annulation.') },
        ],
      });
    }
    script.push(...lines(d.stableLines, guided, 'rewrite'));
  }
  if (level === 4) {
    const tolN = 0.5 * 10 ** (Math.floor(Math.log10(d.errN)) - 1);
    script.push(
      { kind: 'segment', html: t('L\'erreur relative de la forme naïve (vraie valeur {v}), à 2 chiffres significatifs.', { v: dec(d.value) }), ask: t('e_rel(naïf) ='), start: { math: `|${t4(d.naiveV)}-(${d.naive})|/(${d.naive})` }, judge: { kind: 'value', tol: tolN * 1.2, form: 'any' } },
      { kind: 'eq', math: fr(String(Number(d.errN.toPrecision(2)))), note: `|${t4(d.naiveV).replace('.', ',')} − ${dec(d.value)}|/${dec(d.value)}`, subgoal: 'compare' },
    );
  }
  return linesItem({
    skill: EF, level, mode, keys: KEYS, tapActions: level === 3 ? 'menu' : null,
    prompt: level === 1
      ? t('En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule {label} par la forme stable.', { label: d.label })
      : level === 4
        ? t('En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule {label} par la forme naïve, puis par une forme sans soustraction de nombres proches, et l\'erreur relative de la forme naïve.', { label: d.label })
        : t('En arithmétique à 4 chiffres significatifs (on arrondit après chaque opération), calcule {label} par la forme naïve, puis par une forme sans soustraction de nombres proches.', { label: d.label }),
    start, judge, script,
    hints: H(t('On soustrait deux nombres presque égaux : les chiffres communs disparaissent. Réécris sans soustraction.'),
      `${fr(d.stableLines[0][0]).replace(d.stableLines[0][1][0].replace('.', ','), '□')}`,
      `${fr(d.stableLines.map((l) => l[0]).join(' = '))}.`),
    subgoals: SUB_EF, key: `${EF}:${level}:${d.kind}:${d.N ?? d.b ?? d.x}`, baits: ['n_cancel_ignored'],
  });
}

// L4 (catalogue): (1 − cos x)/x² against 2 sin²(x/2)/x² in double precision.
function efTable(rng, level) {
  const ks = rng.pick([[1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5, 6, 7, 8]]);
  const rows = ks.map((k) => {
    const x = 10 ** -k;
    return [`1e-${String(k).padStart(2, '0')}`, expText((1 - Math.cos(x)) / (x * x), 6), expText((2 * Math.sin(x / 2) ** 2) / (x * x), 6)];
  });
  const question = mcq({
    skill: EF, level, key: `${EF}:cos:${ks[0]}`,
    prompt: t('Les deux colonnes calculent la même fonction, qui tend vers 1/2. Pourquoi la première s\'écarte-t-elle de 1/2 quand x est petit ?'),
    options: [
      { html: t('Annulation : cos x ≈ 1, et la soustraction 1 − cos x efface les chiffres significatifs'), correct: true },
      { html: t('L\'arrondi ne fait qu\'une erreur d\'environ 10⁻¹⁶ en valeur absolue : c\'est la formule qui est fausse'), correct: false, rule: 'n_eps_absolute' },
      { html: t('x² est trop petit : la division par x² déborde'), correct: false },
      { html: t('2 sin²(x/2) n\'est pas égal à 1 − cos x'), correct: false },
    ],
    solution: [{ html: t('Pour x = 10⁻⁸, cos x vaut 1 en double précision : 1 − cos x = 0. La forme 2 sin²(x/2) ne soustrait rien et garde ses 16 chiffres.'), note: '' }],
  }, rng);
  return readtableItem({
    skill: EF, level, key: `cos:${ks[0]}`,
    prompt: t('En double précision (environ 16 chiffres), on calcule pour x de plus en plus petit :'),
    table: { columns: ['x', '(1 − cos x)/x²', '2 sin²(x/2)/x²'], rows },
    question,
    hints: H(t('Regarde ce que vaut cos x quand x est tout petit : presque 1.'), t('1 − cos x = 1 − 0,99999…, les chiffres □ disparaissent.'), t('Annulation dans 1 − cos x ; 2 sin²(x/2) n\'a pas de soustraction.')),
    subgoals: SUB_EF, baits: ['n_eps_absolute'],
  });
}

// L5: the program (catalogue « Item code »).
const STABLE = refCode(`def g_stable(x):
    # meme valeur que sqrt(x + 1) - sqrt(x), sans soustraction
    return «1 / (math.sqrt(x + 1) + math.sqrt(x))»

def small_root(b, c):
    # petite racine de x^2 - b x + c = 0, avec b > 0 grand
    big = «(b + math.sqrt(b * b - 4 * c)) / 2»
    return «c / big»
`);
const STABLE_TRAPS = {
  0: [{ text: 'math.sqrt(x + 1) - math.sqrt(x)', rule: 'n_cancel_ignored' }],
  1: [],
  2: [{ text: '(b - math.sqrt(b * b - 4 * c)) / 2', rule: 'n_cancel_ignored' }],
};
const STABLE_TESTS = [
  { expr: 'small_root(1e8, 1)', expect: '1e-08', tol: 1e-9 },
  { expr: 'g_stable(1e12)', expect: '4.999999999998749e-07', tol: 1e-9 },
  { expr: 'g_stable(1e4)', expect: '0.004999875006249609' },
];
function efCode(rng, level) {
  return codeItem({
    skill: EF, level, ref: STABLE, blanks: holesFor(5, STABLE), traps: STABLE_TRAPS, wrong: { 1: '(b - math.sqrt(b * b - 4 * c)) / 2' }, rng,
    prompt: t('Écris deux calculs stables en double précision : √(x + 1) − √x pour x grand, et la petite racine de x² − bx + c pour b grand (le produit des racines vaut c).'),
    tests: STABLE_TESTS, hints: [], subgoals: SUB_EF, key: `${level}`,
  });
}

// ---------- exam ----------

function efMcq(rng, opts) {
  const kind = rng.pick(['sqrt', 'root', 'cos']);
  const O = {
    sqrt: { q: t('Laquelle de ces formules calcule √(x + 1) − √x de façon stable pour x grand ?'), ok: '1/(√(x + 1) + √x)', bad: [['√(x + 1) − √x', 'n_cancel_ignored'], ['1/(√(x + 1) − √x)'], ['(x + 1 − x)/(√(x + 1) − √x)']] },
    root: { q: t('Pour b > 0 grand, laquelle de ces formules calcule de façon stable la petite racine de x² − bx + c (c > 0) ?'), ok: t('c/x₊, avec x₊ = (b + √(b² − 4c))/2'), bad: [['(b − √(b² − 4c))/2', 'n_cancel_ignored'], ['(b + √(b² − 4c))/2'], [t('x₊/c, avec x₊ = (b + √(b² − 4c))/2')]] },
    cos: { q: t('Laquelle de ces formules calcule 1 − cos x de façon stable pour x proche de 0 ?'), ok: '2 sin²(x/2)', bad: [['1 − cos x', 'n_cancel_ignored'], ['sin²(x)'], ['2 sin(x/2)']] },
  }[kind];
  return mcq({
    skill: EF, level: 4, key: `${EF}:mcq:${kind}`, exam: examTag(opts),
    prompt: O.q,
    options: [{ html: O.ok, correct: true }, ...O.bad.map(([html, rule]) => ({ html, correct: false, ...(rule ? { rule } : {}) }))],
    solution: [{ html: t('{f} : même valeur, sans soustraction de deux nombres presque égaux.', { f: O.ok }), note: '' }],
  }, rng);
}

function efTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: EF, key: `${EF}:tf:absorb`, exam: examTag(opts), truth: false,
      statement: t('En double précision, (1 + 10⁻¹⁷) − 1 vaut 10⁻¹⁷.'),
      explanation: t('Faux : 1 + 10⁻¹⁷ est arrondi à 1 (10⁻¹⁷ est plus petit que l\'ε machine ≈ 2·10⁻¹⁶ fois 1), donc le résultat vaut 0 : c\'est l\'absorption.'),
    }, rng);
  }
  return tfItem({
    skill: EF, level: 4, key: 'epsabs', exam: examTag(opts),
    statement: t('En double précision, l\'erreur d\'arrondi |fl(x) − x| vaut environ 10⁻¹⁶, quel que soit x.'),
    truth: false, ruleIfTrue: 'n_eps_absolute',
    counter: { kind: 'num', prop: 'roundAbsLarge', params: {}, ask: [{ v: 'x', label: 'x =' }], answer: { x: '10^20' } },
    explanation: t('Faux : l\'erreur est relative, |fl(x) − x| ≤ ε·|x| avec ε ≈ 10⁻¹⁶. Pour x = 10²⁰, elle peut atteindre environ 10⁴.'),
  });
}

export function genErrFloat(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return efMcq(rng, opts);
  if (opts.exam === 'tf') return efTf(rng, opts);
  if (level === 5) return efCode(rng, level);
  if (level === 4 && rng.chance(0.5)) return efTable(rng, level);
  return efLines(rng, level);
}
