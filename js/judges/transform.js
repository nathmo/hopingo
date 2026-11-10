// Judge `transform` (spec §5.2 and §16.2, step U10, module F): Fourier and
// Laplace transforms, forward or inverse. A line is right if it describes
// the same pair (f, F) as the reference: a line in the transform variable
// s (α or z) has the values of F at 6 points; a line in the variable v
// (x or t) has the values of f at 8 points of the domain. The values of F
// are exact (cfg.F, a text) or numeric (js/cas/transforms.js, from cfg.f).
//
// cfg: {kind: 'transform', transform: 'fourier' | 'laplace', v, s,
//       f: text in v (forward: the function transformed; inverse: the answer),
//       F?: text in s (its transform; computed numerically from f if absent),
//       dir: 'forward' (final: a line in s) | 'inverse' (final: a line in v),
//       params?: {a: 2} (constant letters), symbols?: {'f̂': text in s}
//       (known transforms named in the lines), unknown?: 'û' | 'Y' (the
//       transform of the unknown function, whose value is F: equations),
//       halfPlane?: true (Laplace forward: the final line gives « Re z > γ₀ »),
//       gamma0?: number (abscissa, 0 by default), domain?: [lo, hi] (of v),
//       final?: 'transform' | 'function' | 'any', table?: 'mt2122' | 'dt'}
// Lines:
//   [label =] member [= member …]   members all equal (each in s or in v);
//       a first member that is a name (f̂(α), F(z), u(x), Y) is a label.
//   an equation in the unknown (2û + 3√(2π)f̂û = f̂, z²Y − z − 1 + 2(zY − 1) + Y = 1/z):
//       right if F satisfies it at the 6 points and it still fixes the
//       unknown (it is false for F + 1).
//   ℱ(g) and ℒ(g) (or 𝓕, 𝓛) inside a line in s: the transform of g (a function of v),
//       computed numerically; « 𝓕(g)(α) » is read as 𝓕(g).
//   a half-plane, alone or after the value: « Re z > 2 », « F(z) = 1/(z − 2), Re(z) > 2 ».
//   H(u) is the Heaviside function, sgn(u) the sign.
// Final: dir forward: a line in s without 𝓕, 𝓛 or unknown, with the
// half-plane when cfg.halfPlane (else `stay`, trap f_lap_abscissa); dir
// inverse: a line in v without 𝓕 or 𝓛. A right line in the other variable
// is a step (`ok`): rewriting f before transforming it, or F before
// inverting it.
// Traps (judges: ['transform']) receive prev and ctx.cfg; their candidates
// are texts or CAS nodes (compared like a member).

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { mapNode, symbolsIn, contains } from '../cas/ast.js';
import { fourierAt, laplaceAt, valueAt, heaviside } from '../cas/transforms.js';
import { C, evalComplex } from '../cas/complex.js';
import { diagnoseLine } from './diagnose.js';

export const sign = '=';

const NFD = (s) => String(s).normalize('NFD');
const HOLES = ['Ξ', 'Ψ', 'Φ', 'Θ', 'Λ', 'Γ'];
// ℱ and ℒ (the keypad's keys) or 𝓕 and 𝓛.
const OPS = { 'ℱ': 'fourier', 'ℒ': 'laplace', '𝓕': 'fourier', '𝓛': 'laplace' };

const vOf = (cfg) => cfg.v || (cfg.transform === 'laplace' ? 't' : 'x');
const sOf = (cfg) => cfg.s || (cfg.transform === 'laplace' ? 'z' : 'α');
const symbolNames = (cfg) => Object.keys(cfg.symbols || {}).map(NFD);
const varsOf = (cfg) => [vOf(cfg), sOf(cfg), ...Object.keys(cfg.params || {}), ...symbolNames(cfg), ...(cfg.unknown ? [NFD(cfg.unknown)] : [])];
const popts = (cfg) => ({ vars: varsOf(cfg), funcs: ['H', 'sgn', ...(cfg.funcs || [])], complex: true });

