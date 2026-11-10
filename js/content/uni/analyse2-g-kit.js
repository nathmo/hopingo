// Helpers of module A2, part g (step U6): exact values of the integrals of
// the part (closed numbers built from the answer), the judges of a change
// to polar, cylindrical or spherical coordinates, and the texts shown.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { evalFloat } from '../../cas/numeric.js';
import { closedNumber } from '../../cas/closedform.js';
import { MT as MTk } from './kit.js';
import { toText } from '../../cas/print.js';
import { blankLine } from '../../judges/lines.js';

export const q = (n, d = 1) => new Q(n, d);

// ---------- closed numbers ----------
// [{q: Q, f: [factor…]}]; factors: '√2', '√3', 'π', '√π', 'e^k' (k ≠ 0),
// 'ln(p)' (p prime). Sums of such terms are what closedNumber accepts.

const isRad = (f) => /^√\d+$/.test(f);
const RANK = (f) => (isRad(f) ? 0 : f === 'π' ? 1 : f === '√π' ? 2 : f.startsWith('e^') ? 3 : 4);
const FVAL = (f) => {
  if (isRad(f)) return Math.sqrt(Number(f.slice(1)));
  if (f === 'π') return Math.PI;
  if (f === '√π') return Math.sqrt(Math.PI);
  if (f.startsWith('e^')) return Math.exp(Number(f.slice(2)));
  return Math.log(Number(f.slice(3, -1)));
};

// Factors multiplied out: √2·√2 = 2, π·… kept, e^a·e^b = e^(a+b).
function simplify(t) {
  let { q: c } = t;
  const rest = [];
  let ek = 0;
  const rads = new Map();
  let sqrtPi = 0;
  for (const f of t.f) {
    if (f.startsWith('e^')) ek += Number(f.slice(2));
    else if (isRad(f)) rads.set(f, (rads.get(f) || 0) + 1);
    else if (f === '√π') sqrtPi++;
    else rest.push(f);
  }
  for (const [f, k] of rads) {
    c = c.mul(q(Number(f.slice(1)) ** Math.floor(k / 2)));
    if (k % 2) rest.push(f);
  }
  for (let i = 0; i < Math.floor(sqrtPi / 2); i++) rest.push('π');
  if (sqrtPi % 2) rest.push('√π');
  if (ek) rest.push(`e^${ek}`);
  return { q: c, f: rest.sort((a, b) => RANK(a) - RANK(b) || a.localeCompare(b)) };
}

function norm(terms) {
  const map = new Map();
  for (const t0 of terms) {
    const t = simplify(t0);
    const key = t.f.join('·');
    map.set(key, map.has(key) ? { q: map.get(key).q.add(t.q), f: t.f } : t);
  }
  return [...map.values()].filter((t) => t.q.n !== 0);
}

export const cn = (c, ...f) => norm([{ q: Q.of(c), f }]);
export const cadd = (...xs) => norm(xs.flat());
export const cneg = (a) => a.map((t) => ({ q: t.q.neg(), f: t.f }));
export const csub = (a, b) => cadd(a, cneg(b));
export const cmul = (...xs) => xs.reduce((a, b) => norm(a.flatMap((s) => b.map((t) => ({ q: s.q.mul(t.q), f: [...s.f, ...t.f] })))), cn(1));
export const cscale = (a, c) => cmul(a, cn(c));
export const cfloat = (a) => a.reduce((s, t) => s + t.q.valueOf() * t.f.reduce((p, f) => p * FVAL(f), 1), 0);
export const czero = (a) => a.length === 0;
export const crational = (a) => a.every((t) => t.f.length === 0);

