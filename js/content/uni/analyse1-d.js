// Generators of module A1, part d (unit `analyse1`, step U2): methods of
// integration. Catalogue: docs/universite/A1-analyse-1.md, « Intégrales ».
// Skills: js/content/uni/analyse1-d.skills.js.
//
// Every item starts from the answer: a primitive F (or a value) chosen
// first, the integrand built from it. Primitives are judged by `antideriv`
// (by differentiation; a substitution puts {subst: {t: φ(x)}} in the cfg,
// so lines in t are checked too), values by `definite`. Each integral
// starts with a decision line (catalogue convention 4, built by intItem in
// analyse1-d-kit.js). The judges' cfg also carries what the traps of
// js/cas/rules/a1d.js read: `prims` (the primitive of the integrand) and
// `change` (t = φ(x) and x = ψ(t)).
// This file: a1-int-direct, a1-int-subst, a1-int-parts. The others are in
// analyse1-d-more.js.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { MT, mcq } from './kit.js';
import { q, N, H, uniq, cm, joinSum, Val, E, intItem, examTf } from './analyse1-d-kit.js';
import { GEN as MORE } from './analyse1-d-more.js';

const V = 'x';
const LOCAL = {};
const GEN_ADD = (id, g) => { LOCAL[id] = g; };
const key = (t) => toText(parse(t, { vars: [V, 't'] }));
const isCall = (u) => /^[a-z]+\([^()]*(\([^()]*\))?[^()]*\)$/.test(u);
// u^e as text: sin(x)^2, (x^2+1)^2, √(u) for e = 1/2.
function pw(u, e) {
  const E_ = Q.of(e);
  if (E_.eq(1)) return u;
  if (E_.eq(q(1, 2))) return `√(${u})`;
  const base = isCall(u) ? u : `(${u})`;
  return `${base}^${E_.d === 1 && E_.n > 0 ? E_.n : `(${N(E_)})`}`;
}
const mul2 = (a, b) => (!a ? b : !b ? a : `${a}×${b}`);
const wrap = (t) => (/[+-]/.test(t.replace(/^-/, '')) && !isCall(t) ? `(${t})` : t);
const tf = (s) => s.replace(/\^\(([^)]*)\)/g, '<sup>$1</sup>');

// ======================================================================
// a1-int-direct
// ======================================================================

const DI = 'a1-int-direct';
const DI_SUB = [
  { id: 'recognize', label: 'reconnaître u′', skill: 'a1-deriv-rules' },
  { id: 'prim', label: 'primitive', skill: 'g6-antideriv-usual' },
  { id: 'eval', label: 'évaluer aux bornes', skill: DI },
];
const DI_CHOICES = [
  { id: 'adjust', label: 'Faire apparaître u′ : ajuster la constante' },
  { id: 'prim', label: 'Écrire la primitive G(u)' },
  { id: 'eval', label: 'Évaluer aux bornes' },
  { id: 'log', label: 'Prendre le Log du dénominateur', rule: 'a1_int_log_of_denominator', why: 'Log|Q| a pour dérivée Q′/Q : le numérateur n\'est pas Q′.' },
];

// u: text, w: u′/k (what the integrand shows), k, u² (written), label,
// domain where everything is defined, bounds where u is simple.
const U = {
  x2: { u: 'x^2', w: 'x', k: 2, u2: 'x^4', label: 'x²', du: '2x', dut: '2x', dom: [-3, 3] },
  x3: { u: 'x^3', w: 'x^2', k: 3, u2: 'x^6', label: 'x³', du: '3x²', dut: '3x^2', dom: [-2, 2] },
  sin2: { u: 'sin(2x)', w: 'cos(2x)', k: 2, u2: 'sin(2x)^2', label: 'sin 2x', du: '2cos 2x', dut: '2cos(2x)', dom: [0.1, 1.4], abs: true },
  cos: { u: 'cos(x)', w: 'sin(x)', k: -1, u2: 'cos(x)^2', label: 'cos x', du: '−sin x', dut: '-sin(x)', dom: [-1.4, 1.4], abs: true },
  e2: { u: 'e^(2x)', w: 'e^(2x)', k: 2, u2: 'e^(4x)', label: 'e²ˣ', du: '2e²ˣ', dut: '2e^(2x)', dom: [-2, 1] },
  ln: { u: 'ln(x)', w: '1/x', k: 1, u2: 'ln(x)^2', label: 'Log x', du: '1/x', dut: '1/x', dom: [1.2, 5], abs: true },
  x2a: (a) => ({ u: `x^2+${a}`, w: 'x', k: 2, label: `x² + ${a}`, du: '2x', dut: '2x', dom: [-3, 3], a }),
  exa: (a) => ({ u: `e^x+${a}`, w: 'e^x', k: 1, label: `eˣ + ${a}`, du: 'eˣ', dut: 'e^x', dom: [-3, 2], a }),
};
// Bounds [a, b] (text) and the values of u there; `pos` when u > 0 on them.
const BOUNDS = {
  x2: [{ a: '0', b: '1', ua: q(0), ub: q(1) }],
  x3: [{ a: '0', b: '1', ua: q(0), ub: q(1) }],
  sin2: [{ a: '0', b: 'π/4', ua: q(0), ub: q(1) }, { a: 'π/12', b: 'π/4', ua: q(1, 2), ub: q(1), pos: true }],
  cos: [{ a: '0', b: 'π/3', ua: q(1), ub: q(1, 2), pos: true }],
  e2: [{ a: '0', b: 'ln(2)/2', ua: q(1), ub: q(2), pos: true }],
  ln: [{ a: '1', b: 'e', ua: q(0), ub: q(1) }, { a: 'e', b: 'e^2', ua: q(1), ub: q(2), pos: true }],
};
const FORM = { log: 'u′/u', pow: 'u′·uʳ', atan: 'u′/(1 + u²)', exp: 'u′·eᵘ', asin: 'u′/√(1 − u²)' };
const G_NAME = { log: 'Log', atan: 'Arctg', exp: 'exp', asin: 'Arcsin' };

// The combinations (G, u) with a domain where the integrand is defined.
const COMBOS = [
  ['log', 'x2a'], ['log', 'sin2'], ['log', 'cos'], ['log', 'ln'], ['log', 'exa'],
  ['pow', 'x2a'], ['pow', 'sin2'], ['pow', 'cos'], ['pow', 'ln'], ['pow', 'exa'],
  ['atan', 'x2'], ['atan', 'x3'], ['atan', 'e2'], ['atan', 'sin2'], ['atan', 'ln'],
  ['exp', 'x2'], ['exp', 'x3'], ['exp', 'sin2'], ['exp', 'cos'],
  ['asin', 'x2'], ['asin', 'ln'],
];
const POWS = [q(-2), q(-1, 2), q(1, 2), q(3, 2), q(2)];

function uOf(name, rng) {
  const u = U[name];
  return typeof u === 'function' ? u(rng.int(1, 4)) : u;
}

// The integrand k·w·g(u) (coefficient m), as text.
function integrand(G, u, m, r) {
  const num = [];
  const den = [];
  if (u.w === '1/x') den.push('x'); else num.push(u.w);
  if (G === 'log') den.push(wrap(u.u));
  if (G === 'pow') (r.n > 0 ? num : den).push(pw(u.u, r.n > 0 ? r : r.neg()));
  if (G === 'atan') den.push(`(1+${u.u2})`);
  if (G === 'exp') num.push(`e^(${u.u})`);
  if (G === 'asin') den.push(`√(1-${u.u2})`);
  let n = num.reduce(mul2, '');
  const m_ = Q.of(m);
  if (!n) n = N(m_.n < 0 ? m_.neg() : m_);
  else if (!m_.eq(1) && !m_.eq(-1)) n = cm(m_.n < 0 ? m_.neg() : m_, n);
  if (m_.n < 0) n = `-${n}`;
  if (!den.length) return n;
  const d = den.length === 1 ? den[0].replace(/^\((.*)\)$/, '$1') : den.join('×');
  const dd = isCall(d) || /^√\([^()]*(\([^()]*\))*[^()]*\)$/.test(d) || /^[a-z]$/.test(d) ? d : `(${d})`;
  return `${/[+-]/.test(n.slice(1)) || n.includes('×') ? `(${n})` : n}/${dd}`;
}

