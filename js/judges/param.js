// Judge `param` (spec §5.2, step U10, module V; also the contours of C):
// a parametrisation of a curve or a surface, with its bounds, is right if
// it covers the same object as the reference, checked on 20 points (each
// point of the student's object is on the reference, and each of 20
// reference points is on the student's object), with the same orientation
// (the direction of travel of a curve; the normal σ_u ∧ σ_v of a surface),
// and runs through a closed curve once.
//
// cfg: {kind: 'param',
//       curve?: {ref: '(2cos(t) ; 2sin(t))', t: [0, 'π'], closed?: true, param?: 't'},
//       surface?: {ref: '(r cos(φ) ; r sin(φ) ; 4 - r^2)', u: [0, 2], v: [0, '2π'], params?: ['r', 'φ']},
//       complex?: true (a curve of ℂ written z = γ(t), « γ(t) = (1 + i)t »),
//       params?: ['t'] (the student's letters when the line has no label),
//       orientation?: 'same' (default) | 'any'}
// A line: « γ(t) = (2cos(t) ; 2sin(t)), t ∈ [0 ; π] », or the parametrisation
// then its bounds on the next line (« t ∈ [0 ; π] », « (r ; φ) ∈ [0 ; 2] × [0 ; π] »).
// The language: js/cas/paramgeo.js. A parametrisation without bounds is a
// step (`ok`) when some of its points are on the object; the bounds finish.
// Wrong lines name a trap: the judge's own reading (v_orientation_reversed,
// v_param_bounds, v_cross_order, v_surf_domain), unless a trap of the
// module (judges: ['param'], candidates as texts) matches first.

import { toMathML } from '../cas/mathml.js';
import { parse } from '../cas/parse.js';
import { walk } from '../cas/ast.js';
import { evalFloat } from '../cas/numeric.js';
import { readParam, compile, compareCurve, compareSurface, someOnCurve, someOnSurface, splitTop, normText } from '../cas/paramgeo.js';
import { diagnoseLine } from './diagnose.js';
import { t } from '../i18n.js';

export const sign = '=';

const num = (x) => (typeof x === 'number' ? x : evalFloat(parse(String(x), {}), {}));

const REF = new WeakMap();
export function refOf(cfg) {
  if (REF.has(cfg)) return REF.get(cfg);
  let r;
  if (cfg.surface) {
    const s = cfg.surface;
    const params = s.params || ['u', 'v'];
    const par = readParam(s.ref, { params });
    r = { kind: 'surface', f: compile({ ...par, params }), u: s.u.map(num), v: s.v.map(num), params };
  } else {
    const c = cfg.curve;
    const params = [c.param || 't'];
    const par = readParam(c.ref, { params, complex: !!cfg.complex });
    const f = compile({ ...par, params });
    r = { kind: 'curve', f, lo: num(c.t[0]), hi: num(c.t[1]), closed: !!c.closed };
  }
  REF.set(cfg, r);
  return r;
}

const studentParams = (cfg) => cfg.params || (cfg.surface ? cfg.surface.params || ['u', 'v'] : [cfg.curve?.param || 't']);

function readStrict(cfg, text) {
  const par = readParam(text, { params: studentParams(cfg), complex: !!cfg.complex });
  return { t: 'pline', text: String(text).trim(), par };
}
export function parseLine(cfg, text) {
  if (text && typeof text === 'object') return text;
  try { return readStrict(cfg, text); } catch { return { t: 'pline', text: String(text).trim(), par: null }; }
}

// ---------- display ----------

const inner = (ml) => ml.replace(/^<math[^>]*>|<\/math>$/g, '');
const fr = (s) => String(s).replace(/-/g, '−');

function boundML(x) {
  try { return inner(toMathML(parse(String(x), {}))); } catch { return `<mn>${fr(x)}</mn>`; }
}

