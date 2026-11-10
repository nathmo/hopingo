// a2-ode-separable (module A2, part h, step U6): y′ = g(x)·h(y). Parts: the
// constant solutions (h(y) = 0, judge `solset` in y), the partial fractions
// of 1/(a² − y²) (`equiv`), then the `ode` judge: separated line, the
// integrated relation H(y) = G(x) + C, the constant from y(0) = y₀, y
// isolated. 15 % of the items start on a zero of h: the answer is the
// constant solution (trap a2_ode_sep_lost_constant).

import { MT, linesItem, examTag } from './kit.js';
import { partsScript, tpl, sup } from './a2-kit.js';
import { q, qt, sumT, polyT, scaleP, fac, rd, H, E, modeOf, mcq4, opt, tfOf } from './analyse2-h-kit.js';
import { parse } from '../../cas/parse.js';
import { evalFloat } from '../../cas/numeric.js';

const SK = 'a2-ode-separable';
const SUB = [
  { id: 'constant-sol', label: 'solutions constantes', skill: SK },
  { id: 'separate', label: 'séparer les variables', skill: SK },
  { id: 'partial-frac', label: 'éléments simples', skill: 'a1-int-rational' },
  { id: 'integrate', label: 'intégrer des deux côtés', skill: 'a1-int-direct' },
  { id: 'ic', label: 'condition initiale', skill: SK },
  { id: 'solve', label: 'isoler y', skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// ---------- g(x): its text in y′ = g·h, in the dx side, and its primitive ----------
// P: [c, mono] pairs; mono(0) = 1 for e^x, 0 otherwise.
const MONO = { x: (x) => x, 'x^2': (x) => x * x, 'x^3': (x) => x ** 3, 'x^6': (x) => x ** 6, 'e^x': (x) => Math.exp(x), 'sin(x)': (x) => Math.sin(x) };
function gData(rng) {
  const kind = rng.pick(['c', 'c', 'cx', 'cx', 'x2', 'x5', 'exp', 'cos', 'aff']);
  if (kind === 'c') { const c = rng.pick([1, 2, 3]); return { kind, g: c === 1 ? '' : String(c), dx: String(c), P: [[c, 'x']] }; }
  if (kind === 'cx') { const c = rng.pick([1, 2, 4]); return { kind, g: `${fac(c)}x`, dx: `${fac(c)}x`, P: [[q(c, 2), 'x^2']] }; }
  if (kind === 'x2') return { kind, g: '3x^2', dx: '3x^2', P: [[1, 'x^3']] };
  if (kind === 'x5') return { kind, g: '6x^5', dx: '6x^5', P: [[1, 'x^6']] };
  if (kind === 'exp') return { kind, g: 'e^x', dx: 'e^x', P: [[1, 'e^x']] };
  if (kind === 'cos') return { kind, g: 'cos(x)', dx: 'cos(x)', P: [[1, 'sin(x)']] };
  const a = rng.pick([1, 2]);
  return { kind, g: a === 1 ? '(1+x)' : '((2+x)/2)', dx: a === 1 ? '(1+x)' : '((2+x)/2)', P: [[1, 'x'], [q(1, 2 * a), 'x^2']] };
}
const P0 = (P) => P.reduce((s, [c, m]) => (m === 'e^x' ? s.add(q(c)) : s), q(0));
const Pnum = (P, x) => P.reduce((s, [c, m]) => s + Number(q(c)) * MONO[m](x), 0);
// P − P(0) written out.
const Pshift = (P) => sumT([polyT(P), P0(P).n ? qt(P0(P).neg()) : '']);

// g·h as text: 2y, 2x y, 3x^2 (1+y^2), e^x×y, cos(x)×(9-y^2).
// h(y) readable: 9 − y², 1 + y², e^(−y).
const hR = (h) => sup(h).replace(/([\w²)])([+−])/g, '$1 $2 ');
const mulT = (g, h) => (!g ? h : /^[\d(]/.test(g) || /^\d*x(\^\d)?$/.test(g) ? `${g} ${h}` : `${g}×${h}`);

// ---------- h(y): the families ----------
// Each returns the texts of the lines and the solution as a function.
const ATAN = { 0: '0', 1: 'π/4', '-1': '-π/4' };
function family(kind, g, y0, a) {
  const P = g.P;
  const p0 = P0(P);
  const PT = polyT(P);
  const eqOf = (hT) => (g.kind === 'exp' && kind === 'exp' ? "y'=e^(x-y)" : `y'=${mulT(g.g, hT)}`);
  const dxT = (g.dx === '1' ? 'dx' : `${g.dx} dx`);
  if (kind === 'lin') {
    const C = sumT([Math.abs(y0) > 1 ? `ln(${Math.abs(y0)})` : '', p0.n ? qt(p0.neg()) : '']);
    return {
      h: 'y', eq: eqOf('y'), zeros: 'y = 0', sep: `dy/y = ${dxT}`, int: `int(1/y,y) = int(${g.dx},x)`,
      rel: `ln(|y|) = ${PT} + C`, C, mid: null,
      y: `${fac(y0)}e^(${Pshift(P)})`, f: (x) => y0 * Math.exp(Pnum(P, x) - Number(p0)),
      prim: 'ln|y|', yRange: y0 > 0 ? [0.05, 8] : [-8, -0.05],
    };
  }
  if (kind === 'sq') {
    const K = y0 ? q(1).div(q(y0)).add(p0) : q(0);
    return {
      h: 'y^2', eq: eqOf('y^2'), zeros: 'y = 0', sep: `dy/y^2 = ${dxT}`, int: `int(1/y^2,y) = int(${g.dx},x)`,
      rel: `-1/y = ${PT} + C`, C: qt(K.neg()), mid: null,
      y: `1/(${sumT([qt(K), polyT(scaleP(P, -1))])})`, f: (x) => 1 / (Number(K) - Pnum(P, x)),
      prim: '−1/y', yRange: y0 > 0 ? [0.05, 8] : [-8, -0.05],
    };
  }
  if (kind === 'atan') {
    const C = sumT([ATAN[y0], p0.n ? qt(p0.neg()) : '']);
    const shift = Math.atan(y0) - Number(p0);
    return {
      h: '1+y^2', eq: eqOf('(1+y^2)'), zeros: '∅', sep: `dy/(1+y^2) = ${dxT}`, int: `int(1/(1+y^2),y) = int(${g.dx},x)`,
      rel: `arctan(y) = ${PT} + C`, C, mid: null,
      y: `tan(${sumT([PT, C])})`, f: (x) => Math.tan(Pnum(P, x) + shift), arg: (x) => Pnum(P, x) + shift,
      prim: 'arctan y', yRange: [-6, 6],
    };
  }
  if (kind === 'th') {
    const Ex = sumT([polyT(scaleP(P, 2 * a)), p0.n ? qt(p0.mul(-2 * a)) : '']);
    return {
      h: `${a * a}-y^2`, eq: eqOf(`(${a * a}-y^2)`), zeros: `y = ${a} ou y = -${a}`, sep: `dy/(${a * a}-y^2) = ${dxT}`, int: `int(1/(${a * a}-y^2),y) = int(${g.dx},x)`,
      pf: { start: `1/(${a * a}-y^2)`, line: `(1/${2 * a})(1/(${a}-y)+1/(${a}+y))` },
      rel: `(1/${2 * a})ln(|(${a}+y)/(${a}-y)|) = ${PT} + C`, C: qt(p0.neg()),
      mid: `(${a}+y)/(${a}-y) = e^(${Ex})`,
      y: `${a === 1 ? '' : a}(e^(${Ex})-1)/(e^(${Ex})+1)`, f: (x) => a * Math.tanh(a * (Pnum(P, x) - Number(p0))),
      wrongMid: `(${a}+y)/(${a}-y) = -e^(${Ex})`, prim: `(1/${2 * a}) ln|(${a} + y)/(${a} − y)|`, yRange: [-a + 0.02, a - 0.02], a,
    };
  }
  // exp: h = e^(−y)
  const e0 = y0 === 0 ? q(1) : q(2);
  const C = qt(e0.sub(p0));
  return {
    h: 'e^(-y)', eq: eqOf('e^(-y)'), zeros: '∅', sep: `e^y dy = ${dxT}`, int: `int(e^y,y) = int(${g.dx},x)`,
    rel: `e^y = ${PT} + C`, C, mid: null,
    y: `ln(${sumT([PT, C])})`, f: (x) => Math.log(Pnum(P, x) + Number(e0) - Number(p0)),
    prim: 'e^y', yRange: [-4, 4], y0Text: y0 === 0 ? '0' : 'ln(2)',
  };
}

const DOMAINS = [[-1, 1], [-0.5, 0.5], [0, 1], [-1, 0], [0, 0.5], [-0.25, 0.25]];
function domainOf(F) {
  for (const [lo, hi] of DOMAINS) {
    let ok = true;
    for (let i = 0; i <= 60 && ok; i++) {
      const x = lo + ((hi - lo) * i) / 60;
      const y = F.f(x);
      if (!Number.isFinite(y) || Math.abs(y) > 30 || y < F.yRange[0] || y > F.yRange[1]) ok = false;
      if (F.arg && Math.abs(F.arg(x)) > 1.45) ok = false;
    }
    if (ok) return [lo, hi];
  }
  return null;
}

function data(rng) {
  for (let i = 0; i < 200; i++) {
    const constant = rng.chance(0.15);
    const g = gData(rng);
    const kind = constant ? rng.pick(['lin', 'sq', 'th']) : rng.pick(['lin', 'lin', 'sq', 'atan', 'th', 'th', 'exp']);
    const a = rng.pick([1, 2, 3]);
    let y0;
    if (constant) y0 = kind === 'th' ? rng.pick([a, -a]) : 0;
    else y0 = kind === 'lin' ? rng.pick([1, 2, 3, -1, -2]) : kind === 'sq' ? rng.pick([1, 2, -1, -2]) : kind === 'atan' ? rng.pick([0, 0, 1, -1]) : kind === 'exp' ? rng.pick([0, 0, 1]) : 0;
    if (kind === 'exp' && g.kind === 'x5') continue;
    const F = family(kind, g, kind === 'exp' && y0 === 1 ? 'ln2' : y0, a);
    if (kind === 'exp' && y0 === 1) { F.y0Text = 'ln(2)'; }
    if (constant) return { kind, g, y0, a, F, constant, domain: [-1, 1] };
    const domain = domainOf(F);
    if (!domain) continue;
    return { kind, g, y0, a, F, constant, domain };
  }
  const g = { kind: 'c', g: '', dx: '1', P: [[1, 'x']] };
  return { kind: 'lin', g, y0: 1, a: 1, F: family('lin', g, 1, 1), constant: false, domain: [-1, 1], fallback: true };
}

const CHOICES = [
  { id: 'zeros', label: 'Chercher les zéros de h(y) : solutions constantes' },
  { id: 'pf', label: 'Décomposer en éléments simples' },
  { id: 'sep', label: 'Séparer : les y d\'un côté, les x de l\'autre' },
  { id: 'int', label: 'Intégrer des deux côtés (une seule constante)' },
  { id: 'ic', label: 'Appliquer la condition initiale' },
  { id: 'solve', label: 'Isoler y' },
  { id: 'twoC', label: 'Intégrer avec une constante de chaque côté', why: 'Deux constantes C₁ et C₂ se regroupent en une seule : C = C₂ − C₁.' },
];

function linesVariant(level, rng, opts) {
  const d = data(rng);
  const { F, g, y0, constant } = d;
  const y0T = F.y0Text ?? String(y0);
  const ode = {
    kind: 'ode', eq: F.eq, unknown: 'y', v: 'x', order: 1, ic: { x: 0, y: y0T }, domain: { x: d.domain }, yRange: F.yRange,
    traps: F.wrongMid ? { a2_ode_sign_abs: [{ line: F.wrongMid, ctx: { E: `(${d.a}+y)/(${d.a}-y)` } }] } : {},
  };
  const parts = [];
  const divide = {
    kind: 'decision', prompt: `Avant de diviser par h(y) = ${hR(F.h)}, que faut-il faire ?`, options: [
      { id: 'zeros', label: 'Chercher les zéros de h : ce sont des solutions constantes', valid: true },
      { id: 'none', label: 'Rien : on divise directement', valid: false, rule: 'a2_ode_sep_lost_constant', why: 'Diviser par h(y) perd les solutions où h(y) = 0 : ce sont des solutions constantes, parfois la seule qui vérifie la condition initiale.' },
    ],
  };
  const zerosNote = { kind: 'note', html: `h(y) = y s'annule en y = 0 : y ≡ 0 est une solution constante.${constant ? '' : ` Ici y(0) = ${rd(y0T)} ≠ 0.`}` };
  const pre = F.h === 'y' ? [...(level === 2 || level === 3 ? [divide] : []), zerosNote] : [];
  if ((level >= 2 || constant) && F.h !== 'y') {
    parts.push({
      html: 'Solutions constantes : les zéros de h.', ask: 'h(y) = 0 :', start: `${F.h} = 0`, judge: { kind: 'solset', v: 'y' },
      pre: level === 2 || level === 3 ? [divide] : [], lines: [E(F.zeros, 'Zéros de h', 'constant-sol', 'zeros')],
    });
  }
  if (constant) {
    parts.push({
      html: `y(0) = ${rd(y0)} annule h : quelle est la solution ?`, ask: 'y =', start: F.eq, judge: ode, pre,
      lines: [E(`y = ${y0}`, `y ≡ ${rd(y0)} est une solution, et la seule (unicité)`, 'ic', 'solve')],
    });
  } else {
    if (F.pf) parts.push({ html: `Décompose ${MT(F.pf.start)} en éléments simples.`, ask: `${MT(F.pf.start)} =`, start: F.pf.start, judge: { kind: 'equiv', vars: ['y'], domain: { y: [-d.a + 0.1, d.a - 0.1] } }, lines: [E(F.pf.line, 'Éléments simples', 'partial-frac', 'pf')] });
    const icDecision = {
      kind: 'decision', prompt: 'Appliquer la condition initiale maintenant, ou après avoir isolé y ?', options: [
        { id: 'now', label: 'Maintenant : la constante est plus simple à trouver', valid: true, ref: true },
        { id: 'later', label: 'Après avoir isolé y', valid: true, quality: 'poor', why: 'Juste aussi, mais la constante est souvent plus compliquée une fois y isolé.' },
      ],
    };
    const lines = [E(F.sep, 'Séparer', 'separate', 'sep')];
    if (level <= 3) lines.push(E(F.int, 'Intégrer des deux côtés', 'separate', 'int'));
    lines.push(E(F.rel, 'Primitives, une seule constante', 'integrate', 'int'));
    if (level === 3) lines.push(icDecision);
    lines.push(E(`C = ${F.C}`, `y(0) = ${rd(y0T)}`, 'ic', 'ic'));
    if (F.mid) lines.push(E(F.mid, 'Le quotient est positif en x = 0 : on enlève |…| avec le signe +', 'solve', 'solve'));
    lines.push(E(`y = ${F.y}`, 'Isoler y', 'solve', 'solve'));
    if (level === 3) lines[0] = E(F.int, 'Séparer et intégrer', 'separate', 'sep');
    if (level === 3) lines.splice(1, 1);
    if (level === 1) {
      const rel = lines.findIndex((l) => l.math === F.rel);
      lines[rel] = { ...lines[rel], ...tpl(F.rel, [F.rel.split(' = ')[0]], { dvar: 'x' }) };
      const fin = lines.length - 1;
      lines[fin] = { ...lines[fin], ...tpl(lines[fin].math, [F.y], { dvar: 'x' }) };
    }
    if (level === 2) {
      const rel = lines.findIndex((l) => l.math === F.rel);
      lines[rel] = { ...lines[rel], ...tpl(F.rel, [polyT(g.P)], { dvar: 'x' }) };
    }
    parts.push({ html: level >= 2 || F.pf ? 'Sépare, intègre, puis applique la condition initiale.' : null, ask: 'y =', start: F.eq, judge: ode, pre: level >= 2 ? pre : [], lines });
  }
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const given = level === 1 && !constant ? (F.zeros === '∅' ? ` h(y) = ${hR(F.h)} ne s'annule jamais : pas de solution constante.` : ` Les solutions constantes sont ${MT(F.zeros)} ; y(0) = ${MT(y0T)} n'en est pas une.`) : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Résous ${MT(F.eq)}, y(0) = ${MT(y0T)}.${given}`,
    hints: H('Repère les solutions constantes (zéros de h), puis mets les y d\'un côté et les x de l\'autre.',
      `∫ dy/h(y) = ${F.prim} et ∫ g(x) dx = ${sup(polyT(g.P))}, plus une seule constante.`,
      constant ? `y(0) = ${rd(y0)} annule h : y ≡ ${rd(y0)}.` : `${MT(F.rel)}, puis C = ${MT(F.C)}.`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${F.eq}:${y0T}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- multiple choice: « la solution vérifie aussi y(x₁) = » ----------

function mcqVariant(level, rng, opts) {
  const kind = rng.pick(['lin', 'sq', 'atan', 'th', 'exp', 'const']);
  const c = rng.pick([1, 2, 3]);
  const cT = c === 1 ? '' : `${c}`;
  const NO = { html: 'Le problème n\'a pas de solution', rule: 'a2_ode_sep_lost_constant' };
  let eq; let y0; let x1; let right; let wrongs; let why;
  if (kind === 'lin') {
    y0 = rng.pick([1, 2, 3, -1, -2]);
    const k = rng.pick([2, 3]);
    eq = `y'=${cT}y`;
    x1 = c === 1 ? `ln(${k})` : `ln(${k})/${c}`;
    right = String(y0 * k);
    wrongs = [opt(String(k + y0 - 1), 'a2_ode_sep_constant_late'), opt(String(-y0 * k), 'a2_ode_sign_abs'), opt(String(y0 + k)), opt(String(y0 * k * k)), opt(qt(q(y0, k)))];
    why = `ln|y| = ${cT}x + C, donc y = ${rd(y0)}e^(${cT}x) et y(${rd(x1)}) = ${rd(y0)}·${k} = ${rd(right)}.`;
  } else if (kind === 'sq') {
    y0 = rng.pick([1, 2, -1, -2]);
    const c1 = rng.pick([1, 2]);
    const xs = [q(1, 2), q(1, 4), q(-1, 2), q(-1), q(1, 3)].filter((t) => { const D = q(1).div(q(y0)).sub(t.mul(c1)); return D.n !== 0 && Math.sign(D.n) === Math.sign(y0) && q(1).div(q(y0)).add(t.mul(c1)).n !== 0; });
    const t = rng.pick(xs);
    eq = `y'=${c1 === 1 ? '' : c1}y^2`;
    x1 = qt(t);
    const val = q(1).div(q(1).div(q(y0)).sub(t.mul(c1)));
    right = qt(val);
    wrongs = [opt(qt(q(1).div(q(1).div(q(y0)).add(t.mul(c1))))), opt(qt(val.neg())), opt(qt(q(y0).add(t.mul(c1 * y0 * y0)))), opt(qt(val.add(1)))];
    why = `−1/y = ${c1 === 1 ? '' : c1}x + C avec C = ${rd(qt(q(-1, y0)))}, donc y = 1/(${rd(qt(q(1).div(q(y0))))} − ${c1 === 1 ? '' : c1}x) et y(${rd(x1)}) = ${rd(right)}.`;
  } else if (kind === 'atan') {
    y0 = 0;
    const [frac, val, alt] = rng.pick([[4, '1', 'π/4'], [3, '√3', 'π/3'], [6, '√3/3', 'π/6']]);
    eq = `y'=${cT ? `${cT}(1+y^2)` : '1+y^2'}`;
    x1 = c === 1 ? `π/${frac}` : `π/${frac * c}`;
    right = val;
    wrongs = [opt(`arctan(${alt})`), opt(`-${val}`), opt(alt), opt('0')];
    why = `arctan y = ${cT}x + C, C = 0, donc y = tan(${cT}x) et y(${rd(x1)}) = tan(${alt}) = ${val}.`;
  } else if (kind === 'th') {
    y0 = 0;
    const a = rng.pick([1, 2, 3]);
    const k = rng.pick([2, 3]);
    eq = `y'=${cT ? `${cT}(${a * a}-y^2)` : `${a * a}-y^2`}`;
    x1 = `ln(${k})/${2 * a * c}`;
    const val = q(a * (k - 1), k + 1);
    right = qt(val);
    wrongs = [opt(qt(q(a * (k + 1), k - 1)), 'a2_ode_sign_abs'), opt(qt(q(k - 1, k + 1))), opt(String(a)), opt(qt(val.neg())), opt(qt(q(k - 1, 2)))];
    why = `(1/${2 * a}) ln|(${a} + y)/(${a} − y)| = ${cT}x (C = 0), donc (${a} + y)/(${a} − y) = e^(${2 * a * c}x) = ${k} en x₁ : y = ${right}.`;
  } else if (kind === 'exp') {
    y0 = 0;
    const t = rng.pick([1, 2]);
    eq = `y'=${cT}e^(-y)`;
    x1 = String(t);
    right = `ln(${1 + c * t})`;
    wrongs = [opt(`ln(${c * t})`), opt(`-ln(${1 + c * t})`), opt(String(1 + c * t)), opt(`e^(${c * t})`)];
    why = `e^y = ${cT}x + C, C = 1, donc y = ln(1 + ${cT}x) et y(${t}) = ln(${1 + c * t}).`;
  } else {
    const a = rng.pick([1, 2, 3]);
    const k = rng.pick([2, 3]);
    y0 = rng.pick([a, -a]);
    eq = `y'=${cT ? `${cT}(${a * a}-y^2)` : `${a * a}-y^2`}`;
    x1 = `ln(${k})/${2 * a * c}`;
    right = String(y0);
    wrongs = [NO, opt(qt(q(a * (k - 1), k + 1)), 'a2_ode_sep_lost_constant'), opt(String(-y0)), opt('0')];
    why = `h(${rd(y0)}) = 0 : y ≡ ${rd(y0)} est la solution (unicité), donc y(x₁) = ${rd(y0)}.`;
  }
  return mcq4({
    skill: SK, level, key: `${SK}:mcq:${eq}:${y0}:${x1}`, exam: examTag(opts),
    prompt: `La solution de ${MT(eq)}, y(0) = ${rd(y0)} vérifie aussi y(${MT(x1)}) =`,
    right: MT(right), wrongs, fillers: [opt('1'), opt('-1'), opt('2')],
    solution: [{ html: why, note: '' }], expectedSec: 150,
  }, rng);
}

// ---------- true/false ----------

function statements(rng) {
  const k = rng.pick([1, 2, 3]);
  const g = k === 1 ? '2x' : k === 2 ? '3x^2' : '4x^3';
  const G = k === 1 ? 'x^2' : k === 2 ? 'x^3' : 'x^4';
  return [
    { key: 'cos', truth: true, text: `La solution générale de y′ = cos(t)·e^(−y) est y = ln(sin t + C).`, why: 'Vrai : e^y dy = cos t dt, e^y = sin t + C, y = ln(sin t + C).' },
    { key: 'zero', truth: true, text: 'Toute solution de y′ = y/x² sur ]0 ; +∞[ avec y(1) = 0 est la fonction nulle.', why: 'Vrai : y ≡ 0 est une solution, et elle est unique (f(x, y) = y/x² est Lipschitz en y sur ]0 ; +∞[).' },
    {
      key: `late${k}`, truth: false, text: `Toutes les solutions de y′ = ${rd(g)}·y sont de la forme y = e^(${G}) + C.`, ruleIfTrue: 'a2_ode_sep_constant_late',
      why: `Faux : ln|y| = ${G} + C donne y = K·e^(${G}) : la constante multiplie. Par exemple 2e^(${G}) n'est pas de la forme e^(${G}) + C.`,
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: `y'=${g}×y`, family: `e^(${G})+C`, domain: { x: [-1, 1] } }, ask: [{ v: 'y', label: 'Une solution qui n\'est pas de cette forme : y(x) =', keys: KEYS }], answer: { y: `2e^(${G})` } },
    },
    {
      key: 'lost', truth: false, text: 'Toutes les solutions de y′ = y² sont de la forme y = −1/(x + C).', ruleIfTrue: 'a2_ode_sep_lost_constant',
      why: 'Faux : y ≡ 0 est une solution (zéro de h(y) = y²), perdue en divisant par y².',
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: "y'=y^2", family: '-1/(x+C)', domain: { x: [0.1, 1] } }, ask: [{ v: 'y', label: 'Une solution qui n\'est pas de cette forme : y(x) =', keys: KEYS }], answer: { y: '0' } },
    },
    {
      key: 'nosol', truth: false, text: 'Le problème y′ = 4 − y², y(0) = 2 n\'a pas de solution, car on ne peut pas diviser par 4 − y².', ruleIfTrue: 'a2_ode_sep_lost_constant',
      why: 'Faux : y ≡ 2 est une solution constante (4 − 2² = 0), et c\'est la seule.',
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: "y'=4-y^2", ic: { x: 0, y: 2 }, domain: { x: [-1, 1] } }, ask: [{ v: 'y', label: 'Une solution : y(x) =', keys: KEYS }], answer: { y: '2' } },
    },
  ];
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return tfOf(SK, rng.pick(statements(rng)), 4, examTag(opts));
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return mcqVariant(5, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
