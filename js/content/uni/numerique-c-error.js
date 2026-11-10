// n-interp-error and n-chebyshev (module N, part c, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md.
//
// n-interp-error. Data: f ∈ {sin, cos on [0 ; π] or [0 ; π/2], 1/(1 + x),
// ln(1 + x) on [0 ; b], eˣ on [0 ; b]}, n ∈ {1, 2, 3}, equispaced nodes;
// |f⁽ⁿ⁺¹⁾| is monotone or reaches 1, so max|f⁽ⁿ⁺¹⁾| is exact (1, (n+1)!, n!,
// eᵇ) and the bound max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹ is a closed number.
// L1 the derivative given, M, h and the bound guided; L2 the derivative to
// write too; L3 with menus; L4 the smallest n for a tolerance, read on a
// table of bounds; L5 Runge's table, then a multiple choice. Exam: mcq (the
// bound, or Runge's table), tf.
// n-chebyshev. Data: n ∈ {1, 2} (exact cosines √2/2, √3/2, 0), [a ; b] with
// b − a even. L1 the cosines guided; L2 the transport to [a ; b]; L3 the
// choice of the nodes (Runge), then the nodes with menus; L4 free, with
// max|Π(x − xᵢ)| = 2⁻ⁿ((b − a)/2)ⁿ⁺¹; L5 the program cheb, then Runge's
// table. Exam: tf.

import { Q } from '../../math/rational.js';
import { linesItem, tfItem, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import {
  refCode, codeItem, holesFor, readtableItem, multiMcq, tableHtml, expText, blankBy, vfMcq,
} from './numerique-kit.js';
import { q, fq, H, rungeRows } from './numerique-c-kit.js';

const IE = 'n-interp-error';
const CH = 'n-chebyshev';
const KEYS = ['calc', 'calcfn'];

const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const sup = (k) => String(k).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('');

// A closed number c·atom: text for the CAS, readable text.
function closed(c, atom) {
  const v = q(c);
  if (!atom) return { text: String(v), html: fq(v) };
  const num = v.n === 1 ? atom.text : `${v.n}×${atom.text}`;
  const text = v.d === 1 ? num : `${num}/${v.d}`;
  const nh = v.n === 1 ? atom.html : `${v.n}${atom.html}`;
  return { text, html: v.d === 1 ? nh : `${nh}/${v.d}` };
}
const piPow = (k) => ({ text: k === 1 ? 'π' : `π^${k}`, html: k === 1 ? 'π' : `π${sup(k)}`, value: Math.PI ** k });
const ePow = (k) => ({ text: k === 1 ? 'e' : `e^${k}`, html: k === 1 ? 'e' : `e${sup(k)}`, value: Math.E ** k });

// The k-th derivative (text) of each function.
const DERIV = {
  sin: (k) => ['sin(x)', 'cos(x)', '-sin(x)', '-cos(x)'][k % 4],
  cos: (k) => ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)'][k % 4],
  inv: (k) => `${k % 2 ? '-' : ''}${fact(k)}/(1+x)^${k + 1}`,
  ln: (k) => `${k % 2 ? '' : '-'}${fact(k - 1)}/(1+x)^${k}`,
  exp: () => 'e^x',
};
const FNAME = { sin: 'sin x', cos: 'cos x', inv: '1/(1 + x)', ln: 'ln(1 + x)', exp: 'eˣ' };
const FTEXT = { sin: 'sin(x)', cos: 'cos(x)', inv: '1/(1+x)', ln: 'ln(1+x)', exp: 'e^x' };
const readable = (t) => t.replace(/\^(\d+)/g, (_, d) => sup(d)).replace(/-/g, '−').replace(/\(x\)/g, ' x').replace(/e\^x/, 'eˣ');

// max|f⁽ᵏ⁾| on [0 ; b]: {c, atom} (c rational).
function maxDeriv(kind, k, b) {
  switch (kind) {
    case 'sin': case 'cos': return { c: q(1), atom: null, note: `|${readable(DERIV[kind](k))}| ≤ 1, atteint sur l'intervalle` };
    case 'inv': return { c: q(fact(k)), atom: null, note: `|f⁽${sup(k)}⁾(x)| = ${fact(k)}/(1 + x)${sup(k + 1)} décroît : maximum en x = 0` };
    case 'ln': return { c: q(fact(k - 1)), atom: null, note: `|f⁽${sup(k)}⁾(x)| = ${fact(k - 1)}/(1 + x)${sup(k)} décroît : maximum en x = 0` };
    default: return { c: q(1), atom: ePow(b), note: `eˣ croît : maximum en x = ${b}` };
  }
}