// ---------- reading ----------

// Splits text at the top-level occurrences of sep (outside brackets).
function splitTop(text, sep) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (depth === 0 && text.startsWith(sep, i)) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

// 𝓕(g) and 𝓛(g) → a capital Greek letter each (holes: Ξ, Ψ, Φ…); « (α) »
// right after is dropped.
function takeHoles(text, cfg) {
  const holes = [];
  let out = '';
  let i = 0;
  const chars = [...text];
  while (i < chars.length) {
    const c = chars[i];
    if (OPS[c] && chars[i + 1] === '(') {
      let depth = 0;
      let j = i + 1;
      for (; j < chars.length; j++) {
        if (chars[j] === '(') depth++;
        if (chars[j] === ')') { depth--; if (depth === 0) break; }
      }
      if (depth !== 0) throw new Error('Une parenthèse de 𝓕(…) n\'est pas fermée.');
      const inner = chars.slice(i + 2, j).join('');
      const op = OPS[c];
      const name = HOLES[holes.length];
      if (!name) throw new Error('Trop de 𝓕(…) dans une ligne.');
      holes.push({ name, op, inner: parse(inner, popts(cfg)), text: inner });
      out += ` ${name} `;
      i = j + 1;
      // 𝓕(g)(α): the argument is the transform variable.
      const rest = chars.slice(i).join('');
      const m = new RegExp(`^\\s*\\(\\s*${sOf(cfg)}\\s*\\)`).exec(rest);
      if (m) i += [...m[0]].length;
      continue;
    }
    out += c;
    i++;
  }
  return { text: out, holes };
}

const LABEL = /^\s*(?:[A-Za-zα-ωΑ-Ωℱℒ𝓕𝓛][̂]?(?:_[A-Za-z0-9]+)?(?:\([^()=]*\))?(?:\([^()=]*\))?)\s*$/u;

// A line node: {t: 'tline', text, label, members: [{node, raw, holes, kind}],
// eq: {l, r, holes} | null, half: number | null}.
function readStrict(cfg, input) {
  let text = NFD(String(input).trim()).replace(/^=\s*/, '');
  let half = null;
  // The half-plane: « …, Re z > 2 », « … ; Re(z) > 2 », « pour Re z > 2 ».
  const hm = /(?:^|[,;]|\s+pour)\s*Re\s*\(?\s*z\s*\)?\s*>\s*([^,;]+)$/.exec(text);
  if (hm) {
    const g = parse(hm[1], { vars: Object.keys(cfg.params || {}) });
    half = valueAt(g, cfg.params || {})?.re ?? NaN;
    if (!Number.isFinite(half)) throw new Error('Je ne lis pas le demi-plan.');
    text = text.slice(0, hm.index).trim();
  }
  if (!text) return { t: 'tline', text: String(input).trim(), label: null, members: [], eq: null, half };
  const parts = splitTop(text, '=').map((p) => p.trim());
  if (parts.some((p) => !p)) throw new Error('Un membre de ta ligne est vide.');
  const unknown = cfg.unknown ? NFD(cfg.unknown) : null;
  let label = null;
  let rest = parts;
  if (parts.length > 1 && LABEL.test(parts[0]) && !(unknown && parts[0] === unknown && parts.slice(1).some((p) => p.includes(unknown)))) {
    label = parts[0];
    rest = parts.slice(1);
  }
  const read = (p) => {
    const { text: t, holes } = takeHoles(p, cfg);
    const node = parse(t, { ...popts(cfg), vars: [...popts(cfg).vars, ...holes.map((h) => h.name)] });
    return { node, raw: p, holes };
  };
  // An equation in the unknown.
  if (unknown && rest.length === 2 && rest.some((p) => p.includes(unknown))) {
    const l = read(rest[0]);
    const r = read(rest[1]);
    return { t: 'tline', text: String(input).trim(), label, members: [], eq: { l, r }, half };
  }
  const members = rest.map((p) => {
    const m = read(p);
    if (unknown && symbolsIn(m.node).has(unknown)) throw new Error(`Écris une équation en ${cfg.unknown}, ou sa valeur.`);
    return { ...m, kind: kindOf(cfg, m) };
  });
  return { t: 'tline', text: String(input).trim(), label, members, eq: null, half };
}

