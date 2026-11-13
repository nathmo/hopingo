// Generators of module A1, part k (step U4): bisection and the fixed-point
// method (a1-bisection-fixpoint, course MT). Catalogue:
// docs/universite/A1-analyse-1.md.
//
// Tables judged by the `bisection` phi of js/judges/iter.js (columns a, b,
// m, f(m); each row from the student's row before). L1: first row given,
// m and f(m) given, the student keeps a half (a, b); L2: m too; L3: lines
// in the « choose the action » mode, whose actions are the decisions
// « garder [a ; m] », « garder [m ; b] », « arrêter », each step typing the
// new midpoint (judge `value`); L4: the whole table, then the least number
// of steps for a precision 10⁻ᵏ; L5: the table alone, then the contracting
// g among three (multiple choice). Exam: mcq (number of steps), tf.

import { t } from '../../i18n.js';
import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { exactValue } from '../../cas/normal.js';
import { evalFloat } from '../../cas/numeric.js';
import { mapNode, lit } from '../../cas/ast.js';
import { MT, linesItem, mcq, tfItem, tableItem, answerItem, examTag } from './kit.js';
import { H, E, SEG, fr, dec, uniqOptions, examMcq, tfTag } from './analyse1-k-kit.js';

const BIS = 'a1-bisection-fixpoint';
const BIS_SUB = [
  { id: 'ivt', label: t('TVI sur chaque moitié'), skill: 'a1-fn-ivt' },
  { id: 'steps', label: t('étapes de bissection'), skill: BIS },
  { id: 'contract', label: t('g contractante'), skill: 'a1-mvt' },
];

const at = (node, x) => exactValue(mapNode(node, (n) => (n.t === 'sym' && n.name === 'x' && !n.sub ? { t: 'paren', e: lit(x) } : n)));
const D = (x, digits = 6) => dec(x, digits);

// The bisection rows of f from [lo ; lo + 1]: [{a, b, m, fm}], null if
// some f(m) is 0 or too close to 0 to read its sign at 10^-4.
function rowsOf(node, lo, n = 6) {
  const rows = [];
  let a = new Q(lo);
  let b = new Q(lo + 1);
  for (let k = 0; k < n; k++) {
    const m = a.add(b).div(new Q(2));
    const fm = at(node, m);
    if (fm.n === 0 || Math.abs(fm.valueOf()) < 2e-3) return null;
    rows.push({ a, b, m, fm });
    if (Math.sign(fm.n) === Math.sign(at(node, a).n)) a = m; else b = m;
  }
  return rows;
}

// f(x) = x^3 + b.x^2 + c.x - d, increasing on [0 ; 2], one root in
// [lo ; lo + 1]. -> {f, node, c, d, lo, hi, rows (shown), next (the row after)}
function bisData(rng, { plain = false, steps = 4 } = {}) {
  for (let i = 0; i < 200; i++) {
    const b = plain ? 0 : rng.pick([0, 0, 1]);
    const c = rng.int(1, 6);
    const d = rng.int(1, 9);
    const f = `x^3${b ? '+x^2' : ''}+${c === 1 ? '' : c}x-${d}`;
    const node = parse(f);
    const lo = rng.pick([0, 1]);
    if (!(at(node, new Q(lo)).n < 0 && at(node, new Q(lo + 1)).n > 0)) continue;
    const rows = rowsOf(node, lo);
    if (!rows) continue;
    return { f, node, c, d, lo, hi: lo + 1, rows: rows.slice(0, steps), next: rows[steps] };
  }
  return FALLBACK(steps);
}
function FALLBACK(steps) {
  const node = parse('x^3+x-1');
  const rows = rowsOf(node, 0);
  return { f: 'x^3+x-1', node, c: 1, d: 1, lo: 0, hi: 1, rows: rows.slice(0, steps), next: rows[steps], fallback: true };
}

const COLS = ['a', 'b', 'm = (a + b)/2', 'f(m)'];
const fmText = (fm) => D(fm, 4);

