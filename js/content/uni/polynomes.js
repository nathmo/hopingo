// Generators of module G0 (unit `polynomes`), spec §8.3. Catalogue:
// docs/universite/G-gymnase-1.md, G0.
//
// Levels: 1–2 guided (lines with boxes, notes, decisions), 3 choose the
// action then write the line (menus computed from the student's line, or
// written for each part), 4 free lines with hints, 5 alone. Horner is a
// table (judge `iter`) followed by the line P = (x − a)Q + R (judge `poly`).
// Every generator starts from the answer (roots, quotient, remainder,
// decomposition) and builds the question from it (§8.4 « beaux nombres »).
// opts.exam = 'mcq' | 'tf' | 'coef' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { mapNode, lit, stripParen } from '../../cas/ast.js';
import { Poly } from '../../cas/poly.js';
import {
  polyOf, fromQ, qCoeffs, horner, polyNode, qNode, linNode, productNode, factorQ, divide, degree, evalQ,
} from '../../cas/polyx.js';
import { blankLine } from '../../judges/lines.js';
import {
  MM, MT, fr, linesItem, mcq, tfItem, tableItem, answerItem,
} from './kit.js';

const V = 'x';
const q = (n, d = 1) => new Q(n, d);
const PT = (p) => toText(polyNode(p));
const QT = (cs) => toText(qNode(cs));
const lin = (r) => toText(linNode(r));
const MP = (p) => MM(polyNode(p));
const prodText = (coef, fs) => toText(productNode(coef, fs.map((f) => ({ node: typeof f.node === 'string' ? parse(f.node) : f.node, k: f.k }))));
const big = (p, lim) => qCoeffs(p).some((c) => Math.abs(c.valueOf()) > lim);
const lit0 = (x) => toText(lit(Q.of(x)));
const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const P1 = (r) => fromQ([q(-r), q(1)]); // x − r
const prodPoly = (rs) => rs.reduce((p, r) => p.mul(P1(r)), Poly.const(1));
// P with x replaced by a, as text: (−1)^3 − 2×(−1)^2 …
// P with x replaced by a: brackets around negative values only (always,
// with brackets: when the coefficients hold a parameter, (λ − 2)(3)).
const at = (p, a, always = false) => {
  const lead = qCoeffs(p)?.at(-1);
  const wrap = always || Q.of(a).n < 0 || Q.of(a).d > 1 || (lead && lead.n < 0);
  return toText(mapNode(polyNode(p), (n) => (n.t === 'sym' && n.name === V ? (wrap ? { t: 'paren', e: lit(Q.of(a)) } : lit(Q.of(a))) : n)));
};
// x − r as a factor in a sentence: (x − 2), or x alone.
const facR = (r) => (r === 0 ? 'x' : `(${RT(lin(r))})`);
// a − (b) written with its sign: 5 − 3, 5 − (−3).
const minus = (a, b) => `${lit0(a)}-${Q.of(b).n < 0 ? `(${lit0(b)})` : lit0(b)}`;
const tpl = (math, holes) => blankLine(parse(math), holes);
const RT = (t) => toReadable(parse(t));

// ======================================================================
// g0-identify
// ======================================================================

const IDENT = 'g0-identify';
const IDENT_SUB = [
  { id: 'develop', label: 'développer et ordonner', skill: 'lit-polynomial' },
  { id: 'identify', label: 'identifier degré par degré', skill: IDENT },
  { id: 'solve', label: 'résoudre le système', skill: 'eq-systems' },
];
const PARAMS3 = ['a', 'b', 'c'];
const PARAMS4 = ['a', 'b', 'c', 'd'];

// The left side, developed: a polynomial in x with the parameters inside.
function identData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const four = level === 5;
    const params = four ? PARAMS4 : PARAMS3;
    const vals = { a: q(rng.int(1, 3)) };
    for (const p of params.slice(1)) vals[p] = q(rng.int(-4, 4));
    const base = level >= 3 && !four && rng.chance(0.4);
    let lhs;
    let lhsText;
    if (base) {
      // a(x − s)² + b(x − s) + c = …  (changement de base)
      const s = rng.pick([1, 2, -1]);
      const xs = lin(s);
      lhsText = `a(${xs})^2+b(${xs})+c`;
    } else {
      const r = nz(rng, -3, 3);
      const inner = four ? 'ax^3+bx^2+cx+d' : 'ax^2+bx+c';
      lhsText = `(${lin(r)})(${inner})`;
    }
    lhs = polyOf(parse(lhsText));
    const rhs = polyOf(parse(lhsText.replace(/[abcd]/g, (m) => `(${lit0(vals[m])})`)));
    const cs = qCoeffs(rhs);
    if (!cs || (level < 5 && cs.some((c) => c.n === 0)) || cs.length < 3) continue;
    if (cs.some((c) => Math.abs(c.valueOf()) > 30)) continue;
    return { params, vals, lhs, lhsText, rhs, base };
  }
  return null;
}

// a = 2 ; b − 2a = −3 ; … : one equation per power of x.
function identSystem(d) {
  const lc = d.lhs.coeffsIn(V);
  const rc = d.rhs.coeffsIn(V);
  const eqs = [];
  for (let k = lc.length - 1; k >= 0; k--) {
    const l = lc[k];
    if (!l || l.isZero) continue;
    eqs.push(`${toText(polyNode(l, '§'))}=${lit0(rc[k]?.isZero === false ? rc[k].constValue() : 0)}`);
  }
  return eqs.join(';');
}

