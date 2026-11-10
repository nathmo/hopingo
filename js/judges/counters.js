// Counter-examples that are sequences or functions (step U4, catalogue A1
// convention 7), for `tf` items: js/judges/examples.js hands these kinds
// here.
//
// counter = {kind: 'sequence', v?: 'n', from?: 1, seqs?: ['a'], hyp: [P…], concl: P,
//            ask: [{v: 'a', label: 'aₙ =', keys}], answer: {a: '(-1)^n'}}
// counter = {kind: 'function', v?: 'x', funcs?: ['f'], hyp: [P…], concl: P,
//            ask: [{v: 'f', label: 'f(x) =', keys}], answer: {f: 'abs(x)'}}
// P = {p, of?, at?, on?, value?}: the property p of the expression `of`
// written with the student's sequences or functions (a, b, a + b, a·b,
// a/b; `of` is the first one by default). The counter-example is accepted
// when every hypothesis holds and the conclusion fails, each decided
// numerically; an undecided property refuses it (« prends plus simple »).
//   sequence: converges, diverges, bounded, unbounded, toZero, toInf
//             (+∞), increasing, decreasing, monotone, positive, limit
//             (value: text), seriesConverges, seriesDiverges, absConverges
//             (Σ|aₙ| converges), alternating (sign changes every term),
//             eventuallyConstant (step U4: constant from some rank on)
//   function: definedAt, continuousAt, limitAt (exists, finite), limitIs
//             (value), differentiableAt, boundedOn (on: [lo, hi]),
//             continuousOn (on: [lo, hi], closed), positive (on), zeroIn
//             (a zero in on), noZeroIn
//   Each P may carry `say`, the French text of the property, for messages.
// checkSeqFn(counter, answers) → {ok, message?, rule?}

import { tryParse } from '../cas/parse.js';
import { mapNode, symbolsIn } from '../cas/ast.js';
import { compileFloat, evalFloat, seriesSum } from '../cas/numeric.js';
import { limit } from '../cas/limit.js';
import { Q } from '../math/rational.js';

const F = (v) => (v instanceof Q ? v.n / v.d : v);

// The node of `of` with the student's sequences or functions put in.
function exprOf(counter, prop, nodes) {
  const names = counter.kind === 'sequence' ? counter.seqs || ['a'] : counter.funcs || ['f'];
  const of = prop.of || names[0];
  const v = counter.v || (counter.kind === 'sequence' ? 'n' : 'x');
  const base = tryParse(of, { vars: [...names, v], funcs: counter.kind === 'function' ? names : [] });
  if (!base) return null;
  return mapNode(base, (n) => {
    if (n.t === 'sym' && !n.sub && nodes[n.name]) return { t: 'paren', e: nodes[n.name] };
    if (n.t === 'fn' && nodes[n.name]) return { t: 'paren', e: nodes[n.name] };
    return n;
  });
}

// ---------- sequences ----------

function seqTerms(f, from) {
  const ns = [];
  for (let n = from; n <= from + 2000; n++) ns.push(n);
  for (let k = 4; k <= 8; k++) for (const j of [0, 1, 7]) ns.push(10 ** k + j);
  return ns.map((n) => ({ n, y: f(n) }));
}