// The table: cells given or to fill, per level.
function bisTable(d, level) {
  const rows = d.rows.map((r, k) => {
    const texts = [D(r.a).text, D(r.b).text, D(r.m).text, fmText(r.fm).text];
    const shows = [D(r.a).show, D(r.b).show, D(r.m).show, `${fmText(r.fm).approx ? '≈ ' : ''}${fmText(r.fm).show}`];
    const given = (j) => {
      if (level === 1) return k === 0 || j >= 2;
      if (level === 2) return k === 0 || j === 3;
      return k === 0 && j <= 1;
    };
    return {
      row: { id: `r${k + 1}`, label: `${k + 1}`, cells: texts.map((x, j) => (given(j) ? { given: shows[j].replace('≈ ', '') } : { input: true })) },
      answers: texts,
    };
  });
  return { table: { cols: COLS, rows: rows.map((r) => r.row) }, answers: Object.fromEntries(rows.map((r) => [r.row.id, r.answers])) };
}

// The least n with L/2ⁿ ≤ 10⁻ᵏ.
const stepsFor = (L, k) => { let n = 0; while (L / 2 ** n > 10 ** -k) n++; return n; };

// Three ways to write x = g(x) for x³ + cx = d: one contracting on [lo ; hi].
function gCandidates(d) {
  const { c, d: dd, lo, hi } = d;
  const C = c === 1 ? '' : c;
  const cands = [
    { g: c === 1 ? `${dd}-x^3` : `(${dd}-x^3)/${c}`, dg: (x) => (3 * x * x) / c },
    { g: `${dd}/(x^2+${c})`, dg: (x) => (2 * dd * x) / (x * x + c) ** 2 },
    { g: `root(3,${dd}-${C}x)`, dg: (x) => c / (3 * Math.abs(dd - c * x) ** (2 / 3)) },
  ];
  const xs = Array.from({ length: 201 }, (_, i) => lo + (hi - lo) * (i / 200));
  return cands.map((k) => {
    const node = parse(k.g);
    const ys = xs.map((x) => evalFloat(node, { x }));
    const into = ys.every((y) => Number.isFinite(y) && y >= lo - 1e-12 && y <= hi + 1e-12);
    const K = Math.max(...xs.map((x) => k.dg(x)));
    return { ...k, into, K };
  });
}

