// Judge `vector` (step U5): points, vectors and the numbers computed from
// them (G4, G10). It is the « value avec {form: 'point' | 'vector',
// symbols} » of the catalogue G (§16.2), as its own judge: its lines are
// read by js/cas/vecexpr.js, not by the CAS parser.
//
// cfg: {kind: 'vector', symbols: {A: '(2 ; 1)', u: '(1 ; 0 ; 2)'}, params?: ['s', 't'],
//       expect?: text (the value asked: a line is right if it has it, whatever
//       the previous line), multiple?: true (any nonzero multiple of expect:
//       a normal vector, a direction), signed?: true (expect or its opposite:
//       a unit vector of a frame), form?: 'literal' (default) | 'any',
//       angle?: true (arccos(1/3) is final)}
// A line: an optional label, then members separated by « = », each one
// computed and all equal: « C = 2M − A = (6 ; 3) ». The value of the line is
// its last member. Final: a written-out point or vector ((6 ; 3), (2/3 ; √2)),
// or a number in exact form (3√6/2).
// Traps (judges: ['vector']) receive prev, ctx.cfg; lines: vline(value).

import {
  parseVec, evalVec, envFrom, namesOf, sameVal, isMultiple, isZeroVal, splitTop, normVecText,
  astML, labelML, vText, V, S,
} from '../cas/vecexpr.js';
import { exactForm } from '../cas/exactform.js';
import { stripParen } from '../cas/ast.js';
import { diagnoseLine } from './diagnose.js';
import { t as tr } from '../i18n.js';

export const sign = '=';

const ENV = new WeakMap();
export function envOf(cfg) {
  if (!ENV.has(cfg)) {
    const opts = { params: cfg.params || [] };
    const env = envFrom(cfg.symbols || {}, opts);
    ENV.set(cfg, env);
  }
  return ENV.get(cfg);
}
export const vopts = (cfg) => ({ params: cfg.params || [], names: namesOf(envOf(cfg)) });

const EXP = new WeakMap();
export function expected(cfg) {
  if (cfg.expect === undefined || cfg.expect === null) return null;
  if (!EXP.has(cfg)) EXP.set(cfg, evalVec(parseVec(String(cfg.expect), vopts(cfg)), envOf(cfg), vopts(cfg)));
  return EXP.get(cfg);
}

// A line node: {t:'vline', text, label, members: [{ast, value}], value}.
function readStrict(cfg, text) {
  const t = normVecText(text).replace(/^=\s*/, '');
  const parts = splitTop(t, '=').map((s) => s.trim());
  if (parts.some((p) => !p)) throw new Error(tr('Un membre de ta ligne est vide.'));
  const opts = vopts(cfg);
  const env = envOf(cfg);
  const members = [];
  let label = null;
  parts.forEach((p, i) => {
    let ast;
    let value;
    try {
      ast = parseVec(p, opts);
      value = evalVec(ast, env, opts);
    } catch (e) {
      // The first member may be a name: C, θ, cos θ, n⃗, d(P, α).
      if (i === 0 && parts.length > 1 && p.length <= 24) { label = p; return; }
      throw e;
    }
    members.push({ ast, value });
  });
  return { t: 'vline', text: String(text).trim(), label, members, value: members.length ? members[members.length - 1].value : null };
}

// Lenient: a line that cannot be computed is a label (the start « C »).
export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'vline', text: String(text).trim(), label: String(text).trim(), members: [], value: null }; }
}

// A line built from a value (traps, menus).
export const vline = (value, label = null) => ({ t: 'vline', text: `${label ? `${label} = ` : ''}${vText(value)}`, label, members: [{ ast: null, value }], value });

export function show(cfg, node, { display } = {}) {
  const parts = [];
  if (node.label) parts.push(labelML(node.label));
  for (const m of node.members || []) parts.push(m.ast ? astML(m.ast) : valueML(m.value));
  return `<math${display ? ' display="block"' : ''} alttext="${(node.text || '').replace(/"/g, '&quot;')}"><mrow>${parts.join('<mo>=</mo>')}</mrow></math>`;
}
export const text = (cfg, node) => node.text;

// A guided line with blanks (□), as MathML (js/ui/lines.js).
export function templateML(cfg, tpl, blanks = {}) {
  const parts = splitTop(normVecText(tpl), '=');
  const opts = { ...vopts(cfg), _blanks: { n: 0 } };
  const out = parts.map((p, i) => { try { return astML(parseVec(p, opts), blanks); } catch { return i === 0 ? labelML(p) : `<mtext>${p}</mtext>`; } });
  return `<math><mrow>${out.join('<mo>=</mo>')}</mrow></math>`;
}