const ftext = (f) => (f.startsWith('e^') ? (f === 'e^1' ? 'e' : Number(f.slice(2)) < 0 ? `e^(${f.slice(2)})` : `e^${f.slice(2)}`) : f);
// One term without its sign.
function termText(t) {
  const body = t.f.map(ftext).join('');
  const n = Math.abs(t.q.n);
  const top = body ? (n === 1 ? body : `${n}${body}`) : String(n);
  return t.q.d === 1 ? top : `${top}/${t.q.d}`;
}
// Terms with the most factors first: 4π ln 2 − 3π/2, 2π − √2π.
export function ctext(a) {
  if (!a.length) return '0';
  const ts = [...a].sort((x, y) => (x.q.n < 0) - (y.q.n < 0) || y.f.length - x.f.length);
  return ts.map((t, i) => `${t.q.n < 0 ? '-' : i ? '+' : ''}${termText(t)}`).join('');
}
// As a factor of a product: (8/3), 2, (4ln(2)−3/2).
export const cfac = (a) => { const s = ctext(a); return /^[0-9]+$/.test(s) || (a.length === 1 && a[0].q.d === 1 && a[0].q.n > 0) ? s : `(${s})`; };

// The text is a closed number of the right value (a safety net of the generators).
export function closedOk(a) {
  const text = ctext(a);
  const n = parse(text);
  return closedNumber(n) === true && Math.abs(evalFloat(n, {}) - cfloat(a)) <= 1e-9 * (1 + Math.abs(cfloat(a)));
}

// ln k, k a whole number ≥ 1, in prime logarithms.
export function cln(k) {
  const out = [];
  let m = k;
  for (let p = 2; p <= m; p++) {
    let e = 0;
    while (m % p === 0) { m /= p; e++; }
    if (e) out.push({ q: q(e), f: [`ln(${p})`] });
  }
  return norm(out);
}

// ---------- angles ----------
// An angle k·π, k a fraction; sin and cos at multiples of π/4 (and π/6).
const S2 = (c) => cn(c, '√2');
const S3 = (c) => cn(c, '√3');
function sinPi(k) {
  const x = ((k.n % (2 * k.d)) + 2 * k.d) % (2 * k.d); // k mod 2, numerator over k.d
  const t = q(x, k.d);
  const table = {
    0: cn(0), '1/6': cn(q(1, 2)), '1/4': S2(q(1, 2)), '1/3': S3(q(1, 2)), '1/2': cn(1), '2/3': S3(q(1, 2)), '3/4': S2(q(1, 2)),
    '5/6': cn(q(1, 2)), 1: cn(0), '7/6': cn(q(-1, 2)), '5/4': S2(q(-1, 2)), '4/3': S3(q(-1, 2)), '3/2': cn(-1), '5/3': S3(q(-1, 2)), '7/4': S2(q(-1, 2)), '11/6': cn(q(-1, 2)),
  };
  const v = table[t.toString()];
  if (!v) throw new Error(`sin(${t}π)`);
  return v;
}
const cosPi = (k) => sinPi(k.add(q(1, 2)));

// ∫ from aπ to bπ of cos^i·sin^j (i + j ≤ 2; or sin³ for the cylinder of
// x² + y²): an exact number.
export function angInt(i, j, a, b) {
  const L = cn(b.sub(a), 'π');
  if (i === 0 && j === 0) return L;
  if (i === 1 && j === 0) return csub(sinPi(b), sinPi(a));
  if (i === 0 && j === 1) return csub(cosPi(a), cosPi(b));
  const s2 = csub(sinPi(b.mul(2)), sinPi(a.mul(2)));
  if (i === 2 && j === 0) return cadd(cscale(L, q(1, 2)), cscale(s2, q(1, 4)));
  if (i === 0 && j === 2) return csub(cscale(L, q(1, 2)), cscale(s2, q(1, 4)));
  if (i === 1 && j === 1) return cscale(csub(cmul(sinPi(b), sinPi(b)), cmul(sinPi(a), sinPi(a))), q(1, 2));
  // cos²·sin (spherical z²): [−cos³/3]; cos·sin: as above.
  if (i === 2 && j === 1) return cscale(csub(cmul(cosPi(a), cosPi(a), cosPi(a)), cmul(cosPi(b), cosPi(b), cosPi(b))), q(1, 3));
  // cos·sin²: [sin³/3]; cos³: [sin − sin³/3].
  if (i === 1 && j === 2) return cscale(csub(cmul(sinPi(b), sinPi(b), sinPi(b)), cmul(sinPi(a), sinPi(a), sinPi(a))), q(1, 3));
  if (i === 3 && j === 0) {
    const F = (k) => csub(sinPi(k), cscale(cmul(sinPi(k), sinPi(k), sinPi(k)), q(1, 3)));
    return csub(F(b), F(a));
  }
  // sin³: [−cos + cos³/3].
  if (i === 0 && j === 3) {
    const F = (k) => cadd(cneg(cosPi(k)), cscale(cmul(cosPi(k), cosPi(k), cosPi(k)), q(1, 3)));
    return csub(F(b), F(a));
  }
  throw new Error(`angInt ${i} ${j}`);
}

