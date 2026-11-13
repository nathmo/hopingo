// Traps of module G8, part a (step U4): algebraic form, polar form, Moivre,
// n-th roots, square roots in algebraic form, quadratics with complex
// coefficients. Catalogue: docs/universite/G-gymnase-2.md, G8, « Pièges du
// module ».
//
// transform(prev, ctx) → [{node, ctx}] replays the mistake on the previous
// line; the `complex` judge compares the candidates by value (or by set of
// solutions when ctx.cfg.form is 'set'), `solset` by set (the arguments
// nθ = φ + 2kπ of the n-th roots). Fields read from the judge's cfg: form
// ('exp', 'trig', 'polar': a number written a + bi with a < 0 may be taken
// in the wrong quadrant; 'set': a set of roots), unknown, v.
// g8_sqrt_symbol_complex is a final choice (decision option, mcq option).

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, contains, mapNode, num, sym, lit, mul, cst, neg as negN } from '../ast.js';
import { toText } from '../print.js';
import { exactComplex, evalComplex, CQ, cText, cabs, carg, cpow, C, cadd, cmul } from '../complex.js';
import { polyOf, qCoeffs } from '../polyx.js';
import { Q } from '../../math/rational.js';
import { t } from '../../i18n.js';

const par = (e) => ({ t: 'paren', e });
const isI = (n) => n.t === 'const' && n.name === 'i';

// One candidate per sub-expression matching pred, replaced by fn(node).
function each(prev, pred, fn) {
  const out = [];
  walk(prev, (n, path) => {
    if (pred(n)) {
      let r = null;
      try { r = fn(n); } catch { r = null; }
      for (const x of [].concat(r || [])) out.push({ node: replaceAt(prev, path, par(x.node ?? x)), ctx: x.ctx ?? {} });
    }
    return true;
  });
  return out;
}

// A float complex as a node (re + im·i).
function fnode(z) {
  const re = { t: 'float', x: z.re };
  if (Math.abs(z.im) < 1e-14) return re;
  return { t: 'bin', op: '+', l: re, r: { t: 'bin', op: '×', l: { t: 'float', x: z.im }, r: cst('i') } };
}
const setNode = (zs) => ({ t: 'set', kind: 'finite', items: zs.map(fnode) });
const textOf = (z) => (z instanceof CQ ? cText(z) : cText({ re: Math.round(z.re * 1e4) / 1e4, im: Math.round(z.im * 1e4) / 1e4 }));

// The value of a+bi with i² = +1 (polynomial lines only), or null.
function plusOneValue(node) {
  const n = mapNode(node, (x) => (isI(x) ? sym('j_') : x));
  const p = polyOf(n);
  if (!p || [...p.vars()].some((v) => v !== 'j_')) return null;
  const cs = qCoeffs(p, 'j_');
  if (!cs) return null;
  let re = new Q(0);
  let im = new Q(0);
  cs.forEach((c, k) => { if (k % 2) im = im.add(c); else re = re.add(c); });
  return new CQ(re, im);
}
const hasProductOfI = (n) => contains(n, (x) => (x.t === 'pow' && contains(x.b, isI)) || (x.t === 'bin' && x.op === '×' && contains(x.l, isI) && contains(x.r, isI)));