// c·G(u) as text (the power rule divides by r + 1).
function primText(G, u, c, r) {
  const C = Q.of(c);
  if (G === 'log') return cm(C, u.abs ? `ln(|${u.u}|)` : `ln(${u.u})`);
  if (G === 'atan') return cm(C, `arctan(${u.u})`);
  if (G === 'asin') return cm(C, `arcsin(${u.u})`);
  if (G === 'exp') return cm(C, `e^(${u.u})`);
  const p = r.add(1);
  const K = C.div(p);
  if (p.eq(-1)) return `${K.n}/(${K.d === 1 ? u.u : `${K.d}(${u.u})`})`;
  return cm(K, pw(u.u, p));
}

// G at a rational value of u, into val with coefficient c.
function gAt(val, G, u0, c, r) {
  if (G === 'log') return val.ln(c, u0.n < 0 ? u0.neg() : u0);
  if (G === 'atan') return val.arctan(c, u0);
  if (G === 'asin') return val.arcsin(c, u0);
  if (G === 'exp') return val.exp(c, u0);
  const p = r.add(1);
  const K = Q.of(c).div(p);
  if (p.d === 1) return val.rat(K.mul(p.n > 0 ? u0.pow(p.n) : u0.pow(p.n)));
  return val.sqrt(K, u0.pow(p.n));
}

function diData(rng, { def = false, forMcq = false } = {}) {
  for (let i = 0; i < 200; i++) {
    const [G, name] = rng.pick(COMBOS);
    const u = uOf(name, rng);
    if (forMcq && u.k === 1) continue;
    const r = G === 'pow' ? rng.pick(POWS) : null;
    const m = rng.int(1, 6);
    const c = q(m, u.k);
    if (c.eq(1)) continue;
    const coef = G === 'pow' ? c.div(r.add(1)) : c;
    if (coef.d > 12 || Math.abs(coef.n) > 12) continue;
    let bounds = null;
    if (def) {
      const list = (name === 'exa' ? [{ a: '0', b: 'ln(2)', ua: q(u.a + 1), ub: q(u.a + 2), pos: true }] : u.a ? [{ a: '0', b: '1', ua: q(u.a), ub: q(u.a + 1), pos: true }] : BOUNDS[name]) || [];
      const ok = list.filter((b) => (G === 'log' || (G === 'pow' && r.n < 0) ? b.pos : true) && !(G === 'asin' && b.ub.valueOf() >= 1));
      const asin = G === 'asin' ? (name === 'x2' ? [{ a: '0', b: '√2/2', ua: q(0), ub: q(1, 2) }] : [{ a: '1', b: 'e^(1/2)', ua: q(0), ub: q(1, 2) }]) : null;
      bounds = rng.pick(asin || ok);
      if (!bounds) continue;
    }
    return { G, name, u, r, m, c, bounds };
  }
  return { G: 'atan', name: 'x2', u: U.x2, r: null, m: 1, c: q(1, 2), bounds: def ? BOUNDS.x2[0] : null, fallback: true };
}

function diLines(d) {
  const { G, u, m, c, r, bounds } = d;
  const f = integrand(G, u, m, r);
  const adj = integrand(G, { ...u, u2: G === 'atan' || G === 'asin' ? pw(u.u, 2) : u.u2 }, u.k, r);
  const F = primText(G, u, c, r);
  const G1 = primText(G, u, 1, r);
  if (!bounds) {
    return {
      f, F, start: `int(${f},x)`,
      lines: [
        E(cm(c, `int(${adj},x)`), `u = ${u.label}, u′ = ${u.du} : ajuster la constante`, 'prim', 'adjust', [N(c.n < 0 ? c.neg() : c)], [u.u]),
        E(`${F}+C`, `∫ ${FORM[G]} = ${G === 'pow' ? 'uʳ⁺¹/(r + 1)' : `${G_NAME[G]} u`}`, 'prim', 'prim', [u.u], [u.u]),
      ],
    };
  }
  const val = new Val();
  gAt(val, G, bounds.ub, c, r);
  gAt(val, G, bounds.ua, Q.of(c).neg(), r);
  const coef = G === 'pow' ? c.div(r.add(1)) : c;
  const body = G === 'pow' ? pw(u.u, r.add(1)) : G1.replace(/^-?(\(\d+\/\d+\)|\d+)/, '');
  const br = G === 'pow' && r.add(1).eq(-1) ? cm(coef, `bracket(1/(${u.u}),x,${bounds.a},${bounds.b})`) : cm(coef, `bracket(${body},x,${bounds.a},${bounds.b})`);
  return {
    f, F, val, start: `int(${f},x,${bounds.a},${bounds.b})`,
    lines: [
      E(cm(c, `int(${adj},x,${bounds.a},${bounds.b})`), `u = ${u.label}, u′ = ${u.du} : ajuster la constante`, 'recognize', 'adjust', [N(c.n < 0 ? c.neg() : c)], [u.u]),
      E(br, 'Primitive', 'prim', 'prim', [], []),
      E(val.text(), `Évaluer en ${bounds.b} et en ${bounds.a}`, 'eval', 'eval', [], []),
    ],
  };
}

function diDecision(d) {
  const { G, u } = d;
  const good = { id: 'direct', label: `Forme ${FORM[G]} avec u = ${u.label}`, valid: true, quality: 'good' };
  const options = [
    good,
    { id: 'subst', label: `Changement de variable t = ${u.label}, puis dt = ${u.du} dx`, valid: true, quality: 'poor', why: 'Juste, mais c\'est la même méthode écrite plus longuement : u′ est déjà là, la primitive se lit directement.' },
    { id: 'nofactor', label: `${G === 'pow' ? 'uʳ⁺¹/(r + 1)' : `${G_NAME[G]}(${u.label})`} + C, sans constante devant`, valid: false, rule: 'a1_int_missing_inner_factor', why: `Dérive : il apparaît u′ = ${u.du}, et l'intégrale n'a pas exactement ce facteur. Ajuste la constante.` },
    G === 'atan'
      ? { id: 'log', label: `Log(1 + ${u.label === 'x²' ? 'x⁴' : `(${u.label})²`})`, valid: false, rule: 'a1_int_arctg_as_log', why: 'La dérivée de Log(1 + u²) est 2uu′/(1 + u²) : il y aurait un u en trop. Ici, c\'est un Arctg.' }
      : { id: 'parts', label: 'Intégration par parties', valid: false, why: 'Aucun facteur ne se simplifie en dérivant : la nouvelle intégrale serait plus difficile.' },
  ];
  return { prompt: 'Quelle méthode ?', options, l2: [G === 'atan' ? 'log' : 'nofactor'], taken: `forme ${FORM[G]} avec u = ${u.label}, u′ = ${u.du}` };
}

const DERIV_CHOICES = (base) => [{ id: 'deriv', label: 'Dériver' }, ...base];
// The first part of a primitive item (see intItem): u′, judged by equiv.
const derivPart = (u, ut, dut, note, dec, choices) => ({
  start: `d(${ut})`, judge: { kind: 'equiv', vars: [V] }, dec, note, choices,
  lines: [E(dut, `Dériver u = ${u}`, 'recognize', 'deriv')],
});

