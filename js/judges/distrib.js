// Judge `distrib` (spec §16.2, step U10, module F, MT/SV): distributions.
// A line is compared with the reference on 6 test functions φ (gaussians
// times polynomials, which decay fast enough for every pairing of the
// course): each member of the line must give the same number ⟨·, φ⟩.
//
// cfg: {kind: 'distrib', v?: 'x' (the variable), ref: text (a distribution
//       or a value in φ: what every member must equal), fns?: {f: text in
//       v, "f'": text} (named functions: T_f, T_(f'), f, f'),
//       final?: 'dist' | 'value' | 'any', start, traps?: {ruleId: [texts]},
//       eq?: {op: [c0, c1, c2], rhs: text, order}, unknown?: 'y'}
// Two modes.
//   Values (no cfg.eq): every member equals ref. A member is
//     - a value in φ: φ(a), φ′(a), φ″(a), integrals int(g(x) φ(x), x, a, b)
//       (∞ allowed), pairings ⟨T, ψ⟩ (also written << T, ψ >>) where ψ is
//       a test function written with φ (x²φ, φ′, φ);
//     - or a distribution: a function of v (T_g), δ (= δ₀), δ_a, T_f and
//       T_(f') for the named functions, D (derivative: DT_f, D(H(x)e^(−x)),
//       y′), products by a function g (g δ_a = g(a) δ_a is computed),
//       sums. ⟨T, φ⟩ is then its value on φ.
//     A first member that is an unknown name (y, u) is a label.
//     Final 'dist': the last member is a distribution T_g + Σ c δ_a, with
//     constants c (no D left, no g(x) δ_a, no φ); 'value': a value in φ
//     with no pairing left.
//   Equation (cfg.eq): L y = c0 y + c1 y′ + c2 y″ = rhs. A line
//     « y = expr » (expr may hold C, K, C_1, C_2) is right if ⟨L expr, φ⟩ =
//     ⟨rhs, φ⟩ for every φ and 3 draws of the constants, computed as
//     ⟨expr, c0 φ − c1 φ′ + c2 φ″⟩. Final 'general': as many independent
//     constants as cfg.eq.order; 'particular': no constant.
// Traps (judges: ['distrib']) give texts (cfg.traps through rules/fb.js),
// compared with the line by their last member's values.

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { mapNode, symbolsIn, contains, stripParen, walk } from '../cas/ast.js';
import { evalFloat, compileFloat } from '../cas/numeric.js';
import { diff, substVar } from '../cas/diff.js';
import { heaviside, breakpoints } from '../cas/transforms.js';
import { diagnoseLine } from './diagnose.js';
import { t, tn } from '../i18n.js';

export const sign = '=';