function kindOf(cfg, m) {
  const syms = symbolsIn(m.node);
  const hasV = syms.has(vOf(cfg));
  const hasS = syms.has(sOf(cfg)) || m.holes.length > 0 || symbolNames(cfg).some((n) => syms.has(n));
  if (hasV && hasS) return 'mixed';
  if (hasV) return 'v';
  if (hasS) return 's';
  return 'c';
}

// Lenient: a line that cannot be read is shown as it is (the start).
export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'tline', text: String(text).trim(), label: String(text).trim(), members: [], eq: null, half: null, raw: true }; }
}

// ---------- display ----------

function memberML(m) {
  const map = new Map(m.holes.map((h) => [h.name, h]));
  const n = mapNode(m.node, (x) => {
    if (x.t === 'sym' && !x.sub && map.has(x.name)) {
      const h = map.get(x.name);
      return { t: 'fn', name: h.op === 'fourier' ? '𝓕' : '𝓛', args: [h.inner] };
    }
    return x;
  });
  return toMathML(n).replace(/^<math[^>]*>|<\/math>$/g, '');
}

export function show(cfg, node, { display } = {}) {
  const parts = [];
  if (node.raw || (!node.members.length && !node.eq && node.half === null)) {
    let ml;
    try { ml = toMathML(parse(NFD(node.text), popts(cfg))).replace(/^<math[^>]*>|<\/math>$/g, ''); } catch { ml = `<mtext>${node.text}</mtext>`; }
    return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}">${ml}</math>`;
  }
  if (node.label) {
    try { parts.push(toMathML(parse(node.label, popts(cfg))).replace(/^<math[^>]*>|<\/math>$/g, '')); } catch { parts.push(`<mi>${node.label}</mi>`); }
  }
  if (node.eq) parts.push(memberML(node.eq.l), memberML(node.eq.r));
  for (const m of node.members) parts.push(memberML(m));
  let body = `<mrow>${parts.join('<mo>=</mo>')}</mrow>`;
  if (node.half !== null) body += `${parts.length ? '<mo>,</mo><mspace width="0.5em"/>' : ''}<mrow><mi>Re</mi><mo>&#x2061;</mo><mi>z</mi><mo>&gt;</mo><mn>${String(node.half).replace('.', ',')}</mn></mrow>`;
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}"><mrow>${body}</mrow></math>`;
}
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

// ---------- values ----------

const REF = new WeakMap();
function refOf(cfg) {
  if (REF.has(cfg)) return REF.get(cfg);
  const o = popts(cfg);
  const env = cfg.params || {};
  const f = cfg.f ? parse(NFD(cfg.f), o) : null;
  const F = cfg.F ? parse(NFD(cfg.F), o) : null;
  const sPts = cfg.points || (cfg.transform === 'laplace'
    ? [1.3, 1.9, 2.6, 3.4, 4.5, 6].map((d) => (cfg.gamma0 ?? 0) + d)
    : [-2.3, -0.7, 0.45, 1.1, 1.9, 3.2]);
  const [lo, hi] = cfg.domain || (cfg.transform === 'laplace' ? [0.05, 4] : [-3, 3]);
  const vPts = Array.from({ length: 8 }, (_, k) => lo + ((hi - lo) * (k + 0.5 + 0.1234 * ((k * 7) % 3))) / 8.4);
  const sym = {};
  for (const [k, t] of Object.entries(cfg.symbols || {})) sym[NFD(k)] = parse(NFD(t), o);
  const Fvals = sPts.map((s) => (F ? valueAt(F, { ...env, [sOf(cfg)]: s }) : transformAt(cfg, f, s, env)));
  const fvals = f ? vPts.map((x) => valueAt(f, { ...env, [vOf(cfg)]: x })) : null;
  const r = { f, F, sPts, vPts, Fvals, fvals, sym, env };
  REF.set(cfg, r);
  return r;
}