function diItem(level, rng, opts = {}) {
  const def = level >= 4 || !!opts.exam || rng.chance(level === 3 ? 0.3 : 0.25);
  const d = diData(rng, { def });
  const L = diLines(d);
  const prims = { [key(L.f)]: L.F };
  const dec = diDecision(d);
  const parts = def
    ? [{ start: L.start, judge: { kind: 'definite', prims }, lines: L.lines, dec, choices: DI_CHOICES }]
    : [
      derivPart(d.u.label, d.u.u, d.u.dut, `u = ${d.u.label} : sa dérivée apparaît-elle dans l'intégrale ?`, dec, DERIV_CHOICES(DI_CHOICES)),
      { html: 'L’intégrale', start: L.start, judge: { kind: 'antideriv', v: V, domain: { x: d.u.dom }, prims }, lines: L.lines, choices: DI_CHOICES },
    ];
  return intItem({
    skill: DI, prompt: `Calcule ${MT(L.start)}.`, key: L.start, fallback: d.fallback, parts,
    hints: H(`${d.u.du} est (à une constante près) la dérivée de u = ${d.u.label} : forme ${FORM[d.G]}. Ajuste la constante.`, MT(L.lines[0].math), MT(L.lines[1].math)),
    subgoals: DI_SUB,
  }, level, rng, opts);
}

function diMcq(rng) {
  const d = diData(rng, { forMcq: true });
  const L = diLines(d);
  const k = d.u.k;
  const opt = (c, rule, noC = false) => ({ html: MT(`${primText(d.G, d.u, c, d.r)}${noC ? '' : '+C'}`), correct: !rule, rule });
  const options = [
    opt(d.c), opt(d.c.mul(k), 'a1_int_missing_inner_factor'),
    d.G === 'atan' ? { html: MT(`${cm(d.c, `ln(1+${d.u.u2})`)}+C`), correct: false, rule: 'a1_int_arctg_as_log' } : opt(d.c.div(k), 'a1_int_missing_inner_factor'),
    opt(d.c, 'a1_int_no_constant', true),
  ];
  return mcq({
    skill: DI, level: 4, prompt: `${MT(L.start)} =`, options: uniq(options), key: `mcq:${L.start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
    solution: [{ html: `u = ${d.u.label}, u′ = ${d.u.du} : ${MT(L.lines[0].math)} ${MT(L.lines[1].math)}`, note: '' }],
  }, rng);
}

const DI_TF = [
  { s: 'Toute fonction dérivable sur un intervalle a une primitive sur cet intervalle.', truth: true, why: 'Vrai : elle est continue, et toute fonction continue sur un intervalle a une primitive (théorème fondamental).' },
  { s: 'Sur un intervalle où u ne s\'annule pas, ∫ u′/u dx = Log|u| + C.', truth: true, why: 'Vrai : la dérivée de Log|u| est u′/u.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ x/(1 + x⁴) dx = Arctg(b²).', truth: false, rule: 'a1_int_missing_inner_factor', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(x/(1+x^4),x,0,b)=arctan(b^2)', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } }, why: 'Faux : la dérivée de Arctg(x²) est 2x/(1 + x⁴). La primitive est ½Arctg(x²) ; avec b = 1, l\'intégrale vaut π/8, pas π/4.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ dx/(1 + x²) = Log(1 + b²).', truth: false, rule: 'a1_int_arctg_as_log', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(1/(1+x^2),x,0,b)=ln(1+b^2)', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } }, why: 'Faux : la primitive est Arctg x ; avec b = 1, l\'intégrale vaut π/4 ≈ 0,79, et Log 2 ≈ 0,69.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ x·e^(x²) dx = (e^(b²) − 1)/2.', truth: true, why: 'Vrai : x·e^(x²) = ½·(2x)·e^(x²), forme u′eᵘ avec u = x².' },
];

GEN_ADD(DI, (level, rng, profile, opts = {}) => {
  if (opts.exam === 'mcq') return diMcq(rng);
  if (opts.exam === 'tf') return examTf(DI_TF, DI, rng);
  return diItem(level, rng, opts);
});

// ======================================================================
// a1-int-subst
// ======================================================================

const SU = 'a1-int-subst';
const SU_SUB = [
  { id: 'phi', label: 'choisir φ, changer dx et les bornes', skill: SU },
  { id: 'simplify', label: 'simplifier en t', skill: SU },
  { id: 'integrate', label: 'intégrer en t', skill: DI },
  { id: 'back', label: 'revenir à x', skill: SU },
];
const SU_CHOICES = (def) => [
  { id: 'subst', label: def ? 'Remplacer x, dx et les bornes' : 'Remplacer x et dx' },
  { id: 'simplify', label: 'Simplifier la fraction en t' },
  { id: 'integrate', label: 'Intégrer en t' },
  def ? { id: 'eval', label: 'Évaluer aux bornes' } : { id: 'back', label: 'Revenir à x' },
  def ? { id: 'keep', label: 'Garder les bornes en x', rule: 'a1_subst_bounds_kept', why: 'Les bornes changent avec la variable.' }
    : { id: 'dt', label: 'Remplacer dx par dt', rule: 'a1_subst_dx_kept', why: 'dx = φ′(t) dt : il y a un facteur.' },
];

// The templates. Each gives the integrand, t, x = ψ(t), the lines in t and
// the values. t-bounds are written exactly.
const SU_T = {
  // k/(√x(a + √x)), t = √x: ∫ 2k/(a + t) dt.
  sqlog(rng) {
    const a = rng.int(1, 3);
    const k = rng.int(1, 3);
    const [tA, tB] = rng.shuffle([1, 2, 3, 4]).slice(0, 2).sort((x, y) => x - y);
    return {
      id: 'sqlog', f: `${k}/(√x(${a}+√x))`, t: 'sqrt(x)', psi: 't^2', dx: '2t', root: '√x', tl: 't = √x, x = t²',
      inT: `${k}/(t(${a}+t))×(2t)`, simple: `${2 * k}/(${a}+t)`, Ft: `${2 * k}ln(${a}+t)`, Fx: `${2 * k}ln(${a}+√x)`,
      brT: `${2 * k}bracket(ln(${a}+t),t,%a,%b)`, dom: [0.2, 4],
      bounds: { xa: String(tA * tA), xb: String(tB * tB), ta: String(tA), tb: String(tB) },
      value: () => new Val().ln(2 * k, q(a + tB, a + tA)),
      parts: 'u = 1/(1 + √x)', k, a, tA, tB,
    };
  },
  // k/(√x(a² + x)), t = √x: ∫ 2k/(a² + t²) dt = (2k/a)·Arctg(t/a).
  sqatan(rng) {
    const a = rng.int(1, 3);
    const k = rng.pick([1, 2, 3].filter((x) => (2 * x) % a === 0 || a === 1 || x === a));
    const pts = [{ x: q(a * a, 3), r: q(1, 3), m: 3, th: q(1, 6) }, { x: q(a * a), r: q(1), m: 1, th: q(1, 4) }, { x: q(3 * a * a), r: q(1), m: 3, th: q(1, 3) }];
    const [A, B] = rng.pick([[0, 1], [1, 2], [0, 2]]).map((i) => pts[i]);
    const c = q(2 * k, a);
    const tA = new Val().sqrt(1, A.x).text();
    const tB = new Val().sqrt(1, B.x).text();
    return {
      id: 'sqatan', f: `${k}/(√x(${a * a}+x))`, t: 'sqrt(x)', psi: 't^2', dx: '2t', root: '√x', tl: 't = √x, x = t²',
      inT: `${k}/(t(${a * a}+t^2))×(2t)`, simple: `${2 * k}/(${a * a}+t^2)`,
      Ft: cm(c, a === 1 ? 'arctan(t)' : `arctan(t/${a})`), Fx: cm(c, a === 1 ? 'arctan(√x)' : `arctan(√x/${a})`),
      brT: cm(c, `bracket(${a === 1 ? 'arctan(t)' : `arctan(t/${a})`},t,%a,%b)`), dom: [0.2, 4],
      bounds: { xa: N(A.x), xb: N(B.x), ta: tA, tb: tB },
      value: () => new Val().pi(c.mul(B.th.sub(A.th))),
      parts: `u = 1/(${a * a} + x)`, k, a, A, B,
    };
  },
  // ln x/(x√(ln²x + m)), t = Log x: ∫ t/√(t² + m) dt.
  lnsqrt(rng) {
    const m = rng.int(1, 9);
    const b = rng.int(1, 4);
    return {
      id: 'lnsqrt', f: `ln(x)/(x√(ln(x)^2+${m}))`, t: 'ln(x)', psi: 'e^t', dx: 'e^t', root: 'Log x', tl: 't = Log x, x = eᵗ',
      inT: `t/(e^t×√(t^2+${m}))×e^t`, simple: `t/√(t^2+${m})`, Ft: `√(t^2+${m})`, Fx: `√(ln(x)^2+${m})`,
      brT: `bracket(√(t^2+${m}),t,%a,%b)`, dom: [0.3, 5],
      bounds: { xa: '1', xb: b === 1 ? 'e' : `e^${b}`, ta: '0', tb: String(b) },
      value: () => new Val().sqrt(1, q(b * b + m)).sqrt(-1, q(m)),
      parts: 'u = Log x', m, b,
    };
  },
  // x/√(x + a), t = √(x + a): ∫ 2(t² − a) dt.
  shift(rng) {
    const a = rng.int(1, 4);
    const [tA, tB] = rng.shuffle([1, 2, 3]).slice(0, 2).sort((x, y) => x - y);
    const P = (t) => q(2 * t * t * t, 3).sub(2 * a * t);
    return {
      id: 'shift', f: `x/√(x+${a})`, t: `sqrt(x+${a})`, psi: `t^2-${a}`, dx: '2t', root: `√(x + ${a})`, tl: `t = √(x + ${a}), x = t² − ${a}`,
      inT: `(t^2-${a})/t×(2t)`, simple: `2t^2-${2 * a}`, Ft: `(2/3)t^3-${2 * a}t`, Fx: `(2/3)(x+${a})^(3/2)-${2 * a}√(x+${a})`,
      brT: `bracket((2/3)t^3-${2 * a}t,t,%a,%b)`, dom: [-a + 0.2, 4],
      bounds: { xa: String(tA * tA - a), xb: String(tB * tB - a), ta: String(tA), tb: String(tB) },
      value: () => Val.of(P(tB).sub(P(tA))),
      parts: `u = x, v′ = 1/√(x + ${a})`, a,
    };
  },
};

function suItem(level, rng, opts = {}) {
  const def = level >= 4 || !!opts.exam || rng.chance(0.5);
  const kinds = def ? ['sqlog', 'sqatan', 'lnsqrt', 'shift'] : ['sqlog', 'sqatan', 'lnsqrt', 'shift'];
  const T = SU_T[rng.pick(kinds)](rng);
  const change = { t: T.t, x: T.psi };
  const bd = T.bounds;
  const B = (s) => s.replace('%a', bd.ta).replace('%b', bd.tb);
  const start = def ? `int(${T.f},x,${bd.xa},${bd.xb})` : `int(${T.f},x)`;
  const lines = def
    ? [
      E(`int(${T.inT},t,${bd.ta},${bd.tb})`, 'Remplacer x, dx et les bornes', 'phi', 'subst', [T.dx, { bound: 'lo' }, { bound: 'hi' }], [T.dx, { bound: 'lo' }, { bound: 'hi' }]),
      E(`int(${T.simple},t,${bd.ta},${bd.tb})`, 'Simplifier', 'simplify', 'simplify'),
      E(B(T.brT), 'Intégrer en t', 'integrate', 'integrate'),
      E(T.value().text(), 'Évaluer', 'integrate', 'eval'),
    ]
    : [
      E(`int(${T.inT},t)`, 'Remplacer x et dx', 'phi', 'subst', [T.dx], [T.dx]),
      E(`int(${T.simple},t)`, 'Simplifier', 'simplify', 'simplify'),
      E(`${T.Ft}+C`, 'Intégrer en t', 'integrate', 'integrate'),
      E(`${T.Fx}+C`, 'Revenir à x', 'back', 'back', [T.root === 'Log x' ? 'ln(x)' : T.t.replace('sqrt', '√')]),
    ];
  const judge = def ? { kind: 'definite', change } : { kind: 'antideriv', v: V, domain: { x: T.dom }, subst: { t: T.t }, change };
  const dec = {
    prompt: 'Quelle méthode ?',
    options: [
      { id: 'subst', label: 'Changement de variable', valid: true, quality: 'good', then: { ask: 't =', expect: T.t, vars: [V], why: `Pose t égal à ce qui gêne : ${T.root}.` } },
      { id: 'parts', label: `Parties avec ${T.parts}`, valid: true, quality: 'poor', why: 'Juste, mais la nouvelle intégrale n\'est pas plus simple que celle de départ.' },
      { id: 'dx', label: `Remplacer ${T.root} par t, et dx par dt`, valid: false, rule: 'a1_subst_dx_kept', why: 'dx change aussi : dx = φ′(t) dt.' },
      { id: 'des', label: 'Décomposer en éléments simples en x', valid: false, why: `Ce n'est pas une fraction rationnelle en x : ${T.root} gêne.` },
    ],
    l2: ['dx'], taken: `changement de variable ${T.tl}, dx = ${T.dx.replace('e^t', 'eᵗ')} dt`,
  };
  const parts = def
    ? [{ start, judge, lines, dec, choices: SU_CHOICES(def) }]
    : [
      { start: `d(${T.psi})`, judge: { kind: 'equiv', vars: ['t'], dvar: 't' }, dec, note: `${T.tl} : dx = (${pretty(T.psi.replace('e^t', 'eᵗ'))})′ dt.`, choices: [{ id: 'dx', label: 'Exprimer dx' }, ...SU_CHOICES(def)], lines: [E(T.dx, 'dx/dt', 'phi', 'dx')] },
      { html: 'L’intégrale', start, judge, lines, choices: SU_CHOICES(def) },
    ];
  const it = intItem({
    skill: SU, prompt: `Calcule ${MT(start)}.`, key: start, points: 3, parts,
    hints: H(`Pose ${T.tl} ; n'oublie ni dx${def ? ' ni les bornes' : ''}.`, MT(lines[0].math, { vars: [V, 't'] }), MT(lines[1].math, { vars: [V, 't'] })),
    subgoals: SU_SUB, baits: def ? ['a1_subst_bounds_kept'] : [],
  }, level, rng, opts);
  return it;
}