const HOLES = ['Ξ', 'Ψ', 'Θ', 'Λ', 'Σ', 'Π'];
const CONSTS = ['C', 'K'];
const vOf = (cfg) => cfg.v || 'x';
const fnNames = (cfg) => Object.keys(cfg.fns || {}).filter((k) => !/['′]/.test(k));
const unknownsOf = (cfg) => [cfg.unknown || 'y', 'u', 'y', 'T'].filter((x, i, a) => a.indexOf(x) === i);

const paren = (e) => ({ t: 'paren', e });
const times = (a, b) => ({ t: 'bin', op: '×', l: paren(a), r: paren(b) });

// ---------- test functions ----------

const TESTS = [
  '(1+3x/10)e^(-(x-1/5)^2)',
  '(2-x+x^2/2)e^(-(x-1)^2/2)',
  '(1+x^2)e^(-(x+7/10)^2/(3/2))',
  '(1/2+x)e^(-(x-2)^2/2)',
  '(1-2x/5)e^(-(x+3/2)^2/2)',
  '(1+x/5+3x^2/10)e^(-(x-3/5)^2/3)',
];
const TEST_CACHE = new Map();
// The k-th test function in v and its derivatives (nodes).
function testFn(v, k, n = 0) {
  const key = `${v}:${k}`;
  if (!TEST_CACHE.has(key)) TEST_CACHE.set(key, [parse(TESTS[k].replace(/x/g, v), { vars: [v] })]);
  const ds = TEST_CACHE.get(key);
  while (ds.length <= n) ds.push(diff(ds[ds.length - 1], v));
  return ds[n];
}

// ---------- quadrature on ℝ (the test functions vanish beyond ±16) ----------

const GL = (() => {
  const n = 20;
  const xs = [];
  const ws = [];
  for (let i = 1; i <= n; i++) {
    let x = Math.cos((Math.PI * (i - 0.25)) / (n + 0.5));
    let dp = 1;
    for (let it = 0; it < 100; it++) {
      let p0 = 1;
      let p1 = x;
      for (let k = 2; k <= n; k++) { const p2 = ((2 * k - 1) * x * p1 - (k - 1) * p0) / k; p0 = p1; p1 = p2; }
      dp = (n * (x * p1 - p0)) / (x * x - 1);
      const dx = p1 / dp;
      x -= dx;
      if (Math.abs(dx) < 1e-16) break;
    }
    xs.push(x);
    ws.push(2 / ((1 - x * x) * dp * dp));
  }
  return { xs, ws };
})();
const L = 16;

function realFn(node, v) {
  const n = heaviside(node);
  let f;
  try { f = compileFloat(n); } catch { f = null; }
  const ev = (x) => { const y = f ? f({ [v]: x }) : evalFloat(n, { [v]: x }); return Number.isFinite(y) ? y : evalFloat(n, { [v]: x }); };
  return (x) => { const y = ev(x); return Number.isFinite(y) ? y : 0; };
}

// ∫_ℝ g·ψ, split at the jumps and kinks of g.
function integrate(g, psi, v) {
  let cuts = [];
  try { cuts = breakpoints(g, v); } catch { cuts = []; }
  const h = realFn(times(g, psi), v);
  const pts = [-L, ...cuts.filter((c) => c > -L && c < L), L];
  let s = 0;
  for (let k = 0; k + 1 < pts.length; k++) {
    const lo = pts[k];
    const hi = pts[k + 1];
    const m = Math.max(1, Math.ceil((hi - lo) / 0.5));
    for (let j = 0; j < m; j++) {
      const a = lo + ((hi - lo) * j) / m;
      const b = lo + ((hi - lo) * (j + 1)) / m;
      const c = (a + b) / 2;
      const d = (b - a) / 2;
      for (let i = 0; i < GL.xs.length; i++) s += GL.ws[i] * d * h(c + d * GL.xs[i]);
    }
  }
  return s;
}

// ---------- reading ----------

// Splits text at the top-level occurrences of the separators.
function splitTop(text, seps) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if ('([{⟨'.includes(c)) depth++;
    if (')]}⟩'.includes(c)) depth--;
    const sep = depth === 0 ? seps.find((s) => text.startsWith(s, i)) : null;
    if (sep) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

const norm = (s) => String(s).normalize('NFC').replace(/′′/g, "''").replace(/″/g, "''").replace(/′/g, "'").replace(/<</g, '⟨').replace(/>>/g, '⟩');
// φ written alone (x²φ, φ′) is φ(v).
const phiCalls = (s, v) => s.replace(/φ('{0,3})(?![('])/g, (m, p) => `φ${p}(${v})`);

function popts(cfg, extra = []) {
  return { vars: [vOf(cfg), 'δ', 'T', 'D', ...CONSTS, ...fnNames(cfg), ...unknownsOf(cfg), ...HOLES, ...extra], funcs: ['H', 'sgn', 'φ'] };
}

// The pairings ⟨A, B⟩ of a member, replaced by hole letters.
function takePairs(cfg, text) {
  const holes = [];
  let out = '';
  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] !== '⟨') { out += chars[i]; continue; }
    let depth = 0;
    let j = i;
    for (; j < chars.length; j++) {
      if (chars[j] === '⟨') depth++;
      if (chars[j] === '⟩') { depth--; if (depth === 0) break; }
    }
    if (depth !== 0) throw new Error(t('Un crochet ⟨ … ⟩ n\'est pas fermé.'));
    const inner = chars.slice(i + 1, j).join('');
    const sides = splitTop(inner, [';', ',']);
    if (sides.length !== 2) throw new Error(t('Écris ⟨T, φ⟩ : une distribution, une virgule, puis la fonction test.'));
    const name = HOLES[holes.length];
    if (!name) throw new Error(t('Trop de crochets dans un membre.'));
    holes.push({ name, T: readDist(cfg, sides[0]), test: parse(phiCalls(sides[1].trim(), vOf(cfg)), popts(cfg)), text: inner });
    out += ` ${name} `;
    i = j;
  }
  return { text: out, holes };
}

