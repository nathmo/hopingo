// n-quad-composite and n-richardson (module N, part e, step U9).
// Catalogue: docs/universite/N-analyse-numerique.md.
//
// n-quad-composite. Data: f = c·xᵏ (+ e·x) + d, k ∈ {2, 3, 4}, on [a ; b]
// with b − a ∈ {1, 2, 4}, n ∈ {1, 2}; every value exact, the result a
// fraction of denominator ≤ 48. Lines are judged by `value` with the value
// of the formula (cfg.expect): the formula written with numbers, then the
// sum of each sub-interval, then the total.
// L1 guided (weight and f(cᵢ) of the first sub-interval, the total to fill);
// L2 the weights to find; L3 choose the weights (Simpson h/6 or h/3,
// trapezoid h/2 or h; traps n_simpson_h3_h6, n_trap_weights); L4 the four
// formulas on one example; L5 the program (simpson, trapeze, midpoint),
// then a table of its outputs to read (exact on x² and x³, not on x⁴).
// Exam: mcq on a composite value (distractors h/3, trapezoid with weights h,
// another formula).
//
// n-richardson. Data: f polynomial of degree 2 or 3, [0 ; 1] or [0 ; 2],
// point milieu or trapèze (p = 2), n ∈ {1, 2}: Q₂ₕ = Q(n), Q_h = Q(2n),
// Q̃ = (4Q_h − Q₂ₕ)/3, ε = |Q̃ − Q_h|, exact. L1 Q₂ₕ and Q_h given, Q̃ with
// blanks; L2 Q₂ₕ and Q_h to compute; L3 choose p; L4 everything; L5 the
// program, then its outputs for eˣ (Q̃ is of order 4). Exam: mcq on the
// formula (n_richardson_swap, n_richardson_wrong_p).

import { linesItem, mcq, examTag } from './kit.js';
import { refCode, codeItem, holesFor, readtableItem, multiMcq, blankBy, PRELUDE_VEC, SIG_VEC } from './numerique-kit.js';
import { q, qd, qR, qi, pEval, pInt, pText, quadQ, H, etraps } from './numerique-e-kit.js';
import { t, tn } from '../../i18n.js';

const QC = 'n-quad-composite';
const RI = 'n-richardson';
const KEYS = ['calc'];

const NAMES = { rect: t('rectangle à gauche'), mid: t('point milieu'), trap: t('trapèze'), simp: 'Simpson' };
const FORMULA = {
  rect: 'h·Σ f(xᵢ₋₁)',
  mid: 'h·Σ f(cᵢ)',
  trap: 'Σ (h/2)·(f(xᵢ₋₁) + f(xᵢ))',
  simp: 'Σ (h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ))',
};

// ---------- data ----------

const small = (x, d = 48) => Math.abs(q(x).d) <= d;

function compData(rng, { ns = [1, 2], k = [2, 3, 4] } = {}) {
  for (let tries = 0; tries < 300; tries++) {
    const deg = rng.pick(k);
    const cs = Array(deg + 1).fill(0);
    cs[deg] = rng.pick([1, 1, 2, -1, 3]);
    cs[0] = rng.int(-2, 3);
    if (rng.chance(0.4)) cs[1] = rng.pick([-2, -1, 1, 2]);
    const a = rng.pick([0, 0, 1, -1]);
    const L = rng.pick([1, 2, 2, 4]);
    const b = a + L;
    const n = rng.pick(ns);
    const f = (x) => pEval(cs, x);
    const I = pInt(cs, a, b);
    const vals = {};
    let ok = true;
    for (const m of ['rect', 'mid', 'trap', 'simp']) {
      try { vals[m] = quadQ(m, f, a, b, n); } catch { ok = false; break; }
      if (!small(vals[m], 48)) ok = false;
    }
    if (!ok) continue;
    // Readable values at the nodes and midpoints.
    const h = q(L, n);
    const pts = [];
    for (let i = 0; i <= 2 * n; i++) pts.push(f(q(a).add(h.mul(i).div(2))));
    if (pts.some((v) => Math.abs(v.valueOf()) > 200 || !small(v, 64) || qd(v).length > 7)) continue;
    // The formulas must give different values (the exam's options).
    const set = new Set(Object.values(vals).map(String));
    if (set.size < 4) continue;
    return { cs, a, b, L, n, h, f, I, vals };
  }
  const cs = [0, 0, 0, 1];
  const f = (x) => pEval(cs, x);
  return { cs, a: 0, b: 2, L: 2, n: 2, h: q(1), f, I: q(4), vals: { rect: quadQ('rect', f, 0, 2, 2), mid: quadQ('mid', f, 0, 2, 2), trap: quadQ('trap', f, 0, 2, 2), simp: q(4) }, fallback: true };
}

