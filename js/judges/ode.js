// Judge `ode` (spec §4.4, §5.2, §16.2; catalogue A2, « Lignes d'étape »,
// point 4; step U6). Every line is judged against the differential equation
// of the item, not against the previous line. cfg:
//   {eq: "x*y'+2y=4x^2", unknown: 'y', v: 'x', order: 1 | 2,
//    ic?: {x: 1, y: 2, dy?: 0}     the initial conditions (y(x₀), y′(x₀))
//    domain?: {x: [0.2, 4]}        where x is drawn (default [−2 ; 2])
//    yRange?: [lo, hi]             where y is drawn for relations (default [−2 ; 2])
//    consts?: ['C', 'K']           letters that are constants (default C, K,
//                                  and C₁ … C₄, written C_1 …)
//    mu?: 'a(x)'                   the coefficient a of y′ + a(x)y = b(x): a
//                                  line « μ = … » is right if μ′/μ = a
//    homog?: "y''+y=0"             the homogeneous equation (default: the
//                                  equation without its terms free of y)
//    final?: 'explicit' | 'implicit' | 'homog' | 'particular'}
// Lines (each one a relation):
//   y = φ(x, C…)      explicit: φ satisfies the equation for 3 draws of the
//                     constants; with constants, they must be `order`
//                     independent ones (rank of (φ, φ′, …) in the constants);
//                     without, φ must satisfy ic (or the line is a particular
//                     solution: `stay`, the general one is asked).
//   y_h = …, y_1 = …, y_2 = …   solutions of the homogeneous equation
//   y_p = …           a solution of the whole equation, without constant
//   μ = …             an integrating factor: μ′/μ = cfg.mu
//   P(y) dy = Q(x) dx separated: Q/P = f, where y′ = f(x, y)
//   H(x, y) = C       a relation (∫ P dy = ∫ Q dx included): H_x + H_y·f = 0;
//                     without a constant, it must hold at the initial point
//   y′ + … = …        the equation rewritten (normalised, multiplied by μ,
//                     (μy)′ = μb with the total derivative): same y′ (or y″)
//   C = 1 ; C_2 = 3   constants: the last general line, with them, satisfies ic
// Final form: an explicit y = … (no ∫ nor derivative left) that is the
// general solution (no ic) or satisfies ic; with cfg.final 'implicit', a
// relation without constant that holds at the initial point (or with C
// when there is no ic); 'homog' and 'particular': a y_h or y_p line;
// 'one' (step U6, part h): any one solution without constant, when there
// is no ic (Abel's W = e^(−∫p), defined up to a factor).

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { mapNode, stripParen, symbolsIn, contains, sub, add, mul, sym, unparen, num, equalsStructural } from '../cas/ast.js';
import { diff } from '../cas/diff.js';
import { evalFloat } from '../cas/numeric.js';
import { makeRng } from '../content/random.js';
import { seedOf } from '../cas/equiv.js';
import { diagnoseLine } from './diagnose.js';
import { frNum } from './common.js';

export const sign = '';

const Y = ['ʸ0', 'ʸ1', 'ʸ2', 'ʸ3']; // y, y′, y″, y‴ as plain letters
const DEFAULT_CONSTS = ['C', 'K', 'C1', 'C2', 'C3', 'C4'];
const vOf = (cfg) => cfg.v || 'x';
const uOf = (cfg) => cfg.unknown || 'y';
const constsOf = (cfg) => cfg.consts ? [...cfg.consts.map((c) => c.replace('_', '')), ...DEFAULT_CONSTS] : DEFAULT_CONSTS;

// ---------- reading ----------

// C_1 → the letter C1 (subscripted letters are one variable in numeric.js).
const renameSubs = (n) => mapNode(n, (x) => (x.t === 'sym' && x.sub && stripParen(x.sub).t === 'num' ? { t: 'sym', name: `${x.name}${toText(x.sub)}`, label: x } : x));