// The equation (B)^n = w of a set line: {n, w, shift} with z = u + shift
// (B = z − shift), or null.
function powEquation(prev, unknown) {
  const n = stripParen(prev);
  if (n.t !== 'rel' || n.op !== '=') return null;
  const l = stripParen(n.l);
  if (l.t !== 'pow') return null;
  const k = exactComplex(l.e);
  if (!k || !k.isReal() || k.re.d !== 1 || k.re.n < 2 || k.re.n > 12) return null;
  const isU = (x) => x.t === 'sym' && x.name === unknown;
  if (!contains(l.b, isU) || contains(n.r, isU)) return null;
  const w = evalComplex(n.r);
  const at0 = evalComplex(mapNode(l.b, (x) => (isU(x) ? num(0) : x)));
  const at1 = evalComplex(mapNode(l.b, (x) => (isU(x) ? num(1) : x)));
  if (!w || !at0 || !at1 || Math.abs(at1.re - at0.re - 1) > 1e-12 || Math.abs(at1.im - at0.im) > 1e-12) return null;
  return { n: k.re.n, w, shift: C(-at0.re, -at0.im) };
}
// The n roots of u^n = w, k = 0 … n − 1, then shifted.
function rootsOf({ n, w, shift }) {
  const r = cabs(w) ** (1 / n);
  const phi = carg(w);
  return Array.from({ length: n }, (_, k) => cadd(shift, cmul(C(r), C(Math.cos((phi + 2 * k * Math.PI) / n), Math.sin((phi + 2 * k * Math.PI) / n)))));
}
const unknownOf = (ctx) => ctx?.cfg?.unknown || 'z';
const setMode = (ctx) => ctx?.cfg?.form === 'set';