const fT = (d) => `f(x) = ${pText(d.cs)}`;
const ab = (d) => `[${R0(d.a)} ; ${R0(d.b)}]`;
function R0(x) { return String(x).replace(/-/g, '−'); }
const sumT = (vs) => vs.map((v, i) => (i === 0 ? qd(v) : qi(v))).join('+');
const wT = (w) => (w.includes('/') ? `(${w})` : w);

// The sub-intervals: x0, c, x1 and their values.
function cells(d) {
  return Array.from({ length: d.n }, (_, i) => {
    const x0 = q(d.a).add(d.h.mul(i));
    const x1 = x0.add(d.h);
    const c = x0.add(x1).div(2);
    return { x0, x1, c, f0: d.f(x0), fc: d.f(c), f1: d.f(x1) };
  });
}

// The lines of one formula: the numbers, the sum per sub-interval, the total.
function formulaLines(d, m) {
  const cl = cells(d);
  const W = { rect: d.h, mid: d.h, trap: d.h.div(2), simp: d.h.div(6) }[m];
  const w = qd(W);
  let first;
  let groups;
  if (m === 'rect' || m === 'mid') {
    const vs = cl.map((c) => (m === 'rect' ? c.f0 : c.fc));
    first = `${w}×(${sumT(vs)})`;
    groups = null;
  } else {
    const parts = cl.map((c) => (m === 'trap' ? `${wT(w)}×(${sumT([c.f0, c.f1])})` : `${wT(w)}×(${qd(c.f0)}+4×${qi(c.fc)}+${qi(c.f1)})`));
    first = parts.join('+');
    groups = cl.length > 1 ? cl.map((c) => (m === 'trap' ? W.mul(c.f0.add(c.f1)) : W.mul(c.f0.add(c.fc.mul(4)).add(c.f1)))) : null;
  }
  return { first, w, W, groups, value: d.vals[m], cl };
}

const nodesNote = (d) => {
  const cl = cells(d);
  return t('h = {h} ; nœuds {nodes} ; milieux {mids}', { h: qR(d.h), nodes: [cl[0].x0, ...cl.map((c) => c.x1)].map(qR).join(' ; '), mids: cl.map((c) => qR(c.c)).join(' ; ') });
};

// The wrong values of the traps for a formula.
function compTraps(d, m) {
  const cl = cells(d);
  const list = [];
  if (m === 'simp') list.push(['n_simpson_h3_h6', [d.vals.simp.mul(2)]]);
  if (m === 'trap') {
    const allH = cl.reduce((s, c) => s.add(c.f0), q(0)).add(cl[cl.length - 1].f1).mul(d.h);
    if (!allH.eq(d.vals.trap)) list.push(['n_trap_weights', [allH]]);
  }
  return etraps(list.map(([id, vs]) => [id, vs.filter((v) => !v.eq(d.vals[m])).map(String)]));
}

const SUB_C = [
  { id: 'nodes', label: t('nœuds et pas h'), skill: 'g5-sigma' },
  { id: 'sum', label: t('somme sur chaque sous-intervalle'), skill: QC },
  { id: 'total', label: t('total'), skill: QC },
  { id: 'exact', label: t('intégrale exacte'), skill: 'a1-int-direct' },
];

function compScript(d, m, { blanks = null } = {}) {
  const L = formulaLines(d, m);
  const script = [{ kind: 'note', html: nodesNote(d) }];
  const firstLine = { kind: 'eq', math: L.first, note: `${NAMES[m]} : ${FORMULA[m]}`, subgoal: 'nodes' };
  if (blanks === 'one') Object.assign(firstLine, blankBy(L.first, m === 'simp' ? [L.w, qi(L.cl[0].fc)] : m === 'trap' ? [L.w] : [L.w]));
  if (blanks === 'weights') Object.assign(firstLine, blankBy(L.first, L.groups ? L.groups.map(() => L.w) : [L.w]));
  script.push(firstLine);
  if (L.groups) script.push({ kind: 'eq', math: sumT(L.groups), note: t('Chaque sous-intervalle'), subgoal: 'sum' });
  const last = { kind: 'eq', math: qd(L.value), note: t('Total'), subgoal: 'total' };
  if (blanks) Object.assign(last, blankBy(last.math, [last.math]));
  script.push(last);
  return script;
}