function readDist(cfg, text) {
  const tt = text.trim();
  if (!tt) throw new Error(t('Il manque la distribution dans ⟨ , ⟩.'));
  return parse(tt, popts(cfg));
}

const hasPhi = (node) => contains(node, (n) => n.t === 'fn' && n.name === 'φ');

// A member: {node, raw, holes, kind: 'value' | 'dist'}.
function readMember(cfg, raw) {
  const { text, holes } = takePairs(cfg, raw);
  const node = parse(phiCalls(text, vOf(cfg)), popts(cfg));
  // Letters the line may use.
  const allowed = new Set([vOf(cfg), 'δ', 'T', 'D', 'e', ...CONSTS, ...fnNames(cfg), ...HOLES.slice(0, holes.length), ...(cfg.eq ? [] : []), ...unknownsOf(cfg)]);
  for (const s of symbolsIn(node)) {
    const base = s.replace(/_$/, '');
    if (!allowed.has(base) && !allowed.has(s)) throw new Error(t('Je ne connais pas la lettre « {base} » ici.', { base }));
  }
  const kind = holes.length || hasPhi(node) ? 'value' : 'dist';
  return { node, raw: raw.trim(), holes, kind };
}

const isUnknownName = (cfg, n) => {
  const s = stripParen(n);
  if (s.t === 'sym' && unknownsOf(cfg).includes(s.name) && s.name !== 'T') return true;
  return s.t === 'bin' && s.implicit && stripParen(s.l).t === 'sym' && unknownsOf(cfg).includes(stripParen(s.l).name) && stripParen(s.r).t === 'paren';
};

function readStrict(cfg, input) {
  const text = norm(String(input).trim()).replace(/^=\s*/, '');
  if (!text) throw new Error(t('Ta ligne est vide.'));
  const parts = splitTop(text, ['=']).map((p) => p.trim());
  if (parts.some((p) => !p)) throw new Error(t('Un membre de ta ligne est vide.'));
  let members = parts.map((p) => readMember(cfg, p));
  let label = null;
  if (members.length > 1 && isUnknownName(cfg, members[0].node)) { label = members[0]; members = members.slice(1); }
  if (cfg.eq && !label) throw new Error(t('Écris « {a} = … ».', { a: cfg.unknown || 'y' }));
  return { t: 'dline', text: String(input).trim(), label, members };
}

export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'dline', text: String(text).trim(), label: null, members: [], raw: true }; }
}

// ---------- values ----------

// Named functions and T_g as functions of v (null if unknown).
function resolve(cfg, node) {
  const v = vOf(cfg);
  const fns = cfg.fns || {};
  const fnode = (name) => (fns[name] ? paren(parse(fns[name], { vars: [v], funcs: ['H', 'sgn'] })) : null);
  let bad = false;
  // f′ first (the maps go bottom-up): a letter of its own.
  const named = mapNode(node, (n) => (namedDeriv(cfg, n) ? { t: 'sym', name: `${stripParen(n.e).name}'` } : n));
  const out = mapNode(named, (n) => {
    if (n.t === 'sym' && n.name === 'T' && n.sub) {
      const s = stripParen(n.sub);
      if (s.t === 'sym' && !s.sub) { bad = true; return n; }
      return paren(s);
    }
    if (n.t === 'sym' && !n.sub && fns[n.name]) return fnode(n.name);
    return n;
  });
  return bad || contains(out, (n) => n.t === 'deriv') ? null : out;
}