function ieData(rng) {
  const kind = rng.pick(['sin', 'cos', 'inv', 'ln', 'exp']);
  const n = rng.pick([1, 2, 3]);
  let hq; let hAtom = null; let b; let bHtml;
  if (kind === 'sin' || kind === 'cos') {
    const half = rng.chance(0.5);
    b = half ? 'π/2' : 'π';
    bHtml = b;
    hq = q(1, half ? 2 * n : n);
    hAtom = piPow(1);
  } else {
    const bb = kind === 'exp' ? rng.pick([1, 2]) : rng.pick([1, 2]);
    b = String(bb);
    bHtml = b;
    hq = q(bb, n);
  }
  const M = maxDeriv(kind, n + 1, Number(b) || 1);
  // bound = M/(4(n+1))·h^(n+1)
  const k = n + 1;
  const hk = hq.pow(k);
  const coef = M.c.div(4 * (n + 1)).mul(hk);
  const atom = hAtom ? piPow(k) : M.atom;
  const bound = closed(coef, atom);
  // The trap: f⁽ⁿ⁾, 4n and hⁿ.
  const Mw = maxDeriv(kind, n, Number(b) || 1);
  const cw = Mw.c.div(4 * n).mul(hq.pow(n));
  const wrong = closed(cw, hAtom ? piPow(n) : Mw.atom);
  const h = hAtom ? closed(hq, piPow(1)) : closed(hq, null);
  const Mc = closed(M.c, M.atom);
  const value = coef.valueOf() * (atom ? atom.value : 1);
  return { kind, n, b, bHtml, h, hq, M, Mc, bound, wrong, value, k };
}

const SUB_IE = [
  { id: 'deriv', label: 'la dérivée d\'ordre n + 1', skill: 'g6-deriv-rules' },
  { id: 'max', label: 'majorer sur [a ; b]', skill: 'a1-extrema-global' },
  { id: 'bound', label: 'la borne d\'erreur', skill: IE },
  { id: 'interp', label: 'le polynôme d\'interpolation', skill: 'n-interp-lagrange' },
];
const MENU = [
  { id: 'deriv', label: 'Dériver n + 1 fois' },
  { id: 'max', label: 'Majorer |f⁽ⁿ⁺¹⁾| sur [a ; b]' },
  { id: 'h', label: 'Calculer h' },
  { id: 'bound', label: 'Assembler la borne' },
];
const menuOf = (id) => MENU.map((o) => ({ id: o.id, label: o.label, valid: o.id === id, why: o.id === id ? undefined : 'Pas maintenant : ce n\'est pas l\'étape suivante.' }));

function ieScript(d, { guided = false, deriv = true, menu = false } = {}) {
  const M = (id) => (menu ? { menu: menuOf(id) } : {});
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const out = [];
  const dtext = DERIV[d.kind](d.k);
  if (deriv) {
    out.push({ kind: 'segment', html: `La dérivée d'ordre n + 1 = ${d.k} de f(x) = ${FNAME[d.kind]}.`, ask: `f⁽${sup(d.k)}⁾(x) =`, start: { math: `d(${FTEXT[d.kind]},x,${d.k})` }, judge: { kind: 'equiv', vars: ['x'], domain: { x: [0.1, 2] }, target: 'no-prime', ...M('deriv') } });
    out.push(g({ kind: 'eq', math: dtext, note: 'Dériver n + 1 fois', subgoal: 'deriv' }));
  }
  out.push({ kind: 'segment', html: `Le maximum de |f⁽${sup(d.k)}⁾| sur [0 ; ${d.bHtml}].`, ask: 'M =', start: { math: 'M' }, judge: { kind: 'value', expect: d.Mc.text, form: 'closed', ...M('max') } });
  out.push(g({ kind: 'eq', math: d.Mc.text, note: d.M.note, subgoal: 'max' }));
  out.push({ kind: 'segment', html: `Le pas : h = (b − a)/n avec n = ${d.n}.`, ask: 'h =', start: { math: 'h' }, judge: { kind: 'value', expect: d.h.text, form: 'closed', ...M('h') } });
  out.push(g({ kind: 'eq', math: d.h.text, note: `[0 ; ${d.bHtml}] en ${d.n} sous-intervalle${d.n > 1 ? 's' : ''}`, subgoal: 'bound' }));
  const startB = `(${d.Mc.text})/(4×${d.k})×(${d.h.text})^${d.k}`;
  out.push({ kind: 'segment', html: 'La borne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.', ask: 'borne =', start: { math: startB }, judge: { kind: 'value', form: 'closed', interr: { wrong: d.wrong.text, n1: d.n + 1, fact: fact(d.n + 1) }, ...M('bound') } });
  out.push(g({ kind: 'eq', math: d.bound.text, note: `≈ ${String(Number(d.value.toPrecision(3))).replace('.', ',')}`, subgoal: 'bound' }));
  return out;
}

