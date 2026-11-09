// Generators of module G3 (unit `trigo`), the last four skills:
// g3-ineq, g3-triangle, g3-arc-def, g3-arc-comp. Catalogue:
// docs/universite/G-gymnase-1.md, G3. Inequations: `solset` periodic on an
// interval; triangles: `value` parts, angles in degrees within 0,01°
// (form 'deg', tolDeg); arc functions: `value` (form 'exact') and `equiv`.

import { Q } from '../../math/rational.js';
import { MT, fr, linesItem, mcq, tfItem } from './kit.js';
import { q, PERIODIC, KEYS, lit0, tpl, piT, modQ, trigVal, IDS, RED, EXACT } from './trigo.js';
import { ABS, asbStart, uT, XK } from './trigo-eq.js';

// ======================================================================
// g3-ineq
// ======================================================================

const INEQ = 'g3-ineq';
const INEQ_SUB = [
  { id: 'form', label: 'forme R sin(x + φ)', skill: 'g3-asinbcos' },
  { id: 'arc', label: 'arc solution', skill: INEQ },
  { id: 'isolate', label: 'isoler x', skill: INEQ },
  { id: 'restrict', label: 'restreindre', skill: 'g9-intervals' },
];
const IV = [
  { text: '[0;2π]', lo: q(0), hi: q(2), html: '[0 ; 2π]' },
  { text: '[0;π]', lo: q(0), hi: q(1), html: '[0 ; π]' },
  { text: '[π/2;(3π)/2]', lo: q(1, 2), hi: q(3, 2), html: '[π/2 ; 3π/2]' },
];
const ACOS = { '1/2': q(1, 3), '√2/2': q(1, 4), '√3/2': q(1, 6), 0: q(1, 2), '-1/2': q(2, 3), '-√2/2': q(3, 4), '-√3/2': q(5, 6) };
const ASIN = { '1/2': q(1, 6), '√2/2': q(1, 4), '√3/2': q(1, 3), 0: q(0), '-1/2': q(-1, 6), '-√2/2': q(-1, 4), '-√3/2': q(-1, 3) };
const STRICT = { '<': true, '>': true, '≤': false, '≥': false };

// The arc of f(u) op s on one turn: [A ; B] (multiples of π), open if strict.
function arcOf(f, op, s) {
  const up = op === '>' || op === '≥';
  if (f === 'cos') {
    const a = ACOS[s];
    return up ? [a.neg(), a] : [a, q(2).sub(a)];
  }
  const a = ASIN[s];
  return up ? [a, q(1).sub(a)] : [q(1).sub(a), q(2).add(a)];
}

// Pieces of [A + 2kπ ; B + 2kπ] shifted and divided (x = (u − φ)/m) inside I.
function restrictArc(A, B, m, phi, I, strict) {
  const lo = A.sub(phi).div(m);
  const hi = B.sub(phi).div(m);
  const P = q(2).div(m);
  const pieces = [];
  let cut = false;
  const k0 = Math.floor(I.lo.sub(hi).div(P).valueOf()) - 1;
  const k1 = Math.ceil(I.hi.sub(lo).div(P).valueOf()) + 1;
  for (let k = k0; k <= k1; k++) {
    const a = lo.add(P.mul(k));
    const b = hi.add(P.mul(k));
    if (b.cmp(I.lo) < 0 || a.cmp(I.hi) > 0) continue;
    if ((b.cmp(I.lo) === 0 && strict) || (a.cmp(I.hi) === 0 && strict)) continue;
    const L = a.cmp(I.lo) < 0 ? I.lo : a;
    const H = b.cmp(I.hi) > 0 ? I.hi : b;
    if (a.cmp(I.lo) < 0 || b.cmp(I.hi) > 0) cut = true;
    pieces.push({ lo: L, hi: H, loC: L === I.lo && a.cmp(I.lo) < 0 ? true : !strict, hiC: H === I.hi && b.cmp(I.hi) > 0 ? true : !strict });
  }
  return { pieces, cut, lo, hi, P };
}
const pieceT = (p) => (p.lo.eq(p.hi) ? `{${piT(p.lo)}}` : `${p.loC ? '[' : ']'}${piT(p.lo)};${piT(p.hi)}${p.hiC ? ']' : '['}`);
const piecesT = (ps) => (ps.length ? ps.map(pieceT).join('∪') : '∅');
const chainT = (lhs, a, b, per, strict) => { const o = strict ? '<' : '≤'; return `${famLike(a, per)}${o}${lhs}${o}${famLike(b, per)}`; };
const famLike = (b, per) => { const p = Q.of(per); const pt = `${p.n === 1 ? '' : p.n}kπ${p.d > 1 ? `/${p.d}` : ''}`; return Q.of(b).n === 0 ? pt : `${piT(b)}+${pt}`; };

const S_VALS = ['1/2', '-1/2', '√2/2', '-√2/2', '√3/2', '-√3/2', '0'];

function ineqData(rng, level) {
  for (let i = 0; i < 300; i++) {
    const asb = level >= 3;
    const e = asb ? rng.pick(ABS) : null;
    const f = asb ? 'sin' : rng.pick(['cos', 'sin']);
    const m = level >= 4 ? q(rng.pick(level === 5 ? [2, 4] : [2, 2, 3])) : q(1);
    const phi = asb ? e.phi : level === 2 ? rng.pick([q(1, 3), q(-1, 3), q(1, 6), q(-1, 4), q(1, 4)]) : q(0);
    const op = rng.pick(['≥', '>', '≤', '<']);
    const s = rng.pick(S_VALS);
    const I = level === 1 ? IV[0] : rng.pick(IV);
    const [A, B] = arcOf(f, op, s);
    const r = restrictArc(A, B, m, phi, I, STRICT[op]);
    if (!r.pieces.length || (!r.cut && rng.chance(0.8))) continue;
    return { e, f, m, phi, op, s, I, A, B, r };
  }
  return null;
}

function ineqItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: level >= 5 ? 11 : 4 } : false;
  const d = ineqData(rng, level);
  const U = uT(d.m, d.phi);
  const X = d.m.eq(1) ? 'x' : `${d.m.n}x`;
  const strict = STRICT[d.op];
  const lines = [];
  let start;
  if (d.e) {
    const c = textOfRs(d.e, d.s);
    start = `${asbStart({ ...d.e, X })}${d.op}${c}`;
    lines.push({ math: `${d.e.R}sin(${U})${d.op}${c}`, note: `Forme R sin(x + φ), R = ${fr(d.e.R)}`, subgoal: 'form' });
    lines.push({ math: `sin(${U})${d.op}${d.s}`, note: 'Diviser par R', subgoal: 'form' });
  } else start = `${d.f}(${U})${d.op}${d.s}`;
  lines.push({ math: chainT(U, d.A, d.B, q(2), strict), note: 'Arc solution, + 2kπ', subgoal: 'arc' });
  if (d.phi.n !== 0) lines.push({ math: chainT(X, d.A.sub(d.phi), d.B.sub(d.phi), q(2), strict), note: d.phi.n > 0 ? `Retirer ${fr(piT(d.phi))}` : `Ajouter ${fr(piT(d.phi.neg()))}`, subgoal: 'isolate' });
  if (!d.m.eq(1)) lines.push({ math: chainT('x', d.r.lo, d.r.hi, d.r.P, strict), note: 'Diviser aussi la période', subgoal: 'isolate' });
  lines.push({ math: piecesT(d.r.pieces), note: `Garder ce qui tombe dans ${d.I.html}, k par k`, subgoal: 'restrict' });
  const script = lines.map((l) => ({ kind: 'eq', ...l }));
  return linesItem({
    skill: INEQ, level, prompt: `Résous ${MT(start)} dans ${d.I.html}.`,
    start, judge: PERIODIC({ domain: d.I.text }), mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: level >= 5 ? [] : [
      { level: 1, html: `${d.f === 'cos' && !d.e ? 'cos' : 'sin'} u ${d.op} ${fr(d.s)} : lis l'arc sur le cercle, puis ajoute 2kπ.` },
      { level: 2, html: MT(lines.find((l) => l.subgoal === 'arc').math, XK) },
      { level: 3, html: MT(lines[lines.length - 2].math, XK) },
    ],
    subgoals: INEQ_SUB, keys: KEYS, tapActions: level === 3 ? 'solset' : null, key: `${INEQ}:${start}:${d.I.text}`, exam,
  });
}

// R·s written out (the right side of a sin x + b cos x ⋚ c).
function textOfRs(e, s) {
  const x = e.Rf * Number(evalS(s));
  const C = ['0', '1', '-1', '2', '-2', '√2', '-√2', '√3', '-√3', '√6/2', '-√6/2', '√2/2', '-√2/2', '2√2', '-2√2', '2√3', '-2√3'];
  return C.find((t) => Math.abs(evalS(t) - x) < 1e-9) ?? '0';
}
function evalS(t) {
  const m = t.match(/^(-?)(\d*)(√(\d+))?(\/(\d+))?$/);
  if (!m) return NaN;
  const sign = m[1] ? -1 : 1;
  const c = m[2] ? Number(m[2]) : 1;
  const r = m[4] ? Math.sqrt(Number(m[4])) : 1;
  const den = m[6] ? Number(m[6]) : 1;
  return (sign * c * r) / den;
}