const namedDeriv = (cfg, n) => n.t === 'deriv' && n.n === 1 && stripParen(n.e).t === 'sym' && !!(cfg.fns || {})[`${stripParen(n.e).name}'`];

// Does the node hold δ, D or a derivative in the sense of distributions?
function singular(cfg, node) {
  return contains(node, (n) => (n.t === 'sym' && !n.sub && n.name === 'D')
    || (n.t === 'sym' && n.name === 'δ')
    || (n.t === 'deriv' && !namedDeriv(cfg, n))
    || (n.t === 'sym' && unknownsOf(cfg).includes(n.name) && n.name !== 'T' && !(cfg.fns || {})[n.name]));
}

function factors(node, out = []) {
  const n = stripParen(node);
  if (n.t === 'bin' && n.op === '×') { factors(n.l, out); factors(n.r, out); } else out.push(n);
  return out;
}
const prod = (fs) => fs.reduce((a, b) => (a ? times(a, b) : b), null);
const isD = (n) => n.t === 'sym' && !n.sub && n.name === 'D';

// ⟨T, ψ⟩ for a distribution node T and a test function ψ (node in v).
function pairWith(cfg, T, psi) {
  const v = vOf(cfg);
  const n = stripParen(T);
  if (!singular(cfg, n)) {
    const g = resolve(cfg, n);
    if (!g) return NaN;
    return integrate(g, psi, v);
  }
  switch (n.t) {
    case 'bin':
      if (n.op === '+') return pairWith(cfg, n.l, psi) + pairWith(cfg, n.r, psi);
      if (n.op === '-') return pairWith(cfg, n.l, psi) - pairWith(cfg, n.r, psi);
      if (n.op === '×') {
        const fs = factors(n);
        const i = fs.findIndex(isD);
        if (i >= 0) {
          const left = prod(fs.slice(0, i));
          const right = prod(fs.slice(i + 1));
          if (!right) return NaN;
          if (left && singular(cfg, left)) return NaN;
          const g = left ? resolve(cfg, left) : null;
          if (left && !g) return NaN;
          return -pairWith(cfg, right, diff(g ? times(g, psi) : psi, v));
        }
        const sing = fs.filter((f) => singular(cfg, f));
        if (sing.length !== 1) return NaN;
        const rest = fs.filter((f) => !singular(cfg, f));
        const g = rest.length ? resolve(cfg, prod(rest)) : null;
        if (rest.length && !g) return NaN;
        return pairWith(cfg, sing[0], g ? times(g, psi) : psi);
      }
      if (n.op === '÷' || n.op === '/') {
        if (singular(cfg, n.r)) return NaN;
        const d = resolve(cfg, n.r);
        return d ? pairWith(cfg, n.l, { t: 'frac', n: paren(psi), d: paren(d) }) : NaN;
      }
      return NaN;
    case 'frac': {
      if (singular(cfg, n.d)) return NaN;
      const d = resolve(cfg, n.d);
      return d ? pairWith(cfg, n.n, { t: 'frac', n: paren(psi), d: paren(d) }) : NaN;
    }
    case 'neg': return -pairWith(cfg, n.e, psi);
    case 'sym': {
      if (n.name !== 'δ') return NaN;
      const a = n.sub ? evalFloat(heaviside(stripParen(n.sub)), {}) : 0;
      if (!Number.isFinite(a)) return NaN;
      return evalFloat(heaviside(substVar(psi, v, { t: 'float', x: a })), {});
    }
    case 'deriv': {
      let p = psi;
      for (let k = 0; k < (n.n || 1); k++) p = diff(p, v);
      return ((n.n || 1) % 2 ? -1 : 1) * pairWith(cfg, n.e, p);
    }
    default: return NaN;
  }
}