function bisTableItem(level, rng, opts = {}) {
  const plain = level === 5;
  let d = null;
  let gs = null;
  for (let i = 0; i < 200; i++) {
    d = bisData(rng, { plain, steps: level === 1 ? 3 : level === 5 ? 3 : 4 });
    if (!plain) break;
    gs = gCandidates(d);
    const good = gs.filter((g) => g.into && g.K < 0.9);
    if (good.length === 1 && gs.filter((g) => g !== good[0]).every((g) => g.K > 1.2)) break;
    d = null;
  }
  if (!d) {
    d = FALLBACK(3);
    gs = gCandidates(d);
  }
  const { table, answers } = bisTable(d, level);
  const I = `[${d.lo} ; ${d.hi}]`;
  const fa = at(d.node, new Q(d.lo));
  const fb = at(d.node, new Q(d.hi));
  let then = null;
  let baits = [];
  if (level === 4) {
    const k = rng.int(2, 4);
    const n = stepsFor(1, k);
    then = answerItem({
      skill: BIS, level, prompt: t('Après n étapes, l\'erreur est au plus (b − a)/2ⁿ = 1/2ⁿ. Combien d\'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻{k} ? n =', { k: '⁰¹²³⁴⁵'[k] }),
      expected: n, traps: [{ value: String(k), rule: 'a1_bisection_count' }], key: `n:${k}`,
      solution: [{ html: t('{s}, donc n = {n}.', { s: `1/2ⁿ ≤ 10⁻${'⁰¹²³⁴⁵'[k]} ⇔ 2ⁿ ≥ ${10 ** k} : 2^${n - 1} = ${2 ** (n - 1)} < ${10 ** k} ≤ 2^${n} = ${2 ** n}`, n }), note: '' }],
    });
    baits = ['a1_bisection_count'];
  }
  if (level === 5) {
    const options = gs.map((g) => ({ html: `g(x) = ${MT(g.g)}`, correct: g.into && g.K < 0.9 }));
    then = mcq({
      skill: BIS, level, prompt: t('Pour approcher la racine par xₙ₊₁ = g(xₙ), quelle fonction g est contractante sur {I} (g({I}) ⊂ {I} et |g′| < 1) ?', { I }),
      options, key: `${BIS}:g:${d.f}`,
      solution: [{ html: gs.map((g) => `${MT(g.g)} : max |g′| ≈ ${fr(g.K.toFixed(2).replace('.', ','))}${g.into ? '' : t(', et g ne garde pas {I}', { I })}`).join(' ; '), note: '' }],
    }, rng);
    then.noHints = true;
  }
  const r1 = d.rows[0];
  const pv = { f: MT(d.f), I, lo: d.lo, hi: d.hi, fa: fr(String(fa)), fb: fr(String(fb)) };
  const prompt = level <= 2
    ? t('Bissection pour f(x) = {f} sur {I} : f({lo}) = {fa} &lt; 0 et f({hi}) = {fb} &gt; 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe (f(m) est donné). Arrondis f(m) à 10⁻⁴.', pv)
    : t('Bissection pour f(x) = {f} sur {I} : f({lo}) = {fa} &lt; 0 et f({hi}) = {fb} &gt; 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe. Arrondis f(m) à 10⁻⁴.', pv);
  const solution = d.rows.map((r, k) => {
    const next = d.rows[k + 1] || d.next;
    const kept = next ? t('on garde [{a} ; {b}]', { a: D(next.a).show, b: D(next.b).show }) : '';
    return { html: `m = ${D(r.m).show}, f(m) ${fmText(r.fm).approx ? '≈' : '='} ${fmText(r.fm).show} ${r.fm.n < 0 ? '&lt; 0' : '&gt; 0'}${kept ? ` : ${kept}` : ''}`, note: t('Étape {k}', { k: k + 1 }) };
  });
  return tableItem({
    skill: BIS, level, prompt, table, phi: { kind: 'bisection', f: d.f, a0: String(d.lo), b0: String(d.hi) }, answers, then, baits,
    hints: H(t('Garde la moitié où f change de signe : si f(m) a le signe de f(a), on garde [m ; b], sinon [a ; m].'),
      t('f({m}) {s1} et f({e}) {s2} : on garde [▢ ; ▢].', { m: D(r1.m).show, s1: r1.fm.n < 0 ? '&lt; 0' : '&gt; 0', e: r1.fm.n < 0 ? d.hi : d.lo, s2: r1.fm.n < 0 ? '&gt; 0' : '&lt; 0' }),
      solution.map((s) => s.html).join('<br>')),
    noHints: level === 5 || !!opts.exam, subgoals: BIS_SUB, solution,
    key: `${level}:${d.f}:${d.lo}`, exam: examTag(opts), fallback: !!d.fallback,
    expectedSec: 60 + 30 * d.rows.length,
  });
}

