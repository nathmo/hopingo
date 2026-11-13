// Two judges of module C, part b (step U10): residues, contour integrals
// and arc estimates. Registered at the end of judges/index.js as `cval`
// and `arcb`.
//
// cval — a complex quantity named by a label. The start of the part is a
// label (« Res(f ; i) », « ∮ f(z) dz », « I »), not a value: the lines
// must have the value cfg.expect (the judge compares the first line with
// it, then each line with the one before, like `complex`). The label is
// shown and copied as it is, never its value.
//   cfg: {kind: 'cval', label, expect: text, form?, vars?, domain?, traps?}
//   form   'algebraic' (default: a + bi, as `complex`), 'real', 'any',
//          'value' (a number with the powers of complex numbers computed and
//          the exponents of e written a + bi: e^(−3)e^(3i)/(8i) is final, as
//          in the exam corrections), 'ratz' (vars ['z']: a single quotient
//          P(z)/Q(z), the integrand of a trigonometric integral).
//   vars   real letters (t, α, z, a, b) sampled in domain ({v: [lo, hi]},
//          [−3 ; 3] by default) at 6 points; a line with them is final in
//          the forms 'value', 'ratz' and 'any'.
//   traps  {ruleId: [texts] | [{line, ctx}]}: the wrong values of the
//          part's traps (rules/cb.js reads them).
// Lines are read with i the imaginary unit; « Res = … » or « I = … » before
// the value is allowed (the label is dropped).
//
// arcb — chains of bounds on an arc C_R = {z₀ + R e^(iθ), θ ∈ [θ₀ ; θ₁]}.
// Each line is a real expression in z (on the arc), R (and θ, cfg.params);
// it must bound the previous line (rel '≤': prev ≤ line, '≥': prev ≥ line)
// at every point of the arc, for R in cfg.R ([3 ; 50]): 8 radii × 33
// angles (× 3 values of each parameter). Final: a line in R alone (and the
// parameters). The trap c_arc_triangle (1/|q| ≤ 1/(R² + 1)) is caught here,
// at θ where |q| is smallest.
//   cfg: {kind: 'arcb', rel, arc: [θ₀, θ₁], center?: number | {re, im},
//         R?: [lo, hi], rv?: 'R', params?: {t: [lo, hi]}, traps?}
//
// laur — Laurent expansions in powers of 1/v around a singularity (v = z
// at 0, or v = w = z − z₀ after the change of variable): the judge `series`
// at v → +∞ (h = 1/v) decides whether a line is right; it is final when
// it is a sum of monomials c·v^k, each power once, plus one remainder
// o(1/vⁿ) (or ε), known at least to the order cfg.order (n ≥ order).
//   cfg: {kind: 'laur', v: 'z' | 'w', order}

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { stripParen, symbolsIn, contains, unparen } from '../cas/ast.js';
import { complexValue, sameComplex, evalComplex, cText, algebraicParts } from '../cas/complex.js';
import { isFinal as complexFinal } from './complex.js';
import { diagnoseLine } from './diagnose.js';
import { sameLine, frNum } from './common.js';
import { makeRng } from '../content/random.js';
import * as seriesJudge from './series.js';
import { series as seriesOf } from '../cas/series.js';
import { evalFloat } from '../cas/numeric.js';
import { t } from '../i18n.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mathWrap = (inner, display) => `<math${display ? ' display="block"' : ''}>${inner}</math>`;

// ======================================================================
// cval
// ======================================================================

const cOpts = (cfg) => ({ vars: [...(cfg.vars || [])], complex: true });

// « Res = … », « I = … », « f̂(α) = … »: the value after the last top-level « = ».
function dropLabel(text) {
  const tt = String(text).trim().replace(/^=\s*/, '');
  let depth = 0;
  let at = -1;
  for (let i = 0; i < tt.length; i++) {
    const c = tt[i];
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === '=' && depth === 0) at = i;
  }
  return at >= 0 ? tt.slice(at + 1) : tt;
}

const EXPECT = new Map();
function expectOf(cfg) {
  const key = `${cfg.expect}|${(cfg.vars || []).join(',')}`;
  if (!EXPECT.has(key)) { if (EXPECT.size > 500) EXPECT.clear(); EXPECT.set(key, parse(String(cfg.expect), cOpts(cfg))); }
  return EXPECT.get(key);
}

const isLabel = (cfg, text) => !!cfg.label && String(text).trim() === String(cfg.label).trim();