// kπ as text: π/4, −π/2, 2π, 0.
export function piText(k) {
  k = Q.of(k);
  if (k.n === 0) return '0';
  const a = Math.abs(k.n);
  return `${k.n < 0 ? '-' : ''}${a === 1 ? '' : a}π${k.d === 1 ? '' : `/${k.d}`}`;
}

// ---------- radii ----------
// A radius: a whole number, or 'e'.
export const rText = (R) => String(R);
export const rVal = (R) => (R === 'e' ? Math.E : R);
// R^k as a closed number.
export const rPow = (R, k) => (k === 0 ? cn(1) : R === 'e' ? cn(1, `e^${k}`) : cn(q(R ** Math.max(k, 0), R ** Math.max(-k, 0))));
// ∫ from R1 to R2 of r^n dr (n ≥ 0).
export const powInt = (n, R1, R2) => cscale(csub(rPow(R2, n + 1), rPow(R1, n + 1)), q(1, n + 1));
// ln R as a closed number.
export const rLn = (R) => (R === 'e' ? cn(1) : R === 1 ? cn(0) : cln(R));

// ---------- texts ----------
export const fr = (s) => String(s).replace(/-/g, '−');
// A product of factors as text, the empty ones skipped: r^2×sin(φ).
export const prod = (...fs) => fs.filter((f) => f && f !== '1').join('×') || '1';
// r^k as text.
export const rk = (k, v = 'r') => (k === 0 ? '1' : k === 1 ? v : `${v}^${k}`);
// cos(φ)^i as text.
export const trig = (fn, i, v = 'φ') => (i === 0 ? '' : i === 1 ? `${fn}(${v})` : `${fn}(${v})^${i}`);

// ---------- judges ----------
const SUBST = {
  polar: { x: 'r×cos(φ)', y: 'r×sin(φ)' },
  cyl: { x: 'r×cos(φ)', y: 'r×sin(φ)' },
  sph: { x: 'r×sin(θ)×cos(φ)', y: 'r×sin(θ)×sin(φ)', z: 'r×cos(θ)' },
};
export const JAC = { polar: 'r', cyl: 'r', sph: 'r^2×sin(θ)' };
const NEW = { polar: ['r', 'φ'], cyl: ['r', 'φ', 'z'], sph: ['r', 'θ', 'φ'] };
const OLD = { polar: ['x', 'y'], cyl: ['x', 'y', 'z'], sph: ['x', 'y', 'z'] };

// The integrand with its jacobian: `from` in x, y(, z) → in the new variables.
export function jacJudge(coords, from, { rMax = 3, extra = {} } = {}) {
  const domain = { r: [0.1, rMax], φ: [0, 6.28] };
  if (coords === 'sph') domain.θ = [0.05, 3.1];
  if (coords === 'cyl') domain.z = [-2, 3];
  return {
    kind: 'equiv', vars: [...OLD[coords], ...NEW[coords]].filter((v, i, a) => a.indexOf(v) === i),
    subst: SUBST[coords], jac: { from, factor: JAC[coords] }, domain, target: 'only', finalVars: NEW[coords], ...extra,
  };
}

// Bounds in the given coordinates (judge `domain`).
export function domJudge(coords, region, box, refLine, extra = {}) {
  return { kind: 'domain', coords, region, box, refLine, ...extra };
}

export const DEF = (extra = {}) => ({ kind: 'definite', ...extra });
// A `definite` part whose start (an iterated integral) has the exact value
// the generator computed: the judge does not need its quadrature.
export const defKnown = (start, value, extra = {}) => ({ kind: 'definite', known: { [toText(parse(start))]: ctext(value) }, ...extra });
export const defText = (start, valueText, extra = {}) => ({ kind: 'definite', known: { [toText(parse(start))]: valueText }, ...extra });
// A number equal to the previous one, any writing (a step that leaves
// integrals in the line: « π·∫₁² 2r ln r dr »).
export const SAME = { kind: 'equiv', vars: [], target: 'any' };