// MathML of the line's text, piece by piece (bounds as typed).
function lineML(cfg, text, blanks = null) {
  const tt = normText(text).replace(/^=\s*/, '');
  const offset = { n: 0 };
  const exprML = (s, vars) => {
    const node = parse(s, { vars, complex: !!cfg.complex });
    if (blanks) walk(node, (x) => { if (x.t === 'blank') x.id = offset.n++; });
    return inner(toMathML(node, blanks ? { blanks } : {}));
  };
  const letters = ['t', 's', 'u', 'v', 'θ', 'φ', 'r', 'x', 'y', 'ρ', 'ψ'];
  const pieces = splitTop(tt, [', ', ',', ' pour ']);
  const out = [];
  for (const piece of pieces) {
    if (!piece) continue;
    const m = /^\(?\s*([^()∈]+?)\s*\)?\s*∈\s*(.+)$/.exec(piece);
    if (m) {
      const names = m[1].split(/[;,]/).map((s) => s.trim());
      const ivs = splitTop(m[2], ['×']).map((iv) => {
        const k = /^([[\]])\s*(.+?)\s*;\s*(.+?)\s*([[\]])$/.exec(iv);
        if (!k) return `<mtext>${iv}</mtext>`;
        return `<mo>${k[1]}</mo>${exprML(k[2], [])}<mo>;</mo>${exprML(k[3], [])}<mo>${k[4]}</mo>`;
      });
      const head = names.length > 1 ? `<mo>(</mo>${names.map((n) => `<mi>${n}</mi>`).join('<mo>;</mo>')}<mo>)</mo>` : `<mi>${names[0]}</mi>`;
      out.push(`<mrow>${head}<mo>∈</mo>${ivs.join('<mo>×</mo>')}</mrow>`);
      continue;
    }
    const eq = splitTop(piece, ['=']);
    const body = eq[eq.length - 1];
    const label = eq.length === 2 ? eq[0] : null;
    let labelML = '';
    if (label) {
      const lm = /^(.+?)\s*\(([^()]*)\)$/.exec(label);
      labelML = lm ? `<mi>${lm[1]}</mi><mo>(</mo>${lm[2].split(/[;,]/).map((s) => `<mi>${s.trim()}</mi>`).join('<mo>,</mo>')}<mo>)</mo><mo>=</mo>` : `<mi>${label}</mi><mo>=</mo>`;
    }
    const vars = label && /\(([^()]*)\)/.test(label) ? /\(([^()]*)\)/.exec(label)[1].split(/[;,]/).map((s) => s.trim()) : [...studentParams(cfg), ...letters];
    const tm = /^\((.*)\)$/.exec(body);
    const comps = tm ? splitTop(tm[1], [';']) : null;
    const bodyML = comps && comps.length >= 2
      ? `<mo>(</mo>${comps.map((c) => exprML(c, vars)).join('<mo>;</mo>')}<mo>)</mo>`
      : (() => { try { return exprML(body, vars); } catch { return `<mtext>${body}</mtext>`; } })();
    out.push(`<mrow>${labelML}${bodyML}</mrow>`);
  }
  return `<mrow>${out.join('<mo>,</mo><mspace width="0.4em"/>')}</mrow>`;
}

export function show(cfg, node, { display } = {}) {
  let body;
  try { body = lineML(cfg, node.text); } catch { body = `<mtext>${node.text}</mtext>`; }
  return `<math${display ? ' display="block"' : ''} alttext="${node.text.replace(/"/g, '&quot;')}">${body}</math>`;
}
export const text = (cfg, node) => node.text;
export const start = (cfg) => cfg.start;

export const lineMLOf = (cfg, text, blanks = null) => lineML(cfg, text, blanks);

// A guided line with blanks (□), as MathML (js/ui/lines.js).
export function templateML(cfg, tpl, blanks = {}) {
  return `<math>${lineML(cfg, tpl, blanks)}</math>`;
}

// ---------- verdicts ----------

// The student's object from a parametrisation and its bounds.
function objectOf(cfg, par) {
  const f = compile(par);
  if (cfg.surface) {
    const [p, q] = par.params;
    if (!par.bounds[p] || !par.bounds[q]) return null;
    return { kind: 'surface', f, u: par.bounds[p], v: par.bounds[q] };
  }
  const [p] = par.params;
  if (!par.bounds[p]) return null;
  return { kind: 'curve', f, lo: par.bounds[p][0], hi: par.bounds[p][1] };
}