function split(script) {
  const [seg, ...rest] = script;
  return { start: seg.start.math, judge: seg.judge, script: seg.html ? [{ kind: 'note', html: seg.html }, ...rest] : rest };
}

const ieHints = (d) => H(
  'La borne fait intervenir la dérivée d\'ordre n + 1 et hⁿ⁺¹ : max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.',
  `borne = (${d.Mc.html})/(4·□)·(${d.h.html})${sup(d.k)}`,
  `borne = ${d.bound.html} ≈ ${String(Number(d.value.toPrecision(3))).replace('.', ',')}.`,
);

function ieLines(rng, level) {
  const d = ieData(rng);
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  const parts = ieScript(d, { guided: level <= 2, deriv: level >= 2, menu: level === 3 });
  const { start, judge, script } = split(parts);
  const given = level === 1 ? ` On donne f⁽${sup(d.k)}⁾(x) = ${readable(DERIV[d.kind](d.k))}.` : '';
  return linesItem({
    skill: IE, level, mode, keys: KEYS, ...(level === 3 ? { tapActions: 'menu' } : {}),
    prompt: `On interpole f(x) = ${FNAME[d.kind]} sur [0 ; ${d.bHtml}] en n + 1 = ${d.n + 1} nœuds équirépartis. Majore l'erreur : max|f − Πₙf| ≤ max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹.${given}`,
    start, judge, script,
    hints: ieHints(d), subgoals: SUB_IE, baits: ['n_interp_error_factorial'],
    key: `${IE}:${level}:${d.kind}:${d.n}:${d.b}`,
  });
}

// L4: the smallest n, on a table of bounds of eˣ on [0 ; 1].
function ieTable(rng) {
  const b = rng.pick([1, 2]);
  const rows = [];
  for (let n = 1; n <= 8; n++) rows.push({ n, v: (Math.E ** b / (4 * (n + 1))) * (b / n) ** (n + 1) });
  const choices = [3, 4, 5, 6, 7, 8].filter((k) => {
    const nmin = rows.find((r) => r.v <= 10 ** -k)?.n;
    return nmin && nmin >= 2 && nmin <= 7 && rows.every((r) => Math.abs(Math.log10(r.v) + k) > 0.05);
  });
  const k = rng.pick(choices);
  const nmin = rows.find((r) => r.v <= 10 ** -k).n;
  const table = { columns: ['n', 'max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹'], rows: rows.map((r) => [String(r.n), expText(r.v, 3)]) };
  return readtableItem({
    skill: IE, level: 4, key: `${b}:${k}`,
    prompt: `On interpole f(x) = eˣ sur [0 ; ${b}] en n + 1 nœuds équirépartis (h = ${b}/n). Le tableau donne la borne de l'erreur pour chaque n.`,
    table,
    question: mcqDistinct({
      skill: IE, level: 4, key: `${IE}:4q:${b}:${k}`,
      prompt: `Quel est le plus petit n qui garantit une erreur ≤ 10⁻${sup(k)} ?`,
      right: String(nmin),
      wrongs: [{ html: String(nmin - 1) }, { html: String(nmin + 1) }],
      fillers: [{ html: String(nmin + 2) }, { html: 'Aucun : la borne ne descend pas assez' }],
      solution: [{ html: `La borne passe sous 10⁻${sup(k)} pour la première fois en n = ${nmin} (${expText(rows[nmin - 1].v, 3)}) ; pour n = ${nmin - 1}, elle vaut ${expText(rows[nmin - 2].v, 3)}.`, note: '' }],
    }, rng),
    hints: H('Cherche la première ligne où la borne est ≤ la tolérance.', `10⁻${sup(k)} = 1e-${String(k).padStart(2, '0')} : compare les exposants.`, `n = ${nmin}.`),
    subgoals: SUB_IE,
  });
}

