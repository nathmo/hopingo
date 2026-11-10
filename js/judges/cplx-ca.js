// Two judges of module C, part a (step U10), registered in judges/index.js
// as `cvalue` and `cfamily`.
//
// cvalue: a line is right if it has the same complex value as the previous
// line (or as cfg.expect), like the judge `complex`, with three additions:
//   - ∫ and Σ in a line are computed numerically (Gauss-Legendre on a
//     complex integrand; partial sums, with the acceleration of
//     cas/numeric.js for a real Σ), and d(…) is expanded;
//   - sample letters: cfg.real (real letters t, x, y, z on the real axis,
//     in cfg.domain), cfg.cz (complex letters sampled in a box), cfg.z =
//     true (z stands for x + iy, with x, y in cfg.real);
//   - final forms that the course writes: e^(−π/2), 2πi·e^(2i), cosh(2),
//     x² + i·xy, a Σ in powers of z, partial fractions.
// cfg: {kind: 'cvalue', complex: true, vars: [every letter of the lines,
//       for reading], real?, domain?, cz?, z?, expect?: text (the value
//       asked, whatever the previous line), raw?: {text, html} (a start that
//       is not a value: « ∮_Γ f dz », shown as html), alt?: {v: [lo, hi]}
//       (where the traps of a series are compared when the line diverges),
//       final?: 'closed' (default) | 'any' | 'z' (no x, y left) | 'split'
//       (one term in i: u + i·v) | 'series'
//       | 'pfd' | 'number', goal?: text (a final line is at most about as
//       long), traps?: {id: [texts]} (wrong lines written by the generator)}
//
// cfamily: equations in z solved with w = e^z (or e^(iz)): the lines are
// an equation in z, an equation in w, roots w = …, or a family
// « z = z₀ + 2kπi ou z = z₁ + 2kπi ; k ∈ ℤ » (« , k ∈ ℤ » is read too). A
// line is right if it has the solutions of the reference: an equation in z
// holds at every reference solution and is not an identity; an equation in
// w has the reference roots (exactly when it is polynomial, else it holds
// at each root and is not an identity); a family line is the reference
// set: each family a + bk with b = ±period and a a solution, every
// reference family met, no point outside. A family line short of the
// families (a finite list, a step 4kπi) is wrong (trap c_exp_periodic).
// cfg: {kind: 'cfamily', complex: true, vars: ['z', 'w', 'k'], sols:
//       [texts] (one solution per family), period: '2πi', roots?: [texts of
//       w], final: 'poly' (an expanded polynomial equation in w, = 0) |
//       'family' (the families, bases in closed form, with k ∈ ℤ)}

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { walk, mapNode, stripParen, unparen, contains, symbolsIn, canonFn, numValue, lit } from '../cas/ast.js';
import { Q } from '../math/rational.js';
import { evalFloat } from '../cas/numeric.js';
import { expandDerivs } from '../cas/diff.js';
import { closedNumber } from '../cas/closedform.js';
import { exactValue } from '../cas/normal.js';
import { complexValue, evalComplex, sameComplex, cText, cabs, algebraicParts } from '../cas/complex.js';
import { polyOf, coeffs, I } from '../cas/polyx.js';
import { solutionsOf, sameSolutions } from './complex.js';
import { diagnoseLine } from './diagnose.js';
import { sameLine } from './common.js';
import { makeRng } from '../content/random.js';

const fr = (s) => String(s).replace(/-/g, '−');
const fnum = (x) => String(Math.round(x * 100) / 100).replace('.', ',').replace('-', '−');

// ======================================================================
// numeric values with ∫ and Σ
// ======================================================================

const GL_X = [-0.9602898564975363, -0.7966664774136267, -0.525532409916329, -0.1834346424956498, 0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363];
const GL_W = [0.1012285362903763, 0.2223810344533745, 0.3137066458778873, 0.3626837833783620, 0.3626837833783620, 0.3137066458778873, 0.2223810344533745, 0.1012285362903763];
const NAN = { re: NaN, im: NaN };
const okC = (z) => !!z && Number.isFinite(z.re) && Number.isFinite(z.im);

