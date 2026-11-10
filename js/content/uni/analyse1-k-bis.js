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

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { exactValue } from '../../cas/normal.js';
import { evalFloat } from '../../cas/numeric.js';
import { mapNode, lit } from '../../cas/ast.js';
import { MT, linesItem, mcq, tfItem, tableItem, answerItem, examTag } from './kit.js';
import { H, E, SEG, fr, dec, uniqOptions, examMcq, tfTag } from './analyse1-k-kit.js';

const BIS = 'a1-bisection-fixpoint';
const BIS_SUB = [
  { id: 'ivt', label: 'TVI sur chaque moitié', skill: 'a1-fn-ivt' },
  { id: 'steps', label: 'étapes de bissection', skill: BIS },
  { id: 'contract', label: 'g contractante', skill: 'a1-mvt' },
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
      row: { id: `r${k + 1}`, label: `${k + 1}`, cells: texts.map((t, j) => (given(j) ? { given: shows[j].replace('≈ ', '') } : { input: true })) },
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
      skill: BIS, level, prompt: `Après n étapes, l'erreur est au plus (b − a)/2ⁿ = 1/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻${'⁰¹²³⁴⁵'[k]} ? n =`,
      expected: n, traps: [{ value: String(k), rule: 'a1_bisection_count' }], key: `n:${k}`,
      solution: [{ html: `1/2ⁿ ≤ 10⁻${'⁰¹²³⁴⁵'[k]} ⇔ 2ⁿ ≥ ${10 ** k} : 2^${n - 1} = ${2 ** (n - 1)} < ${10 ** k} ≤ 2^${n} = ${2 ** n}, donc n = ${n}.`, note: '' }],
    });
    baits = ['a1_bisection_count'];
  }
  if (level === 5) {
    const options = gs.map((g) => ({ html: `g(x) = ${MT(g.g)}`, correct: g.into && g.K < 0.9 }));
    then = mcq({
      skill: BIS, level, prompt: `Pour approcher la racine par xₙ₊₁ = g(xₙ), quelle fonction g est contractante sur ${I} (g(${I}) ⊂ ${I} et |g′| < 1) ?`,
      options, key: `${BIS}:g:${d.f}`,
      solution: [{ html: gs.map((g) => `${MT(g.g)} : max |g′| ≈ ${fr(g.K.toFixed(2).replace('.', ','))}${g.into ? '' : ', et g ne garde pas ' + I}`).join(' ; '), note: '' }],
    }, rng);
    then.noHints = true;
  }
  const r1 = d.rows[0];
  const prompt = `Bissection pour f(x) = ${MT(d.f)} sur ${I} : f(${d.lo}) = ${fr(String(fa))} &lt; 0 et f(${d.hi}) = ${fr(String(fb))} &gt; 0. Remplis le tableau : à chaque ligne, garde la moitié où f change de signe${level <= 2 ? ' (f(m) est donné)' : ''}. Arrondis f(m) à 10⁻⁴.`;
  const solution = d.rows.map((r, k) => {
    const next = d.rows[k + 1] || d.next;
    const kept = next ? `on garde [${D(next.a).show} ; ${D(next.b).show}]` : '';
    return { html: `m = ${D(r.m).show}, f(m) ${fmText(r.fm).approx ? '≈' : '='} ${fmText(r.fm).show} ${r.fm.n < 0 ? '&lt; 0' : '&gt; 0'}${kept ? ` : ${kept}` : ''}`, note: `Étape ${k + 1}` };
  });
  return tableItem({
    skill: BIS, level, prompt, table, phi: { kind: 'bisection', f: d.f, a0: String(d.lo), b0: String(d.hi) }, answers, then, baits,
    hints: H('Garde la moitié où f change de signe : si f(m) a le signe de f(a), on garde [m ; b], sinon [a ; m].',
      `f(${D(r1.m).show}) ${r1.fm.n < 0 ? '&lt; 0' : '&gt; 0'} et f(${r1.fm.n < 0 ? d.hi : d.lo}) ${r1.fm.n < 0 ? '&gt; 0' : '&lt; 0'} : on garde [▢ ; ▢].`,
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
      kind: 'decision', prompt: `f(${show(r.m)}) ${fmText(r.fm).approx ? '≈' : '='} ${fmText(r.fm).show} : quelle moitié gardes-tu ?`,
      options: [
        { id: 'left', label: `Garder ${L}`, valid: k === 'left', why: `f(${show(r.m)}) a le signe de f(${show(r.a)}) : f ne change pas de signe sur ${L}.` },
        { id: 'right', label: `Garder ${Rr}`, valid: k === 'right', why: `f(${show(r.m)}) a le signe de f(${show(r.b)}) : f ne change pas de signe sur ${Rr}.` },
        { id: 'stop', label: 'Arrêter', valid: false, why: last ? 'Garde d\'abord la bonne moitié.' : `L'intervalle mesure encore ${show(r.b.sub(r.a))} : la précision ${show(eps)} n'est pas atteinte.` },
      ],
    };
  };
  const mid = (k) => rows[k].m;
  const next = d.rows[3];
  const script = [E(D(mid(0)).text, `m₁ = (${d.lo} + ${d.hi})/2`, 'steps')];
  for (let k = 1; k < 3; k++) {
    script.push(SEG(`Étape ${k + 1}`, `m${'₁₂₃₄'[k]} =`, `m_${k + 1}`, { kind: 'value', expect: D(mid(k)).text, form: 'any' }), decision(rows[k - 1], false), E(D(mid(k)).text, 'Milieu de la moitié gardée', 'steps'));
  }
  script.push(SEG('Fin', 'c ≈', 'c', { kind: 'value', expect: D(next.m).text, form: 'any' }), decision(rows[2], true),
    { kind: 'decision', prompt: `La moitié gardée mesure ${show(next.b.sub(next.a))}. Continuer ou arrêter ?`, options: [
      { id: 'stop', label: `Arrêter : son milieu approche la racine à ${show(eps.div(new Q(2)))} près`, valid: true },
      { id: 'go', label: 'Continuer', valid: false, why: `La précision demandée (${show(eps)}) est atteinte : la racine est à moins de ${show(eps.div(new Q(2)))} du milieu.` },
    ] },
    E(D(next.m).text, `Milieu de [${show(next.a)} ; ${show(next.b)}]`, 'steps'));
  return linesItem({
    skill: BIS, level, mode: 'tap', start: 'm_1', judge: { kind: 'value', expect: D(mid(0)).text, form: 'any' }, script,
    prompt: `Bissection pour f(x) = ${MT(d.f)} sur ${I} : f(${d.lo}) = ${fr(String(fa))} &lt; 0, f(${d.hi}) = ${fr(String(fb))} &gt; 0. Précision voulue : un intervalle de longueur ≤ ${show(eps)}. À chaque étape, choisis la moitié, puis écris son milieu.`,
    hints: H('Garde la moitié où f change de signe : compare le signe de f(m) à ceux de f(a) et f(b).',
      `m₂ est le milieu de la moitié gardée : (a + b)/2 = ▢.`,
      rows.map((r, k) => `m${'₁₂₃'[k]} = ${show(r.m)}`).join(', ') + `, puis c ≈ ${show(next.m)}.`),
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
    skill: BIS, prompt: `On applique la bissection sur [${fr(a)} ; ${b}]. Après n étapes, l'erreur est au plus (b − a)/2ⁿ. Combien d'étapes faut-il au minimum pour garantir une erreur ≤ 10⁻${sup} ?`,
    options: uniqOptions([
      { html: `n = ${n}`, correct: true },
      { html: `n = ${k}`, correct: false, rule: 'a1_bisection_count' },
      { html: `n = ${n - 1}`, correct: false },
      { html: `n = ${n + 1}`, correct: false },
      { html: `n = ${n + 2}`, correct: false },
    ]),
    key: `${BIS}:mcq:${L}:${k}:${a}`,
    solution: [{ html: `${L}/2ⁿ ≤ 10⁻${sup} ⇔ 2ⁿ ≥ ${L * 10 ** k} : 2^${n - 1} = ${2 ** (n - 1)} < ${L * 10 ** k} ≤ 2^${n} = ${2 ** n}, donc n = ${n}.`, note: '' }],
  }, rng, opts);
}