// Runge's table.
let RUNGE = null;
export function rungeTable() {
  RUNGE ||= rungeRows();
  return { columns: ['n', 'nœuds équirépartis', 'nœuds de Tchebychev'], rows: RUNGE.map((r) => [String(r.n), expText(r.equi, 3), expText(r.cheb, 3)]) };
}
const RUNGE_PROMPT = 'f(x) = 1/(1 + x²) sur [−5 ; 5] : max|f − Πₙf| pour n + 1 nœuds.';

export function rungeQuestion(skill, level, rng, key) {
  const t = rungeTable();
  return multiMcq({
    skill, level, key: `${skill}:runge:${key}`,
    prompt: 'Que montre ce tableau ?',
    options: [
      { html: 'Avec des nœuds équirépartis, l\'erreur augmente avec n', correct: true },
      { html: 'Avec les nœuds de Tchebychev, l\'erreur diminue quand n augmente', correct: true },
      { html: 'Plus de nœuds donne toujours une meilleure approximation', correct: false, rule: 'n_runge_more_nodes' },
      { html: 'Les deux jeux de nœuds donnent la même erreur pour n grand', correct: false },
    ],
    solution: [{ html: `Équirépartis : l'erreur passe de ${t.rows[0][1]} à ${t.rows[3][1]} (phénomène de Runge, aux bords) ; Tchebychev : de ${t.rows[0][2]} à ${t.rows[3][2]}.`, note: '' }],
  }, rng);
}

function ie5(rng) {
  return readtableItem({
    skill: IE, level: 5, key: 'runge', prompt: RUNGE_PROMPT, table: rungeTable(),
    question: rungeQuestion(IE, 5, rng, '5'), subgoals: SUB_IE,
  });
}

function ieMcq(rng, opts) {
  if (rng.chance(0.4)) {
    const qn = rungeQuestion(IE, 4, rng, 'exam');
    return { ...qn, prompt: `${RUNGE_PROMPT}${tableHtml(rungeTable())}${qn.prompt}`, exam: examTag(opts) };
  }
  const d = ieData(rng);
  const k = d.k;
  // A third wrong value: without the 4(n + 1) (f⁽ⁿ⁺¹⁾/(n + 1)!·hⁿ⁺¹ read as (n+1)! only).
  const alt = closed(q(d.M.c).div(fact(k)).mul(d.hq.pow(k)), d.h.text.includes('π') ? piPow(k) : d.M.atom);
  return mcqDistinct({
    skill: IE, level: 4, key: `${IE}:mcq:${d.kind}:${d.n}:${d.b}`, exam: examTag(opts),
    prompt: `On interpole f(x) = ${FNAME[d.kind]} sur [0 ; ${d.bHtml}] en ${d.n + 1} nœuds équirépartis. Quelle borne donne max|f⁽ⁿ⁺¹⁾|/(4(n + 1))·hⁿ⁺¹ ?`,
    right: d.bound.html,
    wrongs: [{ html: d.wrong.html, rule: 'n_interp_error_factorial' }, { html: alt.html }],
    fillers: [{ html: closed(q(d.M.c).div(4 * k).mul(d.hq.pow(k + 1)), d.h.text.includes('π') ? piPow(k + 1) : d.M.atom).html }, { html: closed(q(d.M.c).mul(d.hq.pow(k)), d.h.text.includes('π') ? piPow(k) : d.M.atom).html }],
    solution: [{ html: `n = ${d.n}, h = ${d.h.html}, max|f⁽${sup(k)}⁾| = ${d.Mc.html} : ${d.Mc.html}/(4·${k})·(${d.h.html})${sup(k)} = ${d.bound.html}.`, note: '' }],
  }, rng);
}