function integrate(n, env) {
  const a = evalAt(n.lo, env);
  const b = evalAt(n.hi, env);
  if (!okC(a) || !okC(b) || Math.abs(a.im) > 1e-12 || Math.abs(b.im) > 1e-12) return NAN;
  const M = 24;
  const h = (b.re - a.re) / M;
  let re = 0;
  let im = 0;
  for (let j = 0; j < M; j++) {
    const mid = a.re + (j + 0.5) * h;
    for (let q = 0; q < GL_X.length; q++) {
      const f = evalAt(n.e, { ...env, [n.v]: mid + (GL_X[q] * h) / 2 });
      if (!okC(f)) return NAN;
      re += (GL_W[q] * h * f.re) / 2;
      im += (GL_W[q] * h * f.im) / 2;
    }
  }
  return { re, im };
}

const isRealEnv = (env) => Object.values(env).every((v) => typeof v === 'number');

function sumOf(n, env) {
  if (isRealEnv(env) && !contains(n.e, (x) => x.t === 'const' && x.name === 'i')) {
    const v = evalFloat(n, env);
    return Number.isFinite(v) ? { re: v, im: 0 } : NAN;
  }
  const lo = evalAt(n.lo, env);
  const hi = evalAt(n.hi, env);
  if (!lo || !Number.isFinite(lo.re)) return NAN;
  const top = hi && Number.isFinite(hi.re) ? hi.re : Infinity;
  let re = 0;
  let im = 0;
  let small = 0;
  for (let k = Math.round(lo.re); k <= top; k++) {
    const t = evalAt(n.e, { ...env, [n.k]: k });
    if (!okC(t)) return NAN;
    re += t.re;
    im += t.im;
    if (top === Infinity) {
      const m = Math.hypot(t.re, t.im);
      if (m > 1e8 || k - lo.re > 6000) return NAN;
      small = m <= 1e-14 * (1 + Math.hypot(re, im)) ? small + 1 : 0;
      if (small >= 4) break;
    }
  }
  return { re, im };
}

// The value of a node at env (letters: numbers or {re, im}), ∫ and Σ computed.
export function evalAt(node, env = {}) {
  if (!contains(node, (x) => (x.t === 'int' && x.lo) || x.t === 'sum')) return evalComplex(node, env);
  const tops = [];
  walk(node, (x) => {
    if ((x.t === 'int' && x.lo) || x.t === 'sum') { tops.push(x); return false; }
    return true;
  });
  const extra = {};
  const out = mapNode(node, (x) => {
    const k = tops.indexOf(x);
    if (k < 0) return x;
    const name = `§${k}`;
    extra[name] = x.t === 'sum' ? sumOf(x, env) : integrate(x, env);
    return { t: 'sym', name };
  });
  if (Object.values(extra).some((z) => !okC(z))) return null;
  return evalComplex(out, { ...env, ...extra });
}

// ======================================================================
// cvalue
// ======================================================================

const cvVars = (cfg) => [...new Set([...(cfg.vars || []), ...(cfg.real || []), ...(cfg.cz || []), ...(cfg.z ? ['z'] : [])])];

function cvParse(cfg, text) {
  const t = String(text).replace(/^\s*=/, '').trim();
  if (cfg.raw && t === cfg.raw.text) return { t: 'raw', text: t, html: cfg.raw.html };
  return parse(t, { vars: cvVars(cfg), complex: true });
}

const ENVS = new Map();
function envsOf(cfg) {
  const real = cfg.real || [];
  const cz = cfg.cz || [];
  const key = `${real.join()}|${cz.join()}|${cfg.z ? 'z' : ''}|${JSON.stringify(cfg.domain || {})}|${JSON.stringify(cfg.box || null)}`;
  if (ENVS.has(key)) return ENVS.get(key);
  const out = [];
  if (!real.length && !cz.length) out.push({});
  else {
    const rng = makeRng(11);
    for (let k = 0; k < 6; k++) {
      const env = {};
      for (const v of real) {
        const [lo, hi] = cfg.domain?.[v] || [-2, 2];
        env[v] = lo + (hi - lo) * (0.08 + 0.84 * rng.next());
      }
      for (const v of cz) {
        const [lo, hi] = cfg.box || [-1.5, 1.5];
        env[v] = { re: lo + (hi - lo) * rng.next(), im: lo + (hi - lo) * rng.next() };
      }
      if (cfg.z) env.z = { re: env.x, im: env.y };
      out.push(env);
    }
  }
  ENVS.set(key, out);
  return out;
}
const altEnvs = (cfg) => (cfg.alt ? envsOf({ real: cfg.real, domain: cfg.alt, z: cfg.z }) : null);