// « P dy » or « dy/P » or « dy »: {P, d} or null.
function diffSide(text) {
  const s = text.trim();
  let m = /^d([a-zA-Zλμ])\s*(?:\/(.*))?$/.exec(s);
  if (m) return { P: m[2] ? `1/(${m[2]})` : '1', d: m[1] };
  m = /^(.*?)\s*[×*·]?\s*d([a-zA-Zλμ])$/.exec(s);
  if (m && m[1].trim() && !/[a-zA-Z]$/.test(m[1].trim().replace(/\)$/, ''))) return { P: m[1], d: m[2] };
  if (m && m[1].trim()) return { P: m[1], d: m[2] };
  return null;
}

export function parseLine(cfg, text) {
  const t = String(text).replace(/^\s*=/, '');
  const opts = { dvar: vOf(cfg), funcs: cfg.funcs || [] };
  const parts = t.split('=');
  // P(y) dy = Q(x) dx
  if (parts.length === 2 && /(^|[^a-zA-Z(])d[a-zA-Z]\s*(\/|$|\s|\))/.test(t.replace(/d\(/g, ''))) {
    const L = diffSide(parts[0]);
    const R = diffSide(parts[1]);
    if (L && R) {
      const u = uOf(cfg);
      const [py, qx] = L.d === u ? [L, R] : [R, L];
      if (py.d !== u || qx.d !== vOf(cfg)) throw new Error(`Écris la forme séparée P(${u}) d${u} = Q(${vOf(cfg)}) d${vOf(cfg)}.`);
      return { t: 'odesep', P: parse(py.P, opts), Q: parse(qx.P, opts), u, v: vOf(cfg) };
    }
  }
  return parse(t, opts);
}

export function show(cfg, node, opts = {}) {
  if (node.t === 'odesep') {
    const inner = (n) => toMathML(unparen(n), { dvar: cfg.v }).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
    const d = (v) => `<mi mathvariant="normal">d</mi><mi>${v}</mi>`;
    const disp = opts.display ? ' display="block"' : '';
    return `<math${disp}><mrow><mrow>${inner(node.P)}</mrow><mo>&#x2062;</mo>${d(node.u)}<mo>=</mo><mrow>${inner(node.Q)}</mrow><mo>&#x2062;</mo>${d(node.v)}</mrow></math>`;
  }
  return toMathML(unparen(node), { dvar: cfg.v || 'x', ...opts });
}

export function text(cfg, node) {
  if (node.t === 'odesep') return `(${toText(node.P)})d${node.u}=(${toText(node.Q)})d${node.v}`;
  return toText(node, { dvar: cfg.v || 'x' });
}

export const start = (cfg) => cfg.start;

// ---------- the equation ----------

// y, y′, y″ replaced by the letters ʸ0, ʸ1, ʸ2; a derivative of an
// expression in y (d(x²y)) is the total derivative.
export function lettersOf(node, cfg) {
  const v = vOf(cfg);
  const u = uOf(cfg);
  const isU = (e) => { e = stripParen(e); return e.t === 'sym' && e.name === u && !e.sub; };
  let n = mapNode(renameSubs(node), (x) => {
    if (x.t === 'sym' && x.name === u && !x.sub) return sym(Y[0]);
    if (x.t === 'int' && x.v === u && !x.lo) return { ...x, v: Y[0] };
    if (x.t !== 'deriv' || x.v !== v) return x;
    if (isU(x.e) || (stripParen(x.e).t === 'sym' && stripParen(x.e).name === Y[0])) return sym(Y[Math.min(x.n, 3)]);
    // d(e) with y inside: ∂e/∂x + Σ ʸ(k+1)·∂e/∂ʸk, n times.
    let e = x.e;
    for (let k = 0; k < x.n; k++) {
      let out = diff(e, v);
      for (let j = 0; j < 3; j++) if (contains(e, (z) => z.t === 'sym' && z.name === Y[j])) out = add(out, mul(sym(Y[j + 1]), diff(e, Y[j])));
      e = { t: 'paren', e: out };
    }
    return e;
  });
  return n;
}

const orderOf = (n) => { let k = 0; for (let j = 1; j <= 3; j++) if (contains(n, (z) => z.t === 'sym' && z.name === Y[j])) k = j; return k; };

const EQS = new Map();
function eqOf(cfg) {
  const key = `${cfg.eq}|${cfg.homog ?? ''}|${uOf(cfg)}|${vOf(cfg)}`;
  if (!EQS.has(key)) {
    const rel = parse(cfg.eq, { dvar: vOf(cfg), funcs: cfg.funcs || [] });
    const E = lettersOf(sub(rel.l, rel.r), cfg);
    const H = cfg.homog ? (() => { const h = parse(cfg.homog, { dvar: vOf(cfg) }); return lettersOf(sub(h.l, h.r), cfg); })() : null;
    EQS.set(key, { E, H, order: cfg.order ?? orderOf(E) });
  }
  return EQS.get(key);
}

const ev = (n, env) => evalFloat(n, env, { guard: true });
const small = (x, scale) => Math.abs(x) <= 1e-7 * (1 + scale);

// The highest derivative solved from E = 0, linear in it: f(env).
function solvedHighest(E, k, env) {
  const e0 = ev(E, { ...env, [Y[k]]: 0 });
  const e1 = ev(E, { ...env, [Y[k]]: 1 });
  const e2 = ev(E, { ...env, [Y[k]]: 2 });
  if (![e0, e1, e2].every(Number.isFinite) || Math.abs(e1 - e0) < 1e-9) return NaN;
  if (Math.abs(e2 - 2 * e1 + e0) > 1e-7 * (1 + Math.abs(e0) + Math.abs(e1))) return NaN; // not linear
  return -e0 / (e1 - e0);
}

function draws(cfg, rng, n, consts) {
  const v = vOf(cfg);
  const [lo, hi] = cfg.domain?.[v] || [-2, 2];
  const [ylo, yhi] = cfg.yRange || [-2, 2];
  const out = [];
  for (let i = 0; i < n; i++) {
    const env = { [v]: lo + (hi - lo) * rng.next(), [Y[0]]: ylo + (yhi - ylo) * rng.next(), [Y[1]]: -2 + 4 * rng.next(), [Y[2]]: -2 + 4 * rng.next() };
    for (const c of consts) env[c] = -2 + 4 * rng.next();
    out.push(env);
  }
  return out;
}

// ---------- the kinds of lines ----------

const isLabel = (n, name, sub) => { n = stripParen(n); return n.t === 'sym' && n.name === name && (sub === undefined ? !n.sub : n.sub && toText(n.sub) === sub); };
const constsIn = (n, cfg) => [...symbolsIn(renameSubs(n))].filter((s) => constsOf(cfg).includes(s));

export function kindOf(cfg, node) {
  if (node.t === 'odesep') return 'sep';
  const n = stripParen(node);
  const u = uOf(cfg);
  if (n.t === 'list') return n.items.every((r) => r.t === 'rel' && constsIn(r.l, cfg).length === 1 && stripParen(renameSubs(r.l)).t === 'sym') ? 'consts' : 'bad';
  if (n.t !== 'rel' || n.op !== '=') return 'bad';
  const L = lettersOf(n.l, cfg);
  const R = lettersOf(n.r, cfg);
  const hasY = (x) => contains(x, (z) => z.t === 'sym' && Y.includes(z.name));
  if (isLabel(n.l, u) && !hasY(R)) return 'explicit';
  if (isLabel(n.l, u, 'h') && !hasY(R)) return 'homog';
  if (isLabel(n.l, u, '1') && !hasY(R)) return 'homog1';
  if (isLabel(n.l, u, '2') && !hasY(R)) return 'homog1';
  if (isLabel(n.l, u, 'p') && !hasY(R)) return 'particular';
  if ((isLabel(n.l, 'μ') || isLabel(n.l, 'mu')) && !hasY(R)) return 'mu';
  const lc = renameSubs(n.l);
  if (stripParen(lc).t === 'sym' && constsOf(cfg).includes(stripParen(lc).name) && !hasY(R) && !symbolsIn(R).has(vOf(cfg))) return 'consts';
  const G = sub(L, R);
  if (orderOf(G) >= 1) return 'ode';
  if (hasY(G)) return 'relation';
  return 'bad';
}

// Residual of y = φ in E (or in the homogeneous part).
function residualCheck(cfg, phi, { homog = false, consts = [] } = {}) {
  const { E, H } = eqOf(cfg);
  const v = vOf(cfg);
  const d1 = diff(phi, v);
  const d2 = diff(d1, v);
  const d3 = diff(d2, v);
  const rng = makeRng(seedOf(toText(phi)));
  let valid = 0;
  for (const env of draws(cfg, rng, 40, consts)) {
    const at = { ...env, [Y[0]]: ev(phi, env), [Y[1]]: ev(d1, env), [Y[2]]: ev(d2, env), [Y[3]]: ev(d3, env) };
    if (![0, 1, 2].every((k) => Number.isFinite(at[Y[k]]))) continue;
    let r;
    let scale;
    if (homog && H) { r = ev(H, at); scale = Math.abs(at[Y[0]]) + Math.abs(at[Y[1]]) + Math.abs(at[Y[2]]); } else {
      r = ev(E, at);
      scale = Math.abs(at[Y[0]]) + Math.abs(at[Y[1]]) + Math.abs(at[Y[2]]);
      if (homog) { const zero = ev(E, { ...at, [Y[0]]: 0, [Y[1]]: 0, [Y[2]]: 0, [Y[3]]: 0 }); r -= zero; }
      scale += Math.abs(ev(E, { ...at, [Y[0]]: 0, [Y[1]]: 0, [Y[2]]: 0, [Y[3]]: 0 }));
    }
    if (!Number.isFinite(r)) continue;
    valid++;
    if (!small(r, scale)) return { ok: false, at: env };
    if (valid >= 12) break;
  }
  return valid >= 6 ? { ok: true } : { ok: false, undecided: true };
}

// Rank of (φ, φ′, …, φ^(k−1)) at a point, in the constants.
function constRank(cfg, phi, consts, k) {
  if (!consts.length) return 0;
  const v = vOf(cfg);
  const ds = [phi];
  for (let i = 1; i < k; i++) ds.push(diff(ds[i - 1], v));
  const rng = makeRng(seedOf(`${toText(phi)}|rank`));
  for (const env of draws(cfg, rng, 10, consts)) {
    const rows = [];
    let okRow = true;
    for (const d of ds) {
      const row = consts.map((c) => (ev(d, { ...env, [c]: env[c] + 1e-4 }) - ev(d, { ...env, [c]: env[c] - 1e-4 })) / 2e-4);
      if (!row.every(Number.isFinite)) { okRow = false; break; }
      rows.push(row);
    }
    if (!okRow) continue;
    return rankOf(rows);
  }
  return 0;
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

// y(x₀) = y₀ (and y′(x₀) = y′₀) for y = φ, with the constants in env.
function icHolds(cfg, phi, env = {}) {
  if (!cfg.ic) return { ok: true };
  const v = vOf(cfg);
  const x0 = Number(evalFloat(parse(String(cfg.ic.x ?? cfg.ic[v])), {}));
  const at = { ...env, [v]: x0 };
  const y0 = evalFloat(parse(String(cfg.ic.y ?? cfg.ic[uOf(cfg)])), {});
  const got = evalFloat(phi, at);
  if (!(Math.abs(got - y0) <= 1e-7 * (1 + Math.abs(y0)))) return { ok: false, got, want: y0, x0, which: 0 };
  if (cfg.ic.dy !== undefined) {
    const d0 = evalFloat(parse(String(cfg.ic.dy)), {});
    const g1 = evalFloat(diff(phi, v), at);
    if (!(Math.abs(g1 - d0) <= 1e-7 * (1 + Math.abs(d0)))) return { ok: false, got: g1, want: d0, x0, which: 1 };
  }
  return { ok: true };
}

// G(x, y, C) = 0 describes solutions: G_x + G_y·f = 0 on the curve G = 0
// (for a few x and draws of the constants, the roots in y of G are found
// by a scan and bisection). With `identically` (a line with ∫, a
// separated line), G is a first integral: the identity holds everywhere.
function relationCheck(cfg, G, consts, identically = false) {
  const { E } = eqOf(cfg);
  const v = vOf(cfg);
  const Gx = diff(G, v);
  const Gy = diff(G, Y[0]);
  const rng = makeRng(seedOf(toText(G)));
  const [ylo, yhi] = cfg.yRange || [-2, 2];
  let valid = 0;
  let moving = 0;
  const test = (env) => {
    const f = solvedHighest(E, 1, env);
    const a = ev(Gx, env);
    const b = ev(Gy, env);
    if (![f, a, b].every(Number.isFinite)) return null;
    valid++;
    if (Math.abs(b) > 1e-9) moving++;
    return small(a + b * f, Math.abs(a) + Math.abs(b * f) + (identically ? 0 : 1e2 * Math.abs(b)));
  };
  for (const env of draws(cfg, rng, identically ? 60 : 30, consts)) {
    if (identically) {
      const r = test(env);
      if (r === false) return { ok: false, at: env };
    } else {
      // Roots in y of G(x, ·) for this x and these constants.
      const g = (y) => ev(G, { ...env, [Y[0]]: y });
      const N = 120;
      let y0 = ylo;
      let g0 = g(y0);
      for (let i = 1; i <= N; i++) {
        const y1 = ylo + ((yhi - ylo) * i) / N;
        const g1 = g(y1);
        if (Number.isFinite(g0) && Number.isFinite(g1) && g0 * g1 < 0 && Math.abs(g0 - g1) < 1e3) {
          let a = y0;
          let b = y1;
          let ga = g0;
          for (let k = 0; k < 60; k++) { const m = (a + b) / 2; const gm = g(m); if (!Number.isFinite(gm)) break; if (ga * gm <= 0) b = m; else { a = m; ga = gm; } }
          const r = test({ ...env, [Y[0]]: (a + b) / 2 });
          if (r === false) return { ok: false, at: env };
        }
        y0 = y1;
        g0 = g1;
      }
    }
    if (valid >= 14) break;
  }
  if (valid < 4) return { ok: false, undecided: true };
  if (!moving) return { ok: false, flat: true };
  return { ok: true };
}

// The line's equation has the same highest derivative as cfg.eq.
function odeCheck(cfg, G) {
  const { E, order } = eqOf(cfg);
  if (orderOf(G) !== order) return { ok: false, order: orderOf(G) };
  const rng = makeRng(seedOf(toText(G)));
  let valid = 0;
  for (const env of draws(cfg, rng, 50, [])) {
    const a = solvedHighest(E, order, env);
    const b = solvedHighest(G, order, env);
    if (!Number.isFinite(a)) continue;
    if (!Number.isFinite(b)) return { ok: false, at: env };
    valid++;
    if (!small(a - b, Math.abs(a) + Math.abs(b))) return { ok: false, at: env };
    if (valid >= 12) break;
  }
  return valid >= 6 ? { ok: true } : { ok: false, undecided: true };
}

const clean = (n) => !contains(n, (x) => x.t === 'int' || x.t === 'deriv' || x.t === 'lim');
const ftext = (x) => frNum(x, 3);

// ---------- judging ----------

function analyse(cfg, node, state = {}) {
  const kind = kindOf(cfg, node);
  const u = uOf(cfg);
  const n = stripParen(node);
  const order = eqOf(cfg).order;
  switch (kind) {
    case 'explicit': case 'homog': case 'homog1': case 'particular': {
      const phi = renameSubs(n.r);
      const consts = constsIn(phi, cfg);
      const homog = kind !== 'explicit' && kind !== 'particular';
      const r = residualCheck(cfg, phi, { homog, consts });
      if (!r.ok) {
        if (r.undecided) return { kind: 'wrong', message: `Je n'arrive pas à vérifier ta ligne : elle n'est pas définie sur l'intervalle de l'énoncé.` };
        const eqName = homog ? "l'équation homogène" : "l'équation";
        return { kind: 'wrong', message: `Remplace ${u} par ta fonction dans ${eqName} : elle n'est pas vérifiée (par exemple en ${vOf(cfg)} = ${ftext(r.at[vOf(cfg)])}).` };
      }
      if (kind === 'particular') {
        if (consts.length) return { kind: 'wrong', message: `Une solution particulière n'a pas de constante : enlève ${consts[0]}.` };
        return { kind: cfg.final === 'particular' && clean(phi) ? 'done' : 'ok' };
      }
      if (kind === 'homog1') return { kind: consts.length ? 'wrong' : 'ok', message: consts.length ? `${u}₁ et ${u}₂ sont des solutions précises, sans constante.` : undefined };
      const rank = constRank(cfg, phi, consts, order);
      if (consts.length) {
        if (rank < order) return { kind: 'wrong', message: `Ta solution n'a que ${rank} constante${rank > 1 ? 's' : ''} indépendante${rank > 1 ? 's' : ''} : une équation d'ordre ${order} en demande ${order}.` };
        if (consts.length > order) return { kind: 'stay', message: `Il y a trop de constantes : regroupe-les, il en faut ${order}.` };
        if (kind === 'homog') return { kind: cfg.final === 'homog' && clean(phi) ? 'done' : 'ok', general: phi };
        if (cfg.ic) return { kind: 'ok', general: phi };
        return { kind: clean(phi) ? 'done' : 'ok', general: phi };
      }
      if (kind === 'homog') return { kind: 'wrong', message: `La solution homogène générale a ${order} constante${order > 1 ? 's' : ''}.` };
      if (cfg.ic) {
        const ic = icHolds(cfg, phi);
        if (!ic.ok) return { kind: 'wrong', message: `C'est une solution de l'équation, mais ${ic.which ? `${u}′` : u}(${ftext(ic.x0)}) = ${ftext(ic.got)} au lieu de ${ftext(ic.want)}.` };
        return { kind: clean(phi) ? 'done' : 'ok' };
      }
      if (cfg.final === 'one') return { kind: clean(phi) ? 'done' : 'ok' };
      return { kind: 'stay', message: `C'est une solution, mais pas la solution générale : il faut ${order} constante${order > 1 ? 's' : ''}.` };
    }
    case 'mu': {
      if (!cfg.mu) return { kind: 'wrong', message: 'Ici, on n\'utilise pas de facteur intégrant.' };
      const mu = renameSubs(n.r);
      const a = parse(String(cfg.mu), { dvar: vOf(cfg) });
      const v = vOf(cfg);
      const dm = diff(mu, v);
      const rng = makeRng(seedOf(toText(mu)));
      let valid = 0;
      for (const env of draws(cfg, rng, 30, [])) {
        const m = ev(mu, env);
        const d = ev(dm, env);
        const aa = ev(a, env);
        if (![m, d, aa].every(Number.isFinite) || Math.abs(m) < 1e-9) continue;
        valid++;
        if (!small(d / m - aa, Math.abs(aa))) return { kind: 'wrong', message: `Un facteur intégrant vérifie μ′/μ = a(${v}) = ${toText(a)} : avec ta ligne, en ${v} = ${ftext(env[v])}, μ′/μ = ${ftext(d / m)}.` };
        if (valid >= 10) break;
      }
      return valid >= 5 ? { kind: 'ok' } : { kind: 'wrong', message: 'Ton μ n\'est pas défini sur l\'intervalle de l\'énoncé.' };
    }
    case 'sep': {
      const P = lettersOf(node.P, cfg);
      const Q = lettersOf(node.Q, cfg);
      const v = vOf(cfg);
      if (symbolsIn(P).has(v)) return { kind: 'wrong', message: `Il reste du ${v} du côté de d${u} : sépare les variables.` };
      if (symbolsIn(Q).has(Y[0])) return { kind: 'wrong', message: `Il reste du ${u} du côté de d${v} : sépare les variables.` };
      // ∫P dy − ∫Q dx is then a first integral: P·f − Q = 0.
      const G = sub({ t: 'int', e: P, v: Y[0] }, { t: 'int', e: Q, v });
      const r = relationCheck(cfg, G, [], true);
      if (!r.ok) return { kind: 'wrong', message: r.undecided ? 'Je n\'arrive pas à vérifier ta ligne.' : `Ta séparation ne redonne pas l'équation : Q(${v})/P(${u}) doit valoir ${u}′.` };
      return { kind: 'ok' };
    }
    case 'relation': {
      const G = sub(lettersOf(n.l, cfg), lettersOf(n.r, cfg));
      const consts = constsIn(node, cfg);
      if (order !== 1) return { kind: 'wrong', message: `Écris ${u} = … : une relation ne suffit pas ici.` };
      const withInt = contains(G, (x) => x.t === 'int');
      const r = relationCheck(cfg, G, consts, withInt);
      if (!r.ok) {
        if (r.flat) return { kind: 'wrong', message: `Ta relation ne dépend pas de ${u} : elle ne dit rien sur les solutions.` };
        return { kind: 'wrong', message: r.undecided ? 'Je n\'arrive pas à vérifier ta ligne : elle n\'est pas définie là où je la teste.' : `Dérive ta relation (avec ${u} = ${u}(${vOf(cfg)})) : elle ne redonne pas l'équation.` };
      }
      if (withInt) return { kind: 'ok' };
      if (consts.length) return { kind: !cfg.ic && cfg.final === 'implicit' && clean(G) ? 'done' : 'ok', general: G, implicit: true };
      if (cfg.ic) {
        const v = vOf(cfg);
        const x0 = evalFloat(parse(String(cfg.ic.x)), {});
        const y0 = evalFloat(parse(String(cfg.ic.y)), {});
        const g = evalFloat(G, { [v]: x0, [Y[0]]: y0 });
        if (!(Math.abs(g) <= 1e-7 * (1 + Math.abs(evalFloat(lettersOf(n.l, cfg), { [v]: x0, [Y[0]]: y0 }))))) return { kind: 'wrong', message: `Au point initial (${ftext(x0)} ; ${ftext(y0)}), ta relation n'est pas vérifiée.` };
        return { kind: cfg.final === 'implicit' && clean(G) ? 'done' : 'ok' };
      }
      return { kind: 'ok' };
    }
    case 'ode': {
      const G = sub(lettersOf(n.l, cfg), lettersOf(n.r, cfg));
      const r = odeCheck(cfg, G);
      if (!r.ok) {
        if (r.order !== undefined) return { kind: 'wrong', message: `Ton équation est d'ordre ${r.order}, celle de l'énoncé d'ordre ${order}.` };
        return { kind: 'wrong', message: r.undecided ? 'Je n\'arrive pas à vérifier ta ligne.' : `Ce n'est plus la même équation : ${u}${'′'.repeat(order)} n'a pas la même valeur (par exemple en ${vOf(cfg)} = ${ftext(r.at[vOf(cfg)])}).` };
      }
      return { kind: 'ok' };
    }
    case 'consts': {
      const g = state.general;
      if (!g) return { kind: 'wrong', message: 'Écris d\'abord la solution générale, avec ses constantes.' };
      const items = n.t === 'list' ? n.items : [n];
      const env = {};
      for (const it of items) env[stripParen(renameSubs(it.l)).name] = evalFloat(it.r, {});
      if (!Object.values(env).every(Number.isFinite)) return { kind: 'wrong', message: 'Donne la valeur de chaque constante.' };
      if (state.implicit) {
        const v = vOf(cfg);
        const at = { ...env, [v]: evalFloat(parse(String(cfg.ic?.x ?? 0)), {}), [Y[0]]: evalFloat(parse(String(cfg.ic?.y ?? 0)), {}) };
        const val = evalFloat(g, at);
        if (!(Math.abs(val) <= 1e-7)) return { kind: 'wrong', message: `Avec cette valeur, la relation n'est pas vérifiée au point initial.` };
        return { kind: 'ok' };
      }
      const missing = constsIn(g, cfg).filter((c) => !(c in env));
      if (missing.length) return { kind: 'wrong', message: `Donne aussi ${missing[0].replace(/(\d)/, '_$1')}.` };
      const ic = icHolds(cfg, g, env);
      if (!ic.ok) return { kind: 'wrong', message: `Avec ces constantes, ${ic.which ? `${u}′` : u}(${ftext(ic.x0)}) = ${ftext(ic.got)} au lieu de ${ftext(ic.want)}.` };
      return { kind: 'ok' };
    }
    default: return { kind: 'parse', message: `Écris une égalité : ${u} = …, une relation entre ${vOf(cfg)} et ${u}, ou l'équation transformée.` };
  }
}

export function isFinal(cfg, node) {
  try { return analyse(cfg, node, {}).kind === 'done'; } catch { return false; }
}

// Two lines that say the same: same right side for « y = … », else the
// same difference of sides.
function sameLines(cfg, a, b) {
  if (a.t === 'odesep' || b.t === 'odesep') return a.t === b.t && equalsStructural(unparen(a.P), unparen(b.P)) && equalsStructural(unparen(a.Q), unparen(b.Q));
  const A = stripParen(a);
  const B = stripParen(b);
  const vars = [vOf(cfg), Y[0], ...constsOf(cfg)];
  const close = (x, y) => {
    const X = lettersOf(renameSubs(x), cfg);
    const Z = lettersOf(renameSubs(y), cfg);
    const rng = makeRng(seedOf(toText(X)));
    let valid = 0;
    for (const env of draws(cfg, rng, 30, constsOf(cfg))) {
      const p = ev(X, env);
      const q = ev(Z, env);
      if (!Number.isFinite(p) || !Number.isFinite(q)) continue;
      valid++;
      if (!small(p - q, Math.abs(p) + Math.abs(q))) return false;
      if (valid >= 10) break;
    }
    return valid >= 5;
  };
  void vars;
  if (A.t === 'rel' && B.t === 'rel') {
    if (equalsStructural(unparen(A.l), unparen(B.l))) return close(A.r, B.r);
    return close(sub(A.l, A.r), sub(B.l, B.r));
  }
  return close(A, B);
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (prev && node.t !== 'odesep' && prev.t !== 'odesep' && equalsStructural(unparen(node), unparen(prev), { parens: false })) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  let r;
  try { r = analyse(cfg, node, state); } catch (e) { return { kind: 'parse', node, message: 'Je n\'arrive pas à lire cette ligne comme une égalité.' }; }
  if (r.kind === 'wrong') {
    const diag = prev ? diagnoseLine('ode', prev, node, cfg, (cand, line) => sameLines(cfg, cand, line)) : null;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: r.message };
  }
  if (r.general) { state.general = r.general; state.implicit = !!r.implicit; }
  return { kind: r.kind, node, ...(r.message ? { message: r.message } : {}) };
}

// For traps and tests: does y = φ satisfy the equation (homogeneous one with homog)?
export function solves(cfg, phiText, homog = false) {
  const phi = renameSubs(parse(phiText, { dvar: vOf(cfg) }));
  return residualCheck(cfg, phi, { homog, consts: constsIn(phi, cfg) }).ok;
}
export { renameSubs, num };