// {ok, rule, message}
export function check(cfg, par) {
  const ref = refOf(cfg);
  const obj = objectOf(cfg, par);
  if (!obj) return { partial: true };
  const any = cfg.orientation === 'any';
  if (ref.kind === 'curve') {
    if (!(obj.lo < obj.hi)) return { ok: false, rule: 'v_param_bounds', message: t('La borne de gauche doit être plus petite que celle de droite.') };
    const r = compareCurve(obj, ref);
    if (!r.on) {
      // On the curve carried further (the same formula on a longer interval): bounds too wide.
      const L = ref.hi - ref.lo;
      const wide = compareCurve(obj, { ...ref, lo: ref.lo - L, hi: ref.hi + L, closed: false });
      if (wide.on && !ref.closed) return { ok: false, rule: 'v_param_bounds', message: t('Ta courbe dépasse Γ : vérifie les bornes.') };
      return { ok: false, rule: null, message: t('Des points de ta courbe ne sont pas sur Γ.') };
    }
    if (!r.covers) return { ok: false, rule: 'v_param_bounds', message: t('Ta courbe ne parcourt pas tout Γ : vérifie les bornes.') };
    if (ref.closed && r.tours > 1.5) return { ok: false, rule: 'v_param_bounds', message: t('Ta courbe fait {a} tours : un seul suffit.', { a: Math.round(r.tours) }) };
    if (r.orient === 0) return { ok: false, rule: null, message: t('Ta courbe repasse par les mêmes points : elle doit avancer dans un seul sens.') };
    if (!any && r.orient < 0) return { ok: false, rule: 'v_orientation_reversed', message: t('Ta courbe est parcourue dans l\'autre sens.') };
    return { ok: true, result: r };
  }
  if (!(obj.u[0] < obj.u[1] && obj.v[0] < obj.v[1])) return { ok: false, rule: 'v_surf_domain', message: t('Chaque intervalle s\'écrit [a ; b] avec a < b.') };
  const r = compareSurface(obj, ref);
  if (!r.on) return { ok: false, rule: r.covers ? 'v_surf_domain' : null, message: t('Des points de ta surface ne sont pas sur Σ : vérifie la paramétrisation et le domaine.') };
  if (!r.covers) return { ok: false, rule: 'v_surf_domain', message: t('Ta paramétrisation ne couvre pas toute la surface : vérifie le domaine des paramètres.') };
  if (!any && r.orient < 0) return { ok: false, rule: 'v_cross_order', message: t('Ta normale σ_u ∧ σ_v pointe dans l\'autre sens : échange l\'ordre des paramètres, ou change le sens de l\'un.') };
  if (!any && r.orient === 0) return { ok: false, rule: null, message: t('Ta paramétrisation n\'a pas une normale de sens constant.') };
  return { ok: true, result: r };
}

// The same parametrised object (traps): candidate vs line.
function sameObject(cfg, cand, node) {
  const c = typeof cand === 'string' ? parseLine(cfg, cand) : cand;
  if (!c?.par?.comps || !node?.par?.comps) return false;
  const a = objectOf(cfg, c.par);
  const b = objectOf(cfg, node.par);
  if (!a || !b) return false;
  if (cfg.surface) {
    const r = compareSurface(b, { ...a, f: a.f });
    return r.on && r.covers && r.orient > 0;
  }
  const r = compareCurve(b, a);
  return r.on && r.covers && r.orient > 0;
}

function partialOk(cfg, par) {
  const ref = refOf(cfg);
  const f = compile(par);
  if (ref.kind === 'curve') return someOnCurve(f, ref);
  return someOnSurface(f, ref, { u: ref.u, v: ref.v });
}

export function isFinal(cfg, node) {
  if (!node?.par?.comps) return false;
  const r = check(cfg, node.par);
  return !!r.ok;
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object' && input.t === 'pline') node = input;
  else {
    try { node = readStrict(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  let par = node.par;
  if (!par.comps) {
    // Bounds alone: with the parametrisation of an earlier line.
    if (!state.par) return { kind: 'form', node, message: t('Écris d\'abord la paramétrisation : γ(t) = (… ; …).') };
    par = { ...state.par, bounds: { ...state.par.bounds, ...par.bounds } };
  }
  const r = check(cfg, par);
  if (r.partial) {
    if (!par.comps) return { kind: 'form', node, message: t('Il manque un intervalle.') };
    if (!partialOk(cfg, par)) {
      return { kind: 'wrong', node, rule: null, message: cfg.surface ? t('Ta paramétrisation ne décrit pas cette surface.') : t('Ta paramétrisation ne décrit pas cette courbe.') };
    }
    state.par = par;
    return { kind: 'ok', node, message: t('Donne maintenant les bornes.') };
  }
  if (!r.ok) {
    const diag = diagnoseLine('param', prev, { ...node, par }, cfg, (cand, n) => sameObject(cfg, cand, n));
    const rule = diag?.rules[0] ?? r.rule ?? null;
    return { kind: 'wrong', node, rule, diag: diag ?? (rule ? { rules: [rule], ctx: {}, all: [rule] } : null), message: r.message };
  }
  state.par = par;
  return { kind: 'done', node };
}