const EXPANDED = new WeakMap();
function prepared(node) {
  if (!node || typeof node !== 'object') return node;
  if (EXPANDED.has(node)) return EXPANDED.get(node);
  let n = node;
  if (contains(n, (x) => x.t === 'deriv')) { try { n = expandDerivs(n); } catch { n = node; } }
  // n! of a whole number (2πi·4/2!).
  n = mapNode(n, (x) => {
    if (x.t !== 'fn' || x.name !== 'fact') return x;
    const k = numValue(stripParen(x.args[0]));
    if (!k || k.d !== 1 || k.n < 0 || k.n > 20) return x;
    let f = 1;
    for (let j = 2; j <= k.n; j++) f *= j;
    return lit(new Q(f));
  });
  EXPANDED.set(node, n);
  return n;
}

// The values of a node at the sample points (null where undefined).
function valuesAt(cfg, node, envs = envsOf(cfg)) {
  const n = prepared(node);
  if (!n || n.t === 'raw') return null;
  if (envs.length === 1 && !Object.keys(envs[0]).length && !contains(n, (x) => x.t === 'int' || x.t === 'sum')) {
    const v = complexValue(n, {});
    return [v && okC(v) ? v : null];
  }
  return envs.map((env) => {
    const z = evalAt(n, env);
    return okC(z) ? { exact: null, ...z } : null;
  });
}

function sameValues(a, b) {
  if (!a || !b) return false;
  let seen = 0;
  for (let k = 0; k < a.length; k++) {
    if (!a[k] || !b[k]) { if (!a[k] !== !b[k]) return false; continue; }
    if (!sameComplex(a[k], b[k], 1e-8)) return false;
    seen++;
  }
  return seen > 0;
}

// Wrong lines of the generator (cfg.traps[id]), as nodes.
export function trapLines(id, ctx) {
  const cfg = ctx?.cfg || {};
  const out = [];
  for (const t of cfg.traps?.[id] || []) {
    const text = typeof t === 'string' ? t : t.line;
    try {
      const node = cfg.kind === 'cvalue' ? cvParse(cfg, text) : cfg.kind === 'cfamily' ? cfParse(cfg, text) : parse(text, { vars: cfg.vars, complex: true });
      out.push({ node, ctx: typeof t === 'string' ? {} : t.ctx || {} });
    } catch { /* skip */ }
  }
  return out;
}

// ---------- final forms ----------

const hasI = (n) => contains(n, (x) => x.t === 'const' && x.name === 'i');
const BAD_FN = new Set(['arg', 'Arg', 'Re', 'Im', 'conj', 'abs']);
const TRIG = new Set(['cos', 'sin', 'tan', 'cot']);

// Terms of a sum, and factors of a product (numerator, denominator).
function termsOf(node, out = []) {
  const n = stripParen(node);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { termsOf(n.l, out); termsOf(n.r, out); } else if (n.t === 'neg') termsOf(n.e, out);
  else out.push(n);
  return out;
}
function factorsOf(node, up = [], down = [], below = false) {
  const n = stripParen(node);
  if (n.t === 'bin' && n.op === '×') { factorsOf(n.l, up, down, below); factorsOf(n.r, up, down, below); } else if (n.t === 'bin' && n.op === '/') { factorsOf(n.l, up, down, below); factorsOf(n.r, up, down, !below); } else if (n.t === 'frac') { factorsOf(n.n, up, down, below); factorsOf(n.d, up, down, !below); } else if (n.t === 'neg') factorsOf(n.e, up, down, below);
  else (below ? down : up).push(n);
  return { up, down };
}

