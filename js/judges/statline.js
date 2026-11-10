// The line language of the judges `prob` and `stat` (step U7): a named
// value, written as a chain of members,
//   [label =] member (= | ≈) member …
// where a member is an expression of the core (js/cas/parse.js) plus
//   C(n, k), A(n, k)        combinations and arrangements (« , » or « ; »)
//   n!                      factorial (core)
//   Φ(z), Φ⁻¹(p)            the normal law (Phi^(-1) and Ψ are read too)
//   Pr(…)                   the symbols the item binds (cfg.symbols: {'Pr(A)': '1/2'})
//   [a ; b]                 an interval (confidence intervals)
//   12 %                    a percentage (12/100)
// and, in the values the generators write (cfg.expect), $name (the value
// the student gave to an earlier part named `name`, else cfg.ref[name]) and
// the table functions #t(ν, α), #chi(r, α), #phi(z), #z(p), #F(p, m, n).
//
// readStat(cfg, text) → {t: 'sline', text, label, members: [{ast, op}], start?}
// statValue(cfg, ast, env) → {q: Q | null, x: number, lo?, hi?} (an
//   interval has lo and hi), or null when the member has no value.
// expected(cfg, state) → the same, for the value the part asks.
// statML(cfg, node) → MathML; statTemplateML(cfg, text, blanks) for guided lines.

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { mapNode, lit, stripParen, numValue } from '../cas/ast.js';
import { exactValue } from '../cas/normal.js';
import { evalFloat } from '../cas/numeric.js';
import { Q } from '../math/rational.js';
import * as S from '../cas/stats.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- reading ----------

// Calls read by the line language itself (the core would take « 7,3 » for
// a decimal), with their number of arguments.
const CALLS = { C: 2, A: 2, binom: 2, 'Φ': 1, 'Ψ': 1, '#t': 2, '#chi': 2, '#phi': 1, '#z': 1, '#F': 3 };
const CALL_NAME = { C: 'binom', A: 'arr', binom: 'binom' };

