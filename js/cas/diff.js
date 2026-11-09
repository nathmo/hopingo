// Symbolic derivatives (spec §4.3): diff, pdiff, and expandDerivs, which
// replaces every d(…) node of a line by its value.
//
// Two extras serve the line judge, the solutions and the traps:
//   ruleOf(e, v)            which rule differentiates e: sum, product, chain…
//   stepDeriv(e, v, hooks)  applies that one rule, leaving the inner
//                           derivatives as d(…) nodes: one line of a solution
// `hooks` replace a rule by a wrong one (§7): product(u, w, du, dw),
// quotient(u, w, du, dw), chain(outer, inner, dInner, composed). Without hooks the
// rules are the right ones.

import {
  num, lit, neg, add, sub, mul, div, pow, sqrt, fn, deriv, numValue, dependsOn, mapNode, contains,
  stripParen, canonFn,
} from './ast.js';

const paren = (e) => (e.t === 'bin' || e.t === 'neg' ? { t: 'paren', e } : e);

// f′(u) for the outer function of e = f(u). Returns null if e is not a
// composition the table knows.
export function outerDerivative(e) {
  e = stripParen(e);
  if (e.t === 'pow') {
    const k = numValue(e.e);
    if (k) return mul(lit(k), pow(e.b, lit(k.sub(1))));
    const vb = numValue(e.b);
    if (e.b.t === 'const' && e.b.name === 'e') return e;
    if (vb) return mul(e, fn('ln', e.b));
    return null;
  }
  if (e.t === 'sqrt') return div(num(1), mul(num(2), e));
  if (e.t === 'root') {
    const k = numValue(e.n);
    return div(num(1), mul(lit(k), pow(e, lit(k.sub(1)))));
  }
  if (e.t === 'abs') return div(e.e, e);
  if (e.t !== 'fn' || e.args.length !== 1) return null;
  const u = e.args[0];
  const T = TABLE[canonFn(e.name)];
  return T ? T(u, e) : null;
}

const TABLE = {
  sin: (u) => fn('cos', u),
  cos: (u) => neg(fn('sin', u)),
  tan: (u) => div(num(1), pow(fn('cos', u), num(2))),
  cot: (u) => neg(div(num(1), pow(fn('sin', u), num(2)))),
  exp: (u, e) => e,
  ln: (u) => div(num(1), paren(u)),
  sinh: (u) => fn('cosh', u),
  cosh: (u) => fn('sinh', u),
  tanh: (u) => div(num(1), pow(fn('cosh', u), num(2))),
  arcsin: (u) => div(num(1), sqrt({ t: 'paren', e: sub(num(1), pow(paren(u), num(2))) })),
  arccos: (u) => neg(div(num(1), sqrt({ t: 'paren', e: sub(num(1), pow(paren(u), num(2))) }))),
  arctan: (u) => div(num(1), add(num(1), pow(paren(u), num(2)))),
  argsh: (u) => div(num(1), sqrt({ t: 'paren', e: add(pow(paren(u), num(2)), num(1)) })),
  argch: (u) => div(num(1), sqrt({ t: 'paren', e: sub(pow(paren(u), num(2)), num(1)) })),
  argth: (u) => div(num(1), sub(num(1), pow(paren(u), num(2)))),
};

// The inside of a composition f(u), or null.
export function innerOf(e) {
  e = stripParen(e);
  if (e.t === 'pow') return numValue(e.e) ? e.b : numValue(e.b) || (e.b.t === 'const' && e.b.name === 'e') ? e.e : null;
  if (e.t === 'sqrt' || e.t === 'root' || e.t === 'abs') return e.e;
  if (e.t === 'fn' && e.args.length === 1) return e.args[0];
  return null;
}

const isVar = (u, v) => { u = stripParen(u); return u.t === 'sym' && u.name === v && !u.sub; };