function ineqExam(rng, exam) {
  if (exam === 'open') return ineqItem(5, rng, { exam });
  const d = ineqData(rng, 2);
  const start = `${d.f}(${uT(d.m, d.phi)})${d.op}${d.s}`;
  const strict = STRICT[d.op];
  const right = piecesT(d.r.pieces);
  const flipOp = { '≥': '≤', '>': '<', '≤': '≥', '<': '>' }[d.op];
  const [A2, B2] = arcOf(d.f, flipOp, d.s);
  const comp = piecesT(restrictArc(A2, B2, d.m, d.phi, d.I, strict).pieces);
  const k0 = `${strict ? ']' : '['}${piT(d.r.lo)};${piT(d.r.hi)}${strict ? '[' : ']'}`;
  const options = [{ html: MT(right), correct: true }];
  const add = (t, rule) => { if (t && t !== '∅' && !options.some((o) => o.html === MT(t))) options.push({ html: MT(t), correct: false, rule }); };
  add(comp, 'g3_ineq_arc');
  add(k0, 'g3_ineq_window');
  add(d.r.pieces.length > 1 ? pieceT(d.r.pieces[0]) : piecesT(restrictArc(d.A, d.B, d.m, d.phi.neg(), d.I, strict).pieces), null);
  add(piecesT(d.r.pieces.map((p) => ({ ...p, loC: !p.loC, hiC: !p.hiC }))), null);
  return mcq({
    skill: INEQ, level: 4, prompt: `Les solutions de ${MT(start)} dans ${d.I.html} sont…`, options: options.slice(0, 4), key: `mcq:${start}:${d.I.text}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: MT(chainT(uT(d.m, d.phi), d.A, d.B, q(2), strict), XK), note: 'Arc solution' }, { html: MT(right), note: 'Restreindre' }],
  }, rng);
}

// ======================================================================
// g3-triangle
// ======================================================================

const TRI = 'g3-triangle';
const TRI_SUB = [
  { id: 'law', label: 'théorème du cosinus ou du sinus', skill: TRI },
  { id: 'exact', label: 'valeurs exactes', skill: EXACT },
  { id: 'angle', label: 'angle', skill: TRI },
];
// a, b, γ (degrees) with c whole: c² = a² + b² − 2ab cos γ.
const TRIPLES = [[5, 8, 60, 7], [3, 8, 60, 7], [8, 15, 60, 13], [7, 15, 60, 13], [5, 21, 60, 19], [3, 5, 120, 7], [7, 8, 120, 13], [5, 16, 120, 19], [6, 10, 120, 14], [9, 15, 120, 21], [3, 4, 90, 5], [6, 8, 90, 10], [5, 12, 90, 13]];
const COS = { 60: [1, 2], 90: [0, 1], 120: [-1, 2] };
const deg2 = (x) => Math.round(x * 100) / 100;
const degT = (x) => `${deg2(x).toFixed(2).replace(/\.00$/, '').replace('.', ',')}°`;
const acosDeg = (v) => (Math.acos(v) * 180) / Math.PI;
const asinDeg = (v) => (Math.asin(v) * 180) / Math.PI;
const gcd = (x, y) => (y ? gcd(y, x % y) : Math.abs(x));
const fracT = (n, d) => { const g = gcd(n, d); const N = n / g; const D = d / g; return D === 1 ? String(N) : `${N}/${D}`; };
const DEG = (extra = {}) => ({ kind: 'value', form: 'deg', tolDeg: 0.01, ...extra });

// Segments of « c, then α, then β » for a triangle with sides a, b and angle γ.
function cosLawParts(t, guided = true) {
  const [a, b, g, c] = t;
  const [cn] = COS[g];
  const prod = a * b * cn; // 2ab cos γ with cos γ = cn/2
  const parts = [];
  parts.push({ ask: 'c² =', html: 'Théorème du cosinus :', start: `${a}^2+${b}^2-2×${a}×${b}×cos(${g}°)`, judge: { kind: 'value' },
    lines: [{ math: `${a * a}+${b * b}${prod === 0 ? '' : prod > 0 ? `-${prod}` : `+${-prod}`}`, note: `cos ${g}° = ${g === 60 ? '1/2' : g === 90 ? '0' : '−1/2'}`, subgoal: 'exact' }, { math: String(c * c), note: 'Calculer', subgoal: 'law' }] });
  parts.push({ ask: 'c =', html: 'Racine :', start: `√(${c * c})`, judge: { kind: 'value', form: 'exact' }, lines: [{ math: String(c), note: 'c > 0', subgoal: 'law' }] });
  const num = b * b + c * c - a * a;
  const den = 2 * b * c;
  const cosA = fracT(num, den);
  const alpha = acosDeg(num / den);
  parts.push({ ask: 'cos α =', html: 'Théorème du cosinus pour α :', start: `(${b}^2+${c}^2-${a}^2)/(2×${b}×${c})`, judge: { kind: 'value' },
    lines: [...(cosA === `${num}/${den}` || !guided ? [] : [{ math: `${num}/${den}`, note: 'Calculer', subgoal: 'law' }]), { math: cosA, note: 'Simplifier', subgoal: 'law' }] });
  parts.push({ ask: 'α ≈', html: 'L\'angle α :', start: `arccos(${cosA})`, judge: DEG(), lines: [{ math: degT(alpha), note: 'arccos, à 0,01° près', subgoal: 'angle' }] });
  const beta = 180 - g - deg2(alpha);
  parts.push({ ask: 'β ≈', html: 'Somme des angles :', start: `180°-${g}°-${degT(alpha)}`, judge: DEG(), lines: [{ math: degT(beta), note: 'α + β + γ = 180°', subgoal: 'angle' }] });
  return parts;
}

// The ambiguous case: α = 30°, sides a (opposite) and c, a < c.
function ssaParts(rng) {
  for (;;) {
    const c = rng.int(6, 14);
    const a = rng.int(Math.floor(c / 2) + 1, c - 1);
    if (2 * a === c) continue;
    const s = c / (2 * a);
    const g1 = asinDeg(s);
    if (g1 > 85) continue;
    const g1r = deg2(g1);
    return {
      a, c,
      parts: [
        { ask: 'sin γ =', html: 'Théorème du sinus : sin γ = c·sin α / a', start: `${c}×sin(30°)/${a}`, judge: { kind: 'value' }, lines: [{ math: fracT(c, 2 * a), note: 'sin 30° = 1/2', subgoal: 'law' }] },
        { ask: 'γ₁ ≈', html: 'Première valeur :', start: `arcsin(${fracT(c, 2 * a)})`, judge: DEG(), lines: [{ math: degT(g1), note: 'arcsin', subgoal: 'angle' }] },
        { ask: 'γ₂ ≈', html: 'Seconde valeur, de même sinus :', start: `180°-${degT(g1)}`, judge: DEG(), lines: [{ math: degT(180 - g1r), note: '180° − γ₁ : 30° + γ₂ < 180°, un second triangle', subgoal: 'angle' }] },
      ],
    };
  }
}

// MAN 2017: α = 60° from three sides, then D on [AB] with CD = b√6/2.
const SIXTY = [[5, 8, 7], [3, 8, 7], [8, 15, 13], [7, 15, 13], [5, 21, 19]];

function triScript(parts, level, menus) {
  const [first, ...rest] = parts;
  const script = [...first.lines.map((l) => ({ kind: 'eq', ...l }))];
  for (const p of rest) {
    if (p.decision) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: { ...p.judge, ...(menus ? { menu: menus(p) } : {}) } }, p.decision, ...p.lines.map((l) => ({ kind: 'eq', ...l })));
    else script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: { ...p.judge, ...(menus ? { menu: menus(p) } : {}) } }, ...p.lines.map((l) => ({ kind: 'eq', ...l })));
  }
  return { start: first.start, judge: { ...first.judge, ...(menus ? { menu: menus(first) } : {}) }, script };
}

const TRI_MENU = (p) => {
  const want = p.ask.startsWith('c²') || p.ask.startsWith('cos') ? 'cos' : p.ask.startsWith('sin') ? 'sin' : p.ask.startsWith('c =') ? 'root' : p.start.startsWith('180') ? 'sum' : 'arc';
  return [
    { id: 'cos', label: 'Théorème du cosinus', valid: want === 'cos' },
    { id: 'sin', label: 'Théorème du sinus', valid: want === 'sin' },
    { id: 'root', label: 'Prendre la racine (c > 0)', valid: want === 'root' },
    { id: 'arc', label: 'arccos ou arcsin (calculatrice)', valid: want === 'arc' },
    { id: 'sum', label: 'Somme des angles : 180°', valid: want === 'sum' },
  ].map((o) => ({ ...o, why: 'Ce n\'est pas ce que demande cette étape.' }));
};

function triItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 8 } : false;
  if (level === 5) return triMan(rng, exam);
  const ssa = level === 4 && rng.chance(0.4);
  let parts;
  let prompt;
  let key;
  if (ssa) {
    const d = ssaParts(rng);
    parts = d.parts;
    parts[2].decision = { kind: 'decision', prompt: 'Combien de valeurs pour γ ?', options: [
      { id: 'two', label: 'Deux : γ₁ et 180° − γ₁, si 30° + γ₂ < 180°', valid: true },
      { id: 'one', label: 'Une seule : γ = arcsin(…)', valid: false, rule: 'g3_ssa_lost', why: '180° − γ₁ a le même sinus, et 30° + (180° − γ₁) < 180° : il y a deux triangles.' },
    ] };
    prompt = `Triangle ABC avec a = ${d.a}, c = ${d.c} et α = 30°. Calcule les valeurs possibles de γ (à 0,01° près).`;
    key = `${TRI}:ssa:${d.a}:${d.c}`;
  } else {
    const t = rng.pick(level === 2 ? TRIPLES.filter((x) => x[2] !== 90) : TRIPLES);
    parts = cosLawParts(t, level <= 2);
    prompt = `Triangle ABC avec a = ${t[0]}, b = ${t[1]} et γ = ${t[2]}°. Calcule c, puis α et β (angles à 0,01° près).`;
    key = `${TRI}:${t.join(':')}`;
  }
  const { start, judge, script } = triScript(parts, level, level === 3 ? TRI_MENU : null);
  const pre = [];
  if (level === 2) {
    pre.push({ kind: 'decision', prompt: 'Deux côtés et l\'angle compris : quel théorème ?', options: [
      { id: 'cos', label: 'Le théorème du cosinus', valid: true },
      { id: 'sin', label: 'Le théorème du sinus', valid: false, why: 'Le sinus demande un angle et le côté opposé : on ne connaît pas c.' },
      { id: 'pyth', label: 'Pythagore', valid: false, why: 'Le triangle n\'est pas forcément rectangle.' },
    ] });
  }
  if (level === 1) pre.push({ kind: 'note', html: 'Théorème du cosinus : c² = a² + b² − 2ab cos γ.' });
  const first = parts[0];
  return linesItem({
    skill: TRI, level, prompt, start, judge, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free',
    script: [...pre, ...script.map((l, i) => (level === 1 && i === 0 && l.kind === 'eq' && !ssa ? { ...l, ...tpl(l.math, (n) => [n.r]) } : l))],
    hints: [
      { level: 1, html: ssa ? 'Un angle et le côté opposé : théorème du sinus. Puis 180° − γ a le même sinus.' : 'Deux côtés et l\'angle entre eux : théorème du cosinus.' },
      { level: 2, html: MT(first.start) },
      { level: 3, html: MT(first.lines[0].math) },
    ],
    subgoals: TRI_SUB, keys: KEYS, tapActions: level === 3 ? 'menu' : null, key, exam,
  });
}

function triMan(rng, exam) {
  const [b, c, a] = rng.pick(SIXTY);
  const cd = b % 2 ? `${b}√6/2` : `${b / 2}√6`;
  const parts = [
    { ask: 'cos α =', html: '', start: `(${b}^2+${c}^2-${a}^2)/(2×${b}×${c})`, judge: { kind: 'value' }, lines: [{ math: '1/2', note: 'Théorème du cosinus, puis simplifier', subgoal: 'law' }] },
    { ask: 'α =', html: 'L\'angle α :', start: 'arccos(1/2)', judge: DEG(), lines: [{ math: '60°', note: 'Valeur exacte', subgoal: 'exact' }] },
    { ask: 'sin δ =', html: `Dans le triangle ADC (CD = ${cd}), théorème du sinus :`, start: `${b}×sin(60°)/((${b}√6)/2)`, judge: { kind: 'value', form: 'exact' }, lines: [{ math: '√2/2', note: 'sin δ = AC·sin α / CD', subgoal: 'exact' }] },
    { ask: 'δ =', html: 'L\'angle δ :', start: 'arcsin(√2/2)', judge: DEG(), lines: [{ math: '45°', note: '135° + 60° > 180° : δ = 45°', subgoal: 'angle' }],
      decision: { kind: 'decision', prompt: 'sin δ = √2/2 : δ = 45° ou δ = 135° ?', options: [
        { id: '45', label: 'δ = 45° : 135° + 60° dépasse 180°', valid: true },
        { id: '135', label: 'δ = 135°', valid: false, why: 'Dans ADC, α = 60° : 135° + 60° > 180°, impossible.' },
      ] } },
  ];
  const { start, judge, script } = triScript(parts, 5, null);
  return linesItem({
    skill: TRI, level: 5, prompt: `Triangle ABC avec a = ${a}, b = ${b}, c = ${c}. (a) Calcule α. (b) D est sur le segment AB et CD = ${cd}. Calcule δ = ∠ADC.`,
    start, judge, mode: 'free', script, hints: [], subgoals: TRI_SUB, keys: KEYS, key: `${TRI}:man:${a}:${b}:${c}`, exam,
  });
}

function triExam(rng, exam) {
  if (exam === 'open') return triItem(5, rng, { exam });
  const t = rng.pick(TRIPLES.filter((x) => x[2] !== 90));
  const [a, b, g, c] = t;
  const [cn] = COS[g];
  const surd = (N) => { let k = 1; let m = N; for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; } return m === 1 ? String(k) : `${k === 1 ? '' : k}√${m}`; };
  const options = [
    { html: String(c), correct: true },
    { html: MT(surd(a * a + b * b + a * b * cn)), correct: false, rule: 'g3_cos_law_sign' },
    { html: MT(surd(a * a + b * b)), correct: false },
    { html: String(a + b), correct: false },
  ].filter((o, i, arr) => arr.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: TRI, level: 4, prompt: `Triangle avec a = ${a}, b = ${b} et γ = ${g}°. Alors c =`, options, key: `mcq:${t.join(':')}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `c² = ${a}² + ${b}² − 2·${a}·${b}·cos ${g}° = ${c * c}`, note: 'Théorème du cosinus' }],
  }, rng);
}