function identItem(level, rng, opts = {}) {
  const d = identData(rng, level) ?? identData(rng, 4);
  const start = `${d.lhsText}=${PT(d.rhs)}`;
  const developed = `${toText(polyNode(d.lhs))}=${PT(d.rhs)}`;
  const system = identSystem(d);
  const values = d.params.map((p) => `${p}=${lit0(d.vals[p])}`).join(';');
  const judge = { kind: 'poly', mode: 'identity', v: V, params: d.params, solution: Object.fromEntries(d.params.map((p) => [p, lit0(d.vals[p])])) };
  let script = [
    { kind: 'eq', math: developed, note: 'Développer et ordonner', subgoal: 'develop' },
    { kind: 'eq', math: system, note: 'Identifier les coefficients', subgoal: 'identify' },
    { kind: 'eq', math: values, note: 'Résoudre le système', subgoal: 'solve' },
  ];
  let startText = start;
  let mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  if (level === 1) {
    // The development is given: the student fills the system and the values.
    startText = developed;
    const sys = parse(system);
    const vals = parse(values);
    script = [
      { kind: 'note', html: `Développé : ${MT(developed)}` },
      { kind: 'eq', ...tpl(system, sys.items.slice(1).map((r) => r.r)), note: 'Identifier les coefficients', subgoal: 'identify' },
      { kind: 'eq', ...tpl(values, vals.items.slice(1).map((r) => r.r)), note: 'Résoudre', subgoal: 'solve' },
    ];
  }
  const names = d.params.join(', ');
  return linesItem({
    skill: IDENT, level, prompt: `Trouve ${names} tels que ${MT(start)} pour tout x.`,
    start: startText, judge, mode, script,
    hints: [
      { level: 1, html: 'Développe le membre de gauche et range-le selon les puissances de x. Puis une équation par puissance.' },
      { level: 2, html: MT(system) },
      { level: 3, html: MT(values) },
    ],
    subgoals: IDENT_SUB, keys: ['calc', 'letters'], tapActions: level === 3 ? 'identify' : null,
    key: `${IDENT}:${start}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function identExam(rng, exam) {
  const d = identData(rng, 4);
  const start = `${d.lhsText}=${PT(d.rhs)}`;
  if (exam === 'coef') {
    const p = rng.pick(d.params.slice(1));
    return answerItem({ skill: IDENT, level: 4, prompt: `${MT(start)} pour tout x. Que vaut ${p} ?`, expected: lit0(d.vals[p]), key: start, exam: { format: 'coef', points: 1 }, solution: [{ html: MT(identSystem(d)), note: 'Identifier' }] });
  }
  // Distractors: the same identity with the sign of the root changed.
  const vals = (x) => d.params.map((p) => `${p} = ${fr(lit0(x[p]))}`).join(', ');
  const options = [{ html: vals(d.vals), correct: true }];
  const m = d.lhsText.match(/^\(x([+-])(\d+)\)/);
  if (m) {
    const flipped = d.lhsText.replace(/^\(x([+-])(\d+)\)/, `(x${m[1] === '+' ? '-' : '+'}${m[2]})`);
    // Solve the flipped identity by dividing the right side by the flipped factor.
    const div = divide(d.rhs, polyOf(parse(flipped.match(/^\([^)]*\)/)[0])));
    const cs = qCoeffs(div.q);
    if (cs) options.push({ html: d.params.map((p, i) => `${p} = ${fr(lit0(cs[cs.length - 1 - i] ?? 0))}`).join(', '), correct: false });
  }
  const neg = Object.fromEntries(d.params.map((p) => [p, p === 'a' ? d.vals[p] : d.vals[p].neg()]));
  options.push({ html: vals(neg), correct: false });
  const swap = { ...d.vals, b: d.vals.c, c: d.vals.b };
  options.push({ html: vals(swap), correct: false });
  return mcq({
    skill: IDENT, level: 4, prompt: `Pour quelles valeurs a-t-on ${MT(start)} pour tout x ?`,
    options: options.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i), key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: MT(identSystem(d)), note: 'Identifier les coefficients' }],
  }, rng);
}

// ======================================================================
// g0-horner
// ======================================================================

const HORNER = 'g0-horner';

function hornerData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const n = rng.int(3, level >= 4 ? 5 : 4);
    const a = nz(rng, -3, 3);
    const Qc = [nz(rng, -3, 3)];
    for (let k = 1; k < n; k++) Qc.push(q(rng.int(-6, 6)).valueOf());
    const Qp = fromQ(Qc.map((c) => q(c)).reverse());
    const R = rng.int(-9, 9);
    const Pp = Qp.mul(P1(a)).add(Poly.const(R));
    const cs = qCoeffs(Pp);
    if (cs.length !== n + 1 || big(Pp, 20)) continue;
    if (level >= 2 && !cs.some((c) => c.n === 0)) continue;
    return { a, Q: Qp, R: q(R), P: Pp, high: [...cs].reverse() };
  }
  return null;
}

const SUP = ['', '', '²', '³', '⁴', '⁵', '⁶'];
const powLabel = (k) => (k === 0 ? '1' : k === 1 ? 'x' : `x${SUP[k]}`);

// The division line P = (x − a)·Q + R.
function hornerThen(d, level, rng, opts = {}) {
  const B = lin(d.a);
  const final = `(${B})(${PT(d.Q)})+${lit0(d.R)}`.replace('+-', '-');
  return linesItem({
    skill: HORNER, level, prompt: `Écris P(x) = (${MT(B)})·Q(x) + R avec les nombres du tableau.`,
    start: PT(d.P), judge: { kind: 'poly', mode: 'div', v: V, dividend: PT(d.P), divisor: B }, mode: 'free',
    script: [{ kind: 'eq', math: final, note: 'Lire Q et R', subgoal: 'read' }],
    hints: [
      { level: 1, html: 'Les cases b, sauf la dernière, sont les coefficients de Q, de degré un de moins que P. La dernière case est R = P(a).' },
      { level: 2, html: `(${RT(B)})(…) ${d.R.n < 0 ? '−' : '+'} ${fr(lit0(d.R.n < 0 ? d.R.neg() : d.R))}` },
      { level: 3, html: MT(final) },
    ],
    noHints: level >= 5 || !!opts.exam,
    subgoals: [{ id: 'read', label: 'lire Q et R', skill: HORNER }],
    key: `${HORNER}:then:${PT(d.P)}`, followError: false,
  });
}

function hornerItem(level, rng, opts = {}) {
  const d = hornerData(rng, level) ?? hornerData(rng, 3);
  const { b, prods } = horner(d.high, d.a);
  const n = d.high.length;
  const cols = d.high.map((_, j) => powLabel(n - 1 - j));
  const T = (x) => (x === null ? null : fr(lit0(x)));
  const coefInput = level >= 2;
  const prodGiven = level === 2;
  const rows = [
    { id: 'coef', label: 'coefficients', cells: d.high.map(() => (coefInput ? { input: true } : null)) },
    { id: 'prod', label: `× a`, cells: prods.map((p, j) => (j === 0 ? null : prodGiven ? { given: T(p) } : level === 1 && j % 2 === 0 ? { given: T(p) } : { input: true })) },
    { id: 'b', label: 'b', cells: b.map((x, j) => (level === 1 && j % 2 === 1 ? { given: T(x) } : { input: true })) },
  ];
  if (!coefInput) rows[0].cells = d.high.map((c) => ({ given: T(c) }));
  const answers = {
    coef: d.high.map((c) => T(c)),
    prod: prods.map((p) => T(p)),
    b: b.map((x) => T(x)),
    root: String(d.a),
  };
  const divisor = lin(d.a);
  const rootCell = level === 1 || level === 2 ? { given: fr(String(d.a)) } : { input: true };
  return tableItem({
    skill: HORNER, level,
    prompt: `Divise P(x) = ${MP(d.P)} par ${MT(divisor)} avec le schéma de Horner${level >= 3 ? ' (choisis d\'abord a)' : ''}.`,
    table: { cols, rows, root: rootCell },
    phi: { kind: 'horner', root: String(d.a), coeffs: d.high.map((c) => c.toString()) },
    answers,
    then: hornerThen(d, level, rng, opts),
    hints: [
      { level: 1, html: `N'oublie pas les coefficients nuls. Pour ${fr(divisor)}, on utilise a = ${fr(String(d.a))}.` },
      { level: 2, html: `Case suivante : ${fr(lit0(d.high[1]))} + ${fr(String(d.a))}·${fr(lit0(b[0]))} = …` },
      { level: 3, html: `b : ${b.map((x) => fr(lit0(x))).join(' ; ')}` },
    ],
    noHints: level >= 5 || !!opts.exam,
    baits: ['g0_horner_sign', 'g0_horner_zero', 'g0_horner_degree'],
    solution: [
      { html: `Coefficients : ${d.high.map((c) => fr(lit0(c))).join(' ; ')} ; a = ${fr(String(d.a))}`, note: 'Tous les coefficients' },
      { html: `b : ${b.map((x) => fr(lit0(x))).join(' ; ')}`, note: 'Multiplier, ajouter' },
      { html: `Q(x) = ${MP(d.Q)}, R = ${fr(lit0(d.R))} = P(${fr(String(d.a))})`, note: 'Lire Q et R' },
    ],
    key: `${PT(d.P)}:${d.a}:${level}`,
    exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function hornerExam(rng, exam) {
  const d = hornerData(rng, 4);
  const divisor = lin(d.a);
  if (exam === 'coef') {
    return answerItem({
      skill: HORNER, level: 4, prompt: `On divise P(x) = ${MP(d.P)} par ${MT(divisor)}. Quel est le coefficient de x dans le quotient Q ?`,
      expected: lit0(d.Q.coeffsIn(V)[1]?.constValue() ?? 0), key: `${PT(d.P)}:${d.a}`, exam: { format: 'coef', points: 1 },
      solution: [{ html: `Q(x) = ${MP(d.Q)}, R = ${fr(lit0(d.R))}`, note: '' }],
    });
  }
  const show = (Qp, R) => `Q = ${MP(Qp)}, R = ${fr(lit0(R))}`;
  const options = [{ html: show(d.Q, d.R), correct: true }];
  const add = (Qp, R, rule) => { const h = show(Qp, R); if (options.length < 4 && !options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  const hd = (high, a) => { const { b } = horner(high, a); const R = b.pop(); return [fromQ([...b].reverse()), R]; };
  add(...hd(d.high, -d.a), 'g0_horner_sign');
  const nzc = d.high.filter((c) => c.n !== 0);
  if (nzc.length >= 2) add(...hd(nzc, d.a), 'g0_horner_zero');
  const { b } = horner(d.high, d.a);
  add(fromQ([...b].slice(1).reverse()), b[0], null);
  add(d.Q.mul(Poly.variable(V)), d.R, 'g0_horner_degree');
  return mcq({
    skill: HORNER, level: 4, prompt: `Quel est le quotient Q et le reste R de la division de ${MP(d.P)} par ${MT(divisor)} ?`,
    options, key: `mcq:${PT(d.P)}:${d.a}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: show(d.Q, d.R), note: `Horner en ${fr(String(d.a))}` }],
  }, rng);
}

// ======================================================================
// g0-long-div
// ======================================================================

const LONGDIV = 'g0-long-div';

function longDivData(rng, level) {
  for (let i = 0; i < 300; i++) {
    const lead = level === 5 ? 2 : 1;
    const B = fromQ([q(rng.int(-4, 4)), q(rng.int(-3, 3)), q(lead)]);
    const dq = rng.pick([1, 2]);
    const Qc = [q(nz(rng, -3, 3))];
    for (let k = 0; k < dq; k++) Qc.unshift(q(rng.int(-4, 4)));
    let Qp = fromQ(Qc);
    if (lead === 2) Qp = Qp.scale(q(1, 2));
    const R = rng.chance(0.75) ? fromQ([q(rng.int(-5, 5)), q(rng.int(-4, 4))]) : new Poly();
    const A = B.mul(Qp).add(R);
    const ac = qCoeffs(A);
    if (!ac || ac.some((c) => c.d !== 1) || big(A, 20) || degree(A) !== dq + 2) continue;
    if (qCoeffs(B)[0].n === 0) continue;
    if (rng.chance(0.5) && !ac.some((c) => c.n === 0)) continue;
    return { A, B, Q: Qp, R };
  }
  return null;
}

// The lines A = B·(partial quotient) + (remainder), one term at a time.
function longDivLines(d) {
  const lines = [];
  let Qp = new Poly();
  let R = d.A;
  const dB = degree(d.B);
  const lb = qCoeffs(d.B)[dB];
  while (!R.isZero && degree(R) >= dB) {
    const dr = degree(R);
    const t = Poly.monomial([[V, dr - dB]], qCoeffs(R)[dr].div(lb));
    Qp = Qp.add(t);
    R = R.sub(t.mul(d.B));
    const qt = PT(Qp);
    const rt = R.isZero ? '0' : PT(R);
    lines.push({ math: `A=B×(${qt})+(${rt})`, q: qt, r: rt, t: PT(t) });
  }
  return lines;
}

function longDivItem(level, rng, opts = {}) {
  const d = longDivData(rng, level) ?? longDivData(rng, 4);
  const lines = longDivLines(d);
  const judge = { kind: 'poly', mode: 'div', v: V, dividend: PT(d.A), divisor: PT(d.B), names: { A: PT(d.A), B: PT(d.B) }, divisorName: 'B' };
  let script = lines.map((l, i) => ({ kind: 'eq', math: l.math, note: i === 0 ? `Premier terme : ${RT(l.t)}` : i === lines.length - 1 ? 'deg R < deg B : fini' : `Terme suivant : ${RT(l.t)}`, subgoal: 'step' }));
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  if (level <= 2) {
    script = script.map((l) => {
      const node = parse(l.math);
      const sum = node.r;
      const hole = level === 1 ? sum.r : sum.l.r;
      return { ...l, ...blankLine(node, [hole]) };
    });
  }
  const first = lines[0];
  return linesItem({
    skill: LONGDIV, level,
    prompt: `Divise A = ${MP(d.A)} par B = ${MP(d.B)}. Écris chaque étape A = B·Q + R.`,
    start: `A=${PT(d.A)}`, judge, mode, script,
    hints: [
      { level: 1, html: `Divise le terme dominant de A par celui de B : c'est le premier terme du quotient, ${MT(first.t)}.` },
      { level: 2, html: `A − (${MT(first.t)})·B = …` },
      { level: 3, html: MT(first.math) },
    ],
    subgoals: [{ id: 'step', label: 'une étape de division', skill: LONGDIV }],
    keys: ['calc', 'letters'], tapActions: level === 3 ? 'polydiv' : null,
    key: `${LONGDIV}:${PT(d.A)}:${PT(d.B)}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function longDivExam(rng, exam) {
  const d = longDivData(rng, 4);
  const prompt = `Division de A = ${MP(d.A)} par B = ${MP(d.B)}.`;
  if (exam === 'coef') {
    return answerItem({
      skill: LONGDIV, level: 4, prompt: `${prompt} Quel est le coefficient constant du reste R ?`, expected: lit0(qCoeffs(d.R)[0] ?? 0),
      key: `${PT(d.A)}:${PT(d.B)}`, exam: { format: 'coef', points: 1 }, solution: [{ html: `Q = ${MP(d.Q)}, R = ${MP(d.R)}`, note: '' }],
    });
  }
  const show = (R) => `R = ${MP(R)}`;
  const options = [{ html: show(d.R), correct: true }];
  const add = (R, rule) => { const h = show(R); if (options.length < 4 && !options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  // The remainder when the subtraction changes the sign of the leading term only.
  const lb = qCoeffs(d.B)[2];
  const t = Poly.monomial([[V, degree(d.A) - 2]], qCoeffs(d.A)[degree(d.A)].div(lb));
  const tB = t.mul(d.B);
  const leadTerm = Poly.monomial([[V, degree(tB)]], qCoeffs(tB)[degree(tB)]);
  const wrongA = d.A.sub(leadTerm).add(tB.sub(leadTerm));
  add(divide(wrongA, d.B).r, 'g0_div_subtract');
  add(d.R.neg(), null);
  add(divide(d.A, d.B.sub(Poly.const(qCoeffs(d.B)[0].mul(2)))).r, null);
  add(d.R.add(Poly.const(1)), null);
  return mcq({
    skill: LONGDIV, level: 4, prompt: `${prompt} Quel est le reste ?`, options, key: `mcq:${PT(d.A)}:${PT(d.B)}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `Q = ${MP(d.Q)}, R = ${MP(d.R)}`, note: '' }],
  }, rng);
}

// ======================================================================
// g0-factor-thm
// ======================================================================

const FTHM = 'g0-factor-thm';
const FTHM_SUB = [
  { id: 'rem', label: 'théorème du reste', skill: FTHM },
  { id: 'root', label: 'racine évidente', skill: FTHM },
  { id: 'divide', label: 'diviser par x − a', skill: 'g0-horner' },
  { id: 'tri', label: 'factoriser le trinôme', skill: 'fac-trinomial' },
];

function rootsPoly(rng, k = rng.pick([2, 3])) {
  for (let i = 0; i < 200; i++) {
    const rs = Array.from({ length: k }, () => rng.int(-4, 4));
    if (new Set(rs).size < k) continue;
    if (rs.includes(0)) continue;
    let p = prodPoly(rs);
    let tri = null;
    if (k === 2 && rng.chance(0.4)) {
      // One root and an irreducible trinomial: x² + px + q with Δ < 0.
      const pp = rng.int(-2, 2);
      const qq = rng.int(1, 5);
      if (pp * pp - 4 * qq >= 0) continue;
      tri = fromQ([q(qq), q(pp), q(1)]);
      p = P1(rs[0]).mul(tri);
      if (Math.abs(qCoeffs(p)[0].valueOf()) > 24 || big(p, 30)) continue;
      return { P: p, roots: [rs[0]], tri };
    }
    if (k === 2) continue;
    if (Math.abs(qCoeffs(p)[0].valueOf()) > 24 || big(p, 30)) continue;
    return { P: p, roots: [...rs].sort((a, b) => a - b), tri };
  }
  return { P: prodPoly([1, 3, -2]), roots: [-2, 1, 3], tri: null, fallback: true };
}

// The factorization lines from P: (x − r)·rest, then the trinomial.
function factorLines(d, r) {
  const rest = divide(d.P, P1(r)).q;
  const lines = [{ math: `(${lin(r)})(${PT(rest)})`, note: `Diviser par ${RT(lin(r))}`, subgoal: 'divide' }];
  const others = d.roots.filter((x) => x !== r);
  if (!d.tri && others.length) {
    lines.push({ math: d.roots.map((x) => `(${lin(x)})`).join(''), note: 'Factoriser le trinôme', subgoal: 'tri' });
  }
  return lines;
}

function remSegment(P, a, divisor, blanks) {
  const startText = at(P, a);
  const value = evalQ(qCoeffs(P), q(a));
  const terms = qCoeffs(P).map((c, k) => c.mul(q(a).pow(k))).reverse();
  const middle = terms.map((t, i) => (i === 0 ? lit0(t) : t.n < 0 ? `-${lit0(t.neg())}` : `+${lit0(t)}`)).join('');
  const lines = [
    { kind: 'eq', math: middle, note: 'Calculer chaque terme', subgoal: 'rem' },
    { kind: 'eq', math: lit0(value), note: `Reste = P(${fr(String(a))})`, subgoal: 'rem' },
  ];
  if (blanks) {
    const node = parse(middle);
    const holes = [];
    let n = node;
    while (n.t === 'bin' && holes.length < 2) { holes.push(n.r); n = n.l; }
    lines[0] = { ...lines[0], ...blankLine(node, holes) };
  }
  return { startText, lines, value, divisor };
}

function fthmItem(level, rng, opts = {}) {
  const d = rootsPoly(rng, level >= 4 ? rng.pick([2, 3]) : 3);
  const PTx = PT(d.P);
  if (level <= 2) {
    // The remainder by x − a (level 1) or x + a (level 2).
    const a = level === 1 ? rng.pick([1, 2, 3, -1, -2]) : -rng.pick([1, 2, 3]);
    const divisor = lin(a);
    const seg = remSegment(d.P, a, divisor, level === 1);
    const script = [];
    if (level === 2) {
      script.push({ kind: 'decision', prompt: `Le reste par ${RT(divisor)}, c'est…`, options: [
        { id: 'neg', label: `P(${fr(String(a))})`, valid: true },
        { id: 'pos', label: `P(${fr(String(-a))})`, valid: false, rule: 'g0_rem_sign', why: `${RT(divisor)} s'annule en ${fr(String(a))}, pas en ${fr(String(-a))}.` },
      ] });
    }
    script.push(...seg.lines);
    return linesItem({
      skill: FTHM, level, prompt: `P(x) = ${MP(d.P)}. Quel est le reste de la division de P par ${MT(divisor)} ?`,
      start: seg.startText, judge: { kind: 'value', form: 'irreducible', remSign: { poly: PTx, at: a } }, mode: 'guided', script,
      hints: [
        { level: 1, html: `Le reste par ${RT(divisor)}, c'est P(${fr(String(a))}).` },
        { level: 2, html: MT(seg.lines[0].math) },
        { level: 3, html: fr(lit0(seg.value)) },
      ],
      subgoals: FTHM_SUB, keys: ['calc'], key: `${FTHM}:${PTx}:${a}`,
    });
  }
  // Levels 3–5: a root, then the factorization.
  const r = d.roots[0];
  const lines = factorLines(d, r);
  const script = [];
  let start = PTx;
  let judge = { kind: 'poly', v: V, target: 'factored-R' };
  if (level === 3) {
    const c = Math.abs(qCoeffs(d.P)[0].valueOf());
    const divs = [];
    for (let k = 1; k <= c; k++) if (c % k === 0) divs.push(k);
    script.push({ kind: 'decision', prompt: 'Où chercher une racine entière ?', options: [
      { id: 'div', label: `Parmi les diviseurs de ${c} : ±${divs.join(', ±')}`, valid: true },
      { id: 'lead', label: 'Parmi les diviseurs du coefficient dominant', valid: false, why: 'Pour P unitaire à coefficients entiers, une racine entière divise le terme constant.' },
      { id: 'any', label: 'Il faut résoudre P(x) = 0 avec une formule', valid: false, why: 'Il n\'y a pas de formule simple au degré 3 : on essaie les diviseurs du terme constant.' },
    ] });
  }
  script.push(...lines.map((l) => ({ kind: 'eq', ...l })));
  return linesItem({
    skill: FTHM, level, prompt: `Trouve une racine évidente de P(x) = ${MP(d.P)}, puis factorise P sur ℝ.`,
    start, judge, mode: level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: 'Essaie les diviseurs du terme constant : P(1), P(−1), P(2)…' },
      { level: 2, html: `P(${fr(String(r))}) = 0 : ${RT(lin(r))} divise P.` },
      { level: 3, html: MT(lines[0].math) },
    ],
    subgoals: FTHM_SUB, keys: ['calc'], tapActions: level === 3 ? 'factor' : null,
    key: `${FTHM}:${PTx}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false, fallback: d.fallback,
  });
}

function fthmExam(rng, exam) {
  if (exam === 'tf') {
    const a = rng.int(2, 4);
    if (rng.chance(0.5)) {
      return tfItem({
        skill: FTHM, level: 4, statement: `Si P(${a}) = 0, alors ${MT(`x+${a}`)} divise P.`, truth: false, key: `rem:${a}`,
        counter: { kind: 'poly', conds: [{ at: a, eq: 0 }, { at: -a, ne: 0 }], ask: [{ v: 'P', label: 'P(x) =' }], answer: { P: `x-${a}` } },
        ruleIfTrue: 'g0_rem_sign', explanation: `Faux : P(${a}) = 0 veut dire que x − ${a} divise P. Avec P = x − ${a}, x + ${a} ne divise pas P.`,
        exam: { format: 'tf', points: 1 },
      });
    }
    return tfItem({
      skill: FTHM, level: 4, statement: `Si P(${a}) = 0, alors ${MT(`x-${a}`)} divise P.`, truth: true, key: `rem+:${a}`,
      explanation: 'Vrai : c\'est le théorème du reste.', exam: { format: 'tf', points: 1 },
    });
  }
  const d = rootsPoly(rng, 3);
  const a = -rng.pick([1, 2, 3]);
  const right = evalQ(qCoeffs(d.P), q(a));
  const options = [{ html: fr(lit0(right)), correct: true }];
  const add = (v, rule) => { const h = fr(lit0(v)); if (options.length < 4 && !options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  add(evalQ(qCoeffs(d.P), q(-a)), 'g0_rem_sign');
  add(right.neg(), null);
  add(qCoeffs(d.P)[0], null);
  add(right.add(1), null);
  return mcq({
    skill: FTHM, level: 4, prompt: `Quel est le reste de la division de ${MP(d.P)} par ${MT(lin(a))} ?`, options, key: `mcq:${PT(d.P)}:${a}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `Reste = P(${fr(String(a))}) = ${fr(lit0(right))}`, note: '' }],
  }, rng);
}

