// The judge `ode` with a vector unknown (spec §16.2 « ode » : inconnue
// vectorielle X′ = AX; catalogue A2, a2-ode-system; step U6, part i). A
// small addition to js/judges/ode.js: when cfg.system is set, ode.js hands
// its lines here. cfg:
//   {kind: 'ode', v: 't', system: {A: [['1', '2'], ['2', '1']], names: ['x', 'y'],
//    X0?: ['2', '0'], swapped?: text}, ic?: {x: 0}   (the time t₀ of X0, 0 by default)}
// Lines (one item per component, joined by « ; »):
//   x = φ₁(t, C…) ; y = φ₂(t, C…)   each component satisfies φᵢ′ = Σⱼ Aᵢⱼφⱼ
//                     for 3 draws of the constants; with constants, they must
//                     be n independent ones; without, X(t₀) = X0.
//   C_1 = 1 ; C_2 = 1 the constants: the last general line, with them,
//                     satisfies X(t₀) = X0.
// Final form: the general solution (no X0), or the solution with X0, without
// constants. `swapped` (a general line with the eigenvectors exchanged) is
// read by the trap a2_ode_system_order (js/cas/rules/a2i.js).
// sameHook(cfg, a, b) is also used by ode.js for lines of constants.

import { parse } from '../cas/parse.js';
import { diff } from '../cas/diff.js';
import { evalFloat } from '../cas/numeric.js';
import { mapNode, stripParen, symbolsIn, contains } from '../cas/ast.js';
import { toText } from '../cas/print.js';
import { makeRng } from '../content/random.js';
import { seedOf } from '../cas/equiv.js';
import { frNum } from './common.js';

const CONSTS = ['C', 'K', 'C1', 'C2', 'C3', 'C4'];
const vOf = (cfg) => cfg.v || 't';
const ftext = (x) => frNum(x, 3);
const renameSubs = (n) => mapNode(n, (x) => (x.t === 'sym' && x.sub && stripParen(x.sub).t === 'num' ? { t: 'sym', name: `${x.name}${toText(x.sub)}` } : x));
const constsIn = (n) => [...symbolsIn(renameSubs(n))].filter((s) => CONSTS.includes(s));
const num = (s) => evalFloat(parse(String(s)), {});

// {x: φ₁, y: φ₂} for « x = φ₁ ; y = φ₂ » (any order), else null.
function components(cfg, node) {
  const n = stripParen(node);
  const names = cfg.system.names;
  const items = n.t === 'list' ? n.items : [n];
  const out = {};
  for (const it of items) {
    if (it.t !== 'rel' || it.op !== '=') return null;
    const l = stripParen(it.l);
    if (l.t !== 'sym' || l.sub || !names.includes(l.name) || out[l.name]) return null;
    if (contains(it.r, (z) => z.t === 'deriv' || (z.t === 'sym' && !z.sub && names.includes(z.name)))) return null;
    out[l.name] = renameSubs(it.r);
  }
  return names.every((x) => out[x]) ? names.map((x) => out[x]) : null;
}

// {C1: 1, C2: -2/3} for « C_1 = 1 ; C_2 = -2/3 », else null.
function constants(node) {
  const n = stripParen(node);
  const items = n.t === 'list' ? n.items : [n];
  const env = {};
  for (const it of items) {
    if (it.t !== 'rel' || it.op !== '=') return null;
    const l = stripParen(renameSubs(it.l));
    if (l.t !== 'sym' || !CONSTS.includes(l.name) || symbolsIn(it.r).size) return null;
    env[l.name] = evalFloat(it.r, {});
  }
  return env;
}

const matrixOf = (cfg) => cfg.system.A.map((r) => r.map(num));