export const RULES = [
  {
    id: 'g8_i_squared', family: 'sign', tag: 'E', skill: 'g8-algebraic', repair: 'g8-algebraic',
    judges: ['complex'],
    name: t('i² remplacé par 1'),
    example: ['−4i² = −4', '−4i² = +4'],
    check: { judge: { kind: 'complex', form: 'algebraic' }, prev: '3-6i+2i-4i^2-1+i', line: '3-6i+2i-4-1+i' },
    transform: (prev, ctx) => {
      if (setMode(ctx)) return [];
      const out = [];
      // Each i^k by i^(k mod 2): i² → 1, i³ → i, i⁴ → 1.
      const pows = (n) => n.t === 'pow' && isI(stripParen(n.b)) && exactComplex(n.e)?.isReal() && exactComplex(n.e).re.d === 1 && exactComplex(n.e).re.n >= 2;
      if (contains(prev, pows)) {
        const node = mapNode(prev, (n) => (pows(n) ? (exactComplex(n.e).re.n % 2 ? cst('i') : num(1)) : n));
        out.push({ node, ctx: { k: 2 } });
      }
      // A whole product expanded with i² = +1.
      if (hasProductOfI(prev)) {
        const top = stripParen(prev);
        let v = null;
        if (top.t === 'frac' || (top.t === 'bin' && top.op === '÷')) {
          const a = plusOneValue(top.t === 'frac' ? top.n : top.l);
          const b = plusOneValue(top.t === 'frac' ? top.d : top.r);
          if (a && b && b.isReal() && !b.isZero()) v = a.div(b);
        } else v = plusOneValue(prev);
        if (v) out.push({ node: v.toNode(), ctx: { k: 2 } });
      }
      return out;
    },
    explain: () => t('i² = −1, pas 1 : par exemple −4i² = −4·(−1) = +4. Et i³ = −i, i⁴ = 1.'),
  },
  {
    id: 'g8_div_componentwise', family: 'rule', tag: 'E', skill: 'g8-algebraic', repair: 'g8-algebraic',
    judges: ['complex'],
    name: t('Division partie par partie'),
    example: ['(4 + 7i)/(2 + i) = 2 + 7i', '(4 + 7i)/(2 + i) = 3 + 2i'],
    check: { judge: { kind: 'complex', form: 'algebraic' }, prev: '(4+7i)/(2+i)', line: '2+7i' },
    // (a + bi)/(c + di) → a/c + (b/d)i.
    transform: (prev, ctx) => {
      if (setMode(ctx)) return [];
      const isDiv = (n) => n.t === 'frac' || (n.t === 'bin' && n.op === '÷');
      return each(prev, isDiv, (n) => {
        const a = exactComplex(n.t === 'frac' ? n.n : n.l);
        const b = exactComplex(n.t === 'frac' ? n.d : n.r);
        if (!a || !b || b.re.n === 0 || b.im.n === 0) return null;
        const v = new CQ(a.re.div(b.re), a.im.div(b.im));
        return { node: v.toNode(), ctx: { num: a, den: b, got: v, back: v.mul(b) } };
      });
    },
    explain: (ctx = {}) => (ctx.den
      ? t('On ne divise pas partie par partie. Contrôle : ({g})({d}) = {b} ≠ {n}. Multiplie en haut et en bas par le conjugué {c}.', { g: cText(ctx.got), d: cText(ctx.den), b: cText(ctx.back), n: cText(ctx.num), c: cText(ctx.den.conj()) })
      : t('On ne divise pas partie par partie : (a + bi)/(c + di) n\'est pas a/c + (b/d)i. Multiplie en haut et en bas par le conjugué c − di.')),
  },
  {
    id: 'g8_modulus_no_square', family: 'rule', tag: 'E', skill: 'g8-algebraic', repair: 'geo-pythagore',
    judges: ['complex'],
    name: t('Module sans les carrés'),
    example: ['|3 + 4i| = 7', '|3 + 4i| = 5'],
    check: { judge: { kind: 'complex', form: 'real' }, prev: '|3+4i|', line: '7' },
    // |a + bi| → |a| + |b|, a + b, √(a + b), √(a² − b²).
    transform: (prev, ctx) => {
      if (setMode(ctx)) return [];
      return each(prev, (n) => n.t === 'abs' || (n.t === 'fn' && n.name === 'abs'), (n) => {
        const z = exactComplex(n.t === 'abs' ? n.e : n.args[0]);
        if (!z || z.re.n === 0 || z.im.n === 0) return null;
        const a = z.re;
        const b = z.im;
        const c = { a, b };
        const qa = (x) => (x.n < 0 ? x.neg() : x);
        const out = [lit(qa(a).add(qa(b))), lit(a.add(b))];
        if (a.add(b).valueOf() > 0) out.push({ t: 'sqrt', e: lit(a.add(b)) });
        const d = a.mul(a).sub(b.mul(b));
        if (d.valueOf() > 0) out.push({ t: 'sqrt', e: lit(d) });
        return out.map((node) => ({ node, ctx: c }));
      });
    },
    explain: (ctx = {}) => {
      if (!ctx.a) return t('Le module est une longueur : par Pythagore, |a + bi| = √(a² + b²), par exemple |3 + 4i| = √(9 + 16) = 5.');
      const s = (x) => (x.n < 0 ? `(${x.toString().replace('-', '−')})` : x.toString());
      const r = ctx.a.mul(ctx.a).add(ctx.b.mul(ctx.b));
      const root = r.sqrt();
      return t('Le module est une longueur : Pythagore donne √({a}² + {b}²) = {v}.', { a: s(ctx.a), b: s(ctx.b), v: `√${r}${root ? ` = ${root}` : ''}` });
    },
  },
  {
    id: 'g8_arg_quadrant', family: 'geometry', tag: 'E', skill: 'g8-polar', repair: 'g8-polar',
    judges: ['complex'],
    name: t('Argument sans correction de quadrant'),
    example: ['arg(−1 + i√3) = −π/3', 'arg(−1 + i√3) = 2π/3'],
    check: { judge: { kind: 'complex', form: 'real', arg: 'principal' }, prev: 'arg(-1+i√3)', line: '-π/3' },
    transform: (prev, ctx) => {
      if (setMode(ctx)) return [];
      const left = (z) => z && z.re < -1e-12 && Math.abs(z.im) > 1e-12;
      const out = [];
      // arg(a + bi) → arctan(b/a) when a < 0.
      out.push(...each(prev, (n) => n.t === 'fn' && n.name === 'arg', (n) => {
        const z = evalComplex(n.args[0]);
        if (!left(z)) return null;
        return { node: { t: 'float', x: Math.atan(z.im / z.re) }, ctx: { z, theta: carg(z) } };
      }));
      // The polar form of a + bi (a < 0) with θ = arctan(b/a): it is −z.
      const form = ctx?.cfg?.form;
      const top = stripParen(prev);
      if (['exp', 'trig', 'polar'].includes(form) && !contains(top, (x) => x.t === 'pow' || x.t === 'fn')) {
        const z = evalComplex(top);
        if (left(z)) out.push({ node: negN(par(top)), ctx: { z, theta: carg(z) } });
      }
      // (a + bi)^n with a < 0 and n odd: the exponential form taken in the
      // wrong quadrant gives (−(a + bi))^n.
      out.push(...each(prev, (n) => n.t === 'pow', (n) => {
        const k = exactComplex(n.e);
        const z = evalComplex(n.b);
        if (!k || !k.isReal() || k.re.d !== 1 || k.re.n % 2 === 0 || !left(z) || contains(n.b, (x) => x.t === 'pow')) return null;
        return { node: { t: 'pow', b: negN(par(n.b)), e: n.e }, ctx: { z, theta: carg(z) } };
      }));
      return out;
    },
    explain: (ctx = {}) => {
      if (!ctx.z) return t('arctan(b/a) donne un angle de ]−π/2 ; π/2[ : quand a < 0, le point est à gauche, dans le 2e ou le 3e quadrant, et θ = arctan(b/a) ± π. Ainsi arg(−1 + i√3) = 2π/3, pas −π/3.');
      const pt = { x: textOf(C(ctx.z.re, 0)), y: textOf(C(ctx.z.im, 0)) };
      return ctx.z.im > 0
        ? t('arctan(b/a) donne un angle de ]−π/2 ; π/2[. Ici a < 0 : le point ({x} ; {y}) est dans le 2e quadrant, donc θ = arctan(b/a) + π. Utilise cos θ = a/r et sin θ = b/r ensemble.', pt)
        : t('arctan(b/a) donne un angle de ]−π/2 ; π/2[. Ici a < 0 : le point ({x} ; {y}) est dans le 3e quadrant, donc θ = arctan(b/a) − π. Utilise cos θ = a/r et sin θ = b/r ensemble.', pt);
    },
  },
  {
    id: 'g8_moivre_modulus', family: 'rule', tag: 'E', skill: 'g8-moivre', repair: 'g8-moivre',
    judges: ['complex'],
    name: t('Module pas élevé à la puissance'),
    example: ['(√2·e^(3iπ/4))¹⁰ = √2·e^(30iπ/4)', '(√2·e^(3iπ/4))¹⁰ = 32·e^(30iπ/4)'],
    check: { judge: { kind: 'complex', form: 'algebraic' }, prev: '(√2e^(3iπ/4))^10', line: '√2e^(30iπ/4)' },
    // z^n → |z|·(z/|z|)^n (module kept) or n|z|·(z/|z|)^n (module times n).
    transform: (prev, ctx) => {
      if (setMode(ctx)) return [];
      const ok = (n) => {
        if (n.t !== 'pow') return false;
        const k = exactComplex(n.e);
        const z = evalComplex(n.b);
        return !!k && k.isReal() && k.re.d === 1 && k.re.n >= 2 && !!z && Math.abs(cabs(z) - 1) > 1e-9 && Math.abs(z.im) > 1e-12;
      };
      const build = (n, times) => {
        const B = par(n.b);
        const unit = { t: 'pow', b: par({ t: 'frac', n: B, d: { t: 'abs', e: B } }), e: n.e };
        const r = times ? mul(par(n.e), { t: 'abs', e: B }) : { t: 'abs', e: B };
        return mul(r, unit);
      };
      const out = [];
      for (const times of [false, true]) {
        const c = each(prev, ok, (n) => ({ node: build(n, times), ctx: { n: toText(n.e), r: cabs(evalComplex(n.b)), times } }));
        out.push(...c);
        // Every power at once (a quotient of two powers).
        if (c.length > 1) out.push({ node: mapNode(prev, (n) => (ok(n) ? par(build(n, times)) : n)), ctx: c[0].ctx });
      }
      return out;
    },
    explain: (ctx = {}) => {
      if (!ctx.n) return t('On élève tout z à la puissance n : (r·e^(iθ))ⁿ = rⁿ·e^(inθ). Le module aussi est élevé à la puissance n.');
      const r = Math.abs(ctx.r - Math.SQRT2) < 1e-9 ? '√2' : textOf(C(ctx.r, 0));
      return ctx.times
        ? t('On élève tout z à la puissance {n} : le module devient ({r})^{n}, pas {n}·{r}. (r·e^(iθ))ⁿ = rⁿ·e^(inθ).', { n: ctx.n, r })
        : t('On élève tout z à la puissance {n} : le module devient ({r})^{n}. (r·e^(iθ))ⁿ = rⁿ·e^(inθ).', { n: ctx.n, r });
    },
  },
  {
    id: 'g8_roots_spacing', family: 'rule', tag: 'E', skill: 'g8-nth-roots', repair: 'g8-nth-roots',
    judges: ['solset'],
    name: t('Racines n-ièmes mal espacées'),
    example: ['3θ = −π/2 + 2kπ ⇔ θ = −π/6 + 2kπ', 'θ = −π/6 + 2kπ/3'],
    check: { judge: { kind: 'solset', v: 'θ', vars: ['θ'], periodic: true }, prev: '3θ=-π/2+2kπ', line: 'θ=-π/6+2kπ' },
    // nθ = φ + 2kπ → θ = φ/n + 2kπ (one root repeated) or θ = φ/n + kπ/n.
    transform: (prev, ctx) => {
      const n = stripParen(prev);
      const v = ctx?.cfg?.v || 'θ';
      if (n.t !== 'rel' || n.op !== '=') return [];
      const l = stripParen(n.l);
      if (!(l.t === 'bin' && l.op === '×' && stripParen(l.r).t === 'sym' && stripParen(l.r).name === v)) return [];
      const k = exactComplex(l.l);
      if (!k || !k.isReal() || k.re.d !== 1 || k.re.n < 2) return [];
      const isK = (x) => x.t === 'sym' && x.name === 'k';
      if (!contains(n.r, isK)) return [];
      const phi = toText(mapNode(n.r, (x) => (isK(x) ? par(num(0)) : x)));
      const deg = k.re.n;
      const P = (t) => parse(t, { vars: [v, 'k'] });
      return [
        { node: P(`${v}=(${phi})/${deg}+2kπ`), ctx: { n: deg } },
        { node: P(`${v}=(${phi})/${deg}+kπ/${deg}`), ctx: { n: deg, half: true } },
      ];
    },
    explain: (ctx = {}) => (ctx.n
      ? (ctx.half
        ? t('Divise tout par {n}, la période aussi : θ = φ/{n} + 2kπ/{n}. Les {n} racines sont espacées de 2π/{n}.', { n: ctx.n })
        : t('Divise tout par {n}, la période aussi : θ = φ/{n} + 2kπ/{n}. Les {n} racines sont espacées de 2π/{n} ; avec + 2kπ, tu retrouves toujours la même racine.', { n: ctx.n }))
      : t('Divise tout par n, la période aussi : θ = φ/n + 2kπ/n. Les racines sont espacées de 2π/n ; avec + 2kπ, tu retrouves n fois la même racine.')),
  },
  {
    id: 'g8_roots_only_one', family: 'method', tag: 'E', skill: 'g8-nth-roots', repair: 'g8-nth-roots',
    judges: ['complex'],
    name: t('Une seule racine n-ième'),
    example: ['z³ = −8i : z = 2i', 'z ∈ {√3 − i ; 2i ; −√3 − i}'],
    check: { judge: { kind: 'complex', form: 'set' }, prev: 'z^3=-8i', line: '{2i}' },
    // A set of n roots → one of them only.
    transform: (prev, ctx) => {
      if (!setMode(ctx)) return [];
      const n = stripParen(prev);
      let roots = null;
      if (n.t === 'set' && n.kind === 'finite' && n.items.length >= 2) roots = n.items.map((x) => evalComplex(x));
      else {
        const eq = powEquation(prev, unknownOf(ctx));
        if (eq) roots = rootsOf(eq);
      }
      if (!roots || roots.some((z) => !z)) return [];
      return roots.map((z) => ({ node: setNode([z]), ctx: { n: roots.length, missing: roots.length - 1 } }));
    },
    explain: (ctx = {}) => (ctx.n
      ? t('Une équation zⁿ = w (w ≠ 0) a n solutions dans ℂ : ici {n}. Il en manque {m}, d\'arguments espacés de 2π/{n}.', { n: ctx.n, m: ctx.missing })
      : t('Une équation zⁿ = w (w ≠ 0) a n solutions dans ℂ, d\'arguments espacés de 2π/n : il en manque.')),
  },
  {
    id: 'g8_sqrt_signs', family: 'sign', tag: 'E', skill: 'g8-sqrt-alg', repair: 'g8-sqrt-alg',
    judges: ['complex'],
    name: t('Signes des racines carrées pris au hasard'),
    example: ['z² = −5 + 12i : z = ±2 ± 3i', 'z = ±(2 + 3i)'],
    check: { judge: { kind: 'complex', form: 'set' }, prev: 'z^2=-5+12i', line: '{2+3i ; 2-3i ; -2+3i ; -2-3i}' },
    // z² = w with roots ±(x + iy): the four sign pairs, or the two pairs
    // with opposite signs.
    transform: (prev, ctx) => {
      if (!setMode(ctx)) return [];
      const eq = powEquation(prev, unknownOf(ctx));
      if (!eq || eq.n !== 2 || cabs(eq.shift) > 1e-12) return [];
      const [z] = rootsOf(eq);
      if (Math.abs(z.re) < 1e-9 || Math.abs(z.im) < 1e-9) return [];
      const c = { x: z.re, y: z.im, w: eq.w };
      return [
        { node: setNode([z, C(-z.re, -z.im), C(z.re, -z.im), C(-z.re, z.im)]), ctx: c },
        { node: setNode([C(z.re, -z.im), C(-z.re, z.im)]), ctx: { ...c, opposite: true } },
      ];
    },
    explain: (ctx = {}) => {
      if (ctx.w === undefined) return t('2xy = b : quand b > 0, x et y ont le même signe ; quand b < 0, des signes contraires. Il reste deux racines opposées, pas quatre.');
      const bad = C(ctx.x, -ctx.y);
      const sq = cpow(bad, C(2));
      const v = { b: textOf(C(ctx.w.im, 0)), z: textOf(bad), z2: textOf(sq), w: textOf(ctx.w) };
      return ctx.w.im > 0
        ? t('2xy = {b} > 0 : x et y ont le même signe. ({z})² = {z2}, ce n\'est pas une racine carrée de {w}.', v)
        : t('2xy = {b} < 0 : x et y ont des signes contraires. ({z})² = {z2}, ce n\'est pas une racine carrée de {w}.', v);
    },
  },
  {
    id: 'g8_sqrt_symbol_complex', family: 'notation', tag: 'E', skill: 'g8-quadratic', repair: 'g8-sqrt-alg',
    judges: [],
    name: t('√ appliqué à un nombre complexe'),
    example: ['√(−8 − 6i) = i√(8 + 6i)', t('δ = 1 − 3i, avec δ² = −8 − 6i')],
    check: { bait: { skill: 'g8-quadratic', level: 2 } },
    explain: () => t('La règle √(−a) = i√a ne vaut que pour a réel positif. Ici Δ n\'est pas réel : √Δ n\'a pas de sens. Cherche δ = x + iy avec δ² = Δ (x² − y² = Re Δ, 2xy = Im Δ, x² + y² = |Δ|).'),
  },
];