// ======================================================================
// g0-multiplicity
// ======================================================================

const MULT = 'g0-multiplicity';

function multData(rng) {
  for (let i = 0; i < 200; i++) {
    const a = nz(rng, -2, 2);
    const k = rng.pick([2, 3]);
    const b = rng.int(-3, 3);
    const m = rng.pick([1, 1, 2]);
    if (b === a || b === 0 || k + m > 5) continue;
    const P = P1(a).pow(k).mul(P1(b).pow(m));
    if (big(P, 30)) continue;
    return { a, k, b, m, P };
  }
  return { a: 1, k: 3, b: -2, m: 1, P: P1(1).pow(3).mul(P1(-2)), fallback: true };
}

const factored = (d) => prodText(1, [{ node: lin(d.a), k: d.k }, { node: lin(d.b), k: d.m }]);

function multLines(d) {
  const lines = [];
  for (let j = 1; j <= d.k; j++) {
    const rest = divide(d.P, P1(d.a).pow(j)).q;
    const lead = j === 1 ? `(${lin(d.a)})` : `(${lin(d.a)})^${j}`;
    lines.push({ math: `${lead}(${PT(rest)})`, note: `Horner en ${fr(String(d.a))} : reste 0`, subgoal: 'horner' });
  }
  const last = divide(d.P, P1(d.a).pow(d.k)).q;
  if (degree(last) > 1) lines.push({ math: factored(d), note: 'Factoriser le quotient', subgoal: 'horner' });
  else lines[lines.length - 1] = { ...lines[lines.length - 1], math: factored(d), note: `Horner en ${fr(String(d.a))} ; le quotient ne s'annule plus en ${fr(String(d.a))}` };
  return lines;
}

function multTable(level, rng) {
  const d = multData(rng);
  const high = [...qCoeffs(d.P)].reverse();
  const n = high.length;
  const passes = d.k + 1;
  const rows = [{ id: 'coef', label: 'P', cells: high.map((c) => ({ given: fr(lit0(c)) })) }];
  const answers = { coef: high.map((c) => fr(lit0(c))) };
  let cur = high;
  for (let p = 1; p <= passes; p++) {
    const { b } = horner(cur, d.a);
    const given = level === 1 && p < passes;
    rows.push({ id: `b${p}`, label: `Horner ${p}`, cells: Array.from({ length: n }, (_, j) => (j < b.length ? (given ? { given: fr(lit0(b[j])) } : { input: true }) : null)) });
    answers[`b${p}`] = Array.from({ length: n }, (_, j) => (j < b.length ? fr(lit0(b[j])) : null));
    cur = b.slice(0, -1);
  }
  const then = linesItem({
    skill: MULT, level, prompt: `Écris P factorisé, avec la multiplicité de ${fr(String(d.a))}.`,
    start: PT(d.P), judge: { kind: 'poly', v: V, target: 'factored-R' }, mode: 'free',
    script: [{ kind: 'eq', math: factored(d), note: `Multiplicité ${d.k}`, subgoal: 'horner' }],
    hints: [
      { level: 1, html: `Chaque reste nul donne un facteur ${RT(lin(d.a))}.` },
      { level: 2, html: `(${RT(lin(d.a))})${['', '', '²', '³'][d.k]}(…)` },
      { level: 3, html: MT(factored(d)) },
    ],
    subgoals: [{ id: 'horner', label: 'Horner', skill: 'g0-horner' }], key: `${MULT}:then:${PT(d.P)}`, followError: false,
  });
  return tableItem({
    skill: MULT, level, prompt: `Applique le schéma de Horner en a = ${fr(String(d.a))} à P(x) = ${MP(d.P)}, puis encore sur chaque quotient, tant que le reste vaut 0.`,
    table: { cols: high.map((_, j) => powLabel(n - 1 - j)), rows, root: { given: fr(String(d.a)) } },
    phi: { kind: 'horner-repeat', root: String(d.a), coeffs: high.map((c) => c.toString()), passes },
    answers: { ...answers, root: String(d.a) }, then,
    hints: [
      { level: 1, html: `Refais Horner en ${fr(String(d.a))} sur le quotient, tant que le reste vaut 0.` },
      { level: 2, html: 'Le quotient a un coefficient de moins à chaque ligne. N\'oublie pas les 0.' },
      { level: 3, html: `Multiplicité ${d.k} : ${MT(factored(d))}` },
    ],
    baits: ['g0_mult_once', 'g0_horner_zero'], key: `${PT(d.P)}:${level}`,
    solution: [{ html: MT(factored(d)), note: `${fr(String(d.a))} est racine de multiplicité ${d.k}` }],
    fallback: d.fallback,
  });
}

