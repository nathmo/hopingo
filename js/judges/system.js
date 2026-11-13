// Judge `system` (spec §16.2 « system »; catalogue A2, « Lignes d'étape »,
// point 3; step U6): non-linear systems with finitely many real solutions
// (∇f = 0, Lagrange). cfg:
//   {vars: ['x', 'y'] | ['x', 'y', 'λ'], solutions: [['2', '1'], …] (texts,
//    in the order of vars), elim?: ['λ'] (letters that may disappear from a
//    line: it is then compared with the solutions' projection), box?: 8,
//    grid?: starting points per axis (default 41, 11, 6 for 1, 2, ≥ 3 unknowns)}
// A line is a system, or cases joined by « ou »: equations separated by
// « ; » or « et », brackets to group, « ou » between cases, so that
// « (x = 0 ou x = −2) ; y = 1 » is two cases. A point list
// « (2 ; 1), (1 ; 2) » is the cases « x = 2 ; y = 1 » and « x = 1 ; y = 2 »
// (coordinates in the order of vars without the eliminated letters).
// A line is right if its real solutions are those of the reference:
//   - every reference solution satisfies the line (else `wrong`: a lost
//     solution; the traps a2_crit_divide, a2_lagrange_divide are tried);
//   - no other solution: each case is solved numerically (Gauss-Newton from
//     a grid of starting points in [−box ; box]ⁿ); a root that is not a
//     reference solution makes the line `wrong`.
// A case with fewer equations than unknowns is `wrong` (« il manque une
// équation »), unless it has no solution at all.
// Final form: every case gives each coordinate as a number (x = 2 ; y = 1,
// or a point list).

import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { symbolsIn, stripParen, unparen, sub, dependsOn } from '../cas/ast.js';
import { evalFloat, compileFloat } from '../cas/numeric.js';
import { diagnoseLine } from './diagnose.js';
import { frNum } from './common.js';
import { t } from '../i18n.js';

export const sign = '⇔';

// ---------- reading ----------

// Splits s at top-level occurrences of a separator (outside brackets).
function splitTop(s, seps) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    const sep = depth === 0 ? seps.find((x) => s.startsWith(x, i)) : null;
    if (sep) { out.push(cur); cur = ''; i += sep.length - 1; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}
const wrapped = (s) => {
  s = s.trim();
  if (!s.startsWith('(') || !s.endsWith(')')) return false;
  let depth = 0;
  for (let i = 0; i < s.length; i++) { if (s[i] === '(') depth++; if (s[i] === ')') depth--; if (depth === 0 && i < s.length - 1) return false; }
  return true;
};
const pointVars = (cfg) => cfg.vars.filter((v) => !(cfg.elim || []).includes(v));

// Text → tree: {op: 'or' | 'and', items} | {rel} | {point: [rel]}.
function readTree(cfg, s) {
  s = s.trim();
  const ors = splitTop(s, [' ou ', '∨']);
  if (ors.length > 1) return { op: 'or', items: ors.map((x) => readTree(cfg, x)) };
  const ands = splitTop(s, [';', ' et ', '∧']);
  if (ands.length > 1 && !wrapped(s)) return { op: 'and', items: ands.map((x) => readTree(cfg, x)) };
  if (wrapped(s)) {
    const inner = s.slice(1, -1);
    // A point (2 ; 1): coordinates without « = ».
    if (!inner.includes('=')) {
      const xs = splitTop(inner, [';']);
      const pv = pointVars(cfg);
      if (xs.length !== pv.length) throw new Error(t('Un point a {n} coordonnées : ({c}).', { n: pv.length, c: pv.join(' ; ') }));
      return { point: xs.map((x, i) => parse(`${pv[i]}=${x}`, { vars: cfg.vars })), coords: xs.map((x) => parse(x, { vars: cfg.vars })) };
    }
    return { group: readTree(cfg, inner) };
  }
  const n = parse(s, { vars: cfg.vars });
  if (n.t !== 'rel' || n.op !== '=') throw new Error(t('Écris des équations « … = … », séparées par « ; », et « ou » entre les cas.'));
  return { rel: n };
}
// Tree → cases: [[rel]] (disjunctive form).
function casesOf(t) {
  if (t.rel) return [[t.rel]];
  if (t.point) return [t.point];
  if (t.group) return casesOf(t.group);
  if (t.op === 'or') return t.items.flatMap(casesOf);
  let acc = [[]];
  for (const it of t.items) { const cs = casesOf(it); acc = acc.flatMap((x) => cs.map((c) => [...x, ...c])); }
  return acc;
}