function compLines(rng, level) {
  const d = compData(rng, { ns: level === 1 ? [1, 2] : [2] });
  const m = level <= 2 ? rng.pick(['simp', 'simp', 'trap', 'mid']) : rng.pick(['simp', 'trap']);
  const L = formulaLines(d, m);
  const judge = { kind: 'value', expect: qd(L.value), ...compTraps(d, m) };
  let script;
  if (level === 3) {
    const opts = m === 'simp' ? [
      { id: 'h6', label: t('(h/6)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)), h = longueur d\'un sous-intervalle'), valid: true, ref: true },
      { id: 'h3', label: t('(h/3)·(f(xᵢ₋₁) + 4f(cᵢ) + f(xᵢ)), h = longueur d\'un sous-intervalle'), valid: false, rule: 'n_simpson_h3_h6', why: t('Avec h la longueur du sous-intervalle, le poids est h/6 : h/3 vaut quand h est la distance de xᵢ₋₁ au milieu.') },
      { id: 'eq', label: '(h/3)·(f(xᵢ₋₁) + f(cᵢ) + f(xᵢ))', valid: false, why: t('Le milieu pèse 4 fois plus que les bords : poids 1, 4, 1.') },
    ] : [
      { id: 'h2', label: t('(h/2)·(f(xᵢ₋₁) + f(xᵢ)) sur chaque sous-intervalle'), valid: true, ref: true },
      { id: 'h', label: 'h·(f(x₀) + f(x₁) + … + f(xₙ))', valid: false, rule: 'n_trap_weights', why: t('Les extrémités a et b n\'appartiennent qu\'à un seul trapèze : poids h/2.') },
      { id: 'mid', label: t('h·f(cᵢ) sur chaque sous-intervalle'), valid: false, why: t('C\'est le point milieu, pas le trapèze.') },
    ];
    script = [{ kind: 'decision', prompt: m === 'simp' ? t('Quelle formule pour la méthode de Simpson ?') : t('Quelle formule pour la méthode du trapèze ?'), options: opts }, ...compScript(d, m)];
  } else script = compScript(d, m, { blanks: level === 1 ? 'one' : level === 2 ? 'weights' : null });
  const c0 = L.cl[0];
  return linesItem({
    skill: QC, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS,
    prompt: m === 'simp'
      ? tn(d.n, 'Approche ∫ de {a} à {b} de {f} par la formule de Simpson composite avec n = {n} sous-intervalle.', 'Approche ∫ de {a} à {b} de {f} par la formule de Simpson composite avec n = {n} sous-intervalles.', { a: R0(d.a), b: R0(d.b), f: fT(d) })
      : m === 'trap'
        ? tn(d.n, 'Approche ∫ de {a} à {b} de {f} par la formule du trapèze composite avec n = {n} sous-intervalle.', 'Approche ∫ de {a} à {b} de {f} par la formule du trapèze composite avec n = {n} sous-intervalles.', { a: R0(d.a), b: R0(d.b), f: fT(d) })
        : tn(d.n, 'Approche ∫ de {a} à {b} de {f} par la formule du point milieu composite avec n = {n} sous-intervalle.', 'Approche ∫ de {a} à {b} de {f} par la formule du point milieu composite avec n = {n} sous-intervalles.', { a: R0(d.a), b: R0(d.b), f: fT(d) }),
    start: 'Q_h', judge, script,
    hints: H(m === 'simp' ? t('Simpson, sur chaque sous-intervalle de longueur h : (h/6)·(gauche + 4·milieu + droite).') : m === 'trap' ? t('Trapèze, sur chaque sous-intervalle de longueur h : (h/2)·(gauche + droite).') : t('Point milieu : h fois la somme des valeurs aux milieux cᵢ.'),
      m === 'simp' ? `(${qR(L.W)})·(f(${qR(c0.x0)}) + 4f(□) + f(${qR(c0.x1)}))` : `h = (b − a)/n = □`,
      `${R0(L.first)} = ${qR(L.value)}`),
    subgoals: SUB_C, key: `${QC}:${level}:${m}:${d.cs.join(',')}:${d.a}:${d.b}:${d.n}`, fallback: d.fallback,
  });
}

