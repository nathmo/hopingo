// Judge `boundary` (spec §5.2 and §16.2, step U10, module V): the oriented
// boundary ∂Σ = σ(∂A) of a parametrised surface (or the boundary of a
// domain of the plane), written piece by piece. The sides of ∂A whose
// image is a point are removed, so are the pairs run through twice in
// opposite directions; the pieces left must be given with the orientation
// of σ(∂A) (or the domain on the left).
//
// cfg: {kind: 'boundary', sides: [
//         {name: 'Γ1', point: true},                       a side whose image is a point
//         {name: 'Γ2', cancels: 'Γ4', ref?, t?},           a side cancelled by another (ref: its image, to name the trap)
//         {name: 'Γ3', ref: '(3cos(t) ; 3sin(t) ; 0)', t: [0, '2π'], closed?: true},   a piece kept
//       ], params?: ['t']}
// A line, one piece or one decision per line:
//   « Γ3 : (3cos(t) ; 3sin(t) ; 0), t ∈ [0 ; 2π] »   a piece (the name is optional)
//   « Γ1 : point »  (or a constant tuple « Γ1 : (0 ; 0 ; 3) »)
//   « Γ2 et Γ4 : s'annulent »
//   « ∂Σ = Γ2 ∪ Γ3 »   the pieces kept, by name
// Final: every kept piece given (state.found), or the union of their names
// once each was given. Wrong pieces name v_boundary_orient (the other way
// round) or v_boundary_pieces (a side that is a point, or that cancels).

import { readParam, compile, compareCurve, normText, splitTop } from '../cas/paramgeo.js';
import { parse } from '../cas/parse.js';
import { evalFloat } from '../cas/numeric.js';
import { symbolsIn } from '../cas/ast.js';
import { show as paramShow, lineMLOf } from './param.js';
import { diagnoseLine } from './diagnose.js';

export const sign = '';

const num = (x) => (typeof x === 'number' ? x : evalFloat(parse(String(x), {}), {}));
const canonName = (s) => normText(s).replace(/\s+/g, '').replace(/_/g, '').replace(/^G(?=\d)/, 'Γ');

const REF = new WeakMap();
function sidesOf(cfg) {
  if (REF.has(cfg)) return REF.get(cfg);
  const out = cfg.sides.map((s) => {
    const side = { ...s, key: canonName(s.name) };
    if (s.ref) {
      const par = readParam(s.ref, { params: [s.param || 't'] });
      side.curve = { f: compile({ ...par, params: [s.param || 't'] }), lo: num(s.t[0]), hi: num(s.t[1]), closed: !!s.closed };
    }
    return side;
  });
  REF.set(cfg, out);
  return out;
}
const kept = (cfg) => sidesOf(cfg).filter((s) => !s.point && !s.cancels && s.curve);

// {t: 'bline', text, names, what: 'piece' | 'point' | 'cancel' | 'union', par?}
function readStrict(cfg, input) {
  const text = normText(input);
  const union = /^∂\s*[A-ZΣΩa-z]*\s*=\s*(.+)$/.exec(text);
  if (union) {
    const names = union[1].split(/∪|,|\bet\b/).map((s) => canonName(s)).filter(Boolean);
    return { t: 'bline', text: String(input).trim(), names, what: 'union' };
  }
  const parts = splitTop(text, [' : ', ': ', ':']);
  let names = [];
  let body = text;
  if (parts.length === 2) {
    names = parts[0].split(/,|\bet\b/).map((s) => canonName(s)).filter(Boolean);
    body = parts[1];
  }
  const b = body.trim();
  if (/^(un\s+)?point$/i.test(b)) return { t: 'bline', text: String(input).trim(), names, what: 'point' };
  if (/annul/i.test(b)) return { t: 'bline', text: String(input).trim(), names, what: 'cancel' };
  const par = readParam(b, { params: cfg.params || ['t'] });
  if (!par.comps) throw new Error('Écris le morceau : (… ; … ; …), t ∈ [a ; b].');
  // A tuple without parameter: the image is a point.
  const free = par.comps.some((c) => [...symbolsIn(c)].length > 0);
  if (!free) return { t: 'bline', text: String(input).trim(), names, what: 'point', par };
  if (!par.bounds[par.params[0]]) throw new Error('Donne aussi l\'intervalle du paramètre : t ∈ [a ; b].');
  return { t: 'bline', text: String(input).trim(), names, what: 'piece', par };
}

export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'bline', text: String(text).trim(), names: [], what: 'raw' }; }
}

export function show(cfg, node, opts = {}) {
  const { display } = opts;
  if (node.what === 'piece' || (node.what === 'point' && node.par)) {
    const parts = splitTop(normText(node.text), [' : ', ': ', ':']);
    const ml = paramShow({ curve: { ref: '(t;t)', t: [0, 1] } }, { text: parts[parts.length - 1] }).replace(/^<math[^>]*>|<\/math>$/g, '');
    const head = parts.length === 2 ? `<mtext>${parts[0]}</mtext><mo>:</mo>` : '';
    return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}"><mrow>${head}${ml}</mrow></math>`;
  }
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}"><mtext>${node.text}</mtext></math>`;
}
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

