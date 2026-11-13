// The gradient form of the judge `antideriv` (spec §16.2, step U10): a
// potential φ with ∇φ = F (v-pot-find, v-pot-lambda, v-pot-domain), or a
// harmonic conjugate u with ∇u = (v_y, −v_x) (c-harmonic-conj).
// js/judges/antideriv.js hands its lines here when cfg.grad is set.
//
// cfg: {kind: 'antideriv', grad: ['2xy+z', 'x^2', 'x+2z'], vars: ['x', 'y', 'z'],
//       funcs?: ['α', 'β', 'γ', 'g', 'h'] (unknown functions), name?: 'φ',
//       at?: {point: [1, 2, -1], value: 0} (the condition φ(P) = value),
//       params?: ['λ'] with values?: {λ: 1}, domain?: {x: [lo, hi], …}}
// A line « φ = G + α(y, z) [+ C] » (« φ = » optional) is right when, for
// each variable v that no unknown function takes as argument, ∂G/∂v = F_v,
// and, for each v that one does take, F_v − ∂G/∂v depends only on that
// function's arguments. A line « C = k » fixes the constant: with the last
// line, φ(P) = value. Final: no unknown function left; with `at`, no C
// either and φ(P) = value (a right line short of it is a step, `ok`).
// Traps (judges: ['antideriv']) receive prev and ctx.cfg (cfg.grad set);
// their candidates are compared as potentials (same G up to a constant,
// same unknown functions).

import { parse } from '../cas/parse.js';
import { mapNode, symbolsIn, walk, stripParen } from '../cas/ast.js';
import { diff } from '../cas/diff.js';
import { equivalent } from '../cas/equiv.js';
import { evalFloat } from '../cas/numeric.js';
import { toText } from '../cas/print.js';
import { diagnoseLine } from './diagnose.js';
import { Q } from '../math/rational.js';
import { t } from '../i18n.js';

const FUNCS = ['α', 'β', 'γ', 'g', 'h', 'k'];
const funcsOf = (cfg) => cfg.funcs || FUNCS;
const nameOf = (cfg) => cfg.name || 'φ';
const popts = (cfg) => ({ vars: [...cfg.vars, 'C', nameOf(cfg), ...(cfg.params || [])], funcs: funcsOf(cfg) });

const GRAD = new WeakMap();
function gradOf(cfg) {
  if (!GRAD.has(cfg)) GRAD.set(cfg, cfg.grad.map((tt) => parse(tt, popts(cfg))));
  return GRAD.get(cfg);
}

// Unknown function calls of a node: [{name, args: [variable names]}].
function unknownsOf(cfg, node) {
  const out = [];
  walk(node, (n) => {
    if (n.t === 'fn' && funcsOf(cfg).includes(n.name)) {
      out.push({ name: n.name, args: n.args.map((a) => stripParen(a)).filter((a) => a.t === 'sym').map((a) => a.name) });
    }
  });
  return out;
}
const withoutUnknowns = (cfg, node) => mapNode(node, (n) => (n.t === 'fn' && funcsOf(cfg).includes(n.name) ? { t: 'num', v: new Q(0), s: '0' } : n));

// The expression of a line: « φ = E », « φ(x, y) = E » or E; « C = k » is
// {constant: k}.
export function readPotential(cfg, input) {
  const node = typeof input === 'object' ? input : parse(String(input).replace(/^\s*=/, ''), popts(cfg));
  const n = stripParen(node);
  if (n.t === 'rel' && n.op === '=') {
    const l = stripParen(n.l);
    if (l.t === 'sym' && l.name === 'C' && !symbolsIn(n.r).size) return { constant: evalFloat(n.r, {}), node };
    const isName = (l.t === 'sym' && l.name === nameOf(cfg)) || (l.t === 'fn' && l.name === nameOf(cfg))
      || (l.t === 'bin' && l.op === '×' && stripParen(l.l).t === 'sym' && stripParen(l.l).name === nameOf(cfg));
    if (isName) return { expr: n.r, node };
    throw new Error(t('Écris {a} = …', { a: nameOf(cfg) }));
  }
  return { expr: node, node };
}

const envAt = (cfg, k, extra = {}) => {
  const out = { ...(cfg.values || {}), C: 0.37, ...extra };
  cfg.vars.forEach((v, i) => {
    const d = cfg.domain?.[v] || [-2, 2];
    out[v] = d[0] + ((d[1] - d[0]) * (((k * 7 + i * 3) % 11) + 0.5)) / 11.3;
  });
  return out;
};

const close = (a, b) => Math.abs(a - b) <= 1e-8 * (1 + Math.abs(a) + Math.abs(b));