// ======================================================================
// g3-arc-def
// ======================================================================

const ARC = 'g3-arc-def';
const ARC_SUB = [
  { id: 'reduce', label: 'réduire', skill: RED },
  { id: 'image', label: 'angle dans l\'image', skill: ARC },
];
const ARC_OF = { cos: 'arccos', sin: 'arcsin', tan: 'arctan' };
const IMAGE = { arccos: '[0 ; π]', arcsin: '[−π/2 ; π/2]', arctan: ']−π/2 ; π/2[' };

// arcF(F(θ)): the lines that bring θ into the image.
function arcLines(F, th) {
  const A = ARC_OF[F];
  const lines = [];
  const wrap = (r) => `${A}(${F}(${piT(r)}))`;
  let r;
  if (F === 'tan') {
    r = modQ(th.add(q(1, 2)), q(1)).sub(q(1, 2));
    if (!r.eq(th)) lines.push({ math: wrap(r), note: 'Retirer des multiples de π', subgoal: 'reduce' });
    lines.push({ math: piT(r), note: `${fr(piT(r))} ∈ ${IMAGE[A]}`, subgoal: 'image' });
    return { lines, value: r };
  }
  r = modQ(th.add(q(1)), q(2)).sub(q(1));
  if (r.eq(q(-1))) r = q(1);
  if (!r.eq(th)) lines.push({ math: wrap(r), note: 'Retirer des tours de 2π', subgoal: 'reduce' });
  let v = r;
  if (F === 'cos' && r.n < 0) { v = r.neg(); lines.push({ math: wrap(v), note: 'cos est paire', subgoal: 'image' }); }
  if (F === 'sin' && r.valueOf() > 0.5) { v = q(1).sub(r); lines.push({ math: wrap(v), note: 'sin(π − θ) = sin θ', subgoal: 'image' }); }
  if (F === 'sin' && r.valueOf() < -0.5) { v = q(-1).sub(r); lines.push({ math: wrap(v), note: 'sin(−π − θ) = sin θ', subgoal: 'image' }); }
  lines.push({ math: piT(v), note: `${fr(piT(v))} ∈ ${IMAGE[A]}`, subgoal: 'image' });
  return { lines, value: v };
}