function ieTf(rng, opts) {
  if (rng.chance(0.5)) {
    return vfMcq({
      skill: IE, level: 4, key: `${IE}:tf:runge`, exam: examTag(opts), truth: false, ruleIfTrue: 'n_runge_more_nodes',
      statement: 'Plus on prend de nœuds équirépartis, plus le polynôme d\'interpolation est proche de f.',
      explanation: `Faux : pour f(x) = 1/(1 + x²) sur [−5 ; 5], l'erreur maximale vaut ${rungeTable().rows[0][1]} pour n = 4 et ${rungeTable().rows[3][1]} pour n = 16 (phénomène de Runge).`,
    }, rng);
  }
  return tfItem({
    skill: IE, level: 4, key: 'nodes', exam: examTag(opts), truth: true,
    statement: 'L\'erreur d\'interpolation f(x) − Πₙf(x) est nulle en chaque nœud xᵢ.',
    explanation: 'Vrai : Πₙf(xᵢ) = f(xᵢ) par définition, et le facteur Π(x − xⱼ) s\'annule en xᵢ.',
  });
}

// ======================================================================
// n-chebyshev
// ======================================================================

// cos((2i + 1)π/(2(n + 1))) for n ∈ {1, 2}: [coefficient, radicand] terms.
const COS = {
  1: [{ ang: 'π/4', t: [[q(1, 2), 2]] }, { ang: '3π/4', t: [[q(-1, 2), 2]] }],
  2: [{ ang: 'π/6', t: [[q(1, 2), 3]] }, { ang: 'π/2', t: [] }, { ang: '5π/6', t: [[q(-1, 2), 3]] }],
};
// c + r·t, as text: 2+√3, 1-√2, 0, √3/2.
function termsText(c, terms, html = false) {
  const parts = [];
  if (q(c).n !== 0 || !terms.length) parts.push({ neg: q(c).n < 0, s: fq(q(c).n < 0 ? q(c).neg() : c) });
  for (const [k, rad] of terms) {
    const v = q(k);
    const a = v.n < 0 ? v.neg() : v;
    const num = a.n === 1 ? `√${rad}` : `${a.n}√${rad}`;
    parts.push({ neg: v.n < 0, s: a.d === 1 ? num : `${num}/${a.d}` });
  }
  const out = parts.map((p, i) => (i === 0 ? (p.neg ? `-${p.s}` : p.s) : `${p.neg ? '-' : '+'}${p.s}`)).join('');
  return html ? out.replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/^ − /, '−') : out;
}
const tText = (node, html) => termsText(0, node.t, html);

function chData(rng, { general = true } = {}) {
  const n = rng.pick([1, 2]);
  let a; let b;
  if (!general) { a = -1; b = 1; } else {
    for (;;) {
      a = rng.int(-3, 3);
      const len = rng.pick([2, 4, 6]);
      b = a + len;
      if (!(a === -1 && b === 1)) break;
    }
  }
  const c = (a + b) / 2;
  const r = (b - a) / 2;
  const nodes = COS[n].map((x) => ({ ...x, x: termsText(c, x.t.map(([k, rad]) => [q(k).mul(r), rad])) }));
  return { n, a, b, c, r, nodes };
}

const SUB_CH = [
  { id: 'nodes', label: 'les nœuds tᵢ', skill: CH },
  { id: 'map', label: 'le transport vers [a ; b]', skill: CH },
  { id: 'error', label: 'le facteur Π(x − xᵢ) de l\'erreur', skill: 'n-interp-error' },
];
const CMENU = [
  { id: 'nodes', label: 'Calculer tᵢ = cos((2i + 1)π/(2(n + 1)))' },
  { id: 'map', label: 'Transporter : xᵢ = (a + b)/2 + (b − a)/2·tᵢ' },
  { id: 'max', label: 'Calculer max|Π(x − xᵢ)|' },
];
const cmenu = (id) => CMENU.map((o) => ({ id: o.id, label: o.label, valid: o.id === id, why: o.id === id ? undefined : 'Pas maintenant.' }));