// A tidy complex writing: i only as a factor of a term (at most one
// complex factor per term), or in an exponent a + ib of e; no Log of a
// complex, no arg, Re, Im, conj, |…|, ∫, Σ, d(…) left; no i under a root,
// in a denominator or in a trig function.
function tidy(node, letters = []) {
  const n = stripParen(node);
  if (!hasI(n) && !contains(n, (x) => ['int', 'sum', 'deriv', 'bracket', 'lim', 'abs', 'raw'].includes(x.t) || (x.t === 'fn' && BAD_FN.has(canonFn(x.name))))) {
    return realTidy(n, letters);
  }
  for (const t of termsOf(n)) {
    const { up, down } = factorsOf(t);
    if (down.some(hasI)) return false;
    const cx = up.filter(hasI);
    if (cx.length > 1) return false;
    for (const f of [...up, ...down].filter((x) => !hasI(x))) if (!realTidy(f, letters)) return false;
    if (!cx.length) continue;
    const f = stripParen(cx[0]);
    if (f.t === 'const' && f.name === 'i') continue;
    if (f.t === 'bin' && (f.op === '+' || f.op === '-')) { if (!termsOf(f).every((u) => tidy(u, letters) && !termsOf(u).some((w) => w !== u))) return false; continue; }
    if (f.t === 'pow' && stripParen(f.b).t === 'const' && stripParen(f.b).name === 'e') {
      if (!tidy(f.e, letters)) return false;
      // e^(iπ/4): a known angle, to write as cos + i sin.
      if (!contains(f.e, (y) => y.t === 'sym')) {
        const x = evalComplex(f.e, {});
        const v = x ? x.im / Math.PI : NaN;
        if (Number.isFinite(v) && [1, 2, 3, 4, 6].some((d) => Math.abs(v * d - Math.round(v * d)) < 1e-9)) return false;
      }
      continue;
    }
    return false;
  }
  return true;
}
// A real expression in closed form: no forbidden function, no trig value
// left that is a known angle.
function realTidy(node, letters) {
  let ok = true;
  walk(node, (x) => {
    if (!ok) return false;
    if (['int', 'sum', 'deriv', 'bracket', 'lim', 'abs', 'raw'].includes(x.t)) { ok = false; return false; }
    if (x.t === 'const' && x.name === 'i') { ok = false; return false; }
    // A hidden complex number: Log(−4), √(−1), (−8)^(1/3).
    if ((x.t === 'fn' || x.t === 'sqrt' || x.t === 'root' || x.t === 'pow') && !contains(x, (y) => y.t === 'sym')) {
      const v = evalComplex(x, {});
      if (!v || Math.abs(v.im) > 1e-12 * (1 + Math.abs(v.re))) { ok = false; return false; }
    }
    if (x.t === 'fn') {
      const name = canonFn(x.name);
      if (BAD_FN.has(name)) { ok = false; return false; }
      if (TRIG.has(name) && !contains(x.args[0], (y) => y.t === 'sym' && letters.includes(y.name))) {
        const v = evalFloat(x.args[0], {}) / Math.PI;
        if (Number.isFinite(v) && [1, 2, 3, 4, 6].some((d) => Math.abs(v * d - Math.round(v * d)) < 1e-9)) { ok = false; return false; }
      }
    }
    return true;
  });
  return ok;
}

// Is a term c·zᵏ, c/zᵏ, c·(z − a)ᵏ (powers of the variable only)?
function monomialish(node, v, at) {
  const { up, down } = factorsOf(node);
  const isBase = (b) => {
    b = stripParen(b);
    if (b.t === 'sym' && b.name === v) return true;
    if (at !== undefined && at !== null && b.t === 'bin' && (b.op === '-' || b.op === '+') && stripParen(b.l).t === 'sym' && stripParen(b.l).name === v && !contains(b.r, (y) => y.t === 'sym')) return true;
    return false;
  };
  for (const f of [...up, ...down]) {
    if (!contains(f, (y) => y.t === 'sym' && y.name === v)) continue;
    if (isBase(f)) continue;
    if (f.t === 'pow' && isBase(f.b)) continue;
    return false;
  }
  return true;
}

function seriesForm(cfg, node) {
  const v = (cfg.real || ['z'])[0];
  for (const t of termsOf(node)) {
    const { up, down } = factorsOf(t);
    const sums = [...up, ...down].filter((f) => contains(f, (y) => y.t === 'sum'));
    if (down.some((f) => contains(f, (y) => y.t === 'sum'))) return false;
    if (!sums.length) { if (!monomialish(t, v, cfg.at)) return false; continue; }
    if (sums.length > 1) return false;
    const s = stripParen(sums[0]);
    if (s.t !== 'sum') return false;
    if (up.filter((f) => f !== sums[0]).some((f) => contains(f, (y) => y.t === 'sym' && y.name === v))) return false;
    if (!monomialish(s.e, v, cfg.at)) return false;
    if (contains(s.e, (y) => y.t === 'sum')) return false;
  }
  return true;
}