// L4: the four formulas.
function compAll(rng) {
  const d = compData(rng, { ns: [2], k: [2, 3] });
  const segs = [];
  const order = ['rect', 'mid', 'trap', 'simp'];
  order.forEach((m, i) => {
    const L = formulaLines(d, m);
    const sc = compScript(d, m).filter((l) => l.kind === 'eq');
    const judge = { kind: 'value', expect: qd(L.value), ...compTraps(d, m) };
    if (i === 0) segs.push({ first: true, judge, sc, m });
    else segs.push({ judge, sc, m });
  });
  const [s0, ...rest] = segs;
  const script = [{ kind: 'note', html: t('{nodes}. rectangle à gauche :', { nodes: nodesNote(d) }) }, ...s0.sc];
  for (const s of rest) script.push({ kind: 'segment', html: s.m === 'simp' ? t('Formule de Simpson :') : s.m === 'trap' ? t('Formule du trapèze :') : t('Formule du point milieu :'), ask: `${{ mid: 'M', trap: 'T', simp: 'S' }[s.m]} =`, start: { math: { mid: 'M', trap: 'T', simp: 'S' }[s.m] }, judge: s.judge }, ...s.sc);
  return linesItem({
    skill: QC, level: 4, mode: 'free', keys: KEYS,
    prompt: t('Calcule ∫ de {a} à {b} de {f} avec n = 2 par les quatre formules composites : rectangle à gauche (R), point milieu (M), trapèze (T), Simpson (S). La valeur exacte est {I}.', { a: R0(d.a), b: R0(d.b), f: fT(d), I: qR(d.I) }),
    start: 'R', judge: s0.judge, script,
    hints: H(t('h = (b − a)/n ; rectangle : h·f(gauche), point milieu : h·f(milieu), trapèze : (h/2)(gauche + droite), Simpson : (h/6)(gauche + 4 milieu + droite).'),
      `R = ${qR(d.h)}·(f(${qR(d.a)}) + f(□))`,
      `R = ${qR(d.vals.rect)}, M = ${qR(d.vals.mid)}, T = ${qR(d.vals.trap)}, S = ${qR(d.vals.simp)}`),
    subgoals: SUB_C, key: `${QC}:4:${d.cs.join(',')}:${d.a}:${d.b}`, fallback: d.fallback,
  });
}

// ---------- the program ----------

const COMP = refCode(`def simpson(f, a, b, n):
    h = (b - a) / n
    s = 0.0
    for i in range(n):
        x0 = a + i * h
        x1 = «x0 + h»
        c = «(x0 + x1) / 2»
        s = s + «h / 6 * (f(x0) + 4 * f(c) + f(x1))»
    return s

def trapeze(f, a, b, n):
    h = (b - a) / n
    s = «(f(a) + f(b)) / 2»
    for i in range(1, n):
        s = s + f(a + i * h)
    return «h * s»

def midpoint(f, a, b, n):
    h = (b - a) / n
    s = 0.0
    for i in range(n):
        s = s + «f(a + (i + 0.5) * h)»
    return h * s
`);
const COMP_TRAPS = {
  2: [{ text: 'h / 3 * (f(x0) + 4 * f(c) + f(x1))', rule: 'n_simpson_h3_h6' }],
  3: [{ text: 'f(a) + f(b)', rule: 'n_trap_weights' }],
};
const COMP_TESTS = [
  { setup: 'def f(x): return x*x - 4*x + math.exp(x)', expr: 'simpson(f, 0, 5, 1000)', expect: '139.0798257692752', tol: 1e-12 },
  { setup: 'def g(x): return x**3', expr: 'simpson(g, 0, 2, 2)', expect: '4.0', tol: 1e-12 },
  { setup: 'def g(x): return x*x', expr: 'trapeze(g, 0, 1, 4)', expect: '0.34375', tol: 1e-12 },
  { expr: 'midpoint(math.sin, 0, math.pi, 2)', expect: '2.221441469079183', tol: 1e-12 },
];

function compCode(rng) {
  const ks = [2, 3, 4];
  const rows = ks.map((k) => {
    const cs = Array(k + 1).fill(0);
    cs[k] = 1;
    const f = (x) => pEval(cs, x);
    return [`x${{ 2: '²', 3: '³', 4: '⁴' }[k]}`, String(quadQ('simp', f, 0, 2, 2)), String(pInt(cs, 0, 2))];
  });
  const question = multiMcq({
    skill: QC, level: 5, key: `${QC}:readexact`,
    prompt: t('Que montre ce tableau ?'),
    options: [
      { html: t('Simpson intègre exactement x² et x³'), correct: true },
      { html: t('Simpson n\'est pas exacte sur x⁴'), correct: true },
      { html: t('Simpson est exacte sur tous les polynômes'), correct: false },
      { html: t('Le poids h/3 donnerait les mêmes valeurs'), correct: false, rule: 'n_simpson_h3_h6' },
    ],
    solution: [{ html: t('Simpson est exacte sur P₃ (degré d\'exactitude 3), pas sur x⁴ : 20/3 ≠ 32/5.'), note: '' }],
  }, rng);
  const then = readtableItem({
    skill: QC, level: 5, key: 'exact',
    prompt: t('Avec ton programme, simpson(g, 0, 2, 2) pour g(x) = x², x³ et x⁴ donne :'),
    table: { columns: ['g', 'simpson(g, 0, 2, 2)', '∫₀² g'], rows },
    question,
  });
  return codeItem({
    skill: QC, level: 5, ref: COMP, blanks: holesFor(5, COMP), traps: COMP_TRAPS, rng,
    prompt: t('Complète les trois formules composites (h est la longueur d\'un sous-intervalle, c son milieu).'),
    tests: COMP_TESTS, then, hints: [], subgoals: SUB_C, key: '5',
  });
}