function arcTheta(rng, F, maxTurns, mustMove) {
  for (;;) {
    const d = rng.pick([3, 4, 6]);
    const th = q(rng.int(-maxTurns * d, maxTurns * d), d);
    if (F === 'tan' && th.mul(2).d === 1 && th.mul(2).n % 2 !== 0) continue;
    if (th.n === 0 || th.d === 1) continue;
    const { value } = arcLines(F, th);
    if (mustMove && value.eq(th)) continue;
    return th;
  }
}

const ARC_VALS = { arcsin: ['1/2', '-1/2', '√2/2', '-√2/2', '√3/2', '-√3/2', '1', '-1'], arccos: ['1/2', '-1/2', '√2/2', '-√2/2', '√3/2', '-√3/2', '0', '-1'], arctan: ['1', '-1', '√3', '-√3', '√3/3', '-√3/3'] };
const ARC_ANGLE = (A, v) => {
  const x = A === 'arcsin' ? Math.asin(evalS(v)) : A === 'arccos' ? Math.acos(evalS(v)) : Math.atan(evalS(v));
  const k = x / Math.PI;
  for (let d = 1; d <= 12; d++) if (Math.abs(Math.round(k * d) - k * d) < 1e-9) return q(Math.round(k * d), d);
  return q(0);
};

function arcItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 2 } : false;
  if (level === 5) return arcTf(rng, 5, true);
  if (level === 1) {
    const A = rng.pick(['arcsin', 'arccos', 'arctan']);
    const v = rng.pick(ARC_VALS[A]);
    const ang = ARC_ANGLE(A, v);
    const start = `${A}(${v})`;
    return linesItem({
      skill: ARC, level, prompt: `Calcule ${MT(start)}.`, start, judge: { kind: 'value', form: 'exact' }, mode: 'guided',
      script: [{ kind: 'note', html: `${A} prend ses valeurs dans ${IMAGE[A]}.` }, { kind: 'eq', ...tpl(piT(ang), (n) => [n]), note: `L'angle de ${IMAGE[A]} dont le ${A.slice(3)} vaut ${fr(v)}`, subgoal: 'image' }],
      hints: [
        { level: 1, html: `Cherche l'angle de ${IMAGE[A]} dont le ${A === 'arctan' ? 'tan' : A.slice(3)} vaut ${fr(v)}.` },
        { level: 2, html: `${A === 'arctan' ? 'tan' : A.slice(3)}(${fr(piT(ang))}) = ${fr(v)}` },
        { level: 3, html: MT(piT(ang)) },
      ],
      subgoals: ARC_SUB, keys: KEYS, key: `${ARC}:${start}`,
    });
  }
  const F = level === 2 ? 'cos' : rng.pick(['cos', 'sin', 'tan', 'cos']);
  const th = arcTheta(rng, F, level === 2 ? 1 : 4, true);
  const start = `${ARC_OF[F]}(${F}(${piT(th)}))`;
  const { lines, value } = arcLines(F, th);
  const script = [];
  if (level === 2) script.push({ kind: 'note', html: `arccos prend ses valeurs dans [0 ; π] : arccos(cos θ) = θ seulement si θ ∈ [0 ; π].` });
  script.push(...lines.map((l) => ({ kind: 'eq', ...l })));
  return linesItem({
    skill: ARC, level, prompt: `Calcule ${MT(start)}.`, start, judge: { kind: 'value', form: 'exact' },
    mode: level === 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: `Le résultat doit être dans ${IMAGE[ARC_OF[F]]}.` },
      { level: 2, html: MT(lines[0].math) },
      { level: 3, html: MT(piT(value)) },
    ],
    subgoals: ARC_SUB, keys: KEYS, tapActions: level === 3 ? 'trig' : null, key: `${ARC}:${start}`, exam,
  });
}

// True or false (catalogue: examen blanc MAN 2018, Q6).
function arcTf(rng, level, noHints) {
  const bank = [
    { s: 'Pour tout x réel, arccos(cos x) = x.', truth: false, quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'arccos(cos(x))=x', ans: { x: '-1' }, expl: 'Faux : arccos(cos(−1)) = 1, car arccos donne un angle de [0 ; π].' },
    { s: 'Pour tout x ∈ [−π/2 ; π/2], arcsin(sin x) = x.', truth: true, expl: 'Vrai : arcsin est la réciproque de sin restreint à [−π/2 ; π/2].' },
    { s: 'Pour tous α, β ∈ ]−π/2 ; π/2[, tan α &gt; tan β ⇔ α &gt; β.', truth: true, expl: 'Vrai : tan est strictement croissante sur ]−π/2 ; π/2[.' },
    { s: 'cot est décroissante sur ]−π/2 ; 0[ ∪ ]0 ; π/2[ : si a &lt; b, alors cot a &gt; cot b.', truth: false, quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }],
      pred: '(a<b∧a≠0∧b≠0∧-π/2<a<π/2∧-π/2<b<π/2)⇒cot(a)>cot(b)', hyp: 'a<b∧a≠0∧b≠0∧-π/2<a<π/2∧-π/2<b<π/2', ans: { a: '-π/4', b: 'π/4' }, expl: 'Faux : cot(−π/4) = −1 < cot(π/4) = 1. Elle décroît sur chaque morceau, pas sur la réunion.' },
    { s: 'Pour tout x réel, arctan(tan x) = x dès que tan x existe.', truth: false, quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'cos(x)=0 ∨ arctan(tan(x))=x', ans: { x: 'π' }, expl: 'Faux : arctan(tan π) = arctan 0 = 0 ≠ π.' },
  ];
  const b = rng.pick(bank);
  return tfItem({
    skill: ARC, level, statement: b.s, truth: b.truth, key: b.s, explanation: b.expl, noHints,
    counter: b.truth ? null : { kind: 'refute', quants: b.quants, pred: b.pred, hyp: b.hyp, ask: b.quants.map((x) => ({ v: x.v, label: `${x.v} =` })), answer: b.ans },
    ruleIfTrue: b.truth ? null : 'g3_arc_cancel', exam: noHints && level === 4 ? { format: 'tf', points: 1 } : false,
    hints: [
      { level: 1, html: 'Regarde l\'image de la fonction arc, ou les intervalles où la fonction est monotone.' },
      { level: 2, html: 'Essaie une valeur hors de l\'image : x = −1, x = π…' },
      { level: 3, html: b.expl },
    ],
  });
}