function multItem(level, rng, opts = {}) {
  if (level <= 2) return multTable(level, rng);
  const d = multData(rng);
  const lines = multLines(d);
  return linesItem({
    skill: MULT, level,
    prompt: level === 5 ? `Donne toutes les racines de P(x) = ${MP(d.P)} avec leur multiplicité : factorise P.` : `Quelle est la multiplicité de la racine ${fr(String(d.a))} de P(x) = ${MP(d.P)} ? Factorise P.`,
    start: PT(d.P), judge: { kind: 'poly', v: V, target: 'factored-R' }, mode: level === 3 ? 'tap' : 'free',
    script: lines.map((l) => ({ kind: 'eq', ...l })),
    hints: [
      { level: 1, html: `Refais Horner en ${fr(String(d.a))} sur le quotient, tant que le reste vaut 0.` },
      { level: 2, html: MT(lines[0].math) },
      { level: 3, html: MT(factored(d)) },
    ],
    subgoals: [{ id: 'horner', label: 'Horner', skill: 'g0-horner' }], keys: ['calc'], tapActions: level === 3 ? 'factor' : null,
    key: `${MULT}:${PT(d.P)}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false, fallback: d.fallback,
  });
}

function multExam(rng, exam) {
  if (exam === 'tf') {
    const a = rng.pick([1, 2, -1]);
    return tfItem({
      skill: MULT, level: 4, statement: `Si P(${fr(String(a))}) = 0 et que le quotient Q de P par ${MT(lin(a))} vérifie aussi Q(${fr(String(a))}) = 0, alors ${fr(String(a))} est racine double de P.`,
      truth: false, key: `double:${a}`,
      counter: { kind: 'poly', conds: [{ minMult: { at: a, k: 2 } }, { notMult: { at: a, k: 2 } }], ask: [{ v: 'P', label: 'P(x) =' }], answer: { P: `(${lin(a)})^3` } },
      ruleIfTrue: 'g0_mult_once', explanation: `Faux : avec P = (${fr(lin(a))})³, la racine ${fr(String(a))} est triple. Il faut refaire Horner jusqu'à un reste non nul.`,
      exam: { format: 'tf', points: 1 },
    });
  }
  const d = multData(rng);
  const options = [{ html: String(d.k), correct: true }, { html: '1', correct: false, rule: 'g0_mult_once' }, { html: String(d.k + 1), correct: false }];
  if (d.k - 1 > 1) options.push({ html: String(d.k - 1), correct: false });
  else options.push({ html: String(d.k + 2), correct: false });
  return mcq({
    skill: MULT, level: 4, prompt: `Quelle est la multiplicité de la racine ${fr(String(d.a))} de ${MP(d.P)} ?`, options, key: `mcq:${PT(d.P)}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: MT(factored(d)), note: '' }],
  }, rng);
}

// ======================================================================
// g0-factor-real
// ======================================================================

const FREAL = 'g0-factor-real';
const FREAL_SUB = [
  { id: 'group', label: 'grouper, facteur commun', skill: 'fac-complete' },
  { id: 'root', label: 'racine évidente', skill: FTHM },
  { id: 'delta', label: 'tester Δ', skill: 'quad-formula' },
];

function frealData(rng, level) {
  const kind = level === 1 ? 'group' : level === 2 || level === 5 ? 'roots' : rng.pick(['roots', 'roots', 'biquad', 'group']);
  for (let i = 0; i < 200; i++) {
    if (kind === 'group') {
      // (x + a)(x³ + t³) = x³(x + a) + t³(x + a)
      const a = nz(rng, -3, 3);
      const t = rng.pick([1, 2, -1, -2]);
      const P = P1(-a).mul(fromQ([q(t ** 3), q(0), q(0), q(1)]));
      if (big(P, 30)) continue;
      const tri = fromQ([q(t * t), q(-t), q(1)]);
      const c3 = Math.abs(t ** 3);
      const last = -a === -t ? `(${lin(-a)})^2(${PT(tri)})` : `(${lin(-a)})(${lin(-t)})(${PT(tri)})`;
      const lines = [
        { math: `x^3(${lin(-a)})${t ** 3 > 0 ? '+' : '-'}${c3 === 1 ? '' : c3}(${lin(-a)})`, note: 'Grouper', subgoal: 'group' },
        { math: `(${lin(-a)})(${PT(fromQ([q(t ** 3), q(0), q(0), q(1)]))})`, note: 'Facteur commun', subgoal: 'group' },
        { math: last, note: `a³ ${t > 0 ? '+' : '−'} b³ ; le trinôme a Δ = ${fr(String(-3 * t * t))} < 0`, subgoal: 'delta' },
      ];
      return { P, lines, kind };
    }
    if (kind === 'biquad') {
      const r = rng.int(1, 3);
      const s = rng.int(1, 3);
      if (r === s && rng.chance(0.7)) continue;
      const withTri = rng.chance(0.4);
      const second = withTri ? fromQ([q(s * s), q(0), q(1)]) : fromQ([q(-s * s), q(0), q(1)]);
      const P = fromQ([q(-r * r), q(0), q(1)]).mul(second);
      if (big(P, 30)) continue;
      const fs = withTri ? `(${lin(r)})(${lin(-r)})(${PT(second)})` : r === s ? `(${lin(r)})^2(${lin(-r)})^2` : `(${lin(r)})(${lin(-r)})(${lin(s)})(${lin(-s)})`;
      return { P, kind, lines: [
        { math: `(${PT(fromQ([q(-r * r), q(0), q(1)]))})(${PT(second)})`, note: 'Polynôme en x² : poser X = x²', subgoal: 'group' },
        { math: fs, note: 'Identité a² − b²', subgoal: withTri ? 'delta' : 'root' },
      ] };
    }
    // Roots, a double root at level 5, and maybe an irreducible trinomial.
    const nr = level >= 5 ? 2 : rng.pick([1, 2]);
    const rs = Array.from({ length: nr }, () => nz(rng, -3, 3));
    if (level >= 5 && rs[0] !== rs[1]) rs[1] = rs[0];
    const pp = rng.int(-3, 3);
    const qq = rng.int(1, 6);
    const withTri = level >= 5 || nr === 1 || rng.chance(0.6);
    if (withTri && pp * pp - 4 * qq >= 0) continue;
    if (!withTri && nr < 2) continue;
    const tri = withTri ? fromQ([q(qq), q(pp), q(1)]) : null;
    let P = prodPoly(rs);
    if (tri) P = P.mul(tri);
    if (!tri) P = P.mul(P1(nz(rng, -3, 3)));
    if (big(P, 30) || degree(P) < 3) continue;
    const { coef, factors } = factorQ(qCoeffs(P));
    const lines = [];
    const r0 = factors.find((f) => f.cs.length === 2);
    const rest = divide(P, fromQ(r0.cs)).q;
    lines.push({ math: `(${QT(r0.cs)})(${PT(rest)})`, note: `Racine évidente ${fr(lit0(r0.cs[0].neg()))}, diviser`, subgoal: 'root' });
    const full = productNode(coef, factors.map((f) => ({ node: qNode(f.cs), k: f.k })));
    const fullText = toText(full);
    if (fullText !== lines[0].math) lines.push({ math: fullText, note: tri ? 'Factoriser ; le trinôme restant a Δ < 0' : 'Factoriser', subgoal: tri ? 'delta' : 'root' });
    return { P, lines, kind };
  }
  const P = P1(-1).mul(fromQ([q(-1), q(0), q(0), q(1)]));
  return { P, kind: 'group', fallback: true, lines: [
    { math: 'x^3(x+1)-(x+1)', note: 'Grouper', subgoal: 'group' },
    { math: '(x+1)(x^3-1)', note: 'Facteur commun', subgoal: 'group' },
    { math: '(x+1)(x-1)(x^2+x+1)', note: 'Δ = −3 < 0', subgoal: 'delta' },
  ] };
}

function frealItem(level, rng, opts = {}) {
  const d = frealData(rng, level);
  let script = d.lines.map((l) => ({ kind: 'eq', ...l }));
  const mode = level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free';
  if (level <= 2) {
    script = script.map((l, i) => {
      if (i === script.length - 1 && level === 2) return l;
      const node = parse(l.math);
      const holes = [];
      if (node.t === 'bin' && node.op === '×') holes.push(stripParen(node.r).t === 'bin' ? node.r : node.l);
      else if (node.t === 'bin') holes.push(node.r);
      return holes.length ? { ...l, ...blankLine(node, holes) } : l;
    });
    if (level === 2) script.unshift({ kind: 'note', html: d.kind === 'roots' ? `Indication : ${fr(d.lines[0].note.replace(', diviser', ''))}.` : 'Indication : regroupe les termes deux à deux.' });
    else script.unshift({ kind: 'note', html: 'On regroupe les deux premiers termes et les deux derniers.' });
  }
  return linesItem({
    skill: FREAL, level, prompt: `Factorise P(x) = ${MP(d.P)} sur ℝ.`,
    start: PT(d.P), judge: { kind: 'poly', v: V, target: 'factored-R' }, mode, script,
    hints: [
      { level: 1, html: d.kind === 'group' ? 'Regroupe les deux premiers termes et les deux derniers.' : d.kind === 'biquad' ? 'C\'est un polynôme en x² : pose X = x².' : 'Cherche une racine évidente parmi les diviseurs du terme constant.' },
      { level: 2, html: MT(d.lines[0].math) },
      { level: 3, html: MT(d.lines[d.lines.length - 1].math) },
    ],
    subgoals: FREAL_SUB, keys: ['calc'], tapActions: level === 3 ? 'factor' : null,
    key: `${FREAL}:${PT(d.P)}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false, fallback: d.fallback,
  });
}

function frealExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfItem({ skill: FREAL, level: 4, statement: 'Tout polynôme réel de degré 3 a au moins une racine réelle.', truth: true, key: 'deg3', explanation: 'Vrai : un polynôme de degré impair change de signe entre −∞ et +∞.', exam: { format: 'tf', points: 1 } });
    }
    return tfItem({
      skill: FREAL, level: 4, statement: 'Tout polynôme réel de degré 4 a au moins une racine réelle.', truth: false, key: 'deg4',
      counter: { kind: 'poly', conds: [{ degree: 4 }, { noRealRoot: true }], ask: [{ v: 'P', label: 'P(x) =' }], answer: { P: 'x^4+1' } },
      explanation: 'Faux : x⁴ + 1 > 0 pour tout x réel.', exam: { format: 'tf', points: 1 },
    });
  }
  for (let i = 0; i < 50; i++) {
    const d = frealData(rng, 4);
    const cs = qCoeffs(d.P);
    const { coef, factors } = factorQ(cs);
    const tri = factors.find((f) => f.cs.length === 3);
    if (!tri) continue;
    const right = d.lines[d.lines.length - 1].math;
    const options = [{ html: MT(right), correct: true }];
    const [q0, p1] = tri.cs;
    const wrongTri = [p1.mul(p1).div(2).sub(q0), p1, q(1)];
    const split = factorQ(wrongTri);
    if (split.factors.every((f) => f.cs.length === 2)) {
      const wrongP = divide(d.P, fromQ(tri.cs)).q.mul(fromQ(wrongTri));
      const w = factorQ(qCoeffs(wrongP));
      options.push({ html: MT(prodText(w.coef, w.factors.map((f) => ({ node: qNode(f.cs), k: f.k })))), correct: false, rule: 'g0_irred_split' });
    }
    const lostOne = factors.filter((f) => f !== tri);
    if (lostOne.length) options.push({ html: MT(prodText(coef, [...lostOne.slice(1), tri].map((f) => ({ node: qNode(f.cs), k: f.k })))), correct: false });
    options.push({ html: MT(prodText(coef, factors.map((f) => ({ node: qNode(f.cs.length === 2 ? [f.cs[0].neg(), f.cs[1]] : f.cs), k: f.k })))), correct: false });
    const uniq = options.filter((o, j, a) => a.findIndex((x) => x.html === o.html) === j);
    if (uniq.length < 3) continue;
    return mcq({ skill: FREAL, level: 4, prompt: `Quelle est la factorisation de ${MP(d.P)} sur ℝ ?`, options: uniq, key: `mcq:${PT(d.P)}`, exam: { format: 'mcq', points: 1 }, solution: d.lines.map((l) => ({ html: MT(l.math), note: l.note })) }, rng);
  }
  return mcq({ skill: FREAL, level: 4, prompt: `Quelle est la factorisation de ${MT('x^3-1')} sur ℝ ?`, options: [{ html: MT('(x-1)(x^2+x+1)'), correct: true }, { html: MT('(x-1)^3'), correct: false }, { html: MT('(x-1)(x+1)^2'), correct: false }], key: 'mcq:fallback', exam: { format: 'mcq', points: 1 }, fallback: true }, rng);
}