// ---------- exam ----------

function compMcq(rng, opts) {
  const d = compData(rng, { ns: [2], k: [2, 3, 4] });
  const m = rng.pick(['simp', 'simp', 'trap']);
  const right = d.vals[m];
  const cl = cells(d);
  const allH = cl.reduce((s, c) => s.add(c.f0), q(0)).add(cl[cl.length - 1].f1).mul(d.h);
  const cands = m === 'simp'
    ? [[right.mul(2), 'n_simpson_h3_h6'], [allH, 'n_trap_weights'], [d.vals.mid, null], [d.vals.trap, null], [d.vals.rect, null]]
    : [[allH, 'n_trap_weights'], [d.vals.simp, null], [d.vals.mid, null], [right.mul(2), null], [d.vals.rect, null]];
  const options = [{ html: qR(right), correct: true }];
  const seen = new Set([String(right)]);
  for (const [v, rule] of cands) {
    if (options.length >= 4 || seen.has(String(v))) continue;
    seen.add(String(v));
    options.push({ html: qR(v), correct: false, ...(rule ? { rule } : {}) });
  }
  return mcq({
    skill: QC, level: 4, key: `${QC}:mcq:${m}:${d.cs.join(',')}:${d.a}:${d.b}`, exam: examTag(opts),
    prompt: m === 'simp'
      ? t('Que vaut la formule de Simpson composite pour ∫ de {a} à {b} de {f}, avec n = 2 sous-intervalles ?', { a: R0(d.a), b: R0(d.b), f: fT(d) })
      : t('Que vaut la formule du trapèze composite pour ∫ de {a} à {b} de {f}, avec n = 2 sous-intervalles ?', { a: R0(d.a), b: R0(d.b), f: fT(d) }),
    options, solution: [{ html: `${nodesNote(d)} ; ${NAMES[m]} : ${R0(formulaLines(d, m).first)} = ${qR(right)}.`, note: '' }],
  }, rng);
}

// ======================================================================
// n-richardson
// ======================================================================

const SUB_R = [
  { id: 'q2h', label: 'Q₂ₕ', skill: QC },
  { id: 'qh', label: 'Q_h', skill: QC },
  { id: 'extrapolate', label: t('extrapoler'), skill: RI },
  { id: 'estimate', label: t('estimer l\'erreur'), skill: RI },
  { id: 'order', label: t('l\'ordre p'), skill: 'n-quad-order' },
];

function richData(rng) {
  for (let tries = 0; tries < 300; tries++) {
    const deg = rng.pick([2, 3]);
    const cs = Array(deg + 1).fill(0);
    cs[deg] = rng.pick([1, 1, 2, 3, -1]);
    cs[0] = rng.int(-1, 2);
    if (rng.chance(0.4)) cs[1] = rng.pick([-1, 1, 2]);
    const b = rng.pick([1, 2]);
    const m = rng.pick(['mid', 'trap']);
    const n = rng.pick([1, 1, 2]);
    const f = (x) => pEval(cs, x);
    const q2h = quadQ(m, f, 0, b, n);
    const qh = quadQ(m, f, 0, b, 2 * n);
    const qt = qh.mul(4).sub(q2h).div(3);
    const eps = qt.sub(qh);
    const epsA = eps.n < 0 ? eps.neg() : eps;
    const texts = [q2h, qh, qt, epsA].map(qd);
    if ([q2h, qh, qt, epsA].some((v) => Math.abs(v.d) > 192) || epsA.n === 0 || qt.n === 0) continue;
    if (texts.slice(0, 2).some((s) => s === '3' || s === '4') || texts.some((s) => s.length > 8)) continue;
    const wrong = [qh.mul(2).sub(q2h), qh.mul(16).sub(q2h).div(15)];
    const swap = q2h.mul(4).sub(qh).div(3);
    if ([...wrong, swap].some((v) => v.eq(qt))) continue;
    return { cs, b, m, n, f, q2h, qh, qt, eps: epsA, I: pInt(cs, 0, b), wrong, swap };
  }
  const cs = [0, 0, 1];
  const f = (x) => pEval(cs, x);
  return { cs, b: 1, m: 'mid', n: 1, f, q2h: q(1, 4), qh: q(5, 16), qt: q(1, 3), eps: q(1, 48), I: q(1, 3), wrong: [q(3, 8), q(1, 3).add(q(1, 180))], swap: q(1, 4).mul(4).sub(q(5, 16)).div(3), fallback: true };
}