// φ(a), φ′(a) … of a value member replaced by the k-th test function.
function withTest(cfg, node, k) {
  const v = vOf(cfg);
  // Pass 1: φ′(a) → a function named by its order (bottom-up maps).
  const marked = mapNode(node, (n) => {
    if (n.t === 'deriv' && stripParen(n.e).t === 'fn' && stripParen(n.e).name === 'φ') return { t: 'fn', name: `φ#${n.n || 1}`, args: stripParen(n.e).args };
    return n;
  });
  return mapNode(marked, (n) => {
    if (n.t === 'fn' && (n.name === 'φ' || n.name.startsWith('φ#'))) {
      const order = n.name === 'φ' ? 0 : Number(n.name.slice(2));
      return paren(substVar(testFn(v, k, order), v, n.args[0]));
    }
    return n;
  });
}

// Constants replaced by numbers (C, K, C_1, C_2 …).
function withConsts(node, draw) {
  return mapNode(node, (n) => {
    if (n.t === 'sym' && CONSTS.includes(n.name)) {
      const key = n.sub ? `${n.name}_${stripParen(n.sub).v?.n ?? stripParen(n.sub).name ?? ''}` : n.name;
      return { t: 'float', x: draw[key] ?? 0 };
    }
    return n;
  });
}
const constsIn = (node) => {
  const out = new Set();
  walk(node, (n) => { if (n.t === 'sym' && CONSTS.includes(n.name)) out.add(n.sub ? `${n.name}_${stripParen(n.sub).v?.n ?? stripParen(n.sub).name ?? ''}` : n.name); return true; });
  return [...out];
};

// The value of a member on the k-th test function.
function memberValue(cfg, m, k, draw = {}) {
  const v = vOf(cfg);
  const node = withConsts(m.node, draw);
  if (m.kind === 'dist') return pairWith(cfg, node, testFn(v, k));
  const env = {};
  for (const h of m.holes) env[h.name] = pairWith(cfg, withConsts(h.T, draw), withTest(cfg, h.test, k));
  return evalFloat(heaviside(withTest(cfg, node, k)), env);
}

const REF = new WeakMap();
function refOf(cfg) {
  if (REF.has(cfg)) return REF.get(cfg);
  const v = vOf(cfg);
  let vals;
  if (cfg.eq) {
    const rhs = readMember(cfg, norm(cfg.eq.rhs));
    vals = TESTS.map((_, k) => memberValue(cfg, rhs, k));
  } else {
    const m = readMember(cfg, norm(cfg.ref));
    vals = TESTS.map((_, k) => memberValue(cfg, m, k));
  }
  const r = { vals, v };
  REF.set(cfg, r);
  return r;
}

// L*ψ = c0 ψ − c1 ψ′ + c2 ψ″ (the adjoint of the equation's operator).
function adjoint(cfg, k) {
  const v = vOf(cfg);
  const [c0 = 0, c1 = 0, c2 = 0] = cfg.eq.op;
  const terms = [[c0, 0], [-c1, 1], [c2, 2]].filter(([c]) => c !== 0).map(([c, n]) => times({ t: 'float', x: c }, testFn(v, k, n)));
  return terms.reduce((a, b) => ({ t: 'bin', op: '+', l: a, r: b }));
}

const DRAWS = [{ C: 0.7, K: 0.7, C_1: 0.7, C_2: -1.3 }, { C: -1.3, K: -1.3, C_1: -1.1, C_2: 0.4 }, { C: 2.1, K: 2.1, C_1: 1.9, C_2: 2.3 }];
const close = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-6 * (1 + Math.abs(a) + Math.abs(b));