function chScript(d, { cos = true, map = true, guided = false, menu = false, maxPi = false } = {}) {
  const out = [];
  const g = (line) => (guided ? { ...line, ...blankBy(line.math, [line.math]) } : line);
  const M = (id) => (menu ? { menu: cmenu(id) } : {});
  const N = d.n + 1;
  if (cos) {
    d.nodes.forEach((x, i) => {
      out.push({ kind: 'segment', html: `t${'₀₁₂'[i]} = cos((2·${i} + 1)π/(2·${N})).`, ask: `t${'₀₁₂'[i]} =`, start: { math: `cos(${x.ang})` }, judge: { kind: 'value', expect: tText(x) || '0', form: 'exact', ...M('nodes') } });
      out.push(g({ kind: 'eq', math: tText(x) || '0', note: 'Valeur exacte du cosinus', subgoal: 'nodes' }));
    });
  }
  if (map) {
    d.nodes.forEach((x, i) => {
      const t = tText(x) || '0';
      out.push({ kind: 'segment', html: `x${'₀₁₂'[i]} = (a + b)/2 + (b − a)/2·t${'₀₁₂'[i]} = ${fq(d.c)} + ${fq(d.r)}·(${rd(tText(x))}).`, ask: `x${'₀₁₂'[i]} =`, start: { math: `x_${i}` }, judge: { kind: 'value', expect: x.x, form: 'exact', cheb: { t }, ...M('map') } });
      out.push(g({ kind: 'eq', math: x.x, note: `(a + b)/2 = ${fq(d.c)}, (b − a)/2 = ${fq(d.r)}`, subgoal: 'map' }));
    });
  }
  if (maxPi) {
    const v = q(d.r).pow(d.n + 1).div(2 ** d.n);
    out.push({ kind: 'segment', html: `max|Π(x − xᵢ)| sur [${fq(d.a)} ; ${fq(d.b)}] = 2⁻ⁿ·((b − a)/2)ⁿ⁺¹.`, ask: 'max|Π| =', start: { math: `2^(-${d.n})×${d.r}^${d.n + 1}` }, judge: { kind: 'value', form: 'irreducible', ...M('max') } });
    out.push({ kind: 'eq', math: String(v), note: 'Le plus petit possible pour n + 1 nœuds', subgoal: 'error' });
  }
  return out;
}
const split2 = split;

const rd = (t) => String(t).replace(/\+/g, ' + ').replace(/(\S)-/g, '$1 − ').replace(/^-/, '−');
const chHints = (d, level) => H(
  'Les nœuds de Tchebychev sont les cosinus des angles (2i + 1)π/(2(n + 1)), puis on les transporte de [−1 ; 1] vers [a ; b].',
  level === 1 ? `t₀ = cos(□/(2·${d.n + 1}))` : `x₀ = ${fq(d.c)} + ${fq(d.r)}·□`,
  level === 1 ? `t = ${d.nodes.map((x) => rd(tText(x))).join(' ; ')}.` : `Sur [−1 ; 1] : ${d.nodes.map((x) => rd(tText(x))).join(' ; ')} ; sur [${fq(d.a)} ; ${fq(d.b)}] : ${d.nodes.map((x) => rd(x.x)).join(' ; ')}.`,
);

function chLines(rng, level) {
  const d = chData(rng);
  const opts = level === 1 ? { cos: true, map: false, guided: true }
    : level === 2 ? { cos: false, map: true, guided: true }
      : level === 3 ? { cos: true, map: true, menu: true }
        : { cos: true, map: true, maxPi: true };
  const parts = chScript(d, opts);
  const { start, judge, script } = split2(parts);
  const decision = level === 3 ? [{
    kind: 'decision', prompt: 'Pour interpoler 1/(1 + x²) sur un grand intervalle, quels nœuds choisir ?', options: [
      { id: 'cheb', label: 'Les nœuds de Tchebychev, resserrés près des bords', valid: true, ref: true },
      { id: 'equi', label: 'Des nœuds équirépartis, et beaucoup', valid: false, rule: 'n_runge_more_nodes', why: 'Avec des nœuds équirépartis, l\'erreur explose aux bords quand n augmente : c\'est le phénomène de Runge.' },
    ],
  }] : [];
  const given = level === 2 ? ` Sur [−1 ; 1], les nœuds sont ${d.nodes.map((x) => rd(tText(x))).join(' ; ')}.` : '';
  return linesItem({
    skill: CH, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS, ...(level === 3 ? { tapActions: 'menu' } : {}),
    prompt: level === 1
      ? `Calcule les ${d.n + 1} nœuds de Tchebychev sur [−1 ; 1] pour n = ${d.n} : tᵢ = cos((2i + 1)π/(2(n + 1))).`
      : `Nœuds de Tchebychev pour n = ${d.n} sur [${fq(d.a)} ; ${fq(d.b)}].${given}${level >= 4 ? ' Donne les nœuds, puis max|Π(x − xᵢ)| sur l\'intervalle.' : ''}`,
    start, judge, script: [...decision, ...script],
    hints: chHints(d, level), subgoals: SUB_CH, baits: level >= 2 ? ['n_cheb_no_mapping'] : [],
    key: `${CH}:${level}:${d.n}:${d.a}:${d.b}`,
  });
}