// The prompt of richLines: point milieu or trapèze, Q₂ₕ and Q_h given or not.
function richPrompt(isMid, given, v) {
  if (isMid) {
    return given
      ? t('On approche ∫ de 0 à {b} de {f} par la formule du point milieu composite (d\'ordre p = 2). Avec n = {n}, Q₂ₕ = {q2h} ; avec n = {n2}, Q_h = {qh}. Extrapole par Richardson, puis estime l\'erreur de Q_h.', v)
      : t('On approche ∫ de 0 à {b} de {f} par la formule du point milieu composite (d\'ordre p = 2). Calcule Q₂ₕ (n = {n}) et Q_h (n = {n2}), extrapole par Richardson, puis estime l\'erreur de Q_h.', v);
  }
  return given
    ? t('On approche ∫ de 0 à {b} de {f} par la formule du trapèze composite (d\'ordre p = 2). Avec n = {n}, Q₂ₕ = {q2h} ; avec n = {n2}, Q_h = {qh}. Extrapole par Richardson, puis estime l\'erreur de Q_h.', v)
    : t('On approche ∫ de 0 à {b} de {f} par la formule du trapèze composite (d\'ordre p = 2). Calcule Q₂ₕ (n = {n}) et Q_h (n = {n2}), extrapole par Richardson, puis estime l\'erreur de Q_h.', v);
}

const richTraps = (d) => etraps([['n_richardson_wrong_p', d.wrong.map(String)], ['n_richardson_swap', [String(d.swap)]]]);

function richLines(rng, level) {
  const d = richData(rng);
  const isMid = d.m === 'mid';
  const formula = `(4×${qi(d.qh)}-${qi(d.q2h)})/3`;
  const script = [];
  const given = level === 1;
  let start;
  let judge;
  const qtJudge = { kind: 'value', expect: String(d.qt), ...richTraps(d) };
  const epsSeg = [
    { kind: 'segment', html: t('Estimation a posteriori de l\'erreur de Q_h : ε = |Q̃ − Q_h|.'), ask: 'ε =', start: { math: 'E' }, judge: { kind: 'value', expect: String(d.eps) } },
    { kind: 'eq', math: `|${qi(d.qt)}-${qi(d.qh)}|`, note: '|Q̃ − Q_h|', subgoal: 'estimate' },
    { kind: 'eq', math: qd(d.eps), note: 'ε', subgoal: 'estimate' },
  ];
  const qtLines = [
    { kind: 'eq', math: formula, note: t('(2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) avec p = 2'), subgoal: 'extrapolate', ...(level <= 2 ? blankBy(formula, ['4', '3']) : {}) },
    { kind: 'eq', math: qd(d.qt), note: 'Q̃', subgoal: 'extrapolate', ...(level === 1 ? blankBy(qd(d.qt), [qd(d.qt)]) : {}) },
  ];
  const pDecision = {
    kind: 'decision', prompt: isMid ? t('La formule du point milieu est d\'ordre p = ? Quel facteur 2ᵖ utiliser ?') : t('La formule du trapèze est d\'ordre p = ? Quel facteur 2ᵖ utiliser ?'), options: [
      { id: 'p2', label: 'p = 2 : Q̃ = (4Q_h − Q₂ₕ)/3', valid: true, ref: true },
      { id: 'p1', label: 'p = 1 : Q̃ = 2Q_h − Q₂ₕ', valid: false, rule: 'n_richardson_wrong_p', why: isMid ? t('Le point milieu est d\'ordre 2 : 2² = 4.') : t('Le trapèze est d\'ordre 2 : 2² = 4.') },
      { id: 'p4', label: 'p = 4 : Q̃ = (16Q_h − Q₂ₕ)/15', valid: false, rule: 'n_richardson_wrong_p', why: isMid ? t('L\'ordre 4 est celui de Simpson ; le point milieu est d\'ordre 2.') : t('L\'ordre 4 est celui de Simpson ; le trapèze est d\'ordre 2.') },
      { id: 'sw', label: 'p = 2 : Q̃ = (4Q₂ₕ − Q_h)/3', valid: false, rule: 'n_richardson_swap', why: t('Le poids 2ᵖ va sur la formule la plus fine, Q_h.') },
    ],
  };
  if (given) {
    start = 'Q';
    judge = qtJudge;
    script.push(...qtLines, ...epsSeg);
  } else {
    // Q₂ₕ and Q_h first.
    const L2 = formulaLines({ ...d, a: 0, L: d.b, h: q(d.b, d.n), vals: { [d.m]: d.q2h } }, d.m);
    const L1 = formulaLines({ ...d, a: 0, L: d.b, n: 2 * d.n, h: q(d.b, 2 * d.n), vals: { [d.m]: d.qh } }, d.m);
    start = 'Q_(2h)';
    judge = { kind: 'value', expect: String(d.q2h) };
    script.push(
      { kind: 'eq', math: L2.first, note: `n = ${d.n}`, subgoal: 'q2h' },
      { kind: 'eq', math: qd(d.q2h), note: 'Q₂ₕ', subgoal: 'q2h' },
      { kind: 'segment', html: t('Q_h : la même formule avec n = {n}.', { n: 2 * d.n }), ask: 'Q_h =', start: { math: 'Q_h' }, judge: { kind: 'value', expect: String(d.qh) } },
      { kind: 'eq', math: L1.first, note: `n = ${2 * d.n}`, subgoal: 'qh' },
      { kind: 'eq', math: qd(d.qh), note: 'Q_h', subgoal: 'qh' },
      { kind: 'segment', html: t('Extrapolation de Richardson.'), ask: 'Q̃ =', start: { math: 'Q' }, judge: qtJudge },
      ...(level === 3 ? [pDecision] : []),
      ...qtLines,
      ...epsSeg,
    );
  }
  return linesItem({
    skill: RI, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', keys: KEYS,
    prompt: richPrompt(isMid, given, { b: d.b, f: fT(d), n: d.n, n2: 2 * d.n, q2h: qR(d.q2h), qh: qR(d.qh) }),
    start, judge, script,
    hints: H(t('Combine Q_h et Q₂ₕ pour éliminer le terme en hᵖ : Q̃ = (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1).'),
      `Q̃ = (4·${R0(qi(d.qh))} − □)/3`,
      `Q̃ = ${R0(formula)} = ${qR(d.qt)}, ε = ${qR(d.eps)}.`),
    subgoals: SUB_R, key: `${RI}:${level}:${d.m}:${d.cs.join(',')}:${d.b}:${d.n}`, fallback: d.fallback,
  });
}

