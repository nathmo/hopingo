// Traps of module A1, part j (step U4, spec §7): limits of functions,
// one-sided limits, continuous extension, the ε-δ definition and δ(ε).
// Catalogue: docs/universite/A1-analyse-1.md, « Pièges du module ».
//
// Judge `limit`: a trap replays the mistake on the previous line (a
// remarkable limit without its scale, |u| replaced by u, one side taken for
// the limit) and the judge compares the limits. Fields the generators put
// in the judge's cfg: `otherPiece` (the formula of the other piece of a
// piecewise function, a1_extension_wrong_branch). Judge `logic`: ε and δ
// swapped in the inequalities of a definition. Judge `delta`: cfg.k (the
// factor of |x − x₀| in |f(x) − L|: δ = k·ε instead of ε/k) and cfg.dep
// (a δ written with x, also named through cfg.rules.dependsOnVar).
// The traps a1_bounded_times_zero (a1a.js) and a1_ipe_in_sum (a1c.js),
// defined in step U2, also belong to a1-fn-limits.
// `check`: see js/cas/rules/g9.js.

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, numValue, canonFn, lit } from '../ast.js';
import { toReadable } from '../print.js';
import { limit, targetOf, sameLimit } from '../limit.js';
import { Q } from '../../math/rational.js';
import { lexFor, walkF, replaceF, atomText, atomFromText } from '../logic.js';

const vOf = (ctx) => ctx?.cfg?.v || ctx?.v || 'x';
const par = (e) => ({ t: 'paren', e });
const R = (n) => toReadable(stripParen(n));
const fr = (s) => String(s).replace(/-/g, '−');

// c·vᵖ with a number c ≠ ±1: {c, rest} (rest = vᵖ), or null.
function scaled(node, v) {
  const n = stripParen(node);
  const isPow = (x) => {
    const s = stripParen(x);
    return (s.t === 'sym' && s.name === v) || (s.t === 'pow' && stripParen(s.b).t === 'sym' && stripParen(s.b).name === v && numValue(s.e) !== null);
  };
  if (n.t === 'bin' && n.op === '×') {
    const c = numValue(n.l);
    if (c !== null && isPow(n.r) && !(Math.abs(c.valueOf()) === 1)) return { c, rest: stripParen(n.r) };
  }
  return null;
}

const SCALED_FNS = ['sin', 'tan', 'arctan', 'sinh', 'tanh', 'arcsin', 'cos'];

// Every remarkable function F(c·vᵖ) of a line, with F(vᵖ) in its place.
function unscaled(prev, v) {
  const swaps = [];
  walk(prev, (n, path) => {
    if (n.t === 'fn' && n.args.length === 1 && SCALED_FNS.includes(canonFn(n.name))) {
      const s = scaled(n.args[0], v);
      if (s) swaps.push({ path, repl: { ...n, args: [s.rest] }, c: s.c, F: canonFn(n.name) });
    }
    if (n.t === 'fn' && canonFn(n.name) === 'ln' && n.args.length === 1) {
      const a = stripParen(n.args[0]);
      if (a.t === 'bin' && a.op === '+' && numValue(a.l)?.valueOf() === 1) {
        const s = scaled(a.r, v);
        if (s) swaps.push({ path, repl: { ...n, args: [{ t: 'bin', op: '+', l: a.l, r: s.rest }] }, c: s.c, F: 'ln' });
      }
    }
    if (n.t === 'pow' && stripParen(n.b).t === 'const' && stripParen(n.b).name === 'e') {
      const s = scaled(n.e, v);
      if (s) swaps.push({ path, repl: { ...n, e: par(s.rest) }, c: s.c, F: 'exp' });
    }
    return true;
  });
  return swaps;
}

