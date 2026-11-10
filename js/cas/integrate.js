// Numeric integration (spec §3 integrate.js, §16.1 « intégrales dans
// evalFloat »), step U2. Double-exponential quadrature: tanh-sinh on a
// segment, exp-sinh on a half-line, sinh-sinh on ℝ. It never evaluates the
// ends, so integrable singularities there (1/√x at 0⁺, ln x) are fine.
//
//   quad(f, a, b, {tol}) → number (NaN if f is undefined inside the
//     interval, or if the estimates do not settle: a divergent integral)
// a and b may be ±Infinity.

const HALF_PI = Math.PI / 2;
const MAX_LEVEL = 8;

// One rule: nodes x(t) and weights w(t) for t = k·h.
function rule(kind, a, b) {
  if (kind === 'finite') {
    const c = (a + b) / 2;
    const d = (b - a) / 2;
    return (t) => {
      const s = HALF_PI * Math.sinh(t);
      const ch = Math.cosh(s);
      // Distance to the nearest end, without cancellation.
      const delta = 2 / (Math.exp(2 * Math.abs(s)) + 1);
      const x = t > 0 ? b - d * delta : t < 0 ? a + d * delta : c;
      return { x, w: (d * HALF_PI * Math.cosh(t)) / (ch * ch), edge: delta * d };
    };
  }
  if (kind === 'right') return (t) => { const e = Math.exp(HALF_PI * Math.sinh(t)); return { x: a + e, w: HALF_PI * Math.cosh(t) * e, edge: e }; };
  if (kind === 'left') return (t) => { const e = Math.exp(HALF_PI * Math.sinh(t)); return { x: b - e, w: HALF_PI * Math.cosh(t) * e, edge: e }; };
  return (t) => { const s = HALF_PI * Math.sinh(t); return { x: Math.sinh(s), w: HALF_PI * Math.cosh(t) * Math.cosh(s), edge: Infinity }; };
}

export function quad(f, a, b, { tol = 1e-11 } = {}) {
  if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
  if (a === b) return 0;
  if (a > b) return -quad(f, b, a, { tol });
  const kind = Number.isFinite(a) && Number.isFinite(b) ? 'finite'
    : Number.isFinite(a) ? 'right' : Number.isFinite(b) ? 'left' : 'both';
  const R = rule(kind, a, b);
  let bad = false;
  const term = (t) => {
    const { x, w, edge } = R(t);
    if (!Number.isFinite(x) || !Number.isFinite(w) || w === 0 || edge === 0) return 0;
    if (kind === 'finite' && (x <= a || x >= b)) return 0;
    const y = f(x);
    if (!Number.isFinite(y)) {
      // Very close to a singular end, a value may overflow: skip it.
      // On a half-line, far values may overflow too (e^(2x) at x = 400).
      if (Math.abs(t) > 2.5 || (kind !== 'finite' && Math.abs(t) > 1)) return 0;
      bad = true;
      return 0;
    }
    return w * y;
  };
  // Terms on both sides until they vanish.
  const side = (h, start, step) => {
    let s = 0;
    let small = 0;
    for (let k = start; k * h <= 6.5; k += step) {
      const t = k * h;
      const p = term(t);
      const m = term(-t);
      s += p + m;
      if (Math.abs(p) + Math.abs(m) < 1e-18 * (1 + Math.abs(s))) { if (++small >= 3 && t > 1) break; } else small = 0;
    }
    return s;
  };
  let h = 1;
  let sum = term(0) + side(h, 1, 1);
  let est = h * sum;
  let prev = NaN;
  for (let level = 1; level <= MAX_LEVEL; level++) {
    h /= 2;
    sum += side(h, 1, 2);
    const next = h * sum;
    if (bad) return NaN;
    if (level >= 3 && Math.abs(next - est) <= tol * (1 + Math.abs(next))) return next;
    prev = est;
    est = next;
  }
  // Not settled: accept a value that changed little at the last level.
  return Math.abs(est - prev) <= 1e-7 * (1 + Math.abs(est)) ? est : NaN;
}