const RICH = refCode(`def richardson(Q, f, a, b, n, p):
    q_h = Q(f, a, b, 2 * n)
    q_2h = Q(f, a, b, n)
    q_ext = «(2 ** p * q_h - q_2h) / (2 ** p - 1)»
    return [q_ext, «abs(q_ext - q_h)»]
`);
const RICH_PRELUDE = `${PRELUDE_VEC}
def trapeze(f, a, b, n):
    h = (b - a) / n
    s = (f(a) + f(b)) / 2
    for i in range(1, n):
        s = s + f(a + i * h)
    return h * s

def midpoint(f, a, b, n):
    h = (b - a) / n
    s = 0.0
    for i in range(n):
        s = s + f(a + (i + 0.5) * h)
    return h * s
`;
const RICH_TRAPS = { 0: [{ text: '(2 ** p * q_2h - q_h) / (2 ** p - 1)', rule: 'n_richardson_swap' }], 1: [] };
const RICH_WRONG = { 1: 'abs(q_ext - q_2h)' };
const RICH_TESTS = [
  { setup: 'def g(x): return x*x', expr: 'richardson(midpoint, g, 0, 1, 1, 2)', expect: '[0.3333333333333333, 0.020833333333333315]', tol: 1e-9 },
  { expr: 'richardson(trapeze, math.exp, 0, 1, 4, 2)', expect: '[1.7182841546998968, 0.0022344374644049925]', tol: 1e-9 },
];

function trapF(f, a, b, n) {
  const h = (b - a) / n;
  let s = (f(a) + f(b)) / 2;
  for (let i = 1; i < n; i++) s += f(a + i * h);
  return h * s;
}