function pfdForm(cfg, node) {
  const v = (cfg.real || ['z'])[0];
  const deg1 = (d) => {
    const p = polyOf(d);
    return !!p && [...p.vars()].every((x) => x === v) && coeffs(p, v).length === 2;
  };
  const seen = new Set();
  for (const t of termsOf(node)) {
    const { up, down } = factorsOf(t);
    if (up.some((f) => contains(f, (y) => y.t === 'sym' && y.name === v))) return false;
    const dz = down.filter((f) => contains(f, (y) => y.t === 'sym' && y.name === v));
    if (dz.length !== 1 || !deg1(dz[0])) return false;
    const key = toText(dz[0]);
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}

const size = (n) => { let k = 0; walk(n, () => { k++; }); return k; };

export function cvFinal(cfg, node) {
  if (!node || node.t === 'raw') return false;
  const f = cfg.final || 'closed';
  if (f === 'any') return true;
  const letters = cvVars(cfg);
  if (cfg.goal) {
    try { if (size(node) > size(parse(cfg.goal, { vars: letters, complex: true })) + 2) return false; } catch { /* no goal */ }
  }
  if (f === 'series') return seriesForm(cfg, node);
  if (f === 'pfd') return pfdForm(cfg, node);
  if (f === 'z' && contains(node, (x) => x.t === 'sym' && (x.name === 'x' || x.name === 'y'))) return false;
  if (f === 'number' && symbolsIn(node).size) return false;
  if (!tidy(node, letters)) return false;
  // u + iv: the imaginary part in one term.
  if (f === 'split' && termsOf(node).filter(hasI).length > 1) return false;
  // Numbers still to add or multiply (√(1 + 3), 2π·4/2, 3!).
  if (contains(node, (x) => x.t === 'fn' && x.name === 'fact')) return false;
  if (contains(node, (x) => x.t === 'bin' && (x.op === '+' || x.op === '-') && !!exactValue(x.l) && !!exactValue(x.r))) return false;
  for (const t of termsOf(node)) {
    const { up, down } = factorsOf(t);
    if ([...up, ...down].filter((f) => f.t === 'num').length > 2) return false;
    if (up.filter((f) => f.t === 'num').length > 1) return false;
  }
  // Without letters: the parts in closed form (√8, 1 + 2 to compute).
  if (!symbolsIn(node).size) {
    const parts = algebraicParts(stripParen(node));
    if (parts) {
      for (const p of [parts.re, parts.im]) {
        const c = closedNumber(p);
        if (typeof c === 'string') return c;
        if (c === false && exactValue(p) && !numValue(stripParen(p)) && stripParen(p).t !== 'frac' && stripParen(p).t !== 'neg') return false;
      }
    }
  }
  return true;
}

const say = (v) => cText(v.exact ?? v);

function cvJudge(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = cvParse(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (node.t === 'raw') return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const allowed = new Set(cvVars(cfg));
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici.` };
  if (prev && prev.t !== 'raw' && sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  let refNode = prev;
  if (cfg.expect) { try { refNode = cvParse(cfg, cfg.expect); } catch { refNode = prev; } }
  const envs = envsOf(cfg);
  const a = refNode && refNode.t !== 'raw' ? valuesAt(cfg, refNode, envs) : null;
  const b = valuesAt(cfg, node, envs);
  const same = (cand, line) => {
    if (sameValues(valuesAt(cfg, cand, envs), valuesAt(cfg, line, envs))) return true;
    const alt = altEnvs(cfg);
    return !!alt && sameValues(valuesAt(cfg, cand, alt), valuesAt(cfg, line, alt));
  };
  if (a && a.some(Boolean)) {
    const bad = a.findIndex((x, k) => x && (!b || !b[k] || !sameComplex(x, b[k], 1e-8)));
    if (bad >= 0) {
      const diag = diagnoseLine('cvalue', prev, node, cfg, same);
      const env = envs[bad];
      const where = Object.keys(env).length ? ` (en ${Object.entries(env).filter(([k]) => !(cfg.z && k === 'z')).map(([k, v]) => `${k} = ${typeof v === 'number' ? fnum(v) : cText({ re: Math.round(v.re * 100) / 100, im: Math.round(v.im * 100) / 100 })}`).join(', ')})` : '';
      const msg = !b || !b[bad]
        ? `Ta ligne n'est pas définie${where} : une série qui diverge, ou une division par 0 ?`
        : `Ta ligne vaut ${say(b[bad])}, mais il faut ${say(a[bad])}${where}.`;
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: msg };
    }
  } else if (!b || !b.some(Boolean)) return { kind: 'stay', node, message: 'Je n\'arrive pas à calculer cette ligne : écris-la autrement.' };
  const fin = cvFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

function cvShow(cfg, node, opts = {}) {
  if (node?.t === 'raw') return node.html || `<math><mtext>${node.text}</mtext></math>`;
  return toMathML(unparen(node), opts);
}