// A guided piece with blanks (□), as MathML (js/ui/lines.js).
export function templateML(cfg, tpl, blanks = {}) {
  const parts = splitTop(normText(tpl), [' : ', ': ', ':']);
  const head = parts.length === 2 ? `<mtext>${parts[0]}</mtext><mo>:</mo>` : '';
  return `<math><mrow>${head}${lineMLOf({ params: cfg.params || ['t'] }, parts[parts.length - 1], blanks)}</mrow></math>`;
}

// The side a piece runs through: {side, orient} or null.
function matchPiece(cfg, par, sides) {
  const f = compile(par);
  const p = par.params[0];
  const obj = { f, lo: par.bounds[p][0], hi: par.bounds[p][1] };
  for (const s of sides) {
    if (!s.curve) continue;
    const r = compareCurve(obj, s.curve);
    if (r.on && r.covers) return { side: s, orient: r.orient, tours: r.tours };
  }
  return null;
}

export function isFinal(cfg, node, state = {}) {
  const found = state.found || new Set();
  return kept(cfg).every((s) => found.has(s.key));
}

function wrong(node, rule, message, cfg, prev) {
  const diag = rule ? null : diagnoseLine('boundary', prev, node, cfg, () => false);
  return { kind: 'wrong', node, rule: rule ?? diag?.rules[0] ?? null, message };
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object' && input.t === 'bline') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (node.what === 'raw') return { kind: 'parse', message: 'Écris un morceau du bord, « Γ1 : point » ou « Γ2 et Γ4 : s\'annulent ».' };
  state.found = state.found || new Set();
  const sides = sidesOf(cfg);
  const byKey = new Map(sides.map((s) => [s.key, s]));
  const done = () => (kept(cfg).every((s) => state.found.has(s.key)) ? { kind: 'done', node } : { kind: 'ok', node });
  for (const n of node.names) if (node.what !== 'union' && !byKey.has(n)) return { kind: 'parse', message: `Je ne connais pas le côté « ${n} ».` };

  if (node.what === 'union') {
    const want = new Set(kept(cfg).map((s) => s.key));
    const got = new Set(node.names);
    const extra = [...got].filter((n) => !want.has(n));
    if (extra.length) return wrong(node, 'v_boundary_pieces', `${extra[0]} ne fait pas partie du bord : il se réduit à un point ou s'annule.`, cfg, prev);
    const missing = [...want].filter((n) => !got.has(n));
    if (missing.length) return wrong(node, 'v_boundary_pieces', `Il manque ${missing[0]}.`, cfg, prev);
    const unwritten = [...want].filter((n) => !state.found.has(n));
    if (unwritten.length) return { kind: 'form', node, message: `Écris d'abord le morceau ${unwritten[0]}, avec son sens.` };
    return { kind: 'done', node };
  }
  if (node.what === 'point') {
    if (!node.names.length) return { kind: 'form', node, message: 'Dis quel côté devient un point : « Γ1 : point ».' };
    for (const n of node.names) {
      const s = byKey.get(n);
      if (!s.point) return wrong(node, 'v_boundary_pieces', `${s.name} ne se réduit pas à un point.`, cfg, prev);
    }
    return { kind: 'ok', node, message: 'Ce côté est retiré.' };
  }
  if (node.what === 'cancel') {
    if (node.names.length !== 2) return { kind: 'form', node, message: 'Nomme les deux côtés qui s\'annulent : « Γ2 et Γ4 : s\'annulent ».' };
    const [a, b] = node.names.map((n) => byKey.get(n));
    if (!(canonName(a.cancels || '') === b.key || canonName(b.cancels || '') === a.key)) return wrong(node, 'v_boundary_pieces', `${a.name} et ${b.name} ne s'annulent pas.`, cfg, prev);
    return { kind: 'ok', node, message: 'Ces deux côtés sont retirés.' };
  }
  // A piece.
  const m = matchPiece(cfg, node.par, node.names.length === 1 ? [byKey.get(node.names[0])] : sides);
  if (!m) {
    if (node.names.length === 1) {
      const s = byKey.get(node.names[0]);
      if (s.point) return wrong(node, 'v_boundary_pieces', `${s.name} se réduit à un point : on le retire.`, cfg, prev);
    }
    return wrong(node, null, 'Ce morceau n\'est pas un côté du bord.', cfg, prev);
  }
  const s = m.side;
  if (s.cancels) return wrong(node, 'v_boundary_pieces', `${s.name} et ${s.cancels} ont la même image, parcourue dans les deux sens : ils s'annulent.`, cfg, prev);
  if (m.orient < 0) return wrong(node, 'v_boundary_orient', `${s.name} est parcouru dans l'autre sens : suis le sens de σ(∂A).`, cfg, prev);
  if (m.orient === 0 || (s.curve.closed && m.tours > 1.5)) return wrong(node, null, `${s.name} doit être parcouru une seule fois, dans un seul sens.`, cfg, prev);
  state.found.add(s.key);
  return done();
}