// Values of a member: dist/value mode on the 6 tests; eq mode, ⟨L y, φ⟩ (one draw).
function valuesOf(cfg, m, draw = DRAWS[0]) {
  if (cfg.eq) return TESTS.map((_, k) => pairWith(cfg, withConsts(m.node, draw), adjoint(cfg, k)));
  return TESTS.map((_, k) => memberValue(cfg, m, k));
}

function matches(cfg, m) {
  const ref = refOf(cfg);
  const draws = cfg.eq ? DRAWS : [DRAWS[0]];
  for (const d of draws) {
    const vals = valuesOf(cfg, m, d);
    if (vals.some((x) => !Number.isFinite(x))) return 'undefined';
    if (!vals.every((x, k) => close(x, ref.vals[k]))) return 'no';
  }
  return 'yes';
}

// ---------- final forms ----------

function terms(node, out = []) {
  const n = stripParen(node);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { terms(n.l, out); terms(n.r, out); } else if (n.t === 'neg') terms(n.e, out); else out.push(n);
  return out;
}

// T_g + Σ c δ_a with constants c.
function normalDist(cfg, node) {
  const v = vOf(cfg);
  for (const tt of terms(node)) {
    if (!singular(cfg, tt)) continue;
    const fs = factors(tt.t === 'frac' ? tt.n : tt);
    const deltas = fs.filter((f) => f.t === 'sym' && f.name === 'δ');
    const others = fs.filter((f) => !(f.t === 'sym' && f.name === 'δ'));
    if (deltas.length !== 1) return false;
    if (others.some((f) => singular(cfg, f) || symbolsIn(f).has(v))) return false;
    if (tt.t === 'frac' && symbolsIn(tt.d).has(v)) return false;
  }
  return true;
}

// The constants of a solution and their independence (rank on the tests).
function constantsRank(cfg, node) {
  const cs = constsIn(node);
  if (!cs.length) return 0;
  const zero = Object.fromEntries(cs.map((c) => [c, 0]));
  const base = TESTS.map((_, k) => pairWith(cfg, withConsts(node, zero), testFn(vOf(cfg), k)));
  const cols = cs.map((c) => TESTS.map((_, k) => pairWith(cfg, withConsts(node, { ...zero, [c]: 1 }), testFn(vOf(cfg), k)) - base[k]));
  if (cols.some((col) => col.every((x) => Math.abs(x) < 1e-9))) return -1;
  if (cols.length === 2) {
    const [a, b] = cols;
    // Proportional columns: one constant in fact.
    const i = a.findIndex((x) => Math.abs(x) > 1e-9);
    const r = b[i] / a[i];
    if (a.every((x, k) => Math.abs(b[k] - r * x) < 1e-7 * (1 + Math.abs(b[k])))) return 1;
  }
  return cols.length;
}

export function isFinal(cfg, node) {
  if (!node.members?.length) return false;
  const last = node.members[node.members.length - 1];
  if (cfg.eq) {
    const want = cfg.final || 'general';
    const r = constantsRank(cfg, last.node);
    if (want === 'particular') return r === 0 ? true : t('Juste. Donne une seule solution, sans constante.');
    if (r === cfg.eq.order) return true;
    return r < cfg.eq.order ? tn(cfg.eq.order, 'Juste, mais ce n\'est qu\'une solution : ajoute les solutions de l\'équation homogène ({n} constante).', 'Juste, mais ce n\'est qu\'une solution : ajoute les solutions de l\'équation homogène ({n} constantes).') : false;
  }
  const want = cfg.final || 'dist';
  if (want === 'any') return true;
  if (want === 'value') return last.kind === 'value' && !last.holes.length;
  return last.kind === 'dist' && normalDist(cfg, last.node);
}

// ---------- verdicts ----------