// The exam question of 2019 (and its family): ∫ of k/(√x(a + √x)) or
// k/(√x(1 + x)) with the traps' values.
function suMcq(rng) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(['sqlog', 'sqatan']);
    const T = SU_T[kind](rng);
    if (kind === 'sqatan' && T.a !== 1) continue;
    let right;
    let dx;
    let bounds;
    let both;
    if (kind === 'sqlog') {
      const { k, a, tA, tB } = T;
      const xA = tA * tA;
      const xB = tB * tB;
      right = T.value();
      // dx kept: ∫ k/(t(a + t)) dt = (k/a)[ln t − ln(a + t)].
      const G = (v, c, t) => v.ln(q(c * k, a), q(t)).ln(q(-c * k, a), q(a + t));
      dx = G(G(new Val(), 1, tB), -1, tA);
      bounds = new Val().ln(2 * k, q(a + xB, a + xA));
      both = G(G(new Val(), 1, xB), -1, xA);
    } else {
      const { k, A, B } = T;
      right = T.value();
      // dx kept: ∫ k/(t(1 + t²)) dt = k[ln t − ½ln(1 + t²)], t = √x.
      const G = (v, c, X) => v.ln(q(c * k, 2), X).ln(q(-c * k, 2), X.add(1));
      dx = G(G(new Val(), 1, B.x), -1, A.x);
      const at = (v, c, X) => (X.eq(q(1, 3)) ? v.arctan(c * 2 * k, q(1, 3)) : v.arctan(c * 2 * k, X));
      bounds = at(at(new Val(), 1, B.x), -1, A.x);
      const G2 = (v, c, X) => v.ln(c * k, X).ln(q(-c * k, 2), X.mul(X).add(1));
      both = G2(G2(new Val(), 1, B.x), -1, A.x);
    }
    const vals = [right, dx, bounds, both].map((v) => v.value);
    if (vals.some((v, j) => vals.findIndex((w) => Math.abs(w - v) < 1e-9) !== j)) continue;
    const start = `int(${T.f},x,${T.bounds.xa},${T.bounds.xb})`;
    return mcq({
      skill: SU, level: 4, prompt: `${MT(start)} =`, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240,
      options: [
        { html: MT(right.text()), correct: true },
        { html: MT(dx.text()), correct: false, rule: 'a1_subst_dx_kept' },
        { html: MT(bounds.text()), correct: false, rule: 'a1_subst_bounds_kept' },
        { html: MT(both.text()), correct: false, rule: 'a1_subst_dx_kept' },
      ],
      solution: [{ html: `${T.tl}, dx = 2t dt ; t va de ${T.bounds.ta.replace('√', '√')} à ${T.bounds.tb} : ${MT(`int(${T.simple},t,${T.bounds.ta},${T.bounds.tb})`, { vars: ['t'] })} = ${MT(right.text())}.`, note: '' }],
    }, rng);
  }
  return mcq({
    skill: SU, level: 4, prompt: `${MT('int(1/(√x(1+√x)),x,1,4)')} =`, key: 'mcq:fallback', exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: true,
    options: [{ html: MT('2ln(3/2)'), correct: true }, { html: MT('ln(4/3)'), correct: false, rule: 'a1_subst_dx_kept' }, { html: MT('2ln(5/2)'), correct: false, rule: 'a1_subst_bounds_kept' }, { html: MT('ln(8/5)'), correct: false, rule: 'a1_subst_dx_kept' }],
  }, rng);
}

