// Judge `delta` (spec §5.2 and §16.2, step U4): the δ(ε) of a limit proved
// by the definition, the N(ε) of a sequence, or the x(ε) that proves
// s = Sup A. The line is « δ = … » (or only the expression), in ε alone.
//
// cfg: {mode, f, a, L, v?, side?, big?, set?, s?, inf?, index?, rules?}
//   mode 'delta'  f (text in v, 'x' by default), a, L: for every sampled ε,
//                 δ(ε) > 0 and |f(x) − L| ≤ ε whenever 0 < |x − a| ≤ δ(ε)
//                 (x in the domain of f; side '+' or '-': one side only).
//                 The x are a dense grid of ]a − δ ; a + δ[ and its ends,
//                 so affine and quadratic f (maximum at an end or at the
//                 vertex) are checked as on the whole interval.
//   mode 'N'      f a sequence in v ('n' by default), L: for every sampled
//                 ε, |f(n) − L| ≤ ε for every whole n ≥ N(ε) (n from N to
//                 N + 2000, then N·2ᵏ up to 10⁹).
//   mode 'sup'    s and either set (an interval or a set the core reads,
//                 '[0 ; 3[') or index ({term: '3-2/n', v: 'n', from: 1}).
//                 With set: x(ε) ∈ A and x(ε) > s − ε (x(ε) < s + ε with
//                 inf: true). With index: the line gives a threshold n(ε),
//                 and every term of index n ≥ n(ε) (n ≥ from) is > s − ε.
//   ε is sampled in ]0 ; 1] (1 … 10⁻⁴), and also at 2, 5 and 20 unless
//   big: false (a δ without min(1 ; …) fails there for x²). δ may use
//   min(… ; …) and max(… ; …).
//   rules: {dependsOnVar} the trap named when δ depends on x (or N on n).
// Final form: a valid line in ε alone is `done`.
// deltaCheck(cfg, node | text) → {ok, message?, witness?} for blocks inputs.

import { parse } from '../cas/parse.js';
import { stripParen, symbolsIn } from '../cas/ast.js';
import { compileFloat, evalFloat } from '../cas/numeric.js';
import { solutionSet, contains01 } from '../cas/sets.js';
import { frNum } from './common.js';
import { diagnoseLine } from './diagnose.js';
import { t as tr } from '../i18n.js';

export const sign = '=';
const EPS = 'ε';
const SMALL = [1, 0.7, 0.5, 0.3, 0.2, 0.1, 0.05, 0.02, 0.01, 0.003, 0.001, 1e-4];
const BIG = [2, 5, 20];

const vOf = (cfg) => cfg.v || (cfg.mode === 'N' ? 'n' : cfg.index?.v || 'x');
const LEFT = { delta: 'δ', N: 'N', sup: 'x' };

export function parseLine(cfg, text) {
  const t = String(text).replace(/^\s*=/, '');
  const node = parse(t, { vars: [EPS, vOf(cfg), 'δ', 'N', 'x', 'n'] });
  return stripLeft(node);
}

// « δ = ε/4 » → ε/4 ; a bare letter (the start line δ) stays.
function stripLeft(node) {
  const n = stripParen(node);
  if (n.t === 'rel' && n.op === '=' && stripParen(n.l).t === 'sym') return n.r;
  return node;
}

export const start = (cfg) => cfg.start || LEFT[cfg.mode] || 'δ';

const cache = new Map();
function compiled(text, v) {
  const key = `${v}|${text}`;
  if (!cache.has(key)) cache.set(key, compileFloat(parse(String(text), { vars: [v] })));
  return cache.get(key);
}
const num = (text) => {
  if (text === '+inf' || text === '+∞' || text === '∞') return Infinity;
  return evalFloat(parse(String(text)), {});
};
const say = (x) => (Math.abs(x) < 0.01 && x !== 0 ? x.toPrecision(2).replace('.', ',') : frNum(x, 3));

function epsSamples(cfg) {
  return cfg.mode === 'N' || cfg.big === false ? SMALL : [...SMALL, ...BIG];
}