function draws(cfg, rng, n, consts) {
  const [lo, hi] = cfg.domain?.[vOf(cfg)] || [-1.5, 1.5];
  const out = [];
  for (let i = 0; i < n; i++) {
    const env = { [vOf(cfg)]: lo + (hi - lo) * rng.next() };
    for (const c of consts) env[c] = -2 + 4 * rng.next();
    out.push(env);
  }
  return out;
}

// Each component: φᵢ′ = Σ Aᵢⱼφⱼ.
function solvesSystem(cfg, phis, consts) {
  const A = matrixOf(cfg);
  const d = phis.map((p) => diff(p, vOf(cfg)));
  const rng = makeRng(seedOf(phis.map((p) => toText(p)).join('|')));
  let valid = 0;
  for (const env of draws(cfg, rng, 40, consts)) {
    const X = phis.map((p) => evalFloat(p, env));
    const dX = d.map((p) => evalFloat(p, env));
    if (![...X, ...dX].every(Number.isFinite)) continue;
    valid++;
    for (let i = 0; i < X.length; i++) {
      const want = A[i].reduce((s, a, j) => s + a * X[j], 0);
      if (Math.abs(dX[i] - want) > 1e-7 * (1 + Math.abs(dX[i]) + Math.abs(want))) return { ok: false, at: env, comp: i };
    }
    if (valid >= 12) break;
  }
  return valid >= 6 ? { ok: true } : { ok: false, undecided: true };
}