function sameAsCandidate(cfg, cand, node) {
  const c = typeof cand === 'string' ? parseLine(cfg, cand) : cand;
  if (!c?.members?.length || !node.members?.length) return false;
  const a = valuesOf(cfg, c.members[c.members.length - 1]);
  const b = valuesOf(cfg, node.members[node.members.length - 1]);
  return a.every((x, k) => close(x, b[k]));
}

export function judgeLine(cfg, prev, input, state = {}) {
  void state;
  let node;
  if (input && typeof input === 'object' && input.t === 'dline') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (node.raw) return { kind: 'parse', message: t('Je n\'arrive pas à lire ta ligne.') };
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  for (const m of node.members) {
    const r = matches(cfg, m);
    if (r === 'yes') continue;
    const diag = diagnoseLine('distrib', prev, node, cfg, (cand, n) => sameAsCandidate(cfg, cand, n));
    const message = r === 'undefined'
      ? t('Je ne peux pas calculer ta ligne sur une fonction test : vérifie l\'écriture (un produit de deux δ, ou D sans rien après ?).')
      : cfg.eq ? t('Ta fonction ne vérifie pas l\'équation : teste-la sur une fonction φ.')
        : m.kind === 'value' ? t('Sur une fonction test φ, ta ligne ne donne pas la même valeur.') : t('Ce n\'est pas la même distribution : sur une fonction test φ, elle ne donne pas la même valeur.');
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

export const start = (cfg) => cfg.start;
export const text = (cfg, node) => node.text;

// ---------- display ----------

const inner = (ml) => ml.replace(/^<math[^>]*>|<\/math>$/g, '');
// φ′(x) shown as φ′(x), not (φ(x))′.
const prettyPhi = (node) => mapNode(node, (n) => (n.t === 'deriv' && stripParen(n.e).t === 'fn' && stripParen(n.e).name === 'φ'
  ? { t: 'fn', name: `φ${'′'.repeat(n.n || 1)}`, args: stripParen(n.e).args } : n));

function memberML(cfg, raw, blanks = null, offset = { n: 0 }) {
  const { text: tt, holes } = takePairs(cfg, raw);
  const mark = (node) => { if (blanks) walk(node, (x) => { if (x.t === 'blank') x.id = offset.n++; return true; }); return node; };
  const node = mark(prettyPhi(parse(phiCalls(tt, vOf(cfg)), popts(cfg))));
  let ml = inner(toMathML(node, blanks ? { blanks } : {}));
  for (const h of holes) {
    const A = inner(toMathML(mark(h.T), blanks ? { blanks } : {}));
    // The test function written alone: φ, φ′ (not φ(x)).
    const bare = mapNode(prettyPhi(h.test), (n) => (n.t === 'fn' && n.name.startsWith('φ') && n.args.length === 1 && stripParen(n.args[0]).t === 'sym' && stripParen(n.args[0]).name === vOf(cfg) ? { t: 'sym', name: n.name } : n));
    const B = inner(toMathML(mark(bare), blanks ? { blanks } : {}));
    ml = ml.replace(`<mi>${h.name}</mi>`, `<mrow><mo>⟨</mo>${A}<mo>,</mo>${B}<mo>⟩</mo></mrow>`);
  }
  return ml;
}

function lineML(cfg, text, blanks = null) {
  const parts = splitTop(norm(text).replace(/^=\s*/, ''), ['=']);
  const offset = { n: 0 };
  return `<mrow>${parts.map((p) => { try { return memberML(cfg, p, blanks, offset); } catch { return `<mtext>${p}</mtext>`; } }).join('<mo>=</mo>')}</mrow>`;
}

export function show(cfg, node, { display } = {}) {
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}">${lineML(cfg, node.text)}</math>`;
}

// A guided line with blanks (□), as MathML (js/ui/lines.js).
export function templateML(cfg, tpl, blanks = {}) {
  return `<math>${lineML(cfg, tpl, blanks)}</math>`;
}

export const valuesFor = (cfg, text) => valuesOf(cfg, readStrict(cfg, text).members.at(-1));
export { refOf };