// Level 3: the actions are the decisions; each step types its midpoint.
function bisTap(level, rng, opts = {}) {
  const d = bisData(rng, { steps: 4 });
  const I = `[${d.lo} ; ${d.hi}]`;
  const fa = at(d.node, new Q(d.lo));
  const fb = at(d.node, new Q(d.hi));
  const rows = d.rows.slice(0, 3);
  const eps = rows[2].b.sub(rows[2].a).div(new Q(2)); // width after 3 steps
  const show = (x) => D(x).show;
  const keep = (r) => (Math.sign(r.fm.n) === Math.sign(at(d.node, r.a).n) ? 'right' : 'left');
  const decision = (r, last) => {
    const k = keep(r);
    const L = `[${show(r.a)} ; ${show(r.m)}]`;
    const Rr = `[${show(r.m)} ; ${show(r.b)}]`;
    return {
      kind: 'decision', prompt: t('{s} : quelle moitié gardes-tu ?', { s: `f(${show(r.m)}) ${fmText(r.fm).approx ? '≈' : '='} ${fmText(r.fm).show}` }),
      options: [
        { id: 'left', label: t('Garder {I}', { I: L }), valid: k === 'left', why: t('f({m}) a le signe de f({a}) : f ne change pas de signe sur {I}.', { m: show(r.m), a: show(r.a), I: L }) },
        { id: 'right', label: t('Garder {I}', { I: Rr }), valid: k === 'right', why: t('f({m}) a le signe de f({a}) : f ne change pas de signe sur {I}.', { m: show(r.m), a: show(r.b), I: Rr }) },
        { id: 'stop', label: t('Arrêter'), valid: false, why: last ? t('Garde d\'abord la bonne moitié.') : t('L\'intervalle mesure encore {w} : la précision {e} n\'est pas atteinte.', { w: show(r.b.sub(r.a)), e: show(eps) }) },
      ],
    };
  };
  const mid = (k) => rows[k].m;
  const next = d.rows[3];
  const script = [E(D(mid(0)).text, `m₁ = (${d.lo} + ${d.hi})/2`, 'steps')];
  for (let k = 1; k < 3; k++) {
    script.push(SEG(t('Étape {k}', { k: k + 1 }), `m${'₁₂₃₄'[k]} =`, `m_${k + 1}`, { kind: 'value', expect: D(mid(k)).text, form: 'any' }), decision(rows[k - 1], false), E(D(mid(k)).text, t('Milieu de la moitié gardée'), 'steps'));
  }
  script.push(SEG(t('Fin'), 'c ≈', 'c', { kind: 'value', expect: D(next.m).text, form: 'any' }), decision(rows[2], true),
    { kind: 'decision', prompt: t('La moitié gardée mesure {w}. Continuer ou arrêter ?', { w: show(next.b.sub(next.a)) }), options: [
      { id: 'stop', label: t('Arrêter : son milieu approche la racine à {e} près', { e: show(eps.div(new Q(2))) }), valid: true },
      { id: 'go', label: t('Continuer'), valid: false, why: t('La précision demandée ({e}) est atteinte : la racine est à moins de {h} du milieu.', { e: show(eps), h: show(eps.div(new Q(2))) }) },
    ] },
    E(D(next.m).text, t('Milieu de [{a} ; {b}]', { a: show(next.a), b: show(next.b) }), 'steps'));
  return linesItem({
    skill: BIS, level, mode: 'tap', start: 'm_1', judge: { kind: 'value', expect: D(mid(0)).text, form: 'any' }, script,
    prompt: t('Bissection pour f(x) = {f} sur {I} : f({lo}) = {fa} &lt; 0, f({hi}) = {fb} &gt; 0. Précision voulue : un intervalle de longueur ≤ {e}. À chaque étape, choisis la moitié, puis écris son milieu.', { f: MT(d.f), I, lo: d.lo, hi: d.hi, fa: fr(String(fa)), fb: fr(String(fb)), e: show(eps) }),
    hints: H(t('Garde la moitié où f change de signe : compare le signe de f(m) à ceux de f(a) et f(b).'),
      t('m₂ est le milieu de la moitié gardée : (a + b)/2 = ▢.'),
      t('{ms}, puis c ≈ {c}.', { ms: rows.map((r, k) => `m${'₁₂₃'[k]} = ${show(r.m)}`).join(', '), c: show(next.m) })),
    subgoals: BIS_SUB, keys: ['calc'], tapActions: null,
    key: `${BIS}:${level}:tap:${d.f}:${d.lo}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function bisMcq(rng, opts) {
  const L = rng.pick([1, 1, 2, 4]);
  const k = rng.int(2, 5);
  const n = stepsFor(L, k);
  const [a, b] = rng.pick([[0, L], [1, 1 + L], [-L, 0]]);
  const sup = '⁰¹²³⁴⁵'[k];
  return examMcq({
    skill: BIS, prompt: t('On applique la bissection sur [{a} ; {b}]. Après n étapes, l\'erreur est au plus (b − a)/2ⁿ. Combien d\'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻{k} ?', { a: fr(a), b, k: sup }),
    options: uniqOptions([
      { html: `n = ${n}`, correct: true },
      { html: `n = ${k}`, correct: false, rule: 'a1_bisection_count' },
      { html: `n = ${n - 1}`, correct: false },
      { html: `n = ${n + 1}`, correct: false },
      { html: `n = ${n + 2}`, correct: false },
    ]),
    key: `${BIS}:mcq:${L}:${k}:${a}`,
    solution: [{ html: t('{s}, donc n = {n}.', { s: `${L}/2ⁿ ≤ 10⁻${sup} ⇔ 2ⁿ ≥ ${L * 10 ** k} : 2^${n - 1} = ${2 ** (n - 1)} < ${L * 10 ** k} ≤ 2^${n} = ${2 ** n}`, n }), note: '' }],
  }, rng, opts);
}

function bisTf(rng) {
  const kind = rng.pick(['cont', 'cont', 'error', 'fixed']);
  if (kind === 'cont') {
    const [a, b] = rng.pick([[0, 1], [0, 2], [1, 3], [-1, 1]]);
    const m = (a + b) / 2;
    const mt = m === 0.5 ? '1/2' : String(m);
    return tfItem({
      skill: BIS, level: 4, statement: t('Si f({a}) < 0 < f({b}), la bissection sur [{a} ; {b}] converge vers un zéro de f.', { a: fr(a), b }), truth: false,
      counter: {
        kind: 'function', v: 'x',
        hyp: [{ p: 'positive', of: '-f', on: [String(a), String(a)], say: `f(${fr(a)}) < 0` }, { p: 'positive', on: [String(b), String(b)], say: `f(${b}) > 0` }],
        concl: { p: 'zeroIn', on: [String(a), String(b)], say: t('f a un zéro dans [{a} ; {b}]', { a: fr(a), b }) },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calc', 'calcfn'] }], answer: { f: m === 0 ? '1/x' : `1/(x-${mt})` },
      },
      ruleIfTrue: 'a1_ivt_no_continuity', key: `cont:${a}:${b}`, exam: tfTag,
      explanation: t('Faux sans continuité : f(x) = {f} change de signe sur [{a} ; {b}] mais n\'a pas de zéro ; la bissection s\'approche de {m}, où f n\'est pas définie.', { f: m === 0 ? '1/x' : `1/(x − ${fr(mt)})`, a: fr(a), b, m: fr(mt) }),
    });
  }
  if (kind === 'error') {
    const L = rng.pick([1, 2, 4]);
    return tfItem({ skill: BIS, level: 4, statement: t('Après n étapes de bissection sur [0 ; {L}], le zéro est à moins de {L}/2ⁿ du milieu du dernier intervalle.', { L }), truth: true, key: `err:${L}`, exam: tfTag,
      explanation: t('Vrai : après n étapes, l\'intervalle mesure {L}/2ⁿ et contient le zéro ; le milieu en est même à {L}/2ⁿ⁺¹ au plus.', { L }) });
  }
  const k = rng.pick(['1/2', '2/3', '9/10']);
  return tfItem({ skill: BIS, level: 4, statement: t('Si g([a ; b]) ⊂ [a ; b] et |g′(x)| ≤ {k} sur [a ; b], alors g a un unique point fixe dans [a ; b], limite de xₙ₊₁ = g(xₙ).', { k }), truth: true, key: `fixed:${k}`, exam: tfTag,
    explanation: t('Vrai : par les accroissements finis, |g(x) − g(y)| ≤ {k}·|x − y| : g est contractante, et le théorème du point fixe s\'applique.', { k }) });
}

function bisItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return bisMcq(rng, opts);
  if (opts.exam === 'tf') return bisTf(rng);
  if (level === 3) return bisTap(level, rng, opts);
  return bisTableItem(level, rng, opts);
}

export const GEN = { [BIS]: bisItem };