export function parseLine(cfg, text) {
  let s = String(text).replace(/^\s*=/, '').trim();
  // (2 ; 1), (1 ; 2): points separated by commas.
  s = s.replace(/\)\s*,\s*\(/g, ') ou (');
  const tree = readTree(cfg, s);
  return { t: 'sys', tree, cases: casesOf(tree), text: treeText(tree) };
}

const inner = (n) => toMathML(unparen(n)).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
const fence = (x) => `<mrow><mo>(</mo>${x}<mo>)</mo></mrow>`;
function treeML(t) {
  if (t.rel) return inner(t.rel);
  if (t.point) return fence(t.coords.map(inner).join('<mo separator="true">;</mo><mspace width="0.3em"/>'));
  if (t.group) return fence(treeML(t.group));
  if (t.op === 'or') return t.items.map(treeML).join('<mtext>&#x2004;ou&#x2004;</mtext>');
  return t.items.map(treeML).join('<mo separator="true">;</mo><mspace width="0.5em"/>');
}
function treeText(t) {
  if (t.rel) return toText(t.rel);
  if (t.point) return `(${t.coords.map((x) => toText(x)).join(' ; ')})`;
  if (t.group) return `(${treeText(t.group)})`;
  return t.items.map(treeText).join(t.op === 'or' ? ' ou ' : ' ; ');
}
export function show(cfg, node, opts = {}) {
  if (node.t !== 'sys') return toMathML(node, opts);
  return `<math${opts.display ? ' display="block"' : ''}><mrow>${treeML(node.tree)}</mrow></math>`;
}
export function text(cfg, node) {
  if (node.t !== 'sys') return toText(node);
  return treeText(node.tree);
}
export const start = (cfg) => cfg.start;

// ---------- solving ----------

const residuals = (cs) => cs.map((r) => compileFloat(sub(r.l, r.r)));
const scaleOf = (cs) => cs.map((r) => [compileFloat(r.l), compileFloat(r.r)]);

function satisfies(c, vars, point) {
  const env = Object.fromEntries(vars.map((v, i) => [v, point[i]]));
  return c.every((r) => {
    const a = evalFloat(r.l, env);
    const b = evalFloat(r.r, env);
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-7 * (1 + Math.abs(a) + Math.abs(b));
  });
}

// Real roots of a case in [−B ; B]ⁿ (Gauss-Newton from a grid of starts).
function solveCase(c, vars, B, grid) {
  const F = residuals(c);
  const S = scaleOf(c);
  const n = vars.length;
  const m = F.length;
  const val = (p) => { const env = Object.fromEntries(vars.map((v, i) => [v, p[i]])); return F.map((f) => f(env)); };
  const roots = [];
  const k = grid ?? (n === 1 ? 41 : n === 2 ? 11 : 6);
  const starts = [];
  const rec = (pre) => {
    if (pre.length === n) { starts.push(pre); return; }
    for (let i = 0; i < k; i++) rec([...pre, -B + ((2 * B) * (i + 0.37)) / k]);
  };
  rec([]);
  for (let p of starts) {
    let ok = false;
    for (let it = 0; it < 40; it++) {
      const r = val(p);
      if (!r.every(Number.isFinite)) break;
      const nr = Math.hypot(...r);
      if (nr < 1e-12) { ok = true; break; }
      // Jacobian by central differences.
      const J = r.map(() => new Array(n).fill(0));
      for (let j = 0; j < n; j++) {
        const h = 1e-6 * (1 + Math.abs(p[j]));
        const a = val(p.map((x, i) => (i === j ? x + h : x)));
        const b = val(p.map((x, i) => (i === j ? x - h : x)));
        for (let i = 0; i < m; i++) J[i][j] = (a[i] - b[i]) / (2 * h);
      }
      // Normal equations (JᵀJ + μI) d = −Jᵀr.
      const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => J.reduce((s, row) => s + row[i] * row[j], 0) + (i === j ? 1e-12 : 0)));
      const g = Array.from({ length: n }, (_, i) => -J.reduce((s, row, q) => s + row[i] * r[q], 0));
      const d = solveLin(A, g);
      if (!d) break;
      p = p.map((x, i) => x + d[i]);
      if (p.some((x) => Math.abs(x) > 4 * B)) break;
    }
    if (!ok) {
      const r = val(p);
      ok = r.every(Number.isFinite) && Math.hypot(...r) < 1e-9;
    }
    if (!ok || p.some((x) => Math.abs(x) > B + 1e-9)) continue;
    // A root of the case: every equation, relative to the size of its sides.
    const env = Object.fromEntries(vars.map((v, i) => [v, p[i]]));
    if (!S.every(([l, rr]) => Math.abs(l(env) - rr(env)) <= 1e-7 * (1 + Math.abs(l(env)) + Math.abs(rr(env))))) continue;
    if (!roots.some((q) => q.every((x, i) => Math.abs(x - p[i]) < 1e-5 * (1 + Math.abs(x))))) roots.push(p);
  }
  return roots;
}