function rankOf(rows) {
  const A = rows.map((r) => [...r]);
  const m = A.length;
  const n = A[0]?.length ?? 0;
  const big = Math.max(1e-12, ...A.flat().map(Math.abs));
  let r = 0;
  for (let c = 0; c < n && r < m; c++) {
    let p = r;
    for (let i = r + 1; i < m; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
    if (Math.abs(A[p][c]) <= 1e-6 * big) continue;
    [A[r], A[p]] = [A[p], A[r]];
    for (let i = r + 1; i < m; i++) { const f = A[i][c] / A[r][c]; for (let j = c; j < n; j++) A[i][j] -= f * A[r][j]; }
    r++;
  }
  return r;
}

// Rank of ∂X/∂(constants) at a point.
function constRank(cfg, phis, consts) {
  const rng = makeRng(seedOf(`${phis.map((p) => toText(p)).join('|')}|rank`));
  for (const env of draws(cfg, rng, 10, consts)) {
    const rows = phis.map((p) => consts.map((c) => (evalFloat(p, { ...env, [c]: env[c] + 1e-4 }) - evalFloat(p, { ...env, [c]: env[c] - 1e-4 })) / 2e-4));
    if (!rows.every((r) => r.every(Number.isFinite))) continue;
    const big = consts.map((_, j) => Math.max(1e-300, ...rows.map((r) => Math.abs(r[j]))));
    return rankOf(rows.map((r) => r.map((x, j) => x / big[j])));
  }
  return 0;
}

// X(t₀) = X0 with the constants in env.
function icHolds(cfg, phis, env = {}) {
  if (!cfg.system.X0) return { ok: true };
  const t0 = num(cfg.ic?.x ?? 0);
  for (let i = 0; i < phis.length; i++) {
    const got = evalFloat(phis[i], { ...env, [vOf(cfg)]: t0 });
    const want = num(cfg.system.X0[i]);
    if (!(Math.abs(got - want) <= 1e-7 * (1 + Math.abs(want)))) return { ok: false, i, got, want, t0 };
  }
  return { ok: true };
}

const clean = (phis) => !phis.some((p) => contains(p, (x) => x.t === 'int' || x.t === 'deriv'));

export function analyseSystem(cfg, node, state = {}) {
  const names = cfg.system.names;
  const n = names.length;
  const phis = components(cfg, node);
  if (phis) {
    const consts = [...new Set(phis.flatMap((p) => constsIn(p)))];
    const r = solvesSystem(cfg, phis, consts);
    if (!r.ok) {
      if (r.undecided) return { kind: 'wrong', message: 'Je n\'arrive pas à vérifier ta ligne : elle n\'est pas définie là où je la teste.' };
      return { kind: 'wrong', message: `Dérive ta composante ${names[r.comp]} : ${names[r.comp]}′ ne vaut pas la ligne ${r.comp + 1} de AX (par exemple en ${vOf(cfg)} = ${ftext(r.at[vOf(cfg)])}).` };
    }
    if (consts.length) {
      const rank = constRank(cfg, phis, consts);
      if (rank < n) return { kind: 'wrong', message: `Ta solution n'a que ${rank} constante${rank > 1 ? 's' : ''} indépendante${rank > 1 ? 's' : ''} : un système de ${n} équations en demande ${n}.` };
      if (consts.length > n) return { kind: 'stay', message: `Il y a trop de constantes : il en faut ${n}.` };
      if (cfg.system.X0) return { kind: 'ok', general: phis };
      return { kind: clean(phis) ? 'done' : 'ok', general: phis };
    }
    if (cfg.system.X0) {
      const ic = icHolds(cfg, phis);
      if (!ic.ok) return { kind: 'wrong', message: `C'est une solution du système, mais ${names[ic.i]}(${ftext(ic.t0)}) = ${ftext(ic.got)} au lieu de ${ftext(ic.want)}.` };
      return { kind: clean(phis) ? 'done' : 'ok' };
    }
    return { kind: 'stay', message: `C'est une solution, mais pas la solution générale : il faut ${n} constantes.` };
  }
  const env = constants(node);
  if (env) {
    const g = state.general;
    if (!Array.isArray(g)) return { kind: 'wrong', message: 'Écris d\'abord la solution générale, avec ses constantes.' };
    if (!Object.values(env).every(Number.isFinite)) return { kind: 'wrong', message: 'Donne la valeur de chaque constante.' };
    const missing = [...new Set(g.flatMap((p) => constsIn(p)))].filter((c) => !(c in env));
    if (missing.length) return { kind: 'wrong', message: `Donne aussi ${missing[0].replace(/(\d)/, '_$1')}.` };
    const ic = icHolds(cfg, g, env);
    if (!ic.ok) return { kind: 'wrong', message: `Avec ces constantes, ${names[ic.i]}(${ftext(ic.t0)}) = ${ftext(ic.got)} au lieu de ${ftext(ic.want)}.` };
    return { kind: 'ok' };
  }
  return { kind: 'parse', message: `Écris les composantes : ${names.map((x, i) => `${x} = …`).join(' ; ')}.` };
}

// Two lines that say the same (for the traps): the same components, or the
// same constants. null when the hook does not apply.
export function sameHook(cfg, a, b) {
  if (a?.t === 'odesep' || b?.t === 'odesep') return null;
  const ca = constants(a);
  const cb = constants(b);
  if (ca && cb) {
    const ka = Object.keys(ca).sort();
    const kb = Object.keys(cb).sort();
    return ka.join() === kb.join() && ka.every((k) => Math.abs(ca[k] - cb[k]) <= 1e-9 * (1 + Math.abs(ca[k])));
  }
  if (!cfg.system) return null;
  const pa = components(cfg, a);
  const pb = components(cfg, b);
  if (!pa || !pb) return false;
  const consts = [...new Set([...pa, ...pb].flatMap((p) => constsIn(p)))];
  const rng = makeRng(seedOf(pa.map((p) => toText(p)).join('|')));
  let valid = 0;
  for (const env of draws(cfg, rng, 30, consts)) {
    const x = pa.map((p) => evalFloat(p, env));
    const y = pb.map((p) => evalFloat(p, env));
    if (![...x, ...y].every(Number.isFinite)) continue;
    valid++;
    if (x.some((u, i) => Math.abs(u - y[i]) > 1e-7 * (1 + Math.abs(u) + Math.abs(y[i])))) return false;
    if (valid >= 10) break;
  }
  return valid >= 5;
}