function arcExam(rng, exam) {
  if (exam === 'tf') return arcTf(rng, 4, true);
  const F = rng.pick(['cos', 'sin']);
  const th = arcTheta(rng, F, 4, true);
  const { value } = arcLines(F, th);
  const r = modQ(th.add(q(1)), q(2)).sub(q(1));
  const options = [{ html: MT(piT(value)), correct: true }];
  const add = (v, rule) => { const h = MT(piT(v)); if (!options.some((o) => o.html === h)) options.push({ html: h, correct: false, rule }); };
  add(th, 'g3_arc_cancel');
  add(r, null);
  add(value.neg(), null);
  add(q(1).sub(value), null);
  return mcq({
    skill: ARC, level: 4, prompt: `${MT(`${ARC_OF[F]}(${F}(${piT(th)}))`)} = ?`, options: options.slice(0, 4), key: `mcq:${F}:${th.n}/${th.d}`,
    exam: { format: 'mcq', points: 1 }, solution: arcLines(F, th).lines.map((l) => ({ html: MT(l.math), note: l.note })),
  }, rng);
}

// ======================================================================
// g3-arc-comp
// ======================================================================

const COMP = 'g3-arc-comp';
const COMP_SUB = [
  { id: 'theta', label: 'poser θ, son intervalle', skill: ARC },
  { id: 'formula', label: 'formule', skill: IDS },
];
const TRIPS = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17]];

// θ = g(a): sin θ, cos θ, tan θ as fractions.
function compData(rng) {
  const [p, qq, r] = rng.pick(TRIPS);
  const g = rng.pick(['arcsin', 'arccos', 'arctan']);
  const sign = rng.pick([1, -1]);
  let a;
  let sin;
  let cos;
  if (g === 'arcsin') { a = q(sign * p, r); sin = a; cos = q(qq, r); }
  else if (g === 'arccos') { a = q(sign * p, r); cos = a; sin = q(qq, r); }
  else { a = q(sign * p, qq); sin = q(sign * p, r); cos = q(qq, r); }
  return { g, a, sin, cos, tan: sin.div(cos), p, qq, r, sign };
}
const OWN = { arcsin: 'sin', arccos: 'cos', arctan: 'tan' };
const IV_OF = { arcsin: '[−π/2 ; π/2]', arccos: '[0 ; π]', arctan: ']−π/2 ; π/2[' };

function compItem(level, rng, opts = {}) {
  const exam = opts.exam ? { format: opts.exam, points: 2 } : false;
  if (level === 5) return compExpr(rng, exam);
  const d = compData(rng);
  const A = lit0(d.a);
  const dbl = level >= 3 && rng.chance(0.5);
  const fs = ['sin', 'cos', 'tan'].filter((f) => f !== OWN[d.g]);
  const f = dbl ? rng.pick(['sin', 'cos']) : rng.pick(fs);
  const arg = dbl ? `2${d.g}(${A})` : `${d.g}(${A})`;
  const start = `${f}(${arg})`;
  const parts = [];
  // The missing value of θ, with its sign from the interval of θ.
  const missing = d.g === 'arcsin' ? 'cos' : d.g === 'arccos' ? 'sin' : 'cos';
  const mv = missing === 'cos' ? d.cos : d.sin;
  const known = d.g === 'arctan' ? null : lit0(d.a);
  const rootLine = d.g === 'arctan' ? `1/√(1+(${A})^2)` : `√(1-(${A})^2)`;
  parts.push({ ask: `${missing} θ =`, start: `${missing}(${d.g}(${A}))`, lines: [{ math: rootLine, note: `${missing} θ ≥ 0 sur ${IV_OF[d.g]}`, subgoal: 'theta' }, { math: lit0(mv), note: 'Calculer', subgoal: 'theta' }] });
  let value;
  let lines;
  const S = lit0(d.sin);
  const C = lit0(d.cos);
  if (dbl) {
    value = f === 'sin' ? d.sin.mul(d.cos).mul(2) : d.cos.mul(d.cos).sub(d.sin.mul(d.sin));
    lines = [{ math: f === 'sin' ? `2×(${S})×(${C})` : `(${C})^2-(${S})^2`, note: f === 'sin' ? 'sin 2θ = 2 sin θ cos θ' : 'cos 2θ = cos²θ − sin²θ', subgoal: 'formula' }, { math: lit0(value), note: 'Calculer', subgoal: 'formula' }];
  } else {
    value = f === 'sin' ? d.sin : f === 'cos' ? d.cos : d.tan;
    lines = f === 'tan' ? [{ math: `(${S})/(${C})`, note: 'tan θ = sin θ / cos θ', subgoal: 'formula' }, { math: lit0(value), note: 'Calculer', subgoal: 'formula' }]
      : [{ math: lit0(value), note: 'Lire', subgoal: 'formula' }];
  }
  if (!(f === missing && !dbl)) parts.push({ ask: `${f}(${dbl ? '2θ' : 'θ'}) =`, start, lines });
  void known;
  const script = [];
  script.push({ kind: 'note', html: `θ = ${MT(`${d.g}(${A})`)} : ${OWN[d.g]} θ = ${fr(A)}, θ ∈ ${IV_OF[d.g]}.` });
  if (level === 2) {
    script.push({ kind: 'decision', prompt: `${missing} θ = ±√(…) : quel signe ?`, options: [
      { id: 'plus', label: `+ : ${missing} θ ≥ 0 sur ${IV_OF[d.g]}`, valid: true },
      { id: 'minus', label: `Le signe de ${fr(A)}`, valid: false, rule: 'g3_arc_root_sign', why: `Le signe vient de l'intervalle de θ : ${missing} est positif sur ${IV_OF[d.g]}.` },
    ] });
  }
  if (level === 3 && dbl) {
    script.push({ kind: 'decision', prompt: `Quelle formule pour ${f}(2θ) ?`, options: [
      { id: 'right', label: f === 'sin' ? 'sin 2θ = 2 sin θ cos θ' : 'cos 2θ = cos²θ − sin²θ', valid: true },
      { id: 'lin', label: `${f}(2θ) = 2 ${f} θ`, valid: false, rule: 'g3_linear', why: `${f} n'est pas linéaire.` },
    ] });
  }
  const [first, ...rest] = parts;
  script.push(...first.lines.map((l) => ({ kind: 'eq', ...l })));
  const menu = (p) => [
    { id: 'root', label: 'Racine de 1 − (…)², avec le signe de l\'intervalle', valid: p === first },
    { id: 'formula', label: 'Appliquer une formule (quotient, angle double)', valid: p !== first },
    { id: 'cancel', label: `Simplifier ${OWN[d.g]}(${d.g}(a)) = a partout`, valid: false, why: 'Ce n\'est vrai que pour la fonction de l\'arc.' },
  ];
  for (const p of rest) script.push({ kind: 'segment', html: 'Puis :', ask: p.ask, start: { math: p.start }, judge: { kind: 'value', form: 'exact', ...(level === 3 ? { menu: menu(p) } : {}) } }, ...p.lines.map((l) => ({ kind: 'eq', ...l })));
  return linesItem({
    skill: COMP, level, prompt: `Calcule ${MT(start)}.`, start: first.start, judge: { kind: 'value', form: 'exact', ...(level === 3 ? { menu: menu(first) } : {}) },
    mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', script,
    hints: [
      { level: 1, html: `Sur ${IV_OF[d.g]}, ${missing} θ est positif.` },
      { level: 2, html: MT(rootLine) },
      { level: 3, html: MT(lit0(mv)) },
    ],
    subgoals: COMP_SUB, keys: KEYS, tapActions: level === 3 ? 'menu' : null, key: `${COMP}:${start}`, exam,
  });
}

