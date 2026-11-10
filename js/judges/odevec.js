// Judge `odevec` (step U8): the vector form of the judge `ode` for linear
// systems x′ = Ax (continuous) and x_{k+1} = Ax_k (discrete), catalogue M
// (m-ode-modes, m-expm, m-discrete; README §16.2 « ode : inconnue
// vectorielle (X′ = AX, e^(At)) »). The component lines « x = … ; y = … »
// stay with the judge `ode` and cfg.system (js/judges/ode-system.js, step
// U6); here a line is written in the matrix language of js/cas/matexpr.js,
// so a whole vector or matrix of functions is one line, typed in the grid:
//   x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)      general solution
//   x(t) = 3e^(-2t)(1 ; -2) - 2e^(-3t)(1 ; -3)           with x(0) = x0
//   e^(At) = e^(2t)(I + tN)   e^(At) = e^(2t)·[[1-t, t], [-t, 1+t]]
//   x_k = 2(1/2)^k(1 ; 1) - (-1/4)^k(1 ; 2)                discrete, v = k
//   c_1 = 3 ; c_2 = -2                                    constants of the
//                                                         last general line
// cfg: {kind: 'odevec', A: '[[0,1],[-6,-5]]', v?: 't' (or 'k' with
//       discrete), discrete?: false, x0?: '(1 ; 0)', want: 'expm' |
//       'solution' | 'general', names?: {N: '[[…]]', P: …}, domain?: [lo, hi]}
// Every line is judged against the equation, not against the previous line:
//   a matrix M: M(0) = I and M′ = AM (discrete: M(k + 1) = A·M(k), k = 0…6);
//   a vector x: x′ = Ax (x_{k+1} = Ax_k); with constants c_1 … c_n, they
//     must be n independent ones (the general solution, kept in the state);
//     without, x(0) = x0;
//   constants: with them, the last general line satisfies x(0) = x0.
// Final form: with want 'expm', a matrix written out (a literal, or a
// scalar times a literal: e^(2t)·[[…]]), no I nor named matrix left; with
// 'solution', a vector without constants written out (a sum of scalar
// times literal vectors is fine); with 'general', the same with n constants.
// Traps (judges: ['odevec']) replay on the previous line or on cfg; the
// candidates are compared by their values at a few times.