// ======================================================================
// g0-factor-complex
// ======================================================================

const FCPLX = 'g0-factor-complex';
const CPLX_SUB = [
  { id: 'conj', label: 'racine conjuguée, trinôme réel', skill: FCPLX },
  { id: 'divide', label: 'diviser par le trinôme', skill: 'g0-long-div' },
  { id: 'roots', label: 'racines complexes', skill: 'g8-algebraic' },
];

// (x − (p + qi)) as text: x − 1 − i, x + 2i…
function cfac(p, qi) {
  const re = p === 0 ? '' : p > 0 ? `-${p}` : `+${-p}`;
  const im = qi === 0 ? '' : `${qi > 0 ? '-' : '+'}${Math.abs(qi) === 1 ? '' : Math.abs(qi)}i`;
  return `(x${re}${im})`;
}
const zText = (p, qi) => `${p ? `${fr(String(p))} ` : ''}${p ? (qi > 0 ? '+ ' : '− ') : qi < 0 ? '−' : ''}${Math.abs(qi) === 1 ? '' : Math.abs(qi)}i`.trim();
const triOf = (p, qi) => fromQ([q(p * p + qi * qi), q(-2 * p), q(1)]);

function cplxData(rng) {
  for (let i = 0; i < 200; i++) {
    const p = rng.int(-2, 2);
    const qi = rng.int(1, 3);
    const T1 = triOf(p, qi);
    let T2;
    let roots2;
    if (rng.chance(0.6)) {
      const u = rng.int(-2, 2);
      const v = rng.int(1, 2);
      if (u === p && v === qi) continue;
      T2 = triOf(u, v);
      roots2 = [[u, v], [u, -v]];
    } else {
      const r1 = rng.int(-3, 3);
      const r2 = rng.int(-3, 3);
      if (r1 === r2) continue;
      T2 = P1(r1).mul(P1(r2));
      roots2 = [[r1, 0], [r2, 0]];
    }
    const P = T1.mul(T2);
    if (big(P, 30)) continue;
    return { p, qi, T1, T2, roots2, P };
  }
  return null;
}

function cplxItem(level, rng, opts = {}) {
  const d = cplxData(rng);
  const z = zText(d.p, d.qi);
  const zb = zText(d.p, -d.qi);
  const factorsC = [...d.roots2.filter(([u, v]) => u === 0 && v === 0).map(() => 'x'), cfac(d.p, d.qi), cfac(d.p, -d.qi), ...d.roots2.filter(([u, v]) => u || v).map(([u, v]) => cfac(u, v))].join('');
  const mid = `(${PT(d.T1)})(${PT(d.T2)})`;
  const judge = { kind: 'poly', v: V, complex: true, target: 'factored-C' };
  let script = [
    { kind: 'note', html: `P est réel : ${zb} est aussi racine, et (x − (${z}))(x − (${zb})) = ${MP(d.T1)}.` },
    { kind: 'eq', math: mid, note: 'Diviser P par le trinôme réel', subgoal: 'divide' },
    { kind: 'eq', math: factorsC, note: 'Racines des trinômes', subgoal: 'roots' },
  ];
  if (level >= 3) script.shift();
  if (level <= 2) {
    const n1 = parse(mid, { complex: true });
    script[1] = { ...script[1], ...blankLine(n1, [level === 1 ? n1.r : n1.l], { complex: true }) };
    const n2 = parse(factorsC, { complex: true });
    if (level === 1) script[2] = { ...script[2], ...blankLine(n2, [n2.r], { complex: true }) };
  }
  const hint = level === 5 ? ` (P a une racine ${d.p === 0 ? 'imaginaire pure' : 'non réelle'} : ${z})` : ` sachant que ${z} est racine`;
  return linesItem({
    skill: FCPLX, level, prompt: `Factorise P(x) = ${MP(d.P)} sur ℂ${hint}.`,
    start: PT(d.P), judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    declares: { vars: [V], complex: true },
    hints: [
      { level: 1, html: `P est réel : la conjuguée ${zb} est aussi racine.` },
      { level: 2, html: `(x − (${z}))(x − (${zb})) = ${MP(d.T1)}` },
      { level: 3, html: MT(mid) },
    ],
    subgoals: CPLX_SUB, keys: ['calc', 'cplx'], tapActions: level === 3 ? 'menu' : null,
    key: `${FCPLX}:${PT(d.P)}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function cplxExam(rng, exam) {
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      return tfItem({
        skill: FCPLX, level: 4, statement: 'Un polynôme de degré 3 à coefficients complexes a toujours une racine réelle.', truth: false, key: 'cdeg3',
        counter: { kind: 'poly', complex: true, conds: [{ degree: 3 }, { noRealRoot: true }], ask: [{ v: 'P', label: 'P(x) =', keys: ['calc', 'cplx'] }], answer: { P: '(x-i)^3' } },
        explanation: 'Faux : (x − i)³ n\'a que la racine i. Le résultat vaut pour les coefficients réels.', ruleIfTrue: 'g0_conj_missing', exam: { format: 'tf', points: 1 },
      });
    }
    return tfItem({ skill: FCPLX, level: 4, statement: 'Si P est à coefficients réels et P(2 + i) = 0, alors P(2 − i) = 0.', truth: true, key: 'conj', explanation: 'Vrai : P(z̄) est le conjugué de P(z).', exam: { format: 'tf', points: 1 } });
  }
  const d = cplxData(rng);
  const z = zText(d.p, d.qi);
  const T1 = d.T1;
  const options = [
    { html: `${MP(T1)} divise P`, correct: true },
    { html: `${MT(cfac(d.p, d.qi), { complex: true })} divise P, mais pas ${MT(cfac(d.p, -d.qi), { complex: true })}`, correct: false, rule: 'g0_conj_missing' },
    { html: `${MP(triOf(-d.p, d.qi))} divise P`, correct: false },
    { html: `${MP(fromQ([q(d.p * d.p - d.qi * d.qi), q(-2 * d.p), q(1)]))} divise P`, correct: false },
  ].filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: FCPLX, level: 4, prompt: `P(x) = ${MP(d.P)} est réel et admet la racine ${z}. Que peut-on dire ?`, options, key: `mcq:${PT(d.P)}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `(x − (${z}))(x − (${zText(d.p, -d.qi)})) = ${MP(T1)}`, note: 'Racine conjuguée' }],
  }, rng);
}

// ======================================================================
// g0-conditions
// ======================================================================

const COND = 'g0-conditions';

function condData(rng) {
  for (let i = 0; i < 200; i++) {
    const p = rng.int(-2, 3);
    const qi = rng.int(1, 2);
    const c = rng.int(-4, 4);
    const a = rng.int(-3, 3);
    const T = triOf(p, qi);
    const P = T.mul(P1(c));
    const Pa = evalQ(qCoeffs(P), q(a));
    if (Pa.n === 0 || Math.abs(Pa.valueOf()) > 60 || a === c || a === 0) continue;
    return { p, qi, c, a, T, P, Pa, Ta: evalQ(qCoeffs(T), q(a)) };
  }
  return null;
}

function condItem(level, rng, opts = {}) {
  const d = condData(rng);
  const z = zText(d.p, d.qi);
  const zb = zText(d.p, -d.qi);
  const div = lin(d.a);
  const exam = opts.exam ? { format: opts.exam, points: 6 } : false;
  const segs = [];
  // Part 1: the real trinomial.
  const triStart = `${cfac(d.p, d.qi)}${cfac(d.p, -d.qi)}`;
  const seg1 = { judge: { kind: 'poly', v: V, complex: true, target: 'expanded', realCoeffs: true }, start: triStart, html: `Trinôme réel : (x − (${z}))(x − (${zb})) =`, lines: [{ kind: 'eq', math: PT(d.T), note: 'Développer', subgoal: 'tri' }] };
  // Part 2: the condition on the remainder, an equation in c.
  const ta = lit0(d.Ta);
  const eq1 = `(${at(d.T, d.a)})(${lit0(d.a)}-c)=${lit0(d.Pa)}`;
  const k = d.Ta;
  const seg2 = {
    judge: { kind: 'solset', v: 'c', domain: 'R' }, start: eq1,
    html: `Reste par ${MT(div)} : P(${fr(String(d.a))}) = ${fr(lit0(d.Pa))}, avec P = (${MT(PT(d.T))})(x − c). Trouve c.`,
    lines: [
      { kind: 'eq', math: `${ta}(${lit0(d.a)}-c)=${lit0(d.Pa)}`, note: `Calculer le trinôme en ${fr(String(d.a))}`, subgoal: 'rem' },
      { kind: 'eq', math: `${lit0(d.a)}-c=${lit0(d.Pa.div(k))}`, note: `Diviser par ${fr(ta)}`, subgoal: 'solve' },
      { kind: 'eq', math: `c=${lit0(q(d.c))}`, note: 'Isoler c', subgoal: 'solve' },
    ],
  };
  // Part 3: P developed.
  const seg3 = { judge: { kind: 'poly', v: V, target: 'expanded' }, start: `(${PT(d.T)})(${lin(d.c)})`, html: 'P développé :', lines: [{ kind: 'eq', math: PT(d.P), note: 'Développer', subgoal: 'expand' }] };
  if (level >= 2) segs.push(seg1);
  segs.push(seg2, seg3);
  if (level <= 2) {
    for (const s of segs) {
      s.lines = s.lines.map((l, i) => {
        if (s === seg2 && i === 0) {
          const node = parse(l.math, { vars: ['c'] });
          return { ...l, ...blankLine(node, [node.l.l]) };
        }
        return l;
      });
    }
  }
  const [first, ...rest] = segs;
  const script = [];
  if (level === 3) {
    script.push({ kind: 'decision', prompt: 'Quelle forme a P ?', options: [
      { id: 'right', label: `(x − (${z}))(x − (${zb}))(x − c)`, valid: true },
      { id: 'noconj', label: `(x − (${z}))(x − c)`, valid: false, rule: 'g0_conj_missing', why: 'P est réel de degré 3 : la conjuguée est aussi racine.' },
      { id: 'lead', label: `a(x − (${z}))(x − (${zb}))(x − c)`, valid: false, why: 'P est unitaire : pas de coefficient a devant.' },
    ] });
  }
  if (level === 1) script.push({ kind: 'note', html: `La forme est donnée : P = (${MT(PT(d.T))})(x − c).` });
  script.push(...first.lines);
  for (const s of rest) script.push({ kind: 'segment', html: s.html, start: { math: s.start }, judge: { ...s.judge, ...(level === 3 ? { menu: menuFor(s) } : {}) } }, ...s.lines);
  const firstJudge = { ...first.judge, ...(level === 3 ? { menu: menuFor(first) } : {}) };
  return linesItem({
    skill: COND, level,
    prompt: `Détermine le polynôme réel unitaire P de degré 3 qui admet ${z} comme racine et dont le reste par ${MT(div)} vaut ${fr(lit0(d.Pa))}.`,
    start: first.start, judge: firstJudge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    declares: { vars: [V, 'c'], complex: true },
    hints: [
      { level: 1, html: 'Unitaire, degré 3, deux racines conjuguées : il reste un facteur x − c.' },
      { level: 2, html: `Reste par ${MT(div)} = P(${fr(String(d.a))}) = (${MT(at(d.T, d.a))})(${fr(String(d.a))} − c)` },
      { level: 3, html: MT(seg2.lines[0].math, { vars: ['c'] }) },
    ],
    subgoals: [
      { id: 'tri', label: 'trinôme réel', skill: FCPLX },
      { id: 'rem', label: 'théorème du reste', skill: FTHM },
      { id: 'solve', label: 'résoudre', skill: IDENT },
      { id: 'expand', label: 'développer', skill: 'lit-polynomial' },
    ],
    keys: ['calc', 'cplx', 'letters', 'relation'], tapActions: level === 3 ? 'menu' : null,
    key: `${COND}:${PT(d.P)}:${d.a}`, exam,
  });
}