function seqProp(prop, node, counter) {
  const v = counter.v || 'n';
  const from = counter.from ?? 1;
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (n) => { try { return c({ [v]: n }); } catch { return NaN; } };
  const lim = () => { try { return limit(node, v, '+inf', undefined, { discrete: true }).value; } catch { return null; } };
  const ts = seqTerms(f, from);
  if (ts.slice(0, 200).some((t) => !Number.isFinite(t.y))) return { undefined: true };
  const diffs = () => {
    const out = [];
    for (let n = from; n < from + 2000; n++) out.push(f(n + 1) - f(n));
    for (let k = 4; k <= 8; k++) out.push(f(10 ** k + 1) - f(10 ** k));
    return out;
  };
  const tol = (x) => 1e-12 * (1 + Math.abs(x));
  switch (prop.p) {
    case 'converges': case 'diverges': {
      const L = lim();
      if (L === null) return null;
      const conv = typeof L !== 'string';
      return prop.p === 'converges' ? conv : !conv;
    }
    case 'limit': {
      const L = lim();
      if (L === null) return null;
      if (typeof L === 'string') return false;
      return Math.abs(F(L) - evalFloat(tryParse(String(prop.value)), {})) < 1e-6;
    }
    case 'toZero': { const L = lim(); if (L === null) return null; return typeof L !== 'string' && Math.abs(F(L)) < 1e-9; }
    case 'toInf': { const L = lim(); if (L === null) return null; return L === '+inf'; }
    case 'bounded': case 'unbounded': {
      const L = lim();
      let b = null;
      if (L !== null && typeof L !== 'string') b = true;
      else if (L === '+inf' || L === '-inf') b = false;
      else {
        const m1 = Math.max(...ts.filter((t) => t.n < 1000).map((t) => Math.abs(t.y)));
        const m2 = Math.max(...ts.filter((t) => t.n >= 1e6).map((t) => Math.abs(t.y)));
        if (m2 > 10 * m1 && m2 > 1e3) b = false;
        else if (m2 <= 2 * m1 + 1e-9) b = true;
      }
      if (b === null) return null;
      return prop.p === 'bounded' ? b : !b;
    }
    case 'increasing': return diffs().every((d) => d >= -tol(d));
    case 'decreasing': return diffs().every((d) => d <= tol(d));
    case 'monotone': { const d = diffs(); return d.every((x) => x >= -tol(x)) || d.every((x) => x <= tol(x)); }
    case 'positive': return ts.every((t) => t.y > 0);
    case 'alternating': return ts.slice(0, 2000).every((t, i, a) => i === 0 || t.y * a[i - 1].y < 0);
    // Step U4 (A1, ε-N): constant from some rank on (seen from n = from + 1000).
    case 'eventuallyConstant': { const far = ts.filter((t) => t.n >= from + 1000); return far.every((t) => Math.abs(t.y - far[0].y) <= tol(far[0].y)); }
    case 'seriesConverges': case 'seriesDiverges': case 'absConverges': {
      const body = prop.p === 'absConverges' ? { t: 'abs', e: node } : node;
      const r = seriesNature(body, v, from);
      if (r === null) return null;
      return prop.p === 'seriesDiverges' ? !r : r;
    }
    default: return null;
  }
}

// true (converges), false (diverges) or null (cannot tell).
function seriesNature(node, v, from) {
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (n) => { try { return c({ [v]: n }); } catch { return NaN; } };
  const L = (() => { try { return limit(node, v, '+inf', undefined, { discrete: true }).value; } catch { return null; } })();
  if (L !== null && (typeof L === 'string' || Math.abs(F(L)) > 1e-9)) return false;
  const s = seriesSum({ t: 'sum', e: node, k: v, lo: { t: 'num', v: new Q(from), s: String(from) }, hi: { t: 'const', name: 'inf' } }, {});
  if (Number.isFinite(s)) return true;
  // Blocks S(2N) − S(N) that do not shrink (Σ 1/n): divergent.
  const g = (n) => f(n);
  const block = (N) => { let s2 = 0; for (let n = N; n < 2 * N; n++) s2 += g(n); return s2; };
  const b1 = block(2 ** 10);
  const b2 = block(2 ** 16);
  if (Number.isFinite(b1) && Number.isFinite(b2) && Math.abs(b2) >= 0.9 * Math.abs(b1) && Math.abs(b2) > 1e-6) return false;
  return null;
}

// ---------- functions ----------

const num = (t) => evalFloat(tryParse(String(t)), {});

function fnProp(prop, node, counter) {
  const v = counter.v || 'x';
  let c;
  try { c = compileFloat(node); } catch { return null; }
  const f = (x) => { try { return c({ [v]: x }); } catch { return NaN; } };
  const at = prop.at !== undefined ? num(prop.at) : 0;
  const atQ = (() => { const n = tryParse(String(prop.at ?? 0)); return n && n.t === 'num' ? n.v : at; })();
  const limAt = (dir) => { try { return limit(node, v, atQ, dir).value; } catch { return null; } };
  const on = prop.on ? prop.on.map(num) : [-3, 3];
  const grid = (k = 2000) => Array.from({ length: k + 1 }, (_, i) => on[0] + ((on[1] - on[0]) * i) / k);
  switch (prop.p) {
    case 'definedAt': return Number.isFinite(f(at));
    case 'limitAt': { const L = limAt(); if (L === null) return null; return typeof L !== 'string'; }
    case 'limitIs': { const L = limAt(); if (L === null) return null; return typeof L !== 'string' && Math.abs(F(L) - num(prop.value)) < 1e-6; }
    case 'continuousAt': {
      const y = f(at);
      if (!Number.isFinite(y)) return false;
      const L = limAt();
      if (L === null) return null;
      return typeof L !== 'string' && Math.abs(F(L) - y) < 1e-7 * (1 + Math.abs(y));
    }
    case 'differentiableAt': {
      const y = f(at);
      if (!Number.isFinite(y)) return false;
      const rate = { t: 'frac', n: { t: 'bin', op: '-', l: node, r: { t: 'float', x: y } }, d: { t: 'bin', op: '-', l: { t: 'sym', name: v }, r: { t: 'float', x: at } } };
      let L;
      try { L = limit(rate, v, atQ).value; } catch { return null; }
      if (L === null) return null;
      return typeof L !== 'string';
    }
    case 'boundedOn': {
      // Where f is defined (sin(1/x) is bounded on [−1 ; 1]).
      const ys = grid().map(f).filter(Number.isFinite);
      if (ys.length < 1000) return false;
      const M = Math.max(...ys.map(Math.abs));
      const fine = Math.max(...grid(20000).map(f).filter(Number.isFinite).map(Math.abs));
      if (fine > 5 * M && fine > 1e3) return false;
      return M < 1e6;
    }
    case 'continuousOn': {
      // Defined on the closed interval and no jump between close points.
      const xs = grid(4000);
      const ys = xs.map(f);
      if (ys.some((y) => !Number.isFinite(y))) return false;
      const span = Math.max(...ys) - Math.min(...ys);
      for (let i = 1; i < ys.length; i++) if (Math.abs(ys[i] - ys[i - 1]) > 0.2 * (span + 1)) return false;
      return true;
    }
    case 'positive': return grid().map(f).every((y) => y > 0);
    case 'zeroIn': case 'noZeroIn': {
      const ys = grid(4000).map(f);
      const has = ys.some((y, i) => y === 0 || (i > 0 && Number.isFinite(y) && Number.isFinite(ys[i - 1]) && y * ys[i - 1] < 0 && Math.abs(y - ys[i - 1]) < 1));
      return prop.p === 'zeroIn' ? has : !has;
    }
    default: return null;
  }
}