// The first failure of the line, or null.
function failure(cfg, node) {
  const v = vOf(cfg);
  const g = compileFloat(node);
  for (const eps of epsSamples(cfg)) {
    const d = g({ [EPS]: eps });
    if (cfg.mode === 'delta') {
      if (!(d > 0) || !Number.isFinite(d)) return { eps, message: tr('Pour ε = {eps}, ton δ vaut {d} : il faut δ > 0.', { eps: say(eps), d: Number.isFinite(d) ? say(d) : tr('rien') }) };
      const f = compiled(cfg.f, v);
      const a = num(cfg.a);
      const L = num(cfg.L);
      const sides = cfg.side === '+' ? [1] : cfg.side === '-' ? [-1] : [-1, 1];
      for (const s of sides) {
        for (let k = 1; k <= 400; k++) {
          const t = k === 400 ? 1 : k / 400;
          const x = a + s * d * t;
          const y = f({ [v]: x });
          if (!Number.isFinite(y)) continue;
          if (Math.abs(y - L) > eps * (1 + 1e-9) + 1e-12) {
            return { eps, x, message: tr('Pour ε = {eps}, ton δ vaut {d} ; mais en {v} = {x}, |f({v}) − {L}| = {y} > ε.', { eps: say(eps), d: say(d), v, x: say(x), L: frNum(L, 3), y: say(Math.abs(y - L)) }) };
          }
        }
      }
    } else if (cfg.mode === 'N' || (cfg.mode === 'sup' && cfg.index)) {
      if (!Number.isFinite(d)) return { eps, message: tr('Pour ε = {eps}, ton {who} n\'est pas un nombre.', { eps: say(eps), who: cfg.mode === 'N' ? 'N' : 'n' }) };
      const term = cfg.mode === 'N' ? cfg.f : cfg.index.term;
      const f = compiled(term, v);
      const L = cfg.mode === 'N' ? num(cfg.L) : num(cfg.s);
      const from = cfg.mode === 'N' ? (cfg.from ?? 0) : (cfg.index.from ?? 1);
      const n0 = Math.max(from, Math.ceil(d - 1e-9));
      if (n0 > 1e12) return { eps, message: tr('Pour ε = {eps}, ton seuil est trop grand pour être vérifié : prends plus simple.', { eps: say(eps) }) };
      const ns = [];
      for (let k = 0; k <= 2000; k++) ns.push(n0 + k);
      for (let m = 2; n0 * m < 1e9; m *= 2) ns.push(n0 * m);
      for (const n of ns) {
        const y = f({ [v]: n });
        if (!Number.isFinite(y)) continue;
        const bad = cfg.mode === 'N' ? Math.abs(y - L) > eps * (1 + 1e-9) + 1e-12
          : cfg.inf ? !(y < L + eps) : !(y > L - eps);
        if (bad) {
          const vars = { eps: say(eps), d: say(d), v, n };
          const message = cfg.mode === 'N' ? tr('Pour ε = {eps}, ton seuil vaut {d} ; mais pour {v} = {n}, |a_{v} − {L}| = {y} > ε.', { ...vars, L: frNum(L, 3), y: say(Math.abs(y - L)) })
            : cfg.inf ? tr('Pour ε = {eps}, ton seuil vaut {d} ; mais pour {v} = {n}, le terme vaut {y}, pas < {b}.', { ...vars, y: say(y), b: say(L + eps) })
              : tr('Pour ε = {eps}, ton seuil vaut {d} ; mais pour {v} = {n}, le terme vaut {y}, pas > {b}.', { ...vars, y: say(y), b: say(L - eps) });
          return { eps, n, message };
        }
      }
    } else if (cfg.mode === 'sup') {
      if (!Number.isFinite(d)) return { eps, message: tr('Pour ε = {eps}, ton x n\'est pas un nombre.', { eps: say(eps) }) };
      const A = setOf(cfg.set);
      if (!contains01(A, d)) return { eps, message: tr('Pour ε = {eps}, ton x vaut {d} : il n\'est pas dans A.', { eps: say(eps), d: say(d) }) };
      const s = num(cfg.s);
      if (cfg.inf ? !(d < s + eps) : !(d > s - eps)) return { eps, message: cfg.inf ? tr('Pour ε = {eps}, ton x vaut {d} : il n\'est pas < s + ε = {b}.', { eps: say(eps), d: say(d), b: say(s + eps) }) : tr('Pour ε = {eps}, ton x vaut {d} : il n\'est pas > s − ε = {b}.', { eps: say(eps), d: say(d), b: say(s - eps) }) };
    }
  }
  return null;
}

const SETS = new Map();
function setOf(text) {
  if (!SETS.has(text)) SETS.set(text, solutionSet(parse(text), { v: 'x' }));
  return SETS.get(text);
}

const LETTER = { delta: 'δ', N: 'N', sup: 'x' };

export function deltaCheck(cfg, input) {
  let node = input;
  if (typeof input !== 'object') {
    try { node = parseLine(cfg, input); } catch (e) { return { ok: false, parse: true, message: e.message }; }
  }
  const v = vOf(cfg);
  const syms = [...symbolsIn(node)];
  if (syms.includes(v) || syms.some((s) => s !== EPS)) {
    const who = cfg.mode === 'sup' && cfg.index ? 'n' : LETTER[cfg.mode];
    return { ok: false, rule: cfg.rules?.dependsOnVar ?? null, depends: true, message: tr('{who} ne peut dépendre que de ε : il est choisi avant {v}.', { who, v }) };
  }
  const f = failure(cfg, node);
  return f ? { ok: false, ...f } : { ok: true };
}

export function isFinal(cfg, node) {
  const syms = [...symbolsIn(node)];
  return syms.every((s) => s === EPS);
}

// Two lines that give the same function of ε (to name a trap).
function sameDelta(a, b) {
  const fa = compileFloat(a);
  const fb = compileFloat(b);
  return SMALL.every((e) => {
    const x = fa({ [EPS]: e });
    const y = fb({ [EPS]: e });
    return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) <= 1e-9 * (1 + Math.abs(x) + Math.abs(y));
  });
}

export function judgeLine(cfg, prev, input, state = {}) {
  let node;
  if (input && typeof input === 'object') node = stripLeft(input);
  else {
    try { node = parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
  }
  const s = stripParen(node);
  if (s.t === 'sym' && ['δ', 'N', 'x', 'n'].includes(s.name)) return { kind: 'same', node, message: tr('Écris la valeur, en fonction de ε.') };
  const r = deltaCheck(cfg, node);
  if (r.ok) { state.lines = (state.lines || 0) + 1; return { kind: 'done', node }; }
  if (r.depends) return { kind: 'wrong', node, rule: r.rule, diag: r.rule ? { rules: [r.rule], ambiguous: 1, ctx: {} } : null, message: r.message };
  const diag = diagnoseLine('delta', prev, node, cfg, sameDelta);
  return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: r, message: r.message };
}