// The action menu of one part (level 3).
function menuFor(seg) {
  const kind = seg.judge.kind === 'solset' ? 'solve' : seg.judge.target === 'expanded' ? 'expand' : seg.judge.mode === 'monic' ? 'monic' : seg.judge.mode === 'div' ? 'divide' : seg.judge.kind === 'value' ? 'cover' : 'factor';
  const all = [
    { id: 'expand', label: 'Développer et ordonner' },
    { id: 'solve', label: 'Résoudre l\'équation' },
    { id: 'divide', label: 'Faire la division' },
    { id: 'factor', label: 'Factoriser' },
    { id: 'cover', label: 'Méthode du cache : remplacer x par la racine' },
    { id: 'monic', label: 'Rendre unitaire' },
  ];
  return all.map((o) => ({ ...o, valid: o.id === kind, why: 'Ce n\'est pas ce que demande cette partie.' }));
}

function condMcq(rng) {
  const d = condData(rng);
  const z = zText(d.p, d.qi);
  const options = [{ html: MP(d.P), correct: true }];
  // Without the conjugate: (x − z)(x − c), complex coefficients.
  options.push({ html: `${MT(`${cfac(d.p, d.qi)}(${lin(d.c)})`, { complex: true })}`, correct: false, rule: 'g0_conj_missing' });
  // The remainder read at −a.
  const Tma = evalQ(qCoeffs(d.T), q(-d.a));
  if (Tma.n !== 0) {
    const c2 = q(-d.a).sub(d.Pa.div(Tma));
    if (c2.d === 1) options.push({ html: MP(d.T.mul(fromQ([c2.neg(), q(1)]))), correct: false, rule: 'g0_rem_sign' });
  }
  options.push({ html: MP(d.T.mul(P1(-d.c))), correct: false });
  return mcq({
    skill: COND, level: 4, prompt: `P est réel, unitaire, de degré 3, admet ${z} comme racine, et son reste par ${MT(lin(d.a))} vaut ${fr(lit0(d.Pa))}. Alors P =`,
    options: options.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i), key: `mcq:${PT(d.P)}:${d.a}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `P = (${MP(d.T)})(${MT(lin(d.c))}) = ${MP(d.P)}`, note: '' }],
  }, rng);
}

// ======================================================================
// g0-div-param
// ======================================================================

const DPARAM = 'g0-div-param';

// P(x) = (x − a)(x − b)C(x) + (λ − r₂)(Lx + λ − r₁ − La): then P(a) = (λ − r₂)(λ − r₁)
// and P(b) = (λ − r₂)(λ − r₃) with r₃ = r₁ + L(a − b); at λ = r₂, P = (x − a)(x − b)C(x).
function dparamData(rng) {
  for (let i = 0; i < 300; i++) {
    const a = rng.int(-2, 2);
    const b = rng.int(-2, 2);
    if (a === b) continue;
    const c1 = rng.int(-3, 3);
    const c2 = rng.int(-3, 3);
    const r2 = rng.int(-3, 3);
    const L = rng.pick([1, -1, 2, -2]);
    const r1 = rng.int(-3, 3);
    const r3 = r1 + L * (a - b);
    if (r1 === r2 || r3 === r2 || r1 === r3 || Math.abs(r3) > 5) continue;
    const base = prodPoly([a, b, c1, c2]);
    const lam = Poly.variable('λ');
    const extra = lam.sub(Poly.const(r2)).mul(Poly.variable(V).scale(L).add(lam).sub(Poly.const(r1 + L * a)));
    const P = base.add(extra);
    if (big(base, 20)) continue;
    return { a, b, c1, c2, r1, r2, r3, L, P, base };
  }
  return null;
}

function dparamItem(level, rng, opts = {}) {
  const d = dparamData(rng);
  const PTxt = PT(d.P);
  const Bt = PT(P1(d.a).mul(P1(d.b)));
  const lam = (k) => `${toText(polyNode(polyOf(parse(at(d.P, k, true), { vars: ['λ'] })), 'λ'))}=0`;
  const setOf = (x, y) => `{${Math.min(x, y)};${Math.max(x, y)}}`;
  const cfgL = { kind: 'solset', v: 'λ', domain: 'R' };
  const segA = { html: `Condition P(${fr(String(d.a))}) = 0 :`, start: `${at(d.P, d.a, true)}=0`, judge: cfgL, lines: [
    { kind: 'eq', math: lam(d.a), note: `Calculer P(${fr(String(d.a))})`, subgoal: 'cond' },
    { kind: 'eq', math: `λ∈${setOf(d.r1, d.r2)}`, note: 'Résoudre', subgoal: 'cond' },
  ] };
  const segB = { html: `Condition P(${fr(String(d.b))}) = 0 :`, start: `${at(d.P, d.b, true)}=0`, judge: cfgL, lines: [
    { kind: 'eq', math: lam(d.b), note: `Calculer P(${fr(String(d.b))})`, subgoal: 'cond' },
    { kind: 'eq', math: `λ∈${setOf(d.r2, d.r3)}`, note: 'Résoudre', subgoal: 'cond' },
  ] };
  const segI = { html: 'Les deux conditions à la fois :', start: `${setOf(d.r1, d.r2)}∩${setOf(d.r2, d.r3)}`, judge: { ...cfgL, paramCond: true }, lines: [
    { kind: 'eq', math: `λ=${d.r2}`, note: 'Intersecter', subgoal: 'cond' },
  ] };
  const { coef, factors } = factorQ(qCoeffs(d.base));
  const fullText = toText(productNode(coef, factors.map((f) => ({ node: qNode(f.cs), k: f.k }))));
  const segF = { html: `Avec λ = ${fr(String(d.r2))}, factorise P :`, start: PT(d.base), judge: { kind: 'poly', v: V, target: 'factored-R' }, lines: [
    { kind: 'eq', math: fullText, note: 'Factoriser', subgoal: 'factor' },
  ] };
  const segs = level === 1 ? [segB, segI, segF] : [segA, segB, segI, segF];
  if (level <= 2) {
    for (const s of segs.filter((x) => x === segA || x === segB)) {
      const node = parse(s.lines[1].math, { vars: ['λ'] });
      s.lines[1] = { ...s.lines[1], ...blankLine(node, node.r.items) };
    }
  }
  const script = [];
  if (level === 1) script.push({ kind: 'note', html: `Première condition déjà faite : P(${fr(String(d.a))}) = 0 donne λ ∈ {${fr(String(Math.min(d.r1, d.r2)))} ; ${fr(String(Math.max(d.r1, d.r2)))}}.` });
  if (level === 2) {
    script.push({ kind: 'decision', prompt: `Comment traduire « ${RT(Bt)} divise P » ?`, options: [
      { id: 'roots', label: `${RT(Bt)} = ${facR(d.a)}${facR(d.b)} : P(${fr(String(d.a))}) = 0 et P(${fr(String(d.b))}) = 0`, valid: true },
      { id: 'div', label: 'Diviser P par B et annuler le reste', valid: true, why: 'Juste aussi, mais plus long : les racines de B suffisent.' },
      { id: 'one', label: `Seulement P(${fr(String(d.a))}) = 0`, valid: false, rule: 'g0_param_one_cond', why: 'Il faut que les deux racines de B annulent P.' },
    ] });
  }
  const [first, ...rest] = segs;
  script.push(...first.lines);
  for (const s of rest) script.push({ kind: 'segment', html: s.html, start: { math: s.start }, judge: { ...s.judge, ...(level === 3 ? { menu: menuFor(s) } : {}) } }, ...s.lines);
  return linesItem({
    skill: DPARAM, level,
    prompt: `P(x) = ${MT(PTxt, { vars: ['λ'] })}. Détermine λ pour que ${MT(Bt)} divise P, puis factorise P.`,
    start: first.start, judge: { ...first.judge, ...(level === 3 ? { menu: menuFor(first) } : {}) },
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    declares: { vars: [V, 'λ'] },
    hints: [
      { level: 1, html: `${RT(Bt)} = ${facR(d.a)}${facR(d.b)} : P(${fr(String(d.a))}) et P(${fr(String(d.b))}) doivent être nuls.` },
      { level: 2, html: MT(lam(d.b), { vars: ['λ'] }) },
      { level: 3, html: `λ = ${fr(String(d.r2))}` },
    ],
    subgoals: [{ id: 'cond', label: 'conditions P(a) = 0', skill: FTHM }, { id: 'factor', label: 'factoriser', skill: FREAL }],
    keys: ['calc', 'letters', 'set', 'relation'], tapActions: level === 3 ? 'menu' : null,
    key: `${DPARAM}:${PTxt}`, exam: opts.exam ? { format: opts.exam, points: 4 } : false,
  });
}

function dparamMcq(rng) {
  const d = dparamData(rng);
  const s = (xs) => MT(`{${[...new Set(xs)].sort((x, y) => x - y).join(';')}}`);
  const options = [
    { html: s([d.r2]), correct: true },
    { html: s([d.r1, d.r2]), correct: false, rule: 'g0_param_one_cond' },
    { html: s([d.r2, d.r3]), correct: false, rule: 'g0_param_one_cond' },
    { html: s([d.r1, d.r2, d.r3]), correct: false, rule: 'g9_union_inter' },
  ];
  return mcq({
    skill: DPARAM, level: 4, prompt: `P(x) = ${MT(PT(d.P), { vars: ['λ'] })}. Pour quelles valeurs de λ le polynôme ${MT(PT(P1(d.a).mul(P1(d.b))))} divise-t-il P ?`,
    options, key: `mcq:${PT(d.P)}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `P(${fr(String(d.a))}) = 0 : λ ∈ {${d.r1} ; ${d.r2}} ; P(${fr(String(d.b))}) = 0 : λ ∈ {${d.r2} ; ${d.r3}} ; donc λ = ${d.r2}.`.replace(/-/g, '−'), note: '' }],
  }, rng);
}

// ======================================================================
// g0-gcd
// ======================================================================

const GCD = 'g0-gcd';