const SU_TF = [
  { s: 'Avec t = x², pour tout a > 0 : ∫₋ₐᵃ x² dx = ∫ de a² à a² de (√t/2) dt = 0.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: 'int(x^2,x,-a,a)=0', ask: [{ v: 'a', label: 'a =' }], answer: { a: '1' } }, why: 'Faux : t = x² n\'est pas bijective sur [−a ; a]. Avec a = 1, l\'intégrale vaut 2/3.' },
  { s: 'Avec t = √x, pour tout b > 1 : ∫₁ᵇ dx/(√x(1 + √x)) = ∫₁ᵇ 2 dt/(1 + t).', truth: false, rule: 'a1_subst_bounds_kept', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(1/(√x(1+√x)),x,1,b)=int(2/(1+t),t,1,b)', ask: [{ v: 'b', label: 'b =' }], answer: { b: '4' } }, why: 'Faux : les bornes changent. Quand x va de 1 à 4, t va de 1 à 2 : avec b = 4, la gauche vaut 2 Log(3/2), la droite 2 Log(5/2).' },
  { s: 'Avec t = Log x, pour tout b > 1 : ∫₁ᵇ (Log x)/x dx = ∫₁ᵇ t dt.', truth: false, rule: 'a1_subst_bounds_kept', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(ln(x)/x,x,1,b)=int(t,t,1,b)', ask: [{ v: 'b', label: 'b =' }], answer: { b: 'e' } }, why: 'Faux : t va de 0 à Log b. Avec b = e, la gauche vaut 1/2, la droite (e² − 1)/2.' },
  { s: 'Avec t = √x, pour tout b > 0 : ∫₀ᵇ dx/(√x(1 + x)) = 2 Arctg √b.', truth: true, why: 'Vrai : dx = 2t dt donne ∫₀^√b 2 dt/(1 + t²) = 2 Arctg √b.' },
  { s: 'Si φ est de classe C¹ sur [α ; β] et f continue, ∫ de φ(α) à φ(β) de f(x) dx = ∫ de α à β de f(φ(t))·φ′(t) dt.', truth: true, why: 'Vrai : c\'est la formule du changement de variable (φ n\'a même pas besoin d\'être bijective ici).' },
];

GEN_ADD(SU, (level, rng, profile, opts = {}) => {
  if (opts.exam === 'mcq') return suMcq(rng);
  if (opts.exam === 'tf') return examTf(SU_TF, SU, rng);
  return suItem(level, rng, opts);
});

// ======================================================================
// a1-int-parts
// ======================================================================

const IP = 'a1-int-parts';
const IP_SUB = [
  { id: 'formula', label: 'choisir u, appliquer la formule', skill: IP },
  { id: 'second', label: 'deuxième intégration par parties', skill: IP },
  { id: 'finish', label: 'intégrer v′ et réduire', skill: DI },
];
const IP_CHOICES = [
  { id: 'formula', label: 'Appliquer la formule uv − ∫u′v' },
  { id: 'second', label: 'Deuxième intégration par parties' },
  { id: 'simplify', label: 'Simplifier l\'intégrale restante' },
  { id: 'solve', label: 'Résoudre en I : l\'intégrale de départ revient' },
  { id: 'finish', label: 'Intégrer ce qui reste et réduire' },
  { id: 'eval', label: 'Évaluer aux bornes' },
  { id: 'plus', label: 'Appliquer uv + ∫u′v', rule: 'a1_ibp_plus', why: '(uv)′ = u′v + uv′, donc ∫uv′ = uv − ∫u′v.' },
];

// Polynomials: arrays of Q, c[i] for xⁱ.
const P_at = (P, x) => P.reduce((s, c, i) => s.add(c.mul(Q.of(x).pow(i))), q(0));
const P_d = (P) => P.slice(1).map((c, i) => c.mul(i + 1));
const P_scale = (P, k) => P.map((c) => c.mul(k));
function P_text(P, v = 'x') {
  const terms = [];
  for (let i = P.length - 1; i >= 0; i--) {
    const c = P[i];
    if (!c || c.n === 0) continue;
    const body = i === 0 ? '' : i === 1 ? v : `${v}^${i}`;
    terms.push(body ? cm(c, body) : N(c));
  }
  return joinSum(terms);
}
const P_deg = (P) => { for (let i = P.length - 1; i >= 0; i--) if (P[i].n) return i; return -1; };
// (x + c)² written as a square.
function P_show(P, sq) { return sq !== undefined ? `(${lin(-sq)})^2` : P_text(P); }
const lin = (a) => { const A = Q.of(a); return A.n === 0 ? 'x' : A.n < 0 ? `x+${N(A.neg())}` : `x-${N(A)}`; };

// The exponential factor e^(ax) and v = e^(ax)/a as text.
const EA = { 1: 'e^x', 2: 'e^(2x)', '-1': 'e^(-x)' };
const VA = { 1: 'e^x', 2: 'e^(2x)/2', '-1': '-e^(-x)' };

// P(x)·e^(ax): the reference lines (primitive or definite).
function pexp(P, a, bounds, sq) {
  const deg = P_deg(P);
  const ea = EA[a];
  const v = VA[a];
  const vv = a === 1 ? v : `(${v})`;
  const Pt = P_show(P, sq);
  const dP = P_d(P);
  const dPt = sq !== undefined ? `2(${lin(-sq)})` : P_text(dP);
  const uv = `${wrap(Pt)}×${vv}`;
  const I1 = `${wrap(dPt)}×${vv}`;
  // F = e^(ax)·Qx with Qx = P/a − P′/a² + P″/a³.
  let Qx = P.map(() => q(0));
  let D = P;
  for (let k = 1; D.length && P_deg(D) >= 0; k++) {
    Qx = Qx.map((c, i) => c.add((D[i] || q(0)).mul(q(k % 2 ? 1 : -1)).div(q(a).pow(k))));
    D = P_d(D);
  }
  const den = Qx.reduce((l, c) => (l * c.d) / gcd(l, c.d), 1);
  const R = P_scale(Qx, den);
  const Ftxt = den === 1 ? `(${P_text(R)})${ea}` : `${ea}(${P_text(R)})/${den}`;
  const f = `${wrap(Pt)}×${ea}`;
  const L = [];
  const lo = bounds ? `,${bounds.a},${bounds.b}` : '';
  const brk = (e) => (bounds ? `bracket(${e},x${lo})` : e);
  L.push(E(`${brk(uv)}-int(${I1},x${lo})`, `u = ${pretty(Pt)}, v′ = ${pretty(ea)} : u′ = ${pretty(dPt)}, v = ${pretty(v)}`, 'formula', 'formula', [dPt, v], [uv, I1]));
  if (deg === 2) {
    const u2 = P_scale(dP, q(1, a));
    const c2 = P_d(u2)[0];
    const in2 = cm(c2.div(a), ea);
    L.push(E(`${brk(uv)}-(${brk(`${wrap(P_text(u2))}×${vv}`)}-int(${in2},x${lo}))`, 'Deuxième intégration par parties', 'second', 'second', [P_text(u2)], [P_text(u2)]));
  }
  if (!bounds) {
    L.push(E(`${Ftxt}+C`, 'Intégrer et réduire', 'finish', 'finish'));
    return { f, F: Ftxt, lines: L, u: Pt, du: dPt, dv: ea, dvLabel: pretty(ea), uLabel: pretty(Pt) };
  }
  const val = new Val();
  for (const [x0, s] of [[bounds.xb, 1], [bounds.xa, -1]]) val.exp(P_at(Qx, x0).mul(s), q(a).mul(x0));
  L.push(E(`bracket(${Ftxt},x${lo})`, 'Intégrer ce qui reste', 'finish', 'finish'));
  L.push(E(val.text(), 'Évaluer', 'finish', 'eval'));
  return { f, F: Ftxt, lines: L, val, u: Pt, du: dPt, dv: ea, dvLabel: pretty(ea), uLabel: pretty(Pt), Qx };
}
const gcd = (x, y) => (y ? gcd(y, x % y) : Math.abs(x));
// Readable labels: x^2 → x², e^(2x) → e²ˣ.
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', '-': '⁻', x: 'ˣ' };
function pretty(t) {
  return t.replace(/\^\(([-\dx]+)\)|\^(\d)/g, (m, a, b) => [...(a ?? b)].map((c) => SUP[c] ?? c).join(''))
    .replace(/×/g, '·').replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/^ − /, '−').replace(/\( − /g, '(−').replace(/ln/g, 'Log').replace(/arctan/g, 'Arctg');
}

// P(x)·sin(ax) or cos(ax), P = αx + β.
function ptrig(al, be, a, fn, bounds) {
  const P = [q(be), q(al)];
  const Pt = P_text(P);
  const arg = a === 1 ? 'x' : `${a}x`;
  const s = `sin(${arg})`;
  const c = `cos(${arg})`;
  // ∫ sin = −cos/a, ∫ cos = sin/a.
  const v = fn === 'sin' ? (a === 1 ? `-${c}` : `-${c}/${a}`) : (a === 1 ? s : `${s}/${a}`);
  const vv = `(${v})`;
  const uv = `${wrap(Pt)}×${vv}`;
  const I1 = `${al === 1 ? '' : `${al}×`}${vv}`;
  const Pa = P_text(P_scale(P, q(fn === 'sin' ? -1 : 1, a)));
  const F = joinSum([`${wrap(Pa)}×${fn === 'sin' ? c : s}`, cm(q(al, a * a), fn === 'sin' ? s : c)]);
  const f = `${wrap(Pt)}×${fn === 'sin' ? s : c}`;
  const lo = bounds ? `,${bounds.a},${bounds.b}` : '';
  const L = [E(`${bounds ? `bracket(${uv},x${lo})` : uv}-int(${I1},x${lo})`, `u = ${pretty(Pt)}, v′ = ${fn === 'sin' ? s : c} : u′ = ${al}, v = ${v}`, 'formula', 'formula', [v], [uv, I1])];
  if (!bounds) {
    L.push(E(`${F}+C`, 'Intégrer et réduire', 'finish', 'finish'));
    return { f, F, lines: L, u: Pt, du: String(al), dv: fn === 'sin' ? s : c, uLabel: pretty(Pt), dvLabel: fn === 'sin' ? s : c };
  }
  // Values at 0, π/2, π, −π: P(x0) has π; sin and cos are 0 or ±1.
  const val = new Val();
  const trig = (name, x0) => Math.round(Math[name](a * x0.r.valueOf() * Math.PI));
  for (const [x0, sg] of [[bounds.xb, 1], [bounds.xa, -1]]) {
    const Pv = new Val().pi(x0.r.mul(al)).rat(be);
    const [cf, cg] = fn === 'sin' ? [q(-trig('cos', x0), a), q(al * trig('sin', x0), a * a)] : [q(trig('sin', x0), a), q(al * trig('cos', x0), a * a)];
    val.plus(Pv, cf.mul(sg)).rat(cg.mul(sg));
  }
  L.push(E(`bracket(${F},x${lo})`, 'Intégrer ce qui reste', 'finish', 'finish'));
  L.push(E(val.text(), 'Évaluer', 'finish', 'eval'));
  return { f, F, lines: L, val, u: Pt, du: String(al), dv: fn === 'sin' ? s : c, uLabel: pretty(Pt), dvLabel: fn === 'sin' ? s : c, P, a, fn };
}

// xⁿ·Log x (u = Log x, v′ = xⁿ).
function xln(n, bounds) {
  const v = n === 0 ? 'x' : `(x^${n + 1}/${n + 1})`;
  const vBody = n === 0 ? 'x' : `x^${n + 1}/${n + 1}`;
  const f = n === 0 ? 'ln(x)' : `${n === 1 ? 'x' : `x^${n}`}×ln(x)`;
  const rest = n === 0 ? '1' : n === 1 ? 'x' : `x^${n}`;
  const restI = n === 0 ? '1' : `${rest}/${n + 1}`;
  const k = (n + 1) * (n + 1);
  const F = n === 0 ? 'x×ln(x)-x' : `(x^${n + 1}/${n + 1})ln(x)-x^${n + 1}/${k}`;
  const lo = bounds ? ',1,e' : '';
  const brk = (e) => (bounds ? `bracket(${e},x${lo})` : e);
  const L = [
    E(`${brk(`${v}×ln(x)`)}-int(${v}×(1/x),x${lo})`, `u = Log x, v′ = ${n === 0 ? '1' : pretty(rest)} : u′ = 1/x, v = ${pretty(vBody)}`, 'formula', 'formula', ['1/x', vBody], [`${v}×(1/x)`]),
  ];
  // ∫ 1 dx is not differentiated as x by the judge (a constant integrand):
  // for Log x alone, the next line is the primitive.
  if (n > 0) L.push(E(`${brk(`${v}×ln(x)`)}-int(${restI},x${lo})`, 'Simplifier', 'formula', 'simplify'));
  if (!bounds) {
    L.push(E(`${F}+C`, 'Intégrer et réduire', 'finish', 'finish'));
    return { f, F, lines: L, u: 'ln(x)', du: '1/x', dv: rest, uLabel: 'Log x', dvLabel: n === 0 ? '1' : pretty(rest), domain: [0.3, 4] };
  }
  // [x^(n+1)/(n+1)·ln x − x^(n+1)/(n+1)²] from 1 to e.
  const val = new Val().exp(q(1, n + 1).sub(q(1, k)), n + 1).rat(q(1, k));
  L.push(E(`bracket(${F},x${lo})`, 'Intégrer ce qui reste', 'finish', 'finish'));
  L.push(E(val.text(), 'Évaluer', 'finish', 'eval'));
  return { f, F, lines: L, val, u: 'ln(x)', du: '1/x', dv: rest, uLabel: 'Log x', dvLabel: n === 0 ? '1' : pretty(rest), domain: [0.3, 4] };
}

// x·Arctg x, or Arctg x alone (u = Arctg x).
function xatan(n, bounds) {
  const lo = bounds ? ',0,1' : '';
  const brk = (e) => (bounds ? `bracket(${e},x${lo})` : e);
  let L;
  let F;
  let val;
  if (n === 1) {
    F = '(x^2/2)arctan(x)-x/2+arctan(x)/2';
    L = [
      E(`${brk('(x^2/2)×arctan(x)')}-int((x^2/2)×(1/(1+x^2)),x${lo})`, 'u = Arctg x, v′ = x : u′ = 1/(1 + x²), v = x²/2', 'formula', 'formula', ['1/(1+x^2)', 'x^2/2'], ['(x^2/2)×(1/(1+x^2))']),
      E(`${brk('(x^2/2)×arctan(x)')}-(1/2)int(1-1/(1+x^2),x${lo})`, 'x²/(1 + x²) = 1 − 1/(1 + x²)', 'formula', 'simplify'),
    ];
    val = new Val().pi(q(1, 4)).rat(q(-1, 2));
  } else {
    F = 'x×arctan(x)-(1/2)ln(1+x^2)';
    L = [E(`${brk('x×arctan(x)')}-int(x×(1/(1+x^2)),x${lo})`, 'u = Arctg x, v′ = 1 : u′ = 1/(1 + x²), v = x', 'formula', 'formula', ['1/(1+x^2)'], ['x×(1/(1+x^2))'])];
    val = new Val().pi(q(1, 4)).ln(q(-1, 2), 2);
  }
  const f = n === 1 ? 'x×arctan(x)' : 'arctan(x)';
  if (!bounds) L.push(E(`${F}+C`, 'Intégrer et réduire', 'finish', 'finish'));
  else { L.push(E(`bracket(${F},x${lo})`, 'Intégrer ce qui reste', 'finish', 'finish')); L.push(E(val.text(), 'Évaluer', 'finish', 'eval')); }
  return { f, F, lines: L, val: bounds ? val : null, u: 'arctan(x)', du: '1/(1+x^2)', dv: n === 1 ? 'x' : '1', uLabel: 'Arctg x', dvLabel: n === 1 ? 'x' : '1', bounds: bounds ? { a: '0', b: '1' } : null };
}

// eˣ·sin(bx): two parts bring the integral back.
function loop(b, fn) {
  const arg = b === 1 ? 'x' : `${b}x`;
  const s = `sin(${arg})`;
  const c = `cos(${arg})`;
  const [g, h] = fn === 'sin' ? [s, c] : [c, s];
  const sg = fn === 'sin' ? '-' : '+';
  const bb = b === 1 ? '' : `${b}`;
  const f = `e^x×${g}`;
  const k = 1 + b * b;
  const F = fn === 'sin' ? `e^x(${s}-${bb}${c})${k === 1 ? '' : `/${k}`}` : `e^x(${c}+${bb}${s})/${k}`;
  const L = [
    E(`e^x×${g}${sg}${bb ? `${bb}×` : ''}int(e^x×${h},x)`, `u = ${g}, v′ = eˣ`, 'formula', 'formula', [], []),
    E(`e^x×${g}${sg}${bb}(e^x×${h}${fn === 'sin' ? '+' : '-'}${bb ? `${bb}×` : ''}int(e^x×${g},x))`, 'Deuxième intégration par parties : I revient', 'second', 'second'),
    E(`${F}+C`, `Résoudre en I : ${k}I = …`, 'finish', 'solve'),
  ];
  return { f, F, lines: L, u: g, du: fn === 'sin' ? `${bb}${c}` : `-${bb}${s}`, dv: 'e^x', uLabel: g, dvLabel: 'eˣ' };
}

// One random template of the skill.
function ipData(rng, level, def, { forMcq = false } = {}) {
  const kinds = forMcq ? ['pexp2', 'pexp2', 'ptrig'] : level <= 2 ? ['pexp1', 'pexp2', 'ptrig', 'xln'] : level === 3 ? ['pexp1', 'pexp2', 'ptrig', 'xln', 'xatan', 'loop'] : ['pexp2', 'ptrig', 'xln', 'xatan', 'pexp2'];
  const kind = rng.pick(def ? kinds.filter((k) => k !== 'loop') : kinds);
  if (kind === 'pexp1' || kind === 'pexp2') {
    for (let i = 0; i < 200; i++) {
      const a = rng.pick([1, 2, -1]);
      const deg = kind === 'pexp1' ? 1 : 2;
      const sq = deg === 2 && a === 1 && rng.chance(0.3) ? rng.pick([1, -1, 2]) : undefined;
      const P = sq !== undefined ? [q(sq * sq), q(2 * sq), q(1)] : deg === 1 ? [q(rng.int(-3, 3)), q(rng.pick([1, 2, 3, -1]))] : [q(rng.int(-3, 3)), q(rng.int(-3, 3)), q(rng.pick([1, 1, 2, -1]))];
      const bounds = def ? rng.pick([{ a: '0', b: '1', xa: q(0), xb: q(1) }, { a: '-1', b: '0', xa: q(-1), xb: q(0) }]) : null;
      const r = pexp(P, a, bounds, sq);
      if (r.F.length > 40) continue;
      return { kind, ...r, domain: [-2, 2], P, a, sq, bounds, deg };
    }
  }
  if (kind === 'ptrig' || kind === 'pexp1' || kind === 'pexp2') {
    const al = rng.pick([1, 1, 2, 3]);
    const be = forMcq ? 0 : rng.pick([0, 0, 1, -1, 2]);
    const a = rng.pick([1, 1, 2]);
    const fn = rng.pick(['sin', 'cos']);
    const bounds = def ? rng.pick([{ a: '0', b: 'π', xa: { r: q(0) }, xb: { r: q(1) } }, { a: '0', b: 'π/2', xa: { r: q(0) }, xb: { r: q(1, 2) } }, { a: '-π', b: 'π', xa: { r: q(-1) }, xb: { r: q(1) } }]) : null;
    return { kind: 'ptrig', ...ptrig(al, be, a, fn, bounds), domain: [-2, 2], bounds, al, be, deg: 1 };
  }
  if (kind === 'xln') { const n = rng.int(0, 3); return { kind, ...xln(n, def ? { a: '1', b: 'e' } : null), bounds: def ? { a: '1', b: 'e' } : null }; }
  if (kind === 'xatan') return { kind, ...xatan(rng.pick([0, 1]), def), domain: [-2, 2] };
  return { kind, ...loop(rng.pick([1, 1, 2]), rng.pick(['sin', 'cos'])), domain: [-2, 2] };
}

function ipDecision(d) {
  const u = d.uLabel;
  const dv = d.dvLabel;
  const swapOk = d.kind === 'loop';
  const options = [
    { id: 'ipp', label: 'Intégration par parties', valid: true, quality: 'good', then: { ask: 'u =', expect: d.u, vars: [V], why: 'Prends pour u ce qui se simplifie en dérivant (polynôme, Log, Arctg).' } },
    { id: 'swap', label: `Parties avec u = ${dv}, v′ = ${u}`, valid: swapOk || d.kind.startsWith('p'), quality: swapOk ? 'good' : 'poor', why: swapOk ? 'Juste aussi : les deux choix font revenir l\'intégrale.' : d.kind.startsWith('p') ? 'Juste, mais le degré du polynôme monte en l\'intégrant : l\'intégrale devient plus difficile.' : `Il faudrait intégrer ${u}, ce qu'on ne sait pas faire directement.` },
    { id: 'subst', label: `Substitution t = ${u}`, valid: false, why: 'Aucun facteur n\'est la dérivée de l\'autre à une constante près.' },
    { id: 'split', label: `∫ ${u} · ∫ ${dv}`, valid: false, rule: 'a1_int_product', why: 'La primitive d\'un produit n\'est pas le produit des primitives : dérive-le, tu trouves deux termes.' },
  ];
  const dec2 = { prompt: 'Quel choix pour u et v′ ?', options: [{ id: 'good', label: `u = ${u}, v′ = ${dv}`, valid: true, quality: 'good' }, { ...options[1], id: 'swap', label: `u = ${dv}, v′ = ${u}` }] };
  return { dec: { prompt: 'Quelle méthode ?', options, l2: [], taken: `intégration par parties avec u = ${u}, v′ = ${dv}` }, dec2 };
}

function ipItem(level, rng, opts = {}) {
  const def = level >= 4 || !!opts.exam || rng.chance(0.35);
  const d = ipData(rng, level, def);
  const bounds = d.bounds;
  const start = bounds ? `int(${d.f},x,${bounds.a},${bounds.b})` : `int(${d.f},x)`;
  const prims = { [key(d.f)]: d.F };
  const judge = bounds ? { kind: 'definite', prims } : { kind: 'antideriv', v: V, domain: { x: d.domain || [-2, 2] }, prims };
  const { dec, dec2 } = ipDecision(d);
  const parts = bounds
    ? [{ start, judge, lines: d.lines, dec, dec2, choices: IP_CHOICES }]
    : [
      derivPart(d.uLabel, d.u, d.du, `u = ${d.uLabel}, v′ = ${d.dvLabel} : dérive u.`, dec, DERIV_CHOICES(IP_CHOICES)),
      { html: 'L’intégrale', start, judge, lines: d.lines, choices: IP_CHOICES },
    ];
  if (!bounds) parts[0].dec2 = dec2;
  return intItem({
    skill: IP, prompt: `Calcule ${MT(start)}.`, key: start, points: 2, parts,
    hints: H(d.kind === 'loop' ? 'Deux intégrations par parties font revenir I : résous l\'équation en I.' : 'Dérive ce qui se simplifie (polynôme, Log, Arctg), intègre ce qui reste stable.', MT(d.lines[0].math), MT(d.lines[1].math)),
    subgoals: IP_SUB, baits: ['a1_int_product'],
  }, level, rng, opts);
}

// Values of the traps on P(x)·e^(ax) (degree 2) or P(x)·sin/cos.
function ipMcq(rng) {
  for (let i = 0; i < 200; i++) {
    const d = ipData(rng, 4, true, { forMcq: true });
    if (!d.val) continue;
    const right = d.val;
    const opts = [{ html: MT(right.text()), correct: true }];
    let uvB;
    let prodV;
    if (d.kind === 'pexp2' || d.kind === 'pexp1') {
      const { P, a } = d;
      const B = (G, x0, c) => new Val().exp(P_at(G, x0).mul(c), q(a).mul(x0));
      // [P·e^(ax)/a]
      uvB = B(P_scale(P, q(1, a)), d.bounds.xb, 1).plus(B(P_scale(P, q(1, a)), d.bounds.xa, -1));
      // (∫P)(∫e^(ax)) = Pint·e^(ax)/a
      const Pint = [q(0), ...P.map((c, k) => c.div(k + 1))];
      prodV = B(P_scale(Pint, q(1, a)), d.bounds.xb, 1).plus(B(P_scale(Pint, q(1, a)), d.bounds.xa, -1));
      // Second part: K = ∫u₂′v = [P″/a² · e^(ax)/a]; sign error: right − 2K.
      const c2 = P_d(P_d(P))[0] || q(0);
      const K = new Val().exp(c2.div(q(a).pow(3)), q(a).mul(d.bounds.xb)).plus(new Val().exp(c2.div(q(a).pow(3)), q(a).mul(d.bounds.xa)), -1);
      opts.push({ html: MT(new Val().plus(right).plus(K, -2).text()), correct: false, rule: 'a1_ibp_sign' });
    } else {
      const { al, be } = d;
      const a = d.lines[0].math.includes('2x') ? 2 : 1;
      const fn = d.f.includes('sin') ? 'sin' : 'cos';
      const trig = (name, x0) => Math.round(Math[name](a * x0.r.valueOf() * Math.PI));
      const at = (x0, s, prod) => {
        const Pv = prod ? new Val().pi(x0.r.mul(x0.r).mul(al).div(2), 2).pi(x0.r.mul(be)) : new Val().pi(x0.r.mul(al)).rat(be);
        const v = fn === 'sin' ? q(-trig('cos', x0), a) : q(trig('sin', x0), a);
        return Pv.times(v.mul(s));
      };
      uvB = at(d.bounds.xb, 1).plus(at(d.bounds.xa, -1));
      prodV = at(d.bounds.xb, 1, true).plus(at(d.bounds.xa, -1, true));
      opts.push({ html: MT(new Val().plus(right).plus(uvB, -1).text()), correct: false, rule: 'a1_ibp_boundary_term' });
    }
    opts.push({ html: MT(new Val().plus(uvB, 2).plus(right, -1).text()), correct: false, rule: 'a1_ibp_plus' });
    opts.push({ html: MT(prodV.text()), correct: false, rule: 'a1_int_product' });
    if (uniq(opts).length < 4) continue;
    const start = `int(${d.f},x,${d.bounds.a},${d.bounds.b})`;
    return mcq({
      skill: IP, level: 4, prompt: `${MT(start)} =`, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 }, expectedSec: 240, options: opts,
      solution: d.lines.map((l) => ({ html: MT(l.math), note: l.note })),
    }, rng);
  }
  return mcq({
    skill: IP, level: 4, prompt: `${MT('int(x×sin(x),x,-π,π)')} =`, key: 'mcq:fallback', exam: { format: 'mcq', points: 1 }, expectedSec: 240, fallback: true,
    options: [{ html: MT('2π'), correct: true }, { html: MT('-2π'), correct: false, rule: 'a1_ibp_boundary_term' }, { html: MT('6π'), correct: false, rule: 'a1_ibp_plus' }, { html: MT('0'), correct: false, rule: 'a1_int_product' }],
  }, rng);
}

const IP_TF = [
  { s: 'Pour f, g de classe C¹ sur [a ; b] : ∫ₐᵇ f·g′ dx = −∫ₐᵇ f′·g dx.', truth: false, mcq: true, rule: 'a1_ibp_boundary_term', why: 'Faux : il manque le terme de bord [f·g]ₐᵇ. Avec f = g = x sur [0 ; 1] : ∫₀¹ x dx = 1/2, mais −∫₀¹ x dx = −1/2.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ x·eˣ dx = b·eᵇ + ∫₀ᵇ eˣ dx.', truth: false, rule: 'a1_ibp_plus', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(x×e^x,x,0,b)=b×e^b+int(e^x,x,0,b)', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } }, why: 'Faux : ∫uv′ = uv − ∫u′v. Avec b = 1, la gauche vaut 1, la droite 2e − 1.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ x²·eˣ dx = (b³/3)·eᵇ − 0.', truth: false, rule: 'a1_int_product', counter: { kind: 'refute', quants: [{ q: '∀', v: 'b', dom: 'R+' }], pred: 'int(x^2×e^x,x,0,b)=(b^3/3)e^b', ask: [{ v: 'b', label: 'b =' }], answer: { b: '1' } }, why: 'Faux : la primitive d\'un produit n\'est pas le produit des primitives. Avec b = 1, l\'intégrale vaut e − 2.' },
  { s: '∫ x·eˣ dx = (x − 1)·eˣ + C.', truth: true, why: 'Vrai : u = x, v′ = eˣ donne x·eˣ − ∫eˣ dx.' },
  { s: 'Pour tout b > 0 : ∫₀ᵇ x·sin x dx = sin b − b·cos b.', truth: true, why: 'Vrai : u = x, v′ = sin x donne [−x cos x]₀ᵇ + ∫₀ᵇ cos x dx.' },
];

function ipTf(rng) {
  const b = rng.pick(IP_TF);
  if (!b.mcq) return examTf([b], IP, rng);
  // No counter-example checker takes a pair of functions: a Vrai/Faux choice.
  return mcq({
    skill: IP, level: 4, prompt: `Vrai ou faux ? ${b.s}`, key: `tf:${b.s}`, exam: { format: 'tf', points: 1 }, expectedSec: 60, keepOrder: true,
    options: [{ html: 'Vrai', correct: false, rule: b.rule }, { html: 'Faux', correct: true }],
    solution: [{ html: b.why, note: '' }],
  }, rng);
}

GEN_ADD(IP, (level, rng, profile, opts = {}) => {
  if (opts.exam === 'mcq') return ipMcq(rng);
  if (opts.exam === 'tf') return ipTf(rng);
  return ipItem(level, rng, opts);
});

// ======================================================================

export const GEN = { ...LOCAL, ...MORE };