import { parseMatLine, evalAst, envOf, lineML, lineText, normalizeMatText, isLiteralAst, exprML } from '../cas/matexpr.js';
import { ParseError, parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { diff } from '../cas/diff.js';
import { evalFloat } from '../cas/numeric.js';
import { mapNode, symbolsIn, stripParen } from '../cas/ast.js';
import { toText } from '../cas/print.js';
import { diagnoseLine } from './diagnose.js';
import { frNum } from './common.js';

export const sign = '';
export const input = 'matrix';

const vOf = (cfg) => cfg.v || (cfg.discrete ? 'k' : 't');
const optsOf = (cfg) => ({ vars: [vOf(cfg), 'c', 'λ'], names: cfg.names });
const ftext = (x) => frNum(x, 3);

// c_1 → c1, so that evalFloat tells c_1 from c_2.
const subText = (sub) => (typeof sub === 'object' ? (stripParen(sub).t === 'num' ? toText(sub) : null) : /^\d+$/.test(String(sub)) ? String(sub) : null);
const renameSubs = (n) => mapNode(n, (x) => (x.t === 'sym' && x.sub && subText(x.sub) !== null ? { t: 'sym', name: `${x.name}${subText(x.sub)}` } : x));
const isConst = (s) => /^c\d$/.test(s);

const cache = new WeakMap();
function aOf(cfg) {
  if (!cache.has(cfg)) {
    const v = evalAst(parseMatLineSafe(String(cfg.A)).body, {}, {});
    const x0 = cfg.x0 ? evalAst(parseMatLineSafe(String(cfg.x0)).body, {}, {}) : null;
    cache.set(cfg, {
      A: v.rows.map((r) => r.map((x) => evalFloat(x, {}))),
      x0: x0 ? x0.rows.map((r) => evalFloat(r[0], {})) : null,
    });
  }
  return cache.get(cfg);
}
function parseMatLineSafe(text) { return parseMatLine(normalizeMatText(text), {}); }

// ---------- reading ----------

// « c_1 = 3 ; c_2 = -2 » → {c1: 3, c2: -2}, else null.
function constantsLine(text) {
  const parts = text.split(';').map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return null;
  const env = {};
  for (const p of parts) {
    const m = /^[cC]_?\(?(\d)\)?\s*=\s*(.+)$/.exec(p);
    if (!m) return null;
    const val = evalFloat(parseScalar(m[2]), {});
    if (!Number.isFinite(val)) return null;
    env[`c${m[1]}`] = val;
  }
  return env;
}
function parseScalar(t) {
  const line = parseMatLine(normalizeMatText(t), { vars: [] });
  const v = evalAst(line.body, {}, {});
  if (v.k !== 's') throw new ParseError('Une constante est un nombre.', 0);
  return v.n;
}

function readLine(cfg, text0) {
  const text = normalizeMatText(String(text0 ?? '').replace(/^\s*=/, '')).replace(/\bC_(\d)/g, 'c_$1');
  const consts = constantsLine(text);
  if (consts) return { t: 'mline', ops: [], assigns: [], label: null, body: null, value: null, consts, text, raw: true, ml: `<mtext>${text.replace(/</g, '&lt;')}</mtext>` };
  const opts = optsOf(cfg);
  const line = parseMatLine(text, opts);
  if (line.ops.length || line.assigns.length > 1) throw new ParseError('Écris une seule matrice ou un seul vecteur, fonction de ' + vOf(cfg) + '.', 0);
  const env = { ...envOf(opts) };
  line.value = line.body ? evalAst(line.body, env, opts, aOf(cfg).A.length) : null;
  // Shown as written (a sum of modes, e^(2t)(I + tN)), not as its value.
  if (line.body && !isLiteralAst(line.body)) line.ml = exprML(line.body);
  // « e^(At) = … » is read as a label, not as a product.
  if (line.label && /e\^?\(?A/.test(line.label)) line.assigns = [];
  return { t: 'mline', ...line, text };
}

// Start and shown lines: a text that does not evaluate (« x(t) », « e^(At) »)
// is shown as written.
export function parseLine(cfg, text0) {
  try { return readLine(cfg, text0); } catch {
    const t = normalizeMatText(String(text0 ?? ''));
    let ml;
    try { ml = toMathML(parse(t, { vars: ['A', 't', 'k', 'x', 'λ'], funcs: ['x'] })).replace(/^<math[^>]*>|<\/math>$/g, ''); } catch { ml = `<mtext>${t.replace(/</g, '&lt;')}</mtext>`; }
    return { t: 'mline', ops: [], assigns: [], label: null, body: null, value: null, raw: true, text: t, ml };
  }
}

export const show = (cfg, node, opts = {}) => lineML(node, opts);
export const text = (cfg, node) => (node.consts ? node.text : lineText(node));
export const start = (cfg) => cfg.start;

// ---------- checking ----------

const entries = (value) => value.rows.map((r) => r.map((x) => renameSubs(x)));
const constsOf = (rows) => [...new Set(rows.flat().flatMap((x) => [...symbolsIn(x)].filter(isConst)))].sort();

function samples(cfg, consts, n = 8) {
  const v = vOf(cfg);
  const out = [];
  const [lo, hi] = cfg.domain || [-1.2, 1.4];
  for (let i = 0; i < n; i++) {
    const env = { [v]: cfg.discrete ? i % 7 : lo + ((hi - lo) * (i + 0.37)) / n };
    consts.forEach((c, j) => { env[c] = 0.7 + 0.53 * ((i * 3 + j * 5) % 7) - 1.4; });
    out.push(env);
  }
  return out;
}

const fval = (rows, env) => rows.map((r) => r.map((x) => evalFloat(x, env)));
const near = (a, b) => Math.abs(a - b) <= 1e-7 * (1 + Math.abs(a) + Math.abs(b));

// Does the matrix or vector of functions satisfy the equation? (rows: CAS
// nodes, n × m with m = n or 1.) Returns {ok, at?, entry?}.
function satisfies(cfg, rows, consts) {
  const { A } = aOf(cfg);
  const v = vOf(cfg);
  const d = cfg.discrete ? null : rows.map((r) => r.map((x) => diff(x, v)));
  let valid = 0;
  for (const env of samples(cfg, consts, 10)) {
    const X = fval(rows, env);
    const next = cfg.discrete ? fval(rows, { ...env, [v]: env[v] + 1 }) : fval(d, env);
    if (![...X.flat(), ...next.flat()].every(Number.isFinite)) continue;
    valid++;
    for (let i = 0; i < X.length; i++) {
      for (let j = 0; j < X[0].length; j++) {
        const want = A[i].reduce((s, a, k) => s + a * X[k][j], 0);
        if (!near(next[i][j], want)) return { ok: false, at: env, entry: [i, j] };
      }
    }
  }
  return valid >= 5 ? { ok: true } : { ok: false, undecided: true };
}

// Rank of ∂x/∂(constants) at a point.
function constRank(cfg, rows, consts) {
  const env = samples(cfg, consts, 3)[1];
  const h = 1e-4;
  const J = rows.map((r) => consts.map((c) => (evalFloat(r[0], { ...env, [c]: env[c] + h }) - evalFloat(r[0], { ...env, [c]: env[c] - h })) / (2 * h)));
  const M = J.map((r) => [...r]);
  let rank = 0;
  const m = M.length;
  const n = M[0]?.length ?? 0;
  for (let c = 0; c < n && rank < m; c++) {
    let p = rank;
    for (let i = rank + 1; i < m; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    if (Math.abs(M[p][c]) < 1e-7) continue;
    [M[rank], M[p]] = [M[p], M[rank]];
    for (let i = rank + 1; i < m; i++) { const f = M[i][c] / M[rank][c]; for (let j = c; j < n; j++) M[i][j] -= f * M[rank][j]; }
    rank++;
  }
  return rank;
}

// The value at time 0 (k = 0).
const at0 = (cfg, rows, env = {}) => fval(rows, { ...env, [vOf(cfg)]: 0 });

const hasNames = (ast) => !!ast && (ast.op === 'name' || ast.op === 'I' || ['e', 'a', 'b'].some((k) => ast[k] && typeof ast[k] === 'object' && ast[k].op && hasNames(ast[k])) || (ast.items || []).some?.((x) => x?.op && hasNames(x)));
// A scalar expression: numbers, e^(…), products and sums of them.
const scalarAst = (ast) => !!ast && (ast.op === 'num' || (['pow', 'exp'].includes(ast.op) && scalarAst(ast.e)) || (['mul', 'div', 'add', 'sub'].includes(ast.op) && scalarAst(ast.a) && scalarAst(ast.b)) || (['neg', 'paren'].includes(ast.op) && scalarAst(ast.e)));
// Written out: no named matrix, no I; a literal, or sums of scalar times literals.
function writtenOut(ast) {
  if (!ast || hasNames(ast)) return false;
  if (isLiteralAst(ast)) return true;
  if (ast.op === 'paren') return writtenOut(ast.e);
  if (ast.op === 'neg') return writtenOut(ast.e);
  if (ast.op === 'mul') return (scalarAst(ast.a) && writtenOut(ast.b)) || (scalarAst(ast.b) && writtenOut(ast.a));
  if (ast.op === 'add' || ast.op === 'sub') return writtenOut(ast.a) && writtenOut(ast.b);
  return false;
}

function analyse(cfg, node, state) {
  const { x0 } = aOf(cfg);
  const n = aOf(cfg).A.length;
  const v = vOf(cfg);
  const tName = cfg.discrete ? 'k' : 't';
  if (node.consts) {
    const g = state.general;
    if (!g) return { kind: 'wrong', message: 'Écris d\'abord la solution générale, avec ses constantes c₁, c₂.' };
    const missing = constsOf(g).filter((c) => !(c in node.consts));
    if (missing.length) return { kind: 'wrong', message: `Donne aussi ${missing[0].replace(/(\d)/, '_$1')}.` };
    if (x0) {
      const X = at0(cfg, g, node.consts).map((r) => r[0]);
      const i = X.findIndex((x, k) => !near(x, x0[k]));
      if (i >= 0) return { kind: 'wrong', message: `Avec ces constantes, la composante ${i + 1} de x(0) vaut ${ftext(X[i])} au lieu de ${ftext(x0[i])} : résous Pc = x(0).` };
    }
    return { kind: 'ok' };
  }
  const val = node.value;
  if (!val || val.k !== 'm') return { kind: 'form', message: 'Écris une matrice ou un vecteur, fonction de ' + v + '.' };
  const rows = entries(val);
  if (rows.length !== n) return { kind: 'wrong', message: `Il faut ${n} lignes : la taille de A.` };
  const isVec = rows[0].length === 1;
  if (!isVec && rows[0].length !== n) return { kind: 'wrong', message: `Écris une matrice ${n}×${n} ou un vecteur.` };
  const consts = constsOf(rows);
  const r = satisfies(cfg, rows, consts);
  if (!r.ok) {
    if (r.undecided) return { kind: 'wrong', message: 'Je n\'arrive pas à vérifier ta ligne : elle n\'est pas définie là où je la teste.' };
    const [i, j] = r.entry;
    const where = isVec ? `la composante ${i + 1}` : `la case (${i + 1}, ${j + 1})`;
    return { kind: 'wrong', message: cfg.discrete
      ? `Ta ligne ne vérifie pas x_{k+1} = Ax_k : regarde ${where}, par exemple pour k = ${r.at[v]}.`
      : `Dérive ta ligne : ${where} de sa dérivée ne vaut pas celle de A·(ta ligne), par exemple en ${tName} = ${ftext(r.at[v])}.` };
  }
  if (!isVec) {
    if (consts.length) return { kind: 'wrong', message: 'e^(At) n\'a pas de constante.' };
    const M0 = at0(cfg, rows);
    const bad = M0.flatMap((row, i) => row.map((x, j) => ({ i, j, x }))).find(({ i, j, x }) => !near(x, i === j ? 1 : 0));
    if (bad) return { kind: 'wrong', message: `En ${tName} = 0, ta matrice ne vaut pas I : la case (${bad.i + 1}, ${bad.j + 1}) vaut ${ftext(bad.x)}.` };
    if (cfg.want === 'expm') return { kind: writtenOut(node.body) ? 'done' : 'ok' };
    return { kind: 'ok' };
  }
  if (consts.length) {
    const rank = constRank(cfg, rows, consts);
    if (rank < n) return { kind: 'wrong', message: `Ta solution n'a que ${rank} constante${rank > 1 ? 's' : ''} indépendante${rank > 1 ? 's' : ''} : il en faut ${n}, une par mode.` };
    if (consts.length > n) return { kind: 'stay', message: `Il y a trop de constantes : il en faut ${n}.` };
    return { kind: cfg.want === 'general' && writtenOut(node.body) ? 'done' : 'ok', general: rows };
  }
  if (x0) {
    const X = at0(cfg, rows).map((rw) => rw[0]);
    const i = X.findIndex((x, k) => !near(x, x0[k]));
    if (i >= 0) return { kind: 'wrong', message: `C'est une solution, mais sa composante ${i + 1} vaut ${ftext(X[i])} en ${tName} = 0 au lieu de ${ftext(x0[i])}.` };
    return { kind: cfg.want === 'solution' && writtenOut(node.body) ? 'done' : 'ok' };
  }
  return { kind: 'stay', message: `C'est une solution, mais pas la solution générale : il faut ${n} constantes.` };
}

// Two lines with the same values (for the traps): the same matrix or vector
// of functions at a few times, or the same constants.
export function sameLine(cfg, a, b) {
  if (a.consts || b.consts) {
    if (!a.consts || !b.consts) return false;
    const ka = Object.keys(a.consts).sort();
    return ka.join() === Object.keys(b.consts).sort().join() && ka.every((k) => near(a.consts[k], b.consts[k]));
  }
  if (a.value?.k !== 'm' || b.value?.k !== 'm') return false;
  const ra = entries(a.value);
  const rb = entries(b.value);
  if (ra.length !== rb.length || ra[0].length !== rb[0].length) return false;
  const consts = [...new Set([...constsOf(ra), ...constsOf(rb)])];
  let valid = 0;
  for (const env of samples(cfg, consts, 8)) {
    const x = fval(ra, env).flat();
    const y = fval(rb, env).flat();
    if (![...x, ...y].every(Number.isFinite)) continue;
    valid++;
    if (x.some((u, i) => !near(u, y[i]))) return false;
  }
  return valid >= 4;
}

export function isFinal(cfg, node) {
  try { return analyse(cfg, node, {}).kind === 'done'; } catch { return false; }
}

export function judgeLine(cfg, prev, input0, state = {}) {
  let node;
  if (input0 && typeof input0 === 'object') node = input0;
  else {
    try { node = readLine(cfg, input0); } catch (e) { return { kind: 'parse', message: e instanceof ParseError || e instanceof SyntaxError || e instanceof RangeError ? e.message : `Je n'arrive pas à lire cette ligne (${e.message}).` }; }
  }
  if (prev?.text && node.text === prev.text) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  let r;
  try { r = analyse(cfg, node, state); } catch (e) { return { kind: 'parse', node, message: `Je n'arrive pas à lire cette ligne (${e.message}).` }; }
  if (r.kind === 'wrong') {
    const diag = prev ? diagnoseLine('odevec', prev, node, cfg, (cand, line) => sameLine(cfg, cand, line)) : null;
    return { kind: 'wrong', node, rule: diag?.rules?.[0] ?? null, diag, message: r.message };
  }
  if (r.general) state.general = r.general;
  return { kind: r.kind, node, ...(r.message ? { message: r.message } : {}) };
}

// For the traps and the generators: the line node of a text (null if it
// does not read), and the float value of a line at time v.
export function lineOf(cfg, t) { try { return readLine(cfg, t); } catch { return null; } }
export function valueAt(cfg, node, at) { return fval(entries(node.value), { [vOf(cfg)]: at }); }