const SHAPE = {
  sin: (a) => `sin(${a}x)/x → ${a}`, tan: (a) => `tan(${a}x)/x → ${a}`, arctan: (a) => `Arctg(${a}x)/x → ${a}`,
  sinh: (a) => `sinh(${a}x)/x → ${a}`, tanh: (a) => `tanh(${a}x)/x → ${a}`, arcsin: (a) => `Arcsin(${a}x)/x → ${a}`,
  ln: (a) => `Log(1 + ${a}x)/x → ${a}`, exp: (a) => `(e^(${a}x) − 1)/x → ${a}`,
};

// The value of a limit as a node (a float when it is not exact).
function valueNode(r) {
  if (r.value === '+inf') return { t: 'const', name: 'inf' };
  if (r.value === '-inf') return { t: 'neg', e: { t: 'const', name: 'inf' } };
  if (r.value instanceof Q) return lit(r.value);
  return { t: 'float', x: r.value };
}
const sayLim = (r) => {
  if (r.value === '+inf') return '+∞';
  if (r.value === '-inf') return '−∞';
  if (r.value instanceof Q) return fr(r.value.toString());
  if (Math.abs(r.value - Math.PI / 2) < 1e-9) return 'π/2';
  if (Math.abs(r.value + Math.PI / 2) < 1e-9) return '−π/2';
  return fr(String(Math.round(r.value * 1e4) / 1e4).replace('.', ','));
};

// Swaps ε and δ in a text.
const swapED = (t) => t.replace(/[εδ]/g, (c) => (c === 'ε' ? 'δ' : 'ε'));