const SAY = {
  converges: 'converge', diverges: 'diverge', bounded: 'est bornée', unbounded: 'n\'est pas bornée', toZero: 'tend vers 0',
  toInf: 'tend vers +∞', increasing: 'est croissante', decreasing: 'est décroissante', monotone: 'est monotone',
  positive: 'est positive', alternating: 'alterne de signe', seriesConverges: 'donne une série convergente',
  seriesDiverges: 'donne une série divergente', absConverges: 'donne une série absolument convergente', limit: 'a la bonne limite',
  eventuallyConstant: 'est constante à partir d\'un rang',
  definedAt: 'est définie au point', continuousAt: 'est continue au point', limitAt: 'a une limite au point',
  limitIs: 'a la bonne limite', differentiableAt: 'est dérivable au point', boundedOn: 'est bornée sur l\'intervalle',
  continuousOn: 'est continue sur l\'intervalle', zeroIn: 's\'annule sur l\'intervalle', noZeroIn: 'ne s\'annule pas sur l\'intervalle',
};
const say = (prop, who) => prop.say || `${prop.of && prop.of.length > 1 ? prop.of : who} ${SAY[prop.p] ?? prop.p}`;

export function checkSeqFn(counter, answers) {
  const isSeq = counter.kind === 'sequence';
  const v = counter.v || (isSeq ? 'n' : 'x');
  const names = isSeq ? counter.seqs || ['a'] : counter.funcs || ['f'];
  const nodes = {};
  for (const name of names) {
    const raw = String(answers?.[name] ?? '').replace(/^\s*[a-zA-Z](_n|\(x\)|_\(n\))?\s*=/, '');
    const node = tryParse(raw, { vars: [v] });
    if (!node) return { ok: false, message: 'Je n\'arrive pas à lire ta saisie.' };
    const extra = [...symbolsIn(node)].filter((s) => s !== v);
    if (extra.length) return { ok: false, message: `Écris une expression en ${v} seulement.` };
    nodes[name] = node;
  }
  const judge = isSeq ? seqProp : fnProp;
  for (const h of counter.hyp || []) {
    const e = exprOf(counter, h, nodes);
    const r = e ? judge(h, e, counter) : null;
    if (r && r.undefined) return { ok: false, message: 'Ta suite n\'est pas définie pour tous les n.' };
    if (r === null) return { ok: false, message: 'Je n\'arrive pas à décider avec ton exemple : prends-en un plus simple.' };
    if (r === false) return { ok: false, rule: counter.hypRule ?? 'g9_counter_not_hyp', message: `Ton exemple ne vérifie pas l'hypothèse « ${say(h, isSeq ? 'la suite' : 'la fonction')} ».` };
  }
  const e = exprOf(counter, counter.concl, nodes);
  const r = e ? judge(counter.concl, e, counter) : null;
  if (r === null || (r && r.undefined)) return { ok: false, message: 'Je n\'arrive pas à décider avec ton exemple : prends-en un plus simple.' };
  if (r === true) return { ok: false, message: `Avec ton exemple, la conclusion « ${say(counter.concl, isSeq ? 'la suite' : 'la fonction')} » est vraie : ce n'est pas un contre-exemple.` };
  return { ok: true };
}