const CHEB = refCode(`def cheb(n, a, b):
    xs = []
    for i in range(n + 1):
        t = «math.cos((2 * i + 1) * math.pi / (2 * (n + 1)))»
        xs.append(«(a + b) / 2 + (b - a) / 2 * t»)
    return xs
`);
const CH_TRAPS = { 0: [{ text: 'math.cos((2 * i + 1) * math.pi / (2 * n))' }, { text: 'math.cos(i * math.pi / n)' }], 1: [{ text: 't', rule: 'n_cheb_no_mapping' }, { text: '(a + b) / 2 + (b - a) * t' }] };
const CH_TESTS = [
  { expr: 'cheb(2, -1, 1)[0]', expect: '0.8660254037844387', tol: 1e-12 },
  { expr: 'cheb(2, -1, 1)[1]', expect: '0.0', atol: 1e-12 },
  { expr: 'cheb(2, 0, 4)', expect: '[3.7320508075688776, 2.0, 0.2679491924311226]', tol: 1e-12 },
];

function ch5(rng) {
  const then = readtableItem({
    skill: CH, level: 5, key: 'runge', prompt: `Avec ces nœuds, on interpole ${RUNGE_PROMPT}`, table: rungeTable(),
    question: rungeQuestion(CH, 5, rng, 'ch5'),
  });
  return codeItem({
    skill: CH, level: 5, ref: CHEB, blanks: holesFor(5, CHEB), traps: CH_TRAPS, rng,
    prompt: 'Complète la fonction qui renvoie les n + 1 nœuds de Tchebychev sur [a ; b].',
    tests: CH_TESTS, then, hints: [], subgoals: SUB_CH, key: '5',
  });
}

function chTf(rng, opts) {
  const pick = rng.int(0, 1);
  if (pick === 0) {
    return tfItem({
      skill: CH, level: 4, key: 'conv', exam: examTag(opts), truth: true,
      statement: 'Avec les nœuds de Tchebychev, l\'interpolant de 1/(1 + x²) sur [−5 ; 5] converge vers f quand n → ∞.',
      explanation: `Vrai : l'erreur maximale passe de ${rungeTable().rows[0][2]} (n = 4) à ${rungeTable().rows[3][2]} (n = 16).`,
    });
  }
  return tfItem({
    skill: CH, level: 4, key: 'max', exam: examTag(opts), truth: true,
    statement: 'Pour les n + 1 nœuds de Tchebychev de [−1 ; 1], max|Π(x − tᵢ)| = 2⁻ⁿ sur [−1 ; 1].',
    explanation: 'Vrai : Π(x − tᵢ) = Tₙ₊₁(x)/2ⁿ, et |Tₙ₊₁| ≤ 1. Pour n = 2 : x³ − 3x/4, de maximum 1/4.',
  });
}

export const GEN = {
  [IE]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return ieMcq(rng, opts);
    if (opts.exam === 'tf') return ieTf(rng, opts);
    if (level <= 3) return ieLines(rng, level);
    if (level === 4) return rng.chance(0.5) ? ieTable(rng) : ieLines(rng, 4);
    return ie5(rng);
  },
  [CH]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return chTf(rng, opts);
    if (level <= 4) return chLines(rng, level);
    return ch5(rng);
  },
};

export { Q };