function richCode(rng) {
  const I = Math.E - 1;
  const rows = [1, 2, 4, 8].map((n) => {
    const qh = trapF(Math.exp, 0, 1, 2 * n);
    const q2 = trapF(Math.exp, 0, 1, n);
    const qt = (4 * qh - q2) / 3;
    return [String(n), Math.abs(qh - I).toExponential(3), Math.abs(qt - I).toExponential(3), Math.abs(qt - qh).toExponential(3)];
  });
  const question = multiMcq({
    skill: RI, level: 5, key: `${RI}:readcode`,
    prompt: t('Quand n double, que peut-on dire ?'),
    options: [
      { html: t('L\'erreur de Q_h est divisée par 4 : ordre 2'), correct: true },
      { html: t('L\'erreur de Q̃ est divisée par 16 : Q̃ est d\'ordre 4'), correct: true },
      { html: t('Q̃ est aussi d\'ordre 2'), correct: false },
      { html: t('ε = |Q̃ − Q_h| est une bonne estimation de l\'erreur de Q̃'), correct: false },
    ],
    solution: [{ html: t('Q_h (trapèze) est d\'ordre 2 ; l\'extrapolation élimine le terme en h² : Q̃ est d\'ordre 4 (c\'est Simpson). ε estime l\'erreur de Q_h, pas celle de Q̃.'), note: '' }],
  }, rng);
  const then = readtableItem({
    skill: RI, level: 5, key: 'exp',
    prompt: t('richardson(trapeze, math.exp, 0, 1, n, 2) donne, avec l\'intégrale exacte e − 1 :'),
    table: { columns: ['n', '|Q_h − I|', '|Q̃ − I|', 'ε = |Q̃ − Q_h|'], rows },
    question,
  });
  return codeItem({
    skill: RI, level: 5, ref: RICH, blanks: holesFor(5, RICH), traps: RICH_TRAPS, wrong: RICH_WRONG, rng,
    preludes: [RICH_PRELUDE], signatures: [...SIG_VEC, t('trapeze(f, a, b, n), midpoint(f, a, b, n) : formules composites')],
    prompt: t('Complète l\'extrapolation de Richardson : elle renvoie [Q̃, ε], avec ε = |Q̃ − Q_h| l\'estimation de l\'erreur de Q_h.'),
    tests: RICH_TESTS, then, hints: [], subgoals: SUB_R, key: '5',
  });
}

// The prompt of richMcq, by the French name of the method (kept in the key).
const RICH_MCQ = {
  'point milieu': (v) => t('Q_h est la formule du point milieu composite avec un pas h (d\'ordre {p}), Q₂ₕ la même avec le pas 2h. Quelle combinaison est d\'un ordre plus élevé (extrapolation de Richardson) ?', v),
  'trapèze': (v) => t('Q_h est la formule du trapèze composite avec un pas h (d\'ordre {p}), Q₂ₕ la même avec le pas 2h. Quelle combinaison est d\'un ordre plus élevé (extrapolation de Richardson) ?', v),
  Simpson: (v) => t('Q_h est la formule de Simpson composite avec un pas h (d\'ordre {p}), Q₂ₕ la même avec le pas 2h. Quelle combinaison est d\'un ordre plus élevé (extrapolation de Richardson) ?', v),
  'rectangle à gauche': (v) => t('Q_h est la formule du rectangle à gauche composite avec un pas h (d\'ordre {p}), Q₂ₕ la même avec le pas 2h. Quelle combinaison est d\'un ordre plus élevé (extrapolation de Richardson) ?', v),
};

function richMcq(rng, opts) {
  const meth = rng.pick([['point milieu', 2], ['trapèze', 2], ['Simpson', 4], ['rectangle à gauche', 1]]);
  const [name, p] = meth;
  const P = 2 ** p;
  const show = (k) => (k === 1 ? '2Q_h − Q₂ₕ' : `(${2 ** Math.log2(k + 1)}Q_h − Q₂ₕ)/${k}`);
  const right = show(P - 1);
  const others = [1, 3, 15].filter((k) => k !== P - 1).map((k) => ({ html: show(k), correct: false, rule: 'n_richardson_wrong_p' }));
  const swap = { html: P - 1 === 1 ? '2Q₂ₕ − Q_h' : `(${P}Q₂ₕ − Q_h)/${P - 1}`, correct: false, rule: 'n_richardson_swap' };
  return mcq({
    skill: RI, level: 4, key: `${RI}:mcq:${p}:${name}`, exam: examTag(opts),
    prompt: RICH_MCQ[name]({ p }),
    options: [{ html: right, correct: true }, swap, ...others.slice(0, 2)],
    solution: [{ html: t('Q_h ≈ I + Chᵖ et Q₂ₕ ≈ I + 2ᵖChᵖ : (2ᵖQ_h − Q₂ₕ)/(2ᵖ − 1) élimine le terme en hᵖ, ici 2ᵖ = {P}.', { P }), note: '' }],
  }, rng);
}

export const GEN = {
  [QC]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return compMcq(rng, opts);
    if (level === 4) return compAll(rng);
    if (level === 5) return compCode(rng);
    return compLines(rng, level);
  },
  [RI]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return richMcq(rng, opts);
    if (level === 5) return richCode(rng);
    return richLines(rng, level);
  },
};