function gcdData(rng, level) {
  for (let i = 0; i < 300; i++) {
    const dr = level >= 4 ? rng.pick([1, 2]) : 2;
    const roots = Array.from({ length: dr }, () => rng.int(-3, 3));
    if (new Set(roots).size < dr) continue;
    const u = rng.int(-3, 3);
    // R₁ = A − B = (w − u)·D: never monic, so the last step has work to do.
    const w = u + (level === 5 ? rng.pick([-1, 2, -2]) : -1);
    if (roots.includes(u) || roots.includes(w)) continue;
    const D = prodPoly(roots);
    const A = D.mul(P1(u));
    const B = D.mul(P1(w));
    if (big(A, 20) || big(B, 20)) continue;
    const R1 = A.sub(B);
    const Q2 = divide(B, R1).q;
    return { D, A, B, R1, Q2, roots };
  }
  return null;
}

function gcdItem(level, rng, opts = {}) {
  const d = gcdData(rng, level) ?? gcdData(rng, 3);
  const At = PT(d.A);
  const Bt = PT(d.B);
  const R1t = PT(d.R1);
  const seg1 = { html: 'Divise A par B :', start: `A=${At}`, judge: { kind: 'poly', mode: 'div', v: V, dividend: At, divisor: Bt, names: { A: At, B: Bt }, divisorName: 'B' }, lines: [
    { kind: 'eq', math: `A=B×1+(${R1t})`, note: 'Première division', subgoal: 'div' },
  ] };
  const seg2 = { html: `Divise B par le reste R₁ = ${MP(d.R1)} :`, start: `B=${Bt}`, judge: { kind: 'poly', mode: 'div', v: V, dividend: Bt, divisor: R1t, names: { B: Bt } }, lines: [
    { kind: 'eq', math: `B=(${R1t})(${PT(d.Q2)})+0`, note: 'Deuxième division : reste nul', subgoal: 'div' },
  ] };
  const seg3 = { html: 'Le PGCD est le dernier reste non nul, rendu unitaire :', start: R1t, judge: { kind: 'poly', mode: 'monic', v: V, target: 'monic', gcdTrap: [Bt, At] }, lines: [
    { kind: 'eq', math: PT(d.D), note: 'Rendre unitaire', subgoal: 'gcd' },
  ] };
  const segs = level === 1 ? [seg2, seg3] : [seg1, seg2, seg3];
  if (level <= 2) {
    const node = parse(seg2.lines[0].math);
    seg2.lines[0] = { ...seg2.lines[0], ...blankLine(node, [node.r.l.r]) };
  }
  const script = [];
  if (level === 1) script.push({ kind: 'note', html: `Première division déjà faite : A = B·1 + (${MP(d.R1)}).` });
  const [first, ...rest] = segs;
  script.push(...first.lines);
  for (const s of rest) script.push({ kind: 'segment', html: s.html, start: { math: s.start }, judge: { ...s.judge, ...(level === 3 ? { menu: menuFor(s) } : {}) } }, ...s.lines);
  const roots = [...d.roots].sort((a, b) => a - b).map((r) => fr(String(r))).join(' et ');
  return linesItem({
    skill: GCD, level, prompt: `Trouve le PGCD de A = ${MP(d.A)} et B = ${MP(d.B)}, puis leurs racines communes.`,
    start: first.start, judge: { ...first.judge, ...(level === 3 ? { menu: menuFor(first) } : {}) },
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: 'Divise A par B, puis B par le reste, jusqu\'à un reste nul.' },
      { level: 2, html: `A − B = ${MP(d.R1)}` },
      { level: 3, html: `PGCD = ${MP(d.D)} : racines communes ${roots}` },
    ],
    subgoals: [{ id: 'div', label: 'division', skill: LONGDIV }, { id: 'gcd', label: 'PGCD', skill: GCD }],
    keys: ['calc', 'letters'], tapActions: level === 3 ? 'menu' : null,
    key: `${GCD}:${At}:${Bt}`, exam: opts.exam ? { format: opts.exam, points: 5 } : false,
  });
}

function gcdMcq(rng) {
  const d = gcdData(rng, 3);
  const options = [
    { html: MP(d.D), correct: true },
    { html: MP(d.B), correct: false, rule: 'g0_gcd_last' },
    { html: MP(P1(d.roots[0])), correct: false },
    { html: MP(d.A), correct: false, rule: 'g0_gcd_last' },
  ];
  return mcq({
    skill: GCD, level: 4, prompt: `Quel est le PGCD (unitaire) de ${MP(d.A)} et ${MP(d.B)} ?`, options, key: `mcq:${PT(d.A)}:${PT(d.B)}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `A − B = ${MP(d.R1)}, et B = R₁·(${MP(d.Q2)}) : PGCD = ${MP(d.D)}`, note: '' }],
  }, rng);
}

// ======================================================================
// g0-pfd-simple and g0-pfd-general
// ======================================================================

const PFD1 = 'g0-pfd-simple';
const PFD2 = 'g0-pfd-general';
const EQV = (cfg = {}) => ({ kind: 'equiv', vars: [V], domain: { [V]: [-3.7, 3.7] }, ...cfg });

// N/D from simple elements [{c, r}] (c/(x − r)).
function simpleData(rng, k) {
  for (let i = 0; i < 200; i++) {
    const rs = Array.from({ length: k }, () => rng.int(-3, 3));
    if (new Set(rs).size < k) continue;
    const cs = rs.map(() => nz(rng, -4, 4));
    const D = prodPoly(rs);
    let N = new Poly();
    rs.forEach((r, j) => { N = N.add(prodPoly(rs.filter((_, l) => l !== j)).scale(cs[j])); });
    if (N.isZero || big(N, 30)) continue;
    return { rs, cs, D, N };
  }
  return null;
}

// c/(x − r)^k as text; x alone needs no brackets.
const den1 = (r, k = 1) => (r === 0 ? `x${k > 1 ? `^${k}` : ''}` : `(${lin(r)})${k > 1 ? `^${k}` : ''}`);
const elem = (c, r, k = 1) => `${lit0(c)}/${den1(r, k)}`;
const denR = (r, k = 1) => RT(den1(r, k));
function sumText(parts) {
  return parts.map((t, i) => (i === 0 ? t : t.startsWith('-') ? t : `+${t}`)).join('');
}

function coverSeg(name, d, j, level) {
  const r = d.rs[j];
  const others = d.rs.filter((_, l) => l !== j);
  const num = PT(d.N);
  const den = toText(productNode(1, others.map((o) => ({ node: parse(lin(o)), k: 1 }))));
  const numAt = at(d.N, r);
  const diffs = others.map((o) => ({ node: parse(o < 0 ? `${lit0(r)}+${-o}` : `${lit0(r)}-${o}`), k: 1 }));
  const denNode = diffs.length ? productNode(1, diffs) : lit(1);
  const expr = toText({ t: 'frac', n: { t: 'paren', e: parse(numAt) }, d: diffs.length === 1 ? stripParen(denNode) : denNode });
  const line = { kind: 'eq', math: expr, note: `Cache ${RT(lin(r))}, pose x = ${fr(String(r))}`, subgoal: 'cover' };
  return {
    html: `${name} = ?`, start: name,
    judge: { kind: 'value', form: 'irreducible', expect: lit0(d.cs[j]), coverup: { num, den: den === '1' ? '1' : den, at: r } },
    lines: level <= 2 ? [{ ...line, ...blankLine(parse(expr), [parse(expr).n]) }, { kind: 'eq', math: lit0(d.cs[j]), note: 'Calculer', subgoal: 'cover' }]
      : [line, { kind: 'eq', math: lit0(d.cs[j]), note: 'Calculer', subgoal: 'cover' }],
  };
}

function pfdSimpleItem(level, rng, opts = {}) {
  const k = level >= 4 ? rng.pick([2, 3]) : level === 5 ? 3 : 2;
  const d = simpleData(rng, level === 5 ? 3 : k) ?? simpleData(rng, 2);
  const names = ['A', 'B', 'C'].slice(0, d.rs.length);
  const ND = `(${PT(d.N)})/(${PT(d.D)})`;
  const factoredD = d.rs.map((r) => `(${lin(r)})`).join('');
  const NF = `(${PT(d.N)})/(${factoredD})`;
  const final = sumText(d.rs.map((r, j) => elem(d.cs[j], r)));
  const form = sumText(d.rs.map((r, j) => `${names[j]}/${den1(r)}`));
  const segs = [];
  if (level >= 2) segs.push({ html: null, start: ND, judge: EQV({ target: 'factored-den' }), lines: [{ kind: 'eq', math: NF, note: 'Factoriser le dénominateur', subgoal: 'factor' }] });
  d.rs.forEach((_, j) => segs.push(coverSeg(names[j], d, j, level)));
  segs.push({ html: 'Écris la décomposition :', start: NF, judge: EQV({ target: 'partial-fractions' }), lines: [{ kind: 'eq', math: final, note: 'Écrire', subgoal: 'write' }] });
  const script = [{ kind: 'note', html: `Forme : ${MT(form)}` }];
  const [first, ...rest] = segs;
  script.push(...first.lines);
  for (const s of rest) script.push({ kind: 'segment', html: s.html, ask: s.start.length === 1 ? `${s.start} =` : undefined, start: { math: s.start }, judge: { ...s.judge, ...(level === 3 ? { menu: menuFor(s) } : {}) } }, ...s.lines);
  return linesItem({
    skill: PFD1, level, prompt: `Décompose en éléments simples ${MT(level === 1 ? NF : ND)}.`,
    start: first.start, judge: { ...first.judge, ...(level === 3 ? { menu: menuFor(first) } : {}) },
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: 'Factorise le dénominateur, puis un terme par facteur. Pour A, cache son facteur et remplace x par sa racine.' },
      { level: 2, html: `${names[0]} = ${MT(coverSeg('A', d, 0, 4).lines[0].math)}` },
      { level: 3, html: MT(final) },
    ],
    subgoals: [{ id: 'factor', label: 'factoriser D', skill: 'fac-trinomial' }, { id: 'cover', label: 'méthode du cache', skill: PFD1 }, { id: 'write', label: 'forme', skill: IDENT }],
    keys: ['calc'], tapActions: level === 3 ? 'menu' : null,
    key: `${PFD1}:${ND}`, exam: opts.exam ? { format: opts.exam, points: 2 } : false,
  });
}

function pfdSimpleExam(rng, exam) {
  const d = simpleData(rng, 2);
  const ND = `(${PT(d.N)})/(${PT(d.D)})`;
  if (exam === 'coef') {
    return answerItem({
      skill: PFD1, level: 4, prompt: `${MT(`${ND}=A/${den1(d.rs[0])}+B/${den1(d.rs[1])}`)}. Que vaut B ?`,
      expected: lit0(d.cs[1]), key: ND, exam: { format: 'coef', points: 1 },
      solution: [{ html: MT(sumText(d.rs.map((r, j) => elem(d.cs[j], r)))), note: 'Méthode du cache' }],
    });
  }
  const right = sumText(d.rs.map((r, j) => elem(d.cs[j], r)));
  const options = [{ html: MT(right), correct: true }];
  const atNeg = d.rs.map((r, j) => {
    const others = d.rs.filter((_, l) => l !== j);
    const den = others.reduce((p, o) => p.mul(-r - o), q(1));
    return den.n === 0 ? null : evalQ(qCoeffs(d.N), q(-r)).div(den);
  });
  if (atNeg.every(Boolean)) options.push({ html: MT(sumText(d.rs.map((r, j) => elem(atNeg[j], r)))), correct: false, rule: 'g0_coverup_sign' });
  options.push({ html: MT(sumText(d.rs.map((r, j) => elem(q(d.cs[j]).neg(), r)))), correct: false });
  options.push({ html: MT(sumText(d.rs.map((r, j) => elem(d.cs[1 - j], r)))), correct: false });
  return mcq({
    skill: PFD1, level: 4, prompt: `Quelle est la décomposition en éléments simples de ${MT(ND)} ?`,
    options: options.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i), key: `mcq:${ND}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: MT(right), note: 'Méthode du cache' }],
  }, rng);
}