function valueML(v) {
  try { return astML(parseVec(vText(v), {})); } catch { return `<mtext>${vText(v)}</mtext>`; }
}

export const start = (cfg) => cfg.start;

// A written-out number in final form.
function finalScalar(n, cfg) {
  const s = stripParen(n);
  if (cfg.angle && s.t === 'fn' && ['arccos', 'arcsin', 'arctan'].includes(s.name) && exactForm(s.args[0]) === true) return true;
  return exactForm(n);
}

export function isFinal(cfg, node) {
  if (!node.value) return false;
  if ((cfg.form ?? 'literal') === 'any') return true;
  const last = node.members[node.members.length - 1];
  const ast = last.ast;
  if (node.value.k === 's') {
    if (ast && (hasVector(ast) || !written(ast))) return false;
    return finalScalar(node.value.n, cfg);
  }
  if (ast && ast.op !== 'tuple') return false;
  for (const n of node.value.items) {
    const f = finalScalar(n, cfg);
    if (f !== true) return typeof f === 'string' ? f : false;
  }
  // Each component as written must be final too (not 8 − 2).
  if (ast && ast.items.some((x) => !written(x))) return false;
  return true;
}

// A member written out: no operation left between numbers (8 − 2, 2·3).
function written(ast) {
  if (!ast) return true;
  switch (ast.op) {
    case 'num': case 'name': return true;
    case 'paren': return written(ast.e);
    case 'neg': return written(ast.e) && ast.e.op !== 'neg';
    case 'sqrt': return ast.e.op === 'num';
    case 'fn': return true;
    case 'div': return isNumLike(ast.a) && isNumLike(ast.b);
    case 'mul': return (ast.a.op === 'num' || ast.a.op === 'neg') && (ast.b.op === 'sqrt' || ast.b.op === 'name' || (ast.b.op === 'num' && ast.b.n.t === 'const'));
    case 'add': case 'sub': return written(ast.a) && written(ast.b) && (hasRoot(ast.a) !== hasRoot(ast.b));
    default: return false;
  }
}
const hasRoot = (a) => !!a && (a.op === 'sqrt' || (a.op === 'num' && a.n.t === 'const') || ['a', 'b', 'e'].some((k) => a[k] && hasRoot(a[k])));
const isNumLike = (a) => a.op === 'num' || a.op === 'sqrt' || (a.op === 'mul' && written(a)) || (a.op === 'paren' && written(a.e)) || ((a.op === 'add' || a.op === 'sub') && written(a)) || (a.op === 'neg' && isNumLike(a.e));
const hasVector = (a) => !!a && (a.op === 'tuple' || a.op === 'vecAB' || ['a', 'b', 'e'].some((k) => a[k] && hasVector(a[k])));

function sameAs(cfg, want, value) {
  if (!want || !value) return false;
  if (cfg.multiple) return isMultiple(want, value);
  if (sameVal(want, value, cfg)) return true;
  if (cfg.signed && want.k === 'v') return sameVal(V(want.items.map((x) => ({ t: 'neg', e: x }))), value, cfg);
  return false;
}

export function judgeLine(cfg, prev, input) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (!node.value) return { kind: 'form', node, message: tr('Écris une valeur : un point, un vecteur ou un nombre.') };
  // Members of one line must be equal.
  for (let i = 1; i < node.members.length; i++) {
    if (!sameVal(node.members[i - 1].value, node.members[i].value, cfg)) {
      return { kind: 'wrong', node, message: tr('Les membres de ta ligne ne sont pas égaux : {a} ≠ {b}.', { a: vText(node.members[i - 1].value), b: vText(node.members[i].value) }), rule: null, diag: null };
    }
  }
  const want = expected(cfg) ?? prev?.value;
  if (!want) return { kind: 'form', node, message: tr('Je ne sais pas à quoi comparer ta ligne.') };
  if (cfg.expect === undefined && prev?.text && node.text === prev.text) return { kind: 'same', node, message: tr('Avance d\'au moins une étape.') };
  if (cfg.multiple && isZeroVal(node.value)) return { kind: 'wrong', node, message: tr('Le vecteur nul ne convient pas.') };
  if (!sameAs(cfg, want, node.value)) {
    const diag = diagnoseLine('vector', prev, node, cfg, (c, n) => sameVal(c.value ?? c, n.value, cfg) || (cfg.multiple && isMultiple(c.value ?? c, n.value)));
    let message = tr('Ce n\'est pas la bonne valeur.');
    if (want.k !== node.value.k) message = want.k === 'v' ? tr('On attend un point ou un vecteur.') : tr('On attend un nombre.');
    else if (want.k === 'v' && want.items.length !== node.value.items.length) message = tr('On attend {n} composantes.', { n: want.items.length });
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}

export { V, S, vText };