function transformAt(cfg, g, s, env) {
  return cfg.transform === 'laplace' ? C(laplaceAt(g, vOf(cfg), s, { env })) : fourierAt(g, vOf(cfg), s, { env });
}

// The env of a line in s at the k-th point: s, the params, the symbols and the holes.
function sEnv(cfg, ref, k, holes) {
  const s = ref.sPts[k];
  const env = { ...ref.env, [sOf(cfg)]: s };
  for (const [name, node] of Object.entries(ref.sym)) env[name] = valueAt(node, { ...ref.env, [sOf(cfg)]: s });
  for (const h of holes || []) env[h.name] = h.op === 'laplace' ? C(laplaceAt(h.inner, vOf(cfg), s, { env: ref.env })) : fourierAt(h.inner, vOf(cfg), s, { env: ref.env });
  return env;
}

const close = (a, b, tol = 1e-7) => !!a && !!b && Math.abs(a.re - b.re) <= tol * (1 + Math.abs(a.re) + Math.abs(b.re) + Math.abs(a.im) + Math.abs(b.im))
  && Math.abs(a.im - b.im) <= tol * (1 + Math.abs(a.re) + Math.abs(b.re) + Math.abs(a.im) + Math.abs(b.im));
const cval = (node, env) => {
  // Complex values of the symbols or the holes need the complex evaluator.
  if (Object.values(env).some((v) => v && typeof v === 'object' && 're' in v && Math.abs(v.im) > 0)) return evalComplex(heaviside(node), env);
  return valueAt(node, Object.fromEntries(Object.entries(env).map(([k, v]) => [k, v && typeof v === 'object' && 're' in v ? v.re : v])));
};

// Values of a member: {kind, vals} (vals at the s points or the v points).
function valuesOf(cfg, m) {
  const ref = refOf(cfg);
  if (m.kind === 's' || (m.kind === 'c' && (cfg.dir ?? 'forward') === 'forward')) {
    return { kind: 's', vals: ref.sPts.map((_, k) => cval(m.node, sEnv(cfg, ref, k, m.holes))) };
  }
  if (m.kind === 'v' || m.kind === 'c') return { kind: 'v', vals: ref.vPts.map((x) => valueAt(m.node, { ...ref.env, [vOf(cfg)]: x })) };
  return { kind: 'mixed', vals: [] };
}

// Does a member describe the reference pair? 'yes' | 'no' | 'undefined'.
function matches(cfg, m) {
  const ref = refOf(cfg);
  const { kind, vals } = valuesOf(cfg, m);
  if (kind === 'mixed') return 'mixed';
  const want = kind === 's' ? ref.Fvals : ref.fvals;
  if (!want) return 'no';
  let n = 0;
  for (let k = 0; k < vals.length; k++) {
    if (!want[k]) continue;
    if (!vals[k]) return 'undefined';
    if (!close(vals[k], want[k])) return 'no';
    n++;
  }
  return n >= Math.min(4, vals.length) ? 'yes' : 'no';
}

// An equation in the unknown: F satisfies it, F + 1 does not.
function equationHolds(cfg, eq) {
  const ref = refOf(cfg);
  const u = NFD(cfg.unknown);
  let fixes = false;
  for (let k = 0; k < ref.sPts.length; k++) {
    const F = ref.Fvals[k];
    if (!F) continue;
    const base = sEnv(cfg, ref, k, [...eq.l.holes, ...eq.r.holes]);
    const at = (U) => {
      const env = { ...base, [u]: U };
      const l = cval(eq.l.node, env);
      const r = cval(eq.r.node, env);
      return l && r ? C(l.re - r.re, l.im - r.im) : null;
    };
    const d = at(F);
    if (!d) return false;
    const scale = 1 + Math.abs(F.re) + Math.abs(F.im);
    if (Math.hypot(d.re, d.im) > 1e-7 * scale * 10) return false;
    const d2 = at(C(F.re + 1, F.im));
    if (d2 && Math.hypot(d2.re, d2.im) > 1e-6) fixes = true;
  }
  return fixes;
}