// General: K1 A/(x − a) + (Bx + C)/(x² + s); K2 A/(x − a) + B/(x − b) + C/(x − b)²;
// K3 (division first) Ex + F + A/(x − a) + B/(x − b).
function generalData(rng, kind) {
  for (let i = 0; i < 300; i++) {
    const a = kind === 'K1' ? nz(rng, -3, 3) : rng.int(-3, 3);
    if (kind === 'K1') {
      const s = rng.pick([1, 4]);
      const A = nz(rng, -4, 4);
      const B = rng.int(-4, 4);
      const C = rng.int(-4, 4);
      if (B === 0 && C === 0) continue;
      const T = fromQ([q(s), q(0), q(1)]);
      const D = P1(a).mul(T);
      const N = T.scale(A).add(fromQ([q(C), q(B)]).mul(P1(a)));
      if (big(N, 30) || N.isZero) continue;
      return { kind, a, s, A, B, C, D, N, T, final: sumText([elem(A, a), `(${PT(fromQ([q(C), q(B)]))})/(${PT(T)})`]) };
    }
    if (kind === 'K2') {
      const b = rng.int(-3, 3);
      if (a === b) continue;
      const A = nz(rng, -4, 4);
      const B = rng.int(-4, 4);
      const C = nz(rng, -4, 4);
      const D = P1(a).mul(P1(b).pow(2));
      const N = P1(b).pow(2).scale(A).add(P1(a).mul(P1(b)).scale(B)).add(P1(a).scale(C));
      if (big(N, 30) || N.isZero) continue;
      const parts = [elem(A, a)];
      if (B) parts.push(elem(B, b));
      parts.push(elem(C, b, 2));
      return { kind, a, b, A, B, C, D, N, final: sumText(parts) };
    }
    const b = rng.int(-3, 3);
    if (a === b) continue;
    const E = nz(rng, -3, 3);
    const F = rng.int(-3, 3);
    const A = nz(rng, -4, 4);
    const B = nz(rng, -4, 4);
    const D = P1(a).mul(P1(b));
    const R = P1(b).scale(A).add(P1(a).scale(B));
    const Ep = fromQ([q(F), q(E)]);
    const N = Ep.mul(D).add(R);
    if (big(N, 30)) continue;
    return { kind, a, b, A, B, E, F, D, N, R, Ep, final: sumText([PT(Ep), elem(A, a), elem(B, b)]) };
  }
  return null;
}

function pfdGeneralItem(level, rng, opts = {}) {
  const kind = level === 1 ? 'K1' : rng.pick(['K1', 'K2', 'K3']);
  const d = generalData(rng, kind);
  const ND = `(${PT(d.N)})/(${PT(d.D)})`;
  const segs = [];
  const script = [];
  const value = (name, expect, start, coverup, note) => ({ html: `${name} = ?`, start: name, judge: { kind: 'value', form: 'irreducible', expect: lit0(expect), ...(coverup ? { coverup } : {}) }, lines: [
    { kind: 'eq', math: start, note, subgoal: coverup ? 'cover' : 'identify' },
    { kind: 'eq', math: lit0(expect), note: 'Calculer', subgoal: coverup ? 'cover' : 'identify' },
  ] });
  let forms;
  if (d.kind === 'K1') {
    forms = [
      { id: 'right', label: `A/${denR(d.a)} + (Bx + C)/(${RT(PT(d.T))})`, valid: true },
      { id: 'const', label: `A/${denR(d.a)} + B/(${RT(PT(d.T))})`, valid: false, rule: 'g0_pfd_form', why: 'Sur un trinôme irréductible, le numérateur est de la forme Bx + C.' },
      { id: 'split', label: `A/${denR(d.a)} + B/x + C/x²`, valid: false, why: `${RT(PT(d.T))} ne se factorise pas sur ℝ : on garde le trinôme.` },
    ];
    segs.push(value('A', d.A, `(${at(d.N, d.a)})/(${at(d.T, d.a)})`, { num: PT(d.N), den: PT(d.T), at: d.a }, `Cache ${RT(lin(d.a))}, pose x = ${fr(String(d.a))}`));
    // x² : coefficient of N = A + B ; constant : N(0) = A·s − C·a.
    const Nc = qCoeffs(d.N);
    segs.push(value('B', d.B, minus(Nc[2] ?? 0, d.A), null, 'Coefficient de x² : A + B'));
    const cNum = minus(d.A * d.s, Nc[0]);
    segs.push(value('C', d.C, d.a === 1 ? cNum : `(${cNum})/(${lit0(d.a)})`, null, `Terme constant : N(0) = ${d.s === 1 ? '' : d.s}A ${d.a > 0 ? '−' : '+'} ${Math.abs(d.a) === 1 ? '' : Math.abs(d.a)}C`));
  } else if (d.kind === 'K2') {
    forms = [
      { id: 'right', label: `A/${denR(d.a)} + B/${denR(d.b)} + C/${denR(d.b, 2)}`, valid: true },
      { id: 'short', label: `A/${denR(d.a)} + C/${denR(d.b, 2)}`, valid: false, rule: 'g0_pfd_form', why: 'Un facteur répété (x − b)² demande deux termes.' },
      { id: 'simple', label: `A/${denR(d.a)} + B/${denR(d.b)}`, valid: false, rule: 'g0_pfd_form', why: 'Il manque le terme en (x − b)².' },
    ];
    segs.push(value('A', d.A, `(${at(d.N, d.a)})/(${at(P1(d.b).pow(2), d.a)})`, { num: PT(d.N), den: PT(P1(d.b).pow(2)), at: d.a }, `Cache ${RT(lin(d.a))}, pose x = ${fr(String(d.a))}`));
    segs.push(value('C', d.C, `(${at(d.N, d.b)})/(${at(P1(d.a), d.b)})`, { num: PT(d.N), den: lin(d.a), at: d.b }, `Cache ${denR(d.b, 2)}, pose x = ${fr(String(d.b))}`));
    const Nc = qCoeffs(d.N);
    segs.push(value('B', d.B, minus(Nc[2] ?? 0, d.A), null, 'Coefficient de x² : A + B'));
  } else {
    forms = [
      { id: 'right', label: `D'abord diviser : ${RT(PT(d.Ep))} + A/${denR(d.a)} + B/${denR(d.b)}`, valid: true },
      { id: 'nodiv', label: `A/${denR(d.a)} + B/${denR(d.b)}`, valid: false, rule: 'g0_pfd_no_div', why: "deg N ≥ deg D : il faut d'abord diviser." },
      { id: 'nodiv2', label: `Ax + A/${denR(d.a)} + B/${denR(d.b)}`, valid: false, why: 'La partie entière vient de la division de N par D.' },
    ];
    segs.push({ html: 'Divise N par D :', start: `N=${PT(d.N)}`, judge: { kind: 'poly', mode: 'div', v: V, dividend: PT(d.N), divisor: PT(d.D), names: { N: PT(d.N), D: PT(d.D) }, divisorName: 'D' }, lines: [
      { kind: 'eq', math: `N=D×(${PT(d.Ep)})+(${PT(d.R)})`, note: 'Division : partie entière et reste', subgoal: 'div' },
    ] });
    const sd = { rs: [d.a, d.b], cs: [q(d.A), q(d.B)], N: d.R, D: d.D };
    segs.push(coverSeg('A', sd, 0, level), coverSeg('B', sd, 1, level));
  }
  segs.push({ html: 'Écris la décomposition :', start: ND, judge: EQV({ target: 'partial-fractions' }), lines: [{ kind: 'eq', math: d.final, note: 'Écrire', subgoal: 'write' }] });
  if (level === 1) script.push({ kind: 'note', html: `Forme : ${forms[0].label}` });
  else if (level === 2) script.push({ kind: 'decision', prompt: 'Quelle forme ?', options: forms });
  const [first, ...rest] = segs;
  script.push(...first.lines);
  for (const s of rest) script.push({ kind: 'segment', html: s.html, ask: s.start.length === 1 ? `${s.start} =` : undefined, start: { math: s.start }, judge: { ...s.judge, ...(level === 3 ? { menu: menuFor(s) } : {}) } }, ...s.lines);
  return linesItem({
    skill: PFD2, level, prompt: `Décompose en éléments simples ${MT(ND)}.`,
    start: first.start, judge: { ...first.judge, ...(level === 3 ? { menu: menuFor(first) } : {}) },
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: d.kind === 'K3' ? 'deg N ≥ deg D : divise d\'abord.' : d.kind === 'K1' ? 'Sur x² + s, le numérateur est de la forme Bx + C.' : 'Un facteur (x − b)² demande deux termes : B/(x − b) + C/(x − b)².' },
      { level: 2, html: forms[0].label },
      { level: 3, html: MT(d.final) },
    ],
    subgoals: [
      { id: 'cover', label: 'méthode du cache', skill: PFD1 }, { id: 'identify', label: 'identifier', skill: IDENT },
      { id: 'div', label: 'diviser', skill: LONGDIV }, { id: 'write', label: 'écrire', skill: PFD2 },
    ],
    keys: ['calc', 'letters'], tapActions: level === 3 ? 'menu' : null,
    key: `${PFD2}:${ND}`, exam: opts.exam ? { format: opts.exam, points: 4 } : false,
  });
}

function pfdGeneralCoef(rng) {
  const d = generalData(rng, rng.pick(['K1', 'K2']));
  const ND = `(${PT(d.N)})/(${PT(d.D)})`;
  const form = d.kind === 'K1' ? `A/${den1(d.a)}+(Bx+C)/(${PT(d.T)})` : `A/${den1(d.a)}+B/${den1(d.b)}+C/${den1(d.b, 2)}`;
  return answerItem({
    skill: PFD2, level: 4, prompt: `${MT(`${ND}=${form}`)}. Que vaut A ?`, expected: lit0(d.A), key: ND, exam: { format: 'coef', points: 1 },
    solution: [{ html: MT(d.final), note: '' }],
  });
}

// ======================================================================

export const GEN = {
  [IDENT]: (level, rng, profile, opts = {}) => (opts.exam ? identExam(rng, opts.exam) : identItem(level, rng, opts)),
  [HORNER]: (level, rng, profile, opts = {}) => (opts.exam ? hornerExam(rng, opts.exam) : hornerItem(level, rng, opts)),
  [LONGDIV]: (level, rng, profile, opts = {}) => (opts.exam ? longDivExam(rng, opts.exam) : longDivItem(level, rng, opts)),
  [FTHM]: (level, rng, profile, opts = {}) => (opts.exam ? fthmExam(rng, opts.exam) : fthmItem(level, rng, opts)),
  [MULT]: (level, rng, profile, opts = {}) => (opts.exam ? multExam(rng, opts.exam) : multItem(level, rng, opts)),
  [FREAL]: (level, rng, profile, opts = {}) => (opts.exam ? frealExam(rng, opts.exam) : frealItem(level, rng, opts)),
  [FCPLX]: (level, rng, profile, opts = {}) => (opts.exam ? cplxExam(rng, opts.exam) : cplxItem(level, rng, opts)),
  [COND]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? condMcq(rng) : condItem(opts.exam ? 5 : level, rng, opts)),
  [DPARAM]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? dparamMcq(rng) : dparamItem(opts.exam ? 5 : level, rng, opts)),
  [GCD]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? gcdMcq(rng) : gcdItem(opts.exam ? 5 : level, rng, opts)),
  [PFD1]: (level, rng, profile, opts = {}) => (opts.exam ? pfdSimpleExam(rng, opts.exam) : pfdSimpleItem(level, rng, opts)),
  [PFD2]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? pfdGeneralCoef(rng) : pfdGeneralItem(opts.exam ? 5 : level, rng, opts)),
};