export const cvalue = {
  sign: '=',
  parseLine: cvParse,
  judgeLine: cvJudge,
  isFinal: (cfg, node) => cvFinal(cfg, node),
  start: (cfg) => cfg.start,
  show: cvShow,
  text: (cfg, node) => (node?.t === 'raw' ? node.text : toText(node)),
};

// ======================================================================
// cfamily
// ======================================================================

const cfVars = (cfg) => [...new Set([...(cfg.vars || []), 'z', 'w', 'k'])];

function cfParse(cfg, text) {
  if (text && typeof text === 'object') return text;
  const t = String(text).replace(/^\s*(⟺|⇔|=)/, '').trim()
    .replace(/\s*\(\s*k\s*∈\s*ℤ\s*\)\s*$/, ' ; k ∈ ℤ')
    .replace(/,\s*(k\s*∈\s*ℤ)\s*$/, ' ; $1');
  return parse(t, { vars: cfVars(cfg), complex: true });
}

const PERIOD = new WeakMap();
function refOf(cfg) {
  if (PERIOD.has(cfg)) return PERIOD.get(cfg);
  const P = (s) => evalComplex(parse(String(s), { vars: cfVars(cfg), complex: true }), {});
  const r = {
    sols: (cfg.sols || []).map(P),
    period: P(cfg.period || '2πi'),
    roots: (cfg.roots || []).map(P),
  };
  PERIOD.set(cfg, r);
  return r;
}

const near = (a, b, tol = 1e-7) => Math.hypot(a.re - b.re, a.im - b.im) <= tol * (1 + cabs(a) + cabs(b));
// (a − s)/period is a whole number.
function inFamily(a, s, P) {
  const q = { re: ((a.re - s.re) * P.re + (a.im - s.im) * P.im) / (P.re * P.re + P.im * P.im), im: ((a.im - s.im) * P.re - (a.re - s.re) * P.im) / (P.re * P.re + P.im * P.im) };
  return Math.abs(q.im) < 1e-7 && Math.abs(q.re - Math.round(q.re)) < 1e-7;
}

// The alternatives of a line: [{kind: 'z'|'w', node}] for « z = … ou … ».
function alternatives(node) {
  const n = stripParen(node);
  if (n.t === 'logic' && n.op === 'or') return [...alternatives(n.l), ...alternatives(n.r)];
  return [n];
}

// What a line is: {kind: 'family', items, hasK, kInZ} | {kind: 'zeq', node}
// | {kind: 'weq', node} | null.
function classify(cfg, node) {
  let n = stripParen(node);
  let hasK = false;
  if (n.t === 'list') {
    const rest = n.items.filter((x) => !(stripParen(x).t === 'in' && stripParen(stripParen(x).l || stripParen(x).e || x).name === 'k'));
    hasK = rest.length < n.items.length;
    if (rest.length !== 1) return null;
    n = stripParen(rest[0]);
  }
  const alts = alternatives(n);
  const isZ = (x) => x.t === 'rel' && x.op === '=' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === 'z' && !contains(x.r, (y) => y.t === 'sym' && (y.name === 'z' || y.name === 'w'));
  if (alts.every(isZ)) return { kind: 'family', items: alts.map((x) => x.r), hasK };
  const syms = symbolsIn(n);
  if (syms.has('w') && !syms.has('z')) return { kind: 'weq', node: n, alts };
  if (syms.has('z') && !syms.has('w') && n.t === 'rel') return { kind: 'zeq', node: n };
  return null;
}

// Families of a family line: [{a, b}] (b = 0 for a point), or null.
function familiesOf(items) {
  const out = [];
  for (const it of items) {
    const f = (k) => evalComplex(it, { k });
    const f0 = f(0);
    const f1 = f(1);
    const f2 = f(2);
    if (![f0, f1, f2].every(okC)) return null;
    const b = { re: f1.re - f0.re, im: f1.im - f0.im };
    if (!near({ re: f0.re + 2 * b.re, im: f0.im + 2 * b.im }, f2)) return null;
    out.push({ a: f0, b });
  }
  return out;
}