// ---------- verdicts ----------

const wantFinal = (cfg) => cfg.final || ((cfg.dir ?? 'forward') === 'inverse' ? 'function' : 'transform');

export function isFinal(cfg, node, state = {}) {
  if (node.eq || !node.members.length) return false;
  const last = node.members[node.members.length - 1];
  if (last.holes.length) return false;
  const kind = last.kind === 'c' ? ((cfg.dir ?? 'forward') === 'forward' ? 's' : 'v') : last.kind;
  const w = wantFinal(cfg);
  if (w === 'any') return true;
  if (w === 'transform' && kind !== 's') return false;
  if (w === 'function' && kind !== 'v') return false;
  if (w === 'transform' && symbolNames(cfg).some((n) => symbolsIn(last.node).has(n))) return false;
  if (cfg.halfPlane && w === 'transform' && node.half === null && state.half === undefined) {
    return 'Juste. Donne aussi le demi-plan où la transformée existe : « Re z > … ».';
  }
  return true;
}

function sameAsCandidate(cfg, cand, node) {
  let c = cand;
  if (typeof c === 'string') c = parseLine(cfg, c);
  else if (c && c.t !== 'tline') c = { t: 'tline', members: [{ node: c, raw: '', holes: [], kind: kindOf(cfg, { node: c, holes: [] }) }], eq: null, half: null };
  if (!c?.members?.length || !node.members.length) return false;
  const a = valuesOf(cfg, c.members[c.members.length - 1]);
  const b = valuesOf(cfg, node.members[node.members.length - 1]);
  if (a.kind !== b.kind || !a.vals.length) return false;
  return a.vals.every((x, k) => (x && b.vals[k] ? close(x, b.vals[k]) : !x && !b.vals[k]));
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object' && input.t === 'tline') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  // The half-plane.
  if (node.half !== null) {
    const g0 = cfg.gamma0 ?? 0;
    if (Math.abs(node.half - g0) > 1e-9) {
      return { kind: 'wrong', node, rule: 'f_lap_abscissa', message: `La transformée existe pour Re z > ${String(g0).replace('.', ',')}, pas pour Re z > ${String(node.half).replace('.', ',')}.` };
    }
    state.half = node.half;
    if (!node.members.length && !node.eq) return { kind: 'ok', node, message: 'Le demi-plan est juste.' };
  }
  if (node.eq) {
    if (equationHolds(cfg, node.eq)) return { kind: 'ok', node };
    return { kind: 'wrong', node, message: `Cette équation n'est pas vérifiée par la transformée de l'inconnue.`, rule: null };
  }
  // Every member describes the reference pair.
  for (const m of node.members) {
    const r = matches(cfg, m);
    if (r === 'yes') continue;
    if (r === 'mixed') return { kind: 'form', node, message: `Ta ligne mélange ${vOf(cfg)} et ${sOf(cfg)}.` };
    const diag = diagnoseLine('transform', prev, node, cfg, (cand, n) => sameAsCandidate(cfg, cand, n));
    const message = r === 'undefined' ? 'Ta ligne n\'est pas définie partout où on la compare.'
      : m.kind === 'v' ? `Ce n'est pas la bonne fonction de ${vOf(cfg)}.` : `Ce n'est pas la bonne transformée.`;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = isFinal(cfg, node, state);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin, rule: 'f_lap_abscissa' };
  return { kind: 'ok', node };
}

// For the generators and the traps: the values of a text at the s points.
export function sValues(cfg, textOrNode) {
  const n = typeof textOrNode === 'string' ? parse(NFD(textOrNode), popts(cfg)) : textOrNode;
  const ref = refOf(cfg);
  return ref.sPts.map((_, k) => cval(heaviside(n), sEnv(cfg, ref, k, [])));
}
export { refOf, contains };