function solveLin(A, b) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    if (Math.abs(M[p][c]) < 1e-300) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let i = 0; i < n; i++) if (i !== c) { const f = M[i][c] / M[c][c]; for (let j = c; j <= n; j++) M[i][j] -= f * M[c][j]; }
  }
  return M.map((r, i) => r[n] / r[i]);
}

// ---------- reference ----------

const REFS = new Map();
function reference(cfg) {
  const key = JSON.stringify([cfg.vars, cfg.solutions]);
  if (!REFS.has(key)) REFS.set(key, cfg.solutions.map((s) => s.map((x) => evalFloat(parse(String(x)), {}))));
  return REFS.get(key);
}

// The letters of the line among cfg.vars (eliminated letters may be gone).
function lineVars(cfg, node) {
  const used = new Set(node.cases.flatMap((c) => c.flatMap((r) => [...symbolsIn(r)])));
  return cfg.vars.filter((v) => used.has(v) || !(cfg.elim || []).includes(v));
}
function projected(cfg, vars) {
  const idx = vars.map((v) => cfg.vars.indexOf(v));
  const out = [];
  for (const s of reference(cfg)) {
    const p = idx.map((i) => s[i]);
    if (!out.some((q) => q.every((x, i) => Math.abs(x - p[i]) < 1e-9))) out.push(p);
  }
  return out;
}
const ptText = (p) => `(${p.map((x) => frNum(x, 3)).join(' ; ')})`;

// {lost: [points], extra: [points], short: case} of a line.
export function compare(cfg, node) {
  const vars = lineVars(cfg, node);
  const ref = projected(cfg, vars);
  const lost = ref.filter((p) => !node.cases.some((c) => satisfies(c, vars, p)));
  const extra = [];
  let short = null;
  const B = cfg.box ?? 8;
  for (const c of node.cases) {
    const cvars = vars.filter((v) => c.some((r) => symbolsIn(r).has(v)));
    const roots = solveCase(c, vars, B, cfg.grid);
    if (c.length < vars.length || cvars.length < vars.length) {
      // Not enough equations: fine only if the case has no solution.
      if (roots.length || c.length < cvars.length) { short = c; continue; }
    }
    for (const p of roots) if (!ref.some((q) => q.every((x, i) => Math.abs(x - p[i]) < 1e-5 * (1 + Math.abs(x))))) extra.push(p);
  }
  return { vars, lost, extra, short };
}

export function isFinal(cfg, node) {
  if (node.t !== 'sys') return false;
  const pv = pointVars(cfg);
  return node.cases.every((c) => pv.every((v) => c.some((r) => { const l = stripParen(r.l); return l.t === 'sym' && l.name === v && !symbolsIn(r.r).size; })) && c.length === pv.length);
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = input;
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  if (prev?.t === 'sys' && text(cfg, prev) === text(cfg, node)) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  const r = compare(cfg, node);
  const fail = (message) => {
    const same = (cand, line) => {
      if (cand.t !== 'sys') return false;
      const a = compare(cfg, cand);
      const b = compare(cfg, line);
      return a.lost.length > 0 && a.lost.length === b.lost.length && a.lost.every((p) => b.lost.some((q) => q.every((x, i) => Math.abs(x - p[i]) < 1e-6)));
    };
    const diag = prev ? diagnoseLine('system', prev, node, cfg, same) : null;
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message };
  };
  if (r.lost.length) return fail(t('Tu as perdu la solution {p} : elle vérifie le système de départ, mais pas ta ligne.', { p: ptText(r.lost[0]) }));
  if (r.short) return fail(t('Dans le cas « {c} », il manque une équation : le système de départ en a {n}.', { c: r.short.map((x) => toText(x)).join(' ; '), n: r.vars.length }));
  if (r.extra.length) return fail(t('Ta ligne a une solution en trop : {p} ne vérifie pas le système de départ.', { p: ptText(r.extra[0]) }));
  return { kind: isFinal(cfg, node) ? 'done' : 'ok', node };
}

void dependsOn;