// Is the line a potential, up to its unknown functions? {ok, v?, message?}
export function checkPotential(cfg, expr) {
  const G = withoutUnknowns(cfg, expr);
  const U = unknownsOf(cfg, expr);
  const F = gradOf(cfg);
  for (let i = 0; i < cfg.vars.length; i++) {
    const v = cfg.vars[i];
    const dG = diff(G, v);
    const owners = U.filter((u) => u.args.includes(v));
    if (!owners.length) {
      for (let k = 0; k < 10; k++) {
        const env = envAt(cfg, k);
        const a = evalFloat(dG, env);
        const b = evalFloat(F[i], env);
        if (Number.isFinite(a) && Number.isFinite(b) && !close(a, b)) return { ok: false, v, message: t('∂{a}/∂{v} ne donne pas F{b} : en dérivant ta ligne en {v}, on trouve {c}.', { a: nameOf(cfg), v, b: i + 1, c: toText(dG) }) };
      }
      continue;
    }
    // F_v − ∂G/∂v may depend only on the arguments of the unknown functions with v.
    const allowed = new Set(owners.flatMap((u) => u.args));
    const R = { t: 'bin', op: '-', l: F[i], r: dG };
    for (let k = 0; k < 8; k++) {
      const env = envAt(cfg, k);
      const r0 = evalFloat(R, env);
      for (const w of cfg.vars.filter((x) => !allowed.has(x))) {
        const r1 = evalFloat(R, { ...env, [w]: env[w] + 0.731 });
        if (Number.isFinite(r0) && Number.isFinite(r1) && !close(r0, r1)) {
          return { ok: false, v, message: t('Ta fonction inconnue ne peut pas compenser : F{a} − ∂G/∂{v} dépend encore de {w}.', { a: i + 1, v, w }) };
        }
      }
    }
  }
  return { ok: true, unknowns: U };
}

// Two potentials alike (traps): same G up to a constant, same unknowns.
export function samePotential(cfg, a, b) {
  try {
    const A = readPotential(cfg, a).expr;
    const B = readPotential(cfg, b).expr;
    if (!A || !B) return false;
    const ua = unknownsOf(cfg, A).map((u) => u.args.join()).sort().join('|');
    const ub = unknownsOf(cfg, B).map((u) => u.args.join()).sort().join('|');
    if (ua !== ub) return false;
    const ga = withoutUnknowns(cfg, A);
    const gb = withoutUnknowns(cfg, B);
    const d0 = evalFloat({ t: 'bin', op: '-', l: ga, r: gb }, envAt(cfg, 0, { C: 0 }));
    for (let k = 1; k < 10; k++) {
      const d = evalFloat({ t: 'bin', op: '-', l: ga, r: gb }, envAt(cfg, k, { C: 0 }));
      if (!Number.isFinite(d) || !close(d, d0)) return false;
    }
    return true;
  } catch { return false; }
}

function valueAtP(cfg, expr, C = 0) {
  const env = { ...(cfg.values || {}), C };
  cfg.vars.forEach((v, i) => { env[v] = cfg.at.point[i]; });
  return evalFloat(expr, env);
}

export function isFinalPotential(cfg, node, state = {}) {
  let r;
  try { r = readPotential(cfg, node); } catch { return false; }
  if (r.constant !== undefined) return !!cfg.at && state.fixed;
  if (unknownsOf(cfg, r.expr).length) return t('Il reste une fonction inconnue.');
  if (cfg.at) {
    if (symbolsIn(r.expr).has('C')) return t('La constante n\'est pas fixée : utilise la condition.');
    const v = valueAtP(cfg, r.expr);
    if (!close(v, num(cfg.at.value))) return false;
  }
  return true;
}
const num = (x) => (typeof x === 'number' ? x : evalFloat(parse(String(x), {}), {}));

export function judgePotential(cfg, prev, input, state = {}) {
  let r;
  try { r = readPotential(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  const node = r.node;
  if (prev && toText(prev) === toText(node)) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  if (r.constant !== undefined) {
    if (!cfg.at || !state.last) return { kind: 'form', node, message: t('Écris d\'abord φ avec sa constante.') };
    const v = valueAtP(cfg, state.last, r.constant);
    if (close(v, num(cfg.at.value))) { state.fixed = true; return { kind: 'ok', node }; }
    const C0 = num(cfg.at.value) - valueAtP(cfg, state.last, 0);
    const rule = Math.abs(r.constant + C0) < 1e-9 ? 'v_pot_final_const' : null;
    return { kind: 'wrong', node, rule, diag: rule ? { rules: [rule], ctx: { C: C0 }, all: [rule] } : null, message: t('Avec C = {a}, {b}(P) ne vaut pas {value}.', { a: String(r.constant).replace('.', ','), b: nameOf(cfg), value: cfg.at.value }) };
  }
  const chk = checkPotential(cfg, r.expr);
  if (!chk.ok) {
    const diag = diagnoseLine('antideriv', prev, node, cfg, (cand, line) => samePotential(cfg, cand, line));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: chk.message };
  }
  if (cfg.at && !unknownsOf(cfg, r.expr).length && !symbolsIn(r.expr).has('C')) {
    const v = valueAtP(cfg, r.expr);
    if (!close(v, num(cfg.at.value))) {
      const diag = diagnoseLine('antideriv', prev, node, cfg, (cand, line) => toText(cand) === toText(line));
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? 'v_pot_final_const', diag: diag ?? { rules: ['v_pot_final_const'], ctx: {}, all: ['v_pot_final_const'] }, message: t('{a}(P) vaut {b}, pas {value} : vérifie la constante.', { a: nameOf(cfg), b: String(Math.round(v * 1e6) / 1e6).replace('.', ','), value: cfg.at.value }) };
    }
  }
  if (symbolsIn(r.expr).has('C')) state.last = r.expr;
  const fin = isFinalPotential(cfg, node, state);
  if (fin === true) return { kind: 'done', node };
  return { kind: 'ok', node, ...(typeof fin === 'string' ? { note: fin } : {}) };
}