// Level 5: an expression in x (CMS série 9).
function compExpr(rng, exam) {
  const bank = [
    { start: 'cos(2arctan(x))', goal: '(1-x^2)/(1+x^2)', lines: ['cos(arctan(x))^2-sin(arctan(x))^2', '1/(1+x^2)-x^2/(1+x^2)', '(1-x^2)/(1+x^2)'], notes: ['cos 2θ = cos²θ − sin²θ', 'cos θ = 1/√(1 + x²), sin θ = x/√(1 + x²)', 'Même dénominateur'] },
    { start: 'sin(2arctan(x))', goal: '2x/(1+x^2)', lines: ['2sin(arctan(x))cos(arctan(x))', '2×x/√(1+x^2)×1/√(1+x^2)', '2x/(1+x^2)'], notes: ['sin 2θ = 2 sin θ cos θ', 'cos θ = 1/√(1 + x²) > 0', 'Simplifier'] },
    { start: 'cos(2arcsin(x))', goal: '1-2x^2', lines: ['1-2sin(arcsin(x))^2', '1-2x^2'], notes: ['cos 2θ = 1 − 2sin²θ', 'sin(arcsin x) = x'] },
    { start: 'tan(arcsin(x))', goal: 'x/√(1-x^2)', lines: ['sin(arcsin(x))/cos(arcsin(x))', 'x/√(1-x^2)'], notes: ['tan = sin/cos', 'cos θ = √(1 − x²) ≥ 0'] },
  ];
  const b = rng.pick(bank);
  return linesItem({
    skill: COMP, level: 5, prompt: `Écris ${MT(b.start)} sans fonction trigonométrique ni fonction arc (x ∈ ]−1 ; 1[).`,
    start: b.start, judge: { kind: 'equiv', vars: ['x'], target: 'goal', goal: b.goal, domain: { x: [-0.9, 0.9] } }, mode: 'free',
    script: b.lines.map((math, i) => ({ kind: 'eq', math, note: b.notes[i], subgoal: i === 0 ? 'formula' : 'theta' })),
    hints: [], subgoals: COMP_SUB, keys: KEYS, key: `${COMP}:expr:${b.start}`, exam,
  });
}

function compExam(rng, exam) {
  if (exam === 'open') return compItem(4, rng, { exam });
  let d;
  do { d = compData(rng); } while (d.g === 'arctan' || d.sign > 0);
  const A = lit0(d.a);
  const f = d.g === 'arcsin' ? 'tan' : 'tan';
  const v = d.tan;
  const options = [
    { html: MT(lit0(v)), correct: true },
    { html: MT(lit0(v.neg())), correct: false, rule: 'g3_arc_root_sign' },
    { html: MT(lit0(Q.of(1).div(v))), correct: false },
    { html: MT(lit0(d.g === 'arcsin' ? d.cos : d.sin)), correct: false },
  ].filter((o, i, arr) => arr.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: COMP, level: 4, prompt: `${MT(`${f}(${d.g}(${A}))`)} = ?`, options, key: `mcq:${d.g}:${A}`,
    exam: { format: 'mcq', points: 1 }, solution: [{ html: `sin θ = ${fr(lit0(d.sin))}, cos θ = ${fr(lit0(d.cos))}`, note: 'Le signe vient de l\'intervalle de θ' }],
  }, rng);
}

export const GEN = {
  [INEQ]: (level, rng, profile, opts = {}) => (opts.exam ? ineqExam(rng, opts.exam) : ineqItem(level, rng, opts)),
  [TRI]: (level, rng, profile, opts = {}) => (opts.exam ? triExam(rng, opts.exam) : triItem(level, rng, opts)),
  [ARC]: (level, rng, profile, opts = {}) => (opts.exam ? arcExam(rng, opts.exam) : arcItem(level, rng, opts)),
  [COMP]: (level, rng, profile, opts = {}) => (opts.exam ? compExam(rng, opts.exam) : compItem(level, rng, opts)),
};
void trigVal;