function cvalParse(cfg, text) {
  if (text && typeof text === 'object') return text;
  if (isLabel(cfg, text)) return { ...expectOf(cfg), lbl: String(cfg.label) };
  return parse(dropLabel(text), cOpts(cfg));
}

function cvalShow(cfg, node, { display } = {}) {
  if (node?.lbl) return mathWrap(cfg.labelML || `<mtext>${esc(node.lbl)}</mtext>`, display);
  return toMathML(unparen(node), { display: display ? 'block' : 'inline' });
}

const cvalText = (cfg, node) => (node?.lbl ? node.lbl : toText(node));

const ENVS = new Map();
function envsOf(cfg) {
  const vars = cfg.vars || [];
  if (!vars.length) return [{}];
  const key = `${vars.join(',')}|${JSON.stringify(cfg.domain || {})}`;
  if (!ENVS.has(key)) {
    const rng = makeRng(11);
    const out = [];
    for (let k = 0; k < 6; k++) {
      const env = {};
      for (const v of vars) {
        const [lo, hi] = cfg.domain?.[v] || [-3, 3];
        env[v] = lo + (hi - lo) * (0.1 + 0.8 * rng.next());
      }
      out.push(env);
    }
    ENVS.set(key, out);
  }
  return ENVS.get(key);
}

function valuesOf(cfg, node) {
  const out = [];
  for (const env of envsOf(cfg)) {
    let v;
    try { v = complexValue(node, env); } catch { v = null; }
    if (!v || !Number.isFinite(v.re) || !Number.isFinite(v.im)) return null;
    out.push(v);
  }
  return out;
}

export function sameValues(cfg, a, b) {
  const x = valuesOf(cfg, a);
  const y = valuesOf(cfg, b);
  return !!x && !!y && x.every((u, k) => sameComplex(u, y[k], 1e-8));
}

const hasI = (n) => contains(n, (x) => x.t === 'const' && x.name === 'i');
const isE = (n) => { n = stripParen(n); return n.t === 'const' && n.name === 'e'; };

// 'value': powers of complex numbers or sums computed, exponents written a + bi.
function valueForm(cfg, node) {
  if (contains(node, (x) => x.t === 'deriv' || x.t === 'int' || x.t === 'lim')) return false;
  const vars = new Set(cfg.vars || []);
  let issue = null;
  contains(node, (x) => {
    if (issue) return true;
    if (x.t === 'pow') {
      const b = stripParen(x.b);
      if (isE(b)) {
        const e = stripParen(x.e);
        if (hasI(e) && ![...symbolsIn(e)].some((s) => vars.has(s)) && !algebraicParts(e)) issue = 'exponent';
        // 3i(1 + i): a product with a sum inside, still to expand.
        if (hasI(e) && contains(e, (y) => y.t === 'bin' && y.op === '×' && contains(y, (w) => w.t === 'bin' && (w.op === '+' || w.op === '-')))) issue = 'exponent';
        // e^((0)t), e^((−1)t): the product in the exponent is to compute.
        if (contains(e, (y) => y.t === 'paren' && stripParen(y.e).t !== 'sym' && !contains(y, (w) => w.t === 'sym'))) issue = 'exponent';
      } else if (hasI(b) || (b.t === 'bin' && (b.op === '+' || b.op === '-')) || (b.t === 'num' && stripParen(x.e).t === 'num')) issue = 'power';
    }
    if (x.t === 'fn' && (x.name === 'exp') && hasI(x.args[0]) && !algebraicParts(stripParen(x.args[0]))) issue = 'exponent';
    // (0) + 1, ((−1) + 2): numbers still to add.
    if (x.t === 'bin' && (x.op === '+' || x.op === '-') && !contains(x, (y) => y.t === 'sym' || y.t === 'const')) issue = 'sum';
    return false;
  });
  // Right, not computed yet: a step (ok), not « stay ».
  return issue ? false : true;
}

// 'ratz': a single quotient P/Q (a number times it), nothing nested.
function ratzForm(node) {
  let n = stripParen(node);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'bin' && n.op === '×' && !contains(n.l, (x) => x.t === 'sym')) n = stripParen(n.r);
  if (n.t !== 'frac') return false;
  if (contains(n.n, (x) => x.t === 'frac') || contains(n.d, (x) => x.t === 'frac')) return t('Réduis au même dénominateur : une seule fraction P(z)/Q(z).');
  if (contains(n.d, (x) => x.t === 'pow' && stripParen(x.e).t === 'neg')) return t('Une seule fraction P(z)/Q(z).');
  return true;
}