// Compares a family line with the reference: {ok} or {ok: false, message, missing?}.
function checkFamilies(cfg, fams) {
  const { sols, period: P } = refOf(cfg);
  const zero = (b) => cabs(b) < 1e-9;
  for (const f of fams) {
    if (zero(f.b)) {
      if (!sols.some((s) => inFamily(f.a, s, P))) return { ok: false, message: `${cText(f.a)} n'est pas une solution.` };
      continue;
    }
    // Every member a + bk must be a solution: b a multiple of the period.
    const m = { re: (f.b.re * P.re + f.b.im * P.im) / (P.re * P.re + P.im * P.im), im: (f.b.im * P.re - f.b.re * P.im) / (P.re * P.re + P.im * P.im) };
    if (Math.abs(m.im) > 1e-7 || Math.abs(m.re - Math.round(m.re)) > 1e-7 || !sols.some((s) => inFamily(f.a, s, P))) {
      const bad = [f.a, { re: f.a.re + f.b.re, im: f.a.im + f.b.im }].find((x) => !sols.some((s) => inFamily(x, s, P)));
      return { ok: false, message: `${cText(bad || f.a)} n'est pas une solution.` };
    }
  }
  for (const s of sols) {
    const met = fams.some((f) => !zero(f.b) && Math.abs(Math.abs(cabs(f.b) / cabs(P)) - 1) < 1e-7 && inFamily(f.a, s, P));
    if (!met) {
      const j = sols.indexOf(s);
      return { ok: false, missing: true, z0: fr(cfg.sols[j]), message: `Il manque des solutions : tous les ${fr(cfg.sols[j])} + ${fr(cfg.periodText || '2kπi')}, k ∈ ℤ, sont solutions.` };
    }
  }
  return { ok: true };
}

function residual(node, env) {
  const v = evalComplex({ t: 'bin', op: '-', l: node.l, r: { t: 'paren', e: node.r } }, env);
  return okC(v) ? cabs(v) : NaN;
}
const SAMPLE_PTS = [{ re: 0.37, im: 0.21 }, { re: -0.83, im: 1.13 }, { re: 1.41, im: -0.67 }];

// An equation (in z or in w) holds at the points and is not an identity.
function holdsAt(rel, v, pts) {
  for (const p of pts) {
    const r = residual(rel, { [v]: p });
    if (!(r < 1e-7 * (1 + cabs(p)))) return { ok: false, at: p };
  }
  const id = SAMPLE_PTS.every((p) => residual(rel, { [v]: p }) < 1e-9);
  return id ? { ok: false, identity: true } : { ok: true };
}

function wRoots(cfg, node) {
  const alts = alternatives(node);
  if (alts.every((x) => x.t === 'rel' && x.op === '=' && stripParen(x.l).t === 'sym' && stripParen(x.l).name === 'w' && !contains(x.r, (y) => y.t === 'sym'))) {
    return alts.map((x) => evalComplex(x.r, {}));
  }
  return solutionsOf({ unknown: 'w' }, node);
}

function cfCompare(cfg, node) {
  const c = classify(cfg, node);
  const ref = refOf(cfg);
  if (!c) return { ok: false, unread: true, message: 'Je n\'arrive pas à lire cette ligne : une équation en z ou en w, ou « z = … + 2kπi ; k ∈ ℤ ».' };
  if (c.kind === 'family') {
    const fams = familiesOf(c.items);
    if (!fams) return { ok: false, message: 'Une famille s\'écrit z₀ + 2kπi : je n\'arrive pas à lire la tienne.' };
    return { ...checkFamilies(cfg, fams), c, fams };
  }
  if (c.kind === 'zeq') {
    const pts = ref.sols.flatMap((s) => [s, { re: s.re + ref.period.re, im: s.im + ref.period.im }]);
    const h = holdsAt(c.node, 'z', pts);
    if (h.identity) return { ok: false, message: 'Cette égalité est vraie pour tout z : ce n\'est plus l\'équation.', c };
    if (!h.ok) return { ok: false, message: `${cText(h.at)} est solution de l'équation, mais pas de ta ligne.`, c };
    return { ok: true, c };
  }
  // In w.
  const R = wRoots(cfg, c.node);
  if (R && ref.roots.length) {
    if (!sameSolutions(R.map((z) => ({ re: z.re, im: z.im })), ref.roots)) {
      const miss = ref.roots.find((r) => !R.some((x) => near(x, r)));
      const extra = R.find((x) => !ref.roots.some((r) => near(x, r)));
      return { ok: false, c, message: miss ? `w = ${cText(miss)} est solution, mais pas de ta ligne.` : `w = ${cText(extra)} est solution de ta ligne, mais pas de l'équation.` };
    }
    return { ok: true, c, poly: true };
  }
  if (c.node.t !== 'rel') return { ok: false, unread: true, c, message: 'Écris une équation en w, ou ses solutions « w = … ou w = … ».' };
  const h = holdsAt(c.node, 'w', ref.roots);
  if (h.identity) return { ok: false, c, message: 'Cette égalité est vraie pour tout w : ce n\'est plus l\'équation.' };
  if (!h.ok) return { ok: false, c, message: `w = ${cText(h.at)} est solution, mais pas de ta ligne.` };
  return { ok: true, c };
}