export function isPolynomialIn(node, v) {
  switch (node.t) {
    case 'num': case 'const': return true;
    case 'sym': return true;
    case 'paren': case 'neg': return isPolynomialIn(node.e, v);
    case 'bin':
      if (node.op === '÷') return !dependsOn(node.r, v) && isPolynomialIn(node.l, v);
      return isPolynomialIn(node.l, v) && isPolynomialIn(node.r, v);
    case 'frac': return !dependsOn(node.d, v) && isPolynomialIn(node.n, v);
    case 'pow': {
      if (!dependsOn(node, v)) return true;
      const k = numValue(node.e);
      return !!k && k.isInt() && k.n >= 0 && isPolynomialIn(node.b, v);
    }
    default: return !dependsOn(node, v);
  }
}

// A sum of terms k·vⁿ: its derivative is read from the table in one go.
// (x²+1)³ or x·(x+1) are polynomials too, but they are taught with the
// chain or product rule.
function isSimplePoly(node, v) {
  const term = (n) => {
    n = stripParen(n);
    if (n.t === 'neg') return term(n.e);
    if (!dependsOn(n, v)) return true;
    if (isVar(n, v)) return true;
    if (n.t === 'pow') { const k = numValue(n.e); return isVar(n.b, v) && !!k && k.isInt() && k.n >= 0; }
    if (n.t === 'bin' && n.op === '×') return (!dependsOn(n.l, v) && term(n.r)) || (!dependsOn(n.r, v) && term(n.l));
    if (n.t === 'frac') return !dependsOn(n.d, v) && term(n.n);
    return false;
  };
  const sum = (n) => {
    n = stripParen(n);
    if (n.t === 'bin' && (n.op === '+' || n.op === '-')) return sum(n.l) && sum(n.r);
    return term(n);
  };
  return sum(node);
}

// Which rule differentiates e with respect to v.
export function ruleOf(e, v) {
  e = stripParen(e);
  if (!dependsOn(e, v)) return 'const';
  if (isVar(e, v)) return 'var';
  if (e.t === 'neg') return 'linear';
  if (isSimplePoly(e, v)) return 'poly';
  if (e.t === 'bin' && (e.op === '+' || e.op === '-')) return 'sum';
  if (e.t === 'bin' && e.op === '×') return !dependsOn(e.l, v) || !dependsOn(e.r, v) ? 'constfactor' : 'product';
  if (e.t === 'frac' || (e.t === 'bin' && e.op === '÷')) {
    const d = e.t === 'frac' ? e.d : e.r;
    return dependsOn(d, v) ? 'quotient' : 'constfactor';
  }
  if (e.t === 'deriv') return 'nested';
  const inner = innerOf(e);
  if (!inner) return e.t === 'pow' ? 'general' : 'unknown';
  return isVar(inner, v) ? 'table' : 'chain';
}

export function diff(node, v = 'x', hooks = {}) {
  const D = (n) => diff(n, v, hooks);
  if (!dependsOn(node, v)) return num(0);
  switch (node.t) {
    case 'sym': return num(1);
    case 'paren': return D(node.e);
    case 'neg': return neg(D(node.e));
    case 'bin': {
      const { l, r } = node;
      if (node.op === '+') return add(D(l), D(r));
      if (node.op === '-') return sub(D(l), D(r));
      if (node.op === '×') {
        if (!dependsOn(l, v)) return mul(l, D(r));
        if (!dependsOn(r, v)) return mul(D(l), r);
        return hooks.product ? hooks.product(l, r, D(l), D(r)) : add(mul(D(l), r), mul(l, D(r)));
      }
      return quotient(l, r, D, hooks, v);
    }
    case 'frac': return quotient(node.n, node.d, D, hooks, v);
    case 'pow': {
      const { b, e } = node;
      if (dependsOn(b, v) && dependsOn(e, v)) {
        return mul(node, add(mul(D(e), fn('ln', paren(b))), div(mul(e, D(b)), paren(b))));
      }
      return chain(node, D, hooks, v);
    }
    case 'sqrt': case 'root': case 'abs': case 'fn': return chain(node, D, hooks, v);
    case 'deriv': {
      let inner = node.e;
      for (let i = 0; i < node.n; i++) inner = diff(inner, node.v);
      return D(inner);
    }
    case 'rel': return { t: 'rel', op: node.op, l: D(node.l), r: D(node.r) };
    default: throw new Error(`Je ne sais pas dériver ${node.t}`);
  }
}