// closedNumber (js/cas/closedform.js) refuses a leading minus before a
// product with e^(…) (−πe^(−2), −e^(−2)sin(2)/4) although it accepts
// −(πe^(−2)): a negated line is final when its opposite is.
function cvalFinal(cfg, node) {
  const fin = cvalFinal1(cfg, node);
  if (fin === true || !node || node.lbl) return fin;
  const n = stripParen(node);
  if (n.t === 'neg' && cvalFinal1(cfg, n.e) === true) return true;
  return fin;
}

function cvalFinal1(cfg, node) {
  if (node?.lbl) return false;
  const form = cfg.form || 'algebraic';
  if (form === 'any') return true;
  if (form === 'ratz') return ratzForm(node);
  if (form === 'value') {
    const a = complexFinal({ form: 'algebraic' }, node);
    if (a === true && !(cfg.vars || []).length) return true;
    return valueForm(cfg, node);
  }
  if ((cfg.vars || []).length && [...symbolsIn(node)].some((s) => cfg.vars.includes(s))) return valueForm(cfg, node);
  return complexFinal({ form }, node);
}

function cvalJudge(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    if (isLabel(cfg, input)) return { kind: 'same', node: prev, message: t('Avance d\'au moins une étape.') };
    try { node = parse(dropLabel(input), cOpts(cfg)); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const allowed = new Set(cfg.vars || []);
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { kind: 'parse', node, message: t('Je ne connais pas la lettre « {a} » ici : écris une valeur{b}.', { a: unknown[0].replace(/_$/, ''), b: allowed.size ? t(' (lettres permises : {a})', { a: [...allowed].join(', ') }) : '' }) };
  const fromLabel = !!prev?.lbl;
  const ref = fromLabel ? expectOf(cfg) : prev;
  if (!fromLabel && sameLine(node, prev)) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  const a = valuesOf(cfg, ref);
  const b = valuesOf(cfg, node);
  if (!b) return { kind: 'stay', node, message: t('Ce nombre n\'est pas défini (division par 0 ?) : écris-le autrement.') };
  if (a && !a.every((x, k) => sameComplex(x, b[k], 1e-8))) {
    const diag = diagnoseLine('cval', ref, node, cfg, (cand, line) => sameValues(cfg, cand, line));
    const k = a.findIndex((x, i) => !sameComplex(x, b[i], 1e-8));
    const env = envsOf(cfg)[k];
    const where = cfg.vars?.length ? t(' (en {a})', { a: cfg.vars.map((v) => `${v} = ${frNum(env[v], 2)}`).join(', ') }) : '';
    const say = (v) => cText(v.exact ?? v);
    const message = fromLabel
      ? t('Ta ligne vaut {a}{where} : ce n\'est pas la bonne valeur.', { a: say(b[k]), where })
      : t('Ta ligne vaut {a}, mais la précédente vaut {b}{where}.', { a: say(b[k]), b: say(a[k]), where });
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = cvalFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: t('C\'est juste, mais {a}{b}', { a: fin.charAt(0).toLowerCase(), b: fin.slice(1) }) };
  if ((cfg.form || 'algebraic') === 'algebraic' && !fin) {
    // Right, not yet a + bi: a step.
  }
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

export const cval = {
  sign: '=',
  parseLine: cvalParse,
  show: cvalShow,
  text: cvalText,
  isFinal: cvalFinal,
  start: (cfg) => cfg.label,
  judgeLine: cvalJudge,
};

// ======================================================================
// arcb
// ======================================================================

const rvOf = (cfg) => cfg.rv || 'R';
const aOpts = (cfg) => ({ vars: ['z', rvOf(cfg), 'θ', ...Object.keys(cfg.params || {})], complex: true });

function arcParse(cfg, text) {
  if (text && typeof text === 'object') return text;
  return parse(String(text).replace(/^\s*[≤≥]\s*/, ''), aOpts(cfg));
}

const SAMPLES = new Map();
function arcSamples(cfg) {
  const key = JSON.stringify([cfg.arc, cfg.center, cfg.R, cfg.params, cfg.rv]);
  if (SAMPLES.has(key)) return SAMPLES.get(key);
  const [t0, t1] = cfg.arc || [0, Math.PI];
  const [r0, r1] = cfg.R || [3, 50];
  const c = typeof cfg.center === 'object' && cfg.center ? cfg.center : { re: cfg.center || 0, im: 0 };
  const Rs = Array.from({ length: 8 }, (_, k) => r0 * (r1 / r0) ** (k / 7));
  const Ts = Array.from({ length: 33 }, (_, k) => t0 + ((t1 - t0) * k) / 32);
  const P = Object.entries(cfg.params || {}).map(([p, [lo, hi]]) => [p, [lo, (lo + hi) / 2, hi]]);
  let envs = [];
  for (const R of Rs) for (const th of Ts) envs.push({ [rvOf(cfg)]: R, θ: th, z: { re: c.re + R * Math.cos(th), im: c.im + R * Math.sin(th) } });
  for (const [p, vals] of P) envs = envs.flatMap((e) => vals.map((x) => ({ ...e, [p]: x })));
  if (SAMPLES.size > 100) SAMPLES.clear();
  SAMPLES.set(key, envs);
  return envs;
}

// The real values of a line on the arc, or {complex: true} / null.
function arcValues(cfg, node) {
  const out = [];
  for (const env of arcSamples(cfg)) {
    let v;
    try { v = evalComplex(node, env); } catch { v = null; }
    if (!v || !Number.isFinite(v.re)) { out.push(NaN); continue; }
    if (Math.abs(v.im) > 1e-9 * (1 + Math.abs(v.re))) return { complex: true };
    out.push(v.re);
  }
  return out;
}

function arcSame(cfg, a, b) {
  const x = arcValues(cfg, a);
  const y = arcValues(cfg, b);
  if (!Array.isArray(x) || !Array.isArray(y)) return false;
  let seen = 0;
  for (let i = 0; i < x.length; i++) {
    if (!Number.isFinite(x[i]) || !Number.isFinite(y[i])) continue;
    seen++;
    if (Math.abs(x[i] - y[i]) > 1e-8 * (1 + Math.abs(x[i]) + Math.abs(y[i]))) return false;
  }
  return seen > 0;
}

const arcVars = (cfg) => new Set(['z', 'θ']);

function arcFinal(cfg, node) {
  const s = symbolsIn(node);
  if ([...arcVars(cfg)].some((v) => s.has(v))) return false;
  return s.has(rvOf(cfg)) ? true : t('Garde R : la borne doit dépendre du rayon.');
}

const piText = (th) => {
  const k = th / Math.PI;
  const r = Math.round(k * 16) / 16;
  if (Math.abs(r - k) > 1e-9) return frNum(th, 2);
  if (r === 0) return '0';
  const fr = [[1, 1], [1, 2], [1, 4], [3, 4], [3, 2], [1, 8], [3, 8], [5, 8], [7, 8], [5, 4], [7, 4]].find(([p, q]) => Math.abs(p / q - r) < 1e-9);
  if (!fr) return frNum(th, 2);
  const [p, q] = fr;
  return `${p === 1 ? '' : p}π${q === 1 ? '' : `/${q}`}`;
};

function arcJudge(cfg, prev, input, state = {}) {
  let node;
  try { node = arcParse(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  const allowed = new Set(aOpts(cfg).vars);
  const unknown = [...symbolsIn(node)].filter((s) => !allowed.has(s));
  if (unknown.length) return { kind: 'parse', node, message: t('Je ne connais pas la lettre « {a} » ici : z est sur l\'arc, |z| = {b}.', { a: unknown[0].replace(/_$/, ''), b: rvOf(cfg) }) };
  if (node.t === 'rel') return { kind: 'parse', node, message: t('Écris seulement le membre de droite : le signe {rel} est déjà là.', { rel: cfg.rel || '≤' }) };
  if (sameLine(node, prev)) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  const A = arcValues(cfg, prev);
  const B = arcValues(cfg, node);
  if (!Array.isArray(B)) return { kind: 'stay', node, message: t('Ta ligne prend des valeurs complexes : une majoration porte sur des modules |…|, des nombres réels.') };
  const sgn = cfg.rel === '≥' ? -1 : 1;
  const envs = arcSamples(cfg);
  for (let i = 0; i < envs.length; i++) {
    const a = Array.isArray(A) ? A[i] : NaN;
    const b = B[i];
    if (!Number.isFinite(a)) continue;
    if (!Number.isFinite(b) || sgn * (a - b) > 1e-9 * (1 + Math.abs(a) + Math.abs(b))) {
      const diag = diagnoseLine('arcb', prev, node, cfg, (cand, line) => arcSame(cfg, cand, line));
      const e = envs[i];
      const params = Object.keys(cfg.params || {}).map((p) => `, ${p} = ${frNum(e[p], 2)}`).join('');
      const vars = { r: rvOf(cfg), rv: frNum(e[rvOf(cfg)], 1), th: piText(e.θ), params, b: frNum(b, 4), a: frNum(a, 4) };
      const message = cfg.rel === '≥'
        ? t('Pour z = {r}e^(iθ) avec {r} = {rv} et θ = {th}{params}, ta ligne vaut {b}, plus grande que la précédente ({a}) : ce n\'est pas une minoration sur tout l\'arc.', vars)
        : t('Pour z = {r}e^(iθ) avec {r} = {rv} et θ = {th}{params}, ta ligne vaut {b}, plus petite que la précédente ({a}) : ce n\'est pas une majoration sur tout l\'arc.', vars);
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
    }
  }
  const fin = arcFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}

export const arcb = {
  get sign() { return '≤'; },
  parseLine: arcParse,
  show: (cfg, node, { display } = {}) => toMathML(unparen(node), { display: display ? 'block' : 'inline' }),
  text: (cfg, node) => toText(node),
  isFinal: arcFinal,
  start: (cfg) => cfg.start,
  judgeLine: arcJudge,
  same: arcSame,
};

// ======================================================================
// laur
// ======================================================================

const lv = (cfg) => cfg.v || 'z';
const lcfg = (cfg) => ({ kind: 'series', v: lv(cfg), vars: [lv(cfg)], dvar: lv(cfg), at: '+inf', order: cfg.order ?? 3 });
const lParse = (cfg, text) => (text && typeof text === 'object' ? text : parse(String(text).replace(/^\s*=/, ''), { vars: [lv(cfg)], dvar: lv(cfg) }));

function sumTermsOf(n, out = []) {
  n = stripParen(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { sumTermsOf(n.l, out); sumTermsOf(n.r, out); } else if (n.t === 'neg') sumTermsOf(n.e, out);
  else out.push(n);
  return out;
}
// The power k of a monomial c·v^k (numerically: t(2v)/t(v) = 2^k), or null.
function monoPower(tt, v) {
  if ([...symbolsIn(tt)].some((s) => s !== v)) return null;
  const a = evalFloat(tt, { [v]: 1.7 });
  const b = evalFloat(tt, { [v]: 3.4 });
  const c = evalFloat(tt, { [v]: 6.8 });
  if (![a, b, c].every((x) => Number.isFinite(x) && x !== 0)) return null;
  const k = Math.log2(b / a);
  if (!(b / a > 0) || Math.abs(k - Math.round(k)) > 1e-9 || Math.abs(Math.log2(c / b) - k) > 1e-9) return null;
  return Math.round(k);
}
function laurFinal(cfg, node) {
  const v = lv(cfg);
  const terms = sumTermsOf(node);
  const rems = terms.filter((tt) => contains(tt, (x) => x.t === 'eps'));
  if (rems.length !== 1) return false;
  const ks = [];
  for (const tt of terms) {
    if (rems.includes(tt)) continue;
    const k = monoPower(tt, v);
    if (k === null || ks.includes(k)) return false;
    ks.push(k);
  }
  let s;
  try { s = seriesOf(node, v, '+inf', (cfg.order ?? 3) + 6); } catch { return false; }
  return s.order >= (cfg.order ?? 3) ? true : t('Va plus loin : il faut les termes jusqu\'à 1/{v}^{a}.', { v, a: cfg.order ?? 3 });
}
function laurJudge(cfg, prev, input, state = {}) {
  let node;
  try { node = lParse(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  const v = seriesJudge.judgeLine(lcfg(cfg), prev, node, state);
  if (v.message) {
    // h = 1/v: « le coefficient de h^k » is the coefficient of 1/v^k.
    const x = lv(cfg);
    // (« coefficient of » once the series judge speaks English.)
    v.message = v.message.replace(/coefficient (de|of) \([a-z] − inf\)(?:\^(-?\d+))?/g, (m, w, k) => {
      const n = k === undefined ? 1 : Number(k);
      return `coefficient ${w} ${n === 1 ? `1/${x}` : n > 0 ? `1/${x}^${n}` : n === -1 ? x : `${x}^${-n}`}`;
    });
  }
  if (v.kind !== 'ok' && v.kind !== 'done' && v.kind !== 'stay') return v;
  const fin = laurFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

export const laur = {
  sign: '=',
  parseLine: lParse,
  isFinal: laurFinal,
  start: (cfg) => cfg.start,
  judgeLine: laurJudge,
};

export { dropLabel };