// A domain line with some bounds left blank: picks = [[chain index, 'lo' | 'hi']].
export function blankChain(math, picks, vars) {
  const node = parse(math, { vars });
  const items = node.t === 'list' ? node.items : [node];
  const holes = picks.map(([i, side]) => {
    const c = items[i].t === 'paren' ? items[i].e : items[i];
    return c.items[side === 'lo' ? 0 : 2];
  });
  return blankLine(node, holes, { vars });
}
// The last factor of a product left blank (the jacobian of « (r sin φ)·r »).
export function blankLast(math, vars) {
  const node = parse(math, { vars });
  return { math: toText(node), ...blankLine(node, [node.r], { vars }) };
}

// True or false as a two-option multiple choice (no counter-example
// checker fits a statement about coordinates or a formula): exam format tf.
export function vfItem(mcqFn, { skill, statement, truth, rule = null, why, key }, rng) {
  return mcqFn({
    skill, level: 4, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : rule }, { html: 'Faux', correct: !truth, rule: truth ? rule : null }],
    key: `tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

// ---------- polynomials in r (inner integrals of the cylinder) ----------
// {k: Q} → text in increasing degree: 4 − r², r²/2 − r⁴/4.
export function polyText(p, v = 'r') {
  const ks = Object.keys(p).map(Number).filter((k) => p[k].n !== 0).sort((a, b) => a - b);
  if (!ks.length) return '0';
  return ks.map((k, i) => {
    const c = p[k];
    const a = c.n < 0 ? c.neg() : c;
    const mono = rk(k, v);
    let t;
    if (k === 0) t = a.toString();
    else if (a.eq(1)) t = mono;
    else if (a.d === 1) t = `${a.n}${mono}`;
    else t = `${a.n === 1 ? '' : a.n}${mono}/${a.d}`;
    return `${c.n < 0 ? '-' : i ? '+' : ''}${t}`;
  }).join('');
}
export const polyMul = (a, b) => {
  const out = {};
  for (const i of Object.keys(a)) for (const j of Object.keys(b)) { const k = Number(i) + Number(j); out[k] = (out[k] || q(0)).add(a[i].mul(b[j])); }
  return out;
};
export const polyPrim = (p) => Object.fromEntries(Object.entries(p).map(([k, c]) => [Number(k) + 1, c.mul(q(1, Number(k) + 1))]));
// ∫ from 0 to R of p (R whole).
export const polyInt0 = (p, R) => Object.entries(p).reduce((s, [k, c]) => s.add(c.mul(q(R ** (Number(k) + 1), Number(k) + 1))), q(0));
// A whole line left blank.
export const blankAll = (math, vars) => { const node = parse(math, { vars }); return { math: toText(node), ...blankLine(node, [node], { vars }) }; };
// The line « f(new variables)·jacobian » with the jacobian left blank.
export const jacBlank = (sub, jac, vars) => {
  // Outer brackets that wrap the whole text are dropped: « (√(18 − r²) − r) ».
  let s0 = sub;
  if (s0.startsWith('(') && s0.endsWith(')')) {
    let depth = 0;
    let whole = true;
    for (let i = 0; i < s0.length - 1; i++) {
      depth += s0[i] === '(' ? 1 : s0[i] === ')' ? -1 : 0;
      if (depth === 0) { whole = false; break; }
    }
    if (whole) s0 = s0.slice(1, -1);
  }
  if (s0 === '1') return blankAll(jac, vars);
  const n = parse(s0, { vars });
  const sum = (n.t === 'bin' && (n.op === '+' || n.op === '-')) || n.t === 'add' || n.t === 'neg';
  return blankLast(`${sum ? `(${s0})` : s0}×${jac.includes('×') ? `(${jac})` : jac}`, vars);
};
// The integrand of an integral as MathML, in brackets when it is a sum.
export function integrandML(cart, vars) {
  const n = parse(cart, { vars });
  const sum = (n.t === 'bin' && (n.op === '+' || n.op === '-')) || n.t === 'add';
  return MTk(sum ? `(${cart})` : cart, { vars });
}