function quotient(n, d, D, hooks, v) {
  if (!dependsOn(d, v)) return div(D(n), d);
  if (hooks.quotient) return hooks.quotient(n, d, D(n), D(d));
  if (!dependsOn(n, v)) return neg(div(mul(n, D(d)), pow(paren(d), num(2))));
  return div(sub(mul(D(n), paren(d)), mul(paren(n), D(d))), pow(paren(d), num(2)));
}

function chain(node, D, hooks, v) {
  const outer = outerDerivative(node);
  if (!outer) throw new Error('Fonction inconnue');
  const inner = innerOf(node);
  if (isVar(inner, v)) return outer;
  if (hooks.chain) return hooks.chain(outer, inner, D(inner), node);
  return mul(outer, D(inner));
}

// Partial derivatives in turn: pdiff(f, ['x', 'y']) = ∂²f/∂y∂x.
export const pdiff = (node, vs) => vs.reduce((n, v) => diff(n, v), node);

export const hasDeriv = (node) => contains(node, (n) => n.t === 'deriv');

// Every d(…) of a line replaced by its value.
export function expandDerivs(node) {
  if (!hasDeriv(node)) return node;
  return mapNode(node, (n) => {
    if (n.t !== 'deriv') return n;
    let e = n.e;
    for (let i = 0; i < n.n; i++) e = diff(e, n.v);
    return e.t === 'sym' ? e : { t: 'paren', e };
  });
}

// One rule applied to d(e): the inner derivatives stay as d(…), except the
// derivatives of constants, of v itself and of polynomials, which are
// written out. Returns {node, rule}.
export function stepDeriv(e, v = 'x', hooks = {}) {
  e = stripParen(e);
  const rule = ruleOf(e, v);
  const D = (u) => {
    const r = ruleOf(u, v);
    if (r === 'const') return num(0);
    if (r === 'var') return num(1);
    return deriv(stripParen(u), v);
  };
  let node;
  switch (rule) {
    case 'const': node = num(0); break;
    case 'var': node = num(1); break;
    case 'poly': node = diff(e, v); break;
    case 'linear': node = neg(D(e.e)); break;
    case 'sum': node = e.op === '+' ? add(D(e.l), D(e.r)) : sub(D(e.l), D(e.r)); break;
    case 'constfactor': {
      if (e.t === 'bin' && e.op === '×') node = dependsOn(e.l, v) ? mul(D(e.l), e.r) : mul(e.l, D(e.r));
      else node = div(D(e.t === 'frac' ? e.n : e.l), e.t === 'frac' ? e.d : e.r);
      break;
    }
    case 'product': node = hooks.product ? hooks.product(e.l, e.r, D(e.l), D(e.r)) : add(mul(D(e.l), e.r), mul(e.l, D(e.r))); break;
    case 'quotient': {
      const n = e.t === 'frac' ? e.n : e.l;
      const d = e.t === 'frac' ? e.d : e.r;
      node = hooks.quotient ? hooks.quotient(n, d, D(n), D(d))
        : div(sub(mul(D(n), paren(d)), mul(paren(n), D(d))), pow(paren(d), num(2)));
      break;
    }
    case 'table': node = outerDerivative(e); break;
    case 'chain': {
      const outer = outerDerivative(e);
      const inner = innerOf(e);
      node = hooks.chain ? hooks.chain(outer, inner, D(inner), e) : mul(outer, D(inner));
      break;
    }
    default: node = diff(e, v); break;
  }
  return { node, rule };
}