const normalize = (s) => String(s)
  .replace(/[−–]/g, '-')
  .replace(/Φ\s*⁻\s*¹\s*\(/g, 'Ψ(').replace(/Φ\s*\^\s*\(\s*-\s*1\s*\)\s*\(/g, 'Ψ(').replace(/Φ\s*\^\s*-\s*1\s*\(/g, 'Ψ(')
  .replace(/\bPhi\s*\(/g, 'Φ(');

const squash = (s) => String(s).replace(/\s+/g, '').replace(/[−–]/g, '-');

// Index of the bracket closing the one opened at i (or -1).
function closing(s, i) {
  let depth = 0;
  for (let k = i; k < s.length; k++) {
    if ('([{'.includes(s[k])) depth++;
    else if (')]}'.includes(s[k])) { depth--; if (depth === 0) return k; }
  }
  return -1;
}
// Split at top level on one of the separators.
function splitTop(s, seps) {
  const out = [];
  let depth = 0;
  let cur = '';
  let ops = [];
  for (let k = 0; k < s.length; k++) {
    const c = s[k];
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    // An interval ]a ; b[ opens with ] and closes with [: the core reads it.
    if (depth === 0 && seps.includes(c)) { out.push(cur); ops.push(c); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return { parts: out, ops };
}

class ReadError extends Error {}

// One member: placeholders for calls, symbols and blanks, then the core.
function readMember(cfg, text, ctx) {
  let s = normalize(text);
  // Symbols bound by the item, longest first.
  const keys = Object.keys(cfg.symbols || {}).sort((a, b) => squash(b).length - squash(a).length);
  s = squash(s);
  for (const key of keys) {
    const k = squash(key);
    let at = s.indexOf(k);
    while (at >= 0) {
      const id = ctx.items.length;
      ctx.items.push({ kind: 'symbol', key });
      s = `${s.slice(0, at)}Ξ_${id}${s.slice(at + k.length)}`;
      at = s.indexOf(k, at + 3);
    }
  }
  // Calls C( A( Φ( Ψ( #t( …: arguments read on their own.
  for (;;) {
    const m = /(^|[^A-Za-z#])(C|A|binom|Φ|Ψ|#t|#chi|#phi|#z|#F)\(/.exec(s);
    if (!m) break;
    const name = m[2];
    const open = m.index + m[1].length + name.length;
    const close = closing(s, open);
    if (close < 0) throw new ReadError('Une parenthèse n\'est pas fermée.');
    const inner = s.slice(open + 1, close);
    const { parts } = splitTop(inner, CALLS[name] > 1 ? ',;' : ';');
    let args = parts;
    // « C(7,3) »: with one argument found, a decimal comma splits it.
    if (CALLS[name] === 2 && args.length === 1 && /^\d+,\d+$/.test(inner)) args = inner.split(',');
    if (args.length !== CALLS[name]) {
      throw new ReadError(name === 'C' || name === 'A' ? `${name}(n, k) prend deux nombres.` : `${name === 'Ψ' ? 'Φ⁻¹' : name} prend ${CALLS[name]} argument${CALLS[name] > 1 ? 's' : ''}.`);
    }
    const read = args.map((a) => readMember(cfg, a, ctx));
    const id = ctx.items.length;
    ctx.items.push({ kind: 'call', name: CALL_NAME[name] ?? name, args: read });
    s = `${s.slice(0, m.index + m[1].length)}ζ_${id}${s.slice(close + 1)}`;
  }
  // Blanks of a guided line (numbered across the whole line).
  // (readStat has numbered them from left to right: k.)
  s = s.replace(/(\d+)|□/g, (m0, k) => {
    const id = ctx.items.length;
    ctx.items.push({ kind: 'blank', id: k !== undefined ? Number(k) : ctx.blanks++ });
    return `η_${id}`;
  });
  // 12 % → (12/100).
  s = s.replace(/(\d+(?:[.,]\d+)?)%/g, '($1/100)');
  // Names of earlier parts ($xbar).
  s = s.replace(/\$([A-Za-z0-9]+)/g, (m0, name) => {
    const id = ctx.items.length;
    ctx.items.push({ kind: 'name', name });
    return `Ξ_${id}`;
  });
  let ast;
  try {
    ast = parse(s, { vars: cfg.vars || [] });
  } catch (e) {
    throw new ReadError(e.message);
  }
  // Placeholders back to nodes.
  return mapNode(ast, (n) => {
    if (n.t !== 'sym' || !['Ξ', 'ζ', 'η'].includes(n.name) || n.sub === undefined) return n;
    const id = Number(typeof n.sub === 'object' ? toText(n.sub) : n.sub);
    const it = ctx.items[id];
    if (!it) return n;
    if (it.kind === 'symbol') return { t: 'sym', name: it.key, pr: true };
    if (it.kind === 'name') return { t: 'sym', name: `$${it.name}`, ref: it.name };
    if (it.kind === 'blank') return { t: 'blank', id: it.id };
    return { t: 'fn', name: it.name, args: it.args };
  });
}

// The labels a line may start with: cfg.label (and cfg.labels).
const labelsOf = (cfg) => [cfg.label, ...(cfg.labels || [])].filter(Boolean);

export function readStat(cfg, input) {
  if (input && typeof input === 'object') return input;
  const raw = String(input ?? '').trim().replace(/^=\s*/, '');
  let body = squash(normalize(raw));
  let label = null;
  for (const L of labelsOf(cfg)) {
    const k = squash(normalize(L));
    if (body.startsWith(`${k}=`) || body.startsWith(`${k}≈`)) { label = L; body = body.slice(k.length + 1); break; }
  }
  let nb = 0;
  body = body.replace(/□/g, () => `${nb++}`);
  const { parts, ops } = splitTop(body, '=≈');
  const ctx = { items: [], blanks: 0 };
  if (parts.some((p) => !p)) throw new ReadError('Il manque un membre de chaque côté de « = ».');
  const members = parts.map((p, i) => ({ ast: readMember(cfg, p, ctx), op: i === 0 ? '' : ops[i - 1] }));
  return { t: 'sline', text: raw, label, members };
}

// A start line (« Pr(A ∪ B) », « x̄ », « ? »): read if possible, else shown as it is.
export function readStart(cfg, text) {
  // The part's own start (its label, « x̄ ») is shown as it is.
  if (text === cfg.start || text === cfg.label) return { t: 'sline', text: String(text), label: String(text), members: [], start: true };
  try {
    const n = readStat(cfg, text);
    // A start that is only a name of the part (x̄) has no value: kept as a label.
    return n;
  } catch {
    return { t: 'sline', text: String(text), label: String(text), members: [], start: true };
  }
}

export { ReadError };

// ---------- values ----------

const isInt = (x) => Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9;

// {q, x} of a value written as text (the symbols' values, cfg.ref).
const valueCache = new Map();
function textValue(cfg, text) {
  if (typeof text === 'number') return { q: Number.isInteger(text) ? new Q(text) : null, x: text };
  const key = String(text);
  // A text with $names depends on cfg.ref: not cached.
  const cached = !key.includes('$');
  if (cached && valueCache.has(key)) return valueCache.get(key);
  let v = null;
  try { v = statValue(cfg, readMember({ vars: [] }, key, { items: [], blanks: 0 }), {}); } catch { v = null; }
  if (valueCache.size > 2000) valueCache.clear();
  if (cached) valueCache.set(key, v);
  return v;
}

// A float as a node (kept exact when it is a short decimal).
const floatNode = (x) => ({ t: 'float', x });

// The value of a member. env: {name: {q, x}} for $name.
export function statValue(cfg, ast, env = {}) {
  ast = stripParen(ast);
  if (ast.t === 'set' && ast.kind === 'interval') {
    const lo = statValue(cfg, ast.lo, env);
    const hi = statValue(cfg, ast.hi, env);
    if (!lo || !hi) return null;
    return { q: null, x: NaN, lo: lo.x, hi: hi.x, interval: true };
  }
  let bad = null;
  const node = mapNode(ast, (n) => {
    if (n.t === 'sym' && n.pr) {
      const v = textValue(cfg, cfg.symbols?.[n.name]);
      if (!v) { bad = n.name; return n; }
      return v.q ? lit(v.q) : floatNode(v.x);
    }
    if (n.t === 'sym' && n.ref) {
      const v = env[n.ref] ?? (cfg.ref?.[n.ref] !== undefined ? textValue(cfg, cfg.ref[n.ref]) : null);
      if (!v) { bad = n.name; return n; }
      return v.q ? lit(v.q) : floatNode(v.x);
    }
    if (n.t === 'fn' && n.name in FN) {
      const args = n.args.map((a) => statValue(cfg, a, env));
      if (args.some((a) => !a)) { bad = n.name; return n; }
      const r = FN[n.name](args);
      if (r === null || r === undefined || (typeof r === 'number' && !Number.isFinite(r))) { bad = n.name; return n; }
      return r instanceof Q ? lit(r) : floatNode(r);
    }
    if (n.t === 'fn' && n.name === 'fact') {
      const a = statValue(cfg, n.args[0], env);
      if (!a || !isInt(a.x) || a.x < 0) { bad = 'n!'; return n; }
      const f = S.fact(Math.round(a.x));
      return Number.isSafeInteger(f) ? lit(new Q(f)) : floatNode(f);
    }
    return n;
  });
  if (bad) return null;
  let q = null;
  try { q = exactValue(node); } catch { q = null; }
  if (q) return { q, x: q.valueOf() };
  let x;
  try { x = evalFloat(node, {}); } catch { x = NaN; }
  if (typeof x !== 'number' || !Number.isFinite(x)) return null;
  return { q: null, x };
}

const QI = (x) => (Number.isSafeInteger(x) ? new Q(x) : x);
const FN = {
  binom: ([n, k]) => (isInt(n.x) && isInt(k.x) ? QI(S.choose(Math.round(n.x), Math.round(k.x))) : null),
  arr: ([n, k]) => (isInt(n.x) && isInt(k.x) ? QI(S.arrange(Math.round(n.x), Math.round(k.x))) : null),
  'Φ': ([z]) => S.Phi(z.x),
  'Ψ': ([p]) => (p.x > 0 && p.x < 1 ? S.PhiInv(p.x) : null),
  '#t': ([nu, a]) => S.courseT(Math.round(nu.x), a.x),
  '#chi': ([r, a]) => S.chi2Table(Math.round(r.x), a.x),
  '#phi': ([z]) => S.phiTable(z.x) ?? S.roundTo(S.Phi(z.x), 3),
  '#z': ([p]) => S.phiInvTable(p.x),
  '#F': ([p, m, n]) => S.fInv(p.x, m.x, n.x),
};

// The values the student gave to earlier parts (LinesRun keeps their last
// accepted line by the part's name, state.vals).
function envOf(cfg, state) {
  const env = {};
  for (const [name, node] of Object.entries(state?.vals || {})) {
    if (node?.t !== 'sline' || !node.members.length) continue;
    const last = node.members[node.members.length - 1].ast;
    let v = null;
    try { v = statValue(cfg, last, {}); } catch { v = null; }
    if (v && !v.interval) env[name] = v;
  }
  return env;
}

const expectCache = new Map();
// The value the part asks: cfg.expect (text, $names allowed), or an
// interval [lo, hi] (two texts).
export function expected(cfg, state) {
  if (cfg.expect === undefined || cfg.expect === null) return null;
  const env = envOf(cfg, state);
  if (Array.isArray(cfg.expect)) {
    const [lo, hi] = cfg.expect.map((t) => expected({ ...cfg, expect: t }, state));
    return lo && hi ? { q: null, x: NaN, lo: lo.x, hi: hi.x, interval: true } : null;
  }
  const text = String(cfg.expect);
  let ast = expectCache.get(text);
  if (!ast) {
    ast = readMember({ vars: [] }, text, { items: [], blanks: 0 });
    if (expectCache.size > 2000) expectCache.clear();
    expectCache.set(text, ast);
  }
  return statValue(cfg, ast, env);
}

// Number of decimals written in a literal member (0,0631 → 4), or null.
export function decimalsOf(ast) {
  let n = stripParen(ast);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t !== 'num') return null;
  const s = String(n.s ?? '');
  const m = /[.,](\d+)$/.exec(s);
  return m ? m[1].length : 0;
}
// A number written out: 3, −3, 0,25, 3/4 (whole numbers over whole numbers).
export function literalKind(ast) {
  let n = stripParen(ast);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t === 'num') return /[.,]/.test(String(n.s ?? '')) ? 'decimal' : 'int';
  if (n.t === 'float') return 'decimal';
  if (n.t === 'frac' && n.n.t === 'num' && n.d.t === 'num' && !/[.,]/.test(`${n.n.s}${n.d.s}`)) return 'fraction';
  return null;
}
export const isIrreducible = (ast) => {
  let n = stripParen(ast);
  if (n.t === 'neg') n = stripParen(n.e);
  const v = numValue(n);
  return !!v && n.t === 'frac' && v.d === n.d.v.n && v.d !== 1;
};

// ---------- display ----------

// Pr(A∩B), Pr(+|M^c): Pr upright, the event read symbol by symbol.
function prML(key) {
  const m = /^(Pr|P)\((.*)\)$/.exec(squash(key));
  const inner = (s) => [...s.replace(/\^c/g, 'ᶜ')].map((c) => (/[A-Za-z]/.test(c) ? `<mi>${esc(c)}</mi>` : /[0-9]/.test(c) ? `<mn>${c}</mn>` : `<mo>${esc(c === '-' ? '−' : c)}</mo>`)).join('');
  if (!m) return `<mi>${esc(key)}</mi>`;
  return `<mrow><mi mathvariant="normal">${m[1]}</mi><mo stretchy="false">(</mo>${inner(m[2])}<mo stretchy="false">)</mo></mrow>`;
}

// MathML of a member: the calls drawn by hand (C(n, k) as a binomial).
function memberML(cfg, ast, opts = {}) {
  const parts = [];
  const node = mapNode(ast, (n) => {
    if (n.t === 'fn' && (n.name === 'binom' || n.name === 'arr' || n.name.startsWith('#') || n.name === 'Ψ')) {
      parts.push(n);
      return { t: 'sym', name: `@${parts.length - 1}@` };
    }
    if (n.t === 'sym' && (n.pr || n.ref)) {
      parts.push(n);
      return { t: 'sym', name: `@${parts.length - 1}@` };
    }
    return n;
  });
  let ml = toMathML(node, opts).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
  const inner = (a) => toMathML(stripParen(a), opts).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
  parts.forEach((n, i) => {
    let out;
    if (n.t === 'sym') out = n.pr ? prML(n.name) : `<mi>${esc(n.ref)}</mi>`;
    else if (n.name === 'binom') out = `<mrow><mo>(</mo><mfrac linethickness="0">${inner(n.args[0])}${inner(n.args[1])}</mfrac><mo>)</mo></mrow>`;
    else if (n.name === 'arr') out = `<mrow><mi>A</mi><mo>&#x2061;</mo><mo stretchy="false">(</mo>${inner(n.args[0])}<mo>,</mo>${inner(n.args[1])}<mo stretchy="false">)</mo></mrow>`;
    else if (n.name === 'Ψ') out = `<mrow><msup><mi mathvariant="normal">Φ</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mo stretchy="false">(</mo>${inner(n.args[0])}<mo stretchy="false">)</mo></mrow>`;
    else out = `<mi>${esc(n.name)}</mi><mo stretchy="false">(</mo>${n.args.map(inner).join('<mo>,</mo>')}<mo stretchy="false">)</mo>`;
    ml = ml.replace(`<mi>@${i}@</mi>`, out);
  });
  return ml;
}

// MathML of a label: x̄, s², t_obs, Pr(M|+), Φ(2).
export function labelML(label) {
  if (/^(Pr|P)\(/.test(label)) return prML(label);
  const m = /^([^_²]+)(²)?(?:_(\w+))?$/.exec(label);
  if (!m) return `<mi>${esc(label)}</mi>`;
  let base = `<mi>${esc(m[1])}</mi>`;
  if (m[3]) base = `<msub>${base}<mi>${esc(m[3])}</mi></msub>`;
  if (m[2]) base = `<msup>${base}<mn>2</mn></msup>`;
  return base;
}

export function statML(cfg, node, opts = {}) {
  const display = opts.display === 'block' ? ' display="block"' : '';
  const alt = esc(node.text ?? '').replace(/"/g, '&quot;');
  if (!node.members?.length) return `<math alttext="${alt}"${display}>${labelML(node.label ?? node.text ?? '')}</math>`;
  const out = [];
  if (node.label) out.push(labelML(node.label));
  node.members.forEach((m, i) => {
    if (out.length) out.push(`<mo>${m.op === '≈' ? '≈' : '='}</mo>`);
    out.push(memberML(cfg, m.ast, opts));
  });
  return `<math alttext="${alt}"${display}><mrow>${out.join('')}</mrow></math>`;
}

export function statTemplateML(cfg, text, blanks = {}) {
  try {
    const node = readStat({ ...cfg, symbols: cfg.symbols }, text);
    return statML(cfg, node, { blanks });
  } catch {
    return `<math><mtext>${esc(text)}</mtext></math>`;
  }
}

// The text of a value for the screen: 0,977 ; 15/28 ; −1,5.
export const fmt = (x, d = 3) => String(Number(x.toFixed(d))).replace('.', ',').replace('-', '−');