export const RULES = [
  {
    id: 'a1_remarkable_limit_scale', family: 'rule', tag: 'E', skill: 'a1-fn-limits', repair: 'a1-fn-limits', judges: ['limit'],
    name: 'Limite remarquable sans le facteur de l\'argument',
    example: ['sin(3x)/x → 1', 'sin(3x)/x = 3·sin(3x)/(3x) → 3'],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: 'sin(3x)/x', line: '1' },
    transform: (prev, ctx) => {
      const v = vOf(ctx);
      const swaps = unscaled(prev, v);
      const out = swaps.map((w) => ({ node: replaceAt(prev, w.path, w.repl), ctx: { a: fr(w.c.toString()), F: w.F } }));
      if (swaps.length > 1) {
        let all = prev;
        for (const w of swaps.slice().reverse()) all = replaceAt(all, w.path, w.repl);
        out.push({ node: all, ctx: { a: fr(swaps[0].c.toString()), F: swaps[0].F } });
      }
      return out;
    },
    explain: (ctx = {}) => {
      if (!ctx.a) return 'sin(u)/u → 1 seulement si le haut et le bas ont le même u : sin(3x)/x = 3·sin(3x)/(3x) → 3. Fais apparaître le facteur de l\'argument.';
      if (ctx.F === 'cos') return `(1 − cos u)/u² → 1/2 avec u = ${ctx.a}x : (1 − cos(${ctx.a}x))/x² = (${ctx.a}x)²/x² · (1 − cos(${ctx.a}x))/(${ctx.a}x)² → ${ctx.a}²/2. Le facteur ${ctx.a}² ne disparaît pas.`;
      const shape = SHAPE[ctx.F] ? ` : ${SHAPE[ctx.F](ctx.a)}` : '';
      return `La limite remarquable demande le même argument en haut et en bas. Avec u = ${ctx.a}x, on multiplie et divise par ${ctx.a}${shape}, pas 1.`;
    },
  },
  {
    id: 'a1_onesided_ignored', family: 'method', tag: 'E', skill: 'a1-fn-onesided', repair: 'a1-fn-onesided', judges: ['limit'],
    name: 'Une seule limite latérale donnée comme limite',
    example: ['lim e^(1/x) en 0 = 0 (vu à gauche)', 'à gauche 0, à droite +∞ : pas de limite en 0'],
    check: { judge: { kind: 'limit', v: 'x', to: '0' }, prev: 'e^(1/x)', line: '0' },
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (cfg.dir || cfg.discrete) return [];
      const t = targetOf(parse(String(cfg.to ?? '0')));
      if (t.dir || typeof t.to === 'string' || t.to === null) return [];
      const v = vOf(ctx);
      const right = limit(prev, v, t.to, '+');
      const left = limit(prev, v, t.to, '-');
      if (right.value === null || left.value === null || right.value === 'none' || left.value === 'none') return [];
      if (sameLimit(right, left)) return [];
      const c = { right: sayLim(right), left: sayLim(left) };
      return [{ node: valueNode(right), ctx: c }, { node: valueNode(left), ctx: c }];
    },
    explain: (ctx = {}) => (ctx.right
      ? `À droite la limite vaut ${ctx.right}, à gauche ${ctx.left} : les deux côtés diffèrent, donc la limite n'existe pas.`
      : 'La limite existe seulement si les limites à gauche et à droite existent et sont égales. En 0⁻, 1/x → −∞ et e^(1/x) → 0, alors qu\'en 0⁺, e^(1/x) → +∞ : les deux côtés diffèrent.'),
  },
  {
    id: 'a1_abs_removed', family: 'sign', tag: 'E', skill: 'a1-fn-onesided', repair: 'a1-fn-onesided', judges: ['limit'],
    name: 'Valeur absolue enlevée sans regarder le signe',
    example: ['|x − 2| = x − 2 pour x < 2', '|x − 2| = −(x − 2) pour x < 2'],
    check: { judge: { kind: 'limit', v: 'x', to: '2', dir: '-' }, prev: '(x^2-4)/abs(x-2)', line: '4' },
    transform: (prev) => {
      const swaps = [];
      walk(prev, (n, path) => {
        if (n.t === 'abs') swaps.push({ path, repl: par(n.e), u: R(n.e) });
        return true;
      });
      const out = swaps.map((w) => ({ node: replaceAt(prev, w.path, w.repl), ctx: { u: w.u } }));
      if (swaps.length > 1) {
        let all = prev;
        for (const w of swaps.slice().reverse()) all = replaceAt(all, w.path, w.repl);
        out.push({ node: all, ctx: { u: swaps[0].u } });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.u
      ? `|${ctx.u}| = ${ctx.u} seulement là où ${ctx.u} ≥ 0. Du côté où ${ctx.u} < 0, |${ctx.u}| = −(${ctx.u}).`
      : 'Pour x < 2, x − 2 < 0, donc |x − 2| = −(x − 2) : on enlève la valeur absolue en regardant le signe de chaque côté.'),
  },
  {
    id: 'a1_extension_wrong_branch', family: 'rule', tag: 'E', skill: 'a1-fn-extension', repair: 'a1-fn-extension', judges: ['limit'],
    name: 'Limite latérale prise avec le mauvais morceau',
    example: ['limite à gauche de 3 avec le morceau de x > 3', 'à gauche de 3, le morceau de x < 3'],
    check: { judge: { kind: 'limit', v: 'x', to: '3', dir: '-', otherPiece: '(x+3)/x', at: '3' }, prev: 'x^2+1', line: '2' },
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      if (!cfg.otherPiece) return [];
      const v = vOf(ctx);
      const side = cfg.dir === '+' ? 'droite' : 'gauche';
      return [{ node: parse(String(cfg.otherPiece), { vars: [v] }), ctx: { c: fr(cfg.at ?? cfg.to), side, g: R(prev) } }];
    },
    explain: (ctx = {}) => (ctx.c
      ? `À ${ctx.side} de ${ctx.c}, c'est ${ctx.g} qui définit f : chaque limite latérale se calcule avec le morceau de son côté.`
      : 'Chaque limite latérale se calcule avec le morceau de f de ce côté-là : à gauche de c, le morceau défini pour x < c.'),
  },
  {
    id: 'a1_epsdelta_swapped', family: 'notation', tag: 'E', skill: 'a1-fn-epsdelta-def', repair: 'a1-fn-epsdelta-def', judges: ['logic'],
    name: 'ε et δ échangés dans la définition',
    example: ['|x − x₀| ≤ ε ⇒ |f(x) − L| ≤ δ', '|x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε'],
    check: {
      judge: { kind: 'logic', pieces: [{ text: 'ε > 0' }, { text: 'δ > 0' }, { text: 'x ∈ D' }, { text: '|x − x₀| ≤ δ' }, { text: '|f(x) − L| ≤ ε' }, { text: '|x − x₀| ≤ ε' }, { text: '|f(x) − L| ≤ δ' }] },
      prev: '∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ δ ⇒ |f(x) − L| ≤ ε',
      line: '∀ε > 0 ∃δ > 0 ∀x ∈ D, |x − x₀| ≤ ε ⇒ |f(x) − L| ≤ δ',
    },
    transform: (prev, ctx) => {
      const lex = lexFor(ctx?.cfg || {});
      let node = prev;
      let hit = false;
      const paths = [];
      walkF(prev, (n, path) => { if (n.t === 'atom' && /[εδ]/.test(atomText(n, lex))) paths.push({ n, path }); return true; });
      for (const { n, path } of paths) {
        const text = atomText({ ...n, neg: false }, lex);
        const a = atomFromText(swapED(text), lex);
        if (!a) continue;
        node = replaceF(node, path, { t: 'atom', key: a.key, neg: n.neg ? !a.neg : a.neg });
        hit = true;
      }
      return hit ? [{ node, ctx: {} }] : [];
    },
    explain: () => 'ε mesure l\'écart des valeurs, |f(x) − L| ≤ ε ; δ mesure l\'écart des x, |x − x₀| ≤ δ. On se donne ε, puis on cherche δ.',
  },
  {
    id: 'a1_delta_depends_on_x', family: 'logic', tag: 'E', skill: 'a1-fn-epsdelta', repair: 'a1-fn-epsdelta-def', judges: ['delta'],
    name: 'δ qui dépend de x',
    example: ['δ = ε/|x + 3|', 'δ = min(1 ; ε/7)'],
    check: { judge: { kind: 'delta', mode: 'delta', f: 'x^2', a: '3', L: '9', rules: { dependsOnVar: 'a1_delta_depends_on_x' } }, prev: 'δ', line: 'ε/abs(x+3)' },
    transform: (prev, ctx) => {
      const dep = ctx?.cfg?.dep;
      return dep ? [{ node: parse(String(dep), { vars: ['ε', 'x'] }), ctx: {} }] : [];
    },
    explain: () => 'δ se choisit avant x : il ne peut dépendre que de ε (et de x₀). Borne d\'abord l\'autre facteur en imposant |x − x₀| ≤ 1, puis prends δ = min(1 ; ε/M).',
  },
  {
    id: 'a1_delta_inverted', family: 'rule', tag: 'E', skill: 'a1-fn-epsdelta', repair: 'a1-fn-epsdelta', judges: ['delta'],
    name: 'δ = k·ε au lieu de ε/k',
    example: ['|f(x) − 7| = 4|x + 1| : δ = 4ε', 'δ = ε/4'],
    check: { judge: { kind: 'delta', mode: 'delta', f: '3-4x', a: '-1', L: '7', k: '4' }, prev: 'δ', line: '4ε' },
    transform: (prev, ctx) => {
      const k = ctx?.cfg?.k;
      if (!k) return [];
      const P = (t) => parse(t, { vars: ['ε'] });
      const c = { a: fr(k) };
      return [
        { node: P(`(${k})ε`), ctx: c },
        { node: P(`min(1 ; (${k})ε)`), ctx: c },
        { node: P(`ε/(${k})`), ctx: c },
      ];
    },
    explain: (ctx = {}) => (ctx.a
      ? `|f(x) − L| = ${ctx.a}·|x − x₀| : avec δ = ${ctx.a}ε, cet écart peut valoir ${ctx.a}·${ctx.a}ε, plus que ε. Il faut ${ctx.a}·δ ≤ ε, donc δ = ε/${ctx.a}.`
      : 'Si |f(x) − L| = k·|x − x₀|, il faut k·δ ≤ ε : δ = ε/k, pas k·ε.'),
  },
];