function cfSame(cfg, a, b) {
  try {
    const A = classify(cfg, a);
    const B = classify(cfg, b);
    if (!A || !B || A.kind !== B.kind) return false;
    if (A.kind === 'family') {
      const fa = familiesOf(A.items);
      const fb = familiesOf(B.items);
      if (!fa || !fb) return false;
      const key = (fs) => fs.map((f) => ({ b: cabs(f.b), a: f.a }));
      const ka = key(fa);
      const kb = key(fb);
      const P = refOf(cfg).period;
      const match = (x, y) => Math.abs(x.b - y.b) < 1e-7 && (x.b < 1e-9 ? near(x.a, y.a) : inFamily(x.a, y.a, { re: P.re * (x.b / cabs(P)), im: P.im * (x.b / cabs(P)) }));
      return ka.every((x) => kb.some((y) => match(x, y))) && kb.every((y) => ka.some((x) => match(x, y)));
    }
    if (A.kind === 'weq') {
      const ra = wRoots(cfg, A.node);
      const rb = wRoots(cfg, B.node);
      return !!ra && !!rb && sameSolutions(ra, rb);
    }
    return false;
  } catch { return false; }
}

function cfFinal(cfg, node) {
  const c = classify(cfg, node);
  if (!c) return false;
  if ((cfg.final || 'family') === 'poly') {
    if (c.kind !== 'weq' || c.node.t !== 'rel') return false;
    const r = stripParen(c.node.r);
    if (!(r.t === 'num' && r.v.n === 0)) return false;
    if (contains(c.node.l, (x) => (x.t === 'frac' || (x.t === 'bin' && x.op === '/')) && contains(x.d ?? x.r, (y) => y.t === 'sym' && y.name === 'w'))) return false;
    if (contains(c.node.l, (x) => x.t === 'paren' && contains(x, (y) => y.t === 'sym' && y.name === 'w'))) return false;
    const p = polyOf(c.node.l, { complex: true });
    return !!p && [...p.vars()].every((x) => x === 'w' || x === I);
  }
  if (c.kind !== 'family') return false;
  if (!c.items.some((x) => contains(x, (y) => y.t === 'sym' && y.name === 'k'))) return false;
  for (const it of c.items) {
        if (contains(it, (x) => x.t === 'fn' && ['ln', 'arg', 'Arg'].includes(canonFn(x.name)) && hasI(x.args[0]))) return false;
    if (contains(it, (x) => x.t === 'fn' && ['ln'].includes(canonFn(x.name)) && (evalFloat(x.args[0], {}) <= 0 || !Number.isFinite(evalFloat(x.args[0], {}))))) return false;
  }
  if (!c.hasK) return 'précise « k ∈ ℤ » à la fin de la ligne.';
  return true;
}

function cfJudge(cfg, prev, input, state = {}) {
  let node;
  try { node = cfParse(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  const allowed = new Set(cfVars(cfg));
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici.` };
  if (prev && sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const r = cfCompare(cfg, node);
  if (r.unread) return { kind: 'stay', node, message: r.message };
  if (!r.ok) {
    const diag = diagnoseLine('cfamily', prev, node, cfg, (cand, line) => cfSame(cfg, cand, line));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? (r.missing ? 'c_exp_periodic' : null), diag: diag ?? (r.missing ? { rules: ['c_exp_periodic'], ambiguous: 1, ctx: { z0: r.z0 ?? fr(cfg.sols[0]) }, all: ['c_exp_periodic'] } : null), message: r.message };
  }
  const fin = cfFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

export const cfamily = {
  sign: '⟺',
  parseLine: cfParse,
  judgeLine: cfJudge,
  isFinal: (cfg, node) => cfFinal(cfg, node),
  start: (cfg) => cfg.start,
  show: (cfg, node, opts = {}) => toMathML(unparen(node), opts),
  text: (cfg, node) => toText(node),
};

// For the traps (rules/ca.js): the reference of a cfamily cfg.
export const familyRef = refOf;
export { cfParse, cvParse, valuesAt, sameValues, envsOf };
void polyOf; void I; void coeffs;
