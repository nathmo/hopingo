// Simulated floating-point arithmetic with p significant digits (spec §4.3
// `fp.js`, §16.2 `value` {arith: 'fp', digits}, step U9, module N:
// cancellation and absorption « à la main »).
//   fl(x, p)            x rounded to p significant digits, half away from
//                       zero on the decimal writing (31,635 → 31,64), as by
//                       hand
//   fpOp(op, a, b, p)   fl(a op b), op '+' '-' '*' '/'
//   fpSqrt(x, p), fpFn(name, x, p)
//   fpEval(node, p)     a CAS node evaluated with rounding after every
//                       literal and every operation (√1001 − √1000 at 4
//                       digits → 31,64 − 31,62 = 0,02)
//   fpText(x, p)        « 0,01581 » (French comma, at most p significant digits)
//   relErr(exact, approx), lostDigits(a, b) (digits lost by a − b)
//   machineEps(p)       ½·10^(1−p), the unit roundoff of p-digit rounding
//   DOUBLE_EPS          2^−52

export const DOUBLE_EPS = 2 ** -52;

export const machineEps = (p) => 0.5 * 10 ** (1 - p);

// Rounds a decimal digit string (no sign, no point) to n digits, half up.
export function fl(x, p = 4) {
  if (!Number.isFinite(x) || x === 0) return x;
  const sign = x < 0 ? -1 : 1;
  // 15 significant digits: the decimal value a human reads (31.635, not
  // 31.634999…).
  const [mant, ex] = Math.abs(x).toExponential(14).split('e');
  const digits = mant.replace('.', '');
  let e = Number(ex);
  const head = digits.slice(0, p);
  const next = Number(digits[p] ?? '0');
  let n = BigInt(head);
  if (next >= 5) n += 1n;
  let s = n.toString();
  if (s.length > p) { s = s.slice(0, p); e += 1; }
  return sign * Number(`${s[0]}.${s.slice(1) || '0'}e${e}`);
}

export function fpOp(op, a, b, p = 4) {
  const x = fl(a, p);
  const y = fl(b, p);
  switch (op) {
    case '+': return fl(x + y, p);
    case '-': return fl(x - y, p);
    case '*': case '×': return fl(x * y, p);
    case '/': case '÷': return fl(x / y, p);
    default: throw new Error(`fp: opération ${op}`);
  }
}

export const fpSqrt = (x, p = 4) => fl(Math.sqrt(fl(x, p)), p);

const FN = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log, log: Math.log, Log: Math.log,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, arctan: Math.atan, Arctg: Math.atan,
};
export function fpFn(name, x, p = 4) {
  const f = FN[name];
  if (!f) return NaN;
  return fl(f(fl(x, p)), p);
}

// A CAS node (js/cas/ast.js) evaluated in p-digit arithmetic.
export function fpEval(node, p = 4) {
  const E = (n) => fpEval(n, p);
  switch (node.t) {
    case 'num': return fl(node.v.n / node.v.d, p);
    case 'float': return fl(node.x, p);
    case 'const':
      if (node.name === 'pi') return fl(Math.PI, p);
      if (node.name === 'e') return fl(Math.E, p);
      return NaN;
    case 'paren': return E(node.e);
    case 'neg': return -E(node.e);
    case 'bin': {
      const op = { '+': '+', '-': '-', '×': '*', '÷': '/' }[node.op] ?? node.op;
      return fpOp(op, E(node.l), E(node.r), p);
    }
    case 'add': {
      let s = 0;
      node.terms.forEach((t, i) => { s = i === 0 ? E(t) : fl(s + E(t), p); });
      return s;
    }
    case 'frac': return fpOp('/', E(node.n), E(node.d), p);
    case 'pow': {
      const b = E(node.b);
      const e = E(node.e);
      if (Number.isInteger(e) && e > 0 && e <= 12) {
        let r = b;
        for (let k = 1; k < e; k++) r = fl(r * b, p);
        return r;
      }
      return fl(b ** e, p);
    }
    case 'sqrt': return fpSqrt(E(node.e), p);
    case 'root': return fl(E(node.e) ** (1 / E(node.n)), p);
    case 'abs': return Math.abs(E(node.e));
    case 'fn': return node.args.length === 1 ? fpFn(node.name, E(node.args[0]), p) : NaN;
    default: return NaN;
  }
}

// French writing of a p-digit value: 31,64 ; 0,01581 ; 1,5·10⁻⁶ stays
// decimal up to 10⁻⁶.
export function fpText(x, p = 4) {
  if (!Number.isFinite(x)) return String(x);
  const y = fl(x, p);
  let s = String(y);
  if (/e/.test(s)) s = y.toFixed(Math.min(20, Math.max(0, p - 1 - Math.floor(Math.log10(Math.abs(y)))))).replace(/0+$/, '').replace(/\.$/, '');
  return s.replace('.', ',').replace('-', '−');
}

export const relErr = (exact, approx) => Math.abs(exact - approx) / Math.abs(exact);

// Significant digits lost when subtracting b from a (≈ log10 |a|/|a − b|).
export function lostDigits(a, b) {
  const d = Math.abs(a - b);
  if (d === 0) return Infinity;
  return Math.max(0, Math.floor(Math.log10(Math.max(Math.abs(a), Math.abs(b)) / d)));
}

// Equal as p-digit numbers.
export const sameFp = (a, b, p = 4) => fl(a, p) === fl(b, p);