function bisTf(rng) {
  const kind = rng.pick(['cont', 'cont', 'error', 'fixed']);
  if (kind === 'cont') {
    const [a, b] = rng.pick([[0, 1], [0, 2], [1, 3], [-1, 1]]);
    const m = (a + b) / 2;
    const mt = m === 0.5 ? '1/2' : String(m);
    return tfItem({
      skill: BIS, level: 4, statement: `Si f(${fr(a)}) < 0 < f(${b}), la bissection sur [${fr(a)} ; ${b}] converge vers un zéro de f.`, truth: false,
      counter: {
        kind: 'function', v: 'x',
        hyp: [{ p: 'positive', of: '-f', on: [String(a), String(a)], say: `f(${fr(a)}) < 0` }, { p: 'positive', on: [String(b), String(b)], say: `f(${b}) > 0` }],
        concl: { p: 'zeroIn', on: [String(a), String(b)], say: `f a un zéro dans [${fr(a)} ; ${b}]` },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calc', 'calcfn'] }], answer: { f: m === 0 ? '1/x' : `1/(x-${mt})` },
      },
      ruleIfTrue: 'a1_ivt_no_continuity', key: `cont:${a}:${b}`, exam: tfTag,
      explanation: `Faux sans continuité : f(x) = ${m === 0 ? '1/x' : `1/(x − ${fr(mt)})`} change de signe sur [${fr(a)} ; ${b}] mais n'a pas de zéro ; la bissection s'approche de ${fr(mt)}, où f n'est pas définie.`,
    });
  }
  if (kind === 'error') {
    const L = rng.pick([1, 2, 4]);
    return tfItem({ skill: BIS, level: 4, statement: `Après n étapes de bissection sur [0 ; ${L}], le zéro est à moins de ${L}/2ⁿ du milieu du dernier intervalle.`, truth: true, key: `err:${L}`, exam: tfTag,
      explanation: `Vrai : après n étapes, l'intervalle mesure ${L}/2ⁿ et contient le zéro ; le milieu en est même à ${L}/2ⁿ⁺¹ au plus.` });
  }
  const k = rng.pick(['1/2', '2/3', '9/10']);
  return tfItem({ skill: BIS, level: 4, statement: `Si g([a ; b]) ⊂ [a ; b] et |g′(x)| ≤ ${k} sur [a ; b], alors g a un unique point fixe dans [a ; b], limite de xₙ₊₁ = g(xₙ).`, truth: true, key: `fixed:${k}`, exam: tfTag,
    explanation: `Vrai : par les accroissements finis, |g(x) − g(y)| ≤ ${k}·|x − y| : g est contractante, et le théorème du point fixe s'applique.` });
}

function bisItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return bisMcq(rng, opts);
  if (opts.exam === 'tf') return bisTf(rng);
  if (level === 3) return bisTap(level, rng, opts);
  return bisTableItem(level, rng, opts);
}

export const GEN = { [BIS]: bisItem };
